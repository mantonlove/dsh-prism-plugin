/** HSL <-> hex conversions: the full color space, black/white/grays included. */
import { describe, expect, it } from 'vitest'
import { hexToHsl, hslToHex } from '../src/client/color.ts'

describe('hslToHex', () => {
  it('renders black and white', () => {
    expect(hslToHex({ h: 0, s: 0, l: 0 })).toBe('#000000')
    expect(hslToHex({ h: 0, s: 0, l: 100 })).toBe('#ffffff')
  })

  it('renders grays', () => {
    expect(hslToHex({ h: 0, s: 0, l: 50 })).toBe('#808080')
  })

  it('renders a saturated red', () => {
    expect(hslToHex({ h: 0, s: 100, l: 50 })).toBe('#ff0000')
  })

  it('clamps out-of-range channels', () => {
    expect(hslToHex({ h: 999, s: -50, l: 250 })).toBe('#ffffff')
  })
})

describe('hexToHsl', () => {
  it('parses black, white, and gray', () => {
    expect(hexToHsl('#000000')).toEqual({ h: 0, s: 0, l: 0 })
    expect(hexToHsl('#ffffff')).toEqual({ h: 0, s: 0, l:100 })
    expect(hexToHsl('#808080').l).toBe(50)
  })

  it('parses a saturated red', () => {
    expect(hexToHsl('#ff0000')).toEqual({ h: 0, s: 100, l: 50 })
  })

  it('falls back to mid-gray for malformed input', () => {
    expect(hexToHsl('not-a-color')).toEqual({ h: 0, s: 0, l: 50 })
  })
})

describe('round trips', () => {
  it('round-trips representative colors within rounding tolerance', () => {
    for (const color of [
      { h: 205, s: 85, l: 55 },
      { h: 0, s: 0, l: 0 },
      { h: 0, s: 0, l: 100 },
      { h: 120, s: 100, l: 25 },
      { h: 318, s: 60, l: 40 },
    ]) {
      const parsed = hexToHsl(hslToHex(color))
      expect(Math.abs(parsed.h - color.h)).toBeLessThanOrEqual(1)
      expect(Math.abs(parsed.s - color.s)).toBeLessThanOrEqual(1)
      expect(Math.abs(parsed.l - color.l)).toBeLessThanOrEqual(1)
    }
  })
})
