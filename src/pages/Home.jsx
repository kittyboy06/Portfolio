import React from 'react'
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
  // Since we are doing compile-time direct imports, data is instantly available.
  const data = portfolioData

  return (
    <div className="min-h-screen w-full bg-theme-bg text-theme-text relative overflow-x-hidden">
      {/* Navigation Menu */}
      <Navbar heroData={data.hero} />

      {/* Main Sections Container */}
      <div className="pt-[72px]">
        {/* Hero Section */}
        <Hero heroData={data.hero} />

        {/* About / Profile Profile Section */}
        <About aboutData={data.about} />

        {/* Achievements Section */}
        <Achievements achievementsData={data.achievements} />

        {/* Skills List Section */}
        <Skills skillsData={data.skills} />

        {/* Projects / Bento Grid Section */}
        <Projects projectsData={data.projects} />

        {/* Timeline / Experience Section */}
        <Experience experienceData={data.timeline} />

        {/* Certifications Section */}
        <Certifications certificationsData={data.certifications} />

        {/* Contact links cards */}
        <Contact contactData={data.contact} />

        {/* Footer */}
        <Footer footerData={data.footer} />
      </div>
    </div>
  )
}
