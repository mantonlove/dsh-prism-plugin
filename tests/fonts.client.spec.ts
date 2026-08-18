/** Font scale layer: every composite token transforms into calc() forms. */
import { describe, expect, it } from 'vitest'
import { buildFontOverrides, FONT_ENTRIES, scaleShorthand } from '../src/client/fonts.ts'

describe('FONT_ENTRIES', () => {
  it('covers the complete 30-token composite font inventory', () => {
    expect(FONT_ENTRIES).toHaveLength(30)
  })

  it('every entry names a --dsw-font- token with a px pair', () => {
    for (const [name, shorthand] of FONT_ENTRIES) {
      expect(name.startsWith('--dsw-font-')).toBe(true)
      expect(/\d+px\/\d+px/.test(shorthand)).toBe(true)
    }
  })
})

describe('scaleShorthand', () => {
  it('replaces the size/line-height pair with scale-aware calc() expressions', () => {
    expect(scaleShorthand('700 24px/34px var(--dsw-font-family)'))
      .toBe('700 calc(24px * var(--prism-font-scale)) / calc(34px * var(--prism-font-scale)) var(--dsw-font-family)')
  })

  it('preserves style/weight prefixes and the code-family reference', () => {
    expect(scaleShorthand('italic 600 14px/24px var(--dsw-font-family)'))
      .toBe('italic 600 calc(14px * var(--prism-font-scale)) / calc(24px * var(--prism-font-scale)) var(--dsw-font-family)')
    expect(scaleShorthand('13px/22px var(--ds-font-family-code)'))
      .toBe('calc(13px * var(--prism-font-scale)) / calc(22px * var(--prism-font-scale)) var(--ds-font-family-code)')
  })
})

describe('buildFontOverrides', () => {
  const overrides = buildFontOverrides()

  it('emits the shorthand plus -font-size and -line-height per token', () => {
    expect(Object.keys(overrides)).toHaveLength(FONT_ENTRIES.length * 3)
    for (const [name] of FONT_ENTRIES) {
      expect(overrides[name]).toBeDefined()
      expect(overrides[`${name}-font-size`]).toBeDefined()
      expect(overrides[`${name}-line-height`]).toBeDefined()
    }
  })

  it('every value is a { light, dark } pair with identical strings', () => {
    for (const [name, modes] of Object.entries(overrides)) {
      expect(typeof modes.light).toBe('string')
      expect(typeof modes.dark).toBe('string')
      expect(modes.light).toBe(modes.dark)
      expect(modes.light.includes('var(--prism-font-scale)')).toBe(true)
      void name
    }
  })
})
