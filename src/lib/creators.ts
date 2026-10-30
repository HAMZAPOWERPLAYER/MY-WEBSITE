/**
 * Featured creator collaborations — official partners recognised by
 * HAMZA POWERPLAYER. SGD EDITZ is the flagship collaborator and must
 * stay first. Add future creators AFTER the first entry.
 *
 * Everything display-facing — homepage spotlight copy, profile page
 * copy, links and logo paths — lives here so partner updates are
 * data-only edits. A creator with a `profilePath` automatically gets a
 * dedicated profile experience: the App router matches
 * /creators/:slug and scripts/prerender.mjs prebuilds the HTML for
 * search engines.
 */

/** Shared spotlight wording (homepage card + profile page). */
export const SECTION_HEADING = 'CREATOR SPOTLIGHT';
export const COLLAB_MOTTO = 'Supporting creators. Building connections. Growing together.';
export const COLLAB_ATTRIBUTION = 'An official creator collaboration by HAMZA POWERPLAYER.';

/**
 * Product showcase shown on a creator's profile page. The product
 * record itself (icon, store URL, status, case-study route) comes from
 * src/lib/products.ts via `productId`; the copy below is the
 * collaboration display copy.
 */
export interface FeaturedProduct {
  productId: string;
  /** Display heading, e.g. "SUBSIGHT — SUBSCRIPTION TRACKER". */
  heading: string;
  description: string;
  features: string[];
  ctaLabel: string;
  /** Internal link label to the full product case study. */
  caseStudyLabel: string;
}

export interface CreatorCollab {
  id: string;
  name: string;
  /** URL segment under /creators/. */
  slug: string;
  /** Dedicated profile path, e.g. "/creators/sgd-editz". Omit for none. */
  profilePath?: string;
  /** Channel handle shown as plain text next to the identity. */
  handle: string;
  /** Public channel URL — the exact destination supplied by the partner. */
  channelUrl: string;
  /** Local, pre-optimised logo asset from /public (never hotlinked). */
  logo: string;
  logoAlt: string;
  /** Official badge asserted wherever the creator is showcased. */
  badge: string;
  /** The creator's craft, shown as a category chip on the profile page. */
  category: string;
  /** One-sentence spotlight introduction shown on the homepage card. */
  intro: string;
  /** Short introduction at the top of the profile page. */
  profileIntro: string;
  /** "About the creator" copy on the profile page. */
  about: string;
  /** OUR COLLABORATION bullets on the profile page (status-neutral wording). */
  collaborationPoints: string[];
  /** Primary CTA label — the exact partner-approved phrase. */
  ctaLabel: string;
  /** Secondary inline link label, same channel destination. */
  secondaryLabel: string;
  featuredProduct?: FeaturedProduct;
  /** Only `featured` creators get the premium homepage placement. */
  featured: boolean;
}

export const CREATORS: CreatorCollab[] = [
  {
    id: 'sgd-editz',
    name: 'SGD EDITZ',
    slug: 'sgd-editz',
    profilePath: '/creators/sgd-editz',
    handle: '@sgdeditz-07',
    channelUrl: 'https://www.youtube.com/@sgdeditz-07',
    logo: '/creators/sgd-editz.jpg',
    logoAlt: 'Official SGD EDITZ logo',
    badge: 'OFFICIAL COLLABORATION PARTNER',
    category: 'Anime Editor',
    intro:
      "Creativity deserves recognition. We're proud to collaborate with SGD EDITZ, an anime editing creator bringing creativity and passion to the anime community.",
    profileIntro:
      'Meet SGD EDITZ — an anime editing creator whose creativity and passion make every edit unique.',
    about:
      'SGD EDITZ is an anime editing creator focused on bringing anime moments to life through creative edits, transitions and visual storytelling. Through this collaboration, HAMZA POWERPLAYER supports independent creators and celebrates digital creativity.',
    collaborationPoints: [
      'Official collaboration with HAMZA POWERPLAYER.',
      'Creator promotion of SUBSIGHT.',
      'Creator recognition on the HAMZA POWERPLAYER website.',
      'Creator feature inside SUBSIGHT for the agreed 12-month period.',
    ],
    ctaLabel: 'VISIT YOUTUBE CHANNEL',
    secondaryLabel: 'Discover More From SGD EDITZ',
    featuredProduct: {
      productId: 'subsight',
      heading: 'SUBSIGHT — SUBSCRIPTION TRACKER',
      description: 'Track subscriptions, manage spending and remember renewal dates.',
      features: [
        'Subscription tracking.',
        'Spending overview.',
        'Renewal reminders.',
        'Offline functionality.',
        'Privacy-focused experience.',
      ],
      ctaLabel: 'DOWNLOAD SUBSIGHT',
      caseStudyLabel: 'View full product details',
    },
    featured: true,
  },
];

/** Homepage section shows feature-first, in registration order. */
export const featuredCreators = CREATORS.filter((creator) => creator.featured);
