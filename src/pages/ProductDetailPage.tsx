import { Link, useRoute } from 'wouter';
import { ArrowLeft, ArrowUpRight, ExternalLink, Github, Home, ShieldCheck } from 'lucide-react';
import { PageLayout } from '@/components/layout/PageLayout';
import { PageHero } from '@/components/layout/PageHero';
import {
  PRODUCTS,
  getProductBySlug,
  getVerifiedAltDownloads,
  initialsFor,
  type ProductRecord,
} from '@/lib/products';

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

function StatusBadge({ product }: { product: ProductRecord }) {
  if (product.status === 'published') {
    return (
      <span className="rounded-full border border-[rgba(0,255,136,0.3)] bg-[rgba(0,255,136,0.08)] px-4 py-2 font-mono text-xs font-bold tracking-widest text-[var(--success)]">
        PUBLISHED
      </span>
    );
  }
  if (product.status === 'coming-soon') {
    return (
      <span className="rounded-full border border-[rgba(245,197,24,0.3)] bg-[rgba(245,197,24,0.08)] px-4 py-2 font-mono text-xs font-bold tracking-widest text-[var(--gold)]">
        COMING SOON
      </span>
    );
  }
  return (
    <span className="rounded-full border border-[rgba(0,240,255,0.25)] bg-[rgba(0,240,255,0.06)] px-4 py-2 font-mono text-xs font-bold tracking-widest text-[var(--neon-cyan)]">
      PUBLIC SOURCE
    </span>
  );
}

