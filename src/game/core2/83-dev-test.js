// ================= DEV TEST (công cụ thử) =================
// Luật cho các tab của hộp Dev test (giao diện: src/react/hop-thoai/DevTest.jsx, nút: ui/34-dev-test.js).
// Cảnh giới · Bản đồ · Vật phẩm · Khí vận & thể chất · Thương thế · Dàn trận. (Tự chơi bằng máy: ui/34-dev-test.js + dev/01-bot-loi.js)
// Mọi thứ ở đây chỉ để thử, không có trong lối chơi thường.

// ép cấp độ kẻ địch khi dựng trận thử (mkEnemy/enemyUnit đọc rT/rTv)
let DEV_RT=null;
{const _a=rT;rT=function(){return DEV_RT!=null?DEV_RT:_a.apply(this,arguments);};}
{const _b=rTv;rTv=function(){return DEV_RT!=null?DEV_RT:_b.apply(this,arguments);};}

// ---------- cảnh giới ----------
// re: -1 = phàm nhân, 0..5 = Luyện Khí..Độ Kiếp; g: tầng (Luyện Khí 1–13) hoặc tiểu cảnh giới (1–4)
function devTangMax(re){return re<0?0:re===0?LK_TH.length:SG_TH.length;}
function devSetRealm(re,g,giu){const r=G.run;if(!r)return false;re=clamp(+re,-1,REALM.length-1);
  if(re<0){r.pham=1;r.realm=0;r.tv=0;r.sg=1;r.lkG=0;}
  else{r.pham=0;r.realm=re;const th=re===0?LK_TH:SG_TH;g=clamp(+g||1,1,th.length);r.sg=g;r.tv=th[g-1];if(re===0)r.lkG=g;}
  r.quality=r.quality||[0,0,0,0,0,0];while(r.quality.length<6)r.quality.push(0);
  r.asc=null;r.kvPick=null;r.htPick=null;
  if(typeof catMountSync==='function')catMountSync();if(typeof syncSkills==='function')syncSkills();
  if(!giu){const s=S();r.hp=s.maxHp;r.mp=s.maxMp;}else clampHp();
  dbg('dev.realm',{re,g:r.sg});return true;}

// ---------- bản đồ ----------
function devMoMap(){const r=G.run;if(!r)return 0;visLoad();if(VIS){VIS.fill(1);visSave();VIS_N++;}let n=0;
  for(const R0 of W().regions)for(const x of R0.nodes){if((x.fog||0)<3){x.fog=3;n++;}}
  if(typeof geo==='function'){const g=geo();if(g)g.nodeAt=null;}dbg('dev.map',{n});return n;}

// ---------- vật phẩm ----------
// các loại: pb (trang bị, pháp bảo, túi…), cp (công pháp → bí tịch), dan (đan dược), lieu (vật liệu), vat (vật phẩm), xe (phương tiện), trung (trứng linh thú)
const DEV_LOAI=[['pb','Trang bị · pháp bảo'],['cp','Công pháp'],['dan','Đan dược'],['lieu','Vật liệu'],['vat','Vật phẩm'],['xe','Phương tiện'],['trung','Trứng linh thú']];
function devBeasts(){return Object.keys(EN).filter(k=>EN[k].f==='thu'&&EN[k].nb&&EN[k].nb.length);}
function devList(loai){
  if(loai==='pb')return CAT.relics.filter(x=>x.status!=='off').map(x=>({id:x.id,n:x.n,t:x.t||0,sub:x.k}));
  if(loai==='cp')return CAT.arts.map(x=>({id:x.id,n:x.n,t:x.t||0,sub:x.type==='tp'?'tâm pháp':'công pháp'}));
  if(loai==='dan')return Object.keys(PILL).map(id=>({id,n:PILL[id].n,t:PILL[id].reg||0,em:PILL[id].i}));
  if(loai==='lieu')return CAT.mats.map(x=>({id:x.id,n:x.n,t:x.t||0,em:x.i}));
  if(loai==='vat')return CAT.qitems.map(x=>({id:x.id,n:x.n,t:0,em:x.i}));
  if(loai==='xe')return CAT_MOUNT.map(x=>({id:x.id,n:x.n,t:x.realm||0,sub:'×'+x.m}));
  if(loai==='trung')return devBeasts().map(k=>({id:k,n:EN[k].nb[0],t:0,em:EN[k].i}));
  return [];}
