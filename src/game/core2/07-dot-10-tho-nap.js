// ================= ĐỢT 10: THỔ NẠP VÀ LỊCH LUYỆN =================
// Thổ nạp: thân thể tự hít thở linh khí, không cần bế quan, tu vi vẫn nhích lên theo thời gian.
// Rất ít: chừng 5% tốc độ bế quan. Theo hệ số tu luyện (linh căn, tư chất, ngộ tính từ xuất thân,
// tu vi +% từ công pháp, tâm pháp, trang bị, mệnh cách) và linh khí nơi đang đứng.
function thonapPct(){const r=G.run;if(!r)return 0;const n=nodeById(r.at);return 100/(BQ_Y[clamp(r.realm,0,5)]*12)*0.05*S().tvM*LK_M[lkOf(n)];} // % tu vi mỗi tháng
function thonapPts(){return Math.round(thonapPct()*12/100*tvPts(G.run.realm));} // tu vi mỗi năm
{const _adv10=advanceTime;let dep=0;advanceTime=function(h){dep++;let o;try{o=_adv10(h);}finally{dep--;}
  if(!dep&&G.run&&h>0&&G.run.tv<100){const add=thonapPct()*h/HM/(lkOn()?LK_MUL:1);if(add>0)addTv(add);}return o;};}
// Lịch luyện: như tu vi nhưng chỉ có được nhờ thực chiến và đi lại giang hồ. Lưu theo % như tu vi.
// Tu vi bỏ xa lịch luyện thì tu vi thực nhận giảm dần (mọi nguồn, kể cả đan dược):
// vượt dưới 20% nhận đủ; 30% còn 70%; 40% còn 35%; 60% còn 10%; từ 70% trở lên chỉ còn 2% (bình cảnh).
// Lịch luyện cao hơn tu vi thì được ngộ đạo: nhận thêm tối đa 15%.
// Muốn đột phá phải có lịch luyện ít nhất 70%. Đột phá xong lịch luyện về 0, giữ lại 20% phần vượt quá 100%.
// Bảng LL_T, LL_BT, LL_MAX, LL_CAPE: content/rules/ll-t.js // dưới 5% coi như chạm đáy
function llOf(){return (G.run&&G.run.ll)||0;}
function llEff(tv){const ll=llOf();const gap=tv-ll;if(gap<0)return 1+Math.min(0.15,-gap/100*0.5);if(gap<=LL_T[0][0])return 1;
  for(let i=1;i<LL_T.length;i++){const [g1,e1]=LL_T[i-1],[g2,e2]=LL_T[i];if(gap<=g2)return e1+(e2-e1)*(gap-g1)/(g2-g1);}return LL_T[LL_T.length-1][1];}
function tvSimAdd(raw){const r=G.run;let add=0,rem=raw;while(rem>1e-9&&r.tv+add<100){const st=Math.min(rem,0.5);add+=st*llEff(r.tv+add);rem-=st;}return Math.min(add,100-r.tv);}
// tu vi luôn cộng theo số nguyên: phần lẻ dồn lại cho lần sau
{const _at10=addTv;addTv=function(x){const r=G.run;if(!(x>0)||!r)return _at10(x);const P=tvPts(r.realm)/100;const raw=tvSimAdd(x)*P+(r.tvAcc||0);const pts=Math.floor(raw+1e-9);r.tvAcc=raw-pts;if(pts<=0)return;
  const res=_at10(pts/P);if(G.run&&G.run.tv<100)G.run.tv=Math.round(G.run.tv*P)/P;return res;};}
