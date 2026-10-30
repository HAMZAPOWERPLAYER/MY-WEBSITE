import { Link } from 'wouter';
import { ArrowRight, ArrowUpRight, Check, Play } from 'lucide-react';
import { APPS, GAMES, PROJECTS } from '@/lib/products';
import { ProductIcon, ProductMedia, StatusPill, statusLabel } from '@/components/product/ProductArtwork';
import { SectionHeading } from '@/components/sections/SectionHeading';
import { Reveal } from '@/components/effects/ScrollReveal';
import { Tilt3D } from '@/components/effects/Tilt3D';

const lastBell = GAMES.find((game) => game.slug === 'the-last-bell');
const publishedApps = APPS.filter((app) => app.status === 'published');

export function ProductShowcase() {
  return (
    <section id="work" className="relative scroll-mt-20 border-t border-white/[0.06] py-20 sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_44%_at_50%_0%,rgba(0,240,255,0.045),transparent_70%)]"
      />
      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Selected work"
          title="Shipped, live, and maintained."
          description="Real products with public listings and verifiable store pages. Every case study links to the official store page or the source repository."
          aside={
            <>
              <Link href="/apps" className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--text-muted)] transition-colors hover:text-[var(--neon-cyan)]">
                Apps <ArrowUpRight size={12} aria-hidden="true" />
              </Link>
              <Link href="/games" className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--text-muted)] transition-colors hover:text-[var(--neon-cyan)]">
                Games <ArrowUpRight size={12} aria-hidden="true" />
              </Link>
            </>
          }
        />

        {lastBell && (
          <Reveal variant="slide-up" distance={30} delay={0.1}>
            <div className="hp-beam mt-12 rounded-3xl">
              <Tilt3D maxTilt={5} liftScale={1.01} className="w-full">
                <article className="hp-card overflow-hidden !rounded-3xl">
                <div className="grid md:grid-cols-[1.06fr_0.94fr]">
                  <Link
                    href={lastBell.route}
                    className="group relative block aspect-video overflow-hidden bg-[#070712] md:aspect-auto md:min-h-[420px]"
                    aria-label={`${lastBell.name} gameplay — ${statusLabel(lastBell.status)} — view the case study`}
                  >
                    <img
                      src={lastBell.heroImage ?? lastBell.screenshots?.[0]}
                      alt={`${lastBell.name} gameplay`}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                    />
                    <div className="absolute left-4 top-4">
                      <StatusPill status={lastBell.status} />
                    </div>
                  </Link>

                  <div className="relative z-10 flex flex-col justify-center p-6 sm:p-8">
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
                      <ul className="mt-5 space-y-2.5">
                        {lastBell.gameplay.slice(0, 3).map((item) => (
                          <li key={item} className="flex items-start gap-2.5 text-xs leading-relaxed text-[var(--text-muted)]">
                            <span className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[rgba(0,240,255,0.1)]">
                              <Check size={10} aria-hidden="true" className="text-[var(--neon-cyan)]" />
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="mt-7 flex flex-wrap gap-3">
                      <Link
                        href={lastBell.route}
                        className="hp-btn-pro px-5 py-2.5 font-display text-[11px] font-black tracking-wide"
                      >
                        Read the case study <ArrowRight size={13} aria-hidden="true" />
                      </Link>
                      {lastBell.storeUrl && (
                        <a
                          href={lastBell.storeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hp-btn-ghost px-5 py-2.5 font-display text-[11px] font-bold tracking-wide"
                        >
                          <Play size={12} fill="currentColor" aria-hidden="true" /> Google Play
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </article>
              </Tilt3D>
            </div>
          </Reveal>
        )}

        {/* Published apps — bento pair */}
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {publishedApps.map((app, index) => (
            <Reveal key={app.id} variant="slide-up" distance={26} delay={0.08 * index}>
              <Tilt3D className="hp-card hp-card-hover hp-card-spot hp-hairline group relative h-full overflow-hidden">
                <Link
                  href={app.route}
                  className="relative z-10 block p-3"
                  aria-label={`View the ${app.name} case study`}
                >
                  <ProductMedia
                    src={app.heroImage ?? app.screenshots?.[0] ?? app.iconUrl ?? ''}
                    alt={`${app.name} app screenshot`}
                    className="aspect-[4/3] rounded-xl border border-white/[0.08]"
                    imageClassName="transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </Link>

                <div className="relative z-10 p-5 pt-2">
                  <div className="flex items-center gap-3">
                    <ProductIcon product={app} size="md" />
                    <div className="min-w-0">
                      <p className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--success)]">
                        <span aria-hidden="true" className="h-1 w-1 rounded-full bg-[var(--success)]" />
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
                          className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] text-[var(--text-muted)] transition-colors group-hover:border-[rgba(0,240,255,0.2)]"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-5 flex items-center justify-between gap-3">
                    <Link
                      href={app.route}
                      className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--neon-cyan)] transition-all group-hover:gap-2.5"
                    >
                      View case study <ArrowRight size={12} aria-hidden="true" />
                    </Link>
                    {app.storeUrl && (
                      <a
                        href={app.storeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${app.name} on Google Play`}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-[var(--text-muted)] transition-all group-hover:border-[rgba(0,240,255,0.3)] group-hover:text-[var(--neon-cyan)]"
                      >
                        <Play size={12} fill="currentColor" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </div>
              </Tilt3D>
            </Reveal>
          ))}
        </div>

        {/* Source strip */}
        <Reveal variant="slide-up" distance={20} delay={0.1}>
          <div className="hp-card hp-card-hover relative mt-10 flex flex-col gap-4 overflow-hidden p-5 sm:flex-row sm:items-center sm:justify-between">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-70"
              style={{ background: 'var(--hp-grad-deep)' }}
            />
            <p className="relative z-10 text-sm leading-relaxed text-[var(--text-muted)]">
              <span className="font-medium text-[var(--text-primary)]">
                {PROJECTS.length} public repositories
              </span>{' '}
              — offline tools, PDF utilities, and open-source experiments.
            </p>
            <Link
              href="/projects"
              className="relative z-10 inline-flex shrink-0 items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--neon-cyan)] transition-opacity hover:opacity-80"
            >
              Browse the source <ArrowRight size={12} aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
