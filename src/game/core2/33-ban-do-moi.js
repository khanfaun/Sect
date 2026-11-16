// ================= BẢN ĐỒ MỚI: MỘT ĐẠI LỤC VẼ SẴN, NĂM ĐẠI KHU VỰC =================
// Địa hình từng ô lấy từ MAP_TER (core2/32, sinh bởi tools/dia_hinh.py từ ảnh bản đồ).
// - Không còn "vùng 1..5" đi lần lượt: đi tự do khắp nơi. Độ khó theo cảnh giới người chơi:
//   r.region giờ là "bậc" = cảnh giới (0..4), mọi chỗ cũ dùng r.region để tính độ khó vẫn chạy đúng.
//   Khu vực đang đứng là r.khu (0..4), suy ra từ địa điểm (id/100).
// - Đi bộ chỉ trên đất (sông, hồ, mây chặn), lên dốc tốn thêm thời gian. Từ Kết Đan ngự kiếm bay qua sông hồ.
// - Tầm nhìn đi theo ô: núi chắn, mặt nước nhìn xa hơn; ô đã thấy lưu ở r.vis (chuỗi bit base64).
const KHU=[
  {n:'Trung Châu',sub:'Đồng bằng sông nước giữa đại lục'},
  {n:'Đông Hoang',sub:'Rừng đồi mù sương phía đông'},
  {n:'Nam Lĩnh',sub:'Gò đồi và dãy núi phương nam'},
  {n:'Tây Nhạc',sub:'Vạn nhận núi cao, hồ lớn phía tây'},
  {n:'Bắc Vân',sub:'Núi chạm mây phương bắc'},
];
// hạt giống đại khu vực (toạ độ thế giới) và trọng số (lớn thì khu rộng hơn)
const KHU_SEED=[[1480,1030,1.0],[2900,1000,1.12],[1820,1560,1.05],[500,950,1.08],[1760,420,1.0]];
const MAP_V=2;
function khuOfId(id){return Math.floor(id/100);}
function khuName(k){return (KHU[k]||KHU[0]).n;}
function tierSync(){const r=G.run;if(!r)return;r.region=clamp(r.realm||0,0,4);r.maxRegion=Math.max(r.maxRegion||0,r.region);const n=nodeById(r.at);if(n)r.khu=khuOfId(n.id);}
function mapXY(k,x,y){return [x,y];}
function invXY(k,x,y){return [x,y];}
function terOf(i){const c=MAP_TER.charCodeAt(i)-48;return c>=0&&c<=9?c:0;}
function walkable(t){return TER_WALK[t]===1;}

// ----- địa lý: loại đất, đại khu vực, quận -----
GEO=null;
function geoFor(w){if(GEO&&GEO.seed===w.seed&&GEO.v===MAP_V)return GEO;
  const nz=makeNoise(hashS('khu'+w.seed));const reg=new Int8Array(HN),ter=new Uint8Array(HN),dist=new Int16Array(HN).fill(-1);
  for(let i=0;i<HN;i++){ter[i]=terOf(i);const [x,y]=hexCenter(i);
    if(ter[i]===0){reg[i]=-1;continue;}
    let b=0,bd=1e18;for(let k=0;k<5;k++){const s=KHU_SEED[k];const d=Math.hypot(x-s[0],y-s[1])/s[2]+(nz(x/900+k*3.1,y/900+k*1.7)-0.5)*260;if(d<bd){bd=d;b=k;}}reg[i]=b;}
  // quận: mỗi khu chia sáu quanh sáu hạt giống
  const dnames=[];const rnd=mul(hashS('quan'+w.seed));const pool=NAME_PRE.slice();
  for(let k=0;k<5;k++){const cells=[];for(let i=0;i<HN;i++)if(reg[i]===k&&walkable(ter[i]))cells.push(i);const seeds=[];
    for(let g=0;g<600&&seeds.length<6&&cells.length;g++){const c=cells[Math.floor(rnd()*cells.length)];const p=hexCenter(c);if(seeds.every(s=>{const q=hexCenter(s);return Math.hypot(p[0]-q[0],p[1]-q[1])>230;}))seeds.push(c);}
    const base=dnames.length;for(const s of seeds){const j=Math.floor(rnd()*pool.length);dnames.push((pool.splice(j,1)[0]||'Vô Danh')+' Quận');}
    for(let i=0;i<HN;i++){if(reg[i]!==k)continue;const p=hexCenter(i);let b=0,bd=1e18;seeds.forEach((s,j)=>{const q=hexCenter(s);const d=(p[0]-q[0])**2+(p[1]-q[1])**2;if(d<bd){bd=d;b=j;}});dist[i]=base+b;}}
  return GEO={seed:w.seed,v:MAP_V,nz,reg,ter,dist,dnames,paths:{},np:0,nodeAt:null};}
