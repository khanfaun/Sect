// ---------------- THỜI GIAN & THẾ GIỚI ----------------
function pushNews(t,quiet){const r=G.run;if(!r)return;if(TICK_OUT&&!quiet)TICK_OUT.push(t);r.news.push({a:Math.floor(r.age),t});if(r.news.length>40)r.news.shift();r.newsQ=(r.newsQ||[]);r.newsQ.push(t);if(r.newsQ.length>4)r.newsQ.shift();}
// tin đồn chỉ nhắc nơi có thật (ưu tiên đại khu đang đứng); nghe xong thì biết tên nơi đó trên bản đồ. Không có nơi hợp thì nói chung chung.
function rumorPl(){try{const r=G.run,w=W();const T=['nui','phe','hoang','song','thanh','tuthanh','como','ditich'];
  const all=w.regions.flatMap(R=>R.nodes).filter(n=>T.includes(n.type)&&n.state!=='ruin');const gan=r?all.filter(n=>n.r===r.region):[];
  const L=gan.length?gan:all;if(!L.length)return contentText('rumor.noiXa');const n=pick(L);if(typeof hearOf==='function')hearOf(n);return n.name;}catch(e){return contentText('rumor.noiXa');}}
function rumorV(rv,extra){
  const w=G.meta.world, wr=w.rivals[rv.i];
  return Object.assign({a:wr.ten,s:w.sects[wr.s].n,s2:pick(w.sects).n,pl:rumorPl(),cg:REALM[rv.realm],dan:PILL[pick(['trucco','ngungkim','phaanh','hoathan'])].n},extra||{});
}
function worldTick(dy){
  const r=G.run,w=G.meta.world;if(!r)return;
  for(const rv of r.rivals){
    if(!rv.alive)continue;
    const wr=w.rivals[rv.i];rv.age=(rv.age||18)+dy;
    rv.prog+=dy*wr.tal*[14,6,2.6,1.2,.5,.3][rv.realm];
    if(rv.prog>=100&&rv.realm<4){rv.realm++;rv.prog=ri(0,15);if(chance(.6))pushNews(T(pick(RUMOR.tien.filter(x=>x.includes('{$cg}'))),rumorV(rv)));}
    if(chance(Math.min(.5,dy*0.035))){
      const roll=R();
      if(roll<0.45) pushNews(T(RUMOR.tien,rumorV(rv)));
      else if(roll<0.62&&wr.tinh!=='nghia') pushNews(T(RUMOR.ma,rumorV(rv)));
      else if(roll<0.75){const o=r.rivals.filter(x=>x.alive&&x!==rv&&w.rivals[x.i].g!==wr.g);if(o.length){const b=pick(o);pushNews(T(RUMOR.tinh,rumorV(rv,{b:w.rivals[b.i].ten})));}}
      else if(roll<0.83&&rv.realm>=1&&r.rivals.filter(x=>x.alive).length>3){rv.alive=false;pushNews(T(RUMOR.tu,rumorV(rv)));}
    }
  }
  if(chance(Math.min(.6,dy*0.06))){if(chance(.12)){const k=rumorKiep();if(k){pushNews(k);return;}}const rv=pick(r.rivals);pushNews(T(RUMOR.the,rumorV(rv)));}
}
function publishBang(){
  const r=G.run,w=G.meta.world;
  const ds=r.rivals.filter(x=>x.alive).map(x=>({i:x.i,ten:w.rivals[x.i].ten,realm:x.realm,sc:x.realm*100+x.prog}));
  ds.push({i:-1,ten:r.ten,realm:r.realm,q:(r.quality||[])[r.realm]||0,sc:r.realm*100+r.tv*0.9});
  ds.sort((a,b)=>b.sc-a.sc);
  r.bang={nam:Math.floor(r.age),y:tYear(w.t),ds:ds.slice(0,6)};
  const me=r.bang.ds.findIndex(x=>x.i===-1);
  const top=r.bang.ds.slice(0,3).map((x,k)=>`${k+1}. ${x.ten} (${REALM[x.realm]})`).join(', ');
  pushNews(contentText("core_05-thoi-gian-the-gioi_js.publishBang.001", [top])+(me<0?contentText("core_05-thoi-gian-the-gioi_js.publishBang.002"):''));
  if(me>=0){log(contentText("core_05-thoi-gian-the-gioi_js.publishBang.003", [me+1]));r.bon.van+=1;if(me===0){ach('bang1');r.bangTop=1;bio(contentText("core_05-thoi-gian-the-gioi_js.publishBang.004", [Math.floor(r.age)]));}}
}

