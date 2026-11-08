/**
 * Prism client plugin body. The official theme override stack owns visual
 * state; the General → Appearance panel owns every control, including the
 * master switch (DSH 0.2.2 removed the legacy settings.plugin.item slot).
 * Disabling Prism retracts every override and returns the stock interface.
 */
import type { Context as ClientContext } from '@deepseek-ai/cordis';
import './prism.module.css';
export declare const inject: string[];
/** Register Prism's single settings surface and its reactive state bridge. */
export declare function apply(ctx: ClientContext): void;
//# sourceMappingURL=index.d.ts.map