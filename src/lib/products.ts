export type ProductKind = 'app' | 'game' | 'project';
export type ProductStatus = 'published' | 'coming-soon' | 'source-available';

export const SITE_ORIGIN = 'https://www.hamzapowerplayer.com';

const OWNER = 'HAMZAPOWERPLAYER';
const GITHUB_PROFILE = `https://github.com/${OWNER}`;

/**
 * A secondary download destination. Only entries marked `verified` are ever
 * rendered as a clickable link. `unverified` entries are preserved for the
 * record but intentionally hidden because the destination could not be checked.
 */
export interface AltDownload {
  label: string;
  url: string;
  verification: 'verified' | 'unverified';
}

export interface ProductAccent {
  /** CSS gradient used for monogram tiles and hero accents. */
  gradient: string;
  /** Short uppercase label for the visual theme. */
  theme: string;
}

export interface ProductRecord {
  id: string;
  slug: string;
  route: string;
  name: string;
  kind: ProductKind;
  status: ProductStatus;
  summary?: string;
  tagline?: string;
  platform?: string;
  packageId?: string;
  genre?: string;
  gameplay?: string[];
  features?: string[];
  keywords?: string[];
  license?: string;
  version?: string;
  releaseDate?: string;
  storeUrl?: string;
  altDownloads?: AltDownload[];
  githubUrl?: string;
  repoName?: string;
  language?: string;
  topics?: string[];
  websiteUrl?: string;
  privacyUrl?: string;
  supportUrl?: string;
  docsUrl?: string;
  accent?: ProductAccent;
}

/**
 * Public product and project facts only. Store links are included only when
 * the exact listing was found on the supplied Play developer profile.
 *
 * GitHub metadata (descriptions, topics, licenses, languages) was read from the
 * public GitHub API for the `HAMZAPOWERPLAYER` account and is reproduced here
 * so the registry is the single source of truth.
 */
