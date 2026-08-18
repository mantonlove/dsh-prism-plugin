# Prism · 棱镜 — DSH Glassmorphism Theme Plugin

A standalone distribution of `@deepseek-ai/dsh-client-ui-prism` for [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) Web GUI. The plugin ships prebuilt (`lib/`) — installers never build anything.

## Install

Requires a DeepSeek Harness with the web profile. From the GitHub source:

```sh
dsh plugin --profile web add github:mantonlove/dsh-prism-plugin
```

Restart `dsh web`, refresh the page, then open 设置 → 插件 to find the 棱镜 master card; every knob lives in 设置 → 通用设置 → 外观 (collapsed groups — click a group title to expand).

Uninstall:

```sh
dsh plugin --profile web remove dsh-client-ui-prism
```

## Features

- Frosted-glass material (clear / frosted / velvet), blur + global frost + six per-zone opacities (base / sidebar / cards / input / overlays / bubbles)
- Full-range color controls (Codex-style): hex code input + click-to-pick swatch — theme color (drives accents + conversation landmarks), backdrop hue, per-mode text colors
- Spring-damped sliders, font scale & family, animated aurora backdrop, per-scheme rotating photo/GIF wallpapers with fixed/loop playback and a manage mode
- Master toggle restores the stock UI exactly; settings persist in localStorage and sync across tabs

---
## Screenshots

| | | |
|---|---|---|
| ![Prism 1](assets/shot-1.jpg) | ![Prism 2](assets/shot-2.jpg) | ![Prism 3](assets/shot-3.jpg) |
| ![Prism 4](assets/shot-4.jpg) | ![Prism 5](assets/shot-5.jpg) | |



English | [中文](README.zh.md)

Prism: a glassmorphism theme layer for the DSH Web GUI. Every knob — blur, frost, six per-zone glass opacities, font scale and family, accent and backdrop hue, contrast, motion, and photo/GIF wallpapers — is adjustable live, and every slider is spring-damped so the skin glides instead of snapping. The layer rides the official theme override stack (`ctx.theme.overrideTokens`) and the settings slot system; switching the master toggle off (or unloading the plugin) restores the stock UI exactly.

## Knobs

| Group | Knob | Range | Notes |
|---|---|---|---|
| Glass material | 材质 preset | clear / frosted | blur + saturation recipe (frosted = blur 18px, saturate 130%) |
| Glass material | 玻璃模糊度 blur | 0–40 px | `backdrop-filter: blur() saturate()` |
| Glass material | 磨砂感 frost | 0–100 | global alpha multiplier over every glass surface |
| Zones | 区域透明度 ×6 | 20–90 % | base / sidebar / cards / input / overlays / bubbles, independently |
| Background | 背景亮度 brightness | 0–100 | 50 = off; dark mode darkens, light mode brightens |
| Background | 背景主色调 hue | 0–360 | drives the animated aurora palette |
| Background | 动效强度 motion | 0–100 | scales animation speed and glow intensity; 0 = static |
| Typography | 文字大小 font scale | 85–120 % | scales all 30 composite `--dsw-font-*` tokens via `calc()` |
| Typography | 字体 font | system / rounded / serif / mono / custom | UI and code stacks; custom accepts any family name |
| Color | 强调色 accent hue | 0–360 | derives brand, buttons, scrollbars, selection, focus rings |
| Color | 对比度 contrast | 0–100 | scales secondary ink and border strength |
| Backdrop source | 流光动效 / 自定义壁纸 | — | aurora is pure CSS (no GPU dependency); wallpaper accepts photos and animated GIFs |
| Wallpaper | per-scheme 暗色/亮色壁纸 | — | separate slots; static images auto-compress (≤1920px, JPEG), GIFs keep their animation, >12MB rejected |
| Wallpaper | 壁纸模糊 / 壁纸磨砂 | 0–40 px / 0–100 | plus an auto dim veil derived from the image's measured luminance |
| Presets | 夜航 / 极光 / 清透 / 重置 | — | one-click knob bundles |

## Design

- **One static token layer**: the derivation engine turns accent hue, contrast, frost, and the six zone opacities into the full `--dsw-alias-*` / `--dsw-specific-*` palette once; every dynamic part is a `var(--prism-*)` reference, so knob changes are single CSS-variable writes on `<html>` — the override layer is never re-applied while knobs move.
- **Damped knobs**: each numeric knob is a critically damped spring (semi-implicit Euler, substepped) advanced on one shared rAF loop. Under `prefers-reduced-motion` the springs settle instantly.
- **Zero residue**: the CSS hooks ride a `data-dsh-prism` attribute on `<html>`; the ambient aurora, wallpaper, and brightness layers are mounted and removed with the layer; token overrides return a disposer.
- **Readability guards**: auto wallpaper dimming from measured luminance, scheme-directed brightness, contrast-scaled ink, and a 1px text halo over frosted surfaces.

## Settings surfaces

- `settings.plugin.item` (id `prism`, order 6): the master on/off card in 设置 → 插件.
- `settings.general.item` (id `prism`, order 12): every knob, directly under 外观 in 设置 → 通用设置.

Settings persist in `localStorage` under `dsh.ui-prism.settings.v1` and sync across tabs through the storage event.

## Model Experience

None, as this plugin only overrides browser presentation tokens, mounts visual layers, and registers settings controls; nothing here reaches a model request.

#### KV Cache effect

None; this package neither assembles nor sends a provider request.

## Known Limitations and Deferred Work

- **Hardcoded px outside the token system** — the font-scale knob scales every composite `--dsw-font-*` token; a few component styles carry literal px sizes that do not follow the scale.
- **GIFs cannot be paused** — CSS cannot stop a GIF's internal animation, so the wallpaper layer is hidden entirely under `prefers-reduced-motion` instead of freezing.
- **Backdrop-filter cost** — blur is capped at 40px; low-end GPUs may still drop frames at high frost with a large blur.
- **localStorage quota** — wallpapers persist as data URLs; very large GIFs may exhaust the quota (uploads are capped at 12MB, and static images are auto-compressed).
