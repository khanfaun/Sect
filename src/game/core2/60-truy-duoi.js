// ================= SỬA-K: TRUY ĐUỔI =================
// Bảng TRUY: content/rules/truy.js · chữ: content/text/truy.json (truy.*).
// r.truy = {k, n, i, ek, el, d, t0, until, nx, giam}: loại địch, tên, biểu tượng, mã kẻ địch (EN), tinh anh, chênh cảnh giới (địch − ngươi),
//   lúc bắt đầu, hạn truy, lần dò tới. Mỗi lúc chỉ một kẻ bám theo (kẻ mới đuổi dai hơn thì thay).
// Chặn khi đang đi: travelTick được chia nhỏ tới đúng lúc dò; bị chặn thì dừng ở tâm ô gần nhất giữa chặng (snapStop, r.halt) rồi
//   mở hộp kỳ ngộ 'truy_chan' (sp:1). Xong việc bấm "Đi tiếp" như khi tự dừng.
FEAT.truy=1;
let TRUY_TRAV=0;
function truyOn(){const r=G.run;return !!(r&&r.truy&&feat('truy'));}
function truyR(a){return a[0]+R()*(a[1]-a[0]);}
function truyL(T){return TRUY.loai[T&&T.k]||TRUY.loai.tu;}
// địch thuộc loại nào (null: không đuổi)
function truyKind(sc){if(!sc||sc.kiep||sc.spar||sc.tmVision||sc.boss||sc.truyCh)return null;if(sc.truyK)return sc.truyK;
  const af=sc.after||{};if(af.kind==='bt'||af.kind==='cross')return null;if(af.nemesis||af.kind==='ent')return 'ke';
  const k=sc.en&&sc.en.k,E=k&&EN[k];if(!E)return null;if(E.f==='thu')return 'thu';if(E.f==='quy')return 'quy';if(E.f!=='nhan')return null;return k==='sontac'?'tac':'tu';}
function truyStart(k,o){const r=G.run;if(!r||!feat('truy')||!TRUY.loai[k])return null;o=o||{};const L=TRUY.loai[k],M=TRUY.manh,t=W().t;
  const d=o.d||0;if(d<=-2)return null;const up=clamp(d,0,M.max);
  const until=t+truyR(L.ngay)*HD*(1+M.ngay*up);const old=r.truy;if(old&&old.until>until)return old;
  r.truy={k,n:o.n||'',i:o.i||'',ek:o.ek||null,el:o.el?1:0,d,t0:t,until,nx:t+truyR(L.gian)};
  note(contentText('truy.bat',[r.truy.n]),'dn');log(contentText('truy.bat',[r.truy.n]));dbg('truy.bat',{k,d,ngay:Math.round((until-t)/HD),n:r.truy.n});return r.truy;}
function truyEnd(why,quiet){const r=G.run;const T=r&&r.truy;if(!T)return;r.truy=null;dbg('truy.het',{why,k:T.k});
  if(quiet)return;const m=why==='het'?contentText('truy.het',[T.n]):contentText('truy.thang');note(m,'up');log(m);}
// xác suất bị chặn mỗi lần dò
// thần thức hơn địch: đang phóng thần thức, hoặc địch kém ngươi về cảnh giới (thần thức theo cảnh giới)
function truyThan(T){return (typeof tkActive==='function'&&tkActive())||(T.d||0)<0;}
function truyBiet(T){return truyThan(T);}
function truyP(T){const C=TRUY.che,M=TRUY.manh;let p=truyL(T).chan+M.chan*clamp(T.d||0,0,M.max);
  if(typeof hideOn==='function'&&hideOn()&&T.k!=='thu')p*=C.hide;if(truyThan(T))p*=C.than;return clamp(p,0,0.95);}
