import React, { useRef } from 'react'
import { 
  Github, 
  ExternalLink, 
  Box, 
  Gamepad2, 
  Landmark, 
  Laptop, 
  Cpu, 
  Music
} from 'lucide-react'
import ScrollReveal from './ScrollReveal'

// Helper to assign an icon to each project
const getProjectIcon = (id) => {
  switch (id) {
    case 'arise-irl':
      return Gamepad2
    case 'neurocart':
      return Cpu
    case 'magic-embroidery':
      return Landmark
    case 'aash-player':
      return Music
    case 'brainos':
      return Laptop
    default:
      return Box
  }
}

export default function Projects({ projectsData }) {
  if (!projectsData || projectsData.length === 0) return null

  const base = import.meta.env.BASE_URL || '/'
  const neurocartImg = `${base}neurocart_mockup.png`

  return (
    <section 
      id="projects" 
      className="relative py-16 md:py-24 px-4 md:px-12 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        {/* Section Heading */}
        <ScrollReveal speed={0.8}>
          <div className="text-center mb-12 md:mb-16">
            <span className="font-jakarta text-xs font-extrabold tracking-widest gradient-text-cyan uppercase px-4 py-1.5 rounded-full glass border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
              PORTFOLIO SHOWCASE
            </span>
            <h2 className="font-jakarta text-3xl md:text-5xl font-extrabold text-white mt-3 uppercase tracking-tight">
              Shipped Projects
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 mx-auto mt-4 rounded-full shadow-[0_0_12px_rgba(6,182,212,0.8)]"></div>
          </div>
        </ScrollReveal>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {projectsData.map((project, index) => {
            const IconComp = getProjectIcon(project.id)
            const isCompleted = project.status.toLowerCase() === 'completed'
            const isFeatured = project.id === 'neurocart' // Featured card

            if (isFeatured) {
              return (
                <div 
                  key={`grid-${project.id}`} 
                  className="col-span-1 md:col-span-2 lg:col-span-2 h-full"
                >
                  <ScrollReveal delay={0.1} speed={1.1}>
                    {/* Featured Card */}
                    <div className="group glass glass-hover glass-spotlight relative flex flex-col justify-between h-full rounded-3xl border border-white/15 p-6 md:p-8 shadow-xl overflow-hidden">
                      {/* Status Badge */}
                      <span 
                        className={`absolute top-6 right-6 font-mono font-bold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full border ${
                          isCompleted 
                            ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400'
                            : 'bg-amber-500/10 border-amber-500/40 text-amber-400'
                        }`}
                      >
                        {project.status}
                      </span>

                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center h-full w-full">
                        {/* Left: Content */}
                        <div className="md:col-span-7 space-y-4 text-left">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                              <IconComp className="w-5 h-5" />
                            </div>
                            <span className="font-jakarta text-xs uppercase font-bold tracking-wider text-cyan-400">
                              FEATURED SYSTEM
                            </span>
                          </div>

                          <h3 className="font-jakarta font-extrabold text-2xl md:text-3xl text-white uppercase tracking-tight group-hover:text-cyan-300 transition-colors">
                            {project.title}
                          </h3>

                          <p className="text-slate-300 font-sans text-sm md:text-base leading-relaxed">
                            {project.description}
                          </p>

                          {/* Tech tags */}
                          <div className="flex flex-wrap gap-2 pt-2">
                            {project.tags.map((tag) => (
                              <span 
                                key={tag} 
                                className="font-mono text-[10px] font-semibold uppercase tracking-wider bg-white/5 px-3 py-1 rounded-full border border-white/10 text-slate-300"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          {/* Links */}
                          {(project.github || project.demo) && (
                            <div className="flex items-center space-x-6 pt-4 border-t border-white/10">
                              {project.github && (
                                <a 
                                  href={project.github} 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className="flex items-center space-x-2 font-jakarta font-bold text-xs uppercase text-slate-300 hover:text-cyan-400 transition-colors"
                                >
                                  <Github className="w-4 h-4" />
                                  <span>Repository</span>
                                </a>
                              )}
                              {project.demo && (
                                <a 
                                  href={project.demo} 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className="flex items-center space-x-2 font-jakarta font-bold text-xs uppercase text-slate-300 hover:text-cyan-400 transition-colors"
                                >
                                  <ExternalLink className="w-4 h-4" />
                                  <span>Live Demo</span>
                                </a>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Right: Mockup Preview */}
                        <div className="md:col-span-5 flex justify-center pt-4 md:pt-0">
                          <div className="w-full max-w-[220px] h-52 rounded-2xl border border-white/15 bg-slate-900 overflow-hidden relative shadow-lg group-hover:scale-105 transition-transform">
                            <img 
                              src={neurocartImg} 
                              alt={`${project.title} Preview`}
                              className="w-full h-full object-cover" 
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                </div>
              )
            }

            // Regular Cards
            return (
              <ScrollReveal key={`grid-${project.id}`} delay={index * 0.08} speed={1 + (index % 3) * 0.08}>
                <div className="group glass glass-hover glass-spotlight relative flex flex-col justify-between h-full rounded-3xl border border-white/15 p-6 shadow-xl overflow-hidden">
                  {/* Status Badge */}
                  <span 
                    className={`absolute top-6 right-6 font-mono font-bold text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                      isCompleted 
                        ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400'
                        : 'bg-amber-500/10 border-amber-500/40 text-amber-400'
                    }`}
                  >
                    {project.status}
                  </span>

                  <div className="space-y-4 text-left">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 group-hover:bg-cyan-500/20 group-hover:border-cyan-400/40 group-hover:text-cyan-400 transition-all">
                      <IconComp className="w-5 h-5" />
                    </div>

                    <h3 className="font-jakarta font-extrabold text-xl text-white group-hover:text-cyan-300 transition-colors uppercase tracking-tight">
                      {project.title}
                    </h3>

                    <p className="text-slate-300 font-sans text-xs md:text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="space-y-4 mt-6">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span 
                          key={tag} 
                          className="font-mono text-[9px] font-semibold uppercase tracking-wider bg-white/5 px-2.5 py-0.5 rounded-full border border-white/10 text-slate-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {(project.github || project.demo) && (
                      <div className="flex items-center space-x-4 pt-3 border-t border-white/10">
                        {project.github && (
                          <a 
                            href={project.github} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="flex items-center space-x-1.5 font-jakarta font-bold text-xs uppercase text-slate-300 hover:text-cyan-400 transition-colors"
                          >
                            <Github className="w-3.5 h-3.5" />
                            <span>Source</span>
                          </a>
                        )}
                        {project.demo && (
                          <a 
                            href={project.demo} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="flex items-center space-x-1.5 font-jakarta font-bold text-xs uppercase text-slate-300 hover:text-cyan-400 transition-colors"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>Demo</span>
                          </a>
                        )}
                      </div>
                    )}
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
