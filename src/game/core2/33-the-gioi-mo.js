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
// Bảng AREA: content/world/area.js
for(let k=0;k<5;k++)if(REG[k])Object.assign(REG[k],AREA[k]);
function areaOfHex(h){const g=geo();return g.reg[h];}

// sinh vùng: bỏ quan ải (không còn ranh giới phải qua cửa)
{const _gr=genRegion;genRegion=function(k,w){const R0=_gr(k,w);const reg=REG[k];
  for(const n of R0.nodes)if(n.type==='ai'){n.type=pick(reg.types.filter(t=>t!=='tong'));n.name=placeName(n.type);n.danger=Math.min(n.danger,2);}
  // khu nào cũng có ít nhất hai trấn nhỏ để người mới sinh ra ở đó
  for(let q=0;q<2&&R0.nodes.filter(n=>n.type==='tran').length<2;q++){const c=R0.nodes.find(n=>!n.sectFix&&!n.dp&&!['sao','thanh','tran','tong'].includes(n.type));if(!c)break;c.type='tran';c.name=placeName('tran');c.danger=0;}
  // mỗi đại khu vực 6–8 tông môn, quy mô lớn nhỏ khác nhau
  {const want=ri(6,8);let have=R0.nodes.filter(n=>n.type==='tong');const used=new Set(w.sects.map(x=>x.n.split(' ')[0]));
    for(let q=have.length;q<want&&R0.nodes.length<90;q++){let p=null;for(let g=0;g<400&&!p;g++){const c={x:k*1000+ri(40,960),y:ri(40,960)};if(R0.nodes.every(n=>Math.hypot(n.x-c.x,n.y-c.y)>=85))p=c;}if(!p)break;
      const al=pick(['chinh','chinh','chinh','ma','phat']);let pre,g2=0;do{pre=pick(SECT_PRE[al]);}while(used.has(pre)&&g2++<30);used.add(pre);
      const kind=al==='ma'?pick(['ma','am']):al==='phat'?'phat':pick(['kiem','dan','dao','tran','khi','phu']);const sc={n:pre+' '+pick(SECT_SFX[kind]),al,kind};w.sects.push(sc);
      const near=R0.nodes.map(n=>[n,Math.round(Math.hypot(n.x-p.x,n.y-p.y))]).sort((a,b)=>a[1]-b[1]);
      const n={id:k*100+R0.nodes.length,r:k,x:p.x,y:p.y,type:'tong',name:sc.n,owner:sc.n,sectFix:1,danger:Math.min(1,near[0][0].danger),fog:0,seenT:-1,memory:false,state:'ok',stateUntil:0,explore:0,exploreT:-1,grave:null,cache:null,patron:null,dp:0};
      R0.nodes.push(n);R0.edges.push({a:n.id,b:near[0][0].id,len:near[0][1]});}}
  for(const n of R0.nodes)if(n.type==='tong'&&!n.quy){const x=R();n.quy=x<0.3?1:x<0.65?2:x<0.9?3:4;} // bốn bậc quy mô tông môn
  R0.pass=null;return R0;};}
// ---- quy mô địa điểm ----
// Quy ước: một ô lục giác rộng ~25 dặm (≈ 12 km), diện tích ~540 dặm² (≈ 135 km², cỡ một huyện nhỏ). Cả bản đồ ≈ 2.960 × 1.670 dặm.
// Địa điểm nào cũng chiếm tối thiểu 1 ô dù thực tế bé hơn nhiều (một cái hang chỉ vài chục trượng vẫn là 1 ô).
const HEX_DAM=25,HEX_DAM2=Math.round(HEX_DAM*HEX_DAM*0.866);
// Bảng SIZE_T: content/world/size-t.js
// Bảng TONG_SZ: content/world/tong-sz.js
function placeSize(n){const t=n.type;if(t==='tong'){const z=TONG_SZ[n.quy||1];return ri(z[0],z[1]);}const z=SIZE_T[t]||[1,3];return ri(z[0],z[1]);}
// từ ngữ do hệ thống tính theo loại và số ô thật sự chiếm được
function scaleWord(n,c){const t=n.type;
  if(t==='tong')return c<=4?contentText("core2_33-the-gioi-mo_js.scaleWord.021"):c<=7?'Đồ sộ':c<=9?contentText("core2_33-the-gioi-mo_js.scaleWord.022"):'Bao la';
  if(t==='thanh'||t==='tuthanh')return c<=5?contentText("core2_33-the-gioi-mo_js.scaleWord.023"):'Lớn';
  if(t==='tran'||t==='tutran')return c<=2?'Nhỏ':'Trung';
  return c<=1?contentText("core2_33-the-gioi-mo_js.scaleWord.024"):c===2?'Nhỏ':c===3?'Vừa':c===4?contentText("core2_33-the-gioi-mo_js.scaleWord.025"):c<=6?'Rộng':contentText("core2_33-the-gioi-mo_js.scaleWord.026");}
