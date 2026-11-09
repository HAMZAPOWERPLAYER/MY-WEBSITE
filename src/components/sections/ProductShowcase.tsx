import { Link } from 'wouter';
import { ArrowRight, ArrowUpRight, FolderGit2, Play } from 'lucide-react';
import { APPS, GAMES, PROJECTS } from '@/lib/products';
import { ProductIcon } from '@/components/product/ProductArtwork';
import { SectionHeading } from '@/components/sections/SectionHeading';
import { BentoGrid, BentoTile } from '@/components/bento/BentoTile';

const lastBell = GAMES.find((game) => game.slug === 'the-last-bell');
const publishedApps = APPS.filter((app) => app.status === 'published');

/**
 * Featured Projects — bento grid. One idea per tile: one app, one game,
 * one repository strip. The headline release gets the 2x2 tile; each live
 * app gets a wide 2x1 tile.
 */
export function ProductShowcase() {
  return (
    <section id="work" className="relative scroll-mt-20 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Selected work"
          title="Shipped, live, and maintained."
          description="Real products with public listings and verifiable store pages. Every tile links to the official store page or the source repository."
          aside={
            <>
              <Link href="/apps" className="bento-link">
                Apps <ArrowUpRight size={12} aria-hidden="true" />
              </Link>
              <Link href="/games" className="bento-link">
                Games <ArrowUpRight size={12} aria-hidden="true" />
              </Link>
            </>
          }
        />

        <BentoGrid className="mt-12" aria-label="Featured projects">
          {lastBell && (
            <BentoTile size="2x2" index={0} className="bento-tile--flush">
              <img
                src={lastBell.heroImage ?? lastBell.screenshots?.[0]}
                alt=""
                loading="lazy"
                decoding="async"
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/45 to-transparent"
              />
              <div className="relative z-[2] flex h-full flex-col justify-end p-6">
                <p className="bento-kicker">
                  <span aria-hidden="true" className="bento-dot" />
                  Live · {lastBell.genre ?? 'Android game'}
                </p>
                <h3 className="bento-h mt-2 text-2xl">{lastBell.name}</h3>
                <p className="mt-1.5 line-clamp-2 max-w-md text-sm text-[var(--text-muted)]">
                  {lastBell.tagline}
                </p>
                <div className="mt-4 flex items-center gap-4">
                  <Link
                    href={lastBell.route}
                    aria-label={`Read the ${lastBell.name} case study`}
                    className="bento-link"
                  >
                    Case study <ArrowRight size={12} aria-hidden="true" />
                  </Link>
                  {lastBell.storeUrl && (
                    <a
                      href={lastBell.storeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${lastBell.name} on Google Play`}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 text-[var(--text-primary)] transition-colors hover:border-white/30"
                    >
                      <Play size={12} fill="currentColor" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>
              <Link
                href={lastBell.route}
                aria-label={`View the ${lastBell.name} case study`}
                className="absolute inset-0 z-[3] rounded-[24px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[rgba(255,255,255,0.6)]"
              />
            </BentoTile>
          )}

          {publishedApps.map((app, i) => (
            <BentoTile key={app.id} size="2x1" index={i + 1}>
              <div className="relative z-[2] flex h-full items-center gap-5">
                <ProductIcon product={app} size="lg" />
                <div className="min-w-0 flex-1">
                  <p className="bento-kicker">
                    <span aria-hidden="true" className="bento-dot" />
                    Live · {app.platform ?? 'Android'}
                  </p>
                  <h3 className="bento-h mt-1.5 text-lg">{app.name}</h3>
                  <p className="mt-1 line-clamp-1 text-sm text-[var(--text-muted)]">
                    {app.shortTagline ?? app.tagline}
                  </p>
                  <Link
                    href={app.route}
                    className="bento-link mt-3"
                    aria-label={`View the ${app.name} case study`}
                  >
                    Case study <ArrowRight size={12} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </BentoTile>
          ))}

          <BentoTile size="2x1" index={4}>
            <div className="relative z-[2] flex h-full flex-col justify-center gap-3">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/12 bg-white/[0.05] text-[var(--text-primary)]">
                <FolderGit2 size={19} aria-hidden="true" />
              </span>
              <div>
                <h3 className="bento-h text-lg">Open source</h3>
                <p className="mt-1 text-sm text-[var(--text-muted)]">
                  <span className="font-semibold text-[var(--text-primary)]">{PROJECTS.length} public repositories</span>{' '}
                  — offline tools, PDF utilities, and open-source experiments.
                </p>
              </div>
              <Link href="/projects" className="bento-link" aria-label="Browse the source repositories">
                Browse the source <ArrowRight size={12} aria-hidden="true" />
              </Link>
            </div>
          </BentoTile>
        </BentoGrid>
      </div>
    </section>
  );
}
