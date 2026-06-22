import React from 'react'
import { motion } from 'framer-motion'
import { Mail, Github, Linkedin, ArrowUpRight } from 'lucide-react'
import { LeetCodeIcon } from './Navbar'

export default function Contact({ contactData }) {
  if (!contactData) return null

  const cards = [
    {
      label: "Email",
      value: contactData.email,
      href: `mailto:${contactData.email}`,
      icon: Mail,
      accentBorder: "group-hover:border-theme-accent offset-shadow-accent",
      iconColor: "text-theme-accent",
      badgeText: "Write scroll"
    },
    {
      label: "GitHub",
      value: "kittyboy06",
      href: contactData.github,
      icon: Github,
      accentBorder: "group-hover:border-theme-secondary offset-shadow-black",
      iconColor: "text-theme-secondary",
      badgeText: "Repositories"
    },
    {
      label: "LinkedIn",
      value: "Afsal Ahmed Khan A",
      href: contactData.linkedin,
      icon: Linkedin,
      accentBorder: "group-hover:border-theme-secondary offset-shadow-black",
      iconColor: "text-theme-secondary",
      badgeText: "Professional"
    },
    {
      label: "LeetCode",
      value: "kittyboy06",
      href: contactData.leetcode,
      icon: LeetCodeIcon,
      accentBorder: "group-hover:border-theme-accent offset-shadow-accent",
      iconColor: "text-theme-accent",
      badgeText: "Solve Quests"
    }
  ]

  // Container variants
  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', damping: 15 }
    }
  }

  return (
    <section 
      id="contact" 
      className="relative py-12 md:py-24 px-4 md:px-12 bg-theme-bg border-t-2 border-theme-text overflow-hidden"
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        {/* Section Heading */}
        <div className="text-center mb-8 md:mb-16">
          <span className="font-jakarta text-xs font-extrabold tracking-widest text-theme-accent uppercase bg-theme-accent/10 px-3 py-1 rounded border-2 border-theme-accent/30">
            Dungeon Exit
          </span>
          <h2 className="font-jakarta text-3xl md:text-5xl font-black text-theme-text mt-3 uppercase tracking-tight">
            Let's build something.
          </h2>
          <p className="font-jakarta text-xs md:text-sm text-theme-muted tracking-widest uppercase mt-2 font-bold">
            Reach me anywhere
          </p>
          <div className="w-16 h-[4px] bg-theme-accent mx-auto mt-4 rounded-full"></div>
        </div>

        {/* 4 Clickable Grid Cards (No Form) */}
        <motion.div 
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 w-full max-w-2xl md:max-w-none mx-auto"
        >
          {cards.map((card, index) => {
            const IconComp = card.icon
            return (
              <motion.div 
                key={index}
                variants={cardVariants}
                className="h-full"
              >
                <a 
                  href={card.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative flex flex-col justify-between h-full rounded-2xl border-2 border-theme-text bg-theme-card p-4 md:p-6 transition-all duration-300 overflow-hidden cursor-pointer ${card.accentBorder}`}
                >
                  <div className="space-y-4">
                    {/* Top Row: Icon & arrow */}
                    <div className="flex items-center justify-between">
                      <div className={`p-2.5 rounded-lg border-2 border-theme-text bg-theme-surface ${card.iconColor} group-hover:bg-theme-accent group-hover:text-white transition-colors duration-200`}>
                        <IconComp className="w-5 h-5" />
                      </div>
                      
                      <span className="font-jakarta font-extrabold text-[8px] uppercase tracking-wider text-theme-muted group-hover:text-theme-text transition-colors">
                        {card.badgeText}
                      </span>
                    </div>

                    {/* Content Detail */}
                    <div className="space-y-1 pt-2">
                      <span className="font-jakarta font-extrabold text-[10px] text-theme-muted uppercase tracking-widest block">
                        {card.label}
                      </span>
                      <span className="font-sans font-extrabold text-sm text-theme-text group-hover:text-theme-accent transition-colors duration-200 break-all leading-snug">
                        {card.value}
                      </span>
                    </div>
                  </div>

                  {/* Open Link Link Card Footer */}
                  <div className="flex items-center space-x-1.5 pt-4 mt-6 border-t border-theme-border text-[9px] font-jakarta font-extrabold uppercase tracking-wider text-theme-muted group-hover:text-theme-text transition-colors duration-200">
                    <span>Send Message</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </a>
              </motion.div>
            )
          })}
        </motion.div>

      </div>
    </section>
  )
}
