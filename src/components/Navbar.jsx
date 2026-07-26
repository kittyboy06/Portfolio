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
      <div className="bg-[#FAFAF8]/90 backdrop-blur-xl rounded-full px-5 py-3 flex items-center justify-between border-2 border-[#1A1A1A] offset-shadow-black">
        {/* Brand / Logo */}
        <Link 
          to="/" 
          onClick={() => handleNavClick('hero')} 
          className="flex items-center space-x-2.5 font-jakarta text-sm md:text-base font-extrabold tracking-tight group"
        >
          <span className="w-8 h-8 rounded-full bg-[#E85D3F] border border-[#1A1A1A] flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
            <Sparkles className="w-4 h-4 fill-white" />
          </span>
          <span className="text-[#1A1A1A] group-hover:text-[#E85D3F] transition-colors uppercase tracking-wider font-extrabold">
            Afsal Ahmed
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-1 font-jakarta font-extrabold text-xs uppercase tracking-wider bg-[#F0EFEB] p-1 rounded-full border border-[#E0DFDB]">
          {navLinks.map((item) => {
            const isActive = activeSection === item.id
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-4 py-2 rounded-full transition-all duration-200 relative ${
                  isActive 
                    ? 'text-white font-bold bg-[#E85D3F] shadow-[0_2px_8px_rgba(232,93,63,0.4)]' 
                    : 'text-[#666666] hover:text-[#1A1A1A] hover:bg-white'
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
            className="p-2 rounded-full text-[#1A1A1A] hover:text-[#E85D3F] hover:bg-[#F0EFEB] transition-all"
            title="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
          <a 
            href={heroData.linkedin} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="p-2 rounded-full text-[#1A1A1A] hover:text-[#E85D3F] hover:bg-[#F0EFEB] transition-all"
            title="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a 
            href={heroData.leetcode} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="p-2 rounded-full text-[#1A1A1A] hover:text-[#E85D3F] hover:bg-[#F0EFEB] transition-all"
            title="LeetCode"
          >
            <LeetCodeIcon className="w-4 h-4" />
          </a>
          <a 
            href={heroData.resumeUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center space-x-1.5 font-jakarta font-extrabold text-xs uppercase px-4 py-2 rounded-full bg-[#1A1A1A] text-white border border-[#1A1A1A] hover:bg-[#E85D3F] hover:border-[#E85D3F] active:scale-95 transition-all shadow-sm"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>CV</span>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#1A1A1A] hover:text-[#E85D3F] focus:outline-none"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 bg-[#FAFAF8] rounded-3xl p-6 border-2 border-[#1A1A1A] offset-shadow-black flex flex-col space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-2 font-jakarta font-extrabold text-sm uppercase tracking-wider">
            {navLinks.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left px-4 py-2.5 rounded-xl transition-all ${
                  activeSection === item.id
                    ? 'bg-[#E85D3F] text-white font-bold'
                    : 'text-[#1A1A1A] hover:bg-[#F0EFEB]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-[#E0DFDB] flex items-center justify-between">
            <div className="flex space-x-3">
              <a href={heroData.github} target="_blank" rel="noopener noreferrer" className="p-2 text-[#1A1A1A] hover:text-[#E85D3F]">
                <Github className="w-5 h-5" />
              </a>
              <a href={heroData.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 text-[#1A1A1A] hover:text-[#E85D3F]">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href={heroData.leetcode} target="_blank" rel="noopener noreferrer" className="p-2 text-[#1A1A1A] hover:text-[#E85D3F]">
                <LeetCodeIcon className="w-5 h-5" />
              </a>
            </div>
            <a 
              href={heroData.resumeUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center space-x-1.5 font-jakarta font-extrabold text-xs uppercase px-4 py-2.5 rounded-full bg-[#E85D3F] text-white border border-[#1A1A1A]"
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
