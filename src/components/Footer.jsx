import React from 'react'
import { Github, Linkedin } from 'lucide-react'

export default function Footer({ footerData }) {
  if (!footerData) return null

  return (
    <footer className="relative py-12 px-6 bg-theme-bg border-t-2 border-theme-text overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 text-center md:text-left">
        
        {/* Left Side: Copyright (Must be 2026!) */}
        <div className="font-jakarta text-xs font-extrabold text-theme-muted tracking-wide uppercase">
          © {footerData.year} <span className="text-theme-text hover:text-theme-accent transition-colors duration-200">{footerData.name}</span>
          <span className="hidden md:inline mx-2">·</span>
          <span className="block md:inline mt-1 md:mt-0 lowercase font-medium tracking-normal text-[11px] text-theme-muted/80">
            Built with React + Vite + Tailwind
          </span>
        </div>

        {/* Right Side: Social icons */}
        <div className="flex items-center space-x-6">
          <a 
            href={footerData.github} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-theme-text/80 hover:text-theme-accent transition-colors duration-200"
            title="GitHub"
          >
            <Github className="w-5 h-5 transition-transform hover:scale-110 active:scale-95" />
          </a>
          <a 
            href={footerData.linkedin} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-theme-text/80 hover:text-theme-accent transition-colors duration-200"
            title="LinkedIn"
          >
            <Linkedin className="w-5 h-5 transition-transform hover:scale-110 active:scale-95" />
          </a>
        </div>

      </div>
    </footer>
  )
}
