// @vitest-environment jsdom
/** Durable settings document: defaults, partial merge, migrations, round-trips. */
import { beforeEach, describe, expect, it, vi } from 'vitest'
import {
  isPrismStorageKey, PRISM_SETTINGS_KEY, readSettings, SETTINGS_DEFAULTS, writeSettings,
} from '../src/client/prism-settings.ts'

beforeEach(() => {
  localStorage.clear()
})

describe('readSettings', () => {
  it('returns the shipped defaults when nothing is stored', () => {
    const settings = readSettings()
    expect(settings.enabled).toBe(true)
    expect(settings.material).toBe('frosted')
    expect(settings.blur).toBe(18)
    expect(settings.fontScale).toBe(100)
    expect(settings.wallpaperDark).toEqual([])
    expect(settings.wallpaperInterval).toBe(30)
    expect(settings.zones).toEqual({ base: 100, sidebar: 100, card: 100, input: 100, overlay: 100, bubble: 100 })
  })

  it('merges partial documents over the defaults', () => {
    localStorage.setItem(PRISM_SETTINGS_KEY, JSON.stringify({ blur: 40, enabled: false }))
    const settings = readSettings()
    expect(settings.blur).toBe(40)
    expect(settings.enabled).toBe(false)
    expect(settings.frost).toBe(50)
  })

  it('migrates a legacy single wallpaper string into a list', () => {
    localStorage.setItem(PRISM_SETTINGS_KEY, JSON.stringify({ wallpaperDark: 'data:image/gif;base64,x' }))
    const settings = readSettings()
    expect(settings.wallpaperDark).toEqual(['data:image/gif;base64,x'])
    expect(settings.wallpaperDimDark).toEqual([0.5])
  })

  it('migrates the legacy single ink pair into per-mode inks', () => {
    localStorage.setItem(PRISM_SETTINGS_KEY, JSON.stringify({ inkHue: 300, inkSat: 80 }))
    const settings = readSettings()
    expect(settings.inkLightHue).toBe(300)
    expect(settings.inkDarkHue).toBe(300)
    expect(settings.inkLightSat).toBe(80)
    expect(settings.inkDarkSat).toBe(80)
  })

  it('folds the retired apple material into frosted', () => {
    localStorage.setItem(PRISM_SETTINGS_KEY, JSON.stringify({ material: 'apple' }))
    expect(readSettings().material).toBe('frosted')
  })

  it('accepts the velvet material', () => {
    localStorage.setItem(PRISM_SETTINGS_KEY, JSON.stringify({ material: 'velvet' }))
    expect(readSettings().material).toBe('velvet')
  })

  it('round-trips valid custom themes and filters damaged entries', () => {
    const { customThemes: _ignored, ...values } = readSettings()
    const valid = { id: 'theme-ok', name: '  Saved look  ', values }
    localStorage.setItem(PRISM_SETTINGS_KEY, JSON.stringify({
      customThemes: [valid, null, { id: 'bad id!', name: 'Bad', values: {} }, { id: 'missing-name', values: {} }],
    }))
    const themes = readSettings().customThemes
    expect(themes).toHaveLength(1)
    expect(themes[0]?.name).toBe('Saved look')
    expect(themes[0]?.id).toBe('theme-ok')
  })

  it('returns the defaults for unreadable documents', () => {
    localStorage.setItem(PRISM_SETTINGS_KEY, '{not json')
    expect(readSettings().material).toBe('frosted')
  })
})

describe('writeSettings + readSettings', () => {
  it('round-trips the full document', () => {
    const settings = {
      ...readSettings(),
      accentHue: 300,
      accentSat: 40,
      accentLight: 20,
      accentOpacity: 60,
      wallpaperDark: ['data:image/gif;base64,xx'],
      wallpaperFrost: 40,
    }
    expect(writeSettings(settings)).toBe(true)
    const loaded = readSettings()
    expect(loaded.accentHue).toBe(300)
    expect(loaded.accentSat).toBe(40)
    expect(loaded.accentLight).toBe(20)
    expect(loaded.accentOpacity).toBe(60)
    expect(loaded.wallpaperDark).toEqual(['data:image/gif;base64,xx'])
    expect(loaded.wallpaperFrost).toBe(40)
  })

  it('reports quota and serialization failures instead of claiming durable success', () => {
    const setItem = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('quota') })
    expect(writeSettings(readSettings())).toBe(false)
    expect(setItem).toHaveBeenCalledOnce()
    setItem.mockRestore()
  })
})

describe('isPrismStorageKey', () => {
  it('matches only the Prism document key', () => {
    expect(isPrismStorageKey(PRISM_SETTINGS_KEY)).toBe(true)
    expect(isPrismStorageKey('other.key')).toBe(false)
    expect(isPrismStorageKey(null)).toBe(false)
  })

  it('defaults carry sensible ink values', () => {
    expect(SETTINGS_DEFAULTS.accentHue).toBe(205)
    expect(SETTINGS_DEFAULTS.inkLightHue).toBe(222)
    expect(SETTINGS_DEFAULTS.inkDarkLight).toBe(92)
    expect(SETTINGS_DEFAULTS.wallpaperFrost).toBe(0)
  })
})
