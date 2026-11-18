// ĐỢT 3: Tiền tệ (HN A.7, B §6.1). Bảng TIEN: content/rules/tien.js
// r.bac: tiền phàm tính bằng xu (Sửa-A). Linh thạch hạ phẩm ở r.st, phẩm cao ở r.lt (43-tien-te-2.js).
FEAT.tien=1;
// Sửa-A: xu / lượng bạc (1.000 xu) / lượng vàng (10.000 xu); bỏ "quan", "đồng"
function fmtBac(d){d=Math.max(0,Math.round(d||0));const v=Math.floor(d/TIEN.vang),b=Math.floor((d%TIEN.vang)/TIEN.luong),x=d%TIEN.luong;const L=[];
  if(v)L.push(contentText('tien.vang',[v]));if(b)L.push(contentText('tien.luong',[b]));if(x||!L.length)L.push(contentText('tien.xu',[x]));return L.join(' ');}
// dạng ngắn cho HUD
function fmtBacS(d){d=Math.max(0,Math.round(d||0));const f=q=>q>=100?String(Math.floor(q)):String(Math.floor(q*10)/10).replace('.',',');
  if(d<TIEN.luong)return contentText('tien.xuS',[d]);if(d<TIEN.vang)return contentText('tien.luongS',[f(d/TIEN.luong)]);return contentText('tien.vangS',[f(d/TIEN.vang)]);}
function bacAdd(d,why){const r=G.run;if(!r)return 0;const b0=r.bac||0;r.bac=Math.max(0,b0+Math.round(d||0));const x=r.bac-b0;dbg('tien.bac',{d:x,why:why||'',bac:r.bac});return x;}
// Sửa-A: linh thạch không còn tự đổi ra tiền phàm
function bacCan(d){const r=G.run;if(!r)return false;return (r.bac||0)>=d;}
function bacPay(d,why){const r=G.run;if(!r||!(d>0))return !!r;if(!bacCan(d))return false;bacAdd(-d,why);return true;}
function bacChip(d){return chip('🪙',(d<0?'−':'+')+fmtBac(Math.abs(d)),contentText('tien.chipTip'),d<0?'dn':'up');}
function bacRange(og){if(og&&Array.isArray(og.bac))return og.bac;return TIEN.grpBac[(og&&og.grp)||'thuong']||TIEN.grpBac.thuong;}
// tiền khởi đầu: bạc theo xuất thân; linh thạch của phàm nhân về 0 (trừ xuất thân có `lt`); nâng cấp luân hồi "st" vẫn cộng
{const _nr=newRun;newRun=function(c){const res=_nr.apply(this,arguments);const r=G.run;if(!r||!feat('tien'))return res;
  const og=ORIGIN.find(o=>o.id===r.origin)||{};const b=bacRange(og);let bac=ri(b[0],b[1]);const m=TIEN.hc[r.hc];if(m)bac=Math.round(bac*m);
  const lt=Array.isArray(og.lt)?ri(og.lt[0],og.lt[1]):(og.lt||0);
  r.bac=bac;r.st=Math.max(0,lt+Math.round(U('st')*25*ECON*1.4));r._bacV1=1;r.queAt=c&&c.at!=null?c.at:r.at;dbg('tien.khoi',{bac,st:r.st,og:r.origin});return res;};}
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
  if(it.k==='qi'){if(!bacPay(it.bac,'shop'))return;const r=G.run;(r.qitems=r.qitems||[]).push(it.id);if(it.qty!=null){it.qty--;if(it.qty<=0)it.sold=1;}else it.sold=1;log(contentText('tien.muaVat',[CAT.byId[it.id].n]));dbg('tien.qi',{id:it.id});return;}
  if(!bacPay(it.bac,'shop'))return;it.p=0;_by.apply(this,arguments);if(G.run&&!it.sold)bacAdd(it.bac,'hoan');};}

// ---------- Đ3.3: tiền trang — Sửa-A đã bỏ (linh thạch không đổi trực tiếp sang tiền phàm); xem 43-tien-te-2.js ----------
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
// phàm nhân: tiền thưởng nhiệm vụ trả bằng bạc (mỗi "linh thạch" của bảng thưởng = TIEN.qBac đồng), giữ hai thế giới tiền tách bạch
{const _qg=questGive;questGive=function(q){const r=G.run;const st0=r?r.st:0;let ch=_qg.apply(this,arguments);if(!G.run||!q)return ch;
  if(feat('tien')&&isPham()){const d=G.run.st-st0;if(d>0){G.run.st-=d;const b=d*TIEN.qBac;bacAdd(b,'quest');const k=(ch||[]).findIndex(c=>c&&c.i==='💎');if(k>=0)ch[k]=bacChip(b);else ch=(ch||[]).concat([bacChip(b)]);}}const n=tlQuest(q);tlAdd(n,'quest');return (ch||[]).concat([tlChip(n)]);};}
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

