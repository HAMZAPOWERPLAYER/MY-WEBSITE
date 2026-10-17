import { useState } from 'react';
import { ScrollReveal } from '../effects/ScrollReveal';

const ORBIT_1 = [
  { name: 'Flutter', level: 'Advanced · 2 Years', icon: '🦋' },
  { name: 'Dart', level: 'Advanced · 2 Years', icon: '🎯' },
  { name: 'Python', level: 'Intermediate · 1.5 Years', icon: '🐍' },
];
const ORBIT_2 = [
  { name: 'Firebase', level: 'Advanced · 2 Years', icon: '🔥' },
  { name: 'Supabase', level: 'Intermediate · 1 Year', icon: '⚡' },
  { name: 'Node.js', level: 'Intermediate · 1 Year', icon: '🟢' },
];
const ORBIT_3 = [
  { name: 'Git', level: 'Advanced · 3 Years', icon: '🌿' },
  { name: 'Figma', level: 'Intermediate · 2 Years', icon: '🎨' },
  { name: 'VS Code', level: 'Expert · 3 Years', icon: '💙' },
  { name: 'AI APIs', level: 'Advanced · 1.5 Years', icon: '🤖' },
];
const EXTRA_TAGS = [
  'React Native', 'TypeScript', 'JavaScript', 'Python', 'Dart', 'Flutter',
  'Swift', 'Node.js', 'Firebase', 'Supabase', 'PostgreSQL', 'REST APIs',
  'OpenAI API', 'LangChain', 'Git', 'GitHub', 'Figma', 'VS Code', 'Cursor AI', 'Replit'
];

function OrbitItem({ item, angle, radius, duration, index }: {
  item: { name: string; level: string; icon: string };
  angle: number;
  radius: number;
  duration: number;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const rad = (angle * Math.PI) / 180;
  const x = radius * Math.cos(rad);
  const y = radius * Math.sin(rad);

  return (
    <div
      className="absolute"
      style={{
        left: '50%',
        top: '50%',
        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
        animation: hovered ? 'none' : undefined,
        zIndex: hovered ? 20 : 5,
      }}
    >
      <div
        className="orbit-item-wrapper"
        style={{
          animation: `counter-spin ${duration}s linear infinite`,
          animationDelay: `${index * -0.5}s`,
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          className="glass-card rounded-full px-3 py-1.5 flex items-center gap-1.5 cursor-default transition-all duration-300 border border-[var(--border-glow)] whitespace-nowrap"
          style={{
            transform: hovered ? 'scale(1.5)' : 'scale(1)',
            boxShadow: hovered ? '0 0 20px rgba(0,240,255,0.4)' : undefined,
          }}
        >
          <span className="text-sm">{item.icon}</span>
          <span className="font-accent text-xs text-[var(--text-primary)] font-semibold">{item.name}</span>
        </div>
        {hovered && (
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-[#0a0a1a] border border-[var(--neon-cyan)] rounded px-3 py-1.5 whitespace-nowrap z-30 pointer-events-none">
            <span className="font-body text-xs text-[var(--neon-cyan)]">{item.level}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function OrbitRing({ items, radius, duration }: { items: typeof ORBIT_1; radius: number; duration: number }) {
  const angleStep = 360 / items.length;
  return (
    <div
      className="absolute rounded-full border border-[rgba(0,240,255,0.08)]"
      style={{
        width: radius * 2,
        height: radius * 2,
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        animation: `spin-orbit ${duration}s linear infinite`,
      }}
    >
      {items.map((item, i) => (
        <OrbitItem
          key={item.name}
          item={item}
          angle={i * angleStep}
          radius={radius}
          duration={duration}
          index={i}
        />
      ))}
    </div>
  );
}

export function TechStack() {
  return (
    <section id="tech" className="py-32 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal className="text-center mb-16">
          <div className="font-accent text-sm tracking-widest text-[var(--neon-cyan)] font-bold mb-4">[ TECH ARSENAL ]</div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[var(--text-primary)]">Tools I Command</h2>
        </ScrollReveal>

        {/* Orbit System — Desktop */}
        <div className="hidden md:flex justify-center mb-20 overflow-hidden">
          <div className="relative" style={{ width: 900, height: 900, transform: 'scale(min(1, calc(100vw / 960px)))', transformOrigin: 'center top' }}>
            {/* Center HP Monogram */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-24 h-24 rounded-full flex items-center justify-center"
              style={{
                background: 'radial-gradient(circle, rgba(0,240,255,0.15) 0%, rgba(0,240,255,0.03) 70%)',
                border: '2px solid var(--neon-cyan)',
                boxShadow: '0 0 40px rgba(0,240,255,0.4), inset 0 0 20px rgba(0,240,255,0.1)',
              }}>
              <span className="font-display font-black text-2xl text-[var(--neon-cyan)] neon-text-glow">HP</span>
            </div>

            <OrbitRing items={ORBIT_1} radius={180} duration={3} />
            <OrbitRing items={ORBIT_2} radius={280} duration={6} />
            <OrbitRing items={ORBIT_3} radius={400} duration={10} />
          </div>
        </div>

        {/* Tags grid — always visible */}
        <ScrollReveal>
          <div className="flex flex-wrap gap-3 justify-center">
            {EXTRA_TAGS.map((tag, i) => (
              <span
                key={tag}
                className="glass-card font-accent text-xs font-semibold px-4 py-2 rounded-full border border-[var(--border-glow)] text-[var(--text-muted)] hover:text-[var(--neon-cyan)] hover:border-[var(--neon-cyan)] transition-all duration-200 cursor-default"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                {tag}
              </span>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
