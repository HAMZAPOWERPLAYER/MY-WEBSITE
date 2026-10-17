import { PageLayout } from '@/components/layout/PageLayout';
import { PageHero } from '@/components/layout/PageHero';
import { Link } from 'wouter';
import { PRODUCTS, SITE_ORIGIN } from '@/lib/products';
import { INDEXABLE_STATIC_PAGE_ROUTES } from '@/lib/siteRoutes';

const MAIN_PAGES = [
  { icon: '🏠', label: 'Home', href: '/' },
  { icon: '🙋', label: 'About', href: '/about' },
  { icon: '📱', label: 'Apps', href: '/apps' },
  { icon: '🎮', label: 'Games', href: '/games' },
  { icon: '🧩', label: 'Projects', href: '/projects' },
  { icon: '🔗', label: 'Links', href: '/links' },
  { icon: '📝', label: 'Blog', href: '/blog' },
  { icon: '🛠', label: 'Tools', href: '/tools' },
  { icon: '❓', label: 'FAQ', href: '/faq' },
  { icon: '📞', label: 'Contact', href: '/contact' },
  { icon: '💼', label: 'Hire Me', href: '/hire' },
];

const LEGAL_PAGES = [
  { icon: '🔒', label: 'Privacy Policy', href: '/privacy' },
  { icon: '📜', label: 'Terms of Service', href: '/terms' },
  { icon: '🍪', label: 'Cookie Policy', href: '/cookies' },
  { icon: '⚠️', label: 'Disclaimer', href: '/disclaimer' },
];

function downloadSitemap() {
  const routes = [...new Set([...INDEXABLE_STATIC_PAGE_ROUTES, ...PRODUCTS.map((product) => product.route)])];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${routes.map((route) => `<url>
    <loc>${SITE_ORIGIN}${route}</loc>
    <priority>${route === '/' ? '1.0' : '0.7'}</priority>
  </url>`).join('\n  ')}
</urlset>`;
  const blob = new Blob([xml], { type: 'application/xml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'sitemap.xml'; a.click();
  URL.revokeObjectURL(url);
}

export default function SitemapPage() {
  return (
    <PageLayout title="HAMZA POWERPLAYER Website Sitemap | Apps and Projects" description="Browse every public page, app, game, and software project on the HAMZA POWERPLAYER portfolio. Follow direct links to product details and legal pages." path="/sitemap">
      <PageHero label="NAVIGATION" title="Sitemap" subtitle="Every page, organized" />

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Main pages */}
        <h2 className="font-display font-black text-xl text-[var(--text-primary)] mb-4">Main Pages</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {MAIN_PAGES.map(p => (
            <Link key={p.href} href={p.href}
              className="glass-card rounded-xl p-5 text-center hover:border-[rgba(0,240,255,0.3)] hover:text-[var(--neon-cyan)] transition-all group">
              <div className="text-3xl mb-2">{p.icon}</div>
              <div className="font-display font-black text-sm text-[var(--text-primary)] group-hover:text-[var(--neon-cyan)] transition-colors">{p.label}</div>
            </Link>
          ))}
        </div>

        <h2 className="font-display font-black text-xl text-[var(--text-primary)] mb-4">Apps, Games & Projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
          {PRODUCTS.map((product) => (
            <Link key={product.id} href={product.route} className="glass-card rounded-xl p-4 hover:border-[rgba(0,240,255,0.2)] transition-all">
              <span className="font-display text-sm font-bold text-[var(--text-primary)]">{product.name}</span>
              <span className="mt-1 block font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)]">{product.kind} · {product.status.replace('-', ' ')}</span>
            </Link>
          ))}
        </div>

        {/* Legal pages */}
        <h2 className="font-display font-black text-xl text-[var(--text-muted)] mb-4">Legal Pages</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
          {LEGAL_PAGES.map(p => (
            <Link key={p.href} href={p.href}
              className="glass-card rounded-xl p-4 text-center hover:border-[rgba(0,240,255,0.2)] transition-all group opacity-75 hover:opacity-100">
              <div className="text-2xl mb-2">{p.icon}</div>
              <div className="font-accent text-xs text-[var(--text-muted)] group-hover:text-[var(--neon-cyan)] transition-colors">{p.label}</div>
            </Link>
          ))}
        </div>

        {/* Download */}
        <div className="glass-card rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="font-display font-black text-sm text-[var(--text-primary)] mb-1">SEO Sitemap</div>
            <div className="font-mono text-xs text-[var(--text-muted)]">XML sitemap with canonical pages and product routes</div>
          </div>
          <button onClick={downloadSitemap}
            className="px-5 py-2.5 rounded-xl font-display text-xs font-black text-[#04040a] tracking-widest whitespace-nowrap transition-all hover:brightness-110"
            style={{ background: 'linear-gradient(90deg, var(--neon-cyan), var(--neon-violet))' }}>
            Download sitemap.xml
          </button>
        </div>
      </div>
    </PageLayout>
  );
}
