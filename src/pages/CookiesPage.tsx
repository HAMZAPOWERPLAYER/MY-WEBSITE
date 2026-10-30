import { PageLayout } from '@/components/layout/PageLayout';
import { PageHero } from '@/components/layout/PageHero';

const STORAGE_TABLE = [
  { name: 'hp_storage_notice', purpose: 'Dismiss the browser-storage notice', duration: 'Current tab session', type: 'Session storage' },
  { name: 'konami', purpose: 'Remember an activated site easter egg', duration: 'Until cleared', type: 'Local storage' },
  { name: 'konami-done', purpose: 'Remember an easter-egg state in this tab', duration: 'Current tab session', type: 'Session storage' },
  { name: 'hacker-done', purpose: 'Remember an interactive site state in this tab', duration: 'Current tab session', type: 'Session storage' },
];

export default function CookiesPage() {
  return (
    <PageLayout
      title="Browser Storage and Cookie Policy for HAMZA POWERPLAYER"
      description="See which browser storage this portfolio uses for its notice and interactive features. The website does not set first-party cookies or run analytics."
      path="/cookies"
    >
      <PageHero label="LEGAL" title="Cookie Policy" subtitle="What cookies we use and why" />

      <div className="max-w-3xl mx-auto px-6 py-12 space-y-10 font-accent text-[rgba(240,240,255,0.85)] leading-[1.8]">
        <div className="flex justify-end">
          <div className="glass-card px-4 py-2 rounded-full font-mono text-xs text-[var(--text-muted)]">Last Updated: October 2026</div>
        </div>

        {/* Summary */}
        <div className="glass-card rounded-2xl p-6">
          <h2 className="font-display font-black text-xl text-[var(--neon-cyan)] mb-3">Quick Summary</h2>
          <p className="text-sm text-[var(--text-muted)]">This website does not set first-party cookies or run analytics. It uses local and session storage for a notice and interactive site features.</p>
        </div>

        {/* Cookie table */}
        <div>
          <h2 className="font-display font-black text-xl mb-4">Browser Storage Used</h2>
          <div className="glass-card rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: 'rgba(0,240,255,0.06)', borderBottom: '1px solid rgba(0,240,255,0.1)' }}>
                  {['Storage Key', 'Purpose', 'Duration', 'Storage'].map(h => (
                    <th key={h} className="text-left px-4 py-3 font-display text-[10px] text-[var(--neon-cyan)] tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {STORAGE_TABLE.map(row => (
                  <tr key={row.name} className="border-t border-[rgba(255,255,255,0.05)]">
                    <td className="px-4 py-3 font-mono text-xs text-[var(--text-primary)]">{row.name}</td>
                    <td className="px-4 py-3 text-xs text-[var(--text-muted)]">{row.purpose}</td>
                    <td className="px-4 py-3 font-mono text-xs text-[var(--text-muted)]">{row.duration}</td>
                    <td className="px-4 py-3 font-mono text-xs text-[var(--text-muted)]">{row.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Do NOT use */}
        <div>
          <h2 className="font-display font-black text-xl mb-4">Technologies Not Used by This Site</h2>
          <div className="space-y-2">
            {['First-party cookies', 'Analytics scripts', 'Advertising or tracking pixels', 'Embedded social-media feeds'].map(i => (
              <div key={i} className="flex gap-3 glass-card rounded-lg px-4 py-2.5">
                <span className="text-[var(--danger)]">✗</span>
                <span className="text-sm text-[var(--text-muted)]">{i}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Managing cookies */}
        <div>
          <h2 className="font-display font-black text-xl mb-4">Managing Browser Storage</h2>
          <p className="text-sm text-[var(--text-muted)] mb-4">You can clear this website’s local and session storage in your browser’s site-data settings. Clearing it may reset the notice or interactive page state.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {['Chrome', 'Firefox', 'Safari', 'Edge'].map(b => (
              <div key={b} className="glass-card rounded-xl px-4 py-3 text-center">
                <div className="font-display font-black text-xs text-[var(--neon-cyan)] mb-1">{b}</div>
                <div className="font-accent text-[10px] text-[var(--text-muted)]">Settings → Privacy → Site data</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
