import type { ReactNode } from 'react';
import { Reveal } from '@/components/effects/ScrollReveal';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  aside?: ReactNode;
}

/**
 * Shared section header — eyebrow rule, display title, supporting copy.
 * Keeps card rhythm consistent across the homepage and pages.
 */
export function SectionHeading({ eyebrow, title, description, align = 'left', aside }: SectionHeadingProps) {
  const centered = align === 'center';

  return (
    <div
      className={`flex flex-wrap items-end justify-between gap-6 ${
        centered ? 'flex-col items-center text-center' : ''
      }`}
    >
      <div className={centered ? 'max-w-2xl' : 'max-w-2xl'}>
        <Reveal variant="slide-up" distance={18} duration={600}>
          <p className="hp-eyebrow">{eyebrow}</p>
        </Reveal>
        <Reveal variant="slide-up" distance={22} delay={0.08} duration={700}>
          <h2 className="hp-h2 mt-4">{title}</h2>
        </Reveal>
        {description && (
          <Reveal variant="slide-up" distance={20} delay={0.16} duration={700}>
            <p
              className={`mt-4 text-base leading-relaxed text-[var(--text-muted)] ${
                centered ? 'mx-auto max-w-xl' : ''
              }`}
            >
              {description}
            </p>
          </Reveal>
        )}
      </div>

      {aside && (
        <Reveal variant="slide-up" distance={16} delay={0.2} duration={600}>
          <div className="flex flex-wrap items-center gap-4">{aside}</div>
        </Reveal>
      )}
    </div>
  );
}
