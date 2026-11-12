// ================= DANH MỤC TỪ EXCEL (BẢN THỬ NGHIỆM) =================
// Nối dữ liệu trong docs/vat-pham.xlsx (đã chuyển thành CATALOG_DATA ở src/data/catalog.js) vào game.
// Chỉ ráp vào bản thử phu-sinh-thu.html (node tools/build-thu.js). Không sửa luật gốc: mọi thứ đều là
// lớp bọc quanh hàm sẵn có, bỏ tệp này ra thì game trở lại như cũ.
const CAT=(function(){
  const D=CATALOG_DATA;const by={};
  for(const k of ['relics','skills','arts','pills','mounts','mats','beasts','origins','traits','qitems'])for(const x of D[k])by[x.id]=x;
  return Object.assign({byId:by},D);
})();

// game gốc chỉ đặt tên 5 bậc phẩm đầu; Excel dùng đủ 7 bậc
for(let i=0;i<PHAM.length;i++)GRADE[i]=PHAM[i];
// ---------- chữ: thay {who} {sect} {pl} trong lời tựa ----------
function catText(s){if(!s)return '';return s.replace(/\{who\}/g,()=>genName(chance(.5)?'nam':'nu')).replace(/\{sect\}/g,()=>pick(G.meta.world.sects).n).replace(/\{pl\}/g,()=>placeName(pick(['nui','thanh','tran','song','phe'])));}

// ---------- 1. đồ độc nhất cũ: cập nhật theo Excel ----------
for(const [id,o] of Object.entries(CAT.uniqOver)){const U0=RELIC_UNIQUE[id];if(U0)Object.assign(U0,{name:o.name,el:o.el,fx:o.fx,lore:o.lore});}

// ---------- 2. tên ghép cho đồ rơi ngẫu nhiên ----------
for(const [el,L] of Object.entries(CAT.pre)){RELIC_PRE[el]=Array.from(new Set((RELIC_PRE[el]||[]).concat(L)));}
for(const [k,L] of Object.entries(CAT.base)){const K=RELIC_K.find(x=>x.k===k);if(K)K.b=Array.from(new Set(K.b.concat(L)));}

// ---------- 3. trang bị viết sẵn: rơi theo phẩm, đồ độc nhất mỗi kiếp gặp một lần ----------
function catRelic(x){return {name:x.n,k:x.k,tier:x.t,el:x.el,fx:Object.assign({},x.fx),fix:1,lore:catText(x.lore),cid:x.id,u:x.u?x.id:undefined};}
function catOwned(id){const r=G.run;if((r.uSeen||[]).includes(id))return true;const E=r.eq||{};return r.relics.some(x=>x.cid===id)||Object.values(E).some(x=>x&&x.cid===id)||(r.dd||[]).some(d=>d.rel.cid===id);}
function catRelicPick(tier){const r=G.run;let t=tier+(chance(.25)?1:0);if(tier>=4&&chance(.15))t=5;
  let pool=CAT.relics.filter(x=>!x.u&&x.t===t&&x.reg<=r.region+1);if(!pool.length)pool=CAT.relics.filter(x=>!x.u&&x.t===tier);
  return pool.length?catRelic(pick(pool)):null;}
function catUniquePick(tier){const r=G.run;const pool=CAT.relics.filter(x=>x.u&&x.t<=tier+1&&x.reg<=r.region&&!catOwned(x.id));
  if(!pool.length)return null;const x=pick(pool);(r.uSeen=r.uSeen||[]).push(x.id);return catRelic(x);}
{const _g=genRelic;genRelic=function(tier){if(chance(.035)){const u=catUniquePick(tier);if(u)return u;}if(chance(.55)){const x=catRelicPick(tier);if(x)return x;}return _g(tier);};}
// đồ viết sẵn mang đúng con số ghi trong Excel, không nhân theo phẩm nữa
{const _rf=relicFx;relicFx=function(rel){if(!rel||!rel.fix)return _rf(rel);return Object.assign({},rel.fx);};}

