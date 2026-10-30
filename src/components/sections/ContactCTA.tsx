import { Link } from 'wouter';
import { ArrowRight, ArrowUpRight, Linkedin } from 'lucide-react';
import { SiGithub, SiWhatsapp, SiYoutube } from 'react-icons/si';
import { SOCIAL_LINKS } from '@/lib/siteLinks';

const SOCIAL_ICONS = [
  { title: 'GitHub Profile', label: 'GitHub', Icon: SiGithub },
  { title: 'LinkedIn', label: 'LinkedIn', Icon: Linkedin },
  { title: 'WhatsApp', label: 'WhatsApp', Icon: SiWhatsapp },
  { title: 'YouTube', label: 'YouTube', Icon: SiYoutube },
];

export function ContactCTA() {
  return (
    <section id="contact" className="relative scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="hp-beam rounded-3xl">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#070712] p-8 sm:p-12 lg:p-16">
            {/* Signature ambience */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: 'var(--hp-grad-deep)' }} />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-28 -top-28 h-80 w-80 rounded-full bg-[rgba(0,240,255,0.14)] blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-36 left-1/3 h-72 w-72 rounded-full bg-[rgba(124,58,237,0.14)] blur-3xl"
            />
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 hp-grid-bg opacity-40" />
            <div aria-hidden="true" className="pointer-events-none hp-grid-floor" />

            <div className="relative max-w-2xl">
              <p className="hp-eyebrow">Contact</p>
              <h2 className="hp-display mt-4 text-[clamp(2rem,5vw,3.4rem)] text-[var(--text-primary)]">
                Have something to{' '}
                <span className="hp-3d-grad hp-gradient-text gradient-shimmer inline-block">build?</span>
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-[var(--text-muted)]">
                Tell me what you&apos;re working on. I&apos;ll reply with feasibility, scope, and next
                steps — no sales script.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-3.5">
                <Link
                  href="/contact"
                  className="hp-btn-pro px-6 py-3.5 font-display text-xs font-black tracking-[0.06em]"
                >
                  Start a conversation <ArrowRight size={14} aria-hidden="true" />
                </Link>
                <Link
                  href="/hire"
                  className="hp-btn-ghost px-6 py-3.5 font-display text-xs font-bold tracking-[0.06em]"
                >
                  Services &amp; process
                </Link>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/[0.08] pt-6">
                {SOCIAL_ICONS.map(({ title, label, Icon }) => {
                  const link = SOCIAL_LINKS.find((candidate) => candidate.title === title);
                  if (!link) return null;
                  return (
                    <a
                      key={title}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--text-muted)] transition-colors hover:text-[var(--neon-cyan)]"
                    >
                      <Icon size={12} aria-hidden="true" /> {label}
                    </a>
                  );
                })}
                <Link
                  href="/links"
                  className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--neon-cyan)] transition-opacity hover:opacity-80"
                >
                  All links <ArrowUpRight size={12} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
