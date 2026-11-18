// Sửa-A (người dùng chốt câu 9, 17): bốn phẩm linh thạch, đổi phẩm theo nơi, chỉ số NHU CẦU, cửa hàng theo nơi,
// hiệu cầm đồ (kênh gián tiếp hiếm), sự kiện phàm nhân dùng tiền phàm. Bảng: TIEN2 ở content/rules/tien.js.
FEAT.nc=1;
// ---------- linh thạch bốn phẩm: r.st = Hạ phẩm (giữ cho mã cũ), r.lt = [Trung, Thượng, Cực] ----------
function ltArr(r){r=r||G.run;if(!r)return [0,0,0];if(!Array.isArray(r.lt))r.lt=[0,0,0];return r.lt;}
function ltGet(k,r){r=r||G.run;if(!r)return 0;return k===0?(r.st||0):(ltArr(r)[k-1]||0);}
function ltAdd(k,x,why){const r=G.run;if(!r||!x)return 0;const v0=ltGet(k);const v=Math.max(0,v0+Math.round(x));if(k===0)r.st=v;else ltArr(r)[k-1]=v;dbg('lt.add',{k,x:v-v0,why:why||''});return v-v0;}
function ltName(k){return TIEN2.pham[k]||TIEN2.pham[0];}
// dòng chữ hầu bao: "12 Hạ · 1 Trung"
function ltTxt(r){r=r||G.run;const L=[];for(let k=0;k<4;k++){const v=ltGet(k,r);if(v||k===0)L.push(fmtN(v)+' '+ltName(k).replace(' phẩm',''));}return L.join(' · ');}
// bản lưu cũ: linh thạch cũ là Hạ phẩm; bạc cũ ghi bằng "đồng" = xu (1:1) nên số giữ nguyên
{const _r=run2;run2=function(){const r=_r.apply(this,arguments);if(r&&!r._xuV1){r._xuV1=1;ltArr(r);if(!(r.bac>=0))r.bac=0;dbg('tien.xuV1',{bac:r.bac,st:r.st});}return r;};}
{const _nr=newRun;newRun=function(c){const res=_nr.apply(this,arguments);const r=G.run;if(r){r.lt=[0,0,0];r._xuV1=1;}return res;};}

// ---------- NHU CẦU theo nơi × vật phẩm ----------
// Dao động: mỗi `chu` tháng một mốc ngẫu nhiên theo (nơi, món, mốc), nội suy giữa hai mốc → không cần lưu.
// Người chơi mua/bán: W().nc[nút][món] = [độ đẩy, tháng]; phai ×phai mỗi tháng; xoá khi gần 0 → bản lưu nhỏ.
function ncHash(s){let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619);}return ((h>>>0)%10000)/10000;}
function ncMonth(){return Math.floor(W().t/HM);}
function ncBase(nid,key,m){const C=TIEN2.nc,q=m/C.chu,a=Math.floor(q),f=q-a;const v=i=>ncHash(nid+'|'+key+'|'+i)*2-1;return 1+C.dao*(v(a)*(1-f)+v(a+1)*f);}
function ncPushNow(nid,key){const w=W();const x=w.nc&&w.nc[nid]&&w.nc[nid][key];if(!x)return 0;return x[0]*Math.pow(TIEN2.nc.phai,Math.max(0,ncMonth()-x[1]));}
function ncGet(nid,key){if(!feat('nc')||nid==null)return 1;const C=TIEN2.nc;return clamp(ncBase(String(nid),key,ncMonth())+ncPushNow(nid,key),C.min,C.max);}
function ncPush(nid,key,x){if(nid==null||!x)return;const w=W();const N=(w.nc=w.nc||{});const p=clamp(ncPushNow(nid,key)+x,-0.4,0.4);
  if(Math.abs(p)<0.01){if(N[nid]){delete N[nid][key];if(!Object.keys(N[nid]).length)delete N[nid];}}
  else (N[nid]=N[nid]||{})[key]=[Math.round(p*1000)/1000,ncMonth()];dbg('nc.push',{nid,key,x,p:Math.round(p*100)/100});}
