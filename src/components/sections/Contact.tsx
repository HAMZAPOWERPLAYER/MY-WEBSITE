import { useState } from 'react';
import { BlurReveal } from '../effects/BlurReveal';
import { SpotlightCard } from '../effects/SpotlightCard';
import { GlowText } from '../effects/GlowText';
import { MagneticButton } from '../effects/MagneticButton';
import { SiGithub, SiX, SiInstagram, SiWhatsapp } from 'react-icons/si';
import { Linkedin } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Globe } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  projectType: z.string().min(1, "Please select a project type"),
  message: z.string().min(10, "Message must be at least 10 characters")
});

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      projectType: "",
      message: ""
    }
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);

    const projectLabels: Record<string, string> = {
      app: 'App Development',
      web: 'Web Development',
      ai: 'AI Integration',
      other: 'Other',
    };

    const body = encodeURIComponent(
      `Hi Hamza,\n\n` +
      `My name is ${values.name} and I found you through your portfolio.\n\n` +
      `Project Type: ${projectLabels[values.projectType] ?? values.projectType}\n` +
      `Message:\n${values.message}`
    );

    setIsSubmitting(true);
    window.open(`https://wa.me/923129584661?text=${body}`, '_blank', 'noopener,noreferrer');
    setIsSubmitting(false);
    setIsSuccess(true);
    form.reset();
    setTimeout(() => setIsSuccess(false), 5000);
  };

  const SOCIALS = [
    { Icon: Linkedin,    href: 'https://www.linkedin.com/in/hamzapowerplayerofficial', label: 'LinkedIn', color: '#0A66C2' },
    { Icon: SiWhatsapp,  href: 'https://wa.me/923129584661',                  label: 'WhatsApp',  color: '#25D366' },
  ];

  return (
    <section id="contact" className="py-32 relative z-10 parallax-layer" data-speed="0.9">
      <div className="max-w-7xl mx-auto px-6">
        <BlurReveal className="text-center mb-20">
          <div className="section-pill mx-auto mb-5 w-fit" style={{ borderColor: 'rgba(0,240,255,0.25)', color: 'var(--neon-cyan)', background: 'rgba(0,240,255,0.05)' }}>
            ⟡ CONTACT
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[var(--text-primary)]">
            Let's Build <GlowText variant="cyan" tag="span">Something</GlowText>
          </h2>
        </BlurReveal>

        <div className="grid lg:grid-cols-2 gap-16">
          <BlurReveal className="flex flex-col justify-center">
            <h3 className="font-display text-3xl font-bold text-[var(--text-primary)] mb-8 leading-tight">
              Have an idea? A project? A vision? Let's turn it into reality together.
            </h3>
            
            {/* Contact info items */}
            <div className="space-y-4 mb-10">
              {[
                { Icon: MapPin, text: 'Pakistan 🇵🇰',       color: '#7c3aed' },
                { Icon: Globe,  text: 'Available Worldwide', color: '#f5c518' },
              ].map(({ Icon, text, color }) => (
                <div key={text} className="flex items-center gap-4">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${color}10`, border: `1px solid ${color}25`, boxShadow: `0 0 12px ${color}10` }}
                  >
                    <Icon size={17} style={{ color }} />
                  </div>
                  <span className="font-accent text-sm text-[var(--text-muted)]">{text}</span>
                </div>
              ))}
            </div>

            {/* Preferred contact note */}
            <div className="mb-8 p-4 rounded-xl" style={{ background: 'rgba(37,211,102,0.05)', border: '1px solid rgba(37,211,102,0.2)' }}>
              <p className="font-accent text-xs text-[var(--text-muted)] leading-relaxed">
                💬 <strong className="text-[var(--success)]">Message on WhatsApp or LinkedIn</strong> — that's where I respond fastest. Those are my only messaging channels.
              </p>
            </div>

            {/* Social icons */}
            <div className="flex flex-wrap gap-3">
              {SOCIALS.map(({ Icon, href, label, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 interactive"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = `${color}15`;
                    el.style.borderColor = `${color}40`;
                    el.style.boxShadow = `0 0 16px ${color}30`;
                    el.style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = 'rgba(255,255,255,0.03)';
                    el.style.borderColor = 'rgba(255,255,255,0.07)';
                    el.style.boxShadow = 'none';
                    el.style.transform = '';
                  }}
                >
                  <Icon size={18} className="text-[var(--text-muted)] group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </BlurReveal>

          <BlurReveal delay={120}>
            <SpotlightCard
              className="p-8 rounded-2xl relative overflow-hidden"
              spotlightColor="rgba(0,240,255,0.05)"
              borderColor="rgba(0,240,255,0.2)"
              glowColor="rgba(0,240,255,0.12)"
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-[var(--neon-cyan)] via-[var(--neon-violet)] to-transparent opacity-60" />
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-accent text-[var(--text-muted)] text-xs font-bold tracking-wider uppercase">Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your full name" className="bg-[rgba(255,255,255,0.02)] border-[var(--border-glow)] text-[var(--text-primary)] focus-visible:ring-[var(--neon-cyan)] font-body py-6" {...field} />
                        </FormControl>
                        <FormMessage className="text-[var(--danger)] text-xs font-body" />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="projectType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-accent text-[var(--text-muted)] text-xs font-bold tracking-wider uppercase">Project Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-[rgba(255,255,255,0.02)] border-[var(--border-glow)] text-[var(--text-primary)] focus:ring-[var(--neon-cyan)] font-body py-6 h-auto">
                              <SelectValue placeholder="Select type..." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-[var(--bg-surface)] border-[var(--border-glow)] font-body">
                            <SelectItem value="app" className="focus:bg-[rgba(0,240,255,0.1)] focus:text-[var(--neon-cyan)] cursor-pointer">App Development</SelectItem>
                            <SelectItem value="web" className="focus:bg-[rgba(0,240,255,0.1)] focus:text-[var(--neon-cyan)] cursor-pointer">Web Development</SelectItem>
                            <SelectItem value="ai" className="focus:bg-[rgba(0,240,255,0.1)] focus:text-[var(--neon-cyan)] cursor-pointer">AI Integration</SelectItem>
                            <SelectItem value="other" className="focus:bg-[rgba(0,240,255,0.1)] focus:text-[var(--neon-cyan)] cursor-pointer">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-[var(--danger)] text-xs font-body" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-accent text-[var(--text-muted)] text-xs font-bold tracking-wider uppercase">Message</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Tell me about your vision..." className="bg-[rgba(255,255,255,0.02)] border-[var(--border-glow)] text-[var(--text-primary)] focus-visible:ring-[var(--neon-cyan)] font-body min-h-[120px] resize-none" {...field} />
                        </FormControl>
                        <FormMessage className="text-[var(--danger)] text-xs font-body" />
                      </FormItem>
                    )}
                  />

                  <MagneticButton className="w-full mt-4" variant="primary" onClick={() => {}}>
                    {isSubmitting ? (
                      <div className="w-6 h-6 border-2 border-[#04040a] border-t-transparent rounded-full animate-spin" />
                    ) : isSuccess ? (
                      <span className="text-[#04040a]">✓ WHATSAPP DRAFT OPENED</span>
                    ) : (
                      "CONTINUE ON WHATSAPP →"
                    )}
                  </MagneticButton>

                  {isSuccess && (
                    <p className="text-center text-xs font-mono text-[var(--success)] mt-3" style={{ animation: 'fadeIn 0.4s ease' }}>
                      Your WhatsApp draft is ready. Review it and press Send to message Hamza.
                    </p>
                  )}

                  <p className="text-center text-xs font-mono text-[var(--text-muted)] mt-4 opacity-60">
                    Message on →{' '}
                    <a href="https://wa.me/923129584661" target="_blank" rel="noopener noreferrer" className="text-[var(--success)] hover:underline">WhatsApp</a>
                    {' '}or{' '}
                    <a href="https://linkedin.com/in/hamzapowerplayerofficial" target="_blank" rel="noopener noreferrer" className="text-[#0A66C2] hover:underline">LinkedIn</a>
                  </p>
                </form>
              </Form>
            </SpotlightCard>
          </BlurReveal>
        </div>
      </div>
    </section>
  );
}
