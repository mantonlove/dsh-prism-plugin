/**
 * Prism theme layer: one toggleable glassmorphism skin over the whole Web
 * surface. Everything this layer owns is an effect — token overrides ride the
 * official theme override stack, the CSS hooks ride a `data-dsh-prism`
 * attribute on <html>, the ambient aurora / wallpaper / brightness layers are
 * mounted and removed with the layer — so switching the flag off (or
 * unloading the plugin) restores the stock UI exactly.
 *
 * Damping contract: every numeric knob is a critically damped spring advanced
 * on one requestAnimationFrame loop; each frame writes the smoothed values to
 * `--prism-*` variables on <html>. The token layer and stylesheet reference
 * those variables, so the whole skin glides toward knob targets instead of
 * snapping. Under prefers-reduced-motion the springs settle instantly.
 *
 * Wallpaper rotation: the active image index derives from wall-clock time
 * (floor(now / interval) % count), so every tab agrees without coordination;
 * a timer re-evaluates at each rotation boundary and crossfades the image.
 */
import type { Context } from '@deepseek-ai/cordis'
import type { ClientContext } from '@deepseek-ai/dsh-client-runtime/client'
import type { ThemeTokenOverrides } from '@deepseek-ai/dsh-client-ui-theme/client'
// Type-only: keeps the client bundle types aligned with the locale merge.
import type {} from '@deepseek-ai/dsh-client-locale/client'
import { buildFontOverrides } from './fonts.ts'
import { buildTokenOverrides } from './tokens.ts'
import { advanceSpring, clampValue, createSpring, springSettled, type SpringState } from './spring.ts'
import { analyzeLuminance, readWallpaper, veilAlpha, type WallpaperError } from './wallpaper.ts'
import {
  CODE_FONT_CHOICES, FONT_CHOICES, MATERIALS, PRESETS, RANGES, readSettings, writeSettings,
  type PrismFontChoice, type PrismMaterial, type PrismPreset, type PrismSettings, type PrismZones,
} from './prism-settings.ts'

/** html attribute selecting the Prism layer (all CSS hooks are gated on it). */
export const PRISM_ATTRIBUTE = 'data-dsh-prism'

/** The layer's identity in the theme override stack (inspection-visible). */
const OVERRIDE_SOURCE = '@deepseek-ai/dsh-client-ui-prism'

/** Numeric knob ids participating in the damping loop. */
type KnobKey =
  | 'blur' | 'frost' | 'zoneBase' | 'zoneSidebar' | 'zoneCard' | 'zoneInput' | 'zoneOverlay' | 'zoneBubble'
  | 'bgBrightness' | 'fontScale'
  | 'inkLightHue' | 'inkLightSat' | 'inkLightLight'
  | 'inkDarkHue' | 'inkDarkSat' | 'inkDarkLight'
  | 'accentHue' | 'accentSat' | 'accentLight'
  | 'bgHue' | 'bgSat' | 'bgLight'
  | 'accentOpacity' | 'motion' | 'wallpaperBlur' | 'wallpaperFrost'

/** One damped knob: spring state, target, and the CSS-variable writer. */
interface DampedKnob {
  spring: SpringState
  target: number
  apply: (value: number) => void
}

