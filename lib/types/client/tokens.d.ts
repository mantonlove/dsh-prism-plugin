/**
 * Token derivation engine: one static override layer that turns the accent
 * hue, contrast, frost, and six zone opacities into the full glass palette.
 * Every dynamic part is a `var(--prism-*)` reference, so knob changes are
 * single CSS-variable writes on <html> — the layer itself is registered once
 * through the official {@link ThemeService.overrideTokens} stack and never
 * re-applied while the knobs move.
 */
import type { ThemeTokenOverrides } from '@deepseek-ai/dsh-client-ui-theme/client';
/**
 * Build the complete Prism token layer. Values are static strings; the
 * dynamic knobs arrive through `--prism-*` variables written by the layer.
 * @returns token-name → { light, dark } override dictionary.
 */
export declare function buildTokenOverrides(): ThemeTokenOverrides;
//# sourceMappingURL=tokens.d.ts.map