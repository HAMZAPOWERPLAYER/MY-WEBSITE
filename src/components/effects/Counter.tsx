import { useEffect, useRef, useState } from 'react';

export function Counter({ target, duration = 2000, suffix = "" }: { target: number | string; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const isInfinity = target === '∞';
  const numericTarget = typeof target === 'number' ? target : parseInt(String(target).replace(/[^0-9]/g, '')) || 0;

  useEffect(() => {
    if (isInfinity) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTime: number;
          
          const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = (currentTime - startTime) / duration;
            
            if (progress < 1) {
              // ease-out-quad
              const easeOut = 1 - (1 - progress) * (1 - progress);
              setCount(Math.floor(easeOut * numericTarget));
              requestAnimationFrame(animate);
            } else {
              setCount(numericTarget);
            }
          };
          
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [numericTarget, duration, hasAnimated, isInfinity]);

  return (
    <div ref={ref} className={`font-display text-5xl md:text-7xl font-bold text-[var(--text-primary)] ${hasAnimated || isInfinity ? 'neon-text-glow' : ''} transition-all duration-500`}>
      {isInfinity ? '∞' : count}{suffix}
    </div>
  );
}
