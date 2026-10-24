import { Link } from 'wouter';
import { ArrowRight, ArrowUpRight, Check, Play } from 'lucide-react';
import { APPS, GAMES, PROJECTS } from '@/lib/products';
import { ProductIcon, ProductMedia, StatusPill } from '@/components/product/ProductArtwork';

const lastBell = GAMES.find((game) => game.slug === 'the-last-bell');
const publishedApps = APPS.filter((app) => app.status === 'published');

export function ProductShowcase() {
  return (
    <section id="work" className="relative scroll-mt-20 border-t border-white/[0.06] py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="hp-eyebrow">Selected work</p>
            <h2 className="hp-h2 mt-4">Shipped, live, and maintained.</h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--text-muted)]">
              Real products with public listings and verifiable store pages. Every case study
              links to the official store page or the source repository.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 font-mono text-[11px] uppercase tracking-[0.14em]">
            <Link href="/apps" className="inline-flex items-center gap-1.5 text-[var(--neon-cyan)] transition-opacity hover:opacity-80">
              Apps <ArrowUpRight size={12} aria-hidden="true" />
            </Link>
            <Link href="/games" className="inline-flex items-center gap-1.5 text-[var(--neon-cyan)] transition-opacity hover:opacity-80">
              Games <ArrowUpRight size={12} aria-hidden="true" />
            </Link>
          </div>
        </div>

        {lastBell && (
          <article className="hp-card mt-10 overflow-hidden">
            <div className="grid md:grid-cols-[1.06fr_0.94fr]">
              <Link
                href={lastBell.route}
                className="group relative block aspect-video overflow-hidden bg-[#070712] md:aspect-auto md:min-h-[400px]"
                aria-label={`View the ${lastBell.name} case study`}
              >
                <img
                  src={lastBell.heroImage ?? lastBell.screenshots?.[0]}
                  alt={`${lastBell.name} gameplay`}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent"
                />
                <div className="absolute left-4 top-4">
                  <StatusPill status={lastBell.status} />
                </div>
              </Link>

              <div className="flex flex-col justify-center p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <ProductIcon product={lastBell} size="md" />
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
                      Android game
                    </p>
                    <h3 className="font-display text-xl font-black tracking-wide text-[var(--text-primary)]">
                      {lastBell.name}
                    </h3>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-[var(--text-muted)]">
                  {lastBell.tagline}
                </p>

                {lastBell.gameplay && (
                  <ul className="mt-5 space-y-2">
                    {lastBell.gameplay.slice(0, 3).map((item) => (
                      <li key={item} className="flex items-start gap-2 text-xs leading-relaxed text-[var(--text-muted)]">
                        <Check size={13} aria-hidden="true" className="mt-0.5 shrink-0 text-[var(--neon-cyan)]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href={lastBell.route}
                    className="inline-flex items-center gap-2 rounded-xl bg-[var(--neon-cyan)] px-4 py-2.5 font-display text-[11px] font-black tracking-wide text-[#04040a] transition-transform hover:-translate-y-0.5"
                  >
                    Read the case study <ArrowRight size={13} aria-hidden="true" />
                  </Link>
                  {lastBell.storeUrl && (
                    <a
                      href={lastBell.storeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-4 py-2.5 font-display text-[11px] font-bold tracking-wide text-[var(--text-primary)] transition-colors hover:bg-white/[0.06]"
                    >
                      <Play size={12} fill="currentColor" aria-hidden="true" /> Google Play
                    </a>
                  )}
                </div>
              </div>
            </div>
          </article>
        )}

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {publishedApps.map((app) => (
            <article key={app.id} className="hp-card hp-card-hover group overflow-hidden">
              <Link
                href={app.route}
                className="block p-3"
                aria-label={`View the ${app.name} case study`}
              >
                <ProductMedia
                  src={app.heroImage ?? app.screenshots?.[0] ?? app.iconUrl ?? ''}
                  alt={`${app.name} app screenshot`}
                  className="aspect-[4/3] rounded-xl border border-white/[0.08]"
                  imageClassName="transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </Link>

              <div className="p-5 pt-2">
                <div className="flex items-center gap-3">
                  <ProductIcon product={app} size="md" />
                  <div className="min-w-0">
                    <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--success)]">
                      Live · {app.platform}
                    </p>
                    <h3 className="truncate font-display text-lg font-black text-[var(--text-primary)]">{app.name}</h3>
                  </div>
                </div>

                <p className="mt-3 text-sm text-[var(--text-primary)]">{app.tagline}</p>
                <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-[var(--text-muted)]">
                  {app.summary}
                </p>

                {app.keywords && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {app.keywords.slice(0, 3).map((keyword) => (
                      <span
                        key={keyword}
                        className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] text-[var(--text-muted)]"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-5 flex items-center justify-between gap-3">
                  <Link
                    href={app.route}
                    className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--neon-cyan)] transition-opacity hover:opacity-80"
                  >
                    View case study <ArrowRight size={12} aria-hidden="true" />
                  </Link>
                  {app.storeUrl && (
                    <a
                      href={app.storeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${app.name} on Google Play`}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/12 text-[var(--text-muted)] transition-colors hover:border-[rgba(0,240,255,0.3)] hover:text-[var(--neon-cyan)]"
                    >
                      <Play size={12} fill="currentColor" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-4 rounded-xl border border-white/[0.07] bg-white/[0.02] p-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm leading-relaxed text-[var(--text-muted)]">
            <span className="font-medium text-[var(--text-primary)]">
              {PROJECTS.length} public repositories
            </span>{' '}
            — offline tools, PDF utilities, and open-source experiments.
          </p>
          <Link
            href="/projects"
            className="inline-flex shrink-0 items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--neon-cyan)] transition-opacity hover:opacity-80"
          >
            Browse the source <ArrowRight size={12} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