function ncWord(d){return contentText(d>=1.08?'nc.cao':d<=0.92?'nc.thap':'nc.vua')+' ('+Math.round(d*100)+'%)';}
function ncKey(it){if(!it)return 'x';if(it.k==='pill')return 'dan:'+it.id;if(it.k==='skill')return 'sk';if(it.k==='relic')return it.rel&&it.rel.k==='book'?'sach':'pb';if(it.k==='qi')return 'qi:'+it.id;return it.k||'x';}
// dọn mục đã phai hết (gọi mỗi tháng)
function ncPrune(){const w=W();if(!w||!w.nc)return;for(const nid in w.nc){for(const k in w.nc[nid])if(Math.abs(ncPushNow(nid,k))<0.01)delete w.nc[nid][k];if(!Object.keys(w.nc[nid]).length)delete w.nc[nid];}}
{const _th=timeHooks;timeHooks=function(){const o=_th.apply(this,arguments);const w=G.run&&W();if(w&&w.nc&&w.ncM!==ncMonth()){w.ncM=ncMonth();ncPrune();}return o;};}

// ---------- đổi phẩm linh thạch (không ngang giá hai chiều) ----------
VENUE_N.doilt=contentText('lt.doi');VENUE_IN.doilt=[contentText('lt.doiIn1'),contentText('lt.doiIn2')];
function ltPlace(n){if(!n||n.state==='ruin')return null;if(n.type==='tong')return (G.run.flags.tongmon&&typeof contentOwnSect==='function'&&contentOwnSect(n))?TIEN2.doi.tong:null;return TIEN2.doi[n.type]||null;}
function ltLech(n){return ncHash('lech|'+n.id)*2-1;}
// đổi xuống: 1 viên phẩm k+1 → bao nhiêu viên phẩm k (80–101)
function ltXuong(n,k){const D=ltPlace(n);const b=D.xuong[k]+Math.round(ltLech(n)*TIEN2.lech);return clamp(Math.round(b*ncGet(n.id,'lt'+(k+1))/ncGet(n.id,'lt'+k)),80,101);}
// đổi lên: bao nhiêu viên phẩm k để lấy 1 viên phẩm k+1 (luôn > 100)
function ltLen(n,k){const D=ltPlace(n);const f=D.len[k]+ltLech(n)*TIEN2.lech/100;return Math.max(101,Math.ceil(100*f*ncGet(n.id,'lt'+(k+1))/ncGet(n.id,'lt'+k)));}
function ltLenLeft(n,k){const D=ltPlace(n);const w=W(),m=ncMonth();const T=(w.doilt=w.doilt||{})[n.id];const used=T&&T.m===m?(T.n[k]||0):0;return Math.max(0,(D.lenThang[k]||0)-used);}
function ltLenUse(n,k){const w=W(),m=ncMonth();const T=(w.doilt=w.doilt||{});if(!T[n.id]||T[n.id].m!==m)T[n.id]={m,n:[0,0,0]};T[n.id].n[k]++;}
{const _pa=placeActs;placeActs=function(n){const L=_pa.apply(this,arguments);if(!G.run||!feat('tien'))return L;
  if(ltPlace(n)&&!L.some(x=>x.a==='doilt'))L.push({a:'doilt',i:'💠',l:contentText('lt.doi'),h:0,tip:contentText('lt.doiTip'),dis:false,x:''});
  if(TIEN2.cam.noi.includes(n.type)&&n.state!=='ruin'&&!L.some(x=>x.a==='camdo'))L.push({a:'camdo',i:'🏚️',l:contentText('cam.n'),h:0,tip:contentText('cam.tip'),dis:false,x:''});
  // bảo khố tông môn: đồ tu sĩ nhiều ở tông mình
  if(n.type==='tong'&&n.state!=='ruin'&&G.run.flags.tongmon&&typeof contentOwnSect==='function'&&contentOwnSect(n)&&!L.some(x=>x.a==='taphoa'))L.push({a:'taphoa',i:'🏯',l:contentText('bk.n'),h:1,tip:contentText('bk.tip'),dis:false,x:''});
  return L;};}
{const _vo=venueOpts;venueOpts=function(n,v){if(v!=='doilt')return _vo.apply(this,arguments);const D=ltPlace(n);if(!D)return [];const L=[];
  for(let k=0;k<=D.max;k++){const c=ltLen(n,k),g=ltXuong(n,k),left=ltLenLeft(n,k);
    L.push({id:'len:'+k,l:contentText('lt.len',[c,ltName(k),ltName(k+1)])+' · '+contentText('lt.ncNgan',[ncWord(ncGet(n.id,'lt'+(k+1)))]),d:contentText('lt.lenD',[ncWord(ncGet(n.id,'lt'+(k+1)))]),h:0,st:0,g:{txt:'1 '+ltName(k+1)},
      no:!left?contentText('lt.het'):ltGet(k)<c?contentText('lt.khongDu'):''});
    L.push({id:'xuong:'+k,l:contentText('lt.xuong',[ltName(k+1),g,ltName(k)])+' · '+contentText('lt.ncNgan',[ncWord(ncGet(n.id,'lt'+k))]),d:contentText('lt.xuongD',[ncWord(ncGet(n.id,'lt'+k))]),h:0,st:0,g:{txt:g+' '+ltName(k)},
      no:ltGet(k+1)<1?contentText('lt.khongDu'):''});}
  return L;};}
