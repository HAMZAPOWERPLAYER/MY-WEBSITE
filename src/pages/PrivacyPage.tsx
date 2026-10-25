import { PageLayout } from '@/components/layout/PageLayout';
import { PageHero } from '@/components/layout/PageHero';
import { Link } from 'wouter';

const SECTIONS = [
  { id: 'intro', label: '1. Introduction' },
  { id: 'collect', label: '2. Information We Collect' },
  { id: 'use', label: '3. How We Use It' },
  { id: 'storage', label: '4. Data Storage & Security' },
  { id: 'third', label: '5. Third-Party Services' },
  { id: 'rights', label: '6. Your Rights' },
  { id: 'cookies', label: '7. Cookies' },
  { id: 'children', label: "8. Children's Privacy" },
  { id: 'changes', label: '9. Changes' },
  { id: 'contact', label: '10. Contact' },
];

export default function PrivacyPage() {
  return (
    <PageLayout
      title="Privacy Policy and Browser Storage | HAMZA POWERPLAYER"
      description="Learn how this portfolio uses browser storage, external fonts, and WhatsApp contact drafts, and what happens when you follow a third-party link."
      path="/privacy"
      schemas={[JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        "url": "https://www.hamzapowerplayer.com/privacy",
        "name": "Privacy Policy — HAMZA POWERPLAYER",
        "breadcrumb": { "@type": "BreadcrumbList", "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.hamzapowerplayer.com/" },
          { "@type": "ListItem", "position": 2, "name": "Privacy Policy", "item": "https://www.hamzapowerplayer.com/privacy" }
        ]}
      })]}
    >
      <PageHero label="LEGAL" title="Privacy Policy" subtitle="How we handle your data" />
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="flex justify-end mb-6">
          <div className="glass-card px-4 py-2 rounded-full font-mono text-xs text-[var(--text-muted)]">Last Updated: June 2026</div>
        </div>

        <div className="flex gap-8">
          {/* TOC sidebar */}
          <aside className="hidden lg:block w-52 shrink-0">
            <div className="glass-card rounded-xl p-4 sticky top-24">
              <div className="font-display text-xs text-[var(--neon-cyan)] tracking-widest mb-3">CONTENTS</div>
              <nav className="space-y-1">
                {SECTIONS.map(s => (
                  <a key={s.id} href={`#${s.id}`}
                    className="block font-accent text-xs text-[var(--text-muted)] hover:text-[var(--neon-cyan)] transition-colors py-1 pl-2 border-l border-transparent hover:border-[var(--neon-cyan)]">
                    {s.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Content */}
          <div className="flex-1 space-y-10 font-accent text-[rgba(240,240,255,0.85)] leading-[1.8]">

            <div id="intro" className="glass-card rounded-2xl p-6" style={{ borderLeft: '3px solid var(--neon-cyan)' }}>
              <h2 className="font-display font-black text-xl text-[var(--neon-cyan)] mb-3">1. Introduction</h2>
              <p>This policy describes the HAMZA POWERPLAYER portfolio website. The site has no account system or server-side contact form. Apps and external services linked here have their own privacy practices.</p>
            </div>

            <div id="collect">
              <h2 className="font-display font-black text-xl mb-4">2. Information I Collect</h2>
              <div className="space-y-4">
                <div className="glass-card rounded-xl p-4">
                  <h3 className="font-display text-sm text-[var(--neon-cyan)] mb-2">a) Information You Provide</h3>
                  <ul className="space-y-1 text-sm text-[var(--text-muted)]">
                    <li>• The contact form creates a message draft and opens WhatsApp; it does not submit or save the draft on this website.</li>
                    <li>• If you choose to send the draft, WhatsApp processes the message under its own privacy policy.</li>
                  </ul>
                </div>
                <div className="glass-card rounded-xl p-4">
                  <h3 className="font-display text-sm text-[var(--neon-cyan)] mb-2">b) Automatically Collected</h3>
                  <ul className="space-y-1 text-sm text-[var(--text-muted)]">
                    <li>• This website does not run analytics code or collect visitor profiles.</li>
                    <li>• Hosting providers may process standard technical request data to deliver the pages.</li>
                    <li>• Google Fonts is requested from Google to display the site typography.</li>
                  </ul>
                </div>
                <div className="rounded-xl p-4" style={{ background: 'rgba(0,255,136,0.06)', border: '1px solid rgba(0,255,136,0.2)' }}>
                  <h3 className="font-display text-sm text-[var(--success)] mb-2">c) What I Do NOT Collect</h3>
                  <ul className="space-y-1 text-sm" style={{ color: 'var(--success)' }}>
                    <li>✓ This website does not store contact-form submissions.</li>
                    <li>✓ This website has no account registration or payment checkout.</li>
                    <li>✓ This website does not include analytics or advertising scripts.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div id="use">
              <h2 className="font-display font-black text-xl mb-3">3. How I Use Your Information</h2>
              <ul className="space-y-2 text-sm text-[var(--text-muted)]">
                {['To create a WhatsApp message draft when you use the contact form', 'To remember the browser-storage notice and interactive site state', 'To load the fonts used by the website'].map(i => (
                  <li key={i} className="flex gap-2"><span className="text-[var(--neon-cyan)]">→</span> {i}</li>
                ))}
              </ul>
            </div>

            <div id="storage">
              <h2 className="font-display font-black text-xl mb-3">4. Data Storage & Security</h2>
              <p className="text-sm text-[var(--text-muted)] mb-4">The website uses browser local or session storage for the notice and interactive features. These values are not submitted to a portfolio backend. When you open WhatsApp, LinkedIn, Google Fonts, or another external service, that provider handles its own data.</p>
            </div>

            <div id="third">
              <h2 className="font-display font-black text-xl mb-3">5. Third-Party Services</h2>
              <div className="glass-card rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ background: 'rgba(0,240,255,0.06)', borderBottom: '1px solid rgba(0,240,255,0.1)' }}>
                      {['Service', 'Purpose', 'Privacy'].map(h => (
                        <th key={h} className="text-left px-4 py-3 font-display text-xs text-[var(--neon-cyan)] tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Google Fonts', 'Website typography', 'https://policies.google.com/privacy'],
                      ['WhatsApp', 'External contact service, if you choose to open it', 'https://www.whatsapp.com/legal/privacy-policy'],
                      ['LinkedIn', 'External profile/contact service', 'https://www.linkedin.com/legal/privacy-policy'],
                    ].map(([s, p, l]) => (
                      <tr key={s} className="border-t border-[rgba(255,255,255,0.05)]">
                        <td className="px-4 py-3 font-mono text-xs text-[var(--text-primary)]">{s}</td>
                        <td className="px-4 py-3 text-xs text-[var(--text-muted)]">{p}</td>
                        <td className="px-4 py-3 text-xs">
                          <a href={l} target="_blank" rel="noopener noreferrer" className="text-[var(--neon-cyan)] hover:underline">Privacy policy</a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div id="rights">
              <h2 className="font-display font-black text-xl mb-3">6. Your Choices</h2>
              <div className="space-y-2">
                {[
                  ['🧹', 'Browser storage', 'Clear local and session data in browser settings'],
                  ['↗️', 'External services', 'Review the provider’s privacy policy'],
                  ['💬', 'Contact', 'Message through WhatsApp or LinkedIn'],
                ].map(([icon, right, desc]) => (
                  <div key={right} className="flex items-center gap-3 glass-card rounded-lg px-4 py-3">
                    <span>{icon}</span>
                    <span className="font-display text-xs text-[var(--neon-cyan)] w-36">{right}</span>
                    <span className="font-accent text-sm text-[var(--text-muted)]">{desc}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs font-mono text-[var(--text-muted)] mt-4">For privacy questions, message via WhatsApp or LinkedIn on the Contact page.</p>
            </div>

            <div id="cookies">
              <h2 className="font-display font-black text-xl mb-3">7. Cookies</h2>
              <p className="text-sm text-[var(--text-muted)]">This website does not set first-party cookies. It uses browser storage for site preferences and interactive features.{' '}<Link href="/cookies" className="text-[var(--neon-cyan)] hover:underline">See the Cookie Policy for details →</Link></p>
            </div>

            <div id="children">
              <h2 className="font-display font-black text-xl mb-3">8. Children's Privacy</h2>
              <p className="text-sm text-[var(--text-muted)]">This portfolio website does not provide account registration or a service directed specifically at children. Apps linked from this site may have separate age and privacy terms.</p>
            </div>

            <div id="changes">
              <h2 className="font-display font-black text-xl mb-3">9. Changes to This Policy</h2>
              <p className="text-sm text-[var(--text-muted)]">This page may be updated when website practices change. Check the page for the current version.</p>
            </div>

            <div id="contact" className="glass-card rounded-2xl p-6">
              <h2 className="font-display font-black text-xl mb-4">10. Contact</h2>
              <div className="space-y-2 text-sm">
                <p className="text-[var(--text-muted)]">Message via WhatsApp or LinkedIn on the <a className="text-[var(--neon-cyan)]" href="/contact">Contact page</a>.</p>
              </div>
            </div>

            <div id="app-policies" className="mt-10">
              <h2 className="font-display font-black text-xl mb-4">App &amp; Game Privacy Policies</h2>
              <p className="text-sm text-[var(--text-muted)] mb-4">
                Privacy policies for HAMZA POWERPLAYER apps and games are hosted here on the official domain.
              </p>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  { name: 'SubSight', desc: 'Subscription tracker for Android', href: '/subsight/privacy-policy' },
                  { name: 'PakiGPA', desc: 'CGPA calculator for Android', href: '/pakigpa/privacy-policy' },
                  { name: 'The Last Bell', desc: 'First-person horror game for Android', href: '/the-last-bell/privacy-policy' },
                ].map((app) => (
                  <a
                    key={app.name}
                    href={app.href}
                    className="glass-card rounded-xl p-4 transition-colors hover:border-[rgba(0,240,255,0.3)]"
                  >
                    <p className="font-display text-sm font-bold text-[var(--text-primary)]">{app.name}</p>
                    <p className="mt-1 text-xs text-[var(--text-muted)]">{app.desc}</p>
                    <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--neon-cyan)]">
                      Privacy Policy →
                    </p>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
