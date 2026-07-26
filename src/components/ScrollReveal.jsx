import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

/**
 * Lightweight, GPU-accelerated 3D Scroll Reveal Component
 * Optimized for rapid forward/backward scrolling without lag or layout crashes.
 */
export default function ScrollReveal({ 
  children, 
  delay = 0, 
  direction = "up",
  className = "" 
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { 
    once: false, 
    margin: "-5% 0px -5% 0px" 
  })

  // Directional initial offsets
  const getInitialTransform = () => {
    switch (direction) {
      case "up":
        return { y: 40, opacity: 0, scale: 0.95 }
      case "down":
        return { y: -40, opacity: 0, scale: 0.95 }
      case "left":
        return { x: 40, opacity: 0, scale: 0.95 }
      case "right":
        return { x: -40, opacity: 0, scale: 0.95 }
      default:
        return { y: 40, opacity: 0, scale: 0.95 }
    }
  }

  const initial = getInitialTransform()

  // Track mouse coordinates for spotlight glow inside cards
  const handleMouseMove = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    ref.current.style.setProperty('--mouse-x', `${x}px`)
    ref.current.style.setProperty('--mouse-y', `${y}px`)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      initial={initial}
      animate={isInView ? { x: 0, y: 0, opacity: 1, scale: 1 } : initial}
      transition={{
        duration: 0.45,
        delay: Math.min(delay, 0.2), // Cap delay to prevent long waits on rapid scroll
        ease: [0.16, 1, 0.3, 1] // Fast out, smooth cubic-bezier
      }}
      style={{ willChange: 'transform, opacity' }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  )
}
