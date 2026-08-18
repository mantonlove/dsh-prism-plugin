/**
 * Prism panel registered into the General settings section
 * (`settings.general.item`, right under Appearance): every glass knob —
 * material, blur, frost, font size/family/color, accent and backdrop hue,
 * contrast, motion, backdrop source, per-scheme rotating photo/GIF
 * wallpapers, conversation landmarks, presets, and reset. Every write goes
 * straight through to the layer (which damps it), so the skin glides live.
 * The row renders nothing while the master switch in the Plugins section is
 * off.
 */
import { useRef, useState } from 'react'
import type { InjectFace, PropsLocale, PropsRuntime, PropsStore } from '@deepseek-ai/dsh-client-ui-slots'
// Type-only: pulls the `settings.general.item` SlotMap merge.
import type {} from '@deepseek-ai/dsh-client-ui-settings/client'
import { ColorControl, Group, PrismSlider, Segmented } from './controls.tsx'
import type { NS, PrismLocaleKey } from './locales.ts'
import type { createPrismRowStore } from './settings-store.ts'
import type { PrismFontChoice, PrismMaterial, PrismPreset, PrismZones } from './prism-settings.ts'
import type { WallpaperError } from './wallpaper.ts'
import css from './PrismAppearancePanel.module.css'

/** Injected business face: every knob write except the master switch. */
export interface PrismAppearanceInjected {
  /** Set the glass material preset. */
  setMaterial: (value: PrismMaterial) => void
  /** Set the glass blur radius, px. */
  setBlur: (value: number) => void
  /** Set the global frost amount, 0-100. */
  setFrost: (value: number) => void
  /** Set the background brightness, 0-100 (50 = off). */
  setBgBrightness: (value: number) => void
  /** Set the font scale percent, 85-120. */
  setFontScale: (value: number) => void
  /** Set the UI font choice. */
  setFontChoice: (value: PrismFontChoice) => void
  /** Set the custom UI font family. */
  setCustomFont: (value: string) => void
  /** Set one zone opacity, 0-100 (100 = follow the global frost). */
  setZone: (zone: keyof PrismZones, value: number) => void
  /** Set the light-mode text ink (full range). */
  setInkLightColor: (hue: number, sat: number, light: number) => void
  /** Set the dark-mode text ink (full range). */
  setInkDarkColor: (hue: number, sat: number, light: number) => void
  /** Set the accent color (hue/sat/lightness, full range). */
  setAccentColor: (hue: number, sat: number, light: number) => void
  /** Set the backdrop color (hue/sat/lightness, full range). */
  setBgColor: (hue: number, sat: number, light: number) => void
  /** Set the accent opacity, 0-100. */
  setAccentOpacity: (value: number) => void
  /** Set the motion intensity, 0-100. */
  setMotion: (value: number) => void
  /** Set the backdrop source. */
  setBackground: (value: 'aurora' | 'wallpaper') => void
  /** Set the wallpaper rotation interval, seconds. */
  setWallpaperInterval: (value: number) => void
  /** Toggle automatic wallpaper rotation. */
  setWallpaperLoop: (loop: boolean) => void
  /** Pin one rotation-list image as the fixed background (stops the loop). */
  pinWallpaper: (scheme: 'dark' | 'light', index: number) => void
  /** Set the wallpaper blur amount, 0-100. */
  setWallpaperBlur: (value: number) => void
  /** Set the wallpaper frost veil, 0-100. */
  setWallpaperFrost: (value: number) => void
  /** Ingest an uploaded wallpaper for one scheme (photo or GIF). */
  pickWallpaper: (scheme: 'dark' | 'light', file: File) => Promise<WallpaperError | null>
  /** Remove one scheme's wallpaper at a rotation-list index. */
  clearWallpaper: (scheme: 'dark' | 'light', index: number) => void
  /** Apply a named preset bundle. */
  applyPreset: (preset: PrismPreset) => void
  /** Reset every knob to defaults. */
  reset: () => void
}

