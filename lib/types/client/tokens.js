/** Scheme-paired override value. */
function pair(light, dark) {
    return { light, dark };
}
/** The full user accent color, applied verbatim (both modes). */
const accentColor = () => pair('hsl(var(--prism-accent-h) var(--prism-accent-s) var(--prism-accent-l) / var(--prism-accent-a, 1))', 'hsl(var(--prism-accent-h) var(--prism-accent-s) var(--prism-accent-l) / var(--prism-accent-a, 1))');
/** Contrast-scaled secondary ink: strong ink toward weak gray as contrast
 *  falls; light mode mixes dark ink, dark mode mixes light ink. */
function ink(lightStrong, lightWeak, darkStrong, darkWeak, strongPct, weakPct) {
    const strongShare = `calc(${strongPct} + (1 - ${strongPct} - ${weakPct}) * 0.5)`;
    const weakShare = `calc(${weakPct} + (1 - ${strongPct} - ${weakPct}) * (1 - 0.5))`;
    return pair(`color-mix(in srgb, ${lightStrong} ${strongShare}, ${lightWeak} ${weakShare})`, `color-mix(in srgb, ${darkStrong} ${strongShare}, ${darkWeak} ${weakShare})`);
}
/**
 * Build the complete Prism token layer. Values are static strings; the
 * dynamic knobs arrive through `--prism-*` variables written by the layer.
 * @returns token-name → { light, dark } override dictionary.
 */
