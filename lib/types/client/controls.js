import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Prism settings controls: the spring-damped slider (pointer + full keyboard
 * operation, WAI-ARIA slider semantics), the hue slider, and a segmented
 * picker. The damping itself lives in the layer — the slider writes targets,
 * the skin glides — so these controls stay dumb and testable.
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import { IconChevronDownOutline14 } from '@deepseek-ai/dsh-client-ui-primitives';
import { hexToHsl, hslToHex } from "./color.js";
import css from './PrismControls.module.css';
/** Compute the value for a pointer x position inside the track bounds. */
function valueFromPointer(clientX, rect, min, max) {
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    return min + ratio * (max - min);
}
/**
 * Render one damped slider row: label, track with accent fill, draggable
 * thumb, and a numeric readout. The element is a real WAI-ARIA slider.
 * @param props - slider props.
 * @returns the slider row.
 */
export function PrismSlider({ label, value, min, max, step, unit, onChange }) {
    const trackRef = useRef(null);
    const draggingRef = useRef(false);
    const ratio = max === min ? 0 : (value - min) / (max - min);
    const commit = useCallback((clientX) => {
        const track = trackRef.current;
        if (track === null)
            return;
        const raw = valueFromPointer(clientX, track.getBoundingClientRect(), min, max);
        const stepped = Math.round(raw / step) * step;
        onChange(Math.min(max, Math.max(min, stepped)));
    }, [max, min, onChange, step]);
    const onPointerDown = useCallback((event) => {
        event.currentTarget.setPointerCapture(event.pointerId);
        draggingRef.current = true;
        commit(event.clientX);
    }, [commit]);
    const onPointerMove = useCallback((event) => {
        if (!draggingRef.current)
            return;
        commit(event.clientX);
    }, [commit]);
    const onPointerUp = useCallback((event) => {
        draggingRef.current = false;
        event.currentTarget.releasePointerCapture(event.pointerId);
    }, []);
    const onKeyDown = useCallback((event) => {
        let next;
        switch (event.key) {
            case 'ArrowLeft':
            case 'ArrowDown':
                next = value - step;
                break;
            case 'ArrowRight':
            case 'ArrowUp':
                next = value + step;
                break;
            case 'PageDown':
                next = value - step * 10;
                break;
            case 'PageUp':
                next = value + step * 10;
                break;
            case 'Home':
                next = min;
                break;
            case 'End':
                next = max;
                break;
            default:
                return;
        }
        event.preventDefault();
        onChange(Math.min(max, Math.max(min, next)));
    }, [max, min, onChange, step, value]);
    const fillStyle = { width: `${String(ratio * 100)}%` };
    const thumbStyle = { left: `${String(ratio * 100)}%` };
    return (_jsxs("div", { className: css.sliderRow, children: [_jsx("span", { className: css.sliderLabel, id: `prism-slider-label-${label}`, children: label }), _jsxs("div", { ref: trackRef, role: "slider", tabIndex: 0, className: css.sliderTrack, "aria-label": label, "aria-labelledby": `prism-slider-label-${label}`, "aria-valuemin": min, "aria-valuemax": max, "aria-valuenow": Math.round(value * 10) / 10, onPointerDown: onPointerDown, onPointerMove: onPointerMove, onPointerUp: onPointerUp, onKeyDown: onKeyDown, children: [_jsx("div", { className: css.sliderFill, style: fillStyle }), _jsx("div", { className: css.sliderThumb, style: thumbStyle })] }), unit !== undefined && unit !== '' && (_jsxs("span", { className: css.sliderReadout, children: [String(Math.round(value * 10) / 10), unit] }))] }));
}
/**
 * Render a two-or-more-button segmented picker.
 * @param props - segmented props.
 * @returns the button group.
 */
export function Segmented({ label, value, options, onSelect }) {
    return (_jsx("div", { className: css.segmented, role: "group", "aria-label": label, children: options.map(option => (_jsx("button", { type: "button", className: option.id === value ? css.segActive : css.seg, "aria-pressed": option.id === value, onClick: () => { onSelect(option.id); }, children: option.label }, option.id))) }));
}
/**
 * Render a collapsible settings group: a header toggle with an aria-expanded
 * state and the body mounted only while open.
 * @param props - group props.
 * @returns the group block.
 */
export function Group({ title, defaultOpen = false, children }) {
    const [open, setOpen] = useState(defaultOpen);
    return (_jsxs("div", { className: css.group, children: [_jsxs("button", { type: "button", className: css.groupToggle, "aria-expanded": open, onClick: () => { setOpen(!open); }, children: [_jsx("span", { className: css.groupTitle, children: title }), _jsx("span", { className: open ? css.groupChevronOpen : css.groupChevron, "aria-hidden": "true", children: _jsx(IconChevronDownOutline14, {}) })] }), open && _jsx("div", { className: css.groupBody, children: children })] }));
}
/** Hex-validity check (accepts #rgb / #rrggbb / bare 6-hex). */
function parseHexInput(raw) {
    let value = raw.trim().replace(/^#/, '');
    if (value.length === 3 && /^[0-9a-fA-F]{3}$/.test(value)) {
        value = value.split('').map(c => c + c).join('');
    }
    if (!/^[0-9a-fA-F]{6}$/.test(value))
        return null;
    return `#${value.toLowerCase()}`;
}
/**
 * Render a Codex-style full-range color control: a hex code input (type any
 * color code directly) plus the click-to-pick swatch button on the right.
 * @param props - color control props.
 * @returns the color control row.
 */
export function ColorControl({ label, hue, sat, light, onChange }) {
    const hex = hslToHex({ h: hue, s: sat, l: light });
    const [text, setText] = useState(hex);
    // Adopt external color changes (presets, reset) into the text box.
    useEffect(() => {
        setText(hex);
    }, [hex]);
    const commitText = useCallback((raw) => {
        const parsed = parseHexInput(raw);
        if (parsed === null)
            return;
        const color = hexToHsl(parsed);
        onChange(color.h, color.s, color.l);
    }, [onChange]);
    const onSwatch = useCallback((event) => {
        setText(event.target.value);
        const color = hexToHsl(event.target.value);
        onChange(color.h, color.s, color.l);
    }, [onChange]);
    const onText = useCallback((event) => {
        setText(event.target.value);
        if (parseHexInput(event.target.value) !== null)
            commitText(event.target.value);
    }, [commitText]);
    const onBlur = useCallback(() => {
        const parsed = parseHexInput(text);
        if (parsed === null) {
            setText(hex);
            return;
        }
        setText(parsed);
        commitText(parsed);
    }, [commitText, hex, text]);
    return (_jsxs("div", { className: css.colorRow, children: [_jsx("span", { className: css.sliderLabel, id: `prism-color-label-${label}`, children: label }), _jsx("input", { type: "text", className: css.colorHex, value: text, "aria-label": label, spellCheck: false, placeholder: "#rrggbb", onChange: onText, onBlur: onBlur }), _jsx("input", { type: "color", className: css.colorInput, value: hex, "aria-label": label, onChange: onSwatch })] }));
}
//# sourceMappingURL=controls.js.map