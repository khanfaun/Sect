// Sửa-C.18: trắc ra Địa / Thiên linh căn — ẩn mọi hộp thoại, chân trang, biểu tượng; chạy dị tượng toàn màn rồi mới hiện kết quả.
// Luật (đặt r.tlFx) ở core2/45-sua-c.js; giao diện: src/react/hop-thoai/TracLinh.jsx (HopThoai:tlfx).
{const _m=modalHTML;modalHTML=function(){const r=G.run;const fx=r&&r.tlFx;const de=document.documentElement;
  if(fx&&G.screen==='map'&&!(r.scene&&r.scene.type==='combat')){UI.modal={k:'tlfx'};UI.panel=null;UI.sel=null;UI.cell=null;UI.pop=null;UI.hold=null;UI.confirm=null;UI.menu=null;
    de.dataset.asc='1';de.dataset.tlfx=fx.k;return {rx:'HopThoai:tlfx'};}
  if(de.dataset.tlfx){delete de.dataset.tlfx;delete de.dataset.asc;}if(UI.modal&&UI.modal.k==='tlfx')UI.modal=null;return _m.apply(this,arguments);};}
ACT.tlFxDone=()=>{const r=G.run;if(!r||!r.tlFx)return;dbg('tl.fxDone',{k:r.tlFx.k});r.tlFx=null;UI.modal=null;const de=document.documentElement;delete de.dataset.tlfx;delete de.dataset.asc;clearTimeout(UI.tlFxT);UI.tlFxId=null;};

// Song / Tam / Tứ / Ngũ hành tạp linh căn: dị tượng nhẹ, kém Địa/Thiên (chỉ giao diện, không đụng luật).
// Bậc càng cao càng rực: song (2 quầng nhẹ) < tam < tứ; tạp thì đục, lẫn nhiều màu nhưng yếu.
const TL_FXL={song:{ms:2400,n:2,t:'Song linh căn',s:'Hai khí giao hòa',l:['Hai luồng linh khí khẽ quấn lấy nhau trên mặt đá.']},
  tam:{ms:3000,n:3,t:'Tam linh căn',s:'Ba khí cùng hiện',l:['Ba luồng linh khí lần lượt sáng lên, tản ra thành những vòng sáng mờ.']},
  tu:{ms:3600,n:4,t:'Tứ linh căn',s:'Bốn khí tụ về',l:['Bốn luồng linh khí cùng bừng lên, đá trắc linh rực một thoáng.']},
  tap:{ms:3800,n:5,t:'Ngũ hành tạp linh căn',s:'Ngũ khí lẫn lộn',l:['Năm luồng linh khí đục mờ lẫn vào nhau, chớp lên yếu ớt rồi tắt dần.']}};
{const _tr=tlResult;tlResult=function(cach){const r=G.run;const res=_tr.apply(this,arguments);if(!r||G.run!==r||r.tlFx||!r.root||!TL_FXL[r.root.id])return res;
  r.tlFx={k:r.root.id,id:Date.now()+Math.floor(Math.random()*1e3),cach,lt:1,els:(r.root.els||[]).slice()};dbg('tl.fxLight',{k:r.root.id});return res;};}
