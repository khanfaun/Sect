// ================= LƯỚI LỤC GIÁC =================
// Ô đỉnh nhọn, hàng lẻ lệch nửa ô. Mọi địa điểm và nhân vật nằm đúng tâm một ô; đi đường là đi qua từng ô.
function makeNoise(seed){const rnd=mul(seed);const G0=17,g=new Float32Array(G0*G0);for(let i=0;i<g.length;i++)g[i]=rnd();
  const at=(x,y)=>g[((y%G0+G0)%G0)*G0+((x%G0+G0)%G0)];
  const n1=(x,y)=>{const xi=Math.floor(x),yi=Math.floor(y);let fx=x-xi,fy=y-yi;fx=fx*fx*(3-2*fx);fy=fy*fy*(3-2*fy);
    const a=at(xi,yi),b=at(xi+1,yi),c=at(xi,yi+1),d=at(xi+1,yi+1);return a+(b-a)*fx+(c-a)*fy+(a-b-c+d)*fx*fy;};
  return (x,y)=>n1(x*4,y*4)*0.55+n1(x*9+3.7,y*9+1.3)*0.3+n1(x*19+7.1,y*19+5.9)*0.15;}
const CELL=[{ox:0,oy:1000,mx:0},{ox:1000,oy:1000,mx:0},{ox:2000,oy:1000,mx:0},{ox:2000,oy:0,mx:1},{ox:1000,oy:0,mx:1},{ox:0,oy:0,mx:0}]; // cũ, chỉ còn để đọc bản lưu cũ
const WORLD_W=3556,WORLD_H=2000,XS=1; // một bản đồ liền (ảnh 16:9); toạ độ địa điểm là toạ độ thật trên bản đồ
function mapXY(k,x,y){return [x,y];}
function invXY(k,dx,dy){return [dx,dy];}
const HEXW=30,HEXP=HEXW*0.8660254,HCOLS=MAPD.hc,HROWS=MAPD.hr,HN=HCOLS*HROWS;
function hexCenter(i){const c=i%HCOLS,r=(i-c)/HCOLS;return [(c+0.5+(r%2)*0.5)*HEXW,(r+2/3)*HEXP];}
function hexAt(x,y){const r0=Math.round(y/HEXP-2/3);let best=0,bd=1e18;
  for(let r=Math.max(0,r0-1);r<=Math.min(HROWS-1,r0+1);r++){const c0=Math.round(x/HEXW-0.5-(r%2)*0.5);
    for(let c=Math.max(0,c0-1);c<=Math.min(HCOLS-1,c0+1);c++){const cx=(c+0.5+(r%2)*0.5)*HEXW,cy=(r+2/3)*HEXP,d=(x-cx)*(x-cx)+(y-cy)*(y-cy);if(d<bd){bd=d;best=r*HCOLS+c;}}}
  return best;}
