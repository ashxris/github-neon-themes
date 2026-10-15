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
- **🎚️ Live Glow & Glitter Intensity Slider (`0%` – `200%`):**
  - Dial it down to `0%` for a clean, flat dark-matte aesthetic, keep it at `100%` for balanced neon, or push it to `200%` for maximum bloom and twinkling starlight.
- **⚡ Zero Flash of Unstyled Content (FOUC):**
  - Injected at `document_start` and resilient against GitHub's Turbo/PJAX client-side routing.
- **🟩 Themed Contribution Graph & Status Badges:**
  - Profile contribution calendars and Issue/PR status badges dynamically adapt and glow in your active theme's palette.
- **💻 Code Syntax Highlighting Preserved:**
  - `<pre>`, `<code>`, and `.blob-code` tokens remain 100% untouched in GitHub's native dark syntax theme for effortless readability.

---

## 📂 Project Structure

```text
github-neon-themes/
├── manifest.json   # Chrome Extension Manifest V3 configuration
├── content.js      # Injects theme attributes & syncs live slider multiplier
├── themes.css      # Primer CSS variable overrides, dynamic calc() glows & glitter layers
├── popup.html      # Discord-inspired extension popup UI
├── popup.js        # Popup state management & chrome.storage.sync broadcaster
└── README.md       # Project documentation