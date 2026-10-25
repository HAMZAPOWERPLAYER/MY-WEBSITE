import { PageLayout } from '@/components/layout/PageLayout';

export default function SubsightPrivacyPage() {
  return (
    <PageLayout
      title="Privacy Policy — SubSight"
      description="Privacy Policy for SubSight, an offline subscription tracker for Android by HAMZA POWERPLAYER."
      path="/subsight/privacy-policy"
    >
      <article className="mx-auto max-w-3xl px-6 py-16">
        <header className="mb-10">
          <p className="hp-eyebrow">Privacy Policy</p>
          <h1 className="hp-h2 mt-4 text-[var(--text-primary)]">SubSight</h1>
          <p className="mt-2 font-mono text-sm text-[var(--text-muted)]">Offline subscription tracker · Android</p>
          <p className="mt-4 font-mono text-xs text-[var(--text-muted)]">
            <strong className="text-[var(--text-primary)]">Last updated:</strong> April 12, 2026
          </p>
        </header>

        <div className="space-y-8 text-[var(--text-muted)] leading-relaxed">
          <section>
            <h2 className="font-display text-xl font-bold text-[var(--text-primary)]">1. Overview</h2>
            <p>Subsight ("we", "our", or "the app") is committed to protecting your privacy. This Privacy Policy explains how your information is collected, used, and safeguarded.</p>
            <p>Subsight is a local-only subscription tracker. All data is stored exclusively on your device using AsyncStorage and is never transmitted to our servers or any third party.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-[var(--text-primary)]">2. Information We Collect</h2>
            <p>We do not collect any personal data. All subscription information you enter is stored only on your device.</p>
            <p>We do not collect:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Your name, email, or contact details</li>
              <li>Payment card or bank information</li>
              <li>Location data</li>
              <li>Usage analytics or crash reports</li>
              <li>Any data transmitted over the internet</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-[var(--text-primary)]">3. Data Storage</h2>
            <p>All app data is stored locally on your device via AsyncStorage. Uninstalling the app will permanently delete all your data. We have no ability to recover it as we never receive or store it.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-[var(--text-primary)]">4. Third-Party Services</h2>
            <p>Subsight does not integrate with any third-party analytics, advertising, or tracking services. No data leaves your device.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-[var(--text-primary)]">5. Children's Privacy</h2>
            <p>Subsight is not directed at children under 13. We do not knowingly collect information from children.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-[var(--text-primary)]">6. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. Changes are reflected with an updated "Last updated" date. Continued use of the app constitutes acceptance of the revised policy.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-[var(--text-primary)]">7. Contact Us</h2>
            <p>If you have questions about this Privacy Policy:</p>
            <p>Email: sartarkhan09876@gmail.com</p>
            <p>Phone: +923129584661</p>
          </section>
        </div>

        <p className="mt-12 font-mono text-xs text-[var(--text-muted)]">
          © HAMZA POWERPLAYER. SubSight Privacy Policy.
        </p>
      </article>
    </PageLayout>
  );
}