function placeScale(n){const c=placeCells(n).length;return {c,w:scaleWord(n,c),txt:scaleWord(n,c)+' · '+c+' ô',area:c*HEX_DAM2};}
// Hình mẫu cụm ô cho thành / trấn / tông môn: ảnh trên bản đồ vẽ sẵn đúng theo hình này (tools/dd2-comfy.py, cùng bảng HINH).
const HINH={2:{a:[[0,0],[1,0]],b:[[0,0],[0,1]]},3:{a:[[0,0],[1,0],[0,1]],b:[[0,0],[-1,0],[1,0]]},
  4:{a:[[0,0],[1,0],[-1,1],[0,1]],b:[[0,0],[-1,0],[1,0],[0,1]]},5:{a:[[0,0],[-1,0],[1,0],[-1,1],[0,1]],b:[[0,0],[1,0],[0,-1],[-1,1],[0,1]]},
  7:{a:[[0,0],[1,0],[-1,0],[0,-1],[1,-1],[0,1],[-1,1]],b:[[0,0],[-1,0],[1,0],[2,0],[-1,1],[0,1],[1,1]]},
  9:{a:[[0,0],[1,0],[-1,0],[0,-1],[1,-1],[0,1],[-1,1],[2,0],[-2,0]],b:[[0,0],[0,-1],[1,-1],[-1,0],[1,0],[2,0],[-1,1],[0,1],[1,1]]},
  12:{a:[[0,0],[1,0],[-1,0],[0,-1],[1,-1],[0,1],[-1,1],[2,0],[-2,0],[2,-1],[-2,1],[1,1]],b:[[0,0],[1,0],[-1,0],[0,-1],[1,-1],[0,1],[-1,1],[2,0],[-2,0],[-1,-1],[1,1],[0,2]]}};
const HINH_SZ={thanh:[5,7,9],tuthanh:[4,5],tran:[2,3,4],tutran:[2,3],tong:[4,7,9,12]};
function hinhO(c0,hinh){const C0=c0%HCOLS,R0=(c0-C0)/HCOLS,q0=C0-(R0-(R0&1))/2,out=[];
  for(const [dq,dr] of hinh){const r=R0+dr,q=q0+dq,c=q+(r-(r&1))/2;if(r<0||r>=HROWS||c<0||c>=HCOLS)return null;out.push(r*HCOLS+c);}return out;}
