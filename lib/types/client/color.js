/**
 * HSL <-> hex conversions for the full-range color controls: the hue slider
 * covers the fast path, the native color input covers the whole space
 * (including black, white, and grays, which a hue-only slider cannot reach).
 */
/** Clamp a channel into [min, max] with a fallback. */
function clampChannel(value, min, max, fallback) {
    const n = Number(value);
    return Math.min(max, Math.max(min, Number.isFinite(n) ? n : fallback));
}
/**
 * Convert HSL to a `#rrggbb` hex string.
 * @param color - HSL color.
 * @returns hex string.
 */
export function hslToHex(color) {
    const h = clampChannel(color.h, 0, 360, 0) / 360;
    const s = clampChannel(color.s, 0, 100, 0) / 100;
    const l = clampChannel(color.l, 0, 100, 50) / 100;
    const hue2rgb = (p, q, t) => {
        let tt = t;
        if (tt < 0)
            tt += 1;
        if (tt > 1)
            tt -= 1;
        if (tt < 1 / 6)
            return p + (q - p) * 6 * tt;
        if (tt < 1 / 2)
            return q;
        if (tt < 2 / 3)
            return p + (q - p) * (2 / 3 - tt) * 6;
        return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    const channel = (t) => {
        const value = Math.round(hue2rgb(p, q, t) * 255);
        return value.toString(16).padStart(2, '0');
    };
    return `#${channel(h + 1 / 3)}${channel(h)}${channel(h - 1 / 3)}`;
}
/**
 * Convert a `#rrggbb` hex string to HSL.
 * @param hex - hex string (3- or 6-digit form).
 * @returns HSL color.
 */
export function hexToHsl(hex) {
    let value = hex.trim().replace(/^#/, '');
    if (value.length === 3) {
        value = value.split('').map(c => c + c).join('');
    }
    if (!/^[0-9a-fA-F]{6}$/.test(value))
        return { h: 0, s: 0, l: 50 };
    const r = parseInt(value.slice(0, 2), 16) / 255;
    const g = parseInt(value.slice(2, 4), 16) / 255;
    const b = parseInt(value.slice(4, 6), 16) / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const l = (max + min) / 2;
    if (max === min)
        return { h: 0, s: 0, l: Math.round(l * 100) };
    const d = max - min;
    const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    let h;
    if (max === r)
        h = ((g - b) / d + (g < b ? 6 : 0));
    else if (max === g)
        h = (b - r) / d + 2;
    else
        h = (r - g) / d + 4;
    h *= 60;
    return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) };
}
//# sourceMappingURL=color.js.map