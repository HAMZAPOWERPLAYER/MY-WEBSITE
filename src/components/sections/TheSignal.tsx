import { useEffect, useRef } from 'react';
import { ScrollReveal } from '../effects/ScrollReveal';
import { NeonLabel } from '../effects/NeonLabel';

const LINES = [
  'FROM: HAMZA POWERPLAYER · LAHORE, PAKISTAN',
  'TO: THE ENTIRE WORLD',
  'MESSAGE: THE FUTURE IS BEING BUILT RIGHT NOW.',
  'STATUS: TRANSMISSION ONGOING...',
];

export function TheSignal() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvasRefValue = canvasRef.current;
    if (!canvasRefValue) return;
    const canvas: HTMLCanvasElement = canvasRefValue;
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!;

    function resize() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    interface Ring { r: number; alpha: number; }
    const rings: Ring[] = [];
    let spawnTimer = 0;
    let t = 0;

    // dish position
    const DISH_X = () => canvas.width / 2;
    const DISH_Y = () => canvas.height * 0.72;

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t++;

      // spawn ring
      spawnTimer++;
      if (spawnTimer > 90) {
        spawnTimer = 0;
        rings.push({ r: 10, alpha: 0.8 });
      }

      // draw rings
      rings.forEach(ring => {
        ring.r += 3;
        ring.alpha -= 0.005;
        if (ring.alpha < 0) return;
        ctx.beginPath();
        ctx.arc(DISH_X(), DISH_Y(), ring.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0,240,255,${ring.alpha * 0.6})`;
        ctx.lineWidth = 1.5 + Math.sin(ring.r * 0.1) * 0.5;
        ctx.stroke();
      });
      rings.splice(0, rings.findIndex(r => r.alpha >= 0));

      // draw dish SVG-like in canvas
      const dx = DISH_X(), dy = DISH_Y();
      ctx.save();
      ctx.translate(dx, dy);
      ctx.strokeStyle = 'rgba(0,240,255,0.4)';
      ctx.lineWidth = 2;
      // dish arc
      ctx.beginPath();
      ctx.arc(0, -10, 40, Math.PI * 0.1, Math.PI * 0.9);
      ctx.stroke();
      // support lines
      ctx.beginPath(); ctx.moveTo(-20, 25); ctx.lineTo(0, -10); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(20, 25); ctx.lineTo(0, -10); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, 25); ctx.lineTo(0, 50); ctx.stroke();
      // base
      ctx.beginPath(); ctx.moveTo(-30, 50); ctx.lineTo(30, 50); ctx.stroke();
      // signal dot at center
      ctx.beginPath();
      ctx.arc(0, -10, 4 + Math.sin(t * 0.1) * 2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,240,255,${0.6 + Math.sin(t * 0.1) * 0.4})`;
      ctx.fill();
      ctx.restore();

      rafRef.current = requestAnimationFrame(draw);
    }

    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) draw();
      else cancelAnimationFrame(rafRef.current);
    }, { threshold: 0.1 });
    observer.observe(canvas);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      observer.disconnect();
    };
  }, []);

  return (
    <section id="signal" className="relative py-0 overflow-hidden" style={{ background: 'rgba(2,2,8,0.98)' }}>
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-8">
        <ScrollReveal>
          <NeonLabel>TRANSMITTING</NeonLabel>
          <h2 className="font-display font-black text-4xl md:text-5xl mb-4">
            <span className="holo-text">Message To The Future</span>
          </h2>
        </ScrollReveal>
      </div>

      <div className="relative">
        <canvas ref={canvasRef} className="w-full" style={{ height: 400, display: 'block' }} />

        {/* Transmission text overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 pointer-events-none px-6">
          {LINES.map((line, i) => (
            <div
              key={i}
              className="font-display font-black text-center"
              style={{
                fontSize: 'clamp(0.6rem, 1.8vw, 1.1rem)',
                color: i === 2 ? 'var(--neon-cyan)' : 'rgba(240,240,255,0.7)',
                textShadow: i === 2 ? '0 0 20px var(--neon-cyan)' : 'none',
                letterSpacing: '0.15em',
                animation: `signal-receive 0.8s ${i * 0.5 + 0.5}s ease both`,
              }}
            >
              {line}
            </div>
          ))}

          {/* Signal strength bars */}
          <div className="flex items-end gap-2 mt-4">
            {[5,7,9,11,13].map((h, i) => (
              <div key={i} className="w-3 rounded-sm"
                style={{
                  height: h,
                  background: 'var(--neon-cyan)',
                  boxShadow: '0 0 8px var(--neon-cyan)',
                  animation: `signal-bar 1s ${i * 0.15}s ease-in-out infinite alternate`,
                }} />
            ))}
            <span className="font-mono text-xs text-[var(--neon-cyan)] ml-2">SIGNAL STRENGTH: MAXIMUM</span>
          </div>
        </div>
      </div>
    </section>
  );
}
