/**
 * Prism's General → Appearance control surface. The master switch now lives
 * here because DSH 0.2.2 retired settings.plugin.item. Four task-oriented
 * tabs keep the full theme controls compact; every write still goes through
 * the damped PrismLayer, so presets and individual knobs preview live.
 */
import { useRef, useState } from 'react'
import type { InjectFace, PropsLocale, PropsRuntime, PropsStore } from '@deepseek-ai/dsh-client-ui-slots'
// Type-only: pulls the `settings.general.item` SlotMap merge.
import type {} from '@deepseek-ai/dsh-client-ui-settings/client'
import { ColorControl, PrismButton, PrismSlider, Segmented, Switch } from './controls.tsx'
import { hslToHex } from './color.ts'
import type { NS, PrismLocaleKey } from './locales.ts'
import type { createPrismRowStore } from './settings-store.ts'
import {
  PRESETS, PRISM_THEME_LIMIT_ERROR, PRISM_THEME_PERSIST_ERROR,
  type PrismCustomTheme, type PrismFontChoice, type PrismMaterial, type PrismPreset, type PrismThemeValues, type PrismZones,
} from './prism-settings.ts'
import { PRISM_THEME_MAX_BYTES } from './theme-io.ts'
import type { WallpaperError } from './wallpaper.ts'
import css from './PrismAppearancePanel.module.css'

interface WallpaperErrorState {
  scheme: 'dark' | 'light'
  message: string
}

/** Injected business face: the layer remains the single writer. */
export interface PrismAppearanceInjected {
  setEnabled: (enabled: boolean) => void
  setMaterial: (value: PrismMaterial) => void
  setBlur: (value: number) => void
  setFrost: (value: number) => void
  setBgBrightness: (value: number) => void
  setFontScale: (value: number) => void
  setFontChoice: (value: PrismFontChoice) => void
  setCustomFont: (value: string) => void
  setZone: (zone: keyof PrismZones, value: number) => void
  setInkLightColor: (hue: number, sat: number, light: number) => void
  setInkDarkColor: (hue: number, sat: number, light: number) => void
  setAccentColor: (hue: number, sat: number, light: number) => void
  setBgColor: (hue: number, sat: number, light: number) => void
  setAccentOpacity: (value: number) => void
  setMotion: (value: number) => void
  setBackground: (value: 'aurora' | 'wallpaper') => void
  setWallpaperInterval: (value: number) => void
  setWallpaperLoop: (loop: boolean) => void
  pinWallpaper: (scheme: 'dark' | 'light', index: number) => void
  setWallpaperBlur: (value: number) => void
  setWallpaperFrost: (value: number) => void
  pickWallpaper: (scheme: 'dark' | 'light', file: File) => Promise<WallpaperError | null>
  clearWallpaper: (scheme: 'dark' | 'light', index: number) => void
  applyPreset: (preset: PrismPreset) => void
  saveTheme: (name: string) => string | null
  applyCustomTheme: (id: string) => void
  deleteCustomTheme: (id: string) => void
  exportTheme: () => string
  importTheme: (raw: string) => string
  resetZones: () => void
  reset: () => void
}

/** Full component props: runtime share + store share + locale seat + injected face. */
export type PrismAppearancePanelProps =
  PropsRuntime<'settings.general.item'> & PropsStore<ReturnType<typeof createPrismRowStore>>
  & PropsLocale<typeof NS> & InjectFace<PrismAppearanceInjected>

type PanelTab = 'theme' | 'glass' | 'background' | 'type'
const TABS: readonly PanelTab[] = ['theme', 'glass', 'background', 'type']
const PRESET_ORDER: readonly PrismPreset[] = ['crystal', 'night', 'aurora', 'dune', 'rose', 'forest']
const PRESET_LABELS: Readonly<Record<PrismPreset, PrismLocaleKey>> = {
  crystal: 'prism.presetCrystal', night: 'prism.presetNight', aurora: 'prism.presetAurora',
  dune: 'prism.presetDune', rose: 'prism.presetRose', forest: 'prism.presetForest',
}

/** Localized error copy for a wallpaper rejection. */
function wallpaperErrorText(t: (key: string) => string, error: WallpaperError): string {
  switch (error.kind) {
    case 'size': return t('prism.errorSize')
    case 'read': return t('prism.errorRead')
    case 'decode': return t('prism.errorDecode')
  }
}

