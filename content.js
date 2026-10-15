let originalColorMode = null;
let originalDarkTheme = null;

function applyTheme(theme) {
  const root = document.documentElement;
  if (!root) return;

  // Save original GitHub color attributes once so we can restore them on "off"
  if (originalColorMode === null && root.hasAttribute('data-color-mode')) {
    originalColorMode = root.getAttribute('data-color-mode');
    originalDarkTheme = root.getAttribute('data-dark-theme');
  }

  if (!theme || theme === 'off') {
    root.removeAttribute('data-gh-neon-theme');
    if (originalColorMode) {
      root.setAttribute('data-color-mode', originalColorMode);
    }
    if (originalDarkTheme) {
      root.setAttribute('data-dark-theme', originalDarkTheme);
    }
  } else {
    root.setAttribute('data-gh-neon-theme', theme);
    // Force dark base so GitHub syntax highlighting & icons stay on dark mode
    root.setAttribute('data-color-mode', 'dark');
    root.setAttribute('data-dark-theme', 'dark');
  }
}

// 1. Apply immediately at document_start
chrome.storage.sync.get(['ghNeonTheme'], (result) => {
  applyTheme(result.ghNeonTheme || 'off');
});

// 2. Listen for live changes from the extension popup dropdown
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'sync' && changes.ghNeonTheme) {
    applyTheme(changes.ghNeonTheme.newValue);
  }
});

// 3. Re-assert theme if GitHub's Turbo router resets <html> attributes on navigation
const observer = new MutationObserver(() => {
  chrome.storage.sync.get(['ghNeonTheme'], (result) => {
    const activeTheme = result.ghNeonTheme || 'off';
    const root = document.documentElement;
    if (activeTheme !== 'off') {
      if (root.getAttribute('data-gh-neon-theme') !== activeTheme) {
        root.setAttribute('data-gh-neon-theme', activeTheme);
      }
      if (root.getAttribute('data-color-mode') !== 'dark') {
        root.setAttribute('data-color-mode', 'dark');
      }
    }
  });
});

observer.observe(document.documentElement, {
  attributes: true,
  attributeFilter: ['data-color-mode', 'data-gh-neon-theme']
});