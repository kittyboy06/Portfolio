---
type: context
created: 2026-06-19
status: accepted
tags: [project-overview, roadmap]
---

# Project Overview — Liquid Glass Portfolio

This project is a React + Vite + Tailwind CSS developer portfolio built for **Afsal Ahmed Khan A**.

## Architecture & Tech Stack
*   **Frontend Library**: React (v18.3)
*   **Build Tool**: Vite
*   **Styling**: Tailwind CSS
*   **Animation**: Framer Motion
*   **Icons**: Lucide React

## Local Knowledge Vault Links
*   None.

## Recent Changes (June 22, 2026)
*   **Workspace Codebase Cleanup**: Removed obsolete `backup_josh_design/` folder, empty `src/hooks/` folder, unused `public/data.json` database, and `deploy.bat` batch script.
*   **Dependency Pruning**: Removed unused `tabler-icons-react` from `package.json` and updated package lockfile. Verified successful production build compilation.
*   **Deployment Script Fix**: Fixed `deploy.sh` script failures by clearing the local `gh-pages` cache (`node_modules/.cache/gh-pages`) before publishing. This resolves duplicate branch name conflicts (`fatal: a branch named 'gh-pages' already exists`) and corrupted branch ref failures.

## Recent Changes (June 19, 2026)
*   **Portfolio Content Overhaul**: Updated hero tagline and roles (narrowed to Android Dev, Full Stack Dev, AI Dev), rewrote about bio, renamed `experience`→`timeline` with 3 new entries (PALS, AMD, RYLA).
*   **New Achievements Section**: Added `Achievements.jsx` component with trophy-themed cards for 5 awards/competitions, placed between About and Skills.
*   **New Certifications Section**: Added `Certifications.jsx` component with emerald-themed badge cards for 5 certifications, placed between Experience and Contact.
*   **Experience Icon Logic Upgrade**: Broadened icon mapping from Cipher Quest-only to keyword-based (Trophy, GraduationCap, Award, Briefcase).
*   **Converted Deployment Script**: Converted the Windows batch deployment script `deploy.bat` to a Linux-compatible Bash script `deploy.sh` with a terminal-aware `pause` fallback.
*   **Restored Backup**: Restored the original design from the `backup_josh_design` snapshot, rolling back the Liquid Glass redesign.
*   **Compacted Mobile Layout**: Adjusted grid gaps, element paddings, button sizes, and font sizes across all sections to make the presentation compact on mobile.
*   **Responsive Active Quests**: Laptop/desktop view shows all projects at once in a Bento Grid. Mobile view renders projects in 3-item columns per snapping horizontal slide.
*   **Responsive Experience Timeline**: Laptop/desktop view shows standard timeline cards scrolling horizontally. Mobile view renders cards scaled to occupy the maximum screen space.
*   **Responsive Dungeon Exit (Contact)**: Laptop/desktop view shows all 4 cards side-by-side. Mobile view renders a compact 2x2 grid.

## Open Issues
*   None.

## Next Development Phase
*   [ ] Deploy production build or await new feature requests from the user.
