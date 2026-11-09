window.__ModuleLoader__.load({
	id: "@deepseek-ai/dsh-client-ui-prism",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react = require("react");
		require("@deepseek-ai/dsh-client-ui-primitives");
		let react_jsx_runtime = require("react/jsx-runtime");
		let _deepseek_ai_dsh_client_store = require("@deepseek-ai/dsh-client-store");
		// src/client/color.ts
		/** Clamp a channel into [min, max] with a fallback. */
		function clampChannel(value, min, max, fallback) {
			const n = value;
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
		// \0prism-css:src/client/PrismControls.module.css.mjs
		const css$2 = ".orGz7a_sliderRow{grid-template-columns:minmax(96px,.85fr) minmax(100px,1.5fr) 52px;align-items:center;gap:14px;min-height:36px;display:grid}.orGz7a_sliderLabel{color:var(--dsw-alias-label-secondary);font-size:13px;line-height:20px}.orGz7a_sliderTrack{cursor:pointer;touch-action:none;border-radius:999px;outline:none;height:24px;position:relative}.orGz7a_sliderTrack:before{content:\"\";background:var(--dsw-alias-border-l2);height:4px;box-shadow:inset 0 0 0 .5px var(--dsw-alias-border-l1);border-radius:999px;transition:background-color .16s;position:absolute;top:10px;left:0;right:0}.orGz7a_sliderTrack:hover:before{background:var(--dsw-alias-border-l3)}.orGz7a_sliderTrack:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:2px}.orGz7a_sliderFill{background:var(--dsw-alias-state-business-primary);pointer-events:none;border-radius:999px;height:4px;position:absolute;top:10px;left:0}.orGz7a_sliderThumb{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);width:14px;height:14px;box-shadow:0 1px 4px #0f1e3233, inset 0 0 0 3px var(--dsw-alias-state-business-primary);pointer-events:none;border-radius:50%;margin-left:-7px;transition:box-shadow .14s,scale .14s;position:absolute;top:5px}.orGz7a_sliderTrack:hover .orGz7a_sliderThumb{scale:1.08}.orGz7a_sliderTrack:active .orGz7a_sliderThumb{box-shadow:0 1px 4px #0f1e3233, inset 0 0 0 4px var(--dsw-alias-state-business-primary);scale:1.16}.orGz7a_sliderReadout{color:var(--dsw-alias-label-secondary);font-variant-numeric:tabular-nums;text-align:right;white-space:nowrap;font-size:12px;line-height:20px}.orGz7a_sliderReadout span{color:var(--dsw-alias-label-tertiary);margin-left:1px}.orGz7a_segmented{border:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-base);border-radius:10px;gap:3px;padding:3px;display:flex}.orGz7a_seg,.orGz7a_segActive{cursor:pointer;border:0;border-radius:7px;flex:1;min-width:0;min-height:30px;padding:4px 10px;font-size:12px;line-height:20px;transition:background-color .14s,color .14s,box-shadow .14s}.orGz7a_seg{color:var(--dsw-alias-label-secondary);background:0 0}.orGz7a_seg:hover{color:var(--dsw-alias-label-primary);background:var(--dsw-alias-interactive-bg-hover)}.orGz7a_segActive{color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-layer-1);box-shadow:0 1px 4px #1423371f, inset 0 0 0 1px var(--dsw-alias-border-l1);font-weight:500}.orGz7a_seg:focus-visible,.orGz7a_segActive:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:1px}.orGz7a_button{cursor:pointer;white-space:nowrap;border:1px solid #0000;border-radius:8px;justify-content:center;align-items:center;gap:6px;min-height:32px;padding:5px 12px;font-size:12px;font-weight:500;line-height:20px;transition:background-color .14s,border-color .14s,color .14s,box-shadow .14s,translate .1s;display:inline-flex}.orGz7a_button:active:not(:disabled){translate:0 1px}.orGz7a_button:disabled{cursor:not-allowed;opacity:.45}.orGz7a_button:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:2px}.orGz7a_buttonPrimary{color:var(--dsw-alias-label-primary-inverted);background:var(--dsw-alias-button-primary-fill)}.orGz7a_buttonPrimary:hover:not(:disabled){background:var(--dsw-alias-button-primary-hover);filter:brightness(1.04)}.orGz7a_buttonSecondary{color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-bg-layer-1);border-color:var(--dsw-alias-border-l2)}.orGz7a_buttonSecondary:hover:not(:disabled){color:var(--dsw-alias-label-primary);background:var(--dsw-alias-interactive-bg-hover);border-color:var(--dsw-alias-border-l3)}.orGz7a_buttonQuiet{color:var(--dsw-alias-label-secondary);background:0 0}.orGz7a_buttonQuiet:hover:not(:disabled){color:var(--dsw-alias-label-primary);background:var(--dsw-alias-interactive-bg-hover)}.orGz7a_buttonDanger{color:var(--dsw-alias-label-secondary);background:0 0}.orGz7a_buttonDanger:hover:not(:disabled){color:#d84646;background:var(--dsw-alias-interactive-bg-hover-danger)}.orGz7a_switch,.orGz7a_switchOn{border:1px solid var(--dsw-alias-border-l2);cursor:pointer;border-radius:999px;flex:none;width:38px;height:22px;padding:0;transition:background-color .18s,border-color .18s,box-shadow .14s;position:relative}.orGz7a_switch{background:var(--dsw-alias-border-l2)}.orGz7a_switchOn{background:var(--dsw-alias-state-business-primary);border-color:#0000}.orGz7a_switch:focus-visible,.orGz7a_switchOn:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:2px}.orGz7a_switchThumb{background:#fff;border-radius:50%;width:14px;height:14px;transition:translate .18s cubic-bezier(.2,.8,.2,1);position:absolute;top:3px;left:3px;box-shadow:0 1px 3px #00000038}.orGz7a_switchOn .orGz7a_switchThumb{translate:16px}.orGz7a_group{border-bottom:1px solid var(--dsw-alias-border-l2)}.orGz7a_groupToggle{width:100%;min-height:44px;color:var(--dsw-alias-label-primary);cursor:pointer;text-align:left;background:0 0;border:0;justify-content:space-between;align-items:center;padding:10px 0;display:flex}.orGz7a_groupToggle:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:2px}.orGz7a_groupTitle{font-size:14px;font-weight:500;line-height:22px}.orGz7a_groupChevron,.orGz7a_groupChevronOpen{color:var(--dsw-alias-label-tertiary);transition:rotate .18s;display:inline-flex}.orGz7a_groupChevronOpen{rotate:180deg}.orGz7a_groupBody{flex-direction:column;gap:12px;padding:2px 0 18px;display:flex}.orGz7a_colorRow{grid-template-columns:minmax(100px,1fr) 104px 34px;align-items:center;gap:10px;min-height:36px;display:grid}.orGz7a_colorHex{border:1px solid var(--dsw-alias-border-l2);width:100%;min-width:0;height:32px;color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-bg-base);font-family:var(--ds-font-family-code,monospace);text-transform:lowercase;border-radius:7px;padding:4px 8px;font-size:11px;line-height:20px}.orGz7a_colorHex:hover{border-color:var(--dsw-alias-border-l3)}.orGz7a_colorHex:focus{border-color:var(--dsw-alias-state-business-primary);outline:2px solid var(--dsw-alias-interactive-bg-hover-accent)}.orGz7a_colorInput{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);cursor:pointer;border-radius:7px;width:34px;height:32px;padding:3px}.orGz7a_colorInput:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:2px}.orGz7a_colorInput::-webkit-color-swatch-wrapper{padding:0}.orGz7a_colorInput::-webkit-color-swatch{border:0;border-radius:4px}@media (width<=480px){.orGz7a_sliderRow{grid-template-columns:minmax(84px,.8fr) minmax(80px,1.2fr) 46px;gap:10px}.orGz7a_colorRow{grid-template-columns:minmax(84px,1fr) 94px 34px;gap:8px}}@media (prefers-reduced-motion:reduce){.orGz7a_seg,.orGz7a_segActive,.orGz7a_button,.orGz7a_switch,.orGz7a_switchOn,.orGz7a_switchThumb,.orGz7a_sliderThumb,.orGz7a_groupChevron,.orGz7a_groupChevronOpen{transition:none}}";
		const tagId$2 = "@deepseek-ai/dsh-client-ui-prism/PrismControls.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$2) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@deepseek-ai/dsh-client-ui-prism";
			tag.dataset.pluginCss = tagId$2;
			tag.textContent = css$2;
			document.head.appendChild(tag);
		}
		var PrismControls_module_css_default = {
			"button": "orGz7a_button",
			"buttonDanger": "orGz7a_buttonDanger",
			"buttonPrimary": "orGz7a_buttonPrimary",
			"buttonQuiet": "orGz7a_buttonQuiet",
			"buttonSecondary": "orGz7a_buttonSecondary",
			"colorHex": "orGz7a_colorHex",
			"colorInput": "orGz7a_colorInput",
			"colorRow": "orGz7a_colorRow",
			"group": "orGz7a_group",
			"groupBody": "orGz7a_groupBody",
			"groupChevron": "orGz7a_groupChevron",
			"groupChevronOpen": "orGz7a_groupChevronOpen",
			"groupTitle": "orGz7a_groupTitle",
			"groupToggle": "orGz7a_groupToggle",
			"seg": "orGz7a_seg",
			"segActive": "orGz7a_segActive",
			"segmented": "orGz7a_segmented",
			"sliderFill": "orGz7a_sliderFill",
			"sliderLabel": "orGz7a_sliderLabel",
			"sliderReadout": "orGz7a_sliderReadout",
			"sliderRow": "orGz7a_sliderRow",
			"sliderThumb": "orGz7a_sliderThumb",
			"sliderTrack": "orGz7a_sliderTrack",
			"switch": "orGz7a_switch",
			"switchOn": "orGz7a_switchOn",
			"switchThumb": "orGz7a_switchThumb"
		};
		// src/client/controls.tsx
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
		function PrismSlider({ label, value, min, max, step, unit, onChange, defaultValue, resetHint }) {
			const trackRef = (0, react.useRef)(null);
			const draggingRef = (0, react.useRef)(false);
			const labelId = (0, react.useId)();
			const ratio = max === min ? 0 : (value - min) / (max - min);
			const displayedValue = Math.round(value * 10) / 10;
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
				if ((event.key === "Delete" || event.key === "Backspace") && defaultValue !== void 0) {
					event.preventDefault();
					onChange(defaultValue);
					return;
				}
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
				defaultValue,
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
						id: labelId,
						children: label
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						ref: trackRef,
						role: "slider",
						tabIndex: 0,
						className: PrismControls_module_css_default.sliderTrack,
						"aria-labelledby": labelId,
						"aria-valuemin": min,
						"aria-valuemax": max,
						"aria-valuenow": displayedValue,
						"aria-valuetext": unit === void 0 || unit === "" ? void 0 : `${String(displayedValue)}${unit}`,
						title: defaultValue === void 0 ? void 0 : resetHint,
						onDoubleClick: () => {
							if (defaultValue !== void 0) onChange(defaultValue);
						},
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
					unit !== void 0 && unit !== "" && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("output", {
						className: PrismControls_module_css_default.sliderReadout,
						"aria-label": `${label} ${String(displayedValue)}${unit}`,
						children: [String(displayedValue), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: unit })]
					})
				]
			});
		}
		/** A compact native button with consistent state styling. */
		function PrismButton({ variant = "secondary", className = "", children, ...props }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
				type: "button",
				className: `${PrismControls_module_css_default.button} ${PrismControls_module_css_default[`button${variant[0]?.toUpperCase() ?? ""}${variant.slice(1)}`]} ${className}`,
				...props,
				children
			});
		}
		/** Accessible master/feature switch. */
		function Switch({ label, checked, onChange }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
				type: "button",
				className: checked ? PrismControls_module_css_default.switchOn : PrismControls_module_css_default.switch,
				role: "switch",
				"aria-checked": checked,
				"aria-label": label,
				onClick: () => {
					onChange(!checked);
				},
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: PrismControls_module_css_default.switchThumb,
					"aria-hidden": "true"
				})
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
		function ColorControl({ label, hexLabel, pickerLabel, placeholder, hue, sat, light, onChange }) {
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
						children: label
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
						type: "text",
						className: PrismControls_module_css_default.colorHex,
						value: text,
						"aria-label": `${label} · ${hexLabel}`,
						spellCheck: false,
						placeholder,
						onChange: onText,
						onBlur
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
						type: "color",
						className: PrismControls_module_css_default.colorInput,
						value: hex,
						"aria-label": `${label} · ${pickerLabel}`,
						onChange: onSwatch
					})
				]
			});
		}
		/** Stable internal error message used to localize the saved-theme limit. */
		const PRISM_THEME_LIMIT_ERROR = "prism-theme-limit";
		/** Stable error raised when a library edit cannot be durably persisted. */
		const PRISM_THEME_PERSIST_ERROR = "prism-theme-persist-failed";
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
			wallpaperFrost: 0,
			customThemes: []
		});
		/** Curated whole-skin presets. Every recipe is intentionally complete: one
		*  click changes a coherent palette and material rather than only the hue. */
		const PRESETS = Object.freeze({
			crystal: Object.freeze({
				accentHue: 205,
				accentSat: 82,
				accentLight: 54,
				bgHue: 200,
				bgSat: 70,
				bgLight: 72,
				material: "clear",
				blur: 14,
				frost: 32,
				bgBrightness: 58,
				motion: 28
			}),
			night: Object.freeze({
				accentHue: 190,
				accentSat: 82,
				accentLight: 58,
				bgHue: 222,
				bgSat: 72,
				bgLight: 46,
				material: "frosted",
				blur: 20,
				frost: 46,
				bgBrightness: 38,
				motion: 52
			}),
			aurora: Object.freeze({
				accentHue: 318,
				accentSat: 76,
				accentLight: 62,
				bgHue: 165,
				bgSat: 78,
				bgLight: 58,
				material: "velvet",
				blur: 24,
				frost: 38,
				bgBrightness: 48,
				motion: 72
			}),
			dune: Object.freeze({
				accentHue: 28,
				accentSat: 68,
				accentLight: 52,
				bgHue: 38,
				bgSat: 58,
				bgLight: 70,
				material: "frosted",
				blur: 16,
				frost: 40,
				bgBrightness: 60,
				motion: 22
			}),
			rose: Object.freeze({
				accentHue: 350,
				accentSat: 62,
				accentLight: 60,
				bgHue: 320,
				bgSat: 42,
				bgLight: 66,
				material: "velvet",
				blur: 22,
				frost: 42,
				bgBrightness: 48,
				motion: 30
			}),
			forest: Object.freeze({
				accentHue: 158,
				accentSat: 58,
				accentLight: 46,
				bgHue: 176,
				bgSat: 52,
				bgLight: 52,
				material: "frosted",
				blur: 18,
				frost: 44,
				bgBrightness: 44,
				motion: 36
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
		/** Read the portable custom-theme library defensively. Values are normalized
		*  again at application time, so a damaged localStorage entry cannot leak
		*  malformed CSS into the layer. */
		function customThemesField(value) {
			if (!Array.isArray(value)) return [];
			return value.filter((item) => {
				if (typeof item !== "object" || item === null) return false;
				const candidate = item;
				return typeof candidate.id === "string" && /^[a-z0-9-]{1,64}$/.test(candidate.id) && typeof candidate.name === "string" && candidate.name.trim() !== "" && typeof candidate.values === "object" && candidate.values !== null;
			}).slice(0, 24).map((item) => ({
				...item,
				name: item.name.trim().slice(0, 40)
			}));
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
					wallpaperFrost: numberField(parsed.wallpaperFrost, SETTINGS_DEFAULTS.wallpaperFrost),
					customThemes: customThemesField(parsed.customThemes)
				};
			} catch {
				return {
					...SETTINGS_DEFAULTS,
					zones: { ...DEFAULT_ZONES }
				};
			}
		}
		/** Persist the document.
		* @returns false when serialization or localStorage (including quota) fails.
		*/
		function writeSettings(settings) {
			try {
				localStorage.setItem(PRISM_SETTINGS_KEY, JSON.stringify(settings));
				return true;
			} catch {
				return false;
			}
		}
		// src/client/theme-io.ts
		/**
		* Portable DSH Background theme documents. A theme contains appearance values only:
		* wallpaper bytes, rotation state, the master switch, and the custom-theme
		* library itself never cross the file boundary. Every imported number is
		* finite-checked and clamped before it reaches the token layer.
		*/
		/** Current interchange format identifier. */
		const PRISM_THEME_FORMAT = "dsh-prism-theme";
		/** Copy the portable appearance subset out of a complete settings object. */
		function themeSnapshot(settings) {
			return {
				material: settings.material,
				blur: settings.blur,
				frost: settings.frost,
				zones: { ...settings.zones },
				bgBrightness: settings.bgBrightness,
				fontScale: settings.fontScale,
				fontChoice: settings.fontChoice,
				customFont: settings.customFont,
				inkLightHue: settings.inkLightHue,
				inkLightSat: settings.inkLightSat,
				inkLightLight: settings.inkLightLight,
				inkDarkHue: settings.inkDarkHue,
				inkDarkSat: settings.inkDarkSat,
				inkDarkLight: settings.inkDarkLight,
				accentHue: settings.accentHue,
				accentSat: settings.accentSat,
				accentLight: settings.accentLight,
				accentOpacity: settings.accentOpacity,
				bgHue: settings.bgHue,
				bgSat: settings.bgSat,
				bgLight: settings.bgLight,
				motion: settings.motion
			};
		}
		const NUMERIC_RANGES = {
			blur: RANGES.blur,
			frost: RANGES.frost,
			bgBrightness: RANGES.bgBrightness,
			fontScale: RANGES.fontScale,
			inkLightHue: RANGES.hue,
			inkLightSat: RANGES.sat,
			inkLightLight: RANGES.light,
			inkDarkHue: RANGES.hue,
			inkDarkSat: RANGES.sat,
			inkDarkLight: RANGES.light,
			accentHue: RANGES.hue,
			accentSat: RANGES.sat,
			accentLight: RANGES.light,
			accentOpacity: RANGES.accentOpacity,
			bgHue: RANGES.hue,
			bgSat: RANGES.sat,
			bgLight: RANGES.light,
			motion: RANGES.motion
		};
		/** Normalize untrusted portable values over the shipped defaults. */
		function normalizeThemeValues(input) {
			const source = typeof input === "object" && input !== null ? input : {};
			const defaults = themeSnapshot(SETTINGS_DEFAULTS);
			const output = {
				...defaults,
				zones: { ...defaults.zones }
			};
			for (const [key, range] of Object.entries(NUMERIC_RANGES)) {
				const value = source[key];
				if (typeof value === "number" && Number.isFinite(value)) output[key] = Math.min(range.max, Math.max(range.min, value));
			}
			if (source.material === "clear" || source.material === "frosted" || source.material === "velvet") output.material = source.material;
			if (source.fontChoice === "system" || source.fontChoice === "rounded" || source.fontChoice === "serif" || source.fontChoice === "mono" || source.fontChoice === "custom") output.fontChoice = source.fontChoice;
			if (typeof source.customFont === "string") output.customFont = source.customFont.slice(0, 200);
			const zones = typeof source.zones === "object" && source.zones !== null ? source.zones : {};
			const normalizedZones = { ...defaults.zones };
			for (const zone of [
				"base",
				"sidebar",
				"card",
				"input",
				"overlay",
				"bubble"
			]) {
				const value = zones[zone];
				if (typeof value === "number" && Number.isFinite(value)) normalizedZones[zone] = Math.min(RANGES.zone.max, Math.max(RANGES.zone.min, value));
			}
			output.zones = normalizedZones;
			return output;
		}
		/** Serialize a named snapshot with stable formatting. */
		function serializeTheme(settings, name = "DSH Background theme") {
			const document = {
				format: PRISM_THEME_FORMAT,
				version: 1,
				name: name.trim().slice(0, 40) || "DSH Background theme",
				values: themeSnapshot(settings)
			};
			return JSON.stringify(document, null, 2);
		}
		/** Parse and normalize an imported JSON document.
		* @throws Error with a stable code for localized UI feedback.
		*/
		function parseThemeDocument(raw) {
			if (new TextEncoder().encode(raw).byteLength > 262144) throw new Error("size");
			let parsed;
			try {
				parsed = JSON.parse(raw);
			} catch {
				throw new Error("json");
			}
			if (typeof parsed !== "object" || parsed === null) throw new Error("schema");
			const candidate = parsed;
			if (candidate.format !== "dsh-prism-theme" || candidate.version !== 1) throw new Error("version");
			if (typeof candidate.name !== "string" || candidate.name.trim() === "") throw new Error("schema");
			if (typeof candidate.values !== "object" || candidate.values === null) throw new Error("schema");
			return {
				format: PRISM_THEME_FORMAT,
				version: 1,
				name: candidate.name.trim().slice(0, 40),
				values: normalizeThemeValues(candidate.values)
			};
		}
		/** Create a sanitized library entry; the caller owns persistence. */
		function makeCustomTheme(settings, name, id) {
			return {
				id: id.slice(0, 64),
				name: name.trim().slice(0, 40),
				values: themeSnapshot(settings)
			};
		}
		// \0prism-css:src/client/PrismAppearancePanel.module.css.mjs
		const css$1 = ".YXbCuq_panel{box-sizing:border-box;border-bottom:.5px solid var(--dsw-alias-border-l2);flex-direction:column;gap:14px;width:100%;min-width:0;padding:18px 0 22px;display:flex;container:YXbCuq_prism-panel/inline-size}.YXbCuq_hero{border:1px solid var(--dsw-alias-border-l2);background:radial-gradient(circle at 90% -20%, color-mix(in srgb, var(--dsw-alias-state-business-primary) 13%, transparent), transparent 58%), var(--dsw-alias-bg-base);border-radius:16px;grid-template-columns:minmax(0,1fr) minmax(190px,.82fr);gap:18px;min-height:168px;padding:20px;display:grid;position:relative;overflow:hidden}.YXbCuq_heroCopy{z-index:1;flex-direction:column;justify-content:space-between;gap:20px;min-width:0;display:flex}.YXbCuq_brandRow{align-items:flex-start;gap:12px;min-width:0;display:flex}.YXbCuq_brandMark{border:1px solid color-mix(in srgb, var(--dsw-alias-state-business-primary) 28%, transparent);background:color-mix(in srgb, var(--dsw-alias-state-business-primary) 8%, var(--dsw-alias-bg-layer-1));border-radius:10px;flex:none;width:34px;height:34px;display:block;position:relative;overflow:hidden}.YXbCuq_brandMark i{background:var(--dsw-alias-state-business-primary);width:1px;position:absolute;top:4px;bottom:4px;transform:rotate(30deg)}.YXbCuq_brandMark i:first-child{opacity:.45;left:10px}.YXbCuq_brandMark i:nth-child(2){opacity:.8;left:17px}.YXbCuq_brandMark i:nth-child(3){opacity:.3;left:24px}.YXbCuq_titleRow{align-items:center;gap:8px;display:flex}.YXbCuq_title{color:var(--dsw-alias-label-primary);letter-spacing:-.02em;margin:0;font-size:18px;font-weight:600;line-height:24px}.YXbCuq_version{border:1px solid var(--dsw-alias-border-l2);color:var(--dsw-alias-label-tertiary);border-radius:999px;padding:1px 6px;font-size:10px;font-weight:500;line-height:16px}.YXbCuq_subtitle{max-width:330px;color:var(--dsw-alias-label-tertiary);margin:4px 0 0;font-size:12px;line-height:18px}.YXbCuq_heroActions{justify-content:space-between;align-items:center;gap:8px;display:flex}.YXbCuq_preview{border:1px solid color-mix(in srgb, var(--prism-preview-accent) 24%, transparent);background:linear-gradient(140deg, color-mix(in srgb, var(--prism-preview-backdrop) 82%, #101827), var(--prism-preview-backdrop));isolation:isolate;border-radius:13px;align-self:center;min-width:0;min-height:126px;position:relative;overflow:hidden;box-shadow:0 12px 30px #0a142321}.YXbCuq_previewOrb{background:var(--prism-preview-accent);filter:blur(30px);opacity:.55;border-radius:50%;width:120px;height:120px;position:absolute;top:-48px;right:-20px}.YXbCuq_previewWindow{backdrop-filter:blur(12px);background:#f5f9ff99;border:1px solid #ffffff4d;border-radius:9px 9px 0 0;display:flex;position:absolute;inset:14px 12px -12px;overflow:hidden;box-shadow:0 5px 18px #0f19281f}.YXbCuq_preview[data-material=clear] .YXbCuq_previewWindow{backdrop-filter:blur(4px);background:#f5f9ff47}.YXbCuq_preview[data-material=velvet] .YXbCuq_previewWindow{backdrop-filter:blur(20px);background:#f5f9ffd1}.YXbCuq_previewSidebar{background:#ffffff2e;border-right:1px solid #ffffff4d;flex-direction:column;flex:none;gap:7px;width:30px;padding:12px 7px;display:flex}.YXbCuq_previewSidebar i{background:var(--prism-preview-ink);opacity:.24;border-radius:4px;width:16px;height:3px;display:block}.YXbCuq_previewSidebar i:first-child{background:var(--prism-preview-accent);opacity:.75;border-radius:5px;height:16px}.YXbCuq_previewMain{flex-direction:column;flex:1;gap:8px;min-width:0;padding:0 9px 9px;display:flex}.YXbCuq_previewTopbar{border-bottom:1px solid #ffffff42;flex:none;height:19px;margin:0 -9px}.YXbCuq_previewBubble{color:var(--prism-preview-ink);font-size:calc(7px * var(--prism-preview-scale));background:#ffffff59;border:1px solid #ffffff5c;border-radius:7px;flex-direction:column;gap:3px;padding:7px 8px;line-height:1.35;display:flex}.YXbCuq_previewBubble b{font-weight:600}.YXbCuq_previewBubble span{opacity:.68}.YXbCuq_previewComposer{color:var(--prism-preview-ink);background:#ffffff80;border:1px solid #ffffff73;border-radius:7px;justify-content:space-between;align-items:center;margin-top:auto;padding:6px 6px 6px 8px;font-size:6px;display:flex}.YXbCuq_previewComposer span{opacity:.45}.YXbCuq_previewComposer i{background:var(--prism-preview-accent);border-radius:4px;width:12px;height:12px}.YXbCuq_disabledState{border:1px dashed var(--dsw-alias-border-l3);color:var(--dsw-alias-label-tertiary);border-radius:12px;justify-content:space-between;align-items:center;gap:16px;padding:14px 16px;font-size:12px;line-height:18px;display:flex}.YXbCuq_tabs{border:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-base);border-radius:11px;gap:4px;padding:3px;display:flex}.YXbCuq_tab,.YXbCuq_tabActive{cursor:pointer;border:0;border-radius:8px;flex:1;min-width:0;min-height:32px;padding:5px 10px;font-size:12px;font-weight:500;line-height:20px;transition:color .15s,background-color .15s,box-shadow .15s}.YXbCuq_tab{color:var(--dsw-alias-label-tertiary);background:0 0}.YXbCuq_tab:hover{color:var(--dsw-alias-label-primary);background:var(--dsw-alias-interactive-bg-hover)}.YXbCuq_tabActive{color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-layer-1);box-shadow:0 1px 4px #1423371f, inset 0 0 0 1px var(--dsw-alias-border-l1)}.YXbCuq_tab:focus-visible,.YXbCuq_tabActive:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:2px}.YXbCuq_tabPanel{flex-direction:column;gap:14px;min-width:0;display:flex}.YXbCuq_section{border:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-base);border-radius:13px;overflow:hidden}.YXbCuq_sectionHead{justify-content:space-between;align-items:flex-start;gap:12px;padding:15px 16px 0;display:flex}.YXbCuq_sectionTitle{color:var(--dsw-alias-label-primary);margin:0;font-size:13px;font-weight:600;line-height:20px}.YXbCuq_sectionDescription{color:var(--dsw-alias-label-tertiary);margin:3px 0 0;font-size:11px;line-height:17px}.YXbCuq_sectionBody{flex-direction:column;gap:14px;min-width:0;padding:14px 16px 16px;display:flex}.YXbCuq_sectionHead+.YXbCuq_sectionBody{padding-top:12px}.YXbCuq_controlsStack{flex-direction:column;gap:10px;min-width:0;display:flex}.YXbCuq_hint{color:var(--dsw-alias-label-tertiary);margin:0;font-size:11px;line-height:17px}.YXbCuq_error,.YXbCuq_status{margin:0;font-size:11px;line-height:17px}.YXbCuq_error{color:var(--dsw-alias-state-error-primary)}.YXbCuq_status{color:var(--dsw-alias-state-success-primary,#32865a)}.YXbCuq_presetGrid{grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;display:grid}.YXbCuq_presetCard,.YXbCuq_presetCardActive{border:1px solid var(--dsw-alias-border-l1);min-width:0;color:var(--dsw-alias-label-secondary);cursor:pointer;text-align:left;background:0 0;border-radius:11px;flex-direction:column;gap:7px;padding:5px 5px 8px;transition:border-color .15s,background-color .15s,box-shadow .15s,translate .15s;display:flex;position:relative}.YXbCuq_presetCard:hover{border-color:var(--dsw-alias-border-l3);background:var(--dsw-alias-interactive-bg-hover);translate:0 -1px}.YXbCuq_presetCardActive{border-color:var(--dsw-alias-state-business-primary);color:var(--dsw-alias-label-primary);background:var(--dsw-alias-interactive-bg-hover-accent);box-shadow:0 0 0 1px color-mix(in srgb, var(--dsw-alias-state-business-primary) 18%, transparent)}.YXbCuq_presetCard:focus-visible,.YXbCuq_presetCardActive:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:2px}.YXbCuq_presetArtwork{aspect-ratio:1.65;border-radius:7px;width:100%;display:block;position:relative;overflow:hidden}.YXbCuq_presetArtwork:after{content:\"\";background:linear-gradient(115deg,#0000 20%,#ffffff29 50%,#0000 80%);position:absolute;inset:0}.YXbCuq_presetPane{backdrop-filter:blur(8px);background:#ffffff52;border:1px solid #fff6;border-radius:6px 6px 0 0;flex-direction:column;gap:5px;height:62%;padding:8px;display:flex;position:absolute;bottom:-8%;left:12%;right:12%;box-shadow:0 4px 12px #0a142824}.YXbCuq_presetArtwork[data-material=clear] .YXbCuq_presetPane{backdrop-filter:blur(2px);background:#ffffff21}.YXbCuq_presetArtwork[data-material=velvet] .YXbCuq_presetPane{backdrop-filter:blur(15px);background:#ffffff9e}.YXbCuq_presetPane i{background:#19233747;border-radius:4px;width:60%;height:3px;display:block}.YXbCuq_presetPane i:nth-child(2){width:82%}.YXbCuq_presetPane i:nth-child(3){width:44%}.YXbCuq_presetDot{background:#fff9;border:2px solid #ffffffa6;border-radius:50%;width:10px;height:10px;position:absolute;bottom:12%;right:17%;box-shadow:0 2px 5px #0a14282e}.YXbCuq_presetName{text-overflow:ellipsis;white-space:nowrap;padding:0 4px;font-size:11px;font-weight:500;line-height:17px;overflow:hidden}.YXbCuq_presetCheck{color:#fff;background:var(--dsw-alias-state-business-primary);border-radius:50%;place-items:center;width:17px;height:17px;font-size:10px;display:grid;position:absolute;top:9px;right:9px;box-shadow:0 1px 4px #0000002e}.YXbCuq_materialGrid{grid-template-columns:repeat(3,minmax(0,1fr));gap:9px;display:grid}.YXbCuq_materialCard,.YXbCuq_materialCardActive{border:1px solid var(--dsw-alias-border-l1);min-width:0;color:var(--dsw-alias-label-secondary);cursor:pointer;background:0 0;border-radius:10px;flex-direction:column;align-items:center;gap:7px;padding:6px 6px 9px;font-size:11px;line-height:17px;display:flex}.YXbCuq_materialCard:hover{background:var(--dsw-alias-interactive-bg-hover);border-color:var(--dsw-alias-border-l3)}.YXbCuq_materialCardActive{border-color:var(--dsw-alias-state-business-primary);color:var(--dsw-alias-label-primary);background:var(--dsw-alias-interactive-bg-hover-accent)}.YXbCuq_materialCard:focus-visible,.YXbCuq_materialCardActive:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:2px}.YXbCuq_materialSample{background:radial-gradient(circle at 20% 20%,#e7b3c6,#0000 65%),radial-gradient(circle at 80% 80%,#83b7e8,#0000 70%),#b7c5d5;border-radius:6px;width:100%;height:48px;display:block;position:relative;overflow:hidden}.YXbCuq_materialSample i{backdrop-filter:blur(8px);background:#ffffff40;border:1px solid #ffffff8c;border-radius:5px;position:absolute;inset:7px}.YXbCuq_materialSample[data-material=clear] i{backdrop-filter:blur(1px);background:#ffffff14}.YXbCuq_materialSample[data-material=velvet] i{backdrop-filter:blur(16px);background:#ffffffa3}.YXbCuq_textInput{box-sizing:border-box;border:1px solid var(--dsw-alias-border-l2);width:100%;min-width:0;height:34px;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-layer-1);font:inherit;border-radius:8px;outline:none;padding:5px 10px;font-size:12px;line-height:20px}.YXbCuq_textInput::placeholder{color:var(--dsw-alias-label-tertiary)}.YXbCuq_textInput:hover{border-color:var(--dsw-alias-border-l3)}.YXbCuq_textInput:focus{border-color:var(--dsw-alias-state-business-primary);box-shadow:0 0 0 2px var(--dsw-alias-interactive-bg-hover-accent)}.YXbCuq_saveThemeForm{grid-template-columns:minmax(0,1fr) auto;gap:8px;display:grid}.YXbCuq_importExportRow{flex-wrap:wrap;gap:8px;display:flex}.YXbCuq_emptyThemes{border:1px dashed var(--dsw-alias-border-l2);color:var(--dsw-alias-label-tertiary);text-align:center;border-radius:9px;margin:0;padding:12px;font-size:11px;line-height:17px}.YXbCuq_customThemeList{flex-direction:column;gap:5px;display:flex}.YXbCuq_customThemeRow{border-radius:9px;align-items:center;gap:10px;min-width:0;padding:6px;display:flex}.YXbCuq_customThemeRow:hover{background:var(--dsw-alias-interactive-bg-hover)}.YXbCuq_customSwatch{border:1px solid #788ca040;border-radius:8px;flex:none;width:34px;height:34px;display:block;position:relative;overflow:hidden}.YXbCuq_customSwatch i{backdrop-filter:blur(3px);background:#ffffff47;border:1px solid #ffffff80;border-radius:3px;position:absolute;inset:7px}.YXbCuq_customThemeName{min-width:0;color:var(--dsw-alias-label-primary);text-overflow:ellipsis;white-space:nowrap;flex:1;font-size:12px;line-height:18px;overflow:hidden}.YXbCuq_customThemeActions{flex:none;gap:2px;display:flex}.YXbCuq_wallpaperList{border:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-1);border-radius:10px;flex-direction:column;gap:9px;min-width:0;padding:10px;display:flex}.YXbCuq_wallpaperHeader{justify-content:space-between;align-items:center;gap:8px;display:flex}.YXbCuq_wallpaperScheme{min-width:0;color:var(--dsw-alias-label-secondary);font-size:12px;font-weight:500;line-height:18px}.YXbCuq_wallpaperItems{grid-template-columns:repeat(auto-fill,minmax(86px,1fr));gap:8px;display:grid}.YXbCuq_wallpaperRow{min-width:0;position:relative}.YXbCuq_wallpaperThumbButton,.YXbCuq_wallpaperThumbActive{box-sizing:border-box;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-base);cursor:pointer;border-radius:8px;width:100%;padding:0;display:block;position:relative;overflow:hidden}.YXbCuq_wallpaperThumbActive{border-color:var(--dsw-alias-state-business-primary);outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:1px}.YXbCuq_wallpaperThumbButton:focus-visible,.YXbCuq_wallpaperThumbActive:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:2px}.YXbCuq_wallpaperThumb{aspect-ratio:16/10;object-fit:cover;width:100%;display:block}.YXbCuq_wallpaperPinned{color:#fff;background:var(--dsw-alias-state-business-primary);border-radius:50%;place-items:center;width:17px;height:17px;font-size:10px;display:grid;position:absolute;bottom:4px;right:4px}.YXbCuq_wallpaperDelete{color:#fff;cursor:pointer;opacity:0;background:#0f141e9e;border:1px solid #ffffff4d;border-radius:50%;place-items:center;width:20px;height:20px;padding:0;font-size:15px;line-height:1;transition:opacity .12s,background-color .12s;display:grid;position:absolute;top:4px;right:4px}.YXbCuq_wallpaperRow:hover .YXbCuq_wallpaperDelete,.YXbCuq_wallpaperDelete:focus-visible{opacity:1}.YXbCuq_wallpaperDelete:hover{background:#c94545}.YXbCuq_wallpaperDelete:focus-visible{outline-offset:1px;outline:2px solid #fff}.YXbCuq_wallpaperEmpty{border:1px dashed var(--dsw-alias-border-l2);color:var(--dsw-alias-label-tertiary);text-align:center;border-radius:7px;padding:12px;font-size:11px;line-height:17px}.YXbCuq_fontPreview{border:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-1);border-radius:10px;align-items:center;gap:16px;min-height:82px;padding:14px 16px;display:flex}.YXbCuq_fontPreviewAa{color:var(--dsw-alias-state-business-primary);flex:none;font-size:34px;line-height:1}.YXbCuq_fontPreview p{color:var(--dsw-alias-label-secondary);margin:0;line-height:1.65}.YXbCuq_fileInput{display:none}@container YXbCuq_prism-panel (width<=580px){.YXbCuq_hero{grid-template-columns:minmax(0,1fr)}.YXbCuq_preview{display:none}.YXbCuq_heroCopy{gap:16px}}@container YXbCuq_prism-panel (width<=460px){.YXbCuq_hero{padding:16px}.YXbCuq_presetGrid{grid-template-columns:repeat(2,minmax(0,1fr))}.YXbCuq_sectionHead{padding:13px 12px 0}.YXbCuq_sectionBody{padding:12px}.YXbCuq_sectionHead:has(>button){flex-direction:column;align-items:flex-start}.YXbCuq_customThemeRow{flex-wrap:wrap}.YXbCuq_customThemeActions{justify-content:flex-end;width:100%}.YXbCuq_saveThemeForm{grid-template-columns:minmax(0,1fr)}.YXbCuq_disabledState{flex-direction:column;align-items:flex-start}}@media (hover:none){.YXbCuq_wallpaperDelete{opacity:1}}@media (prefers-reduced-motion:reduce){.YXbCuq_tab,.YXbCuq_tabActive,.YXbCuq_presetCard,.YXbCuq_presetCardActive,.YXbCuq_wallpaperDelete{transition:none}.YXbCuq_presetCard:hover{translate:none}}";
		const tagId$1 = "@deepseek-ai/dsh-client-ui-prism/PrismAppearancePanel.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$1) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@deepseek-ai/dsh-client-ui-prism";
			tag.dataset.pluginCss = tagId$1;
			tag.textContent = css$1;
			document.head.appendChild(tag);
		}
		var PrismAppearancePanel_module_css_default = {
			"brandMark": "YXbCuq_brandMark",
			"brandRow": "YXbCuq_brandRow",
			"controlsStack": "YXbCuq_controlsStack",
			"customSwatch": "YXbCuq_customSwatch",
			"customThemeActions": "YXbCuq_customThemeActions",
			"customThemeList": "YXbCuq_customThemeList",
			"customThemeName": "YXbCuq_customThemeName",
			"customThemeRow": "YXbCuq_customThemeRow",
			"disabledState": "YXbCuq_disabledState",
			"emptyThemes": "YXbCuq_emptyThemes",
			"error": "YXbCuq_error",
			"fileInput": "YXbCuq_fileInput",
			"fontPreview": "YXbCuq_fontPreview",
			"fontPreviewAa": "YXbCuq_fontPreviewAa",
			"hero": "YXbCuq_hero",
			"heroActions": "YXbCuq_heroActions",
			"heroCopy": "YXbCuq_heroCopy",
			"hint": "YXbCuq_hint",
			"importExportRow": "YXbCuq_importExportRow",
			"materialCard": "YXbCuq_materialCard",
			"materialCardActive": "YXbCuq_materialCardActive",
			"materialGrid": "YXbCuq_materialGrid",
			"materialSample": "YXbCuq_materialSample",
			"panel": "YXbCuq_panel",
			"presetArtwork": "YXbCuq_presetArtwork",
			"presetCard": "YXbCuq_presetCard",
			"presetCardActive": "YXbCuq_presetCardActive",
			"presetCheck": "YXbCuq_presetCheck",
			"presetDot": "YXbCuq_presetDot",
			"presetGrid": "YXbCuq_presetGrid",
			"presetName": "YXbCuq_presetName",
			"presetPane": "YXbCuq_presetPane",
			"preview": "YXbCuq_preview",
			"previewBubble": "YXbCuq_previewBubble",
			"previewComposer": "YXbCuq_previewComposer",
			"previewMain": "YXbCuq_previewMain",
			"previewOrb": "YXbCuq_previewOrb",
			"previewSidebar": "YXbCuq_previewSidebar",
			"previewTopbar": "YXbCuq_previewTopbar",
			"previewWindow": "YXbCuq_previewWindow",
			"prism-panel": "YXbCuq_prism-panel",
			"saveThemeForm": "YXbCuq_saveThemeForm",
			"section": "YXbCuq_section",
			"sectionBody": "YXbCuq_sectionBody",
			"sectionDescription": "YXbCuq_sectionDescription",
			"sectionHead": "YXbCuq_sectionHead",
			"sectionTitle": "YXbCuq_sectionTitle",
			"status": "YXbCuq_status",
			"subtitle": "YXbCuq_subtitle",
			"tab": "YXbCuq_tab",
			"tabActive": "YXbCuq_tabActive",
			"tabPanel": "YXbCuq_tabPanel",
			"tabs": "YXbCuq_tabs",
			"textInput": "YXbCuq_textInput",
			"title": "YXbCuq_title",
			"titleRow": "YXbCuq_titleRow",
			"version": "YXbCuq_version",
			"wallpaperDelete": "YXbCuq_wallpaperDelete",
			"wallpaperEmpty": "YXbCuq_wallpaperEmpty",
			"wallpaperHeader": "YXbCuq_wallpaperHeader",
			"wallpaperItems": "YXbCuq_wallpaperItems",
			"wallpaperList": "YXbCuq_wallpaperList",
			"wallpaperPinned": "YXbCuq_wallpaperPinned",
			"wallpaperRow": "YXbCuq_wallpaperRow",
			"wallpaperScheme": "YXbCuq_wallpaperScheme",
			"wallpaperThumb": "YXbCuq_wallpaperThumb",
			"wallpaperThumbActive": "YXbCuq_wallpaperThumbActive",
			"wallpaperThumbButton": "YXbCuq_wallpaperThumbButton"
		};
		// src/client/PrismAppearancePanel.tsx
		/**
		* Prism's General → Appearance control surface. The master switch now lives
		* here because DSH 0.2.2 retired settings.plugin.item. Four task-oriented
		* tabs keep the full theme controls compact; every write still goes through
		* the damped PrismLayer, so presets and individual knobs preview live.
		*/
		const TABS = [
			"theme",
			"glass",
			"background",
			"type"
		];
		const PRESET_ORDER = [
			"crystal",
			"night",
			"aurora",
			"dune",
			"rose",
			"forest"
		];
		const PRESET_LABELS = {
			crystal: "prism.presetCrystal",
			night: "prism.presetNight",
			aurora: "prism.presetAurora",
			dune: "prism.presetDune",
			rose: "prism.presetRose",
			forest: "prism.presetForest"
		};
		/** Localized error copy for a wallpaper rejection. */
		function wallpaperErrorText(t, error) {
			switch (error.kind) {
				case "size": return t("prism.errorSize");
				case "read": return t("prism.errorRead");
				case "decode": return t("prism.errorDecode");
			}
		}
		function Section({ title, description, action, children }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
				className: PrismAppearancePanel_module_css_default.section,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: PrismAppearancePanel_module_css_default.sectionHead,
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h3", {
						className: PrismAppearancePanel_module_css_default.sectionTitle,
						children: title
					}), description !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: PrismAppearancePanel_module_css_default.sectionDescription,
						children: description
					})] }), action]
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: PrismAppearancePanel_module_css_default.sectionBody,
					children
				})]
			});
		}
		function color(values) {
			return hslToHex({
				h: values.accentHue,
				s: values.accentSat,
				l: values.accentLight
			});
		}
		function PresetCard({ id, active, label, onApply }) {
			const recipe = PRESETS[id];
			const accent = color(recipe);
			const backdrop = hslToHex({
				h: recipe.bgHue,
				s: recipe.bgSat,
				l: recipe.bgLight
			});
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
				type: "button",
				className: active ? PrismAppearancePanel_module_css_default.presetCardActive : PrismAppearancePanel_module_css_default.presetCard,
				"aria-pressed": active,
				"aria-label": label,
				onClick: onApply,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
						className: PrismAppearancePanel_module_css_default.presetArtwork,
						style: { background: `linear-gradient(135deg, ${backdrop}, ${accent})` },
						"data-material": recipe.material,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
							className: PrismAppearancePanel_module_css_default.presetPane,
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("i", {}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("i", {}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("i", {})
							]
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { className: PrismAppearancePanel_module_css_default.presetDot })]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: PrismAppearancePanel_module_css_default.presetName,
						children: label
					}),
					active && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: PrismAppearancePanel_module_css_default.presetCheck,
						"aria-hidden": "true",
						children: "✓"
					})
				]
			});
		}
		function CustomThemeRow({ theme, onApply, onDelete, t }) {
			const accent = color(theme.values);
			const backdrop = hslToHex({
				h: theme.values.bgHue,
				s: theme.values.bgSat,
				l: theme.values.bgLight
			});
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: PrismAppearancePanel_module_css_default.customThemeRow,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: PrismAppearancePanel_module_css_default.customSwatch,
						style: { background: `linear-gradient(135deg, ${backdrop}, ${accent})` },
						"aria-hidden": "true",
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("i", {})
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: PrismAppearancePanel_module_css_default.customThemeName,
						children: theme.name
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: PrismAppearancePanel_module_css_default.customThemeActions,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(PrismButton, {
							variant: "quiet",
							"aria-label": `${t("prism.applyTheme")} ${theme.name}`,
							onClick: onApply,
							children: t("prism.applyTheme")
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(PrismButton, {
							variant: "danger",
							"aria-label": `${t("prism.deleteTheme")} ${theme.name}`,
							onClick: onDelete,
							children: t("prism.deleteTheme")
						})]
					})
				]
			});
		}
		/** Render the Prism appearance panel. */
		function PrismAppearancePanel(props) {
			const { t, setEnabled, setMaterial, setBlur, setFrost, setBgBrightness, setFontScale, setFontChoice, setCustomFont, setZone, setInkLightColor, setInkDarkColor, setAccentColor, setBgColor, setAccentOpacity, setMotion, setBackground, setWallpaperInterval, setWallpaperLoop, pinWallpaper, setWallpaperBlur, setWallpaperFrost, pickWallpaper, clearWallpaper, applyPreset, saveTheme, applyCustomTheme, deleteCustomTheme, exportTheme, importTheme, resetZones, reset, useStore } = props;
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
			const customThemes = useStore((s) => s.customThemes);
			const dark = useStore((s) => s.dark);
			const [tab, setTab] = (0, react.useState)("theme");
			const [themeName, setThemeName] = (0, react.useState)("");
			const [status, setStatus] = (0, react.useState)(null);
			const [wallpaperError, setWallpaperError] = (0, react.useState)(null);
			const wallpaperFileRef = (0, react.useRef)(null);
			const importFileRef = (0, react.useRef)(null);
			const schemeRef = (0, react.useRef)("dark");
			const previewStyle = {
				"--prism-preview-accent": hslToHex({
					h: accentHue,
					s: accentSat,
					l: accentLight
				}),
				"--prism-preview-backdrop": hslToHex({
					h: bgHue,
					s: bgSat,
					l: bgLight
				}),
				"--prism-preview-ink": hslToHex(dark ? {
					h: inkDarkHue,
					s: inkDarkSat,
					l: inkDarkLight
				} : {
					h: inkLightHue,
					s: inkLightSat,
					l: inkLightLight
				}),
				"--prism-preview-scale": String(fontScale / 100)
			};
			const resetHint = t("prism.sliderResetHint");
			const isPresetActive = (id) => {
				const recipe = PRESETS[id];
				return material === recipe.material && blur === recipe.blur && frost === recipe.frost && bgBrightness === recipe.bgBrightness && motion === recipe.motion && accentHue === recipe.accentHue && accentSat === recipe.accentSat && accentLight === recipe.accentLight && bgHue === recipe.bgHue && bgSat === recipe.bgSat && bgLight === recipe.bgLight;
			};
			const startPick = (scheme) => {
				schemeRef.current = scheme;
				wallpaperFileRef.current?.click();
			};
			const onWallpaperFile = async (event) => {
				const file = event.target.files?.[0];
				event.target.value = "";
				if (file === void 0) return;
				const scheme = schemeRef.current;
				const error = await pickWallpaper(scheme, file);
				setWallpaperError(error === null ? null : {
					scheme,
					message: wallpaperErrorText(t, error)
				});
			};
			const onImportFile = async (event) => {
				const file = event.target.files?.[0];
				event.target.value = "";
				if (file === void 0) return;
				if (file.size > 262144) {
					setStatus({
						message: t("prism.themeImportFailed"),
						error: true
					});
					return;
				}
				try {
					const name = importTheme(await file.text());
					setThemeName(name);
					setStatus({
						message: t("prism.themeImported"),
						error: false
					});
				} catch (error) {
					const code = error instanceof Error ? error.message : "";
					const message = code === "prism-theme-limit" ? t("prism.themeLimit") : code === "prism-theme-persist-failed" ? t("prism.themePersistFailed") : t("prism.themeImportFailed");
					setStatus({
						message,
						error: true
					});
				}
			};
			const onExport = () => {
				const blob = new Blob([exportTheme()], { type: "application/json" });
				const url = URL.createObjectURL(blob);
				const anchor = document.createElement("a");
				anchor.href = url;
				anchor.download = `prism-theme-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.json`;
				anchor.click();
				window.setTimeout(() => {
					URL.revokeObjectURL(url);
				}, 1e3);
				setStatus({
					message: t("prism.themeExported"),
					error: false
				});
			};
			const onTabKeys = (event) => {
				if (![
					"ArrowLeft",
					"ArrowRight",
					"Home",
					"End"
				].includes(event.key)) return;
				event.preventDefault();
				const index = TABS.indexOf(tab);
				const next = event.key === "Home" ? 0 : event.key === "End" ? TABS.length - 1 : event.key === "ArrowRight" ? (index + 1) % TABS.length : (index - 1 + TABS.length) % TABS.length;
				const nextTab = TABS[next] ?? "theme";
				setTab(nextTab);
				event.currentTarget.querySelectorAll("[role=\"tab\"]")[next]?.focus();
			};
			const wallpaperRows = (scheme, urls, labelKey) => {
				const pinned = scheme === "dark" ? wallpaperPinnedDark : wallpaperPinnedLight;
				return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: PrismAppearancePanel_module_css_default.wallpaperList,
					children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: PrismAppearancePanel_module_css_default.wallpaperHeader,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: PrismAppearancePanel_module_css_default.wallpaperScheme,
								children: t(labelKey)
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(PrismButton, {
								variant: "quiet",
								"aria-label": `${t("prism.chooseImage")} · ${t(labelKey)}`,
								onClick: () => {
									startPick(scheme);
								},
								children: ["+ ", t("prism.chooseImage")]
							})]
						}),
						urls.length === 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: PrismAppearancePanel_module_css_default.wallpaperEmpty,
							children: t("prism.wallpaperEmpty")
						}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: PrismAppearancePanel_module_css_default.wallpaperItems,
							children: urls.map((url, index) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: PrismAppearancePanel_module_css_default.wallpaperRow,
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
									type: "button",
									className: !wallpaperLoop && pinned === index ? PrismAppearancePanel_module_css_default.wallpaperThumbActive : PrismAppearancePanel_module_css_default.wallpaperThumbButton,
									"aria-label": `${t("prism.wallpaperPin")} · ${t(labelKey)} ${String(index + 1)}`,
									"aria-pressed": !wallpaperLoop && pinned === index,
									title: t("prism.wallpaperPinHint"),
									onClick: () => {
										pinWallpaper(scheme, index);
									},
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("img", {
										className: PrismAppearancePanel_module_css_default.wallpaperThumb,
										src: url,
										alt: ""
									}), !wallpaperLoop && pinned === index && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										className: PrismAppearancePanel_module_css_default.wallpaperPinned,
										children: "✓"
									})]
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
									type: "button",
									className: PrismAppearancePanel_module_css_default.wallpaperDelete,
									"aria-label": `${t("prism.deleteWallpaper")} · ${t(labelKey)} ${String(index + 1)}`,
									onClick: () => {
										clearWallpaper(scheme, index);
									},
									children: "×"
								})]
							}, `${scheme}-${String(index)}`))
						}),
						wallpaperError?.scheme === scheme && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: PrismAppearancePanel_module_css_default.error,
							role: "alert",
							children: wallpaperError.message
						})
					]
				}, scheme);
			};
			const hero = /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: PrismAppearancePanel_module_css_default.hero,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: PrismAppearancePanel_module_css_default.heroCopy,
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: PrismAppearancePanel_module_css_default.brandRow,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
							className: PrismAppearancePanel_module_css_default.brandMark,
							"aria-hidden": "true",
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("i", {}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("i", {}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("i", {})
							]
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: PrismAppearancePanel_module_css_default.titleRow,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h2", {
								className: PrismAppearancePanel_module_css_default.title,
								children: "DSH Background"
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: PrismAppearancePanel_module_css_default.version,
								children: "2.0"
							})]
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
							className: PrismAppearancePanel_module_css_default.subtitle,
							children: t("prism.subtitle")
						})] })]
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: PrismAppearancePanel_module_css_default.heroActions,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(PrismButton, {
							variant: "quiet",
							onClick: reset,
							children: t("prism.resetAll")
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Switch, {
							label: t("prism.enabled"),
							checked: enabled,
							onChange: setEnabled
						})]
					})]
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: PrismAppearancePanel_module_css_default.preview,
					style: previewStyle,
					"data-material": material,
					"aria-hidden": "true",
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { className: PrismAppearancePanel_module_css_default.previewOrb }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: PrismAppearancePanel_module_css_default.previewWindow,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: PrismAppearancePanel_module_css_default.previewSidebar,
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("i", {}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("i", {}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("i", {})
							]
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: PrismAppearancePanel_module_css_default.previewMain,
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", { className: PrismAppearancePanel_module_css_default.previewTopbar }),
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: PrismAppearancePanel_module_css_default.previewBubble,
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("b", { children: t("prism.previewTitle") }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: t("prism.previewText") })]
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: PrismAppearancePanel_module_css_default.previewComposer,
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: t("prism.previewInput") }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("i", {})]
								})
							]
						})]
					})]
				})]
			});
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: PrismAppearancePanel_module_css_default.panel,
				children: [
					hero,
					!enabled ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: PrismAppearancePanel_module_css_default.disabledState,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: t("prism.subtitle") }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(PrismButton, {
							variant: "primary",
							onClick: () => {
								setEnabled(true);
							},
							children: t("prism.enable")
						})]
					}) : /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: PrismAppearancePanel_module_css_default.tabs,
						role: "tablist",
						"aria-label": "DSH Background",
						onKeyDown: onTabKeys,
						children: TABS.map((id) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
							type: "button",
							role: "tab",
							id: `prism-tab-${id}`,
							"aria-selected": tab === id,
							"aria-controls": `prism-panel-${id}`,
							tabIndex: tab === id ? 0 : -1,
							className: tab === id ? PrismAppearancePanel_module_css_default.tabActive : PrismAppearancePanel_module_css_default.tab,
							onClick: () => {
								setTab(id);
							},
							children: t(`prism.tab${id[0]?.toUpperCase() ?? ""}${id.slice(1)}`)
						}, id))
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: PrismAppearancePanel_module_css_default.tabPanel,
						role: "tabpanel",
						id: `prism-panel-${tab}`,
						"aria-labelledby": `prism-tab-${tab}`,
						children: [
							tab === "theme" && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Section, {
									title: t("prism.presets"),
									description: t("prism.presetsDesc"),
									children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
										className: PrismAppearancePanel_module_css_default.presetGrid,
										children: PRESET_ORDER.map((id) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(PresetCard, {
											id,
											label: t(PRESET_LABELS[id]),
											active: isPresetActive(id),
											onApply: () => {
												applyPreset(id);
											}
										}, id))
									})
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Section, {
									title: t("prism.colors"),
									description: t("prism.colorsDesc"),
									children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										className: PrismAppearancePanel_module_css_default.controlsStack,
										children: [
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)(ColorControl, {
												label: t("prism.accentHue"),
												hexLabel: t("prism.colorHexLabel"),
												pickerLabel: t("prism.colorPickerLabel"),
												placeholder: t("prism.colorPlaceholder"),
												hue: accentHue,
												sat: accentSat,
												light: accentLight,
												onChange: setAccentColor
											}),
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)(PrismSlider, {
												label: t("prism.accentOpacity"),
												value: accentOpacity,
												min: 0,
												max: 100,
												step: 1,
												unit: "%",
												defaultValue: 100,
												resetHint,
												onChange: setAccentOpacity
											}),
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)(ColorControl, {
												label: t("prism.inkHue"),
												hexLabel: t("prism.colorHexLabel"),
												pickerLabel: t("prism.colorPickerLabel"),
												placeholder: t("prism.colorPlaceholder"),
												hue: inkLightHue,
												sat: inkLightSat,
												light: inkLightLight,
												onChange: setInkLightColor
											}),
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)(ColorControl, {
												label: t("prism.inkDarkHue"),
												hexLabel: t("prism.colorHexLabel"),
												pickerLabel: t("prism.colorPickerLabel"),
												placeholder: t("prism.colorPlaceholder"),
												hue: inkDarkHue,
												sat: inkDarkSat,
												light: inkDarkLight,
												onChange: setInkDarkColor
											})
										]
									})
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(Section, {
									title: t("prism.customThemes"),
									description: t("prism.customThemesDesc"),
									children: [
										/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("form", {
											className: PrismAppearancePanel_module_css_default.saveThemeForm,
											onSubmit: (event) => {
												event.preventDefault();
												try {
													if (saveTheme(themeName) !== null) {
														setThemeName("");
														setStatus({
															message: t("prism.themeSaved"),
															error: false
														});
													} else setStatus({
														message: t("prism.themeLimit"),
														error: true
													});
												} catch {
													setStatus({
														message: t("prism.themePersistFailed"),
														error: true
													});
												}
											},
											children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
												className: PrismAppearancePanel_module_css_default.textInput,
												value: themeName,
												maxLength: 40,
												placeholder: t("prism.themeNamePlaceholder"),
												"aria-label": t("prism.themeNamePlaceholder"),
												onChange: (event) => {
													setThemeName(event.target.value);
												}
											}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(PrismButton, {
												variant: "primary",
												type: "submit",
												disabled: themeName.trim() === "",
												children: t("prism.saveTheme")
											})]
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
											className: PrismAppearancePanel_module_css_default.importExportRow,
											children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(PrismButton, {
												onClick: () => {
													importFileRef.current?.click();
												},
												children: t("prism.importTheme")
											}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(PrismButton, {
												onClick: onExport,
												children: t("prism.exportTheme")
											})]
										}),
										customThemes.length === 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
											className: PrismAppearancePanel_module_css_default.emptyThemes,
											children: t("prism.noCustomThemes")
										}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
											className: PrismAppearancePanel_module_css_default.customThemeList,
											children: customThemes.map((theme) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(CustomThemeRow, {
												theme,
												t,
												onApply: () => {
													applyCustomTheme(theme.id);
												},
												onDelete: () => {
													try {
														deleteCustomTheme(theme.id);
														setStatus({
															message: t("prism.themeDeleted"),
															error: false
														});
													} catch {
														setStatus({
															message: t("prism.themePersistFailed"),
															error: true
														});
													}
												}
											}, theme.id))
										}),
										status !== null && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
											className: status.error ? PrismAppearancePanel_module_css_default.error : PrismAppearancePanel_module_css_default.status,
											role: status.error ? "alert" : "status",
											children: status.message
										})
									]
								})
							] }),
							tab === "glass" && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(Section, {
								title: t("prism.material"),
								description: t("prism.materialDesc"),
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
									className: PrismAppearancePanel_module_css_default.materialGrid,
									children: [
										"clear",
										"frosted",
										"velvet"
									].map((id) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
										type: "button",
										className: material === id ? PrismAppearancePanel_module_css_default.materialCardActive : PrismAppearancePanel_module_css_default.materialCard,
										"aria-pressed": material === id,
										onClick: () => {
											setMaterial(id);
										},
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											className: PrismAppearancePanel_module_css_default.materialSample,
											"data-material": id,
											children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("i", {})
										}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: t(`prism.material${id[0]?.toUpperCase() ?? ""}${id.slice(1)}`) })]
									}, id))
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: PrismAppearancePanel_module_css_default.controlsStack,
									children: [
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)(PrismSlider, {
											label: t("prism.blur"),
											value: blur,
											min: 0,
											max: 40,
											step: 1,
											unit: "px",
											defaultValue: 18,
											resetHint,
											onChange: setBlur
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)(PrismSlider, {
											label: t("prism.frost"),
											value: frost,
											min: 0,
											max: 100,
											step: 1,
											unit: "%",
											defaultValue: 50,
											resetHint,
											onChange: setFrost
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)(PrismSlider, {
											label: t("prism.bgBrightness"),
											value: bgBrightness,
											min: 0,
											max: 100,
											step: 1,
											unit: "%",
											defaultValue: 50,
											resetHint,
											onChange: setBgBrightness
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
											className: PrismAppearancePanel_module_css_default.hint,
											children: dark ? t("prism.brightnessHintDark") : t("prism.brightnessHintLight")
										})
									]
								})]
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Section, {
								title: t("prism.zones"),
								description: t("prism.zonesDesc"),
								action: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(PrismButton, {
									variant: "quiet",
									onClick: resetZones,
									children: t("prism.resetZones")
								}),
								children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
									className: PrismAppearancePanel_module_css_default.controlsStack,
									children: Object.keys(zones).map((zone) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(PrismSlider, {
										label: t(`prism.zone${zone[0]?.toUpperCase() ?? ""}${zone.slice(1)}`),
										value: zones[zone],
										min: 20,
										max: 100,
										step: 1,
										unit: "%",
										defaultValue: 100,
										resetHint,
										onChange: (value) => {
											setZone(zone, value);
										}
									}, zone))
								})
							})] }),
							tab === "background" && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(Section, {
								title: t("prism.background"),
								description: t("prism.backgroundDesc"),
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Segmented, {
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
								}), background === "aurora" ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: PrismAppearancePanel_module_css_default.controlsStack,
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(ColorControl, {
										label: t("prism.bgHue"),
										hexLabel: t("prism.colorHexLabel"),
										pickerLabel: t("prism.colorPickerLabel"),
										placeholder: t("prism.colorPlaceholder"),
										hue: bgHue,
										sat: bgSat,
										light: bgLight,
										onChange: setBgColor
									}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(PrismSlider, {
										label: t("prism.motion"),
										value: motion,
										min: 0,
										max: 100,
										step: 1,
										unit: "%",
										defaultValue: 55,
										resetHint,
										onChange: setMotion
									})]
								}) : /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
									wallpaperRows("dark", wallpaperDark, "prism.wallpaperDark"),
									wallpaperRows("light", wallpaperLight, "prism.wallpaperLight"),
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										className: PrismAppearancePanel_module_css_default.controlsStack,
										children: [
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
											wallpaperLoop && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(PrismSlider, {
												label: t("prism.wallpaperInterval"),
												value: wallpaperInterval,
												min: 5,
												max: 120,
												step: 5,
												unit: "s",
												defaultValue: 30,
												resetHint,
												onChange: setWallpaperInterval
											}),
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)(PrismSlider, {
												label: t("prism.wallpaperBlur"),
												value: wallpaperBlur,
												min: 0,
												max: 100,
												step: 1,
												unit: "%",
												defaultValue: 20,
												resetHint,
												onChange: setWallpaperBlur
											}),
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)(PrismSlider, {
												label: t("prism.wallpaperFrost"),
												value: wallpaperFrost,
												min: 0,
												max: 100,
												step: 1,
												unit: "%",
												defaultValue: 0,
												resetHint,
												onChange: setWallpaperFrost
											}),
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
												className: PrismAppearancePanel_module_css_default.hint,
												children: t("prism.wallpaperHint")
											})
										]
									})
								] })]
							}),
							tab === "type" && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(Section, {
								title: t("prism.font"),
								description: t("prism.fontDesc"),
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
										className: PrismAppearancePanel_module_css_default.textInput,
										type: "text",
										value: customFont,
										"aria-label": t("prism.customFontLabel"),
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
										defaultValue: 100,
										resetHint,
										onChange: setFontScale
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										className: PrismAppearancePanel_module_css_default.fontPreview,
										style: { fontSize: `${String(14 * fontScale / 100)}px` },
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											className: PrismAppearancePanel_module_css_default.fontPreviewAa,
											children: "Aa"
										}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", { children: t("prism.fontPreview") })]
									})
								]
							})
						]
					})] }),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
						ref: wallpaperFileRef,
						className: PrismAppearancePanel_module_css_default.fileInput,
						type: "file",
						accept: "image/png,image/jpeg,image/webp,image/gif,image/avif",
						onChange: (event) => {
							onWallpaperFile(event);
						}
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
						ref: importFileRef,
						className: PrismAppearancePanel_module_css_default.fileInput,
						type: "file",
						accept: ".json,application/json",
						onChange: (event) => {
							onImportFile(event);
						}
					})
				]
			});
		}
		// src/client/settings-store.ts
		/**
		* Prism row slot stores: mirrors of the layer's settings document. The
		* plugin's apply-world change listener is the only writer; the row components
		* read via props.useStore. DSH 0.2.2 uses one General appearance surface;
		* the master switch is mirrored through this same store.
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
				customThemes: [],
				dark: false,
				revision: -1
			};
		}
		/**
		* Declares the Prism row state and write surface.
		* @returns the store handle.
		*/
		function createPrismRowStore() {
			return (0, _deepseek_ai_dsh_client_store.defineStore)({
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
					draft.customThemes = next.customThemes.map((theme) => ({
						...theme,
						values: {
							...theme.values,
							zones: { ...theme.values.zones }
						}
					}));
					draft.dark = next.dark;
					draft.revision = revision;
				} }
			});
		}
		// src/client/locales.ts
		/** `settings.prism` namespace dictionaries (the settings-row copy). */
		/** Dictionary namespace owned by this plugin. */
		const NS = "settings.prism";
		/** Simplified Chinese dictionary (the key-set source of truth). */
		const zh = {
			"prism.title": "DSH Background",
			"prism.description": "上传自己的照片或 GIF 作为界面背景，自由调整毛玻璃、透明度、字体、颜色与动效",
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
			"prism.customFontLabel": "自定义字体名称",
			"prism.customFontPlaceholder": "输入字体名，如 LXGW WenKai",
			"prism.colors": "颜色",
			"prism.colorPlaceholder": "#rrggbb",
			"prism.colorHexLabel": "十六进制值",
			"prism.colorPickerLabel": "取色器",
			"prism.inkHue": "亮色文字",
			"prism.inkDarkHue": "暗色文字",
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
			"prism.wallpaperPin": "固定",
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
			"prism.errorSize": "文件过大（最大 30 MB）",
			"prism.errorRead": "文件读取失败",
			"prism.errorDecode": "图片无法解码",
			"prism.enabled": "启用 DSH Background",
			"prism.subtitle": "自定义背景图与毛玻璃主题。上传照片或 GIF，实时调整界面效果。",
			"prism.previewTitle": "你的下一段灵感",
			"prism.previewText": "清透的表面，恰好合适的层次。",
			"prism.previewInput": "开始输入…",
			"prism.tabTheme": "主题",
			"prism.tabGlass": "玻璃",
			"prism.tabBackground": "背景",
			"prism.tabType": "文字",
			"prism.presetsDesc": "完整搭配好的色彩与材质，点击即可应用。",
			"prism.presetDune": "暖沙",
			"prism.presetRose": "雾玫瑰",
			"prism.presetForest": "深林",
			"prism.customThemes": "我的主题",
			"prism.customThemesDesc": "保存当前搭配，或与他人交换轻量主题文件。主题不包含壁纸图片。",
			"prism.themeNamePlaceholder": "为主题命名",
			"prism.saveTheme": "保存当前",
			"prism.importTheme": "导入",
			"prism.exportTheme": "导出当前",
			"prism.noCustomThemes": "还没有保存的主题。调好颜色后，给它一个名字。",
			"prism.applyTheme": "应用",
			"prism.deleteTheme": "删除",
			"prism.themeSaved": "主题已保存。",
			"prism.themeImported": "主题已导入并应用。",
			"prism.themeDeleted": "主题已删除。",
			"prism.themeExported": "主题文件已导出。",
			"prism.themeImportFailed": "无法导入：请选择有效的 DSH Background 主题 JSON 文件。",
			"prism.themeLimit": "最多保存 24 套主题；请先删除一套再保存。",
			"prism.themePersistFailed": "保存失败：浏览器存储空间不足或不可用，请重试。",
			"prism.resetAll": "恢复默认",
			"prism.resetZones": "重置分区",
			"prism.sliderResetHint": "双击或按 Delete 恢复此项默认值",
			"prism.materialDesc": "同一种色彩，也可以有完全不同的触感。",
			"prism.colorsDesc": "强调色用于按钮、选中和焦点；文字颜色按明暗模式独立调整。",
			"prism.zonesDesc": "分别控制六个界面的通透程度。双击滑块或按 Delete 可恢复单项默认值。",
			"prism.fontDesc": "字体与字号会应用到整个工作区。",
			"prism.backgroundDesc": "选择流动的极光，或自己的静态、动态壁纸。",
			"prism.fontPreview": "清晰的文字，让复杂的工作保持轻盈。 0123456789",
			"prism.wallpaperEmpty": "尚未添加壁纸",
			"prism.errorNone": ""
		};
		/** English dictionary. */
		const en = {
			"prism.title": "DSH Background",
			"prism.description": "Upload your own photos or GIFs as interface backgrounds, then tune glass, opacity, typography, colors, and motion",
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
			"prism.customFontLabel": "Custom font family",
			"prism.customFontPlaceholder": "Font family name, e.g. LXGW WenKai",
			"prism.colors": "Colors",
			"prism.colorPlaceholder": "#rrggbb",
			"prism.colorHexLabel": "Hex value",
			"prism.colorPickerLabel": "Color picker",
			"prism.inkHue": "Light-mode text",
			"prism.inkDarkHue": "Dark-mode text",
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
			"prism.wallpaperPin": "Pin",
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
			"prism.errorSize": "File too large (30 MB maximum)",
			"prism.errorRead": "File read failed",
			"prism.errorDecode": "Image could not be decoded",
			"prism.enabled": "Enable DSH Background",
			"prism.subtitle": "Custom background images and glassmorphism. Upload a photo or GIF and tune the interface live.",
			"prism.previewTitle": "Your next idea",
			"prism.previewText": "Clear surfaces, just the right amount of depth.",
			"prism.previewInput": "Start typing…",
			"prism.tabTheme": "Themes",
			"prism.tabGlass": "Glass",
			"prism.tabBackground": "Backdrop",
			"prism.tabType": "Type",
			"prism.presetsDesc": "Coordinated palettes and materials, ready to apply.",
			"prism.presetDune": "Dune",
			"prism.presetRose": "Mist Rose",
			"prism.presetForest": "Forest",
			"prism.customThemes": "My themes",
			"prism.customThemesDesc": "Save this look or exchange lightweight theme files. Wallpaper images are not included.",
			"prism.themeNamePlaceholder": "Name this theme",
			"prism.saveTheme": "Save current",
			"prism.importTheme": "Import",
			"prism.exportTheme": "Export current",
			"prism.noCustomThemes": "No saved themes yet. Find a look you love, then give it a name.",
			"prism.applyTheme": "Apply",
			"prism.deleteTheme": "Delete",
			"prism.themeSaved": "Theme saved.",
			"prism.themeImported": "Theme imported and applied.",
			"prism.themeDeleted": "Theme deleted.",
			"prism.themeExported": "Theme file exported.",
			"prism.themeImportFailed": "Could not import. Choose a valid DSH Background theme JSON file.",
			"prism.themeLimit": "You can save up to 24 themes. Delete one before saving another.",
			"prism.themePersistFailed": "Could not save because browser storage is full or unavailable. Try again.",
			"prism.resetAll": "Restore defaults",
			"prism.resetZones": "Reset zones",
			"prism.sliderResetHint": "Double-click or press Delete to restore this setting",
			"prism.materialDesc": "The same palette can have an entirely different texture.",
			"prism.colorsDesc": "Accent colors shape actions and focus. Text ink is independent for light and dark modes.",
			"prism.zonesDesc": "Tune transparency for six interface zones. Double-click a slider or press Delete to reset it.",
			"prism.fontDesc": "Font family and size apply across the workspace.",
			"prism.backgroundDesc": "Choose a living aurora or your own still and animated wallpapers.",
			"prism.fontPreview": "Clear type keeps complex work feeling light. 0123456789",
			"prism.wallpaperEmpty": "No wallpapers yet",
			"prism.errorNone": ""
		};
		// src/client/fonts.ts
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
		// src/client/tokens.ts
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
			const n = value;
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
					const result = reader.result;
					resolve(typeof result === "string" ? result : "");
				};
				reader.onerror = () => {
					reject(new Error(reader.error?.message ?? "FileReader failed to read the wallpaper file", { cause: reader.error }));
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
		// src/client/theme-layer.ts
		/** html attribute selecting the Prism layer (all CSS hooks are gated on it). */
		const PRISM_ATTRIBUTE = "data-dsh-prism";
		/** The layer's identity in the theme override stack (inspection-visible). */
		const OVERRIDE_SOURCE = "@deepseek-ai/dsh-client-ui-prism";
		/** Whether the environment prefers reduced motion (checked live, so OS flips apply). */
		function prefersReducedMotion() {
			return typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;
		}
		/** Keep imports and repeated exports non-destructive by allocating a new name. */
		function uniqueThemeName(name, themes) {
			const taken = new Set(themes.map((theme) => theme.name));
			if (!taken.has(name)) return name;
			for (let index = 2; index <= themes.length + 1; index += 1) {
				const suffix = ` (${String(index)})`;
				const candidate = `${name.slice(0, 40 - suffix.length).trimEnd()}${suffix}`;
				if (!taken.has(candidate)) return candidate;
			}
			return name;
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
						if (this.settings.enabled) {
							if (document.documentElement.hasAttribute("data-dsh-prism")) {
								this.applyDiscrete();
								this.applyAllKnobs();
							} else this.mount();
						} else this.unmount();
						this.signal();
					};
					window.addEventListener("storage", onStorage);
					const onTheme = () => {
						this.dark = this.resolveScheme();
						this.applySchemeDependent();
						this.applyWallpaperSource();
						this.signal();
					};
					const onPageHide = () => {
						this.flushPersist();
					};
					ctx.on("theme/change", onTheme);
					window.addEventListener("pagehide", onPageHide);
					return () => {
						window.removeEventListener("storage", onStorage);
						window.removeEventListener("pagehide", onPageHide);
						this.flushPersist();
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
			/** Flush any pending debounced write immediately.
			* @returns whether the pending document reached durable storage.
			*/
			flushPersist() {
				if (this.persistTimer === void 0) return true;
				window.clearTimeout(this.persistTimer);
				this.persistTimer = void 0;
				return writeSettings(this.settings);
			}
			/** Roll back a library edit whose synchronous durable write failed. */
			rejectFailedLibraryWrite(previous) {
				this.settings = previous;
				if (previous.enabled) {
					this.applyDiscrete();
					this.applyAllKnobs();
				} else this.unmount();
				this.signal();
				throw new Error(PRISM_THEME_PERSIST_ERROR);
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
					wallpaperLight: [...this.settings.wallpaperLight],
					wallpaperDimDark: [...this.settings.wallpaperDimDark],
					wallpaperDimLight: [...this.settings.wallpaperDimLight],
					customThemes: this.settings.customThemes.map((theme) => ({
						...theme,
						values: {
							...theme.values,
							zones: { ...theme.values.zones }
						}
					}))
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
			/** Apply a complete curated preset (palette, material, depth, and motion). */
			applyPreset(preset) {
				this.update({ ...PRESETS[preset] });
			}
			/** Save the current appearance as a portable custom theme. Duplicate names
			*  receive a numeric suffix instead of silently replacing a saved look. */
			saveTheme(name) {
				const trimmed = name.trim().slice(0, 40);
				if (trimmed === "" || this.settings.customThemes.length >= 24) return null;
				const id = `theme-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
				const theme = makeCustomTheme(this.settings, uniqueThemeName(trimmed, this.settings.customThemes), id);
				const previous = this.settings;
				this.update({ customThemes: [...previous.customThemes, theme] });
				if (!this.flushPersist()) this.rejectFailedLibraryWrite(previous);
				return id;
			}
			/** Apply one saved theme; unknown ids are harmless no-ops. */
			applyCustomTheme(id) {
				const theme = this.settings.customThemes.find((item) => item.id === id);
				if (theme !== void 0) this.update(normalizeThemeValues(theme.values));
			}
			/** Delete one saved theme without touching the active appearance. */
			deleteCustomTheme(id) {
				if (!this.settings.customThemes.some((theme) => theme.id === id)) return;
				const previous = this.settings;
				this.update({ customThemes: previous.customThemes.filter((item) => item.id !== id) });
				if (!this.flushPersist()) this.rejectFailedLibraryWrite(previous);
			}
			/** Export the current appearance as a portable, human-readable JSON file. */
			exportTheme() {
				return serializeTheme(this.settings, "DSH Background theme");
			}
			/** Import, save, and immediately apply a portable theme.
			* @returns the imported display name.
			*/
			importTheme(raw) {
				const document = parseThemeDocument(raw);
				if (this.settings.customThemes.length >= 24) throw new Error(PRISM_THEME_LIMIT_ERROR);
				const id = `theme-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
				const name = uniqueThemeName(document.name, this.settings.customThemes);
				const theme = makeCustomTheme({
					...this.settings,
					...document.values
				}, name, id);
				const previous = this.settings;
				this.update({
					...document.values,
					customThemes: [...previous.customThemes, theme]
				});
				if (!this.flushPersist()) this.rejectFailedLibraryWrite(previous);
				return name;
			}
			/** Restore only the six glass zones, leaving palette and typography intact. */
			resetZones() {
				this.update({ zones: {
					base: 100,
					sidebar: 100,
					card: 100,
					input: 100,
					overlay: 100,
					bubble: 100
				} });
			}
			/** Reset every appearance knob to the shipped defaults; saved themes and
			*  uploaded wallpapers remain available. */
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
						apply: (value) => {
							this.writeKnobVar(key, value);
						}
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
						const urls = this.dark ? this.settings.wallpaperDark : this.settings.wallpaperLight;
						const dim = (this.dark ? this.settings.wallpaperDimDark : this.settings.wallpaperDimLight)[this.wallpaperIndex(urls)] ?? .5;
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
		// \0prism-css:src/client/prism.module.css.mjs
		const css = "[data-prism-ambient]{z-index:-1;pointer-events:none;position:fixed;inset:0;overflow:hidden}[data-prism-aurora]{background-image:radial-gradient(38% 32% at 22% 18%, hsl(var(--prism-bg-h,215) var(--prism-bg-s,80%) var(--prism-bg-l,60%) / calc(.2 * var(--prism-motion,.5))), transparent 62%), radial-gradient(34% 30% at 78% 26%, hsl(calc(var(--prism-bg-h,215) + 60) var(--prism-bg-s,80%) var(--prism-bg-l,60%) / calc(.16 * var(--prism-motion,.5))), transparent 62%), radial-gradient(42% 36% at 52% 92%, hsl(calc(var(--prism-bg-h,215) + 120) var(--prism-bg-s,80%) var(--prism-bg-l,60%) / calc(.14 * var(--prism-motion,.5))), transparent 64%);animation:kJQ4wq_prism-aurora-drift 46s var(--ds-ease-in-out,ease-in-out) infinite alternate, kJQ4wq_prism-aurora-breathe 9s var(--ds-ease-in-out,ease-in-out) infinite alternate;animation-duration:calc(46s / var(--prism-motion-scale,1)), calc(9s / var(--prism-motion-scale,1));background-size:200% 200%;position:absolute;inset:-22%}@keyframes kJQ4wq_prism-aurora-drift{0%{background-position:0 0,100% 100%,50%}to{background-position:100% 100%,0 0,50% 100%}}@keyframes kJQ4wq_prism-aurora-breathe{0%{opacity:.82}to{opacity:1}}[data-prism-brightness]{background-image:linear-gradient(rgb(255 255 255/var(--prism-brightness-white,0)), rgb(255 255 255/var(--prism-brightness-white,0))), linear-gradient(rgb(0 0 0/var(--prism-brightness-black,0)), rgb(0 0 0/var(--prism-brightness-black,0)));position:absolute;inset:0}[data-prism-wallpaper]{display:none;position:absolute;inset:0}[data-dsh-prism][data-prism-wallpaper-on] [data-prism-wallpaper]{display:block}[data-prism-wallpaper-img]{object-fit:cover;width:100%;height:100%;filter:blur(var(--prism-wallpaper-blur,0px));animation:kJQ4wq_prism-wallpaper-in .8s var(--ds-ease-in-out,ease-in-out)}@keyframes kJQ4wq_prism-wallpaper-in{0%{opacity:0}to{opacity:1}}[data-prism-wallpaper]:after{content:\"\";background:rgb(255 255 255/var(--prism-wall-veil,0));position:absolute;inset:0}[data-dsh-prism] body[data-ds-dark-theme] [data-prism-wallpaper]:after{background:rgb(8 12 20/var(--prism-wall-veil,0))}[data-dsh-prism] [class*=frame],[data-dsh-prism] [data-phase],[data-dsh-prism] [class*=detailsCol]{background:0 0}[data-dsh-prism] [class*=sidebarCol],[data-dsh-prism] header,[data-dsh-prism] [data-composer-card],[data-dsh-prism] [class*=bubble],[data-dsh-prism] [role=menu],[data-dsh-prism] [class*=card],[data-dsh-prism] [class*=panel],[data-dsh-prism] [class*=popover],[data-dsh-prism] [class*=dropdown]{-webkit-backdrop-filter:blur(var(--prism-blur,18px)) saturate(var(--prism-saturate,130%))}[data-dsh-prism] body [role=dialog]{background:rgb(255 255 255/calc(.45 * var(--prism-frost,1)));-webkit-backdrop-filter:blur(50px) saturate(var(--prism-saturate,130%))}[data-dsh-prism] body[data-ds-dark-theme] [role=dialog]{background:rgb(17 26 39/calc(.55 * var(--prism-frost,1)))}[data-dsh-prism] [class*=sidebarCol]:has([role=dialog]){-webkit-backdrop-filter:none}[data-dsh-prism] [class*=sidebarCol]{z-index:9;background:rgb(255 255 255/calc(.85 * var(--prism-frost) * var(--prism-depth,1) * var(--prism-zone-sidebar,1)));border:1px solid #132d5342;border-right-color:#96bef5a6;border-radius:20px;margin:10px;padding:10px 8px 14px;position:relative;overflow:hidden;box-shadow:inset 0 1px #ffffff80,0 10px 34px #132d5329}[data-dsh-prism] body[data-ds-dark-theme] [class*=sidebarCol]{background:rgb(34 38 47/calc(.85 * var(--prism-frost) * var(--prism-depth,1) * var(--prism-zone-sidebar,1)));border-color:#94b4dc52 #94b4dc33 #94b4dc52 #94b4dc52;border-right-style:solid;border-right-width:1px;box-shadow:inset 0 1px #ffffff12,0 8px 30px #02060e52}[data-dsh-prism] [class*=handle][data-side=sidebar]{z-index:10;margin-left:-14px}[data-dsh-prism] :has(>[class*=sidebarCol]):not([data-sidebar-collapsed]) [class*=sidebarCol]>[data-slot=sidebar]>[class*=root]{width:100%!important}[data-dsh-prism] [data-sidebar-collapsed] [class*=sidebarCol]{box-shadow:none;border:none;border-radius:0;margin:0;padding:0}[data-dsh-prism] header{background:var(--dsw-alias-bg-layer-2);border:1px solid #132d5342;border-bottom-color:#0000;border-radius:20px;margin:12px 16px 0;padding:10px 16px 8px;box-shadow:inset 0 1px #ffffff80,0 10px 34px #132d5329}[data-dsh-prism] header:after{display:none}[data-dsh-prism] body[data-ds-dark-theme] header{border-color:#94b4dc52 #94b4dc52 #0000;box-shadow:inset 0 1px #ffffff12,0 8px 30px #02060e52}[data-dsh-prism] [data-composer-card],[data-dsh-prism] [data-composer-card]:after{border-radius:24px}[data-dsh-prism] [data-composer-card]{z-index:8;background:var(--dsw-specific-input-major);border:1px solid #132d5342;position:relative;box-shadow:inset 0 1px #ffffff80,0 10px 36px #132d5329}[data-dsh-prism] body[data-ds-dark-theme] [data-composer-card]{border-color:#94b4dc52;box-shadow:inset 0 1px #ffffff12,0 10px 36px #02060e80}[data-dsh-prism] [data-phase] [class*=composerSeat][class*=composerSeat]{background:0 0}[data-dsh-prism] [data-conversation-composer-overlay]{background:rgb(255 255 255/calc(.85 * var(--prism-frost) * var(--prism-depth,1) * var(--prism-zone-card,1)));-webkit-backdrop-filter:blur(var(--prism-blur,18px)) saturate(var(--prism-saturate,130%));border:1px solid #132d5342;border-radius:24px;box-shadow:inset 0 1px #ffffff80,0 10px 36px #132d5329}[data-dsh-prism] body[data-ds-dark-theme] [data-conversation-composer-overlay]{background:rgb(34 38 47/calc(.85 * var(--prism-frost) * var(--prism-depth,1) * var(--prism-zone-card,1)));border-color:#94b4dc52;box-shadow:inset 0 1px #ffffff12,0 10px 36px #02060e80}[data-dsh-prism] [data-conversation-composer-overlay] [role=toolbar]{background:0 0}[data-dsh-prism] [class*=bubble]{background:var(--dsw-specific-bubble);border:1px solid #132d5324;border-radius:14px}[data-dsh-prism] body[data-ds-dark-theme] [class*=bubble]{border-color:#94b4dc24}[data-dsh-prism] [role=menu]{background:var(--dsw-specific-menu);border-radius:14px}[data-dsh-prism] [role=menu],[data-dsh-prism] [class*=card],[data-dsh-prism] [class*=panel]{border-radius:14px}[data-dsh-prism] button[class*=button]{border-radius:10px}[data-dsh-prism] [class*=iconButton],[data-dsh-prism] [class*=searchButton]{border-radius:8px}[data-dsh-prism] svg circle[class*=track]{stroke:var(--dsw-alias-border-l3)}[data-dsh-prism] svg circle[class*=fill]{stroke:hsl(var(--prism-accent-h) var(--prism-accent-s) var(--prism-accent-l) / var(--prism-accent-a,1))}[data-dsh-prism] [class*=marker] [class*=line]{background:hsl(var(--prism-accent-h) var(--prism-accent-s) var(--prism-accent-l) / var(--prism-accent-a,1))}[data-dsh-prism] [class*=marker][data-proximity=selected] [class*=line]{filter:brightness(1.25)}[data-dsh-prism] [class*=rail] [class*=preview]{-webkit-backdrop-filter:blur(var(--prism-blur,18px)) saturate(var(--prism-saturate,130%))}[data-dsh-prism] [data-conversation-scroll]{text-shadow:0 0 1px #00000059}[data-dsh-prism] body:not([data-ds-dark-theme]) [data-conversation-scroll]{text-shadow:0 0 1px #ffffff80,0 1px 2px #132d5314}[data-dsh-prism] :focus-visible{outline:2px solid hsl(var(--prism-accent-h) var(--prism-accent-s) var(--prism-accent-l));outline-offset:1px}[data-dsh-prism] ::selection{background:hsl(var(--prism-accent-h) var(--prism-accent-s) var(--prism-accent-l) / .35)}[data-dsh-prism] button[class*=button]:hover:not(:disabled),[data-dsh-prism] [role=menuitem]:hover:not(:disabled){box-shadow:0 0 12px hsl(var(--prism-accent-h) var(--prism-accent-s) var(--prism-accent-l) / .18), inset 0 0 0 1px #94b4dc38}[data-dsh-prism]:not([data-prism-still]) [data-phase=hero],[data-dsh-prism]:not([data-prism-still]) [data-phase=active]{animation:kJQ4wq_prism-fade-in calc(.32s / var(--prism-motion-scale,1)) var(--ds-ease-in-out,ease-in-out)}[data-dsh-prism]:not([data-prism-still]) [role=dialog]{animation:kJQ4wq_prism-dialog-in calc(.24s / var(--prism-motion-scale,1)) var(--ds-ease-in-out,ease-in-out)}@keyframes kJQ4wq_prism-fade-in{0%{opacity:0}}@keyframes kJQ4wq_prism-dialog-in{0%{opacity:0;transform:translateY(8px)scale(.985)}}[data-dsh-prism][data-prism-still] [data-prism-aurora],[data-dsh-prism][data-prism-still] [data-phase=hero],[data-dsh-prism][data-prism-still] [data-phase=active],[data-dsh-prism][data-prism-still] [role=dialog]{animation:none}@media (prefers-reduced-motion:reduce){[data-dsh-prism] [data-prism-aurora],[data-dsh-prism] [data-phase=hero],[data-dsh-prism] [data-phase=active],[data-dsh-prism] [role=dialog]{animation:none}[data-dsh-prism] [data-prism-wallpaper]{display:none}}[data-prism-grain]{display:none}[data-dsh-prism][data-prism-material=velvet] [data-prism-grain]{z-index:2147482000;pointer-events:none;mix-blend-mode:soft-light;opacity:.4;background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\"),linear-gradient(115deg,#ffffff0d,#0000 45%,#0000000a 90%);display:block;position:fixed;inset:0}[data-dsh-prism][data-prism-material=velvet] [class*=sidebarCol],[data-dsh-prism][data-prism-material=velvet] header,[data-dsh-prism][data-prism-material=velvet] [data-composer-card],[data-dsh-prism][data-prism-material=velvet] [class*=bubble],[data-dsh-prism][data-prism-material=velvet] [data-conversation-composer-overlay]{-webkit-backdrop-filter:blur(calc(var(--prism-blur,18px) + 4px)) saturate(var(--prism-saturate,130%));box-shadow:inset 0 1px 3px #0000001a,inset 0 -1px 2px #ffffff0d,0 10px 30px #02060e59}@media (prefers-reduced-motion:reduce){[data-dsh-prism] [data-prism-grain]{display:none}}";
		const tagId = "@deepseek-ai/dsh-client-ui-prism/prism.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@deepseek-ai/dsh-client-ui-prism";
			tag.dataset.pluginCss = tagId;
			tag.textContent = css;
			document.head.appendChild(tag);
		}
		// src/client/index.ts
		const inject = [
			"theme",
			"slots",
			"locale"
		];
		/** Register Prism's single settings surface and its reactive state bridge. */
		function apply(ctx) {
			ctx.effect(() => ctx.locale.register(NS, {
				zh,
				en
			}), "ui-prism: settings dictionaries");
			const appearanceStore = createPrismRowStore();
			let appearanceBound;
			let revision = 0;
			const layer = new PrismLayer(ctx, () => {
				sync();
			});
			const sync = () => {
				const payload = {
					...layer.getSettings(),
					dark: layer.getDark()
				};
				appearanceBound?.sync(payload, revision);
				revision += 1;
			};
			const appearanceInjected = (actions) => {
				appearanceBound = actions;
				sync();
				return {
					setEnabled: (enabled) => {
						layer.setEnabled(enabled);
					},
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
						layer.update({ zones: { [zone]: value } });
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
					saveTheme: (name) => layer.saveTheme(name),
					applyCustomTheme: (id) => {
						layer.applyCustomTheme(id);
					},
					deleteCustomTheme: (id) => {
						layer.deleteCustomTheme(id);
					},
					exportTheme: () => layer.exportTheme(),
					importTheme: (raw) => layer.importTheme(raw),
					resetZones: () => {
						layer.resetZones();
					},
					reset: () => {
						layer.reset();
					}
				};
			};
			ctx.slots.inject("settings.general.item", () => ctx.slots.register({
				name: "settings.general.item",
				id: "prism",
				order: 12,
				store: appearanceStore,
				locale: NS,
				inject: appearanceInjected
			}, PrismAppearancePanel));
		}
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});

//# sourceMappingURL=client.js.map