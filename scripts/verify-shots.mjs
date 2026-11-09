/*
 * CDP-driven scroll-and-screenshot verification.
 * Launches headless Chrome, loads the site with REAL time (no virtual-time
 * shortcuts), scrolls section by section, and captures a screenshot of each
 * — the same pass a human reviewer would do, at exact viewport sizes.
 *
 * Usage: node scripts/verify-shots.mjs <width> <height>
 */
import { spawn } from 'node:child_process';
import { mkdtempSync, mkdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const [WIDTH = '1440', HEIGHT = '900'] = process.argv.slice(2);
const OUT_DIR = join(process.cwd(), '.verify-shots');
mkdirSync(OUT_DIR, { recursive: true });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const profile = mkdtempSync(join(tmpdir(), 'cdp-verify-'));
const chrome = spawn(CHROME, [
  '--headless=new',
  '--disable-gpu',
  '--hide-scrollbars',
  '--force-device-scale-factor=1',
  `--remote-debugging-port=0`,
  `--user-data-dir=${profile}`,
  `--window-size=${WIDTH},${HEIGHT}`,
  'about:blank',
], { stdio: 'ignore' });

// Wait for the DevTools endpoint, then read the chosen port.
let targets = null;
for (let i = 0; i < 60; i++) {
  await sleep(250);
  try {
    const res = await fetch('http://127.0.0.1:0/json/version');
    if (res.ok) { targets = true; break; }
  } catch { /* port 0 is symbolic — parse DevToolsActivePort instead */ }
  const portFile = join(profile, 'DevToolsActivePort');
  try {
    const [port] = (await import('node:fs')).readFileSync(portFile, 'utf8').split('\n');
    if (port) {
      const res = await fetch(`http://127.0.0.1:${port}/json/version`);
      if (res.ok) { globalThis.__cdpPort = port; targets = true; break; }
    }
  } catch { /* retry */ }
}
const port = globalThis.__cdpPort;
if (!port) { console.error('CDP endpoint never came up'); chrome.kill(); process.exit(1); }

const list = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
const page = list.find((t) => t.type === 'page');
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });

let msgId = 0;
const pending = new Map();
ws.onmessage = (ev) => {
  const msg = JSON.parse(ev.data);
  if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg); pending.delete(msg.id); }
};
const send = (method, params = {}) => new Promise((res) => {
  const id = ++msgId;
  pending.set(id, res);
  ws.send(JSON.stringify({ id, method, params }));
});
const evalJs = async (expression) => {
  const r = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
  return r.result?.result?.value;
};

await send('Page.enable');
await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride', {
  width: Number(WIDTH), height: Number(HEIGHT), deviceScaleFactor: 1, mobile: WIDTH === '390',
});

await send('Page.navigate', { url: 'http://localhost:5000/' });
await sleep(3200); // load + hydration + fonts

const SECTIONS = ['top', 'work', 'services', 'tech', 'numbers', 'building', 'collaborations', 'about', 'contact'];
const results = [];
for (const id of SECTIONS) {
  const scroll = id === 'top'
    ? `window.scrollTo({ top: 0, behavior: 'instant' }); 'scrolled'`
    : `(() => { const el = document.getElementById('${id}'); if (!el) return 'MISSING'; window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 70, behavior: 'instant' }); return 'scrolled'; })()`;
  const status = await evalJs(scroll);
  await sleep(1700); // reveals (≤0.85s) + 1500ms safety net fully settle
  const shot = await send('Page.captureScreenshot', { format: 'png' });
  const file = join(OUT_DIR, `cdp-${WIDTH}-${id}.png`);
  writeFileSync(file, Buffer.from(shot.result.data, 'base64'));
  // DOM truth for this scroll position: any content in view still hidden?
  const audit = await evalJs(`(() => {
    const cs = (el) => getComputedStyle(el);
    const hidden = [...document.querySelectorAll('main *')].filter((el) => {
      const r = el.getBoundingClientRect();
      if (r.height < 4 || r.width < 4) return false;
      if (r.bottom < 0 || r.top > innerHeight) return false;
      const o = Number(cs(el).opacity);
      return o < 0.999 && !el.className.toString().includes('pointer-events-none') && !el.className.toString().includes('hp-glare');
    });
    return { scrollY: Math.round(scrollY), hiddenInView: hidden.length, sample: hidden.slice(0, 4).map((el) => el.tagName + '.' + String(el.className).split(' ')[0]) };
  })()`);
  results.push({ section: id, status, file, ...audit });
}

console.log(JSON.stringify(results, null, 1));
chrome.kill();
process.exit(0);
