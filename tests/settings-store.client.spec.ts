/** Prism row store: snapshot mirror and the revision guard. */
import { describe, expect, it } from 'vitest'
import { createPrismRowStore, type PrismSettingsPayload } from '../src/client/settings-store.ts'

function payload(overrides: Partial<PrismSettingsPayload> = {}): PrismSettingsPayload {
  return {
    enabled: true,
    material: 'frosted',
    blur: 18,
    frost: 50,
    zones: { base: 100, sidebar: 100, card: 100, input: 100, overlay: 100, bubble: 100 },
    bgBrightness: 50,
    fontScale: 100,
    fontChoice: 'system',
    customFont: '',
    inkLightHue: 222,
    inkLightSat: 30,
    inkLightLight: 12,
    inkDarkHue: 222,
    inkDarkSat: 30,
    inkDarkLight: 92,
    accentHue: 205,
    accentSat: 85,
    accentLight: 55,
    bgHue: 215,
    bgSat: 80,
    bgLight: 60,
    accentOpacity: 100,
    motion: 55,
    background: 'aurora',
    wallpaperDark: [],
    wallpaperLight: [],
    wallpaperDimDark: [],
    wallpaperDimLight: [],
    wallpaperInterval: 30,
    wallpaperLoop: false,
    wallpaperPinnedDark: 0,
    wallpaperPinnedLight: 0,
    wallpaperBlur: 20,
    wallpaperFrost: 0,
    dark: false,
    ...overrides,
  }
}

describe('createPrismRowStore', () => {
  it('init shape: revision at -1', () => {
    const store = createPrismRowStore().create()
    expect(store.getSnapshot().revision).toBe(-1)
    expect(store.getSnapshot().enabled).toBe(true)
  })

  it('sync mirrors the payload and advances the revision', () => {
    const store = createPrismRowStore().create()
    store.actions.sync(payload({ blur: 30, dark: true }), 0)
    expect(store.getSnapshot().blur).toBe(30)
    expect(store.getSnapshot().dark).toBe(true)
    expect(store.getSnapshot().revision).toBe(0)
  })

  it('revision guard drops stale and duplicate writes', () => {
    const store = createPrismRowStore().create()
    store.actions.sync(payload({ frost: 10 }), 3)
    store.actions.sync(payload({ frost: 20 }), 2)
    store.actions.sync(payload({ frost: 30 }), 3)
    expect(store.getSnapshot().frost).toBe(10)
    expect(store.getSnapshot().revision).toBe(3)
  })

  it('copies wallpaper lists defensively so drafts never alias the source payload', () => {
    const store = createPrismRowStore().create()
    const next = payload({ wallpaperDark: ['data:image/png;base64,a'] })
    store.actions.sync(next, 1)
    next.wallpaperDark.push('data:image/png;base64,b')
    expect(store.getSnapshot().wallpaperDark).toEqual(['data:image/png;base64,a'])
  })
})
