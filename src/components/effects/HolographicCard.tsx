import { ReactNode } from 'react';

export function HolographicCard({ children, className = "" }: { children: ReactNode, className?: string }) {
  return (
    <div className={`relative group overflow-hidden ${className}`}>
      {children}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 holo-shimmer z-10 transition-opacity duration-500 rounded-[inherit]" />
      <div className="absolute inset-[-1px] rounded-[inherit] pointer-events-none z-[-1] opacity-0 group-hover:opacity-30 transition-opacity duration-500 bg-gradient-to-r from-[var(--neon-cyan)] via-[var(--neon-violet)] to-[var(--neon-cyan)]" />
    </div>
  );
}
