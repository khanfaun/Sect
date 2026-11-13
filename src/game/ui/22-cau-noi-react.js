// ---------- cầu nối với phần giao diện viết bằng React (src/react/) ----------
// PS.<tên>: cho React đọc mọi biến chung của game (kể cả G, UI, CFG khai báo bằng let/const).
window.PS=new Proxy({},{get:(_,k)=>{try{return eval(String(k));}catch(e){return undefined;}}});
// rxv: nếu phần React đã nạp và có màn này thì vẽ bằng React (setH lo phần còn lại), không thì dùng bản chuỗi HTML cũ.
function rxv(name,fb){return window.RX&&RX.has(name)?{rx:name,fb}:fb();}
