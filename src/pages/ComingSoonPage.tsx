import { Link } from 'wouter';
import { ArrowLeft, Gamepad2 } from 'lucide-react';
import AuroraEngine from '@/components/effects/AuroraEngine';

export default function ComingSoonPage() {
  return (
    <div className="bg-[var(--bg-base)] flex min-h-screen flex-col items-center justify-center relative overflow-hidden px-6">
      <AuroraEngine />
      <div className="noise-overlay" />

      <div className="relative z-10 w-full max-w-2xl text-center">
        <div className="mb-10 flex justify-center">
          <div className="relative flex h-24 w-24 items-center justify-center">
            <div className="absolute inset-0 rounded-full" style={{ border: '1px solid rgba(0,240,255,0.15)', animation: 'spin-orbit 20s linear infinite' }} />
            <div className="absolute rounded-full" style={{ inset: 8, border: '1px solid rgba(124,58,237,0.2)', animation: 'spin-orbit 12s linear infinite reverse' }} />
            <div className="flex h-14 w-14 items-center justify-center rounded-full font-display text-2xl font-black text-[var(--neon-cyan)]"
              style={{ border: '2px solid var(--neon-cyan)', boxShadow: '0 0 30px rgba(0,240,255,0.4)', animation: 'ai-pulse 3s ease-in-out infinite' }}>
              HP
            </div>
          </div>
        </div>

        <div className="mb-4 font-accent text-xs font-bold uppercase tracking-[6px] text-[var(--neon-cyan)]">
          [ IN DEVELOPMENT ]
        </div>
        <h1 className="holo-text mb-4 font-display font-black" style={{ fontSize: 'clamp(2rem, 8vw, 4rem)' }}>
          MORE IS ON THE WAY
        </h1>
        <p className="mx-auto mb-10 max-w-md font-accent text-[var(--text-muted)]">
          This page is a placeholder. It previously showed a countdown, a fake waiting count, and a notification form
          that did not send anything. Those have been removed. No release date or waitlist exists yet.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/games"
            className="inline-flex items-center gap-2 rounded-xl border border-[rgba(0,240,255,0.25)] px-5 py-3 font-display text-xs font-bold tracking-wider text-[var(--neon-cyan)]"
          >
            <Gamepad2 size={14} /> View games in development
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-5 py-3 font-display text-xs font-bold tracking-wider text-[var(--text-primary)]"
          >
            <ArrowLeft size={14} /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
