// ==UserScript==
// @name         GitHub Neon Themes
// @namespace    https://github.com/ashxris/github-neon-themes
// @version      1.0.0
// @description  Discord-inspired dark neon themes for GitHub with glowing accents and starlight glitter effects.
// @author       ashxris
// @match        https://github.com/*
// @match        https://*.github.com/*
// @run-at       document-start
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// @grant        GM_addValueChangeListener
// ==/UserScript==

(function () {
  'use strict';

  const THEMES = {
    'off': { label: '⚪ Default (GitHub Normal)', accent: '#484f58' },
    'neon-crimson': { label: '🔴 Neon Crimson', accent: '#ff1744' },
    'matrix-green': { label: '🟢 Matrix Green', accent: '#00ff66' },
    'electric-blue': { label: '🔵 Electric Blue', accent: '#00e5ff' },
    'cyber-purple': { label: '🟣 Cyber Purple', accent: '#e040fb' },
    'halloween-blood': { label: '🎃 Halloween Blood', accent: '#ff5500' }
  };

  let originalColorMode = null;
  let originalDarkTheme = null;

  // ==========================================================================
  // 1. NEON & GLITTER CSS STYLESHEET
  // ==========================================================================
  const NEON_CSS = `
    /* NEON CRIMSON */
    html[data-gh-neon-theme="neon-crimson"] {
      --neon-bg-canvas: #090204;
      --neon-bg-default: #110508;
      --neon-bg-subtle: #1a080d;
      --neon-bg-muted: #260c14;
      --neon-bg-overlay: #14060a;
      --neon-fg-default: #ffeef2;
      --neon-fg-muted: #d49ba7;
      --neon-primary: #ff1744;
      --neon-secondary: #ff617d;
      --neon-sparkle: #ff8da1;
      --neon-border: #591224;
      --neon-border-glow: rgba(255, 23, 68, 0.65);
      --neon-glow-subtle: 0 0 12px rgba(255, 23, 68, 0.35), 0 0 24px rgba(255, 23, 68, 0.15), inset 0 0 8px rgba(255, 23, 68, 0.12);
      --neon-glow-strong: 0 0 14px rgba(255, 23, 68, 0.6), 0 0 28px rgba(255, 97, 125, 0.35), inset 0 0 10px rgba(255, 23, 68, 0.25);
      --neon-glow-focus: 0 0 0 2px rgba(255, 23, 68, 0.7), 0 0 18px rgba(255, 23, 68, 0.6), 0 0 32px rgba(255, 23, 68, 0.35);
      --neon-cal-l1: #4a0918;
      --neon-cal-l2: #8a0e2b;
      --neon-cal-l3: #c9123c;
      --neon-cal-l4: #ff1744;
    }

    /* MATRIX GREEN */
    html[data-gh-neon-theme="matrix-green"] {
      --neon-bg-canvas: #020804;
      --neon-bg-default: #051008;
      --neon-bg-subtle: #091a0e;
      --neon-bg-muted: #0f2917;
      --neon-bg-overlay: #07140b;
      --neon-fg-default: #e8ffef;
      --neon-fg-muted: #88c498;
      --neon-primary: #00ff66;
      --neon-secondary: #66ffaa;
      --neon-sparkle: #b3ffd4;
      --neon-border: #145229;
      --neon-border-glow: rgba(0, 255, 102, 0.6);
      --neon-glow-subtle: 0 0 12px rgba(0, 255, 102, 0.32), 0 0 24px rgba(0, 255, 102, 0.14), inset 0 0 8px rgba(0, 255, 102, 0.1);
      --neon-glow-strong: 0 0 14px rgba(0, 255, 102, 0.55), 0 0 28px rgba(102, 255, 170, 0.3), inset 0 0 10px rgba(0, 255, 102, 0.22);
      --neon-glow-focus: 0 0 0 2px rgba(0, 255, 102, 0.7), 0 0 18px rgba(0, 255, 102, 0.55), 0 0 32px rgba(0, 255, 102, 0.3);
      --neon-cal-l1: #07421e;
      --neon-cal-l2: #0a7836;
      --neon-cal-l3: #00bf4c;
      --neon-cal-l4: #00ff66;
    }

    /* ELECTRIC BLUE */
    html[data-gh-neon-theme="electric-blue"] {
      --neon-bg-canvas: #02060d;
      --neon-bg-default: #050c18;
      --neon-bg-subtle: #0a1526;
      --neon-bg-muted: #10213a;
      --neon-bg-overlay: #07101f;
      --neon-fg-default: #eaf8ff;
      --neon-fg-muted: #8ebde0;
      --neon-primary: #00e5ff;
      --neon-secondary: #6ef2ff;
      --neon-sparkle: #b8f9ff;
      --neon-border: #144673;
      --neon-border-glow: rgba(0, 229, 255, 0.65);
      --neon-glow-subtle: 0 0 12px rgba(0, 229, 255, 0.35), 0 0 24px rgba(0, 229, 255, 0.15), inset 0 0 8px rgba(0, 229, 255, 0.12);
      --neon-glow-strong: 0 0 14px rgba(0, 229, 255, 0.6), 0 0 28px rgba(110, 242, 255, 0.35), inset 0 0 10px rgba(0, 229, 255, 0.25);
      --neon-glow-focus: 0 0 0 2px rgba(0, 229, 255, 0.7), 0 0 18px rgba(0, 229, 255, 0.6), 0 0 32px rgba(0, 229, 255, 0.35);
      --neon-cal-l1: #073b54;
      --neon-cal-l2: #0b6e99;
      --neon-cal-l3: #00b0d4;
      --neon-cal-l4: #00e5ff;
    }

    /* CYBER PURPLE */
    html[data-gh-neon-theme="cyber-purple"] {
      --neon-bg-canvas: #06020c;
      --neon-bg-default: #0c0517;
      --neon-bg-subtle: #140a26;
      --neon-bg-muted: #1f103b;
      --neon-bg-overlay: #10071f;
      --neon-fg-default: #f7edff;
      --neon-fg-muted: #bc9ce0;
      --neon-primary: #e040fb;
      --neon-secondary: #b388ff;
      --neon-sparkle: #f3b8ff;
      --neon-border: #481b7a;
      --neon-border-glow: rgba(224, 64, 251, 0.65);
      --neon-glow-subtle: 0 0 12px rgba(224, 64, 251, 0.36), 0 0 24px rgba(179, 136, 255, 0.16), inset 0 0 8px rgba(224, 64, 251, 0.12);
      --neon-glow-strong: 0 0 14px rgba(224, 64, 251, 0.6), 0 0 28px rgba(179, 136, 255, 0.38), inset 0 0 10px rgba(224, 64, 251, 0.25);
      --neon-glow-focus: 0 0 0 2px rgba(224, 64, 251, 0.7), 0 0 18px rgba(224, 64, 251, 0.6), 0 0 32px rgba(179, 136, 255, 0.35);
      --neon-cal-l1: #3b114d;
      --neon-cal-l2: #701f94;
      --neon-cal-l3: #ab27c4;
      --neon-cal-l4: #e040fb;
    }

    /* HALLOWEEN BLOOD */
    html[data-gh-neon-theme="halloween-blood"] {
      --neon-bg-canvas: #060302;
      --neon-bg-default: #0e0604;
      --neon-bg-subtle: #170b07;
      --neon-bg-muted: #24110a;
      --neon-bg-overlay: #120805;
      --neon-fg-default: #fff2eb;
      --neon-fg-muted: #d4a38a;
      --neon-primary: #ff5500;
      --neon-secondary: #ff1744;
      --neon-sparkle: #ffaa44;
      --neon-border: #59200b;
      --neon-border-glow: rgba(255, 85, 0, 0.68);
      --neon-glow-subtle: 0 0 12px rgba(255, 85, 0, 0.38), 0 0 24px rgba(255, 23, 68, 0.18), inset 0 0 8px rgba(255, 85, 0, 0.14);
      --neon-glow-strong: 0 0 14px rgba(255, 85, 0, 0.65), 0 0 28px rgba(255, 23, 68, 0.4), inset 0 0 10px rgba(255, 85, 0, 0.25);
      --neon-glow-focus: 0 0 0 2px rgba(255, 85, 0, 0.75), 0 0 18px rgba(255, 85, 0, 0.65), 0 0 32px rgba(255, 23, 68, 0.4);
      --neon-cal-l1: #4d0b0b;
      --neon-cal-l2: #94140e;
      --neon-cal-l3: #d93600;
      --neon-cal-l4: #ff6600;
    }

    /* PRIMER CSS VARIABLE OVERRIDES */
    html[data-gh-neon-theme] {
      --bgColor-default: var(--neon-bg-default) !important;
      --bgColor-muted: var(--neon-bg-subtle) !important;
      --bgColor-inset: var(--neon-bg-canvas) !important;
      --bgColor-emphasis: var(--neon-primary) !important;
      --overlay-bgColor: var(--neon-bg-overlay) !important;

      --color-canvas-default: var(--neon-bg-default) !important;
      --color-canvas-subtle: var(--neon-bg-subtle) !important;
      --color-canvas-inset: var(--neon-bg-canvas) !important;
      --color-canvas-overlay: var(--neon-bg-overlay) !important;
      --color-header-bg: var(--neon-bg-canvas) !important;
      --color-neutral-muted: var(--neon-bg-muted) !important;
      --color-neutral-subtle: var(--neon-bg-subtle) !important;

      --fgColor-default: var(--neon-fg-default) !important;
      --fgColor-muted: var(--neon-fg-muted) !important;
      --fgColor-accent: var(--neon-primary) !important;
      --fgColor-open: var(--neon-primary) !important;
      --fgColor-done: var(--neon-secondary) !important;
      --fgColor-success: var(--neon-primary) !important;

      --color-fg-default: var(--neon-fg-default) !important;
      --color-fg-muted: var(--neon-fg-muted) !important;
      --color-fg-subtle: var(--neon-fg-muted) !important;
      --color-accent-fg: var(--neon-primary) !important;
      --color-success-fg: var(--neon-primary) !important;
      --color-open-fg: var(--neon-primary) !important;
      --color-done-fg: var(--neon-secondary) !important;

      --borderColor-default: var(--neon-border) !important;
      --borderColor-muted: var(--neon-border) !important;
      --borderColor-accent-emphasis: var(--neon-primary) !important;
      --borderColor-open-emphasis: var(--neon-primary) !important;
      --borderColor-done-emphasis: var(--neon-secondary) !important;

      --color-border-default: var(--neon-border) !important;
      --color-border-muted: var(--neon-border) !important;
      --color-accent-emphasis: var(--neon-primary) !important;
      --color-accent-muted: var(--neon-border-glow) !important;

      --bgColor-open-emphasis: var(--neon-primary) !important;
      --bgColor-done-emphasis: var(--neon-secondary) !important;
      --bgColor-success-emphasis: var(--neon-primary) !important;
      --bgColor-accent-emphasis: var(--neon-primary) !important;
      --color-open-emphasis: var(--neon-primary) !important;
      --color-done-emphasis: var(--neon-secondary) !important;
      --color-success-emphasis: var(--neon-primary) !important;

      --button-primary-bgColor-rest: var(--neon-bg-muted) !important;
      --button-primary-bgColor-hover: var(--neon-primary) !important;
      --button-primary-fgColor-rest: var(--neon-primary) !important;
      --button-primary-fgColor-hover: var(--neon-bg-canvas) !important;
      --button-primary-borderColor-rest: var(--neon-primary) !important;

      --color-btn-primary-bg: var(--neon-bg-muted) !important;
      --color-btn-primary-hover-bg: var(--neon-primary) !important;
      --color-btn-primary-text: var(--neon-primary) !important;
      --color-btn-primary-border: var(--neon-primary) !important;

      --color-btn-bg: var(--neon-bg-subtle) !important;
      --color-btn-hover-bg: var(--neon-bg-muted) !important;
      --color-btn-border: var(--neon-border) !important;
      --color-btn-hover-border: var(--neon-primary) !important;

      --color-calendar-graph-day-bg: var(--neon-bg-subtle) !important;
      --color-calendar-graph-day-border: rgba(255, 255, 255, 0.05) !important;
      --color-calendar-graph-day-L1-bg: var(--neon-cal-l1) !important;
      --color-calendar-graph-day-L2-bg: var(--neon-cal-l2) !important;
      --color-calendar-graph-day-L3-bg: var(--neon-cal-l3) !important;
      --color-calendar-graph-day-L4-bg: var(--neon-cal-l4) !important;
      --color-calendar-graph-day-L1-border: transparent !important;
      --color-calendar-graph-day-L2-border: transparent !important;
      --color-calendar-graph-day-L3-border: transparent !important;
      --color-calendar-graph-day-L4-border: transparent !important;
    }

    /* GLITTERY STARLIGHT OVERLAY & SHIMMER ANIMATIONS */
    @keyframes neonGlitterTwinkle {
      0%, 100% { opacity: 0.35; }
      50% { opacity: 0.75; }
    }

    @keyframes neonBorderShimmer {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    html[data-gh-neon-theme] body::before {
      content: "";
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 9998;
      opacity: 0.55;
      background-image:
        radial-gradient(1.2px 1.2px at 18px 28px, var(--neon-sparkle), transparent),
        radial-gradient(1px 1px at 62px 88px, var(--neon-primary), transparent),
        radial-gradient(1.5px 1.5px at 118px 42px, #ffffff, transparent),
        radial-gradient(1px 1px at 165px 135px, var(--neon-secondary), transparent),
        radial-gradient(1.3px 1.3px at 210px 75px, var(--neon-sparkle), transparent),
        radial-gradient(1px 1px at 255px 175px, var(--neon-primary), transparent);
      background-size: 270px 210px;
    }

    html[data-gh-neon-theme] body::after {
      content: "";
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 9999;
      animation: neonGlitterTwinkle 4.5s ease-in-out infinite;
      background-image:
        radial-gradient(1.6px 1.6px at 45px 140px, #ffffff, transparent),
        radial-gradient(1.4px 1.4px at 95px 25px, var(--neon-sparkle), transparent),
        radial-gradient(1.8px 1.8px at 180px 95px, var(--neon-primary), transparent),
        radial-gradient(1.2px 1.2px at 240px 160px, #ffffff, transparent),
        radial-gradient(1.5px 1.5px at 310px 55px, var(--neon-secondary), transparent);
      background-size: 340px 230px;
    }

    /* GLOW EFFECTS ON LINKS, CARDS, HEADERS, FOCUS RINGS & CALENDAR */
    html[data-gh-neon-theme] a:not(.blob-code *):not(pre *):not(code *) {
      transition: text-shadow 0.2s ease, color 0.2s ease;
    }

    html[data-gh-neon-theme] a:hover:not(.blob-code *):not(pre *):not(code *) {
      color: var(--neon-sparkle) !important;
      text-shadow:
        0 0 6px var(--neon-primary),
        0 0 14px var(--neon-primary),
        0 0 24px var(--neon-secondary) !important;
    }

    html[data-gh-neon-theme] .Box,
    html[data-gh-neon-theme] .TimelineItem-badge,
    html[data-gh-neon-theme] .Overlay,
    html[data-gh-neon-theme] .SelectMenu-modal,
    html[data-gh-neon-theme] .color-bg-subtle,
    html[data-gh-neon-theme] [data-target="readme-toc.content"] {
      border-color: var(--neon-border) !important;
      box-shadow: var(--neon-glow-subtle) !important;
      transition: box-shadow 0.25s ease, border-color 0.25s ease;
    }

    html[data-gh-neon-theme] .Box:hover,
    html[data-gh-neon-theme] .pinned-item-list-item:hover {
      border-color: var(--neon-border-glow) !important;
      box-shadow: var(--neon-glow-strong) !important;
    }

    html[data-gh-neon-theme] .AppHeader,
    html[data-gh-neon-theme] .Header {
      background-color: var(--neon-bg-canvas) !important;
      border-bottom: 1px solid var(--neon-primary) !important;
      box-shadow: 0 2px 18px var(--neon-border-glow), 0 0 30px rgba(0, 0, 0, 0.8) !important;
    }

    html[data-gh-neon-theme] .btn-primary,
    html[data-gh-neon-theme] .State,
    html[data-gh-neon-theme] [data-variant="primary"] {
      background-image: linear-gradient(
        125deg,
        var(--neon-bg-muted) 0%,
        var(--neon-border) 35%,
        var(--neon-primary) 50%,
        var(--neon-border) 65%,
        var(--neon-bg-muted) 100%
      ) !important;
      background-size: 250% 250% !important;
      animation: neonBorderShimmer 6s ease infinite !important;
      border: 1px solid var(--neon-primary) !important;
      color: var(--neon-fg-default) !important;
      text-shadow: 0 0 6px var(--neon-primary) !important;
      box-shadow: var(--neon-glow-strong) !important;
    }

    html[data-gh-neon-theme] .btn:hover {
      border-color: var(--neon-sparkle) !important;
      box-shadow: var(--neon-glow-strong) !important;
    }

    html[data-gh-neon-theme] .UnderlineNav-item.selected::after,
    html[data-gh-neon-theme] .UnderlineNav-item[aria-current]:not([aria-current="false"])::after {
      background-color: var(--neon-sparkle) !important;
      box-shadow:
        0 0 8px var(--neon-primary),
        0 0 16px var(--neon-primary),
        0 0 26px var(--neon-secondary) !important;
    }

    html[data-gh-neon-theme] input:focus,
    html[data-gh-neon-theme] textarea:focus,
    html[data-gh-neon-theme] select:focus,
    html[data-gh-neon-theme] .form-control:focus,
    html[data-gh-neon-theme] [data-focus-visible-added]:focus {
      border-color: var(--neon-sparkle) !important;
      box-shadow: var(--neon-glow-focus) !important;
      outline: none !important;
    }

    html[data-gh-neon-theme] .ContributionCalendar-day[data-level="1"] {
      filter: drop-shadow(0 0 2px var(--neon-cal-l1));
    }
    html[data-gh-neon-theme] .ContributionCalendar-day[data-level="2"] {
      filter: drop-shadow(0 0 4px var(--neon-cal-l2));
    }
    html[data-gh-neon-theme] .ContributionCalendar-day[data-level="3"] {
      filter: drop-shadow(0 0 6px var(--neon-primary));
    }
    html[data-gh-neon-theme] .ContributionCalendar-day[data-level="4"] {
      filter: drop-shadow(0 0 8px var(--neon-primary)) drop-shadow(0 0 12px var(--neon-sparkle));
    }

    /* FLOATING IN-PAGE NEON THEME SWITCHER PILL */
    #gh-neon-floating-switcher {
      position: fixed;
      bottom: 18px;
      right: 18px;
      z-index: 10000;
      display: flex;
      align-items: center;
      gap: 6px;
      background: rgba(10, 12, 18, 0.88);
      backdrop-filter: blur(8px);
      padding: 6px 10px;
      border-radius: 999px;
      border: 1px solid var(--neon-primary, #30363d);
      box-shadow: var(--neon-glow-subtle, 0 4px 12px rgba(0,0,0,0.5));
      opacity: 0.45;
      transition: opacity 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
    }

    #gh-neon-floating-switcher:hover {
      opacity: 1;
      transform: translateY(-2px);
      box-shadow: var(--neon-glow-strong, 0 6px 16px rgba(0,0,0,0.7));
    }

    #gh-neon-floating-switcher select {
      background: transparent;
      color: var(--neon-fg-default, #f0f6fc);
      border: none;
      font-size: 12px;
      font-weight: 600;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
      cursor: pointer;
      outline: none;
      padding-right: 4px;
    }

    #gh-neon-floating-switcher select option {
      background: #0d1117;
      color: #f0f6fc;
    }
  `;

  // ==========================================================================
  // 2. CORE THEME LOGIC
  // ==========================================================================
  function injectStylesheet() {
    if (document.getElementById('gh-neon-themes-style')) return;
    const style = document.createElement('style');
    style.id = 'gh-neon-themes-style';
    style.textContent = NEON_CSS;
    (document.head || document.documentElement).appendChild(style);
  }

  function getSavedTheme() {
    try {
      return typeof GM_getValue === 'function'
        ? GM_getValue('ghNeonTheme', 'electric-blue')
        : localStorage.getItem('ghNeonTheme') || 'electric-blue';
    } catch {
      return 'electric-blue';
    }
  }

  function saveTheme(themeKey) {
    try {
      if (typeof GM_setValue === 'function') {
        GM_setValue('ghNeonTheme', themeKey);
      } else {
        localStorage.setItem('ghNeonTheme', themeKey);
      }
    } catch {
      localStorage.setItem('ghNeonTheme', themeKey);
    }
    applyTheme(themeKey);
  }

  function applyTheme(themeKey) {
    const root = document.documentElement;
    if (!root) return;

    if (originalColorMode === null && root.hasAttribute('data-color-mode')) {
      originalColorMode = root.getAttribute('data-color-mode');
      originalDarkTheme = root.getAttribute('data-dark-theme');
    }

    if (!themeKey || themeKey === 'off') {
      root.removeAttribute('data-gh-neon-theme');
      if (originalColorMode) root.setAttribute('data-color-mode', originalColorMode);
      if (originalDarkTheme) root.setAttribute('data-dark-theme', originalDarkTheme);
    } else {
      root.setAttribute('data-gh-neon-theme', themeKey);
      root.setAttribute('data-color-mode', 'dark');
      root.setAttribute('data-dark-theme', 'dark');
    }

    const selectEl = document.querySelector('#gh-neon-floating-switcher select');
    if (selectEl && selectEl.value !== themeKey) {
      selectEl.value = themeKey;
    }
  }

  // ==========================================================================
  // 3. FLOATING DROPDOWN WIDGET & TAMPERMONKEY MENU COMMANDS
  // ==========================================================================
  function mountFloatingSwitcher() {
    if (!document.body || document.getElementById('gh-neon-floating-switcher')) return;

    const container = document.createElement('div');
    container.id = 'gh-neon-floating-switcher';
    container.title = 'Switch GitHub Neon Theme';

    const select = document.createElement('select');
    Object.entries(THEMES).forEach(([key, meta]) => {
      const option = document.createElement('option');
      option.value = key;
      option.textContent = meta.label;
      select.appendChild(option);
    });

    select.value = getSavedTheme();
    select.addEventListener('change', (e) => saveTheme(e.target.value));

    container.appendChild(select);
    document.body.appendChild(container);
  }

  function registerTampermonkeyMenu() {
    if (typeof GM_registerMenuCommand !== 'function') return;
    Object.entries(THEMES).forEach(([key, meta]) => {
      GM_registerMenuCommand(meta.label, () => saveTheme(key));
    });
  }

  // ==========================================================================
  // 4. INITIALIZATION & TURBO NAVIGATION PERSISTENCE
  // ==========================================================================
  injectStylesheet();
  applyTheme(getSavedTheme());
  registerTampermonkeyMenu();

  // Sync across multiple open GitHub tabs automatically
  if (typeof GM_addValueChangeListener === 'function') {
    GM_addValueChangeListener('ghNeonTheme', (_name, _oldVal, newVal) => {
      applyTheme(newVal);
    });
  }

  window.addEventListener('DOMContentLoaded', () => {
    injectStylesheet();
    mountFloatingSwitcher();
  });

  // Keep theme & switcher intact during GitHub Turbo/PJAX page transitions
  const observer = new MutationObserver(() => {
    injectStylesheet();
    const activeTheme = getSavedTheme();
    const root = document.documentElement;
    if (activeTheme !== 'off') {
      if (root.getAttribute('data-gh-neon-theme') !== activeTheme) {
        root.setAttribute('data-gh-neon-theme', activeTheme);
      }
      if (root.getAttribute('data-color-mode') !== 'dark') {
        root.setAttribute('data-color-mode', 'dark');
      }
    }
    if (document.body && !document.getElementById('gh-neon-floating-switcher')) {
      mountFloatingSwitcher();
    }
  });

  observer.observe(document.documentElement, {
    attributes: true,
    childList: true,
    attributeFilter: ['data-color-mode', 'data-gh-neon-theme']
  });
})();