function geo(){return geoFor(W());}
function hexInfo(i){const g=geo();const k=g.reg[i];return {i,sea:k<0,reg:k,regName:k<0?'Vân Hải':khuName(k),dist:k<0?'':g.dnames[g.dist[i]]||'',ter:TER_N[g.ter[i]]};}

// ----- tông môn: mỗi đại khu vực 6–8 tông, lớn nhỏ khác nhau -----
const SECT_SZ=['Tiểu tông','Trung tông','Đại tông'];
function expandSects(w){if(w.sects.some(s=>s.khu!=null))return;
  // tông môn sẵn có (gắn với thiên kiêu) là đại tông, chia đều các khu
  const ord=shuffle([0,1,2,3,4,0,1,2,3,4]);w.sects.forEach((s,i)=>{s.khu=ord[i%ord.length];s.sz=2;});
  const used=new Set(w.sects.map(s=>s.n));
  const mk=(al,kind)=>{for(let g=0;g<40;g++){const n=pick(SECT_PRE[al])+' '+pick(SECT_SFX[kind]);if(!used.has(n)){used.add(n);return {n,al,kind};}}return null;};
  for(let k=0;k<5;k++){const want=ri(6,8);let have=w.sects.filter(s=>s.khu===k).length;
    while(have<want){const roll=R();const al=roll<0.58?'chinh':roll<0.8?'ma':roll<0.88?'phat':'trung';
      const kind=al==='chinh'?pick(['kiem','dan','dao','tran','khi','phu']):al==='ma'?pick(['ma','am']):al==='phat'?'phat':'thu';
      const s=mk(al,kind);if(!s)break;s.khu=k;s.sz=R()<0.3?1:0;if(R()<0.12)s.sz=2;w.sects.push(s);have++;}}}

