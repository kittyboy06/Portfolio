import React from 'react'
import { Heart, Sparkles, ArrowUp } from 'lucide-react'

export default function Footer({ footerData }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="w-full py-8 px-4 md:px-12 border-t-2 border-[#1A1A1A] bg-white relative z-10">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Left: Brand & Built Credit */}
        <div className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-3 text-center sm:text-left">
          <div className="flex items-center space-x-2 font-jakarta font-black text-sm uppercase tracking-wider text-[#1A1A1A]">
            <Sparkles className="w-4 h-4 text-[#E85D3F]" />
            <span>Afsal Ahmed Khan A</span>
          </div>
          <span className="hidden sm:inline text-[#666666]">•</span>
          <p className="text-xs text-[#666666] font-sans font-medium">
            © {new Date().getFullYear()} • Built with React, Lenis & Three.js
          </p>
        </div>

        {/* Right: Back to Top Button */}
        <button
          onClick={scrollToTop}
          className="flex items-center space-x-1.5 font-jakarta font-extrabold text-xs uppercase px-4 py-2 rounded-full bg-[#FAFAF8] text-[#1A1A1A] border-2 border-[#1A1A1A] offset-shadow-black hover:bg-[#E85D3F] hover:text-white transition-all active:scale-95 cursor-pointer"
        >
          <span>Top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>

      </div>
    </footer>
  )
}
