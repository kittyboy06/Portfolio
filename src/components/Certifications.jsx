import React from 'react'
import { BadgeCheck, GraduationCap } from 'lucide-react'
import ScrollReveal from './ScrollReveal'

export default function Certifications({ certificationsData }) {
  if (!certificationsData || certificationsData.length === 0) return null

  return (
    <section
      id="certifications"
      className="relative py-16 md:py-24 px-4 md:px-12 overflow-hidden border-t-2 border-[#1A1A1A]"
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center">

        {/* Section Heading with Bordered Container */}
        <ScrollReveal speed={0.8}>
          <div className="text-center mb-12 md:mb-16 flex flex-col items-center">
            <span className="font-jakarta text-xs font-extrabold tracking-widest text-[#E85D3F] uppercase bg-[#E85D3F]/10 px-3.5 py-1 rounded-full border-2 border-[#E85D3F]/30 mb-3">
              Verified Badges
            </span>

            <div className="inline-block px-6 md:px-8 py-3 rounded-2xl bg-white border-2 border-[#1A1A1A] offset-shadow-black">
              <h2 className="font-jakarta text-2xl sm:text-3xl md:text-4xl font-black text-[#1A1A1A] uppercase tracking-tight">
                Certifications & Courses
              </h2>
            </div>
          </div>
        </ScrollReveal>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {certificationsData.map((cert, index) => (
            <ScrollReveal key={index} delay={index * 0.08} speed={1 + index * 0.05}>
              <div className="group bg-white p-5 md:p-6 rounded-2xl border-2 border-[#1A1A1A] offset-shadow-black hover:bg-[#F0EFEB] select-none flex items-start space-x-4 h-full">
                {/* Badge Icon */}
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#E85D3F] border-2 border-[#1A1A1A] flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
                  <BadgeCheck className="w-5 h-5" />
                </div>

                {/* Text Detail */}
                <div className="min-w-0">
                  <h3 className="font-jakarta font-black text-sm md:text-base uppercase text-[#1A1A1A] tracking-tight leading-snug group-hover:text-[#E85D3F] transition-colors">
                    {cert.name}
                  </h3>
                  <div className="flex items-center space-x-1.5 mt-2">
                    <GraduationCap className="w-4 h-4 text-[#E85D3F] flex-shrink-0" />
                    <span className="font-jakarta text-xs text-[#666666] font-extrabold uppercase tracking-wider">
                      {cert.issuer}
                    </span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  )
}