// ----- dựng địa điểm cho một đại khu vực -----
function nearTer(i,set,ring){let fr=[i];const seen=new Set(fr);for(let d=0;d<ring;d++){const nx=[];for(const a of fr)for(const b of hexNb(a)){if(seen.has(b))continue;seen.add(b);if(set.includes(terOf(b)))return true;nx.push(b);}fr=nx;}return false;}
function genRegion(k,w){
  if(k===0){expandSects(w);}
  const g=geoFor(w);if(k===0)g.placed=[];const placed=g.placed||(g.placed=[]);
  const cells=[];for(let i=0;i<HN;i++)if(g.reg[i]===k&&[1,2,3,4,7].includes(g.ter[i]))cells.push(i);
  const nodes=[];
  const far=(i,sep)=>{const [x,y]=hexCenter(i);return placed.every(p=>Math.hypot(p[0]-x,p[1]-y)>=sep);};
  const put=(type,wf,sep)=>{let best=-1,bw=0;for(let t=0;t<260;t++){const c=cells[Math.floor(R()*cells.length)];if(!far(c,sep))continue;const v=wf(c)*(0.6+R()*0.8);if(v>bw){bw=v;best=c;}}
    if(best<0)for(let t=0;t<400&&best<0;t++){const c=cells[Math.floor(R()*cells.length)];if(far(c,sep*0.7))best=c;}
    if(best<0)return null;const [x,y]=hexCenter(best);placed.push([x,y]);
    const n={id:k*100+nodes.length,r:k,x:Math.round(x*10)/10,y:Math.round(y*10)/10,hex:best,type,name:'',danger:0,fog:0,seenT:-1,memory:false,state:'ok',stateUntil:0,explore:0,exploreT:-1,grave:null,cache:null,patron:null,dp:0};nodes.push(n);return n;};
  const T=c=>g.ter[c],wet=c=>nearTer(c,[5,6,7,8,9],2)?1:0;
  const pref={
    thanh:c=>(T(c)===1?3:T(c)===2?0.6:0.1)*(1+2*wet(c)),
    tran:c=>(T(c)===1?2:T(c)===2?1:T(c)===3?0.6:0.1)*(1+wet(c)),
    tong:c=>T(c)===4?3:T(c)===3?2.2:T(c)===2?1.2:0.5,
    dong:c=>T(c)===4?3:T(c)===3?1.5:0.3,
    sao:c=>T(c)===4?2:T(c)===2?2:T(c)===7?1.5:0.4,
    rung:c=>T(c)===2?3:0.15,
    nui:c=>T(c)===4?3:T(c)===3?1.6:0.1,
    song:c=>wet(c)?3:0.05,
    phe:c=>1,
    hoang:c=>T(c)===3?2:T(c)===1?1:0.4,
    ma:c=>T(c)===2||T(c)===4?2:0.5,
    thien:c=>nearTer(c,[0],2)?3:T(c)===4?1:0.1,
    bien:c=>nearTer(c,[6,7],1)?3:0.02,
    linhdia:c=>T(c)===4||T(c)===2?2:1,khoang:c=>T(c)===4?3:T(c)===3?1.5:0.2,duoc:c=>T(c)===2?3:T(c)===7?1.5:0.3,
    cho:c=>T(c)===1?2:0.5,ancu:c=>T(c)===4?2:T(c)===3?2:0.5,dam:c=>T(c)===7?4:wet(c)?1.5:0.05,
  };
  const SEP=105;
  // khu dân cư trước
  const nThanh=k===0?2:ri(1,2);for(let q=0;q<nThanh;q++)put('thanh',pref.thanh,SEP*1.6);
  for(let q=0;q<ri(3,4);q++)put('tran',pref.tran,SEP*1.2);
  // tông môn của khu
  const ss=w.sects.filter(s=>s.khu===k);
  for(const s of ss){const n=put('tong',s.sz===2?(c=>pref.tong(c)*1.5):pref.tong,SEP*(s.sz===2?1.3:1.05));if(n){n.name=s.n;n.owner=s.n;n.sz=s.sz;n.sectFix=1;}}
  for(let q=0;q<2;q++){const n=put('dong',pref.dong,SEP);if(n)n.dp=1;}
  put('sao',pref.sao,SEP*1.2);
  // hoang dã theo địa hình của khu
  const wild=['rung','rung','nui','nui','song','phe','phe','hoang'];
  if(k===1)wild.push('ma','rung');if(k===2)wild.push('ma','hoang');if(k===3)wild.push('nui','song');if(k===4)wild.push('thien','thien','nui');if(k===0)wild.push('song','bien');
  for(let q=0;q<3;q++)wild.push(pick(['rung','nui','song','phe','hoang']));
  for(const t of wild)put(t,pref[t]||pref.phe,SEP);
  // địa điểm mới (linh địa, mỏ, dược cốc, chợ phiên, thảo lư, đầm lầy)
  for(const t of shuffle(Object.keys(NEWT)).concat(['linhdia','duoc','khoang']))put(t,pref[t]||pref.phe,SEP);
  // tên và mức nguy hiểm: theo địa hình và khoảng cách tới nơi có người
  const towns=nodes.filter(n=>['tran','thanh','cho'].includes(n.type));
  const used=new Set();
  for(const n of nodes){
    if(!n.name){let nm;for(let gq=0;gq<12;gq++){nm=NEWT[n.type]?pick(NAME_PRE)+' '+pick(NEWT[n.type].sfx):placeName(n.type,w);if(!used.has(nm))break;}n.name=nm;}
    used.add(n.name);
    const t=g.ter[n.hex];const dmin=towns.length?Math.min(...towns.map(q=>Math.hypot(q.x-n.x,q.y-n.y))):600;
    let d=[0,0,1,1,2,0,0,1,1,0][t]+(dmin>420?1:0)+(dmin>800?1:0);
    if(['tran','thanh','cho','ancu'].includes(n.type))d=0;
    if(n.type==='tong')d=Math.min(d,1);
    if(n.type==='sao'||n.type==='ma')d=3;
    if(n.type==='dong')d=Math.max(1,d);
    n.danger=clamp(d,0,3);if(n.type==='dong')n.dp=1;if(n.type==='linhdia')n.dp=1;
  }
  // cạnh: hai điểm gần nhất trong khu (chỉ để tương thích; đường đi thật theo ô)
  const edges=[];for(const n of nodes){const near=nodes.filter(x=>x!==n).map(x=>[x,Math.round(Math.hypot(x.x-n.x,x.y-n.y))]).sort((a,b)=>a[1]-b[1]).slice(0,2);
    for(const [x,L] of near)if(!edges.some(e=>e.a===x.id&&e.b===n.id||e.a===n.id&&e.b===x.id))edges.push({a:n.id,b:x.id,len:L});}
  const entry=(nodes.find(n=>n.type==='thanh')||nodes.find(n=>n.type==='tran')||nodes[0]).id;
  const lair=(nodes.find(n=>n.type==='sao')||{}).id;
  return {k,nodes,edges,entry,pass:null,lair,terr:[],ext:1,v:MAP_V};
}
function snapWorld(w){if(!w||!w.regions)return;for(const R0 of w.regions)for(const n of R0.nodes)if(n.hex==null)n.hex=hexAt(n.x,n.y);if(GEO){GEO.paths={};GEO.np=0;GEO.nodeAt=null;GEO.nb=null;}}
function allNodes(){const L=[];for(const R0 of W().regions)for(const n of R0.nodes)L.push(n);return L;}
function nodeById(id){const w=W();const R0=w.regions[Math.floor(id/100)];return R0&&R0.nodes[id%100];}
// điểm lân cận: ba nơi gần nhất trên cả đại lục (biển chỉ đường, tuần tra quanh sơn môn...)
function neighbors(id){const g=geo();const key=W().regions.reduce((a,R0)=>a+R0.nodes.length,0);if(!g.nb||g.nbKey!==key){g.nb={};g.nbKey=key;}
  if(g.nb[id])return g.nb[id];const n=nodeById(id);if(!n)return [];
  const L=allNodes().filter(x=>x.id!==id).map(x=>[x.id,Math.hypot(x.x-n.x,x.y-n.y)]).sort((a,b)=>a[1]-b[1]).slice(0,3).map(x=>x[0]);return g.nb[id]=L;}
