// ĐỢT 7.1: từ vựng hiệu ứng chiêu mới cho 48 chiêu nghề tu lõi (HN C §10 P.3). Bảng ánh xạ: docs/thiet-ke/anh-xa-fx.md; chữ: content/text/fx-moi.json
// Mỗi khoá một phần xử lý nhỏ, có dbg('fx.<khoá>'). Khoá có sẵn (p, block, heal, drain, weak, stun, cleanse, evade, selfHp, aoe…) giữ nguyên.
// Trước đòn: vsCharge, fOnly, fromHide, needTrap, pierceBlock · Sau đòn lên mục tiêu: hpDmg, breakCharge, mark, markWeak, slow, backlash
// Tự thân: blockH, blockM (lowHp), selfWeak, cutT, curePoi, poiStop, hide, cxT, fleeUp · Phe mình: cover, allyCover, sumCover, allyRage, allyHeal
// Gọi / thu: summon, unsummon (mpBack) · Mặt trận: trap, breakAll, dispel · Chiêu cần mục tiêu mà không gây sát thương: tgt · Hồi chiêu: cd (số lần ra tay của chủ)
const FXM_CAP=0.3;
let skLockRaw=null; // hộ thể từ nguồn mới không quá 30% khí huyết tối đa trong trận thường (C P.5)
function fxmT(k,a){return contentText('fxm.'+k,a);}
function fxmWho(u){return u.isMain?'Ngươi':u.name;}
function fxmLog(sc,u,t){clog(sc,t,u.side==='A'?'me':'en');}
function fxmAllies(sc,u){return alive(sc,u.side).filter(x=>x!==u);}
function fxmSum(sc,u,k){return sc.units.find(x=>x.sumBy===u.id&&!x.gone&&x.hp>0&&(!k||x.sumK===k));}
function fxmBeast(sc,u){return fxmAllies(sc,u).find(x=>x.f==='thu'&&!x.sumBy)||fxmSum(sc,u,'linh');}
function fxmBlock(u,add){const cap=Math.round(u.max*FXM_CAP);const before=u.st.block||0;u.st.block=Math.max(before,Math.min(cap,before+Math.round(add)));return u.st.block-before;}
// ---------- hồi chiêu ----------
function skCd(id){const sc=G.run&&G.run.scene;return sc&&sc.type==='combat'&&sc._cd?(sc._cd[id]|0):0;}
{const _pa=playerAct;playerAct=function(id,tid){if(id&&id[0]!=='_'&&skCd(id)>0){dbg('fx.cd',{id,left:skCd(id)});return false;}return _pa.apply(this,arguments);};}
{const _sl=skLocked;skLocked=function(id){return skCd(id)>0||_sl.apply(this,arguments);};
  skLockToggle=function(id){const r=G.run;if(!r||!SK[id])return;r.skLock=r.skLock||{};r.skLock[id]=_sl(id)?0:1;};
  skLockRaw=_sl;}
{const _fa=finishAct;finishAct=function(sc,u,sk){if(u&&u.isMain&&sc){sc._cd=sc._cd||{};for(const k in sc._cd)if(sc._cd[k]>0)sc._cd[k]--;
    if(sk&&sk.fx&&sk.fx.cd>1)sc._cd[sk.id]=sk.fx.cd-1;}
  return _fa.apply(this,arguments);};}
// ---------- hộ thể giảm / đỡ thay (absorb nhận st của bên bị đánh) ----------
{const _ab=absorb;absorb=function(st,d){
  if(st&&st.cutT&&st.cutT.n>0&&d>0){d=Math.max(1,Math.round(d*(1-st.cutT.v)));dbg('fx.cutT',{d});}
  if(st&&st.cover&&d>0){const sc=G.run&&G.run.scene;const c=st.cover;st.cover=null;const P=sc&&U_(sc,c.by);
    if(P&&P.hp>0&&!P.gone){let part=Math.round(d*c.p);let take=Math.round(part*(1-(c.cut||0)));
      if(c.od&&take>P.hp){const over=take-P.hp;take=P.hp;d=d-part+Math.round(over*c.od);}else d=d-part;
      P.hp-=take;fxmLog(sc,P,fxmT('cover',[P.isMain?'Ngươi':P.name]));dbg('fx.cover',{by:P.name,take,left:d});
      if(c.dis||P.hp<=0){if(P.sumBy){P.gone=1;P.hp=0;P.phase='down';}else if(P.hp<=0)down(sc,P);}
      d=Math.max(0,d);}}
  return _ab.call(this,st,d);};}
