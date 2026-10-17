import { useEffect, useRef, useState } from 'react';

interface Props {
  onClose?: () => void;
}

export function RocketLaunch({ onClose }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<'countdown' | 'launch' | 'space' | 'done'>('countdown');
  const [count, setCount] = useState(3);
  const [statusLines, setStatusLines] = useState<string[]>([]);
  const [showIgnition, setShowIgnition] = useState(false);
  const [showMission, setShowMission] = useState(false);
  const rafRef = useRef<number>(0);
  const rocketYRef = useRef(0);
  const startTimeRef = useRef(0);

  const STATUS_LINES = [
    '> FUEL SYSTEMS: NOMINAL',
    '> TRAJECTORY: CALCULATED',
    '> CLEARANCE: GRANTED',
  ];

  useEffect(() => {
    let t = 3;
    const interval = setInterval(() => {
      t--;
      setCount(t);
      const idx = 3 - t - 1;
      if (idx >= 0) setStatusLines(prev => [...prev, STATUS_LINES[idx]]);
      if (t <= 0) {
        clearInterval(interval);
        setShowIgnition(true);
        setTimeout(() => {
          setShowIgnition(false);
          setPhase('launch');
        }, 800);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (phase !== 'launch') return;
    const canvasRefValue = canvasRef.current;
    if (!canvasRefValue) return;
    const canvas: HTMLCanvasElement = canvasRefValue;
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    interface Star { x: number; y: number; speed: number; size: number; }
    const stars: Star[] = Array.from({ length: 200 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      speed: 1 + Math.random() * 8,
      size: Math.random() * 2 + 0.5,
    }));

    interface Particle { x: number; y: number; vx: number; vy: number; life: number; color: string; }
    let particles: Particle[] = [];
    let textAssembled = false;
    let textAlpha = 0;
    rocketYRef.current = canvas.height + 80;
    startTimeRef.current = performance.now();

    function drawRocket(x: number, y: number, scale: number) {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(scale, scale);

      // flame
      const flameH = 40 + Math.sin(Date.now() * 0.05) * 10;
      const grad = ctx.createLinearGradient(0, 0, 0, flameH);
      grad.addColorStop(0, 'rgba(255,255,255,0.9)');
      grad.addColorStop(0.3, '#ffaa00');
      grad.addColorStop(0.7, '#ff4400');
      grad.addColorStop(1, 'transparent');
      ctx.beginPath();
      ctx.moveTo(-8, 5);
      ctx.lineTo(8, 5);
      ctx.lineTo(4, flameH);
      ctx.lineTo(0, flameH + 15);
      ctx.lineTo(-4, flameH);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();

      // body
      ctx.fillStyle = '#e0e8ff';
      ctx.beginPath();
      ctx.roundRect(-10, -40, 20, 45, 3);
      ctx.fill();

      // nose cone
      ctx.fillStyle = '#c0c8e8';
      ctx.beginPath();
      ctx.moveTo(-10, -40);
      ctx.lineTo(10, -40);
      ctx.lineTo(0, -65);
      ctx.closePath();
      ctx.fill();

      // fins
      ctx.fillStyle = '#7c3aed';
      ctx.beginPath(); ctx.moveTo(-10, 0); ctx.lineTo(-22, 12); ctx.lineTo(-10, 5); ctx.closePath(); ctx.fill();
      ctx.beginPath(); ctx.moveTo(10, 0); ctx.lineTo(22, 12); ctx.lineTo(10, 5); ctx.closePath(); ctx.fill();

      // HP label
      ctx.font = 'bold 10px Orbitron, sans-serif';
      ctx.fillStyle = '#00f0ff';
      ctx.textAlign = 'center';
      ctx.fillText('HP', 0, -18);

      ctx.restore();
    }

    function spawnFireworks(cx: number, cy: number) {
      const colors = ['#00f0ff', '#7c3aed', '#f5c518', '#ff2d55', '#ffffff', '#00ff88'];
      for (let i = 0; i < 200; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1 + Math.random() * 8;
        particles.push({
          x: cx, y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 2,
          life: 1,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    }

    let launchPhase = 'ascending';
    let fireworkDone = false;
    let doneTimer = 0;

    function loop() {
      const now = performance.now();
      const elapsed = (now - startTimeRef.current) / 1000;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // bg
      if (launchPhase === 'ascending') {
        const bgGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
        const progress = Math.min(elapsed / 4, 1);
        const r1 = Math.floor(4 + progress * 0);
        const g1 = Math.floor(4 + progress * 0);
        const b1 = Math.floor(10 + progress * 0);
        bgGrad.addColorStop(0, `rgb(${r1},${r1},${b1})`);
        bgGrad.addColorStop(0.6 + progress * 0.3, `rgba(30,10,0,${1 - progress * 0.8})`);
        bgGrad.addColorStop(1, `rgba(80,30,0,${1 - progress})`);
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else {
        ctx.fillStyle = '#000008';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // stars
      stars.forEach(s => {
        s.y += s.speed * (launchPhase === 'ascending' ? 0.5 + elapsed : 0.2);
        if (s.y > canvas.height) s.y = 0;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${0.3 + s.size * 0.3})`;
        ctx.fill();
      });

      if (launchPhase === 'ascending') {
        const t = Math.min(elapsed / 4, 1);
        const eased = t * t;
        rocketYRef.current = canvas.height + 80 - (canvas.height + 160) * eased;
        const scale = 1 - t * 0.6;
        const shakeX = t > 0.3 ? (Math.random() - 0.5) * 6 * t : 0;

        // contrail
        ctx.save();
        const contrailGrad = ctx.createLinearGradient(canvas.width / 2, canvas.height + 80, canvas.width / 2, rocketYRef.current);
        contrailGrad.addColorStop(0, 'rgba(200,180,100,0.6)');
        contrailGrad.addColorStop(0.5, 'rgba(100,100,200,0.3)');
        contrailGrad.addColorStop(1, 'transparent');
        ctx.strokeStyle = contrailGrad;
        ctx.lineWidth = 3 * scale;
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, canvas.height + 80);
        ctx.lineTo(canvas.width / 2, rocketYRef.current + 5);
        ctx.stroke();
        ctx.restore();

        drawRocket(canvas.width / 2 + shakeX, rocketYRef.current, scale);

        if (elapsed >= 4) {
          launchPhase = 'fireworks';
          spawnFireworks(canvas.width / 2, canvas.height * 0.2);
        }
      } else if (launchPhase === 'fireworks') {
        particles = particles.filter(p => p.life > 0);
        particles.forEach(p => {
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.15;
          p.life -= 0.012;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
          ctx.fillStyle = p.color + Math.floor(p.life * 255).toString(16).padStart(2, '0');
          ctx.fill();
        });

        if (!fireworkDone && elapsed >= 5.5) {
          fireworkDone = true;
          textAssembled = true;
        }

        if (textAssembled) {
          textAlpha = Math.min(textAlpha + 0.03, 1);
          ctx.save();
          ctx.globalAlpha = textAlpha;
          ctx.font = 'bold clamp(1.5rem,5vw,3rem)/1 Orbitron, sans-serif';
          ctx.font = `bold ${Math.min(canvas.width * 0.06, 48)}px Orbitron, sans-serif`;
          ctx.fillStyle = '#00f0ff';
          ctx.textAlign = 'center';
          ctx.shadowBlur = 20;
          ctx.shadowColor = '#00f0ff';
          ctx.fillText('HAMZA POWERPLAYER', canvas.width / 2, canvas.height * 0.35);
          ctx.font = `bold ${Math.min(canvas.width * 0.035, 28)}px Orbitron, sans-serif`;
          ctx.fillStyle = '#f5c518';
          ctx.shadowColor = '#f5c518';
          ctx.fillText('HAS ENTERED ORBIT', canvas.width / 2, canvas.height * 0.35 + 50);
          ctx.restore();
        }

        if (fireworkDone && particles.length === 0) {
          doneTimer++;
          if (doneTimer > 90) {
            setPhase('done');
            setShowMission(true);
            return;
          }
        }
      }

      rafRef.current = requestAnimationFrame(loop);
    }

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [phase]);

  useEffect(() => {
    if (phase === 'done') {
      const t = setTimeout(() => onClose?.(), 1500);
      return () => clearTimeout(t);
    }
  }, [phase, onClose]);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.96)', animation: 'fadeIn 0.3s ease' }}>
      {phase === 'countdown' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div
            key={count}
            className="font-display font-black text-[clamp(6rem,20vw,12rem)] text-[var(--neon-cyan)]"
            style={{
              textShadow: '0 0 40px #00f0ff, 0 0 80px #00f0ff',
              animation: 'rocket-count 0.5s cubic-bezier(0.34,1.56,0.64,1)',
            }}
          >
            T-{count}
          </div>
          <div className="absolute bottom-32 left-1/2 -translate-x-1/2 font-mono text-sm text-[var(--neon-cyan)] space-y-2 text-left">
            {statusLines.map((l, i) => (
              <div key={i} style={{ animation: 'fadeIn 0.4s ease' }}>{l}</div>
            ))}
          </div>
        </div>
      )}

      {showIgnition && (
        <div className="absolute inset-0 flex items-center justify-center"
          style={{ animation: 'ignition-flash 0.8s ease forwards' }}>
          <div className="font-display font-black text-white text-[clamp(3rem,12vw,8rem)]"
            style={{ textShadow: '0 0 60px #fff, 0 0 120px #fff' }}>
            IGNITION
          </div>
        </div>
      )}

      {phase === 'launch' && (
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      )}

      {phase === 'done' && (
        <div className="font-display text-2xl text-[var(--gold)]"
          style={{ textShadow: '0 0 20px var(--gold)', animation: 'fadeIn 0.5s ease' }}>
          MISSION COMPLETE ✓
        </div>
      )}
    </div>
  );
}
