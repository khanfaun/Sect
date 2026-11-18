// ---------------- QUAN ẢI ----------------
function openPass(n){
  const r=G.run;const k=r.region+1;if(k>4)return;
  r.scene={type:'pass',id:n.id,back:n.id,k,text:T([contentText("core_10-quan-ai_js.openPass.001"),contentText("core_10-quan-ai_js.openPass.002")],{reg:REG[k].n}),res:null};
}
function passOpts(){
  const r=G.run,sc=r.scene,k=sc.k;const o=[];
  const gp=price(45);const an=r.seeds.findIndex(s=>s.t==='an');
  o.push({a:'realm',i:'☯️',l:contentText("core_10-quan-ai_js.passOpts.003"),ok:r.realm>=k,tip:contentText("core_10-quan-ai_js.passOpts.004")+REALM[k]+contentText("core_10-quan-ai_js.passOpts.005")});
  o.push({a:'pass',i:'🎫',l:contentText("core_10-quan-ai_js.passOpts.006"),ok:r.passes.includes(k),tip:contentText("core_10-quan-ai_js.passOpts.007")});
  o.push({a:'guide',i:'🧭',l:contentText("core_10-quan-ai_js.passOpts.008"),ok:r.st>=gp,tip:contentText("core_10-quan-ai_js.passOpts.009")+gp,x:'💎'+gp});
  if(an>=0)o.push({a:'favor',i:'🤝',l:'Nhờ '+r.seeds[an].ten+contentText("core_10-quan-ai_js.passOpts.010"),ok:true,tip:contentText("core_10-quan-ai_js.passOpts.011")});
  o.push({a:'fight',i:'⚔️',l:contentText("core_10-quan-ai_js.passOpts.012"),ok:true,tip:contentText("core_10-quan-ai_js.passOpts.013")});
  return o;
}
function passAct(a){
  const r=G.run,sc=r.scene;if(!sc||sc.type!=='pass')return;const o=passOpts().find(x=>x.a===a);if(!o||!o.ok)return;
  if(a==='guide'){r.st-=price(45);}
  if(a==='favor'){const i=r.seeds.findIndex(s=>s.t==='an');r.seeds.splice(i,1);}
  if(a==='fight'){startCombat({k:'human',m:1.6,n:contentText("core_10-quan-ai_js.passAct.014"),sub:contentText("core_10-quan-ai_js.passAct.015"),elite:1},{kind:'cross',k:sc.k});return;}
  doCross(sc.k,a);
}
function doCross(k,how){
  const r=G.run;const mo=CROSS_M[k];
  advanceTime(mo*HM);if(!G.run)return;
  r.region=k;const R0=regionOf(k);r.moving=null;arrive(R0.entry);r.maxRegion=Math.max(r.maxRegion||0,k);
  log(contentText("core_10-quan-ai_js.doCross.016", [REG[k].n]));bio(contentText("core_10-quan-ai_js.doCross.017", [Math.floor(r.age),REG[k].n]));
  r.scene={type:'region',text:T(REG[k].intro,baseV()),sub:contentText("core_10-quan-ai_js.doCross.018", [mo])};
}

function forceTamma(){
  const r=G.run;const v=baseV();
  r.scene={type:'event',id:'tam_ma_xam',v,story:[contentText("core_10-quan-ai_js.forceTamma.019")],cur:['force'],phase:'choose',chips:[],back:r.lastBack!=null?r.lastBack:null};
}
// Bảng ENC_T: content/narration/enc-t.js
function sceneBack(){const r=G.run,sc=r.scene;if(!sc)return null;if(sc.type==='place')return sc.id;return sc.back!=null?sc.back:null;}
function encounter(o){
  const r=G.run;const back=sceneBack();const en=o.en||mkEnemy({elite:o.type==='elite'});
  const v=baseV();v.e=en.n;
  let text=T(encLawful(en)?ENC_T.nhanChinh:(ENC_T[en.f]||ENC_T.vat),v);
  if(o.type==='elite')text+=' '+T([contentText("core_10-quan-ai_js.encounter.020"),contentText("core_10-quan-ai_js.encounter.021"),contentText("core_10-quan-ai_js.encounter.022")]);
  r.scene={type:'enc',en,elite:o.type==='elite',text,v,back};
}
function encAct(a){
  const r=G.run,sc=r.scene;
  if(a==='fight'){startCombat({pre:sc.en,elite:sc.elite},{kind:'node',quest:sc.quest});return;}
  if(a==='sneak'){const ok=R()<encSneak(sc);if(ok){sc.res=T([contentText("core_10-quan-ai_js.encAct.023"),contentText("core_10-quan-ai_js.encAct.024"),contentText("core_10-quan-ai_js.encAct.025")]);sc.done=1;}else{sc.failSneak=1;encAct('fight');clog(G.run.scene,contentText("core_10-quan-ai_js.encAct.026"),'en');}return;}
  if(a==='pay'){if(encLawful(sc.en))return false;const c=Math.max(1,Math.round(12*SC[rT()]));if(r.st<c)return;r.st-=c;sc.res=T([contentText("core_10-quan-ai_js.encAct.027"),contentText("core_10-quan-ai_js.encAct.028")],{e:sc.en.n});sc.paid=c;sc.done=1;return;}
}
// kẻ chặn đường có phải phường cướp bóc không: đệ tử tông chính đạo, Phật môn, võ tăng, kiếm khách, đạo sĩ thì không
function encLawful(en){if(!en||en.f!=='nhan')return false;if(['votang','kiemtu','phusu'].includes(en.k))return true;
  if(en.k==='detu'){const ss=(G.meta&&G.meta.world&&G.meta.world.sects)||[];const s0=ss.find(x=>en.sub&&en.sub.includes(x.n)||en.n&&en.n.includes(x.n));return !s0||s0.al!=='ma';}return false;}
