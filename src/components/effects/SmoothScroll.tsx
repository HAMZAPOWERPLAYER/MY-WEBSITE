import { useEffect, ReactNode } from 'react';
import Lenis from 'lenis';

let lenisInstance: Lenis | null = null;

export function getLenis() { return lenisInstance; }

export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenisInstance = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Patch smooth scroll anchors
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('[data-scroll-to]');
      if (!anchor) return;
      e.preventDefault();
      const id = anchor.getAttribute('data-scroll-to');
      if (id) {
        const el = document.getElementById(id);
        if (el) lenis.scrollTo(el, { offset: -80, duration: 1.5 });
      }
    };
    document.addEventListener('click', handleAnchorClick);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisInstance = null;
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return <>{children}</>;
}

/* Hook to scroll to a section via Lenis */
export function useLenisScroll() {
  return (id: string, offset = -80) => {
    if (lenisInstance) {
      const el = document.getElementById(id);
      if (el) lenisInstance.scrollTo(el, { offset, duration: 1.4 });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };
}
