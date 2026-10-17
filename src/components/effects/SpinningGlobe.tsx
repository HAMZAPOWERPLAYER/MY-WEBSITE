import { useEffect, useRef, useState } from 'react';

const DOTS = [
  { lat: 30, lon: 70, label: 'HAMZA POWERPLAYER — HQ', gold: true },   // Pakistan
  { lat: 25, lon: 55, label: 'UAE', gold: false },
  { lat: 51, lon: -0.1, label: 'UK', gold: false },
  { lat: 40, lon: -74, label: 'USA', gold: false },
  { lat: 43, lon: -79, label: 'Canada', gold: false },
  { lat: 52, lon: 13, label: 'Germany', gold: false },
  { lat: -25, lon: 133, label: 'Australia', gold: false },
  { lat: 35, lon: 139, label: 'Japan', gold: false },
];

const FLAGS = ['🇵🇰', '🇦🇪', '🇬🇧', '🇺🇸', '🇨🇦', '🇩🇪', '🇦🇺', '🇯🇵', '🇫🇷', '🇧🇷'];

export function SpinningGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number } | null>(null);
  const rotRef = useRef(0);
  const speedRef = useRef(0.3);
  const hoveredRef = useRef(false);

  useEffect(() => {
    const canvasRefValue = canvasRef.current;
    if (!canvasRefValue) return;
    const canvas: HTMLCanvasElement = canvasRefValue;
    const context = canvas.getContext('2d');
    if (!context) return;
    const ctx: CanvasRenderingContext2D = context;

    const SIZE = 280;
    canvas.width = SIZE;
    canvas.height = SIZE;
    const cx = SIZE / 2;
    const cy = SIZE / 2;
    const R = SIZE * 0.42;
    let rafId = 0;

    function latLonToXY(lat: number, lon: number, rotation: number): { x: number; y: number; visible: boolean } {
      const lonRad = ((lon + rotation) * Math.PI) / 180;
      const latRad = (lat * Math.PI) / 180;
      const x = cx + R * Math.cos(latRad) * Math.sin(lonRad);
      const y = cy - R * Math.sin(latRad);
      const visible = Math.cos(latRad) * Math.cos(lonRad) > -0.2;
      return { x, y, visible };
    }

    function draw() {
      ctx.clearRect(0, 0, SIZE, SIZE);
      const rot = rotRef.current;

      // Globe base glow
      const bgGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, R);
      bgGrad.addColorStop(0, 'rgba(0,240,255,0.06)');
      bgGrad.addColorStop(0.7, 'rgba(4,4,20,0.3)');
      bgGrad.addColorStop(1, 'rgba(0,240,255,0.08)');
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = bgGrad;
      ctx.fill();

      // Clip to globe
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.clip();

      // Latitude lines (parallels)
      for (let lat = -80; lat <= 80; lat += 20) {
        const latRad = (lat * Math.PI) / 180;
        const ry = Math.cos(latRad) * R;
        const screenY = cy - Math.sin(latRad) * R;
        const isEquator = lat === 0;
        ctx.beginPath();
        ctx.ellipse(cx, screenY, ry, ry * 0.15, 0, 0, Math.PI * 2);
        ctx.strokeStyle = isEquator ? 'rgba(0,240,255,0.4)' : 'rgba(0,240,255,0.08)';
        ctx.lineWidth = isEquator ? 1.5 : 0.5;
        ctx.stroke();
      }

      // Longitude lines (meridians) — drawn as ellipses with rotation offset
      for (let lon = 0; lon < 180; lon += 30) {
        const lonRad = ((lon + rot) * Math.PI) / 180;
        const xTilt = Math.sin(lonRad);
        const visible = Math.abs(Math.cos(lonRad));
        ctx.beginPath();
        ctx.ellipse(cx, cy, Math.abs(xTilt) * R, R, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0,240,255,${0.04 + visible * 0.06})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      ctx.restore();

      // Globe rim
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0,240,255,0.25)';
      ctx.lineWidth = 1.5;
      ctx.shadowColor = '#00f0ff';
      ctx.shadowBlur = 8;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Orbit ring at 45° tilt
      const orbitAngle = (rot * 1.5 * Math.PI) / 180;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(0.3);
      const orbitGrad = ctx.createLinearGradient(-R, 0, R, 0);
      orbitGrad.addColorStop(0, 'rgba(0,240,255,0.8)');
      orbitGrad.addColorStop(0.5, 'rgba(124,58,237,0.8)');
      orbitGrad.addColorStop(1, 'rgba(0,240,255,0.8)');
      ctx.beginPath();
      ctx.ellipse(0, 0, R + 18, (R + 18) * 0.35, 0, 0, Math.PI * 2);
      ctx.strokeStyle = orbitGrad;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      // Satellite dot
      const satX = (R + 18) * Math.cos(orbitAngle);
      const satY = (R + 18) * 0.35 * Math.sin(orbitAngle);
      ctx.beginPath();
      ctx.arc(satX, satY, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#00f0ff';
      ctx.shadowColor = '#00f0ff';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.restore();

      // Location dots
      DOTS.forEach(dot => {
        const { x, y, visible } = latLonToXY(dot.lat, dot.lon, rot);
        if (!visible) return;
        const color = dot.gold ? '#f5c518' : '#00f0ff';
        const size = dot.gold ? 5 : 3.5;

        // Pulse ring
        const pulsePhase = (Date.now() / 1000) * 1.5 + dot.lon;
        const pulseR = size + (Math.sin(pulsePhase) * 0.5 + 0.5) * 12;
        const pulseAlpha = Math.max(0, 1 - (pulseR - size) / 12) * 0.5;
        ctx.beginPath();
        ctx.arc(x, y, pulseR, 0, Math.PI * 2);
        ctx.strokeStyle = dot.gold ? `rgba(245,197,24,${pulseAlpha})` : `rgba(0,240,255,${pulseAlpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Dot
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.shadowColor = color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      rotRef.current += speedRef.current;
      rafId = requestAnimationFrame(draw);
    }

    rafId = requestAnimationFrame(draw);

    // Mouse hover speed up + tooltip
    const handleMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      const scaleX = SIZE / rect.width;
      const scaleY = SIZE / rect.height;
      const cx2 = mx * scaleX;
      const cy2 = my * scaleY;
      const dist = Math.hypot(cx2 - SIZE / 2, cy2 - SIZE / 2);
      hoveredRef.current = dist < SIZE * 0.42;
      speedRef.current = hoveredRef.current ? 1.2 : 0.3;

      // Check Pakistan tooltip
      const pakPos = latLonToXY(30, 70, rotRef.current);
      if (Math.hypot(cx2 - pakPos.x, cy2 - pakPos.y) < 12 && pakPos.visible) {
        setTooltip({ text: 'HAMZA POWERPLAYER — HQ', x: e.clientX - rect.left, y: e.clientY - rect.top - 20 });
      } else {
        setTooltip(null);
      }
    };
    const handleLeave = () => {
      hoveredRef.current = false;
      speedRef.current = 0.3;
      setTooltip(null);
    };
    canvas.addEventListener('mousemove', handleMove);
    canvas.addEventListener('mouseleave', handleLeave);

    return () => {
      cancelAnimationFrame(rafId);
      canvas.removeEventListener('mousemove', handleMove);
      canvas.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative">
        <canvas
          ref={canvasRef}
          style={{ width: 280, height: 280, cursor: 'crosshair' }}
        />
        {tooltip && (
          <div
            className="absolute pointer-events-none bg-[var(--bg-surface)] border border-[var(--gold)] px-3 py-1 font-body text-xs text-[var(--gold)] whitespace-nowrap z-10"
            style={{ left: tooltip.x, top: tooltip.y, transform: 'translateX(-50%)' }}
          >
            {tooltip.text}
          </div>
        )}
      </div>

      <div className="font-accent text-xs tracking-[6px] text-[var(--text-muted)] uppercase">Available Worldwide</div>

      <div className="flex gap-3 text-2xl">
        {FLAGS.map((flag, i) => (
          <span key={i} className="opacity-70 hover:opacity-100 transition-opacity cursor-default">{flag}</span>
        ))}
      </div>
    </div>
  );
}
