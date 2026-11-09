import { Link } from 'wouter';
import { ArrowUpRight, CalendarX, Github, Layers } from 'lucide-react';
import { GAMES, GITHUB_PROFILE_URL } from '@/lib/products';
import { SectionHeading } from '@/components/sections/SectionHeading';
import { BentoGrid, BentoTile } from '@/components/bento/BentoTile';

const upcoming = GAMES.filter((game) => game.status === 'coming-soon');

/**
 * The Lab — games in development, one tile per title plus an honest
 * status tile and a GitHub follow tile. No dates, no trailers, no
 * store listings — the copy says exactly that.
 */
export function CurrentlyBuilding() {
  return (
    <section id="building" className="relative scroll-mt-20 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="The lab"
          title="What's next."
          description="Android games in development. None of them has a release date, trailer, or store listing yet — this page will change when that is no longer true."
        />

        <BentoGrid className="mt-12" aria-label="Games in development">
          {upcoming.map((game, index) => (
            <BentoTile key={game.id} size={index === 0 ? '2x1' : '1x1'} index={index}>
              <Link
                href={game.route}
                aria-label={`${game.name} — read the development notes`}
                className="relative z-[2] flex h-full flex-col justify-center"
              >
                <p className="bento-kicker">
                  <span aria-hidden="true" className="bento-dot" />
                  In development
                </p>
                <h3 className="bento-h mt-2 truncate text-lg">{game.name}</h3>
                <p className="mt-1 line-clamp-1 text-sm text-[var(--text-muted)]">
                  {game.tagline ?? 'An upcoming Android title in early development.'}
                </p>
              </Link>
            </BentoTile>
          ))}

          <BentoTile size="2x1" index={3}>
            <div className="relative z-[2] flex h-full items-center gap-5">
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/12 bg-white/[0.05] text-[var(--text-primary)]">
                <CalendarX size={21} aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <h3 className="bento-h text-lg">No dates. No trailers.</h3>
                <p className="mt-1 text-sm leading-relaxed text-[var(--text-muted)]">
                  Releases are announced only when they exist. This page changes the day any of
                  that is no longer true.
                </p>
              </div>
            </div>
          </BentoTile>

          <BentoTile size="1x1" index={4}>
            <div className="relative z-[2] flex h-full flex-col justify-center">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/12 bg-white/[0.05] text-[var(--text-primary)]">
                <Layers size={19} aria-hidden="true" />
              </span>
              <p className="hp-stat-value mt-3 font-display text-3xl font-black leading-none tracking-tight">
                {upcoming.length}
              </p>
              <p className="bento-kicker mt-2">In the pipeline</p>
            </div>
          </BentoTile>

          <BentoTile size="1x1" index={5}>
            <a
              href={GITHUB_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-[2] flex h-full flex-col justify-center"
              aria-label="Follow the build on GitHub (opens in a new tab)"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/12 bg-white/[0.05] text-[var(--text-primary)]">
                <Github size={19} aria-hidden="true" />
              </span>
              <h3 className="bento-h mt-4 text-base">Follow the build</h3>
              <p className="bento-link mt-2">
                @HAMZAPOWERPLAYER <ArrowUpRight size={12} aria-hidden="true" />
              </p>
            </a>
          </BentoTile>
        </BentoGrid>
      </div>
    </section>
  );
}
