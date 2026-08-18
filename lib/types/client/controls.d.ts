/** Common slider props. */
export interface PrismSliderProps {
    /** Row label. */
    label: string;
    /** Current target value. */
    value: number;
    /** Inclusive lower bound. */
    min: number;
    /** Inclusive upper bound. */
    max: number;
    /** Keyboard / drag granularity. */
    step: number;
    /** Value suffix shown in the readout (empty hides the readout). */
    unit?: string;
    /** Called with the new target on every interaction. */
    onChange: (value: number) => void;
}
/**
 * Render one damped slider row: label, track with accent fill, draggable
 * thumb, and a numeric readout. The element is a real WAI-ARIA slider.
 * @param props - slider props.
 * @returns the slider row.
 */
export declare function PrismSlider({ label, value, min, max, step, unit, onChange }: PrismSliderProps): import("react").JSX.Element;
/** One option of a segmented picker. */
export interface SegmentedOption<T extends string> {
    id: T;
    label: string;
}
/** Segmented picker props. */
export interface SegmentedProps<T extends string> {
    /** Accessible name for the button group. */
    label: string;
    /** Selected option id. */
    value: T;
    /** Options, in display order. */
    options: ReadonlyArray<SegmentedOption<T>>;
    /** Called with the selected id. */
    onSelect: (value: T) => void;
}
/**
 * Render a two-or-more-button segmented picker.
 * @param props - segmented props.
 * @returns the button group.
 */
export declare function Segmented<T extends string>({ label, value, options, onSelect }: SegmentedProps<T>): import("react").JSX.Element;
/** Collapsible group props. */
export interface GroupProps {
    /** Group title (rendered as the toggle header). */
    title: string;
    /** Initial expanded state. */
    defaultOpen?: boolean;
    /** Group body. */
    children: React.ReactNode;
}
/**
 * Render a collapsible settings group: a header toggle with an aria-expanded
 * state and the body mounted only while open.
 * @param props - group props.
 * @returns the group block.
 */
export declare function Group({ title, defaultOpen, children }: GroupProps): import("react").JSX.Element;
/** Full-range color control props. */
export interface ColorControlProps {
    /** Row label. */
    label: string;
    /** Current hue, degrees. */
    hue: number;
    /** Current saturation, 0-100. */
    sat: number;
    /** Current lightness, 0-100. */
    light: number;
    /** Called with the new channels. */
    onChange: (hue: number, sat: number, light: number) => void;
}
/**
 * Render a Codex-style full-range color control: a hex code input (type any
 * color code directly) plus the click-to-pick swatch button on the right.
 * @param props - color control props.
 * @returns the color control row.
 */
export declare function ColorControl({ label, hue, sat, light, onChange }: ColorControlProps): import("react").JSX.Element;
//# sourceMappingURL=controls.d.ts.map