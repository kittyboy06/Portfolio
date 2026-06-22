Build a complete personal developer portfolio website from scratch for 
Afsal Ahmed Khan A (GitHub: kittyboy06).

Stack: React + Vite + Tailwind CSS + Framer Motion
Deploy: GitHub Pages
Data layer: public/data.json (all content loaded via fetch)

═══════════════════════════════════════════
🎨 AESTHETIC
═══════════════════════════════════════════

Theme: Solo Leveling dark RPG. NOT a generic blue/white dev portfolio.

Colors:
  Background:  #0a0a0f
  Primary:     #4f46e5  (indigo)
  Secondary:   #7c3aed  (purple)
  Accent:      #06b6d4  (cyan)
  Text:        #e2e8f0
  Muted:       #64748b
  Card bg:     #0f0f1a
  Border:      #1e1e3a

Typography:
  Headings → "Orbitron" (Google Fonts)
  Body     → "Inter" (Google Fonts)

Visual style:
  - Dark glass morphism cards (bg + blur + border)
  - Glowing indigo/cyan border on card hover
  - Animated dot-grid or particle background in Hero (CSS only, no canvas libs)
  - Framer Motion: fade + slide-up on all section entrances, staggered
  - Status badges: cyan glow = Completed, amber = In Development
  - Subtle purple gradient on section headings


═══════════════════════════════════════════
📁 FILE STRUCTURE
═══════════════════════════════════════════

/
├── public/
│   ├── data.json
│   └── resume.pdf        ← placeholder, user will replace
├── src/
│   ├── hooks/
│   │   └── usePortfolioData.js
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Skills.jsx
│   │   ├── Projects.jsx
│   │   ├── Experience.jsx
│   │   ├── Contact.jsx
│   │   └── Footer.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   └── Admin.jsx
│   ├── App.jsx
│   └── main.jsx
├── deploy.sh
└── vite.config.js


═══════════════════════════════════════════
📄 public/data.json
═══════════════════════════════════════════

