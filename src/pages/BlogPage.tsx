import { Link } from 'wouter';
import { ArrowUpRight, BookOpen } from 'lucide-react';
import { PageLayout } from '@/components/layout/PageLayout';
import { PageHero } from '@/components/layout/PageHero';

export default function BlogPage() {
  return (
    <PageLayout
      title="Developer Notes and Build Logs | HAMZA POWERPLAYER"
      description="The HAMZA POWERPLAYER blog is not published yet. Until then, explore verified apps, public GitHub projects, and upcoming games instead of invented articles."
      path="/blog"
    >
      <PageHero label="THOUGHTS" title="Blog" subtitle="Writing in progress — no articles are published yet" />
      <div className="mx-auto max-w-3xl px-6 py-16 text-center">
        <div className="glass-card rounded-3xl p-10">
          <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-2xl border border-[rgba(0,240,255,0.25)] bg-[rgba(0,240,255,0.06)]">
            <BookOpen size={26} className="text-[var(--neon-cyan)]" />
          </div>
          <h2 className="font-display text-2xl font-black text-[var(--text-primary)]">
            No articles have been published yet
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-accent text-sm leading-relaxed text-[var(--text-muted)]">
            This page previously listed placeholder articles with invented titles, dates, download numbers, and a
            newsletter. None of that was real, so it has been removed. Genuine write-ups will appear here only after
            they are actually written and reviewed.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-xl border border-[rgba(0,240,255,0.25)] px-5 py-3 font-display text-xs font-bold tracking-wider text-[var(--neon-cyan)]"
            >
              View public projects <ArrowUpRight size={14} />
            </Link>
            <Link
              href="/apps"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-5 py-3 font-display text-xs font-bold tracking-wider text-[var(--text-primary)]"
            >
              View published apps <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
