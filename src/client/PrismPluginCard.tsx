/**
 * Prism card registered into the Plugins settings section's configurable tab
 * (`settings.plugin.item`): the master on/off switch — name, description, and
 * one toggle, in the section's card language. Every other knob lives in the
 * General settings' appearance area, so the card stays the same shape as the
 * other plugin cards.
 */
import { IconCheckOutline16 } from '@deepseek-ai/dsh-client-ui-primitives'
import type { InjectFace, PropsLocale, PropsRuntime, PropsStore } from '@deepseek-ai/dsh-client-ui-slots'
// Type-only: pulls the `settings.plugin.item` SlotMap merge.
import type {} from '@deepseek-ai/dsh-client-ui-settings-plugins/client'
import type { NS } from './locales.ts'
import type { createPrismRowStore } from './settings-store.ts'
import css from './PrismPluginCard.module.css'

/** Injected business face: the master enable write. */
export interface PrismPluginCardInjected {
  /** Switch the glass layer on or off. */
  setEnabled: (enabled: boolean) => void
}

/** Full component props: runtime share + store share + locale seat + injected face. */
export type PrismPluginCardComponentProps =
  PropsRuntime<'settings.plugin.item'> & PropsStore<ReturnType<typeof createPrismRowStore>>
  & PropsLocale<typeof NS> & InjectFace<PrismPluginCardInjected>

/**
 * Render the Prism plugin card.
 * @param props - composed slot props.
 * @returns the card list item.
 */
export function PrismPluginCard(props: PrismPluginCardComponentProps) {
  const { t, setEnabled, useStore } = props
  const enabled = useStore(s => s.enabled)
  return (
    <li className={css.card}>
      <div className={css.head}>
        <div className={css.text}>
          <div className={css.title}>{t('prism.title')}</div>
          <div className={css.description}>{t('prism.description')}</div>
        </div>
        <button
          type="button"
          className={css.toggle}
          aria-pressed={enabled}
          onClick={() => { setEnabled(!enabled) }}
        >
          <span className={css.check}>
            {enabled && <IconCheckOutline16 />}
          </span>
          {enabled ? t('prism.enable') : t('prism.disable')}
        </button>
      </div>
    </li>
  )
}