function Monogram({ product, size = 'large' }: { product: ProductRecord; size?: 'large' | 'small' }) {
  const dimensions = size === 'large' ? 'h-20 w-20 rounded-2xl text-2xl' : 'h-11 w-11 rounded-xl text-sm';
  return (
    <div
      aria-hidden="true"
      className={`grid place-items-center font-display font-black text-[#04040a] ${dimensions}`}
      style={{ background: product.accent?.gradient ?? 'linear-gradient(135deg,#00f0ff,#7c3aed)' }}
    >
      {initialsFor(product.name)}
    </div>
  );
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
  const verifiedAltDownloads = getVerifiedAltDownloads(product);
  const related = PRODUCTS_RELATED(product);

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
      <PageHero
        label={isApp ? 'ANDROID APP' : product.kind === 'game' ? 'GAME PROJECT' : 'PUBLIC PROJECT'}
        title={product.name}
        subtitle={product.tagline ?? product.summary ?? 'A HAMZA POWERPLAYER build.'}
      />
      <main className="mx-auto max-w-4xl px-6 py-12">
        <article className="glass-card overflow-hidden rounded-3xl p-6 sm:p-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <Monogram product={product} />
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <StatusBadge product={product} />
                {product.platform && <span className="font-mono text-xs text-[var(--text-muted)]">{product.platform}</span>}
                {product.language && <span className="font-mono text-xs text-[var(--text-muted)]">{product.language}</span>}
                {product.license && <span className="font-mono text-xs text-[var(--text-muted)]">{product.license} License</span>}
              </div>
              <h2 className="mt-4 font-display text-xl font-black text-[var(--text-primary)]">
                About this {isApp ? 'app' : 'project'}
              </h2>
              <p className="mt-2 font-accent text-base leading-relaxed text-[var(--text-muted)]">
                {product.summary ?? `${product.name} is a public ${KIND_LABEL[product.kind].toLowerCase()} by HAMZA POWERPLAYER.`}
              </p>
            </div>
          </div>

          {product.features && product.features.length > 0 && (
            <section className="mt-8" aria-labelledby="features-heading">
              <h2 id="features-heading" className="font-display text-lg font-bold text-[var(--text-primary)]">Features</h2>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {product.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 font-accent text-sm text-[var(--text-muted)]">
                    <ShieldCheck size={14} className="mt-0.5 shrink-0 text-[var(--neon-cyan)]" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {product.packageId && (
            <div className="mt-7 rounded-xl border border-white/10 bg-black/20 p-4">
              <div className="font-mono text-[10px] tracking-widest text-[var(--text-muted)]">ANDROID PACKAGE ID</div>
              <code className="mt-2 block break-all font-mono text-sm text-[var(--neon-cyan)]">{product.packageId}</code>
              {product.status === 'coming-soon' && (
                <p className="mt-2 font-accent text-xs text-[var(--text-muted)]">
                  This package ID identifies the project. It is not a Google Play listing URL, and no download is available yet.
                </p>
              )}
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            {product.storeUrl && (
              <a href={product.storeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-[var(--success)] px-5 py-3 font-display text-xs font-black tracking-wider text-[#04040a]">
                Download on Google Play <ArrowUpRight size={14} />
              </a>
            )}
            {verifiedAltDownloads.map((download) => (
              <a key={download.url} href={download.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-[rgba(0,240,255,0.25)] px-5 py-3 font-display text-xs font-bold tracking-wider text-[var(--neon-cyan)]">
                Alternative Download <ExternalLink size={14} />
              </a>
            ))}
            {product.githubUrl && (
              <a href={product.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-5 py-3 font-display text-xs font-bold tracking-wider text-[var(--text-primary)]">
                <Github size={14} /> View on GitHub <ArrowUpRight size={14} />
              </a>
            )}
            {product.websiteUrl && (
              <a href={product.websiteUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-5 py-3 font-display text-xs font-bold tracking-wider text-[var(--text-primary)]">
                Official Website <ArrowUpRight size={14} />
              </a>
            )}
          </div>

          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-accent text-xs text-[var(--text-muted)]">
            {product.docsUrl && (
              <a href={product.docsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-white">
                View Documentation <ArrowUpRight size={12} />
              </a>
            )}
            {product.privacyUrl && (
              <Link href={product.privacyUrl} className="inline-flex items-center gap-1.5 hover:text-white">
                Privacy Policy <ArrowUpRight size={12} />
              </Link>
            )}
            {product.supportUrl && (
              <a href={product.supportUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-white">
                Support <ArrowUpRight size={12} />
              </a>
            )}
          </div>

          {!product.storeUrl && product.kind === 'app' && (
            <p className="mt-5 font-accent text-xs text-[var(--text-muted)]">
              No verified store listing is available for this product.
            </p>
          )}
        </article>

        {related.length > 0 && (
          <section className="mt-10" aria-labelledby="related-heading">
            <h2 id="related-heading" className="font-display text-lg font-bold text-[var(--text-primary)]">
              More {indexLabel.toLowerCase()}
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {related.map((item) => (
                <Link key={item.id} href={item.route} className="glass-card flex items-center gap-4 rounded-xl p-4 transition-colors hover:border-[rgba(0,240,255,0.3)]">
                  <Monogram product={item} size="small" />
                  <span className="min-w-0">
                    <span className="block truncate font-display text-sm font-bold text-[var(--text-primary)]">{item.name}</span>
                    <span className="block truncate font-accent text-xs text-[var(--text-muted)]">{item.summary ?? item.tagline}</span>
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        <nav aria-label="Page navigation" className="mt-10 flex flex-wrap gap-4 font-mono text-xs">
          <Link href={indexPath} className="inline-flex items-center gap-2 text-[var(--neon-cyan)]">
            <ArrowLeft size={14} /> All {indexLabel.toLowerCase()}
          </Link>
          <Link href="/" className="inline-flex items-center gap-2 text-[var(--text-muted)]">
            <Home size={14} /> Homepage
          </Link>
        </nav>
      </main>
    </PageLayout>
  );
}

function PRODUCTS_RELATED(product: ProductRecord) {
  return PRODUCTS.filter(
    (candidate) => candidate.kind === product.kind && candidate.id !== product.id,
  ).slice(0, 4);
}
