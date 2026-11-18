// ĐỢT 3: Tiền tệ (HN A.7, B §6.1). Bảng TIEN: content/rules/tien.js
// r.bac: bạc tính bằng đồng (1 quan = 1.000 đồng; 1 linh thạch = 100 quan). Linh thạch vẫn ở r.st.
FEAT.tien=1;
function fmtBac(d){d=Math.max(0,Math.round(d||0));const q=Math.floor(d/TIEN.quan),m=d%TIEN.quan;
  if(!q)return contentText('tien.dong',[m]);return m?contentText('tien.quanDong',[q,m]):contentText('tien.quan',[q]);}
// dạng ngắn cho HUD
function fmtBacS(d){d=Math.max(0,Math.round(d||0));if(d<TIEN.quan)return contentText('tien.dongS',[d]);const q=d/TIEN.quan;return contentText('tien.quanS',[q>=100?Math.floor(q):String(Math.floor(q*10)/10).replace('.',',')]);}
function bacAdd(d,why){const r=G.run;if(!r)return 0;const b0=r.bac||0;r.bac=Math.max(0,b0+Math.round(d||0));const x=r.bac-b0;dbg('tien.bac',{d:x,why:why||'',bac:r.bac});return x;}
// trả được không (kể cả đổi tự động một linh thạch)
function bacCan(d){const r=G.run;if(!r)return false;const b=r.bac||0;return b>=d||((r.st||0)>=1&&b+TIEN.ban>=d);}
// trả d đồng; thiếu thì đổi một linh thạch ra TIEN.ban đồng (giá bán vào tiền trang) kèm lời báo. Trả về false nếu không đủ.
function bacPay(d,why){const r=G.run;if(!r||!(d>0))return !!r;if(!bacCan(d))return false;
  if((r.bac||0)<d){r.st-=1;bacAdd(TIEN.ban,'doi');note(contentText('tien.doiTuDong',[fmtBac(TIEN.ban)]),'');dbg('tien.doi',{auto:1});}
  bacAdd(-d,why);return true;}
function bacChip(d){return chip('🪙',(d<0?'−':'+')+fmtBac(Math.abs(d)),contentText('tien.chipTip'),d<0?'dn':'up');}
function bacRange(og){if(og&&Array.isArray(og.bac))return og.bac;return TIEN.grpBac[(og&&og.grp)||'thuong']||TIEN.grpBac.thuong;}
// tiền khởi đầu: bạc theo xuất thân; linh thạch của phàm nhân về 0 (trừ xuất thân có `lt`); nâng cấp luân hồi "st" vẫn cộng
{const _nr=newRun;newRun=function(c){const res=_nr.apply(this,arguments);const r=G.run;if(!r||!feat('tien'))return res;
  const og=ORIGIN.find(o=>o.id===r.origin)||{};const b=bacRange(og);let bac=ri(b[0],b[1]);const m=TIEN.hc[r.hc];if(m)bac=Math.round(bac*m);
  const lt=Array.isArray(og.lt)?ri(og.lt[0],og.lt[1]):(og.lt||0);
  r.bac=bac;r.st=Math.max(0,lt+Math.round(U('st')*25*ECON*1.4));r._bacV1=1;dbg('tien.khoi',{bac,st:r.st,og:r.origin});return res;};}
// bản lưu cũ: chưa có bạc → 0, giữ linh thạch cũ
{const _r=run2;run2=function(){const r=_r.apply(this,arguments);if(r&&!r._bacV1){r._bacV1=1;if(!(r.bac>=0))r.bac=0;}return r;};}
// tuế biến: phàm nhân nhận bạc thay cho linh thạch (bảng TUE có `bac`; stPct tính trên bạc)
{const _te=tueEv;tueEv=function(E,id,D){const r=G.run;if(r&&feat('tien')&&(isPham()||isVo(r))&&(E.bac||E.stPct)){const E2=Object.assign({},E);
    if(E.bac){delete E2.st;bacAdd(ri(E.bac[0],E.bac[1]),'tue');}
    if(E.stPct){delete E2.stPct;bacAdd(Math.max(1,Math.round((r.bac||0)*E.stPct/100)),'tue');}
    return _te.call(this,E2,id,D);}
  return _te.apply(this,arguments);};}

