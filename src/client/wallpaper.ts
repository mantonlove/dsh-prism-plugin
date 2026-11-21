/**
 * Wallpaper ingestion: reads an uploaded photo or animated GIF, downscales
 * static images (GIFs pass through untouched so their animation survives),
 * enforces the byte cap, and analyzes average luminance so the layer can
 * auto-dim the backdrop and keep text readable.
 */

/** Maximum accepted image/GIF wallpaper file size, bytes (30MB). */
export const MAX_WALLPAPER_BYTES = 30 * 1024 * 1024

/** Upper bound on how many files one pick may ingest at once. */
export const MAX_WALLPAPER_BATCH = 20
/** Longest edge a static wallpaper is downscaled to, px. */
export const MAX_STATIC_EDGE = 1920
/** JPEG quality for downscaled static wallpapers. */
export const WALLPAPER_JPEG_QUALITY = 0.85
/** Luminance returned when the analysis environment cannot draw pixels. */
export const UNKNOWN_LUMINANCE = 0.5

/** Wallpaper rejection reasons, surfaced through the settings row. */
export type WallpaperError =
  | { kind: 'size'; bytes: number }
  | { kind: 'read' }
  | { kind: 'decode' }

/**
 * Whether the file is an animated GIF (every GIF is treated as animated:
 * the format cannot be reliably detected without a full decode, and
 * downscaling a GIF through a canvas would flatten its animation).
 * @param file - the picked file.
 * @returns true for image/gif inputs.
 */
export function isAnimatedGif(file: File): boolean {
  return file.type === 'image/gif'
}

/**
 * Read a wallpaper file into a compact data URL.
 * Static images are downscaled to {@link MAX_STATIC_EDGE} and re-encoded as
 * JPEG; GIFs return their original data URL byte-for-byte.
 * @param file - the picked file.
 * @returns the data URL, or a typed rejection.
 */
export async function readWallpaper(file: File): Promise<string | WallpaperError> {
  if (file.size > MAX_WALLPAPER_BYTES) return { kind: 'size', bytes: file.size }
  const raw = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result
      resolve(typeof result === 'string' ? result : '')
    }
    reader.onerror = () => {
      reject(new Error(reader.error?.message ?? 'FileReader failed to read the wallpaper file', { cause: reader.error }))
    }
    reader.readAsDataURL(file)
  }).catch(() => null)
  if (raw === null) return { kind: 'read' }
  if (isAnimatedGif(file)) return raw
  const image = await decodeImage(raw)
  if (image === null) return { kind: 'decode' }
  return downscaleToJpeg(image, raw)
}

/**
 * Load a data URL into an Image (resolves null when decoding fails).
 * @param url - image data URL.
 * @returns the decoded image or null.
 */
export function decodeImage(url: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const image = new Image()
    image.onload = () => { resolve(image) }
    image.onerror = () => { resolve(null) }
    image.src = url
  })
}

/**
 * Downscale an image to {@link MAX_STATIC_EDGE} and re-encode as JPEG.
 * Falls back to the original when no 2d context exists (test environments).
 * @param image - decoded source image.
 * @param original - original data URL, returned when drawing is unavailable.
 * @returns a compact JPEG data URL (or the original).
 */
export function downscaleToJpeg(image: HTMLImageElement, original: string): string {
  const scale = Math.min(1, MAX_STATIC_EDGE / Math.max(image.width, image.height))
  if (scale >= 1) return original
  const width = Math.max(1, Math.round(image.width * scale))
  const height = Math.max(1, Math.round(image.height * scale))
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const context = canvas.getContext('2d')
  if (context === null) return original
  context.drawImage(image, 0, 0, width, height)
  return canvas.toDataURL('image/jpeg', WALLPAPER_JPEG_QUALITY)
}

/**
 * Average pixel luminance (0-1) of an image, sampled on a tiny grid.
 * @param dataUrl - image data URL (a GIF's first frame is decoded).
 * @returns 0-1 average luminance, or {@link UNKNOWN_LUMINANCE} when the
 * environment cannot draw (jsdom, blocked canvases).
 */
