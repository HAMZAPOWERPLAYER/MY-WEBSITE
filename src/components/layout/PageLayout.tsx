import { useEffect, type ReactNode } from 'react';
import AuroraEngine from '@/components/effects/AuroraEngine';
import { CustomCursor } from '@/components/effects/CustomCursor';
import { HamzaAI } from '@/components/effects/HamzaAI';
import { PageNavbar } from './PageNavbar';
import { Footer } from '@/components/sections/Footer';

const BASE_URL = 'https://www.hamzapowerplayer.com';
const DEFAULT_TITLE = 'HAMZA POWERPLAYER — App Developer & Digital Product Builder';
const DEFAULT_DESC = 'Official portfolio of HAMZA POWERPLAYER, featuring published apps, public software projects, and games in development.';
const OG_IMAGE = `${BASE_URL}/opengraph.jpg`;

interface Props {
  children: ReactNode;
  title?: string;
  description?: string;
  /** Relative path, e.g. "/about". Defaults to current pathname. */
  path?: string;
  /** Override og:type, defaults to "website" */
  ogType?: string;
  /** Inline JSON-LD schema string(s) to inject for this page */
  schemas?: string[];
  /** Keep unknown or unfinished pages out of search results. */
  noindex?: boolean;
}

export function PageLayout({ children, title, description, path, ogType = 'website', schemas, noindex = false }: Props) {
  const pageTitle = title
    ? title.toLowerCase().includes('hamza powerplayer') ? title : `${title} | HAMZA POWERPLAYER`
    : DEFAULT_TITLE;
  const pageDescription = description ?? DEFAULT_DESC;
  const pagePath = path ?? '/';
  const pageUrl = `${BASE_URL}${pagePath}`;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pagePath]);

  return (
    <>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'} />
      <link rel="canonical" href={pageUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="HAMZA POWERPLAYER" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={OG_IMAGE} />
      {schemas?.map((schema) => (
        <script key={schema} type="application/ld+json" data-page-schema="true">{schema}</script>
      ))}
      <div className="bg-[var(--bg-base)] min-h-screen text-[var(--text-primary)] overflow-x-hidden selection:bg-[var(--neon-cyan)] selection:text-[#04040a]">
        <AuroraEngine />
        <div className="noise-overlay" />
        <CustomCursor />
        <HamzaAI />
        <PageNavbar />
        <main className="relative z-10 pt-16">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}
