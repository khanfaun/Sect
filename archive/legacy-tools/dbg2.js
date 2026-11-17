const fs=require('fs'),vm=require('vm');const h=fs.readFileSync('phu-sinh.html','utf8');
const core=h.slice(h.indexOf('<script>')+8,h.indexOf('// ================= GIAO DIỆN'));
const ctx=vm.createContext({console,Math,JSON});vm.runInContext(core,ctx);
console.log(vm.runInContext(`(()=>{const o=spawnEnt;let log=[];spawnEnt=function(t,k,op){const e=o(t,k,op);if(op&&op.near!=null)log.push([Math.round(W().t),e&&e.at,e&&e.to,e&&e.route.join('-'),e&&edgeLen(e.at,e.to)]);return e;};
for(let k=0;k<80;k++){G={meta:newMeta(),run:null,screen:'title'};genBirth();newRun(G.birth.cards[0]);G.run.scene=null;log=[];let seen=false;for(let i=0;i<2400&&G.run;i++){advanceTime(0.25);G.run.scene=null;const [x,y]=playerXY();if(entsHere(0).some(e=>{const p=entXY(e);return e.to&&Math.hypot(p[0]-x,p[1]-y)<=senseR();})){seen=true;break;}}
 if(!seen)return JSON.stringify({at:G.run.at,log:log.slice(0,5)});}return 'ok';})()`,ctx));
