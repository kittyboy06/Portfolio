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
      className="relative py-16 md:py-24 px-4 md:px-12 overflow-hidden border-t-2 border-[#1A1A1A]"
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        {/* Section Heading */}
        <ScrollReveal speed={0.8}>
          <div className="text-center mb-12 md:mb-16">
            <span className="font-jakarta text-xs font-extrabold tracking-widest text-[#E85D3F] uppercase bg-[#E85D3F]/10 px-3 py-1 rounded border-2 border-[#E85D3F]/30">
              Player Status
            </span>
            <h2 className="font-jakarta text-3xl md:text-5xl font-black text-[#1A1A1A] mt-3 uppercase tracking-tight">
              Character Profile
            </h2>
            <div className="w-16 h-[4px] bg-[#E85D3F] mx-auto mt-4 rounded-full"></div>
          </div>
        </ScrollReveal>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center w-full mb-12 md:mb-16">
          
          {/* Left Block: Picture Avatar Container */}
          <div className="md:col-span-4 flex justify-center">
            <ScrollReveal speed={1.1} direction="up">
              <div className="relative w-64 h-64 md:w-72 md:h-72 rounded-2xl border-2 border-[#1A1A1A] bg-[#F0EFEB] rotate-[-3deg] offset-shadow-black overflow-hidden group">
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
                    className="w-full h-full p-12 text-[#1A1A1A]" 
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

          {/* Right Block: Bio Lore Box */}
          <div className="md:col-span-8">
            <ScrollReveal speed={1} direction="up">
              <div className="bg-white p-6 md:p-8 rounded-2xl border-2 border-[#1A1A1A] offset-shadow-accent relative">
                <div className="flex items-center space-x-2.5 mb-4 pb-3 border-b-2 border-[#E0DFDB]">
                  <Shield className="w-5 h-5 text-[#E85D3F]" />
                  <span className="font-jakarta font-extrabold text-sm uppercase text-[#1A1A1A] tracking-wider">
                    Biography / Character Lore
                  </span>
                </div>

                <p className="text-[#1A1A1A]/90 leading-relaxed font-sans text-base md:text-lg tracking-wide font-medium">
                  {aboutData.bio}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* 4 Labeled Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full">
          {aboutData.stats.map((stat, index) => {
            const isLeetCode = stat.label.toLowerCase().includes('leetcode')

            const cardContent = (
              <div className="relative group p-4 md:p-6 rounded-xl border-2 border-[#1A1A1A] bg-white flex flex-col items-center justify-center text-center offset-shadow-black hover:bg-[#F0EFEB] select-none cursor-pointer h-full">
                <span className="font-jakarta font-black text-4xl md:text-5xl text-[#E85D3F] group-hover:scale-105 transition-transform duration-200">
                  {stat.value}
                </span>
                <span className="font-jakarta font-extrabold text-[10px] md:text-xs text-[#666666] tracking-widest uppercase mt-2.5">
                  {stat.label}
                </span>
              </div>
            )

            return (
              <ScrollReveal key={index} delay={index * 0.08} speed={1 + index * 0.05}>
                {isLeetCode ? (
                  <a 
                    href={aboutData.leetcodeUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block h-full"
                  >
                    {cardContent}
                  </a>
                ) : (
                  cardContent
                )}
              </ScrollReveal>
            )
          })}
        </div>

      </div>
    </section>
  )
}
