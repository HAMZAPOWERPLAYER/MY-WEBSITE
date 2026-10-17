import { useEffect, useRef, useState } from 'react';
import { ScrollReveal } from '../effects/ScrollReveal';
import { NeonLabel } from '../effects/NeonLabel';

export function TheForge() {
  const [phase, setPhase] = useState<0 | 1 | 2>(0);
  const [progress, setProgress] = useState(0);
  const [temp, setTemp] = useState(0);
  const [running, setRunning] = useState(false);
  const [sparks, setSparks] = useState<{x:number;y:number;vx:number;vy:number;life:number}[]>([]);
  const rafRef = useRef<number>(0);
  const startRef = useRef(0);

  function forge() {
    setPhase(0);
    setProgress(0);
    setTemp(0);
    setRunning(true);
    startRef.current = performance.now();
    cancelAnimationFrame(rafRef.current);
    animate();
  }

  function animate() {
    const loop = () => {
      const elapsed = (performance.now() - startRef.current) / 1000;

      if (elapsed < 1.5) {
        setPhase(0);
        setSparks(prev => {
          const next = prev.filter(s => s.life > 0).map(s => ({ ...s, x: s.x + s.vx, y: s.y + s.vy, life: s.life - 0.04 }));
          if (Math.random() < 0.3) {
            next.push({ x: 50 + Math.random() * 20, y: 60 + Math.random() * 20, vx: (Math.random() - 0.5) * 4, vy: -1 - Math.random() * 3, life: 1 });
          }
          return next;
        });
      } else if (elapsed < 4.5) {
        setPhase(1);
        const p = Math.min((elapsed - 1.5) / 3, 1);
        setProgress(p * 100);
        setTemp(p);
        setSparks([]);
      } else if (elapsed < 6) {
        setPhase(2);
        setProgress(100);
        setTemp(1);
      } else {
        setRunning(false);
        return;
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
  }

  useEffect(() => forge(), []);

  const tempDeg = -60 + temp * 120;

  return (
    <section id="forge" className="relative py-24">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <NeonLabel>THE FORGE</NeonLabel>
          <h2 className="font-display font-black text-4xl md:text-5xl mb-4">
            <span className="holo-text">Watch a Skill Get Built</span>
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 mt-12">
          {/* Phase 1 */}
          <div className={`relative rounded-l-2xl p-8 border transition-all duration-500 ${phase === 0 ? 'border-[var(--neon-cyan)] bg-[rgba(0,240,255,0.05)]' : 'border-[rgba(255,255,255,0.06)] bg-[rgba(8,8,26,0.6)]'}`}>
            <div className="font-mono text-[var(--neon-cyan)] text-xs tracking-widest mb-6 opacity-60">PHASE 01</div>
            <div className="flex flex-col items-center gap-6">
              <div className="relative">
                <div
                  className="w-20 h-20"
                  style={{
                    clipPath: 'polygon(20% 0%, 80% 0%, 100% 30%, 100% 70%, 80% 100%, 20% 100%, 0% 70%, 0% 30%)',
                    background: phase === 0 ? 'linear-gradient(135deg, #2a2a3a, #1a1a2a)' : 'linear-gradient(135deg, #3a3a4a, #2a2a3a)',
                    boxShadow: phase === 0 ? '0 0 20px rgba(0,240,255,0.1)' : 'none',
                  }}
                />
                {sparks.map((s, i) => (
                  <div key={i} className="absolute w-1 h-1 rounded-full"
                    style={{ left: s.x, top: s.y, background: '#ff8800', opacity: s.life, transform: 'translate(-50%,-50%)' }} />
                ))}
              </div>
              <div className="text-center">
                <div className="font-display text-sm font-bold text-[var(--text-muted)] mb-1">RAW IDEA</div>
                <p className="text-xs text-[var(--text-muted)] opacity-60">Unrefined, formless. Potential energy waiting.</p>
              </div>
            </div>
          </div>

          {/* Arrow */}
          <div className="hidden md:flex items-center justify-center relative">
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="font-mono text-2xl text-[var(--neon-cyan)] opacity-60" style={{ animation: 'fadeIn 0.5s ease infinite alternate' }}>→</div>
            </div>
          </div>

          {/* Phase 2 */}
          <div className={`relative p-8 border transition-all duration-500 ${phase === 1 ? 'border-[#ff6800] bg-[rgba(255,104,0,0.05)]' : phase === 2 ? 'border-[rgba(255,255,255,0.06)]' : 'border-[rgba(255,255,255,0.06)] bg-[rgba(8,8,26,0.6)] opacity-40'}`}>
            <div className="font-mono text-[#ff6800] text-xs tracking-widest mb-6 opacity-60">PHASE 02</div>
            <div className="flex flex-col items-center gap-4">
              {/* Furnace */}
              <div className="relative w-24 h-20 rounded-lg overflow-hidden"
                style={{ background: '#1a0800', border: '2px solid #ff4400' }}>
                {phase >= 1 && (
                  <div className="absolute bottom-0 left-0 right-0"
                    style={{
                      height: `${50 + Math.random() * 30}%`,
                      background: 'linear-gradient(to top, #ff2200, #ff6600, #ffaa00, #ffee00)',
                      animation: 'fire-flicker 0.3s ease infinite',
                    }} />
                )}
                <div
                  className="absolute inset-0 flex items-center justify-center font-display font-black text-white text-opacity-50 text-xs z-10"
                  style={{ mixBlendMode: 'overlay' }}>
                  {phase >= 1 ? '🔥' : '❄️'}
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full">
                <div className="flex justify-between font-mono text-xs mb-1">
                  <span className="text-[var(--text-muted)]">LEARNING</span>
                  <span className="text-[var(--gold)]">{Math.floor(progress)}%</span>
                </div>
                <div className="h-2 bg-[rgba(255,255,255,0.06)] rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-100"
                    style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #ff4400, #ffaa00, #ffee00)' }} />
                </div>
              </div>

              {/* Temperature gauge */}
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-[var(--text-muted)]">❄</span>
                <div className="relative w-16 h-16">
                  <svg viewBox="0 0 64 64" className="w-full h-full">
                    <circle cx="32" cy="32" r="24" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
                    <line x1="32" y1="32" x2={32 + Math.cos((tempDeg - 90) * Math.PI / 180) * 18} y2={32 + Math.sin((tempDeg - 90) * Math.PI / 180) * 18}
                      stroke="#ff6800" strokeWidth="2" strokeLinecap="round"
                      style={{ transition: 'all 0.1s linear', transformOrigin: '32px 32px' }} />
                    <circle cx="32" cy="32" r="3" fill="#ff6800" />
                  </svg>
                </div>
                <span className="font-mono text-xs text-[#ff4400]">🔥</span>
              </div>
            </div>
          </div>

          {/* Arrow 2 */}
          <div className="hidden md:flex items-center justify-center relative">
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="font-mono text-2xl text-[var(--gold)] opacity-60">→</div>
            </div>
          </div>

          {/* Phase 3 */}
          <div className={`relative rounded-r-2xl p-8 border transition-all duration-700 ${phase === 2 ? 'border-[var(--gold)] bg-[rgba(245,197,24,0.06)]' : 'border-[rgba(255,255,255,0.06)] bg-[rgba(8,8,26,0.6)] opacity-40'}`}>
            <div className="font-mono text-[var(--gold)] text-xs tracking-widest mb-6 opacity-60">PHASE 03</div>
            <div className="flex flex-col items-center gap-6">
              <div
                className="w-20 h-20 flex items-center justify-center"
                style={{
                  clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                  background: phase === 2 ? 'linear-gradient(135deg, #f5c518, #ff8800)' : 'linear-gradient(135deg, #2a2a3a, #1a1a2a)',
                  boxShadow: phase === 2 ? '0 0 40px rgba(245,197,24,0.6), 0 0 80px rgba(245,197,24,0.3)' : 'none',
                  transition: 'all 0.7s ease',
                  animation: phase === 2 ? 'gold-pulse 2s ease infinite' : 'none',
                }}
              />
              <div className="text-center">
                <div className="font-display text-sm font-bold text-[var(--gold)] mb-1">DEPLOYED SKILL</div>
                <p className="text-xs text-[var(--text-muted)] opacity-60">Forged, sharpened, and ready to ship.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-4">
          <button
            onClick={forge}
            disabled={running}
            className="px-8 py-3 rounded-full font-display font-black text-sm tracking-widest border transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              borderColor: 'var(--gold)', color: 'var(--gold)',
              background: 'rgba(245,197,24,0.08)',
              boxShadow: '0 0 20px rgba(245,197,24,0.2)',
            }}
          >
            {running ? '⚒ FORGING...' : '[ FORGE A SKILL ]'}
          </button>
          <p className="text-[var(--text-muted)] font-accent text-sm italic">
            This is what learning looks like from the inside.
          </p>
        </div>
      </div>
    </section>
  );
}
