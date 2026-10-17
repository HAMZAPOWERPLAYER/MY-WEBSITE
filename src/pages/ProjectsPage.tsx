import { useMemo, useState } from 'react';
import { Link } from 'wouter';
import { Search } from 'lucide-react';
import { PageLayout } from '@/components/layout/PageLayout';
import { PageHero } from '@/components/layout/PageHero';
import { PROJECTS, initialsFor } from '@/lib/products';

export default function ProjectsPage() {
  const [search, setSearch] = useState('');
  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return PROJECTS.filter((project) =>
      !query ||
      `${project.name} ${project.summary ?? ''} ${project.language ?? ''} ${project.topics?.join(' ') ?? ''}`
        .toLowerCase()
        .includes(query),
    );
  }, [search]);

  return (
    <PageLayout
      title="Public GitHub Projects | HAMZA POWERPLAYER Software"
      description="Browse public GitHub software projects by HAMZA POWERPLAYER, including offline apps, developer tools, PDF tools, image upscaling, and PhotoPass."
      path="/projects"
    >
      <PageHero label="PUBLIC REPOSITORIES" title="Projects" subtitle="Public repositories discovered on GitHub" />
      <div className="mx-auto max-w-6xl px-6 py-12">
        <label className="relative mx-auto mb-10 block max-w-xl">
          <span className="sr-only">Search projects</span>
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full rounded-xl border border-[rgba(0,240,255,0.15)] bg-[rgba(255,255,255,0.03)] py-3 pl-11 pr-4 font-accent text-sm text-[var(--text-primary)] outline-none focus:border-[var(--neon-cyan)]"
            placeholder="Search public projects"
          />
        </label>
        <div className="grid gap-5 sm:grid-cols-2">
          {filtered.map((project) => (
            <article key={project.id} className="glass-card rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div
                  aria-hidden="true"
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-xl font-display text-sm font-black text-[#04040a]"
                  style={{ background: project.accent?.gradient ?? 'linear-gradient(135deg,#00f0ff,#7c3aed)' }}
                >
                  {initialsFor(project.name)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-[10px] tracking-widest text-[var(--success)]">PUBLIC SOURCE</span>
                    {project.language && <span className="font-mono text-xs text-[var(--text-muted)]">{project.language}</span>}
                  </div>
                  <h2 className="mt-1 font-display text-xl font-black text-[var(--text-primary)]">{project.name}</h2>
                </div>
              </div>
              <p className="mt-3 min-h-12 font-accent text-sm leading-relaxed text-[var(--text-muted)]">
                {project.summary ?? 'No description is available in the public repository metadata.'}
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href={project.route} className="inline-flex rounded-lg border border-[rgba(0,240,255,0.25)] px-4 py-2 font-display text-xs font-bold tracking-wider text-[var(--neon-cyan)] hover:bg-[rgba(0,240,255,0.08)]">
                  Project details
                </Link>
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex rounded-lg border border-[rgba(255,255,255,0.12)] px-4 py-2 font-display text-xs font-bold tracking-wider text-[var(--text-muted)] hover:text-white">
                    View on GitHub →
                  </a>
                )}
              </div>
            </article>
          ))}
          {filtered.length === 0 && <p className="sm:col-span-2 py-12 text-center font-accent text-sm text-[var(--text-muted)]">No projects match that search.</p>}
        </div>
      </div>
    </PageLayout>
  );
}
