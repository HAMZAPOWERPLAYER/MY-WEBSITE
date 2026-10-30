import { useEffect, useRef, useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { PageHero } from '@/components/layout/PageHero';

const SKILLS = ['TypeScript', 'Dart', 'C#', 'React Native', 'Flutter', 'Unity'];

const VALUES = [
  { icon: '🔓', title: 'OPEN PROJECTS', text: 'Selected projects are published in the public repositories linked on this site.' },
  { icon: '⚡', title: 'PRODUCT FOCUS', text: 'The portfolio separates released products from projects that are still in development.' },
  { icon: '🧠', title: 'KEEP LEARNING', text: 'Public repositories show a mix of languages and platforms across different projects.' },
];

const STATUS_LINES = [
  { t: 0, line: '> Published apps: PakiGPA, SubSight' },
  { t: 400, line: '> Live game: The Last Bell' },
  { t: 800, line: '> Public source projects: GitHub' },
  { t: 1200, line: '> Store listings: Google Play' },
  { t: 1600, line: '> Contact: WhatsApp or LinkedIn' },
];

function TerminalStatus() {
  const [lines, setLines] = useState<string[]>([]);
  useEffect(() => {
    const timers = STATUS_LINES.map(({ t, line }) => window.setTimeout(() => setLines(prev => [...prev, line]), t));
    return () => timers.forEach(window.clearTimeout);
  }, []);
  return (
    <div className="rounded-2xl p-6 font-mono text-sm space-y-2"
      style={{ background: 'rgba(0,6,0,0.92)', border: '1px solid rgba(0,255,65,0.15)', boxShadow: '0 0 30px rgba(0,255,65,0.04)' }}>
      {lines.map((line, i) => (
        <div key={i} style={{ color: '#00ff41', animation: 'fadeIn 0.3s ease' }}>{line}</div>
      ))}
      {lines.length < STATUS_LINES.length && (
        <div style={{ color: '#00ff41', opacity: 0.4 }}>{'> ...'}</div>
      )}
      {lines.length === STATUS_LINES.length && (
        <div className="flex items-center gap-1 pt-1" style={{ color: '#00ff41' }}>
          <span>{'>'}</span>
          <span className="inline-block w-2 h-4 bg-[#00ff41]" style={{ animation: 'cursor-blink 1s step-end infinite' }} />
        </div>
      )}
    </div>
  );
}

export default function AboutPage() {
  return (
    <PageLayout
      title="About HAMZA POWERPLAYER | Apps and Software Projects"
      description="Learn about HAMZA POWERPLAYER and explore the confirmed PakiGPA, SubSight, and The Last Bell releases, public GitHub repositories, and project links."
      path="/about"
      schemas={[JSON.stringify({
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "@id": "https://www.hamzapowerplayer.com/about#webpage",
        "url": "https://www.hamzapowerplayer.com/about",
        "name": "About Hamza PowerPlayer",
        "description": "The story behind HAMZA POWERPLAYER — self-taught Flutter developer and AI builder from Lahore, Pakistan.",
        "mainEntity": { "@id": "https://www.hamzapowerplayer.com/#person" },
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.hamzapowerplayer.com/" },
            { "@type": "ListItem", "position": 2, "name": "About", "item": "https://www.hamzapowerplayer.com/about" }
          ]
        }
      })]}
    >
      <PageHero label="WHO I AM" title="About Me" subtitle="The story behind the builder" />

      <div className="max-w-4xl mx-auto px-6 py-16 space-y-20">

        {/* Section A — Identity */}
        <div className="glass-card rounded-2xl p-8 md:p-10" style={{ border: '1px solid rgba(0,240,255,0.18)' }}>
          <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* Animated HP logo */}
            <div className="flex justify-center">
              <div className="relative flex items-center justify-center" style={{ width: 180, height: 180 }}>
                {/* Outer orbit */}
                <div className="absolute inset-0 rounded-full"
                  style={{ border: '1px solid rgba(0,240,255,0.25)', animation: 'spin-orbit 18s linear infinite' }} />
                {/* Dot on outer orbit */}
                <div className="absolute w-2.5 h-2.5 rounded-full bg-[var(--neon-cyan)]"
                  style={{ top: 2, left: '50%', marginLeft: -5, boxShadow: '0 0 8px rgba(0,240,255,0.8)', animation: 'spin-orbit 18s linear infinite', transformOrigin: '5px 87px' }} />
                {/* Middle orbit */}
                <div className="absolute rounded-full"
                  style={{ inset: 20, border: '1px solid rgba(124,58,237,0.35)', animation: 'spin-orbit 11s linear infinite reverse' }} />
                {/* Dot on middle orbit */}
                <div className="absolute w-2 h-2 rounded-full"
                  style={{ background: 'var(--neon-violet)', top: 22, left: '50%', marginLeft: -4, boxShadow: '0 0 6px rgba(124,58,237,0.8)', animation: 'spin-orbit 11s linear infinite reverse', transformOrigin: '4px 67px' }} />
                {/* Inner orbit */}
                <div className="absolute rounded-full"
                  style={{ inset: 40, border: '1px solid rgba(245,197,24,0.25)', animation: 'spin-orbit 7s linear infinite' }} />
                {/* Core */}
                <div className="w-20 h-20 rounded-full flex items-center justify-center"
                  style={{
                    border: '2px solid var(--neon-cyan)',
                    boxShadow: '0 0 30px rgba(0,240,255,0.5), 0 0 60px rgba(0,240,255,0.2), inset 0 0 20px rgba(0,240,255,0.1)',
                    animation: 'ai-pulse 3s ease-in-out infinite',
                    background: 'radial-gradient(circle, rgba(0,240,255,0.12) 0%, transparent 70%)',
                  }}>
                  <span className="font-display font-black text-3xl text-[var(--neon-cyan)] neon-text-glow">HP</span>
                </div>
              </div>
            </div>

            {/* Identity grid */}
            <div className="space-y-4">
              {[
                ['Name', 'HAMZA POWERPLAYER'],
                ['Role', 'App Developer · Software Creator'],
                ['Work', 'Android apps and public software projects'],
                ['Focus', 'Apps, open repositories, and Android games'],
              ].map(([k, v]) => (
                <div key={k} className="flex gap-3 items-start">
                  <span className="font-mono text-[11px] text-[var(--neon-cyan)] w-24 shrink-0 pt-0.5 tracking-wider">{k}:</span>
                  <span className="font-accent text-sm text-[var(--text-primary)] leading-relaxed">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section B — Story */}
        <div>
          <h2 className="font-display font-black text-3xl mb-2" style={{ color: 'var(--text-primary)', textShadow: '0 0 20px rgba(0,240,255,0.3)' }}>
            How It Started
          </h2>
          <div className="w-16 h-[2px] mb-8 rounded-full" style={{ background: 'linear-gradient(90deg, var(--neon-cyan), transparent)' }} />
          <div className="space-y-5 font-accent text-[rgba(240,240,255,0.82)] leading-[1.85] text-[16px]">
            <p>HAMZA POWERPLAYER builds and publishes software projects. This portfolio links to the PakiGPA, SubSight, and The Last Bell releases, public GitHub repositories, and game projects that are still in development.</p>
            <div className="pl-6 border-l-4 border-[var(--neon-cyan)] my-8 py-3 rounded-r-lg"
              style={{ background: 'rgba(0,240,255,0.04)' }}>
              <p className="text-xl md:text-2xl font-display font-black text-[var(--text-primary)]">
                "I fell in love with building things from absolutely nothing."
              </p>
            </div>
            <p>Released products and work in progress are listed separately so visitors can check each project’s current status and follow its official source or store link.</p>
          </div>
        </div>

        {/* Section C — Values */}
        <div>
          <h2 className="font-display font-black text-3xl mb-2" style={{ color: 'var(--text-primary)', textShadow: '0 0 20px rgba(0,240,255,0.3)' }}>
            What I Stand For
          </h2>
          <div className="w-16 h-[2px] mb-8 rounded-full" style={{ background: 'linear-gradient(90deg, var(--neon-cyan), transparent)' }} />
          <div className="grid md:grid-cols-3 gap-4">
            {VALUES.map(v => (
              <div key={v.title} className="glass-card rounded-2xl p-6 hover:border-[rgba(0,240,255,0.3)] transition-all group">
                <div className="text-5xl mb-4">{v.icon}</div>
                <div className="font-display font-black text-xs text-[var(--neon-cyan)] tracking-[0.15em] mb-3">{v.title}</div>
                <p className="font-accent text-sm text-[var(--text-muted)] leading-relaxed group-hover:text-[var(--text-primary)] transition-colors">{v.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section D — Skills */}
        <div>
          <h2 className="font-display font-black text-3xl mb-2" style={{ color: 'var(--text-primary)', textShadow: '0 0 20px rgba(0,240,255,0.3)' }}>
            What I Know
          </h2>
          <div className="w-16 h-[2px] mb-8 rounded-full" style={{ background: 'linear-gradient(90deg, var(--neon-cyan), transparent)' }} />
          <div className="glass-card rounded-2xl p-6 space-y-5">
            <p className="font-accent text-sm text-[var(--text-muted)] mb-5">Languages and platforms shown in the linked public repositories:</p>
            <div className="flex flex-wrap gap-3">
              {SKILLS.map(skill => (
                <span key={skill} className="glass-card px-4 py-2 rounded-full font-mono text-sm text-[var(--neon-cyan)]">{skill}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Current verified work */}
        <div>
          <h2 className="font-display font-black text-3xl mb-2" style={{ color: 'var(--text-primary)', textShadow: '0 0 20px rgba(0,240,255,0.3)' }}>
            Verified Work
          </h2>
          <div className="w-16 h-[2px] mb-8 rounded-full" style={{ background: 'linear-gradient(90deg, var(--neon-cyan), transparent)' }} />
          <TerminalStatus />
        </div>
      </div>
    </PageLayout>
  );
}
