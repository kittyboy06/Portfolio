import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Github, 
  ExternalLink, 
  Box, 
  Gamepad2, 
  Landmark, 
  Laptop, 
  Cpu, 
  Music, 
  ChevronLeft, 
  ChevronRight,
  Sparkles,
  ShoppingBag,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Activity
} from 'lucide-react'

// Helper to assign a brand icon to each project
const getProjectIcon = (id) => {
  switch (id) {
    case 'arise-irl':
      return Gamepad2
    case 'neurocart':
      return Cpu
    case 'magic-embroidery':
      return Landmark
    case 'aash-player':
      return Music
    case 'brainos':
      return Laptop
    default:
      return Box
  }
}

export default function Projects({ projectsData }) {
  const desktopScrollContainerRef = useRef(null)
  const mobileScrollContainerRef = useRef(null)

  // Interactive states for previews inside project cards
  const [isPlaying, setIsPlaying] = useState(false)
  const [cartItems, setCartItems] = useState(0)
  const [activeBeat, setActiveBeat] = useState(null)

  if (!projectsData || projectsData.length === 0) return null

  const base = import.meta.env.BASE_URL || '/'
  const neurocartImg = `${base}neurocart_mockup.png`

  // Chunk projects into pages of 3 projects per page for mobile layout
  const projectsPerPage = 3
  const projectPages = []
  for (let i = 0; i < projectsData.length; i += projectsPerPage) {
    projectPages.push(projectsData.slice(i, i + projectsPerPage))
  }

  const handleScroll = (direction) => {
    // Determine scroll container based on viewport size dynamically
    const isDesktop = window.innerWidth >= 768
    const container = isDesktop ? desktopScrollContainerRef.current : mobileScrollContainerRef.current
    if (container) {
      // Scroll by one full page viewport width
      const scrollAmount = container.clientWidth
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  // Animation configuration
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', damping: 18, stiffness: 80 }
    }
  }

  return (
    <section 
      id="work" 
      className="relative py-12 md:py-24 px-4 md:px-12 bg-theme-bg border-t-2 border-theme-text overflow-hidden"
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        {/* Section Heading & Controls */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between mb-8 md:mb-12">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <span className="font-jakarta text-xs font-extrabold tracking-widest text-theme-accent uppercase bg-theme-accent/10 px-3 py-1 rounded border-2 border-theme-accent/30">
              Selected Work
            </span>
            <h2 className="font-jakarta text-3xl md:text-5xl font-black text-theme-text mt-3 uppercase tracking-tight">
              Active Quests
            </h2>
            <div className="w-12 h-[4px] bg-theme-accent mt-4 rounded-full md:mx-0 mx-auto"></div>
          </div>

          {/* Scroll Controls */}
          <div className="flex md:hidden space-x-2">
            <button 
              onClick={() => handleScroll('left')}
              className="p-2.5 rounded-lg border-2 border-theme-text bg-theme-card hover:bg-theme-surface offset-shadow-black transition-all"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4 text-theme-text" />
            </button>
            <button 
              onClick={() => handleScroll('right')}
              className="p-2.5 rounded-lg border-2 border-theme-text bg-theme-card hover:bg-theme-surface offset-shadow-black transition-all"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4 text-theme-text" />
            </button>
          </div>
        </div>

        {/* Project Horizontal Page Scroll Track */}
        <div className="relative w-full py-4">
          
          {/* Desktop Bento Grid: Show all projects at once (laptop and big screen default) */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full"
          >
            {projectsData.map((project) => {
              const IconComp = getProjectIcon(project.id)
              const isCompleted = project.status.toLowerCase() === 'completed'
              const isFeatured = project.id === 'neurocart' // NeuroCart is the featured card

              if (isFeatured) {
                return (
                  <motion.div 
                    key={`desktop-grid-${project.id}`} 
                    variants={cardVariants}
                    className="col-span-1 md:col-span-2 lg:col-span-2 h-full"
                  >
                    {/* Featured Card */}
                    <div className="group relative flex flex-col justify-between h-full rounded-2xl border-2 border-theme-text bg-theme-card p-6 md:p-8 offset-shadow-accent hover:bg-theme-surface overflow-hidden">
                      {/* Status Badge */}
                      <span 
                        className={`absolute top-6 right-6 font-jakarta font-extrabold text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-full border-2 ${
                          isCompleted 
                            ? 'bg-emerald-500/10 border-emerald-500 text-emerald-600'
                            : 'bg-amber-500/10 border-amber-500/60 text-amber-600'
                        }`}
                      >
                        {project.status}
                      </span>

                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center h-full w-full">
                        {/* Left: Text detail */}
                        <div className="md:col-span-7 space-y-4 text-left">
                          <div className="flex items-center space-x-3">
                            <div className="p-2.5 rounded-lg border-2 border-theme-text bg-theme-accent text-white shadow-sm">
                              <IconComp className="w-5 h-5" />
                            </div>
                            <span className="font-jakarta text-xs uppercase font-extrabold tracking-wider text-theme-accent">
                              Featured Project
                            </span>
                          </div>

                          <h3 className="font-jakarta font-black text-2xl md:text-3xl text-theme-text uppercase tracking-tight group-hover:text-theme-accent transition-colors duration-200">
                            {project.title}
                          </h3>

                          <p className="text-theme-muted font-sans text-sm leading-relaxed font-medium">
                            {project.description}
                          </p>

                          {/* Tech tags */}
                          <div className="flex flex-wrap gap-2 pt-2">
                            {project.tags.map((tag) => (
                              <span 
                                key={tag} 
                                className="font-jakarta text-[9px] font-extrabold uppercase tracking-wider bg-theme-bg px-2.5 py-1 rounded border-2 border-theme-text text-theme-text/80"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          {/* Direct links */}
                          {(project.github || project.demo) && (
                            <div className="flex items-center space-x-4 pt-4 border-t border-theme-border">
                              {project.github && (
                                <a 
                                  href={project.github} 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className="flex items-center space-x-1.5 font-jakarta font-extrabold text-xs uppercase text-theme-text hover:text-theme-accent transition-colors duration-200"
                                >
                                  <Github className="w-4 h-4" />
                                  <span>Source</span>
                                </a>
                              )}
                              {project.demo && (
                                <a 
                                  href={project.demo} 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className="flex items-center space-x-1.5 font-jakarta font-extrabold text-xs uppercase text-theme-text hover:text-theme-accent transition-colors duration-200"
                                >
                                  <ExternalLink className="w-4 h-4" />
                                  <span>Demo</span>
                                </a>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Right: Mockup Image inside creative frame */}
                        <div className="md:col-span-5 flex justify-center pt-4 md:pt-0">
                          <div className="w-full max-w-[200px] h-48 border-2 border-theme-text rounded-xl bg-theme-surface overflow-hidden relative shadow-sm rotate-[1deg] group-hover:rotate-0 transition-transform duration-300">
                            <img 
                              src={neurocartImg} 
                              alt={`${project.title} Preview`}
                              className="w-full h-full object-cover" 
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              }

              // Regular Cards
              return (
                <motion.div 
                  key={`desktop-grid-${project.id}`} 
                  variants={cardVariants}
                  className="h-full"
                >
                  <div 
                    className="group relative flex flex-col justify-between h-full rounded-2xl border-2 border-theme-text bg-theme-card p-6 md:p-7 offset-shadow-black hover:bg-theme-surface overflow-hidden"
                  >
                    {/* Status Badge */}
                    <span 
                      className={`absolute top-6 right-6 font-jakarta font-extrabold text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-full border-2 ${
                        isCompleted 
                          ? 'bg-emerald-500/10 border-emerald-500 text-emerald-600'
                          : 'bg-amber-500/10 border-amber-500/60 text-amber-600'
                      }`}
                    >
                      {project.status}
                    </span>

                    <div className="space-y-4 text-left">
                      {/* Header icon */}
                      <div className="p-2.5 rounded-lg border-2 border-theme-text bg-theme-surface text-theme-text w-max shadow-sm group-hover:bg-theme-accent group-hover:text-white transition-colors duration-200">
                        <IconComp className="w-5 h-5" />
                      </div>

                      {/* Title */}
                      <h3 className="font-jakarta font-black text-lg md:text-xl text-theme-text group-hover:text-theme-accent transition-colors duration-200 uppercase tracking-wide">
                        {project.title}
                      </h3>

                      {/* Description */}
                      <p className="text-theme-muted font-sans text-xs md:text-sm leading-relaxed font-medium">
                        {project.description}
                      </p>
                    </div>

                    <div className="space-y-4 mt-6">
                      {/* Tags Pills */}
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                          <span 
                            key={tag} 
                            className="font-jakarta text-[8px] font-extrabold uppercase tracking-wider bg-theme-bg px-2 py-0.5 rounded border-2 border-theme-text text-theme-text/80"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* GitHub & Demo Links */}
                      {(project.github || project.demo) && (
                        <div className="flex items-center space-x-4 pt-2 border-t border-theme-border">
                          {project.github && (
                            <a 
                              href={project.github} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="flex items-center space-x-1.5 font-jakarta font-extrabold text-[10px] uppercase text-theme-text hover:text-theme-accent transition-colors duration-200"
                            >
                              <Github className="w-3.5 h-3.5" />
                              <span>Source</span>
                            </a>
                          )}
                          {project.demo && (
                            <a 
                              href={project.demo} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="flex items-center space-x-1.5 font-jakarta font-extrabold text-[10px] uppercase text-theme-text hover:text-theme-accent transition-colors duration-200"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                              <span>Demo</span>
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Mobile Scroll Track: 3 project cards (rows) in a single column per page (for small screens) */}
          <motion.div 
            ref={mobileScrollContainerRef}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="flex md:hidden w-full overflow-x-auto pb-8 pt-2 px-1 scrollbar-none scroll-smooth z-10 relative"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {projectPages.map((pageProjects, pageIndex) => (
              <div 
                key={`mobile-page-${pageIndex}`} 
                className="flex-shrink-0 w-full scroll-snap-align-start px-4"
              >
                <div className="w-full max-w-4xl mx-auto flex flex-col gap-4">
                  {pageProjects.map((project) => {
                    const IconComp = getProjectIcon(project.id)
                    const isCompleted = project.status.toLowerCase() === 'completed'

                    return (
                      <motion.div
                        key={`mobile-${project.id}`}
                        variants={cardVariants}
                        className="w-full"
                      >
                        <div className="group relative flex flex-col justify-between items-center rounded-2xl border-2 border-theme-text bg-theme-card p-4 w-full offset-shadow-black hover:bg-theme-surface transition-all overflow-hidden gap-4 min-h-[140px]">
                          
                          {/* Left Side: Content & Actions */}
                          <div className="flex-grow flex flex-col justify-between space-y-3 w-full text-left">
                            <div className="space-y-2">
                              <div className="flex flex-wrap items-center gap-2">
                                <div className="p-1.5 rounded-lg border-2 border-theme-text bg-theme-accent text-white shadow-sm flex-shrink-0">
                                  <IconComp className="w-3.5 h-3.5" />
                                </div>
                                <h3 className="font-jakarta font-black text-base text-theme-text uppercase tracking-tight group-hover:text-theme-accent transition-colors duration-200">
                                  {project.title}
                                </h3>
                                <span 
                                  className={`font-jakarta font-extrabold text-[7px] uppercase tracking-widest px-2 py-0.5 rounded-full border-2 flex-shrink-0 ${
                                    isCompleted 
                                      ? 'bg-emerald-500/10 border-emerald-500 text-emerald-600'
                                      : 'bg-amber-500/10 border-amber-500/60 text-amber-600'
                                  }`}
                                >
                                  {project.status}
                                </span>
                              </div>

                              <p className="text-theme-muted font-sans text-[11px] leading-relaxed font-medium line-clamp-2">
                                {project.description}
                              </p>
                            </div>

                            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-theme-border/60">
                              {/* Tags Pills */}
                              <div className="flex flex-wrap gap-1">
                                {project.tags.slice(0, 3).map((tag) => (
                                  <span 
                                    key={tag} 
                                    className="font-jakarta text-[7px] font-extrabold uppercase tracking-wider bg-theme-bg px-1.5 py-0.5 rounded border-2 border-theme-text text-theme-text/80"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>

                              {/* Direct Links */}
                              {(project.github || project.demo) && (
                                <div className="flex items-center space-x-2.5">
                                  {project.github && (
                                    <a 
                                      href={project.github} 
                                      target="_blank" 
                                      rel="noopener noreferrer" 
                                      className="flex items-center space-x-1 font-jakarta font-extrabold text-[8px] uppercase text-theme-text hover:text-theme-accent transition-colors duration-200"
                                    >
                                      <Github className="w-3 h-3" />
                                      <span>Source</span>
                                    </a>
                                  )}
                                  {project.demo && (
                                    <a 
                                      href={project.demo} 
                                      target="_blank" 
                                      rel="noopener noreferrer" 
                                      className="flex items-center space-x-1 font-jakarta font-extrabold text-[8px] uppercase text-theme-text hover:text-theme-accent transition-colors duration-200"
                                    >
                                      <ExternalLink className="w-3 h-3" />
                                      <span>Demo</span>
                                    </a>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Right Side: Interactive Preview Widgets */}
                          <div className="flex-shrink-0 flex justify-center items-center w-full">
                            
                            {/* WIDGET 1: arise-irl */}
                            {project.id === 'arise-irl' && (
                              <div className="w-full max-w-[200px] bg-theme-bg border-2 border-theme-border rounded-xl p-2.5 space-y-1.5 font-mono text-[9px] text-theme-text/90 shadow-sm">
                                <div className="flex justify-between items-center pb-0.5 border-b border-theme-border">
                                  <span className="font-bold uppercase tracking-wider text-[8px]">HUNTER STATUS</span>
                                  <span className="text-[7px] font-bold bg-theme-accent/20 border border-theme-accent px-1.5 py-0.5 rounded text-theme-accent">LVL 4</span>
                                </div>
                                <div className="space-y-0.5">
                                  <div className="flex justify-between text-[7px] text-theme-muted">
                                    <span>HP (Stamina)</span>
                                    <span className="text-emerald-500 font-bold">100/100</span>
                                  </div>
                                  <div className="w-full h-1 bg-theme-surface border border-theme-border rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-500 w-full animate-pulse"></div>
                                  </div>
                                </div>
                                <div className="space-y-0.5">
                                  <div className="flex justify-between text-[7px] text-theme-muted">
                                    <span>XP</span>
                                    <span className="text-[#8B5CF6] font-bold">2,880/4,000</span>
                                  </div>
                                  <div className="w-full h-1 bg-theme-surface border border-theme-border rounded-full overflow-hidden">
                                    <div className="h-full bg-[#8B5CF6] w-[72%]"></div>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* WIDGET 2: neurocart */}
                            {project.id === 'neurocart' && (
                              <div className="w-32 h-20 border-2 border-theme-text rounded-xl bg-theme-surface overflow-hidden relative shadow-sm rotate-[1deg] group-hover:rotate-0 transition-transform duration-300">
                                <img 
                                  src={neurocartImg} 
                                  alt={`${project.title} Preview`}
                                  className="w-full h-full object-cover" 
                                />
                                <div className="absolute bottom-1 left-1 bg-theme-bg/85 border border-theme-border px-1.5 py-0.2 rounded text-[7px] font-bold text-theme-accent flex items-center space-x-0.5 shadow-sm">
                                  <Sparkles className="w-2 h-2" />
                                  <span>1st Place</span>
                                </div>
                              </div>
                            )}

                            {/* WIDGET 3: magic-embroidery */}
                            {project.id === 'magic-embroidery' && (
                              <div className="w-full max-w-[200px] bg-theme-bg border-2 border-theme-border rounded-xl p-2 flex flex-col justify-between gap-1.5 font-jakarta text-[9px] shadow-sm">
                                <div className="h-7 relative rounded-lg border border-theme-border bg-theme-surface flex items-center justify-center overflow-hidden">
                                  <motion.div 
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                                    className="w-5 h-5 rounded-full border border-dashed border-theme-accent/40 flex items-center justify-center"
                                  >
                                    <Landmark className="w-2.5 h-2.5 text-theme-accent animate-pulse" />
                                  </motion.div>
                                </div>
                                
                                <div className="flex items-center justify-between bg-theme-surface border border-theme-border p-1 rounded-lg">
                                  <div className="flex flex-col text-[7px]">
                                    <span className="font-bold text-theme-text leading-tight">Embroidery</span>
                                    <span className="text-[7px] text-theme-accent leading-tight">$45.00</span>
                                  </div>
                                  <motion.button 
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setCartItems(prev => prev + 1)}
                                    className="flex items-center space-x-0.5 bg-theme-accent text-white px-1.5 py-0.5 rounded font-bold text-[7px] hover:bg-theme-accent/90 transition-colors"
                                  >
                                    <ShoppingBag className="w-2.5 h-2.5" />
                                    <span>Cart ({cartItems})</span>
                                  </motion.button>
                                </div>
                              </div>
                            )}

                            {/* WIDGET 4: aash-player */}
                            {project.id === 'aash-player' && (
                              <div className="w-full max-w-[200px] bg-theme-bg border-2 border-theme-border rounded-xl p-2 flex flex-col justify-between gap-1.5 font-jakarta text-[9px] shadow-sm">
                                <div className="flex items-end justify-center space-x-0.5 h-5 w-full opacity-80 pt-1">
                                  {[...Array(10)].map((_, i) => (
                                    <motion.div
                                      key={i}
                                      className="w-0.5 bg-theme-accent rounded-full"
                                      animate={isPlaying ? {
                                        height: [2, Math.random() * 12 + 2, 2]
                                      } : { height: 2 }}
                                      transition={{ repeat: Infinity, duration: 0.5 + Math.random() * 0.7 }}
                                      style={{ height: '2px' }}
                                    />
                                  ))}
                                </div>
                                <div className="flex items-center justify-center space-x-2 bg-theme-surface p-1 rounded-lg border border-theme-border">
                                  <SkipBack className="w-3 h-3 text-theme-muted hover:text-theme-text cursor-pointer" />
                                  <motion.button 
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setIsPlaying(!isPlaying)}
                                    className="p-0.5 bg-theme-accent text-white rounded-full hover:scale-105 transition-all shadow-md cursor-pointer"
                                  >
                                    {isPlaying ? <Pause className="w-2.5 h-2.5 fill-current" /> : <Play className="w-2.5 h-2.5 fill-current" />}
                                  </motion.button>
                                  <SkipForward className="w-3 h-3 text-theme-muted hover:text-theme-text cursor-pointer" />
                                </div>
                              </div>
                            )}

                            {/* WIDGET 5: brainos */}
                            {project.id === 'brainos' && (
                              <div className="w-full max-w-[200px] bg-[#0c0c14] border-2 border-theme-border rounded-xl p-2 font-mono text-[7px] text-theme-accent space-y-0.5 shadow-sm overflow-hidden h-14">
                                <div className="text-white/40 border-b border-theme-border pb-0.5 flex justify-between mb-0.5">
                                  <span>SESSION: brainos</span>
                                  <span className="animate-pulse text-[#06B6D4]">● ONLINE</span>
                                </div>
                                <div className="text-theme-text/80">$ brainos --init</div>
                                <div className="text-emerald-500">[ok] Connected: Ollama</div>
                              </div>
                            )}

                            {/* WIDGET 6: quantum-pulse */}
                            {project.id === 'quantum-pulse' && (
                              <div className="w-full max-w-[200px] bg-theme-bg border-2 border-theme-border rounded-xl p-1.5 flex flex-col items-center justify-between gap-1.5 font-jakarta text-[9px] shadow-sm relative overflow-hidden h-14">
                                <div className="w-full flex-grow relative border-b border-theme-border overflow-hidden flex justify-around">
                                  {[...Array(4)].map((_, lane) => (
                                    <div key={lane} className="w-4 h-full bg-white/[0.01] border-x border-theme-border/10 relative flex justify-center">
                                      {lane === activeBeat && (
                                        <motion.div 
                                          initial={{ y: -3, opacity: 1 }}
                                          animate={{ y: 15, opacity: 0 }}
                                          transition={{ duration: 0.5, ease: "linear" }}
                                          className="w-1.5 h-1.5 rounded-full bg-theme-accent absolute"
                                        />
                                      )}
                                    </div>
                                  ))}
                                </div>
                                <div className="flex justify-around w-full relative z-10">
                                  {['D', 'F', 'J', 'K'].map((key, i) => (
                                    <motion.button 
                                      key={key}
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.9 }}
                                      onHoverStart={() => setActiveBeat(i)}
                                      onHoverEnd={() => setActiveBeat(null)}
                                      className="w-4 h-4 rounded-full border border-theme-border bg-theme-surface hover:bg-theme-accent/25 flex items-center justify-center font-mono text-[7px] font-bold text-theme-text transition-all"
                                    >
                                      {key}
                                    </motion.button>
                                  ))}
                                </div>
                              </div>
                            )}

                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  )
}
