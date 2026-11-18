// ĐỢT 5.1: võ học phàm nhân (HN B §7.3). Bảng VO_BAC, VO_HOC, VO_LUYEN: content/rules/vo-dao.js; chữ: content/text/vo-dao.json
// r.vo={bac:0..6, xp:số ngày luyện, noi:số buổi luyện, win:trận thắng, loi:lôi đài thắng, kyT}; r.voHoc=[mã bí tịch]; r.voSk=[mã chiêu võ]
// Nội lực dùng chung thanh linh lực khi là phàm nhân (gồm vô căn). Phàm nhân chỉ dùng chiêu võ, chiêu thân thể và đòn cơ bản.
FEAT.voh=1;
// chiêu võ chỉ đến từ bí tịch: bỏ khỏi kho chiêu ngẫu nhiên (SK đã dựng xong ở core/02), đánh dấu là đòn thân thể
for(let i=SK_RAW.length-1;i>=0;i--){const x=SK_RAW[i];if(x[5]&&x[5].vo){if(SK[x[0]])SK[x[0]].dt='vl';SK_RAW.splice(i,1);}}
function voOf(r){r=r||G.run;if(!r)return null;if(!r.vo||typeof r.vo!=='object')r.vo={bac:0,xp:0,noi:0,win:0,loi:0};return r.vo;}
function voBac(r){r=r||G.run;return (r&&r.vo&&r.vo.bac)|0;}
function voBacN(b){return (VO_BAC[b]||VO_BAC[0]).n;}
function voHocBy(id){return VO_HOC.find(x=>x.id===id);}
function voFx(r){const fx={};const b=voBac(r);for(const id of (r.voHoc||[])){const h=voHocBy(id);if(!h||!h.fx||b<h.need)continue;for(const k in h.fx)fx[k]=(fx[k]||0)+h.fx[k];}return fx;}
function voSkOk(sk){return !!sk&&(!!sk.fx.vo||sk.dt==='vl'||sk.id==='_atk');}
function mpName(){return isPham()?contentText('vo.noi'):contentText('vo.linh');}
// tiến độ bằng chữ (không có số)
function voNgayTxt(r){const x=(r.vo&&r.vo.xp)||0;return contentText('vo.ngay.'+(x<60?0:x<365?1:x<3650?2:3));}

// ----- chỉ số: bậc võ nhân công / thủ / khí huyết; tu sĩ nhận một nửa; bí tịch cộng bị động; nội lực cho phàm nhân -----
{const _S=S;S=function(){const s=_S.apply(this,arguments);const r=G.run;if(!r||!r.vo||!feat('voh'))return s;
  const B=VO_BAC[voBac(r)]||VO_BAC[0];const g=r.pham?1:VO_LUYEN.tu;const k=1+(B.k-1)*g,kh=1+(B.kh-1)*g;const fx=voFx(r);
  s.atk=Math.round(s.atk*k*(1+(fx.atkP||0)/100));s.def=Math.round(s.def*k*(1+(fx.defP||0)/100));s.maxHp=Math.round(s.maxHp*kh*(1+(fx.hpP||0)/100));
  if(fx.crit)s.crit+=fx.crit;if(fx.tp){s.tp+=fx.tp;s.ne+=fx.tp;}if(fx.lifeY)s.life+=fx.lifeY;
  if(r.pham&&B.noi)s.maxMp=Math.round(B.noi*(1+(fx.noiP||0)/100));
  return s;};}
// nội lực hồi theo thời gian (hệ hồi phục cũ bỏ qua phàm nhân)
{const _at=advanceTime;advanceTime=function(h){const o=_at.apply(this,arguments);const r=G.run;if(!r||!r.pham||!(h>0)||!r.vo||!feat('voh'))return o;
  const m=S().maxMp;if(m>0&&r.mp<m)r.mp=Math.min(m,r.mp+Math.max(1,Math.round(m*h/VO_LUYEN.hoi)));return o;};}

