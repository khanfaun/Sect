// Đ9.1: bộ máy tuyến (mệnh tuyến). Dữ liệu: content/tuyen/*.json → TUYEN_DATA (data/06-tuyen-du-lieu.js, sinh bởi tools/content-build.js).
// Mỗi kiếp: một tuyến xuất thân (theo r.origin) + một đại lộ chính (đổi được một lần).
// r.arc={xt:S|null,dl:S|null,doi:0,vong:0}; S={id,i (nút đang chờ/mở),mT (lúc nút mở),han,moi (đã đưa lời mời),nhac,dau:{},lich:[{n,c}],ngoai,ket,xong}
// Lời mời dùng khung kỳ ngộ (KYNGO, sp:1). Người gọi đọc qua vai (vaiNow); vai trống thì dùng thayThe, không hồi sinh ai.
// Lỡ hạn: thế giới tự diễn (tuDien: dấu, Sử lược, đồng hồ CLK nếu khai báo), tuyến đi tiếp, không kẹt.
// Bản lưu cũ: r.arc chưa có thì dựng mới khi tới tháng kế; thiếu khoá nào đọc kiểu x||0.
const TUYEN={};const TUYEN_XT={};const TUYEN_DL={};
for(const A of (typeof TUYEN_DATA!=='undefined'?TUYEN_DATA:[])){TUYEN[A.id]=A;if(A.loai==='xuat_than')TUYEN_XT[A.xuatThan]=A.id;else (TUYEN_DL[A.daiLo]||(TUYEN_DL[A.daiLo]=[])).push(A.id);
  for(const v of A.vatTruyen||[])if(!CAT.byId[v.id]){const x={id:v.id,n:v.n,i:v.i||'📜',d:v.d||'',use:v.use||'',status:'active'};CAT.byId[v.id]=x;CAT.qitems.push(x);}}
const DAI_LO={phi_thang:'Phi Thăng Lộ',diet_the:'Diệt Thế Ma Đồ',de_nghiep:'Đế Nghiệp',phu_giap:'Phú Giáp Thiên Hạ',huyet_cuu:'Huyết Cừu',vo_lam:'Võ Lâm Chí Tôn',the_gia:'Thế Gia Vạn Đại',y_gia:'Y Giả Độ Thế',tinh_mong:'Tỉnh Mộng'};
const TY_CFG={nhac:3,nhacMax:4}; // nhắc lại lời mời sau 3 tháng; tối đa 4 lần (không ép)
const LT_KEY={ha:0,trung:1,thuong:2,cuc:3};
function tySt(r){r=r||G.run;if(!r)return null;if(!r.arc||typeof r.arc!=='object')r.arc={xt:null,dl:null,doi:0,vong:0};return r.arc;}
// ---------- chữ: {ten} {que} {NPxx} {NPxx.vai} {NPxx.noi} {LOCxx} {FAxx} ----------
function tyNp(ma,k){const v=typeof vaiNow==='function'?vaiNow(ma):null;const P=VAI_NP[ma];if(!P)return ma;
  if(k==='vai')return P.vai;if(k==='noi')return locName(P.noi);
  if(!v)return P.vai;return v.song?v.ten:contentText('ty.npMat',[P.vai]);}
function tyT(s){if(typeof s!=='string')return '';const r=G.run;
  return s.replace(/\{(ten|que|NP\d\d(?:\.(?:vai|noi))?|LOC\d\d|FA\d\d)\}/g,(_,k)=>{if(k==='ten')return r?r.ten:'';if(k==='que')return r?r.que:'';
    if(k.startsWith('NP')){const [m,f]=k.split('.');return tyNp(m,f);}if(k.startsWith('LOC'))return locName(k);if(k.startsWith('FA'))return THE_LUC[k]?THE_LUC[k].n:k;return k;});}
