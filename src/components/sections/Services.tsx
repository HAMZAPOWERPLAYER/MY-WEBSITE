import { Link } from 'wouter';
import { ArrowRight, Globe2, Smartphone, Sparkles, type LucideIcon } from 'lucide-react';
import { SectionHeading } from '@/components/sections/SectionHeading';
import { BentoGrid, BentoTile } from '@/components/bento/BentoTile';

interface Service {
  number: string;
  title: string;
  description: string;
  Icon: LucideIcon;
}

const SERVICES: Service[] = [
  {
    number: '01',
    title: 'Android apps',
    description:
      'Flutter and native Android, from the first screen to a Play Store release — scoping, offline-first architecture, and maintenance included.',
    Icon: Smartphone,
  },
  {
    number: '02',
    title: 'AI & API features',
    description:
      'Practical AI features tied to a defined user problem, with real error handling and privacy, cost, and rate-limit guardrails.',
    Icon: Sparkles,
  },
  {
    number: '03',
    title: 'Web products',
    description:
      'Fast, accessible sites and client-side tools that work without an account — deployed and maintained for the long run.',
    Icon: Globe2,
  },
];

/**
 * What I Build — bento grid. One service per tile: one heading, one short
 * line, one visual (the icon plus its oversized index numeral).
 */
export function Services() {
  return (
    <section id="services" className="relative scroll-mt-20 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="What I build"
          title="From a rough idea to a shipped product."
          description="I take on focused projects where the goal is clear: an app, a feature, or a web product that ships. Every engagement starts with a written scope and agreed deliverables."
          aside={
            <Link href="/hire" className="bento-cta px-5 py-3">
              See how I work <ArrowRight size={14} aria-hidden="true" />
            </Link>
          }
        />

        <BentoGrid className="mt-12" aria-label="Services">
          {SERVICES.map(({ number, title, description, Icon }, index) => (
            <BentoTile
              key={number}
              size={index === 0 ? '2x2' : '1x2'}
              index={index}
            >
              <Link
                href="/hire"
                aria-label={`${title} — see how I work`}
                className="relative z-[2] flex h-full flex-col"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/12 bg-white/[0.05] text-[var(--text-primary)]">
                  <Icon size={21} aria-hidden="true" />
                </span>
                <h3 className="bento-h mt-5 text-xl">{title}</h3>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-[var(--text-muted)]">
                  {description}
                </p>
                <span
                  aria-hidden="true"
                  className="mt-auto select-none self-end font-display text-6xl font-black leading-none text-white/[0.06]"
                >
                  {number}
                </span>
              </Link>
            </BentoTile>
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}
