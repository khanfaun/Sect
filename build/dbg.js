const fs=require('fs'),vm=require('vm');const h=fs.readFileSync('phu-sinh.html','utf8');
const core=h.slice(h.indexOf('<script>')+8,h.indexOf('// ================= GIAO DIỆN'));
const ctx=vm.createContext({console,Math,JSON});vm.runInContext(core,ctx);
console.log(vm.runInContext(`(()=>{for(let k=0;k<50;k++){G={meta:newMeta(),run:null,screen:'title'};genBirth();newRun(G.birth.cards[0]);G.run.scene=null;let seen=false,sc=0;for(let i=0;i<2400&&G.run;i++){advanceTime(0.25);if(G.run.scene){sc++;G.run.scene=null;}const [x,y]=playerXY();if(entsHere(0).some(e=>{const p=entXY(e);return e.to&&Math.hypot(p[0]-x,p[1]-y)<=senseR();})){seen=true;break;}}
 if(!seen)return JSON.stringify({sc,n:entsHere(0).length,ents:entsHere(0).map(e=>[e.type,e.at,e.to,e.route.length,Math.round(Math.hypot(entXY(e)[0]-playerXY()[0],entXY(e)[1]-playerXY()[1]))]),at:G.run.at,nb:neighbors(G.run.at)});}return 'all ok';})()`,ctx));
