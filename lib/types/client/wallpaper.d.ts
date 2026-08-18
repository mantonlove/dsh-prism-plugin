/**
 * Wallpaper ingestion: reads an uploaded photo or animated GIF, downscales
 * static images (GIFs pass through untouched so their animation survives),
 * enforces the byte cap, and analyzes average luminance so the layer can
 * auto-dim the backdrop and keep text readable.
 */
/** Maximum accepted image/GIF wallpaper file size, bytes (30MB). */
export declare const MAX_WALLPAPER_BYTES: number;
/** Longest edge a static wallpaper is downscaled to, px. */
export declare const MAX_STATIC_EDGE = 1920;
/** JPEG quality for downscaled static wallpapers. */
export declare const WALLPAPER_JPEG_QUALITY = 0.85;
/** Luminance returned when the analysis environment cannot draw pixels. */
export declare const UNKNOWN_LUMINANCE = 0.5;
/** Wallpaper rejection reasons, surfaced through the settings row. */
export type WallpaperError = {
    kind: 'size';
    bytes: number;
} | {
    kind: 'read';
} | {
    kind: 'decode';
};
/**
 * Whether the file is an animated GIF (every GIF is treated as animated:
 * the format cannot be reliably detected without a full decode, and
 * downscaling a GIF through a canvas would flatten its animation).
 * @param file - the picked file.
 * @returns true for image/gif inputs.
 */
export declare function isAnimatedGif(file: File): boolean;
/**
 * Read a wallpaper file into a compact data URL.
 * Static images are downscaled to {@link MAX_STATIC_EDGE} and re-encoded as
 * JPEG; GIFs return their original data URL byte-for-byte.
 * @param file - the picked file.
 * @returns the data URL, or a typed rejection.
 */
export declare function readWallpaper(file: File): Promise<string | WallpaperError>;
/**
 * Load a data URL into an Image (resolves null when decoding fails).
 * @param url - image data URL.
 * @returns the decoded image or null.
 */
export declare function decodeImage(url: string): Promise<HTMLImageElement | null>;
/**
 * Downscale an image to {@link MAX_STATIC_EDGE} and re-encode as JPEG.
 * Falls back to the original when no 2d context exists (test environments).
 * @param image - decoded source image.
 * @param original - original data URL, returned when drawing is unavailable.
 * @returns a compact JPEG data URL (or the original).
 */
export declare function downscaleToJpeg(image: HTMLImageElement, original: string): string;
/**
 * Average pixel luminance (0-1) of an image, sampled on a tiny grid.
 * @param dataUrl - image data URL (a GIF's first frame is decoded).
 * @returns 0-1 average luminance, or {@link UNKNOWN_LUMINANCE} when the
 * environment cannot draw (jsdom, blocked canvases).
 */
export declare function analyzeLuminance(dataUrl: string): Promise<number>;
/**
 * Auto dim veil for a wallpaper: dark mode darkens bright wallpapers, light
 * mode brightens dark ones, so chat text always keeps contrast.
 * @param luminance - average wallpaper luminance, 0-1.
 * @param dark - resolved scheme is dark.
 * @returns veil alpha, 0-0.75.
 */
export declare function veilAlpha(luminance: number, dark: boolean): number;
//# sourceMappingURL=wallpaper.d.ts.map