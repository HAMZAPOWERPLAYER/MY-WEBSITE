export function MarqueeTicker() {
  const text = "APP DEVELOPER  ·  AI BUILDER  ·  FUTURE FOUNDER  ·  CREATIVE TECHNOLOGIST  ·  PRODUCT BUILDER  ·  PROBLEM SOLVER  ·  ";
  
  return (
    <div className="w-full h-12 flex items-center overflow-hidden border-y border-[var(--border-glow)] bg-transparent">
      <div className="marquee-track font-accent text-xs tracking-[4px] uppercase text-[var(--text-muted)]">
        {[...Array(3)].map((_, i) => (
          <span key={i} className="flex whitespace-nowrap">
            {text.split('·').map((part, j, arr) => (
              <span key={j} className="flex items-center">
                {part}
                {j < arr.length - 1 && <span className="text-[var(--neon-cyan)] mx-2">·</span>}
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}
