import { Link } from 'wouter';

interface Props {
  label: string;
  title: string;
  subtitle: string;
  breadcrumb?: string;
}

export function PageHero({ label, title, subtitle, breadcrumb }: Props) {
  return (
    <div className="relative flex flex-col items-center justify-center text-center px-6 overflow-hidden"
      style={{ minHeight: 300, paddingTop: 56, paddingBottom: 48 }}>

      {/* Deep atmospheric background */}
      <div className="absolute inset-0 pointer-events-none">
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(0,240,255,0.12) 0%, rgba(124,58,237,0.06) 40%, transparent 70%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(0,0,0,0.6) 0%, transparent 70%)',
        }} />
        <div className="grid-overlay" style={{ opacity: 0.15 }} />
        {/* Horizontal scan line accent */}
        <div style={{
          position: 'absolute', left: '10%', right: '10%', top: '50%',
          height: 1, background: 'linear-gradient(90deg, transparent, rgba(0,240,255,0.15), rgba(124,58,237,0.15), transparent)',
        }} />
      </div>

      <div className="relative z-10">
        {/* Label */}
        <div style={{ animation: 'fadeIn 0.5s ease both', opacity: 0, animationFillMode: 'forwards' }}>
          <span className="inline-block font-mono text-xs font-bold tracking-[8px] uppercase mb-5 px-4 py-1.5 rounded-full"
            style={{
              color: 'var(--neon-cyan)',
              background: 'rgba(0,240,255,0.06)',
              border: '1px solid rgba(0,240,255,0.2)',
              letterSpacing: '0.4em',
            }}>
            {label}
          </span>
        </div>

        {/* Title */}
        <div style={{ animation: 'slideDown 0.55s 0.1s ease both', opacity: 0, animationFillMode: 'forwards' }}>
          <h1 className="font-display font-black text-[var(--text-primary)] mb-4"
            style={{
              fontSize: 'clamp(2rem, 5.5vw, 3.8rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
              textShadow: '0 0 40px rgba(0,240,255,0.45), 0 0 80px rgba(0,240,255,0.2)',
            }}>
            {title}
          </h1>
        </div>

        {/* Subtitle */}
        <div style={{ animation: 'fadeIn 0.5s 0.25s ease both', opacity: 0, animationFillMode: 'forwards' }}>
          <p className="font-accent text-[var(--text-muted)] text-lg mb-6 max-w-lg mx-auto" style={{ lineHeight: 1.6 }}>
            {subtitle}
          </p>
        </div>

        {/* Breadcrumb */}
        <div style={{ animation: 'fadeIn 0.4s 0.35s ease both', opacity: 0, animationFillMode: 'forwards' }}>
          <div className="flex items-center gap-2 justify-center font-mono text-xs opacity-50"
            style={{ color: 'var(--text-muted)' }}>
            <Link href="/" className="hover:text-[var(--neon-cyan)] hover:opacity-100 transition-colors">Home</Link>
            <span style={{ color: 'rgba(0,240,255,0.4)' }}>›</span>
            <span>{breadcrumb || title}</span>
          </div>
        </div>
      </div>

      {/* Bottom gradient divider */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px]"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(0,240,255,0.35), rgba(124,58,237,0.25), transparent)' }} />

      {/* Bottom vignette fade into content */}
      <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(4,4,10,0.3))' }} />
    </div>
  );
}
