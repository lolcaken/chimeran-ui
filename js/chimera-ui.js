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

  /* ---------------------------------------------------------------- tabs -- */
  function tabs(root, box) {
    const list = all(box, '[role="tab"]');
    if (!list.length) return;
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
    all(root, '[data-cn-open="' + name + '"]').forEach((trigger) => {
      on(trigger, 'click', (e) => {
        e.preventDefault();
        const id = trigger.getAttribute('data-cn-target');
        const node = (id && (root.getElementById ? root.getElementById(id) : null)) || root.querySelector(sel);
        if (!node) return;
        node.hidden = false;
        node.classList.add('open');
        const focusable = node.querySelector('button, input, [tabindex]');
        if (focusable) focusable.focus();
        node.dispatchEvent(new CustomEvent('cn:open', { bubbles: true }));
      });
    });
    all(root, sel).forEach((node) => {
      const close = () => {
        node.classList.remove('open');
        node.hidden = true;
        node.dispatchEvent(new CustomEvent('cn:close', { bubbles: true }));
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
      (root.host || docOf(root).body).appendChild(box);
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

  /* ---------------------------------------------------------------- mount -- */
  function attach(root) {
    if (!root || root.__cnAttached) return root;
    root.__cnAttached = true;
    all(root, '[data-cn="tabs"]').forEach((box) => tabs(root, box));
    toggles(root); sliders(root); chips(root); collapse(root);
    overlay(root, 'modal', '.n1-modal');
    overlay(root, 'drawer', '.n1-drawer');
    triggers(root); keybinds(root);
    return root;
  }

  function mount(opts) {
    const o = opts || {};
    const host = document.createElement('div');
    host.id = o.id || uid('chimeraui');
    host.style.cssText = 'position:fixed;inset:0;z-index:2147483000;pointer-events:none';
    const root = host.attachShadow({ mode: o.mode || 'open' });
    root.innerHTML = '<style>' + (o.css || '') + '</style>' + (o.html || '');
    (o.parent || document.body).appendChild(host);
    attach(root);
    return { host: host, root: root };
  }

  const api = { attach: attach, mount: mount, toast: toast, tabs: tabs, version: '0.1.0' };
  global.ChimeraUI = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof window !== 'undefined' ? window : globalThis);
