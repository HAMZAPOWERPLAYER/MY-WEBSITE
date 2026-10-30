import { CSSProperties, useEffect, useRef } from 'react';

interface SplitTextProps {
  children: string;
  className?: string;
  style?: CSSProperties;
  delay?: number;         // ms delay before animation starts
  stagger?: number;       // ms between each character
  from?: 'bottom' | 'top' | 'left' | 'right' | 'blur';
  duration?: number;      // ms per character
  once?: boolean;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
}

export function SplitText({
  children,
  className = '',
  style,
  delay = 0,
  stagger = 30,
  from = 'bottom',
  duration = 600,
  once = true,
  tag: Tag = 'div',
}: SplitTextProps) {
  const ref = useRef<HTMLElement>(null);
  const animated = useRef(false);

  const getInitialStyle = () => {
    switch (from) {
      case 'bottom': return { transform: 'translateY(120%)', opacity: '0' };
      case 'top':    return { transform: 'translateY(-120%)', opacity: '0' };
      case 'left':   return { transform: 'translateX(-40px)', opacity: '0' };
      case 'right':  return { transform: 'translateX(40px)', opacity: '0' };
      case 'blur':   return { filter: 'blur(12px)', opacity: '0', transform: 'scale(0.96)' };
      default:       return { transform: 'translateY(120%)', opacity: '0' };
    }
  };

  const getFinalStyle = () => {
    switch (from) {
      case 'blur': return { filter: 'blur(0px)', opacity: '1', transform: 'scale(1)' };
      default:     return { transform: 'translate(0)', opacity: '1' };
    }
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const spans = el.querySelectorAll<HTMLElement>('.split-char');
    const init = getInitialStyle();
    spans.forEach(s => Object.assign(s.style, init));

    const animate = () => {
      if (once && animated.current) return;
      animated.current = true;
      const final = getFinalStyle();
      spans.forEach((s, i) => {
        s.style.transition = `all ${duration}ms cubic-bezier(0.16,1,0.3,1) ${delay + i * stagger}ms`;
        Object.assign(s.style, final);
      });
    };

    const reset = () => {
      if (once) return;
      animated.current = false;
      const init2 = getInitialStyle();
      spans.forEach(s => {
        s.style.transition = 'none';
        Object.assign(s.style, init2);
      });
    };

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) animate();
        else reset();
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay, stagger, from, duration, once]);

  const words = children.split(' ');

  return (
    <Tag ref={ref as never} className={className} style={style} aria-label={children}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block overflow-hidden" style={{ verticalAlign: 'bottom' }}>
          {word.split('').map((char, ci) => (
            <span
              key={ci}
              className="split-char inline-block"
              aria-hidden="true"
              style={{ willChange: 'transform, opacity, filter' }}
            >
              {char}
            </span>
          ))}
          {wi < words.length - 1 && (
            <span className="split-char inline-block" aria-hidden="true">&nbsp;</span>
          )}
        </span>
      ))}
    </Tag>
  );
}
