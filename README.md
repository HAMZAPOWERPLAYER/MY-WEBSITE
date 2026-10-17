# HAMZA POWERPLAYER — Developer Portfolio & Application Directory

> A polished, fast, accessible, and search-engine-friendly developer portfolio and application directory built for **HAMZA POWERPLAYER**. The site presents the verified SubSight and PakiGPA Android apps, public GitHub software projects, upcoming games, and verified contact destinations — with no fabricated activity, ratings, reviews, or download counts.

**Live site:** https://www.hamzapowerplayer.com (canonical `www` hostname; non-www redirects)

---

## Table of contents

1. [Overview](#1-overview)
2. [Quick facts](#2-quick-facts)
3. [Feature summary](#3-feature-summary)
4. [System architecture](#4-system-architecture)
5. [Repository layout](#5-repository-layout)
6. [Getting started](#6-getting-started)
7. [Scripts](#7-scripts)
8. [Configuration](#8-configuration)
9. [Data & link integrity](#9-data--link-integrity)
10. [Build & release](#10-build--release)
11. [QA & verification](#11-qa--verification)
12. [Troubleshooting & FAQ](#12-troubleshooting--faq)
13. [Privacy & data handling](#13-privacy--data-handling)
14. [Known limitations](#14-known-limitations)
15. [Roadmap](#15-roadmap)
16. [Credits](#16-credits)
17. [Contributing](#17-contributing)
18. [Document control](#18-document-control)

---

## 1. Overview

This is a single-page React application that is prerendered to static HTML at build time, serving as the official developer portfolio and application directory for HAMZA POWERPLAYER. It is built as a serious, enterprise-grade web presence: a typed product registry, per-product detail pages, a complete links directory, and honest publication status for every product.

**Core principles**

- Only verified public data is shown. No fabricated download counts, ratings, reviews, or store links.
- One central typed registry (`src/lib/products.ts`) is the single source of truth for cards, detail pages, navigation, the `/links` directory, and the sitemap.
- Every public route is prerendered to static HTML so search engines and browser refreshes work in production.
- Missing or unverified information is shown as unavailable, never as a fake button.
- Replit platform artifacts and unused fabricated social-proof components have been removed.

## 2. Quick facts

| Field | Value |
|---|---|
| Project name | HAMZA POWERPLAYER — Developer Portfolio & Application Directory |
| Live site | https://www.hamzapowerplayer.com |
| Canonical hostname | `www.hamzapowerplayer.com` (non-www redirects) |
| Framework | React 19 + TypeScript 5.9 (strict) |
| Build tool | Vite 7 (`@vitejs/plugin-react`) |
| Styling | Tailwind CSS 4 (`@tailwindcss/vite`) + custom CSS |
| Routing | `wouter` 3 (lazy-loaded routes) |
| Package manager | pnpm 11 (with `pnpm-workspace.yaml` catalog) |
| Deployment target | Vercel (static output, clean URLs) |
| Public routes | 29 (prerendered) |
| Public products | 2 published apps, 4 games in development, 8 public projects |
| Published apps | SubSight, PakiGPA |
| Games in development | THE LAST BELL, PAY ME BACK, DECAY, ECHOES OF THE SHADOWS |
| Public repositories | 8 (verified via GitHub API) |
| Backend | None — fully static, contact via WhatsApp drafts |
| License (portfolio) | Private (`"private": true`) |

## 3. Feature summary

### 3.1 Homepage
- Professional HAMZA POWERPLAYER branding with a single real `<h1>`.
- Hero section with gravity-title interaction and rotating subtitles.
- Featured-apps/projects/games showcase (derived from the registry).
- Category grid: Apps / Games / Projects / Links.
- About, skills solar system, forge, gravity room, tech stack universe, neural network, AI capabilities, timeline, signal, roadmap, philosophy, wall of fire, console, multiverse, mirror, contact, vault.
- No fake statistics, simulated notifications, or fabricated reviews.

### 3.2 Dedicated pages
- `/apps/subsight` — published Android app, verified Google Play + Uptodown links.
- `/apps/paki-gpa` — published Android app, verified Google Play link.
- `/games/the-last-bell`, `/games/pay-me-back`, `/games/decay`, `/games/echoes-of-the-shadows` — all **COMING SOON**, no download buttons, package IDs displayed honestly.
- `/projects/*` — 8 public GitHub repositories with verified descriptions, topics, languages, and licenses.
- Static pages: About, Privacy, Terms, Contact, Apps, Games, Projects, Links, Blog, FAQ, Hire, Tools, Cookies, Disclaimer, Sitemap, Coming Soon, 404.

### 3.3 Application directory & metadata
- `src/lib/products.ts` — typed `ProductRecord` with stable ID, slug, route, status, summary, tagline, platform, package ID, store URL, alternative downloads (with `verified`/`unverified`), GitHub URL, repo name, language, topics, license, keywords, features, accent theme, and verified destination URLs.
- Missing data is represented explicitly; nothing is invented.

### 3.4 GitHub & project showcase
- 8 public repositories verified through the GitHub API: Decay, DECAY-FLUTTER-VERSION, DEV-TOOLBOX-FREE, IMAGE-UPSCALER-4K-FREE, last-bell, MY-WEBSITE, PDFToolkit-Free, PHOTOPASS.
- Repository descriptions, topics, languages, and licenses are copied from public metadata.

### 3.5 SEO & discoverability
- Unique `<title>` and meta description per route (length-validated 50–65 / 140–160 chars).
- Canonical URLs on `https://www.hamzapowerplayer.com`.
- Open Graph and Twitter Card metadata.
- XML sitemap (`dist/public/sitemap.xml`) with 29 canonical, non-duplicate URLs.
- `robots.txt` pointing at the canonical sitemap; AI training scrapers disallowed.
- JSON-LD structured data (WebPage, BreadcrumbList, CollectionPage, VideoGame) only where accurate.
- Semantic HTML, logical heading hierarchy, descriptive alt text, internal links.
- Unknown routes render `404.html` with `noindex, nofollow`.

### 3.6 Performance & accessibility
- Code-splitting: lazy-loaded route chunks + `manualChunks` for `react-vendor`, `icons`, `motion`.
- `prefers-reduced-motion` respected (animations/transitions disabled, smooth scroll off).
- Visible focus outlines (`:focus-visible`), semantic controls, descriptive links.
- Responsive layouts for phones, tablets, laptops, desktops.

### 3.7 Design
- Cohesive neon/cyan/violet identity, reusable glass-card components, monogram avatars (no fabricated artwork), subtle purposeful interactions.

## 4. System architecture

### 4.1 Routing
`wouter` `Switch`/`Route` in `src/App.tsx`. All page components are `React.lazy`-loaded. The router supports an `initialPath` prop used by the static prerenderer.

### 4.2 Prerendering (`scripts/prerender.mjs`)
1. Vite builds the client bundle to `dist/public`.
2. `prerender.mjs` starts Vite in SSR middleware mode, loads `App.tsx`, `products.ts`, and `siteRoutes.ts`.
3. For every static route plus every product route, it renders `App` to a string with `renderToPipeableStream`, extracts route metadata (`<title>`, meta, canonical, OG, Twitter, JSON-LD) from the rendered markup, and writes a prerendered HTML file with the metadata in `<head>` and the body in `<div id="root" data-prerendered="true">`.
4. Writes `404.html` (noindex, nofollow).
5. Generates `sitemap.xml` from indexable static routes + product routes.

### 4.3 Data flow
```
src/lib/products.ts  ──► APPS / GAMES / PROJECTS / getProductBySlug / getVerifiedAltDownloads
       │
       ├──► src/pages/* (cards, detail pages, GamesPage, AppsPage, ProjectsPage)
       ├──► src/components/sections/FeaturedShowcase.tsx
       ├──► src/lib/siteLinks.ts (links directory, derived)
       └──► scripts/prerender.mjs (sitemap routes)
```

### 4.4 Link integrity
`scripts/check-links.mjs` validates: duplicate product routes/IDs, game status rules, URL protocols, internal route existence, per-route title/description/canonical/H1 presence, prerender flag, sitemap XML + uniqueness + completeness, robots.txt, and core assets. It does **not** fail the build when a third-party host is unreachable.

## 5. Repository layout

```
C:\FIX\
├── index.html                 # Vite entry HTML template
├── vite.config.ts             # Vite + React + Tailwind, manual chunks
├── tsconfig.json              # Strict TypeScript, path alias @/*
├── vercel.json                # Vercel build/output config
├── pnpm-workspace.yaml        # pnpm catalog + allowBuilds
├── package.json
├── public/
│   ├── favicon.svg
│   ├── opengraph.jpg
│   ├── robots.txt
│   └── sitemap.xml            # (generated at build)
├── scripts/
│   ├── prerender.mjs          # SSR prerender + sitemap generator
│   ├── check-links.mjs        # Route/canonical/metadata/sitemap validator
│   └── audit-seo.cjs          # Helper: print title/description lengths
├── src/
│   ├── App.tsx                # Wouter router (lazy routes)
│   ├── main.tsx
│   ├── index.css              # Global styles, focus, reduced-motion
│   ├── lib/
│   │   ├── products.ts        # Central typed product registry
│   │   ├── siteLinks.ts       # Links directory (derived from products + social)
│   │   ├── siteRoutes.ts      # Static route list
│   │   └── utils.ts
│   ├── pages/                 # Route components (29 public + 404)
│   ├── components/
│   │   ├── layout/            # PageLayout, PageNavbar, PageHero
│   │   ├── sections/          # Page sections (About, Hero, Footer, ...)
│   │   └── effects/           # Canvas/animation effects
│   └── components/ui/         # Form primitives
├── docs/
│   └── LINK_INVENTORY.md      # Verified link audit
└── README.md                  # This document
```

## 6. Getting started

### Prerequisites
- Node.js v22+ (pnpm 11 requires it)
- pnpm 11+

### Install
```bash
pnpm install
```

### Run (development)
```bash
pnpm run dev
# http://localhost:5000
```

### Run (production preview)
```bash
pnpm run build
pnpm run serve
# http://localhost:5000
```

## 7. Scripts

| Script | What it does |
|---|---|
| `pnpm run dev` | Vite dev server with HMR |
| `pnpm run build` | Production build + SSR prerender + sitemap.xml |
| `pnpm run serve` | Vite preview of `dist/public` |
| `pnpm run typecheck` | `tsc --noEmit` (strict) |
| `pnpm run check:links` | Validates routes, canonicals, H1s, metadata, sitemap, robots, assets |

## 8. Configuration

| Variable | Default | Purpose |
|---|---|---|
| `PORT` | `5000` | Server port for dev/preview |
| `BASE_PATH` | `/` | Base path for the app |
| `NODE_ENV` | (set by pnpm) | Enables prerender production mode |

The canonical site origin is hardcoded in `src/lib/products.ts` as `SITE_ORIGIN = 'https://www.hamzapowerplayer.com'` and mirrored in `src/components/layout/PageLayout.tsx`. Change both if the domain changes.

## 9. Data & link integrity

- Store links are only included when the exact Google Play listing was verified (currently SubSight and PakiGPA).
- The SubSight Uptodown link (`https://com-hamzapowerplayer-subsight.en.uptodown.com/android`) was **verified on re-check** (live as "Subsight 1.0.5" by HAMZA POWERPLAYER, package `com.hamzapowerplayer.subsight`). It is rendered as a verified "Alternative Download" on `/apps/subsight`.
- PakiGPA (`https://play.google.com/store/apps/details?id=com.hamzapowerplayer.pakigpa`) was verified as a published Android app (CGPA calculator for Pakistani students). Its listing provides support email `hamzapowerplayer.global@gmail.com` and phone `+92 312 9584661`.
- GitHub metadata (descriptions, topics, languages, licenses) was read from the public GitHub API for `HAMZAPOWERPLAYER` (8 public repositories).
- `scripts/check-links.mjs` validates internal routes and configured external URLs syntactically; it does not fail the build when a third-party host is temporarily unavailable.

## 10. Build & release

### Build configuration

| Setting | Value |
|---|---|
| Output directory | `dist/public` |
| Empty output dir | Yes |
| Chunk size warning limit | 700 KB |
| Manual chunks | `react-vendor`, `icons`, `motion` |
| Clean URLs | Yes (Vercel) |
| Trailing slash | No |

### Local release procedure
1. Run `pnpm run typecheck` — must exit 0.
2. Run `pnpm run build` — must exit 0; check `Generated sitemap.xml with N canonical routes`.
3. Run `pnpm run check:links` — must exit 0.
4. Inspect `dist/public/` for prerendered HTML files and `sitemap.xml`.
5. Serve locally with `pnpm run serve` and verify routes in a browser.

### Release history

| Artifact | Routes | Notes |
|---|---|---|
| Current build | 29 | SubSight + PakiGPA published; 4 games coming soon; 8 projects |

## 11. QA & verification

### Automated checks

| Check | Command | Result |
|---|---|---|
| Type check | `pnpm run typecheck` | exit 0 |
| Production build | `pnpm run build` | exit 0, 29 routes prerendered, sitemap generated |
| Link & metadata validation | `pnpm run check:links` | exit 0, all route/canonical/H1/metadata/sitemap/robots/asset checks passed, 0 SEO length warnings |

### Content assertions verified
- All 4 game package IDs present + `COMING SOON` on game pages.
- SubSight and PakiGPA Play Store links present.
- Uptodown link rendered on SubSight page (verified).
- No fabricated-claim strings (download counts, ratings, reviews, simulated activity) in rendered output.
- No unverified store links rendered.

### Manual verification not performed
- Responsive/browser behavior was not visually confirmed (no browser tooling available in this environment).
- Console-error checks on rendered pages were not performed.

## 12. Troubleshooting & FAQ

**The editor cannot find a JDK / Android build fails immediately.**
This is a Unity/Android project concern, not applicable to this web portfolio.

**`pnpm install` fails with `ERR_PNPM_CATALOG_ENTRY_NOT_FOUND_FOR_SPEC`.**
Ensure `pnpm-workspace.yaml` exists at the root with the `catalog:` section. It has been restored.

**`pnpm install` fails with `ERR_PNPM_IGNORED_BUILDS`.**
Run `pnpm approve-builds` or set `allowBuilds: esbuild: true` in `pnpm-workspace.yaml` (already configured).

**TypeScript reports errors hidden by the Vite-only build.**
Run `pnpm run typecheck` separately; it uses `tsc -p tsconfig.json --noEmit` with strict mode.

**A route returns 404 in production.**
Check that the route is in `STATIC_PAGE_ROUTES` or `PRODUCTS` (in `src/lib/products.ts`). The prerenderer generates HTML for every route in those lists. Also verify Vercel `cleanUrls` is enabled.

**Canonical URL mismatch.**
Ensure `SITE_ORIGIN` in `src/lib/products.ts` and `BASE_URL` in `src/components/layout/PageLayout.tsx` match the verified production domain.

**Sitemap missing a route.**
Check that the route is in `INDEXABLE_STATIC_PAGE_ROUTES` or `PRODUCTS`. The `/coming-soon` route is intentionally excluded.

## 13. Privacy & data handling

- The site is fully static — no backend, no database, no user accounts.
- Contact forms open prefilled WhatsApp drafts in a new tab; the site neither sends nor stores submissions.
- No analytics, tracking scripts, or first-party cookies are set.
- Browser storage (if any) is used only for UI state (e.g., Konami unlock flag).
- External links use `rel="noopener noreferrer"` when opening in a new tab.
- No secrets, API keys, or personal credentials are committed. The signing keystore (if applicable) lives outside the repository.

## 14. Known limitations

1. No verified app icons/screenshots — monogram tiles are used instead of inventing artwork.
2. `PakiGPA` Play listing support email/phone are public but the site does not render email as a contact destination (WhatsApp-only policy).
3. Game repositories for PAY ME BACK, DECAY (game), ECHOES OF THE SHADOWS — none public.
4. Instagram / TikTok destinations — not verified.
5. Blog content — currently an honest "not published yet" page.
6. Main bundle is still ~572 KB (Home effects); further code-splitting is possible.
7. Responsive/browser behavior was not visually confirmed (no browser tooling in this environment).

## 15. Roadmap

| Priority | Item |
|---|---|
| P0 | Complete first end-to-end on-device run for THE LAST BELL |
| P0 | Assign app icon in Player Settings and rebuild AAB |
| P1 | Neutralize local file: packages and commit CI workflow |
| P1 | Delete legacy StandaloneInputModule from scenes |
| P2 | Resume spawn points — remember player position |
| P2 | Texturing pass for remaining Floor 2 surfaces |
| P2 | Enable flashlight battery drain once pickups placed |
| P3 | De-duplicate settings-panel construction |
| P3 | Accessibility pass (text scaling, reduced flicker) |

## 16. Credits

- Base project — High School Horror Android by yurifarion (CC-BY-4.0)
- Touch controls — NeKONTROLLER by NeKoRoSYS (MIT)
- GitHub metadata — public GitHub API for `HAMZAPOWERPLAYER`
- Google Play listings — verified via public store pages
- Uptodown — verified alternative download for SubSight

## 17. Contributing

- Report issues and suggestions via the GitHub profile: https://github.com/HAMZAPOWERPLAYER
- Branches — work on a feature branch, keep main release-ready.
- Code style — match existing file conventions; document public behaviour with XML doc comments; route dev tracing through `Diag.Log`, never raw `Debug.Log`, in gameplay code.
- Scene changes — use the Tools/* menu items where possible so wiring stays reproducible.
- Verification — every PR that touches the website should state which checks (`typecheck`, `build`, `check:links`) were run.

## 18. Document control

| Field | Value |
|---|---|
| Owner | HAMZA POWERPLAYER |
| Status | Active — 29 public routes, 2 published apps |
| Last updated | 2026-10-17 |
| Review cadence | On every release and whenever routing, build config, or product data changes |
| Sources of truth | This README for architecture/flow; `docs/LINK_INVENTORY.md` for verified links; `src/lib/products.ts` for product data; `scripts/check-links.mjs` for validation |

---

*Built with React, TypeScript, and Vite. No fabricated metrics. No simulated activity. Only verified public data.*