{
  "hero": {
    "name": "Afsal Ahmed Khan A",
    "tagline": "I build apps, games & experiences.",
    "roles": [
      "Android Developer",
      "Web Developer",
      "Unity Game Dev",
      "AI Enthusiast"
    ],
    "github": "https://github.com/kittyboy06",
    "linkedin": "https://linkedin.com/in/YOUR_LINKEDIN",
    "leetcode": "https://leetcode.com/kittyboy06",
    "email": "YOUR_EMAIL_HERE",
    "resumeUrl": "/resume.pdf"
  },

  "about": {
    "bio": "5 shipped projects · 1st place Cipher Quest · AMD Slingshot hackathon · CGPA 7.9 · 49 LeetCode problems solved. 18-year-old CS student at Jerusalem College of Engineering, Chennai — building Android apps, web experiences, and Unity games.",
    "stats": [
      { "label": "Projects Shipped", "value": "5",     "icon": "rocket" },
      { "label": "LeetCode Solved",  "value": "49",    "icon": "zap" },
      { "label": "CGPA",             "value": "7.9",   "icon": "target" },
      { "label": "Year",             "value": "2nd CSE","icon": "graduation-cap" }
    ],
    "leetcodeUrl": "https://leetcode.com/kittyboy06"
  },

  "skills": {
    "categories": [
      {
        "name": "Mobile",
        "items": ["Android", "Kotlin", "Jetpack Compose", "Supabase"]
      },
      {
        "name": "Web",
        "items": ["React", "Vite", "Tailwind CSS", "Framer Motion", "HTML", "CSS", "JavaScript"]
      },
      {
        "name": "Game Dev",
        "items": ["Unity 6", "C#", "URP", "Cel Shading"]
      },
      {
        "name": "AI & Backend",
        "items": ["Gemini API", "Ollama", "Supabase", "Python", "Google Cloud Run"]
      },
      {
        "name": "Languages",
        "items": ["Kotlin", "Python", "C++", "JavaScript", "C#"]
      },
      {
        "name": "Tools",
        "items": ["Git", "GitHub", "Android Studio", "VS Code", "Figma"]
      }
    ]
  },

  "projects": [
    {
      "id": "arise-irl",
      "title": "ARISE IRL",
      "description": "Solo Leveling-themed calisthenics RPG Android app. Full gamification with XP, levels, quests, Supabase backend, and Gemini AI coaching.",
      "tags": ["Android", "Kotlin", "Supabase", "Gemini AI", "Jetpack Compose"],
      "status": "In Development",
      "github": "",
      "demo": ""
    },
    {
      "id": "neurocart",
      "title": "NeuroCart",
      "description": "AI-powered adaptive shopping assistant built for AMD Slingshot Campus Days Chennai Hackathon. React + Vite + Supabase, deployed on Google Cloud Run.",
      "tags": ["React", "Supabase", "AI", "Google Cloud Run", "Hackathon"],
      "status": "Completed",
      "github": "",
      "demo": ""
    },
    {
      "id": "magic-embroidery",
      "title": "Magic Embroidery",
      "description": "Production ecommerce site for a Chennai embroidery business. Full product catalog, cart, order flow, and admin panel.",
      "tags": ["React", "Vite", "Supabase", "Tailwind CSS", "Ecommerce"],
      "status": "In Development",
      "github": "",
      "demo": ""
    },
    {
      "id": "aash-player",
      "title": "Aash Player",
      "description": "Offline Android music player in Kotlin + Jetpack Compose. Pro equalizer, Mini Capsule overlay, Dynamic Light for Vivo, and lock screen controls.",
      "tags": ["Android", "Kotlin", "Jetpack Compose", "Music"],
      "status": "In Development",
      "github": "",
      "demo": ""
    },
    {
      "id": "brainos",
      "title": "BrainOS",
      "description": "Local Python AI app connecting Ollama LLM to an Obsidian vault via REST API. Tabs for chat, vault assistant, journal, search, and dashboard.",
      "tags": ["Python", "Ollama", "Obsidian", "AI", "Local LLM"],
      "status": "Completed",
      "github": "",
      "demo": ""
    },
    {
      "id": "quantum-pulse",
      "title": "Quantum Pulse",
      "description": "Rhythm-based mobile game in Unity 6 with a custom beat-map system, dynamic visual effects, and mobile-optimized input.",
      "tags": ["Unity 6", "C#", "Game Dev", "Mobile", "Rhythm"],
      "status": "In Development",
      "github": "",
      "demo": ""
    }
  ],

  "experience": [
    {
      "title": "1st Place — Cipher Quest",
      "org": "Jerusalem College of Engineering",
      "date": "2025",
      "description": "Won the college-level competitive programming event."
    },
    {
      "title": "Hackathon Participant",
      "org": "AMD Slingshot Campus Days Chennai",
      "date": "April 2025",
      "description": "Built NeuroCart, an AI-powered adaptive shopping assistant, in 24 hours. Deployed on Google Cloud Run."
    }
  ],

  "contact": {
    "email": "YOUR_EMAIL_HERE",
    "github": "https://github.com/kittyboy06",
    "linkedin": "https://linkedin.com/in/YOUR_LINKEDIN",
    "leetcode": "https://leetcode.com/kittyboy06"
  },

  "footer": {
    "year": "2026",
    "name": "Afsal Ahmed Khan A",
    "github": "https://github.com/kittyboy06",
    "linkedin": "https://linkedin.com/in/YOUR_LINKEDIN"
  }
}


═══════════════════════════════════════════
🖥️ SECTIONS
═══════════════════════════════════════════

──────────────────────────────
NAVBAR
──────────────────────────────
- Fixed top, blur backdrop (backdrop-blur-md)
- Left: "Afsal Ahmed" logo in Orbitron font, glowing cyan
- Center: About · Work · Contact (smooth scroll)
- Right:
    GitHub icon → hero.github
    LinkedIn icon → hero.linkedin
    LeetCode icon → hero.leetcode
    "Resume" pill button (glowing border) → opens hero.resumeUrl in new tab
- Mobile: hamburger menu, all links + icons inside drawer

