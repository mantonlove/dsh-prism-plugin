# Prism · 棱镜 — DSH 毛玻璃主题插件

`@deepseek-ai/dsh-client-ui-prism` 的独立发行版，面向 [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) Web GUI。仓库自带预构建产物（`lib/`），安装者无需任何构建。

## 安装

需要 DeepSeek Harness `0.1.1-rc.2` 或更高版本（web profile），从 GitHub 源码安装：

```sh
dsh plugin --profile web add github:mantonlove/dsh-prism-plugin
```

重启 `dsh web`、刷新页面，然后在 设置 → 插件 找到「棱镜」总开关卡片；全部旋钮在 设置 → 通用设置 → 外观 下方（分组默认折叠，点击标题展开）。

卸载：

```sh
dsh plugin --profile web remove dsh-client-ui-prism
```

## 特性

- 毛玻璃材质（清透 / 磨砂 / 毛绒）、模糊、全局磨砂感、六区独立透明度（主背景 / 侧边栏 / 卡片面板 / 输入框 / 菜单弹层 / 聊天气泡）
- 全范围颜色控件（Codex 风格）：色号输入 + 点击取色——主题色（同时驱动强调元素与对话地标）、背景主色调、明暗双模式文字颜色
- 弹簧阻尼滑轨、文字大小与字体、流光动效背景、明暗分槽的图片/GIF 多图轮播（固定/循环 + 管理模式）
- 总开关一键还原原生界面；设置持久化于 localStorage 并跨标签页同步

---
## 效果展示

**效果** — 主界面在不同玻璃处理下的观感（工作区侧栏、欢迎页与输入框）：

| 效果一 | 效果二 | 效果三 |
|---|---|---|
| ![效果一](assets/shot-1.jpg) | ![效果二](assets/shot-2.jpg) | ![效果三](assets/shot-3.jpg) |

**操作界面** — 外观面板：

| 材质、区域透明度、字体与颜色 | 主题色、壁纸轮播与预设 |
|---|---|
| ![材质、区域透明度、字体与颜色](assets/shot-4.jpg) | ![主题色、壁纸轮播与预设](assets/shot-5.jpg) |