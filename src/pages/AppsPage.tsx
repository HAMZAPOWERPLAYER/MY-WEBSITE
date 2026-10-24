import { useMemo, useState } from 'react';
import { Link } from 'wouter';
import { Search } from 'lucide-react';
import { PageLayout } from '@/components/layout/PageLayout';
import { PageHero } from '@/components/layout/PageHero';
import { APPS, getVerifiedAltDownloads, initialsFor } from '@/lib/products';

function Monogram({ name, gradient }: { name: string; gradient?: string }) {
  return (
    <div
      aria-hidden="true"
      className="grid h-12 w-12 shrink-0 place-items-center rounded-xl font-display text-base font-black text-[#04040a]"
      style={{ background: gradient ?? 'linear-gradient(135deg,#00f0ff,#7c3aed)' }}
    >
      {initialsFor(name)}
    </div>
  );
}

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
      description="Explore Android apps by HAMZA POWERPLAYER, browse product pages, and open the confirmed Google Play listings for PakiGPA and SubSight. Only live apps appear."
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
      <PageHero label="VERIFIED APP LISTING" title="Apps" subtitle="Only publicly verifiable store listings are shown here" />
      <div className="mx-auto max-w-5xl px-6 py-12">
        <label className="relative mx-auto mb-8 block max-w-xl">
          <span className="sr-only">Search apps</span>
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full rounded-xl border border-[rgba(0,240,255,0.15)] bg-[rgba(255,255,255,0.03)] py-3 pl-11 pr-4 font-accent text-sm text-[var(--text-primary)] outline-none focus:border-[var(--neon-cyan)]"
            placeholder="Search apps"
          />
        </label>
        <div className="grid gap-6 sm:grid-cols-2">
          {filtered.map((app) => {
            const altDownloads = getVerifiedAltDownloads(app);
            return (
              <article key={app.id} className="glass-card rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <Monogram name={app.name} gradient={app.accent?.gradient} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] tracking-widest text-[var(--success)]">PUBLISHED · {app.platform}</span>
                    </div>
                    <h2 className="mt-1 font-display text-2xl font-black text-[var(--text-primary)]">{app.name}</h2>
                  </div>
                </div>
                <p className="mt-4 min-h-12 font-accent text-sm leading-relaxed text-[var(--text-muted)]">{app.summary}</p>
                {app.packageId && (
                  <p className="mt-3 break-all font-mono text-[10px] text-[var(--text-muted)]">{app.packageId}</p>
                )}
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link href={app.route} className="inline-flex rounded-lg border border-[rgba(0,240,255,0.25)] px-4 py-2 font-display text-xs font-bold tracking-wider text-[var(--neon-cyan)] hover:bg-[rgba(0,240,255,0.08)]">
                    App details
                  </Link>
                  {app.storeUrl && (
                    <a href={app.storeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex rounded-lg bg-[var(--success)] px-4 py-2 font-display text-xs font-bold tracking-wider text-[#04040a]">
                      Google Play →
                    </a>
                  )}
                  {altDownloads.map((download) => (
                    <a key={download.url} href={download.url} target="_blank" rel="noopener noreferrer" className="inline-flex rounded-lg border border-[rgba(0,240,255,0.25)] px-4 py-2 font-display text-xs font-bold tracking-wider text-[var(--neon-cyan)]">
                      {download.label} →
                    </a>
                  ))}
                </div>
              </article>
            );
          })}
          {filtered.length === 0 && <p className="sm:col-span-2 py-12 text-center font-accent text-sm text-[var(--text-muted)]">No apps match your search.</p>}
        </div>
        <p className="mt-8 text-center font-accent text-xs text-[var(--text-muted)]">
          Source code projects and Android games are listed separately in <Link href="/projects" className="text-[var(--neon-cyan)]">Projects</Link> and <Link href="/games" className="text-[var(--neon-cyan)]">Games</Link>.
        </p>
      </div>
    </PageLayout>
  );
}
