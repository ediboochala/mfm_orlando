'use client'

import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useScrollReveal } from '@/hooks/useScrollReveal'

// Client-only components (need browser APIs)
const ParticlesCanvas = dynamic(() => import('@/components/ParticlesCanvas'), { ssr: false })

// Regular components
import HeroSection      from '@/components/HeroSection'
import CrusadeSection   from '@/components/CrusadeSection'
import SlideshowSection from '@/components/SlideshowSection'
import Marquee          from '@/components/Marquee'
import WelcomeSection   from '@/components/WelcomeSection'
import StatsSection     from '@/components/StatsSection'
import ServicesSection  from '@/components/ServicesSection'
import VideoSection     from '@/components/VideoSection'
import AboutSection     from '@/components/AboutSection'
import MinistriesSection from '@/components/MinistriesSection'
import PrayerSection    from '@/components/PrayerSection'
import GivingSection    from '@/components/GivingSection'
import Footer           from '@/components/Footer'

export default function Home() {
  useScrollReveal()

  return (
    <>
      {/* Browser-only overlays */}
      <ParticlesCanvas />

      {/* Page structure */}
      <main>
        <HeroSection />
        <CrusadeSection />
        <SlideshowSection />
        <Marquee />
        <WelcomeSection />
        <StatsSection />
        <VideoSection />
        <ServicesSection />
        <AboutSection />
        <MinistriesSection />
        <PrayerSection />
        <GivingSection />
      </main>
      <Footer />
    </>
  )
}