function growPlaces(w){const g=geoFor(w);const all=[];const own=new Map(); // ô -> địa điểm đang chiếm
  for(const R0 of w.regions)for(const n of R0.nodes){all.push(n);own.set(n.hex,n.id);if(n.cells)for(const c of n.cells)own.set(c,n.id);}
  // mỗi địa điểm chừa ít nhất một ô trống quanh mình: ô mới mọc ra không được kề ô của địa điểm khác
  const ok=(c,k,id)=>!own.has(c)&&g.reg[c]===k&&terWalk(g.ter[c])&&g.ter[c]!==4&&hexNb(c).every(b=>!own.has(b)||own.get(b)===id);
  // thành, trấn chỉ dựng trên đất bằng / đồi: núi, rừng phía trước sẽ che mất nhà (ảnh bản đồ vẽ phối cảnh)
  const DB={1:1,6:1},laTT=n=>isTownT(n.type)||isThanhT(n.type);
  for(const n of all)if(laTT(n)&&!n.cells&&!(DB[g.ter[n.hex]]&&O_PHANG[n.hex]==="1")){const k=idReg(n.id);const seen=new Set([n.hex]);let fr=[n.hex],to=-1;
    const dq0=g.dist[n.hex];for(let d=0;d<30&&to<0&&fr.length;d++){const nx=[];for(const u of fr)for(const b of hexNb(u))if(!seen.has(b)){seen.add(b);nx.push(b);if(to<0&&g.dist[b]===dq0&&(DB[g.ter[b]]&&O_PHANG[b]==="1")&&ok(b,k,n.id))to=b;}fr=nx;}
    if(to>=0){own.delete(n.hex);n.hex=to;own.set(to,n.id);const q=hexCenter(to);n.x=Math.round(q[0]*10)/10;n.y=Math.round(q[1]*10)/10;dbg('mo.doiTT',{n:n.name,to});}}
  // số ô còn có thể mọc ra quanh một ô gốc (đếm theo đúng luật mọc ô), tối đa cap
  const reach=(c,k,id,cap)=>{const seen=new Set([c]);let fr=[c];while(fr.length&&seen.size<cap){const nx=[];for(const u of fr)for(const b of hexNb(u))if(!seen.has(b)&&ok(b,k,id)){seen.add(b);nx.push(b);}fr=nx;}return seen.size;};
  const regCells=new Map();const cellsOf=k=>{if(!regCells.has(k)){const L=[];for(let i=0;i<HN;i++)if(g.reg[i]===k&&terWalk(g.ter[i])&&g.ter[i]!==4)L.push(i);regCells.set(k,L);}return regCells.get(k);};
  const uu=n=>isThanhT(n.type)?3:n.type==='tong'?2:laTT(n)?1:0; // thành chọn chỗ trước, rồi tông môn, trấn, sau cùng nơi hoang dã
  all.filter(n=>!n.cells).map(n=>[n,placeSize(n)]).sort((a,b)=>uu(b[0])-uu(a[0])||b[1]-a[1]).forEach(([n,sz])=>{const k=idReg(n.id);
    // tông môn, thành mà chỗ chật không đủ chỗ mọc thì dời sang chỗ rộng hơn
    if((n.type==='tong'||isThanhT(n.type))&&reach(n.hex,k,n.id,sz)<Math.min(sz,n.type==='tong'?4:5)){const L0=cellsOf(k),dq=g.dist[n.hex],Lq=L0.filter(c=>g.dist[c]===dq),L=Lq.length>20?Lq:L0; // ưu tiên dời trong cùng quận
      for(let t=0;t<500;t++){const c=L[Math.floor(R()*L.length)];if(own.has(c)||hexNb(c).some(b=>own.has(b)))continue;if(laTT(n)&&!(DB[g.ter[c]]&&O_PHANG[c]==="1"))continue;if(reach(c,k,n.id,sz)>=sz){own.delete(n.hex);n.hex=c;own.set(c,n.id);const q=hexCenter(c);n.x=Math.round(q[0]*10)/10;n.y=Math.round(q[1]*10)/10;break;}}}
    const HS=HINH_SZ[n.type];
    if(HS){let want=n.type==='tong'?[4,7,9,12][Math.max(0,Math.min(3,(n.quy||1)-1))]:HS.reduce((a,b)=>Math.abs(b-sz)<Math.abs(a-sz)?b:a);
      const dqT=g.dist[n.hex];let cungQ=true,choNui=false;const datTT=c=>(DB[g.ter[c]]&&O_PHANG[c]==="1")||(choNui&&g.ter[c]===3&&O_CHE[c]!=="1"); // đất bằng; hết chỗ thì sườn / đỉnh núi không bị che
      const okT=c=>(!own.has(c)||own.get(c)===n.id)&&g.reg[c]===k&&(!laTT(n)||!cungQ||g.dist[c]===dqT)&&terWalk(g.ter[c])&&g.ter[c]!==4&&(!laTT(n)||datTT(c))&&(n.type!=='tong'||O_CHE[c]!=="1")&&hexNb(c).every(b=>!own.has(b)||own.get(b)===n.id);
      const vs=(hashS('hinh'+n.id)&1)?['b','a']:['a','b'];let got=null;
      const phang=c=>DB[g.ter[c]]&&O_PHANG[c]==='1';
      for(const lan of !laTT(n)?[0]:isThanhT(n.type)?[0,1,2]:[0,1]){cungQ=lan<2;choNui=lan===1;got=null;
      for(const s0 of [want,...[12,9,7,5,4,3,2].filter(x=>x<want),1]){if(got)break;if(s0===1){got={cells:[n.hex],h:'1'};if(laTT(n)&&!datTT(n.hex)){const c1=[...Array(HN).keys()].filter(c=>okT(c)).sort((a,b)=>hexD(a,n.hex)-hexD(b,n.hex))[0];got=c1!=null?{cells:[c1],h:'1',a:c1}:null;}break;}
        const seen=new Set([n.hex]);let fr=[n.hex];
        for(let d=0;d<(n.type==='tong'?60:isThanhT(n.type)?30:16)&&!got&&fr.length;d++){for(const a of fr){for(const v of vs){const L=hinhO(a,HINH[s0][v]);if(L&&L.every(okT)){got={cells:L,h:s0+v,a};break;}}if(got)break;}
          const nx=[];for(const u of fr)for(const b of hexNb(u))if(!seen.has(b)&&g.reg[b]===k){seen.add(b);nx.push(b);}fr=nx;}}
      if(got&&(got.h!=='1'||lan===2||!laTT(n)))break;} // thành chỉ được 1 ô trong quận: thử sang quận khác cùng khu
      if(!got){ // không còn đất bằng nào: trấn thành nơi ẩn cư (núi rừng vẫn ở được)
        n.type='ancu';n.name=placeName('ancu',w);n.danger=0;delete n.hinh;got={cells:[n.hex],h:'1'};dbg('mo.tranAncu',{id:n.id});}
      if(got.a!=null&&got.a!==n.hex){own.delete(n.hex);n.hex=got.a;const q=hexCenter(got.a);n.x=Math.round(q[0]*10)/10;n.y=Math.round(q[1]*10)/10;}
      for(const c of got.cells)own.set(c,n.id);n.cells=got.cells;n.hinh=got.h;return;}
    const set=[n.hex];const inS=new Set(set);
    const okN=laTT(n)?(b=>ok(b,k,n.id)&&(DB[g.ter[b]]&&O_PHANG[b]==="1")):(b=>ok(b,k,n.id));
    while(set.length<sz){const cand=new Map();for(const c of set)for(const b of hexNb(c))if(!inS.has(b)&&okN(b))cand.set(b,(cand.get(b)||0)+1);if(!cand.size)break;
      const L=[...cand];const b=wpick(L,x=>x[1]*x[1]+0.5)[0];set.push(b);inS.add(b);own.set(b,n.id);}
    n.cells=set;});}

