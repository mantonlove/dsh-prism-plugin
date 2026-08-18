/**
 * Durable Prism settings model: the knob document persisted as one JSON blob
 * in localStorage, its defaults, clamps, presets, material and font tables.
 * The layer is the only writer; every consumer (settings UI mirrors) reads
 * through the layer's getters.
 */
/** The six independently adjustable glass zones (opacity 0-100; 100 = follow
 *  the global frost, lower values thin that zone's surfaces). */
export interface PrismZones {
    /** App base background. */
    base: number;
    /** Sidebar column. */
    sidebar: number;
    /** Cards and panels. */
    card: number;
    /** Composer input. */
    input: number;
    /** Menus, dropdowns, overlays. */
    overlay: number;
    /** Chat bubbles. */
    bubble: number;
}
/** The complete durable knob document. */
export interface PrismSettings {
    /** Master switch for the whole layer. */
    enabled: boolean;
    /** Glass material preset id. */
    material: PrismMaterial;
    /** Glass backdrop blur radius, px (0-40). */
    blur: number;
    /** Global frost amount, 0-100 (50 = 1x) — the global transparency knob. */
    frost: number;
    /** Per-zone glass opacities, 0-100 (100 = follow the global frost). */
    zones: PrismZones;
    /** Background brightness, 0-100 (50 = off; direction follows the scheme). */
    bgBrightness: number;
    /** Font scale percent, 85-120. */
    fontScale: number;
    /** UI font choice id (see FONT_CHOICES). */
    fontChoice: PrismFontChoice;
    /** Custom UI font family (used when fontChoice is 'custom'). */
    customFont: string;
    /** Text ink for the light scheme: hue, degrees. */
    inkLightHue: number;
    /** Text ink for the light scheme: saturation, 0-100. */
    inkLightSat: number;
    /** Text ink for the light scheme: lightness, 0-100. */
    inkLightLight: number;
    /** Text ink for the dark scheme: hue, degrees. */
    inkDarkHue: number;
    /** Text ink for the dark scheme: saturation, 0-100. */
    inkDarkSat: number;
    /** Text ink for the dark scheme: lightness, 0-100. */
    inkDarkLight: number;
    /** Accent hue, degrees (0-360). */
    accentHue: number;
    /** Accent saturation, 0-100. */
    accentSat: number;
    /** Accent lightness, 0-100 (0 = black, 100 = white — the full range). */
    accentLight: number;
    /** Accent opacity, 0-100 (applies to every accent-colored surface). */
    accentOpacity: number;
    /** Backdrop hue, degrees (0-360). */
    bgHue: number;
    /** Backdrop saturation, 0-100. */
    bgSat: number;
    /** Backdrop lightness, 0-100. */
    bgLight: number;
    /** Ambient motion intensity, 0-100 (0 = static). */
    motion: number;
    /** Backdrop source: animated aurora or uploaded wallpaper. */
    background: 'aurora' | 'wallpaper';
    /** Wallpaper data URLs per scheme (rotation list). */
    wallpaperDark: string[];
    /** Wallpaper data URLs for the light scheme. */
    wallpaperLight: string[];
    /** Auto-analyzed wallpaper luminance per scheme, 0-1 (0.5 = unknown). */
    wallpaperDimDark: number[];
    /** Auto-analyzed wallpaper luminance for the light scheme. */
    wallpaperDimLight: number[];
    /** Wallpaper rotation interval, seconds (used while looping). */
    wallpaperInterval: number;
    /** Whether wallpapers rotate automatically (false = the pinned image). */
    wallpaperLoop: boolean;
    /** Pinned wallpaper index per scheme (used while not looping). */
    wallpaperPinnedDark: number;
    /** Pinned wallpaper index for the light scheme. */
    wallpaperPinnedLight: number;
    /** Wallpaper blur amount, 0-100 (mapped to a perceptual px curve). */
    wallpaperBlur: number;
    /** Wallpaper frost veil, 0-100. */
    wallpaperFrost: number;
}
/** Glass material presets (saturation + opacity-depth recipe). */
export type PrismMaterial = 'clear' | 'frosted' | 'velvet';
/** UI font choice ids. */
export type PrismFontChoice = 'system' | 'rounded' | 'serif' | 'mono' | 'custom';
/** Named whole-skin presets. */
export type PrismPreset = 'night' | 'aurora' | 'crystal';
/** One material's recipe. */
export interface MaterialRecipe {
    /** Backdrop saturation percent (velvet desaturates for a matte feel). */
    saturate: number;
    /** Glass fill opacity depth multiplier (velvet sits denser). */
    depth: number;
}
/** Material recipes: clear glass, frosted glass, and matte velvet. */
export declare const MATERIALS: Readonly<Record<PrismMaterial, MaterialRecipe>>;
/** UI font stacks by choice id (system = the stock stack). */
export declare const FONT_CHOICES: Readonly<Record<PrismFontChoice, string>>;
/** Code font stacks by choice id. */
export declare const CODE_FONT_CHOICES: Readonly<Record<PrismFontChoice, string>>;
/** localStorage key carrying the knob document. */
export declare const PRISM_SETTINGS_KEY = "dsh.ui-prism.settings.v1";
/** The neutral zone bundle (100 = follow the global frost). */
export declare const DEFAULT_ZONES: PrismZones;
/** Defaults a first-time install sees (the shipped look). */
export declare const SETTINGS_DEFAULTS: PrismSettings;
/** One named preset's knob bundle. */
export interface PresetRecipe {
    /** Accent hue. */
    accentHue: number;
    /** Backdrop hue. */
    bgHue: number;
    /** Glass material id. */
    material: PrismMaterial;
    /** Global frost, 0-100. */
    frost: number;
    /** Background brightness, 0-100. */
    bgBrightness: number;
    /** Motion intensity, 0-100. */
    motion: number;
}
/** Curated whole-skin presets. */
export declare const PRESETS: Readonly<Record<PrismPreset, PresetRecipe>>;
/** Numeric knob ranges. */
export declare const RANGES: Readonly<{
    blur: {
        min: number;
        max: number;
    };
    frost: {
        min: number;
        max: number;
    };
    zone: {
        min: number;
        max: number;
    };
    bgBrightness: {
        min: number;
        max: number;
    };
    fontScale: {
        min: number;
        max: number;
    };
    hue: {
        min: number;
        max: number;
    };
    sat: {
        min: number;
        max: number;
    };
    light: {
        min: number;
        max: number;
    };
    accentOpacity: {
        min: number;
        max: number;
    };
    motion: {
        min: number;
        max: number;
    };
    wallpaperInterval: {
        min: number;
        max: number;
    };
    wallpaperBlur: {
        min: number;
        max: number;
    };
    wallpaperFrost: {
        min: number;
        max: number;
    };
}>;
/**
 * Read the persisted document, folding defaults over partial storage and
 * migrating legacy shapes (single-wallpaper strings, retired zone bundles,
 * the retired 'apple' material id, single ink hue/saturation pairs).
 * @returns the merged settings document.
 */
export declare function readSettings(): PrismSettings;
/** Persist the document (quota failures keep the in-memory state). */
export declare function writeSettings(settings: PrismSettings): void;
/**
 * Whether a stored document is this plugin's own key (storage-event filter).
 * @param key - the StorageEvent key.
 * @returns true when the event targets the Prism document.
 */
export declare function isPrismStorageKey(key: string | null): boolean;
//# sourceMappingURL=prism-settings.d.ts.map