function ltDoi(n,id){const o=venueOpts(n,'doilt').find(x=>x.id===id);if(!o||o.no)return false;const [dir,ks]=id.split(':');const k=+ks;const C=TIEN2.nc.day;
  if(dir==='len'){const c=ltLen(n,k);ltAdd(k,-c,'doi');ltAdd(k+1,1,'doi');ltLenUse(n,k);ncPush(n.id,'lt'+(k+1),C);ncPush(n.id,'lt'+k,-C/2);dbg('lt.doi',{dir,k,c});return [chip('💠','−'+c+' '+ltName(k),'Linh thạch','dn'),chip('💠','+1 '+ltName(k+1),'Linh thạch','up')];}
  const g=ltXuong(n,k);ltAdd(k+1,-1,'doi');ltAdd(k,g,'doi');ncPush(n.id,'lt'+(k+1),-C);ncPush(n.id,'lt'+k,C/2);dbg('lt.doi',{dir,k,g});
  return [chip('💠','−1 '+ltName(k+1),'Linh thạch','dn'),chip('💠','+'+g+' '+ltName(k),'Linh thạch','up')];}

// ---------- hiệu cầm đồ: kênh gián tiếp hiếm để đồ tu sĩ ra tiền phàm (linh thạch thì không nhận) ----------
VENUE_N.camdo=contentText('cam.n');VENUE_IN.camdo=[contentText('cam.in1'),contentText('cam.in2')];
function camLeft(n){const w=W(),m=ncMonth();const T=(w.camdo=w.camdo||{})[n.id];return Math.max(0,TIEN2.cam.thang-(T&&T.m===m?T.n:0));}
function camGia(n,it){return Math.max(1,Math.round(it.p0*TIEN2.cam.xuPer*ncGet(n.id,'cam')));}
{const _vo=venueOpts;venueOpts=function(n,v){if(v!=='camdo')return _vo.apply(this,arguments);const left=camLeft(n);
  const L=sellList().map(it=>({id:it.k+':'+it.i,l:contentText('cam.l',[it.n]),d:contentText('cam.d'),h:0,st:0,g:{txt:fmtBac(camGia(n,it))},no:left?'':contentText('cam.het')}));
  return L.length?L:[{id:'none',l:contentText('cam.khong'),d:'',h:0,st:0,no:contentText('cam.khong')}];};}
