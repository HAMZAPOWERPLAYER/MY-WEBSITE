import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { SiGithub, SiYoutube, SiWhatsapp } from 'react-icons/si';
import { Linkedin, ArrowUp, Heart } from 'lucide-react';
import { WaveformBorder } from '@/components/effects/WaveformBorder';
import { useLenisScroll } from '@/components/effects/SmoothScroll';
import { GlowText } from '@/components/effects/GlowText';

const PAGES_COL = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Apps', href: '/apps' },
  { label: 'Games', href: '/games' },
  { label: 'Projects', href: '/projects' },
  { label: 'Links', href: '/links' },
  { label: 'Blog', href: '/blog' },
  { label: 'Tools', href: '/tools' },
  { label: 'FAQ', href: '/faq' },
];

const WORK_COL = [
  { label: 'Hire Me', href: '/hire' },
  { label: 'Contact', href: '/contact' },
  { label: 'Services', href: '/hire' },
  { label: 'Portfolio', href: '/' },
];

const LEGAL_COL = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Cookie Policy', href: '/cookies' },
  { label: 'Disclaimer', href: '/disclaimer' },
  { label: 'Sitemap', href: '/sitemap' },
];

const SOCIAL = [
  { Icon: SiGithub, href: 'https://github.com/HAMZAPOWERPLAYER', label: 'GitHub', color: '#f0f0ff' },
  { Icon: Linkedin, href: 'https://www.linkedin.com/in/hamzapowerplayerofficial', label: 'LinkedIn', color: '#0A66C2' },
  { Icon: SiWhatsapp, href: 'https://wa.me/923129584661', label: 'WhatsApp', color: '#25D366' },
  { Icon: SiYoutube, href: 'https://youtube.com/@hamzapowerplayer', label: 'YouTube', color: '#FF0000' },
];

