import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'wouter';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
  Globe,
  Home,
  Layers,
  Maximize2,
  Play,
  ShieldCheck,
  X,
} from 'lucide-react';
import {
  PRODUCTS,
  getVerifiedAltDownloads,
  type ProductRecord,
  type ProductStatus,
} from '@/lib/products';
import { trapFocus } from '@/lib/focusTrap';
import { MonogramArt, ProductIcon, ProductMedia, StatusPill } from './ProductArtwork';

const KIND_LABEL: Record<ProductRecord['kind'], string> = {
  app: 'Android app',
  game: 'Android game',
  project: 'Software project',
};

const INDEX: Record<ProductRecord['kind'], { path: string; label: string }> = {
  app: { path: '/apps', label: 'Apps' },
  game: { path: '/games', label: 'Games' },
  project: { path: '/projects', label: 'Projects' },
};

const STATUS_LABEL: Record<ProductStatus, string> = {
  published: 'Live on Google Play',
  'coming-soon': 'In development',
  'source-available': 'Public source',
};

function releaseNote(product: ProductRecord) {
  if (product.status === 'published') {
    return 'The official Google Play listing carries the current version, device compatibility, and user reviews.';
  }
  if (product.status === 'coming-soon') {
    return 'No release date, trailer, rating, or download listing has been announced. This page is a project preview, not a released product.';
  }
  return 'The source code is public. This project does not have a store listing.';
}

function relatedProducts(product: ProductRecord) {
  const others = PRODUCTS.filter((candidate) => candidate.id !== product.id);
  const published = others.filter((candidate) => candidate.status === 'published');
  const sameKind = others.filter(
    (candidate) => candidate.status !== 'published' && candidate.kind === product.kind,
  );
  return [...published, ...sameKind].slice(0, 3);
}

