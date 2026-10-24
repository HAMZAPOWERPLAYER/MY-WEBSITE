import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { SiGithub, SiWhatsapp, SiYoutube } from 'react-icons/si';
import { ArrowUp, Heart, Linkedin } from 'lucide-react';

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
              className="text-xs text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
            >
              {link.label}
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
    <footer className="relative border-t border-white/[0.08] bg-[#050510]">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-lg border border-[rgba(0,240,255,0.28)] bg-[rgba(0,240,255,0.06)] font-display text-[11px] font-black text-[var(--neon-cyan)]">
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
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[var(--success)]" />
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
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.02] text-[var(--text-muted)] transition-colors hover:border-white/20 hover:text-white"
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