// ================= SINH NƠI THEO QUẬN (CHỈ THẾ GIỚI MỚI) =================
// Mỗi quận có số thành, trấn phàm nhân / tu sĩ và nơi hoang dã, bí cảnh theo cỡ quận (bảng NOI_SL, NOI_HOANG: content/world/size-t.js).
// Thế giới mới đánh dấu w.v2=1; bản lưu cũ không có dấu này nên giữ nguyên, chỉ đi qua ensureCounts như trước.
let GEN_NEW=false;
{const _gw=genWorld;genWorld=function(seed){GEN_NEW=true;try{return _gw.apply(this,arguments);}finally{GEN_NEW=false;}};}
function hexD(a,b){const ca=a%HCOLS,ra=(a-ca)/HCOLS,cb=b%HCOLS,rb=(b-cb)/HCOLS;const qa=ca-(ra-(ra&1))/2,qb=cb-(rb-(rb&1))/2,dq=qa-qb,dr=ra-rb;return Math.max(Math.abs(dq),Math.abs(dr),Math.abs(dq+dr));}
function quanCells(g){const Q={};for(let i=0;i<HN;i++){const d=g.dist[i];if(d>=0&&g.reg[i]>=0&&terWalk(g.ter[i]))(Q[d]||(Q[d]={k:g.reg[i],cells:[]})).cells.push(i);}return Q;}
function quanCo(n){const S=NOI_SL;return n<S.nguong[0]?'be':n>S.nguong[1]?'lon':'vua';}
function expandWorld(w){if(w.v2)return;const g=geoFor(w);
  seeded('noi'+w.seed,()=>{
    const all=[];for(const R0 of w.regions)for(const n of R0.nodes)all.push(n);
    const occ=new Uint8Array(HN),b2=new Uint8Array(HN),b3=new Uint8Array(HN);
    const mark=c=>{occ[c]=1;b2[c]=1;b3[c]=1;for(const b of hexNb(c)){b2[b]=1;b3[b]=1;for(const d of hexNb(b))b3[d]=1;}};
    for(const n of all)mark(n.hex);
    const names=w.regions.map(R0=>new Set(R0.nodes.map(x=>x.name)));
    const uname=(k,t)=>{let nm,q=0;do{nm=placeName(t);}while(names[k].has(nm)&&q++<30);names[k].add(nm);return nm;};
    const ter=c=>g.ter[c];
    const TW={1:3,6:2,2:1.2,7:0.3,3:0.35};
    const room=c=>{let r=0;for(const b of hexNb(c)){if(!b2[b]&&terWalk(ter(b)))r++;}return r;};
    const free=(cells,sp)=>{const B=sp===3?b3:b2;return cells.filter(c=>!B[c]&&ter(c)!==4);};
    const pickTown=(cells,thanh)=>{let L=free(cells,3);if(!L.length)L=free(cells,2);if(!L.length)return -1;
      let best=-1,bs=-1;for(let i=0;i<14;i++){const c=L[Math.floor(R()*L.length)];const s=((TW[ter(c)]||0.3)*(1+room(c)*(thanh?0.5:0.2)))*(0.6+R()*0.8);if(s>bs){bs=s;best=c;}}return best;};
    const addNode=(t,c,dg,dp)=>{const k=g.reg[c],R0=w.regions[k];const p=hexCenter(c);
      const near=R0.nodes.map(n=>[n,Math.hypot(n.x-p[0],n.y-p[1])]).sort((a,b)=>a[1]-b[1]);
      const n={id:mkId(k,R0.nodes.length),r:k,x:Math.round(p[0]*10)/10,y:Math.round(p[1]*10)/10,hex:c,wc:1,nw:1,type:t,name:uname(k,t),danger:dg,fog:0,seenT:-1,memory:false,state:'ok',stateUntil:0,explore:0,exploreT:-1,grave:null,cache:null,patron:null,dp:dp?1:0};
      R0.nodes.push(n);all.push(n);mark(c);if(near[0])R0.edges.push({a:n.id,b:near[0][0].id,len:Math.round(near[0][1])});if(near[1])R0.edges.push({a:n.id,b:near[1][0].id,len:Math.round(near[1][1])});return n;};
    const retype=(n,t)=>{n.type=t;n.dp=0;n.name=uname(idReg(n.id),t);n.danger=isTownT(t)?Math.min(n.danger,1):n.danger;delete n.cells;};
    const HK=Object.keys(NOI_HOANG),HW=HK.map(k=>NOI_HOANG[k].w);
    const wildType=c=>{const t=ter(c);let tot=0;const ws=HK.map((k,i)=>{const v=HW[i]*(0.25+(NOI_HOANG[k].ter[t]||0));tot+=v;return v;});let x=R()*tot;for(let i=0;i<HK.length;i++){x-=ws[i];if(x<=0)return HK[i];}return HK[0];};
    const wildAdd=(c,t)=>{const H=NOI_HOANG[t];return addNode(t,c,ri(H.d[0],H.d[1]),H.dp);};
    const Q=quanCells(g);
    for(const d of Object.keys(Q).map(Number).sort((a,b)=>a-b)){const {k,cells}=Q[d],R0=w.regions[k];const q=NOI_SL[quanCo(cells.length)];
      const want={thanh:ri(...q.thanhPham),tuthanh:ri(...q.thanhTu),tran:ri(...q.tranPham),tutran:ri(...q.tranTu)};
      const have={thanh:[],tuthanh:[],tran:[],tutran:[]},extra=[];
      const ex=R0.nodes.filter(n=>g.dist[n.hex]===d&&!n.dp&&!n.sectFix&&(n.type==='thanh'||n.type==='tran'));
      for(const n of ex.filter(n=>n.type==='thanh')){if(have.thanh.length<want.thanh)have.thanh.push(n);else if(have.tuthanh.length<want.tuthanh){retype(n,'tuthanh');have.tuthanh.push(n);}else extra.push(n);}
      for(const n of ex.filter(n=>n.type==='tran')){if(have.tran.length<want.tran)have.tran.push(n);else if(have.tutran.length<want.tutran){retype(n,'tutran');have.tutran.push(n);}else extra.push(n);}
      for(const n of extra.slice()){if(have.tran.length<want.tran){retype(n,'tran');have.tran.push(n);}else if(have.tutran.length<want.tutran){retype(n,'tutran');have.tutran.push(n);}else{const t=wildType(n.hex);retype(n,t);const H=NOI_HOANG[t];n.danger=ri(H.d[0],H.d[1]);n.dp=H.dp?1:0;}}
      for(const t of ['thanh','tuthanh','tran','tutran'])for(const n of have[t])n.danger=Math.min(n.danger,1);
      for(const t of ['thanh','tuthanh','tran','tutran'])while(have[t].length<want[t]){const c=pickTown(cells,t==='thanh'||t==='tuthanh');if(c<0)break;have[t].push(addNode(t,c,0,0));}
      const nh=ri(...q.hoang);for(let i=0;i<nh;i++){let L=free(cells,3);if(!L.length)L=free(cells,2);if(!L.length)break;
        const t=wildType(L[Math.floor(R()*L.length)]);const H=NOI_HOANG[t];let best=-1,bs=-1;for(let j=0;j<10;j++){const c=L[Math.floor(R()*L.length)];const s=(0.25+(H.ter[ter(c)]||0))*(0.6+R()*0.8);if(s>bs){bs=s;best=c;}}wildAdd(best,t);}}
    // bảo đảm thế giới có đủ mọi loại nơi mới (đổi bớt một nơi hoang dã sẵn có nếu thiếu)
    for(const t of ['bicanh','dongthien','como','yeusao','ditich']){if(all.some(n=>n.type===t))continue;
      const n=all.find(n=>!n.dp&&!n.sectFix&&['rung','nui','phe','hoang','dam'].includes(n.type));if(n){retype(n,t);n.danger=ri(NOI_HOANG[t].d[0],NOI_HOANG[t].d[1]);}}
  });
  w.v2=1;w.ens=1;dbg('mo.noi',{n:w.regions.reduce((s,R0)=>s+R0.nodes.length,0)});}
