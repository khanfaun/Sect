// ---------------- THẾ GIỚI SỐNG: THỰC THỂ ----------------
ENT_ON=true;HOURS_ON=true;SEASON_ON=true;QUEST_ON=true;CACHE_ON=true;GRAVE_ON=true;
const ENT_T={
  thuong:{n:'Thương đội',i:'🐫',sp:4,w:3,life:[20,40]},
  thutrieu:{n:'Thú triều',i:'🐾',sp:3,w:2,life:[10,20]},
  tuantra:{n:'Đệ tử tuần tra',i:'🥋',sp:6,w:2,life:[10,25]},
  thienkieu:{n:'Thiên kiêu',i:'🌟',sp:10,w:1,life:[8,20]},
  truysat:{n:'Kẻ truy sát',i:'🗡️',sp:7,w:0,life:[30,60]},
  di:{n:'Dị tượng',i:'✨',sp:0,w:2,life:[3,10]},
};
const DI_K={bicanh:{n:'Bí cảnh mở cửa',i:'🌀',ev:'bi_canh'},saoroi:{n:'Sao rơi',i:'☄️',ev:'sao_roi'},daugia:{n:'Hội đấu giá',i:'🏮',ev:'dau_gia'}};
function entsHere(k){return W().ents.filter(e=>e.r===k);}
function entXY(e){const a=nodeById(e.at);if(!e.to)return [a.x,a.y];const b=nodeById(e.to);return [a.x+(b.x-a.x)*e.prog,a.y+(b.y-a.y)*e.prog];}
function townsOf(k){return regionOf(k).nodes.filter(n=>(n.type==='tran'||n.type==='thanh')&&n.state==='ok');}
function setRoute(e,dest){const p=findPath(e.at,dest);if(!p||p.length<2){e.route=[];e.to=null;return false;}e.route=p.slice(1);e.to=e.route[0];e.prog=0;e.dest=dest;return true;}
function spawnEnt(type,k,o){
  const w=W();o=o||{};const T0=ENT_T[type];const R0=regionOf(k);const ns=R0.nodes;
  if(entsHere(k).length>=12)return null;
  const e={id:(w.eid=(w.eid||0)+1),type,r:k,name:T0.n,icon:T0.i,at:null,to:null,prog:0,route:[],speed:T0.sp,until:w.t+ri(T0.life[0],T0.life[1])*HD,data:{},wait:0};
  if(type==='thuong'){const ts=townsOf(k);if(ts.length<2)return null;const a=pick(ts);e.at=a.id;let b=pick(ts.filter(x=>x!==a));setRoute(e,b.id);e.name='Thương đội '+pick(NAME.ho);}
  else if(type==='thutrieu'){const src=ns.filter(n=>n.danger>=2&&n.type!=='ai');if(!src.length)return null;const a=pick(src);e.at=a.id;
    const ts=townsOf(k).sort((x,y)=>Math.hypot(x.x-a.x,x.y-a.y)-Math.hypot(y.x-a.x,y.y-a.y));if(!ts.length)return null;setRoute(e,ts[0].id);e.data.tgt=ts[0].id;e.name='Thú triều từ '+a.name;}
  else if(type==='tuantra'){const ss=ns.filter(n=>n.type==='tong');const base=ss.length?pick(ss):pick(townsOf(k).length?townsOf(k):ns);e.at=base.id;e.data.home=base.id;const nb=neighbors(base.id);setRoute(e,pick(nb));e.name='Đệ tử '+(base.owner||pick(w.sects).n);}
  else if(type==='thienkieu'){const al=(G.run?G.run.rivals:w.rstate||[]).filter(x=>x.alive);if(!al.length)return null;const rv=o.rv!=null?o.rv:pick(al).i;if(w.ents.some(x=>x.type==='thienkieu'&&x.data.rv===rv))return null;e.data.rv=rv;e.name=w.rivals[rv].ten;
    const di=w.ents.find(x=>x.r===k&&x.type==='di');const a=pick(ns.filter(n=>n.type!=='ai'));e.at=a.id;setRoute(e,di?di.at:pick(ns).id);}
  else if(type==='truysat'){const a=o.at!=null?o.at:pick(ns.filter(n=>n.id!==(G.run&&G.run.at))).id;e.at=a;e.data=o.data||{};e.name=o.name||'Kẻ truy sát';e.until=w.t+60*HD;if(G.run)setRoute(e,G.run.at);}
  else if(type==='di'){const kk=o.k||pick(Object.keys(DI_K));const pool=ns.filter(n=>kk==='daugia'?n.type==='thanh':!['tran','thanh','ai','sao'].includes(n.type));if(!pool.length)return null;const a=pick(pool);e.at=a.id;e.data.k=kk;e.name=DI_K[kk].n;e.icon=DI_K[kk].i;e.speed=0;
    chronQuiet(`${DI_K[kk].n} ở ${a.name}.`);}
  if(e.at==null)return null;
  w.ents.push(e);return e;
}
function chronQuiet(t){if(G.run)pushNews(t,true);}
function removeEnt(e){const w=W();w.ents=w.ents.filter(x=>x!==e&&x.id!==e.id);}
function director(){
  const r=G.run;if(!r)return;const k=r.region;const L=entsHere(k);
  // kẻ truy sát từ hạt giống oán đã chín
  for(const s of r.seeds){if(s.t==='oan'&&!s.ent&&W().t-(s.at||0)>=30*HD&&chance(.25)){const e=spawnEnt('truysat',k,{name:s.ten,data:{seed:1}});if(e){s.ent=e.id;}}}
  const nem=W().nemesis;if(nem&&!nem.ent&&k>=Math.min(nem.r,3)&&r.kiep>nem.kiep&&chance(.2)){const e=spawnEnt('truysat',k,{name:nem.n,data:{nem:1}});if(e){e.icon=nem.i||'🗡️';nem.ent=e.id;}}
  if(L.length>=6)return;
  const cnt={};for(const e of L)cnt[e.type]=(cnt[e.type]||0)+1;
  const pool=Object.keys(ENT_T).filter(t=>ENT_T[t].w>0&&(cnt[t]||0)<3);
  let n=6-L.length;while(n-->0&&pool.length){const t=wpick(pool,x=>ENT_T[x].w);spawnEnt(t,k);}
}
function entsStep(h){
  const w=W(),r=G.run;if(!r)return;
  for(const e of entsHere(r.region).slice()){
    if(w.t>e.until){if(e.type==='truysat'&&e.data.nem&&w.nemesis)w.nemesis.ent=null;removeEnt(e);continue;}
    if(e.wait>0){e.wait=Math.max(0,e.wait-h);if(e.wait>0)continue;}
    if(!e.to){entIdle(e);continue;}
    const L=edgeLen(e.at,e.to)||1;e.prog+=e.speed*h/L;
    while(e.to&&e.prog>=1){e.prog-=1;e.at=e.to;e.route.shift();e.to=e.route[0]||null;if(!e.to){e.prog=0;entArrive(e);break;}}
  }
}
function entIdle(e){
  const r=G.run;
  if(e.type==='thuong'){const ts=townsOf(e.r).filter(x=>x.id!==e.at);if(ts.length)setRoute(e,pick(ts).id);}
  else if(e.type==='tuantra'){const nb=neighbors(e.data.home);setRoute(e,e.at===e.data.home?pick(nb):e.data.home);}
  else if(e.type==='thienkieu'){const di=W().ents.find(x=>x.r===e.r&&x.type==='di');setRoute(e,di&&di.at!==e.at?di.at:pick(regionOf(e.r).nodes).id);}
  else if(e.type==='truysat'&&r)setRoute(e,r.at);
}
function entArrive(e){
  const w=W();const n=nodeById(e.at);
  if(e.type==='thuong')e.wait=12;
  if(e.type==='thutrieu'&&e.at===e.data.tgt){
    if(n.state==='ok'){n.state='ruin';n.stateUntil=w.t+6*HM;chron(`Thú triều tràn qua ${n.name}. Nhà cửa đổ nát, người sống sót bỏ đi.`);}
    removeEnt(e);return;}
  if(e.type==='tuantra')e.wait=6;
  if(e.type==='thienkieu')e.wait=ri(6,24);
}
// gặp nhau: người chơi tới điểm có thực thể, hoặc đi ngược chiều trên cùng đoạn đường
function entMeetAt(id,from){
  const r=G.run;if(!r||r.scene)return false;
  for(const e of entsHere(r.region)){
    if(e.met===r.kiep+':'+Math.floor(W().t/HD))continue;
    const atNode=!e.to&&e.at===id||e.to&&e.prog<0.05&&e.at===id;
    const opp=from!=null&&e.at===id&&e.to===from;
    if(atNode||opp){meetEnt(e);return true;}
  }
  return false;
}
function meetEnt(e){
  const r=G.run;e.met=r.kiep+':'+Math.floor(W().t/HD);
  if(r.moving){const m=r.moving;r.moving=null;}
  let id=null;
  if(e.type==='di')id=DI_K[e.data.k].ev;
  else if(e.type==='truysat')id=e.data.nem?'no_kiep_truoc':(r.seeds.some(s=>s.t==='oan')?'bao_oan':null);
  else{const L=EVS.filter(x=>x.src==='ent:'+e.type&&whenOk(x)&&(!x.cond||x.cond(r))&&(!x.r||x.r.includes(r.region)));if(L.length)id=wpick(L,x=>(x.w||1)/(1+(r.evCount[x.id]||0))).id;}
  if(!id||!EVMAP[id]){return;}
  if(e.type==='thienkieu')r.metRival=e.data.rv;
  startEvent(id);r.scene.back=null;r.scene.v.eid=e.id;r.scene.v.en=e.name;
  if(e.type==='di'||e.type==='truysat'&&!e.data.nem)removeEnt(e);
  if(e.type==='truysat'&&e.data.nem){removeEnt(e);}
}
function teaEnt(){
  const r=G.run;const [x,y]=playerXY();const L=entsHere(r.region).filter(e=>{const p=entXY(e);return Math.hypot(p[0]-x,p[1]-y)>senseR();});
  if(!L.length)return null;const e=pick(L);const p=entXY(e);e.heard={x:Math.round(p[0]),y:Math.round(p[1]),t:W().t};
  const at=nodeById(e.at);hearOf(at);
  return T(['Có khách vừa tới kể: {$e} đang ở gần {$pl}.','Người ta xì xào về {$e}, thấy ở quanh {$pl}.'],{e:e.name,pl:at.name});
}
function entAfter(af,res,sc){endScene();}
// mọi lần advanceTime: thực thể di chuyển, đạo diễn, hạn chót, đồng đội tạm, tâm ma tự phát
function timeHooks(h){
  const r=G.run,w=W();if(!r)return;
  if(h<=48)entsStep(h);
  if(w.t-(w.dirT||0)>=HD){w.dirT=w.t;director();}
  for(const q of r.quests){if(q.state==='open'&&w.t>q.due){q.state='fail';r.karma=clamp(r.karma-4,-100,100);log(`Thất hứa: ${q.text}`);pushNews('Thất hứa, nhân quả giảm.',true);}}
  if(r.quests.length>12)r.quests=r.quests.filter(q=>q.state==='open').concat(r.quests.filter(q=>q.state!=='open').slice(-4));
  if(r.party&&r.party.length){const b=r.party.length;r.party=r.party.filter(p=>p.until>w.t&&p.hp>0);if(r.party.length<b)log('Một người đồng hành đã chia tay.');}
  // kẻ địch tự tìm tới khi đứng yên
  if(!r.scene&&!r.moving&&h<=48){const e=entsHere(r.region).find(e=>e.type==='truysat'&&!e.to&&e.at===r.at);if(e)meetEnt(e);}
}
function worldCoarseEnts(){const w=W();w.ents=w.ents.filter(e=>e.until>w.t);}

