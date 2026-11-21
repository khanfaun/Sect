// Đ7.1: liệt kê từ vựng hiệu ứng chiêu (fx).
// In (1) mọi khoá fx đang có trong SK_RAW (content/items/sk-raw.js) cùng số lần dùng,
//    (2) mọi khoá mà máy chiến đấu đọc (f.x / sk.fx.x trong các tệp trận), đánh dấu khoá chưa chiêu nào dùng
//        hoặc chiêu có mà máy không đọc.
// Dùng: node tools/liet-ke-fx.js
const fs = require('fs'), path = require('path'), vm = require('vm');
const ROOT = path.join(__dirname, '..');
const ctx = vm.createContext({});
vm.runInContext(fs.readFileSync(path.join(ROOT, 'content/items/sk-raw.js'), 'utf8') + ';this.SK_RAW=SK_RAW;', ctx);
const used = {};
for (const s of ctx.SK_RAW) for (const k of Object.keys(s[5] || {})) used[k] = (used[k] || 0) + 1;
const FILES = ['src/game/core/07-vong-lap-tran.js', 'src/game/core/06-su-kien.js', 'src/game/core/05-thoi-gian-the-gioi.js',
  'src/game/core2/06-thieu-dot-tho-nguyen.js', 'src/game/core2/41-vo-dao.js', 'src/game/core2/50-fx-moi.js'];
const read = {};
for (const f of FILES) {
  const p = path.join(ROOT, f); if (!fs.existsSync(p)) continue;
  const src = fs.readFileSync(p, 'utf8');
  for (const m of src.matchAll(/\b(?:f|sk\.fx|base\.fx)\.([a-zA-Z_]+)/g)) (read[m[1]] = read[m[1]] || new Set()).add(path.basename(f));
}
const NOT_FX = new Set(['classList', 'offsetWidth', 'name', 'length', 'indexOf', 'split', 'sel', 'until', 'flag', 'die', 'life', 'tam', 'wound', 'hpP', 'elX', 'ngheDown']);
console.log('== Khoá fx trong SK_RAW (' + ctx.SK_RAW.length + ' chiêu) ==');
for (const [k, n] of Object.entries(used).sort((a, b) => b[1] - a[1])) console.log(k.padEnd(14), String(n).padStart(4), read[k] ? '' : '  ⚠ máy trận không đọc');
console.log('\n== Khoá máy trận đọc ==');
for (const k of Object.keys(read).filter(k => !NOT_FX.has(k)).sort()) console.log(k.padEnd(14), [...read[k]].join(', '), used[k] ? '' : '  (chưa chiêu nào trong SK_RAW dùng)');