// mỗi đại khu vực có ít nhất 3 thành, mỗi quận có ít nhất 2 trấn (chuyển loại địa điểm sẵn có hoặc thêm mới), chỉ làm một lần cho mỗi thế giới
function ensureCounts(w){if(w.ens===1)return;const g=geoFor(w);const all=[];for(const R0 of w.regions)for(const n of R0.nodes)all.push(n);
  const blocked=new Set();const ring=c=>{blocked.add(c);for(const b of hexNb(c)){blocked.add(b);for(const d of hexNb(b))blocked.add(d);}};for(const n of all)ring(n.hex);
  const freeCell=(c,k)=>!blocked.has(c)&&g.reg[c]===k&&terWalk(g.ter[c])&&g.ter[c]!==4;
  const SOFT=['rung','nui','song','hoang','phe','bien','dam','linhdia','duoc','cho','ancu','khoang','dong'];
  const conv=(n,t)=>{n.type=t;n.dp=0;const R0=w.regions[idReg(n.id)];const used=new Set(R0.nodes.map(x=>x.name));let nm,q=0;do{nm=placeName(t);}while(used.has(nm)&&q++<12);n.name=nm;n.danger=Math.min(n.danger,t==='tran'||t==='thanh'?1:n.danger);delete n.cells;};
  const add=(k,t,c)=>{const R0=w.regions[k];if(R0.nodes.length>=97)return null;const used=new Set(R0.nodes.map(x=>x.name));let nm,q=0;do{nm=placeName(t);}while(used.has(nm)&&q++<12);const p=hexCenter(c);
    const near=R0.nodes.map(n=>[n,Math.hypot(n.x-p[0],n.y-p[1])]).sort((a,b)=>a[1]-b[1]);
    const n={id:k*100+R0.nodes.length,r:k,x:Math.round(p[0]*10)/10,y:Math.round(p[1]*10)/10,hex:c,wc:1,type:t,name:nm,danger:0,fog:0,seenT:-1,memory:false,state:'ok',stateUntil:0,explore:0,exploreT:-1,grave:null,cache:null,patron:null,dp:0};
    R0.nodes.push(n);all.push(n);ring(c);if(near[0])R0.edges.push({a:n.id,b:near[0][0].id,len:Math.round(near[0][1])});if(near[1])R0.edges.push({a:n.id,b:near[1][0].id,len:Math.round(near[1][1])});return n;};
  const pickCell=(cells,k)=>{const L=cells.filter(c=>freeCell(c,k));return L.length?L[Math.floor(R()*L.length)]:-1;};
  const regCells=k=>{const L=[];for(let i=0;i<HN;i++)if(g.reg[i]===k)L.push(i);return L;};
  for(let k=0;k<5;k++){const R0=w.regions[k];let have=R0.nodes.filter(n=>n.type==='thanh').length;
    while(have<3){const cand=R0.nodes.filter(n=>!['tong','thanh','sao'].includes(n.type)&&!n.dp&&!n.sectFix);cand.sort((a,b)=>(a.type==='tran')-(b.type==='tran'));
      if(cand.length>8){conv(cand[0],'thanh');have++;continue;}const c=pickCell(regCells(k),k);if(c<0)break;if(add(k,'thanh',c))have++;else break;}}
  const dc=new Map();for(let i=0;i<HN;i++){const d=g.dist[i];if(d>=0&&g.reg[i]>=0){if(!dc.has(d))dc.set(d,{k:g.reg[i],cells:[]});dc.get(d).cells.push(i);}}
  for(const [d,D] of dc){const k=D.k,R0=w.regions[k];let have=R0.nodes.filter(n=>n.type==='tran'&&g.dist[n.hex]===d).length;
    while(have<2){const cand=R0.nodes.filter(n=>g.dist[n.hex]===d&&SOFT.includes(n.type)&&!n.dp&&!n.sectFix);
      if(cand.length){conv(cand[Math.floor(R()*cand.length)],'tran');have++;continue;}const c=pickCell(D.cells,k);if(c<0)break;if(add(k,'tran',c))have++;else break;}}
  w.ens=1;}
{const _sw=snapWorld;snapWorld=function(w){_sw(w);if(w&&w.regions){if(GEN_NEW&&!w.v2&&!w.ens)expandWorld(w);ensureCounts(w);if(w.sep!==3){for(const R0 of w.regions)for(const n of R0.nodes)delete n.cells;w.sep=3;}growPlaces(w);}};}
function placeCells(n){return n&&n.cells&&n.cells.length?n.cells:n?[nodeHex(n)]:[];}
function canGoBack(){return false;}

