Redesign my React + Vite + Tailwind portfolio into a premium 
Liquid Glass design — Apple Vision Pro / iOS 26 aesthetic. 
Frosted glass surfaces, depth layers, ambient light 
reflections, scroll-driven parallax, and fluid motion. 
Professional enough for recruiters, stunning enough for 
Awwwards.

═══════════════════════════════════════════
LIQUID GLASS DESIGN SYSTEM
═══════════════════════════════════════════

CORE GLASS EFFECT (reusable CSS class: .glass)
backdrop-filter: blur(24px) saturate(180%)
background: rgba(255, 255, 255, 0.08)
border: 1px solid rgba(255, 255, 255, 0.18)
border-radius: 24px
box-shadow:
  0 8px 32px rgba(0, 0, 0, 0.25),
  inset 0 1px 0 rgba(255, 255, 255, 0.25),
  inset 0 -1px 0 rgba(0, 0, 0, 0.1)

GLASS VARIANTS
.glass-strong
  backdrop-filter: blur(40px) saturate(200%)
  background: rgba(255, 255, 255, 0.12)
  border: 1px solid rgba(255, 255, 255, 0.25)

.glass-subtle
  backdrop-filter: blur(12px) saturate(150%)
  background: rgba(255, 255, 255, 0.05)
  border: 1px solid rgba(255, 255, 255, 0.10)

.glass-dark
  backdrop-filter: blur(24px) saturate(180%)
  background: rgba(0, 0, 0, 0.25)
  border: 1px solid rgba(255, 255, 255, 0.12)

LIGHT REFRACTION EFFECT (on hover)
Add a pseudo-element shimmer that sweeps across glass 
surfaces on hover:
.glass::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    105deg,
    transparent 40%,
    rgba(255,255,255,0.08) 50%,
    transparent 60%
  );
  transform: translateX(-100%);
  transition: transform 0.6s ease;
  border-radius: inherit;
}
.glass:hover::before { transform: translateX(100%); }

═══════════════════════════════════════════
COLOR & ATMOSPHERE
═══════════════════════════════════════════

Background: deep layered mesh gradient
  Layer 1 (base): #0A0A0F (near black)
  Layer 2 (ambient orbs): 
    - Indigo orb: radial-gradient circle 600px at 20% 30%, 
      #4F46E520 → transparent
    - Violet orb: radial-gradient circle 500px at 80% 60%, 
      #7C3AED18 → transparent  
    - Cyan orb: radial-gradient circle 400px at 60% 10%, 
      #06B6D415 → transparent
    - Rose orb: radial-gradient circle 350px at 10% 80%, 
      #F43F5E12 → transparent
  These orbs drift slowly via CSS @keyframes (20–30s loops)
  They also parallax on scroll — faster orbs = closer depth

Accent colors:
  Primary: #6366F1 (indigo)
  Secondary: #8B5CF6 (violet)  
  Highlight: #06B6D4 (cyan)
  Text primary: rgba(255, 255, 255, 0.92)
  Text secondary: rgba(255, 255, 255, 0.55)
  Text muted: rgba(255, 255, 255, 0.30)

Typography:
  Headings: "SF Pro Display" with fallback to 
    -apple-system, "Plus Jakarta Sans" (Google Fonts)
  Body: "SF Pro Text" with fallback to 
    -apple-system, "Inter" (Google Fonts)
  Display size: clamp(56px, 9vw, 96px)
  Weight: 700 headings, 400 body
  Letter spacing display: -0.04em
  All text renders on glass or dark — always light colored

═══════════════════════════════════════════
SCROLL & PARALLAX SYSTEM
═══════════════════════════════════════════

Custom hook: useParallax(speed)
  Uses Framer Motion useScroll() + useTransform()
  Returns motionValue for y transform

Depth layers (parallax speeds):
  Layer 0 — background orbs: 0.08 (barely moves)
  Layer 1 — large glass panels: 0.12
  Layer 2 — content inside panels: 0.20
  Layer 3 — floating accent elements: 0.35
  Layer 4 — small decorative chips: 0.50

Scroll entrance animations (all sections):
  Initial: opacity 0, y: 50, scale: 0.97
  Animate: opacity 1, y: 0, scale: 1
  Transition: spring, stiffness 80, damping 20
  Use whileInView + viewport once: true, margin: "-100px"

Stagger children: 0.08s delay between siblings

═══════════════════════════════════════════
NAVBAR
═══════════════════════════════════════════

