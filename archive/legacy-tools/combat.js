// ---------------- CHIẾN ĐẤU: THANH HÀNH ĐỘNG ----------------
// Thanh dài 100: chạy 0→50 theo thân pháp, ra lệnh ở 50, tụ lực đứng ở 75, hồi 50/75→100 theo hồi phục, chạm 100 về 0.
const VERB={
  thu:{atk:['{e} vồ tới','{e} cắn xé','{e} quật mạnh','{e} lao thẳng tới'],multi:['{e} cào liên tiếp','{e} tấn công tới tấp'],heavy:['{e} dồn toàn lực húc tới','{e} gầm lên, tung đòn chí mạng']},
  nhan:{atk:['{e} vung binh khí chém xuống','{e} tung một chưởng','{e} điểm ra một chỉ','{e} phóng phi kiếm'],multi:['{e} xuất liền mấy chiêu','{e} kiếm ảnh chồng chất'],heavy:['{e} dồn hết chân nguyên vào một kích','{e} quát lớn, tung sát chiêu']},
  quy:{atk:['{e} lướt xuyên qua','{e} cào móng vuốt lạnh buốt','{e} rít lên chói tai'],multi:['{e} ẩn hiện liên hồi'],heavy:['{e} hóa thành luồng âm phong ập tới']},
  vat:{atk:['{e} giáng một đòn','{e} va mạnh tới'],multi:['{e} công kích liên hoàn'],heavy:['{e} phát ra một kích kinh thiên']},
  boss:{atk:['{e} ra tay','{e} vung tay áo, kình phong ập tới','{e} đánh ra một đòn nặng như núi'],multi:['{e} công kích như mưa bão'],heavy:['{e} tung đòn sát thủ','Trời đất tối sầm, {e} dồn toàn lực']}
};
const VERB2={charge:'{e} bắt đầu tụ lực…',block:'{e} thủ thế',rage:'{e} nổi cơn cuồng nộ',poison:'{e} phun độc',burn:'{e} phun lửa',weak:'{e} tỏa ra âm khí',vuln:'{e} xé toạc hộ thể',drain:'{e} hút lấy sinh khí',heal:'{e} hồi phục vết thương',stun:'{e} giáng uy áp'};
// đòn của kẻ địch theo ý định cũ
const EN_SK={
  atk:{n:'Tấn công',fx:{p:1},rec:1},multi:{n:'Liên kích',fx:{p:.5,h:2},rec:1.1},heavy:{n:'Trọng kích',fx:{p:2.2,charge:true},rec:1.2},
  block:{n:'Phòng thủ',fx:{eblock:1.3},rec:.8},rage:{n:'Cuồng nộ',fx:{rage:1},rec:.8},poison:{n:'Phun độc',fx:{p:.5,epoison:.45},rec:1},burn:{n:'Thiêu đốt',fx:{p:.6,eburn:.6},rec:1},
  weak:{n:'Làm suy yếu',fx:{p:.5,weak:2},rec:1},vuln:{n:'Phá giáp',fx:{p:.5,vuln:2},rec:1},drain:{n:'Hút máu',fx:{p:.9,edrain:60},rec:1},heal:{n:'Hồi phục',fx:{eheal:10},rec:.9},stun:{n:'Trấn áp',fx:{p:.7,stun:30},rec:1}
};
const WAIT_SK={id:'_wait',n:'Đứng yên',el:'vo',t:0,c:0,fx:{},f:'',rec:.7};
const GUARD_SK={id:'_guard',n:'Vận khí',el:'vo',t:0,c:0,fx:{guard:1},f:'',rec:.8};
const STUN_S=2,CHARGE_MAX=12;
function skRec(sk){if(sk.rec)return sk.rec;if(sk.fx&&sk.fx.rec)return sk.fx.rec;return [0.8,0.9,1.0,1.2,1.4][sk.t||0];}
function U_(sc,id){return sc.units.find(u=>u.id===id);}
function alive(sc,side){return sc.units.filter(u=>u.side===side&&u.hp>0&&!u.gone);}
function foeSide(s){return s==='A'?'B':'A';}
function mainUnit(sc){return sc.units.find(u=>u.isMain);}
function clog(sc,t,c){sc.log.push({t,c:c||''});if(sc.log.length>40)sc.log.shift();sc.rev=(sc.rev||0)+1;}
function playerUnit(){
  const r=G.run,s=S();
  return {id:1,side:'A',ctrl:'player',isMain:true,name:r.ten,icon:r.g==='nam'?'🧑':'👩',el:r.root.els[0]||'vo',f:'me',
    hp:r.hp,max:s.maxHp,mp:r.mp,maxMp:s.maxMp,atk:s.atk,def:s.def,tp:s.tp,cx:s.cx,ne:s.ne,hoi:s.hoi,crit:s.crit,
    skills:r.skills.map(x=>({id:x.id,lv:x.lv})),st:{},pos:0,phase:'run',pending:null,waitSet:[],stunT:0,rec:1,chargeT:0};
}
function enemyUnit(en,id,f){
  const reg=G.run.region;f=f||1;
  const tp=Math.round((6+reg*2.5+(en.boss?2:0)+(en.elite?1:0))*(en.k&&EN[en.k]&&EN[en.k].f==='thu'?1.05:1)),cx=10+2*reg+(en.elite||en.boss?2:0);
  return {id,side:'B',ctrl:'ai',name:en.n,sub:en.sub,icon:en.i,el:en.el,f:en.boss?'boss':en.f,k:en.k,boss:!!en.boss,elite:!!en.elite,esc:en.esc,
    hp:Math.round(en.hp*f),max:Math.round(en.max*f),mp:0,maxMp:0,atk:Math.round(en.atk*(f>1?Math.sqrt(f):1)),def:en.def,tp:en.tp||tp,cx:en.cx||cx,ne:en.ne||tp,hoi:en.hoi||cx,crit:5,
    pat:en.pat.slice(),pi:en.pi||0,st:Object.assign({},en.st||{}),pos:0,phase:'run',pending:null,waitSet:[],stunT:0,rec:1,chargeT:0,intent:null};
}
// spec: {k,n,m,elite,spar,cnt,...}, 'boss', {pre:en}, {kiep:{n,waves}}, {party:[đơn vị phe A]}
function startCombat(spec,after){
  const r=G.run;const back=sceneBack();
  const sc={type:'combat',units:[],hold:false,log:[],t:0,after,back,spar:!!(spec&&spec.spar),boss:spec==='boss',elite:!!(spec&&spec.elite),rev:0,cur:null,aiWait:null,dodge:null,qte:null,over:null,done:false,nid:2};
  const me=playerUnit();sc.units.push(me);
  if(!(spec&&spec.kiep))for(const p of (r.party||[]).slice(0,2)){const u=partyUnit(p,sc.nid++);if(u)sc.units.push(u);}
  if(spec&&spec.kiep){
    const k={id:sc.nid++,side:'B',ctrl:'ai',kind:'kiep',immune:true,name:'Kiếp vân',icon:'🌩️',el:'loi',f:'vat',hp:1,max:1,mp:0,maxMp:0,atk:0,def:0,tp:0,cx:99,ne:0,hoi:10,crit:0,skills:[],st:{},pos:0,phase:'run',pending:null,waitSet:[],stunT:0,rec:1,chargeT:0};
    sc.units.push(k);sc.kiep={n:spec.kiep.n,waves:spec.kiep.waves||1,wave:1,done:0,uy:1,cut:spec.kiep.cut||0};
    sc.en={n:'Lôi kiếp',k:'kiep',i:'🌩️',el:'loi',boss:true};
    if(spec.kiep.block)me.st.block=Math.round(me.max*spec.kiep.block/100);
    clog(sc,`Mây kiếp vần vũ. ${spec.kiep.n} đạo lôi${sc.kiep.waves>1?' × '+sc.kiep.waves+' đợt':''} sắp giáng xuống.`,'en');
  } else {
    let ens=[];
    if(spec==='boss')ens=[mkBoss()];
    else if(spec&&spec.pre){ens=[spec.pre];const n=spec.cnt||1;for(let i=1;i<n;i++)ens.push(mkEnemy({k:spec.pre.k,elite:spec.elite}));}
    else{const n=spec&&spec.cnt||1;for(let i=0;i<n;i++)ens.push(mkEnemy(spec,after&&after.ev&&after.ev.v));}
    if(spec&&spec.elite)ens.forEach(e=>e.elite=true);
    const n=ens.length;const f=[1,1.6,2.1][n-1]/n; // ngân sách chia đều
    ens.forEach(e=>sc.units.push(enemyUnit(e,sc.nid++,n>1?f:1)));
    sc.en={n:ens[0].n,k:ens[0].k,i:ens[0].i,el:ens[0].el,boss:!!ens[0].boss,elite:!!ens[0].elite,sub:ens[0].sub};
    clog(sc,ens.map(e=>`${e.i} ${e.n}`).join(', ')+' xuất hiện.');
  }
  // trung bình thân pháp và hồi phục, tính một lần lúc vào trận
  const L=sc.units.filter(u=>!u.immune);
  sc.tpTB=Math.max(1,L.reduce((a,u)=>a+u.tp,0)/L.length);sc.hoiTB=Math.max(1,L.reduce((a,u)=>a+u.hoi,0)/L.length);
  if(sc.kiep){const k=sc.units.find(u=>u.kind==='kiep');k.fixedV=1.1*vRun(sc,me);}
  // hiệu ứng pháp bảo đầu trận
  const fx=S().fx;
  if(fx.startBlock)me.st.block=(me.st.block||0)+Math.round(me.max*fx.startBlock/100);
  if(fx.firstEvade)me.st.evade=fx.firstEvade;
  for(const u of alive(sc,'B')){if(u.immune)continue;if(fx.weakStart)u.st.weak=fx.weakStart;if(fx.vulnStart)u.st.vuln=fx.vulnStart;}
  for(const u of sc.units)if(u.side==='B'&&!u.immune)nextIntent(u);
  r.scene=sc;
}
function partyUnit(p,id){
  const r=G.run,s=S();if(!p||p.hp<=0)return null;
  const m=p.pow||0.6;
  return {id,side:'A',ctrl:'ai',ally:p.id,name:p.ten,icon:p.icon||'🧑',el:p.el||'vo',f:'nhan',hp:p.hp,max:Math.round(s.maxHp*m),mp:0,maxMp:0,atk:Math.round(s.atk*m),def:Math.round(s.def*m),tp:Math.round(s.tp*0.9),cx:s.cx,ne:Math.round(s.ne*0.9),hoi:s.hoi,crit:5,
    pat:['atk','atk','multi','block','heavy'],pi:0,st:{},pos:0,phase:'run',pending:null,waitSet:[],stunT:0,rec:1,chargeT:0};
}
function vRun(sc,u){if(u.fixedV)return u.fixedV;return 14*clamp(u.tp/sc.tpTB,0.6,1.8);}
function vRec(sc,u){if(u.fixedV)return u.fixedV;return 18*clamp(u.hoi/sc.hoiTB,0.6,1.8)/(u.rec||1);}
function nextIntent(u){
  let it=u.pat[u.pi%u.pat.length];u.pi++;if(it==='charge')it='heavy';
  if(chance(.22)&&!u.boss){it=pick(u.pat);if(it==='charge')it='heavy';}
  u.intent=it;
}
// gỡ id khỏi waitSet của mọi người đang tụ lực phe kia
function doneAct(sc,u){for(const x of sc.units)if(x.side!==u.side&&x.waitSet.length)x.waitSet=x.waitSet.filter(i=>i!==u.id);}
// ---------- vòng lặp trận ----------
function combatStep(dt){
  const sc=G.run&&G.run.scene;if(!sc||sc.type!=='combat'||sc.over)return;
  if(sc.hold){
    if(sc.aiWait!=null){sc.aiWait-=dt;if(sc.aiWait<=0){sc.aiWait=null;const u=U_(sc,sc.cur);runAct(sc,()=>aiAct(sc,u));}}
    return;
  }
  sc.t+=dt;
  for(const u of sc.units){
    if(u.hp<=0||u.gone){u.phase='down';continue;}
    if(u.stunT>0){u.stunT=Math.max(0,u.stunT-dt);continue;}
    if(u.phase==='run')u.pos+=vRun(sc,u)*dt;
    else if(u.phase==='recover'){u.pos+=vRec(sc,u)*dt;if(u.pos>=100){u.pos=0;u.phase='run';onZero(sc,u);if(sc.over)return;}}
    else if(u.phase==='charge')u.chargeT+=dt;
  }
  // người đang tụ lực: đủ điều kiện thì tung chiêu
  const ch=sc.units.find(u=>u.phase==='charge'&&u.hp>0&&(u.waitSet.length===0||u.chargeT>=CHARGE_MAX));
  if(ch){sc.hold=true;sc.cur=ch.id;
    if(ch.ctrl==='player'&&!sc.kiep&&!(G.meta.opt&&G.meta.opt.autoQte)){sc.qte={uid:ch.id,id:(sc.qid=(sc.qid||0)+1)};sc.rev++;return;}
    runAct(sc,()=>fireCharge(sc,ch,1));return;}
  // ai chạm mốc 50
  const rd=sc.units.filter(u=>u.phase==='run'&&u.hp>0&&u.pos>=50);
  if(rd.length){
    rd.sort((a,b)=>(b.pos-a.pos)||(b.tp-a.tp)||((a.side==='A'?0:1)-(b.side==='A'?0:1))||(a.id-b.id));
    const u=rd[0];
    for(const x of rd.slice(1))x.pos=49.9;
    u.pos=50;u.phase='ready';sc.cur=u.id;sc.hold=true;sc.rev++;
    if(u.kind==='kiep'){runAct(sc,()=>kiepStrike(sc,u));return;}
    if(u.ctrl==='player')return; // chờ người chơi chọn chiêu
    sc.aiWait=0.4;
  }
}
// tắt hold ở đúng một chỗ
function runAct(sc,fn){
  try{fn();}
  finally{
    if(sc.dodge||sc.qte)return; // còn chờ thao tác
    sc.cur=null;sc.aiWait=null;checkEnd(sc);sc.hold=false;sc.rev++;
    syncMain(sc);
  }
}
function syncMain(sc){const me=mainUnit(sc),r=G.run;if(me&&r){r.hp=Math.max(0,Math.round(me.hp));r.mp=Math.round(me.mp);}}
function onZero(sc,u){
  if(u.immune)return;
  const isP=u.ctrl==='player';const fx=isP?S().fx:{};
  u.st.block=0;
  if(isP&&fx.blockTurn)u.st.block=Math.round(u.max*fx.blockTurn/100);
  let d=0;
  if(u.st.poison>0){if(isP&&fx.poisonImm)u.st.poison=0;else{d+=u.st.poison;u.st.poison=Math.floor(u.st.poison*0.75);}}
  if(u.st.burn>0){d+=u.st.burn;u.st.burn=Math.floor(u.st.burn*0.5);}
  if(d){u.hp-=d;clog(sc,`${u.name} trúng độc/thiêu: ${d}`,'dot');if(u.hp<=0){down(sc,u);checkEnd(sc);return;}}
  let reg=(fx.regenHp||0)+(u.st.regen>0?6:0);if(u.st.regen>0)u.st.regen--;
  if(reg)u.hp=Math.min(u.max,u.hp+Math.round(u.max*reg/100));
  if(u.maxMp)u.mp=Math.min(u.maxMp,u.mp+Math.round(u.maxMp*(0.05+(fx.regenMp||0)/100)));
  if(u.st.vuln>0)u.st.vuln--;if(u.st.weak>0)u.st.weak--;
  if(u.esc)u.st.rage=(u.st.rage||0)+1;
  syncMain(sc);
}
function down(sc,u){
  if(u.immune)return;
  if(u.isMain&&!sc.spar&&U('hoi')&&!G.run.revived){G.run.revived=true;u.hp=Math.round(u.max*0.3);clog(sc,'🕯️ Hồi quang phản chiếu! Ngươi gượng đứng dậy.','me');return;}
  u.hp=0;u.phase='down';u.pending=null;u.waitSet=[];doneAct(sc,u);
  // gỡ khỏi mọi waitSet ngay khi gục
  for(const x of sc.units)x.waitSet=x.waitSet.filter(i=>i!==u.id);
  clog(sc,`${u.name} gục ngã.`,u.side==='A'?'en':'win');
}
function checkEnd(sc){
  if(sc.over)return;const me=mainUnit(sc);
  if(me.hp<=0){
    if(sc.spar){me.hp=1;sc.over='lose';clog(sc,'Ngươi gục xuống. Trận đấu kết thúc.','en');}
    else sc.over='dead';
    finishCombat(sc);return;}
  if(sc.kiep){const k=sc.kiep;if(k.done>=k.n){if(k.wave<k.waves){k.wave++;k.done=0;me.hp=Math.min(me.max,me.hp+Math.round(me.max*0.3));clog(sc,`Đợt lôi thứ ${k.wave} kéo tới. Ngươi kịp hồi lại một hơi.`,'en');}else{sc.over='win';clog(sc,'Mây kiếp tan. Ngươi vẫn đứng đó.','win');finishCombat(sc);}}return;}
  if(!alive(sc,'B').length){sc.over='win';finishCombat(sc);}
}
function finishCombat(sc){
  sc.done=true;sc.hold=true;sc.dodge=null;sc.qte=null;syncMain(sc);
  const r=G.run;
  // đồng đội: ghi lại khí huyết
  for(const u of sc.units)if(u.ally!=null){const p=(r.party||[]).find(x=>x.id===u.ally);if(p)p.hp=Math.max(0,u.hp);}
  if(r.party)r.party=r.party.filter(p=>p.hp>0);
  if(sc.over==='win'&&!sc.kiep){r.kills+=sc.units.filter(u=>u.side==='B').length;G.meta.kills+=1;if(G.meta.kills>=100)ach('tram');
    clog(sc,`${sc.en.n} bại trận.`,'win');
    const fx=aggFx();if(fx.healAfter){const s=S();r.hp=Math.min(s.maxHp,r.hp+Math.round(s.maxHp*fx.healAfter/100));}
    if(sc.after&&sc.after.nemesis)ach('baothu');}
}
// ---------- người chơi ra lệnh ----------
function readyPlayer(sc){const u=sc&&sc.cur&&U_(sc,sc.cur);return u&&u.ctrl==='player'&&u.phase==='ready'&&!sc.dodge&&!sc.qte?u:null;}
function pSkill(id){
  const r=G.run;if(id==='_atk')return {sk:BASIC,lv:1};if(id==='_guard')return {sk:GUARD_SK,lv:1};if(id==='_wait')return {sk:WAIT_SK,lv:1};
  const own=r.skills.find(x=>x.id===id);return own?{sk:SK[id],lv:own.lv}:null;
}
function needTarget(sc,id){const p=pSkill(id);if(!p)return false;const f=p.sk.fx;return !!(f.p&&!f.aoe&&alive(sc,'B').length>1);}
function playerAct(id,tid){
  const sc=G.run.scene;const u=readyPlayer(sc);if(!u)return false;
  const p=pSkill(id);if(!p)return false;const sk=p.sk;const cost=skillCost(sk);if(u.mp<cost)return false;
  if(sc.kiep&&p.sk.fx.p){tid=sc.units.find(x=>x.kind==='kiep').id;}
  const foes=alive(sc,'B');if(tid==null||!U_(sc,+tid)||U_(sc,+tid).hp<=0)tid=foes.length?foes[0].id:null;
  runAct(sc,()=>beginSkill(sc,u,sk,p.lv,tid==null?null:+tid));return true;
}
function playerPillAct(idx){
  const sc=G.run.scene;const u=readyPlayer(sc);if(!u)return false;
  syncMain(sc);const m=usePill(idx,true);if(!m)return false;
  runAct(sc,()=>{u.hp=G.run.hp;u.mp=G.run.mp;clog(sc,'Dùng '+m+'.','me');toRecover(sc,u,0.8);doneAct(sc,u);});return true;
}
function playerFlee(){
  const sc=G.run.scene;const u=readyPlayer(sc);if(!u||sc.boss||sc.kiep||sc.noFlee)return false;
  const s=S();let p=clamp(0.35+s.tp*0.02,0.2,0.85);if(sc.elite)p*=0.6;if(sc.fleeSure)p=1;
  runAct(sc,()=>{if(chance(p)){sc.over='flee';clog(sc,'Cả đội rút lui, thoát thân.','me');finishCombat(sc);}else{clog(sc,'Thoát không được!','me');toRecover(sc,u,1);doneAct(sc,u);}});return true;
}
function toRecover(sc,u,rec){u.phase='recover';u.rec=rec||1;if(u.pos<50)u.pos=50;u.pending=null;u.waitSet=[];u.chargeT=0;}
// ---------- máy điều khiển ----------
function aiAct(sc,u){
  if(!u||u.hp<=0)return;
  const foes=alive(sc,foeSide(u.side));if(!foes.length){toRecover(sc,u,1);return;}
  const it=u.intent||'atk';const base=EN_SK[it]||EN_SK.atk;
  const sk={id:'_e'+it,n:base.n,el:u.el,t:1,c:0,fx:Object.assign({},base.fx),f:'',rec:base.rec,it};
  if(it==='multi')sk.fx.h=G.run.region>=2?3:2;
  // chọn mục tiêu: 60% kẻ khí huyết thấp nhất, 40% ngẫu nhiên
  const tgt=chance(.6)?foes.slice().sort((a,b)=>a.hp-b.hp)[0]:pick(foes);
  beginSkill(sc,u,sk,1,tgt.id);
  if(u.side==='B'||u.pat)nextIntent(u);
}
// ---------- tung chiêu ----------
function beginSkill(sc,u,sk,lv,tid){
  const cost=skillCost(sk);
  if(u.ctrl==='player'){u.mp-=cost;if(sk.fx.selfHp)u.hp=Math.max(1,u.hp-Math.round(u.max*sk.fx.selfHp/100));}
  if(sk.fx.charge){
    // vào tụ lực: nhảy tới 75, chờ mọi kẻ địch còn sống hành động xong
    u.phase='charge';u.pos=75;u.chargeT=0;u.pending={sk,lv,tid};
    u.waitSet=alive(sc,foeSide(u.side)).filter(x=>!x.immune||sc.kiep).map(x=>x.id);
    clog(sc,(u.ctrl==='player'?'Ngươi':u.name)+' bắt đầu tụ lực: '+sk.n+'…',u.side==='A'?'me':'en');
    doneAct(sc,u); // bước vào tụ lực cũng tính là đã hành động
    return;
  }
  doSkill(sc,u,sk,lv,tid,1);
}
function fireCharge(sc,u,qm){
  const p=u.pending;if(!p){toRecover(sc,u,1);return;}
  doSkill(sc,u,p.sk,p.lv,p.tid,qm);
}
function qteResolve(m){
  const sc=G.run.scene;if(!sc||!sc.qte)return;const u=U_(sc,sc.qte.uid);sc.qte=null;
  runAct(sc,()=>fireCharge(sc,u,m==null?1:m));
}
function qteMult(x){if(x==null)return 1;const d=Math.abs(x-0.5);return d<=0.07?1.3:d<=0.2?1.1:0.9;}
// chọn mục tiêu thật sự lúc ra đòn
function pickTargets(sc,u,sk,tid){
  const f=sk.fx;const side=foeSide(u.side);
  if(f.aoe)return alive(sc,side).filter(x=>!x.immune||sc.kiep);
  let t=tid!=null?U_(sc,tid):null;
  if(!t||t.hp<=0||t.side!==side){const L=alive(sc,side);if(!L.length)return [];t=L.slice().sort((a,b)=>a.hp-b.hp)[0];}
  return [t];
}
function hasDmg(sk){return !!sk.fx.p;}
function doSkill(sc,u,sk,lv,tid,qm){
  const f=sk.fx;
  const tg=hasDmg(sk)?pickTargets(sc,u,sk,tid):[];
  if(hasDmg(sk)&&!tg.length){clog(sc,(u.ctrl==='player'?'Ngươi':u.name)+' mất mục tiêu, chiêu bị hủy.',u.side==='A'?'me':'en');finishAct(sc,u,sk);return;}
  const me=mainUnit(sc);
  const autoD=G.meta.opt&&G.meta.opt.autoDodge;
  // nhắm vào nhân vật người chơi: hiện vòng né
  if(hasDmg(sk)&&tg.includes(me)&&u.side==='B'&&!autoD&&!sc.skipDodge){
    const n=Math.min(3,f.h||1);
    sc.dodge={id:(sc.did=(sc.did||0)+1),uid:u.id,sk,lv,tids:tg.map(x=>x.id),qm,n,T:u.phase==='charge'?1.1:0.8,lit:false};sc.rev++;return;
  }
  resolveSkill(sc,u,sk,lv,tg,qm,autoD?'auto':null);
}
// offs: mảng độ lệch (giây) cho tối đa 3 nhát đầu; null = không nhấn
function dodgeResolve(offs){
  const sc=G.run&&G.run.scene;if(!sc||!sc.dodge)return;const d=sc.dodge;sc.dodge=null;
  const u=U_(sc,d.uid);
  runAct(sc,()=>{
    if(d.kiep){kiepHit(sc,u,offs&&offs[0]);return;}
    const tg=d.tids.map(i=>U_(sc,i)).filter(x=>x&&x.hp>0);
    if(!tg.length){finishAct(sc,u,d.sk);return;}
    resolveSkill(sc,u,d.sk,d.lv,tg,d.qm,offs||[]);
  });
}
function dodgeP(att,def,off,isMain){
  const base=clamp(0.25+(def.ne-att.cx)*0.02,0.05,0.70);
  if(!isMain)return {p:base*0.5,q:null};
  if(off==='auto')return {p:clamp(base+0.20-0.10,0.02,0.95),q:'kha'};
  if(off==null||Math.abs(off)>0.25)return {p:clamp(base*0.4,0.02,0.95),q:null};
  if(Math.abs(off)<=0.09)return {p:clamp(base+0.45,0.02,0.95),q:'chuan'};
  return {p:clamp(base+0.20,0.02,0.95),q:'kha'};
}
function resolveSkill(sc,u,sk,lv,tg,qm,offs){
  const f=sk.fx,isP=u.ctrl==='player';const s=isP?S():null;const fx=isP?s.fx:{};
  const lvM=1+0.25*((lv||1)-1);const who=isP?'Ngươi':u.name;
  let total=0,hits=0,dod=0,msg=sk.n;
  if(f.p){
    const n=f.h||1;
    for(const t of tg){
      if(t.hp<=0&&!t.immune)continue;
      for(let h=0;h<n;h++){
        if(t.hp<=0&&!t.immune)break;
        if(t.kind==='kiep'){const d0=dmgCalc(u.atk,u.st.rage,u.st.weak,0,0,f.p,(isP?elemMult(sk.el,'loi'):1)*lvM*qm*(f.aoe?0.6:1),0);total+=d0;hits++;continue;}
        // né
        let ev=false,q=null;
        if(t.st.evade>0){t.st.evade--;ev=true;}
        else{const o=offs==='auto'?'auto':(Array.isArray(offs)?offs[Math.min(h,2)]:null);const D=dodgeP(u,t,o,t.isMain&&offs!=null);q=D.q;ev=R()<D.p;}
        if(ev){dod++;if(t.isMain&&q==='chuan')t.bonusPos=8;continue;}
        let mult=lvM*qm*(f.aoe?0.6:1);
        if(isP){mult*=elemMult(sk.el,t.el);if(f.bonusIf==='dot'&&(t.st.poison>0||t.st.burn>0))mult*=1.5;if(fx.execute&&t.hp<t.max*0.3)mult*=1+fx.execute/100;}
        else if(KHAC[u.el]===t.el)mult*=1.25;
        const crit=chance(((u.crit||5)+(f.crit||0))/100);if(crit)mult*=1.6;
        let d=dmgCalc(u.atk,u.st.rage,u.st.weak,t.def,t.st.vuln,f.p,mult,f.pierce);
        d=absorb(t.st,d);t.hp-=d;total+=d;hits++;
        if(t.isMain&&d>0){const fx2=S().fx;if(fx2.reflect){u.hp-=Math.round(d*fx2.reflect/100);if(u.hp<=0)down(sc,u);}}
        if(isP){if(fx.poisonHit)t.st.poison=(t.st.poison||0)+Math.round(u.atk*fx.poisonHit);if(fx.burnHit)t.st.burn=(t.st.burn||0)+Math.round(u.atk*fx.burnHit);}
        // phá tụ lực
        if(t.phase==='charge'&&d>=t.max*0.15&&!(t.pending&&t.pending.sk.fx.steady)){clog(sc,`${t.name} bị phá thế tụ lực!`,t.side==='A'?'en':'me');toRecover(sc,t,1);t.pos=75;doneAct(sc,t);}
        if(t.hp<=0){down(sc,t);checkEnd(sc);if(sc.over)break;}
      }
      if(sc.over)break;
      // trạng thái lên mục tiêu
      if(t.hp>0&&!t.immune){
        if(f.poison)t.st.poison=(t.st.poison||0)+Math.round(u.atk*f.poison*lvM);
        if(f.epoison&&!(t.isMain&&S().fx.poisonImm))t.st.poison=(t.st.poison||0)+Math.round(u.atk*f.epoison);
        if(f.burn)t.st.burn=(t.st.burn||0)+Math.round(u.atk*f.burn*lvM);
        if(f.eburn)t.st.burn=(t.st.burn||0)+Math.round(u.atk*f.eburn);
        if(f.weak)t.st.weak=Math.max(t.st.weak||0,f.weak);
        if(f.vuln)t.st.vuln=Math.max(t.st.vuln||0,f.vuln);
        const stunC=(f.stun||0)+(isP?(fx.stunP||0):0);
        if(stunC&&chance(stunC/100*(t.boss?0.5:1))){t.stunT=STUN_S;msg+=' 💫';
          if(t.phase==='charge'&&!(t.pending&&t.pending.sk.fx.steady)){toRecover(sc,t,1);t.pos=75;clog(sc,`${t.name} bị choáng, tụ lực tan biến.`,'fl');}
          doneAct(sc,t);}
      }
    }
    if(total&&(f.drain||(isP&&fx.drain)))u.hp=Math.min(u.max,u.hp+Math.round(total*((f.drain||0)+(isP?fx.drain||0:0))/100));
    if(total&&f.edrain)u.hp=Math.min(u.max,u.hp+Math.round(total*f.edrain/100));
    if(sc.kiep&&total){const k=sc.kiep;const me=mainUnit(sc);const cut=Math.min(0.25,total/me.max*0.5);k.uy=Math.max(0.3,k.uy-cut);msg+=` (lôi uy −${Math.round(cut*100)}%)`;}
  }
  // tự thân
  if(f.block)u.st.block=(u.st.block||0)+Math.round(u.atk*f.block*lvM);
  if(f.eblock)u.st.block=(u.st.block||0)+Math.round(u.atk*f.eblock);
  if(f.heal)u.hp=Math.min(u.max,u.hp+Math.round(u.max*f.heal*lvM/100));
  if(f.eheal)u.hp=Math.min(u.max,u.hp+Math.round(u.max*(u.boss?0.07:0.1)));
  if(f.regen)u.st.regen=Math.max(u.st.regen||0,f.regen);
  if(f.rage)u.st.rage=(u.st.rage||0)+f.rage;
  if(f.evade)u.st.evade=(u.st.evade||0)+f.evade;
  if(f.cleanse){u.st.poison=0;u.st.burn=0;u.st.weak=0;}
  if(f.guard){u.st.block=(u.st.block||0)+Math.round(u.atk*0.9+u.max*0.06);const g=Math.round(u.maxMp*0.3);u.mp=Math.min(u.maxMp,u.mp+g);msg='Vận khí thủ thế'+(g?`, hồi ${g} linh lực`:'');}
  if(total)msg+=`: ${total}`+(hits>1?` (${hits} đòn)`:'');
  if(dod)msg+=` · né ${dod}`;
  if(f.p&&!total&&!dod&&hits)msg+=' · bị hộ thể chặn';
  if(isP&&sk.f&&!sc['_u'+sk.id]){sc['_u'+sk.id]=1;clog(sc,sk.f,'fl');}
  if(!isP){const V=(VERB[u.f]||VERB.vat);const it=sk.it;msg=(V[it]?T(V[it]):(VERB2[it]||'{e} ra tay')).replace('{e}',u.name)+(total?`: ${total}`:'')+(dod?' (né '+dod+')':'')+(f.p&&!total&&!dod?' · bị chặn':'');if(sk.fx.charge)msg=T((VERB[u.f]||VERB.vat).heavy).replace('{e}',u.name)+`: ${total}`;}
  clog(sc,(isP?'':'')+msg,u.side==='A'?'me':'en');
  finishAct(sc,u,sk);
}
function finishAct(sc,u,sk){
  if(u.hp>0){const from75=u.phase==='charge';toRecover(sc,u,skRec(sk));if(from75)u.pos=75;if(u.bonusPos){u.bonusPos=0;}}
  doneAct(sc,u);
  // thưởng né chuẩn: +8 điểm ở vòng chạy kế tiếp
  for(const x of sc.units)if(x.bonusPos&&x.phase==='run'){x.pos=Math.min(49,x.pos+x.bonusPos);x.bonusPos=0;}
}
function absorb(st,d){if(st.block>0){const a=Math.min(st.block,d);st.block-=a;d-=a;}return d;}
function dmgCalc(atk,rage,weak,def,vuln,power,mult,pierce){
  const raw=atk*power*mult*(1+0.12*(rage||0))*(weak?0.7:1)*(0.9+R()*0.2);
  let d=Math.max(raw*0.25,raw-def*0.7*(1-(pierce||0)));
  if(vuln)d*=1.3;return Math.max(1,Math.round(d));
}
function elemMult(skEl,enEl){const r=G.run,fx=aggFx();let m=1;
  if(r.root.els.includes(skEl))m*=1.25;
  m*=1+((fx.elP&&fx.elP[skEl])||0)/100;
  if(KHAC[skEl]===enEl)m*=1.5;else if(KHAC[enEl]===skEl)m*=0.8;
  return m;}