// sinh ra ở bất cứ trấn nào trên bản đồ
function birthNode(){const w=W();const all=[];for(const R0 of w.regions)for(const n of R0.nodes)all.push(n);
  let pool=all.filter(n=>n.type==='tran'&&n.id!==w.lastBirth&&n.state!=='ruin');if(!pool.length)pool=all.filter(n=>n.type==='tran'||n.type==='thanh');return pick(pool);}
{const _nr=newRun;newRun=function(){const x=_nr.apply(this,arguments);const r=G.run;if(r){r.rid=Date.now()+'.'+Math.floor(Math.random()*1e6);r.reveal=[];r.visS='';visReset();sense();
  if(r.scene&&r.scene.type==='region')r.scene.text=T(REG[r.region].intro,{que:r.que});dbg('mo.spawn',{at:r.at,area:r.region,ten:r.ten});}return x;};}

// tới một địa điểm: biết mình đang ở đại khu vực nào
{const _ar=arrive;arrive=function(id){const r=G.run;const k=idReg(id);const was=r.region;r.region=k;r.maxRegion=Math.max(r.maxRegion||0,k);
  const x=_ar.apply(this,arguments);
  if(was!==k&&r.areas&&!r.areas.includes(k)){r.areas.push(k);if(typeof note==='function')note(contentText("core2_33-the-gioi-mo_js.027")+REG[k].n+': '+REG[k].sub.toLowerCase()+'.');dbg('mo.area',{from:was,to:k});}
  if(!r.areas)r.areas=[k];return x;};}

