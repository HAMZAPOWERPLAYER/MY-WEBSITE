import { useEffect, useRef, useState } from 'react';

interface Message {
  role: 'user' | 'ai';
  text: string;
  ts: number;
}

const RESPONSES: [string[], string][] = [
  [['hello','hi','hey','salam','sup','assalam'],
    "Hey! Welcome to HAMZA POWERPLAYER's portfolio. I'm here to help you explore his work, skills, and projects. What would you like to know? 🚀"],
  [['who','hamza','about','developer','builder'],
    "This portfolio brings together published Android apps, The Last Bell horror game, public software repositories, and game projects in development. Open the apps, projects, and games pages to see the confirmed details."],
  [['skill','can do','what do','expertise','specializ'],
    "The public projects page lists the programming languages reported by GitHub for each repository. I can't verify a complete skills list from the information on this site."],
  [['hire','work together','collab','commission','start a project'],
    "For project inquiries, message Hamza on WhatsApp or LinkedIn. No public rates or delivery timelines are listed here."],
  [['price','rate','cost','budget','how much'],
    "There are no verified public rates on this site. Send the project requirements through WhatsApp or LinkedIn to discuss scope."],
  [['app','apps','portfolio','ship','built','work'],
    "Verified Google Play listings in this portfolio include PakiGPA, SubSight, and The Last Bell. Other public repositories and unreleased game projects are shown separately in Projects and Games."],
  [['contact','reach','message','talk','email'],
    "Message Hamza on WhatsApp at wa.me/923129584661 or through LinkedIn at linkedin.com/in/hamzapowerplayerofficial. The portfolio does not offer email contact."],
  [['pakistan','pakistani'],
    "The portfolio lists Pakistan as Hamza's location. For confirmed work and public repositories, see the Projects page."],

  [['ai','artificial intelligence','gpt','llm','machine learning','claude','gemini'],
    "This site doesn't verify specific AI model integrations or shipped AI products. Send a message on WhatsApp or LinkedIn to discuss a project requirement."],
  [['secret','konami','easter egg','hidden','hack'],
    "👀 I see you're curious about secrets... Let's just say if you know the right sequence on your keyboard, interesting things happen. ↑↑↓↓... I've said too much. 🤫"],
  [['rocket','launch','space'],
    "Oh you found it! Hit that 🚀 LAUNCH SEQUENCE button in the hero section for a full cinematic experience. Hamza built that himself — pure canvas, no libraries. 🎬"],
  [['cv','resume','download'],
    "If you need a CV, use the download button shown on the site. The public Projects page also links directly to source repositories."],
  [['community','discord','youtube','telegram','follow'],
    "Use the Links page to find public profiles. WhatsApp and LinkedIn are the only contact channels listed here."],
];

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  for (const [keywords, response] of RESPONSES) {
    if (keywords.some(k => lower.includes(k))) return response;
  }
  return "I can only confirm details shown on this portfolio. Browse Apps, Games, Projects, or Links, or contact Hamza on WhatsApp or LinkedIn.";
}

function timeAgo(ts: number): string {
  const diff = Math.floor((Date.now() - ts) / 1000);
  if (diff < 5) return 'just now';
  if (diff < 60) return `${diff}s ago`;
  return `${Math.floor(diff / 60)}m ago`;
}

