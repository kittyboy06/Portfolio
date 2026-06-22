# Feature Specification: Liquid Glass Portfolio Redesign

**Feature Branch**: `002-liquidglass-redesign`

**Created**: 2026-06-19

**Status**: Draft

**Input**: User description: "help to create a new liquidglass portfolio design using ui-ux-pro-max-skill, taste-skill, and spec-kit"

---

## User Scenarios & Testing

### User Story 1 - Landing Page & Hero Section (Priority: P1) 🎯 MVP
The user lands on the website and is met with a high-fidelity dark-mode split screen. The left holds bold typography with a typing-roles animation, and the right holds an organic, animated liquid glass SVG diagram. Specular highlights and moving background auras draw the user in immediately.

**Why this priority**: It is the first point of contact and sets the entire visual tone of the liquid glass experience.

**Independent Test**: Can be verified by running the development server and viewing the viewport-capped Hero layout, checking that the roles cycle and the SVG graphic rotates.

**Acceptance Scenarios**:
1. **Given** a user navigates to the homepage, **When** it loads, **Then** they see the text "I build things people actually use." in Geist font, the typewriter roles, and a glossy, glowing SVG software structure rotating.
2. **Given** a mobile screen layout, **When** the page renders, **Then** the right-hand SVG panel collapses cleanly and the layout remains centered and readable.

---

### User Story 2 - Profile & Skill Tag Clouds (Priority: P2)
The user scrolls down to see the Character Profile. The photo card is styled as a thick, rounded piece of glass with a specular glare. The skills are shown as rounded, border-only tags that fill with Electric Indigo or Coral on hover, grouped under category labels.

**Why this priority**: Provides the core background and technical profile of the developer.

**Independent Test**: Verify that the profile photo renders inside a rounded glass frame and hovering over skills fills the background.

**Acceptance Scenarios**:
1. **Given** a user scrolls to the About section, **When** hovering over the profile card, **Then** a glassy highlight sheen translates across the card surface.
2. **Given** the Skills section, **When** hovering over a skill pill, **Then** the pill smoothly fills with the accent color.

---

### User Story 3 - Projects Bento Grid (Priority: P3)
The user views the "Active Quests" section, which displays projects in an asymmetric Bento Grid. The featured card (NeuroCart) displays the generated mockup image inside a glass frame. Each card lifts slightly and changes its glass border glow on hover.

**Why this priority**: Showcases the developer's shipped applications in a highly aesthetic, modern grid.

**Independent Test**: Check grid rendering, verifying that NeuroCart spans 2 columns on desktop and has a distinct mockup preview.

**Acceptance Scenarios**:
1. **Given** a desktop layout, **When** the Projects section loads, **Then** they see a grid where NeuroCart spans 2 columns and other projects span 1 column.
2. **Given** a project card, **When** hovering, **Then** the card lifts by `-4px` and the border changes to the accent glow.

---

### User Story 4 - Horizontal scrolling Timeline & Contact (Priority: P4)
The user scrolls to the player history and contact page. The timeline scrolls horizontally with snap points and large year node controls. The contact cards are thick glass blocks with clean outline icons and links to Email, GitHub, LinkedIn, and LeetCode.

**Why this priority**: Completes the portfolio details and provides contact exit gates.

**Independent Test**: Scroll horizontally through the timeline to check snap behavior and click scroll buttons.

**Acceptance Scenarios**:
1. **Given** the Experience timeline, **When** clicking the left/right arrow buttons, **Then** the container scrolls smoothly by the card width.
2. **Given** the Contact section, **When** clicking a card, **Then** it opens the corresponding mail/social link in a new tab.

---

### User Story 5 - Admin Configuration Portal (Priority: P5)
The administrator goes to `/admin` and decrypts the page with `admin123`. They see the database configuration JSON inside a clean, editable dark glass textarea. They can copy the JSON and edit it directly.

**Why this priority**: Allows editing and copying of the portfolio configuration data.

**Independent Test**: Navigate to `/admin`, type `admin123` to authenticate, edit the text inside the editor, and click "Copy JSON File" to check copy behavior.

**Acceptance Scenarios**:
1. **Given** an unauthenticated administrator on `/admin`, **When** they type `admin123` and submit, **Then** they are granted access to the editor.
2. **Given** the authenticated editor, **When** typing inside the textarea, **Then** the changes are updated in state and copied when the copy button is clicked.

---

## Edge Cases
* **GPU Performance on Mobile:** Multiple layers of `backdrop-filter: blur(24px)` can cause framerate drops on older mobile GPUs.
  * *Handling:* Use a fallback with simple solid transparent colors (`rgba(10,10,15,0.9)`) on mobile devices.
* **Text Contrast (a11y):** Text on translucent glass cards can become unreadable if background gradient blobs align behind it.
  * *Handling:* Give all glass card surfaces a solid dark backing (`bg-theme-card/70` or `bg-theme-card/85` under the blur layer) to lock contrast ratios.

---

## Requirements

### Functional Requirements
* **FR-001:** System MUST run as a React SPA with Vite and Tailwind CSS.
* **FR-002:** Layout elements MUST use a deep midnight dark base (`#030307`) with translucent glass card frames (`backdrop-filter: blur(24px)`).
* **FR-003:** Accent glows MUST use Electric Indigo (`#4F46E5`) and Cyan/Coral highlights.
* **FR-004:** Typography MUST use Geist Display for headers and Geist Sans for body.
* **FR-005:** Portfolio data MUST be directly imported at build-time.
* **FR-006:** Navigation MUST scroll smoothly to section anchor tags.

---

## Success Criteria

### Measurable Outcomes
* **SC-001:** Instant page load (0ms waiting for API) due to direct JSON compilation.
* **SC-002:** WCAG AA compliance (contrast ratio ≥ 4.5:1) for all body text on glass cards.
* **SC-003:** Responsive layouts that collapse cleanly at `< 768px` breakpoints.
