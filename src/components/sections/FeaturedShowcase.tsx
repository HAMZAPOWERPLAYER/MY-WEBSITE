import { Link } from 'wouter';
import { ArrowUpRight } from 'lucide-react';
import { APPS, GAMES, PROJECTS, initialsFor } from '@/lib/products';

type FeaturedItem = {
  name: string;
  route: string;
  tagline: string;
  badge: string;
  gradient?: string;
};

const FEATURED: FeaturedItem[] = [
  ...APPS.map((app) => ({
    name: app.name,
    route: app.route,
    tagline: app.tagline ?? app.summary ?? '',
    badge: 'PUBLISHED APP',
    gradient: app.accent?.gradient,
  })),
  ...PROJECTS.slice(0, 3).map((project) => ({
    name: project.name,
    route: project.route,
    tagline: project.tagline ?? project.summary ?? '',
    badge: 'PUBLIC SOURCE',
    gradient: project.accent?.gradient,
  })),
  ...GAMES.slice(0, 2).map((game) => ({
    name: game.name,
    route: game.route,
    tagline: game.tagline ?? game.summary ?? '',
    badge: 'COMING SOON',
    gradient: game.accent?.gradient,
  })),
];

export function FeaturedShowcase() {
  return (
    <section id="projects" aria-labelledby="featured-heading" className="mx-auto max-w-6xl px-6 py-14">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[10px] tracking-[4px] text-[var(--neon-cyan)]">FEATURED BUILDS</p>
          <h2 id="featured-heading" className="mt-2 font-display text-3xl font-black tracking-tight text-[var(--text-primary)]">
            Apps, projects &amp; games
          </h2>
          <p className="mt-2 max-w-xl font-accent text-sm text-[var(--text-muted)]">
            Only verified work is listed here. Store links appear only when a live listing has been confirmed.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 font-mono text-xs">
          <Link href="/apps" className="text-[var(--neon-cyan)]">All apps →</Link>
          <Link href="/projects" className="text-[var(--text-muted)]">All projects →</Link>
          <Link href="/games" className="text-[var(--text-muted)]">All games →</Link>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURED.map((item) => (
          <Link
            key={item.route}
            href={item.route}
            className="glass-card group rounded-2xl p-5 transition-colors hover:border-[rgba(0,240,255,0.3)]"
          >
            <div className="flex items-start gap-4">
              <div
                aria-hidden="true"
                className="grid h-12 w-12 shrink-0 place-items-center rounded-xl font-display text-base font-black text-[#04040a]"
                style={{ background: item.gradient ?? 'linear-gradient(135deg,#00f0ff,#7c3aed)' }}
              >
                {initialsFor(item.name)}
              </div>
              <div className="min-w-0 flex-1">
                <span className="font-mono text-[9px] tracking-widest text-[var(--text-muted)]">{item.badge}</span>
                <h3 className="mt-1 truncate font-display text-lg font-bold text-[var(--text-primary)]">{item.name}</h3>
              </div>
              <ArrowUpRight size={16} className="mt-1 shrink-0 text-[var(--text-muted)] transition-transform group-hover:translate-x-0.5 group-hover:text-[var(--neon-cyan)]" />
            </div>
            <p className="mt-3 line-clamp-2 font-accent text-sm leading-relaxed text-[var(--text-muted)]">{item.tagline}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
