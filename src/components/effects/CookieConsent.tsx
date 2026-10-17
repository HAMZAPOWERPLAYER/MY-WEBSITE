import { useState, useEffect } from 'react';
import { Link } from 'wouter';

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (sessionStorage.getItem('hp_storage_notice') !== 'dismissed') setVisible(true);
    }, 2000);
    return () => window.clearTimeout(timer);
  }, []);

  function dismiss() {
    sessionStorage.setItem('hp_storage_notice', 'dismissed');
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9998] px-4 pb-4"
      style={{ animation: 'slide-up 0.4s ease' }}>
      <div className="max-w-4xl mx-auto rounded-2xl px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between"
        style={{ background: 'rgba(8,8,26,0.97)', border: '1px solid rgba(0,240,255,0.2)', backdropFilter: 'blur(20px)', boxShadow: '0 -4px 40px rgba(0,0,0,0.4)' }}>
        <p className="font-accent text-sm text-[var(--text-muted)] flex-1">
          This site does not set first-party cookies or run analytics. It uses browser storage for this notice and interactive features.{' '}
          <Link href="/cookies" className="text-[var(--neon-cyan)] hover:underline">Learn More</Link>
        </p>
        <div className="flex gap-3 shrink-0">
          <button onClick={dismiss}
            className="px-5 py-2 rounded-full font-display text-xs font-bold text-[#04040a] tracking-widest transition-all hover:brightness-110"
            style={{ background: 'linear-gradient(90deg, var(--neon-cyan), var(--neon-violet))' }}>
            DISMISS
          </button>
        </div>
      </div>
    </div>
  );
}
