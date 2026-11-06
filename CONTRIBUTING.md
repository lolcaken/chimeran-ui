# Contributing to ChimeraUI

ChimeraUI is a CSS-first kit. The markup is the API; the behaviour file is optional. Keep it that way.

## Ground rules

1. **Tokens only.** No colour may appear in a component file unless it comes from `--n1-*`. If a new colour is unavoidable, it belongs in `css/tokens.css` and needs a reason.
2. **No overflow.** `npm test` must pass. Every flex child that holds text needs `min-width:0`; every table uses `table-layout:fixed`.
3. **No global selectors.** `body`, `html`, `*`, bare element selectors — none of them. Everything is namespaced `n1-` and lives under `.n1-root`.
4. **One element, one file.** `css/elements/<name>.css` plus `elements/<name>.html`. Do not add a second component to an existing file.
5. **No dependency.** If it needs a library, it does not go in the kit.
6. **Shadow-DOM safe.** No `document.getElementById` inside component CSS or behaviour. Scoped lookups only.

## Adding an element

1. `css/elements/thing.css` — component rules.
2. `elements/thing.html` — states, live demo, markup block.
3. Add the import to `css/chimera-ui.css` and the link to all groups in `index.html`.
4. Add the name to `tools/check-overflow.mjs`.
5. `node build.mjs && npm test`.
6. Update the element table in `README.md`.

## Sizes the kit already uses

| Token | Value |
|---|---|
| Panel width | 458 px |
| Pane height | 410 px |
| Row height | 42 px (small: 34 px) |
| Tab height | 31 px |
| Icon button | 24 px |
| Radius | 20 / 13 / 11 / 9 / 7 |

New elements should reuse one of these. A new radius or height needs a reason in the PR.

## Commit style

`element/slider: add tick marks` — scope, colon, imperative summary. One component per commit where possible.

## Licence

By contributing you agree your work is released under the MIT licence in `LICENSE`.
