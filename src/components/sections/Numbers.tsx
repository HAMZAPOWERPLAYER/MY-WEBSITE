import { APPS, GAMES, PROJECTS } from '@/lib/products';
import { SectionHeading } from '@/components/sections/SectionHeading';
import { BentoGrid, BentoTile } from '@/components/bento/BentoTile';
import type { BentoSize } from '@/components/bento/BentoTile';

const liveGames = GAMES.filter((game) => game.status === 'published');
const liveProducts = APPS.length + liveGames.length;

interface Stat {
  value: string;
  label: string;
  detail?: string;
  size: BentoSize;
}

/**
 * Facts only — every number here is already verifiable elsewhere on the
 * site (the product registry, GitHub, or the store listings). No invented
 * download counts or ratings.
 */
const STATS: Stat[] = [
  {
    value: String(liveProducts),
    label: 'Live on Google Play',
    detail: 'Every listing is maintained by one developer and verifiable on the store.',
    size: '2x1',
  },
  { value: String(PROJECTS.length), label: 'Public repositories', size: '1x1' },
  { value: String(APPS.length), label: 'Published apps', size: '1x1' },
  {
    value: '100%',
    label: 'Offline-first',
    detail: 'Core features keep working when the network does not.',
    size: '2x1',
  },
  { value: String(liveGames.length), label: 'Live game', size: '1x1' },
  { value: '1', label: 'Developer, end to end', size: '1x1' },
];

/**
 * Numbers — a bento strip of stat tiles. Wide 2x1 tiles carry a context
 * line; 1x1 tiles are pure number + label.
 */
export function Numbers() {
  return (
    <section id="numbers" className="relative scroll-mt-20 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Numbers"
          title="Small counts, kept honest."
          description="Counts, not vanity metrics — each one maps to something you can open and check."
        />

        <BentoGrid className="mt-12" aria-label="Key numbers">
          {STATS.map(({ value, label, detail, size }, index) => (
            <BentoTile key={label} size={size} index={index}>
              <div className="relative z-[2] flex h-full flex-col justify-center">
                <p className="bento-kicker">{label}</p>
                <p
                  className="hp-stat-value mt-2 font-display font-black leading-none tracking-tight"
                  style={{ fontSize: size === '2x1' ? 'clamp(2.6rem, 5vw, 4rem)' : 'clamp(2.2rem, 4vw, 3rem)' }}
                >
                  {value}
                </p>
                {detail && <p className="mt-2.5 max-w-xs text-sm leading-relaxed text-[var(--text-muted)]">{detail}</p>}
              </div>
            </BentoTile>
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}
