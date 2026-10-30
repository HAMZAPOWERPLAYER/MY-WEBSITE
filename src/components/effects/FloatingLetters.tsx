import { useEffect, useRef } from 'react';

const LETTERS = [
  { char: 'H', freq: 0.4, amp: 30, phase: 0, drift: [-0.4, -0.2], rot: [-5, 5] },
  { char: 'A', freq: 0.6, amp: 25, phase: 1.2, drift: [0.3, -0.3], rot: [0, 0] },
  { char: 'M', freq: 0.35, amp: 35, phase: 2.4, drift: [-0.2, 0.1], rot: [-3, 3] },
  { char: 'Z', freq: 0.55, amp: 20, phase: 0.8, drift: [0.2, 0.15], rot: [0, 360] },
  { char: 'A', freq: 0.5, amp: 28, phase: 3.0, drift: [-0.1, 0.2], rot: [-4, 4] },
];

interface LetterState {
  x: number; y: number; baseX: number; baseY: number; t: number;
}

export function FloatingLetters() {
  const containerRef = useRef<HTMLDivElement>(null);
  const statesRef = useRef<LetterState[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const W = window.innerWidth;
    const H = window.innerHeight;

    statesRef.current = LETTERS.map((_, i) => ({
      x: W * (0.1 + i * 0.2),
      y: H * (0.1 + Math.random() * 0.5),
      baseX: W * (0.1 + i * 0.2),
      baseY: H * (0.1 + Math.random() * 0.5),
      t: Math.random() * Math.PI * 2,
    }));

    const els = Array.from(container.children) as HTMLElement[];

    let frame = 0;
    function animate() {
      frame++;
      els.forEach((el, i) => {
        const L = LETTERS[i];
        const S = statesRef.current[i];
        S.t += 0.008;

        // Figure-8 for M
        let sx: number, sy: number;
        if (L.char === 'M' && i === 2) {
          sx = S.baseX + Math.sin(S.t * L.freq) * L.amp * 2;
          sy = S.baseY + Math.sin(S.t * L.freq * 2) * L.amp;
        } else {
          sx = S.baseX + Math.sin(S.t * L.freq + L.phase) * L.amp + frame * L.drift[0] * 0.02;
          sy = S.baseY + Math.cos(S.t * L.freq * 0.7 + L.phase) * L.amp * 0.6 + frame * L.drift[1] * 0.02;
        }

        // Mouse repel
        const dx = sx - mouseRef.current.x;
        const dy = sy - mouseRef.current.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 150) {
          const force = (150 - dist) / 150 * 40;
          sx += (dx / dist) * force;
          sy += (dy / dist) * force;
        }

        // Rotation
        let rot = 0;
        if (L.rot[0] === 0 && L.rot[1] === 360) {
          rot = (S.t * 20) % 360;
        } else {
          rot = Math.sin(S.t * 0.5) * L.rot[1];
        }

        // Scale pulse for A (index 1)
        const scale = i === 1 ? 1 + Math.sin(S.t * 2) * 0.04 : 1;

        el.style.transform = `translate(${sx}px, ${sy}px) rotate(${rot}deg) scale(${scale})`;
        el.style.position = 'fixed';
        el.style.left = '0';
        el.style.top = '0';
      });
      rafRef.current = requestAnimationFrame(animate);
    }
    rafRef.current = requestAnimationFrame(animate);

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouse);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', handleMouse);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="hidden md:block pointer-events-none"
      style={{ position: 'fixed', inset: 0, zIndex: 2 }}
    >
      {LETTERS.map((L, i) => (
        <div
          key={i}
          style={{
            fontFamily: 'Orbitron, sans-serif',
            fontWeight: 900,
            fontSize: 120,
            color: 'transparent',
            WebkitTextStroke: '1px rgba(0,240,255,0.07)',
            opacity: 0.8,
            willChange: 'transform',
            userSelect: 'none',
            lineHeight: 1,
          }}
        >
          {L.char}
        </div>
      ))}
    </div>
  );
}
