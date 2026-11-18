// ĐỢT 4: 27 nhiệm vụ tân thủ, chỉ kiếp đầu (HN A.12; C §11 D1–D4; B §13). Bảng TUT, TUT_WISH: content/rules/tan-thu.js
// r.tut={open:[mã đang mở],done:{mã:1 đã nhận thưởng},skip:{mã:1 đã bỏ},prog:{mã:số},ready:{mã:1 xong, chờ nhận},hide:0|1,
//        at0,reg0 (nơi xuất phát), art0 (số công pháp lúc sinh), hurt (đã từng bị thương), wn (số vết thương lần trước)}
// Sáu nhiệm vụ nhóm A làm tuần tự; sau đó mở lần lượt theo thứ tự bảng, tối đa TUT_MAX. Không thời hạn, không phạt.
FEAT.tut=1;
function tutById(id){return TUT.find(x=>x.id===id);}
function tutOn(){const r=G.run;return !!(r&&r.tut&&feat('tut'));}
function tutNew(r){return {open:[],done:{},skip:{},prog:{},ready:{},hide:0,at0:r.at,reg0:r.region,art0:(r.arts||[]).length,hurt:0,wn:0};}
// hàm trạng thái (go st:) — trả true/false hoặc số tiến độ
function tutHasLearn(r){return (r.arts||[]).length>(r.tut.art0||0);}
function tutPrep(r){const E=r.eq||{};return (E.vukhi?1:0)+((r.pills||[]).some(p=>HEAL_PILL.includes(p.id))?1:0);}
function tutHealthy(r){return !!r.tut.hurt&&!wounds().some(x=>!x.perm);}
function tutRole(r){return !!(r.flags&&r.flags.tongmon);}
function tutWish(r){return !!r.wish;}
function tutNotPham(r){return !r.pham;}
function tutLlFull(r){return llOf()>=LL_BT;}
function tutTrucCo(r){return (r.realm||0)>=1;}
function tutState(t){const r=G.run;if(!t.st)return null;let v;try{v=eval(t.st)(r);}catch(e){return null;}return v===true?t.need:v===false?0:+v||0;}
function tutClosed(T,id){return !!(T.done[id]||T.skip[id]);}
// cập nhật tiến độ tự tính (st) của nhiệm vụ đang mở
function tutEval(){const r=G.run;if(!tutOn())return;const T=r.tut;
  for(const id of T.open){const t=tutById(id);if(!t||T.ready[id])continue;const v=tutState(t);if(v==null)continue;
    if(v>(T.prog[id]||0))T.prog[id]=Math.min(t.need,v);if((T.prog[id]||0)>=t.need){T.ready[id]=1;dbg('tut.ready',{id});}}}
function tutFill(){const r=G.run;if(!tutOn())return;const T=r.tut;
  T.open=T.open.filter(id=>tutById(id)&&!tutClosed(T,id));
  const A=TUT.filter(t=>t.g==='A'&&!tutClosed(T,t.id));
  if(A.length){T.open=[A[0].id];}
  else{for(const t of TUT){if(T.open.length>=TUT_MAX)break;if(tutClosed(T,t.id)||T.open.includes(t.id))continue;T.open.push(t.id);}}
  tutEval();}
function tutTick(kind,n){const r=G.run;if(!tutOn())return 0;const T=r.tut;n=n==null?1:n;let k=0;
  for(const id of T.open){const t=tutById(id);if(!t||t.tick!==kind||T.ready[id])continue;
    T.prog[id]=Math.min(t.need,(T.prog[id]||0)+n);k++;if(T.prog[id]>=t.need){T.ready[id]=1;dbg('tut.ready',{id});}}
  if(k)dbg('tut.tick',{kind,n});return k;}
function tutView(){const r=G.run;if(!tutOn())return [];const T=r.tut;tutEval();
  return T.open.map(id=>{const t=tutById(id);return {id,t,n:t.n,d:t.d,need:t.need,prog:Math.min(t.need,T.prog[id]||0),ready:!!T.ready[id],rw:tutRwList(t.rw)};});}
function tutDoneN(){const r=G.run;return r&&r.tut?Object.keys(r.tut.done).length:0;}
function tutRwList(rw){const L=[];if(!rw)return L;
  if(rw.bac)L.push(fmtBac(rw.bac));if(rw.st)L.push(contentText('tut.rwSt',[rw.st]));if(rw.lenh)L.push(contentText('tut.rwLenh',[rw.lenh]));
  for(const [id,q] of rw.pill||[])if(PILL[id])L.push(PILL[id].n+(q>1?' ×'+q:''));
  for(const [id,q] of rw.item||[]){const x=CAT.byId[id];if(x)L.push(x.n+(q>1?' ×'+q:''));}
  if(rw.relic){const x=CAT.byId[rw.relic];if(x)L.push(x.n);}
  return L;}
