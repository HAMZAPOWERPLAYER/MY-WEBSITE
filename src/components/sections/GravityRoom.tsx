import { useEffect, useRef, useState } from 'react';
import { NeonLabel } from '@/components/effects/NeonLabel';

const LABELS = [
  'Flutter', 'AI', 'Python', 'React', 'Firebase', 'Apps', 'Design',
  'Automation', 'Code', 'Build', 'Ship', 'Scale', 'Vision', 'Future',
  'Mobile', 'Web', 'APIs', 'Data', 'UI/UX', 'Dark Mode',
  'GPT-4', 'Claude', 'Dart', 'Node.js', 'Git', 'Figma', 'Supabase',
  'TypeScript', 'LangChain', 'Cursor',
];

const COLORS = ['#00f0ff', '#7c3aed', '#f5c518', '#ff2d55', '#00ff88'];

const SKILL_LEVELS: Record<string, string> = {
  Flutter: 'Advanced · 2 Years', Python: 'Intermediate · 1.5 Years',
  React: 'Intermediate · 1 Year', Firebase: 'Advanced · 2 Years',
  AI: 'Advanced · 1.5 Years', 'GPT-4': 'Advanced · 1 Year',
  Dart: 'Advanced · 2 Years', Design: 'Intermediate · 2 Years',
};

interface Ball {
  x: number; y: number; vx: number; vy: number;
  r: number; mass: number; label: string; color: string;
  hovered: boolean;
}

