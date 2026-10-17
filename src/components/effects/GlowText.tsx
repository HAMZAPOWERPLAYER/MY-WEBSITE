import { ReactNode, CSSProperties } from 'react';

interface GlowTextProps {
  children: ReactNode;
  className?: string;
  variant?: 'cyan' | 'violet' | 'gold' | 'rainbow' | 'white';
  animate?: boolean;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
}

const presets = {
  cyan: {
    gradient: 'linear-gradient(135deg, #00f0ff 0%, #ffffff 50%, #00f0ff 100%)',
    glow: 'rgba(0,240,255,0.6)',
  },
  violet: {
    gradient: 'linear-gradient(135deg, #7c3aed 0%, #c4b5fd 50%, #7c3aed 100%)',
    glow: 'rgba(124,58,237,0.6)',
  },
  gold: {
    gradient: 'linear-gradient(135deg, #f5c518 0%, #fff 50%, #f5c518 100%)',
    glow: 'rgba(245,197,24,0.6)',
  },
  rainbow: {
    gradient: 'linear-gradient(135deg, #00f0ff 0%, #7c3aed 25%, #f5c518 50%, #ff2d55 75%, #00f0ff 100%)',
    glow: 'rgba(0,240,255,0.4)',
  },
  white: {
    gradient: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, #ffffff 50%, rgba(255,255,255,0.7) 100%)',
    glow: 'rgba(255,255,255,0.3)',
  },
};

export function GlowText({
  children,
  className = '',
  variant = 'cyan',
  animate = true,
  tag: Tag = 'span',
}: GlowTextProps) {
  const preset = presets[variant];
  const style: CSSProperties = {
    backgroundImage: preset.gradient,
    backgroundSize: animate ? '200% 200%' : '100% 100%',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    color: 'transparent',
    animation: animate ? 'holoshimmer 4s ease infinite' : 'none',
    filter: `drop-shadow(0 0 20px ${preset.glow})`,
  };

  return (
    <Tag className={className} style={style}>
      {children}
    </Tag>
  );
}

/* Typewriter variant with gradient */
export function GradientBadge({
  children,
  className = '',
  color = 'cyan',
}: {
  children: ReactNode;
  className?: string;
  color?: 'cyan' | 'violet' | 'gold';
}) {
  const colorMap = {
    cyan: { bg: 'rgba(0,240,255,0.08)', border: 'rgba(0,240,255,0.25)', text: '#00f0ff' },
    violet: { bg: 'rgba(124,58,237,0.08)', border: 'rgba(124,58,237,0.25)', text: '#c4b5fd' },
    gold: { bg: 'rgba(245,197,24,0.08)', border: 'rgba(245,197,24,0.25)', text: '#f5c518' },
  };
  const c = colorMap[color];
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-display font-bold tracking-widest uppercase ${className}`}
      style={{
        background: c.bg,
        border: `1px solid ${c.border}`,
        color: c.text,
        boxShadow: `0 0 12px ${c.bg}`,
        backdropFilter: 'blur(8px)',
      }}
    >
      {children}
    </span>
  );
}
