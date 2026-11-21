// ---------------- CHỦ CỦA THÀNH, TRẤN (CHỈ THẾ GIỚI MỚI, w.v2) ----------------
// Thành/trấn phàm nhân: chủ = Hoàng quốc của quận (mỗi đại khu vực chia quận làm hai nhóm liền nhau, mỗi nhóm một Hoàng quốc: HQ_KV).
// Thành/trấn tu sĩ: chủ = tông môn (nút 'tong') hoặc thế lực tu sĩ có căn cứ neo (FA_TU) gần nhất trong cùng đại khu.
// Lưu trên nút: n.fa = 'FAxx' hoặc 'tong:<id nút>'. Thế giới sinh từ bản cũ không có n.fa, các hệ khác dùng cách cũ.
function hqNhom(w){const g=geoFor(w);const by={};
  for(let i=0;i<HN;i++){const d=g.dist[i],k=g.reg[i];if(d<0||k<0||!terWalk(g.ter[i]))continue;const o=by[d]||(by[d]={k,x:0,y:0,n:0});const p=hexCenter(i);o.x+=p[0];o.y+=p[1];o.n++;}
  const res={};
  for(let k=0;k<5;k++){const L=Object.keys(by).map(Number).filter(d=>by[d].k===k).sort((a,b)=>a-b);if(!L.length)continue;
    for(const d of L){by[d].cx=by[d].x/by[d].n;by[d].cy=by[d].y/by[d].n;}
    let a=L[0],b=L[0],bd=-1;for(const p of L)for(const q of L){const dd=Math.hypot(by[p].cx-by[q].cx,by[p].cy-by[q].cy);if(dd>bd){bd=dd;a=p;b=q;}}
    const vx=by[b].cx-by[a].cx,vy=by[b].cy-by[a].cy;
    const S=L.map(d=>[d,(by[d].cx-by[a].cx)*vx+(by[d].cy-by[a].cy)*vy]).sort((x,y)=>x[1]-y[1]||x[0]-y[0]);
    S.forEach(([d],i)=>{res[d]=i<Math.ceil(S.length/2)?0:1;});}
  return res;}
function chuTen(f){if(!f)return '';if(f.startsWith('tong:')){const n=nodeById(+f.slice(5));return n?n.name:'';}return THE_LUC[f]?THE_LUC[f].n:'';}
function chuGan(w){const g=geoFor(w);const G2=hqNhom(w);w.hqG=G2;
  const all=[];for(const R0 of w.regions)for(const n of R0.nodes)all.push(n);
  // nhóm nào có Lương Kinh thì là của Lương triều (FA01); nhóm kia là nước còn lại của đại khu
  const hq=HQ_KV.map(p=>p.slice());const lk=anchorOf(w,'LOC02');
  if(lk){const gi=G2[g.dist[lk.hex]];if(gi===1)hq[0]=[hq[0][1],hq[0][0]];}
  const tuCS=[];for(const n of all)if(n.type==='tong')tuCS.push({f:'tong:'+n.id,n});
  for(const id of FA_TU){const a=anchorOf(w,THE_LUC[id].noi);if(a)tuCS.push({f:id,n:a});}
  for(const n of all){if(!isTownT(n.type))continue;const k=idReg(n.id);
    if(isTuT(n.type)){let best=null,bd=1e18;for(const c of tuCS){if(idReg(c.n.id)!==k)continue;const d=Math.hypot(c.n.x-n.x,c.n.y-n.y);if(d<bd){bd=d;best=c.f;}}
      if(!best)for(const c of tuCS){const d=Math.hypot(c.n.x-n.x,c.n.y-n.y);if(d<bd){bd=d;best=c.f;}}
      n.fa=best;}
    else{const gi=G2[g.dist[n.hex]];n.fa=hq[k][gi==null?0:gi];}}
  w.chu1=1;dbg('chu.gan',{n:all.filter(n=>n.fa).length});}
{const _sw=snapWorld;snapWorld=function(w){_sw(w);if(w&&w.regions&&w.v2&&!w.chu1)chuGan(w);};}
// ---- chữ GPT đợt bảy (content/world/noi-chu.js): câu lúc tới lần đầu, tin đồn ở trà lâu, phong tục Hoàng quốc ----
function noiChu(t){return typeof NOI_CHU!=='undefined'?NOI_CHU[t]||null:null;}
function hqChu(fa){return typeof HQ_CHU!=='undefined'&&fa?HQ_CHU[fa]||null:null;}
{const _ar=arrive;arrive=function(id){const n=nodeById(id);const lan1=n&&n.fog<3&&!n.seenT;const x=_ar.apply(this,arguments);
  const C=n&&noiChu(n.type);if(lan1&&C&&C.den&&C.den.length&&G.run){log(C.den[hashS('den'+n.id)%C.den.length]);dbg('chu.den',{t:n.type});}return x;};}
{const _th=teaHouse;teaHouse=function(n){const res=_th.apply(this,arguments);const C=n&&noiChu(n.type),sc=G.run&&G.run.scene;
  if(C&&C.tin&&C.tin.length&&sc&&Array.isArray(sc.msg)&&chance(0.5))sc.msg.push(pick(C.tin));return res;};}
{const _pm=placeMeta;placeMeta=function(n){const o=_pm.apply(this,arguments);
  if(o&&n&&n.fa&&isTownT(n.type)&&!isTuT(n.type)){const H=hqChu(n.fa);if(H&&H.tuc&&H.tuc.length){const t=H.tuc[hashS('tuc'+n.id)%H.tuc.length];o.desc=(o.desc?o.desc+' ':'')+t;}}return o;};}