// đưa một món; trả true nếu được
function devGive(loai,id){const r=run2();if(!r)return false;
  if(loai==='pb'){const x=CAT.byId[id]||CAT.relics.find(y=>y.id===id);if(!x)return false;r.relics.push(catRelic(x));return true;}
  if(loai==='cp'){const x=CAT.arts.find(y=>y.id===id);if(!x)return false;r.relics.push(bookOf(catArt(x)));return true;}
  if(loai==='dan'){if(!PILL[id])return false;gainPill(id,1);return true;}
  if(loai==='lieu'){r.mats=r.mats||{};r.mats[id]=(r.mats[id]||0)+1;return true;}
  if(loai==='vat'){if(!CAT.byId[id])return false;(r.qitems=r.qitems||[]).push(id);return true;}
  if(loai==='xe'){if(!CAT_MOUNT.some(x=>x.id===id))return false;r.mount=id;if(typeof catMountSync==='function')catMountSync();return true;}
  if(loai==='trung'){const E=EN[id];if(!E)return false;(r.eggs=r.eggs||[]).push({k:id,n:E.nb[0],i:E.i,el:(E.el&&E.el[0])||'vo',t:W().t});return true;}
  return false;}
// đưa nhiều món (ids rỗng = cả loại); bỏ qua giới hạn túi để thử cho tiện
function devGiveMany(loai,ids){const L=ids&&ids.length?ids:devList(loai).map(x=>x.id);let n=0;
  const _cap=typeof bagCap==='function'?bagCap:null;if(_cap)bagCap=function(){return 99999;};
  try{for(const id of L)if(devGive(loai,id))n++;}finally{if(_cap)bagCap=_cap;}
  dbg('dev.give',{loai,n});return n;}

// ---------- khí vận, thể chất ----------
// tt: tiên thiên khí vận (r.kv) · the: thể chất (r.the) · ht: hậu thiên khí vận (r.htkv)
function devKvList(k){if(k==='tt')return Object.values(TT_DEST).map(d=>({id:d.id,n:d.name||d.n||d.id,t:(d.rank||1)-1,d:d.description||''}));
  if(k==='the')return TT_PHYS.map(d=>({id:d.id,n:d.name,t:(d.rank||1)-1,d:d.description||''}));
  if(k==='ht')return HTKV.map(d=>({id:d.id,n:d.n,t:(d.r||1)-1,d:d.d||''}));return [];}
function devKvCo(k){const r=G.run;if(!r)return [];return k==='tt'?(r.kv||[]):k==='the'?(r.the||[]):k==='ht'?(r.htkv||[]):[];}
function devKvAdd(k,id){const r=G.run;if(!r||devKvCo(k).includes(id))return false;
  if(k==='tt'){if(!TT_DEST[id])return false;kvGain(id,'dev');}else if(k==='the'){if(!ttPhysOf(id))return false;r.the=(r.the||[]).concat(id);}
  else if(k==='ht'){if(!HTMAP[id])return false;r.htkv=(r.htkv||[]).concat(id);}else return false;clampHp();dbg('dev.kv',{k,id,c:'+'});return true;}
function devKvDel(k,id){const r=G.run;if(!r)return false;const f=a=>(a||[]).filter(x=>x!==id);
  if(k==='tt')r.kv=f(r.kv);else if(k==='the')r.the=f(r.the);else if(k==='ht')r.htkv=f(r.htkv);else return false;clampHp();dbg('dev.kv',{k,id,c:'-'});return true;}

// ---------- thương thế ----------
function devWList(){return Object.keys(WOUND).map(k=>({k,n:WOUND[k].n||k,lv:WT_LV[k]||1}));}
function devWCo(){return wounds().map(x=>x.k);}
function devWAdd(k){if(!WOUND[k])return false;addWound(k,'dev');return true;}
function devWDel(k){return cureWound(k==null?Object.keys(WOUND):[k])>0;}

// ---------- dàn trận ----------
// lựa chọn: 'main' (nhân vật chính), 'rv:<i>' (thiên kiêu), 'en:<loài>' (người hoặc yêu thú trong bảng kẻ địch)
function devCbList(){const w=W();const L=[{v:'main',n:'Nhân vật chính',nhom:'Nhân vật chính'}];
  (w.rivals||[]).forEach((x,i)=>L.push({v:'rv:'+i,n:x.ten,nhom:'Thiên kiêu',sub:(w.sects[x.s]||{}).n||''}));
  for(const k of Object.keys(EN)){const E=EN[k];if(E.f==='nhan')L.push({v:'en:'+k,n:String((E.t&&E.t[0])||k).replace(/\{\$?\w+\}/g,'tông môn'),nhom:'Người',em:E.i});}
  for(const k of Object.keys(EN)){const E=EN[k];if(E.f==='thu'||E.f==='quy')L.push({v:'en:'+k,n:(E.nb&&E.nb[0])||(E.t&&E.t[0])||k,nhom:E.f==='thu'?'Yêu thú':'Quỷ vật',em:E.i});}
  return L;}
