// Sau `vite build`: chép dist/index.html thành phu-sinh.html.
const fs = require('fs'), path = require('path'), root = path.join(__dirname, '..');
fs.copyFileSync(path.join(root, 'dist/index.html'), path.join(root, 'phu-sinh.html'));
console.log('phu-sinh.html', Math.round(fs.statSync(path.join(root, 'phu-sinh.html')).size / 1024) + ' KB');
