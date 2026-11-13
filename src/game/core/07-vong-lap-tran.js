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
    else if(u.phase==='charge'||u.phase==='guard'){u.pos=Math.min(PHAT,u.pos+vRec(sc,u)*dt*CHG_SLOW);u.chargeT+=dt;if(u.phase==='guard'&&u.pos>=PHAT)endStance(sc,u,(u.ctrl==='player'?'Ngươi':u.name)+' không phải đỡ đòn nào, buông thế.');}
  }
  // người đang tụ lực: đủ điều kiện thì tung chiêu
  const ch=sc.units.find(u=>u.phase==='charge'&&u.hp>0&&u.pos>=PHAT);
  if(ch){sc.hold=true;sc.cur=ch.id;
    if(ch.ctrl==='player'&&!sc.kiep&&!(G.meta.opt&&G.meta.opt.autoQte)){sc.qte={uid:ch.id,id:(sc.qid=(sc.qid||0)+1)};sc.rev++;return;}
    runAct(sc,()=>fireCharge(sc,ch,1));return;}
  // ai chạm mốc 50
  const rd=sc.units.filter(u=>u.phase==='run'&&u.hp>0&&u.pos>=50);
  if(rd.length){
    rd.sort((a,b)=>(b.pos-a.pos)||(b.tp-a.tp)||((a.side==='A'?0:1)-(b.side==='A'?0:1))||(a.id-b.id));
    const u=rd[0];
    for(const x of rd.slice(1))x.pos=49.9;
    u.pos=50;u.phase='ready';u.burnedTurn=0;sc.cur=u.id;sc.hold=true;sc.rev++;
    if(u.kind==='kiep'){runAct(sc,()=>kiepStrike(sc,u));return;}
    if(u.ctrl==='player')return; // chờ người chơi chọn chiêu
    sc.aiWait=0.3;
  }
}
// tắt hold ở đúng một chỗ
function runAct(sc,fn){
  try{fn();}
  finally{
    if(sc.dodge||sc.qte||sc.critQ)return; // còn chờ thao tác
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
  if(d){u.hp-=d;clog(sc,(u.isMain?'Ngươi':u.name)+' '+T(['bị độc hỏa gặm nhấm kinh mạch','bị độc khí và lửa thiêu hành hạ','bị độc hỏa làm khí huyết hao mòn'])+'.','dot');if(u.hp<=0){down(sc,u);checkEnd(sc);return;}}
  let reg=(fx.regenHp||0)+(u.st.regen>0?6:0);if(u.st.regen>0)u.st.regen--;
  if(reg)u.hp=Math.min(u.max,u.hp+Math.round(u.max*reg/100));
  if(u.maxMp)u.mp=Math.min(u.maxMp,u.mp+Math.round(u.maxMp*(0.05+(fx.regenMp||0)/100)));
  if(u.tl!=null)u.tl=Math.min(100,u.tl+TL_REGEN);
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
  clog(sc,u.isMain?'Ngươi ngã xuống, trước mắt tối sầm.':pick(u.f==='vat'?[`${u.name} vỡ vụn, không còn động đậy.`,`${u.name} đổ sập xuống, linh quang trên thân tắt hẳn.`]:u.f==='quy'?[`${u.name} rú lên một tiếng rồi tan thành làn khói đen.`,`Âm khí quanh ${u.name} tan hết, chỉ còn lại một nắm tro lạnh.`]:[`${u.name} đổ gục xuống, không gượng dậy nổi.`,`${u.name} ngã xuống, hơi thở tắt dần.`,`${u.name} lảo đảo mấy bước rồi gục hẳn.`]),u.side==='A'?'en':'win');
}
function checkEnd(sc){
  if(sc.over)return;const me=mainUnit(sc);
  if(me.hp<=0){
    if(sc.spar){me.hp=1;sc.over='lose';clog(sc,'Ngươi gục xuống. Trận đấu kết thúc.','en');}
    else sc.over='dead';
    finishCombat(sc);return;}
  if(sc.kiep){const k=sc.kiep;if(k.done>=k.n){if(k.wave<k.waves){k.wave++;k.done=0;me.hp=Math.min(me.max,me.hp+Math.round(me.max*0.3));clog(sc,`Đợt lôi thứ ${numVi(k.wave)} kéo tới. Ngươi kịp hồi lại một hơi.`,'en');}else{sc.over='win';clog(sc,'Mây kiếp tan. Ngươi vẫn đứng đó.','win');finishCombat(sc);}}return;}
  if(!alive(sc,'B').length){sc.over='win';finishCombat(sc);}
}
function finishCombat(sc){
  sc.done=true;sc.hold=true;sc.dodge=null;sc.qte=null;sc.critQ=null;syncMain(sc);
  const r=G.run;
  // đồng đội: ghi lại khí huyết
  for(const u of sc.units)if(u.ally!=null){const p=(r.party||[]).find(x=>x.id===u.ally);if(p)p.hp=Math.max(0,u.hp);}
  if(r.party)r.party=r.party.filter(p=>p.hp>0);
  if(sc.over==='win'&&!sc.kiep){r.kills+=sc.units.filter(u=>u.side==='B').length;G.meta.kills+=1;if(G.meta.kills>=100)ach('tram');
    clog(sc,pick(['Bụi đất lắng xuống. Trận chiến đã ngã ngũ.','Sát khí tan dần. Ngươi vẫn đứng vững giữa chiến trường.']),'win');
    const fx=aggFx();if(fx.healAfter){const s=S();r.hp=Math.min(s.maxHp,r.hp+Math.round(s.maxHp*fx.healAfter/100));}
    if(sc.after&&sc.after.nemesis)ach('baothu');}
}
// ---------- người chơi ra lệnh ----------
function readyPlayer(sc){const u=sc&&sc.cur&&U_(sc,sc.cur);return u&&u.ctrl==='player'&&u.phase==='ready'&&!sc.dodge&&!sc.qte&&!sc.critQ?u:null;}
function pSkill(id){
  const r=G.run;if(id==='_atk')return {sk:BASIC,lv:1};if(id==='_guard')return {sk:GUARD_SK,lv:1};if(id==='_wait')return {sk:WAIT_SK,lv:1};if(id==='_block')return {sk:BLOCK_SK,lv:1};
  const own=r.skills.find(x=>x.id===id);return own?{sk:SK[id],lv:own.lv}:null;
}
function atkSlots(){const r=G.run;const at=r.skills.filter(k=>SK[k.id].fx.p).map(k=>k.id);let L=(r.atkSlots||[]).filter(id=>at.includes(id));for(const id of at){if(L.length>=3)break;if(!L.includes(id))L.push(id);}return L.slice(0,3);}
function defSkills(){return G.run.skills.filter(k=>!SK[k.id].fx.p).map(k=>k.id);}
function toggleAtkSlot(id){const r=G.run;let L=atkSlots();if(L.includes(id))L=L.filter(x=>x!==id);else{if(L.length>=3)L.shift();L.push(id);}r.atkSlots=L;}
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
  runAct(sc,()=>{u.hp=G.run.hp;u.mp=G.run.mp;clog(sc,'Ngươi nuốt vội '+m+', dược lực lan khắp kinh mạch.','me');toRecover(sc,u,0.8);doneAct(sc,u);});return true;
}
function playerFlee(){
  const sc=G.run.scene;const u=readyPlayer(sc);if(!u||sc.boss||sc.kiep||sc.noFlee)return false;
  const s=S();let p=clamp(0.35+s.tp*0.02,0.2,0.85);if(sc.elite)p*=0.6;if(sc.fleeSure)p=1;
  runAct(sc,()=>{if(chance(p)){sc.over='flee';clog(sc,'Ngươi chớp thời cơ rút lui, thoát khỏi vòng chiến.','me');finishCombat(sc);}else{clog(sc,'Ngươi định rút lui nhưng bị chặn đường!','me');toRecover(sc,u,1);doneAct(sc,u);}});return true;
}
// đỡ đòn: giảm khoảng 20–30%, tùy chênh lệch cảnh giới và lực chiến hai bên
function power(u){return Math.sqrt(Math.max(1,u.max)*Math.max(1,(u.atk+(u.matk||u.atk))/2+(u.def||0)));}
function blockCut(att,def){const rd=(def.realm||0)-(att.realm||0);return clamp(0.25+0.03*rd+0.08*Math.log(power(def)/power(att)),0.15,0.35);}
// hết thế đỡ: chạy tiếp từ chỗ đang đứng về mốc cuối
function endStance(sc,u,msg){u.st.stance=0;u._blk=0;u.phase='recover';u.rec=BLOCK_SK.rec;u.pending=null;u.waitSet=[];u.chargeT=0;if(u.pos<50)u.pos=50;if(msg)clog(sc,msg,'fl');sc.rev=(sc.rev||0)+1;}
// ra chiêu xong: nhảy thẳng tới mốc phát lực rồi chạy dần về mốc cuối
function toRecover(sc,u,rec){u.phase='recover';u.rec=rec||1;if(u.pos<PHAT)u.pos=PHAT;u.pending=null;u.waitSet=[];u.chargeT=0;}
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
  const cost=skillCost(sk);u.st.stance=0;
  if(u.ctrl==='player'){u.mp-=cost;if(sk.fx.selfHp)u.hp=Math.max(1,u.hp-Math.round(u.max*sk.fx.selfHp/100));}
  if(sk.fx.stance){
    // đỡ đòn: chạy dần từ mốc ra chiêu tới mốc phát lực; trong quãng đó bị đánh thì đỡ được một lần
    u.phase='guard';u.pos=50;u.rec=1;u.chargeT=0;u.pending=null;u.st.stance=1;u._blk=0;u.waitSet=[];
    clog(sc,(u.ctrl==='player'?'Ngươi':u.name)+' thu thế, vận khí hộ thân chờ đối phương ra tay.',u.side==='A'?'me':'en');doneAct(sc,u);return;
  }
  if(sk.fx.charge){
    // vào tụ lực: nhảy tới 75, chờ mọi kẻ địch còn sống hành động xong
    // tụ lực: chạy dần từ mốc ra chiêu tới mốc phát lực, tới nơi thì tung chiêu
    u.phase='charge';u.pos=50;u.rec=1;u.chargeT=0;u.pending={sk,lv,tid};u.waitSet=[];
    clog(sc,u.ctrl==='player'?'Ngươi hít sâu một hơi, linh lực cuồn cuộn dồn về, chuẩn bị tung '+sk.n+'…':u.name+' hít sâu một hơi, linh lực cuồn cuộn dồn về, chuẩn bị tung một đòn sát thủ…',u.side==='A'?'me':'en');
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
  if(hasDmg(sk)&&!tg.length){clog(sc,(u.ctrl==='player'?'Ngươi':u.name)+' đánh vào khoảng không, chiêu thức tan biến.',u.side==='A'?'me':'en');finishAct(sc,u,sk);return;}
  const me=mainUnit(sc);
  const autoD=G.meta.opt&&G.meta.opt.autoDodge;
  // nhắm vào nhân vật người chơi: hiện vòng né
  if(hasDmg(sk)&&tg.includes(me)&&u.side==='B'&&!autoD&&!sc.skipDodge){
    const n=Math.min(3,f.h||1);
    sc.dodge={id:(sc.did=(sc.did||0)+1),uid:u.id,sk,lv,tids:tg.map(x=>x.id),qm,n,T:u.phase==='charge'?1.1:0.8,lit:false};sc.rev++;return;
  }
  let ao=autoD?'auto':null;if(ao&&tg.includes(me)&&u.side==='B'){if(me.tl>=TL_DODGE)me.tl-=TL_DODGE;else ao=[];}
  resolveSkill(sc,u,sk,lv,tg,qm,ao);
}
// offs: mảng độ lệch (giây) cho tối đa 3 nhát đầu; null = không nhấn
function dodgeResolve(offs){
  const sc=G.run&&G.run.scene;if(!sc||!sc.dodge)return;const d=sc.dodge;sc.dodge=null;
  const u=U_(sc,d.uid);
  runAct(sc,()=>{
    if(d.kiep){kiepHit(sc,u,offs&&offs[0]);return;}
    const me=mainUnit(sc);if(Array.isArray(offs))offs=offs.map(o=>{if(o==null)return null;if(me.tl>=TL_DODGE){me.tl-=TL_DODGE;return o;}return null;});
    const tg=d.tids.map(i=>U_(sc,i)).filter(x=>x&&x.hp>0);
    if(!tg.length){finishAct(sc,u,d.sk);return;}
    resolveSkill(sc,u,d.sk,d.lv,tg,d.qm,offs||[]);
  });
}
function dodgeP(att,def,off,isMain){
  // tỉ lệ né dựa vào Né của bên bị đánh và Chính xác của bên đánh
  const base=clamp(0.35+(def.ne-att.cx)*0.025,0.05,0.80);
  if(!isMain)return {p:base*0.5,q:null};
  if(off==='auto')return {p:base*0.8,q:'kha'};
  if(off==null||Math.abs(off)>0.25)return {p:0,q:null}; // không bấm hoặc bấm hụt: không né được
  return {p:1,q:Math.abs(off)<=0.09?'chuan':'kha'}; // bấm trúng nhịp: chắc chắn né
}
function resolveSkill(sc,u,sk,lv,tg,qm,offs){
  const f=sk.fx,isP=u.ctrl==='player';const s=isP?S():null;const fx=isP?s.fx:{};
  const lvM=1+0.25*((lv||1)-1);const who=isP?'Ngươi':u.name;
  let total=0,hits=0,dod=0,blk=0,crits=0,stunL=[],msg='';sc._dq=sc._dq||[];for(const t of tg)t._blk=0;
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
        if(ev){dod++;cfx(sc,{k:'dodge',id:t.id});if(t.isMain&&q==='chuan')t.bonusPos=8;continue;}
        let mult=lvM*qm*(f.aoe?0.6:1);
        if(isP){mult*=elemMult(sk.el,t.el);if(f.bonusIf==='dot'&&(t.st.poison>0||t.st.burn>0))mult*=1.5;if(fx.execute&&t.hp<t.max*0.3)mult*=1+fx.execute/100;}
        else if(KHAC[u.el]===t.el)mult*=1.25;
        const magic=(sk.dt?sk.dt==='phep':(!isP&&(u.f==='quy'||u.f==='vat')));const av=magic?(u.matk||u.atk):u.atk;
        const crit=u._critF!=null?u._critF:chance(((u.crit||5)+(f.crit||0))/100);if(crit){mult*=Math.max(1.1,((u.critDmg||150)-(t.hoTam||0))/100);crits++;}
        let d=dmgCalc(av,u.st.rage,u.st.weak,t.def,t.st.vuln,f.p,mult,f.pierce);d=crushD(u,t,d);
        if(t.st.stance){if(!t._blk){if((t.tl==null?100:t.tl)>=TL_BLOCK){if(t.tl!=null)t.tl-=TL_BLOCK;t._blk=1;blk++;}else t._blk=2;}if(t._blk===1)d=Math.max(1,Math.round(d*(1-blockCut(u,t))));}
        d=absorb(t.st,d);t.hp-=d;total+=d;hits++;onHit(sc,u,t,d,crit,t._blk===1,sk);
        if(t.isMain&&d>0){const fx2=S().fx;if(fx2.reflect){u.hp-=Math.round(d*fx2.reflect/100);if(u.hp<=0)down(sc,u);}}
        if(isP){if(fx.poisonHit)t.st.poison=(t.st.poison||0)+Math.round(u.atk*fx.poisonHit);if(fx.burnHit)t.st.burn=(t.st.burn||0)+Math.round(u.atk*fx.burnHit);}
        // phá tụ lực
        if(t.phase==='charge'&&d>=t.max*0.15&&!(t.pending&&t.pending.sk.fx.steady)){clog(sc,`Thế tụ lực của ${t.isMain?'ngươi':t.name} bị đánh tan!`,t.side==='A'?'en':'me');toRecover(sc,t,1);t.pos=75;doneAct(sc,t);}
        if(t.hp<=0){down(sc,t);checkEnd(sc);if(sc.over)break;}
      }
      if(sc.over)break;
      // trạng thái lên mục tiêu
      if(t.hp>0&&!t.immune&&crushPair(u,t)>=0){
        if(f.poison)t.st.poison=(t.st.poison||0)+Math.round(u.atk*f.poison*lvM);
        if(f.epoison&&!(t.isMain&&S().fx.poisonImm))t.st.poison=(t.st.poison||0)+Math.round(u.atk*f.epoison);
        if(f.burn)t.st.burn=(t.st.burn||0)+Math.round(u.atk*f.burn*lvM);
        if(f.eburn)t.st.burn=(t.st.burn||0)+Math.round(u.atk*f.eburn);
        if(f.weak)t.st.weak=Math.max(t.st.weak||0,f.weak);
        if(f.vuln)t.st.vuln=Math.max(t.st.vuln||0,f.vuln);
        const stunC=(f.stun||0)+(isP?(fx.stunP||0):0);
        if(stunC&&chance(stunC/100*(t.boss?0.5:1))){t.stunT=STUN_S;stunL.push(t.isMain?'ngươi':t.name);
          if(t.phase==='charge'&&!(t.pending&&t.pending.sk.fx.steady)){toRecover(sc,t,1);t.pos=75;clog(sc,`${t.isMain?'Ngươi':t.name} choáng váng, linh lực đang tụ tản mát hết.`,'fl');}
          doneAct(sc,t);}
      }
    }
    for(const t of tg)if(t.st.stance&&t.phase==='guard'&&t._blk&&t.hp>0)endStance(sc,t,null);
    if(total&&(f.drain||(isP&&fx.drain)))u.hp=Math.min(u.max,u.hp+Math.round(total*((f.drain||0)+(isP?fx.drain||0:0))/100));
    if(total&&f.edrain)u.hp=Math.min(u.max,u.hp+Math.round(total*f.edrain/100));
    if(sc.kiep&&total){const k=sc.kiep;const me=mainUnit(sc);const cut=Math.min(0.25,total/me.max*0.5);k.uy=Math.max(0.3,k.uy-cut);msg+=', kiếp uy yếu bớt';}
  }
  // tự thân
  const hp0=u.hp;
  if(f.block)u.st.block=(u.st.block||0)+Math.round(u.atk*f.block*lvM);
  if(f.eblock)u.st.block=(u.st.block||0)+Math.round(u.atk*f.eblock);
  if(f.heal)u.hp=Math.min(u.max,u.hp+Math.round(u.max*f.heal*lvM/100));
  if(f.eheal)u.hp=Math.min(u.max,u.hp+Math.round(u.max*(u.boss?0.07:0.1)));
  if(f.regen)u.st.regen=Math.max(u.st.regen||0,f.regen);
  if(f.rage)u.st.rage=(u.st.rage||0)+f.rage;
  if(f.evade)u.st.evade=(u.st.evade||0)+f.evade;
  if(f.cleanse){u.st.poison=0;u.st.burn=0;u.st.weak=0;}
  let guardG=0;
  if(f.guard){u.st.block=(u.st.block||0)+Math.round(u.atk*0.9+u.max*0.06);const g=Math.round(u.maxMp*0.3);u.mp=Math.min(u.maxMp,u.mp+g);guardG=g;}
  if(f.stance)u.st.stance=1;
  const tgN=cbTgName(tg),tgR=total/Math.max(1,tg.reduce((a,t)=>a+(t.max||0),0));
  msg=cbNarr({u,sk,f,isP,tgN,r:tgR,total,hits,dod,blk,crits,stunL,kiep:!!(tg[0]&&tg[0].kind==='kiep'),tf:tg[0]&&tg[0].f,guardG,heal:u.hp>hp0});
  if(u.hp>hp0)cfx(sc,{k:'heal',id:u.id,d:Math.round(u.hp-hp0)});
  if(f.guard||f.block||f.eblock)cfx(sc,{k:'shield',id:u.id});
  {const q=sc._dq;sc._dq=null;if(isP&&sk.f&&!sc['_u'+sk.id]){sc['_u'+sk.id]=1;clog(sc,sk.f,'fl');}clog(sc,msg,u.side==='A'?'me':'en');for(const [t,c] of q||[])clog(sc,t,c);}
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