// ---------- mỗi lượt của một bên: hết hạn trạng thái mới ----------
{const _oz=onZero;onZero=function(sc,u){
  const st=u.st||{};let keep=null;if(st.poiStop>0&&st.poison>0){keep=st.poison;st.poison=0;}
  _oz.apply(this,arguments);
  if(keep!=null){u.st.poison=keep;u.st.poiStop--;dbg('fx.poiStop',{left:u.st.poiStop});}else if(u.st.poiStop>0)u.st.poiStop--;
  if(u.st.cutT&&u.st.cutT.n>0)u.st.cutT.n--;
  if(u.st.mark>0)u.st.mark--;if(u.st.hide>0)u.st.hide--;
  if(u.st.cxT){u.cx-=u.st.cxT;u.st.cxT=0;}
  if(u.isMain&&sc.trap&&sc.trap.n>0){sc.trap.n--;if(!sc.trap.n){sc.trap=null;fxmLog(sc,u,fxmT('trapHet'));}}
  if(u.sumBy&&u.ttl!=null){u.ttl--;if(u.ttl<=0&&u.hp>0){u.gone=1;u.hp=0;u.phase='down';fxmLog(sc,u,fxmT('sumHet',[u.name]));dbg('fx.summon',{het:u.name});}}};}
// ---------- rút lui ----------
{const _pf=playerFlee;playerFlee=function(){const sc=G.run&&G.run.scene;if(!sc||!sc.fleeB)return _pf.apply(this,arguments);
  const b=sc.fleeB;sc.fleeB=0;const sure=sc.fleeSure;if(chance(b/100))sc.fleeSure=1;dbg('fx.fleeUp',{b,sure:!!sc.fleeSure});
  try{return _pf.apply(this,arguments);}finally{if(G.run&&G.run.scene===sc)sc.fleeSure=sure;}};}
// ---------- triệu hồi ----------
function fxmSummon(sc,u,o,lvM){const old=fxmSum(sc,u,o.k);if(old){old.gone=1;old.hp=0;old.phase='down';}
  const fx=u.isMain?aggFx():{};const hpM=1+((o.k==='khoi'?fx.sumHp:0)||0)/100;const ttl=(o.n||3)+((o.k==='linh'?fx.sumT:0)||0);
  const mk=Math.round((u.matk||u.atk)*o.atk*lvM);
  const x={realm:u.realm||0,sub:'',matk:mk,critDmg:150,hoTam:0,id:sc.nid++,side:u.side,ctrl:'ai',sumBy:u.id,sumK:o.k,ttl,name:fxmT('sum.'+o.k),icon:o.k==='khoi'?'🪆':'👻',el:'vo',f:'vat',
    hp:Math.round(u.max*o.hp*hpM),max:Math.round(u.max*o.hp*hpM),mp:0,maxMp:0,atk:mk,def:Math.round((u.def||0)*0.5),tp:u.tp||8,cx:u.cx||10,ne:Math.round((u.ne||8)*0.6),hoi:10,crit:5,
    pat:['atk','atk','heavy'],pi:0,st:{},pos:0,phase:'run',pending:null,waitSet:[],stunT:0,rec:1,chargeT:0};
  sc.units.push(x);sc.rev=(sc.rev||0)+1;fxmLog(sc,u,fxmT('sumRa',[x.name]));dbg('fx.summon',{k:o.k,hp:x.hp,atk:x.atk,ttl});return x;}