// ----- chiêu: syncSkills dựng lại r.skills từ công pháp, nên nối r.voSk vào sau (L15); phàm nhân bỏ pháp thuật -----
function voMerge(r){if(!r)return;if(!r.kn)r.kn={atk:[],def:[],move:[],ult:[]};r.skills=r.skills||[];
  if(r.pham){r.skills=r.skills.filter(k=>voSkOk(SK[k.id]));for(const c in r.kn)if(Array.isArray(r.kn[c]))r.kn[c]=r.kn[c].filter(id=>voSkOk(SK[id]));}
  for(const id of (r.voSk||[])){const sk=SK[id];if(!sk||(r.skUsed||{})[id])continue;if(!r.skills.find(k=>k.id===id))r.skills.push({id,lv:1});
    const c=skCat(sk);const A=r.kn[c]||(r.kn[c]=[]);if(!A.includes(id)){if(r.pham)A.unshift(id);else A.push(id);const mx=CAT_MAX[c]||3;if(A.length>mx)A.length=mx;}}
  r.atkSlots=r.kn.atk.slice();}
{const _ss=syncSkills;syncSkills=function(){const r=G.run;if(!r)return;if(r.arts)_ss.apply(this,arguments);if(G.run)voMerge(G.run);};}
{const _ps=pSkill;pSkill=function(id){const p=_ps.apply(this,arguments);const r=G.run;if(p&&r&&r.pham&&!voSkOk(p.sk))return null;return p;};}

// ----- luyện võ: sáu giờ, ở mọi nơi -----
function voWhy(){const r=G.run;if(!r||(r.scene&&r.scene.type==='combat'))return contentText('vo.ban');return '';}
{const _pa=placeActs;placeActs=function(n){const L=_pa.apply(this,arguments);if(!feat('voh')||!G.run||!n||n.state==='ruin')return L;
  if(!L.some(x=>x.a==='luyenvo')){const w=voWhy();L.push({a:'luyenvo',i:'🥋',l:contentText('vo.act'),h:VO_LUYEN.h,tip:contentText('vo.tip'),dis:!!w,x:w});}
  if(n.type==='thanh'&&!L.some(x=>x.a==='loidai'))L.push({a:'loidai',i:'🏟️',l:contentText('vo.loi'),h:1,tip:contentText('vo.loiTip'),dis:!!voWhy(),x:''});
  return L;};}
function voLuyen(){const r=G.run,sc=r&&r.scene;if(!sc||sc.type!=='place'||voWhy())return false;
  advanceTime(VO_LUYEN.h);if(!G.run)return true;const v=voOf(r);const g=r.pham?1:VO_LUYEN.tu;v.xp=(v.xp||0)+g;v.noi=(v.noi||0)+1;
  if(typeof tutTick==='function')tutTick('train');
  const s2=G.run.scene;if(s2===sc){sc.msg=[T([contentText('vo.xong'),contentText('vo.xong2'),contentText('vo.xong3')])];sc.chips=[chip('🥋',voNgayTxt(r),contentText('vo.chipTip'),'up'),chip('⏳',durH(VO_LUYEN.h),contentText('vo.chip'),'')];sc.seq=(sc.seq||0)+1;}
  dbg('vo.luyen',{xp:v.xp,bac:v.bac});voCheck();saveSoon();return true;}
// lên bậc: bậc 1–4 tự lên khi đủ điều kiện; bậc 5–6 mở kỳ ngộ
function voUp(nb){const r=G.run,v=voOf(r);v.bac=nb;const t=voBacN(nb);note(contentText('vo.len',[t]),'up');log(contentText('vo.lenLog',[t]));dbg('vo.up',{bac:nb});
  const s=S();if(r.pham)r.mp=s.maxMp;return true;}
function voCheck(){const r=G.run;if(!r||!feat('voh'))return false;const v=voOf(r);const nb=(v.bac|0)+1;const B=VO_BAC[nb];if(!B)return false;
  if((v.xp||0)<(B.ngay||0)||(v.win||0)<(B.win||0)||(v.loi||0)<(B.loi||0))return false;
  if(B.ky){if(r.scene&&r.scene.type!=='place')return false;if(v.kyT!=null&&W().t-v.kyT<HM)return false;const ev=KYNGO.find(x=>x.id===B.ky);if(!ev)return false;v.kyT=W().t;kyStart(ev);dbg('vo.ky',{id:B.ky});return true;}
  return voUp(nb);}
// kỳ ngộ thăng bậc 5 (Đả thông nhâm đốc: thử đạo tâm) và 6 (Ngộ võ ý: trận sinh tử, thua thì trọng thương)
function voKyRoll(nb){const s=S();return clamp(0.35+(s.tam-12)*0.03+s.van*0.004,0.1,0.85);}
function voKy(nb,key,wound){return ()=>{const r=G.run;if(!r)return {t:''};if(voBac(r)!==nb-1)return {t:''};
  if(chance(voKyRoll(nb))){voUp(nb);return {t:contentText(key+'.ok'),ch:[chip('🥋',voBacN(nb),contentText('vo.bacTip'),'up')]};}
  const s=S();r.hp=Math.max(1,Math.round(r.hp-s.maxHp*0.4));addWound(wound,'vo');dbg('vo.kyFail',{nb});return {t:contentText(key+'.no'),ch:[chip('❤️','−',WOUND[wound].n,'dn')]};};}
