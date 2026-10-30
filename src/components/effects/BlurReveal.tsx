import { CSSProperties, useEffect, useRef, ReactNode } from 'react';

interface BlurRevealProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  duration?: number;
  blur?: number;
  translateY?: number;
  once?: boolean;
  threshold?: number;
}

export function BlurReveal({
  children,
  className = '',
  style,
  delay = 0,
  duration = 700,
  blur = 12,
  translateY = 24,
  once = true,
  threshold = 0.15,
}: BlurRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const revealed = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.opacity = '0';
    el.style.filter = `blur(${blur}px)`;
    el.style.transform = `translateY(${translateY}px)`;
    el.style.transition = 'none';

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !(once && revealed.current)) {
          revealed.current = true;
          setTimeout(() => {
            el.style.transition = `opacity ${duration}ms cubic-bezier(0.16,1,0.3,1) ${delay}ms, filter ${duration}ms cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`;
            el.style.opacity = '1';
            el.style.filter = 'blur(0px)';
            el.style.transform = 'translateY(0px)';
          }, 10);
          if (once) obs.disconnect();
        } else if (!entry.isIntersecting && !once) {
          revealed.current = false;
          el.style.transition = 'none';
          el.style.opacity = '0';
          el.style.filter = `blur(${blur}px)`;
          el.style.transform = `translateY(${translateY}px)`;
        }
      },
      { threshold }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [delay, duration, blur, translateY, once, threshold]);

  return (
    <div ref={ref} className={className} style={{ willChange: 'opacity, filter, transform', ...style }}>
      {children}
    </div>
  );
}

/* Staggered version — wraps each direct child in a BlurReveal */
export function BlurRevealGroup({
  children,
  className = '',
  stagger = 100,
  ...rest
}: BlurRevealProps & { stagger?: number; children: ReactNode[] }) {
  return (
    <div className={className}>
      {(children as ReactNode[]).map((child, i) => (
        <BlurReveal key={i} delay={(rest.delay ?? 0) + i * stagger} {...rest}>
          {child}
        </BlurReveal>
      ))}
    </div>
  );
}
