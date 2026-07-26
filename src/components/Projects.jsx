import React from 'react'
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
      className="relative py-16 md:py-24 px-4 md:px-12 overflow-hidden border-t-2 border-[#1A1A1A]"
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        {/* Section Heading */}
        <ScrollReveal speed={0.8}>
          <div className="text-center mb-12 md:mb-16">
            <span className="font-jakarta text-xs font-extrabold tracking-widest text-[#E85D3F] uppercase bg-[#E85D3F]/10 px-3 py-1 rounded border-2 border-[#E85D3F]/30">
              Selected Work
            </span>
            <h2 className="font-jakarta text-3xl md:text-5xl font-black text-[#1A1A1A] mt-3 uppercase tracking-tight">
              Active Quests
            </h2>
            <div className="w-16 h-[4px] bg-[#E85D3F] mx-auto mt-4 rounded-full"></div>
          </div>
        </ScrollReveal>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {projectsData.map((project, index) => {
            const IconComp = getProjectIcon(project.id)
            const isCompleted = project.status.toLowerCase() === 'completed'
            const isFeatured = project.id === 'neurocart'

            if (isFeatured) {
              return (
                <div 
                  key={`grid-${project.id}`} 
                  className="col-span-1 md:col-span-2 lg:col-span-2 h-full"
                >
                  <ScrollReveal delay={0.1} speed={1.1}>
                    {/* Featured Card */}
                    <div className="group relative flex flex-col justify-between h-full rounded-2xl border-2 border-[#1A1A1A] bg-white p-6 md:p-8 offset-shadow-accent hover:bg-[#F0EFEB] overflow-hidden">
                      {/* Status Badge */}
                      <span 
                        className={`absolute top-6 right-6 font-jakarta font-extrabold text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-full border-2 ${
                          isCompleted 
                            ? 'bg-emerald-500/10 border-emerald-500 text-emerald-600'
                            : 'bg-amber-500/10 border-amber-500/60 text-amber-600'
                        }`}
                      >
                        {project.status}
                      </span>

                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center h-full w-full">
                        {/* Left: Content */}
                        <div className="md:col-span-7 space-y-4 text-left">
                          <div className="flex items-center space-x-3">
                            <div className="p-2.5 rounded-lg border-2 border-[#1A1A1A] bg-[#E85D3F] text-white shadow-sm">
                              <IconComp className="w-5 h-5" />
                            </div>
                            <span className="font-jakarta text-xs uppercase font-extrabold tracking-wider text-[#E85D3F]">
                              Featured Project
                            </span>
                          </div>

                          <h3 className="font-jakarta font-black text-2xl md:text-3xl text-[#1A1A1A] uppercase tracking-tight group-hover:text-[#E85D3F] transition-colors">
                            {project.title}
                          </h3>

                          <p className="text-[#666666] font-sans text-sm md:text-base leading-relaxed font-medium">
                            {project.description}
                          </p>

                          {/* Tech tags */}
                          <div className="flex flex-wrap gap-2 pt-2">
                            {project.tags.map((tag) => (
                              <span 
                                key={tag} 
                                className="font-jakarta text-[9px] font-extrabold uppercase tracking-wider bg-[#FAFAF8] px-2.5 py-1 rounded border-2 border-[#1A1A1A] text-[#1A1A1A]"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          {/* Links */}
                          {(project.github || project.demo) && (
                            <div className="flex items-center space-x-6 pt-4 border-t border-[#E0DFDB]">
                              {project.github && (
                                <a 
                                  href={project.github} 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className="flex items-center space-x-1.5 font-jakarta font-extrabold text-xs uppercase text-[#1A1A1A] hover:text-[#E85D3F] transition-colors"
                                >
                                  <Github className="w-4 h-4" />
                                  <span>Source</span>
                                </a>
                              )}
                              {project.demo && (
                                <a 
                                  href={project.demo} 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className="flex items-center space-x-1.5 font-jakarta font-extrabold text-xs uppercase text-[#1A1A1A] hover:text-[#E85D3F] transition-colors"
                                >
                                  <ExternalLink className="w-4 h-4" />
                                  <span>Demo</span>
                                </a>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Right: Mockup Preview */}
                        <div className="md:col-span-5 flex justify-center pt-4 md:pt-0">
                          <div className="w-full max-w-[200px] h-48 border-2 border-[#1A1A1A] rounded-xl bg-[#F0EFEB] overflow-hidden relative shadow-sm rotate-[1deg] group-hover:rotate-0 transition-transform">
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
                <div className="group relative flex flex-col justify-between h-full rounded-2xl border-2 border-[#1A1A1A] bg-white p-6 offset-shadow-black hover:bg-[#F0EFEB] overflow-hidden">
                  {/* Status Badge */}
                  <span 
                    className={`absolute top-6 right-6 font-jakarta font-extrabold text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-full border-2 ${
                      isCompleted 
                        ? 'bg-emerald-500/10 border-emerald-500 text-emerald-600'
                        : 'bg-amber-500/10 border-amber-500/60 text-amber-600'
                    }`}
                  >
                    {project.status}
                  </span>

                  <div className="space-y-4 text-left">
                    <div className="p-2.5 rounded-lg border-2 border-[#1A1A1A] bg-[#FAFAF8] text-[#1A1A1A] w-max group-hover:bg-[#E85D3F] group-hover:text-white transition-colors duration-200">
                      <IconComp className="w-5 h-5" />
                    </div>

                    <h3 className="font-jakarta font-black text-lg md:text-xl text-[#1A1A1A] group-hover:text-[#E85D3F] transition-colors uppercase tracking-wide">
                      {project.title}
                    </h3>

                    <p className="text-[#666666] font-sans text-xs md:text-sm leading-relaxed font-medium">
                      {project.description}
                    </p>
                  </div>

                  <div className="space-y-4 mt-6">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span 
                          key={tag} 
                          className="font-jakarta text-[8px] font-extrabold uppercase tracking-wider bg-[#FAFAF8] px-2 py-0.5 rounded border-2 border-[#1A1A1A] text-[#1A1A1A]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {(project.github || project.demo) && (
                      <div className="flex items-center space-x-4 pt-2 border-t border-[#E0DFDB]">
                        {project.github && (
                          <a 
                            href={project.github} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="flex items-center space-x-1.5 font-jakarta font-extrabold text-[10px] uppercase text-[#1A1A1A] hover:text-[#E85D3F] transition-colors"
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
                            className="flex items-center space-x-1.5 font-jakarta font-extrabold text-[10px] uppercase text-[#1A1A1A] hover:text-[#E85D3F] transition-colors"
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
