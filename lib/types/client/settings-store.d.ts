/**
 * Prism row slot stores: mirrors of the layer's settings document. The
 * plugin's apply-world change listener is the only writer; the row components
 * read via props.useStore. One store per settings surface (plugin card and
 * general appearance panel).
 */
import { type EngineStoreHandle } from '@deepseek-ai/dsh-client-runtime/client';
import type { PrismSettings } from './prism-settings.ts';
/** Store state mirrored from the Prism layer. */
export interface PrismRowState extends PrismSettings {
    /** Resolved palette is dark (brightness knob = darkening half). */
    dark: boolean;
    /** Monotonic revision; -1 until first sync so revision 0 lands as a change. */
    revision: number;
}
/** The full payload the layer pushes into the row stores on every change. */
export interface PrismSettingsPayload extends PrismSettings {
    /** Resolved palette is dark. */
    dark: boolean;
}
/** Declared action shape giving the exported factory a stable return type. */
type PrismRowActions = {
    sync: (draft: PrismRowState, next: PrismSettingsPayload, revision: number) => void;
};
/**
 * Declares the Prism row state and write surface.
 * @returns the store handle.
 */
export declare function createPrismRowStore(): EngineStoreHandle<PrismRowState, PrismRowActions>;
export {};
//# sourceMappingURL=settings-store.d.ts.map