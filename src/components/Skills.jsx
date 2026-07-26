import React from 'react'
import { Award } from 'lucide-react'
import ScrollReveal from './ScrollReveal'

export default function Skills({ skillsData }) {
  if (!skillsData || !skillsData.categories || skillsData.categories.length === 0) return null

  const categories = skillsData.categories

  return (
    <section 
      id="skills" 
      className="relative py-16 md:py-24 px-4 md:px-12 overflow-hidden border-t-2 border-[#1A1A1A]"
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        {/* Section Heading with Bordered Container */}
        <ScrollReveal speed={0.8}>
          <div className="text-center mb-12 md:mb-16 flex flex-col items-center">
            <span className="font-jakarta text-xs font-extrabold tracking-widest text-[#4F46E5] uppercase bg-[#4F46E5]/10 px-3.5 py-1 rounded-full border-2 border-[#4F46E5]/30 mb-3">
              Player Talents
            </span>

            <div className="inline-block px-6 md:px-8 py-3 rounded-2xl bg-white border-2 border-[#1A1A1A] offset-shadow-black">
              <h2 className="font-jakarta text-2xl sm:text-3xl md:text-4xl font-black text-[#1A1A1A] uppercase tracking-tight">
                Skill Attributes
              </h2>
            </div>
          </div>
        </ScrollReveal>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {categories.map((category, index) => (
            <ScrollReveal key={category.name} delay={index * 0.08} speed={1 + index * 0.05}>
              <div className="bg-white p-5 md:p-6 rounded-2xl border-2 border-[#1A1A1A] offset-shadow-black flex flex-col h-full justify-between">
                <div>
                  {/* Category label */}
                  <h3 className="font-jakarta text-xs uppercase font-extrabold tracking-widest text-[#E85D3F] mb-4 border-b-2 border-[#E0DFDB] pb-2">
                    {category.name}
                  </h3>
                  
                  {/* Skill Pills */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {category.items.map((skill) => (
                      <div
                        key={skill}
                        className="flex items-center space-x-1.5 border-2 border-[#1A1A1A] rounded-full py-1 px-3.5 font-jakarta text-xs font-extrabold text-[#1A1A1A] hover:bg-[#E85D3F] hover:text-white hover:border-[#E85D3F] transition-colors duration-200 cursor-default select-none bg-[#FAFAF8] shadow-sm"
                      >
                        <Award className="w-3.5 h-3.5" />
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  )
}
