import { useEffect, useRef, useState } from 'react';
import { ScrollReveal } from '../effects/ScrollReveal';
import { NeonLabel } from '../effects/NeonLabel';

export function TheVault() {
  const [unlocked, setUnlocked] = useState(false);
  const [denied, setDenied] = useState(false);
  const [progress, setProgress] = useState(23);
  const dialRef = useRef(0);
  const [dialAngle, setDialAngle] = useState(0);

  useEffect(() => {
    const checkUnlock = () => {
      const konamiDone = sessionStorage.getItem('konami-done') === 'true';
      const hackerDone = sessionStorage.getItem('hacker-done') === 'true';
      if (konamiDone && hackerDone) setUnlocked(true);
    };
    checkUnlock();
    window.addEventListener('konami-activated', checkUnlock);
    window.addEventListener('hacker-activated', () => {
      sessionStorage.setItem('hacker-done', 'true');
      checkUnlock();
    });
    return () => window.removeEventListener('konami-activated', checkUnlock);
  }, []);

  useEffect(() => {
    if (!unlocked) return;
    const interval = setInterval(() => {
      setProgress(prev => Math.min(prev + 1/30, 100));
    }, 1000);
    return () => clearInterval(interval);
  }, [unlocked]);

  // dial rotation on hover
  const handleVaultHover = () => {
    if (unlocked) return;
    dialRef.current += 45;
    setDialAngle(dialRef.current);
    setDenied(true);
    setTimeout(() => setDenied(false), 500);
  };

  return (
    <section id="vault" className="relative py-24 overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <ScrollReveal>
          <NeonLabel>CLASSIFIED</NeonLabel>
          <h2 className="font-display font-black text-4xl md:text-5xl mb-4">
            <span className="holo-text">What's Behind The Door</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal>
          <p className="text-[var(--text-muted)] font-accent mb-12 max-w-lg mx-auto">
            Some projects are too early to show.<br />
            Some ideas are too powerful to reveal.<br />
            When the time is right — this door opens.
          </p>
        </ScrollReveal>

        {/* Vault Door */}
        <div className="flex justify-center">
          <div
            className="relative cursor-pointer select-none"
            onMouseEnter={handleVaultHover}
            style={{
              width: 280, height: 280,
              animation: denied ? 'vault-denied 0.5s ease' : unlocked ? 'vault-open 1.2s cubic-bezier(0.34,1.56,0.64,1) forwards' : 'none',
            }}
          >
            {/* Outer ring */}
            <div className="absolute inset-0 rounded-full"
              style={{
                border: `8px solid ${denied ? 'var(--danger)' : 'rgba(0,240,255,0.3)'}`,
                boxShadow: denied ? '0 0 30px var(--danger)' : '0 0 20px rgba(0,240,255,0.1)',
                transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
              }}>
              {/* Notches */}
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="absolute w-3 h-2 -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: '50%', top: '50%',
                    transformOrigin: '50% 50%',
                    transform: `rotate(${i * 30}deg) translateY(-126px)`,
                    background: denied ? 'var(--danger)' : 'rgba(0,240,255,0.4)',
                    borderRadius: 2,
                    transition: 'background 0.2s ease',
                  }} />
              ))}
            </div>

            {/* Inner ring with bolts */}
            <div className="absolute inset-8 rounded-full"
              style={{ border: '4px solid rgba(0,240,255,0.2)', background: 'rgba(4,4,10,0.9)' }}>
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="absolute w-4 h-4 rounded-full -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: '50%', top: '50%',
                    transform: `rotate(${i * 45}deg) translateY(-90px) translateX(-50%)`,
                    background: 'rgba(0,240,255,0.3)',
                    border: '1px solid rgba(0,240,255,0.5)',
                    boxShadow: '0 0 8px rgba(0,240,255,0.3)',
                    transition: unlocked ? `transform ${0.3 + i * 0.05}s ease ${i * 0.1}s` : 'none',
                  }} />
              ))}
            </div>

            {/* HP monogram */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="font-display font-black text-3xl"
                style={{
                  color: denied ? 'var(--danger)' : 'var(--neon-cyan)',
                  textShadow: denied ? '0 0 20px var(--danger)' : '0 0 20px var(--neon-cyan)',
                  transition: 'color 0.2s ease',
                }}>
                HP
              </div>
            </div>

            {/* Dial */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full cursor-pointer"
              style={{
                background: 'rgba(0,240,255,0.1)',
                border: '2px solid rgba(0,240,255,0.3)',
                transform: `translateX(-50%) rotate(${dialAngle}deg)`,
                transition: 'transform 0.3s ease',
              }}>
              <div className="absolute top-1 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-[var(--neon-cyan)] rounded" />
            </div>

            {/* ACCESS DENIED */}
            {denied && (
              <div className="absolute inset-0 flex items-center justify-center rounded-full"
                style={{ background: 'rgba(255,45,85,0.1)', animation: 'fadeIn 0.1s ease' }}>
                <div className="font-display text-[var(--danger)] text-sm font-black tracking-widest">ACCESS DENIED</div>
              </div>
            )}
          </div>
        </div>

        {/* Unlocked content */}
        {unlocked && (
          <div className="mt-12 rounded-2xl p-8"
            style={{
              background: 'rgba(0,240,255,0.05)',
              border: '1px solid rgba(0,240,255,0.3)',
              animation: 'fadeIn 1s 1.2s ease both',
              opacity: 0,
            }}>
            <div className="font-mono text-xs text-[var(--danger)] mb-4 tracking-widest">⚠ CLASSIFIED — DEV EYES ONLY</div>
            <div className="font-display font-black text-2xl text-[var(--neon-cyan)] mb-2">PROJECT INFINITY</div>
            <div className="font-mono text-xs text-[var(--text-muted)] mb-6">STATUS: INITIALIZING...</div>
            <p className="text-[var(--text-muted)] font-accent mb-6 max-w-md mx-auto">
              An AI platform that will change how developers build.
              Coming when it's ready. Not before.
            </p>
            <div className="max-w-xs mx-auto">
              <div className="flex justify-between font-mono text-xs mb-2">
                <span className="text-[var(--text-muted)]">PROGRESS</span>
                <span className="text-[var(--neon-cyan)]">{progress.toFixed(1)}%</span>
              </div>
              <div className="h-2 rounded-full bg-[rgba(255,255,255,0.06)] overflow-hidden">
                <div className="h-full rounded-full bg-[var(--neon-cyan)]"
                  style={{ width: `${progress}%`, transition: 'width 1s linear', boxShadow: '0 0 10px var(--neon-cyan)' }} />
              </div>
            </div>
          </div>
        )}

        {!unlocked && (
          <p className="text-[var(--text-muted)] font-mono text-xs mt-8 opacity-60">
            [ UNLOCK CONDITIONS: konami code + hacker mode in same session ]
          </p>
        )}
      </div>
    </section>
  );
}
