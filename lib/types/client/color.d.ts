/**
 * HSL <-> hex conversions for the full-range color controls: the hue slider
 * covers the fast path, the native color input covers the whole space
 * (including black, white, and grays, which a hue-only slider cannot reach).
 */
/** One color in HSL space (h 0-360, s/l 0-100). */
export interface ColorHSL {
    h: number;
    s: number;
    l: number;
}
/**
 * Convert HSL to a `#rrggbb` hex string.
 * @param color - HSL color.
 * @returns hex string.
 */
export declare function hslToHex(color: ColorHSL): string;
/**
 * Convert a `#rrggbb` hex string to HSL.
 * @param hex - hex string (3- or 6-digit form).
 * @returns HSL color.
 */
export declare function hexToHsl(hex: string): ColorHSL;
//# sourceMappingURL=color.d.ts.map