// ---------- Đ3.2: quán phàm trả bằng bạc ----------
// Dịch vụ có trường `bac` (đồng) trong content/venues/services.json thì trả bạc, không trả linh thạch.
function svcDef(v,id){return CONTENT_EVENTS.find(d=>d.kind==='service'&&d.trigger.venues.includes(v)&&d.logic.service.id===id);}
let BAC_PAID=0;
{const _vo=venueOpts;venueOpts=function(n,v){const L=_vo.apply(this,arguments);if(!feat('tien'))return L;
  for(const o of L){const d=svcDef(v,o.id);const b=d&&d.logic.service.bac;if(!b)continue;o.bac=b;o.st=0;o.no=(BAC_PAID||bacCan(b))?'':contentText('tien.khongDu');}return L;};}
{const _vd=venueDo;venueDo=function(v,id){const r=G.run,sc=r&&r.scene;if(!feat('tien')||id==='content-story'||!sc||sc.type!=='place')return _vd.apply(this,arguments);
  const o=venueOpts(nodeById(sc.id),v).find(x=>x.id===id);if(!o||!o.bac)return _vd.apply(this,arguments);if(o.no||o.lack)return false;
  if(!bacPay(o.bac,'svc:'+id))return false;BAC_PAID=1;let res;try{res=_vd.apply(this,arguments);}finally{BAC_PAID=0;}
  const s2=G.run&&G.run.scene;if(res&&s2===sc&&Array.isArray(sc.chips))sc.chips.unshift(bacChip(-o.bac));dbg('tien.svc',{id,bac:o.bac});return res;};}
// tạp hóa: bản chép tay tâm pháp cho phàm nhân bán bằng bạc (lỗi dự đoán L11)
{const _se=shopExtra;shopExtra=function(items,n){const k=items.length;_se.apply(this,arguments);
  if(feat('tien')&&isPham()&&!hasTp()&&items.length>k&&items[0]&&items[0].k==='relic'){items[0].bac=TIEN.tpBac;items[0].p=0;}
  // Trắc Linh Thạch (Đ2.4): chưa trắc linh thì phường thị bày một viên, giá 30 lượng của B = 9.900 đồng
  if(feat('tien')&&G.run&&!rootKnown()&&!hasItem('trac_linh_thach'))items.push({k:'qi',id:'trac_linh_thach',bac:TIEN.tlBac,p:0});};}
{const _by=buy;buy=function(i){const sc=G.run&&G.run.scene;const it=sc&&sc.items&&sc.items[i];if(!it||it.sold||!it.bac||!feat('tien'))return _by.apply(this,arguments);
  if(it.k==='qi'){if(!bacPay(it.bac,'shop'))return;const r=G.run;(r.qitems=r.qitems||[]).push(it.id);it.sold=1;log(contentText('tien.muaVat',[CAT.byId[it.id].n]));dbg('tien.qi',{id:it.id});return;}
  if(!bacPay(it.bac,'shop'))return;it.p=0;_by.apply(this,arguments);if(G.run&&!it.sold)bacAdd(it.bac,'hoan');};}

