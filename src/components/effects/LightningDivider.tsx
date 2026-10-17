import { useEffect, useRef, useState } from 'react';

function generateLightning(): string {
  const W = 1000;
  const pts: [number, number][] = [[0, 50]];
  const steps = 9;
  for (let i = 1; i < steps; i++) {
    const x = (i / steps) * W;
    const y = 50 + (Math.random() - 0.5) * 60;
    pts.push([x, y]);
  }
  pts.push([W, 50]);
  return pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${x} ${y}`).join(' ');
}

export function LightningDivider() {
  const ref = useRef<SVGPolylineElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [path] = useState(() => generateLightning());
  const [fired, setFired] = useState(false);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !fired) {
          setFired(true);
          setTimeout(() => setFlash(true), 550);
          setTimeout(() => setFlash(false), 700);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(svg);
    return () => observer.disconnect();
  }, [fired]);

  const pathLen = 1200;

  return (
    <div className="relative w-full overflow-hidden" style={{ height: 40 }}>
      {flash && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'rgba(0,240,255,0.08)', transition: 'opacity 0.15s' }}
        />
      )}
      <svg
        ref={svgRef}
        viewBox="0 0 1000 100"
        preserveAspectRatio="none"
        className="w-full h-full"
      >
        <defs>
          <filter id="lightning-glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* Glow layer */}
        <path
          d={path}
          fill="none"
          stroke="rgba(0,240,255,0.3)"
          strokeWidth="6"
          filter="url(#lightning-glow)"
          strokeDasharray={pathLen}
          strokeDashoffset={fired ? 0 : pathLen}
          style={{ transition: fired ? 'stroke-dashoffset 0.55s ease-out' : 'none' }}
        />
        {/* Core line */}
        <path
          ref={ref as React.RefObject<SVGPathElement>}
          d={path}
          fill="none"
          stroke="#00f0ff"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={pathLen}
          strokeDashoffset={fired ? 0 : pathLen}
          style={{ transition: fired ? 'stroke-dashoffset 0.55s ease-out' : 'none' }}
        />
      </svg>
    </div>
  );
}