// ---------- lôi kiếp ----------
function kiepStrike(sc,k){
  const me=mainUnit(sc);
  if(G.meta.opt&&G.meta.opt.autoDodge){kiepHit(sc,k,'auto');return;}
  if(sc.skipDodge){kiepHit(sc,k,null);return;}
  sc.dodge={id:(sc.did=(sc.did||0)+1),uid:k.id,kiep:1,n:1,T:1.1,lit:true};sc.rev++;
}
function kiepHit(sc,k,off){
  const K=sc.kiep,me=mainUnit(sc);const i=K.done+1;
  let d=Math.round(me.max*(0.14+0.03*i)*K.uy);K.uy=1;
  let red=0;if(off==='auto')red=0.25*0.6;else if(off!=null&&Math.abs(off)<=0.09)red=0.5;else if(off!=null&&Math.abs(off)<=0.25)red=0.25;
  d=Math.round(d*(1-red));d=absorb(me.st,d);me.hp-=d;K.done++;
  clog(sc,`Đạo lôi thứ ${i}${K.waves>1?' (đợt '+K.wave+')':''} giáng xuống: ${d}`+(red?` (đỡ ${Math.round(red*100)}%)`:''),'en');
  doneAct(sc,k); // người đang tụ lực: waitSet rỗng khi kiếp vân giáng xong
  k.phase='run';k.pos=0;
  if(me.hp<=0){me.hp=0;down(sc,me);}
}
// ---------- kết thúc trận ----------
function combatContinue(){
  const r=G.run,sc=r.scene;const res=sc.over;const af=sc.after||{kind:'node'};
  if(af.kind==='bt'){btAfterStage(res);return;}
  if(res==='dead'){die(sc.en.n==='Tâm Ma'?'tamma':'combat',sc.en);return;}
  advanceTime(1);if(!G.run)return;
  if(af.kind==='place'){openPlace(r.at);const ps=r.scene;ps.msg=af.msg||[];if(res==='win'){ps.chips=applyE({tv:6,st:8});ps.msg.push('Kẻ phá quan đã nằm xuống. Ngươi ngồi lại, nhưng tâm cảnh khó mà tĩnh như trước.');}else{ps.msg.push('Ngươi bỏ động phủ mà chạy.');}return;}
  if(af.kind==='cross'){if(res==='win'){r.scene=null;doCross(af.k,'fight');}else{r.scene={type:'pass',id:r.at,back:r.at,k:af.k,text:'Ngươi bị đánh bật trở lại. Kẻ gác ải đứng chắn trên cổng, cười lạnh.'};}return;}
  if(af.kind==='ent'&&typeof entAfter==='function'){entAfter(af,res,sc);return;}
  const en=sc.en;const many=sc.units.filter(u=>u.side==='B').length;
  if(af.kind==='ev'){
    const e=EVMAP[af.ev.id];const out=resolveP(e,af.path);
    r.scene=af.ev;const esc=r.scene;
    if(res==='win'){
      const gain=applyE({tv:sc.elite?12:6,st:(sc.elite?15:6)*(many>1?1.4:1)},esc.v);
      const w=out.win||{t:'Đối thủ đã gục. Ngươi thở dốc, lau vết máu trên khóe miệng.'};
      doOutcome(w,[...af.path,'win'],gain);
    } else if(res==='lose'){
      doOutcome(out.lose||{t:'Ngươi thua. Đối phương thu tay, không truy cùng giết tận.',e:{tv:3}},[...af.path,'lose'],[]);
    } else {
      esc.story.push(pick(['Ngươi thoát thân, tim vẫn đập thình thịch.','Ngươi bỏ chạy, không ngoảnh lại.','Ngươi rút lui. Có những trận không đáng đánh.']));esc.phase='done';esc.chips=[];
    }
    return;
  }
  if(res==='flee'||res==='lose'){r.scene={type:'combat',back:sc.back};endScene();return;}
  if(af.kind==='boss'){r.bossKills++;r.bossDone[r.region]=1;bio(T(`Năm ${Math.floor(r.age)} tuổi, đánh bại ${en.n} ở ${r.place.n}.`));log(`Đánh bại ${en.n}.`);rewardScene('boss',en);return;}
  rewardScene(sc.elite?'elite':'normal',en,many);
}
function rememberKill(en){}
// ---------- tiện cho bot và kiểm thử ----------
function intentPreview(u){
  const sc=G.run.scene;const me=mainUnit(sc);const it=u.intent;const B=EN_SK[it];if(!B||!B.fx.p)return '';
  const p=B.fx.p;const d=Math.max(1,Math.round(Math.max(u.atk*p*(1+0.12*(u.st.rage||0))*(u.st.weak?0.7:1)*0.25,u.atk*p*(1+0.12*(u.st.rage||0))*(u.st.weak?0.7:1)-me.def*0.7)*(me.st.vuln?1.3:1)));
  return it==='multi'?d+'×'+(G.run.region>=2?3:2):String(d);
}
