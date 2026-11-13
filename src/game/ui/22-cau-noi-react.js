// ---------- cầu nối với phần giao diện viết bằng React (src/react/) ----------
// PS.<tên>: cho React đọc mọi biến chung của game (kể cả G, UI, CFG khai báo bằng let/const).
window.PS=new Proxy({},{get:(_,k)=>{try{return eval(String(k));}catch(e){return undefined;}}});
// rxv: nếu phần React đã nạp và có màn này thì dùng React, không thì dùng bản chuỗi HTML cũ.
function rxv(name,fb){return window.RX&&RX.has(name)?{rx:name,fb}:fb();}
{const _setH=setH;setH=function(id,html){const el=document.getElementById(id);if(!el)return false;
  if(html&&typeof html==='object'){
    try{RX.show(el,html.rx);HCACHE[id]=undefined;el.hidden=false;el.dataset.k=viewKey(id);return true;}
    catch(e){console.error(e);RX.hide(el);html=html.fb();}}
  else if(el._rx)RX.hide(el);
  return _setH(id,html);};}
