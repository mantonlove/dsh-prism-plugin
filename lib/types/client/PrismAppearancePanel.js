import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/**
 * Prism panel registered into the General settings section
 * (`settings.general.item`, right under Appearance): every glass knob —
 * material, blur, frost, font size/family/color, accent and backdrop hue,
 * contrast, motion, backdrop source, per-scheme rotating photo/GIF
 * wallpapers, conversation landmarks, presets, and reset. Every write goes
 * straight through to the layer (which damps it), so the skin glides live.
 * The row renders nothing while the master switch in the Plugins section is
 * off.
 */
import { useRef, useState } from 'react';
import { ColorControl, Group, PrismSlider, Segmented } from "./controls.js";
import css from './PrismAppearancePanel.module.css';
/** Localized error copy for a wallpaper rejection. */
function wallpaperErrorText(t, error) {
    switch (error.kind) {
        case 'size': return t('prism.errorSize');
        case 'read': return t('prism.errorRead');
        case 'decode': return t('prism.errorDecode');
    }
}
/**
 * Render the Prism appearance panel.
 * @param props - composed slot props.
 * @returns the General section panel.
 */
export function PrismAppearancePanel(props) {
    const { t, setMaterial, setBlur, setFrost, setBgBrightness, setFontScale, setFontChoice, setCustomFont, setZone, setInkLightColor, setInkDarkColor, setAccentColor, setBgColor, setAccentOpacity, setMotion, setBackground, setWallpaperInterval, setWallpaperLoop, pinWallpaper, setWallpaperBlur, setWallpaperFrost, pickWallpaper, clearWallpaper, applyPreset, reset, useStore, } = props;
    const enabled = useStore(s => s.enabled);
    const material = useStore(s => s.material);
    const blur = useStore(s => s.blur);
    const frost = useStore(s => s.frost);
    const bgBrightness = useStore(s => s.bgBrightness);
    const fontScale = useStore(s => s.fontScale);
    const fontChoice = useStore(s => s.fontChoice);
    const customFont = useStore(s => s.customFont);
    const zones = useStore(s => s.zones);
    const inkLightHue = useStore(s => s.inkLightHue);
    const inkLightSat = useStore(s => s.inkLightSat);
    const inkLightLight = useStore(s => s.inkLightLight);
    const inkDarkHue = useStore(s => s.inkDarkHue);
    const inkDarkSat = useStore(s => s.inkDarkSat);
    const inkDarkLight = useStore(s => s.inkDarkLight);
    const accentHue = useStore(s => s.accentHue);
    const accentSat = useStore(s => s.accentSat);
    const accentLight = useStore(s => s.accentLight);
    const bgHue = useStore(s => s.bgHue);
    const bgSat = useStore(s => s.bgSat);
    const bgLight = useStore(s => s.bgLight);
    const accentOpacity = useStore(s => s.accentOpacity);
    const motion = useStore(s => s.motion);
    const background = useStore(s => s.background);
    const wallpaperDark = useStore(s => s.wallpaperDark);
    const wallpaperLight = useStore(s => s.wallpaperLight);
    const wallpaperInterval = useStore(s => s.wallpaperInterval);
    const wallpaperLoop = useStore(s => s.wallpaperLoop);
    const wallpaperPinnedDark = useStore(s => s.wallpaperPinnedDark);
    const wallpaperPinnedLight = useStore(s => s.wallpaperPinnedLight);
    const wallpaperBlur = useStore(s => s.wallpaperBlur);
    const wallpaperFrost = useStore(s => s.wallpaperFrost);
    const dark = useStore(s => s.dark);
    const [wallpaperError, setWallpaperError] = useState(t('prism.errorNone'));
    const [managing, setManaging] = useState(false);
    const fileRef = useRef(null);
    const schemeRef = useRef('dark');
    if (!enabled)
        return null;
    const startPick = (scheme) => {
        schemeRef.current = scheme;
        fileRef.current?.click();
    };
    const onFile = async (event) => {
        const file = event.target.files?.[0];
        event.target.value = '';
        if (file === undefined)
            return;
        const error = await pickWallpaper(schemeRef.current, file);
        setWallpaperError(error === null ? t('prism.errorNone') : wallpaperErrorText(t, error));
    };
    const wallpaperRows = (scheme, urls, labelKey) => {
        const pinned = scheme === 'dark' ? wallpaperPinnedDark : wallpaperPinnedLight;
        return (_jsxs("div", { className: css.wallpaperList, children: [_jsx("span", { className: css.wallpaperScheme, children: t(labelKey) }), urls.map((url, index) => (_jsxs("div", { className: css.wallpaperRow, children: [_jsxs("button", { type: "button", className: !wallpaperLoop && pinned === index ? css.wallpaperThumbActive : css.wallpaperThumbButton, "aria-pressed": !wallpaperLoop && pinned === index, title: t('prism.wallpaperPinHint'), onClick: () => { pinWallpaper(scheme, index); }, children: [_jsx("img", { className: css.wallpaperThumb, src: url, alt: "" }), managing && (_jsx("span", { className: css.wallpaperDeleteBadge, "aria-hidden": "true", children: "\u2715" }))] }), managing && (_jsx("button", { type: "button", className: css.wallpaperDelete, onClick: () => { clearWallpaper(scheme, index); }, children: t('prism.deleteWallpaper') }))] }, `${scheme}-${String(index)}`))), _jsx("button", { type: "button", className: css.wallpaperButton, onClick: () => { startPick(scheme); }, children: t('prism.chooseImage') }), _jsx("button", { type: "button", className: css.wallpaperButton, "aria-pressed": managing, onClick: () => { setManaging(!managing); }, children: managing ? t('prism.manageDone') : t('prism.manage') })] }, scheme));
    };
    return (_jsxs("div", { className: css.panel, children: [_jsxs(Group, { title: t('prism.material'), children: [_jsx(Segmented, { label: t('prism.material'), value: material, onSelect: setMaterial, options: [
                            { id: 'clear', label: t('prism.materialClear') },
                            { id: 'frosted', label: t('prism.materialFrosted') },
                            { id: 'velvet', label: t('prism.materialVelvet') },
                        ] }), _jsx(PrismSlider, { label: t('prism.blur'), value: blur, min: 0, max: 40, step: 1, unit: "px", onChange: setBlur }), _jsx(PrismSlider, { label: t('prism.frost'), value: frost, min: 0, max: 100, step: 1, unit: "%", onChange: setFrost }), _jsx(PrismSlider, { label: t('prism.bgBrightness'), value: bgBrightness, min: 0, max: 100, step: 1, unit: "%", onChange: setBgBrightness }), _jsx("div", { className: css.hint, children: dark ? t('prism.brightnessHintDark') : t('prism.brightnessHintLight') })] }), _jsxs(Group, { title: t('prism.zones'), children: [_jsx(PrismSlider, { label: t('prism.zoneBase'), value: zones.base, min: 20, max: 100, step: 1, unit: "%", onChange: next => { setZone('base', next); } }), _jsx(PrismSlider, { label: t('prism.zoneSidebar'), value: zones.sidebar, min: 20, max: 100, step: 1, unit: "%", onChange: next => { setZone('sidebar', next); } }), _jsx(PrismSlider, { label: t('prism.zoneCard'), value: zones.card, min: 20, max: 100, step: 1, unit: "%", onChange: next => { setZone('card', next); } }), _jsx(PrismSlider, { label: t('prism.zoneInput'), value: zones.input, min: 20, max: 100, step: 1, unit: "%", onChange: next => { setZone('input', next); } }), _jsx(PrismSlider, { label: t('prism.zoneOverlay'), value: zones.overlay, min: 20, max: 100, step: 1, unit: "%", onChange: next => { setZone('overlay', next); } }), _jsx(PrismSlider, { label: t('prism.zoneBubble'), value: zones.bubble, min: 20, max: 100, step: 1, unit: "%", onChange: next => { setZone('bubble', next); } })] }), _jsxs(Group, { title: t('prism.font'), children: [_jsx(Segmented, { label: t('prism.font'), value: fontChoice, onSelect: setFontChoice, options: [
                            { id: 'system', label: t('prism.fontSystem') },
                            { id: 'rounded', label: t('prism.fontRounded') },
                            { id: 'serif', label: t('prism.fontSerif') },
                            { id: 'mono', label: t('prism.fontMono') },
                            { id: 'custom', label: t('prism.fontCustom') },
                        ] }), fontChoice === 'custom' && (_jsx("input", { className: css.customFont, type: "text", value: customFont, placeholder: t('prism.customFontPlaceholder'), onChange: event => { setCustomFont(event.target.value); } })), _jsx(PrismSlider, { label: t('prism.fontSize'), value: fontScale, min: 85, max: 120, step: 1, unit: "%", onChange: setFontScale }), _jsx(ColorControl, { label: t('prism.inkHue'), hue: inkLightHue, sat: inkLightSat, light: inkLightLight, onChange: (h, s, l) => { setInkLightColor(h, s, l); } }), _jsx(ColorControl, { label: t('prism.inkDarkHue'), hue: inkDarkHue, sat: inkDarkSat, light: inkDarkLight, onChange: (h, s, l) => { setInkDarkColor(h, s, l); } })] }), _jsxs(Group, { title: t('prism.accentHue'), children: [_jsx(ColorControl, { label: t('prism.accentHue'), hue: accentHue, sat: accentSat, light: accentLight, onChange: (h, s, l) => { setAccentColor(h, s, l); } }), _jsx(PrismSlider, { label: t('prism.accentOpacity'), value: accentOpacity, min: 0, max: 100, step: 1, unit: "%", onChange: setAccentOpacity }), _jsx("div", { className: css.hint, children: t('prism.accentHint') })] }), _jsxs(Group, { title: t('prism.background'), children: [_jsx(Segmented, { label: t('prism.background'), value: background, onSelect: setBackground, options: [
                            { id: 'aurora', label: t('prism.backgroundAurora') },
                            { id: 'wallpaper', label: t('prism.backgroundWallpaper') },
                        ] }), background === 'aurora' && (_jsxs(_Fragment, { children: [_jsx(ColorControl, { label: t('prism.bgHue'), hue: bgHue, sat: bgSat, light: bgLight, onChange: (h, s, l) => { setBgColor(h, s, l); } }), _jsx(PrismSlider, { label: t('prism.motion'), value: motion, min: 0, max: 100, step: 1, unit: "%", onChange: setMotion })] })), background === 'wallpaper' && (_jsxs(_Fragment, { children: [wallpaperRows('dark', wallpaperDark, 'prism.wallpaperDark'), wallpaperRows('light', wallpaperLight, 'prism.wallpaperLight'), _jsx("div", { className: css.hint, children: t('prism.wallpaperPinHint') }), _jsx(Segmented, { label: t('prism.wallpaperMode'), value: wallpaperLoop ? 'loop' : 'fixed', onSelect: value => { setWallpaperLoop(value === 'loop'); }, options: [
                                    { id: 'fixed', label: t('prism.wallpaperFixed') },
                                    { id: 'loop', label: t('prism.wallpaperLoop') },
                                ] }), wallpaperLoop && (_jsxs(_Fragment, { children: [_jsx(PrismSlider, { label: t('prism.wallpaperInterval'), value: wallpaperInterval, min: 5, max: 120, step: 5, unit: "s", onChange: setWallpaperInterval }), _jsx("div", { className: css.hint, children: t('prism.wallpaperIntervalHint') })] })), _jsx(PrismSlider, { label: t('prism.wallpaperBlur'), value: wallpaperBlur, min: 0, max: 100, step: 1, unit: "%", onChange: setWallpaperBlur }), _jsx(PrismSlider, { label: t('prism.wallpaperFrost'), value: wallpaperFrost, min: 0, max: 100, step: 1, unit: "%", onChange: setWallpaperFrost }), _jsx("div", { className: css.hint, children: t('prism.wallpaperHint') }), wallpaperError !== '' && _jsx("div", { className: css.error, children: wallpaperError })] }))] }), _jsx(Group, { title: t('prism.presets'), children: _jsxs("div", { className: css.presetRow, children: [_jsx("button", { type: "button", className: css.presetButton, onClick: () => { applyPreset('night'); }, children: t('prism.presetNight') }), _jsx("button", { type: "button", className: css.presetButton, onClick: () => { applyPreset('aurora'); }, children: t('prism.presetAurora') }), _jsx("button", { type: "button", className: css.presetButton, onClick: () => { applyPreset('crystal'); }, children: t('prism.presetCrystal') }), _jsx("button", { type: "button", className: css.resetButton, onClick: reset, children: t('prism.reset') })] }) }), _jsx("input", { ref: fileRef, className: css.fileInput, type: "file", accept: "image/png,image/jpeg,image/webp,image/gif,image/avif", onChange: event => { void onFile(event); } })] }));
}
//# sourceMappingURL=PrismAppearancePanel.js.map