function townsOf(k){const ns=k==null?allNodes():regionOf(k).nodes;return ns.filter(n=>(n.type==='tran'||n.type==='thanh')&&n.state==='ok');}
function birthNode(){const w=W();let pool=allNodes().filter(n=>n.type==='tran'&&n.id!==w.lastBirth&&n.state!=='ruin');if(!pool.length)pool=allNodes().filter(n=>n.type==='tran'||n.type==='thanh');return pick(pool);}

// ----- đường đi theo ô: chỉ trên đất, lên dốc tốn thêm; ngự kiếm (từ Kết Đan) bay qua sông hồ -----
function flyMode(){const r=G.run;return !!(r&&(r.realm||0)>=2&&!(typeof isPham==='function'&&isPham()));}
function stepCost(u,v,fly){const g=geo();const a=g.ter[u],b=g.ter[v];
  if(fly){if(b===0)return 1e9;return 0.85+TER_ELEV[b]*0.1+(b===5||b===6?0.15:0);}
  if(!walkable(b))return 1e9;return TER_COST[b]+Math.max(0,TER_ELEV[b]-TER_ELEV[a])*0.9;}
function hexPath(a,b,fly){const g=geo();if(fly==null)fly=false;const key=(fly?'f':'w')+a+'>'+b;if(g.paths[key])return g.paths[key];
  if(g.np>4000){g.paths={};g.np=0;}
  const D=new Float32Array(HN).fill(1e9),P=new Int32Array(HN).fill(-1);const [bx,by]=hexCenter(b);const heap=[[0,a]];D[a]=0;
  const push=x=>{heap.push(x);let i=heap.length-1;while(i>0){const p=(i-1)>>1;if(heap[p][0]<=heap[i][0])break;[heap[p],heap[i]]=[heap[i],heap[p]];i=p;}};
  const pop=()=>{const t=heap[0],l=heap.pop();if(heap.length){heap[0]=l;let i=0;for(;;){let m=i;const x=2*i+1,y=x+1;if(x<heap.length&&heap[x][0]<heap[m][0])m=x;if(y<heap.length&&heap[y][0]<heap[m][0])m=y;if(m===i)break;[heap[m],heap[i]]=[heap[i],heap[m]];i=m;}}return t;};
  while(heap.length){const [f,u]=pop();if(u===b)break;const du=D[u];if(f-Math.hypot(...hexCenter(u).map((v,j)=>v-[bx,by][j]))/HEXW>du+1e-3)continue;
    for(const v of hexNb(u)){const c=stepCost(u,v,fly);if(c>=1e8)continue;const nd=du+c;if(nd<D[v]){D[v]=nd;P[v]=u;const [vx,vy]=hexCenter(v);push([nd+Math.hypot(vx-bx,vy-by)/HEXW,v]);}}}
  let cells=[];if(D[b]<1e9){for(let c=b;c>=0;c=P[c]){cells.push(c);if(c===a)break;}cells.reverse();}else cells=[a,b]; // không có đường: đi thẳng (hiếm, chỉ khi dữ liệu lỗi)
  const cum=[0];for(let i=1;i<cells.length;i++){const c=stepCost(cells[i-1],cells[i],fly);cum.push(cum[i-1]+(c>=1e8?3:c));}
  const res={cells,cum,len:Math.max(1,cum[cum.length-1])*HEXW};g.paths[key]=res;g.np++;return res;}
