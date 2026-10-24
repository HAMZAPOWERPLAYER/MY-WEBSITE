# Website Audit — HAMZA POWERPLAYER

**Site:** https://www.hamzapowerplayer.com  
**Local production build:** http://localhost:5000  
**Audit date:** 24 October 2026  
**Scope:** Full read-only audit — source, production build, runtime behaviour, metadata, SEO, accessibility, mobile layout, content accuracy, links, and live response headers. No site code was changed.

> **Post-audit update (24 October 2026):** THE LAST BELL is now live on Google Play. The product registry, Games page, game detail page, homepage, About, FAQ, Links, and related copy were updated after this audit. The findings below describe the site as it was audited, before that release.

---

## 1. Executive summary

The site has a solid technical foundation: the TypeScript build, prerender step, and internal link checker all pass; all 29 indexable pages have a single H1, a correct canonical, and well-sized titles and descriptions; JSON-LD is valid; the sitemap is correct in production; the 404 returns a real 404 status; and every external destination tested returned HTTP 200.

It is **not ready to be called finished**, for three reasons:

1. **Content trust.** PakiGPA is published on Google Play alongside SubSight, but large parts of the site still say SubSight is the only released app — including an FAQ answer that explicitly denies any other release. The Tools page advertises six working tools that do nothing, and the “DOWNLOAD MY CV” button only opens the browser print dialog.
2. **Mobile usability.** The cookie banner covers every bottom control; the CV and AI floating buttons sit on top of the mobile bottom navigation; and the footer’s scroll-to-top button is underneath the AI button.
3. **Metadata / accessibility gaps.** The homepage loses its social-preview and robots tags in production, `/coming-soon` is indexable with no title or description, 13 product pages contain two `<main>` landmarks, and the contact form has no label associated with any of its six fields.

### Scorecard

| Area | Result |
|---|---|
| `pnpm typecheck` | **Pass** |
| `pnpm build` (Vite + prerender) | **Pass** |
| `pnpm check:links` | **Pass** |
| Indexable pages | **29** |
| Product detail pages | **13** (2 apps, 4 games, 7 projects) |
| Prerendered HTML files | **31** (29 indexable + `/coming-soon` + `404`) |
| Lighthouse accessibility | **0.88 – 0.96** depending on page |
| Lighthouse best practices | **1.00** on every page tested |
| Lighthouse SEO | **0.60 – 1.00** depending on page |
| External links tested | **All 200** |
| Live security headers | HSTS only — no CSP, XCTO, XFO, Referrer-Policy, or Permissions-Policy |

**Bottom line:** fix the high-severity items in Section 4 before promoting the site; the rest is a focused polish pass, not a rebuild.

---

## 2. What was verified working

- `pnpm typecheck`, `pnpm build`, and `pnpm check:links` complete without errors.
- All 29 indexable URLs have exactly one H1 and a self-referencing canonical.
- Every indexable page title is 50–65 characters and every meta description is 140–160 characters (the wording problem in §4-H2 is separate).
- JSON-LD parses cleanly and matches the visible page content.
- The production sitemap contains 29 canonical URLs, includes PakiGPA, and excludes `/coming-soon` and the 404.
- `robots.txt` is valid, points to the sitemap, and blocks major AI-training crawlers while allowing search crawlers.
- Unknown routes return HTTP **404** with `noindex, nofollow`.
- Non-www requests return **308** to `https://www.hamzapowerplayer.com/`.
- All tested outbound links (GitHub, LinkedIn, WhatsApp, YouTube, Google Play) returned HTTP 200.
- Outbound links use `rel="noopener noreferrer"` and open in a new tab.
- HSTS is present with `max-age=63072000`.
- No first-party cookies, analytics, or tracking scripts are loaded; only `sessionStorage`/`localStorage` for UI state, and this is documented on `/cookies`.
- The site has no fabricated ratings, reviews, download counts, or user numbers.
- Mobile layout, routing, lazy-loaded pages, and the production preview all function.

---

## 3. Lighthouse results

Lighthouse was run against the local production build. The integration used did not return a **Performance** category, so performance was assessed separately from bundle size and runtime behaviour (§4-M9).

| Page | Accessibility | Best Practices | SEO |
|---|---:|---:|---:|
| `/` (Home) | **0.91–0.92** | 1.00 | **0.80** |
| `/contact` | **0.90** | 1.00 | **0.80** |
| `/links` | **0.95** | 1.00 | **0.80** |
| `/coming-soon` | **0.88** | 1.00 | **0.60** |
| 404 page | **0.96** | 1.00 | 1.00 |

