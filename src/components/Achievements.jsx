import React from 'react'
import { motion } from 'framer-motion'
import { Trophy, Award, Medal } from 'lucide-react'

export default function Achievements({ achievementsData }) {
  if (!achievementsData || achievementsData.length === 0) return null

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', damping: 15 }
    }
  }

  // Pick icon based on title keywords
  const getIcon = (title) => {
    const lower = title.toLowerCase()
    if (lower.includes('1st') || lower.includes('winner') || lower.includes('award'))
      return Trophy
    if (lower.includes('3rd') || lower.includes('place'))
      return Medal
    return Award
  }

  // Accent color per card for visual variety
  const accentColors = [
    'bg-yellow-400/20 border-yellow-400/40 text-yellow-400',
    'bg-theme-accent/20 border-theme-accent/40 text-theme-accent',
    'bg-orange-400/20 border-orange-400/40 text-orange-400',
    'bg-blue-400/20 border-blue-400/40 text-blue-400',
    'bg-green-400/20 border-green-400/40 text-green-400',
  ]

  return (
    <section
      id="achievements"
      className="relative py-12 md:py-24 px-4 md:px-12 bg-theme-bg border-t-2 border-theme-text overflow-hidden"
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center">

        {/* Section Heading */}
        <div className="text-center mb-8 md:mb-16">
          <span className="font-jakarta text-xs font-extrabold tracking-widest text-yellow-400 uppercase bg-yellow-400/10 px-3 py-1 rounded border-2 border-yellow-400/30">
            Trophy Room
          </span>
          <h2 className="font-jakarta text-3xl md:text-5xl font-black text-theme-text mt-3 uppercase tracking-tight">
            Achievements
          </h2>
          <div className="w-16 h-[4px] bg-yellow-400 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Achievement Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full"
        >
          {achievementsData.map((item, index) => {
            const IconComp = getIcon(item.title)
            const colorClass = accentColors[index % accentColors.length]

            return (
              <motion.div
                key={index}
                variants={cardVariants}
                className="group relative bg-theme-card p-5 md:p-6 rounded-xl border-2 border-theme-text offset-shadow-black hover:bg-theme-surface transition-colors select-none"
              >
                {/* Icon + Year Badge */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-10 h-10 rounded-lg border-2 flex items-center justify-center ${colorClass}`}>
                    <IconComp className="w-5 h-5" />
                  </div>
                  <span className="font-jakarta font-black text-xs bg-theme-surface border-2 border-theme-text px-2.5 py-1 rounded-full text-theme-muted tracking-wider">
                    {item.year}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-jakarta font-black text-sm md:text-base uppercase text-theme-text tracking-wide leading-snug group-hover:text-theme-accent transition-colors">
                  {item.title}
                </h3>
              </motion.div>
            )
          })}
        </motion.div>

      </div>
    </section>
  )
}
