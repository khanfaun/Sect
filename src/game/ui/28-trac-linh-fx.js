// Sửa-C.18: trắc ra Địa / Thiên linh căn — ẩn mọi hộp thoại, chân trang, biểu tượng; chạy dị tượng toàn màn rồi mới hiện kết quả.
// Luật (đặt r.tlFx) ở core2/45-sua-c.js; giao diện: src/react/hop-thoai/TracLinh.jsx (HopThoai:tlfx).
{const _m=modalHTML;modalHTML=function(){const r=G.run;const fx=r&&r.tlFx;const de=document.documentElement;
  if(fx&&G.screen==='map'&&!(r.scene&&r.scene.type==='combat')){UI.modal={k:'tlfx'};UI.panel=null;UI.sel=null;UI.cell=null;UI.pop=null;UI.hold=null;UI.confirm=null;UI.menu=null;
    de.dataset.asc='1';de.dataset.tlfx=fx.k;return {rx:'HopThoai:tlfx'};}
  if(de.dataset.tlfx){delete de.dataset.tlfx;delete de.dataset.asc;}if(UI.modal&&UI.modal.k==='tlfx')UI.modal=null;return _m.apply(this,arguments);};}
ACT.tlFxDone=()=>{const r=G.run;if(!r||!r.tlFx)return;dbg('tl.fxDone',{k:r.tlFx.k});r.tlFx=null;UI.modal=null;const de=document.documentElement;delete de.dataset.tlfx;delete de.dataset.asc;clearTimeout(UI.tlFxT);UI.tlFxId=null;};