// ---------- các phần xử lý sau đòn ----------
function fxmAfter(sc,u,sk,tg,pre){const f=sk.fx||{};const isP=u.isMain;const t=tg&&tg[0];const lvM=pre.lvM;
  if(t&&t.hp>0&&!t.immune){
    if(f.hpDmg){const d=Math.max(1,Math.round(u.max*f.hpDmg));t.hp-=d;dbg('fx.hpDmg',{d});cfx(sc,{k:'hit',id:t.id,from:u.id,d,crit:0,blk:0,el:'vo',big:0});if(t.hp<=0){down(sc,t);checkEnd(sc);}}
    if(t.hp>0&&f.breakCharge&&t.phase==='charge'&&!(t.pending&&t.pending.sk.fx.steady)){toRecover(sc,t,1);t.pos=75;fxmLog(sc,u,fxmT('phaTu',[fxmWho(t)]));dbg('fx.breakCharge',{t:t.name});}
    if(t.hp>0&&f.markWeak&&pre.marked){t.st.weak=Math.max(t.st.weak||0,f.markWeak);dbg('fx.markWeak',{t:t.name});}
    if(t.hp>0&&f.mark){t.st.mark=Math.max(t.st.mark||0,f.mark+1);fxmLog(sc,u,fxmT('mark',[fxmWho(t)]));dbg('fx.mark',{t:t.name});}
    if(t.hp>0&&f.slow&&(t.phase==='run'||t.phase==='recover')){t.pos=Math.max(0,(t.pos||0)-Math.round(f.slow/2));dbg('fx.slow',{t:t.name,pos:t.pos});}
    if(f.backlash&&(t.realm||0)>=(u.realm||0)+2){u.hp=Math.max(1,u.hp-Math.round(u.max*f.backlash/100));fxmLog(sc,u,fxmT('phanNiem'));dbg('fx.backlash',{});}}
  if(sc.over)return;
  if(f.selfWeak){u.st.weak=Math.max(u.st.weak||0,f.selfWeak);dbg('fx.selfWeak',{});}
  if(f.blockH){let v=u.max*f.blockH*lvM;if(f.lowHp&&u.hp>u.max*f.lowHp)v*=0.5;const g=fxmBlock(u,v);dbg('fx.blockH',{g});if(g)cfx(sc,{k:'shield',id:u.id});}
  if(f.blockM){const g=fxmBlock(u,(u.matk||u.atk)*f.blockM*lvM);dbg('fx.blockM',{g});if(g)cfx(sc,{k:'shield',id:u.id});}
  if(f.cutT){u.st.cutT={v:f.cutT[0],n:f.cutT[1]};dbg('fx.cutT',{v:f.cutT[0]});}
  if(f.curePoi&&u.st.poison>0){u.st.poison=Math.floor(u.st.poison*(1-f.curePoi));dbg('fx.curePoi',{left:u.st.poison});}
  if(f.poiStop&&u.st.poison>0){u.st.poiStop=f.poiStop;fxmLog(sc,u,fxmT('khoaDoc'));dbg('fx.poiStop',{n:f.poiStop});}
  if(f.hide){u.st.hide=f.hide+1;dbg('fx.hide',{n:f.hide});}
  if(f.cxT){u.st.cxT=(u.st.cxT||0)+f.cxT;u.cx=(u.cx||0)+f.cxT;dbg('fx.cxT',{});}
  if(f.fleeUp){sc.fleeB=f.fleeUp;fxmLog(sc,u,fxmT('fleeUp'));dbg('fx.fleeUp',{v:f.fleeUp});}
  if(f.cover){const L=fxmAllies(sc,u).sort((a,b)=>a.hp/a.max-b.hp/b.max);const a=L[0];
    if(a){a.st.cover={by:u.id,p:f.cover,cut:0.25};fxmLog(sc,u,fxmT('ganh',[a.name]));}else{u.st.cutT={v:0.25,n:1};fxmLog(sc,u,fxmT('ganhMinh'));}dbg('fx.cover',{a:a&&a.name});}
  if(f.allyCover){const b=fxmBeast(sc,u);if(b){u.st.cover={by:b.id,p:f.allyCover,cut:0.3};fxmLog(sc,u,fxmT('hoChu',[b.name]));}else fxmLog(sc,u,fxmT('khongThu'));dbg('fx.allyCover',{b:b&&b.name});}
  if(f.sumCover){const s=fxmSum(sc,u);if(s){u.st.cover={by:s.id,p:1,cut:0,od:0.2,dis:1};fxmLog(sc,u,fxmT('sumGanh',[s.name]));}else fxmLog(sc,u,fxmT('khongSum'));dbg('fx.sumCover',{s:s&&s.name});}
  if(f.allyRage){const a=f.allyK==='khoi'?fxmSum(sc,u,'khoi'):fxmBeast(sc,u);if(a){a.st.rage=(a.st.rage||0)+f.allyRage;fxmLog(sc,u,fxmT('dan',[a.name]));}else fxmLog(sc,u,fxmT(f.allyK==='khoi'?'khongKhoi':'khongThu'));dbg('fx.allyRage',{a:a&&a.name});}
  if(f.allyHeal){const a=fxmBeast(sc,u);if(a){const m=1+((isP?aggFx().petHeal:0)||0)/100;const g=Math.round(a.max*f.allyHeal/100*m);a.hp=Math.min(a.max,a.hp+g);cfx(sc,{k:'heal',id:a.id,d:g});fxmLog(sc,u,fxmT('chungMach',[a.name]));}else fxmLog(sc,u,fxmT('khongThu'));dbg('fx.allyHeal',{a:a&&a.name});}
  if(f.summon)fxmSummon(sc,u,f.summon,lvM);
  if(f.unsummon){const s=fxmSum(sc,u,f.unsummon===1?null:f.unsummon);if(s){s.gone=1;s.hp=0;s.phase='down';fxmLog(sc,u,fxmT('thuVe',[s.name]));
      if(f.mpBack&&f.unsummon===1){const base=SK.sk06a;const g=Math.round(skillCost(base)*f.mpBack);u.mp=Math.min(u.maxMp,u.mp+g);}sc.rev=(sc.rev||0)+1;}
    else fxmLog(sc,u,fxmT('khongSum'));dbg('fx.unsummon',{s:s&&s.name});}
  if(f.trap){const fx=isP?aggFx():{};sc.trap={by:u.id,d:Math.max(1,Math.round((u.matk||u.atk)*f.trap[0]*lvM*(1+(fx.trapP||0)/100))),n:f.trap[1]};fxmLog(sc,u,fxmT('trapDat'));dbg('fx.trap',{d:sc.trap.d});}
  if(f.needTrap&&pre.hadTrap){sc.trap=null;fxmLog(sc,u,fxmT('trapThu'));}
  if(f.breakAll){let n=0;for(const x of sc.units)if(x!==u&&x.hp>0&&x.phase==='charge'&&!(x.pending&&x.pending.sk.fx.steady)){toRecover(sc,x,1);x.pos=75;n++;}fxmLog(sc,u,fxmT(n?'tichKhuc':'tichKhuc0'));dbg('fx.breakAll',{n});}
  if(f.dispel){for(const x of alive(sc,foeSide(u.side))){x.st.block=0;x.st.rage=0;}fxmLog(sc,u,fxmT('dispel'));dbg('fx.dispel',{});}
  if(u.st.hide>0&&f.p&&!f.hide){u.st.hide=0;}}
