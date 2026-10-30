import { useEffect, useRef } from 'react';

export function WaveformBorder({ flip = false }: { flip?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseXRef = useRef(-1);
  const revealRef = useRef(0);

  useEffect(() => {
    const canvasRefValue = canvasRef.current;
    if (!canvasRefValue) return;
    const canvas: HTMLCanvasElement = canvasRefValue;
    const context = canvas.getContext('2d');
    if (!context) return;
    const ctx: CanvasRenderingContext2D = context;

    const BARS = 200;
    const BAR_W = 2;
    let rafId = 0;
    let time = 0;

    const phases = Array.from({ length: BARS }, () => Math.random() * Math.PI * 2);
    const freqs = Array.from({ length: BARS }, () => 0.8 + Math.random() * 1.4);

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = 60;
    };
    resize();
    window.addEventListener('resize', resize);

    // Reveal animation
    const start = performance.now();

    function draw(ts: number) {
      const elapsed = (ts - start) / 1000;
      revealRef.current = Math.min(1, elapsed / 1.5);
      const revealFactor = revealRef.current;

      ctx.clearRect(0, 0, canvas.width, 60);
      time += 0.015;

      for (let i = 0; i < BARS; i++) {
        const x = (i / BARS) * canvas.width;
        const normX = x / canvas.width;
        const dist = mouseXRef.current >= 0 ? Math.abs(normX - mouseXRef.current / canvas.width) : 1;
        const mouseBump = Math.max(0, 1 - dist * 6) * 20;
        const baseH = 8 + Math.sin(time * freqs[i] + phases[i]) * 12 + Math.sin(time * 0.4 + i * 0.08) * 6;
        const h = (baseH + mouseBump) * revealFactor;

        const colorPos = normX;
        let r: number, g: number, b: number;
        if (colorPos < 0.5) {
          const t = colorPos * 2;
          r = Math.round(0 + t * 124);
          g = Math.round(240 - t * 182);
          b = Math.round(255 - t * 51);
        } else {
          const t = (colorPos - 0.5) * 2;
          r = Math.round(124 + t * 131);
          g = Math.round(58 - t * 103);
          b = Math.round(204 + t * 51);
        }

        const yStart = flip ? 0 : 60 - h;
        ctx.fillStyle = `rgba(${r},${g},${b},0.7)`;
        ctx.fillRect(x, yStart, BAR_W - 0.5, h);

        // Bright tip
        ctx.fillStyle = `rgba(${r},${g},${b},1)`;
        ctx.fillRect(x, flip ? h - 2 : 60 - h, BAR_W - 0.5, 2);
      }

      rafId = requestAnimationFrame(draw);
    }
    rafId = requestAnimationFrame(draw);

    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseXRef.current = e.clientX - rect.left;
    };
    const handleLeave = () => { mouseXRef.current = -1; };
    canvas.addEventListener('mousemove', handleMouse);
    canvas.addEventListener('mouseleave', handleLeave);
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(rafId);
      canvas.removeEventListener('mousemove', handleMouse);
      canvas.removeEventListener('mouseleave', handleLeave);
      window.removeEventListener('resize', resize);
    };
  }, [flip]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full block"
      style={{ height: 60, display: 'block' }}
    />
  );
}
