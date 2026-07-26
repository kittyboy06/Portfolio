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
      className="relative py-16 md:py-24 px-4 md:px-12 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        {/* Section Heading & Controls */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between mb-12 md:mb-16">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <span className="font-jakarta text-xs font-extrabold tracking-widest gradient-text-cyan uppercase px-4 py-1.5 rounded-full glass border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
              MILESTONES & TIMELINE
            </span>
            <h2 className="font-jakarta text-3xl md:text-5xl font-extrabold text-white mt-3 uppercase tracking-tight">
              Experience
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-indigo-500 mt-4 rounded-full shadow-[0_0_12px_rgba(6,182,212,0.8)] md:mx-0 mx-auto"></div>
          </div>

          {/* Scroll Controls */}
          <div className="flex space-x-2">
            <button 
              onClick={() => handleScroll('left')}
              className="p-3 rounded-full glass glass-hover text-slate-300 hover:text-cyan-400 border border-white/15 transition-all"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={() => handleScroll('right')}
              className="p-3 rounded-full glass glass-hover text-slate-300 hover:text-cyan-400 border border-white/15 transition-all"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Timeline Container */}
        <div className="relative w-full py-4">
          
          {/* Horizontal connecting background line */}
          <div className="absolute left-0 right-0 top-[32px] h-[2px] bg-gradient-to-r from-cyan-500/50 via-indigo-500/50 to-violet-500/50 pointer-events-none z-0"></div>

          {/* Scrolling Page View */}
          <div 
            ref={scrollContainerRef}
            className="w-full overflow-x-auto flex gap-6 md:gap-8 pb-8 pt-2 px-1 scrollbar-none scroll-smooth z-10 relative"
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

              const yearMatch = item.date.match(/\d{4}/)
              const yearDisplay = yearMatch ? yearMatch[0] : item.date

              return (
                <div 
                  key={index} 
                  className="flex-shrink-0 w-full md:w-80 flex flex-col items-center select-none"
                >
                  {/* Timeline Node */}
                  <div className="mb-6 flex items-center justify-center relative">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 text-slate-950 flex flex-col items-center justify-center font-jakarta font-extrabold text-xs shadow-[0_0_20px_rgba(6,182,212,0.5)]">
                      <IconComp className="w-4 h-4 mb-0.5" />
                      <span>{yearDisplay}</span>
                    </div>
                  </div>

                  {/* Node Content Card */}
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="w-full glass glass-hover p-6 rounded-3xl border border-white/15 shadow-xl flex flex-col justify-between h-64"
                  >
                    <div>
                      {/* Date & Organization */}
                      <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-cyan-400 mb-3 pb-2 border-b border-white/10">
                        <span className="flex items-center space-x-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{item.date}</span>
                        </span>
                        <span className="flex items-center space-x-1.5 text-slate-400">
                          <Landmark className="w-3.5 h-3.5" />
                          <span>{item.org}</span>
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-jakarta font-extrabold text-base uppercase text-white tracking-tight leading-snug line-clamp-2">
                        {item.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-slate-300 font-sans text-xs leading-relaxed line-clamp-4">
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
