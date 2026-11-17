const fs=require('fs'),vm=require('vm');const h=fs.readFileSync('phu-sinh.html','utf8');
const core=h.slice(h.indexOf('<script>')+8,h.indexOf('// ================= GIAO DIỆN'));
const ctx=vm.createContext({console,Math,JSON});vm.runInContext(core,ctx);
console.log(vm.runInContext(`(()=>{const out=[];for(const [realm,n] of [[2,6],[3,9]])for(const mode of ['guard','dodgeKha']){let win=0,turns=0;
 for(let k=0;k<200;k++){G={meta:newMeta()};genBirth();newRun(G.birth.cards[0]);const r=G.run;r.scene=null;r.realm=realm;r.region=realm;r.hp=S().maxHp;r.mp=S().maxMp;
  startCombat({kiep:{n}},{kind:'bt'});const sc=r.scene;
  for(let i=0;i<40000&&!sc.done;i++){combatStep(0.05);if(sc.dodge)dodgeResolve(mode==='dodgeKha'?[0.2]:null);if(readyPlayer(sc)){turns++;playerAct('_guard');}}
  if(sc.over==='win')win++;}
 out.push('cảnh giới '+realm+', '+n+' đạo, '+mode+': sống '+win/2+'%, lượt/kiếp '+(turns/200).toFixed(1));}return out.join('\\n');})()`,ctx));
