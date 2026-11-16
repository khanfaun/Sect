// ================= THẾ GIỚI MỞ: MỘT BẢN ĐỒ LIỀN, NĂM ĐẠI KHU VỰC =================
// Bản đồ là ảnh vẽ tay (src/assets/ban-do). Năm "vùng" cũ nay là năm đại khu vực địa lý trên cùng một tấm bản đồ,
// đi bộ thẳng từ khu này sang khu khác, không còn quan ải hay lệnh bài thông quan.
// r.region = đại khu vực đang đứng (để biết tên, cảnh vẽ, thực thể quanh đây).
// Độ khó (kẻ địch, vật phẩm, giá cả) không còn theo nơi chốn mà theo cảnh giới người chơi: rT().

// ---- độ khó theo cảnh giới ----
function rT(){const r=G.run;return r?clamp(r.realm||0,0,4):0;}
// kẻ địch: phần lớn ngang cảnh giới, thỉnh thoảng gặp kẻ mạnh hơn hoặc yếu hơn một bậc
function rTv(){const t=rT();const x=R();return clamp(t+(x<0.1?1:x<0.2?-1:0),0,4);}

// ---- năm đại khu vực ----
const AREA=[
  {n:'Trung Châu',seal:'中',sub:'Đất giữa thiên hạ, sông lớn chảy qua',types:['tran','thanh','rung','song','tong','phe'],
    intro:['Ngươi rời {$que} vào một sớm sương mù. Trung Châu rộng lớn, sông dài uốn khúc giữa đồng lúa. Đường tiên dài lắm, nhưng bước đầu tiên chỉ cần một bước.','Người trong làng tiễn ngươi ra tới bến sông. Trung Châu đông người, lắm chợ, lắm tông môn. Ngươi không ngoảnh lại.']},
  {n:'Đông Hoang',seal:'東',sub:'Đồi thấp, rừng sâu, sương mù quanh năm',types:['rung','hoang','dong','nui','phe','thanh'],
    intro:['Ngươi rời {$que}. Phía đông là đồi nối đồi, rừng già chen kín, sương chẳng bao giờ tan hẳn.','Đông Hoang ít người ở. Tiếng thú gầm vọng qua thung, khói bếp thưa như sao buổi sớm.']},
  {n:'Nam Trạch',seal:'南',sub:'Sông nhánh, đầm lầy, đồng nước',types:['song','bien','rung','dong','tran','thanh'],
    intro:['Ngươi rời {$que}. Nam Trạch nước nhiều hơn đất, thuyền nan len giữa lau sậy, cá quẫy dưới chân cầu.','Gió nồm thổi ẩm. Ở Nam Trạch, đường đi tính bằng con nước, không tính bằng dặm.']},
  {n:'Tây Lĩnh',seal:'西',sub:'Vạn núi chen nhau, mây phủ đỉnh',types:['nui','dong','tong','rung','thanh','ma'],
    intro:['Ngươi rời {$que}. Tây Lĩnh núi nối núi, mỗi ngọn là một sơn môn, mỗi hang là một bí mật.','Đường đá dốc đứng, mây lưng chừng núi. Người tu tiên ở Tây Lĩnh nhìn nhau bằng ánh mắt dò xét.']},
  {n:'Bắc Nhạc',seal:'北',sub:'Đỉnh cao chạm trời, gió lạnh thấu xương',types:['nui','thien','phe','hoang','dong','ma'],
    intro:['Ngươi rời {$que}. Phía bắc, những đỉnh núi đâm thẳng vào mây, tuyết trên cao không bao giờ tan.','Bắc Nhạc lạnh và vắng. Di cốt của kẻ đi trước rải rác ven đường đá cổ.']},
];
for(let k=0;k<5;k++)if(REG[k])Object.assign(REG[k],AREA[k]);
function areaOfHex(h){const g=geo();return g.reg[h];}

// sinh vùng: bỏ quan ải (không còn ranh giới phải qua cửa)
{const _gr=genRegion;genRegion=function(k,w){const R0=_gr(k,w);const reg=REG[k];
  for(const n of R0.nodes)if(n.type==='ai'){n.type=pick(reg.types.filter(t=>t!=='tong'));n.name=placeName(n.type);n.danger=Math.min(n.danger,2);}
  // khu nào cũng có ít nhất hai trấn nhỏ để người mới sinh ra ở đó
  for(let q=0;q<2&&R0.nodes.filter(n=>n.type==='tran').length<2;q++){const c=R0.nodes.find(n=>!n.sectFix&&!n.dp&&!['sao','thanh','tran','tong'].includes(n.type));if(!c)break;c.type='tran';c.name=placeName('tran');c.danger=0;}
  R0.pass=null;return R0;};}
function canGoBack(){return false;}

// sinh ra ở bất cứ trấn nào trên bản đồ
function birthNode(){const w=W();const all=[];for(const R0 of w.regions)for(const n of R0.nodes)all.push(n);
  let pool=all.filter(n=>n.type==='tran'&&n.id!==w.lastBirth&&n.state!=='ruin');if(!pool.length)pool=all.filter(n=>n.type==='tran'||n.type==='thanh');return pick(pool);}
{const _nr=newRun;newRun=function(){const x=_nr.apply(this,arguments);const r=G.run;if(r){r.reveal=[];r.visS='';visReset();sense();
  if(r.scene&&r.scene.type==='region')r.scene.text=T(REG[r.region].intro,{que:r.que});dbg('mo.spawn',{at:r.at,area:r.region,ten:r.ten});}return x;};}

