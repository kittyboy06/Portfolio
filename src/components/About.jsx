import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Shield, Sparkles, UserCheck } from 'lucide-react'

export default function About({ aboutData }) {
  const [imgExists, setImgExists] = useState(true)
  
  if (!aboutData) return null

  const base = import.meta.env.BASE_URL || '/'
  const avatarUrl = `${base}avatar.jpg`

  const cardContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12
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
      id="about" 
      className="relative py-16 md:py-24 px-4 md:px-12 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        {/* Section Heading */}
        <div className="text-center mb-12 md:mb-16">
          <span className="font-jakarta text-xs font-extrabold tracking-widest gradient-text-cyan uppercase px-4 py-1.5 rounded-full glass border border-cyan-500/30">
            PROFILE & LORE
          </span>
          <h2 className="font-jakarta text-3xl md:text-5xl font-extrabold text-white mt-3 uppercase tracking-tight">
            About Me
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-indigo-500 mx-auto mt-4 rounded-full shadow-[0_0_12px_rgba(6,182,212,0.8)]"></div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center w-full mb-12 md:mb-16">
          
          {/* Left Block: Picture / Avatar Container */}
          <div className="md:col-span-4 flex justify-center">
            <div className="relative w-64 h-64 md:w-72 md:h-72 rounded-3xl glass border border-white/20 p-3 shadow-[0_15px_40px_rgba(0,0,0,0.7)] group overflow-hidden">
              <div className="w-full h-full rounded-2xl overflow-hidden bg-slate-900 flex items-center justify-center relative">
                {imgExists ? (
                  <img 
                    src={avatarUrl} 
                    alt="Afsal Ahmed" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                    onError={() => setImgExists(false)}
                  />
                ) : (
                  <svg 
                    viewBox="0 0 100 100" 
                    className="w-full h-full p-12 text-slate-400" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                  >
                    <circle cx="50" cy="40" r="20" />
                    <path d="M20 85 C20 70, 35 60, 50 60 C65 60, 80 70, 80 85" />
                  </svg>
                )}
                {/* Glow Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                <span className="absolute bottom-3 left-3 px-3 py-1 rounded-full glass border border-cyan-400/40 text-[10px] font-mono text-cyan-300 font-bold uppercase tracking-wider">
                  CHENNAI, INDIA
                </span>
              </div>
            </div>
          </div>

          {/* Right Block: Bio Box */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-8 glass p-6 md:p-8 rounded-3xl border border-white/15 shadow-xl relative"
          >
            <div className="flex items-center space-x-2.5 mb-4 pb-3 border-b border-white/10">
              <Shield className="w-5 h-5 text-cyan-400" />
              <span className="font-jakarta font-bold text-sm uppercase text-slate-200 tracking-wider">
                Developer Biography
              </span>
            </div>

            <p className="text-slate-300 leading-relaxed font-sans text-base md:text-lg tracking-wide font-normal">
              {aboutData.bio}
            </p>
          </motion.div>
        </div>

        {/* 4 Labeled Stats Cards */}
        <motion.div 
          variants={cardContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full"
        >
          {aboutData.stats.map((stat, index) => {
            const isLeetCode = stat.label.toLowerCase().includes('leetcode')

            const cardContent = (
              <div className="glass glass-hover p-6 rounded-2xl border border-white/15 flex flex-col items-center justify-center text-center select-none cursor-pointer h-full group">
                <span className="font-jakarta font-extrabold text-4xl md:text-5xl gradient-text-cyan group-hover:scale-110 transition-transform duration-300">
                  {stat.value}
                </span>
                <span className="font-jakarta font-bold text-xs text-slate-400 tracking-widest uppercase mt-3">
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