// ---------------- NHIỆM VỤ CÓ HẠN CHÓT ----------------
function openBoard(n){
  const r=G.run;const m=Math.floor(W().t/HM);
  if(!n.board||n.board.m!==m||n.board.kiep!==r.kiep){
    const L=[];const ns=regionOf(r.region).nodes.filter(x=>x.id!==n.id&&x.type!=='ai');
    for(let i=0;i<ri(2,3);i++){
      const tgt=pick(ns);const dist=pathLen(findPath(n.id,tgt.id)||[n.id]);const kind=tgt.danger>=1&&chance(.55)?'diet':'den';
      const days=Math.ceil(dist/walkSpeed()/24)+ri(3,8);
      const who=npc(chance(.5)?'thuong':'pham');
      const text=kind==='diet'?T(['Trừ yêu vật quấy nhiễu ở {$pl}','Diệt bọn cướp đóng ở {$pl}','Tìm và giết con hung thú ở {$pl}'],{pl:tgt.name}):T(['Đưa thư của {$a} tới {$pl}','Chuyển một hộp thuốc tới {$pl} giúp {$a}','Mang tin dữ về cho người nhà {$a} ở {$pl}'],{a:who.ten,pl:tgt.name});
      L.push({id:'q'+n.id+'_'+m+'_'+i,text,node:tgt.id,kind,days,reward:{st:Math.round((10+tgt.danger*8+days)*1),tv:kind==='diet'?6:3},taken:false});
    }
    n.board={m,kiep:r.kiep,list:L};
  }
  r.scene={type:'board',id:n.id,back:n.id};
}
function takeQuest(i){
  const r=G.run,sc=r.scene;const n=nodeById(sc.id);const q=n.board.list[+i];if(!q||q.taken)return;
  if(r.quests.filter(x=>x.state==='open').length>=3)return;
  q.taken=true;const tg=nodeById(q.node);hearOf(tg);
  r.quests.push({id:q.id,text:q.text,node:q.node,kind:q.kind,due:W().t+q.days*HD,reward:q.reward,state:'open',from:n.id});
  log(`Nhận việc: ${q.text} (hạn ${q.days} ngày).`);
}
function questArrive(id){
  const r=G.run;for(const q of r.quests){if(q.state!=='open'||q.node!==id)continue;
    if(q.kind==='den'){q.state='done';const ch=applyE({st:q.reward.st,tv:q.reward.tv,karma:2});log(`Xong việc: ${q.text}.`);pushNews('Xong việc: '+q.text,true);r.qdone=(r.qdone||[]).concat(ch).slice(-4);}
  }
}
function questExplore(n){
  const r=G.run;const q=r.quests.find(q=>q.state==='open'&&q.kind==='diet'&&q.node===n.id);if(!q)return false;
  encounter({type:n.danger>=3?'elite':'combat'});r.scene.quest=q.id;r.scene.text='Ngươi đã tìm ra mục tiêu của tờ cáo thị. '+r.scene.text;return true;
}
function questWin(qid){const r=G.run;const q=r.quests.find(x=>x.id===qid&&x.state==='open');if(!q)return [];q.state='done';log(`Xong việc: ${q.text}.`);return applyE({st:q.reward.st,tv:q.reward.tv,karma:2});}

