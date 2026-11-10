// ---------------- THỜI GIAN ----------------
// Đơn vị gốc: giờ game, lưu ở G.meta.world.t. Mọi thay đổi thời gian đi qua advanceTime(h).
const HD=24, HM=720, HY=8640;
const MONTH=['Giêng','Hai','Ba','Tư','Năm','Sáu','Bảy','Tám','Chín','Mười','Mười Một','Chạp'];
const CHI=['Tý','Sửu','Dần','Mão','Thìn','Tỵ','Ngọ','Mùi','Thân','Dậu','Tuất','Hợi'];
const PART={sang:{n:'sáng',i:'🌅'},chieu:{n:'chiều',i:'☀️'},toi:{n:'tối',i:'🌇'},dem:{n:'đêm',i:'🌙'}};
const SEASON={xuan:'xuân',ha:'hạ',thu:'thu',dong:'đông'};
function W(){return G.meta.world;}
function tYear(t){return 1000+Math.floor(t/HY);}
function tMonth(t){return Math.floor((t%HY)/HM);}
function tHour(t){return t%HD;}
function partOf(t){const h=tHour(t);return h>=5&&h<11?'sang':h>=11&&h<17?'chieu':h>=17&&h<21?'toi':'dem';}
function seasonOf(t){const m=tMonth(t)+1;return m<=3?'xuan':m<=6?'ha':m<=9?'thu':'dong';}
function gioName(t){return CHI[Math.floor(((Math.floor(tHour(t))+1)%24)/2)];}
function dateText(t){return `Năm ${tYear(t)}, tháng ${MONTH[tMonth(t)]}, giờ ${gioName(t)}`;}
function durH(h){if(h<24)return Math.max(1,Math.round(h))+' giờ';if(h<HM)return Math.round(h/24)+' ngày';if(h<HY)return Math.round(h/HM)+' tháng';return (Math.round(h/HY*10)/10).toString().replace('.',',')+' năm';}
let TICK_OUT=null; // gom "chuyện xảy ra trong lúc đó"
function advanceTime(h){
  const w=W(),out=[];
  if(!(h>0))return out;
  const outer=TICK_OUT;TICK_OUT=out;
  try{
    if(h<=48){w.t+=h;worldStep(h);}
    else{
      const fine=Math.min(h,30*HD);
      for(let d=0;d<fine-1e-9;d+=HD){const s=Math.min(HD,fine-d);w.t+=s;worldStep(s);if(!G.run&&G.screen==='over')break;}
      let rest=h-fine;const m=Math.floor(rest/HM);
      if(m>0)worldCoarse(m);
      rest-=m*HM;if(rest>0){w.t+=rest;worldStep(Math.min(rest,HD));}
    }
    while(tYear(w.t)>=w.bangY){w.bangY+=10;if(G.run)publishBang();}
    const r=G.run;
    if(r){
      r.age=r.birthAge+(w.t-r.bornT)/HY;
      if(r.age>=S().life&&!(r.scene&&r.scene.type==='combat')){die('toahoa');}
    }
    if(G.run&&typeof timeHooks==='function')timeHooks(h);
  }finally{TICK_OUT=outer;if(outer)outer.push(...out);}
  return out;
}
function worldStep(h){
  const r=G.run;
  if(r){
    worldTick(h/HY);
    if(!(r.scene&&r.scene.type==='combat')){
      const s=S();r.rgH=(r.rgH||0)+s.maxHp*0.005*h;r.rgM=(r.rgM||0)+s.maxMp*0.02*h;
      const a=Math.floor(r.rgH),b=Math.floor(r.rgM);r.rgH-=a;r.rgM-=b;
      r.hp=Math.min(s.maxHp,r.hp+a);r.mp=Math.min(s.maxMp,r.mp+b);
    }
  }
  nodeRecover();
}
function worldCoarse(m){
  const w=W();
  for(let i=0;i<m;i++){
    w.t+=HM;
    if(G.run)worldTick(HM/HY);
    if(chance(.08))flipNode();
    nodeRecover();
  }
}
function nodeRecover(){
  const w=W();
  for(const R0 of w.regions)for(const n of R0.nodes){if(n.state==='ruin'&&w.t>=n.stateUntil){n.state='ok';n.stateUntil=0;}}
}
function flipNode(){
  const w=W();const r=G.run;
  const pool=[];for(const R0 of w.regions)for(const n of R0.nodes)if(['tran','thanh','tong'].includes(n.type)&&(!r||n.id!==r.at))pool.push(n);
  if(!pool.length)return;const n=pick(pool);
  if(n.state==='ruin'){n.state='ok';n.stateUntil=0;chron(`${n.name} dần hồi sinh, khói bếp lại bốc lên.`);}
  else if(n.type==='tong'){const s=pick(w.sects);n.owner=s.n;chron(`Sơn môn ở ${n.name} đổi chủ, nay thuộc ${s.n}.`);}
  else {n.state='ruin';n.stateUntil=w.t+6*HM;chron(`${n.name} gặp nạn, thành hoang tàn.`);}
}
function chron(t){const w=W();w.chron.push({y:tYear(w.t),t});if(w.chron.length>60)w.chron.shift();if(TICK_OUT)TICK_OUT.push(t);if(G.run)pushNews(t,true);}