function hexNb(i){const c=i%HCOLS,r=(i-c)/HCOLS,d=r%2?1:-1;const o=[];for(const [x,y] of [[c-1,r],[c+1,r],[c,r-1],[c+d,r-1],[c,r+1],[c+d,r+1]])if(x>=0&&x<HCOLS&&y>=0&&y<HROWS)o.push(y*HCOLS+x);return o;}
function hexVerts(i){const [x,y]=hexCenter(i),dx=HEXW/2,dy=HEXP;return [[x,y-dy*2/3],[x+dx,y-dy/3],[x+dx,y+dy/3],[x,y+dy*2/3],[x-dx,y+dy/3],[x-dx,y-dy/3]];}
// loại đất của từng ô (lấy từ ảnh bản đồ, tools/dia-hinh.py): 0 vân hải (mây biển, không đi bộ được), 1 đồng bằng, 2 rừng, 3 núi cao, 4 sông, 5 hồ, 6 đồi, 7 đầm lầy
const TER_N=['Vân hải','Đồng bằng','Rừng','Núi cao','Sông','Hồ','Đồi','Đầm lầy'];
// giờ đi qua một ô (đồng bằng = 1); sông phải tìm cầu, đò; hồ và vân hải coi như không đi được (rất đắt, chỉ dùng khi không còn lối)
const TER_COST=[40,1,1.4,3,3.5,30,1.8,2.2];
function terWalk(t){return t!==0&&t!==5;}
function stepCost(g,u,v){return TER_COST[g.ter[v]]+0.35*Math.max(0,g.el[v]-g.el[u]);} // lên dốc tốn thêm
const QUAN_N=['Thanh Vân','Bạch Lộ','Huyền Sương','Tử Yên','Xích Hà','Lạc Nhạn','Vọng Nguyệt','Thính Vũ','Ngọa Long','Phi Hạc','Tàng Phong','Minh Kính','U Lan','Hàn Tuyền','Kim Tước','Thúy Trúc','Vân Mộng','Cổ Tùng','Lưu Sa','Bích Đào','Ngân Hạnh','Thiên Trì','Mặc Trì','Hồng Diệp','Thạch Môn','Lam Điền','Phong Lâm','Tịch Chiếu','Cô Tô','Yên Hà','Ngư Dương','Liễu Doanh','Trường Bạch','Tùng Giang','Đào Nguyên','Ô Giang'];
let GEO=null;
function geoFor(w){if(GEO&&GEO.seed===w.seed)return GEO;
  const nz=makeNoise(hashS('terr'+w.seed));const reg=new Int8Array(HN),ter=new Uint8Array(HN),el=new Uint8Array(HN),dist=new Int16Array(HN).fill(-1);
  for(let i=0;i<HN;i++){ter[i]=+MAPD.ter[i];el[i]=+MAPD.el[i];const c=MAPD.reg[i];reg[i]=c==='x'?-1:+c;}
  // tiểu khu vực (quận): mỗi đại khu vực chia sáu quận quanh sáu hạt giống trên đất đi được
  const dnames=[];const rnd=mul(hashS('quan'+w.seed));const pool=QUAN_N.slice();
  for(let k=0;k<5;k++){const cells=[];for(let i=0;i<HN;i++)if(reg[i]===k)cells.push(i);const seeds=[];const land=cells.filter(i=>terWalk(ter[i]));
    for(let g=0;g<600&&seeds.length<6&&land.length;g++){const c=land[Math.floor(rnd()*land.length)];const p=hexCenter(c);if(seeds.every(s=>{const q=hexCenter(s);return Math.hypot(p[0]-q[0],p[1]-q[1])>230;}))seeds.push(c);}
    const base=dnames.length;for(const s of seeds){const j=Math.floor(rnd()*pool.length);dnames.push((pool.splice(j,1)[0]||'Vô Danh')+' Quận');}
    for(const i of cells){const p=hexCenter(i);let b=0,bd=1e18;seeds.forEach((s,j)=>{const q=hexCenter(s);const d=(p[0]-q[0])**2+(p[1]-q[1])**2;if(d<bd){bd=d;b=j;}});dist[i]=base+b;}}
  return GEO={seed:w.seed,nz,reg,ter,el,dist,dnames,paths:{},nodeAt:null};}
function geo(){return geoFor(W());}
// đặt mọi địa điểm vào đúng tâm một ô đất trống trong vùng của nó
const AREA_BOX=[];
function areaBox(k){if(AREA_BOX[k])return AREA_BOX[k];let x0=1e9,y0=1e9,x1=-1e9,y1=-1e9;for(let i=0;i<HN;i++)if(MAPD.reg[i]===String(k)){const p=hexCenter(i);x0=Math.min(x0,p[0]);y0=Math.min(y0,p[1]);x1=Math.max(x1,p[0]);y1=Math.max(y1,p[1]);}return AREA_BOX[k]=[x0,y0,x1,y1];}
function snapWorld(w){if(!w||!w.regions)return;const g=geoFor(w);const used=new Set();g.paths={};g.nodeAt=null;
  const blocked=new Set();const ring=c=>{blocked.add(c);for(const b of hexNb(c)){blocked.add(b);for(const d of hexNb(b))blocked.add(d);}};
  const ok=(c,k)=>!used.has(c)&&!blocked.has(c)&&g.reg[c]===k&&terWalk(g.ter[c])&&g.ter[c]!==4;
  for(const R0 of w.regions){const k=R0.k,B0=areaBox(k);
    for(const n of R0.nodes){
      if(!n.wc){const lx=clamp((n.x-k*1000)/1000,0,1),ly=clamp(n.y/1000,0,1);n.x=B0[0]+lx*(B0[2]-B0[0]);n.y=B0[1]+ly*(B0[3]-B0[1]);n.wc=1;n.hex=null;n.rx=null;n.ry=null;}
      let c=n.hex!=null?n.hex:hexAt(n.x,n.y);
      if(!ok(c,k)){const seen=new Set([c]);let fr=[c],found=-1;for(let it=0;it<80&&found<0&&fr.length;it++){const nx=[];for(const a of fr)for(const b of hexNb(a)){if(seen.has(b))continue;seen.add(b);nx.push(b);if(found<0&&ok(b,k))found=b;}fr=nx;}
        if(found>=0)c=found;}
      used.add(c);ring(c);n.hex=c;const p=hexCenter(c);n.x=Math.round(p[0]*10)/10;n.y=Math.round(p[1]*10)/10;if(n.rx!=null){const pr=hexCenter(hexAt(n.rx,n.ry));n.rx=pr[0];n.ry=pr[1];}}
    for(const e of R0.edges){const a=nodeById2(w,e.a),b=nodeById2(w,e.b);if(a&&b)e.len=Math.round(Math.hypot(a.x-b.x,a.y-b.y));}}
  w.mo=1;}
