import { ScrollReveal } from '../effects/ScrollReveal';
import { BlurReveal } from '../effects/BlurReveal';
import { SpotlightCard } from '../effects/SpotlightCard';
import { GlowText, GradientBadge } from '../effects/GlowText';
import { NumberTicker } from '../effects/NumberTicker';
import { SpinningGlobe } from '../effects/SpinningGlobe';
import { User, Rocket, Brain } from 'lucide-react';
import { APPS, GAMES, PROJECTS } from '@/lib/products';
import { SITE_LINKS } from '@/lib/siteLinks';

const STATS = [
  { val: APPS.length, suffix: '', label: 'Published Apps', color: 'var(--neon-cyan)' },
  { val: PROJECTS.length, suffix: '', label: 'Public Repositories', color: 'var(--gold)' },
  { val: GAMES.length, suffix: '', label: 'Games in Development', color: 'var(--neon-violet)' },
  { val: SITE_LINKS.length, suffix: '', label: 'Verified Destinations', color: 'var(--neon-cyan)' },
];

export function About() {
  return (
    <section id="about" className="py-[clamp(60px,10vh,140px)] relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* Globe side */}
          <ScrollReveal className="flex justify-center order-2 md:order-1" variant="slide-right">
            <div className="relative flex flex-col items-center w-full">
              <SpinningGlobe />

              {/* Status badge */}
              <div
                className="mt-6 flex items-center gap-3 px-5 py-2.5 rounded-full"
                style={{
                  background: 'rgba(0,255,136,0.06)',
                  border: '1px solid rgba(0,255,136,0.2)',
                  boxShadow: '0 0 20px rgba(0,255,136,0.08)',
                }}
              >
                <div className="glow-dot" />
                <span className="font-display text-xs font-bold tracking-widest text-[var(--success)]">AVAILABLE FOR PROJECTS</span>
              </div>

              {/* Stat chips */}
              <div className="grid grid-cols-2 gap-3 mt-6 w-full max-w-xs">
                {STATS.map((s, i) => (
                  <SpotlightCard
                    key={i}
                    className="p-4 text-center rounded-xl"
                    spotlightColor={`${s.color}10`}
                    borderColor={`${s.color}25`}
                    glowColor={`${s.color}20`}
                  >
                    <div
                      className="font-display font-black text-xl"
                      style={{ color: s.color, textShadow: `0 0 10px ${s.color}60` }}
                    >
                      <NumberTicker value={s.val} suffix={s.suffix} duration={1600} delay={i * 200} />
                    </div>
                    <div className="font-accent text-[10px] text-[var(--text-muted)] tracking-wider mt-0.5">{s.label}</div>
                  </SpotlightCard>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Text side */}
          <BlurReveal className="order-1 md:order-2" delay={100}>
            <div className="flex flex-col gap-6">
              <div className="section-pill w-fit">
                <User size={10} />
                ABOUT ME
              </div>

              <h2 className="font-display text-4xl md:text-5xl font-bold text-[var(--text-primary)] leading-tight">
                Young Developer.<br />
                <GlowText variant="gold" tag="span">Big Vision.</GlowText>
              </h2>

              <p className="font-accent text-lg text-[var(--text-muted)] leading-relaxed">
                I'm Hamza — a Pakistani developer obsessed with building things that matter. From powerful mobile apps to intelligent AI tools, I create digital experiences that push the limits of what's possible.
              </p>
              <p className="font-accent text-[var(--text-muted)] leading-relaxed">
                Every line of code I write is a step toward the future I'm building. I don't just ship apps — I ship experiences that leave users saying <em className="text-[var(--neon-cyan)]">"how did he build that?"</em>
              </p>

              {/* Quote block */}
              <div
                className="relative pl-5 py-3 rounded-r-xl"
                style={{
                  borderLeft: '2px solid var(--neon-cyan)',
                  background: 'linear-gradient(90deg, rgba(0,240,255,0.05), transparent)',
                }}
              >
                <span className="font-display text-sm text-[var(--neon-cyan)] font-bold tracking-wider">
                  Building in Public A� Shipping Offline-First A� Open Source
                </span>
              </div>

              {/* Feature pills */}
              <div className="flex flex-wrap gap-2 mt-2">
                {[
                  { icon: <Rocket size={10} />, label: 'Fast Delivery' },
                  { icon: <Brain size={10} />, label: 'AI-First Mindset' },
                  { icon: '🇵🇰', label: 'Based in Pakistan' },
                  { icon: '🌍', label: 'Working Globally' },
                ].map((item, i) => (
                  <GradientBadge key={i} color={i % 3 === 0 ? 'cyan' : i % 3 === 1 ? 'violet' : 'gold'}>
                    {typeof item.icon === 'string' ? <span>{item.icon}</span> : item.icon}
                    {item.label}
                  </GradientBadge>
                ))}
              </div>
            </div>
          </BlurReveal>

        </div>
      </div>
    </section>
  );
}
