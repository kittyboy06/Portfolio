import React, { useEffect } from 'react'
import Lenis from 'lenis'
import { motion, useScroll, useSpring } from 'framer-motion'
import portfolioData from '../data/portfolio.json'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import Achievements from '../components/Achievements'
import Skills from '../components/Skills'
import Projects from '../components/Projects'
import Experience from '../components/Experience'
import Certifications from '../components/Certifications'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

export default function Home() {
  const data = portfolioData

  // Setup Lenis Smooth Scroll Engine
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  // Top Progress Bar
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <div className="min-h-screen w-full bg-[#0A0A12] text-slate-100 relative overflow-x-hidden selection:bg-cyan-500 selection:text-slate-950">
      {/* Top Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-cyan-400 to-violet-500 origin-left z-[100] shadow-[0_0_12px_rgba(6,182,212,0.8)]"
        style={{ scaleX }}
      />

      {/* Floating Mesh Background Orbs (Anime.js Ambient Glow) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-60">
        <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full bg-indigo-600/20 blur-[140px] animate-float-orb-1" />
        <div className="absolute top-[35%] right-[-10%] w-[500px] h-[500px] rounded-full bg-violet-600/20 blur-[130px] animate-float-orb-2" />
        <div className="absolute top-[65%] left-[10%] w-[550px] h-[550px] rounded-full bg-cyan-500/15 blur-[150px] animate-float-orb-3" />
        <div className="absolute bottom-[-10%] right-[15%] w-[450px] h-[450px] rounded-full bg-rose-500/15 blur-[120px] animate-float-orb-1" />
      </div>

      {/* Floating Glass Navbar */}
      <Navbar heroData={data.hero} />

      {/* Main Sections Container */}
      <main className="relative z-10 pt-20 space-y-24 md:space-y-32 pb-16">
        <section id="hero">
          <Hero heroData={data.hero} />
        </section>

        <section id="about">
          <About aboutData={data.about} />
        </section>

        <section id="achievements">
          <Achievements achievementsData={data.achievements} />
        </section>

        <section id="skills">
          <Skills skillsData={data.skills} />
        </section>

        <section id="projects">
          <Projects projectsData={data.projects} />
        </section>

        <section id="experience">
          <Experience experienceData={data.timeline} />
        </section>

        <section id="certifications">
          <Certifications certificationsData={data.certifications} />
        </section>

        <section id="contact">
          <Contact contactData={data.contact} />
        </section>

        <Footer footerData={data.footer} />
      </main>
    </div>
  )
}
