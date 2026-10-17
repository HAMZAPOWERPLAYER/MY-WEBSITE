import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import { createServer } from 'vite';

process.env.NODE_ENV = 'production';

const vite = await createServer({
  configFile: path.resolve('vite.config.ts'),
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error',
});

const errors = [];
const seoLengthWarnings = [];

try {
  const [{ PRODUCTS, SITE_ORIGIN }, { SITE_LINKS }, { STATIC_PAGE_ROUTES, INDEXABLE_STATIC_PAGE_ROUTES }] = await Promise.all([
    vite.ssrLoadModule('/src/lib/products.ts'),
    vite.ssrLoadModule('/src/lib/siteLinks.ts'),
    vite.ssrLoadModule('/src/lib/siteRoutes.ts'),
  ]);
  const routeSet = new Set([...STATIC_PAGE_ROUTES, ...PRODUCTS.map((product) => product.route)]);
  const productRoutes = PRODUCTS.map((product) => product.route);

  if (new Set(productRoutes).size !== productRoutes.length) errors.push('Duplicate product route in product registry.');
  if (new Set(PRODUCTS.map((product) => product.id)).size !== PRODUCTS.length) errors.push('Duplicate product ID in product registry.');

  for (const product of PRODUCTS) {
    if (!product.slug || !product.route.startsWith('/')) errors.push(`Invalid product route: ${product.name}`);
    if (product.kind === 'game' && (!product.packageId || product.status !== 'coming-soon' || product.storeUrl)) {
      errors.push(`Game facts/status are incomplete or imply an unverified release: ${product.name}`);
    }
    for (const outbound of [product.githubUrl, product.storeUrl].filter(Boolean)) {
      try {
        const parsed = new URL(outbound);
        if (!['http:', 'https:'].includes(parsed.protocol)) errors.push(`Unsupported URL protocol: ${outbound}`);
      } catch {
        errors.push(`Invalid external URL: ${outbound}`);
      }
    }
  }

  for (const item of SITE_LINKS) {
    if (item.url.startsWith('/')) {
      if (!routeSet.has(item.url)) errors.push(`Internal link has no registered route: ${item.url}`);
    } else {
      try {
        const parsed = new URL(item.url);
        if (!['http:', 'https:'].includes(parsed.protocol)) errors.push(`Unsupported link protocol: ${item.url}`);
      } catch {
        errors.push(`Invalid external link: ${item.url}`);
      }
    }
  }

  const indexableRoutes = [...new Set([...INDEXABLE_STATIC_PAGE_ROUTES, ...productRoutes])];
  for (const route of indexableRoutes) {
    const file = route === '/' ? 'dist/public/index.html' : `dist/public${route}.html`;
    let html;
    try {
      html = await readFile(file, 'utf8');
    } catch {
      errors.push(`Missing prerendered route file: ${route}`);
      continue;
    }
    const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? '';
    const description = html.match(/<meta name="description" content="([^"]*)"/i)?.[1] ?? '';
    const canonical = html.match(/<link rel="canonical" href="([^"]*)"/i)?.[1] ?? '';
    const h1Count = (html.match(/<h1\b/gi) ?? []).length;
    if (!title) errors.push(`Missing title: ${route}`);
    if (!description) errors.push(`Missing meta description: ${route}`);
    if (canonical !== `${SITE_ORIGIN}${route}`) errors.push(`Canonical mismatch for ${route}: ${canonical || '(missing)'}`);
    if (h1Count !== 1) errors.push(`Expected one H1 on ${route}; found ${h1Count}.`);
    if (title.length < 50 || title.length > 65) seoLengthWarnings.push(`${route}: title ${title.length} chars`);
    if (description.length < 140 || description.length > 160) seoLengthWarnings.push(`${route}: description ${description.length} chars`);
    if (!html.includes('data-prerendered="true"')) errors.push(`Route is not server-rendered: ${route}`);
  }

  const sitemapPath = 'dist/public/sitemap.xml';
  const sitemap = await readFile(sitemapPath, 'utf8');
  if (!sitemap.startsWith('<?xml version=')) errors.push('Generated sitemap is not XML.');
  const locations = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
  if (new Set(locations).size !== locations.length) errors.push('Sitemap contains duplicate URLs.');
  for (const route of indexableRoutes) {
    if (!locations.includes(`${SITE_ORIGIN}${route}`)) errors.push(`Sitemap is missing ${route}.`);
  }
  if (locations.some((url) => url.includes('https://hamzapowerplayer.com/'))) errors.push('Sitemap contains non-canonical non-www URLs.');
  if (locations.some((url) => url.includes('/coming-soon'))) errors.push('Sitemap contains a generic coming-soon page.');

  const robots = await readFile('dist/public/robots.txt', 'utf8');
  if (!robots.startsWith('User-agent:')) errors.push('robots.txt is missing or contains HTML instead of plain text.');
  if (!robots.includes(`${SITE_ORIGIN}/sitemap.xml`)) errors.push('robots.txt does not point to the canonical sitemap.');

  for (const asset of ['favicon.svg', 'opengraph.jpg']) {
    try {
      await access(path.join('dist/public', asset));
    } catch {
      errors.push(`Missing public asset: ${asset}`);
    }
  }

  console.log(`Checked ${indexableRoutes.length} prerendered pages, ${PRODUCTS.length} products, ${SITE_LINKS.length} directory links, sitemap, robots.txt, and core social assets.`);
  for (const warning of seoLengthWarnings) console.warn(`SEO LENGTH REVIEW: ${warning}`);
  if (errors.length) {
    for (const error of errors) console.error(`ERROR: ${error}`);
    process.exitCode = 1;
  } else {
    console.log('Route, link, canonical, H1, metadata presence, sitemap, robots, and core asset checks passed.');
  }
} finally {
  await vite.close();
}
