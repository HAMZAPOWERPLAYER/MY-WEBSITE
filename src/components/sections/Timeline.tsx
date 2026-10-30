import { useEffect, useRef, useState } from 'react';
import { BlurReveal } from '../effects/BlurReveal';
import { SpotlightCard } from '../effects/SpotlightCard';
import { GlowText } from '../effects/GlowText';

const nodes = [
  {
    title: 'LEARNING',
    year: '2020',
    desc: 'Discovered the power of code. Started with the basics, fell in love with the craft.',
    icon: '📚',
    color: '#00f0ff',
  },
  {
    title: 'BUILDING',
    year: '2021',
    desc: 'First apps. First failures. First breakthroughs. Every bug was a lesson.',
    icon: '🔨',
    color: '#7c3aed',
  },
  {
    title: 'PUBLISHING',
    year: '2022',
    desc: 'Learned what it takes to finish and share a project.',
    icon: '🚀',
    color: '#f5c518',
  },
  {
    title: 'SCALING',
    year: '2023',
    desc: 'Growing the portfolio. Larger projects. Deeper expertise. Higher standards.',
    icon: '📈',
    color: '#00ff88',
  },
  {
    title: 'FUTURE',
    year: '2025+',
    desc: 'AI. Automation. Impact at scale. The biggest chapter hasn\'t been written yet.',
    icon: '⚡',
    color: '#ff2d55',
  },
];

export function Timeline() {
  const lineRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!lineRef.current) return;
      const rect = lineRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const topOffset = windowHeight * 0.5;
      if (rect.top > topOffset) setProgress(0);
      else if (rect.bottom < topOffset) setProgress(100);
      else setProgress(((topOffset - rect.top) / rect.height) * 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="timeline" className="py-32 relative z-10 parallax-layer" data-speed="0.9">
      <div className="max-w-4xl mx-auto px-6">
        <BlurReveal className="text-center mb-20">
          <div className="section-pill mx-auto mb-5 w-fit">⟡ JOURNEY</div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[var(--text-primary)]">
            The Road <GlowText variant="violet" tag="span">So Far</GlowText>
          </h2>
        </BlurReveal>

        <div className="relative py-10" ref={lineRef}>
          {/* Background line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-[rgba(255,255,255,0.04)] md:-translate-x-1/2" />

          {/* Animated progress line */}
          <div
            className="absolute left-6 md:left-1/2 top-0 w-px md:-translate-x-1/2 transition-all duration-300 ease-out"
            style={{
              height: `${progress}%`,
              background: 'linear-gradient(to bottom, var(--neon-cyan), var(--neon-violet))',
              boxShadow: '0 0 12px rgba(0,240,255,0.6)',
            }}
          />

          <div className="flex flex-col gap-14 md:gap-20 relative z-10">
            {nodes.map((node, i) => {
              const isEven = i % 2 === 0;
              const isFilled = progress > (i / (nodes.length - 1)) * 100;

              return (
                <BlurReveal key={i} delay={i * 60} blur={12}>
                  <div className={`flex flex-col md:flex-row items-start md:items-center ${isEven ? 'md:flex-row-reverse' : ''}`}>
                    {/* Node circle */}
                    <div
                      className={`absolute left-6 md:left-1/2 -translate-x-1/2 w-5 h-5 rounded-full border-2 bg-[var(--bg-base)] z-20 transition-all duration-700 ${
                        isFilled ? 'scale-125' : 'scale-100'
                      }`}
                      style={{
                        borderColor: isFilled ? node.color : 'rgba(255,255,255,0.1)',
                        boxShadow: isFilled ? `0 0 16px ${node.color}80` : 'none',
                      }}
                    >
                      {isFilled && (
                        <div
                          className="absolute inset-[3px] rounded-full transition-all duration-500"
                          style={{ background: node.color, boxShadow: `0 0 8px ${node.color}` }}
                        />
                      )}
                    </div>

                    {/* Content card */}
                    <div className={`ml-14 md:ml-0 md:w-5/12 ${isEven ? 'md:pl-12' : 'md:pr-12 md:text-right'}`}>
                      <SpotlightCard
                        className="p-6 rounded-2xl"
                        spotlightColor={`${node.color}08`}
                        borderColor={`${node.color}25`}
                        glowColor={`${node.color}15`}
                      >
                        {/* Year + icon */}
                        <div className={`flex items-center gap-2 mb-3 ${isEven ? '' : 'md:justify-end'}`}>
                          <span className="text-xl">{node.icon}</span>
                          <span
                            className="font-body text-xs font-bold tracking-widest"
                            style={{ color: node.color }}
                          >
                            {node.year}
                          </span>
                        </div>

                        <h3
                          className="font-display text-lg font-bold mb-2"
                          style={{ color: node.color, textShadow: `0 0 12px ${node.color}40` }}
                        >
                          {node.title}
                        </h3>
                        <p className="font-accent text-sm text-[var(--text-muted)] leading-relaxed">
                          {node.desc}
                        </p>
                      </SpotlightCard>
                    </div>

                    {/* Spacer for opposite side */}
                    <div className="hidden md:block md:w-5/12" />
                  </div>
                </BlurReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
