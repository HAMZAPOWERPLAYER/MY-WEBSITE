import { useEffect, useRef, useState } from 'react';
import { ScrollReveal } from '../effects/ScrollReveal';
import { NeonLabel } from '../effects/NeonLabel';

interface PlanetInfo {
  name: string;
  desc: string;
  stack: string;
  level: string;
  distance: number;
  speed: number;
  size: number;
  color: string;
  color2: string;
  hasMoon?: boolean;
  hasRings?: boolean;
}

const PLANETS: PlanetInfo[] = [
  { name: 'AI DEVELOPMENT', desc: 'Building intelligent systems, GPT integrations, autonomous agents, and custom AI tools.', stack: 'GPT-4, Claude, Python, LangChain', level: 'HIGH VELOCITY', distance: 140, speed: 7, size: 45, color: '#00f0ff', color2: '#004466', hasMoon: false },
  { name: 'APP DEVELOPMENT', desc: 'Cross-platform mobile apps with polished UX.', stack: 'Flutter, Dart, Firebase', level: 'DEEP ORBIT', distance: 200, speed: 11, size: 55, color: '#1a6fff', color2: '#0a2a80', hasMoon: true },
  { name: 'WEB ENGINEERING', desc: 'Full-stack web apps, APIs, and performant front-end experiences.', stack: 'React, TypeScript, Node.js, Vite', level: 'HIGH VELOCITY', distance: 265, speed: 16, size: 40, color: '#ff6030', color2: '#6b1a05' },
  { name: 'UI/UX DESIGN', desc: 'Interfaces that feel inevitable — every pixel with intention.', stack: 'Figma, Tailwind CSS, Motion Design', level: 'DEEP ORBIT', distance: 330, speed: 22, size: 50, color: '#9955ff', color2: '#3a1080', hasRings: true },
  { name: 'AUTOMATION', desc: 'Scripts and systems that eliminate repetitive work forever.', stack: 'Python, Make.com, Zapier, Bash', level: 'HIGH VELOCITY', distance: 400, speed: 30, size: 35, color: '#55ddff', color2: '#004455' },
  { name: 'CREATIVE BUILDING', desc: 'Turning wild ideas into real products people actually use.', stack: 'Everything + intuition', level: 'MAXIMUM ORBIT', distance: 470, speed: 40, size: 48, color: '#f5c518', color2: '#7a5800' },
];

