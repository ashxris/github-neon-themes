# ✨ GitHub Neon Themes

A lightweight, Discord-inspired **Manifest V3 Chrome Extension** that transforms GitHub.com into a dark, glowing, neon-themed UI with subtle starlight/glitter effects—without altering fonts, icons, layouts, images, or code syntax highlighting.

![Manifest V3](https://img.shields.io/badge/Manifest-V3-00e5ff?style=for-the-badge&logo=googlechrome&logoColor=white)
![Zero Dependencies](https://img.shields.io/badge/Dependencies-Zero-00ff66?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-e040fb?style=for-the-badge)

---

## 🌟 Features

- **🎨 5 Built-in Dark Neon Palettes:**
  - 🔴 **Neon Crimson** — Deep dark-red canvas with intense crimson glow & rose sparkles.
  - 🟢 **Matrix Green** — Obsidian green-black canvas with terminal neon-green accents.
  - 🔵 **Electric Blue** — Deep navy-black canvas with electric cyan bloom.
  - 🟣 **Cyber Purple** — Midnight violet canvas with neon magenta & purple highlights.
  - 🎃 **Halloween Blood** — Pitch charcoal-black canvas with blood-red & pumpkin-orange glow.
  - ⚪ **Default (Off)** — Instantly restores your original GitHub appearance.
- **⚡ Zero Flash of Unstyled Content (FOUC):**
  - Injected at `document_start` and resilient against GitHub's Turbo/PJAX client-side routing.
- **🟩 Themed Contribution Graph & Status Badges:**
  - Profile contribution calendars and Issue/PR status badges dynamically adapt and glow in your active theme's palette.
- **💻 Code Syntax Highlighting Preserved:**
  - `<pre>`, `<code>`, and `.blob-code` tokens remain 100% untouched in GitHub's native dark syntax theme for effortless readability.

---

## 🔧 Installation

### Method 1: Chrome Extension (Load Unpacked in Chrome)

1. **Clone or download this repo:**
   ```bash
   git clone https://github.com/ashxris/github-neon-themes.git
   ```
   Or click **Code → Download ZIP** and unzip it.

2. Open Chrome and go to `chrome://extensions/`.

3. Enable **Developer mode** (toggle in the top-right corner).

4. Click **Load unpacked** and select the `github-neon-themes/` folder.

5. (Optional) Click the **puzzle piece 🧩** in the Chrome toolbar → pin **GitHub Neon Themes** for quick access.

6. Visit [github.com](https://github.com), open the extension popup, and pick a theme.

> To update later, pull the latest changes and click the **↻ Reload** button on the extension card in `chrome://extensions/`.

### Method 2: Tampermonkey Userscript (Chrome / Edge / Firefox / Safari)

No Developer mode needed — great if you already use Tampermonkey or Violentmonkey.

> **⚡ 1-click install:** have Tampermonkey / Violentmonkey installed, then click this link — you'll get an Install screen immediately:
>
> 👉 **[Install GitHub Neon Themes](https://raw.githubusercontent.com/ashxris/github-neon-themes/refs/heads/main/github-neon-themes.user.js)**

1. **Install a userscript manager:** get [Tampermonkey](https://www.tampermonkey.net/) (or [Violentmonkey](https://violentmonkey.github.io/)) and pin it to your toolbar.

2. **Add the script:** click the **Install** link above and hit **Install** on the Tampermonkey/Violentmonkey screen. (Manual fallback: dashboard → **+ new script** → paste contents of `github-neon-themes.user.js` → save, toggle **Enabled**.)

3. **Use it:** visit [github.com](https://github.com) and pick a theme from the floating dropdown (bottom-right) or via **Tampermonkey icon → GitHub Neon Themes → theme name**. Your choice syncs across tabs automatically.

> To update later, Tampermonkey auto-checks the raw URL for new versions — or just click the Install link above again to re-install manually.

---

## 📂 Project Structure

```text
github-neon-themes/
├── manifest.json   # Chrome Extension Manifest V3 configuration
├── content.js      # Injects theme attributes & syncs storage-driven theme
├── themes.css      # Primer CSS variable overrides, dynamic calc() glows & glitter layers
├── popup.html      # Discord-inspired extension popup UI
├── popup.js        # Popup state management & chrome.storage.sync broadcaster
├── github-neon-themes.user.js # Tampermonkey userscript (Method 2 install)
└── README.md       # Project documentation
```