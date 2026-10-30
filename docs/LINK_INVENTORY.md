# Link inventory

Audit date: 2026-10-17

This inventory records destinations used by the portfolio and the evidence available when they were checked. Third-party availability can change; a link that is unavailable during a later check should be reviewed before it is described as working.

## Canonical website

| Destination | Result | Notes |
|---|---|---|
| `https://hamzapowerplayer.com/` | Redirects | Responds with a permanent redirect to the `www` hostname. |
| `https://www.hamzapowerplayer.com/` | HTTP 200 | Canonical hostname used by page metadata, structured data, sitemap, and robots file. |

## Apps and stores

| Destination | Result | Notes |
|---|---|---|
| `https://play.google.com/store/apps/dev?id=4745570286607188025` | HTTP 200 | Developer profile supplied by the owner. The public profile exposed the SubSight listing during this audit. |
| `https://play.google.com/store/apps/details?id=com.hamzapowerplayer.Subsight` | HTTP 200 | Verified SubSight listing; package ID capitalization is preserved. |
| `https://play.google.com/store/apps/details?id=com.hamzapowerplayer.pakigpa` | HTTP 200 | Verified PakiGPA listing; package ID capitalization preserved. Published Android app (CGPA calculator for Pakistani students). |
| `https://com-hamzapowerplayer-subsight.en.uptodown.com/android` | HTTP 200 | Verified on re-check: the page is live as "Subsight 1.0.5" by HAMZA POWERPLAYER (package `com.hamzapowerplayer.subsight`). It is now rendered as a verified alternative download on `/apps/subsight`. |

Only the confirmed Play Store listing is presented as a released app. No ratings, review counts, download counts, or additional store listings are asserted.

## GitHub profile and repositories

The public GitHub API returned eight public repositories for `HAMZAPOWERPLAYER` on the audit date. Repository descriptions below are copied or condensed from public GitHub metadata; they are not claims of a store release.

| Repository | Destination | Public metadata |
|---|---|---|
| Decay | `https://github.com/HAMZAPOWERPLAYER/Decay` | Offline companion app that fades if forgotten and leaves a Death Certificate; TypeScript. |
| DECAY-FLUTTER-VERSION | `https://github.com/HAMZAPOWERPLAYER/DECAY-FLUTTER-VERSION` | Offline Flutter companion; zero backend and zero tracking; Dart. |
| DEV-TOOLBOX-FREE | `https://github.com/HAMZAPOWERPLAYER/DEV-TOOLBOX-FREE` | Client-side, offline-first developer toolbox PWA; TypeScript. |
| IMAGE-UPSCALER-4K-FREE | `https://github.com/HAMZAPOWERPLAYER/IMAGE-UPSCALER-4K-FREE` | Image upscaler project; TypeScript. |
| last-bell | `https://github.com/HAMZAPOWERPLAYER/last-bell` | First-person mobile horror game for Android; Unity 2022.3 LTS; C#. |
| MY-WEBSITE | `https://github.com/HAMZAPOWERPLAYER/MY-WEBSITE` | Public repository for this portfolio; no description in its metadata. |
| PDFToolkit-Free | `https://github.com/HAMZAPOWERPLAYER/PDFToolkit-Free` | PDF tools project; TypeScript. |
| PHOTOPASS | `https://github.com/HAMZAPOWERPLAYER/PHOTOPASS` | On-device document-photo project; Dart. |

No private repository names, private URLs, or credentials are recorded here. Repositories that were not listed as public on the API are not included.

## Contact and profile links

| Destination | Evidence | Usage |
|---|---|---|
| `https://www.linkedin.com/in/hamzapowerplayerofficial` | Supplied by the owner | Direct contact and public profile. |
| `https://wa.me/923129584661` | Supplied by the owner | Direct contact; contact forms open a prefilled WhatsApp draft for the visitor to review and send. |
| `https://github.com/HAMZAPOWERPLAYER` | Public GitHub profile and repository API | Source-code profile. |
| `https://youtube.com/@hamzapowerplayer` | Present in the existing site source; not used as a messaging channel | Public profile link. |

The site does not offer email as a contact destination. Contact forms do not send or store submissions on this website.

## Game project destinations

All four game pages are labelled **Coming Soon** and have no store download button. Package IDs were supplied in the project notes. The Last Bell page additionally links to its public GitHub repository; the other game pages have no verified public source link in this inventory.

## Registry and rendering rules

- `src/lib/products.ts` is the single source of truth for products, games, projects, and their links.
- Only `storeUrl` values are rendered as "Download on Google Play" buttons.
- Alternative downloads are rendered only when `verification` is `verified`; `unverified` entries are kept for the record and never clickable.
- `scripts/check-links.mjs` validates internal routes, canonical URLs, H1 counts, metadata presence, the sitemap, and robots file. It does not fail the build when a third-party host is unreachable.
