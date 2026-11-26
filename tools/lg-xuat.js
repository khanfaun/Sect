// Xuất dữ liệu một quận cho tools/lg-ghep.py (bản đồ lục giác 3D): ô, độ cao, sinh thái, địa điểm (theo bố cục cố định hiện tại).
// Dùng: node tools/lg-xuat.js <số quận>   -> src/assets-goc/luc-giac/quan-<số>.json
const fs = require('fs'), vm = require('vm'), path = require('path');
const root = path.join(__dirname, '..'), q = +process.argv[2];
if (!(q >= 0)) { console.log('Dùng: node tools/lg-xuat.js <số quận>'); process.exit(1); }
const ctx = vm.createContext({ console, Math, JSON, Date, performance: { now: () => Date.now() } });
vm.runInContext(require('./ghep').script(['core', 'core2', 'data']), ctx, { filename: 'luat-choi.js' });
const s = vm.runInContext(`(()=>{const w=genWorld(1);G.meta={world:w};const g=geoFor(w);const cells=[];for(let i=0;i<HN;i++)if(g.dist[i]===${q})cells.push(i);
  const L=[];for(const R0 of w.regions)for(const x of R0.nodes){if(g.dist[x.hex]!==${q})continue;L.push({t:x.type,n:x.name,hex:x.hex,c:placeCells(x)});}
  return JSON.stringify({q:${q},ten:g.dnames[${q}],cells,P:L,el:Array.from(g.el),bio:Array.from(g.bio)})})()`, ctx);
const out = path.join(root, 'src/assets-goc/luc-giac/quan-' + q + '.json'); fs.mkdirSync(path.dirname(out), { recursive: true }); fs.writeFileSync(out, s);
const d = JSON.parse(s); console.log(d.ten, d.cells.length, 'ô,', d.P.length, 'nơi ->', out);
