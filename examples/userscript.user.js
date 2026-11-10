// ==UserScript==
// @name         ChimeraUI example panel
// @namespace    chimeraui.example
// @version      1.0.0
// @description  A small, generic userscript panel built with ChimeraUI.
// @author       you
// @license      MIT
// @match        *://*/*
// @run-at       document-idle
// @grant        none
// @require      https://cdn.jsdelivr.net/gh/lolcaken/chimeran-ui@v0.2.0/dist/chimeraui.js
// ==/UserScript==

(function () {
  'use strict';

  /* ------------------------------------------------------------------ edit --
     The two lines in the panel head. Change them, reload, done. */
  const TITLE = 'Page Tools';
  const SUBTITLE = 'v1.0 · example';

  /* Every tab is just markup: its own icon, its own label. Add or remove one
     and the rail scrolls; put data-cn-sep on a tab to draw a divider before it. */
  const PANEL = `
<div id="n1-panel">
  <div class="n1-head">
    <div class="n1-title">ChimeraUI<span class="n1-sub">0.2.0</span></div>
    <div class="n1-actions">
      <button class="n1-icon" type="button" aria-label="settings"><span class="n1-ic" data-cn-icon="gear"></span></button>
      <button class="n1-icon n1-close" type="button" aria-label="close" id="close"><span class="n1-ic" data-cn-icon="x"></span></button>
    </div>
  </div>

  <div class="n1-tabs" data-cn="tabs" role="tablist" aria-label="Sections">
    <button class="n1-tab" role="tab" aria-selected="true" data-cn-tab="home"><span class="n1-ic" data-cn-icon="home"></span><span>Home</span></button>
    <button class="n1-tab" role="tab" aria-selected="false" data-cn-tab="controls" data-cn-sep><span class="n1-ic" data-cn-icon="sliders"></span><span>Controls</span></button>
    <button class="n1-tab" role="tab" aria-selected="false" data-cn-tab="data"><span class="n1-ic" data-cn-icon="database"></span><span>Data</span></button>
    <button class="n1-tab" role="tab" aria-selected="false" data-cn-tab="feedback" data-cn-sep><span class="n1-ic" data-cn-icon="bell"></span><span>Feedback</span></button>
    <button class="n1-tab" role="tab" aria-selected="false" data-cn-tab="overlays"><span class="n1-ic" data-cn-icon="layers"></span><span>Overlays</span></button>
  </div>

  <div class="n1-main">
    <div class="n1-main-inner">
      <div class="n1-stage">

        <div class="n1-pane" data-cn-pane="home">
          <div class="n1-section">Overview</div>
          <div class="n1-alert"><span><b>Ready</b>This panel is a shadow root, so the page cannot style it.</span></div>
          <div class="n1-stat"><span class="n1-stat-label">Host</span><span class="n1-stat-value" id="host">loading…</span></div>
          <div class="n1-stat"><span class="n1-stat-label">Links</span><span class="n1-stat-value" id="links">0</span></div>
          <div class="n1-section">Actions</div>
          <button class="n1-el n1-action" type="button" data-cn-toast="Done" data-cn-title="Scanned" data-cn-msg="The page was read without touching it.">
            <span class="n1-label">Scan this page</span><span class="n1-ic" data-cn-icon="search"></span>
          </button>
          <button class="n1-el" type="button" data-cn-copy="#host"><span class="n1-label">Copy the host name</span><span class="n1-ic" data-cn-icon="copy"></span></button>
          <div class="n1-section">About</div>
          <div class="n1-spec">
            <div class="n1-spec-row n1-spec-head"><b>ChimeraUI</b><span>0.2.0</span></div>
            <div class="n1-spec-row"><b>Elements</b><span>37</span></div>
            <div class="n1-spec-row"><b>Icons</b><span>65</span></div>
          </div>
        </div>

        <div class="n1-pane" data-cn-pane="controls">
          <div class="n1-section">Behaviour</div>
          <button class="n1-toggle on" type="button" data-cn="toggle"><span class="n1-label">Compact mode</span><span class="n1-track"><span class="n1-knob"></span></span></button>
          <div class="n1-dd" data-cn="select" data-value="system">
            <button class="n1-dd-btn" type="button" aria-haspopup="listbox" aria-expanded="false">
              <span class="n1-label">Theme</span>
              <span class="n1-dd-value"><span>System</span><span class="n1-dd-chev" data-cn-icon="chevron-down"></span></span>
            </button>
            <div class="n1-dd-menu" role="listbox" aria-label="Theme" hidden>
              <button class="n1-dd-item" type="button" role="option" aria-selected="true" data-value="system"><span>System</span><span class="n1-dd-check" data-cn-icon="check"></span></button>
              <button class="n1-dd-item" type="button" role="option" aria-selected="false" data-value="dark"><span>Dark</span><span class="n1-dd-check" data-cn-icon="check"></span></button>
              <button class="n1-dd-item" type="button" role="option" aria-selected="false" data-value="light"><span>Light</span><span class="n1-dd-check" data-cn-icon="check"></span></button>
            </div>
          </div>
          <div class="n1-slider" data-cn-dec="0" data-cn-unit="%">
            <div class="n1-slider-top"><span>Panel opacity</span><span class="n1-slider-val" data-cn-value>90%</span></div>
            <input class="n1-range" type="range" min="40" max="100" value="90">
          </div>
          <div class="n1-stepper" data-cn="stepper" data-cn-min="3" data-cn-max="20" data-cn-step="1" data-cn-value-now="8">
            <span class="n1-label">Rows per page</span>
            <span class="n1-stepper-controls">
              <button type="button" data-cn-dir="down" aria-label="decrease">&minus;</button>
              <span class="n1-value" data-cn-value>8</span>
              <button type="button" data-cn-dir="up" aria-label="increase">+</button>
            </span>
          </div>
          <div class="n1-section">Features</div>
          <div class="n1-chips" data-cn-multi="true">
            <button class="n1-chip on" type="button">Auto-run</button>
            <button class="n1-chip" type="button">Hotkeys</button>
            <button class="n1-chip on" type="button">Badge</button>
          </div>
          <div class="n1-card" style="margin-top:8px">
            <button class="n1-card-head" type="button">Advanced<span class="n1-ic" data-cn-icon="chevron"></span></button>
            <div class="n1-card-body">
              <button class="n1-toggle" type="button" data-cn="toggle"><span class="n1-label">Debug logs</span><span class="n1-track"><span class="n1-knob"></span></span></button>
              <div class="n1-stat" style="margin-bottom:0"><span class="n1-stat-label">Request limit</span><span class="n1-stat-value">120 / min</span></div>
            </div>
          </div>
        </div>
        <div class="n1-pane" data-cn-pane="data">
          <div class="n1-section">This page</div>
          <table class="n1-table">
            <thead><tr><th>Item</th><th>Where</th><th class="n1-num">Count</th></tr></thead>
            <tbody>
              <tr><td>Links</td><td>document</td><td class="n1-num" id="t-links">0</td></tr>
              <tr><td>Images</td><td>document</td><td class="n1-num" id="t-images">0</td></tr>
              <tr><td>Forms</td><td>document</td><td class="n1-num" id="t-forms">0</td></tr>
            </tbody>
          </table>
          <div class="n1-section">Saved views</div>
          <div class="n1-list">
            <div class="n1-list-row">
              <span class="n1-ic" data-cn-icon="clock"></span>
              <span class="n1-list-main"><b>Recent</b><span>Last seven days</span></span>
              <span class="n1-list-meta">12</span><span class="n1-chev">&#8250;</span>
            </div>
            <div class="n1-list-row">
              <span class="n1-ic" data-cn-icon="pin"></span>
              <span class="n1-list-main"><b>Pinned</b><span>Starred by you</span></span>
              <span class="n1-list-meta">3</span><span class="n1-chev">&#8250;</span>
            </div>
          </div>
        </div>

        <div class="n1-pane" data-cn-pane="feedback">
          <div class="n1-section">Inline</div>
          <div class="n1-alert warn"><span><b>Heads up</b>Alerts stay in the flow; toasts float above the page.</span></div>
          <div class="n1-progress-row"><div class="n1-progress"><i style="width:62%"></i></div><span>62%</span></div>
          <div class="n1-progress n1-indeterminate"><i></i></div>
          <div class="n1-section">Live</div>
          <button class="n1-el" type="button" data-cn-toast="Saved" data-cn-title="Saved" data-cn-msg="All changes are stored locally.">
            <span class="n1-label">Fire a toast</span><span class="n1-badge on"><i class="n1-dot-live"></i>live</span>
          </button>
          <div class="n1-loading" style="margin:10px 2px"><span class="n1-spinner"></span>Working&hellip;</div>
        </div>

        <div class="n1-pane" data-cn-pane="overlays">
          <div class="n1-section">Surfaces</div>
          <button class="n1-el" type="button" data-cn-open="modal"><span class="n1-label">Open dialog</span><span class="n1-ic" data-cn-icon="alert"></span></button>
          <button class="n1-el" type="button" data-cn-open="drawer"><span class="n1-label">Open drawer</span><span class="n1-ic" data-cn-icon="layers"></span></button>
          <div class="n1-section">Menu</div>
          <div class="n1-menu" style="position:static;max-width:none">
            <button class="n1-menu-item" type="button"><span class="n1-ic" data-cn-icon="plus"></span>New view<kbd>Ctrl N</kbd></button>
            <button class="n1-menu-item" type="button"><span class="n1-ic" data-cn-icon="copy"></span>Duplicate</button>
            <div class="n1-menu-sep"></div>
            <button class="n1-menu-item danger" type="button"><span class="n1-ic" data-cn-icon="trash"></span>Delete</button>
          </div>
        </div>

      </div>
      <div class="n1-fade"></div>
    </div>
  </div>
</div>

<div class="n1-modal" hidden>
  <div class="n1-dialog" role="dialog" aria-modal="true" aria-labelledby="dlg-title">
    <div class="n1-dialog-title" id="dlg-title"><span class="n1-dialog-glyph" data-cn-icon="alert"></span>Clear saved data?</div>
    <div class="n1-dialog-body">This removes the local views and cannot be undone.</div>
    <div class="n1-dialog-actions">
      <button class="n1-dialog-btn" type="button" data-cn-close>Cancel</button>
      <button class="n1-dialog-btn danger" type="button" data-cn-close>Clear</button>
    </div>
  </div>
</div>

<div class="n1-drawer" hidden>
  <div class="n1-drawer-head">
    <b style="font-size:13px">Saved views</b>
    <button class="n1-dialog-btn" type="button" style="flex:none;width:32px;height:26px" data-cn-close>&times;</button>
  </div>
  <div class="n1-drawer-body">
    <div class="n1-list">
      <div class="n1-list-row"><span class="n1-ic" data-cn-icon="clock"></span><span class="n1-list-main"><b>Recent</b><span>Last seven days</span></span><span class="n1-chev">&#8250;</span></div>
      <div class="n1-list-row"><span class="n1-ic" data-cn-icon="pin"></span><span class="n1-list-main"><b>Pinned</b><span>Starred by you</span></span><span class="n1-chev">&#8250;</span></div>
    </div>
  </div>
  <div class="n1-drawer-foot"><button class="n1-dialog-btn" type="button" data-cn-close>Close</button></div>
</div>
`;

  const mounted = ChimeraUI.mount({ html: PANEL, title: TITLE, subtitle: SUBTITLE });
  const root = mounted.root;
  const host = mounted.host;

  const set = (id, text) => {
    const el = root.getElementById(id);
    if (el) el.textContent = text;
  };
  set('host', location.host || 'local file');
  set('links', document.links.length);
  set('t-links', document.links.length);
  set('t-images', document.images.length);
  set('t-forms', document.forms.length);

  root.getElementById('close').addEventListener('click', () => {
    host.style.display = 'none';
  });

  const theme = root.querySelector('.n1-dd');
  theme.addEventListener('cn:change', (e) => {
    ChimeraUI.toast(root, { title: 'Theme', message: 'Selected ' + e.detail.label + '.', duration: 2600 });
  });
})();