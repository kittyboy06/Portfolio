import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, Github, Linkedin, FileText, Sparkles } from 'lucide-react'

// Custom high-fidelity LeetCode SVG Icon
export function LeetCodeIcon({ className = "w-5 h-5" }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      className={className}
    >
      <path d="M13.483 0a1.39 1.39 0 0 0-.996.388l-5.078 4.97a.727.727 0 0 0-.056.062l-4.93 4.919a1.39 1.39 0 0 0 0 1.966l4.898 4.894a1.39 1.39 0 0 0 1.965 0l4.894-4.897c.465-.465.7-.1.7.7l-4.52 4.522c-.48.48-.72 1.048-.72 1.706v1.125c0 .658.24 1.226.72 1.706l4.542 4.542a1.39 1.39 0 0 0 1.965 0l8.99-8.995a1.39 1.39 0 0 0 0-1.966l-8.99-8.995a1.39 1.39 0 0 0-.996-.388zM8.316 4.09h4.302c.658 0 1.226.24 1.706.72.48.48.72 1.048.72 1.706v4.302c0 .658-.24 1.226-.72 1.706l-4.542 4.542c-.48.48-1.048.72-1.706.72H3.99c-.658 0-1.226-.24-1.706-.72a1.39 1.39 0 0 1 0-1.966l4.326-4.321L2.088 7.78a1.39 1.39 0 0 1 0-1.966l4.522-4.522a1.39 1.39 0 0 1 1.706-.504z" />
    </svg>
  )
}

export default function Navbar({ heroData }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const location = useLocation()
  const navigate = useNavigate()

  // Track Active Section on Scroll
  useEffect(() => {
    const navItems = ['hero', 'about', 'achievements', 'skills', 'projects', 'experience', 'contact']
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200
      for (const sectionId of navItems) {
        const el = document.getElementById(sectionId)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!heroData) return null

  const handleNavClick = (sectionId) => {
    setMobileMenuOpen(false)
    setActiveSection(sectionId)
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => {
        const el = document.getElementById(sectionId)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 300)
    } else {
      const el = document.getElementById(sectionId)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const navLinks = [
    { id: 'about', label: 'About' },
    { id: 'achievements', label: 'Awards' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Timeline' },
    { id: 'contact', label: 'Contact' },
  ]

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[92%] max-w-6xl z-50 transition-all duration-300">
      <div className="glass-strong rounded-full px-5 py-3 flex items-center justify-between border border-white/15 shadow-[0_10px_35px_-5px_rgba(0,0,0,0.6)] backdrop-blur-xl">
        {/* Brand / Logo */}
        <Link 
          to="/" 
          onClick={() => handleNavClick('hero')} 
          className="flex items-center space-x-2.5 font-jakarta text-sm md:text-base font-extrabold tracking-tight group"
        >
          <span className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 via-cyan-400 to-violet-500 flex items-center justify-center text-slate-950 shadow-[0_0_12px_rgba(6,182,212,0.6)] group-hover:scale-105 transition-transform">
            <Sparkles className="w-4 h-4 fill-slate-950" />
          </span>
          <span className="text-slate-100 group-hover:text-cyan-400 transition-colors uppercase tracking-wider font-extrabold">
            Afsal
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-1 font-jakarta font-semibold text-xs uppercase tracking-wider bg-white/5 p-1 rounded-full border border-white/10">
          {navLinks.map((item) => {
            const isActive = activeSection === item.id
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-4 py-2 rounded-full transition-all duration-200 relative ${
                  isActive 
                    ? 'text-slate-950 font-bold bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400 shadow-[0_0_15px_rgba(6,182,212,0.5)]' 
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.label}
              </button>
            )
          })}
        </div>

        {/* Desktop Socials & Resume Pill */}
        <div className="hidden md:flex items-center space-x-3">
          <a 
            href={heroData.github} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="p-2 rounded-full text-slate-300 hover:text-cyan-400 hover:bg-white/10 transition-all"
            title="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
          <a 
            href={heroData.linkedin} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="p-2 rounded-full text-slate-300 hover:text-cyan-400 hover:bg-white/10 transition-all"
            title="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a 
            href={heroData.leetcode} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="p-2 rounded-full text-slate-300 hover:text-cyan-400 hover:bg-white/10 transition-all"
            title="LeetCode"
          >
            <LeetCodeIcon className="w-4 h-4" />
          </a>
          <a 
            href={heroData.resumeUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center space-x-1.5 font-jakarta font-bold text-xs uppercase px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.4)] hover:brightness-110 active:scale-95 transition-all"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>CV</span>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-200 hover:text-cyan-400 focus:outline-none"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 glass-strong rounded-3xl p-6 border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-2 font-jakarta font-semibold text-sm uppercase tracking-wider">
            {navLinks.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left px-4 py-2.5 rounded-xl transition-all ${
                  activeSection === item.id
                    ? 'bg-cyan-500/20 text-cyan-400 font-bold border border-cyan-500/30'
                    : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <div className="flex space-x-3">
              <a href={heroData.github} target="_blank" rel="noopener noreferrer" className="p-2 text-slate-300 hover:text-cyan-400">
                <Github className="w-5 h-5" />
              </a>
              <a href={heroData.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 text-slate-300 hover:text-cyan-400">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href={heroData.leetcode} target="_blank" rel="noopener noreferrer" className="p-2 text-slate-300 hover:text-cyan-400">
                <LeetCodeIcon className="w-5 h-5" />
              </a>
            </div>
            <a 
              href={heroData.resumeUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center space-x-1.5 font-jakarta font-bold text-xs uppercase px-4 py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-lg"
            >
              <FileText className="w-4 h-4" />
              <span>Resume</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
