import { Database, Smartphone, Wrench, type LucideIcon } from 'lucide-react';
import { SectionHeading } from '@/components/sections/SectionHeading';
import { BentoGrid, BentoTile } from '@/components/bento/BentoTile';
import type { BentoSize } from '@/components/bento/BentoTile';

interface TechGroup {
  title: string;
  description: string;
  Icon: LucideIcon;
  size: BentoSize;
  items: string[];
}

/**
 * One tech group per tile — every tool appears exactly once, grouped by
 * what it is for. Strictly monochrome: no emoji, no colored chips.
 */
const TECH_GROUPS: TechGroup[] = [
  {
    title: 'Mobile & languages',
    description: 'Flutter-first, with native Android and the web when the product needs it.',
    Icon: Smartphone,
    size: '2x2',
    items: ['Flutter', 'Dart', 'React Native', 'TypeScript', 'JavaScript', 'Swift', 'Python'],
  },
  {
    title: 'Backend, data & AI',
    description: 'Serverless storage, sync, and AI behind real guardrails.',
    Icon: Database,
    size: '1x2',
    items: ['Firebase', 'Supabase', 'Node.js', 'PostgreSQL', 'REST APIs', 'OpenAI API', 'LangChain', 'AI APIs'],
  },
  {
    title: 'Tools & workflow',
    description: 'The daily setup, from design files to the terminal.',
    Icon: Wrench,
    size: '1x2',
    items: ['Git', 'GitHub', 'Figma', 'VS Code', 'Cursor AI', 'Replit'],
  },
];

/**
 * Technology — bento grid of tech groups. The first group gets the 2x2
 * tile; the other two sit beside it as tall 1x2 tiles.
 */
export function TechStack() {
  return (
    <section id="tech" className="relative scroll-mt-20 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Technology"
          title="One toolbox, every project."
          description="The same core stack ships every product — chosen for offline reliability, small installs, and long-term maintenance."
        />

        <BentoGrid className="mt-12" aria-label="Technology groups">
          {TECH_GROUPS.map(({ title, description, Icon, size, items }, index) => (
            <BentoTile key={title} size={size} index={index}>
              <div className="relative z-[2] flex h-full flex-col">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/12 bg-white/[0.05] text-[var(--text-primary)]">
                  <Icon size={21} aria-hidden="true" />
                </span>
                <h3 className="bento-h mt-5 text-lg">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[var(--text-muted)]">{description}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={`${title} tools`}>
                  {items.map((item) => (
                    <li key={item} className="bento-chip">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </BentoTile>
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}