// còn bao lâu: chỉ bằng chữ
function truyCon(){const T=G.run&&G.run.truy;if(!T)return '';const f=(T.until-W().t)/Math.max(1,T.until-T.t0);return contentText(f>0.6?'truy.con.xa':f>0.25?'truy.con.vua':'truy.con.gan');}
function truyTip(){const T=G.run&&G.run.truy;if(!T)return '';return contentText('truy.huD')+'\n'+contentText('truy.hudT',[T.n,truyCon()]);}
// dò: hết hạn thì thôi; tới lúc thì tung xác suất chặn
function truyCheck(){const r=G.run;const T=r&&r.truy;if(!T||!feat('truy'))return false;const t=W().t;
  if(t>=T.until){truyEnd('het');return false;}
  if(T.k==='no'&&(r.bac||0)>=0&&!r.noTra&&!r.vay){truyEnd('tra',1);return false;}
  if(t<T.nx)return false;
  if(r.scene||G.screen!=='map'||r._inBq||(typeof NO_BUSY!=='undefined'&&NO_BUSY)){T.nx=t+truyR(truyL(T).gian)/2;return false;}
  T.nx=t+truyR(truyL(T).gian);const p=truyP(T);const hit=chance(p);dbg('truy.do',{p:Math.round(p*100),hit,moving:!!r.moving});
  if(hit)truyChan();return hit;}
// bị chặn: dừng lại (giữa chặng thì ở tâm ô gần nhất), mở hộp lựa chọn
function truyChan(){const r=G.run,T=r.truy;if(!T)return;let giua=0;
  if(r.moving){const m=r.moving;if(m.seg<m.path.length-1){giua=1;snapStop();}r.halt=true;}
  const biet=truyBiet(T);T.biet=biet?1:0;
  const ev=truyKyEv(T,giua,biet);dbg('truy.chan',{k:T.k,giua,biet,at:r.at,prog:r.moving?Math.round(r.moving.prog*100)/100:null});kyStart(ev);}
function truyKyEv(T,giua,biet){let ev=KYNGO.find(x=>x.id==='truy_chan');if(!ev){ev={id:'truy_chan',sp:1,n:'',t:'',c:[]};KYNGO.push(ev);}
  ev.n=contentText('truy.kyN');ev.t=contentText('truy.kyT',[(T.i?T.i+' ':'')+T.n,(biet?contentText('truy.kyBiet')+' ':'')+(giua?contentText('truy.kyGiua'):contentText('truy.hoi'))]);
  const opt=truyL(T).opt.slice();if(biet)opt.unshift('lan');
  ev.c=opt.map(o=>({l:contentText('truy.'+o),need:o==='nop'?()=>truyNopGia()?'':contentText('truy.nopThieu'):null,go:()=>truyPick(o)}));return ev;}
function truyNopGia(){const r=G.run,N=TRUY.nop;if((r.st||0)>=N.stMin)return {st:Math.max(N.stMin,Math.floor(r.st*N.st))};if((r.bac||0)>0){const b=Math.max(1,Math.floor(r.bac*N.bac));return {bac:b};}return null;}
function truyFight(){const r=G.run,T=r.truy;let en=null;try{en=T.ek&&EN[T.ek]?mkEnemy({k:T.ek,elite:T.el}):mkEnemy({elite:T.el});}catch(e){en=mkEnemy({});}
  if(T.n)en.n=T.n;if(T.i)en.i=T.i;startCombat({pre:en,elite:!!T.el},{kind:'node'});const sc=G.run.scene;if(sc&&sc.type==='combat'){sc.truyCh=1;sc.back=null;}dbg('truy.danh',{k:T.k});}
function truyPick(o){const r=G.run,T=r.truy;if(!T)return {t:''};const t=W().t;dbg('truy.chon',{o,k:T.k});
  if(o==='danh'){truyFight();return {t:''};}
  if(o==='chay'){const C=TRUY.chay;const p=Math.min(C.max,C.goc+C.tp*(S().tp||0));if(chance(p)){T.nx=t+truyR(C.lui);return {t:contentText('truy.chayOk')};}truyFight();return {t:contentText('truy.chayHong')};}
  if(o==='nop'){const g=truyNopGia();if(!g){truyFight();return {t:''};}let s;if(g.st){r.st-=g.st;s=g.st+' linh thạch';}else{r.bac-=g.bac;s=fmtBac(g.bac);}truyEnd('nop',1);return {t:contentText('truy.nopOk',[s])};}
  if(o==='tl'){const C=TRUY.tl;const p=Math.min(C.max,C.goc+C.tam*(S().tam||0));if(chance(p)){truyEnd('tl',1);return {t:contentText('truy.tlOk')};}truyFight();return {t:contentText('truy.tlHong')};}
  if(o==='lan'){if(chance(TRUY.che.lan)){truyEnd('lan',1);return {t:contentText('truy.lanOk')};}truyFight();return {t:contentText('truy.lanHong')};}
  return {t:''};}
