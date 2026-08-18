import type { InjectFace, PropsLocale, PropsRuntime, PropsStore } from '@deepseek-ai/dsh-client-ui-slots';
import type { NS } from './locales.ts';
import type { createPrismRowStore } from './settings-store.ts';
/** Injected business face: the master enable write. */
export interface PrismPluginCardInjected {
    /** Switch the glass layer on or off. */
    setEnabled: (enabled: boolean) => void;
}
/** Full component props: runtime share + store share + locale seat + injected face. */
export type PrismPluginCardComponentProps = PropsRuntime<'settings.plugin.item'> & PropsStore<ReturnType<typeof createPrismRowStore>> & PropsLocale<typeof NS> & InjectFace<PrismPluginCardInjected>;
/**
 * Render the Prism plugin card.
 * @param props - composed slot props.
 * @returns the card list item.
 */
export declare function PrismPluginCard(props: PrismPluginCardComponentProps): import("react").JSX.Element;
//# sourceMappingURL=PrismPluginCard.d.ts.map