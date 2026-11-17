const fs=require('fs'),vm=require('vm');const h=fs.readFileSync('phu-sinh.html','utf8');
const core=h.slice(h.indexOf('<script>')+8,h.indexOf('// ================= GIAO DIỆN'));
const ctx=vm.createContext({console,Math,JSON});vm.runInContext(core,ctx);const run=c=>vm.runInContext(c,ctx);
run(`function fresh(reg){G={meta:newMeta(),run:null,screen:'title'};genBirth();newRun(G.birth.cards[0]);G.run.scene=null;G.run.region=reg||0;}
function allAI(sc){for(const u of sc.units){if(u.ctrl==='player'){u.ctrl='ai';u.pat=['atk','multi','heavy','atk','block'];u.pi=0;nextIntent(u);}}sc.skipDodge=true;}`);
// 1) 9 đội hình × 300 trận
console.log(run(`(()=>{const out=[];let stuck=0,over180=0,maxT=0;
 for(let a=1;a<=3;a++)for(let b=1;b<=3;b++){let wins=0;
  for(let k=0;k<300;k++){fresh(k%3);const r=G.run;r.party=[];for(let i=1;i<a;i++)r.party.push({id:i,ten:'Đồng đội '+i,hp:S().maxHp*0.6,pow:0.6});
   startCombat({cnt:b},{kind:'node'});const sc=r.scene;allAI(sc);let holdN=0;
   for(let i=0;i<20000&&!sc.done;i++){combatStep(0.05);if(sc.hold&&sc.aiWait==null&&!sc.done)holdN++;else holdN=0;if(holdN>100){stuck++;break;}if(sc.t>180)break;}
   if(sc.t>180)over180++;maxT=Math.max(maxT,sc.t);if(sc.over==='win')wins++;}
  out.push(a+'v'+b+': phe ta thắng '+Math.round(wins/3)+'%');}
 return out.join(', ')+'\\n  kẹt ở hold: '+stuck+', quá 180 giây: '+over180+', trận dài nhất: '+maxT.toFixed(1)+'s';})()`));
// 2) hai phe cùng tụ lực
console.log(run(`(()=>{let ok=0;for(let k=0;k<200;k++){fresh();startCombat({cnt:1},{kind:'node'});const sc=G.run.scene;allAI(sc);
 for(const u of sc.units)u.intent='heavy',u.pat=['heavy'];sc.units[1].hp=sc.units[1].max=1e6;sc.units[0].hp=sc.units[0].max=1e6;
 let fired={};for(let i=0;i<6000&&!sc.done;i++){const before=sc.units.map(u=>u.phase);combatStep(0.05);sc.units.forEach((u,j)=>{if(before[j]==='charge'&&u.phase==='recover')fired[u.id]=(fired[u.id]||0)+1;});if(Object.keys(fired).length===2)break;}
 if(Object.keys(fired).length===2)ok++;}return 'Hai phe cùng tụ lực, cả hai đều tung được chiêu: '+ok+'/200';})()`));
// 3) mục tiêu gục trước khi chiêu tụ lực tung ra
console.log(run(`(()=>{let ok=0,err=0;for(let k=0;k<100;k++){try{fresh();startCombat({cnt:2},{kind:'node'});const sc=G.run.scene;sc.skipDodge=true;const me=mainUnit(sc);
 me.phase='ready';me.pos=50;sc.cur=me.id;sc.hold=true;const t=sc.units[1];me.mp=999;
 runAct(sc,()=>beginSkill(sc,me,SK.cuutieu,1,t.id));t.hp=0;down(sc,t);
 for(let i=0;i<4000&&!sc.done&&me.phase==='charge';i++){combatStep(0.05);if(sc.qte)qteResolve(1);if(readyPlayer(sc))playerAct('_wait');if(sc.dodge)dodgeResolve(null);}
 if(me.phase!=='charge')ok++;}catch(e){err++;}}return 'Mục tiêu gục trước: chiêu đổi mục tiêu hoặc hủy, không lỗi: '+ok+'/100, lỗi: '+err;})()`));
// 4) né với ne−cx=0
console.log(run(`(()=>{const a={cx:20},d={ne:20};let n0=0,n1=0;for(let i=0;i<2000;i++){if(R()<dodgeP(a,d,null,true).p)n0++;if(R()<dodgeP(a,d,0.03,true).p)n1++;}return 'Né theo chỉ số, ne−cx=0: không nhấn '+(n0/20).toFixed(1)+'%, có nhấn '+(n1/20).toFixed(1)+'% (2000 lần gieo)';})()`));
// 5) lôi kiếp 6 đạo
console.log(run(`(()=>{const die=[];let surv=0;for(const mode of ['none','perfect'])for(let k=0;k<50;k++){fresh(2);const r=G.run;r.realm=2;const s=S();r.hp=s.maxHp;startCombat({kiep:{n:6}},{kind:'bt'});const sc=r.scene;
 for(let i=0;i<20000&&!sc.done;i++){combatStep(0.05);if(sc.dodge)dodgeResolve(mode==='perfect'?[0]:null);if(sc.qte)qteResolve(1);if(readyPlayer(sc))playerAct('_wait');}
 if(mode==='none')die.push(sc.over==='dead'?sc.kiep.done:'sống');else if(sc.over==='win')surv++;}
 const c={};die.forEach(x=>c[x]=(c[x]||0)+1);return 'Lôi kiếp 6 đạo, không làm gì: chết ở đạo '+JSON.stringify(c)+'; đỡ chuẩn mọi đạo: sống '+surv+'/50';})()`));
// 6) Thiên Đạo Trúc Cơ
console.log(run(`(()=>{fresh();const r=G.run;r.tv=100;const s0=S();r.dao=10;const n=regionOf(0).nodes.find(n=>n.dp);r.at=n.id;openPrep(n);const o=RS;RS=()=>0;prepStart();RS=o;
 const r1=G.run;const q=r1.quality[1];r1.tv=0;const base=JSON.parse(JSON.stringify(r1));const s1=S();r1.quality[1]=0;const s2=S();r1.quality[1]=q;
 return 'Đạt 10 điểm đạo cơ rồi đột phá: "'+realmLabel()+'", chỉ số so với phẩm Phàm: ×'+(s1.maxHp/s2.maxHp).toFixed(3)+' khí huyết, ×'+(s1.atk/s2.atk).toFixed(3)+' công';})()`));
