import { useId, useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { PageHero } from '@/components/layout/PageHero';
import { Link } from 'wouter';
import { Plus, X } from 'lucide-react';

type Cat = 'GENERAL' | 'APPS' | 'HIRING' | 'TECH' | 'PRIVACY';

const FAQS: { cat: Cat; q: string; a: string }[] = [
  { cat: 'GENERAL', q: 'Who is HAMZA POWERPLAYER?', a: 'HAMZA POWERPLAYER develops apps and games. This portfolio links to the PakiGPA, SubSight, and The Last Bell releases, public GitHub repositories, and games in development.' },
  { cat: 'GENERAL', q: 'Where can I follow the public work?', a: 'Browse the Projects page for public GitHub repositories and use the Links page for the confirmed profiles and product pages.' },
  { cat: 'GENERAL', q: 'How can I send a message?', a: 'Use WhatsApp or LinkedIn from the Contact page. This website does not offer email contact.' },
  { cat: 'APPS', q: 'Which apps and games have verified store listings?', a: 'PakiGPA, SubSight, and The Last Bell each have a confirmed Google Play listing linked from this site.' },
  { cat: 'APPS', q: 'Is The Last Bell available?', a: 'Yes. The Last Bell is live on Google Play for Android. Open the Games page for its verified listing, gameplay details, and public source repository.' },
  { cat: 'APPS', q: 'Is there an iOS listing?', a: 'No iOS store listing has been verified for this portfolio. The confirmed app and game listings are Android releases on Google Play.' },
  { cat: 'APPS', q: 'How do I report an app issue or request a feature?', a: 'Message through WhatsApp or LinkedIn and describe the app, device, and issue. Avoid sending passwords or other sensitive information.' },
  { cat: 'HIRING', q: 'Are you currently available for a project?', a: 'Current availability is not published. Send a project brief through WhatsApp or LinkedIn to ask.' },
  { cat: 'HIRING', q: 'How much does a project cost and how long will it take?', a: 'Pricing and schedule depend on the agreed scope. Ask directly for an estimate before committing.' },
  { cat: 'TECH', q: 'Which technologies appear in the public repositories?', a: 'The linked public repositories include TypeScript, Dart, and C# projects, with React Native, Flutter, and Unity among the project platforms.' },
  { cat: 'TECH', q: 'Where can I view the source code?', a: 'Open the Projects page or the Links directory to browse the public GitHub repositories.' },
  { cat: 'PRIVACY', q: 'Does the contact form store my message?', a: 'No. The form creates a WhatsApp message draft and opens WhatsApp for you to review and send. The portfolio website does not receive or store the draft.' },
  { cat: 'PRIVACY', q: 'Does this website set cookies?', a: 'The website does not set first-party cookies or run analytics. It uses browser storage for consent-notice and interactive-site state; see the Cookie Policy.' },
];

const CATS: Cat[] = ['GENERAL', 'APPS', 'HIRING', 'TECH', 'PRIVACY'];

function AccordionItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const answerId = useId();
  return (
    <div className="glass-card rounded-xl overflow-hidden">
      <button onClick={() => setOpen(v => !v)} aria-expanded={open} aria-controls={answerId}
        className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors hover:bg-[rgba(0,240,255,0.03)]">
        <span className="font-display font-black text-sm text-[var(--text-primary)] pr-4">{q}</span>
        <span className="shrink-0 text-[var(--neon-cyan)]">{open ? <X size={16} /> : <Plus size={16} />}</span>
      </button>
      <div id={answerId} style={{ maxHeight: open ? 400 : 0, overflow: 'hidden', transition: 'max-height 0.3s ease' }}>
        <p className="px-5 pb-4 font-accent text-sm text-[var(--text-muted)] leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

export default function FAQPage() {
  const [active, setActive] = useState<Cat>('GENERAL');
  const [search, setSearch] = useState('');

  const filtered = FAQS.filter(f => {
    const matchCat = f.cat === active;
    const matchSearch = !search || f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <PageLayout
      title="HAMZA POWERPLAYER FAQs | Apps, Projects and Contact"
      description="Find verified details about PakiGPA, SubSight, and The Last Bell, public GitHub projects, contacting HAMZA POWERPLAYER, and browser storage."
      path="/faq"
    >
      <PageHero label="ANSWERS" title="FAQ" subtitle="Everything you wanted to know" />

      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Search */}
        <div className="relative mb-8">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] text-sm">🔍</span>
          <input aria-label="Search frequently asked questions" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search questions..."
            className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(0,240,255,0.12)] rounded-xl pl-10 pr-4 py-3 font-accent text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--neon-cyan)] placeholder:text-[rgba(255,255,255,0.25)]" />
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATS.map(c => (
            <button key={c} onClick={() => setActive(c)} aria-pressed={active === c}
              className="px-4 py-1.5 rounded-full font-display text-[10px] font-bold tracking-widest transition-all"
              style={active === c
                ? { background: 'var(--neon-cyan)', color: '#04040a' }
                : { background: 'rgba(255,255,255,0.04)', color: 'var(--text-muted)', border: '1px solid rgba(0,240,255,0.1)' }}>
              {c}
            </button>
          ))}
        </div>

        {/* FAQ accordion */}
        <div className="space-y-3 mb-12">
          {filtered.length > 0
            ? filtered.map(f => <AccordionItem key={f.q} q={f.q} a={f.a} />)
            : <p className="text-center font-accent text-sm text-[var(--text-muted)] py-8">No matching questions found.</p>}
        </div>

        {/* Still have questions */}
        <div className="glass-card rounded-2xl p-8 text-center">
          <h3 className="font-display font-black text-xl text-[var(--text-primary)] mb-2">Didn't find your answer?</h3>
          <p className="font-accent text-sm text-[var(--text-muted)] mb-5">Ask directly through WhatsApp or LinkedIn.</p>
          <Link href="/contact" className="inline-block px-6 py-3 rounded-xl font-display text-sm font-black text-[#04040a] tracking-widest transition-all hover:brightness-110"
            style={{ background: 'linear-gradient(90deg, var(--neon-cyan), var(--neon-violet))' }}>
            Ask Me Directly →
          </Link>
        </div>
      </div>
    </PageLayout>
  );
}
