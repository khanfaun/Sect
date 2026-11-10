// kiểm: mọi điểm trong vùng đều tới được từ điểm vào; quan ải nối sang vùng sau; cùng hạt giống cùng bản đồ
const fs=require('fs'),vm=require('vm');const h=fs.readFileSync('phu-sinh.html','utf8');
const core=h.slice(h.indexOf('<script>')+8,h.indexOf('// ================= GIAO DIỆN'));
const ctx=vm.createContext({console,Math,JSON});vm.runInContext(core,ctx);
console.log(vm.runInContext(`(()=>{let bad=0,worlds=300;for(let i=0;i<worlds;i++){G={meta:newMeta()};for(const R0 of W().regions){for(const n of R0.nodes){if(!findPath(R0.entry,n.id))bad++;}
 if(R0.k<4&&!R0.pass)bad++;if(!R0.nodes.some(n=>n.type==='sao'))bad++;if(R0.nodes.filter(n=>n.dp).length<2)bad++;}}
 const a=JSON.stringify(genWorld(42).regions),b=JSON.stringify(genWorld(42).regions);
 return 'thế giới thử: '+worlds+', điểm cô lập hoặc thiếu điểm bắt buộc: '+bad+', cùng hạt giống cùng bản đồ: '+(a===b);})()`,ctx));
