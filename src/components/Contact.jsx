import React from 'react'
import { Mail, Github, Linkedin, ArrowUpRight } from 'lucide-react'
import { LeetCodeIcon } from './Navbar'
import ScrollReveal from './ScrollReveal'

export default function Contact({ contactData }) {
  if (!contactData) return null

  const cards = [
    {
      label: "Direct Email",
      value: contactData.email,
      href: `mailto:${contactData.email}`,
      icon: Mail,
      badgeText: "FAST RESPOND"
    },
    {
      label: "GitHub",
      value: "kittyboy06",
      href: contactData.github,
      icon: Github,
      badgeText: "CODEBASE"
    },
    {
      label: "LinkedIn",
      value: "Afsal Ahmed Khan A",
      href: contactData.linkedin,
      icon: Linkedin,
      badgeText: "CONNECT"
    },
    {
      label: "LeetCode",
      value: "kittyboy06",
      href: contactData.leetcode,
      icon: LeetCodeIcon,
      badgeText: "SOLVING"
    }
  ]

  return (
    <section 
      id="contact" 
      className="relative py-16 md:py-24 px-4 md:px-12 overflow-hidden border-t-2 border-[#1A1A1A]"
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        {/* Section Heading */}
        <ScrollReveal speed={0.8}>
          <div className="text-center mb-12 md:mb-16">
            <span className="font-jakarta text-xs font-extrabold tracking-widest text-[#E85D3F] uppercase bg-[#E85D3F]/10 px-3 py-1 rounded border-2 border-[#E85D3F]/30">
              Get in Touch
            </span>
            <h2 className="font-jakarta text-3xl md:text-5xl font-black text-[#1A1A1A] mt-3 uppercase tracking-tight">
              Initiate Contact
            </h2>
            <p className="font-jakarta text-xs md:text-sm text-[#666666] tracking-wider uppercase font-bold mt-2">
              Open for software roles, app projects & AI collaborations
            </p>
            <div className="w-16 h-[4px] bg-[#E85D3F] mx-auto mt-4 rounded-full"></div>
          </div>
        </ScrollReveal>

        {/* 4 Clickable Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full">
          {cards.map((card, index) => {
            const IconComp = card.icon
            return (
              <ScrollReveal key={index} delay={index * 0.08} speed={1 + index * 0.05}>
                <a 
                  href={card.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex flex-col justify-between h-full rounded-2xl border-2 border-[#1A1A1A] bg-white p-6 offset-shadow-black hover:bg-[#F0EFEB] transition-all cursor-pointer"
                >
                  <div className="space-y-4">
                    {/* Icon + Badge */}
                    <div className="flex items-center justify-between">
                      <div className="p-2.5 rounded-lg border-2 border-[#1A1A1A] bg-[#FAFAF8] text-[#1A1A1A] group-hover:bg-[#E85D3F] group-hover:text-white transition-colors">
                        <IconComp className="w-5 h-5" />
                      </div>
                      
                      <span className="font-jakarta text-[9px] font-extrabold uppercase tracking-wider text-[#666666] bg-[#F0EFEB] border border-[#E0DFDB] px-2 py-0.5 rounded">
                        {card.badgeText}
                      </span>
                    </div>

                    {/* Detail */}
                    <div className="space-y-1 pt-2">
                      <span className="font-jakarta text-[10px] text-[#666666] font-extrabold uppercase tracking-widest block">
                        {card.label}
                      </span>
                      <span className="font-jakarta font-black text-sm text-[#1A1A1A] group-hover:text-[#E85D3F] transition-colors break-all leading-snug">
                        {card.value}
                      </span>
                    </div>
                  </div>

                  {/* Card Footer Link Trigger */}
                  <div className="flex items-center justify-between pt-4 mt-6 border-t border-[#E0DFDB] text-xs font-jakarta font-extrabold uppercase text-[#1A1A1A] group-hover:text-[#E85D3F] transition-colors">
                    <span>Connect</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </a>
              </ScrollReveal>
            )
          })}
        </div>

      </div>
    </section>
  )
}