function Section({ title, description, action, children }: { title: string, description?: string, action?: React.ReactNode, children: React.ReactNode }) {
  return (
    <section className={css.section}>
      <div className={css.sectionHead}>
        <div>
          <h3 className={css.sectionTitle}>{title}</h3>
          {description !== undefined && <p className={css.sectionDescription}>{description}</p>}
        </div>
        {action}
      </div>
      <div className={css.sectionBody}>{children}</div>
    </section>
  )
}

function color(values: Pick<PrismThemeValues, 'accentHue' | 'accentSat' | 'accentLight'>): string {
  return hslToHex({ h: values.accentHue, s: values.accentSat, l: values.accentLight })
}

function PresetCard({ id, active, label, onApply }: { id: PrismPreset, active: boolean, label: string, onApply: () => void }) {
  const recipe = PRESETS[id]
  const accent = color(recipe)
  const backdrop = hslToHex({ h: recipe.bgHue, s: recipe.bgSat, l: recipe.bgLight })
  return (
    <button
      type="button"
      className={active ? css.presetCardActive : css.presetCard}
      aria-pressed={active}
      aria-label={label}
      onClick={onApply}
    >
      <span className={css.presetArtwork} style={{ background: `linear-gradient(135deg, ${backdrop}, ${accent})` }} data-material={recipe.material}>
        <span className={css.presetPane}><i /><i /><i /></span>
        <span className={css.presetDot} />
      </span>
      <span className={css.presetName}>{label}</span>
      {active && <span className={css.presetCheck} aria-hidden="true">✓</span>}
    </button>
  )
}

function CustomThemeRow({ theme, onApply, onDelete, t }: {
  theme: PrismCustomTheme
  onApply: () => void
  onDelete: () => void
  t: (key: PrismLocaleKey) => string
}) {
  const accent = color(theme.values)
  const backdrop = hslToHex({ h: theme.values.bgHue, s: theme.values.bgSat, l: theme.values.bgLight })
  return (
    <div className={css.customThemeRow}>
      <span className={css.customSwatch} style={{ background: `linear-gradient(135deg, ${backdrop}, ${accent})` }} aria-hidden="true"><i /></span>
      <span className={css.customThemeName}>{theme.name}</span>
      <div className={css.customThemeActions}>
        <PrismButton variant="quiet" aria-label={`${t('prism.applyTheme')} ${theme.name}`} onClick={onApply}>{t('prism.applyTheme')}</PrismButton>
        <PrismButton variant="danger" aria-label={`${t('prism.deleteTheme')} ${theme.name}`} onClick={onDelete}>{t('prism.deleteTheme')}</PrismButton>
      </div>
    </div>
  )
}