**What drives the SEO 0.80:** the cookie banner’s generic **“Learn More”** link fails the `link-text` audit on every page where the banner appears. The `/coming-soon` page additionally fails `document-title`, `meta-description`, and `landmark-one-main`.

**What drives the accessibility scores:** low-contrast muted text, `svg-img-alt` on decorative icon SVGs, the prohibited `aria-label` on a `<p>`, unlabelled contact selects, and the generic “Learn More” link.

---

## 4. Findings

Severity is based on user impact and trust risk, not on how hard the fix is.

### HIGH — fix before promoting the site

#### H1. `/coming-soon` is indexable with no metadata and no main landmark

**Evidence**

- `src/pages/ComingSoonPage.tsx:5-51` renders a bare page with no `PageLayout`, no `<title>`, no description, no canonical, no robots tag, and no `<main>`.
- Production `/coming-soon` returns **200** with an empty title, empty description, empty canonical, and no robots meta. Confirmed on the live site.
- Lighthouse SEO **0.60**; accessibility **0.88**.
- The page has an H1 (“MORE IS ON THE WAY”) but no main landmark.

**Impact:** search engines can index a blank-looking page; social shares have no title or description; screen-reader users get no main landmark.

**Fix:** either wrap it in `PageLayout` with `title`, `description`, `path="/coming-soon"`, and `noindex`, or add those tags plus `<main>` directly. Since it is not in the sitemap, `noindex, follow` is the safest choice.

---

#### H2. Homepage loses social-preview and robots metadata in production

**Evidence**

- `scripts/prerender.mjs:28-38` treats `description`, `robots`, `og:type`, `og:title`, `og:description`, `og:url`, `og:image`, `twitter:card`, `twitter:title`, `twitter:description`, and `twitter:image` as route metadata and removes them from the template.
- `src/pages/Home.tsx:43-50` re-adds title, description, canonical, `og:title`, `og:description`, `og:url`, `twitter:title`, and `twitter:description` — but **not** `meta robots`, `og:type`, `og:image`, `twitter:card`, or `twitter:image`.
- Production `/` therefore contains orphan `og:image:width`, `og:image:height`, `og:image:alt`, and `twitter:image:alt` tags with no `og:image`/`twitter:image` to describe.
- Confirmed on the live site: no `meta name="robots"`, no `og:type`, no `og:image`, no `twitter:card`, no `twitter:image`.

**Impact:** link previews on WhatsApp, LinkedIn, X, and Facebook lose the 1280×720 image and large-card treatment. Crawlers get no explicit robots directive (defaults to index/follow, so this is a missed signal rather than a block).

**Fix:** add the five missing tags to `Home.tsx`, or better, render Home inside a shared metadata component so the homepage cannot drift from the other routes. Add a build-time assertion that every HTML file contains `og:image`, `twitter:card`, and `robots`.

---

#### H3. Product facts are stale: PakiGPA is published, but the site says SubSight is the only release

**Evidence**

- `src/lib/products.ts:68-79` marks **PakiGPA** as `status: 'published'` with a live Google Play URL.
- `src/lib/products.ts:103-108` does the same for SubSight.
- `src/pages/Home.tsx:44,47,50` — description, `og:description`, and `twitter:description` mention only SubSight.
- `src/pages/AboutPage.tsx:14` — “Published Android app: SubSight”.
- `src/pages/AppsPage.tsx:32` — “open the confirmed Google Play listing for SubSight”.
- `src/pages/FAQPage.tsx:13` — “SubSight has a confirmed Google Play listing… **No other app listing is presented as released here.**”
- `src/components/effects/HamzaAI.tsx:13` — “a published Android app” (singular).
- `src/components/sections/Roadmap.tsx:11` — only “Maintain the SubSight Android app”.

**Impact:** this is the most serious trust issue on the site. The FAQ answer is now factually false, and the homepage undersells a shipped product. Visitors who know PakiGPA exists will question the accuracy of everything else.

**Fix:** make the product registry the single source of truth. Generate the “published apps” copy from `PRODUCTS.filter(p => p.status === 'published')`, update the FAQ answer, homepage description, About terminal line, Apps intro, HamzaAI response, and Roadmap. Add a link check/test that fails if any hard-coded “only SubSight” claim remains.

---

#### H4. Six “ready” tools have no action, behind a “100% free. No limits.” claim

**Evidence**

