# WORLD_NET // Matrix Data Terminal

> **Enter the Matrix. Explore global data through the digital realm.** 🟢

An immersive geographic data terminal inspired by The Matrix's iconic visual aesthetic. Browse countries, analyze statistics, and compare nations through a futuristic hacker interface.

## 🌟 Theme: Matrix / Hacker Terminal

Immerse yourself in the iconic green-on-black digital world:
- **Matrix digital rain** background effect (Canvas API)
- **CRT scanline** and **vignette effects**
- **Glowing green terminal** typography
- **Blinking cursor** and animated status indicators
- **Japanese katakana** characters in the rain
- **Terminal-style output log** with timestamps

## ✨ Features

### Core Experience
- **Real-time global data** from REST Countries API
- **Population rankings** - Countries sorted by population
- **Search & filter** - Debounced search with region filtering
- **Comparison matrix** - Compare any two countries side by side
- **Favorites system** - Save frequently viewed countries (localStorage)
- **Terminal output** - Live system messages with timestamps
- **Live clock** - Real-time system time display
- **Pagination** - Load 50 countries at a time for performance

### Visual Effects
- Animated Matrix digital rain (Canvas)
- CRT scanline overlay
- Screen vignette effect
- Pulsing logo animation
- Blinking text indicators
- Smooth transitions and hover effects

### Data Display
- Country flag with glowing border
- Population, area, density calculations
- Global population ranking
- Capital city and region tags
- Save to favorites functionality

## 🛠️ Tech Stack

| Component | Technology |
|-----------|------------|
| Format | Single HTML file |
| Effects | Canvas API (digital rain) |
| Styling | CSS Variables + Animations |
| Scripting | Vanilla JavaScript (ES6+) |
| Data | REST Countries API |
| Storage | localStorage (favorites) |
| Dependencies | None |

## 🚀 Usage

Simply open `index.html` in any modern browser:

```bash
# Direct open
open index.html

# Or with a server
python -m http.server 8000
npx serve .
```

## 📁 Project Structure

```
27-game-world-capstone/
├── index.html    # Complete terminal application
├── README.md     # This file
├── package.json  # Metadata
└── src/          # (legacy, not used)
```

## 🎯 How to Use

1. **Browse** - Scroll through the country list (ranked by population)
2. **Search** - Type to filter countries in real-time
3. **Filter** - Select a region to narrow results
4. **Select** - Click a country to view detailed data
5. **Compare** - Use the comparison dropdown to analyze two countries
6. **Save** - Click "★ SAVE" to add countries to your favorites bar

## 🌍 Deployment

Deploy the single `index.html` file anywhere:

```bash
# GitHub Pages - Push to gh-pages branch
# Netlify - Drag and drop index.html
# Vercel - Deploy with zero config
```

## 🎨 Visual Features

### Digital Rain Effect
- Canvas-based Japanese character rain
- Opacity fade trails
- Responsive to window size

### Terminal Styling
- Monospace Courier New font
- Uppercase text with letter spacing
- Green (#00ff41) primary color
- Glowing text shadows
- Custom scrollbar styling

## 🏆 Credits

**Made by MK — Built by Musharraf Kazi**

---

*There is no spoon.* 🥄

---

### Live Demo
- GitHub Pages: <https://mk-knight23.github.io/27-World-Capstone/>
- Vercel: [Deploy your own](https://vercel.com/new)
- Netlify: [Deploy your own](https://app.netlify.com/start)

---

## 📝 Design Notes (V2)

### Intentional Quirk: The CRT Scanline Flicker
V2 adds subtle scanline flicker (random opacity variation every frame). It's barely perceptible but adds "texture." Most users won't consciously notice it, but the interface feels more "analog" than sterile digital. The flicker rate (0.98-1.0 opacity) is arbitrary—I tuned it until it felt right, not until it was accurate to real CRTs.

### Tradeoff: No Data Export
The terminal displays data beautifully but can't export it. No CSV, no JSON download. The tradeoff: purity vs. utility. Export features would require backend infrastructure. This is a frontend showcase—data stays ephemeral. Humans can screenshot if they really need it.

### What I Chose NOT to Build
No command history or autocomplete. Real terminals remember commands. This one doesn't. Each query is fresh. The decision: simplicity over power-user features. The terminal is a display, not a shell. Adding history would require state management that's overkill for the experience.
