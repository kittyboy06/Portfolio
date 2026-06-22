import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import { Trophy, Calendar, Briefcase, Landmark, ChevronLeft, ChevronRight, GraduationCap, Award } from 'lucide-react'

export default function Experience({ experienceData }) {
  const scrollContainerRef = useRef(null)

  if (!experienceData || experienceData.length === 0) return null

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const isDesktop = window.innerWidth >= 768
      const scrollAmount = isDesktop ? 340 : scrollContainerRef.current.clientWidth
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section 
      id="experience" 
      className="relative py-12 md:py-24 px-4 md:px-12 bg-theme-bg border-t-2 border-theme-text overflow-hidden"
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        {/* Section Heading & Controls */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between mb-8 md:mb-12">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <span className="font-jakarta text-xs font-extrabold tracking-widest text-theme-primary uppercase bg-theme-primary/10 px-3 py-1 rounded border-2 border-theme-primary/30">
              Player History
            </span>
            <h2 className="font-jakarta text-3xl md:text-5xl font-black text-theme-text mt-3 uppercase tracking-tight">
              Experience / Achievements
            </h2>
            <div className="w-16 h-[4px] bg-theme-primary mx-auto mt-4 md:mx-0 rounded-full"></div>
          </div>

          {/* Scroll Controls */}
          <div className="flex space-x-2">
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

        {/* Timeline Page-by-Page Container */}
        <div className="relative w-full py-4">
          
          {/* Horizontal connecting background line */}
          <div className="absolute left-0 right-0 top-[40px] h-[3px] bg-theme-text pointer-events-none z-0"></div>

          {/* Scrolling Page View */}
          <div 
            ref={scrollContainerRef}
            className="w-full overflow-x-auto flex gap-6 md:gap-8 pb-8 pt-2 px-1 scrollbar-none scroll-snap-x scroll-smooth z-10 relative"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {experienceData.map((item, index) => {
              const lower = item.title.toLowerCase()
              const IconComp = (lower.includes('1st') || lower.includes('winner') || lower.includes('award'))
                ? Trophy
                : (lower.includes('ryla') || lower.includes('leadership') || lower.includes('program'))
                  ? GraduationCap
                  : (lower.includes('participant'))
                    ? Award
                    : Briefcase

              // Parse year from date string (e.g. "Oct 2024" -> "2024")
              const yearMatch = item.date.match(/\d{4}/)
              const yearDisplay = yearMatch ? yearMatch[0] : item.date

              return (
                <div 
                  key={index} 
                  className="flex-shrink-0 w-full md:w-80 scroll-snap-align-start flex flex-col items-center select-none px-4 md:px-0"
                >
                  {/* Timeline Node (Dot / Year) */}
                  <div className="mb-8 flex items-center justify-center relative">
                    <div 
                      className="w-16 h-16 rounded-full border-2 border-theme-text bg-theme-accent text-white flex flex-col items-center justify-center font-jakarta font-black text-xs shadow-sm offset-shadow-black hover:scale-105 transition-transform"
                    >
                      <IconComp className="w-4 h-4 mb-0.5" />
                      <span>{yearDisplay}</span>
                    </div>
                  </div>

                  {/* Node Content Card - Responsive size */}
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="w-full max-w-none md:max-w-none bg-theme-card p-8 md:p-6 rounded-2xl md:rounded-xl border-2 border-theme-text offset-shadow-black flex flex-col justify-between min-h-[280px] md:h-56 md:min-h-[224px] hover:bg-theme-surface"
                  >
                    <div>
                      {/* Date & Organization */}
                      <div className="flex items-center justify-between text-xs md:text-[10px] font-jakarta font-extrabold uppercase tracking-wider text-theme-muted mb-4 md:mb-2 pb-2 md:pb-0 border-b border-theme-border/60 md:border-b-0">
                        <span className="flex items-center space-x-1.5 md:space-x-1">
                          <Calendar className="w-3.5 h-3.5 md:w-3 md:h-3" />
                          <span>{item.date}</span>
                        </span>
                        <span className="flex items-center space-x-1.5 md:space-x-1">
                          <Landmark className="w-3.5 h-3.5 md:w-3 md:h-3" />
                          <span>{item.org}</span>
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-jakarta font-black text-base md:text-sm uppercase text-theme-text tracking-wide mb-4 md:mb-3 leading-snug line-clamp-2">
                        {item.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-theme-muted font-sans text-sm md:text-xs leading-relaxed font-medium line-clamp-4">
                      {item.description}
                    </p>
                  </motion.div>
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </section>
  )
}