// bế quan tới mức nào thì chạm đáy (chỉ còn 2%): trả về số năm, hoặc null nếu 5 năm vẫn chưa chạm
function bqCapY(){const r=G.run;if(r.tv>=100)return null;for(let y=0.25;y<=5;y+=0.25){const raw=bqReal()*y*(y<1?0.9:1)+thonapPct()*y*12;if(llEff(r.tv+tvSimAdd(raw))<=LL_CAPE)return y;}return null;}
function llPtsOf(){return Math.round(llOf()/100*tvPts(G.run.realm));}
function llAdd(x,why,quiet){const r=G.run;if(!r||!(x>0))return 0;const P=tvPts(r.realm)/100;const pts=Math.max(1,Math.round(x*P));const b=r.ll||0;r.ll=Math.min(Math.max(b,llCap()),Math.round((b*P+pts))/P);const d=Math.round((r.ll-b)*P);
  if(d>0&&!quiet){const dp=llShowGain(d/P);if(why)log(contentText("core2_07-dot-10-tho-nap_js.llAdd.001", [dp,why]));const sc=r.scene;if(sc&&sc.type==='combat')sc.llGain=(sc.llGain||0)+d;else if(sc&&Array.isArray(sc.chips))sc.chips.push(chip('⚔','+'+dp+contentText("core2_07-dot-10-tho-nap_js.llAdd.002"),contentText("core2_07-dot-10-tho-nap_js.llAdd.003")+why,'up'));else note('+'+dp+contentText("core2_07-dot-10-tho-nap_js.llAdd.004")+why);}return d;}
{const _cb10=canBreak;canBreak=function(){return _cb10()&&llOf()>=llNeedBt();};}
{const _bf10=btFinish;btFinish=function(){const r=G.run;const rl=r&&r.realm;const res=_bf10.apply(this,arguments);if(G.run&&G.run.realm>rl)G.run.ll=Math.max(0,(G.run.ll||0)-100)*0.2;return res;};}
// nguồn lịch luyện
{const _fc10=finishCombat;finishCombat=function(sc){const res=_fc10(sc);try{const r=G.run;if(r&&!sc.spar&&!sc.kiep&&sc.en&&sc.en.k!=='tamma'&&sc.over!=='dead'){
  const foes=sc.units.filter(u=>u.side==='B'&&!u.immune);const fl=foes.reduce((a,u)=>a+lcCalc(u),0);const ratio=clamp(fl/Math.max(1,lucChien()),0.15,2);
  const me=mainUnit(sc);const k=sc.en.k||sc.en.n;r.llSeen=r.llSeen||{};const cnt=r.llSeen[k]||0;r.llSeen[k]=cnt+1;
  let g=(sc.over==='win'?9:sc.over==='lose'?3:1)*Math.pow(ratio,0.8)/(1+0.25*cnt);if(sc.over==='win'&&me&&me.hp<me.max*0.2)g*=1.5;
  llAdd(g,sc.over==='win'?contentText("core2_07-dot-10-tho-nap_js.005"):contentText("core2_07-dot-10-tho-nap_js.006"));}}catch(e){console.error(e);}return res;};}
{const _op10=openPlace;openPlace=function(id){_op10(id);const r=G.run;if(!r||!r.scene)return;r.llP=r.llP||[];const k=r.scene.id;if(!r.llP.includes(k)){r.llP.push(k);llAdd(4,contentText("core2_07-dot-10-tho-nap_js.007"));}};}
{const _me10=meetEnt;meetEnt=function(e){const res=_me10(e);const r=G.run;if(r&&e){r.llN=r.llN||[];const k=e.name||e.id;if(!r.llN.includes(k)){r.llN.push(k);llAdd(3,contentText("core2_07-dot-10-tho-nap_js.008"));}}return res;};}
{const _qw10=questWin;questWin=function(q){const res=_qw10(q);if(res&&res.length)llAdd(5,contentText("core2_07-dot-10-tho-nap_js.009"));return res;};}

// ================= ĐỢT 12: ĐÁNH NHAU KHÔNG CHO TU VI; LỰA CHỌN Ở TRÀ LÂU, KHÁCH ĐIẾM, TỬU PHƯỜNG =================
// Trong lúc xử lý kết quả một trận, mọi phần thưởng tu vi đổi thành lịch luyện (một nửa).
let FIGHT_OUT=0;
function llChipMerge(L,d){if(!(d>0))return;d=llShowGain(d/(tvPts(G.run.realm)/100));const c=L.find(x=>x&&x.i==='⚔');if(c){c.t='+'+(parseInt(c.t.replace(/\D/g,''))+d)+contentText("core2_07-dot-10-tho-nap_js.llChipMerge.010");}else L.unshift(chip('⚔','+'+d+contentText("core2_07-dot-10-tho-nap_js.llChipMerge.011"),contentText("core2_07-dot-10-tho-nap_js.llChipMerge.012"),'up'));}
{const _ae12=applyE;applyE=function(e,v){if(FIGHT_OUT&&e&&e.tv>0){e=Object.assign({},e);const x=e.tv*0.5;delete e.tv;const ch=_ae12(e,v);llChipMerge(ch,llAdd(x,null,true));return ch;}return _ae12(e,v);};}
{const _cc12=combatContinue;combatContinue=function(){const sc0=G.run&&G.run.scene;const g=sc0&&sc0.llGain||0;FIGHT_OUT=1;let res;try{res=_cc12();}finally{FIGHT_OUT=0;}
  const sc=G.run&&G.run.scene;if(g&&sc&&sc!==sc0){if(!Array.isArray(sc.chips))sc.chips=[];llChipMerge(sc.chips,g);}return res;};}