- `src/pages/ToolsPage.tsx:4-11` marks six tools `ready: true`.
- `src/pages/ToolsPage.tsx:63-67` renders a “Use Tool →” `<button>` with **no `onClick` and no link**.
- `src/pages/ToolsPage.tsx:41` — “Everything here is 100% free. No signup. No limits.”
- `src/pages/ToolsPage.tsx:20` — description claims “all tools run locally”.
- The page is indexable and in the sitemap.

**Impact:** every “Use Tool” click does nothing. The page makes specific capability claims for features that do not exist. This is both a UX failure and a credibility problem.

**Fix:** either ship the tools, link them to real destinations, or mark all six as “Coming Soon” (the existing `ready: false` branch already renders a disabled button). Remove “100% free / no limits / run locally” until at least one tool works. Consider `noindex` while the page is a placeholder.

---

#### H5. “DOWNLOAD MY CV” does not download a CV

**Evidence**

- `src/components/effects/CVDownloadFAB.tsx:10` — `onClick={() => window.print()}`.
- `src/components/effects/CVDownloadFAB.tsx:34` — visible label “DOWNLOAD MY CV”.
- `src/components/effects/HamzaAI.tsx:33-34` tells users to “use the download button shown on the site”.

**Impact:** users expect a PDF and get the browser print dialog for the current page. On mobile, this can print the entire portfolio, including the chat widget and floating buttons.

**Fix:** ship an actual PDF (`/hamza-powerplayer-cv.pdf`) and link to it with `download`, or rename the control to “Print / Save as PDF” and add an accessible label. Update the HamzaAI response to match.

---

#### H6. Mobile floating controls overlap each other and the bottom navigation

**Evidence** — measured at a 550×582 viewport:

| Control | Vertical span | z-index | Result |
|---|---|---:|---|
| Cookie banner | y 444–582 | 9998 | Covers **all** bottom controls |
| AI button | y 494–558 | 9000 | Covers right side of bottom nav |
| CV button | y 510–558 | 9998 | Covers left side of bottom nav |
| Mobile bottom nav | y 522–582 | 60 | Obscured at both ends |
| Footer scroll-to-top | y 538–573 | 50 | Sits **under** the AI button |

**Evidence in source**

- `src/components/sections/MobileBottomNav.tsx:42` — `fixed bottom-0 … z-[60]`.
- `src/components/effects/CVDownloadFAB.tsx:11` — `fixed bottom-6 left-6 z-[9998]`.
- `src/components/effects/HamzaAI.tsx:96` — `fixed bottom-6 right-6 z-[9000]`.
- `src/components/effects/CookieConsent.tsx:22` — `fixed bottom-0 … z-[9998]`.
- `src/components/sections/Footer.tsx:217-227` — scroll-to-top button at the bottom of the footer.

**Impact:** on phones, the bottom navigation’s first and last items are partially covered; the cookie banner blocks the nav, CV, and AI buttons for its lifetime; the scroll-to-top button cannot be clicked because the AI button is above it.

**Fix:** reserve a single bottom “safe area” and place controls in it:
- Move CV/AI buttons above the mobile nav (`bottom: calc(60px + env(safe-area-inset-bottom) + 12px)`) and give them non-overlapping corners.
- Raise the cookie banner above the nav but make it dismissible and non-blocking, or dock it above the nav.
- Move the footer scroll-to-top button away from the fixed AI button (e.g. bottom-right above the AI button, or inside the footer flow).
- Add a mobile visual regression test at 360×640 and 390×844.

---

#### H7. SPA navigation keeps the previous page’s scroll position

**Evidence**

- Reproduced: open `/about`, scroll to `y=3308`, click **Home** in the navbar. The URL becomes `/` and `scrollY` stays **3308** on a 20,575px page — the user lands mid-page, not at the hero.
- `src/components/layout/PageLayout.tsx:35-37` resets scroll to top when `pagePath` changes, but Home, the 404 page, and Coming Soon do not use `PageLayout`.
- `src/pages/Home.tsx` has its own layout and no scroll-reset effect.
- `src/pages/NotFoundPage.tsx` and `src/pages/ComingSoonPage.tsx` also lack the effect.

**Impact:** every return to Home from a scrolled page can land in the middle of the page. This is especially visible on mobile and after clicking footer links.

**Fix:** move scroll restoration into the router (`App.tsx`) so it applies to every route, with an exception for hash links. Alternatively, wrap Home/404/ComingSoon in the same scroll-reset hook. Add a Playwright test: scroll → navigate → assert `scrollY === 0`.

---

#### H8. Contact form: no label is associated with a control, and success is shown even if WhatsApp is blocked

**Evidence**

