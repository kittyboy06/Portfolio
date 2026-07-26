import React from 'react'
import { Github, Linkedin, Sparkles, Heart } from 'lucide-react'

export default function Footer({ footerData }) {
  if (!footerData) return null

  return (
    <footer className="relative py-12 px-6 border-t border-white/10 overflow-hidden bg-slate-950/60 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 text-center md:text-left">
        
        {/* Left Side: Copyright (2026) */}
        <div className="font-jakarta text-xs font-semibold text-slate-400 tracking-wider uppercase flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>© {footerData.year || 2026} <span className="text-white font-extrabold">{footerData.name || "Afsal Ahmed Khan A"}</span></span>
          <span className="hidden md:inline text-slate-600">|</span>
          <span className="hidden md:inline text-slate-400 font-mono text-[11px] lowercase">
            crafted with lenis + anime.js style + react
          </span>
        </div>

        {/* Right Side: Social icons */}
        <div className="flex items-center space-x-5">
          <a 
            href={footerData.github} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="p-2 rounded-full text-slate-400 hover:text-cyan-400 hover:bg-white/5 transition-all"
            title="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
          <a 
            href={footerData.linkedin} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="p-2 rounded-full text-slate-400 hover:text-cyan-400 hover:bg-white/5 transition-all"
            title="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>
        </div>

      </div>
    </footer>
  )
}
