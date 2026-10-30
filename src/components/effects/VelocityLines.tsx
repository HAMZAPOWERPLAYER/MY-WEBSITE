import { useEffect, useRef } from 'react';

export function VelocityLines() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastScrollRef = useRef(0);
  const lastTimeRef = useRef(Date.now());
  const linesRef = useRef<HTMLDivElement[]>([]);
  const activeRef = useRef(false);
  const fadeTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const lines: HTMLDivElement[] = [];
    for (let i = 0; i < 20; i++) {
      const line = document.createElement('div');
      Object.assign(line.style, {
        position: 'absolute',
        height: '1px',
        background: 'rgba(255,255,255,0.12)',
        borderRadius: '2px',
        transition: 'opacity 0.4s ease',
        opacity: '0',
        pointerEvents: 'none',
      });
      container.appendChild(line);
      lines.push(line);
    }
    linesRef.current = lines;

    const handleScroll = () => {
      const now = Date.now();
      const dt = now - lastTimeRef.current;
      const dy = Math.abs(window.scrollY - lastScrollRef.current);
      const velocity = dt > 0 ? dy / dt * 16 : 0;
      lastScrollRef.current = window.scrollY;
      lastTimeRef.current = now;

      const THRESHOLD = 15;
      if (velocity > THRESHOLD) {
        const intensity = Math.min((velocity - THRESHOLD) / 30, 1);
        showLines(intensity);
        clearTimeout(fadeTimerRef.current);
        fadeTimerRef.current = setTimeout(() => hideLines(), 400);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      lines.forEach(l => l.remove());
    };
  }, []);

  function showLines(intensity: number) {
    const viewH = window.innerHeight;
    linesRef.current.forEach(line => {
      const fromLeft = Math.random() > 0.5;
      const w = 60 + Math.random() * 140 * intensity;
      const top = Math.random() * viewH;
      Object.assign(line.style, {
        top: `${top}px`,
        left: fromLeft ? '0' : 'auto',
        right: fromLeft ? 'auto' : '0',
        width: `${w}px`,
        opacity: `${0.08 + intensity * 0.12}`,
        transform: `scaleX(${fromLeft ? 1 : -1})`,
      });
    });
    activeRef.current = true;
  }

  function hideLines() {
    linesRef.current.forEach(line => { line.style.opacity = '0'; });
    activeRef.current = false;
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[100] overflow-hidden"
    />
  );
}