- `src/pages/ContactPage.tsx:156-210` — six `<label>` elements, **zero** `htmlFor` attributes; none of the inputs/selects/textareas has an `id`. Runtime check: `0/6` labels associated, all six controls report `labels: []`.
- Lighthouse `select-name` failure on `/contact`.
- No `required`, `aria-invalid`, or `aria-describedby` on any field; validation errors are rendered visually but not announced.
- `src/pages/ContactPage.tsx:43-53` — `window.open(...)` is called, then `setSuccess(true)` unconditionally. The return value of `window.open` is not checked, so a popup blocker still produces “✓ WHATSAPP DRAFT OPENED!”.
- `src/pages/ContactPage.tsx:181-197` — budget and timeline are sent as raw codes (`under500`, `2-4w`, `1-2m`), not the visible labels.
- `src/pages/ContactPage.tsx:219-223` — success message is not in a live region.

**Impact:** screen-reader users cannot tell which label belongs to which field; keyboard/screen-reader users do not hear validation errors; users with popup blockers are told the message opened when it did not; the WhatsApp draft contains developer codes instead of readable values.

**Fix:**
- Use `useId()` and wire `htmlFor`/`id` for all six fields.
- Add `aria-invalid`, `aria-describedby` pointing at the error text, and `required` where appropriate.
- Put the success/error message in `role="status"` or `aria-live="polite"`.
- Check `const win = window.open(...)`; if `!win`, show a fallback link to the WhatsApp URL and an error message.
- Map budget/timeline values to their labels before building the message.

---

#### H9. Live security headers are incomplete

**Evidence** — live response headers:

| Header | Present |
|---|---|
| `Strict-Transport-Security` | ✅ `max-age=63072000` |
| `Content-Security-Policy` | ❌ |
| `X-Content-Type-Options` | ❌ |
| `X-Frame-Options` | ❌ |
| `Referrer-Policy` | ❌ |
| `Permissions-Policy` | ❌ |

**Impact:** the site is more exposed to clickjacking, MIME sniffing, and referrer leakage than it needs to be. There is no CSP to constrain injected scripts.