// ---------------- MỘ, CHÔN ĐỒ, CỐ NHÂN ----------------
function visitGrave(n){
  const g=n.grave;startEvent('mo_kiep_truoc');const sc=G.run.scene;sc.v.g=g;sc.v.gnode=n.id;sc.story=[T(EVMAP.mo_kiep_truoc.t,sc.v)];
}
function graveTake(v){
  const r=G.run;const n=nodeById(v.gnode);const ch=[];if(!n||!n.grave)return ch;
  for(const it of n.grave.items||[]){r.relics.push(it);ch.push(chip('🏺',it.name,relicTip(it),'item'));log(`Đào được ${it.name} từ mộ cũ.`);}
  n.grave.items=[];n.grave.dug=1;clampHp();return ch;
}
function openBury(n){const r=G.run;if(n.cache||W().regions.reduce((a,R0)=>a+R0.nodes.filter(x=>x.cache).length,0)>=5){pmsg('Chỗ này không chôn thêm được nữa. Cả thế gian ngươi chỉ nhớ nổi năm hố.');return;}r.scene={type:'bury',id:n.id,back:n.id,sel:[]};}
function buryToggle(k){const sc=G.run.scene;const i=sc.sel.indexOf(k);if(i>=0)sc.sel.splice(i,1);else if(sc.sel.length<3)sc.sel.push(k);}
function buryItems(){
  const r=G.run,sc=r.scene;if(!sc.sel.length)return;const n=nodeById(sc.id);const items=[];
  const rel=sc.sel.filter(k=>k[0]==='r').map(k=>+k.slice(1)).sort((a,b)=>b-a),pil=sc.sel.filter(k=>k[0]==='p').map(k=>+k.slice(1)).sort((a,b)=>b-a);
  for(const i of rel){items.push({k:'relic',rel:r.relics[i]});r.relics.splice(i,1);}
  for(const i of pil){items.push({k:'pill',id:r.pills[i].id,q:r.pills[i].q});r.pills.splice(i,1);}
  n.cache={by:r.ten,t:W().t,items};clampHp();advanceTime(1);log(`Chôn ${items.length} món đồ ở ${n.name}.`);
  openPlace(n.id);G.run.scene.msg=['Ngươi đào một hố dưới gốc cây, đặt đồ vào, lấp đất, đánh dấu bằng ba hòn đá. Kiếp sau, nếu còn nhớ, hãy tìm về đây.'];
}
function findCache(n){
  const r=G.run;const c=n.cache;n.cache=null;const ch=[];
  for(const it of c.items){if(it.k==='relic'){r.relics.push(it.rel);ch.push(chip('🏺',it.rel.name,relicTip(it.rel),'item'));}else{const x=gainPill(it.id,it.q);if(x)ch.push(x);}}
  clampHp();log(`Đào được đồ ${c.by} chôn năm ${tYear(c.t)}.`);
  openPlace(n.id);const sc=r.scene;sc.msg=[c.by===r.ten?'Ngươi đào đúng chỗ đã chôn.':`Dưới ba hòn đá xếp chồng có một hố đất cũ. Bên trong là đồ của ${c.by}, chôn từ năm ${tYear(c.t)}. Ngươi biết chỗ này. Ngươi đã từng là người chôn nó.`];sc.chips=ch;
}

