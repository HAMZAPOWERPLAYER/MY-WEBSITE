import { useEffect, useRef, type PointerEvent, type ReactNode } from 'react';
import { setupReveal } from '@/components/effects/reveal';
import { cn } from '@/lib/utils';

/**
 * Bento system — the single source of tile styling for the homepage.
 *
 * `BentoGrid` is the CSS grid (12 cols desktop / 6 tablet / 1 mobile, 16px gap).
 * `BentoTile` is the glass tile: radius 24px, padding 24px, one idea per tile.
 * `BentoBlobs` is the fixed white blob layer that gives the glass something to blur.
 *
 * Size is expressed in bento units. A unit is 3 columns on both the 12-column
 * desktop grid and the 6-column tablet grid, so the same spans work everywhere:
 *   1x1 → quarter width        2x1 → half width
 *   2x2 → half width, 2 rows   1x2 → quarter width, 2 rows
 */
export type BentoSize = '1x1' | '2x1' | '2x2' | '1x2';

interface BentoGridProps {
  children: ReactNode;
  className?: string;
  'aria-label'?: string;
}

export function BentoGrid({ children, className, ...rest }: BentoGridProps) {
  return (
    <div className={cn('bento-grid', className)} {...rest}>
      {children}
    </div>
  );
}

interface BentoTileProps {
  size?: BentoSize;
  children: ReactNode;
  /** Extra classes for the glass surface itself (e.g. `bento-tile--flush`). */
  className?: string;
  /** Position of the tile in the grid — drives the entrance stagger. */
  index?: number;
  /** Fixed entrance delay in seconds; overrides the index-based stagger. */
  delay?: number;
  /**
   * Set false for tiles that are already above the fold: they render
   * immediately with no entrance animation, so nothing is ever hidden.
   */
  animate?: boolean;
}

export function BentoTile({ size = '1x1', children, className, index = 0, delay, animate = true }: BentoTileProps) {
  const cellRef = useRef<HTMLDivElement>(null);
  const tileRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);
  const finePointer = useRef(false);

  /* Entrance (opt-out): the cell is visible by default in the HTML. The
     hidden state is applied by JS only if the observer proves it fires, and
     a global 1500ms safety net force-reveals everything regardless.
     See ./reveal.ts (via setupReveal) for the contract. Stagger: 400–600ms
     ease-out rise, ~70ms apart; reduced motion renders static. */
  const entranceDelay = delay ?? Math.min(index * 0.07, 0.35);

  useEffect(() => {
    const cell = cellRef.current;
    if (!cell || !animate) return;
    return setupReveal({
      observed: cell,
      init: { opacity: '0', transform: 'translateY(26px)' },
      final: { opacity: '1', transform: 'translateY(0px)' },
      revealTransition: () => `all 0.5s cubic-bezier(0.22, 1, 0.36, 1) ${entranceDelay}s`,
    });
  }, [animate, entranceDelay]);

  /* Glass gating: tiles are glassy by default; the observer only DOWNGRADES
     off-screen tiles to the solid fallback (backdrop-filter is expensive).
     If the observer never fires, tiles simply stay glassy — visible. */
  useEffect(() => {
    const tile = tileRef.current;
    if (!tile) return;
    if (typeof IntersectionObserver === 'undefined') {
      tile.dataset.visible = 'true';
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          tile.dataset.visible = entry.isIntersecting ? 'true' : 'false';
        }
      },
      { rootMargin: '160px 0px 160px 0px' },
    );
    observer.observe(tile);
    return () => observer.disconnect();
  }, []);

  /* Cursor-following light, written straight to CSS custom properties so the
     pointer never triggers a React re-render. Fine pointers only. */
  useEffect(() => {
    finePointer.current =
      typeof window.matchMedia === 'function'
        && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const tile = tileRef.current;
    if (!tile || !finePointer.current) return;
    const rect = tile.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = 0;
      tile.style.setProperty('--bento-mx', `${x}px`);
      tile.style.setProperty('--bento-my', `${y}px`);
    });
  };

  return (
    <div ref={cellRef} className={cn('bento-cell', `bento-cell--${size}`)}>
      <div
        ref={tileRef}
        data-visible="true"
        onPointerMove={handlePointerMove}
        className={cn('bento-tile', className)}
      >
        {children}
      </div>
    </div>
  );
}

/**
 * 2–3 large blurred white blobs, fixed behind the page so the glass tiles
 * actually have something to refract. Purely decorative.
 */
export function BentoBlobs() {
  return (
    <div aria-hidden="true" className="bento-blobs">
      <span className="bento-blob bento-blob--a" />
      <span className="bento-blob bento-blob--b" />
      <span className="bento-blob bento-blob--c" />
    </div>
  );
}
