/**
 * Prism settings controls: the spring-damped slider (pointer + full keyboard
 * operation, WAI-ARIA slider semantics), the hue slider, and a segmented
 * picker. The damping itself lives in the layer — the slider writes targets,
 * the skin glides — so these controls stay dumb and testable.
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import { IconChevronDownOutline14 } from '@deepseek-ai/dsh-client-ui-primitives'
import { hexToHsl, hslToHex } from './color.ts'
import css from './PrismControls.module.css'

/** Common slider props. */
export interface PrismSliderProps {
  /** Row label. */
  label: string
  /** Current target value. */
  value: number
  /** Inclusive lower bound. */
  min: number
  /** Inclusive upper bound. */
  max: number
  /** Keyboard / drag granularity. */
  step: number
  /** Value suffix shown in the readout (empty hides the readout). */
  unit?: string
  /** Called with the new target on every interaction. */
  onChange: (value: number) => void
}

/** Compute the value for a pointer x position inside the track bounds. */
function valueFromPointer(clientX: number, rect: DOMRect, min: number, max: number): number {
  const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width))
  return min + ratio * (max - min)
}

/**
 * Render one damped slider row: label, track with accent fill, draggable
 * thumb, and a numeric readout. The element is a real WAI-ARIA slider.
 * @param props - slider props.
 * @returns the slider row.
 */
export function PrismSlider({ label, value, min, max, step, unit, onChange }: PrismSliderProps) {
  const trackRef = useRef<HTMLDivElement | null>(null)
  const draggingRef = useRef(false)
  const ratio = max === min ? 0 : (value - min) / (max - min)

  const commit = useCallback((clientX: number) => {
    const track = trackRef.current
    if (track === null) return
    const raw = valueFromPointer(clientX, track.getBoundingClientRect(), min, max)
    const stepped = Math.round(raw / step) * step
    onChange(Math.min(max, Math.max(min, stepped)))
  }, [max, min, onChange, step])

  const onPointerDown = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId)
    draggingRef.current = true
    commit(event.clientX)
  }, [commit])

  const onPointerMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return
    commit(event.clientX)
  }, [commit])

  const onPointerUp = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = false
    event.currentTarget.releasePointerCapture(event.pointerId)
  }, [])

  const onKeyDown = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    let next: number | undefined
    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowDown':
        next = value - step
        break
      case 'ArrowRight':
      case 'ArrowUp':
        next = value + step
        break
      case 'PageDown':
        next = value - step * 10
        break
      case 'PageUp':
        next = value + step * 10
        break
      case 'Home':
        next = min
        break
      case 'End':
        next = max
        break
      default:
        return
    }
    event.preventDefault()
    onChange(Math.min(max, Math.max(min, next)))
  }, [max, min, onChange, step, value])

  const fillStyle: React.CSSProperties = { width: `${String(ratio * 100)}%` }
  const thumbStyle: React.CSSProperties = { left: `${String(ratio * 100)}%` }

  return (
    <div className={css.sliderRow}>
      <span className={css.sliderLabel} id={`prism-slider-label-${label}`}>{label}</span>
      <div
        ref={trackRef}
        role="slider"
        tabIndex={0}
        className={css.sliderTrack}
        aria-label={label}
        aria-labelledby={`prism-slider-label-${label}`}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={Math.round(value * 10) / 10}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onKeyDown={onKeyDown}
      >
        <div className={css.sliderFill} style={fillStyle} />
        <div className={css.sliderThumb} style={thumbStyle} />
      </div>
      {unit !== undefined && unit !== '' && (
        <span className={css.sliderReadout}>
          {String(Math.round(value * 10) / 10)}
          {unit}
        </span>
      )}
    </div>
  )
}

/** One option of a segmented picker. */
export interface SegmentedOption<T extends string> {
  id: T
  label: string
}

/** Segmented picker props. */
export interface SegmentedProps<T extends string> {
  /** Accessible name for the button group. */
  label: string
  /** Selected option id. */
  value: T
  /** Options, in display order. */
  options: ReadonlyArray<SegmentedOption<T>>
  /** Called with the selected id. */
  onSelect: (value: T) => void
}