// ---------- bọc resolveSkill: trước đòn chỉnh hệ số, sau đòn chạy các phần xử lý ----------
{const _rs=resolveSkill;resolveSkill=function(sc,u,sk,lv,tg,qm,offs){
  const f=(sk&&sk.fx)||{};const lvM=1+0.25*((lv||1)-1);const t=tg&&tg[0];const pre={lvM,marked:!!(t&&t.st&&t.st.mark>0),hadTrap:!!sc.trap};
  // bẫy trận: kẻ địch ra đòn cận chiến vào phe có trận thì dính một lần
  if(sc.trap&&u.side!==((U_(sc,sc.trap.by)||{}).side)&&f.p&&sk.dt!=='phep'&&u.hp>0&&!u.immune){const d=sc.trap.d;sc.trap=null;u.hp-=d;fxmLog(sc,u,fxmT('trapNo',[fxmWho(u)]));dbg('fx.trapNo',{d});
    cfx(sc,{k:'hit',id:u.id,from:u.id,d,crit:0,blk:0,el:'vo',big:0});if(u.hp<=0){down(sc,u);checkEnd(sc);finishAct(sc,u,sk);return;}}
  // ẩn: đòn diện rộng làm lộ
  if(f.aoe&&tg)for(const x of tg)if(x.st&&x.st.hide>0){x.st.hide=0;dbg('fx.hideLo',{t:x.name});}
  // kháng độc thụ động của người chơi (CP14 T1)
  const me=mainUnit(sc);const poi0=me&&me.st?(me.st.poison||0):0;
  let s2=sk;const m=(k)=>{if(s2===sk)s2=Object.assign({},sk,{fx:Object.assign({},sk.fx)});return s2.fx;};
  if(f.vsCharge&&t&&t.phase==='charge'){m().p=f.p*(1+f.vsCharge/100);dbg('fx.vsCharge',{});}
  if(f.fOnly&&t&&t.f!==f.fOnly){m().p=f.p*0.5;}
  if(f.fromHide&&!(u.st&&u.st.hide>0)){m().p=f.p*f.fromHide;}else if(f.fromHide)dbg('fx.fromHide',{});
  if(f.needTrap&&!sc.trap){m().p=f.p*0.5;fxmLog(sc,u,fxmT('trapThieu'));}
  if(f.pierceBlock&&tg)for(const x of tg)if(x.st&&x.st.block>0){x.st.block=Math.round(x.st.block*(1-f.pierceBlock));dbg('fx.pierceBlock',{});}
  if(u.isMain&&f.drain){const fx=aggFx();if(fx.drainRel)m().drain=f.drain*(1+fx.drainRel/100);}
  if(u.isMain&&f.p){const fx=aggFx();if(fx.pierceAdd&&s2.fx.p)m().pierce=Math.min(0.9,(s2.fx.pierce||0)+fx.pierceAdd/100);}
  const out=_rs.call(this,sc,u,s2,lv,tg,qm,offs);
  if(me&&u.side!==me.side&&me.st&&(me.st.poison||0)>poi0){const pr=aggFx().poiRes||0;if(pr){me.st.poison=poi0+Math.round((me.st.poison-poi0)*(1-pr/100));dbg('fx.poiRes',{});}}
  if(G.run&&G.run.scene===sc&&!sc.over)fxmAfter(sc,u,s2,tg,pre);
  return out;};}
