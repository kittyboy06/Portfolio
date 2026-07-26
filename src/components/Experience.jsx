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
        
        {/* Section Heading & Controls with Bordered Container */}
        <ScrollReveal speed={0.8}>
          <div className="w-full flex flex-col md:flex-row items-center justify-between mb-12 md:mb-16">
            <div className="text-center md:text-left mb-6 md:mb-0 flex flex-col items-center md:items-start">
              <span className="font-jakarta text-xs font-extrabold tracking-widest text-[#E85D3F] uppercase bg-[#E85D3F]/10 px-3.5 py-1 rounded-full border-2 border-[#E85D3F]/30 mb-3">
                Timeline Log
              </span>
              <div className="inline-block px-6 md:px-8 py-3 rounded-2xl bg-white border-2 border-[#1A1A1A] offset-shadow-black">
                <h2 className="font-jakarta text-2xl sm:text-3xl md:text-4xl font-black text-[#1A1A1A] uppercase tracking-tight">
                  Experience & Quests
                </h2>
              </div>
            </div>

            {/* Scroll Controls */}
            <div className="flex space-x-2">
              <button 
                onClick={() => handleScroll('left')}
                className="p-3 rounded-full bg-white border-2 border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#E85D3F] hover:text-white transition-all offset-shadow-black cursor-pointer"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={() => handleScroll('right')}
                className="p-3 rounded-full bg-white border-2 border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#E85D3F] hover:text-white transition-all offset-shadow-black cursor-pointer"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Horizontal Scrollable Timeline */}
        <div 
          ref={scrollContainerRef}
          className="flex space-x-6 overflow-x-auto w-full pb-8 pt-2 scrollbar-none snap-x snap-mandatory"
        >
          {experienceData.map((item, index) => (
            <div 
              key={index}
              className="flex-shrink-0 w-[280px] sm:w-[320px] md:w-[360px] snap-center"
            >
              <ScrollReveal delay={index * 0.08} speed={1.1}>
                <div className="bg-white p-6 rounded-2xl border-2 border-[#1A1A1A] offset-shadow-black h-full flex flex-col justify-between hover:bg-[#F0EFEB] transition-colors select-none text-left">
                  <div className="space-y-4">
                    {/* Header Row */}
                    <div className="flex items-center justify-between">
                      <div className="p-2.5 rounded-lg border-2 border-[#1A1A1A] bg-[#E85D3F]/10 text-[#E85D3F]">
                        <Briefcase className="w-5 h-5" />
                      </div>
                      
                      <div className="flex items-center space-x-1.5 font-jakarta text-xs font-extrabold text-[#666666] bg-[#F0EFEB] border-2 border-[#1A1A1A] px-2.5 py-1 rounded-full">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{item.date}</span>
                      </div>
                    </div>

                    {/* Title & Organization */}
                    <div>
                      <h3 className="font-jakarta text-lg md:text-xl font-black text-[#1A1A1A] uppercase tracking-wide">
                        {item.title}
                      </h3>
                      <p className="font-jakarta text-xs font-bold text-[#E85D3F] uppercase tracking-wider mt-1">
                        {item.org}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-[#666666] font-sans text-xs md:text-sm leading-relaxed font-medium">
                      {item.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
