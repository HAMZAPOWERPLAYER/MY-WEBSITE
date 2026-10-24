import { Link } from 'wouter';
import { CustomCursor } from '@/components/effects/CustomCursor';
import { LoadingScreen } from '@/components/effects/LoadingScreen';
import AuroraEngine from '@/components/effects/AuroraEngine';
import { AirplaneBanner } from '@/components/effects/AirplaneBanner';
import { FloatingLetters } from '@/components/effects/FloatingLetters';
import { ShockwaveRipple } from '@/components/effects/ShockwaveRipple';
import { MouseSpotlight } from '@/components/effects/MouseSpotlight';
import { DNAHelix } from '@/components/effects/DNAHelix';
import { HackerMode } from '@/components/effects/HackerMode';
import { HamzaAI } from '@/components/effects/HamzaAI';
import { VelocityLines } from '@/components/effects/VelocityLines';
import { SmoothScroll } from '@/components/effects/SmoothScroll';
import { Navbar } from '@/components/sections/Navbar';
import { FeaturedShowcase } from '@/components/sections/FeaturedShowcase';
import { Hero } from '@/components/sections/Hero';
import { InfinityTicker } from '@/components/sections/InfinityTicker';
import { About } from '@/components/sections/About';
import { SolarSystem } from '@/components/sections/SolarSystem';
import { TheForge } from '@/components/sections/TheForge';
import { GravityRoom } from '@/components/sections/GravityRoom';
import { TechStack } from '@/components/sections/TechStack';
import { NeuralNetwork } from '@/components/sections/NeuralNetwork';
import { AICapabilities } from '@/components/sections/AICapabilities';
import { Timeline } from '@/components/sections/Timeline';
import { TheSignal } from '@/components/sections/TheSignal';
import { Roadmap } from '@/components/sections/Roadmap';
import { Philosophy } from '@/components/sections/Philosophy';
import { WallOfFire } from '@/components/sections/WallOfFire';
import { Console } from '@/components/sections/Console';
import { Multiverse } from '@/components/sections/Multiverse';
import { Mirror } from '@/components/sections/Mirror';
import { Contact } from '@/components/sections/Contact';
import { TheVault } from '@/components/sections/TheVault';
import { Footer } from '@/components/sections/Footer';
import { KonamiEasterEgg } from '@/components/sections/KonamiEasterEgg';
import { MobileBottomNav } from '@/components/sections/MobileBottomNav';
import { ScreensaverMode } from '@/components/sections/ScreensaverMode';

export default function Home() {
  return (
    <>
      <title>HAMZA POWERPLAYER | Apps, Software Projects & Games</title>
      <meta name="description" content="Official HAMZA POWERPLAYER portfolio: explore PakiGPA, SubSight, and The Last Bell on Google Play, plus public GitHub projects and games in development." />
      <link rel="canonical" href="https://www.hamzapowerplayer.com/" />
      <meta property="og:title" content="HAMZA POWERPLAYER | Apps, Software Projects & Game Development" />
      <meta property="og:description" content="Official portfolio featuring PakiGPA, SubSight, and The Last Bell on Google Play, plus public GitHub projects, games in development, and verified contact links." />
      <meta property="og:url" content="https://www.hamzapowerplayer.com/" />
      <meta name="twitter:title" content="HAMZA POWERPLAYER | Apps, Projects & Games" />
      <meta name="twitter:description" content="Official portfolio featuring PakiGPA, SubSight, The Last Bell, public software projects, games in development, and verified contact links." />
      <SmoothScroll>
        <div className="relative min-h-screen" style={{ background: 'var(--bg-base)' }}>
        <AuroraEngine />

        <LoadingScreen />
        <CustomCursor />
        <KonamiEasterEgg onActivate={() => { sessionStorage.setItem('konami-done', 'true'); window.dispatchEvent(new Event('konami-activated')); }} />
        <MobileBottomNav />
        <ScreensaverMode />
        <AirplaneBanner />
        <FloatingLetters />
        <ShockwaveRipple />
        <MouseSpotlight />
        <DNAHelix />
        <HackerMode />
        <HamzaAI />
        <VelocityLines />

        <Navbar />

        <main className="relative z-10">
          {/* 1. Hero */}
          <Hero />

          {/* 2. Infinity Ticker */}
          <InfinityTicker />

          <section aria-label="Explore products and projects" className="mx-auto grid max-w-6xl gap-4 px-6 py-10 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { href: '/apps', label: 'Apps', detail: 'Published app listings' },
              { href: '/games', label: 'Games', detail: 'The Last Bell & more' },
              { href: '/projects', label: 'Projects', detail: 'Public GitHub repositories' },
              { href: '/links', label: 'Links', detail: 'Profiles and destinations' },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="glass-card rounded-xl p-5 transition-colors hover:border-[rgba(0,240,255,0.3)]">
                <span className="block font-display text-sm font-black tracking-wider text-[var(--neon-cyan)]">{item.label}</span>
                <span className="mt-2 block font-accent text-xs text-[var(--text-muted)]">{item.detail}</span>
              </Link>
            ))}
          </section>

          {/* Featured apps, projects and games */}
          <FeaturedShowcase />

          <div className="bg-[var(--bg-base)]">
            {/* 4. About */}
            <About />

            {/* 5. Skills — Solar System */}
            <SolarSystem />

            {/* 6. The Forge */}
            <TheForge />

            {/* 7. Gravity Room */}
            <GravityRoom />

            {/* 8. Tech Stack Universe */}
            <TechStack />

            {/* Neural network */}
            <NeuralNetwork />

            {/* AI capabilities */}
            <AICapabilities />

            {/* Developer timeline */}
            <Timeline />

            {/* The signal */}
            <TheSignal />

            {/* Roadmap */}
            <Roadmap />

            {/* Philosophy */}
            <Philosophy />

            {/* Wall of fire */}
            <WallOfFire />

            {/* Developer console */}
            <Console />

            {/* Multiverse */}
            <Multiverse />

            {/* Mirror */}
            <Mirror />

            {/* Contact */}
            <Contact />

            {/* The vault */}
            <TheVault />
          </div>
        </main>

        <Footer />
        </div>
      </SmoothScroll>
    </>
  );
}
