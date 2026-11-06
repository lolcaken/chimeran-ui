// Overflow gate. Loads every page, fails on horizontal document overflow or on
// a block whose border box escapes the content column. Run: node tools/check-overflow.mjs
// Optional dependency: playwright (npm i -D playwright && npx playwright install chromium)
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');

let chromium;
try {
  ({ chromium } = await import('playwright'));
} catch {
  console.error('playwright is not installed. npm i -D playwright && npx playwright install chromium');
  process.exit(2);
}

const pages = ['index.html'];
for (const name of [
  'button', 'icon-button', 'toggle', 'slider', 'select', 'chips', 'input', 'textarea',
  'checkbox', 'radio', 'stepper', 'search', 'keybind', 'color', 'stat', 'spec', 'table',
  'list', 'avatar', 'kbd', 'code', 'divider', 'empty', 'toast', 'alert', 'progress',
  'spinner', 'skeleton', 'badge', 'tooltip', 'modal', 'drawer', 'menu', 'popover', 'bypass',
]) pages.push('elements/' + name + '.html');

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 900, height: 900 } });
const failures = [];

for (const width of [320, 458, 1280]) {
  await page.setViewportSize({ width, height: 900 });
  for (const rel of pages) {
    await page.goto('file://' + path.join(root, rel).replace(/\\/g, '/'), { waitUntil: 'load' });
    await page.waitForTimeout(80);
    const r = await page.evaluate(() => {
      const doc = document.documentElement;
      const page = document.querySelector('.cu-page');
      const pr = page ? page.getBoundingClientRect() : null;
      const escaped = [];
      if (page) {
        const inScroller = (el) => {
          let n = el.parentElement;
          while (n) {
            const cs = getComputedStyle(n);
            if (cs.overflowX === 'auto' || cs.overflowX === 'scroll') return true;
            n = n.parentElement;
          }
          return false;
        };
        for (const el of page.querySelectorAll('*')) {
          const cs = getComputedStyle(el);
          if (cs.position === 'absolute' || cs.position === 'fixed' || cs.display === 'none') continue;
          if (inScroller(el)) continue;
          const b = el.getBoundingClientRect();
          if (!b.width || !pr) continue;
          if (b.right > pr.right - 19) escaped.push(el.className || el.tagName);
        }
      }
      return { dx: doc.scrollWidth - doc.clientWidth, escaped: escaped.slice(0, 3) };
    });
    if (r.dx > 1 || r.escaped.length) failures.push({ page: rel, width, dx: r.dx, escaped: r.escaped });
  }
}

await browser.close();

if (failures.length) {
  console.error('overflow detected:');
  for (const f of failures) console.error(' -', f.page, 'dx=' + f.dx, f.escaped.join(', '));
  process.exit(1);
}
console.log('overflow: clean —', pages.length, 'pages');
