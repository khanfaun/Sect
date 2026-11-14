// ================= TÚI TRỮ VẬT (logic nền) =================
// Khởi đầu chỉ có BAG_BODY ô (mang trên người). Túi trữ vật (relic k:'tui', đeo ở ô Trữ vật) mở thêm BAG_TUI[phẩm] ô, đánh dấu riêng (src:'tui').
// Ô của túi chỉ mở được khi có linh lực: phàm nhân hoặc linh lực = 0 thì các ô túi tạm khoá (đồ không mất, chỉ không lấy ra dùng được).
// Chưa đeo túi thì không có ô túi nên không gì bị khoá. Giao diện ô/khoá gắn sau qua bagLayout() và các trường bsrc/locked của bagItems().
// Mỗi món pháp bảo, mỗi loại vật liệu, trứng, lệnh bài và MỖI viên đan chiếm một ô.
const BAG_BODY=10;
function tuiEq(){const r=G.run;return r?eqOf().tuivat||null:null;}
function tuiOn(){const r=G.run;return !!(r&&!isPham()&&r.mp>0);}
function tuiSlots(){const t=tuiEq();if(!t)return 0;const up=((G.meta&&G.meta.upg&&G.meta.upg.tui)||0)*5;return BAG_TUI[clamp(t.tier||0,0,6)]+up;}
bagCap=function(){const r=G.run;if(!r)return BAG_BODY;return Math.min(BAG_MAX,BAG_BODY+tuiSlots());};
// các đơn vị chiếm ô, theo thứ tự: pháp bảo, vật liệu, trứng, lệnh bài, đan dược
function bagUnits(){const r=G.run;const U=[];r.relics.forEach((x,i)=>U.push({t:'r',i}));
  for(const k of Object.keys(r.mats||{}))if(r.mats[k]>0)U.push({t:'m',k});(r.eggs||[]).forEach((e,i)=>U.push({t:'e',i}));(r.passes||[]).forEach(g=>U.push({t:'q',g}));
  r.pills.forEach((p,i)=>U.push({t:'p',i}));return U;}
function bagLayout(){const slots=[];for(let i=0;i<BAG_BODY;i++)slots.push({i,src:'than',locked:false,unit:null});
  const ts=tuiSlots();for(let k=0;k<ts;k++)slots.push({i:slots.length,src:'tui',tuiName:(tuiEq()||{}).name,locked:!tuiOn(),unit:null});
  const over=[];bagUnits().forEach((u,n)=>{if(n<slots.length)slots[n].unit=u;else over.push(u);});
  return {slots,over,on:tuiOn(),cap:slots.length,used:bagUnits().length};}
function unitLocked(t,v){const L=bagLayout();const s=L.slots.find(x=>x.unit&&x.unit.t===t&&(t==='m'?x.unit.k===v:t==='q'?x.unit.g===v:x.unit.i===v));return !!(s&&s.locked);}
function bagLockNote(){note('Túi trữ vật bị khoá: không đủ linh lực để mở ra. Đồ vẫn còn nguyên.','dn');}
// gắn thông tin ô vào từng món của danh sách túi
{const _bi=bagItems;bagItems=function(){const L=_bi.apply(this,arguments);const ts=tuiSlots();if(!ts)return L;const lay=bagLayout();
  const f=(t,v)=>lay.slots.find(x=>x.unit&&x.unit.t===t&&(t==='m'?x.unit.k===v:t==='q'?x.unit.g===v:x.unit.i===v));
  for(const it of L){let s=null;const k=it.key;
    if(k[0]==='r')s=f('r',+k.slice(1));else if(k[0]==='m')s=f('m',k.slice(1));else if(k[0]==='e')s=f('e',+k.slice(1));else if(k[0]==='q')s=f('q',+k.slice(1));
    else if(k[0]==='p'){const idx=G.run.pills.map((p,i)=>i).filter(i=>('p'+G.run.pills[i].id+':'+(G.run.pills[i].q||0))===k);const sl=idx.map(i=>f('p',i)).filter(Boolean);it.lockedN=sl.filter(x=>x.locked).length;it.locked=sl.length>0&&it.lockedN===sl.length;it.bsrc=sl.some(x=>x.src==='tui')?'tui':'than';continue;}
    if(s){it.bsrc=s.src;it.locked=!!s.locked;}}
  return L;};}
// khoá thật: không dùng, mang, bán, đưa vào đan điền đồ nằm trong ô túi đang khoá
{const _eq=equip;equip=function(i){if(G.run.relics[i]&&unitLocked('r',i)){bagLockNote();return;}return _eq.apply(this,arguments);};}
{const _dp=ddPut;ddPut=function(i){if(G.run.relics[i]&&unitLocked('r',i)){bagLockNote();return false;}return _dp.apply(this,arguments);};}
{const _sl=sellItem;sellItem=function(k,i){if(k==='r'&&unitLocked('r',i)||k==='p'&&unitLocked('p',i)){bagLockNote();return;}return _sl.apply(this,arguments);};}
{const _up=usePill;usePill=function(idx,c){if(G.run.pills[idx]&&unitLocked('p',idx)){bagLockNote();return false;}return _up.apply(this,arguments);};}
{const _ln=learnBook;learnBook=function(i){if(G.run.relics[i]&&unitLocked('r',i)){bagLockNote();return null;}return _ln.apply(this,arguments);};}
