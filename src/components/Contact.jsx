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
        
        {/* Section Heading with Bordered Container */}
        <ScrollReveal speed={0.8}>
          <div className="text-center mb-12 md:mb-16 flex flex-col items-center">
            <span className="font-jakarta text-xs font-extrabold tracking-widest text-[#E85D3F] uppercase bg-[#E85D3F]/10 px-3.5 py-1 rounded-full border-2 border-[#E85D3F]/30 mb-3">
              Get in Touch
            </span>

            <div className="inline-block px-6 md:px-8 py-3 rounded-2xl bg-white border-2 border-[#1A1A1A] offset-shadow-black">
              <h2 className="font-jakarta text-2xl sm:text-3xl md:text-4xl font-black text-[#1A1A1A] uppercase tracking-tight">
                Initiate Contact
              </h2>
            </div>
            
            <p className="font-jakarta text-xs md:text-sm text-[#666666] tracking-wider uppercase font-bold mt-3">
              Open for software roles, app projects & AI collaborations
            </p>
          </div>
        </ScrollReveal>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {cards.map((card, index) => {
            const IconComponent = card.icon

            return (
              <ScrollReveal key={card.label} delay={index * 0.08} speed={1 + index * 0.05}>
                <a 
                  href={card.href}
                  target={card.href.startsWith('mailto') ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  className="group relative flex flex-col justify-between h-full bg-white p-6 rounded-2xl border-2 border-[#1A1A1A] offset-shadow-black hover:bg-[#F0EFEB] transition-all overflow-hidden text-left"
                >
                  <div className="space-y-4">
                    {/* Header: Icon + Badge */}
                    <div className="flex items-center justify-between">
                      <div className="p-2.5 rounded-lg border-2 border-[#1A1A1A] bg-[#FAFAF8] text-[#1A1A1A] group-hover:bg-[#E85D3F] group-hover:text-white transition-colors duration-200">
                        <IconComponent className="w-5 h-5" />
                      </div>

                      <span className="font-mono text-[9px] font-extrabold uppercase tracking-wider text-[#666666] bg-[#F0EFEB] border border-[#E0DFDB] px-2 py-0.5 rounded-full">
                        {card.badgeText}
                      </span>
                    </div>

                    {/* Label & Value */}
                    <div>
                      <span className="font-jakarta text-xs font-extrabold uppercase text-[#E85D3F] tracking-wider">
                        {card.label}
                      </span>
                      <p className="font-jakarta font-black text-sm md:text-base text-[#1A1A1A] group-hover:text-[#E85D3F] transition-colors truncate mt-1">
                        {card.value}
                      </p>
                    </div>
                  </div>

                  {/* Action Link Footer */}
                  <div className="flex items-center justify-between pt-4 mt-4 border-t border-[#E0DFDB] font-jakarta text-xs font-extrabold uppercase tracking-wider text-[#1A1A1A] group-hover:text-[#E85D3F]">
                    <span>Connect</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
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
