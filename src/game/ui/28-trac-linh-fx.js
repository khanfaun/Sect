// Sửa-C.18: trắc ra Địa / Thiên linh căn — ẩn mọi hộp thoại, chân trang, biểu tượng; chạy dị tượng toàn màn rồi mới hiện kết quả.
// Luật (đặt r.tlFx) ở core2/45-sua-c.js; giao diện: src/react/hop-thoai/TracLinh.jsx (HopThoai:tlfx).
{const _m=modalHTML;modalHTML=function(){const r=G.run;const fx=r&&r.tlFx;const de=document.documentElement;
  if(fx&&G.screen==='map'&&!(r.scene&&r.scene.type==='combat')){UI.modal={k:'tlfx'};UI.panel=null;UI.sel=null;UI.cell=null;UI.pop=null;UI.hold=null;UI.confirm=null;UI.menu=null;
    de.dataset.asc='1';de.dataset.tlfx=fx.k;return {rx:'HopThoai:tlfx'};}
  if(de.dataset.tlfx){delete de.dataset.tlfx;delete de.dataset.asc;}if(UI.modal&&UI.modal.k==='tlfx')UI.modal=null;return _m.apply(this,arguments);};}
ACT.tlFxDone=()=>{const r=G.run;if(!r||!r.tlFx)return;dbg('tl.fxDone',{k:r.tlFx.k});r.tlFx=null;UI.modal=null;const de=document.documentElement;delete de.dataset.tlfx;delete de.dataset.asc;clearTimeout(UI.tlFxT);UI.tlFxId=null;};

// Dị tượng nhẹ (chỉ giao diện, không đụng luật). Thứ bậc mạnh→yếu: Thiên > Địa (toàn màn, TL_FX) > Biến dị > Song > Tam > Tứ > Tạp.
// rk: bậc (càng lớn càng mạnh) — thời gian, số tia, số vòng sáng, độ rực đều giảm dần theo bậc. Chữ: content/text (tlfx.title/sub/lt.*).
const TL_FXL={bien:{rk:5,ms:5200,rays:16,rings:3,orbs:6},song:{rk:4,ms:3800,rays:8,rings:2},tam:{rk:3,ms:3200,rays:0,rings:1},
  tu:{rk:2,ms:2800,rays:0,rings:1},tap:{rk:1,ms:2400,rays:0,rings:1}};
function tlFxlText(fx){const k=fx.k;const e=(fx.els||[])[0];
  const lt=k==='bien'?(CONTENT_TEXT['tlfx.lt.bien.'+e]!=null?'tlfx.lt.bien.'+e:'tlfx.lt.bien.x'):'tlfx.lt.'+k;
  return {t:contentText('tlfx.title.'+k),s:contentText('tlfx.sub.'+k),l:[contentText(lt)]};}
{const _tr=tlResult;tlResult=function(cach){const r=G.run;const res=_tr.apply(this,arguments);if(!r||G.run!==r||r.tlFx||!r.root||!TL_FXL[r.root.id])return res;
  r.tlFx={k:r.root.id,id:Date.now()+Math.floor(Math.random()*1e3),cach,lt:1,els:(r.root.els||[]).slice()};dbg('tl.fxLight',{k:r.root.id,rk:TL_FXL[r.root.id].rk});return res;};}
