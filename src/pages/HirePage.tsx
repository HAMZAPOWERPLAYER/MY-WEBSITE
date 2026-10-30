import { PageLayout } from '@/components/layout/PageLayout';
import { PageHero } from '@/components/layout/PageHero';
import { Link } from 'wouter';

const SERVICES = [
  {
    icon: '📱', title: 'Mobile App Projects',
    color: 'var(--neon-cyan)',
    items: ['Discuss platform and requirements', 'Review relevant published app work', 'Agree deliverables before work begins'],
  },
  {
    icon: '🤖', title: 'AI and API Features',
    color: 'var(--neon-violet)',
    items: ['Describe the problem and expected result', 'Confirm feasibility and technical scope', 'Discuss providers and integrations directly'],
  },
  {
    icon: '🌐', title: 'Web Projects',
    color: 'var(--gold)',
    items: ['Share the site or product goals', 'Agree on pages and functionality', 'Discuss delivery and support in the proposal'],
  },
  {
    icon: '🎨', title: 'Product Design',
    color: '#e040fb',
    items: ['Discuss the audience and use cases', 'Review requirements and references', 'Confirm the scope before design work'],
  },
];

const STEPS = [
  { step: '01', title: 'DISCOVERY', sub: 'Project brief', text: 'Share the goal, audience, platform, and constraints so the requirements are clear.' },
  { step: '02', title: 'SCOPE', sub: 'Estimate', text: 'If the project is a fit, confirm deliverables, schedule, and cost before work begins.' },
  { step: '03', title: 'AGREEMENT', sub: 'Written terms', text: 'Agree on the scope and working terms before committing to the project.' },
  { step: '04', title: 'BUILD', sub: 'Project work', text: 'Work proceeds against the agreed scope, with progress updates arranged directly.' },
  { step: '05', title: 'REVIEW', sub: 'Quality check', text: 'Review the agreed deliverables and identify any scope changes.' },
  { step: '06', title: 'HANDOFF', sub: 'Closeout', text: 'Confirm delivery and any follow-up support in the written agreement.' },
];

const WHY = [
  { icon: '⚡', title: 'CLEAR', text: 'Scope, schedule, and costs are discussed before work begins.' },
  { icon: '🧠', title: 'PRACTICAL', text: 'Project requirements and constraints guide the proposed solution.' },
  { icon: '🤝', title: 'DIRECT', text: 'Questions and project details are handled through WhatsApp or LinkedIn.' },
];

export default function HirePage() {
  return (
    <PageLayout
      title="Hire HAMZA POWERPLAYER for App and Software Projects"
      description="Discuss mobile apps, web projects, or product features with HAMZA POWERPLAYER. Ask about current availability, scope, schedule, and pricing directly."
      path="/hire"
      schemas={[JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": "https://www.hamzapowerplayer.com/hire#service",
        "name": "Flutter App Development & AI Integration",
        "url": "https://www.hamzapowerplayer.com/hire",
        "provider": { "@id": "https://www.hamzapowerplayer.com/#person" },
        "serviceType": ["Mobile App Projects", "AI and API Features", "Web Projects", "Product Design"],
        "description": "Contact to discuss project scope, availability, schedule, and pricing. Terms are confirmed directly before work begins.",
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.hamzapowerplayer.com/" },
            { "@type": "ListItem", "position": 2, "name": "Hire Me", "item": "https://www.hamzapowerplayer.com/hire" }
          ]
        }
      })]}
    >
      <PageHero label="WORK WITH ME" title="Hire Me" subtitle="Let's build your vision" />

      <div className="max-w-5xl mx-auto px-6 py-12 space-y-16">
        {/* Availability banner */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl px-6 py-4"
          style={{ background: 'rgba(0,255,136,0.06)', border: '1px solid rgba(0,255,136,0.25)' }}>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-[var(--success)]" style={{ animation: 'ai-pulse 1.5s ease infinite' }} />
            <span className="font-display font-black text-sm text-[var(--success)] tracking-widest">CHECK AVAILABILITY</span>
          </div>
          <p className="font-accent text-sm text-[var(--text-muted)]">Send a project brief to discuss current availability</p>
        </div>

        {/* Services */}
        <div>
          <h2 className="font-display font-black text-3xl mb-8 text-center">Services</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {SERVICES.map(s => (
              <div key={s.title} className="glass-card rounded-2xl p-6 hover:border-[rgba(0,240,255,0.25)] transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{s.icon}</div>
                  <div className="text-right">
                    <div className="font-mono text-xs text-[var(--text-muted)]">SCOPE-BASED</div>
                  </div>
                </div>
                <h3 className="font-display font-black text-lg text-[var(--text-primary)] mb-4">{s.title}</h3>
                <ul className="space-y-2 mb-5">
                  {s.items.map(item => (
                    <li key={item} className="flex gap-2 text-sm text-[var(--text-muted)]">
                      <span style={{ color: s.color }}>✓</span>{item}
                    </li>
                  ))}
                </ul>
                <Link href="/contact"
                  className="block w-full text-center py-2.5 rounded-xl font-display text-xs font-black text-[#04040a] tracking-widest transition-all hover:brightness-110"
                  style={{ background: s.color }}>
                  Get Quote →
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* How we work */}
        <div>
          <h2 className="font-display font-black text-3xl mb-8 text-center">Project Process</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {STEPS.map((step, i) => (
              <div key={step.step} className="glass-card rounded-xl p-5 relative">
                <div className="font-display font-black text-4xl opacity-10 absolute top-4 right-4">{step.step}</div>
                <div className="font-mono text-xs text-[var(--neon-cyan)] mb-1">{step.sub}</div>
                <div className="font-display font-black text-sm text-[var(--text-primary)] mb-2">{step.title}</div>
                <p className="font-accent text-xs text-[var(--text-muted)] leading-relaxed">{step.text}</p>
                {i < STEPS.length - 1 && (
                  <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 text-[var(--neon-cyan)] text-lg z-10">›</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Why hire me */}
        <div>
          <h2 className="font-display font-black text-3xl mb-6 text-center">Why Hire Me</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {WHY.map(w => (
              <div key={w.title} className="glass-card rounded-2xl p-6 text-center">
                <div className="text-4xl mb-3">{w.icon}</div>
                <div className="font-display font-black text-sm text-[var(--neon-cyan)] tracking-widest mb-2">{w.title}</div>
                <p className="font-accent text-sm text-[var(--text-muted)] italic">"{w.text}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="glass-card rounded-3xl p-10 text-center">
          <h2 className="font-display font-black text-3xl text-[var(--text-primary)] mb-3">Ready to start building?</h2>
          <p className="font-accent text-[var(--text-muted)] mb-8">Let's turn your idea into reality.</p>
          <Link href="/contact"
            className="inline-block px-10 py-4 rounded-2xl font-display font-black text-[#04040a] text-lg tracking-widest transition-all hover:brightness-110 hover:scale-105"
            style={{ background: 'linear-gradient(90deg, var(--neon-cyan), var(--neon-violet))', boxShadow: '0 0 40px rgba(0,240,255,0.3)' }}>
            CONTACT ME NOW →
          </Link>
          <p className="font-mono text-xs text-[var(--text-muted)] mt-5">Message on <a className="text-[var(--success)]" href="https://wa.me/923129584661">WhatsApp</a> or <a className="text-[#0A66C2]" href="https://www.linkedin.com/in/hamzapowerplayerofficial">LinkedIn</a>.</p>
        </div>
      </div>
    </PageLayout>
  );
}
