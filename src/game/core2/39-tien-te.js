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
