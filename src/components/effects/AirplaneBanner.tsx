import { useEffect, useRef } from 'react';

interface Particle {
  x: number; y: number; vx: number; vy: number; alpha: number; life: number;
}

export function AirplaneBanner() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasRefValue = canvasRef.current;
    if (!canvasRefValue) return;
    const canvas: HTMLCanvasElement = canvasRefValue;
    const context = canvas.getContext('2d');
    if (!context) return;
    const ctx: CanvasRenderingContext2D = context;

    const particles: Particle[] = [];
    let rafId = 0;
    let planeX = -400;
    let running = false;
    let passCount = 0;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    function drawPlane(x: number, y: number, angle: number, scale: number) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.scale(scale, scale);

      // Fuselage
      ctx.beginPath();
      ctx.moveTo(42, 0);
      ctx.bezierCurveTo(32, -5, -18, -6, -40, -4);
      ctx.bezierCurveTo(-48, -2, -48, 2, -40, 4);
      ctx.bezierCurveTo(-18, 6, 32, 5, 42, 0);
      ctx.closePath();
      ctx.fillStyle = 'rgba(220,235,255,0.95)';
      ctx.fill();

      // Windows strip
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.arc(10 - i * 9, -2, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0,240,255,0.6)';
        ctx.fill();
      }

      // Left wing
      ctx.beginPath();
      ctx.moveTo(2, -4);
      ctx.lineTo(8, -4);
      ctx.lineTo(-12, -38);
      ctx.lineTo(-24, -36);
      ctx.lineTo(-8, -4);
      ctx.closePath();
      ctx.fillStyle = 'rgba(190,215,255,0.9)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(0,240,255,0.3)';
      ctx.lineWidth = 0.5;
      ctx.stroke();

      // Right wing (mirrored)
      ctx.beginPath();
      ctx.moveTo(2, 4);
      ctx.lineTo(8, 4);
      ctx.lineTo(-12, 38);
      ctx.lineTo(-24, 36);
      ctx.lineTo(-8, 4);
      ctx.closePath();
      ctx.fillStyle = 'rgba(190,215,255,0.9)';
      ctx.fill();
      ctx.stroke();

      // Vertical tail fin
      ctx.beginPath();
      ctx.moveTo(-38, 0);
      ctx.lineTo(-32, 0);
      ctx.lineTo(-40, -20);
      ctx.lineTo(-44, -18);
      ctx.closePath();
      ctx.fillStyle = 'rgba(210,228,255,0.9)';
      ctx.fill();

      // Horizontal tail left
      ctx.beginPath();
      ctx.moveTo(-38, -3);
      ctx.lineTo(-33, -3);
      ctx.lineTo(-40, -17);
      ctx.lineTo(-44, -15);
      ctx.closePath();
      ctx.fill();

      // Horizontal tail right
      ctx.beginPath();
      ctx.moveTo(-38, 3);
      ctx.lineTo(-33, 3);
      ctx.lineTo(-40, 17);
      ctx.lineTo(-44, 15);
      ctx.closePath();
      ctx.fill();

      // Engine left
      ctx.beginPath();
      ctx.ellipse(-6, -20, 10, 4, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0,240,255,0.7)';
      ctx.fill();
      // Engine glow left
      const gl = ctx.createRadialGradient(-14, -20, 0, -14, -20, 5);
      gl.addColorStop(0, 'rgba(0,240,255,1)');
      gl.addColorStop(1, 'rgba(0,240,255,0)');
      ctx.beginPath();
      ctx.ellipse(-15, -20, 5, 4, 0, 0, Math.PI * 2);
      ctx.fillStyle = gl;
      ctx.fill();

      // Engine right
      ctx.beginPath();
      ctx.ellipse(-6, 20, 10, 4, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0,240,255,0.7)';
      ctx.fill();
      const gr = ctx.createRadialGradient(-14, 20, 0, -14, 20, 5);
      gr.addColorStop(0, 'rgba(0,240,255,1)');
      gr.addColorStop(1, 'rgba(0,240,255,0)');
      ctx.beginPath();
      ctx.ellipse(-15, 20, 5, 4, 0, 0, Math.PI * 2);
      ctx.fillStyle = gr;
      ctx.fill();

      ctx.restore();
    }

    function drawBanner(x: number, y: number, t: number) {
      const isMobile = window.innerWidth < 640;
      const bannerW = isMobile ? 200 : 320;
      const bannerH = isMobile ? 28 : 36;
      const ropeLen = 45;
      const segments = 24;
      const startX = x - 48;

      ctx.save();

      // Rope
      ctx.beginPath();
      ctx.moveTo(x - 44, y);
      for (let i = 0; i <= 10; i++) {
        const rx = x - 44 - (i / 10) * ropeLen;
        const ry = y + Math.sin(t * 2 + i * 0.5) * 2;
        ctx.lineTo(rx, ry);
      }
      ctx.strokeStyle = 'rgba(200,220,255,0.5)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Cloth simulation points
      const topPts: [number, number][] = [];
      const botPts: [number, number][] = [];
      for (let i = 0; i <= segments; i++) {
        const px = startX - ropeLen - (i / segments) * bannerW;
        const wave = Math.sin(t * 3 + i * 0.25) * 4 + Math.sin(t * 1.7 + i * 0.4) * 2;
        const taper = 1 - (i / segments) * 0.15;
        topPts.push([px, y - (bannerH / 2) * taper + wave]);
        botPts.push([px, y + (bannerH / 2) * taper + wave * 0.7]);
      }

      // Banner fill
      ctx.beginPath();
      ctx.moveTo(topPts[0][0], topPts[0][1]);
      for (const [px, py] of topPts) ctx.lineTo(px, py);
      for (let i = botPts.length - 1; i >= 0; i--) ctx.lineTo(botPts[i][0], botPts[i][1]);
      ctx.closePath();
      ctx.fillStyle = 'rgba(4,4,18,0.88)';
      ctx.fill();

      // Banner border top
      ctx.beginPath();
      ctx.moveTo(topPts[0][0], topPts[0][1]);
      for (const [px, py] of topPts) ctx.lineTo(px, py);
      ctx.strokeStyle = 'rgba(0,240,255,0.8)';
      ctx.lineWidth = 1.5;
      ctx.shadowColor = '#00f0ff';
      ctx.shadowBlur = 4;
      ctx.stroke();

      // Banner border bottom
      ctx.beginPath();
      ctx.moveTo(botPts[0][0], botPts[0][1]);
      for (const [px, py] of botPts) ctx.lineTo(px, py);
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Banner text
      const midX = startX - ropeLen - bannerW / 2;
      const midY = y + Math.sin(t * 2) * 1.5;
      const fontSize = isMobile ? 9 : 12;
      ctx.font = `900 ${fontSize}px Orbitron, monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.shadowColor = '#00f0ff';
      ctx.shadowBlur = 10;
      ctx.fillStyle = '#ffffff';
      ctx.fillText('HAMZA POWERPLAYER', midX, midY);
      ctx.shadowBlur = 0;

      ctx.restore();
    }

    function spawnParticles(ex: number, ey: number) {
      for (let i = 0; i < 3; i++) {
        particles.push({
          x: ex + (Math.random() - 0.5) * 6,
          y: ey + (Math.random() - 0.5) * 10,
          vx: -(Math.random() * 2 + 0.8),
          vy: (Math.random() - 0.5) * 0.6,
          alpha: 0.6 + Math.random() * 0.3,
          life: 1.0 + Math.random() * 0.4,
        });
      }
    }

    function draw() {
      const W = window.innerWidth;
      const H = window.innerHeight;
      ctx.clearRect(0, 0, W, H);
      time += 0.016;

      if (running) {
        const isMobile = W < 640;
        const scale = isMobile ? 0.55 : 1;
        const speedPx = W / (8 * 60);
        planeX += speedPx;

        const altY = H * 0.18;
        const flightY = altY + Math.sin(planeX * 0.012) * 18;
        const bankAngle = Math.cos(planeX * 0.012) * 0.012 * 18 * 0.015;

        let finalAngle = bankAngle;
        if (passCount === 0) {
          const entryFactor = Math.min(1, (planeX + 400) / (W * 0.4));
          finalAngle = bankAngle - (1 - entryFactor) * 0.28;
        }

        // Spawn contrail particles
        if (planeX > -60) {
          const scale2 = isMobile ? 0.55 : 1;
          spawnParticles(planeX - 15 * scale2, flightY + 18 * scale2);
          spawnParticles(planeX - 15 * scale2, flightY - 18 * scale2);
        }

        // Draw particles
        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.alpha -= 0.016 / p.life;
          if (p.alpha <= 0) { particles.splice(i, 1); continue; }
          ctx.beginPath();
          ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 1.5);
          grad.addColorStop(0, `rgba(200,230,255,${p.alpha})`);
          grad.addColorStop(1, `rgba(100,200,255,0)`);
          ctx.fillStyle = grad;
          ctx.fill();
        }

        if (planeX > -300) drawBanner(planeX, flightY, time);
        if (planeX > -60 && planeX < W + 450) drawPlane(planeX, flightY, finalAngle, scale);

        if (planeX > W + 500) {
          running = false;
          passCount++;
          particles.length = 0;
        }
      } else {
        // Draw any lingering particles
        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.alpha -= 0.016 / p.life;
          if (p.alpha <= 0) { particles.splice(i, 1); continue; }
          ctx.beginPath();
          ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(200,230,255,${p.alpha})`;
          ctx.fill();
        }
      }

      rafId = requestAnimationFrame(draw);
    }

    function startFlight() {
      if (running) return;
      planeX = -380;
      running = true;
    }

    const firstTimer = setTimeout(startFlight, 3500);
    const repeatInterval = setInterval(startFlight, 25000);
    rafId = requestAnimationFrame(draw);

    return () => {
      clearTimeout(firstTimer);
      clearInterval(repeatInterval);
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 15 }}
    />
  );
}
