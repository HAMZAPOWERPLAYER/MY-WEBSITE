import { PageLayout } from '@/components/layout/PageLayout';
import { PageHero } from '@/components/layout/PageHero';

const SECTIONS = [
  {
    title: 'General Disclaimer',
    icon: '⚠️',
    text: 'The information on this website is for general informational purposes. While I strive for accuracy, I make no warranties about completeness or reliability.',
  },
  {
    title: 'Tutorial / Blog Disclaimer',
    icon: '📝',
    text: 'Code and tutorials provided are for educational purposes. Test all code before production use. I am not responsible for issues arising from implementing my tutorials.',
  },
  {
    title: 'Earnings / Results Disclaimer',
    icon: '📊',
    text: 'Any income or download figures mentioned are my own results. Individual results will vary based on effort, market, and many other factors.',
  },
  {
    title: 'Affiliate Disclaimer',
    icon: '🔗',
    text: 'Some links on this site may be affiliate links. I only recommend tools I personally use and trust. Clicking them may earn me a small commission at no extra cost to you.',
  },
  {
    title: 'External Links',
    icon: '🌐',
    text: 'I link to external websites for reference. I am not responsible for their content or privacy practices.',
  },
];

export default function DisclaimerPage() {
  return (
    <PageLayout
      title="Disclaimer and Legal Information | HAMZA POWERPLAYER"
      description="Disclaimer for the HAMZA POWERPLAYER portfolio, apps, and content. Important legal information about the limits of liability and external links."
      path="/disclaimer"
    >
      <PageHero label="LEGAL" title="Disclaimer" subtitle="Important information about my content" />

      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="flex justify-end mb-6">
          <div className="glass-card px-4 py-2 rounded-full font-mono text-xs text-[var(--text-muted)]">Last Updated: June 2026</div>
        </div>

        <div className="space-y-5">
          {SECTIONS.map(s => (
            <div key={s.title} className="glass-card rounded-2xl p-6 hover:border-[rgba(0,240,255,0.2)] transition-all">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{s.icon}</span>
                <h2 className="font-display font-black text-lg text-[var(--text-primary)]">{s.title}</h2>
              </div>
              <p className="font-accent text-sm text-[var(--text-muted)] leading-[1.8]">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
