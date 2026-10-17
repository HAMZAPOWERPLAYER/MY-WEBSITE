import { lazy, Suspense } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { CookieConsent } from "@/components/effects/CookieConsent";
import { CVDownloadFAB } from "@/components/effects/CVDownloadFAB";
import Home from "@/pages/Home";

const AboutPage = lazy(() => import("@/pages/AboutPage"));
const PrivacyPage = lazy(() => import("@/pages/PrivacyPage"));
const TermsPage = lazy(() => import("@/pages/TermsPage"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));
const AppsPage = lazy(() => import("@/pages/AppsPage"));
const BlogPage = lazy(() => import("@/pages/BlogPage"));
const FAQPage = lazy(() => import("@/pages/FAQPage"));
const HirePage = lazy(() => import("@/pages/HirePage"));
const ToolsPage = lazy(() => import("@/pages/ToolsPage"));
const CookiesPage = lazy(() => import("@/pages/CookiesPage"));
const DisclaimerPage = lazy(() => import("@/pages/DisclaimerPage"));
const SitemapPage = lazy(() => import("@/pages/SitemapPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));
const ComingSoonPage = lazy(() => import("@/pages/ComingSoonPage"));
const GamesPage = lazy(() => import("@/pages/GamesPage"));
const GameDetailPage = lazy(() => import("@/pages/GameDetailPage"));
const ProductDetailPage = lazy(() => import("@/pages/ProductDetailPage"));
const ProjectsPage = lazy(() => import("@/pages/ProjectsPage"));
const LinksPage = lazy(() => import("@/pages/LinksPage"));

function Router() {
  return (
    <Suspense fallback={<div role="status" className="min-h-screen grid place-items-center font-mono text-sm text-[var(--neon-cyan)]">Loading page…</div>}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={AboutPage} />
        <Route path="/privacy" component={PrivacyPage} />
        <Route path="/terms" component={TermsPage} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/apps" component={AppsPage} />
        <Route path="/apps/:slug" component={ProductDetailPage} />
        <Route path="/games" component={GamesPage} />
        <Route path="/games/:slug" component={GameDetailPage} />
        <Route path="/projects" component={ProjectsPage} />
        <Route path="/projects/:slug" component={ProductDetailPage} />
        <Route path="/links" component={LinksPage} />
        <Route path="/blog" component={BlogPage} />
        <Route path="/faq" component={FAQPage} />
        <Route path="/hire" component={HirePage} />
        <Route path="/tools" component={ToolsPage} />
        <Route path="/cookies" component={CookiesPage} />
        <Route path="/disclaimer" component={DisclaimerPage} />
        <Route path="/sitemap" component={SitemapPage} />
        <Route path="/coming-soon" component={ComingSoonPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </Suspense>
  );
}

interface AppProps {
  /** Used by the static prerenderer; the browser router is used otherwise. */
  initialPath?: string;
}

function App({ initialPath }: AppProps) {
  const locationHook = initialPath
    ? () => [initialPath, () => {}] as [string, (to: string) => void]
    : undefined;

  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")} hook={locationHook}>
      <CVDownloadFAB />
      <Router />
      <CookieConsent />
    </WouterRouter>
  );
}

export default App;