function devMkUnit(sc,v,re,side){const w=W();re=clamp(+re||0,0,4);let e,ten=null,sub=null;
  DEV_RT=re;try{
    if(v.startsWith('rv:')){const wr=w.rivals[+v.slice(3)];if(!wr)return null;e=mkEnemy({k:'human'});ten=wr.ten;sub=(w.sects[wr.s]||{}).n;}
    else if(v.startsWith('en:')){const k=v.slice(3);if(!EN[k])return null;e=mkEnemy({k});}
    else return null;
    const u=enemyUnit(e,sc.nid++,1);if(ten){u.name=ten;u.realName=ten;}if(sub)u.sub=sub+' · '+REALM[re];
    u.side=side;u.ctrl='ai';u.realm=re;u._triK=undefined;if(side==='A'){u.ally=-100-u.id;u.intent=null;}return u;}finally{DEV_RT=null;}}
// A, B: [{v, re}] (re của nhân vật chính: -1..5). Trận thử: không chết, xong trận trả lại khí huyết, linh lực, cảnh giới như trước.
function devCombat(A,B){const r=G.run;if(!r||!B||!B.length)return false;
  const snap={hp:r.hp,mp:r.mp,realm:r.realm,pham:r.pham,tv:r.tv,sg:r.sg,lkG:r.lkG,party:(r.party||[]).slice()};
  const mA=(A||[]).find(x=>x.v==='main');r.party=[];
  if(mA&&mA.re!=null)devSetRealm(mA.re,mA.g||1);
  startCombat({cnt:1},{kind:'dev'});const sc=r.scene;
  // trả lại cảnh giới ngay: đơn vị đã mang chỉ số theo cảnh giới chọn
  Object.assign(r,{realm:snap.realm,pham:snap.pham,tv:snap.tv,sg:snap.sg,lkG:snap.lkG});r.party=snap.party;
  sc.units=sc.units.filter(u=>u.isMain);const me=sc.units[0];
  if(!mA){me.gone=1;me.phase='down';}
  for(const x of A||[]){if(x.v==='main')continue;const u=devMkUnit(sc,x.v,x.re,'A');if(u)sc.units.push(u);}
  for(const x of B){const u=devMkUnit(sc,x.v,x.re,'B');if(u)sc.units.push(u);}
  const foes=sc.units.filter(u=>u.side==='B');if(!foes.length||!sc.units.some(u=>u.side==='A'&&!u.gone)){r.scene=null;Object.assign(r,{hp:snap.hp,mp:snap.mp});return false;}
  sc.en={n:foes[0].name,k:foes[0].k,i:foes[0].icon,el:foes[0].el,sub:foes[0].sub};sc.spar=true;sc.dev=snap;sc.log=[];
  clog(sc,'Trận thử: '+sc.units.filter(u=>u.side==='A'&&!u.gone).map(u=>u.isMain?'Ngươi':u.name).join(', ')+' đấu '+foes.map(u=>u.name).join(', ')+'.');
  const L=sc.units.filter(u=>!u.immune&&!u.gone);sc.tpTB=Math.max(1,L.reduce((a,u)=>a+u.tp,0)/L.length);sc.hoiTB=Math.max(1,L.reduce((a,u)=>a+u.hoi,0)/L.length);
  for(const u of sc.units)if(u.ctrl==='ai'&&!u.gone)nextIntent(u);
  dbg('dev.tran',{a:(A||[]).length,b:B.length});return true;}
// thua khi cả phe ta (kể cả đồng đội) gục, không phải chỉ khi nhân vật chính gục
{const _ce=checkEnd;checkEnd=function(sc){if(sc&&sc.dev&&!sc.over){const me=mainUnit(sc);
  if(me&&me.hp<=0&&!me.gone&&alive(sc,'A').length){me.gone=1;me.hp=0;me.phase='down';clog(sc,'Ngươi gục xuống, đồng đội đánh tiếp.','en');}
  if(!alive(sc,'A').length){sc.over='lose';finishCombat(sc);return;}if(!alive(sc,'B').length){sc.over='win';finishCombat(sc);return;}return;}
  return _ce.apply(this,arguments);};}
{const _cc=combatContinue;combatContinue=function(){const r=G.run,sc=r&&r.scene;if(sc&&sc.type==='combat'&&sc.dev&&sc.over){const s=sc.dev,res=sc.over;
  Object.assign(r,{hp:s.hp,mp:s.mp,realm:s.realm,pham:s.pham,tv:s.tv,sg:s.sg,lkG:s.lkG});r.party=s.party;r.scene=null;
  note(res==='win'?'Trận thử: phe ta thắng.':'Trận thử: phe ta thua.',res==='win'?'up':'dn');dbg('dev.tranXong',{res});return;}
  return _cc.apply(this,arguments);};}
