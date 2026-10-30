import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { MapPin } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import { Linkedin } from 'lucide-react';
import { PageLayout } from '@/components/layout/PageLayout';
import { PageHero } from '@/components/layout/PageHero';
import { Link } from 'wouter';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  projectType: z.string().min(1, 'Please select a project type'),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  message: z.string().min(10, 'Message too short'),
  source: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

function PakistanClock() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const update = () => {
      const now = new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Karachi', hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setTime(now);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="font-mono text-xs text-[var(--neon-cyan)]">🕐 PKT: {time}</span>;
}

export default function ContactPage() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FormData) => {
    setSubmitting(true);
    const typeMap: Record<string, string> = { app: 'Mobile App', web: 'Web Development', ai: 'AI Integration', design: 'UI/UX Design', consult: 'Business Consultation', collab: 'Collaboration', other: 'Other' };
    const body = encodeURIComponent(
      `Hi Hamza,\n\nName: ${data.name}\nProject: ${typeMap[data.projectType] ?? data.projectType}\n${data.budget ? `Budget: ${data.budget}\n` : ''}${data.timeline ? `Timeline: ${data.timeline}\n` : ''}${data.source ? `Found via: ${data.source}\n` : ''}\nMessage:\n${data.message}`
    );
    window.open(`https://wa.me/923129584661?text=${body}`, '_blank', 'noopener,noreferrer');
    setSubmitting(false);
    setSuccess(true);
    reset();
    setTimeout(() => setSuccess(false), 6000);
  };

  const inputCls = 'w-full bg-[rgba(255,255,255,0.02)] border border-[rgba(0,240,255,0.12)] rounded-xl px-4 py-3 font-accent text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--neon-cyan)] transition-colors placeholder:text-[rgba(255,255,255,0.2)]';
  const selectCls = `${inputCls} cursor-pointer`;

  return (
    <PageLayout
      title="Contact HAMZA POWERPLAYER via WhatsApp or LinkedIn"
      description="Contact Hamza PowerPlayer for Flutter app development, AI integration, or collaboration. Message on WhatsApp or LinkedIn for the fastest response."
      path="/contact"
      schemas={[JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "@id": "https://www.hamzapowerplayer.com/contact#webpage",
        "url": "https://www.hamzapowerplayer.com/contact",
        "name": "Contact Hamza PowerPlayer",
        "description": "Reach Hamza PowerPlayer via WhatsApp or LinkedIn for project inquiries, collaborations, and freelance work.",
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.hamzapowerplayer.com/" },
            { "@type": "ListItem", "position": 2, "name": "Contact", "item": "https://www.hamzapowerplayer.com/contact" }
          ]
        }
      })]}
    >
      <PageHero label="GET IN TOUCH" title="Contact" subtitle="Let's build something together" />

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-5 gap-10">

          {/* Left column */}
          <div className="lg:col-span-2 space-y-5">
            {/* Status */}
            <div className="glass-card rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 rounded-full bg-[var(--success)]" style={{ animation: 'ai-pulse 1.5s ease infinite' }} />
                <span className="font-display font-black text-sm text-[var(--success)] tracking-widest">AVAILABLE FOR PROJECTS</span>
              </div>
              <p className="font-accent text-xs text-[var(--text-muted)] mb-3">Send a direct message through WhatsApp or LinkedIn.</p>
              <PakistanClock />
            </div>

            {/* WhatsApp */}
            <div className="glass-card rounded-2xl p-5" style={{ borderColor: 'rgba(37,211,102,0.3)', boxShadow: '0 0 20px rgba(37,211,102,0.06)' }}>
              <div className="flex items-center gap-2 mb-3">
                <SiWhatsapp size={16} style={{ color: '#25d366' }} />
                <span className="font-display text-xs tracking-widest" style={{ color: '#25d366' }}>WHATSAPP</span>
                <span className="ml-auto font-mono text-[10px] px-2 py-0.5 rounded-full" style={{ background: 'rgba(37,211,102,0.15)', color: '#25d366' }}>DIRECT</span>
              </div>
              <a href="https://wa.me/923129584661" target="_blank" rel="noopener noreferrer"
                className="block w-full text-center py-2 rounded-xl font-display text-xs font-bold text-[#04040a] tracking-widest transition-all hover:brightness-110"
                style={{ background: '#25d366' }}>
                Message on WhatsApp
              </a>
              <p className="font-accent text-xs text-[var(--text-muted)] mt-2">Project inquiries, questions, and collaborations</p>
            </div>

            {/* LinkedIn */}
            <div className="glass-card rounded-2xl p-5" style={{ borderColor: 'rgba(10,102,194,0.3)', boxShadow: '0 0 20px rgba(10,102,194,0.06)' }}>
              <div className="flex items-center gap-2 mb-3">
                <Linkedin size={16} style={{ color: '#0A66C2' }} />
                <span className="font-display text-xs tracking-widest" style={{ color: '#0A66C2' }}>LINKEDIN</span>
                <span className="ml-auto font-mono text-[10px] px-2 py-0.5 rounded-full" style={{ background: 'rgba(10,102,194,0.15)', color: '#0A66C2' }}>DIRECT</span>
              </div>
              <a href="https://linkedin.com/in/hamzapowerplayerofficial" target="_blank" rel="noopener noreferrer"
                className="block w-full text-center py-2 rounded-xl font-display text-xs font-bold text-white tracking-widest transition-all hover:brightness-110"
                style={{ background: '#0A66C2' }}>
                Message on LinkedIn
              </a>
              <p className="font-accent text-xs text-[var(--text-muted)] mt-2">Professional inquiries & partnerships</p>
            </div>

            {/* Location */}
            <div className="glass-card rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <MapPin size={16} className="text-[var(--neon-cyan)]" />
                <span className="font-display text-xs text-[var(--neon-cyan)] tracking-widest">LOCATION</span>
              </div>
              <p className="font-accent text-sm text-[var(--text-primary)]">Lahore, Pakistan 🇵🇰</p>
              <p className="font-accent text-xs text-[var(--text-muted)] mt-1">Available for remote work worldwide</p>
            </div>

            {/* What to include */}
            <div className="glass-card rounded-2xl p-5">
              <div className="font-display text-xs text-[var(--gold)] tracking-widest mb-3">WHAT TO INCLUDE</div>
              <ul className="space-y-1.5 text-xs font-accent text-[var(--text-muted)]">
                {['Your project idea or requirement', 'Your timeline / deadline', 'Your budget range (if applicable)', 'Where you heard about me'].map(i => (
                  <li key={i} className="flex gap-2"><span className="text-[var(--success)]">✓</span>{i}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right column — form */}
          <div className="lg:col-span-3">
            <div className="glass-card rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1" style={{ background: 'linear-gradient(90deg, var(--neon-cyan), var(--neon-violet))' }} />
              <h2 className="font-display font-black text-xl mb-6">Send a Message</h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="font-display text-[10px] text-[var(--neon-cyan)] tracking-widest uppercase block mb-1.5">Full Name *</label>
                  <input {...register('name')} className={inputCls} placeholder="Your full name" />
                  {errors.name && <p className="text-xs text-[var(--danger)] mt-1">{errors.name.message}</p>}
                </div>

                <div>
                  <label className="font-display text-[10px] text-[var(--neon-cyan)] tracking-widest uppercase block mb-1.5">Project Type *</label>
                  <select {...register('projectType')} className={selectCls}>
                    <option value="">Select project type...</option>
                    <option value="app">📱 Mobile App Development</option>
                    <option value="web">🌐 Web Development</option>
                    <option value="ai">🤖 AI Integration</option>
                    <option value="design">🎨 UI/UX Design</option>
                    <option value="consult">💼 Business Consultation</option>
                    <option value="collab">🤝 Collaboration / Partnership</option>
                    <option value="other">❓ Other</option>
                  </select>
                  {errors.projectType && <p className="text-xs text-[var(--danger)] mt-1">{errors.projectType.message}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-display text-[10px] text-[var(--neon-cyan)] tracking-widest uppercase block mb-1.5">Budget</label>
                    <select {...register('budget')} className={selectCls}>
                      <option value="">Select budget...</option>
                      <option value="under500">Under $500</option>
                      <option value="500-1k">$500 – $1,000</option>
                      <option value="1k-5k">$1,000 – $5,000</option>
                      <option value="5k-10k">$5,000 – $10,000</option>
                      <option value="10k+">$10,000+</option>
                      <option value="discuss">To be discussed</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-display text-[10px] text-[var(--neon-cyan)] tracking-widest uppercase block mb-1.5">Timeline</label>
                    <select {...register('timeline')} className={selectCls}>
                      <option value="">Select timeline...</option>
                      <option value="asap">ASAP (within 1 week)</option>
                      <option value="2-4w">2–4 weeks</option>
                      <option value="1-2m">1–2 months</option>
                      <option value="3m+">3+ months</option>
                      <option value="flex">Flexible</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-display text-[10px] text-[var(--neon-cyan)] tracking-widest uppercase block mb-1.5">Message *</label>
                  <textarea {...register('message')} rows={6} className={`${inputCls} resize-none`} placeholder="Tell me about your project, idea, or question..." />
                  {errors.message && <p className="text-xs text-[var(--danger)] mt-1">{errors.message.message}</p>}
                </div>

                <div>
                  <label className="font-display text-[10px] text-[var(--neon-cyan)] tracking-widest uppercase block mb-1.5">How did you find me?</label>
                  <input {...register('source')} className={inputCls} placeholder="YouTube, Google, friend, etc." />
                </div>

                <button type="submit" disabled={submitting}
                  className="w-full py-4 rounded-xl font-display font-black text-sm text-[#04040a] tracking-widest transition-all hover:brightness-110 disabled:opacity-60 mt-2"
                  style={{ background: success ? 'linear-gradient(90deg, var(--success), #00c853)' : 'linear-gradient(90deg, var(--neon-cyan), var(--neon-violet))' }}>
                  {submitting ? 'OPENING WHATSAPP...' : success ? '✓ WHATSAPP DRAFT OPENED!' : 'CONTINUE ON WHATSAPP →'}
                </button>

                {success && (
                  <p className="text-center text-xs font-mono text-[var(--success)]">
                    Your WhatsApp draft is ready. Review it and press Send to message Hamza.
                  </p>
                )}

                <p className="text-center text-xs font-accent text-[var(--text-muted)] opacity-60 flex items-center justify-center gap-1.5 mt-2">
                  Your message is opened in WhatsApp and is not submitted to or stored by this website.{' '}
                  <Link href="/privacy" className="text-[var(--neon-cyan)] hover:underline">Privacy Policy</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
