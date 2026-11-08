/**
 * Portable Prism theme documents. A theme contains appearance values only:
 * wallpaper bytes, rotation state, the master switch, and the custom-theme
 * library itself never cross the file boundary. Every imported number is
 * finite-checked and clamped before it reaches the token layer.
 */
import { type PrismCustomTheme, type PrismSettings, type PrismThemeValues } from './prism-settings.ts';
/** Current interchange format identifier. */
export declare const PRISM_THEME_FORMAT = "dsh-prism-theme";
/** Current interchange schema version. */
export declare const PRISM_THEME_VERSION = 1;
/** Import is deliberately small because wallpaper data is not part of it. */
export declare const PRISM_THEME_MAX_BYTES: number;
/** The JSON file produced by export and accepted by import. */
export interface PrismThemeDocument {
    format: typeof PRISM_THEME_FORMAT;
    version: typeof PRISM_THEME_VERSION;
    name: string;
    values: PrismThemeValues;
}
/** Copy the portable appearance subset out of a complete settings object. */
export declare function themeSnapshot(settings: PrismSettings): PrismThemeValues;
/** Normalize untrusted portable values over the shipped defaults. */
export declare function normalizeThemeValues(input: unknown): PrismThemeValues;
/** Serialize a named snapshot with stable formatting. */
export declare function serializeTheme(settings: PrismSettings, name?: string): string;
/** Parse and normalize an imported JSON document.
 * @throws Error with a stable code for localized UI feedback.
 */
export declare function parseThemeDocument(raw: string): PrismThemeDocument;
/** Create a sanitized library entry; the caller owns persistence. */
export declare function makeCustomTheme(settings: PrismSettings, name: string, id: string): PrismCustomTheme;
//# sourceMappingURL=theme-io.d.ts.map