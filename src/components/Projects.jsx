import React, { useState } from 'react'
import { 
  Github, 
  ExternalLink, 
  Box, 
  Gamepad2, 
  Landmark, 
  Laptop, 
  Cpu, 
  Music,
  Brain,
  Smartphone,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import ScrollReveal from './ScrollReveal'

const getProjectIcon = (id, category) => {
  if (id.includes('aether') || id.includes('signbridge') || id.includes('neurocart')) return Brain
  if (category === 'Unity Games' || id.includes('fox') || id.includes('platformer') || id.includes('rpg')) return Gamepad2
  if (category === 'Mobile App' || id.includes('arise') || id.includes('wardrobe') || id.includes('aash')) return Smartphone
  if (id.includes('embroidery') || id.includes('attendance') || id.includes('valen')) return Landmark
  if (id.includes('cipher') || id.includes('treasure') || id.includes('console')) return Laptop
  return Box
}

export default function Projects({ projectsData }) {
  const [activeCategory, setActiveCategory] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)
  const ITEMS_PER_PAGE = 6

  if (!projectsData || projectsData.length === 0) return null

  const categories = ['All', 'AI Systems', 'Web & PWA', 'Unity Games', 'Mobile App']

  // Filter projects by active category
  const filteredProjects = activeCategory === 'All'
    ? projectsData
    : projectsData.filter(p => p.category === activeCategory)

  // Calculate Pagination
  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE) || 1
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedProjects = filteredProjects.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  // Reset page when category changes
  const handleCategoryChange = (cat) => {
    setActiveCategory(cat)
    setCurrentPage(1)
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1)
    }
  }

  const base = import.meta.env.BASE_URL || '/'
  const neurocartImg = `${base}neurocart_mockup.png`

  return (
    <section 
      id="projects" 
      className="relative py-16 md:py-24 px-4 md:px-12 overflow-hidden border-t-2 border-[#1A1A1A]"
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        {/* Section Heading with Bordered Container */}
        <ScrollReveal speed={0.8}>
          <div className="text-center mb-6 md:mb-8 flex flex-col items-center">
            <span className="font-jakarta text-xs font-extrabold tracking-widest text-[#E85D3F] uppercase bg-[#E85D3F]/10 px-3.5 py-1 rounded-full border-2 border-[#E85D3F]/30 mb-3">
              Selected Projects Showcase
            </span>

            <div className="inline-block px-6 md:px-8 py-3 rounded-2xl bg-white border-2 border-[#1A1A1A] offset-shadow-black">
              <h2 className="font-jakarta text-2xl sm:text-3xl md:text-4xl font-black text-[#1A1A1A] uppercase tracking-tight">
                Featured Quests ({filteredProjects.length})
              </h2>
            </div>
          </div>
        </ScrollReveal>

        {/* Category Filter Pills & Page Navigation Header */}
        <ScrollReveal delay={0.1}>
          <div className="flex flex-col md:flex-row items-center justify-between w-full gap-4 mb-8 border-b-2 border-[#E0DFDB] pb-6">
            
            {/* Category Pills */}
            <div className="flex flex-wrap justify-center md:justify-start gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`font-jakarta text-xs font-extrabold uppercase tracking-wider px-3.5 py-1.5 rounded-full border-2 transition-all cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-[#E85D3F] border-[#1A1A1A] text-white offset-shadow-black scale-105'
                      : 'bg-white border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#F0EFEB]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Pagination Controls (Header) */}
            {totalPages > 1 && (
              <div className="flex items-center space-x-3 bg-white border-2 border-[#1A1A1A] rounded-xl px-4 py-1.5 offset-shadow-black">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className={`p-1 rounded-lg border border-[#1A1A1A] transition-all ${
                    currentPage === 1 
                      ? 'opacity-30 cursor-not-allowed bg-[#F0EFEB]' 
                      : 'bg-white hover:bg-[#E85D3F] hover:text-white cursor-pointer active:scale-95'
                  }`}
                  aria-label="Previous Page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <span className="font-mono text-xs font-extrabold text-[#1A1A1A] uppercase tracking-wider">
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className={`p-1 rounded-lg border border-[#1A1A1A] transition-all ${
                    currentPage === totalPages 
                      ? 'opacity-30 cursor-not-allowed bg-[#F0EFEB]' 
                      : 'bg-white hover:bg-[#E85D3F] hover:text-white cursor-pointer active:scale-95'
                  }`}
                  aria-label="Next Page"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

          </div>
        </ScrollReveal>

        {/* Compact Grid Layout (Max 6 Items per Page) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full min-h-[420px]">
          {paginatedProjects.map((project, index) => {
            const IconComp = getProjectIcon(project.id, project.category)
            const isCompleted = project.status.toLowerCase() === 'completed'
            const isFeatured = project.id === 'neurocart' && activeCategory === 'All' && currentPage === 1

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
              <ScrollReveal key={`grid-${project.id}`} delay={index * 0.05} speed={1 + (index % 3) * 0.05}>
                <div className="group relative flex flex-col justify-between h-full rounded-2xl border-2 border-[#1A1A1A] bg-white p-6 offset-shadow-black hover:bg-[#F0EFEB] overflow-hidden">
                  {/* Status & Category Badge */}
                  <div className="flex items-center justify-between">
                    <span className="font-jakarta font-extrabold text-[9px] uppercase tracking-wider text-[#4F46E5] bg-[#4F46E5]/10 px-2 py-0.5 rounded border border-[#4F46E5]/30">
                      {project.category || 'Software'}
                    </span>

                    <span 
                      className={`font-jakarta font-extrabold text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-full border-2 ${
                        isCompleted 
                          ? 'bg-emerald-500/10 border-emerald-500 text-emerald-600'
                          : 'bg-amber-500/10 border-amber-500/60 text-amber-600'
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>

                  <div className="space-y-3 text-left mt-3">
                    <div className="p-2.5 rounded-lg border-2 border-[#1A1A1A] bg-[#FAFAF8] text-[#1A1A1A] w-max group-hover:bg-[#E85D3F] group-hover:text-white transition-colors duration-200">
                      <IconComp className="w-5 h-5" />
                    </div>

                    <h3 className="font-jakarta font-black text-lg md:text-xl text-[#1A1A1A] group-hover:text-[#E85D3F] transition-colors uppercase tracking-wide">
                      {project.title}
                    </h3>

                    <p className="text-[#666666] font-sans text-xs md:text-sm leading-relaxed font-medium line-clamp-3">
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

        {/* Bottom Pagination Controls */}
        {totalPages > 1 && (
          <ScrollReveal delay={0.2}>
            <div className="flex items-center justify-center space-x-4 mt-10">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={`flex items-center space-x-2 font-jakarta font-extrabold text-xs uppercase px-5 py-2.5 rounded-xl border-2 border-[#1A1A1A] offset-shadow-black transition-all ${
                  currentPage === 1 
                    ? 'opacity-30 cursor-not-allowed bg-[#F0EFEB]' 
                    : 'bg-white hover:bg-[#E85D3F] hover:text-white cursor-pointer active:scale-95'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Prev Page</span>
              </button>

              {/* Page Number Dots */}
              <div className="flex items-center space-x-2 px-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                  <button
                    key={num}
                    onClick={() => setCurrentPage(num)}
                    className={`w-3 h-3 rounded-full transition-all border border-[#1A1A1A] cursor-pointer ${
                      currentPage === num 
                        ? 'bg-[#E85D3F] scale-125' 
                        : 'bg-white hover:bg-[#E85D3F]/40'
                    }`}
                    aria-label={`Go to page ${num}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`flex items-center space-x-2 font-jakarta font-extrabold text-xs uppercase px-5 py-2.5 rounded-xl border-2 border-[#1A1A1A] offset-shadow-black transition-all ${
                  currentPage === totalPages 
                    ? 'opacity-30 cursor-not-allowed bg-[#F0EFEB]' 
                    : 'bg-white hover:bg-[#E85D3F] hover:text-white cursor-pointer active:scale-95'
                }`}
              >
                <span>Next Page</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </ScrollReveal>
        )}

      </div>
    </section>
  )
}
