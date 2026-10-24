import { BlurReveal } from '../effects/BlurReveal';
import { SpotlightCard } from '../effects/SpotlightCard';
import { GlowText } from '../effects/GlowText';
import { CheckCircle2, Clock, Rocket, Star } from 'lucide-react';

const YEARS = [
  {
    year: 'NOW',
    title: 'THE BUILD',
    state: 'current',
    goals: ['Maintain PakiGPA, SubSight, and The Last Bell', 'Grow public GitHub projects', 'Ship the remaining game projects'],
    status: 'IN PROGRESS',
  },
  {
    year: 'NEXT',
    title: 'THE SHIP',
    state: 'future',
    goals: ['Grow the Android games lineup', 'Expand the developer toolbox', 'Publish more public source'],
    status: 'UPCOMING',
  },
  {
    year: 'LATER',
    title: 'THE CRAFT',
    state: 'future',
    goals: ['Build tools other developers rely on', 'Share what is learned in public', 'Keep every project privacy-first'],
    status: 'UPCOMING',
  },
  {
    year: 'VISION',
    title: 'THE LEGACY',
    state: 'far',
    goals: ['A recognized independent developer brand', 'Products that respect user privacy', 'Open work from Pakistan'],
    status: 'THE DREAM',
  },
];

const STATE_CONFIG: Record<string, { color: string; bg: string; opacity: number }> = {
  past:    { color: 'rgba(255,255,255,0.3)',  bg: 'rgba(255,255,255,0.03)', opacity: 0.55 },
  current: { color: '#00f0ff',               bg: 'rgba(0,240,255,0.05)',   opacity: 1 },
  future:  { color: '#7c3aed',               bg: 'rgba(124,58,237,0.04)', opacity: 0.85 },
  far:     { color: '#f5c518',               bg: 'rgba(245,197,24,0.04)', opacity: 0.92 },
};

const STATUS_ICON: Record<string, typeof CheckCircle2> = {
  COMPLETE: CheckCircle2,
  'IN PROGRESS': Clock,
  UPCOMING: Rocket,
  'THE DREAM': Star,
};

const STATUS_COLOR: Record<string, string> = {
  COMPLETE: '#00ff88',
  'IN PROGRESS': '#00f0ff',
  UPCOMING: '#7c3aed',
  'THE DREAM': '#f5c518',
};

export function Roadmap() {
  return (
    <section id="roadmap" className="py-32 relative z-10 overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full opacity-[0.03]"
          style={{ background: 'radial-gradient(ellipse, #7c3aed, transparent 70%)', filter: 'blur(100px)' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <BlurReveal className="text-center mb-16">
          <div className="section-pill mx-auto mb-5 w-fit" style={{ borderColor: 'rgba(124,58,237,0.3)', color: '#a78bfa', background: 'rgba(124,58,237,0.06)' }}>
            ⟡ ROADMAP
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[var(--text-primary)]">
            The <GlowText variant="violet" tag="span">Plan</GlowText>
          </h2>
          <p className="font-accent text-[var(--text-muted)] mt-4 max-w-md mx-auto">
            Where I've been, where I am, and where I'm going.
          </p>
        </BlurReveal>

        <div
          className="flex gap-5 overflow-x-auto pb-8 roadmap-scroll"
          style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {YEARS.map((y, i) => {
            const cfg = STATE_CONFIG[y.state];
            const StatusIcon = STATUS_ICON[y.status];
            const statusColor = STATUS_COLOR[y.status];

            return (
              <BlurReveal key={y.year} delay={i * 60} className="shrink-0" style={{ scrollSnapAlign: 'center', minWidth: 280 } as React.CSSProperties}>
                <SpotlightCard
                  className="p-7 flex flex-col gap-5 rounded-2xl h-full"
                  spotlightColor={`${cfg.color}08`}
                  borderColor={`${cfg.color}25`}
                  glowColor={`${cfg.color}20`}
                >
                  <div style={{ opacity: cfg.opacity }}>
                    {/* Current badge */}
                    {y.state === 'current' && (
                      <div className="flex items-center gap-1.5 mb-3">
                        <div className="glow-dot" />
                        <span className="font-accent text-[10px] tracking-widest text-[var(--success)] font-bold">YOU ARE HERE</span>
                      </div>
                    )}

                    {/* Year */}
                    <div
                      className="font-display font-black text-5xl leading-none mb-2"
                      style={{ color: cfg.color, textShadow: `0 0 20px ${cfg.color}50` }}
                    >
                      {y.year}
                    </div>

                    {/* Title */}
                    <div className="font-display font-bold text-sm text-[var(--text-primary)] tracking-widest mb-4">{y.title}</div>

                    {/* Goals */}
                    <ul className="flex flex-col gap-2 mb-5">
                      {y.goals.map((goal) => (
                        <li key={goal} className="flex items-start gap-2">
                          <span
                            className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                            style={{ background: cfg.color, boxShadow: `0 0 4px ${cfg.color}` }}
                          />
                          <span className="font-accent text-xs text-[var(--text-muted)] leading-relaxed">{goal}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Status badge */}
                    <div
                      className="flex items-center gap-2 px-3 py-1.5 rounded-full w-fit text-xs font-display font-bold tracking-wider"
                      style={{
                        background: `${statusColor}10`,
                        border: `1px solid ${statusColor}30`,
                        color: statusColor,
                      }}
                    >
                      <StatusIcon size={11} />
                      {y.status}
                    </div>
                  </div>
                </SpotlightCard>
              </BlurReveal>
            );
          })}
        </div>

        {/* Scroll hint */}
        <div className="text-center mt-6">
          <span className="font-accent text-[10px] text-[var(--text-muted)] tracking-widest">← SCROLL TO EXPLORE →</span>
        </div>
      </div>
    </section>
  );
}
