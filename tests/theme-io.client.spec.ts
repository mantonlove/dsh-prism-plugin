// @vitest-environment jsdom
/** Portable theme schema: round-trip, clamping, hostile input and privacy. */
import { describe, expect, it } from 'vitest'
import { SETTINGS_DEFAULTS } from '../src/client/prism-settings.ts'
import {
  makeCustomTheme, normalizeThemeValues, parseThemeDocument, PRISM_THEME_FORMAT,
  PRISM_THEME_MAX_BYTES, PRISM_THEME_VERSION, serializeTheme, themeSnapshot,
} from '../src/client/theme-io.ts'

function settings() {
  return structuredClone(SETTINGS_DEFAULTS)
}

describe('themeSnapshot and serializeTheme', () => {
  it('exports appearance only, never wallpaper bytes or library state', () => {
    const source = settings()
    source.wallpaperDark = ['data:image/png;base64,private-image']
    source.enabled = false
    source.customThemes = [{ id: 'private', name: 'Private', values: themeSnapshot(source) }]
    const raw = serializeTheme(source, '  Shared look  ')
    const document = JSON.parse(raw) as Record<string, unknown>
    expect(document.format).toBe(PRISM_THEME_FORMAT)
    expect(document.version).toBe(PRISM_THEME_VERSION)
    expect(document.name).toBe('Shared look')
    expect(raw).not.toContain('private-image')
    expect(raw).not.toContain('customThemes')
    expect(raw).not.toContain('wallpaperDark')
    expect(raw).not.toContain('enabled')
  })

  it('round-trips a complete snapshot without aliasing zones', () => {
    const source = settings()
    source.material = 'velvet'
    source.blur = 31
    source.accentHue = 330
    source.zones.sidebar = 64
    const restored = parseThemeDocument(serializeTheme(source, 'Round trip'))
    expect(restored.values).toEqual(themeSnapshot(source))
    expect(restored.values.zones).not.toBe(source.zones)
  })
})

describe('normalizeThemeValues', () => {
  it('fills missing fields from defaults and clamps finite numerics', () => {
    const result = normalizeThemeValues({
      blur: 999,
      frost: -20,
      fontScale: Number.NaN,
      accentHue: 725,
      material: 'clear',
      zones: { sidebar: 1, card: 1000 },
    })
    expect(result.blur).toBe(40)
    expect(result.frost).toBe(0)
    expect(result.fontScale).toBe(SETTINGS_DEFAULTS.fontScale)
    expect(result.accentHue).toBe(360)
    expect(result.material).toBe('clear')
    expect(result.zones.sidebar).toBe(20)
    expect(result.zones.card).toBe(100)
    expect(result.zones.input).toBe(100)
  })

  it('drops invalid enums and coerces neither strings nor null', () => {
    const result = normalizeThemeValues({
      material: '<script>',
      fontChoice: 'unknown',
      blur: '18',
      customFont: 123,
    })
    expect(result.material).toBe(SETTINGS_DEFAULTS.material)
    expect(result.fontChoice).toBe(SETTINGS_DEFAULTS.fontChoice)
    expect(result.blur).toBe(SETTINGS_DEFAULTS.blur)
    expect(result.customFont).toBe('')
  })
})

describe('parseThemeDocument', () => {
  it('rejects invalid JSON, wrong schema versions and missing names', () => {
    expect(() => parseThemeDocument('{bad')).toThrow('json')
    expect(() => parseThemeDocument('null')).toThrow('schema')
    expect(() => parseThemeDocument(JSON.stringify({ format: PRISM_THEME_FORMAT, version: 99, name: 'X', values: {} }))).toThrow('version')
    expect(() => parseThemeDocument(JSON.stringify({ format: PRISM_THEME_FORMAT, version: 1, name: ' ', values: {} }))).toThrow('schema')
    expect(() => parseThemeDocument(JSON.stringify({ format: PRISM_THEME_FORMAT, version: 1, name: 'X' }))).toThrow('schema')
  })

  it('enforces the encoded byte limit, including multibyte names', () => {
    const oversized = `{"name":"${'棱'.repeat(PRISM_THEME_MAX_BYTES)}"}`
    expect(new TextEncoder().encode(oversized).byteLength).toBeGreaterThan(PRISM_THEME_MAX_BYTES)
    expect(() => parseThemeDocument(oversized)).toThrow('size')
  })
})

describe('makeCustomTheme', () => {
  it('trims the display name and takes an independent appearance snapshot', () => {
    const source = settings()
    const theme = makeCustomTheme(source, `  ${'A'.repeat(50)}  `, 'theme-test')
    expect(theme.id).toBe('theme-test')
    expect(theme.name).toHaveLength(40)
    source.zones.sidebar = 20
    expect(theme.values.zones.sidebar).toBe(100)
  })
})
