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
  if(me.st.stance&&me.tl>=TL_BLOCK){me.tl-=TL_BLOCK;d=Math.round(d*(1-0.25));}
  if(me.st.stance&&me.phase==='guard')endStance(sc,me,null);
  let red=0;if(off==='auto')red=0.25*0.6;else if(off!=null&&Math.abs(off)<=0.09)red=0.5;else if(off!=null&&Math.abs(off)<=0.25)red=0.25;
  d=Math.round(d*(1-red));d=absorb(me.st,d);me.hp-=d;K.done++;
  clog(sc,`Đạo lôi thứ ${numVi(i)}${K.waves>1?' của đợt '+numVi(K.wave):''} giáng xuống, `+hitPh(d/Math.max(1,me.max),'ngươi')+(red?(red>=0.5?'. Ngươi đón đúng thời khắc, hóa giải được phần lớn lôi lực':'. Ngươi gồng mình chống đỡ, giảm bớt lôi lực'):'')+'.','en');
  doneAct(sc,k); // người đang tụ lực: waitSet rỗng khi kiếp vân giáng xong
  k.phase='run';k.pos=0;
  if(me.hp<=0){me.hp=0;down(sc,me);}
}
// ---------- kết thúc trận ----------
function combatContinue(){
  const r=G.run,sc=r&&r.scene;if(!sc||sc.type!=='combat'||!sc.over)return; // bấm hai lần hoặc màn chưa kịp vẽ lại
  const res=sc.over;const af=sc.after||{kind:'node'};
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

// ---------------- ĐỘT PHÁ: CHUẨN BỊ → XUNG QUAN → THIÊN KIẾP ----------------
const QNAME=['Phàm','Nhân đạo','Địa đạo','Thiên đạo'];
const QPRE=['','Nhân Đạo','Địa Đạo','Thiên Đạo'];
const QMUL=[1,1.06,1.13,1.22],QLIFE=[0,5,10,20];
const BT_BASE=[0.62,0.52,0.46,0.40,0.35];
function qOf(p){return p>=10?3:p>=6?2:p>=3?1:0;}
function qNext(p){return p<3?3:p<6?6:p<10?10:null;}
function qualName(realm,q){return (q?QPRE[q]+' ':'')+REALM[realm];}
function qMulAll(r){let m=1;for(let i=1;i<=Math.min(r.realm,4);i++)m*=QMUL[(r.quality||[])[i]||0];return m;}
function btTarget(){const r=G.run;return r.realm>=4?5:r.realm+1;}
function btStages(to){return to===1?[]:to===2?['tamma']:to===3?[{n:6}]:to===4?[{n:9},'tamma']:[{n:9,waves:3}];}
function btItems(){const r=G.run;return r.pills.map((p,i)=>({p,i})).filter(x=>PILL[x.p.id].bt&&(PILL[x.p.id].realm==null||PILL[x.p.id].realm===r.realm));}
function btEff(slots){
  const r=G.run;const o={rate:0,guard:0,kiepHp:0,kiepCut:0,dao:0};
  for(const i of slots){const it=r.pills[i];if(!it)continue;const b=PILL[it.id].bt;const m=PQM[it.q||0];
    if(b.rate)o.rate+=Math.round(b.rate*m);if(b.guard)o.guard=1;if(b.kiepHp)o.kiepHp+=b.kiepHp;if(b.kiepCut)o.kiepCut+=b.kiepCut;if(b.dao)o.dao+=b.dao;}
  return o;
}
function btRate(slots){
  const r=G.run,s=S();const e=btEff(slots||[]);
  const p=BT_BASE[Math.min(4,r.realm)]+(s.ngo-10)*0.012+(s.tam-10)*0.012-r.tamma*0.004+(r.btFail||0)*0.08+e.rate/100;
  return clamp(p,0.05,0.97);
}
function btChance(){return btRate([]);}
function canBreak(){const r=G.run;return (lkOn()?(lkTang()>=10||(lkTang()===9&&lkFull())):r.tv>=100)&&(r.realm<4||(r.realm===4&&r.region===4));}
function openPrep(n){const r=G.run;r.scene={type:'prep',slots:[],back:n.id,id:n.id};}
function prepToggle(i){
  const sc=G.run.scene;if(!sc||sc.type!=='prep')return;i=+i;
  const k=sc.slots.indexOf(i);if(k>=0){sc.slots.splice(k,1);return;}
  if(sc.slots.length>=5)return;if(!btItems().some(x=>x.i===i))return;sc.slots.push(i);
}
function prepView(){const sc=G.run.scene;const e=btEff(sc.slots);const p=G.run.dao+e.dao;return {rate:btRate(sc.slots),e,dao:p,q:qOf(p),next:qNext(p)};}
function prepStart(){
  const r=G.run,sc=r.scene;if(!sc||sc.type!=='prep'||!canBreak())return;
  const to=btTarget();const e=btEff(sc.slots);const p=btRate(sc.slots);
  // tiêu hao đúng một lần, trước khi gieo số
  const idx=sc.slots.slice().sort((a,b)=>b-a);const used=idx.map(i=>r.pills[i]).filter(Boolean).map(x=>PILL[x.id].n);for(const i of idx)r.pills.splice(i,1);
  sc.slots=[];
  advanceTime(HM);if(!G.run)return;
  const back=sc.back;
  r.bt={to,guard:e.guard,kiepHp:e.kiepHp,kiepCut:e.kiepCut,dao:e.dao,si:0,stages:btStages(to),hpLeft:null,used};
  if(R()<p){
    const txt=to===5?'Ngươi ngẩng nhìn trời. Mây đen đã kéo tới từ bốn phương, xoáy thành một con mắt khổng lồ.':T(['Linh khí cuộn trào, quan ải đầu tiên đã phá. Nhưng trời đất còn chưa chịu buông tha.','Xung quan thành công. Ngươi thở ra một hơi, rồi nghe thấy tiếng sấm rền phía chân trời.']);
    r.scene={type:'btres',back,ok:true,text:txt,chips:used.map(n=>chip('⚗️',n,'Đã dùng','')),stage:0};
    if(!r.bt.stages.length){btFinish();return;}
  } else btFail(back,used);
}
function btFail(back,used){
  const r=G.run;const g=r.bt&&r.bt.guard;
  r.btFail=(r.btFail||0)+1;r.dao-=2;
  let ch=(used||[]).map(n=>chip('⚗️',n,'Đã dùng',''));
  if(g){ch=ch.concat(applyE({tamma:5}));}else ch=ch.concat(applyE({hp:'-40%',tv:-25,tamma:10}));
  ch.push(chip('☯️','đạo cơ −2','Thất bại làm tổn hại đạo cơ','dn'));
  log('Đột phá thất bại.');r.bt=null;
  r.scene={type:'btres',back,ok:false,text:T(REST_T.btf)+(g?' May có vật hộ mệnh, kinh mạch không tổn hại.':''),chips:ch,done:1};
}
function btNextStage(){
  const r=G.run;const b=r.bt;if(!b)return;const st=b.stages[b.si];
  if(st==='tamma'){startCombat({k:'tamma'},{kind:'bt'});r.scene.noFlee=1;clog(r.scene,'Tâm ma kiếp: bóng tối trong lòng ngươi đứng dậy.','en');return;}
  let n=st.n-(b.kiepCut||0);n=Math.max(1,n);
  startCombat({kiep:{n,waves:st.waves||1,block:b.kiepHp}},{kind:'bt'});
}
function btAfterStage(res){
  const r=G.run,sc=r.scene,b=r.bt;const back=sc.back;
  const me=mainUnit(sc);
  if(res!=='win'){
    if(b&&b.guard){r.hp=1;r.scene=null;btFail(back,[]);r.scene.text='Ngươi gục giữa kiếp. Vật hộ mệnh vỡ tan, giữ lại cho ngươi một hơi thở. Đột phá thất bại.';return;}
    r.bt=null;die(b&&b.stages[b.si]==='tamma'?'tamma':'kiep',{n:'Thiên kiếp'});return;
  }
  if(sc.kiep)b.hpLeft=Math.min(b.hpLeft==null?1:b.hpLeft,me.hp/me.max);
  r.hp=Math.max(1,me.hp);b.si++;
  if(b.si<b.stages.length){r.scene={type:'btres',back,ok:true,text:'Một kiếp đã qua. Trời vẫn còn chưa yên.',chips:[],stage:b.si};return;}
  r.scene={type:'btres',back,ok:true,text:'',chips:[]};btFinish();
}
function btFinish(){
  const r=G.run,sc=r.scene,b=r.bt;const to=b.to;
  if(to===5){r.bt=null;victory();return;}
  let pts=r.dao+b.dao;const kiepBonus=b.hpLeft!=null&&b.hpLeft>=0.5;if(kiepBonus)pts+=2;
  const q=qOf(pts);
  r.realm=to;r.quality[to]=q;r.tv=0;r.btFail=0;r.tvMinor=0;r.dao=0;r.daoSk=0;r.daoPill=0;r.maxRealm=Math.max(r.maxRealm,r.realm);
  const s1=S();r.hp=s1.maxHp;r.mp=s1.maxMp;
  const name=qualName(to,q);
  sc.text=(T(REST_T.bt[to-1])+' '+['','Đạo cơ vững vàng hơn người thường.','Đạo cơ rắn như đá núi, trời đất cũng phải ghi nhận.','Thiên Đạo ban phẩm! Mưa hoa rơi khắp động phủ, mây lành ngũ sắc kéo tới.','Căn cơ hoàn mỹ, chân nguyên đặc quánh, vượt xa người thường.'][q]||'').trim();
  sc.ok=true;sc.done=1;
  sc.chips=[chip('☯️',name,'Đại cảnh giới mới.\nPhẩm chất: '+QNAME[q]+'\nHệ số chỉ số ×'+String(QMUL[q]).replace('.',',')+', thọ nguyên +'+QLIFE[q]+'%','up'),chip('⏳','thọ '+s1.life,'Thọ nguyên mới','up')];
  if(kiepBonus)sc.chips.push(chip('🌩️','đạo cơ +2','Qua thiên kiếp với hơn nửa khí huyết','up'));
  log(`Đột phá ${name}.`);bio(`Năm ${Math.floor(r.age)} tuổi, đột phá ${name} ở ${r.place.n}.`);
  ach(['','tc','kd','na','ht'][to]);if(q===3&&to===2)ach('vokhuyet');
  r.bt=null;sense();
}
function btContinue(){const r=G.run,sc=r.scene;if(r.bt&&!sc.done&&r.bt.si<r.bt.stages.length){btNextStage();return;}endScene();}
// điểm đạo cơ
function addDao(x,src){
  const r=G.run;if(!x)return 0;
  if(src==='skill'){if((r.daoSk||0)>=2)return 0;r.daoSk=(r.daoSk||0)+1;}
  if(src==='pill'){const room=4-(r.daoPill||0);x=Math.max(0,Math.min(x,room));r.daoPill=(r.daoPill||0)+x;}
  r.dao=(r.dao||0)+x;return x;
}

// ---------------- THƯỞNG ----------------
function genPicks(kind){
  const r=G.run,n=3+U('duyen');const out=[];const reg=r.region;
  const relT=clamp(reg+(kind==='boss'?1:0)+(kind==='elite'&&chance(.4)?1:0),0,4);
  for(let i=0;i<n;i++){
    let k;
    if(kind==='boss')k=i<2?'relic':pick(['relic','skill']);
    else if(kind==='elite')k=i===0?'relic':pick(G._lootBeast?['relic','pill','st']:['relic','skill','pill']);
    else k=pick(G._lootBeast?['pill','pill','st','st','relic']:['skill','pill','pill','st','relic']); // yêu thú, khôi lỗi không mang bí tịch
    if(k==='relic')out.push({k,rel:genRelic(relT)});
    else if(k==='skill'){let id,g=0;do{id=rollSkill(kind==='boss'?[1,2,3,4,4][reg]:null);}while(out.some(o=>o.id===id)&&g++<10);out.push({k,id});}
    else if(k==='pill')out.push({k,id:rollPill(),q:reg>=3?ri(1,2):reg>=1?ri(0,1):0});
    else out.push({k:'st',n:Math.max(1,Math.round(ri(18,30)*SC[reg]))});
  }
  return out;
}
function rewardScene(kind,en){
  {const E=en&&EN[en.k];G._lootBeast=kind!=='boss'&&!!E&&(E.f==='thu'||E.f==='vat');}
  const r=G.run;
  const base={normal:{tv:7,st:9},elite:{tv:15,st:22},boss:{tv:25,st:55}}[kind];
  const chips=applyE({st:base.st+ri(-3,4)}); // đánh nhau không cho tu vi: lịch luyện tính ở finishCombat
  {const af=r.scene&&r.scene.after;if(af&&af.quest)questWin(af.quest).forEach(c=>chips.push(c));}
  if(kind==='boss'){const s=S();r.hp=Math.min(s.maxHp,r.hp+Math.round(s.maxHp*0.5));r.mp=s.maxMp;}
  const picks=(kind!=='normal'||chance(.55))?genPicks(kind):[];
  const text=kind==='boss'?T(['{$e} ngã xuống, đất trời như lặng đi một nhịp. Ngươi đứng giữa chiến trường, gió thổi tung vạt áo.','Đòn cuối cùng. {$e} gục xuống, không còn đứng dậy. Ngươi thở ra một hơi dài, như trút được cả một vùng trời.'],{e:en.n})
    :T(['{$e} không còn động đậy. Ngươi lục lọi chiến trường.','Trận chiến kết thúc. Ngươi chỉnh lại y phục, nhặt nhạnh những gì còn dùng được.','{$e} gục xuống. Bụi lắng, máu thấm vào đất.','Một trận ác chiến. Ngươi thắng, nhưng không vui lắm.','Kết thúc nhanh gọn. {$e} thậm chí chưa kịp kêu.'],{e:en.n});
  if(kind==='boss'&&r.region>=4){chips.push(chip('☁️','cửa trời mở','Đạt Hóa Thần viên mãn, độ kiếp ở động phủ để phi thăng','item'));const p=gainPill('thiendao',2);if(p)chips.push(p);}
  if(kind==='boss'&&r.region<4&&!r.passes.includes(r.region+1)){r.passes.push(r.region+1);chips.push(chip('🎫','Lệnh bài thông quan','Trình ở quan ải để sang '+REG[r.region+1].n,'item'));}
  r.scene={type:'reward',kind,text,chips,picks,taken:-1,back:sceneBack()};
}
function takePick(i){
  const r=G.run,sc=r.scene;if(sc.taken>=0)return;const p=sc.picks[i];if(!p)return;sc.taken=i;let c;
  if(p.k==='relic'){r.relics.push(p.rel);clampHp();log(`Nhận được ${p.rel.name}.`);c=chip('🏺',p.rel.name,relicTip(p.rel),'item',p.rel.tier);}
  else if(p.k==='skill')c=gainSkill(p.id);
  else if(p.k==='pill')c=gainPill(p.id,p.q);
  else {r.st+=p.n;c=chip('💎','+'+p.n,'Linh thạch','up');}
  sc.chips=sc.chips.concat([c]);
}
function rewardContinue(){endScene();}

// ---------------- THỜI GIAN ----------------
// Đơn vị gốc: giờ game, lưu ở G.meta.world.t. Mọi thay đổi thời gian đi qua advanceTime(h).
const HD=24, HM=720, HY=8640;
const MONTH=['Giêng','Hai','Ba','Tư','Năm','Sáu','Bảy','Tám','Chín','Mười','Mười Một','Chạp'];
const CHI=['Tý','Sửu','Dần','Mão','Thìn','Tỵ','Ngọ','Mùi','Thân','Dậu','Tuất','Hợi'];
const PART={sang:{n:'sáng',i:'🌅'},chieu:{n:'chiều',i:'☀️'},toi:{n:'tối',i:'🌇'},dem:{n:'đêm',i:'🌙'}};
const SEASON={xuan:'xuân',ha:'hạ',thu:'thu',dong:'đông'};
function W(){return G.meta.world;}
function tYear(t){return 1000+Math.floor(t/HY);}
function tMonth(t){return Math.floor((t%HY)/HM);}
function tHour(t){return t%HD;}
function partOf(t){const h=tHour(t);return h>=5&&h<11?'sang':h>=11&&h<17?'chieu':h>=17&&h<21?'toi':'dem';}
function seasonOf(t){const m=tMonth(t)+1;return m<=3?'xuan':m<=6?'ha':m<=9?'thu':'dong';}
function gioName(t){return CHI[Math.floor(((Math.floor(tHour(t))+1)%24)/2)];}
function dateText(t){return `Năm ${tYear(t)}, tháng ${MONTH[tMonth(t)]}, giờ ${gioName(t)}`;}
function durH(h){if(h<24)return Math.max(1,Math.round(h))+' giờ';if(h<HM)return Math.round(h/24)+' ngày';if(h<HY)return Math.round(h/HM)+' tháng';return (Math.round(h/HY*10)/10).toString().replace('.',',')+' năm';}
let TICK_OUT=null; // gom "chuyện xảy ra trong lúc đó"
function advanceTime(h){
  const w=W(),out=[];
  if(!(h>0))return out;
  const outer=TICK_OUT;TICK_OUT=out;
  try{
    if(h<=48){w.t+=h;worldStep(h);}
    else{
      const fine=Math.min(h,30*HD);
      for(let d=0;d<fine-1e-9;d+=HD){const s=Math.min(HD,fine-d);w.t+=s;worldStep(s);if(!G.run&&G.screen==='over')break;}
      let rest=h-fine;const m=Math.floor(rest/HM);
      if(m>0){worldCoarse(m);worldCoarseEnts();if(G.run)director();}
      rest-=m*HM;if(rest>0){w.t+=rest;worldStep(Math.min(rest,HD));}
    }
    while(tYear(w.t)>=w.bangY){w.bangY+=10;if(G.run)publishBang();}
    const r=G.run;
    if(r){
      r.age=r.birthAge+(w.t-r.bornT)/HY;
      if(r.age>=S().life&&!(r.scene&&r.scene.type==='combat')){die('toahoa');}
    }
    if(G.run&&typeof timeHooks==='function')timeHooks(h);
  }finally{TICK_OUT=outer;if(outer)outer.push(...out);}
  return out;
}
function worldStep(h){
  const r=G.run;
  if(r){
    worldTick(h/HY);
    if(!(r.scene&&r.scene.type==='combat')){
      const s=S();r.rgH=(r.rgH||0)+s.maxHp*0.005*h;r.rgM=(r.rgM||0)+s.maxMp*0.02*h;
      const a=Math.floor(r.rgH),b=Math.floor(r.rgM);r.rgH-=a;r.rgM-=b;
      r.hp=Math.min(s.maxHp,r.hp+a);r.mp=Math.min(s.maxMp,r.mp+b);
    }
  }
  nodeRecover();
}
function worldCoarse(m){
  const w=W();
  for(let i=0;i<m;i++){
    w.t+=HM;
    if(G.run)worldTick(HM/HY);
    if(chance(.03))flipNode(); // chừng ba năm mới có một nơi đổi chủ hay gặp nạn
    nodeRecover();
  }
}
function nodeRecover(){
  const w=W();
  for(const R0 of w.regions)for(const n of R0.nodes){if(n.state==='ruin'&&w.t>=n.stateUntil){n.state='ok';n.stateUntil=0;if(n.type==='tran'||n.type==='thanh')chron(`${n.name} dần hồi sinh, khói bếp lại bốc lên.`);}}
}
function flipNode(){
  const w=W();const r=G.run;
  const pool=[];for(const R0 of w.regions)for(const n of R0.nodes)if(['tran','thanh','tong'].includes(n.type)&&n.state!=='ruin'&&(!r||n.id!==r.at))pool.push(n); // nơi đang hoang tàn thì không "gặp nạn" lần nữa
  if(!pool.length)return;const n=pick(pool);
  if(n.state==='ruin'){n.state='ok';n.stateUntil=0;chron(`${n.name} dần hồi sinh, khói bếp lại bốc lên.`);}
  else if(n.type==='tong'){const s=pick(w.sects);n.owner=s.n;chron(`Sơn môn ở ${n.name} đổi chủ, nay thuộc ${s.n}.`);}
  else {n.state='ruin';n.stateUntil=w.t+ri(3,6)*HY;chron(`${n.name} gặp nạn, thành hoang tàn.`);}
}
function chron(t){const w=W();w.chron.push({y:tYear(w.t),t});if(w.chron.length>60)w.chron.shift();if(TICK_OUT)TICK_OUT.push(t);if(G.run)pushNews(t,true);}