function nodeHex(n){return n.hex!=null?n.hex:hexAt(n.x,n.y);}
function findPath(from,to){if(nodeById(from)==null||nodeById(to)==null)return null;return from===to?[from]:[from,to];}
// độ dài (theo công sức) giữa hai điểm; người chơi tính theo cách đi của mình, thực thể luôn đi bộ
function edgeLen(a,b,fly){if(a===b)return 0;const A=nodeById(a),B=nodeById(b);if(!A||!B)return 1;return Math.round(hexPath(nodeHex(A),nodeHex(B),fly==null?flyMode():fly).len);}
function pathLen(p){let L=0;for(let i=1;i<p.length;i++)L+=edgeLen(p[i-1],p[i]);return L;}
// vị trí dọc đường (trượt theo tâm các ô)
function pathPos(a,b,prog,fly){const hp=hexPath(nodeHex(nodeById(a)),nodeHex(nodeById(b)),fly);const tot=hp.cum[hp.cum.length-1]||1,t=clamp(prog,0,1)*tot;
  let i=1;while(i<hp.cum.length-1&&hp.cum[i]<t)i++;const c0=hexCenter(hp.cells[i-1]),c1=hexCenter(hp.cells[Math.min(i,hp.cells.length-1)]);const seg=(hp.cum[i]-hp.cum[i-1])||1,f=clamp((t-hp.cum[i-1])/seg,0,1);
  return [c0[0]+(c1[0]-c0[0])*f,c0[1]+(c1[1]-c0[1])*f];}
function playerMapXY(){const r=G.run;const m=r.moving;const a=nodeById(r.at);
  if(!m||m.seg>=m.path.length-1)return [a.x,a.y];return pathPos(m.path[m.seg],m.path[m.seg+1],m.prog,flyMode());}
function playerXY(){return playerMapXY();}
function snapStop(){const r=G.run,m=r&&r.moving;if(!m||m.seg>=m.path.length-1)return;const hp=hexPath(nodeHex(nodeById(m.path[m.seg])),nodeHex(nodeById(m.path[m.seg+1])),flyMode());const tot=hp.cum[hp.cum.length-1]||1;const t=m.prog*tot;
  let b=0,bd=1e9;hp.cum.forEach((c,i)=>{if(Math.abs(c-t)<bd){bd=Math.abs(c-t);b=i;}});m.prog=clamp(hp.cum[b]/tot,0.001,0.999);}