// ---------- Đ3.3: tiền trang ở thành, chợ ----------
// Dùng khung "nơi chọn việc" (VENUE_N): hai việc mua / bán một linh thạch; mỗi tiền trang đổi tối đa TIEN.ttMax viên mỗi tháng (W().tientrang[nút]={m,n}).
VENUE_N.tientrang=contentText('tien.tt');VENUE_IN.tientrang=[contentText('tien.ttIn1'),contentText('tien.ttIn2')];
function ttLeft(n){const w=W();const m=Math.floor(w.t/HM);const T=(w.tientrang=w.tientrang||{});const x=T[n.id];return (!x||x.m!==m)?TIEN.ttMax:Math.max(0,TIEN.ttMax-x.n);}
function ttUse(n){const w=W();const m=Math.floor(w.t/HM);const T=(w.tientrang=w.tientrang||{});if(!T[n.id]||T[n.id].m!==m)T[n.id]={m,n:0};T[n.id].n++;}
{const _vo=venueOpts;venueOpts=function(n,v){if(v!=='tientrang')return _vo.apply(this,arguments);const r=G.run,left=ttLeft(n);
  const L=[{id:'mua',l:contentText('tien.ttMua'),d:contentText('tien.ttMuaD',[fmtBac(TIEN.mua)]),h:0,st:0,bac:TIEN.mua,g:{st:1}},
           {id:'ban',l:contentText('tien.ttBan'),d:contentText('tien.ttBanD',[fmtBac(TIEN.ban)]),h:0,st:1,g:{txt:fmtBac(TIEN.ban)}}];
  for(const o of L){o.no=!left?contentText('tien.ttHet'):o.id==='mua'?((r.bac||0)<TIEN.mua?contentText('tien.khongDu'):''):((r.st||0)<1?contentText('tien.ttKhongLt'):'');}
  return L;};}
{const _vd=venueDo;venueDo=function(v,id){if(v!=='tientrang')return _vd.apply(this,arguments);const r=G.run,sc=r&&r.scene;if(!sc||sc.type!=='place')return false;
  const n=nodeById(sc.id);const o=venueOpts(n,v).find(x=>x.id===id);if(!o||o.no)return false;let ch;
  if(id==='mua'){bacAdd(-TIEN.mua,'tientrang');r.st+=1;ch=[bacChip(-TIEN.mua),chip('💎','+1',contentText('tien.ttLt'),'up')];}
  else{r.st-=1;bacAdd(TIEN.ban,'tientrang');ch=[chip('💎','−1',contentText('tien.ttLt'),'dn'),bacChip(TIEN.ban)];}
  ttUse(n);sc.msg=[contentText(id==='mua'?'tien.ttMuaXong':'tien.ttBanXong')];sc.chips=ch;sc.venue=null;sc.seq=(sc.seq||0)+1;dbg('tien.tt',{id,left:ttLeft(n)});saveSoon();return true;};}
{const _pa=placeActs;placeActs=function(n){const L=_pa.apply(this,arguments);if(feat('tien')&&(n.type==='thanh'||n.type==='cho')&&n.state!=='ruin'&&!L.some(x=>x.a==='tientrang'))
  L.push({a:'tientrang',i:'🏦',l:contentText('tien.tt'),h:0,tip:contentText('tien.ttTip'),dis:false,x:''});return L;};}

// ---------- Đ3.4: cống hiến theo thế lực (hàm chKey/chGet/chAdd ở core2/03) ----------
// bản lưu cũ: r.ch là một số chung → sổ của tông đang thuộc
{const _r=run2;run2=function(){const r=_r.apply(this,arguments);if(r&&!r._chV1){r._chV1=1;r.chMap=r.chMap||{};
  if(r.ch!=null){const nm=r.flags&&r.flags.tongmon?contentSectName():null;if(nm&&r.ch>0){const k='sect:'+nm;r.chMap[k]={v:(r.chMap[k]&&r.chMap[k].v||0)+r.ch,dong:0};}delete r.ch;}}return r;};}

