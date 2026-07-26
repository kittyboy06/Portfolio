import React, { useRef } from 'react'
import { Trophy, Calendar, Briefcase, Landmark, ChevronLeft, ChevronRight, GraduationCap, Award } from 'lucide-react'
import ScrollReveal from './ScrollReveal'

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
      className="relative py-16 md:py-24 px-4 md:px-12 overflow-hidden border-t-2 border-[#1A1A1A]"
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        {/* Section Heading & Controls */}
        <ScrollReveal speed={0.8}>
          <div className="w-full flex flex-col md:flex-row items-center justify-between mb-12 md:mb-16">
            <div className="text-center md:text-left mb-6 md:mb-0">
              <span className="font-jakarta text-xs font-extrabold tracking-widest text-[#E85D3F] uppercase bg-[#E85D3F]/10 px-3 py-1 rounded border-2 border-[#E85D3F]/30">
                Timeline Log
              </span>
              <h2 className="font-jakarta text-3xl md:text-5xl font-black text-[#1A1A1A] mt-3 uppercase tracking-tight">
                Experience
              </h2>
              <div className="w-16 h-[4px] bg-[#E85D3F] mt-4 rounded-full md:mx-0 mx-auto"></div>
            </div>

            {/* Scroll Controls */}
            <div className="flex space-x-2">
              <button 
                onClick={() => handleScroll('left')}
                className="p-3 rounded-full bg-white border-2 border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#E85D3F] hover:text-white transition-all offset-shadow-black"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={() => handleScroll('right')}
                className="p-3 rounded-full bg-white border-2 border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#E85D3F] hover:text-white transition-all offset-shadow-black"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Timeline Container */}
        <div className="relative w-full py-4">
          
          <div className="absolute left-0 right-0 top-[32px] h-[3px] bg-[#1A1A1A] pointer-events-none z-0"></div>

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
                    <div className="w-12 h-12 rounded-xl bg-[#E85D3F] border-2 border-[#1A1A1A] text-white flex flex-col items-center justify-center font-jakarta font-extrabold text-xs offset-shadow-black">
                      <IconComp className="w-4 h-4 mb-0.5" />
                      <span>{yearDisplay}</span>
                    </div>
                  </div>

                  {/* Node Content Card */}
                  <ScrollReveal delay={index * 0.08} speed={1}>
                    <div className="w-full bg-white p-6 rounded-2xl border-2 border-[#1A1A1A] offset-shadow-black flex flex-col justify-between h-60">
                      <div>
                        {/* Date & Organization */}
                        <div className="flex items-center justify-between text-xs font-jakarta font-extrabold uppercase text-[#E85D3F] mb-3 pb-2 border-b-2 border-[#E0DFDB]">
                          <span className="flex items-center space-x-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{item.date}</span>
                          </span>
                          <span className="flex items-center space-x-1.5 text-[#666666]">
                            <Landmark className="w-3.5 h-3.5" />
                            <span>{item.org}</span>
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="font-jakarta font-black text-sm uppercase text-[#1A1A1A] tracking-tight leading-snug line-clamp-2">
                          {item.title}
                        </h3>
                      </div>

                      {/* Description */}
                      <p className="text-[#666666] font-sans text-xs leading-relaxed font-medium line-clamp-3">
                        {item.description}
                      </p>
                    </div>
                  </ScrollReveal>
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </section>
  )
}