// tới một địa điểm: biết mình đang ở đại khu vực nào
{const _ar=arrive;arrive=function(id){const r=G.run;const k=Math.floor(id/100);const was=r.region;r.region=k;r.maxRegion=Math.max(r.maxRegion||0,k);
  const x=_ar.apply(this,arguments);
  if(was!==k&&r.areas&&!r.areas.includes(k)){r.areas.push(k);if(typeof note==='function')note('Đặt chân vào '+REG[k].n+': '+REG[k].sub.toLowerCase()+'.');dbg('mo.area',{from:was,to:k});}
  if(!r.areas)r.areas=[k];return x;};}

// ---- tầm nhìn theo địa hình ----
// Đồng bằng nhìn bình thường, sông hồ và vân hải nhìn xa hơn, rừng đồi che bớt, núi cao chặn hẳn (thấy núi nhưng không thấy sau núi).
// Đứng trên cao nhìn xa hơn.
const VIS_COST=[0.8,1,1.7,1,0.7,0.65,1.4,1.1];
let VIS=null,VNOW=null,VT=null,VIS_K='',VIS_N=0;
function visReset(){VIS=new Uint8Array(HN);VNOW=new Uint8Array(HN);VT=new Float64Array(HN);VIS_K=G.run?G.run.kiep+'':'';VIS_N++;}
function visNowMs(){return typeof performance!=='undefined'?performance.now():Date.now();}
function visLoad(){const r=G.run;if(!r)return;if(VIS&&VIS_K===r.kiep+'')return;visReset();
  const s=r.visS||'';for(let j=0;j<s.length;j++){const v=VIS_A.indexOf(s[j]);if(v<=0)continue;for(let b=0;b<6;b++)if(v&(1<<b)){const i=j*6+b;if(i<HN)VIS[i]=1;}}}
// ô đã thấy lưu thành chuỗi: mỗi ký tự giữ 6 ô
const VIS_A='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
function visSave(){const r=G.run;if(!r||!VIS)return;let s='';for(let j=0;j*6<HN;j++){let v=0;for(let b=0;b<6;b++)if(VIS[j*6+b])v|=1<<b;s+=VIS_A[v];}r.visS=s;}
function visCells(h,R){const g=geo();const e0=g.el[h];R*=1+Math.min(0.6,e0*0.07);
  const D=new Float32Array(HN).fill(1e9);D[h]=0;const out=[h];const hp=[[0,h]];
  const push=x=>{hp.push(x);let i=hp.length-1;while(i>0){const p=(i-1)>>1;if(hp[p][0]<=hp[i][0])break;[hp[p],hp[i]]=[hp[i],hp[p]];i=p;}};
  const pop=()=>{const t=hp[0],l=hp.pop();if(hp.length){hp[0]=l;let i=0;for(;;){let m=i;const x=2*i+1,y=x+1;if(x<hp.length&&hp[x][0]<hp[m][0])m=x;if(y<hp.length&&hp[y][0]<hp[m][0])m=y;if(m===i)break;[hp[m],hp[i]]=[hp[i],hp[m]];i=m;}}return t;};
  while(hp.length){const [d,u]=pop();if(d>D[u])continue;
    // núi cao hơn chỗ đứng thì chặn tầm nhìn phía sau; đồi cao hơn hẳn cũng vậy
    if(u!==h&&((g.ter[u]===3&&g.el[u]>=e0)||(g.ter[u]===6&&g.el[u]>e0+2)))continue;
    for(const v of hexNb(u)){const nd=d+VIS_COST[g.ter[v]];if(nd<=R&&nd<D[v]){if(D[v]>=1e9)out.push(v);D[v]=nd;push([nd,v]);}}}
  return out;}
function visR(){return senseR()*1.15/HEXW;}
function sense(){const r=G.run,w=W();if(!r)return false;visLoad();const p=playerMapXY();const h=hexAt(p[0],p[1]);
  const L=visCells(h,visR());let ch=false;const t=visNowMs();VNOW.fill(0);
  for(const c of L){VNOW[c]=1;if(!VIS[c]){VIS[c]=1;VT[c]=t;ch=true;}}
  if(ch){visSave();VIS_N++;}
  for(const R0 of w.regions)for(const n of R0.nodes){if(VNOW[nodeHex(n)]){if(n.fog<2){n.fog=2;ch=true;}if(n.memory){n.memory=false;ch=true;}n.seenT=w.t;n.vstate=n.state;}}
  if(r.lastVisH!==h){r.lastVisH=h;VIS_N++;ch=true;}
  return ch;}
// đã thấy (đã đi qua) hoặc đang trong tầm nhìn
function hexSeen(i){visLoad();return !!(VIS&&(VIS[i]||VNOW[i]));}

// ---- bản lưu cũ (bản đồ năm ô vuông) không dùng được nữa: dựng lại thế giới, đưa nhân vật về một trấn ----
function moFixRun(){const r=G.run;if(!r)return;const n=birthNode();r.at=n.id;r.region=Math.floor(n.id/100);r.moving=null;r.reveal=[];r.visS='';r.quests=[];r.passes=[];r.place={n:n.name,t:n.type};
  if(r.scene&&r.scene.type!=='combat')r.scene=null;visReset();arrive(n.id);dbg('mo.migrate',{at:n.id});}
if(typeof loadData==='function'){const _ld=loadData;loadData=function(d){
  const old=d&&d.meta&&d.meta.world&&!d.meta.world.mo;
  if(old){const w0=d.meta.world;const w=genWorld();for(const k of ['t','bangY','legacy','chron','nemesis','rstate','rivals','sects','quoc'])if(w0[k]!=null)w[k]=w0[k];w.ents=[];d.meta.world=w;}
  const x=_ld.apply(this,arguments);if(old)moFixRun();if(G.run){visReset();visLoad();sense();}return x;};}
