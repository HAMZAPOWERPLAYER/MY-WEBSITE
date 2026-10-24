import { Link } from 'wouter';
import { ArrowRight, Check, Globe2, Smartphone, Sparkles, type LucideIcon } from 'lucide-react';

interface Service {
  number: string;
  title: string;
  description: string;
  deliverables: string[];
  Icon: LucideIcon;
}

const SERVICES: Service[] = [
  {
    number: '01',
    title: 'Android apps',
    description: 'Flutter and native Android, from the first screen to a Play Store release.',
    deliverables: [
      'Product scoping and interface implementation',
      'Offline-first architecture and local storage',
      'Store listing, release, and maintenance',
    ],
    Icon: Smartphone,
  },
  {
    number: '02',
    title: 'AI & API features',
    description: 'Practical AI features and integrations tied to a defined user problem.',
    deliverables: [
      'Feasibility checks and provider selection',
      'API integration with real error handling',
      'Privacy, cost, and rate-limit guardrails',
    ],
    Icon: Sparkles,
  },
  {
    number: '03',
    title: 'Web products',
    description: 'Fast, accessible sites and client-side tools that work without an account.',
    deliverables: [
      'Responsive, keyboard-accessible interfaces',
      'Client-side tools and focused dashboards',
      'Deployment and ongoing maintenance',
    ],
    Icon: Globe2,
  },
];

export function Services() {
  return (
    <section id="services" className="relative scroll-mt-20 border-t border-white/[0.06] py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="hp-eyebrow">Work with me</p>
            <h2 className="hp-h2 mt-4">From a rough idea to a shipped product.</h2>
            <p className="mt-5 text-base leading-relaxed text-[var(--text-muted)]">
              I take on focused projects where the goal is clear: an app, a feature, or a web
              product that ships. Every engagement starts with a written scope and agreed
              deliverables.
            </p>
            <Link
              href="/hire"
              className="mt-7 inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.03] px-5 py-3 font-display text-xs font-bold tracking-wide text-[var(--text-primary)] transition-colors hover:border-white/30 hover:bg-white/[0.06]"
            >
              See how I work <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>

          <div className="space-y-4">
            {SERVICES.map(({ number, title, description, deliverables, Icon }) => (
              <article key={number} className="hp-card p-6 sm:p-7">
                <div className="flex items-start gap-4">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-[var(--neon-cyan)]">
                    <Icon size={19} aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">{title}</h3>
                      <span className="font-mono text-[10px] tracking-[0.18em] text-[var(--text-muted)]">
                        {number}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">{description}</p>
                    <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                      {deliverables.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-xs leading-relaxed text-[var(--text-muted)]">
                          <Check size={13} aria-hidden="true" className="mt-0.5 shrink-0 text-[var(--neon-cyan)]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
