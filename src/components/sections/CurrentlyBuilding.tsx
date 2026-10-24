import { Link } from 'wouter';
import { ArrowUpRight, Github } from 'lucide-react';
import { GAMES, GITHUB_PROFILE_URL } from '@/lib/products';
import { StatusPill } from '@/components/product/ProductArtwork';

const upcoming = GAMES.filter((game) => game.status === 'coming-soon');

export function CurrentlyBuilding() {
  return (
    <section id="building" className="relative scroll-mt-20 border-t border-white/[0.06] py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="hp-eyebrow">In development</p>
            <h2 className="hp-h2 mt-4">What&apos;s next.</h2>
            <p className="mt-5 text-base leading-relaxed text-[var(--text-muted)]">
              Three Android games are in development. None of them has a release date, trailer, or
              store listing yet — this page will change when that is no longer true.
            </p>
            <a
              href={GITHUB_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.03] px-5 py-3 font-display text-xs font-bold tracking-wide text-[var(--text-primary)] transition-colors hover:border-white/30 hover:bg-white/[0.06]"
            >
              <Github size={14} aria-hidden="true" /> Follow the build
            </a>
          </div>

          <ul className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
            {upcoming.map((game, index) => (
              <li key={game.id}>
                <Link
                  href={game.route}
                  className="group flex items-center gap-4 py-5 transition-colors hover:bg-white/[0.02] sm:gap-6 sm:px-2"
                >
                  <span className="w-6 shrink-0 font-mono text-[11px] text-[var(--text-muted)]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-display text-base font-bold tracking-wide text-[var(--text-primary)]">
                      {game.name}
                    </h3>
                    <p className="mt-1 truncate text-xs text-[var(--text-muted)]">
                      {game.tagline ?? 'An upcoming Android title in early development.'}
                    </p>
                  </div>
                  <StatusPill status={game.status} className="hidden sm:inline-flex" />
                  <ArrowUpRight
                    size={16}
                    aria-hidden="true"
                    className="shrink-0 text-[var(--text-muted)] transition-colors group-hover:text-[var(--neon-cyan)]"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
