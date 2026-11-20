// Câu 80 (Đ8b đợt sau): MUA / BÁN ĐẤT, nhà riêng, tác dụng trận pháp hộ thân trên đất của ngươi (câu 78).
// Bảng: DAT.mua, CONG_TRINH.nha_rieng (content/rules/dat-dai.js) · chữ: content/text/dat-dai.json (dat.*).
// - Mục "Đất đai": ô TRỐNG ở thôn trấn / thành / chợ / ẩn cư có lựa chọn "mua" (giá theo loại nơi × loại chủ). Mua xong ô thành của ngươi ({k:'ta'}):
//   xây trận pháp hộ thân, nhà riêng trên đó (câu 79: ở nơi có dân chỉ xây trên đất đã mua); xây / phá trên đất mình không bị phạt.
// - Ô của ngươi ở nơi có dân bán lại được (DAT.mua.ban × giá), về tay dân nơi này, công trình giữ nguyên.
// - Từ chối: đang bị truy nã (mức ≥ naMin) ở vùng đó; người giữ vai ghét ngươi; thế lực quan hệ dưới Xa lạ; đã đủ toiDa ô ở nơi này.
// - Trả bằng bạc; tu sĩ thiếu bạc thì trả linh thạch (giá / DAT.mua.lt).
// - Nhà riêng: có chỗ ngủ (không bị lạnh), mục "Nhà ở" có "Nghỉ ở nhà" như nhà ở quê.
// - Trận pháp hộ thân của ngươi: bế quan ít bị quấy (bqRisk × tran.bq), tĩnh tọa lắng tâm ma nhanh hơn (× tran.tm), tính là có chỗ ngủ.
// Dữ liệu: chỉ dùng W().dat (chu {k:'ta'}); bản lưu cũ không cần chuyển.
const DAT_DAN=['tran','thanh','cho','ancu'];
function datCtTa(n,ct){if(!n||!feat('dat')||!G.run||!W())return false;const d=datStore()&&datStore()[n.id];return !!d&&d.o.some(c=>c.ct===ct&&c.chu&&c.chu.k==='ta');}
function datNhaTa(n){return datCtTa(n,'nha_rieng');}
function datTranTa(n){return datCtTa(n,'tran_phap');}
function datSoTa(n){const d=datStore()&&datStore()[n.id];return d?d.o.filter(c=>c.chu&&c.chu.k==='ta').length:0;}
// giá một ô (xu) theo loại nơi và chủ; chủ vai đã khuất thì tính như đất dân
function datGiaChu(c){const k=c&&c.chu&&c.chu.k;if(k==='vai'){const v=typeof vaiNow==='function'&&vaiNow(c.chu.id);return v&&v.song?'vai':'dan';}return k==='fa'?'fa':'dan';}
function datMuaGia(n,c){const M=DAT.mua;return Math.round((M.gia[n.type]||M.gia.tran)*(M.chu[datGiaChu(c)]||1));}
function datMuaLt(g){return Math.ceil(g/DAT.mua.lt);}
// lý do không mua được (chuỗi rỗng = được)
function datMuaNo(n,c){const r=G.run,M=DAT.mua;const g=datMuaGia(n,c);
  if(typeof tnaMuc==='function'&&feat('tna')&&tnaMuc(n.r!=null?n.r:(r.region||0))>=M.naMin)return contentText('dat.muaNa');
  if(datSoTa(n)>=M.toiDa)return contentText('dat.muaDu');
  const k=datGiaChu(c);
  if(k==='vai'){const v=vaiNow(c.chu.id);if(v&&favOf(v.ten)<M.favMin)return contentText('dat.muaGhet',[v.ten]);}
  if(k==='fa'&&typeof faQhBac==='function'&&faQhBac(c.chu.id)<M.faMin)return contentText('dat.muaFa',[datChuTen(c.chu)]);
  if((r.bac||0)>=g)return '';if(!isPham()&&(r.st||0)>=datMuaLt(g))return '';return contentText('dat.muaPham');}
function datMuaOpts(n){const d=datOf(n);if(!d||!DAT_DAN.includes(n.type))return [];const L=[];
  d.o.forEach((c,i)=>{const chuT=datChuTen(c.chu);
    if(c.chu&&c.chu.k==='ta'){const g=Math.round(datMuaGia(n,{chu:{k:'dan'}})*DAT.mua.ban);
      L.push({id:'ban:'+i,l:contentText('dat.oBan',[i+1,c.ct?CONG_TRINH[c.ct].n:contentText('dat.trongChu')]),d:contentText('dat.dBan',[fmtBac(g)]),h:DAT.mua.h,st:0,g:{txt:'+'+fmtBac(g)},no:''});return;}
    if(c.ct)return;const g=datMuaGia(n,c);
    L.push({id:'mua:'+i,l:contentText('dat.oMua',[i+1,chuT]),d:contentText('dat.dMua',[chuT,fmtBac(g)])+(isPham()?'':'\n'+contentText('dat.dMuaLt',[datMuaLt(g)])),h:DAT.mua.h,st:0,g:{txt:fmtBac(g)},no:datMuaNo(n,c)});});
  return L;}
