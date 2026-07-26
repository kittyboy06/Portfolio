import React from 'react'
import { Sparkles, ArrowUp, Github, Linkedin, Mail, Heart } from 'lucide-react'
import { LeetCodeIcon } from './Navbar'

export default function Footer({ footerData }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleNavClick = (sectionId) => {
    const el = document.getElementById(sectionId)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
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
    <footer className="w-full bg-white border-t-2 border-[#1A1A1A] relative z-10 pt-12 pb-8 px-4 md:px-12 mt-16">
      <div className="max-w-6xl mx-auto flex flex-col space-y-12">
        
        {/* Top Header Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b-2 border-[#E0DFDB]">
          
          {/* Brand & Status */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2.5 font-jakarta font-black text-xl md:text-2xl uppercase tracking-tight text-[#1A1A1A]">
              <span className="w-8 h-8 rounded-full bg-[#E85D3F] border-2 border-[#1A1A1A] flex items-center justify-center text-white shadow-sm">
                <Sparkles className="w-4 h-4 fill-white" />
              </span>
              <span>Afsal Ahmed Khan A</span>
            </div>
            
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#FAFAF8] border-2 border-[#1A1A1A] text-xs font-jakarta font-extrabold text-[#1A1A1A] uppercase tracking-wider offset-shadow-black">
              <span className="w-2 h-2 rounded-full bg-[#E85D3F] animate-ping"></span>
              <span>3rd-Year AIML @ Jerusalem College of Engineering</span>
            </div>
          </div>

          {/* Back to Top Button */}
          <button
            onClick={scrollToTop}
            className="flex items-center space-x-2 px-5 py-3 rounded-xl bg-[#FAFAF8] border-2 border-[#1A1A1A] text-[#1A1A1A] font-jakarta font-extrabold text-xs uppercase tracking-wider offset-shadow-black hover:bg-[#E85D3F] hover:text-white transition-all active:scale-95 cursor-pointer"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        {/* Middle Multi-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          
          {/* Col 1: Bio & Mission */}
          <div className="md:col-span-5 space-y-4">
            <h3 className="font-jakarta font-black text-xs uppercase tracking-widest text-[#E85D3F]">
              Architect & Developer
            </h3>
            <p className="text-sm font-sans text-[#666666] leading-relaxed font-medium">
              Architecting high-impact Android apps, full-stack web products, and intelligent AI systems. Winner of Cipher Quest & PALS Think2Impact Jury Award.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="font-jakarta font-black text-xs uppercase tracking-widest text-[#E85D3F]">
              Quick Navigation
            </h3>
            <div className="grid grid-cols-2 gap-2 font-jakarta font-extrabold text-xs uppercase text-[#1A1A1A]">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className="text-left py-1 hover:text-[#E85D3F] transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Col 3: Connect & Socials */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="font-jakarta font-black text-xs uppercase tracking-widest text-[#E85D3F]">
              Social Channels
            </h3>
            <div className="flex flex-wrap gap-2">
              <a
                href="https://github.com/kittyboy06"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl border-2 border-[#1A1A1A] bg-[#FAFAF8] text-[#1A1A1A] hover:bg-[#E85D3F] hover:text-white transition-all offset-shadow-black"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/afsal-ahmed-khan-a-4b067a288"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl border-2 border-[#1A1A1A] bg-[#FAFAF8] text-[#1A1A1A] hover:bg-[#E85D3F] hover:text-white transition-all offset-shadow-black"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://leetcode.com/u/kittyboy06"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl border-2 border-[#1A1A1A] bg-[#FAFAF8] text-[#1A1A1A] hover:bg-[#E85D3F] hover:text-white transition-all offset-shadow-black"
                title="LeetCode"
              >
                <LeetCodeIcon className="w-4 h-4" />
              </a>
              <a
                href="mailto:afsal.ahmed.khan.a@gmail.com"
                className="p-2.5 rounded-xl border-2 border-[#1A1A1A] bg-[#FAFAF8] text-[#1A1A1A] hover:bg-[#E85D3F] hover:text-white transition-all offset-shadow-black"
                title="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t-2 border-[#E0DFDB] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs font-jakarta font-extrabold text-[#666666] uppercase">
          <p>© {new Date().getFullYear()} Afsal Ahmed Khan A. All rights reserved.</p>
          <div className="flex items-center space-x-1.5">
            <span>Built with React, Tailwind, Lenis & Three.js</span>
            <Heart className="w-3.5 h-3.5 text-[#E85D3F] fill-[#E85D3F] inline" />
          </div>
        </div>

      </div>
    </footer>
  )
}
