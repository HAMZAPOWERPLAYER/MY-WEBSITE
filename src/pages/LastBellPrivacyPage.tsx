import { PageLayout } from '@/components/layout/PageLayout';

export default function LastBellPrivacyPage() {
  return (
    <PageLayout
      title="Privacy Policy — The Last Bell"
      description="Privacy Policy for The Last Bell, an offline first-person horror game for Android by HAMZA POWERPLAYER."
      path="/the-last-bell/privacy-policy"
    >
      <article className="mx-auto max-w-4xl px-6 py-16">
        <header className="mb-10">
          <p className="hp-eyebrow">Privacy Policy</p>
          <h1 className="hp-h2 mt-4 text-[var(--text-primary)]">The Last Bell</h1>
          <p className="mt-2 font-mono text-sm text-[var(--text-muted)]">An offline first-person horror game for Android</p>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-1 font-mono text-xs text-[var(--text-muted)]">
            <li>Version 1.0</li>
            <li>Effective 30 September 2026</li>
            <li>Package: com.hamzapowerplayer.lastbell</li>
          </ul>
          <p className="mt-4 text-[var(--text-muted)]">
            An offline first-person horror game for Android. This policy explains what the game does with your information. Short version: it doesn't collect any.
          </p>
        </header>

        <div className="rounded-2xl border border-[rgba(0,240,255,0.2)] bg-[rgba(0,240,255,0.06)] p-6">
          <h2 className="font-display text-xl font-bold text-[var(--text-primary)] mb-3">1. Summary</h2>
          <ul className="list-disc pl-6 space-y-1 text-[var(--text-muted)]">
            <li><strong className="text-[var(--text-primary)]">No account.</strong> You never sign in, register, or give an email address.</li>
            <li><strong className="text-[var(--text-primary)]">No ads.</strong> The game contains no advertising code and shows no ads.</li>
            <li><strong className="text-[var(--text-primary)]">No tracking.</strong> No analytics, no profiling, no advertising ID.</li>
            <li><strong className="text-[var(--text-primary)]">Offline.</strong> The game runs entirely on your phone and does not send data to us or anyone else.</li>
            <li><strong className="text-[var(--text-primary)]">Only settings are saved,</strong> and they stay on your device.</li>
          </ul>
        </div>

        <div className="mt-10 space-y-10 text-[var(--text-muted)] leading-relaxed">
          <section id="s2">
            <h2 className="font-display text-xl font-bold text-[var(--text-primary)]">2. Who we are</h2>
            <p>The Last Bell is published by <strong className="text-[var(--text-primary)]">HAMZA POWERPLAYER SMC-PRIVATE LIMITED</strong>, a company registered in Pakistan ("we", "us", "our"). We are the developer of the game and the only party responsible for this policy. Our website is <a className="text-[var(--neon-cyan)]" href="https://hamzapowerplayer.com">hamzapowerplayer.com</a>.</p>
            <p>This policy applies only to The Last Bell for Android. Other apps and games from us have their own policies.</p>
          </section>

          <section id="s3">
            <h2 className="font-display text-xl font-bold text-[var(--text-primary)]">3. What stays on your device</h2>
            <p>The game saves a small amount of information locally so it can remember how you like to play. This information is stored in the game's private storage on your phone. We cannot see it, and it is never uploaded.</p>
            <div className="overflow-x-auto rounded-2xl border border-white/10">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.03]">
                    <th className="px-4 py-3 text-left font-display text-xs tracking-wider text-[var(--neon-cyan)]">Information</th>
                    <th className="px-4 py-3 text-left font-display text-xs tracking-wider text-[var(--neon-cyan)]">Purpose</th>
                    <th className="px-4 py-3 text-left font-display text-xs tracking-wider text-[var(--neon-cyan)]">Where it lives</th>
                    <th className="px-4 py-3 text-left font-display text-xs tracking-wider text-[var(--neon-cyan)]">Sent to us?</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/[0.06]">
                    <td className="px-4 py-3">Look sensitivity</td>
                    <td className="px-4 py-3">Keeps your camera speed between sessions</td>
                    <td className="px-4 py-3">On your device only</td>
                    <td className="px-4 py-3 font-semibold text-[var(--success)]">No</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="px-4 py-3">Volume levels (master, ambient, effects)</td>
                    <td className="px-4 py-3">Keeps your audio mix</td>
                    <td className="px-4 py-3">On your device only</td>
                    <td className="px-4 py-3 font-semibold text-[var(--success)]">No</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">Graphics quality choice</td>
                    <td className="px-4 py-3">Keeps the performance setting that suits your phone</td>
                    <td className="px-4 py-3">On your device only</td>
                    <td className="px-4 py-3 font-semibold text-[var(--success)]">No</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>None of these settings identify you. Progress inside a single playthrough (keys found, notes read) exists only while the game is running.</p>
          </section>

          <section id="s4">
            <h2 className="font-display text-xl font-bold text-[var(--text-primary)]">4. What we do not collect</h2>
            <p>We do not collect, store, or receive any of the following through the game:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Your name, email address, phone number, or postal address</li>
              <li>Account details or passwords (there are no accounts)</li>
              <li>Precise or approximate location</li>
              <li>Contacts, photos, files, calendar, microphone, or camera data</li>
              <li>Advertising ID, device ID, or IP address</li>
              <li>Gameplay analytics, crash reports, or usage statistics</li>
              <li>Payment information (the game is free and has no purchases)</li>
            </ul>
          </section>

          <section id="s5">
            <h2 className="font-display text-xl font-bold text-[var(--text-primary)]">5. Permissions</h2>
            <p>The game does not request any sensitive Android permissions. It does not ask to use your camera, microphone, contacts, location, storage, or notifications. Touch input, audio playback, and screen display are part of normal app operation and need no permission prompt.</p>
          </section>

          <section id="s6">
            <h2 className="font-display text-xl font-bold text-[var(--text-primary)]">6. How information is used</h2>
            <p>The only information the game keeps (your settings in section 3) is used for one purpose: applying your preferences the next time you play. It is not used for advertising, profiling, research, or any other purpose, and it is never combined with other data.</p>
          </section>

          <section id="s7">
            <h2 className="font-display text-xl font-bold text-[var(--text-primary)]">7. Sharing and third parties</h2>
            <p>We do not sell, rent, trade, or share personal information, because we do not hold any.</p>
            <h3 className="font-display text-base font-bold text-[var(--text-primary)] mt-4">Google Play</h3>
            <p>You download the game through Google Play. Google handles your account, download, and payment relationship with you under <a className="text-[var(--neon-cyan)]" href="https://policies.google.com/privacy" rel="noopener noreferrer">Google's Privacy Policy</a>. Google may give us aggregated, non-identifying statistics about installs and app stability through the Play Console. We cannot use these to identify you.</p>
            <h3 className="font-display text-base font-bold text-[var(--text-primary)] mt-4">Game engine and components</h3>
            <p>The game is built with the Unity engine and a small number of open-source components (section 15). We have not enabled Unity Analytics, Unity Ads, in-app purchasing, or any cloud service, and the components we use do not contact any server.</p>
          </section>

          <section id="s8">
            <h2 className="font-display text-xl font-bold text-[var(--text-primary)]">8. Ads and analytics</h2>
            <p>The Last Bell contains no advertising SDKs, no analytics SDKs, and no tracking technologies such as cookies, pixels, or fingerprinting. The game is supported by voluntary donations to the developer outside the game, and there are no in-game prompts asking for money.</p>
          </section>

          <section id="s9">
            <h2 className="font-display text-xl font-bold text-[var(--text-primary)]">9. Retention and deletion</h2>
            <p>Your settings remain on your phone until you delete them. You can remove them at any time:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Uninstall the game, which deletes all of its stored data, or</li>
              <li>Open Android Settings, then Apps, then The Last Bell, then Storage, and choose <em>Clear data</em>.</li>
            </ul>
            <p>Because we hold no copy of your data, there is nothing for us to delete on our side.</p>
          </section>

          <section id="s10">
            <h2 className="font-display text-xl font-bold text-[var(--text-primary)]">10. Security</h2>
            <p>The strongest protection is that the game collects and transmits nothing. Your settings are kept in the app's private storage, which Android protects from other apps. No system is perfectly secure, but the absence of a network connection and a user database removes the most common risks: interception in transit and server breaches.</p>
          </section>

          <section id="s11">
            <h2 className="font-display text-xl font-bold text-[var(--text-primary)]">11. Children</h2>
            <p>The Last Bell contains horror themes and is not directed at children under 13 (or the higher minimum age in your country). We do not knowingly collect personal information from anyone, including children. If you are a parent or guardian and believe a child has provided us information, contact us (section 17) and we will act on it promptly.</p>
          </section>

          <section id="s12">
            <h2 className="font-display text-xl font-bold text-[var(--text-primary)]">12. Your rights</h2>
            <p>Depending on where you live, laws such as the EU and UK GDPR, the California Consumer Privacy Act, and Pakistan's applicable data protection rules may give you rights to access, correct, delete, restrict, or port your personal data, to object to its processing, and to opt out of its sale or sharing.</p>
            <p>We do not collect personal data through the game, so we hold nothing to access, correct, or delete, and we do not sell or share personal data. You can still contact us to ask a question or confirm this, and we will reply. If you are in a region with a data protection authority and you are unhappy with our reply, you have the right to complain to that authority.</p>
          </section>

          <section id="s13">
            <h2 className="font-display text-xl font-bold text-[var(--text-primary)]">13. International use</h2>
            <p>We are based in Pakistan and the game is distributed worldwide. Because no personal data leaves your device, no cross-border data transfer takes place through the game.</p>
          </section>

          <section id="s14">
            <h2 className="font-display text-xl font-bold text-[var(--text-primary)]">14. Content and age notice</h2>
            <p>The game includes frightening imagery, jump scares, loud sudden sounds, and flickering lights. It may not be suitable for people who are sensitive to these, including people with photosensitive epilepsy. Play in a comfortable environment and stop if you feel unwell.</p>
          </section>

          <section id="s15">
            <h2 className="font-display text-xl font-bold text-[var(--text-primary)]">15. Open-source credits</h2>
            <p>The game builds on the work of others, used under their licenses:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong className="text-[var(--text-primary)]">High School Horror Android</strong> by yurifarion, the original project this game is adapted from, licensed under <a className="text-[var(--neon-cyan)]" href="https://creativecommons.org/licenses/by/4.0/" rel="noopener noreferrer">CC BY 4.0</a>. Source: <a className="text-[var(--neon-cyan)]" href="https://github.com/yurifarion/High-School-Horror-Android-Unity3D" rel="noopener noreferrer">github.com/yurifarion/High-School-Horror-Android-Unity3D</a>. Changes were made, including new touch controls, bug fixes, lighting, audio, and menus.</li>
              <li><strong className="text-[var(--text-primary)]">NeKONTROLLER</strong> by NeKoRoSYS, on-screen touch controls, licensed under the MIT License. Source: <a className="text-[var(--neon-cyan)]" href="https://github.com/NeKoRoSYS/NeKONTROLLER" rel="noopener noreferrer">github.com/NeKoRoSYS/NeKONTROLLER</a>.</li>
            </ul>
            <p>These credits also appear on the Credits screen inside the game.</p>
          </section>

          <section id="s16">
            <h2 className="font-display text-xl font-bold text-[var(--text-primary)]">16. Changes to this policy</h2>
            <p>If we change how the game handles information, for example by adding online features, we will update this page and the effective date, and describe the change in the game's Google Play release notes. If a change would involve collecting new personal information, we will ask for your consent where the law requires it. Previous versions are available on request.</p>
          </section>

          <section id="s17">
            <h2 className="font-display text-xl font-bold text-[var(--text-primary)]">17. Contact</h2>
            <p>Questions about this policy, or a privacy request, can be sent to:</p>
            <address className="not-italic rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <strong className="text-[var(--text-primary)]">HAMZA POWERPLAYER SMC-PRIVATE LIMITED</strong><br />
              Pakistan<br />
              Email: <a className="text-[var(--neon-cyan)]" href="mailto:hamzapowerplayer.global@gmail.com">hamzapowerplayer.global@gmail.com</a><br />
              Website: <a className="text-[var(--neon-cyan)]" href="https://hamzapowerplayer.com">hamzapowerplayer.com</a>
            </address>
            <p className="mt-4">We aim to reply within 30 days.</p>
            <p>This policy is governed by the laws of Pakistan, without limiting any rights you have under the mandatory consumer or privacy laws of your own country.</p>
          </section>
        </div>

        <p className="mt-12 font-mono text-xs text-[var(--text-muted)]">
          © 2026 HAMZA POWERPLAYER SMC-PRIVATE LIMITED. Effective 30 September 2026. Version 1.0.
        </p>
      </article>
    </PageLayout>
  );
}