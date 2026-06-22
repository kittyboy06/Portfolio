import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, Github, Linkedin, FileText } from 'lucide-react'

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
  const location = useLocation()
  const navigate = useNavigate()

  if (!heroData) return null

  const handleNavClick = (sectionId) => {
    setMobileMenuOpen(false)
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

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-theme-bg/85 backdrop-blur-md border-b-2 border-theme-text py-4 px-6 md:px-12 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo (Bold display) */}
        <Link 
          to="/" 
          onClick={() => handleNavClick('hero')} 
          className="font-jakarta text-xl md:text-2xl font-black text-theme-text tracking-tight uppercase hover:text-theme-accent transition-colors duration-200"
        >
          Afsal Ahmed
        </Link>

        {/* Desktop Main Links */}
        <div className="hidden md:flex items-center space-x-8 font-jakarta font-extrabold text-sm tracking-wider">
          {['about', 'work', 'experience', 'contact'].map((item) => (
            <button
              key={item}
              onClick={() => handleNavClick(item)}
              className="text-theme-text/80 hover:text-theme-accent transition-colors duration-200 uppercase relative group"
            >
              {item}
              <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-theme-accent transition-all duration-200 group-hover:w-full"></span>
            </button>
          ))}
        </div>

        {/* Desktop Socials & Resume (Handcrafted Offset style) */}
        <div className="hidden md:flex items-center space-x-5">
          <a 
            href={heroData.github} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-theme-text/80 hover:text-theme-accent transition-colors duration-200"
            title="GitHub"
          >
            <Github className="w-5 h-5 hover:scale-110 active:scale-95 transition-transform" />
          </a>
          <a 
            href={heroData.linkedin} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-theme-text/80 hover:text-theme-accent transition-colors duration-200"
            title="LinkedIn"
          >
            <Linkedin className="w-5 h-5 hover:scale-110 active:scale-95 transition-transform" />
          </a>
          <a 
            href={heroData.leetcode} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-theme-text/80 hover:text-theme-accent transition-colors duration-200"
            title="LeetCode"
          >
            <LeetCodeIcon className="w-5 h-5 hover:scale-110 active:scale-95 transition-transform" />
          </a>
          <a 
            href={heroData.resumeUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center space-x-2 font-jakarta font-extrabold text-xs uppercase px-4 py-2 rounded-lg border-2 border-theme-text bg-theme-card offset-shadow-black hover:bg-theme-accent hover:text-white transition-colors duration-200"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
          </a>
        </div>

        {/* Mobile Burger Toggle */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-theme-text hover:text-theme-accent transition-colors focus:outline-none"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-[72px] left-0 w-full h-[calc(100vh-72px)] bg-theme-bg/95 backdrop-blur-lg border-t-2 border-theme-text flex flex-col justify-between p-8 z-40 transition-all duration-300">
          <div className="flex flex-col space-y-6 font-jakarta font-extrabold text-lg tracking-widest text-center">
            {['about', 'work', 'experience', 'contact'].map((item) => (
              <button
                key={item}
                onClick={() => handleNavClick(item)}
                className="text-theme-text hover:text-theme-accent transition-colors duration-200 py-2 uppercase border-b-2 border-theme-border"
              >
                {item}
              </button>
            ))}
          </div>

          <div className="flex flex-col items-center space-y-6 pb-12">
            {/* Social Icons */}
            <div className="flex space-x-8">
              <a href={heroData.github} target="_blank" rel="noopener noreferrer" className="text-theme-text hover:text-theme-accent transition-colors">
                <Github className="w-7 h-7" />
              </a>
              <a href={heroData.linkedin} target="_blank" rel="noopener noreferrer" className="text-theme-text hover:text-theme-accent transition-colors">
                <Linkedin className="w-7 h-7" />
              </a>
              <a href={heroData.leetcode} target="_blank" rel="noopener noreferrer" className="text-theme-text hover:text-theme-accent transition-colors">
                <LeetCodeIcon className="w-7 h-7" />
              </a>
            </div>
            {/* Resume Button */}
            <a 
              href={heroData.resumeUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-center space-x-2 w-full font-jakarta font-extrabold text-sm uppercase py-3.5 rounded-lg border-2 border-theme-text bg-theme-card offset-shadow-black hover:bg-theme-accent hover:text-white transition-all duration-200"
            >
              <FileText className="w-4 h-4" />
              <span>Download Resume</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