Floating pill navbar — not full width
  Position: fixed top, centered horizontally
  Width: fit-content, max 600px
  Margin top: 20px
  Padding: 12px 24px
  Class: .glass-strong
  Border-radius: 999px (full pill)

  Left: "AA" monogram in indigo
  Center: About · Work · Experience · Contact
    (each link: text-white/60, hover text-white, 
     active has indigo underline dot below)
  Right: Resume button 
    (glass-dark pill, indigo border, "Resume ↗")

  On scroll past 100px: increase backdrop-filter blur 
  from 24px to 40px (smooth transition)

  Nav links: smooth scroll to section IDs

═══════════════════════════════════════════
SECTION 1 — HERO
═══════════════════════════════════════════

Full viewport height, centered layout

Background layers (all parallax, different speeds):
  - Ambient color orbs (speed 0.05)
  - Large frosted glass circle 600px, 
    position absolute top-right, opacity 0.4 (speed 0.12)
  - Medium glass circle 300px, 
    bottom-left, opacity 0.3 (speed 0.20)
  - Floating tech pill chips scattered: 
    "React" "Kotlin" "Unity" "Python" "Supabase"
    Each is a small .glass pill, rotated slightly,
    different parallax speeds (0.25–0.45)
    CSS float animation (y oscillation, 4–8s loops)

Center content:
  - Status pill: "Open to SDE Internships"
    (.glass pill, indigo left border, pulsing green dot)
    Animate in: scale 0.8 → 1, fade
    
  - Name: "Afsal Ahmed Khan"
    Display size, white, -0.04em tracking
    Each word animates in: y: 80 → 0, opacity stagger
    
  - Role typewriter: "CLASS: Android Developer|"
    Indigo colored, monospace feel
    Cycle: Android Developer → Full Stack Dev → 
           Unity Game Dev → AI Builder
    
  - Tagline: "I build things people actually use."
    text-white/70, medium weight
    
  - Photo: 180px circle
    Border: 2px solid rgba(255,255,255,0.3)
    Box-shadow: 0 0 40px rgba(99,102,241,0.4)
    Parallax speed: 0.08
    
  - CTAs row:
    Primary: "Enter Dungeon →" 
      (filled indigo, glass-strong, pill shape)
    Secondary: "Download Scroll"
      (.glass pill, white border)
    Both have hover: scale 1.03, shimmer sweep
    
  - Social row: GitHub · LinkedIn · LeetCode · Email
    Small glass pills in a row, icon + label

  Scroll hint: "scroll" text + animated line extending 
  downward, pulses, fades out after 3s

═══════════════════════════════════════════
SECTION 2 — CHARACTER PROFILE (About)
═══════════════════════════════════════════

Two-column layout, gap 60px

Left column — Photo card:
  Large .glass-strong card, 360px wide
  Photo fills top 65% of card
  Bottom 35%: stat grid 2x2
    5 Projects · 49 LeetCode · 7.9 CGPA · 2nd CSE
  Each stat: large number (count-up on enter), 
  small muted label
  Card has indigo glow on left edge:
    box-shadow: -4px 0 24px rgba(99,102,241,0.3)
  Parallax: entire card speed 0.10

Right column — Bio:
  Section label pill: "PLAYER STATUS" 
    (.glass-subtle pill, muted text)
  Section heading: "Character Profile"
    (large, white, animates in from right x:60→0)
  Bio paragraph:
    "5 shipped projects · 1st place Cipher Quest · 
     AMD Slingshot hackathon · CGPA 7.9 · 
     49 LeetCode problems solved. 18-year-old CS 
     student at Jerusalem College of Engineering, 
     Chennai — building Android apps, web 
     experiences, and Unity games."
  
  Skill highlights row (3 glass pills):
    "Android Dev" · "Full Stack" · "Game Dev"
    Each pill: .glass, indigo border on hover
    
  Parallax: text content speed 0.15 
  (slightly faster than photo = depth between columns)

═══════════════════════════════════════════
SECTION 3 — SKILL ATTRIBUTES
═══════════════════════════════════════════

HORIZONTAL SCROLL implementation:
  useRef on outer container
  useScroll({ target: ref, offset: ["start start", 
    "end start"] })
  Map scrollYProgress → x: "0%" → "-55%"
  Outer: position sticky, height: 100vh
  Inner track: display flex, width: fit-content, 
    gap: 32px, padding: 0 10vw

