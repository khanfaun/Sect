// Sửa-B (người dùng chốt câu 10): bỏ cơm nhà; mua chịu ở quê (tiền âm), nợ và quan phủ, vay có lãi, nhà ở / thuê nhà / ngủ ngoài trời.
// Bảng NO, NHA: content/rules/no-nha.js. Chữ: content/text/tien-te.json (no.*, nha.*).
// r.bac < 0 là đang nợ. r.noTra={t0,han,lan,bao}: nợ bắt đầu lúc t0, hạn han (giờ thế giới), lan = số lần đã bị phạt, bao = đã báo trước.
// r.vay={id,goc,tong,tra,han,bao}: khoản vay; tong = tổng cố định (gốc + lãi trọn gói) chốt lúc vay, tra = còn phải trả (trả trước chỉ trừ vào tra). r.nha=1: có nhà ở quê (r.queAt). r.thue={at,gia,den}: nhà thuê, đã trả tới giờ den.
// r.ngoai: số đêm ngủ ngoài trời trong tháng đang tính; r.nguD: số ngày đã tính trong tháng đó.
FEAT.no=1;FEAT.nha=1;
let NO_CHIU=0,NO_BUSY=0,NGU_OK=0;
function noOn(){return feat('no');}
function noQue(r){r=r||G.run;return r&&r.queAt!=null?nodeById(r.queAt):null;}
function noAtQue(r){r=r||G.run;return !!r&&r.queAt!=null&&r.at===r.queAt&&!r.moving;}
function noTruy(r){const n=noQue(r);return !!n&&typeof danhGet==='function'&&danhGet('reg:'+(n.r!=null?n.r:0))<=NO.truyDanh;}
// được mua chịu: đang ở quê, chưa từng bị quan phủ phạt vì nợ, không bị truy nã ở quê
function noChiuOk(r){r=r||G.run;return noOn()&&noAtQue(r)&&!(r.noTra&&r.noTra.lan>0)&&!noTruy(r);}
function noDays(t){return Math.max(0,Math.ceil((t-W().t)/HD));}
function fmtBacN(d){d=Math.round(d||0);return d<0?'-'+fmtBac(-d):fmtBac(d);}
{const _f=fmtBac;fmtBac=function(d){return (d||0)<0?'-'+_f(-d):_f(d);};}
{const _f=fmtBacS;fmtBacS=function(d){return (d||0)<0?'-'+_f(-d):_f(d);};}
// tiền có thể âm khi mua chịu (NO_CHIU); thu nhập trả dần nợ vì nợ chính là số âm
{const _ba=bacAdd;bacAdd=function(d,why){const r=G.run;if(!r||!noOn())return _ba.apply(this,arguments);const b0=r.bac||0;d=Math.round(d||0);
  const floor=NO_CHIU?-Infinity:Math.min(b0,0);r.bac=Math.max(floor,b0+d);const x=r.bac-b0;dbg('tien.bac',{d:x,why:why||'',bac:r.bac});noSync(r);return x;};}
{const _bc=bacCan;bacCan=function(d){const r=G.run;if(!r||!noOn())return _bc.apply(this,arguments);if((r.bac||0)>=d)return true;return noChiuOk(r)&&(r.bac||0)-d>=-NO.chiu;};}
{const _bp=bacPay;bacPay=function(d,why){const r=G.run;if(!r||!noOn())return _bp.apply(this,arguments);if(!(d>0))return true;if(!bacCan(d))return false;
  const chiu=(r.bac||0)<d;NO_CHIU=1;try{bacAdd(-d,why);}finally{NO_CHIU=0;}if(chiu){dbg('no.chiu',{d,bac:r.bac});log(contentText('no.chiu',[fmtBacN(r.bac)]));}return true;};}
// mở / đóng sổ nợ theo số dư
function noSync(r){if(r.bac<0&&!r.noTra){r.noTra={t0:W().t,han:W().t+NO.han*HD,lan:0,bao:0};dbg('no.bat',{bac:r.bac});note(contentText('no.bat',[NO.han]),'dn');}
  else if(r.bac>=0&&r.noTra){r.noTra=null;dbg('no.xong',{});note(contentText('no.xong'),'up');}}

