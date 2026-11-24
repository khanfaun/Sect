// Ráp src/ thành tệp phu-sinh.html duy nhất (qua Vite, gồm cả phần React).
// Dùng: node tools/build.js   hoặc   npm run build
const fs = require('fs'), path = require('path'), { execSync } = require('child_process');
const root = path.join(__dirname, '..');
require('./content-build').buildContent();
const out = process.argv[2] || 'phu-sinh.html';
execSync('npx vite build --logLevel warn', { cwd: root, stdio: 'inherit' });
fs.writeFileSync(path.join(root,out),fs.readFileSync(path.join(root,'dist/index.html'),'utf8').replace(/^[ \t]+$/gm,''));
// ảnh nhân vật để ngoài trang: chép src/assets/nv -> anh-nv/ cạnh tệp html
{const src=path.join(root,'src/assets/nv'),dst=path.join(root,path.dirname(out),'anh-nv');fs.mkdirSync(dst,{recursive:true});
 const co=new Set(fs.readdirSync(src));for(const f of fs.readdirSync(dst))if(!co.has(f))fs.unlinkSync(path.join(dst,f));
 for(const f of co){const a=path.join(src,f),b=path.join(dst,f);if(!fs.existsSync(b)||fs.statSync(b).mtimeMs<fs.statSync(a).mtimeMs)fs.copyFileSync(a,b);}
 console.log('anh-nv/', co.size, 'ảnh');}
console.log(out, Math.round(fs.statSync(path.join(root, out)).size / 1024) + ' KB');
