// Ráp BẢN THỬ: phu-sinh-thu.html (cùng nội dung bản chính, khác tiêu đề).
// Dùng: python3 tools/excel2game.py && node tools/build-thu.js
const fs = require('fs'), path = require('path'), { root, html } = require('./ghep');
const out = html('Phù Sinh (bản thử)');
fs.writeFileSync(path.join(root, 'phu-sinh-thu.html'), out);
console.log('phu-sinh-thu.html', Math.round(out.length / 1024) + ' KB');
