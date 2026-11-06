<div align="center">

# ChimeraUI

**A dependency-free UI kit for userscripts.**

35 elements · one stylesheet · 12 kB of behaviour · shadow-DOM safe

[![License: MIT](https://img.shields.io/badge/license-MIT-17996e?style=flat-square)](./LICENSE)
[![Version](https://img.shields.io/badge/version-0.1.0-17996e?style=flat-square)](https://github.com/lolcaken/chimeran-ui/releases)
[![No dependencies](https://img.shields.io/badge/dependencies-0-17996e?style=flat-square)](./package.json)
[![Overflow](https://img.shields.io/badge/overflow-none-17996e?style=flat-square)](./tools/check-overflow.mjs)

[Elements](#elements) · [Quickstart](#quickstart) · [Tokens](#tokens) · [API](#api) · [Contributing](#contributing)

</div>

---

## What it is

ChimeraUI is the panel from the ChimeraN Narrow One menu, cut out of the cheat and turned into a general-purpose kit for **userscripts**. It is built for the one environment browser extensions never handle well: somebody else's page, where your stylesheet must not leak, your z-index must sit above the app, and your panel must never push the host layout around.

- **Scoped by construction** — every rule lives under `n1-*` classes and is designed to be injected into a shadow root. Nothing sets `body`, `html`, or a bare element selector.
- **One import** — `css/chimera-ui.css` pulls the tokens and all 35 element files.
- **Markup first** — the behaviour file is optional. If you only want the look, drop the CSS and write your own handlers.
- **No overflow** — verified by a Playwright gate on all 36 pages, at three viewport widths.
- **No framework, no build step to consume it** — plain CSS and one IIFE.

![The ChimeraUI panel](docs/img/panel.png)

---

## Quickstart

### As a userscript (recommended)

```js
// ==UserScript==
// @name         My Panel
// @namespace    me
// @version      1.0.0
// @match        *://example.com/*
// @require      https://cdn.jsdelivr.net/gh/lolcaken/chimeran-ui@v0.1.0/dist/chimeraui.js
// @grant        none
// ==/UserScript==

const PANEL = `
<div id="n1-panel" class="n1-root">
  <div class="n1-head">
    <div class="n1-title">My Panel<span class="n1-sub">1.0.0</span></div>
  </div>
  <div class="n1-tabs" data-cn="tabs">
    <button class="n1-tab" role="tab" aria-selected="true" data-cn-tab="main">Main</button>
  </div>
  <div class="n1-main"><div class="n1-main-inner"><div class="n1-stage">
    <div class="n1-pane" data-cn-pane="main">
      <button class="n1-toggle on" data-cn="toggle">
        <span class="n1-label">Feature</span>
        <span class="n1-track"><span class="n1-knob"></span></span>
      </button>
    </div>
  </div></div></div>
</div>`;

const { root } = ChimeraUI.mount({ html: PANEL });
ChimeraUI.toast(root, { title: 'Loaded', message: 'Press Insert.' });
```

`mount()` creates the fixed host, attaches the shadow root, injects the stylesheet, and runs `attach()` on the result.

### As plain CSS

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/lolcaken/chimeran-ui@v0.1.0/css/chimera-ui.css">
<body class="n1-root"> ... </body>
```

### From source

```bash
git clone https://github.com/lolcaken/chimeran-ui
cd chimeran-ui
node build.mjs      # -> dist/chimeraui.js, dist/chimeraui.css
npm test            # overflow gate
```

---

## Why it is shaped like this

| Decision | Reason |
|---|---|
| `n1-*` prefix on every class | A userscript shares a document with an app it does not control. Prefixed, flat class names cannot collide. |
| Shadow root by default | Host styles cannot reach in; panel styles cannot leak out. `mount()` does it for you. |
| 458 px surface | Fixed width with `max-width:calc(100vw - 20px)`. Wide enough for two columns, narrow enough for a laptop. |
| 410 px scroll pane | The panel never grows past the viewport; the content scrolls instead. |
| Fixed table layout | Long cells ellipsise rather than widening the panel. |
| `min-width:0` on every flex child | The single most common cause of a panel that "mysteriously" grows. |
| One CSS file per element | Audit or ship a single component without dragging the rest. |
| No global selectors | `body`, `html`, `*` are untouched. The kit cannot restyle the host page. |

---

## Elements

Every element has a standalone page with states, markup, and a live demo.

### Buttons

| | |
|---|---|
| [Button](elements/button.html) | 42 px row, primary / danger / ghost / small / disabled / running |
| [Icon button](elements/icon-button.html) | 24 px square, 14 px glyph, close variant |
| [Destructive row](elements/bypass.html) | The one red surface, 38 px, glow while active |

![Buttons](docs/img/button.png)

### Inputs

| | |
|---|---|
| [Toggle](elements/toggle.html) | 34 × 18 track, 12 px knob |
| [Slider](elements/slider.html) | Range with live readout and painted fill |
| [Select](elements/select.html) | Native select, panel geometry |
| [Chips](elements/chips.html) | Single or multi select, wraps |
| [Input](elements/input.html) | 34 px field, accent focus |
| [Textarea](elements/textarea.html) | Multi-line, vertical resize |
| [Checkbox](elements/checkbox.html) | 16 px box, CSS tick |
| [Radio](elements/radio.html) | 16 px ring, accent dot |
| [Stepper](elements/stepper.html) | Bounded numeric control |
| [Search](elements/search.html) | Field with glyph and clear |
| [Keybind](elements/keybind.html) | Captures the next key |
| [Colour](elements/color.html) | Native colour input in a swatch |

![Slider](docs/img/slider.png)
![Toggle](docs/img/toggle.png)

### Feedback

| | |
|---|---|
| [Toast](elements/toast.html) | Fixed stack, timed bar, info / warn / error |
| [Alert](elements/alert.html) | Inline, same left-bar language |
| [Progress](elements/progress.html) | Determinate and indeterminate |
| [Spinner](elements/spinner.html) | 16 px and 24 px |
| [Skeleton](elements/skeleton.html) | Shimmer placeholders |
| [Badge](elements/badge.html) | Count and status pills |
| [Tooltip](elements/tooltip.html) | CSS-only on `data-tip` |

![Alert](docs/img/alert.png)
![Badge](docs/img/badge.png)

### Data

| | |
|---|---|
| [Stat](elements/stat.html) | Read-only label/value row |
| [Spec list](elements/spec.html) | Dense metadata rows |
| [Table](elements/table.html) | Fixed layout, ellipsis cells |
| [List row](elements/list.html) | Icon, two lines, meta, chevron |
| [Avatar](elements/avatar.html) | 26 px initial patch |
| [Keyboard cap](elements/kbd.html) | Inline `<kbd>` styling |
| [Code block](elements/code.html) | Monospace surface |
| [Divider](elements/divider.html) | Hairline, optional label |
| [Empty state](elements/empty.html) | Dashed frame, one action |

![Table](docs/img/table.png)

### Overlays

| | |
|---|---|
| [Modal](elements/modal.html) | Scrim + 330 px dialog |
| [Drawer](elements/drawer.html) | Right sheet, 300 px |
| [Context menu](elements/menu.html) | 180–220 px floating list |
| [Popover](elements/popover.html) | 250 px anchored panel |

![Context menu](docs/img/menu.png)

---

## Tokens

Declared once on `.n1-root`. Nothing in the kit hard-codes a colour.

| Token | Value | Used for |
|---|---|---|
| `--n1-window` | `#0b0b0b` | Panel base |
| `--n1-el` / `--n1-el2` | `#1f1f1f` / `#252525` | Row gradient |
| `--n1-stroke` | `#2e2e2e` | Idle border |
| `--n1-stroke-hover` | `#414141` | Hover border |
| `--n1-text` | `#f2f2f2` | Body copy |
| `--n1-dim` | `#8a8a8a` | Secondary copy |
| `--n1-faint` | `#6f6f6f` | Meta, icons |
| `--n1-accent` | `#17996e` | Fill, toggle on |
| `--n1-accent-edge` | `#20c990` | Focus, glow, values |
| `--n1-error` | `#f04b4b` | Destructive |
| `--n1-warn` | `#f0a83c` | Capture, warnings |

Type is `12px/1.35 "Builder Sans","Segoe UI Variable Text","Segoe UI",system-ui,sans-serif`.

---

## API

`window.ChimeraUI` exposes four things.

### `mount(opts)`

```ts
mount({
  html?: string;      // panel markup
  css?: string;       // defaults to the bundled stylesheet
  id?: string;        // host id
  mode?: 'open' | 'closed';
  parent?: HTMLElement;
}): { host: HTMLElement, root: ShadowRoot }
```

Creates a fixed, full-viewport, `pointer-events:none` host, attaches a shadow root, injects styles and markup, appends to `parent` (default `document.body`), then calls `attach(root)`.

### `attach(root)`

Wires every `data-cn-*` behaviour inside `root`. Idempotent. Call it after you inject markup into an existing shadow root.

### `toast(root, opts)`

```ts
toast(root, { title: 'Saved', message: 'Written.', type: 'info' | 'warn' | 'error', duration: 4200 })
```

Creates `.n1-toasts` on demand and returns the toast node.

### `tabs(root, box)`

The tab controller used by `attach()`, exported for manual wiring.

### Data attributes

| Attribute | On | Effect |
|---|---|---|
| `data-cn="tabs"` | tab rail | Arrow/Home/End navigation, `aria-selected`, pane switching |
| `data-cn-tab` / `data-cn-pane` | tab / pane | Matching pair |
| `data-cn="toggle"` | button | Flips `.on` and `aria-pressed` |
| `data-cn="stepper"` | row | Bounds from `data-cn-min/max/step` |
| `data-cn-open="modal"` / `"drawer"` | any | Opens the first matching overlay |
| `data-cn-close` | any | Closes the containing overlay |
| `data-cn-toast`, `data-cn-title`, `data-cn-msg`, `data-cn-type` | any | Fires a toast |
| `data-cn-copy` | any | Copies a selector's text, or its own |
| `data-cn-multi="true"` | `.n1-chips` | Multi-select |
| `data-cn-unit` / `data-cn-dec` | `.n1-slider` | Readout formatting |

Events: `cn:change`, `cn:tab`, `cn:open`, `cn:close` — all bubbling `CustomEvent`s.

---

## Accessibility

- Tabs are `role="tab"` with roving `tabindex` and `aria-selected`; panes are labelled by their tab.
- Toggles expose `aria-pressed`.
- Modals set `aria-modal`, move focus in, close on Escape and scrim click.
- Focus is visible on every interactive element (`:focus-visible`, accent ring).
- `prefers-reduced-motion: reduce` disables every animation and transition in the kit.
- Colour is never the only signal: badges carry text, alerts carry a heading.

---

## The overflow gate

`npm test` runs `tools/check-overflow.mjs`, which loads all 36 pages and fails on:

1. any horizontal document overflow (`scrollWidth > clientWidth`),
2. any block whose border box escapes the content column.

It runs at 320, 458 and 1280 px. A component that grows its parent does not merge.

---

## Contributing

Read [CONTRIBUTING.md](./CONTRIBUTING.md). New components must reuse the token set, pass the overflow gate, and ship a page under `elements/`. No new colours.

---

## License

MIT © 2026 [lolcaken](https://github.com/lolcaken)
