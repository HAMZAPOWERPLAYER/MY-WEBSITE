import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { Link } from 'wouter';
import { PageLayout } from '@/components/layout/PageLayout';
import { PageHero } from '@/components/layout/PageHero';
import { SITE_LINKS, type LinkCategory } from '@/lib/siteLinks';

const CATEGORIES: Array<'All' | LinkCategory> = ['All', 'Apps', 'Games', 'Projects', 'GitHub', 'Social', 'Website'];

function isInternal(url: string) {
  return url.startsWith('/');
}

export default function LinksPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>('All');
  const links = useMemo(() => {
    const query = search.trim().toLowerCase();
    return SITE_LINKS.filter((item) => {
      const inCategory = category === 'All' || item.category === category;
      const matches = !query || `${item.title} ${item.associatedWith} ${item.url}`.toLowerCase().includes(query);
      return inCategory && matches;
    });
  }, [search, category]);

  return (
    <PageLayout
      title="HAMZA POWERPLAYER Official Links | Apps and Profiles"
      description="Search confirmed app listings, game pages, public GitHub repositories, and social profiles for HAMZA POWERPLAYER in one organized directory."
      path="/links"
    >
      <PageHero label="LINK DIRECTORY" title="Links" subtitle="Product pages and public profiles in one place" />
      <div className="max-w-6xl mx-auto px-6 py-12">
        <label className="relative block max-w-xl mx-auto mb-6">
          <span className="sr-only">Search links</span>
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full rounded-xl border border-[rgba(0,240,255,0.15)] bg-[rgba(255,255,255,0.03)] py-3 pl-11 pr-4 font-accent text-sm text-[var(--text-primary)] outline-none focus:border-[var(--neon-cyan)]"
            placeholder="Search by title, product, or URL"
          />
        </label>
        <div className="mb-8 flex flex-wrap justify-center gap-2" aria-label="Filter links by category">
          {CATEGORIES.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={category === item}
              onClick={() => setCategory(item)}
              className={`rounded-full border px-4 py-2 font-mono text-xs transition-colors ${category === item ? 'border-[var(--neon-cyan)] bg-[rgba(0,240,255,0.1)] text-[var(--neon-cyan)]' : 'border-white/10 text-[var(--text-muted)] hover:text-white'}`}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {links.map((item) => (
            <article key={`${item.category}:${item.url}`} className="glass-card flex items-center justify-between gap-4 rounded-xl p-4">
              <div className="min-w-0">
                <h2 className="font-display text-sm font-bold text-[var(--text-primary)]">{item.title}</h2>
                <p className="mt-1 truncate font-mono text-[10px] text-[var(--text-muted)]">{item.associatedWith} · {item.category}</p>
              </div>
              {isInternal(item.url) ? (
                <Link href={item.url} className="shrink-0 rounded-lg border border-[rgba(0,240,255,0.2)] px-3 py-2 font-mono text-xs text-[var(--neon-cyan)]">Open</Link>
              ) : (
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="shrink-0 rounded-lg border border-[rgba(0,240,255,0.2)] px-3 py-2 font-mono text-xs text-[var(--neon-cyan)]">Visit ↗</a>
              )}
            </article>
          ))}
          {links.length === 0 && <p className="md:col-span-2 py-12 text-center font-accent text-sm text-[var(--text-muted)]">No links match your search.</p>}
        </div>
      </div>
    </PageLayout>
  );
}
