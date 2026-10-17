import { useEffect, useRef, useState } from 'react';
import { MagneticButton } from '../effects/MagneticButton';
import { ParticleCanvas } from '../effects/ParticleCanvas';
import { WaveformBorder } from '../effects/WaveformBorder';
import { RocketLaunch } from '../effects/RocketLaunch';
import { SplitText } from '../effects/SplitText';
import { GlowText, GradientBadge } from '../effects/GlowText';
import { BlurReveal } from '../effects/BlurReveal';
import { useLenisScroll } from '../effects/SmoothScroll';
import { ArrowDown, Zap, Code2 } from 'lucide-react';

const TITLE = 'HAMZA POWERPLAYER';

const subtitles = [
  'Building Apps for the Future',
  'Engineering AI Experiences',
  'Creating Tomorrow\'s Technology',
];

export function Hero() {
  const [subtitleIndex, setSubtitleIndex] = useState(0);
  const [rocketActive, setRocketActive] = useState(false);
  const [missionDone, setMissionDone] = useState(false);
  const [entered, setEntered] = useState(false);
  const [letterPositions, setLetterPositions] = useState<{ x: number; y: number }[]>(
    Array.from({ length: TITLE.length }, () => ({ x: 0, y: 0 }))
  );
  const titleRef = useRef<HTMLHeadingElement>(null);
  const rafRef = useRef<number>(0);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const targetRef = useRef(Array.from({ length: TITLE.length }, () => ({ x: 0, y: 0 })));
  const currentRef = useRef(Array.from({ length: TITLE.length }, () => ({ x: 0, y: 0 })));
  const explodedRef = useRef(false);
  const lenisScroll = useLenisScroll();

  // Entry animation
  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSubtitleIndex(prev => (prev + 1) % subtitles.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Gravity letter effect
  useEffect(() => {
    const title = titleRef.current;
    if (!title) return;
    const handleMouseMove = (e: MouseEvent) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    const handleMouseLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };
    document.addEventListener('mousemove', handleMouseMove);
    title.addEventListener('mouseleave', handleMouseLeave);

    function loop() {
      const spans = title?.querySelectorAll('.gravity-letter');
      if (!spans || spans.length === 0) { rafRef.current = requestAnimationFrame(loop); return; }
      const updates: { x: number; y: number }[] = [];
      spans.forEach((span, i) => {
        const rect = span.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = mouseRef.current.x - cx;
        const dy = mouseRef.current.y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 130;
        const MAX_PULL = 28;
        let tx = 0, ty = 0;
        if (dist < maxDist && !explodedRef.current) {
          const force = (1 - dist / maxDist) ** 2;
          tx = dx * force * MAX_PULL / Math.max(dist, 1);
          ty = dy * force * MAX_PULL / Math.max(dist, 1);
        }
        targetRef.current[i] = { x: tx, y: ty };
        currentRef.current[i] = {
          x: currentRef.current[i].x + (targetRef.current[i].x - currentRef.current[i].x) * 0.1,
          y: currentRef.current[i].y + (targetRef.current[i].y - currentRef.current[i].y) * 0.1,
        };
        updates.push({ ...currentRef.current[i] });
      });
      setLetterPositions(updates);
      rafRef.current = requestAnimationFrame(loop);
    }
    rafRef.current = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(rafRef.current);
      document.removeEventListener('mousemove', handleMouseMove);
      title?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  function handleTitleClick() {
    if (explodedRef.current) return;
    explodedRef.current = true;
    const newTargets = Array.from({ length: TITLE.length }, () => ({
      x: (Math.random() - 0.5) * 300,
      y: (Math.random() - 0.5) * 200,
    }));
    newTargets.forEach((t, i) => { targetRef.current[i] = t; });
    setTimeout(() => {
      explodedRef.current = false;
      newTargets.forEach((_, i) => { targetRef.current[i] = { x: 0, y: 0 }; });
    }, 2000);
  }

  return (
    <>
      {rocketActive && (
        <RocketLaunch onClose={() => { setRocketActive(false); setMissionDone(true); }} />
      )}

      <section id="hero" className="relative min-h-[100dvh] flex flex-col items-stretch justify-center overflow-hidden">
        {/* Layered backgrounds */}
        <div className="mesh-gradient-bg"><div className="blob-3" /></div>
        <div className="grid-overlay" />
        <ParticleCanvas />

        {/* Floating ghost letters — desktop only */}
        <div className="hidden md:block absolute inset-0 pointer-events-none overflow-hidden z-[1]">
          {['H','A','M','Z','A'].map((char, i) => (
            <div
              key={i}
              className="absolute font-display font-black select-none"
              style={{
                fontSize: 140,
                color: 'transparent',
                WebkitTextStroke: '1px rgba(0,240,255,0.04)',
                left: `${6 + i * 18}%`,
                top: `${8 + Math.sin(i * 1.2) * 18}%`,
                animation: `hero-letter-${i} ${14 + i * 2}s ease-in-out infinite alternate`,
                willChange: 'transform',
              }}
            >
              {char}
            </div>
          ))}
        </div>

        {/* Ambient orbs */}
        <div className="absolute inset-0 pointer-events-none z-[1]">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full opacity-[0.04]"
            style={{ background: 'radial-gradient(circle, #00f0ff, transparent 70%)', filter: 'blur(60px)', animation: 'float 18s ease-in-out infinite alternate' }} />
          <div className="absolute bottom-1/3 left-1/4 w-72 h-72 rounded-full opacity-[0.06]"
            style={{ background: 'radial-gradient(circle, #7c3aed, transparent 70%)', filter: 'blur(60px)', animation: 'float 22s ease-in-out infinite alternate-reverse' }} />
        </div>

        {/* Main content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center flex flex-col items-center mt-16 flex-1 justify-center">
          
          {/* Badge */}
          <div
            style={{
              opacity: entered ? 1 : 0,
              transform: entered ? 'translateY(0)' : 'translateY(-20px)',
              transition: 'opacity 0.8s ease 0.2s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s',
            }}
            className="mb-8 flex flex-wrap items-center justify-center gap-2"
          >
            <GradientBadge color="cyan">
              <Code2 size={10} />
              APP DEVELOPER
            </GradientBadge>
            <GradientBadge color="violet">AI BUILDER</GradientBadge>
            <GradientBadge color="gold">CREATOR</GradientBadge>
          </div>

          {/* Gravity title */}
          <h1
            ref={titleRef}
            className="font-display font-black mb-6 tracking-tight leading-tight cursor-pointer"
            style={{
              fontSize: 'clamp(2.4rem, 9.5vw, 6.5rem)',
              opacity: entered ? 1 : 0,
              transform: entered ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.96)',
              transition: 'opacity 1s ease 0.4s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.4s',
            }}
            onClick={handleTitleClick}
          >
            {TITLE.split('').map((char, i) => (
              <span
                key={i}
                className={`gravity-letter inline-block ${char === ' ' ? 'w-[0.28em]' : ''}`}
                style={{
                  transform: `translate(${letterPositions[i]?.x ?? 0}px, ${letterPositions[i]?.y ?? 0}px)`,
                  transition: explodedRef.current ? 'transform 2s cubic-bezier(0.34,1.56,0.64,1)' : 'none',
                  willChange: 'transform',
                  backgroundImage: 'linear-gradient(135deg, #00f0ff 0%, #a78bfa 40%, #00f0ff 80%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: `drop-shadow(0 0 ${8 + Math.abs(letterPositions[i]?.x ?? 0) * 0.25}px rgba(0,240,255,0.55))`,
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h1>

          {/* Rotating subtitle */}
          <div
            className="h-8 mb-10 relative overflow-hidden w-full max-w-xl mx-auto"
            style={{
              opacity: entered ? 1 : 0,
              transition: 'opacity 0.8s ease 0.8s',
            }}
          >
            {subtitles.map((sub, i) => (
              <div
                key={i}
                className={`absolute inset-0 font-accent text-lg md:text-xl text-[var(--text-muted)] transition-all duration-1000 transform ${
                  i === subtitleIndex ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
              >
                {sub}
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row gap-4 mb-6"
            style={{
              opacity: entered ? 1 : 0,
              transform: entered ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.8s ease 1.1s, transform 0.8s ease 1.1s',
            }}
          >
            <MagneticButton onClick={() => lenisScroll('projects')}>
              <Zap size={14} className="mr-1.5" />
              EXPLORE PROJECTS
            </MagneticButton>
            <MagneticButton variant="secondary" onClick={() => lenisScroll('contact')}>
              CONTACT ME
            </MagneticButton>
          </div>

          {/* Rocket Launch */}
          <div
            className="relative mt-2"
            style={{
              opacity: entered ? 1 : 0,
              transition: 'opacity 0.8s ease 1.3s',
            }}
          >
            <button
              onClick={() => setRocketActive(true)}
              disabled={rocketActive}
              className="relative px-8 py-3 rounded-full font-display font-black text-sm tracking-widest transition-all hover:scale-105 disabled:opacity-50 interactive"
              style={{
                border: '1px solid rgba(0,240,255,0.4)',
                background: 'rgba(0,240,255,0.06)',
                color: 'var(--neon-cyan)',
                boxShadow: '0 0 20px rgba(0,240,255,0.15), inset 0 0 20px rgba(0,240,255,0.04)',
                animation: 'rocket-shimmer 2.5s ease-in-out infinite',
              }}
            >
              <span className="mr-2">🚀</span>
              LAUNCH SEQUENCE — INITIATE
              <div className="absolute -inset-1 rounded-full border border-[rgba(0,240,255,0.2)]"
                style={{ animation: 'attention-ring 2.5s ease-in-out infinite' }} />
            </button>
            {missionDone && (
              <div className="mt-3 font-mono text-xs text-[var(--gold)] text-center"
                style={{ textShadow: '0 0 10px var(--gold)', animation: 'fadeIn 0.5s ease' }}>
                [ MISSION COMPLETE ✓ ]
              </div>
            )}
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
          style={{
            opacity: entered ? 1 : 0,
            transition: 'opacity 1s ease 1.6s',
            animation: entered ? 'float-y 3s ease-in-out infinite 1.6s' : 'none',
          }}
        >
          <span className="font-accent text-[10px] tracking-[4px] text-[var(--text-muted)] uppercase">Scroll</span>
          <div className="w-[1px] h-10 bg-gradient-to-b from-[var(--neon-cyan)] to-transparent" />
          <ArrowDown size={12} className="text-[var(--neon-cyan)] opacity-60" />
        </div>

        {/* Waveform border at bottom */}
        <div className="relative z-10 w-full mt-auto">
          <WaveformBorder />
        </div>
      </section>
    </>
  );
}