// Trà lâu, khách điếm, tửu phường: chạm vào thì hiện vài lựa chọn. Mỗi lựa chọn có giá (giờ, linh thạch),
// có thể đòi chỉ số (ngộ tính, đạo tâm...), và đôi khi có chuyện đặc biệt chỉ còn trong ít giờ.
// Bảng VENUE_N: content/venues/venue-n.js
// Bảng VENUE_IN: content/venues/venue-in.js
// Bảng VENUE_SP: content/venues/venue-sp.js
function venueSpec(n,v){const r=G.run,w=W();if(!n.vsp||n.vsp.k!==r.kiep||n.vsp.v!==v||w.t>n.vsp.until){n.vsp={k:r.kiep,v,until:chance(.35)?w.t+ri(4,12):-1};}return n.vsp.until>w.t?n.vsp.until-w.t:0;}
function venueOpts(n,v){
 const r=G.run,s=S(),L=[];const left=venueSpec(n,v);
 for(const d of CONTENT_EVENTS.filter(d=>d.kind==='service'&&d.trigger.venues.includes(v))){
  const x=d.logic.service;if(x.limited&&left<=0)continue;const g=Object.assign({},x.g);
  if(g.hpFull){g.hp=s.maxHp-r.hp;delete g.hpFull;}if(g.mpFull){g.mp=s.maxMp-r.mp;delete g.mpFull;}
  if(g.hpPct){g.hp=Math.min(s.maxHp-r.hp,Math.round(s.maxHp*g.hpPct/100));delete g.hpPct;}
  if(g.stBase){g.st=price(g.stBase);delete g.stBase;}
  const o={id:x.id,l:d.name,d:d.text,h:x.h,st:x.stoneBase?price(x.stoneBase):0,g,req:x.req||undefined,fight:x.fight||0,fightSpec:x.fightSpec};
  if(x.limited)o.spec=left;o.no=r.st<o.st?contentText("runtime.07-dot-10-tho-nap.1"):'';if(o.req&&(s[o.req[0]]||0)<o.req[1])o.lack=o.req[2]+' cần '+o.req[1];L.push(o);
 }
 return L;
}
function venueDo(v,id){const r=G.run,sc=r&&r.scene;if(!sc||sc.type!=='place')return false;const n=nodeById(sc.id);const o=venueOpts(n,v).find(x=>x.id===id);if(!o||o.no||o.lack)return false;
  r.st-=o.st;advanceTime(o.h);if(!G.run||G.run.scene!==sc)return true;sc.msg=[];let ch=[];
  if(o.st)ch.push(chip('💎','−'+o.st,contentText("core2_07-dot-10-tho-nap_js.venueDo.041"),'dn'));ch.push(chip('⏳',durH(o.h),contentText("core2_07-dot-10-tho-nap_js.venueDo.042"),''));
  const g=o.g||{};
  if(o.fight){n.vsp.until=-1;sc.venue=null;if(o.id==='gaysu')sc.msg=[contentText("core2_07-dot-10-tho-nap_js.venueDo.043")];else sc.msg=[contentText("core2_07-dot-10-tho-nap_js.venueDo.044")];
    startCombat(o.fightSpec||{k:'tantu',cnt:o.id==='hotong'?2:1},{kind:'node'});const cs=G.run.scene;if(cs)cs.venueWin=g;return true;}
  if(o.spec)n.vsp.until=-1;
  if(g.info){if(v==='tea'&&id==='nghe'||v==='tuu'||v==='inn'){teaHouse(n);}else{for(let i=0;i<g.info;i++){const c=regionOf(r.region).nodes.filter(x=>x.fog===0);if(c.length){const x=pick(c);hearOf(x);sc.msg.push(contentText("core2_07-dot-10-tho-nap_js.venueDo.045")+x.name+'.');}}}}
  const LEAD={tea:{nghe:[''],hoi:[contentText("core2_07-dot-10-tho-nap_js.venueDo.046"),contentText("core2_07-dot-10-tho-nap_js.venueDo.047"),contentText("core2_07-dot-10-tho-nap_js.venueDo.048")],
      co:[contentText("core2_07-dot-10-tho-nap_js.venueDo.049"),contentText("core2_07-dot-10-tho-nap_js.venueDo.050"),contentText("core2_07-dot-10-tho-nap_js.venueDo.051")],
      tinh:[contentText("core2_07-dot-10-tho-nap_js.venueDo.052"),contentText("core2_07-dot-10-tho-nap_js.venueDo.053"),contentText("core2_07-dot-10-tho-nap_js.venueDo.054")],doicau:[contentText("core2_07-dot-10-tho-nap_js.venueDo.055")]},
    inn:{phong:[contentText("core2_07-dot-10-tho-nap_js.venueDo.056"),contentText("core2_07-dot-10-tho-nap_js.venueDo.057"),contentText("core2_07-dot-10-tho-nap_js.venueDo.058")],
      thuong:[contentText("core2_07-dot-10-tho-nap_js.venueDo.059"),contentText("core2_07-dot-10-tho-nap_js.venueDo.060"),contentText("core2_07-dot-10-tho-nap_js.venueDo.061")],
      an:[contentText("core2_07-dot-10-tho-nap_js.venueDo.062"),contentText("core2_07-dot-10-tho-nap_js.venueDo.063"),contentText("core2_07-dot-10-tho-nap_js.venueDo.064")],chuong:[contentText("core2_07-dot-10-tho-nap_js.venueDo.065"),contentText("core2_07-dot-10-tho-nap_js.venueDo.066"),contentText("core2_07-dot-10-tho-nap_js.venueDo.067")]},
    tuu:{chen:[contentText("core2_07-dot-10-tho-nap_js.venueDo.068"),contentText("core2_07-dot-10-tho-nap_js.venueDo.069"),contentText("core2_07-dot-10-tho-nap_js.venueDo.070")],moi:[contentText("core2_07-dot-10-tho-nap_js.venueDo.071"),contentText("core2_07-dot-10-tho-nap_js.venueDo.072"),contentText("core2_07-dot-10-tho-nap_js.venueDo.073")],
      dau:[contentText("core2_07-dot-10-tho-nap_js.venueDo.074"),contentText("core2_07-dot-10-tho-nap_js.venueDo.075"),contentText("core2_07-dot-10-tho-nap_js.venueDo.076")],
      ca:[contentText("core2_07-dot-10-tho-nap_js.venueDo.077"),contentText("core2_07-dot-10-tho-nap_js.venueDo.078"),contentText("core2_07-dot-10-tho-nap_js.venueDo.079")]}};
  sc.lastL=sc.lastL||{};const pool=(LEAD[v]&&LEAD[v][id])||[''];const cands=pool.filter(x=>x!==sc.lastL[v+id]);const lead=pick(cands.length?cands:pool);sc.lastL[v+id]=lead;
  if(lead)sc.msg.unshift(lead);
  if(g.hp>0)r.hp=Math.min(S().maxHp,r.hp+g.hp);if(g.mp>0)r.mp=Math.min(S().maxMp,r.mp+g.mp);if(g.hp>0)ch.push(chip('❤️','+'+g.hp,contentText("core2_07-dot-10-tho-nap_js.venueDo.080"),'up'));
  if(g.tamma<0&&r.tamma<=0)sc.msg.push(contentText("core2_07-dot-10-tho-nap_js.venueDo.081"));
  const e={};if(g.tamma)e.tamma=g.tamma;if(g.st)e.st=g.st;if(g.karma)e.karma=g.karma;if(g.tv)e.tv=g.tv;ch=ch.concat(applyE(e));
  if(g.ll){const d=llAdd(g.ll,null,true);llChipMerge(ch,d);}
  if(!sc.msg.length)sc.msg=[contentText("core2_07-dot-10-tho-nap_js.venueDo.082")];sc.chips=ch;sc.venue=null;sc.seq=(sc.seq||0)+1;return true;}
