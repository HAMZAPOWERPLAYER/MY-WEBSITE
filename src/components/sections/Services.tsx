import { Link } from 'wouter';
import { ArrowRight, Check, Globe2, Smartphone, Sparkles, type LucideIcon } from 'lucide-react';
import { SectionHeading } from '@/components/sections/SectionHeading';
import { Reveal } from '@/components/effects/ScrollReveal';
import { Tilt3D } from '@/components/effects/Tilt3D';

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
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_12%_20%,rgba(124,58,237,0.05),transparent_70%)]"
      />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <SectionHeading
              eyebrow="Work with me"
              title="From a rough idea to a shipped product."
              description="I take on focused projects where the goal is clear: an app, a feature, or a web product that ships. Every engagement starts with a written scope and agreed deliverables."
            />
            <Reveal variant="slide-up" distance={16} delay={0.2} duration={600}>
              <Link
                href="/hire"
                className="hp-btn-ghost mt-8 px-5 py-3 font-display text-xs font-bold tracking-wide"
              >
                See how I work <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </Reveal>
          </div>

          <div className="space-y-4">
            {SERVICES.map(({ number, title, description, deliverables, Icon }, index) => (
              <Reveal key={number} variant="slide-up" distance={26} delay={0.08 * index} duration={700}>
                <Tilt3D className="hp-card hp-card-hover hp-card-spot hp-hairline group relative overflow-hidden p-6 sm:p-7">
                  <div className="relative z-10 flex items-start gap-4">
                    <span className="relative inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-[var(--neon-cyan)] transition-all duration-300 group-hover:border-[rgba(0,240,255,0.35)] group-hover:bg-[rgba(0,240,255,0.08)] group-hover:shadow-[0_0_22px_rgba(0,240,255,0.25)]">
                      <Icon size={19} aria-hidden="true" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between gap-4">
                        <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">{title}</h3>
                        <span className="hp-stat-value font-mono text-[11px] font-bold tracking-[0.18em]">
                          {number}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">{description}</p>
                      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                        {deliverables.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-xs leading-relaxed text-[var(--text-muted)]">
                            <span className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[rgba(0,240,255,0.1)]">
                              <Check size={10} aria-hidden="true" className="text-[var(--neon-cyan)]" />
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Tilt3D>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
