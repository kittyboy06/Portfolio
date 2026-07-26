import React from 'react'
import { Trophy, Award, Medal } from 'lucide-react'
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

  const accentColors = [
    'bg-yellow-400/20 border-yellow-500 text-yellow-600',
    'bg-[#E85D3F]/20 border-[#E85D3F] text-[#E85D3F]',
    'bg-orange-400/20 border-orange-500 text-orange-600',
    'bg-blue-400/20 border-blue-500 text-blue-600',
    'bg-green-400/20 border-green-500 text-green-600',
  ]

  return (
    <section
      id="achievements"
      className="relative py-16 md:py-24 px-4 md:px-12 overflow-hidden border-t-2 border-[#1A1A1A]"
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center">

        {/* Section Heading with Bordered Container */}
        <ScrollReveal speed={0.8}>
          <div className="text-center mb-12 md:mb-16 flex flex-col items-center">
            <span className="font-jakarta text-xs font-extrabold tracking-widest text-[#E85D3F] uppercase bg-[#E85D3F]/10 px-3.5 py-1 rounded-full border-2 border-[#E85D3F]/30 mb-3">
              Trophy Room
            </span>

            <div className="inline-block px-6 md:px-8 py-3 rounded-2xl bg-white border-2 border-[#1A1A1A] offset-shadow-black">
              <h2 className="font-jakarta text-2xl sm:text-3xl md:text-4xl font-black text-[#1A1A1A] uppercase tracking-tight">
                Achievements & Honors
              </h2>
            </div>
          </div>
        </ScrollReveal>

        {/* Achievement Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {achievementsData.map((item, index) => {
            const IconComp = getIcon(item.title)
            const colorClass = accentColors[index % accentColors.length]

            return (
              <ScrollReveal key={index} delay={index * 0.08} speed={1 + (index % 3) * 0.08}>
                <div className="group relative bg-white p-5 md:p-6 rounded-xl border-2 border-[#1A1A1A] offset-shadow-black hover:bg-[#F0EFEB] transition-colors select-none h-full flex flex-col justify-between">
                  {/* Icon + Year Badge */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-10 h-10 rounded-lg border-2 flex items-center justify-center ${colorClass}`}>
                      <IconComp className="w-5 h-5" />
                    </div>
                    <span className="font-jakarta font-black text-xs bg-[#F0EFEB] border-2 border-[#1A1A1A] px-2.5 py-1 rounded-full text-[#666666] tracking-wider">
                      {item.year}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-jakarta font-extrabold text-base md:text-lg text-[#1A1A1A] group-hover:text-[#E85D3F] transition-colors text-left leading-snug">
                    {item.title}
                  </h3>
                </div>
              </ScrollReveal>
            )
          })}
        </div>

      </div>
    </section>
  )
}
