import { useEffect, useRef, useState } from 'react';

export function WallOfFire() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [fireHeight, setFireHeight] = useState(0.3);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(([e]) => {
      setVisible(e.isIntersecting);
    }, { threshold: 0.1 });
    observer.observe(section);

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const viewH = window.innerHeight;
      const progress = 1 - (rect.top / viewH);
      setFireHeight(Math.max(0.2, Math.min(0.65, progress * 0.7)));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const QUOTE_LINES = [
    "IF YOU'RE NOT BUILDING,",
    "YOU'RE WATCHING SOMEONE ELSE",
    "BUILD YOUR DREAM.",
  ];

  return (
    <section ref={sectionRef} className="relative overflow-hidden"
      style={{ height: '100vh', background: '#020008' }}>

      {/* Embers */}
      {Array.from({ length: 30 }).map((_, i) => (
        <div key={i} className="absolute rounded-full pointer-events-none"
          style={{
            width: 2 + Math.random() * 4,
            height: 2 + Math.random() * 4,
            left: `${5 + i * 3}%`,
            bottom: `${fireHeight * 100}%`,
            background: `hsl(${20 + Math.random() * 40}, 100%, ${60 + Math.random() * 30}%)`,
            animation: `ember-rise ${3 + Math.random() * 4}s ${Math.random() * 3}s ease-in infinite`,
            opacity: 0,
          }} />
      ))}

      {/* Fire layers */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{ height: `${fireHeight * 100}%`, transition: 'height 0.5s ease' }}>
        <div className="absolute inset-0" style={{ animation: 'fire-layer-1 2s ease-in-out infinite alternate', background: 'linear-gradient(to top, #cc2200, #ff4400, #ff6600, transparent)' }} />
        <div className="absolute inset-0" style={{ animation: 'fire-layer-2 2.3s ease-in-out infinite alternate', background: 'linear-gradient(to top, #991100, #ff3300, #ff8800, #ffcc00, transparent)', mixBlendMode: 'screen' }} />
        <div className="absolute inset-0" style={{ animation: 'fire-layer-3 1.7s ease-in-out infinite alternate', background: 'linear-gradient(to top, transparent, transparent 30%, rgba(255,200,50,0.4), transparent)', mixBlendMode: 'screen' }} />
        {/* Heat distortion */}
        <div className="absolute top-0 left-0 right-0 h-32"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,80,0,0.08))', filter: 'blur(4px)', animation: 'heat-waver 1.5s ease-in-out infinite alternate' }} />
      </div>

      {/* Quote */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 pb-32">
        {QUOTE_LINES.map((line, i) => (
          <div
            key={i}
            className="font-display font-black text-center leading-tight"
            style={{
              fontSize: 'clamp(1.8rem, 5vw, 4.5rem)',
              color: 'rgba(255,252,240,0.95)',
              textShadow: '0 0 40px rgba(255,180,0,0.4)',
              transform: visible ? 'translateY(0)' : 'translateY(-60px)',
              opacity: visible ? 1 : 0,
              transition: `transform 0.8s ${i * 0.25 + 0.3}s cubic-bezier(0.34,1.56,0.64,1), opacity 0.6s ${i * 0.25 + 0.3}s ease`,
            }}
          >
            {line}
          </div>
        ))}
        <div
          className="font-display text-[var(--gold)] mt-6 tracking-widest text-lg"
          style={{
            textShadow: '0 0 20px var(--gold)',
            transform: visible ? 'translateY(0)' : 'translateY(-40px)',
            opacity: visible ? 1 : 0,
            transition: 'transform 0.8s 1.1s ease, opacity 0.6s 1.1s ease',
          }}
        >
          — HAMZA POWERPLAYER
        </div>
      </div>
    </section>
  );
}
