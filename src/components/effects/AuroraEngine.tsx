import { useEffect, useRef } from 'react';

export default function AuroraEngine() {
  const canvasRef1 = useRef<HTMLCanvasElement>(null);
  const canvasRef2 = useRef<HTMLCanvasElement>(null);
  const canvasRef3 = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number | undefined>(undefined);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const c1 = canvasRef1.current;
    const c2 = canvasRef2.current;
    const c3 = canvasRef3.current;
    if (!c1 || !c2 || !c3) return;

    const ctx1 = c1.getContext('2d');
    const ctx2 = c2.getContext('2d');
    const ctx3 = c3.getContext('2d');
    if (!ctx1 || !ctx2 || !ctx3) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      [c1, c2, c3].forEach(c => {
        c.width = width;
        c.height = height;
      });
      initStars();
    };

    let stars: { x: number; y: number; r: number; a: number }[] = [];
    const initStars = () => {
      stars = Array.from({ length: 300 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.5,
        a: 0.4 + Math.random() * 0.5
      }));
      drawStars();
    };

    const drawStars = () => {
      ctx1.clearRect(0, 0, width, height);
      stars.forEach(star => {
        ctx1.beginPath();
        ctx1.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx1.fillStyle = `rgba(255, 255, 255, ${star.a})`;
        ctx1.fill();
      });
    };

    // Blobs
    const blobs = [
      { color: '#00f0ff', size: 800, cx: 0.2, cy: 0.3, phaseX: 0, phaseY: 1 },
      { color: '#7c3aed', size: 900, cx: 0.8, cy: 0.7, phaseX: 2, phaseY: 3 },
      { color: '#ff2d55', size: 700, cx: 0.5, cy: 0.2, phaseX: 4, phaseY: 0 },
      { color: '#f5c518', size: 600, cx: 0.3, cy: 0.8, phaseX: 1, phaseY: 2 }
    ];

    // Shapes
    const shapes = Array.from({ length: 40 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 0.02,
      type: Math.floor(Math.random() * 3),
      size: 5 + Math.random() * 15
    }));

    resize();
    window.addEventListener('resize', resize);

    let tiltX = 0;
    let tiltY = 0;
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.beta && e.gamma) {
        tiltY = (e.beta / 90) * 50;
        tiltX = (e.gamma / 90) * 50;
      }
    };
    window.addEventListener('deviceorientation', handleOrientation);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX - width / 2) * 0.02,
        y: (e.clientY - height / 2) * 0.02
      };
    };
    window.addEventListener('mousemove', handleMouseMove);

    let time = 0;
    const animate = () => {
      time += 0.005;

      const px = mouseRef.current.x + tiltX;
      const py = mouseRef.current.y + tiltY;

      // Draw Blobs
      ctx2.clearRect(0, 0, width, height);
      blobs.forEach(b => {
        const x = width * b.cx + Math.sin(time + b.phaseX) * width * 0.2 + px * 2;
        const y = height * b.cy + Math.cos(time + b.phaseY) * height * 0.2 + py * 2;
        
        ctx2.globalAlpha = 0.03;
        ctx2.fillStyle = b.color;
        for (let i = 0; i < 3; i++) {
          ctx2.beginPath();
          ctx2.arc(x, y, b.size, 0, Math.PI * 2);
          ctx2.fill();
        }
      });
      ctx2.globalAlpha = 1;

      // Draw Shapes
      ctx3.clearRect(0, 0, width, height);
      ctx3.globalAlpha = 0.06;
      ctx3.strokeStyle = '#fff';
      ctx3.lineWidth = 1;
      
      shapes.forEach(s => {
        s.x += s.vx;
        s.y += s.vy;
        s.r += s.vr;

        if (s.x < -50) s.x = width + 50;
        if (s.x > width + 50) s.x = -50;
        if (s.y < -50) s.y = height + 50;
        if (s.y > height + 50) s.y = -50;

        ctx3.save();
        ctx3.translate(s.x + px, s.y + py);
        ctx3.rotate(s.r);
        ctx3.beginPath();
        
        if (s.type === 0) { // Triangle
          ctx3.moveTo(0, -s.size);
          ctx3.lineTo(s.size * 0.866, s.size * 0.5);
          ctx3.lineTo(-s.size * 0.866, s.size * 0.5);
          ctx3.closePath();
        } else if (s.type === 1) { // Square
          ctx3.rect(-s.size/2, -s.size/2, s.size, s.size);
        } else { // Cross
          ctx3.moveTo(-s.size/2, 0);
          ctx3.lineTo(s.size/2, 0);
          ctx3.moveTo(0, -s.size/2);
          ctx3.lineTo(0, s.size/2);
        }
        
        ctx3.stroke();
        ctx3.restore();
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('deviceorientation', handleOrientation);
      window.removeEventListener('mousemove', handleMouseMove);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      <canvas ref={canvasRef1} className="absolute inset-0 z-0" />
      <canvas ref={canvasRef2} className="absolute inset-0 z-[1]" style={{ filter: 'blur(120px)' }} />
      <canvas ref={canvasRef3} className="absolute inset-0 z-[2]" />
    </div>
  );
}
