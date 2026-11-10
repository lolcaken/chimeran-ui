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



