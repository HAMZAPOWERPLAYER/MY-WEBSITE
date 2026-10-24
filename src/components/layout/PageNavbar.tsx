import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { ChevronDown, Menu, X } from 'lucide-react';
import { trapFocus } from '@/lib/focusTrap';

const PRIMARY_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Apps', href: '/apps' },
  { label: 'Games', href: '/games' },
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const MORE_LINKS = [
  { label: 'Links', href: '/links' },
  { label: 'Blog', href: '/blog' },
  { label: 'Hire Me', href: '/hire' },
  { label: 'Tools', href: '/tools' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
  { label: 'Sitemap', href: '/sitemap' },
];

function isActivePath(location: string, href: string) {
  if (href === '/') return location === '/';
  return location === href || location.startsWith(`${href}/`);
}

export function PageNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [location] = useLocation();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const mobilePanelRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMoreOpen(false);
  }, [location]);

  useEffect(() => {
    if (!moreOpen) return;

    const onPointerDown = (event: PointerEvent) => {
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setMoreOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMoreOpen(false);
    };

    document.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [moreOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileOpen(false);
      if (event.key === 'Tab') trapFocus(event, mobilePanelRef.current);
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      menuButtonRef.current?.focus();
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled
            ? 'border-b border-white/[0.08] bg-[#04040a]/85 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <nav aria-label="Primary" className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-6">
          <Link href="/" className="group flex shrink-0 items-center gap-3">
            <span className="grid h-8 w-8 place-items-center rounded-lg border border-[rgba(0,240,255,0.28)] bg-[rgba(0,240,255,0.06)] font-display text-[10px] font-black tracking-wide text-[var(--neon-cyan)]">
              HP
            </span>
            <span className="hidden font-display text-[11px] font-bold tracking-[0.16em] text-[var(--text-primary)] transition-colors group-hover:text-[var(--neon-cyan)] sm:block">
              HAMZA POWERPLAYER
            </span>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {PRIMARY_LINKS.map((link) => {
              const active = isActivePath(location, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative rounded-lg px-3 py-2 text-[13px] font-medium transition-colors hover:bg-white/[0.04] ${
                    active ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)] hover:text-white'
                  }`}
                >
                  {link.label}
                  {active && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-3 -bottom-0.5 h-px bg-[var(--neon-cyan)]"
                    />
                  )}
                </Link>
              );
            })}

            <div
              ref={moreRef}
              className="relative"
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node)) {
                  setMoreOpen(false);
                }
              }}
            >
              <button
                type="button"
                onClick={() => setMoreOpen((open) => !open)}
                className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-[13px] font-medium text-[var(--text-muted)] transition-colors hover:bg-white/[0.04] hover:text-white"
                aria-haspopup="true"
                aria-expanded={moreOpen}
                aria-controls="more-navigation"
              >
                More{' '}
                <ChevronDown
                  size={13}
                  aria-hidden="true"
                  className={`transition-transform ${moreOpen ? 'rotate-180' : ''}`}
                />
              </button>
              <div
                id="more-navigation"
                className={`absolute right-0 top-full w-44 overflow-hidden rounded-xl border border-white/10 bg-[#08081a]/98 p-1 shadow-2xl backdrop-blur-xl transition-all duration-150 ${
                  moreOpen ? 'visible translate-y-1 opacity-100' : 'invisible translate-y-0 opacity-0'
                }`}
              >
                {MORE_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMoreOpen(false)}
                    className="block rounded-lg px-3 py-2 text-xs text-[var(--text-muted)] transition-colors hover:bg-white/[0.05] hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/hire"
              className="hidden items-center gap-2 rounded-lg border border-[rgba(0,240,255,0.28)] bg-[rgba(0,240,255,0.06)] px-4 py-2 font-display text-[11px] font-bold tracking-[0.08em] text-[var(--neon-cyan)] transition-colors hover:bg-[rgba(0,240,255,0.12)] md:inline-flex"
            >
              Hire me
            </Link>
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMobileOpen(true)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-[var(--text-primary)] transition-colors hover:bg-white/[0.06] lg:hidden"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              aria-controls="page-mobile-navigation"
            >
              <Menu size={20} aria-hidden="true" />
            </button>
          </div>
        </nav>
      </header>

      {mobileOpen && (
        <div
          id="page-mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-0 z-[60] lg:hidden"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[#04040a]/98 backdrop-blur-xl"
            onClick={() => setMobileOpen(false)}
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
                onClick={() => setMobileOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-[var(--text-primary)] transition-colors hover:bg-white/[0.06]"
                aria-label="Close menu"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>

            <nav aria-label="Mobile" className="mt-4 flex-1 overflow-y-auto">
              {[...PRIMARY_LINKS, ...MORE_LINKS].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block border-b border-white/[0.06] py-2.5 font-display text-base font-bold tracking-wide ${
                    isActivePath(location, link.href) ? 'text-[var(--neon-cyan)]' : 'text-[var(--text-primary)]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="pt-4">
              <Link
                href="/hire"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center rounded-xl bg-[var(--neon-cyan)] px-5 py-3 font-display text-xs font-black tracking-[0.08em] text-[#04040a]"
              >
                Start a project
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
