import { useEffect, useRef, useState } from 'react';
import { MagneticButton } from '@/components/effects/MagneticButton';
import { NeonLabel } from '@/components/effects/NeonLabel';

export function Mirror() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const spotlightRadiusRef = useRef(0);
  const sectionRef = useRef<HTMLElement>(null);
  const activatedRef = useRef(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const canvasRefValue = canvasRef.current;
    if (!canvasRefValue) return;
    const canvas: HTMLCanvasElement = canvasRefValue;
    const context = canvas.getContext('2d');
    if (!context) return;
    const ctx: CanvasRenderingContext2D = context;

    let rafId = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth || window.innerWidth;
      canvas.height = canvas.offsetHeight || 500;
    };
    resize();
    window.addEventListener('resize', resize);

    // IntersectionObserver — spotlight reveal on entry
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !activatedRef.current) {
        activatedRef.current = true;
        setVisible(true);
        const start = performance.now();
        const expand = (now: number) => {
          const t = Math.min(1, (now - start) / 1500);
          spotlightRadiusRef.current = t * 400;
          if (t < 1) requestAnimationFrame(expand);
        };
        requestAnimationFrame(expand);
      }
    }, { threshold: 0.3 });
    if (sectionRef.current) obs.observe(sectionRef.current);

    function draw() {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      // Draw tiled monogram pattern
      const fontSize = 52;
      ctx.font = `900 ${fontSize}px Orbitron, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const cols = Math.ceil(W / 140) + 1;
      const rows = Math.ceil(H / 80) + 1;

      // Draw dim background pattern
      ctx.fillStyle = 'rgba(0,240,255,0.045)';
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * 140 + (r % 2 === 0 ? 0 : 70);
          const y = r * 80;
          ctx.fillText('HP', x, y);
        }
      }

      // Spotlight mask reveal
      const { x: mx, y: my } = mouseRef.current;
      const sr = spotlightRadiusRef.current;
      if (sr > 0 && mx > 0) {
        // Clear a circle, then redraw bright text in that circle
        ctx.save();
        ctx.beginPath();
        ctx.arc(mx, my, sr, 0, Math.PI * 2);
        ctx.clip();

        // Bright version
        ctx.font = `900 ${fontSize}px Orbitron, sans-serif`;
        ctx.fillStyle = 'rgba(0,240,255,0.55)';
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const x = c * 140 + (r % 2 === 0 ? 0 : 70);
            const y = r * 80;
            ctx.fillText('HP', x, y);
          }
        }
        ctx.restore();

        // Soft edge gradient
        const edgeGrad = ctx.createRadialGradient(mx, my, sr * 0.7, mx, my, sr);
        edgeGrad.addColorStop(0, 'rgba(0,0,0,0)');
        edgeGrad.addColorStop(1, 'rgba(4,4,10,0.6)');
        ctx.beginPath();
        ctx.arc(mx, my, sr, 0, Math.PI * 2);
        ctx.fillStyle = edgeGrad;
        ctx.fill();
      }

      rafId = requestAnimationFrame(draw);
    }
    rafId = requestAnimationFrame(draw);

    const handleMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const handleLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };
    canvas.addEventListener('mousemove', handleMove);
    canvas.addEventListener('mouseleave', handleLeave);

    return () => {
      cancelAnimationFrame(rafId);
      obs.disconnect();
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMove);
      canvas.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  const handleScrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={sectionRef} id="mirror" className="relative z-10 overflow-hidden" style={{ minHeight: 500 }}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ cursor: 'crosshair' }}
      />
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-[clamp(60px,12vh,160px)]">
        <NeonLabel color="var(--neon-violet)" className="mb-4">[ PRESENCE ]</NeonLabel>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-8">
          <span className="text-[var(--gold)]" style={{ fontSize: '120%' }}>Y</span>ou're In The Right Place
        </h2>
        <p className="font-accent text-xl text-[var(--text-muted)] max-w-lg mb-3 leading-relaxed">
          If you're here, you already know what you want.
        </p>
        <p className="font-display text-2xl font-bold text-[var(--text-primary)] mb-12">
          Let's build it.
        </p>
        <MagneticButton onClick={handleScrollToContact}>
          LET'S TALK →
        </MagneticButton>
        <p className="font-accent text-xs text-[var(--text-muted)] mt-6 opacity-50">
          Move your cursor to reveal ↑
        </p>
      </div>
    </section>
  );
}
