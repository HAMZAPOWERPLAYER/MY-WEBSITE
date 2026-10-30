export function FloatingGeometry() {
  const shapes = [
    { type: 'square', color: 'var(--neon-cyan)', size: 60, top: '20%', left: '15%', delay: '0s', duration: '12s' },
    { type: 'triangle', color: 'var(--neon-violet)', size: 40, top: '60%', left: '80%', delay: '2s', duration: '15s' },
    { type: 'hexagon', color: 'var(--neon-cyan)', size: 80, top: '80%', left: '20%', delay: '5s', duration: '20s' },
    { type: 'square', color: 'var(--neon-violet)', size: 30, top: '15%', left: '75%', delay: '1s', duration: '10s' },
    { type: 'triangle', color: 'var(--neon-cyan)', size: 50, top: '40%', left: '5%', delay: '4s', duration: '18s' },
    { type: 'hexagon', color: 'var(--neon-violet)', size: 70, top: '30%', left: '90%', delay: '3s', duration: '16s' }
  ];

  return (
    <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden" style={{ perspective: '1000px' }}>
      {shapes.map((shape, i) => (
        <div
          key={i}
          className="absolute opacity-20"
          style={{
            top: shape.top,
            left: shape.left,
            width: `${shape.size}px`,
            height: `${shape.size}px`,
            border: `1px solid ${shape.color}`,
            borderRadius: shape.type === 'square' ? '10%' : shape.type === 'hexagon' ? '50%' : '0',
            clipPath: shape.type === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : 'none',
            animation: `float-geometry ${shape.duration} ease-in-out infinite alternate ${shape.delay}`,
            boxShadow: `0 0 15px ${shape.color}40, inset 0 0 10px ${shape.color}20`,
            transformStyle: 'preserve-3d'
          }}
        />
      ))}
      <style>{`
        @keyframes float-geometry {
          0% { transform: translateY(0) rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
          100% { transform: translateY(-50px) rotateX(180deg) rotateY(180deg) rotateZ(90deg); }
        }
      `}</style>
    </div>
  );
}
