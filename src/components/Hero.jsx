import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Download, Github, Linkedin, Mail, Code2, Sparkles, Terminal, Box } from 'lucide-react'
import { LeetCodeIcon } from './Navbar'
import ThreeScene from './ThreeScene'

// Typewriter Component for smooth role cycling
function Typewriter({ roles }) {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [typingSpeed, setTypingSpeed] = useState(100)

  useEffect(() => {
    if (!roles || roles.length === 0) return

    const handleType = () => {
      const fullRole = roles[currentRoleIndex]
      
      if (!isDeleting) {
        // Typing
        setCurrentText(fullRole.substring(0, currentText.length + 1))
        setTypingSpeed(80)

        if (currentText === fullRole) {
          setIsDeleting(false)
          setTypingSpeed(2200)
          setIsDeleting(true)
        }
      } else {
        // Deleting
        setCurrentText(fullRole.substring(0, currentText.length - 1))
        setTypingSpeed(40)

        if (currentText === '') {
          setIsDeleting(false)
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length)
          setTypingSpeed(400)
        }
      }
    }

    const timer = setTimeout(handleType, typingSpeed)
    return () => clearTimeout(timer)
  }, [currentText, isDeleting, currentRoleIndex, roles, typingSpeed])

  return (
    <span className="gradient-text-cyan font-jakarta inline-block font-extrabold tracking-wide select-none drop-shadow-[0_0_12px_rgba(6,182,212,0.4)]">
      {currentText}
      <span className="inline-block w-[3px] h-5 ml-1 bg-cyan-400 animate-pulse"></span>
    </span>
  )
}

export default function Hero({ heroData }) {
  if (!heroData) return null

  const handleScrollToProjects = () => {
    const el = document.getElementById('projects')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12
      }
    }
  }

  const childVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', damping: 18, stiffness: 120 }
    }
  }

  return (
    <section 
      id="hero" 
      className="relative min-h-[90vh] w-full flex items-center justify-center overflow-hidden py-12 px-4 md:px-12"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center w-full z-10">
        
        {/* Left Side: Copy and CTAs */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col items-start text-left space-y-6"
        >
          {/* Eyebrow Status Badge */}
          <motion.div 
            variants={childVariants}
            className="inline-flex items-center space-x-2.5 px-4 py-2 rounded-full glass border border-cyan-500/30 text-xs font-bold text-cyan-400 font-jakarta uppercase tracking-wider shadow-[0_0_15px_rgba(6,182,212,0.25)]"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>AVAILABLE FOR BUILD & COLLAB</span>
          </motion.div>

          {/* Headline */}
          <motion.div variants={childVariants} className="space-y-3">
            <h1 className="font-jakarta text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.15]">
              Turning ideas into <br />
              <span className="gradient-text-hero">high-impact products.</span>
            </h1>
            
            {/* Roles cycling */}
            <div className="flex items-center space-x-2.5 text-base md:text-xl text-slate-400 uppercase font-bold tracking-wider font-jakarta pt-1">
              <Code2 className="w-5 h-5 text-indigo-400" />
              <span>I build</span>
              <Typewriter roles={heroData.roles} />
            </div>
          </motion.div>

          {/* Subheading / Bio */}
          <motion.p 
            variants={childVariants}
            className="text-base md:text-lg text-slate-300 font-sans leading-relaxed max-w-xl"
          >
            {heroData.tagline || "3rd-year AIML Student at Jerusalem College of Engineering. Winner of Cipher Quest & PALS Think2Impact Jury Award. Architecting Android apps, full-stack web platforms, and AI systems."}
          </motion.p>

          {/* Action Buttons */}
          <motion.div 
            variants={childVariants}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto pt-2"
          >
            <button
              onClick={handleScrollToProjects}
              className="flex items-center justify-center space-x-2.5 w-full sm:w-auto font-jakarta font-bold text-sm uppercase px-8 py-4 rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 text-slate-950 shadow-[0_0_25px_rgba(6,182,212,0.5)] hover:shadow-[0_0_35px_rgba(6,182,212,0.8)] hover:scale-[1.02] active:scale-95 transition-all"
            >
              <span>Explore My Work</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href={heroData.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2.5 w-full sm:w-auto font-jakarta font-bold text-sm uppercase px-8 py-4 rounded-full glass glass-hover text-slate-200 hover:text-white border border-white/20 transition-all"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span>Download Resume</span>
            </a>
          </motion.div>

          {/* Social Links Row */}
          <motion.div 
            variants={childVariants}
            className="flex flex-wrap items-center gap-5 md:gap-8 pt-6 border-t border-white/10 w-full"
          >
            <a 
              href={heroData.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-sm font-jakarta font-semibold text-slate-400 hover:text-cyan-400 transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <a 
              href={heroData.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-sm font-jakarta font-semibold text-slate-400 hover:text-cyan-400 transition-colors"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
            <a 
              href={heroData.leetcode} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-sm font-jakarta font-semibold text-slate-400 hover:text-cyan-400 transition-colors"
            >
              <LeetCodeIcon className="w-4 h-4" />
              <span>LeetCode</span>
            </a>
            <a 
              href={`mailto:${heroData.email}`} 
              className="flex items-center space-x-2 text-sm font-jakarta font-semibold text-slate-400 hover:text-cyan-400 transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>Email</span>
            </a>
          </motion.div>
        </motion.div>

        {/* Right Side: Real WebGL 3D Three.js Animation (Anime.js Style) */}
        <div className="lg:col-span-5 hidden lg:flex flex-col items-center justify-center relative">
          <motion.div 
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', delay: 0.2, stiffness: 100 }}
            className="w-full h-[440px] rounded-3xl glass border border-white/20 p-2 shadow-[0_25px_60px_rgba(0,0,0,0.8)] relative overflow-hidden flex flex-col justify-between"
          >
            {/* Top Bar Label */}
            <div className="flex items-center justify-between px-4 pt-3 z-10">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
                <span className="font-mono text-xs font-bold text-cyan-400 uppercase tracking-wider">
                  REAL 3D WEBGL ENGINE
                </span>
              </div>
              <span className="font-mono text-[10px] text-slate-400 uppercase bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-full">
                THREE.JS CANVAS
              </span>
            </div>

            {/* Interactive 3D WebGL Canvas Scene */}
            <div className="w-full h-[360px] relative">
              <ThreeScene className="w-full h-full" />
            </div>

            {/* Bottom Floating Pill */}
            <div className="px-4 pb-3 flex items-center justify-between text-[11px] font-mono text-slate-400 border-t border-white/10 pt-2 z-10">
              <span className="flex items-center space-x-1.5 text-cyan-300">
                <Sparkles className="w-3.5 h-3.5" />
                <span>MOVE MOUSE TO TILT 3D KNOT</span>
              </span>
              <span>60 FPS</span>
            </div>
          </motion.div>
        </div>
        
      </div>
    </section>
  )
}
