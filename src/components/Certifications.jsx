import React from 'react'
import { BadgeCheck, GraduationCap } from 'lucide-react'
import ScrollReveal from './ScrollReveal'

export default function Certifications({ certificationsData }) {
  if (!certificationsData || certificationsData.length === 0) return null

  return (
    <section
      id="certifications"
      className="relative py-16 md:py-24 px-4 md:px-12 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center">

        {/* Section Heading */}
        <ScrollReveal speed={0.8}>
          <div className="text-center mb-12 md:mb-16">
            <span className="font-jakarta text-xs font-extrabold tracking-widest text-emerald-400 uppercase px-4 py-1.5 rounded-full glass border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              VERIFIED CREDENTIALS
            </span>
            <h2 className="font-jakarta text-3xl md:text-5xl font-extrabold text-white mt-3 uppercase tracking-tight">
              Certifications
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-500 mx-auto mt-4 rounded-full shadow-[0_0_12px_rgba(16,185,129,0.8)]"></div>
          </div>
        </ScrollReveal>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {certificationsData.map((cert, index) => (
            <ScrollReveal key={index} delay={index * 0.08} speed={1 + index * 0.05}>
              <div className="group glass glass-hover glass-spotlight p-6 rounded-3xl border border-white/15 shadow-xl select-none flex items-start space-x-4 h-full">
                {/* Badge Icon */}
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(16,185,129,0.25)]">
                  <BadgeCheck className="w-6 h-6" />
                </div>

                {/* Text Detail */}
                <div className="min-w-0">
                  <h3 className="font-jakarta font-extrabold text-base uppercase text-white tracking-tight leading-snug group-hover:text-emerald-300 transition-colors">
                    {cert.name}
                  </h3>
                  <div className="flex items-center space-x-1.5 mt-2.5">
                    <GraduationCap className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span className="font-mono text-xs text-slate-300 font-semibold uppercase tracking-wider">
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