let VT_AN=0; // đang làm việc có cơm (Đ3.7)
// ---------- Đ3.6: ăn uống (bảng AN: content/rules/an-uong.js) ----------
// r.no 0–100, r.doi số ngày đói liên tiếp, r.anMuc dam|thuong|kha, r.anTu tự lo cơm (mặc định bật), r.anAcc giờ dồn, r.anLk ngày còn của gói lương khô đã mở
FEAT.an=1;
function needFood(r){r=r||G.run;return !!r&&(!!r.pham||(r.realm===0&&!r._inBq));}
function anMuc(r){r=r||G.run;return AN.muc[r&&r.anMuc]||AN.muc.thuong;}
function anFoodMul(r){let m=1;if(typeof tueSrc==='function')for(const x of tueSrc(r)){const D=tueDef(x.id)[1];if(D&&D.food)m*=D.food;}return m;}
function anCost(r){r=r||G.run;return Math.round(anMuc(r).bac*anFoodMul(r));}
function anAtQuan(r){const n=nodeById(r.at);return !!n&&AN.quan.includes(n.type)&&n.state!=='ruin'&&!r.moving;}
function anAtSect(r){const n=nodeById(r.at);return !!n&&n.type==='tong'&&!!r.flags.tongmon&&typeof contentOwnSect==='function'&&contentOwnSect();}
// Sửa-B: bỏ cơm nhà. Ở quê (r.queAt) mua cơm như ở quán, được mua chịu (core2/44-no-nha.js)
function anAtHome(r){return r.queAt!=null&&r.at===r.queAt&&!r.moving;}
function anLkEat(r){if((r.anLk||0)>0){r.anLk--;return true;}const i=(r.qitems||[]).indexOf('luong_kho');if(i<0)return false;r.qitems.splice(i,1);r.anLk=AN.lkNgay-1;dbg('an.lk',{left:(r.qitems||[]).filter(x=>x==='luong_kho').length});return true;}
function anFed(r,how){if((r.doi||0)>=AN.doi.doi)dbg('an.het',{doi:r.doi,how});r.no=100;r.doi=0;}
// Sửa lỗi đói: mọi người đều đói, nhưng theo nhịp (phần ăn mỗi ngày) — phàm 1, Luyện Khí ½, Trúc Cơ+ rất chậm; bế quan chậm hơn, sau bế quan chậm một thời gian
function anRate(r){let k=r.pham?1:r.realm===0?AN.nhip.lk:AN.nhip.tc;if(r._inBq)k*=AN.nhip.bq;else if((r.anCham||0)>W().t)k*=AN.nhip.sauBq;return k;}
function anShow(r){r=r||G.run;return !!r&&(needFood(r)||(r.doi||0)>=AN.doi.thieu);}
function anStarve(r){r.doi=(r.doi||0)+1;r.no=Math.max(0,100-Math.round(r.doi*100/AN.doi.la));dbg('an.doi',{doi:r.doi});const D=AN.doi;
  if(r.doi===D.thieu)note(contentText('an.noteThieu'),'dn');else if(r.doi===D.doi)note(contentText('an.noteDoi'),'dn');else if(r.doi===D.la){note(contentText('an.noteLa'),'dn');clampHp();}else if(r.doi===D.kiet){note(contentText('an.noteKiet'),'dn');clampHp();}else if(r.doi===D.canh)note(contentText('an.noteCanh'),'dn');
  if(r.doi>=D.kiet){const s=S();r.hp=Math.max(1,r.hp-Math.max(1,Math.round(s.maxHp*AN.kietHp)));}}
