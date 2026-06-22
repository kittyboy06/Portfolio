import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Download, Github, Linkedin, Mail } from 'lucide-react'
import { LeetCodeIcon } from './Navbar'

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
          setTypingSpeed(2000) // Pause for 2s at the end
          setIsDeleting(true)
        }
      } else {
        // Deleting
        setCurrentText(fullRole.substring(0, currentText.length - 1))
        setTypingSpeed(40)

        if (currentText === '') {
          setIsDeleting(false)
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length)
          setTypingSpeed(500) // Pause before next typing
        }
      }
    }

    const timer = setTimeout(handleType, typingSpeed)
    return () => clearTimeout(timer)
  }, [currentText, isDeleting, currentRoleIndex, roles, typingSpeed])

  return (
    <span className="text-theme-accent font-jakarta inline-block font-extrabold tracking-wide select-none">
      {currentText}
      <span className="inline-block w-[3px] h-5 ml-1 bg-theme-accent animate-pulse"></span>
    </span>
  )
}

export default function Hero({ heroData }) {
  if (!heroData) return null

  const handleScrollToProjects = () => {
    const el = document.getElementById('work') // scroll to bento grid section
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  // Animation variants
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
      transition: { type: 'spring', damping: 15 }
    }
  }

  return (
    <section 
      id="hero" 
      className="relative min-h-[calc(100dvh-72px)] w-full flex items-center justify-center bg-theme-bg overflow-hidden py-6 px-4 md:px-12"
    >
      {/* Background Animated Floating Shapes */}
      <div className="absolute top-[20%] left-[10%] w-72 h-72 rounded-full bg-theme-accent/5 blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: '8s' }}></div>
      <div className="absolute bottom-[20%] right-[10%] w-96 h-96 rounded-full bg-theme-secondary/5 blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: '12s' }}></div>
      
      {/* Background dot grid pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#1A1A1A_1.5px,transparent_1.5px)] [background-size:24px_24px]"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-12 items-center w-full z-10 pt-0">
        
        {/* Left Side: Copy and CTAs */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col items-start text-left space-y-6"
        >
          {/* Eyebrow badge */}
          <motion.div 
            variants={childVariants}
            className="flex items-center space-x-2 bg-theme-surface border-2 border-theme-text px-4 py-1.5 rounded-full text-xs font-extrabold text-theme-text font-jakarta uppercase shadow-sm"
          >
            <span>PLAYER CLASS: DEVELOPER</span>
          </motion.div>

          {/* Headline */}
          <motion.div variants={childVariants} className="space-y-1">
            <h1 className="font-jakarta text-5xl sm:text-6xl md:text-7.5xl font-extrabold tracking-tight text-theme-text leading-[1.1]">
              Turning ideas into <span className="underline decoration-theme-accent decoration-4 md:decoration-8 underline-offset-4">real</span> products.
            </h1>
            
            {/* Roles cycling */}
            <div className="flex items-center space-x-2 pt-2 text-sm md:text-base text-theme-muted uppercase font-bold tracking-wider font-jakarta">
              <span>I am an</span>
              <Typewriter roles={heroData.roles} />
            </div>
          </motion.div>

          {/* Subheading / Tech Tagline */}
          <motion.p 
            variants={childVariants}
            className="text-base md:text-lg text-theme-muted font-sans font-medium tracking-wide uppercase max-w-xl"
          >
            Android apps · Web products · AI systems
          </motion.p>

          {/* CTAs */}
          <motion.div 
            variants={childVariants}
            className="flex flex-col sm:flex-row items-center gap-2 md:gap-4 w-full sm:w-auto pt-2"
          >
            <button
              onClick={handleScrollToProjects}
              className="flex items-center justify-center space-x-2.5 w-full sm:w-auto font-jakarta font-extrabold text-xs md:text-sm uppercase px-6 py-3 md:px-8 md:py-4 rounded-lg bg-theme-accent border-2 border-theme-text text-white hover:bg-theme-accent/90 tracking-widest offset-shadow-black transition-all"
            >
              <span>See my work</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href={heroData.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2.5 w-full sm:w-auto font-jakarta font-extrabold text-xs md:text-sm uppercase px-6 py-3 md:px-8 md:py-4 rounded-lg bg-theme-card border-2 border-theme-text text-theme-text tracking-widest hover:bg-theme-surface offset-shadow-black transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Download Resume</span>
            </a>
          </motion.div>

          {/* Social Links Row */}
          <motion.div 
            variants={childVariants}
            className="flex flex-wrap items-center gap-3 md:gap-6 pt-4 md:pt-6 border-t-2 border-theme-border/60 w-full"
          >
            <a 
              href={heroData.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-sm font-jakarta font-extrabold text-theme-text/80 hover:text-theme-accent transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <a 
              href={heroData.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-sm font-jakarta font-extrabold text-theme-text/80 hover:text-theme-accent transition-colors"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
            <a 
              href={heroData.leetcode} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-sm font-jakarta font-extrabold text-theme-text/80 hover:text-theme-accent transition-colors"
            >
              <LeetCodeIcon className="w-4 h-4" />
              <span>LeetCode</span>
            </a>
            <a 
              href={`mailto:${heroData.email}`} 
              className="flex items-center space-x-2 text-sm font-jakarta font-extrabold text-theme-text/80 hover:text-theme-accent transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>Email</span>
            </a>
          </motion.div>
        </motion.div>

        {/* Right Side: Playful Abstract SVG/CSS Illustration */}
        <div className="lg:col-span-5 hidden lg:flex items-center justify-center relative h-[450px]">
          {/* Decorative frame box */}
          <div className="absolute inset-4 border-2 border-theme-text rounded-2xl bg-theme-surface rotate-[-2deg] pointer-events-none offset-shadow-black"></div>
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', delay: 0.3 }}
            className="w-[320px] h-[320px] relative z-10 flex items-center justify-center bg-theme-card border-2 border-theme-text rounded-2xl rotate-[2deg] shadow-sm overflow-hidden"
          >
            {/* Playful software architecture SVG drawing */}
            <svg 
              viewBox="0 0 200 200" 
              className="w-full h-full p-8 text-theme-text"
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5"
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              {/* Outer Grid lines */}
              <line x1="20" y1="20" x2="20" y2="180" strokeDasharray="4 4" className="text-theme-border" />
              <line x1="180" y1="20" x2="180" y2="180" strokeDasharray="4 4" className="text-theme-border" />
              <line x1="20" y1="20" x2="180" y2="20" strokeDasharray="4 4" className="text-theme-border" />
              <line x1="20" y1="180" x2="180" y2="180" strokeDasharray="4 4" className="text-theme-border" />

              {/* Floating central gear or node */}
              <motion.circle 
                cx="100" 
                cy="100" 
                r="30" 
                className="text-theme-accent fill-theme-accent/5" 
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                style={{ originX: '100px', originY: '100px' }}
              />
              <circle cx="100" cy="100" r="10" className="fill-theme-text" />

              {/* Connecting lines */}
              <motion.path 
                d="M100 30 L100 70" 
                animate={{ strokeDashoffset: [0, -20] }}
                transition={{ repeat: Infinity, ease: 'linear', duration: 2 }}
                strokeDasharray="5 5"
              />
              <motion.path 
                d="M100 130 L100 170" 
                animate={{ strokeDashoffset: [0, 20] }}
                transition={{ repeat: Infinity, ease: 'linear', duration: 2 }}
                strokeDasharray="5 5"
              />
              <motion.path 
                d="M30 100 L70 100" 
                animate={{ strokeDashoffset: [0, -20] }}
                transition={{ repeat: Infinity, ease: 'linear', duration: 2 }}
                strokeDasharray="5 5"
              />
              <motion.path 
                d="M130 100 L170 100" 
                animate={{ strokeDashoffset: [0, 20] }}
                transition={{ repeat: Infinity, ease: 'linear', duration: 2 }}
                strokeDasharray="5 5"
              />

              {/* Sub-node squares */}
              <rect x="85" y="10" width="30" height="20" rx="3" className="fill-theme-surface" />
              <rect x="85" y="170" width="30" height="20" rx="3" className="fill-theme-surface" />
              <rect x="10" y="85" width="20" height="30" rx="3" className="fill-theme-surface" />
              <rect x="170" y="85" width="20" height="30" rx="3" className="fill-theme-surface" />

              {/* Little symbols */}
              <text x="91" y="24" className="font-mono text-[8px] font-bold fill-theme-text select-none">UI</text>
              <text x="13" y="103" className="font-mono text-[8px] font-bold fill-theme-text select-none">AI</text>
              <text x="89" y="184" className="font-mono text-[8px] font-bold fill-theme-text select-none">API</text>
              <text x="172" y="103" className="font-mono text-[8px] font-bold fill-theme-text select-none">DB</text>
            </svg>
          </motion.div>
        </div>
        
      </div>
    </section>
  )
}
