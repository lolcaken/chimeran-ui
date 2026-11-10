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
