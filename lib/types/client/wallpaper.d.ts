/**
 * Wallpaper ingestion: reads an uploaded photo or animated GIF, downscales
 * static images (GIFs pass through untouched so their animation survives),
 * enforces the byte cap, and analyzes average luminance so the layer can
 * auto-dim the backdrop and keep text readable.
 */
/** Maximum accepted image/GIF wallpaper file size, bytes (30MB). */
export declare const MAX_WALLPAPER_BYTES: number;
/** Upper bound on how many files one pick may ingest at once. */
export declare const MAX_WALLPAPER_BATCH = 20;
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
/** Maximum accepted video wallpaper file size, bytes (40MB). */
export declare const MAX_VIDEO_BYTES: number;
/** Longest clip accepted, seconds. Longer files cost battery for no gain. */
export declare const MAX_VIDEO_DURATION = 60;
/** Longest edge the poster frame is captured at, px. */
export declare const MAX_POSTER_EDGE = 1280;
/** Prefix that turns a stored clip id into the string kept in settings. */
export declare const VIDEO_PREFIX = "video:";
/** Whether the picked file is a video the layer can play. */
export declare function isVideoFile(file: File): boolean;
/** Whether a settings entry points at a clip instead of an inline image. */
export declare function isVideoRef(source: string): boolean;
/** The clip id inside a `video:<id>` reference (empty when not a reference). */
export declare function videoIdOf(source: string): string;
/** Build the settings entry for a stored clip. */
export declare function videoRef(id: string): string;
/** What a successful video ingestion yields. */
export interface VideoIngest {
    /** The `video:<id>` string to store in settings. */
    ref: string;
    /** Average luminance of the poster frame, 0-1. */
    luminance: number;
    /** Poster JPEG, or null when the browser could not capture a frame. */
    poster: Blob | null;
    /** Clip length, seconds (0 when unknown). */
    duration: number;
    /** Intrinsic pixel size (0 when unknown). */
    width: number;
    height: number;
}
/**
 * Read, validate, and describe a video wallpaper without storing it.
 *
 * The caller persists the blob and poster through the video store; this
 * function only measures the clip, captures a poster frame, and derives the
 * luminance the backdrop veil needs.
 * @param file - picked video file.
 * @param id - id the caller will store the clip under.
 * @returns the ingestion result, or a typed rejection.
 */
export declare function readVideo(file: File, id: string): Promise<VideoIngest | WallpaperError>;
//# sourceMappingURL=wallpaper.d.ts.map