import React from 'react'
import { Heart, Sparkles } from 'lucide-react'

export default function Footer({ footerData }) {
  if (!footerData) return null

  return (
    <footer className="w-full py-12 px-4 md:px-12 border-t-2 border-[#1A1A1A] bg-white relative z-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        
        {/* Left: Copyright & Credit */}
        <div className="space-y-1">
          <div className="flex items-center justify-center md:justify-start space-x-2 font-jakarta font-black text-sm uppercase tracking-wider text-[#1A1A1A]">
            <Sparkles className="w-4 h-4 text-[#E85D3F]" />
            <span>Afsal Ahmed Khan A</span>
          </div>
          <p className="text-xs text-[#666666] font-sans font-medium">
            {footerData.text || "Designed & Built with React, Tailwind CSS, Lenis & Three.js"}
          </p>
        </div>

        {/* Right: Year Badge */}
        <div className="flex items-center space-x-2 font-jakarta text-xs font-extrabold uppercase bg-[#FAFAF8] border-2 border-[#1A1A1A] px-4 py-2 rounded-full offset-shadow-black">
          <span>Crafted with</span>
          <Heart className="w-3.5 h-3.5 text-[#E85D3F] fill-[#E85D3F]" />
          <span>© {new Date().getFullYear()}</span>
        </div>

      </div>
    </footer>
  )
}
