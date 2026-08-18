/**
 * Prism row slot stores: mirrors of the layer's settings document. The
 * plugin's apply-world change listener is the only writer; the row components
 * read via props.useStore. One store per settings surface (plugin card and
 * general appearance panel).
 */
import { defineStore, type EngineStoreHandle } from '@deepseek-ai/dsh-client-runtime/client'
import type { PrismSettings } from './prism-settings.ts'

/** Store state mirrored from the Prism layer. */
export interface PrismRowState extends PrismSettings {
  /** Resolved palette is dark (brightness knob = darkening half). */
  dark: boolean
  /** Monotonic revision; -1 until first sync so revision 0 lands as a change. */
  revision: number
}

/** The full payload the layer pushes into the row stores on every change. */
export interface PrismSettingsPayload extends PrismSettings {
  /** Resolved palette is dark. */
  dark: boolean
}

/** Declared action shape giving the exported factory a stable return type. */
type PrismRowActions = {
  sync: (draft: PrismRowState, next: PrismSettingsPayload, revision: number) => void
}

/** The layer's first-seen state (before the first sync). */
function initialState(): PrismRowState {
  return {
    enabled: true,
    material: 'frosted',
    blur: 18,
    frost: 50,
    zones: { base: 100, sidebar: 100, card: 100, input: 100, overlay: 100, bubble: 100 },
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
    bgHue: 215,
    bgSat: 80,
    bgLight: 60,
    accentOpacity: 100,
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
    dark: false,
    revision: -1,
  }
}

/**
 * Declares the Prism row state and write surface.
 * @returns the store handle.
 */
export function createPrismRowStore(): EngineStoreHandle<PrismRowState, PrismRowActions> {
  return defineStore({
    init: initialState,
    actions: {
      sync: (draft, next: PrismSettingsPayload, revision: number) => {
        if (revision <= draft.revision) return
        draft.enabled = next.enabled
        draft.material = next.material
        draft.blur = next.blur
        draft.frost = next.frost
        draft.zones = { ...next.zones }
        draft.bgBrightness = next.bgBrightness
        draft.fontScale = next.fontScale
        draft.fontChoice = next.fontChoice
        draft.customFont = next.customFont
        draft.inkLightHue = next.inkLightHue
        draft.inkLightSat = next.inkLightSat
        draft.inkLightLight = next.inkLightLight
        draft.inkDarkHue = next.inkDarkHue
        draft.inkDarkSat = next.inkDarkSat
        draft.inkDarkLight = next.inkDarkLight
        draft.accentHue = next.accentHue
        draft.accentSat = next.accentSat
        draft.accentLight = next.accentLight
        draft.bgHue = next.bgHue
        draft.bgSat = next.bgSat
        draft.bgLight = next.bgLight
        draft.accentOpacity = next.accentOpacity
        draft.motion = next.motion
        draft.background = next.background
        draft.wallpaperDark = [...next.wallpaperDark]
        draft.wallpaperLight = [...next.wallpaperLight]
        draft.wallpaperDimDark = [...next.wallpaperDimDark]
        draft.wallpaperDimLight = [...next.wallpaperDimLight]
        draft.wallpaperInterval = next.wallpaperInterval
        draft.wallpaperLoop = next.wallpaperLoop
        draft.wallpaperPinnedDark = next.wallpaperPinnedDark
        draft.wallpaperPinnedLight = next.wallpaperPinnedLight
        draft.wallpaperBlur = next.wallpaperBlur
        draft.wallpaperFrost = next.wallpaperFrost
        draft.dark = next.dark
        draft.revision = revision
      },
    },
  })
}