// ---------- 4. chiêu thức ----------
function catSkill(s){const fx=Object.assign({},s.fx);if(s.ch){fx.charge=true;if(fx.p)fx.p=Math.round(fx.p*1.35*100)/100;}if(s.aoe)fx.aoe=true;
  return {id:s.id,n:s.n,el:s.el,t:s.t,c:s.c,fx,f:s.f,dao:s.dao,dt:s.vl?'vl':'phep'};}
for(const s of CAT.skills){if(SK[s.id])continue;SK_RAW.push([s.id,s.n,s.el,s.t,s.c,s.fx,s.f]);SK[s.id]=catSkill(s);}
for(const [id,s] of Object.entries(CAT.skOver)){if(!SK[id])continue;const raw=SK_RAW.find(x=>x[0]===id);if(raw){raw[1]=s.n;raw[2]=s.el;raw[3]=s.t;raw[4]=s.c;raw[5]=s.fx;raw[6]=s.f;}SK[id]=catSkill(s);}

// ---------- 5. công pháp, tâm pháp viết sẵn ----------
const CAT_INT=['rageTurn','firstEvade','weakStart','vulnStart','pillSlot','ngo','tam','van'];
function catLineDesc(k){const p=Object.values(PAS).find(x=>x.fx===k);if(p)return {n:p.n,d:p.d};if(FX_N[k])return {d:FX_N[k]};
  const t=FXT[k];return {d:t?t.replace(/^[^A-Za-zÀ-ỹ]+/,''):k+' +{v}'};}
function catArt(a){const r=G.run;r.aid=(r.aid||0)+1;
  const lines=a.lines.map(x=>{if(x.sk)return SK[x.sk]?{sk:x.sk,req:x.req}:null;if(x.mind)return {mind:1,req:x.req};
    if(x.stage)return {fx:x.fx,v:x.v,stage:1,req:x.req};return Object.assign({fx:x.fx,v:x.v,req:x.req},catLineDesc(x.fx),CAT_INT.includes(x.fx)?{int:1}:{});}).filter(Boolean);
  return {u:r.aid,type:a.type,n:a.n,el:a.el,tier:a.t,req:a.req,lv:1,lines,v:2,cid:a.id,lore:catText(a.d)};}
{const _ga=genArt;genArt=function(type,tier,sid,o){if(o||!G.run||!chance(.5))return _ga(type,tier,sid,o);
  tier=clamp(Math.round(tier),0,6);let pool=CAT.arts.filter(a=>a.type===type&&a.t===tier);
  if(type==='cp'&&sid)pool=pool.filter(a=>a.lines.some(x=>x.sk===sid));
  if(!pool.length)return _ga(type,tier,sid,o);return catArt(pick(pool));};}
{const _bo=bookOf;bookOf=function(a){const b=_bo(a);if(a.lore)b.lore=a.lore+'\n\n'+b.lore;return b;};}

// ---------- 6. đan dược, phù lục, đan đột phá ----------
for(const p of CAT.pills){if(PILL[p.id])continue;const o={n:p.n,i:p.i,x:p.x,d:p.d,w:p.w,p:p.p,eff:p.eff,reg:p.reg,lore:p.lore,cat:1};
  if(p.el)o.el=p.el;if(p.bt)o.bt=p.bt;if(p.realm!=null)o.realm=p.realm;if(p.dao)o.dao=p.dao;else if(p.eff&&PILL[p.eff]&&PILL[p.eff].dao)o.dao=PILL[p.eff].dao;PILL[p.id]=o;}
for(const [id,o] of Object.entries(CAT.pillOver)){if(PILL[id])Object.assign(PILL[id],o);}
// đan mới mượn cách tác dụng của đan gốc cùng loại
{const _up=usePill;usePill=function(idx,inCombat){const r=G.run,it=r&&r.pills[idx];const p=it&&PILL[it.id];if(!p||!p.eff)return _up(idx,inCombat);
  if(p.eff==='loiphu'&&p.el&&p.el!=='loi')return catStrike(idx,inCombat,p);
  const base=p.eff,save=PILL[base],own=it.id;PILL[base]=Object.assign({},save,p,{eff:undefined});it.id=base;
  try{return _up(idx,inCombat);}finally{PILL[base]=save;it.id=own;}};}
