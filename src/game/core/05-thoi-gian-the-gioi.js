// ---------------- THỜI GIAN & THẾ GIỚI ----------------
function pushNews(t,quiet){const r=G.run;if(!r)return;if(TICK_OUT&&!quiet)TICK_OUT.push(t);r.news.push({a:Math.floor(r.age),t});if(r.news.length>40)r.news.shift();r.newsQ=(r.newsQ||[]);r.newsQ.push(t);if(r.newsQ.length>4)r.newsQ.shift();}
function rumorV(rv,extra){
  const w=G.meta.world, wr=w.rivals[rv.i];
  return Object.assign({a:wr.ten,s:w.sects[wr.s].n,s2:pick(w.sects).n,pl:placeName(pick(['nui','phe','hoang','song','thanh'])),cg:REALM[rv.realm],dan:PILL[pick(['trucco','ngungkim','phaanh','hoathan'])].n},extra||{});
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
  pushNews(`Vạn Bảo Thương Hội công bố Thiên Kiêu Bảng: ${top}.`+(me<0?' Trên bảng không có tên ngươi.':''));
  if(me>=0){log(`Thiên Kiêu Bảng: ngươi đứng hạng ${me+1}.`);r.bon.van+=1;if(me===0){ach('bang1');r.bangTop=1;bio(`Năm ${Math.floor(r.age)} tuổi, đứng đầu Thiên Kiêu Bảng.`);}}
}