export function GravityRoom() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ballsRef = useRef<Ball[]>([]);
  const gravRef = useRef({ x: 0, y: 0.35 });
  const dragRef = useRef<{ ball: Ball | null; prevX: number; prevY: number; vHistory: number[][] }>({ ball: null, prevX: 0, prevY: 0, vHistory: [] });
  const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number } | null>(null);
  const activated = useRef(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const canvasRefValue = canvasRef.current;
    if (!canvasRefValue) return;
    const canvas: HTMLCanvasElement = canvasRefValue;
    const context = canvas.getContext('2d');
    if (!context) return;
    const ctx: CanvasRenderingContext2D = context;

    const isMobile = window.innerWidth < 640;
    const MAX_BALLS = isMobile ? 15 : 30;
    const H = 520;
    canvas.height = H;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      initBalls();
    };

    function initBalls(drop = false) {
      const W = canvas.width;
      ballsRef.current = LABELS.slice(0, MAX_BALLS).map((label, i) => {
        const r = 28 + Math.random() * 20;
        const x = r + Math.random() * (W - r * 2);
        const y = drop ? -r - Math.random() * 200 : r + Math.random() * (H - r * 2);
        const color = COLORS[i % COLORS.length];
        return {
          x, y, vx: (Math.random() - 0.5) * 2, vy: drop ? 0 : (Math.random() - 0.5) * 2,
          r, mass: r * r / 784, label, color, hovered: false,
        };
      });
    }

    resize();
    window.addEventListener('resize', resize);

    // IntersectionObserver to activate with drop
    let rafId = 0;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !activated.current) {
        activated.current = true;
        initBalls(true);
      }
    }, { threshold: 0.2 });
    if (sectionRef.current) obs.observe(sectionRef.current);

    // Physics loop
    function resolveCollision(a: Ball, b: Ball) {
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const dist = Math.hypot(dx, dy);
      const minDist = a.r + b.r;
      if (dist >= minDist || dist === 0) return;

      const nx = dx / dist;
      const ny = dy / dist;
      const overlap = minDist - dist;
      const totalMass = a.mass + b.mass;
      a.x -= nx * overlap * (b.mass / totalMass);
      a.y -= ny * overlap * (b.mass / totalMass);
      b.x += nx * overlap * (a.mass / totalMass);
      b.y += ny * overlap * (a.mass / totalMass);

      const dvx = a.vx - b.vx;
      const dvy = a.vy - b.vy;
      const dot = dvx * nx + dvy * ny;
      if (dot > 0) return;

      const impulse = (2 * dot) / totalMass;
      a.vx -= impulse * b.mass * nx;
      a.vy -= impulse * b.mass * ny;
      b.vx += impulse * a.mass * nx;
      b.vy += impulse * a.mass * ny;
    }

    function drawBall(ball: Ball) {
      const { x, y, r, color, label, hovered } = ball;
      const scale = hovered ? 1.12 : 1;
      const dr = r * scale;

      ctx.save();
      ctx.translate(x, y);

      // Glow
      if (hovered) {
        ctx.beginPath();
        ctx.arc(0, 0, dr + 8, 0, Math.PI * 2);
        ctx.fillStyle = `${color}22`;
        ctx.fill();
      }

      // Ball body
      const grad = ctx.createRadialGradient(-dr * 0.3, -dr * 0.3, 0, 0, 0, dr);
      grad.addColorStop(0, `${color}40`);
      grad.addColorStop(0.6, `${color}18`);
      grad.addColorStop(1, `${color}08`);
      ctx.beginPath();
      ctx.arc(0, 0, dr, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      // Border
      ctx.strokeStyle = hovered ? color : `${color}80`;
      ctx.lineWidth = hovered ? 2 : 1;
      if (hovered) { ctx.shadowColor = color; ctx.shadowBlur = 12; }
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Highlight
      ctx.beginPath();
      ctx.arc(-dr * 0.25, -dr * 0.3, dr * 0.2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,0.08)';
      ctx.fill();

      // Label
      const fontSize = Math.max(8, Math.min(12, dr * 0.32));
      ctx.font = `600 ${fontSize}px Syne, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = hovered ? '#fff' : 'rgba(240,240,255,0.85)';
      ctx.fillText(label, 0, 0);

      ctx.restore();
    }

    function tick() {
      const W = canvas.width;
      ctx.clearRect(0, 0, W, H);
      const gx = gravRef.current.x;
      const gy = gravRef.current.y;
      const balls = ballsRef.current;

      for (const b of balls) {
        if (dragRef.current.ball === b) continue;
        b.vx += gx;
        b.vy += gy;
        b.vx *= 0.995;
        b.vy *= 0.995;
        b.x += b.vx;
        b.y += b.vy;

        if (b.x - b.r < 0) { b.x = b.r; b.vx = Math.abs(b.vx) * 0.7; }
        if (b.x + b.r > W) { b.x = W - b.r; b.vx = -Math.abs(b.vx) * 0.7; }
        if (b.y - b.r < 0) { b.y = b.r; b.vy = Math.abs(b.vy) * 0.7; }
        if (b.y + b.r > H) { b.y = H - b.r; b.vy = -Math.abs(b.vy) * 0.7; }
      }

      for (let i = 0; i < balls.length; i++)
        for (let j = i + 1; j < balls.length; j++)
          resolveCollision(balls[i], balls[j]);

      for (const b of balls) drawBall(b);

      rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);

    // Mouse / touch interaction
    function getPos(e: MouseEvent | TouchEvent): { x: number; y: number } {
      const rect = canvas.getBoundingClientRect();
      if ('touches' in e) {
        return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
      }
      return { x: (e as MouseEvent).clientX - rect.left, y: (e as MouseEvent).clientY - rect.top };
    }

    function getBallAt(x: number, y: number) {
      return ballsRef.current.find(b => Math.hypot(b.x - x, b.y - y) < b.r) ?? null;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const { x, y } = getPos(e);
      ballsRef.current.forEach(b => b.hovered = Math.hypot(b.x - x, b.y - y) < b.r);
      const hovered = ballsRef.current.find(b => b.hovered);
      if (hovered) {
        const skill = SKILL_LEVELS[hovered.label];
        setTooltip(skill ? { text: `${hovered.label}: ${skill}`, x: e.clientX, y: e.clientY - 40 } : null);
        canvas.style.cursor = 'grab';
      } else {
        setTooltip(null);
        canvas.style.cursor = 'default';
      }

      const drag = dragRef.current;
      const draggedBall = drag.ball;
      if (draggedBall) {
        drag.vHistory.push([x - drag.prevX, y - drag.prevY]);
        if (drag.vHistory.length > 5) drag.vHistory.shift();
        draggedBall.x = x;
        draggedBall.y = y;
        draggedBall.vx = 0;
        draggedBall.vy = 0;
        drag.prevX = x;
        drag.prevY = y;
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      const { x, y } = getPos(e);
      const ball = getBallAt(x, y);
      if (ball) {
        dragRef.current = { ball, prevX: x, prevY: y, vHistory: [] };
        canvas.style.cursor = 'grabbing';
      }
    };

    const handleMouseUp = () => {
      const drag = dragRef.current;
      if (drag.ball && drag.vHistory.length > 0) {
        const avgVx = drag.vHistory.reduce((s, v) => s + v[0], 0) / drag.vHistory.length;
        const avgVy = drag.vHistory.reduce((s, v) => s + v[1], 0) / drag.vHistory.length;
        drag.ball.vx = avgVx * 1.5;
        drag.ball.vy = avgVy * 1.5;
      }
      dragRef.current.ball = null;
    };

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      const { x, y } = getPos(e);
      for (const b of ballsRef.current) {
        const dx = b.x - x;
        const dy = b.y - y;
        const dist = Math.hypot(dx, dy) || 1;
        const force = 20 / dist;
        b.vx = (dx / dist) * force * 8;
        b.vy = (dy / dist) * force * 8;
      }
    };

    // Device orientation
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.beta !== null && e.gamma !== null) {
        gravRef.current = {
          x: (e.gamma / 90) * 0.5,
          y: (e.beta / 90) * 0.5,
        };
      }
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('deviceorientation', handleOrientation);

    return () => {
      cancelAnimationFrame(rafId);
      obs.disconnect();
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, []);

  return (
    <section ref={sectionRef} id="gravity" className="py-[clamp(60px,10vh,140px)] relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-8">
          <NeonLabel color="var(--neon-violet)" className="mb-4">[ INTERACT ]</NeonLabel>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-4">
            <span className="text-[var(--gold)]" style={{ fontSize: '120%' }}>P</span>lay With The Elements
          </h2>
          <p className="font-body text-sm text-[var(--text-muted)] tracking-widest">
            CLICK · DRAG · THROW — everything here is under your control
          </p>
          <p className="font-body text-xs text-[var(--text-muted)] mt-1 opacity-60">Right-click to explode</p>
        </div>
        <div className="relative">
          <canvas
            ref={canvasRef}
            className="w-full rounded-lg"
            style={{ height: 520, background: 'rgba(4,4,18,0.6)', border: '1px solid rgba(0,240,255,0.08)' }}
          />
          {tooltip && (
            <div
              className="fixed pointer-events-none bg-[var(--bg-surface)] border border-[var(--neon-cyan)] px-3 py-1.5 font-body text-xs text-[var(--neon-cyan)] rounded z-[9999]"
              style={{ left: tooltip.x, top: tooltip.y, transform: 'translateX(-50%)' }}
            >
              {tooltip.text}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
