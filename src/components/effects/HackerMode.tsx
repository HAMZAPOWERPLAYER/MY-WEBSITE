import { useEffect, useRef, useState } from 'react';

export function HackerMode() {
  const [active, setActive] = useState(false);
  const bufferRef = useRef('');
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      bufferRef.current = (bufferRef.current + e.key).slice(-6).toUpperCase();
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => { bufferRef.current = ''; }, 1500);

      if (!active && bufferRef.current.includes('HACK')) {
        bufferRef.current = '';
        activateHacker();
      } else if (active && bufferRef.current.includes('EXIT')) {
        bufferRef.current = '';
        deactivateHacker();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [active]);

  function activateHacker() {
    setActive(true);
    const root = document.documentElement;
    root.classList.add('hacker-mode');
    root.style.setProperty('--neon-cyan', '#00ff41');
    root.style.setProperty('--neon-violet', '#003b00');
    root.style.setProperty('--gold', '#39ff14');
    root.style.setProperty('--bg-base', '#000000');
    root.style.setProperty('--bg-surface', '#010801');
    root.style.setProperty('--border-glow', 'rgba(0,255,65,0.3)');

    // show system compromised banner
    const banner = document.createElement('div');
    banner.id = 'hacker-banner';
    banner.textContent = '⚠ SYSTEM COMPROMISED';
    Object.assign(banner.style, {
      position: 'fixed', top: '0', left: '0', right: '0',
      zIndex: '99998', textAlign: 'center', padding: '12px',
      background: 'rgba(0,255,65,0.15)', color: '#00ff41',
      fontFamily: 'Orbitron, sans-serif', fontWeight: '900',
      fontSize: '1.1rem', letterSpacing: '4px',
      borderBottom: '1px solid #00ff41',
      animation: 'fadeIn 0.2s ease',
      transition: 'opacity 0.5s ease',
    });
    document.body.appendChild(banner);
    setTimeout(() => {
      banner.style.opacity = '0';
      setTimeout(() => banner.remove(), 500);
    }, 2000);

    // type into terminal if visible
    const terminal = document.getElementById('console');
    if (terminal) terminal.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => {
      const event = new CustomEvent('hacker-console', {
        detail: [
          '> HACKER MODE ACTIVATED',
          '> ACCESSING HAMZA POWERPLAYER DATABASE...',
          '> SKILL LEVEL: ████████████ MAXIMUM',
          '> THREAT LEVEL: LEGENDARY',
          '> SYSTEM STATUS: UNHACKABLE (you just hacked yourself)',
          "> TIP: type 'EXIT' to return to normal",
        ]
      });
      window.dispatchEvent(event);
    }, 300);
  }

  function deactivateHacker() {
    setActive(false);
    const root = document.documentElement;
    root.classList.remove('hacker-mode');
    root.style.removeProperty('--neon-cyan');
    root.style.removeProperty('--neon-violet');
    root.style.removeProperty('--gold');
    root.style.removeProperty('--bg-base');
    root.style.removeProperty('--bg-surface');
    root.style.removeProperty('--border-glow');

    const ticker = document.createElement('div');
    ticker.textContent = '▓ HACKER MODE DEACTIVATED ▓ RETURNING TO NORMAL ▓ HACKER MODE DEACTIVATED ▓ RETURNING TO NORMAL ▓';
    Object.assign(ticker.style, {
      position: 'fixed', bottom: '0', left: '0', right: '0',
      zIndex: '99998', padding: '10px 0', overflow: 'hidden',
      background: 'rgba(0,0,0,0.9)', color: '#00f0ff',
      fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.85rem',
      whiteSpace: 'nowrap', animation: 'ticker-left 4s linear',
    });
    document.body.appendChild(ticker);
    setTimeout(() => ticker.remove(), 4000);
  }

  return (
    <>
      {active && (
        <>
          {/* Scanlines */}
          <div className="fixed inset-0 pointer-events-none z-[9990]"
            style={{
              background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)',
              mixBlendMode: 'multiply',
            }} />
          {/* CRT barrel */}
          <div className="fixed inset-0 pointer-events-none z-[9991]"
            style={{ filter: 'url(#crt-warp)' }} />
          {/* Fullscreen code rain bg */}
          <div className="fixed inset-0 pointer-events-none z-[1] opacity-20"
            style={{ fontFamily: 'monospace', fontSize: '12px', color: '#00ff41', overflow: 'hidden' }}>
          </div>
        </>
      )}
      <svg className="hidden" width="0" height="0">
        <filter id="crt-warp">
          <feTurbulence type="turbulence" baseFrequency="0.002" numOctaves="1" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" />
        </filter>
      </svg>
    </>
  );
}
