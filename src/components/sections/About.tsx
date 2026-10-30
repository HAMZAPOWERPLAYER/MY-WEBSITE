import { Link } from 'wouter';
import { ArrowRight, Check, MapPin } from 'lucide-react';
import { APPS, GAMES, PROJECTS } from '@/lib/products';

const liveGames = GAMES.filter((game) => game.status === 'published');
const liveProducts = APPS.length + liveGames.length;

const STATS = [
  { value: String(liveProducts), label: 'Live on Google Play' },
  { value: String(PROJECTS.length), label: 'Public repositories' },
  { value: String(APPS.length), label: 'Published apps' },
  { value: String(liveGames.length), label: 'Live game' },
];

const PRINCIPLES = [
  {
    title: 'Privacy-first defaults',
    body: 'I avoid accounts and tracking unless the product genuinely needs them.',
  },
  {
    title: 'Offline where it matters',
    body: 'The core experience should keep working when the network does not.',
  },
  {
    title: 'Small, honest interfaces',
    body: 'Every screen earns its place, and every button does what it says.',
  },
];

export function About() {
  return (
    <section id="about" className="relative scroll-mt-20 border-t border-white/[0.06] py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <p className="hp-eyebrow">About</p>
            <h2 className="hp-h2 mt-4">One developer. The whole pipeline.</h2>

            <div className="mt-5 space-y-4 text-base leading-relaxed text-[var(--text-muted)]">
              <p>
                I&apos;m Hamza, an independent developer based in Pakistan. I build Android apps
                and games end to end — product decisions, interface, code, and the store release.
              </p>
              <p>
                My work is offline-first and privacy-first by default. PakiGPA and SubSight run
                without an account, and The Last Bell is fully playable offline. That constraint
                makes products faster, calmer, and easier to trust.
              </p>
              <p>
                I care about the unglamorous parts: accurate calculations, clear error states,
                small installs, and releases that keep working after launch.
              </p>
            </div>

            <ul className="mt-8 grid gap-4 sm:grid-cols-3">
              {PRINCIPLES.map((principle) => (
                <li key={principle.title} className="border-t border-white/[0.1] pt-4">
                  <div className="flex items-center gap-2">
                    <Check size={14} aria-hidden="true" className="text-[var(--neon-cyan)]" />
                    <h3 className="text-xs font-semibold text-[var(--text-primary)]">{principle.title}</h3>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-[var(--text-muted)]">{principle.body}</p>
                </li>
              ))}
            </ul>

            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--neon-cyan)] transition-opacity hover:opacity-80"
            >
              More about me <ArrowRight size={12} aria-hidden="true" />
            </Link>
          </div>

          <div className="hp-card hp-card-hover hp-card-spot relative h-fit overflow-hidden p-6 sm:p-7">
            <div className="relative z-10">
              <div className="flex items-center gap-3">
                <div className="relative grid h-12 w-12 place-items-center rounded-xl border border-[rgba(0,240,255,0.3)] bg-[rgba(0,240,255,0.06)] font-display text-sm font-black text-[var(--neon-cyan)] shadow-[0_0_24px_rgba(0,240,255,0.2)]">
                  HP
                  <span aria-hidden="true" className="glow-dot absolute -bottom-0.5 -right-0.5" />
                </div>
                <div>
                  <p className="font-display text-sm font-bold tracking-wide text-[var(--text-primary)]">
                    HAMZA POWERPLAYER
                  </p>
                  <p className="mt-0.5 text-xs text-[var(--text-muted)]">Independent developer</p>
                </div>
              </div>

              <dl className="mt-6 grid grid-cols-2 gap-3">
                {STATS.map((stat) => (
                  <div
                    key={stat.label}
                    className="flex flex-col-reverse rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5 transition-colors duration-300 hover:border-[rgba(0,240,255,0.22)]"
                  >
                    <dt className="mt-1 text-[11px] leading-snug text-[var(--text-muted)]">{stat.label}</dt>
                    <dd className="hp-stat-value font-display text-2xl font-black">{stat.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-6 border-t border-white/[0.08] pt-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                  Focus
                </p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {['Android', 'Flutter', 'Unity', 'React', 'TypeScript', 'AI APIs'].map((tag) => (
                    <li
                      key={tag}
                      className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2 py-1 font-mono text-[10px] text-[var(--text-muted)] transition-colors hover:border-[rgba(0,240,255,0.25)] hover:text-[var(--neon-cyan)]"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="mt-5 flex items-center gap-2 text-xs text-[var(--text-muted)]">
                <MapPin size={13} aria-hidden="true" className="text-[var(--neon-cyan)]" />
                Pakistan · Working worldwide
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
