/**
 * Durable Prism settings model: the knob document persisted as one JSON blob
 * in localStorage, its defaults, clamps, presets, material and font tables.
 * The layer is the only writer; every consumer (settings UI mirrors) reads
 * through the layer's getters.
 */
/** Material recipes: clear glass, frosted glass, and matte velvet. */
export const MATERIALS = Object.freeze({
    clear: Object.freeze({ saturate: 112, depth: 0.9 }),
    frosted: Object.freeze({ saturate: 130, depth: 1 }),
    velvet: Object.freeze({ saturate: 75, depth: 1.2 }),
});
/** UI font stacks by choice id (system = the stock stack). */
export const FONT_CHOICES = Object.freeze({
    system: '',
    rounded: "'PingFang SC', 'HarmonyOS Sans SC', 'MiSans', 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif",
    serif: "'Noto Serif SC', 'Songti SC', 'STSong', 'SimSun', 'Times New Roman', serif",
    mono: "'SF Mono', 'JetBrains Mono', 'Fira Code', 'Cascadia Code', Consolas, 'Liberation Mono', Menlo, monospace",
    custom: '',
});
/** Code font stacks by choice id. */
export const CODE_FONT_CHOICES = Object.freeze({
    system: '',
    rounded: "'SF Mono', 'JetBrains Mono', 'Fira Code', Consolas, 'Liberation Mono', Menlo, Courier, 'PingFang SC', 'Microsoft YaHei'",
    serif: "'JetBrains Mono', 'SF Mono', Consolas, 'PingFang SC', 'Microsoft YaHei', monospace",
    mono: "'JetBrains Mono', 'SF Mono', 'Fira Code', 'Cascadia Code', Consolas, 'Liberation Mono', Menlo, monospace",
    custom: '',
});
/** localStorage key carrying the knob document. */
export const PRISM_SETTINGS_KEY = 'dsh.ui-prism.settings.v1';
/** The neutral zone bundle (100 = follow the global frost). */
export const DEFAULT_ZONES = Object.freeze({
    base: 100,
    sidebar: 100,
    card: 100,
    input: 100,
    overlay: 100,
    bubble: 100,
});
/** Defaults a first-time install sees (the shipped look). */
export const SETTINGS_DEFAULTS = Object.freeze({
    enabled: true,
    material: 'frosted',
    blur: 18,
    frost: 50,
    zones: { ...DEFAULT_ZONES },
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
    accentOpacity: 100,
    bgHue: 215,
    bgSat: 80,
    bgLight: 60,
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
});
/** Curated whole-skin presets. */
export const PRESETS = Object.freeze({
    night: Object.freeze({ accentHue: 190, bgHue: 222, material: 'frosted', frost: 46, bgBrightness: 38, motion: 60 }),
    aurora: Object.freeze({ accentHue: 318, bgHue: 165, material: 'velvet', frost: 36, bgBrightness: 50, motion: 80 }),
    crystal: Object.freeze({ accentHue: 205, bgHue: 200, material: 'clear', frost: 30, bgBrightness: 56, motion: 30 }),
});
/** Numeric knob ranges. */
export const RANGES = Object.freeze({
    blur: { min: 0, max: 40 },
    frost: { min: 0, max: 100 },
    zone: { min: 20, max: 100 },
    bgBrightness: { min: 0, max: 100 },
    fontScale: { min: 85, max: 120 },
    hue: { min: 0, max: 360 },
    sat: { min: 0, max: 100 },
    light: { min: 0, max: 100 },
    accentOpacity: { min: 0, max: 100 },
    motion: { min: 0, max: 100 },
    wallpaperInterval: { min: 0, max: 120 },
    wallpaperBlur: { min: 0, max: 100 },
    wallpaperFrost: { min: 0, max: 100 },
});
/** Normalize one wallpaper slot (legacy documents carry a single URL string;
 *  retired `idb:` video markers are dropped). */
function wallpaperList(value) {
    if (typeof value === 'string')
        return value === '' ? [] : [value];
    if (Array.isArray(value))
        return value.filter((item) => typeof item === 'string' && !item.startsWith('idb:'));
    return [];
}
/** Normalize one luminance slot (mirrors the wallpaper list length). */
function dimList(value, fallbackCount) {
    if (typeof value === 'number')
        return [value];
    const list = Array.isArray(value) ? value.filter((item) => typeof item === 'number') : [];
    const out = list.slice(0, fallbackCount);
    while (out.length < fallbackCount)
        out.push(0.5);
    return out;
}
/** Numeric field reader with a default. */
function numberField(value, fallback) {
    return typeof value === 'number' ? value : fallback;
}
/** Zone reader: merges stored zones over the neutral defaults. */
function zonesField(value) {
    const stored = typeof value === 'object' && value !== null ? value : {};
    return {
        base: numberField(stored.base, DEFAULT_ZONES.base),
        sidebar: numberField(stored.sidebar, DEFAULT_ZONES.sidebar),
        card: numberField(stored.card, DEFAULT_ZONES.card),
        input: numberField(stored.input, DEFAULT_ZONES.input),
        overlay: numberField(stored.overlay, DEFAULT_ZONES.overlay),
        bubble: numberField(stored.bubble, DEFAULT_ZONES.bubble),
    };
}
/**
 * Read the persisted document, folding defaults over partial storage and
 * migrating legacy shapes (single-wallpaper strings, retired zone bundles,
 * the retired 'apple' material id, single ink hue/saturation pairs).
 * @returns the merged settings document.
 */
