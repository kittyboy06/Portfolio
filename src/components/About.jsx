import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Shield } from 'lucide-react'

export default function About({ aboutData }) {
  const [imgExists, setImgExists] = useState(true)
  
  if (!aboutData) return null

  const base = import.meta.env.BASE_URL || '/'
  const avatarUrl = `${base}avatar.jpg`

  // Timeline / stats configuration
  const cardContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
      id="about" 
      className="relative py-12 md:py-24 px-4 md:px-12 bg-theme-bg border-t-2 border-theme-text overflow-hidden"
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        {/* Section Heading */}
        <div className="text-center mb-8 md:mb-16">
          <span className="font-jakarta text-xs font-extrabold tracking-widest text-theme-accent uppercase bg-theme-accent/10 px-3 py-1 rounded border-2 border-theme-accent/30">
            Player Status
          </span>
          <h2 className="font-jakarta text-3xl md:text-5xl font-black text-theme-text mt-3 uppercase tracking-tight">
            Character Profile
          </h2>
          <div className="w-16 h-[4px] bg-theme-accent mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-center w-full mb-8 md:mb-16">
          
          {/* Left Block: Creative Picture Frame */}
          <div className="md:col-span-4 flex justify-center">
            <div className="relative w-64 h-64 md:w-72 md:h-72 border-2 border-theme-text rounded-2xl bg-theme-surface rotate-[-3deg] offset-shadow-black overflow-hidden">
              {imgExists ? (
                <img 
                  src={avatarUrl} 
                  alt="Afsal Ahmed" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                  onError={() => setImgExists(false)}
                />
              ) : (
                /* Fallback SVG profile sketch */
                <svg 
                  viewBox="0 0 100 100" 
                  className="w-full h-full p-12 text-theme-text" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                >
                  <circle cx="50" cy="40" r="20" />
                  <path d="M20 85 C20 70, 35 60, 50 60 C65 60, 80 70, 80 85" />
                </svg>
              )}
            </div>
          </div>

          {/* Right Block: Bio Lore Box */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-8 bg-theme-card p-6 md:p-8 rounded-2xl border-2 border-theme-text offset-shadow-accent relative"
          >
            <div className="flex items-center space-x-2.5 mb-4 pb-3 border-b-2 border-theme-border">
              <Shield className="w-5 h-5 text-theme-accent" />
              <span className="font-jakarta font-extrabold text-sm uppercase text-theme-text tracking-wider">
                Biography / Character Lore
              </span>
            </div>

            <p className="text-theme-text/90 leading-relaxed font-sans text-base tracking-wide font-medium">
              {aboutData.bio}
            </p>
          </motion.div>
        </div>

        {/* 4 Labeled Stats Row (Below) */}
        <motion.div 
          variants={cardContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 w-full"
        >
          {aboutData.stats.map((stat, index) => {
            const isLeetCode = stat.label.toLowerCase().includes('leetcode')

            const cardContent = (
              <div className="relative group p-4 md:p-6 rounded-xl border-2 border-theme-text bg-theme-card flex flex-col items-center justify-center text-center offset-shadow-black hover:bg-theme-surface select-none cursor-pointer h-full">
                <span className="font-jakarta font-black text-4xl md:text-5xl text-theme-accent group-hover:scale-105 transition-transform duration-200">
                  {stat.value}
                </span>
                <span className="font-jakarta font-extrabold text-[10px] md:text-xs text-theme-muted tracking-widest uppercase mt-2.5">
                  {stat.label}
                </span>
              </div>
            )

            return (
              <motion.div key={index} variants={cardVariants} className="h-full">
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
              </motion.div>
            )
          })}
        </motion.div>

      </div>
    </section>
  )
}
