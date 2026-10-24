import { useMemo, useState } from 'react';
import { Link } from 'wouter';
import { ArrowRight, ArrowUpRight, Check, Play, Search } from 'lucide-react';
import { PageLayout } from '@/components/layout/PageLayout';
import { MonogramArt, ProductIcon, StatusPill } from '@/components/product/ProductArtwork';
import { GAMES } from '@/lib/products';

export default function GamesPage() {
  const [search, setSearch] = useState('');
  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return GAMES.filter((game) =>
      !query || `${game.name} ${game.summary ?? ''} ${game.genre ?? ''}`.toLowerCase().includes(query),
    );
  }, [search]);

  return (
    <PageLayout
      title="Android Games by HAMZA POWERPLAYER | Live & Upcoming"
      description="Explore The Last Bell, now live on Google Play, plus upcoming Android game projects by HAMZA POWERPLAYER. View status, details, and public source code."
      path="/games"
    >
      <section className="border-b border-white/[0.06]">
        <div className="mx-auto max-w-6xl px-6 pb-10 pt-14 sm:pt-16">
          <p className="hp-eyebrow">Android games</p>
          <h1 className="hp-display mt-4 text-[clamp(2.6rem,7vw,4.5rem)] text-[var(--text-primary)]">
            Games
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--text-muted)]">
            The Last Bell is live on Google Play. Three more Android games are in development, with
            no release dates announced yet.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 py-10">
        <label className="relative block max-w-md">
          <span className="sr-only">Search games</span>
          <Search
            size={16}
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
          />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="hp-input"
            placeholder="Search games"
            type="search"
          />
        </label>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {filtered.map((game) => {
            const isPublished = game.status === 'published';

            if (isPublished) {
              return (
                <article key={game.id} className="hp-card overflow-hidden md:col-span-2">
                  <div className="grid md:grid-cols-[1.15fr_0.85fr]">
                    <Link
                      href={game.route}
                      className="group relative block aspect-video overflow-hidden bg-[#070712] md:aspect-auto md:min-h-[340px]"
                      aria-label={`View the ${game.name} case study`}
                    >
                      <img
                        src={game.heroImage ?? game.screenshots?.[0]}
                        alt={`${game.name} gameplay`}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent"
                      />
                      <div className="absolute left-4 top-4">
                        <StatusPill status={game.status} />
                      </div>
                    </Link>

                    <div className="flex flex-col justify-center p-6 sm:p-8">
                      <div className="flex items-center gap-3">
                        <ProductIcon product={game} size="md" />
                        <div>
                          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
                            Android game
                          </p>
                          <h2 className="font-display text-xl font-black tracking-wide text-[var(--text-primary)]">
                            {game.name}
                          </h2>
                        </div>
                      </div>

                      <p className="mt-4 text-sm leading-relaxed text-[var(--text-muted)]">{game.tagline}</p>

                      {game.gameplay && (
                        <ul className="mt-5 space-y-2">
                          {game.gameplay.slice(0, 3).map((item) => (
                            <li key={item} className="flex items-start gap-2 text-xs leading-relaxed text-[var(--text-muted)]">
                              <Check size={13} aria-hidden="true" className="mt-0.5 shrink-0 text-[var(--neon-cyan)]" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      <div className="mt-6 flex flex-wrap gap-3">
                        <Link
                          href={game.route}
                          className="inline-flex items-center gap-2 rounded-xl bg-[var(--neon-cyan)] px-4 py-2.5 font-display text-[11px] font-black tracking-wide text-[#04040a]"
                        >
                          View case study <ArrowRight size={13} aria-hidden="true" />
                        </Link>
                        {game.storeUrl && (
                          <a
                            href={game.storeUrl}
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
              );
            }

            return (
              <article key={game.id} className="hp-card hp-card-hover group overflow-hidden">
                <Link
                  href={game.route}
                  className="relative block aspect-[16/9] overflow-hidden"
                  aria-label={`View the ${game.name} project preview`}
                >
                  <MonogramArt product={game} className="h-full w-full" />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent"
                  />
                  <div className="absolute left-4 top-4">
                    <StatusPill status={game.status} />
                  </div>
                  <div className="absolute inset-x-4 bottom-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/60">
                      {game.platform} · Project preview
                    </p>
                    <h2 className="mt-1 font-display text-xl font-black tracking-wide text-white">
                      {game.name}
                    </h2>
                  </div>
                </Link>

                <div className="p-5">
                  <p className="text-xs leading-relaxed text-[var(--text-muted)]">
                    {game.summary ?? 'Project details and gameplay information have not been published yet.'}
                  </p>
                  <Link
                    href={game.route}
                    className="mt-4 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--neon-cyan)] transition-opacity hover:opacity-80"
                  >
                    Project details <ArrowUpRight size={12} aria-hidden="true" />
                  </Link>
                </div>
              </article>
            );
          })}

          {filtered.length === 0 && (
            <p className="py-16 text-center text-sm text-[var(--text-muted)] md:col-span-2">
              No games match that search.
            </p>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