export function ProductCaseStudy({ product }: { product: ProductRecord }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  const screenshots = product.screenshots ?? [];
  const heroImage = product.heroImage ?? screenshots[0];
  const index = INDEX[product.kind];
  const highlights = product.features ?? product.gameplay ?? [];
  const highlightsTitle =
    product.kind === 'game' ? 'How it plays' : product.kind === 'app' ? "What's inside" : 'What it does';
  const altDownloads = getVerifiedAltDownloads(product);
  const related = relatedProducts(product);

  const facts = [
    { label: 'Status', value: STATUS_LABEL[product.status] },
    ...(product.platform ? [{ label: 'Platform', value: product.platform }] : []),
    ...(product.language ? [{ label: 'Built with', value: product.language }] : []),
    ...(product.genre ? [{ label: 'Genre', value: product.genre }] : []),
    ...(product.version ? [{ label: 'Version', value: product.version }] : []),
    ...(product.releaseDate ? [{ label: 'Released', value: product.releaseDate }] : []),
    ...(product.license ? [{ label: 'License', value: `${product.license} License` }] : []),
  ];

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    lastFocusedRef.current?.focus();
  }, []);

  const showNext = useCallback(() => {
    setLightboxIndex((current) =>
      current === null || screenshots.length === 0 ? current : (current + 1) % screenshots.length,
    );
  }, [screenshots.length]);

  const showPrevious = useCallback(() => {
    setLightboxIndex((current) =>
      current === null || screenshots.length === 0
        ? current
        : (current - 1 + screenshots.length) % screenshots.length,
    );
  }, [screenshots.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeLightbox();
      if (event.key === 'ArrowRight') showNext();
      if (event.key === 'ArrowLeft') showPrevious();
      if (event.key === 'Tab') trapFocus(event, dialogRef.current);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [lightboxIndex, closeLightbox, showNext, showPrevious]);

  function openLightbox(indexToOpen: number) {
    lastFocusedRef.current = document.activeElement as HTMLElement | null;
    setLightboxIndex(indexToOpen);
  }

  const activeScreenshot = lightboxIndex === null ? null : screenshots[lightboxIndex];

  return (
    <div className="relative pb-8">
      {/* Product-specific ambient wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px] opacity-[0.16]"
        style={{
          background: product.accent?.gradient ?? 'linear-gradient(135deg,#00f0ff,#7c3aed)',
          filter: 'blur(110px)',
          maskImage: 'linear-gradient(to bottom, black, transparent 85%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black, transparent 85%)',
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="pb-8 pt-8">
          <ol className="flex flex-wrap items-center gap-2 font-mono text-[11px] text-[var(--text-muted)]">
            <li>
              <Link href="/" className="inline-flex items-center gap-1.5 transition-colors hover:text-white">
                <Home size={12} aria-hidden="true" /> Home
              </Link>
            </li>
            <li aria-hidden="true" className="opacity-40">/</li>
            <li>
              <Link href={index.path} className="transition-colors hover:text-white">
                {index.label}
              </Link>
            </li>
            <li aria-hidden="true" className="opacity-40">/</li>
            <li aria-current="page" className="text-[var(--text-primary)]">{product.name}</li>
          </ol>
        </nav>

        {/* Hero */}
        <header className="grid items-center gap-10 pb-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14">
          <div>
            <div className="flex items-center gap-4">
              <ProductIcon product={product} size="lg" />
              <div className="min-w-0">
                <StatusPill status={product.status} />
                <p className="mt-2 font-mono text-[11px] tracking-[0.12em] text-[var(--text-muted)]">
                  {KIND_LABEL[product.kind]}
                  {product.platform ? ` · ${product.platform}` : ''}
                </p>
              </div>
            </div>

            <h1 className="hp-display mt-7 text-[clamp(2.3rem,5.4vw,4rem)] text-[var(--text-primary)]">
              {product.name}
            </h1>

            {product.tagline && (
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/80">{product.tagline}</p>
            )}

            {product.summary && (
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-[var(--text-muted)]">
                {product.summary}
              </p>
            )}

            <div className="mt-7 flex flex-wrap items-center gap-3">
              {product.storeUrl && (
                <a
                  href={product.storeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-[var(--neon-cyan)] px-5 py-3 font-display text-xs font-black tracking-wide text-[#04040a] transition-transform hover:-translate-y-0.5"
                >
                  <Play size={14} fill="currentColor" aria-hidden="true" />
                  Get it on Google Play
                </a>
              )}
              {product.githubUrl && (
                <a
                  href={product.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.03] px-5 py-3 font-display text-xs font-bold tracking-wide text-[var(--text-primary)] transition-colors hover:border-white/30 hover:bg-white/[0.06]"
                >
                  <Github size={14} aria-hidden="true" /> View source
                </a>
              )}
              {product.websiteUrl && (
                <a
                  href={product.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.03] px-5 py-3 font-display text-xs font-bold tracking-wide text-[var(--text-primary)] transition-colors hover:border-white/30 hover:bg-white/[0.06]"
                >
                  <Globe size={14} aria-hidden="true" /> Website
                </a>
              )}
              {altDownloads.map((download) => (
                <a
                  key={download.url}
                  href={download.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.03] px-5 py-3 font-display text-xs font-bold tracking-wide text-[var(--text-primary)] transition-colors hover:border-white/30 hover:bg-white/[0.06]"
                >
                  {download.label} <ExternalLink size={13} aria-hidden="true" />
                </a>
              ))}
            </div>

            <dl className="mt-9 grid grid-cols-2 gap-x-8 gap-y-4 border-t border-white/[0.08] pt-6 sm:grid-cols-3">
              {facts.slice(0, 3).map((fact) => (
                <div key={fact.label}>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                    {fact.label}
                  </dt>
                  <dd className="mt-1 text-sm font-medium text-[var(--text-primary)]">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Artwork */}
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-5 rounded-[2rem] opacity-25 blur-3xl"
              style={{ background: product.accent?.gradient ?? 'linear-gradient(135deg,#00f0ff,#7c3aed)' }}
            />
            <figure className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#070712] shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
              <div className="relative">
                {heroImage ? (
                  <ProductMedia
                    src={heroImage}
                    alt={`${product.name} official screenshot`}
                    priority
                    className={product.kind === 'game' ? 'aspect-video' : 'aspect-[4/3]'}
                  />
                ) : (
                  <MonogramArt
                    product={product}
                    className={product.kind === 'game' ? 'aspect-video' : 'aspect-[4/3]'}
                  />
                )}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent"
                />
              </div>
              <figcaption className="flex items-center justify-between gap-3 border-t border-white/10 px-4 py-2.5">
                <span className="font-mono text-[10px] tracking-[0.14em] text-[var(--text-muted)] sm:tracking-[0.18em]">
                  {product.storeUrl ? (
                    <>
                      <span className="hidden sm:inline">OFFICIAL </span>GOOGLE PLAY ARTWORK
                    </>
                  ) : (
                    'PROJECT PREVIEW'
                  )}
                </span>
                {screenshots.length > 0 ? (
                  <button
                    type="button"
                    onClick={() => openLightbox(0)}
                    className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap font-mono text-[10px] tracking-[0.08em] text-[var(--text-primary)] transition-colors hover:text-[var(--neon-cyan)]"
                  >
                    <Maximize2 size={11} aria-hidden="true" />
                    View gallery
                    <span className="text-[var(--text-muted)]">· {screenshots.length}</span>
                  </button>
                ) : (
                  <span className="font-mono text-[10px] text-[var(--text-muted)]">No screenshots yet</span>
                )}
              </figcaption>
            </figure>
          </div>
        </header>

        {/* Body */}
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-14">
          <div className="min-w-0">
            <section aria-labelledby="overview-heading">
              <p className="hp-eyebrow">Overview</p>
              <h2 id="overview-heading" className="hp-h2 mt-4">
                About {product.name}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[var(--text-muted)]">
                {product.summary ??
                  `${product.name} is a ${KIND_LABEL[product.kind].toLowerCase()} by HAMZA POWERPLAYER.`}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[var(--text-muted)]">{releaseNote(product)}</p>
            </section>

            {highlights.length > 0 && (
              <section aria-labelledby="highlights-heading" className="mt-12">
                <p className="hp-eyebrow">Details</p>
                <h2 id="highlights-heading" className="hp-h2 mt-4">
                  {highlightsTitle}
                </h2>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {highlights.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5 text-sm leading-relaxed text-[var(--text-muted)]"
                    >
                      <Check
                        size={15}
                        aria-hidden="true"
                        className="mt-0.5 shrink-0 text-[var(--neon-cyan)]"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {screenshots.length > 0 && (
              <section aria-labelledby="gallery-heading" className="mt-12">
                <div className="flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <p className="hp-eyebrow">Gallery</p>
                    <h2 id="gallery-heading" className="hp-h2 mt-4">
                      Screenshots
                    </h2>
                  </div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--text-muted)]">
                    {screenshots.length} images
                  </p>
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {screenshots.map((screenshot, screenshotIndex) => (
                    <button
                      key={screenshot}
                      type="button"
                      onClick={() => openLightbox(screenshotIndex)}
                      className="group relative overflow-hidden rounded-xl border border-white/10 bg-[#070712] text-left transition-colors hover:border-[rgba(0,240,255,0.35)]"
                      aria-label={`Open ${product.name} screenshot ${screenshotIndex + 1} of ${screenshots.length}`}
                    >
                      <ProductMedia
                        src={screenshot}
                        alt={`${product.name} screenshot ${screenshotIndex + 1}`}
                        className={product.kind === 'game' ? 'aspect-video' : 'aspect-[4/3]'}
                      />
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/15"
                      />
                      <span className="absolute bottom-3 right-3 inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/20 bg-black/50 text-white backdrop-blur">
                        <Maximize2 size={13} aria-hidden="true" />
                      </span>
                    </button>
                  ))}
                </div>
              </section>
            )}

            {product.topics && product.topics.length > 0 && (
              <section aria-labelledby="topics-heading" className="mt-12">
                <h2 id="topics-heading" className="font-display text-sm font-bold tracking-[0.08em] text-[var(--text-primary)]">
                  Topics
                </h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {product.topics.slice(0, 12).map((topic) => (
                    <li
                      key={topic}
                      className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-[var(--text-muted)]"
                    >
                      {topic}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Closing CTA */}
            <section
              aria-labelledby="product-cta-heading"
              className="relative mt-14 overflow-hidden rounded-2xl border border-white/10 p-7 sm:p-9"
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-[0.12]"
                style={{ background: product.accent?.gradient ?? 'linear-gradient(135deg,#00f0ff,#7c3aed)' }}
              />
              <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="hp-eyebrow">
                    {product.status === 'published' ? 'Available now' : 'Project status'}
                  </p>
                  <h2 id="product-cta-heading" className="mt-3 font-display text-xl font-black text-[var(--text-primary)] sm:text-2xl">
                    {product.status === 'published'
                      ? product.storeUrl
                        ? `Get ${product.name} on Google Play.`
                        : altDownloads.length > 0
                          ? `Download ${product.name}.`
                          : `${product.name} is available now.`
                      : `${product.name} is ${STATUS_LABEL[product.status].toLowerCase()}.`}
                  </h2>
                  <p className="mt-2 max-w-lg text-sm text-[var(--text-muted)]">{releaseNote(product)}</p>
                </div>
                <div className="flex shrink-0 flex-wrap gap-3">
                  {product.storeUrl && (
                    <a
                      href={product.storeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-[var(--neon-cyan)] px-5 py-3 font-display text-xs font-black tracking-wide text-[#04040a]"
                    >
                      <Play size={14} fill="currentColor" aria-hidden="true" /> Google Play
                    </a>
                  )}
                  {product.githubUrl && (
                    <a
                      href={product.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-5 py-3 font-display text-xs font-bold tracking-wide text-[var(--text-primary)] transition-colors hover:bg-white/[0.06]"
                    >
                      <Github size={14} aria-hidden="true" /> Source
                    </a>
                  )}
                  {!product.storeUrl && !product.githubUrl && (
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 rounded-xl bg-[var(--neon-cyan)] px-5 py-3 font-display text-xs font-black tracking-wide text-[#04040a]"
                    >
                      Ask about this project <ArrowUpRight size={14} aria-hidden="true" />
                    </Link>
                  )}
                </div>
              </div>
            </section>
          </div>

          {/* Details sidebar */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="hp-card p-6">
              <div className="flex items-center gap-2">
                <Layers size={15} aria-hidden="true" className="text-[var(--neon-cyan)]" />
                <h2 className="font-display text-sm font-bold tracking-[0.06em] text-[var(--text-primary)]">
                  Product details
                </h2>
              </div>

              <dl className="mt-5 divide-y divide-white/[0.06]">
                {facts.map((fact) => (
                  <div key={fact.label} className="flex items-start justify-between gap-4 py-2.5">
                    <dt className="text-xs text-[var(--text-muted)]">{fact.label}</dt>
                    <dd className="text-right text-xs font-medium text-[var(--text-primary)]">{fact.value}</dd>
                  </div>
                ))}
              </dl>

              {product.packageId && (
                <div className="mt-5 rounded-lg border border-white/[0.08] bg-black/25 p-3">
                  <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
                    Android package
                  </p>
                  <code className="mt-1.5 block break-all font-mono text-[11px] leading-relaxed text-[var(--neon-cyan)]">
                    {product.packageId}
                  </code>
                </div>
              )}

              <div className="mt-5 space-y-1.5">
                {product.storeUrl && (
                  <a
                    href={product.storeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-lg px-2 py-2 text-xs text-[var(--text-muted)] transition-colors hover:bg-white/[0.04] hover:text-white"
                  >
                    Google Play listing <ArrowUpRight size={13} aria-hidden="true" />
                  </a>
                )}
                {product.githubUrl && (
                  <a
                    href={product.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-lg px-2 py-2 text-xs text-[var(--text-muted)] transition-colors hover:bg-white/[0.04] hover:text-white"
                  >
                    Public repository <ArrowUpRight size={13} aria-hidden="true" />
                  </a>
                )}
                {product.privacyUrl && (
                  <a
                    href={product.privacyUrl}
                    className="flex items-center justify-between rounded-lg px-2 py-2 text-xs text-[var(--text-muted)] transition-colors hover:bg-white/[0.04] hover:text-white"
                  >
                    Privacy policy <ArrowUpRight size={13} aria-hidden="true" />
                  </a>
                )}
                {product.supportUrl && (
                  <a
                    href={product.supportUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-lg px-2 py-2 text-xs text-[var(--text-muted)] transition-colors hover:bg-white/[0.04] hover:text-white"
                  >
                    Support <ArrowUpRight size={13} aria-hidden="true" />
                  </a>
                )}
                {product.docsUrl && (
                  <a
                    href={product.docsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-lg px-2 py-2 text-xs text-[var(--text-muted)] transition-colors hover:bg-white/[0.04] hover:text-white"
                  >
                    Documentation <ArrowUpRight size={13} aria-hidden="true" />
                  </a>
                )}
              </div>

              <div className="mt-5 flex items-start gap-2 rounded-lg border border-[rgba(0,255,136,0.16)] bg-[rgba(0,255,136,0.04)] p-3">
                <ShieldCheck size={14} aria-hidden="true" className="mt-0.5 shrink-0 text-[var(--success)]" />
                <p className="text-[11px] leading-relaxed text-[var(--text-muted)]">
                  Only verified destinations are linked from this page.
                </p>
              </div>
            </div>
          </aside>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section aria-labelledby="related-heading" className="mt-16 border-t border-white/[0.08] pt-12">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="hp-eyebrow">Keep exploring</p>
                <h2 id="related-heading" className="hp-h2 mt-3">
                  More from HAMZA POWERPLAYER
                </h2>
              </div>
              <Link
                href={index.path}
                className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--neon-cyan)] transition-opacity hover:opacity-80"
              >
                All {index.label.toLowerCase()} <ArrowRight size={13} aria-hidden="true" />
              </Link>
            </div>

            <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <Link
                  key={item.id}
                  href={item.route}
                  className="hp-card hp-card-hover group flex flex-col overflow-hidden"
                >
                  <div className="relative">
                    {item.heroImage ?? item.screenshots?.[0] ? (
                      <ProductMedia
                        src={(item.heroImage ?? item.screenshots?.[0])!}
                        alt=""
                        className="aspect-[16/9]"
                        imageClassName="transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <MonogramArt product={item} className="aspect-[16/9]" />
                    )}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                    />
                    <div className="absolute bottom-3 left-3">
                      <StatusPill status={item.status} />
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-center gap-3">
                      <ProductIcon product={item} size="sm" />
                      <h3 className="min-w-0 truncate font-display text-sm font-bold text-[var(--text-primary)]">
                        {item.name}
                      </h3>
                    </div>
                    <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-[var(--text-muted)]">
                      {item.tagline ?? item.summary}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--neon-cyan)]">
                      View details <ArrowRight size={12} aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Back links */}
        <nav aria-label="Page navigation" className="mt-12 flex flex-wrap items-center gap-5 border-t border-white/[0.08] pt-6 font-mono text-[11px]">
          <Link href={index.path} className="inline-flex items-center gap-2 text-[var(--neon-cyan)] transition-opacity hover:opacity-80">
            <ArrowLeft size={13} aria-hidden="true" /> All {index.label.toLowerCase()}
          </Link>
          <Link href="/" className="inline-flex items-center gap-2 text-[var(--text-muted)] transition-colors hover:text-white">
            <Home size={13} aria-hidden="true" /> Homepage
          </Link>
        </nav>
      </div>

      {/* Lightbox */}
      {activeScreenshot && lightboxIndex !== null && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`${product.name} screenshot gallery`}
          className="fixed inset-0 z-[10000] flex flex-col bg-[#030308]/96 backdrop-blur-sm"
          onClick={closeLightbox}
        >
          <div
            className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-3 sm:px-6"
            onClick={(event) => event.stopPropagation()}
          >
            <p className="font-mono text-[11px] tracking-[0.14em] text-white/70">
              {product.name.toUpperCase()} · {lightboxIndex + 1} / {screenshots.length}
            </p>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={closeLightbox}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 text-white transition-colors hover:bg-white/10"
              aria-label="Close gallery"
            >
              <X size={17} aria-hidden="true" />
            </button>
          </div>

          <div className="relative flex flex-1 items-center justify-center overflow-hidden p-4 sm:p-10" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              onClick={showPrevious}
              className="absolute left-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white transition-colors hover:bg-black/70 sm:left-6"
              aria-label="Previous screenshot"
            >
              <ChevronLeft size={20} aria-hidden="true" />
            </button>

            <img
              src={activeScreenshot}
              alt={`${product.name} screenshot ${lightboxIndex + 1}`}
              className="max-h-full max-w-full rounded-lg object-contain shadow-2xl"
            />

            <button
              type="button"
              onClick={showNext}
              className="absolute right-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white transition-colors hover:bg-black/70 sm:right-6"
              aria-label="Next screenshot"
            >
              <ChevronRight size={20} aria-hidden="true" />
            </button>
          </div>

          <div
            className="border-t border-white/10 px-4 py-3 sm:px-6"
            onClick={(event) => event.stopPropagation()}
          >
            <p className="text-center font-mono text-[10px] tracking-[0.12em] text-white/50">
              Use ← → to browse · Esc to close
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
