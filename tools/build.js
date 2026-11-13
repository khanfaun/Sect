// Ráp src/ thành tệp phu-sinh.html duy nhất (qua Vite, gồm cả phần React).
// Dùng: node tools/build.js   hoặc   npm run build
const fs = require('fs'), path = require('path'), { execSync } = require('child_process');
const root = path.join(__dirname, '..');
const out = process.argv[2] || 'phu-sinh.html';
execSync('npx vite build --logLevel warn', { cwd: root, stdio: 'inherit' });
fs.copyFileSync(path.join(root, 'dist/index.html'), path.join(root, out));
console.log(out, Math.round(fs.statSync(path.join(root, out)).size / 1024) + ' KB');