function nodeById2(w,id){const R0=w.regions[Math.floor(id/100)];return R0&&R0.nodes[id%100];}
{const _gw2=genWorld;genWorld=function(seed){const w=_gw2(seed);snapWorld(w);return w;};}
{const _nm2=newMeta;newMeta=function(){const m=_nm2();snapWorld(m.world);return m;};}
// đường đi qua các ô: biển đi được nhưng rất tốn (thuê thuyền), núi và sông hồ chậm hơn đồng bằng
function hexPath(a,b){const g=geo();const key=a+'>'+b;if(g.paths[key])return g.paths[key];
  const D=new Float32Array(HN).fill(1e9),P=new Int32Array(HN).fill(-1);const [bx,by]=hexCenter(b);const heap=[[0,a]];D[a]=0;
  const push=x=>{heap.push(x);let i=heap.length-1;while(i>0){const p=(i-1)>>1;if(heap[p][0]<=heap[i][0])break;[heap[p],heap[i]]=[heap[i],heap[p]];i=p;}};
  const pop=()=>{const t=heap[0],l=heap.pop();if(heap.length){heap[0]=l;let i=0;for(;;){let m=i;const x=2*i+1,y=x+1;if(x<heap.length&&heap[x][0]<heap[m][0])m=x;if(y<heap.length&&heap[y][0]<heap[m][0])m=y;if(m===i)break;[heap[m],heap[i]]=[heap[i],heap[m]];i=m;}}return t;};
  while(heap.length){const [f,u]=pop();if(u===b)break;const du=D[u];for(const v of hexNb(u)){const nd=du+stepCost(g,u,v);if(nd<D[v]){D[v]=nd;P[v]=u;const [vx,vy]=hexCenter(v);push([nd+Math.hypot(vx-bx,vy-by)/HEXW,v]);}}}
  const cells=[];for(let c=b;c>=0;c=P[c]){cells.push(c);if(c===a)break;}cells.reverse();
  const cum=[0];for(let i=1;i<cells.length;i++)cum.push(cum[i-1]+stepCost(g,cells[i-1],cells[i]));
  const res={cells,cum,len:Math.max(1,cum[cum.length-1])*HEXW};g.paths[key]=res;g.paths[b+'>'+a]={cells:cells.slice().reverse(),cum:cum.map(x=>cum[cum.length-1]-x).reverse(),len:res.len};return res;}
function nodeHex(n){return n.hex!=null?n.hex:hexAt(...mapXY(Math.floor(n.id/100),n.x,n.y));}
function findPath(from,to){return from===to?[from]:[from,to];} // một bản đồ liền: đi thẳng theo ô tới bất cứ đâu
function edgeLen(a,b){if(a===b)return 0;return Math.round(hexPath(nodeHex(nodeById(a)),nodeHex(nodeById(b))).len);}
function pathLen(p){let L=0;for(let i=1;i<p.length;i++)L+=edgeLen(p[i-1],p[i]);return L;}
// vị trí trên bản đồ lớn khi đang đi: trượt dọc theo tâm các ô
function playerMapXY(){const r=G.run;const m=r.moving;const a=nodeById(r.at);
  if(!m||m.seg>=m.path.length-1)return mapXY(r.region,a.x,a.y);
  const hp=hexPath(nodeHex(nodeById(m.path[m.seg])),nodeHex(nodeById(m.path[m.seg+1])));const tot=hp.cum[hp.cum.length-1]||1,t=clamp(m.prog,0,1)*tot;
  let i=1;while(i<hp.cum.length-1&&hp.cum[i]<t)i++;const c0=hexCenter(hp.cells[i-1]),c1=hexCenter(hp.cells[Math.min(i,hp.cells.length-1)]);const seg=(hp.cum[i]-hp.cum[i-1])||1,f=clamp((t-hp.cum[i-1])/seg,0,1);
  return [c0[0]+(c1[0]-c0[0])*f,c0[1]+(c1[1]-c0[1])*f];}