// ---------- quan phủ: kiểm hạn nợ và hạn vay ----------
function noTruyNa(r){const n=noQue(r);if(!n)return;const k='reg:'+(n.r!=null?n.r:0);const v=danhGet(k);if(v>NO.truyDanh)danhPut(k,NO.truyDanh-v);note(contentText('no.truy',[n.name]),'dn');dbg('no.truy',{k});}
function noHeo(r,lv){const H=NO.heo[Math.min(lv,NO.heo.length-1)];const s=S();r.hp=Math.max(1,r.hp-Math.round(s.maxHp*H.hp));if(H.w&&typeof addWound==='function')addWound(H.w,'quan');
  const so=lv?40:20;note(contentText('no.heo',[fmtBac(-r.bac),so,NO.giaHan]),'dn');log(contentText('no.heo',[fmtBac(-r.bac),so,NO.giaHan]));if(H.truy)noTruyNa(r);dbg('no.heo',{lv,hp:r.hp});}
function noLao(r){const nam=(-r.bac)>=NO.laoNam3?NO.laoNam[1]:NO.laoNam[0];const m=fmtBac(-r.bac);dbg('no.lao',{nam,bac:r.bac});
  r.scene=null;r.moving=null;NO_BUSY=1;VT_AN=1;NGU_OK=1;try{advanceTime(nam*HY);}finally{NO_BUSY=0;VT_AN=0;NGU_OK=0;}if(!G.run)return;
  r.bac=0;r.noTra=null;r.vay=null;r.thue=null;note(contentText('no.lao',[m,nam]),'dn');log(contentText('no.lao',[m,nam]));}
function noCheck(){const r=G.run;if(!r||!noOn()||NO_BUSY)return;if(r.scene&&r.scene.type==='combat')return;const t=W().t;
  // khoản vay: báo trước rồi chuyển thành nợ khi quá hạn
  const V=r.vay;if(V){if(!V.bao&&V.han-t<=NO.vayBao*HD){V.bao=1;note(contentText('no.vayBao',[noDays(V.han),fmtBac(V.tra)]),'dn');}
    if(t>=V.han){r.vay=null;NO_CHIU=1;try{bacAdd(-V.tra,'vay.qua');}finally{NO_CHIU=0;}note(contentText('no.vayQua',[fmtBac(V.tra)]),'dn');dbg('no.vayQua',{tra:V.tra});}}
  const D=r.noTra;if(!D||r.bac>=0)return;
  if(!D.bao&&D.han-t<=NO.bao*HD){D.bao=1;note(contentText('no.bao',[noDays(D.han),fmtBac(-r.bac)]),'dn');dbg('no.bao',{});}
  if(t<D.han)return;
  const nhieu=-r.bac>=NO.nhieu;const tuSi=!needFood(r);
  if(tuSi){if(!noTruy(r)){note(contentText('no.tuSi'),'dn');noTruyNa(r);}D.lan++;}
  else if(D.lan>=2||(nhieu&&D.lan>=1)){noLao(r);return;}
  else{if(nhieu)noTruyNa(r);noHeo(r,D.lan);D.lan++;}
  D.han=W().t+NO.giaHan*HD;D.bao=0;}

// ---------- nhà ở ----------
function nhaCo(r){r=r||G.run;const og=ORIGIN.find(o=>o.id===r.origin)||{};if(GD.none.includes(r.origin)||NHA.khong.includes(r.origin))return 0;return (og.grp||'thuong')==='kho'?0:1;}
function nhaOk(r){if(NGU_OK||VT_AN||r._inBq)return true;if(r.moving)return false;
  if(r.nha&&noAtQue(r))return true;if(r.thue&&r.thue.at===r.at)return true;if((r.troDen||0)>W().t)return true;
  return typeof anAtSect==='function'&&anAtSect(r);}
function nhaThang(r){const n=r.ngoai||0;r.ngoai=0;r.nguD=0;const N=NHA.ngoai;if(n<N.min)return;const s=S();
  r.hp=Math.max(1,r.hp-Math.round(s.maxHp*N.lanh*n/30));note(contentText('nha.lanh',[n]),'dn');dbg('nha.lanh',{n,hp:r.hp});
  if(R()<N.benh+N.benhNgay*n/30){r.hp=Math.max(1,r.hp-Math.round(s.maxHp*N.benhHp));r.tamma=(r.tamma||0)+N.benhTm;note(contentText('nha.benh'),'dn');log(contentText('nha.benh'));dbg('nha.benh',{hp:r.hp});}}
function nhaThueTra(r){const T=r.thue;if(!T||W().t<T.den)return;const n=nodeById(T.at);
  if((r.bac||0)>=T.gia){bacAdd(-T.gia,'thue');T.den+=HM;dbg('nha.thue',{gia:T.gia});}
  else{r.thue=null;note(contentText('nha.het',[n?n.name:'']),'dn');dbg('nha.het',{});}}
