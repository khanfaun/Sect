// ---------- giao diện mới: màn Động phủ (màn chính) và chế độ Hành tẩu (bản đồ) ----------
// Màn chính là động phủ: nhân vật ngồi thiền giữa cảnh núi trăng. Bản đồ chỉ mở khi bấm "Hành tẩu".
// UI.xemMap: đang xem bản đồ. Đang đi đường / bị cản giữa đường thì tự ở bản đồ.
function dpHome(){const r=G.run;if(!r||G.screen!=='map'||r.scene)return false;if(UI.xemMap||r.moving)return false;if(r.dest!=null&&r.dest!==r.at)return false;return true;}
ACT.xemMap=()=>{UI.xemMap=true;UI.panel=null;UI.sel=null;UI.mark=null;UI.cell=null;UI.pop=null;dbg('dp.map',{});setTimeout(()=>{try{ACT.center();render();}catch(e){}},0);};
ACT.xemHome=()=>{UI.xemMap=false;UI.panel=null;UI.sel=null;UI.mark=null;UI.cell=null;UI.pop=null;UI.hold=null;dbg('dp.home',{});};
// chỗ đặt sẵn cho tính năng chưa làm
ACT.sapCo=k=>{note((k||'Tính năng này')+' sẽ mở ở bản sau.');};
// đi tới đâu thì ở lại bản đồ để thấy đường
{const _go=ACT.go;ACT.go=function(a){UI.xemMap=true;return _go.apply(this,arguments);};}
{const _gc=ACT.goCell;ACT.goCell=function(a){UI.xemMap=true;return _gc.apply(this,arguments);};}
