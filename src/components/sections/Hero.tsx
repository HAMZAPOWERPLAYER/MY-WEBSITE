import { Link } from 'wouter';
import { ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react';
import { APPS, GAMES } from '@/lib/products';
import { ProductIcon } from '@/components/product/ProductArtwork';
import { BentoGrid, BentoTile } from '@/components/bento/BentoTile';

const lastBell = GAMES.find((game) => game.slug === 'the-last-bell');
const pakiGpa = APPS.find((app) => app.slug === 'paki-gpa');
const subSight = APPS.find((app) => app.slug === 'subsight');
const fantasyTextPro = APPS.find((app) => app.slug === 'fantasy-text-pro');
const productCount = APPS.filter((app) => app.status === 'published').length + (lastBell ? 1 : 0);

const TICKER_ITEMS = [
  'Android',
  'Flutter',
  'Unity',
  'React',
  'TypeScript',
  'AI APIs',
  'Offline-first',
  'Privacy-first',
];

/**
 * Hero — full-width display heading, then a two-column split: identity +
 * CTAs on the left, a compact 4-column bento (one tile per idea) on the
 * right. The bento is above the fold, so its tiles render with no
 * entrance animation (animate={false}).
 */
export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pb-14 pt-28 sm:pb-20 sm:pt-36"
    >
      {/* Signature ambience — drifting aurora + precision grid */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hp-aurora" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hp-grid-bg opacity-60" />
      <div aria-hidden="true" className="pointer-events-none hp-grid-floor" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[var(--bg-base)] to-transparent"
      />

      <div className="relative mx-auto w-full max-w-6xl px-6">
        <div className="hp-rise hp-rise-1">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-white/[0.14] bg-white/[0.04] px-4 py-1.5 backdrop-blur">
            <span aria-hidden="true" className="glow-dot" />
            <span className="font-mono text-[10px] font-medium tracking-[0.22em] text-[var(--text-primary)]">
              INDEPENDENT APP &amp; GAME DEVELOPER
            </span>
          </span>
        </div>

        {/* Full-width display heading — both lines always visible, no clip */}
        <h1 className="hp-rise hp-rise-2 mt-6">
          <span className="hp-3d-text font-display block text-[clamp(2.5rem,7vw,6rem)] font-black leading-[0.95] tracking-[-0.035em] text-[var(--text-primary)]">
            HAMZA
          </span>
          <span className="hp-3d-grad hp-gradient-text gradient-shimmer font-display mt-1 text-[clamp(2.5rem,7vw,6rem)] font-black leading-[0.95] tracking-[-0.035em]">
            POWERPLAYER
          </span>
        </h1>

        <div className="mt-10 grid items-start gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-14">
          {/* ── Left: identity + CTA ── */}
          <div className="min-w-0 lg:pt-6">
            <p className="hp-rise hp-rise-3 max-w-xl text-base leading-relaxed text-[var(--text-muted)] sm:text-lg">
              I design, build, and ship Android apps and games end to end.{' '}
              <span className="font-medium text-[var(--text-primary)]">
                {productCount} products live on Google Play
              </span>
              , including THE LAST BELL, PakiGPA, SubSight, and Fantasy Text Pro.
            </p>

            <div className="hp-rise hp-rise-4 mt-9 flex flex-wrap items-center gap-3.5">
              <Link
                href="/contact"
                className="hp-btn-pro px-6 py-3.5 font-display text-xs font-black tracking-[0.06em]"
              >
                <Sparkles size={14} aria-hidden="true" />
                Start a project
              </Link>
              <a
                href="#work"
                className="hp-btn-ghost px-6 py-3.5 font-display text-xs font-bold tracking-[0.06em]"
              >
                Explore the work <ArrowRight size={14} aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* ── Right: hero bento (4 cols desktop / 2 tablet / 1 mobile) ── */}
          <BentoGrid className="bento-grid--4 hp-rise hp-rise-3" aria-label="Featured work">
            {lastBell && (
              <BentoTile size="2x2" animate={false} className="bento-tile--flush">
                <img
                  src={lastBell.heroImage ?? lastBell.screenshots?.[0]}
                  alt="THE LAST BELL gameplay artwork"
                  width={800}
                  height={500}
                  fetchPriority="high"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/35 to-transparent"
                />
                <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/[0.16] bg-black/55 px-3 py-1 font-mono text-[10px] tracking-[0.14em] text-white backdrop-blur">
                  <span aria-hidden="true" className="bento-dot" />
                  LIVE ON GOOGLE PLAY
                </span>
                <div className="relative z-[2] flex h-full flex-col justify-end p-6">
                  <h3 className="bento-h text-xl">{lastBell.name}</h3>
                  <p className="mt-1 text-xs text-white/70">
                    {lastBell.shortTagline ?? lastBell.genre ?? 'Android game'}
                  </p>
                </div>
                <Link
                  href={lastBell.route}
                  aria-label={`Read the ${lastBell.name} case study`}
                  className="absolute inset-0 z-[3] rounded-[24px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[rgba(255,255,255,0.6)]"
                />
              </BentoTile>
            )}

            {[pakiGpa, subSight].map(
              (app, i) =>
                app && (
                  <BentoTile key={app.id} size="1x1" animate={false} index={i + 1}>
                    <Link
                      href={app.route}
                      aria-label={`View the ${app.name} case study`}
                      className="relative z-[2] flex h-full items-center gap-3"
                    >
                      <ProductIcon product={app} size="sm" />
                      <div className="min-w-0">
                        <h3 className="bento-h truncate text-sm">{app.name}</h3>
                        <p className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-[var(--text-muted)]">
                          {app.shortTagline ?? app.tagline}
                        </p>
                      </div>
                    </Link>
                  </BentoTile>
                ),
            )}

            {fantasyTextPro && (
              <BentoTile size="2x1" animate={false} index={3}>
                <Link
                  href={fantasyTextPro.route}
                  aria-label={`View the ${fantasyTextPro.name} case study`}
                  className="relative z-[2] flex h-full items-center gap-4"
                >
                  <ProductIcon product={fantasyTextPro} size="md" />
                  <div className="min-w-0 flex-1">
                    <h3 className="bento-h truncate text-base">{fantasyTextPro.name}</h3>
                    <p className="mt-0.5 line-clamp-1 text-xs text-[var(--text-muted)]">
                      {fantasyTextPro.shortTagline ?? fantasyTextPro.tagline}
                    </p>
                  </div>
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/[0.12] text-[var(--text-muted)]">
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </span>
                </Link>
              </BentoTile>
            )}

            <BentoTile size="1x1" animate={false} index={4}>
              <div className="relative z-[2] flex h-full flex-col justify-center">
                <p className="hp-stat-value font-display text-3xl font-black leading-none tracking-tight">
                  {productCount}
                </p>
                <p className="bento-kicker mt-2">Live on Google Play</p>
              </div>
            </BentoTile>

            <BentoTile size="1x1" animate={false} index={5}>
              <div className="relative z-[2] flex h-full flex-col justify-center">
                <p className="hp-stat-value font-display text-3xl font-black leading-none tracking-tight">
                  100%
                </p>
                <p className="bento-kicker mt-2">Offline-first</p>
              </div>
            </BentoTile>
          </BentoGrid>
        </div>

        {/* Tech ticker */}
        <div
          aria-hidden="true"
          className="hp-rise hp-rise-6 mt-14 overflow-hidden border-y border-white/[0.06] py-3.5"
          style={{
            WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)',
            maskImage: 'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)',
          }}
        >
          <div className="hp-marquee">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex shrink-0 items-center">
                {TICKER_ITEMS.map((item) => (
                  <span
                    key={`${copy}-${item}`}
                    className="flex items-center font-display text-[11px] font-bold tracking-[0.28em] text-white/35"
                  >
                    <span className="px-6">{item.toUpperCase()}</span>
                    <span className="h-1 w-1 rounded-full bg-white/40" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
