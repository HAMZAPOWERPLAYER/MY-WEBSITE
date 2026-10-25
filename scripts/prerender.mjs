import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { PassThrough } from 'node:stream';
import React from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { createServer } from 'vite';

process.env.NODE_ENV = 'production';

const outputDir = path.resolve('dist/public');
const vite = await createServer({
  configFile: path.resolve('vite.config.ts'),
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error',
});

function extractMetadata(markup) {
  const tags = [];
  const pattern = /<title\b[^>]*>[\s\S]*?<\/title>|<(?:meta|link)\b[^>]*\/?>/gi;
  const body = markup.replace(pattern, (tag) => {
    tags.push(tag);
    return '';
  });
  return { tags, body };
}

function isRouteMetadata(tag) {
  if (/^<title\b/i.test(tag)) return true;
  const name = tag.match(/\bname=["']([^"']+)["']/i)?.[1];
  const property = tag.match(/\bproperty=["']([^"']+)["']/i)?.[1];
  const rel = tag.match(/\brel=["']([^"']+)["']/i)?.[1];
  return (
    ['description', 'robots', 'twitter:card', 'twitter:title', 'twitter:description', 'twitter:image'].includes(name) ||
    ['og:type', 'og:title', 'og:description', 'og:url', 'og:image'].includes(property) ||
    rel === 'canonical'
  );
}

function updateHead(template, metadata) {
  return template.replace(/<head\b[^>]*>([\s\S]*?)<\/head>/i, (_whole, originalHead) => {
    const kept = originalHead.replace(
      /<title\b[^>]*>[\s\S]*?<\/title>|<(?:meta|link)\b[^>]*\/?>/gi,
      (tag) => isRouteMetadata(tag) ? '' : tag,
    );
    return `<head>${kept}\n${metadata.join('\n')}\n</head>`;
  });
}

function routeOutputPath(route) {
  if (route === '/') return path.join(outputDir, 'index.html');
  return path.join(outputDir, `${route.slice(1)}.html`);
}

function renderAppToString(element) {
  return new Promise((resolve, reject) => {
    const output = new PassThrough();
    const chunks = [];
    output.on('data', (chunk) => chunks.push(chunk));
    output.on('error', reject);
    output.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    let stream;
    stream = renderToPipeableStream(element, {
      onAllReady() {
        stream.pipe(output);
      },
      onShellError(error) {
        reject(error);
      },
      onError(error) {
        console.error('SSR render warning:', error);
      },
    });
  });
}

try {
  const [{ default: App }, { PRODUCTS, SITE_ORIGIN }, { STATIC_PAGE_ROUTES, INDEXABLE_STATIC_PAGE_ROUTES }] = await Promise.all([
    vite.ssrLoadModule('/src/App.tsx'),
    vite.ssrLoadModule('/src/lib/products.ts'),
    vite.ssrLoadModule('/src/lib/siteRoutes.ts'),
  ]);
  const template = await readFile(path.join(outputDir, 'index.html'), 'utf8');
  const routes = [...new Set([...STATIC_PAGE_ROUTES, ...PRODUCTS.map((product) => product.route)])];

  for (const route of routes) {
    const rendered = await renderAppToString(React.createElement(App, { initialPath: route }));
    const { tags, body } = extractMetadata(rendered);
    const withHead = updateHead(template, tags);
    const page = withHead.replace(
      '<div id="root"></div>',
      `<div id="root" data-prerendered="true">${body}</div>`,
    );
    const destination = routeOutputPath(route);
    await mkdir(path.dirname(destination), { recursive: true });
    await writeFile(destination, page);
    console.log(`Prerendered ${route} -> ${path.relative(process.cwd(), destination)}`);

    // Also emit a directory index for policy pages so the trailing-slash URLs
    // (used by Google Play Console) resolve with a 200 instead of a redirect.
    if (route.endsWith('/privacy-policy')) {
      const dirIndex = path.join(outputDir, route.slice(1), 'index.html');
      await mkdir(path.dirname(dirIndex), { recursive: true });
      await writeFile(dirIndex, page);
      console.log(`Prerendered ${route}/ -> ${path.relative(process.cwd(), dirIndex)}`);
    }
  }

  const notFoundRendered = await renderAppToString(React.createElement(App, { initialPath: '/__not-found__' }));
  const notFound = extractMetadata(notFoundRendered);
  const notFoundTags = notFound.tags.filter(
    (tag) => !/^<meta\b[^>]*name=["']robots["']/i.test(tag) && !/^<link\b[^>]*rel=["']canonical["']/i.test(tag),
  );
  notFoundTags.push('<title>Page Not Found | HAMZA POWERPLAYER</title>');
  notFoundTags.push('<meta name="description" content="The requested page could not be found."/>');
  notFoundTags.push('<meta name="robots" content="noindex, nofollow"/>');
  const notFoundPage = updateHead(template, notFoundTags).replace(
    '<div id="root"></div>',
    `<div id="root" data-prerendered="true">${notFound.body}</div>`,
  );
  await writeFile(path.join(outputDir, '404.html'), notFoundPage);

  const sitemapRoutes = [...new Set([...INDEXABLE_STATIC_PAGE_ROUTES, ...PRODUCTS.map((product) => product.route)])];
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapRoutes.map((route) => `  <url><loc>${SITE_ORIGIN}${route}</loc></url>`).join('\n')}\n</urlset>\n`;
  await writeFile(path.join(outputDir, 'sitemap.xml'), sitemapXml);
  console.log(`Generated sitemap.xml with ${sitemapRoutes.length} canonical routes.`);
} finally {
  await vite.close();
}
