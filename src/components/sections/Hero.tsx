import { Link } from 'wouter';
import { ArrowRight, ArrowUpRight, Play } from 'lucide-react';
import { APPS, GAMES } from '@/lib/products';
import { ProductIcon } from '@/components/product/ProductArtwork';

const lastBell = GAMES.find((game) => game.slug === 'the-last-bell');
const featuredApps = APPS.filter((app) => app.status === 'published');

export function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden pb-16 pt-28 sm:pb-24 sm:pt-36">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hp-ambient" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hp-grid-bg opacity-70" />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] lg:gap-16">
          <div className="min-w-0">
            <p className="hp-eyebrow">Independent app &amp; game developer</p>

            <h1 className="hp-display mt-5 text-[var(--text-primary)]">
              <span className="block whitespace-nowrap text-[clamp(3.2rem,11vw,6.6rem)]">HAMZA</span>
              <span className="mt-1 block whitespace-nowrap bg-gradient-to-r from-[var(--neon-cyan)] via-[#8ab4ff] to-[#a78bfa] bg-clip-text text-[clamp(2rem,5.6vw,4rem)] text-transparent">
                POWERPLAYER
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--text-muted)] sm:text-lg">
              I design, build, and ship Android apps and games. Three products are live on Google
              Play: PakiGPA, SubSight, and The Last Bell.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#work"
                className="inline-flex items-center gap-2 rounded-xl bg-[var(--neon-cyan)] px-5 py-3 font-display text-xs font-black tracking-wide text-[#04040a] transition-transform hover:-translate-y-0.5"
              >
                Explore the work <ArrowRight size={14} aria-hidden="true" />
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.03] px-5 py-3 font-display text-xs font-bold tracking-wide text-[var(--text-primary)] transition-colors hover:border-white/30 hover:bg-white/[0.06]"
              >
                Start a conversation
              </Link>
            </div>

            <p className="mt-7 flex items-center gap-2 font-mono text-[10px] tracking-[0.16em] text-[var(--text-muted)]">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[var(--success)]" />
              BASED IN PAKISTAN · WORKING WORLDWIDE
            </p>
          </div>

          {/* Live product proof */}
          <div className="relative min-w-0">
            <div
              aria-hidden="true"
              className="absolute -inset-6 rounded-[2rem] bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.28),transparent_70%)] blur-2xl"
            />

            {lastBell && (
              <Link
                href={lastBell.route}
                className="group relative block overflow-hidden rounded-2xl border border-white/10 bg-[#070712] shadow-[0_30px_80px_rgba(0,0,0,0.45)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={lastBell.heroImage ?? lastBell.screenshots?.[0]}
                    alt="The Last Bell gameplay artwork"
                    width={800}
                    height={500}
                    fetchPriority="high"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[#04040a] via-[#04040a]/55 to-transparent"
                  />
                  <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-[rgba(0,255,136,0.3)] bg-black/50 px-2.5 py-1 font-mono text-[10px] tracking-[0.14em] text-[var(--success)] backdrop-blur">
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
                        <p className="truncate text-xs text-white/65">
                          {lastBell.shortTagline ?? lastBell.genre ?? 'Android game'}
                        </p>
                      </div>
                    </div>
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur transition-colors group-hover:bg-white/15">
                      <ArrowUpRight size={15} aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </Link>
            )}

            <div className="mt-3 grid gap-2.5">
              {featuredApps.map((app) => (
                <Link
                  key={app.id}
                  href={app.route}
                  className="hp-card hp-card-hover group flex items-center gap-3.5 p-3.5"
                >
                  <ProductIcon product={app} size="md" />
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-sm font-bold text-[var(--text-primary)]">{app.name}</p>
                    <p className="mt-0.5 truncate text-[11px] text-[var(--text-muted)]">
                      {app.shortTagline ?? app.tagline}
                    </p>
                  </div>
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 text-[var(--text-muted)] transition-colors group-hover:border-[rgba(0,240,255,0.3)] group-hover:text-[var(--neon-cyan)]">
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </div>

            <p className="mt-4 flex items-center gap-2 pl-1 font-mono text-[10px] tracking-[0.12em] text-[var(--text-muted)]">
              <Play size={10} aria-hidden="true" className="text-[var(--success)]" />
              THREE LIVE PRODUCTS · ONE DEVELOPER
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