// chuyện đặc biệt có đánh nhau: thắng thì nhận công
{const _cc12b=combatContinue;combatContinue=function(){const sc0=G.run&&G.run.scene;const vw=sc0&&sc0.venueWin;const win=sc0&&sc0.over==='win';const res=_cc12b();
  if(vw&&win&&G.run&&G.run.scene){const ps=G.run.scene;const ch=applyE({st:vw.st||0,karma:vw.karma||0});ps.chips=(ps.chips||[]).concat(ch);}return res;};}
// khách điếm, tửu phường giờ có nhiều lựa chọn giá khác nhau: không khóa ô vì thiếu tiền
{const _pa12=placeActs;placeActs=function(n){const L=_pa12(n);const r=G.run;for(const a of L){if(a.a==='inn'||a.a==='tuu'){a.dis=false;a.x='';a.h=0;}if(a.a==='tea')a.h=0;}return L;};}
{const _pa12b=placeAct;placeAct=function(a){if(VENUE_N[a]){const sc=G.run&&G.run.scene;if(sc)sc.venue=a;return;}return _pa12b(a);};}
// Chiến lợi phẩm: rớt ngẫu nhiên, không cho chọn. Thường 0–1 món, tinh anh 1–2, thủ lĩnh 2.
{const _rw13=rewardScene;rewardScene=function(kind,en){_rw13(kind,en);const sc=G.run&&G.run.scene;if(!sc||sc.type!=='reward'||!sc.picks||!sc.picks.length)return;
  const n=kind==='boss'?2:kind==='elite'?ri(1,2):1;const P=sc.picks.slice();const got=[];
  for(let k=0;k<n&&P.length;k++){const i=Math.floor(R()*P.length);got.push(P.splice(i,1)[0]);}
  sc.picks=got;for(let i=0;i<got.length;i++){sc.taken=-1;takePick(i);}sc.picks=[];sc.taken=0;};}
