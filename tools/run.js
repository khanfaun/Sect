// Nạp phần luật chơi (không có giao diện) rồi chạy một đoạn lệnh để kiểm tra.
// Dùng: node tools/run.js "<lệnh JS>"   hoặc   node tools/run.js tệp.js
const fs = require('fs'), vm = require('vm'), path = require('path');
const root = path.join(__dirname, '..');
const ctx = vm.createContext({ console, Math, JSON, Date, performance: { now: () => Date.now() } });
for (const f of ['src/core.js', 'src/core2.js']) {
  const p = path.join(root, f);
  if (fs.existsSync(p)) vm.runInContext(fs.readFileSync(p, 'utf8'), ctx, { filename: f });
}
const arg = process.argv[2] || '';
const code = fs.existsSync(arg) ? fs.readFileSync(arg, 'utf8') : arg;
const out = vm.runInContext(code, ctx);
if (out !== undefined) console.log(typeof out === 'string' ? out : JSON.stringify(out, null, 1));
