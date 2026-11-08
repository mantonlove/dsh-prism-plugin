// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  MAX_CUSTOM_THEMES, PRISM_THEME_LIMIT_ERROR, PRISM_THEME_PERSIST_ERROR, SETTINGS_DEFAULTS, type PrismSettings,
} from '../src/client/prism-settings.ts'
import { makeCustomTheme, serializeTheme } from '../src/client/theme-io.ts'
import { PrismLayer } from '../src/client/theme-layer.ts'

/** Exercise public layer commands without constructing its DOM/Cordis lifecycle. */
function layerWithThemes(count: number): { layer: PrismLayer, update: ReturnType<typeof vi.fn> } {
  const customThemes = Array.from({ length: count }, (_, index) => makeCustomTheme(
    SETTINGS_DEFAULTS,
    `Theme ${String(index)}`,
    `theme-${String(index)}`,
  ))
  const settings: PrismSettings = { ...SETTINGS_DEFAULTS, customThemes }
  const layer = Object.create(PrismLayer.prototype) as PrismLayer
  Object.assign(layer, { settings })
  const update = vi.fn((patch: Partial<PrismSettings>) => {
    Object.assign(layer, { settings: { ...layer.getSettings(), ...patch } })
  })
  Object.assign(layer, { update })
  return { layer, update }
}

afterEach(() => {
  vi.restoreAllMocks()
  localStorage.clear()
})

describe('PrismLayer saved-theme limits and persistence', () => {
  it('rejects a new name at the cap without evicting an existing theme', () => {
    const { layer, update } = layerWithThemes(MAX_CUSTOM_THEMES)
    expect(layer.saveTheme('A new look')).toBeNull()
    expect(update).not.toHaveBeenCalled()
    expect(layer.getSettings().customThemes).toHaveLength(MAX_CUSTOM_THEMES)
    expect(layer.getSettings().customThemes[0]?.name).toBe('Theme 0')
  })

  it('rejects a same-name save at the cap instead of replacing the original', () => {
    const { layer, update } = layerWithThemes(MAX_CUSTOM_THEMES)
    expect(layer.saveTheme('Theme 0')).toBeNull()
    expect(update).not.toHaveBeenCalled()
    expect(layer.getSettings().customThemes[0]?.name).toBe('Theme 0')
  })

  it('suffixes a duplicate save below the cap', () => {
    const { layer, update } = layerWithThemes(1)
    expect(layer.saveTheme('Theme 0')).not.toBeNull()
    const patch = update.mock.calls[0]?.[0] as Partial<PrismSettings>
    expect(patch.customThemes?.map(theme => theme.name)).toEqual(['Theme 0', 'Theme 0 (2)'])
  })

  it('rejects a new imported name at the cap before applying appearance values', () => {
    const { layer, update } = layerWithThemes(MAX_CUSTOM_THEMES)
    const raw = serializeTheme({ ...SETTINGS_DEFAULTS, blur: 39 }, 'A new import')
    expect(() => { layer.importTheme(raw) }).toThrow(PRISM_THEME_LIMIT_ERROR)
    expect(update).not.toHaveBeenCalled()
  })

  it('rejects a same-name import at the cap before replacing or applying it', () => {
    const { layer, update } = layerWithThemes(MAX_CUSTOM_THEMES)
    const raw = serializeTheme({ ...SETTINGS_DEFAULTS, blur: 39 }, 'Theme 0')
    expect(() => { layer.importTheme(raw) }).toThrow(PRISM_THEME_LIMIT_ERROR)
    expect(update).not.toHaveBeenCalled()
    expect(layer.getSettings().blur).toBe(SETTINGS_DEFAULTS.blur)
  })

  it('imports a duplicate name below the cap as a new suffixed theme', () => {
    const { layer, update } = layerWithThemes(1)
    const raw = serializeTheme({ ...SETTINGS_DEFAULTS, blur: 39 }, 'Theme 0')
    expect(layer.importTheme(raw)).toBe('Theme 0 (2)')
    const patch = update.mock.calls[0]?.[0] as Partial<PrismSettings>
    expect(patch.blur).toBe(39)
    expect(patch.customThemes?.map(theme => theme.name)).toEqual(['Theme 0', 'Theme 0 (2)'])
    expect(patch.customThemes?.at(-1)?.values.blur).toBe(39)
  })

  it('flushes a library save before reporting success', () => {
    const { layer } = layerWithThemes(1)
    Object.assign(layer, { persistTimer: window.setTimeout(() => undefined, 60_000) })
    const setItem = vi.spyOn(Storage.prototype, 'setItem')
    expect(layer.saveTheme('Theme 0')).not.toBeNull()
    expect(setItem).toHaveBeenCalledTimes(1)
    const raw = setItem.mock.calls[0]?.[1]
    expect(typeof raw).toBe('string')
    const saved = JSON.parse(raw ?? '{}') as PrismSettings
    expect(saved.customThemes.map(theme => theme.name)).toEqual(['Theme 0', 'Theme 0 (2)'])
  })

  it('rolls back a library edit and throws when durable storage fails', () => {
    const { layer } = layerWithThemes(1)
    Object.assign(layer, {
      persistTimer: window.setTimeout(() => undefined, 60_000),
      applyDiscrete: vi.fn(),
      applyAllKnobs: vi.fn(),
      signal: vi.fn(),
    })
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('quota') })
    expect(() => { layer.saveTheme('Another look') }).toThrow(PRISM_THEME_PERSIST_ERROR)
    expect(layer.getSettings().customThemes.map(theme => theme.name)).toEqual(['Theme 0'])
  })
})
