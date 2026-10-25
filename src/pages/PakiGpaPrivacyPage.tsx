import { PageLayout } from '@/components/layout/PageLayout';

export default function PakiGpaPrivacyPage() {
  return (
    <PageLayout
      title="Privacy Policy — PakiGPA"
      description="Privacy Policy for PakiGPA, an offline CGPA calculator for Android by HAMZA POWERPLAYER."
      path="/pakigpa/privacy-policy"
    >
      <article className="mx-auto max-w-3xl px-6 py-16">
        <header className="mb-10">
          <p className="hp-eyebrow">Privacy Policy</p>
          <h1 className="hp-h2 mt-4 text-[var(--text-primary)]">PakiGPA</h1>
          <p className="mt-2 font-mono text-sm text-[var(--text-muted)]">CGPA Calculator · com.hamzapowerplayer.pakigpa</p>
        </header>

        <div className="rounded-2xl border border-[rgba(0,240,255,0.2)] bg-[rgba(0,240,255,0.06)] p-6 font-semibold text-[var(--text-primary)]">
          The short version: PakiGPA does not collect, transmit, or store any personal data on external servers. There are no servers. Everything you enter stays on your device. The app works fully offline.
        </div>

        <div className="mt-10 space-y-8 text-[var(--text-muted)] leading-relaxed">
          <section>
            <h2 className="font-display text-xl font-bold text-[var(--text-primary)]">1. Who we are</h2>
            <p>PakiGPA ("the App") is an offline CGPA/GPA calculator for students, developed and maintained by HAMZA POWERPLAYER ("we", "us", "our"). This policy explains exactly what the App does — and does not do — with your information.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-[var(--text-primary)]">2. Data collection</h2>
            <p>The App collects <strong className="text-[var(--text-primary)]">no personal information</strong>. Specifically:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong className="text-[var(--text-primary)]">Academic data</strong> (semesters, courses, grades, credit hours) is entered by you and stored <strong className="text-[var(--text-primary)]">only on your device</strong>, in the App's local database. It never leaves your device unless you explicitly export or share it yourself (for example, exporting a transcript PDF or a JSON backup and sending it somewhere).</li>
              <li><strong className="text-[var(--text-primary)]">Settings</strong> (theme, haptics, selected grading scale) are stored locally on your device.</li>
              <li>We do <strong className="text-[var(--text-primary)]">not</strong> collect your name, email address, phone number, contacts, location, device identifiers, or usage statistics.</li>
              <li>The App has <strong className="text-[var(--text-primary)]">no login, no user accounts, and no email collection</strong>.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-[var(--text-primary)]">3. No analytics, no trackers</h2>
            <p>PakiGPA integrates <strong className="text-[var(--text-primary)]">no analytics SDKs, no crash-reporting SDKs, no advertising SDKs, and no third-party tracking</strong>. Nothing about your usage is measured, recorded, or transmitted. If a future update ever introduces anonymous crash or usage analytics, this policy will be updated <strong className="text-[var(--text-primary)]">before</strong> that update ships, the exact SDK will be disclosed here, and where technically possible an opt-out will be provided.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-[var(--text-primary)]">4. Advertising</h2>
            <p>PakiGPA contains <strong className="text-[var(--text-primary)]">no advertisements</strong>. If ads are ever introduced in a future version, this policy will be updated first to disclose the ad network, and that network's own privacy policy would then apply to the data it collects. You would be informed in-app before any such change takes effect.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-[var(--text-primary)]">5. Permissions</h2>
            <p>PakiGPA requests <strong className="text-[var(--text-primary)]">no runtime permissions</strong>. Backup/restore uses your device's standard file picker, and exports are shared through your device's own share sheet — both are system components you control. The App never requests access to your contacts, camera, microphone, location, or phone state.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-[var(--text-primary)]">6. Data storage &amp; security</h2>
            <p>All data is stored in the App's private local storage on your device, which is sandboxed by the operating system and inaccessible to other apps. Because there is no server, there is no account breach risk, no data breach of ours, and no transmission to intercept.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-[var(--text-primary)]">7. Data deletion</h2>
            <p>Because all data is local:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong className="text-[var(--text-primary)]">Uninstalling the App permanently deletes all of your data.</strong> There is no server copy and no way for us to recover it.</li>
              <li>The App also provides an in-app <strong className="text-[var(--text-primary)]">"Clear All Data"</strong> option in Settings that immediately erases every record from local storage.</li>
              <li>You can export your data as a JSON backup at any time if you want a copy before deleting.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-[var(--text-primary)]">8. Children's privacy</h2>
            <p>The App is not directed at children under 13, and we do not knowingly collect any personal information from anyone — including children under 13. Since the App collects no personal information at all, none is collected from children.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-[var(--text-primary)]">9. Third-party services</h2>
            <p>The App does not embed third-party services that receive your data. Two system-level actions are user-initiated: opening the Play Store listing (Rate) and using the share sheet (Share). Those are handled by your device's own components, governed by their respective policies.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-[var(--text-primary)]">10. Changes to this policy</h2>
            <p>We may update this Privacy Policy from time to time. Updates will be communicated through an in-app notice, and the effective date below will be revised. The policy in effect for a given App version governs that version's behavior.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-[var(--text-primary)]">11. Contact</h2>
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <p>For any privacy questions or concerns, contact:</p>
              <p className="font-semibold text-[var(--text-primary)] mt-2">
                HAMZA<br />
                Email: <a className="text-[var(--neon-cyan)]" href="mailto:hamzapowerplayer.global@gmail.com">hamzapowerplayer.global@gmail.com</a><br />
                Phone: +92 312 9584661
              </p>
            </div>
          </section>
        </div>

        <p className="mt-12 font-mono text-xs text-[var(--text-muted)]">
          Effective date: 28 August 2026 · PakiGPA v1.1.0 · © HAMZA POWERPLAYER
        </p>
      </article>
    </PageLayout>
  );
}