import { PageLayout } from '@/components/layout/PageLayout';
import { PageHero } from '@/components/layout/PageHero';
import { Link } from 'wouter';

export default function TermsPage() {
  return (
    <PageLayout
      title="Terms of Service and Website Usage | HAMZA POWERPLAYER"
      description="Terms of service for HAMZA POWERPLAYER apps, portfolio, and freelance services. Read the usage rules, acceptable use, and limitations before using this website."
      path="/terms"
      schemas={[JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        "url": "https://www.hamzapowerplayer.com/terms",
        "name": "Terms of Service — HAMZA POWERPLAYER",
        "breadcrumb": { "@type": "BreadcrumbList", "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.hamzapowerplayer.com/" },
          { "@type": "ListItem", "position": 2, "name": "Terms of Service", "item": "https://www.hamzapowerplayer.com/terms" }
        ]}
      })]}
    >
      <PageHero label="LEGAL" title="Terms of Service" subtitle="Rules of engagement" />
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="flex justify-end mb-6">
          <div className="glass-card px-4 py-2 rounded-full font-mono text-xs text-[var(--text-muted)]">Effective: June 2026</div>
        </div>

        {/* Quick Summary */}
        <div className="rounded-2xl p-6 mb-10" style={{ border: '2px solid rgba(245,197,24,0.3)', background: 'rgba(245,197,24,0.05)' }}>
          <div className="font-display font-black text-sm text-[var(--gold)] tracking-widest mb-1">QUICK SUMMARY</div>
          <p className="font-accent text-xs text-[var(--text-muted)] mb-4">Most people don't read Terms. Here's the SHORT VERSION:</p>
          <ul className="space-y-2 font-accent text-sm">
            {['Use my apps and website fairly', "Don't steal my code or brand", "Don't use my tools for harmful purposes", "I build with care but can't guarantee perfection", "Contact me if anything is wrong — I'll fix it"].map(i => (
              <li key={i} className="flex gap-2" style={{ color: 'var(--gold)' }}><span>✓</span><span>{i}</span></li>
            ))}
          </ul>
          <p className="font-mono text-xs text-[var(--text-muted)] mt-4">[ Read Full Terms Below ↓ ]</p>
        </div>

        <div className="space-y-8 font-accent text-[rgba(240,240,255,0.85)] leading-[1.8]">
          {[
            {
              num: '1', title: 'Acceptance of Terms',
              content: 'By accessing or using any HAMZA POWERPLAYER website, app, or service, you agree to these terms.'
            },
          ].map(s => (
            <section key={s.num}>
              <h2 className="font-display font-black text-xl mb-3">{s.num}. {s.title}</h2>
              <p className="text-sm text-[var(--text-muted)]">{s.content}</p>
            </section>
          ))}

          <section>
            <h2 className="font-display font-black text-xl mb-3">2. Use of Services</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="glass-card rounded-xl p-4">
                <div className="font-display text-xs text-[var(--success)] tracking-widest mb-2">PERMITTED</div>
                {['Personal, non-commercial use of apps', 'Sharing links to my content', 'Referencing my work with credit'].map(i => (
                  <div key={i} className="flex gap-2 text-sm text-[var(--text-muted)] mb-1"><span className="text-[var(--success)]">✓</span>{i}</div>
                ))}
              </div>
              <div className="glass-card rounded-xl p-4">
                <div className="font-display text-xs text-[var(--danger)] tracking-widest mb-2">PROHIBITED</div>
                {['Reverse engineering my apps', 'Distributing modified versions without permission', 'Using my tools to harm others', 'Impersonating HAMZA POWERPLAYER'].map(i => (
                  <div key={i} className="flex gap-2 text-sm text-[var(--text-muted)] mb-1"><span className="text-[var(--danger)]">✗</span>{i}</div>
                ))}
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-display font-black text-xl mb-3">3. Intellectual Property</h2>
            <p className="text-sm text-[var(--text-muted)]">All content, code, designs, logos, and brand elements on this website and in my apps are owned by Hamza (HAMZA POWERPLAYER) unless stated otherwise. The HP monogram, HAMZA POWERPLAYER name, and associated visual identity are my intellectual property.</p>
          </section>

          <section>
            <h2 className="font-display font-black text-xl mb-3">4. App-Specific Terms</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { type: 'FREE APPS', color: 'var(--neon-cyan)', text: 'Use freely. Attribution appreciated.' },
                { type: 'PAID APPS', color: 'var(--gold)', text: 'License for personal use only.' },
                { type: 'AI FEATURES', color: 'var(--neon-violet)', text: 'Subject to AI provider terms.' },
              ].map(a => (
                <div key={a.type} className="glass-card rounded-xl p-4">
                  <div className="font-display text-xs tracking-widest mb-2" style={{ color: a.color }}>{a.type}</div>
                  <p className="text-xs text-[var(--text-muted)]">{a.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-display font-black text-xl mb-3">5. Disclaimer of Warranties</h2>
            <p className="text-sm text-[var(--text-muted)]">My apps and services are provided AS IS. While I build with the highest quality standards, I cannot guarantee error-free, uninterrupted service at all times.</p>
          </section>

          <section>
            <h2 className="font-display font-black text-xl mb-3">6. Limitation of Liability</h2>
            <p className="text-sm text-[var(--text-muted)]">HAMZA POWERPLAYER shall not be liable for indirect, incidental, or consequential damages from use of services.</p>
          </section>

          <section>
            <h2 className="font-display font-black text-xl mb-3">7. Privacy</h2>
            <p className="text-sm text-[var(--text-muted)]">Your use of services is also governed by my <Link href="/privacy" className="text-[var(--neon-cyan)] hover:underline">Privacy Policy →</Link></p>
          </section>

          <section>
            <h2 className="font-display font-black text-xl mb-3">8. Changes to Terms</h2>
            <p className="text-sm text-[var(--text-muted)]">I reserve the right to update these terms. Changes will be posted here with a new effective date.</p>
          </section>

          <section>
            <h2 className="font-display font-black text-xl mb-3">9. Governing Law</h2>
            <p className="text-sm text-[var(--text-muted)]">These terms are governed by the laws of Pakistan. Disputes will be resolved through mutual agreement first.</p>
          </section>

          <section className="glass-card rounded-2xl p-6">
            <h2 className="font-display font-black text-xl mb-3">10. Contact</h2>
            <p className="text-sm text-[var(--text-muted)]">For terms questions, message via <a className="text-[var(--neon-cyan)]" href="https://wa.me/923129584661">WhatsApp</a> or <a className="text-[var(--neon-cyan)]" href="https://www.linkedin.com/in/hamzapowerplayerofficial">LinkedIn</a>.</p>
          </section>
        </div>
      </div>
    </PageLayout>
  );
}
