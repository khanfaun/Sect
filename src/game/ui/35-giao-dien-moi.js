// Giao diện mới (kiểu Ngọc Hành Trình): nút "Nhân vật" ở thanh dưới mở bảng nhân vật ở thẻ Căn cơ
// (nếu đang ở thẻ Túi đồ thì chuyển thẻ chứ không đóng bảng).
ACT.navChar=()=>{if(UI.panel==='char'&&UI.tab.char!=='bag'){UI.panel=null;return;}UI.panel='char';if(UI.tab.char==='bag')UI.tab.char='base';UI.code=null;UI.msg=null;dbg('gd.nav',{k:'char',tab:UI.tab.char||'base'});};
