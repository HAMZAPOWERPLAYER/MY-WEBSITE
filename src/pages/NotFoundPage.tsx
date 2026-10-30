import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'wouter';
import AuroraEngine from '@/components/effects/AuroraEngine';
import { PageNavbar } from '@/components/layout/PageNavbar';

function BouncingLogo() {
  const ref = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 100, y: 100, vx: 1.2, vy: 0.9 });
  const [explode, setExplode] = useState(false);

  useEffect(() => {
    let rafId: number;
    const animate = () => {
      const el = ref.current;
      if (!el) return;
      const p = pos.current;
      const w = window.innerWidth - 60, h = window.innerHeight - 60;
      p.x += p.vx;
      p.y += p.vy;
      if (p.x <= 0 || p.x >= w) { p.vx *= -1; p.x = Math.max(0, Math.min(p.x, w)); }
      if (p.y <= 0 || p.y >= h) { p.vy *= -1; p.y = Math.max(0, Math.min(p.y, h)); }
      el.style.left = `${p.x}px`;
      el.style.top = `${p.y}px`;
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, []);

  function handleClick() {
    setExplode(true);
    setTimeout(() => setExplode(false), 800);
  }

  return (
    <div ref={ref} onClick={handleClick}
      className="fixed z-20 w-14 h-14 rounded-full flex items-center justify-center cursor-pointer transition-transform select-none"
      style={{
        background: 'rgba(0,240,255,0.1)', border: '2px solid var(--neon-cyan)', boxShadow: `0 0 ${explode ? 60 : 20}px rgba(0,240,255,${explode ? 0.8 : 0.4})`,
        transform: explode ? 'scale(2)' : 'scale(1)',
        transition: 'box-shadow 0.2s, transform 0.3s',
      }}>
      <span className="font-display font-black text-lg text-[var(--neon-cyan)]">HP</span>
    </div>
  );
}

const TERMINAL_LINES = [
  '> SYSTEM ERROR',
  '> Error code: 404',
  '> Description: PAGE_NOT_FOUND',
  '> Searching for page..........',
  '> Search complete: 0 results',
  '> Recommendation: Return to base',
];

export default function NotFoundPage() {
  const [lines, setLines] = useState<string[]>([]);
  const [location] = useLocation();

  useEffect(() => {
    document.title = '404 — Page Not Found | HAMZA POWERPLAYER';
    let i = 0;
    const id = setInterval(() => {
      if (i < TERMINAL_LINES.length) { setLines(prev => [...prev, TERMINAL_LINES[i]]); i++; }
      else clearInterval(id);
    }, 400);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="bg-[var(--bg-base)] min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <AuroraEngine />
      <div className="noise-overlay" />
      <PageNavbar />
      <BouncingLogo />

      <div className="relative z-10 text-center px-6 max-w-2xl w-full">
        {/* Glitching 404 */}
        <div className="relative mb-6">
          <div className="font-display font-black text-[12rem] leading-none select-none"
            style={{
              color: 'transparent', WebkitTextStroke: '2px rgba(0,240,255,0.3)',
              textShadow: '4px 0 rgba(0,240,255,0.5), -4px 0 rgba(124,58,237,0.5)',
              animation: 'glitch-404 3s infinite',
            }}>
            404
          </div>
        </div>

        {/* Terminal */}
        <div className="rounded-2xl p-5 mb-8 text-left font-mono text-sm text-[#00ff41] space-y-1.5"
          style={{ background: 'rgba(0,8,0,0.9)', border: '1px solid rgba(0,255,65,0.2)', boxShadow: '0 0 40px rgba(0,255,65,0.05)' }}>
          <div className="text-[var(--text-muted)] text-xs mb-2">
            &gt; location: <span className="text-[#00ff41]">{location}</span>
          </div>
          {lines.map((line, i) => (
            <div key={i} style={{ animation: 'fadeIn 0.3s ease' }}>{line}</div>
          ))}
          {lines.length === TERMINAL_LINES.length && (
            <div className="flex items-center gap-1 mt-1">
              <span>&gt;</span>
              <span className="w-2 h-4 bg-[#00ff41] inline-block" style={{ animation: 'cursor-blink 1s step-end infinite' }} />
            </div>
          )}
        </div>

        <p className="font-accent text-[var(--text-muted)] text-lg mb-8">
          This page got lost in the multiverse.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/"
            className="px-8 py-4 rounded-2xl font-display font-black text-[#04040a] tracking-widest transition-all hover:brightness-110 hover:scale-105"
            style={{ background: 'linear-gradient(90deg, var(--neon-cyan), var(--neon-violet))' }}>
            🏠 GO HOME
          </Link>
          <Link href="/sitemap"
            className="px-8 py-4 rounded-2xl font-display font-black text-[var(--neon-cyan)] tracking-widest border border-[rgba(0,240,255,0.3)] hover:bg-[rgba(0,240,255,0.06)] transition-all">
            🔍 SEARCH SITE
          </Link>
        </div>
      </div>
    </div>
  );
}