function playerXY(){const r=G.run;const d=playerMapXY();return invXY(r.region,d[0],d[1]);}
// dừng giữa đường thì đứng lại ở tâm ô gần nhất
function snapStop(){const r=G.run,m=r&&r.moving;if(!m||m.seg>=m.path.length-1)return;const hp=hexPath(nodeHex(nodeById(m.path[m.seg])),nodeHex(nodeById(m.path[m.seg+1])));const tot=hp.cum[hp.cum.length-1]||1;const t=m.prog*tot;
  let b=0,bd=1e9;hp.cum.forEach((c,i)=>{if(Math.abs(c-t)<bd){bd=Math.abs(c-t);b=i;}});m.prog=clamp(hp.cum[b]/tot,0.001,0.999);}
function hexInfo(i){const g=geo();const k=g.reg[i];return {i,sea:k<0,reg:k,regName:k<0?'Vân Hải':REG[k].n,dist:k<0?'':g.dnames[g.dist[i]]||'',ter:TER_N[g.ter[i]],el:g.el[i]};}
function hexNode(i){const g=geo(),r=G.run;if(!g.nodeAt||g.nodeKey!==r.kiep+':'+W().t){g.nodeAt={};g.nodeKey=r.kiep+':'+W().t;const L=[];for(const R0 of W().regions)for(const n of R0.nodes)if(n.fog>=1)L.push([R0,n]);
    // lượt 1: ô gốc của từng địa điểm (nơi đã biết thì ở ô thật, nơi mới nghe đồn thì ở ô hiển thị); lượt 2: các ô phụ, chỉ lấy ô còn trống
    for(const [R0,n] of L){const h=(n.fog>=2||n.memory)?nodeHex(n):hexAt(...nodeShown(n));if(g.nodeAt[h]==null||n.fog>=2)g.nodeAt[h]=n.id;}
    for(const [R0,n] of L)if((n.fog>=2||n.memory)&&n.cells)for(const c of n.cells)if(g.nodeAt[c]==null)g.nodeAt[c]=n.id;}
  const id=g.nodeAt[i];return id!=null?nodeById(id):null;}

// thực thể qua lại đi cùng nhịp với người chơi: chậm lại 60 lần, sống lâu hơn 30 lần
for(const k in ENT_T){ENT_T[k].sp/=60;if(ENT_T[k].sp>0)ENT_T[k].life=ENT_T[k].life.map(x=>x*30);}
function entsRescale(w){for(const e of (w&&w.ents)||[])if(e.speed>1)e.speed/=60;}

// ================= ĐỢT 4: PHẨM, TRANG BỊ THEO Ô, ĐAN ĐIỀN UẨN DƯỠNG, VẬT TÙY THÂN, TÚI ĐỒ =================
const PHAM=['Phàm phẩm','Hoàng phẩm','Huyền phẩm','Địa phẩm','Thiên phẩm','Tiên phẩm','Thần phẩm'];
const PHAM_M=[0.5,1,1.75,2.75,4,5.5,7.5];
for(let i=0;i<GRADE.length;i++)GRADE[i]=PHAM[i];
PQ[0]=PHAM[0];PQ[1]=PHAM[1];PQ[2]=PHAM[2];
RELIC_K.push({k:'non',b:['Quan','Đấu Lạp','Ngọc Quan'],fx:{tam:2,defP:6}},{k:'gang',b:['Hộ Thủ','Quyền Sáo','Thủ Giáp'],fx:{atkP:5,crit:2}},{k:'dai',b:['Đai','Ngọc Đái','Yêu Đái'],fx:{hpP:6,tp:1}},
  {k:'hoa',b:['Hỏa Chủng','Địa Tâm Hỏa','Thanh Liên Hỏa'],fx:{craftP:6}},{k:'tran',b:['Trận Bàn','Trận Kỳ','Tụ Linh Trận Đồ'],fx:{bqP:8,bqSafe:15}});
