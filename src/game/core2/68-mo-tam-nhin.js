// Mở sẵn bản đồ trong tầm thần thức ngay khi vào kiếp mới hoặc nạp bản lưu, không đợi di chuyển.
// Gọi sau cùng (sau mọi lớp bọc newRun) để thần thức đã tính đủ; ô mở đầu hiện ngay, không loang mực (VT=0).
function visOpen(){const r=G.run;if(!r||r.at==null||typeof sense!=='function')return 0;
  visLoad();sense();let n=0;for(let i=0;i<HN;i++)if(VNOW[i]){VIS[i]=1;VT[i]=0;n++;}visSave();VIS_N++;
  dbg('mo.vis0',{at:r.at,n});return n;}
{const _nr=newRun;newRun=function(){const x=_nr.apply(this,arguments);if(G.run)visOpen();return x;};}
if(typeof loadData==='function'){const _ld=loadData;loadData=function(){const x=_ld.apply(this,arguments);if(G.run)visOpen();return x;};}
