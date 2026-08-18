/** Wallpaper ingestion: GIF passthrough, size cap, and auto-dim math. */
import { describe, expect, it } from 'vitest'
import { isAnimatedGif, MAX_WALLPAPER_BYTES, readWallpaper, UNKNOWN_LUMINANCE, veilAlpha } from '../src/client/wallpaper.ts'

function fileOf(bytes: number, type: string): File {
  return new File([new Uint8Array(bytes)], 'wallpaper.bin', { type })
}

describe('isAnimatedGif', () => {
  it('treats image/gif as animated (never flattened through a canvas)', () => {
    expect(isAnimatedGif(fileOf(16, 'image/gif'))).toBe(true)
  })

  it('rejects other image types', () => {
    expect(isAnimatedGif(fileOf(16, 'image/png'))).toBe(false)
    expect(isAnimatedGif(fileOf(16, 'image/jpeg'))).toBe(false)
    expect(isAnimatedGif(fileOf(16, 'image/webp'))).toBe(false)
  })
})

describe('readWallpaper', () => {
  it('rejects oversized files before any read', async () => {
    const result = await readWallpaper(fileOf(MAX_WALLPAPER_BYTES + 1, 'image/png'))
    expect(result).toEqual({ kind: 'size', bytes: MAX_WALLPAPER_BYTES + 1 })
  })
})

describe('veilAlpha', () => {
  it('dark mode darkens bright wallpapers and leaves dark ones alone', () => {
    expect(veilAlpha(0.9, true)).toBeGreaterThan(0.4)
    expect(veilAlpha(0.2, true)).toBe(0)
  })

  it('light mode brightens dark wallpapers and leaves bright ones alone', () => {
    expect(veilAlpha(0.1, false)).toBeGreaterThan(0.4)
    expect(veilAlpha(0.9, false)).toBe(0)
  })

  it('caps the veil at 0.75', () => {
    expect(veilAlpha(1, true)).toBeLessThanOrEqual(0.75)
    expect(veilAlpha(0, false)).toBeLessThanOrEqual(0.75)
  })
})

describe('UNKNOWN_LUMINANCE', () => {
  it('is a neutral midpoint', () => {
    expect(UNKNOWN_LUMINANCE).toBe(0.5)
    expect(veilAlpha(UNKNOWN_LUMINANCE, true)).toBeGreaterThan(0)
    expect(veilAlpha(UNKNOWN_LUMINANCE, false)).toBeGreaterThan(0)
  })
})
