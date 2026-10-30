import { useEffect, useState, useRef } from 'react';

const KONAMI = [
  'ArrowUp','ArrowUp','ArrowDown','ArrowDown',
  'ArrowLeft','ArrowRight','ArrowLeft','ArrowRight',
  'KeyB','KeyA',
];

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  opacity: number;
}

export function KonamiEasterEgg({ onActivate }: { onActivate?: () => void }) {
  const [phase, setPhase] = useState<'idle' | 'active' | 'fading'>('idle');
  const [lineWidth, setLineWidth] = useState(0);
  const [textLines, setTextLines] = useState<string[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const seqRef = useRef<string[]>([]);
  const timeoutsRef = useRef<number[]>([]);

  const LINES = [
    'YOU FOUND THE SECRET',
    'HAMZA POWERPLAYER — LEVEL 99 DEVELOPER',
    'ACCESS GRANTED TO THE INNER SANCTUM',
  ];

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      seqRef.current = [...seqRef.current, e.code].slice(-KONAMI.length);
      if (seqRef.current.join(',') === KONAMI.join(',')) {
        trigger();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const clear = () => {
    timeoutsRef.current.forEach(t => window.clearTimeout(t));
    timeoutsRef.current = [];
  };

  const addTimeout = (fn: () => void, ms: number) => {
    const t = window.setTimeout(fn, ms);
    timeoutsRef.current.push(t);
  };

  const trigger = () => {
    clear();
    localStorage.setItem('konami', 'true');
    setPhase('active');
    setLineWidth(0);
    setTextLines([]);
    setParticles([]);
    onActivate?.();

    // Line expands
    addTimeout(() => setLineWidth(100), 50);

    // Text lines appear one by one
    LINES.forEach((line, i) => {
      addTimeout(() => setTextLines(prev => [...prev, line]), 600 + i * 700);
    });

    // Particle explosion
    addTimeout(() => {
      const ps: Particle[] = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: 50,
        y: 50,
        vx: (Math.random() - 0.5) * 8,
        vy: (Math.random() - 0.5) * 8,
        color: i % 2 === 0 ? '#00f0ff' : '#7c3aed',
        opacity: 1,
      }));
      setParticles(ps);
    }, 1200);

    // Fade out
    addTimeout(() => setPhase('fading'), 5000);
    addTimeout(() => {
      setPhase('idle');
      setParticles([]);
    }, 6000);
  };

  if (phase === 'idle') return null;

  return (
    <div
      className="fixed inset-0 z-[9990] flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: '#000',
        opacity: phase === 'fading' ? 0 : 1,
        transition: phase === 'fading' ? 'opacity 1s ease' : 'opacity 0.2s ease',
      }}
    >
      {/* Expanding horizontal line */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          height: 2,
          width: `${lineWidth}vw`,
          background: 'var(--neon-cyan)',
          boxShadow: '0 0 20px #00f0ff',
          transition: 'width 0.5s ease',
        }}
      />

      {/* Text lines */}
      <div className="relative z-10 flex flex-col items-center gap-6 text-center px-6">
        {LINES.map((line, i) => (
          <div
            key={line}
            className="font-display font-black text-center overflow-hidden"
            style={{
              fontSize: i === 0 ? '2rem' : i === 1 ? '1.5rem' : '1.25rem',
              color: i === 0 ? 'var(--neon-cyan)' : i === 1 ? '#ffffff' : 'var(--neon-violet)',
              textShadow: i === 0 ? '0 0 30px #00f0ff' : undefined,
              maxHeight: textLines.length > i ? '100px' : '0',
              opacity: textLines.length > i ? 1 : 0,
              transition: 'max-height 0.5s ease, opacity 0.5s ease',
              letterSpacing: '0.1em',
            }}
          >
            {line}
          </div>
        ))}
      </div>

      {/* Particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 6,
            height: 6,
            left: `${p.x}%`,
            top: `${p.y}%`,
            background: p.color,
            boxShadow: `0 0 8px ${p.color}`,
            animation: `particle-burst-${p.id % 3} 2s ease-out forwards`,
            transform: `translate(${p.vx * 100}px, ${p.vy * 100}px)`,
            transition: 'transform 2s ease-out, opacity 2s ease-out',
          }}
        />
      ))}

      {/* Aurora surge overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(0,240,255,0.1) 0%, rgba(124,58,237,0.08) 50%, transparent 70%)',
          animation: 'aurora-surge 0.8s ease-out',
        }}
      />
    </div>
  );
}