// ---------- điều kiện ----------
function tyDk(dk,S){if(!dk)return '';const r=G.run;const d=(S&&S.dau)||{};
  for(const f of dk.dau||[])if(!d[f])return dk.khoa||contentText('ty.chuaToi');
  for(const f of dk.khongDau||[])if(d[f])return dk.khoa||contentText('ty.daKhac');
  if(dk.pham===true&&!r.pham)return contentText('ty.chiPham');if(dk.pham===false&&r.pham)return contentText('ty.chiTu');
  if(dk.canhGioiTu!=null&&(r.pham||(r.realm||0)<dk.canhGioiTu))return contentText('ty.canhGioi');
  if(dk.tuoiTu!=null&&r.age<dk.tuoiTu)return contentText('ty.tuoi');if(dk.tuoiDen!=null&&r.age>dk.tuoiDen)return contentText('ty.tuoi');
  if(dk.bacTu!=null&&!bacCan(dk.bacTu))return contentText('tien.khongDu');
  if(dk.linhThachTu){for(const k in dk.linhThachTu)if(ltGet(LT_KEY[k])<dk.linhThachTu[k])return contentText('cc.thieuSt');}
  for(const id of dk.vatPham||[])if(!hasItem(id))return contentText('ty.thieuVat',[CAT.byId[id]?CAT.byId[id].n:id]);
  for(const m of dk.vaiSong||[]){const v=vaiNow(m);if(!v||!v.song)return dk.khoa||contentText('ty.nguoiMat');}
  for(const m of dk.vaiMat||[]){const v=vaiNow(m);if(v&&v.song)return dk.khoa||contentText('ty.chuaToi');}
  for(const f of dk.faSong||[])if(!faAlive(f))return dk.khoa||contentText('ty.faMat');
  for(const f of dk.faDiet||[])if(faAlive(f))return dk.khoa||contentText('ty.chuaToi');
  for(const c of dk.clkDang||[]){const s=tcInit(W())[c];if(!s||!s.pha)return dk.khoa||contentText('ty.chuaToi');}
  return '';}
// ---------- hiệu ứng ----------
function tyE(e,S){const r=G.run;let ch=[];if(!e)return ch;
  if(e.bac){const x=bacAdd(e.bac,'tuyen');if(x)ch.push(chip('🪙',(x>0?'+':'−')+fmtBac(Math.abs(x)),contentText('ty.tien'),x>0?'up':'dn'));}
  if(e.linhThach&&!r.pham)for(const k in e.linhThach){const x=ltAdd(LT_KEY[k],e.linhThach[k],'tuyen');if(x)ch.push(ltChip(LT_KEY[k],x));}
  for(const id of [].concat(e.deed||[]))ch=ch.concat(deed(id,{src:'tuyen:'+S.id}));
  if(e.vatPham||e.boVatPham)ch=ch.concat(applyE({item:e.vatPham,rmItem:e.boVatPham}));
  if(e.fa)for(const f in e.fa)faAdj(f,e.fa[f],'tuyen:'+S.id);
  if(e.clk&&clkCanThiep(e.clk.id,tyT(e.clk.kq)))ch.push(chip('🕰️',THOI_CUC[e.clk.id].n,contentText('ty.clk'),'up'));
  if(e.giet){const v=vaiNow(e.giet);if(v&&v.song){vaiGiet(e.giet,'tuyen');dbg('tuyen.giet',{ma:e.giet});}}
  const base={};for(const k of ['hp','h','tamma'])if(e[k]!=null)base[k]=e[k];if(Object.keys(base).length&&G.run)ch=ch.concat(applyE(base));
  return ch;}
// ---------- trạng thái từng tuyến ----------
function tyFind(id){const T=tySt();return [T.xt,T.dl].find(x=>x&&x.id===id)||null;}
function tyNew(id,i){const A=TUYEN[id];return {id,i:i||0,mT:W().t+(A&&A.nut[i||0]?tyChoT(A.nut[i||0]):0),han:null,moi:0,nhac:0,nn:0,dau:{},lich:[],ngoai:0,ket:null,xong:0};}
function tyNut(S){const A=TUYEN[S.id];return A&&!S.xong?A.nut[S.i]:null;}
function tyHanT(N){const h=N.han||{};return ((h.nam||0)*12+(h.thang||0)||12)*HM;}
function tyChoT(N){const c=N.cho||{};return ((c.nam||0)*12+(c.thang||0))*HM;}
// nút đang mở (đã tới lúc) ?
function tyMoNut(S){const N=tyNut(S);if(!N||S.han!=null)return;const t=W().t;if(t<S.mT)return;if(N.dk&&tyDk(N.dk,S)){if(t>S.mT+tyHanT(N))tyTuDien(S);return;}
  S.han=t+tyHanT(N);S.moi=0;S.nhac=t;S.nn=0;dbg('tuyen.mo',{id:S.id,nut:N.id});}
function tyDong(S,c,how){const A=TUYEN[S.id],N=A.nut[S.i];S.lich.push({n:N.id,c,y:tYear(W().t)});S.i++;S.han=null;S.moi=0;
  if(S.i>=A.nut.length){tyKetMo(S);return;}S.mT=W().t+tyChoT(A.nut[S.i]);dbg('tuyen.dong',{id:S.id,nut:N.id,c,how});}