// một bữa (một ngày ăn): việc có cơm, sơn môn mình, lương thực đã mua, quán/quê (đủ tiền thật thì mua cả tháng), lương khô, không thì đói
function anMeal(r){
  r.anDays=(r.anDays||0)+1;
  if(anAtSect(r)){anFed(r,'tong');return;}
  if((r.anCov||0)>0){r.anCov--;anFed(r,'cov');return;}
  if((anAtQuan(r)||anAtHome(r))&&r.anTu!==0){const c=anCost(r),cm=c*AN.thang;
    if((r.bac||0)>=cm&&bacCan(cm)){bacPay(cm,'an.thang');r.anCov=AN.thang-1;anFed(r,'quan');dbg('an.thang',{c:cm});if(anMuc(r).tm)r.tamma=Math.max(0,(r.tamma||0)-anMuc(r).tm);return;}
    if(bacCan(c)){bacPay(c,'an');anFed(r,'quan');if(anMuc(r).tm&&r.anDays%30===0)r.tamma=Math.max(0,(r.tamma||0)-anMuc(r).tm);return;}}
  if(anLkEat(r)){anFed(r,'lk');return;}
  anStarve(r);}
function anDay(){const r=G.run;if(!r||!feat('an'))return;
  if(VT_AN||r.anFree){if(!VT_AN)r.anFree=0;anFed(r,'viec');return;}
  r.anPart=(r.anPart||0)+anRate(r);
  while(r.anPart>=1-1e-9&&G.run){r.anPart-=1;anMeal(r);}
  if((r.doi||0)>=AN.doi.chet&&!(r.scene&&r.scene.type==='combat')){dbg('an.chet',{doi:r.doi});die('doi');}}
{const _at=advanceTime;advanceTime=function(h){const o=_at.apply(this,arguments);const r=G.run;if(!r||!feat('an')||!(h>0))return o;
  r.anAcc=(r.anAcc||0)+h;let days=Math.floor(r.anAcc/24);if(days<=0)return o;r.anAcc-=days*24;
  for(let i=0;i<days&&G.run;i++)anDay();return o;};}
// câu 19: xuất quan thì đói chậm thêm AN.sauBqNgay ngày
{const _b=bqCustom;bqCustom=function(){const o=_b.apply(this,arguments);const r=G.run;if(r&&feat('an'))r.anCham=W().t+AN.sauBqNgay*HD;return o;};}
// tác dụng: hồi phục theo mức ăn và cơn đói; đói lả / kiệt sức giảm khí huyết tối đa
function anRgMul(){const r=G.run;if(!r||!feat('an'))return 1;let m=1+(needFood(r)?(anMuc(r).rg||0):0);const d=r.doi||0;if(d>=AN.doi.kiet)m+=AN.rgKiet;else if(d>=AN.doi.doi)m+=AN.rgDoi;return Math.max(0,m);}
{const _m=rgMonthRate;rgMonthRate=function(){return _m.apply(this,arguments)*anRgMul();};}
{const _t=rgTurnRate;rgTurnRate=function(){return _t.apply(this,arguments)*anRgMul();};}
{const _S=S;S=function(){const s=_S.apply(this,arguments);const r=G.run;const d=(r&&r.doi)||0;if(r&&feat('an')&&d>=AN.doi.la)s.maxHp=Math.max(1,Math.round(s.maxHp*(1+(d>=AN.doi.kiet?AN.hpKiet:AN.hpLa))));return s;};}
function anState(r){r=r||G.run;const d=(r&&r.doi)||0;if(!r)return 'tich';if(!needFood(r)&&d<AN.doi.doi)return 'tich';return d>=AN.doi.kiet?'kiet':d>=AN.doi.la?'la':d>=AN.doi.doi?'doi':'no';}
// Sửa lỗi đói: bản lưu cũ (thang 15 ngày) đang đói thì nới về mức an toàn
{const _r=run2;run2=function(){const r=_r.apply(this,arguments);if(r&&!r._anV2){r._anV2=1;if((r.doi||0)>0)dbg('an.migrate',{doi:r.doi});r.doi=0;r.anPart=0;if(r.no!=null)r.no=Math.max(r.no,100);}return r;};}
// bản lưu cũ: no đủ, tự lo cơm
{const _r=run2;run2=function(){const r=_r.apply(this,arguments);if(r&&!r._anV1){r._anV1=1;if(r.queAt==null&&r.que&&W()&&W().regions){const h=W().regions.flatMap(R=>R.nodes||[]).find(n=>n.name===r.que);if(h)r.queAt=h.id;}if(r.no==null)r.no=100;if(r.doi==null)r.doi=0;if(!r.anMuc)r.anMuc='thuong';if(r.anTu==null)r.anTu=1;}return r;};}
// tạp hóa bán lương khô bằng bạc
{const _se=shopExtra;shopExtra=function(items,n){_se.apply(this,arguments);if(feat('an')&&G.run&&needFood(G.run))items.push({k:'qi',id:'luong_kho',bac:AN.lkBac,p:0,qty:AN.lkQty});};}

