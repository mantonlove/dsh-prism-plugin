window.__ModuleLoader__.load({
	id: "@deepseek-ai/dsh-client-ui-prism",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let _deepseek_ai_dsh_client_ui_primitives = require("@deepseek-ai/dsh-client-ui-primitives");
		let react_jsx_runtime = require("react/jsx-runtime");
		let react = require("react");
		let _deepseek_ai_dsh_client_runtime_client = require("@deepseek-ai/dsh-client-runtime/client");
		//#region \0dsh-css:/Users/manton/CC/projects/deepseek-harness/packages/client/ui-prism/src/client/PrismPluginCard.module.css.mjs
		const css$3 = ".BqZfSW_card{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);border-radius:12px;flex-direction:column;gap:6px;padding:12px;display:flex}.BqZfSW_head{justify-content:space-between;align-items:center;gap:12px;display:flex}.BqZfSW_text{min-width:0}.BqZfSW_title{color:var(--dsw-alias-label-primary);font-size:14px;font-weight:500;line-height:22px}.BqZfSW_description{color:var(--dsw-alias-label-tertiary);font-size:12px;line-height:18px}.BqZfSW_toggle{border:1px solid var(--dsw-alias-border-l3);background:var(--dsw-alias-bg-base);color:var(--dsw-alias-label-secondary);cursor:pointer;border-radius:999px;flex:none;align-items:center;gap:4px;padding:4px 10px;font-size:12px;line-height:18px;display:inline-flex}.BqZfSW_toggle:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover)}.BqZfSW_toggle:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:1px}.BqZfSW_check{color:var(--dsw-alias-state-success-primary);display:inline-flex}";
		const tagId$3 = "@deepseek-ai/dsh-client-ui-prism/PrismPluginCard.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$3) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@deepseek-ai/dsh-client-ui-prism";
			tag.dataset.pluginCss = tagId$3;
			tag.textContent = css$3;
			document.head.appendChild(tag);
		}
		var PrismPluginCard_module_css_default = {
			"description": "BqZfSW_description",
			"toggle": "BqZfSW_toggle",
			"check": "BqZfSW_check",
			"text": "BqZfSW_text",
			"card": "BqZfSW_card",
			"head": "BqZfSW_head",
			"title": "BqZfSW_title"
		};
		//#endregion
		//#region src/client/PrismPluginCard.tsx
		/**
		* Prism card registered into the Plugins settings section's configurable tab
		* (`settings.plugin.item`): the master on/off switch — name, description, and
		* one toggle, in the section's card language. Every other knob lives in the
		* General settings' appearance area, so the card stays the same shape as the
		* other plugin cards.
		*/
		/**
		* Render the Prism plugin card.
		* @param props - composed slot props.
		* @returns the card list item.
		*/
		function PrismPluginCard(props) {
			const { t, setEnabled, useStore } = props;
			const enabled = useStore((s) => s.enabled);
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("li", {
				className: PrismPluginCard_module_css_default.card,
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: PrismPluginCard_module_css_default.head,
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: PrismPluginCard_module_css_default.text,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: PrismPluginCard_module_css_default.title,
							children: t("prism.title")
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: PrismPluginCard_module_css_default.description,
							children: t("prism.description")
						})]
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
						type: "button",
						className: PrismPluginCard_module_css_default.toggle,
						"aria-pressed": enabled,
						onClick: () => {
							setEnabled(!enabled);
						},
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: PrismPluginCard_module_css_default.check,
							children: enabled && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconCheckOutline16, {})
						}), enabled ? t("prism.enable") : t("prism.disable")]
					})]
				})
			});
		}
		//#endregion
		//#region src/client/color.ts
		/** Clamp a channel into [min, max] with a fallback. */
		function clampChannel(value, min, max, fallback) {
			const n = Number(value);
			return Math.min(max, Math.max(min, Number.isFinite(n) ? n : fallback));
		}
		/**
		* Convert HSL to a `#rrggbb` hex string.
		* @param color - HSL color.
		* @returns hex string.
		*/
		function hslToHex(color) {
			const h = clampChannel(color.h, 0, 360, 0) / 360;
			const s = clampChannel(color.s, 0, 100, 0) / 100;
			const l = clampChannel(color.l, 0, 100, 50) / 100;
			const hue2rgb = (p, q, t) => {
				let tt = t;
				if (tt < 0) tt += 1;
				if (tt > 1) tt -= 1;
				if (tt < 1 / 6) return p + (q - p) * 6 * tt;
				if (tt < 1 / 2) return q;
				if (tt < 2 / 3) return p + (q - p) * (2 / 3 - tt) * 6;
				return p;
			};
			const q = l < .5 ? l * (1 + s) : l + s - l * s;
			const p = 2 * l - q;
			const channel = (t) => {
				return Math.round(hue2rgb(p, q, t) * 255).toString(16).padStart(2, "0");
			};
			return `#${channel(h + 1 / 3)}${channel(h)}${channel(h - 1 / 3)}`;
		}
		/**
		* Convert a `#rrggbb` hex string to HSL.
		* @param hex - hex string (3- or 6-digit form).
		* @returns HSL color.
		*/
		function hexToHsl(hex) {
			let value = hex.trim().replace(/^#/, "");
			if (value.length === 3) value = value.split("").map((c) => c + c).join("");
			if (!/^[0-9a-fA-F]{6}$/.test(value)) return {
				h: 0,
				s: 0,
				l: 50
			};
			const r = parseInt(value.slice(0, 2), 16) / 255;
			const g = parseInt(value.slice(2, 4), 16) / 255;
			const b = parseInt(value.slice(4, 6), 16) / 255;
			const max = Math.max(r, g, b);
			const min = Math.min(r, g, b);
			const l = (max + min) / 2;
			if (max === min) return {
				h: 0,
				s: 0,
				l: Math.round(l * 100)
			};
			const d = max - min;
			const s = l > .5 ? d / (2 - max - min) : d / (max + min);
			let h;
			if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
			else if (max === g) h = (b - r) / d + 2;
			else h = (r - g) / d + 4;
			h *= 60;
			return {
				h: Math.round(h),
				s: Math.round(s * 100),
				l: Math.round(l * 100)
			};
		}
		//#endregion
		//#region \0dsh-css:/Users/manton/CC/projects/deepseek-harness/packages/client/ui-prism/src/client/PrismControls.module.css.mjs
		const css$2 = "._7tLcGW_sliderRow{align-items:center;gap:10px;min-height:30px;display:flex}._7tLcGW_sliderLabel{width:88px;color:var(--dsw-alias-label-secondary);flex:none;font-size:13px;line-height:20px}._7tLcGW_sliderTrack{cursor:pointer;touch-action:none;outline:none;flex:auto;height:16px;position:relative}._7tLcGW_sliderTrack:focus-visible ._7tLcGW_sliderThumb{box-shadow:0 0 0 2px var(--dsw-alias-bg-base), 0 0 0 4px var(--dsw-alias-state-business-primary)}._7tLcGW_sliderTrack:before{content:\"\";background:var(--dsw-alias-border-l2);border-radius:2px;height:3px;position:absolute;top:7px;left:0;right:0}._7tLcGW_sliderFill{background:var(--dsw-alias-state-business-primary);border-radius:2px;height:3px;position:absolute;top:7px;left:0}._7tLcGW_sliderThumb{background:var(--dsw-alias-bg-base);border:2px solid var(--dsw-alias-state-business-primary);border-radius:50%;width:13px;height:13px;margin-left:-6px;position:absolute;top:2px;box-shadow:0 1px 3px #02060e40}._7tLcGW_sliderReadout{text-align:right;min-width:46px;color:var(--dsw-alias-label-tertiary);font-variant-numeric:tabular-nums;flex:none;font-size:12px;line-height:20px}._7tLcGW_segmented{background:var(--dsw-alias-bg-module-platform);border:1px solid var(--dsw-alias-border-l2);border-radius:10px;gap:4px;width:100%;padding:3px;display:flex}._7tLcGW_seg,._7tLcGW_segActive{text-align:center;cursor:pointer;min-width:0;color:var(--dsw-alias-label-secondary);background:0 0;border:none;border-radius:7px;flex:1 1 0;padding:3px 6px;font-size:12px;line-height:18px}._7tLcGW_segActive{background:var(--dsw-alias-bg-overlay);color:var(--dsw-alias-label-primary);box-shadow:inset 0 0 0 1px var(--dsw-alias-border-l3)}._7tLcGW_seg:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover)}._7tLcGW_seg:focus-visible,._7tLcGW_segActive:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:1px}._7tLcGW_group{border-top:1px solid var(--dsw-alias-border-l1)}._7tLcGW_groupToggle{cursor:pointer;text-align:left;background:0 0;border:none;justify-content:space-between;align-items:center;width:100%;padding:8px 0 4px;display:flex}._7tLcGW_groupToggle:hover:not(:disabled) ._7tLcGW_groupTitle{color:var(--dsw-alias-label-primary)}._7tLcGW_groupToggle:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:1px;border-radius:6px}._7tLcGW_groupTitle{color:var(--dsw-alias-label-primary);font-size:14px;font-weight:400;line-height:22px}._7tLcGW_groupChevron,._7tLcGW_groupChevronOpen{color:var(--dsw-alias-label-caption);transition:transform .15s var(--ds-ease-in-out);flex:none;margin-left:8px;font-size:12px;line-height:16px}._7tLcGW_groupChevronOpen{transform:rotate(180deg)}._7tLcGW_groupBody{flex-direction:column;gap:6px;padding:2px 0 8px;display:flex}._7tLcGW_colorRow{align-items:center;gap:10px;min-height:30px;display:flex}._7tLcGW_colorHex{border:1px solid var(--dsw-alias-border-l3);background:var(--dsw-alias-bg-base);width:86px;height:22px;color:var(--dsw-alias-label-primary);font-family:var(--ds-font-family-code,monospace);text-align:center;border-radius:6px;outline:none;flex:none;margin-left:auto;padding:0 8px;font-size:12px;line-height:20px}._7tLcGW_colorHex:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:1px}._7tLcGW_colorInput{border:1px solid var(--dsw-alias-border-l3);background:var(--dsw-alias-bg-base);cursor:pointer;border-radius:6px;flex:none;width:30px;height:22px;padding:0}._7tLcGW_colorInput:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:1px}";
		const tagId$2 = "@deepseek-ai/dsh-client-ui-prism/PrismControls.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$2) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@deepseek-ai/dsh-client-ui-prism";
			tag.dataset.pluginCss = tagId$2;
			tag.textContent = css$2;
			document.head.appendChild(tag);
		}
		var PrismControls_module_css_default = {
			"sliderFill": "_7tLcGW_sliderFill",
			"segmented": "_7tLcGW_segmented",
			"groupChevronOpen": "_7tLcGW_groupChevronOpen",
			"sliderTrack": "_7tLcGW_sliderTrack",
			"groupBody": "_7tLcGW_groupBody",
			"sliderRow": "_7tLcGW_sliderRow",
			"colorInput": "_7tLcGW_colorInput",
			"group": "_7tLcGW_group",
			"groupTitle": "_7tLcGW_groupTitle",
			"segActive": "_7tLcGW_segActive",
			"sliderReadout": "_7tLcGW_sliderReadout",
			"sliderThumb": "_7tLcGW_sliderThumb",
			"sliderLabel": "_7tLcGW_sliderLabel",
			"colorRow": "_7tLcGW_colorRow",
			"colorHex": "_7tLcGW_colorHex",
			"seg": "_7tLcGW_seg",
			"groupChevron": "_7tLcGW_groupChevron",
			"groupToggle": "_7tLcGW_groupToggle"
		};
		//#endregion
		//#region src/client/controls.tsx
		/**
		* Prism settings controls: the spring-damped slider (pointer + full keyboard
		* operation, WAI-ARIA slider semantics), the hue slider, and a segmented
		* picker. The damping itself lives in the layer — the slider writes targets,
		* the skin glides — so these controls stay dumb and testable.
		*/
		/** Compute the value for a pointer x position inside the track bounds. */
		function valueFromPointer(clientX, rect, min, max) {
			return min + Math.min(1, Math.max(0, (clientX - rect.left) / rect.width)) * (max - min);
		}
		/**
		* Render one damped slider row: label, track with accent fill, draggable
		* thumb, and a numeric readout. The element is a real WAI-ARIA slider.
		* @param props - slider props.
		* @returns the slider row.
		*/
		function PrismSlider({ label, value, min, max, step, unit, onChange }) {
			const trackRef = (0, react.useRef)(null);
			const draggingRef = (0, react.useRef)(false);
			const ratio = max === min ? 0 : (value - min) / (max - min);
			const commit = (0, react.useCallback)((clientX) => {
				const track = trackRef.current;
				if (track === null) return;
				const raw = valueFromPointer(clientX, track.getBoundingClientRect(), min, max);
				const stepped = Math.round(raw / step) * step;
				onChange(Math.min(max, Math.max(min, stepped)));
			}, [
				max,
				min,
				onChange,
				step
			]);
			const onPointerDown = (0, react.useCallback)((event) => {
				event.currentTarget.setPointerCapture(event.pointerId);
				draggingRef.current = true;
				commit(event.clientX);
			}, [commit]);
			const onPointerMove = (0, react.useCallback)((event) => {
				if (!draggingRef.current) return;
				commit(event.clientX);
			}, [commit]);
			const onPointerUp = (0, react.useCallback)((event) => {
				draggingRef.current = false;
				event.currentTarget.releasePointerCapture(event.pointerId);
			}, []);
			const onKeyDown = (0, react.useCallback)((event) => {
				let next;
				switch (event.key) {
					case "ArrowLeft":
					case "ArrowDown":
						next = value - step;
						break;
					case "ArrowRight":
					case "ArrowUp":
						next = value + step;
						break;
					case "PageDown":
						next = value - step * 10;
						break;
					case "PageUp":
						next = value + step * 10;
						break;
					case "Home":
						next = min;
						break;
					case "End":
						next = max;
						break;
					default: return;
				}
				event.preventDefault();
				onChange(Math.min(max, Math.max(min, next)));
			}, [
				max,
				min,
				onChange,
				step,
				value
			]);
			const fillStyle = { width: `${String(ratio * 100)}%` };
			const thumbStyle = { left: `${String(ratio * 100)}%` };
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: PrismControls_module_css_default.sliderRow,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: PrismControls_module_css_default.sliderLabel,
						id: `prism-slider-label-${label}`,
						children: label
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						ref: trackRef,
						role: "slider",
						tabIndex: 0,
						className: PrismControls_module_css_default.sliderTrack,
						"aria-label": label,
						"aria-labelledby": `prism-slider-label-${label}`,
						"aria-valuemin": min,
						"aria-valuemax": max,
						"aria-valuenow": Math.round(value * 10) / 10,
						onPointerDown,
						onPointerMove,
						onPointerUp,
						onKeyDown,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: PrismControls_module_css_default.sliderFill,
							style: fillStyle
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: PrismControls_module_css_default.sliderThumb,
							style: thumbStyle
						})]
					}),
					unit !== void 0 && unit !== "" && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
						className: PrismControls_module_css_default.sliderReadout,
						children: [String(Math.round(value * 10) / 10), unit]
					})
				]
			});
		}
		/**
		* Render a two-or-more-button segmented picker.
		* @param props - segmented props.
		* @returns the button group.
		*/
		function Segmented({ label, value, options, onSelect }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: PrismControls_module_css_default.segmented,
				role: "group",
				"aria-label": label,
				children: options.map((option) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
					type: "button",
					className: option.id === value ? PrismControls_module_css_default.segActive : PrismControls_module_css_default.seg,
					"aria-pressed": option.id === value,
					onClick: () => {
						onSelect(option.id);
					},
					children: option.label
				}, option.id))
			});
		}
		/**
		* Render a collapsible settings group: a header toggle with an aria-expanded
		* state and the body mounted only while open.
		* @param props - group props.
		* @returns the group block.
		*/
		function Group({ title, defaultOpen = false, children }) {
			const [open, setOpen] = (0, react.useState)(defaultOpen);
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: PrismControls_module_css_default.group,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
					type: "button",
					className: PrismControls_module_css_default.groupToggle,
					"aria-expanded": open,
					onClick: () => {
						setOpen(!open);
					},
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: PrismControls_module_css_default.groupTitle,
						children: title
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: open ? PrismControls_module_css_default.groupChevronOpen : PrismControls_module_css_default.groupChevron,
						"aria-hidden": "true",
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconChevronDownOutline14, {})
					})]
				}), open && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: PrismControls_module_css_default.groupBody,
					children
				})]
			});
		}
		/** Hex-validity check (accepts #rgb / #rrggbb / bare 6-hex). */
		function parseHexInput(raw) {
			let value = raw.trim().replace(/^#/, "");
			if (value.length === 3 && /^[0-9a-fA-F]{3}$/.test(value)) value = value.split("").map((c) => c + c).join("");
			if (!/^[0-9a-fA-F]{6}$/.test(value)) return null;
			return `#${value.toLowerCase()}`;
		}
		/**
		* Render a Codex-style full-range color control: a hex code input (type any
		* color code directly) plus the click-to-pick swatch button on the right.
		* @param props - color control props.
		* @returns the color control row.
		*/
		function ColorControl({ label, hue, sat, light, onChange }) {
			const hex = hslToHex({
				h: hue,
				s: sat,
				l: light
			});
			const [text, setText] = (0, react.useState)(hex);
			(0, react.useEffect)(() => {
				setText(hex);
			}, [hex]);
			const commitText = (0, react.useCallback)((raw) => {
				const parsed = parseHexInput(raw);
				if (parsed === null) return;
				const color = hexToHsl(parsed);
				onChange(color.h, color.s, color.l);
			}, [onChange]);
			const onSwatch = (0, react.useCallback)((event) => {
				setText(event.target.value);
				const color = hexToHsl(event.target.value);
				onChange(color.h, color.s, color.l);
			}, [onChange]);
			const onText = (0, react.useCallback)((event) => {
				setText(event.target.value);
				if (parseHexInput(event.target.value) !== null) commitText(event.target.value);
			}, [commitText]);
			const onBlur = (0, react.useCallback)(() => {
				const parsed = parseHexInput(text);
				if (parsed === null) {
					setText(hex);
					return;
				}
				setText(parsed);
				commitText(parsed);
			}, [
				commitText,
				hex,
				text
			]);
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: PrismControls_module_css_default.colorRow,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: PrismControls_module_css_default.sliderLabel,
						id: `prism-color-label-${label}`,
						children: label
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
						type: "text",
						className: PrismControls_module_css_default.colorHex,
						value: text,
						"aria-label": label,
						spellCheck: false,
						placeholder: "#rrggbb",
						onChange: onText,
						onBlur
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
						type: "color",
						className: PrismControls_module_css_default.colorInput,
						value: hex,
						"aria-label": label,
						onChange: onSwatch
					})
				]
			});
		}
		//#endregion
		//#region \0dsh-css:/Users/manton/CC/projects/deepseek-harness/packages/client/ui-prism/src/client/PrismAppearancePanel.module.css.mjs
		const css$1 = ".IgAZYG_panel{flex-direction:column;gap:6px;padding:10px 0 4px;display:flex}.IgAZYG_caption{color:var(--dsw-alias-label-tertiary);letter-spacing:.04em;text-transform:uppercase;margin:8px 0 2px;font-size:11px;font-weight:500;line-height:16px}.IgAZYG_hint{color:var(--dsw-alias-label-caption);font-size:11px;line-height:16px}.IgAZYG_error{color:var(--dsw-alias-state-error-primary);font-size:11px;line-height:16px}.IgAZYG_customFont{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-base);color:var(--dsw-alias-label-primary);border-radius:8px;outline:none;padding:6px 10px;font-size:13px;line-height:20px}.IgAZYG_customFont:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:1px}.IgAZYG_wallpaperRow{flex-wrap:wrap;align-items:center;gap:8px;display:flex}.IgAZYG_wallpaperButton,.IgAZYG_wallpaperDelete,.IgAZYG_presetButton,.IgAZYG_resetButton{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-base);color:var(--dsw-alias-label-secondary);cursor:pointer;border-radius:8px;padding:4px 10px;font-size:12px;line-height:18px}.IgAZYG_wallpaperButton:hover:not(:disabled),.IgAZYG_wallpaperDelete:hover:not(:disabled),.IgAZYG_presetButton:hover:not(:disabled),.IgAZYG_resetButton:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}.IgAZYG_wallpaperButton:focus-visible,.IgAZYG_wallpaperDelete:focus-visible,.IgAZYG_presetButton:focus-visible,.IgAZYG_resetButton:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:1px}.IgAZYG_wallpaperDelete{color:var(--dsw-alias-state-error-primary)}.IgAZYG_wallpaperThumb{object-fit:cover;border-radius:6px;width:72px;height:40px}.IgAZYG_wallpaperThumbButton,.IgAZYG_wallpaperThumbActive{cursor:pointer;background:0 0;border:none;border-radius:6px;padding:0;position:relative}.IgAZYG_wallpaperDeleteBadge{color:#fff;pointer-events:none;background:#00000073;border-radius:6px;place-items:center;font-size:14px;font-weight:700;display:grid;position:absolute;inset:0}.IgAZYG_wallpaperThumbButton{border:1px solid var(--dsw-alias-border-l3)}.IgAZYG_wallpaperThumbActive{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:1px;border:1px solid var(--dsw-alias-border-l3)}.IgAZYG_wallpaperThumbButton:focus-visible,.IgAZYG_wallpaperThumbActive:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:1px}.IgAZYG_presetRow{gap:6px;width:100%;display:flex}.IgAZYG_presetRow .IgAZYG_presetButton,.IgAZYG_presetRow .IgAZYG_resetButton{text-align:center;flex:1 1 0;min-width:0}.IgAZYG_resetButton{color:var(--dsw-alias-state-warn-label)}.IgAZYG_fileInput{display:none}.IgAZYG_wallpaperList{flex-wrap:wrap;align-items:center;gap:8px;display:flex}.IgAZYG_wallpaperScheme{color:var(--dsw-alias-label-secondary);flex-basis:100%;font-size:12px;line-height:18px}.IgAZYG_wallpaperRow{flex:none;margin:0}";
		const tagId$1 = "@deepseek-ai/dsh-client-ui-prism/PrismAppearancePanel.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$1) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@deepseek-ai/dsh-client-ui-prism";
			tag.dataset.pluginCss = tagId$1;
			tag.textContent = css$1;
			document.head.appendChild(tag);
		}
		var PrismAppearancePanel_module_css_default = {
			"error": "IgAZYG_error",
			"wallpaperDelete": "IgAZYG_wallpaperDelete",
			"fileInput": "IgAZYG_fileInput",
			"hint": "IgAZYG_hint",
			"wallpaperButton": "IgAZYG_wallpaperButton",
			"customFont": "IgAZYG_customFont",
			"wallpaperThumbButton": "IgAZYG_wallpaperThumbButton",
			"presetButton": "IgAZYG_presetButton",
			"presetRow": "IgAZYG_presetRow",
			"wallpaperList": "IgAZYG_wallpaperList",
			"wallpaperRow": "IgAZYG_wallpaperRow",
			"resetButton": "IgAZYG_resetButton",
			"wallpaperDeleteBadge": "IgAZYG_wallpaperDeleteBadge",
			"wallpaperScheme": "IgAZYG_wallpaperScheme",
			"wallpaperThumbActive": "IgAZYG_wallpaperThumbActive",
			"caption": "IgAZYG_caption",
			"wallpaperThumb": "IgAZYG_wallpaperThumb",
			"panel": "IgAZYG_panel"
		};
		//#endregion
		//#region src/client/PrismAppearancePanel.tsx
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
		/** Localized error copy for a wallpaper rejection. */
		function wallpaperErrorText(t, error) {
			switch (error.kind) {
				case "size": return t("prism.errorSize");
				case "read": return t("prism.errorRead");
				case "decode": return t("prism.errorDecode");
			}
		}
		/**
		* Render the Prism appearance panel.
		* @param props - composed slot props.
		* @returns the General section panel.
		*/
		function PrismAppearancePanel(props) {
			const { t, setMaterial, setBlur, setFrost, setBgBrightness, setFontScale, setFontChoice, setCustomFont, setZone, setInkLightColor, setInkDarkColor, setAccentColor, setBgColor, setAccentOpacity, setMotion, setBackground, setWallpaperInterval, setWallpaperLoop, pinWallpaper, setWallpaperBlur, setWallpaperFrost, pickWallpaper, clearWallpaper, applyPreset, reset, useStore } = props;
			const enabled = useStore((s) => s.enabled);
			const material = useStore((s) => s.material);
			const blur = useStore((s) => s.blur);
			const frost = useStore((s) => s.frost);
			const bgBrightness = useStore((s) => s.bgBrightness);
			const fontScale = useStore((s) => s.fontScale);
			const fontChoice = useStore((s) => s.fontChoice);
			const customFont = useStore((s) => s.customFont);
			const zones = useStore((s) => s.zones);
			const inkLightHue = useStore((s) => s.inkLightHue);
			const inkLightSat = useStore((s) => s.inkLightSat);
			const inkLightLight = useStore((s) => s.inkLightLight);
			const inkDarkHue = useStore((s) => s.inkDarkHue);
			const inkDarkSat = useStore((s) => s.inkDarkSat);
			const inkDarkLight = useStore((s) => s.inkDarkLight);
			const accentHue = useStore((s) => s.accentHue);
			const accentSat = useStore((s) => s.accentSat);
			const accentLight = useStore((s) => s.accentLight);
			const bgHue = useStore((s) => s.bgHue);
			const bgSat = useStore((s) => s.bgSat);
			const bgLight = useStore((s) => s.bgLight);
			const accentOpacity = useStore((s) => s.accentOpacity);
			const motion = useStore((s) => s.motion);
			const background = useStore((s) => s.background);
			const wallpaperDark = useStore((s) => s.wallpaperDark);
			const wallpaperLight = useStore((s) => s.wallpaperLight);
			const wallpaperInterval = useStore((s) => s.wallpaperInterval);
			const wallpaperLoop = useStore((s) => s.wallpaperLoop);
			const wallpaperPinnedDark = useStore((s) => s.wallpaperPinnedDark);
			const wallpaperPinnedLight = useStore((s) => s.wallpaperPinnedLight);
			const wallpaperBlur = useStore((s) => s.wallpaperBlur);
			const wallpaperFrost = useStore((s) => s.wallpaperFrost);
			const dark = useStore((s) => s.dark);
			const [wallpaperError, setWallpaperError] = (0, react.useState)(t("prism.errorNone"));
			const [managing, setManaging] = (0, react.useState)(false);
			const fileRef = (0, react.useRef)(null);
			const schemeRef = (0, react.useRef)("dark");
			if (!enabled) return null;
			const startPick = (scheme) => {
				schemeRef.current = scheme;
				fileRef.current?.click();
			};
			const onFile = async (event) => {
				const file = event.target.files?.[0];
				event.target.value = "";
				if (file === void 0) return;
				const error = await pickWallpaper(schemeRef.current, file);
				setWallpaperError(error === null ? t("prism.errorNone") : wallpaperErrorText(t, error));
			};
			const wallpaperRows = (scheme, urls, labelKey) => {
				const pinned = scheme === "dark" ? wallpaperPinnedDark : wallpaperPinnedLight;
				return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: PrismAppearancePanel_module_css_default.wallpaperList,
					children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: PrismAppearancePanel_module_css_default.wallpaperScheme,
							children: t(labelKey)
						}),
						urls.map((url, index) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: PrismAppearancePanel_module_css_default.wallpaperRow,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
								type: "button",
								className: !wallpaperLoop && pinned === index ? PrismAppearancePanel_module_css_default.wallpaperThumbActive : PrismAppearancePanel_module_css_default.wallpaperThumbButton,
								"aria-pressed": !wallpaperLoop && pinned === index,
								title: t("prism.wallpaperPinHint"),
								onClick: () => {
									pinWallpaper(scheme, index);
								},
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("img", {
									className: PrismAppearancePanel_module_css_default.wallpaperThumb,
									src: url,
									alt: ""
								}), managing && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: PrismAppearancePanel_module_css_default.wallpaperDeleteBadge,
									"aria-hidden": "true",
									children: "✕"
								})]
							}), managing && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
								type: "button",
								className: PrismAppearancePanel_module_css_default.wallpaperDelete,
								onClick: () => {
									clearWallpaper(scheme, index);
								},
								children: t("prism.deleteWallpaper")
							})]
						}, `${scheme}-${String(index)}`)),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
							type: "button",
							className: PrismAppearancePanel_module_css_default.wallpaperButton,
							onClick: () => {
								startPick(scheme);
							},
							children: t("prism.chooseImage")
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
							type: "button",
							className: PrismAppearancePanel_module_css_default.wallpaperButton,
							"aria-pressed": managing,
							onClick: () => {
								setManaging(!managing);
							},
							children: managing ? t("prism.manageDone") : t("prism.manage")
						})
					]
				}, scheme);
			};
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: PrismAppearancePanel_module_css_default.panel,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(Group, {
						title: t("prism.material"),
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Segmented, {
								label: t("prism.material"),
								value: material,
								onSelect: setMaterial,
								options: [
									{
										id: "clear",
										label: t("prism.materialClear")
									},
									{
										id: "frosted",
										label: t("prism.materialFrosted")
									},
									{
										id: "velvet",
										label: t("prism.materialVelvet")
									}
								]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(PrismSlider, {
								label: t("prism.blur"),
								value: blur,
								min: 0,
								max: 40,
								step: 1,
								unit: "px",
								onChange: setBlur
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(PrismSlider, {
								label: t("prism.frost"),
								value: frost,
								min: 0,
								max: 100,
								step: 1,
								unit: "%",
								onChange: setFrost
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(PrismSlider, {
								label: t("prism.bgBrightness"),
								value: bgBrightness,
								min: 0,
								max: 100,
								step: 1,
								unit: "%",
								onChange: setBgBrightness
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: PrismAppearancePanel_module_css_default.hint,
								children: dark ? t("prism.brightnessHintDark") : t("prism.brightnessHintLight")
							})
						]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(Group, {
						title: t("prism.zones"),
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(PrismSlider, {
								label: t("prism.zoneBase"),
								value: zones.base,
								min: 20,
								max: 100,
								step: 1,
								unit: "%",
								onChange: (next) => {
									setZone("base", next);
								}
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(PrismSlider, {
								label: t("prism.zoneSidebar"),
								value: zones.sidebar,
								min: 20,
								max: 100,
								step: 1,
								unit: "%",
								onChange: (next) => {
									setZone("sidebar", next);
								}
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(PrismSlider, {
								label: t("prism.zoneCard"),
								value: zones.card,
								min: 20,
								max: 100,
								step: 1,
								unit: "%",
								onChange: (next) => {
									setZone("card", next);
								}
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(PrismSlider, {
								label: t("prism.zoneInput"),
								value: zones.input,
								min: 20,
								max: 100,
								step: 1,
								unit: "%",
								onChange: (next) => {
									setZone("input", next);
								}
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(PrismSlider, {
								label: t("prism.zoneOverlay"),
								value: zones.overlay,
								min: 20,
								max: 100,
								step: 1,
								unit: "%",
								onChange: (next) => {
									setZone("overlay", next);
								}
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(PrismSlider, {
								label: t("prism.zoneBubble"),
								value: zones.bubble,
								min: 20,
								max: 100,
								step: 1,
								unit: "%",
								onChange: (next) => {
									setZone("bubble", next);
								}
							})
						]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(Group, {
						title: t("prism.font"),
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Segmented, {
								label: t("prism.font"),
								value: fontChoice,
								onSelect: setFontChoice,
								options: [
									{
										id: "system",
										label: t("prism.fontSystem")
									},
									{
										id: "rounded",
										label: t("prism.fontRounded")
									},
									{
										id: "serif",
										label: t("prism.fontSerif")
									},
									{
										id: "mono",
										label: t("prism.fontMono")
									},
									{
										id: "custom",
										label: t("prism.fontCustom")
									}
								]
							}),
							fontChoice === "custom" && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
								className: PrismAppearancePanel_module_css_default.customFont,
								type: "text",
								value: customFont,
								placeholder: t("prism.customFontPlaceholder"),
								onChange: (event) => {
									setCustomFont(event.target.value);
								}
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(PrismSlider, {
								label: t("prism.fontSize"),
								value: fontScale,
								min: 85,
								max: 120,
								step: 1,
								unit: "%",
								onChange: setFontScale
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(ColorControl, {
								label: t("prism.inkHue"),
								hue: inkLightHue,
								sat: inkLightSat,
								light: inkLightLight,
								onChange: (h, s, l) => {
									setInkLightColor(h, s, l);
								}
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(ColorControl, {
								label: t("prism.inkDarkHue"),
								hue: inkDarkHue,
								sat: inkDarkSat,
								light: inkDarkLight,
								onChange: (h, s, l) => {
									setInkDarkColor(h, s, l);
								}
							})
						]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(Group, {
						title: t("prism.accentHue"),
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(ColorControl, {
								label: t("prism.accentHue"),
								hue: accentHue,
								sat: accentSat,
								light: accentLight,
								onChange: (h, s, l) => {
									setAccentColor(h, s, l);
								}
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(PrismSlider, {
								label: t("prism.accentOpacity"),
								value: accentOpacity,
								min: 0,
								max: 100,
								step: 1,
								unit: "%",
								onChange: setAccentOpacity
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: PrismAppearancePanel_module_css_default.hint,
								children: t("prism.accentHint")
							})
						]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(Group, {
						title: t("prism.background"),
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Segmented, {
								label: t("prism.background"),
								value: background,
								onSelect: setBackground,
								options: [{
									id: "aurora",
									label: t("prism.backgroundAurora")
								}, {
									id: "wallpaper",
									label: t("prism.backgroundWallpaper")
								}]
							}),
							background === "aurora" && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(ColorControl, {
								label: t("prism.bgHue"),
								hue: bgHue,
								sat: bgSat,
								light: bgLight,
								onChange: (h, s, l) => {
									setBgColor(h, s, l);
								}
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(PrismSlider, {
								label: t("prism.motion"),
								value: motion,
								min: 0,
								max: 100,
								step: 1,
								unit: "%",
								onChange: setMotion
							})] }),
							background === "wallpaper" && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
								wallpaperRows("dark", wallpaperDark, "prism.wallpaperDark"),
								wallpaperRows("light", wallpaperLight, "prism.wallpaperLight"),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
									className: PrismAppearancePanel_module_css_default.hint,
									children: t("prism.wallpaperPinHint")
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Segmented, {
									label: t("prism.wallpaperMode"),
									value: wallpaperLoop ? "loop" : "fixed",
									onSelect: (value) => {
										setWallpaperLoop(value === "loop");
									},
									options: [{
										id: "fixed",
										label: t("prism.wallpaperFixed")
									}, {
										id: "loop",
										label: t("prism.wallpaperLoop")
									}]
								}),
								wallpaperLoop && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(PrismSlider, {
									label: t("prism.wallpaperInterval"),
									value: wallpaperInterval,
									min: 5,
									max: 120,
									step: 5,
									unit: "s",
									onChange: setWallpaperInterval
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
									className: PrismAppearancePanel_module_css_default.hint,
									children: t("prism.wallpaperIntervalHint")
								})] }),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)(PrismSlider, {
									label: t("prism.wallpaperBlur"),
									value: wallpaperBlur,
									min: 0,
									max: 100,
									step: 1,
									unit: "%",
									onChange: setWallpaperBlur
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)(PrismSlider, {
									label: t("prism.wallpaperFrost"),
									value: wallpaperFrost,
									min: 0,
									max: 100,
									step: 1,
									unit: "%",
									onChange: setWallpaperFrost
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
									className: PrismAppearancePanel_module_css_default.hint,
									children: t("prism.wallpaperHint")
								}),
								wallpaperError !== "" && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
									className: PrismAppearancePanel_module_css_default.error,
									children: wallpaperError
								})
							] })
						]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Group, {
						title: t("prism.presets"),
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: PrismAppearancePanel_module_css_default.presetRow,
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
									type: "button",
									className: PrismAppearancePanel_module_css_default.presetButton,
									onClick: () => {
										applyPreset("night");
									},
									children: t("prism.presetNight")
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
									type: "button",
									className: PrismAppearancePanel_module_css_default.presetButton,
									onClick: () => {
										applyPreset("aurora");
									},
									children: t("prism.presetAurora")
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
									type: "button",
									className: PrismAppearancePanel_module_css_default.presetButton,
									onClick: () => {
										applyPreset("crystal");
									},
									children: t("prism.presetCrystal")
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
									type: "button",
									className: PrismAppearancePanel_module_css_default.resetButton,
									onClick: reset,
									children: t("prism.reset")
								})
							]
						})
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
						ref: fileRef,
						className: PrismAppearancePanel_module_css_default.fileInput,
						type: "file",
						accept: "image/png,image/jpeg,image/webp,image/gif,image/avif",
						onChange: (event) => {
							onFile(event);
						}
					})
				]
			});
		}
		//#endregion
		//#region src/client/settings-store.ts
		/**
		* Prism row slot stores: mirrors of the layer's settings document. The
		* plugin's apply-world change listener is the only writer; the row components
		* read via props.useStore. One store per settings surface (plugin card and
		* general appearance panel).
		*/
		/** The layer's first-seen state (before the first sync). */
		function initialState() {
			return {
				enabled: true,
				material: "frosted",
				blur: 18,
				frost: 50,
				zones: {
					base: 100,
					sidebar: 100,
					card: 100,
					input: 100,
					overlay: 100,
					bubble: 100
				},
				bgBrightness: 50,
				fontScale: 100,
				fontChoice: "system",
				customFont: "",
				inkLightHue: 222,
				inkLightSat: 30,
				inkLightLight: 12,
				inkDarkHue: 222,
				inkDarkSat: 30,
				inkDarkLight: 92,
				accentHue: 205,
				accentSat: 85,
				accentLight: 55,
				bgHue: 215,
				bgSat: 80,
				bgLight: 60,
				accentOpacity: 100,
				motion: 55,
				background: "aurora",
				wallpaperDark: [],
				wallpaperLight: [],
				wallpaperDimDark: [],
				wallpaperDimLight: [],
				wallpaperInterval: 30,
				wallpaperLoop: false,
				wallpaperPinnedDark: 0,
				wallpaperPinnedLight: 0,
				wallpaperBlur: 20,
				wallpaperFrost: 0,
				dark: false,
				revision: -1
			};
		}
		/**
		* Declares the Prism row state and write surface.
		* @returns the store handle.
		*/
		function createPrismRowStore() {
			return (0, _deepseek_ai_dsh_client_runtime_client.defineStore)({
				init: initialState,
				actions: { sync: (draft, next, revision) => {
					if (revision <= draft.revision) return;
					draft.enabled = next.enabled;
					draft.material = next.material;
					draft.blur = next.blur;
					draft.frost = next.frost;
					draft.zones = { ...next.zones };
					draft.bgBrightness = next.bgBrightness;
					draft.fontScale = next.fontScale;
					draft.fontChoice = next.fontChoice;
					draft.customFont = next.customFont;
					draft.inkLightHue = next.inkLightHue;
					draft.inkLightSat = next.inkLightSat;
					draft.inkLightLight = next.inkLightLight;
					draft.inkDarkHue = next.inkDarkHue;
					draft.inkDarkSat = next.inkDarkSat;
					draft.inkDarkLight = next.inkDarkLight;
					draft.accentHue = next.accentHue;
					draft.accentSat = next.accentSat;
					draft.accentLight = next.accentLight;
					draft.bgHue = next.bgHue;
					draft.bgSat = next.bgSat;
					draft.bgLight = next.bgLight;
					draft.accentOpacity = next.accentOpacity;
					draft.motion = next.motion;
					draft.background = next.background;
					draft.wallpaperDark = [...next.wallpaperDark];
					draft.wallpaperLight = [...next.wallpaperLight];
					draft.wallpaperDimDark = [...next.wallpaperDimDark];
					draft.wallpaperDimLight = [...next.wallpaperDimLight];
					draft.wallpaperInterval = next.wallpaperInterval;
					draft.wallpaperLoop = next.wallpaperLoop;
					draft.wallpaperPinnedDark = next.wallpaperPinnedDark;
					draft.wallpaperPinnedLight = next.wallpaperPinnedLight;
					draft.wallpaperBlur = next.wallpaperBlur;
					draft.wallpaperFrost = next.wallpaperFrost;
					draft.dark = next.dark;
					draft.revision = revision;
				} }
			});
		}
		//#endregion
		//#region src/client/locales.ts
		/** `settings.prism` namespace dictionaries (the settings-row copy). */
		/** Dictionary namespace owned by this plugin. */
		const NS = "settings.prism";
		/** Simplified Chinese dictionary (the key-set source of truth). */
		const zh = {
			"prism.title": "棱镜",
			"prism.description": "全局毛玻璃质感：材质、模糊、磨砂、文字、颜色、动效、多图轮播壁纸与对话地标全部可调，滑轨带阻尼手感",
			"prism.enable": "开启",
			"prism.disable": "关闭",
			"prism.material": "材质",
			"prism.materialClear": "清透",
			"prism.materialFrosted": "磨砂",
			"prism.materialVelvet": "毛绒",
			"prism.blur": "玻璃模糊度",
			"prism.frost": "磨砂感",
			"prism.zones": "区域透明度",
			"prism.zoneBase": "主背景",
			"prism.zoneSidebar": "侧边栏",
			"prism.zoneCard": "卡片面板",
			"prism.zoneInput": "输入框",
			"prism.zoneOverlay": "菜单弹层",
			"prism.zoneBubble": "聊天气泡",
			"prism.bgBrightness": "背景亮度",
			"prism.fontSize": "文字大小",
			"prism.font": "字体",
			"prism.fontSystem": "系统默认",
			"prism.fontRounded": "圆润黑体",
			"prism.fontSerif": "衬线",
			"prism.fontMono": "等宽",
			"prism.fontCustom": "自定义",
			"prism.customFontPlaceholder": "输入字体名，如 LXGW WenKai",
			"prism.inkHue": "文字颜色·亮色模式",
			"prism.inkDarkHue": "文字颜色·暗色模式",
			"prism.accentHue": "主题色",
			"prism.accentHint": "主题色同时用于强调元素与对话地标颜色",
			"prism.bgHue": "背景主色调",
			"prism.accentOpacity": "强调色透明度",
			"prism.motion": "动效强度",
			"prism.background": "背景",
			"prism.backgroundAurora": "流光动效",
			"prism.backgroundWallpaper": "自定义壁纸",
			"prism.wallpaperDark": "暗色壁纸",
			"prism.wallpaperLight": "亮色壁纸",
			"prism.chooseImage": "添加图片 / GIF",
			"prism.deleteWallpaper": "删除",
			"prism.manage": "管理",
			"prism.manageDone": "完成",
			"prism.wallpaperInterval": "轮播间隔",
			"prism.wallpaperMode": "播放模式",
			"prism.wallpaperFixed": "固定",
			"prism.wallpaperLoop": "循环",
			"prism.wallpaperPinHint": "点击某张图片即固定使用它；选择“循环”才自动轮播",
			"prism.wallpaperIntervalHint": "循环模式下多张图片按间隔自动切换并淡入淡出",
			"prism.wallpaperBlur": "壁纸模糊",
			"prism.wallpaperFrost": "壁纸磨砂",
			"prism.wallpaperHint": "支持照片与 GIF 动图（保留动画）；静态图自动压缩、单个超过 30MB 会被拒绝；暗色壁纸配暗色模式、亮色壁纸配亮色模式效果更佳",
			"prism.brightnessHintDark": "深色模式：0 压暗至纯黑，50 原样",
			"prism.brightnessHintLight": "浅色模式：50 原样，100 提亮至纯白",
			"prism.presets": "预设",
			"prism.presetNight": "夜航",
			"prism.presetAurora": "极光",
			"prism.presetCrystal": "清透",
			"prism.reset": "重置默认",
			"prism.errorSize": "文件过大（超过 12MB）",
			"prism.errorRead": "文件读取失败",
			"prism.errorDecode": "图片无法解码",
			"prism.errorNone": ""
		};
		/** English dictionary. */
		const en = {
			"prism.title": "Prism",
			"prism.description": "Global glassmorphism: material, blur, frost, typography, color, motion, rotating wallpapers, and conversation landmarks — every slider is spring-damped",
			"prism.enable": "On",
			"prism.disable": "Off",
			"prism.material": "Material",
			"prism.materialClear": "Clear",
			"prism.materialFrosted": "Frosted",
			"prism.materialVelvet": "Velvet",
			"prism.blur": "Glass blur",
			"prism.frost": "Frost",
			"prism.zones": "Zone opacity",
			"prism.zoneBase": "Base",
			"prism.zoneSidebar": "Sidebar",
			"prism.zoneCard": "Cards",
			"prism.zoneInput": "Input",
			"prism.zoneOverlay": "Overlays",
			"prism.zoneBubble": "Bubbles",
			"prism.bgBrightness": "Background brightness",
			"prism.fontSize": "Text size",
			"prism.font": "Font",
			"prism.fontSystem": "System",
			"prism.fontRounded": "Rounded CJK",
			"prism.fontSerif": "Serif",
			"prism.fontMono": "Monospace",
			"prism.fontCustom": "Custom",
			"prism.customFontPlaceholder": "Font family name, e.g. LXGW WenKai",
			"prism.inkHue": "Text color (light mode)",
			"prism.inkDarkHue": "Text color (dark mode)",
			"prism.accentHue": "Theme color",
			"prism.accentHint": "The theme color drives accents and conversation landmarks",
			"prism.bgHue": "Backdrop hue",
			"prism.accentOpacity": "Accent opacity",
			"prism.motion": "Motion",
			"prism.background": "Backdrop",
			"prism.backgroundAurora": "Aurora",
			"prism.backgroundWallpaper": "Wallpaper",
			"prism.wallpaperDark": "Dark wallpapers",
			"prism.wallpaperLight": "Light wallpapers",
			"prism.chooseImage": "Add image / GIF",
			"prism.deleteWallpaper": "Delete",
			"prism.manage": "Manage",
			"prism.manageDone": "Done",
			"prism.wallpaperInterval": "Rotation interval",
			"prism.wallpaperMode": "Playback",
			"prism.wallpaperFixed": "Fixed",
			"prism.wallpaperLoop": "Loop",
			"prism.wallpaperPinHint": "Click an image to pin it; choose Loop to rotate automatically",
			"prism.wallpaperIntervalHint": "In loop mode, multiple images rotate and crossfade at the interval",
			"prism.wallpaperBlur": "Wallpaper blur",
			"prism.wallpaperFrost": "Wallpaper frost",
			"prism.wallpaperHint": "Photos and animated GIFs (animation kept) are supported; static images are compressed, files over 30MB are rejected; pair dark wallpapers with dark mode and light wallpapers with light mode",
			"prism.brightnessHintDark": "Dark mode: 0 fades to pure black, 50 is unchanged",
			"prism.brightnessHintLight": "Light mode: 50 is unchanged, 100 brightens to pure white",
			"prism.presets": "Presets",
			"prism.presetNight": "Night Drive",
			"prism.presetAurora": "Aurora",
			"prism.presetCrystal": "Crystal",
			"prism.reset": "Reset",
			"prism.errorSize": "File too large (over 12MB)",
			"prism.errorRead": "File read failed",
			"prism.errorDecode": "Image could not be decoded",
			"prism.errorNone": ""
		};
		//#endregion
		//#region src/client/fonts.ts
		/** The complete composite-font inventory (source: ui-theme gradient-shadow-text.css). */
		const FONT_ENTRIES = Object.freeze([
			["--dsw-font-markdown-h1", "700 24px/34px var(--dsw-font-family)"],
			["--dsw-font-markdown-h2", "700 22px/32px var(--dsw-font-family)"],
			["--dsw-font-markdown-h3", "700 20px/30px var(--dsw-font-family)"],
			["--dsw-font-markdown-h4", "600 16px/28px var(--dsw-font-family)"],
			["--dsw-font-markdown-base", "16px/28px var(--dsw-font-family)"],
			["--dsw-font-markdown-base-strong", "600 16px/28px var(--dsw-font-family)"],
			["--dsw-font-markdown-base-italic", "italic 16px/28px var(--dsw-font-family)"],
			["--dsw-font-markdown-base-strong-italic", "italic 600 16px/28px var(--dsw-font-family)"],
			["--dsw-font-markdown-table", "15px/25px var(--dsw-font-family)"],
			["--dsw-font-markdown-table-head", "500 15px/25px var(--dsw-font-family)"],
			["--dsw-font-markdown-small", "14px/24px var(--dsw-font-family)"],
			["--dsw-font-markdown-small-strong", "600 14px/24px var(--dsw-font-family)"],
			["--dsw-font-markdown-small-italic", "italic 14px/24px var(--dsw-font-family)"],
			["--dsw-font-markdown-small-strong-italic", "italic 600 14px/24px var(--dsw-font-family)"],
			["--dsw-font-markdown-code", "14px/22px var(--ds-font-family-code)"],
			["--dsw-font-markdown-code-block", "13px/22px var(--ds-font-family-code)"],
			["--dsw-font-markdown-code-block-small", "12px/18px var(--ds-font-family-code)"],
			["--dsw-font-xl-24", "600 24px/32px var(--dsw-font-family)"],
			["--dsw-font-l-20", "500 20px/28px var(--dsw-font-family)"],
			["--dsw-font-m-18", "500 16px/28px var(--dsw-font-family)"],
			["--dsw-font-base-16", "16px/24px var(--dsw-font-family)"],
			["--dsw-font-base-strong-16", "500 16px/24px var(--dsw-font-family)"],
			["--dsw-font-s-14", "14px/22px var(--dsw-font-family)"],
			["--dsw-font-s-strong-14", "500 14px/22px var(--dsw-font-family)"],
			["--dsw-font-xs-13", "13px/20px var(--dsw-font-family)"],
			["--dsw-font-xs-strong-13", "500 13px/20px var(--dsw-font-family)"],
			["--dsw-font-xxs-12", "12px/18px var(--dsw-font-family)"],
			["--dsw-font-xxs-strong-12", "500 12px/18px var(--dsw-font-family)"],
			["--dsw-font-xxxs-11", "11px/14px var(--dsw-font-family)"],
			["--dsw-font-xxxs-strong-11", "500 11px/14px var(--dsw-font-family)"]
		]);
		/** Matches the size/line-height pair inside a font shorthand. */
		const PX_PAIR = /(\d+)px\/(\d+)px/;
		/** Scheme-invariant token pair (font values never differ per scheme). */
		function both(value) {
			return {
				light: value,
				dark: value
			};
		}
		/**
		* Rewrite a stock shorthand's size/line-height pair into scale-aware calc()
		* expressions.
		* @param shorthand - the stock shorthand string.
		* @returns the same string with both px values replaced by calc().
		*/
		function scaleShorthand(shorthand) {
			return shorthand.replace(PX_PAIR, (_match, size, lineHeight) => `calc(${size}px * var(--prism-font-scale)) / calc(${lineHeight}px * var(--prism-font-scale))`);
		}
		/**
		* Build the complete font-scale override layer: every shorthand plus its
		* `-font-size` / `-line-height` members, all scheme-invariant.
		* @returns token-name → { light, dark } override dictionary.
		*/
		function buildFontOverrides() {
			const out = {};
			for (const [name, shorthand] of FONT_ENTRIES) {
				const match = PX_PAIR.exec(shorthand);
				if (match === null) continue;
				const [, size, lineHeight] = match;
				out[name] = both(scaleShorthand(shorthand));
				out[`${name}-font-size`] = both(`calc(${size}px * var(--prism-font-scale))`);
				out[`${name}-line-height`] = both(`calc(${lineHeight}px * var(--prism-font-scale))`);
			}
			return out;
		}
		//#endregion
		//#region src/client/tokens.ts
		/** Scheme-paired override value. */
		function pair(light, dark) {
			return {
				light,
				dark
			};
		}
		/** The full user accent color, applied verbatim (both modes). */
		const accentColor = () => pair("hsl(var(--prism-accent-h) var(--prism-accent-s) var(--prism-accent-l) / var(--prism-accent-a, 1))", "hsl(var(--prism-accent-h) var(--prism-accent-s) var(--prism-accent-l) / var(--prism-accent-a, 1))");
		/** Contrast-scaled secondary ink: strong ink toward weak gray as contrast
		*  falls; light mode mixes dark ink, dark mode mixes light ink. */
		function ink(lightStrong, lightWeak, darkStrong, darkWeak, strongPct, weakPct) {
			const strongShare = `calc(${strongPct} + (1 - ${strongPct} - ${weakPct}) * 0.5)`;
			const weakShare = `calc(${weakPct} + (1 - ${strongPct} - ${weakPct}) * (1 - 0.5))`;
			return pair(`color-mix(in srgb, ${lightStrong} ${strongShare}, ${lightWeak} ${weakShare})`, `color-mix(in srgb, ${darkStrong} ${strongShare}, ${darkWeak} ${weakShare})`);
		}
		/**
		* Build the complete Prism token layer. Values are static strings; the
		* dynamic knobs arrive through `--prism-*` variables written by the layer.
		* @returns token-name → { light, dark } override dictionary.
		*/
		function buildTokenOverrides() {
			return {
				"--dsw-font-family": pair("var(--prism-font-family)", "var(--prism-font-family)"),
				"--ds-font-family-code": pair("var(--prism-code-family)", "var(--prism-code-family)"),
				"--dsw-alias-bg-base": pair("#F2F6FC", "#0A0F16"),
				"--dsw-alias-bg-layer-1": pair("rgb(255 255 255 / calc(0.9 * var(--prism-frost) * var(--prism-depth, 1) * var(--prism-zone-base, 1)))", "rgb(34 38 47 / calc(0.9 * var(--prism-frost) * var(--prism-depth, 1) * var(--prism-zone-base, 1)))"),
				"--dsw-alias-bg-layer-2": pair("rgb(255 255 255 / calc(0.85 * var(--prism-frost) * var(--prism-depth, 1) * var(--prism-zone-card, 1)))", "rgb(34 38 47 / calc(0.85 * var(--prism-frost) * var(--prism-depth, 1) * var(--prism-zone-card, 1)))"),
				"--dsw-alias-bg-layer-3": pair("rgb(255 255 255 / calc(0.85 * var(--prism-frost) * var(--prism-depth, 1) * var(--prism-zone-card, 1)))", "rgb(34 38 47 / calc(0.85 * var(--prism-frost) * var(--prism-depth, 1) * var(--prism-zone-card, 1)))"),
				"--dsw-alias-bg-overlay": pair("rgb(255 255 255 / calc(0.85 * var(--prism-frost) * var(--prism-depth, 1) * var(--prism-zone-overlay, 1)))", "rgb(34 38 47 / calc(0.85 * var(--prism-frost) * var(--prism-depth, 1) * var(--prism-zone-overlay, 1)))"),
				"--dsw-alias-bg-module-platform": pair("rgb(255 255 255 / calc(0.8 * var(--prism-frost) * var(--prism-depth, 1) * var(--prism-zone-base, 1)))", "rgb(34 38 47 / calc(0.8 * var(--prism-frost) * var(--prism-depth, 1) * var(--prism-zone-base, 1)))"),
				"--dsw-alias-bg-multi-select": pair("rgb(255 255 255 / calc(0.8 * var(--prism-frost) * var(--prism-depth, 1) * var(--prism-zone-card, 1)))", "rgb(34 38 47 / calc(0.8 * var(--prism-frost) * var(--prism-depth, 1) * var(--prism-zone-card, 1)))"),
				"--dsw-alias-bg-skeleton": pair("rgb(19 45 83 / calc(0.06 * var(--prism-frost)))", "rgb(148 180 220 / calc(0.10 * var(--prism-frost)))"),
				"--dsw-alias-border-l1": pair("rgb(19 45 83 / calc(0.05 + 0.07 * 0.5))", "rgb(148 180 220 / calc(0.06 + 0.08 * 0.5))"),
				"--dsw-alias-border-l2": pair("rgb(19 45 83 / calc(0.09 + 0.09 * 0.5))", "rgb(148 180 220 / calc(0.11 + 0.10 * 0.5))"),
				"--dsw-alias-border-l2-darkmode-thin": pair("rgb(19 45 83 / calc(0.06 + 0.06 * 0.5))", "rgb(148 180 220 / calc(0.07 + 0.07 * 0.5))"),
				"--dsw-alias-border-l3": pair("rgb(19 45 83 / calc(0.14 + 0.10 * 0.5))", "rgb(148 180 220 / calc(0.17 + 0.11 * 0.5))"),
				"--dsw-alias-border-l4": pair("rgb(19 45 83 / calc(0.20 + 0.12 * 0.5))", "rgb(148 180 220 / calc(0.23 + 0.12 * 0.5))"),
				"--dsw-alias-border-inverted": pair("rgb(19 45 83 / 0.06)", "rgb(148 180 220 / calc(0.10 * var(--prism-frost)))"),
				"--dsw-alias-border-inverted2": pair("rgb(19 45 83 / 0.08)", "rgb(148 180 220 / calc(0.12 * var(--prism-frost)))"),
				"--dsw-alias-brand-primary": accentColor(),
				"--dsw-alias-brand-primary-new-colorprimary-new-color": accentColor(),
				"--dsw-alias-brand-text": pair("hsl(var(--prism-ink-light-h) var(--prism-ink-light-s) var(--prism-ink-light-l))", "hsl(var(--prism-ink-dark-h) var(--prism-ink-dark-s) var(--prism-ink-dark-l))"),
				"--dsw-alias-brand-primary-invert": pair("#FFFFFF", "#0A0F16"),
				"--dsw-alias-state-business-primary": accentColor(),
				"--dsw-alias-state-business-tertiary": pair("hsl(var(--prism-accent-h) var(--prism-accent-s) 90%)", "hsl(var(--prism-accent-h) var(--prism-accent-s) 22%)"),
				"--dsw-alias-button-primary-fill": accentColor(),
				"--dsw-alias-button-primary-hover": accentColor(),
				"--dsw-alias-button-primary-dimmed": pair("hsl(var(--prism-accent-h) var(--prism-accent-s) 90%)", "hsl(var(--prism-accent-h) var(--prism-accent-s) 22%)"),
				"--dsw-alias-button-info-fill": accentColor(),
				"--dsw-alias-button-info-hover": accentColor(),
				"--dsw-alias-button-elevated-fill": pair("rgb(255 255 255 / calc(0.85 * var(--prism-frost) * var(--prism-depth, 1) * var(--prism-zone-card, 1)))", "rgb(34 38 47 / calc(0.85 * var(--prism-frost) * var(--prism-depth, 1) * var(--prism-zone-card, 1)))"),
				"--dsw-alias-button-floating-fill": pair("rgb(255 255 255 / calc(0.85 * var(--prism-frost) * var(--prism-depth, 1) * var(--prism-zone-card, 1)))", "rgb(34 38 47 / calc(0.85 * var(--prism-frost) * var(--prism-depth, 1) * var(--prism-zone-card, 1)))"),
				"--dsw-alias-button-floating-hover": pair("rgb(240 245 251 / calc(0.9 * var(--prism-frost) * var(--prism-depth, 1) * var(--prism-zone-card, 1)))", "rgb(40 45 60 / calc(0.9 * var(--prism-frost) * var(--prism-depth, 1) * var(--prism-zone-card, 1)))"),
				"--dsw-alias-button-contrast-fill": pair("#26364D", "#EAF2FC"),
				"--dsw-alias-button-ghost-active-fill": pair("hsl(var(--prism-accent-h) var(--prism-accent-s) 90% / calc(0.9 * var(--prism-frost)))", "hsl(var(--prism-accent-h) var(--prism-accent-s) 26% / calc(0.9 * var(--prism-frost)))"),
				"--dsw-alias-button-ghost-active-hover": pair("hsl(var(--prism-accent-h) var(--prism-accent-s) 92% / calc(0.9 * var(--prism-frost)))", "hsl(var(--prism-accent-h) var(--prism-accent-s) 30% / calc(0.9 * var(--prism-frost)))"),
				"--dsw-alias-button-ghost-active-border": pair("rgb(143 163 188 / 0.8)", "rgb(107 130 159 / 0.8)"),
				"--dsw-alias-interactive-bg-hover": pair("hsl(var(--prism-accent-h) var(--prism-accent-s) 55% / calc(0.08 * var(--prism-accent-a, 1)))", "hsl(var(--prism-accent-h) var(--prism-accent-s) 65% / calc(0.10 * var(--prism-accent-a, 1)))"),
				"--dsw-alias-interactive-bg-hover-accent": pair("hsl(var(--prism-accent-h) var(--prism-accent-s) 55% / calc(0.14 * var(--prism-accent-a, 1)))", "hsl(var(--prism-accent-h) var(--prism-accent-s) 65% / calc(0.20 * var(--prism-accent-a, 1)))"),
				"--dsw-alias-interactive-bg-active": pair("hsl(var(--prism-accent-h) var(--prism-accent-s) 55% / calc(0.20 * var(--prism-accent-a, 1)))", "hsl(var(--prism-accent-h) var(--prism-accent-s) 65% / calc(0.26 * var(--prism-accent-a, 1)))"),
				"--dsw-alias-interactive-bg-hover-danger": pair("rgb(236 19 19 / 0.05)", "rgb(242 90 90 / 0.14)"),
				"--dsw-alias-interactive-bg-hover-solid": pair("rgb(240 245 251 / calc(0.9 * var(--prism-frost) * var(--prism-depth, 1) * var(--prism-zone-card, 1)))", "rgb(40 45 60 / calc(0.9 * var(--prism-frost) * var(--prism-depth, 1) * var(--prism-zone-card, 1)))"),
				"--dsw-alias-label-primary": pair("hsl(var(--prism-ink-light-h) var(--prism-ink-light-s) var(--prism-ink-light-l))", "hsl(var(--prism-ink-dark-h) var(--prism-ink-dark-s) var(--prism-ink-dark-l))"),
				"--dsw-alias-label-secondary": ink("hsl(var(--prism-ink-light-h) var(--prism-ink-light-s) var(--prism-ink-light-l))", "rgb(120 128 140)", "hsl(var(--prism-ink-dark-h) var(--prism-ink-dark-s) var(--prism-ink-dark-l))", "rgb(120 128 140)", "0.45", "0.00"),
				"--dsw-alias-label-tertiary": ink("hsl(var(--prism-ink-light-h) var(--prism-ink-light-s) var(--prism-ink-light-l))", "rgb(120 128 140)", "hsl(var(--prism-ink-dark-h) var(--prism-ink-dark-s) var(--prism-ink-dark-l))", "rgb(120 128 140)", "0.30", "0.00"),
				"--dsw-alias-label-caption": ink("hsl(var(--prism-ink-light-h) var(--prism-ink-light-s) var(--prism-ink-light-l))", "rgb(120 128 140)", "hsl(var(--prism-ink-dark-h) var(--prism-ink-dark-s) var(--prism-ink-dark-l))", "rgb(120 128 140)", "0.20", "0.00"),
				"--dsw-alias-label-primary-dimmed": pair("#1E3556", "#D7E3F4"),
				"--dsw-alias-label-primary-bluish": pair("#2E5EB8", "#BFD6F6"),
				"--dsw-alias-label-primary-inverted": pair("#FFFFFF", "#162130"),
				"--dsw-alias-label-primary-foreground": pair("#FFFFFF", "#FFFFFF"),
				"--dsw-alias-label-dimmed": pair("rgb(201 212 226 / calc(0.5 + 0.4 * 0.5))", "rgb(78 95 118 / calc(0.5 + 0.4 * 0.5))"),
				"--dsw-alias-markdown-code-block": pair("rgb(240 245 251 / calc(0.85 * var(--prism-frost) * var(--prism-depth, 1) * var(--prism-zone-card, 1)))", "rgb(13 20 31 / calc(0.85 * var(--prism-frost) * var(--prism-depth, 1) * var(--prism-zone-card, 1)))"),
				"--dsw-alias-markdown-code-block-banner": pair("rgb(245 248 253 / calc(0.85 * var(--prism-frost) * var(--prism-depth, 1) * var(--prism-zone-card, 1)))", "rgb(18 27 41 / calc(0.85 * var(--prism-frost) * var(--prism-depth, 1) * var(--prism-zone-card, 1)))"),
				"--dsw-alias-markdown-inline-code": pair("rgb(228 237 248 / calc(0.85 * var(--prism-frost) * var(--prism-depth, 1) * var(--prism-zone-card, 1)))", "rgb(23 35 52 / calc(0.85 * var(--prism-frost) * var(--prism-depth, 1) * var(--prism-zone-card, 1)))"),
				"--dsw-alias-markdown-citation": pair("rgb(255 255 255 / calc(0.85 * var(--prism-frost) * var(--prism-depth, 1) * var(--prism-zone-card, 1)))", "rgb(26 37 52 / calc(0.85 * var(--prism-frost) * var(--prism-depth, 1) * var(--prism-zone-card, 1)))"),
				"--dsw-alias-markdown-tag": pair("rgb(228 237 248 / calc(0.85 * var(--prism-frost) * var(--prism-depth, 1) * var(--prism-zone-card, 1)))", "rgb(22 33 48 / calc(0.85 * var(--prism-frost) * var(--prism-depth, 1) * var(--prism-zone-card, 1)))"),
				"--dsw-alias-markdown-placeholder": pair("rgb(255 255 255 / calc(0.85 * var(--prism-frost) * var(--prism-depth, 1) * var(--prism-zone-card, 1)))", "rgb(34 38 47 / calc(0.85 * var(--prism-frost) * var(--prism-depth, 1) * var(--prism-zone-card, 1)))"),
				"--dsw-alias-markdown-code-segment-selected": pair("#FFFFFF", "#1C2A3D"),
				"--dsw-alias-markdown-code-segment-unselected": pair("#F0F5FB", "#0F1723"),
				"--dsw-alias-scrollbar-bg-l1": pair("hsl(var(--prism-accent-h) var(--prism-accent-s) 60% / calc(0.28 * var(--prism-accent-a, 1)))", "hsl(var(--prism-accent-h) var(--prism-accent-s) 60% / calc(0.28 * var(--prism-accent-a, 1)))"),
				"--dsw-alias-scrollbar-bg-l2": pair("hsl(var(--prism-accent-h) var(--prism-accent-s) 55% / calc(0.4 * var(--prism-accent-a, 1)))", "hsl(var(--prism-accent-h) var(--prism-accent-s) 60% / calc(0.36 * var(--prism-accent-a, 1)))"),
				"--dsw-alias-scrollbar-hover-l1": pair("hsl(var(--prism-accent-h) var(--prism-accent-s) 50% / calc(0.5 * var(--prism-accent-a, 1)))", "hsl(var(--prism-accent-h) var(--prism-accent-s) 65% / calc(0.44 * var(--prism-accent-a, 1)))"),
				"--dsw-alias-scrollbar-hover-l2": pair("hsl(var(--prism-accent-h) var(--prism-accent-s) 45% / calc(0.6 * var(--prism-accent-a, 1)))", "hsl(var(--prism-accent-h) var(--prism-accent-s) 68% / calc(0.52 * var(--prism-accent-a, 1)))"),
				"--dsw-specific-sidebar-fill": pair("transparent", "transparent"),
				"--dsw-specific-sidebar-nav-item-active": pair("hsl(var(--prism-accent-h) var(--prism-accent-s) 92% / calc(0.9 * var(--prism-frost)))", "hsl(var(--prism-accent-h) var(--prism-accent-s) 26% / calc(0.9 * var(--prism-frost)))"),
				"--dsw-specific-sidebar-nav-item-hover": pair("hsl(var(--prism-accent-h) var(--prism-accent-s) 94% / calc(0.7 * var(--prism-frost)))", "hsl(var(--prism-accent-h) var(--prism-accent-s) 22% / calc(0.7 * var(--prism-frost)))"),
				"--dsw-specific-sidebar-nav-item-active-accent": accentColor(),
				"--dsw-specific-bubble": pair("rgb(255 255 255 / calc(0.9 * var(--prism-frost) * var(--prism-depth, 1) * var(--prism-zone-bubble, 1)))", "rgb(34 38 47 / calc(0.9 * var(--prism-frost) * var(--prism-depth, 1) * var(--prism-zone-bubble, 1)))"),
				"--dsw-specific-bubble-highlight": pair("rgb(255 255 255 / calc(0.9 * var(--prism-frost) * var(--prism-depth, 1) * var(--prism-zone-bubble, 1)))", "rgb(34 38 47 / calc(0.9 * var(--prism-frost) * var(--prism-depth, 1) * var(--prism-zone-bubble, 1)))"),
				"--dsw-specific-input-major": pair("rgb(255 255 255 / calc(0.85 * var(--prism-frost) * var(--prism-depth, 1) * var(--prism-zone-input, 1)))", "rgb(34 38 47 / calc(0.85 * var(--prism-frost) * var(--prism-depth, 1) * var(--prism-zone-input, 1)))"),
				"--dsw-specific-login-input": pair("rgb(255 255 255 / calc(0.85 * var(--prism-frost) * var(--prism-depth, 1) * var(--prism-zone-input, 1)))", "rgb(34 38 47 / calc(0.85 * var(--prism-frost) * var(--prism-depth, 1) * var(--prism-zone-input, 1)))"),
				"--dsw-specific-menu": pair("rgb(255 255 255 / calc(0.88 * var(--prism-frost) * var(--prism-depth, 1) * var(--prism-zone-overlay, 1)))", "rgb(34 38 47 / calc(0.88 * var(--prism-frost) * var(--prism-depth, 1) * var(--prism-zone-overlay, 1)))"),
				"--dsw-specific-selector": pair("rgb(255 255 255 / calc(0.85 * var(--prism-frost) * var(--prism-depth, 1) * var(--prism-zone-overlay, 1)))", "rgb(34 38 47 / calc(0.85 * var(--prism-frost) * var(--prism-depth, 1) * var(--prism-zone-overlay, 1)))"),
				"--dsw-specific-tip": pair("rgb(255 255 255 / calc(0.85 * var(--prism-frost) * var(--prism-depth, 1) * var(--prism-zone-card, 1)))", "rgb(34 38 47 / calc(0.85 * var(--prism-frost) * var(--prism-depth, 1) * var(--prism-zone-card, 1)))"),
				"--dsw-alias-toast-bg": pair("#1B3256", "#1C2A3D"),
				"--dsw-alias-tooltip-bg": pair("#13243E", "#162130"),
				"--dsw-shadow-lv1": pair("0 2px 4px rgb(19 45 83 / calc(0.05 + 0.05 * var(--prism-frost)))", "0 2px 4px rgb(2 6 14 / calc(0.4 + 0.1 * var(--prism-frost)))"),
				"--dsw-shadow-lv2": pair("0 4px 12px rgb(19 45 83 / calc(0.05 + 0.05 * var(--prism-frost))), 0 2px 8px rgb(19 45 83 / 0.06)", "0 4px 12px rgb(2 6 14 / calc(0.35 + 0.1 * var(--prism-frost))), 0 2px 8px rgb(2 6 14 / 0.35)"),
				"--dsw-shadow-lv3": pair("0 0 1px rgb(19 45 83 / 0.08), 0 12px 32px rgb(19 45 83 / calc(0.1 + 0.06 * var(--prism-frost)))", "0 0 1px rgb(2 6 14 / 0.6), 0 12px 32px rgb(2 6 14 / calc(0.45 + 0.1 * var(--prism-frost)))")
			};
		}
		/** Simulation step cap, seconds (substepped for stability). */
		const SPRING_STEP = 1 / 120;
		/**
		* Create a spring resting exactly on a value.
		* @param target - initial position.
		* @returns a settled spring state.
		*/
		function createSpring(target) {
			return {
				position: target,
				velocity: 0
			};
		}
		/**
		* Advance one spring toward a target by `dt` seconds (semi-implicit Euler
		* with fixed substeps; the step cap keeps large frame gaps stable).
		* @param state - current spring state (mutated in place).
		* @param target - desired position.
		* @param dt - elapsed seconds since the previous frame.
		* @returns the same state object, advanced.
		*/
		function advanceSpring(state, target, dt) {
			if (dt <= 0) return state;
			const damping = 2 * Math.sqrt(260) * 1;
			const steps = Math.max(1, Math.ceil(dt / SPRING_STEP));
			const h = dt / steps;
			for (let i = 0; i < steps; i += 1) {
				const acceleration = 260 * (target - state.position) - damping * state.velocity;
				state.velocity += acceleration * h;
				state.position += state.velocity * h;
			}
			if (Math.abs(target - state.position) < .05 && Math.abs(state.velocity) < .5) {
				state.position = target;
				state.velocity = 0;
			}
			return state;
		}
		/**
		* Whether a spring has settled exactly on its target.
		* @param state - spring state to check.
		* @param target - the target the spring was chasing.
		* @returns true when position equals target and velocity is zero.
		*/
		function springSettled(state, target) {
			return state.position === target && state.velocity === 0;
		}
		/**
		* Bound a value into [min, max], returning `fallback` for non-finite input.
		* @param value - value to clamp.
		* @param min - inclusive lower bound.
		* @param max - inclusive upper bound.
		* @param fallback - value returned when input is not a finite number.
		* @returns the clamped value.
		*/
		function clampValue(value, min, max, fallback) {
			const n = Number(value);
			return Math.min(max, Math.max(min, Number.isFinite(n) ? n : fallback));
		}
		/** Longest edge a static wallpaper is downscaled to, px. */
		const MAX_STATIC_EDGE = 1920;
		/** JPEG quality for downscaled static wallpapers. */
		const WALLPAPER_JPEG_QUALITY = .85;
		/** Luminance returned when the analysis environment cannot draw pixels. */
		const UNKNOWN_LUMINANCE = .5;
		/**
		* Whether the file is an animated GIF (every GIF is treated as animated:
		* the format cannot be reliably detected without a full decode, and
		* downscaling a GIF through a canvas would flatten its animation).
		* @param file - the picked file.
		* @returns true for image/gif inputs.
		*/
		function isAnimatedGif(file) {
			return file.type === "image/gif";
		}
		/**
		* Read a wallpaper file into a compact data URL.
		* Static images are downscaled to {@link MAX_STATIC_EDGE} and re-encoded as
		* JPEG; GIFs return their original data URL byte-for-byte.
		* @param file - the picked file.
		* @returns the data URL, or a typed rejection.
		*/
		async function readWallpaper(file) {
			if (file.size > 31457280) return {
				kind: "size",
				bytes: file.size
			};
			const raw = await new Promise((resolve, reject) => {
				const reader = new FileReader();
				reader.onload = () => {
					resolve(String(reader.result));
				};
				reader.onerror = () => {
					reject(reader.error);
				};
				reader.readAsDataURL(file);
			}).catch(() => null);
			if (raw === null) return { kind: "read" };
			if (isAnimatedGif(file)) return raw;
			const image = await decodeImage(raw);
			if (image === null) return { kind: "decode" };
			return downscaleToJpeg(image, raw);
		}
		/**
		* Load a data URL into an Image (resolves null when decoding fails).
		* @param url - image data URL.
		* @returns the decoded image or null.
		*/
		function decodeImage(url) {
			return new Promise((resolve) => {
				const image = new Image();
				image.onload = () => {
					resolve(image);
				};
				image.onerror = () => {
					resolve(null);
				};
				image.src = url;
			});
		}
		/**
		* Downscale an image to {@link MAX_STATIC_EDGE} and re-encode as JPEG.
		* Falls back to the original when no 2d context exists (test environments).
		* @param image - decoded source image.
		* @param original - original data URL, returned when drawing is unavailable.
		* @returns a compact JPEG data URL (or the original).
		*/
		function downscaleToJpeg(image, original) {
			const scale = Math.min(1, MAX_STATIC_EDGE / Math.max(image.width, image.height));
			if (scale >= 1) return original;
			const width = Math.max(1, Math.round(image.width * scale));
			const height = Math.max(1, Math.round(image.height * scale));
			const canvas = document.createElement("canvas");
			canvas.width = width;
			canvas.height = height;
			const context = canvas.getContext("2d");
			if (context === null) return original;
			context.drawImage(image, 0, 0, width, height);
			return canvas.toDataURL("image/jpeg", WALLPAPER_JPEG_QUALITY);
		}
		/**
		* Average pixel luminance (0-1) of an image, sampled on a tiny grid.
		* @param dataUrl - image data URL (a GIF's first frame is decoded).
		* @returns 0-1 average luminance, or {@link UNKNOWN_LUMINANCE} when the
		* environment cannot draw (jsdom, blocked canvases).
		*/
		async function analyzeLuminance(dataUrl) {
			const image = await decodeImage(dataUrl);
			if (image === null) return UNKNOWN_LUMINANCE;
			const canvas = document.createElement("canvas");
			canvas.width = 8;
			canvas.height = 8;
			const context = canvas.getContext("2d");
			if (context === null) return UNKNOWN_LUMINANCE;
			try {
				context.drawImage(image, 0, 0, 8, 8);
				const data = context.getImageData(0, 0, 8, 8).data;
				let sum = 0;
				let count = 0;
				for (let i = 0; i < data.length; i += 4) {
					const r = (data[i] ?? 0) / 255;
					const g = (data[i + 1] ?? 0) / 255;
					const b = (data[i + 2] ?? 0) / 255;
					sum += .2126 * r + .7152 * g + .0722 * b;
					count += 1;
				}
				return count === 0 ? UNKNOWN_LUMINANCE : sum / count;
			} catch {
				return UNKNOWN_LUMINANCE;
			}
		}
		/**
		* Auto dim veil for a wallpaper: dark mode darkens bright wallpapers, light
		* mode brightens dark ones, so chat text always keeps contrast.
		* @param luminance - average wallpaper luminance, 0-1.
		* @param dark - resolved scheme is dark.
		* @returns veil alpha, 0-0.75.
		*/
		function veilAlpha(luminance, dark) {
			if (dark) return Math.min(.75, Math.max(0, luminance - .32) * .85);
			return Math.min(.75, Math.max(0, .68 - luminance) * .85);
		}
		//#endregion
		//#region src/client/prism-settings.ts
		/** Material recipes: clear glass, frosted glass, and matte velvet. */
		const MATERIALS = Object.freeze({
			clear: Object.freeze({
				saturate: 112,
				depth: .9
			}),
			frosted: Object.freeze({
				saturate: 130,
				depth: 1
			}),
			velvet: Object.freeze({
				saturate: 75,
				depth: 1.2
			})
		});
		/** UI font stacks by choice id (system = the stock stack). */
		const FONT_CHOICES = Object.freeze({
			system: "",
			rounded: "'PingFang SC', 'HarmonyOS Sans SC', 'MiSans', 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif",
			serif: "'Noto Serif SC', 'Songti SC', 'STSong', 'SimSun', 'Times New Roman', serif",
			mono: "'SF Mono', 'JetBrains Mono', 'Fira Code', 'Cascadia Code', Consolas, 'Liberation Mono', Menlo, monospace",
			custom: ""
		});
		/** Code font stacks by choice id. */
		const CODE_FONT_CHOICES = Object.freeze({
			system: "",
			rounded: "'SF Mono', 'JetBrains Mono', 'Fira Code', Consolas, 'Liberation Mono', Menlo, Courier, 'PingFang SC', 'Microsoft YaHei'",
			serif: "'JetBrains Mono', 'SF Mono', Consolas, 'PingFang SC', 'Microsoft YaHei', monospace",
			mono: "'JetBrains Mono', 'SF Mono', 'Fira Code', 'Cascadia Code', Consolas, 'Liberation Mono', Menlo, monospace",
			custom: ""
		});
		/** localStorage key carrying the knob document. */
		const PRISM_SETTINGS_KEY = "dsh.ui-prism.settings.v1";
		/** The neutral zone bundle (100 = follow the global frost). */
		const DEFAULT_ZONES = Object.freeze({
			base: 100,
			sidebar: 100,
			card: 100,
			input: 100,
			overlay: 100,
			bubble: 100
		});
		/** Defaults a first-time install sees (the shipped look). */
		const SETTINGS_DEFAULTS = Object.freeze({
			enabled: true,
			material: "frosted",
			blur: 18,
			frost: 50,
			zones: { ...DEFAULT_ZONES },
			bgBrightness: 50,
			fontScale: 100,
			fontChoice: "system",
			customFont: "",
			inkLightHue: 222,
			inkLightSat: 30,
			inkLightLight: 12,
			inkDarkHue: 222,
			inkDarkSat: 30,
			inkDarkLight: 92,
			accentHue: 205,
			accentSat: 85,
			accentLight: 55,
			accentOpacity: 100,
			bgHue: 215,
			bgSat: 80,
			bgLight: 60,
			motion: 55,
			background: "aurora",
			wallpaperDark: [],
			wallpaperLight: [],
			wallpaperDimDark: [],
			wallpaperDimLight: [],
			wallpaperInterval: 30,
			wallpaperLoop: false,
			wallpaperPinnedDark: 0,
			wallpaperPinnedLight: 0,
			wallpaperBlur: 20,
			wallpaperFrost: 0
		});
		/** Curated whole-skin presets. */
		const PRESETS = Object.freeze({
			night: Object.freeze({
				accentHue: 190,
				bgHue: 222,
				material: "frosted",
				frost: 46,
				bgBrightness: 38,
				motion: 60
			}),
			aurora: Object.freeze({
				accentHue: 318,
				bgHue: 165,
				material: "velvet",
				frost: 36,
				bgBrightness: 50,
				motion: 80
			}),
			crystal: Object.freeze({
				accentHue: 205,
				bgHue: 200,
				material: "clear",
				frost: 30,
				bgBrightness: 56,
				motion: 30
			})
		});
		/** Numeric knob ranges. */
		const RANGES = Object.freeze({
			blur: {
				min: 0,
				max: 40
			},
			frost: {
				min: 0,
				max: 100
			},
			zone: {
				min: 20,
				max: 100
			},
			bgBrightness: {
				min: 0,
				max: 100
			},
			fontScale: {
				min: 85,
				max: 120
			},
			hue: {
				min: 0,
				max: 360
			},
			sat: {
				min: 0,
				max: 100
			},
			light: {
				min: 0,
				max: 100
			},
			accentOpacity: {
				min: 0,
				max: 100
			},
			motion: {
				min: 0,
				max: 100
			},
			wallpaperInterval: {
				min: 0,
				max: 120
			},
			wallpaperBlur: {
				min: 0,
				max: 100
			},
			wallpaperFrost: {
				min: 0,
				max: 100
			}
		});
		/** Normalize one wallpaper slot (legacy documents carry a single URL string;
		*  retired `idb:` video markers are dropped). */
		function wallpaperList(value) {
			if (typeof value === "string") return value === "" ? [] : [value];
			if (Array.isArray(value)) return value.filter((item) => typeof item === "string" && !item.startsWith("idb:"));
			return [];
		}
		/** Normalize one luminance slot (mirrors the wallpaper list length). */
		function dimList(value, fallbackCount) {
			if (typeof value === "number") return [value];
			const out = (Array.isArray(value) ? value.filter((item) => typeof item === "number") : []).slice(0, fallbackCount);
			while (out.length < fallbackCount) out.push(.5);
			return out;
		}
		/** Numeric field reader with a default. */
		function numberField(value, fallback) {
			return typeof value === "number" ? value : fallback;
		}
		/** Zone reader: merges stored zones over the neutral defaults. */
		function zonesField(value) {
			const stored = typeof value === "object" && value !== null ? value : {};
			return {
				base: numberField(stored.base, DEFAULT_ZONES.base),
				sidebar: numberField(stored.sidebar, DEFAULT_ZONES.sidebar),
				card: numberField(stored.card, DEFAULT_ZONES.card),
				input: numberField(stored.input, DEFAULT_ZONES.input),
				overlay: numberField(stored.overlay, DEFAULT_ZONES.overlay),
				bubble: numberField(stored.bubble, DEFAULT_ZONES.bubble)
			};
		}
		/**
		* Read the persisted document, folding defaults over partial storage and
		* migrating legacy shapes (single-wallpaper strings, retired zone bundles,
		* the retired 'apple' material id, single ink hue/saturation pairs).
		* @returns the merged settings document.
		*/
		function readSettings() {
			try {
				const raw = localStorage.getItem(PRISM_SETTINGS_KEY);
				if (raw === null) return {
					...SETTINGS_DEFAULTS,
					zones: { ...DEFAULT_ZONES }
				};
				const parsed = JSON.parse(raw);
				const material = parsed.material === "clear" || parsed.material === "velvet" || parsed.material === "frosted" ? parsed.material : SETTINGS_DEFAULTS.material;
				const wallpaperDark = wallpaperList(parsed.wallpaperDark);
				const wallpaperLight = wallpaperList(parsed.wallpaperLight);
				return {
					enabled: typeof parsed.enabled === "boolean" ? parsed.enabled : SETTINGS_DEFAULTS.enabled,
					material,
					blur: numberField(parsed.blur, SETTINGS_DEFAULTS.blur),
					frost: numberField(parsed.frost, SETTINGS_DEFAULTS.frost),
					zones: zonesField(parsed.zones),
					bgBrightness: numberField(parsed.bgBrightness, SETTINGS_DEFAULTS.bgBrightness),
					fontScale: numberField(parsed.fontScale, SETTINGS_DEFAULTS.fontScale),
					fontChoice: parsed.fontChoice === "rounded" || parsed.fontChoice === "serif" || parsed.fontChoice === "mono" || parsed.fontChoice === "custom" ? parsed.fontChoice : "system",
					customFont: typeof parsed.customFont === "string" ? parsed.customFont : "",
					inkLightHue: numberField(parsed.inkLightHue ?? parsed.inkHue, SETTINGS_DEFAULTS.inkLightHue),
					inkLightSat: numberField(parsed.inkLightSat ?? parsed.inkSat, SETTINGS_DEFAULTS.inkLightSat),
					inkLightLight: numberField(parsed.inkLightLight, SETTINGS_DEFAULTS.inkLightLight),
					inkDarkHue: numberField(parsed.inkDarkHue ?? parsed.inkHue, SETTINGS_DEFAULTS.inkDarkHue),
					inkDarkSat: numberField(parsed.inkDarkSat ?? parsed.inkSat, SETTINGS_DEFAULTS.inkDarkSat),
					inkDarkLight: numberField(parsed.inkDarkLight, SETTINGS_DEFAULTS.inkDarkLight),
					accentHue: numberField(parsed.accentHue, SETTINGS_DEFAULTS.accentHue),
					accentSat: numberField(parsed.accentSat, SETTINGS_DEFAULTS.accentSat),
					accentLight: numberField(parsed.accentLight, SETTINGS_DEFAULTS.accentLight),
					accentOpacity: numberField(parsed.accentOpacity, SETTINGS_DEFAULTS.accentOpacity),
					bgHue: numberField(parsed.bgHue, SETTINGS_DEFAULTS.bgHue),
					bgSat: numberField(parsed.bgSat, SETTINGS_DEFAULTS.bgSat),
					bgLight: numberField(parsed.bgLight, SETTINGS_DEFAULTS.bgLight),
					motion: numberField(parsed.motion, SETTINGS_DEFAULTS.motion),
					background: parsed.background === "wallpaper" ? "wallpaper" : "aurora",
					wallpaperDark,
					wallpaperLight,
					wallpaperDimDark: dimList(parsed.wallpaperDimDark, wallpaperDark.length),
					wallpaperDimLight: dimList(parsed.wallpaperDimLight, wallpaperLight.length),
					wallpaperInterval: numberField(parsed.wallpaperInterval, SETTINGS_DEFAULTS.wallpaperInterval),
					wallpaperLoop: parsed.wallpaperLoop === true,
					wallpaperPinnedDark: numberField(parsed.wallpaperPinnedDark, 0),
					wallpaperPinnedLight: numberField(parsed.wallpaperPinnedLight, 0),
					wallpaperBlur: numberField(parsed.wallpaperBlur, SETTINGS_DEFAULTS.wallpaperBlur),
					wallpaperFrost: numberField(parsed.wallpaperFrost, SETTINGS_DEFAULTS.wallpaperFrost)
				};
			} catch {
				return {
					...SETTINGS_DEFAULTS,
					zones: { ...DEFAULT_ZONES }
				};
			}
		}
		/** Persist the document (quota failures keep the in-memory state). */
		function writeSettings(settings) {
			try {
				localStorage.setItem(PRISM_SETTINGS_KEY, JSON.stringify(settings));
			} catch {}
		}
		//#endregion
		//#region src/client/theme-layer.ts
		/** html attribute selecting the Prism layer (all CSS hooks are gated on it). */
		const PRISM_ATTRIBUTE = "data-dsh-prism";
		/** The layer's identity in the theme override stack (inspection-visible). */
		const OVERRIDE_SOURCE = "@deepseek-ai/dsh-client-ui-prism";
		/** Whether the environment prefers reduced motion (checked live, so OS flips apply). */
		function prefersReducedMotion() {
			return typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;
		}
		/**
		* Owns the Prism layer lifecycle: durable settings, the token override layer,
		* the damped knob loop, the wallpaper rotation timer, and the ambient DOM.
		* Every subscription is released through ctx.effect on dispose.
		*/
		var PrismLayer = class {
			ctx;
			settings;
			dark = false;
			tokenDisposer;
			rafId;
			lastFrame;
			rotateTimer;
			knobs = /* @__PURE__ */ new Map();
			notify;
			/** Trailing-debounce timer for localStorage writes (the document can carry
			*  megabyte-sized wallpaper data URLs — persisting on every pointermove
			*  would serialize them at drag cadence and stutter the sliders). */
			persistTimer;
			/** False until construction completes: mount() emits theme/change, whose
			*  handler notifies — the owner's sync closure must not run mid-construction. */
			ready = false;
			/**
			* @param ctx - client cordis context (theme override stack + events).
			* @param notify - callback invoked after every applied settings change so
			* the settings-row stores re-sync.
			*/
			constructor(ctx, notify) {
				this.ctx = ctx;
				this.notify = notify;
				this.settings = readSettings();
				this.dark = this.resolveScheme();
				ctx.effect(() => {
					const onStorage = (event) => {
						if (event.key !== "dsh.ui-prism.settings.v1") return;
						this.settings = readSettings();
						if (this.settings.enabled) if (document.documentElement.hasAttribute("data-dsh-prism")) {
							this.applyDiscrete();
							this.applyAllKnobs();
						} else this.mount();
						else this.unmount();
						this.signal();
					};
					window.addEventListener("storage", onStorage);
					const onTheme = () => {
						this.dark = this.resolveScheme();
						this.applySchemeDependent();
						this.applyWallpaperSource();
						this.signal();
					};
					ctx.on("theme/change", onTheme);
					return () => {
						window.removeEventListener("storage", onStorage);
						this.unmount();
					};
				}, "ui-prism: layer lifecycle");
				if (this.settings.enabled) this.mount();
				this.ready = true;
			}
			/** Notify the owner after construction completes (never mid-construction). */
			signal() {
				if (this.ready) this.notify();
			}
			/** Persist the settings document on a trailing 300ms debounce so rapid
			*  knob gestures never serialize the (possibly multi-megabyte) document
			*  at drag cadence. */
			persist() {
				if (this.persistTimer !== void 0) window.clearTimeout(this.persistTimer);
				this.persistTimer = window.setTimeout(() => {
					this.persistTimer = void 0;
					writeSettings(this.settings);
				}, 300);
			}
			/** Flush any pending debounced write immediately. */
			flushPersist() {
				if (this.persistTimer !== void 0) {
					window.clearTimeout(this.persistTimer);
					this.persistTimer = void 0;
					writeSettings(this.settings);
				}
			}
			/** Current enable state (the plugin card mirrors this). */
			getEnabled() {
				return this.settings.enabled;
			}
			/** Current knob document (the settings rows mirror this). */
			getSettings() {
				return {
					...this.settings,
					zones: { ...this.settings.zones },
					wallpaperDark: [...this.settings.wallpaperDark],
					wallpaperLight: [...this.settings.wallpaperLight]
				};
			}
			/** Whether the resolved palette is dark (brightness knob darkens). */
			getDark() {
				return this.dark;
			}
			/** Resolved scheme from the theme service (falls back to the body attribute). */
			resolveScheme() {
				try {
					return this.ctx.theme.getTheme().active.colorScheme === "dark";
				} catch {
					return document.body.hasAttribute("data-ds-dark-theme");
				}
			}
			/** Flip the master switch: mount or tear down the whole layer. */
			setEnabled(enabled) {
				if (enabled === this.settings.enabled) return;
				this.settings = {
					...this.settings,
					enabled
				};
				this.persist();
				if (enabled) this.mount();
				else this.unmount();
				this.signal();
			}
			/**
			* Merge a settings patch, clamp every numeric field, persist, then push the
			* touched knobs through the damping loop.
			* @param patch - fields to change (wallpaper lists replace whole).
			*/
			update(patch) {
				this.settings = clampSettings({
					...this.settings,
					...patch,
					zones: patch.zones === void 0 ? { ...this.settings.zones } : {
						...this.settings.zones,
						...patch.zones
					}
				});
				this.persist();
				if (!this.settings.enabled) return;
				this.applyDiscrete();
				this.applyAllKnobs();
				this.signal();
			}
			/** Apply a whole named preset (accent, hue, material, frost, brightness, contrast, motion). */
			applyPreset(preset) {
				const recipe = PRESETS[preset];
				this.update({
					accentHue: recipe.accentHue,
					bgHue: recipe.bgHue,
					material: recipe.material,
					frost: recipe.frost,
					bgBrightness: recipe.bgBrightness,
					motion: recipe.motion
				});
			}
			/** Reset every knob to the shipped defaults. */
			reset() {
				this.update({
					material: "frosted",
					blur: 18,
					frost: 50,
					bgBrightness: 50,
					fontScale: 100,
					fontChoice: "system",
					customFont: "",
					zones: {
						base: 100,
						sidebar: 100,
						card: 100,
						input: 100,
						overlay: 100,
						bubble: 100
					},
					inkLightHue: 222,
					inkLightSat: 30,
					inkLightLight: 12,
					inkDarkHue: 222,
					inkDarkSat: 30,
					inkDarkLight: 92,
					accentHue: 205,
					accentSat: 85,
					accentLight: 55,
					bgHue: 215,
					bgSat: 80,
					bgLight: 60,
					accentOpacity: 100,
					motion: 55,
					background: "aurora",
					wallpaperInterval: 30,
					wallpaperLoop: false,
					wallpaperPinnedDark: 0,
					wallpaperPinnedLight: 0,
					wallpaperBlur: 20,
					wallpaperFrost: 0
				});
			}
			/**
			* Ingest an uploaded wallpaper file for one scheme: downscale (or GIF
			* passthrough), auto-analyze luminance, and append to the rotation list.
			* @param scheme - which palette the wallpaper belongs to.
			* @param file - the picked file.
			* @returns null on success, or a typed rejection for the settings row.
			*/
			async setWallpaperFromFile(scheme, file) {
				const result = await readWallpaper(file);
				if (typeof result !== "string") return result;
				const luminance = await analyzeLuminance(result);
				if (scheme === "dark") this.update({
					wallpaperDark: [...this.settings.wallpaperDark, result],
					wallpaperDimDark: [...this.settings.wallpaperDimDark, luminance],
					background: "wallpaper"
				});
				else this.update({
					wallpaperLight: [...this.settings.wallpaperLight, result],
					wallpaperDimLight: [...this.settings.wallpaperDimLight, luminance],
					background: "wallpaper"
				});
				return null;
			}
			/** Remove one scheme's wallpaper at a rotation-list index. */
			clearWallpaper(scheme, index) {
				if (scheme === "dark") {
					const urls = this.settings.wallpaperDark.filter((_, i) => i !== index);
					const dims = this.settings.wallpaperDimDark.filter((_, i) => i !== index);
					this.update({
						wallpaperDark: urls,
						wallpaperDimDark: dims
					});
				} else {
					const urls = this.settings.wallpaperLight.filter((_, i) => i !== index);
					const dims = this.settings.wallpaperDimLight.filter((_, i) => i !== index);
					this.update({
						wallpaperLight: urls,
						wallpaperDimLight: dims
					});
				}
			}
			/** Toggle automatic rotation (on = cycle all images; off = pinned image). */
			setWallpaperLoop(loop) {
				if (loop) this.update({
					wallpaperLoop: true,
					wallpaperInterval: Math.max(10, this.settings.wallpaperInterval)
				});
				else this.update({ wallpaperLoop: false });
			}
			/** Pin one rotation-list image as the fixed background (stops the loop). */
			pinWallpaper(scheme, index) {
				if (scheme === "dark") this.update({
					wallpaperPinnedDark: index,
					wallpaperLoop: false,
					background: "wallpaper"
				});
				else this.update({
					wallpaperPinnedLight: index,
					wallpaperLoop: false,
					background: "wallpaper"
				});
			}
			/** Mount every layer-owned effect. */
			mount() {
				document.documentElement.setAttribute(PRISM_ATTRIBUTE, "");
				ensureAmbientScene();
				this.tokenDisposer?.();
				const overrides = {
					...buildTokenOverrides(),
					...buildFontOverrides()
				};
				this.tokenDisposer = this.ctx.theme.overrideTokens(OVERRIDE_SOURCE, overrides);
				this.applyDiscrete();
				this.applyAllKnobs();
			}
			/** Tear down every layer-owned effect (stock UI exactly). */
			unmount() {
				this.flushPersist();
				this.stopRotation();
				document.documentElement.removeAttribute(PRISM_ATTRIBUTE);
				document.documentElement.removeAttribute("data-prism-material");
				document.documentElement.removeAttribute("data-prism-still");
				document.documentElement.removeAttribute("data-prism-wallpaper-on");
				removeAmbientScene();
				this.tokenDisposer?.();
				this.tokenDisposer = void 0;
				this.stopLoop();
			}
			/** Discrete (non-damped) applications: material, fonts, backdrop source, wallpaper. */
			applyDiscrete() {
				const s = this.settings;
				const root = document.documentElement;
				root.setAttribute("data-prism-material", s.material);
				root.style.setProperty("--prism-saturate", `${String(MATERIALS[s.material].saturate)}%`);
				root.style.setProperty("--prism-depth", String(MATERIALS[s.material].depth));
				const family = s.fontChoice === "custom" && s.customFont.trim() !== "" ? s.customFont.trim() : FONT_CHOICES[s.fontChoice];
				root.style.setProperty("--prism-font-family", family === "" ? "var(--dsw-font-family)" : family);
				const codeFamily = s.fontChoice === "custom" && s.customFont.trim() !== "" ? s.customFont.trim() : CODE_FONT_CHOICES[s.fontChoice];
				root.style.setProperty("--prism-code-family", codeFamily === "" ? "var(--ds-font-family-code)" : codeFamily);
				this.applyWallpaperSource();
			}
			/** The active index: wall-clock rotation while looping, the pinned image
			*  otherwise (clicking a thumbnail pins it and stops the loop). */
			wallpaperIndex(urls) {
				const s = this.settings;
				if (urls.length === 0) return 0;
				if (s.wallpaperLoop && s.wallpaperInterval > 0 && urls.length > 1) return Math.floor(Date.now() / 1e3 / s.wallpaperInterval) % urls.length;
				const pinned = this.dark ? s.wallpaperPinnedDark : s.wallpaperPinnedLight;
				return Math.min(urls.length - 1, Math.max(0, pinned));
			}
			/** Point the wallpaper layer at the active scheme's rotating image. */
			applyWallpaperSource() {
				const s = this.settings;
				const urls = s.background === "wallpaper" ? this.dark ? s.wallpaperDark : s.wallpaperLight : [];
				const index = this.wallpaperIndex(urls);
				const url = urls.length === 0 ? "" : urls[index] ?? "";
				document.documentElement.toggleAttribute("data-prism-wallpaper-on", url !== "");
				const image = document.querySelector("[data-prism-wallpaper-img]");
				if (image !== null) {
					if (url === "") image.removeAttribute("src");
					else if (image.getAttribute("src") !== url) {
						image.setAttribute("src", url);
						image.style.animation = "none";
						image.offsetWidth;
						image.style.animation = "";
					}
				}
				this.scheduleRotation(urls);
				const dims = this.dark ? s.wallpaperDimDark : s.wallpaperDimLight;
				const dim = dims.length === 0 ? .5 : dims[index] ?? .5;
				const veil = Math.min(.75, veilAlpha(dim, this.dark) * .85 + s.wallpaperFrost / 100 * .6);
				document.documentElement.style.setProperty("--prism-wall-veil", String(veil));
			}
			/** Re-evaluate the rotation index exactly at the next boundary. */
			scheduleRotation(urls) {
				if (this.rotateTimer !== void 0) {
					window.clearTimeout(this.rotateTimer);
					this.rotateTimer = void 0;
				}
				const interval = this.settings.wallpaperInterval;
				if (!this.settings.wallpaperLoop || this.settings.background !== "wallpaper" || urls.length <= 1 || interval <= 0) return;
				const ms = interval * 1e3;
				const wait = ms - Date.now() % ms + 50;
				this.rotateTimer = window.setTimeout(() => {
					this.rotateTimer = void 0;
					this.applyWallpaperSource();
				}, wait);
			}
			/** Stop the rotation timer (unmount / wallpaper source change). */
			stopRotation() {
				if (this.rotateTimer !== void 0) {
					window.clearTimeout(this.rotateTimer);
					this.rotateTimer = void 0;
				}
			}
			/** Re-apply everything that changes with the light/dark scheme. */
			applySchemeDependent() {
				this.applyKnob("bgBrightness");
			}
			/** Push every knob through the damping loop (targets unchanged, positions glide). */
			applyAllKnobs() {
				this.applyKnob("blur");
				this.applyKnob("frost");
				this.applyKnob("bgBrightness");
				this.applyKnob("fontScale");
				this.applyKnob("zoneBase");
				this.applyKnob("zoneSidebar");
				this.applyKnob("zoneCard");
				this.applyKnob("zoneInput");
				this.applyKnob("zoneOverlay");
				this.applyKnob("zoneBubble");
				this.applyKnob("inkLightHue");
				this.applyKnob("inkLightSat");
				this.applyKnob("inkLightLight");
				this.applyKnob("inkDarkHue");
				this.applyKnob("inkDarkSat");
				this.applyKnob("inkDarkLight");
				this.applyKnob("accentHue");
				this.applyKnob("accentSat");
				this.applyKnob("accentLight");
				this.applyKnob("bgHue");
				this.applyKnob("bgSat");
				this.applyKnob("bgLight");
				this.applyKnob("accentOpacity");
				this.applyKnob("motion");
				this.applyKnob("wallpaperBlur");
				this.applyKnob("wallpaperFrost");
			}
			/** Set one knob's target and start (or skip) the damping loop. */
			applyKnob(key) {
				const target = this.knobTarget(key);
				let knob = this.knobs.get(key);
				if (knob === void 0) {
					knob = {
						spring: createSpring(target),
						target,
						apply: (value) => this.writeKnobVar(key, value)
					};
					this.knobs.set(key, knob);
				}
				knob.target = target;
				if (prefersReducedMotion()) {
					knob.spring = createSpring(target);
					knob.apply(target);
					return;
				}
				if (knob.spring.position === target && knob.spring.velocity === 0) {
					knob.apply(target);
					return;
				}
				this.startLoop();
			}
			/** Read the current target value for one knob. */
			knobTarget(key) {
				const s = this.settings;
				switch (key) {
					case "blur": return s.blur;
					case "frost": return s.frost;
					case "bgBrightness": return s.bgBrightness;
					case "fontScale": return s.fontScale;
					case "zoneBase": return s.zones.base;
					case "zoneSidebar": return s.zones.sidebar;
					case "zoneCard": return s.zones.card;
					case "zoneInput": return s.zones.input;
					case "zoneOverlay": return s.zones.overlay;
					case "zoneBubble": return s.zones.bubble;
					case "inkLightHue": return s.inkLightHue;
					case "inkLightSat": return s.inkLightSat;
					case "inkLightLight": return s.inkLightLight;
					case "inkDarkHue": return s.inkDarkHue;
					case "inkDarkSat": return s.inkDarkSat;
					case "inkDarkLight": return s.inkDarkLight;
					case "accentHue": return s.accentHue;
					case "accentSat": return s.accentSat;
					case "accentLight": return s.accentLight;
					case "bgHue": return s.bgHue;
					case "bgSat": return s.bgSat;
					case "bgLight": return s.bgLight;
					case "accentOpacity": return s.accentOpacity;
					case "motion": return s.motion;
					case "wallpaperBlur": return s.wallpaperBlur;
					case "wallpaperFrost": return s.wallpaperFrost;
				}
			}
			/** Write one smoothed knob value to its `--prism-*` variables. */
			writeKnobVar(key, value) {
				const style = document.documentElement.style;
				switch (key) {
					case "blur":
						style.setProperty("--prism-blur", `${String(value)}px`);
						return;
					case "frost":
						style.setProperty("--prism-frost", String(Math.min(value / 50, 1.4)));
						return;
					case "bgBrightness": {
						const dark = this.dark;
						style.setProperty("--prism-brightness-black", String(dark ? Math.max(0, (50 - value) / 50) : 0));
						style.setProperty("--prism-brightness-white", String(dark ? 0 : Math.max(0, (value - 50) / 50)));
						return;
					}
					case "fontScale":
						style.setProperty("--prism-font-scale", String(value / 100));
						return;
					case "zoneBase":
						style.setProperty("--prism-zone-base", String(value / 100));
						return;
					case "zoneSidebar":
						style.setProperty("--prism-zone-sidebar", String(value / 100));
						return;
					case "zoneCard":
						style.setProperty("--prism-zone-card", String(value / 100));
						return;
					case "zoneInput":
						style.setProperty("--prism-zone-input", String(value / 100));
						return;
					case "zoneOverlay":
						style.setProperty("--prism-zone-overlay", String(value / 100));
						return;
					case "zoneBubble":
						style.setProperty("--prism-zone-bubble", String(value / 100));
						return;
					case "inkLightHue":
						style.setProperty("--prism-ink-light-h", String(value));
						return;
					case "inkLightSat":
						style.setProperty("--prism-ink-light-s", `${String(value)}%`);
						return;
					case "inkLightLight":
						style.setProperty("--prism-ink-light-l", `${String(value)}%`);
						return;
					case "inkDarkHue":
						style.setProperty("--prism-ink-dark-h", String(value));
						return;
					case "inkDarkSat":
						style.setProperty("--prism-ink-dark-s", `${String(value)}%`);
						return;
					case "inkDarkLight":
						style.setProperty("--prism-ink-dark-l", `${String(value)}%`);
						return;
					case "accentHue":
						style.setProperty("--prism-accent-h", String(value));
						return;
					case "accentSat":
						style.setProperty("--prism-accent-s", `${String(value)}%`);
						return;
					case "accentLight":
						style.setProperty("--prism-accent-l", `${String(value)}%`);
						return;
					case "bgHue":
						style.setProperty("--prism-bg-h", String(value));
						return;
					case "bgSat":
						style.setProperty("--prism-bg-s", `${String(value)}%`);
						return;
					case "bgLight":
						style.setProperty("--prism-bg-l", `${String(value)}%`);
						return;
					case "accentOpacity":
						style.setProperty("--prism-accent-a", String(value / 100));
						return;
					case "motion":
						style.setProperty("--prism-motion", String(value / 100));
						style.setProperty("--prism-motion-scale", String(.2 + .8 * (value / 100)));
						document.documentElement.toggleAttribute("data-prism-still", value < 1);
						return;
					case "wallpaperBlur": {
						const px = Math.pow(value / 100, 2) * 20;
						style.setProperty("--prism-wallpaper-blur", `${String(px)}px`);
						return;
					}
					case "wallpaperFrost": {
						style.setProperty("--prism-wallpaper-frost", String(value / 100));
						const dim = this.dark ? this.settings.wallpaperDimDark[this.wallpaperIndex(this.dark ? this.settings.wallpaperDark : this.settings.wallpaperLight)] ?? .5 : this.settings.wallpaperDimLight[this.wallpaperIndex(this.dark ? this.settings.wallpaperDark : this.settings.wallpaperLight)] ?? .5;
						const veil = Math.min(.75, veilAlpha(dim, this.dark) * .85 + value / 100 * .6);
						style.setProperty("--prism-wall-veil", String(veil));
						return;
					}
				}
			}
			/** Run the shared rAF loop until every spring settles. */
			startLoop() {
				if (this.rafId !== void 0) return;
				const step = (timestamp) => {
					const dt = this.lastFrame === void 0 ? 0 : Math.min((timestamp - this.lastFrame) / 1e3, .1);
					this.lastFrame = timestamp;
					let running = false;
					for (const knob of this.knobs.values()) {
						advanceSpring(knob.spring, knob.target, dt);
						knob.apply(knob.spring.position);
						if (!springSettled(knob.spring, knob.target)) running = true;
					}
					if (running) this.rafId = requestAnimationFrame(step);
					else this.stopLoop();
				};
				this.rafId = requestAnimationFrame(step);
			}
			/** Stop the shared rAF loop (keeps the springs' last positions). */
			stopLoop() {
				if (this.rafId !== void 0) {
					cancelAnimationFrame(this.rafId);
					this.rafId = void 0;
				}
				this.lastFrame = void 0;
			}
		};
		/** Clamp every numeric field into its declared range. */
		function clampSettings(settings) {
			const material = settings.material === "clear" || settings.material === "velvet" ? settings.material : "frosted";
			const fontChoice = settings.fontChoice === "rounded" || settings.fontChoice === "serif" || settings.fontChoice === "mono" || settings.fontChoice === "custom" ? settings.fontChoice : "system";
			const background = settings.background === "wallpaper" ? "wallpaper" : "aurora";
			return {
				...settings,
				material,
				fontChoice,
				background,
				blur: clampValue(settings.blur, RANGES.blur.min, RANGES.blur.max, 18),
				frost: clampValue(settings.frost, RANGES.frost.min, RANGES.frost.max, 50),
				bgBrightness: clampValue(settings.bgBrightness, RANGES.bgBrightness.min, RANGES.bgBrightness.max, 50),
				fontScale: clampValue(settings.fontScale, RANGES.fontScale.min, RANGES.fontScale.max, 100),
				zones: {
					base: clampValue(settings.zones.base, RANGES.zone.min, RANGES.zone.max, 100),
					sidebar: clampValue(settings.zones.sidebar, RANGES.zone.min, RANGES.zone.max, 100),
					card: clampValue(settings.zones.card, RANGES.zone.min, RANGES.zone.max, 100),
					input: clampValue(settings.zones.input, RANGES.zone.min, RANGES.zone.max, 100),
					overlay: clampValue(settings.zones.overlay, RANGES.zone.min, RANGES.zone.max, 100),
					bubble: clampValue(settings.zones.bubble, RANGES.zone.min, RANGES.zone.max, 100)
				},
				inkLightHue: clampValue(settings.inkLightHue, RANGES.hue.min, RANGES.hue.max, 222),
				inkLightSat: clampValue(settings.inkLightSat, RANGES.sat.min, RANGES.sat.max, 30),
				inkLightLight: clampValue(settings.inkLightLight, RANGES.light.min, RANGES.light.max, 12),
				inkDarkHue: clampValue(settings.inkDarkHue, RANGES.hue.min, RANGES.hue.max, 222),
				inkDarkSat: clampValue(settings.inkDarkSat, RANGES.sat.min, RANGES.sat.max, 30),
				inkDarkLight: clampValue(settings.inkDarkLight, RANGES.light.min, RANGES.light.max, 92),
				accentHue: clampValue(settings.accentHue, RANGES.hue.min, RANGES.hue.max, 205),
				accentSat: clampValue(settings.accentSat, RANGES.sat.min, RANGES.sat.max, 85),
				accentLight: clampValue(settings.accentLight, RANGES.light.min, RANGES.light.max, 55),
				bgHue: clampValue(settings.bgHue, RANGES.hue.min, RANGES.hue.max, 215),
				bgSat: clampValue(settings.bgSat, RANGES.sat.min, RANGES.sat.max, 80),
				bgLight: clampValue(settings.bgLight, RANGES.light.min, RANGES.light.max, 60),
				accentOpacity: clampValue(settings.accentOpacity, RANGES.accentOpacity.min, RANGES.accentOpacity.max, 100),
				motion: clampValue(settings.motion, RANGES.motion.min, RANGES.motion.max, 55),
				wallpaperInterval: clampValue(settings.wallpaperInterval, RANGES.wallpaperInterval.min, RANGES.wallpaperInterval.max, 30),
				wallpaperPinnedDark: clampValue(settings.wallpaperPinnedDark, 0, 999, 0),
				wallpaperPinnedLight: clampValue(settings.wallpaperPinnedLight, 0, 999, 0),
				wallpaperBlur: clampValue(settings.wallpaperBlur, RANGES.wallpaperBlur.min, RANGES.wallpaperBlur.max, 20),
				wallpaperFrost: clampValue(settings.wallpaperFrost, RANGES.wallpaperFrost.min, RANGES.wallpaperFrost.max, 0)
			};
		}
		/** Create (once) the fixed ambient scene: aurora, wallpaper, brightness veil. */
		function ensureAmbientScene() {
			if (document.querySelector("[data-prism-ambient]") !== null) return;
			const root = document.createElement("div");
			root.dataset.prismAmbient = "";
			const aurora = document.createElement("div");
			aurora.dataset.prismAurora = "";
			const wallpaper = document.createElement("div");
			wallpaper.dataset.prismWallpaper = "";
			const image = document.createElement("img");
			image.dataset.prismWallpaperImg = "";
			image.alt = "";
			wallpaper.appendChild(image);
			const brightness = document.createElement("div");
			brightness.dataset.prismBrightness = "";
			root.append(aurora, wallpaper, brightness);
			document.body.appendChild(root);
			const grain = document.createElement("div");
			grain.dataset.prismGrain = "";
			document.body.appendChild(grain);
		}
		/** Remove the ambient scene (unmount restores the stock DOM). */
		function removeAmbientScene() {
			document.querySelector("[data-prism-ambient]")?.remove();
			document.querySelector("[data-prism-grain]")?.remove();
		}
		//#endregion
		//#region \0dsh-css:/Users/manton/CC/projects/deepseek-harness/packages/client/ui-prism/src/client/prism.module.css.mjs
		const css = "[data-prism-ambient]{z-index:-1;pointer-events:none;position:fixed;inset:0;overflow:hidden}[data-prism-aurora]{background-image:radial-gradient(38% 32% at 22% 18%, hsl(var(--prism-bg-h,215) var(--prism-bg-s,80%) var(--prism-bg-l,60%) / calc(.2 * var(--prism-motion,.5))), transparent 62%), radial-gradient(34% 30% at 78% 26%, hsl(calc(var(--prism-bg-h,215) + 60) var(--prism-bg-s,80%) var(--prism-bg-l,60%) / calc(.16 * var(--prism-motion,.5))), transparent 62%), radial-gradient(42% 36% at 52% 92%, hsl(calc(var(--prism-bg-h,215) + 120) var(--prism-bg-s,80%) var(--prism-bg-l,60%) / calc(.14 * var(--prism-motion,.5))), transparent 64%);animation:-k9y3W_prism-aurora-drift 46s var(--ds-ease-in-out,ease-in-out) infinite alternate, -k9y3W_prism-aurora-breathe 9s var(--ds-ease-in-out,ease-in-out) infinite alternate;animation-duration:calc(46s / var(--prism-motion-scale,1)), calc(9s / var(--prism-motion-scale,1));background-size:200% 200%;position:absolute;inset:-22%}@keyframes -k9y3W_prism-aurora-drift{0%{background-position:0 0,100% 100%,50%}to{background-position:100% 100%,0 0,50% 100%}}@keyframes -k9y3W_prism-aurora-breathe{0%{opacity:.82}to{opacity:1}}[data-prism-brightness]{background-image:linear-gradient(rgb(255 255 255/var(--prism-brightness-white,0)), rgb(255 255 255/var(--prism-brightness-white,0))), linear-gradient(rgb(0 0 0/var(--prism-brightness-black,0)), rgb(0 0 0/var(--prism-brightness-black,0)));position:absolute;inset:0}[data-prism-wallpaper]{display:none;position:absolute;inset:0}[data-dsh-prism][data-prism-wallpaper-on] [data-prism-wallpaper]{display:block}[data-prism-wallpaper-img]{object-fit:cover;width:100%;height:100%;filter:blur(var(--prism-wallpaper-blur,0px));animation:-k9y3W_prism-wallpaper-in .8s var(--ds-ease-in-out,ease-in-out)}@keyframes -k9y3W_prism-wallpaper-in{0%{opacity:0}to{opacity:1}}[data-prism-wallpaper]:after{content:\"\";background:rgb(255 255 255/var(--prism-wall-veil,0));position:absolute;inset:0}[data-dsh-prism] body[data-ds-dark-theme] [data-prism-wallpaper]:after{background:rgb(8 12 20/var(--prism-wall-veil,0))}[data-dsh-prism] [class*=frame],[data-dsh-prism] [data-phase],[data-dsh-prism] [class*=detailsCol]{background:0 0}[data-dsh-prism] [class*=sidebarCol],[data-dsh-prism] header,[data-dsh-prism] [data-composer-card],[data-dsh-prism] [class*=bubble],[data-dsh-prism] [role=menu],[data-dsh-prism] [class*=card],[data-dsh-prism] [class*=panel],[data-dsh-prism] [class*=popover],[data-dsh-prism] [class*=dropdown]{-webkit-backdrop-filter:blur(var(--prism-blur,18px)) saturate(var(--prism-saturate,130%))}[data-dsh-prism] body [role=dialog]{background:rgb(255 255 255/calc(.45 * var(--prism-frost,1)));-webkit-backdrop-filter:blur(50px) saturate(var(--prism-saturate,130%))}[data-dsh-prism] body[data-ds-dark-theme] [role=dialog]{background:rgb(17 26 39/calc(.55 * var(--prism-frost,1)))}[data-dsh-prism] [class*=sidebarCol]:has([role=dialog]){-webkit-backdrop-filter:none}[data-dsh-prism] [class*=sidebarCol]{z-index:9;background:rgb(255 255 255/calc(.85 * var(--prism-frost) * var(--prism-depth,1) * var(--prism-zone-sidebar,1)));border:1px solid #132d5342;border-right-color:#96bef5a6;border-radius:20px;margin:10px;padding:10px 8px 14px;position:relative;overflow:hidden;box-shadow:inset 0 1px #ffffff80,0 10px 34px #132d5329}[data-dsh-prism] body[data-ds-dark-theme] [class*=sidebarCol]{background:rgb(34 38 47/calc(.85 * var(--prism-frost) * var(--prism-depth,1) * var(--prism-zone-sidebar,1)));border-color:#94b4dc52 #94b4dc33 #94b4dc52 #94b4dc52;border-right-style:solid;border-right-width:1px;box-shadow:inset 0 1px #ffffff12,0 8px 30px #02060e52}[data-dsh-prism] [class*=handle][data-side=sidebar]{z-index:10;margin-left:-14px}[data-dsh-prism] :has(>[class*=sidebarCol]):not([data-sidebar-collapsed]) [class*=sidebarCol]>[data-slot=sidebar]>[class*=root]{width:100%!important}[data-dsh-prism] [data-sidebar-collapsed] [class*=sidebarCol]{box-shadow:none;border:none;border-radius:0;margin:0;padding:0}[data-dsh-prism] header{background:var(--dsw-alias-bg-layer-2);border:1px solid #132d5342;border-bottom-color:#0000;border-radius:20px;margin:12px 16px 0;padding:10px 16px 8px;box-shadow:inset 0 1px #ffffff80,0 10px 34px #132d5329}[data-dsh-prism] header:after{display:none}[data-dsh-prism] body[data-ds-dark-theme] header{border-color:#94b4dc52 #94b4dc52 #0000;box-shadow:inset 0 1px #ffffff12,0 8px 30px #02060e52}[data-dsh-prism] [data-composer-card],[data-dsh-prism] [data-composer-card]:after{border-radius:24px}[data-dsh-prism] [data-composer-card]{z-index:8;background:var(--dsw-specific-input-major);border:1px solid #132d5342;position:relative;box-shadow:inset 0 1px #ffffff80,0 10px 36px #132d5329}[data-dsh-prism] body[data-ds-dark-theme] [data-composer-card]{border-color:#94b4dc52;box-shadow:inset 0 1px #ffffff12,0 10px 36px #02060e80}[data-dsh-prism] [data-phase] [class*=composerSeat][class*=composerSeat]{background:0 0}[data-dsh-prism] [data-conversation-composer-overlay]{background:rgb(255 255 255/calc(.85 * var(--prism-frost) * var(--prism-depth,1) * var(--prism-zone-card,1)));-webkit-backdrop-filter:blur(var(--prism-blur,18px)) saturate(var(--prism-saturate,130%));border:1px solid #132d5342;border-radius:24px;box-shadow:inset 0 1px #ffffff80,0 10px 36px #132d5329}[data-dsh-prism] body[data-ds-dark-theme] [data-conversation-composer-overlay]{background:rgb(34 38 47/calc(.85 * var(--prism-frost) * var(--prism-depth,1) * var(--prism-zone-card,1)));border-color:#94b4dc52;box-shadow:inset 0 1px #ffffff12,0 10px 36px #02060e80}[data-dsh-prism] [data-conversation-composer-overlay] [role=toolbar]{background:0 0}[data-dsh-prism] [class*=bubble]{background:var(--dsw-specific-bubble);border:1px solid #132d5324;border-radius:14px}[data-dsh-prism] body[data-ds-dark-theme] [class*=bubble]{border-color:#94b4dc24}[data-dsh-prism] [role=menu]{background:var(--dsw-specific-menu);border-radius:14px}[data-dsh-prism] [role=menu],[data-dsh-prism] [class*=card],[data-dsh-prism] [class*=panel]{border-radius:14px}[data-dsh-prism] button[class*=button]{border-radius:10px}[data-dsh-prism] [class*=iconButton],[data-dsh-prism] [class*=searchButton]{border-radius:8px}[data-dsh-prism] svg circle[class*=track]{stroke:var(--dsw-alias-border-l3)}[data-dsh-prism] svg circle[class*=fill]{stroke:hsl(var(--prism-accent-h) var(--prism-accent-s) var(--prism-accent-l) / var(--prism-accent-a,1))}[data-dsh-prism] [class*=marker] [class*=line]{background:hsl(var(--prism-accent-h) var(--prism-accent-s) var(--prism-accent-l) / var(--prism-accent-a,1))}[data-dsh-prism] [class*=marker][data-proximity=selected] [class*=line]{filter:brightness(1.25)}[data-dsh-prism] [class*=rail] [class*=preview]{-webkit-backdrop-filter:blur(var(--prism-blur,18px)) saturate(var(--prism-saturate,130%))}[data-dsh-prism] [data-conversation-scroll]{text-shadow:0 0 1px #00000059}[data-dsh-prism] body:not([data-ds-dark-theme]) [data-conversation-scroll]{text-shadow:0 0 1px #ffffff80,0 1px 2px #132d5314}[data-dsh-prism] :focus-visible{outline:2px solid hsl(var(--prism-accent-h) var(--prism-accent-s) var(--prism-accent-l));outline-offset:1px}[data-dsh-prism] ::selection{background:hsl(var(--prism-accent-h) var(--prism-accent-s) var(--prism-accent-l) / .35)}[data-dsh-prism] button[class*=button]:hover:not(:disabled),[data-dsh-prism] [role=menuitem]:hover:not(:disabled){box-shadow:0 0 12px hsl(var(--prism-accent-h) var(--prism-accent-s) var(--prism-accent-l) / .18), inset 0 0 0 1px #94b4dc38}[data-dsh-prism]:not([data-prism-still]) [data-phase=hero],[data-dsh-prism]:not([data-prism-still]) [data-phase=active]{animation:-k9y3W_prism-fade-in calc(.32s / var(--prism-motion-scale,1)) var(--ds-ease-in-out,ease-in-out)}[data-dsh-prism]:not([data-prism-still]) [role=dialog]{animation:-k9y3W_prism-dialog-in calc(.24s / var(--prism-motion-scale,1)) var(--ds-ease-in-out,ease-in-out)}@keyframes -k9y3W_prism-fade-in{0%{opacity:0}}@keyframes -k9y3W_prism-dialog-in{0%{opacity:0;transform:translateY(8px)scale(.985)}}[data-dsh-prism][data-prism-still] [data-prism-aurora],[data-dsh-prism][data-prism-still] [data-phase=hero],[data-dsh-prism][data-prism-still] [data-phase=active],[data-dsh-prism][data-prism-still] [role=dialog]{animation:none}@media (prefers-reduced-motion:reduce){[data-dsh-prism] [data-prism-aurora],[data-dsh-prism] [data-phase=hero],[data-dsh-prism] [data-phase=active],[data-dsh-prism] [role=dialog]{animation:none}[data-dsh-prism] [data-prism-wallpaper]{display:none}}[data-prism-grain]{display:none}[data-dsh-prism][data-prism-material=velvet] [data-prism-grain]{z-index:2147482000;pointer-events:none;mix-blend-mode:soft-light;opacity:.4;background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\"),linear-gradient(115deg,#ffffff0d,#0000 45%,#0000000a 90%);display:block;position:fixed;inset:0}[data-dsh-prism][data-prism-material=velvet] [class*=sidebarCol],[data-dsh-prism][data-prism-material=velvet] header,[data-dsh-prism][data-prism-material=velvet] [data-composer-card],[data-dsh-prism][data-prism-material=velvet] [class*=bubble],[data-dsh-prism][data-prism-material=velvet] [data-conversation-composer-overlay]{-webkit-backdrop-filter:blur(calc(var(--prism-blur,18px) + 4px)) saturate(var(--prism-saturate,130%));box-shadow:inset 0 1px 3px #0000001a,inset 0 -1px 2px #ffffff0d,0 10px 30px #02060e59}@media (prefers-reduced-motion:reduce){[data-dsh-prism] [data-prism-grain]{display:none}}";
		const tagId = "@deepseek-ai/dsh-client-ui-prism/prism.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@deepseek-ai/dsh-client-ui-prism";
			tag.dataset.pluginCss = tagId;
			tag.textContent = css;
			document.head.appendChild(tag);
		}
		//#endregion
		//#region src/client/index.ts
		/** Required services: theme override stack plus the settings-card surfaces. */
		const inject = [
			"theme",
			"slots",
			"locale"
		];
		/**
		* Client plugin body.
		* @param ctx - client cordis context.
		*/
		function apply(ctx) {
			ctx.effect(() => ctx.locale.register(NS, {
				zh,
				en
			}), "ui-prism: settings dictionaries");
			const pluginStore = createPrismRowStore();
			const appearanceStore = createPrismRowStore();
			let pluginBound;
			let appearanceBound;
			let revision = 0;
			const layer = new PrismLayer(ctx, () => {
				sync();
			});
			const payload = () => ({
				...layer.getSettings(),
				dark: layer.getDark()
			});
			const sync = () => {
				const next = payload();
				pluginBound?.sync(next, revision);
				appearanceBound?.sync(next, revision);
				revision += 1;
			};
			const pluginInjected = (actions) => {
				pluginBound = actions;
				sync();
				return { setEnabled: (enabled) => {
					layer.setEnabled(enabled);
				} };
			};
			const appearanceInjected = (actions) => {
				appearanceBound = actions;
				sync();
				return {
					setMaterial: (material) => {
						layer.update({ material });
					},
					setBlur: (blur) => {
						layer.update({ blur });
					},
					setFrost: (frost) => {
						layer.update({ frost });
					},
					setBgBrightness: (bgBrightness) => {
						layer.update({ bgBrightness });
					},
					setFontScale: (fontScale) => {
						layer.update({ fontScale });
					},
					setFontChoice: (fontChoice) => {
						layer.update({ fontChoice });
					},
					setCustomFont: (customFont) => {
						layer.update({ customFont });
					},
					setZone: (zone, value) => {
						const patch = {};
						patch[zone] = value;
						layer.update({ zones: patch });
					},
					setInkLightColor: (inkLightHue, inkLightSat, inkLightLight) => {
						layer.update({
							inkLightHue,
							inkLightSat,
							inkLightLight
						});
					},
					setInkDarkColor: (inkDarkHue, inkDarkSat, inkDarkLight) => {
						layer.update({
							inkDarkHue,
							inkDarkSat,
							inkDarkLight
						});
					},
					setAccentColor: (accentHue, accentSat, accentLight) => {
						layer.update({
							accentHue,
							accentSat,
							accentLight
						});
					},
					setBgColor: (bgHue, bgSat, bgLight) => {
						layer.update({
							bgHue,
							bgSat,
							bgLight
						});
					},
					setAccentOpacity: (accentOpacity) => {
						layer.update({ accentOpacity });
					},
					setMotion: (motion) => {
						layer.update({ motion });
					},
					setBackground: (background) => {
						layer.update({ background });
					},
					setWallpaperInterval: (wallpaperInterval) => {
						layer.update({ wallpaperInterval });
					},
					setWallpaperLoop: (wallpaperLoop) => {
						layer.setWallpaperLoop(wallpaperLoop);
					},
					pinWallpaper: (scheme, index) => {
						layer.pinWallpaper(scheme, index);
					},
					setWallpaperBlur: (wallpaperBlur) => {
						layer.update({ wallpaperBlur });
					},
					setWallpaperFrost: (wallpaperFrost) => {
						layer.update({ wallpaperFrost });
					},
					pickWallpaper: (scheme, file) => layer.setWallpaperFromFile(scheme, file),
					clearWallpaper: (scheme, index) => {
						layer.clearWallpaper(scheme, index);
					},
					applyPreset: (preset) => {
						layer.applyPreset(preset);
					},
					reset: () => {
						layer.reset();
					}
				};
			};
			ctx.slots.inject("settings.plugin.item", () => ctx.slots.register({
				name: "settings.plugin.item",
				id: "prism",
				order: 6,
				store: pluginStore,
				locale: NS,
				inject: pluginInjected
			}, PrismPluginCard));
			ctx.slots.inject("settings.general.item", () => ctx.slots.register({
				name: "settings.general.item",
				id: "prism",
				order: 12,
				store: appearanceStore,
				locale: NS,
				inject: appearanceInjected
			}, PrismAppearancePanel));
		}
		//#endregion
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});

//# sourceMappingURL=client.js.map