// ---------------- ĐỒNG ĐỘI TẠM THỜI ----------------
function addParty(v,days,pow){
  const r=G.run;r.party=r.party||[];if(r.party.length>=2)return null;
  const s=S();const p={id:(r.pid=(r.pid||0)+1),ten:v.ten,icon:v.g==='nu'?'👩':'🧑',hp:Math.round(s.maxHp*(pow||0.6)),pow:pow||0.6,until:W().t+(days||30)*HD,el:'vo'};
  r.party.push(p);log(`${v.ten} đi cùng ngươi ${days||30} ngày.`);return chip('🤝',v.ten+' đồng hành','Đi cùng và chiến đấu bên ngươi '+(days||30)+' ngày','up');
}

// ---------------- NỐI CÁC KIẾP ----------------
function rivalsCoarse(months){
  const w=W();for(const rv of w.rstate){if(!rv.alive)continue;const dy=months/12;rv.age=(rv.age||18)+dy;const wr=w.rivals[rv.i];
    let left=dy;while(left>0&&rv.realm<4){const step=Math.min(left,1);rv.prog+=step*wr.tal*[14,6,2.6,1.2,.5][rv.realm];left-=step;if(rv.prog>=100){rv.realm++;rv.prog=ri(0,15);}}
    if(rv.age>LIFE[rv.realm]*0.95||(rv.age>60&&rv.realm<1)){rv.alive=false;rv.died=tYear(w.t);}}
}
function newRival(i,from){
  const w=W();const s=w.sects[w.rivals[i].s];const g=s.kind==='phat'?'nam':(chance(.5)?'nam':'nu');
  const old=w.rivals[i];const ten=s.kind==='phat'?tangName():genName(g,true);
  const rel=from&&chance(.3)?(chance(.5)?'đệ tử của '+old.ten:'hậu duệ của '+old.ten):null;
  const tt={kiem:g==='nam'?'kiếm tử':'kiếm tiên tử',dan:g==='nam'?'đan tử':'đan tiên tử',phat:'phật tử',ma:g==='nam'?'ma tử':'yêu nữ',am:g==='nam'?'quỷ tử':'âm nữ',the:g==='nam'?'thiếu chủ':'đại tiểu thư',thu:g==='nam'?'thú vương tử':'linh thú tiên tử'}[s.kind]||(g==='nam'?'thánh tử':'thánh nữ');
  w.rivals[i]={ten,g,s:old.s,tt,el:pick(['kim','moc','thuy','hoa','tho','loi','bang','phong']),tinh:old.tinh,tal:rnd1(0.85+R()*0.55),rel};
  w.rstate[i]={i,realm:0,prog:ri(5,40),alive:true,age:ri(16,20)};
  if(rel)chron(`${ten}, ${rel}, bước vào hàng thiên kiêu.`);
}
function afterlife(r,cause,info){
  const w=W();
  // 2. mộ tại điểm đang đứng (chết trên đường: điểm vừa rời)
  let at=r.at;if(r.moving&&r.moving.seg<r.moving.path.length-1)at=r.moving.path[r.moving.seg];
  const n=nodeById(at);
  if(cause!=='phithang'&&n){const items=shuffle(r.relics.slice()).slice(0,2);n.grave={ten:r.ten,tuoi:Math.floor(r.age),realmName:qualName(r.realm,(r.quality||[])[r.realm]||0),t:w.t,items,r:n.r};
    const gs=[];for(const R0 of w.regions)for(const x of R0.nodes)if(x.grave)gs.push(x);gs.sort((a,b)=>a.grave.t-b.grave.t);while(gs.length>12){gs.shift().grave=null;}}
  // 3. sương mù thành ký ức (đã gọi fogToMemory)
  // 4. ân oán còn lại vào legacy
  for(const s of r.seeds)w.legacy.push({t:s.t,ten:s.ten,d:s.d,hn:s.hn,who:r.ten,r:s.r});
  while(w.legacy.length>20)w.legacy.shift();
  w.rstate=r.rivals.map(x=>({i:x.i,realm:x.realm,prog:x.prog,alive:x.alive,age:x.age||18,died:x.died}));
  // kẻ đã giết người chơi
  if(cause==='combat'&&info&&!info.boss&&info.k&&info.k!=='kiep'){const old=w.nemesis&&w.nemesis.n===info.n?w.nemesis.lv:0;w.nemesis={n:info.n,k:info.k,i:info.i,el:info.el,r:r.region,lv:old+1,kiep:r.kiep,who:r.ten};}
  // 5. năm tháng trôi qua
  const yrs=ri(3,30);G.lastGap=yrs;
  worldCoarse(yrs*12);rivalsCoarse(yrs*12);
  // 6. thế hệ
  for(let i=0;i<w.rstate.length;i++){if(!w.rstate[i].alive)newRival(i,true);}
  const keep=[];
  for(const L of w.legacy){
    if(L.done){continue;}
    if(L.t==='an'&&chance(.5)){const pool=[];for(const R0 of w.regions.slice(0,Math.max(1,(r.maxRegion||0)+1)))for(const x of R0.nodes)if(['tran','thanh','tong'].includes(x.type)&&!x.patron)pool.push(x);
      if(pool.length){const x=pick(pool);x.patron={ten:L.ten,who:L.who,d:L.d,role:x.type==='tong'?'trưởng lão':'chưởng quỹ'};continue;}}
    if(L.t==='oan'&&chance(.5)){L.feud=1;keep.push(L);continue;}
    if(L.t==='oan'&&!L.feud)continue;
    keep.push(L);
  }
  w.legacy=keep.slice(-20);
  if(w.chron.length>60)w.chron=w.chron.slice(-60);
}
// tin đồn về các kiếp trước
const RUMOR_KIEP=['Trà lâu vẫn kể chuyện {$a}, người năm {$y} từng {$v}. Có kẻ bảo người ấy chưa chết, chỉ đổi một cái tên.','Ở {$pl} có tấm bia khắc tên {$a}. Người qua đường vẫn dừng lại vái một vái.','“Thời {$a} còn sống ấy à…” Lão già lắc đầu. “Bây giờ không còn ai như thế nữa.”'];
function rumorKiep(){const L=G.meta.lives.filter(x=>x.hero);if(!L.length)return null;const x=pick(L);return T(RUMOR_KIEP,{a:x.ten,y:x.y||tYear(W().t)-20,v:x.hero,pl:placeName(pick(['nui','thanh','tran']))});}
function shopExtra(items,n){const r=G.run;if(n&&W().ents.some(e=>e.type==='di'&&e.data.k==='daugia'&&e.at===n.id)&&r.region<4)items.push({k:'pass',reg:r.region+1,n:'Lệnh bài thông quan '+REG[r.region+1].n,p:price(90)});}
