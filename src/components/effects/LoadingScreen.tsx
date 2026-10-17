import { useEffect, useState } from "react";

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [text, setText] = useState("");
  
  const fullText = "INITIALIZING SYSTEMS...";

  useEffect(() => {
    const startTime = Date.now();
    const duration = 2800; // 2.8s eased

    const animateProgress = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      
      // ease-out-quart
      const easeT = 1 - Math.pow(1 - t, 4);
      setProgress(easeT * 100);

      const charsToShow = Math.floor(easeT * fullText.length);
      setText(fullText.substring(0, charsToShow));

      if (t < 1) {
        requestAnimationFrame(animateProgress);
      } else {
        setTimeout(() => setIsComplete(true), 200);
      }
    };

    requestAnimationFrame(animateProgress);
  }, []);

  if (isComplete) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] bg-[#04040a] flex flex-col items-center justify-center transition-all duration-700 ease-in-out"
      style={{
        clipPath: isComplete ? 'polygon(0 0, 100% 0, 100% 0, 0 0)' : 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        opacity: progress === 100 ? 0 : 1
      }}
    >
      <div 
        className="font-display text-7xl font-bold text-[#f0f0ff] neon-text-glow transition-all duration-1000"
        style={{
          transform: `scale(${0.5 + (progress / 100) * 0.5})`,
          opacity: progress / 100
        }}
      >
        HP
      </div>
      
      <div className="w-64 mt-12 mb-4 h-[1px] bg-[rgba(255,255,255,0.1)] overflow-hidden">
        <div 
          className="h-full bg-[#00f0ff] shadow-[0_0_10px_#00f0ff]"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <div className="font-body text-[#6b7280] text-xs tracking-widest h-4">
        {text}
      </div>
    </div>
  );
}
