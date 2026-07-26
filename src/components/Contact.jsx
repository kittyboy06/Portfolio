import React from 'react'
import { motion } from 'framer-motion'
import { Mail, Github, Linkedin, ArrowUpRight, Send } from 'lucide-react'
import { LeetCodeIcon } from './Navbar'

export default function Contact({ contactData }) {
  if (!contactData) return null

  const cards = [
    {
      label: "Direct Email",
      value: contactData.email,
      href: `mailto:${contactData.email}`,
      icon: Mail,
      accentGlow: "group-hover:border-cyan-400/50 group-hover:text-cyan-300",
      badgeText: "FAST RESPOND"
    },
    {
      label: "GitHub",
      value: "kittyboy06",
      href: contactData.github,
      icon: Github,
      accentGlow: "group-hover:border-violet-400/50 group-hover:text-violet-300",
      badgeText: "CODEBASE"
    },
    {
      label: "LinkedIn",
      value: "Afsal Ahmed Khan A",
      href: contactData.linkedin,
      icon: Linkedin,
      accentGlow: "group-hover:border-indigo-400/50 group-hover:text-indigo-300",
      badgeText: "CONNECT"
    },
    {
      label: "LeetCode",
      value: "kittyboy06",
      href: contactData.leetcode,
      icon: LeetCodeIcon,
      accentGlow: "group-hover:border-amber-400/50 group-hover:text-amber-300",
      badgeText: "PROBLEM SOLVING"
    }
  ]

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
      transition: { type: 'spring', damping: 18, stiffness: 120 }
    }
  }

  return (
    <section 
      id="contact" 
      className="relative py-16 md:py-24 px-4 md:px-12 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        {/* Section Heading */}
        <div className="text-center mb-12 md:mb-16">
          <span className="font-jakarta text-xs font-extrabold tracking-widest gradient-text-cyan uppercase px-4 py-1.5 rounded-full glass border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            GET IN TOUCH
          </span>
          <h2 className="font-jakarta text-3xl md:text-5xl font-extrabold text-white mt-3 uppercase tracking-tight">
            Let's Build Together
          </h2>
          <p className="font-mono text-xs md:text-sm text-slate-400 tracking-wider uppercase mt-2">
            Open for software roles, app projects & AI collaborations
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 mx-auto mt-4 rounded-full shadow-[0_0_12px_rgba(6,182,212,0.8)]"></div>
        </div>

        {/* 4 Clickable Grid Cards */}
        <motion.div 
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full"
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
                  className={`group glass glass-hover relative flex flex-col justify-between h-full rounded-3xl border border-white/15 p-6 shadow-xl transition-all cursor-pointer ${card.accentGlow}`}
                >
                  <div className="space-y-4">
                    {/* Icon + Badge */}
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-200 group-hover:bg-cyan-500/20 group-hover:border-cyan-400/40 group-hover:text-cyan-400 transition-all">
                        <IconComp className="w-6 h-6" />
                      </div>
                      
                      <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-slate-400 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
                        {card.badgeText}
                      </span>
                    </div>

                    {/* Detail */}
                    <div className="space-y-1 pt-2">
                      <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest block">
                        {card.label}
                      </span>
                      <span className="font-jakarta font-extrabold text-base text-white group-hover:text-cyan-300 transition-colors break-all leading-snug">
                        {card.value}
                      </span>
                    </div>
                  </div>

                  {/* Card Footer Link Trigger */}
                  <div className="flex items-center justify-between pt-4 mt-6 border-t border-white/10 text-xs font-jakarta font-bold uppercase text-slate-400 group-hover:text-cyan-400 transition-colors">
                    <span>Connect</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
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
