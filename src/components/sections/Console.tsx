import { useState } from 'react';
import { ScrollReveal } from '../effects/ScrollReveal';
import { TerminalEngine } from '../effects/TerminalEngine';
import { CodeRain } from '../effects/CodeRain';

export function Console() {
  const [hovered, setHovered] = useState(false);

  return (
    <section
      id="console"
      className="py-32 relative z-10 overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Code Rain background */}
      <div className="absolute inset-0 pointer-events-none">
        <CodeRain intensity={hovered ? 'high' : 'normal'} />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <ScrollReveal className="text-center mb-20">
          <div className="font-accent text-sm tracking-widest text-[var(--danger)] font-bold mb-4">[ SYSTEM STATUS ]</div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[var(--text-primary)]">Inside The Machine</h2>
        </ScrollReveal>

        <ScrollReveal>
          <div className="mb-8">
            <TerminalEngine />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass-card p-6 rounded-lg flex items-center justify-between border-l-2 border-[var(--neon-cyan)]">
              <span className="font-accent text-[var(--text-muted)] uppercase tracking-wider text-sm font-bold">AI Engine</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[var(--neon-cyan)] animate-pulse shadow-[0_0_10px_#00f0ff]" />
                <span className="font-body text-[var(--neon-cyan)] text-xs font-bold tracking-widest">ONLINE</span>
              </div>
            </div>

            <div className="glass-card p-6 rounded-lg flex items-center justify-between border-l-2 border-[var(--neon-violet)]">
              <span className="font-accent text-[var(--text-muted)] uppercase tracking-wider text-sm font-bold">App Builder</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[var(--neon-violet)] animate-pulse shadow-[0_0_10px_#7c3aed]" />
                <span className="font-body text-[var(--neon-violet)] text-xs font-bold tracking-widest">ACTIVE</span>
              </div>
            </div>

            <div className="glass-card p-6 rounded-lg flex items-center justify-between border-l-2 border-[var(--danger)]">
              <span className="font-accent text-[var(--text-muted)] uppercase tracking-wider text-sm font-bold">Creative Mode</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[var(--danger)] animate-pulse shadow-[0_0_10px_#ff2d55]" />
                <span className="font-body text-[var(--danger)] text-xs font-bold tracking-widest">MAXIMUM</span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
