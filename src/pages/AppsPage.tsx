import { useMemo, useState } from 'react';
import { Link } from 'wouter';
import { ArrowRight, Play, Search } from 'lucide-react';
import { PageLayout } from '@/components/layout/PageLayout';
import { ProductIcon, ProductMedia, StatusPill } from '@/components/product/ProductArtwork';
import { APPS, getVerifiedAltDownloads } from '@/lib/products';

export default function AppsPage() {
  const [search, setSearch] = useState('');
  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return APPS.filter(
      (app) => !query || `${app.name} ${app.summary ?? ''} ${app.keywords?.join(' ') ?? ''}`.toLowerCase().includes(query),
    );
  }, [search]);

  return (
    <PageLayout
      title="HAMZA POWERPLAYER Android Apps | Official Listings"
      description="Explore Android apps by HAMZA POWERPLAYER, browse product case studies, and open the confirmed Google Play listings for PakiGPA and SubSight."
      path="/apps"
      schemas={[JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "@id": "https://www.hamzapowerplayer.com/apps#webpage",
        "url": "https://www.hamzapowerplayer.com/apps",
        "name": "Android Apps by HAMZA POWERPLAYER",
        "description": "Explore Android apps by HAMZA POWERPLAYER.",
        "mainEntity": {
          "@type": "ItemList",
          "name": "Apps by HAMZA POWERPLAYER",
          "itemListElement": APPS.map((app, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": app.name,
            "url": `https://www.hamzapowerplayer.com${app.route}`,
          })),
        },
      })]}
    >
      <section className="border-b border-white/[0.06]">
        <div className="mx-auto max-w-6xl px-6 pb-10 pt-14 sm:pt-16">
          <p className="hp-eyebrow">Android apps</p>
          <h1 className="hp-display mt-4 text-[clamp(2.6rem,7vw,4.5rem)] text-[var(--text-primary)]">
            Apps
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--text-muted)]">
            Three apps, two on Google Play and one on Uptodown. All are built for daily use, work
            offline, and keep the interface out of the way.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 py-10">
        <label className="relative block max-w-md">
          <span className="sr-only">Search apps</span>
          <Search
            size={16}
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
          />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="hp-input"
            placeholder="Search apps"
            type="search"
          />
        </label>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {filtered.map((app) => {
            const altDownloads = getVerifiedAltDownloads(app);
            return (
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

                <div className="p-6 pt-3">
                  <div className="flex items-center gap-3">
                    <ProductIcon product={app} size="md" />
                    <div className="min-w-0">
                      <StatusPill status={app.status} label={`LIVE · ${app.platform}`} />
                      <h2 className="mt-1.5 truncate font-display text-xl font-black text-[var(--text-primary)]">{app.name}</h2>
                    </div>
                  </div>

                  <p className="mt-4 text-sm text-[var(--text-primary)]">{app.tagline}</p>
                  <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-[var(--text-muted)]">
                    {app.summary}
                  </p>

                  <div className="mt-5 flex flex-wrap items-center gap-2.5">
                    <Link
                      href={app.route}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--neon-cyan)] px-4 py-2 font-display text-[11px] font-black tracking-wide text-[#04040a]"
                    >
                      View app <ArrowRight size={12} aria-hidden="true" />
                    </Link>
                    {app.storeUrl && (
                      <a
                        href={app.storeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 px-4 py-2 font-display text-[11px] font-bold tracking-wide text-[var(--text-primary)] transition-colors hover:bg-white/[0.06]"
                      >
                        <Play size={11} fill="currentColor" aria-hidden="true" /> Google Play
                      </a>
                    )}
                    {altDownloads.map((download) => (
                      <a
                        key={download.url}
                        href={download.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 px-4 py-2 font-display text-[11px] font-bold tracking-wide text-[var(--text-muted)] transition-colors hover:bg-white/[0.06] hover:text-white"
                      >
                        {download.label}
                      </a>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}

          {filtered.length === 0 && (
            <p className="py-16 text-center text-sm text-[var(--text-muted)] md:col-span-2">
              No apps match your search.
            </p>
          )}
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/[0.06] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-[var(--text-muted)]">
            Games and public source projects are listed separately.
          </p>
          <div className="flex flex-wrap gap-5 font-mono text-[10px] uppercase tracking-[0.14em]">
            <Link href="/games" className="text-[var(--neon-cyan)] transition-opacity hover:opacity-80">
              Games
            </Link>
            <Link href="/projects" className="text-[var(--neon-cyan)] transition-opacity hover:opacity-80">
              Projects
            </Link>
            <a
              href="https://play.google.com/store/apps/dev?id=4745570286607188025"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-muted)] transition-colors hover:text-white"
            >
              Play developer profile
            </a>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