// ---------------- HIỆU ỨNG ----------------
function chip(i,t,tip,c,tier){return tier==null?{i,t,tip,c}:{i,t,tip,c,tier};}
function sgn(x){return (x>0?'+':'−')+Math.abs(Math.round(x));}
function addTv(x){
  const r=G.run;const b=tieu();const s0=S();const g0=lkOn()?lkTang():0;
  r.tv=clamp(r.tv+x,0,100);
  const a=tieu();const g1=lkOn()?lkTang():0;
  if(g1>g0&&a<=b)log(`Tu vi tiến tới ${realmLabel()}.`);
  if(a>b){const s1=S();r.hp+=s1.maxHp-s0.maxHp;r.mp+=s1.maxMp-s0.maxMp;log(`Tu vi tiến tới ${realmLabel()}.`);}
  clampHp();
}
function tvGain(base){return base*S().tvM;}
function applyE(e,v){
  const r=G.run, ch=[];if(!e)return ch;
  let s=S();
  const pct=(x,max)=>{if(typeof x==='string'&&x.endsWith('%'))return max*parseFloat(x)/100;return +x;};
  if(e.hp!=null){const d=Math.round(pct(e.hp,s.maxHp));const before=r.hp;r.hp=clamp(r.hp+d,1,s.maxHp);const dd=r.hp-before;if(dd)ch.push(chip('❤️',sgn(Math.round(dd/Math.max(1,s.maxHp)*100)||Math.sign(dd))+'%','Khí huyết',dd>0?'up':'dn'));}
  if(e.mp!=null){const d=Math.round(pct(e.mp,s.maxMp));const before=r.mp;r.mp=clamp(r.mp+d,0,s.maxMp);const dd=r.mp-before;if(dd)ch.push(chip('💧',sgn(Math.round(dd/Math.max(1,s.maxMp)*100)||Math.sign(dd))+'%','Linh lực',dd>0?'up':'dn'));}
  if(e.tv){let x=e.tv>0?tvGain(e.tv):e.tv;if(x>0&&!e.tvMajor){const room=Math.max(0,40-(r.tvMinor||0));x=Math.min(x,room);r.tvMinor=(r.tvMinor||0)+x;}const b=r.tv;addTv(x);const d=r.tv-b;if(sgOn()){const g1=sgTang();if(Math.abs(d)>1e-6)ch.push(chip('✨',(d>0?'+':'−')+Math.max(1,Math.round(Math.abs(d)/sgW(g1)*100))+'% tu vi','Tu vi '+sgName(g1),d>0?'up':'dn'));else if(e.tv>0&&sgFull())ch.push(chip('✨',r.tv>=100?'viên mãn':'đã đầy',r.tv>=100?'Tu vi đã viên mãn, cần đột phá ở động phủ':'Tu vi '+sgName(g1)+' đã đầy, cần xung kích','up'));}else if(Math.abs(d)>=0.5)ch.push(chip('✨',sgn(Math.round(d)||Math.sign(d))+'% tu vi','Tu vi',d>0?'up':'dn'));else if(e.tv>0&&r.tv>=100)ch.push(chip('✨','viên mãn','Tu vi đã đầy, cần đột phá ở động phủ','up'));}
  if(e.st!=null){let d;if(typeof e.st==='string')d=Math.round(r.st*parseFloat(e.st)/100);else{d=Math.round(e.st*SC[r.region]*(e.st>0?(1+(s.fx.stonesP||0)/100):1));if(!d&&e.st)d=e.st>0?1:-1;}const b=r.st;r.st=Math.max(0,r.st+d);const dd=r.st-b;if(dd)ch.push(chip('💎',sgn(dd),'Linh thạch',dd>0?'up':'dn'));}
  const statN={atkP:['⚔️','Công','%'],defP:['🛡️','Thủ','%'],hpP:['❤️','Khí huyết tối đa','%'],mpP:['💧','Linh lực tối đa','%'],tp:['🌀','Thân pháp',''],ngo:['🧠','Ngộ tính',''],van:['🍀','Khí vận',''],tam:['🪷','Đạo tâm','']};
  for(const k in statN){if(e[k]){const s0=S();r.bon[k]+=e[k];const s1=S();if(k==='hpP')r.hp+=s1.maxHp-s0.maxHp;if(k==='mpP')r.mp+=s1.maxMp-s0.maxMp;ch.push(chip(statN[k][0],statN[k][1]+(e[k]>0?' ▲':' ▼'),statN[k][1]+(e[k]>0?' tăng':' giảm')+' vĩnh viễn',e[k]>0?'up':'dn'));}}
  if(e.tamma){let d=e.tamma;if(d>0)d=d*(1-Math.min(80,s.fx.tammaRes||0)/100);d=Math.round(d);const b=r.tamma;r.tamma=clamp(r.tamma+d,0,100);const dd=r.tamma-b;if(dd)ch.push(chip('😈',dd>0?'tâm ma ▲':'tâm ma ▼','Tâm ma '+(dd>0?'dày thêm':'nguôi bớt'),dd>0?'dn':'up'));}
  if(e.karma){r.karma=clamp(r.karma+e.karma,-100,100);ch.push(chip('☯️',(e.karma>0?'thiện ▲':'ác ▲'),'Nhân quả: '+(e.karma>0?'thêm việc thiện':'thêm việc ác'),e.karma>0?'up':'dn'));if(r.karma>=60)ach('thien');if(r.karma<=-60)ach('ma');}
  if(e.h){ch.push(chip('⏳',durH(e.h),'Thời gian trôi qua',''));advanceTime(e.h);if(!G.run)return ch;}
  if(e.lifeCut){const y=Math.round(LIFE[r.realm]*e.lifeCut/100);r.lifeAdj-=y;ch.push(chip('⏳','thọ −'+y+' năm','Thọ nguyên giảm','dn'));if(r.age>=S().life){die('toahoa');return ch;}}
  if(e.life){r.lifeAdj+=e.life;ch.push(chip('⏳','thọ +'+e.life+' năm','Thọ nguyên','up'));}
  if(e.relic!=null){const rel=typeof e.relic==='number'?genRelic(clamp(r.region+e.relic,0,4)):uniqueRelic(e.relic);if(rel&&!(rel.u&&r.relics.find(x=>x.u===rel.u))){r.relics.push(rel);clampHp();ch.push(chip('🏺',rel.name,relicTip(rel),'item',rel.tier));log(`Nhận được ${rel.name}.`);}}
  if(e.rmRelic){const k=r.relics.findIndex(x=>x.u===e.rmRelic);if(k>=0){const n=r.relics[k].name;r.relics.splice(k,1);clampHp();ch.push(chip('🏺','mất '+n,'Pháp bảo đã mất','dn'));}}
  if(e.skill!=null){const id=typeof e.skill==='number'?rollSkill(e.skill):e.skill;const c=gainSkill(id);if(c)ch.push(c);}
  if(e.pill!=null){const arr=Array.isArray(e.pill)?e.pill:[e.pill];if(e.pill2)arr.push(e.pill2);for(const p of arr){const c=gainPill(p===1||p===0?rollPill():(p==='@bt'?btPill():p),r.region>=3?2:r.region>=1?ri(0,1):0);if(c)ch.push(c);}}
  if(e.lore){const c=gainLore(e.lore);if(c)ch.push(c);}
  if(e.dao){const g=addDao(e.dao,'ev');if(g)ch.push(chip('☯️','đạo cơ ▲','Đạo cơ vững thêm: quyết định phẩm chất khi đột phá','up'));}
  if(e.flag) r.flags[e.flag]=1;
  if(e.shop)r.goShop=1;
  if(e.dropPill&&r.pills.length){const i=Math.floor(R()*r.pills.length);const p=r.pills.splice(i,1)[0];ch.push(chip(PILL[p.id].i,'mất '+PILL[p.id].n,'Đã trao đi','dn'));}
  if(e.party&&v&&v[e.party.k]){const c=addParty(v[e.party.k],e.party.days);if(c)ch.push(c);}
  if(e.partyRv&&v&&v.rv){const c=addParty({ten:v.rv.ten,g:v.rv.hn==='nàng'?'nu':'nam',realm:v.rv.realm},e.partyRv,0.9);if(c)ch.push(c);}
  if(e.partyP&&v&&v.p){const c=addParty({ten:v.p.ten,g:'nam'},e.partyP,0.7);if(c)ch.push(c);}
  if(e.nemDone)W().nemesis=null;
  if(e.entGone&&v&&v.eid!=null){const x=W().ents.find(z=>z.id===v.eid);if(x)removeEnt(x);}
  if(e.patronDone&&v&&v.pn!=null){const n=nodeById(v.pn);if(n)n.patron=null;}
  if(e.graveItems&&v){graveTake(v).forEach(c=>ch.push(c));}
  if(e.ach) ach(e.ach);
  if(e.an){const [k,d]=Array.isArray(e.an)?e.an:[e.an,'giúp đỡ'];const n=v&&v[k];if(n&&n.ten){r.seeds.push({t:'an',ten:n.ten,hn:n.hn,d,r:r.region,at:G.meta.world.t});ch.push(chip('🤝','kết duyên','Một ân tình đã gieo. Có thể sẽ được đền đáp.','up'));}}
  if(e.oan){const [k,d]=Array.isArray(e.oan)?e.oan:[e.oan,'hại']; const n=v&&v[k];if(n&&n.ten){r.seeds.push({t:'oan',ten:n.ten,hn:n.hn,d,r:r.region,at:G.meta.world.t});ch.push(chip('🗡️','kết oán','Một mối thù đã gieo.','dn'));}}
  if(e.rumor){for(let i=0;i<e.rumor;i++){const rv=pick(r.rivals);const pool=chance(.5)?RUMOR.the:RUMOR[pick(['tien','tien','ma','tu'])];pushNews(T(pool,rumorV(rv)));}ch.push(chip('🍃','tin đồn','Xem trong Nhật ký','')); r.showNews=e.rumor;}
  if(e.rival){const rv=r.rivals.find(x=>x.i===(v&&v.rvi));if(rv){rv.rel+=e.rival;ch.push(chip('🤝',e.rival>0?'thiện cảm':'ác cảm','Quan hệ với thiên kiêu',e.rival>0?'up':'dn'));}}
  clampHp();
  return ch;
}
function dur(y){if(y<1){const m=Math.max(1,Math.round(y*12));return m+' tháng';}return (Math.round(y*10)/10).toString().replace('.',',')+' năm';}
function ach(id){if(!G.meta.ach.includes(id)){G.meta.ach.push(id);const a=ACH.find(x=>x.id===id);if(G.run&&a)log(`Thành tựu: ${a.n}.`);}}
function gainLore(id){if(!LORE[id])return null;if(G.run&&!G.run.flags['lore_'+id]){G.run.flags['lore_'+id]=1;}const fresh=!G.meta.lore.includes(id);if(fresh)G.meta.lore.push(id);return chip('📜',LORE[id].n,fresh?'Điển tích mới, xem trong Tiên Lộ':'Đã có trong Tiên Lộ','item');}