function entXY(e){const a=nodeById(e.at);if(!a)return [0,0];if(e.to==null)return [a.x,a.y];return pathPos(e.at,e.to,e.prog,false);}
function entsHere(){return W().ents.slice();} // mọi thực thể trên đại lục (thấy hay không do tầm nhìn quyết định)
// thực thể đi bộ theo ô (không bay), luôn tính độ dài đường đi bộ
function entsStep(h){
  const w=W(),r=G.run;if(!r)return;
  for(const e of w.ents.slice()){
    if(w.t>e.until){if(e.type==='truysat'&&e.data.nem&&w.nemesis)w.nemesis.ent=null;removeEnt(e);continue;}
    if(e.wait>0){e.wait=Math.max(0,e.wait-h);if(e.wait>0)continue;}
    if(e.to==null){entIdle(e);continue;}
    const L=edgeLen(e.at,e.to,false)||1;e.prog+=e.speed*h/L;
    while(e.to!=null&&e.prog>=1){e.prog-=1;e.at=e.to;e.r=khuOfId(e.at);e.route.shift();e.to=e.route.length?e.route[0]:null;if(e.to==null){e.prog=0;entArrive(e);break;}}
  }
}
// đạo diễn: sinh thực thể quanh khu người chơi đang đứng; thương đội, khách, tuần tra ở quá xa thì cho đi khuất
function director(){
  const r=G.run;if(!r)return;const k=r.khu||0;const w=W();
  {const [px,py]=playerXY();for(const e of w.ents.slice())if(['thuong','khach','tuantra'].includes(e.type)){const p=entXY(e);if(Math.hypot(p[0]-px,p[1]-py)>1700)removeEnt(e);}}
  const L=w.ents.filter(e=>e.r===k);
  for(const s of r.seeds){if(s.t==='oan'&&!s.ent&&w.t-(s.at||0)>=30*HD&&chance(.25)){const e=spawnEnt('truysat',k,{name:s.ten,data:{seed:1}});if(e){s.ent=e.id;}}}
  const nem=w.nemesis;if(nem&&!nem.ent&&r.region>=Math.min(nem.r,3)&&r.kiep>nem.kiep&&chance(.2)){const e=spawnEnt('truysat',k,{name:nem.n,data:{nem:1}});if(e){e.icon=nem.i||'🗡️';nem.ent=e.id;}}
  {const me=nodeById(r.at);if(!L.some(e=>{const p=entXY(e);return Math.hypot(p[0]-me.x,p[1]-me.y)<=senseR();})&&L.length<12&&chance(.12))spawnEnt(chance(.5)?'thuong':'khach',k,{near:r.at});}
  if(L.length>=6)return;
  const cnt={};for(const e of L)cnt[e.type]=(cnt[e.type]||0)+1;
  const pool=Object.keys(ENT_T).filter(t=>ENT_T[t].w>0&&(cnt[t]||0)<3);
  let n=6-L.length;while(n-->0&&pool.length){const t=wpick(pool,x=>ENT_T[x].w);spawnEnt(t,k);}
}
// không còn quan ải: không quay về vùng trước
function canGoBack(){return false;}

// ----- tầm nhìn theo địa hình -----
// mỗi bước vào một ô tốn "tầm nhìn" theo loại ô; đứng cao thì đồi thấp hơn không chắn
const SIGHT=[2.2,1,1.7,1.5,3.2,0.62,0.55,0.8,0.85,0.7];
function visCalc(h,R0){const g=geo();const n=Math.ceil(R0/HEXW*1.7)+2;const D=new Map();D.set(h,0);const out=[h];const e0=TER_ELEV[g.ter[h]];
  let fr=[h];const bud=R0/HEXW;
  // loang theo vòng (đủ nhanh vì bán kính nhỏ), giữ chi phí nhỏ nhất
  for(let it=0;it<n&&fr.length;it++){const nx=[];for(const a of fr){const da=D.get(a);
      const ta=g.ter[a];if(a!==h&&(ta===4&&TER_ELEV[ta]>e0+0.1))continue; // núi cao hơn chỗ đứng: thấy núi nhưng không thấy sau núi
      for(const b of hexNb(a)){const tb=g.ter[b];let c=SIGHT[tb];if(TER_ELEV[tb]<e0)c*=0.75;const nd=da+c;if(nd>bud)continue;const old=D.get(b);if(old==null||nd<old-1e-6){if(old==null)out.push(b);D.set(b,nd);nx.push(b);}}}
    fr=nx;}
  return out;}
