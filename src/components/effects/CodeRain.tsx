import { useEffect, useRef } from 'react';

export function CodeRain({ intensity = 'normal' }: { intensity?: 'normal' | 'high' }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;
    
    const resize = () => {
      width = canvas.parentElement?.offsetWidth || window.innerWidth;
      height = canvas.parentElement?.offsetHeight || window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    resize();
    window.addEventListener('resize', resize);

    const symbols = '{ } [ ] ( ) => && || !== === ?? :: -> <> ++ -- ** 0 1'.split(' ');
    const columns = 40;
    const fontSize = Math.max(14, width / columns);
    
    const drops = Array.from({ length: columns }, () => ({
      x: 0,
      y: Math.random() * height,
      speed: 1 + Math.random() * 3,
      char: symbols[Math.floor(Math.random() * symbols.length)],
      timer: 0,
      interval: 10 + Math.random() * 20
    }));

    const animate = () => {
      ctx.fillStyle = 'rgba(4, 4, 10, 0.1)';
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px "IBM Plex Mono"`;
      const opacity = intensity === 'high' ? '0.3' : '0.15';
      ctx.fillStyle = `rgba(0, 240, 255, ${opacity})`;

      drops.forEach((drop, i) => {
        drop.timer++;
        if (drop.timer > drop.interval) {
          drop.char = symbols[Math.floor(Math.random() * symbols.length)];
          drop.timer = 0;
        }

        const x = (i / columns) * width;
        ctx.fillText(drop.char, x, drop.y);

        drop.y += drop.speed;
        if (drop.y > height && Math.random() > 0.98) {
          drop.y = 0;
        }
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [intensity]);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 pointer-events-none"
    />
  );
}
