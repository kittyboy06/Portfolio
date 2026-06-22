import React from 'react'
import { motion } from 'framer-motion'
import { Award } from 'lucide-react'

export default function Skills({ skillsData }) {
  if (!skillsData || !skillsData.categories || skillsData.categories.length === 0) return null

  const categories = skillsData.categories

  // Animation configuration
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const categoryVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', damping: 15 }
    }
  }

  return (
    <section 
      id="skills" 
      className="relative py-12 md:py-24 px-4 md:px-12 bg-theme-bg border-t-2 border-theme-text overflow-hidden"
    >
      {/* Background soft shapes */}
      <div className="absolute top-[10%] left-[-50px] w-64 h-64 rounded-full bg-theme-accent/5 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        {/* Section Heading */}
        <div className="text-center mb-8 md:mb-16">
          <span className="font-jakarta text-xs font-extrabold tracking-widest text-theme-secondary uppercase bg-theme-secondary/10 px-3 py-1 rounded border-2 border-theme-secondary/30">
            Player Talents
          </span>
          <h2 className="font-jakarta text-3xl md:text-5xl font-black text-theme-text mt-3 uppercase tracking-tight">
            Skill Attributes
          </h2>
          <div className="w-16 h-[4px] bg-theme-secondary mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Categories Grid (No Tabs) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 w-full"
        >
          {categories.map((category) => (
            <motion.div 
              key={category.name}
              variants={categoryVariants}
              className="bg-theme-card p-4 md:p-6 rounded-2xl border-2 border-theme-text offset-shadow-black flex flex-col h-full justify-between"
            >
              <div>
                {/* Category label */}
                <h3 className="font-jakarta text-xs uppercase font-extrabold tracking-widest text-theme-accent mb-4 border-b border-theme-border pb-2">
                  {category.name}
                </h3>
                
                {/* Pill grid cloud */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {category.items.map((skill) => (
                    <div
                      key={skill}
                      className="flex items-center space-x-1.5 border-2 border-theme-text rounded-full py-1 px-3.5 font-jakarta text-[11px] md:text-xs font-extrabold text-theme-text hover:bg-theme-accent hover:text-white hover:border-theme-accent transition-colors duration-200 cursor-default select-none bg-theme-bg shadow-sm"
                    >
                      <Award className="w-3.5 h-3.5" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