KYNGO.push({id:'vo_nham_doc',n:contentText('vo.kyNham.n'),t:contentText('vo.kyNham.t'),sp:1,c:[{l:contentText('vo.kyNham.c0'),go:voKy(5,'vo.kyNham','noi')},{l:contentText('vo.kyNham.c1'),go:()=>({t:contentText('vo.kyNham.lui')})}]});
KYNGO.push({id:'vo_vo_y',n:contentText('vo.kyY.n'),t:contentText('vo.kyY.t'),sp:1,c:[{l:contentText('vo.kyY.c0'),go:voKy(6,'vo.kyY','gay')},{l:contentText('vo.kyY.c1'),go:()=>({t:contentText('vo.kyY.lui')})}]});

// ----- lôi đài ở thành: tỉ thí (thua không chết); thắng tính cho Nhất lưu -----
{const _pa=placeAct;placeAct=function(a){if(a==='luyenvo'){voLuyen();return;}
  if(a==='loidai'){const r=G.run,sc=r&&r.scene;if(!sc||sc.type!=='place'||voWhy())return;advanceTime(1);if(!G.run)return;dbg('vo.loidai',{});startCombat({spar:true},{kind:'node',voLoi:1});return;}
  return _pa.apply(this,arguments);};}
{const _fc=finishCombat;finishCombat=function(sc){const first=sc&&!sc._voC;if(sc)sc._voC=1;const res=_fc.apply(this,arguments);const r=G.run;
  if(r&&first&&sc&&sc.over==='win'&&!sc.kiep&&feat('voh')){const v=voOf(r);v.win=(v.win||0)+1;if(sc.after&&sc.after.voLoi){v.loi=(v.loi||0)+1;note(contentText('vo.loiWin'),'up');}dbg('vo.win',{win:v.win,loi:v.loi});voCheck();}
  return res;};}

// ----- bí tịch võ: vật truyện bt_<mã>, đọc trong túi -----
function voLearn(id){const r=G.run;const h=voHocBy(id);if(!r||!h)return false;r.voHoc=r.voHoc||[];if(r.voHoc.includes(id)){note(contentText('vo.hocRoi',[h.n]),'');return false;}
  if(voBac(r)<h.need&&h.need>1){note(contentText('vo.hocBac',[h.n,voBacN(h.need)]),'dn');return false;}
  voOf(r);r.voHoc.push(id);if(h.sk){r.voSk=r.voSk||[];if(!r.voSk.includes(h.sk))r.voSk.push(h.sk);}syncSkills();
  note(contentText('vo.hoc',[h.n]),'up');log(contentText('vo.hoc',[h.n]));dbg('vo.hoc',{id});saveSoon();return true;}
{const _bi=bagItems;bagItems=function(){const L=_bi.apply(this,arguments);for(const it of L)if(it.ref&&it.ref.t==='qi'&&/^bt_/.test(it.ref.id)&&voHocBy(it.ref.id.slice(3)))it.use=1;return L;};}
{const _bu=bagUse;bagUse=function(key,n){if(typeof key==='string'&&key.startsWith('vbt_')){const r=G.run;const q=key.slice(1);const i=(r.qitems||[]).indexOf(q);if(i<0)return 0;
  if(!voLearn(q.slice(3)))return 0;const j=r.qitems.indexOf(q);if(j>=0)r.qitems.splice(j,1);return 1;}return _bu.apply(this,arguments);};}
// võ quán (hai quyển đầu) bày ở tạp hóa trong thành
{const _se=shopExtra;shopExtra=function(items,n){_se.apply(this,arguments);const r=G.run;if(!r||!n||n.type!=='thanh'||!feat('voh'))return;
  for(const h of VO_HOC)if(h.bac&&!(r.voHoc||[]).includes(h.id)&&!hasItem('bt_'+h.id))items.push({k:'qi',id:'bt_'+h.id,bac:h.bac,p:0});};}
// bản lưu cũ: không có r.vo thì sinh khi cần (voOf); vô căn cũ có sẵn r.vo để nhận tu vi chuyển sang (Đ2.3)
{const _r=run2;run2=function(){const r=_r.apply(this,arguments);if(r&&!r._voV1){r._voV1=1;if(isVo(r))voOf(r);if(!Array.isArray(r.voSk))r.voSk=[];if(!Array.isArray(r.voHoc))r.voHoc=[];}return r;};}
{const _nr=newRun;newRun=function(c){const res=_nr.apply(this,arguments);const r=G.run;if(r){r.voSk=[];r.voHoc=[];if(isVo(r))voOf(r);r._voV1=1;}return res;};}
