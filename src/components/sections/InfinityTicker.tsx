import { useEffect, useRef } from 'react';

const ROW1 = [
  'HAMZA POWERPLAYER', 'APP DEVELOPER', 'AI BUILDER', 'PAKISTAN',
  'BUILDING THE FUTURE', 'MOBILE APPS', 'ARTIFICIAL INTELLIGENCE',
  'CREATIVE TECH', 'NEXT-GEN DEVELOPER', 'DREAM BIG', 'BUILD MORE',
];

const ROW2 = [
  'FLUTTER', 'PYTHON', 'FIREBASE', 'REACT', 'AI APIS', 'FIGMA',
  'NODE.JS', 'DART', 'SUPABASE', 'GPT-4', 'CLAUDE', 'GEMINI', 'GIT',
  'TYPESCRIPT', 'CURSOR AI', 'REPLIT', 'LANGCHAIN',
];

const SEPARATORS = ['✦', '◆', '⬡', '◈', '⟡'];

function makeTicker(items: string[], sepChar: string) {
  return items.map((t, i) => `${t} ${SEPARATORS[i % SEPARATORS.length]}`).join('  ');
}

const joined1 = makeTicker(ROW1, '✦');
const joined2 = makeTicker(ROW2, '◆');

export function InfinityTicker() {
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const row1 = row1Ref.current;
    const row2 = row2Ref.current;
    const target = row1?.parentElement?.parentElement;
    if (!target) return;

    const obs = new IntersectionObserver(([e]) => {
      const state = e.isIntersecting ? 'running' : 'paused';
      if (row1) row1.style.animationPlayState = state;
      if (row2) row2.style.animationPlayState = state;
    }, { threshold: 0 });
    obs.observe(target);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, rgba(6,6,20,0.95) 0%, rgba(6,6,20,1) 50%, rgba(6,6,20,0.95) 100%)',
        borderTop: '1px solid rgba(0,240,255,0.06)',
        borderBottom: '1px solid rgba(0,240,255,0.06)',
        maskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
      }}
    >
      {/* Top glow line */}
      <div className="absolute top-0 left-0 right-0 h-[1px]"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(0,240,255,0.3), transparent)' }} />

      {/* Row 1 — left scroll */}
      <div className="flex items-center overflow-hidden py-2.5 group">
        <div
          ref={row1Ref}
          className="ticker-row-1 flex shrink-0 whitespace-nowrap group-hover:[animation-play-state:paused]"
        >
          {[joined1, joined1, joined1].map((text, i) => (
            <span
              key={i}
              className="px-6 font-display text-[13px] font-bold uppercase"
              style={{
                color: 'rgba(240,240,255,0.55)',
                letterSpacing: '0.06em',
              }}
            >
              {text}
            </span>
          ))}
        </div>
      </div>

      {/* Separator */}
      <div className="neon-divider opacity-20 mx-8" />

      {/* Row 2 — right scroll */}
      <div className="flex items-center overflow-hidden py-2.5 group">
        <div
          ref={row2Ref}
          className="ticker-row-2 flex shrink-0 whitespace-nowrap group-hover:[animation-play-state:paused]"
        >
          {[joined2, joined2, joined2].map((text, i) => (
            <span
              key={i}
              className="px-6 font-accent text-[12px] uppercase"
              style={{
                color: 'rgba(0,240,255,0.4)',
                letterSpacing: '0.1em',
              }}
            >
              {text}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom glow line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px]"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.3), transparent)' }} />
    </div>
  );
}
