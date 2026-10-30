import { Link } from 'wouter';
import { BadgeCheck, ArrowUpRight, ShieldCheck, Youtube } from 'lucide-react';
import {
  featuredCreators,
  SECTION_HEADING,
  COLLAB_MOTTO,
  COLLAB_ATTRIBUTION,
  type CreatorCollab,
} from '@/lib/creators';
import { Reveal } from '@/components/effects/ScrollReveal';
import { Tilt3D } from '@/components/effects/Tilt3D';

/**
 * Featured creator spotlight — shown directly below the hero. Content
 * comes from src/lib/creators.ts (SGD EDITZ stays first) so partner
 * details and links are data-only updates.
 */
function CreatorSpotlightCard({ creator }: { creator: CreatorCollab }) {
  return (
    <Tilt3D maxTilt={4} liftScale={1.008} className="hp-beam rounded-[2rem]">
      <article className="group relative cursor-pointer overflow-hidden rounded-[2rem] border border-white/10 bg-[#0a0a15] p-6 transition-colors duration-300 group-focus-within:border-[rgba(167,139,250,0.4)] sm:p-9 lg:p-12">
        {/* Signature ambience — violet-tinted for the creator's brand */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              'radial-gradient(ellipse 62% 58% at 12% -8%, rgba(124,58,237,0.22), transparent 62%), radial-gradient(ellipse 45% 45% at 90% 108%, rgba(124,58,237,0.16), transparent 70%)',
          }}
        />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 hp-grid-bg opacity-30" />
        {/* Slow ambient glow — the "animated background details" layer */}
        <div
          aria-hidden="true"
          className="hp-float pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[rgba(124,58,237,0.14)] blur-3xl"
        />
        <div
          aria-hidden="true"
          className="hp-float pointer-events-none absolute -bottom-32 left-1/4 h-64 w-64 rounded-full bg-[rgba(167,139,250,0.12)] blur-3xl"
          style={{ animationDelay: '-3.5s' }}
        />

        {/* Badge + profile-link affordance (chip is decorative; the stretched
            link below opens the profile page from anywhere on the card) */}
        <div className="relative z-10">
          <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-[rgba(167,139,250,0.32)] bg-[rgba(124,58,237,0.09)] px-4 py-1.5 font-mono text-[10px] font-medium tracking-[0.2em] text-[#c4b5fd] sm:mx-0">
            <ShieldCheck size={13} aria-hidden="true" />
            {creator.badge}
          </p>
          {creator.profilePath && (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-0 top-0 hidden items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-[10px] tracking-[0.2em] text-[var(--text-muted)] transition-colors duration-300 group-hover:border-[rgba(167,139,250,0.45)] group-hover:bg-[rgba(124,58,237,0.08)] group-hover:text-[#c4b5fd] sm:inline-flex"
            >
              VIEW PROFILE
              <ArrowUpRight size={11} />
            </span>
          )}
        </div>

        <div className="relative z-10 mt-7 grid items-center gap-8 text-center sm:mt-8 sm:grid-cols-[auto_minmax(0,1fr)] sm:gap-10 sm:text-left lg:gap-12">
          {/* Logo medallion — object-contain so it is never cropped */}
          <div className="relative mx-auto shrink-0">
            <span
              aria-hidden="true"
              className="absolute -inset-4 rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.42),transparent_72%)] blur-2xl transition-opacity duration-500 group-hover:opacity-100 sm:opacity-90"
            />
            <span aria-hidden="true" className="absolute -inset-2 rounded-full border border-[rgba(167,139,250,0.28)]" />
            <span
              aria-hidden="true"
              className="absolute -inset-2 rounded-full bg-[radial-gradient(circle_at_30%_20%,rgba(233,213,255,0.16),transparent_55%)]"
            />
            <img
              src={creator.logo}
              alt={creator.logoAlt}
              width={900}
              height={900}
              loading="lazy"
              decoding="async"
              className="relative h-36 w-36 rounded-full border border-white/15 bg-[#05050a] object-cover shadow-[0_0_44px_rgba(124,58,237,0.38)] transition-transform duration-500 group-hover:scale-[1.03] sm:h-44 sm:w-44 lg:h-48 lg:w-48"
            />
          </div>

          {/* Identity + actions */}
          <div className="min-w-0">
            <div className="flex flex-col items-center gap-2 sm:items-start">
              <h3
                id={`creators-heading-${creator.id}`}
                className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-display text-3xl font-black tracking-wide sm:justify-start sm:text-4xl"
              >
                <span className="bg-gradient-to-r from-[#ede9fe] via-[#c4b5fd] to-[#a78bfa] bg-clip-text text-transparent">
                  {creator.name}
                </span>
                <BadgeCheck size={26} aria-hidden="true" className="shrink-0 text-[#a78bfa]" />
                <span className="sr-only">— official collaboration partner</span>
              </h3>
              <p className="font-mono text-[11px] tracking-[0.14em] text-[var(--text-muted)]">{creator.handle}</p>
              {creator.profilePath && (
                <p
                  aria-hidden="true"
                  className="pointer-events-none mt-1 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[#a78bfa] sm:hidden"
                >
                  Tap anywhere to view profile
                  <ArrowUpRight size={11} />
                </p>
              )}
            </div>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[var(--text-muted)] sm:mx-0 sm:text-base">
              {creator.intro}
            </p>

            <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:items-center sm:flex-wrap sm:gap-5">
              <a
                href={creator.channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${creator.name} — ${creator.ctaLabel} (opens in a new tab)`}
                className="hp-btn-pro w-full justify-center px-7 py-3.5 font-display text-xs font-black tracking-[0.08em] sm:w-auto"
              >
                <Youtube size={14} aria-hidden="true" />
                {creator.ctaLabel}
              </a>
              <a
                href={creator.channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg px-2 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--text-muted)] transition-colors hover:text-[var(--neon-cyan)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[rgba(0,240,255,0.5)]"
              >
                {creator.secondaryLabel}
                <ArrowUpRight size={13} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {/* Partnership footer */}
        <div className="relative z-10 mt-10 border-t border-white/[0.08] pt-7 text-center sm:mt-12">
          <p className="font-display text-xs font-bold tracking-[0.18em] text-[var(--text-primary)] sm:text-sm">
            {COLLAB_MOTTO}
          </p>
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
            {COLLAB_ATTRIBUTION}
          </p>
        </div>

        {/* Stretched profile link — the whole card opens the creator profile.
            It ignores pointer events on the CTA row (z-10) so the YouTube
            buttons keep their own destinations. */}
        {creator.profilePath && (
          <Link
            href={creator.profilePath}
            aria-label={`View the ${creator.name} creator profile`}
            className="absolute inset-0 rounded-[2rem] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-6px] focus-visible:outline-[rgba(167,139,250,0.6)]"
          />
        )}
      </article>
    </Tilt3D>
  );
}

export function CreatorCollab() {
  if (featuredCreators.length === 0) return null;

  return (
    <section
      id="collaborations"
      aria-label="Featured creator collaborations"
      className="relative scroll-mt-20 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-6">
        {/* Official seal heading */}
        <Reveal variant="slide-down" distance={18} duration={700}>
          <div className="flex items-center justify-center gap-4">
            <span aria-hidden="true" className="h-px w-10 bg-gradient-to-r from-transparent to-[rgba(167,139,250,0.5)]" />
            <h2 className="font-display text-xs font-black tracking-[0.34em] text-[var(--text-primary)] sm:text-sm">
              {SECTION_HEADING}
            </h2>
            <span aria-hidden="true" className="h-px w-10 bg-gradient-to-l from-transparent to-[rgba(167,139,250,0.5)]" />
          </div>
        </Reveal>

        <div className="mt-9 space-y-6 sm:mt-12">
          {featuredCreators.map((creator, index) => (
            <Reveal key={creator.id} variant="slide-up" distance={30} delay={0.1 * index} duration={800}>
              <CreatorSpotlightCard creator={creator} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
