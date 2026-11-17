// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest'

/** Wallpaper decoding is stubbed: this spec covers batch bookkeeping, not image math. */
vi.mock('../src/client/wallpaper.ts', async importOriginal => {
  const actual = await importOriginal<typeof import('../src/client/wallpaper.ts')>()
  return {
    ...actual,
    readWallpaper: vi.fn(),
    analyzeLuminance: vi.fn(),
  }
})

import { SETTINGS_DEFAULTS, type PrismSettings } from '../src/client/prism-settings.ts'
import { PrismLayer } from '../src/client/theme-layer.ts'
import { analyzeLuminance, MAX_WALLPAPER_BATCH, readWallpaper } from '../src/client/wallpaper.ts'

const readMock = vi.mocked(readWallpaper)
const dimMock = vi.mocked(analyzeLuminance)

/** Layer with an empty wallpaper list and a recording settings writer. */
function emptyLayer(): { layer: PrismLayer, update: ReturnType<typeof vi.fn> } {
  const settings: PrismSettings = { ...SETTINGS_DEFAULTS }
  const layer = Object.create(PrismLayer.prototype) as PrismLayer
  Object.assign(layer, { settings })
  const update = vi.fn((patch: Partial<PrismSettings>) => {
    Object.assign(layer, { settings: { ...layer.getSettings(), ...patch } })
  })
  Object.assign(layer, { update })
  return { layer, update }
}

/** A File stand-in whose content never reaches a decoder. */
function file(name: string): File {
  return new File([name], name, { type: 'image/png' })
}

afterEach(() => {
  vi.clearAllMocks()
  localStorage.clear()
})

describe('PrismLayer batch wallpaper ingest', () => {
  it('appends every accepted file in one settings write', async () => {
    readMock
      .mockResolvedValueOnce('data:image/jpeg;base64,aaa')
      .mockResolvedValueOnce({ kind: 'size', bytes: 31 * 1024 * 1024 })
      .mockResolvedValueOnce('data:image/jpeg;base64,bbb')
    dimMock.mockResolvedValueOnce(0.2).mockResolvedValueOnce(0.8)

    const { layer, update } = emptyLayer()
    const result = await layer.setWallpapersFromFiles('dark', [file('a.png'), file('big.png'), file('b.png')])

    expect(result.added).toBe(2)
    expect(result.errors).toEqual([{ kind: 'size', bytes: 31 * 1024 * 1024 }])
    expect(update).toHaveBeenCalledTimes(1)
    const settings = layer.getSettings()
    expect(settings.wallpaperDark).toEqual(['data:image/jpeg;base64,aaa', 'data:image/jpeg;base64,bbb'])
    expect(settings.wallpaperDimDark).toEqual([0.2, 0.8])
    expect(settings.wallpaperCycleDark).toEqual([true, true])
    expect(settings.background).toBe('wallpaper')
  })

  it('writes nothing when every file is rejected', async () => {
    readMock.mockResolvedValue({ kind: 'decode' })
    const { layer, update } = emptyLayer()

    const result = await layer.setWallpapersFromFiles('light', [file('x.png'), file('y.png')])

    expect(result.added).toBe(0)
    expect(result.errors).toHaveLength(2)
    expect(update).not.toHaveBeenCalled()
    expect(dimMock).not.toHaveBeenCalled()
  })

  it(`caps one pick at ${String(MAX_WALLPAPER_BATCH)} files`, async () => {
    readMock.mockResolvedValue('data:image/jpeg;base64,zzz')
    dimMock.mockResolvedValue(0.5)
    const { layer } = emptyLayer()
    const files = Array.from({ length: MAX_WALLPAPER_BATCH + 5 }, (_, index) => file(`f${String(index)}.png`))

    const result = await layer.setWallpapersFromFiles('dark', files)

    expect(readMock).toHaveBeenCalledTimes(MAX_WALLPAPER_BATCH)
    expect(result.added).toBe(MAX_WALLPAPER_BATCH)
    expect(layer.getSettings().wallpaperDark).toHaveLength(MAX_WALLPAPER_BATCH)
  })

  it('keeps single-file ingest working through the batch path', async () => {
    readMock.mockResolvedValue('data:image/jpeg;base64,one')
    dimMock.mockResolvedValue(0.4)
    const { layer } = emptyLayer()

    expect(await layer.setWallpaperFromFile('dark', file('one.png'))).toBeNull()
    expect(layer.getSettings().wallpaperDark).toEqual(['data:image/jpeg;base64,one'])
  })
})
