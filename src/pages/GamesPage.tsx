import { useMemo, useState } from 'react';
import { Link } from 'wouter';
import { ArrowUpRight, Search } from 'lucide-react';
import { PageLayout } from '@/components/layout/PageLayout';
import { PageHero } from '@/components/layout/PageHero';
import { GAMES, initialsFor } from '@/lib/products';

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
      <PageHero label="ANDROID GAMES" title="Games" subtitle="The Last Bell is live on Google Play — more projects in development" />
      <div className="mx-auto max-w-6xl px-6 py-12">
        <label className="relative mx-auto mb-10 block max-w-xl">
          <span className="sr-only">Search games</span>
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full rounded-xl border border-[rgba(0,240,255,0.15)] bg-[rgba(255,255,255,0.03)] py-3 pl-11 pr-4 font-accent text-sm text-[var(--text-primary)] outline-none focus:border-[var(--neon-cyan)]"
            placeholder="Search games"
          />
        </label>

        <div className="grid gap-5 sm:grid-cols-2">
          {filtered.map((game) => (
            <article key={game.id} className="glass-card rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div
                  aria-hidden="true"
                  className="grid h-12 w-12 shrink-0 place-items-center rounded-xl font-display text-base font-black text-[#04040a]"
                  style={{ background: game.accent?.gradient ?? 'linear-gradient(135deg,#7c3aed,#00f0ff)' }}
                >
                  {initialsFor(game.name)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <span className={`font-mono text-[10px] tracking-widest ${game.status === 'published' ? 'text-[var(--success)]' : 'text-[var(--gold)]'}`}>
                      {game.status === 'published' ? 'LIVE ON GOOGLE PLAY' : 'COMING SOON'}
                    </span>
                    <span className="font-mono text-xs text-[var(--text-muted)]">{game.platform}</span>
                  </div>
                  <h2 className="mt-1 font-display text-2xl font-black text-[var(--text-primary)]">{game.name}</h2>
                </div>
              </div>
              <p className="mt-4 min-h-12 font-accent text-sm leading-relaxed text-[var(--text-muted)]">
                {game.summary ?? 'Project details and gameplay information have not been published yet.'}
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <Link href={game.route} className="inline-flex rounded-lg border border-[rgba(0,240,255,0.25)] px-4 py-2 font-display text-xs font-bold tracking-wider text-[var(--neon-cyan)] hover:bg-[rgba(0,240,255,0.08)]">
                  View project details
                </Link>
                {game.storeUrl && (
                  <a href={game.storeUrl} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-lg border border-[rgba(0,255,136,0.3)] px-4 py-2 font-display text-xs font-bold tracking-wider text-[var(--success)] hover:bg-[rgba(0,255,136,0.08)]">
                    Google Play <ArrowUpRight size={13} />
                  </a>
                )}
              </div>
            </article>
          ))}
          {filtered.length === 0 && (
            <p className="sm:col-span-2 py-12 text-center font-accent text-sm text-[var(--text-muted)]">No games match that search.</p>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