export function SolarSystem() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hovered, setHovered] = useState<PlanetInfo | null>(null);
  const [cardPos, setCardPos] = useState({ x: 0, y: 0 });
  const anglesRef = useRef(PLANETS.map((_, i) => (i / PLANETS.length) * Math.PI * 2));
  const pausedRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const shootingStarRef = useRef({ active: false, x: 0, y: 0, vx: 0, vy: 0, life: 0, timer: 0 });

  useEffect(() => {
    const canvasRefValue = canvasRef.current;
    if (!canvasRefValue) return;
    const canvas: HTMLCanvasElement = canvasRefValue;
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!;
    let observer: IntersectionObserver;

    function resize() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const CX = () => canvas.width / 2;
    const CY = () => canvas.height / 2;

    function drawStar(cx: number, cy: number, t: number) {
      const r = 28 + Math.sin(t * 2) * 4;
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * 3);
      grad.addColorStop(0, '#ffffff');
      grad.addColorStop(0.15, '#fffbe0');
      grad.addColorStop(0.4, '#f5c518');
      grad.addColorStop(0.7, '#ff8800');
      grad.addColorStop(1, 'transparent');
      ctx.beginPath(); ctx.arc(cx, cy, r * 3, 0, Math.PI * 2);
      ctx.fillStyle = grad; ctx.fill();

      // corona spikes
      ctx.save(); ctx.translate(cx, cy);
      for (let i = 0; i < 8; i++) {
        ctx.save();
        ctx.rotate(((i / 8) * Math.PI * 2) + t * 0.05);
        ctx.beginPath(); ctx.moveTo(0, -r * 1.1); ctx.lineTo(0, -r * 2.6);
        ctx.strokeStyle = 'rgba(245,197,24,0.4)'; ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();
      }
      ctx.restore();

      // label arc
      ctx.save(); ctx.translate(cx, cy);
      const arcR = r * 3.8;
      ctx.beginPath(); ctx.arc(0, 0, arcR, -Math.PI * 0.5, Math.PI * 0.5);
      ctx.strokeStyle = 'transparent'; ctx.stroke();
      ctx.font = '9px IBM Plex Mono, monospace';
      ctx.fillStyle = 'rgba(245,197,24,0.7)';
      ctx.textAlign = 'center';
      const label = 'HAMZA POWERPLAYER';
      const step = Math.PI / (label.length - 1);
      for (let i = 0; i < label.length; i++) {
        const angle = -Math.PI / 2 - Math.PI / 2 + i * step;
        ctx.save();
        ctx.rotate(angle);
        ctx.translate(0, -arcR);
        ctx.rotate(Math.PI / 2);
        ctx.fillText(label[i], 0, 0);
        ctx.restore();
      }
      ctx.restore();
    }

    function drawPlanet(p: PlanetInfo, x: number, y: number, scale: number, t: number) {
      const r = p.size / 2 * scale;
      // atmosphere glow
      const glow = ctx.createRadialGradient(x, y, r * 0.8, x, y, r * 2);
      glow.addColorStop(0, p.color + '44');
      glow.addColorStop(1, 'transparent');
      ctx.beginPath(); ctx.arc(x, y, r * 2, 0, Math.PI * 2);
      ctx.fillStyle = glow; ctx.fill();

      // sphere
      const grad = ctx.createRadialGradient(x - r * 0.3, y - r * 0.3, r * 0.1, x, y, r);
      grad.addColorStop(0, p.color);
      grad.addColorStop(0.5, p.color2 + 'cc');
      grad.addColorStop(1, p.color2);
      ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = grad; ctx.fill();

      // rings (Planet 4)
      if (p.hasRings) {
        ctx.save(); ctx.translate(x, y);
        for (let i = 0; i < 3; i++) {
          ctx.beginPath();
          ctx.ellipse(0, 0, r * (1.7 + i * 0.4), r * (0.3 + i * 0.1), 0.4 + i * 0.15, 0, Math.PI * 2);
          ctx.strokeStyle = p.color + Math.floor(80 - i * 20).toString(16).padStart(2, '0');
          ctx.lineWidth = 2;
          ctx.stroke();
        }
        ctx.restore();
      }

      // moon (Planet 2)
      if (p.hasMoon) {
        const moonAngle = t * (Math.PI * 2 / 5);
        const mr = r * 1.8;
        const mx = x + Math.cos(moonAngle) * mr;
        const my = y + Math.sin(moonAngle) * mr * 0.5;
        ctx.beginPath(); ctx.arc(mx, my, r * 0.35, 0, Math.PI * 2);
        ctx.fillStyle = '#aaaacc'; ctx.fill();
      }
    }

    function drawShootingStar(ss: typeof shootingStarRef.current) {
      if (!ss.active) return;
      const tail = 80 * ss.life;
      const grad = ctx.createLinearGradient(ss.x, ss.y, ss.x - ss.vx * tail / 8, ss.y - ss.vy * tail / 8);
      grad.addColorStop(0, 'rgba(255,255,255,0.9)');
      grad.addColorStop(1, 'transparent');
      ctx.beginPath(); ctx.moveTo(ss.x, ss.y); ctx.lineTo(ss.x - ss.vx * tail / 8, ss.y - ss.vy * tail / 8);
      ctx.strokeStyle = grad; ctx.lineWidth = 2; ctx.stroke();
    }

    let t = 0;
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.016;
      const cx = CX(), cy = CY();

      // starfield bg
      if (Math.random() < 0.05) {
        ctx.fillStyle = 'rgba(255,255,255,0.8)';
        ctx.beginPath();
        ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // orbit rings
      PLANETS.forEach((p, i) => {
        ctx.beginPath(); ctx.arc(cx, cy, p.distance, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255,255,255,0.04)'; ctx.lineWidth = 1; ctx.stroke();
      });

      // asteroid belt
      const beltStart = PLANETS[2].distance;
      const beltEnd = PLANETS[3].distance;
      for (let i = 0; i < 30; i++) {
        const ar = beltStart + (beltEnd - beltStart) / 2 + (Math.sin(i * 2.3 + t * 0.1) * 15);
        const aa = (i / 30) * Math.PI * 2 + t * 0.02;
        const ax = cx + Math.cos(aa) * ar;
        const ay = cy + Math.sin(aa) * ar * 0.35;
        ctx.beginPath(); ctx.arc(ax, ay, 1 + Math.random() * 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(180,160,120,0.6)'; ctx.fill();
      }

      drawStar(cx, cy, t);

      // planets
      PLANETS.forEach((p, i) => {
        if (pausedRef.current !== i) {
          anglesRef.current[i] += (Math.PI * 2 / p.speed) * 0.016;
        }
        const angle = anglesRef.current[i];
        const px = cx + Math.cos(angle) * p.distance;
        const py = cy + Math.sin(angle) * p.distance * 0.4;
        const isHov = pausedRef.current === i;
        const sc = isHov ? 1.5 : 1;
        drawPlanet(p, px, py, sc, t);
      });

      // shooting star
      const ss = shootingStarRef.current;
      ss.timer++;
      if (!ss.active && ss.timer > 500 + Math.random() * 300) {
        ss.active = true; ss.timer = 0; ss.life = 1;
        const edge = Math.floor(Math.random() * 2);
        ss.x = edge === 0 ? 0 : canvas.width;
        ss.y = Math.random() * canvas.height * 0.7;
        const angle = (Math.random() * 0.5 + 0.2) * (edge === 0 ? 1 : -1);
        const speed = 15;
        ss.vx = Math.cos(angle) * speed * (edge === 0 ? 1 : -1);
        ss.vy = Math.sin(Math.abs(angle)) * speed;
      }
      if (ss.active) {
        ss.x += ss.vx; ss.y += ss.vy; ss.life -= 0.025;
        drawShootingStar(ss);
        if (ss.life <= 0 || ss.x < 0 || ss.x > canvas.width || ss.y > canvas.height) {
          ss.active = false;
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { draw(); }
      else { cancelAnimationFrame(rafRef.current); }
    }, { threshold: 0.1 });
    observer.observe(canvas);

    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      const cx = canvas.width / 2, cy = canvas.height / 2;
      let found = false;
      PLANETS.forEach((p, i) => {
        const angle = anglesRef.current[i];
        const px = cx + Math.cos(angle) * p.distance;
        const py = cy + Math.sin(angle) * p.distance * 0.4;
        const dist = Math.hypot(mouseRef.current.x - px, mouseRef.current.y - py);
        if (dist < p.size) {
          pausedRef.current = i;
          setHovered(p);
          const canvasRect = canvas.getBoundingClientRect();
          setCardPos({ x: e.clientX - canvasRect.left + 20, y: e.clientY - canvasRect.top - 60 });
          found = true;
        }
      });
      if (!found) { pausedRef.current = null; setHovered(null); }
    };
    canvas.addEventListener('mousemove', handleMouse);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouse);
      observer?.disconnect();
    };
  }, []);

  return (
    <section id="skills" className="relative py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <ScrollReveal>
          <NeonLabel>SKILLS</NeonLabel>
          <h2 className="font-display font-black text-4xl md:text-5xl mb-4">
            <span className="holo-text">Skill Solar System</span>
          </h2>
          <p className="text-[var(--text-muted)] font-accent max-w-xl">
            Every skill orbits at its own velocity. Hover a planet to explore.
          </p>
        </ScrollReveal>
      </div>

      <div ref={containerRef} className="relative w-full" style={{ height: 700 }}>
        <canvas
          ref={canvasRef}
          className="w-full h-full cursor-crosshair"
          style={{ display: 'block' }}
        />
        {hovered && (
          <div
            className="absolute pointer-events-none z-20"
            style={{
              left: Math.min(cardPos.x, (containerRef.current?.offsetWidth || 800) - 280),
              top: Math.max(10, cardPos.y),
              width: 260,
              animation: 'fadeIn 0.2s ease',
            }}
          >
            <div className="rounded-xl p-4 text-sm"
              style={{ background: 'rgba(8,8,26,0.95)', border: '1px solid rgba(0,240,255,0.4)', backdropFilter: 'blur(16px)', boxShadow: '0 0 20px rgba(0,240,255,0.2)' }}>
              <div className="font-display font-black text-[var(--neon-cyan)] text-xs tracking-widest mb-2">{hovered.name}</div>
              <p className="text-[var(--text-muted)] text-xs leading-relaxed mb-3">{hovered.desc}</p>
              <div className="font-mono text-[10px] text-[var(--gold)] mb-1">ORBIT: {hovered.level}</div>
              <div className="font-mono text-[10px] text-[var(--text-muted)]">{hovered.stack}</div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
