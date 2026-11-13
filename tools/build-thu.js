// Ráp BẢN THỬ có dữ liệu từ Excel: phu-sinh-thu.html. Bản chơi chính phu-sinh.html không bị đụng tới.
// Dùng: python3 tools/excel2game.py && node tools/build-thu.js
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..'), rd = f => fs.readFileSync(path.join(root, f), 'utf8');
const js = ['src/core.js', 'src/core2.js', 'src/data/catalog.js', 'src/catalog.js', 'src/data/su_kien.js', 'src/su_kien.js', 'src/ui/base.js', 'src/ui/assets.js', 'src/ui/gfx.js', 'src/ui/views.js', 'src/ui/combat.js', 'src/ui/fx.js', 'src/ui/panels.js', 'src/ui/screens.js', 'src/ui/main.js'];
const script = js.map(rd).join('\n');
if (script.includes('</script')) throw new Error('mã chứa thẻ đóng script');
const out = rd('src/index.html').replace('<title>Phù Sinh</title>', '<title>Phù Sinh (bản thử)</title>')
  .replace('/*STYLE*/', () => rd('src/style.css')).replace('/*SCRIPT*/', () => script);
fs.writeFileSync(path.join(root, 'phu-sinh-thu.html'), out);
console.log('phu-sinh-thu.html', Math.round(out.length / 1024) + ' KB');
