import { useEffect, useRef, useState } from 'react';

export function ScreensaverMode() {
  const [active, setActive] = useState(false);
  const [phase, setPhase] = useState(0);
  const [shattering, setShattering] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
  const TIMEOUT = isMobile ? 90000 : 60000;

  const dismiss = () => {
    if (!active) return;
    setShattering(true);
    setTimeout(() => {
      setActive(false);
      setShattering(false);
      setPhase(0);
    }, 500);
  };

  useEffect(() => {
    const reset = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setActive(true), TIMEOUT);
    };

    reset();
    ['mousemove', 'click', 'keydown', 'scroll', 'touchstart'].forEach(e =>
      window.addEventListener(e, reset, { passive: true })
    );

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      ['mousemove', 'click', 'keydown', 'scroll', 'touchstart'].forEach(e =>
        window.removeEventListener(e, reset)
      );
    };
  }, [TIMEOUT]);

  useEffect(() => {
    if (!active) return;
    const t1 = setTimeout(() => setPhase(1), 200);
    const t2 = setTimeout(() => setPhase(2), 800);
    const t3 = setTimeout(() => setPhase(3), 1400);
    const t4 = setTimeout(() => setPhase(4), 2000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [active]);

  useEffect(() => {
    if (!active) return;
    const dismiss2 = () => dismiss();
    ['mousemove', 'click', 'keydown', 'touchstart'].forEach(e =>
      window.addEventListener(e, dismiss2, { once: true, passive: true })
    );
    return () => {
      ['mousemove', 'click', 'keydown', 'touchstart'].forEach(e =>
        window.removeEventListener(e, dismiss2)
      );
    };
  }, [active]);

  if (!active) return null;

  return (
    <div
      className="fixed inset-0 z-[9990] flex flex-col items-center justify-center text-center cursor-pointer"
      style={{
        background: 'rgba(4,4,10,0.96)',
        opacity: shattering ? 0 : 1,
        transition: shattering ? 'opacity 0.5s ease' : 'opacity 0.4s ease',
        animation: shattering ? 'screensaver-shatter 0.5s ease forwards' : undefined,
      }}
      onClick={dismiss}
    >
      {/* Aurora surge effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(0,240,255,0.06) 0%, transparent 70%)',
          animation: 'aurora-surge 4s ease-in-out infinite',
        }}
      />

      {/* HP Monogram */}
      {phase >= 1 && (
        <div
          className="font-display font-black mb-8"
          style={{
            fontSize: 'clamp(80px, 20vw, 180px)',
            color: 'transparent',
            WebkitTextStroke: '2px rgba(0,240,255,0.4)',
            animation: 'spin-orbit 8s linear infinite',
            opacity: phase >= 1 ? 1 : 0,
            transition: 'opacity 0.6s ease',
            transformOrigin: 'center',
            display: 'block',
          }}
        >
          HP
        </div>
      )}

      {/* Text content */}
      {phase >= 3 && (
        <div
          style={{
            opacity: phase >= 3 ? 1 : 0,
            transition: 'opacity 0.8s ease',
          }}
        >
          <div
            className="font-display font-bold text-[var(--text-primary)] mb-3"
            style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)', letterSpacing: '0.2em' }}
          >
            HAMZA POWERPLAYER
          </div>
          <div className="font-body text-[var(--text-muted)] text-lg flex items-center gap-2 justify-center">
            Still building...
            <span
              className="inline-block bg-[var(--neon-cyan)]"
              style={{ width: 10, height: 22, animation: 'cursor-blink 1s step-end infinite' }}
            />
          </div>
        </div>
      )}

      {phase >= 4 && (
        <div
          className="absolute bottom-8 font-body text-xs text-[var(--text-muted)] opacity-40"
          style={{ animation: 'fadeIn 1s ease forwards' }}
        >
          Touch or move to return
        </div>
      )}

      {/* Particle field */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 60 }, (_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 2 + Math.random() * 3,
              height: 2 + Math.random() * 3,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: ['#00f0ff', '#7c3aed', '#f5c518'][i % 3],
              opacity: 0.2 + Math.random() * 0.5,
              animation: `float ${4 + Math.random() * 6}s ${Math.random() * 4}s ease-in-out infinite alternate`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