// ---------- Đ3.5: Thưởng Lệnh và Thưởng Các (bảng THUONG_CAC, TC_BAC, TL_QST: content/venues/thuong-cac.js) ----------
// r.thuongLenh: thẻ đang có (tiêu được); r.thuongTong: tổng thẻ từng nhận (tính bậc, không giảm)
function tlAdd(x,why){const r=G.run;if(!r||!x)return 0;const v0=r.thuongLenh||0;r.thuongLenh=Math.max(0,v0+x);if(x>0)r.thuongTong=(r.thuongTong||0)+x;dbg('tl.add',{x,why:why||'',v:r.thuongLenh});return r.thuongLenh-v0;}
function tcBac(r){r=r||G.run;const t=(r&&r.thuongTong)||0;let b=0;for(let i=0;i<TC_BAC.length;i++)if(t>=TC_BAC[i].v)b=i;return b;}
function tlQuest(q){let g=questGrade(q);g=clamp(g,0,TL_QST.length-1);let n=TL_QST[g];if(q.t0!=null&&q.due!=null&&W().t-q.t0<(q.due-q.t0)/2)n+=1;return n;}
function tlChip(x){return chip('🎋',(x<0?'−':'+')+Math.abs(x),contentText('tl.chip'),x<0?'dn':'up');}
// ghi lúc nhận việc để tính thưởng "xong trước nửa hạn"
{const _tq=takeQuest;takeQuest=function(i){const r=G.run;const k=r?r.quests.length:0;const o=_tq.apply(this,arguments);if(G.run&&G.run.quests.length>k){const q=G.run.quests[G.run.quests.length-1];if(q.t0==null)q.t0=W().t;}return o;};}
function tlOpenQ(){const r=G.run;return r?r.quests.filter(q=>q.state==='open'):[];}
// mọi lối xong nhiệm vụ bảng treo đều qua questGive (core2/08)
{const _qg=questGive;questGive=function(q){const ch=_qg.apply(this,arguments);if(!G.run||!q)return ch;const n=tlQuest(q);tlAdd(n,'quest');return (ch||[]).concat([tlChip(n)]);};}
{const _qc=questCancel;questCancel=function(id){const o=_qc.apply(this,arguments);if(o&&G.run)tlAdd(-1,'bo');return o;};}
{const _th=timeHooks;timeHooks=function(h){const L=tlOpenQ();const o=_th.apply(this,arguments);if(!G.run)return o;for(const q of L)if(q.state==='fail'&&!q.dropped)tlAdd(-1,'tre');return o;};}
// giới hạn mua tính theo từng thành: W().thuongCac[nút][mã]={k,n} với k là khóa kỳ (tháng / năm / kiếp)
function tcPeriod(lim){const w=W(),r=G.run;if(!lim)return null;return lim[1]==='thang'?'m'+Math.floor(w.t/HM):lim[1]==='nam'?'y'+Math.floor(w.t/HY):'k'+r.kiep;}
function tcLeft(n,it){if(!it.lim)return Infinity;const w=W();const T=((w.thuongCac=w.thuongCac||{})[n.id]=w.thuongCac[n.id]||{});const x=T[it.id];const k=tcPeriod(it.lim);return (!x||x.k!==k)?it.lim[0]:Math.max(0,it.lim[0]-x.n);}
function tcItemName(it){if(it.n)return it.n;if(it.k==='pill')return PILL[it.id].n;return (CAT.byId[it.id]||{}).n||it.id;}
function tcList(n){const r=G.run;return THUONG_CAC.filter(it=>!it.an).map((it,i)=>{const left=tcLeft(n,it);
  const why=tcBac(r)<it.bac?contentText('tl.canBac',[TC_BAC[it.bac].n]):!left?contentText('tl.het'):(r.thuongLenh||0)<it.p?contentText('tl.thieu'):(it.k==='pill'&&r.pills.length>=S().pillMax)?contentText('tl.day'):'';
  return {i:THUONG_CAC.indexOf(it),id:it.id,k:it.k,n:tcItemName(it),p:it.p,bac:it.bac,left,why};});}
function tcBuy(i){const r=G.run,sc=r&&r.scene;if(!sc||sc.type!=='place')return false;const n=nodeById(sc.id);const it=THUONG_CAC[+i];if(!it||it.an)return false;
  const v=tcList(n).find(x=>x.i===+i);if(!v||v.why)return false;
  tlAdd(-it.p,'mua:'+it.id);if(it.k==='pill')gainPill(it.id,0);else (r.qitems=r.qitems||[]).push(it.id);
  if(it.lim){const T=W().thuongCac[n.id];const k=tcPeriod(it.lim);if(!T[it.id]||T[it.id].k!==k)T[it.id]={k,n:0};T[it.id].n++;}
  log(contentText('tl.muaLog',[tcItemName(it),it.p]));dbg('tl.mua',{id:it.id,left:r.thuongLenh});saveSoon();return true;}
// nút Thưởng Các cạnh bảng treo thưởng
{const _pa=placeActs;placeActs=function(n){const L=_pa.apply(this,arguments);if(feat('tien')&&L.some(x=>x.a==='board')&&!L.some(x=>x.a==='thuongcac'))
  L.push({a:'thuongcac',i:'🎋',l:contentText('tl.cac'),h:0,tip:contentText('tl.cacTip'),dis:false,x:''});return L;};}