export function buildTokenOverrides() {
    const overrides = {
        // Typography: family rides the knob vars; the size scale lives in the
        // font layer (fonts.ts) over the same stack.
        '--dsw-font-family': pair('var(--prism-font-family)', 'var(--prism-font-family)'),
        '--ds-font-family-code': pair('var(--prism-code-family)', 'var(--prism-code-family)'),
        // Base canvas stays near-opaque; every raised surface turns glass.
        '--dsw-alias-bg-base': pair('#F2F6FC', '#0A0F16'),
        // Surfaces: one canonical glass color per scheme, scaled by frost (the
        // single transparency knob) and the material's depth factor.
        '--dsw-alias-bg-layer-1': pair('rgb(255 255 255 / calc(0.9 * var(--prism-frost) * var(--prism-depth, 1) * var(--prism-zone-base, 1)))', 'rgb(34 38 47 / calc(0.9 * var(--prism-frost) * var(--prism-depth, 1) * var(--prism-zone-base, 1)))'),
        '--dsw-alias-bg-layer-2': pair('rgb(255 255 255 / calc(0.85 * var(--prism-frost) * var(--prism-depth, 1) * var(--prism-zone-card, 1)))', 'rgb(34 38 47 / calc(0.85 * var(--prism-frost) * var(--prism-depth, 1) * var(--prism-zone-card, 1)))'),
        '--dsw-alias-bg-layer-3': pair('rgb(255 255 255 / calc(0.85 * var(--prism-frost) * var(--prism-depth, 1) * var(--prism-zone-card, 1)))', 'rgb(34 38 47 / calc(0.85 * var(--prism-frost) * var(--prism-depth, 1) * var(--prism-zone-card, 1)))'),
        '--dsw-alias-bg-overlay': pair('rgb(255 255 255 / calc(0.85 * var(--prism-frost) * var(--prism-depth, 1) * var(--prism-zone-overlay, 1)))', 'rgb(34 38 47 / calc(0.85 * var(--prism-frost) * var(--prism-depth, 1) * var(--prism-zone-overlay, 1)))'),
        '--dsw-alias-bg-module-platform': pair('rgb(255 255 255 / calc(0.8 * var(--prism-frost) * var(--prism-depth, 1) * var(--prism-zone-base, 1)))', 'rgb(34 38 47 / calc(0.8 * var(--prism-frost) * var(--prism-depth, 1) * var(--prism-zone-base, 1)))'),
        '--dsw-alias-bg-multi-select': pair('rgb(255 255 255 / calc(0.8 * var(--prism-frost) * var(--prism-depth, 1) * var(--prism-zone-card, 1)))', 'rgb(34 38 47 / calc(0.8 * var(--prism-frost) * var(--prism-depth, 1) * var(--prism-zone-card, 1)))'),
        '--dsw-alias-bg-skeleton': pair('rgb(19 45 83 / calc(0.06 * var(--prism-frost)))', 'rgb(148 180 220 / calc(0.10 * var(--prism-frost)))'),
        // Borders: accent-tinted hairlines scaled by contrast.
        '--dsw-alias-border-l1': pair('rgb(19 45 83 / calc(0.05 + 0.07 * 0.5))', 'rgb(148 180 220 / calc(0.06 + 0.08 * 0.5))'),
        '--dsw-alias-border-l2': pair('rgb(19 45 83 / calc(0.09 + 0.09 * 0.5))', 'rgb(148 180 220 / calc(0.11 + 0.10 * 0.5))'),
        '--dsw-alias-border-l2-darkmode-thin': pair('rgb(19 45 83 / calc(0.06 + 0.06 * 0.5))', 'rgb(148 180 220 / calc(0.07 + 0.07 * 0.5))'),
        '--dsw-alias-border-l3': pair('rgb(19 45 83 / calc(0.14 + 0.10 * 0.5))', 'rgb(148 180 220 / calc(0.17 + 0.11 * 0.5))'),
        '--dsw-alias-border-l4': pair('rgb(19 45 83 / calc(0.20 + 0.12 * 0.5))', 'rgb(148 180 220 / calc(0.23 + 0.12 * 0.5))'),
        '--dsw-alias-border-inverted': pair('rgb(19 45 83 / 0.06)', 'rgb(148 180 220 / calc(0.10 * var(--prism-frost)))'),
        '--dsw-alias-border-inverted2': pair('rgb(19 45 83 / 0.08)', 'rgb(148 180 220 / calc(0.12 * var(--prism-frost)))'),
        // Brand and business accents: the accent hue knob.
        '--dsw-alias-brand-primary': accentColor(),
        '--dsw-alias-brand-primary-new-colorprimary-new-color': accentColor(),
        '--dsw-alias-brand-text': pair('hsl(var(--prism-ink-light-h) var(--prism-ink-light-s) var(--prism-ink-light-l))', 'hsl(var(--prism-ink-dark-h) var(--prism-ink-dark-s) var(--prism-ink-dark-l))'),
        '--dsw-alias-brand-primary-invert': pair('#FFFFFF', '#0A0F16'),
        '--dsw-alias-state-business-primary': accentColor(),
        '--dsw-alias-state-business-tertiary': pair('hsl(var(--prism-accent-h) var(--prism-accent-s) 90%)', 'hsl(var(--prism-accent-h) var(--prism-accent-s) 22%)'),
        // Buttons.
        '--dsw-alias-button-primary-fill': accentColor(),
        '--dsw-alias-button-primary-hover': accentColor(),
        '--dsw-alias-button-primary-dimmed': pair('hsl(var(--prism-accent-h) var(--prism-accent-s) 90%)', 'hsl(var(--prism-accent-h) var(--prism-accent-s) 22%)'),
        '--dsw-alias-button-info-fill': accentColor(),
        '--dsw-alias-button-info-hover': accentColor(),
        '--dsw-alias-button-elevated-fill': pair('rgb(255 255 255 / calc(0.85 * var(--prism-frost) * var(--prism-depth, 1) * var(--prism-zone-card, 1)))', 'rgb(34 38 47 / calc(0.85 * var(--prism-frost) * var(--prism-depth, 1) * var(--prism-zone-card, 1)))'),
        '--dsw-alias-button-floating-fill': pair('rgb(255 255 255 / calc(0.85 * var(--prism-frost) * var(--prism-depth, 1) * var(--prism-zone-card, 1)))', 'rgb(34 38 47 / calc(0.85 * var(--prism-frost) * var(--prism-depth, 1) * var(--prism-zone-card, 1)))'),
        '--dsw-alias-button-floating-hover': pair('rgb(240 245 251 / calc(0.9 * var(--prism-frost) * var(--prism-depth, 1) * var(--prism-zone-card, 1)))', 'rgb(40 45 60 / calc(0.9 * var(--prism-frost) * var(--prism-depth, 1) * var(--prism-zone-card, 1)))'),
        '--dsw-alias-button-contrast-fill': pair('#26364D', '#EAF2FC'),
        '--dsw-alias-button-ghost-active-fill': pair('hsl(var(--prism-accent-h) var(--prism-accent-s) 90% / calc(0.9 * var(--prism-frost)))', 'hsl(var(--prism-accent-h) var(--prism-accent-s) 26% / calc(0.9 * var(--prism-frost)))'),
        '--dsw-alias-button-ghost-active-hover': pair('hsl(var(--prism-accent-h) var(--prism-accent-s) 92% / calc(0.9 * var(--prism-frost)))', 'hsl(var(--prism-accent-h) var(--prism-accent-s) 30% / calc(0.9 * var(--prism-frost)))'),
        '--dsw-alias-button-ghost-active-border': pair('rgb(143 163 188 / 0.8)', 'rgb(107 130 159 / 0.8)'),
        // Interaction fills.
        '--dsw-alias-interactive-bg-hover': pair('hsl(var(--prism-accent-h) var(--prism-accent-s) 55% / calc(0.08 * var(--prism-accent-a, 1)))', 'hsl(var(--prism-accent-h) var(--prism-accent-s) 65% / calc(0.10 * var(--prism-accent-a, 1)))'),
        '--dsw-alias-interactive-bg-hover-accent': pair('hsl(var(--prism-accent-h) var(--prism-accent-s) 55% / calc(0.14 * var(--prism-accent-a, 1)))', 'hsl(var(--prism-accent-h) var(--prism-accent-s) 65% / calc(0.20 * var(--prism-accent-a, 1)))'),
        '--dsw-alias-interactive-bg-active': pair('hsl(var(--prism-accent-h) var(--prism-accent-s) 55% / calc(0.20 * var(--prism-accent-a, 1)))', 'hsl(var(--prism-accent-h) var(--prism-accent-s) 65% / calc(0.26 * var(--prism-accent-a, 1)))'),
        '--dsw-alias-interactive-bg-hover-danger': pair('rgb(236 19 19 / 0.05)', 'rgb(242 90 90 / 0.14)'),
        '--dsw-alias-interactive-bg-hover-solid': pair('rgb(240 245 251 / calc(0.9 * var(--prism-frost) * var(--prism-depth, 1) * var(--prism-zone-card, 1)))', 'rgb(40 45 60 / calc(0.9 * var(--prism-frost) * var(--prism-depth, 1) * var(--prism-zone-card, 1)))'),
        // Text ink: secondary tones scale with the contrast knob.
        '--dsw-alias-label-primary': pair('hsl(var(--prism-ink-light-h) var(--prism-ink-light-s) var(--prism-ink-light-l))', 'hsl(var(--prism-ink-dark-h) var(--prism-ink-dark-s) var(--prism-ink-dark-l))'),
        '--dsw-alias-label-secondary': ink('hsl(var(--prism-ink-light-h) var(--prism-ink-light-s) var(--prism-ink-light-l))', 'rgb(120 128 140)', 'hsl(var(--prism-ink-dark-h) var(--prism-ink-dark-s) var(--prism-ink-dark-l))', 'rgb(120 128 140)', '0.45', '0.00'),
        '--dsw-alias-label-tertiary': ink('hsl(var(--prism-ink-light-h) var(--prism-ink-light-s) var(--prism-ink-light-l))', 'rgb(120 128 140)', 'hsl(var(--prism-ink-dark-h) var(--prism-ink-dark-s) var(--prism-ink-dark-l))', 'rgb(120 128 140)', '0.30', '0.00'),
        '--dsw-alias-label-caption': ink('hsl(var(--prism-ink-light-h) var(--prism-ink-light-s) var(--prism-ink-light-l))', 'rgb(120 128 140)', 'hsl(var(--prism-ink-dark-h) var(--prism-ink-dark-s) var(--prism-ink-dark-l))', 'rgb(120 128 140)', '0.20', '0.00'),
        '--dsw-alias-label-primary-dimmed': pair('#1E3556', '#D7E3F4'),
        '--dsw-alias-label-primary-bluish': pair('#2E5EB8', '#BFD6F6'),
        '--dsw-alias-label-primary-inverted': pair('#FFFFFF', '#162130'),
        '--dsw-alias-label-primary-foreground': pair('#FFFFFF', '#FFFFFF'),
        '--dsw-alias-label-dimmed': pair('rgb(201 212 226 / calc(0.5 + 0.4 * 0.5))', 'rgb(78 95 118 / calc(0.5 + 0.4 * 0.5))'),
        // Markdown / code surfaces (zone card glass).
        '--dsw-alias-markdown-code-block': pair('rgb(240 245 251 / calc(0.85 * var(--prism-frost) * var(--prism-depth, 1) * var(--prism-zone-card, 1)))', 'rgb(13 20 31 / calc(0.85 * var(--prism-frost) * var(--prism-depth, 1) * var(--prism-zone-card, 1)))'),
        '--dsw-alias-markdown-code-block-banner': pair('rgb(245 248 253 / calc(0.85 * var(--prism-frost) * var(--prism-depth, 1) * var(--prism-zone-card, 1)))', 'rgb(18 27 41 / calc(0.85 * var(--prism-frost) * var(--prism-depth, 1) * var(--prism-zone-card, 1)))'),
        '--dsw-alias-markdown-inline-code': pair('rgb(228 237 248 / calc(0.85 * var(--prism-frost) * var(--prism-depth, 1) * var(--prism-zone-card, 1)))', 'rgb(23 35 52 / calc(0.85 * var(--prism-frost) * var(--prism-depth, 1) * var(--prism-zone-card, 1)))'),
        '--dsw-alias-markdown-citation': pair('rgb(255 255 255 / calc(0.85 * var(--prism-frost) * var(--prism-depth, 1) * var(--prism-zone-card, 1)))', 'rgb(26 37 52 / calc(0.85 * var(--prism-frost) * var(--prism-depth, 1) * var(--prism-zone-card, 1)))'),
        '--dsw-alias-markdown-tag': pair('rgb(228 237 248 / calc(0.85 * var(--prism-frost) * var(--prism-depth, 1) * var(--prism-zone-card, 1)))', 'rgb(22 33 48 / calc(0.85 * var(--prism-frost) * var(--prism-depth, 1) * var(--prism-zone-card, 1)))'),
        '--dsw-alias-markdown-placeholder': pair('rgb(255 255 255 / calc(0.85 * var(--prism-frost) * var(--prism-depth, 1) * var(--prism-zone-card, 1)))', 'rgb(34 38 47 / calc(0.85 * var(--prism-frost) * var(--prism-depth, 1) * var(--prism-zone-card, 1)))'),
        '--dsw-alias-markdown-code-segment-selected': pair('#FFFFFF', '#1C2A3D'),
        '--dsw-alias-markdown-code-segment-unselected': pair('#F0F5FB', '#0F1723'),
        // Scrollbars: accent-tinted.
        '--dsw-alias-scrollbar-bg-l1': pair('hsl(var(--prism-accent-h) var(--prism-accent-s) 60% / calc(0.28 * var(--prism-accent-a, 1)))', 'hsl(var(--prism-accent-h) var(--prism-accent-s) 60% / calc(0.28 * var(--prism-accent-a, 1)))'),
        '--dsw-alias-scrollbar-bg-l2': pair('hsl(var(--prism-accent-h) var(--prism-accent-s) 55% / calc(0.4 * var(--prism-accent-a, 1)))', 'hsl(var(--prism-accent-h) var(--prism-accent-s) 60% / calc(0.36 * var(--prism-accent-a, 1)))'),
        '--dsw-alias-scrollbar-hover-l1': pair('hsl(var(--prism-accent-h) var(--prism-accent-s) 50% / calc(0.5 * var(--prism-accent-a, 1)))', 'hsl(var(--prism-accent-h) var(--prism-accent-s) 65% / calc(0.44 * var(--prism-accent-a, 1)))'),
        '--dsw-alias-scrollbar-hover-l2': pair('hsl(var(--prism-accent-h) var(--prism-accent-s) 45% / calc(0.6 * var(--prism-accent-a, 1)))', 'hsl(var(--prism-accent-h) var(--prism-accent-s) 68% / calc(0.52 * var(--prism-accent-a, 1)))'),
        // Specific surfaces: sidebar turns transparent (the column glass lives in
        // the layer stylesheet), the rest ride their zone knobs.
        '--dsw-specific-sidebar-fill': pair('transparent', 'transparent'),
        '--dsw-specific-sidebar-nav-item-active': pair('hsl(var(--prism-accent-h) var(--prism-accent-s) 92% / calc(0.9 * var(--prism-frost)))', 'hsl(var(--prism-accent-h) var(--prism-accent-s) 26% / calc(0.9 * var(--prism-frost)))'),
        '--dsw-specific-sidebar-nav-item-hover': pair('hsl(var(--prism-accent-h) var(--prism-accent-s) 94% / calc(0.7 * var(--prism-frost)))', 'hsl(var(--prism-accent-h) var(--prism-accent-s) 22% / calc(0.7 * var(--prism-frost)))'),
        '--dsw-specific-sidebar-nav-item-active-accent': accentColor(),
        '--dsw-specific-bubble': pair('rgb(255 255 255 / calc(0.9 * var(--prism-frost) * var(--prism-depth, 1) * var(--prism-zone-bubble, 1)))', 'rgb(34 38 47 / calc(0.9 * var(--prism-frost) * var(--prism-depth, 1) * var(--prism-zone-bubble, 1)))'),
        '--dsw-specific-bubble-highlight': pair('rgb(255 255 255 / calc(0.9 * var(--prism-frost) * var(--prism-depth, 1) * var(--prism-zone-bubble, 1)))', 'rgb(34 38 47 / calc(0.9 * var(--prism-frost) * var(--prism-depth, 1) * var(--prism-zone-bubble, 1)))'),
        '--dsw-specific-input-major': pair('rgb(255 255 255 / calc(0.85 * var(--prism-frost) * var(--prism-depth, 1) * var(--prism-zone-input, 1)))', 'rgb(34 38 47 / calc(0.85 * var(--prism-frost) * var(--prism-depth, 1) * var(--prism-zone-input, 1)))'),
        '--dsw-specific-login-input': pair('rgb(255 255 255 / calc(0.85 * var(--prism-frost) * var(--prism-depth, 1) * var(--prism-zone-input, 1)))', 'rgb(34 38 47 / calc(0.85 * var(--prism-frost) * var(--prism-depth, 1) * var(--prism-zone-input, 1)))'),
        '--dsw-specific-menu': pair('rgb(255 255 255 / calc(0.88 * var(--prism-frost) * var(--prism-depth, 1) * var(--prism-zone-overlay, 1)))', 'rgb(34 38 47 / calc(0.88 * var(--prism-frost) * var(--prism-depth, 1) * var(--prism-zone-overlay, 1)))'),
        '--dsw-specific-selector': pair('rgb(255 255 255 / calc(0.85 * var(--prism-frost) * var(--prism-depth, 1) * var(--prism-zone-overlay, 1)))', 'rgb(34 38 47 / calc(0.85 * var(--prism-frost) * var(--prism-depth, 1) * var(--prism-zone-overlay, 1)))'),
        '--dsw-specific-tip': pair('rgb(255 255 255 / calc(0.85 * var(--prism-frost) * var(--prism-depth, 1) * var(--prism-zone-card, 1)))', 'rgb(34 38 47 / calc(0.85 * var(--prism-frost) * var(--prism-depth, 1) * var(--prism-zone-card, 1)))'),
        // Toasts and tooltips stay readable plates.
        '--dsw-alias-toast-bg': pair('#1B3256', '#1C2A3D'),
        '--dsw-alias-tooltip-bg': pair('#13243E', '#162130'),
        // Elevation: soft blue-tinted shadows deepen with frost.
        '--dsw-shadow-lv1': pair('0 2px 4px rgb(19 45 83 / calc(0.05 + 0.05 * var(--prism-frost)))', '0 2px 4px rgb(2 6 14 / calc(0.4 + 0.1 * var(--prism-frost)))'),
        '--dsw-shadow-lv2': pair('0 4px 12px rgb(19 45 83 / calc(0.05 + 0.05 * var(--prism-frost))), 0 2px 8px rgb(19 45 83 / 0.06)', '0 4px 12px rgb(2 6 14 / calc(0.35 + 0.1 * var(--prism-frost))), 0 2px 8px rgb(2 6 14 / 0.35)'),
        '--dsw-shadow-lv3': pair('0 0 1px rgb(19 45 83 / 0.08), 0 12px 32px rgb(19 45 83 / calc(0.1 + 0.06 * var(--prism-frost)))', '0 0 1px rgb(2 6 14 / 0.6), 0 12px 32px rgb(2 6 14 / calc(0.45 + 0.1 * var(--prism-frost)))'),
    };
    return overrides;
}
//# sourceMappingURL=tokens.js.map