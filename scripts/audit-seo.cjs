const fs = require('fs');
const path = require('path');
const dir = path.join(process.cwd(), 'src', 'pages');
for (const f of fs.readdirSync(dir)) {
  if (!f.endsWith('.tsx')) continue;
  const t = fs.readFileSync(path.join(dir, f), 'utf8');
  const m = t.match(/title="([^"]*)"/);
  const d = t.match(/description="([^"]*)"/);
  if (m) console.log(f, '| T(' + m[1].length + ')', m[1]);
  if (d) console.log('    | D(' + d[1].length + ')', d[1]);
}
