/**
 * Font token scale layer: every composite `--dsw-font-*` token from the theme
 * package's gradient-shadow-text sheet, transcribed once, transformed to
 * `calc(...px * var(--prism-font-scale))` forms so the font-size knob scales
 * the whole UI through the official theme override stack. The size/line-height
 * pair is the only scaled part; weight, style, and family survive untouched
 * (the family var resolves lazily at use-site).
 */
import type { ThemeTokenOverrides } from '@deepseek-ai/dsh-client-ui-theme/client'

/** One font token: its name and the exact stock shorthand string. */
export type FontEntry = readonly [name: string, shorthand: string]

/** The complete composite-font inventory (source: ui-theme gradient-shadow-text.css). */
export const FONT_ENTRIES: readonly FontEntry[] = Object.freeze([
  ['--dsw-font-markdown-h1', '700 24px/34px var(--dsw-font-family)'],
  ['--dsw-font-markdown-h2', '700 22px/32px var(--dsw-font-family)'],
  ['--dsw-font-markdown-h3', '700 20px/30px var(--dsw-font-family)'],
  ['--dsw-font-markdown-h4', '600 16px/28px var(--dsw-font-family)'],
  ['--dsw-font-markdown-base', '16px/28px var(--dsw-font-family)'],
  ['--dsw-font-markdown-base-strong', '600 16px/28px var(--dsw-font-family)'],
  ['--dsw-font-markdown-base-italic', 'italic 16px/28px var(--dsw-font-family)'],
  ['--dsw-font-markdown-base-strong-italic', 'italic 600 16px/28px var(--dsw-font-family)'],
  ['--dsw-font-markdown-table', '15px/25px var(--dsw-font-family)'],
  ['--dsw-font-markdown-table-head', '500 15px/25px var(--dsw-font-family)'],
  ['--dsw-font-markdown-small', '14px/24px var(--dsw-font-family)'],
  ['--dsw-font-markdown-small-strong', '600 14px/24px var(--dsw-font-family)'],
  ['--dsw-font-markdown-small-italic', 'italic 14px/24px var(--dsw-font-family)'],
  ['--dsw-font-markdown-small-strong-italic', 'italic 600 14px/24px var(--dsw-font-family)'],
  ['--dsw-font-markdown-code', '14px/22px var(--ds-font-family-code)'],
  ['--dsw-font-markdown-code-block', '13px/22px var(--ds-font-family-code)'],
  ['--dsw-font-markdown-code-block-small', '12px/18px var(--ds-font-family-code)'],
  ['--dsw-font-xl-24', '600 24px/32px var(--dsw-font-family)'],
  ['--dsw-font-l-20', '500 20px/28px var(--dsw-font-family)'],
  ['--dsw-font-m-18', '500 16px/28px var(--dsw-font-family)'],
  ['--dsw-font-base-16', '16px/24px var(--dsw-font-family)'],
  ['--dsw-font-base-strong-16', '500 16px/24px var(--dsw-font-family)'],
  ['--dsw-font-s-14', '14px/22px var(--dsw-font-family)'],
  ['--dsw-font-s-strong-14', '500 14px/22px var(--dsw-font-family)'],
  ['--dsw-font-xs-13', '13px/20px var(--dsw-font-family)'],
  ['--dsw-font-xs-strong-13', '500 13px/20px var(--dsw-font-family)'],
  ['--dsw-font-xxs-12', '12px/18px var(--dsw-font-family)'],
  ['--dsw-font-xxs-strong-12', '500 12px/18px var(--dsw-font-family)'],
  ['--dsw-font-xxxs-11', '11px/14px var(--dsw-font-family)'],
  ['--dsw-font-xxxs-strong-11', '500 11px/14px var(--dsw-font-family)'],
] as readonly FontEntry[])

/** Matches the size/line-height pair inside a font shorthand. */
const PX_PAIR = /(\d+)px\/(\d+)px/

/** Scheme-invariant token pair (font values never differ per scheme). */
function both(value: string): { light: string; dark: string } {
  return { light: value, dark: value }
}

/**
 * Rewrite a stock shorthand's size/line-height pair into scale-aware calc()
 * expressions.
 * @param shorthand - the stock shorthand string.
 * @returns the same string with both px values replaced by calc().
 */
export function scaleShorthand(shorthand: string): string {
  return shorthand.replace(PX_PAIR, (_match, size: string, lineHeight: string) =>
    `calc(${size}px * var(--prism-font-scale)) / calc(${lineHeight}px * var(--prism-font-scale))`)
}

/**
 * Build the complete font-scale override layer: every shorthand plus its
 * `-font-size` / `-line-height` members, all scheme-invariant.
 * @returns token-name → { light, dark } override dictionary.
 */
export function buildFontOverrides(): ThemeTokenOverrides {
  const out: ThemeTokenOverrides = {}
  for (const [name, shorthand] of FONT_ENTRIES) {
    const match = PX_PAIR.exec(shorthand)
    if (match === null) continue
    const [, size, lineHeight] = match
    out[name] = both(scaleShorthand(shorthand))
    out[`${name}-font-size`] = both(`calc(${size}px * var(--prism-font-scale))`)
    out[`${name}-line-height`] = both(`calc(${lineHeight}px * var(--prism-font-scale))`)
  }
  return out
}
