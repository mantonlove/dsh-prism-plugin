import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Prism card registered into the Plugins settings section's configurable tab
 * (`settings.plugin.item`): the master on/off switch — name, description, and
 * one toggle, in the section's card language. Every other knob lives in the
 * General settings' appearance area, so the card stays the same shape as the
 * other plugin cards.
 */
import { IconCheckOutline16 } from '@deepseek-ai/dsh-client-ui-primitives';
import css from './PrismPluginCard.module.css';
/**
 * Render the Prism plugin card.
 * @param props - composed slot props.
 * @returns the card list item.
 */
export function PrismPluginCard(props) {
    const { t, setEnabled, useStore } = props;
    const enabled = useStore(s => s.enabled);
    return (_jsx("li", { className: css.card, children: _jsxs("div", { className: css.head, children: [_jsxs("div", { className: css.text, children: [_jsx("div", { className: css.title, children: t('prism.title') }), _jsx("div", { className: css.description, children: t('prism.description') })] }), _jsxs("button", { type: "button", className: css.toggle, "aria-pressed": enabled, onClick: () => { setEnabled(!enabled); }, children: [_jsx("span", { className: css.check, children: enabled && _jsx(IconCheckOutline16, {}) }), enabled ? t('prism.enable') : t('prism.disable')] })] }) }));
}
//# sourceMappingURL=PrismPluginCard.js.map