// ---------------- HIỆU ỨNG ----------------
function chip(i,t,tip,c,tier){return tier==null?{i,t,tip,c}:{i,t,tip,c,tier};}
function sgn(x){return (x>0?'+':'−')+Math.abs(Math.round(x));}
function addTv(x){
  const r=G.run;const b=tieu();const s0=S();const g0=lkOn()?lkTang():0;
  r.tv=clamp(r.tv+x,0,100);
  const a=tieu();const g1=lkOn()?lkTang():0;
  if(g1>g0&&a<=b)log(contentText("core_05-thoi-gian-the-gioi_js.addTv.005", [realmLabel()]));
  if(a>b){const s1=S();r.hp+=s1.maxHp-s0.maxHp;r.mp+=s1.maxMp-s0.maxMp;log(contentText("core_05-thoi-gian-the-gioi_js.addTv.006", [realmLabel()]));}
  clampHp();
}
function tvGain(base){return base*S().tvM;}
function applyE(e,v){
  const r=G.run, ch=[];if(!e)return ch;
  let s=S();
  const pct=(x,max)=>{if(typeof x==='string'&&x.endsWith('%'))return max*parseFloat(x)/100;return +x;};
  if(e.hp!=null){const d=Math.round(pct(e.hp,s.maxHp));const before=r.hp;r.hp=clamp(r.hp+d,1,s.maxHp);const dd=r.hp-before;if(dd)ch.push(chip('❤️',sgn(Math.round(dd/Math.max(1,s.maxHp)*100)||Math.sign(dd))+'%',contentText("core_05-thoi-gian-the-gioi_js.applyE.007"),dd>0?'up':'dn'));}
  if(e.mp!=null){const d=Math.round(pct(e.mp,s.maxMp));const before=r.mp;r.mp=clamp(r.mp+d,0,s.maxMp);const dd=r.mp-before;if(dd)ch.push(chip('💧',sgn(Math.round(dd/Math.max(1,s.maxMp)*100)||Math.sign(dd))+'%',contentText("core_05-thoi-gian-the-gioi_js.applyE.008"),dd>0?'up':'dn'));}
  if(e.tv){let x=e.tv>0?tvGain(e.tv):e.tv;if(x>0&&!e.tvMajor){const room=Math.max(0,40-(r.tvMinor||0));x=Math.min(x,room);r.tvMinor=(r.tvMinor||0)+x;}const b=r.tv;addTv(x);const d=r.tv-b;if(sgOn()){const g1=sgTang();if(Math.abs(d)>1e-6)ch.push(chip('✨',(d>0?'+':'−')+Math.max(1,Math.round(Math.abs(d)/sgW(g1)*100))+'% tu vi','Tu vi '+sgName(g1),d>0?'up':'dn'));else if(e.tv>0&&sgFull())ch.push(chip('✨',r.tv>=100?contentText("core_05-thoi-gian-the-gioi_js.applyE.009"):contentText("core_05-thoi-gian-the-gioi_js.applyE.010"),r.tv>=100?contentText("core_05-thoi-gian-the-gioi_js.applyE.011"):'Tu vi '+sgName(g1)+contentText("core_05-thoi-gian-the-gioi_js.applyE.012"),'up'));}else if(Math.abs(d)>=0.5)ch.push(chip('✨',sgn(Math.round(d)||Math.sign(d))+'% tu vi','Tu vi',d>0?'up':'dn'));else if(e.tv>0&&r.tv>=100)ch.push(chip('✨',contentText("core_05-thoi-gian-the-gioi_js.applyE.013"),contentText("core_05-thoi-gian-the-gioi_js.applyE.014"),'up'));}
  if(e.st!=null){let d;if(typeof e.st==='string')d=Math.round(r.st*parseFloat(e.st)/100);else{d=Math.round(e.st*SC[rT()]*(e.st>0?(1+(s.fx.stonesP||0)/100):1));if(!d&&e.st)d=e.st>0?1:-1;}const b=r.st;r.st=Math.max(0,r.st+d);const dd=r.st-b;if(dd)ch.push(chip('💎',sgn(dd),contentText("core_05-thoi-gian-the-gioi_js.applyE.015"),dd>0?'up':'dn'));}
  const statN={atkP:['⚔️','Công','%'],defP:['🛡️','Thủ','%'],hpP:['❤️',contentText("core_05-thoi-gian-the-gioi_js.applyE.016"),'%'],mpP:['💧',contentText("core_05-thoi-gian-the-gioi_js.applyE.017"),'%'],tp:['🌀',contentText("core_05-thoi-gian-the-gioi_js.applyE.018"),''],ngo:['🧠',contentText("core_05-thoi-gian-the-gioi_js.applyE.019"),''],van:['🍀',contentText("core_05-thoi-gian-the-gioi_js.applyE.020"),''],tam:['🪷',contentText("core_05-thoi-gian-the-gioi_js.applyE.021"),'']};
  for(const k in statN){if(e[k]){const s0=S();r.bon[k]+=e[k];const s1=S();if(k==='hpP')r.hp+=s1.maxHp-s0.maxHp;if(k==='mpP')r.mp+=s1.maxMp-s0.maxMp;ch.push(chip(statN[k][0],statN[k][1]+(e[k]>0?' ▲':' ▼'),statN[k][1]+(e[k]>0?' tăng':' giảm')+contentText("core_05-thoi-gian-the-gioi_js.applyE.022"),e[k]>0?'up':'dn'));}}
  if(e.tamma){let d=e.tamma;if(d>0)d=d*(1-Math.min(80,s.fx.tammaRes||0)/100);d=Math.round(d);const b=r.tamma;r.tamma=clamp(r.tamma+d,0,100);const dd=r.tamma-b;if(dd)ch.push(chip('😈',dd>0?contentText("core_05-thoi-gian-the-gioi_js.applyE.023"):contentText("core_05-thoi-gian-the-gioi_js.applyE.024"),contentText("core_05-thoi-gian-the-gioi_js.applyE.025")+(dd>0?contentText("core_05-thoi-gian-the-gioi_js.applyE.026"):contentText("core_05-thoi-gian-the-gioi_js.applyE.027")),dd>0?'dn':'up'));}
  if(e.karma){r.karma=clamp(r.karma+e.karma,-100,100);ch.push(chip('☯️',(e.karma>0?contentText("core_05-thoi-gian-the-gioi_js.applyE.028"):'ác ▲'),contentText("core_05-thoi-gian-the-gioi_js.applyE.029")+(e.karma>0?contentText("core_05-thoi-gian-the-gioi_js.applyE.030"):contentText("core_05-thoi-gian-the-gioi_js.applyE.031")),e.karma>0?'up':'dn'));if(r.karma>=60)ach('thien');if(r.karma<=-60)ach('ma');}
  if(e.h){ch.push(chip('⏳',durH(e.h),contentText("core_05-thoi-gian-the-gioi_js.applyE.032"),''));advanceTime(e.h);if(!G.run)return ch;}
  if(e.lifeCut){const y=Math.round(LIFE[r.realm]*e.lifeCut/100);r.lifeAdj-=y;ch.push(chip('⏳','thọ −'+y+' năm',contentText("core_05-thoi-gian-the-gioi_js.applyE.033"),'dn'));if(r.age>=S().life){die('toahoa');return ch;}}
  if(e.life){r.lifeAdj+=e.life;ch.push(chip('⏳','thọ +'+e.life+' năm',contentText("core_05-thoi-gian-the-gioi_js.applyE.034"),'up'));}
  if(e.relic!=null){const rel=typeof e.relic==='number'?genRelic(clamp(rT()+e.relic,0,4)):uniqueRelic(e.relic);if(rel&&!(rel.u&&r.relics.find(x=>x.u===rel.u))){r.relics.push(rel);clampHp();ch.push(chip('🏺',rel.name,relicTip(rel),'item',rel.tier));log(contentText("core_05-thoi-gian-the-gioi_js.applyE.035", [rel.name]));}}
  if(e.rmRelic){const k=r.relics.findIndex(x=>x.u===e.rmRelic);if(k>=0){const n=r.relics[k].name;r.relics.splice(k,1);clampHp();ch.push(chip('🏺','mất '+n,contentText("core_05-thoi-gian-the-gioi_js.applyE.036"),'dn'));}}
  if(e.skill!=null){const id=typeof e.skill==='number'?rollSkill(e.skill):e.skill;const c=gainSkill(id);if(c)ch.push(c);}
  if(e.pill!=null){const arr=Array.isArray(e.pill)?e.pill:[e.pill];if(e.pill2)arr.push(e.pill2);for(const p of arr){const c=gainPill(p===1||p===0?rollPill():(p==='@bt'?btPill():p),rT()>=3?2:rT()>=1?ri(0,1):0);if(c)ch.push(c);}}
  if(e.lore){const c=gainLore(e.lore);if(c)ch.push(c);}
  if(e.dao){const g=addDao(e.dao,'ev');if(g)ch.push(chip('☯️',contentText("core_05-thoi-gian-the-gioi_js.applyE.037"),contentText("core_05-thoi-gian-the-gioi_js.applyE.038"),'up'));}
  if(e.flag) r.flags[e.flag]=1;
  if(e.shop)r.goShop=1;
  if(e.dropPill&&r.pills.length){const i=Math.floor(R()*r.pills.length);const p=r.pills.splice(i,1)[0];ch.push(chip(PILL[p.id].i,'mất '+PILL[p.id].n,contentText("core_05-thoi-gian-the-gioi_js.applyE.039"),'dn'));}
  if(e.party&&v&&v[e.party.k]){const c=addParty(v[e.party.k],e.party.days);if(c)ch.push(c);}
  if(e.partyRv&&v&&v.rv){const c=addParty({ten:v.rv.ten,g:v.rv.hn==='nàng'?'nu':'nam',realm:v.rv.realm},e.partyRv,0.9);if(c)ch.push(c);}
  if(e.partyP&&v&&v.p){const c=addParty({ten:v.p.ten,g:'nam'},e.partyP,0.7);if(c)ch.push(c);}
  if(e.nemDone)W().nemesis=null;
  if(e.entGone&&v&&v.eid!=null){const x=W().ents.find(z=>z.id===v.eid);if(x)removeEnt(x);}
  if(e.patronDone&&v&&v.pn!=null){const n=nodeById(v.pn);if(n)n.patron=null;}
  if(e.graveItems&&v){graveTake(v).forEach(c=>ch.push(c));}
  if(e.ach) ach(e.ach);
  if(e.an){const [k,d]=Array.isArray(e.an)?e.an:[e.an,contentText("core_05-thoi-gian-the-gioi_js.applyE.040")];const n=v&&v[k];if(n&&n.ten){r.seeds.push({t:'an',ten:n.ten,hn:n.hn,d,r:r.region,at:G.meta.world.t});ch.push(chip('🤝',contentText("core_05-thoi-gian-the-gioi_js.applyE.041"),contentText("core_05-thoi-gian-the-gioi_js.applyE.042"),'up'));}}
  if(e.oan){const [k,d]=Array.isArray(e.oan)?e.oan:[e.oan,'hại']; const n=v&&v[k];if(n&&n.ten){r.seeds.push({t:'oan',ten:n.ten,hn:n.hn,d,r:r.region,at:G.meta.world.t});ch.push(chip('🗡️',contentText("core_05-thoi-gian-the-gioi_js.applyE.043"),contentText("core_05-thoi-gian-the-gioi_js.applyE.044"),'dn'));}}
  if(e.rumor){for(let i=0;i<e.rumor;i++){pushNews(contentRumor());}ch.push(chip('🍃',contentText("core_05-thoi-gian-the-gioi_js.applyE.045"),contentText("core_05-thoi-gian-the-gioi_js.applyE.046"),'')); r.showNews=e.rumor;}
  if(e.rival){const rv=r.rivals.find(x=>x.i===(v&&v.rvi));if(rv){rv.rel+=e.rival;if(typeof favPop==="function"){const rw=(G.meta.world.rivals||[])[rv.i];if(rw&&rw.ten)favPop(rw.ten,e.rival*10);}ch.push(chip('🤝',e.rival>0?contentText("core_05-thoi-gian-the-gioi_js.applyE.047"):contentText("core_05-thoi-gian-the-gioi_js.applyE.048"),contentText("core_05-thoi-gian-the-gioi_js.applyE.049"),e.rival>0?'up':'dn'));}}
  clampHp();
  return ch;
}
function dur(y){if(y<1){const m=Math.max(1,Math.round(y*12));return m+contentText("core_05-thoi-gian-the-gioi_js.dur.050");}return (Math.round(y*10)/10).toString().replace('.',',')+' năm';}
function ach(id){if(!G.meta.ach.includes(id)){G.meta.ach.push(id);const a=ACH.find(x=>x.id===id);if(G.run&&a)log(contentText("core_05-thoi-gian-the-gioi_js.ach.051", [a.n]));}}
function gainLore(id){if(!LORE[id])return null;if(G.run&&!G.run.flags['lore_'+id]){G.run.flags['lore_'+id]=1;}const fresh=!G.meta.lore.includes(id);if(fresh)G.meta.lore.push(id);return chip('📜',LORE[id].n,fresh?contentText("core_05-thoi-gian-the-gioi_js.gainLore.052"):contentText("core_05-thoi-gian-the-gioi_js.gainLore.053"),'item');}

