# 27-game-world-net

> **Orbital Link Established. Accessing Geopolitical Database...** 🟢

A premium geographic data analyzer with a Matrix-green cyberpunk aesthetic. Browse countries, analyze statistics, and explore nations through a high-precision digital terminal built with React 19, Vite 6, and Tailwind CSS v4.

---

## 🎮 Live Demos

| Platform | URL |
|----------|-----|
| **Vercel** | [27-game-world-net.vercel.app](https://27-game-world-net.vercel.app) |
| **Render** | [two7-game-world-net.onrender.com](https://two7-game-world-net.onrender.com) |

---

## 🌟 Theme: Cyberpunk Data Terminal

Immerse yourself in a high-tech digital world:
- **Scanline overlay** with subtle flicker effect
- **Cyber border** effects with glowing gradients
- **Cyan color scheme** for that terminal feel
- **Typing animation** on the title
- **Glitch effects** on hover for added character
- **Data-stream background** animation

## ✨ Features (V5)

### Core Experience
- **Real-time global data** from REST Countries API
- **Smart search** - Filter countries by name instantly
- **Region filtering** - Browse by continent/region with dedicated buttons
- **Result counter** - Shows filtered/total entity count
- **Keyboard navigation** - Arrow keys, Enter to select, Escape to clear
- **Responsive layout** - Works on all screen sizes
- **Accessibility** - Full ARIA labels, focus indicators, reduced motion support

### Visual Effects
- Glitch effect on hover (interactive elements)
- Subtle scanline flicker for authenticity
- Typing cursor animation in header
- Organic transition timing (not perfectly smooth)
- Data-stream background animation
- Cyber border with gradient glow on hover

### Data Display
- Country flag with cyber border styling
- Population, area calculations
- Region and capital tags
- Entity ID display
- Geopolitical assessment section

## 🛠️ Tech Stack

| Component | Technology |
|-----------|------------|
| Framework | React 19 |
| Build Tool | Vite 6 |
| Styling | Tailwind CSS v4 |
| Language | TypeScript |
| Animations | Framer Motion |
| Icons | Lucide React |
| Data | REST Countries API |
| HTTP Client | Axios |

## 🚀 Usage

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
27-game-world-net/
├── src/
│   ├── App.tsx          # Main application component
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles + Tailwind
├── index.html           # HTML template
├── vite.config.ts       # Vite configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Dependencies
```

## 🎯 How to Use

1. **Browse** - View all countries in the sidebar list
2. **Search** - Type to filter countries by name
3. **Filter** - Click region buttons to filter by continent
4. **Select** - Click a country (or use arrow keys + Enter)
5. **Navigate** - Use Escape to return to list view

## 🎨 V5 Design Philosophy

### Intentional Imperfections
V5 introduces "human" touches that break from sterile perfection:
- **Scanline flicker** - Subtle random opacity variation for authenticity
- **Glitch effects** - Brief offset on hover adds character
- **Organic timing** - Transitions aren't perfectly smooth
- **Typing animation** - Slightly randomized typing speed

These choices make the interface feel handcrafted rather than AI-generated.

## 📝 What Changed in V5

### V2 - Audit & Cleanup
- Fixed build configuration (tsconfig.json, vite.config.ts)
- Created proper Tailwind setup with index.css
- Removed unused imports
- Now builds successfully with TypeScript

### V3 - Region Filter
- Added dynamic region filter buttons
- Filter logic now supports both search AND region
- Result counter shows filtered/total entities
- Current region indicator in header
- Increased results from 10 to 20 per page

### V4 - UX & Humanization
- Added glitch effect on hover for interactive elements
- Added typing cursor animation with randomized timing
- Added subtle scanline flicker for authenticity
- Added organic data-stream background animation
- Slightly uneven transition timing

### V5 - Accessibility & Polish
- Added keyboard navigation (arrows, Enter, Escape)
- Added visible focus indicators
- Added skip link for keyboard users
- Added ARIA labels for screen readers
- Added prefers-reduced-motion support
- Added high contrast mode support
- Visual highlight for keyboard navigation

## 🚫 What I Chose NOT to Build

**Data Comparison Feature**: Considered adding a side-by-side comparison view for two countries. Rejected because it would require significant UI rework and the current single-view approach is more focused. Users can view countries one at a time, which aligns with the "terminal" metaphor better.

**Data Export**: No CSV or JSON export functionality. The terminal is designed for viewing, not data processing. If users need to export data, they can use the API directly. Adding export would shift this from a "viewer" to a "tool," which is a different product category.

**Offline Mode**: The application requires an API connection. Adding offline caching with service workers would complicate the build without significant benefit for a data viewer.

## 🏆 Credits

**Made by MK — Musharraf Kazi**

---

## 📜 License

MIT License - feel free to use this for your own projects!

---

*The Matrix has you...* 🟢
