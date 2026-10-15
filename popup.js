const THEME_META = {
  'off': {
    accent: '#484f58',
    glow: 'rgba(0, 0, 0, 0)',
    badge: 'Normal',
    swatches: ['#161b22', '#21262d', '#30363d', '#484f58']
  },
  'neon-crimson': {
    accent: '#ff1e42',
    glow: 'rgba(255, 30, 66, 0.35)',
    badge: 'Crimson',
    swatches: ['#12070a', '#3b0914', '#b81437', '#ff1e42']
  },
  'matrix-green': {
    accent: '#00ff66',
    glow: 'rgba(0, 255, 102, 0.35)',
    badge: 'Matrix',
    swatches: ['#061209', '#06381a', '#00b347', '#00ff66']
  },
  'electric-blue': {
    accent: '#00e5ff',
    glow: 'rgba(0, 229, 255, 0.35)',
    badge: 'Electric',
    swatches: ['#070e1a', '#07334a', '#00a3c4', '#00e5ff']
  },
  'cyber-purple': {
    accent: '#d946ef',
    glow: 'rgba(217, 70, 239, 0.35)',
    badge: 'Cyber',
    swatches: ['#0e071a', '#321042', '#9c27b0', '#d946ef']
  },
  'halloween-blood': {
    accent: '#ff5500',
    glow: 'rgba(255, 85, 0, 0.38)',
    badge: 'Spooky',
    swatches: ['#100806', '#420b0b', '#cc3300', '#ff6600']
  }
};

const themeSelect = document.getElementById('themeSelect');
const statusBadge = document.getElementById('statusBadge');
const swatches = [
  document.getElementById('sw1'),
  document.getElementById('sw2'),
  document.getElementById('sw3'),
  document.getElementById('sw4')
];

function updatePopupUI(themeKey) {
  const meta = THEME_META[themeKey] || THEME_META['off'];
  document.documentElement.style.setProperty('--popup-accent', meta.accent);
  document.documentElement.style.setProperty('--popup-glow', meta.glow);
  statusBadge.textContent = meta.badge;

  swatches.forEach((el, idx) => {
    el.style.background = meta.swatches[idx];
    el.style.boxShadow = idx === 3 && themeKey !== 'off' ? `0 0 8px ${meta.accent}` : 'none';
  });
}

// Load current saved theme when popup opens
chrome.storage.sync.get(['ghNeonTheme'], (result) => {
  const savedTheme = result.ghNeonTheme || 'off';
  themeSelect.value = savedTheme;
  updatePopupUI(savedTheme);
});

// Save and broadcast immediately when dropdown changes
themeSelect.addEventListener('change', (e) => {
  const selectedTheme = e.target.value;
  chrome.storage.sync.set({ ghNeonTheme: selectedTheme });
  updatePopupUI(selectedTheme);
});