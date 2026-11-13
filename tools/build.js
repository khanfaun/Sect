// Ráp src/game/ thành tệp phu-sinh.html duy nhất (không cần cài gì thêm).
// Dùng: node tools/build.js   (hoặc: npm run build — qua Vite, ra cùng kết quả)
const fs = require('fs'), path = require('path'), { root, html } = require('./ghep');
const out = html();
fs.writeFileSync(path.join(root, 'phu-sinh.html'), out);
console.log('phu-sinh.html', Math.round(out.length / 1024) + ' KB');
