import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { SiGithub, SiWhatsapp, SiYoutube } from 'react-icons/si';
import { ArrowUp, ArrowUpRight, Heart, Linkedin } from 'lucide-react';

const PAGES_COL = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Apps', href: '/apps' },
  { label: 'Games', href: '/games' },
  { label: 'Projects', href: '/projects' },
  { label: 'Links', href: '/links' },
  { label: 'Blog', href: '/blog' },
  { label: 'FAQ', href: '/faq' },
];

const WORK_COL = [
  { label: 'Hire Me', href: '/hire' },
  { label: 'Contact', href: '/contact' },
  { label: 'Services', href: '/hire' },
  { label: 'Tools', href: '/tools' },
];

const LEGAL_COL = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Cookie Policy', href: '/cookies' },
  { label: 'Disclaimer', href: '/disclaimer' },
  { label: 'Sitemap', href: '/sitemap' },
];

const SOCIAL = [
  { Icon: SiGithub, href: 'https://github.com/HAMZAPOWERPLAYER', label: 'GitHub' },
  { Icon: Linkedin, href: 'https://www.linkedin.com/in/hamzapowerplayerofficial', label: 'LinkedIn' },
  { Icon: SiWhatsapp, href: 'https://wa.me/923129584661', label: 'WhatsApp' },
  { Icon: SiYoutube, href: 'https://youtube.com/@hamzapowerplayer', label: 'YouTube' },
];

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h2 className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]">{title}</h2>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="group inline-flex items-center gap-1 text-xs text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
            >
              {link.label}
              <ArrowUpRight
                size={10}
                aria-hidden="true"
                className="opacity-0 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.08] bg-[#050510]">
      {/* Brand gradient top edge */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent_5%,rgba(0,240,255,0.5)_50%,transparent_95%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_100%,rgba(0,240,255,0.05),transparent_70%)]"
      />

      <div className="relative mx-auto max-w-6xl px-6 pb-8 pt-14">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="group inline-flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-lg border border-[rgba(0,240,255,0.28)] bg-[rgba(0,240,255,0.06)] font-display text-[11px] font-black text-[var(--neon-cyan)] shadow-[0_0_20px_rgba(0,240,255,0.2)] transition-shadow group-hover:shadow-[0_0_30px_rgba(0,240,255,0.4)]">
                HP
              </span>
              <span className="font-display text-xs font-bold tracking-[0.14em] text-[var(--text-primary)]">
                HAMZA POWERPLAYER
              </span>
            </Link>

            <p className="mt-4 max-w-xs text-xs leading-relaxed text-[var(--text-muted)]">
              Android apps and games, built end to end — from the first screen to the store release.
            </p>
            <p className="mt-3 text-xs text-[var(--text-muted)]">Pakistan · Working worldwide</p>

            <div className="mt-4 flex items-center gap-2">
              <span aria-hidden="true" className="glow-dot" />
              <span className="font-mono text-[10px] tracking-[0.12em] text-[var(--success)]">
                OPEN TO FOCUSED PROJECTS
              </span>
            </div>

            <div className="mt-5 flex items-center gap-2">
              {SOCIAL.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.02] text-[var(--text-muted)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[rgba(0,240,255,0.35)] hover:text-[var(--neon-cyan)] hover:shadow-[0_0_18px_rgba(0,240,255,0.18)]"
                >
                  <Icon size={13} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <FooterColumn title="Pages" links={PAGES_COL} />
          <FooterColumn title="Work" links={WORK_COL} />
          <FooterColumn title="Legal" links={LEGAL_COL} />
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/[0.08] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--text-muted)]">
            <span>© {new Date().getFullYear()}</span>
            <span className="font-medium text-[var(--text-primary)]">HAMZA POWERPLAYER</span>
            <span aria-hidden="true">·</span>
            <span>Built with</span>
            <Heart size={10} aria-hidden="true" className="text-[var(--danger)]" fill="currentColor" />
            <span>in Pakistan</span>
          </p>

          <p className="text-xs text-[var(--text-muted)]">
            React · Vite · Tailwind CSS
          </p>
        </div>
      </div>

      {/* Giant watermark wordmark */}
      <div aria-hidden="true" className="pointer-events-none relative select-none px-4 pb-2 pt-4">
        <p className="hp-watermark text-center text-[clamp(2.4rem,8.5vw,8.5rem)]">
          <span className="block">HAMZA</span>
          <span className="block">POWERPLAYER</span>
        </p>
      </div>

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-6 right-6 z-40 hidden h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-[#08081a]/90 text-[var(--text-primary)] shadow-lg backdrop-blur transition-all duration-300 hover:border-[rgba(0,240,255,0.4)] hover:text-[var(--neon-cyan)] sm:inline-flex ${
          showScrollTop ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp size={15} aria-hidden="true" />
      </button>
    </footer>
  );
}
