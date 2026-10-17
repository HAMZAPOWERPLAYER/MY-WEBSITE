import { ReactNode } from 'react';

export function AuroraBorder({ children, className = "", active = true }: { children: ReactNode, className?: string, active?: boolean }) {
  if (!active) {
    return (
      <div className={`border border-[var(--border-glow)] ${className}`}>
        {children}
      </div>
    );
  }

  return (
    <div className={`relative p-[1px] rounded-lg overflow-hidden ${className}`}>
      <div 
        className="absolute inset-[-100%] w-[300%] h-[300%] opacity-50 z-0"
        style={{
          background: 'conic-gradient(from 0deg, transparent, #00f0ff, #7c3aed, #f5c518, #ff2d55, #00f0ff, transparent)',
          animation: 'aurora-rotate 4s linear infinite'
        }}
      />
      <div className="relative z-10 w-full h-full bg-[var(--bg-base)] rounded-[calc(0.5rem-1px)]">
        {children}
      </div>
    </div>
  );
}