// phù đánh theo hệ (đan gốc chỉ có hệ Lôi)
function catStrike(idx,inCombat,p){const r=G.run,sc=r.scene;if(!inCombat||!sc||sc.type!=='combat')return null;const it=r.pills[idx];const x=pillX(it.id,it.q);const s=S();
  r.pills.splice(idx,1);let msg=p.n;const t=alive(sc,'B').filter(u=>!u.immune).sort((a,b)=>a.hp-b.hp)[0];
  if(t){let d=Math.max(s.atk*x/100*0.25,s.atk*x/100-t.def*0.7);if(t.st.vuln)d*=1.3;if(KHAC[p.el]===t.el)d*=1.5;d=absorb(t.st,Math.round(d));t.hp-=d;msg+=': '+d;if(t.hp<=0){down(sc,t);checkEnd(sc);}}
  return msg;}
{const _pt=pillTip;pillTip=function(id,q){const t=_pt(id,q);const p=PILL[id];return p&&p.lore?t+'\n\n'+p.lore:t;};}
{const _rp=rollPill;rollPill=function(){const r=G.run;if(chance(.35)){const pool=CAT.pills.filter(p=>p.w!=='bt'&&p.reg<=r.region&&PILL[p.id]);if(pool.length)return pick(pool).id;}return _rp();};}
{const _bp=btPill;btPill=function(){const r=G.run;if(r&&chance(.3)){const pool=CAT.pills.filter(p=>p.w==='bt'&&PILL[p.id]&&(p.realm==null?p.reg<=r.region:p.realm===r.realm));if(pool.length)return pick(pool).id;}return _bp();};}

// ---------- 7. phương tiện: trạm dịch chỉ bày loại hợp cảnh giới ----------
const CAT_MOUNT=MOUNT.slice();
for(const m of CAT.mounts){const o={id:m.id,n:m.n,m:m.m,p:m.p,d:m.d||('Đi nhanh gấp '+m.m+' lần'),realm:m.realm};const i=CAT_MOUNT.findIndex(x=>x.id===m.id);if(i>=0)CAT_MOUNT[i]=Object.assign(CAT_MOUNT[i],o);else CAT_MOUNT.push(o);}
function catMountSync(){const r=G.run;const re=r?r.realm:0;const L=CAT_MOUNT.filter(m=>(r&&r.mount===m.id)||((m.realm||0)>=re-1&&(m.realm||0)<=re+1)).sort((a,b)=>(a.realm||0)-(b.realm||0)||a.m-b.m);MOUNT.length=0;MOUNT.push(...L);}
{const _mo=mountOf;mountOf=function(){const r=G.run;if(r&&r.mount&&!MOUNT.some(x=>x.id===r.mount))catMountSync();return _mo();};}

// ---------- 8. loài yêu thú mới (gặp ngoài đồng, có thể nở trứng thành linh thú) ----------
for(const b of CAT.beasts){if(EN[b.id])continue;EN[b.id]={f:'thu',i:b.i,nb:b.nb,hp:b.hp,atk:b.atk,def:b.def,pat:b.pat,el:b.el,pl:b.pl};for(const g of b.regs)if(REG_EN[g]&&!REG_EN[g].includes(b.id))REG_EN[g].push(b.id);}

// ---------- 9. xuất thân, thiên phú ----------
for(const [id,o] of Object.entries(CAT.originOver)){const x=ORIGIN.find(z=>z.id===id);if(x){const sk=x.skill;Object.assign(x,o);if(sk)x.skill=sk;}}
for(const o of CAT.origins)if(!ORIGIN.some(z=>z.id===o.id))ORIGIN.push(o);
for(const [id,o] of Object.entries(CAT.traitOver)){const x=TRAIT.find(z=>z.id===id);if(x)Object.assign(x,o);}
for(const o of CAT.traits)if(!TRAIT.some(z=>z.id===o.id))TRAIT.push(o);

