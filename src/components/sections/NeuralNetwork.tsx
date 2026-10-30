import { useEffect, useRef } from 'react';
import { ScrollReveal } from '../effects/ScrollReveal';
import { NeonLabel } from '../effects/NeonLabel';

const LAYERS = [
  ['PROBLEM', 'IDEA', 'DATA', 'USER', 'VISION'],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', ''],
  ['APP', 'AI TOOL', 'WEB', 'SOLUTION'],
];

const LAYER_SIZES = [5, 8, 8, 6, 4];

export function NeuralNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvasRefValue = canvasRef.current;
    if (!canvasRefValue) return;
    const canvas: HTMLCanvasElement = canvasRefValue;
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!;

    function resize() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const W = () => canvas.width;
    const H = () => canvas.height;

    type NodeCoord = { x: number; y: number; lit: number; pulseTime: number };
    type Pulse = { fromLayer: number; fromNode: number; toNode: number; progress: number; color: string };

    function buildNodes(): NodeCoord[][] {
      const layerCount = LAYER_SIZES.length;
      const lxStep = W() / (layerCount + 1);
      return LAYER_SIZES.map((count, li) => {
        const lx = lxStep * (li + 1);
        const yStep = H() / (count + 1);
        return Array.from({ length: count }, (_, ni) => ({
          x: lx, y: yStep * (ni + 1), lit: 0, pulseTime: 0,
        }));
      });
    }

    let nodes = buildNodes();
    let pulses: Pulse[] = [];
    let activeInput = 0;
    let inputTimer = 0;
    const COLORS = ['#00f0ff', '#7c3aed', '#f5c518', '#00ff88', '#ff6030'];

    function spawnPulses(fromLayer: number) {
      if (fromLayer >= LAYER_SIZES.length - 1) return;
      const fromCount = LAYER_SIZES[fromLayer];
      const toCount = LAYER_SIZES[fromLayer + 1];
      for (let i = 0; i < fromCount; i++) {
        for (let j = 0; j < toCount; j++) {
          if (Math.random() < 0.4) {
            pulses.push({
              fromLayer, fromNode: i, toNode: j,
              progress: 0,
              color: COLORS[fromLayer % COLORS.length],
            });
          }
        }
      }
    }

    let t = 0;
    function draw() {
      ctx.clearRect(0, 0, W(), H());
      t++;
      nodes = buildNodes();

      inputTimer++;
      if (inputTimer > 60) {
        inputTimer = 0;
        activeInput = (activeInput + 1) % LAYER_SIZES[0];
        nodes[0][activeInput].lit = 1;
        spawnPulses(0);
      }

      // connections
      for (let li = 0; li < nodes.length - 1; li++) {
        for (let ni = 0; ni < nodes[li].length; ni++) {
          for (let nj = 0; nj < nodes[li + 1].length; nj++) {
            const { x: x1, y: y1 } = nodes[li][ni];
            const { x: x2, y: y2 } = nodes[li + 1][nj];
            ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2);
            ctx.strokeStyle = 'rgba(0,240,255,0.04)'; ctx.lineWidth = 0.5; ctx.stroke();
          }
        }
      }

      // pulses
      pulses.forEach(p => {
        p.progress += 0.015;
        if (p.progress >= 1) {
          // activate next layer
          if (p.fromLayer + 1 < nodes.length) {
            nodes[p.fromLayer + 1][p.toNode % LAYER_SIZES[p.fromLayer + 1]].lit = 1;
          }
          if (p.fromLayer + 1 < nodes.length - 1) {
            spawnPulses(p.fromLayer + 1);
          }
          return;
        }
        const n1 = nodes[p.fromLayer][p.fromNode % LAYER_SIZES[p.fromLayer]];
        const n2 = nodes[p.fromLayer + 1][p.toNode % LAYER_SIZES[p.fromLayer + 1]];
        const px = n1.x + (n2.x - n1.x) * p.progress;
        const py = n1.y + (n2.y - n1.y) * p.progress;

        // line segment from start to pulse
        ctx.beginPath(); ctx.moveTo(n1.x, n1.y); ctx.lineTo(px, py);
        ctx.strokeStyle = p.color + '66'; ctx.lineWidth = 1; ctx.stroke();

        ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2);
        const grd = ctx.createRadialGradient(px, py, 0, px, py, 4);
        grd.addColorStop(0, p.color); grd.addColorStop(1, 'transparent');
        ctx.fillStyle = grd; ctx.fill();
      });
      pulses = pulses.filter(p => p.progress < 1);

      // nodes
      nodes.forEach((layer, li) => {
        layer.forEach((node, ni) => {
          if (node.lit > 0) node.lit = Math.max(0, node.lit - 0.02);
          const r = li === 0 || li === nodes.length - 1 ? 14 : 10;
          const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, r * 2.5);
          const c = li === 0 ? '#00f0ff' : li === nodes.length - 1 ? '#f5c518' : '#7c3aed';
          const alpha = 0.3 + node.lit * 0.7;
          glow.addColorStop(0, c + Math.floor(alpha * 255).toString(16).padStart(2, '0'));
          glow.addColorStop(1, 'transparent');
          ctx.beginPath(); ctx.arc(node.x, node.y, r * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = glow; ctx.fill();

          ctx.beginPath(); ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(8,8,26,${0.8 + node.lit * 0.2})`;
          ctx.fill();
          ctx.strokeStyle = c + Math.floor((0.5 + node.lit * 0.5) * 255).toString(16).padStart(2, '0');
          ctx.lineWidth = 1.5; ctx.stroke();

          const label = LAYERS[li][ni];
          if (label) {
            ctx.font = `${li === 0 || li === 4 ? 10 : 8}px IBM Plex Mono, monospace`;
            ctx.fillStyle = `rgba(240,240,255,${0.6 + node.lit * 0.4})`;
            ctx.textAlign = li === 0 ? 'right' : li === nodes.length - 1 ? 'left' : 'center';
            const tx = li === 0 ? node.x - r - 6 : li === nodes.length - 1 ? node.x + r + 6 : node.x;
            const ty = li === 0 || li === nodes.length - 1 ? node.y + 4 : node.y + r + 14;
            ctx.fillText(label, tx, ty);
          }
        });
      });

      rafRef.current = requestAnimationFrame(draw);
    }

    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) draw();
      else cancelAnimationFrame(rafRef.current);
    }, { threshold: 0.1 });
    observer.observe(canvas);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      observer.disconnect();
    };
  }, []);

  return (
    <section id="neural" className="relative py-24">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <NeonLabel>NEURAL CORE</NeonLabel>
          <h2 className="font-display font-black text-4xl md:text-5xl mb-4">
            <span className="holo-text">How I Think</span>
          </h2>
        </ScrollReveal>
        <div className="relative rounded-2xl overflow-hidden"
          style={{ border: '1px solid rgba(0,240,255,0.1)', background: 'rgba(4,4,10,0.8)' }}>
          <canvas ref={canvasRef} className="w-full" style={{ height: 600, display: 'block' }} />
        </div>
        <ScrollReveal>
          <p className="text-center text-[var(--text-muted)] font-mono text-sm mt-6 italic">
            Every problem enters the network. A solution always exits.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
