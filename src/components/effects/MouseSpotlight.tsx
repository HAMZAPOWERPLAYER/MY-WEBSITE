import { useEffect, useRef } from 'react';

export function MouseSpotlight() {
  const divRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef(0);
  const targetRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    // Check prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const el = divRef.current;
    if (!el) return;

    const handleMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMove);

    function frame() {
      // Smooth lerp
      posRef.current.x += (targetRef.current.x - posRef.current.x) * 0.1;
      posRef.current.y += (targetRef.current.y - posRef.current.y) * 0.1;
      const { x, y } = posRef.current;
      if (el) {
        el.style.background = `radial-gradient(300px circle at ${x}px ${y}px, rgba(0,240,255,0.04) 0%, transparent 70%)`;
      }
      rafRef.current = requestAnimationFrame(frame);
    }
    rafRef.current = requestAnimationFrame(frame);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={divRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 3 }}
    />
  );
}