// ---------- chiêu cần một mục tiêu nhưng không gây sát thương (lộ ý đồ, phá trận địch…) ----------
{const _ds=doSkill;doSkill=function(sc,u,sk,lv,tid,qm){const f=sk.fx||{};if(f.p||!f.tgt)return _ds.apply(this,arguments);
  const tg=pickTargets(sc,u,Object.assign({},sk,{fx:Object.assign({},f,{aoe:f.tgt==='all'})}),tid);
  if(!tg.length){fxmLog(sc,u,fxmWho(u)+contentText("core_07-vong-lap-tran_js.doSkill.027"));finishAct(sc,u,sk);return;}
  const pre={lvM:1+0.25*((lv||1)-1),marked:!!(tg[0].st&&tg[0].st.mark>0),hadTrap:!!sc.trap};
  if(f.weak)for(const t of tg)t.st.weak=Math.max(t.st.weak||0,f.weak);
  fxmLog(sc,u,fxmT('ra',[fxmWho(u),sk.n]));if(sk.f&&u.isMain&&!sc['_u'+sk.id]){sc['_u'+sk.id]=1;clog(sc,sk.f,'fl');}
  fxmAfter(sc,u,sk,tg,pre);finishAct(sc,u,sk);};}
// ---------- lời chú thích chiêu ----------
{const _st=skillTip;skillTip=function(sk,lv){let s=_st.apply(this,arguments);const f=(sk&&sk.fx)||{};const L=[];
  for(const k of ['vsCharge','fOnly','fromHide','needTrap','pierceBlock','hpDmg','breakCharge','mark','markWeak','slow','backlash','selfWeak','blockH','blockM','cutT','curePoi','poiStop','hide','cxT','fleeUp','cover','allyCover','sumCover','allyRage','allyHeal','summon','unsummon','trap','breakAll','dispel'])
    if(f[k]!=null&&f[k]!==0){const v=f[k];const a=Array.isArray(v)?v.map(x=>Math.round(x*100)/100):[typeof v==='number'?(v<1&&v>0?Math.round(v*100):v):''];
      if(k==='summon')L.push(fxmT('tip.summon',[fxmT('sum.'+v.k),v.n||3]));else L.push(fxmT('tip.'+k,k==='cutT'?[Math.round(v[0]*100),v[1]]:k==='trap'?[Math.round(v[0]*100),v[1]]:a));}
  if(f.cd>1)L.push(fxmT('tip.cd',[f.cd-1]));
  if(L.length){const i=s.lastIndexOf('\n');s=s.slice(0,i)+'\n'+L.join('\n')+s.slice(i);}
  return s;};}
