import React from 'react'
import { motion } from 'framer-motion'
import { BadgeCheck, GraduationCap } from 'lucide-react'

export default function Certifications({ certificationsData }) {
  if (!certificationsData || certificationsData.length === 0) return null

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', damping: 15 }
    }
  }

  return (
    <section
      id="certifications"
      className="relative py-12 md:py-24 px-4 md:px-12 bg-theme-bg border-t-2 border-theme-text overflow-hidden"
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center">

        {/* Section Heading */}
        <div className="text-center mb-8 md:mb-16">
          <span className="font-jakarta text-xs font-extrabold tracking-widest text-emerald-400 uppercase bg-emerald-400/10 px-3 py-1 rounded border-2 border-emerald-400/30">
            Skill Tree
          </span>
          <h2 className="font-jakarta text-3xl md:text-5xl font-black text-theme-text mt-3 uppercase tracking-tight">
            Certifications
          </h2>
          <div className="w-16 h-[4px] bg-emerald-400 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Certifications Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 w-full"
        >
          {certificationsData.map((cert, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="group bg-theme-card p-5 rounded-xl border-2 border-theme-text offset-shadow-black hover:bg-theme-surface transition-colors select-none flex items-start space-x-4"
            >
              {/* Badge Icon */}
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-emerald-400/15 border-2 border-emerald-400/30 flex items-center justify-center">
                <BadgeCheck className="w-5 h-5 text-emerald-400" />
              </div>

              {/* Text */}
              <div className="min-w-0">
                <h3 className="font-jakarta font-black text-sm uppercase text-theme-text tracking-wide leading-snug group-hover:text-emerald-400 transition-colors">
                  {cert.name}
                </h3>
                <div className="flex items-center space-x-1.5 mt-2">
                  <GraduationCap className="w-3 h-3 text-theme-muted flex-shrink-0" />
                  <span className="font-jakarta font-extrabold text-[10px] text-theme-muted tracking-widest uppercase">
                    {cert.issuer}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