// tự diễn khi lỡ hạn
function tyTuDien(S){const A=TUYEN[S.id],N=A.nut[S.i],T=N.tuDien||{};for(const f of T.dau||[])S.dau[f]=1;S.ngoai++;
  if(T.clk)clkCanThiep(T.clk.id,tyT(T.clk.kq));if(T.su)suLuocAdd(tyT(T.su),'tuyen');if(G.run&&T.t){log(tyT(T.t));note(tyT(T.t),'');}
  dbg('tuyen.tu',{id:S.id,nut:N.id});tyDong(S,'~','tu');}
// ---------- kết ----------
function tyKetDu(S){const A=TUYEN[S.id];return (A.ket||[]).filter(k=>!tyDk(k.dk,S));}
function tyKetMo(S){const L=tyKetDu(S);if(L.length===1){tyKet(S,L[0].id);return;}if(!L.length){tyKet(S,null);return;}S.chonKet=1;S.moi=0;}
function tyKet(S,kid){const A=TUYEN[S.id];const K=kid&&A.ket.find(k=>k.id===kid);S.xong=1;S.chonKet=0;S.ket=K?K.id:'ngoai';const w=W();
  if(K){if(K.su)suLuocAdd(tyT(K.su),'tuyen');if(K.dauVong)(w.tuyenVong||(w.tuyenVong=[])).push({id:A.id,ket:K.id,t:K.dauVong,y:tYear(w.t),kiep:G.run.kiep||0});if(w.tuyenVong&&w.tuyenVong.length>40)w.tuyenVong.shift();if(K.e)tyE(K.e,S);}
  else if(A.ngoai)suLuocAdd(tyT(A.ngoai),'tuyen');
  log(contentText('ty.ketLog',[A.ten,K?K.ten:contentText('ty.ngoaiTen')]));dbg('tuyen.ket',{id:A.id,ket:S.ket});
  if(A.loai==='xuat_than')tyDlTuMo();}
// ---------- mở tuyến ----------
function tyMoOk(A){const r=G.run;const m=A.mo||{};if(m.tuoiTu!=null&&r.age<m.tuoiTu)return false;return !tyDk(m.dk,{dau:{}});}
function tyDlStart(id){const T=tySt();const A=TUYEN[id];if(!A)return false;const xt=T.xt;const i=A.nut[0].boQuaNeuXuatThan&&xt&&xt.xong&&xt.ket&&xt.ket!=='ngoai'?1:0;
  T.dl=tyNew(id,i);if(i)T.dl.lich.push({n:A.nut[0].id,c:'xt',y:tYear(W().t)});log(contentText('ty.dlMo',[DAI_LO[A.daiLo]]));dbg('tuyen.dl',{id,i});return true;}
function tyDlTuMo(){const T=tySt();if(T.dl)return;const xt=T.xt&&TUYEN[T.xt.id];const goi=(xt&&xt.goiYDaiLo)||[];
  for(const d of goi)for(const id of TUYEN_DL[d]||[])if(tyMoOk(TUYEN[id])){tyDlStart(id);return;}}
// người chơi chọn / đổi đại lộ (mỗi kiếp đổi một lần)
function tuyenMoDaiLo(daiLo){const T=tySt();const id=(TUYEN_DL[daiLo]||[]).find(x=>tyMoOk(TUYEN[x]));if(!id)return false;
  if(T.dl){if(T.dl.id===id||T.doi)return false;T.doi=1;suLuocAdd(contentText('ty.doiDl',[G.run.ten,DAI_LO[daiLo]]),'tuyen');}return tyDlStart(id);}
// ---------- hằng tháng ----------
function tuyenTick(){const r=G.run;if(!r||!W())return;const T=tySt(r);
  if(!T.vong){T.vong=1;const L=(W().tuyenVong||[]).filter(v=>v.kiep!==r.kiep).slice(-3);for(const v of L)log(contentText('ty.vong',[tyT(v.t)]));}
  if(!T.xt){const id=TUYEN_XT[r.origin];if(id&&tyMoOk(TUYEN[id]))T.xt=tyNew(id);}
  for(const S of [T.xt,T.dl]){if(!S||S.xong||!TUYEN[S.id])continue;let k=0;
    while(!S.xong&&k++<8){tyMoNut(S);if(S.han!=null&&W().t>S.han){tyTuDien(S);continue;}break;}}}