export function readSettings() {
    try {
        const raw = localStorage.getItem(PRISM_SETTINGS_KEY);
        if (raw === null)
            return { ...SETTINGS_DEFAULTS, zones: { ...DEFAULT_ZONES } };
        const parsed = JSON.parse(raw);
        const material = parsed.material === 'clear' || parsed.material === 'velvet' || parsed.material === 'frosted'
            ? parsed.material
            : SETTINGS_DEFAULTS.material;
        const wallpaperDark = wallpaperList(parsed.wallpaperDark);
        const wallpaperLight = wallpaperList(parsed.wallpaperLight);
        return {
            enabled: typeof parsed.enabled === 'boolean' ? parsed.enabled : SETTINGS_DEFAULTS.enabled,
            material,
            blur: numberField(parsed.blur, SETTINGS_DEFAULTS.blur),
            frost: numberField(parsed.frost, SETTINGS_DEFAULTS.frost),
            zones: zonesField(parsed.zones),
            bgBrightness: numberField(parsed.bgBrightness, SETTINGS_DEFAULTS.bgBrightness),
            fontScale: numberField(parsed.fontScale, SETTINGS_DEFAULTS.fontScale),
            fontChoice: parsed.fontChoice === 'rounded' || parsed.fontChoice === 'serif' || parsed.fontChoice === 'mono' || parsed.fontChoice === 'custom'
                ? parsed.fontChoice
                : 'system',
            customFont: typeof parsed.customFont === 'string' ? parsed.customFont : '',
            inkLightHue: numberField(parsed.inkLightHue ?? parsed.inkHue, SETTINGS_DEFAULTS.inkLightHue),
            inkLightSat: numberField(parsed.inkLightSat ?? parsed.inkSat, SETTINGS_DEFAULTS.inkLightSat),
            inkLightLight: numberField(parsed.inkLightLight, SETTINGS_DEFAULTS.inkLightLight),
            inkDarkHue: numberField(parsed.inkDarkHue ?? parsed.inkHue, SETTINGS_DEFAULTS.inkDarkHue),
            inkDarkSat: numberField(parsed.inkDarkSat ?? parsed.inkSat, SETTINGS_DEFAULTS.inkDarkSat),
            inkDarkLight: numberField(parsed.inkDarkLight, SETTINGS_DEFAULTS.inkDarkLight),
            accentHue: numberField(parsed.accentHue, SETTINGS_DEFAULTS.accentHue),
            accentSat: numberField(parsed.accentSat, SETTINGS_DEFAULTS.accentSat),
            accentLight: numberField(parsed.accentLight, SETTINGS_DEFAULTS.accentLight),
            accentOpacity: numberField(parsed.accentOpacity, SETTINGS_DEFAULTS.accentOpacity),
            bgHue: numberField(parsed.bgHue, SETTINGS_DEFAULTS.bgHue),
            bgSat: numberField(parsed.bgSat, SETTINGS_DEFAULTS.bgSat),
            bgLight: numberField(parsed.bgLight, SETTINGS_DEFAULTS.bgLight),
            motion: numberField(parsed.motion, SETTINGS_DEFAULTS.motion),
            background: parsed.background === 'wallpaper' ? 'wallpaper' : 'aurora',
            wallpaperDark,
            wallpaperLight,
            wallpaperDimDark: dimList(parsed.wallpaperDimDark, wallpaperDark.length),
            wallpaperDimLight: dimList(parsed.wallpaperDimLight, wallpaperLight.length),
            wallpaperInterval: numberField(parsed.wallpaperInterval, SETTINGS_DEFAULTS.wallpaperInterval),
            wallpaperLoop: parsed.wallpaperLoop === true,
            wallpaperPinnedDark: numberField(parsed.wallpaperPinnedDark, 0),
            wallpaperPinnedLight: numberField(parsed.wallpaperPinnedLight, 0),
            wallpaperBlur: numberField(parsed.wallpaperBlur, SETTINGS_DEFAULTS.wallpaperBlur),
            wallpaperFrost: numberField(parsed.wallpaperFrost, SETTINGS_DEFAULTS.wallpaperFrost),
        };
    }
    catch {
        return { ...SETTINGS_DEFAULTS, zones: { ...DEFAULT_ZONES } };
    }
}
/** Persist the document (quota failures keep the in-memory state). */
export function writeSettings(settings) {
    try {
        localStorage.setItem(PRISM_SETTINGS_KEY, JSON.stringify(settings));
    }
    catch {
        /* in-memory state still applies for this tab */
    }
}
/**
 * Whether a stored document is this plugin's own key (storage-event filter).
 * @param key - the StorageEvent key.
 * @returns true when the event targets the Prism document.
 */
export function isPrismStorageKey(key) {
    return key === PRISM_SETTINGS_KEY;
}
//# sourceMappingURL=prism-settings.js.map