Each category column is a .glass-strong card:
  Width: 280px, padding: 32px
  Border-radius: 28px
  
  Category label: small muted pill at top
  Skill pills below: 
    .glass-subtle, border rgba(255,255,255,0.15)
    hover: background rgba(99,102,241,0.2), 
           border rgba(99,102,241,0.5)
  
  Column entrance: stagger y:30→0 as it scrolls 
  horizontally into viewport

Categories + skills:
  MOBILE: Android · Kotlin · Jetpack Compose · 
    Media3 · ExoPlayer · Room · WorkManager
  WEB: React · Vite · Tailwind CSS · 
    Framer Motion · HTML5 · CSS3 · JavaScript
  GAME DEV: Unity 6 · C# · URP · 
    Cel Shading · Minimax · 2D/3D Physics
  AI & BACKEND: Gemini API · Ollama · Supabase · 
    Python · Google Cloud Run · REST API · 
    Node.js · PostgreSQL · JWT · Redis
  LANGUAGES: Kotlin · Python · C# · 
    JavaScript · C++ · Java
  TOOLS: Git · GitHub · Figma · VS Code · 
    Android Studio · Antigravity

═══════════════════════════════════════════
SECTION 4 — SELECTED WORK (Projects)
═══════════════════════════════════════════

Bento glass grid:

ROW 1:
  NeuroCart — large featured card (col-span 2)
  ARISE IRL — tall card (col-span 1, row-span 2)

ROW 2:
  Magic Embroidery — card
  Aash Player — card

ROW 3: 
  BrainOS — card (col-span 1)
  Quantum Pulse — card (col-span 2)

All cards use .glass base
Featured card (NeuroCart) uses .glass-strong
  + extra indigo ambient glow:
  box-shadow: 0 0 60px rgba(99,102,241,0.15)

Each card structure:
  Top: category icon (Tabler outline, 24px, muted)
       + status badge top-right
         "Completed": rgba(16,185,129,0.15) bg, 
                      cyan text, glass border
         "In Development": rgba(245,158,11,0.15) bg,
                           amber text, glass border
  
  Middle: Project title (white, 20px, 700)
          Description (white/60, 14px, 2 lines max)
          
  Bottom: tech tag pills (glass-subtle, small)
          Source link + Demo link (if available)
          Arrow icon on hover slides right

Card hover state:
  transform: translateY(-6px) scale(1.01)
  box-shadow increases
  shimmer sweep on ::before

Scroll reveal: each card staggered 
  scale 0.94→1 + opacity 0→1

Project data:
  ARISE IRL: In Development · Android · Kotlin · 
    Supabase · Gemini AI · Jetpack Compose
    "Solo Leveling-themed calisthenics RPG. 
     Full gamification with XP, levels, quests, 
     and Gemini AI coaching."
    
  NeuroCart: Completed · React · Vite · 
    Supabase · Google Cloud Run · AI · Hackathon
    "AI-powered adaptive shopping assistant built 
     at AMD Slingshot Hackathon. Zero login, 
     real-time personalization. Deployed to 
     Google Cloud Run."
    Source + Demo links
    
  Magic Embroidery: In Development · React · 
    Vite · Tailwind CSS · Supabase · Ecommerce
    "Production ecommerce site for a Chennai 
     embroidery business. Full catalog, cart, 
     order flow, and admin panel."
    
  Aash Player: In Development · Android · 
    Kotlin · Jetpack Compose · Music
    "Offline Android music player. Pro equalizer, 
     Mini Capsule overlay, Dynamic Light for 
     Vivo, lock screen controls."
    
  BrainOS: Completed · Python · Ollama · 
    Obsidian · AI · Local LLM
    "Local Python AI app connecting Ollama LLM 
     to an Obsidian vault via REST API."
    
  Quantum Pulse: In Development · Unity 6 · 
    C# · Game Dev · Mobile · Rhythm
    "Rhythm-based mobile game in Unity 6 with 
     custom beat-map system and dynamic 
     visual effects."

═══════════════════════════════════════════
SECTION 5 — EXPERIENCE / ACHIEVEMENTS
═══════════════════════════════════════════

SVG timeline line that draws itself on scroll:
  useScroll on section ref
  SVG path: vertical line center of section
  strokeDasharray = pathLength
  strokeDashoffset: pathLength → 0 
    (mapped from scrollYProgress)
  Stroke: rgba(99,102,241,0.6), width 2px

