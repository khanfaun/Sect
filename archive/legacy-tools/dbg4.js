const fs=require('fs'),vm=require('vm');const h=fs.readFileSync('phu-sinh.html','utf8');
const core=h.slice(h.indexOf('<script>')+8,h.indexOf('// ================= GIAO DIỆN'));
const ctx=vm.createContext({console,Math,JSON});vm.runInContext(core,ctx);
console.log(vm.runInContext(`(()=>{G={meta:newMeta(),run:null,screen:'title'};genBirth();newRun(G.birth.cards[0]);G.run.scene=null;W().ents=[];G.run.at=regionOf(0).entry;
 const e=spawnEnt('thuong',0,{near:G.run.at});const out=[JSON.stringify(e)];entsStep(2);out.push(JSON.stringify(W().ents[0]));advanceTime(2);out.push(JSON.stringify(W().ents.find(z=>z.id===e.id)));return out.join('\\n');})()`,ctx));
