/**
 * Prism client plugin body: the toggleable glassmorphism skin. Owns the
 * durable settings document, applies/retracts the theme layer through the
 * official theme override stack, and registers two settings surfaces:
 * - the master on/off card into the Plugins section (`settings.plugin.item`,
 *   same shape as the other plugin cards);
 * - every glass knob into the General section's appearance area
 *   (`settings.general.item`, right under 外观).
 * One click on the master switch returns the stock UI (every layer is an
 * effect, disposed on flip).
 */
import type { ClientContext } from '@deepseek-ai/dsh-client-runtime/client'
import type { BoundActions } from '@deepseek-ai/dsh-client-ui-slots'
// Type-only: pulls the `settings.plugin.item` SlotMap merge.
import type {} from '@deepseek-ai/dsh-client-ui-settings-plugins/client'
// Type-only: pulls the `settings.general.item` SlotMap merge.
import type {} from '@deepseek-ai/dsh-client-ui-settings/client'
import { PrismPluginCard, type PrismPluginCardInjected } from './PrismPluginCard.tsx'
import { PrismAppearancePanel, type PrismAppearanceInjected } from './PrismAppearancePanel.tsx'
import { createPrismRowStore, type PrismSettingsPayload } from './settings-store.ts'
import { en, NS, zh } from './locales.ts'
import { PrismLayer } from './theme-layer.ts'
import type { PrismFontChoice, PrismMaterial, PrismPreset, PrismZones } from './prism-settings.ts'
// Side-effect import: the theme-layer stylesheet (unloaded with the plugin bundle).
import './prism.module.css'

/** Required services: theme override stack plus the settings-card surfaces. */
export const inject = ['theme', 'slots', 'locale']

/**
 * Client plugin body.
 * @param ctx - client cordis context.
 */
export function apply(ctx: ClientContext): void {
  ctx.effect(() => ctx.locale.register(NS, { zh, en }), 'ui-prism: settings dictionaries')

  // Two store mirrors of the same layer state: one for the Plugins card
  // (master switch) and one for the General section's appearance panel.
  const pluginStore = createPrismRowStore()
  const appearanceStore = createPrismRowStore()
  let pluginBound: BoundActions<typeof pluginStore> | undefined
  let appearanceBound: BoundActions<typeof appearanceStore> | undefined
  let revision = 0

  const layer = new PrismLayer(ctx, () => { sync() })
  const payload = (): PrismSettingsPayload => ({ ...layer.getSettings(), dark: layer.getDark() })
  const sync = (): void => {
    const next = payload()
    pluginBound?.sync(next, revision)
    appearanceBound?.sync(next, revision)
    revision += 1
  }

  const pluginInjected = (actions: BoundActions<typeof pluginStore>): PrismPluginCardInjected => {
    pluginBound = actions
    sync()
    return {
      setEnabled: (enabled) => {
        layer.setEnabled(enabled)
      },
    }
  }

  const appearanceInjected = (actions: BoundActions<typeof appearanceStore>): PrismAppearanceInjected => {
    appearanceBound = actions
    sync()
    return {
      setMaterial: (material: PrismMaterial) => { layer.update({ material }) },
      setBlur: (blur: number) => { layer.update({ blur }) },
      setFrost: (frost: number) => { layer.update({ frost }) },
      setBgBrightness: (bgBrightness: number) => { layer.update({ bgBrightness }) },
      setFontScale: (fontScale: number) => { layer.update({ fontScale }) },
      setFontChoice: (fontChoice: PrismFontChoice) => { layer.update({ fontChoice }) },
      setCustomFont: (customFont: string) => { layer.update({ customFont }) },
      setZone: (zone: keyof PrismZones, value: number) => {
        const patch: Partial<PrismZones> = {}
        patch[zone] = value
        layer.update({ zones: patch })
      },
      setInkLightColor: (inkLightHue: number, inkLightSat: number, inkLightLight: number) => { layer.update({ inkLightHue, inkLightSat, inkLightLight }) },
      setInkDarkColor: (inkDarkHue: number, inkDarkSat: number, inkDarkLight: number) => { layer.update({ inkDarkHue, inkDarkSat, inkDarkLight }) },
      setAccentColor: (accentHue: number, accentSat: number, accentLight: number) => { layer.update({ accentHue, accentSat, accentLight }) },
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
      reset: () => { layer.reset() },
    }
  }

  // Master switch card in the Plugins configurable tab.
  ctx.slots.inject('settings.plugin.item', () => ctx.slots.register({
    name: 'settings.plugin.item',
    key: 'prism',
    store: pluginStore,
    locale: NS,
    inject: pluginInjected,
  }, PrismPluginCard))

  // Glass knobs panel in the General section, right under Appearance (10).
  ctx.slots.inject('settings.general.item', () => ctx.slots.register({
    name: 'settings.general.item',
    id: 'prism',
    order: 12,
    store: appearanceStore,
    locale: NS,
    inject: appearanceInjected,
  }, PrismAppearancePanel))
}
