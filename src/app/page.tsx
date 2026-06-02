'use client'

import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useScrollReveal } from '@/hooks/useScrollReveal'

// Client-only components (need browser APIs)
const ParticlesCanvas = dynamic(() => import('@/components/ParticlesCanvas'), { ssr: false })

// Regular components
import Navbar           from '@/components/Navbar'
import HeroSection      from '@/components/HeroSection'
import Marquee          from '@/components/Marquee'
import WelcomeSection   from '@/components/WelcomeSection'
import StatsSection     from '@/components/StatsSection'
import ServicesSection  from '@/components/ServicesSection'
import AboutSection     from '@/components/AboutSection'
import MinistriesSection from '@/components/MinistriesSection'
import PrayerSection    from '@/components/PrayerSection'
import GivingSection    from '@/components/GivingSection'
import ContactSection   from '@/components/ContactSection'
import Footer           from '@/components/Footer'

export default function Home() {
  useScrollReveal()

  return (
    <>
      {/* Browser-only overlays */}
      <ParticlesCanvas />

      {/* Page structure */}
      <Navbar />
      <main>
        <HeroSection />
        <Marquee />
        <WelcomeSection />
        <StatsSection />
        <ServicesSection />
        <AboutSection />
        <MinistriesSection />
        <PrayerSection />
        <GivingSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
