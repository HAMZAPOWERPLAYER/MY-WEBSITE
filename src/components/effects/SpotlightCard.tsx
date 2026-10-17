import { useRef, useState, ReactNode, MouseEvent, CSSProperties } from 'react';

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  spotlightColor?: string;
  borderColor?: string;
  glowColor?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
}

export function SpotlightCard({
  children,
  className = '',
  style,
  spotlightColor = 'rgba(0,240,255,0.08)',
  borderColor = 'rgba(0,240,255,0.15)',
  glowColor = 'rgba(0,240,255,0.3)',
  onMouseEnter: onEnterProp,
  onMouseLeave: onLeaveProp,
  onClick,
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPos({ x, y });

    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -6;
    const rotY = ((x - cx) / cx) * 6;
    setRotation({ x: rotX, y: rotY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    onEnterProp?.();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
    onLeaveProp?.();
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`relative overflow-hidden rounded-2xl transition-all duration-500 ${className}`}
      style={{
        background: 'rgba(255,255,255,0.02)',
        border: `1px solid ${isHovered ? borderColor : 'rgba(255,255,255,0.06)'}`,
        backdropFilter: 'blur(24px) saturate(180%)',
        boxShadow: isHovered
          ? `0 8px 40px rgba(0,0,0,0.4), 0 0 0 1px ${borderColor}, 0 20px 60px -10px ${glowColor}`
          : '0 4px 24px rgba(0,0,0,0.2)',
        transform: isHovered
          ? `perspective(800px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(1.02,1.02,1.02)`
          : 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)',
        transition: isHovered
          ? 'transform 0.1s ease, box-shadow 0.3s ease, border-color 0.3s ease'
          : 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease, border-color 0.3s ease',
        willChange: 'transform',
        ...style,
      }}
    >
      {/* Spotlight gradient */}
      {isHovered && (
        <div
          className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
          style={{
            background: `radial-gradient(350px circle at ${pos.x}px ${pos.y}px, ${spotlightColor}, transparent 80%)`,
          }}
        />
      )}
      {/* Shine overlay */}
      {isHovered && (
        <div
          className="pointer-events-none absolute inset-0 z-10 opacity-30"
          style={{
            background: `radial-gradient(120px circle at ${pos.x}px ${pos.y}px, rgba(255,255,255,0.12), transparent 80%)`,
          }}
        />
      )}
      {children}
    </div>
  );
}
