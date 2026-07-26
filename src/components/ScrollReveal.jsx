import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

/**
 * 3D ScrollReveal component inspired by Anime.js and Lenis Showcase
 * Applies 3D perspective tilt, depth scaling, vertical parallax, and blur unfold as elements enter viewport.
 */
export default function ScrollReveal({ 
  children, 
  className = "", 
  delay = 0,
  speed = 1,
  direction = "up"
}) {
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 92%", "end 20%"]
  })

  // Smooth out progress values with spring physics
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 24,
    restDelta: 0.001
  })

  // 3D Spatial Transforms
  const opacity = useTransform(smoothProgress, [0, 0.3, 0.85, 1], [0, 1, 1, 0.2])
  const scale = useTransform(smoothProgress, [0, 0.35], [0.88, 1])
  const rotateX = useTransform(smoothProgress, [0, 0.35], [16, 0])
  const y = useTransform(
    smoothProgress, 
    [0, 0.35, 1], 
    [direction === "up" ? 90 * speed : -90 * speed, 0, -50 * speed]
  )
  const blur = useTransform(smoothProgress, [0, 0.3], [8, 0])

  // Mouse spotlight position tracking for interactive cards
  const handleMouseMove = (e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    containerRef.current.style.setProperty('--mouse-x', `${x}px`)
    containerRef.current.style.setProperty('--mouse-y', `${y}px`)
  }

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={`perspective-1000 ${className}`}
      style={{ perspective: '1000px' }}
    >
      <motion.div
        style={{
          opacity,
          scale,
          rotateX,
          y,
          filter: blur ? `blur(${blur}px)` : undefined,
          transformStyle: 'preserve-3d',
        }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
      >
        {children}
      </motion.div>
    </div>
  )
}
