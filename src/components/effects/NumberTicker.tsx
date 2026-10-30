import { useEffect, useRef, useState } from 'react';

interface NumberTickerProps {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
  delay?: number;
  easing?: 'ease-out' | 'spring' | 'linear';
}

function easeOutCubic(t: number) { return 1 - Math.pow(1 - t, 3); }
function easeOutExpo(t: number) { return t === 1 ? 1 : 1 - Math.pow(2, -10 * t); }

export function NumberTicker({
  value,
  suffix = '',
  prefix = '',
  decimals = 0,
  duration = 2000,
  className = '',
  delay = 0,
  easing = 'ease-out',
}: NumberTickerProps) {
  const [displayVal, setDisplayVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          obs.disconnect();

          setTimeout(() => {
            const startTime = performance.now();
            const easeFn = easing === 'spring' ? easeOutCubic : easing === 'linear' ? (t: number) => t : easeOutExpo;
            const tick = (now: number) => {
              const elapsed = now - startTime;
              const t = Math.min(elapsed / duration, 1);
              setDisplayVal(easeFn(t) * value);
              if (t < 1) requestAnimationFrame(tick);
              else setDisplayVal(value);
            };
            requestAnimationFrame(tick);
          }, delay);
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [value, duration, delay, easing]);

  const formatted = displayVal.toFixed(decimals);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {prefix}{formatted}{suffix}
    </span>
  );
}

/* Slot machine digit ticker */
export function SlotTicker({
  value,
  className = '',
  suffix = '',
}: {
  value: number;
  className?: string;
  suffix?: string;
}) {
  const digits = String(Math.round(value)).split('');

  return (
    <span className={`inline-flex items-baseline gap-0.5 ${className}`}>
      {digits.map((d, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden"
          style={{ height: '1.2em', lineHeight: '1.2em' }}
        >
          <span
            style={{
              display: 'block',
              animation: `slot-slide 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 80}ms both`,
            }}
          >
            {d}
          </span>
        </span>
      ))}
      {suffix && <span>{suffix}</span>}
    </span>
  );
}
