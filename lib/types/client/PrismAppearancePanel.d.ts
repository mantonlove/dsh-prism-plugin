import type { InjectFace, PropsLocale, PropsRuntime, PropsStore } from '@deepseek-ai/dsh-client-ui-slots';
import type { NS } from './locales.ts';
import type { createPrismRowStore } from './settings-store.ts';
import { type PrismFontChoice, type PrismMaterial, type PrismPreset, type PrismZones } from './prism-settings.ts';
import type { WallpaperError } from './wallpaper.ts';
/** Injected business face: the layer remains the single writer. */
export interface PrismAppearanceInjected {
    setEnabled: (enabled: boolean) => void;
    setMaterial: (value: PrismMaterial) => void;
    setBlur: (value: number) => void;
    setFrost: (value: number) => void;
    setBgBrightness: (value: number) => void;
    setFontScale: (value: number) => void;
    setFontChoice: (value: PrismFontChoice) => void;
    setCustomFont: (value: string) => void;
    setZone: (zone: keyof PrismZones, value: number) => void;
    setInkLightColor: (hue: number, sat: number, light: number) => void;
    setInkDarkColor: (hue: number, sat: number, light: number) => void;
    setAccentColor: (hue: number, sat: number, light: number) => void;
    setBgColor: (hue: number, sat: number, light: number) => void;
    setAccentOpacity: (value: number) => void;
    setMotion: (value: number) => void;
    setBackground: (value: 'aurora' | 'wallpaper') => void;
    setWallpaperInterval: (value: number) => void;
    setWallpaperLoop: (loop: boolean) => void;
    pinWallpaper: (scheme: 'dark' | 'light', index: number) => void;
    setWallpaperBlur: (value: number) => void;
    setWallpaperFrost: (value: number) => void;
    pickWallpaper: (scheme: 'dark' | 'light', file: File) => Promise<WallpaperError | null>;
    clearWallpaper: (scheme: 'dark' | 'light', index: number) => void;
    applyPreset: (preset: PrismPreset) => void;
    saveTheme: (name: string) => string | null;
    applyCustomTheme: (id: string) => void;
    deleteCustomTheme: (id: string) => void;
    exportTheme: () => string;
    importTheme: (raw: string) => string;
    resetZones: () => void;
    reset: () => void;
}
/** Full component props: runtime share + store share + locale seat + injected face. */
export type PrismAppearancePanelProps = PropsRuntime<'settings.general.item'> & PropsStore<ReturnType<typeof createPrismRowStore>> & PropsLocale<typeof NS> & InjectFace<PrismAppearanceInjected>;
/** Render the Prism appearance panel. */
export declare function PrismAppearancePanel(props: PrismAppearanceInjected & PrismAppearancePanelProps): import("react").JSX.Element;
//# sourceMappingURL=PrismAppearancePanel.d.ts.map