import { useEffect, useRef, useState } from 'react';

interface NeonLabelProps {
  children: React.ReactNode;
  color?: string;
  className?: string;
}

export function NeonLabel({ children, color = 'var(--neon-cyan)', className = '' }: NeonLabelProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<'hidden' | 'flickering' | 'on'>('hidden');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && state === 'hidden') {
          setState('flickering');
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [state]);

  useEffect(() => {
    if (state === 'flickering') {
      const t = setTimeout(() => setState('on'), 600);
      return () => clearTimeout(t);
    }
  }, [state]);

  return (
    <div
      ref={ref}
      className={`font-accent text-sm tracking-widest font-bold ${className}`}
      style={{
        color,
        opacity: state === 'hidden' ? 0 : 1,
        textShadow: state === 'on'
          ? `0 0 8px ${color}, 0 0 20px ${color}60`
          : 'none',
        animation: state === 'flickering' ? 'neon-flicker 0.6s ease-out forwards' : 'none',
        willChange: 'opacity, text-shadow',
      }}
    >
      {children}
    </div>
  );
}