// ---------------- VẬT PHẨM ----------------
// câu mô tả phải hợp chất liệu: gỉ sét, thợ rèn chỉ cho đồ kim loại; "đáy có con dấu" chỉ cho đồ có đáy
function relicLorePool(name){const soft=/Phất Trần|Trượng|Phiến|Quạt|Y\b|Bào|Áo|Ngọc|Châu|Đồ|Phù|Kết|Lụa|Đai|Mũ|Quan|Giày|Hài|Trâm|Sách|Quyển|Cầm|Tiêu|Sáo|Trúc|Mộc|Hồ Lô|Bình|Khăn|Dây|Thằng|Sa\b|Liên|Hoa/i.test(name);
  const vessel=/Đỉnh|Bình|Hồ Lô|Bát|Lô\b|Chung|Ấn|Hạp|Hộp/i.test(name);
  return RELIC_LORE.filter(t=>!(soft&&/gỉ sét|thợ rèn/.test(t))&&!(!vessel&&/^Đáy có/.test(t)));}
function genRelic(tier){
  const r=G.run;const K=pick(RELIC_K);
  let el,base;
  if(K.k==='hap'){el=chance(.7)?pick(r.root.els):pick(['kim','moc','thuy','hoa','tho','loi']);base={kim:'Kiếm Hạp',moc:'Mộc Trượng',thuy:'Thủy Bình',hoa:'Phiến',tho:'Sơn Ấn',loi:'Lôi Châu',bang:'Băng Châu',phong:'Phong Linh'}[el];}
  else {el=chance(.45)?'vo':pick(NGUHANH);base=pick(K.b);}
  const pre=pick(RELIC_PRE[el]||RELIC_PRE.vo);
  const who=genName(chance(.5)?'nam':'nu');
  const lore=T(pick(relicLorePool(pre+' '+base)),{who,sect:pick(G.meta.world.sects).n,pl:placeName(pick(['nui','thanh','tran']))});
  return {name:pre+' '+base,k:K.k,tier,el,fx:Object.assign({},K.fx),lore};
}
function uniqueRelic(id){
  if(id==='linhthu'){const n=pick(['Tiểu Bạch','Tiểu Hắc','Đoàn Tử','Tiểu Hỏa','Mao Cầu','A Hoàng','Tiểu Tuyết']);return {name:'Linh thú '+n,k:'linhthu',u:'linhthu',tier:G.run.region,el:'vo',fx:{dodge:4,van:2,regenHp:2},lore:'Nhỏ như nắm tay, lúc nào cũng nằm trong ngực áo ngươi. Lúc nguy hiểm, nó cắn trước.'};}
  const U0=RELIC_UNIQUE[id];if(!U0)return null;
  return {name:U0.name,k:U0.k,u:id,tier:Math.min(4,G.run.region),el:U0.el,fx:Object.assign({},U0.fx),lore:U0.lore};
}
const FXT={matkP:'🔮 Sát thương phép +{v}%',critDmg:'💥 Sát thương chí mạng +{v}%',hoTam:'🫀 Hộ tâm +{v}',atkP:'⚔️ Sát thương vật lý +{v}%',defP:'🛡️ Thủ +{v}%',hpP:'❤️ Khí huyết +{v}%',mpP:'💧 Linh lực +{v}%',tp:'🌀 Thân pháp +{v}',ngo:'🧠 Ngộ tính +{v}',van:'🍀 Khí vận +{v}',tam:'🪷 Đạo tâm +{v}',crit:'🎯 Tỉ lệ chí mạng +{v}%',dodge:'🍃 Né tránh +{v}%',startBlock:'🛡️ Vào trận được hộ thể {v}% khí huyết',regenMp:'💧 Mỗi lượt hồi {v}% linh lực',regenHp:'❤️ Mỗi lượt hồi {v}% khí huyết',pillP:'⚗️ Đan dược mạnh thêm {v}%',poisonHit:'☠️ Mỗi đòn gây độc',reflect:'🪞 Phản {v}% sát thương nhận vào',tvP:'✨ Tu vi nhận thêm {v}%',stunP:'💫 Đòn đánh thêm {v}% gây choáng',healAfter:'🌿 Thắng trận hồi {v}% khí huyết',blockTurn:'🛡️ Mỗi lượt thêm hộ thể {v}% khí huyết',firstEvade:'🍃 Né {v} đòn đầu mỗi trận',weakStart:'🥀 Địch suy nhược {v} lượt đầu trận',vulnStart:'💔 Địch phá giáp {v} lượt đầu trận',stonesP:'💎 Linh thạch nhận thêm {v}%',pillSlot:'👝 Thêm {v} ô đan dược',shopP:'🏪 Mua rẻ {v}%',tammaRes:'😈 Tâm ma tăng chậm {v}%',execute:'☄️ Đánh kẻ dưới 30% khí huyết +{v}%',drain:'🩸 Hút {v}% sát thương thành khí huyết',mpCost:'💧 Pháp thuật tốn ít hơn {v}%',lifeP:'⏳ Thọ nguyên {v}%'};
function fxLines(fx,rel){const out=[];for(const[k,v]of Object.entries(fx)){if(k==='elX'){out.push(`${EL[rel.el].c} Hệ ${EL[rel.el].n} +${v}%`);continue;}if(k==='elP'){for(const[e,x]of Object.entries(v))out.push(`${EL[e].c} Hệ ${EL[e].n} +${x}%`);continue;}if(FXT[k])out.push(FXT[k].replace('{v}',k==='mpCost'?Math.abs(v):(k==='poisonHit'?'':v)));}return out;}
function relicTip(rel){return `${rel.name}\n${GRADE[rel.tier]}\n${fxLines(relicFx(rel),rel).join('\n')}\n\n${rel.lore}`;}
function rollSkill(tier){
  const r=G.run;tier=clamp(tier||[1,2,2,3,4][r.region],1,4);
  if(chance(.35))tier=clamp(tier+(chance(.5)?-1:1),1,4);
  let pool=SK_RAW.filter(s=>s[3]===tier);
  const mine=pool.filter(s=>r.root.els.includes(s[2]));
  if(mine.length&&chance(.6))pool=mine;
  return pick(pool)[0];
}
function gainSkill(id){
  const r=G.run, sk=SK[id];if(!sk)return null;
  const h=r.skills.find(x=>x.id===id);
  if(h){if(h.lv<3){h.lv++;log(`${sk.n} tinh thông thêm một bậc.`);return chip('📖',sk.n+' bậc '+h.lv,skillTip(sk,h.lv),'item');}return chip('📖',sk.n+' (đã tinh thông)','Đã đạt bậc cao nhất','');}
  if(r.skills.length<4){r.skills.push({id,lv:1});log(`Lĩnh ngộ ${sk.n}.`);if(sk.dao&&addDao(3,'skill'))log('Đạo cơ +3.');return chip('📖',sk.n+(sk.dao?' ☯':''),skillTip(sk,1),'item');}
  r.pendingSkill=id;return chip('📖',sk.n,'Đã đủ bốn môn, cần bỏ bớt một môn','item');
}
function skillCost(sk){if(!sk.c)return 0;const fx=aggFx();return Math.max(1,Math.round(sk.c*(TAB.mp[G.run.realm]/30)*(1+(fx.mpCost||0)/100)));}
function skillTip(sk,lv){
  const f=sk.fx,L=[];const m=1+0.25*((lv||1)-1);
  if(f.p)L.push(`Sát thương ${Math.round(f.p*m*100)}% ${sk.dt==='vl'?'sát thương vật lý':'sát thương phép'}`+(f.h?` × ${f.h} lần`:''));
  if(f.pierce)L.push(`Xuyên ${Math.round(f.pierce*100)}% phòng thủ`);
  if(f.crit)L.push(`Tỉ lệ chí mạng +${f.crit}%`);
  if(f.poison)L.push('Gây ☠️ Độc');if(f.burn)L.push('Gây 🔥 Thiêu');
  if(f.weak)L.push(`🥀 Suy nhược ${f.weak} vòng`);if(f.vuln)L.push(`💔 Phá giáp ${f.vuln} vòng`);
  if(f.stun)L.push(`💫 ${f.stun}% gây choáng 2 giây`);if(f.block)L.push(`🛡️ Hộ thể ${Math.round(f.block*m*100)}% công`);
  if(f.heal)L.push(`🌿 Hồi ${Math.round(f.heal*m)}% khí huyết`);if(f.regen)L.push(`🌱 Hồi xuân ${f.regen} vòng`);
  if(f.drain)L.push(`🩸 Hút ${f.drain}% sát thương`);if(f.rage)L.push(`💢 Cuồng nộ +${f.rage}`);
  if(f.evade)L.push(`🍃 Né ${f.evade} đòn`);if(f.cleanse)L.push('Giải trừ độc, thiêu, suy nhược');
  if(f.selfHp)L.push(`Tốn ${f.selfHp}% khí huyết`);if(f.bonusIf)L.push('+50% nếu địch đang trúng độc hoặc thiêu');
  if(f.charge)L.push('⏳ Tụ lực: đứng chờ ở mốc 75 tới khi mọi kẻ địch ra tay');if(f.aoe)L.push('🌐 Đánh cả phe địch (60% uy lực)');if(sk.dao)L.push('☯ Học được: đạo cơ +3');
  L.push('Độ nặng ×'+String(skRec(sk)).replace('.',','));
  return `${sk.n}${lv>1?' (bậc '+lv+')':''}\n${EL[sk.el].n} hệ, bậc ${sk.t}\n${L.join('\n')}\n\n${sk.f}`;
}
function rollPill(){const r=G.run;const pool=['hoixuan','hoixuan','tukhi','baohuyet','kimcang','loiphu','giaidoc','thanhanh','dinhthan','tinhnguyen','linhnhu'];if(chance(.25))pool.push(pick(['homach','tiloi','duongnguyen','nhanhoang','diamach','thiendao','bode']));if(r.region>=1)pool.push('taytuy','khaitri','dientho');if(chance(.12))pool.push(btPill());return pick(pool);}
function gainPill(id,q){
  const r=G.run,p=PILL[id];if(!p)return null;q=q||0;
  if(r.pills.length>=S().pillMax){const g=Math.max(1,Math.round(p.p*SC[r.region]*0.4));r.st+=g;return chip(p.i,p.n+' → 💎'+g,'Túi đầy, đã bán đi','');}
  r.pills.push({id,q});return chip(p.i,(q?PQ[q]+' ':'')+p.n,pillTip(id,q),'item');
}
function pillX(id,q){const p=PILL[id];const fx=aggFx();return Math.round(p.x*PQM[q||0]*(1+(fx.pillP||0)/100));}
function pillTip(id,q){const p=PILL[id];return `${q?PQ[q]+' ':''}${p.n}\n${p.d.replace('{x}',pillX(id,q))}\n${p.w==='combat'?'Dùng trong trận':p.w==='bt'?'Đặt vào ô chuẩn bị đột phá':'Dùng bất cứ lúc nào'}${p.dao?'\nĐạo cơ +'+p.dao:''}`;}
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
  if(p.dao){const g=addDao(p.dao,'pill');if(g)msg+=' (đạo cơ +'+g+')';}
  r.hp=Math.round(r.hp);r.mp=Math.round(r.mp);clampHp();
  return msg;
}
