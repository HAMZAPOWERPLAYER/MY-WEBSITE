import { useMemo, useState } from 'react';
import { Link } from 'wouter';
import { Search } from 'lucide-react';
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
      title="Upcoming Android Games in Development | HAMZA POWERPLAYER"
      description="Explore upcoming Android game projects by HAMZA POWERPLAYER, view confirmed development status, and open the public source code where available."
      path="/games"
    >
      <PageHero label="GAME PROJECTS" title="Games" subtitle="Projects in development — no unreleased downloads" />
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
                    <span className="font-mono text-[10px] tracking-widest text-[var(--gold)]">COMING SOON</span>
                    <span className="font-mono text-xs text-[var(--text-muted)]">{game.platform}</span>
                  </div>
                  <h2 className="mt-1 font-display text-2xl font-black text-[var(--text-primary)]">{game.name}</h2>
                </div>
              </div>
              <p className="mt-4 min-h-12 font-accent text-sm leading-relaxed text-[var(--text-muted)]">
                {game.summary ?? 'Project details and gameplay information have not been published yet.'}
              </p>
              <Link href={game.route} className="mt-5 inline-flex rounded-lg border border-[rgba(0,240,255,0.25)] px-4 py-2 font-display text-xs font-bold tracking-wider text-[var(--neon-cyan)] hover:bg-[rgba(0,240,255,0.08)]">
                View project details
              </Link>
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