// ---------------- BẢN ĐỒ ----------------
const SENSE=[120,200,320,500,800,800];
const WALK=[8,20,60,200,800,800];
const CROSS_M=[0,1,2,4,6];
const WILD=['rung','nui','song','bien','hoang'];
TYPE_NAME.ai='quan ải';TYPE_NAME.sao='sào huyệt';
PLACE.sfx.ai=['Quan','Ải','Quan Ải','Quan'];PLACE.sfx.sao=['Sào Huyệt','Trại','Hang Ổ','Ma Quật'];
const NODE_IC={tran:'🏘️',thanh:'🏯',rung:'🌲',nui:'⛰️',song:'🌊',phe:'🏚️',dong:'🕳️',tong:'⛩️',bien:'🐚',hoang:'🏜️',ma:'💀',thien:'☁️',ai:'🚧',sao:'☠️'};
const DANGER=['Yên bình','Có nguy','Hiểm địa','Tử địa'];
function genRegion(k,w){
  const reg=REG[k],X0=k*1000;
  const pts=[{x:ri(60,170),y:ri(400,600)}];
  if(k<4)pts.push({x:ri(870,950),y:ri(320,680)});
  const N=ri(14,18);let g=0;
  while(pts.length<N&&g++<5000){const p={x:ri(40,960),y:ri(40,960)};if(pts.every(q=>Math.hypot(q.x-p.x,q.y-p.y)>=110))pts.push(p);}
  const nodes=pts.map((p,i)=>({id:k*100+i,r:k,x:X0+p.x,y:p.y,type:null,name:'',danger:0,fog:0,seenT:-1,memory:false,state:'ok',stateUntil:0,explore:0,exploreT:-1,grave:null,cache:null,patron:null,dp:0}));
  // cạnh: cây khung nhỏ nhất (Prim), rồi thêm 1–2 cạnh gần nhất cho mỗi điểm
  const d=(a,b)=>Math.round(Math.hypot(a.x-b.x,a.y-b.y));
  const edges=[];const has=(a,b)=>edges.some(e=>(e.a===a&&e.b===b)||(e.a===b&&e.b===a));
  const inT=new Set([0]);
  while(inT.size<nodes.length){let best=null;for(const i of inT)for(let j=0;j<nodes.length;j++){if(inT.has(j))continue;const L=d(nodes[i],nodes[j]);if(!best||L<best[2])best=[i,j,L];}inT.add(best[1]);edges.push({a:nodes[best[0]].id,b:nodes[best[1]].id,len:best[2]});}
  for(let i=0;i<nodes.length;i++){const near=nodes.map((n,j)=>[j,d(nodes[i],n)]).filter(x=>x[0]!==i).sort((a,b)=>a[1]-b[1]);const want=ri(1,2);let c=0;for(const [j,L] of near){if(c>=want)break;if(L>380)break;if(!has(nodes[i].id,nodes[j].id))edges.push({a:nodes[i].id,b:nodes[j].id,len:L});c++;}}
  // khoảng cách đường đi từ điểm vào
  const dist=dijkstraAll(nodes,edges,nodes[0].id);
  const dmax=Math.max(...Object.values(dist));
  // gán loại: điểm vào, quan ải, sào huyệt (xa nhất), thành lớn, 2 động phủ, còn lại ngẫu nhiên
  const free=nodes.map((n,i)=>i).filter(i=>i>(k<4?1:0));
  const take=(fn)=>{free.sort(fn);return free.shift();};
  nodes[0].type=k===0?'tran':(reg.types.includes('thanh')?'thanh':'tran');
  if(k<4){nodes[1].type='ai';}
  const sao=take((a,b)=>dist[nodes[b].id]-dist[nodes[a].id]);nodes[sao].type='sao';
  if(nodes[0].type!=='thanh'){const c=take(()=>R()-.5);nodes[c].type='thanh';}
  const caveT=reg.types.includes('dong')?'dong':'nui';
  for(let q=0;q<2;q++){const c=take(()=>R()-.5);nodes[c].type=q===0?caveT:pick(['nui','dong','rung'].filter(x=>reg.types.includes(x)).concat([caveT]));nodes[c].dp=1;}
  if(k===0){for(let q=0;q<2;q++){const c=take(()=>R()-.5);nodes[c].type='tran';}}
  for(const i of free){nodes[i].type=pick(reg.types);}
  for(const n of nodes){
    if(n.type==='dong')n.dp=1;
    const dd=dist[n.id]/Math.max(1,dmax);
    n.danger=n.id===nodes[0].id?0:clamp(Math.floor(dd*4),0,3);
    if(n.type==='sao')n.danger=3;if(n.type==='ai')n.danger=Math.max(2,n.danger);
    if(n.type==='tong'){const s=pick(w.sects);n.name=s.n;n.owner=s.n;}
    else n.name=placeName(n.type);
  }
  // không trùng tên trong vùng
  const seen=new Set();for(const n of nodes){let g2=0;while(seen.has(n.name)&&g2++<8)n.name=n.type==='tong'?n.name+' Biệt Viện':placeName(n.type);seen.add(n.name);}
  // địa hình nền
  const terr=[];for(let i=0;i<ri(4,7);i++)terr.push({k:'m',x:X0+ri(60,940),y:ri(60,940),s:ri(40,90)});
  const rv=[];let x=X0+ri(100,900),y=0;rv.push([x,y]);while(y<1000){y+=ri(80,160);x=clamp(x+ri(-120,120),X0+30,X0+970);rv.push([x,Math.min(1000,y)]);}
  terr.push({k:'r',p:rv});
  return {k,nodes,edges,entry:nodes[0].id,pass:k<4?nodes[1].id:null,lair:nodes[sao].id,terr};
}
function dijkstraAll(nodes,edges,src){
  const D={};for(const n of nodes)D[n.id]=Infinity;D[src]=0;const done=new Set();
  while(done.size<nodes.length){let u=null;for(const n of nodes)if(!done.has(n.id)&&(u===null||D[n.id]<D[u]))u=n.id;if(u===null||D[u]===Infinity)break;done.add(u);
    for(const e of edges){if(e.a!==u&&e.b!==u)continue;const v=e.a===u?e.b:e.a;if(D[u]+e.len<D[v])D[v]=D[u]+e.len;}}
  return D;
}
function nodeById(id){const w=W();const R0=w.regions[Math.floor(id/100)];return R0&&R0.nodes[id%100];}
function regionOf(k){return W().regions[k];}
function curNode(){return G.run?nodeById(G.run.at):null;}
function curDanger(){const n=curNode();return n?n.danger:0;}
function edgeLen(a,b){const R0=regionOf(Math.floor(a/100));const e=R0.edges.find(e=>(e.a===a&&e.b===b)||(e.a===b&&e.b===a));return e?e.len:Math.round(Math.hypot(nodeById(a).x-nodeById(b).x,nodeById(a).y-nodeById(b).y));}
function neighbors(id){const R0=regionOf(Math.floor(id/100));return R0.edges.filter(e=>e.a===id||e.b===id).map(e=>e.a===id?e.b:e.a);}
function findPath(from,to){
  const R0=regionOf(Math.floor(from/100));if(Math.floor(to/100)!==R0.k)return null;
  const D={},P={};for(const n of R0.nodes)D[n.id]=Infinity;D[from]=0;const done=new Set();
  while(true){let u=null;for(const n of R0.nodes)if(!done.has(n.id)&&D[n.id]<Infinity&&(u===null||D[n.id]<D[u]))u=n.id;if(u===null)break;if(u===to)break;done.add(u);
    for(const v of neighbors(u)){const L=D[u]+edgeLen(u,v);if(L<D[v]){D[v]=L;P[v]=u;}}}
  if(D[to]===Infinity)return null;const p=[to];while(p[0]!==from)p.unshift(P[p[0]]);return p;
}
function pathLen(p){let s=0;for(let i=0;i+1<p.length;i++)s+=edgeLen(p[i],p[i+1]);return s;}
function walkSpeed(){let v=WALK[G.run.realm];if(SEASON_ON&&seasonOf(W().t)==='dong')v*=0.8;return v;}
let SEASON_ON=false;
function travelHours(p){return pathLen(p)/walkSpeed();}
function playerXY(){
  const r=G.run;const m=r.moving;const a=nodeById(r.at);
  if(!m||m.seg>=m.path.length-1)return [a.x,a.y];
  const p=nodeById(m.path[m.seg]),q=nodeById(m.path[m.seg+1]);
  return [p.x+(q.x-p.x)*m.prog,p.y+(q.y-p.y)*m.prog];
}
function senseR(){return SENSE[G.run.realm];}
function addReveal(x,y,R0){const L=G.run.reveal;if(L.some(c=>Math.hypot(c[0]-x,c[1]-y)<30&&c[2]>=R0))return false;L.push([Math.round(x),Math.round(y),R0]);if(L.length>300)L.shift();return true;}
function sense(){
  const r=G.run,w=W();const [x,y]=playerXY();const R0=senseR();let ch=false;
  for(const n of regionOf(r.region).nodes){if(Math.hypot(n.x-x,n.y-y)<=R0){if(n.fog<2){n.fog=2;ch=true;}if(n.memory){n.memory=false;ch=true;}n.seenT=w.t;n.vstate=n.state;}}
  if(addReveal(x,y,R0))ch=true;
  return ch;
}
function arrive(id){
  const r=G.run,n=nodeById(id);r.at=id;r.place={n:n.name,t:n.type};
  n.fog=3;n.memory=false;n.seenT=W().t;n.vstate=n.state;sense();
}
function travelTo(id){
  const r=G.run;if(!r||r.scene)return false;
  const n=nodeById(id);if(!n||n.fog<1)return false;
  // đang giữa đường: đi tiếp về điểm kế rồi tìm đường từ đó
  const m=r.moving;let start=r.at,head=[];
  if(m&&m.seg<m.path.length-1){const a=m.path[m.seg],b=m.path[m.seg+1];if(id===a){r.moving={path:[b,a],seg:0,prog:1-m.prog};r.at=b;return true;}start=b;head=[a];if(id===b){r.moving={path:[a,b],seg:0,prog:m.prog};return true;}}
  if(id===start&&!head.length)return false;
  const p=findPath(start,id);if(!p)return false;
  r.moving={path:head.concat(p),seg:0,prog:head.length?m.prog:0};
  return true;
}
function stopTravel(){const r=G.run;if(!r||!r.moving)return;const m=r.moving;if(m.seg<m.path.length-1){const a=m.path[m.seg],b=m.path[m.seg+1];r.moving=m.prog>0.001?{path:[a,b],seg:0,prog:m.prog}:null;if(!r.moving)arrive(a);}else r.moving=null;}
// đi một khoảng h giờ trên đường; trả về true nếu bản đồ cần vẽ lại
function travelTick(h){
  const r=G.run;let ch=false;
  while(G.run&&r.moving&&h>1e-9&&!r.scene){
    const m=r.moving;if(m.seg>=m.path.length-1){r.moving=null;break;}
    const a=m.path[m.seg],b=m.path[m.seg+1];const segH=edgeLen(a,b)/walkSpeed();
    const dt=Math.min(h,(1-m.prog)*segH);
    advanceTime(dt);if(!G.run)return true;
    h-=dt;m.prog+=dt/segH;
    if(sense())ch=true;
    if(m.prog>=1-1e-9){
      m.seg++;m.prog=0;arrive(b);ch=true;
      if(m.seg>=m.path.length-1)r.moving=null;
      roadRoll(a,b);
      if(G.run&&!r.scene)autoCheck();
    }
  }
  return ch;
}
function roadRoll(a,b){
  const r=G.run;const dg=Math.max(nodeById(a).danger,nodeById(b).danger);
  let p=0.08+0.06*dg;if(partOf(W().t)==='dem')p*=1.5;
  if(!chance(p))return;
  r.place={n:'đường tới '+nodeById(b).name,t:nodeById(b).type};
  if(chance(.55)){const id=pickEvent(nodeById(b).type,'road');if(id){startEvent(id);r.scene.back=null;r.scene.road=1;return;}}
  encounter({type:dg>=3&&chance(.3)?'elite':'combat'});r.scene.back=null;
}
// sau mỗi hành động: tâm ma, kỹ năng chờ đổi
function autoCheck(){
  const r=G.run;if(!r||r.scene)return;
  if(r.pendingSkill){r.scene={type:'swap',id:r.pendingSkill,back:r.lastBack!=null?r.lastBack:null};return;}
  if(r.tamma>=100){forceTamma();return;}
}
// nghe đồn về một điểm: nâng từ 0 lên 1, vị trí lệch tới 40, mức nguy hiểm 30% sai
function hearOf(n){if(n.fog>=1)return false;n.fog=1;n.rx=n.x+ri(-40,40);n.ry=n.y+ri(-40,40);n.rd=chance(.3)?clamp(n.danger+(chance(.5)?1:-1),0,3):n.danger;return true;}
function nodeShown(n){return n.fog>=2||n.memory?[n.x,n.y]:[n.rx!=null?n.rx:n.x,n.ry!=null?n.ry:n.y];}
function nodeDanger(n){return n.fog>=2?n.danger:(n.memory?n.danger:(n.rd!=null?n.rd:n.danger));}

