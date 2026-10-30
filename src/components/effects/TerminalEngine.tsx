import { useEffect, useState, useRef } from 'react';

const terminalLines = [
  { text: "> Booting HAMZA POWERPLAYER OS v2.0.26 ................... [DONE]", highlights: [{ text: "[DONE]", color: "text-[var(--gold)]" }] },
  { text: "> Loading neural modules ................................. [DONE]", highlights: [{ text: "[DONE]", color: "text-[var(--gold)]" }] },
  { text: "> Scanning project database .............................. [DONE]", highlights: [{ text: "[DONE]", color: "text-[var(--gold)]" }] },
  { text: "> AI systems: ONLINE", highlights: [{ text: "ONLINE", color: "text-[var(--neon-cyan)]" }] },
  { text: "> App engine: ONLINE", highlights: [{ text: "ONLINE", color: "text-[var(--neon-cyan)]" }] },
  { text: "> Creative core: OVERCLOCKED", highlights: [{ text: "OVERCLOCKED", color: "text-[var(--danger)]" }] },
  { text: "> Status: BUILDING THE FUTURE", highlights: [{ text: "BUILDING THE FUTURE", color: "text-[var(--danger)]" }] },
  { text: "> Welcome. You are now inside the mind of HAMZA POWERPLAYER.", highlights: [] }
];

export function TerminalEngine() {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;
    if (currentLineIndex >= terminalLines.length) return;

    const currentFullLine = terminalLines[currentLineIndex].text;

    if (currentCharIndex < currentFullLine.length) {
      const timeout = setTimeout(() => {
        const newLineText = currentFullLine.substring(0, currentCharIndex + 1);
        setDisplayedLines(prev => {
          const newLines = [...prev];
          newLines[currentLineIndex] = newLineText;
          return newLines;
        });
        setCurrentCharIndex(prev => prev + 1);
      }, 30);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setCurrentLineIndex(prev => prev + 1);
        setCurrentCharIndex(0);
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [isVisible, currentLineIndex, currentCharIndex]);

  const renderLine = (line: string, index: number) => {
    if (!line) return null;
    const config = terminalLines[index];
    
    // Simple highlighting logic (assumes highlight text appears only once per line)
    let renderedLine = <>{line}</>;
    
    if (config.highlights.length > 0 && line === config.text) {
      let tempLine = line;
      const elements: React.ReactNode[] = [];
      
      config.highlights.forEach(highlight => {
        const idx = tempLine.indexOf(highlight.text);
        if (idx !== -1) {
          elements.push(<span key="1">{tempLine.substring(0, idx)}</span>);
          elements.push(<span key="2" className={highlight.color}>{highlight.text}</span>);
          elements.push(<span key="3">{tempLine.substring(idx + highlight.text.length)}</span>);
          renderedLine = <>{elements}</>;
        }
      });
    }

    return (
      <div key={index} className="mb-2">
        {renderedLine}
        {index === currentLineIndex && <span className="animate-pulse">▋</span>}
      </div>
    );
  };

  return (
    <div ref={containerRef} className="w-full rounded-xl overflow-hidden border border-[var(--border-glow)] bg-[#060610] shadow-[0_0_30px_rgba(0,240,255,0.05)] relative group">
      {/* Fake Chrome */}
      <div className="flex items-center px-4 py-3 bg-[rgba(255,255,255,0.03)] border-b border-[var(--border-glow)]">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[var(--danger)]"></div>
          <div className="w-3 h-3 rounded-full bg-[var(--gold)]"></div>
          <div className="w-3 h-3 rounded-full bg-[var(--success)]"></div>
        </div>
        <div className="mx-auto text-xs font-accent text-[var(--text-muted)]">sys_console.exe</div>
      </div>
      
      {/* Terminal Content */}
      <div className="p-6 font-body text-sm md:text-base text-[#a0a0b0] relative">
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(0,240,255,0.03)_1px,transparent_1px)] bg-[size:100%_4px]"></div>
        
        {/* Scanline */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="w-full h-10 bg-gradient-to-b from-transparent via-[rgba(0,240,255,0.05)] to-transparent opacity-50 translate-y-[-100%] animate-[scanline_8s_linear_infinite]"></div>
        </div>
        
        <div className="relative z-10 min-h-[280px]">
          {displayedLines.map((line, i) => renderLine(line, i))}
          {currentLineIndex >= terminalLines.length && (
            <div className="mt-2"><span className="animate-pulse">▋</span></div>
          )}
        </div>
      </div>
    </div>
  );
}
