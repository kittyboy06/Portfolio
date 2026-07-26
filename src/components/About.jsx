import React, { useState } from 'react'
import { Shield } from 'lucide-react'
import ScrollReveal from './ScrollReveal'

export default function About({ aboutData }) {
  const [imgExists, setImgExists] = useState(true)
  
  if (!aboutData) return null

  const base = import.meta.env.BASE_URL || '/'
  const avatarUrl = `${base}avatar.jpg`

  return (
    <section 
      id="about" 
      className="relative py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-12 overflow-hidden border-t-2 border-[#1A1A1A]"
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        {/* Section Heading with Bordered Container */}
        <ScrollReveal speed={0.8}>
          <div className="text-center mb-8 sm:mb-12 md:mb-16 flex flex-col items-center">
            <span className="font-jakarta text-[10px] sm:text-xs font-extrabold tracking-widest text-[#E85D3F] uppercase bg-[#E85D3F]/10 px-3 py-1 rounded-full border-2 border-[#E85D3F]/30 mb-2.5">
              Player Status
            </span>

            <div className="inline-block px-5 sm:px-8 py-2.5 sm:py-3 rounded-2xl bg-white border-2 border-[#1A1A1A] offset-shadow-black">
              <h2 className="font-jakarta text-xl sm:text-3xl md:text-4xl font-black text-[#1A1A1A] uppercase tracking-tight">
                Character Profile
              </h2>
            </div>
          </div>
        </ScrollReveal>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-center w-full mb-8 sm:mb-12 md:mb-16">
          
          {/* Left Block: Picture Avatar Container */}
          <div className="md:col-span-4 flex justify-center">
            <ScrollReveal speed={1.1} direction="up">
              <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-2xl border-2 border-[#1A1A1A] bg-[#F0EFEB] rotate-[-3deg] offset-shadow-black overflow-hidden group">
                {imgExists ? (
                  <img 
                    src={avatarUrl} 
                    alt="Afsal Ahmed" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                    onError={() => setImgExists(false)}
                  />
                ) : (
                  <svg 
                    viewBox="0 0 100 100" 
                    className="w-full h-full p-8 sm:p-12 text-[#1A1A1A]" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                  >
                    <circle cx="50" cy="40" r="20" />
                    <path d="M20 85 C20 70, 35 60, 50 60 C65 60, 80 70, 80 85" />
                  </svg>
                )}
              </div>
            </ScrollReveal>
          </div>

          {/* Right Block: Bio text card */}
          <div className="md:col-span-8">
            <ScrollReveal speed={1.0} direction="up">
              <div className="rounded-2xl border-2 border-[#1A1A1A] bg-white p-5 sm:p-6 md:p-8 offset-shadow-black text-left space-y-3 sm:space-y-4">
                <div className="flex items-center space-x-2 text-[10px] sm:text-xs font-jakarta font-extrabold uppercase text-[#E85D3F]">
                  <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span>Class: AIML Student & Full-Stack Engineer</span>
                </div>
                
                <p className="text-[#1A1A1A] font-sans text-sm sm:text-base md:text-lg leading-relaxed font-medium">
                  {aboutData.bio}
                </p>
              </div>
            </ScrollReveal>
          </div>

        </div>

        {/* Stats Section Cards */}
        {aboutData.stats && aboutData.stats.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 md:gap-6 w-full">
            {aboutData.stats.map((stat, idx) => (
              <ScrollReveal key={stat.label} delay={idx * 0.08} speed={1.2}>
                <div className="group rounded-xl border-2 border-[#1A1A1A] bg-white p-3.5 sm:p-5 md:p-6 text-center offset-shadow-black hover:bg-[#F0EFEB] transition-all">
                  <div className="font-jakarta text-2xl sm:text-4xl md:text-5xl font-black text-[#E85D3F]">
                    {stat.value}
                  </div>
                  <div className="font-jakarta text-[10px] sm:text-xs md:text-sm font-extrabold text-[#1A1A1A] uppercase tracking-wider mt-1 sm:mt-2">
                    {stat.label}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        )}

      </div>
    </section>
  )
}
