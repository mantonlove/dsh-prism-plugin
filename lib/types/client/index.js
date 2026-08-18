import { PrismPluginCard } from "./PrismPluginCard.js";
import { PrismAppearancePanel } from "./PrismAppearancePanel.js";
import { createPrismRowStore } from "./settings-store.js";
import { en, NS, zh } from "./locales.js";
import { PrismLayer } from "./theme-layer.js";
// Side-effect import: the theme-layer stylesheet (unloaded with the plugin bundle).
import './prism.module.css';
/** Required services: theme override stack plus the settings-card surfaces. */
export const inject = ['theme', 'slots', 'locale'];
/**
 * Client plugin body.
 * @param ctx - client cordis context.
 */
export function apply(ctx) {
    ctx.effect(() => ctx.locale.register(NS, { zh, en }), 'ui-prism: settings dictionaries');
    // Two store mirrors of the same layer state: one for the Plugins card
    // (master switch) and one for the General section's appearance panel.
    const pluginStore = createPrismRowStore();
    const appearanceStore = createPrismRowStore();
    let pluginBound;
    let appearanceBound;
    let revision = 0;
    const layer = new PrismLayer(ctx, () => { sync(); });
    const payload = () => ({ ...layer.getSettings(), dark: layer.getDark() });
    const sync = () => {
        const next = payload();
        pluginBound?.sync(next, revision);
        appearanceBound?.sync(next, revision);
        revision += 1;
    };
    const pluginInjected = (actions) => {
        pluginBound = actions;
        sync();
        return {
            setEnabled: (enabled) => {
                layer.setEnabled(enabled);
            },
        };
    };
    const appearanceInjected = (actions) => {
        appearanceBound = actions;
        sync();
        return {
            setMaterial: (material) => { layer.update({ material }); },
            setBlur: (blur) => { layer.update({ blur }); },
            setFrost: (frost) => { layer.update({ frost }); },
            setBgBrightness: (bgBrightness) => { layer.update({ bgBrightness }); },
            setFontScale: (fontScale) => { layer.update({ fontScale }); },
            setFontChoice: (fontChoice) => { layer.update({ fontChoice }); },
            setCustomFont: (customFont) => { layer.update({ customFont }); },
            setZone: (zone, value) => {
                const patch = {};
                patch[zone] = value;
                layer.update({ zones: patch });
            },
            setInkLightColor: (inkLightHue, inkLightSat, inkLightLight) => { layer.update({ inkLightHue, inkLightSat, inkLightLight }); },
            setInkDarkColor: (inkDarkHue, inkDarkSat, inkDarkLight) => { layer.update({ inkDarkHue, inkDarkSat, inkDarkLight }); },
            setAccentColor: (accentHue, accentSat, accentLight) => { layer.update({ accentHue, accentSat, accentLight }); },
            setBgColor: (bgHue, bgSat, bgLight) => { layer.update({ bgHue, bgSat, bgLight }); },
            setAccentOpacity: (accentOpacity) => { layer.update({ accentOpacity }); },
            setMotion: (motion) => { layer.update({ motion }); },
            setBackground: (background) => { layer.update({ background }); },
            setWallpaperInterval: (wallpaperInterval) => { layer.update({ wallpaperInterval }); },
            setWallpaperLoop: (wallpaperLoop) => { layer.setWallpaperLoop(wallpaperLoop); },
            pinWallpaper: (scheme, index) => { layer.pinWallpaper(scheme, index); },
            setWallpaperBlur: (wallpaperBlur) => { layer.update({ wallpaperBlur }); },
            setWallpaperFrost: (wallpaperFrost) => { layer.update({ wallpaperFrost }); },
            pickWallpaper: (scheme, file) => layer.setWallpaperFromFile(scheme, file),
            clearWallpaper: (scheme, index) => { layer.clearWallpaper(scheme, index); },
            applyPreset: (preset) => { layer.applyPreset(preset); },
            reset: () => { layer.reset(); },
        };
    };
    // Master switch card in the Plugins configurable tab.
    ctx.slots.inject('settings.plugin.item', () => ctx.slots.register({
        name: 'settings.plugin.item',
        id: 'prism',
        order: 6,
        store: pluginStore,
        locale: NS,
        inject: pluginInjected,
    }, PrismPluginCard));
    // Glass knobs panel in the General section, right under Appearance (10).
    ctx.slots.inject('settings.general.item', () => ctx.slots.register({
        name: 'settings.general.item',
        id: 'prism',
        order: 12,
        store: appearanceStore,
        locale: NS,
        inject: appearanceInjected,
    }, PrismAppearancePanel));
}
//# sourceMappingURL=index.js.map