function encSneak(sc){const s=S();return clamp(0.35+(s.tp-8-rT()*3)*0.05,0.1,0.85)*(sc.elite?0.5:1);}
function bossIntro(){
  const r=G.run;const back=sceneBack();const pool=BOSS[rT()];const b=pick(pool);r.bossDef=b;r.bossV={nick:pick(NAME.ma1),sect:pick(G.meta.world.sects.filter(s=>s.al==='chinh')).n,ten:genName('nam')};
  const v=Object.assign(baseV(),r.bossV);
  r.scene={type:'boss',text:T(b.t,v),b:{i:b.i,n:T(b.n,v)},back};
}
function bossFight(){startCombat('boss',{kind:'boss'});}

// ---------------- PHƯỜNG THỊ ----------------
function price(base){const fx=aggFx();return Math.max(1,Math.round(base*SC[rT()]*(1-Math.min(40,fx.shopP||0)/100)));}
function openShop(n){
  const r=G.run;const back=sceneBack();const a=npc('thuong');const v=Object.assign(baseV(),{a});
  const text=!n?T([contentText("core_10-quan-ai_js.openShop.029"),contentText("core_10-quan-ai_js.openShop.030")],v):T([contentText("core_10-quan-ai_js.openShop.031"),contentText("core_10-quan-ai_js.openShop.032"),contentText("core_10-quan-ai_js.openShop.033"),contentText("core_10-quan-ai_js.openShop.034"),contentText("core_10-quan-ai_js.openShop.035")],v);
  const m=Math.floor(W().t/HM);
  if(n&&n.shop&&n.shop.m===m&&n.shop.kiep===r.kiep){r.scene={type:'shop',text,items:n.shop.items,heal:n.shop.heal,back,node:n.id};return;}
  const items=[];
  for(let i=0;i<3;i++){const id=rollPill();const q=rT()>=2?ri(0,2):rT()>=1?ri(0,1):0;items.push({k:'pill',id,q,p:price(PILL[id].p*PQM[q])});}
  if((chance(.6)||r.realm>=rT())&&!(n&&n.type==='tran'))items.push({k:'pill',id:btPill(),q:0,p:price(PILL[btPill()].p)}); // tạp hóa thôn quê không có đan đột phá
  for(let i=0;i<2;i++){const id=rollSkill();items.push({k:'skill',id,p:price(40+SK[id].t*28)});}
  const rel=genRelic(clamp(rT()+(chance(.2)?1:0),0,4));items.push({k:'relic',rel,p:price(70+rel.tier*45)});
  if(typeof shopExtra==='function')shopExtra(items,n);
  const heal=price(10);
  if(n)n.shop={m,kiep:r.kiep,items,heal};
  r.scene={type:'shop',text,items,heal,back,node:n?n.id:null};
}
function buy(i){
  const r=G.run,sc=r.scene;if(sc.type!=='shop')return;const it=sc.items[i];if(!it||it.sold||r.st<it.p)return;
  if(it.k==='pill'&&r.pills.length>=S().pillMax)return;
  r.st-=it.p;it.sold=1;
  if(it.k==='pill')gainPill(it.id,it.q);else if(it.k==='skill')gainSkill(it.id);else if(it.k==='pass'){if(!r.passes.includes(it.reg))r.passes.push(it.reg);log(contentText("core_10-quan-ai_js.buy.036", [it.n]));}else{r.relics.push(it.rel);clampHp();log(contentText("core_10-quan-ai_js.buy.037", [it.rel.name]));}
  if(r.pendingSkill){r.scene={type:'swap',id:r.pendingSkill,back:'shop',shop:sc};}
}
function healBuy(){const r=G.run,sc=r.scene;if(r.st<sc.heal)return;r.st-=sc.heal;const s=S();r.hp=s.maxHp;r.mp=s.maxMp;sc.healed=1;}

// ---------------- ĐỘNG PHỦ ----------------
// Bảng REST_T: content/narration/rest-t.js

