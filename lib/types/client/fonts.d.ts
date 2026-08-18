/**
 * Font token scale layer: every composite `--dsw-font-*` token from the theme
 * package's gradient-shadow-text sheet, transcribed once, transformed to
 * `calc(...px * var(--prism-font-scale))` forms so the font-size knob scales
 * the whole UI through the official theme override stack. The size/line-height
 * pair is the only scaled part; weight, style, and family survive untouched
 * (the family var resolves lazily at use-site).
 */
import type { ThemeTokenOverrides } from '@deepseek-ai/dsh-client-ui-theme/client';
/** One font token: its name and the exact stock shorthand string. */
export type FontEntry = readonly [name: string, shorthand: string];
/** The complete composite-font inventory (source: ui-theme gradient-shadow-text.css). */
export declare const FONT_ENTRIES: readonly FontEntry[];
/**
 * Rewrite a stock shorthand's size/line-height pair into scale-aware calc()
 * expressions.
 * @param shorthand - the stock shorthand string.
 * @returns the same string with both px values replaced by calc().
 */
export declare function scaleShorthand(shorthand: string): string;
/**
 * Build the complete font-scale override layer: every shorthand plus its
 * `-font-size` / `-line-height` members, all scheme-invariant.
 * @returns token-name → { light, dark } override dictionary.
 */
export declare function buildFontOverrides(): ThemeTokenOverrides;
//# sourceMappingURL=fonts.d.ts.map