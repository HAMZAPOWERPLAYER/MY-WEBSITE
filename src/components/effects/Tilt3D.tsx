import { useEffect, useRef, type CSSProperties, type PointerEvent, type ReactNode } from 'react';

interface Tilt3DProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Max rotation in degrees at the card edge. 5–10 stays readable. */
  maxTilt?: number;
  /** Scale written while the pointer is over the card (1 = none). */
  liftScale?: number;
  /** Render the cursor glare overlay. */
  glare?: boolean;
}

function tiltEnabled() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

/**
 * Pointer-tilt plane for the WOW v4 3D depth system.
 *
 * The pointer position is written straight onto the element as CSS
 * custom properties (--hp-rx/--hp-ry/--hp-gx/--hp-gy/--hp-s) inside a
 * requestAnimationFrame — React state is never involved, so tracking
 * a moving cursor re-renders nothing. Transform/opacity only, so the
 * browser stays on the GPU the whole ride. Touch pens are ignored and
 * the whole system no-ops under prefers-reduced-motion.
 */
export function Tilt3D({
  children,
  className = '',
  style,
  maxTilt = 8,
  liftScale = 1.02,
  glare = true,
}: Tilt3DProps) {
  const elRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef(0);
  const enabledRef = useRef(false);

  useEffect(() => {
    enabledRef.current = tiltEnabled();
    return () => {
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const reset = () => {
    cancelAnimationFrame(frameRef.current);
    const el = elRef.current;
    if (!el) return;
    delete el.dataset.active;
    el.style.setProperty('--hp-rx', '0deg');
    el.style.setProperty('--hp-ry', '0deg');
    el.style.setProperty('--hp-s', '1');
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!enabledRef.current || event.pointerType === 'touch') return;
    const el = elRef.current;
    if (!el) return;
    const { clientX, clientY } = event;
    cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      // Measure the already-tilted element — sub-10deg shifts are ~px.
      const rect = el.getBoundingClientRect();
      const x = (clientX - rect.left) / rect.width;
      const y = (clientY - rect.top) / rect.height;
      el.style.setProperty('--hp-rx', `${(0.5 - y) * 2 * maxTilt}deg`);
      el.style.setProperty('--hp-ry', `${(x - 0.5) * 2 * maxTilt}deg`);
      el.style.setProperty('--hp-gx', `${x * 100}%`);
      el.style.setProperty('--hp-gy', `${y * 100}%`);
      el.style.setProperty('--hp-s', `${liftScale}`);
      el.dataset.active = 'true';
    });
  };

  return (
    <div
      ref={elRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      onPointerCancel={reset}
      className={`hp-tilt3d ${className}`}
      style={style}
    >
      {children}
      {glare && <span className="hp-glare" aria-hidden="true" />}
    </div>
  );
}