export function Footer() {
  const [secretUnlocked, setSecretUnlocked] = useState(false);
  const [bgOpacity, setBgOpacity] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const lenisScroll = useLenisScroll();

  useEffect(() => {
    setSecretUnlocked(localStorage.getItem('konami') === 'true');
  }, []);

  useEffect(() => {
    const footer = document.querySelector('footer');
    if (!footer) return;
    const handler = () => {
      const rect = footer.getBoundingClientRect();
      const proximity = Math.max(0, Math.min(1, 1 - rect.top / window.innerHeight));
      setBgOpacity(proximity * 0.07);
      setShowScrollTop(window.scrollY > 600);
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const NavLink = ({ label, href }: { label: string; href: string }) => {
    if (href.startsWith('/#')) {
      const id = href.slice(2);
      return (
        <button
          onClick={() => lenisScroll(id)}
          className="block font-accent text-xs text-[var(--text-muted)] hover:text-[var(--neon-cyan)] transition-colors text-left"
        >
          {label}
        </button>
      );
    }
    return (
      <Link href={href} className="block font-accent text-xs text-[var(--text-muted)] hover:text-[var(--neon-cyan)] transition-colors">
        {label}
      </Link>
    );
  };

  return (
    <footer className="relative bg-[var(--bg-surface)] border-t border-[rgba(0,240,255,0.08)] overflow-hidden">
      <div className="w-full">
        <WaveformBorder flip />
      </div>

      {/* Aurora bleed */}
      <div className="absolute top-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(0,240,255,0.06) 0%, transparent 70%)' }} />

      {/* Giant background text */}
      <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="font-display font-black whitespace-nowrap"
          style={{ fontSize: '7vw', opacity: bgOpacity, letterSpacing: '0.1em', color: 'transparent', WebkitTextStroke: '1px rgba(0,240,255,0.15)' }}>
          HAMZA POWERPLAYER
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 pt-16 pb-10">

        {/* Social strip */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-14">
          {SOCIAL.map(({ Icon, href, label, color }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="group relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 interactive"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = `${color}15`;
                el.style.borderColor = `${color}40`;
                el.style.boxShadow = `0 0 16px ${color}30`;
                el.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = 'rgba(255,255,255,0.03)';
                el.style.borderColor = 'rgba(255,255,255,0.07)';
                el.style.boxShadow = 'none';
                el.style.transform = '';
              }}
            >
              <Icon size={16} style={{ color: 'var(--text-muted)', transition: 'color 0.2s ease' }} className="group-hover:!text-white" />
            </a>
          ))}
        </div>

        {/* 4-column grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ border: '1px solid rgba(0,240,255,0.3)', boxShadow: '0 0 16px rgba(0,240,255,0.2)', background: 'rgba(0,240,255,0.06)' }}
              >
                <span className="font-display font-black text-sm text-[var(--neon-cyan)]" style={{ textShadow: '0 0 8px rgba(0,240,255,0.8)' }}>HP</span>
              </div>
              <span className="font-display font-bold tracking-wider text-sm text-[var(--text-primary)]">HAMZA POWERPLAYER</span>
            </div>
            <p className="font-accent text-xs text-[var(--text-muted)] leading-relaxed mb-3">
              Building the future, one app at a time.
            </p>
            <p className="font-accent text-xs text-[var(--text-muted)] mb-1">Pakistan 🇵🇰</p>
            <p className="font-accent text-xs text-[var(--text-muted)]">Available Worldwide 🌍</p>

            {/* Status */}
            <div className="flex items-center gap-2 mt-4">
              <div className="glow-dot" />
              <span className="font-accent text-[10px] text-[var(--success)] tracking-wider">OPEN TO PROJECTS</span>
            </div>
          </div>

          {/* Pages */}
          <div>
            <div className="font-body text-xs text-[var(--neon-cyan)] tracking-widest mb-4">PAGES</div>
            <div className="space-y-2.5">
              {PAGES_COL.map(l => <NavLink key={l.label} {...l} />)}
            </div>
          </div>

          {/* Work */}
          <div>
            <div className="font-body text-xs text-[var(--neon-cyan)] tracking-widest mb-4">WORK</div>
            <div className="space-y-2.5">
              {WORK_COL.map(l => <NavLink key={l.label} {...l} />)}
            </div>
          </div>

          {/* Legal */}
          <div>
            <div className="font-body text-xs text-[var(--neon-cyan)] tracking-widest mb-4">LEGAL</div>
            <div className="space-y-2.5">
              {LEGAL_COL.map(l => <NavLink key={l.label} {...l} />)}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="neon-divider mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 font-accent text-xs text-[var(--text-muted)]">
            <span>© {new Date().getFullYear()}</span>
            <span className="text-[var(--neon-cyan)] font-bold">HAMZA POWERPLAYER</span>
            <span>· Built with</span>
            <Heart size={10} className="text-[var(--danger)]" fill="currentColor" />
            <span>in Pakistan</span>
          </div>

          {secretUnlocked && (
            <div className="font-body text-[10px] text-[var(--gold)] tracking-widest opacity-60">
              ⬆⬆⬇⬇◀▶◀▶ KONAMI UNLOCKED
            </div>
          )}

          <div className="font-accent text-xs text-[var(--text-muted)]">
            Powered by <span className="text-[var(--neon-cyan)]">React</span> · <span className="text-[var(--neon-violet)]">Vite</span> · <span className="text-[var(--gold)]">Tailwind</span>
          </div>
        </div>
      </div>

      {/* Scroll-to-top FAB */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 w-11 h-11 rounded-full flex items-center justify-center interactive transition-all duration-300 z-50"
        style={{
          background: 'linear-gradient(135deg, rgba(0,240,255,0.15), rgba(124,58,237,0.1))',
          border: '1px solid rgba(0,240,255,0.25)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3), 0 0 12px rgba(0,240,255,0.15)',
          opacity: showScrollTop ? 1 : 0,
          transform: showScrollTop ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.8)',
          pointerEvents: showScrollTop ? 'auto' : 'none',
        }}
        aria-label="Scroll to top"
      >
        <ArrowUp size={16} className="text-[var(--neon-cyan)]" />
      </button>
    </footer>
  );
}
