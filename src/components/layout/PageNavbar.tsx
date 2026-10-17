import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, ChevronDown } from 'lucide-react';

const PAGE_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Apps', href: '/apps' },
  { label: 'Games', href: '/games' },
  { label: 'Projects', href: '/projects' },
  { label: 'Links', href: '/links' },
  { label: 'Blog', href: '/blog' },
  { label: 'Hire Me', href: '/hire' },
  { label: 'Contact', href: '/contact' },
];

const MORE_LINKS = [
  { label: 'Tools', href: '/tools' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
  { label: 'Sitemap', href: '/sitemap' },
];

export function PageNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-16 ${
        scrolled ? 'bg-[rgba(4,4,10,0.9)] backdrop-blur-xl border-b border-[var(--border-glow)]' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 cursor-pointer">
            <span className="font-display font-bold text-xl text-[var(--neon-cyan)] neon-text-glow">HP</span>
            <span className="font-accent font-semibold tracking-wider text-sm hidden sm:block text-[var(--text-primary)]">
              HAMZA POWERPLAYER
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-5">
            {PAGE_LINKS.map(link => {
              const isActive = location === link.href;
              return (
                <Link key={link.href} href={link.href}
                  className="font-accent text-sm font-medium relative group transition-colors duration-200"
                  style={{ color: isActive ? 'var(--neon-cyan)' : 'var(--text-muted)' }}>
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-[2px] bg-[var(--neon-cyan)] transition-all duration-300 group-hover:w-full"
                    style={{ width: isActive ? '100%' : '0%', boxShadow: '0 0 8px #00f0ff' }} />
                </Link>
              );
            })}
            {/* More dropdown */}
            <div className="relative" onMouseEnter={() => setMoreOpen(true)} onMouseLeave={() => setMoreOpen(false)}>
              <button className="font-accent text-sm font-medium text-[var(--text-muted)] hover:text-[var(--neon-cyan)] flex items-center gap-1 transition-colors">
                More <ChevronDown size={14} />
              </button>
              {moreOpen && (
                <div className="absolute top-full right-0 mt-2 w-44 rounded-xl overflow-hidden"
                  style={{ background: 'rgba(8,8,26,0.98)', border: '1px solid rgba(0,240,255,0.2)', backdropFilter: 'blur(20px)', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
                  {MORE_LINKS.map(link => (
                    <Link key={link.href} href={link.href}
                      className="block px-4 py-2.5 font-accent text-sm text-[var(--text-muted)] hover:text-[var(--neon-cyan)] hover:bg-[rgba(0,240,255,0.05)] transition-colors">
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          <button className="md:hidden text-[var(--text-primary)]" onClick={() => setMobileOpen(v => !v)}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className="fixed inset-0 z-40 md:hidden flex flex-col items-center justify-center gap-5"
        style={{
          background: 'rgba(4,4,10,0.97)', backdropFilter: 'blur(24px)',
          transform: mobileOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s ease',
          pointerEvents: mobileOpen ? 'auto' : 'none',
        }}>
        {[...PAGE_LINKS, ...MORE_LINKS].map((link, i) => (
          <Link key={link.href} href={link.href}
            className="font-display text-xl font-bold hover:text-[var(--neon-cyan)] transition-colors"
            style={{ color: location === link.href ? 'var(--neon-cyan)' : 'var(--text-primary)', transitionDelay: `${i * 0.04}s` }}>
            {link.label}
          </Link>
        ))}
      </div>
    </>
  );
}
