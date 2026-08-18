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

**Effects** — the glass materials, ambient backdrop, and themed conversation landmarks in action:

| Effect 1 | Effect 2 | Effect 3 |
|---|---|---|
| ![Effect 1](assets/shot-1.jpg) | ![Effect 2](assets/shot-2.jpg) | ![Effect 3](assets/shot-3.jpg) |

**Settings UI** — the appearance panel: damped sliders, color controls, and wallpaper management:

| Settings 1 | Settings 2 |
|---|---|
| ![Settings 1](assets/shot-4.jpg) | ![Settings 2](assets/shot-5.jpg) |

