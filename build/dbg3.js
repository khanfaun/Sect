const fs=require('fs'),vm=require('vm');const h=fs.readFileSync('phu-sinh.html','utf8');
const core=h.slice(h.indexOf('<script>')+8,h.indexOf('// ================= GIAO DIỆN'));
const ctx=vm.createContext({console,Math,JSON});vm.runInContext(core,ctx);
console.log(vm.runInContext(`(()=>{G={meta:newMeta(),run:null,screen:'title'};genBirth();newRun(G.birth.cards[0]);G.run.scene=null;W().ents=[];arrive(regionOf(0).entry);G.run.at=regionOf(0).entry;
 const nb=neighbors(G.run.at)[0];const e=spawnEnt('thuong',0,{near:G.run.at});const out=[JSON.stringify([e.at,e.to,e.route,e.speed,e.wait,e.until-W().t])];
 for(let i=0;i<40;i++){advanceTime(2);const x=W().ents.find(z=>z.id===e.id);out.push(x?[x.at,x.to,x.prog.toFixed(2)].join(','):'gone');}return out.join(' | ');})()`,ctx));
