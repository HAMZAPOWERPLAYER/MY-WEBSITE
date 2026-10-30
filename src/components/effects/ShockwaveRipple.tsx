import { useEffect } from 'react';

interface Ripple {
  id: number; x: number; y: number; isButton: boolean;
}

let rippleCount = 0;

function createRipple(x: number, y: number, isButton: boolean) {
  const el = document.createElement('div');
  el.className = 'shockwave-ripple';
  el.style.cssText = `
    position: fixed;
    left: ${x}px;
    top: ${y}px;
    width: 0;
    height: 0;
    border: 2px solid rgba(0,240,255,0.7);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
    z-index: 9999;
    animation: shockwave 0.8s ease-out forwards;
  `;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 900);

  if (isButton) {
    setTimeout(() => {
      const el2 = document.createElement('div');
      el2.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 0;
        height: 0;
        border: 2px solid rgba(245,197,24,0.7);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        pointer-events: none;
        z-index: 9999;
        animation: shockwave 0.8s ease-out forwards;
      `;
      document.body.appendChild(el2);
      setTimeout(() => el2.remove(), 900);
    }, 100);
  }

  // Canvas burst particles
  const canvas = document.createElement('canvas');
  canvas.width = 200;
  canvas.height = 200;
  canvas.style.cssText = `
    position: fixed;
    left: ${x - 100}px;
    top: ${y - 100}px;
    pointer-events: none;
    z-index: 9998;
  `;
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d')!;

  const particles = Array.from({ length: 12 }, (_, i) => {
    const angle = (i / 12) * Math.PI * 2;
    const speed = 2 + Math.random() * 2.5;
    return {
      x: 100, y: 100,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      alpha: 1,
      color: isButton ? '#f5c518' : '#00f0ff',
    };
  });

  let start: number | null = null;
  function drawBurst(ts: number) {
    if (!start) start = ts;
    const elapsed = (ts - start) / 1000;
    ctx.clearRect(0, 0, 200, 200);
    let alive = false;
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.92;
      p.vy *= 0.92;
      p.alpha = Math.max(0, 1 - elapsed / 0.5);
      if (p.alpha > 0) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace(')', `,${p.alpha})`).replace('rgb', 'rgba').replace('#f5c518', `rgba(245,197,24,${p.alpha})`).replace('#00f0ff', `rgba(0,240,255,${p.alpha})`);
        // simpler approach:
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.fill();
        ctx.globalAlpha = 1;
        alive = true;
      }
    }
    if (alive) requestAnimationFrame(drawBurst);
    else canvas.remove();
  }
  requestAnimationFrame(drawBurst);
}

export function ShockwaveRipple() {
  useEffect(() => {
    const handle = (e: MouseEvent | TouchEvent) => {
      let x: number, y: number;
      if (e instanceof TouchEvent) {
        x = e.touches[0]?.clientX ?? 0;
        y = e.touches[0]?.clientY ?? 0;
      } else {
        x = e.clientX;
        y = e.clientY;
      }
      const target = e.target as HTMLElement;
      const isBtn = target.closest('button') !== null || target.closest('[role="button"]') !== null || target.closest('a') !== null;
      createRipple(x, y, isBtn);
    };

    window.addEventListener('click', handle);
    window.addEventListener('touchstart', handle, { passive: true });
    return () => {
      window.removeEventListener('click', handle);
      window.removeEventListener('touchstart', handle);
    };
  }, []);

  return null;
}