function nhaDay(){const r=G.run;if(!r||!feat('nha'))return;nhaThueTra(r);if(!needFood(r)){r.ngoai=0;r.nguD=0;return;}
  if(!nhaOk(r))r.ngoai=(r.ngoai||0)+1;r.nguD=(r.nguD||0)+1;if(r.nguD>=30)nhaThang(r);}
// ngày: nhà ở; sau đó kiểm hạn nợ (gộp theo tháng khi trôi quá dài)
{const _at=advanceTime;advanceTime=function(h){const o=_at.apply(this,arguments);const r=G.run;if(!r||!(h>0))return o;
  if(feat('nha')){r.nhaAcc=(r.nhaAcc||0)+h;let days=Math.floor(r.nhaAcc/24);r.nhaAcc-=days*24;
    if(days>AN.maxNgay){const ok=nhaOk(r);for(;days>AN.maxNgay&&G.run;days-=30){nhaThueTra(r);if(!needFood(r))continue;r.ngoai=ok?0:30;nhaThang(r);}}
    for(let i=0;i<days&&G.run;i++)nhaDay();}
  if(G.run)noCheck();return o;};}
// trọ ở quán (phòng, giường): tính là có chỗ ngủ tới ngày mai
{const _vd=venueDo;venueDo=function(v,id){if(v==='vay'||v==='nha')return noVenueDo(v,id);
  const tro=v==='inn'&&/phong|giuong|thuong/.test(id||'');if(!tro)return _vd.apply(this,arguments);NGU_OK=1;let res;try{res=_vd.apply(this,arguments);}finally{NGU_OK=0;}
  if(G.run&&res!==false)G.run.troDen=W().t+NHA.troNgay*HD;return res;};}

// ---------- người cho vay, nhà ở: nơi chọn việc ----------
VENUE_N.vay=contentText('no.vayN');VENUE_IN.vay=[contentText('no.vayIn1'),contentText('no.vayIn2')];
VENUE_N.nha=contentText('nha.n');VENUE_IN.nha=[contentText('nha.in1'),contentText('nha.in2')];
function nhaGia(n){return n&&NHA.thue[n.type]||0;}
{const _pa=placeActs;placeActs=function(n){const L=_pa.apply(this,arguments);const r=G.run;if(!r||!n||n.state==='ruin')return L;
  if(noOn()&&NO.vayNoi.includes(n.type)&&!L.some(x=>x.a==='vay'))L.push({a:'vay',i:'📜',l:contentText('no.vayN'),h:0,tip:contentText('no.vayTip'),dis:false,x:''});
  if(feat('nha')&&(NHA.thueNoi.includes(n.type)||(r.nha&&n.id===r.queAt))&&!L.some(x=>x.a==='nha'))L.push({a:'nha',i:'🏠',l:contentText('nha.n'),h:0,tip:contentText('nha.tip'),dis:false,x:''});
  return L;};}
function noVayOpts(n){const r=G.run,L=[];
  if(r.vay)L.push({id:'tra',l:contentText('no.traL',[fmtBac(r.vay.tra)]),d:contentText('no.traD',[noDays(r.vay.han)]),h:0,st:0,g:{txt:fmtBac(r.vay.tra)},no:(r.bac||0)>=r.vay.tra?'':contentText('no.khongDu')});
  const og=ORIGIN.find(o=>o.id===r.origin)||{};const kho=(og.grp||'thuong')==='kho';
  NO.vay.forEach((V,i)=>{const tra=V.tong;
    const why=r.vay?contentText('no.vayDang'):(r.bac<0||noTruy(r))?contentText('no.vayCam'):(kho&&i>=NO.khoVay)?contentText('no.vayKho'):'';
    L.push({id:V.id,l:contentText('no.vayL',[fmtBac(V.goc),V.thang,fmtBac(tra)]),d:contentText('no.vayD',[fmtBac(tra-V.goc),fmtBac(tra)]),h:0,st:0,g:{txt:'+'+fmtBac(V.goc)},no:why});});
  return L;}