──────────────────────────────
HERO
──────────────────────────────
- Full viewport height
- Animated dot-grid background (CSS, no libraries)
- Initials avatar: styled circle "Afsal Ahmed", gradient fill (#4f46e5 → #06b6d4)
  DO NOT use DiceBear or any external avatar service
- Name: "Afsal Ahmed Khan A" in large Orbitron, white + subtle glow
- Typewriter animation cycling through roles[] array
- Tagline below in muted text
- Two CTA buttons:
    "View My Work"     → smooth scroll to Projects section
    "Download Resume"  → downloads hero.resumeUrl
- Framer Motion: staggered entrance (avatar → name → roles → buttons)

──────────────────────────────
ABOUT
──────────────────────────────
- Bio paragraph pulled from about.bio
  Must start with proof line:
  "5 shipped projects · 1st place Cipher Quest · AMD Slingshot · CGPA 7.9 · 49 LeetCode problems"
- 4 stat cards below (icon + value + label)
  "49 LeetCode Solved" stat links to about.leetcodeUrl
- Framer Motion: slide-up on scroll into view

──────────────────────────────
SKILLS
──────────────────────────────
- Tab switcher: one tab per category name
- Active tab: glowing indigo underline
- Skills render as pill tags inside the active tab panel
- Staggered entrance when tab changes
- MUST include: Supabase, Kotlin, Jetpack Compose, Tailwind CSS, Framer Motion
- MUST NOT include: Next.js

──────────────────────────────
PROJECTS (section id="work")
──────────────────────────────
- Section heading: "Selected Work"
- ALL 6 project cards rendered from projects array
- Card layout:
    Top: title (Orbitron) + status badge (right aligned)
      Completed    → cyan badge with glow
      In Development → amber badge
    Middle: description text
    Bottom: tag pills + GitHub icon + Demo icon
      Hide GitHub/Demo icons if URL is empty string
- Grid: 3 cols desktop / 2 cols tablet / 1 col mobile
- Hover effect: card lifts (translateY -4px) + glowing border

──────────────────────────────
EXPERIENCE
──────────────────────────────
- Section heading: "Experience"
- Vertical timeline layout
- Left side: date + org
- Right side: title + description card
- Render all entries from experience array

──────────────────────────────
CONTACT (section id="contact")
──────────────────────────────
- Section heading: "Let's Talk"
- Subheading: "Reach me anywhere"
- 4 large clickable link cards, each with icon + label + value:
    Email    → mailto:contact.email
    GitHub   → contact.github
    LinkedIn → contact.linkedin
    LeetCode → contact.leetcode
- All 4 must render. No empty section.
- Hover: glow border + slight lift

──────────────────────────────
FOOTER
──────────────────────────────
- "© 2026 Afsal Ahmed Khan A"  ← MUST be 2026, not 2025
- GitHub link + LinkedIn link (icons)
- "Built with React + Vite" small muted text

──────────────────────────────
/admin ROUTE
──────────────────────────────
- Path: /admin (not linked anywhere on main site)
- Password gate: "admin123" (hardcoded, no backend)
- Shows full data.json content in a styled textarea
- "Copy JSON" button
- Message: "Edit above, then paste into public/data.json and run deploy.sh to update"


═══════════════════════════════════════════
⚙️ TECHNICAL REQUIREMENTS
═══════════════════════════════════════════

- React 18 + Vite
- Tailwind CSS v3 (no v4)
- Framer Motion — all section entrances use whileInView + viewport once
- React Router v6 — routes: "/" and "/admin"
- usePortfolioData() hook:
    fetch('/data.json') on mount
    returns { data, loading, error }
    all components consume this hook, never hardcode content
- vite.config.js:
    base: '/portfolio/'   ← change to actual repo name
- deploy.sh:
    npm run build
    npx gh-pages -d dist


═══════════════════════════════════════════
✅ ACCEPTANCE CRITERIA
═══════════════════════════════════════════

□ Navbar has GitHub + LinkedIn + LeetCode icons AND Resume button
□ Hero avatar is  “Afsal Ahmed” — no DiceBear, no external service
□ About bio starts with proof line, has 4 labeled stat cards
□ Skills tab includes Supabase, Kotlin, Jetpack Compose, Tailwind, Framer Motion
□ Skills tab does NOT include Next.js
□ All 6 project cards render in Selected Work section
□ Project cards show status badge, hide empty GitHub/Demo links
□ Contact section has all 4 links: email, GitHub, LinkedIn, LeetCode
□ Footer says © 2026 with GitHub + LinkedIn links
□ /admin route works with password "admin123"
□ Everything reads from data.json via usePortfolioData() hook
□ Site deploys to GitHub Pages on first run of deploy.sh