export async function analyzeLuminance(dataUrl: string): Promise<number> {
  const image = await decodeImage(dataUrl)
  if (image === null) return UNKNOWN_LUMINANCE
  const canvas = document.createElement('canvas')
  canvas.width = 8
  canvas.height = 8
  const context = canvas.getContext('2d')
  if (context === null) return UNKNOWN_LUMINANCE
  try {
    context.drawImage(image, 0, 0, 8, 8)
    const data = context.getImageData(0, 0, 8, 8).data
    let sum = 0
    let count = 0
    for (let i = 0; i < data.length; i += 4) {
      const r = (data[i] ?? 0) / 255
      const g = (data[i + 1] ?? 0) / 255
      const b = (data[i + 2] ?? 0) / 255
      sum += 0.2126 * r + 0.7152 * g + 0.0722 * b
      count += 1
    }
    return count === 0 ? UNKNOWN_LUMINANCE : sum / count
  } catch {
    // Tainted canvases (cross-origin pixels) cannot be read.
    return UNKNOWN_LUMINANCE
  }
}

/**
 * Auto dim veil for a wallpaper: dark mode darkens bright wallpapers, light
 * mode brightens dark ones, so chat text always keeps contrast.
 * @param luminance - average wallpaper luminance, 0-1.
 * @param dark - resolved scheme is dark.
 * @returns veil alpha, 0-0.75.
 */
export function veilAlpha(luminance: number, dark: boolean): number {
  if (dark) return Math.min(0.75, Math.max(0, luminance - 0.32) * 0.85)
  return Math.min(0.75, Math.max(0, 0.68 - luminance) * 0.85)
}

/** Maximum accepted video wallpaper file size, bytes (40MB). */
export const MAX_VIDEO_BYTES = 40 * 1024 * 1024

/** Longest clip accepted, seconds. Longer files cost battery for no gain. */
export const MAX_VIDEO_DURATION = 60

/** Longest edge the poster frame is captured at, px. */
export const MAX_POSTER_EDGE = 1280

/** Prefix that turns a stored clip id into the string kept in settings. */
export const VIDEO_PREFIX = 'video:'

/** Whether the picked file is a video the layer can play. */
export function isVideoFile(file: File): boolean {
  return file.type.startsWith('video/')
}

/** Whether a settings entry points at a clip instead of an inline image. */
export function isVideoRef(source: string): boolean {
  return source.startsWith(VIDEO_PREFIX) && source.length > VIDEO_PREFIX.length
}

/** The clip id inside a `video:<id>` reference (empty when not a reference). */
export function videoIdOf(source: string): string {
  return isVideoRef(source) ? source.slice(VIDEO_PREFIX.length) : ''
}

/** Build the settings entry for a stored clip. */
export function videoRef(id: string): string {
  return `${VIDEO_PREFIX}${id}`
}

/** What a successful video ingestion yields. */
export interface VideoIngest {
  /** The `video:<id>` string to store in settings. */
  ref: string
  /** Average luminance of the poster frame, 0-1. */
  luminance: number
  /** Poster JPEG, or null when the browser could not capture a frame. */
  poster: Blob | null
  /** Clip length, seconds (0 when unknown). */
  duration: number
  /** Intrinsic pixel size (0 when unknown). */
  width: number
  height: number
}

/**
 * Load a video file's metadata by pointing an off-DOM element at it.
 * @param url - object URL for the file.
 * @returns the element, or null when metadata never arrives.
 */
function loadVideo(url: string): Promise<HTMLVideoElement | null> {
  return new Promise((resolve) => {
    const video = document.createElement('video')
    video.preload = 'metadata'
    video.muted = true
    video.playsInline = true
    const settle = (value: HTMLVideoElement | null) => {
      video.onloadedmetadata = null
      video.onerror = null
      resolve(value)
    }
    video.onloadedmetadata = () => { settle(video) }
    video.onerror = () => { settle(null) }
    video.src = url
    window.setTimeout(() => { settle(null) }, 8000)
  })
}

