import { useEffect, useState } from 'react';
import { Home, Zap, Layers, Terminal, Mail } from 'lucide-react';

const NAV_ITEMS = [
  { icon: Home, label: 'Home', id: 'hero' },
  { icon: Zap, label: 'Skills', id: 'skills' },
  { icon: Layers, label: 'Projects', id: 'projects' },
  { icon: Terminal, label: 'Console', id: 'console' },
  { icon: Mail, label: 'Contact', id: 'contact' },
];

export function MobileBottomNav() {
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const sectionIds = NAV_ITEMS.map(n => n.id);
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { threshold: 0.4 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach(o => o.disconnect());
  }, []);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-[60] flex items-center justify-around h-[60px] border-t border-[var(--border-glow)] mobile-bottom-nav-safe"
      style={{
        background: 'rgba(4,4,10,0.92)',
        backdropFilter: 'blur(24px)',
      }}
    >
      {NAV_ITEMS.map(({ icon: Icon, label, id }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            onClick={() => handleClick(id)}
            className="flex flex-col items-center gap-1 px-3 transition-all duration-200"
            aria-label={label}
          >
            <Icon
              size={20}
              style={{
                color: isActive ? 'var(--neon-cyan)' : 'var(--text-muted)',
                filter: isActive ? 'drop-shadow(0 0 6px #00f0ff)' : 'none',
                transition: 'all 0.2s ease',
              }}
            />
            <span
              className="font-accent text-[9px] tracking-wider"
              style={{ color: isActive ? 'var(--neon-cyan)' : 'var(--text-muted)', transition: 'color 0.2s ease' }}
            >
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
