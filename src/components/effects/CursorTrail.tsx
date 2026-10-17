import { useEffect, useRef } from 'react';

export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Only active on desktop
    if (window.innerWidth <= 640) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const points: { x: number; y: number }[] = [];
    const maxPoints = 25;
    let mouse = { x: 0, y: 0 };
    let isActive = false;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (!isActive) isActive = true;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    const animate = () => {
      if (!isActive || !ctx) {
        requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      points.push({ x: mouse.x, y: mouse.y });
      if (points.length > maxPoints) {
        points.shift();
      }

      for (let i = 0; i < points.length; i++) {
        const point = points[i];
        const progress = i / points.length;
        
        ctx.beginPath();
        // size varies from max to min
        const size = Math.max(1, 4 * progress);
        ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
        
        // #00f0ff to transparent
        ctx.fillStyle = `rgba(0, 240, 255, ${progress * 0.8})`;
        ctx.fill();
      }

      requestAnimationFrame(animate);
    };
    
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 9998 }}
    />
  );
}
