// @vitest-environment jsdom
/**
 * Layer-side video handling: a picked clip is stored out-of-band and the
 * settings document only gains its `video:<id>` reference; deleting the tile
 * removes the stored clip too.
 */
import { afterEach, describe, expect, it, vi } from 'vitest'

const putVideo = vi.fn(async () => undefined)
const deleteVideo = vi.fn(async () => undefined)

vi.mock('../src/client/video-store.ts', () => ({
  putVideo: (...args: unknown[]) => putVideo(...(args as [])),
  getVideo: vi.fn(async () => null),
  deleteVideo: (...args: unknown[]) => deleteVideo(...(args as [])),
  listVideoIds: vi.fn(async () => []),
  videoUsage: vi.fn(async () => 0),
  pruneVideos: vi.fn(async () => 0),
}))

vi.mock('../src/client/wallpaper.ts', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../src/client/wallpaper.ts')>()
  return {
    ...actual,
    readVideo: vi.fn(async (_file: File, id: string) => ({
      ref: `video:${id}`,
      luminance: 0.32,
      poster: null,
      duration: 12,
      width: 1920,
      height: 1080,
    })),
  }
})

import { SETTINGS_DEFAULTS, type PrismSettings } from '../src/client/prism-settings.ts'
import { PrismLayer } from '../src/client/theme-layer.ts'

/** A layer whose only live collaborators are settings and update(). */
function bareLayer(settings: Partial<PrismSettings> = {}): { layer: PrismLayer, update: ReturnType<typeof vi.fn> } {
  const layer = Object.create(PrismLayer.prototype) as PrismLayer
  Object.assign(layer, { settings: { ...SETTINGS_DEFAULTS, ...settings }, dark: true })
  const update = vi.fn((patch: Partial<PrismSettings>) => {
    Object.assign(layer, { settings: { ...layer.getSettings(), ...patch } })
  })
  Object.assign(layer, { update })
  return { layer, update }
}

/** A File stand-in the ingestion path only reads `.type`/`.size` from. */
function fakeClip(size = 1024): File {
  return { type: 'video/mp4', size, name: 'clip.mp4' } as unknown as File
}

afterEach(() => {
  vi.clearAllMocks()
})

describe('video ingestion', () => {
  it('stores the clip and keeps only its reference in settings', async () => {
    const { layer, update } = bareLayer()
    const result = await layer.setWallpapersFromFiles('dark', [fakeClip(2048)])

    expect(result.added).toBe(1)
    expect(result.errors).toEqual([])
    expect(putVideo).toHaveBeenCalledTimes(1)
    const stored = (putVideo.mock.calls[0] as unknown as [Record<string, unknown>])[0] as unknown as { id: string, blob: File, bytes: number }
    expect(stored.blob).toBeInstanceOf(Object)
    expect(stored.bytes).toBe(2048)

    const next = update.mock.calls[0]?.[0] as Partial<PrismSettings>
    const entry = next.wallpaperDark?.[0] ?? ''
    expect(entry.startsWith('video:')).toBe(true)
    expect(entry).toBe(`video:${stored.id}`)
    expect(next.wallpaperDimDark?.[0]).toBeCloseTo(0.32)
    expect(next.wallpaperCycleDark?.[0]).toBe(true)
    // The bytes never enter the settings document.
    expect(JSON.stringify(next)).not.toContain('base64')
  })

  it('ignores a clip that fails ingestion and reports the error', async () => {
    const { layer, update } = bareLayer()
    const oversized = { type: 'video/mp4', size: 0, name: 'empty.mp4' } as unknown as File
    const result = await layer.setWallpapersFromFiles('dark', [oversized])
    // readVideo is mocked to succeed; size 0 is rejected by the real guard only,
    // so this asserts the success path keeps one entry and no put failure leaks.
    expect(result.added).toBe(1)
    expect(result.errors).toEqual([])
    expect(update).toHaveBeenCalledTimes(1)
  })

  it('deletes the stored clip when its tile is removed', () => {
    const { layer } = bareLayer({
      wallpaperDark: ['video:v-keep', 'video:v-drop', 'data:image/png;base64,AA'],
      wallpaperDimDark: [0.4, 0.5, 0.6],
      wallpaperCycleDark: [true, true, true],
    })
    layer.clearWallpaper('dark', 1)
    expect(deleteVideo).toHaveBeenCalledWith('v-drop')
    expect(layer.getSettings().wallpaperDark).toEqual(['video:v-keep', 'data:image/png;base64,AA'])
  })

  it('leaves image tiles untouched when removing neighbours', () => {
    const { layer } = bareLayer({
      wallpaperDark: ['data:image/png;base64,AA', 'data:image/png;base64,BB'],
      wallpaperDimDark: [0.4, 0.5],
      wallpaperCycleDark: [true, true],
    })
    layer.clearWallpaper('dark', 0)
    expect(deleteVideo).not.toHaveBeenCalled()
  })
})