function datMua(n,i){const d=datOf(n);const c=d&&d.o[i];const r=G.run;if(!c||c.ct||(c.chu&&c.chu.k==='ta')||!DAT_DAN.includes(n.type))return null;
  const no=datMuaNo(n,c);if(no){dbg('dat.muaChan',{id:n.id,i,no});return null;}
  const g=datMuaGia(n,c),chu=c.chu?Object.assign({},c.chu):null;let ch;
  if((r.bac||0)>=g){bacAdd(-g,'dat.mua');ch=bacChip(-g);}else{const lt=datMuaLt(g);r.st-=lt;ch=chip('💎','−'+lt,contentText('dat.gMua'),'dn');}
  advanceTime(DAT.mua.h);if(!G.run)return {msg:[]};
  c.chu={k:'ta'};c.muaTu=chu;dbg('dat.mua',{id:n.id,i,g,chu:chu?chu.k:''});
  const m=contentText('dat.xongMua',[i+1]);log(m);return {msg:[m],ch:[ch,chip('⏳',durH(DAT.mua.h),contentText('dat.gMua'),'')]};}
function datBan(n,i){const d=datOf(n);const c=d&&d.o[i];if(!c||!(c.chu&&c.chu.k==='ta')||!DAT_DAN.includes(n.type))return null;
  const g=Math.round(datMuaGia(n,{chu:{k:'dan'}})*DAT.mua.ban);advanceTime(DAT.mua.h);if(!G.run)return {msg:[]};
  bacAdd(g,'dat.ban');c.chu={k:'dan'};delete c.muaTu;dbg('dat.ban',{id:n.id,i,g});
  const m=contentText('dat.xongBan',[i+1]);log(m);return {msg:[m],ch:[bacChip(g)]};}
{const _o=datOpts;datOpts=function(n){let L=_o.apply(this,arguments);const M=datMuaOpts(n);if(!M.length)return L;L=L.filter(o=>o.id!=='xem');
  return M.concat(L);};}
{const _d=datDo;datDo=function(id){const p=String(id||'').split(':');if(p[0]!=='mua'&&p[0]!=='ban')return _d.apply(this,arguments);
  const r=G.run,sc=r&&r.scene;if(!sc||sc.type!=='place')return false;const n=nodeById(sc.id);const o=datOpts(n).find(x=>x.id===id);if(!o||o.no)return false;
  const res=p[0]==='mua'?datMua(n,+p[1]):datBan(n,+p[1]);if(!res)return false;
  if(G.run&&G.run.scene===sc){sc.msg=res.msg;sc.chips=res.ch||[];sc.venue=null;sc.seq=(sc.seq||0)+1;}saveSoon();return true;};}
// ---------- nhà riêng: chỗ ngủ, nghỉ ở nhà ----------
{const _ok=nhaOk;nhaOk=function(r){if(_ok.apply(this,arguments))return true;if(!r||r.moving)return false;const n=nodeById(r.at);
  return !!n&&(datNhaTa(n)||(DAT.mua.tran.ngu&&datTranTa(n)));};}
{const _no=nhaOpts;nhaOpts=function(n){let L=_no.apply(this,arguments);if(!datNhaTa(n))return L;L=L.filter(o=>o.id!=='thue');
  if(!L.some(o=>o.id==='nghi'))L.unshift({id:'nghi',l:contentText('nha.nghiL',[NHA.nghiH]),d:contentText('nha.nghiD'),h:NHA.nghiH,st:0,no:''});return L;};}
{const _pa=placeActs;placeActs=function(n){const L=_pa.apply(this,arguments);if(!G.run||!n||!datNhaTa(n)||L.some(x=>x.a==='nha'))return L;
  L.push({a:'nha',i:'🏠',l:contentText('nha.n'),h:0,tip:contentText('nha.tip'),dis:false,x:''});return L;};}
// ---------- trận pháp hộ thân trên đất của ngươi (câu 78) ----------
{const _br=bqRisk;bqRisk=function(y){const v=_br.apply(this,arguments);const n=curNode();return n&&datTranTa(n)?v*DAT.mua.tran.bq:v;};}
{const _tt=tinhToa;tinhToa=function(m){const r=G.run;const n=r&&nodeById(r.at);const tp=!!n&&datTranTa(n);const tm0=r?(r.tamma||0):0;
  const o=_tt.apply(this,arguments);const g=G.run;if(o&&g&&tp){const giam=tm0-(g.tamma||0);if(giam>0){const them=Math.round(giam*(DAT.mua.tran.tm-1));g.tamma=Math.max(0,(g.tamma||0)-them);dbg('dat.tranTinh',{giam,them});}}
  return o;};}
