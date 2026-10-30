import { useEffect, useRef, useState } from 'react';
import { Link } from 'wouter';
import { Menu, X } from 'lucide-react';
import { trapFocus } from '@/lib/focusTrap';

type NavLink = { label: string; id?: string; href?: string };

const NAV_LINKS: NavLink[] = [
  { label: 'Work', id: 'work' },
  { label: 'Apps', href: '/apps' },
  { label: 'Games', href: '/games' },
  { label: 'Services', id: 'services' },
  { label: 'About', id: 'about' },
];

const MOBILE_EXTRA = [
  { label: 'Projects', href: '/projects' },
  { label: 'Blog', href: '/blog' },
  { label: 'Links', href: '/links' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState('');
  const [progress, setProgress] = useState(0);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const mobilePanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(100, (window.scrollY / scrollable) * 100) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ids = NAV_LINKS.flatMap((link) => (link.id ? [link.id] : []));
    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        });

        if (visible.size === 0) {
          setActiveId('');
          return;
        }

        const topMost = [...visible].sort((a, b) => {
          const elementA = document.getElementById(a);
          const elementB = document.getElementById(b);
          return (
            (elementA?.getBoundingClientRect().top ?? 0) -
            (elementB?.getBoundingClientRect().top ?? 0)
          );
        })[0];

        setActiveId(topMost);
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 },
    );
    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
      if (event.key === 'Tab') trapFocus(event, mobilePanelRef.current);
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      menuButtonRef.current?.focus();
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled
            ? 'border-b border-white/[0.08] bg-[#04040a]/85 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-white/[0.04]">
          <div className="h-full bg-[var(--neon-cyan)]/60" style={{ width: `${progress}%` }} />
        </div>

        <nav aria-label="Primary" className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-6">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex shrink-0 items-center gap-3"
            aria-label="HP HAMZA POWERPLAYER — back to top"
          >
            <span className="relative grid h-8 w-8 place-items-center rounded-lg border border-[rgba(0,240,255,0.28)] bg-[rgba(0,240,255,0.06)] font-display text-[10px] font-black tracking-wide text-[var(--neon-cyan)] shadow-[0_0_16px_rgba(0,240,255,0.25)] transition-shadow group-hover:shadow-[0_0_24px_rgba(0,240,255,0.45)]">
              HP
            </span>
            <span className="hidden font-display text-[11px] font-bold tracking-[0.16em] text-[var(--text-primary)] transition-colors group-hover:text-[var(--neon-cyan)] sm:block">
              HAMZA POWERPLAYER
            </span>
          </button>

          <div className="hp-nav-pill hidden md:flex">
            {NAV_LINKS.map((link) =>
              link.href ? (
                <Link
                  key={link.label}
                  href={link.href}
                  className="hp-nav-link"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={`#${link.id}`}
                  className={`hp-nav-link ${activeId === link.id ? 'hp-nav-link-active' : ''}`}
                >
                  {link.label}
                </a>
              ),
            )}
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/contact"
              className="hp-btn-pro hidden px-4 py-2 font-display text-[11px] font-black tracking-[0.08em] md:inline-flex"
            >
              Contact
            </Link>
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMenuOpen(true)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-[var(--text-primary)] transition-colors hover:bg-white/[0.06] md:hidden"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
            >
              <Menu size={20} aria-hidden="true" />
            </button>
          </div>
        </nav>
      </header>

      {menuOpen && (
        <div
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-0 z-[60] md:hidden"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[#04040a]/98 backdrop-blur-xl"
            onClick={() => setMenuOpen(false)}
          />

          <div ref={mobilePanelRef} className="relative flex h-full flex-col px-6 pb-8 pt-4">
            <div className="flex h-16 items-center justify-between">
              <span className="flex items-center gap-3">
                <span className="grid h-8 w-8 place-items-center rounded-lg border border-[rgba(0,240,255,0.28)] bg-[rgba(0,240,255,0.06)] font-display text-[10px] font-black text-[var(--neon-cyan)]">
                  HP
                </span>
                <span className="font-display text-[11px] font-bold tracking-[0.16em] text-[var(--text-primary)]">
                  HAMZA POWERPLAYER
                </span>
              </span>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setMenuOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-[var(--text-primary)] transition-colors hover:bg-white/[0.06]"
                aria-label="Close menu"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>

            <nav aria-label="Mobile" className="mt-10 flex flex-col">
              {NAV_LINKS.map((link) =>
                link.href ? (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="border-b border-white/[0.06] py-4 font-display text-xl font-bold tracking-wide text-[var(--text-primary)]"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.label}
                    href={`#${link.id}`}
                    onClick={() => setMenuOpen(false)}
                    className="border-b border-white/[0.06] py-4 font-display text-xl font-bold tracking-wide text-[var(--text-primary)]"
                  >
                    {link.label}
                  </a>
                ),
              )}
              {MOBILE_EXTRA.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="border-b border-white/[0.06] py-4 font-display text-xl font-bold tracking-wide text-[var(--text-primary)]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="mt-auto pt-8">
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="hp-btn-pro w-full justify-center px-5 py-3.5 font-display text-xs font-black tracking-[0.08em]"
              >
                Start a conversation
              </Link>
              <p className="mt-4 text-center font-mono text-[10px] tracking-[0.14em] text-[var(--text-muted)]">
                PAKISTAN · WORKING WORLDWIDE
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
