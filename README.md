# Prism · 棱镜 — DSH Glassmorphism Theme Plugin

A standalone distribution of `@deepseek-ai/dsh-client-ui-prism` for [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) Web GUI. The plugin ships prebuilt (`lib/`) — installers never build anything.

## Install

Requires DeepSeek Harness `0.1.1-rc.2` or later with the web profile. From the GitHub source:

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

**Effects** — the main surface under different glass treatments (workspace sidebar, hero screen, and composer):

| Effect 1 | Effect 2 | Effect 3 |
|---|---|---|
| ![Effect 1](assets/shot-1.jpg) | ![Effect 2](assets/shot-2.jpg) | ![Effect 3](assets/shot-3.jpg) |

**Settings UI** — the appearance panel:

| Materials, zones, fonts, and colors | Theme color, wallpaper rotation, and presets |
|---|---|
| ![Materials, zones, fonts, and colors](assets/shot-4.jpg) | ![Theme color, wallpaper rotation, and presets](assets/shot-5.jpg) |