// ---------------- ĐỊA ĐIỂM ----------------
const BQ_Y=[4,7,11,16,24,30]; // số năm bế quan cho 100% tu vi theo cảnh giới
function openPlace(id){const r=G.run;const n=nodeById(id==null?r.at:id);r.place={n:n.name,t:n.type};r.scene={type:'place',id:n.id,msg:[],chips:[],intro:placeIntro(n)};}
function placeIntro(n){
  const t=W().t;let s=T('{canh_'+(P['canh_'+n.type]?n.type:(n.type==='ai'?'nui':n.type==='sao'?'phe':'tran'))+'}');
  const pp=P['buoi_'+partOf(t)],ss=P['mua_'+seasonOf(t)];
  if(pp&&pp.length)s+=' '+T(pp);if(SEASON_ON&&ss&&ss.length&&chance(.5))s+=' '+T(ss);
  if(n.state==='ruin')s+=' '+T(['Nhà cửa đổ nát, xác thú và tro tàn còn ngổn ngang. Chẳng còn ai buôn bán gì.','Nơi này đã thành hoang tàn. Vài người sống sót ngồi thẫn thờ bên đống gạch vỡ.']);
  return s;
}
function svcOpen(k){if(!HOURS_ON)return true;const h=tHour(W().t);const H={shop:[5,21],tea:[7,23],ghost:[21,5]}[k];if(!H)return true;return H[0]<H[1]?(h>=H[0]&&h<H[1]):(h>=H[0]||h<H[1]);}
let HOURS_ON=false;
function placeActs(n){
  const r=G.run,t=n.type,ruin=n.state==='ruin',L=[];
  const add=(a,i,l,h,tip,dis,x)=>L.push({a,i,l,h,tip,dis:!!dis,x});
  if(t==='ai'){add('cross','🚧','Vượt ải',0,'Sang vùng đất kế tiếp');return L;}
  if(t==='sao'){const done=r.bossDone[r.region];add('boss','☠️',done?'Sào huyệt đã trống':'Khiêu chiến thủ lĩnh',1,'Thủ lĩnh của vùng này. Hạ được thì có lệnh bài thông quan.',done);add('explore','🔍','Thăm dò',2,'Lục soát quanh sào huyệt. Rất nguy hiểm.');return L;}
  add('explore','🔍','Thăm dò',2,'Tìm cơ duyên, gặp chuyện.'+(n.danger>=2?'\nNơi nguy hiểm, dễ gặp kẻ địch.':''));
  if((t==='tran'||t==='thanh')&&!ruin){
    add('inn','🛏️','Nghỉ ở khách điếm',8,'Hồi đầy khí huyết và linh lực',r.st<price(4),'💎'+price(4));
    add('tea','🍵','Nghe tin ở trà lâu',1,'Nghe ngóng tin tức quanh vùng'+(svcOpen('tea')?'':'\nTrà lâu mở từ giờ Mão tới giờ Tý'),!svcOpen('tea'));
    if(QUEST_ON)add('board','📜','Bảng treo thưởng',0,'Nhận việc có hạn chót');
  }
  if(t==='thanh'&&!ruin)add('shop','🏪','Phường thị',1,'Mua đan dược, bí tịch, pháp bảo'+(svcOpen('shop')?'':'\nChợ chỉ họp từ giờ Mão tới giờ Hợi'),!svcOpen('shop'));
  if(HOURS_ON&&(t==='thanh'||t==='ma')&&!ruin)add('ghost','🏮','Quỷ thị',1,'Chợ đêm của kẻ không dám ra ánh sáng.\nChỉ họp từ giờ Hợi tới giờ Dần',!svcOpen('ghost'));
  if(t==='tong'){if(!r.flags.tongmon)add('join','⛩️','Xin bái nhập',2,'Sơn môn tuyển đồ');else add('lib','📚','Tàng Kinh Các',2,'Đệ tử được vào đọc kinh thư');}
  if(WILD.includes(t)||n.dp||t==='tong')add('tinh','🧘','Tĩnh tọa',6,'Hồi 45% khí huyết, đầy linh lực');
  if(n.dp){
    const s=S(),bqm=1+(s.fx.bqP||0)/100;
    add('heal','🩹','Dưỡng thương',HM,'Hồi đầy, giảm tâm ma');
    add('bq1','📿','Bế quan ngắn',3*HM,'Tu vi tăng, hồi đầy',false,'✨+'+Math.round(bqGain(0.25)*bqm)+'%');
    add('bq3','⛰️','Bế quan dài',2*HY,'Tu vi tăng nhiều, có thể bị quấy nhiễu',false,'✨+'+Math.round(bqGain(2)*bqm)+'%');
    if(r.tv>=100&&r.realm<4)add('bt','🌕','Đột phá '+REALM[r.realm+1],HM,'Cần ở động phủ, tu vi viên mãn.\nThất bại: trọng thương, mất tu vi',false,'🌕'+Math.round(btChance()*100)+'%');
    add('quyan','🍃','Gác kiếm quy ẩn',0,'Kết thúc kiếp này trong yên bình');
  }
  if(CACHE_ON&&WILD.concat(['phe','dong','ma','thien']).includes(t))add('bury','⚱️','Chôn đồ',1,'Chôn vật phẩm cho kiếp sau');
  if(n.grave&&GRAVE_ON)add('grave','🪦','Viếng mộ',1,'Một nấm mộ quen');
  if(n.patron&&GRAVE_ON)add('patron','🤝','Tìm cố nhân',1,'Người cũ của kiếp trước');
  return L;
}
let QUEST_ON=false,CACHE_ON=false,GRAVE_ON=false;
function bqGain(y){const r=G.run;return tvGain(100*y/BQ_Y[r.realm])*(y<1?0.9:1);}
function pmsg(t){const sc=G.run.scene;if(sc&&sc.type==='place')sc.msg=[t];}
function placeAct(a){
  const r=G.run,sc=r.scene;if(!sc||sc.type!=='place')return;
  const n=nodeById(sc.id),s=S();let ch=[];sc.msg=[];sc.chips=[];
  const act=placeActs(n).find(x=>x.a===a);if(!act||act.dis)return;
  const tick=(h)=>{const o=advanceTime(h);if(!G.run)return false;if(h>48&&o.length)sc.msg.push('Trong lúc ấy: '+o.slice(-2).join(' '));return true;};
  switch(a){
    case 'explore':{
      if(!tick(2))return;
      const m=Math.floor(W().t/HM);if(n.exploreT!==m){n.exploreT=m;n.explore=0;}n.explore++;
      if(n.explore>=4){sc.msg.unshift(T(['Ngươi đi một vòng nữa. Không còn gì mới.','Chỗ này ngươi đã lục tung cả rồi. Không còn gì mới.','Mọi ngóc ngách đều đã quen mặt. Không còn gì mới.']));sc.chips=[chip('⏳','2 giờ','Thời gian trôi qua','')];return;}
      if(CACHE_ON&&n.cache&&n.cache.items&&n.cache.items.length){findCache(n);return;}
      const fp=[0.04,0.14,0.26,0.4][n.danger]+(['phe','ma'].includes(n.type)?0.08:0)+(n.type==='sao'?0.3:0);
      if(chance(fp)){encounter({type:n.danger>=3&&chance(.35)?'elite':'combat'});return;}
      const id=pickEvent(n.type,'explore');startEvent(id);return;}
    case 'inn':{r.st-=price(4);if(!tick(8))return;const s1=S();r.hp=s1.maxHp;r.mp=s1.maxMp;ch=[chip('💎','−'+price(4),'Linh thạch','dn'),chip('❤️','hồi đầy','Khí huyết, linh lực','up')].concat(applyE({tamma:-2}));sc.msg.unshift(T(['Phòng chật nhưng sạch, chăn có mùi nắng. Ngươi ngủ một giấc tới sáng.','Tiểu nhị mang lên một bát canh nóng. Ngươi ăn xong, ngủ say như chết.','Đêm ấy mưa rơi trên mái ngói. Ngươi ngủ ngon hơn mọi đêm.']));break;}
    case 'tea':{if(!tick(1))return;ch=teaHouse(n);break;}
    case 'shop':{if(!tick(1))return;openShop(n);return;}
    case 'ghost':{if(!tick(1))return;startEvent('quy_thi');return;}
    case 'board':{openBoard(n);return;}
    case 'join':{if(!tick(2))return;startEvent('son_mon');return;}
    case 'lib':{if(!tick(2))return;startEvent('tang_kinh');return;}
    case 'tinh':{if(!tick(6))return;const s1=S();r.hp=Math.min(s1.maxHp,r.hp+Math.round(s1.maxHp*0.45));r.mp=s1.maxMp;sc.msg.unshift(T(REST_T.tinh));ch=[chip('❤️','hồi','Khí huyết hồi 45%','up'),chip('⏳','6 giờ','Thời gian trôi qua','')].concat(applyE({tv:2,tamma:-4}));break;}
    case 'heal':{if(!tick(HM))return;const s1=S();r.hp=s1.maxHp;r.mp=s1.maxMp;sc.msg.unshift(T(['Ngươi nằm trong động suốt một tháng, uống nước suối, ăn quả rừng. Vết thương lành dần.','Một tháng tĩnh dưỡng. Xương cốt lại liền, kinh mạch lại thông.']));ch=[chip('❤️','hồi đầy','Khí huyết, linh lực','up'),chip('⏳','1 tháng','Thời gian trôi qua','')].concat(applyE({tamma:-8}));break;}
    case 'bq1':case 'bq3':{
      const y=a==='bq1'?0.25:2;const g=bqGain(y)*(1+(s.fx.bqP||0)/100);
      sc.msg.unshift(T(REST_T.bq));
      if(a==='bq3'&&chance(.22)){
        if(!tick(HY))return;sc.msg.push(T(REST_T.bqint));
        ch=applyE({tv:g*0.5,tvMajor:1,tamma:-3});sc.chips=ch;
        startCombat({},{kind:'place',msg:sc.msg.slice()});return;}
      if(!tick(y*HY))return;
      ch=[chip('⏳',durH(y*HY),'Thời gian trôi qua','')].concat(applyE({tv:g,tvMajor:1,tamma:-6}));if(!G.run)return;const s1=S();r.hp=s1.maxHp;r.mp=s1.maxMp;break;}
    case 'bt':{if(!doBreak(sc))return;return;}
    case 'boss':{if(!tick(1))return;bossIntro();return;}
    case 'cross':{openPass(n);return;}
    case 'quyan':{retire();return;}
    case 'bury':{if(typeof openBury==='function')openBury(n);return;}
    case 'grave':{if(!tick(1))return;visitGrave(n);return;}
    case 'patron':{if(!tick(1))return;startEvent('bao_an_co');return;}
  }
  if(G.run&&G.run.scene===sc)sc.chips=ch;
}
function doBreak(sc){
  const r=G.run;if(r.tv<100||r.realm>=4)return false;const p=btChance();
  const pid=btPill();const k=r.pills.findIndex(x=>x.id===pid);if(k>=0)r.pills.splice(k,1);const k2=r.pills.findIndex(x=>x.id==='phacanh');if(k2>=0)r.pills.splice(k2,1);
  advanceTime(HM);if(!G.run)return false;
  let ch;
  if(R()<p){
    r.realm++;r.tv=0;r.btFail=0;r.tvMinor=0;r.maxRealm=Math.max(r.maxRealm,r.realm);
    let extra='';
    if(r.realm===2){const sc0=r.base.ngo+r.base.tam+r.base.van+R()*20;const q=sc0>48?3:sc0>38?2:sc0>28?1:0;r.danQ=q;extra=' '+['Hạ phẩm kim đan. Không tốt, nhưng là của ngươi.','Trung phẩm kim đan, tròn trịa vững vàng.','Thượng phẩm kim đan! Hào quang chiếu sáng cả động phủ.','Vô khuyết kim đan! Trời quang đột ngột đổ mưa hoa, thiên đạo cũng phải nhường ba phần.'][q];if(q===3)ach('vokhuyet');}
    sc.msg=[T(REST_T.bt[r.realm-1])+extra];
    const s1=S();r.hp=s1.maxHp;r.mp=s1.maxMp;
    ch=[chip('☯️',REALM[r.realm],'Đại cảnh giới mới. Mọi chỉ số tăng mạnh, thọ nguyên kéo dài.','up'),chip('⏳','thọ '+s1.life,'Thọ nguyên mới','up')];
    log(`Đột phá ${REALM[r.realm]}.`);bio(`Năm ${Math.floor(r.age)} tuổi, đột phá ${REALM[r.realm]} ở ${r.place.n}.`);
    ach(['','tc','kd','na','ht'][r.realm]);sense();
  } else {
    r.btFail++;sc.msg=[T(REST_T.btf)];
    ch=applyE({hp:'-40%',tv:-25,tamma:10});log('Đột phá thất bại.');
  }
  sc.chips=ch;return true;
}
function teaHouse(n){
  const r=G.run,ch=[];const msg=[];
  const cand=regionOf(r.region).nodes.filter(x=>x.fog===0).sort((a,b)=>Math.hypot(a.x-n.x,a.y-n.y)-Math.hypot(b.x-n.x,b.y-n.y)).slice(0,4);
  if(cand.length){const x=pick(cand);hearOf(x);msg.push(T(['Bàn bên có người kể về {$pl}, {$t}, cách đây không xa.','Lão kể chuyện gõ quạt: “Ai từng tới {$pl} chưa? Nghe nói là {$t}.”','Tiểu nhị rỉ tai: đi thêm một quãng là tới {$pl}, {$t}.'],{pl:x.name,t:TYPE_NAME[x.type]}));ch.push(chip('🗺️',x.name+'?','Đã ghi lên bản đồ, vị trí chưa chắc','up'));}
  if(typeof teaEnt==='function'){const m=teaEnt();if(m)msg.push(m);}
  const rv=pick(r.rivals);const pool=chance(.5)?RUMOR.the:RUMOR[pick(['tien','tien','ma','tu'])];const t=T(pool,rumorV(rv));pushNews(t);msg.push(t);
  G.run.scene.msg=msg.length?msg:['Trà nhạt, chuyện cũng nhạt.'];
  ch.push(chip('⏳','1 giờ','Thời gian trôi qua',''));
  return ch;
}
function endScene(){
  const r=G.run;if(!r)return;const sc=r.scene;const back=sc&&sc.back!=null?sc.back:null;
  r.lastBack=back;r.scene=null;
  autoCheck();if(r.scene)return;
  if(back!=null&&r.at===back&&!r.moving)openPlace(back);
}
function leavePlace(){const r=G.run;if(r&&r.scene&&r.scene.type==='place'){r.scene=null;autoCheck();}}

