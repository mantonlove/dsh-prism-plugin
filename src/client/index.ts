/**
 * Prism client plugin body. The official theme override stack owns visual
 * state; the General → Appearance panel owns every control, including the
 * master switch (DSH 0.2.2 removed the legacy settings.plugin.item slot).
 * Disabling Prism retracts every override and returns the stock interface.
 */
import type { Context as ClientContext } from '@deepseek-ai/cordis'
import type { BoundActions } from '@deepseek-ai/dsh-client-ui-slots'
import type {} from '@deepseek-ai/dsh-client-ui-renderer/client'
import type {} from '@deepseek-ai/dsh-client-ui-settings/client'
import { PrismAppearancePanel, type PrismAppearanceInjected } from './PrismAppearancePanel.tsx'
import { createPrismRowStore, type PrismSettingsPayload } from './settings-store.ts'
import { en, NS, zh } from './locales.ts'
import { PrismLayer } from './theme-layer.ts'
import type { PrismFontChoice, PrismMaterial, PrismPreset, PrismZones } from './prism-settings.ts'
import './prism.module.css'

export const inject = ['theme', 'slots', 'locale']

/** Register Prism's single settings surface and its reactive state bridge. */
export function apply(ctx: ClientContext): void {
  ctx.effect(() => ctx.locale.register(NS, { zh, en }), 'ui-prism: settings dictionaries')

  const appearanceStore = createPrismRowStore()
  let appearanceBound: BoundActions<typeof appearanceStore> | undefined
  let revision = 0
  const layer = new PrismLayer(ctx, () => { sync() })
  const sync = (): void => {
    const payload: PrismSettingsPayload = { ...layer.getSettings(), dark: layer.getDark() }
    appearanceBound?.sync(payload, revision)
    revision += 1
  }

  const appearanceInjected = (actions: BoundActions<typeof appearanceStore>): PrismAppearanceInjected => {
    appearanceBound = actions
    sync()
    return {
      setEnabled: (enabled) => { layer.setEnabled(enabled) },
      setMaterial: (material: PrismMaterial) => { layer.update({ material }) },
      setBlur: (blur: number) => { layer.update({ blur }) },
      setFrost: (frost: number) => { layer.update({ frost }) },
      setBgBrightness: (bgBrightness: number) => { layer.update({ bgBrightness }) },
      setFontScale: (fontScale: number) => { layer.update({ fontScale }) },
      setFontChoice: (fontChoice: PrismFontChoice) => { layer.update({ fontChoice }) },
      setCustomFont: (customFont: string) => { layer.update({ customFont }) },
      setZone: (zone: keyof PrismZones, value: number) => { layer.update({ zones: { [zone]: value } }) },
      setInkLightColor: (inkLightHue: number, inkLightSat: number, inkLightLight: number) => {
        layer.update({ inkLightHue, inkLightSat, inkLightLight })
      },
      setInkDarkColor: (inkDarkHue: number, inkDarkSat: number, inkDarkLight: number) => {
        layer.update({ inkDarkHue, inkDarkSat, inkDarkLight })
      },
      setAccentColor: (accentHue: number, accentSat: number, accentLight: number) => {
        layer.update({ accentHue, accentSat, accentLight })
      },
      setBgColor: (bgHue: number, bgSat: number, bgLight: number) => { layer.update({ bgHue, bgSat, bgLight }) },
      setAccentOpacity: (accentOpacity: number) => { layer.update({ accentOpacity }) },
      setMotion: (motion: number) => { layer.update({ motion }) },
      setBackground: (background: 'aurora' | 'wallpaper') => { layer.update({ background }) },
      setWallpaperInterval: (wallpaperInterval: number) => { layer.update({ wallpaperInterval }) },
      setWallpaperLoop: (wallpaperLoop: boolean) => { layer.setWallpaperLoop(wallpaperLoop) },
      pinWallpaper: (scheme, index) => { layer.pinWallpaper(scheme, index) },
      setWallpaperBlur: (wallpaperBlur: number) => { layer.update({ wallpaperBlur }) },
      setWallpaperFrost: (wallpaperFrost: number) => { layer.update({ wallpaperFrost }) },
      pickWallpaper: (scheme, file) => layer.setWallpaperFromFile(scheme, file),
      clearWallpaper: (scheme, index) => { layer.clearWallpaper(scheme, index) },
      applyPreset: (preset: PrismPreset) => { layer.applyPreset(preset) },
      saveTheme: (name) => layer.saveTheme(name),
      applyCustomTheme: (id) => { layer.applyCustomTheme(id) },
      deleteCustomTheme: (id) => { layer.deleteCustomTheme(id) },
      exportTheme: () => layer.exportTheme(),
      importTheme: (raw) => layer.importTheme(raw),
      resetZones: () => { layer.resetZones() },
      reset: () => { layer.reset() },
    }
  }

  ctx.slots.inject('settings.general.item', () => ctx.slots.register({
    name: 'settings.general.item',
    id: 'prism',
    order: 12,
    store: appearanceStore,
    locale: NS,
    inject: appearanceInjected,
  }, PrismAppearancePanel))
}
