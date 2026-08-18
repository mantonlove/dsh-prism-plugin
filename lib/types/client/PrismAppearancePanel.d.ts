import type { InjectFace, PropsLocale, PropsRuntime, PropsStore } from '@deepseek-ai/dsh-client-ui-slots';
import type { NS } from './locales.ts';
import type { createPrismRowStore } from './settings-store.ts';
import type { PrismFontChoice, PrismMaterial, PrismPreset, PrismZones } from './prism-settings.ts';
import type { WallpaperError } from './wallpaper.ts';
/** Injected business face: every knob write except the master switch. */
export interface PrismAppearanceInjected {
    /** Set the glass material preset. */
    setMaterial: (value: PrismMaterial) => void;
    /** Set the glass blur radius, px. */
    setBlur: (value: number) => void;
    /** Set the global frost amount, 0-100. */
    setFrost: (value: number) => void;
    /** Set the background brightness, 0-100 (50 = off). */
    setBgBrightness: (value: number) => void;
    /** Set the font scale percent, 85-120. */
    setFontScale: (value: number) => void;
    /** Set the UI font choice. */
    setFontChoice: (value: PrismFontChoice) => void;
    /** Set the custom UI font family. */
    setCustomFont: (value: string) => void;
    /** Set one zone opacity, 0-100 (100 = follow the global frost). */
    setZone: (zone: keyof PrismZones, value: number) => void;
    /** Set the light-mode text ink (full range). */
    setInkLightColor: (hue: number, sat: number, light: number) => void;
    /** Set the dark-mode text ink (full range). */
    setInkDarkColor: (hue: number, sat: number, light: number) => void;
    /** Set the accent color (hue/sat/lightness, full range). */
    setAccentColor: (hue: number, sat: number, light: number) => void;
    /** Set the backdrop color (hue/sat/lightness, full range). */
    setBgColor: (hue: number, sat: number, light: number) => void;
    /** Set the accent opacity, 0-100. */
    setAccentOpacity: (value: number) => void;
    /** Set the motion intensity, 0-100. */
    setMotion: (value: number) => void;
    /** Set the backdrop source. */
    setBackground: (value: 'aurora' | 'wallpaper') => void;
    /** Set the wallpaper rotation interval, seconds. */
    setWallpaperInterval: (value: number) => void;
    /** Toggle automatic wallpaper rotation. */
    setWallpaperLoop: (loop: boolean) => void;
    /** Pin one rotation-list image as the fixed background (stops the loop). */
    pinWallpaper: (scheme: 'dark' | 'light', index: number) => void;
    /** Set the wallpaper blur amount, 0-100. */
    setWallpaperBlur: (value: number) => void;
    /** Set the wallpaper frost veil, 0-100. */
    setWallpaperFrost: (value: number) => void;
    /** Ingest an uploaded wallpaper for one scheme (photo or GIF). */
    pickWallpaper: (scheme: 'dark' | 'light', file: File) => Promise<WallpaperError | null>;
    /** Remove one scheme's wallpaper at a rotation-list index. */
    clearWallpaper: (scheme: 'dark' | 'light', index: number) => void;
    /** Apply a named preset bundle. */
    applyPreset: (preset: PrismPreset) => void;
    /** Reset every knob to defaults. */
    reset: () => void;
}
/** Full component props: runtime share + store share + locale seat + injected face. */
export type PrismAppearancePanelProps = PropsRuntime<'settings.general.item'> & PropsStore<ReturnType<typeof createPrismRowStore>> & PropsLocale<typeof NS> & InjectFace<PrismAppearanceInjected>;
/**
 * Render the Prism appearance panel.
 * @param props - composed slot props.
 * @returns the General section panel.
 */
export declare function PrismAppearancePanel(props: PrismAppearancePanelProps): import("react").JSX.Element | null;
//# sourceMappingURL=PrismAppearancePanel.d.ts.map