// ---------------- QUAN ẢI ----------------
function openPass(n){
  const r=G.run;const k=r.region+1;if(k>4)return;
  r.scene={type:'pass',id:n.id,back:n.id,k,text:T(['Cửa ải xây bằng đá xanh, cao chín trượng. Lính gác khoanh tay nhìn ngươi từ trên xuống dưới: “Đi đâu? Giấy tờ đâu?”','Quan ải nằm giữa hai vách núi, chỉ một lối đi. Bên kia là {$reg}. Kẻ gác ải không có ý định để ai qua dễ dàng.'],{reg:REG[k].n}),res:null};
}
function passOpts(){
  const r=G.run,sc=r.scene,k=sc.k;const o=[];
  const gp=price(45);const an=r.seeds.findIndex(s=>s.t==='an');
  o.push({a:'realm',i:'☯️',l:'Lấy tu vi mà qua',ok:r.realm>=k,tip:'Cảnh giới từ '+REALM[k]+' trở lên thì không ai dám cản'});
  o.push({a:'pass',i:'🎫',l:'Trình lệnh bài thông quan',ok:r.passes.includes(k),tip:'Lệnh bài rơi từ thủ lĩnh vùng, hoặc mua ở đấu giá'});
  o.push({a:'guide',i:'🧭',l:'Thuê người dẫn đường lén qua',ok:r.st>=gp,tip:'Tốn 💎'+gp,x:'💎'+gp});
  if(an>=0)o.push({a:'favor',i:'🤝',l:'Nhờ '+r.seeds[an].ten+' dẫn đường',ok:true,tip:'Dùng một ân tình đã gieo'});
  o.push({a:'fight',i:'⚔️',l:'Liều mạng xông qua',ok:true,tip:'Đánh một trận với kẻ gác ải rất mạnh'});
  return o;
}
function passAct(a){
  const r=G.run,sc=r.scene;if(!sc||sc.type!=='pass')return;const o=passOpts().find(x=>x.a===a);if(!o||!o.ok)return;
  if(a==='guide'){r.st-=price(45);}
  if(a==='favor'){const i=r.seeds.findIndex(s=>s.t==='an');r.seeds.splice(i,1);}
  if(a==='fight'){startCombat({k:'human',m:1.6,n:'Tướng gác ải',sub:'Kẻ giữ quan ải',elite:1},{kind:'cross',k:sc.k});return;}
  doCross(sc.k,a);
}
function doCross(k,how){
  const r=G.run;const mo=CROSS_M[k];
  advanceTime(mo*HM);if(!G.run)return;
  r.region=k;const R0=regionOf(k);r.moving=null;arrive(R0.entry);r.maxRegion=Math.max(r.maxRegion||0,k);
  log(`Vượt ải, tới ${REG[k].n}.`);bio(`Năm ${Math.floor(r.age)} tuổi, vượt ải tới ${REG[k].n}.`);
  r.scene={type:'region',text:T(REG[k].intro,baseV()),sub:`Đường đi mất ${mo} tháng`};
}