function camDo(n,id){if(!camLeft(n))return false;const [k,is]=id.split(':');const it=sellList().find(x=>x.k===k&&x.i===+is);if(!it)return false;const r=G.run;const g=camGia(n,it);
  if(k==='r'){const rel=r.relics[it.i];r.relics.splice(it.i,1);const c=run2().chu;for(let j=0;j<8;j++)if(c[j]&&c[j].k==='r'&&c[j].n===rel.name)c[j]=null;clampHp();}else r.pills.splice(it.i,1);
  bacAdd(g,'camdo');const w=W(),m=ncMonth();const T=(w.camdo=w.camdo||{});if(!T[n.id]||T[n.id].m!==m)T[n.id]={m,n:0};T[n.id].n++;ncPush(n.id,'cam',-TIEN2.nc.day);dbg('cam.do',{n:it.n,g});return [bacChip(g)];}
{const _vd=venueDo;venueDo=function(v,id){if(v!=='doilt'&&v!=='camdo')return _vd.apply(this,arguments);const r=G.run,sc=r&&r.scene;if(!sc||sc.type!=='place')return false;
  const n=nodeById(sc.id);const ch=v==='doilt'?ltDoi(n,id):camDo(n,id);if(!ch)return false;
  sc.msg=[contentText(v==='doilt'?'lt.xong':'cam.xong')];sc.chips=ch;sc.venue=null;sc.seq=(sc.seq||0)+1;saveSoon();return true;};}

// ---------- bán đồ ở tiệm: giá theo nhu cầu nơi đó ----------
{const _sl=sellList;sellList=function(){const L=_sl.apply(this,arguments);const r=G.run;for(const it of L){it.p0=it.p;const key=it.k==='r'?'pb':'dan:'+(r.pills[it.i]&&r.pills[it.i].id);it.nc=key;it.p=Math.max(1,Math.round(it.p*ncGet(r.at,key)));}return L;};}
{const _si=sellItem;sellItem=function(k,i){const r=G.run;const it=sellList().find(x=>x.k===k&&x.i===i);const n0=r.relics.length+r.pills.length;_si.apply(this,arguments);
  if(it&&G.run&&G.run.relics.length+G.run.pills.length<n0)ncPush(r.at,it.nc,-TIEN2.nc.day);};}

// ---------- cửa hàng: tạp hóa thành trấn chủ yếu đồ phàm; tông môn có bảo khố ----------
function shopCultivator(it){return (it.k==='pill'||it.k==='skill'||it.k==='relic')&&!it.bac;}
function shopPrice(nid,it){const d=ncGet(nid,it.nc);if(it.b0)it.bac=Math.max(1,Math.round(it.b0*d));else if(it.p0)it.p=Math.max(1,Math.round(it.p0*d));}
{const _os=openShop;openShop=function(n){const o=_os.apply(this,arguments);const r=G.run,sc=r&&r.scene;if(!sc||sc.type!=='shop'||!feat('tien'))return o;const items=sc.items;
  if(items.some(x=>x.nc!=null))return o; // hàng tháng này đã bày
  const cap=n?TIEN2.shop[n.type]:null;
  if(cap!=null){const idx=items.map((x,i)=>shopCultivator(x)?i:-1).filter(i=>i>=0);const keep=new Set();const pool=idx.slice();
    while(keep.size<cap&&pool.length)keep.add(pool.splice(Math.floor(R()*pool.length),1)[0]);
    for(let i=items.length-1;i>=0;i--)if(shopCultivator(items[i])&&!keep.has(i))items.splice(i,1);
    for(const h of TIEN2.hang)if(!items.some(x=>x.k==='qi'&&x.id===h.id))items.push({k:'qi',id:h.id,bac:h.bac,p:0,qty:h.qty});}
  if(n&&n.type==='tong'){const rel=genRelic(clamp(rT()+1,0,4));items.push({k:'relic',rel,p:price(70+rel.tier*45),qty:1});const id=rollPill();items.push({k:'pill',id,q:0,p:price(PILL[id].p),qty:ri(1,3)});}
  const nid=n?n.id:r.at;
  for(const it of items){it.nc=ncKey(it);if(it.bac)it.b0=it.bac;else it.p0=it.p;shopPrice(nid,it);}
  dbg('shop.bay',{type:n&&n.type,tu:items.filter(shopCultivator).length,n:items.length});return o;};}
{const _by=buy;buy=function(i){const r=G.run,sc=r&&r.scene;const it=sc&&sc.items&&sc.items[i];if(!it||it.nc==null)return _by.apply(this,arguments);
  const q0=it.qty==null?1:it.qty,s0=!!it.sold;const res=_by.apply(this,arguments);const q1=it.qty==null?(it.sold?0:1):it.qty;
  if(G.run&&(q1<q0||(!s0&&it.sold))){const nid=sc.node!=null?sc.node:G.run.at;ncPush(nid,it.nc,TIEN2.nc.day);for(const x of sc.items)if(x.nc===it.nc&&!x.sold)shopPrice(nid,x);}
  return res;};}