// ---------- Đ3.7: việc làm thuê (bảng VIEC_THUE: content/venues/viec-thue.js) ----------
function vtDay(){return Math.floor(W().t/HD);}
function vtUsed(r){const L=r.lamNgay;return L&&L.d===vtDay()?L.h:0;}
function vtWhy(v,n){const r=G.run,s=S();if(!n||!v.noi.includes(n.type)||n.state==='ruin')return contentText('vt.khongNoi');
  for(const k in (v.dk||{}))if((s[k]||0)<v.dk[k])return contentText('vt.can',[STAT_N[k]||k,v.dk[k]]);
  if(v.mua&&!v.mua.includes(seasonOf(W().t)))return contentText('vt.traiMua');
  if(!v.cam&&vtUsed(r)+v.h>VT_NGAY)return contentText('vt.met');
  if(r.scene&&r.scene.type==='combat')return contentText('vt.ban');return '';}
function vtList(n){return VIEC_THUE.filter(v=>v.noi.includes(n.type)).map(v=>({id:v.id,n:v.n,h:v.h,cong:v.cong,an:!!v.an,ngu:!!v.ngu,rui:!!v.ruiRo,why:vtWhy(v,n)}));}
function vtDo(id){const r=G.run,sc=r&&r.scene;if(!sc||sc.type!=='place')return false;const n=nodeById(sc.id);const v=VIEC_THUE.find(x=>x.id===id);if(!v||vtWhy(v,n))return false;
  const d0=vtDay(),u0=vtUsed(r);if(v.an)VT_AN=1;try{advanceTime(v.h);}finally{VT_AN=0;}if(!G.run)return true;
  if(!v.cam){const d=vtDay();r.lamNgay=d===d0?{d,h:u0+v.h}:{d,h:Math.max(0,u0+v.h-24*(d-d0))};}
  let c=ri(v.cong[0],v.cong[1]);if(typeof anState==='function'&&['la','kiet'].includes(anState(r)))c=Math.round(c*0.7);
  bacAdd(c,'viec:'+id);const ch=[bacChip(c),chip('⏳',durH(v.h),contentText('vt.gio'),'')];const msg=[contentText('vt.xong',[v.n.toLowerCase()])];
  if(v.an){r.anFree=1;anFed(r,'viec');}
  if(v.ngu){const s=S();const g=Math.min(s.maxHp-r.hp,Math.round(s.maxHp*v.ngu/100));if(g>0){r.hp+=g;ch.push(chip('❤️','+'+g,contentText('vt.ngu'),'up'));}}
  if(v.ruiRo&&chance(v.ruiRo.p)){const H=v.ruiRo.hau||{};const s=S();
    if(H.wound)addWound(H.wound,'viec');if(H.hpLoss)r.hp=Math.max(1,r.hp-Math.round(s.maxHp*H.hpLoss/100));if(H.bacLoss)bacAdd(-Math.round((r.bac||0)*H.bacLoss/100),'mat');
    msg.push(contentText('vt.rui.'+id));dbg('viec.rui',{id});}
  const s2=G.run.scene;if(s2===sc){sc.msg=msg;sc.chips=ch;sc.seq=(sc.seq||0)+1;}
  dbg('viec.xong',{id,c});saveSoon();return true;}
{const _pa=placeActs;placeActs=function(n){const L=_pa.apply(this,arguments);if(feat('tien')&&VIEC_THUE.some(v=>v.noi.includes(n.type))&&n.state!=='ruin'&&!L.some(x=>x.a==='muusinh'))
  L.push({a:'muusinh',i:'🧺',l:contentText('vt.act'),h:0,tip:contentText('vt.tip'),dis:false,x:''});return L;};}

