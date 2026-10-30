import {
  ArrowLeft,
  ArrowUpRight,
  BadgeCheck,
  CalendarCheck,
  Check,
  Download,
  Globe,
  Handshake,
  Megaphone,
  ShieldCheck,
  Sparkles,
  Youtube,
} from 'lucide-react';
import { Link, useParams } from 'wouter';
import { PageLayout } from '@/components/layout/PageLayout';
import { Reveal } from '@/components/effects/ScrollReveal';
import { Tilt3D } from '@/components/effects/Tilt3D';
import { ProductIcon, ProductMedia, StatusPill } from '@/components/product/ProductArtwork';
import { PRODUCTS, SITE_ORIGIN } from '@/lib/products';
import {
  CREATORS,
  COLLAB_MOTTO,
  COLLAB_ATTRIBUTION,
} from '@/lib/creators';

const PAGE_TITLE = 'SGD EDITZ | Official Creator Collaboration — HAMZA POWERPLAYER';
const PAGE_DESCRIPTION =
  'Official creator collaboration with SGD EDITZ, an anime editing creator and official HAMZA POWERPLAYER partner — exploring the partnership and SubSight.';

/** Decorative icons for the OUR COLLABORATION bullets, in registry order. */
const COLLAB_POINT_ICONS = [Handshake, Megaphone, Globe, CalendarCheck] as const;

/**
 * Dedicated creator profile page — /creators/:slug.
 *
 * Content is resolved from src/lib/creators.ts (SGD EDITZ is the
 * flagship) and the featured product loose-couples to src/lib/products.ts.
 * Adding a future creator to the registry with a `profilePath` is all
 * that is needed for their profile experience.
 */
