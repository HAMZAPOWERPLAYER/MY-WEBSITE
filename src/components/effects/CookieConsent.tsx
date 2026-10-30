import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { Info } from 'lucide-react';

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        if (sessionStorage.getItem('hp_storage_notice') !== 'dismissed') setVisible(true);
      } catch {
        setVisible(true);
      }
    }, 1200);
    return () => window.clearTimeout(timer);
  }, []);

  function dismiss() {
    try {
      sessionStorage.setItem('hp_storage_notice', 'dismissed');
    } catch {
      // Storage can be unavailable in strict privacy modes; dismissing still works.
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <aside
      className="fixed inset-x-3 bottom-3 z-40 sm:inset-x-auto sm:bottom-5 sm:left-5 sm:w-[340px]"
      style={{ animation: 'slide-up 0.35s ease' }}
    >
      <div className="flex items-center gap-3 rounded-xl border border-white/12 bg-[#0a0a18] px-3.5 py-3 shadow-[0_18px_50px_rgba(0,0,0,0.55)]">
        <Info size={14} aria-hidden="true" className="shrink-0 text-[var(--neon-cyan)]" />
        <p className="min-w-0 flex-1 text-[11px] leading-snug text-[var(--text-muted)]">
          No tracking cookies.{' '}
          <Link
            href="/cookies"
            className="text-[var(--text-primary)] underline decoration-white/25 underline-offset-2 transition-colors hover:text-[var(--neon-cyan)]"
          >
            Details
          </Link>
        </p>
        <button
          type="button"
          onClick={dismiss}
          className="shrink-0 rounded-lg border border-white/12 bg-white/[0.04] px-2.5 py-1.5 font-display text-[9px] font-bold tracking-[0.12em] text-[var(--text-primary)] transition-colors hover:border-[rgba(0,240,255,0.3)] hover:text-[var(--neon-cyan)]"
        >
          GOT IT
        </button>
      </div>
    </aside>
  );
}