function tutClaim(id){const r=G.run;if(!tutOn())return false;const T=r.tut;if(!T.open.includes(id)||!T.ready[id]||T.done[id])return false;
  const t=tutById(id),rw=t.rw||{};const ch=[];
  if(rw.bac){bacAdd(rw.bac,'tut');ch.push(bacChip(rw.bac));}
  if(rw.st){r.st+=rw.st;ch.push(chip('💎','+'+rw.st,contentText('tut.rwStTip'),'up'));}
  if(rw.lenh){r.thuongLenh=(r.thuongLenh||0)+rw.lenh;}
  for(const [pid,q] of rw.pill||[])for(let i=0;i<q;i++){const c=gainPill(pid);if(c)ch.push(c);}
  for(const [qid,q] of rw.item||[]){r.qitems=r.qitems||[];for(let i=0;i<q;i++)r.qitems.push(qid);}
  if(rw.relic){const x=CAT.byId[rw.relic];if(x){const rel=catRelic(x);r.relics.push(rel);ch.push(chip('🏺',rel.name,relicTip(rel),'item',rel.tier));}}
  T.done[id]=1;delete T.ready[id];log(contentText('tut.claimLog',[t.n]));dbg('tut.claim',{id});
  tutFill();saveSoon();return ch;}
function tutSkip(id){const r=G.run;if(!tutOn())return false;const T=r.tut;if(!T.open.includes(id)||T.done[id])return false;
  T.skip[id]=1;delete T.ready[id];dbg('tut.skip',{id});tutFill();saveSoon();return true;}
// mốc kiểm định kỳ: vết thương, vai, lịch luyện, tu vi…
function tutCheck(){const r=G.run;if(!tutOn())return;const T=r.tut;const wn=wounds().filter(x=>!x.perm).length;
  if(wn>0)T.hurt=1;if(wn<(T.wn||0))tutTick('heal');T.wn=wn;tutEval();}

