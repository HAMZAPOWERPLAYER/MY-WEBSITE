/* ── Shared scroll-reveal engine ──────────────────────────────────────────
   Contract (see bug report):
   1. Content is ALWAYS visible by default — the prerendered HTML and the
      no-JS state contain no opacity:0 anywhere.
   2. The hidden state is applied by JS only AFTER the IntersectionObserver
      has proven it fires (its first callback). If the observer never fires
      (suspended frames, broken embeds, exotic webviews), content simply
      never gets hidden and no black gaps can appear.
   3. Global safety net: 1500ms after install, every [data-reveal] element
      is forced visible and released from its observer. Nothing can stay
      hidden, even if every other guard fails.
   4. prefers-reduced-motion → visible immediately, no animation.

   IO config: threshold 0.05 (max) + rootMargin '0px 0px -10% 0px', so tall
   elements always qualify (a threshold like 0.5 on a tall element is
   unreachable and strands content invisible forever).
   ──────────────────────────────────────────────────────────────────────── */

type RevealStyles = Partial<CSSStyleDeclaration>;
export type { RevealStyles };

export function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined'
    && typeof window.matchMedia === 'function'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

export function isInViewport(el: HTMLElement): boolean {
  const rect = el.getBoundingClientRect();
  return (
    rect.top < window.innerHeight
    && rect.bottom > 0
    && rect.left < window.innerWidth
    && rect.right > 0
  );
}

/* Stop functions for every element that has reveal wiring, so the safety
   net can also detach its observer. */
const revealStoppers = new WeakMap<HTMLElement, () => void>();

function forceVisible(el: HTMLElement) {
  el.style.transition = 'none';
  el.style.transitionDelay = '0s';
  el.style.opacity = '1';
  el.style.transform = 'none';
  el.style.filter = 'none';
  el.style.willChange = 'auto';
  el.setAttribute('data-reveal-hidden', 'false');
}

let safetyNetInstalled = false;

/** Global fallback: 1500ms after the first reveal wiring, force every
    [data-reveal] element visible. Runs once per page load. */
export function installRevealSafetyNet(): void {
  if (safetyNetInstalled || typeof window === 'undefined') return;
  safetyNetInstalled = true;
  window.setTimeout(() => {
    document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
      forceVisible(el);
      revealStoppers.get(el)?.();
    });
  }, 1500);
}

export interface RevealSetupOptions {
  /** Element the IntersectionObserver watches. */
  observed: HTMLElement;
  /** Elements that receive the hidden/final styles (default: [observed]). */
  styled?: HTMLElement[];
  /** Hidden (initial) state, e.g. { opacity: '0', transform: 'translateY(26px)' }. */
  init: RevealStyles;
  /** Final (visible) state. */
  final: RevealStyles;
  /** Transition for target i when revealing animated, e.g. 'all 700ms ... 0.1s'. */
  revealTransition: (index: number) => string;
  /** Max 0.05 — see header. */
  threshold?: number;
  /** Re-hide when scrolled out? Default true (reveal once). */
  once?: boolean;
}

export function setupReveal({
  observed,
  styled,
  init,
  final,
  revealTransition,
  threshold = 0.05,
  once = true,
}: RevealSetupOptions): () => void {
  const targets = styled ?? [observed];
  installRevealSafetyNet();

  const applyStyles = (styles: RevealStyles, animated: boolean) => {
    targets.forEach((el, i) => {
      el.style.transition = animated ? revealTransition(i) : 'none';
      if (!animated) el.style.transitionDelay = '0s';
      Object.assign(el.style, styles);
      el.style.willChange = animated ? 'transform, opacity, filter' : 'auto';
    });
  };

  const markHidden = (hidden: boolean) => {
    targets.forEach((el) => {
      el.setAttribute('data-reveal', '');
      el.setAttribute('data-reveal-hidden', hidden ? 'true' : 'false');
    });
  };

  const show = (animated: boolean) => {
    markHidden(false);
    applyStyles(final, animated);
  };
  const hide = () => {
    markHidden(true);
    applyStyles(init, false);
  };

  // Guard 1: reduced motion → visible, no animation, no observer.
  if (prefersReducedMotion()) {
    show(false);
    return () => {};
  }
  // Guard 2: already on screen → visible immediately (never hidden above the fold).
  if (isInViewport(observed)) {
    show(false);
    return () => {};
  }
  // Guard 3: no IntersectionObserver support → visible, full stop.
  if (typeof IntersectionObserver === 'undefined') {
    show(false);
    return () => {};
  }

  // Visible in the DOM until the observer proves it works.
  markHidden(false);

  let hiddenApplied = false;
  let revealed = false;

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          if (once && revealed) return;
          revealed = true;
          show(true);
          if (once) io.unobserve(observed);
        } else if (!hiddenApplied) {
          // First confirmed callback + below the fold → only now hide.
          hiddenApplied = true;
          hide();
        } else if (!once) {
          hide();
        }
      }
    },
    { threshold, rootMargin: '0px 0px -10% 0px' },
  );
  io.observe(observed);

  const stop = () => io.disconnect();
  targets.forEach((el) => revealStoppers.set(el, stop));
  return stop;
}