Each entry (alternating left/right):
  Center: glass circle node, 16px
    Inner dot: indigo filled
    Pulse ring: rgba(99,102,241,0.3), 
      scale 1→1.8, opacity 1→0, 2s loop
  
  Date side: large muted year 
    (80px, white/15, parallax speed 0.06)
  
  Card side: .glass-strong card
    Top: colored pill (role/type)
    Title: white, 18px, 600 weight
    Org + date: white/50, 13px
    Description: white/65, 14px
    Entrance: x: ±60 → 0, staggered

Entries:
  Oct 2024 · Jerusalem College of Engineering
  "1st Place — Cipher Quest"
  Ranked top among 60+ participants in 
  algorithmic problem solving.
  
  Apr 2025 · AMD Slingshot Campus Days Chennai
  "Built NeuroCart — AMD Slingshot Hackathon"  
  Shipped an AI-powered adaptive shopping 
  assistant in 24hrs. Deployed to Google Cloud Run.
  
  Dec 2025 · SIMATS Engineering
  "Cyber Connect Hackathon"
  Built and presented a security-themed 
  prototype under live judging conditions.

═══════════════════════════════════════════
SECTION 6 — CONTACT
═══════════════════════════════════════════

Large centered heading with depth parallax:
  "Let's build" — speed 0.06
  "something." — speed 0.14 
  (two lines drift at different rates = depth)
  
  Subtitle: "Open to SDE Internships · 
    Remote + Chennai"

4 contact cards in a row (.glass):
  EMAIL: ti-mail icon · "Email" · 
    afsalahmed2006@gmail.com · mailto link
  GITHUB: ti-brand-github · "GitHub" · 
    kittyboy06 · link
  LINKEDIN: ti-brand-linkedin · "LinkedIn" · 
    Afsal Ahmed Khan A · link
  LEETCODE: ti-code · "LeetCode" · 
    kittyboy06 (Quest Solved: 49) · link

Each card hover: glass-strong, shimmer sweep, 
  translateY -4px

Background: large indigo glass circle 
  800px, opacity 0.06, scales 0→1 on enter

═══════════════════════════════════════════
FOOTER
═══════════════════════════════════════════

.glass-subtle strip, full width
  Left: © 2026 Afsal Ahmed Khan A
  Center: Built with React · Vite · Tailwind · 
    Framer Motion
  Right: GitHub + LinkedIn icon links

═══════════════════════════════════════════
FILE STRUCTURE
═══════════════════════════════════════════

src/
├── components/
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── About.jsx
│   ├── Skills.jsx
│   ├── Projects.jsx
│   ├── Experience.jsx
│   ├── Contact.jsx
│   └── Footer.jsx
├── hooks/
│   ├── useParallax.js
│   ├── useCountUp.js
│   └── useHorizontalScroll.js
├── styles/
│   └── glass.css        ← all glass utility classes
├── data/
│   ├── projects.json
│   ├── skills.json
│   └── experience.json
├── App.jsx
└── main.jsx

═══════════════════════════════════════════
TECHNICAL REQUIREMENTS
═══════════════════════════════════════════

Dependencies:
  framer-motion — all scroll + entrance animations
  Google Fonts: Plus Jakarta Sans + Inter
  Tabler Icons React (tabler-icons-react)

Performance:
  will-change: transform on all parallax elements
  backdrop-filter only on visible elements
  (remove from off-screen via IntersectionObserver)
  Lazy load photo image

Accessibility:
  prefers-reduced-motion: disable all transforms,
  keep opacity transitions only
  Semantic HTML: section, nav, main, footer
  Alt text on all images
  Keyboard navigable

Mobile (< 768px):
  All parallax speeds → 0
  Horizontal scroll skills → vertical stacked grid
  Bento grid → single column
  Glass effects preserved (backdrop-filter works 
  on mobile)
  Navbar pill → full width with hamburger menu
  Floating chips hidden

GitHub Pages:
  vite.config.js: base: '/Portfolio/'
  Use HashRouter if BrowserRouter has 404 issues

All data in /data JSON — zero hardcoded content 
in JSX components.
Generate all files completely. 
No placeholder comments. 
Must work end to end.

═══════════════════════════════════════════
PERSONAL DETAILS
═══════════════════════════════════════════

Name: Afsal Ahmed Khan A
Email: afsalahmed2006@gmail.com
GitHub: kittyboy06
LinkedIn: afsal-ahmed-khan-a-9a6062332
LeetCode: kittyboy06
Portfolio: kittyboy06.github.io/Portfolio
Resume: /Portfolio/resume.pdf
Photo: /Portfolio/photo.jpg (place your photo here)