FXT.craftP='Luyện chế dễ thành hơn {v}%';FXT.bqSafe='Bế quan ít bị quấy nhiễu hơn {v}%';
// ô trang bị 3×3; trang sức chỉ một ô (nhẫn, sau này thêm vòng, khuyên…); pháp bảo ra mục riêng 3 ô, mở ở Trúc Cơ, Kết Đan, Nguyên Anh
const SLOTS=[['vukhi','Vũ khí'],['non','Nón'],['boi','Ngọc bội'],['gang','Găng'],['giap','Giáp'],['choang','Áo choàng'],['nhan1','Trang sức'],['dai','Đai lưng'],['giay','Giày']];
const PB_SLOTS=['phapbao1','phapbao2','phapbao3'],PB_REQ=[1,2,3];
function pbOpen(){const r=G.run;return PB_REQ.filter(q=>(r.realm||0)>=q&&!(typeof isPham==='function'&&isPham())).length;}
const SPEC=[['tuivat','Trữ vật'],['phuongtien','Phương tiện'],['hoa','Hỏa chủng'],['dinh','Lô đỉnh'],['tran','Trận pháp']];
const KSLOT={kiem:'vukhi',dao:'vukhi',phap:'vukhi',but:'vukhi',giap:'giap',bao:'choang',tram:'non',non:'non',ngoa:'giay',hoan:'gang',gang:'gang',dai:'dai',nhan:'nhan',boi:'boi',hotam:'boi',tui:'tuivat',dinh:'dinh',hoa:'hoa',tran:'tran'};
const SLOT_N={vukhi:'Vũ khí',non:'Nón',boi:'Ngọc bội',gang:'Găng',giap:'Giáp',choang:'Áo choàng',nhan:'Trang sức',dai:'Đai lưng',phapbao:'Pháp bảo',giay:'Giày',tuivat:'Trữ vật',hoa:'Hỏa chủng',dinh:'Lô đỉnh',tran:'Trận pháp',phuongtien:'Phương tiện'};
function slotOf(rel){return KSLOT[rel.k]||'phapbao';}
function slotsFor(rel){const s=slotOf(rel);return s==='nhan'?['nhan1']:s==='phapbao'?PB_SLOTS.slice(0,pbOpen()):[s];}
function eqOf(){const r=G.run;if(!r.eq)r.eq={};if(!r.dd)r.dd=[];return r.eq;}
function equip(i){const r=G.run,E=eqOf();const rel=r.relics[i];if(!rel)return;const S0=slotsFor(rel);if(!S0.length){if(typeof note==='function')note('Ô pháp bảo mở khi đạt Trúc Cơ.');return;}const s=S0.find(x=>!E[x])||S0[0];
  r.relics.splice(i,1);if(E[s]){E[s].seen=1;r.relics.push(E[s]);}rel.seen=1;E[s]=rel;clampHp();saveSoon();}
function equipTo(i,slot){const r=G.run,E=eqOf();const rel=r.relics[i];if(!rel)return;if(!slot||!slotsFor(rel).includes(slot))return equip(i);
  r.relics.splice(i,1);if(E[slot]){E[slot].seen=1;r.relics.push(E[slot]);}rel.seen=1;E[slot]=rel;clampHp();saveSoon();}