// đồ phàm dùng trong túi
{const _bi=bagItems;bagItems=function(){const L=_bi.apply(this,arguments);for(const it of L)if(it.ref&&it.ref.t==='qi'&&TIEN2.dung[it.ref.id])it.use=1;return L;};}
{const _bu=bagUse;bagUse=function(key,n){const id=String(key).slice(1);const D=TIEN2.dung[id];if(key[0]!=='v'||!D)return _bu.apply(this,arguments);const r=G.run;const i=(r.qitems||[]).indexOf(id);if(i<0)return 0;
  r.qitems.splice(i,1);const e={};if(D.hp)e.hp=Math.round(S().maxHp*D.hp);if(D.tamma)e.tamma=D.tamma;applyE(e);log(contentText('pham.dung',[CAT.byId[id].n]));dbg('pham.dung',{id});return 1;};}

// ---------- sự kiện: phàm nhân dùng tiền phàm ----------
// Danh sách sự kiện phàm nhân không gặp: PHAM_SK.cam (content/rules/pham-su-kien.js, sinh bằng tools/ra-su-kien-pham.js rồi rà tay).
function phamCam(id){return isPham()&&typeof PHAM_SK!=='undefined'&&PHAM_SK.cam.includes(id);}
{const _ct=contentTriggerOk;contentTriggerOk=function(d){if(d&&d.id&&phamCam(d.id))return false;return _ct.apply(this,arguments);};}
{const _cp=contentPoolOk;contentPoolOk=function(e){if(e&&phamCam(e.id))return false;return _cp.apply(this,arguments);};}
// giá linh thạch trong sự kiện → xu
function evXu(st){return Math.max(1,Math.round(st*SC[rT()]))*TIEN.evXu;}
function evCostBac(c){return c&&c.st&&isPham()&&feat('tien')?evXu(c.st):0;}
{const _co=costOk;costOk=function(c){if(!evCostBac(c))return _co.apply(this,arguments);if(!bacCan(evCostBac(c)))return false;return _co(Object.assign({},c,{st:0}));};}
{const _cc=costChips;costChips=function(c){const b=evCostBac(c);if(!b)return _cc.apply(this,arguments);const o=_cc(Object.assign({},c,{st:0}));bacPay(b,'ev.cost');o.unshift(bacChip(-b));return o;};}
{const _nl=needList;needList=function(c){const b=c&&evCostBac(c.cost);if(!b)return _nl.apply(this,arguments);
  const L=_nl.call(this,Object.assign({},c,{cost:Object.assign({},c.cost,{st:0})}));L.push({ok:bacCan(b),t:fmtBac(b)});return L;};}
{const _ae=applyE;applyE=function(e,v){if(!(e&&e.st!=null&&isPham()&&feat('tien')))return _ae.apply(this,arguments);const r=G.run;const e2=Object.assign({},e);delete e2.st;
  let d=typeof e.st==='string'?Math.round((r.bac||0)*parseFloat(e.st)/100):(e.st>0?evXu(e.st):-evXu(-e.st));
  e2.bac=(e2.bac||0)+d;return _ae.call(this,e2,v);};}
// lời kể: phàm nhân thấy tiền phàm thay cho linh thạch (trừ Trắc Linh Thạch)
const PHAM_LT_RX=/(?<![Tt]rắc )(viên |khối |mẩu )?([Ll])inh thạch/g;
function phamLtTxt(s){return typeof s!=='string'?s:s.replace(PHAM_LT_RX,(m,v,L)=>(v?'đồng ':'')+(L==='L'?'Bạc':'bạc'));}
{const _T=T;T=function(){const s=_T.apply(this,arguments);const r=G.run;return r&&r.pham&&r.scene&&r.scene.type==='event'&&!phamCam(r.scene.id)?phamLtTxt(s):s;};}
