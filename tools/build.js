// Ráp các tệp trong src/ thành một tệp phu-sinh.html duy nhất, không cần thư viện ngoài.
// Dùng: node tools/build.js
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..'), rd = f => fs.readFileSync(path.join(root, f), 'utf8');
const js = ['src/core.js', 'src/core2.js', 'src/ui/base.js', 'src/ui/gfx.js', 'src/ui/views.js', 'src/ui/combat.js', 'src/ui/panels.js', 'src/ui/screens.js', 'src/ui/main.js'];
const script = js.map(rd).join('\n');
if (script.includes('</script')) throw new Error('mã chứa thẻ đóng script');
const out = rd('src/index.html').replace('/*STYLE*/', () => rd('src/style.css')).replace('/*SCRIPT*/', () => script);
fs.writeFileSync(path.join(root, 'phu-sinh.html'), out);
console.log('phu-sinh.html', Math.round(out.length / 1024) + ' KB');
