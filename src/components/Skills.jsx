import React from 'react'
import { Smartphone, Globe, Gamepad2, Brain, Wrench, CheckCircle2 } from 'lucide-react'
import ScrollReveal from './ScrollReveal'

export default function Skills({ skillsData }) {
  if (!skillsData || !skillsData.categories || skillsData.categories.length === 0) return null

  const categories = skillsData.categories

  const getCategoryIcon = (name) => {
    const lower = name.toLowerCase()
    if (lower.includes('mobile') || lower.includes('android')) return Smartphone
    if (lower.includes('web')) return Globe
    if (lower.includes('game')) return Gamepad2
    if (lower.includes('ai') || lower.includes('backend')) return Brain
    return Wrench
  }

  return (
    <section 
      id="skills" 
      className="relative py-16 md:py-24 px-4 md:px-12 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        {/* Section Heading */}
        <ScrollReveal speed={0.8}>
          <div className="text-center mb-12 md:mb-16">
            <span className="font-jakarta text-xs font-extrabold tracking-widest gradient-text-purple uppercase px-4 py-1.5 rounded-full glass border border-purple-500/30 shadow-[0_0_15px_rgba(139,92,246,0.2)]">
              TECH STACK & TOOLS
            </span>
            <h2 className="font-jakarta text-3xl md:text-5xl font-extrabold text-white mt-3 uppercase tracking-tight">
              Skill Arsenal
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-violet-500 via-indigo-500 to-cyan-400 mx-auto mt-4 rounded-full shadow-[0_0_12px_rgba(139,92,246,0.8)]"></div>
          </div>
        </ScrollReveal>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {categories.map((category, index) => {
            const IconComp = getCategoryIcon(category.name)

            return (
              <ScrollReveal key={category.name} delay={index * 0.08} speed={1 + index * 0.05}>
                <div className="glass glass-hover glass-spotlight p-6 rounded-3xl border border-white/15 shadow-xl flex flex-col h-full justify-between">
                  <div>
                    {/* Category Header */}
                    <div className="flex items-center space-x-3 mb-6 pb-3 border-b border-white/10">
                      <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/30 flex items-center justify-center text-violet-400">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <h3 className="font-jakarta text-base uppercase font-extrabold tracking-wider text-white">
                        {category.name}
                      </h3>
                    </div>
                    
                    {/* Skill Badges */}
                    <div className="flex flex-wrap gap-2.5">
                      {category.items.map((skill) => (
                        <div
                          key={skill}
                          className="flex items-center space-x-2 border border-white/15 rounded-full py-1.5 px-4 font-jakarta text-xs font-semibold text-slate-200 bg-white/5 hover:bg-cyan-500/20 hover:border-cyan-400/40 hover:text-cyan-300 transition-all cursor-default select-none shadow-sm"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                          <span>{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            )
          })}
        </div>

      </div>
    </section>
  )
}
