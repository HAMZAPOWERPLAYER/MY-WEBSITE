import { PRODUCTS } from './products';

export type LinkCategory = 'Apps' | 'Games' | 'Projects' | 'GitHub' | 'Social' | 'Website';

export interface SiteLink {
  title: string;
  url: string;
  category: LinkCategory;
  associatedWith: string;
  verification: 'user-confirmed' | 'http-verified' | 'public-repository' | 'internal-route';
}

export const SOCIAL_LINKS: SiteLink[] = [
  {
    title: 'GitHub Profile',
    url: 'https://github.com/HAMZAPOWERPLAYER',
    category: 'Social',
    associatedWith: 'HAMZA POWERPLAYER',
    verification: 'http-verified',
  },
  {
    title: 'LinkedIn',
    url: 'https://www.linkedin.com/in/hamzapowerplayerofficial',
    category: 'Social',
    associatedWith: 'HAMZA POWERPLAYER',
    verification: 'user-confirmed',
  },
  {
    title: 'WhatsApp',
    url: 'https://wa.me/923129584661',
    category: 'Social',
    associatedWith: 'HAMZA POWERPLAYER',
    verification: 'user-confirmed',
  },
  {
    title: 'YouTube',
    url: 'https://youtube.com/@hamzapowerplayer',
    category: 'Social',
    associatedWith: 'HAMZA POWERPLAYER',
    verification: 'user-confirmed',
  },
];

export const PRODUCT_LINKS: SiteLink[] = PRODUCTS.flatMap((product) => {
  const links: SiteLink[] = [
    {
      title: product.name,
      url: product.route,
      category: product.kind === 'app' ? 'Apps' : product.kind === 'game' ? 'Games' : 'Projects',
      associatedWith: product.name,
      verification: 'internal-route',
    },
  ];

  if (product.storeUrl) {
    links.push({
      title: 'Google Play Store',
      url: product.storeUrl,
      category: product.kind === 'game' ? 'Games' : 'Apps',
      associatedWith: product.name,
      verification: 'http-verified',
    });
  }

  if (product.githubUrl) {
    links.push({
      title: 'GitHub Repository',
      url: product.githubUrl,
      category: 'GitHub',
      associatedWith: product.name,
      verification: 'public-repository',
    });
  }

  return links;
});

export const SITE_LINKS: SiteLink[] = [
  ...PRODUCT_LINKS,
  ...SOCIAL_LINKS,
  { title: 'Google Play Developer Profile', url: 'https://play.google.com/store/apps/dev?id=4745570286607188025', category: 'Apps', associatedWith: 'HAMZA POWERPLAYER', verification: 'http-verified' },
  { title: 'Homepage', url: '/', category: 'Website', associatedWith: 'HAMZA POWERPLAYER', verification: 'internal-route' },
  { title: 'About', url: '/about', category: 'Website', associatedWith: 'HAMZA POWERPLAYER', verification: 'internal-route' },
  { title: 'Contact', url: '/contact', category: 'Website', associatedWith: 'HAMZA POWERPLAYER', verification: 'internal-route' },
  { title: 'Privacy Policy', url: '/privacy', category: 'Website', associatedWith: 'HAMZA POWERPLAYER', verification: 'internal-route' },
  { title: 'Terms of Service', url: '/terms', category: 'Website', associatedWith: 'HAMZA POWERPLAYER', verification: 'internal-route' },
];
