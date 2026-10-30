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
              className="hp-btn-ghost mt-7 px-5 py-3 font-display text-xs font-bold tracking-wide"
            >
              <Github size={14} aria-hidden="true" /> Follow the build
            </a>
          </div>

          <ul className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
            {upcoming.map((game, index) => (
              <li key={game.id} className="hp-row-hover relative">
                <Link
                  href={game.route}
                  className="group flex items-center gap-4 py-5 sm:gap-6 sm:px-2"
                >
                  <span className="hp-stat-value w-6 shrink-0 font-mono text-[11px] font-bold">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-display text-base font-bold tracking-wide text-[var(--text-primary)] transition-colors group-hover:text-[var(--neon-cyan)]">
                      {game.name}
                    </h3>
                    <p className="mt-1 truncate text-xs text-[var(--text-muted)]">
                      {game.tagline ?? 'An upcoming Android title in early development.'}
                    </p>
                  </div>
                  <StatusPill status={game.status} className="hidden sm:inline-flex" />
                  <span
                    aria-hidden="true"
                    className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 text-[var(--text-muted)] transition-all duration-300 group-hover:translate-x-0.5 group-hover:border-[rgba(0,240,255,0.35)] group-hover:text-[var(--neon-cyan)] group-hover:shadow-[0_0_16px_rgba(0,240,255,0.2)]"
                  >
                    <ArrowUpRight size={15} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
