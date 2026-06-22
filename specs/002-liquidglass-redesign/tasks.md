# Tasks: Liquid Glass Portfolio Redesign

**Input**: Design documents from `/specs/002-liquidglass-redesign/`

---

## Phase 1: Style Tokens & Core CSS

- [ ] T001 Update `tailwind.config.js` with new dark mode glass theme tokens (colors, font-families)
- [ ] T002 Update `src/index.css` with `.liquid-glass`, Specular highlights, and background glow classes

---

## Phase 2: Navigation & Home Layout

- [ ] T003 Redesign `src/components/Navbar.jsx` with translucent liquid glass styles and a glassy Resume button
- [ ] T004 Update `src/pages/Home.jsx` styles to support dark mode void backgrounds and background glow blobs
- [ ] T005 Refactor `src/pages/Admin.jsx` to render a dark mode void dashboard with a glass textarea

---

## Phase 3: Hero Section (Priority: P1)

- [ ] T006 Redesign `src/components/Hero.jsx` left column text content using Geist fonts and typewriter roles
- [ ] T007 Build right column abstract graphic in `src/components/Hero.jsx` with glossy concentric circular glass-rings SVG
- [ ] T008 Add floating radial gradient glows (`.bg-glow-indigo`, `.bg-glow-cyan`) in `src/components/Hero.jsx` background

---

## Phase 4: About & Skills Sections (Priority: P2)

- [ ] T009 Redesign `src/components/About.jsx` photo card with a `.liquid-glass` frame and sliding gloss hover effect
- [ ] T010 Redesign `src/components/About.jsx` stats cards as a single-row grid of glass containers
- [ ] T011 Redesign `src/components/Skills.jsx` tag grid grouped by categories using thin border glass pills

---

## Phase 5: Projects Bento Grid (Priority: P3)

- [ ] T012 Redesign `src/components/Projects.jsx` layout into an asymmetric Bento Grid
- [ ] T013 Implement featured card (NeuroCart) in `src/components/Projects.jsx` spanning 2 columns, with `neurocart_mockup.png` inside a glass display frame
- [ ] T014 Customize status badges with neon outlining (`isCompleted ? 'border-emerald-500/50 text-emerald-400' : 'border-amber-500/50 text-amber-400'`)

---

## Phase 6: Experience & Contact & Footer (Priority: P4)

- [ ] T015 Redesign `src/components/Experience.jsx` as a horizontal scrolling timeline snap-x grid with glass year nodes
- [ ] T016 Redesign `src/components/Contact.jsx` centered let's build card layout with a grid of 4 glass link cards
- [ ] T017 Redesign `src/components/Footer.jsx` as a dark mode single-line block

---

## Phase 7: Verification

- [ ] T018 Run `npm run build` to verify compilation succeeds
- [ ] T019 Manually audit WCAG AA text contrast ratio on glass card overlays
