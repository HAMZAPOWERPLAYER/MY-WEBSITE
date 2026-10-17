import { useState, useEffect, useRef } from 'react';
import { Menu, X, Zap } from 'lucide-react';
import { useLenisScroll } from '@/components/effects/SmoothScroll';

const NAV_LINKS = [
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Projects', id: 'projects' },
  { label: 'Tech', id: 'tech' },
  { label: 'AI', id: 'ai' },
  { label: 'Vision', id: 'roadmap' },
  { label: 'Console', id: 'console' },
  { label: 'Contact', id: 'contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState('');
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [logoVisible, setLogoVisible] = useState(false);
  const lenisScroll = useLenisScroll();

  useEffect(() => {
    // Entrance animation
    const t = setTimeout(() => setLogoVisible(true), 300);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 20);
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docH > 0 ? (scrollY / docH) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scrollspy
  useEffect(() => {
    const sectionIds = NAV_LINKS.map(l => l.id);
    const observers: IntersectionObserver[] = [];
    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveId(id); },
        { threshold: 0.3, rootMargin: '-10% 0px -10% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    lenisScroll(id);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 h-16 ${
          scrolled
            ? 'bg-[rgba(4,4,10,0.8)] backdrop-blur-2xl border-b border-[rgba(0,240,255,0.08)] shadow-[0_1px_0_rgba(0,240,255,0.06),0_8px_32px_rgba(0,0,0,0.4)]'
            : 'bg-transparent'
        }`}
      >
        {/* Top progress bar */}
        <div className="absolute top-0 left-0 right-0 h-[1.5px] overflow-hidden z-[60]">
          <div
            className="h-full origin-left transition-none"
            style={{
              width: `${scrollProgress}%`,
              background: 'linear-gradient(90deg, #00f0ff, #7c3aed, #f5c518)',
              boxShadow: '0 0 8px rgba(0,240,255,0.8)',
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          {/* Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer interactive group"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{
              opacity: logoVisible ? 1 : 0,
              transform: logoVisible ? 'translateX(0)' : 'translateX(-20px)',
              transition: 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.16,1,0.3,1)',
            }}
          >
            {/* HP hex badge */}
            <div className="relative w-9 h-9 flex items-center justify-center">
              <div
                className="absolute inset-0 rounded-lg"
                style={{
                  background: 'linear-gradient(135deg, rgba(0,240,255,0.15), rgba(124,58,237,0.1))',
                  border: '1px solid rgba(0,240,255,0.3)',
                  boxShadow: '0 0 12px rgba(0,240,255,0.2)',
                }}
              />
              <div
                className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'linear-gradient(135deg, rgba(0,240,255,0.25), rgba(124,58,237,0.2))',
                  boxShadow: '0 0 20px rgba(0,240,255,0.4)',
                }}
              />
              <span className="relative font-display font-black text-sm text-[var(--neon-cyan)]" style={{ textShadow: '0 0 10px rgba(0,240,255,0.8)' }}>HP</span>
            </div>
            <span className="font-display font-bold tracking-wider text-sm hidden sm:block text-[var(--text-primary)] group-hover:text-[var(--neon-cyan)] transition-colors duration-300">
              HAMZA POWERPLAYER
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link, i) => {
              const isActive = activeId === link.id;
              const isHovered = hoveredLink === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  onMouseEnter={() => setHoveredLink(link.id)}
                  onMouseLeave={() => setHoveredLink(null)}
                  className="relative px-4 py-2 rounded-lg font-accent text-sm font-medium interactive group"
                  style={{
                    color: isActive ? 'var(--neon-cyan)' : isHovered ? 'var(--text-primary)' : 'var(--text-muted)',
                    transition: 'color 0.2s ease',
                    opacity: logoVisible ? 1 : 0,
                    transform: logoVisible ? 'translateY(0)' : 'translateY(-10px)',
                    transitionDelay: `${0.1 + i * 0.05}s`,
                  }}
                >
                  {/* Hover background */}
                  <span
                    className="absolute inset-0 rounded-lg transition-opacity duration-200"
                    style={{
                      background: 'rgba(0,240,255,0.06)',
                      opacity: isHovered || isActive ? 1 : 0,
                    }}
                  />
                  <span className="relative z-10">{link.label}</span>
                  {/* Active indicator */}
                  {isActive && (
                    <span
                      className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                      style={{ background: 'var(--neon-cyan)', boxShadow: '0 0 6px var(--neon-cyan)' }}
                    />
                  )}
                  {/* Underline on hover */}
                  <span
                    className="absolute -bottom-0.5 left-0 right-0 h-[1px] transition-transform duration-200 origin-left"
                    style={{
                      background: 'linear-gradient(90deg, var(--neon-cyan), var(--neon-violet))',
                      transform: isHovered && !isActive ? 'scaleX(1)' : 'scaleX(0)',
                      boxShadow: '0 0 6px rgba(0,240,255,0.6)',
                    }}
                  />
                </button>
              );
            })}
          </div>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollTo('contact')}
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full text-xs font-display font-bold tracking-wider interactive transition-all duration-300 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, rgba(0,240,255,0.12), rgba(124,58,237,0.08))',
                border: '1px solid rgba(0,240,255,0.25)',
                color: 'var(--neon-cyan)',
                boxShadow: '0 0 12px rgba(0,240,255,0.1)',
                opacity: logoVisible ? 1 : 0,
                transition: 'opacity 0.6s ease 0.6s, transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 20px rgba(0,240,255,0.3)';
                (e.currentTarget as HTMLButtonElement).style.background = 'linear-gradient(135deg, rgba(0,240,255,0.2), rgba(124,58,237,0.15))';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 12px rgba(0,240,255,0.1)';
                (e.currentTarget as HTMLButtonElement).style.background = 'linear-gradient(135deg, rgba(0,240,255,0.12), rgba(124,58,237,0.08))';
              }}
            >
              <Zap size={12} />
              HIRE ME
            </button>

            <button
              className="md:hidden text-[var(--text-primary)] interactive p-2 rounded-lg hover:bg-[rgba(255,255,255,0.06)] transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6">
                <span className={`absolute inset-0 transition-all duration-300 flex items-center justify-center ${mobileMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 rotate-90'}`}>
                  <X size={22} />
                </span>
                <span className={`absolute inset-0 transition-all duration-300 flex items-center justify-center ${mobileMenuOpen ? 'opacity-0 -rotate-90' : 'opacity-100 rotate-0'}`}>
                  <Menu size={22} />
                </span>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu — full-screen overlay */}
      <div
        className="fixed inset-0 z-40 md:hidden"
        style={{
          background: 'rgba(4,4,10,0.97)',
          backdropFilter: 'blur(24px)',
          opacity: mobileMenuOpen ? 1 : 0,
          pointerEvents: mobileMenuOpen ? 'auto' : 'none',
          transition: 'opacity 0.35s ease',
        }}
      >
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 rounded-full opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #00f0ff, transparent 70%)', filter: 'blur(40px)' }} />
        <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #7c3aed, transparent 70%)', filter: 'blur(40px)' }} />

        <div className="flex flex-col items-center justify-center h-full gap-4 px-6">
          <p className="font-accent text-[10px] tracking-[6px] text-[var(--text-muted)] mb-4 uppercase">Navigation</p>
          {NAV_LINKS.map((link, i) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="w-full max-w-xs font-display text-xl font-bold interactive group flex items-center justify-between px-6 py-3 rounded-xl transition-all duration-200"
              style={{
                color: activeId === link.id ? 'var(--neon-cyan)' : 'var(--text-primary)',
                background: activeId === link.id ? 'rgba(0,240,255,0.06)' : 'rgba(255,255,255,0.02)',
                border: `1px solid ${activeId === link.id ? 'rgba(0,240,255,0.2)' : 'rgba(255,255,255,0.05)'}`,
                opacity: mobileMenuOpen ? 1 : 0,
                transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(30px)',
                transitionDelay: mobileMenuOpen ? `${i * 0.05}s` : '0s',
              }}
            >
              <span>{link.label}</span>
              {activeId === link.id && (
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--neon-cyan)] shadow-[0_0_8px_var(--neon-cyan)]" />
              )}
            </button>
          ))}

          <button
            onClick={() => scrollTo('contact')}
            className="mt-4 w-full max-w-xs py-3.5 rounded-full font-display font-bold tracking-wider text-sm text-[#04040a] interactive"
            style={{
              background: 'linear-gradient(135deg, #00f0ff, #7c3aed)',
              boxShadow: '0 0 30px rgba(0,240,255,0.3)',
              opacity: mobileMenuOpen ? 1 : 0,
              transition: `opacity 0.3s ease ${NAV_LINKS.length * 0.05 + 0.1}s`,
            }}
          >
            ⚡ HIRE ME
          </button>
        </div>
      </div>
    </>
  );
}
