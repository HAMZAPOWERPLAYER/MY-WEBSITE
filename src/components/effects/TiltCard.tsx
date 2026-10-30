import { useState, useRef, ReactNode, CSSProperties, MouseEvent } from 'react';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  maxTilt?: number;
  glowColor?: string;
  perspective?: number;
}

export function TiltCard({
  children,
  className = '',
  style,
  maxTilt = 12,
  glowColor = 'rgba(0,240,255,0.25)',
  perspective = 1000,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [spotPos, setSpotPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    setTilt({
      x: (py - 0.5) * maxTilt,
      y: (px - 0.5) * -maxTilt,
    });
    setSpotPos({ x: px * 100, y: py * 100 });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
    setSpotPos({ x: 50, y: 50 });
  };

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden rounded-xl interactive ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        background: 'rgba(255,255,255,0.02)',
        border: `1px solid ${isHovered ? 'rgba(0,240,255,0.2)' : 'rgba(255,255,255,0.06)'}`,
        backdropFilter: 'blur(24px) saturate(180%)',
        transform: `perspective(${perspective}px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${isHovered ? 'translateZ(16px)' : 'translateZ(0)'}`,
        boxShadow: isHovered
          ? `0 24px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,240,255,0.15), 0 0 40px ${glowColor}`
          : '0 4px 16px rgba(0,0,0,0.2)',
        transition: isHovered
          ? 'transform 0.08s ease, box-shadow 0.3s ease, border-color 0.3s ease'
          : 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s ease, border-color 0.3s ease',
        willChange: 'transform',
        ...style,
      }}
    >
      {/* Spotlight overlay */}
      {isHovered && (
        <>
          <div
            className="pointer-events-none absolute inset-0 z-10"
            style={{
              background: `radial-gradient(280px circle at ${spotPos.x}% ${spotPos.y}%, rgba(0,240,255,0.07), transparent 80%)`,
            }}
          />
          <div
            className="pointer-events-none absolute inset-0 z-10"
            style={{
              background: `radial-gradient(120px circle at ${spotPos.x}% ${spotPos.y}%, rgba(255,255,255,0.08), transparent 80%)`,
            }}
          />
          {/* Edge highlight */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-[1px] z-10"
            style={{
              background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.15) ${spotPos.x}%, transparent)`,
            }}
          />
        </>
      )}
      {children}
    </div>
  );
}
