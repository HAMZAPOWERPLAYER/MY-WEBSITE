import { Navbar } from '@/components/sections/Navbar';
import { Hero } from '@/components/sections/Hero';
import { CreatorCollab } from '@/components/sections/CreatorCollab';
import { ProductShowcase } from '@/components/sections/ProductShowcase';
import { Services } from '@/components/sections/Services';
import { About } from '@/components/sections/About';
import { CurrentlyBuilding } from '@/components/sections/CurrentlyBuilding';
import { ContactCTA } from '@/components/sections/ContactCTA';
import { Footer } from '@/components/sections/Footer';

export default function Home() {
  return (
    <>
      <title>HAMZA POWERPLAYER | Android Apps, Games & Software Projects</title>
      <meta
        name="description"
        content="Official HAMZA POWERPLAYER portfolio: PakiGPA, SubSight, Fantasy Text Pro, and The Last Bell on Google Play, plus public projects and games in development."
      />
      <link rel="canonical" href="https://www.hamzapowerplayer.com/" />
      <meta property="og:title" content="HAMZA POWERPLAYER | Apps, Games & Software Projects" />
      <meta
        property="og:description"
        content="Independent app and game developer. Explore PakiGPA, SubSight, Fantasy Text Pro, and The Last Bell on Google Play, plus public source and projects in development."
      />
      <meta property="og:url" content="https://www.hamzapowerplayer.com/" />
      <meta name="twitter:title" content="HAMZA POWERPLAYER | Apps, Games & Projects" />
      <meta
        name="twitter:description"
        content="Independent app and game developer. Four products live on Google Play, plus public source and projects in development."
      />

      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      <div className="relative min-h-screen overflow-x-hidden bg-[var(--bg-base)] text-[var(--text-primary)] selection:bg-[var(--neon-cyan)] selection:text-[#04040a]">
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_70%_45%_at_50%_-10%,rgba(0,240,255,0.05),transparent_70%)]"
        />
        <Navbar />
        <main id="main-content" className="relative">
          <Hero />
          <CreatorCollab />
          <ProductShowcase />
          <Services />
          <About />
          <CurrentlyBuilding />
          <ContactCTA />
        </main>
        <Footer />
      </div>
    </>
  );
}
