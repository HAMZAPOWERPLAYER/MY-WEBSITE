import { PageLayout } from '@/components/layout/PageLayout';
import { PageHero } from '@/components/layout/PageHero';

const TOOLS = [
  { icon: '🔒', name: 'Privacy Policy Generator', desc: 'Generate a privacy policy for your app in seconds.', tags: ['Web', 'Free', 'Instant'], ready: true },
  { icon: '💡', name: 'App Name Generator', desc: 'AI-powered app name ideas based on your description.', tags: ['AI', 'Web', 'Free'], ready: true },
  { icon: '🎨', name: 'Color Palette Generator', desc: 'Generate dark/neon color palettes for apps.', tags: ['Design', 'Web', 'Free'], ready: true },
  { icon: '📝', name: 'Markdown README Generator', desc: 'Create a beautiful GitHub README from a form.', tags: ['Dev', 'Web', 'Free'], ready: true },
  { icon: '📦', name: 'App Size Estimator', desc: 'Estimate how much space your Flutter app will need.', tags: ['Flutter', 'Web', 'Free'], ready: true },
  { icon: '🔌', name: 'API Endpoint Tester', desc: 'Quick test any REST API endpoint in browser.', tags: ['Dev', 'Web', 'Free'], ready: true },
  { icon: '⚡', name: 'Flutter Snippet Library', desc: 'Curated Flutter code snippets, ready to copy-paste.', tags: ['Flutter', 'Dev', 'Free'], ready: false },
  { icon: '🤖', name: 'AI Prompt Tester', desc: 'Test and compare prompts across GPT, Claude, Gemini.', tags: ['AI', 'Web', 'Free'], ready: false },
  { icon: '📊', name: 'App Analytics Dashboard', desc: 'Beautiful free analytics for indie developers.', tags: ['Analytics', 'Free'], ready: false },
];

export default function ToolsPage() {
  return (
    <PageLayout
      title="Free Online Developer Tools for Developers by HAMZA POWERPLAYER"
      description="Free online tools built by HAMZA POWERPLAYER for developers and creators. Text converters, utilities, and more — no signup required, and all tools run locally."
      path="/tools"
      schemas={[JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        "url": "https://www.hamzapowerplayer.com/tools",
        "name": "Free Tools by Hamza PowerPlayer",
        "description": "Free online developer tools built by Hamza PowerPlayer.",
        "breadcrumb": { "@type": "BreadcrumbList", "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.hamzapowerplayer.com/" },
          { "@type": "ListItem", "position": 2, "name": "Free Tools", "item": "https://www.hamzapowerplayer.com/tools" }
        ]}
      })]}
    >
      <PageHero label="FREE FOREVER" title="Tools" subtitle="Useful tools I built for developers" />

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Banner */}
        <div className="text-center mb-10">
          <div className="inline-block px-6 py-3 rounded-full font-mono text-sm text-[var(--neon-cyan)] mb-4"
            style={{ background: 'rgba(0,240,255,0.06)', border: '1px solid rgba(0,240,255,0.2)' }}>
            Everything here is 100% free. No signup. No limits.
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {TOOLS.map(tool => (
            <div key={tool.name} className={`glass-card rounded-2xl p-5 transition-all ${tool.ready ? 'hover:border-[rgba(0,240,255,0.3)]' : 'opacity-60'} flex flex-col`}>
              {!tool.ready && (
                <div className="flex justify-end mb-1">
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded" style={{ background: 'rgba(124,58,237,0.2)', color: 'var(--neon-violet)', border: '1px solid rgba(124,58,237,0.3)' }}>
                    COMING SOON
                  </span>
                </div>
              )}
              <div className="text-4xl mb-3">{tool.icon}</div>
              <h3 className="font-display font-black text-sm text-[var(--text-primary)] mb-2">{tool.name}</h3>
              <p className="font-accent text-xs text-[var(--text-muted)] leading-relaxed flex-1 mb-4">{tool.desc}</p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {tool.tags.map(t => (
                  <span key={t} className="font-mono text-[10px] px-2 py-0.5 rounded" style={{ background: 'rgba(0,240,255,0.06)', color: 'var(--neon-cyan)', border: '1px solid rgba(0,240,255,0.15)' }}>{t}</span>
                ))}
              </div>
              {tool.ready ? (
                <button className="w-full py-2 rounded-xl font-display text-xs font-black text-[#04040a] tracking-widest transition-all hover:brightness-110"
                  style={{ background: 'linear-gradient(90deg, var(--neon-cyan), var(--neon-violet))' }}>
                  Use Tool →
                </button>
              ) : (
                <button disabled className="w-full py-2 rounded-xl font-display text-xs font-black text-[var(--text-muted)] tracking-widest cursor-not-allowed"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  Coming Soon
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
