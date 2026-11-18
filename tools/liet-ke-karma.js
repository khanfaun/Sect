// Liệt kê mọi chỗ `karma` trong sự kiện (content/events/manifest.json) ra CSV.
// Chạy: node tools/liet-ke-karma.js  →  docs/thiet-ke/karma-su-kien.csv
// Cột: id, đường_dẫn_lựa_chọn, giá_trị_karma, nhãn_lựa_chọn
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'docs/thiet-ke/karma-su-kien.csv');

const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, 'content/events/manifest.json'), 'utf8'));
const rows = [];

// Duyệt đệ quy; ghi lại đường dẫn và nhãn của lựa chọn (choices[i].l) đang bao quanh.
function walk(node, p, eventId, label, file) {
  if (Array.isArray(node)) {
    node.forEach((v, i) => {
      // Phần tử của mảng "choices" mang nhãn lựa chọn riêng.
      const lb = /(^|\.)choices$/.test(p) && v && v.l ? v.l : label;
      walk(v, p + '[' + i + ']', eventId, lb, file);
    });
    return;
  }
  if (!node || typeof node !== 'object') return;
  for (const k of Object.keys(node)) {
    const v = node[k];
    const childPath = p ? p + '.' + k : k;
    if (k === 'karma') {
      rows.push([eventId, childPath, v, label]);
    }
    walk(v, childPath, eventId, label, file);
  }
}

for (const file of manifest.files) {
  if (!file.startsWith('content/events/')) continue;
  const data = JSON.parse(fs.readFileSync(path.join(ROOT, file), 'utf8'));
  for (const ev of data.events || []) {
    walk(ev, '', ev.id, '', file);
  }
}

function csvCell(x) {
  const s = String(x == null ? '' : x);
  return /[",\n\r]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
}

const header = ['id', 'đường_dẫn_lựa_chọn', 'giá_trị_karma', 'nhãn_lựa_chọn'];
const lines = [header.join(',')];
for (const r of rows) lines.push(r.map(csvCell).join(','));
fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, lines.join('\n') + '\n', 'utf8');
console.log('Đã ghi ' + rows.length + ' dòng karma vào ' + path.relative(ROOT, OUT));
