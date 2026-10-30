import { useRef, useState, ReactNode, MouseEvent } from 'react';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  strength?: number;
  disabled?: boolean;
}

export function MagneticButton({
  children,
  className = '',
  onClick,
  variant = 'primary',
  strength = 14,
  disabled = false,
}: MagneticButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (!btnRef.current || disabled) return;
    const rect = btnRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setPos({ x: dx * strength, y: dy * strength });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setPos({ x: 0, y: 0 });
  };

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    const rect = btnRef.current!.getBoundingClientRect();
    const id = Date.now();
    setRipples(prev => [...prev, { x: e.clientX - rect.left, y: e.clientY - rect.top, id }]);
    setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 800);
    onClick?.();
  };

  const base = 'relative overflow-hidden rounded-full font-display font-bold tracking-wider transition-shadow duration-300 cursor-pointer select-none interactive flex items-center justify-center px-8 py-4 text-sm';

  const styles: Record<string, { className: string; boxShadow: string; hoverShadow: string }> = {
    primary: {
      className: 'text-[#04040a]',
      boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
      hoverShadow: '0 0 40px rgba(0,240,255,0.5), 0 8px 32px rgba(0,0,0,0.4)',
    },
    secondary: {
      className: 'text-[var(--text-primary)]',
      boxShadow: '0 2px 16px rgba(0,0,0,0.2)',
      hoverShadow: '0 0 20px rgba(0,240,255,0.2), 0 4px 24px rgba(0,0,0,0.3)',
    },
    ghost: {
      className: 'text-[var(--text-muted)]',
      boxShadow: 'none',
      hoverShadow: '0 0 12px rgba(0,240,255,0.1)',
    },
  };

  const s = styles[variant];

  return (
    <button
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      disabled={disabled}
      className={`${base} ${s.className} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0) scale(${isHovered ? 1.06 : 1})`,
        transition: isHovered ? 'transform 0.12s ease, box-shadow 0.3s ease' : 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease',
        background: variant === 'primary'
          ? `linear-gradient(135deg, #00f0ff 0%, #7c3aed 50%, #00f0ff 100%)`
          : variant === 'secondary'
          ? 'rgba(255,255,255,0.04)'
          : 'transparent',
        backgroundSize: '200% 200%',
        backgroundPosition: isHovered ? '100% 0' : '0% 0',
        border: variant === 'secondary'
          ? '1px solid rgba(0,240,255,0.25)'
          : variant === 'ghost'
          ? '1px solid rgba(255,255,255,0.08)'
          : '1px solid transparent',
        boxShadow: isHovered ? s.hoverShadow : s.boxShadow,
        willChange: 'transform',
      }}
    >
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
      {/* Shimmer on hover */}
      {isHovered && variant === 'primary' && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] animate-[shimmer-slide_0.8s_ease_forwards] pointer-events-none" />
      )}
      <span className="relative z-10">{children}</span>
    </button>
  );
}