// lời mời đang chờ (để giao diện / kỳ ngộ hiện)
function tyCho(S){if(!S||!TUYEN[S.id]||S.xong&&!S.chonKet)return null;if(S.chonKet)return {S,ket:1};const N=tyNut(S);if(!N||S.han==null)return null;return {S,N};}
function tyHereOk(N){const L=N.loiMoi||{};if(L.cach!=='tin'||!L.noi||L.noi==='here')return true;const n=anchorNode(L.noi);return !!n&&G.run.at===n.id;}
function tyKyId(S,N){return 'tuyen:'+S.id+':'+(N?N.id:'ket');}
// dựng hộp thoại kỳ ngộ cho nút / chọn kết
function tyKy(S,N){const A=TUYEN[S.id];const id=tyKyId(S,N);let ev=KYNGO.find(x=>x.id===id);if(!ev){ev={id,sp:1,n:'',t:'',c:[]};KYNGO.push(ev);}
  if(!N){ev.n=A.ten;ev.t=tyT(A.ketMo||contentText('ty.ketMo'));ev.c=tyKetDu(S).map(K=>({l:tyT(K.ten),go:()=>{const S2=tyFind(S.id);if(!S2||!S2.chonKet)return {t:'',ch:[]};tyKet(S2,K.id);return {t:tyT(K.t),ch:[]};}}));return ev;}
  const L=N.loiMoi||{};const v=L.vai&&vaiNow(L.vai);const mat=L.vai&&(!v||!v.song);
  ev.n=tyT(N.ten);ev.t=tyT(mat?N.thayThe:N.mo);
  ev.c=N.cach.map(c=>({l:tyT(c.l),need:()=>tyDk(c.dk,S),go:()=>{const S2=tyFind(S.id);if(!S2||tyNut(S2)!==N)return {t:'',ch:[]};
    for(const f of c.dau||[])S2.dau[f]=1;const ch=tyE(c.e,S2);dbg('tuyen.chon',{id:S.id,nut:N.id,c:c.id});const t=tyT(c.t);
    if(c.boQua){tyTuDien(S2);}else tyDong(S2,c.id,'chon');return {t,ch};}}));
  ev.c.push({l:contentText('ty.deSau'),go:()=>{const S2=tyFind(S.id)||S;S2.moi=1;S2.nhac=W().t;S2.nn=(S2.nn||0)+1;return {t:contentText('ty.deSauT'),ch:[]};}});
  return ev;}
// đưa lời mời ra (khi đang ở ngoài bản đồ, không có cảnh khác). trả true nếu mở hộp thoại.
function tuyenGap(force){const r=G.run;if(!r||(r.scene&&!force))return false;const T=tySt(r);
  for(const S of [T.xt,T.dl]){const o=tyCho(S);if(!o)continue;
    if(o.ket){kyStart(tyKy(S,null));return true;}
    if(!tyHereOk(o.N))continue;if(S.moi&&!force&&(W().t-S.nhac<TY_CFG.nhac*HM||(S.nn||0)>=TY_CFG.nhacMax))continue;
    kyStart(tyKy(S,o.N));if(!S.moi){const L=o.N.loiMoi||{};if(L.cach==='tin')log(tyT(o.N.ten));}S.moi=1;S.nhac=W().t;dbg('tuyen.moi',{id:S.id,nut:o.N.id});return true;}
  return false;}
// tin đồn có dấu: lời mời dạng 'tin' chỉ mở khi tới nơi; nhắc bằng một dòng nhật ký khi nút mở
{const _at=advanceTime;advanceTime=function(h){const o=_at.apply(this,arguments);const r=G.run;if(!r||!G.meta||!W())return o;
  const m=Math.floor(W().t/HM);const T=tySt(r);if(T.m==null||T.m<m){T.m=m;tuyenTick();if(G.run&&!r.scene&&G.screen==='map')tuyenGap();}return o;};}
// Sổ tay / giao diện: nút đang mở + hạn bằng chữ (không số nghiệp)
function tuyenView(){const r=G.run;if(!r)return [];const T=tySt(r);const L=[];
  for(const S of [T.xt,T.dl]){if(!S||!TUYEN[S.id])continue;const A=TUYEN[S.id];const N=tyNut(S);
    L.push({id:A.id,loai:A.loai,ten:A.ten,nut:N?tyT(N.ten):'',han:N&&S.han!=null?contentText(S.han-W().t>6*HM?'ty.hanXa':'ty.hanGan'):'',noi:N&&N.loiMoi&&N.loiMoi.noi&&N.loiMoi.noi!=='here'?locName(N.loiMoi.noi):'',ket:S.ket?(S.ket==='ngoai'?contentText('ty.ngoaiTen'):tyT(A.ket.find(k=>k.id===S.ket).ten)):''});}
  return L;}
