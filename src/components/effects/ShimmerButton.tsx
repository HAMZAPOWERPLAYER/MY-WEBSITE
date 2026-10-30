import { ReactNode, useRef, MouseEvent, useState } from 'react';

interface ShimmerButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'gold' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  href?: string;
}

const sizes = {
  sm: 'px-5 py-2.5 text-xs',
  md: 'px-8 py-4 text-sm',
  lg: 'px-10 py-5 text-base',
};

const variants = {
  primary: {
    base: 'bg-gradient-to-r from-[#00f0ff] via-[#7c3aed] to-[#00f0ff] text-[#04040a]',
    shimmer: 'rgba(255,255,255,0.4)',
    shadow: '0 0 40px rgba(0,240,255,0.5), 0 8px 32px rgba(0,0,0,0.4)',
    border: 'transparent',
  },
  secondary: {
    base: 'bg-transparent text-[#f0f0ff]',
    shimmer: 'rgba(0,240,255,0.2)',
    shadow: '0 0 20px rgba(0,240,255,0.2)',
    border: 'rgba(0,240,255,0.3)',
  },
  gold: {
    base: 'bg-gradient-to-r from-[#f5c518] via-[#fff] to-[#f5c518] text-[#04040a]',
    shimmer: 'rgba(255,255,255,0.5)',
    shadow: '0 0 40px rgba(245,197,24,0.4)',
    border: 'transparent',
  },
  ghost: {
    base: 'bg-[rgba(255,255,255,0.04)] text-[#f0f0ff]',
    shimmer: 'rgba(255,255,255,0.1)',
    shadow: '0 4px 16px rgba(0,0,0,0.3)',
    border: 'rgba(255,255,255,0.1)',
  },
};

export function ShimmerButton({
  children,
  onClick,
  className = '',
  variant = 'primary',
  size = 'md',
  disabled = false,
  href,
}: ShimmerButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);
  const [shimmerPos, setShimmerPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const v = variants[variant];

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    setShimmerPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (!btnRef.current || disabled) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples(prev => [...prev, { x, y, id }]);
    setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 800);
    onClick?.();
  };

  const Tag = href ? 'a' : 'button';

  return (
    <button
      ref={btnRef}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setShimmerPos({ x: -100, y: -100 }); }}
      disabled={disabled}
      className={`
        relative overflow-hidden rounded-full font-display font-bold tracking-wider
        transition-all duration-300 cursor-pointer select-none interactive
        ${sizes[size]} ${v.base} ${className}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      `}
      style={{
        border: `1px solid ${v.border}`,
        boxShadow: isHovered && !disabled ? v.shadow : '0 4px 16px rgba(0,0,0,0.3)',
        backgroundSize: '200% 100%',
        backgroundPosition: isHovered ? '100% 0' : '0% 0',
        transform: isHovered && !disabled ? 'scale(1.04) translateY(-1px)' : 'scale(1) translateY(0)',
      }}
    >
      {/* Shimmer effect */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background: `radial-gradient(200px circle at ${shimmerPos.x}px ${shimmerPos.y}px, ${v.shimmer}, transparent 80%)`,
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.2s ease',
        }}
      />
      {/* Ripples */}
      {ripples.map(r => (
        <span
          key={r.id}
          className="pointer-events-none absolute rounded-full bg-white/20"
          style={{
            left: r.x - 50,
            top: r.y - 50,
            width: 100,
            height: 100,
            animation: 'ripple-expand 0.8s ease-out forwards',
          }}
        />
      ))}
      <span className="relative z-20 flex items-center gap-2">{children}</span>
    </button>
  );
}
