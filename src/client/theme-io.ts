/**
 * Portable DSH Background theme documents. A theme contains appearance values only:
 * wallpaper bytes, rotation state, the master switch, and the custom-theme
 * library itself never cross the file boundary. Every imported number is
 * finite-checked and clamped before it reaches the token layer.
 */
import {
  RANGES, SETTINGS_DEFAULTS,
  type PrismCustomTheme, type PrismSettings, type PrismThemeValues,
} from './prism-settings.ts'

/** Current interchange format identifier. */
export const PRISM_THEME_FORMAT = 'dsh-prism-theme'
/** Current interchange schema version. */
export const PRISM_THEME_VERSION = 1
/** Import is deliberately small because wallpaper data is not part of it. */
export const PRISM_THEME_MAX_BYTES = 256 * 1024

/** The JSON file produced by export and accepted by import. */
export interface PrismThemeDocument {
  format: typeof PRISM_THEME_FORMAT
  version: typeof PRISM_THEME_VERSION
  name: string
  values: PrismThemeValues
}

/** Copy the portable appearance subset out of a complete settings object. */
export function themeSnapshot(settings: PrismSettings): PrismThemeValues {
  return {
    material: settings.material,
    blur: settings.blur,
    frost: settings.frost,
    zones: { ...settings.zones },
    bgBrightness: settings.bgBrightness,
    fontScale: settings.fontScale,
    fontChoice: settings.fontChoice,
    customFont: settings.customFont,
    inkLightHue: settings.inkLightHue,
    inkLightSat: settings.inkLightSat,
    inkLightLight: settings.inkLightLight,
    inkDarkHue: settings.inkDarkHue,
    inkDarkSat: settings.inkDarkSat,
    inkDarkLight: settings.inkDarkLight,
    accentHue: settings.accentHue,
    accentSat: settings.accentSat,
    accentLight: settings.accentLight,
    accentOpacity: settings.accentOpacity,
    bgHue: settings.bgHue,
    bgSat: settings.bgSat,
    bgLight: settings.bgLight,
    motion: settings.motion,
  }
}

const NUMERIC_RANGES = {
  blur: RANGES.blur,
  frost: RANGES.frost,
  bgBrightness: RANGES.bgBrightness,
  fontScale: RANGES.fontScale,
  inkLightHue: RANGES.hue,
  inkLightSat: RANGES.sat,
  inkLightLight: RANGES.light,
  inkDarkHue: RANGES.hue,
  inkDarkSat: RANGES.sat,
  inkDarkLight: RANGES.light,
  accentHue: RANGES.hue,
  accentSat: RANGES.sat,
  accentLight: RANGES.light,
  accentOpacity: RANGES.accentOpacity,
  bgHue: RANGES.hue,
  bgSat: RANGES.sat,
  bgLight: RANGES.light,
  motion: RANGES.motion,
} as const

/** Normalize untrusted portable values over the shipped defaults. */
export function normalizeThemeValues(input: unknown): PrismThemeValues {
  const source = typeof input === 'object' && input !== null ? input as Record<string, unknown> : {}
  const defaults = themeSnapshot(SETTINGS_DEFAULTS)
  const output = { ...defaults, zones: { ...defaults.zones } } as unknown as Record<string, unknown>
  for (const [key, range] of Object.entries(NUMERIC_RANGES)) {
    const value = source[key]
    if (typeof value === 'number' && Number.isFinite(value)) {
      output[key] = Math.min(range.max, Math.max(range.min, value))
    }
  }
  if (source.material === 'clear' || source.material === 'frosted' || source.material === 'velvet') output.material = source.material
  if (source.fontChoice === 'system' || source.fontChoice === 'rounded' || source.fontChoice === 'serif' || source.fontChoice === 'mono' || source.fontChoice === 'custom') output.fontChoice = source.fontChoice
  if (typeof source.customFont === 'string') output.customFont = source.customFont.slice(0, 200)
  const zones = typeof source.zones === 'object' && source.zones !== null ? source.zones as Record<string, unknown> : {}
  const normalizedZones: Record<string, number> = { ...defaults.zones }
  for (const zone of ['base', 'sidebar', 'card', 'input', 'overlay', 'bubble']) {
    const value = zones[zone]
    if (typeof value === 'number' && Number.isFinite(value)) normalizedZones[zone] = Math.min(RANGES.zone.max, Math.max(RANGES.zone.min, value))
  }
  output.zones = normalizedZones
  return output as unknown as PrismThemeValues
}

/** Serialize a named snapshot with stable formatting. */
export function serializeTheme(settings: PrismSettings, name = 'DSH Background theme'): string {
  const document: PrismThemeDocument = {
    format: PRISM_THEME_FORMAT,
    version: PRISM_THEME_VERSION,
    name: name.trim().slice(0, 40) || 'DSH Background theme',
    values: themeSnapshot(settings),
  }
  return JSON.stringify(document, null, 2)
}

/** Parse and normalize an imported JSON document.
 * @throws Error with a stable code for localized UI feedback.
 */
export function parseThemeDocument(raw: string): PrismThemeDocument {
  if (new TextEncoder().encode(raw).byteLength > PRISM_THEME_MAX_BYTES) throw new Error('size')
  let parsed: unknown
  try {
    parsed = JSON.parse(raw)
  } catch {
    throw new Error('json')
  }
  if (typeof parsed !== 'object' || parsed === null) throw new Error('schema')
  const candidate = parsed as Record<string, unknown>
  if (candidate.format !== PRISM_THEME_FORMAT || candidate.version !== PRISM_THEME_VERSION) throw new Error('version')
  if (typeof candidate.name !== 'string' || candidate.name.trim() === '') throw new Error('schema')
  if (typeof candidate.values !== 'object' || candidate.values === null) throw new Error('schema')
  return {
    format: PRISM_THEME_FORMAT,
    version: PRISM_THEME_VERSION,
    name: candidate.name.trim().slice(0, 40),
    values: normalizeThemeValues(candidate.values),
  }
}

/** Create a sanitized library entry; the caller owns persistence. */
export function makeCustomTheme(settings: PrismSettings, name: string, id: string): PrismCustomTheme {
  return {
    id: id.slice(0, 64),
    name: name.trim().slice(0, 40),
    values: themeSnapshot(settings),
  }
}
