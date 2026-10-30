import { Fragment } from 'react';
import { Link } from 'wouter';
import { ArrowRight, ArrowUpRight, Play, Sparkles } from 'lucide-react';
import { APPS, GAMES, PROJECTS } from '@/lib/products';
import { ProductIcon } from '@/components/product/ProductArtwork';
import { Tilt3D } from '@/components/effects/Tilt3D';

const lastBell = GAMES.find((game) => game.slug === 'the-last-bell');
const featuredApps = APPS.filter((app) => app.status === 'published');
const published = [...featuredApps, ...(lastBell ? [lastBell] : [])];
const productNames = published.map((product) => product.name).join(', ');
const productCount = published.length;

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

const HERO_STATS = [
  { value: String(productCount), label: 'Live on Google Play' },
  { value: String(PROJECTS.length), label: 'Public repositories' },
  { value: '100%', label: 'Offline-first by default' },
];

export function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden pb-14 pt-28 sm:pb-20 sm:pt-36">
      {/* Signature ambience — drifting aurora + precision grid */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hp-aurora" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hp-grid-bg opacity-60" />
      <div aria-hidden="true" className="pointer-events-none hp-grid-floor" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[var(--bg-base)] to-transparent"
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:gap-16">
          {/* ── Left: identity + CTA ── */}
          <div className="min-w-0">
            <div className="hp-rise hp-rise-1">
              <span className="inline-flex items-center gap-2.5 rounded-full border border-[rgba(0,240,255,0.22)] bg-[rgba(0,240,255,0.05)] px-4 py-1.5 backdrop-blur">
                <span aria-hidden="true" className="glow-dot" />
                <span className="font-mono text-[10px] font-medium tracking-[0.22em] text-[var(--neon-cyan)]">
                  INDEPENDENT APP &amp; GAME DEVELOPER
                </span>
              </span>
            </div>

            <div className="relative mt-6">
              <div aria-hidden="true" className="hp-title-halo -z-10" />
              <h1 className="hp-rise hp-rise-2 hp-display">
                <span className="hp-3d-text block whitespace-nowrap text-[clamp(3.2rem,11vw,6.6rem)] text-[var(--text-primary)]">
                  HAMZA
                </span>
                <span className="hp-3d-grad hp-gradient-text gradient-shimmer mt-1 block whitespace-nowrap text-[clamp(2rem,5.6vw,4rem)]">
                  POWERPLAYER
                </span>
              </h1>
            </div>

            <p className="hp-rise hp-rise-3 mt-6 max-w-xl text-base leading-relaxed text-[var(--text-muted)] sm:text-lg">
              I design, build, and ship Android apps and games end to end.{' '}
              <span className="font-medium text-[var(--text-primary)]">
                {productCount} products live on Google Play
              </span>
              : {productNames}.
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

            {/* Proof strip */}
            <dl className="hp-rise hp-rise-5 mt-10 flex flex-wrap items-stretch gap-y-4">
              {HERO_STATS.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`group relative flex flex-col-reverse ${index > 0 ? 'sm:ml-8 sm:border-l sm:border-white/[0.08] sm:pl-8' : ''}`}
                >
                  <dt className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                    {stat.label}
                  </dt>
                  <dd className="hp-stat-value font-display text-2xl font-black leading-none">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* ── Right: live product proof ── */}
          <div className="hp-rise hp-rise-3 relative min-w-0">
            <div
              aria-hidden="true"
              className="absolute -inset-8 rounded-[2.5rem] bg-[radial-gradient(ellipse_at_center,rgba(0,240,255,0.16),rgba(124,58,237,0.12)_55%,transparent_75%)] blur-2xl"
            />

            {lastBell && (
              <div className="hp-beam hp-float relative">
                <Tilt3D maxTilt={6} liftScale={1.015} className="w-full">
                  <Link
                    href={lastBell.route}
                    className="group relative block overflow-hidden rounded-2xl border border-white/10 bg-[#070712] shadow-[0_30px_90px_rgba(0,0,0,0.55)]"
                  >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={lastBell.heroImage ?? lastBell.screenshots?.[0]}
                      alt="The Last Bell gameplay artwork"
                      width={800}
                      height={500}
                      fetchPriority="high"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-[#04040a] via-[#04040a]/55 to-transparent"
                    />
                    <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-[rgba(0,255,136,0.3)] bg-black/55 px-2.5 py-1 font-mono text-[10px] tracking-[0.14em] text-[var(--success)] backdrop-blur">
                      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[var(--success)]" />
                      LIVE ON GOOGLE PLAY
                    </span>
                    <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-4">
                      <div className="flex min-w-0 items-center gap-3">
                        <ProductIcon product={lastBell} size="md" />
                        <div className="min-w-0">
                          <p className="truncate font-display text-lg font-black tracking-wide text-white">
                            {lastBell.name}
                          </p>
                          <p className="truncate text-xs text-white/70">
                            {lastBell.shortTagline ?? lastBell.genre ?? 'Android game'}
                          </p>
                        </div>
                      </div>
                      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur transition-all duration-300 group-hover:border-[rgba(0,240,255,0.5)] group-hover:bg-[rgba(0,240,255,0.15)] group-hover:text-[var(--neon-cyan)]">
                        <ArrowUpRight size={15} aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </Link>
                </Tilt3D>
              </div>
            )}

            <div className="mt-5 grid gap-3">
              {featuredApps.map((app) => (
                <Link
                  key={app.id}
                  href={app.route}
                  className="hp-card hp-card-hover hp-card-spot hp-hairline group relative flex items-center gap-3.5 p-3.5"
                >
                  <ProductIcon product={app} size="md" />
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-sm font-bold text-[var(--text-primary)]">{app.name}</p>
                    <p className="mt-0.5 truncate text-[11px] text-[var(--text-muted)]">
                      {app.shortTagline ?? app.tagline}
                    </p>
                  </div>
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 text-[var(--text-muted)] transition-all duration-300 group-hover:translate-x-0.5 group-hover:border-[rgba(0,240,255,0.35)] group-hover:text-[var(--neon-cyan)]">
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </div>

            <p className="mt-5 flex items-center gap-2 pl-1 font-mono text-[10px] tracking-[0.12em] text-[var(--text-muted)]">
              <Play size={10} aria-hidden="true" className="text-[var(--success)]" />
              {productCount} LIVE PRODUCTS · ONE DEVELOPER
            </p>
          </div>
        </div>

        {/* Tech ticker */}
        <div
          aria-hidden="true"
          className="hp-rise hp-rise-6 mt-16 overflow-hidden border-y border-white/[0.06] py-3.5"
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
                    <span className="h-1 w-1 rounded-full bg-[rgba(0,240,255,0.45)]" />
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
