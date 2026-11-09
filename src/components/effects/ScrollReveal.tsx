import { useEffect, useRef, ReactNode } from 'react';
import { setupReveal, type RevealStyles } from './reveal';

type RevealVariant = 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'blur' | 'scale' | 'fade';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  staggerBase?: number;     // seconds between each child
  delay?: number;           // seconds initial delay
  variant?: RevealVariant;
  distance?: number;        // px for translate variants
  duration?: number;        // ms
  once?: boolean;
}

function getInitial(variant: RevealVariant, distance: number): RevealStyles {
  const d = `${distance}px`;
  const map: Record<RevealVariant, RevealStyles> = {
    'slide-up':    { transform: `translateY(${d})`, opacity: '0' },
    'slide-down':  { transform: `translateY(-${d})`, opacity: '0' },
    'slide-left':  { transform: `translateX(${d})`, opacity: '0' },
    'slide-right': { transform: `translateX(-${d})`, opacity: '0' },
    'blur':        { filter: 'blur(16px)', opacity: '0', transform: 'translateY(16px) scale(0.98)' },
    'scale':       { transform: 'scale(0.88)', opacity: '0' },
    'fade':        { opacity: '0' },
  };
  return map[variant];
}

function getFinal(variant: RevealVariant): RevealStyles {
  if (variant === 'blur') return { filter: 'blur(0px)', opacity: '1', transform: 'translateY(0px) scale(1)' };
  if (variant === 'scale') return { transform: 'scale(1)', opacity: '1' };
  if (variant === 'fade') return { opacity: '1' };
  return { transform: 'translate(0)', opacity: '1' };
}

/* Staggered container reveal — children share one observer and rise in
   sequence. Content is visible by default; see ./reveal.ts for the engine
   contract (hidden state only after the observer proves it fires). */
export function ScrollReveal({
  children,
  className = '',
  staggerBase = 0.1,
  delay = 0,
  variant = 'slide-up',
  distance = 48,
  duration = 800,
  once = true,
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const kids = Array.from(container.children) as HTMLElement[];
    return setupReveal({
      observed: container,
      styled: kids,
      init: getInitial(variant, distance),
      final: getFinal(variant),
      revealTransition: (i) => `all ${duration}ms cubic-bezier(0.16,1,0.3,1) ${delay + i * staggerBase}s`,
      once,
    });
  }, [variant, distance, duration, staggerBase, delay, once]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}

/* Single element reveal — wraps ONE child */
export function Reveal({
  children,
  className = '',
  delay = 0,
  variant = 'slide-up',
  distance = 40,
  duration = 700,
}: Omit<ScrollRevealProps, 'staggerBase' | 'children' | 'once'> & { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return setupReveal({
      observed: el,
      init: getInitial(variant, distance),
      final: getFinal(variant),
      revealTransition: () => `all ${duration}ms cubic-bezier(0.16,1,0.3,1) ${delay}s`,
    });
  }, [variant, distance, duration, delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