// tạo khi đầu thai — chỉ kiếp đầu (newRun đã tăng nlife nên dùng r.kiep)
{const _nr=newRun;newRun=function(){const res=_nr.apply(this,arguments);const r=G.run;if(r&&r.kiep===1&&feat('tut')){r.tut=tutNew(r);tutFill();dbg('tut.new',{});}return res;};}
// bản lưu cũ: không tạo tân thủ (chỉ kiếp mới); bản có tut thiếu trường thì bổ sung
{const _r=run2;run2=function(){const r=_r.apply(this,arguments);if(r&&r.tut&&!r.tut._v1){const T=r.tut;T._v1=1;T.open=T.open||[];T.done=T.done||{};T.skip=T.skip||{};T.prog=T.prog||{};T.ready=T.ready||{};}return r;};}
// điểm đếm
{const _at=advanceTime;advanceTime=function(){const o=_at.apply(this,arguments);if(G.run)tutCheck();return o;};}
{const _ar=arrive;arrive=function(id){const r=G.run;const res=_ar.apply(this,arguments);if(G.run&&tutOn()){const T=G.run.tut;
  if(id!==T.at0){const k='a'+id;T.seen=T.seen||{};if(!T.seen[k]){T.seen[k]=1;tutTick('arrive');}}
  if(G.run.region!==T.reg0)tutTick('region');}return res;};}
{const _pa=placeAct;placeAct=function(a){const r=G.run,sc=r&&r.scene;const n=sc&&sc.type==='place'?nodeById(sc.id):null;const dp0=n&&n.dp;const t0=W().t;
  const res=_pa.apply(this,arguments);const r2=G.run;if(!r2||!tutOn())return res;const moved=W().t>t0;
  if(a==='tinh'&&moved){tutTick('rest');tutTick('train');}
  if(a==='heal'&&moved)tutTick('heal');
  if(a==='khaiphu'&&n&&!dp0&&n.dp)tutTick('khaiphu');
  if(a==='sanyeu'&&r2.scene&&r2.scene.en)r2.scene.en._tutH=1;
  return res;};}
{const _vd=venueDo;venueDo=function(v,id){const res=_vd.apply(this,arguments);if(G.run&&res!==false&&v==='inn'&&/phong|giuong|thuong/.test(id||''))tutTick('rest');return res;};}
{const _sc=startCombat;startCombat=function(){const prev=G.run&&G.run.scene;const res=_sc.apply(this,arguments);const sc=G.run&&G.run.scene;
  if(prev&&prev.en&&prev.en._tutH&&sc&&sc.type==='combat')sc._tutH=1;return res;};}
{const _fc=finishCombat;finishCombat=function(sc){const res=_fc.apply(this,arguments);if(G.run&&sc&&sc._tutH&&!sc._tutC&&sc.over==='win'){sc._tutC=1;tutTick('hunt');}return res;};}
{const _vt=vtDo;vtDo=function(id){const res=_vt.apply(this,arguments);if(G.run&&res){tutTick('job');if(id==='tap_dich')tutTick('role');}return res;};}
{const _b=buy;buy=function(i){const r=G.run,sc=r&&r.scene;const it=sc&&sc.items&&sc.items[i];const m0=r?(r.st||0)+(r.bac||0):0;const s0=it&&it.sold;
  const res=_b.apply(this,arguments);if(G.run&&it&&(it.sold!==s0||(G.run.st||0)+(G.run.bac||0)<m0))tutTick('trade');return res;};}
{const _si=sellItem;sellItem=function(){const m0=G.run?(G.run.st||0)+(G.run.bac||0):0;const res=_si.apply(this,arguments);if(G.run&&(G.run.st||0)+(G.run.bac||0)>m0)tutTick('trade');return res;};}
{const _tc=tcBuy;tcBuy=function(){const res=_tc.apply(this,arguments);if(G.run&&res)tutTick('trade');return res;};}
{const _lb=learnBook;learnBook=function(){const res=_lb.apply(this,arguments);if(G.run&&res)tutTick('learn');return res;};}
{const _tl=tpLearn;tpLearn=function(){const res=_tl.apply(this,arguments);if(G.run&&res)tutTick('learn');return res;};}
{const _gs=gainSkill;gainSkill=function(){const res=_gs.apply(this,arguments);if(G.run&&res)tutTick('learn');return res;};}
{const _eq=equip;equip=function(){const res=_eq.apply(this,arguments);if(G.run)tutEval();return res;};}
{const _hb=healBuy;healBuy=function(){const m0=G.run?(G.run.st||0)+(G.run.bac||0):0;const res=_hb.apply(this,arguments);if(G.run&&(G.run.st||0)+(G.run.bac||0)<m0)tutTick('heal');return res;};}
{const _tt=tinhToa;tinhToa=function(){const res=_tt.apply(this,arguments);if(G.run&&res!==false){tutTick('train');tutTick('rest');}return res;};}
{const _cr=craft;craft=function(){const res=_cr.apply(this,arguments);if(G.run&&res)tutTick('craft');return res;};}
{const _fg=favGift;favGift=function(){const res=_fg.apply(this,arguments);if(G.run&&!res)tutTick('bond');return res;};}
{const _rm=relMake;relMake=function(){const res=_rm.apply(this,arguments);if(G.run&&!res)tutTick('bond');return res;};}
{const _pu=phamUp;phamUp=function(){const p0=G.run&&G.run.pham;const res=_pu.apply(this,arguments);if(G.run&&p0&&!G.run.pham)tutTick('phamup');return res;};}
{const _qg=questGive;questGive=function(){const res=_qg.apply(this,arguments);if(G.run)tutTick('quest');return res;};}
{const _bq=bqCustom;bqCustom=function(){const t0=W().t;const res=_bq.apply(this,arguments);if(G.run&&res){const d=Math.floor((W().t-t0)/HD);if(d>0)tutTick('bqday',d);}return res;};}
{const _ph=petHatch;petHatch=function(){const res=_ph.apply(this,arguments);if(G.run&&res)tutTick('hatch');return res;};}
{const _op=openPrep;openPrep=function(){const res=_op.apply(this,arguments);if(G.run)tutTick('prepbt');return res;};}
{const _bf=btFinish;btFinish=function(){const res=_bf.apply(this,arguments);if(G.run&&G.run.realm>=1)tutTick('trucco');return res;};}
function wishSet(id){const r=G.run;if(!r)return false;const w=TUT_WISH.find(x=>x[0]===id);if(!w)return false;r.wish=id;log(contentText('tut.wishLog',[w[1]]));tutTick('wish');dbg('tut.wish',{id});return true;}
// tốt nghiệp: đủ TUT_GRAD nhiệm vụ đã nhận thưởng → cộng điểm luân hồi lúc hết kiếp
{const _cp=calcPts;calcPts=function(){const o=_cp.apply(this,arguments);const r=G.run;if(r&&r.tut&&tutDoneN()>=TUT_GRAD){o.push([contentText('tut.grad'),TUT_GRAD_PTS]);dbg('tut.grad',{n:tutDoneN()});}return o;};}
