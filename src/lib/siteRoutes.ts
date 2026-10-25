export const STATIC_PAGE_ROUTES = [
  '/',
  '/about',
  '/privacy',
  '/terms',
  '/contact',
  '/apps',
  '/games',
  '/projects',
  '/links',
  '/blog',
  '/faq',
  '/hire',
  '/tools',
  '/cookies',
  '/disclaimer',
  '/sitemap',
  '/coming-soon',
  '/subsight/privacy-policy',
  '/pakigpa/privacy-policy',
  '/the-last-bell/privacy-policy',
] as const;

export const INDEXABLE_STATIC_PAGE_ROUTES = STATIC_PAGE_ROUTES.filter((route) => route !== '/coming-soon');