/** Whether the environment prefers reduced motion (checked live, so OS flips apply). */
function prefersReducedMotion(): boolean {
  return typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Owns the Prism layer lifecycle: durable settings, the token override layer,
 * the damped knob loop, the wallpaper rotation timer, and the ambient DOM.
 * Every subscription is released through ctx.effect on dispose.
 */
export class PrismLayer {
  private readonly ctx: Context
  private settings: PrismSettings
  private dark = false
  private tokenDisposer: (() => void) | undefined
  private rafId: number | undefined
  private lastFrame: number | undefined
  private rotateTimer: number | undefined
  private readonly knobs = new Map<KnobKey, DampedKnob>()
  private readonly notify: () => void
  /** Trailing-debounce timer for localStorage writes (the document can carry
   *  megabyte-sized wallpaper data URLs — persisting on every pointermove
   *  would serialize them at drag cadence and stutter the sliders). */
  private persistTimer: number | undefined
  /** False until construction completes: mount() emits theme/change, whose
   *  handler notifies — the owner's sync closure must not run mid-construction. */
  private ready = false

  /**
   * @param ctx - client cordis context (theme override stack + events).
   * @param notify - callback invoked after every applied settings change so
   * the settings-row stores re-sync.
   */
  constructor(ctx: ClientContext, notify: () => void) {
    this.ctx = ctx
    this.notify = notify
    this.settings = readSettings()
    this.dark = this.resolveScheme()
    ctx.effect(() => {
      const onStorage = (event: StorageEvent): void => {
        if (event.key !== 'dsh.ui-prism.settings.v1') return
        this.settings = readSettings()
        if (this.settings.enabled) {
          if (document.documentElement.hasAttribute(PRISM_ATTRIBUTE)) {
            this.applyDiscrete()
            this.applyAllKnobs()
          } else {
            this.mount()
          }
        } else {
          this.unmount()
        }
        this.signal()
      }
      window.addEventListener('storage', onStorage)
      const onTheme = (): void => {
        this.dark = this.resolveScheme()
        this.applySchemeDependent()
        this.applyWallpaperSource()
        this.signal()
      }
      ctx.on('theme/change', onTheme)
      return () => {
        window.removeEventListener('storage', onStorage)
        this.unmount()
      }
    }, 'ui-prism: layer lifecycle')
    if (this.settings.enabled) this.mount()
    this.ready = true
  }

  /** Notify the owner after construction completes (never mid-construction). */
  private signal(): void {
    if (this.ready) this.notify()
  }

  /** Persist the settings document on a trailing 300ms debounce so rapid
   *  knob gestures never serialize the (possibly multi-megabyte) document
   *  at drag cadence. */
  private persist(): void {
    if (this.persistTimer !== undefined) window.clearTimeout(this.persistTimer)
    this.persistTimer = window.setTimeout(() => {
      this.persistTimer = undefined
      writeSettings(this.settings)
    }, 300)
  }

  /** Flush any pending debounced write immediately. */
  private flushPersist(): void {
    if (this.persistTimer !== undefined) {
      window.clearTimeout(this.persistTimer)
      this.persistTimer = undefined
      writeSettings(this.settings)
    }
  }

  /** Current enable state (the plugin card mirrors this). */
  getEnabled(): boolean {
    return this.settings.enabled
  }

  /** Current knob document (the settings rows mirror this). */
  getSettings(): PrismSettings {
    return { ...this.settings, zones: { ...this.settings.zones }, wallpaperDark: [...this.settings.wallpaperDark], wallpaperLight: [...this.settings.wallpaperLight] }
  }

  /** Whether the resolved palette is dark (brightness knob darkens). */
  getDark(): boolean {
    return this.dark
  }

  /** Resolved scheme from the theme service (falls back to the body attribute). */
  private resolveScheme(): boolean {
    try {
      return this.ctx.theme.getTheme().active.colorScheme === 'dark'
    } catch {
      return document.body.hasAttribute('data-ds-dark-theme')
    }
  }

  /** Flip the master switch: mount or tear down the whole layer. */
  setEnabled(enabled: boolean): void {
    if (enabled === this.settings.enabled) return
    this.settings = { ...this.settings, enabled }
    this.persist()
    if (enabled) this.mount()
    else this.unmount()
    this.signal()
  }

  /**
   * Merge a settings patch, clamp every numeric field, persist, then push the
   * touched knobs through the damping loop.
   * @param patch - fields to change (wallpaper lists replace whole).
   */
  update(patch: Omit<Partial<PrismSettings>, 'zones'> & { zones?: Partial<PrismZones> }): void {
    this.settings = clampSettings({
      ...this.settings,
      ...patch,
      zones: patch.zones === undefined ? { ...this.settings.zones } : { ...this.settings.zones, ...patch.zones },
    })
    this.persist()
    if (!this.settings.enabled) return
    this.applyDiscrete()
    this.applyAllKnobs()
    this.signal()
  }

  /** Apply a whole named preset (accent, hue, material, frost, brightness, contrast, motion). */
  applyPreset(preset: PrismPreset): void {
    const recipe = PRESETS[preset]
    this.update({
      accentHue: recipe.accentHue,
      bgHue: recipe.bgHue,
      material: recipe.material,
      frost: recipe.frost,
      bgBrightness: recipe.bgBrightness,
      motion: recipe.motion,
    })
  }

  /** Reset every knob to the shipped defaults. */
  reset(): void {
    this.update({
      material: 'frosted',
      blur: 18,
      frost: 50,
      bgBrightness: 50,
      fontScale: 100,
      fontChoice: 'system',
      customFont: '',
      zones: { base: 100, sidebar: 100, card: 100, input: 100, overlay: 100, bubble: 100 },
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
      wallpaperInterval: 30,
      wallpaperLoop: false,
      wallpaperPinnedDark: 0,
      wallpaperPinnedLight: 0,
      wallpaperBlur: 20,
      wallpaperFrost: 0,
    })
  }

  /**
   * Ingest an uploaded wallpaper file for one scheme: downscale (or GIF
   * passthrough), auto-analyze luminance, and append to the rotation list.
   * @param scheme - which palette the wallpaper belongs to.
   * @param file - the picked file.
   * @returns null on success, or a typed rejection for the settings row.
   */
  async setWallpaperFromFile(scheme: 'dark' | 'light', file: File): Promise<WallpaperError | null> {
    const result = await readWallpaper(file)
    if (typeof result !== 'string') return result
    const luminance = await analyzeLuminance(result)
    if (scheme === 'dark') {
      this.update({
        wallpaperDark: [...this.settings.wallpaperDark, result],
        wallpaperDimDark: [...this.settings.wallpaperDimDark, luminance],
        background: 'wallpaper',
      })
    } else {
      this.update({
        wallpaperLight: [...this.settings.wallpaperLight, result],
        wallpaperDimLight: [...this.settings.wallpaperDimLight, luminance],
        background: 'wallpaper',
      })
    }
    return null
  }

  /** Remove one scheme's wallpaper at a rotation-list index. */
  clearWallpaper(scheme: 'dark' | 'light', index: number): void {
    if (scheme === 'dark') {
      const urls = this.settings.wallpaperDark.filter((_, i) => i !== index)
      const dims = this.settings.wallpaperDimDark.filter((_, i) => i !== index)
      this.update({ wallpaperDark: urls, wallpaperDimDark: dims })
    } else {
      const urls = this.settings.wallpaperLight.filter((_, i) => i !== index)
      const dims = this.settings.wallpaperDimLight.filter((_, i) => i !== index)
      this.update({ wallpaperLight: urls, wallpaperDimLight: dims })
    }
  }

  /** Toggle automatic rotation (on = cycle all images; off = pinned image). */
  setWallpaperLoop(loop: boolean): void {
    if (loop) {
      this.update({ wallpaperLoop: true, wallpaperInterval: Math.max(10, this.settings.wallpaperInterval) })
    } else {
      this.update({ wallpaperLoop: false })
    }
  }

  /** Pin one rotation-list image as the fixed background (stops the loop). */
  pinWallpaper(scheme: 'dark' | 'light', index: number): void {
    if (scheme === 'dark') {
      this.update({ wallpaperPinnedDark: index, wallpaperLoop: false, background: 'wallpaper' })
    } else {
      this.update({ wallpaperPinnedLight: index, wallpaperLoop: false, background: 'wallpaper' })
    }
  }

  /** Mount every layer-owned effect. */
  private mount(): void {
    document.documentElement.setAttribute(PRISM_ATTRIBUTE, '')
    ensureAmbientScene()
    this.tokenDisposer?.()
    const overrides: ThemeTokenOverrides = { ...buildTokenOverrides(), ...buildFontOverrides() }
    this.tokenDisposer = this.ctx.theme.overrideTokens(OVERRIDE_SOURCE, overrides)
    this.applyDiscrete()
    this.applyAllKnobs()
  }

  /** Tear down every layer-owned effect (stock UI exactly). */
  private unmount(): void {
    this.flushPersist()
    this.stopRotation()
    document.documentElement.removeAttribute(PRISM_ATTRIBUTE)
    document.documentElement.removeAttribute('data-prism-material')
    document.documentElement.removeAttribute('data-prism-still')
    document.documentElement.removeAttribute('data-prism-wallpaper-on')
    removeAmbientScene()
    this.tokenDisposer?.()
    this.tokenDisposer = undefined
    this.stopLoop()
  }

  /** Discrete (non-damped) applications: material, fonts, backdrop source, wallpaper. */
  private applyDiscrete(): void {
    const s = this.settings
    const root = document.documentElement
    root.setAttribute('data-prism-material', s.material)
    // Saturate and opacity depth ride the material recipe, not sliders.
    root.style.setProperty('--prism-saturate', `${String(MATERIALS[s.material].saturate)}%`)
    root.style.setProperty('--prism-depth', String(MATERIALS[s.material].depth))
    const family = s.fontChoice === 'custom' && s.customFont.trim() !== ''
      ? s.customFont.trim()
      : FONT_CHOICES[s.fontChoice]
    root.style.setProperty('--prism-font-family', family === '' ? 'var(--dsw-font-family)' : family)
    const codeFamily = s.fontChoice === 'custom' && s.customFont.trim() !== ''
      ? s.customFont.trim()
      : CODE_FONT_CHOICES[s.fontChoice]
    root.style.setProperty('--prism-code-family', codeFamily === '' ? 'var(--ds-font-family-code)' : codeFamily)
    this.applyWallpaperSource()
  }

  /** The active index: wall-clock rotation while looping, the pinned image
   *  otherwise (clicking a thumbnail pins it and stops the loop). */
  private wallpaperIndex(urls: string[]): number {
    const s = this.settings
    if (urls.length === 0) return 0
    if (s.wallpaperLoop && s.wallpaperInterval > 0 && urls.length > 1) {
      return Math.floor(Date.now() / 1000 / s.wallpaperInterval) % urls.length
    }
    const pinned = this.dark ? s.wallpaperPinnedDark : s.wallpaperPinnedLight
    return Math.min(urls.length - 1, Math.max(0, pinned))
  }

  /** Point the wallpaper layer at the active scheme's rotating image. */
  private applyWallpaperSource(): void {
    const s = this.settings
    const urls = s.background === 'wallpaper' ? (this.dark ? s.wallpaperDark : s.wallpaperLight) : []
    const index = this.wallpaperIndex(urls)
    const url = urls.length === 0 ? '' : (urls[index] ?? '')
    document.documentElement.toggleAttribute('data-prism-wallpaper-on', url !== '')
    const image = document.querySelector<HTMLImageElement>('[data-prism-wallpaper-img]')
    if (image !== null) {
      if (url === '') {
        image.removeAttribute('src')
      } else if (image.getAttribute('src') !== url) {
        image.setAttribute('src', url)
        image.style.animation = 'none'
        void image.offsetWidth
        image.style.animation = ''
      }
    }
    this.scheduleRotation(urls)
    const dims = this.dark ? s.wallpaperDimDark : s.wallpaperDimLight
    const dim = dims.length === 0 ? 0.5 : (dims[index] ?? 0.5)
    const veil = Math.min(0.75, veilAlpha(dim, this.dark) * 0.85 + (s.wallpaperFrost / 100) * 0.6)
    document.documentElement.style.setProperty('--prism-wall-veil', String(veil))
  }

  /** Re-evaluate the rotation index exactly at the next boundary. */
  private scheduleRotation(urls: string[]): void {
    if (this.rotateTimer !== undefined) {
      window.clearTimeout(this.rotateTimer)
      this.rotateTimer = undefined
    }
    const interval = this.settings.wallpaperInterval
    if (!this.settings.wallpaperLoop || this.settings.background !== 'wallpaper' || urls.length <= 1 || interval <= 0) return
    const ms = interval * 1000
    const wait = ms - (Date.now() % ms) + 50
    this.rotateTimer = window.setTimeout(() => {
      this.rotateTimer = undefined
      this.applyWallpaperSource()
    }, wait)
  }

  /** Stop the rotation timer (unmount / wallpaper source change). */
  private stopRotation(): void {
    if (this.rotateTimer !== undefined) {
      window.clearTimeout(this.rotateTimer)
      this.rotateTimer = undefined
    }
  }

  /** Re-apply everything that changes with the light/dark scheme. */
  private applySchemeDependent(): void {
    this.applyKnob('bgBrightness')
  }

  /** Push every knob through the damping loop (targets unchanged, positions glide). */
  private applyAllKnobs(): void {
    this.applyKnob('blur')
    this.applyKnob('frost')
    this.applyKnob('bgBrightness')
    this.applyKnob('fontScale')
    this.applyKnob('zoneBase')
    this.applyKnob('zoneSidebar')
    this.applyKnob('zoneCard')
    this.applyKnob('zoneInput')
    this.applyKnob('zoneOverlay')
    this.applyKnob('zoneBubble')
    this.applyKnob('inkLightHue')
    this.applyKnob('inkLightSat')
    this.applyKnob('inkLightLight')
    this.applyKnob('inkDarkHue')
    this.applyKnob('inkDarkSat')
    this.applyKnob('inkDarkLight')
    this.applyKnob('accentHue')
    this.applyKnob('accentSat')
    this.applyKnob('accentLight')
    this.applyKnob('bgHue')
    this.applyKnob('bgSat')
    this.applyKnob('bgLight')
    this.applyKnob('accentOpacity')
    this.applyKnob('motion')
    this.applyKnob('wallpaperBlur')
    this.applyKnob('wallpaperFrost')
  }

  /** Set one knob's target and start (or skip) the damping loop. */
  private applyKnob(key: KnobKey): void {
    const target = this.knobTarget(key)
    let knob = this.knobs.get(key)
    if (knob === undefined) {
      knob = { spring: createSpring(target), target, apply: value => this.writeKnobVar(key, value) }
      this.knobs.set(key, knob)
    }
    knob.target = target
    if (prefersReducedMotion()) {
      knob.spring = createSpring(target)
      knob.apply(target)
      return
    }
    if (knob.spring.position === target && knob.spring.velocity === 0) {
      knob.apply(target)
      return
    }
    this.startLoop()
  }

  /** Read the current target value for one knob. */
  private knobTarget(key: KnobKey): number {
    const s = this.settings
    switch (key) {
      case 'blur': return s.blur
      case 'frost': return s.frost
      case 'bgBrightness': return s.bgBrightness
      case 'fontScale': return s.fontScale
      case 'zoneBase': return s.zones.base
      case 'zoneSidebar': return s.zones.sidebar
      case 'zoneCard': return s.zones.card
      case 'zoneInput': return s.zones.input
      case 'zoneOverlay': return s.zones.overlay
      case 'zoneBubble': return s.zones.bubble
      case 'inkLightHue': return s.inkLightHue
      case 'inkLightSat': return s.inkLightSat
      case 'inkLightLight': return s.inkLightLight
      case 'inkDarkHue': return s.inkDarkHue
      case 'inkDarkSat': return s.inkDarkSat
      case 'inkDarkLight': return s.inkDarkLight
      case 'accentHue': return s.accentHue
      case 'accentSat': return s.accentSat
      case 'accentLight': return s.accentLight
      case 'bgHue': return s.bgHue
      case 'bgSat': return s.bgSat
      case 'bgLight': return s.bgLight
      case 'accentOpacity': return s.accentOpacity
      case 'motion': return s.motion
      case 'wallpaperBlur': return s.wallpaperBlur
      case 'wallpaperFrost': return s.wallpaperFrost
    }
  }

  /** Write one smoothed knob value to its `--prism-*` variables. */
  private writeKnobVar(key: KnobKey, value: number): void {
    const style = document.documentElement.style
    switch (key) {
      case 'blur':
        style.setProperty('--prism-blur', `${String(value)}px`)
        return
      case 'frost':
        style.setProperty('--prism-frost', String(Math.min(value / 50, 1.4)))
        return
      case 'bgBrightness': {
        const dark = this.dark
        style.setProperty('--prism-brightness-black', String(dark ? Math.max(0, (50 - value) / 50) : 0))
        style.setProperty('--prism-brightness-white', String(dark ? 0 : Math.max(0, (value - 50) / 50)))
        return
      }
      case 'fontScale':
        style.setProperty('--prism-font-scale', String(value / 100))
        return
      case 'zoneBase': style.setProperty('--prism-zone-base', String(value / 100)); return
      case 'zoneSidebar': style.setProperty('--prism-zone-sidebar', String(value / 100)); return
      case 'zoneCard': style.setProperty('--prism-zone-card', String(value / 100)); return
      case 'zoneInput': style.setProperty('--prism-zone-input', String(value / 100)); return
      case 'zoneOverlay': style.setProperty('--prism-zone-overlay', String(value / 100)); return
      case 'zoneBubble': style.setProperty('--prism-zone-bubble', String(value / 100)); return
      case 'inkLightHue': style.setProperty('--prism-ink-light-h', String(value)); return
      case 'inkLightSat': style.setProperty('--prism-ink-light-s', `${String(value)}%`); return
      case 'inkLightLight': style.setProperty('--prism-ink-light-l', `${String(value)}%`); return
      case 'inkDarkHue': style.setProperty('--prism-ink-dark-h', String(value)); return
      case 'inkDarkSat': style.setProperty('--prism-ink-dark-s', `${String(value)}%`); return
      case 'inkDarkLight': style.setProperty('--prism-ink-dark-l', `${String(value)}%`); return
      case 'accentHue': style.setProperty('--prism-accent-h', String(value)); return
      case 'accentSat': style.setProperty('--prism-accent-s', `${String(value)}%`); return
      case 'accentLight': style.setProperty('--prism-accent-l', `${String(value)}%`); return
      case 'bgHue': style.setProperty('--prism-bg-h', String(value)); return
      case 'bgSat': style.setProperty('--prism-bg-s', `${String(value)}%`); return
      case 'bgLight': style.setProperty('--prism-bg-l', `${String(value)}%`); return
      case 'accentOpacity': style.setProperty('--prism-accent-a', String(value / 100)); return
      case 'motion': {
        style.setProperty('--prism-motion', String(value / 100))
        style.setProperty('--prism-motion-scale', String(0.2 + 0.8 * (value / 100)))
        document.documentElement.toggleAttribute('data-prism-still', value < 1)
        return
      }
      case 'wallpaperBlur': {
        // Perceptual curve: the low end stays fine-grained, the top is soft
        // (square law — 50 reads as 5px, 100 reads as 20px).
        const px = Math.pow(value / 100, 2) * 20
        style.setProperty('--prism-wallpaper-blur', `${String(px)}px`)
        return
      }
      case 'wallpaperFrost': {
        style.setProperty('--prism-wallpaper-frost', String(value / 100))
        const dim = this.dark ? this.settings.wallpaperDimDark[this.wallpaperIndex(this.dark ? this.settings.wallpaperDark : this.settings.wallpaperLight)] ?? 0.5 : this.settings.wallpaperDimLight[this.wallpaperIndex(this.dark ? this.settings.wallpaperDark : this.settings.wallpaperLight)] ?? 0.5
        const veil = Math.min(0.75, veilAlpha(dim, this.dark) * 0.85 + (value / 100) * 0.6)
        style.setProperty('--prism-wall-veil', String(veil))
        return
      }
    }
  }

  /** Run the shared rAF loop until every spring settles. */
  private startLoop(): void {
    if (this.rafId !== undefined) return
    const step = (timestamp: number): void => {
      const dt = this.lastFrame === undefined ? 0 : Math.min((timestamp - this.lastFrame) / 1000, 0.1)
      this.lastFrame = timestamp
      let running = false
      for (const knob of this.knobs.values()) {
        advanceSpring(knob.spring, knob.target, dt)
        knob.apply(knob.spring.position)
        if (!springSettled(knob.spring, knob.target)) running = true
      }
      if (running) this.rafId = requestAnimationFrame(step)
      else this.stopLoop()
    }
    this.rafId = requestAnimationFrame(step)
  }

  /** Stop the shared rAF loop (keeps the springs' last positions). */
  private stopLoop(): void {
    if (this.rafId !== undefined) {
      cancelAnimationFrame(this.rafId)
      this.rafId = undefined
    }
    this.lastFrame = undefined
  }
}

/** Clamp every numeric field into its declared range. */
function clampSettings(settings: PrismSettings): PrismSettings {
  const material: PrismMaterial = settings.material === 'clear' || settings.material === 'velvet'
    ? settings.material
    : 'frosted'
  const fontChoice: PrismFontChoice = settings.fontChoice === 'rounded' || settings.fontChoice === 'serif'
    || settings.fontChoice === 'mono' || settings.fontChoice === 'custom'
    ? settings.fontChoice
    : 'system'
  const background = settings.background === 'wallpaper' ? 'wallpaper' : 'aurora'
  return {
    ...settings,
    material,
    fontChoice,
    background,
    blur: clampValue(settings.blur, RANGES.blur.min, RANGES.blur.max, 18),
    frost: clampValue(settings.frost, RANGES.frost.min, RANGES.frost.max, 50),
    bgBrightness: clampValue(settings.bgBrightness, RANGES.bgBrightness.min, RANGES.bgBrightness.max, 50),
    fontScale: clampValue(settings.fontScale, RANGES.fontScale.min, RANGES.fontScale.max, 100),
    zones: {
      base: clampValue(settings.zones.base, RANGES.zone.min, RANGES.zone.max, 100),
      sidebar: clampValue(settings.zones.sidebar, RANGES.zone.min, RANGES.zone.max, 100),
      card: clampValue(settings.zones.card, RANGES.zone.min, RANGES.zone.max, 100),
      input: clampValue(settings.zones.input, RANGES.zone.min, RANGES.zone.max, 100),
      overlay: clampValue(settings.zones.overlay, RANGES.zone.min, RANGES.zone.max, 100),
      bubble: clampValue(settings.zones.bubble, RANGES.zone.min, RANGES.zone.max, 100),
    },
    inkLightHue: clampValue(settings.inkLightHue, RANGES.hue.min, RANGES.hue.max, 222),
    inkLightSat: clampValue(settings.inkLightSat, RANGES.sat.min, RANGES.sat.max, 30),
    inkLightLight: clampValue(settings.inkLightLight, RANGES.light.min, RANGES.light.max, 12),
    inkDarkHue: clampValue(settings.inkDarkHue, RANGES.hue.min, RANGES.hue.max, 222),
    inkDarkSat: clampValue(settings.inkDarkSat, RANGES.sat.min, RANGES.sat.max, 30),
    inkDarkLight: clampValue(settings.inkDarkLight, RANGES.light.min, RANGES.light.max, 92),
    accentHue: clampValue(settings.accentHue, RANGES.hue.min, RANGES.hue.max, 205),
    accentSat: clampValue(settings.accentSat, RANGES.sat.min, RANGES.sat.max, 85),
    accentLight: clampValue(settings.accentLight, RANGES.light.min, RANGES.light.max, 55),
    bgHue: clampValue(settings.bgHue, RANGES.hue.min, RANGES.hue.max, 215),
    bgSat: clampValue(settings.bgSat, RANGES.sat.min, RANGES.sat.max, 80),
    bgLight: clampValue(settings.bgLight, RANGES.light.min, RANGES.light.max, 60),
    accentOpacity: clampValue(settings.accentOpacity, RANGES.accentOpacity.min, RANGES.accentOpacity.max, 100),
    motion: clampValue(settings.motion, RANGES.motion.min, RANGES.motion.max, 55),
    wallpaperInterval: clampValue(settings.wallpaperInterval, RANGES.wallpaperInterval.min, RANGES.wallpaperInterval.max, 30),
    wallpaperPinnedDark: clampValue(settings.wallpaperPinnedDark, 0, 999, 0),
    wallpaperPinnedLight: clampValue(settings.wallpaperPinnedLight, 0, 999, 0),
    wallpaperBlur: clampValue(settings.wallpaperBlur, RANGES.wallpaperBlur.min, RANGES.wallpaperBlur.max, 20),
    wallpaperFrost: clampValue(settings.wallpaperFrost, RANGES.wallpaperFrost.min, RANGES.wallpaperFrost.max, 0),
  }
}

/** Create (once) the fixed ambient scene: aurora, wallpaper, brightness veil. */
function ensureAmbientScene(): void {
  if (document.querySelector('[data-prism-ambient]') !== null) return
  const root = document.createElement('div')
  root.dataset.prismAmbient = ''
  const aurora = document.createElement('div')
  aurora.dataset.prismAurora = ''
  const wallpaper = document.createElement('div')
  wallpaper.dataset.prismWallpaper = ''
  const image = document.createElement('img')
  image.dataset.prismWallpaperImg = ''
  image.alt = ''
  wallpaper.appendChild(image)
  const brightness = document.createElement('div')
  brightness.dataset.prismBrightness = ''
  root.append(aurora, wallpaper, brightness)
  document.body.appendChild(root)
  const grain = document.createElement('div')
  grain.dataset.prismGrain = ''
  document.body.appendChild(grain)
}

/** Remove the ambient scene (unmount restores the stock DOM). */
function removeAmbientScene(): void {
  const root = document.querySelector('[data-prism-ambient]')
  root?.remove()
  document.querySelector('[data-prism-grain]')?.remove()
}
