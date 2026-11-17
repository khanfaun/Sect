// ---------- cầu nối với phần giao diện viết bằng React (src/react/) ----------
// PS.<tên>: cho React đọc mọi biến chung của game (kể cả G, UI, CFG khai báo bằng let/const).
window.PS=new Proxy({},{get:(_,k)=>{try{return eval(String(k));}catch(e){return undefined;}}});
// Mọi màn đều vẽ bằng React: game chỉ trả về tên màn, setH (19-main.js) gọi RX.show để vẽ.
function rxv(name){return {rx:name};}
// Hộp thoại: lớp ngoài cùng. Khí vận (asc) và chọn tiên thiên (kvPick) tự mở; còn lại theo UI.modal.k.
function modalHTML(){const m=UI.modal,r=G.run;
  const asc=r&&r.asc&&G.screen==='map'&&!(r.scene&&r.scene.type==='combat');
  if(asc){if(!UI.modal||UI.modal.k!=='asc')UI.modal={k:'asc'};UI.panel=null;UI.sel=null;UI.cell=null;UI.pop=null;UI.hold=null;UI.confirm=null;UI.menu=null; // đột phá / xung kích: đóng hết bảng và hộp thoại khác trước khi chạy hiệu ứng
    document.documentElement.dataset.asc='1';return {rx:'HopThoai:asc'};}
  delete document.documentElement.dataset.asc;if(UI.modal&&UI.modal.k==='asc')UI.modal=null;
  if(!UI.modal&&r&&r.kvPick&&(!r.scene||r.scene.type==='place')&&G.screen==='map')return {rx:'HopThoai:kvPick'};
  if(UI.modal&&window.RX&&RX.has('HopThoai:'+UI.modal.k))return {rx:'HopThoai:'+UI.modal.k};
  return '';}