/**
 * Draw one frame of a video onto a canvas and read it back.
 * @param video - element already positioned on the frame.
 * @returns poster blob (may be null) and the frame's average luminance.
 */
function captureFrame(video: HTMLVideoElement): { poster: Blob | null; luminance: number } {
  const width = video.videoWidth || 0
  const height = video.videoHeight || 0
  if (width === 0 || height === 0) return { poster: null, luminance: UNKNOWN_LUMINANCE }
  const scale = Math.min(1, MAX_POSTER_EDGE / Math.max(width, height))
  const canvas = document.createElement('canvas')
  canvas.width = Math.max(1, Math.round(width * scale))
  canvas.height = Math.max(1, Math.round(height * scale))
  const context = canvas.getContext('2d')
  if (context === null) return { poster: null, luminance: UNKNOWN_LUMINANCE }
  try {
    context.drawImage(video, 0, 0, canvas.width, canvas.height)
  } catch {
    return { poster: null, luminance: UNKNOWN_LUMINANCE }
  }
  let luminance = UNKNOWN_LUMINANCE
  try {
    const sample = document.createElement('canvas')
    sample.width = 8
    sample.height = 8
    const sampleContext = sample.getContext('2d')
    if (sampleContext !== null) {
      sampleContext.drawImage(canvas, 0, 0, 8, 8)
      const data = sampleContext.getImageData(0, 0, 8, 8).data
      let sum = 0
      let count = 0
      for (let i = 0; i < data.length; i += 4) {
        sum += 0.2126 * ((data[i] ?? 0) / 255) + 0.7152 * ((data[i + 1] ?? 0) / 255) + 0.0722 * ((data[i + 2] ?? 0) / 255)
        count += 1
      }
      if (count > 0) luminance = sum / count
    }
  } catch {
    luminance = UNKNOWN_LUMINANCE
  }
  let poster: Blob | null = null
  try {
    const dataUrl = canvas.toDataURL('image/jpeg', WALLPAPER_JPEG_QUALITY)
    poster = dataUrlToBlob(dataUrl)
  } catch {
    poster = null
  }
  return { poster, luminance }
}

/** Convert a data URL into a Blob without another async hop. */
function dataUrlToBlob(dataUrl: string): Blob | null {
  const comma = dataUrl.indexOf(',')
  if (comma < 0) return null
  const header = dataUrl.slice(0, comma)
  const body = dataUrl.slice(comma + 1)
  const mime = /^data:([^;]+)/.exec(header)?.[1] ?? 'image/jpeg'
  if (!header.includes(';base64')) return new Blob([decodeURIComponent(body)], { type: mime })
  try {
    const binary = atob(body)
    const bytes = new Uint8Array(binary.length)
    for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i)
    return new Blob([bytes], { type: mime })
  } catch {
    return null
  }
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
export async function readVideo(file: File, id: string): Promise<VideoIngest | WallpaperError> {
  if (file.size > MAX_VIDEO_BYTES) return { kind: 'size', bytes: file.size }
  if (file.size === 0) return { kind: 'read' }
  const url = URL.createObjectURL(file)
  try {
    const video = await loadVideo(url)
    if (video === null) return { kind: 'decode' }
    const duration = Number.isFinite(video.duration) ? video.duration : 0
    if (duration > MAX_VIDEO_DURATION) {
      return { kind: 'size', bytes: file.size }
    }
    // Park the playhead slightly inside the clip so the poster is not a black frame.
    const target = duration > 0 ? Math.min(0.15, duration / 3) : 0
    await new Promise<void>((resolve) => {
      const done = () => {
        video.onseeked = null
        resolve()
      }
      video.onseeked = done
      try {
        video.currentTime = target
      } catch {
        done()
        return
      }
      window.setTimeout(done, 2000)
    })
    const { poster, luminance } = captureFrame(video)
    return {
      ref: videoRef(id),
      luminance,
      poster,
      duration,
      width: video.videoWidth || 0,
      height: video.videoHeight || 0,
    }
  } finally {
    URL.revokeObjectURL(url)
  }
}
