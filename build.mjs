import fs from 'node:fs';
import path from 'node:path';

const root = import.meta.dirname;
const cssDir = path.join(root, 'css');
const dist = path.join(root, 'dist');
fs.mkdirSync(dist, { recursive: true });

// Build order comes from the aggregate file, so there is exactly one list to keep.
const entry = fs.readFileSync(path.join(cssDir, 'chimera-ui.css'), 'utf8');
const order = Array.from(entry.matchAll(/@import url\("\.\/(.+?)"\);/g)).map((m) => m[1]);

const strip = (s) => s
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .replace(/\s+/g, ' ')
  .replace(/\s*([{}:;,>])\s*/g, '$1')
  .replace(/;}/g, '}')
  .trim();

const parts = order.map((rel) => {
  const file = path.join(cssDir, rel);
  if (!fs.existsSync(file)) throw new Error('missing css: ' + rel);
  return '/* ' + rel + ' */\n' + strip(fs.readFileSync(file, 'utf8'));
});

const css = parts.join('\n');
const iconsJs = fs.readFileSync(path.join(root, 'js', 'icons.js'), 'utf8');
const js = iconsJs + '\n' + fs.readFileSync(path.join(root, 'js', 'chimera-ui.js'), 'utf8');

fs.writeFileSync(path.join(dist, 'chimeraui.css'), css + '\n');

const meta = `// ==UserScript==
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
`;

const bundle = meta + `
/* ChimeraUI 0.2.0 — built ${new Date().toISOString().slice(0, 10)} */
(function () {
  'use strict';
  var CSS = ${JSON.stringify(css)};

${js}

  var base = window.ChimeraUI;
  base.css = CSS;
  var mount = base.mount;
  base.mount = function (opts) {
    var o = opts || {};
    if (!o.css) o.css = CSS;
    return mount(o);
  };
})();
`;

fs.writeFileSync(path.join(dist, 'chimeraui.js'), bundle + '\n');

const kb = (n) => (n / 1024).toFixed(1) + ' kB';
console.log('css    ', kb(css.length), '-> dist/chimeraui.css');
console.log('js     ', kb(js.length));
console.log('bundle ', kb(bundle.length), '-> dist/chimeraui.js');
