// Trú Nhan Đan: uống vào thì dung nhan (độ tuổi trên hình) cố định vĩnh viễn ở độ tuổi lúc uống; tuổi thật vẫn tăng.
// Lưu ở r.truNhan ('teen'|'young'|'middle'|'elder'). Luân hồi tạo nhân vật mới (newRun) nên tự mất tác dụng.
// Ngoại hình đọc r.truNhan ở nhDoTuoi (core2/84). Đan hiếm: thêm vào nguồn rơi đan khi đã tu (rT()>=1), tỉ lệ thấp.
{const _u=usePill;usePill=function(idx,inCombat){
  const r=G.run,it=r&&r.pills[idx];
  if(it&&it.id==='trunhan'){const k=nhDoTuoi(r);const m=_u.apply(this,arguments);if(m!==null){r.truNhan=k;dbg('trunhan.uong',{tuoi:Math.floor(r.age),dungNhan:k});}return m;}
  return _u.apply(this,arguments);};}
{const _r=rollPill;rollPill=function(){if(G.run&&!G.run.pham&&rT()>=1&&chance(.03))return 'trunhan';return _r.apply(this,arguments);};}