**Fix:** add headers in `vercel.json` (or the Vercel dashboard). A safe starting point:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" },
        { "key": "Content-Security-Policy", "value": "default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; script-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'" }
      ]
    }
  ]
}
```

Validate the CSP against the actual font and canvas usage before deploying; start in report-only mode if needed.

---

### MEDIUM — fix in the next pass

#### M1. Thirteen product pages contain two `<main>` landmarks

**Evidence**

- `src/components/layout/PageLayout.tsx:64` renders `<main>`.
- `src/pages/ProductDetailPage.tsx:149-270` renders another `<main>` inside it.
- Runtime count on all 13 `/apps/*`, `/games/*`, and `/projects/*` pages: `mainCount: 2`.
- `GameDetailPage.tsx` has the same pattern.

**Impact:** invalid landmark structure; screen-reader “jump to main” may target the wrong region.

**Fix:** change the inner `<main>` in `ProductDetailPage.tsx` and `GameDetailPage.tsx` to `<div>` or `<section>`, or add a `main` prop to `PageLayout` so only one landmark is rendered.

---

#### M2. Six generated product titles are cut mid-phrase

**Evidence**

- `src/pages/ProductDetailPage.tsx:26-40` builds a title and, if it exceeds 65 characters, truncates at the last space before the limit.
- Resulting titles:
  - `PakiGPA — The CGPA calculator built for | HAMZA POWERPLAYER`
  - `SubSight — Track every subscription in one | HAMZA POWERPLAYER`
  - `Decay — Flutter | HAMZA POWERPLAYER`
  - `Dev Toolbox — Free | HAMZA POWERPLAYER`
  - `Image Upscaler — Free | HAMZA POWERPLAYER`
  - `PDF Toolkit — Free | HAMZA POWERPLAYER`
- Affected routes: `/apps/paki-gpa`, `/apps/subsight`, `/projects/decay-flutter-version`, `/projects/dev-toolbox-free`, `/projects/image-upscaler-4k-free`, `/projects/pdf-toolkit-free`.

**Impact:** titles read as broken English in search results and browser tabs. The length target is met, but the semantic target is not.

**Fix:** author a short title per product in the registry (`seoTitle`), or change the fallback to `name — kind | HAMZA POWERPLAYER` and drop the tagline when it does not fit. Never truncate a clause mid-way.

---

#### M3. Navigation accessibility: hidden menus stay focusable, no state, hover-only “More”

**Evidence**

- `src/components/layout/PageNavbar.tsx:91-105` — the mobile menu is moved off-screen with `transform: translateX(100%)` and `pointer-events: none`, but it remains in the DOM and its links remain tabbable when closed. Confirmed at runtime.
- `src/components/layout/PageNavbar.tsx:84` — the toggle button has no `aria-expanded`, `aria-controls`, or accessible name.
- `src/components/layout/PageNavbar.tsx:66-69` — the desktop “More” menu opens only on `onMouseEnter`; the `<button>` has no `onClick`, `aria-expanded`, or `aria-haspopup`, so keyboard users cannot reliably open it.
- No Escape handler, focus trap, or focus return in either mobile menu.
- No “Skip to content” link anywhere in `src/`.
- The home `Navbar.tsx` has the same pattern (`aria-label="Toggle menu"` but no expanded state).

**Impact:** keyboard and screen-reader users can tab into invisible links; the “More” section is unreachable without a mouse; mobile menu focus escapes behind the overlay.

**Fix:** add `aria-expanded`/`aria-controls`, `hidden` or `inert` on the closed menu, click + keyboard handling for “More”, Escape to close, focus trap while open, focus return to the toggle, and a skip link as the first focusable element. Use a shared dialog/menu primitive.

---

#### M4. HamzaAI presents a keyword bot as a live AI, and the chat is not accessible

**Evidence**

- `src/components/effects/HamzaAI.tsx:9-45` — responses are a fixed keyword list; unmatched input returns a canned fallback.
- `src/components/effects/HamzaAI.tsx:58` — “I'm HAMZA AI — your guide… Ask me anything”.
- `src/components/effects/HamzaAI.tsx:131` — “Powered by intelligence”.
- `src/components/effects/HamzaAI.tsx:136` — green “ONLINE” status.
- `src/components/effects/HamzaAI.tsx:138` — close button is an unlabelled `×`.
- `src/components/effects/HamzaAI.tsx:173-184` — input has only a placeholder; send button has no accessible name.
- No `role="dialog"`, `aria-modal`, `aria-live`, or message log semantics anywhere in `src/` (grep returned zero matches).
- `src/components/effects/HamzaAI.tsx:13` still describes only one published app.
- The panel does not trap focus, close on Escape, or return focus to the launcher.

**Impact:** users may believe they are talking to a real AI; screen-reader users cannot identify the close/send controls or hear new messages; keyboard users can tab behind the panel.

**Fix:** label it honestly (“Portfolio guide — scripted answers”), or connect it to a real model with a clear disclosure. Add `role="dialog"`, `aria-modal="true"`, a labelled close button, a labelled input and send button, `aria-live="polite"` on the message list, Escape-to-close, focus trap, and focus return.

---

#### M5. Muted text fails WCAG AA contrast

**Evidence**

- `src/index.css:15` — `--text-muted: #6b7280`.
- On `--bg-base #04040a`: **4.22:1** (below 4.5:1 for normal text).
- On glass `#0c0c11`: **4.03:1** (Lighthouse-confirmed failure).
- Many labels and descriptions use this token at 10–12px, where contrast requirements are strictest.

**Impact:** low-vision users struggle with secondary text; Lighthouse flags multiple nodes on every page.

**Fix:** raise `--text-muted` to at least `#8b93a1` (≈5.5:1 on `#04040a`) or use a separate `--text-subtle` for decorative text that is exempt. Re-run Lighthouse after the change.

---

#### M6. ARIA and SVG issues

**Evidence**

- `src/components/effects/SplitText.tsx:89` puts `aria-label={children}` on whatever tag is passed in. `AICapabilities.tsx:126-135` passes `tag="p"`, producing `<p aria-label="THE FUTURE RUNS ON AI. SO DO I.">` — prohibited ARIA on a paragraph (Lighthouse `aria-prohibited-attr`).
- `src/components/sections/AICapabilities.tsx:105-106` renders proficiency bars as plain `<div>`s with no `role="progressbar"`, `aria-valuenow`, or accessible name.
- Social icons in `Footer.tsx:134` are `react-icons` SVGs with an implicit `role="img"` but no title; the anchor has `aria-label`, yet Lighthouse still flags `svg-img-alt` on Home and Contact.
- `src/pages/LinksPage.tsx:44` puts `aria-label` on a plain `<div>` with no role.

**Impact:** invalid ARIA, unnamed graphics, and unlabelled progress indicators create noisy or missing screen-reader output.

**Fix:** make `SplitText` apply `aria-label` only when the rendered element has a valid role (or use visually hidden text instead). Add `aria-hidden="true"` and `focusable="false"` to decorative icon SVGs. Give the progress bars `role="progressbar"` with `aria-valuemin/max/now` and a label, or hide them if decorative. Add `role="group"` to the Links filter container.

---

#### M7. Reduced-motion support is CSS-only; JS animations still run

**Evidence**

- `src/index.css:405-417` correctly disables CSS animations, transitions, and smooth scrolling under `prefers-reduced-motion: reduce`.
- Only `src/components/effects/MouseSpotlight.tsx:10-11` checks `matchMedia('(prefers-reduced-motion: reduce)')`.
- Lenis (`SmoothScroll.tsx:10-26`), canvas effects (`AuroraEngine`, `AirplaneBanner`, `CodeRain`, `SpinningGlobe`, `DNAHelix`, etc.), `LoadingScreen`, and `SplitText` inline transitions continue regardless.
- The loading screen still runs its full 2.8-second sequence.

**Impact:** users who request reduced motion still get continuous canvas animation, smooth scrolling, and a timed loading overlay.

**Fix:** add a shared `usePrefersReducedMotion()` hook and gate Lenis, canvas loops, the loading screen, and inline transitions. At minimum, skip the loading screen and stop continuous RAF loops when reduced motion is requested.

---

#### M8. The homepage forces a 2.8-second loading screen on every visit

**Evidence**

- `src/components/effects/LoadingScreen.tsx:12` — `const duration = 2800`.
- `src/components/effects/LoadingScreen.tsx:40` — full-screen `fixed inset-0 z-[9999]` overlay.
- `src/pages/Home.tsx:55` mounts it unconditionally.
- No `role="status"`, no skip control, no session check.

**Impact:** every visit to Home is blocked for ~3 seconds, including repeat visits and in-app navigation. This is the single biggest perceived-performance problem on the site, and it works directly against the “fast” positioning.

**Fix:** show it once per session at most, cap it at ~600–800ms, or remove it. Add `role="status"` and an accessible “Skip intro” if it stays. Respect reduced motion.

---

#### M9. Performance: large initial bundle and eager Home imports

**Evidence**

- Initial JS: **596.55 kB raw / 183.79 kB gzip**
  - `index-DyEXxzNy.js` — 560.48 kB raw / 171.35 kB gzip
  - `icons-C-ysPdxG.js` — 18.09 kB / 7.24 kB gzip
  - `motion-CciUKl-_.js` — 17.98 kB / 5.20 kB gzip
- CSS: **76.57 kB raw / 14.31 kB gzip**
- `src/App.tsx:5` imports Home eagerly; Home imports roughly 30 sections and effects at the top of `src/pages/Home.tsx`.
- Total build assets: 784.29 kB.

**Impact:** the first load downloads and parses a large bundle before the hero is interactive, and the 2.8s overlay hides the result. On mid-range phones this is noticeable.

**Fix:** lazy-load below-the-fold Home sections and heavy canvas effects (`AirplaneBanner`, `DNAHelix`, `HackerMode`, `ScreensaverMode`, etc.), split the icon bundle, and consider `React.lazy` for Home itself. Measure with Lighthouse performance or WebPageTest after the change. Remove the artificial loading delay first — it dwarfs the bundle cost.

---

#### M10. The 404 page has no `<h1>` and no `<main>`

**Evidence**

- `src/pages/NotFoundPage.tsx` — no `<main>` and no `<h1>` (grep returned no matches).
- Lighthouse accessibility 0.96, with `landmark-one-main` failing.
- The page does return a real 404 and `noindex, nofollow`, which is correct.

**Impact:** screen-reader users lose the main landmark and the page has no top-level heading.

**Fix:** wrap the content in `<main>` and promote the “Page Not Found” text to `<h1>`.

---

#### M11. Cookie banner: generic link text and a blocking overlay

**Evidence**

- `src/components/effects/CookieConsent.tsx:28` — link text is “Learn More”.
- `src/components/effects/CookieConsent.tsx:22-25` — fixed bottom overlay at z-9998, shown after 2 seconds.
- Lighthouse `link-text` failure on Home, Contact, and Links.

**Impact:** “Learn More” is meaningless out of context and fails an SEO/accessibility audit; the banner covers mobile controls (see H6).

**Fix:** change the link to “Browser storage details” or “Cookie & storage policy”; dock the banner above the mobile nav or make it a compact toast; keep the Dismiss action.

---

#### M12. Duplicate `og:site_name` on every non-home page

**Evidence**

- `index.html` already contains `<meta property="og:site_name" content="HAMZA POWERPLAYER" />`.
- `src/components/layout/PageLayout.tsx:46` adds it again.
- `scripts/prerender.mjs:28-38` does not strip `og:site_name`, so PageLayout pages end up with two copies.

**Impact:** minor metadata duplication; some parsers take the last value, which happens to be identical, so the practical risk is low.

**Fix:** remove the tag from `PageLayout.tsx` and keep the global one, or add `og:site_name` to the stripped list and let PageLayout own it.

---

#### M13. `public/sitemap.xml` is stale and omits PakiGPA

**Evidence**

- `public/sitemap.xml` contains **28** URLs and does **not** include `/apps/paki-gpa`.
- `dist/public/sitemap.xml` (build output) contains **29** URLs and does include it.
- The live sitemap is correct (29 URLs, includes PakiGPA).

**Impact:** the deployed site is correct today, but the source file is a trap: any deploy path that serves `public/` directly, or any future change that stops the prerender step from overwriting it, would publish an incomplete sitemap.

**Fix:** generate the sitemap only at build time and delete the static copy, or add a build assertion that the source and generated sitemaps match. Document the generation step in the README.

---

#### M14. Empty Blog and Tools pages are indexable

**Evidence**

- `/blog` is honest (“no articles are published yet”) but indexable, with a full title and description.
- `/tools` advertises tools that do not work (see H4) and is indexable.
- Both are in the sitemap.

**Impact:** thin/placeholder pages can dilute site quality signals and disappoint search visitors.

**Fix:** `noindex` both until they have real content, or keep Blog indexable if you plan to publish soon and accept the placeholder. Tools should be noindexed until at least one tool works.

---

#### M15. Availability claims contradict the FAQ

**Evidence**

- `src/pages/ContactPage.tsx:91` — “AVAILABLE FOR PROJECTS”.
- `src/components/sections/About.tsx:39` — “AVAILABLE FOR PROJECTS”.
- `src/pages/ContactPage.tsx:134` — “Available for remote work worldwide”.
- `src/pages/FAQPage.tsx:16` — “Current availability is not published.”

**Impact:** visitors get opposite answers depending on which page they read.

**Fix:** choose one source of truth. If availability is not published, remove the badges and the “Available for remote work” line. If it is published, update the FAQ answer.

---

### LOW — polish

| # | Finding | Evidence | Fix |
|---|---|---|---|
| L1 | `apple-touch-icon` points to an SVG | `index.html` — `<link rel="apple-touch-icon" href="/favicon.svg" />` | Add a 180×180 PNG; iOS does not reliably use SVG touch icons. |
| L2 | No web app manifest | No `manifest.webmanifest` in `public/` | Add one if installability/PWA is desired; otherwise ignore. |
| L3 | FAQ search only searches the active category | `src/pages/FAQPage.tsx:65` and the filtered list | Search all categories, or change the placeholder to “Search this category…”. |
| L4 | No lint or test scripts | `package.json` has only `dev`, `build`, `serve`, `typecheck`, `check:links` | Add ESLint and a small Playwright/Vitest smoke suite (metadata, scroll reset, form labels, mobile overlap). |
| L5 | README says 8 `/projects/*` routes; there are 7 | `README.md:58,79,87` vs 7 `source-available` products | Clarify that 8 repositories include game repositories; `/projects/*` has 7 routes. |
| L6 | `meta keywords` is obsolete | `index.html` | Harmless; remove for cleanliness. |
| L7 | No explicit cache policy for hashed assets | Live assets return `public, max-age=0, must-revalidate` | Hashed Vite assets can use `max-age=31536000, immutable`; HTML should stay revalidated. |
| L8 | Homepage title and OG title differ | `Home.tsx:43` vs `Home.tsx:46` | Intentional is fine, but keep them aligned if brand consistency matters. |

---

## 5. Mobile layout evidence

Measured at **550×582** (mobile viewport, cookie banner visible):

```
y=444  ┌──────────────────────────────────────────┐
       │ COOKIE BANNER (z 9998)                   │
y=494  │              ┌──────────┐                │
       │              │ AI (9000)│                │
y=510  │ ┌──────────┐ └──────────┘                │
       │ │ CV (9998)│                             │
y=522  ├─┴──────────┴──────────────────────────────┤
       │ HOME  SKILLS  PROJECTS  CONSOLE  CONTACT │  bottom nav (z 60)
y=538  │                         ┌──────────────┐  │
       │                         │ scroll-top 50│  │  ← under AI button
y=582  └─────────────────────────┴──────────────┘──┘
```

**Result:** the cookie banner covers the entire bottom control strip; CV and AI cover the outer bottom-nav items; scroll-to-top is unreachable. This is reproducible on every page that mounts the global overlays (`App.tsx:68-69`).

---

## 6. Content accuracy matrix — PakiGPA vs SubSight

| Location | What it says | Accurate? |
|---|---|---|
| `src/lib/products.ts:68-79` | PakiGPA is `published` with a Play URL | ✅ |
| `src/lib/products.ts:103-108` | SubSight is `published` with a Play URL | ✅ |
| `README.md:3` | “verified SubSight and PakiGPA Android apps” | ✅ |
| `src/pages/Home.tsx:44,47,50` | Only SubSight is named | ⚠️ Incomplete |
| `src/pages/AboutPage.tsx:14` | “Published Android app: SubSight” | ❌ |
| `src/pages/AppsPage.tsx:32` | “the confirmed Google Play listing for SubSight” | ⚠️ Incomplete |
| `src/pages/FAQPage.tsx:13` | “No other app listing is presented as released here.” | ❌ False |
| `src/components/effects/HamzaAI.tsx:13` | “a published Android app” (singular) | ⚠️ Incomplete |
| `src/components/sections/Roadmap.tsx:11` | Only “Maintain the SubSight Android app” | ⚠️ Incomplete |

The product registry and README are correct; the presentation layer has not caught up.

---

## 7. Prioritized fix plan

### Phase 1 — trust and mobile blockers (1–2 days)

1. **Update all PakiGPA copy** from the product registry (H3). Start with the FAQ answer, homepage description, About terminal line, Apps intro, HamzaAI response, and Roadmap.
2. **Fix the mobile control stack** (H6): cookie banner, CV/AI buttons, bottom nav, scroll-to-top.
3. **Make the contact form accessible and honest** (H8): labels, error announcements, popup-blocked fallback, human-readable budget/timeline.
4. **Fix `/coming-soon` metadata** (H1): title, description, canonical, robots, `<main>`.
5. **Fix homepage social/robots tags** (H2) and add a build assertion.
6. **Disable or relabel the six fake tools** (H4) and the CV button (H5).
7. **Add scroll restoration** for all routes (H7).
8. **Add the missing security headers** (H9).

### Phase 2 — accessibility and structure (2–3 days)

9. Remove nested `<main>` landmarks (M1).
10. Fix product title generation (M2).
11. Fix navigation state, focus handling, “More” keyboard access, and add a skip link (M3).
12. Fix HamzaAI disclosure and chat semantics (M4).
13. Raise `--text-muted` contrast (M5).
14. Fix `SplitText` ARIA, SVG names, and progress bars (M6).
15. Respect reduced motion in JS and shorten/remove the loading screen (M7, M8).
16. Add `<main>`/`<h1>` to the 404 page (M10).
17. Rename the cookie link and fix the banner layout (M11).

### Phase 3 — performance and housekeeping (1–2 days)

18. Code-split Home sections and heavy effects (M9).
19. Remove the duplicate `og:site_name` (M12).
20. Regenerate or delete the stale `public/sitemap.xml` (M13).
21. Decide whether Blog/Tools should be indexable (M14).
22. Resolve the availability contradiction (M15).
23. Add ESLint + Playwright smoke tests, fix the README counts, add the PNG touch icon (L1–L5).

---

## 8. Verification commands used

```powershell
pnpm typecheck
pnpm build
pnpm check:links
```

Runtime checks were performed against `http://localhost:5000` and the live site:

- Metadata/head extraction for all 31 HTML files.
- H1/canonical/robots/JSON-LD/sitemap validation.
- External-link HTTP status checks.
- Live header inspection (HSTS, CSP, XCTO, XFO, Referrer-Policy, Permissions-Policy).
- Mobile viewport measurement at 550×582.
- SPA scroll-restoration reproduction.
- Lighthouse runs on Home, Contact, Links, Coming Soon, and 404.

---

## 9. Audit limitations

- The Lighthouse integration returned accessibility, best-practices, and SEO scores but **no performance score**; performance conclusions are based on bundle size and runtime behaviour, not lab metrics.
- No real-device testing (iOS Safari, low-end Android) or screen-reader session was performed. Findings are based on DOM/ARIA inspection and Lighthouse.
- External link statuses were checked at audit time and can change.
- No load, penetration, or dependency-vulnerability testing was performed.
- The audit was read-only; no site source files were modified.

---

*Report generated 24 October 2026. The temporary audit scripts used to collect this data were removed after the report was written.*
