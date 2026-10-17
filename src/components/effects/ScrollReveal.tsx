import { useEffect, useRef, ReactNode } from 'react';

type RevealVariant = 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'blur' | 'scale' | 'fade';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  staggerBase?: number;     // seconds between each child
  delay?: number;           // seconds initial delay
  variant?: RevealVariant;
  distance?: number;        // px for translate variants
  duration?: number;        // ms
  threshold?: number;
  once?: boolean;
}

function getInitial(variant: RevealVariant, distance: number): Partial<CSSStyleDeclaration> {
  const d = `${distance}px`;
  const map: Record<RevealVariant, Partial<CSSStyleDeclaration>> = {
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

function getFinal(variant: RevealVariant): Partial<CSSStyleDeclaration> {
  if (variant === 'blur') return { filter: 'blur(0px)', opacity: '1', transform: 'translateY(0px) scale(1)' };
  if (variant === 'scale') return { transform: 'scale(1)', opacity: '1' };
  if (variant === 'fade') return { opacity: '1' };
  return { transform: 'translate(0)', opacity: '1' };
}

export function ScrollReveal({
  children,
  className = '',
  staggerBase = 0.1,
  delay = 0,
  variant = 'slide-up',
  distance = 48,
  duration = 800,
  threshold = 0.12,
  once = true,
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const revealed = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const init = getInitial(variant, distance);
    const final = getFinal(variant);

    const kids = Array.from(container.children) as HTMLElement[];
    kids.forEach(child => {
      child.style.transition = 'none';
      Object.assign(child.style, init);
      child.style.willChange = 'transform, opacity, filter';
    });

    const animate = () => {
      if (once && revealed.current) return;
      revealed.current = true;
      kids.forEach((child, i) => {
        const t = `${duration}ms cubic-bezier(0.16,1,0.3,1) ${delay + i * staggerBase}s`;
        child.style.transition = `all ${t}`;
        Object.assign(child.style, final);
      });
    };

    const reset = () => {
      if (once) return;
      revealed.current = false;
      kids.forEach(child => {
        child.style.transition = 'none';
        Object.assign(child.style, init);
      });
    };

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) animate();
        else reset();
      },
      { threshold }
    );
    obs.observe(container);
    return () => obs.disconnect();
  }, [variant, distance, duration, threshold, staggerBase, delay, once]);

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
  threshold = 0.15,
}: Omit<ScrollRevealProps, 'staggerBase' | 'children'> & { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const revealed = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const init = getInitial(variant, distance);
    const final = getFinal(variant);
    Object.assign(el.style, init);
    el.style.transition = 'none';
    el.style.willChange = 'transform, opacity, filter';

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !revealed.current) {
          revealed.current = true;
          setTimeout(() => {
            el.style.transition = `all ${duration}ms cubic-bezier(0.16,1,0.3,1) ${delay}s`;
            Object.assign(el.style, final);
          }, 10);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [variant, distance, duration, threshold, delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
