import { BlurReveal } from '../effects/BlurReveal';
import { SpotlightCard } from '../effects/SpotlightCard';
import { GlowText } from '../effects/GlowText';

const CARDS = [
  {
    title: 'OBSESSION OVER BALANCE',
    body: "I don't believe in half-built things. Every project gets everything I have until it's something I'm genuinely proud of.",
    icon: '🔥',
    color: '#f5c518',
    num: '01',
  },
  {
    title: 'SIMPLICITY IS HARD',
    body: "The best interfaces feel effortless. That effortlessness takes hundreds of hours of obsessive refinement to achieve.",
    icon: '⚡',
    color: '#00f0ff',
    num: '02',
  },
  {
    title: 'BUILD FOR TOMORROW',
    body: "I'm not solving today's problems. I'm building for the version of the world that arrives in five years.",
    icon: '🚀',
    color: '#7c3aed',
    num: '03',
  },
];

export function Philosophy() {
  return (
    <section id="philosophy" className="py-32 relative z-10 overflow-hidden">
      {/* Background text watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="font-display font-black whitespace-nowrap text-[var(--text-primary)]"
          style={{ fontSize: '8vw', opacity: 0.025, letterSpacing: '0.2em' }}
        >
          BUILD · SHIP · REPEAT · BUILD · SHIP · REPEAT
        </span>
      </div>

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-[0.04] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, var(--gold), transparent 70%)', filter: 'blur(80px)' }} />

      <div className="max-w-7xl mx-auto px-6 relative">
        <BlurReveal className="text-center mb-16">
          <div className="section-pill mx-auto mb-5 w-fit" style={{ borderColor: 'rgba(245,197,24,0.3)', color: '#f5c518', background: 'rgba(245,197,24,0.06)' }}>
            ◈ PHILOSOPHY
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[var(--text-primary)]">
            How I <GlowText variant="gold" tag="span">Think</GlowText>
          </h2>
        </BlurReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {CARDS.map((card, i) => (
            <BlurReveal key={card.title} delay={i * 100}>
              <SpotlightCard
                className="rounded-2xl p-8 flex flex-col gap-5 h-full"
                spotlightColor={`${card.color}08`}
                borderColor={`${card.color}25`}
                glowColor={`${card.color}20`}
              >
                {/* Number + icon row */}
                <div className="flex items-center justify-between">
                  <span
                    className="font-display font-black text-5xl leading-none opacity-10"
                    style={{ color: card.color }}
                  >
                    {card.num}
                  </span>
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                    style={{
                      background: `${card.color}10`,
                      border: `1px solid ${card.color}25`,
                      boxShadow: `0 0 16px ${card.color}10`,
                    }}
                  >
                    {card.icon}
                  </div>
                </div>

                {/* Content */}
                <div>
                  <div
                    className="font-display font-black text-4xl leading-none mb-4 opacity-40"
                    style={{ color: card.color }}
                    aria-hidden="true"
                  >
                    "
                  </div>
                  <h3
                    className="font-display font-bold text-lg text-[var(--text-primary)] tracking-wider mb-3"
                    style={{ textShadow: `0 0 20px ${card.color}20` }}
                  >
                    {card.title}
                  </h3>
                  <p className="font-accent text-sm text-[var(--text-muted)] leading-relaxed">{card.body}</p>
                </div>

                {/* Bottom accent line */}
                <div className="mt-auto pt-4">
                  <div
                    className="h-[1px] w-12 rounded-full"
                    style={{ background: card.color, boxShadow: `0 0 8px ${card.color}` }}
                  />
                </div>
              </SpotlightCard>
            </BlurReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