export function HamzaAI() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{
    role: 'ai',
    text: "Hey! I'm HAMZA AI — your guide to this portfolio. Ask me anything about Hamza's work, skills, or projects! 🚀",
    ts: Date.now(),
  }]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [showBadge, setShowBadge] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setShowBadge(true), 30000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (showBadge && open) setShowBadge(false);
  }, [open, showBadge]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typing]);

  function send() {
    const text = input.trim();
    if (!text) return;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text, ts: Date.now() }]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages(prev => [...prev, { role: 'ai', text: getResponse(text), ts: Date.now() }]);
    }, 500 + Math.random() * 600);
  }

  return (
    <>
      {/* Floating button */}
      <div className="fixed bottom-6 right-6 z-[9000] flex flex-col items-end gap-2">
        {showBadge && !open && (
          <div className="bg-[var(--neon-cyan)] text-[#04040a] text-xs font-bold px-3 py-1.5 rounded-full"
            style={{ animation: 'badge-bounce 0.6s ease infinite alternate', whiteSpace: 'nowrap' }}>
            Say Hello →
          </div>
        )}
        <button
          onClick={() => { setOpen(o => !o); setShowBadge(false); }}
          className="relative w-16 h-16 rounded-full flex items-center justify-center font-display font-black text-[var(--bg-base)] text-sm transition-transform hover:scale-110"
          style={{
            background: 'conic-gradient(from var(--angle,0deg), #00f0ff, #7c3aed, #f5c518, #00f0ff)',
            animation: 'conic-spin 3s linear infinite, ai-pulse 3s ease-in-out infinite',
            boxShadow: '0 0 20px rgba(0,240,255,0.4)',
          }}
          aria-label="Open HAMZA AI chat"
        >
          <span style={{ textShadow: 'none', color: '#fff', fontSize: '14px', fontFamily: 'Orbitron' }}>AI</span>
        </button>
      </div>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-28 right-6 z-[9000] w-[380px] max-w-[calc(100vw-3rem)] rounded-2xl overflow-hidden"
          style={{
            background: 'rgba(8,8,26,0.95)',
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(0,240,255,0.3)',
            boxShadow: '0 0 40px rgba(0,240,255,0.15), 0 20px 60px rgba(0,0,0,0.6)',
            animation: 'slide-up 0.3s cubic-bezier(0.34,1.56,0.64,1)',
          }}>
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-[rgba(0,240,255,0.15)]">
            <div>
              <div className="font-display font-black text-[var(--neon-cyan)] text-base tracking-wider">HAMZA AI</div>
              <div className="text-[10px] text-[var(--text-muted)] font-mono mt-0.5">Powered by intelligence</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[var(--success)]" style={{ animation: 'ai-pulse 1.5s ease infinite' }} />
                <span className="text-[10px] font-mono text-[var(--success)]">ONLINE</span>
              </div>
              <button onClick={() => setOpen(false)} className="w-7 h-7 flex items-center justify-center rounded-full text-[var(--text-muted)] hover:text-white hover:bg-white/10 transition-colors text-sm">×</button>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="h-[360px] overflow-y-auto px-4 py-4 space-y-3 scrollbar-thin">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                style={{ animation: 'msg-in 0.3s ease' }}>
                <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                  msg.role === 'user'
                    ? 'bg-[rgba(0,240,255,0.15)] border border-[rgba(0,240,255,0.3)] text-[var(--neon-cyan)]'
                    : 'bg-[rgba(124,58,237,0.15)] border border-[rgba(124,58,237,0.3)] text-[var(--text-primary)]'
                }`}>
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                  <p className="text-[10px] mt-1 opacity-50 font-mono">{timeAgo(msg.ts)}</p>
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start" style={{ animation: 'msg-in 0.3s ease' }}>
                <div className="bg-[rgba(124,58,237,0.15)] border border-[rgba(124,58,237,0.3)] rounded-2xl px-4 py-3">
                  <div className="flex gap-1">
                    {[0,1,2].map(i => (
                      <div key={i} className="w-2 h-2 rounded-full bg-[var(--neon-violet)]"
                        style={{ animation: `typing-dot 1s ease ${i * 0.2}s infinite` }} />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="px-4 py-3 border-t border-[rgba(0,240,255,0.1)] flex gap-2">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder="Ask me anything..."
              className="flex-1 bg-[rgba(255,255,255,0.05)] rounded-xl px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] border border-[rgba(0,240,255,0.1)] focus:outline-none focus:border-[var(--neon-cyan)]"
            />
            <button onClick={send}
              className="px-4 py-2.5 rounded-xl bg-[var(--neon-cyan)] text-[#04040a] font-bold text-sm hover:brightness-110 transition-all">
              ↑
            </button>
          </div>
        </div>
      )}
    </>
  );
}