/** Full component props: runtime share + store share + locale seat + injected face. */
export type PrismAppearancePanelProps =
  PropsRuntime<'settings.general.item'> & PropsStore<ReturnType<typeof createPrismRowStore>>
  & PropsLocale<typeof NS> & InjectFace<PrismAppearanceInjected>

/** Localized error copy for a wallpaper rejection. */
function wallpaperErrorText(t: (key: string) => string, error: WallpaperError): string {
  switch (error.kind) {
    case 'size': return t('prism.errorSize')
    case 'read': return t('prism.errorRead')
    case 'decode': return t('prism.errorDecode')
  }
}

/**
 * Render the Prism appearance panel.
 * @param props - composed slot props.
 * @returns the General section panel.
 */
export function PrismAppearancePanel(props: PrismAppearancePanelProps) {
  const {
    t, setMaterial, setBlur, setFrost, setBgBrightness, setFontScale, setFontChoice,
    setCustomFont, setZone, setInkLightColor, setInkDarkColor, setAccentColor, setBgColor, setAccentOpacity, setMotion, setBackground,
    setWallpaperInterval, setWallpaperLoop, pinWallpaper, setWallpaperBlur, setWallpaperFrost, pickWallpaper, clearWallpaper,
    applyPreset, reset, useStore,
  } = props
  const enabled = useStore(s => s.enabled)
  const material = useStore(s => s.material)
  const blur = useStore(s => s.blur)
  const frost = useStore(s => s.frost)
  const bgBrightness = useStore(s => s.bgBrightness)
  const fontScale = useStore(s => s.fontScale)
  const fontChoice = useStore(s => s.fontChoice)
  const customFont = useStore(s => s.customFont)
  const zones = useStore(s => s.zones)
  const inkLightHue = useStore(s => s.inkLightHue)
  const inkLightSat = useStore(s => s.inkLightSat)
  const inkLightLight = useStore(s => s.inkLightLight)
  const inkDarkHue = useStore(s => s.inkDarkHue)
  const inkDarkSat = useStore(s => s.inkDarkSat)
  const inkDarkLight = useStore(s => s.inkDarkLight)
  const accentHue = useStore(s => s.accentHue)
  const accentSat = useStore(s => s.accentSat)
  const accentLight = useStore(s => s.accentLight)
  const bgHue = useStore(s => s.bgHue)
  const bgSat = useStore(s => s.bgSat)
  const bgLight = useStore(s => s.bgLight)
  const accentOpacity = useStore(s => s.accentOpacity)
  const motion = useStore(s => s.motion)
  const background = useStore(s => s.background)
  const wallpaperDark = useStore(s => s.wallpaperDark)
  const wallpaperLight = useStore(s => s.wallpaperLight)
  const wallpaperInterval = useStore(s => s.wallpaperInterval)
  const wallpaperLoop = useStore(s => s.wallpaperLoop)
  const wallpaperPinnedDark = useStore(s => s.wallpaperPinnedDark)
  const wallpaperPinnedLight = useStore(s => s.wallpaperPinnedLight)
  const wallpaperBlur = useStore(s => s.wallpaperBlur)
  const wallpaperFrost = useStore(s => s.wallpaperFrost)
  const dark = useStore(s => s.dark)
  const [wallpaperError, setWallpaperError] = useState<string>(t('prism.errorNone'))
  const [managing, setManaging] = useState(false)
  const fileRef = useRef<HTMLInputElement | null>(null)
  const schemeRef = useRef<'dark' | 'light'>('dark')

  if (!enabled) return null

  const startPick = (scheme: 'dark' | 'light'): void => {
    schemeRef.current = scheme
    fileRef.current?.click()
  }

  const onFile = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (file === undefined) return
    const error = await pickWallpaper(schemeRef.current, file)
    setWallpaperError(error === null ? t('prism.errorNone') : wallpaperErrorText(t as (key: string) => string, error))
  }

  const wallpaperRows = (scheme: 'dark' | 'light', urls: string[], labelKey: PrismLocaleKey) => {
    const pinned = scheme === 'dark' ? wallpaperPinnedDark : wallpaperPinnedLight
    return (
      <div className={css.wallpaperList} key={scheme}>
        <span className={css.wallpaperScheme}>{t(labelKey)}</span>
        {urls.map((url, index) => (
          <div className={css.wallpaperRow} key={`${scheme}-${String(index)}`}>
            <button
              type="button"
              className={!wallpaperLoop && pinned === index ? css.wallpaperThumbActive : css.wallpaperThumbButton}
              aria-pressed={!wallpaperLoop && pinned === index}
              title={t('prism.wallpaperPinHint')}
              onClick={() => { pinWallpaper(scheme, index) }}
            >
              <img className={css.wallpaperThumb} src={url} alt="" />
              {managing && (
                <span className={css.wallpaperDeleteBadge} aria-hidden="true">✕</span>
              )}
            </button>
            {managing && (
              <button type="button" className={css.wallpaperDelete} onClick={() => { clearWallpaper(scheme, index) }}>
                {t('prism.deleteWallpaper')}
              </button>
            )}
          </div>
        ))}
        <button type="button" className={css.wallpaperButton} onClick={() => { startPick(scheme) }}>
          {t('prism.chooseImage')}
        </button>
        <button
          type="button"
          className={css.wallpaperButton}
          aria-pressed={managing}
          onClick={() => { setManaging(!managing) }}
        >
          {managing ? t('prism.manageDone') : t('prism.manage')}
        </button>
      </div>
    )
  }

  return (
    <div className={css.panel}>
      <Group title={t('prism.material')}>
        <Segmented
          label={t('prism.material')}
          value={material}
          onSelect={setMaterial}
          options={[
            { id: 'clear', label: t('prism.materialClear') },
            { id: 'frosted', label: t('prism.materialFrosted') },
            { id: 'velvet', label: t('prism.materialVelvet') },
          ]}
        />
        <PrismSlider label={t('prism.blur')} value={blur} min={0} max={40} step={1} unit="px" onChange={setBlur} />
        <PrismSlider label={t('prism.frost')} value={frost} min={0} max={100} step={1} unit="%" onChange={setFrost} />
        <PrismSlider label={t('prism.bgBrightness')} value={bgBrightness} min={0} max={100} step={1} unit="%" onChange={setBgBrightness} />
        <div className={css.hint}>{dark ? t('prism.brightnessHintDark') : t('prism.brightnessHintLight')}</div>
      </Group>

      <Group title={t('prism.zones')}>
        <PrismSlider label={t('prism.zoneBase')} value={zones.base} min={20} max={100} step={1} unit="%" onChange={next => { setZone('base', next) }} />
        <PrismSlider label={t('prism.zoneSidebar')} value={zones.sidebar} min={20} max={100} step={1} unit="%" onChange={next => { setZone('sidebar', next) }} />
        <PrismSlider label={t('prism.zoneCard')} value={zones.card} min={20} max={100} step={1} unit="%" onChange={next => { setZone('card', next) }} />
        <PrismSlider label={t('prism.zoneInput')} value={zones.input} min={20} max={100} step={1} unit="%" onChange={next => { setZone('input', next) }} />
        <PrismSlider label={t('prism.zoneOverlay')} value={zones.overlay} min={20} max={100} step={1} unit="%" onChange={next => { setZone('overlay', next) }} />
        <PrismSlider label={t('prism.zoneBubble')} value={zones.bubble} min={20} max={100} step={1} unit="%" onChange={next => { setZone('bubble', next) }} />
      </Group>

      <Group title={t('prism.font')}>
        <Segmented
          label={t('prism.font')}
          value={fontChoice}
          onSelect={setFontChoice}
          options={[
            { id: 'system', label: t('prism.fontSystem') },
            { id: 'rounded', label: t('prism.fontRounded') },
            { id: 'serif', label: t('prism.fontSerif') },
            { id: 'mono', label: t('prism.fontMono') },
            { id: 'custom', label: t('prism.fontCustom') },
          ]}
        />
        {fontChoice === 'custom' && (
          <input
            className={css.customFont}
            type="text"
            value={customFont}
            placeholder={t('prism.customFontPlaceholder')}
            onChange={event => { setCustomFont(event.target.value) }}
          />
        )}
        <PrismSlider label={t('prism.fontSize')} value={fontScale} min={85} max={120} step={1} unit="%" onChange={setFontScale} />
        <ColorControl label={t('prism.inkHue')} hue={inkLightHue} sat={inkLightSat} light={inkLightLight} onChange={(h, s, l) => { setInkLightColor(h, s, l) }} />
        <ColorControl label={t('prism.inkDarkHue')} hue={inkDarkHue} sat={inkDarkSat} light={inkDarkLight} onChange={(h, s, l) => { setInkDarkColor(h, s, l) }} />
      </Group>

      <Group title={t('prism.accentHue')}>
        <ColorControl label={t('prism.accentHue')} hue={accentHue} sat={accentSat} light={accentLight} onChange={(h, s, l) => { setAccentColor(h, s, l) }} />
        <PrismSlider label={t('prism.accentOpacity')} value={accentOpacity} min={0} max={100} step={1} unit="%" onChange={setAccentOpacity} />
        <div className={css.hint}>{t('prism.accentHint')}</div>
      </Group>

      <Group title={t('prism.background')}>
        <Segmented
          label={t('prism.background')}
          value={background}
          onSelect={setBackground}
          options={[
            { id: 'aurora', label: t('prism.backgroundAurora') },
            { id: 'wallpaper', label: t('prism.backgroundWallpaper') },
          ]}
        />
        {background === 'aurora' && (
          <>
            <ColorControl label={t('prism.bgHue')} hue={bgHue} sat={bgSat} light={bgLight} onChange={(h, s, l) => { setBgColor(h, s, l) }} />
            <PrismSlider label={t('prism.motion')} value={motion} min={0} max={100} step={1} unit="%" onChange={setMotion} />
          </>
        )}
        {background === 'wallpaper' && (
          <>
            {wallpaperRows('dark', wallpaperDark, 'prism.wallpaperDark')}
            {wallpaperRows('light', wallpaperLight, 'prism.wallpaperLight')}
            <div className={css.hint}>{t('prism.wallpaperPinHint')}</div>
            <Segmented
              label={t('prism.wallpaperMode')}
              value={wallpaperLoop ? 'loop' : 'fixed'}
              onSelect={value => { setWallpaperLoop(value === 'loop') }}
              options={[
                { id: 'fixed', label: t('prism.wallpaperFixed') },
                { id: 'loop', label: t('prism.wallpaperLoop') },
              ]}
            />
            {wallpaperLoop && (
              <>
                <PrismSlider label={t('prism.wallpaperInterval')} value={wallpaperInterval} min={5} max={120} step={5} unit="s" onChange={setWallpaperInterval} />
                <div className={css.hint}>{t('prism.wallpaperIntervalHint')}</div>
              </>
            )}
            <PrismSlider label={t('prism.wallpaperBlur')} value={wallpaperBlur} min={0} max={100} step={1} unit="%" onChange={setWallpaperBlur} />
            <PrismSlider label={t('prism.wallpaperFrost')} value={wallpaperFrost} min={0} max={100} step={1} unit="%" onChange={setWallpaperFrost} />
            <div className={css.hint}>{t('prism.wallpaperHint')}</div>
            {wallpaperError !== '' && <div className={css.error}>{wallpaperError}</div>}
          </>
        )}
      </Group>

      <Group title={t('prism.presets')}>
        <div className={css.presetRow}>
          <button type="button" className={css.presetButton} onClick={() => { applyPreset('night') }}>
            {t('prism.presetNight')}
          </button>
          <button type="button" className={css.presetButton} onClick={() => { applyPreset('aurora') }}>
            {t('prism.presetAurora')}
          </button>
          <button type="button" className={css.presetButton} onClick={() => { applyPreset('crystal') }}>
            {t('prism.presetCrystal')}
          </button>
          <button type="button" className={css.resetButton} onClick={reset}>
            {t('prism.reset')}
          </button>
        </div>
      </Group>

      <input
        ref={fileRef}
        className={css.fileInput}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif,image/avif"
        onChange={event => { void onFile(event) }}
      />
    </div>
  )
}
