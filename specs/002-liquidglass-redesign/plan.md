# Implementation Plan: Liquid Glass Portfolio Redesign

**Branch**: `002-liquidglass-redesign` | **Date**: 2026-06-19 | **Spec**: [specs/002-liquidglass-redesign/spec.md](file:///home/kittyboy06/Projects/Portfolio/specs/002-liquidglass-redesign/spec.md)

---

## Summary
Evolve the portfolio UI from the flat cream aesthetic to an ultra-premium **Dark Mode Void "Liquid Glass"** theme. We will implement high-translucency glass cards (`backdrop-filter: blur(24px)`), sharp glossy borders with specular highlights, and moving radial background glows using Geist typography. The data remains compile-time direct imports from `src/data/portfolio.json`.

---

## Technical Context

* **Language/Version**: React 18 / ES6
* **Primary Dependencies**: Vite, Tailwind CSS v3, Framer Motion (`framer-motion`), Lucide Icons (`lucide-react`)
* **Storage**: Direct compile-time JSON import (`src/data/portfolio.json`)
* **Testing**: Manual verification + Vite build validation
* **Target Platform**: GitHub Pages (static client-side SPA)
* **Project Type**: Web Application
* **Performance Goals**: 60fps animations, instant loading, hardware-accelerated transforms
* **Constraints**: WCAG AA contrast (≥ 4.5:1), low GPU overhead on mobile

---

## Constitution Check
* **Simplicity Gate (Article VII):** Passes. Standard Vite/React project with minimal files.
* **Anti-Abstraction Gate (Article VIII):** Passes. Framework features and native Tailwind utilities are used directly.
* **TDD Gate (Article III):** Not requested by user; manual verification and build checks.

---

## Project Structure

### Documentation
```text
specs/002-liquidglass-redesign/
├── spec.md              # Feature specification
├── plan.md              # This file (Implementation Plan)
└── tasks.md             # Task list derived from this plan
```

### Source Code
```text
src/
├── data/
│   └── portfolio.json    # Portfolio data
├── components/
│   ├── Navbar.jsx        # Navigation header
│   ├── Hero.jsx          # Landing split view
│   ├── About.jsx         # Profile description
│   ├── Skills.jsx        # Category grid clouds
│   ├── Projects.jsx      # Bento grid projects
│   ├── Experience.jsx    # Horizontal timeline
│   ├── Contact.jsx       # Direct contact cards
│   └── Footer.jsx        # Single-line footer
├── pages/
│   ├── Home.jsx          # Home sections mount
│   └── Admin.jsx         # Editor gateway
├── App.jsx               # Routes setup
└── main.jsx              # App entrypoint
```

---

## Proposed Technical Changes

### 1. Style Tokens & Global CSS

#### [MODIFY] [tailwind.config.js](file:///home/kittyboy06/Projects/Portfolio/tailwind.config.js)
Define dark mode glass tokens:
```javascript
      colors: {
        theme: {
          bg: "#030307",       // Deep Void Midnight Black
          card: "#090911",     // Dark Glass base color
          surface: "#10101c",  // Light glass highlight surface
          accent: "#4F46E5",   // Electric Indigo
          secondary: "#06B6D4",// Cyan / Blue Accent
          highlight: "#E85D3F",// Warm Coral highlights (retained from preference)
          text: "#F3F4F6",     // Soft White Text
          muted: "#9CA3AF",    // Muted Gray Text
          border: "rgba(255, 255, 255, 0.08)" // Translucent border
        }
      },
      fontFamily: {
        sans: ["Geist", "Inter", "sans-serif"],
        jakarta: ["Plus Jakarta Sans", "sans-serif"],
      }
```

#### [MODIFY] [index.css](file:///home/kittyboy06/Projects/Portfolio/src/index.css)
Update index stylesheet for glass design:
* Set body to `#030307` background and soft white text.
* Replace offset shadows with **Liquid Glass** classes:
  * `.liquid-glass`:
    ```css
    background: rgba(9, 9, 17, 0.6);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 
      inset 0 1px 1px 0 rgba(255, 255, 255, 0.15),
      0 8px 32px 0 rgba(0, 0, 0, 0.37);
    ```
  * `.glass-shine`: A glossy, sliding sheen effect on hover using gradients.
  * `.bg-glow-indigo`, `.bg-glow-cyan`: Large radial glowing blur blobs in the background.

---

### 2. Components Redesign

* **`Navbar.jsx`**: Translucent liquid glass header, glowing active indicators.
* **`Hero.jsx`**: Left column text in Geist, typewriter. Right column: glossy concentric circular glass-rings SVG. Background: morphing radial blobs.
* **`About.jsx`**: Glass profile image frame with a sliding glossy hover reflection. Single-row grid of glass stat cards below.
* **`Skills.jsx`**: Category-grouped tag clouds in glass containers. Pills have a thin glass border and glow Electric Indigo on hover.
* **`Projects.jsx`**: Bento grid layout. Featured card (NeuroCart) spans 2 columns, displays the `neurocart_mockup.png` inside a glossy glass display case. Status badges: glowing neon outlines.
* **`Experience.jsx`**: Horizontal scrolling timeline. Nodes are glossy glass circular nodes with neon glowing indicators. Cards snap horizontally.
* **`Contact.jsx`**: Grid of 4 glass cards with ArrowUpRight link indicator. High-tech glow highlights.
* **`Footer.jsx`**: Minimalist single-line footer in dark mode.
