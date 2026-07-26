import React from 'react'
import { motion } from 'framer-motion'
import { BadgeCheck, GraduationCap, Award } from 'lucide-react'

export default function Certifications({ certificationsData }) {
  if (!certificationsData || certificationsData.length === 0) return null

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
      transition: { type: 'spring', damping: 18, stiffness: 120 }
    }
  }

  return (
    <section
      id="certifications"
      className="relative py-16 md:py-24 px-4 md:px-12 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center">

        {/* Section Heading */}
        <div className="text-center mb-12 md:mb-16">
          <span className="font-jakarta text-xs font-extrabold tracking-widest text-emerald-400 uppercase px-4 py-1.5 rounded-full glass border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            VERIFIED CREDENTIALS
          </span>
          <h2 className="font-jakarta text-3xl md:text-5xl font-extrabold text-white mt-3 uppercase tracking-tight">
            Certifications
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-500 mx-auto mt-4 rounded-full shadow-[0_0_12px_rgba(16,185,129,0.8)]"></div>
        </div>

        {/* Certifications Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
        >
          {certificationsData.map((cert, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="group glass glass-hover p-6 rounded-3xl border border-white/15 shadow-xl select-none flex items-start space-x-4"
            >
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
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
