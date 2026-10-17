import { useState } from 'react';

export function CVDownloadFAB() {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => window.print()}
      className="fixed bottom-6 left-6 z-[9998] flex items-center gap-2 font-display text-xs font-bold tracking-widest transition-all duration-300 rounded-full"
      style={{
        height: 48,
        padding: hovered ? '0 20px' : '0 16px',
        background: 'rgba(8,8,26,0.92)',
        border: '1px solid rgba(0,240,255,0.3)',
        color: 'var(--neon-cyan)',
        boxShadow: '0 0 20px rgba(0,240,255,0.15)',
        backdropFilter: 'blur(12px)',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        maxWidth: hovered ? 200 : 60,
      }}
    >
      <span>⬇</span>
      <span
        style={{
          opacity: hovered ? 1 : 0,
          maxWidth: hovered ? 140 : 0,
          overflow: 'hidden',
          transition: 'all 0.3s ease',
          whiteSpace: 'nowrap',
        }}>
        DOWNLOAD MY CV
      </span>
    </button>
  );
}