export default function CreatorProfilePage() {
  const params = useParams();
  const creator = CREATORS.find((candidate) => candidate.profilePath && candidate.slug === params.id);

  if (!creator) {
    return <CreatorNotFound />;
  }

  const featuredProduct = creator.featuredProduct;
  const product = featuredProduct
    ? PRODUCTS.find((candidate) => candidate.id === featuredProduct.productId)
    : undefined;

  const profileUrl = `${SITE_ORIGIN}${creator.profilePath}`;
  const schema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${profileUrl}#webpage`,
    url: profileUrl,
    name: 'SGD EDITZ | Official Creator Collaboration',
    description: PAGE_DESCRIPTION,
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${SITE_ORIGIN}/#website`,
      name: 'HAMZA POWERPLAYER',
      url: `${SITE_ORIGIN}/`,
    },
    mainEntity: {
      '@type': 'Person',
      name: creator.name,
      jobTitle: creator.category,
      url: creator.channelUrl,
      image: `${SITE_ORIGIN}${creator.logo}`,
    },
    about: 'Official creator collaboration between HAMZA POWERPLAYER and SGD EDITZ.',
  });

  return (
    <PageLayout
      title={PAGE_TITLE}
      description={PAGE_DESCRIPTION}
      path={creator.profilePath}
      ogType="profile"
      schemas={[schema]}
    >
      {/* ═══════════════ Creator hero ═══════════════ */}
      <section
        aria-label={`${creator.name} creator profile`}
        className="relative overflow-hidden border-b border-white/[0.06]"
      >
        {/* Cinematic background — violet for the creator's brand */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 70% 55% at 50% -12%, rgba(124,58,237,0.20), transparent 65%), radial-gradient(ellipse 50% 45% at 8% 92%, rgba(167,139,250,0.10), transparent 70%)',
            }}
          />
          <div className="hp-grid-bg absolute inset-0 opacity-25" />
          <div className="hp-grid-floor opacity-80" />
          <div className="hp-float absolute -right-24 -top-28 h-72 w-72 rounded-full bg-[rgba(124,58,237,0.16)] blur-3xl" />
          <div
            className="hp-float absolute -bottom-36 left-[8%] h-64 w-64 rounded-full bg-[rgba(167,139,250,0.10)] blur-3xl"
            style={{ animationDelay: '-3.5s' }}
          />
        </div>

        <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-10 sm:pb-20 sm:pt-12">
          {/* Back to home */}
          <Reveal variant="slide-down" distance={16} duration={600}>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2.5 font-mono text-[10px] tracking-[0.2em] text-[var(--text-muted)] transition-colors hover:border-[rgba(167,139,250,0.4)] hover:text-[#c4b5fd] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-[rgba(167,139,250,0.5)]"
            >
              <ArrowLeft size={13} aria-hidden="true" />
              BACK TO HOME
            </Link>
          </Reveal>

          {/* Logo medallion — object-cover on a square avatar is never cropped */}
          <Reveal variant="scale" distance={26} duration={800} className="mt-10 flex justify-center sm:mt-12">
            <div className="relative">
              <span
                aria-hidden="true"
                className="absolute -inset-5 rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.45),transparent_72%)] blur-2xl"
              />
              <span aria-hidden="true" className="absolute -inset-2.5 rounded-full border border-[rgba(167,139,250,0.3)]" />
              <span
                aria-hidden="true"
                className="absolute -inset-2.5 rounded-full bg-[radial-gradient(circle_at_28%_18%,rgba(233,213,255,0.16),transparent_55%)]"
              />
              <img
                src={creator.logo}
                alt={creator.logoAlt}
                width={900}
                height={900}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="relative h-40 w-40 rounded-full border border-white/15 bg-[#05050a] object-cover shadow-[0_0_60px_rgba(124,58,237,0.4)] sm:h-52 sm:w-52 lg:h-56 lg:w-56"
              />
            </div>
          </Reveal>

          {/* Identity */}
          <Reveal variant="slide-up" distance={22} duration={700}>
            <div className="mt-9 text-center">
              <h1 className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 font-display text-4xl font-black tracking-wide sm:text-5xl">
                <span className="hp-3d-grad-violet bg-gradient-to-r from-[#ede9fe] via-[#c4b5fd] to-[#a78bfa] bg-clip-text text-transparent">
                  {creator.name}
                </span>
                <BadgeCheck size={32} aria-hidden="true" className="shrink-0 text-[#a78bfa]" />
              </h1>

              <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
                <p className="inline-flex items-center gap-2 rounded-full border border-[rgba(167,139,250,0.32)] bg-[rgba(124,58,237,0.09)] px-4 py-1.5 font-mono text-[10px] font-medium tracking-[0.2em] text-[#c4b5fd]">
                  <ShieldCheck size={13} aria-hidden="true" />
                  {creator.badge}
                </p>
                <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 font-mono text-[10px] tracking-[0.18em] text-[var(--text-muted)]">
                  {creator.category}
                </p>
              </div>

              <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[var(--text-muted)] sm:text-lg">
                {creator.profileIntro}
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
                <a
                  href={creator.channelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${creator.name} — ${creator.ctaLabel} (opens in a new tab)`}
                  className="hp-btn-pro w-full justify-center px-8 py-4 font-display text-xs font-black tracking-[0.08em] sm:w-auto"
                >
                  <Youtube size={15} aria-hidden="true" />
                  {creator.ctaLabel}
                </a>
                <span className="font-mono text-[11px] tracking-[0.14em] text-[var(--text-muted)]">
                  {creator.handle}
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════ About the creator ═══════════════ */}
      <section aria-label="About the creator" className="border-b border-white/[0.06] py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal variant="slide-up" distance={18} duration={600}>
            <p className="hp-eyebrow">Meet the creator</p>
            <h2 className="hp-h2 mt-4">ABOUT THE CREATOR</h2>
          </Reveal>

          <Reveal variant="slide-up" distance={26} delay={0.1} duration={700} className="mt-9">
            <div className="glass-card group relative max-w-4xl overflow-hidden rounded-[2rem] p-7 sm:p-10">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-70"
                style={{
                  background:
                    'radial-gradient(ellipse 55% 60% at 6% 0%, rgba(124,58,237,0.14), transparent 62%)',
                }}
              />
              <Sparkles size={18} aria-hidden="true" className="relative text-[#a78bfa]" />
              <p className="relative mt-4 text-base leading-relaxed text-[var(--text-primary)] sm:text-lg sm:leading-[1.85]">
                {creator.about}
              </p>
              <div
                aria-hidden="true"
                className="relative mt-6 h-px w-24 bg-gradient-to-r from-[rgba(167,139,250,0.5)] to-transparent"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════ Our collaboration ═══════════════ */}
      <section aria-label="Our collaboration" className="border-b border-white/[0.06] py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal variant="slide-up" distance={18} duration={600}>
            <p className="hp-eyebrow">Official partnership</p>
            <h2 className="hp-h2 mt-4">OUR COLLABORATION</h2>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-5">
            {creator.collaborationPoints.map((point, index) => {
              const PointIcon = COLLAB_POINT_ICONS[index] ?? Sparkles;
              return (
                <Reveal key={point} variant="slide-up" distance={20} delay={0.06 * index} duration={650}>
                  <div className="glass-card h-full rounded-2xl p-5 sm:p-6">
                    <div className="flex items-start gap-4">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-[rgba(167,139,250,0.28)] bg-[rgba(124,58,237,0.08)] shadow-[0_0_18px_rgba(124,58,237,0.16)]">
                        <PointIcon size={17} aria-hidden="true" className="text-[#c4b5fd]" />
                      </span>
                      <p className="pt-1.5 text-sm leading-relaxed text-[var(--text-primary)] sm:text-[15px]">
                        {point}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* Partnership seal */}
          <Reveal variant="scale" distance={24} delay={0.12} duration={800} className="mt-10 sm:mt-12">
            <Tilt3D maxTilt={3} liftScale={1.005} className="hp-beam rounded-[2rem]">
              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0a0a15] px-6 py-10 text-center sm:py-12">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-70"
                  style={{
                    background:
                      'radial-gradient(ellipse 60% 55% at 50% -10%, rgba(124,58,237,0.18), transparent 62%)',
                  }}
                />
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 hp-grid-bg opacity-25" />

                <div className="relative mx-auto grid h-16 w-16 place-items-center rounded-full border border-[rgba(167,139,250,0.35)] bg-[rgba(124,58,237,0.10)] shadow-[0_0_34px_rgba(124,58,237,0.35)]">
                  <span
                    aria-hidden="true"
                    className="absolute -inset-1.5 rounded-full border border-[rgba(167,139,250,0.18)]"
                  />
                  <ShieldCheck size={26} aria-hidden="true" className="text-[#c4b5fd]" />
                </div>
                <p className="relative mt-6 font-display text-xs font-black tracking-[0.22em] text-[#c4b5fd] sm:text-sm">
                  {creator.badge}
                </p>
                <p className="relative mt-4 font-display text-base font-bold tracking-[0.12em] text-[var(--text-primary)] sm:text-lg">
                  {COLLAB_MOTTO}
                </p>
                <p className="relative mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
                  {COLLAB_ATTRIBUTION}
                </p>
              </div>
            </Tilt3D>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════ Featured project — SubSight ═══════════════ */}
      {featuredProduct && product && (
        <section
          aria-label="Featured collaboration project"
          className="relative overflow-hidden border-b border-white/[0.06] py-16 sm:py-20"
        >
          {/* Cyan product-world tint — visually distinct from the violet creator identity */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse 65% 50% at 90% 0%, rgba(0,240,255,0.10), transparent 65%), radial-gradient(ellipse 50% 45% at 0% 100%, rgba(124,58,237,0.08), transparent 70%)',
              }}
            />
            <div className="hp-grid-bg absolute inset-0 opacity-20" />
          </div>

          <div className="relative mx-auto max-w-6xl px-6">
            <Reveal variant="slide-up" distance={18} duration={600}>
              <p className="hp-eyebrow">Featured collaboration project</p>
              <h2 className="hp-3d-text mt-4 font-display text-2xl font-black tracking-wide text-[var(--text-primary)] sm:text-3xl lg:text-4xl">
                {featuredProduct.heading}
              </h2>
            </Reveal>

            <div className="mt-9 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,400px)] lg:items-center">
              {/* Product card */}
              <Reveal variant="slide-up" distance={26} duration={700}>
                <div className="group relative overflow-hidden rounded-[2rem] border border-[rgba(0,240,255,0.16)] bg-[#080a16] p-6 shadow-[0_0_44px_rgba(0,240,255,0.07)] transition-shadow duration-500 hover:shadow-[0_0_60px_rgba(0,240,255,0.12)] sm:p-8">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-60"
                    style={{
                      background:
                        'radial-gradient(ellipse 55% 50% at 92% -6%, rgba(0,240,255,0.12), transparent 62%)',
                    }}
                  />

                  <div className="relative flex flex-wrap items-center gap-4">
                    <span className="relative shrink-0">
                      <span
                        aria-hidden="true"
                        className="absolute -inset-2 rounded-2xl bg-[radial-gradient(circle,rgba(0,240,255,0.28),transparent_70%)] blur-md"
                      />
                      <ProductIcon product={product} size="lg" />
                    </span>
                    <div className="flex min-w-0 flex-col gap-2">
                      <StatusPill status={product.status} />
                      {product.platform && (
                        <span className="font-mono text-[10px] tracking-[0.16em] text-[var(--text-muted)]">
                          {product.platform.toUpperCase()}
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="relative mt-5 text-sm leading-relaxed text-[var(--text-primary)] sm:text-base">
                    {featuredProduct.description}
                  </p>

                  <ul className="relative mt-6 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                    {featuredProduct.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-sm text-[var(--text-muted)]">
                        <Check size={14} aria-hidden="true" className="mt-0.5 shrink-0 text-[var(--neon-cyan)]" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="relative mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
                    <a
                      href={product.storeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${featuredProduct.ctaLabel} (opens in a new tab)`}
                      className="hp-btn-pro w-full justify-center px-7 py-3.5 font-display text-xs font-black tracking-[0.08em] sm:w-auto"
                    >
                      <Download size={14} aria-hidden="true" />
                      {featuredProduct.ctaLabel}
                    </a>
                    <Link
                      href={product.route}
                      className="inline-flex items-center justify-center gap-1.5 rounded-lg px-2 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--text-muted)] transition-colors hover:text-[var(--neon-cyan)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[rgba(0,240,255,0.5)] sm:justify-start"
                    >
                      {featuredProduct.caseStudyLabel}
                      <ArrowUpRight size={13} aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </Reveal>

              {/* Store screenshot */}
              <Reveal variant="slide-left" distance={30} duration={800}>
                {product.heroImage && (
                  <ProductMedia
                    src={product.heroImage}
                    alt="SubSight app screen showing tracked subscriptions and renewal dates"
                    className="rounded-[2rem]"
                  />
                )}
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════ Social ═══════════════ */}
      <section aria-label="Where to follow the creator" className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <Reveal variant="slide-up" distance={18} duration={600}>
            <p className="hp-eyebrow">Social</p>
            <h2 className="hp-h2 mt-4">MORE FROM {creator.name}</h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[var(--text-muted)] sm:text-base">
              All edits and updates from SGD EDITZ live on the official YouTube channel.
            </p>
          </Reveal>

          <Reveal variant="scale" distance={24} delay={0.1} duration={700} className="mt-9">
            <div className="relative mx-auto max-w-xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#0a0a15] p-8 sm:p-10">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-70"
                style={{
                  background:
                    'radial-gradient(ellipse 55% 60% at 50% -10%, rgba(255,42,61,0.10), transparent 62%), radial-gradient(ellipse 45% 45% at 50% 110%, rgba(124,58,237,0.12), transparent 70%)',
                }}
              />
              <span className="relative mx-auto grid h-14 w-14 place-items-center rounded-2xl border border-[rgba(255,42,61,0.28)] bg-[rgba(255,42,61,0.08)] shadow-[0_0_28px_rgba(255,42,61,0.18)]">
                <Youtube size={24} aria-hidden="true" className="text-[#ff6b6d]" />
              </span>
              <p className="relative mt-5 font-mono text-[11px] tracking-[0.14em] text-[var(--text-muted)]">
                {creator.handle}
              </p>
              <a
                href={creator.channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${creator.name} — ${creator.ctaLabel} (opens in a new tab)`}
                className="hp-btn-pro relative mt-6 inline-flex justify-center px-8 py-4 font-display text-xs font-black tracking-[0.08em]"
              >
                <Youtube size={15} aria-hidden="true" />
                {creator.ctaLabel}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </PageLayout>
  );
}

/** Minimal, no-index fallback for slugs that are not in the registry. */
function CreatorNotFound() {
  return (
    <PageLayout
      title="Creator Not Found | HAMZA POWERPLAYER"
      description="The creator profile you are looking for does not exist. Browse the official creator collaborations on HAMZA POWERPLAYER."
      path="/"
      noindex
    >
      <section className="grid min-h-[55vh] place-items-center px-6 text-center">
        <div>
          <p className="hp-eyebrow">404</p>
          <h1 className="hp-3d-text mt-4 font-display text-3xl font-black text-[var(--text-primary)] sm:text-4xl">
            CREATOR NOT FOUND
          </h1>
          <p className="mt-4 text-sm text-[var(--text-muted)]">This creator profile does not exist yet.</p>
          <Link
            href="/"
            className="hp-btn-pro mt-8 inline-flex items-center gap-2 px-6 py-3.5 font-display text-xs font-black tracking-[0.08em]"
          >
            <ArrowLeft size={13} aria-hidden="true" />
            BACK TO HOME
          </Link>
        </div>
      </section>
    </PageLayout>
  );
}
