import { Link, useRoute } from 'wouter';
import { PageLayout } from '@/components/layout/PageLayout';
import { PageHero } from '@/components/layout/PageHero';
import { ProductCaseStudy } from '@/components/product/ProductCaseStudy';
import { getProductBySlug, type ProductRecord } from '@/lib/products';

const KIND_LABEL: Record<ProductRecord['kind'], string> = {
  app: 'Android App',
  game: 'Game Project',
  project: 'Software Project',
};

function clampText(text: string, max: number) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(' ');
  return (lastSpace > max * 0.5 ? cut.slice(0, lastSpace) : cut).trimEnd();
}

function buildTitle(product: ProductRecord) {
  const kind = KIND_LABEL[product.kind];
  const suffix = ' | HAMZA POWERPLAYER';
  const parts = [product.name, kind];
  if (product.language) parts.push(product.language);
  if (product.genre) parts.push(product.genre);
  const composed = parts.join(' — ');
  const plain = `${composed}${suffix}`;
  if (plain.length >= 50 && plain.length <= 65) return plain;
  if (product.tagline) {
    const tagged = `${product.name} — ${product.tagline}${suffix}`;
    if (tagged.length <= 65) return tagged;
    return `${clampText(`${product.name} — ${product.tagline}`, 65 - suffix.length)}${suffix}`;
  }
  return plain;
}

function buildDescription(product: ProductRecord) {
  const summary = product.summary ?? `${product.name} is a ${KIND_LABEL[product.kind].toLowerCase()} by HAMZA POWERPLAYER.`;
  let description = summary;
  if (product.storeUrl) {
    description += ' Its exact Google Play listing is verified and linked below.';
  } else if (product.githubUrl) {
    description += ' Its public GitHub repository is verified and linked below.';
  } else {
    description += ' Store and release details are not available yet.';
  }
  if (description.length > 160) {
    description = `${clampText(description, 157)}…`;
  } else if (description.length < 140) {
    description += ' View verified links, current status, and public source code on this page.';
    if (description.length > 160) description = `${clampText(description, 157)}…`;
  }
  return description;
}

export default function ProductDetailPage() {
  const [appMatch, appParams] = useRoute('/apps/:slug');
  const [projectMatch, projectParams] = useRoute('/projects/:slug');
  const kind = appMatch ? 'app' : projectMatch ? 'project' : undefined;
  const slug = appMatch ? appParams?.slug : projectMatch ? projectParams?.slug : undefined;
  const product = kind && slug ? getProductBySlug(kind, slug) : undefined;

  if (!product) {
    return (
      <PageLayout title="Project Not Found" description="This product or project page does not exist." path="/apps" noindex>
        <PageHero label="NOT FOUND" title="Project Not Found" subtitle="This product page is unavailable." />
        <div className="mx-auto max-w-3xl px-6 py-12">
          <Link href="/apps" className="text-[var(--neon-cyan)]">Back to apps</Link>
        </div>
      </PageLayout>
    );
  }

  const isApp = product.kind === 'app';
  const indexPath = isApp ? '/apps' : '/projects';
  const indexLabel = isApp ? 'Apps' : 'Projects';
  const description = buildDescription(product);
  const title = buildTitle(product);

  return (
    <PageLayout
      title={title}
      description={description}
      path={product.route}
      schemas={[JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: product.name,
        description,
        url: `https://www.hamzapowerplayer.com${product.route}`,
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.hamzapowerplayer.com/' },
            { '@type': 'ListItem', position: 2, name: indexLabel, item: `https://www.hamzapowerplayer.com${indexPath}` },
            { '@type': 'ListItem', position: 3, name: product.name, item: `https://www.hamzapowerplayer.com${product.route}` },
          ],
        },
      })]}
    >
      <ProductCaseStudy product={product} />
    </PageLayout>
  );
}