// thời gian trôi: dò (trừ lúc đang đi — travelTick tự dò sau mỗi đoạn)
{const _at=advanceTime;advanceTime=function(h){const o=_at.apply(this,arguments);const r=G.run;if(r&&r.truy&&!TRUY_TRAV){if(h>48){if(W().t>=r.truy.until)truyEnd('het');}else truyCheck();}return o;};}
// đi đường: chia nhỏ tới đúng lúc dò để có thể bị chặn giữa chặng
{const _tt=travelTick;travelTick=function(h){const r=G.run;if(!truyOn())return _tt(h);let ch=false;
  while(G.run&&r.moving&&!r.scene&&h>1e-9&&r.truy){const c=Math.min(h,Math.max(1e-3,r.truy.nx-W().t+1e-6));
    TRUY_TRAV=1;try{if(_tt(c))ch=true;}finally{TRUY_TRAV=0;}h-=c;if(!G.run)return true;if(!r.scene&&r.truy){if(truyCheck())ch=true;}}
  if(G.run&&r.moving&&!r.scene&&h>1e-9&&!r.truy)if(_tt(h))ch=true;return ch;};}
// chạy thoát khỏi trận → có thể bị đuổi; trận do truy đuổi: thắng/thua thì dứt, chạy nữa thì lùi lần dò
{const _cc=combatContinue;combatContinue=function(){const r=G.run,sc=r&&r.scene;
  if(sc&&sc.type==='combat'&&sc.over&&feat('truy')){const res=sc.over;
    if(sc.truyCh){if(res==='win')truyEnd('thang');else if(res==='lose')truyEnd('thua',1);else if(res==='flee'&&r.truy)r.truy.nx=W().t+truyR(TRUY.chay.lui);}
    else if(res==='flee'){const k=truyKind(sc);if(k&&chance(TRUY.loai[k].p)){const B=sc.units.filter(u=>u.side==='B');const eR=B.reduce((a,u)=>Math.max(a,u.realm||0),0);
      const u0=B[0]||{};truyStart(k,{n:u0.name||sc.en.n,i:sc.en.i,ek:sc.en.k,el:sc.elite,d:Math.round(eR-(r.realm||0))});}
      else dbg('truy.khong',{k});}}
  return _cc.apply(this,arguments);};}
// tới nơi an toàn: thành có thủ vệ, tông môn mình
{const _ar=arrive;arrive=function(id){const o=_ar.apply(this,arguments);const r=G.run;const T=r&&r.truy;if(!T||!feat('truy'))return o;const n=nodeById(id);if(!n||n.state==='ruin')return o;
  let a=0;if(n.type==='tong'&&typeof contentOwnSect==='function'&&contentOwnSect(n))a=TRUY.an.tong;else if(n.type==='thanh')a=TRUY.an.thanh[T.k]||0;
  if(a==='huy'){r.truy=null;const m=contentText('truy.anHuy',[n.name,T.n]);note(m,'up');log(m);dbg('truy.an',{a,k:T.k,n:n.type});}
  else if(a==='giam'&&!T.giam){T.giam=1;const t=W().t;T.until=t+(T.until-t)*TRUY.an.giam;note(contentText('truy.anGiam',[n.name,T.n]));dbg('truy.an',{a,k:T.k,n:n.type});}
  return o;};}
// quan phủ truy nã vì nợ (Sửa-B): sai dịch lần theo
{const _tn=noTruyNa;noTruyNa=function(r){const o=_tn.apply(this,arguments);if(typeof tnaOn==='function'&&tnaOn())tnaNo(r);else if(feat('truy'))truyStart('no',{n:contentText('truy.noTen'),i:'👮',ek:'sontac',d:0});return o;};} // Sửa-O: gộp vào hệ truy nã
