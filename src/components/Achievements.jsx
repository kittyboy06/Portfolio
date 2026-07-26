import React from 'react'
import { Trophy, Award, Medal, Star } from 'lucide-react'
import ScrollReveal from './ScrollReveal'

export default function Achievements({ achievementsData }) {
  if (!achievementsData || achievementsData.length === 0) return null

  const getIcon = (title) => {
    const lower = title.toLowerCase()
    if (lower.includes('1st') || lower.includes('winner') || lower.includes('jury'))
      return Trophy
    if (lower.includes('3rd') || lower.includes('place'))
      return Medal
    return Award
  }

  return (
    <section
      id="achievements"
      className="relative py-16 md:py-24 px-4 md:px-12 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center">

        {/* Section Heading */}
        <ScrollReveal speed={0.8}>
          <div className="text-center mb-12 md:mb-16">
            <span className="font-jakarta text-xs font-extrabold tracking-widest text-amber-400 uppercase px-4 py-1.5 rounded-full glass border border-amber-500/30 shadow-[0_0_15px_rgba(251,191,36,0.2)]">
              AWARDS & RECOGNITION
            </span>
            <h2 className="font-jakarta text-3xl md:text-5xl font-extrabold text-white mt-3 uppercase tracking-tight">
              Achievements
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 mx-auto mt-4 rounded-full shadow-[0_0_12px_rgba(245,158,11,0.8)]"></div>
          </div>
        </ScrollReveal>

        {/* Achievement Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {achievementsData.map((item, index) => {
            const IconComp = getIcon(item.title)

            return (
              <ScrollReveal key={index} delay={index * 0.08} speed={1 + (index % 3) * 0.08}>
                <div className="group glass glass-hover glass-spotlight p-6 rounded-3xl border border-white/15 shadow-xl relative select-none flex flex-col justify-between h-full">
                  {/* Icon + Year Badge */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 group-hover:bg-amber-500/20 transition-all shadow-[0_0_15px_rgba(245,158,11,0.25)]">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <span className="font-mono font-bold text-xs bg-white/5 border border-white/10 px-3 py-1 rounded-full text-slate-300">
                      {item.year}
                    </span>
                  </div>

                  {/* Title */}
                  <div>
                    <h3 className="font-jakarta font-extrabold text-base md:text-lg text-white uppercase tracking-tight leading-snug group-hover:text-amber-300 transition-colors">
                      {item.title}
                    </h3>
                    <div className="flex items-center space-x-1 mt-3 text-amber-400/70">
                      <Star className="w-3.5 h-3.5 fill-amber-400/50" />
                      <span className="text-[11px] font-mono uppercase text-slate-400">HONOR AWARD</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            )
          })}
        </div>

      </div>
    </section>
  )
}