// ---------------- VẬT PHẨM ----------------
// câu mô tả phải hợp chất liệu: gỉ sét, thợ rèn chỉ cho đồ kim loại; "đáy có con dấu" chỉ cho đồ có đáy
function relicLorePool(name){const soft=/Phất Trần|Trượng|Phiến|Quạt|Y\b|Bào|Áo|Ngọc|Châu|Đồ|Phù|Kết|Lụa|Đai|Mũ|Quan|Giày|Hài|Trâm|Sách|Quyển|Cầm|Tiêu|Sáo|Trúc|Mộc|Hồ Lô|Bình|Khăn|Dây|Thằng|Sa\b|Liên|Hoa/i.test(name);
  const vessel=/Đỉnh|Bình|Hồ Lô|Bát|Lô\b|Chung|Ấn|Hạp|Hộp/i.test(name);
  return RELIC_LORE.filter(t=>!(soft&&/gỉ sét|thợ rèn/.test(t))&&!(!vessel&&/^Đáy có/.test(t)));}
function genRelic(tier){
  const r=G.run;const K=pick(RELIC_K);
  let el,base;
  if(K.k==='hap'){el=chance(.7)&&r.root.els.length?pick(r.root.els):pick(['kim','moc','thuy','hoa','tho','loi']);base={kim:contentText("core_05-thoi-gian-the-gioi_js.genRelic.054"),moc:contentText("core_05-thoi-gian-the-gioi_js.genRelic.055"),thuy:contentText("core_05-thoi-gian-the-gioi_js.genRelic.056"),hoa:'Phiến',tho:contentText("core_05-thoi-gian-the-gioi_js.genRelic.057"),loi:contentText("core_05-thoi-gian-the-gioi_js.genRelic.058"),bang:contentText("core_05-thoi-gian-the-gioi_js.genRelic.059"),phong:'Phong Linh'}[el];}
  else {el=chance(.45)?'vo':pick(NGUHANH);base=pick(K.b);}
  const pre=pick(RELIC_PRE[el]||RELIC_PRE.vo);
  const who=genName(chance(.5)?'nam':'nu');
  const lore=T(pick(relicLorePool(pre+' '+base)),{who,sect:pick(G.meta.world.sects).n,pl:placeName(pick(['nui','thanh','tran']))});
  return {name:pre+' '+base,k:K.k,tier,el,fx:Object.assign({},K.fx),lore};
}
function uniqueRelic(id){
  if(id==='linhthu'){const n=pick([contentText("core_05-thoi-gian-the-gioi_js.uniqueRelic.060"),contentText("core_05-thoi-gian-the-gioi_js.uniqueRelic.061"),contentText("core_05-thoi-gian-the-gioi_js.uniqueRelic.062"),contentText("core_05-thoi-gian-the-gioi_js.uniqueRelic.063"),contentText("core_05-thoi-gian-the-gioi_js.uniqueRelic.064"),contentText("core_05-thoi-gian-the-gioi_js.uniqueRelic.065"),contentText("core_05-thoi-gian-the-gioi_js.uniqueRelic.066")]);return {name:contentText("core_05-thoi-gian-the-gioi_js.uniqueRelic.067")+n,k:'linhthu',u:'linhthu',tier:rT(),el:'vo',fx:{dodge:4,van:2,regenHp:2},lore:contentText("core_05-thoi-gian-the-gioi_js.uniqueRelic.068")};}
  const U0=RELIC_UNIQUE[id];if(!U0)return null;
  return {name:U0.name,k:U0.k,u:id,tier:Math.min(4,rT()),el:U0.el,fx:Object.assign({},U0.fx),lore:U0.lore};
}
// Bảng FXT: content/items/fxt.js
function fxLines(fx,rel){const out=[];for(const[k,v]of Object.entries(fx)){if(k==='elX'){out.push(contentText("core_05-thoi-gian-the-gioi_js.fxLines.069", [EL[rel.el].c,EL[rel.el].n,v]));continue;}if(k==='elP'){for(const[e,x]of Object.entries(v))out.push(contentText("core_05-thoi-gian-the-gioi_js.fxLines.070", [EL[e].c,EL[e].n,x]));continue;}if(FXT[k])out.push(FXT[k].replace('{v}',k==='mpCost'?Math.abs(v):(k==='poisonHit'?'':v)));}return out;}
function relicTip(rel){return `${rel.name}\n${GRADE[rel.tier]}\n${fxLines(relicFx(rel),rel).join('\n')}\n\n${rel.lore}`;}
function rollSkill(tier){
  const r=G.run;tier=clamp(tier||[1,2,2,3,4][rT()],1,4);
  if(chance(.35))tier=clamp(tier+(chance(.5)?-1:1),1,4);
  let pool=SK_RAW.filter(s=>s[3]===tier);
  const mine=pool.filter(s=>r.root.els.includes(s[2]));
  if(mine.length&&chance(.6))pool=mine;
  return pick(pool)[0];
}
function gainSkill(id){
  const r=G.run, sk=SK[id];if(!sk)return null;
  const h=r.skills.find(x=>x.id===id);
  if(h){if(h.lv<3){h.lv++;log(contentText("core_05-thoi-gian-the-gioi_js.gainSkill.071", [sk.n]));return chip('📖',sk.n+' bậc '+h.lv,skillTip(sk,h.lv),'item');}return chip('📖',sk.n+contentText("core_05-thoi-gian-the-gioi_js.gainSkill.072"),contentText("core_05-thoi-gian-the-gioi_js.gainSkill.073"),'');}
  if(r.skills.length<4){r.skills.push({id,lv:1});log(contentText("core_05-thoi-gian-the-gioi_js.gainSkill.074", [sk.n]));if(sk.dao&&addDao(3,'skill'))log(contentText("core_05-thoi-gian-the-gioi_js.gainSkill.075"));return chip('📖',sk.n+(sk.dao?' ☯':''),skillTip(sk,1),'item');}
  r.pendingSkill=id;return chip('📖',sk.n,contentText("core_05-thoi-gian-the-gioi_js.gainSkill.076"),'item');
}
function skillCost(sk){if(!sk.c)return 0;const fx=aggFx();return Math.max(1,Math.round(sk.c*(TAB.mp[G.run.realm]/30)*(1+(fx.mpCost||0)/100)));}
function skillTip(sk,lv){
  const f=sk.fx,L=[];const m=1+0.25*((lv||1)-1);
  if(f.p)L.push(contentText("core_05-thoi-gian-the-gioi_js.skillTip.077", [Math.round(f.p*m*100),sk.dt==='vl'?'sát thương vật lý':'sát thương phép'])+(f.h?contentText("core_05-thoi-gian-the-gioi_js.skillTip.078", [f.h]):''));
  if(f.pierce)L.push(contentText("core_05-thoi-gian-the-gioi_js.skillTip.079", [Math.round(f.pierce*100)]));
  if(f.crit)L.push(contentText("core_05-thoi-gian-the-gioi_js.skillTip.080", [f.crit]));
  if(f.poison)L.push(contentText("core_05-thoi-gian-the-gioi_js.skillTip.081"));if(f.burn)L.push(contentText("core_05-thoi-gian-the-gioi_js.skillTip.082"));
  if(f.weak)L.push(contentText("core_05-thoi-gian-the-gioi_js.skillTip.083", [f.weak]));if(f.vuln)L.push(contentText("core_05-thoi-gian-the-gioi_js.skillTip.084", [f.vuln]));
  if(f.stun)L.push(contentText("core_05-thoi-gian-the-gioi_js.skillTip.085", [f.stun]));if(f.block)L.push(contentText("core_05-thoi-gian-the-gioi_js.skillTip.086", [Math.round(f.block*m*100)]));
  if(f.heal)L.push(contentText("core_05-thoi-gian-the-gioi_js.skillTip.087", [Math.round(f.heal*m)]));if(f.regen)L.push(contentText("core_05-thoi-gian-the-gioi_js.skillTip.088", [f.regen]));
  if(f.drain)L.push(contentText("core_05-thoi-gian-the-gioi_js.skillTip.089", [f.drain]));if(f.rage)L.push(contentText("core_05-thoi-gian-the-gioi_js.skillTip.090", [f.rage]));
  if(f.evade)L.push(contentText("core_05-thoi-gian-the-gioi_js.skillTip.091", [f.evade]));if(f.cleanse)L.push(contentText("core_05-thoi-gian-the-gioi_js.skillTip.092"));
  if(f.selfHp)L.push(contentText("core_05-thoi-gian-the-gioi_js.skillTip.093", [f.selfHp]));if(f.bonusIf)L.push(contentText("core_05-thoi-gian-the-gioi_js.skillTip.094"));
  if(f.charge)L.push(contentText("core_05-thoi-gian-the-gioi_js.skillTip.095"));if(f.aoe)L.push(contentText("core_05-thoi-gian-the-gioi_js.skillTip.096"));if(sk.dao)L.push(contentText("core_05-thoi-gian-the-gioi_js.skillTip.097"));
  L.push(contentText("core_05-thoi-gian-the-gioi_js.skillTip.098")+String(skRec(sk)).replace('.',','));
  return contentText("core_05-thoi-gian-the-gioi_js.skillTip.099", [sk.n,lv>1?' (bậc '+lv+')':'',EL[sk.el].n,sk.t,L.join('\n'),sk.f]);
}
function rollPill(){const r=G.run;const pool=['hoixuan','hoixuan','tukhi','baohuyet','kimcang','loiphu','giaidoc','thanhanh','dinhthan','tinhnguyen','linhnhu'];if(chance(.25))pool.push(pick(['homach','tiloi','duongnguyen','nhanhoang','diamach','thiendao','bode']));if(rT()>=1)pool.push('taytuy','khaitri','dientho');if(chance(.12))pool.push(btPill());return pick(pool);}
function gainPill(id,q){
  const r=G.run,p=PILL[id];if(!p)return null;q=q||0;
  if(r.pills.length>=S().pillMax){const g=Math.max(1,Math.round(p.p*SC[rT()]*0.4));r.st+=g;return chip(p.i,p.n+' → 💎'+g,contentText("core_05-thoi-gian-the-gioi_js.gainPill.100"),'');}
  r.pills.push({id,q});return chip(p.i,(q?PQ[q]+' ':'')+p.n,pillTip(id,q),'item');
}
function pillX(id,q){const p=PILL[id];const fx=aggFx();return Math.round(p.x*PQM[q||0]*(1+(fx.pillP||0)/100));}
function pillTip(id,q){const p=PILL[id];return `${q?PQ[q]+' ':''}${p.n}\n${p.d.replace('{x}',pillX(id,q))}\n${p.w==='combat'?contentText("core_05-thoi-gian-the-gioi_js.pillTip.101"):p.w==='bt'?contentText("core_05-thoi-gian-the-gioi_js.pillTip.102"):contentText("core_05-thoi-gian-the-gioi_js.pillTip.103")}${p.dao?contentText("core_05-thoi-gian-the-gioi_js.pillTip.104")+p.dao:''}`;}
function usePill(idx,inCombat){
  const r=G.run,it=r.pills[idx];if(!it)return null;const p=PILL[it.id];const x=pillX(it.id,it.q);const s=S();
  if(p.w==='bt')return null;if(p.w==='combat'&&!inCombat)return null;
  r.pills.splice(idx,1);let msg=p.n;const sc=r.scene;
  switch(it.id){
    case 'hoixuan':r.hp=Math.min(s.maxHp,r.hp+s.maxHp*x/100);break;
    case 'tukhi':r.mp=Math.min(s.maxMp,r.mp+s.maxMp*x/100);break;
    case 'baohuyet':{const me=mainUnit(sc);me.st.rage=(me.st.rage||0)+x;break;}
    case 'kimcang':{const me=mainUnit(sc);me.st.block=(me.st.block||0)+Math.round(s.maxHp*x/100);break;}
    case 'loiphu':{const t=alive(sc,'B').filter(u=>!u.immune).sort((a,b)=>a.hp-b.hp)[0];if(t){let d=Math.max(s.atk*x/100*0.25,s.atk*x/100-t.def*0.7);if(t.st.vuln)d*=1.3;if(KHAC.loi===t.el)d*=1.5;d=absorb(t.st,Math.round(d));t.hp-=d;msg+=': '+d;if(t.hp<=0){down(sc,t);checkEnd(sc);}}break;}
    case 'giaidoc':if(sc&&sc.type==='combat'){const me=mainUnit(sc);me.st.poison=0;me.st.burn=0;}r.hp=Math.min(s.maxHp,r.hp+s.maxHp*x/100);break;
    case 'thanhanh':sc.fleeSure=1;break;
    case 'dinhthan':r.tamma=Math.max(0,r.tamma-x);break;
    case 'tinhnguyen':addTv(tvGain(x));break;
    case 'taytuy':{const s0=S();r.bon.hpP+=x;r.hp+=S().maxHp-s0.maxHp;break;}
    case 'khaitri':r.bon.ngo+=x;break;
    case 'linhnhu':break;
    case 'dientho':r.lifeAdj+=Math.round(LIFE[r.realm]*x/100);break;
  }
  if(p.dao){const g=addDao(p.dao,'pill');if(g)msg+=contentText("core_05-thoi-gian-the-gioi_js.usePill.105")+g+')';}
  r.hp=Math.round(r.hp);r.mp=Math.round(r.mp);clampHp();
  return msg;
}
