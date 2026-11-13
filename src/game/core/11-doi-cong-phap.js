// ---------------- ĐỔI CÔNG PHÁP ----------------
function swapSkill(i){
  const r=G.run,sc=r.scene;const id=sc.id;
  if(i>=0&&r.skills[i]){const old=SK[r.skills[i].id].n;r.skills[i]={id,lv:1};log(`Quên ${old}, lĩnh ngộ ${SK[id].n}.`);}
  r.pendingSkill=null;
  if(sc.back==='shop'){r.scene=sc.shop;return;}
  if(sc.back==='res'){r.scene=sc.res;return;}
  r.scene={type:'swap',back:typeof sc.back==='number'?sc.back:null};endScene();
}

// ---------------- NÂNG CẤP LUÂN HỒI ----------------
function buyUpg(id){const M=G.meta,u=UPG.find(x=>x.id===id);const lv=M.upg[id]||0;if(lv>=u.max)return;const c=u.c[lv];if(M.pts<c)return;M.pts-=c;M.upg[id]=lv+1;saveSoon();}

// ---------------- THẾ GIỚI SỐNG: THỰC THỂ ----------------
ENT_ON=true;HOURS_ON=true;SEASON_ON=true;QUEST_ON=true;CACHE_ON=true;GRAVE_ON=true;
const ENT_T={
  thuong:{n:'Thương đội',i:'🐫',sp:4,w:3,life:[20,40]},
  thutrieu:{n:'Thú triều',i:'🐾',sp:3,w:2,life:[10,20]},
  tuantra:{n:'Đệ tử tuần tra',i:'🥋',sp:6,w:2,life:[10,25]},
  thienkieu:{n:'Thiên kiêu',i:'🌟',sp:10,w:1,life:[8,20]},
  truysat:{n:'Kẻ truy sát',i:'🗡️',sp:7,w:0,life:[30,60]},
  di:{n:'Dị tượng',i:'✨',sp:0,w:2,life:[3,10]},
  khach:{n:'Khách qua đường',i:'🎒',sp:3,w:1,life:[10,25]},
};
// gặp thực thể hiền: chỉ có xác suất p, và cách lần gặp trước (cùng nhóm g) ít nhất cd ngày
const MEET_SOFT={thuong:{p:.25,cd:20,g:'td'},khach:{p:.3,cd:12,g:'kh'},tuantra:{p:.5,cd:8,g:'tt'}};
const KHACH_K=[['Lữ khách','🎒'],['Tiều phu','🪓'],['Thợ săn','🏹'],['Hành cước tăng','📿'],['Thư sinh lên kinh','📜'],['Tán tu','🧘'],['Gánh hát rong','🎭'],['Người hái thuốc','🌿']];
const DI_K={bicanh:{n:'Bí cảnh mở cửa',i:'🌀',ev:'bi_canh'},saoroi:{n:'Sao rơi',i:'☄️',ev:'sao_roi'},daugia:{n:'Hội đấu giá',i:'🏮',ev:'dau_gia'}};
function entsHere(k){return W().ents.filter(e=>e.r===k);}
function entXY(e){const a=nodeById(e.at);if(e.to==null)return [a.x,a.y];const b=nodeById(e.to);return [a.x+(b.x-a.x)*e.prog,a.y+(b.y-a.y)*e.prog];}
function townsOf(k){return regionOf(k).nodes.filter(n=>(n.type==='tran'||n.type==='thanh')&&n.state==='ok');}
function setRoute(e,dest){const p=findPath(e.at,dest);if(!p||p.length<2){e.route=[];e.to=null;return false;}e.route=p.slice(1);e.to=e.route[0];e.prog=0;e.dest=dest;return true;}
function spawnEnt(type,k,o){
  const w=W();o=o||{};const T0=ENT_T[type];const R0=regionOf(k);const ns=R0.nodes;
  if(entsHere(k).length>=12)return null;
  const e={id:(w.eid=(w.eid||0)+1),type,r:k,name:T0.n,icon:T0.i,at:null,to:null,prog:0,route:[],speed:T0.sp,until:w.t+ri(T0.life[0],T0.life[1])*HD,data:{},wait:0};
  if(type==='thuong'){const ts=townsOf(k);if(ts.length<2)return null;let a=pick(ts),b=pick(ts.filter(x=>x!==a));
    if(o.near!=null){const nb=neighbors(o.near);a=nodeById(pick(nb));const far=ns.filter(x=>x.id!==o.near&&x.id!==a.id&&x.type!=='ai');const p=pick(far);e.at=a.id;setRoute(e,o.near);e.route=e.route.concat((findPath(o.near,p.id)||[]).slice(1));e.dest=p.id;}
    else{e.at=a.id;setRoute(e,b.id);}e.name='Thương đội '+pick(NAME.ho);}
  else if(type==='thutrieu'){const src=ns.filter(n=>n.danger>=2&&!['ai','tran','thanh'].includes(n.type));if(!src.length)return null;const a=pick(src);e.at=a.id;
    const ts=townsOf(k).sort((x,y)=>Math.hypot(x.x-a.x,x.y-a.y)-Math.hypot(y.x-a.x,y.y-a.y));if(!ts.length)return null;setRoute(e,ts[0].id);e.data.tgt=ts[0].id;e.name='Thú triều từ '+a.name;if(e.route.length)e.until=w.t+pathLen([a.id].concat(e.route))/e.speed+5*HD;}
  else if(type==='tuantra'){const ss=ns.filter(n=>n.type==='tong');const base=ss.length?pick(ss):pick(townsOf(k).length?townsOf(k):ns);e.at=base.id;e.data.home=base.id;const nb=neighbors(base.id);setRoute(e,pick(nb));e.name='Đệ tử '+(base.owner||pick(w.sects).n);}
  else if(type==='thienkieu'){const al=(G.run?G.run.rivals:w.rstate||[]).filter(x=>x.alive);if(!al.length)return null;const rv=o.rv!=null?o.rv:pick(al).i;if(w.ents.some(x=>x.type==='thienkieu'&&x.data.rv===rv))return null;e.data.rv=rv;e.name=w.rivals[rv].ten;
    const di=w.ents.find(x=>x.r===k&&x.type==='di');const a=pick(ns.filter(n=>n.type!=='ai'));e.at=a.id;setRoute(e,di?di.at:pick(ns).id);}
  else if(type==='truysat'){const a=o.at!=null?o.at:pick(ns.filter(n=>n.id!==(G.run&&G.run.at))).id;e.at=a;e.data=o.data||{};e.name=o.name||'Kẻ truy sát';e.until=w.t+60*HD;if(G.run)setRoute(e,G.run.at);}
  else if(type==='khach'){const pool=ns.filter(n=>n.type!=='ai');let a=pick(pool),dst=pick(pool.filter(x=>x!==a));
    if(o.near!=null){a=nodeById(pick(neighbors(o.near)));e.at=a.id;setRoute(e,o.near);e.route=e.route.concat((findPath(o.near,dst.id)||[]).slice(1));e.dest=dst.id;}
    else{e.at=a.id;setRoute(e,dst.id);}
    const kk=pick(KHACH_K);e.data.k=kk[0];e.name=kk[0]+' họ '+pick(NAME.ho);e.icon=kk[1];}
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
  // quanh người chơi trống trải: cho một đoàn người đi ngang qua
  {const me=nodeById(r.at);if(!L.some(e=>{const p=entXY(e);return Math.hypot(p[0]-me.x,p[1]-me.y)<=senseR();})&&L.length<12&&chance(.12))spawnEnt(chance(.5)?'thuong':'khach',k,{near:r.at});}
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
    if(e.to==null){entIdle(e);continue;}
    const L=edgeLen(e.at,e.to)||1;e.prog+=e.speed*h/L;
    while(e.to!=null&&e.prog>=1){e.prog-=1;e.at=e.to;e.route.shift();e.to=e.route.length?e.route[0]:null;if(e.to==null){e.prog=0;entArrive(e);break;}}
  }
}
function entIdle(e){
  const r=G.run;
  if(e.type==='thuong'){const ts=townsOf(e.r).filter(x=>x.id!==e.at);if(ts.length)setRoute(e,pick(ts).id);}
  else if(e.type==='tuantra'){const nb=neighbors(e.data.home);setRoute(e,e.at===e.data.home?pick(nb):e.data.home);}
  else if(e.type==='thienkieu'){const di=W().ents.find(x=>x.r===e.r&&x.type==='di');setRoute(e,di&&di.at!==e.at?di.at:pick(regionOf(e.r).nodes).id);}
  else if(e.type==='truysat'&&r)setRoute(e,r.at);
  else if(e.type==='khach'){const ns=regionOf(e.r).nodes.filter(x=>x.id!==e.at&&x.type!=='ai');if(ns.length)setRoute(e,pick(ns).id);}
}
function entArrive(e){
  const w=W();const n=nodeById(e.at);
  if(e.type==='thuong')e.wait=12;
  if(e.type==='thutrieu'&&e.at===e.data.tgt){
    if(n.state==='ok'){n.state='ruin';n.stateUntil=w.t+ri(2,4)*HY;chron(`Thú triều tràn qua ${n.name}. Nhà cửa đổ nát, người sống sót bỏ đi.`);}
    removeEnt(e);return;}
  if(e.type==='tuantra')e.wait=6;
  if(e.type==='khach')e.wait=ri(4,16);
  if(e.type==='thienkieu')e.wait=ri(6,24);
}
// gặp nhau: người chơi tới điểm có thực thể, hoặc đi ngược chiều trên cùng đoạn đường
function entMeetAt(id,from){
  const r=G.run;if(!r||r.scene)return false;
  for(const e of entsHere(r.region)){
    if(e.met===r.kiep+':'+Math.floor(W().t/HD))continue;
    const atNode=e.to==null&&e.at===id||e.to!=null&&e.prog<0.05&&e.at===id;
    const opp=from!=null&&e.at===id&&e.to===from;
    if(atNode||opp){
      // thương đội và khách qua đường: không phải lần nào đi ngang cũng dừng lại nói chuyện
      const soft=MEET_SOFT[e.type];
      if(soft){const day=Math.floor(W().t/HD);e.met=r.kiep+':'+day;const last=(r.meetT||{})[soft.g];
        if(last!=null&&W().t-last<soft.cd*HD||!chance(soft.p))continue;
        (r.meetT||(r.meetT={}))[soft.g]=W().t;}
      meetEnt(e);return true;}
  }
  return false;
}
function meetEnt(e){
  const r=G.run;e.met=r.kiep+':'+Math.floor(W().t/HD);
  if(r.moving){const m=r.moving;r.moving=null;}
  let id=null;
  if(e.type==='di'&&chance(.6))id=DI_K[e.data.k].ev;
  else if(e.type==='truysat'&&e.data.nem)id='no_kiep_truoc';
  if(!id){const L=EVS.filter(x=>x.src==='ent:'+e.type&&(e.type!=='di'||!x.dk||x.dk===e.data.k)&&(e.type!=='truysat'||x.id!=='no_kiep_truoc')&&whenOk(x)&&(!x.cond||x.cond(r))&&(!x.r||x.r.includes(r.region)));if(L.length)id=wpick(L,x=>(x.w||1)/(1+(r.evCount[x.id]||0))).id;}
  if(!id||!EVMAP[id]){return;}
  if(e.type==='thienkieu')r.metRival=e.data.rv;
  startEvent(id,{eid:e.id,en:e.name});r.scene.back=null;
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
  for(const q of r.quests){if(q.state==='open'&&w.t>q.due){q.state='fail';r.karma=clamp(r.karma-4,-100,100);log(`Thất hứa: ${q.text}`);note('Thất hứa: '+q.text+'. Nhân quả giảm.','dn');}}
  if(r.quests.length>12)r.quests=r.quests.filter(q=>q.state==='open').concat(r.quests.filter(q=>q.state!=='open').slice(-4));
  if(r.party&&r.party.length){const b=r.party.length;r.party=r.party.filter(p=>p.until>w.t&&p.hp>0);if(r.party.length<b)log('Một người đồng hành đã chia tay.');}
  // kẻ địch tự tìm tới khi đứng yên
  if(!r.scene&&!r.moving&&h<=48){const e=entsHere(r.region).find(e=>e.type==='truysat'&&e.to==null&&e.at===r.at);if(e)meetEnt(e);}
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
      hearOf(tgt);
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
  for(const it of n.grave.items||[]){r.relics.push(it);ch.push(chip('🏺',it.name,relicTip(it),'item',it.tier));log(`Đào được ${it.name} từ mộ cũ.`);}
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
  for(const it of c.items){if(it.k==='relic'){r.relics.push(it.rel);ch.push(chip('🏺',it.rel.name,relicTip(it.rel),'item',it.rel.tier));}else{const x=gainPill(it.id,it.q);if(x)ch.push(x);}}
  clampHp();log(`Đào được đồ ${c.by} chôn năm ${tYear(c.t)}.`);
  openPlace(n.id);const sc=r.scene;sc.msg=[c.by===r.ten?'Ngươi đào đúng chỗ đã chôn.':`Dưới ba hòn đá xếp chồng có một hố đất cũ. Bên trong là đồ của ${c.by}, chôn từ năm ${tYear(c.t)}. Ngươi biết chỗ này. Ngươi đã từng là người chôn nó.`];sc.chips=ch;
}
