/**
 * Wallpaper ingestion: reads an uploaded photo or animated GIF, downscales
 * static images (GIFs pass through untouched so their animation survives),
 * enforces the byte cap, and analyzes average luminance so the layer can
 * auto-dim the backdrop and keep text readable.
 */
/** Maximum accepted image/GIF wallpaper file size, bytes (30MB). */
export const MAX_WALLPAPER_BYTES = 30 * 1024 * 1024;
/** Longest edge a static wallpaper is downscaled to, px. */
export const MAX_STATIC_EDGE = 1920;
/** JPEG quality for downscaled static wallpapers. */
export const WALLPAPER_JPEG_QUALITY = 0.85;
/** Luminance returned when the analysis environment cannot draw pixels. */
export const UNKNOWN_LUMINANCE = 0.5;
/**
 * Whether the file is an animated GIF (every GIF is treated as animated:
 * the format cannot be reliably detected without a full decode, and
 * downscaling a GIF through a canvas would flatten its animation).
 * @param file - the picked file.
 * @returns true for image/gif inputs.
 */
export function isAnimatedGif(file) {
    return file.type === 'image/gif';
}
/**
 * Read a wallpaper file into a compact data URL.
 * Static images are downscaled to {@link MAX_STATIC_EDGE} and re-encoded as
 * JPEG; GIFs return their original data URL byte-for-byte.
 * @param file - the picked file.
 * @returns the data URL, or a typed rejection.
 */
export async function readWallpaper(file) {
    if (file.size > MAX_WALLPAPER_BYTES)
        return { kind: 'size', bytes: file.size };
    const raw = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => { resolve(String(reader.result)); };
        reader.onerror = () => { reject(reader.error); };
        reader.readAsDataURL(file);
    }).catch(() => null);
    if (raw === null)
        return { kind: 'read' };
    if (isAnimatedGif(file))
        return raw;
    const image = await decodeImage(raw);
    if (image === null)
        return { kind: 'decode' };
    return downscaleToJpeg(image, raw);
}
/**
 * Load a data URL into an Image (resolves null when decoding fails).
 * @param url - image data URL.
 * @returns the decoded image or null.
 */
export function decodeImage(url) {
    return new Promise((resolve) => {
        const image = new Image();
        image.onload = () => { resolve(image); };
        image.onerror = () => { resolve(null); };
        image.src = url;
    });
}
/**
 * Downscale an image to {@link MAX_STATIC_EDGE} and re-encode as JPEG.
 * Falls back to the original when no 2d context exists (test environments).
 * @param image - decoded source image.
 * @param original - original data URL, returned when drawing is unavailable.
 * @returns a compact JPEG data URL (or the original).
 */
export function downscaleToJpeg(image, original) {
    const scale = Math.min(1, MAX_STATIC_EDGE / Math.max(image.width, image.height));
    if (scale >= 1)
        return original;
    const width = Math.max(1, Math.round(image.width * scale));
    const height = Math.max(1, Math.round(image.height * scale));
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d');
    if (context === null)
        return original;
    context.drawImage(image, 0, 0, width, height);
    return canvas.toDataURL('image/jpeg', WALLPAPER_JPEG_QUALITY);
}
/**
 * Average pixel luminance (0-1) of an image, sampled on a tiny grid.
 * @param dataUrl - image data URL (a GIF's first frame is decoded).
 * @returns 0-1 average luminance, or {@link UNKNOWN_LUMINANCE} when the
 * environment cannot draw (jsdom, blocked canvases).
 */
export async function analyzeLuminance(dataUrl) {
    const image = await decodeImage(dataUrl);
    if (image === null)
        return UNKNOWN_LUMINANCE;
    const canvas = document.createElement('canvas');
    canvas.width = 8;
    canvas.height = 8;
    const context = canvas.getContext('2d');
    if (context === null)
        return UNKNOWN_LUMINANCE;
    try {
        context.drawImage(image, 0, 0, 8, 8);
        const data = context.getImageData(0, 0, 8, 8).data;
        let sum = 0;
        let count = 0;
        for (let i = 0; i < data.length; i += 4) {
            const r = (data[i] ?? 0) / 255;
            const g = (data[i + 1] ?? 0) / 255;
            const b = (data[i + 2] ?? 0) / 255;
            sum += 0.2126 * r + 0.7152 * g + 0.0722 * b;
            count += 1;
        }
        return count === 0 ? UNKNOWN_LUMINANCE : sum / count;
    }
    catch {
        // Tainted canvases (cross-origin pixels) cannot be read.
        return UNKNOWN_LUMINANCE;
    }
}
/**
 * Auto dim veil for a wallpaper: dark mode darkens bright wallpapers, light
 * mode brightens dark ones, so chat text always keeps contrast.
 * @param luminance - average wallpaper luminance, 0-1.
 * @param dark - resolved scheme is dark.
 * @returns veil alpha, 0-0.75.
 */
export function veilAlpha(luminance, dark) {
    if (dark)
        return Math.min(0.75, Math.max(0, luminance - 0.32) * 0.85);
    return Math.min(0.75, Math.max(0, 0.68 - luminance) * 0.85);
}
//# sourceMappingURL=wallpaper.js.map