// ---------------- KẾT THÚC KIẾP ----------------
function lifeSummary(cause,info){
  const r=G.run;const age=Math.floor(r.age);
  const lines=r.bio.length>6?[r.bio[0]].concat(r.bio.slice(-5)):r.bio.slice(); // giữ dòng xuất thân và những chuyện gần nhất (cảnh giới cao nhất thường ở cuối)
  let end='';
  if(cause==='combat')end=contentText("core_10-quan-ai_js.lifeSummary.038", [age,r.ten,info.n,r.place.n]);
  else if(cause==='toahoa')end=contentText("core_10-quan-ai_js.lifeSummary.039", [age,r.ten,r.place.n]);
  else if(cause==='tamma')end=contentText("core_10-quan-ai_js.lifeSummary.040", [age,r.ten]);
  else if(cause==='thanvo')end=contentText("core_10-quan-ai_js.lifeSummary.041", [age,r.ten,r.place.n]);
  else if(cause==='kiep')end=contentText("core_10-quan-ai_js.lifeSummary.042", [age,r.ten,r.place.n]);
  else if(cause==='quyan')end=contentText("core_10-quan-ai_js.lifeSummary.043", [age,r.ten,r.place.n]);
  else if(cause==='phithang')end=contentText("core_10-quan-ai_js.lifeSummary.044", [age,r.ten]);
  else if(cause==='doi')end=contentText("an.lifeEnd", [age,r.ten,r.place.n]);
  lines.push(end+(cause==='combat'||cause==='toahoa'?' '+pick([contentText("core_10-quan-ai_js.lifeSummary.045"),contentText("core_10-quan-ai_js.lifeSummary.046"),contentText("core_10-quan-ai_js.lifeSummary.047"),contentText("core_10-quan-ai_js.lifeSummary.048")]):''));
  return lines;
}
function calcPts(cause){
  const r=G.run;const o=[];
  o.push([contentText("core_10-quan-ai_js.calcPts.049"),r.maxRealm*12+Math.floor(r.tv/25)]);
  o.push([contentText("core_10-quan-ai_js.calcPts.050"),rT()*6]);
  o.push([contentText("core_10-quan-ai_js.calcPts.051"),r.bossKills*8]);
  o.push([contentText("core_10-quan-ai_js.calcPts.052"),Math.floor(r.kills/3)]);
  o.push([contentText("core_10-quan-ai_js.calcPts.053"),Math.floor(r.evDone/4)]);
  if(cause==='phithang')o.push([contentText("core_10-quan-ai_js.calcPts.054"),80]);
  if(cause==='quyan')o.push([contentText("core_10-quan-ai_js.calcPts.055"),4]);
  return o.filter(x=>x[1]>0);
}
function die(cause,info){
  const r=G.run;if(!r)return;
  const pts=calcPts(cause);const tot=pts.reduce((a,b)=>a+b[1],0)+1;
  const lines=lifeSummary(cause,info);
  const ep=T('{epitaph}');
  const life={_mr:r.maxRegion||0,k:r.kiep,ten:r.ten,g:r.g,tuoi:Math.floor(r.age),realm:qualName(r.maxRealm,(r.quality||[])[r.maxRealm]||0),cause,lines,ep,pts:tot,origin:r.origin};
  const M=G.meta;M.lives.unshift(life);if(M.lives.length>40)M.lives.pop();
  M.pts+=tot;M.total+=tot;
  M.last={grave:cause!=='phithang'?{ten:r.ten,tuoi:Math.floor(r.age),r:r.region}:null,killer:cause==='combat'&&info&&!info.boss&&info.k?{n:info.n,k:info.k,i:info.i,el:info.el,r:r.region}:(cause==='combat'&&info&&info.boss?{n:info.n,k:'boss',i:info.i,el:info.el,r:r.region}:null),ten:r.ten};
  ach('chet1');if(cause==='toahoa')ach('toahoa');if(cause==='quyan')ach('quyan');if(cause==='phithang'){ach('phithang');gainLore('chan_tuong');}
  if(M.nlife>=5)ach('kiep5');
  G.over={life,pts,cause,title:{combat:contentText("core_10-quan-ai_js.die.056"),kiep:contentText("core_10-quan-ai_js.die.057"),toahoa:contentText("core_10-quan-ai_js.die.058"),tamma:contentText("core_10-quan-ai_js.die.059"),quyan:contentText("core_10-quan-ai_js.die.060"),phithang:contentText("core_10-quan-ai_js.die.061"),doi:contentText("an.die")}[cause]};
  life.y=tYear(W().t);if(r.bossKills)life.hero='hạ '+r.bossKills+contentText("core_10-quan-ai_js.die.062");else if(r.bangTop)life.hero=contentText("core_10-quan-ai_js.die.063");
  fogToMemory();
  G.run=null;afterlife(r,cause,info);G.over.gap=G.lastGap;G.screen='over';saveSoon();
}
function fogToMemory(){for(const R0 of W().regions)for(const n of R0.nodes){if(n.fog>=2){n.fog=1;n.memory=true;}else if(n.fog===1&&!n.memory){n.fog=0;}}}
function retire(){die('quyan');}
function victory(){die('phithang');}