/** Render the Prism appearance panel. */
export function PrismAppearancePanel(props: PrismAppearanceInjected & PrismAppearancePanelProps) {
  const {
    t, setEnabled, setMaterial, setBlur, setFrost, setBgBrightness, setFontScale, setFontChoice,
    setCustomFont, setZone, setInkLightColor, setInkDarkColor, setAccentColor, setBgColor, setAccentOpacity, setMotion, setBackground,
    setWallpaperInterval, setWallpaperLoop, pinWallpaper, setWallpaperBlur, setWallpaperFrost, pickWallpaper, clearWallpaper,
    applyPreset, saveTheme, applyCustomTheme, deleteCustomTheme, exportTheme, importTheme, resetZones, reset, useStore,
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
  const customThemes = useStore(s => s.customThemes)
  const dark = useStore(s => s.dark)
  const [tab, setTab] = useState<PanelTab>('theme')
  const [themeName, setThemeName] = useState('')
  const [status, setStatus] = useState<{ message: string, error: boolean } | null>(null)
  const [wallpaperError, setWallpaperError] = useState<WallpaperErrorState | null>(null)
  const wallpaperFileRef = useRef<HTMLInputElement | null>(null)
  const importFileRef = useRef<HTMLInputElement | null>(null)
  const schemeRef = useRef<'dark' | 'light'>('dark')

  const accent = hslToHex({ h: accentHue, s: accentSat, l: accentLight })
  const backdrop = hslToHex({ h: bgHue, s: bgSat, l: bgLight })
  const ink = hslToHex(dark ? { h: inkDarkHue, s: inkDarkSat, l: inkDarkLight } : { h: inkLightHue, s: inkLightSat, l: inkLightLight })
  const previewStyle = {
    '--prism-preview-accent': accent,
    '--prism-preview-backdrop': backdrop,
    '--prism-preview-ink': ink,
    '--prism-preview-scale': String(fontScale / 100),
  } as React.CSSProperties
  const resetHint = t('prism.sliderResetHint')
  const isPresetActive = (id: PrismPreset): boolean => {
    const recipe = PRESETS[id]
    return material === recipe.material && blur === recipe.blur && frost === recipe.frost
      && bgBrightness === recipe.bgBrightness && motion === recipe.motion
      && accentHue === recipe.accentHue && accentSat === recipe.accentSat && accentLight === recipe.accentLight
      && bgHue === recipe.bgHue && bgSat === recipe.bgSat && bgLight === recipe.bgLight
  }

  const startPick = (scheme: 'dark' | 'light'): void => {
    schemeRef.current = scheme
    wallpaperFileRef.current?.click()
  }

  const onWallpaperFile = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (file === undefined) return
    const scheme = schemeRef.current
    const error = await pickWallpaper(scheme, file)
    setWallpaperError(error === null ? null : { scheme, message: wallpaperErrorText(t as (key: string) => string, error) })
  }

  const onImportFile = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (file === undefined) return
    if (file.size > PRISM_THEME_MAX_BYTES) {
      setStatus({ message: t('prism.themeImportFailed'), error: true })
      return
    }
    try {
      const name = importTheme(await file.text())
      setThemeName(name)
      setStatus({ message: t('prism.themeImported'), error: false })
    } catch (error) {
      const code = error instanceof Error ? error.message : ''
      const message = code === PRISM_THEME_LIMIT_ERROR
        ? t('prism.themeLimit')
        : code === PRISM_THEME_PERSIST_ERROR ? t('prism.themePersistFailed') : t('prism.themeImportFailed')
      setStatus({ message, error: true })
    }
  }

  const onExport = (): void => {
    const blob = new Blob([exportTheme()], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = `prism-theme-${new Date().toISOString().slice(0, 10)}.json`
    anchor.click()
    window.setTimeout(() => { URL.revokeObjectURL(url) }, 1000)
    setStatus({ message: t('prism.themeExported'), error: false })
  }

  const onTabKeys = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return
    event.preventDefault()
    const index = TABS.indexOf(tab)
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? TABS.length - 1
      : event.key === 'ArrowRight' ? (index + 1) % TABS.length : (index - 1 + TABS.length) % TABS.length
    const nextTab = TABS[next] ?? 'theme'
    setTab(nextTab)
    const buttons = event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]')
    buttons[next]?.focus()
  }

  const wallpaperRows = (scheme: 'dark' | 'light', urls: string[], labelKey: PrismLocaleKey) => {
    const pinned = scheme === 'dark' ? wallpaperPinnedDark : wallpaperPinnedLight
    return (
      <div className={css.wallpaperList} key={scheme}>
        <div className={css.wallpaperHeader}>
          <span className={css.wallpaperScheme}>{t(labelKey)}</span>
          <PrismButton variant="quiet" aria-label={`${t('prism.chooseImage')} · ${t(labelKey)}`} onClick={() => { startPick(scheme) }}>
            + {t('prism.chooseImage')}
          </PrismButton>
        </div>
        {urls.length === 0 ? <div className={css.wallpaperEmpty}>{t('prism.wallpaperEmpty')}</div> : (
          <div className={css.wallpaperItems}>
            {urls.map((url, index) => (
              <div className={css.wallpaperRow} key={`${scheme}-${String(index)}`}>
                <button
                  type="button"
                  className={!wallpaperLoop && pinned === index ? css.wallpaperThumbActive : css.wallpaperThumbButton}
                  aria-label={`${t('prism.wallpaperPin')} · ${t(labelKey)} ${String(index + 1)}`}
                  aria-pressed={!wallpaperLoop && pinned === index}
                  title={t('prism.wallpaperPinHint')}
                  onClick={() => { pinWallpaper(scheme, index) }}
                >
                  <img className={css.wallpaperThumb} src={url} alt="" />
                  {!wallpaperLoop && pinned === index && <span className={css.wallpaperPinned}>✓</span>}
                </button>
                <button
                  type="button"
                  className={css.wallpaperDelete}
                  aria-label={`${t('prism.deleteWallpaper')} · ${t(labelKey)} ${String(index + 1)}`}
                  onClick={() => { clearWallpaper(scheme, index) }}
                >×</button>
              </div>
            ))}
          </div>
        )}
        {wallpaperError?.scheme === scheme && <div className={css.error} role="alert">{wallpaperError.message}</div>}
      </div>
    )
  }

  const hero = (
    <div className={css.hero}>
      <div className={css.heroCopy}>
        <div className={css.brandRow}>
          <span className={css.brandMark} aria-hidden="true"><i /><i /><i /></span>
          <div>
            <div className={css.titleRow}><h2 className={css.title}>DSH Background</h2><span className={css.version}>2.0</span></div>
            <p className={css.subtitle}>{t('prism.subtitle')}</p>
          </div>
        </div>
        <div className={css.heroActions}>
          <PrismButton variant="quiet" onClick={reset}>{t('prism.resetAll')}</PrismButton>
          <Switch label={t('prism.enabled')} checked={enabled} onChange={setEnabled} />
        </div>
      </div>
      <div className={css.preview} style={previewStyle} data-material={material} aria-hidden="true">
        <span className={css.previewOrb} />
        <div className={css.previewWindow}>
          <div className={css.previewSidebar}><i /><i /><i /></div>
          <div className={css.previewMain}>
            <div className={css.previewTopbar} />
            <div className={css.previewBubble}><b>{t('prism.previewTitle')}</b><span>{t('prism.previewText')}</span></div>
            <div className={css.previewComposer}><span>{t('prism.previewInput')}</span><i /></div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className={css.panel}>
      {hero}
      {!enabled ? (
        <div className={css.disabledState}>
          <span>{t('prism.subtitle')}</span>
          <PrismButton variant="primary" onClick={() => { setEnabled(true) }}>{t('prism.enable')}</PrismButton>
        </div>
      ) : (
        <>
          <div className={css.tabs} role="tablist" aria-label="DSH Background" onKeyDown={onTabKeys}>
            {TABS.map(id => (
              <button
                key={id}
                type="button"
                role="tab"
                id={`prism-tab-${id}`}
                aria-selected={tab === id}
                aria-controls={`prism-panel-${id}`}
                tabIndex={tab === id ? 0 : -1}
                className={tab === id ? css.tabActive : css.tab}
                onClick={() => { setTab(id) }}
              >{t(`prism.tab${id[0]?.toUpperCase() ?? ''}${id.slice(1)}` as PrismLocaleKey)}</button>
            ))}
          </div>
          <div className={css.tabPanel} role="tabpanel" id={`prism-panel-${tab}`} aria-labelledby={`prism-tab-${tab}`}>
            {tab === 'theme' && (
              <>
                <Section title={t('prism.presets')} description={t('prism.presetsDesc')}>
                  <div className={css.presetGrid}>
                    {PRESET_ORDER.map(id => (
                      <PresetCard key={id} id={id} label={t(PRESET_LABELS[id])} active={isPresetActive(id)} onApply={() => { applyPreset(id) }} />
                    ))}
                  </div>
                </Section>
                <Section title={t('prism.colors')} description={t('prism.colorsDesc')}>
                  <div className={css.controlsStack}>
                    <ColorControl label={t('prism.accentHue')} hexLabel={t('prism.colorHexLabel')} pickerLabel={t('prism.colorPickerLabel')} placeholder={t('prism.colorPlaceholder')} hue={accentHue} sat={accentSat} light={accentLight} onChange={setAccentColor} />
                    <PrismSlider label={t('prism.accentOpacity')} value={accentOpacity} min={0} max={100} step={1} unit="%" defaultValue={100} resetHint={resetHint} onChange={setAccentOpacity} />
                    <ColorControl label={t('prism.inkHue')} hexLabel={t('prism.colorHexLabel')} pickerLabel={t('prism.colorPickerLabel')} placeholder={t('prism.colorPlaceholder')} hue={inkLightHue} sat={inkLightSat} light={inkLightLight} onChange={setInkLightColor} />
                    <ColorControl label={t('prism.inkDarkHue')} hexLabel={t('prism.colorHexLabel')} pickerLabel={t('prism.colorPickerLabel')} placeholder={t('prism.colorPlaceholder')} hue={inkDarkHue} sat={inkDarkSat} light={inkDarkLight} onChange={setInkDarkColor} />
                  </div>
                </Section>
                <Section title={t('prism.customThemes')} description={t('prism.customThemesDesc')}>
                  <form className={css.saveThemeForm} onSubmit={event => {
                    event.preventDefault()
                    try {
                      if (saveTheme(themeName) !== null) {
                        setThemeName('')
                        setStatus({ message: t('prism.themeSaved'), error: false })
                      } else {
                        setStatus({ message: t('prism.themeLimit'), error: true })
                      }
                    } catch {
                      setStatus({ message: t('prism.themePersistFailed'), error: true })
                    }
                  }}>
                    <input className={css.textInput} value={themeName} maxLength={40} placeholder={t('prism.themeNamePlaceholder')} aria-label={t('prism.themeNamePlaceholder')} onChange={event => { setThemeName(event.target.value) }} />
                    <PrismButton variant="primary" type="submit" disabled={themeName.trim() === ''}>{t('prism.saveTheme')}</PrismButton>
                  </form>
                  <div className={css.importExportRow}>
                    <PrismButton onClick={() => { importFileRef.current?.click() }}>{t('prism.importTheme')}</PrismButton>
                    <PrismButton onClick={onExport}>{t('prism.exportTheme')}</PrismButton>
                  </div>
                  {customThemes.length === 0 ? <p className={css.emptyThemes}>{t('prism.noCustomThemes')}</p> : (
                    <div className={css.customThemeList}>
                      {customThemes.map(theme => <CustomThemeRow key={theme.id} theme={theme} t={t} onApply={() => { applyCustomTheme(theme.id) }} onDelete={() => {
                        try {
                          deleteCustomTheme(theme.id)
                          setStatus({ message: t('prism.themeDeleted'), error: false })
                        } catch {
                          setStatus({ message: t('prism.themePersistFailed'), error: true })
                        }
                      }} />)}
                    </div>
                  )}
                  {status !== null && <p className={status.error ? css.error : css.status} role={status.error ? 'alert' : 'status'}>{status.message}</p>}
                </Section>
              </>
            )}

            {tab === 'glass' && (
              <>
                <Section title={t('prism.material')} description={t('prism.materialDesc')}>
                  <div className={css.materialGrid}>
                    {(['clear', 'frosted', 'velvet'] as const).map(id => (
                      <button key={id} type="button" className={material === id ? css.materialCardActive : css.materialCard} aria-pressed={material === id} onClick={() => { setMaterial(id) }}>
                        <span className={css.materialSample} data-material={id}><i /></span>
                        <span>{t(`prism.material${id[0]?.toUpperCase() ?? ''}${id.slice(1)}` as PrismLocaleKey)}</span>
                      </button>
                    ))}
                  </div>
                  <div className={css.controlsStack}>
                    <PrismSlider label={t('prism.blur')} value={blur} min={0} max={40} step={1} unit="px" defaultValue={18} resetHint={resetHint} onChange={setBlur} />
                    <PrismSlider label={t('prism.frost')} value={frost} min={0} max={100} step={1} unit="%" defaultValue={50} resetHint={resetHint} onChange={setFrost} />
                    <PrismSlider label={t('prism.bgBrightness')} value={bgBrightness} min={0} max={100} step={1} unit="%" defaultValue={50} resetHint={resetHint} onChange={setBgBrightness} />
                    <p className={css.hint}>{dark ? t('prism.brightnessHintDark') : t('prism.brightnessHintLight')}</p>
                  </div>
                </Section>
                <Section title={t('prism.zones')} description={t('prism.zonesDesc')} action={<PrismButton variant="quiet" onClick={resetZones}>{t('prism.resetZones')}</PrismButton>}>
                  <div className={css.controlsStack}>
                    {(Object.keys(zones) as Array<keyof PrismZones>).map(zone => (
                      <PrismSlider key={zone} label={t(`prism.zone${zone[0]?.toUpperCase() ?? ''}${zone.slice(1)}` as PrismLocaleKey)} value={zones[zone]} min={20} max={100} step={1} unit="%" defaultValue={100} resetHint={resetHint} onChange={value => { setZone(zone, value) }} />
                    ))}
                  </div>
                </Section>
              </>
            )}

            {tab === 'background' && (
              <Section title={t('prism.background')} description={t('prism.backgroundDesc')}>
                <Segmented label={t('prism.background')} value={background} onSelect={setBackground} options={[{ id: 'aurora', label: t('prism.backgroundAurora') }, { id: 'wallpaper', label: t('prism.backgroundWallpaper') }]} />
                {background === 'aurora' ? (
                  <div className={css.controlsStack}>
                    <ColorControl label={t('prism.bgHue')} hexLabel={t('prism.colorHexLabel')} pickerLabel={t('prism.colorPickerLabel')} placeholder={t('prism.colorPlaceholder')} hue={bgHue} sat={bgSat} light={bgLight} onChange={setBgColor} />
                    <PrismSlider label={t('prism.motion')} value={motion} min={0} max={100} step={1} unit="%" defaultValue={55} resetHint={resetHint} onChange={setMotion} />
                  </div>
                ) : (
                  <>
                    {wallpaperRows('dark', wallpaperDark, 'prism.wallpaperDark')}
                    {wallpaperRows('light', wallpaperLight, 'prism.wallpaperLight')}
                    <div className={css.controlsStack}>
                      <Segmented label={t('prism.wallpaperMode')} value={wallpaperLoop ? 'loop' : 'fixed'} onSelect={value => { setWallpaperLoop(value === 'loop') }} options={[{ id: 'fixed', label: t('prism.wallpaperFixed') }, { id: 'loop', label: t('prism.wallpaperLoop') }]} />
                      {wallpaperLoop && <PrismSlider label={t('prism.wallpaperInterval')} value={wallpaperInterval} min={5} max={120} step={5} unit="s" defaultValue={30} resetHint={resetHint} onChange={setWallpaperInterval} />}
                      <PrismSlider label={t('prism.wallpaperBlur')} value={wallpaperBlur} min={0} max={100} step={1} unit="%" defaultValue={20} resetHint={resetHint} onChange={setWallpaperBlur} />
                      <PrismSlider label={t('prism.wallpaperFrost')} value={wallpaperFrost} min={0} max={100} step={1} unit="%" defaultValue={0} resetHint={resetHint} onChange={setWallpaperFrost} />
                      <p className={css.hint}>{t('prism.wallpaperHint')}</p>
                    </div>
                  </>
                )}
              </Section>
            )}

            {tab === 'type' && (
              <Section title={t('prism.font')} description={t('prism.fontDesc')}>
                <Segmented label={t('prism.font')} value={fontChoice} onSelect={setFontChoice} options={[
                  { id: 'system', label: t('prism.fontSystem') }, { id: 'rounded', label: t('prism.fontRounded') },
                  { id: 'serif', label: t('prism.fontSerif') }, { id: 'mono', label: t('prism.fontMono') }, { id: 'custom', label: t('prism.fontCustom') },
                ]} />
                {fontChoice === 'custom' && <input className={css.textInput} type="text" value={customFont} aria-label={t('prism.customFontLabel')} placeholder={t('prism.customFontPlaceholder')} onChange={event => { setCustomFont(event.target.value) }} />}
                <PrismSlider label={t('prism.fontSize')} value={fontScale} min={85} max={120} step={1} unit="%" defaultValue={100} resetHint={resetHint} onChange={setFontScale} />
                <div className={css.fontPreview} style={{ fontSize: `${String(14 * fontScale / 100)}px` }}>
                  <span className={css.fontPreviewAa}>Aa</span>
                  <p>{t('prism.fontPreview')}</p>
                </div>
              </Section>
            )}
          </div>
        </>
      )}
      <input ref={wallpaperFileRef} className={css.fileInput} type="file" accept="image/png,image/jpeg,image/webp,image/gif,image/avif" onChange={event => { void onWallpaperFile(event) }} />
      <input ref={importFileRef} className={css.fileInput} type="file" accept=".json,application/json" onChange={event => { void onImportFile(event) }} />
    </div>
  )
}