/**
 * Render a two-or-more-button segmented picker.
 * @param props - segmented props.
 * @returns the button group.
 */
export function Segmented<T extends string>({ label, value, options, onSelect }: SegmentedProps<T>) {
  return (
    <div className={css.segmented} role="group" aria-label={label}>
      {options.map(option => (
        <button
          key={option.id}
          type="button"
          className={option.id === value ? css.segActive : css.seg}
          aria-pressed={option.id === value}
          onClick={() => { onSelect(option.id) }}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}

/** Collapsible group props. */
export interface GroupProps {
  /** Group title (rendered as the toggle header). */
  title: string
  /** Initial expanded state. */
  defaultOpen?: boolean
  /** Group body. */
  children: React.ReactNode
}

/**
 * Render a collapsible settings group: a header toggle with an aria-expanded
 * state and the body mounted only while open.
 * @param props - group props.
 * @returns the group block.
 */
export function Group({ title, defaultOpen = false, children }: GroupProps) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className={css.group}>
      <button
        type="button"
        className={css.groupToggle}
        aria-expanded={open}
        onClick={() => { setOpen(!open) }}
      >
        <span className={css.groupTitle}>{title}</span>
        <span className={open ? css.groupChevronOpen : css.groupChevron} aria-hidden="true">
          <IconChevronDownOutline14 />
        </span>
      </button>
      {open && <div className={css.groupBody}>{children}</div>}
    </div>
  )
}

/** Full-range color control props. */
export interface ColorControlProps {
  /** Row label. */
  label: string
  /** Current hue, degrees. */
  hue: number
  /** Current saturation, 0-100. */
  sat: number
  /** Current lightness, 0-100. */
  light: number
  /** Called with the new channels. */
  onChange: (hue: number, sat: number, light: number) => void
}

/** Hex-validity check (accepts #rgb / #rrggbb / bare 6-hex). */
function parseHexInput(raw: string): string | null {
  let value = raw.trim().replace(/^#/, '')
  if (value.length === 3 && /^[0-9a-fA-F]{3}$/.test(value)) {
    value = value.split('').map(c => c + c).join('')
  }
  if (!/^[0-9a-fA-F]{6}$/.test(value)) return null
  return `#${value.toLowerCase()}`
}

/**
 * Render a Codex-style full-range color control: a hex code input (type any
 * color code directly) plus the click-to-pick swatch button on the right.
 * @param props - color control props.
 * @returns the color control row.
 */
export function ColorControl({ label, hue, sat, light, onChange }: ColorControlProps) {
  const hex = hslToHex({ h: hue, s: sat, l: light })
  const [text, setText] = useState(hex)

  // Adopt external color changes (presets, reset) into the text box.
  useEffect(() => {
    setText(hex)
  }, [hex])

  const commitText = useCallback((raw: string) => {
    const parsed = parseHexInput(raw)
    if (parsed === null) return
    const color = hexToHsl(parsed)
    onChange(color.h, color.s, color.l)
  }, [onChange])

  const onSwatch = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value)
    const color = hexToHsl(event.target.value)
    onChange(color.h, color.s, color.l)
  }, [onChange])

  const onText = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value)
    if (parseHexInput(event.target.value) !== null) commitText(event.target.value)
  }, [commitText])

  const onBlur = useCallback(() => {
    const parsed = parseHexInput(text)
    if (parsed === null) {
      setText(hex)
      return
    }
    setText(parsed)
    commitText(parsed)
  }, [commitText, hex, text])

  return (
    <div className={css.colorRow}>
      <span className={css.sliderLabel} id={`prism-color-label-${label}`}>{label}</span>
      <input
        type="text"
        className={css.colorHex}
        value={text}
        aria-label={label}
        spellCheck={false}
        placeholder="#rrggbb"
        onChange={onText}
        onBlur={onBlur}
      />
      <input
        type="color"
        className={css.colorInput}
        value={hex}
        aria-label={label}
        onChange={onSwatch}
      />
    </div>
  )
}