export const PRODUCTS: ProductRecord[] = [
  {
    id: 'paki-gpa',
    slug: 'paki-gpa',
    route: '/apps/paki-gpa',
    name: 'PakiGPA',
    kind: 'app',
    status: 'published',
    summary:
      'Offline CGPA and GPA calculator for Pakistani university students. Supports HEC, FAST-NUCES, NUST, COMSATS, UET, GIKI, LUMS, and PU grading scales, plus a custom scale builder, what-if planner, GPA trend chart, and PDF transcript export. No ads, no login, fully offline.',
    tagline: 'The CGPA calculator built for Pakistani students.',
    platform: 'Android',
    packageId: 'com.hamzapowerplayer.pakigpa',
    storeUrl: 'https://play.google.com/store/apps/details?id=com.hamzapowerplayer.pakigpa',
    features: [
      'Semester GPA calculator with credit hours and letter or marks grades',
      'Cumulative CGPA weighted by credit hours across semesters',
      'Multiple grading scales: HEC 4.0, FAST-NUCES, NUST, COMSATS, UET, GIKI, LUMS, PU',
      'Custom scale builder for any university grading table',
      'What-if grade planner and target CGPA calculator',
      'GPA trend chart with per-semester details',
      'In-progress courses and duplicate-semester templates',
      'Multiple degrees with separate grading scales',
      'PDF transcript export for scholarships and resumes',
      'Backup and restore without a cloud account',
      'Dark mode and fully offline operation',
      'No ads, no sign-up, no tracking',
    ],
    keywords: ['cgpa', 'gpa calculator', 'pakistan', 'hec', 'fast-nuces', 'nust', 'comsats', 'uet', 'giki', 'lums', 'offline'],
    accent: { gradient: 'linear-gradient(135deg,#22c55e,#16a34a)', theme: 'GREEN' },
  },
  {
    id: 'subsight',
    slug: 'subsight',
    route: '/apps/subsight',
    name: 'SubSight',
    kind: 'app',
    status: 'published',
    summary: 'Subscription tracking app for Android.',
    tagline: 'Track every subscription in one place.',
    platform: 'Android',
    packageId: 'com.hamzapowerplayer.Subsight',
    storeUrl: 'https://play.google.com/store/apps/details?id=com.hamzapowerplayer.Subsight',
    keywords: ['subscription tracker', 'android app', 'bills', 'renewals'],
    altDownloads: [
      {
        label: 'Uptodown',
        url: 'https://com-hamzapowerplayer-subsight.en.uptodown.com/android',
        verification: 'verified',
      },
    ],
    privacyUrl: `${SITE_ORIGIN}/privacy`,
    accent: { gradient: 'linear-gradient(135deg,#00f0ff,#7c3aed)', theme: 'CYAN' },
  },
  {
    id: 'the-last-bell',
    slug: 'the-last-bell',
    route: '/games/the-last-bell',
    name: 'THE LAST BELL',
    kind: 'game',
    status: 'published',
    summary:
      'First-person mobile horror for Android. Explore a darkened school, find three keys, avoid the entity, and escape.',
    tagline: 'Find the keys. Avoid the entity. Escape the school.',
    platform: 'Android',
    packageId: 'com.hamzapowerplayer.lastbell',
    storeUrl: 'https://play.google.com/store/apps/details?id=com.hamzapowerplayer.lastbell',
    genre: 'First-person survival horror',
    gameplay: [
      'Explore a darkened school rendered in first person',
      'Find three keys to unlock the exit',
      'Avoid an entity that hunts you through the halls',
      'Fully offline with touch controls',
    ],
    githubUrl: `${GITHUB_PROFILE}/last-bell`,
    repoName: 'last-bell',
    language: 'C#',
    license: 'Other',
    topics: [
      'android', 'android-game', 'csharp', 'first-person', 'game-development',
      'horror', 'horror-game', 'indie-game', 'mobile-game', 'offline',
      'survival-horror', 'touch-controls', 'unity', 'unity3d',
    ],
    keywords: ['horror game', 'unity', 'android game', 'offline'],
    accent: { gradient: 'linear-gradient(135deg,#7c3aed,#00f0ff)', theme: 'VIOLET' },
  },
  {
    id: 'pay-me-back',
    slug: 'pay-me-back',
    route: '/games/pay-me-back',
    name: 'PAY ME BACK',
    kind: 'game',
    status: 'coming-soon',
    summary:
      'Upcoming Android game by HAMZA POWERPLAYER. No public release, trailer, or download listing exists yet.',
    tagline: 'An upcoming Android title in early development.',
    platform: 'Android',
    packageId: 'com.hamzapowerplayer.paymeback',
    keywords: ['upcoming game', 'android game', 'coming soon'],
    accent: { gradient: 'linear-gradient(135deg,#f5c518,#f97316)', theme: 'GOLD' },
  },
  {
    id: 'decay-game',
    slug: 'decay',
    route: '/games/decay',
    name: 'DECAY',
    kind: 'game',
    status: 'coming-soon',
    summary:
      'Upcoming Android game by HAMZA POWERPLAYER. No public release, trailer, or download listing exists yet.',
    tagline: 'An upcoming Android title in early development.',
    platform: 'Android',
    packageId: 'com.hamzapowerplayer.decay',
    keywords: ['upcoming game', 'android game', 'coming soon'],
    accent: { gradient: 'linear-gradient(135deg,#22c55e,#0f766e)', theme: 'GREEN' },
  },
  {
    id: 'echoes-of-the-shadows',
    slug: 'echoes-of-the-shadows',
    route: '/games/echoes-of-the-shadows',
    name: 'ECHOES OF THE SHADOWS',
    kind: 'game',
    status: 'coming-soon',
    summary:
      'Upcoming Android game by HAMZA POWERPLAYER. No public release, trailer, or download listing exists yet.',
    tagline: 'An upcoming Android title in early development.',
    platform: 'Android',
    packageId: 'com.hamzapowerplayer.echoesoftheshadows',
    keywords: ['upcoming game', 'android game', 'coming soon'],
    accent: { gradient: 'linear-gradient(135deg,#ef4444,#7c3aed)', theme: 'CRIMSON' },
  },
  {
    id: 'decay',
    slug: 'decay',
    route: '/projects/decay',
    name: 'Decay',
    kind: 'project',
    status: 'source-available',
    summary:
      'A quiet, offline companion app that slowly fades if forgotten and leaves behind a Death Certificate when it passes. No login, no ads, no gamification.',
    tagline: 'Fades if forgotten. Leaves a Death Certificate.',
    platform: 'Android',
    githubUrl: `${GITHUB_PROFILE}/Decay`,
    repoName: 'Decay',
    language: 'TypeScript',
    license: 'MIT',
    topics: [
      'android-application', 'companion-app', 'emotional-design', 'expo',
      'meditation-app', 'minimalist', 'mobile-app', 'offline-first', 'react-native',
      'typescript',
    ],
    keywords: ['expo', 'react native', 'offline', 'companion app'],
    websiteUrl: `${SITE_ORIGIN}/projects/decay`,
    privacyUrl: `${SITE_ORIGIN}/privacy`,
    accent: { gradient: 'linear-gradient(135deg,#22c55e,#0f766e)', theme: 'GREEN' },
  },
  {
    id: 'decay-flutter-version',
    slug: 'decay-flutter-version',
    route: '/projects/decay-flutter-version',
    name: 'Decay — Flutter Version',
    kind: 'project',
    status: 'source-available',
    summary:
      'A quiet, offline Flutter companion that fades if forgotten and leaves a Death Certificate when it passes. Zero backend, zero tracking, MIT licensed.',
    tagline: 'The Flutter companion to Decay.',
    platform: 'Android',
    githubUrl: `${GITHUB_PROFILE}/DECAY-FLUTTER-VERSION`,
    repoName: 'DECAY-FLUTTER-VERSION',
    language: 'Dart',
    license: 'MIT',
    topics: [
      'android-widget', 'dart', 'digital-art', 'emotional-wellbeing', 'flutter',
      'impermanence', 'meditation', 'mit-license', 'no-backend', 'offline-first',
      'open-source', 'privacy-first',
    ],
    keywords: ['flutter', 'dart', 'offline', 'companion app'],
    websiteUrl: 'https://hamzapowerplayer.com',
    privacyUrl: `${SITE_ORIGIN}/privacy`,
    accent: { gradient: 'linear-gradient(135deg,#38bdf8,#22c55e)', theme: 'SKY' },
  },
  {
    id: 'dev-toolbox-free',
    slug: 'dev-toolbox-free',
    route: '/projects/dev-toolbox-free',
    name: 'DEV-TOOLBOX-FREE',
    kind: 'project',
    status: 'source-available',
    summary:
      'The 100% client-side, offline-first, privacy-first developer toolbox PWA.',
    tagline: 'Client-side developer tools with no server.',
    githubUrl: `${GITHUB_PROFILE}/DEV-TOOLBOX-FREE`,
    repoName: 'DEV-TOOLBOX-FREE',
    language: 'TypeScript',
    license: 'MIT',
    topics: [
      'developer-tools', 'json-formatter', 'jwt', 'offline-first', 'privacy-first',
      'pwa', 'react', 'typescript',
    ],
    keywords: ['developer tools', 'pwa', 'offline', 'json formatter', 'jwt'],
    privacyUrl: `${SITE_ORIGIN}/privacy`,
    accent: { gradient: 'linear-gradient(135deg,#00f0ff,#22c55e)', theme: 'CYAN' },
  },
  {
    id: 'image-upscaler-4k-free',
    slug: 'image-upscaler-4k-free',
    route: '/projects/image-upscaler-4k-free',
    name: 'IMAGE UPSCALER 4K FREE',
    kind: 'project',
    status: 'source-available',
    summary: 'IMAGE UPSCALER 4K FREE — an offline-first image upscaler project.',
    tagline: 'Offline-first image upscaling.',
    githubUrl: `${GITHUB_PROFILE}/IMAGE-UPSCALER-4K-FREE`,
    repoName: 'IMAGE-UPSCALER-4K-FREE',
    language: 'TypeScript',
    license: 'MIT',
    topics: [
      'image-upscaler-free', 'offline-first', 'privacy-first', 'react',
      'typescript', 'web-worker',
    ],
    keywords: ['image upscaler', 'pwa', 'web worker', 'offline'],
    privacyUrl: `${SITE_ORIGIN}/privacy`,
    accent: { gradient: 'linear-gradient(135deg,#f97316,#f5c518)', theme: 'AMBER' },
  },
  {
    id: 'pdf-toolkit-free',
    slug: 'pdf-toolkit-free',
    route: '/projects/pdf-toolkit-free',
    name: 'PDFToolkit-Free',
    kind: 'project',
    status: 'source-available',
    summary:
      'Every PDF tool. Zero uploads. Zero ads. Zero cost. Forever.',
    tagline: 'Every PDF tool, entirely offline.',
    githubUrl: `${GITHUB_PROFILE}/PDFToolkit-Free`,
    repoName: 'PDFToolkit-Free',
    language: 'TypeScript',
    license: 'MIT',
    topics: [
      'offline-first', 'pdf', 'pdf-toolkit', 'privacy-first', 'pwa', 'react',
      'typescript',
    ],
    keywords: ['pdf tools', 'pwa', 'offline', 'privacy'],
    privacyUrl: `${SITE_ORIGIN}/privacy`,
    accent: { gradient: 'linear-gradient(135deg,#ef4444,#f5c518)', theme: 'CRIMSON' },
  },
  {
    id: 'photopass',
    slug: 'photopass',
    route: '/projects/photopass',
    name: 'PhotoPass',
    kind: 'project',
    status: 'source-available',
    summary:
      'Specification-compliant, print-ready document photographs produced entirely on-device, with no account, no ads, no subscriptions, and no upload.',
    tagline: 'Print-ready document photos, on-device only.',
    platform: 'Android',
    githubUrl: `${GITHUB_PROFILE}/PHOTOPASS`,
    repoName: 'PHOTOPASS',
    language: 'Dart',
    license: 'MIT',
    topics: [
      'android-app', 'dart', 'face-detection', 'flutter', 'google-ml-kit',
      'id-photo', 'image-processing', 'internationalization', 'material-3',
      'mobile-app', 'no-ads', 'offline-first', 'passport-photo', 'pdf',
      'photo-editor', 'print-ready', 'privacy-first', 'riverpod', 'rtl-support',
      'visa-photo',
    ],
    keywords: ['passport photo', 'flutter', 'on-device', 'privacy', 'ml kit'],
    privacyUrl: `${SITE_ORIGIN}/privacy`,
    accent: { gradient: 'linear-gradient(135deg,#00f0ff,#38bdf8)', theme: 'SKY' },
  },
  {
    id: 'my-website',
    slug: 'my-website',
    route: '/projects/my-website',
    name: 'MY-WEBSITE',
    kind: 'project',
    status: 'source-available',
    summary: 'The HAMZA POWERPLAYER developer portfolio and product directory.',
    tagline: 'This website.',
    githubUrl: `${GITHUB_PROFILE}/MY-WEBSITE`,
    repoName: 'MY-WEBSITE',
    language: 'TypeScript',
    keywords: ['portfolio', 'website', 'typescript'],
    accent: { gradient: 'linear-gradient(135deg,#7c3aed,#00f0ff)', theme: 'VIOLET' },
  },
];

export const APPS = PRODUCTS.filter((product) => product.kind === 'app');
export const GAMES = PRODUCTS.filter((product) => product.kind === 'game');
export const PROJECTS = PRODUCTS.filter((product) => product.kind === 'project');

export function getProductByRoute(route: string) {
  return PRODUCTS.find((product) => product.route === route);
}

export function getProductBySlug(kind: ProductKind, slug: string) {
  return PRODUCTS.find((product) => product.kind === kind && product.slug === slug);
}

/** Verified alternative download destinations only. */
export function getVerifiedAltDownloads(product: ProductRecord) {
  return product.altDownloads?.filter((download) => download.verification === 'verified') ?? [];
}

export function initialsFor(name: string) {
  const cleaned = name.replace(/[—–-]/g, ' ').replace(/[^a-zA-Z0-9 ]/g, '');
  const parts = cleaned.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'HP';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

export const GITHUB_PROFILE_URL = GITHUB_PROFILE;
export const GITHUB_OWNER = OWNER;