// ---- tầm nhìn theo địa hình ----
// Đồng bằng nhìn bình thường, sông hồ và vân hải nhìn xa hơn, rừng đồi che bớt, núi cao chặn hẳn (thấy núi nhưng không thấy sau núi).
// Đứng trên cao nhìn xa hơn.
// Bảng VIS_COST: content/world/vis-cost.js
let VIS=null,VNOW=null,VT=null,VIS_K='',VIS_N=0;
function visKey(){return G.run?(G.run.rid||'')+':'+G.run.kiep:'';}
function visReset(){VIS=new Uint8Array(HN);VNOW=new Uint8Array(HN);VT=new Float64Array(HN);VIS_K=visKey();VIS_N++;}
function visNowMs(){return typeof performance!=='undefined'?performance.now():Date.now();}
function visLoad(){const r=G.run;if(!r)return;if(VIS&&VIS_K===visKey())return;visReset();
  const s=r.visS||'';for(let j=0;j<s.length;j++){const v=VIS_A.indexOf(s[j]);if(v<=0)continue;for(let b=0;b<6;b++)if(v&(1<<b)){const i=j*6+b;if(i<HN)VIS[i]=1;}}}
// ô đã thấy lưu thành chuỗi: mỗi ký tự giữ 6 ô
const VIS_A='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
function visSave(){const r=G.run;if(!r||!VIS)return;let s='';for(let j=0;j*6<HN;j++){let v=0;for(let b=0;b<6;b++)if(VIS[j*6+b])v|=1<<b;s+=VIS_A[v];}r.visS=s;}
function visCells(h,R){const g=geo();const e0=g.el[h];R*=1+Math.min(0.6,e0*0.07);
  const D=new Float64Array(HN).fill(1e9);D[h]=0;const out=[h];const hp=[[0,h]];
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
function moFixRun(){const r=G.run;if(!r)return;const n=birthNode();r.at=n.id;r.region=idReg(n.id);r.moving=null;r.reveal=[];r.visS='';r.quests=[];r.passes=[];r.place={n:n.name,t:n.type};
  if(r.scene&&r.scene.type!=='combat')r.scene=null;visReset();arrive(n.id);dbg('mo.migrate',{at:n.id});}
if(typeof loadData==='function'){const _ld=loadData;loadData=function(d){
  const old=d&&d.meta&&d.meta.world&&!d.meta.world.mo;
  if(old){const w0=d.meta.world;const w=genWorld();for(const k of ['t','bangY','legacy','chron','nemesis','rstate','rivals','sects','quoc'])if(w0[k]!=null)w[k]=w0[k];w.ents=[];d.meta.world=w;}
  const x=_ld.apply(this,arguments);if(old)moFixRun();if(G.run){visReset();visLoad();sense();}return x;};}

// thống kê một đại khu vực cho thẻ mô tả: địa thế chính, tỉ lệ đã khám phá, số quận
function areaStat(k){const g=geo();visLoad();const tc={};let land=0,seen=0;const ds=new Set();
  for(let i=0;i<HN;i++){if(g.reg[i]!==k)continue;if(g.dist[i]>=0)ds.add(g.dist[i]);if(!terWalk(g.ter[i]))continue;land++;if(VIS&&(VIS[i]||VNOW[i]))seen++;const t=TER_N[g.ter[i]];tc[t]=(tc[t]||0)+1;}
  return {ter:Object.keys(tc).sort((a,b)=>tc[b]-tc[a]).slice(0,3),pct:land?Math.round(seen*100/land):0,quan:ds.size,land};}

// ================= ĐI TỚI Ô ĐẤT BẤT KỲ =================
// Điểm dừng tạm ("điểm hoang"): nút ngoài danh sách địa điểm, id = khu*100 + 90..99, lưu ở w.wp. Máy chạy y như một địa điểm hoang bình thường.
// Bảng WP0, WP_TY, WP_BASE: content/rules/wp0.js
{const _nb=nodeById;nodeById=function(id){if(id<1000&&id%100>=WP0){const w=W();return w&&w.wp&&w.wp[id]||undefined;}return _nb(id);};}
function wpGC(){const r=G.run,w=W();if(!r||!w||!w.wp)return;const keep=new Set([r.at,r.dest]);if(r.moving)for(const id of r.moving.path)keep.add(id);for(const id in w.wp)if(!keep.has(+id))delete w.wp[id];}
function wpDraft(c){const g=geo(),k=g.reg[c],t=g.ter[c];if(k<0||!terWalk(t))return null;
  let nd=null,bd=1e9;const [cx,cy]=hexCenter(c);for(const n of regionOf(k).nodes){const p=mapXY(k,n.x,n.y),d=Math.hypot(p[0]-cx,p[1]-cy);if(d<bd){bd=d;nd=n;}}
  const dg=clamp(Math.round((WP_BASE[t]+(nd?nd.danger:1))/2),0,3);
  return {id:-1,r:k,wp:1,hex:c,type:WP_TY[t],name:TER_N[t]+contentText("core2_33-the-gioi-mo_js.wpDraft.028"),danger:dg,fog:3,seenT:W().t,memory:false,state:'ok',stateUntil:0,explore:0,exploreT:-1,grave:null,cache:null,patron:null,dp:0,x:invXY(k,cx,cy)[0],y:invXY(k,cx,cy)[1]};}
function wpMake(c){const w=W();wpGC();w.wp=w.wp||{};for(const id in w.wp)if(w.wp[id].hex===c)return w.wp[id];
  const d=wpDraft(c);if(!d)return null;let s=0;while(w.wp[d.r*100+WP0+s]&&s<9)s++;d.id=d.r*100+WP0+s;w.wp[d.id]=d;return d;}
function cellHours(c){const r=G.run;const a=nodeById(r.at);if(!a)return null;const h=nodeHex(a);if(h===c)return 0;const L=hexPath(h,c).len;return L/walkSpeed();}
{const _arr=arrive;arrive=function(id){_arr(id);wpGC();};}