// ---------- 10. nguyên liệu có tên: tổng số mỗi nhóm vẫn là của game, tên chỉ chia phần ----------
function catMatSync(){const r=G.run;if(!r||!r.mats)return;const N=r.matN||(r.matN={});
  for(const cat of ['thao','khoang','dan']){const L=CAT.mats.filter(m=>m.cat===cat);if(!L.length)continue;
    let sum=0;for(const m of L)sum+=N[m.id]||0;let tot=r.mats[cat]||0;
    if(sum>tot){const own=L.filter(m=>N[m.id]>0).sort((a,b)=>a.t-b.t);for(const m of own){if(sum<=tot)break;const c=Math.min(N[m.id],sum-tot);N[m.id]-=c;sum-=c;if(!N[m.id])delete N[m.id];}}
    if(sum<tot){let pool=L.filter(m=>m.reg<=r.region);if(!pool.length)pool=L;const m=wpick(pool,x=>1/(1+x.t));N[m.id]=(N[m.id]||0)+(tot-sum);}}}
const CAT_MATC={thao:'duoc',khoang:'khoang',dan:'vl'};
{const _bi=bagItems;bagItems=function(){catMatSync();const r=G.run;const L=_bi().filter(x=>!(x.ref&&x.ref.t==='mat'));const N=r.matN||{};
  for(const [id,c] of Object.entries(N)){const m=CAT.byId[id];if(!m||c<=0)continue;
    L.push({key:'n'+id,cat:CAT_MATC[m.cat],n:m.n,tier:m.t,cnt:c,em:m.i||MAT[m.cat].i,ref:{t:'mat',k:m.cat,id},tip:[m.d,m.where&&'Nơi kiếm: '+m.where,m.use&&'Dùng để luyện: '+m.use,'Tính là '+MAT[m.cat].n.toLowerCase()+' khi luyện chế.'].filter(Boolean).join('\n')});}
  for(const q of (r.qitems||[])){const x=CAT.byId[q];if(x)L.push({key:'v'+q,cat:'nv',n:x.n,tier:2,cnt:1,em:x.i,ref:{t:'qi',id:q},tip:[x.d,x.use].filter(Boolean).join('\n')});}
  return L;};}
{const _bd=bagDrop;bagDrop=function(key,n){const r=G.run;
  if(key[0]==='n'){const id=key.slice(1),m=CAT.byId[id];if(!m||(r.locks&&r.locks[key]))return 0;const c=Math.min(n,(r.matN||{})[id]||0);if(!c)return 0;r.matN[id]-=c;r.mats[m.cat]-=c;log('Vứt '+c+' '+m.n+'.');saveSoon();return c;}
  if(key[0]==='v'){const id=key.slice(1);const i=(r.qitems||[]).indexOf(id);if(i<0)return 0;r.qitems.splice(i,1);log('Vứt '+CAT.byId[id].n+'.');saveSoon();return 1;}
  return _bd(key,n);};}
{const _bs=bagStacks;bagStacks=function(){const r=G.run;const named=Object.values(r.matN||{}).filter(c=>c>0).length;const cats=Object.keys(r.mats||{}).filter(k=>r.mats[k]>0).length;return _bs()-cats+Math.max(cats,named)+(r.qitems||[]).length;};}

// ---------- 11. vật nhiệm vụ: sự kiện trao bằng e.item, lấy lại bằng e.rmItem, kiểm tra bằng hasItem() ----------
function hasItem(id){const r=G.run;return !!(r&&(r.qitems||[]).includes(id));}
{const _ae=applyE;applyE=function(e,v){const ch=_ae(e,v);const r=G.run;if(!e||!r)return ch;
  for(const id of [].concat(e.item||[])){const x=CAT.byId[id];if(!x)continue;(r.qitems=r.qitems||[]).push(id);ch.push(chip(x.i,x.n,x.d,'item'));}
  for(const id of [].concat(e.rmItem||[])){const i=(r.qitems||[]).indexOf(id);if(i>=0){r.qitems.splice(i,1);ch.push(chip(CAT.byId[id].i,'mất '+CAT.byId[id].n,'Đã trao đi','dn'));}}
  return ch;};}

// đồng bộ phương tiện theo cảnh giới mỗi lần game tự kiểm tra
{const _ac=autoCheck;autoCheck=function(){catMountSync();_ac();};}
catMountSync();
