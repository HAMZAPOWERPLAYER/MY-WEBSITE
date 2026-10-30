import { useRef, useState } from 'react';
import { ScrollReveal } from '../effects/ScrollReveal';
import { NeonLabel } from '../effects/NeonLabel';

const PORTALS = [
  {
    id: 'dev',
    title: 'DEVELOPER MODE',
    subtitle: 'This version builds the engines.',
    theme: { bg: '#020802', accent: '#00ff41', border: '#00ff41', text: '#00ff41' },
    content: [
      { label: 'Lines of Code', val: '148,320' },
      { label: 'Functions Built', val: '3,847' },
      { label: 'Commits', val: '2,103' },
      { label: 'Stack', val: 'Flutter · React · Python' },
    ],
    animation: 'portal-wormhole',
  },
  {
    id: 'design',
    title: 'DESIGNER MODE',
    subtitle: 'This version designs the experience.',
    theme: { bg: '#fdf6e3', accent: '#d4630a', border: '#d4630a', text: '#2c1810' },
    content: [
      { label: 'Design Systems', val: '12' },
      { label: 'Components', val: '340+' },
      { label: 'Palettes', val: 'Minimal · Cyber · Warm' },
      { label: 'Font Pairing', val: 'Orbitron + Syne' },
    ],
    animation: 'portal-ripple',
    center: true,
  },
  {
    id: 'founder',
    title: 'FOUNDER MODE',
    subtitle: 'This version scales the empire.',
    theme: { bg: '#0a0800', accent: '#f5c518', border: '#f5c518', text: '#f5c518' },
    content: [
      { label: 'Market', val: 'Global · Remote' },
      { label: 'Focus', val: 'Apps · AI · Tools' },
      { label: 'Vision', val: 'Products that outlast trends' },
      { label: 'Status', val: 'Building relentlessly' },
    ],
    animation: 'portal-tear',
  },
];

export function Multiverse() {
  const [active, setActive] = useState<string | null>(null);

  function activatePortal(id: string) {
    const portal = PORTALS.find(p => p.id === id)!;
    setActive(id);
    // brief theme swap
    const root = document.documentElement;
    root.style.setProperty('--neon-cyan', portal.theme.accent);
    root.style.setProperty('--bg-base', portal.theme.bg);
    root.style.setProperty('--text-primary', portal.theme.text);
    setTimeout(() => {
      root.style.removeProperty('--neon-cyan');
      root.style.removeProperty('--bg-base');
      root.style.removeProperty('--text-primary');
      setActive(null);
    }, 500);
  }

  return (
    <section id="multiverse" className="relative py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <NeonLabel>MULTIVERSE</NeonLabel>
          <h2 className="font-display font-black text-4xl md:text-5xl mb-4">
            <span className="holo-text">Every Version of the Build</span>
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
          {PORTALS.map((portal, i) => (
            <ScrollReveal key={portal.id} staggerBase={i * 0.15}>
              <button
                onClick={() => activatePortal(portal.id)}
                className={`w-full text-left rounded-2xl p-6 transition-all duration-300 group relative overflow-hidden ${portal.center ? 'md:scale-105 md:-my-2' : ''} ${active === portal.id ? 'scale-95' : 'hover:scale-[1.02]'}`}
                style={{
                  background: portal.id === 'design'
                    ? 'linear-gradient(135deg, rgba(253,246,227,0.08), rgba(212,99,10,0.08))'
                    : portal.id === 'founder'
                    ? 'linear-gradient(135deg, rgba(10,8,0,0.9), rgba(245,197,24,0.06))'
                    : 'linear-gradient(135deg, rgba(2,8,2,0.9), rgba(0,255,65,0.06))',
                  border: `1px solid ${portal.theme.border}44`,
                  boxShadow: `0 0 30px ${portal.theme.accent}11`,
                }}
              >
                {/* Portal opening animation */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none"
                  style={{ animation: active === portal.id ? `${portal.animation} 0.5s ease` : 'none' }}>
                  <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `radial-gradient(circle at 50% 50%, ${portal.theme.accent}22, transparent 70%)` }} />
                </div>

                {/* Portal frame corners */}
                {['top-2 left-2 border-t-2 border-l-2', 'top-2 right-2 border-t-2 border-r-2',
                  'bottom-2 left-2 border-b-2 border-l-2', 'bottom-2 right-2 border-b-2 border-r-2'].map((cls, j) => (
                  <div key={j} className={`absolute w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300 ${cls}`}
                    style={{ borderColor: portal.theme.accent }} />
                ))}

                <div className="relative z-10">
                  <div className="font-mono text-xs tracking-widest mb-4 opacity-60" style={{ color: portal.theme.accent }}>
                    [ {portal.id.toUpperCase()} ]
                  </div>
                  <div className="font-display font-black text-xl mb-2" style={{ color: portal.theme.accent }}>
                    {portal.title}
                  </div>

                  <div className="space-y-3 my-5">
                    {portal.content.map((item, j) => (
                      <div key={j} className="flex justify-between text-sm border-b border-[rgba(255,255,255,0.05)] pb-2">
                        <span className="text-[var(--text-muted)] font-mono text-xs">{item.label}</span>
                        <span className="font-mono text-xs" style={{ color: portal.theme.accent }}>{item.val}</span>
                      </div>
                    ))}
                  </div>

                  <p className="text-sm text-[var(--text-muted)] italic mt-4">{portal.subtitle}</p>
                </div>
              </button>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <p className="text-center text-[var(--text-muted)] font-accent mt-8 italic">
            All three exist. Only one website can hold them all.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
