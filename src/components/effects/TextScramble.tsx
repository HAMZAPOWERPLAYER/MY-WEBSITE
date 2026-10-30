import { useEffect, useState } from 'react';

const POOL = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%";

export function TextScramble({ text, trigger, className = "" }: { text: string, trigger: boolean, className?: string }) {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    if (!trigger) return;

    let iteration = 0;
    const maxIterations = text.length;
    let interval: NodeJS.Timeout;

    const updateText = () => {
      setDisplayText(prev => {
        return text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) return text[index];
            return POOL[Math.floor(Math.random() * POOL.length)];
          })
          .join("");
      });

      if (iteration >= maxIterations) {
        clearInterval(interval);
      }
      
      iteration += 1 / 3; // 3 ticks per char
    };

    interval = setInterval(updateText, 30);

    return () => clearInterval(interval);
  }, [text, trigger]);

  return <span className={className}>{displayText}</span>;
}
