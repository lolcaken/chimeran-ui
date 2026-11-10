// ==UserScript==
// @name         ChimeraUI
// @namespace    chimeraui
// @version      0.2.0
// @description  Dependency-free panel kit for userscripts: 37 components, 65 icons.
// @author       lolcaken
// @license      MIT
// @match        *://*/*
// @run-at       document-idle
// @grant        none
// ==/UserScript==

/* ChimeraUI 0.2.0 — built 2026-11-10 */
(function () {
  'use strict';
  var CSS = "/* tokens.css */\n.n1-root{direction:ltr;unicode-bidi:isolate;--n1-window:#0b0b0b;--n1-el:#1f1f1f;--n1-el2:#252525;--n1-stroke:#2e2e2e;--n1-stroke-hover:#414141;--n1-text:#f2f2f2;--n1-dim:#8a8a8a;--n1-faint:#6f6f6f;--n1-accent:#17996e;--n1-accent-edge:#20c990;--n1-error:#f04b4b;--n1-warn:#f0a83c;font:12px/1.35 \"Builder Sans\",\"Segoe UI Variable Text\",\"Segoe UI\",system-ui,-apple-system,sans-serif;color:var(--n1-text);-webkit-font-smoothing:antialiased}\n/* base.css */\n.n1-root,.n1-root *,.n1-root *::before,.n1-root *::after{box-sizing:border-box}.n1-root{color:var(--n1-text,#f2f2f2);font:12px/1.35 \"Builder Sans\",\"Segoe UI Variable Text\",\"Segoe UI\",system-ui,-apple-system,sans-serif;-webkit-font-smoothing:antialiased}.n1-root a{color:var(--n1-accent-edge,#20c990);text-decoration:none}.n1-root a:hover{text-decoration:underline}.n1-root:focus-visible{outline:2px solid var(--n1-accent-edge,#20c990);outline-offset:2px}.n1-root button:focus{outline:none}.n1-root::selection{background:rgba(23,153,110,.45);color:#fff}@media (prefers-reduced-motion:reduce){.n1-root *,.n1-root *::before,.n1-root *::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}}\n/* shell/panel.css */\n#n1-panel{position:relative;z-index:2147483000;width:458px;max-width:calc(100vw - 20px);max-height:calc(100vh - 18px);pointer-events:auto;color:var(--n1-text);background:radial-gradient(120% 55% at 50% -12%,rgba(255,255,255,.06),transparent 60%),linear-gradient(180deg,#080808 0%,#131313 58%,#191919 100%);border:1px solid rgba(255,255,255,.11);border-radius:20px;box-shadow:inset 0 1px 0 rgba(255,255,255,.06),0 24px 64px rgba(0,0,0,.7),0 4px 14px rgba(0,0,0,.5);overflow:hidden;user-select:none;animation:n1-in .22s cubic-bezier(.2,.8,.2,1) both}#n1-panel.collapsed .n1-main{grid-template-rows:0fr;opacity:0}#n1-panel.n1-out{animation:n1-out .18s cubic-bezier(.4,0,.7,0) forwards;pointer-events:none}.n1-main{display:grid;grid-template-rows:1fr;transition:grid-template-rows .26s cubic-bezier(.2,.7,.3,1),opacity .18s ease}.n1-main-inner{min-height:0;overflow:hidden}@keyframes n1-in{from{opacity:0;transform:translateY(9px) scale(.975)}to{opacity:1;transform:none}}@keyframes n1-out{to{opacity:0;transform:translateY(7px) scale(.975)}}\n/* shell/head.css */\n.n1-head{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:13px 13px 9px 15px;cursor:grab;touch-action:none}.n1-head:active{cursor:grabbing}.n1-title{font-size:15px;font-weight:650;letter-spacing:.005em;line-height:1.1;color:#fff;display:flex;flex-direction:column;gap:2px;min-width:0}.n1-sub{font-size:10px;font-weight:500;color:var(--n1-dim);letter-spacing:.01em}.n1-actions{display:flex;align-items:center;gap:2px;flex:none}\n/* shell/tabs.css */\n.n1-tabs{display:flex;flex-wrap:nowrap;gap:4px;padding:0 13px 9px;overflow-x:auto;overflow-y:hidden;scrollbar-width:none;overscroll-behavior-x:contain;cursor:grab;touch-action:pan-x;-webkit-mask-image:linear-gradient(90deg,transparent 0,#000 10px,#000 calc(100% - 26px),transparent 100%);mask-image:linear-gradient(90deg,transparent 0,#000 10px,#000 calc(100% - 26px),transparent 100%)}.n1-tabs.n1-drag{cursor:grabbing;user-select:none}.n1-tabs.n1-drag .n1-tab{pointer-events:none}.n1-tabs::-webkit-scrollbar{display:none}.n1-tab{display:inline-flex;align-items:center;justify-content:center;gap:5px;flex:1 0 auto;height:31px;padding:0 8px;border-radius:999px;cursor:pointer;font:inherit;font-size:11px;font-weight:500;color:#cfcfcf;background:linear-gradient(180deg,#323232,#232323);border:1px solid rgba(255,255,255,.13);box-shadow:inset 0 1px 0 rgba(255,255,255,.06);transition:border-color .18s ease,color .18s ease,background .18s ease;white-space:nowrap}.n1-tab>span{min-width:0;overflow:hidden;text-overflow:ellipsis}.n1-tab .n1-ic svg{width:12px;height:12px}.n1-tab:hover{border-color:rgba(255,255,255,.24);color:#fff}.n1-tab:hover .n1-ic{transform:translateY(-1px)}.n1-tab:active{transform:scale(.965)}.n1-tab[aria-selected=\"true\"]{color:#fff;border-color:rgba(255,255,255,.30);background:linear-gradient(180deg,#3d3d3d,#2a2a2a)}.n1-tab[aria-selected=\"true\"] .n1-ic{color:var(--tab-accent,var(--n1-accent-edge))}.n1-tab .n1-ic{transition:transform .18s cubic-bezier(.2,1.2,.4,1),color .18s ease}.n1-tab-sep{flex:none;width:1px;align-self:center;height:16px;background:rgba(255,255,255,.13);margin:0 3px}\n/* shell/pane.css */\n.n1-stage{position:relative;isolation:isolate}.n1-pane{display:none;height:410px;max-height:min(410px,calc(100vh - 112px));overflow-y:auto;overscroll-behavior:contain;padding:0 13px 12px}.n1-pane.active{display:block;animation:n1-pane .16s ease both}.n1-pane::-webkit-scrollbar{width:4px}.n1-pane::-webkit-scrollbar-thumb{background:rgba(255,255,255,.14);border-radius:4px}.n1-fade{position:absolute;left:0;right:0;bottom:0;height:64px;pointer-events:none;opacity:0;z-index:2;border-radius:0 0 20px 20px;background:linear-gradient(180deg,rgba(24,24,24,0) 0%,rgba(23,23,23,.62) 46%,rgba(25,25,25,.94) 82%,#191919 100%);box-shadow:0 -18px 26px -18px rgba(0,0,0,.75) inset;transition:opacity .16s ease}.n1-fade.on{opacity:1}@keyframes n1-pane{from{opacity:0;transform:translateY(3px)}to{opacity:1;transform:none}}\n/* shell/card.css */\n.n1-card{border:1px solid rgba(255,255,255,.07);border-radius:13px;background:linear-gradient(180deg,rgba(255,255,255,.022),rgba(255,255,255,0));margin:0 0 7px;overflow:hidden}.n1-card-head{width:100%;display:flex;align-items:center;justify-content:space-between;gap:8px;padding:9px 10px;border:none;background:transparent;color:var(--n1-dim);font:inherit;font-size:10.5px;font-weight:600;letter-spacing:.02em;text-transform:uppercase;cursor:pointer;user-select:none;transition:color .16s ease}.n1-card-head:hover{color:#e8e8e8}.n1-card-head .n1-ic{display:inline-flex;color:var(--n1-faint);transition:transform .18s ease;transform:rotate(90deg)}.n1-card.collapsed .n1-card-head .n1-ic{transform:rotate(0)}.n1-card-body{padding:0 8px 6px;display:flex;flex-direction:column}.n1-card-body:empty{display:none}.n1-card-body .n1-note{padding:6px 4px 0}.n1-card.collapsed .n1-card-body{display:none}.n1-card.collapsed{background:rgba(255,255,255,.012)}.n1-card-body{animation:n1-card-in .18s ease both}@keyframes n1-card-in{from{opacity:0;transform:translateY(-3px)}to{opacity:1;transform:none}}\n/* shell/section.css */\n.n1-section{font-size:10.5px;font-weight:600;color:var(--n1-dim);margin:10px 2px 6px;letter-spacing:.02em;text-transform:uppercase}.n1-pane>.n1-section:first-child{margin-top:1px}.n1-note{padding:7px 13px 0;font-size:10px;line-height:1.5;color:var(--n1-dim)}.n1-card-body .n1-note{padding:6px 4px 0}.n1-duo{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:6px}.n1-duo .n1-el{margin-bottom:0}\n/* elements/button.css */\n.n1-el{width:100%;display:flex;align-items:center;justify-content:space-between;gap:10px;min-height:42px;padding:8px 11px;margin-bottom:6px;border-radius:11px;border:1px solid var(--n1-stroke);background:linear-gradient(180deg,var(--n1-el),var(--n1-el2));box-shadow:inset 0 1px 0 rgba(255,255,255,.03);color:var(--n1-text);font:inherit;font-size:12px;font-weight:500;text-align:left;cursor:pointer;position:relative;overflow:hidden;transition:border-color .18s ease,background .18s ease,transform .1s ease}button.n1-el:hover{border-color:var(--n1-stroke-hover);background:linear-gradient(180deg,#262626,#2b2b2b)}button.n1-el:active{transform:scale(.994)}button.n1-el:disabled{opacity:.5;cursor:default;pointer-events:none}.n1-el .n1-label{flex:1 1 auto;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.n1-static{cursor:default}.n1-action .n1-ic{color:var(--n1-faint);display:inline-flex}.n1-action::before{content:'';position:absolute;inset:0;pointer-events:none;background:linear-gradient(100deg,transparent 30%,rgba(255,255,255,.07) 47%,transparent 62%);transform:translateX(-130%);transition:transform .5s ease}.n1-action:hover::before{transform:translateX(130%)}.n1-el.running::after{content:'';position:absolute;left:0;bottom:0;height:2px;width:42%;background:linear-gradient(90deg,transparent,var(--n1-accent),var(--n1-accent-edge),transparent);animation:n1-bar 1.1s linear infinite}.n1-el.n1-sm{min-height:34px;font-size:11px;padding:0 10px;margin-bottom:0}.n1-el.n1-primary{border-color:rgba(32,201,144,.5);background:linear-gradient(180deg,rgba(23,153,110,.42),rgba(23,153,110,.18));color:#eafff6}.n1-el.n1-primary:hover{background:linear-gradient(180deg,rgba(23,153,110,.55),rgba(23,153,110,.26));border-color:rgba(32,201,144,.75)}.n1-el.n1-danger{border-color:rgba(240,75,75,.42);background:linear-gradient(180deg,#2b1a1a,#1d1414);color:#ffd9d9}.n1-el.n1-danger:hover{background:linear-gradient(180deg,#352020,#241818);border-color:rgba(240,75,75,.7)}.n1-el.n1-ghost{background:transparent;border-color:rgba(255,255,255,.1);box-shadow:none}@keyframes n1-bar{0%{transform:translateX(-110%)}100%{transform:translateX(340%)}}\n/* elements/icon.css */\n.n1-ic{display:inline-flex;align-items:center;justify-content:center;flex:none;line-height:0}.n1-ic svg{width:14px;height:14px;display:block;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}.n1-ic.n1-ic-sm svg{width:12px;height:12px}.n1-ic.n1-ic-lg svg{width:18px;height:18px}.n1-ic.n1-ic-xl svg{width:22px;height:22px}.n1-icon-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(88px,1fr));gap:6px;margin-bottom:8px}.n1-icon-cell{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:7px;min-height:76px;padding:9px 6px;border-radius:10px;border:1px solid var(--n1-stroke);background:linear-gradient(180deg,var(--n1-el),var(--n1-el2));color:#dcdcdc;font:inherit;font-size:9.5px;letter-spacing:.02em;cursor:pointer;transition:border-color .16s ease,color .16s ease,background .16s ease,transform .1s ease}.n1-icon-cell:hover{border-color:var(--n1-stroke-hover);color:#fff;background:linear-gradient(180deg,#262626,#2b2b2b)}.n1-icon-cell:active{transform:scale(.97)}.n1-icon-cell .n1-ic{color:var(--n1-accent-edge)}.n1-icon-cell span{max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.n1-icon-cell[data-copied]{border-color:rgba(32,201,144,.7)}\n/* elements/icon-button.css */\n.n1-icon{width:24px;height:24px;padding:0;display:inline-flex;align-items:center;justify-content:center;color:#c9c9c9;background:transparent;border:none;border-radius:7px;cursor:pointer;transition:background .16s ease,color .16s ease}.n1-icon:hover{background:rgba(255,255,255,.08);color:#fff}.n1-icon.n1-close:hover{background:rgba(240,75,75,.18);color:#ff9a9a}.n1-icon.n1-lg{width:30px;height:30px;border-radius:9px}.n1-icon.n1-lg .n1-ic svg{width:16px;height:16px}\n/* elements/toggle.css */\n.n1-toggle{display:flex;align-items:center;justify-content:space-between;gap:10px;width:100%;min-height:42px;padding:8px 11px;margin-bottom:6px;border-radius:11px;border:1px solid var(--n1-stroke);background:linear-gradient(180deg,var(--n1-el),var(--n1-el2));box-shadow:inset 0 1px 0 rgba(255,255,255,.03);color:var(--n1-text);font:inherit;font-size:12px;font-weight:500;cursor:pointer;text-align:left;transition:border-color .18s ease,background .18s ease}.n1-toggle:hover{border-color:var(--n1-stroke-hover)}.n1-track{position:relative;flex:none;width:34px;height:18px;border-radius:999px;background:rgba(0,0,0,.55);border:1px solid rgba(255,255,255,.10);box-shadow:inset 0 1px 2px rgba(0,0,0,.5);transition:background .18s ease,border-color .18s ease,box-shadow .18s ease}.n1-knob{position:absolute;top:2px;left:2px;width:12px;height:12px;border-radius:50%;background:#d6d6d6;box-shadow:0 1px 2px rgba(0,0,0,.45);transition:transform .18s cubic-bezier(.2,1.35,.4,1),background .18s ease}.n1-toggle.on .n1-track{background:var(--n1-accent);border-color:var(--n1-accent-edge);box-shadow:0 0 10px rgba(32,201,144,.32),inset 0 1px 0 rgba(255,255,255,.14)}.n1-toggle.on .n1-knob{transform:translateX(16px);background:#fff}\n/* elements/slider.css */\n.n1-slider{display:flex;flex-direction:column;gap:5px;padding:8px 11px 9px;margin-bottom:6px;border-radius:11px;border:1px solid var(--n1-stroke);background:linear-gradient(180deg,var(--n1-el),var(--n1-el2));box-shadow:inset 0 1px 0 rgba(255,255,255,.03)}.n1-slider-top{display:flex;align-items:center;justify-content:space-between;gap:8px;font-size:12px;font-weight:500}.n1-slider-val{font-size:11px;color:var(--n1-accent-edge);font-variant-numeric:tabular-nums}.n1-range{-webkit-appearance:none;appearance:none;width:100%;height:3px;border-radius:3px;background:#333;outline:none;margin:2px 0}.n1-range::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:11px;height:11px;border-radius:50%;background:var(--n1-accent-edge);box-shadow:0 0 8px rgba(32,201,144,.5);cursor:pointer;transition:box-shadow .18s ease,transform .12s ease}.n1-range::-moz-range-thumb{width:11px;height:11px;border:0;border-radius:50%;background:var(--n1-accent-edge);cursor:pointer}.n1-range:hover::-webkit-slider-thumb{box-shadow:0 0 12px rgba(32,201,144,.75);transform:scale(1.15)}\n/* elements/select.css */\n.n1-select{min-width:108px;max-width:150px;background:#161616;color:#eee;border:1px solid #333;border-radius:8px;padding:4px 6px;font:inherit;font-size:11px;outline:none;transition:border-color .16s ease}.n1-select:hover{border-color:#414141}.n1-select:focus-visible{border-color:var(--n1-accent-edge)}.n1-select option{background:#161616;color:#eee}.n1-rowctl{display:flex;align-items:center;justify-content:space-between;gap:10px;min-height:42px;padding:8px 11px;margin-bottom:6px;border-radius:11px;border:1px solid var(--n1-stroke);background:linear-gradient(180deg,var(--n1-el),var(--n1-el2))}\n/* elements/dropdown.css */\n.n1-dd{position:relative;margin-bottom:6px}.n1-dd-btn{width:100%;display:flex;align-items:center;justify-content:space-between;gap:10px;min-height:42px;padding:8px 11px;border-radius:11px;border:1px solid var(--n1-stroke);background:linear-gradient(180deg,var(--n1-el),var(--n1-el2));box-shadow:inset 0 1px 0 rgba(255,255,255,.03);color:var(--n1-text);font:inherit;font-size:12px;font-weight:500;text-align:left;cursor:pointer;transition:border-color .18s ease,background .18s ease,box-shadow .18s ease}.n1-dd-btn:hover{border-color:var(--n1-stroke-hover)}.n1-dd-btn:focus-visible{outline:none;border-color:var(--n1-accent-edge)}.n1-dd[data-open=\"true\"] .n1-dd-btn{border-color:var(--n1-accent-edge);box-shadow:0 0 0 1px rgba(32,201,144,.16),inset 0 1px 0 rgba(255,255,255,.04)}.n1-dd-value{display:inline-flex;align-items:center;gap:7px;min-width:0;color:#fff;font-size:11.5px;font-weight:500}.n1-dd-value>span{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.n1-dd-chev{flex:none;color:var(--n1-faint);display:inline-flex;transition:transform .2s cubic-bezier(.2,1.2,.4,1),color .2s ease}.n1-dd-chev svg{width:12px;height:12px;display:block}.n1-dd[data-open=\"true\"] .n1-dd-chev{transform:rotate(180deg);color:var(--n1-accent-edge)}.n1-dd-menu{position:fixed;z-index:2147483007;min-width:160px;padding:5px;overflow-y:auto;overscroll-behavior:contain;border-radius:12px;border:1px solid rgba(255,255,255,.12);background:linear-gradient(180deg,#171717,#0e0e0e);box-shadow:0 22px 54px rgba(0,0,0,.72),inset 0 1px 0 rgba(255,255,255,.05);animation:n1-dd-in .16s cubic-bezier(.2,1.2,.4,1) both}.n1-dd-menu.up{animation-name:n1-dd-in-up}.n1-dd-menu[hidden]{display:none}.n1-dd-menu::-webkit-scrollbar{width:4px}.n1-dd-menu::-webkit-scrollbar-thumb{background:rgba(255,255,255,.14);border-radius:4px}.n1-dd-item{display:flex;align-items:center;gap:8px;width:100%;height:30px;padding:0 8px;border:0;border-radius:8px;background:transparent;color:#dcdcdc;font:inherit;font-size:11.5px;text-align:left;cursor:pointer;white-space:nowrap;transition:background .14s ease,color .14s ease}.n1-dd-item>span{min-width:0;overflow:hidden;text-overflow:ellipsis}.n1-dd-item:hover,.n1-dd-item:focus-visible{outline:none;background:rgba(255,255,255,.07);color:#fff}.n1-dd-item[aria-selected=\"true\"]{color:#eafff6;background:rgba(23,153,110,.16)}.n1-dd-item[aria-selected=\"true\"]:hover{background:rgba(23,153,110,.24)}.n1-dd-check{margin-left:auto;opacity:0;color:var(--n1-accent-edge);display:inline-flex}.n1-dd-check svg{width:13px;height:13px;display:block}.n1-dd-item[aria-selected=\"true\"] .n1-dd-check{opacity:1}@keyframes n1-dd-in{from{opacity:0;transform:translateY(-5px) scale(.985)}to{opacity:1;transform:none}}@keyframes n1-dd-in-up{from{opacity:0;transform:translateY(5px) scale(.985)}to{opacity:1;transform:none}}\n/* elements/chips.css */\n.n1-chips{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:7px;padding:7px;border-radius:11px;border:1px solid var(--n1-stroke);background:linear-gradient(180deg,var(--n1-el),var(--n1-el2));box-shadow:inset 0 1px 0 rgba(255,255,255,.03)}.n1-chip{height:24px;padding:0 9px;border-radius:999px;border:1px solid rgba(255,255,255,.11);background:#1b1b1b;color:#c9c9c9;font:inherit;font-size:10.5px;font-weight:600;letter-spacing:.02em;cursor:pointer;transition:border-color .16s ease,color .16s ease,background .16s ease,transform .1s ease}.n1-chip:hover{border-color:rgba(255,255,255,.26);color:#fff}.n1-chip:active{transform:scale(.96)}.n1-chip.on{color:#eafff6;border-color:rgba(32,201,144,.6);background:linear-gradient(180deg,rgba(23,153,110,.5),rgba(23,153,110,.22));box-shadow:0 0 12px rgba(32,201,144,.18)}\n/* elements/input.css */\n.n1-field{display:flex;flex-direction:column;gap:5px;margin-bottom:6px}.n1-field>span{font-size:10px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;color:var(--n1-dim)}.n1-input{width:100%;height:34px;padding:0 10px;border-radius:9px;border:1px solid #2e2e2e;background:#161616;color:#f2f2f2;font:inherit;font-size:12px;outline:none;transition:border-color .16s ease,background .16s ease}.n1-input::placeholder{color:#6f6f6f}.n1-input:hover{border-color:#3a3a3a}.n1-input:focus{border-color:var(--n1-accent-edge);background:#181818}.n1-input:disabled{opacity:.5;cursor:not-allowed}\n/* elements/textarea.css */\n.n1-textarea{width:100%;min-height:74px;padding:8px 10px;border-radius:9px;border:1px solid #2e2e2e;background:#161616;color:#f2f2f2;font:inherit;font-size:12px;line-height:1.45;outline:none;resize:vertical;transition:border-color .16s ease}.n1-textarea::placeholder{color:#6f6f6f}.n1-textarea:focus{border-color:var(--n1-accent-edge)}\n/* elements/checkbox.css */\n.n1-check{display:flex;align-items:center;gap:9px;min-height:34px;font-size:12px;color:var(--n1-text);cursor:pointer;user-select:none}.n1-check input{position:absolute;opacity:0;width:0;height:0}.n1-check .n1-box{position:relative;flex:none;width:16px;height:16px;border-radius:5px;border:1px solid #3a3a3a;background:#161616;transition:border-color .16s ease,background .16s ease,box-shadow .16s ease}.n1-check .n1-box::after{content:'';position:absolute;left:5px;top:2px;width:4px;height:8px;border:solid #fff;border-width:0 1.8px 1.8px 0;transform:rotate(45deg) scale(0);transition:transform .14s cubic-bezier(.2,1.3,.4,1)}.n1-check:hover .n1-box{border-color:#4a4a4a}.n1-check input:checked+.n1-box{background:var(--n1-accent);border-color:var(--n1-accent-edge);box-shadow:0 0 10px rgba(32,201,144,.28)}.n1-check input:checked+.n1-box::after{transform:rotate(45deg) scale(1)}.n1-check input:focus-visible+.n1-box{outline:2px solid var(--n1-accent-edge);outline-offset:2px}\n/* elements/radio.css */\n.n1-radio{display:flex;align-items:center;gap:9px;min-height:34px;font-size:12px;color:var(--n1-text);cursor:pointer;user-select:none}.n1-radio input{position:absolute;opacity:0;width:0;height:0}.n1-radio .n1-dot{position:relative;flex:none;width:16px;height:16px;border-radius:50%;border:1px solid #3a3a3a;background:#161616;transition:border-color .16s ease,box-shadow .16s ease}.n1-radio .n1-dot::after{content:'';position:absolute;inset:3.5px;border-radius:50%;background:var(--n1-accent-edge);transform:scale(0);transition:transform .14s cubic-bezier(.2,1.3,.4,1)}.n1-radio:hover .n1-dot{border-color:#4a4a4a}.n1-radio input:checked+.n1-dot{border-color:var(--n1-accent-edge);box-shadow:0 0 8px rgba(32,201,144,.25)}.n1-radio input:checked+.n1-dot::after{transform:scale(1)}\n/* elements/stepper.css */\n.n1-stepper{display:flex;align-items:center;justify-content:space-between;gap:8px;min-height:42px;padding:6px 8px 6px 11px;margin-bottom:6px;border-radius:11px;border:1px solid var(--n1-stroke);background:linear-gradient(180deg,var(--n1-el),var(--n1-el2))}.n1-stepper .n1-label{flex:1 1 auto;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:12px}.n1-stepper-controls{display:flex;align-items:center;gap:6px;flex:none}.n1-stepper button{position:relative;overflow:hidden;width:26px;height:26px;padding:0;border-radius:8px;border:1px solid #333;background:#161616;color:#dcdcdc;font:inherit;font-size:13px;line-height:1;cursor:pointer;transition:border-color .16s ease,color .16s ease,background .16s ease,transform .1s ease}.n1-stepper button::before{content:'';position:absolute;inset:0;pointer-events:none;background:linear-gradient(100deg,transparent 20%,rgba(255,255,255,.16) 47%,transparent 74%);transform:translateX(-130%);transition:transform .45s ease}.n1-stepper button:hover::before{transform:translateX(130%)}.n1-stepper button:hover{background:#1f1f1f;border-color:#4a4a4a;color:#fff}.n1-stepper button:active{transform:scale(.94)}.n1-stepper .n1-value{min-width:34px;text-align:center;font-size:11.5px;font-variant-numeric:tabular-nums;color:#fff}\n/* elements/search.css */\n.n1-search{position:relative;display:flex;align-items:center;margin-bottom:6px}.n1-search>.n1-ic{position:absolute;left:9px;color:var(--n1-faint);display:inline-flex;pointer-events:none}.n1-search .n1-input{padding-left:30px}.n1-search .n1-clear{position:absolute;right:5px;width:22px;height:22px;border:0;border-radius:6px;background:transparent;color:#7d7d7d;cursor:pointer;font:inherit;font-size:12px;line-height:1}.n1-search .n1-clear:hover{background:rgba(255,255,255,.08);color:#fff}\n/* elements/keybind.css */\n.n1-key{font-size:10px;color:#cfcfcf;background:#161616;border:1px solid #333;border-radius:7px;padding:3px 7px;min-width:56px;text-align:center;font-variant-numeric:tabular-nums;font-family:inherit;cursor:pointer;transition:border-color .16s ease,color .16s ease}.n1-key:hover{border-color:#4a4a4a;color:#fff}.n1-key.bind{color:var(--n1-warn);border-color:rgba(240,168,60,.5)}.n1-key.disabled{opacity:.5;pointer-events:none}\n/* elements/color.css */\n.n1-color{display:flex;align-items:center;justify-content:space-between;gap:10px;min-height:42px;padding:0 11px;margin-bottom:6px;border-radius:11px;border:1px solid var(--n1-stroke);background:linear-gradient(180deg,var(--n1-el),var(--n1-el2))}.n1-color .n1-swatch{position:relative;flex:none;width:24px;height:24px;border-radius:8px;border:1px solid rgba(255,255,255,.18);overflow:hidden;cursor:pointer}.n1-color .n1-swatch input{position:absolute;inset:-6px;width:40px;height:40px;padding:0;border:0;background:transparent;cursor:pointer}.n1-color code{font:11px/1 \"Cascadia Mono\",\"Consolas\",monospace;color:var(--n1-dim)}\n/* elements/stat.css */\n.n1-stat{display:flex;align-items:center;justify-content:space-between;gap:8px;min-height:40px;padding:8px 11px;margin-bottom:6px;border-radius:11px;border:1px solid #262626;background:#191919;box-shadow:inset 0 1px 0 rgba(255,255,255,.02);transition:border-color .18s ease,background .18s ease}.n1-stat:hover{border-color:#333;background:#1c1c1c}.n1-stat-label{font-size:10px;color:var(--n1-dim);font-weight:500;flex:none}.n1-stat-value{font-size:11.5px;color:#fff;font-weight:500;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;text-align:right;font-variant-numeric:tabular-nums}\n/* elements/spec.css */\n.n1-spec{display:flex;flex-direction:column;gap:1px;padding:7px 13px 0;font-size:10px;line-height:1.5;color:var(--n1-dim)}.n1-spec-row{display:flex;align-items:baseline;justify-content:space-between;gap:10px;padding:2.5px 0;border-bottom:1px solid rgba(255,255,255,.045)}.n1-spec-row:last-child{border-bottom:none}.n1-spec-row b{color:#dcdcdc;font-weight:600;white-space:nowrap}.n1-spec-row span{text-align:right;font-variant-numeric:tabular-nums;color:var(--n1-faint);min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.n1-spec-head{margin-bottom:2px}.n1-spec-head b{color:#fff}.n1-spec-head span{color:var(--n1-dim);font-size:9px}\n/* elements/table.css */\n.n1-table{width:100%;table-layout:fixed;border-collapse:collapse;font-size:11.5px;margin-bottom:6px}.n1-table th{font-size:9.5px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--n1-dim);text-align:left;padding:0 8px 6px;border-bottom:1px solid #262626;white-space:nowrap}.n1-table td{padding:8px;border-bottom:1px solid rgba(255,255,255,.045);color:#dcdcdc;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.n1-table tr:last-child td{border-bottom:none}.n1-table tbody tr:hover td{background:rgba(255,255,255,.025)}.n1-table .n1-num{text-align:right;font-variant-numeric:tabular-nums}\n/* elements/list.css */\n.n1-list{display:flex;flex-direction:column;gap:4px;margin-bottom:6px}.n1-list-row{display:flex;align-items:center;gap:9px;min-height:44px;padding:6px 10px;border-radius:10px;border:1px solid var(--n1-stroke);background:linear-gradient(180deg,var(--n1-el),var(--n1-el2));color:var(--n1-text);cursor:pointer;transition:border-color .16s ease,background .18s ease}.n1-list-row:hover{border-color:var(--n1-stroke-hover)}.n1-list-row .n1-ic{flex:none;color:var(--n1-faint);display:inline-flex}.n1-list-main{flex:1 1 auto;min-width:0;display:flex;flex-direction:column;gap:1px}.n1-list-main b{font-size:11.5px;font-weight:600;color:#fff;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.n1-list-main span{font-size:10px;color:var(--n1-dim);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.n1-list-meta{flex:none;font-size:10px;color:var(--n1-faint);font-variant-numeric:tabular-nums}.n1-list-row .n1-chev{flex:none;color:#4a4a4a;font-size:12px}\n/* elements/avatar.css */\n.n1-avatar{flex:none;width:26px;height:26px;border-radius:8px;display:grid;place-items:center;font-size:10px;font-weight:700;letter-spacing:.02em;color:#eafff6;background:linear-gradient(135deg,rgba(23,153,110,.85),rgba(32,201,144,.35));border:1px solid rgba(32,201,144,.4);box-shadow:inset 0 1px 0 rgba(255,255,255,.14)}.n1-avatar.n1-avatar-alt{background:linear-gradient(135deg,#2b2b2b,#3a3a3a);border-color:rgba(255,255,255,.14);color:#e6e6e6}.n1-user{display:flex;align-items:center;gap:9px;min-width:0}.n1-user .n1-user-main{min-width:0;display:flex;flex-direction:column}.n1-user .n1-user-main b{font-size:11.5px;color:#fff;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.n1-user .n1-user-main span{font-size:10px;color:var(--n1-dim);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}\n/* elements/kbd.css */\n.n1-kbd{display:inline-flex;align-items:center;justify-content:center;min-width:20px;height:20px;padding:0 5px;border-radius:6px;border:1px solid #333;border-bottom-width:2px;background:#161616;color:#cfcfcf;font:10px/1 \"Cascadia Mono\",\"Consolas\",ui-monospace,monospace}.n1-kbd-group{display:inline-flex;align-items:center;gap:4px}\n/* elements/code.css */\n.n1-code{margin:0 0 6px;padding:10px 11px;border-radius:11px;border:1px solid #242424;background:#0d0d0d;color:#b9c6c2;font:11.5px/1.6 \"Cascadia Mono\",\"Consolas\",ui-monospace,monospace;overflow:auto;white-space:pre;tab-size:2}.n1-code b{color:var(--n1-accent-edge);font-weight:600}.n1-code .n1-cmt{color:#5f6b70}\n/* elements/divider.css */\n.n1-divider{display:flex;align-items:center;gap:9px;margin:10px 0;color:var(--n1-faint);font-size:9.5px;font-weight:600;letter-spacing:.08em;text-transform:uppercase}.n1-divider::before,.n1-divider::after{content:'';flex:1 1 0;height:1px;background:rgba(255,255,255,.07)}.n1-divider:empty::before{flex:1 1 0}.n1-divider:empty::after{display:none}\n/* elements/empty.css */\n.n1-empty{display:flex;flex-direction:column;align-items:center;gap:6px;padding:20px 14px;margin-bottom:6px;border-radius:12px;border:1px dashed rgba(255,255,255,.12);background:rgba(255,255,255,.012);text-align:center}.n1-empty b{font-size:11.5px;font-weight:600;color:#dcdcdc}.n1-empty span{font-size:10.5px;line-height:1.5;color:var(--n1-dim);max-width:240px}.n1-empty .n1-el{margin:4px 0 0;min-height:32px;width:auto;padding:0 12px}\n/* elements/toast.css */\n.n1-toasts{position:fixed;top:14px;right:14px;z-index:2147483004;display:flex;flex-direction:column;gap:7px;width:min(310px,calc(100vw - 28px));pointer-events:none}.n1-toast{position:relative;pointer-events:auto;overflow:hidden;padding:9px 24px 10px 11px;border-radius:11px;border:1px solid #2e2e2e;border-left:3px solid var(--n1-accent);background:linear-gradient(180deg,#1d1d1d,#161616);box-shadow:0 16px 40px rgba(0,0,0,.55),inset 0 1px 0 rgba(255,255,255,.04);color:var(--n1-text);animation:n1-toast-in .26s cubic-bezier(.2,.8,.2,1) both}.n1-toast.error{border-left-color:var(--n1-error)}.n1-toast.warn{border-left-color:var(--n1-warn)}.n1-toast.out{animation:n1-toast-out .2s ease forwards}.n1-toast-title{font-size:11.5px;font-weight:650;color:#fff;line-height:1.2}.n1-toast-msg{margin-top:2px;font-size:10.5px;line-height:1.4;color:#9e9e9e;word-break:break-word}.n1-toast-close{position:absolute;top:4px;right:4px;width:17px;height:17px;padding:0;display:inline-flex;align-items:center;justify-content:center;border:0;border-radius:5px;background:transparent;color:#7d7d7d;font:inherit;font-size:12px;line-height:1;cursor:pointer}.n1-toast-close:hover{background:rgba(255,255,255,.08);color:#fff}.n1-toast-bar{position:absolute;left:0;bottom:0;height:2px;width:100%;background:var(--n1-accent-edge);transform-origin:left;animation:n1-progress var(--dur,4200ms) linear forwards}.n1-toast.error .n1-toast-bar{background:var(--n1-error)}.n1-toast.warn .n1-toast-bar{background:var(--n1-warn)}@keyframes n1-toast-in{from{opacity:0;transform:translateX(22px) scale(.98)}to{opacity:1;transform:none}}@keyframes n1-toast-out{to{opacity:0;transform:translateX(22px) scale(.98)}}@keyframes n1-progress{from{transform:scaleX(1)}to{transform:scaleX(0)}}\n/* elements/alert.css */\n.n1-alert{display:flex;gap:9px;align-items:flex-start;padding:9px 11px;margin-bottom:6px;border-radius:10px;border:1px solid #2b2b2b;border-left:3px solid var(--n1-accent);background:linear-gradient(180deg,#1a1a1a,#151515);font-size:11px;line-height:1.5;color:#c9c9c9}.n1-alert b{display:block;color:#fff;font-size:11.5px;font-weight:600;margin-bottom:1px}.n1-alert.warn{border-left-color:var(--n1-warn)}.n1-alert.error{border-left-color:var(--n1-error)}.n1-alert .n1-ic{flex:none;margin-top:1px;color:var(--n1-dim);display:inline-flex}\n/* elements/progress.css */\n.n1-progress{position:relative;width:100%;height:6px;border-radius:999px;background:#242424;overflow:hidden;box-shadow:inset 0 1px 2px rgba(0,0,0,.5)}.n1-progress>i{display:block;height:100%;border-radius:inherit;background:linear-gradient(90deg,var(--n1-accent),var(--n1-accent-edge));box-shadow:0 0 10px rgba(32,201,144,.35);transition:width .2s ease}.n1-progress.n1-indeterminate>i{width:42%!important;animation:n1-bar 1.1s linear infinite}.n1-progress-row{display:flex;align-items:center;gap:9px;margin-bottom:6px}.n1-progress-row .n1-progress{flex:1 1 auto}.n1-progress-row span{flex:none;font-size:10px;color:var(--n1-dim);font-variant-numeric:tabular-nums}@keyframes n1-bar{0%{transform:translateX(-110%)}100%{transform:translateX(340%)}}\n/* elements/spinner.css */\n.n1-spinner{width:16px;height:16px;border-radius:50%;border:1.6px solid rgba(255,255,255,.14);border-top-color:var(--n1-accent-edge);animation:n1-spin .8s linear infinite;flex:none}.n1-spinner.n1-lg{width:24px;height:24px;border-width:2px}.n1-loading{display:flex;align-items:center;gap:9px;font-size:11px;color:var(--n1-dim)}@keyframes n1-spin{to{transform:rotate(360deg)}}\n/* elements/skeleton.css */\n.n1-skeleton{position:relative;overflow:hidden;border-radius:9px;background:#1c1c1c}.n1-skeleton::after{content:'';position:absolute;inset:0;background:linear-gradient(100deg,transparent 20%,rgba(255,255,255,.06) 44%,transparent 66%);transform:translateX(-100%);animation:n1-shimmer 1.25s ease-in-out infinite}.n1-skeleton.n1-line{height:10px;margin-bottom:6px}.n1-skeleton.n1-row{height:42px;margin-bottom:6px;border-radius:11px}.n1-skeleton.n1-avatar{width:26px;height:26px;border-radius:8px}@keyframes n1-shimmer{to{transform:translateX(100%)}}\n/* elements/badge.css */\n.n1-badge{display:inline-flex;align-items:center;gap:4px;height:18px;padding:0 7px;border-radius:999px;border:1px solid rgba(255,255,255,.12);background:#1b1b1b;color:#c9c9c9;font-size:9.5px;font-weight:700;letter-spacing:.04em;white-space:nowrap}.n1-badge.on{color:#eafff6;border-color:rgba(32,201,144,.5);background:rgba(23,153,110,.28)}.n1-badge.warn{color:#ffe6c2;border-color:rgba(240,168,60,.5);background:rgba(240,168,60,.16)}.n1-badge.error{color:#ffd9d9;border-color:rgba(240,75,75,.5);background:rgba(240,75,75,.16)}.n1-dot-live{width:5px;height:5px;border-radius:50%;background:var(--n1-accent-edge);box-shadow:0 0 6px var(--n1-accent-edge);animation:n1-pulse 2s ease-in-out infinite}@keyframes n1-pulse{0%,100%{opacity:.45;box-shadow:0 0 0 0 var(--n1-accent-edge)}50%{opacity:1;box-shadow:0 0 8px 2px var(--n1-accent)}}\n/* elements/tooltip.css */\n.n1-tip{position:relative;display:inline-flex}.n1-tip[data-tip]::after{content:attr(data-tip);position:absolute;left:50%;bottom:calc(100% + 7px);transform:translate(-50%,3px);z-index:5;max-width:200px;width:max-content;padding:5px 8px;border-radius:8px;border:1px solid rgba(255,255,255,.12);background:#0d0d0d;color:#e6e6e6;font-size:10px;font-weight:500;line-height:1.35;letter-spacing:0;text-transform:none;white-space:normal;box-shadow:0 10px 24px rgba(0,0,0,.55);opacity:0;pointer-events:none;transition:opacity .14s ease,transform .14s ease}.n1-tip[data-tip]:hover::after,.n1-tip[data-tip]:focus-visible::after{opacity:1;transform:translate(-50%,0)}\n/* elements/modal.css */\n.n1-modal{position:fixed;inset:0;z-index:2147483006;display:grid;place-items:center;padding:16px;pointer-events:auto;background:rgba(4,4,4,.62);backdrop-filter:blur(5px) saturate(120%);animation:n1-fade .16s ease both}.n1-modal[hidden]{display:none}.n1-modal.out{animation:n1-fade-out .16s ease forwards}.n1-dialog{width:min(330px,100%);padding:17px 17px 13px;border-radius:16px;border:1px solid rgba(255,255,255,.13);background:radial-gradient(120% 80% at 50% -10%,rgba(255,255,255,.06),transparent 60%),linear-gradient(180deg,#141414,#0a0a0a);box-shadow:0 30px 80px rgba(0,0,0,.75),inset 0 1px 0 rgba(255,255,255,.06);animation:n1-dialog-in .22s cubic-bezier(.2,1.25,.4,1) both}.n1-dialog-title{display:flex;align-items:center;gap:9px;font-size:14px;font-weight:650;color:#fff}.n1-dialog-glyph{width:27px;height:27px;border-radius:8px;display:grid;place-items:center;color:#ffb4b4;background:rgba(240,75,75,.14);border:1px solid rgba(240,75,75,.32)}.n1-dialog-glyph svg{width:14px;height:14px}.n1-dialog-body{margin-top:10px;font-size:11.5px;line-height:1.55;color:var(--n1-dim)}.n1-dialog-actions{display:flex;gap:8px;margin-top:15px}.n1-dialog-btn{flex:1 1 0;height:34px;border-radius:9px;border:1px solid rgba(255,255,255,.12);background:linear-gradient(180deg,#242424,#191919);color:#e9e9e9;font:inherit;font-size:11.5px;font-weight:600;cursor:pointer;transition:background .16s ease,border-color .16s ease,transform .1s ease,color .16s ease}.n1-dialog-btn:hover{background:linear-gradient(180deg,#2c2c2c,#202020);border-color:rgba(255,255,255,.22)}.n1-dialog-btn:active{transform:scale(.985)}.n1-dialog-btn.danger{color:#ffd9d9;border-color:rgba(240,75,75,.45);background:linear-gradient(180deg,#3a1717,#211010)}.n1-dialog-btn.danger:hover{background:linear-gradient(180deg,#4a1c1c,#2b1212);border-color:rgba(240,75,75,.72);color:#fff}@keyframes n1-fade{from{opacity:0}to{opacity:1}}@keyframes n1-fade-out{to{opacity:0}}@keyframes n1-dialog-in{from{opacity:0;transform:translateY(10px) scale(.94)}to{opacity:1;transform:none}}\n/* elements/drawer.css */\n.n1-drawer{position:fixed;top:10px;right:10px;bottom:10px;z-index:2147483005;width:min(320px,calc(100vw - 20px));display:flex;flex-direction:column;border-radius:18px;border:1px solid rgba(255,255,255,.11);background:radial-gradient(120% 55% at 50% -12%,rgba(255,255,255,.06),transparent 60%),linear-gradient(180deg,#080808 0%,#131313 58%,#191919 100%);box-shadow:inset 0 1px 0 rgba(255,255,255,.06),0 24px 64px rgba(0,0,0,.7),0 4px 14px rgba(0,0,0,.5);overflow:hidden;transform:translateX(calc(100% + 18px));transition:transform .28s cubic-bezier(.2,.9,.25,1);pointer-events:auto}.n1-drawer[hidden]{display:none}.n1-drawer.open{transform:none;animation:n1-drawer-in .3s cubic-bezier(.2,.9,.25,1) both}.n1-drawer.out{animation:n1-drawer-out .24s cubic-bezier(.4,0,.7,0) forwards}.n1-drawer-head{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:14px 14px 12px 16px;border-bottom:1px solid rgba(255,255,255,.07)}.n1-drawer-body{flex:1 1 auto;min-height:0;overflow-y:auto;padding:12px 14px;overscroll-behavior:contain}.n1-drawer-body::-webkit-scrollbar{width:4px}.n1-drawer-body::-webkit-scrollbar-thumb{background:rgba(255,255,255,.14);border-radius:4px}.n1-drawer-foot{padding:12px 14px;border-top:1px solid rgba(255,255,255,.07);display:flex;gap:8px}.n1-scrim{position:fixed;inset:0;z-index:2147483004;background:rgba(4,4,4,.55);backdrop-filter:blur(3px);animation:n1-fade .16s ease both}@keyframes n1-drawer-in{from{transform:translateX(calc(100% + 18px))}to{transform:none}}@keyframes n1-drawer-out{from{transform:none}to{transform:translateX(calc(100% + 18px))}}\n/* elements/menu.css */\n.n1-menu{position:absolute;z-index:2147483007;min-width:180px;max-width:220px;padding:5px;border-radius:12px;border:1px solid rgba(255,255,255,.11);background:linear-gradient(180deg,#171717,#0e0e0e);box-shadow:0 22px 54px rgba(0,0,0,.7),inset 0 1px 0 rgba(255,255,255,.05);animation:n1-dialog-in .16s cubic-bezier(.2,1.2,.4,1) both}.n1-menu-item{display:flex;align-items:center;gap:8px;width:100%;height:30px;padding:0 8px;border:0;border-radius:8px;background:transparent;color:#dcdcdc;font:inherit;font-size:11.5px;text-align:left;cursor:pointer}.n1-menu-item:hover{background:rgba(255,255,255,.07);color:#fff}.n1-menu-item.danger{color:#ffb4b4}.n1-menu-item.danger:hover{background:rgba(240,75,75,.16);color:#fff}.n1-menu-item .n1-ic{flex:none;color:var(--n1-faint);display:inline-flex}.n1-menu-item kbd{margin-left:auto;font:inherit;font-size:9.5px;color:var(--n1-faint)}.n1-menu-sep{height:1px;margin:4px 6px;background:rgba(255,255,255,.07)}\n/* elements/popover.css */\n.n1-popover{position:absolute;z-index:2147483007;width:250px;padding:11px;border-radius:13px;border:1px solid rgba(255,255,255,.11);background:linear-gradient(180deg,#171717,#0e0e0e);box-shadow:0 22px 54px rgba(0,0,0,.7),inset 0 1px 0 rgba(255,255,255,.05);animation:n1-dialog-in .18s cubic-bezier(.2,1.2,.4,1) both}.n1-popover-title{font-size:10px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;color:var(--n1-dim);margin:0 0 8px}.n1-anchor{position:relative;display:inline-flex}\n/* elements/bypass.css */\n.n1-bypass{display:flex;align-items:center;justify-content:space-between;width:100%;height:38px;padding:0 12px;border-radius:10px;font:inherit;font-size:12px;font-weight:600;letter-spacing:.04em;cursor:pointer;color:#e7c0c0;background:linear-gradient(180deg,#2b1c1c,#1d1414);border:1px solid rgba(214,92,92,.34);box-shadow:inset 0 1px 0 rgba(255,255,255,.05);transition:background .18s ease,border-color .18s ease,color .18s ease,box-shadow .18s ease}.n1-bypass:hover{border-color:rgba(214,92,92,.55)}.n1-bypass.on{color:#ffd9d9;background:linear-gradient(180deg,#5c1d1d,#371111);border-color:rgba(255,96,96,.72);box-shadow:0 0 0 1px rgba(255,80,80,.18) inset,0 0 16px rgba(200,40,40,.28);animation:n1-bypass-glow 2.6s ease-in-out infinite}.n1-bypass-state{font-size:11px;font-weight:700;letter-spacing:.1em;padding:2px 8px;border-radius:999px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.1)}.n1-bypass.on .n1-bypass-state{background:rgba(255,70,70,.22);border-color:rgba(255,90,90,.5)}@keyframes n1-bypass-glow{0%,100%{box-shadow:0 0 0 1px rgba(255,80,80,.18) inset,0 0 14px rgba(200,40,40,.22)}50%{box-shadow:0 0 0 1px rgba(255,90,90,.3) inset,0 0 22px rgba(220,50,50,.42)}}";

/* ============================================================================
   ChimeraUI — icon library
   One stroke language copied from the panel: 24x24 viewBox, 2px stroke,
   round caps and joins, no fills. Paths only; sizing belongs to CSS.
   Load before chimera-ui.js, or let dist/chimeraui.js carry both.
   ============================================================================ */
(function (global) {
  'use strict';

  const ICONS = {
    /* --- shell / chrome ---------------------------------------------------- */
    aim: '<circle cx="12" cy="12" r="7"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/>',
    eye: '<path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6S2 12 2 12z"/><circle cx="12" cy="12" r="2.6"/>',
    move: '<path d="M12 3v18M3 12h18M12 3l-3 3M12 3l3 3M12 21l-3-3M12 21l3-3M3 12l3-3M3 12l3 3M21 12l-3-3M21 12l-3 3"/>',
    bolt: '<path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z"/>',
    world: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18"/>',
    shield: '<path d="M12 2 20 5v6c0 5-3.4 8.6-8 11-4.6-2.4-8-6-8-11V5z"/><path d="m9 12 2 2 4-4"/>',
    code: '<path d="m8 6-6 6 6 6M16 6l6 6-6 6M14 3l-4 18"/>',
    gear: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
    chevron: '<path d="m9 6 6 6-6 6"/>',
    'chevron-down': '<path d="m6 9 6 6 6-6"/>',
    minus: '<path d="M6 12h12"/>',
    plus: '<path d="M12 6v12M6 12h12"/>',
    dump: '<path d="M4 4h16v16H4z"/><path d="M8 8h8M8 12h5M8 16h7"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    power: '<path d="M12 3v9"/><path d="M6.3 6.3a8 8 0 1 0 11.4 0"/>',
    brush: '<path d="M4 20c3 0 3-3 5-4l11-11-3-3L6 13c-1 2-4 2-4 5 0 1 1 2 2 2z"/>',

    /* --- ui ---------------------------------------------------------------- */
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-6.2 8-6.2S20 17 20 21"/>',
    users: '<circle cx="9" cy="8" r="3.4"/><path d="M2 21c0-3.7 3.1-5.8 7-5.8s7 2.1 7 5.8"/><path d="M17 4.8a3.4 3.4 0 0 1 0 6.4M18.5 15.6c2.1.7 3.5 2.5 3.5 5.4"/>',
    lock: '<rect x="4" y="10" width="16" height="11" rx="2.5"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
    key: '<circle cx="8" cy="15" r="4"/><path d="m11 12 9-9M17 4l3 3M14 7l3 3"/>',
    link: '<path d="M10.5 13.5a4.5 4.5 0 0 0 6.4 0l2.6-2.6a4.5 4.5 0 0 0-6.4-6.4L11.7 6"/><path d="M13.5 10.5a4.5 4.5 0 0 0-6.4 0l-2.6 2.6a4.5 4.5 0 0 0 6.4 6.4l1.4-1.4"/>',
    copy: '<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1"/>',
    check: '<path d="m4 12 5 5L20 6"/>',
    alert: '<path d="M12 3 2.5 20.5h19z"/><path d="M12 9.5v4.5M12 17.5v.4"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5.5M12 7.6v.4"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5.2l3.4 2"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2.2"/><path d="m3.6 6.8 8.4 6 8.4-6"/>',
    bell: '<path d="M18 9.5a6 6 0 1 0-12 0c0 4.6-2 5.9-2 5.9h16s-2-1.3-2-5.9"/><path d="M10 19.5a2 2 0 0 0 4 0"/>',
    star: '<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9z"/>',
    heart: '<path d="M12 20.3S4.5 16 4.5 10.6A4.1 4.1 0 0 1 12 7.4a4.1 4.1 0 0 1 7.5 3.2c0 5.4-7.5 9.7-7.5 9.7z"/>',
    flame: '<path d="M12 21.5c3.9 0 6.3-2.6 6.3-6 0-4.4-3.9-6.3-4.4-10.9-2 1.9-3 3.9-3 5.9-1-1-1.9-2.2-1.9-3.9-2 2-3.3 4.9-3.3 7.9 0 4.3 2.4 7 6.3 7z"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.3"/>',
    radar: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4.5"/><path d="M12 12 19 7.5"/>',
    map: '<path d="m3 6.5 6-2.2 6 2.2 6-2.2v13.4l-6 2.2-6-2.2-6 2.2z"/><path d="M9 4.3v13.4M15 6.5v13.4"/>',
    compass: '<circle cx="12" cy="12" r="9"/><path d="m15.6 8.4-2 5.2-5.2 2 2-5.2z"/>',
    layers: '<path d="m12 3 9 4.8-9 4.8-9-4.8z"/><path d="m3 12.2 9 4.8 9-4.8M3 16.6l9 4.8 9-4.8"/>',
    grid: '<rect x="3" y="3" width="7" height="7" rx="1.6"/><rect x="14" y="3" width="7" height="7" rx="1.6"/><rect x="3" y="14" width="7" height="7" rx="1.6"/><rect x="14" y="14" width="7" height="7" rx="1.6"/>',
    list: '<path d="M8.5 6h12M8.5 12h12M8.5 18h12"/><circle cx="4.2" cy="6" r=".9"/><circle cx="4.2" cy="12" r=".9"/><circle cx="4.2" cy="18" r=".9"/>',
    sliders: '<path d="M4 7h7M15 7h5M4 17h9M17 17h3"/><circle cx="13" cy="7" r="2"/><circle cx="15.5" cy="17" r="2"/>',
    image: '<rect x="3" y="4" width="18" height="16" rx="2.4"/><circle cx="9" cy="10" r="1.6"/><path d="m4 18.5 5-5 4 4 3-3 4 4"/>',
    download: '<path d="M12 3v12M7 10l5 5 5-5M4 20.5h16"/>',
    upload: '<path d="M12 21V9M7 14l5-5 5 5M4 3.5h16"/>',
    trash: '<path d="M4 6h16M9.5 6V4h5v2M6.2 6l1 15h9.6l1-15"/><path d="M10.2 10v7M13.8 10v7"/>',
    edit: '<path d="M4 20h4.2L20 8.2 15.8 4 4 15.8z"/><path d="m13.8 6 4.2 4.2"/>',
    save: '<path d="M5 3h11l3 3v15H5z"/><path d="M8.5 3v6h7V3M8 21v-6h8v6"/>',
    refresh: '<path d="M20 11a8 8 0 1 0-2.4 6.4"/><path d="M20 4v7h-7"/>',
    play: '<path d="M7.5 4.5 20 12 7.5 19.5z"/>',
    pause: '<path d="M8.5 4.5v15M15.5 4.5v15"/>',
    terminal: '<rect x="3" y="4" width="18" height="16" rx="2.4"/><path d="m7 9.5 3 3-3 3M13 15.5h4"/>',
    cpu: '<rect x="6" y="6" width="12" height="12" rx="2"/><rect x="9.6" y="9.6" width="4.8" height="4.8" rx=".8"/><path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3"/>',
    database: '<ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6"/><path d="M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/>',
    wifi: '<path d="M3 9a14 14 0 0 1 18 0M6 12.6a9.6 9.6 0 0 1 12 0M9 16.1a5 5 0 0 1 6 0"/><circle cx="12" cy="19.2" r=".9"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    moon: '<path d="M20.4 14.7A8.6 8.6 0 1 1 9.3 3.6a6.7 6.7 0 0 0 11.1 11.1z"/>',
    'eye-off': '<path d="m3 3 18 18"/><path d="M10.6 6.2A10 10 0 0 1 12 6c6.4 0 10 6 10 6a17.5 17.5 0 0 1-3.2 3.9M6.6 7.6A16.5 16.5 0 0 0 2 12s3.6 6 10 6a9.8 9.8 0 0 0 4-.8"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/>',
    filter: '<path d="M3 5h18l-7 8v6l-4 2v-8z"/>',
    pin: '<path d="M12 21.2s7-5.6 7-11.2a7 7 0 1 0-14 0c0 5.6 7 11.2 7 11.2z"/><circle cx="12" cy="10" r="2.5"/>',
    tag: '<path d="M3.5 12.5V4h8.5l8.5 8.5-8.5 8.5z"/><circle cx="8" cy="8.2" r="1.3"/>',
    box: '<path d="m12 3 9 4.8v8.4L12 21l-9-4.8V7.8z"/><path d="m3 7.8 9 4.8 9-4.8M12 12.6V21"/>',
    home: '<path d="m3 11 9-8 9 8"/><path d="M5.5 10.5V21h13V10.5"/>',
    folder: '<path d="M3 6h6l2 2h10v11H3z"/>',
    file: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v5h4"/>',
    external: '<path d="M14 4h6v6M20 4l-9 9"/><path d="M18 14.5V19a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h4.5"/>',
    'arrow-right': '<path d="M4 12h15M13 6l6 6-6 6"/>'
  };

  const svg = (name) =>
    '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" ' +
    'stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + (ICONS[name] || '') + '</svg>';

  global.ChimeraUI = global.ChimeraUI || {};
  global.ChimeraUI.ICONS = ICONS;
  global.ChimeraUI.iconNames = Object.keys(ICONS);
  global.ChimeraUI.svg = svg;
  global.ChimeraUI.icon = function (name) {
    const span = document.createElement('span');
    span.className = 'n1-ic';
    span.innerHTML = svg(name);
    return span;
  };
})(typeof window !== 'undefined' ? window : globalThis);




/* ============================================================================
   ChimeraUI — behaviours
   Markup-first. Nothing here builds DOM except the toast stack, so a userscript
   can paste markup and only load this file for the interactions.
   Works in a normal document and inside a shadow root: every lookup is scoped
   to the root you pass in, and document-level listeners resolve through it.
   ============================================================================ */
(function (global) {
  'use strict';

  const uid = (() => { let n = 0; return (p) => p + '-' + (++n).toString(36); })();
  const on = (el, ev, fn, opt) => el.addEventListener(ev, fn, opt);
  const all = (root, sel) => Array.prototype.slice.call(root.querySelectorAll(sel));
  const docOf = (root) => (root.host ? root.host.ownerDocument : (root.ownerDocument || document));
  const iconSVG = (global.ChimeraUI && global.ChimeraUI.svg) || (() => '');

  /* Fill any <span class="n1-ic" data-cn-icon="name"></span> that is still empty. */
  function hydrateIcons(root) {
    all(root, '[data-cn-icon]').forEach((el) => {
      if (el.firstElementChild) return;
      el.innerHTML = iconSVG(el.getAttribute('data-cn-icon'));
    });
  }

  /* ------------------------------------------------------------ tab rail -- */
  /* Wheel and grab-drag glide. Capture is taken only after 4px of movement so
     the click still lands on the tab; a trailing click is swallowed for 250ms. */
  function rail(root, strip) {
    if (strip.__cnRail) return;
    strip.__cnRail = true;
    const win = docOf(root).defaultView;
    if (!win) return;

    let target = 0;
    let raf = 0;
    const max = () => Math.max(0, strip.scrollWidth - strip.clientWidth);
    const glide = () => {
      raf = 0;
      const cur = strip.scrollLeft;
      const d = target - cur;
      if (Math.abs(d) < 0.5) { strip.scrollLeft = target; return; }
      strip.scrollLeft = cur + d * 0.3;
      raf = win.requestAnimationFrame(glide);
    };
    const aim = (v) => {
      target = Math.max(0, Math.min(max(), v));
      if (!raf) raf = win.requestAnimationFrame(glide);
    };

    on(strip, 'wheel', (e) => {
      const room = max();
      if (!room) return;
      const d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (!d) return;
      const at = raf ? target : strip.scrollLeft;
      if ((d > 0 && at >= room - 0.5) || (d < 0 && at <= 0.5)) return;
      aim(at + d * 1.1);
      e.preventDefault();
    }, { passive: false });

    let from = null;
    let moved = false;
    let pid = 0;
    let swallow = 0;
    let vel = 0;
    let lastX = 0;
    let lastT = 0;
    on(strip, 'pointerdown', (e) => {
      if (e.button !== 0) return;
      from = { x: e.clientX, left: strip.scrollLeft };
      moved = false;
      pid = e.pointerId;
      lastX = e.clientX;
      lastT = performance.now();
      vel = 0;
      target = strip.scrollLeft;
      if (raf) { win.cancelAnimationFrame(raf); raf = 0; }
    });
    on(strip, 'pointermove', (e) => {
      if (!from) return;
      const dx = e.clientX - from.x;
      if (!moved) {
        if (Math.abs(dx) < 4) return;
        moved = true;
        strip.classList.add('n1-drag');
        try { strip.setPointerCapture(pid); } catch (_) {}
      }
      const now = performance.now();
      const dt = Math.max(1, now - lastT);
      vel = (e.clientX - lastX) / dt;
      lastX = e.clientX;
      lastT = now;
      strip.scrollLeft = from.left - dx;
      target = strip.scrollLeft;
    });
    const end = (e) => {
      if (!from) return;
      from = null;
      strip.classList.remove('n1-drag');
      if (moved) {
        swallow = Date.now() + 250;
        try { strip.releasePointerCapture(e && e.pointerId !== undefined ? e.pointerId : pid); } catch (_) {}
        if (Math.abs(vel) > 0.05) aim(strip.scrollLeft - vel * 180);
        moved = false;
      }
    };
    on(strip, 'pointerup', end);
    on(strip, 'pointercancel', end);
    on(strip, 'click', (e) => {
      if (Date.now() > swallow) return;
      e.preventDefault();
      e.stopPropagation();
    }, true);
  }

  /* ---------------------------------------------------------------- tabs -- */
  function tabs(root, box) {
    rail(root, box);
    const doc = docOf(root);
    all(box, '[data-cn-sep]').forEach((tab) => {
      const prev = tab.previousElementSibling;
      if (prev && prev.classList.contains('n1-tab-sep')) return;
      const sep = doc.createElement('span');
      sep.className = 'n1-tab-sep';
      box.insertBefore(sep, tab);
    });
    const list = all(box, '[role="tab"]');
    if (!list.length) return;
    /* data-cn-sep on a tab draws a divider next to it: before by default,
       "after" flips the side. A hand-placed .n1-tab-sep still works. */
    list.forEach((tab) => {
      const where = tab.getAttribute('data-cn-sep');
      if (where === null) return;
      const prev = tab.previousElementSibling;
      const next = tab.nextElementSibling;
      if (where === 'after' ? (next && next.classList.contains('n1-tab-sep'))
                            : (prev && prev.classList.contains('n1-tab-sep'))) return;
      const sep = docOf(root).createElement('span');
      sep.className = 'n1-tab-sep';
      sep.setAttribute('aria-hidden', 'true');
      if (where === 'after') tab.after(sep); else tab.before(sep);
    });
    const scope = box.getAttribute('data-cn-scope');
    const panes = scope
      ? all(docOf(root), '[data-cn-pane="' + scope + '"]')
      : all(root, '[data-cn-pane]');
    const select = (tab, focus) => {
      list.forEach((t) => {
        const on = t === tab;
        t.setAttribute('aria-selected', on ? 'true' : 'false');
        t.tabIndex = on ? 0 : -1;
        t.classList.toggle('active', on);
      });
      panes.forEach((p) => {
        const on = p.getAttribute('data-cn-pane') === tab.getAttribute('data-cn-tab') ||
                   p.id === tab.getAttribute('aria-controls');
        p.classList.toggle('active', on);
      });
      if (focus) tab.focus();
      box.dispatchEvent(new CustomEvent('cn:tab', { detail: { tab: tab.getAttribute('data-cn-tab') }, bubbles: true }));
    };
    list.forEach((t) => {
      on(t, 'click', () => select(t));
      on(t, 'keydown', (e) => {
        const i = list.indexOf(t);
        let n = -1;
        if (e.key === 'ArrowRight') n = (i + 1) % list.length;
        else if (e.key === 'ArrowLeft') n = (i - 1 + list.length) % list.length;
        else if (e.key === 'Home') n = 0;
        else if (e.key === 'End') n = list.length - 1;
        if (n < 0) return;
        e.preventDefault();
        select(list[n], true);
      });
    });
    const start = list.find((t) => t.getAttribute('aria-selected') === 'true') || list[0];
    select(start);
  }

  /* -------------------------------------------------------------- toggle -- */
  function toggles(root) {
    all(root, '[data-cn="toggle"]').forEach((btn) => {
      const paint = () => {
        const on = btn.classList.contains('on');
        btn.setAttribute('aria-pressed', on ? 'true' : 'false');
      };
      paint();
      on(btn, 'click', () => {
        btn.classList.toggle('on');
        paint();
        btn.dispatchEvent(new CustomEvent('cn:change', { detail: { on: btn.classList.contains('on') }, bubbles: true }));
      });
    });
  }

  /* -------------------------------------------------------------- slider -- */
  function sliders(root) {
    all(root, '.n1-slider').forEach((box) => {
      const range = box.querySelector('input[type="range"]');
      if (!range) return;
      const out = box.querySelector('[data-cn-value]');
      const unit = box.getAttribute('data-cn-unit') || '';
      const dec = parseInt(box.getAttribute('data-cn-dec') || '0', 10);
      const paint = () => {
        const min = parseFloat(range.min || '0');
        const max = parseFloat(range.max || '100');
        const pct = max === min ? 0 : ((range.value - min) / (max - min)) * 100;
        range.style.background = 'linear-gradient(90deg,var(--n1-accent) ' + pct + '%,#333 ' + pct + '%)';
        if (out) out.textContent = Number(range.value).toFixed(dec) + unit;
      };
      paint();
      on(range, 'input', paint);
      on(range, 'change', () => box.dispatchEvent(new CustomEvent('cn:change', { detail: { value: Number(range.value) }, bubbles: true })));
    });
  }

  /* --------------------------------------------------------------- chips -- */
  function chips(root) {
    all(root, '.n1-chips').forEach((box) => {
      const multi = box.getAttribute('data-cn-multi') === 'true';
      const list = all(box, '.n1-chip');
      list.forEach((chip) => on(chip, 'click', () => {
        if (multi) chip.classList.toggle('on');
        else list.forEach((c) => c.classList.toggle('on', c === chip));
        const picked = list.filter((c) => c.classList.contains('on')).map((c) => c.textContent.trim());
        box.dispatchEvent(new CustomEvent('cn:change', { detail: { value: multi ? picked : picked[0] }, bubbles: true }));
      }));
    });
  }

  /* ------------------------------------------------------------ dropdown -- */
  function dropdowns(root) {
    const doc = docOf(root);
    const win = doc.defaultView;
    const layer = root.host
      ? (root.querySelector('.n1-root') || root)
      : (doc.querySelector('.n1-root') || doc.body || root);
    const boxes = all(root, '.n1-dd');
    if (!boxes.length) return;
    const close = (dd) => {
      dd.setAttribute('data-open', 'false');
      if (dd.__menu) dd.__menu.hidden = true;
      const b = dd.querySelector('.n1-dd-btn');
      if (b) b.setAttribute('aria-expanded', 'false');
    };
    const closeOthers = (keep) => boxes.forEach((dd) => { if (dd !== keep) close(dd); });

    boxes.forEach((dd) => {
      const btn = dd.querySelector('.n1-dd-btn');
      const menu = dd.querySelector('.n1-dd-menu');
      if (!btn || !menu) return;
      dd.__menu = menu;
      if (menu.parentElement !== layer) layer.appendChild(menu);
      const out = dd.querySelector('.n1-dd-value > span') || dd.querySelector('.n1-dd-value');
      const hidden = dd.querySelector('input[type="hidden"]');
      const items = all(menu, '.n1-dd-item');
      const labelOf = (item) => (item.querySelector('span') || item).textContent.trim();
      const pick = (item) => {
        const value = item.getAttribute('data-value') !== null ? item.getAttribute('data-value') : labelOf(item);
        dd.setAttribute('data-value', value);
        items.forEach((i) => i.setAttribute('aria-selected', i === item ? 'true' : 'false'));
        if (out) out.textContent = labelOf(item);
        if (hidden) hidden.value = value;
        close(dd);
        btn.focus();
        dd.dispatchEvent(new CustomEvent('cn:change', {
          detail: { value: value, label: labelOf(item) }, bubbles: true,
        }));
      };

      const place = () => {
        const r = btn.getBoundingClientRect();
        const width = Math.max(160, Math.round(r.width));
        menu.style.width = width + 'px';
        menu.style.left = Math.min(Math.max(8, r.left), win.innerWidth - width - 8) + 'px';
        menu.hidden = false;
        const h = menu.scrollHeight;
        const below = win.innerHeight - r.bottom - 10;
        const above = r.top - 10;
        const up = below < Math.min(h, 240) && above > below;
        const cap = Math.max(120, Math.min(240, (up ? above : below) - 6));
        menu.style.maxHeight = cap + 'px';
        menu.style.top = (up ? Math.max(8, r.top - Math.min(h, cap) - 6) : r.bottom + 6) + 'px';
        menu.classList.toggle('up', up);
      };

      const open = () => {
        closeOthers(dd);
        dd.setAttribute('data-open', 'true');
        btn.setAttribute('aria-expanded', 'true');
        place();
        const on = items.find((i) => i.getAttribute('aria-selected') === 'true') || items[0];
        if (on) on.focus();
      };
      dd.__close = () => close(dd);
      dd.__open = open;

      btn.addEventListener('click', () => {
        if (dd.getAttribute('data-open') === 'true') close(dd); else open();
      });
      on(btn, 'keydown', (e) => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          open();
        }
      });
      on(menu, 'keydown', (e) => {
        const scope = menu.getRootNode();
        const active = scope.activeElement || doc.activeElement;
        const i = items.indexOf(active);
        if (e.key === 'ArrowDown') { e.preventDefault(); items[Math.min(items.length - 1, i + 1)].focus(); }
        else if (e.key === 'ArrowUp') { e.preventDefault(); items[Math.max(0, i - 1)].focus(); }
        else if (e.key === 'Home') { e.preventDefault(); items[0].focus(); }
        else if (e.key === 'End') { e.preventDefault(); items[items.length - 1].focus(); }
        else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (i >= 0) pick(items[i]); }
        else if (e.key === 'Escape') { e.preventDefault(); close(dd); btn.focus(); }
        else if (e.key === 'Tab') close(dd);
      });
      items.forEach((item) => on(item, 'click', () => pick(item)));

      on(win, 'scroll', () => {
        if (dd.getAttribute('data-open') === 'true') place();
      }, true);
      on(win, 'resize', () => {
        if (dd.getAttribute('data-open') === 'true') place();
      });
      on(doc, 'pointerdown', (e) => {
        if (dd.getAttribute('data-open') !== 'true') return;
        if (dd.contains(e.target) || menu.contains(e.target)) return;
        close(dd);
      });
    });
  }

  /* ------------------------------------------------------------- collapse -- */
  function collapse(root) {
    all(root, '.n1-card').forEach((card) => {
      const head = card.querySelector('.n1-card-head');
      if (!head) return;
      head.setAttribute('aria-expanded', card.classList.contains('collapsed') ? 'false' : 'true');
      on(head, 'click', () => {
        const shut = card.classList.toggle('collapsed');
        head.setAttribute('aria-expanded', shut ? 'false' : 'true');
      });
    });
  }

  /* --------------------------------------------------------------- modal -- */
  function overlay(root, name, sel) {
    const timers = new WeakMap();
    all(root, '[data-cn-open="' + name + '"]').forEach((trigger) => {
      on(trigger, 'click', (e) => {
        e.preventDefault();
        const id = trigger.getAttribute('data-cn-target');
        const node = (id && (root.getElementById ? root.getElementById(id) : null)) || root.querySelector(sel);
        if (!node) return;
        clearTimeout(timers.get(node));
        node.hidden = false;
        node.classList.remove('out');
        node.classList.add('open');
        const focusable = node.querySelector('button, input, [tabindex]');
        if (focusable) focusable.focus();
        node.dispatchEvent(new CustomEvent('cn:open', { bubbles: true }));
      });
    });
    all(root, sel).forEach((node) => {
      const close = () => {
        if (node.hidden) return;
        node.classList.remove('open');
        node.classList.add('out');
        node.dispatchEvent(new CustomEvent('cn:close', { bubbles: true }));
        const ms = node.classList.contains('n1-drawer') ? 300 : 180;
        timers.set(node, setTimeout(() => {
          node.hidden = true;
          node.classList.remove('out');
        }, ms));
      };
      all(node, '[data-cn-close]').forEach((b) => on(b, 'click', close));
      on(node, 'click', (e) => { if (e.target === node) close(); });
      on(docOf(root), 'keydown', (e) => { if (e.key === 'Escape' && node.classList.contains('open')) close(); });
    });
  }

  /* --------------------------------------------------------------- toast -- */
  function stack(root) {
    let box = root.querySelector('.n1-toasts');
    if (!box) {
      box = docOf(root).createElement('div');
      box.className = 'n1-toasts';
      (root.host ? (root.querySelector('.n1-root') || root) : docOf(root).body).appendChild(box);
    }
    return box;
  }

  function toast(root, opts) {
    const o = typeof opts === 'string' ? { title: opts } : (opts || {});
    const box = stack(root);
    const node = docOf(root).createElement('div');
    node.className = 'n1-toast' + (o.type === 'error' ? ' error' : o.type === 'warn' ? ' warn' : '');
    const dur = o.duration || 4200;
    node.style.setProperty('--dur', dur + 'ms');
    node.innerHTML =
      '<div class="n1-toast-title"></div>' +
      '<div class="n1-toast-msg"></div>' +
      '<button class="n1-toast-close" aria-label="close">\u00d7</button>' +
      '<div class="n1-toast-bar"></div>';
    node.querySelector('.n1-toast-title').textContent = o.title || 'Notice';
    const msg = node.querySelector('.n1-toast-msg');
    if (o.message) msg.textContent = o.message; else msg.remove();
    const kill = () => {
      node.classList.add('out');
      setTimeout(() => node.remove(), 220);
    };
    node.querySelector('.n1-toast-close').addEventListener('click', kill);
    box.appendChild(node);
    if (dur > 0) setTimeout(kill, dur);
    return node;
  }

  /* ------------------------------------------------------------ triggers -- */
  function triggers(root) {
    all(root, '[data-cn-toast]').forEach((b) => on(b, 'click', () => toast(root, {
      type: b.getAttribute('data-cn-type') || 'info',
      title: b.getAttribute('data-cn-title') || b.getAttribute('data-cn-toast'),
      message: b.getAttribute('data-cn-msg') || '',
    })));

    all(root, '[data-cn-copy]').forEach((b) => on(b, 'click', () => {
      const sel = b.getAttribute('data-cn-copy');
      const src = sel && sel !== 'self' ? root.querySelector(sel) : b;
      const text = src ? (src.value || src.textContent || '').trim() : '';
      const nav = docOf(root).defaultView.navigator;
      if (nav && nav.clipboard) nav.clipboard.writeText(text).catch(() => {});
      b.setAttribute('data-cn-copied', '');
      setTimeout(() => b.removeAttribute('data-cn-copied'), 1200);
    }));

    all(root, '[data-cn="stepper"]').forEach((box) => {
      const out = box.querySelector('[data-cn-value]');
      const min = parseFloat(box.getAttribute('data-cn-min') || '-Infinity');
      const max = parseFloat(box.getAttribute('data-cn-max') || 'Infinity');
      const step = parseFloat(box.getAttribute('data-cn-step') || '1');
      let v = parseFloat(box.getAttribute('data-cn-value-now') || (out ? out.textContent : '0')) || 0;
      const paint = () => {
        v = Math.min(max, Math.max(min, v));
        if (out) out.textContent = String(v);
        box.dispatchEvent(new CustomEvent('cn:change', { detail: { value: v }, bubbles: true }));
      };
      all(box, 'button').forEach((b) => on(b, 'click', () => {
        v += (b.getAttribute('data-cn-dir') === 'down' ? -step : step);
        paint();
      }));
    });

    all(root, '.n1-search').forEach((box) => {
      const input = box.querySelector('input');
      const clear = box.querySelector('.n1-clear');
      if (input && clear) on(clear, 'click', () => { input.value = ''; input.focus(); input.dispatchEvent(new Event('input', { bubbles: true })); });
    });
  }

  /* ------------------------------------------------------------- keybind -- */
  function keybinds(root) {
    all(root, '.n1-key').forEach((key) => {
      on(key, 'click', () => {
        if (key.classList.contains('bind')) return;
        const was = key.textContent;
        key.classList.add('bind');
        key.textContent = 'press…';
        const doc = docOf(root);
        const done = (e) => {
          e.preventDefault();
          e.stopPropagation();
          doc.removeEventListener('keydown', done, true);
          key.classList.remove('bind');
          key.textContent = e.key === ' ' ? 'Space' : e.key.length === 1 ? e.key.toUpperCase() : e.key;
          key.dispatchEvent(new CustomEvent('cn:change', { detail: { key: key.textContent }, bubbles: true }));
        };
        doc.addEventListener('keydown', done, true);
        setTimeout(() => {
          doc.removeEventListener('keydown', done, true);
          if (key.classList.contains('bind')) { key.classList.remove('bind'); key.textContent = was; }
        }, 6000);
      });
    });
  }

  /* ---------------------------------------------------------------- drag -- */
  function drag(root) {
    const win = docOf(root).defaultView;
    const translateOf = (t) => {
      if (!t || t === 'none') return { x: 0, y: 0 };
      const m = t.match(/matrix\(([^)]+)\)/);
      if (m) { const p = m[1].split(',').map(Number); return { x: p[4] || 0, y: p[5] || 0 }; }
      const m3 = t.match(/matrix3d\(([^)]+)\)/);
      if (m3) { const p = m3[1].split(',').map(Number); return { x: p[12] || 0, y: p[13] || 0 }; }
      return { x: 0, y: 0 };
    };
    all(root, '#n1-panel').forEach((panel) => {
      const head = panel.querySelector('.n1-head');
      if (!head) return;
      let origin = null;
      on(head, 'pointerdown', (e) => {
        if (e.button !== 0 || e.target.closest('button,a,input,select,textarea')) return;
        const r = panel.getBoundingClientRect();
        const base = translateOf(win.getComputedStyle(panel).transform);
        panel.style.animation = 'none';
        origin = {
          x: e.clientX, y: e.clientY,
          left: r.left, top: r.top, w: r.width, h: r.height,
          baseX: base.x, baseY: base.y,
        };
        head.setPointerCapture(e.pointerId);
        e.preventDefault();
      });
      on(head, 'pointermove', (e) => {
        if (!origin) return;
        const dx = Math.max(80 - origin.w - origin.left, Math.min(win.innerWidth - 80 - origin.left, e.clientX - origin.x));
        const dy = Math.max(40 - origin.h - origin.top, Math.min(win.innerHeight - 40 - origin.top, e.clientY - origin.y));
        panel.style.transform = 'translate(' + (origin.baseX + dx) + 'px,' + (origin.baseY + dy) + 'px)';
      });
      const end = () => { origin = null; };
      on(head, 'pointerup', end);
      on(head, 'pointercancel', end);
    });
  }

  /* --------------------------------------------------------------- title -- */
  /* Edit the two lines of the panel head at runtime. Subtitle is optional: pass
     '' to drop it, omit the argument to leave it as written in markup. */
  function title(root, text, subtitle) {
    const box = root.querySelector('.n1-title');
    if (!box || text === undefined) return;
    const doc = docOf(root);
    Array.prototype.slice.call(box.childNodes).forEach((n) => {
      if (n.nodeType === 3) box.removeChild(n);
    });
    box.insertBefore(doc.createTextNode(text), box.firstChild);
    if (subtitle !== undefined) {
      let sub = box.querySelector('.n1-sub');
      if (!subtitle) {
        if (sub) sub.remove();
      } else if (sub) {
        sub.textContent = subtitle;
      } else {
        sub = doc.createElement('span');
        sub.className = 'n1-sub';
        sub.textContent = subtitle;
        box.appendChild(sub);
      }
    }
  }

  /* ---------------------------------------------------------------- mount -- */
  function attach(root) {
    if (!root || root.__cnAttached) return root;
    root.__cnAttached = true;
    hydrateIcons(root);
    all(root, '[data-cn="tabs"]').forEach((box) => tabs(root, box));
    toggles(root); sliders(root); chips(root); dropdowns(root); collapse(root);
    overlay(root, 'modal', '.n1-modal');
    overlay(root, 'drawer', '.n1-drawer');
    triggers(root); keybinds(root); drag(root);
    return root;
  }

  function mount(opts) {
    const o = opts || {};
    const host = document.createElement('div');
    host.id = o.id || uid('chimeraui');
    host.style.cssText = 'position:fixed;inset:0;z-index:2147483000;pointer-events:none;padding:16px';
    const root = host.attachShadow({ mode: o.mode || 'open' });
    root.innerHTML = '<style>' + (o.css || '') + '</style><div class="n1-root">' + (o.html || '') + '</div>';
    (o.parent || document.body).appendChild(host);
    if (o.title) title(root, o.title, o.subtitle);
    attach(root);
    return { host: host, root: root };
  }

  const api = Object.assign(global.ChimeraUI || {}, {
    attach: attach, mount: mount, toast: toast, tabs: tabs, version: '0.2.0',
  });
  global.ChimeraUI = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof window !== 'undefined' ? window : globalThis);


  var base = window.ChimeraUI;
  base.css = CSS;
  var mount = base.mount;
  base.mount = function (opts) {
    var o = opts || {};
    if (!o.css) o.css = CSS;
    return mount(o);
  };
})();

