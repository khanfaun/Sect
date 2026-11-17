const fs=require('fs'),vm=require('vm');const h=fs.readFileSync('phu-sinh.html','utf8');
const core=h.slice(h.indexOf('<script>')+8,h.indexOf('// ================= GIAO DIỆN'));
const ctx=vm.createContext({console,Math,JSON});vm.runInContext(core,ctx);const run=c=>vm.runInContext(c,ctx);
run(`function fresh(){G={meta:newMeta(),run:null,screen:'title'};genBirth();newRun(G.birth.cards[0]);G.run.scene=null;}`);
// 1) đứng yên 10 phút = 600 giờ
console.log(run(`(()=>{let ok=0;for(let k=0;k<50;k++){fresh();let seen=false;for(let i=0;i<2400&&G.run;i++){advanceTime(0.25);if(G.run.scene){G.run.scene=null;}const [x,y]=playerXY();if(entsHere(G.run.region).some(e=>{const p=entXY(e);return e.to!=null&&Math.hypot(p[0]-x,p[1]-y)<=senseR();})){seen=true;break;}}if(seen)ok++;}return 'Đứng yên 10 phút, thấy thực thể đi qua trong tầm: '+ok+'/50 lần thử';})()`));
// 2) thú triều tới thôn không bị chặn
console.log(run(`(()=>{let ok=0,svc=0;for(let k=0;k<30;k++){fresh();const r=G.run;W().ents=[];let e=null;for(let g=0;g<20&&!e;g++)e=spawnEnt('thutrieu',0);if(!e)continue;const tgt=nodeById(e.data.tgt);r.at=regionOf(0).nodes.find(n=>n.id!==tgt.id&&n.type!=='tran'&&n.type!=='thanh').id;
 for(let i=0;i<2000&&tgt.state==='ok';i++){advanceTime(1);if(r.scene)r.scene=null;}
 if(tgt.state==='ruin'){ok++;const acts=placeActs(tgt).map(a=>a.a);const before=tgt.stateUntil-W().t;if(!acts.includes('inn')&&!acts.includes('shop')&&!acts.includes('tea')&&Math.round(before/HM)>=5)svc++;}}
 return 'Thú triều tới thôn: thành hoang tàn '+ok+'/30, mất dịch vụ khoảng 6 tháng '+svc+'/'+ok;})()`));
// 3) quỷ thị
console.log(run(`(()=>{fresh();const n=regionOf(0).nodes.find(n=>n.type==='thanh');n.state='ok';const res=[];for(let h=0;h<24;h++){W().t=Math.floor(W().t/24)*24+24+h;const a=placeActs(n).find(x=>x.a==='ghost');if(a&&!a.dis)res.push(h);}return 'Quỷ thị vào được lúc: '+res.join(',')+' giờ';})()`));
// 4,5) chết, đầu thai, mộ, ký ức, chôn đồ
console.log(run(`(()=>{fresh();let r=G.run;const wild=regionOf(0).nodes.find(n=>['rung','nui','song','phe','dong'].includes(n.type));arrive(wild.id);
 const rel=genRelic(0);r.relics.push(rel);openPlace(wild.id);placeAct('bury');buryToggle('r'+(r.relics.length-1));buryItems();
 const yd=tYear(W().t);const at=r.at;const visited=regionOf(0).nodes.filter(n=>n.fog>=2).map(n=>n.id);die('combat',{n:'Sói',k:'lang'});
 const g=nodeById(at).grave;const mem=visited.every(id=>nodeById(id).memory&&nodeById(id).fog===1);
 genBirth();newRun(G.birth.cards[0]);r=G.run;r.scene=null;const y2=tYear(W().t);
 arrive(wild.id);openPlace(wild.id);placeAct('explore');const got=r.relics.some(x=>x.name===rel.name&&x.lore===rel.lore);
 return 'Năm chết '+yd+' → năm đầu thai '+y2+(y2>yd?' (lớn hơn)':' (SAI)')+'; mộ đúng điểm: '+(g&&g.ten?'có ('+g.ten+')':'không')+'; điểm cũ thành ký ức: '+mem+'; chôn rồi đào lại đúng món: '+got;})()`));
