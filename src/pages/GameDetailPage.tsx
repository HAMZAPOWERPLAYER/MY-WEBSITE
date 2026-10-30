import { Link, useRoute } from 'wouter';
import { PageLayout } from '@/components/layout/PageLayout';
import { PageHero } from '@/components/layout/PageHero';
import { ProductCaseStudy } from '@/components/product/ProductCaseStudy';
import { getProductBySlug } from '@/lib/products';

function gameTitle(slug: string, name: string) {
  const titles: Record<string, string> = {
    'the-last-bell': 'The Last Bell — Live Android Horror Game | HAMZA POWERPLAYER',
    'pay-me-back': 'Pay Me Back Upcoming Android Game | HAMZA POWERPLAYER',
    decay: 'Decay Android Game Project Coming Soon | HAMZA POWERPLAYER',
    'echoes-of-the-shadows': 'Echoes of the Shadows Horror Game Coming Soon | HAMZA POWERPLAYER',
  };
  return titles[slug] ?? `${name} Upcoming Android Game | HAMZA POWERPLAYER`;
}

function gameDescription(slug: string, name: string) {
  const descriptions: Record<string, string> = {
    'the-last-bell':
      'The Last Bell is a first-person Android horror game, now live on Google Play. Explore a darkened school, find three keys, and escape the entity.',
    'pay-me-back':
      'Pay Me Back is an upcoming Android game by HAMZA POWERPLAYER. Its package ID is confirmed, but no release date, trailer, rating, or download listing exists yet.',
    decay:
      'Decay is an upcoming Android game by HAMZA POWERPLAYER. Its package ID is confirmed, but no release date, trailer, rating, or download listing exists yet.',
    'echoes-of-the-shadows':
      'Echoes of the Shadows is an upcoming Android game by HAMZA POWERPLAYER. Its package ID is confirmed, but no release date, trailer, rating, or listing exists yet.',
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
        ...(game.storeUrl ? { sameAs: game.storeUrl } : {}),
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
      <ProductCaseStudy product={game} />
    </PageLayout>
  );
}
