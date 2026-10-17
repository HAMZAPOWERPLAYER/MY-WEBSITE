import { ReactNode, CSSProperties } from 'react';

interface AnimatedBorderProps {
  children: ReactNode;
  className?: string;
  borderWidth?: number;
  borderRadius?: string;
  gradient?: string;
  duration?: string;
  glowColor?: string;
}

export function AnimatedBorder({
  children,
  className = '',
  borderWidth = 1,
  borderRadius = '1rem',
  gradient = 'conic-gradient(from var(--angle), #00f0ff, #7c3aed, #f5c518, #00f0ff)',
  duration = '4s',
  glowColor = 'rgba(0,240,255,0.2)',
}: AnimatedBorderProps) {
  return (
    <div
      className={`animated-border-wrapper relative ${className}`}
      style={
        {
          '--angle': '0deg',
          '--border-width': `${borderWidth}px`,
          '--border-radius': borderRadius,
          '--gradient': gradient,
          '--duration': duration,
          '--glow-color': glowColor,
          borderRadius,
          padding: `${borderWidth}px`,
          background: gradient,
          animation: `border-spin ${duration} linear infinite`,
          position: 'relative',
          boxShadow: `0 0 20px ${glowColor}`,
        } as CSSProperties
      }
    >
      <div
        className="relative z-10 h-full w-full"
        style={{
          borderRadius: `calc(${borderRadius} - ${borderWidth}px)`,
          background: 'var(--bg-surface, #08081a)',
        }}
      >
        {children}
      </div>
    </div>
  );
}

/* Static pulse border variant — no keyframes, uses CSS box-shadow pulse */
export function PulseBorder({
  children,
  className = '',
  color = '#00f0ff',
  borderRadius = '1rem',
}: {
  children: ReactNode;
  className?: string;
  color?: string;
  borderRadius?: string;
}) {
  return (
    <div
      className={`relative ${className}`}
      style={{
        borderRadius,
        border: `1px solid ${color}33`,
        boxShadow: `0 0 0 0 ${color}40`,
        animation: 'pulse-border 2s ease-in-out infinite',
      }}
    >
      {children}
    </div>
  );
}
