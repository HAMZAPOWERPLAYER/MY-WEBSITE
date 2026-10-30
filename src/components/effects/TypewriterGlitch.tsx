import { useState, useEffect } from 'react';

export function TypewriterGlitch({ text, className = "" }: { text: string; className?: string }) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [glitchClass, setGlitchClass] = useState('');

  // Typing effect
  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      setDisplayedText(text.substring(0, i));
      i++;
      if (i > text.length) {
        clearInterval(typingInterval);
        setIsTyping(false);
      }
    }, 80);

    return () => clearInterval(typingInterval);
  }, [text]);

  // Glitch effect
  useEffect(() => {
    if (isTyping) return;

    const runGlitch = () => {
      setGlitchClass('translate-x-[4px] text-[var(--danger)]');
      setTimeout(() => setGlitchClass('-translate-x-[4px] text-[var(--neon-cyan)]'), 50);
      setTimeout(() => setGlitchClass('translate-x-[2px] text-[var(--neon-violet)]'), 100);
      setTimeout(() => setGlitchClass(''), 150);
      
      const nextGlitch = Math.random() * 2000 + 4000; // 4-6s
      setTimeout(runGlitch, nextGlitch);
    };

    const timeout = setTimeout(runGlitch, 4000);
    return () => clearTimeout(timeout);
  }, [isTyping]);

  return (
    <div className={`inline-block ${className} ${glitchClass} transition-colors duration-0`}>
      {displayedText}
      {isTyping && <span className="animate-pulse">_</span>}
    </div>
  );
}
