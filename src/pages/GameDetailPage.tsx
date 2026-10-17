import { Link, useRoute } from 'wouter';
import { ArrowLeft, ArrowUpRight, Gamepad2, Home, ShieldCheck } from 'lucide-react';
import { PageLayout } from '@/components/layout/PageLayout';
import { PageHero } from '@/components/layout/PageHero';
import { getProductBySlug, initialsFor } from '@/lib/products';

function gameTitle(slug: string, name: string) {
  const titles: Record<string, string> = {
    'the-last-bell': 'The Last Bell Android Horror Game | HAMZA POWERPLAYER',
    'pay-me-back': 'Pay Me Back Upcoming Android Game | HAMZA POWERPLAYER',
    decay: 'Decay Android Game Project Coming Soon | HAMZA POWERPLAYER',
    'echoes-of-the-shadows': 'Echoes of the Shadows Horror Game Coming Soon | HAMZA POWERPLAYER',
  };
  return titles[slug] ?? `${name} Upcoming Android Game | HAMZA POWERPLAYER`;
}

function gameDescription(slug: string, name: string) {
  const descriptions: Record<string, string> = {
    'the-last-bell':
      'The Last Bell is an upcoming Android horror game: explore a darkened school, find three keys, avoid the entity, and escape. View its confirmed package ID and public Unity source repository.',
    'pay-me-back':
      'Pay Me Back is an upcoming Android game by HAMZA POWERPLAYER. Its package ID is confirmed, but no release date, trailer, rating, or download listing exists yet.',
    decay:
      'Decay is an upcoming Android game by HAMZA POWERPLAYER. Its package ID is confirmed, but no release date, trailer, rating, or download listing exists yet.',
    'echoes-of-the-shadows':
      'Echoes of the Shadows is an upcoming Android game by HAMZA POWERPLAYER. Its package ID is confirmed, but no release date, trailer, or listing exists yet.',
  };
  const base =
    descriptions[slug] ??
    `${name} is an upcoming Android game by HAMZA POWERPLAYER. Its package ID is confirmed; no release date, trailer, rating, or download listing is available yet.`;
  return base.length > 160 ? `${base.slice(0, 157).trimEnd()}…` : base;
}

export default function GameDetailPage() {
  const [matches, params] = useRoute('/games/:slug');
  const game = matches && params ? getProductBySlug('game', params.slug) : undefined;

  if (!game) {
    return (
      <PageLayout title="Game Not Found" description="This game page does not exist." path="/games" noindex>
        <PageHero label="NOT FOUND" title="Game Not Found" subtitle="This game page is unavailable." />
        <div className="mx-auto max-w-3xl px-6 py-12">
          <Link href="/games" className="text-[var(--neon-cyan)]">Back to games</Link>
        </div>
      </PageLayout>
    );
  }

  const accent = game.accent?.gradient ?? 'linear-gradient(135deg,#7c3aed,#00f0ff)';
  const description = game.summary ?? `${game.name} is an upcoming Android game. Project details have not yet been published.`;
  const seoDescription = gameDescription(game.slug, game.name);
  const hasGameplay = (game.gameplay?.length ?? 0) > 0;

  return (
    <PageLayout
      title={gameTitle(game.slug, game.name)}
      description={seoDescription}
      path={game.route}
      schemas={[JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'VideoGame',
        name: game.name,
        description,
        url: `https://www.hamzapowerplayer.com${game.route}`,
        operatingSystem: game.platform ?? 'Android',
        ...(game.genre ? { genre: game.genre } : {}),
        ...(game.githubUrl ? { codeRepository: game.githubUrl } : {}),
        ...(hasGameplay
          ? { gameItem: game.gameplay!.map((step) => ({ '@type': 'HowToStep', text: step })) }
          : {}),
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.hamzapowerplayer.com/' },
            { '@type': 'ListItem', position: 2, name: 'Games', item: 'https://www.hamzapowerplayer.com/games' },
            { '@type': 'ListItem', position: 3, name: game.name, item: `https://www.hamzapowerplayer.com${game.route}` },
          ],
        },
      })]}
    >
      {/* Distinct per-game hero accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-72"
        style={{ background: accent, opacity: 0.12, filter: 'blur(60px)' }}
      />
      <PageHero
        label="GAME PROJECT"
        title={game.name}
        subtitle={game.tagline ?? 'An upcoming Android game from HAMZA POWERPLAYER'}
      />
      <main className="mx-auto max-w-4xl px-6 py-12">
        <article className="glass-card overflow-hidden rounded-3xl p-6 sm:p-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <div
              aria-hidden="true"
              className="grid h-20 w-20 shrink-0 place-items-center rounded-2xl font-display text-2xl font-black text-[#04040a]"
              style={{ background: accent }}
            >
              {initialsFor(game.name)}
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-[rgba(245,197,24,0.3)] bg-[rgba(245,197,24,0.08)] px-4 py-2 font-mono text-xs font-bold tracking-widest text-[var(--gold)]">
                  COMING SOON
                </span>
                <span className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--text-muted)]">
                  <Gamepad2 size={13} /> {game.platform}
                </span>
                {game.language && <span className="font-mono text-xs text-[var(--text-muted)]">{game.language}</span>}
                {game.genre && <span className="font-mono text-xs text-[var(--text-muted)]">{game.genre}</span>}
              </div>
              <h2 className="mt-4 font-display text-xl font-black text-[var(--text-primary)]">Project information</h2>
              <p className="mt-2 font-accent text-base leading-relaxed text-[var(--text-muted)]">{description}</p>
            </div>
          </div>

          {hasGameplay && (
            <section className="mt-8" aria-labelledby="gameplay-heading">
              <h2 id="gameplay-heading" className="font-display text-lg font-bold text-[var(--text-primary)]">Gameplay</h2>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {game.gameplay!.map((step) => (
                  <li key={step} className="flex items-start gap-2 font-accent text-sm text-[var(--text-muted)]">
                    <ShieldCheck size={14} className="mt-0.5 shrink-0 text-[var(--gold)]" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {game.packageId && (
            <div className="mt-8 rounded-xl border border-white/10 bg-black/20 p-4">
              <div className="font-mono text-[10px] tracking-widest text-[var(--text-muted)]">
                ANDROID PACKAGE ID — NOT A STORE LISTING
              </div>
              <code className="mt-2 block break-all font-mono text-sm text-[var(--neon-cyan)]">{game.packageId}</code>
              <p className="mt-2 font-accent text-xs text-[var(--text-muted)]">
                This package ID identifies the project. It is not a Google Play listing URL.
              </p>
            </div>
          )}

          <p className="mt-6 font-accent text-sm text-[var(--text-muted)]">
            No release date, trailer, rating, review, gameplay screenshot, or download listing has been confirmed.
            This page is a project preview, not a released game.
          </p>

          {game.githubUrl && (
            <a
              href={game.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-xl border border-[rgba(0,240,255,0.25)] px-5 py-3 font-display text-xs font-bold tracking-wider text-[var(--neon-cyan)]"
            >
              View public source repository <ArrowUpRight size={14} />
            </a>
          )}
        </article>

        <nav aria-label="Page navigation" className="mt-8 flex flex-wrap gap-4 font-mono text-xs">
          <Link href="/games" className="inline-flex items-center gap-2 text-[var(--neon-cyan)]">
            <ArrowLeft size={14} /> All games
          </Link>
          <Link href="/" className="inline-flex items-center gap-2 text-[var(--text-muted)]">
            <Home size={14} /> Homepage
          </Link>
        </nav>
      </main>
    </PageLayout>
  );
}
