// Cụm hội thoại ở địa điểm (LoiKe trong src/react/canh/DiaDiem.jsx) giữ được qua các chuyện:
// - làm xong một sự kiện (chuyện trước mắt, cổng sơn môn, thăm dò…) rồi quay về: ghi tên chuyện, lời kể, lựa chọn và kết quả vào hội thoại;
// - quay về cùng nơi (sau sự kiện, sau trận) thì giữ nguyên các dòng cũ; rời nơi đó thì xoá.
// Chỉ giữ trong phiên (UI), không ghi vào bản lưu.
function lkLuu(sc){if(sc&&sc.type==='place'&&sc.hist)UI.plHist={id:sc.id,at:G.run.at,k:G.run.kiep,hist:sc.hist};}
{const _es=endScene;endScene=function(){const r=G.run,sc=r&&r.scene;
  if(sc&&sc.type==='event'&&sc.back!=null&&Array.isArray(sc.story)){const e=EVMAP[sc.id];
    const m=[];for(const x of sc.story){if(typeof x==='string')m.push(x);else if(x&&x.q)m.push('› '+x.q);}
    UI.plEvLog={back:sc.back,q:(e&&e.n)||'Một chuyện',m:m.slice(-10),c:(sc.chips||[]).slice()};dbg('pl.evlog',{id:sc.id,n:m.length});}
  return _es.apply(this,arguments);};}
{const _op=openPlace;openPlace=function(id){const r0=G.run,prev=r0&&r0.scene;if(prev&&prev.type==='place')lkLuu(prev);
  const o=_op.apply(this,arguments);const r=G.run,sc=r&&r.scene;if(!sc||sc.type!=='place')return o;
  const H=UI.plHist;if(H&&H.id===sc.id&&H.at===r.at&&H.k===r.kiep&&Array.isArray(H.hist)){sc.hist=H.hist.slice();sc.histK=null;}
  const L=UI.plEvLog;if(L&&L.back===sc.id){sc.hist=sc.hist||[];sc.hist.push({q:L.q,m:L.m,c:L.c,ev:1});if(sc.hist.length>12)sc.hist.shift();UI.plEvLog=null;lkLuu(sc);}
  return o;};}
{const _lv=leavePlace;leavePlace=function(){UI.plHist=null;UI.plEvLog=null;return _lv.apply(this,arguments);};}
