/**
 * Prism theme-layer plugin, node half. Pure UI plugin: the empty apply exists
 * so the plugin appears in the host cordis.yml / Loader; the browser half
 * ships via exports["./client"], discovered through the package.json
 * dsh.client declaration. Every preference is a browser-local setting
 * (localStorage) — a client-only visual layer owns no host configuration.
 */
/** Host plugin body — no host-side behavior for this surface plugin. */
export function apply() { }
//# sourceMappingURL=index.js.map