function unequip(s){const r=G.run,E=eqOf();if(!E[s])return;E[s].seen=1;r.relics.push(E[s]);E[s]=null;clampHp();saveSoon();}
// đan điền: uẩn dưỡng vũ khí, pháp bảo. Mỗi năm mạnh thêm 5%, tối đa gấp đôi; trong trận tế ra đánh một lần.
const DD_N=[0,1,2,3,4,4];
function ddCan(rel){const s=slotOf(rel);return s==='vukhi'||s==='phapbao';}
function ddMul(d){return 1+Math.min(1,Math.max(0,W().t-d.t0)/HY*0.05);}
function ddPut(i){const r=G.run;eqOf();const rel=r.relics[i];if(!rel||!ddCan(rel)||r.dd.length>=DD_N[r.realm])return false;rel.seen=1;r.relics.splice(i,1);r.dd.push({rel,t0:W().t});log('Đưa '+rel.name+' vào đan điền uẩn dưỡng.');clampHp();saveSoon();return true;}
function ddTake(j){const r=G.run;eqOf();const d=r.dd[j];if(!d)return;r.dd.splice(j,1);d.rel.seen=1;r.relics.push(d.rel);clampHp();saveSoon();}
function playerDD(j,tid){const r=G.run,sc=r.scene;const u=readyPlayer(sc);eqOf();const d=r.dd[j];if(!u||!d)return false;sc.ddUsed=sc.ddUsed||{};if(sc.ddUsed[j])return false;
  const sk={id:'_dd'+j,n:'Tế '+d.rel.name,el:d.rel.el||'vo',t:0,c:0,fx:{p:Math.round((1.5+0.35*(d.rel.tier||0))*ddMul(d)*100)/100},f:d.rel.name+' từ đan điền vọt ra, linh quang chói mắt.',dt:'ph'};
  if(sc.kiep)tid=sc.units.find(x=>x.kind==='kiep').id;const foes=alive(sc,'B');if(tid==null||!U_(sc,+tid)||U_(sc,+tid).hp<=0)tid=foes.length?foes[0].id:null;
  sc.ddUsed[j]=1;runAct(sc,()=>beginSkill(sc,u,sk,1,tid==null?null:+tid));return true;}
// chỉ đồ đang mặc và đồ đang uẩn dưỡng mới có tác dụng
{const _agg4=aggFx;aggFx=function(){const r=G.run;if(!r)return _agg4();const E=eqOf();const bag=r.relics;
  const act=Object.values(E).filter(Boolean).concat(r.dd.map(d=>{const m=ddMul(d),fx={};for(const k in d.rel.fx)fx[k]=typeof d.rel.fx[k]==='number'?d.rel.fx[k]*m:d.rel.fx[k];return Object.assign({},d.rel,{fx});}));
  r.relics=act;let fx;try{fx=_agg4();}finally{r.relics=bag;}fx.pillSlot=(fx.pillSlot||0)+25;return fx;};}
// sức chứa túi: theo cảnh giới cộng túi trữ vật đang đeo (theo phẩm), tối đa BAG_MAX ô
const BAG_BASE=[30,50,70,95,120,150],BAG_TUI=[10,20,35,55,80,110,150],BAG_MAX=300;
function bagCap(){const r=G.run;if(!r)return BAG_BASE[0];const t=eqOf().tuivat;const up=((G.meta&&G.meta.upg&&G.meta.upg.tui)||0)*5;return Math.min(BAG_MAX,BAG_BASE[clamp(r.realm,0,5)]+(t?BAG_TUI[clamp(t.tier||0,0,6)]:0)+up);}
function bagStacks(){const r=G.run;return r.relics.length+Object.keys(r.mats||{}).filter(k=>r.mats[k]>0).length+(r.eggs||[]).length+(r.passes||[]).length;}
// đan dược chiếm phần ô còn lại của túi
{const _S6=S;S=function(){const s=_S6();if(G.run&&G.run.relics)s.pillMax=Math.max(5,bagCap()-bagStacks());return s;};}
// đồ mới nhặt: ô còn trống thì tự mặc
function eqAuto(){const r=G.run;if(!r)return;const E=eqOf();const put=[];for(let i=r.relics.length-1;i>=0;i--){const rel=r.relics[i];if(rel.seen)continue;rel.seen=1;const s=slotsFor(rel).find(x=>!E[x]);if(s){r.relics.splice(i,1);E[s]=rel;put.push(rel);}}
  if(put.length===1)note('Mặc '+put[0].name+' vào ô '+SLOT_N[slotOf(put[0])].toLowerCase()+'.','up');else if(put.length>1)note('Tự mặc '+put.length+' món mới vào các ô còn trống.','up');
  if(r.chu)for(let j=0;j<8;j++)if(r.chu[j]&&r.chu[j].k==='r')r.chu[j]=null;clampHp();}
{const _ac4=autoCheck;autoCheck=function(){eqAuto();_ac4();};}
function chuPool(){const r=run2();const used=new Set(r.chu.map(chuKey));const L=[];for(const k of r.skills){const c={k:'s',id:k.id};if(!used.has(chuKey(c)))L.push(c);}return L;}
function craftRate(c){const s=S();return clamp(c.base+(s.ngo-10)*0.02+(s.van-3)*0.01+(s.fx.craftP||0)/100,0.1,0.97);}
{const _br=bqRisk;bqRisk=function(y){return _br(y)*(1-Math.min(80,aggFx().bqSafe||0)/100);};}