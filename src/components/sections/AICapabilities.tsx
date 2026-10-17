import { BlurReveal } from '../effects/BlurReveal';
import { SpotlightCard } from '../effects/SpotlightCard';
import { GlowText } from '../effects/GlowText';
import { SplitText } from '../effects/SplitText';

const HEXES = [
  { icon: '🤖', title: 'LLM INTEGRATION', body: 'Connecting apps to GPT, Claude, Gemini, and custom models', color: '#00f0ff' },
  { icon: '✍️', title: 'PROMPT ENGINEERING', body: 'Designing precise system prompts that make AI behave exactly as intended', color: '#7c3aed' },
  { icon: '⚡', title: 'AI AUTOMATION', body: 'Workflows that run themselves — triggered, smart, unstoppable', color: '#f5c518' },
  { icon: '🔍', title: 'VECTOR SEARCH', body: 'Semantic search and RAG systems for intelligent information retrieval', color: '#00ff88' },
  { icon: '🕵️', title: 'AI AGENTS', body: 'Autonomous systems that plan, execute, and report back', color: '#ff2d55' },
  { icon: '🎓', title: 'FINE-TUNING', body: 'Teaching models new tricks on domain-specific datasets', color: '#00f0ff' },
];

const HEX_CLIP = 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)';

function HexCard({ hex, delay }: { hex: typeof HEXES[0]; delay: number }) {
  return (
    <BlurReveal delay={delay}>
      <div
        className="group relative cursor-default"
        style={{ width: 180, height: 200 }}
      >
        {/* Hex shape base */}
        <div
          className="absolute inset-0 transition-all duration-500"
          style={{
            clipPath: HEX_CLIP,
            background: `${hex.color}04`,
            border: `1px solid ${hex.color}20`,
          }}
        />
        {/* Glow on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
          style={{
            clipPath: HEX_CLIP,
            background: `${hex.color}12`,
            boxShadow: `inset 0 0 30px ${hex.color}30`,
          }}
        />
        {/* Circuit trace */}
        <svg className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" viewBox="0 0 180 200" fill="none">
          <polygon
            points="90,0 180,50 180,150 90,200 0,150 0,50"
            stroke={hex.color}
            strokeWidth="1.5"
            fill="none"
            strokeDasharray="600"
            strokeDashoffset="600"
            style={{ animation: 'circuit-trace 1.5s linear infinite' }}
          />
        </svg>
        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-6 text-center z-10">
          <span className="text-3xl">{hex.icon}</span>
          <h3 className="font-display text-[11px] font-bold tracking-widest leading-tight" style={{ color: hex.color }}>
            {hex.title}
          </h3>
          <p className="font-accent text-[10px] text-[var(--text-muted)] leading-snug opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {hex.body}
          </p>
        </div>
      </div>
    </BlurReveal>
  );
}

export function AICapabilities() {
  return (
    <section id="ai" className="py-32 relative z-10" style={{ background: 'linear-gradient(to bottom, var(--bg-base), #02020a, var(--bg-base))' }}>
      <div className="max-w-7xl mx-auto px-6">
        <BlurReveal className="text-center mb-16">
          <div className="section-pill mx-auto mb-5 w-fit" style={{ borderColor: 'rgba(124,58,237,0.3)', color: '#a78bfa', background: 'rgba(124,58,237,0.06)' }}>
            🤖 AI POWERS
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[var(--text-primary)]">
            Where I Meet <GlowText variant="violet" tag="span">Artificial Intelligence</GlowText>
          </h2>
        </BlurReveal>

        {/* Capability cards — enterprise grid on desktop, hex honeycomb spirit */}
        <div className="hidden md:grid grid-cols-3 gap-5 mb-16">
          {HEXES.map((hex, i) => (
            <BlurReveal key={i} delay={i * 80}>
              <SpotlightCard
                className="p-7 rounded-2xl flex flex-col gap-4 h-full"
                spotlightColor={`${hex.color}08`}
                borderColor={`${hex.color}25`}
                glowColor={`${hex.color}15`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                    style={{ background: `${hex.color}10`, border: `1px solid ${hex.color}20` }}
                  >
                    {hex.icon}
                  </div>
                  <h3 className="font-display text-sm font-bold tracking-widest" style={{ color: hex.color }}>
                    {hex.title}
                  </h3>
                </div>
                <p className="font-accent text-sm text-[var(--text-muted)] leading-relaxed">{hex.body}</p>
                <div className="mt-auto">
                  <div className="enterprise-progress">
                    <div className="enterprise-progress-fill" style={{ width: `${75 + i * 5}%`, background: `linear-gradient(90deg, ${hex.color}, ${hex.color}60)` }} />
                  </div>
                </div>
              </SpotlightCard>
            </BlurReveal>
          ))}
        </div>

        {/* Mobile — hexes */}
        <div className="md:hidden flex flex-col items-center gap-2 mb-16">
          <div className="flex gap-4">
            {HEXES.slice(0, 3).map((hex, i) => <HexCard key={i} hex={hex} delay={i * 80} />)}
          </div>
          <div className="flex gap-4" style={{ marginTop: -32 }}>
            {HEXES.slice(3, 6).map((hex, i) => <HexCard key={i + 3} hex={hex} delay={(i + 3) * 80} />)}
          </div>
        </div>

        {/* Bottom statement */}
        <BlurReveal className="text-center" delay={400}>
          <SplitText
            className="font-display text-2xl md:text-4xl font-black text-[var(--text-primary)] tracking-wider"
            style={{ textShadow: '0 0 30px rgba(0,240,255,0.3)' } as React.CSSProperties}
            tag="p"
            from="blur"
            stagger={25}
            delay={500}
          >
            THE FUTURE RUNS ON AI. SO DO I.
          </SplitText>
        </BlurReveal>
      </div>
    </section>
  );
}