const VIS={key:'',set:null};
function visNow(){const r=G.run;if(!r)return new Set();const [x,y]=playerXY();const h=hexAt(x,y);const R0=senseR();const key=r.kiep+':'+h+':'+R0;if(VIS.key===key&&VIS.set)return VIS.set;VIS.key=key;VIS.set=new Set(visCalc(h,R0));return VIS.set;}
function canSee(x,y){return visNow().has(hexAt(x,y));}
// ô đã thấy trong kiếp này: Uint8Array lưu thành base64 trong r.vis
const SEEN={run:null,a:null};
const B64='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
function b64e(a){let s='';for(let i=0;i<a.length;i+=3){const n=(a[i]<<16)|((a[i+1]||0)<<8)|(a[i+2]||0);s+=B64[n>>18&63]+B64[n>>12&63]+B64[n>>6&63]+B64[n&63];}return s;}
function b64d(s,a){let j=0;for(let i=0;i+3<s.length&&j<a.length;i+=4){const n=(B64.indexOf(s[i])<<18)|(B64.indexOf(s[i+1])<<12)|(B64.indexOf(s[i+2])<<6)|B64.indexOf(s[i+3]);a[j++]=n>>16&255;if(j<a.length)a[j++]=n>>8&255;if(j<a.length)a[j++]=n&255;}return a;}
function seenArr(){const r=G.run;if(!r)return new Uint8Array(Math.ceil(HN/8));if(SEEN.run===r&&SEEN.a)return SEEN.a;const a=new Uint8Array(Math.ceil(HN/8));
  if(r.vis){try{b64d(r.vis,a);}catch(e){}}SEEN.run=r;SEEN.a=a;return a;}
function seenHas(i){return (seenArr()[i>>3]>>(i&7))&1;}
function seenSave(){const a=seenArr();G.run.vis=b64e(a);G.run.visN=(G.run.visN||0)+1;}
function addReveal(){return false;}
function sense(){
  const r=G.run,w=W();if(!r)return false;const vs=visNow();let ch=false;const a=seenArr();let nw=0;
  for(const h of vs){if(!((a[h>>3]>>(h&7))&1)){a[h>>3]|=1<<(h&7);nw++;}}
  if(nw){seenSave();ch=true;}
  for(const n of allNodes()){if(vs.has(nodeHex(n))){if(n.fog<2){n.fog=2;ch=true;}if(n.memory){n.memory=false;ch=true;}n.seenT=w.t;n.vstate=n.state;}}
  if(typeof dbg==='function'&&nw)dbg('map.sense',{hex:hexAt(...playerXY()),moi:nw,thay:vs.size});
  return ch;
}
function hexNode(i){const g=geo(),r=G.run;if(!g.nodeAt||g.nodeKey!==r.kiep+':'+W().t){g.nodeAt={};g.nodeKey=r.kiep+':'+W().t;for(const n of allNodes()){if(n.fog<1)continue;const h=nodeHex(n);if(g.nodeAt[h]==null||n.fog>=2)g.nodeAt[h]=n.id;}}
  const id=g.nodeAt[i];return id!=null?nodeById(id):null;}

// ----- bậc độ khó theo cảnh giới, khu đang đứng theo địa điểm -----
{const _th=timeHooks;timeHooks=function(h){tierSync();return _th(h);};}
{const _ar=arrive;arrive=function(id){_ar(id);tierSync();};}
{const _nr=newRun;newRun=function(c){_nr(c);tierSync();};}
// thực thể nhận khu theo chỗ đang đứng
{const _ea=entArrive;entArrive=function(e){if(e&&e.at!=null)e.r=khuOfId(e.at);return _ea(e);};}
// sào huyệt: mỗi nơi một thủ lĩnh, hạ rồi thì nơi đó trống (không còn lệnh bài thông quan)
function bossDoneAt(id){const r=G.run;return !!(r&&r.bossAt&&r.bossAt[id]);}

// ----- bản lưu cũ: dựng lại thế giới theo bản đồ mới -----
function migrateX(d){const w=d.meta&&d.meta.world;if(!w)return;
  if(w.mapV!==MAP_V){
    const keepG=G;G={meta:d.meta,run:d.run||null};
    try{expandSects(w);GEO=null;w.regions=[0,1,2,3,4].map(k=>seeded(w.seed+':m'+MAP_V+':r'+k,()=>genRegion(k,w)));w.ents=[];w.mapV=MAP_V;w.lastBirth=null;
      const r=d.run;if(r){const all=[];for(const R0 of w.regions)for(const n of R0.nodes)all.push(n);const home=all.find(n=>n.type==='tran')||all[0];
        r.at=home.id;r.moving=null;r.reveal=[];r.vis='';r.quests=[];r.dest=null;r.khu=khuOfId(home.id);r.region=clamp(r.realm||0,0,4);r.place={n:home.name,t:home.type};home.fog=3;
        if(r.scene&&['place','boss','ent'].includes(r.scene.type))r.scene=null;}
    }finally{G=keepG;}}
}
{const _gw=genWorld;genWorld=function(seed){const w=_gw(seed);w.mapV=MAP_V;return w;};}