// ---------- Đ3.8: gia đình cơ bản (bảng GD: content/rules/gia-dinh.js) ----------
// r.family=[{ten,qh,tuoi,suc,thai,song,lc}]; mỗi năm (từ tueYear) thêm tuổi, người già có thể mất
function gdHo(ten){const w=(ten||'').split(' ');const h2=w.length>2&&NAME.ho2.includes(w[0]+' '+w[1]);return h2?w.slice(0,2).join(' '):w[0];}
function gdName(g,ho){const t=genName(g);const w=t.split(' ');const h0=gdHo(t);const rest=w.slice(h0.split(' ').length).join(' ')||w[w.length-1];return ho?ho+' '+rest:t;}
function gdThai(){const x=R();const T=GD.thai;return x<T.thuong?'thuong':x<T.thuong+T.lanh?'lanh':'ghet';}
function gdMake(r){if(GD.none.includes(r.origin))return [];const ho=gdHo(r.ten),a=ageY(r),L=[];
  const pa=a+ri(GD.chaMe[0],GD.chaMe[1]),ma=Math.max(a+18,pa-ri(0,6));
  L.push({ten:gdName('nam',ho),qh:'cha',tuoi:pa,suc:'khoe',thai:gdThai(),song:1,lc:chance(GD.pLc)?1:0});
  L.push({ten:gdName('nu'),qh:'me',tuoi:ma,suc:'khoe',thai:chance(.9)?'thuong':'lanh',song:1,lc:chance(GD.pLc)?1:0});
  const n=ri(GD.anhEm[0],GD.anhEm[1]);for(let i=0;i<n;i++){const old=chance(.5);const g=chance(.5)?'nam':'nu';const t=old?a+ri(1,8):Math.max(1,a-ri(1,10));
    L.push({ten:gdName(g,ho),qh:old?(g==='nam'?'anh':'chi'):'em',g,tuoi:t,suc:'khoe',thai:gdThai(),song:1,lc:chance(GD.pLc)?1:0});}
  for(const m of L)if(m.tuoi>=GD.yeu&&chance(.3))m.suc='yeu';return L;}
{const _nr=newRun;newRun=function(c){const res=_nr.apply(this,arguments);const r=G.run;if(r){r.family=gdMake(r);dbg('gd.sinh',{n:r.family.length});}return res;};}
function gdYear(){const r=G.run;if(!r||!Array.isArray(r.family))return;
  for(const m of r.family){if(!m.song)continue;m.tuoi++;
    if(m.tuoi>=GD.yeu&&m.suc==='khoe'&&chance(GD.pYeu))m.suc='yeu';else if(m.suc==='yeu'&&chance(GD.pBenh))m.suc='benh';
    if(m.tuoi>GD.gia&&chance(GD.pChet*(m.suc==='benh'?2:1))){m.song=0;m.mat=Math.floor(W().t);
      log(contentText('gd.tang',[GD.qh[m.qh].toLowerCase(),m.ten,m.tuoi]));note(contentText('gd.tang',[GD.qh[m.qh].toLowerCase(),m.ten,m.tuoi]),'dn');dbg('gd.tang',{qh:m.qh,tuoi:m.tuoi});}}}
{const _ty=tueYear;tueYear=function(age){const o=_ty.apply(this,arguments);if(G.run)gdYear();return o;};}
// bản lưu cũ: sinh người nhà theo tuổi hiện tại; ai đã quá tám mươi lăm thì coi như đã mất
{const _r=run2;run2=function(){const r=_r.apply(this,arguments);if(r&&!r._gdV1&&r.ten){r._gdV1=1;if(!Array.isArray(r.family)){r.family=gdMake(r);for(const m of r.family)if(m.tuoi>85)m.song=0;}}return r;};}

// phường thị: phàm nhân mời thầy lang trả bằng bạc
{const _os=openShop;openShop=function(n){const o=_os.apply(this,arguments);const sc=G.run&&G.run.scene;if(sc&&sc.type==='shop'&&feat('tien')&&isPham())sc.healBac=TIEN.yBac;return o;};}
{const _hb=healBuy;healBuy=function(){const r=G.run,sc=r&&r.scene;if(!sc||!sc.healBac||!feat('tien'))return _hb.apply(this,arguments);if(sc.healed||!bacPay(sc.healBac,'heal'))return;const s=S();r.hp=s.maxHp;r.mp=s.maxMp;sc.healed=1;};}
{const _qr=questRewardChips;questRewardChips=function(q){const L=_qr.apply(this,arguments);if(!feat('tien')||!isPham())return L;const R0=questRewardOf(q);
  return L.map(c=>c&&c.i==='💎'?bacChip(R0.st*TIEN.qBac):c).concat([tlChip(tlQuest(q))]);};}
