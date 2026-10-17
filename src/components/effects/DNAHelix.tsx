import { useEffect, useRef, useState } from 'react';

export function DNAHelix() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollRef = useRef(0);
  const [tooltip, setTooltip] = useState<number | null>(null);

  useEffect(() => {
    const canvasRefValue = canvasRef.current;
    if (!canvasRefValue) return;
    const canvas: HTMLCanvasElement = canvasRefValue;
    const context = canvas.getContext('2d');
    if (!context) return;
    const ctx: CanvasRenderingContext2D = context;

    const W = 30;
    const H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    let rafId = 0;
    let time = 0;

    const handleScroll = () => {
      const docH = document.body.scrollHeight - window.innerHeight;
      scrollRef.current = docH > 0 ? window.scrollY / docH : 0;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    function draw() {
      ctx.clearRect(0, 0, W, H);
      time += 0.025;
      const progress = scrollRef.current;
      const fillY = H * (1 - progress);

      const rungs = Math.floor(H / 28);
      for (let i = 0; i <= rungs; i++) {
        const y = (i / rungs) * H;
        const phase = (i / rungs) * Math.PI * 6 + time;
        const x1 = W / 2 + Math.sin(phase) * 10;
        const x2 = W / 2 + Math.sin(phase + Math.PI) * 10;
        const filled = y > fillY;
        const alpha = filled ? 0.9 : 0.18;

        // Rung
        ctx.beginPath();
        ctx.moveTo(x1, y);
        ctx.lineTo(x2, y);
        ctx.strokeStyle = filled ? `rgba(0,240,255,${alpha})` : `rgba(0,240,255,${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Dot strand 1
        ctx.beginPath();
        ctx.arc(x1, y, 2, 0, Math.PI * 2);
        ctx.fillStyle = filled ? 'rgba(0,240,255,0.9)' : 'rgba(0,240,255,0.2)';
        if (filled) {
          ctx.shadowColor = '#00f0ff';
          ctx.shadowBlur = 4;
        }
        ctx.fill();
        ctx.shadowBlur = 0;

        // Dot strand 2
        ctx.beginPath();
        ctx.arc(x2, y, 2, 0, Math.PI * 2);
        ctx.fillStyle = filled ? 'rgba(124,58,237,0.9)' : 'rgba(124,58,237,0.2)';
        if (filled) {
          ctx.shadowColor = '#7c3aed';
          ctx.shadowBlur = 4;
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      rafId = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const pct = Math.round((scrollRef.current || 0) * 100);

  return (
    <div
      className="fixed right-2 top-0 pointer-events-auto"
      style={{ zIndex: 40, height: '100vh' }}
      onMouseEnter={() => setTooltip(pct)}
      onMouseLeave={() => setTooltip(null)}
      onMouseMove={() => setTooltip(Math.round(scrollRef.current * 100))}
    >
      <canvas ref={canvasRef} style={{ width: 30 }} />
      {tooltip !== null && (
        <div
          className="absolute right-10 top-1/2 -translate-y-1/2 bg-[var(--bg-surface)] border border-[var(--neon-cyan)] px-3 py-1 font-body text-xs text-[var(--neon-cyan)] whitespace-nowrap"
        >
          {tooltip}% scrolled
        </div>
      )}
    </div>
  );
}
