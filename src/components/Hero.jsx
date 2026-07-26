import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Download, Github, Linkedin, Mail, Code2, Sparkles, Terminal } from 'lucide-react'
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
    <span className="gradient-text-coral font-jakarta inline-block font-extrabold tracking-wide select-none">
      {currentText}
      <span className="inline-block w-[3px] h-4 sm:h-5 ml-1 bg-[#E85D3F] animate-pulse"></span>
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
        staggerChildren: 0.1
      }
    }
  }

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', damping: 18, stiffness: 120 }
    }
  }

  return (
    <section 
      id="hero" 
      className="relative min-h-[85vh] w-full flex items-center justify-center overflow-hidden pt-20 pb-10 sm:py-12 px-4 sm:px-6 md:px-12"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-12 items-center w-full z-10">
        
        {/* Left Side: Copy and CTAs */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col items-start text-left space-y-4 sm:space-y-6"
        >
          {/* Eyebrow Badge */}
          <motion.div 
            variants={childVariants}
            className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white border-2 border-[#1A1A1A] text-[10px] sm:text-xs font-extrabold text-[#1A1A1A] font-jakarta uppercase tracking-wider offset-shadow-black"
          >
            <span className="w-2 h-2 rounded-full bg-[#E85D3F] animate-ping"></span>
            <Terminal className="w-3.5 h-3.5 text-[#E85D3F]" />
            <span>PLAYER CLASS: DEVELOPER</span>
          </motion.div>

          {/* Headline */}
          <motion.div variants={childVariants} className="space-y-2 sm:space-y-3">
            <h1 className="font-jakarta text-3xl sm:text-5xl md:text-7xl font-black tracking-tight text-[#1A1A1A] leading-[1.12] uppercase">
              Turning ideas into <br />
              <span className="underline decoration-[#E85D3F] decoration-4 md:decoration-8 underline-offset-4 md:underline-offset-8">real</span> products.
            </h1>
            
            {/* Roles cycling */}
            <div className="flex flex-wrap items-center gap-1.5 text-sm sm:text-lg md:text-xl text-[#666666] uppercase font-bold tracking-wider font-jakarta pt-1">
              <Code2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#4F46E5]" />
              <span>I build</span>
              <Typewriter roles={heroData.roles} />
            </div>
          </motion.div>

          {/* Subheading / Bio */}
          <motion.p 
            variants={childVariants}
            className="text-xs sm:text-base md:text-lg text-[#666666] font-sans leading-relaxed max-w-xl font-medium"
          >
            {heroData.tagline || "3rd-year AIML Student at Jerusalem College of Engineering. Winner of Cipher Quest & PALS Think2Impact Jury Award. Building Android apps, full-stack web products, and AI systems."}
          </motion.p>

          {/* Action Buttons */}
          <motion.div 
            variants={childVariants}
            className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto pt-1"
          >
            <button
              onClick={handleScrollToProjects}
              className="flex items-center justify-center space-x-2 w-full sm:w-auto font-jakarta font-black text-xs md:text-sm uppercase px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-[#E85D3F] border-2 border-[#1A1A1A] text-white tracking-widest offset-shadow-black hover:bg-[#D94625] transition-all cursor-pointer"
            >
              <span>See my work</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href={heroData.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 w-full sm:w-auto font-jakarta font-black text-xs md:text-sm uppercase px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-white border-2 border-[#1A1A1A] text-[#1A1A1A] tracking-widest offset-shadow-black hover:bg-[#F0EFEB] transition-all cursor-pointer"
            >
              <Download className="w-4 h-4 text-[#E85D3F]" />
              <span>Download Resume</span>
            </a>
          </motion.div>

          {/* Social Links Row */}
          <motion.div 
            variants={childVariants}
            className="flex flex-wrap items-center gap-4 sm:gap-6 pt-4 sm:pt-6 border-t-2 border-[#E0DFDB] w-full"
          >
            <a 
              href={heroData.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 text-xs sm:text-sm font-jakarta font-extrabold text-[#1A1A1A]/80 hover:text-[#E85D3F] transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <a 
              href={heroData.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 text-xs sm:text-sm font-jakarta font-extrabold text-[#1A1A1A]/80 hover:text-[#E85D3F] transition-colors"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
            <a 
              href={heroData.leetcode} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 text-xs sm:text-sm font-jakarta font-extrabold text-[#1A1A1A]/80 hover:text-[#E85D3F] transition-colors"
            >
              <LeetCodeIcon className="w-4 h-4" />
              <span>LeetCode</span>
            </a>
            <a 
              href={`mailto:${heroData.email}`} 
              className="flex items-center space-x-1.5 text-xs sm:text-sm font-jakarta font-extrabold text-[#1A1A1A]/80 hover:text-[#E85D3F] transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>Email</span>
            </a>
          </motion.div>
        </motion.div>

        {/* Right Side: Real WebGL 3D Three.js Animation in Light Glass Frame (Responsive for Mobile & Android) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative w-full mt-4 lg:mt-0">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', delay: 0.2, stiffness: 100 }}
            className="w-full h-[300px] sm:h-[360px] md:h-[440px] rounded-2xl bg-white border-2 border-[#1A1A1A] p-2 offset-shadow-black relative overflow-hidden flex flex-col justify-between"
          >
            {/* Top Bar Label */}
            <div className="flex items-center justify-between px-3 pt-2 z-10">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E85D3F] animate-ping"></span>
                <span className="font-mono text-[10px] sm:text-xs font-extrabold text-[#1A1A1A] uppercase tracking-wider">
                  REAL 3D WEBGL ENGINE
                </span>
              </div>
              <span className="font-mono text-[9px] sm:text-[10px] text-[#666666] uppercase bg-[#F0EFEB] border border-[#E0DFDB] px-2 py-0.5 rounded-full font-bold">
                THREE.JS
              </span>
            </div>

            {/* Interactive 3D WebGL Canvas Scene */}
            <div className="w-full h-[220px] sm:h-[280px] md:h-[360px] relative">
              <ThreeScene className="w-full h-full" />
            </div>

            {/* Bottom Floating Pill */}
            <div className="px-3 pb-2 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-[#666666] border-t border-[#E0DFDB] pt-1.5 z-10 font-bold">
              <span className="flex items-center space-x-1 text-[#E85D3F] truncate">
                <Sparkles className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="truncate">SCROLL / PINCH TO ZOOM • DRAG TO ROTATE</span>
              </span>
              <span className="hidden sm:inline">60 FPS</span>
            </div>
          </motion.div>
        </div>
        
      </div>
    </section>
  )
}
