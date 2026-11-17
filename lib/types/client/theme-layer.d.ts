import type { Context as ClientContext } from '@deepseek-ai/cordis';
import { type WallpaperError } from './wallpaper.ts';
import { type PrismPreset, type PrismSettings, type PrismZones } from './prism-settings.ts';
/** html attribute selecting the Prism layer (all CSS hooks are gated on it). */
export declare const PRISM_ATTRIBUTE = "data-dsh-prism";
/**
 * Owns the Prism layer lifecycle: durable settings, the token override layer,
 * the damped knob loop, the wallpaper rotation timer, and the ambient DOM.
 * Every subscription is released through ctx.effect on dispose.
 */
export declare class PrismLayer {
    private readonly ctx;
    private settings;
    private dark;
    private tokenDisposer;
    private rafId;
    private lastFrame;
    private rotateTimer;
    private readonly knobs;
    private readonly notify;
    /** Trailing-debounce timer for localStorage writes (the document can carry
     *  megabyte-sized wallpaper data URLs — persisting on every pointermove
     *  would serialize them at drag cadence and stutter the sliders). */
    private persistTimer;
    /** False until construction completes: mount() emits theme/change, whose
     *  handler notifies — the owner's sync closure must not run mid-construction. */
    private ready;
    /**
     * @param ctx - client cordis context (theme override stack + events).
     * @param notify - callback invoked after every applied settings change so
     * the settings-row stores re-sync.
     */
    constructor(ctx: ClientContext, notify: () => void);
    /** Notify the owner after construction completes (never mid-construction). */
    private signal;
    /** Persist the settings document on a trailing 300ms debounce so rapid
     *  knob gestures never serialize the (possibly multi-megabyte) document
     *  at drag cadence. */
    private persist;
    /** Flush any pending debounced write immediately.
     * @returns whether the pending document reached durable storage.
     */
    private flushPersist;
    /** Roll back a library edit whose synchronous durable write failed. */
    private rejectFailedLibraryWrite;
    /** Current enable state (the plugin card mirrors this). */
    getEnabled(): boolean;
    /** Current knob document (the settings rows mirror this). */
    getSettings(): PrismSettings;
    /** Whether the resolved palette is dark (brightness knob darkens). */
    getDark(): boolean;
    /** Resolved scheme from the theme service (falls back to the body attribute). */
    private resolveScheme;
    /** Flip the master switch: mount or tear down the whole layer. */
    setEnabled(enabled: boolean): void;
    /**
     * Merge a settings patch, clamp every numeric field, persist, then push the
     * touched knobs through the damping loop.
     * @param patch - fields to change (wallpaper lists replace whole).
     */
    update(patch: Omit<Partial<PrismSettings>, 'zones'> & {
        zones?: Partial<PrismZones>;
    }): void;
    /** Apply a complete curated preset (palette, material, depth, and motion). */
    applyPreset(preset: PrismPreset): void;
    /** Save the current appearance as a portable custom theme. Duplicate names
     *  receive a numeric suffix instead of silently replacing a saved look. */
    saveTheme(name: string): string | null;
    /** Apply one saved theme; unknown ids are harmless no-ops. */
    applyCustomTheme(id: string): void;
    /** Delete one saved theme without touching the active appearance. */
    deleteCustomTheme(id: string): void;
    /** Export the current appearance as a portable, human-readable JSON file. */
    exportTheme(): string;
    /** Import, save, and immediately apply a portable theme.
     * @returns the imported display name.
     */
    importTheme(raw: string): string;
    /** Restore only the six glass zones, leaving palette and typography intact. */
    resetZones(): void;
    /** Reset every appearance knob to the shipped defaults; saved themes and
     *  uploaded wallpapers remain available. */
    reset(): void;
    /**
     * Ingest an uploaded wallpaper file for one scheme: downscale (or GIF
     * passthrough), auto-analyze luminance, and append to the rotation list.
     * @param scheme - which palette the wallpaper belongs to.
     * @param file - the picked file.
     * @returns null on success, or a typed rejection for the settings row.
     */
    setWallpaperFromFile(scheme: 'dark' | 'light', file: File): Promise<WallpaperError | null>;
    /** Remove one scheme's wallpaper at a rotation-list index. */
    clearWallpaper(scheme: 'dark' | 'light', index: number): void;
    /** Toggle automatic rotation (on = cycle the selected images; off = pinned image). */
    setWallpaperLoop(loop: boolean): void;
    /**
     * Include or exclude one image from the automatic carousel.
     * Membership is independent of the loop switch, so a selection made while
     * the carousel is off still applies the next time it is turned on.
     * @param scheme - which palette's list to edit.
     * @param index - rotation-list index.
     * @param include - true to rotate through it, false to skip it.
     */
    setWallpaperCycle(scheme: 'dark' | 'light', index: number, include: boolean): void;
    /**
     * Include or exclude every image of one scheme at once.
     * @param scheme - which palette's list to edit.
     * @param include - true to rotate through all, false to rotate through none.
     */
    setWallpaperCycleAll(scheme: 'dark' | 'light', include: boolean): void;
    /** Pin one rotation-list image as the fixed background (stops the loop). */
    pinWallpaper(scheme: 'dark' | 'light', index: number): void;
    /** Mount every layer-owned effect. */
    private mount;
    /** Tear down every layer-owned effect (stock UI exactly). */
    private unmount;
    /** Discrete (non-damped) applications: material, fonts, backdrop source, wallpaper. */
    private applyDiscrete;
    /** The scheme's carousel membership flags (missing slots count as included). */
    private wallpaperCycle;
    /** The active index: wall-clock rotation across the selected images while
     *  looping, the pinned image otherwise (clicking a thumbnail pins it and
     *  stops the loop). Excluding every image falls back to the pinned one
     *  instead of blanking the backdrop. */
    private wallpaperIndex;
    /** Point the wallpaper layer at the active scheme's rotating image. */
    private applyWallpaperSource;
    /** Re-evaluate the rotation index exactly at the next boundary. */
    private scheduleRotation;
    /** Stop the rotation timer (unmount / wallpaper source change). */
    private stopRotation;
    /** Re-apply everything that changes with the light/dark scheme. */
    private applySchemeDependent;
    /** Push every knob through the damping loop (targets unchanged, positions glide). */
    private applyAllKnobs;
    /** Set one knob's target and start (or skip) the damping loop. */
    private applyKnob;
    /** Read the current target value for one knob. */
    private knobTarget;
    /** Write one smoothed knob value to its `--prism-*` variables. */
    private writeKnobVar;
    /** Run the shared rAF loop until every spring settles. */
    private startLoop;
    /** Stop the shared rAF loop (keeps the springs' last positions). */
    private stopLoop;
}
//# sourceMappingURL=theme-layer.d.ts.map