function nhaOpts(n){const r=G.run,L=[];const home=r.nha&&n.id===r.queAt;
  if(home||(r.thue&&r.thue.at===n.id))L.push({id:'nghi',l:contentText('nha.nghiL',[NHA.nghiH]),d:contentText('nha.nghiD'),h:NHA.nghiH,st:0,no:''});
  if(r.thue&&r.thue.at===n.id)L.push({id:'tra',l:contentText('nha.traL'),d:contentText('nha.traD'),h:0,st:0,no:''});
  else if(!home&&nhaGia(n))L.push({id:'thue',l:contentText('nha.thueL',[fmtBac(nhaGia(n))]),d:contentText('nha.thueD'),h:0,st:0,g:{txt:fmtBac(nhaGia(n))},no:(r.bac||0)>=nhaGia(n)?'':contentText('no.khongDu')});
  return L;}
{const _vo=venueOpts;venueOpts=function(n,v){if(v==='vay')return noVayOpts(n);if(v==='nha')return nhaOpts(n);return _vo.apply(this,arguments);};}
function noVenueDo(v,id){const r=G.run,sc=r&&r.scene;if(!sc||sc.type!=='place')return false;const n=nodeById(sc.id);
  const o=venueOpts(n,v).find(x=>x.id===id);if(!o||o.no)return false;let msg,ch=[];
  if(v==='vay'){if(id==='tra'){const x=r.vay.tra;bacAdd(-x,'vay.tra');r.vay=null;msg=contentText('no.traXong',[fmtBac(x)]);ch=[bacChip(-x)];}
    else{const V=NO.vay.find(x=>x.id===id);const tra=V.tong;r.vay={id:V.id,goc:V.goc,tong:tra,tra,han:W().t+V.thang*HM,bao:0};bacAdd(V.goc,'vay');msg=contentText('no.vayXong',[fmtBac(V.goc),V.thang*30,fmtBac(tra)]);ch=[bacChip(V.goc)];}
    dbg('no.vay',{id,vay:r.vay});}
  else if(id==='thue'){const g=nhaGia(n);bacAdd(-g,'thue');r.thue={at:n.id,gia:g,den:W().t+HM};msg=contentText('nha.thueXong',[n.name]);ch=[bacChip(-g)];dbg('nha.thueMoi',{at:n.id,g});}
  else if(id==='tra'){r.thue=null;msg=contentText('nha.traXong');}
  else{NGU_OK=1;try{advanceTime(NHA.nghiH);}finally{NGU_OK=0;}if(!G.run)return true;const s=S();r.hp=Math.min(s.maxHp,r.hp+Math.round(s.maxHp*NHA.nghi));msg=contentText('nha.nghiXong');if(typeof tutTick==='function')tutTick('rest');}
  sc.msg=[msg];sc.chips=ch;sc.venue=null;sc.seq=(sc.seq||0)+1;saveSoon();return true;}
// dòng chữ cho HUD (hầu bao)
function noTip(r){r=r||G.run;if(!r)return '';const L=[];if(r.bac<0&&r.noTra)L.push(contentText('no.tip',[fmtBac(-r.bac),noDays(r.noTra.han)]));
  if(r.vay)L.push(contentText('no.tipVay',[fmtBac(r.vay.tra),noDays(r.vay.han)]));
  if(feat('nha')){const q=noQue(r),t=r.thue&&nodeById(r.thue.at);L.push(contentText('nha.tipNha',[t?contentText('nha.thue',[t.name,fmtBac(r.thue.gia)]):r.nha&&q?contentText('nha.co',[q.name]):contentText('nha.khong')]));}
  return L.length?'\n'+L.join('\n'):'';}
// kiếp mới: nhà theo xuất thân; bản lưu cũ cũng vậy
{const _nr=newRun;newRun=function(){const res=_nr.apply(this,arguments);const r=G.run;if(r){r.nha=nhaCo(r);r._nhaV1=1;}return res;};}
// Sửa-F câu 27: bản lưu cũ đang vay (lãi theo tháng): chốt tổng cố định = gốc + lãi tính tới hạn theo luật cũ (đã nằm sẵn trong tra lúc vay)
{const _r=run2;run2=function(){const r=_r.apply(this,arguments);if(r&&r.vay&&r.vay.tong==null){const V=r.vay,d=NO.vay.find(x=>x.id===V.id);V.tong=d?d.tong:V.tra;dbg('no.vayMigrate',{tong:V.tong,tra:V.tra});}return r;};}
{const _r=run2;run2=function(){const r=_r.apply(this,arguments);if(r&&!r._nhaV1){r._nhaV1=1;r.nha=nhaCo(r);if(r.ngoai==null)r.ngoai=0;}return r;};}
