// ================= LÕI BỔ SUNG =================
// Vòng chu thiên, linh thú, luyện chế, bế quan tùy chọn, thế cục, nhân mạch, ghi chú bản đồ.
// Hàm thuần, không đụng giao diện; chạy được trong Node (xem tools/run.js).

function note(t,c){G.toasts=G.toasts||[];G.toasts.push({t,c:c||''});if(G.toasts.length>6)G.toasts.shift();}
function run2(){const r=G.run;if(!r)return null;
  if(!r.chu)r.chu=[null,null,null,null,null,null,null,null];
  if(!r.pets)r.pets=[];if(!r.eggs)r.eggs=[];if(r.petOut===undefined)r.petOut=null;
  if(!r.mats)r.mats={thao:0,khoang:0,dan:0};
  return r;}

// ---------------- VÒNG CHU THIÊN ----------------
// Tám ô quanh đan điền. Linh khí chảy theo chiều kim đồng hồ: ô trước sinh ô sau thì mạnh lên, khắc thì yếu đi.
const SINH={moc:'hoa',hoa:'tho',tho:'kim',kim:'thuy',thuy:'moc'};
const QUY={bang:'thuy',phong:'moc',loi:'hoa',am:'thuy',phat:'tho'}; // hệ biến dị quy về ngũ hành khi xét sinh khắc
const CHU_N=[4,5,6,7,8,8];
function chuSlots(){return CHU_N[G.run.realm]||4;}
function chuBase(el){return QUY[el]||el;}
function chuItem(c){const r=G.run;if(!c)return null;
  if(c.k==='s'){const own=r.skills.find(x=>x.id===c.id);if(!own)return null;const sk=SK[c.id];return {k:'s',n:sk.n,el:sk.el,lv:own.lv};}
  const rel=r.relics.find(x=>x.name===c.n);return rel?{k:'r',n:rel.name,el:rel.el||'vo',tier:rel.tier||0}:null;}
function chuKey(c){return c?(c.k==='s'?'s:'+c.id:'r:'+c.n):'';}
function chuPool(){const r=run2();const used=new Set(r.chu.map(chuKey));const L=[];
  for(const k of r.skills){const c={k:'s',id:k.id};if(!used.has(chuKey(c)))L.push(c);}
  for(const x of r.relics){const c={k:'r',n:x.name};if(!used.has(chuKey(c))&&!L.find(y=>chuKey(y)===chuKey(c)))L.push(c);}
  return L;}
function chuSet(i,c){const r=run2();if(i<0||i>=chuSlots())return;
  if(c){const k=chuKey(c);for(let j=0;j<8;j++)if(chuKey(r.chu[j])===k)r.chu[j]=null;}
  r.chu[i]=c||null;clampHp();saveSoon();}
function chuLink(a,b){ // a chảy sang b
  if(!a||!b)return 0;const x=chuBase(a.el),y=chuBase(b.el);
  if(x==='vo'||y==='vo')return 0;
  if(SINH[x]===y)return 1;if(KHAC[x]===y)return -1;if(x===y)return 2;return 0;}
function chuView(){const r=run2();const n=chuSlots();const it=[];
  for(let i=0;i<n;i++){const v=chuItem(r.chu[i]);if(!v&&r.chu[i])r.chu[i]=null;it.push(v);}
  const links=[];let sinh=0,khac=0,dong=0;
  for(let i=0;i<n;i++){const j=(i+1)%n;const l=chuLink(it[i],it[j]);links.push(l);if(l===1)sinh++;else if(l===-1)khac++;else if(l===2)dong++;}
  const full=it.every(Boolean);const dai=full&&!khac&&sinh>=n-1;
  return {n,it,links,sinh,khac,dong,full,dai};}
function chuFx(fx){const r=G.run;if(!r||!r.chu)return;const v=chuView();
  for(let i=0;i<v.n;i++){const j=(i+1)%v.n;const l=v.links[i];if(!l)continue;const el=v.it[j].el;
    fx.elP[el]=(fx.elP[el]||0)+(l===1?6:l===2?3:-5);if(l===1)fx.mpP=(fx.mpP||0)+3;}
  if(v.dai){fx.tvP=(fx.tvP||0)+15;fx.hpP=(fx.hpP||0)+8;}}
function chuAuto(){ // xếp tự động: thử tham lam để được nhiều mối tương sinh nhất
  const r=run2();const n=chuSlots();const all=r.chu.filter(Boolean).concat(chuPool());
  const items=all.map(c=>({c,v:chuItem(c)})).filter(x=>x.v);
  let best=null,bs=-1e9;
  for(let s=0;s<items.length;s++){
    const left=items.slice();const seq=[left.splice(s,1)[0]];
    while(seq.length<n&&left.length){let bi=0,bv=-9;for(let i=0;i<left.length;i++){const l=chuLink(seq[seq.length-1].v,left[i].v);const sc=l===1?3:l===2?1:l===-1?-3:0;if(sc>bv){bv=sc;bi=i;}}seq.push(left.splice(bi,1)[0]);}
    let sc=0;for(let i=0;i<seq.length;i++){const l=chuLink(seq[i].v,seq[(i+1)%n]&&seq[(i+1)%n].v);sc+=l===1?3:l===2?1:l===-1?-3:0;}
    sc+=seq.length*0.1;if(sc>bs){bs=sc;best=seq;}
  }
  r.chu=[null,null,null,null,null,null,null,null];if(best)best.forEach((x,i)=>{r.chu[i]=x.c;});clampHp();saveSoon();}

// ---------------- LINH THÚ ----------------
const PET_MAX=3;
const PET_FX={kim:'atkP',moc:'hpP',thuy:'mpP',hoa:'matkP',tho:'defP'};
function petCap(){return 3+G.run.realm*2;}
function petOut(){const r=run2();const p=r.petOut!=null&&r.pets[r.petOut];return p&&!(p.rest>W().t)?p:null;}
function petPow(p){return 0.35+0.05*p.lv;}
function petFx(fx){const r=G.run;if(!r||!r.pets)return;const p=r.petOut!=null&&r.pets[r.petOut];if(!p)return;
  const k=PET_FX[chuBase(p.el)];if(k)fx[k]=(fx[k]||0)+2*p.lv;else fx.van=(fx.van||0)+Math.ceil(p.lv/3);}
function petFxText(p){const k=PET_FX[chuBase(p.el)];const N={atkP:'Công',hpP:'Khí huyết',mpP:'Linh lực',matkP:'Sát thương phép',defP:'Thủ'};return k?N[k]+' +'+2*p.lv+'%':'Khí vận +'+Math.ceil(p.lv/3);}
function petName(en){const E=EN[en.k];const b=E&&E.nb?E.nb[0]:'Thú';return pick(['Tiểu ','A ','Lão ','Hắc ','Bạch ','Xích '])+b;}
function petHatch(i,pay){const r=run2();const e=r.eggs[i];if(!e)return null;
  if(pay){const c=price(10);if(r.st<c)return null;r.st-=c;}
  else if(W().t<e.t)return null;
  if(r.pets.length>=PET_MAX)return null;
  r.eggs.splice(i,1);const p={n:e.n,i:e.i,el:e.el,k:e.k,lv:1,exp:0,rest:0};r.pets.push(p);
  if(r.petOut==null)r.petOut=r.pets.length-1;
  log(`Trứng nở: ${p.n} theo ngươi.`);note(`${p.i} ${p.n} đã nở và nhận ngươi làm chủ.`,'up');return p;}
function petSet(i){const r=run2();r.petOut=(i==null||r.petOut===i)?null:i;clampHp();saveSoon();}
function petFree(i){const r=run2();const p=r.pets[i];if(!p)return;r.pets.splice(i,1);
  if(r.petOut===i)r.petOut=null;else if(r.petOut>i)r.petOut--;log(`Thả ${p.n} về rừng.`);clampHp();saveSoon();}
function petExp(p,x){p.exp+=x;let up=false;while(p.lv<petCap()&&p.exp>=p.lv*3){p.exp-=p.lv*3;p.lv++;up=true;}if(up)note(`${p.i} ${p.n} lớn thêm, lên bậc ${p.lv}.`,'up');return up;}
function petFeed(i,pi){const r=run2();const p=r.pets[i],pl=r.pills[pi];if(!p||!pl)return;r.pills.splice(pi,1);
  if(p.rest>W().t)p.rest=W().t;petExp(p,2+(pl.q||0));log(`Cho ${p.n} ăn ${PILL[pl.id].n}.`);saveSoon();}

// ---------------- VẬT LIỆU & LUYỆN CHẾ ----------------
const MAT={thao:{n:'Linh thảo',i:'🌿',d:'Hái khi thăm dò rừng, đồng hoang, sông, biển'},khoang:{n:'Linh khoáng',i:'⛏️',d:'Đào khi thăm dò núi, hang động, phế tích'},dan:{n:'Yêu đan',i:'🔮',d:'Rơi từ yêu thú bị hạ'}};
const CRAFT=[
  {id:'dan1',n:'Luyện đan',i:'⚗️',cost:{thao:3},h:3*HD,base:.55,d:'Ra một viên đan ngẫu nhiên. Ngộ tính cao thì phẩm tốt hơn.'},
  {id:'dan2',n:'Luyện linh đan',i:'🧪',cost:{thao:4,dan:1},h:10*HD,base:.5,d:'Ra một viên đan trung phẩm trở lên.'},
  {id:'khi',n:'Luyện khí',i:'⚒️',cost:{khoang:5,dan:1},h:HM,base:.4,d:'Rèn một món pháp bảo. Thất bại mất nửa vật liệu.'},
  {id:'duong',n:'Luyện thú đan',i:'🍖',cost:{thao:2,dan:2},h:5*HD,base:.7,d:'Thức ăn cho linh thú đang mang theo: lớn nhanh hơn.'},
];
function craftRate(c){const s=S();return clamp(c.base+(s.ngo-10)*0.02+(s.van-3)*0.01,0.1,0.95);}
function craftOk(c){const r=run2();if(c.id==='duong'&&!r.pets.length)return false;if(c.id!=='khi'&&c.id!=='duong'&&r.pills.length>=S().pillMax)return false;return Object.entries(c.cost).every(([k,v])=>r.mats[k]>=v);}
function craft(id){const r=run2();const c=CRAFT.find(x=>x.id===id);if(!c||r.scene||r.moving||!craftOk(c))return null;
  const rate=craftRate(c);const ok=chance(rate);
  for(const [k,v] of Object.entries(c.cost))r.mats[k]-=ok?v:Math.ceil(v/2);
  advanceTime(c.h);if(!G.run)return null;
  const res={ok,name:c.n,h:c.h,chips:[chip('⏳',durH(c.h),'Thời gian trôi qua','')]};
  if(!ok){res.t=pick(['Lửa lò chợt bùng, mẻ này thành tro.','Một tiếng nổ nhỏ. Khói đen bốc lên, vật liệu hỏng mất một nửa.','Hỏa hầu lệch một nhịp. Hỏng.']);applyE({tamma:1});log(c.n+' thất bại.');}
  else if(c.id==='khi'){const rel=genRelic(clamp(r.region+(chance(rate*0.35)?1:0),0,4));r.relics.push(rel);clampHp();res.t=`Lò mở. ${rel.name} nằm giữa tro than, còn ấm.`;res.chips.push(chip('🏺',rel.name,relicTip(rel),'item',rel.tier));log(`Rèn được ${rel.name}.`);}
  else if(c.id==='duong'){const p=petOut()||r.pets[0];petExp(p,4);res.t=`${p.n} ngửi thấy mùi đan, chồm tới ăn sạch.`;res.chips.push(chip(p.i,p.n+' lớn thêm','Linh thú nhận kinh nghiệm','up'));}
  else{const s=S();let q=chance(clamp((s.ngo-8)*0.03,0.02,0.6))?1:0;if(c.id==='dan2')q=Math.max(1,q+(chance(.3)?1:0));if(q>0&&chance(rate*0.2))q=Math.min(2,q+1);
    const pid=rollPill();gainPill(pid,q);res.t=`Lò mở, hương thuốc tỏa ra. Được ${PQ[q].toLowerCase()} ${PILL[pid].n}.`;res.chips.push(chip(PILL[pid].i,PILL[pid].n,pillTip(pid,q),'item'));}
  if(ok)applyE({tv:1});
  autoCheck();saveSoon();return res;}

// ---------------- BẾ QUAN TÙY CHỌN ----------------
function bqRate(){const s=S();return bqGain(1)*(1+(s.fx.bqP||0)/100);} // % tu vi mỗi năm
function bqInfo(){const r=G.run,s=S();const rate=bqRate();const left=Math.max(0,s.life-r.age);
  const need=Math.max(0,100-r.tv)/rate;const maxY=Math.max(0.25,Math.min(20,Math.floor(left*4)/4));
  return {rate,left,need:Math.max(0.25,Math.ceil(need*4)/4),maxY,full:r.tv>=100};}
function bqCustom(y){const r=G.run,sc=r&&r.scene;if(!sc||sc.type!=='place')return false;const n=nodeById(sc.id);if(!n.dp)return false;
  const I=bqInfo();y=clamp(Math.round(y*4)/4,0.25,I.maxY);
  const g=bqRate()*y*(y<1?0.9:1);sc.msg=[T(REST_T.bq)];sc.chips=[];
  if(y>=1&&chance(Math.min(.5,.11*y))){
    const o=advanceTime(y*HY*0.5);if(!G.run)return true;sc.msg.push(T(REST_T.bqint));
    sc.chips=applyE({tv:g*0.5,tvMajor:1,tamma:-3});if(!G.run)return true;
    startCombat({},{kind:'place',msg:sc.msg.slice()});return true;}
  const o=advanceTime(y*HY);if(!G.run)return true;
  if(o.length)sc.msg.push('Trong lúc ấy: '+o.slice(-2).join(' '));
  const ch=[chip('⏳',durH(y*HY),'Thời gian trôi qua','')].concat(applyE({tv:g,tvMajor:1,tamma:-Math.min(12,Math.round(3*y)+3)}));if(!G.run)return true;
  const s1=S();r.hp=s1.maxHp;r.mp=s1.maxMp;if(G.run.scene===sc)sc.chips=ch;return true;}

// ---------------- THẾ CỤC ----------------
// Gom những chuyện đang diễn ra mà nhân vật biết được (trong tầm thần thức hoặc đã nghe tin).
function affairs(){const r=G.run,w=W();if(!r)return [];const L=[];const [px,py]=playerXY();const R0=senseR();
  for(const e of entsHere(r.region)){const p=entXY(e);const see=Math.hypot(p[0]-px,p[1]-py)<=R0;if(!see&&!e.heard)continue;
    const T0=ENT_T[e.type];const at=nodeById(e.to!=null?e.to:e.at);
    const cat=e.type==='di'?'co':(e.type==='thutrieu'||e.type==='truysat')?'hoa':e.type==='thuong'?'thuong':'nguoi';
    L.push({cat,i:e.icon||T0.i,n:e.name,sub:T0.n+(at&&at.fog>=1?' · '+(e.to!=null?'đang tới ':'ở ')+at.name:''),left:e.until-w.t,x:see?p[0]:e.heard.x,y:see?p[1]:e.heard.y,node:at&&at.fog>=1?at.id:null,old:see?0:w.t-e.heard.t});}
  for(const q of r.quests)if(q.state==='open'){const n=nodeById(q.node);L.push({cat:'viec',i:'📜',n:q.text,sub:'Việc đã nhận'+(n?' · '+n.name:''),left:q.due-w.t,node:n&&n.fog>=1?n.id:null,x:n&&n.x,y:n&&n.y});}
  for(const n of regionOf(r.region).nodes){if(n.fog>=2&&(n.vstate||'ok')==='ruin')L.push({cat:'hoa',i:'🔥',n:n.name+' hoang tàn',sub:TYPE_NAME[n.type]+' bị tàn phá',left:null,node:n.id,x:n.x,y:n.y});
    if(n.fog>=1&&n.grave)L.push({cat:'co',i:'🪦',n:'Mộ '+n.grave.ten,sub:'Mộ kiếp trước · '+n.name,left:null,node:n.id,x:n.x,y:n.y});
    if(n.fog>=1&&n.patron)L.push({cat:'nguoi',i:'🤝',n:'Cố nhân ở '+n.name,sub:'Người chịu ơn kiếp trước',left:null,node:n.id,x:n.x,y:n.y});}
  for(let i=0;i<(r.eggs||[]).length;i++){const e=r.eggs[i];L.push({cat:'co',i:'🥚',n:'Trứng '+e.n,sub:'Linh thú sắp nở',left:Math.max(0,e.t-w.t)});}
  L.push({cat:'nguoi',i:'🏆',n:'Thiên Kiêu Bảng',sub:'Kỳ công bố kế tiếp: năm '+w.bangY,left:(w.bangY-1000)*HY-w.t});
  L.sort((a,b)=>(a.left==null?1e12:a.left)-(b.left==null?1e12:b.left));return L;}
const AFF_CAT={all:'Tất cả',co:'Cơ duyên',hoa:'Hiểm họa',thuong:'Thương đội',nguoi:'Nhân vật',viec:'Việc'};

// ---------------- NHÂN MẠCH ----------------
function relations(){const r=G.run,w=W();if(!r)return {an:[],oan:[],party:[],rivals:[],sects:[]};
  const an=r.seeds.filter(s=>s.t==='an'),oan=r.seeds.filter(s=>s.t==='oan');
  const rivals=r.rivals.map(x=>{const wr=w.rivals[x.i];return {i:x.i,ten:wr.ten,el:wr.el,tt:wr.tt,sect:w.sects[wr.s].n,realm:x.realm,alive:x.alive,rel:x.rel||0,g:wr.g};});
  rivals.sort((a,b)=>(b.alive-a.alive)||b.realm-a.realm);
  return {an,oan,party:r.party||[],rivals,sects:w.sects,nemesis:w.nemesis,mine:r.flags.tongmon};}

// ---------------- GHI CHÚ BẢN ĐỒ ----------------
function noteSet(id,t){const w=W();w.notes=w.notes||{};t=String(t||'').trim().slice(0,80);
  if(!t)delete w.notes[id];else{if(!w.notes[id]&&Object.keys(w.notes).length>=50)return false;w.notes[id]=t;}saveSoon();return true;}
function noteOf(id){const w=W();return w.notes&&w.notes[id]||'';}

// ---------------- MÓC NỐI VÀO LÕI ----------------
{const _agg=aggFx;aggFx=function(){const fx=_agg();chuFx(fx);petFx(fx);return fx;};}
{const _sc=startCombat;startCombat=function(spec,after){
  const r=run2();const p=!(spec&&spec.kiep)&&petOut();let tmp=null;
  if(p){const s=S();tmp={id:-7,ten:p.n,icon:p.i,el:p.el,pow:petPow(p),hp:Math.round(s.maxHp*petPow(p)),sub:'Yêu thú '+GIAI[clamp((p.lv||1)-1,0,GIAI.length-1)].toLowerCase()+' giai'};r.party=[tmp].concat((r.party||[]).slice(0,1),(r.party||[]).slice(1));}
  try{return _sc(spec,after);}finally{if(tmp)r.party=r.party.filter(x=>x!==tmp);}};}
{const _fc=finishCombat;finishCombat=function(sc){
  _fc(sc);const r=run2();if(!r||sc.kiep)return;
  const pu=sc.units.find(u=>u.ally===-7);const p=r.petOut!=null&&r.pets[r.petOut];
  if(pu&&p){if(pu.hp<=0){p.rest=W().t+HM;clog(sc,`${p.n} bị thương nặng, phải nghỉ một tháng.`,'en');}else if(sc.over==='win')petExp(p,1);}
  if(sc.over!=='win'||sc.spar)return;
  const E=EN[sc.en.k];if(!E||E.f!=='thu')return;
  if(chance(.6)){const k=sc.elite||sc.boss?2:1;r.mats.dan+=k;clog(sc,`Nhặt được ${numVi(k)} viên yêu đan.`,'win');}
  if(!sc.boss&&r.pets.length+r.eggs.length<PET_MAX&&chance(0.1+S().van*0.01)){
    const e={k:sc.en.k,n:petName(sc.en),i:sc.en.i,el:sc.en.el||'vo',t:W().t+3*HM};r.eggs.push(e);
    clog(sc,`Trong ổ của nó còn một quả trứng ấm. Ngươi mang theo.`,'win');note(`🥚 Nhặt được trứng linh thú. Ba tháng nữa sẽ nở.`,'up');}};}
{const _pa=placeAct;placeAct=function(a){
  const r=run2();const sc=r&&r.scene;const n=sc&&sc.type==='place'?nodeById(sc.id):null;const ex0=n?n.explore:0;
  _pa(a);
  if(a!=='explore'||!G.run||!n||n.explore===ex0||n.explore>=4)return;
  const t=n.type;const k=['rung','hoang','song','bien','thien'].includes(t)?'thao':['nui','dong','phe','ma','sao'].includes(t)?'khoang':null;
  if(k&&chance(.5)){const x=ri(1,2)+(n.danger>=2?1:0);r.mats[k]+=x;note(`${MAT[k].i} Tiện tay kiếm được ${x} ${MAT[k].n.toLowerCase()}.`,'up');}};}
{const _ac=autoCheck;autoCheck=function(){
  const r=run2();if(r&&r.eggs.length&&r.pets.length<PET_MAX){for(let i=r.eggs.length-1;i>=0;i--)if(W().t>=r.eggs[i].t)petHatch(i);}
  _ac();};}

// ---------------- ĐỊA ĐIỂM MỞ RỘNG ----------------
for(const k in EL)EL[k].c=EL[k].n; // hiện tên hệ bằng tiếng Việt thay cho chữ Hán
const WILD2=['rung','nui','song','bien','hoang','phe','dong','ma','thien'];
function isWild(n){return WILD2.includes(n.type);}
// chuyện "trước mắt" của mỗi nơi: hiện sẵn, tự mất sau chừng 5 năm
function nodeEvs(n){const r=G.run,w=W();if(n.type==='ai')return [];
  if(!n.evs||n.evs.kiep!==r.kiep||w.t>n.evs.until){const k=n.type==='sao'?1:isWild(n)?3:ri(1,3);const L=[];
    for(let i=0;i<k*4&&L.length<k;i++){const id=pickEvent(n.type,'explore');if(id&&EVMAP[id]&&!L.includes(id))L.push(id);}
    n.evs={kiep:r.kiep,until:w.t+5*HY,L};}
  return n.evs.L;}
function exploreStats(n){const fp=[0.04,0.14,0.26,0.4][n.danger]+(['phe','ma'].includes(n.type)?0.08:0)+(n.type==='sao'?0.3:0);
  const foes=Object.keys(EN).filter(k=>EN[k].pl&&EN[k].pl.includes(n.type)).map(k=>EN[k]);
  const mat=['rung','hoang','song','bien','thien'].includes(n.type)?'thao':['nui','dong','phe','ma','sao'].includes(n.type)?'khoang':null;
  return {fp:Math.min(.9,fp),foes,mat,egg:Math.min(.5,0.1+S().van*0.01)};}
{const _pa0=placeActs;placeActs=function(n){const L=_pa0(n);const r=G.run,w=W(),t=n.type,ruin=n.state==='ruin';
  const add=(a,i,l,h,tip,dis,x)=>L.push({a,i,l,h,tip,dis:!!dis,x});
  if((t==='tran'||t==='thanh')&&!ruin){if(t==='tran')add('taphoa','','Tiệm tạp hóa',1,'Mua đan dược, bí tịch, pháp bảo');
    add('laibuon','','Lái buôn thu mua',0,'Bán bớt pháp bảo, đan dược lấy linh thạch');
    add('tuu','','Tửu phường',3,'Uống chén rượu, nghe chuyện, nguôi tâm ma',r.st<price(2),'linh thạch '+price(2));
    add('tram','','Trạm dịch',0,'Thuê xe ngựa tới thôn trấn đã từng tới, nhanh gấp ba đi bộ');}
  if(t==='tong')add('nhansu','','Nhân sự',0,'Những gương mặt đáng chú ý của sơn môn');
  if(isWild(n)){
    if(!n.dp)add('khaiphu','','Khai phủ',HM,'Đào một động phủ ở đây để bế quan, đột phá',n.danger>=3,n.danger>=3?'Đất này là tử địa.':'');
    const y=Math.floor(w.t/HY);const hc=n.hunt&&n.hunt.y===y&&n.hunt.k===r.kiep?n.hunt.c:0;
    add('sanyeu','',hc>=3?'Săn yêu · hết lượt năm nay':'Săn yêu · còn '+(3-hc)+' lần',2,'Lùng yêu thú quanh đây. Thắng thì được yêu đan, đôi khi có trứng linh thú.',hc>=3);
    const m=Math.floor(w.t/HM);const gc=n.gath&&n.gath.m===m&&n.gath.k===r.kiep?n.gath.c:0;const mt=exploreStats(n).mat;
    if(mt==='thao')add('haithuoc','','Hái thuốc dại',6,'Kiếm linh thảo để luyện đan. Mỗi tháng hai lần.',gc>=2);
    if(mt==='khoang')add('daokhoang','','Đào khoáng',6,'Kiếm linh khoáng để luyện khí. Mỗi tháng hai lần.',gc>=2);}
  return L;};}
const PA2={khaiphu:1,sanyeu:1,haithuoc:1,daokhoang:1,tuu:1,taphoa:1};
{const _pa1=placeAct;placeAct=function(a){if(!PA2[a])return _pa1(a);
  const r=G.run,sc=r&&r.scene;if(!sc||sc.type!=='place')return;const n=nodeById(sc.id);const act=placeActs(n).find(x=>x.a===a);if(!act||act.dis)return;
  sc.msg=[];sc.chips=[];const tick=h=>{advanceTime(h);return !!G.run&&G.run.scene===sc;};
  if(a==='taphoa'){if(tick(1))openShop(n);return;}
  if(a==='sanyeu'){const y=Math.floor(W().t/HY);if(!n.hunt||n.hunt.y!==y||n.hunt.k!==r.kiep)n.hunt={y,k:r.kiep,c:0};n.hunt.c++;if(!tick(2))return;encounter({type:n.danger>=3&&chance(.35)?'elite':'combat'});return;}
  if(a==='khaiphu'){if(!tick(HM))return;n.dp=1;sc.msg=['Ngươi tìm một vách đá khuất gió, đục suốt một tháng. Động phủ đơn sơ đã thành: có chỗ ngồi, có cấm chế, có khe nước.'];sc.chips=[chip('⏳','1 tháng','Thời gian trôi qua','')];return;}
  if(a==='haithuoc'||a==='daokhoang'){const m=Math.floor(W().t/HM);if(!n.gath||n.gath.m!==m||n.gath.k!==r.kiep)n.gath={m,k:r.kiep,c:0};n.gath.c++;if(!tick(6))return;
    const k=a==='haithuoc'?'thao':'khoang';const x=ri(1,3)+(n.danger>=2?1:0);run2().mats[k]+=x;
    sc.msg=[k==='thao'?'Ngươi lần theo mùi thuốc, vạch cỏ, men theo khe suối. Giỏ đầy dần.':'Ngươi gõ từng mỏm đá, nghe tiếng mà đoán mạch. Vài khối khoáng lấp lánh linh quang.'];
    sc.chips=[chip(MAT[k].i,'+'+x+' '+MAT[k].n.toLowerCase(),'Vật liệu để luyện chế','up'),chip('⏳','6 giờ','Thời gian trôi qua','')];return;}
  if(a==='tuu'){r.st-=price(2);if(!tick(3))return;const s=S();r.hp=Math.min(s.maxHp,r.hp+Math.round(s.maxHp*.1));teaHouse(n);
    sc.msg.unshift(pick(['Rượu nhạt mà cay. Bàn bên to tiếng, ngươi nghe được vài câu.','Chưởng quầy rót đầy chén, kể chuyện không ai hỏi.','Ba chén vào bụng, lòng nhẹ đi đôi chút.']));
    sc.chips=[chip('💎','−'+price(2),'Linh thạch','dn'),chip('⏳','3 giờ','Thời gian trôi qua','')].concat(applyE({tamma:-4}));return;}
};}
function sellList(){const r=G.run;const L=[];
  r.relics.forEach((x,i)=>L.push({k:'r',i,n:x.name,sub:GRADE[x.tier||0],p:price(25+(x.tier||0)*30),ic:'🏺'}));
  r.pills.forEach((x,i)=>L.push({k:'p',i,n:PILL[x.id].n,sub:'Đan dược',p:Math.max(1,Math.round(price(PILL[x.id].p||10)*0.4)),ic:PILL[x.id].i}));return L;}
function sellItem(k,i){const r=G.run;const it=sellList().find(x=>x.k===k&&x.i===i);if(!it)return;
  if(k==='r'){const rel=r.relics[i];r.relics.splice(i,1);const c=run2().chu;for(let j=0;j<8;j++)if(c[j]&&c[j].k==='r'&&c[j].n===rel.name)c[j]=null;clampHp();}else r.pills.splice(i,1);
  r.st+=it.p;log(`Bán ${it.n} được ${it.p} linh thạch.`);note(`Bán ${it.n}: +${it.p} linh thạch`,'up');}
function stageList(n){const r=G.run;return regionOf(r.region).nodes.filter(x=>x.id!==n.id&&(x.type==='tran'||x.type==='thanh')&&x.fog>=3&&x.state!=='ruin')
  .map(x=>{const p=findPath(n.id,x.id);return p?{id:x.id,n:x.name,h:travelHours(p)/3,c:price(1+Math.round(pathLen(p)/60))}:null;}).filter(Boolean);}
function stageGo(id){const r=G.run;const s=stageList(nodeById(r.at)).find(x=>x.id===id);if(!s||r.st<s.c)return;r.st-=s.c;r.scene=null;
  advanceTime(s.h);if(!G.run||G.run.scene)return;arrive(id);openPlace(id);G.run.scene.msg=['Xe ngựa lắc lư '+durH(s.h)+' đường, rồi dừng trước cổng '+s.n+'.'];}
function sectPeople(n){const w=W();return w.rivals.map((x,i)=>({x,i})).filter(o=>w.sects[o.x.s]&&w.sects[o.x.s].n===n.owner).map(o=>{const st=(w.rstate||[]).find(s=>s.i===o.i)||{};return {ten:o.x.ten,tt:o.x.tt,el:o.x.el,realm:st.realm||0,alive:st.alive!==false};});}

// ================= ĐỢT 3: ĐẠI LỤC LIỀN, LOẠI ĐỊA ĐIỂM MỚI, LINH KHÍ, NGUY HIỂM TƯƠNG ĐỐI, ĐI ĐƯỜNG DÀI, CỐNG HIẾN =================
const NEWT={
  linhdia:{n:'phúc địa',as:'nui',sfx:['Phúc Địa','Linh Tuyền','Tiên Cốc']},
  khoang:{n:'mỏ linh khoáng',as:'dong',sfx:['Khoáng Động','Thạch Mạch','Linh Khoáng']},
  duoc:{n:'dược cốc',as:'rung',sfx:['Dược Cốc','Thảo Viên','Dược Lâm']},
  cho:{n:'chợ phiên tu sĩ',as:'thanh',sfx:['Tụ Bảo Phường','Chợ Phiên','Giao Dịch Phường']},
  ancu:{n:'thảo lư ẩn sĩ',as:'nui',sfx:['Thảo Lư','Trúc Xá','Am']},
  dam:{n:'đầm lầy',as:'song',sfx:['Đầm','Trạch','Bãi Lầy']},
};
const NAME_PRE=['Thanh Vân','Bạch Lộ','Huyền Sương','Tử Yên','Xích Hà','Lạc Nhạn','Vọng Nguyệt','Thính Vũ','Ngọa Long','Phi Hạc','Tàng Phong','Minh Kính','U Lan','Hàn Tuyền','Kim Tước','Thúy Trúc','Vân Mộng','Cổ Tùng','Lưu Sa','Bích Đào','Ngân Hạnh','Thiên Trì','Mặc Trì','Hồng Diệp'];
for(const k in NEWT){TYPE_NAME[k]=NEWT[k].n;NODE_IC[k]='•';if(!P['canh_'+k])P['canh_'+k]=P['canh_'+NEWT[k].as];}
function tAs(t){return NEWT[t]?NEWT[t].as:t;}
function extendWorld(w){if(!w||!w.regions)return;
  for(const R0 of w.regions){if(R0.ext)continue;R0.ext=1;const k=R0.k,X0=k*1000;const used=new Set(R0.nodes.map(n=>n.name));
    const types=shuffle(Object.keys(NEWT)).concat(shuffle(Object.keys(NEWT))).slice(0,10);
    for(const t of types){let p=null;for(let g=0;g<300&&!p;g++){const q={x:X0+ri(45,955),y:ri(45,955)};if(R0.nodes.every(n=>Math.hypot(n.x-q.x,n.y-q.y)>=78))p=q;}
      if(!p||R0.nodes.length>=95)continue;
      const near=R0.nodes.map(n=>[n,Math.round(Math.hypot(n.x-p.x,n.y-p.y))]).sort((a,b)=>a[1]-b[1]);
      let name;for(let g=0;g<20;g++){name=pick(NAME_PRE)+' '+pick(NEWT[t].sfx);if(!used.has(name))break;}used.add(name);
      const n={id:k*100+R0.nodes.length,r:k,x:p.x,y:p.y,type:t,name,danger:(t==='cho'||t==='ancu')?0:clamp(near[0][0].danger+(t==='dam'?1:0),0,3),fog:0,seenT:-1,memory:false,state:'ok',stateUntil:0,explore:0,exploreT:-1,grave:null,cache:null,patron:null,dp:t==='linhdia'?1:0};
      R0.nodes.push(n);R0.edges.push({a:n.id,b:near[0][0].id,len:near[0][1]});if(near[1]&&near[1][1]<330)R0.edges.push({a:n.id,b:near[1][0].id,len:near[1][1]});}}}
{const _gw=genWorld;genWorld=function(seed){const w=_gw(seed);extendWorld(w);return w;};}
{const _nm=newMeta;newMeta=function(){const m=_nm();extendWorld(m.world);return m;};}
// loại mới mượn cảnh, sự kiện, yêu ma của loại gần nhất
{const _op=openPlace;openPlace=function(id){_op(id);const r=G.run;if(r&&r.place)r.place.t=tAs(r.place.t);};}
{const _ar=arrive;arrive=function(id){_ar(id);const r=G.run;if(r&&r.place)r.place.t=tAs(r.place.t);if(r&&r.dest===id)r.dest=null;if(r)r.halt=false;};}
{const _pe=pickEvent;pickEvent=function(type,src){return _pe(tAs(type),src);};}
WILD2.push('linhdia','khoang','duoc','dam');

// ----- linh khí từng nơi -----
const LK_N=['Rất loãng','Loãng','Trung bình','Dồi dào'],LK_M=[0.6,0.85,1.05,1.4];
function lkOf(n){if(!n)return 1;if(n.type==='linhdia')return 3;if(n.type==='tong')return 2;if(['tran','thanh','cho','ai'].includes(n.type))return 0;
  return Math.min(3,hashS('lk'+W().seed+':'+n.id)%3+(n.dp?1:0));}
// ----- mức nguy hiểm so với chính ngươi -----
const DTAG=['An toàn','Ngang sức','Nguy hiểm','Tử địa'];
const SETTLE=['tran','thanh','cho','tong','ancu'];
function dangerTag(n){const r=G.run;if(!n||!r)return 0;
  if(SETTLE.includes(n.type)){
    if(n.type==='tong'){const s=W().sects.find(x=>x.n===n.owner);const al=s&&s.al;
      if(al==='chinh'&&r.karma<=-60||(al==='ma'||al==='ta')&&r.karma>=60)return 3;
      if(al==='chinh'&&r.karma<=-25||(al==='ma'||al==='ta')&&r.karma>=25)return 2;return 0;}
    if(r.karma<=-60&&n.type!=='ancu')return 2; // tiếng ác đồn xa, quan phủ treo thưởng
    return (n.state==='ruin'&&n.fog>=2)?1:0;}
  const d=r.region+nodeDanger(n)*0.5-r.realm;return d<=0?0:d<0.75?1:d<1.5?2:3;}
function dangerWhy(n){const g=dangerTag(n);if(SETTLE.includes(n.type))return g?'Thế lực tọa trấn nơi này không ưa ngươi.':'Có người tọa trấn, yên ổn.';
  return ['Yêu ma ở đây yếu hơn ngươi hẳn.','Yêu ma ở đây ngang sức ngươi.','Yêu ma ở đây mạnh hơn ngươi.','Linh áp vượt xa cảnh giới của ngươi.'][g];}

// ----- thông tin thêm cho thẻ địa điểm: thế lực tọa trấn, quy mô, đôi dòng mô tả (cố định theo từng nơi) -----
function placeMeta(n){const h=hashS('pm'+W().seed+':'+n.id),w=W();const pk=(L,k)=>L[(h>>>(k||0))%L.length];
  const sect=w.sects&&w.sects.length?pk(w.sects,3).n:'một tông môn';const ho=pk(NAME.ho,5);
  let luc,quy;const t=n.type;
  if(t==='tong'){luc=n.owner||sect;quy=pk(['Sơn môn nhỏ, vài trăm đệ tử','Tông môn hạng trung, gần ngàn đệ tử','Đại tông, đệ tử hàng ngàn'],7);}
  else if(t==='thanh'){luc=pk(['Thành chủ phủ họ '+ho,'Quan phủ triều đình',sect+' (phân đà)','Thương hội '+ho+' gia'],2);quy=pk(['Thành trì, vài vạn hộ','Đại thành, chục vạn dân','Thành cổ, tường cao ba trượng'],6);}
  else if(t==='tran'){luc=pk(['Hương lão trong thôn','Lý trưởng họ '+ho,ho+' gia, một tiểu gia tộc tu tiên','Võ quán họ '+ho],2);quy=pk(['Thôn nhỏ, vài chục nóc nhà','Trấn vừa, chừng trăm hộ','Trấn lớn, ba bốn trăm hộ'],6);}
  else if(t==='cho'){luc='Thương hội '+ho+' gia';quy=pk(['Phường thị nhỏ, vài chục sạp','Phường thị sầm uất, trăm sạp'],6);}
  else if(t==='ancu'){luc='Ẩn sĩ không rõ danh tính';quy='Vài gian nhà tranh';}
  else if(t==='ai'){luc='Quân trấn ải';quy='Quan ải hiểm yếu';}
  else if(t==='ma'){luc=pk(['Ma tu chiếm cứ','Huyết sát môn đồ','Âm hồn bất tán'],2);quy=pk(['Vùng ma khí nhỏ','Ma địa rộng chừng chục dặm'],6);}
  else{luc=(n.danger||0)>=3?'Yêu vương chiếm cứ':(n.danger||0)>=2?'Yêu thú chiếm cứ':(n.danger||0)>=1?'Thú dữ lảng vảng':'Vô chủ';
    quy=pk(['Nhỏ, đi nửa ngày là hết','Vừa, rộng chừng năm dặm','Rộng chừng hai mươi dặm','Mênh mông, chưa ai đi hết'],6);}
  if((n.vstate||n.state)==='ruin'){luc='Bỏ hoang';}
  const L=P['canh_'+t]||P.canh_tran;const desc=L[(h>>>9)%L.length];
  return {luc,quy,desc:desc.indexOf('{')<0?desc:''};}
// ----- đi đường: tính theo tháng năm, tùy thân pháp và phương tiện -----
const MOUNT=[{id:'ngua',n:'Tuấn mã',m:2,p:30,d:'Đi nhanh gấp đôi'},{id:'thuyen',n:'Phi chu',m:4,p:220,d:'Pháp khí phi hành, nhanh gấp bốn',realm:1},{id:'kiem',n:'Ngự kiếm phi hành',m:7,p:900,d:'Nhanh gấp bảy',realm:2}];
function mountOf(){const r=G.run;return r&&r.mount?MOUNT.find(x=>x.id===r.mount):null;}
function walkSpeed(){const r=G.run;const m=mountOf();let v=WALK[r.realm]/180*(1+S().tp/25)*(m?m.m:1);if(SEASON_ON&&seasonOf(W().t)==='dong')v*=0.8;return v;}
function moveText(){const m=mountOf();return m?m.n:(G.run.realm>=2?'ngự không':'đi bộ');}
function buyMount(id){const r=G.run;const m=MOUNT.find(x=>x.id===id);if(!m||r.mount===id)return;const c=price(m.p);if(r.st<c||r.realm<(m.realm||0))return;r.st-=c;r.mount=id;log('Sắm được '+m.n+'.');note('Từ nay đi đường bằng '+m.n.toLowerCase()+'.','up');}

// ----- bế quan: hầu hết mọi nơi, trừ tử địa; linh khí quyết định tốc độ -----
function bqRate(){const s=S(),n=curNode();return bqGain(1)*(1+(s.fx.bqP||0)/100)*LK_M[lkOf(n)]*(n&&n.dp?1.15:1)*(G.bqRoom?1.5:1);}
function bqRisk(y){if(G.bqRoom)return 0;const n=curNode();if(y<1)return 0;return Math.min(.7,.11*y*(1+dangerTag(n)*0.6)*(n&&n.dp?0.6:1));}
function bqCan(){const r=G.run;if(!r||r.moving)return 'Đang trên đường.';if(dangerTag(curNode())>=3)return 'Đất này là tử địa, không ngồi yên được.';return '';}
function bqInfo(){const r=G.run,s=S();const rate=bqRate();const left=Math.max(0,s.life-r.age);
  const need=Math.max(0,100-r.tv)/rate;let maxY=Math.max(0.25,Math.min(20,Math.floor(left*4)/4));
  if(G.bqRoom)maxY=Math.max(0.25,Math.min(maxY,Math.floor((r.ch||0)/CH_YEAR*4)/4));
  return {rate,left,need:Math.max(0.25,Math.ceil(need*4)/4),maxY,full:r.tv>=100};}
function bqCustom(y){const r=G.run;if(!r||bqCan())return false;if(!r.scene)openPlace(r.at);const sc=r.scene;if(!sc||sc.type!=='place')return false;
  const I=bqInfo();y=clamp(Math.round(y*4)/4,0.25,I.maxY);const room=!!G.bqRoom;
  if(room){const c=Math.ceil(y*CH_YEAR);if((r.ch||0)<c){G.bqRoom=false;return false;}r.ch-=c;}
  const g=bqRate()*y*(y<1?0.9:1);const risk=bqRisk(y);G.bqRoom=false;sc.msg=[T(REST_T.bq)];sc.chips=[];
  if(chance(risk)){advanceTime(y*HY*0.5);if(!G.run)return true;sc.msg.push(T(REST_T.bqint));
    sc.chips=applyE({tv:g*0.5,tvMajor:1,tamma:-3});if(!G.run)return true;startCombat({},{kind:'place',msg:sc.msg.slice()});return true;}
  const o=advanceTime(y*HY);if(!G.run)return true;if(o.length)sc.msg.push('Trong lúc ấy: '+o.slice(-2).join(' '));
  const ch=[chip('⏳',durH(y*HY),'Thời gian trôi qua','')].concat(applyE({tv:g,tvMajor:1,tamma:-Math.min(12,Math.round(3*y)+3)}));if(!G.run)return true;
  const s1=S();r.hp=s1.maxHp;r.mp=s1.maxMp;if(G.run.scene===sc)sc.chips=ch;return true;}

// ----- cống hiến tông môn -----
const CH_YEAR=10;
const CH_GIVE={thao:2,khoang:2,dan:5};
function chGive(k){const r=run2();if(!r.flags.tongmon||!r.mats[k])return;r.mats[k]--;r.ch=(r.ch||0)+CH_GIVE[k];}
function chTrade(){const r=run2();if((r.ch||0)<15||r.pills.length>=S().pillMax)return;r.ch-=15;const id=rollPill();gainPill(id,1);note('Đổi cống hiến lấy '+PILL[id].n+'.','up');}

// ----- lựa chọn có điều kiện: đủ thì sáng, thiếu thì mờ kèm lý do -----
const STAT_N={ngo:'ngộ tính',tam:'đạo tâm',van:'khí vận',tp:'thân pháp',atk:'công',def:'thủ'};
function needList(c){const r=G.run,s=S(),L=[];if(!c)return L;
  if(c.cost&&c.cost.st){const v=Math.max(1,Math.round(c.cost.st*SC[r.region]));L.push({ok:r.st>=v,t:'linh thạch ≥ '+v});}
  if(c.cost&&c.cost.mp){const v=Math.round(s.maxMp*parseFloat(c.cost.mp)/100);L.push({ok:r.mp>=v,t:'linh lực ≥ '+v});}
  const n=c.need;if(n){
    if(n.realm!=null)L.push({ok:r.realm>=n.realm,t:'cần '+REALM[n.realm]});
    for(const k in (n.stat||{}))L.push({ok:s[k]>=n.stat[k],t:STAT_N[k]+' ≥ '+n.stat[k]});
    if(n.item)L.push({ok:r.pills.some(p=>p.id===n.item),t:'cần có '+PILL[n.item].n});
    if(n.mat)for(const k in n.mat)L.push({ok:(r.mats&&r.mats[k]||0)>=n.mat[k],t:n.mat[k]+' '+MAT[k].n.toLowerCase()});
    if(n.karma!=null)L.push({ok:n.karma>=0?r.karma>=n.karma:r.karma<=n.karma,t:n.karma>=0?'nhân quả thiện':'nhân quả ác'});
    if(n.member)L.push({ok:!!r.flags.tongmon,t:'chỉ đệ tử tông môn'});
    if(n.ch)L.push({ok:(r.ch||0)>=n.ch,t:'cống hiến ≥ '+n.ch});}
  return L;}
function needOk(c){return needList(c).every(x=>x.ok);}
{const _ch=choose;choose=function(i){const r=G.run,sc=r.scene,e=EVMAP[sc.id];const c=(resolveP(e,sc.cur)||[])[i];if(!c||!needOk(c))return;
  const n=c.need;if(n){if(n.item&&n.use){const k=r.pills.findIndex(p=>p.id===n.item);if(k>=0)r.pills.splice(k,1);}if(n.mat&&n.use)for(const k in n.mat)r.mats[k]-=n.mat[k];if(n.ch)r.ch-=n.ch;}
  _ch(i);};}
// cổng sơn môn: một đoạn hội thoại mẫu dùng đủ các loại điều kiện
ev({id:'cong_son_mon',n:'Sơn môn',spec:1,cond:()=>false,v:()=>({a:npc('tre')}),
 t:['Sơn môn sừng sững trong mây. Đệ tử nội môn {$a.ten} cùng một sư đệ canh cổng, nhìn ngươi từ đầu tới chân, ánh mắt lạnh nhạt.'],
 c:[
  {l:'Chắp tay hỏi bao giờ tông môn thu đồ',t:'{$a.ten}: “Hừ, tuyển đồ à? Tới kỳ tự khắc có cáo thị dán khắp các thành trấn. Về mà chờ.”',e:{}},
  {l:'Hỏi tông môn thu người ra sao',t:'{$a.ten}: “Có ba đường. Tới kỳ tuyển đồ thì thi trắc linh thạch hoặc vấn tâm lộ; thiên linh căn hay biến dị linh căn thì miễn thi. Chưa có tên thì dâng lễ vật làm tạp dịch. Còn đại tu sĩ Nguyên Anh trở lên thì xưng danh, tông môn mời làm Trưởng lão.”',e:{}},
  {l:'Dúi vào tay hắn mấy viên linh thạch, hỏi cho rõ',cost:{st:5},t:'{$a.ten} liếc quanh, hạ giọng: “Trưởng lão chấm thi thích người đạo tâm vững hơn là linh căn đẹp. Vấn tâm lộ dễ qua hơn ngươi tưởng.”',e:{tam:1}},
  {l:'Xưng danh, xin gia nhập làm Trưởng lão',need:{realm:3},t:'Chuông sơn môn điểm chín tiếng. Chưởng môn đích thân ra đón, trao lệnh bài khách khanh.',e:{flag:'tongmon',st:120}},
  {l:'Dâng lễ vật, xin làm tạp dịch',cost:{st:60},req:r=>!r.flags.tongmon,t:'Ngươi gánh nước bổ củi hai năm, rảnh thì lén nghe giảng đạo. Cuối cùng cũng được ghi tên vào sổ.',e:{flag:'tongmon',tv:12,h:1080}},
  {l:'Xin một gian tĩnh thất khách',need:{stat:{tam:12}},cost:{st:20},t:'Gian phòng đá nhỏ, cửa sổ nhìn ra biển mây. Ngươi ngồi một đêm, lòng lặng như nước.',e:{tamma:-8,tv:2}},
  {l:'Cáo từ',t:'Ngươi chắp tay, lui xuống núi.',e:{}}
 ]});
{const _pa2=placeActs;placeActs=function(n){let L=_pa2(n);const r=G.run;
  L=L.filter(a=>a.a!=='bq1'&&a.a!=='bq3'&&a.a!=='khaiphu');
  const add=(a,l,h,tip,dis,x)=>L.push({a,i:'',l,h,tip,dis:!!dis,x});
  if(n.type==='tong'){add('congmon','Cổng sơn môn',1,'Hỏi han đệ tử canh cổng');
    if(r.flags.tongmon){const m=Math.floor(W().t/HM);const done=n.tv&&n.tv.m===m&&n.tv.k===r.kiep;
      add('tongviec','Việc tông môn',10*HD,'Tuần sơn, canh dược viên mười ngày. Được 6 cống hiến. Mỗi tháng một lần.',done,done?'tháng này xong rồi':'+6 cống hiến');
      add('conghien','Điện cống hiến',0,'Nộp vật liệu lấy cống hiến, đổi cống hiến lấy đan dược',false,'đang có '+(r.ch||0));
      add('tinhthat','Tĩnh thất tụ linh',0,'Thuê phòng tu luyện của tông môn: nhanh gấp rưỡi, không bị quấy nhiễu. '+CH_YEAR+' cống hiến mỗi năm.',(r.ch||0)<CH_YEAR/4,CH_YEAR+' cống hiến mỗi năm');}}
  if(n.type==='cho'){add('taphoa','Sạp pháp khí, đan dược',1,'Mua đan dược, bí tịch, pháp bảo');add('laibuon','Lái buôn thu mua',0,'Bán bớt pháp bảo, đan dược lấy linh thạch');add('tea','Quán trà đầu chợ',1,'Nghe ngóng tin tức quanh vùng');}
  if(n.type==='ancu'){const m=Math.floor(W().t/HM);const done=n.tg&&n.tg.m===m&&n.tg.k===r.kiep;add('thinhgiao','Thỉnh giáo ẩn sĩ',HD,'Ngồi nghe một ngày. Tâm tĩnh lại, có khi ngộ ra điều gì. Mỗi tháng một lần.',done,done?'người đã đóng cửa':'');}
  if(isWild(n)&&!n.dp)add('khaiphu','Khai phủ',HM,'Đào một động phủ ở đây: bế quan nhanh hơn, ít bị quấy, và đột phá được',dangerTag(n)>=3,dangerTag(n)>=3?'Đất này là tử địa.':'');
  return L;};}
{const _pa3=placeAct;placeAct=function(a){const r=G.run,sc=r&&r.scene;
  if(!['congmon','tongviec','thinhgiao'].includes(a))return _pa3(a);
  if(!sc||sc.type!=='place')return;const n=nodeById(sc.id);const act=placeActs(n).find(x=>x.a===a);if(!act||act.dis)return;sc.msg=[];sc.chips=[];
  if(a==='congmon'){advanceTime(1);if(G.run&&G.run.scene===sc)startEvent('cong_son_mon');return;}
  const m=Math.floor(W().t/HM);
  if(a==='tongviec'){n.tv={m,k:r.kiep};advanceTime(10*HD);if(!G.run||G.run.scene!==sc)return;r.ch=(r.ch||0)+6;sc.msg=['Mười ngày tuần sơn, tưới dược viên, chép kinh. Chấp sự ghi cho ngươi sáu điểm cống hiến.'];sc.chips=[chip('🏅','+6 cống hiến','Dùng ở Điện cống hiến và Tĩnh thất','up'),chip('⏳','10 ngày','Thời gian trôi qua','')];return;}
  if(a==='thinhgiao'){n.tg={m,k:r.kiep};advanceTime(HD);if(!G.run||G.run.scene!==sc)return;sc.msg=[pick(['Lão ẩn sĩ rót trà, nói chuyện mây gió. Tới câu thứ ba ngươi mới hiểu lão đang giảng đạo.','Chủ nhân thảo lư không ngẩng đầu khỏi bàn cờ. “Ngồi. Xem hết ván này rồi nói.”'])];sc.chips=[chip('⏳','1 ngày','Thời gian trôi qua','')].concat(applyE({tv:3,tamma:-6,dao:chance(.25)?1:0}));return;}
};}
// thăm dò ở nơi có người: hàng hóa chắc chắn có và thứ chỉ gặp khi có duyên
function townStats(n){const r=G.run,g=r.region,L=[],M=[];const q=g>=2?2:g>=1?1:0;const G1=clamp(g,0,4),G2=clamp(g+1,0,4);
  const rg=(a,b)=>a===b?a:a+' – '+b;
  if(n.type==='thanh'||n.type==='tran'||n.type==='cho'){L.push(['Đan dược',rg(PQ[0],PQ[q])],['Công pháp','bậc 1 – bậc '+Math.min(4,g+2)],['Pháp bảo',rg(GRADE[G1],GRADE[G2])]);
    if(n.type!=='cho')L.push(['Phương tiện',MOUNT.filter(m=>r.realm>=(m.realm||0)).map(m=>m.n).join(', ')],['Tin tức','điểm lân cận, người qua lại']);}
  if(n.type==='tong')L.push(['Công pháp (Tàng Kinh Các)','bậc 1 – bậc '+Math.min(4,g+2)],['Đan dược (đổi cống hiến)',PQ[1]],['Tĩnh thất tụ linh','tu luyện nhanh gấp rưỡi']);
  if(n.type==='ancu')L.push(['Chỉ điểm','tu vi, đạo tâm, đôi khi đạo cơ']);
  M.push(['Thương đội ghé qua','pháp bảo '+rg(GRADE[G1],GRADE[G2])+', đan dược '+rg(PQ[0],PQ[2])],['Hội đấu giá','pháp bảo '+rg(GRADE[G2],GRADE[clamp(g+2,0,4)])+', lệnh bài thông quan'],['Thiên kiêu đi ngang','luận võ, kết giao hoặc kết oán']);
  if(n.type==='thanh'||n.type==='cho')M.push(['Quỷ thị ban đêm','đồ không rõ gốc, '+rg(GRADE[G1],GRADE[clamp(g+2,0,4)])]);
  const evs=EVS.filter(e=>!e.spec&&(e.src||'explore')==='explore'&&e.tg&&e.tg.includes(tAs(n.type))&&(!e.r||e.r.includes(g))).slice(0,8).map(e=>e.n).filter(Boolean);
  return {L,M,evs};}

// ================= THƯƠNG THẾ =================
// Thua hoặc nhận thua: bị thương, bị lục đồ. Đang bị thương mà thua nữa: chết. Để vài tháng tới một năm thì tự lành.
function injured(){const r=G.run;return !!(r&&r.inj&&r.inj.until>W().t);}
function injHeal(msg){const r=G.run;if(r&&r.inj){r.inj=null;clampHp();if(msg)note(msg,'up');}}
function lootPlayer(sc){const r=G.run;const out=[];const E=EN[sc.en.k];const human=!E||E.f==='nhan'||sc.boss;
  if(r.st>0){const d=Math.max(1,Math.round(r.st*(0.2+R()*0.2)));r.st-=d;out.push(d+' linh thạch');}
  if(human){const n=ri(1,2);for(let i=0;i<n;i++){const pool=[];r.relics.forEach((x,j)=>{if(!x.u)pool.push(['r',j]);});r.pills.forEach((x,j)=>pool.push(['p',j]));if(!pool.length)break;const [k,j]=pick(pool);
      if(k==='r'){const x=r.relics.splice(j,1)[0];out.push(x.name);const c=run2().chu;for(let q=0;q<8;q++)if(c[q]&&c[q].k==='r'&&c[q].n===x.name)c[q]=null;}else{const x=r.pills.splice(j,1)[0];out.push(PILL[x.id].n);}}}
  return out;}
function playerYield(){const sc=G.run.scene;const u=readyPlayer(sc);if(!u||sc.kiep||sc.spar||sc.en.n==='Tâm Ma'||injured())return false;
  runAct(sc,()=>{sc.over='lose';sc.beaten=2;clog(sc,'Ngươi buông tay, nhận thua.','me');finishCombat(sc);});return true;}
{const _ce=checkEnd;checkEnd=function(sc){
  if(!sc.over&&!sc.spar&&!sc.kiep&&sc.en&&sc.en.n!=='Tâm Ma'){const me=mainUnit(sc);
    if(me.hp<=0&&!injured()&&!(U('hoi')&&!G.run.revived)){me.hp=1;sc.over='lose';sc.beaten=1;clog(sc,'Ngươi gục xuống, không còn sức đánh trả.','en');finishCombat(sc);return;}}
  _ce(sc);};}
{const _fc2=finishCombat;finishCombat=function(sc){_fc2(sc);const r=G.run;if(!r||!sc.beaten||sc.looted)return;sc.looted=1;
  const mo=sc.beaten===2?ri(2,5):ri(4,12);r.inj={until:W().t+mo*HM};clampHp();
  const L=lootPlayer(sc);
  if(L.length)clog(sc,`${sc.en.n} lục soát người ngươi, lấy đi: ${L.join(', ')}.`,'en');
  log(`Thua ${sc.en.n}, bị thương`+(L.length?', mất '+L.join(', '):'')+'.');};}
{const _agg2=aggFx;aggFx=function(){const fx=_agg2();if(injured()){fx.atkP=(fx.atkP||0)-20;fx.defP=(fx.defP||0)-20;fx.matkP=(fx.matkP||0)-20;}return fx;};}
{const _ac2=autoCheck;autoCheck=function(){const r=G.run;if(r&&r.inj&&r.inj.until<=W().t)injHeal('Thương thế đã lành hẳn.');_ac2();};}
{const _pa4=placeAct;placeAct=function(a){const was=injured();_pa4(a);if(was&&a==='heal'&&G.run)injHeal('Một tháng tĩnh dưỡng, thương thế đã lành.');};}
{const _hb=healBuy;healBuy=function(){const r=G.run;const st=r.st;_hb();if(G.run&&G.run.st<st&&injured())injHeal('Y sư bó thuốc, nắn xương. Thương thế đã lành.');};}

// ================= CÁC LOẠI THƯƠNG THẾ =================
// m: số tháng tự lành [ít, nhiều]; fx: ảnh hưởng khi còn mang; perm: vĩnh viễn cho tới cảnh giới regen
const WOUND={
  ngoai:{n:'Ngoại thương',m:[2,6],fx:{atkP:-10,defP:-10},d:'Vết chém, vết cào ngoài da thịt.'},
  bong:{n:'Bỏng',m:[3,8],fx:{defP:-15},d:'Da thịt cháy sém.'},
  gay:{n:'Gãy xương',m:[6,14],fx:{atkP:-15,tp:-3},d:'Xương gãy, cử động khó.'},
  noi:{n:'Nội thương',m:[12,24],fx:{mpP:-20,matkP:-20},d:'Kinh mạch chấn động, chân khí tán loạn.'},
  than:{n:'Thần thức tổn thương',m:[12,30],fx:{ngo:-3,tam:-2},d:'Thức hải rạn nứt, đầu đau như búa bổ.'},
  doc:{n:'Trúng độc',m:[6,12],fx:{},d:'Mỗi giờ mất 1% khí huyết (không xuống dưới một phần mười). Giải Độc Đan trị dứt.'},
  nguy:{n:'Vết thương chí mạng',fx:{atkP:-25,defP:-25},d:'Phải dùng đan hồi khí huyết trong ba ngày, không thì chết hoặc tàn phế.'},
  mu:{n:'Mù một mắt',perm:1,fx:{dodge:-6,crit:-5},d:'Thương tật vĩnh viễn.'},
  cut:{n:'Cụt một tay',perm:1,fx:{atkP:-25},d:'Thương tật vĩnh viễn.'},
  que:{n:'Què chân',perm:1,fx:{tp:-4},d:'Thương tật vĩnh viễn.'},
};
const REGEN_REALM=3; // Nguyên Anh: tái tạo nhục thân, thương tật vĩnh viễn mới lành
const HEAL_PILL=['hoixuan','baohuyet'];
function wounds(){const r=G.run;if(!r)return [];if(!r.wounds)r.wounds=[];if(r.inj){if(r.inj.until>W().t)r.wounds.push({k:'ngoai',until:r.inj.until});r.inj=null;}return r.wounds;}
function addWound(k,by){const r=G.run,L=wounds(),w=W(),D=WOUND[k];const old=L.find(x=>x.k===k);
  if(D.perm){if(!old)L.push({k,perm:1});return D.n;}
  if(k==='nguy'){if(!old)L.push({k,dl:w.t+3*HD,by});return D.n;}
  const u=w.t+ri(D.m[0],D.m[1])*HM;if(old)old.until=Math.max(old.until,u)+2*HM;else L.push({k,until:u});return D.n;}
function cureWound(ks){const r=G.run;const n=wounds().length;r.wounds=r.wounds.filter(x=>!ks.includes(x.k));clampHp();return n-r.wounds.length;}
function injured(){return wounds().some(x=>!x.perm&&x.k!=='doc');}
function injHeal(){}
function woundText(x){const D=WOUND[x.k],w=W();return x.perm?'Vĩnh viễn, tới '+REALM[REGEN_REALM]+' mới tái tạo được.':x.k==='nguy'?'Còn '+durH(Math.max(1,x.dl-w.t))+' để dùng đan hồi khí huyết!':'Tự lành sau chừng '+durH(Math.max(1,x.until-w.t))+'.';}
function woundTick(){const r=G.run;if(!r)return;const L=wounds(),w=W();const dt=Math.max(0,w.t-(r.wT==null?w.t:r.wT));r.wT=w.t;if(!L.length)return;
  if(r.realm>=REGEN_REALM&&L.some(x=>x.perm)){r.wounds=L.filter(x=>!x.perm);note('Nhục thân tái tạo: thương tật cũ đã lành.','up');log('Thương tật vĩnh viễn được tái tạo.');}
  for(const x of r.wounds.slice()){
    if(x.k==='doc'&&dt>0){const s=S();const fl=Math.ceil(s.maxHp*0.1);if(r.hp>fl)r.hp=Math.max(fl,Math.round(r.hp-s.maxHp*0.01*dt));}
    if(x.until&&x.until<=w.t){r.wounds=r.wounds.filter(y=>y!==x);note(WOUND[x.k].n+' đã lành.','up');}
    if(x.k==='nguy'&&x.dl<=w.t){r.wounds=r.wounds.filter(y=>y!==x);
      if(chance(.3)&&!r.scene){log('Vết thương chí mạng không được chữa.');die('combat',{n:x.by||'kẻ thù cũ'});return;}
      const p=pick(['mu','cut','que']);addWound(p);addWound('noi');note('Vết thương không được chữa kịp: '+WOUND[p].n.toLowerCase()+'.','dn');log('Để lại thương tật: '+WOUND[p].n+'.');}}
  clampHp();}
function rollWounds(sc){const E=EN[sc.en.k]||{};const el=sc.en.el;const out=[];
  if(sc.beaten===2){out.push(addWound('ngoai'));return out;}
  const pool=[['ngoai',35],['gay',20],['noi',20]];if(el==='hoa'||el==='loi')pool.push(['bong',25]);if(E.f==='quy'||el==='am')pool.push(['than',25]);
  out.push(addWound(wpick(pool,x=>x[1])[0]));if(chance(.3))out.push(addWound(wpick(pool,x=>x[1])[0]));
  const fx=aggFx();if(!fx.poisonImm&&((E.pat||[]).includes('poison')||(E.f==='thu'&&chance(.25))))out.push(addWound('doc'));
  if(chance(.06))out.push(addWound('nguy',sc.en.n));else if(chance(.03))out.push(addWound(pick(['mu','cut','que'])));
  return [...new Set(out)];}
{const _fc3=finishCombat;finishCombat=function(sc){_fc3(sc);const r=G.run;if(!r||!sc.beaten||sc.wounded)return;sc.wounded=1;r.inj=null;
  const L=rollWounds(sc);clog(sc,'Thương thế: '+L.join(', ')+'. Chưa lành mà thua nữa là chết.','en');log('Mang thương: '+L.join(', ')+'.');
  if(L.includes(WOUND.nguy.n))note('Vết thương chí mạng! Dùng đan hồi khí huyết trong ba ngày.','dn');};}
{const _agg3=aggFx;aggFx=function(){const fx=_agg3();const r=G.run;if(r&&r.wounds)for(const x of r.wounds){const f=WOUND[x.k].fx;for(const k in f)fx[k]=(fx[k]||0)+f[k];}return fx;};}
{const _ac3=autoCheck;autoCheck=function(){woundTick();if(G.run)_ac3();};}
{const _up=usePill;usePill=function(idx,inCombat){const r=G.run;const p=r.pills[idx];const id=p&&p.id;const res=_up(idx,inCombat);
  if(G.run&&id&&r.pills[idx]!==p){if(id==='giaidoc'&&cureWound(['doc']))note('Độc đã giải.','up');if(HEAL_PILL.includes(id)&&cureWound(['nguy'])){addWound('ngoai');note('Giữ được mạng. Vết thương chí mạng còn lại ngoại thương.','up');}}
  return res;};}
{const _pa5=placeAct;placeAct=function(a){const had=wounds().length;_pa5(a);const r=G.run;if(!r||!had||a!=='heal')return;
  const n=cureWound(['ngoai','bong']);for(const x of r.wounds)if(x.until)x.until-=6*HM;woundTick();if(n)note('Một tháng tĩnh dưỡng: vết thương ngoài da đã lành.','up');};}
{const _hb2=healBuy;healBuy=function(){const r=G.run;const st=r.st;_hb2();if(!G.run||G.run.st>=st||!wounds().length)return;
  const n=cureWound(['ngoai','bong','gay','doc','nguy']);for(const x of r.wounds)if(x.until)x.until-=6*HM;woundTick();if(n)note('Y sư bó thuốc, nắn xương, giải độc. Nội thương và thần thức thì phải chờ.','up');};}

// ================= LƯỚI LỤC GIÁC =================
// Ô đỉnh nhọn, hàng lẻ lệch nửa ô. Mọi địa điểm và nhân vật nằm đúng tâm một ô; đi đường là đi qua từng ô.
function makeNoise(seed){const rnd=mul(seed);const G0=17,g=new Float32Array(G0*G0);for(let i=0;i<g.length;i++)g[i]=rnd();
  const at=(x,y)=>g[((y%G0+G0)%G0)*G0+((x%G0+G0)%G0)];
  const n1=(x,y)=>{const xi=Math.floor(x),yi=Math.floor(y);let fx=x-xi,fy=y-yi;fx=fx*fx*(3-2*fx);fy=fy*fy*(3-2*fy);
    const a=at(xi,yi),b=at(xi+1,yi),c=at(xi,yi+1),d=at(xi+1,yi+1);return a+(b-a)*fx+(c-a)*fy+(a-b-c+d)*fx*fy;};
  return (x,y)=>n1(x*4,y*4)*0.55+n1(x*9+3.7,y*9+1.3)*0.3+n1(x*19+7.1,y*19+5.9)*0.15;}
const CELL=[{ox:0,oy:1000,mx:0},{ox:1000,oy:1000,mx:0},{ox:2000,oy:1000,mx:0},{ox:2000,oy:0,mx:1},{ox:1000,oy:0,mx:1},{ox:0,oy:0,mx:0}];
const WORLD_W=3556,WORLD_H=2000,XS=WORLD_W/3000; // 16:9; mỗi vùng giãn ngang XS lần khi lên bản đồ
function mapXY(k,x,y){const c=CELL[k],lx=x-k*1000;return [(c.ox+(c.mx?1000-lx:lx))*XS,c.oy+y];}
function invXY(k,dx,dy){const c=CELL[k],u=dx/XS;const lx=c.mx?1000-(u-c.ox):u-c.ox;return [k*1000+lx,dy-c.oy];}
const HEXW=60,HEXP=HEXW*0.8660254,HCOLS=59,HROWS=38,HN=HCOLS*HROWS;
function hexCenter(i){const c=i%HCOLS,r=(i-c)/HCOLS;return [(c+0.5+(r%2)*0.5)*HEXW,(r+2/3)*HEXP];}
function hexAt(x,y){const r0=Math.round(y/HEXP-2/3);let best=0,bd=1e18;
  for(let r=Math.max(0,r0-1);r<=Math.min(HROWS-1,r0+1);r++){const c0=Math.round(x/HEXW-0.5-(r%2)*0.5);
    for(let c=Math.max(0,c0-1);c<=Math.min(HCOLS-1,c0+1);c++){const cx=(c+0.5+(r%2)*0.5)*HEXW,cy=(r+2/3)*HEXP,d=(x-cx)*(x-cx)+(y-cy)*(y-cy);if(d<bd){bd=d;best=r*HCOLS+c;}}}
  return best;}
function hexNb(i){const c=i%HCOLS,r=(i-c)/HCOLS,d=r%2?1:-1;const o=[];for(const [x,y] of [[c-1,r],[c+1,r],[c,r-1],[c+d,r-1],[c,r+1],[c+d,r+1]])if(x>=0&&x<HCOLS&&y>=0&&y<HROWS)o.push(y*HCOLS+x);return o;}
function hexVerts(i){const [x,y]=hexCenter(i),dx=HEXW/2,dy=HEXP;return [[x,y-dy*2/3],[x+dx,y-dy/3],[x+dx,y+dy/3],[x,y+dy*2/3],[x-dx,y+dy/3],[x-dx,y-dy/3]];}
const TER_N=['Biển','Đồng bằng','Rừng','Núi cao','Sông hồ'],TER_COST=[6,1,1.3,2.5,2];
let GEO=null;
function geoFor(w){if(GEO&&GEO.seed===w.seed)return GEO;
  const nz=makeNoise(hashS('terr'+w.seed));const reg=new Int8Array(HN),ter=new Uint8Array(HN),dist=new Int16Array(HN).fill(-1);
  const sd=(X,Y)=>{let m=1e9;for(let c=0;c<5;c++){const C0=CELL[c];const dx=Math.max(C0.ox+30-X,0,X-(C0.ox+970)),dy=Math.max(C0.oy+30-Y,0,Y-(C0.oy+970));const d=Math.hypot(dx,dy);if(d<m)m=d;}return m;};
  for(let i=0;i<HN;i++){const hcn=hexCenter(i),X=hcn[0]/XS,Y=hcn[1];let k=-1;for(let c=0;c<5;c++){const C0=CELL[c];if(X>=C0.ox&&X<C0.ox+1000&&Y>=C0.oy&&Y<C0.oy+1000)k=c;}
    const sea=k<0||sd(X,Y)-(nz(X/620+5.3,Y/620+9.1)-0.42)*300>0;reg[i]=sea?-1:k;if(sea){ter[i]=0;continue;}
    const T0=REG[k].types,wet=T0.includes('bien')?0.46:T0.includes('song')?0.3:0.22,e=nz(X/1500,Y/1500);
    ter[i]=e<wet?4:e>0.66?3:nz(X/300+9,Y/300+4)>0.5?2:1;}
  // tiểu khu vực: mỗi vùng chia sáu quận quanh sáu hạt giống
  const dnames=[];const rnd=mul(hashS('quan'+w.seed));const pool=NAME_PRE.slice();
  for(let k=0;k<5;k++){const cells=[];for(let i=0;i<HN;i++)if(reg[i]===k)cells.push(i);const seeds=[];
    for(let g=0;g<400&&seeds.length<6&&cells.length;g++){const c=cells[Math.floor(rnd()*cells.length)];const p=hexCenter(c);if(seeds.every(s=>{const q=hexCenter(s);return Math.hypot(p[0]-q[0],p[1]-q[1])>260;}))seeds.push(c);}
    const base=dnames.length;for(const s of seeds){const j=Math.floor(rnd()*pool.length);dnames.push((pool.splice(j,1)[0]||'Vô Danh')+' Quận');}
    for(const i of cells){const p=hexCenter(i);let b=0,bd=1e18;seeds.forEach((s,j)=>{const q=hexCenter(s);const d=(p[0]-q[0])**2+(p[1]-q[1])**2;if(d<bd){bd=d;b=j;}});dist[i]=base+b;}}
  return GEO={seed:w.seed,nz,reg,ter,dist,dnames,paths:{},nodeAt:null};}
function geo(){return geoFor(W());}
// đặt mọi địa điểm vào đúng tâm một ô đất trống trong vùng của nó
function snapWorld(w){if(!w||!w.regions)return;const g=geoFor(w);const used=new Set();g.paths={};g.nodeAt=null;
  for(const R0 of w.regions){const k=R0.k;
    for(const n of R0.nodes){const d=mapXY(k,n.x,n.y);let c=hexAt(d[0],d[1]);
      if(used.has(c)||g.reg[c]!==k){const seen=new Set([c]);let fr=[c],found=-1;for(let it=0;it<40&&found<0&&fr.length;it++){const nx=[];for(const a of fr)for(const b of hexNb(a)){if(seen.has(b))continue;seen.add(b);nx.push(b);if(found<0&&!used.has(b)&&g.reg[b]===k)found=b;}fr=nx;}
        if(found>=0)c=found;}
      used.add(c);n.hex=c;const p=hexCenter(c);const q=invXY(k,p[0],p[1]);n.x=Math.round(q[0]*10)/10;n.y=Math.round(q[1]*10)/10;if(n.rx!=null){const pr=invXY(k,...hexCenter(hexAt(...mapXY(k,n.rx,n.ry))));n.rx=pr[0];n.ry=pr[1];}}
    for(const e of R0.edges){const a=R0.nodes[e.a%100],b=R0.nodes[e.b%100];if(a&&b)e.len=Math.round(Math.hypot(a.x-b.x,a.y-b.y));}}}
{const _gw2=genWorld;genWorld=function(seed){const w=_gw2(seed);snapWorld(w);return w;};}
{const _nm2=newMeta;newMeta=function(){const m=_nm2();snapWorld(m.world);return m;};}
// đường đi qua các ô: biển đi được nhưng rất tốn (thuê thuyền), núi và sông hồ chậm hơn đồng bằng
function hexPath(a,b){const g=geo();const key=a+'>'+b;if(g.paths[key])return g.paths[key];
  const D=new Float32Array(HN).fill(1e9),P=new Int32Array(HN).fill(-1);const [bx,by]=hexCenter(b);const heap=[[0,a]];D[a]=0;
  const push=x=>{heap.push(x);let i=heap.length-1;while(i>0){const p=(i-1)>>1;if(heap[p][0]<=heap[i][0])break;[heap[p],heap[i]]=[heap[i],heap[p]];i=p;}};
  const pop=()=>{const t=heap[0],l=heap.pop();if(heap.length){heap[0]=l;let i=0;for(;;){let m=i;const x=2*i+1,y=x+1;if(x<heap.length&&heap[x][0]<heap[m][0])m=x;if(y<heap.length&&heap[y][0]<heap[m][0])m=y;if(m===i)break;[heap[m],heap[i]]=[heap[i],heap[m]];i=m;}}return t;};
  while(heap.length){const [f,u]=pop();if(u===b)break;const du=D[u];for(const v of hexNb(u)){const nd=du+TER_COST[g.ter[v]];if(nd<D[v]){D[v]=nd;P[v]=u;const [vx,vy]=hexCenter(v);push([nd+Math.hypot(vx-bx,vy-by)/HEXW,v]);}}}
  const cells=[];for(let c=b;c>=0;c=P[c]){cells.push(c);if(c===a)break;}cells.reverse();
  const cum=[0];for(let i=1;i<cells.length;i++)cum.push(cum[i-1]+TER_COST[g.ter[cells[i]]]);
  const res={cells,cum,len:Math.max(1,cum[cum.length-1])*HEXW};g.paths[key]=res;g.paths[b+'>'+a]={cells:cells.slice().reverse(),cum:cum.map(x=>cum[cum.length-1]-x).reverse(),len:res.len};return res;}
function nodeHex(n){return n.hex!=null?n.hex:hexAt(...mapXY(Math.floor(n.id/100),n.x,n.y));}
function findPath(from,to){if(Math.floor(from/100)!==Math.floor(to/100))return null;return from===to?[from]:[from,to];}
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
function hexInfo(i){const g=geo();const k=g.reg[i];return {i,sea:k<0,reg:k,regName:k<0?'Vô Tận Hải':REG[k].n,dist:k<0?'':g.dnames[g.dist[i]]||'',ter:TER_N[g.ter[i]]};}
function hexNode(i){const g=geo(),r=G.run;if(!g.nodeAt||g.nodeKey!==r.kiep+':'+W().t){g.nodeAt={};g.nodeKey=r.kiep+':'+W().t;for(const R0 of W().regions)for(const n of R0.nodes){if(n.fog<1)continue;const h=(n.fog>=2||n.memory)?nodeHex(n):hexAt(...mapXY(R0.k,...nodeShown(n)));if(g.nodeAt[h]==null||n.fog>=2)g.nodeAt[h]=n.id;}}
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
// ----- túi đồ: gom mọi thứ mang theo thành các ô, cùng loại thì chồng lên nhau -----
const BAG_CAT={all:'Tất cả',eq:'Trang bị',dan:'Đan dược',duoc:'Linh dược',khoang:'Khoáng sản',vl:'Vật liệu',trung:'Trứng',nv:'Nhiệm vụ'};
function bagItems(){const r=run2();eqOf();const L=[];
  r.relics.forEach((x,i)=>L.push({key:'r'+i,cat:'eq',n:x.name,tier:x.tier||0,cnt:1,el:x.el||'vo',slot:slotOf(x),ref:{t:'rel',i},tip:fxLines(relicFx(x),x).join('\n')+'\n\n'+(x.lore||'')}));
  const st={};r.pills.forEach((p,i)=>{const k='p'+p.id+':'+(p.q||0);if(!st[k])L.push(st[k]={key:k,cat:'dan',n:PILL[p.id].n,tier:p.q||0,cnt:0,em:PILL[p.id].i,ref:{t:'pill',id:p.id,q:p.q||0},use:PILL[p.id].w==='any',tip:pillTip(p.id,p.q)});st[k].cnt++;});
  const M={thao:'duoc',khoang:'khoang',dan:'vl'};for(const k in MAT)if(r.mats[k]>0)L.push({key:'m'+k,cat:M[k],n:MAT[k].n,tier:0,cnt:r.mats[k],em:MAT[k].i,ref:{t:'mat',k},tip:MAT[k].d});
  r.eggs.forEach((e,i)=>L.push({key:'e'+i,cat:'trung',n:'Trứng '+e.n,tier:1,cnt:1,em:'🥚',ref:{t:'egg',i},tip:e.t>W().t?'Còn '+durH(e.t-W().t)+' nữa thì nở.':'Sắp nở.'}));
  r.passes.forEach(g=>L.push({key:'q'+g,cat:'nv',n:'Lệnh bài thông quan '+REG[g].n,tier:2,cnt:1,em:'🎫',ref:{t:'pass'},tip:'Trình ở quan ải để sang '+REG[g].n+'.'}));
  return L;}
function bagUse(key,n){const r=G.run;const it=bagItems().find(x=>x.key===key);if(!it||!it.use)return 0;let c=0;
  for(let k=0;k<n;k++){const i=r.pills.findIndex(p=>p.id===it.ref.id&&(p.q||0)===it.ref.q);if(i<0)break;const m=usePill(i,false);if(!G.run)break;if(m===false||r.pills[i]&&r.pills.filter(p=>p.id===it.ref.id&&(p.q||0)===it.ref.q).length===it.cnt-c)break;c++;}
  if(c&&G.run)log('Dùng '+c+' '+it.n+'.');return c;}
function bagDrop(key,n){const r=G.run;const it=bagItems().find(x=>x.key===key);if(!it)return 0;if(it.ref.t==='rel'?r.relics[it.ref.i].lock:(r.locks&&r.locks[key]))return 0;const R0=it.ref;let c=0;
  if(R0.t==='rel'){r.relics.splice(R0.i,1);c=1;}
  else if(R0.t==='pill'){for(let k=0;k<n;k++){const i=r.pills.findIndex(p=>p.id===R0.id&&(p.q||0)===R0.q);if(i<0)break;r.pills.splice(i,1);c++;}}
  else if(R0.t==='mat'){c=Math.min(n,r.mats[R0.k]);r.mats[R0.k]-=c;}
  else if(R0.t==='egg'){r.eggs.splice(R0.i,1);c=1;}
  if(c)log('Vứt '+c+' '+it.n+'.');saveSoon();return c;}

// ================= ĐỢT 5: CÔNG PHÁP, TÂM PHÁP, SỞ HỌC, KỸ NĂNG =================
// Công pháp: cộng chỉ số theo hệ và mang 1–3 chiêu. Tâm pháp: toàn nội tại, đôi khi có đòn thần thức.
// Học từ bí tịch; chỉ môn đang đặt trong vòng vận công mới vận hành.
function skCat(sk){return sk.fx.evade?'move':!sk.fx.p?'def':sk.t>=3?'ult':'atk';}
const CAT_N={atk:'Tấn công',def:'Phòng thủ',move:'Thân pháp',ult:'Thần thông'},CAT_MAX={atk:3,def:3,move:1,ult:1};
const ART_SFX={cp:['Quyết','Kinh','Công','Chân Giải','Đạo Thư','Bí Lục'],tp:['Tâm Kinh','Tâm Pháp','Dưỡng Khí Thiên','Nội Kinh','Tĩnh Tâm Chú']};
const EL_FX={kim:['atkP',6],moc:['hpP',6],thuy:['mpP',8],hoa:['matkP',7],tho:['defP',8],loi:['crit',3],bang:['defP',6],phong:['tp',1.2],am:['drain',3],phat:['tam',1.5],vo:['tvP',5]};
const PAS={
  tu:{n:'Tu luyện',fx:'tvP',v:6,d:'Tu vi nhận thêm {v}%'},bq:{n:'Tĩnh tọa',fx:'bqP',v:8,d:'Bế quan hiệu quả hơn {v}%'},
  than:{n:'Thần thức',fx:'than',v:2,d:'Niệm lực +{v}'},mp:{n:'Hồi linh',fx:'regenMp',v:3,d:'Trong trận mỗi lượt hồi {v}% linh lực'},
  hp:{n:'Hồi sinh lực',fx:'regenHp',v:1.5,d:'Trong trận mỗi lượt hồi {v}% khí huyết'},atk:{n:'Bổ trợ tấn công',fx:'atkP',v:5,d:'Công vật lý +{v}%'},
  matk:{n:'Bổ trợ pháp thuật',fx:'matkP',v:5,d:'Công phép +{v}%'},stage:{n:'Tích lũy',fx:'atkStage',v:2,d:'Mỗi tiểu cảnh giới: công +{v}%'},
  rage:{n:'Chiến ý',fx:'rageTurn',v:0.5,d:'Trong trận mỗi lượt +{v} tầng cuồng nộ, tối đa 5 tầng',int:1},def:{n:'Bổ trợ phòng thủ',fx:'defP',v:6,d:'Thủ +{v}%'},
  ho:{n:'Hộ thể',fx:'startBlock',v:5,d:'Đầu trận có hộ thể bằng {v}% khí huyết'},tl:{n:'Bổ trợ thể lực',fx:'hpP',v:3,d:'Khí huyết +{v}%'},
  tam:{n:'Thanh tâm',fx:'tammaRes',v:12,d:'Tâm ma tăng chậm hơn {v}%'},di:{n:'Khinh thân',fx:'moveP',v:8,d:'Đi đường nhanh hơn {v}%'},
};
const FX_N={atkP:'Công vật lý +{v}%',hpP:'Khí huyết +{v}%',mpP:'Linh lực +{v}%',matkP:'Công phép +{v}%',defP:'Thủ +{v}%',crit:'Chí mạng +{v}%',tp:'Thân pháp +{v}',drain:'Hút {v}% sát thương thành khí huyết',tam:'Đạo tâm +{v}',tvP:'Tu vi nhận thêm {v}%'};
SLOT_N.book='Bí tịch';KSLOT.book='book';BAG_CAT.bitich='Bí tịch';
// ----- công pháp, tâm pháp theo "dòng": mỗi dòng là một chỉ số hoặc một chiêu; tham ngộ lên tầng mới mở dòng kế tiếp,
// và dòng nào ghi cảnh giới thì phải đủ cảnh giới mới có tác dụng. Bản thân môn cũng đòi cảnh giới mới học được.
const ART_REQ=[0,0,1,2,3,4,5];               // cảnh giới tối thiểu thường gặp theo phẩm
const ART_LINES=[3,4,5,6,7,8,9];             // số dòng theo phẩm
const LV_N=['tầng 1','tầng 2','tầng 3','tầng 4','tầng 5','tầng 6','tầng 7','tầng 8','tầng 9'];
const STAGE_FX={atkStage:'Mỗi cảnh giới: công vật lý +{v}%',hpStage:'Mỗi cảnh giới: khí huyết +{v}%',defStage:'Mỗi cảnh giới: thủ +{v}%',matkStage:'Mỗi cảnh giới: công phép +{v}%'};
function reqName(q){return q?REALM[q]:'Phàm nhân';}
function artReqMul(req){return 1+0.12*(req||0);}
// trần cho các chỉ số dễ vỡ cân bằng
const FX_CAP={tammaRes:60,startBlock:30,regenMp:12,regenHp:6,rageTurn:2,moveP:60,bqP:80,tvP:80,crit:20,drain:20,than:40,atkStage:12,tp:12};
function genArt(type,tier,sid,o){const r=G.run;o=o||{};r.aid=(r.aid||0)+1;tier=clamp(Math.round(tier),0,6);
  const req=o.req!=null?o.req:clamp(ART_REQ[tier]+(chance(.25)?1:0),0,5);
  const nL=ART_LINES[tier];const span=tier>=4?2:tier>=2?1:(chance(.5)?1:0);
  let el,sks=[];
  if(type==='cp'){const sk0=SK[sid]||SK[rollSkill(clamp(tier,1,4))];el=sk0.el;const want=tier<=1?1:tier<=3?2:3;sks=[sk0.id];const cats=new Set([skCat(sk0)]);
    for(const id of shuffle(SK_RAW.filter(s=>(s[2]===el||s[2]==='vo')&&s[3]<=clamp(tier+1,1,5)&&s[0]!==sk0.id).map(s=>s[0]))){if(sks.length>=want)break;const c=skCat(SK[id]);if(cats.has(c))continue;cats.add(c);sks.push(id);}}
  else el=o.el||(chance(.6)?pick(r.root.els):pick(['vo','kim','moc','thuy','hoa','tho']));
  // xếp dòng: dòng 1 là chỉ số chính; chiêu rải đều, chiêu mạnh nhất ở cuối
  const L=[];const pas=shuffle(Object.keys(PAS));let pi=0;
  const statLine=()=>{if(chance(.18)&&!L.some(x=>x.fx&&STAGE_FX[x.fx])){const k=pick(Object.keys(STAGE_FX));return {fx:k,v:1.5,stage:1};}const p=PAS[pas[(pi++)%pas.length]];return {fx:p.fx,v:p.v,n:p.n,d:p.d,int:p.int};};
  if(type==='cp'){const e=EL_FX[el]||EL_FX.vo;L.push({fx:e[0],v:e[1]});}else L.push(statLine());
  const skPos=type==='cp'?(sks.length===1?[1]:sks.length===2?[1,nL-1]:[1,Math.floor(nL/2),nL-1]):[];
  const sorted=sks.slice().sort((a,b)=>SK[a].t-SK[b].t);
  const mind=type==='tp'&&chance(tier>=3?.45:.15)?Math.max(1,nL-1):-1;
  for(let i=1;i<nL;i++){const j=skPos.indexOf(i);if(j>=0)L.push({sk:sorted[j]});else if(i===mind)L.push({mind:1});else L.push(statLine());}
  L.forEach((x,i)=>{x.req=clamp(req+Math.floor(i*span/Math.max(1,nL-1)+(i===nL-1&&span?0.01:0)),0,5);});
  const a={u:r.aid,type,n:pick(RELIC_PRE[el]||RELIC_PRE.vo)+' '+pick(ART_SFX[type]),el,tier,req,lv:1,lines:L,v:2};
  return a;}
// bản lưu cũ: đổi môn kiểu cũ (sk, pas, lv 1–3) sang kiểu dòng
function normArt(a){if(!a||a.v===2)return a;const L=[];
  if(a.type==='cp'){const e=EL_FX[a.el]||EL_FX.vo;L.push({fx:e[0],v:e[1]});}
  for(const id of a.sk||[])L.push({sk:id});for(const k of a.pas||[]){const p=PAS[k];if(p)L.push({fx:p.fx,v:p.v,n:p.n,d:p.d,int:p.int});}if(a.mind)L.push({mind:1});
  const req=ART_REQ[a.tier]||0;L.forEach(x=>x.req=req);a.req=req;a.lines=L;a.lv=a.lv>=3?L.length:Math.min(L.length,(a.lv||1)+1);a.v=2;return a;}
function artOpen(a,i){const r=G.run;const x=a.lines[i];return i<a.lv&&r.realm>=x.req;}
function artSk(a){return a.lines.filter((x,i)=>x.sk&&artOpen(a,i)).map(x=>x.sk);}
function artMind(a){return a.lines.some((x,i)=>x.mind&&artOpen(a,i));}
function skLvOf(a){return clamp(1+Math.floor((a.lv-1)/3),1,3);}
function artAff(a){const r=G.run;return a.el==='vo'||r.root.els.includes(a.el)?1:0.8;}
function artScale(a,pot){return Math.pow(PHAM_M[a.tier],0.85)*artReqMul(a.req)*artAff(a)*(pot==null?1:pot);}
function lineVal(a,x,pot){const r=G.run;let v=x.v*artScale(a,pot);if(x.stage)v=x.v*(1+a.tier*0.4)*artAff(a)*(pot==null?1:pot)*(r.realm+1);else if(FX_CAP[x.fx])v=Math.min(FX_CAP[x.fx],v);return x.int?Math.max(1,Math.round(v)):Math.round(v*10)/10;}
function lineText(a,x,pot){if(x.sk){const s=SK[x.sk];return 'Chiêu: '+s.n+' ('+CAT_N[skCat(s)].toLowerCase()+')';}if(x.mind)return 'Đòn thần thức: Thần Thức Thứ';
  const v=numFx(lineVal(a,x,pot));if(x.stage)return STAGE_FX[x.fx].replace('{v}',numFx(Math.round(x.v*(1+a.tier*0.4)*artAff(a)*(pot==null?1:pot)*10)/10))+' (đang +'+v+'%)';return (x.n?x.n+': ':'')+(x.d||FX_N[x.fx]||x.fx).replace('{v}',v);}
// chỉ các dòng chỉ số đã mở mới có tác dụng
function artFxList(a,pot){const L=[];a.lines.forEach((x,i)=>{if(!x.fx||!artOpen(a,i))return;const k=x.stage?x.fx.replace('Stage','P'):x.fx;L.push({k,v:lineVal(a,x,pot),t:x.stage?STAGE_FX[x.fx]:(x.d||FX_N[x.fx]),n:x.n});});return L;}
function artLines(a,pot){return a.lines.map((x,i)=>artOpen(a,i)?lineText(a,x,pot):null).filter(Boolean);}
function numFx(v){return String(v).replace('.',',');}
function artDesc(a){return (a.type==='cp'?'Công pháp':'Tâm pháp')+' hệ '+(EL[a.el]||EL.vo).n+' · cần '+reqName(a.req)+'.\n'+a.lines.map((x,i)=>'• '+lineText(a,x)).join('\n');}
function artNextWhy(a){const r=G.run;if(a.lv>=a.lines.length)return 'Đã tham ngộ hết các tầng.';const x=a.lines[a.lv];if(r.realm<x.req)return 'Tầng kế tiếp cần '+reqName(x.req)+'.';return '';}
function studyTime(a){return Math.round((2+a.lv)*2*(1+a.tier*0.25))*HM;}
function bookOf(a){return {name:'Bí tịch '+a.n,k:'book',tier:a.tier,el:a.el,fx:{},lore:artDesc(a),art:a,seen:1};}
function gainSkill(id){const r=G.run,sk=SK[id];if(!sk)return null;run2();const a=genArt('cp',sk.t,id);const b=bookOf(a);r.relics.push(b);log('Được '+b.name+'.');
  return chip('📖',b.name,PHAM[a.tier]+'\n'+b.lore+'\n\nMở Nhân vật → Sở học để học.','item',a.tier);}
function gainBookTp(tier){const r=G.run;run2();const b=bookOf(genArt('tp',tier));r.relics.push(b);return b;}
function arts(){const r=G.run;if(!r.arts)r.arts=[];for(const a of r.arts)if(a.v!==2)normArt(a);return r.arts;}
function artBy(u){return arts().find(a=>a.u===u);}
function learnTime(a){return (a.tier+1)*2*HM;}
const ART_MAX=10,ART_CAP={cp:[5,6,7,8,9,10],tp:[5,6,7,8,9,10]};
function artCap(type){const r=G.run;return ART_CAP[type][clamp(r.realm,0,5)];}
function learnWhy(rel){const r=G.run;if(rel&&rel.art&&!arts().some(x=>x.n===rel.art.n&&x.type===rel.art.type)&&arts().filter(x=>x.type===rel.art.type).length>=artCap(rel.art.type))return 'Đã đủ '+artCap(rel.art.type)+' ô '+(rel.art.type==='cp'?'công pháp':'tâm pháp')+'. Phế bỏ một môn hoặc lên cảnh giới để mở thêm ô.';if((r.scene&&r.scene.type!=='place')||r.moving)return 'Đang bận việc khác, chưa tham ngộ được.';normArt(rel.art);if(r.realm<rel.art.req)return 'Cần '+reqName(rel.art.req)+' mới đọc hiểu.';return '';}
function learnBook(i){const r=G.run;const rel=r.relics[i];if(!rel||rel.k!=='book'||learnWhy(rel))return null;const a=rel.art;r.relics.splice(i,1);
  const old=arts().find(x=>x.n===a.n&&x.type===a.type);advanceTime(learnTime(a));if(!G.run)return null;let t;
  if(old){if(old.lv<old.lines.length)old.lv++;t=`Đọc lại ${a.n}, lĩnh hội thêm một tầng: ${LV_N[old.lv-1]}.`;}
  else{r.arts.push(a);const n=chuSlots();for(let j=0;j<n;j++)if(!r.chu[j]){r.chu[j]={k:'a',u:a.u};break;}t=`Học được ${a.n}.`;if(a.lines.some(x=>x.sk&&SK[x.sk].dao)&&addDao(3,'skill'))t+=' Đạo cơ +3.';}
  log(t);syncSkills();clampHp();autoCheck();saveSoon();return t;}
function studyArt(u){const r=G.run;const a=artBy(u);if(!a||artNextWhy(a)||(r.scene&&r.scene.type!=='place')||r.moving)return null;advanceTime(studyTime(a));if(!G.run)return null;a.lv++;const t=`Tham ngộ ${a.n}: ${LV_N[a.lv-1]}.`;log(t);syncSkills();clampHp();autoCheck();saveSoon();return t;}
function dropArt(u){const r=G.run;r.arts=arts().filter(a=>a.u!==u);for(let j=0;j<8;j++)if(r.chu[j]&&r.chu[j].u===u)r.chu[j]=null;syncSkills();clampHp();saveSoon();}
function learnAll(){const r=G.run;if(!r||(r.scene&&r.scene.type!=='place')||r.moving)return;for(let i=r.relics.length-1;i>=0&&G.run;i--)if(r.relics[i]&&r.relics[i].k==='book'&&!learnWhy(r.relics[i]))learnBook(i);}
// ----- vòng vận công: giờ đặt công pháp, tâm pháp. Có huyệt (mạnh gấp rưỡi) và ô tắc phải đả thông -----
function chuKey(c){return c?'a:'+c.u:'';}
function chuItem(c){if(!c||c.k!=='a')return null;const a=artBy(c.u);return a?{k:'a',u:a.u,n:a.n,el:a.el,tier:a.tier,type:a.type,lv:a.lv}:null;}
function chuPool(){const r=run2();const used=new Set(r.chu.filter(Boolean).map(c=>c.u));return arts().filter(a=>!used.has(a.u)).map(a=>({k:'a',u:a.u}));}
function chuSlots(){const r=G.run;if(!r.chuOpen)r.chuOpen=4;return Math.min(r.chuOpen,CHU_N[r.realm]||4);}
function chuBlocked(){const r=G.run;return Math.max(0,(CHU_N[r.realm]||4)-chuSlots());}
function chuUnblock(){const r=G.run;if(!chuBlocked()||r.tv<15||r.scene||r.moving)return false;r.tv-=15;advanceTime(6*HM);if(!G.run)return true;r.chuOpen=chuSlots()+1;log('Đả thông một đoạn kinh mạch bị tắc.');autoCheck();saveSoon();return true;}
function chuHuyet(){const r=G.run;const h=hashS('huyet'+r.ten+r.kiep);const a=h%8;let b=(h>>>3)%8;if(b===a)b=(b+3)%8;return [a,b];}
function chuPot(v,i){const n=v.n;const lin=v.links[(i-1+n)%n];return Math.max(0.3,1+(lin===1?0.15:lin===-1?-0.15:lin===2?0.08:0)+(chuHuyet().includes(i)?0.5:0)+(v.dai?0.2:0));}
function chuFx(fx){const r=G.run;if(!r||!r.chu||!r.arts)return;const v=chuView();
  for(let i=0;i<v.n;i++){const it=v.it[i];if(!it)continue;const a=artBy(it.u);for(const x of artFxList(a,chuPot(v,i)))fx[x.k]=(fx[x.k]||0)+x.v;
    const l=v.links[(i-1+v.n)%v.n];if(l)fx.elP[it.el]=(fx.elP[it.el]||0)+(l===1?6:l===2?3:-5);}
  if(v.dai)fx.tvP=(fx.tvP||0)+10;}
function activeArts(){const r=run2();const n=chuSlots();const L=[];for(let i=0;i<n;i++){const a=r.chu[i]&&artBy(r.chu[i].u);if(a)L.push(a);}return L;}
// ----- kỹ năng: gắn chiêu của các môn đang vận hành vào ô dùng trong trận -----
function knAvail(cat){const m={};for(const a of activeArts()){const lv=skLvOf(a);for(const id of artSk(a))if(skCat(SK[id])===cat&&(!m[id]||m[id]<lv))m[id]=lv;}return m;}
function syncSkills(){const r=G.run;if(!r||!r.arts)return;if(!r.kn)r.kn={atk:[],def:[],move:[],ult:[]};const out=[];
  for(const c in CAT_MAX){const av=knAvail(c);let L=(r.kn[c]||[]).filter((id,i,A)=>av[id]&&A.indexOf(id)===i).slice(0,CAT_MAX[c]);
    if(!r.knManual||!r.knManual[c])for(const id of Object.keys(av).sort((x,y)=>SK[y].t-SK[x].t)){if(L.length>=CAT_MAX[c])break;if(!L.includes(id))L.push(id);}
    r.kn[c]=L;for(const id of L)out.push({id,lv:av[id]});}
  r.skills=out;r.atkSlots=r.kn.atk.slice();r.pendingSkill=null;}
function knSet(cat,i,id){const r=G.run;syncSkills();r.knManual=r.knManual||{};r.knManual[cat]=1;const L=r.kn[cat];if(id==null)L.splice(i,1);else{const j=L.indexOf(id);if(j>=0)L.splice(j,1);if(i<L.length)L[i]=id;else L.push(id);}syncSkills();saveSoon();}
function atkSlots(){const r=G.run;if(!r.kn)return [];return r.kn.atk.concat(r.kn.move).filter(id=>r.skills.find(k=>k.id===id));}
function defSkills(){const r=G.run;return r.kn?r.kn.def.filter(id=>r.skills.find(k=>k.id===id)):[];}
// đòn thần thức của một số tâm pháp: niệm lực hơn đối thủ thì làm choáng
function mindArt(){return activeArts().find(a=>artMind(a));}
function foeThan(sc,t){const r=G.run;return 8+3*r.region+(sc.elite?3:0)+(sc.boss?6:0)+(t&&t.realm||0);}
function playerMind(tid){const r=G.run,sc=r.scene;const u=readyPlayer(sc);if(!u||!mindArt())return false;const cost=Math.ceil(u.maxMp*0.3);if(u.mp<cost)return false;
  const foes=alive(sc,'B').filter(x=>!x.immune);if(!foes.length)return false;const t=(tid!=null&&U_(sc,+tid)&&U_(sc,+tid).hp>0)?U_(sc,+tid):foes[0];const mine=S().than,his=foeThan(sc,t);
  u.mp-=cost;const sk={id:'_mind',n:'Thần Thức Thứ',el:'vo',t:0,c:0,fx:{p:0.45},f:'Một mũi nhọn vô hình đâm thẳng vào thức hải đối phương.',dt:'ph'};
  if(mine>his){t.stunT=Math.max(t.stunT||0,(typeof STUN_S==='number'?STUN_S:2)*1.5);clog(sc,`Thần thức của ngươi như mũi dùi đâm vào thức hải ${t.name}: nó choáng váng.`,'me');}else clog(sc,`Thần thức của ngươi va vào thức hải ${t.name} như đá ném vào tường đồng, không xuyên nổi.`,'en');
  runAct(sc,()=>beginSkill(sc,u,sk,1,t.id));return true;}
{const _S5=S;S=function(){const s=_S5();const r=G.run;s.than=Math.round(10+2*r.realm+s.ngo/4+(s.fx.than||0));return s;};}
{const _agg5=aggFx;aggFx=function(){const fx=_agg5();if(fx.atkStage){const k=fx.atkStage*tieu();fx.atkP=(fx.atkP||0)+k;fx.matkP=(fx.matkP||0)+k;}return fx;};}
{const _oz=onZero;onZero=function(sc,u){_oz(sc,u);if(u.isMain&&G.run){const v=aggFx().rageTurn;if(v&&u.hp>0){sc.rageAcc=(sc.rageAcc||0)+v;while(sc.rageAcc>=1&&(u.st.rage||0)<5){sc.rageAcc-=1;u.st.rage=(u.st.rage||0)+1;}}}};}
{const _sc5=startCombat;startCombat=function(spec,after){run2();syncSkills();return _sc5(spec,after);};}
{const _ws=walkSpeed;walkSpeed=function(){return _ws()*(1+(aggFx().moveP||0)/100);};}
{const _eq5=equip;equip=function(i){const rel=G.run.relics[i];if(rel&&rel.k==='book')return;_eq5(i);};}
{const _bi=bagItems;bagItems=function(){const r=G.run;const L=_bi();for(const x of L)if(x.ref.t==='rel'&&r.relics[x.ref.i].k==='book'){x.cat='bitich';x.em='📖';x.tip=r.relics[x.ref.i].lore;}return L;};}
{const _se=shopExtra;shopExtra=function(items,n){_se(items,n);const r=G.run;if(chance(.55)){const b=bookOf(genArt('tp',clamp(r.region+(chance(.3)?1:0),0,4)));items.push({k:'relic',rel:b,p:price(45+b.tier*40)});}};}
// chuyển nhân vật cũ sang hệ mới: mỗi pháp thuật thành một công pháp, thêm một tâm pháp nhập môn
{const _r2=run2;run2=function(){const r=_r2();if(!r||r.arts)return r;r.arts=[];
  // khởi đầu: một công pháp, một tâm pháp phàm phẩm, cảnh giới phàm nhân cũng học được
  for(const s0 of (r.skills||[]).filter(k=>SK[k.id])){const c0=genArt('cp',0,s0.id,{req:0});c0.lines.forEach(x=>x.req=0);c0.src=s0.src||'';r.arts.push(c0);}
  const t0=genArt('tp',0,null,{req:0,el:'vo'});t0.n='Dẫn Khí Quyết';t0.start=1;t0.lines[0]={fx:'tvP',v:6,n:'Tu luyện',d:'Tu vi nhận thêm {v}%',req:0};t0.lines.forEach(x=>x.req=0);r.arts.push(t0);
  r.chu=[null,null,null,null,null,null,null,null];r.chuOpen=4;r.arts.slice(0,4).forEach((a,i)=>{r.chu[i]={k:'a',u:a.u};});r.kn=null;syncSkills();return r;};}
// ----- thiêu đốt thọ nguyên: mỗi trận tối đa hai lần, lần sau đắt và dữ hơn -----
// Lần 1 · Đốt huyết: mất ~7% thọ tối đa, hồi 60% linh lực, đầy thể lực, giải độc, bỏng, suy yếu. Không mất lượt.
// Lần 2 · Đốt nguyên thần: mất ~14%; 3 lượt tới đòn đánh xuyên 25% thủ và hút 10% sát thương; hết thì suy yếu 2 lượt.
// Mỗi lượt chỉ thiêu đốt một lần.
const BURN=[{n:'Đốt huyết',m:0.07},{n:'Đốt nguyên thần',m:0.14}];
function burnInfo(sc){const r=G.run;const k=(sc&&sc.burnN)||0;if(k>=2)return {k,done:true};const y=Math.max(4*(k+1),Math.round(LIFE[r.realm]*BURN[k].m));const left=Math.floor(S().life-r.age);return {k,y,left,ok:left>y+1};}
function playerBurn(){const sc=G.run.scene;const u=readyPlayer(sc);if(!u)return false;const b=burnInfo(sc);if(b.done||!b.ok||u.burnedTurn||u.dazed)return false;const r=G.run;u.burnedTurn=1;
  r.lifeAdj-=b.y;sc.burnN=b.k+1;
  if(b.k===0){u.mp=Math.min(u.maxMp,u.mp+Math.round(u.maxMp*0.6));u.tl=100;u.st.poison=0;u.st.burn=0;u.st.weak=0;clog(sc,`Ngươi thiêu đốt thọ nguyên. Huyết khí sôi trào: linh lực hồi phục quá nửa, thể lực sung mãn, độc tố tiêu tan.`,'me');}
  else{u.st.soul=3;clog(sc,`Ngươi đốt cả nguyên thần, thọ nguyên hao tổn. Ba lượt tới mỗi đòn xuyên giáp, hút máu.`,'me');}
  syncMain(sc);sc.rev=(sc.rev||0)+1;log(`Thiêu đốt thọ nguyên trong trận.`);return true;}
{const _rs=resolveSkill;resolveSkill=function(sc,u,sk,lv,tg,qm,offs){if(u.ctrl==='player'&&sk.fx&&sk.fx.p){let pi=0,dr=0;if(u.st&&u.st.soul>0){pi+=0.25;dr+=10;}if(sc.pt&&PT[sc.pt.el].drain)dr+=PT[sc.pt.el].drain;
  if(pi||dr)sk=Object.assign({},sk,{fx:Object.assign({},sk.fx,{pierce:Math.min(1,(sk.fx.pierce||0)+pi),drain:(sk.fx.drain||0)+dr})});}return _rs(sc,u,sk,lv,tg,qm,offs);};}
{const _oz=onZero;onZero=function(sc,u){const had=u.st&&u.st.soul>0;_oz(sc,u);if(had&&u.st){u.st.soul--;if(!u.st.soul){u.st.weak=Math.max(u.st.weak||0,2);clog(sc,'Nguyên thần cạn kiệt: ngươi suy yếu hai lượt.','en');}}};}
function fightsHuman(sc){return (sc.en&&sc.en.f==='nhan')||sc.units.some(u=>u.side==='B'&&u.hp>0&&u.f==='nhan');}
// ----- Khí Hải: đại huyệt (ô đặt công pháp) mở theo cảnh giới; 12 tiểu huyệt quanh đan điền khai dần bằng tu vi và linh thạch -----
// Mỗi tiểu huyệt mang một hành (Mộc Hỏa Thổ Kim Thủy lặp lại), khai rồi cho một chỉ số nhỏ;
// nếu đại huyệt gần nó đang vận hành môn cùng hành thì môn đó mạnh thêm 8%.
chuSlots=function(){return CHU_N[G.run.realm]||4;};chuBlocked=function(){return 0;};
const TH_N=12,TH_EL=['moc','hoa','tho','kim','thuy'],TH_MAX=[3,5,7,9,11,12];
const TH_FX={kim:['atkP',2,'Công vật lý +{v}%'],moc:['hpP',3,'Khí huyết +{v}%'],thuy:['mpP',4,'Linh lực +{v}%'],hoa:['matkP',2.5,'Công phép +{v}%'],tho:['defP',3,'Thủ +{v}%']};
function thEl(i){return TH_EL[i%5];}
function thList(){const r=G.run;return r.th||(r.th=[]);}
function thNear(i,n){return Math.round((i+0.5)/TH_N*n)%n;}
function thCost(){const n=thList().length;return {tv:8+n*2,st:price(6+n*3),h:3*HM};}
function thWhy(i){const r=G.run;if(thList().includes(i))return 'Đã khai.';if(thList().length>=TH_MAX[clamp(r.realm,0,5)])return realmName()+' chỉ khai được '+TH_MAX[clamp(r.realm,0,5)]+' tiểu huyệt.';
  const c=thCost();if(r.scene||r.moving)return 'Phải đứng yên ngoài bản đồ.';if(r.tv<c.tv)return 'Cần '+c.tv+'% tu vi.';if(r.st<c.st)return 'Cần '+c.st+' linh thạch.';return '';}
function thOpenAct(i){const r=G.run;if(thWhy(i))return false;const c=thCost();r.tv-=c.tv;r.st-=c.st;thList().push(i);advanceTime(c.h);if(!G.run)return true;log('Khai thông một tiểu huyệt hành '+EL[thEl(i)].n+'.');clampHp();saveSoon();return true;}
{const _cf=chuFx;chuFx=function(fx){_cf(fx);const r=G.run;if(!r||!r.th)return;for(const i of r.th){const f=TH_FX[thEl(i)];fx[f[0]]=(fx[f[0]]||0)+f[1];}};}
{const _cp=chuPot;chuPot=function(v,i){let p=_cp(v,i);const it=v.it[i];if(it&&G.run.th){const el=chuBase(it.el);for(const j of G.run.th)if(thNear(j,v.n)===i&&thEl(j)===el)p+=0.08;}return Math.round(p*100)/100;};}

// ================= ĐỢT 6: ĐỊNH LỰC, THẦN LỰC, PHÁP TƯỚNG =================
// hiệu ứng hình ảnh: phần luật chỉ ghi sự kiện vào hàng đợi, giao diện tự lấy ra vẽ
function cfx(sc,o){const q=sc.fxq||(sc.fxq=[]);q.push(o);if(q.length>24)q.shift();}
// Định lực: mỗi bên vào trận đều 100. Trúng đòn thì giảm; về 0 thì choáng, mất lượt kế tiếp, rồi hồi đầy.
// Thần lực: chỉ nhân vật chính có. Đánh trúng hoặc bị đánh trúng thì nạp; đầy thì hiển hóa pháp tướng.
function onHit(sc,u,t,d,crit,blocked,sk){
  cfx(sc,{k:'hit',id:t.id,from:u.id,d,crit:crit?1:0,blk:blocked?1:0,el:(sk.el&&sk.el!=='vo')?sk.el:(u.ctrl==='player'?'vo':u.el||'vo'),big:(sk.t>=3||sk.fx.charge)?1:0});
  if(d<=0||t.immune||t.kind==='kiep')return;
  if(t.dl==null)t.dl=100;
  if(!t.dazed){let loss=clamp(d/Math.max(1,t.max)*220,8,45);if(blocked)loss*=0.5;if(t.boss)loss*=0.5;if(crit)loss*=1.3;t.dl=Math.max(0,t.dl-loss);
    if(t.dl<=0){t.dazed=1;clog(sc,(t.isMain?'Ngươi':t.name)+' bị đánh cho đầu óc quay cuồng, nhất thời không ra tay được.',t.side==='A'?'en':'me');cfx(sc,{k:'daze',id:t.id});
      if(t.phase==='charge'&&!(t.pending&&t.pending.sk.fx.steady)){toRecover(sc,t,1);doneAct(sc,t);}}}
  if(!sc.pt){const me=mainUnit(sc);if(me&&me.hp>0){if(u===me)me.than=Math.min(100,(me.than||0)+12);else if(t===me)me.than=Math.min(100,(me.than||0)+17);}}
}
function dazeClear(sc,u){u.dazed=0;u.dl=100;clog(sc,(u.isMain?'Ngươi':u.name)+' vẫn còn choáng váng, đứng chôn chân tại chỗ.',u.side==='A'?'en':'me');}
{const _ai=aiAct;aiAct=function(sc,u){if(u&&u.hp>0&&u.dazed){dazeClear(sc,u);toRecover(sc,u,1);doneAct(sc,u);return;}return _ai(sc,u);};}
{const _pa=playerAct;playerAct=function(id,tid){const sc=G.run.scene;const u=readyPlayer(sc);if(!u)return false;
  if(u.dazed){const ok=_pa('_wait');if(ok)dazeClear(sc,u);return ok;}
  if(!sc._ult&&G.run.kn&&G.run.kn.ult&&G.run.kn.ult.includes(id))return false; // thần thông chỉ tung qua pháp tướng
  return _pa(id,tid);};}
{const _pp=playerPillAct;playerPillAct=function(i){const u=readyPlayer(G.run.scene);if(u&&u.dazed)return playerAct('_wait');return _pp(i);};}
{const _pf=playerFlee;playerFlee=function(){const u=readyPlayer(G.run.scene);if(u&&u.dazed)return playerAct('_wait');return _pf();};}
{const _pd=playerDD;playerDD=function(j,t){const u=readyPlayer(G.run.scene);if(u&&u.dazed)return false;return _pd(j,t);};}
{const _pm=playerMind;playerMind=function(t){const u=readyPlayer(G.run.scene);if(u&&u.dazed)return false;return _pm(t);};}
{const _py=playerYield;playerYield=function(){const u=readyPlayer(G.run.scene);if(u&&u.dazed)return false;return _py();};}
// ----- Pháp tướng: thần lực đầy thì hiển hóa (không mất lượt), được tăng sức theo hệ của thần thông đang gắn.
// Khi pháp tướng còn, ra tay lần nữa để tung đòn tối thượng (nếu có gắn thần thông): tung xong pháp tướng tan, thần lực về 0.
const PT={
  kim:{n:'Canh Kim Pháp Tướng',d:'Công +30%',atk:.3,turns:3},moc:{n:'Thanh Đế Pháp Tướng',d:'Thủ +20%, mỗi lượt hồi 6% khí huyết',def:.2,regen:1,turns:4},
  thuy:{n:'Huyền Vũ Pháp Tướng',d:'Linh lực hồi đầy, công +20%',mp:1,atk:.2,turns:3},hoa:{n:'Chu Tước Pháp Tướng',d:'Công +40%, thủ −10%',atk:.4,def:-.1,turns:3},
  tho:{n:'Hậu Thổ Pháp Tướng',d:'Thủ +60%, hộ thể bằng 20% khí huyết',def:.6,block:.2,turns:4},loi:{n:'Lôi Tổ Pháp Tướng',d:'Chí mạng +25%, công +15%',crit:25,atk:.15,turns:3},
  bang:{n:'Băng Phách Pháp Tướng',d:'Thủ +40%, mọi kẻ địch suy yếu 2 lượt',def:.4,weak:2,turns:3},phong:{n:'Cự Phong Pháp Tướng',d:'Né trọn 2 đòn kế tiếp, công +20%',evade:2,atk:.2,turns:3},
  am:{n:'U Minh Pháp Tướng',d:'Công +25%, đòn đánh hút 10% sát thương',atk:.25,drain:10,turns:3},phat:{n:'Kim Thân Pháp Tướng',d:'Thủ +30%, mỗi lượt hồi 6% khí huyết',def:.3,regen:1,turns:0},
  vo:{n:'Chân Nguyên Pháp Tướng',d:'Công +20%, thủ +20%',atk:.2,def:.2,turns:0}};
function ultSkill(){const r=G.run;const id=r.kn&&r.kn.ult&&r.kn.ult[0];const own=id&&r.skills.find(k=>k.id===id);return own?{sk:SK[id],lv:own.lv}:null;}
function ptPreview(){const U0=ultSkill();const el=U0&&PT[U0.sk.el]?U0.sk.el:'vo';return {el,P:PT[el],sk:U0&&U0.sk};}
function ptEnd(sc,u,msg){const p=sc.pt;if(!p)return;const o=p.undo;u.atk=o.atk;u.matk=o.matk;u.def=o.def;u.crit=o.crit;sc.pt=null;u.than=0;if(msg)clog(sc,msg,'fl');cfx(sc,{k:'ptend'});sc.rev=(sc.rev||0)+1;}
function playerUlt(){const sc=G.run.scene;const u=readyPlayer(sc);if(!u||u.dazed||sc.kiep)return false;
  if(!sc.pt){if((u.than||0)<100)return false;const V=ptPreview(),P=V.P;
    sc.pt={el:V.el,n:P.n,left:P.turns||-1,sk:V.sk?V.sk.id:null,undo:{atk:u.atk,matk:u.matk,def:u.def,crit:u.crit}};
    if(P.atk){u.atk=Math.round(u.atk*(1+P.atk));u.matk=Math.round((u.matk||u.atk)*(1+P.atk));}if(P.def)u.def=Math.round(u.def*(1+P.def));if(P.crit)u.crit=(u.crit||5)+P.crit;
    if(P.mp)u.mp=u.maxMp;if(P.block)u.st.block=(u.st.block||0)+Math.round(u.max*P.block);if(P.evade)u.st.evade=(u.st.evade||0)+P.evade;if(P.regen)u.st.regen=Math.max(u.st.regen||0,1);
    if(P.weak)for(const t of alive(sc,'B'))if(!t.immune)t.st.weak=Math.max(t.st.weak||0,P.weak);
    clog(sc,`Thần lực viên mãn! ${P.n} hiển hóa sau lưng ngươi: ${numWords(P.d)}${P.turns?' trong '+numVi(P.turns)+' lượt':' tới hết trận'}.`,'me');
    cfx(sc,{k:'ult',el:V.el,n:P.n});syncMain(sc);sc.rev=(sc.rev||0)+1;return true;}
  // đòn tối thượng
  if(!sc.pt.sk||!SK[sc.pt.sk])return false;const U0=ultSkill();const base=SK[sc.pt.sk];const lv=U0&&U0.sk===base?U0.lv:1;
  const fx=Object.assign({},base.fx,{p:(base.fx.p||1.5)*1.6});delete fx.charge;delete fx.selfHp;const sk=Object.assign({},base,{c:0,fx});
  cfx(sc,{k:'strike',el:base.el,n:base.n});clog(sc,`Pháp tướng dồn hết thần uy vào một đòn: ${base.n}!`,'me');
  sc._ult=1;let ok=false;try{const foes=alive(sc,'B');runAct(sc,()=>beginSkill(sc,u,sk,lv,foes.length?foes.slice().sort((a,b)=>b.hp-a.hp)[0].id:null));ok=true;}finally{sc._ult=0;}
  ptEnd(sc,u,'Pháp tướng tan đi, thần lực cạn sạch.');return ok;}
{const _oz2=onZero;onZero=function(sc,u){if(u.isMain&&sc.pt&&PT[sc.pt.el].regen)u.st.regen=Math.max(u.st.regen||0,1);_oz2(sc,u);
  if(u.isMain&&sc.pt&&sc.pt.left>0&&u.hp>0){sc.pt.left--;if(sc.pt.left<=0)ptEnd(sc,u,'Hết thời hạn, pháp tướng tan đi.');}};}

// ================= ĐỢT 7: TƯ CHẤT, NIỆM LỰC, THẦN LỰC CỦA ĐỐI THỦ =================
// Tư chất: độ tinh thuần của linh căn (1–100), định sẵn lúc sinh. Linh căn là "mấy đường ống" dẫn linh khí,
// tư chất là "ống to hay nhỏ": cùng là tam linh căn nhưng tư chất cao vẫn tu nhanh hơn hẳn.
// Linh căn càng ít hệ thì tư chất thường càng cao. Hệ số tu luyện từ 0,7 (tư chất 0) tới 1,3 (tư chất 100).
const TC_BIAS={thien:15,bien:12,song:6,tam:0,tu:-4,tap:-8};
const TC_N=[[90,'Thiên tư'],[75,'Cực phẩm'],[55,'Thượng phẩm'],[35,'Trung phẩm'],[0,'Hạ phẩm']];
function tuChat(){const r=G.run;if(!r)return 50;if(r.tuchat==null){const h=hashS('tuchat'+r.ten+r.kiep+(r.bornT||0));r.tuchat=clamp((h%41)+((h>>>7)%41)+10+(TC_BIAS[r.root.id]||0),5,100);}return r.tuchat;}
function tcName(v){return (TC_N.find(x=>v>=x[0])||TC_N[4])[1];}
function tcMult(v){return 0.7+v*0.006;}
// Niệm lực: kho sức thần thức dùng trong trận, bằng ba lần chỉ số Thần thức. Vào trận thì đầy.
// Dùng vật phẩm, tế pháp bảo, đánh thần thức đều tốn niệm lực. Dùng đồ lúc chuẩn bị trước trận thì không tốn.
const NL_PILL=10,NL_DD=15,NL_MIND=20;
{const _S7=S;S=function(){const s=_S7();if(G.run){s.tuchat=tuChat();s.tvM*=tcMult(s.tuchat);s.nl=Math.round(s.than*3);}return s;};}
{const _pu=playerUnit;playerUnit=function(){const u=_pu();const n=S().nl;u.nl=n;u.maxNl=n;return u;};}
function nlOk(u,c){return u&&(u.maxNl==null||(u.nl||0)>=c);}
function nlUse(u,c){if(u&&u.maxNl!=null)u.nl=Math.max(0,(u.nl||0)-c);}
{const _pp7=playerPillAct;playerPillAct=function(i){const sc=G.run.scene;const u=readyPlayer(sc);if(u&&!u.dazed&&!nlOk(u,NL_PILL))return false;const ok=_pp7(i);if(ok&&u&&!u.dazed)nlUse(u,NL_PILL);return ok;};}
{const _pd7=playerDD;playerDD=function(j,t){const u=readyPlayer(G.run.scene);if(!nlOk(u,NL_DD))return false;const ok=_pd7(j,t);if(ok)nlUse(u,NL_DD);return ok;};}
// đòn thần thức: nay tốn niệm lực thay cho linh lực
{const _pm7=playerMind;playerMind=function(t){const sc=G.run.scene;const u=readyPlayer(sc);if(!u||u.dazed||!nlOk(u,NL_MIND))return false;const add=Math.ceil(u.maxMp*0.3);u.mp+=add;const ok=_pm7(t);if(ok)nlUse(u,NL_MIND);else u.mp-=add;return ok;};}
// Thần lực của đối thủ: cũng nạp khi đánh trúng hoặc bị trúng. Đầy thì hiển hóa pháp tướng theo hệ của nó,
// lượt sau dồn hết vào một đòn tối thượng (uy lực ×1,6), đánh xong pháp tướng tan, thần lực về 0.
{const _oh7=onHit;onHit=function(sc,u,t,d,crit,blocked,sk){_oh7(sc,u,t,d,crit,blocked,sk);if(d<=0||sc.kiep)return;
  const add=(x,v)=>{if(x&&x.side==='B'&&!x.immune&&x.hp>0&&!x.fpt)x.than=Math.min(100,(x.than||0)+v);};add(t,12);add(u,9);};}
function foePtStart(sc,u){const P=PT[u.el]||PT.vo;u.fpt={n:P.n,el:PT[u.el]?u.el:'vo',undo:{atk:u.atk,matk:u.matk,def:u.def,crit:u.crit}};
  if(P.atk){u.atk=Math.round(u.atk*(1+P.atk));u.matk=Math.round((u.matk||u.atk)*(1+P.atk));}if(P.def)u.def=Math.round(u.def*(1+P.def));if(P.crit)u.crit=(u.crit||5)+P.crit;
  if(P.block)u.st.block=(u.st.block||0)+Math.round(u.max*P.block);if(P.evade)u.st.evade=(u.st.evade||0)+P.evade;
  clog(sc,`${u.name} thần lực viên mãn! ${P.n} hiển hóa sau lưng nó.`,'en');cfx(sc,{k:'ult',el:u.fpt.el,n:u.name+' · '+P.n});sc.rev=(sc.rev||0)+1;}
function foePtEnd(sc,u){const o=u.fpt&&u.fpt.undo;if(!o)return;u.atk=o.atk;u.matk=o.matk;u.def=o.def;u.crit=o.crit;u.fpt=null;u.than=0;u._ult=0;clog(sc,`Pháp tướng của ${u.name} tan đi.`,'fl');sc.rev=(sc.rev||0)+1;}
{const _ai7=aiAct;aiAct=function(sc,u){
  if(u&&u.side==='B'&&u.hp>0&&!u.immune&&!u.dazed&&!sc.kiep&&!sc.spar){
    if(u.fpt)u._ult=1;else if((u.than||0)>=100)foePtStart(sc,u);}
  return _ai7(sc,u);};}
{const _rs7=resolveSkill;resolveSkill=function(sc,u,sk,lv,tg,qm,offs){
  if(u&&u._ult&&u.fpt&&sk&&sk.fx&&sk.fx.p){u._ult=0;cfx(sc,{k:'strike',el:u.fpt.el,n:sk.n});clog(sc,`${u.name} dồn hết thần uy vào một đòn: ${sk.n}!`,'en');
    sk=Object.assign({},sk,{fx:Object.assign({},sk.fx,{p:sk.fx.p*1.6})});const res=_rs7(sc,u,sk,lv,tg,qm,offs);foePtEnd(sc,u);return res;}
  return _rs7(sc,u,sk,lv,tg,qm,offs);};}

// ================= ĐỢT 9: LỰC CHIẾN, TU VI TÍNH BẰNG ĐIỂM, BẾ QUAN HÊN XUI =================
// Lực chiến = căn bậc hai của (sức đánh × sức chịu đòn) × hệ số tốc độ × 2.
// Lấy căn bậc hai nên khí huyết gấp đôi thì lực chiến chỉ tăng khoảng 1,4 lần, không vọt lên vì máu nhiều.
// Trang bị, công pháp đã nằm sẵn trong các chỉ số nên được tính luôn.
function lcCalc(o){const atk=Math.max(o.atk||0,o.matk||0);
  const off=atk*(1+(o.crit||0)/100*Math.max(0,(o.critDmg||150)-100)/100)*(1+((o.cx||10)-10)*0.01);
  const surv=((o.maxHp||o.max||1)+0.3*(o.maxMp||0))*(1+Math.max(0,o.def||0)/40)*(1+(o.ne||0)*0.01)*(1+(o.hoTam||0)*0.005);
  const spd=Math.max(0.6,1+(((o.tp||10)+(o.hoi||10))/2-10)*0.02);return Math.round(Math.sqrt(Math.max(0,off*surv))*spd*2);}
function lucChien(){return lcCalc(S());}
// Thang điểm tu vi: tu vi vẫn lưu theo %, đổi ra điểm để hiển thị. Đầy một cảnh giới = số năm bế quan chuẩn × 8640 giờ × 5 điểm.
// Một giây đồng hồ trong game là một giờ, nên "tu vi/giây" là số điểm mỗi giờ bế quan.
const TV_K=5,BQ_LO=0.6,BQ_HI=1.4;
const TVP=[500,1500,4000,10000,25000,60000]; // tu vi cần để đầy mỗi cảnh giới (lịch luyện cùng thang)
function tvPts(realm){return TVP[clamp(realm,0,5)];}
// tu vi thực nhận khi bế quan còn nhân thêm hệ số tu luyện một lần nữa lúc cộng vào (luật cũ), nên con số hiển thị tính cả lần đó
function bqReal(){return bqRate()*S().tvM;}
function bqNeedY(){const r=G.run;return r.tv>=100?0:Math.max(0.25,Math.ceil((100-r.tv)/bqReal()*4)/4);}
function tvPerMonth(){const avg=bqReal()/100*tvPts(G.run.realm)/12;return [Math.max(0,Math.floor(avg*BQ_LO)),Math.max(1,Math.ceil(avg*BQ_HI))];}
function bqSpan(y){const r=G.run;if(!(y>0))return [0,0];const base=bqReal()*y*(y<1?0.9:1),pas=thonapPct()*y*12;const P=tvPts(r.realm)/100;
  return [Math.floor(tvSimAdd(base*BQ_LO+pas)*P),Math.ceil(tvSimAdd(base*BQ_HI+pas)*P)];}
function fmtN(n){return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g,'.');}
// mỗi lần bế quan rút một hệ số may rủi từ 0,6 tới 1,4: trung bình vẫn như cũ
{const _bc9=bqCustom;bqCustom=function(y){const f=BQ_LO+Math.random()*(BQ_HI-BQ_LO);const _r=bqRate;bqRate=function(){return _r()*f;};try{return _bc9(y);}finally{bqRate=_r;}};}

// ================= ĐỢT 10: THỔ NẠP VÀ LỊCH LUYỆN =================
// Thổ nạp: thân thể tự hít thở linh khí, không cần bế quan, tu vi vẫn nhích lên theo thời gian.
// Rất ít: chừng 5% tốc độ bế quan. Theo hệ số tu luyện (linh căn, tư chất, ngộ tính từ xuất thân,
// tu vi +% từ công pháp, tâm pháp, trang bị, mệnh cách) và linh khí nơi đang đứng.
function thonapPct(){const r=G.run;if(!r)return 0;const n=nodeById(r.at);return 100/(BQ_Y[clamp(r.realm,0,5)]*12)*0.05*S().tvM*LK_M[lkOf(n)];} // % tu vi mỗi tháng
function thonapPts(){return Math.round(thonapPct()*12/100*tvPts(G.run.realm));} // tu vi mỗi năm
{const _adv10=advanceTime;let dep=0;advanceTime=function(h){dep++;let o;try{o=_adv10(h);}finally{dep--;}
  if(!dep&&G.run&&h>0&&G.run.tv<100){const add=thonapPct()*h/HM/(lkOn()?LK_MUL:1);if(add>0)addTv(add);}return o;};}
// Lịch luyện: như tu vi nhưng chỉ có được nhờ thực chiến và đi lại giang hồ. Lưu theo % như tu vi.
// Tu vi bỏ xa lịch luyện thì tu vi thực nhận giảm dần (mọi nguồn, kể cả đan dược):
// vượt dưới 20% nhận đủ; 30% còn 70%; 40% còn 35%; 60% còn 10%; từ 70% trở lên chỉ còn 2% (bình cảnh).
// Lịch luyện cao hơn tu vi thì được ngộ đạo: nhận thêm tối đa 15%.
// Muốn đột phá phải có lịch luyện ít nhất 70%. Đột phá xong lịch luyện về 0, giữ lại 20% phần vượt quá 100%.
const LL_T=[[20,1],[30,.7],[40,.35],[60,.1],[70,.02]],LL_BT=100,LL_MAX=150,LL_CAPE=0.05; // dưới 5% coi như chạm đáy
function llOf(){return (G.run&&G.run.ll)||0;}
function llEff(tv){const ll=llOf();const gap=tv-ll;if(gap<0)return 1+Math.min(0.15,-gap/100*0.5);if(gap<=LL_T[0][0])return 1;
  for(let i=1;i<LL_T.length;i++){const [g1,e1]=LL_T[i-1],[g2,e2]=LL_T[i];if(gap<=g2)return e1+(e2-e1)*(gap-g1)/(g2-g1);}return LL_T[LL_T.length-1][1];}
function tvSimAdd(raw){const r=G.run;let add=0,rem=raw;while(rem>1e-9&&r.tv+add<100){const st=Math.min(rem,0.5);add+=st*llEff(r.tv+add);rem-=st;}return Math.min(add,100-r.tv);}
// tu vi luôn cộng theo số nguyên: phần lẻ dồn lại cho lần sau
{const _at10=addTv;addTv=function(x){const r=G.run;if(!(x>0)||!r)return _at10(x);const P=tvPts(r.realm)/100;const raw=tvSimAdd(x)*P+(r.tvAcc||0);const pts=Math.floor(raw+1e-9);r.tvAcc=raw-pts;if(pts<=0)return;
  const res=_at10(pts/P);if(G.run&&G.run.tv<100)G.run.tv=Math.round(G.run.tv*P)/P;return res;};}
// bế quan tới mức nào thì chạm đáy (chỉ còn 2%): trả về số năm, hoặc null nếu 5 năm vẫn chưa chạm
function bqCapY(){const r=G.run;if(r.tv>=100)return null;for(let y=0.25;y<=5;y+=0.25){const raw=bqReal()*y*(y<1?0.9:1)+thonapPct()*y*12;if(llEff(r.tv+tvSimAdd(raw))<=LL_CAPE)return y;}return null;}
function llPtsOf(){return Math.round(llOf()/100*tvPts(G.run.realm));}
function llAdd(x,why,quiet){const r=G.run;if(!r||!(x>0))return 0;const P=tvPts(r.realm)/100;const pts=Math.max(1,Math.round(x*P));const b=r.ll||0;r.ll=Math.min(LL_MAX,Math.round((b*P+pts))/P);const d=Math.round((r.ll-b)*P);
  if(d>0&&!quiet){const dp=llShowGain(d/P);if(why)log(`Lịch luyện +${dp}% (${why}).`);const sc=r.scene;if(sc&&sc.type==='combat')sc.llGain=(sc.llGain||0)+d;else if(sc&&Array.isArray(sc.chips))sc.chips.push(chip('⚔','+'+dp+'% lịch luyện','Lịch luyện: '+why,'up'));else note('+'+dp+'% lịch luyện · '+why);}return d;}
{const _cb10=canBreak;canBreak=function(){return _cb10()&&llOf()>=llNeedBt();};}
{const _bf10=btFinish;btFinish=function(){const r=G.run;const rl=r&&r.realm;const res=_bf10.apply(this,arguments);if(G.run&&G.run.realm>rl)G.run.ll=Math.max(0,(G.run.ll||0)-100)*0.2;return res;};}
// nguồn lịch luyện
{const _fc10=finishCombat;finishCombat=function(sc){const res=_fc10(sc);try{const r=G.run;if(r&&!sc.spar&&!sc.kiep&&sc.en&&sc.en.k!=='tamma'&&sc.over!=='dead'){
  const foes=sc.units.filter(u=>u.side==='B'&&!u.immune);const fl=foes.reduce((a,u)=>a+lcCalc(u),0);const ratio=clamp(fl/Math.max(1,lucChien()),0.15,2);
  const me=mainUnit(sc);const k=sc.en.k||sc.en.n;r.llSeen=r.llSeen||{};const cnt=r.llSeen[k]||0;r.llSeen[k]=cnt+1;
  let g=(sc.over==='win'?9:sc.over==='lose'?3:1)*Math.pow(ratio,0.8)/(1+0.25*cnt);if(sc.over==='win'&&me&&me.hp<me.max*0.2)g*=1.5;
  llAdd(g,sc.over==='win'?'thắng trận':'trận thua');}}catch(e){console.error(e);}return res;};}
{const _op10=openPlace;openPlace=function(id){_op10(id);const r=G.run;if(!r||!r.scene)return;r.llP=r.llP||[];const k=r.scene.id;if(!r.llP.includes(k)){r.llP.push(k);llAdd(4,'tới nơi mới');}};}
{const _me10=meetEnt;meetEnt=function(e){const res=_me10(e);const r=G.run;if(r&&e){r.llN=r.llN||[];const k=e.name||e.id;if(!r.llN.includes(k)){r.llN.push(k);llAdd(3,'quen người mới');}}return res;};}
{const _qw10=questWin;questWin=function(q){const res=_qw10(q);if(res&&res.length)llAdd(5,'xong việc');return res;};}

// ================= ĐỢT 12: ĐÁNH NHAU KHÔNG CHO TU VI; LỰA CHỌN Ở TRÀ LÂU, KHÁCH ĐIẾM, TỬU PHƯỜNG =================
// Trong lúc xử lý kết quả một trận, mọi phần thưởng tu vi đổi thành lịch luyện (một nửa).
let FIGHT_OUT=0;
function llChipMerge(L,d){if(!(d>0))return;d=Math.max(1,Math.round(d/(tvPts(G.run.realm)/100)));const c=L.find(x=>x&&x.i==='⚔');if(c){c.t='+'+(parseInt(c.t.replace(/\D/g,''))+d)+'% lịch luyện';}else L.unshift(chip('⚔','+'+d+'% lịch luyện','Lịch luyện: có được nhờ thực chiến','up'));}
{const _ae12=applyE;applyE=function(e,v){if(FIGHT_OUT&&e&&e.tv>0){e=Object.assign({},e);const x=e.tv*0.5;delete e.tv;const ch=_ae12(e,v);llChipMerge(ch,llAdd(x,null,true));return ch;}return _ae12(e,v);};}
{const _cc12=combatContinue;combatContinue=function(){const sc0=G.run&&G.run.scene;const g=sc0&&sc0.llGain||0;FIGHT_OUT=1;let res;try{res=_cc12();}finally{FIGHT_OUT=0;}
  const sc=G.run&&G.run.scene;if(g&&sc&&sc!==sc0){if(!Array.isArray(sc.chips))sc.chips=[];llChipMerge(sc.chips,g);}return res;};}

// Trà lâu, khách điếm, tửu phường: chạm vào thì hiện vài lựa chọn. Mỗi lựa chọn có giá (giờ, linh thạch),
// có thể đòi chỉ số (ngộ tính, đạo tâm...), và đôi khi có chuyện đặc biệt chỉ còn trong ít giờ.
const VENUE_N={tea:'Trà lâu',inn:'Khách điếm',tuu:'Tửu phường'};
const VENUE_IN={tea:['Trà lâu ồn ào tiếng quạt giấy và chén sứ. Tiểu nhị đon đả chạy ra.','Mùi trà mới pha thơm lừng. Bàn nào cũng có người bàn chuyện thiên hạ.'],
  inn:['Chưởng quầy ngẩng lên khỏi bàn tính, cười: “Khách quan nghỉ chân hay ở trọ?”','Khách điếm hai tầng, dưới ăn trên ngủ. Tiếng bát đũa lách cách.'],
  tuu:['Tửu phường nồng mùi rượu và mồ hôi. Giữa phòng có người đang vỗ bàn ca hát.','Vò rượu xếp chồng tận trần. Tửu khách nhìn ngươi từ đầu tới chân.']};
const VENUE_SP={tea:{id:'doicau',l:'Thi đối câu đối của lão tú tài',d:'Lão tú tài treo giải: ai đối được vế của lão thì nhận một túi linh thạch.',h:1,req:['ngo',14,'Ngộ tính'],g:{st:12,ll:2}},
  inn:{id:'hotong',l:'Nhận lời hộ tống một thương nhân',d:'Một thương nhân đang tìm người hộ tống qua đoạn đường vắng. Trả công hậu, nhưng dễ đụng cướp.',h:4,g:{st:15},fight:1},
  tuu:{id:'gaysu',l:'Dạy cho gã say gây sự một bài học',d:'Một gã say đập bàn, chửi bới, giật đồ của tửu khách. Không ai dám can.',h:1,g:{st:6,karma:1},fight:1}};
function venueSpec(n,v){const r=G.run,w=W();if(!n.vsp||n.vsp.k!==r.kiep||n.vsp.v!==v||w.t>n.vsp.until){n.vsp={k:r.kiep,v,until:chance(.35)?w.t+ri(4,12):-1};}return n.vsp.until>w.t?n.vsp.until-w.t:0;}
function venueOpts(n,v){const s=S(),r=G.run;const hp=s.maxHp,L=[];const add=o=>L.push(o);
  if(v==='tea'){add({id:'nghe',l:'Gọi ấm trà, ngồi nghe chuyện',d:'Ngồi một góc, nghe bàn bên kể chuyện: biết thêm một nơi chưa tới quanh đây và tin tức giang hồ.',h:1,g:{info:1}});
    add({id:'hoi',l:'Dúi tiền hỏi tiểu nhị đường đi',d:'Tiểu nhị chạy bàn khắp nơi, biết nhiều. Cho ít tiền, hắn chỉ cho ngươi hai nơi quanh vùng.',h:1,st:price(1),g:{info:2}});
    add({id:'co',l:'Đánh một ván cờ với khách lạ',d:'Ông khách áo xám bày sẵn bàn cờ. Thắng được thì ông ta kể cho nghe chuyện đi đường, coi như lịch luyện.',h:2,req:['ngo',12,'Ngộ tính'],g:{ll:3,tamma:-2}});
    add({id:'tinh',l:'Ngồi yên thưởng trà, tĩnh tâm',d:'Không nghe, không nói, chỉ ngồi uống trà nhìn người qua lại. Lòng lắng xuống.',h:2,st:price(1),g:{tamma:-4}});}
  if(v==='inn'){add({id:'phong',l:'Thuê phòng thường, ngủ một đêm',d:'Phòng chật nhưng sạch. Ngủ một giấc là hồi đầy khí huyết, linh lực.',h:8,st:price(4),g:{hp:hp-r.hp,mp:s.maxMp-r.mp,tamma:-2}});
    add({id:'thuong',l:'Thuê phòng thượng hạng có tụ linh trận',d:'Phòng tốt nhất, dưới sàn khắc tụ linh trận nhỏ. Ngủ dậy hồi đầy, tâm lắng hẳn, tu vi nhích lên chút ít.',h:8,st:price(10),g:{hp:hp-r.hp,mp:s.maxMp-r.mp,tamma:-6,tv:1}});
    add({id:'an',l:'Ngồi sảnh dưới ăn một bữa',d:'Bát cơm nóng, đĩa thịt kho. Ăn no thì khí huyết hồi một ít.',h:1,st:price(1),g:{hp:Math.min(hp-r.hp,Math.round(hp*0.15))}});
    add({id:'chuong',l:'Hỏi chưởng quầy có chuyện gì lạ',d:'Chưởng quầy gặp đủ loại khách, nghe đủ loại chuyện. Hỏi thì biết thêm tin tức.',h:1,g:{info:1}});}
  if(v==='tuu'){add({id:'chen',l:'Uống vài chén, nghe chuyện',d:'Rượu nhạt mà cay. Uống xong thì người ấm lên, tâm ma nguôi bớt, nghe được ít tin tức.',h:3,st:price(2),g:{hp:Math.min(hp-r.hp,Math.round(hp*0.1)),tamma:-4,info:1}});
    add({id:'moi',l:'Mời cả bàn một vò rượu ngon',d:'Bỏ tiền mời rượu, làm quen tửu khách khắp nơi. Nghe được chuyện giang hồ, coi như lịch luyện.',h:3,st:price(6),g:{tamma:-5,ll:3,info:1}});
    add({id:'dau',l:'Đấu rượu với gã tửu khách to con',d:'Gã to con thách ai uống thắng được hắn thì lấy hết tiền cược trên bàn. Cần đạo tâm vững để không gục.',h:2,req:['tam',11,'Đạo tâm'],g:{st:price(5),ll:1}});
    add({id:'ca',l:'Nghe ca kỹ đàn hát',d:'Một khúc tì bà, giọng hát trong veo. Lòng nhẹ hẳn đi.',h:2,st:price(3),g:{tamma:-8}});}
  const left=venueSpec(n,v);if(left>0){const o=Object.assign({},VENUE_SP[v],{spec:left});if(o.id==='gaysu'||o.id==='hotong')o.g=Object.assign({},o.g);add(o);}
  for(const o of L){o.st=o.st||0;o.no=r.st<o.st?'Không đủ linh thạch':'';if(o.req&&(s[o.req[0]]||0)<o.req[1])o.lack=o.req[2]+' cần '+o.req[1]+', ngươi có '+(s[o.req[0]]||0);}
  return L;}
function venueDo(v,id){const r=G.run,sc=r&&r.scene;if(!sc||sc.type!=='place')return false;const n=nodeById(sc.id);const o=venueOpts(n,v).find(x=>x.id===id);if(!o||o.no||o.lack)return false;
  r.st-=o.st;advanceTime(o.h);if(!G.run||G.run.scene!==sc)return true;sc.msg=[];let ch=[];
  if(o.st)ch.push(chip('💎','−'+o.st,'Linh thạch','dn'));ch.push(chip('⏳',durH(o.h),'Thời gian trôi qua',''));
  const g=o.g||{};
  if(o.fight){n.vsp.until=-1;sc.venue=null;if(o.id==='gaysu')sc.msg=['Ngươi đứng dậy, gõ nhẹ lên bàn gã say. Gã quay lại, mắt đỏ ngầu.'];else sc.msg=['Đi được nửa đường, một toán cướp nhảy ra chặn xe.'];
    startCombat({cnt:o.id==='hotong'?2:1},{kind:'node'});const cs=G.run.scene;if(cs)cs.venueWin=g;return true;}
  if(o.spec)n.vsp.until=-1;
  if(g.info){if(v==='tea'&&id==='nghe'||v==='tuu'||v==='inn'){teaHouse(n);}else{for(let i=0;i<g.info;i++){const c=regionOf(r.region).nodes.filter(x=>x.fog===0);if(c.length){const x=pick(c);hearOf(x);sc.msg.push('Tiểu nhị chỉ đường tới '+x.name+'.');}}}}
  const LEAD={tea:{nghe:[''],hoi:['Tiểu nhị nhận tiền, ghé tai nói nhỏ.','Tiểu nhị đút tiền vào tay áo, kéo ngươi ra góc khuất.','“Khách quan hỏi đúng người rồi.” Tiểu nhị cười hề hề.'],
      co:['Ván cờ kéo dài tới khi trà nguội. Ông khách thua, cười khà, kể cho ngươi nghe chuyện đi đường.','Hai bên giằng co từng nước. Cuối cùng ông khách buông quân, kể chuyện một chuyến vượt núi năm xưa.','Ông khách đi nước nào cũng chậm rãi. Thua rồi, ông ta chỉ cho ngươi mấy mẹo sống sót nơi hoang dã.'],
      tinh:['Ngươi ngồi yên, nhìn khói trà bay lên. Lòng lắng như mặt hồ.','Tiếng ồn quanh quán dần xa. Chỉ còn hơi trà ấm trong tay.','Nắng xiên qua song cửa. Ngươi uống cạn chén, thấy lòng nhẹ hẳn.'],doicau:['Ngươi viết vế đối. Lão tú tài đọc đi đọc lại, rồi vỗ đùi: “Hay!”']},
    inn:{phong:['Phòng chật nhưng sạch, chăn có mùi nắng. Ngươi ngủ một giấc ngon.','Đêm nay mưa rơi lộp độp trên mái. Ngươi ngủ say tới sáng.','Phòng cũ, giường kêu cót két. Nhưng mệt quá, ngươi vẫn ngủ một mạch.'],
      thuong:['Tụ linh trận rì rầm suốt đêm. Sáng ra ngươi thấy tinh thần sảng khoái lạ thường.','Linh khí trong phòng đặc như sương. Ngươi ngủ mà như đang tĩnh tọa.','Hương trầm thoảng nhẹ, trận văn dưới sàn lấp lánh. Ngươi thức dậy, thân thể nhẹ bẫng.'],
      an:['Cơm nóng, canh ngọt. Ăn xong thấy người khỏe ra.','Hôm nay quán có cá kho. Ngươi ăn hết hai bát.','Bánh bao nóng hổi, trà gừng cay cay. Người ấm hẳn lên.'],chuong:['Chưởng quầy hạ giọng kể chuyện mấy vị khách lạ.','Chưởng quầy lật sổ, chỉ vào vài cái tên lạ mới ghi tuần trước.','“Chuyện thì nhiều, khách quan muốn nghe chuyện gì?” Chưởng quầy rót thêm trà.']},
    tuu:{chen:['Ba chén vào bụng, lòng nhẹ đi đôi chút.','Rượu nhạt mà cay. Bàn bên to tiếng, ngươi nghe được vài câu.','Chưởng quầy rót đầy chén, kể chuyện không ai hỏi.'],moi:['Cả bàn nâng chén. Người nào cũng có một chuyện để kể.','“Đạo hữu hào sảng!” Mấy tửu khách xúm lại, kể chuyện giang hồ tới khuya.','Vò rượu ngon vừa mở, cả quán quay sang. Ngươi làm quen thêm mấy gã giang hồ.'],
      dau:['Chén thứ mười hai, gã to con gục xuống bàn. Cả quán vỗ tay.','Gã to con uống tới chén thứ chín thì lăn ra ngủ. Tiền cược về tay ngươi.','Hai bên uống tới khi trời sáng. Gã to con chịu thua, móc túi trả cược.'],
      ca:['Khúc nhạc dứt, ngươi mới nhận ra mình đã ngồi rất lâu.','Ca kỹ hát một khúc biệt ly. Cả quán lặng đi.','Tiếng tì bà như mưa rơi trên lá chuối. Lòng ngươi dịu lại.']}};
  sc.lastL=sc.lastL||{};const pool=(LEAD[v]&&LEAD[v][id])||[''];const cands=pool.filter(x=>x!==sc.lastL[v+id]);const lead=pick(cands.length?cands:pool);sc.lastL[v+id]=lead;
  if(lead)sc.msg.unshift(lead);
  if(g.hp>0)r.hp=Math.min(S().maxHp,r.hp+g.hp);if(g.mp>0)r.mp=Math.min(S().maxMp,r.mp+g.mp);if(g.hp>0)ch.push(chip('❤️','+'+g.hp,'Khí huyết','up'));
  if(g.tamma<0&&r.tamma<=0)sc.msg.push('Lòng ngươi vốn đã yên, chẳng còn tâm ma nào để gột.');
  const e={};if(g.tamma)e.tamma=g.tamma;if(g.st)e.st=g.st;if(g.karma)e.karma=g.karma;if(g.tv)e.tv=g.tv;ch=ch.concat(applyE(e));
  if(g.ll){const d=llAdd(g.ll,null,true);llChipMerge(ch,d);}
  if(!sc.msg.length)sc.msg=['Trà nhạt, chuyện cũng nhạt.'];sc.chips=ch;sc.venue=null;sc.seq=(sc.seq||0)+1;return true;}
// chuyện đặc biệt có đánh nhau: thắng thì nhận công
{const _cc12b=combatContinue;combatContinue=function(){const sc0=G.run&&G.run.scene;const vw=sc0&&sc0.venueWin;const win=sc0&&sc0.over==='win';const res=_cc12b();
  if(vw&&win&&G.run&&G.run.scene){const ps=G.run.scene;const ch=applyE({st:vw.st||0,karma:vw.karma||0});ps.chips=(ps.chips||[]).concat(ch);}return res;};}
// khách điếm, tửu phường giờ có nhiều lựa chọn giá khác nhau: không khóa ô vì thiếu tiền
{const _pa12=placeActs;placeActs=function(n){const L=_pa12(n);const r=G.run;for(const a of L){if(a.a==='inn'||a.a==='tuu'){a.dis=false;a.x='';a.h=0;}if(a.a==='tea')a.h=0;}return L;};}
{const _pa12b=placeAct;placeAct=function(a){if(VENUE_N[a]){const sc=G.run&&G.run.scene;if(sc)sc.venue=a;return;}return _pa12b(a);};}
// Chiến lợi phẩm: rớt ngẫu nhiên, không cho chọn. Thường 0–1 món, tinh anh 1–2, thủ lĩnh 2.
{const _rw13=rewardScene;rewardScene=function(kind,en){_rw13(kind,en);const sc=G.run&&G.run.scene;if(!sc||sc.type!=='reward'||!sc.picks||!sc.picks.length)return;
  const n=kind==='boss'?2:kind==='elite'?ri(1,2):1;const P=sc.picks.slice();const got=[];
  for(let k=0;k<n&&P.length;k++){const i=Math.floor(R()*P.length);got.push(P.splice(i,1)[0]);}
  sc.picks=got;for(let i=0;i<got.length;i++){sc.taken=-1;takePick(i);}sc.picks=[];sc.taken=0;};}

// ================= ĐỢT 13: TRẠM DỊCH MỚI, HÀNG CÓ SỐ LƯỢNG =================
// Phương tiện: mỗi loại có 5 phẩm. Mỗi trạm dịch bày ngẫu nhiên 3–5 món (loại, phẩm, số lượng), ba tháng thay hàng một lần.
// Thuê: dùng được một tháng. Mua: dùng mãi. Giá cao hơn trước nhiều.
const VEH_T=[{k:'ngua',n:['Ngựa thồ','Tuấn mã','Hãn huyết mã','Long câu','Thiên lý long câu'],m:1.7,p:60,realm:0,ic:'run'},
  {k:'loc',n:['Linh lộc','Bạch lộc','Ngọc giác lộc','Cửu sắc lộc','Thần lộc'],m:1.9,p:90,realm:0,ic:'tree'},
  {k:'hac',n:['Bạch hạc','Tiên hạc','Huyền hạc','Đan đỉnh hạc','Cửu thiên hạc'],m:2.8,p:260,realm:1,ic:'feather'},
  {k:'chu',n:['Phi chu','Mộc lan chu','Thanh vân chu','Bích lạc chu','Càn khôn chu'],m:3.6,p:500,realm:1,ic:'cart'},
  {k:'kiem',n:['Phi kiếm','Thanh phong kiếm','Lưu quang kiếm','Tử điện kiếm','Tru tiên kiếm'],m:6,p:1600,realm:2,ic:'sword'}];
const TRAM_RESET=3*HM;
function vehMake(k,tier){const T=VEH_T.find(x=>x.k===k);return {k,tier,n:T.n[tier],m:Math.round(T.m*(1+0.22*tier)*10)/10,realm:T.realm,ic:T.ic,p:T.p*Math.pow(1.9,tier)*1.8};}
function vehBuy(v){return price(v.p);}function vehRent(v){return Math.max(2,Math.round(price(v.p)*0.08));}
function tramStock(n){const r=G.run,w=W();const q=Math.floor(w.t/TRAM_RESET);
  if(!n.tram||n.tram.q!==q||n.tram.kiep!==r.kiep){const T=VEH_T.filter(x=>x.realm<=r.region+1);const L=[];const cnt=ri(3,5);
    for(let i=0;i<cnt;i++){const t=pick(T);const roll=R();const tier=clamp(Math.floor(roll*roll*3+r.region*0.6+(chance(.1)?1:0)),0,4);L.push(Object.assign(vehMake(t.k,tier),{qty:ri(1,3)}));}
    L.sort((a,b)=>a.p-b.p);n.tram={q,kiep:r.kiep,L};}
  return n.tram.L;}
function tramResetIn(){return TRAM_RESET-(W().t%TRAM_RESET);}
mountOf=function(){const r=G.run;if(!r)return null;const w=W();const own=r.veh||(r.mount?MOUNT.find(x=>x.id===r.mount):null);
  const rent=r.rent&&r.rent.until>w.t?r.rent.v:null;if(rent&&(!own||rent.m>=own.m))return Object.assign({},rent,{rented:1});return own;};
function vehTake(i,mode){const r=G.run,sc=r.scene;if(!sc||sc.type!=='place')return false;const n=nodeById(sc.id);const L=tramStock(n);const v=L[i];if(!v||v.qty<=0||r.realm<v.realm)return false;
  const c=mode==='buy'?vehBuy(v):vehRent(v);if(r.st<c)return false;r.st-=c;v.qty--;const o={k:v.k,tier:v.tier,n:v.n,m:v.m,realm:v.realm,ic:v.ic,p:v.p};
  if(mode==='buy'){r.veh=o;r.mount=null;log('Mua '+v.n+'.');note('Đã mua '+v.n,'up');}else{r.rent={v:o,until:W().t+HM};log('Thuê '+v.n+' một tháng.');note('Đã thuê '+v.n+' một tháng','up');}return true;}
// xe chuyến cũng đắt hơn
{const _sl13=stageList;stageList=function(n){return _sl13(n).map(x=>Object.assign(x,{c:x.c*2}));};}
// các tiệm: mỗi món có số lượng, hết thì thôi; một tháng thay hàng
{const _os13=openShop;openShop=function(n){_os13(n);const sc=G.run&&G.run.scene;if(sc&&sc.type==='shop')for(const it of sc.items)if(it.qty==null)it.qty=it.k==='pill'?ri(1,3):1;};}
{const _by13=buy;buy=function(i){const sc=G.run&&G.run.scene;const it=sc&&sc.items&&sc.items[i];if(!it||it.sold)return _by13(i);const q=it.qty==null?1:it.qty;_by13(i);if(it.sold){it.qty=q-1;if(it.qty>0)it.sold=0;}};}
function shopResetIn(){return HM-(W().t%HM);}
// tiệm tạp hóa: vào xem không tốn thời gian
{const _pa13=placeActs;placeActs=function(n){const L=_pa13(n);for(const a of L)if(a.a==='taphoa')a.h=0;return L;};}
{const _pc13=placeAct;placeAct=function(a){if(a==='taphoa'){const sc=G.run&&G.run.scene;if(sc&&sc.type==='place'){openShop(nodeById(sc.id));return;}}return _pc13(a);};}
// ----- nhiệm vụ: phẩm theo độ khó, trả lại có phạt -----
const QGRADE=['Dễ','Thường','Khó','Hiểm','Tử nạn','Tuyệt cảnh'];
function questGrade(q){if(q.grade!=null)return q.grade;const n=nodeById(q.node);return clamp((n?n.danger:0)+(q.kind==='diet'?1:0),0,4);}
{const _ob13=openBoard;openBoard=function(n){_ob13(n);if(n&&n.board)for(const q of n.board.list)if(q.grade==null){q.grade=questGrade(q);q.reward.st=Math.round(q.reward.st*(1+q.grade*0.25));}};}
{const _tq13=takeQuest;takeQuest=function(i){const r=G.run,sc=r.scene;const n=sc&&nodeById(sc.id);const b=n&&n.board&&n.board.list[+i];const k=r.quests.length;_tq13(i);if(b&&r.quests.length>k){const q=r.quests[r.quests.length-1];q.grade=questGrade(b);q.d=b.kind==='diet'?'Tới nơi, vào mục Nhiệm vụ trong địa điểm để lùng tìm và hạ mục tiêu.':'Tới nơi, vào mục Nhiệm vụ trong địa điểm để giao tận tay.';}};}
function questPenalty(q){return {st:Math.round((q.reward.st||0)*0.5),karma:-2};}
function questCancel(id){const r=G.run;const q=r.quests.find(x=>x.id===id&&x.state==='open');if(!q)return false;const P=questPenalty(q);
  q.state='fail';q.dropped=1;r.st=Math.max(0,r.st-P.st);applyE({karma:P.karma});log(`Trả lại việc: ${q.text}. Mất ${P.st} linh thạch, mang tiếng thất hứa.`);
  const fn=nodeById(q.from);if(fn&&fn.board){const b=fn.board.list.find(x=>x.id===q.id);if(b)b.taken=false;}return true;}
// ----- nhiệm vụ: hạn chót đủ rộng -----
// Hạn cũ chỉ bằng thời gian đi đường cộng 3–8 ngày nên gần như luôn trễ. Nay: gấp rưỡi thời gian đi đường cộng 15–40 ngày.
{const _ob14=openBoard;openBoard=function(n){_ob14(n);if(n&&n.board)for(const q of n.board.list)if(!q.v2){const p=findPath(n.id,q.node);const tH=p?travelHours(p):24*30;q.days=Math.ceil(tH*1.5/24)+ri(15,40);q.v2=1;}};}
// việc đang nhận từ bản cũ: nới hạn thêm một lần
{const _adv14=advanceTime;advanceTime=function(h){const r=G.run;if(r&&r.quests&&!r.qfix14){for(const q of r.quests)if(q.state==='open')q.due+=60*HD;r.qfix14=1;}return _adv14(h);};}
// đi xe chuyến tới nơi cũng tính là đã tới
{const _sg14=stageGo;stageGo=function(id){const r=G.run;const a=r&&r.at;_sg14(id);if(G.run&&G.run.at!==a)questArrive(G.run.at);};}

{const _pa15=placeAct;placeAct=function(a){const sc=G.run&&G.run.scene;const res=_pa15(a);const s2=G.run&&G.run.scene;if(s2&&s2===sc)s2.seq=(s2.seq||0)+1;return res;};}

// ================= ĐỢT 15: NHIỆM VỤ LÀM TẠI CHỖ, PHẦN THƯỞNG THEO PHẨM, THÔNG BÁO =================
// Tới nơi không tự xong: vào địa điểm, mục "Nhiệm vụ" có việc riêng. Đưa tin thì giao tận tay; diệt yêu thì phải đánh.
// Đánh thua hoặc bỏ chạy: nhiệm vụ thất bại. Quá hạn: thất hứa.
// Phần thưởng: ít linh thạch (Dễ 3–5 ... Tử nạn 30–40), thêm đan dược, vật liệu, pháp bảo theo phẩm, và lịch luyện.
const QST=[[3,5],[6,10],[12,18],[20,28],[30,40],[45,60]];
function questRewardGen(g,reg){const st=Math.round(ri(QST[g][0],QST[g][1])*(1+0.5*reg));const it=[];
  if(g===0&&chance(.5))it.push({k:'pill',id:pick(['hoixuan','tukhi']),q:0});
  if(g>=1)it.push({k:'pill',id:rollPill(),q:g>=3?1:0});
  if(g>=2)it.push({k:'mat',m:pick(['thao','khoang']),n:ri(1,2)+g-2});
  if(g>=3)it.push({k:'relic',tier:clamp(reg+(g>=4?1:0),0,4)});
  if(g>=4)it.push({k:'pill',id:btPill(),q:g>=5?2:1});
  if(g>=5)it.push({k:'relic',tier:clamp(reg+2,0,4)});
  return {st,ll:3+g*3,it,v:2};}
{const _ob15=openBoard;openBoard=function(n){_ob15(n);if(n&&n.board)for(const q of n.board.list)if(!q.reward||q.reward.v!==2){q.grade=questGrade(q);q.reward=questRewardGen(q.grade,G.run.region);}};}
function questRewardOf(q){if(q.reward&&q.reward.v===2)return q.reward;return {st:Math.min(40,Math.max(3,Math.round((q.reward&&q.reward.st||10)*ECON))),ll:3+questGrade(q)*3,it:[],v:2};}
function questRewardChips(q){const R0=questRewardOf(q);const L=[chip('💎','+'+R0.st,'Linh thạch','up'),chip('⚔','+'+Math.round(R0.ll*(typeof LL_MUL==='number'?LL_MUL:1))+'% lịch luyện','Lịch luyện','up')];
  const tt=(av,n,sub,d,t)=>`<div class="tt-it" style="${t!=null?'--pc:'+QCOL[clamp(t,0,5)]:''}"><span class="tt-av">${av}</span><div><b>${n}</b><small>${sub}</small><p>${d}</p></div></div>`;
  for(const x of R0.it){let c;if(x.k==='pill'){const P0=PILL[x.id];c=chip(P0.i,(x.q?PQ[x.q]+' ':'')+P0.n,pillTip(x.id,x.q),'item');c.h=tt(P0.i,(x.q?PQ[x.q]+' ':'')+P0.n,'Đan dược',P0.d.replace('{x}',pillX(x.id,x.q)),x.q||0);}
    else if(x.k==='mat'){const M0=MAT[x.m];c=chip(M0.i,x.n+' '+M0.n.toLowerCase(),M0.n+'\n'+M0.d,'item');c.h=tt(M0.i,M0.n+' × '+x.n,'Vật liệu luyện chế',M0.d);}
    else if(x.k==='relic'){c=chip('🏺','pháp bảo '+GRADE[x.tier].toLowerCase(),'Pháp bảo '+GRADE[x.tier]+'\nChưa rõ là món gì, nhận rồi mới biết.','item');c.h=tt('?','Pháp bảo ?',GRADE[x.tier],'Chưa rõ là món gì. Nhận rồi mới biết.',x.tier);}
    if(c)L.push(c);}
  return L;}
function questGive(q){const r=G.run;const R0=questRewardOf(q);const ch=[];r.st+=R0.st;ch.push(chip('💎','+'+R0.st,'Linh thạch','up'));
  for(const x of R0.it){if(x.k==='pill'){const c=gainPill(x.id,x.q);if(c)ch.push(c);}else if(x.k==='mat'){run2().mats[x.m]=(run2().mats[x.m]||0)+x.n;ch.push(chip(MAT[x.m].i,'+'+x.n+' '+MAT[x.m].n.toLowerCase(),'Vật liệu','up'));}
    else if(x.k==='relic'){const rel=genRelic(x.tier);r.relics.push(rel);clampHp();ch.push(chip('🏺',rel.name,relicTip(rel),'item',rel.tier));}}
  llChipMerge(ch,llAdd(R0.ll,null,true));applyE({karma:2});return ch;}
function qPop(kind,q,ch){G.qpop=G.qpop||[];G.qpop.push({kind,text:q.text,grade:questGrade(q),ch:ch||[]});}
// tới nơi: chỉ báo, không tự xong
questArrive=function(id){const r=G.run;for(const q of r.quests)if(q.state==='open'&&q.node===id&&!q.arrNote){q.arrNote=1;note('Đã tới nơi của nhiệm vụ. Vào địa điểm, mục Nhiệm vụ.');}};
// làm nhiệm vụ tại chỗ
function questDo(id){const r=G.run,sc=r.scene;const q=r.quests.find(x=>x.id===id&&x.state==='open');if(!q||!sc||sc.type!=='place'||q.node!==sc.id)return false;
  if(q.kind==='den'){advanceTime(1);if(!G.run)return true;q.state='done';const ch=questGive(q);log(`Xong việc: ${q.text}.`);pushNews('Xong việc: '+q.text,true);
    sc.msg=[pick(['Người nhận mở thư, đọc xong thì thở phào, rút tiền công trả ngươi.','Món hàng tới tay người nhận nguyên vẹn. Họ cảm tạ rối rít.','Ngươi trao tận tay. Người nhận gật đầu, đưa tiền công cùng ít quà cảm tạ.'])];sc.chips=ch;sc.seq=(sc.seq||0)+1;qPop('done',q,ch);return true;}
  advanceTime(2);if(!G.run||G.run.scene!==sc)return true;const n=nodeById(sc.id);
  encounter({type:n.danger>=3?'elite':'combat'});r.scene.quest=q.id;r.scene.text='Ngươi lần theo dấu vết trong tờ cáo thị và tìm ra mục tiêu. '+r.scene.text;return true;}
// thắng: xong (phần thưởng mới); thua hay chạy: thất bại
questWin=function(qid){const r=G.run;const q=r.quests.find(x=>x.id===qid&&x.state==='open');if(!q)return [];q.state='done';log(`Xong việc: ${q.text}.`);const ch=questGive(q);qPop('done',q,ch);return ch;};
{const _cc15=combatContinue;combatContinue=function(){const sc=G.run&&G.run.scene;const qid=sc&&sc.after&&sc.after.quest;const res=sc&&sc.over;
  if(qid&&(res==='lose'||res==='flee')){const q=G.run.quests.find(x=>x.id===qid&&x.state==='open');if(q){q.state='fail';q.lost=1;G.run.karma=clamp(G.run.karma-2,-100,100);log('Thất bại: '+q.text);qPop('fail',q,[]);}}
  return _cc15();};}
// quá hạn: thất hứa
{const _adv15=advanceTime;advanceTime=function(h){const r=G.run;const open=r&&r.quests?r.quests.filter(q=>q.state==='open'):[];const o=_adv15(h);if(G.run)for(const q of open)if(q.state==='fail'&&!q.dropped&&!q.lost&&!q.popd){q.popd=1;qPop('late',q,[]);}return o;};}

// ================= ĐỢT 16: SỰ KIỆN DỌC ĐƯỜNG CỦA NHIỆM VỤ, NGƯỜI DẪN ĐẦU THƯƠNG ĐỘI =================
// Đang mang hàng/thư cho nhiệm vụ: thỉnh thoảng bị chặn đường (6% mỗi chặng, cách nhau ít nhất 15 ngày),
// hoặc bị chặn ngay trước cửa người nhận (12% lúc giao). Thắng: giữ được hàng, đi tiếp. Thua hoặc bỏ chạy: nhiệm vụ thất bại.
const QAMB_T=['Bọn cướp đã nghe phong thanh về món hàng ngươi mang theo. Chúng chặn ngay giữa đường.','Một kẻ bịt mặt bám theo ngươi từ mấy dặm trước, giờ mới ra mặt: “Để món hàng lại.”','Có kẻ được thuê để chặn tay ngươi trước khi món hàng tới nơi.'];
function questAmbush(q,text){const r=G.run;r.qAmbT=W().t;q.amb=1;encounter({type:'combat'});const sc=r.scene;sc.quest=q.id;sc.back=sc.back!=null?sc.back:null;sc.text=text+' '+sc.text;}
{const _qw16=questWin;questWin=function(qid){const r=G.run;const q=r.quests.find(x=>x.id===qid&&x.state==='open');if(q&&q.amb){q.amb=0;return [chip('📜','giữ được món hàng','Nhiệm vụ vẫn tiếp tục: tới nơi rồi giao tận tay','up')];}return _qw16(qid);};}
{const _se16=spawnEnt;spawnEnt=function(type,k,o){const e=_se16(type,k,o);if(e&&type==='thuong'&&!e.lead)e.lead=npc('thuong').ten;return e;};}

// ----- sự kiện dọc đường của nhiệm vụ: nhiều loại, có lựa chọn, đều dính tới việc đang làm -----
// Mỗi chặng đường: 7% (cách nhau ít nhất 15 ngày). Lúc giao hàng: 15%.
// Kết quả có thể: giữ được hàng, mất một phần thưởng, thêm thưởng, đổi nơi giao, thất bại, phải đánh nhau.
function qCut(q,f){const R0=questRewardOf(q);R0.st=Math.max(1,Math.round(R0.st*f));q.reward=R0;}
const QEV=[
 {id:'cuop',k:['den','diet'],t:q=>pick(QAMB_T),c:[{l:'Rút binh khí nghênh chiến',fight:1},{l:'Bỏ ra ít linh thạch cho qua',st:3,go:q=>({t:'Bọn chúng đếm tiền, cười khẩy rồi tránh đường.'})}]},
 {id:'mua',k:['den'],t:q=>'Mưa lớn ập tới. Bọc hàng của nhiệm vụ bắt đầu thấm nước.',c:[{l:'Tìm chỗ trú, đợi tạnh hẳn',h:HD,go:q=>({t:'Ngươi ngồi dưới mái đình hoang cả ngày. Hàng khô ráo, chỉ mất chút thời gian.'})},
   {l:'Che tạm, đi tiếp',go:q=>chance(.45)?(qCut(q,0.5),{t:'Tới chặng sau mới thấy một góc hàng đã ướt sũng. Người nhận chắc sẽ trả ít đi.',ch:[chip('📜','thưởng giảm một nửa','Hàng bị hỏng một phần','dn')]}):{t:'May mắn, lớp vải dầu che kín. Hàng vẫn nguyên.'}}]},
 {id:'muagia',k:['den'],t:q=>'Một thương nhân áo gấm chặn ngươi lại: “Món hàng đó, ta trả gấp rưỡi. Ai biết đâu mà.”',c:[{l:'Từ chối, giữ chữ tín',go:q=>({t:'Hắn nhún vai bỏ đi. Lòng ngươi thanh thản.',e:{karma:1}})},
   {l:'Bán cho hắn',go:q=>{const v=Math.round(questRewardOf(q).st*1.5);G.run.st+=v;q.state='fail';q.lost=1;G.run.karma=clamp(G.run.karma-4,-100,100);qPop('fail',q,[]);return {t:'Linh thạch nặng tay. Nhưng tiếng thất tín sẽ theo ngươi một thời gian.',ch:[chip('💎','+'+v,'Linh thạch','up')]};}}]},
 {id:'doinoi',k:['den'],t:q=>'Một người quen của người nhận báo tin: họ đã dọn đi nơi khác.',c:[{l:'Hỏi nơi ở mới',go:q=>{const n0=nodeById(q.node);const ns=regionOf(G.run.region).nodes.filter(x=>x.id!==q.node&&(x.type==='tran'||x.type==='thanh'||x.type==='ancu')).sort((a,b)=>Math.hypot(a.x-n0.x,a.y-n0.y)-Math.hypot(b.x-n0.x,b.y-n0.y));const t=ns[0];if(!t)return {t:'Không ai biết họ đi đâu. Ngươi đành tới chỗ cũ xem sao.'};q.node=t.id;hearOf(t);q.due+=20*HD;q.text=q.text.replace(n0.name,t.name);return {t:'Họ đã chuyển tới '+t.name+'. Hạn được nới thêm hai mươi ngày.'};}}]},
 {id:'nho',k:['den'],t:q=>'Một bà lão nghe nói ngươi đi về phía ấy, nhờ mang thêm một gói thuốc cho cháu.',c:[{l:'Nhận lời',h:2,go:q=>{const R0=questRewardOf(q);R0.it.push({k:'pill',id:pick(['hoixuan','tukhi']),q:0});q.reward=R0;return {t:'Bà lão cảm tạ. Người nhận chắc sẽ hậu tạ thêm.',e:{karma:1}};}},{l:'Từ chối khéo',go:q=>({t:'Bà lão gật đầu, không nói gì.'})}]},
 {id:'cam',k:['den'],t:q=>'Đêm nghỉ chân, bọc hàng của nhiệm vụ bỗng phát ra ánh sáng xanh mờ. Có cấm chế lạ bám trên đó.',c:[{l:'Thử giải cấm chế',req:['ngo',12,'Ngộ tính'],go:q=>({t:'Ngươi lần theo trận văn, gỡ từng nút. Cấm chế tan, lòng ngươi lĩnh hội thêm chút ít.',ll:3})},{l:'Mặc kệ, ngủ tiếp',go:q=>({t:'Cả đêm ngươi mơ thấy những tiếng thì thầm.',e:{tamma:3}})}]},
 {id:'manhmoi',k:['diet'],t:q=>'Một người sống sót kể lại cách mục tiêu của nhiệm vụ ra tay.',c:[{l:'Ngồi nghe kỹ',h:2,go:q=>({t:'Ngươi ghi nhớ thói quen của nó. Trận tới sẽ chủ động hơn.',ll:3})},{l:'Cho người ấy ít thuốc',go:q=>({t:'Người ấy cảm tạ, chỉ thêm đường tắt.',e:{karma:2}})}]},
 {id:'tho',k:['diet'],t:q=>'Một thợ săn già cũng đang lùng mục tiêu của nhiệm vụ, muốn chia đôi phần thưởng nếu hợp sức.',c:[{l:'Đồng ý chia đôi',go:q=>{qCut(q,0.5);q.helper=1;return {t:'Lão chỉ cho ngươi chỗ nó hay lui tới. Thưởng chia đôi, nhưng dễ tìm hơn hẳn.',ll:2,ch:[chip('📜','thưởng giảm một nửa','Chia cho thợ săn','dn')]};}},{l:'Tự làm một mình',go:q=>({t:'Lão nhún vai: “Tùy ngươi.”'})}]},
];
function qevStart(q,ev){const r=G.run;r.qAmbT=W().t;r.scene={type:'qev',q:q.id,ev:ev.id,text:ev.t(q),back:null,res:null,chips:[]};}
function qevPick(i){const r=G.run,sc=r.scene;if(!sc||sc.type!=='qev'||sc.res)return;const q=r.quests.find(x=>x.id===sc.q);const ev=QEV.find(x=>x.id===sc.ev);const c=ev&&ev.c[i];if(!q||!c)return;
  if(c.req&&(S()[c.req[0]]||0)<c.req[1])return;if(c.st){if(r.st<c.st)return;r.st-=c.st;}
  if(c.fight){q.amb=1;encounter({type:'combat'});r.scene.quest=q.id;r.scene.back=null;r.scene.text=sc.text+' '+r.scene.text;return;}
  if(c.h){advanceTime(c.h);if(!G.run)return;}
  const o=c.go(q)||{};let ch=(o.ch||[]).slice();if(c.st)ch.unshift(chip('💎','−'+c.st,'Linh thạch','dn'));if(c.h)ch.push(chip('⏳',durH(c.h),'Thời gian trôi qua',''));
  if(o.e)ch=ch.concat(applyE(o.e));if(o.ll)llChipMerge(ch,llAdd(o.ll,null,true));sc.res={l:c.l,t:o.t};sc.chips=ch;}
function qevOpts(sc){const ev=QEV.find(x=>x.id===sc.ev);const s=S();return ev.c.map(c=>({l:c.l,st:c.st||0,h:c.h||0,fight:!!c.fight,lack:c.req&&(s[c.req[0]]||0)<c.req[1]?c.req[2]+' cần '+c.req[1]:'',no:!!(c.st&&G.run.st<c.st)}));}
{const _rr17=roadRoll;roadRoll=function(a,b){const r=G.run;const qs=r&&r.quests.filter(x=>x.state==='open');
  if(qs&&qs.length&&!r.scene&&chance(.07)&&W().t-(r.qAmbT||-1e9)>15*HD){const q=pick(qs);const L=QEV.filter(e=>e.k.includes(q.kind));if(L.length){r.place={n:'đường tới '+nodeById(b).name,t:nodeById(b).type};qevStart(q,pick(L));return;}}
  return _rr17(a,b);};}
// lúc giao hàng: đôi khi có chuyện trước cửa
const QDOOR=[{t:'Người nhận vắng nhà. Hàng xóm bảo chiều mai mới về. Ngươi đành đợi một ngày.',go:q=>{advanceTime(HD);return 'wait';}},{t:'Ngay trước cửa nhà người nhận, một gã lạ mặt chặn ngươi lại, đòi món hàng.',go:q=>'fight'},{t:'Người nhận mừng rỡ, nhất quyết giữ ngươi lại ăn bữa cơm, dúi thêm quà.',go:q=>{const R0=questRewardOf(q);R0.st+=2;q.reward=R0;return 'bonus';}}];
{const _qd17=questDo;questDo=function(id){const r=G.run;const q=r.quests.find(x=>x.id===id&&x.state==='open');
  if(q&&q.kind==='den'&&!q.ambDoor&&chance(.15)){q.ambDoor=1;const D=pick(QDOOR);const res=D.go(q);if(!G.run)return true;
    if(res==='fight'){const back=r.scene&&r.scene.id;questAmbush(q,D.t);r.scene.back=back;return true;}
    const ok=_qd17(id);const sc=G.run.scene;if(sc&&sc.msg)sc.msg.unshift(D.t);return ok;}
  return _qd17(id);};}

// ================= ĐỢT 17: BẢNG TREO THƯỞNG THAY HÀNG NGẪU NHIÊN, HẠN NHẬN, VIỆC ĐẶC BIỆT =================
// Mỗi bảng giữ 20–60 ngày rồi thay việc mới (mỗi nơi một nhịp). Việc thường: nhận lúc nào cũng được tới khi bảng thay.
// Việc đặc biệt (chừng 1/5 số bảng): khó hơn một bậc, thưởng hậu, chỉ nhận được trong 1–4 ngày và hạn làm rất gấp.
// Vật phẩm thưởng giấu là "???" cho tới khi nhận. Việc đã hủy thì không nhận lại được.
{const _ob17=openBoard;openBoard=function(n){const w=W();
  if(n&&n.board){if(n.board.until&&w.t>n.board.until)n.board=null;else if(n.board.until)n.board.m=Math.floor(w.t/HM);}
  _ob17(n);if(!n||!n.board)return;const B=n.board;
  if(!B.until){B.until=w.t+ri(20,60)*HD;
    if(chance(.22)){const ns=regionOf(G.run.region).nodes.filter(x=>x.id!==n.id&&x.type!=='ai'&&x.danger>=1);const tgt=ns.length?pick(ns):null;
      if(tgt){const p=findPath(n.id,tgt.id);const tH=p?travelHours(p):24*30;const g=clamp(questGrade({node:tgt.id,kind:'diet'})+(chance(.25)?2:1),1,5);
        const q={id:'qs'+n.id+'_'+Math.floor(w.t),text:pick(['Gấp: diệt yêu vật đang tàn sát ở ','Gấp: bắt kẻ cướp đang trốn ở ','Gấp: cứu người bị bắt vào '])+tgt.name,node:tgt.id,kind:'diet',days:Math.ceil(tH*1.1/24)+ri(2,6),special:1,acc:w.t+ri(1,4)*HD,grade:g,v2:1,taken:false};
        q.reward=questRewardGen(g,G.run.region);q.reward.st=Math.round(q.reward.st*1.3);hearOf(tgt);B.list.unshift(q);}}}};}
function boardLeft(n){return n&&n.board&&n.board.until?Math.max(0,n.board.until-W().t):0;}
{const _tq17=takeQuest;takeQuest=function(i){const r=G.run,sc=r.scene;const n=sc&&nodeById(sc.id);const b=n&&n.board&&n.board.list[+i];
  if(!b||b.cancelled||(b.acc&&W().t>b.acc))return;const k=r.quests.length;_tq17(i);if(r.quests.length>k){const q=r.quests[r.quests.length-1];q.reward=b.reward;q.grade=b.grade;if(b.special)q.special=1;}};}
{const _qc17=questCancel;questCancel=function(id){const r=G.run;const q=r.quests.find(x=>x.id===id);const ok=_qc17(id);if(ok&&q){const fn=nodeById(q.from);const b=fn&&fn.board&&fn.board.list.find(x=>x.id===q.id);if(b){b.taken=true;b.cancelled=1;}}return ok;};}
// phần thưởng chưa nhận: chỉ biết linh thạch và lịch luyện, vật phẩm là "???" có khung màu phẩm
function questRewardChipsHidden(q){const R0=questRewardOf(q);const L=questRewardChips(q).slice(0,2);
  for(const x of R0.it){const t=x.k==='relic'?x.tier:x.k==='pill'?(x.q||0):Math.max(0,questGrade(q)-2);const c=chip('','???','Vật phẩm bí ẩn · '+GRADE[clamp(t,0,4)]+'\nNhận việc rồi mới biết là gì.','item');c.t2=t;
    c.h=`<div class="tt-it" style="--pc:${QCOL[clamp(t,0,5)]}"><span class="tt-av">?</span><div><b>???</b><small>${GRADE[clamp(t,0,4)]}</small><p>Vật phẩm bí ẩn. Nhận việc rồi mới biết là gì.</p></div></div>`;c.c='item hid q'+clamp(t,0,5);L.push(c);}
  return L;}

// màu phẩm nhiệm vụ: Dễ xám, Thường lục, Khó lam, Hiểm tím, Tử nạn cam, Tuyệt cảnh đỏ
const QCOL=['#8d8672','#4f8a4a','#4a6fae','#7b56a8','#c97a2b','#b8302a'];function qpc(g){return '--pc:'+QCOL[clamp(g||0,0,5)];}

// ================= ĐỢT 18: KỲ NGỘ HIẾM =================
// Hai loại, xác suất rất thấp, mỗi ngày trong game gieo một lần (cách nhau ít nhất nửa năm):
//  - Tần suất mỗi ngày: có giá 1/8000, hữu duyên 1/12000, vớ vẩn 1/9000 (cộng lại chừng 11 lần mỗi trăm năm).
//  - Kỳ ngộ có giá: muốn có thì phải trả: thọ nguyên, vật phẩm, chỉ số mất vĩnh viễn, linh thạch.
//  - Kỳ ngộ hữu duyên (~1/1000 mỗi ngày): không mất gì, gặp là được.
// Chỉ xảy ra khi đang ở ngoài bản đồ (không trong địa điểm hay trận đánh), không xảy ra trong lúc bế quan dài.
function lifeLose(y){const r=G.run;r.lifeAdj-=y;return chip('⏳','thọ −'+y+' năm','Thọ nguyên mất vĩnh viễn','dn');}
function lifeGain(y){const r=G.run;r.lifeAdj+=y;return chip('⏳','thọ +'+y+' năm','Thọ nguyên tăng','up');}
const KYNGO=[
 {id:'doitho',paid:1,n:'Lão nhân đổi thọ',t:'Bên vách đá có lão nhân tóc bạc ngồi đánh cờ một mình. Lão ngẩng lên: “Ngươi có muốn thông tuệ hơn người? Ta lấy của ngươi tám năm thọ.”',
  c:[{l:'Đổi tám năm thọ lấy ngộ tính',cost:'−8 năm thọ nguyên',go:()=>{const ch=[lifeLose(8)];return {t:'Lão chạm hai ngón tay lên trán ngươi. Đầu óc bỗng sáng như gương. Lúc tỉnh lại, lão đã biến mất, tóc mai ngươi điểm bạc.',ch:ch.concat(applyE({ngo:3}))};}},{l:'Cúi chào rồi đi',go:()=>({t:'Lão cười khà, tiếp tục ván cờ dang dở.'})}]},
 {id:'huyette',paid:1,n:'Huyết tế pháp bảo',t:'Một tế đàn cổ phủ rêu, trên khắc: “Hiến một bảo vật, đổi lấy một bảo vật.” Rãnh máu vẫn còn ướt.',
  c:[{l:'Hiến một pháp bảo trong túi',cost:'mất một pháp bảo ngẫu nhiên',need:()=>G.run.relics.length>0?'':'Không có pháp bảo nào',go:()=>{const r=G.run;const i=Math.floor(R()*r.relics.length);const old=r.relics.splice(i,1)[0];const nw=genRelic(clamp((old.tier||0)+1,0,4));r.relics.push(nw);clampHp();
    return {t:'Món '+old.name+' tan vào tế đàn. Khói đỏ cuộn lên, rồi một bảo vật khác từ từ hiện ra.',ch:[chip('🏺','mất '+old.name,'Đã hiến','dn'),chip('🏺',nw.name,relicTip(nw),'item',nw.tier)]};}},{l:'Không dám, rời đi',go:()=>({t:'Ngươi lùi lại. Sau lưng như có tiếng ai thở dài.'})}]},
 {id:'linhtuyen',paid:1,n:'Linh tuyền cấm địa',t:'Giữa hẻm núi có một dòng suối xanh biếc, linh khí đặc quánh. Nhưng nước lạnh thấu xương, ngấm vào là tổn kinh mạch.',
  c:[{l:'Ngâm mình trong linh tuyền',cost:'khí huyết tối đa −10% vĩnh viễn',go:()=>({t:'Ngươi run lên từng cơn. Khi bước ra, linh lực trong người dồi dào gấp bội, còn thân thể thì yếu đi trông thấy.',ch:applyE({hpP:-10,mpP:25,tv:6,tvMajor:1})})},{l:'Chỉ vốc một ngụm',go:()=>({t:'Một ngụm nước lạnh buốt. Tinh thần tỉnh táo hẳn.',ch:applyE({tamma:-5})})}]},
 {id:'mataam',paid:1,n:'Ma tâm kinh',t:'Trong hốc cây cháy đen có cuốn sách da người. Chữ trong đó như đang bò, thì thầm hứa hẹn sức mạnh.',
  c:[{l:'Đọc hết cuốn sách',cost:'đạo tâm −3 vĩnh viễn, tâm ma +15',go:()=>({t:'Từng chữ khắc vào xương. Ngươi thấy mình mạnh lên, nhưng giấc ngủ không còn yên.',ch:applyE({tam:-3,tamma:15,atkP:15})})},{l:'Đốt nó đi',go:()=>({t:'Lửa bén vào, sách kêu lên như người. Lòng ngươi thanh thản.',ch:applyE({karma:3,tam:1})})}]},
 {id:'cuoc',paid:1,n:'Đánh cược với tiên nhân',t:'Một gã say mặc đạo bào rách, tay cầm hồ lô: “Cược không? Ngươi đặt một nửa linh thạch, ta đặt một viên đan đột phá.”',
  c:[{l:'Đặt cược một nửa linh thạch',cost:'mất một nửa linh thạch đang có',need:()=>G.run.st>=4?'':'Không đủ linh thạch',go:()=>{const r=G.run;const v=Math.floor(r.st/2);r.st-=v;const ch=[chip('💎','−'+v,'Linh thạch','dn')];
    if(chance(.5)){const c=gainPill(btPill(),2);if(c)ch.push(c);return {t:'Gã lắc hồ lô, đổ ra ba hạt xúc xắc. Ngươi thắng. Gã cười ha hả, ném viên đan qua.',ch};}return {t:'Ba hạt xúc xắc lăn tròn. Ngươi thua. Gã cười, ôm túi linh thạch, biến vào mây.',ch};}},{l:'Lắc đầu đi tiếp',go:()=>({t:'Gã nhún vai, ngửa cổ tu một ngụm.'})}]},
 {id:'saoroi',n:'Sao rơi trước mặt',t:'Đêm ấy một vệt sáng rạch trời, rơi ngay bãi cỏ trước mặt ngươi. Trong hố còn ấm, một món đồ đang tỏa quang.',
  c:[{l:'Nhặt lên',go:()=>{const nw=genRelic(clamp(G.run.region+1,0,4));G.run.relics.push(nw);clampHp();return {t:'Là một pháp bảo, còn vương hơi nóng của trời cao. Hữu duyên mới gặp.',ch:[chip('🏺',nw.name,relicTip(nw),'item',nw.tier)]};}}]},
 {id:'mongtien',n:'Tiên nhân báo mộng',t:'Trong giấc ngủ, ngươi thấy mình đứng giữa biển mây. Một bóng người áo trắng giảng một đoạn kinh rồi tan biến.',
  c:[{l:'Ngồi dậy ghi nhớ',go:()=>({t:'Lời kinh vẫn còn văng vẳng. Ngươi ngộ ra thêm đôi điều.',ch:applyE({ngo:1,tv:4,tvMajor:1})})}]},
 {id:'linhchi',n:'Linh chi ngàn năm',t:'Dưới gốc cây cổ thụ đổ, một cây linh chi to bằng chiếc nón lá, vân đỏ như máu.',
  c:[{l:'Hái và ăn ngay',go:()=>({t:'Vị đắng chát, rồi một luồng ấm chạy khắp thân. Ngươi thấy mình trẻ ra.',ch:[lifeGain(3)].concat(applyE({hpP:5}))})}]},
 {id:'lakhach',n:'Kiếm khách vô danh',t:'Một kiếm khách lướt qua, dừng lại nhìn ngươi hồi lâu: “Căn cốt không tệ.” Rồi múa một đường kiếm cho ngươi xem.',
  c:[{l:'Chăm chú xem',go:()=>({t:'Đường kiếm như nước chảy. Ngươi nhìn mà thấy tay mình ngứa ngáy.',ch:applyE({atkP:5,van:1})})}]},
];
function kyStart(ev){const r=G.run;r.kyT=W().t;r.scene={type:'kyngo',ev:ev.id,text:ev.t,res:null,chips:[],back:r.moving?null:r.at};if(r.moving)r.moving.halt=1;}
function kyOpts(sc){const ev=KYNGO.find(x=>x.id===sc.ev);return ev.c.map(c=>({l:c.l,cost:c.cost||'',no:c.need?c.need():''}));}
function kyPick(i){const r=G.run,sc=r.scene;if(!sc||sc.type!=='kyngo'||sc.res)return;const ev=KYNGO.find(x=>x.id===sc.ev);const c=ev&&ev.c[i];if(!c||(c.need&&c.need()))return;
  const o=c.go()||{};sc.res={l:c.l,t:o.t};sc.chips=o.ch||[];log('Kỳ ngộ: '+ev.n+'.');if(G.run&&r.age>=S().life)die('toahoa');}
{const _adv18=advanceTime;advanceTime=function(h){const o=_adv18(h);const r=G.run;if(!r||h>48)return o;r.kyAcc=(r.kyAcc||0)+h;
  while(r.kyAcc>=HD){r.kyAcc-=HD;if(r.scene||G.screen!=='map'||W().t-(r.kyT||-1e9)<HY/2)continue;
    const roll=R();if(roll<KY_P[0]){kyStart(pick(KYNGO.filter(x=>x.paid)));break;}if(roll<KY_P[0]+KY_P[1]){kyStart(pick(KYNGO.filter(x=>!x.paid&&!x.joke&&!x.sp)));break;}if(roll<KY_P[0]+KY_P[1]+KY_P[2]){kyStart(pick(KYNGO.filter(x=>x.joke)));break;}}
  return o;};}

const KY_P=[1/8000,1/12000,1/9000];
// kỳ ngộ vớ vẩn: trông như hữu duyên, hóa ra đồ dởm hoặc bị lừa
function junkRelic(n){const x=genRelic(0);x.name=n;x.k='kiem';for(const k in x.fx)x.fx[k]=x.fx[k]>0?1:x.fx[k];x.lore='Chuôi khắc chữ “Hàng thịt chợ Đông”. Thái thịt thì tốt.';return x;}
KYNGO.push(
 {id:'bikip',joke:1,n:'Bí kíp gia truyền',t:'Một gã mặt mũi bí hiểm kéo ngươi vào góc: “Bí kíp tuyệt thế của tổ tiên ta. Thấy ngươi có duyên, chỉ lấy ba linh thạch.”',
  c:[{l:'Mua ngay kẻo lỡ',need:()=>G.run.st>=3?'':'Không đủ linh thạch',go:()=>{G.run.st-=3;return {t:'Về mở ra đọc: “Món kho cá ngon nhất làng.” Trang cuối còn ghi: “Thêm chút đường.” Ngươi bật cười, lòng nhẹ hẳn.',ch:[chip('💎','−3','Linh thạch','dn')].concat(applyE({tamma:-2}))};}},{l:'Mỉm cười từ chối',go:()=>({t:'Gã lắc đầu tiếc rẻ rồi chạy sang mời người khác.'})}]},
 {id:'tiendan',joke:1,n:'Tiên đan giá rẻ',t:'Đạo sĩ dạo bày bán “Cửu Chuyển Kim Đan, uống vào thành tiên”, giá chỉ năm linh thạch một viên. Đan đen bóng, mùi hơi lạ.',
  c:[{l:'Mua một viên, uống thử',need:()=>G.run.st>=5?'':'Không đủ linh thạch',go:()=>{G.run.st-=5;const s=S();G.run.hp=Math.max(1,G.run.hp-Math.round(s.maxHp*0.1));return {t:'Uống xong ngươi đau bụng cả buổi chiều. Tới lúc nhìn kỹ viên thứ hai mới nhận ra: là phân dê vo tròn, lăn qua bột than.',ch:[chip('💎','−5','Linh thạch','dn'),chip('❤️','−10%','Khí huyết','dn')]};}},{l:'Hỏi đan làm từ gì',go:()=>({t:'Đạo sĩ ấp úng, thu sạp chạy mất.'})}]},
 {id:'anmay',joke:1,n:'Cao nhân ăn mày',t:'Lão ăn mày rách rưới nắm áo ngươi: “Ta là ẩn thế cao nhân. Cúi đầu lại gần, ta truyền công cho.”',
  c:[{l:'Cúi đầu lại gần',go:()=>{const v=Math.min(G.run.st,ri(2,4));G.run.st-=v;return {t:'Lão vỗ “bốp” một cái lên trán ngươi, hét: “Ngộ chưa!” Ngươi còn đang choáng thì lão đã cắp túi linh thạch chạy biến.',ch:v?[chip('💎','−'+v,'Bị móc túi','dn')]:[]};}},{l:'Cho lão cái bánh rồi đi',go:()=>({t:'Lão nhai ngấu nghiến, gật gù: “Hậu sinh khả úy.”',ch:applyE({karma:1})})}]},
 {id:'thanbinh',joke:1,n:'Thần binh dưới bùn',t:'Dưới đáy ao cạn, một thanh binh khí cắm thẳng, quanh chuôi như có ánh sáng mờ.',
  c:[{l:'Lội xuống rút lên',go:()=>{const x=junkRelic('Dao phay rỉ sét');G.run.relics.push(x);clampHp();return {t:'Rút mãi mới ra. Ánh sáng là do mặt trời phản chiếu. Chuôi còn khắc chữ “Hàng thịt chợ Đông”.',ch:[chip('🏺',x.name,relicTip(x),'item',x.tier)]};}}]},
 {id:'khobau',joke:1,n:'Kho báu dưới gốc đa',t:'Ngươi nhặt được tấm bản đồ rách, đánh dấu chữ thập đỏ dưới gốc đa đầu làng: “Kho báu ở đây.”',
  c:[{l:'Đào suốt đêm',h:8,go:()=>{advanceTime(8);return {t:'Gần sáng, xẻng chạm vào một cái hũ. Mở ra: dưa muối, còn khá ngon. Dưới đáy hũ có mảnh giấy: “Bà để dành cho cháu.”',ch:[chip('⏳','8 giờ','Thời gian trôi qua','')].concat(applyE({tamma:-3}))};}},{l:'Vứt bản đồ đi',go:()=>({t:'Gió thổi tấm bản đồ bay mất. Có lẽ là duyên chưa tới, hoặc là may.'})}]}
);
// ----- kho công pháp: tháo một môn ra khỏi ô đã học thì cất vào kho riêng (không về túi đồ), lắp lại lúc nào cũng được nếu còn ô -----
function artKho(){const r=G.run;return r.artKho||(r.artKho=[]);}
function artStash(u){const r=G.run;const a=arts().find(x=>x.u===u);if(!a)return false;r.arts=r.arts.filter(x=>x!==a);for(let j=0;j<8;j++)if(r.chu[j]&&r.chu[j].u===u)r.chu[j]=null;artKho().push(a);syncSkills();clampHp();saveSoon();return true;}
function artUnstash(u){const r=G.run;const a=artKho().find(x=>x.u===u);if(!a)return false;if(arts().filter(x=>x.type===a.type).length>=artCap(a.type))return false;r.artKho=artKho().filter(x=>x!==a);r.arts.push(a);syncSkills();saveSoon();return true;}

// ================= ĐỢT 19: PHÀM NHÂN =================
// Nhân vật mới sinh ra là phàm nhân: chưa dẫn khí nhập thể. Đây là bậc trước Luyện Khí.
// Cần 50 tu vi (mọi nguồn tu vi lúc này nhân 10, vì thang chỉ 50 thay vì 500). Đủ thì tự dẫn khí nhập thể, bước vào Luyện Khí sơ kỳ.
// Phàm nhân: khí huyết −20%, linh lực −50%, công −15%; không cần lịch luyện hay động phủ để bước qua bậc này.
// Nhân vật trong bản lưu cũ (không có cờ) coi như đã qua bậc phàm nhân.
const PHAM_TVP=50,PHAM_MUL=500/PHAM_TVP;
function isPham(){const r=G.run;return !!(r&&r.pham);}
{const _nr19=newRun;newRun=function(c){const res=_nr19(c);if(G.run){G.run.pham=1;G.run.tv=0;}return res;};}
{const _tp19=tvPts;tvPts=function(realm){return isPham()&&realm===G.run.realm?PHAM_TVP:_tp19(realm);};}
{const _br19=bqReal;bqReal=function(){return _br19()*(isPham()?PHAM_MUL:1);};}
{const _tn19=thonapPct;thonapPct=function(){return _tn19()*(isPham()?PHAM_MUL:1);};}
{const _at19=addTv;addTv=function(x){const r=G.run;if(!r||!r.pham||!(x>0))return _at19(x);
  const res=_at19(x*PHAM_MUL);return res;};}
// dẫn khí nhập thể: gọi khi đột phá thành công (tu vi, lịch luyện đều đầy)
function phamUp(){if(G.run&&G.run.pham&&G.run.tv>=100&&llOf()>=LL_BT){const g=G.run;g.pham=0;g.tv=0;g.tvAcc=0;g.ll=Math.max(0,(g.ll||0)-100)*0.2;const s=S();g.hp=s.maxHp;g.mp=s.maxMp;
    log(`Năm ${Math.floor(g.age)} tuổi, dẫn khí nhập thể, bước vào Luyện Khí.`);if(typeof bio==='function')bio(`Năm ${Math.floor(g.age)} tuổi, ${g.ten} dẫn khí nhập thể, bước vào Luyện Khí.`);}}
// phàm nhân không có lịch luyện ràng buộc
{const _le19=llEff;llEff=function(tv){return isPham()?1:_le19(tv);};}
{const _S19=S;S=function(){const s=_S19();if(isPham()){s.maxHp=Math.round(s.maxHp*0.8);s.maxMp=Math.round(s.maxMp*0.5);s.atk=Math.round(s.atk*0.85);s.matk=Math.round(s.matk*0.85);}return s;};}
// tên cảnh giới
{const _rl19=realmLabel;realmLabel=function(){return isPham()?'Phàm nhân':_rl19();};}
{const _rt19=realmText;realmText=function(r){r=r||G.run;return r===G.run&&isPham()?'Phàm nhân':_rt19(r);};}
function realmName(){return isPham()?'Phàm nhân':REALM[G.run.realm];}
{const _ae19=applyE;applyE=function(e,v){const was=isPham();const ch=_ae19(e,v);if(was&&G.run&&!isPham()&&Array.isArray(ch)){const i=ch.findIndex(c=>c&&c.i==='✨');if(i>=0)ch.splice(i,1);ch.push(chip('✨','dẫn khí nhập thể','Bước vào Luyện Khí tầng 1','up'));}return ch;};}
// ----- phàm nhân chưa dẫn khí: không có linh lực, không thúc được pháp bảo (từ linh phẩm trở lên), chưa dùng chiêu thức, chưa mở Khí Hải -----
function phamLock(rel){return isPham()&&rel&&(rel.tier||0)>=1&&rel.k!=='book';}
{const _S20=S;S=function(){const s=_S20();if(isPham()){s.maxMp=0;}return s;};}
{const _eq20=equip;equip=function(i){const rel=G.run.relics[i];if(phamLock(rel)){note('Phàm nhân chưa có linh lực, không thúc được pháp bảo này. Dẫn khí nhập thể rồi hãy dùng.');return;}return _eq20(i);};}
{const _et20=equipTo;equipTo=function(i,s){const rel=G.run.relics[i];if(phamLock(rel)){note('Phàm nhân chưa có linh lực, không thúc được pháp bảo này. Dẫn khí nhập thể rồi hãy dùng.');return;}return _et20(i,s);};}
{const _ea20=eqAuto;eqAuto=function(){if(!isPham())return _ea20();const r=G.run;const keep=r.relics.filter(x=>!x.seen&&phamLock(x));keep.forEach(x=>x.seen=1);const res=_ea20();keep.forEach(x=>x.seen=1);return res;};}
// trong trận: chỉ đánh thường, thủ thế, đỡ đòn, dùng đồ; chưa có thần thông
{const _pa20=playerAct;playerAct=function(id,t){if(isPham()&&id&&id[0]!=='_')return false;return _pa20(id,t);};}
{const _pu20=playerUlt;playerUlt=function(){if(isPham())return false;return _pu20();};}
// tháo, lắp lại phương tiện
function vehOff(){const r=G.run;const m=mountOf();if(!m)return;if(m.rented){r.rentOff=r.rent;r.rent=null;}else{r.vehOff=r.veh||null;r.veh=null;if(r.mount){r.vehOff=MOUNT.find(x=>x.id===r.mount);r.mount=null;}}note('Đã tháo '+m.n+'. Chạm ô phương tiện để dùng lại.');}
function vehOn(){const r=G.run;if(r.vehOff){r.veh=r.vehOff;r.vehOff=null;return true;}if(r.rentOff&&r.rentOff.until>W().t){r.rent=r.rentOff;r.rentOff=null;return true;}return false;}

// ================= ĐỢT 21: TÂM PHÁP LÀ CON TÀU =================
// Mọi việc tu luyện (bế quan, thổ nạp, mọi nguồn tu vi) đều cần một tâm pháp đang vận hành.
// Phàm nhân: tâm pháp đã học tự chạy ở ô dẫn khí (Khí Hải chưa mở). Từ Luyện Khí: tâm pháp phải nằm trong Khí Hải.
// Phẩm tâm pháp quyết định tốc độ tu luyện và cảnh giới tối đa nó đưa tới được (phàm phẩm: tới Luyện Khí viên mãn).
// Hệ trùng linh căn: nhanh thêm 10%.
// Có tâm pháp đầu tiên: xuất thân gia truyền, bái nhập tông môn, mua bản chép tay ở tạp hóa, cao nhân truyền dạy,
// kỳ ngộ, khắc vào chân linh từ kiếp trước (Bến Vong Xuyên), tự ngộ (ngộ tính từ 14).
// Bảo đảm: phàm nhân không bao giờ quá 5 năm mà chưa có tâm pháp; từ năm thứ nhất cơ hội gặp cao nhân tăng dần,
// tới 4 năm rưỡi gặp chắc chắn ngay khi rảnh, tròn 5 năm thì được truyền thẳng dù đang làm gì.
const TU_M=[0.7,1,1.25,1.5,1.8,2.1,2.5],TP_Y=5;
function tpMax(a){return clamp(a.tier,0,5);}
function tuOf(L){return L.filter(a=>a&&a.type==='tp').sort((x,y)=>y.tier-x.tier)[0]||null;}
function tuArt(){const r=G.run;if(!r)return null;run2();return tuOf(isPham()?arts():activeArts());}
function tuMul(){const a=tuArt();if(!a)return 0;const r=G.run;return TU_M[clamp(a.tier,0,6)]*(a.el!=='vo'&&r.root.els.includes(a.el)?1.1:1);}
function hasTp(){const r=G.run;return arts().some(a=>a.type==='tp')||r.relics.some(x=>x.k==='book'&&x.art&&x.art.type==='tp');}
function tuWhy(){if(tuArt())return '';return arts().some(a=>a.type==='tp')?'Chưa vận hành tâm pháp nào trong Khí Hải: linh khí vào thân rồi lại tản mất.':'Chưa có tâm pháp tu luyện: không biết cách dẫn linh khí vào thân. Tìm ở tạp hóa, tông môn, cao nhân, hoặc chờ cơ duyên.';}
function tuCapWhy(){const r=G.run;const a=tuArt();if(!a||isPham())return '';return tpMax(a)<r.realm+1?a.n+' ('+PHAM[a.tier]+') chỉ đưa tới '+REALM[tpMax(a)]+' viên mãn. Muốn lên '+REALM[clamp(r.realm+1,0,5)]+' phải có tâm pháp '+PHAM[r.realm+1]+' trở lên đang vận hành.':'';}
{const _br21=bqRate;bqRate=function(){return _br21()*tuMul();};}
{const _tn21=thonapPct;thonapPct=function(){return _tn21()*tuMul();};}
{const _bn21=bqNeedY;bqNeedY=function(){return bqReal()>0?_bn21():99;};}
{const _bc21=bqCan;bqCan=function(){return _bc21()||tuWhy();};}
{const _at21=addTv;addTv=function(x){const r=G.run;if(r&&x>0&&!tuArt()){G._tvLost=1;return;}return _at21(x);};}
{const _ae21=applyE;applyE=function(e,v){G._tvLost=0;const was=G.run&&G.run.flags&&G.run.flags.tongmon;const ch=_ae21(e,v);
  if(G.run&&Array.isArray(ch)){if(G._tvLost&&e&&e.tv>0)ch.push(chip('✨','linh khí tản mất','Chưa có tâm pháp tu luyện vận hành nên không giữ được tu vi','dn'));
    if(!was&&G.run.flags.tongmon){const c=tpSect();if(c)ch.push(c);}}G._tvLost=0;return ch;};}
{const _cb21=canBreak;canBreak=function(){return _cb21()&&!tuCapWhy()&&!!tuArt();};}
// học thẳng một tâm pháp (truyền khẩu, tự ngộ): vào sở học và ô vận hành ngay
function tpLearn(tier,o){const r=run2();o=o||{};const a=genArt('tp',tier,null,{req:0,el:o.el});if(o.n)a.n=o.n;a.req=0;a.lines[0]={fx:'tvP',v:6+3*a.tier,n:'Tu luyện',d:'Tu vi nhận thêm {v}%'};
  a.lines.forEach((x,i)=>{x.req=i?Math.max(x.req||0,0):0;});a.src=o.src||'';r.arts.push(a);const n=chuSlots();for(let j=0;j<n;j++)if(!r.chu[j]){r.chu[j]={k:'a',u:a.u};break;}
  syncSkills();log('Có tâm pháp tu luyện: '+a.n+(o.src?' ('+o.src+')':'')+'.');saveSoon();return a;}
function tpChip(a){return chip('📖',a.n,PHAM[a.tier]+' · tâm pháp · tốc độ tu luyện ×'+numFx(TU_M[a.tier]),'item');}
function tpSect(){const r=G.run;if(r.flags.sectTp)return null;r.flags.sectTp=1;const a=tpLearn(1,{el:pick(r.root.els.filter(e=>EL[e]))||'vo',src:'tông môn truyền'});a.n=pick(RELIC_PRE[a.el]||RELIC_PRE.vo)+' Nhập Môn Tâm Kinh';return tpChip(a);}
// bỏ tâm pháp tự cấp cho mọi kiếp; xuất thân gia truyền, ký ức kiếp trước
const TP_ORIGIN={thegia:1,tran:0,daodong:0,mieu:0};
for(const id in TP_ORIGIN){const o=ORIGIN.find(x=>x.id===id);if(o)o.d+=', có tâm pháp gia truyền';}
UPG.push({id:'kytp',n:'Khắc tâm pháp vào chân linh',i:'🪷',max:2,c:[12,28],d:'Đầu thai nhớ lại tâm pháp tốt nhất kiếp trước: bậc 1 giảm một phẩm (tối đa Hoàng phẩm), bậc 2 giữ nguyên phẩm (tối đa Huyền phẩm)'});
{const _die21=die;die=function(cause,info){const r=G.run;if(r&&r.arts){const a=tuOf(arts());if(a)G.meta.tpMem={n:a.n,tier:a.tier,el:a.el};}return _die21(cause,info);};}
{const _nr21=newRun;newRun=function(c){const res=_nr21(c);const r=G.run;if(!r||!r.pham)return res;run2();
  const old=r.arts.filter(a=>a.start).map(a=>a.u);r.arts=r.arts.filter(a=>!a.start);for(let j=0;j<8;j++)if(r.chu[j]&&old.includes(r.chu[j].u))r.chu[j]=null;
  const og=TP_ORIGIN[r.origin];const mem=G.meta.tpMem,k=U('kytp');
  if(og!=null){const a=tpLearn(og,{src:'gia truyền'});if(r.origin==='tran')a.lines[0].v+=4;}
  else if(mem&&k){const t=k>=2?Math.min(mem.tier,2):Math.min(Math.max(0,mem.tier-1),1);tpLearn(t,{n:mem.n,el:mem.el,src:'ký ức kiếp trước'});}
  syncSkills();const s=S();r.hp=s.maxHp;r.mp=s.maxMp;return res;};}
// tạp hóa: còn chưa có tâm pháp thì luôn bày một bản chép tay rẻ
{const _se21=shopExtra;shopExtra=function(items,n){_se21(items,n);const r=G.run;if(!isPham()||hasTp())return;const a=genArt('tp',0,null,{req:0,el:'vo'});a.n='Dẫn Khí Quyết (chép tay)';a.lines[0]={fx:'tvP',v:4,n:'Tu luyện',d:'Tu vi nhận thêm {v}%'};a.lines.forEach(x=>x.req=0);
  items.unshift({k:'relic',rel:bookOf(a),p:price(15)});};}
// cao nhân, tự ngộ, lão nhân: kỳ ngộ riêng, không rơi vào vòng ngẫu nhiên
KYNGO.push(
 {id:'tp_ansi',sp:1,n:'Ẩn sĩ bên suối',t:'Bên con suối có túp lều tranh. Lão ẩn sĩ chân yếu đang loay hoay với đống củi ướt. Thấy ngươi, lão nheo mắt: “Hậu sinh, thân thể ngươi chưa có lấy một sợi linh khí.”',
  c:[{l:'Ở lại giúp lão ba tháng',cost:'3 tháng',go:()=>{const a=tpLearn(chance(.3)?1:0,{src:'ẩn sĩ truyền'});advanceTime(3*HM);return {t:'Ngươi bổ củi, gánh nước, sắc thuốc cho lão. Tối nào lão cũng đọc cho ngươi vài câu khẩu quyết. Ngày đi, lão chỉ nói: “Nhớ thở cho đúng.”',ch:[chip('⏳','3 tháng','Thời gian trôi qua',''),tpChip(a)].concat(applyE({karma:3}))};}},
     {l:'Đang vội, cáo từ',go:()=>({t:'Lão phẩy tay: “Duyên chưa tới thì thôi.”'})}]},
 {id:'tp_laonhan',sp:1,g:1,pop:'Một lão nhân đi ngang, dừng lại nhìn ngươi rất lâu rồi đọc cho ngươi một bài khẩu quyết.',n:'Lão nhân dưới gốc tùng',t:'Lão nhân áo vải ngồi dưới gốc tùng như đã chờ từ lâu: “Năm năm rồi mà ngươi vẫn chưa biết dẫn khí. Trời không tuyệt đường người. Ngồi xuống đây.”',
  c:[{l:'Ngồi xuống nghe giảng',go:()=>{const a=tpLearn(0,{n:'Dẫn Khí Quyết',src:'lão nhân truyền'});advanceTime(2*HD);return {t:'Lão giảng suốt hai ngày hai đêm, giọng đều như tiếng gió. Lúc ngươi mở mắt, gốc tùng chỉ còn lại một chiếc lá khô.',ch:[chip('⏳','2 ngày','Thời gian trôi qua',''),tpChip(a)]};}},
     {l:'Hỏi lão là ai',go:()=>{const a=tpLearn(0,{n:'Dẫn Khí Quyết',src:'lão nhân truyền'});return {t:'Lão cười: “Người qua đường.” Rồi đọc một mạch khẩu quyết. Ngươi nhớ được hết, như thể đã từng học ở đâu đó.',ch:[tpChip(a)]};}}]},
 {id:'tp_cothu',n:'Thạch thất cổ nhân',t:'Mưa lở một mảng vách núi, lộ ra thạch thất của cổ nhân. Trên bàn đá có một quyển sách lụa, chữ vẫn còn rõ.',
  c:[{l:'Cất quyển sách',go:()=>{const r=G.run;const b=gainBookTp(clamp(r.region+1+(chance(.3)?1:0),1,5));return {t:'Trang đầu ghi: “Người hữu duyên tự học.” Ngươi cẩn thận gói lại.',ch:[chip('📖',b.name,PHAM[b.tier]+'\n'+b.lore,'item')]};}}]}
);
{const _adv21=advanceTime;advanceTime=function(h){const o=_adv21(h);const r=G.run;if(!r||!r.pham||!(h>0))return o;if(hasTp()){r.tpAcc=0;return o;}
  r.tpAcc=(r.tpAcc||0)+h;const y=r.age-r.birthAge;const free=()=>!r.scene&&G.screen==='map';
  if(y>=TP_Y-0.5&&free()){kyStart(tpGuarPick());r.tpAcc=0;return o;}
  while(r.tpAcc>=HM&&G.run&&!hasTp()){r.tpAcc-=HM;
    if(S().ngo>=14&&chance(.03)){const a=tpLearn(0,{n:'Tĩnh Tọa Tự Ngộ Quyết',el:pick(r.root.els.filter(e=>EL[e]))||'vo',src:'tự ngộ'});tpPop(a,'Tự ngộ tâm pháp','Đêm ấy ngồi nhìn trăng, hơi thở bỗng theo một nhịp lạ. Ngươi tự ngộ ra cách dẫn khí.');break;}
    if(y>=1&&free()&&chance(.04+.03*y)){kyStart(KYNGO.find(x=>x.id==='tp_ansi'));break;}}
  if(G.run&&!hasTp()&&y>=TP_Y){const v=tpGuarPick();const a=tpGuarLearn(v);tpPop(a,v.n,v.pop);}
  return o;};}
function tpPop(a,title,text){note(text+' Có tâm pháp: '+a.n+'.','up');G.qpop=G.qpop||[];G.qpop.push({kind:'done',text:a.n,grade:a.tier+1,ch:[tpChip(a)],title});}

// ----- tình huống bảo đảm có tâm pháp: nhiều kiểu gặp gỡ, kiếp sau ưu tiên kiểu chưa gặp -----
// Mỗi tình huống: ai cũng truyền được tâm pháp, chỉ khác cái giá và cái được thêm tùy lựa chọn.
function tpGuarPick(){const M=G.meta;const all=KYNGO.filter(x=>x.g);const seen=M.tpSeen||(M.tpSeen=[]);let L=all.filter(x=>!seen.includes(x.id));if(!L.length){M.tpSeen=seen.slice(-2);L=all.filter(x=>!M.tpSeen.includes(x.id));}
  const v=pick(L);M.tpSeen.push(v.id);return v;}
function tpGuarLearn(v){const sp=v.tp||{n:['Dẫn Khí Quyết']};const r=G.run;const el=sp.el==='root'?(pick(r.root.els.filter(e=>EL[e]))||'vo'):sp.el;return tpLearn(0,{n:pick(sp.n),el,src:sp.src||'được truyền'});}
function tpGv(id,n,t,pop,tp,c){KYNGO.push({id,sp:1,g:1,n,t,pop,tp,c:c.map(o=>({l:o.l,cost:o.cost,need:o.need,go:()=>{const v=KYNGO.find(x=>x.id===id);const a=tpGuarLearn(v);let ch=[];
  if(o.h){advanceTime(o.h);ch.push(chip('⏳',durH(o.h),'Thời gian trôi qua',''));}if(!G.run)return {t:o.t};ch.push(tpChip(a));if(o.fx){const e=Object.assign({},typeof o.fx==='function'?o.fx():o.fx);if(e._st){ch.push(chip('💎',(e._st>0?'+':'')+e._st,'Linh thạch',e._st>0?'up':'dn'));delete e._st;}ch=ch.concat(applyE(e));}if(o.ll)llAdd(o.ll,'đường xa',1);return {t:o.t,ch};}}))});}
tpGv('tp_hoathuong','Hòa thượng hành cước','Một hòa thượng gầy gò, bình bát sứt mẻ, đứng chắn giữa đường. Ông chắp tay: “Thí chủ hít thở rối loạn như ngựa hoang. Để bần tăng chỉ cho một cách thở.”',
  'Một hòa thượng hành cước ghé xin nước, tiện tay chỉ cho ngươi cách điều hòa hơi thở.',{n:['Tĩnh Tâm Thiền Quyết','Bát Nhã Điều Tức Pháp','Thanh Tịnh Tọa Thiền Kinh'],el:'vo',src:'hòa thượng truyền'},
  [{l:'Theo sư phụ đi một đoạn đường',cost:'1 tháng',h:HM,fx:{karma:3,tamma:-6},t:'Suốt một tháng ngươi khất thực, ngủ miếu cùng ông. Tối nào ông cũng ngồi thiền, ngươi ngồi theo. Lúc chia tay, ông chỉ nói: “Tâm yên thì khí tự về.”'},
   {l:'Xin khẩu quyết rồi đi ngay',t:'Ông cười hiền, đọc chậm ba lần. Ngươi nhẩm theo tới khi thuộc làu.'}]);
tpGv('tp_ysu','Nữ y sư giữa làng dịch','Làng bên đường đang có dịch. Một nữ y sư áo xanh chạy đôn chạy đáo giữa các mái nhà. Nàng liếc ngươi: “Thân thể khỏe mạnh mà không có chút linh khí… Phụ ta một tay, ta dạy cho ngươi cách dưỡng khí.”',
  'Một nữ y sư đi ngang, bắt mạch cho ngươi rồi viết lên giấy một bài dưỡng khí quyết.',{n:['Thanh Mộc Dưỡng Sinh Quyết','Hồi Xuân Dưỡng Khí Thiên','Bách Thảo Điều Tức Pháp'],el:'moc',src:'y sư truyền'},
  [{l:'Ở lại phụ chữa bệnh',cost:'10 ngày',h:10*HD,fx:{karma:5},ll:4,t:'Mười ngày sắc thuốc, đun nước, khiêng người. Dịch lui, nàng giữ lời, đêm cuối ngồi dạy ngươi từng nhịp thở.'},
   {l:'Xin học ngay, ta còn đường xa',t:'Nàng thở dài, vẫn viết cho ngươi bài khẩu quyết: “Học được thì nhớ quay lại giúp người.”',fx:{karma:-1}}]);
tpGv('tp_xactu','Xác tu sĩ trong khe núi','Dưới khe núi có một xác người mặc đạo bào đã khô quắt, tay vẫn ôm chặt một quyển sách mỏng trước ngực.',
  'Ngươi tình cờ thấy xác một tu sĩ, trong ngực áo còn quyển tâm pháp nhập môn.',{n:['Huyền Môn Nhập Đạo Thiên','Dẫn Khí Sơ Giải','Vân Du Tâm Pháp'],el:'root',src:'di vật cổ nhân'},
  [{l:'Chôn cất tử tế rồi mới lấy sách',cost:'1 ngày',h:HD,fx:{karma:4,tamma:-2},t:'Ngươi đào huyệt, đắp mộ, cắm một cành cây làm bia. Lúc mở sách, trang đầu ghi: “Người chôn ta, sách này tặng ngươi.”'},
   {l:'Lấy sách, lục luôn túi áo',fx:()=>{const v=ri(2,5);G.run.st+=v;return {karma:-3,tamma:3,_st:v};},t:'Ngươi lấy sách, lại moi được mấy viên linh thạch. Đêm ấy nằm mơ thấy có người đứng nhìn ngươi rất lâu.'}]);
tpGv('tp_mong','Giấc mộng giữa đêm','Đêm ấy ngươi mơ thấy mình ngồi trên đỉnh núi mây. Một bóng người không rõ mặt ngồi đối diện, giọng như tiếng chuông xa: “Nghe cho kỹ, ta chỉ nói một lần.”',
  'Một đêm nằm mộng, có người không rõ mặt giảng cho ngươi một bài khẩu quyết. Tỉnh dậy vẫn nhớ từng chữ.',{n:['Mộng Trung Dẫn Khí Quyết','Vân Đỉnh Tâm Kinh','Thái Hư Mộng Đạo Thiên'],el:'root',src:'mộng truyền'},
  [{l:'Bật dậy chép lại ngay',t:'Ngươi thắp đèn, chép một mạch tới sáng. Đọc lại thấy câu nào cũng đúng.'},
   {l:'Nằm yên, cố mơ tiếp',cost:'3 ngày',h:3*HD,fx:{ngo:1,tamma:2},t:'Ba đêm liền ngươi mơ cùng một giấc mơ. Đêm thứ ba bóng người ấy gật đầu rồi tan đi. Đầu óc ngươi sáng hẳn ra, chỉ là đôi khi giật mình không biết đâu là mộng.'}]);
tpGv('tp_nguong','Ngư ông hát chèo','Bên sông, một ngư ông buông câu, miệng hát bài chèo nghe rất lạ: hít vào ba nhịp, thở ra chín nhịp, lời hát cứ xoáy vào tai ngươi.',
  'Một ngư ông bên sông hát đi hát lại một bài chèo. Nghe mãi ngươi mới biết lời hát là khẩu quyết dẫn khí.',{n:['Thủy Nguyệt Điều Tức Ca','Ngư Ca Dẫn Khí Quyết','Trường Giang Tâm Pháp'],el:'thuy',src:'ngư ông truyền'},
  [{l:'Ngồi câu cá cùng ông tới tối',cost:'nửa ngày',h:12,fx:{tamma:-4},t:'Tới khi mặt trời lặn, ngươi đã hát theo được cả bài. Ông thu cần: “Hát đúng nhịp thì khí tự theo.”'},
   {l:'Hỏi thẳng lời hát là gì',t:'Ông cười khà: “Hỏi thì ta hát chậm lại.” Hát chậm lại ba lần, ngươi nhớ hết.'}]);
tpGv('tp_tantu','Tán tu trọng thương','Bên vệ đường một tán tu mình đầy máu, thều thào: “Đưa ta qua núi… người của chúng đang đuổi… ta không có gì ngoài một quyển tâm pháp.”',
  'Ngươi băng bó cho một tán tu bị thương. Trước khi đi, hắn để lại một quyển tâm pháp nhập môn.',{n:['Liệt Hỏa Luyện Khí Quyết','Kim Cương Dẫn Khí Thiên','Phong Lôi Sơ Thức Pháp'],el:'root',src:'tán tu tặng'},
  [{l:'Cõng hắn qua núi',cost:'7 ngày',h:7*HD,fx:{karma:4},ll:6,t:'Bảy ngày băng rừng, hai lần suýt bị phát hiện. Qua được núi, hắn dúi quyển sách vào tay ngươi: “Ân này ta nhớ.”'},
   {l:'Băng bó rồi đi đường mình',t:'Hắn nhìn ngươi một lúc, rồi vẫn ném cho ngươi quyển sách: “Cầm lấy, ta sợ chết rồi không ai đọc.”'}]);
tpGv('tp_mieuhoang','Vách khắc trong miếu hoang','Mưa to, ngươi chui vào một ngôi miếu hoang trú tạm. Sau tượng thần đổ nát, trên vách đá có khắc chi chít chữ: một bài khẩu quyết dẫn khí.',
  'Trú mưa trong miếu hoang, ngươi đọc được bài khẩu quyết dẫn khí khắc sau tượng thần.',{n:['Hậu Thổ Thạch Bích Quyết','Cổ Miếu Dẫn Khí Văn','Thạch Khắc Tâm Kinh'],el:'tho',src:'vách khắc cổ'},
  [{l:'Thắp hương rồi mới đọc',fx:{karma:2},t:'Ngươi dọn sạch bàn thờ, thắp mấy nén hương cỏ. Đọc tới đâu thuộc tới đó.'},
   {l:'Đọc cả đêm cho thuộc',cost:'1 ngày',h:HD,fx:{ngo:1},t:'Ngươi đọc đi đọc lại tới sáng, còn ngộ ra mấy chỗ người khắc viết sai.'}]);
tpGv('tp_tre','Sách lót chuồng trâu','Đứa bé chăn trâu chìa ra một quyển sách cũ: “Người có bánh không? Đổi cái này. Nhà em lấy lót chuồng, mà chữ đẹp lắm.”',
  'Một đứa bé chăn trâu đổi cho ngươi quyển sách lót chuồng. Mở ra mới biết là một bài tâm pháp.',{n:['Dẫn Khí Quyết (bản cũ)','Mục Đồng Tâm Pháp','Thanh Ngưu Điều Tức Thiên'],el:'vo',src:'đổi được'},
  [{l:'Đổi bánh lấy sách',t:'Thằng bé cầm bánh chạy biến. Quyển sách hơi mùi trâu, nhưng chữ vẫn đọc được.'},
   {l:'Cho thêm ít tiền',need:()=>G.run.st>=1?'':'Không có linh thạch',fx:()=>{G.run.st=Math.max(0,G.run.st-1);return {karma:3,_st:-1};},t:'Ngươi dúi thêm cho nó một viên linh thạch. Nó tròn mắt, chạy về khoe cả làng.'}]);
tpGv('tp_kyuc','Ký ức chợt về','Đi ngang một khúc sông, ngươi bỗng đứng sững: cảnh này đã từng thấy. Trong đầu vang lên một bài khẩu quyết, như của ai đó, mà cũng như của chính mình.',
  'Một hôm đi ngang khúc sông quen lạ, trong đầu ngươi bỗng vang lên một bài khẩu quyết từ kiếp nào.',{n:['Túc Tuệ Dẫn Khí Quyết','Luân Hồi Tâm Ấn','Vong Xuyên Tàn Thiên'],el:'root',src:'ký ức kiếp trước'},
  [{l:'Nhắm mắt nhớ lại',t:'Từng câu hiện lên rõ dần. Ngươi không biết mình đã học nó ở đâu, chỉ biết là đúng.'},
   {l:'Ngồi bên sông cả ngày',cost:'1 ngày',h:HD,fx:{tam:1},t:'Ngươi ngồi tới khi trăng lên. Bài khẩu quyết đã thuộc, lòng cũng yên hẳn.'}]);

// ================= ĐỢT 22: ĐỒ KHỞI ĐẦU NGẪU NHIÊN, CÂU CHUYỆN MỞ ĐẦU KIẾP =================
// Không còn mặc định Hồi Xuân Đan và một công pháp. Mỗi kiếp có thể có 0 tới 2 món phổ thông (thường phàm phẩm,
// hiếm lắm mới hoàng phẩm), mỗi món kèm nguồn gốc để kể trong trang mở đầu.
const START_IT=[
 {w:4,k:'pill',id:'hoixuan',s:['Bà lang đầu làng thương tình cho một viên Hồi Xuân Đan, dặn chỉ dùng lúc nguy cấp.','Dưới đáy rương cũ của ông nội còn sót một viên Hồi Xuân Đan, gói kỹ trong giấy dầu.']},
 {w:2,k:'pill',id:'giaidoc',s:['Một người hái thuốc đi ngang xin bát nước, lúc đi để lại một viên Giải Độc Đan coi như trả ơn.']},
 {w:1,k:'pill',id:'tukhi',s:['Đổi được một viên Tụ Khí Đan của gã bán hàng rong, tới giờ vẫn chưa biết dùng vào việc gì.']},
 {w:3,k:'relic',s:['Món {n} treo trên vách nhà từ đời nào chẳng ai nhớ, nay thuộc về {ten}.','Sau trận lũ năm ấy, {ten} nhặt được {n} dưới bãi bồi, lau sạch bùn vẫn còn dùng được.','Người thợ già cuối làng trước lúc dọn đi để lại cho {ten} món {n}.']},
 {w:2,k:'book',s:['Ở chợ phiên mua được quyển {n} rách bìa, chữ mờ, giá bằng hai cái bánh bao.','Trong gác xép nhà kho có quyển {n} bị chuột gặm mất góc, {ten} đọc lén suốt mấy mùa đông.']},
 {w:2,k:'st',s:['Dành dụm mấy năm được {v} viên linh thạch vụn, khâu kín trong lót áo.']}];
function startItems(){const r=G.run;const out=[];const n=chance(.55)?(chance(.25)?2:1):0;
  for(let i=0;i<n;i++){const it=wpick(START_IT.filter(x=>!out.some(o=>o.it===x)),x=>x.w);if(!it)break;const o={it,s:pick(it.s)};
    if(it.k==='pill'){r.pills.push({id:it.id,q:0});o.n=PILL[it.id].n;}
    else if(it.k==='relic'){const x=genRelic(chance(.08)?1:0);r.relics.push(x);o.n=x.name;}
    else if(it.k==='book'){const b=bookOf(genArt('cp',chance(.08)?1:0));r.relics.push(b);o.n=b.art.n;}
    else {o.v=ri(1,3);r.st+=o.v;}
    out.push(o);}
  return out;}
// ----- câu chuyện: thơ ấu tới hiện tại, dựa trên xuất thân, mệnh cách, linh căn (chỉ gợi, không gọi tên), chỉ số nổi bật, đồ mang theo -----
const LS_OG={
 nong:['{ten} sinh ra trong một gian nhà tranh ven ruộng ở {que}. Tiếng khóc đầu đời lẫn trong tiếng ếch nhái mùa mưa.','Lên bảy đã theo cha ra đồng, chân lấm bùn từ sớm tới tối, chưa từng nghĩ tới chuyện gì xa hơn bờ ruộng.'],
 tran:['Họ {ho} ở {que} từng có tiếng về trận pháp. Tới đời cha {ten} thì chỉ còn lại một gian thư phòng ẩm mốc và mấy cuộn trận đồ rách.','Thuở nhỏ {ten} hay ngồi xếp sỏi thành hình. Cha nhìn thấy, không khen, chỉ lặng lẽ thở dài.'],
 dote:['Lò mổ nhà họ {ho} nằm ở đầu chợ {que}. {ten} lớn lên giữa mùi máu và tiếng dao chặt xương.','Mười tuổi đã tự tay cầm dao, mắt không chớp. Bạn cùng lứa thấy là tránh xa.'],
 thusinh:['{ten} là con nhà nghèo ở {que}. Cả nhà ăn cháo loãng để dành tiền cho một người đèn sách.','Ba lần lều chõng lên kinh, ba lần trượt. Lần cuối trở về, trong tay chỉ còn một bọc sách cũ.'],
 khat:['Không ai biết {ten} sinh ở đâu. Từ khi nhớ được, đã ngủ dưới mái hiên chợ {que}, giành ăn với chó hoang.','Bị đánh nhiều tới mức học được cách chạy nhanh hơn bất cứ ai.'],
 thegia:['{ten} là con thứ của {ho} gia ở {que}. Nhà cao cửa rộng, nhưng chẳng có chỗ nào thật sự là của mình.','Anh cả được mời thầy dạy võ dạy chữ, còn {ten} chỉ được đứng ngoài cửa nghe lỏm.'],
 mieu:['Một đêm đông, lão từ giữ miếu hoang ở {que} nghe tiếng trẻ khóc trước cửa. Trong chiếc giỏ tre là {ten}, quấn trong mảnh vải không thêu tên.','Lớn lên bên mõ gỗ và khói hương: sáng quét sân, tối ngồi nghe lão tụng kinh tới khi ngủ gật.'],
 ren:['Lò rèn nhà họ {ho} đỏ lửa quanh năm ở {que}. {ten} lớn lên trong tiếng búa nện lên đe.','Năm lên tám đã kéo bễ, tay chai sần, vai rộng hơn hẳn bạn cùng lứa.'],
 daodong:['Cha mẹ mất sớm, {ten} được gửi vào một đạo quán nhỏ trên núi gần {que}, làm đạo đồng quét sân.','Đạo trưởng già lẩm cẩm, nhưng sáng nào cũng bắt ngồi thẳng lưng mà thở, miệng đọc mấy câu pháp quyết.'],
 linh:['{ten} sinh ở {que}. Năm mười tuổi bị bắt lính, theo quân trấn thủ biên ải {quoc}.','Sáu năm chinh chiến, trở về với ba vết sẹo, mấy đồng bạc vụn và những giấc ngủ không bao giờ yên.'],
 buon:['Nhà họ {ho} buôn vải ở {que}, giàu chẳng bằng ai nhưng cũng chưa từng thiếu ăn.','{ten} biết tính toán trước khi biết chữ, mặc cả còn giỏi hơn cả cha.'],
 chai:['{ten} sinh ra trên một chiếc thuyền nan neo ở bến {que}.','Chưa biết đi đã biết bơi, theo cha quăng lưới từ khi còn chưa cao bằng mái chèo.'],
 duoc:['Mồ côi từ nhỏ, {ten} được một hiệu thuốc ở {que} nhận về làm dược đồng.','Ngày ngày phơi thuốc tán thuốc, thuộc lòng trăm vị thảo dược trước khi thuộc mặt chữ.'],
 mahuyet:['Đêm {ten} chào đời ở {que}, trời không trăng, chó cả làng sủa tới sáng.','Đôi mắt đỏ như máu khiến dân làng gọi là con quỷ. Trẻ con ném đá, người lớn quay mặt đi.'],
 hat:['{ten} sinh ra sau cánh gà của một gánh hát rong.','Theo gánh hát đi khắp {quoc}, hôm làm vua, mai làm ăn mày, sớm học được cách nhìn mặt người mà đoán lòng.']};
const LS_EL={kim:'mê tiếng chuông đồng, món đồ sắt nào cầm vào tay cũng không muốn buông',moc:'thích vào rừng nằm dưới gốc cây cả buổi, cây tự tay trồng cây nào cũng xanh tốt',
 thuy:'thích nước, mùa mưa đứng ngoài sân hứng mưa mãi không chán, xuống sông là bơi như cá',hoa:'không biết lạnh là gì, mùa đông vẫn đi chân trần, ngồi nhìn bếp lửa tới quên ăn',
 tho:'thích nặn đất thành người thành vật, đi đâu chân cũng vững như đóng cọc',loi:'không sợ sấm, đêm giông trẻ con trốn trong chăn, còn mình chạy ra hiên ngửa mặt nhìn trời',
 bang:'chịu lạnh giỏi, mùa đông lại khỏe hơn mùa hè, thích ngắm băng đóng trên mặt ao',phong:'thích trèo lên chỗ cao nhất làng đứng hứng gió, chạy nhanh tới mức người lớn đuổi không kịp'};
const LS_ELN={kim:'tiếng chuông',moc:'cây cỏ',thuy:'nước',hoa:'lửa',tho:'đất đá'};
const LS_TR={kiemtam:'Có lần nhặt được một thanh kiếm gãy, {ten} giữ khư khư, đêm ngủ cũng ôm bên mình.',thanluc:'Mười tuổi đã vác nổi bao thóc của người lớn, sức như trâu non.',
 menhcung:'Mấy lần ốm thập tử nhất sinh, thầy lang đã lắc đầu, vậy mà lần nào cũng gượng dậy được.',chithuy:'Tính trầm lặng, chuyện lớn chuyện nhỏ đều không làm mặt mày đổi sắc.',
 linhnhan:'Đôi mắt sáng lạ thường, nhìn đâu cũng thấy những thứ người khác bỏ qua.',luoi:'Miệng lưỡi lanh lợi, nói ngọt tới mức bà bán bánh đầu chợ lần nào cũng cho thêm một cái.',
 yeuhuyet:'Vết thương trên người lành nhanh lạ thường, sáng trầy da, tối đã kín miệng.',thiendo:'Sáng dạ hơn người nhưng thân thể ốm yếu. Thầy tướng xem qua chỉ nói một câu: “Trời ghen.”',
 phuctinh:'Số may lạ: rơi xuống giếng cũng có người đi ngang, lạc trong rừng cũng tìm được đường về.',hoalinh:'Có lần bếp bén lửa, {ten} xông vào bê nồi ra, tay không hề bỏng.',
 bangco:'Da trắng như ngọc mà rắn như đá, ngã đâu cũng chẳng gãy xương.',truongtho:'Bà đỡ xem chỉ tay, cười bảo: “Đứa này sống dai lắm.”',
 bachdoc:'Mấy lần ăn nhầm nấm độc, người khác nằm liệt giường, {ten} chỉ đau bụng một đêm.',ngodao:'Thứ gì học cũng nhanh, như thể trước đây đã từng biết.',
 khotu:'Tính lì, việc gì đã làm là làm tới cùng, ngồi một chỗ cả ngày không biết chán.',sattinh:'Trong mắt có một luồng sát khí, chó dữ trong làng gặp cũng cụp đuôi.',
 mongdu:'Đêm nào cũng mơ thấy những tòa lầu trên mây. Tỉnh dậy kể lại, chẳng ai tin.',huyenco:'Đôi khi ngồi yên lại thấy trong người có gì đó chảy như suối nhỏ. Hỏi ai cũng không ai biết.'};
const LS_TPG={thegia:'Ngày rời nhà, mẹ dúi vào tay {ten} một quyển sách mỏng bọc vải: {n}, tâm pháp truyền đời của {ho} gia, vốn chẳng bao giờ tới lượt con thứ.',
 tran:'Trước lúc mất, cha để lại quyển {n}, dặn: “Trận pháp không học cũng được, cái này thì phải học.”',daodong:'Mấy câu đạo trưởng bắt đọc mỗi sáng, hóa ra là {n}, một bài tâm pháp nhập môn.',
 mieu:'Lão từ trước khi viên tịch truyền lại {n}, bảo đó là thứ duy nhất lão mang theo từ thuở còn trẻ.'};
function lifeStory(r,items,region){const og=ORIGIN.find(o=>o.id===r.origin);const s=S();const w=r.ten.split(' ');const h2=w.length>2&&NAME.ho2.includes(w[0]+' '+w[1]);const ho=h2?w.slice(0,2).join(' '):w[0],ten2=w.slice(h2?2:1).join(' ')||r.ten;
  const v={ten:r.ten,ho,que:r.que,quoc:G.meta.world.quoc};const f=t=>lsFill(t,v);const L=[];
  const O=LS_OG[r.origin]||[og.bio];L.push(f(O[0]));v.ten=ten2;
  // linh căn: chỉ gợi qua sở thích thuở nhỏ
  const els=r.root.els.filter(e=>LS_EL[e]);
  if(els.length>=4)L.push(f('Thứ gì {ten} cũng thích một chút: '+els.map(e=>LS_ELN[e]).filter(Boolean).join(', ')+'… mà chẳng thứ gì thật sự gắn bó lâu.'));
  else if(els.length===1)L.push(f('Từ bé {ten} đã '+LS_EL[els[0]]+', như thể trời sinh ra đã thuộc về thứ ấy.'));
  else if(els.length)L.push(f('Từ bé {ten} đã '+LS_EL[els[0]]+'; lại '+LS_EL[els[1]]+'.'));
  if(O[1])L.push(f(O[1]));
  if(LS_TR[r.trait])L.push(f(LS_TR[r.trait]));
  // chỉ số nổi bật
  const tr=TRAIT.find(t=>t.id===r.trait)||{};const fx=Object.assign({},og.fx||{});for(const k in tr.fx||{})if(typeof tr.fx[k]==='number')fx[k]=(fx[k]||0)+tr.fx[k];
  const body=(fx.atkP||0)+(fx.hpP||0)+(fx.defP||0)/2;const ngo=s.ngo,tam=s.tam,van=s.van,tp=s.tp;const P=[];
  if(ngo<=9&&body>=10)P.push('Đọc sách thì ngủ gật, chữ vào tai này ra tai kia; nhưng sức lực dồi dào, khí huyết cuồn cuộn, một mình gánh nổi việc của hai người.');
  else if(ngo>=13&&body<0)P.push('Đọc sách một lần là thuộc, câu khó hiểu mấy cũng nghĩ ra; chỉ là thân thể mảnh khảnh, đi đường xa đã thở dốc.');
  else if(ngo>=13)P.push('Sách vở đọc một lần là nhớ, thầy đồ trong làng từng nói đứa trẻ này nên đi thi.');
  else if(ngo<=8)P.push('Đọc sách thì ngủ gật, thầy đồ dạy mười câu nhớ được một.');
  else if(body>=10)P.push('Thân thể cường tráng, khí huyết sung mãn, ít khi ốm đau.');
  if(tam>=12)P.push('Lòng dạ vững vàng, chuyện gì đã quyết thì khó ai lay chuyển được.');else if(tam<=7)P.push('Tính khí nóng nảy, gặp chuyện bất bình là máu nóng dồn lên mặt.');
  if(P.length<2&&van>=7)P.push('Vận khí cũng tốt, đi chợ nhặt được tiền, đi rừng gặp nấm quý.');else if(P.length<2&&tp>=9)P.push('Chân tay nhanh nhẹn, trèo cây leo núi chẳng ai theo kịp.');
  for(const x of P.slice(0,2))L.push(f(x));
  // đồ mang theo và nguồn gốc
  for(const a of arts()){if(a.type==='tp'){if(a.src==='gia truyền'&&LS_TPG[r.origin])L.push(lsFill(LS_TPG[r.origin],Object.assign({n:a.n},v)));else if(a.src==='ký ức kiếp trước')L.push(f('Có những đêm trong mơ vang lên một bài khẩu quyết. Tỉnh dậy vẫn nhớ từng chữ: '+a.n+'. Chẳng ai dạy, như thể mang theo từ kiếp trước.'));}
    else if(a.type==='cp'){const sk=(r.skills||[]).find(k=>a.lines.some(x=>x.sk===k.id));const src=sk&&sk.src;
      if(src==='xuat')L.push(f('Đạo trưởng còn dạy thêm môn '+a.n+' để phòng thân, bảo: “Trên núi nhiều thú dữ.”'));else if(src==='ky')L.push(f('Đôi khi tay chân tự múa thành chiêu, như đã luyện từ kiếp nào: '+a.n+'.'));}}
  if(r.origin==='thegia')L.push(f('Lão quản gia thương tình, lén cho thêm một túi linh thạch và một viên Hồi Xuân Đan.'));
  if(r.origin==='duoc')L.push(f('Ông chủ hiệu thuốc cho mang theo một viên Hồi Xuân Đan và một viên Giải Độc Đan, coi như tiền công mấy năm.'));
  if(r.origin==='buon')L.push(f('Lúc {ten} đi, cha đưa cho một túi linh thạch, dặn tiêu cho khéo.'));
  if(r.origin==='khat')L.push(f('Ngày rời {que}, trong túi không có lấy một đồng.'));
  for(const o of items)L.push(lsFill(o.s,Object.assign({n:o.n,v:o.v},v)));
  // hiện tại
  L.push(f('Năm nay {ten} '+Math.floor(r.age)+' tuổi.'+(region?' '+region.replace(/\b[Nn]gươi\b/g,ten2):'')));
  L.push(f(tuArt()?'Trong tay có một bài tâm pháp và đôi chân của mình. Đường tu còn dài, chẳng ai biết sẽ đi tới đâu.':'{ten} vẫn là phàm nhân, chưa biết cách dẫn một sợi linh khí vào thân. Nhưng đường thì vẫn ở trước mặt.'));
  return L;}
{const _nr22=newRun;newRun=function(c){const res=_nr22(c);const r=G.run;if(!r)return res;const items=startItems();
  const reg=r.scene&&r.scene.type==='region'?r.scene.text:'';if(r.scene&&r.scene.type==='region')r.scene=null;
  r.story=lifeStory(r,items,reg);syncSkills();saveSoon();return res;};}
function lsFill(t,v){return String(t).replace(/\{(\w+)\}/g,(m,k)=>v[k]!=null?v[k]:m);}

// ================= ĐỢT 23: ĐỘT PHÁ =================
// Bỏ giới hạn cảnh giới theo phẩm tâm pháp: phẩm tâm pháp chỉ ảnh hưởng tốc độ tu luyện và tỉ lệ đột phá.
tuCapWhy=function(){return '';};
// Tu vi đầy mà lịch luyện chưa đầy: bình cảnh. Cả hai đầy: đột phá (kể cả phàm nhân dẫn khí nhập thể, không còn tự động).
function btState(){const r=G.run;if(!r||r.tv<100)return '';return canBreak()?'dp':'bc';}
{const _bt23=btTarget;btTarget=function(){return isPham()?0:_bt23();};}
{const _bs23=btStages;btStages=function(to){return isPham()?[]:_bs23(to);};}
{const _bi23=btItems;btItems=function(){return isPham()?G.run.pills.map((p,i)=>({p,i})).filter(x=>PILL[x.p.id].bt&&PILL[x.p.id].realm==null):_bi23();};}
// Tỉ lệ thành công: cộng từ nhiều nguồn, mỗi nguồn hiện riêng trong màn chuẩn bị
const BT_ROOT={thien:6,bien:4,song:2,tam:0,tu:-3,tap:-6},BT_LK=[-6,-2,2,6];
function btParts(slots){const r=G.run,s=S();const e=btEff(slots||[]);const to=btTarget();const n=nodeById(r.at);const L=[];const add=(t,v,tip)=>{v=Math.round(v*10)/10;if(v)L.push({t,v,tip});};
  add(isPham()?'Dẫn khí nhập thể':'Cơ bản · '+REALM[to],(isPham()?0.75:BT_BASE[Math.min(4,r.realm)])*100,'Cảnh giới càng cao càng khó');
  add('Ngộ tính',(s.ngo-10)*1.2,'Mỗi điểm trên 10: +1,2%');add('Đạo tâm',(s.tam-10)*1.2,'Mỗi điểm trên 10: +1,2%');
  if(r.tamma)add('Tâm ma',-r.tamma*0.4,'Mỗi điểm tâm ma: −0,4%');
  add('Linh căn',BT_ROOT[r.root.id]||0,rootView(r.root).n);
  const a=tuArt();if(a){const d=a.tier-Math.max(0,to);add('Tâm pháp '+PHAM[a.tier],d<0?d*6:Math.min(d,3)*3,d<0?'Phẩm tâm pháp thấp so với cảnh giới muốn lên':'Tâm pháp vững, dẫn khí xung quan dễ hơn');
    if(a.el!=='vo')add(r.root.els.includes(a.el)?'Tâm pháp hợp linh căn':'Tâm pháp lệch linh căn',r.root.els.includes(a.el)?4:-4,'Hệ tâm pháp '+(EL[a.el]||EL.vo).n);}
  const cps=(isPham()?[]:activeArts()).filter(x=>x.type==='cp'&&x.el!=='vo');const bad=cps.filter(x=>!r.root.els.includes(x.el)).length;
  if(cps.length)add(bad?'Công pháp lệch linh căn ('+bad+')':'Công pháp hợp linh căn',bad?-Math.min(6,bad*2):3,'Công pháp đang vận hành trong Khí Hải so với linh căn');
  add('Linh khí: '+LK_N[lkOf(n)],BT_LK[lkOf(n)],'Linh khí nơi đột phá');
  if(llOf()>100)add('Lịch luyện dư',Math.min(10,(llOf()-100)*0.2),'Lịch luyện vượt mức: tối đa +10%');
  if(r.btFail)add('Thất bại trước '+r.btFail+' lần',r.btFail*8,'Rút kinh nghiệm từ lần trước');
  const w=wounds().filter(x=>!x.perm).length;if(w)add('Đang mang thương',-5*w,'Mỗi vết thương: −5%');
  if(r.hp<S().maxHp*0.5)add('Khí huyết dưới một nửa',-5,'');
  if(e.rate)add('Đan dược, linh vật',e.rate,'Vật phẩm đặt vào ô chuẩn bị');
  return L;}
btRate=function(slots){return clamp(btParts(slots).reduce((a,x)=>a+x.v,0)/100,0.05,0.97);};
// Đạo cơ (phẩm chất cảnh giới): ngoài đạo cơ tích lũy và linh dược, lúc đột phá còn cộng thêm
function daoParts(){const r=G.run;if(isPham())return [];const to=btTarget();const L=[];const a=tuArt();const n=nodeById(r.at);
  if(a&&a.tier>=to+1)L.push({t:'Tâm pháp '+PHAM[a.tier]+' vượt cảnh giới',v:a.tier>=to+2?2:1});
  if(['thien','bien'].includes(r.root.id))L.push({t:rootView(r.root).n,v:1});
  if(lkOf(n)>=3)L.push({t:'Linh khí dồi dào',v:1});
  if(llOf()>=130)L.push({t:'Lịch luyện dư dả',v:1});
  if(!r.tamma)L.push({t:'Tâm không vướng ma',v:1});
  return L;}
{const _be23=btEff;btEff=function(slots){const o=_be23(slots);o.dao+=daoParts().reduce((a,x)=>a+x.v,0);return o;};}
// phàm nhân: đột phá thành dẫn khí nhập thể, không có thiên kiếp, không có phẩm chất
{const _ps23=prepStart;prepStart=function(){const r=G.run,sc=r&&r.scene;if(!isPham())return _ps23();if(!sc||sc.type!=='prep'||!canBreak())return;
  const p=btRate(sc.slots);const idx=sc.slots.slice().sort((a,b)=>b-a);const used=idx.map(i=>r.pills[i]).filter(Boolean).map(x=>PILL[x.id].n);for(const i of idx)r.pills.splice(i,1);sc.slots=[];
  advanceTime(7*HD);if(!G.run)return;const back=sc.back;r.bt={to:0,stages:[],si:0,used};
  if(R()<p){r.bt=null;phamUp();r.scene={type:'btres',back,ok:true,done:1,text:'Theo nhịp thở, một sợi linh khí mảnh như tơ len vào kinh mạch, chảy xuống đan điền rồi cuộn lại ở đó. Thân thể nhẹ bẫng, tai nghe rõ tiếng lá rơi ngoài trăm bước. Từ hôm nay, không còn là phàm nhân nữa.',
    chips:used.map(n=>chip('⚗️',n,'Đã dùng','')).concat([chip('☯️','Luyện Khí tầng 1','Dẫn khí nhập thể, bước vào Luyện Khí tầng 1','up')])};}
  else btFail(back,used);};}
// phàm nhân dẫn khí nhập thể ở đâu cũng được, không cần động phủ
{const _pa23=placeAct;placeAct=function(a){const r=G.run,sc=r&&r.scene;if(a==='bt'&&isPham()&&canBreak()&&sc&&sc.type==='place'){openPrep(nodeById(sc.id));return;}return _pa23(a);};}

// ================= ĐỢT 24: CÁC LOẠI THIÊN KIẾP =================
// Cảnh giới quyết định có bao nhiêu kiếp; loại kiếp tùy nhân vật (linh căn, nhân quả). Các kiếp tới lần lượt, từng trận một.
//  Trúc Cơ: không có · Kết Đan: tâm ma · Nguyên Anh: kiếp riêng 6 đạo · Hóa Thần: kiếp riêng 9 đạo rồi tâm ma
//  Phi thăng: Tam Tai (Âm Hỏa, Bị Phong) rồi Cửu Trùng Lôi Kiếp (9 đợt, mỗi đợt 4 đạo, đợt sau mạnh hơn đợt trước).
// Mỗi loại thử một mặt khác nhau:
//  Thiên Lôi: sát thương thuần · Tử Tiêu Thần Lôi (linh căn Lôi): mạnh hơn 10%
//  Ngũ Hành Thần Lôi (tạp linh căn): mỗi đạo mang một hành, kèm ngẫu nhiên hiệu ứng của các kiếp khác
//  Âm Hỏa: đốt khí huyết từng lượt · Nghiệp Hỏa (nhân quả ác nặng): đốt mạnh hơn, mỗi đạo thêm tâm ma
//  Bị Phong: gió cắt rút thể lực, khó thủ thế đỡ đòn · Âm Hàn: rút linh lực
const KIEP={loi:{n:'Thiên Lôi Kiếp',u:'Đạo lôi',i:'🌩️',el:'loi',d:'Sấm sét thuần túy, chỉ đỡ được, không né được.'},
 tutieu:{n:'Tử Tiêu Thần Lôi Kiếp',u:'Đạo tử lôi',i:'🌩️',el:'loi',m:1.1,d:'Lôi tím của người mang linh căn Lôi: mạnh hơn lôi thường 10%.'},
 nguhanh:{n:'Ngũ Hành Thần Lôi Kiếp',u:'Đạo ngũ hành lôi',i:'🌈',el:'loi',m:0.92,d:'Mỗi đạo mang một hành, kèm ngẫu nhiên lửa đốt, gió cắt hoặc hàn khí.'},
 hoa:{n:'Âm Hỏa Kiếp',u:'Luồng âm hỏa',i:'🔥',el:'hoa',m:0.75,d:'Lửa bốc từ lòng bàn chân, sát thương nhẹ hơn nhưng thiêu đốt khí huyết từng lượt.'},
 nghiep:{n:'Nghiệp Hỏa Kiếp',u:'Luồng nghiệp hỏa',i:'🔥',el:'hoa',m:0.75,d:'Lửa của sát nghiệp: thiêu đốt dữ dội, mỗi đạo thêm tâm ma.'},
 phong:{n:'Bị Phong Kiếp',u:'Cơn cương phong',i:'🌪️',el:'phong',m:0.97,d:'Gió cắt thổi từ thóp đầu, rút thể lực, khó thủ thế đỡ đòn.'},
 am:{n:'Âm Hàn Kiếp',u:'Luồng âm hàn',i:'❄️',el:'bang',m:0.97,d:'Hàn khí thấu xương, rút linh lực.'},
 cuu:{n:'Cửu Trùng Lôi Kiếp',u:'Đạo lôi',i:'⚡',el:'loi',d:'Chín đợt lôi kiếp, đợt sau mạnh hơn đợt trước. Giữa các đợt hồi lại được một hơi.'}};
const KIEP_EL={kim:'hoa',moc:'phong',thuy:'am',hoa:'am',tho:'loi',bang:'hoa',phong:'phong',loi:'tutieu'};
function kiepKind(){const r=G.run;if((r.karma||0)<=-30)return 'nghiep';if(r.root.els.includes('loi'))return 'tutieu';if(r.root.els.length>=5)return 'nguhanh';return KIEP_EL[r.root.els[0]]||'loi';}
btStages=function(to){if(isPham())return [];const k=kiepKind();
  return to===1?[]:to===2?['tamma']:to===3?[{n:6,kind:k}]:to===4?[{n:9,kind:k},'tamma']:[{n:6,kind:'hoa'},{n:6,kind:'phong'},{n:4,waves:9,kind:'cuu'}];};
function stageName(x){if(x==='tamma')return 'Tâm ma kiếp';const K=KIEP[x.kind||'loi'];return K.n+' · '+(x.waves>1?x.waves+' đợt × '+x.n+' đạo':x.n+' đạo');}
btNextStage=function(){const r=G.run;const b=r.bt;if(!b)return;const st=b.stages[b.si];
  if(st==='tamma'){startCombat({k:'tamma'},{kind:'bt'});r.scene.noFlee=1;clog(r.scene,'Tâm ma kiếp: bóng tối trong lòng ngươi đứng dậy.','en');return;}
  const n=Math.max(1,st.n-(b.kiepCut||0));startCombat({kiep:{n,waves:st.waves||1,block:b.kiepHp,kind:st.kind||'loi'}},{kind:'bt'});};
{const _sc24=startCombat;startCombat=function(spec,after){const res=_sc24(spec,after);const sc=G.run&&G.run.scene;
  if(spec&&spec.kiep&&sc&&sc.kiep){const kd=spec.kiep.kind||'loi';const K=KIEP[kd];sc.kiep.kind=kd;sc.en.n=K.n;sc.en.i=K.i;sc.en.el=K.el;const u=sc.units.find(x=>x.kind==='kiep');if(u){u.icon=K.i;u.el=K.el;u.kk=kd;u.name=K.n;}
    sc.log=sc.log.filter(x=>!/^Mây kiếp vần vũ/.test(x.t));clog(sc,K.n+': '+K.d+' '+capS(numVi(sc.kiep.n))+' '+K.u.toLowerCase()+(sc.kiep.waves>1?', chia làm '+numVi(sc.kiep.waves)+' đợt,':'')+' sắp giáng xuống.','en');}
  return res;};}
{const _kh24=kiepHit;kiepHit=function(sc,k,off){const K=sc.kiep;const kd=K&&K.kind||'loi';const me=mainUnit(sc);const KD=KIEP[kd];
  let m=KD.m||1;if(kd==='cuu')m*=1.1+0.12*(K.wave-1);K.uy*=m;const n0=sc.log.length;_kh24(sc,k,off);
  const last=sc.log[sc.log.length-1];if(last&&sc.log.length>n0&&KD.u!=='Đạo lôi')last.t=last.t.replace(/^Đạo lôi/,KD.u);
  if(me.hp<=0)return;let fx=kd;if(kd==='nguhanh'){const e=pick(['kim','moc','thuy','hoa','tho']);fx=pick(['hoa','phong','am',null]);if(last)last.t=last.t.replace(KD.u,KD.u+' hệ '+EL[e].n);}
  if(fx==='hoa'||fx==='nghiep'){const b=Math.round(me.max*(fx==='nghiep'?0.036:0.028));me.st.burn=(me.st.burn||0)+b;clog(sc,'Lửa bám vào người: mỗi lượt thiêu thêm.','en');if(fx==='nghiep'){G.run.tamma=Math.min(100,(G.run.tamma||0)+2);}}
  if(fx==='phong'){me.tl=Math.max(0,(me.tl||0)-35);clog(sc,'Cương phong cắt da, thể lực tụt mạnh.','en');}
  if(fx==='am'){const v=Math.round(me.maxMp*0.25);me.mp=Math.max(0,me.mp-v);if(v)clog(sc,'Hàn khí đông cứng kinh mạch, linh lực bị rút mất một mảng.','en');}};}

// ================= ĐỢT 25: TIÊN THIÊN KHÍ VẬN, TIÊN THIÊN THỂ CHẤT =================
// ----- dữ liệu chép từ khanfaun/Thienmenh (physiques.ts, effects.ts) -----
const TT_PHYS=[] = [
    // === RANK 6: CHÍ TÔN (Supreme) ===
    {
        id: 'hon_don_the',
        name: 'Hỗn Độn Đạo Thể',
        rank: 6,
        description: 'Vạn cổ đệ nhất thể chất. Dung nạp vạn vật, chuyển hóa ngũ hành, phá vỡ mọi quy tắc. Cần có đại cơ duyên "Hỗn Nguyên Đạo" để dung hợp ngũ hành tạp loạn thành hỗn độn chi lực.',
        effects: {
            primaryStatChangePercent: { maxHp: 20, maxSpiritPower: 20, maxStamina: 20, maxMentalState: 15, lifespan: 15 },
            attributeChangePercent: { physicalStrength: 20, magicPower: 20, physicalBody: 20, agility: 15, spiritualSense: 20, aptitude: 20, critChance: 10, critDamage: 20, damageReduction: 10, armorPen: 10, evasion: 10, critResist: 10 },
            expPerTurn: 20
        }
    },
    {
        id: 'hoang_co_thanh_the',
        name: 'Hoang Cổ Thánh Thể',
        rank: 6,
        description: 'Thể chất cái thế của Nhân tộc, nhục thân vô địch, máu huyết vàng ròng. Khắc chế mọi tà ma ngoại đạo, vạn pháp bất xâm. Yêu cầu tâm tính quang minh chính đại.',
        effects: {
            primaryStatChangePercent: { maxHp: 25, maxStamina: 20 },
            attributeChangePercent: { physicalBody: 25, physicalStrength: 20, critDamage: 15, damageReduction: 15, critResist: 15 },
            expPerTurn: 5 // Tốn tài nguyên
        }
    },
    {
        id: 'tien_thien_dao_thai',
        name: 'Tiên Thiên Đạo Thai',
        rank: 6,
        description: 'Con cưng của đại đạo, sinh ra đã hòa hợp với thiên địa. Ngộ tính nghịch thiên, tu luyện pháp thuật như uống nước. Tâm cảnh luôn ở trạng thái "Minh Kính Chỉ Thủy".',
        effects: {
            primaryStatChangePercent: { maxSpiritPower: 25, maxMentalState: 20 },
            attributeChangePercent: { magicPower: 20, spiritualSense: 25, aptitude: 25, msRegen: 15, mpRegen: 15 },
            expPerTurn: 25
        }
    },
    {
        id: 'van_co_ma_the',
        name: 'Vạn Cổ Ma Thể',
        rank: 6,
        description: 'Thể chất cấm kỵ của Ma Đạo. Lấy oán khí làm thức ăn, lấy sát lục làm đường tu. Tâm tính vặn vẹo, tàn nhẫn nhưng sức mạnh hủy thiên diệt địa.',
        effects: {
            attributeChangePercent: { physicalStrength: 25, magicPower: 15, critChance: 15, critDamage: 30, physicalBody: -10, lifeSteal: 10, armorPen: 10 },
            primaryStatChangePercent: { maxMentalState: -15 }
        }
    },
    {
        id: 'cuu_khieu_linh_lung',
        name: 'Cửu Khiếu Linh Lung Thể',
        rank: 6,
        description: 'Trái tim có chín lỗ, thấu hiểu vạn vật, nhìn thấu hồng trần. Trí tuệ siêu phàm, có khả năng suy diễn thiên cơ.',
        effects: {
            attributeChangePercent: { spiritualSense: 30, accuracy: 15, aptitude: 25 },
            primaryStatChangePercent: { maxMentalState: 25 }
        }
    },

    // === RANK 5: CỰC PHẨM (Legendary) ===
    {
        id: 'thuong_thien_ba_the',
        name: 'Thương Thiên Bá Thể',
        rank: 5,
        description: 'Bá đạo vô song, lấy chiến nuôi chiến. Tính cách cuồng ngạo, không chịu khuất phục.',
        effects: {
            attributeChangePercent: { physicalStrength: 12, physicalBody: 12, critChance: 8, armorPen: 8, damageReduction: 5 },
            primaryStatChangePercent: { maxHp: 15 }
        }
    },
    {
        id: 'thai_duong_the',
        name: 'Thái Dương Thần Thể',
        rank: 5,
        description: 'Chí dương chí cương, như mặt trời ban trưa. Yêu cầu Hỏa linh căn cực thịnh và tâm tính hướng dương.',
        effects: {
            attributeChangePercent: { magicPower: 12, physicalStrength: 8, dmgFire: 15, resFire: 15 },
            primaryStatChangePercent: { maxSpiritPower: 15 }
        }
    },
    {
        id: 'thai_am_the',
        name: 'Thái Âm Ngọc Thể',
        rank: 5,
        description: 'Chí âm chí hàn, như trăng lạnh lẽo. Yêu cầu Thủy linh căn cực thịnh và tâm tính lãnh đạm.',
        effects: {
            attributeChangePercent: { magicPower: 12, spiritualSense: 10, dmgWater: 15, resWater: 15 },
            primaryStatChangePercent: { maxSpiritPower: 15 }
        }
    },
    {
        id: 'thien_yeu_the',
        name: 'Thiên Yêu Hoàng Thể',
        rank: 5,
        description: 'Thể chất của Yêu tộc hoàng giả. Tốc độ và sức mạnh kinh người, thường xuất hiện ở người có tính cách hoang dã.',
        effects: {
            attributeChangePercent: { agility: 12, physicalBody: 10, attackSpeed: 10, evasion: 10, hpRegen: 10 },
            primaryStatChangePercent: { maxHp: 15, maxStamina: 15 }
        }
    },
    {
        id: 'loi_dinh_chien_the',
        name: 'Lôi Đình Chiến Thể',
        rank: 5,
        description: 'Thân thể như lôi điện, bộc phát sức mạnh hủy diệt trong nháy mắt. Cần có dị linh căn Lôi.',
        effects: {
            attributeChangePercent: { physicalStrength: 12, magicPower: 8, critDamage: 15, attackSpeed: 10, dmgLightning: 15, resLightning: 15 }
        }
    },
    {
        id: 'hu_khong_chi_the',
        name: 'Hư Không Chi Thể',
        rank: 5,
        description: 'Hòa mình vào hư không, xuất quỷ nhập thần. Cần tâm tính tự do, không bị trói buộc.',
        effects: {
            attributeChangePercent: { agility: 15, spiritualSense: 10, evasion: 15 },
            primaryStatChangePercent: { maxStamina: -8 }
        }
    },
    {
        id: 'duoc_linh_thanh_the',
        name: 'Dược Linh Thánh Thể',
        rank: 5,
        description: 'Cơ thể là lò luyện đan sống, bách độc bất xâm, hấp thu đan dược không để lại tạp chất.',
        effects: {
            primaryStatChangePercent: { maxHp: 15, lifespan: 15 },
            attributeChangePercent: { physicalBody: 10, hpRegen: 15, resWood: 15 },
            expPerTurn: 10
        }
    },

    // === RANK 4: THƯỢNG PHẨM (Epic) ===
    {
        id: 'ngu_hanh_linh_the',
        name: 'Ngũ Hành Linh Thể',
        rank: 4,
        description: 'Ngũ hành cân bằng, sinh sinh bất tức. Tuy không bá đạo nhưng đường tu vững chắc.',
        effects: {
            attributeChangePercent: { aptitude: 8, magicPower: 6 },
            expPerTurn: 10
        }
    },
    {
        id: 'vo_cau_kiem_the',
        name: 'Vô Cấu Kiếm Thể',
        rank: 4,
        description: 'Trời sinh kiếm cốt, tâm như kiếm sắc. Sát thương kiếm pháp tăng mạnh.',
        effects: {
            attributeChangePercent: { physicalStrength: 8, critDamage: 8, attackSpeed: 5, armorPen: 6 }
        }
    },
    {
        id: 'huyet_sat_ma_the',
        name: 'Huyết Sát Ma Thể',
        rank: 4,
        description: 'Thích giết chóc, lấy máu nuôi thân. Càng giết nhiều sát khí càng nặng.',
        effects: {
            attributeChangePercent: { physicalStrength: 6, critChance: 5, lifeSteal: 5 },
            primaryStatChangePercent: { maxMentalState: -5 } // Dễ tẩu hỏa
        }
    },
    {
        id: 'bang_co_ngoc_cot',
        name: 'Băng Cơ Ngọc Cốt',
        rank: 4,
        description: 'Da như băng tuyết, xương như ngọc. Kháng hàn, tăng cường thần thức.',
        effects: {
            attributeChangePercent: { physicalBody: 6, spiritualSense: 8, resIce: 10, dmgIce: 8 }
        }
    },
    {
        id: 'tat_phong_linh_the',
        name: 'Tật Phong Linh Thể',
        rank: 4,
        description: 'Thân nhẹ như gió, đi lại vô hình. Tốc độ là sở trường tuyệt đối.',
        effects: {
            attributeChangePercent: { agility: 10, attackSpeed: 5, evasion: 5, dmgWind: 8 }
        }
    },
    {
        id: 'cuu_duong_chi_the',
        name: 'Cửu Dương Chi Thể',
        rank: 4,
        description: 'Dương khí dồi dào, khắc chế âm tà, tu luyện hỏa pháp cực nhanh.',
        effects: {
            attributeChangePercent: { magicPower: 8, physicalStrength: 5, dmgFire: 8, resFire: 8 }
        }
    },
    {
        id: 'huyen_am_chi_the',
        name: 'Huyền Âm Chi Thể',
        rank: 4,
        description: 'Âm khí cực thịnh, thích hợp làm lô đỉnh hoặc tu luyện mị thuật, âm công.',
        effects: {
            attributeChangePercent: { magicPower: 8, spiritualSense: 5, dmgWater: 8, resWater: 8 }
        }
    },

    // === RANK 3: TRUNG PHẨM (Rare) ===
    {
        id: 'kim_cuong_bat_hoai',
        name: 'Kim Cương Bất Hoại',
        rank: 3,
        description: 'Thân thể cứng như kim cương, đao thương bất nhập ở mức độ nhất định.',
        effects: { attributeChangePercent: { physicalBody: 5, damageReduction: 4, counterDamage: 4 } }
    },
    {
        id: 'moc_linh_chi_the',
        name: 'Mộc Linh Chi Thể',
        rank: 3,
        description: 'Thân thiện với cây cỏ, hồi phục sinh lực nhanh.',
        effects: { primaryStatChangePercent: { maxHp: 5 }, attributeChangePercent: { physicalBody: 4 } }
    },
    {
        id: 'am_sat_the',
        name: 'Ám Sát Thể',
        rank: 3,
        description: 'Thích hợp đi trong bóng tối, giỏi che giấu khí tức.',
        effects: { attributeChangePercent: { agility: 5, critChance: 4 } }
    },
    {
        id: 'cuong_chien_the',
        name: 'Cuồng Chiến Thể',
        rank: 3,
        description: 'Càng đánh càng hăng, máu càng ít đánh càng đau. Tính cách nóng nảy.',
        effects: { attributeChangePercent: { physicalStrength: 5, physicalBody: 4 } }
    },
    {
        id: 'tho_linh_the',
        name: 'Thổ Linh Chi Thể',
        rank: 3,
        description: 'Sức chịu đựng cao, chân đạp đất thì sức mạnh vô cùng.',
        effects: { primaryStatChangePercent: { maxStamina: 5 }, attributeChangePercent: { physicalBody: 5 } }
    },
    {
        id: 'thuy_linh_the',
        name: 'Thủy Linh Chi Thể',
        rank: 3,
        description: 'Linh lực dẻo dai, bền bỉ, thiên về công pháp hệ Thủy.',
        effects: { primaryStatChangePercent: { maxSpiritPower: 5 }, attributeChangePercent: { magicPower: 4 } }
    },
    {
        id: 'hoa_linh_the',
        name: 'Hỏa Linh Chi Thể',
        rank: 3,
        description: 'Sức công phá mạnh, thiên về công pháp hệ Hỏa.',
        effects: { attributeChangePercent: { magicPower: 5, critChance: 3 } }
    },
    {
        id: 'kim_linh_the',
        name: 'Kim Linh Chi Thể',
        rank: 3,
        description: 'Thân thể cứng cáp, thiên về công pháp hệ Kim.',
        effects: { attributeChangePercent: { physicalStrength: 4, physicalBody: 4 } }
    },

    // === RANK 2: HẠ PHẨM (Uncommon) ===
    {
        id: 'man_luc_the',
        name: 'Man Hoang Lực Thể',
        rank: 2,
        description: 'Sức mạnh cơ bắp hơn người thường một chút.',
        effects: { attributeChangePercent: { physicalStrength: 3 } }
    },
    {
        id: 'thong_tue_the',
        name: 'Thông Tuệ Thể',
        rank: 2,
        description: 'Đầu óc linh hoạt, học tập nhanh hơn.',
        effects: { attributeChangePercent: { aptitude: 3 } }
    },
    {
        id: 'kien_nhan_the',
        name: 'Kiên Nhan Thể',
        rank: 2,
        description: 'Sức chịu đựng dẻo dai, không dễ bỏ cuộc.',
        effects: { primaryStatChangePercent: { maxStamina: 3, maxMentalState: 3 } }
    },
    {
        id: 'linh_cam_the',
        name: 'Linh Cảm Thể',
        rank: 2,
        description: 'Giác quan nhạy bén hơn người thường.',
        effects: { attributeChangePercent: { spiritualSense: 3 } }
    },
    {
        id: 'truong_tho_the',
        name: 'Trường Thọ Thể',
        rank: 2,
        description: 'Sống lâu hơn người thường, ít bệnh tật.',
        effects: { primaryStatChangePercent: { lifespan: 3, maxHp: 3 } }
    },

    // === RANK 1: PHÀM PHẨM (Common) ===
    {
        id: 'pham_the',
        name: 'Phàm Thể',
        rank: 1,
        description: 'Thân thể người thường, cân bằng, không có gì đặc sắc.',
        effects: {
            attributeChangePercent: { physicalStrength: 1, magicPower: 1, physicalBody: 1, agility: 1, spiritualSense: 1, aptitude: 1 }
        }
    }
];
const TT_DEST={
    // --- RANK 1 (White) ---
    'than_the_khoe_manh': { id: 'than_the_khoe_manh', name: 'Thân Thể Khỏe Mạnh', description: 'Bẩm sinh khỏe mạnh hơn người thường.', rank: 1, cost: 10, effects: { primaryStatChangePercent: { maxHp: 2 }, attributeChangePercent: { physicalBody: 1 } } },
    'tinh_than_minh_man': { id: 'tinh_than_minh_man', name: 'Tinh Thần Minh Mẫn', description: 'Đầu óc lanh lợi, thần hồn sáng suốt.', rank: 1, cost: 10, effects: { primaryStatChangePercent: { maxMentalState: 2 }, attributeChangePercent: { spiritualSense: 1 } } },
    'khi_luc_doi_dao': { id: 'khi_luc_doi_dao', name: 'Khí Lực Dồi Dào', description: 'Thể lực bẩm sinh tốt.', rank: 1, cost: 10, effects: { primaryStatChangePercent: { maxStamina: 2 }, attributeChangePercent: { agility: 1 } } },
    'gia_canh_kha_gia': { id: 'gia_canh_kha_gia', name: 'Gia Cảnh Khá Giả', description: 'Xuất thân từ gia đình giàu có.', rank: 1, cost: 10 },
    'ke_ngoc': { id: 'ke_ngoc', name: 'Kẻ Ngốc', description: 'Tư chất kém nhưng bù lại thân thể tráng kiện.', rank: 1, cost: 10, effects: { attributeChangePercent: { aptitude: -1, physicalBody: 2 } } },
    'yeu_menh': { id: 'yeu_menh', name: 'Yểu Mệnh', description: 'Sinh ra đã yếu ớt, tuổi thọ ngắn ngủi nhưng ngộ tính khá cao.', rank: 1, cost: 10, effects: { primaryStatChangePercent: { lifespan: -5, maxHp: -2 }, attributeChangePercent: { aptitude: 2 } } },
    'mu_mau': { id: 'mu_mau', name: 'Mù Màu', description: 'Khó phân biệt màu sắc, nhưng tai rất thính.', rank: 1, cost: 10, effects: { attributeChangePercent: { spiritualSense: -1, accuracy: 2 } } },
    'tay_chan_long_ngong': { id: 'tay_chan_long_ngong', name: 'Tay Chân Lóng Ngóng', description: 'Vụng về, thân pháp kém.', rank: 1, cost: 10, effects: { attributeChangePercent: { agility: -1 } } },
    'so_do_cao': { id: 'so_do_cao', name: 'Sợ Độ Cao', description: 'Không dám bay cao, ảnh hưởng tâm cảnh khi phi hành.', rank: 1, cost: 10, effects: { primaryStatChangePercent: { maxMentalState: -2 } } },
    'ngu_hanh_khuyet_moc': { id: 'ngu_hanh_khuyet_moc', name: 'Ngũ Hành Khuyết Mộc', description: 'Thiên sinh không thể cảm nhận Mộc khí.', rank: 1, cost: 10, effects: { nguHanhBonus: { moc: -1 } } },
    'vo_can': { id: 'vo_can', name: 'Vô Căn', description: 'Không có linh căn, con đường tu tiên vô cùng gian nan.', rank: 1, cost: 10, effects: { attributeChangePercent: { aptitude: -3, magicPower: -3 } } },
    // NEW ALIGNMENT DESTINIES (Rank 1)
    'thien_luong_chi_nhan': { id: 'thien_luong_chi_nhan', name: 'Thiện Lương Chi Nhân', description: 'Bản tính hiền lành, ít khi làm điều ác.', rank: 1, cost: 10, effects: { amDuongBonus: { chinh: 5 } } },
    'tieu_nhan_bi_oi': { id: 'tieu_nhan_bi_oi', name: 'Tiểu Nhân Bỉ Ổi', description: 'Lòng dạ hẹp hòi, hay tính toán chi li.', rank: 1, cost: 10, effects: { amDuongBonus: { ta: 5 } } },

    // --- RANK 2 (Green) ---
    'sat_phat_qua_duyet': { id: 'sat_phat_qua_duyet', name: 'Sát Phạt Quả Quyết', description: 'Ra tay tàn nhẫn, có duyên với sát đạo.', rank: 2, cost: 20, effects: { attributeChangePercent: { physicalStrength: 3, critChance: 1 } } },
    'linh_khi_than_hoa': { id: 'linh_khi_than_hoa', name: 'Linh Khí Thân Hòa', description: 'Thân thể dễ dàng tương thích và hấp thụ linh khí.', rank: 2, cost: 20, effects: { primaryStatChangePercent: { maxSpiritPower: 3 }, attributeChangePercent: { magicPower: 2 } } },
    'thien_co_thong_minh': { id: 'thien_co_thong_minh', name: 'Thiên Tư Thông Minh', description: 'Tư chất hơn người, học nhanh.', rank: 2, cost: 20, expPerTurn: 1, effects: { attributeChangePercent: { aptitude: 3 } } },
    'da_day_hon_sat': { id: 'da_day_hon_sat', name: 'Da Dày Hơn Sắt', description: 'Thân thể cứng cáp.', rank: 2, cost: 20, effects: { attributeChangePercent: { physicalBody: 3 } } },
    'benh_tat_quan_than': { id: 'benh_tat_quan_than', name: 'Bệnh Tật Quấn Thân', description: 'Thân thể yếu đuối nhưng thần hồn mạnh mẽ.', rank: 2, cost: 20, effects: { primaryStatChangePercent: { maxHp: -3 }, attributeChangePercent: { spiritualSense: 3, magicPower: 2 } } },
    'duyen_voi_nuoc': { id: 'duyen_voi_nuoc', name: 'Duyên Với Nước', description: 'Thích nước, bơi lội giỏi.', rank: 2, cost: 20, effects: { nguHanhBonus: { thuy: 1 } } },
    'thich_lua': { id: 'thich_lua', name: 'Thích Lửa', description: 'Không sợ nóng, thích nghịch lửa.', rank: 2, cost: 20, effects: { nguHanhBonus: { hoa: 1 } } },
    'yeu_cay_co': { id: 'yeu_cay_co', name: 'Yêu Cây Cỏ', description: 'Mát tay trồng trọt.', rank: 2, cost: 20, effects: { nguHanhBonus: { moc: 1 } } },
    'cung_dau': { id: 'cung_dau', name: 'Cứng Đầu', description: 'Tính tình cố chấp, vững như đá.', rank: 2, cost: 20, effects: { nguHanhBonus: { tho: 1 }, attributeChangePercent: { physicalBody: 2 } } },
    'sac_ben': { id: 'sac_ben', name: 'Sắc Bén', description: 'Khí chất sắc bén như kim loại.', rank: 2, cost: 20, effects: { nguHanhBonus: { kim: 1 }, attributeChangePercent: { physicalStrength: 2 } } },
    'thu_sinh': { id: 'thu_sinh', name: 'Thư Sinh', description: 'Dáng vẻ nho nhã, tinh thần tốt nhưng yếu ớt.', rank: 2, cost: 20, effects: { attributeChangePercent: { spiritualSense: 3, physicalStrength: -2 } } },
    // NEW ALIGNMENT DESTINIES (Rank 2)
    'hanh_hiep_truong_nghia': { id: 'hanh_hiep_truong_nghia', name: 'Hành Hiệp Trượng Nghĩa', description: 'Thấy chuyện bất bình chẳng tha, khí khái hào hùng.', rank: 2, cost: 20, effects: { amDuongBonus: { chinh: 10 }, attributeChangePercent: { physicalStrength: 2 } } },
    'tu_loi_vi_ban': { id: 'tu_loi_vi_ban', name: 'Tư Lợi Vi Bản', description: 'Luôn đặt lợi ích bản thân lên trên hết.', rank: 2, cost: 20, effects: { amDuongBonus: { ta: 10 }, attributeChangePercent: { aptitude: 2 } } },

    // --- RANK 3 (Blue) ---
    'thien_ly_nhan': { id: 'thien_ly_nhan', name: 'Thiên Lý Nhãn', description: 'Tầm nhìn xa, thần thức mạnh mẽ.', rank: 3, cost: 30, effects: { attributeChangePercent: { spiritualSense: 5 } } },
    'phong_hanh_giả': { id: 'phong_hanh_giả', name: 'Phong Hành Giả', description: 'Thân nhẹ như yến, tốc độ hơn người.', rank: 3, cost: 30, effects: { attributeChangePercent: { agility: 5, attackSpeed: 2 } } },
    'dai_khi_van': { id: 'dai_khi_van', name: 'Đại Khí Vận', description: 'Khí vận hơn người, thường gặp may mắn.', rank: 3, cost: 30, effects: { attributeChangePercent: { critChance: 4 } } },
    'van_du_thien_ha': { id: 'van_du_thien_ha', name: 'Vân Du Thiên Hạ', description: 'Thích ngao du sơn thủy, thân pháp tốt.', rank: 3, cost: 30, effects: { attributeChangePercent: { agility: 4, spiritualSense: 2 } } },
    'cuu_duong': { id: 'cuu_duong', name: 'Cửu Dương', description: 'Thân thể phụ thuộc Hỏa, tăng khả năng Hỏa linh khí.', rank: 3, cost: 30, effects: { nguHanhBonus: { hoa: 2 } } },
    'nhuoc_thuy': { id: 'nhuoc_thuy', name: 'Nhược Thủy', description: 'Thân thể phụ thuộc Thủy, tăng khả năng Thủy linh khí.', rank: 3, cost: 30, effects: { nguHanhBonus: { thuy: 2 } } },
    'at_moc': { id: 'at_moc', name: 'Ất Mộc', description: 'Thân thể phụ thuộc Mộc, tăng khả năng Mộc linh khí.', rank: 3, cost: 30, effects: { nguHanhBonus: { moc: 2 } } },
    'canh_kim': { id: 'canh_kim', name: 'Canh Kim', description: 'Thân thể phụ thuộc Kim, tăng khả năng Kim linh khí.', rank: 3, cost: 30, effects: { nguHanhBonus: { kim: 2 } } },
    'hau_tho': { id: 'hau_tho', name: 'Hậu Thổ', description: 'Thân thể phụ thuộc Thổ, tăng khả năng Thổ linh khí.', rank: 3, cost: 30, effects: { nguHanhBonus: { tho: 2 } } },
    'vo_si': { id: 'vo_si', name: 'Võ Sĩ', description: 'Quen với việc rèn luyện thân thể.', rank: 3, cost: 30, effects: { attributeChangePercent: { physicalStrength: 4, agility: 2 } } },
    'kiem_phach': { id: 'kiem_phach', name: 'Kiếm Phách', description: 'Có thiên phú với kiếm đạo.', rank: 3, cost: 30, effects: { nguHanhBonus: { kim: 2 }, attributeChangePercent: { physicalStrength: 5 } } },
    'duoc_dong': { id: 'duoc_dong', name: 'Dược Đồng', description: 'Có khiếu làm luyện đan sư.', rank: 3, cost: 30, effects: { nguHanhBonus: { moc: 1, hoa: 1 }, attributeChangePercent: { spiritualSense: 4 } } },
    'mi_cot': { id: 'mi_cot', name: 'Mị Cốt', description: 'Trời sinh quyến rũ, dễ dàng thu phục lòng người.', rank: 3, cost: 30, effects: { attributeChangePercent: { spiritualSense: 5 } } },
    // NEW ALIGNMENT DESTINIES (Rank 3)
    'tam_nhu_chi_thuy': { id: 'tam_nhu_chi_thuy', name: 'Tâm Như Chỉ Thủy', description: 'Lòng lặng như nước, không bị ngoại vật quấy nhiễu.', rank: 3, cost: 30, effects: { amDuongBonus: { chinh: 15 }, primaryStatChangePercent: { maxMentalState: 5 } } },
    'tam_ma_xam_thuc': { id: 'tam_ma_xam_thuc', name: 'Tâm Ma Xâm Thực', description: 'Dễ bị cảm xúc tiêu cực chi phối, nhưng sức mạnh tinh thần bùng nổ.', rank: 3, cost: 30, effects: { amDuongBonus: { ta: 20 }, attributeChangePercent: { spiritualSense: 5 }, primaryStatChangePercent: { maxMentalState: -4 } } },

    // --- RANK 4 (Purple) ---
    'dai_tri_nhuoc_ngu': { id: 'dai_tri_nhuoc_ngu', name: 'Đại Trí Nhược Ngu', description: 'Bề ngoài khờ khạo nhưng ngộ tính kinh người.', rank: 4, cost: 40, expPerTurn: 2, effects: { attributeChangePercent: { aptitude: 8 } } },
    'cuong_vong_tu_dai': { id: 'cuong_vong_tu_dai', name: 'Cuồng Vọng Tự Đại', description: 'Kiêu ngạo, tấn công mạnh nhưng nhục thân yếu.', rank: 4, cost: 40, effects: { attributeChangePercent: { physicalStrength: 8, critDamage: 10, physicalBody: -5 } } },
    'dao_ma_chuyen_the': { id: 'dao_ma_chuyen_the', name: 'Đạo Ma Chuyển Thế', description: 'Sở hữu tiềm năng của cả Đạo và Ma.', rank: 4, cost: 40, effects: { attributeChangePercent: { physicalStrength: 6, magicPower: 6, physicalBody: 6 } } },
    'hon_nguyen_dao': { id: 'hon_nguyen_dao', name: 'Hỗn Nguyên Đạo', description: 'Dung nạp ngũ hành, ép phẩm chất lên Cực Linh Căn.', rank: 4, cost: 40, effects: { nguHanhBonus: { all: 2 } } },
    'chinh_khi_lam_nhiet': { id: 'chinh_khi_lam_nhiet', name: 'Chính Khí Lẫm Liệt', description: 'Một lòng hướng đạo, tà ma bất xâm.', rank: 4, cost: 40, effects: { amDuongBonus: { chinh: 20 }, attributeChangePercent: { physicalBody: 8 } } },
    'ma_tinh_tham_tang': { id: 'ma_tinh_tham_tang', name: 'Ma Tính Thâm Tàng', description: 'Ngoài mặt bình thường nhưng tâm địa thâm sâu.', rank: 4, cost: 40, effects: { amDuongBonus: { ta: 20 }, attributeChangePercent: { critChance: 5, spiritualSense: 5 } } },
    'quy_nhan': { id: 'quy_nhan', name: 'Quỷ Nhãn', description: 'Đôi mắt nhìn thấu âm dương.', rank: 4, cost: 40, effects: { attributeChangePercent: { spiritualSense: 8 }, amDuongBonus: { ta: 10 } } },
    'phat_tu': { id: 'phat_tu', name: 'Phật Tử', description: 'Có duyên với Phật pháp.', rank: 4, cost: 40, effects: { amDuongBonus: { chinh: 20 }, primaryStatChangePercent: { maxMentalState: 10 } } },
    'huyet_ma': { id: 'huyet_ma', name: 'Huyết Ma', description: 'Thích máu tanh, thiên hướng tà đạo.', rank: 4, cost: 40, effects: { amDuongBonus: { ta: 20 }, attributeChangePercent: { physicalStrength: 8 } } },
    // NEW ALIGNMENT DESTINIES (Rank 4)
    'diet_ma_chi_tam': { id: 'diet_ma_chi_tam', name: 'Diệt Ma Chi Tâm', description: 'Thề diệt hết ma quái trong thiên hạ, chấp niệm quá sâu.', rank: 4, cost: 40, effects: { amDuongBonus: { chinh: 30, ta: -10 }, attributeChangePercent: { attackSpeed: 5 } } },
    'nhan_qua_dao': { id: 'nhan_qua_dao', name: 'Nhân Quả Đạo', description: 'Hiểu thấu nhân quả, thiện ác song hành.', rank: 4, cost: 40, effects: { amDuongBonus: { chinh: 20, ta: 20 }, attributeChangePercent: { spiritualSense: 10 } } },

    // --- RANK 5 (Orange) ---
    'son_ha_xa_tac': { id: 'son_ha_xa_tac', name: 'Sơn Hà Xã Tắc', description: 'Thân thể bền bỉ như đất, sức sống như cây.', rank: 5, cost: 50, effects: { primaryStatChangePercent: { maxHp: 12 }, attributeChangePercent: { physicalBody: 10 }, nguHanhBonus: { tho: 1, moc: 1 } } },
    'kiem_khi_truong_giang': { id: 'kiem_khi_truong_giang', name: 'Kiếm Khí Trường Giang', description: 'Kiếm khí như nước chảy.', rank: 5, cost: 50, effects: { attributeChangePercent: { physicalStrength: 10, magicPower: 10 }, nguHanhBonus: { kim: 1, thuy: 1 } } },
    'thuong_long_at_moc': { id: 'thuong_long_at_moc', name: 'Thương Long Ất Mộc', description: 'Sinh sôi nảy nở, hồi phục mạnh mẽ.', rank: 5, cost: 50, effects: { primaryStatChangePercent: { maxSpiritPower: 12, maxStamina: 12 }, attributeChangePercent: { spiritualSense: 8, hpRegen: 5, spRegen: 5 }, nguHanhBonus: { thuy: 1, moc: 1 } } },
    'chu_tuoc_phan_thien': { id: 'chu_tuoc_phan_thien', name: 'Chu Tước Phần Thiên', description: 'Lửa bùng cháy, bạo phát mạnh mẽ.', rank: 5, cost: 50, effects: { attributeChangePercent: { magicPower: 12, critChance: 8, dmgFire: 10 }, nguHanhBonus: { moc: 1, hoa: 1 } } },
    'dia_tam_hoa_lien': { id: 'dia_tam_hoa_lien', name: 'Địa Tâm Hỏa Liên', description: 'Sức chịu đựng và phản kích.', rank: 5, cost: 50, effects: { attributeChangePercent: { physicalBody: 12, counterDamage: 8 }, nguHanhBonus: { hoa: 1, tho: 1 } } },
    'tuyet_vuc_bang_tam': { id: 'tuyet_vuc_bang_tam', name: 'Tuyết Vực Băng Tâm', description: 'Tâm lặng như băng, kháng hiệu ứng.', rank: 5, cost: 50, effects: { primaryStatChangePercent: { maxMentalState: 15 }, attributeChangePercent: { spiritualSense: 10, critResist: 10 }, nguHanhBonus: { thuy: 1, kim: 1 } } },
    'phuong_hoang_niet_ban': { id: 'phuong_hoang_niet_ban', name: 'Phượng Hoàng Niết Bàn', description: 'Tuổi thọ cao, thiên phú hỏa pháp.', rank: 5, cost: 50, effects: { primaryStatChangePercent: { lifespan: 15 }, attributeChangePercent: { magicPower: 10, agility: 8, attackSpeed: 5, hpRegen: 10 }, nguHanhBonus: { hoa: 2 } } },
    'loi_dinh_ba': { id: 'loi_dinh_ba', name: 'Lôi Đình Bá', description: 'Thân thể chứa lôi đình. Tự động kích hoạt Lôi Linh Căn.', rank: 5, cost: 50, effects: { attributeChangePercent: { physicalStrength: 12, critDamage: 15, dmgLightning: 10 } } },
    'bang_tam_ngoc_cot': { id: 'bang_tam_ngoc_cot', name: 'Băng Tâm Ngọc Cốt', description: 'Cốt tủy băng giá. Tự động kích hoạt Băng Linh Căn.', rank: 5, cost: 50, effects: { attributeChangePercent: { magicPower: 10, physicalBody: 10, resIce: 10 } } },
    'huyen_anh_phong_than': { id: 'huyen_anh_phong_than', name: 'Huyễn Ảnh Phong Thân', description: 'Thân như gió. Tự động kích hoạt Phong Linh Căn.', rank: 5, cost: 50, effects: { attributeChangePercent: { agility: 12, attackSpeed: 8, evasion: 8 } } },
    'bang_phach': { id: 'bang_phach', name: 'Băng Phách', description: 'Linh hồn lạnh giá, ép linh căn thành Băng dị chủng.', rank: 5, cost: 50, effects: { attributeChangePercent: { magicPower: 12, dmgIce: 10 } } },
    'phong_than': { id: 'phong_than', name: 'Phong Thần', description: 'Con của gió, ép linh căn thành Phong dị chủng.', rank: 5, cost: 50, effects: { attributeChangePercent: { agility: 12, dmgWind: 10 } } },
    'thien_sat_co_tinh': { id: 'thien_sat_co_tinh', name: 'Thiên Sát Cô Tinh', description: 'Số phận cô độc, khắc người thân nhưng sức mạnh vượt trội.', rank: 5, cost: 50, effects: { attributeChangePercent: { physicalStrength: 15, physicalBody: -8, critChance: 10, armorPen: 10 }, primaryStatChangePercent: { lifespan: 10 } } },
    // NEW ALIGNMENT DESTINIES (Rank 5)
    'hao_nhien_chinh_khi': { id: 'hao_nhien_chinh_khi', name: 'Hạo Nhiên Chính Khí', description: 'Chính khí ngút trời, tà ma tránh xa.', rank: 5, cost: 50, effects: { amDuongBonus: { chinh: 50, ta: -20 }, attributeChangePercent: { physicalBody: 12, spiritualSense: 10, critResist: 10 } } },
    'vo_tinh_sat_dao': { id: 'vo_tinh_sat_dao', name: 'Vô Tình Sát Đạo', description: 'Diệt tuyệt thất tình lục dục, chỉ còn sát đạo.', rank: 5, cost: 50, effects: { amDuongBonus: { ta: 50, chinh: -20 }, attributeChangePercent: { critDamage: 20, physicalStrength: 12, armorPen: 10 } } },
    'ta_than_nghich_tu': { id: 'ta_than_nghich_tu', name: 'Tà Thần Nghịch Tử', description: 'Kẻ phản nghịch, chà đạp luân thường đạo lý.', rank: 5, cost: 50, effects: { amDuongBonus: { ta: 40, chinh: -40 }, attributeChangePercent: { magicPower: 15, lifeSteal: 10 } } },

    // --- RANK 6 (Red) ---
    'thien_menh_chi_tu': { id: 'thien_menh_chi_tu', name: 'Thiên Mệnh Chi Tử', description: 'Kẻ được thiên mệnh ưu ái, tư chất toàn diện.', rank: 6, cost: 80, expPerTurn: 3, effects: { attributeChangePercent: { physicalStrength: 20, magicPower: 20, physicalBody: 20, agility: 15, spiritualSense: 20, aptitude: 20, attackSpeed: 10, damageReduction: 10, armorPen: 10 }, nguHanhBonus: { all: 3 } } },
    'ngu_hanh_hop_nhat': { id: 'ngu_hanh_hop_nhat', name: 'Ngũ Hành Hợp Nhất', description: 'Ngũ hành tương sinh, ép phẩm chất thành Cực Linh Căn.', rank: 6, cost: 60, effects: { nguHanhBonus: { all: 2 }, attributeChangePercent: { magicPower: 25, aptitude: 25 } } },
    'loi_than_giang_the': { id: 'loi_than_giang_the', name: 'Lôi Thần Giáng Thế', description: 'Hóa thân của sấm sét, ép linh căn thành Lôi dị chủng cực phẩm.', rank: 6, cost: 70, effects: { attributeChangePercent: { physicalStrength: 25, critDamage: 30, attackSpeed: 15, dmgLightning: 20 } } },
    'van_khi_nghich_thien': { id: 'van_khi_nghich_thien', name: 'Vận Khí Nghịch Thiên', description: 'May mắn đến mức nghịch thiên, đi đường cũng nhặt được bảo vật.', rank: 6, cost: 80, effects: { attributeChangePercent: { critChance: 15, evasion: 15 } } },
    'nguoi_xuyen_viet': { id: 'nguoi_xuyen_viet', name: 'Người Xuyên Việt', description: 'Linh hồn đến từ thế giới khác, tâm trí kiên định, kiến thức rộng mở.', rank: 6, cost: 60, effects: { primaryStatChangePercent: { maxMentalState: 30 }, attributeChangePercent: { aptitude: 25, spiritualSense: 25 } } },
    // NEW ALIGNMENT DESTINIES (Rank 6)
    'thien_ma_hang_the': { id: 'thien_ma_hang_the', name: 'Thiên Ma Hàng Thế', description: 'Ma chủ tái sinh, vạn ma thần phục.', rank: 6, cost: 80, effects: { amDuongBonus: { ta: 80, chinh: -50 }, attributeChangePercent: { magicPower: 25, spiritualSense: 20, lifeSteal: 15, armorPen: 15 } } },
};
// Khí vận tiên thiên: mỗi kiếp rút 1–3 cái lúc đầu thai, phẩm càng cao càng hiếm.
// Khí vận có hành (Cửu Dương, Nhược Thủy, Canh Kim…) kéo linh căn về hành đó; một số ép linh căn thành biến dị (Lôi, Băng, Phong)
// hoặc Cực linh căn (đủ ngũ hành, tương sinh); Ngũ Hành Khuyết Mộc thì không cảm được Mộc khí.
// Thể chất tiên thiên: suy ra từ linh căn (tỉ lệ hành), khí vận, nhân quả (chính tà) và tính tình (theo xuất thân, mệnh cách), lấy tối đa ba cái phẩm cao nhất,
// không khớp gì thì là Phàm Thể. Tất cả đều cộng vào chỉ số.
delete TT_DEST.vo_can; // không có linh căn thì không tu được: bỏ
const TT_RW=[0,40,28,17,9,4.5,1.5];
const TT_RANK=['','Phàm','Lương','Hiếm','Quý','Cực hiếm','Nghịch thiên'],TT_COL=['','#8d8672','#4f8a4a','#4a6fae','#7b56a8','#c97a2b','#b8302a'];
function ttRoll(){const n=wpick([1,2,3],x=>[40,45,15][x-1]);const L=[];const all=Object.values(TT_DEST);
  for(let i=0;i<n;i++){const rk=wpick([1,2,3,4,5,6],x=>TT_RW[x]);const pool=all.filter(d=>d.rank===rk&&!L.includes(d.id));if(pool.length)L.push(pick(pool).id);}return L;}
const TT_FORCE={loi_dinh_ba:'loi',loi_than_giang_the:'loi',bang_tam_ngoc_cot:'bang',bang_phach:'bang',huyen_anh_phong_than:'phong',phong_than:'phong'};
ROOT.push({id:'cuc',n:'Cực linh căn',m:1.5,w:0,k:5,d:'Đủ ngũ hành, tương sinh không khắc. Hiếm tới mức chỉ khí vận nghịch thiên mới ép ra được.'});
function ttShape(root,ids){const els=root.els.slice();let id=root.id;
  for(const k of ids){if(TT_FORCE[k])return {id:'bien',els:[TT_FORCE[k]]};}
  if(ids.some(k=>k==='hon_nguyen_dao'||k==='ngu_hanh_hop_nhat'))return {id:'cuc',els:NGUHANH.slice()};
  if(id==='bien')return root;
  for(const k of ids){const nb=(TT_DEST[k].effects||{}).nguHanhBonus;if(!nb)continue;
    for(const [e,v] of Object.entries(nb)){if(e==='all'||v<=0||els.includes(e))continue;if(v>=2||chance(.5)){const out=els.filter(x=>!ids.some(q=>((TT_DEST[q].effects||{}).nguHanhBonus||{})[x]>0));if(out.length)els[els.indexOf(pick(out))]=e;}}}
  if(ids.includes('ngu_hanh_khuyet_moc')&&els.includes('moc')){if(els.length>=5){els.splice(els.indexOf('moc'),1);id='tu';}else{const o=NGUHANH.filter(x=>!els.includes(x));els[els.indexOf('moc')]=pick(o);}}
  return {id,els};}
{const _gb25=genBirth;genBirth=function(){_gb25();for(const c of G.birth.cards){c.kv=ttRoll(c.root&&c.root.els);c.root=ttShape(c.root,c.kv);
  for(const k of c.kv){const a=(TT_DEST[k].effects||{}).amDuongBonus;if(a)c.karmaAdj=(c.karmaAdj||0)+Math.round(((a.chinh||0)-(a.ta||0))/2);}}};}
// tính tình theo xuất thân và mệnh cách (Thienmenh xét thể chất theo tính tình)
const TT_TRAITS={dote:['Tàn nhẫn'],mahuyet:['Cuồng tà','Căm thù'],khat:['Tự do'],linh:['Hiếu chiến'],mieu:['Nhân hậu'],thusinh:['Thận trọng'],buon:['Thực dụng'],hat:['Quái gở'],thegia:['Bảo thủ'],tran:['Thông tuệ'],daodong:['Thận trọng'],nong:['Chính trực'],ren:['Chính trực'],chai:['Tự do'],duoc:['Nhân hậu'],
 sattinh:['Sát phạt','Hiếu chiến'],chithuy:['Lạnh lùng'],linhnhan:['Thông tuệ'],thiendo:['Thông tuệ'],luoi:['Thực dụng'],thanluc:['Hiếu chiến'],bangco:['Lạnh lùng'],kiemtam:['Hào sảng']};
function ttPhys(r){const els=r.root.els.filter(e=>NGUHANH.includes(e));const pct=e=>els.includes(e)?Math.round(100/Math.max(1,els.length)):0;const D=r.kv||[];const has=k=>D.includes(k);
  const T=(TT_TRAITS[r.origin]||[]).concat(TT_TRAITS[r.trait]||[]);const hasT=t=>T.includes(t);const anyT=L=>L.some(hasT);
  const k=r.karma||0;const pureR=k>=40,pureE=k<=-40,neutral=Math.abs(k)<20;const lc=r.root.id==='cuc'?'Cực Linh Căn':r.root.id==='thien'?'Thiên Linh Căn':'';
  const evil=['Độc ác','Tàn nhẫn','Thâm độc','Cuồng tà','Vị kỷ','Căm thù'],wild=['Cuồng tà','Quái gở','Tự do'];const bal5=els.length===5;
  const C={hon_don_the:bal5&&lc==='Cực Linh Căn'&&neutral&&(has('ngu_hanh_hop_nhat')||(has('hon_nguyen_dao')&&D.some(q=>q!=='hon_nguyen_dao'&&TT_DEST[q].rank>=5))),hoang_co_thanh_the:pct('tho')>=80&&(has('son_ha_xa_tac')||has('da_day_hon_sat'))&&pureR&&!anyT(evil),
   van_co_ma_the:pureE&&(has('sat_phat_qua_duyet')||has('dao_ma_chuyen_the'))&&anyT(evil),tien_thien_dao_thai:!!lc&&has('dai_tri_nhuoc_ngu')&&!pureE,
   cuu_khieu_linh_lung:(has('thien_co_thong_minh')||has('thien_ly_nhan'))&&anyT(['Thận trọng','Thực dụng','Thông tuệ']),
   thuong_thien_ba_the:(pct('tho')>=60||pct('kim')>=60)&&!pureR&&(anyT(wild)||has('cuong_vong_tu_dai')),thai_duong_the:pct('hoa')>=80&&has('cuu_duong')&&!hasT('Lạnh lùng'),
   thai_am_the:pct('thuy')>=80&&has('nhuoc_thuy'),thien_yeu_the:(pct('moc')>=60||has('huyen_anh_phong_than'))&&anyT(wild),loi_dinh_chien_the:has('loi_dinh_ba')&&anyT(wild.concat(['Hào sảng','Hiếu chiến'])),
   hu_khong_chi_the:has('huyen_anh_phong_than')&&hasT('Tự do'),duoc_linh_thanh_the:pct('moc')+pct('hoa')>=60&&(has('duoc_linh_the')||has('chu_tuoc_phan_thien')||r.origin==='duoc'),
   ngu_hanh_linh_the:bal5,vo_cau_kiem_the:pct('kim')>=60&&has('kiem_khi_truong_giang'),huyet_sat_ma_the:pct('thuy')>=40&&k<-60&&anyT(['Độc ác','Tàn nhẫn','Sát phạt']),
   bang_co_ngoc_cot:has('bang_tam_ngoc_cot')&&hasT('Lạnh lùng'),tat_phong_linh_the:pct('moc')>=40&&pct('thuy')>=20&&has('phong_hanh_giả'),cuu_duong_chi_the:pct('hoa')>=60&&has('cuu_duong'),
   huyen_am_chi_the:pct('thuy')>=60&&has('nhuoc_thuy'),kim_cuong_bat_hoai:pct('kim')>=50&&pct('tho')>=50,kim_linh_the:pct('kim')>=70,moc_linh_chi_the:pct('moc')>=70,thuy_linh_the:pct('thuy')>=70,
   hoa_linh_the:pct('hoa')>=70,tho_linh_the:pct('tho')>=70,am_sat_the:k<=-50&&hasT('Thâm độc'),cuong_chien_the:hasT('Cuồng tà')||(hasT('Hiếu chiến')&&['vo_si','sat_phat_qua_duyet','huyet_ma','cuong_vong_tu_dai','than_the_khoe_manh'].some(has)),man_luc_the:has('than_the_khoe_manh'),
   thong_tue_the:has('tinh_than_minh_man'),kien_nhan_the:has('khi_luc_doi_dao'),linh_cam_the:has('thien_ly_nhan'),truong_tho_the:has('thien_menh_chi_tu')||pct('moc')>=50};
  const L=TT_PHYS.filter(p=>C[p.id]).sort((a,b)=>b.rank-a.rank).slice(0,3).map(p=>p.id);return L.length?L:['pham_the'];}
function ttPhysOf(id){return TT_PHYS.find(p=>p.id===id);}
// đổi hiệu ứng của Thienmenh sang chỉ số của game này
const TT_MAP={physicalStrength:['atkP',1],magicPower:['matkP',1],physicalBody:['defP',1],damageReduction:['defP',1],counterDamage:['defP',0.5],armorPen:['atkP',0.5],
 agility:['tp',0.25],attackSpeed:['tp',0.2],spiritualSense:['than',0.5],aptitude:['ngo',0.34],critChance:['crit',1],critDamage:['critDmg',1],evasion:['dodge',1],critResist:['hoTam',0.5],
 lifeSteal:['drain',0.5],hpRegen:['regenHp',0.2],maxHp:['hpP',1],maxSpiritPower:['mpP',1],maxStamina:['hpP',0.3],maxMentalState:['tam',0.34],lifespan:['lifeP',1]};
const TT_ELD={dmgFire:'hoa',dmgLightning:'loi',dmgIce:'bang',dmgWind:'phong'};
function ttFx(def){const o={};if(!def)return o;const E=def.effects||{};const add=(k,v)=>{if(!v)return;o[k]=(o[k]||0)+v;};
  for(const grp of [E.attributeChangePercent,E.primaryStatChangePercent])for(const [k,v] of Object.entries(grp||{})){if(TT_ELD[k]){o.elP=o.elP||{};o.elP[TT_ELD[k]]=(o.elP[TT_ELD[k]]||0)+v;continue;}const m=TT_MAP[k];if(!m)continue;
    let x=v*m[1];x=['tp','ngo','tam','than','hoTam','drain','regenHp'].includes(m[0])?Math.sign(x)*Math.max(1,Math.round(Math.abs(x))):Math.round(x);add(m[0],x);}
  const ex=(E.expPerTurn||0)+(def.expPerTurn||0)*3;if(ex)add('tvP',ex);return o;}
const TT_FXN={atkP:'Công vật lý {v}%',matkP:'Công phép {v}%',defP:'Thủ {v}%',hpP:'Khí huyết {v}%',mpP:'Linh lực {v}%',tp:'Thân pháp {v}',than:'Thần thức {v}',ngo:'Ngộ tính {v}',tam:'Đạo tâm {v}',crit:'Chí mạng {v}%',critDmg:'ST chí mạng {v}%',dodge:'Né tránh {v}',hoTam:'Hộ tâm {v}',drain:'Hút máu {v}%',regenHp:'Hồi khí huyết mỗi lượt {v}%',lifeP:'Thọ nguyên {v}%',tvP:'Tu vi nhận thêm {v}%'};
function ttFxText(def){const o=ttFx(def);const L=[];for(const [k,v] of Object.entries(o)){if(k==='elP'){for(const [e,x] of Object.entries(v))L.push('Sát thương hệ '+EL[e].n+' '+(x>0?'+':'')+x+'%');continue;}if(TT_FXN[k])L.push(TT_FXN[k].replace('{v}',(v>0?'+':'')+v));}
  const E=def.effects||{};if(E.nguHanhBonus)L.push('Linh căn nghiêng về '+Object.keys(E.nguHanhBonus).map(e=>e==='all'?'ngũ hành':(EL[e]||{n:e}).n).join(', ')+(Object.values(E.nguHanhBonus).some(v=>v<0)?' (khuyết)':''));
  if(TT_FORCE[def.id])L.push('Linh căn hóa '+EL[TT_FORCE[def.id]].n+' (biến dị)');if(def.id==='hon_nguyen_dao'||def.id==='ngu_hanh_hop_nhat')L.push('Ép thành Cực linh căn');
  if(E.amDuongBonus){const d=Math.round(((E.amDuongBonus.chinh||0)-(E.amDuongBonus.ta||0))/2);if(d)L.push('Nhân quả '+(d>0?'+':'')+d);}return L;}
{const _ag25=aggFx;aggFx=function(){const fx=_ag25();const r=G.run;if(!r)return fx;const add=src=>{for(const [k,v] of Object.entries(src)){if(k==='elP'){fx.elP=fx.elP||{};for(const [e,x] of Object.entries(v))fx.elP[e]=(fx.elP[e]||0)+x;}else fx[k]=(fx[k]||0)+v;}};
  for(const k of r.kv||[])add(ttFx(TT_DEST[k]));for(const k of r.the||[])add(ttFx(ttPhysOf(k)));return fx;};}
{const _nr25=newRun;newRun=function(c){const res=_nr25(c);const r=G.run;if(r){r.kv=(c.kv||[]).slice();r.karma=clamp((r.karma||0)+(c.karmaAdj||0),-100,100);r.the=ttPhys(r);const s=S();r.hp=s.maxHp;r.mp=s.maxMp;}return res;};}
// câu chuyện mở đầu: nhắc tới thể chất nổi bật (từ phẩm Hiếm trở lên)
{const _nr25b=newRun;newRun=function(c){const res=_nr25b(c);const r=G.run;if(r&&r.story&&r.the){const p=ttPhysOf(r.the[0]);if(p&&p.rank>=3){const w=r.ten.split(' ');const h2=w.length>2&&NAME.ho2.includes(w[0]+' '+w[1]);const nm=w.slice(h2?2:1).join(' ')||r.ten;
  r.story.splice(Math.max(1,r.story.length-2),0,'Có lần một lão đạo sĩ đi ngang, nhìn '+nm+' rất lâu rồi lẩm bẩm: “'+p.name+'…” '+p.description);}}return res;};}

// ================= ĐỢT 26: ĐỠ ĐÒN CÓ VÒNG BẤM, CHÍ MẠNG CÓ THANH TRƯỢT =================
// Đang thủ thế mà địch đánh tới: vòng bấm hiện nút "Đỡ" thay cho "Né". Không né nữa mà đỡ: bấm chuẩn thì đỡ thêm 25%,
// bấm khá thêm 10%, không bấm hoặc hụt thì đỡ kém đi 10%. Thủ thế mà địch không đánh thì không hiện gì.
{const _ds26=doSkill;doSkill=function(sc,u,sk,lv,tid,qm){const had=sc.dodge;const res=_ds26(sc,u,sk,lv,tid,qm);const me=mainUnit(sc);if(sc.dodge&&sc.dodge!==had&&!sc.dodge.kiep&&me&&me.st.stance){sc.dodge.blk=1;sc.rev++;}return res;};}
{const _dr26=dodgeResolve;dodgeResolve=function(offs){const sc=G.run&&G.run.scene;const d=sc&&sc.dodge;if(!d||!d.blk)return _dr26(offs);const me=mainUnit(sc);
  const L=(offs||[]).filter(x=>x!=null).map(Math.abs);const a=L.length?Math.min(...L):null;const q=a==null?-0.1:a<=0.09?0.25:a<=0.25?0.1:-0.1;
  me._bq=q;clog(sc,q>=0.25?'Ngươi đón đỡ đúng lúc, hóa giải phần lớn lực đạo.':q>0?'Ngươi kịp giơ tay đỡ đòn.':'Ngươi đỡ chậm nửa nhịp, lực đòn dội thẳng vào người.',q>0?'me':'en');
  try{return _dr26([]);}finally{me._bq=0;}};}
{const _bc26=blockCut;blockCut=function(att,def){const b=_bc26(att,def);return def&&def._bq?clamp(b+def._bq,0.05,0.75):b;};}
// Chí mạng: khi đòn của ngươi gieo trúng chí mạng, thanh trượt chạy qua lại; chạm đúng vùng xanh thì mới chí mạng,
// trượt thì đòn vẫn trúng nhưng không chí mạng. Tự đánh thì máy tự bấm (trúng khoảng 70%).
{const _ds26b=doSkill;doSkill=function(sc,u,sk,lv,tid,qm){if(u&&u._critF!=null)return _ds26b(sc,u,sk,lv,tid,qm);
  if(u&&u.isMain&&u.ctrl==='player'&&sk&&sk.fx&&sk.fx.p&&!sc.kiep&&!sc.critQ){const p=((u.crit||5)+(sk.fx.crit||0))/100;
    if(chance(p)){if((typeof CFG!=='undefined'&&CFG.autoFight)||(G.meta.opt&&G.meta.opt.autoQte)||typeof document==='undefined'){u._critF=chance(.7);try{return _ds26b(sc,u,sk,lv,tid,qm);}finally{u._critF=null;}}
      sc.critQ={id:(sc.cqid=(sc.cqid||0)+1),uid:u.id,sk,lv,tid,qm};sc.rev++;return;}
    u._critF=false;try{return _ds26b(sc,u,sk,lv,tid,qm);}finally{u._critF=null;}}
  return _ds26b(sc,u,sk,lv,tid,qm);};}
function critResolve(ok){const sc=G.run&&G.run.scene;if(!sc||!sc.critQ)return;const c=sc.critQ;sc.critQ=null;const u=U_(sc,c.uid);if(!u){return;}
  runAct(sc,()=>{clog(sc,ok?'Ngươi nhìn ra sơ hở của đối phương!':'Sơ hở thoáng qua, ngươi không kịp nắm lấy.',ok?'me':'fl');u._critF=!!ok;try{doSkill(sc,u,c.sk,c.lv,c.tid,c.qm);}finally{u._critF=null;}});}

// ================= ĐỢT 27: THIÊU ĐỐT TINH HUYẾT, THỌ NGUYÊN, HUYẾT TẾ =================
// Nút "Huyết thuật" trong trận mở bảng chọn:
//  · Thiêu đốt tinh huyết (lần 1): mất 20% khí huyết tối đa từ khí huyết hiện tại (không mất thọ); hồi 60% linh lực, đầy thể lực, giải độc, bỏng, suy yếu.
//  · Thiêu đốt thọ nguyên (chỉ sau khi đã đốt tinh huyết): như "đốt nguyên thần" cũ, mất 20% thọ tối đa (tối thiểu 10 năm), nhiều hơn bản cũ.
//  · Huyết tế (mỗi trận một lần): hiến 20% khí huyết tối đa. Trong trận: công +25%. Khí huyết tối đa thiếu hụt suốt 15 tháng,
//    sau đó mới bắt đầu hồi dần trong 12 tháng. Dùng cho trận pháp, pháp bảo sẽ phát triển sau.
// Mỗi lượt chỉ dùng một huyết thuật.
const HT_P=0.2,HT_HOLD=15,HT_REC=12;
function htPen(){const r=G.run;if(!r||!r.ht||!r.ht.length)return 0;const t=W().t;r.ht=r.ht.filter(x=>t<x.re);let p=0;for(const x of r.ht)p+=x.p*(t<x.rs?1:(x.re-t)/(x.re-x.rs));return Math.min(0.6,p);}
{const _S27=S;S=function(){const s=_S27();const p=htPen();if(p>0)s.maxHp=Math.max(1,Math.round(s.maxHp*(1-p)));return s;};}
function burnOpts(sc){const r=G.run;const u=mainUnit(sc);const L=[];const left=Math.floor(S().life-r.age);
  if(!sc.tinh){const c=Math.round(u.max*0.2);L.push({k:'tinh',n:'Thiêu đốt tinh huyết',d:['Linh lực hồi quá nửa, thể lực sung mãn trở lại','Độc, bỏng, suy yếu đều tan','Không mất lượt, không tổn thọ'],cost:'Đổi lại hao mất một mảng khí huyết đang có',ok:u.hp>c+1,why:'Khí huyết không đủ để đốt'});}
  else if(!sc.tho){const y=Math.max(10,Math.round(LIFE[r.realm]*0.2));L.push({k:'tho',n:'Thiêu đốt thọ nguyên',y,d:['Ba lượt tới, mỗi đòn xuyên qua phòng ngự, hút máu đối thủ','Hết ba lượt, nguyên thần cạn kiệt: suy yếu hai lượt'],cost:'Mất vĩnh viễn '+y+' năm thọ nguyên',ok:left>y+1,why:'Thọ nguyên không đủ'});}
  if(!sc.ht){const c=Math.round(u.max*HT_P);L.push({k:'ht',n:'Huyết tế',d:['Hiến tinh huyết cho sát khí: công lực tăng vọt tới hết trận','Mỗi trận chỉ một lần'],cost:'Căn cơ khí huyết hao tổn hơn một năm, sau đó mới hồi lại dần',ok:u.hp>c+1,why:'Khí huyết không đủ để hiến'});}
  return L;}
function burnInfo(sc){const L=burnOpts(sc);return {done:!L.length,L,label:sc.tinh?'Thiêu đốt thọ nguyên':'Huyết thuật'};}
function playerBurn(k){const sc=G.run.scene;const u=readyPlayer(sc);if(!u||u.burnedTurn||u.dazed)return false;const o=burnOpts(sc).find(x=>x.k===k);if(!o||!o.ok)return false;const r=G.run;u.burnedTurn=1;
  if(k==='tinh'){const c=Math.round(u.max*0.2);u.hp=Math.max(1,u.hp-c);sc.tinh=1;u.mp=Math.min(u.maxMp,u.mp+Math.round(u.maxMp*0.6));u.tl=100;u.st.poison=0;u.st.burn=0;u.st.weak=0;
    clog(sc,`Ngươi thiêu đốt tinh huyết, khí huyết hao đi một mảng. Huyết khí sôi trào: linh lực hồi phục quá nửa, thể lực sung mãn, độc tố tiêu tan.`,'me');log('Thiêu đốt tinh huyết trong trận.');}
  else if(k==='tho'){r.lifeAdj-=o.y;sc.tho=1;u.st.soul=3;clog(sc,`Ngươi thiêu đốt thọ nguyên, tóc mai bạc thêm mấy sợi. Ba lượt tới mỗi đòn xuyên giáp, hút máu.`,'me');log(`Thiêu đốt thọ nguyên trong trận.`);}
  else{const c=Math.round(u.max*HT_P);sc.ht=1;const t=W().t;(r.ht=r.ht||[]).push({p:HT_P,rs:t+HT_HOLD*HM,re:t+(HT_HOLD+HT_REC)*HM});u.max=Math.max(1,u.max-c);u.hp=Math.min(u.hp,u.max);u.atk=Math.round(u.atk*1.25);u.matk=Math.round((u.matk||u.atk)*1.25);
    clog(sc,`Ngươi huyết tế, hiến một phần căn cơ khí huyết. Máu tươi hóa thành sát khí: công lực tăng vọt tới hết trận.`,'me');log('Huyết tế: căn cơ khí huyết hao tổn, hơn một năm sau mới bắt đầu hồi lại.');}
  syncMain(sc);sc.rev=(sc.rev||0)+1;return true;}
// ----- khí vận có tác dụng riêng ngoài chỉ số (bổ sung cho bản Thienmenh): khí vận, giá mua, gia cảnh -----
const TT_EXTRA={dai_khi_van:{van:2},van_khi_nghich_thien:{van:5},mi_cot:{shopP:10},tieu_nhan_bi_oi:{shopP:5},tu_loi_vi_ban:{shopP:5}};
{const _tf27=ttFx;ttFx=function(def){const o=_tf27(def);const x=def&&TT_EXTRA[def.id];if(x)for(const [k,v] of Object.entries(x))o[k]=(o[k]||0)+v;return o;};}
Object.assign(TT_FXN,{van:'Khí vận {v}',shopP:'Mua đồ rẻ {v}%'});
{const _ft27=ttFxText;ttFxText=function(def){const L=_ft27(def);if(def&&def.id==='gia_canh_kha_gia')L.push('Đầu thai mang theo thêm linh thạch');return L;};}
// câu chuyện mở đầu: khí vận nổi bật nhất, gia cảnh khá giả thì có thêm linh thạch
{const _nr27=newRun;newRun=function(c){const res=_nr27(c);const r=G.run;if(!r||!r.story||!r.kv)return res;
  const w=r.ten.split(' ');const h2=w.length>2&&NAME.ho2.includes(w[0]+' '+w[1]);const nm=w.slice(h2?2:1).join(' ')||r.ten;const at=Math.max(1,r.story.length-2);
  if(r.kv.includes('gia_canh_kha_gia')){const v=ri(3,6);r.st+=v;r.story.splice(at,0,'Nhà vẫn còn chút của để dành. Lúc '+nm+' ra đi, trong tay nải có thêm '+v+' viên linh thạch.');}
  const top=r.kv.map(k=>TT_DEST[k]).filter(d=>d&&d.rank>=2&&d.id!=='gia_canh_kha_gia'&&!d.mc&&!d.tr&&!/linh căn|kích hoạt|tự động/i.test(d.description)).sort((a,b)=>b.rank-a.rank)[0];
  if(top){const d=top.description.replace(/\.$/,'');r.story.splice(Math.max(1,r.story.length-2),0,'Người quen ai cũng nói về '+nm+': '+d.charAt(0).toLowerCase()+d.slice(1)+'.');}
  saveSoon();return res;};}

// ================= ĐỢT 28: GỘP MỆNH CÁCH VÀO TIÊN THIÊN KHÍ VẬN =================
// 18 mệnh cách cũ thành khí vận phẩm Hiếm (giữ nguyên tác dụng riêng: thiêu, miễn độc, bế quan, mua rẻ, kết liễu…), đổi tên cho ra dáng khí vận.
// Nhân vật mới không còn mệnh cách riêng; bản lưu cũ vẫn giữ mệnh cách đang có.
const MC_REN={kiemtam:['Kiếm Duyên','Từ nhỏ đã có duyên với kiếm, cầm kiếm như cầm đũa.'],thanluc:['Thiên Sinh Thần Lực','Sinh ra đã khỏe hơn người.'],
 menhcung:['Mệnh Cứng','Số mệnh cứng cỏi, mấy lần cận kề cái chết vẫn sống.'],chithuy:['Tâm Bình Khí Hòa','Lòng dạ bình thản, khó bị ngoại vật lay động.'],
 linhnhan:['Mắt Sáng Hơn Người','Nhìn đâu cũng thấy điều người khác bỏ qua.'],luoi:['Ba Tấc Lưỡi','Ăn nói khéo léo, mua bán ít khi chịu thiệt.'],
 yeuhuyet:['Huyết Mạch Yêu Tộc','Trong máu có chút huyết mạch yêu tộc, vết thương lành rất nhanh.'],thiendo:['Thiên Đố Anh Tài','Thông minh hơn người, nhưng trời ghen nên khó sống lâu.'],
 phuctinh:['Phúc Tinh Cao Chiếu','Sao phúc chiếu mệnh, gặp dữ hóa lành.'],hoalinh:['Mệnh Hỏa Vượng','Sinh vào giờ hỏa vượng, có duyên với lửa.'],
 bangco:['Sinh Nơi Băng Tuyết','Sinh ra giữa mùa băng tuyết, thân thể cứng cỏi, hợp với hàn khí.'],truongtho:['Tướng Thọ','Mang tướng mạo của người sống lâu.'],
 bachdoc:['Bách Độc Bất Xâm','Trời sinh không sợ độc.'],ngodao:['Duyên Ngộ Đạo','Có duyên với đạo, tu luyện nhanh hơn người.'],
 khotu:['Bền Chí Khổ Tu','Chịu được cô quạnh, ngồi yên tu luyện bao lâu cũng được.'],sattinh:['Sát Tinh Chiếu Mệnh','Sát khí nặng, ra tay với kẻ yếu thế không chút nương tay.'],
 mongdu:['Mộng Du Tiên Cảnh','Đêm nào cũng mơ thấy tiên cảnh.'],huyenco:['Kinh Mạch Thông Suốt','Kinh mạch thông suốt, linh lực vận hành trơn tru.']};
for(const t of TRAIT){const m=MC_REN[t.id];if(!m)continue;const id='mc_'+t.id;TT_DEST[id]={id,name:m[0],description:m[1],rank:3,mc:t.id};}
TRAIT.push({id:'none',n:'Không',i:'',fx:{},d:''});
{const _tf28=ttFx;ttFx=function(def){if(def&&def.mc){const t=TRAIT.find(x=>x.id===def.mc);return JSON.parse(JSON.stringify((t&&t.fx)||{}));}return _tf28(def);};}
{const _ft28=ttFxText;ttFxText=function(def){if(def&&def.mc){const t=TRAIT.find(x=>x.id===def.mc);return t?[t.d]:[];}return _ft28(def);};}
// thêm lượt rút khí vận nhờ nâng cấp Thiên mệnh ở Bến Vong Xuyên
{const u=UPG.find(x=>x.id==='menh');if(u){u.n='Thiên mệnh';u.d='Đầu thai rút thêm một tiên thiên khí vận';}}
{const _tr28=ttRoll;ttRoll=function(){const L=_tr28();const all=Object.values(TT_DEST);for(let i=0;i<U('menh');i++){const rk=wpick([1,2,3,4,5,6],x=>TT_RW[x]);const pool=all.filter(d=>d.rank===rk&&!L.includes(d.id));if(pool.length)L.push(pick(pool).id);}return L;};}
{const _gb28=genBirth;genBirth=function(){_gb28();for(const c of G.birth.cards)c.trait='none';};}
// tính tình (xét thể chất) lấy từ xuất thân và khí vận gốc mệnh cách
{const _tp28=ttPhys;ttPhys=function(r){const keep=r.trait;const mc=(r.kv||[]).map(k=>TT_DEST[k]&&(TT_DEST[k].mc||TT_DEST[k].tr)).filter(Boolean);
  const save={};for(const m of mc){save[m]=1;}const extra=mc.flatMap(m=>TT_TRAITS[m]||[]);const o=TT_TRAITS[r.origin];TT_TRAITS[r.origin]=(o||[]).concat(extra);try{return _tp28(r);}finally{TT_TRAITS[r.origin]=o;if(!o)delete TT_TRAITS[r.origin];}};}
// câu chuyện mở đầu: khí vận gốc mệnh cách kể bằng câu cũ của mệnh cách
{const _nr28=newRun;newRun=function(c){const res=_nr28(c);const r=G.run;if(!r||!r.story||!r.kv)return res;const w=r.ten.split(' ');const h2=w.length>2&&NAME.ho2.includes(w[0]+' '+w[1]);const nm=w.slice(h2?2:1).join(' ')||r.ten;
  let at=Math.min(3,r.story.length-2);for(const k of r.kv){const d=TT_DEST[k];const tk=d&&(d.mc||d.tr);if(tk&&LS_TR[tk]){r.story.splice(at++,0,lsFill(LS_TR[tk],{ten:nm}));}}return res;};}

// bản lưu cũ: nhẫn thứ hai và pháp bảo ở ô chưa mở thì cất về túi
function eqFix(){const r=G.run;if(!r||!r.eq)return;const E=r.eq;const back=k=>{if(E[k]){E[k].seen=1;r.relics.push(E[k]);E[k]=null;}};back('nhan2');PB_SLOTS.forEach((k,j)=>{if(j>=pbOpen())back(k);});}
{const _r228=run2;run2=function(){const r=_r228();if(r&&!r._eq3){r._eq3=1;eqFix();}return r;};}

// ================= ĐỢT 29: GỘP KHÍ VẬN TRÙNG NGHĨA, GIẢM BUFF =================
// Mệnh cách cũ trùng tên hoặc trùng nghĩa với khí vận của Thienmenh: bỏ bản mệnh cách, dồn tác dụng riêng (đã giảm) vào khí vận kia.
// Câu chuyện mở đầu và tính tình (xét thể chất) vẫn dùng câu cũ của mệnh cách đó.
const TT_MERGE={kiemtam:['kiem_phach',{elP:{kim:10}}],chithuy:['tam_nhu_chi_thuy',{tam:2,tammaRes:25}],linhnhan:['thien_ly_nhan',{chkP:6}],
 thiendo:['yeu_menh',{ngo:2,lifeP:-6}],phuctinh:['dai_khi_van',{van:1}],hoalinh:['cuu_duong',{elP:{hoa:10},burnHit:0.08}],
 ngodao:['thien_co_thong_minh',{tvP:8}],sattinh:['sat_phat_qua_duyet',{execute:15}],huyenco:['linh_khi_than_hoa',{mpP:8,mpCost:-8}]};
for(const [mc,[to,fx]] of Object.entries(TT_MERGE)){delete TT_DEST['mc_'+mc];const d=TT_DEST[to];if(!d)continue;d.tr=mc;
  const X=TT_EXTRA[to]||(TT_EXTRA[to]={});for(const [k,v] of Object.entries(fx)){if(k==='elP'){X.elP=X.elP||{};for(const [e,x] of Object.entries(v))X.elP[e]=(X.elP[e]||0)+x;}else X[k]=(X[k]||0)+v;}}
// Yểu Mệnh mang luôn tên Thiên Đố Anh Tài: trời ghen người tài
Object.assign(TT_DEST.yeu_menh,{name:'Thiên Đố Anh Tài',description:'Thông minh hơn người, nhưng trời ghen nên thân thể yếu ớt, khó sống lâu.',rank:2});
// ttFx cộng thêm elP từ TT_EXTRA (bản trước chỉ cộng số)
{const _tf29=ttFx;ttFx=function(def){if(def&&!def.mc&&TT_EXTRA[def.id]&&TT_EXTRA[def.id].elP){const bak=TT_EXTRA[def.id];const {elP,...rest}=bak;TT_EXTRA[def.id]=rest;let o;try{o=_tf29(def);}finally{TT_EXTRA[def.id]=bak;}o.elP=o.elP||{};for(const [e,x] of Object.entries(elP))o.elP[e]=(o.elP[e]||0)+x;return o;}return _tf29(def);};}
Object.assign(TT_FXN,{chkP:'Phép thử {v}%',tammaRes:'Kháng tâm ma {v}%',execute:'Sát thương lên kẻ dưới 30% khí huyết {v}%',burnHit:'Đòn đánh gây thiêu',mpCost:'Linh lực tiêu hao {v}%',bqP:'Hiệu quả bế quan {v}%',regenHp:'Hồi khí huyết mỗi lượt {v}%'});
// Mệnh cách còn lại (không trùng): giảm buff cho cân bằng với khí vận khác cùng phẩm
const MC_NERF={thanluc:[{atkP:8},'Công +8%'],menhcung:[{hpP:10},'Khí huyết +10%'],luoi:[{shopP:12},'Mua đồ rẻ 12%'],yeuhuyet:[{regenHp:2},'Mỗi lượt hồi 2% khí huyết'],
 bangco:[{defP:10,elP:{thuy:8,bang:8}},'Thủ +10%, Thủy và Băng +8%'],truongtho:[{lifeP:12},'Thọ nguyên +12%'],bachdoc:[{poisonImm:1,hpP:3},'Miễn nhiễm độc, khí huyết +3%'],
 khotu:[{bqP:25},'Bế quan hiệu quả hơn 25%'],mongdu:[{tvP:6,tam:1},'Tu vi +6%, đạo tâm +1']};
for(const [id,[fx,d]] of Object.entries(MC_NERF)){const t=TRAIT.find(x=>x.id===id);if(t){t.fx=fx;t.d=d;}}
// các mệnh cách đã gộp: bản lưu cũ còn giữ thì tác dụng cũng giảm theo
for(const [mc,[,fx]] of Object.entries(TT_MERGE)){const t=TRAIT.find(x=>x.id===mc);if(t){t.fx=JSON.parse(JSON.stringify(fx));}}

// ================= ĐỢT 30: YÊU CẦU CẢNH GIỚI CHO MỌI VẬT PHẨM DÙNG ĐƯỢC =================
// Bậc người dùng: 0 Phàm nhân, 1 Luyện Khí, 2 Trúc Cơ, 3 Kết Đan, 4 Nguyên Anh, 5 Hóa Thần, 6 Độ Kiếp.
// Trang bị, pháp bảo, pháp khí tùy thân: phẩm nào cần bậc nấy (phàm phẩm: phàm nhân dùng được; hoàng phẩm: Luyện Khí; huyền phẩm: Trúc Cơ…).
// Công pháp, tâm pháp đã có yêu cầu riêng (cần cảnh giới mới đọc hiểu, từng tầng có cảnh giới mở). Phương tiện đã có yêu cầu riêng ở trạm dịch.
const LV_NAME=['Phàm nhân'].concat(REALM);
function plv(){const r=G.run;if(!r)return 0;return isPham()?0:clamp((r.realm||0)+1,1,6);}
function relReq(rel){if(!rel||rel.k==='book')return 0;return rel.req!=null?rel.req:clamp(rel.tier||0,0,6);}
function relOk(rel){return plv()>=relReq(rel);}
function relWhy(rel){return relOk(rel)?'':'Cần '+LV_NAME[relReq(rel)]+' mới dùng được '+(rel.name||'món này')+'.';}
phamLock=function(rel){return !!rel&&rel.k!=='book'&&!relOk(rel);};
{const _e30=equip;equip=function(i){const rel=G.run.relics[i];if(rel&&!relOk(rel)){note(relWhy(rel));return;}return _e30(i);};}
{const _et30=equipTo;equipTo=function(i,s){const rel=G.run.relics[i];if(rel&&!relOk(rel)){note(relWhy(rel));return;}return _et30(i,s);};}
{const _dp30=ddPut;ddPut=function(i){const rel=G.run.relics[i];if(rel&&!relOk(rel)){note(relWhy(rel));return false;}return _dp30(i);};}
{const _ea30=eqAuto;eqAuto=function(){const r=G.run;if(!r)return _ea30();const keep=r.relics.filter(x=>!x.seen&&x.k!=='book'&&!relOk(x));keep.forEach(x=>x.seen=1);return _ea30();};}
// đồ đang mặc mà chưa đủ cảnh giới (bản lưu cũ): cất về túi
{const _ef30=eqFix;eqFix=function(){_ef30();const r=G.run;if(!r||!r.eq)return;for(const k in r.eq){const x=r.eq[k];if(x&&!relOk(x)){x.seen=1;r.relics.push(x);r.eq[k]=null;}}
  r.dd=(r.dd||[]).filter(d=>{if(relOk(d.rel))return true;d.rel.seen=1;r.relics.push(d.rel);return false;});};}
{const _r230=run2;run2=function(){const r=_r230();if(r&&!r._eq4){r._eq4=1;eqFix();}return r;};}
// ----- sửa lại: phẩm không gắn với cảnh giới. Mỗi món có yêu cầu cảnh giới riêng, theo nơi nó xuất hiện -----
// Vùng 1 (Phàm Trần): cần Phàm nhân hoặc Luyện Khí; vùng 2: Luyện Khí hoặc Trúc Cơ; vùng 3: Trúc Cơ hoặc Kết Đan… Phẩm nào cũng có thể gặp ở mọi yêu cầu.
// Món cũ chưa có yêu cầu (bản lưu trước): coi như Phàm nhân dùng được.
function relReqRoll(){const r=G.run;const k=clamp((r&&r.region)||0,0,4);return clamp(k+(chance(k===0?0.4:0.5)?1:0),0,6);}
{const _gr31=genRelic;genRelic=function(t){const x=_gr31(t);if(x&&x.req==null)x.req=relReqRoll();return x;};}
relReq=function(rel){if(!rel||rel.k==='book')return 0;return rel.req!=null?rel.req:0;};
// ----- phẩm quyết định SỐ dòng chỉ số, cảnh giới yêu cầu quyết định ĐỘ LỚN chỉ số -----
// Mỗi món giữ chỉ số gốc theo loại (kiếm: công, giáp: thủ…); phẩm càng cao càng thêm nhiều dòng phụ:
//  phàm 0 · hoàng 1 · huyền 1 · địa 2 · thiên 2 · tiên 3 · thần 4 dòng phụ.
// Mọi dòng (gốc và phụ) nhân theo cảnh giới yêu cầu: Phàm nhân ×1 · Luyện Khí ×1,3 · Trúc Cơ ×1,7 · Kết Đan ×2,2 · Nguyên Anh ×2,8 · Hóa Thần ×3,5 · Độ Kiếp ×4,3.
// Nên món thần phẩm cần Trúc Cơ: nhiều dòng, số vừa; món phàm phẩm cần Hóa Thần: một loại chỉ số nhưng số rất lớn.
const REL_X=[0,1,1,2,2,3,4],REL_M=[1,1.3,1.7,2.2,2.8,3.5,4.3];
const REL_POOL={atkP:5,matkP:6,defP:8,hpP:6,mpP:8,tp:1,crit:3,critDmg:8,dodge:3,hoTam:3,van:1,tam:1,ngo:1,regenHp:1,regenMp:2,drain:3,tvP:5};
{const _gr32=genRelic;genRelic=function(t){const x=_gr32(t);if(!x)return x;const n=REL_X[clamp(x.tier||0,0,6)];const keys=Object.keys(REL_POOL).filter(k=>!(k in x.fx));x.fx2={};
  for(const k of shuffle(keys).slice(0,n))x.fx2[k]=REL_POOL[k];x.v2=1;return x;};}
{const _rf32=relicFx;relicFx=function(rel){if(!rel||!rel.v2)return _rf32(rel);const m=REL_M[clamp(rel.req||0,0,6)];const o=_rf32(Object.assign({},rel,{tier:0}));
  for(const k in o){if(['firstEvade','weakStart','vulnStart','pillSlot'].includes(k))continue;o[k]=k==='poisonHit'?Math.round(o[k]*m*100)/100:o[k]<0?Math.min(-1,Math.round(o[k]*m)):Math.max(1,Math.round(o[k]*m));}
  for(const [k,v] of Object.entries(rel.fx2||{})){const x=v*m;o[k]=(o[k]||0)+(['tp','van','tam','ngo','regenHp','regenMp'].includes(k)?Math.max(1,Math.round(x)):Math.round(x));}
  return o;};}
// "thêm ô đan dược" (pillSlot) trên vật phẩm: đan dược đã dùng chung túi đồ, nên đổi thành thêm ô túi đồ (chỉ tính đồ đang mặc, đang uẩn dưỡng)
FXT.pillSlot='👝 Túi đồ thêm {v} ô';
{const _bc33=bagCap;bagCap=function(){const r=G.run;const b=_bc33();if(!r)return b;const E=eqOf();let add=0;for(const x of Object.values(E))if(x)add=Math.max(add,relicFx(x).pillSlot||0);for(const d of r.dd||[])add=Math.max(add,relicFx(d.rel).pillSlot||0);return Math.min(BAG_MAX,b+add);};}

// ================= ĐỢT 31: NỘI TẠI CỦA VẬT PHẨM =================
// Chỉ số đặc biệt trên vật phẩm gọi là nội tại. Nội tại là duy nhất: mang nhiều món cùng nội tại thì chỉ tính món mạnh nhất, không cộng dồn.
// (Nội tại cùng loại từ tiên thiên khí vận, thể chất vẫn cộng bình thường.) Dòng phụ ngẫu nhiên không bao giờ là nội tại.
const NT_KEYS=['firstEvade','startBlock','blockTurn','weakStart','vulnStart','poisonHit','stunP','reflect','execute','drain','regenHp','regenMp','healAfter','hoTam','pillP','stonesP','pillSlot','shopP','tammaRes','elX','craftP','bqSafe','bqP'];
for(const k of ['hoTam','drain','regenHp','regenMp'])delete REL_POOL[k];
function relActive(){const r=G.run;if(!r)return [];const E=eqOf();const L=Object.values(E).filter(Boolean).map(x=>({rel:x,m:1}));for(const d of r.dd||[]){const m=ddMul(d),fx={};for(const k in d.rel.fx)fx[k]=typeof d.rel.fx[k]==='number'?d.rel.fx[k]*m:d.rel.fx[k];L.push({rel:Object.assign({},d.rel,{fx}),m:1});}return L;}
{const _ag34=aggFx;aggFx=function(){const fx=_ag34();const r=G.run;if(!r||!r.eq)return fx;const A=relActive();
  for(const k of NT_KEYS){if(k==='elX')continue;let sum=0,max=0;for(const {rel,m} of A){const v=(relicFx(rel)[k]||0)*m;sum+=v;if(v>max)max=v;}if(sum>max)fx[k]=(fx[k]||0)-sum+max;}
  const byEl={};for(const {rel,m} of A){const v=(relicFx(rel).elX||0)*m;if(!v)continue;const e=rel.el;const o=byEl[e]||(byEl[e]={s:0,x:0});o.s+=v;o.x=Math.max(o.x,v);}
  for(const [e,o] of Object.entries(byEl))if(o.s>o.x&&fx.elP)fx.elP[e]=(fx.elP[e]||0)-o.s+o.x;
  // nội tại dạng đếm (né mấy đòn, mấy lượt suy nhược…) luôn là số nguyên
  for(const k of ['firstEvade','weakStart','vulnStart'])if(fx[k])fx[k]=Math.floor(fx[k]+1e-9);
  return fx;};}
// tên gọi của từng nội tại (nội tại cùng tên không cộng dồn)
const NT_NAME={firstEvade:'Tàn Ảnh',startBlock:'Kim Chung Tráo',blockTurn:'Huyền Vũ Thuẫn',weakStart:'Nhiếp Hồn Âm',vulnStart:'Khổn Tiên Tác',poisonHit:'Vạn Độc Phệ',
 stunP:'Phiên Thiên Ấn',reflect:'Phản Chiếu',execute:'Đoạn Mệnh',drain:'Thôn Huyết',regenHp:'Sinh Sinh Bất Tức',regenMp:'Linh Tuyền',healAfter:'Cam Lộ',hoTam:'Hộ Tâm Kính',
 pillP:'Đan Hỏa',stonesP:'Tụ Bảo',pillSlot:'Càn Khôn',shopP:'Thương Hội Lệnh',tammaRes:'Thanh Tâm',elX:'Linh Dẫn',craftP:'Thiên Công',bqSafe:'Hộ Pháp Trận',bqP:'Tụ Linh Trận'};
// ----- cân lại lịch luyện: đột phá cần đầy 100% (trước là 70%) nên mọi nguồn lịch luyện nhân 1,45;
// đánh lại cùng loại địch giảm chậm hơn (mỗi lần trước −25%, nay −12%) -----
const LL_MUL=1.45;
{const _la35=llAdd;llAdd=function(x,why,quiet){return _la35(x>0?x*LL_MUL:x,why,quiet);};}
{const _fc35=finishCombat;finishCombat=function(sc){const r=G.run;const k=sc&&sc.en&&(sc.en.k||sc.en.n);let keep=null;
  if(r&&k&&r.llSeen&&r.llSeen[k]){keep=r.llSeen[k];r.llSeen[k]=Math.floor(keep*0.48);}const res=_fc35(sc);if(G.run&&keep!=null&&G.run.llSeen)G.run.llSeen[k]=keep+1;return res;};}
// lên cảnh giới mới (kể cả dẫn khí nhập thể): nơi đã tới, người đã quen, địch đã đánh đều được "nhìn bằng con mắt mới", lại cho lịch luyện như lần đầu
function llFresh(){const r=G.run;if(!r)return;r.llP=[];r.llN=[];r.llSeen={};}
{const _pu35=phamUp;phamUp=function(){const was=G.run&&G.run.pham;const res=_pu35.apply(this,arguments);if(was&&G.run&&!G.run.pham)llFresh();return res;};}
{const _bf35=btFinish;btFinish=function(){const rl=G.run&&G.run.realm;const res=_bf35.apply(this,arguments);if(G.run&&G.run.realm>rl)llFresh();return res;};}
// ----- món độc nhất (Kiếm Gãy Vô Danh, Nhẫn Sắt Cũ…): theo luật mới -----
// Có cảnh giới yêu cầu theo nơi nhận được (lệnh bài đệ tử, di vật kiếp trước, linh thú: ai cũng dùng được);
// chỉ số nhân theo cảnh giới yêu cầu như mọi món khác; không thêm dòng phụ (chỉ số của chúng đã là độc nhất).
{const _ur36=uniqueRelic;uniqueRelic=function(id){const x=_ur36(id);if(!x)return x;x.req=['lenhtong','mocu','linhthu'].includes(id)?0:relReqRoll();x.v2=1;x.fx2={};return x;};}
// chỉ số âm hiện "−3" thay vì "+-3"
{const _fl36=fxLines;fxLines=function(fx,rel){return _fl36(fx,rel).map(s=>s.replace(/\+-/g,'−'));};}

// ================= ĐỢT 32: CHỈ SỐ SÀN VÀ ĐÁNH GIÁ 5 MỨC =================
// Chỉ số sàn: chỉ số của một nhân vật chuẩn ở ĐÚNG đại cảnh giới và tiểu cảnh giới hiện tại (phàm nhân tính riêng):
// không đồ, không công pháp, không khí vận, thể chất, không nâng cấp Bến Vong Xuyên, không phẩm chất cảnh giới;
// tam linh căn, tư chất trung bình (50), các chỉ số gốc trung bình, tâm pháp phàm phẩm, đứng ở cùng nơi với nhân vật (linh khí nơi bế quan hiện riêng).
// Đánh giá = chỉ số thật / sàn: dưới 0,7 rất kém · 0,7–0,9 kém · 0,9–1,25 bình thường · 1,25–1,7 tốt · từ 1,7 rất tốt.
// Hệ thống vẫn tính bằng số; đánh giá chỉ để hiển thị.
const RATE_T=[0.7,0.9,1.25,1.7];
const RATE_W={luc:['Rất yếu','Yếu','Bình thường','Mạnh','Rất mạnh'],toc:['Rất chậm','Chậm','Bình thường','Nhanh','Rất nhanh'],muc:['Rất thấp','Thấp','Bình thường','Cao','Rất cao'],
 ben:['Rất mỏng','Mỏng','Bình thường','Dày','Rất dày'],xa:['Rất gần','Gần','Bình thường','Xa','Rất xa']};
const RATE_COL=['#8d8672','#a5835a','var(--ink)','#3f8a4a','#b8902a'];
// tốc độ tu, thổ nạp nhân dồn nhiều thứ (linh căn, tư chất, ngộ tính, khí vận) nên mốc rộng hơn
const RATE_TK={bq:[0.6,0.85,1.4,2.3],thonap:[0.6,0.85,1.4,2.3]};
function rateLv(v,f,T){T=T||RATE_T;if(!(f>0))return v>0?3:2;const x=v/f;let i=0;while(i<T.length&&x>=T[i]-1e-9)i++;return i;}
let FLOOR_C={k:null,v:null};
function floorKey(){const r=G.run;return [r.kiep,r.realm,tieu(),r.pham?1:0,r.region,r.at,G.bqRoom?1:0].join('|');}
function floorStats(){const r=G.run;if(!r)return null;const k=floorKey();if(FLOOR_C.k===k)return FLOOR_C.v;
  const F=JSON.parse(JSON.stringify(r));const tp={u:-999,type:'tp',tier:0,el:'vo',lines:[],lv:1,v:2,req:0,n:'chuẩn'};
  Object.assign(F,{relics:[],eq:{},dd:[],arts:[tp],artKho:[],chu:[{k:'a',u:-999},null,null,null,null,null,null,null],chuOpen:4,kv:[],the:[],origin:'__none',trait:'none',
    root:{id:'tam',els:['kim','moc','thuy']},bon:{atkP:0,defP:0,hpP:0,mpP:0,tp:0,ngo:0,van:0,tam:0,matkP:0},base:{tp:6,ngo:10,van:4,tam:9},tuchat:50,lifeAdj:0,quality:[0,0,0,0,0,0],
    tamma:0,ht:[],wounds:[],inj:null,pets:[],petOut:null,th:[],scene:null,moving:null,_avgTT:1});
  const keepR=G.run,keepU=G.meta.upg,keepRoom=G.bqRoom;let v=null;
  try{G.run=F;G.meta.upg={};G.bqRoom=false;const s=S();
    v={maxHp:s.maxHp,maxMp:s.maxMp,atk:s.atk,matk:s.matk,def:s.def,tp:s.tp,ne:s.ne,ngo:s.ngo,tam:s.tam,van:s.van,than:s.than,nl:s.nl,crit:s.crit,critDmg:s.critDmg,
      cx:s.cx,hoi:s.hoi,hoTam:s.hoTam,lc:lucChien(),bq:bqReal(),thonap:thonapPct(),walk:walkSpeed(),sense:SENSE[F.realm]||1};}
  catch(e){console.error(e);}finally{G.run=keepR;G.meta.upg=keepU;G.bqRoom=keepRoom;}
  FLOOR_C={k,v};return v;}
// đánh giá một chỉ số của người chơi: trả về {lv, t (chữ), c (màu)}
function rateOf(key,val,kind){const f=floorStats();const lv=rateLv(val,f?f[key]:0,RATE_TK[key]);const W=RATE_W[kind||'luc'];return {lv,t:W[lv],c:RATE_COL[lv]};}
function pctOf(a,b){return Math.round(clamp(a/Math.max(1,b),0,1)*100)+'%';}
// ----- mô tả chỉ số bằng chữ: "+29%" → "tăng mạnh", "Ngộ tính +3" → "Ngộ tính tăng khá" -----
// Số kiểu đếm (né 1 đòn, 2 lượt, thêm 2 ô, năm, tháng…) giữ nguyên vì đó là số lượng.
// Mốc: chỉ số tính theo % (dưới 6 nhẹ, dưới 15 khá, dưới 30 mạnh, còn lại rất mạnh); chỉ số điểm (dưới 2 nhẹ, dưới 4 khá, dưới 7 mạnh).
function magW(v,pct){const b=pct?[6,15,30]:[2,4,7];return v<b[0]?'nhẹ':v<b[1]?'khá':v<b[2]?'mạnh':'rất mạnh';}
const NUM_KEEP=/^\s*(đòn|lượt|ô|năm|tháng|ngày|giờ|linh thạch|viên|lần|đạo|đợt)/;
function numWords(str){str=String(str);
  str=str.replace(/([+−-])\s?(\d+(?:[.,]\d+)?)(\s?%)?/g,(m,sg,n,pc,off,all)=>{if(NUM_KEEP.test(all.slice(off+m.length)))return m;const v=parseFloat(n.replace(',','.'));return (sg==='+'?'tăng ':'giảm ')+magW(v,!!pc);});
  let tail='';str=str.replace(/(\d+(?:[.,]\d+)?)\s?%\s?/g,(m,n,off,all)=>{if(NUM_KEEP.test(all.slice(off+m.length)))return m;tail=magW(parseFloat(n.replace(',','.')),true);return '';});
  return (tail?str.replace(/\s+$/,'')+' · '+tail:str).replace(/\s{2,}/g,' ');}
{const _fl37=fxLines;fxLines=function(fx,rel){return _fl37(fx,rel).map(numWords);};}
{const _lt37=lineText;lineText=function(a,x,pot){const t=_lt37(a,x,pot);return x&&(x.sk||x.mind)?t:numWords(t.replace(/\s*\(đang [^)]*\)/,''));};}
{const _tt37=ttFxText;ttFxText=function(def){return _tt37(def).map(x=>/^Nhân quả/.test(x)?(/[−-]/.test(x)?'Thiên về ác':'Thiên về thiện'):numWords(x));};}

// khả năng đột phá bằng chữ; từng nguồn cộng trừ bằng chữ
function btWord(p){return p<0.3?'Rất khó':p<0.5?'Khó':p<0.7?'Ngang tay':p<0.85?'Dễ':'Gần như chắc chắn';}
function partWord(v){const a=Math.abs(v);return (v>0?'▲ ':'▼ ')+(a<3?'ít':a<8?'vừa':'nhiều');}

// tâm ma bằng chữ (không hiện số)
function tmWord(v){return ['Rất thấp','Thấp','Bình thường','Cao','Rất cao'][Math.min(4,Math.floor((v||0)/20))];}

// ----- nhật ký trận không hiện số: mô tả mức trúng đòn bằng lời -----
const NUM_VI=['không','một','hai','ba','bốn','năm','sáu','bảy','tám','chín','mười','mười một','mười hai','mười ba','mười bốn','mười lăm'];
function numVi(n){return NUM_VI[n]||String(n);}
function cbTgName(tg){const L=(tg||[]).filter(Boolean);if(!L.length)return 'đối phương';if(L.length>1)return L.every(t=>t.side==='A')?'phe ngươi':'đối phương';return L[0].isMain?'ngươi':L[0].name;}
function hitPh(r,X){const P=r<0.04?['{X} chỉ khẽ lắc người, chẳng hề hấn gì','đòn ấy chỉ sượt qua vạt áo {X}']:r<0.1?['{X} trúng đòn, lùi lại mấy bước','{X} hơi chao đảo, khí tức thoáng rối']:r<0.2?['{X} trúng đòn nặng, loạng choạng suýt ngã','{X} rên khẽ một tiếng, sắc mặt tái đi']:r<0.35?['{X} hộc ra một ngụm máu tươi','khí huyết {X} cuộn trào, máu rỉ nơi khóe miệng']:['{X} bị đánh bay ra xa, máu tươi phun thành vòi','{X} trọng thương, gần như không đứng vững nổi'];return pick(P).replace('{X}',X);}

// ================= ĐỢT 33: LUYỆN KHÍ 13 TẦNG, KHÍ VẬN SAU ĐỘT PHÁ =================
// Luyện Khí chia 13 tầng. Thanh tu vi Luyện Khí kéo tới tầng 13 (100%). Tầng 9 nằm ở 50%: tới đó là đột phá Trúc Cơ được.
// Tầng 1–9 tốn tu vi như cả Luyện Khí cũ; tầng 10–13 mỗi tầng một khó hơn. Tu lên tầng 10–12 thì đột phá được thêm chỉ số,
// tầng 13 thêm một tiên thiên khí vận ngẫu nhiên. Lịch luyện chỉ cần theo kịp tu vi (không cần đầy) mới đột phá được.
// Mỗi tầng một thanh tu vi riêng 0–100% (bên trong vẫn lưu một thang chung cho cả Luyện Khí, chỉ đổi cách hiện).
// Tầng 1–8 đầy thì tự lên tầng sau. Từ tầng 9: đầy thanh thì dừng lại; muốn lên tầng kế phải tự "xung kích".
// Đầy tầng 9 mới được đột phá Trúc Cơ; từ tầng 10 trở đi đột phá lúc nào cũng được.
const LK_TH=[0,50/9,100/9,150/9,200/9,250/9,300/9,350/9,400/9,50,58,68,80],LK_MUL=0.5; // mốc bắt đầu mỗi tầng; tầng 13 đầy ở 100
function lkEnd(g){return g<13?LK_TH[g]:100;}
function lkGate(){return (G.run&&G.run.lkG)||9;}
function lkFull(){return lkOn()&&G.run.tv>=lkEnd(lkGate())-1e-6;}
// tầng đã tu trọn (đầy thanh): đang giữa tầng 11 thì mới trọn tầng 10
function lkDone(){return lkPct()>=100?lkTang():lkTang()-1;}
function lkOn(){const r=G.run;return !!r&&r.realm===0&&!r.pham;}
function lkTang(tv){if(tv==null)tv=G.run.tv;let n=0;for(const t of LK_TH)if(tv>=t-1e-6)n++;return Math.min(n,lkGate());}
function llNeedBt(){return lkOn()?LK_TH[9]:LL_BT;} // Luyện Khí: từ tầng 9 trở lên, đủ lịch luyện của tầng 9 là đột phá được bất cứ lúc nào
{const _tp33=tvPts;tvPts=function(realm){const r=G.run;return realm===0&&r&&r.realm===0&&!r.pham?_tp33(0)/LK_MUL:_tp33(realm);};}
{const _br33=bqReal;bqReal=function(){return _br33()*(lkOn()?LK_MUL:1);};}
{const _tn33=thonapPct;thonapPct=function(){return _tn33()*(lkOn()?LK_MUL:1);};}
{const _at33=addTv;addTv=function(x){return _at33(lkOn()&&x?x*LK_MUL:x);};}
{const _rl33=realmLabel;realmLabel=function(){if(lkOn()){const r=G.run;return qualName(0,(r.quality||[])[0]||0)+' tầng '+lkTang();}return _rl33();};}
{const _rt33=realmText;realmText=function(r){r=r||G.run;if(r===G.run&&lkOn())return REALM[0]+' tầng '+lkTang();return _rt33(r);};}
// thưởng khi đột phá Trúc Cơ từ tầng 10 trở lên
const LK_BON={10:{p:5,n:1,tp:0},11:{p:10,n:2,tp:0},12:{p:15,n:3,tp:1},13:{p:20,n:4,tp:2}};
// khí vận có thể nhận sau khi sinh: bỏ những cái chỉ có nghĩa lúc đầu thai (đổi linh căn, gia cảnh, tính tình)
function kvPool(){const r=G.run;const own=r.kv||[];return Object.values(TT_DEST).filter(d=>!own.includes(d.id)&&!d.mc&&!d.tr&&!TT_FORCE[d.id]&&!['hon_nguyen_dao','ngu_hanh_hop_nhat','ngu_hanh_khuyet_moc','gia_canh_kha_gia'].includes(d.id)&&!/linh căn/i.test(d.description||'')&&!(d.effects||{}).nguHanhBonus);}
function kvOffer(n,to){const L=[];const pool=kvPool();for(let i=0;i<n;i++){const left=pool.filter(d=>!L.includes(d.id));if(!left.length)break;
  const rk=wpick([1,2,3,4,5,6].filter(x=>left.some(d=>d.rank===x)),x=>TT_RW[x]*Math.pow(1.6,((to||1)-1)*(x-1)/2));L.push(wpick(left.filter(d=>d.rank===rk),d=>kvAff(d,G.run&&G.run.root&&G.run.root.els)).id);}return L;}
function kvGain(id,why){const r=G.run;if(!r||!id||!TT_DEST[id])return;r.kv=(r.kv||[]).concat(id);const d=TT_DEST[id];{const a=(d.effects||{}).amDuongBonus;if(a)r.karma=clamp((r.karma||0)+Math.round(((a.chinh||0)-(a.ta||0))/2),-100,100);}log(`Nhận tiên thiên khí vận: ${d.name}${why?' ('+why+')':''}.`);if(typeof bio==='function')bio(`Năm ${Math.floor(r.age)} tuổi, ${r.ten} được khí vận ${d.name}.`);const s=S();r.hp=Math.min(r.hp,s.maxHp);r.mp=Math.min(r.mp,s.maxMp);}
function kvChoose(i){const r=G.run;if(!r||!r.kvPick)return;const id=r.kvPick[+i];r.kvPick=null;kvGain(id,'đột phá');}
{const _bf33=btFinish;btFinish=function(){const r=G.run;const rl=r&&r.realm;const g=r&&rl===0&&!r.pham?lkDone():0;const res=_bf33.apply(this,arguments);const r2=G.run;
  if(r2&&r2.realm>rl&&r2.realm<5){const sc=r2.scene;const ch=sc&&Array.isArray(sc.chips)?sc.chips:null;
    const B=LK_BON[g];if(B){const b=r2.bon;for(const k of ['hpP','mpP','atkP','defP','matkP'])b[k]=(b[k]||0)+B.p;b.ngo=(b.ngo||0)+B.n;b.tam=(b.tam||0)+B.n;b.tp=(b.tp||0)+B.tp;
      const s=S();r2.hp=s.maxHp;r2.mp=s.maxMp;log(`Tu trọn Luyện Khí tầng ${g} rồi mới đột phá: căn cơ vững hơn người thường.`);
      if(ch)ch.push(chip('🏯','trọn tầng '+g+' · căn cơ ▲','Tu trọn Luyện Khí tầng '+g+' rồi mới đột phá.\nKhí huyết, linh lực, công, thủ tăng '+magW(B.p,1)+'; ngộ tính, đạo tâm tăng'+(B.tp?', thân pháp tăng':'')+'.','up'));
      if(g>=13){const id=kvOffer(1,1)[0];if(id){kvGain(id,'tu trọn Luyện Khí tầng 13');if(ch)ch.push(chip('✨',TT_DEST[id].name,'Tu trọn tầng 13 mới đột phá: trời ban một tiên thiên khí vận.\n'+TT_DEST[id].description,'up'));}}}
    const o=kvOffer(3,r2.realm);if(o.length)r2.kvPick=o;}
  return res;};}

// ----- lời kể trận đánh: ai ra đòn, đòn ra sao, đối phương chịu thế nào -----
const EL_FL={kim:['kiếm khí sắc lạnh xé gió lao đi','kim quang lóe lên như chớp giật'],moc:['dây leo linh mộc cuộn trào lao tới','lá xanh hóa thành phi đao bay vút ra'],thuy:['sóng nước cuộn trào ập tới','từng giọt nước hóa thành băng tiễn'],
 hoa:['hỏa diễm bùng lên rực trời','một con hỏa long gầm thét lao ra'],tho:['đất đá rung chuyển, núi đá ầm ầm đè xuống','cát bụi cuộn thành bão'],loi:['lôi quang chớp lóe, tiếng sấm nổ vang','một đạo thiểm điện giáng xuống'],
 bang:['hàn khí ngưng thành băng trùy','sương giá phủ trắng một vùng'],phong:['cuồng phong gào thét cuốn tới','gió sắc như dao cắt tới'],am:['âm khí đen kịt cuộn tới','quỷ ảnh rít lên lao ra'],phat:['Phật quang tỏa rạng, kim chưởng giáng xuống','tiếng chuông Phật ngân vang chấn động'],vo:['chân khí cuộn trào','kình lực ầm ầm ập tới']};
const ATK_P=['Ngươi vận chân khí, tung một chưởng về phía {T}','Ngươi lướt tới như cơn gió, quyền phong rít lên nhắm thẳng {T}','Ngươi điểm ngón tay, một luồng chỉ phong bắn về phía {T}','Ngươi xoay người, tung một cước quét ngang về phía {T}'];
function cbNarr(o){const {u,sk,f,isP,tgN}=o;let a='';const P=[];
  if(isP){
    if(f.guard)a='Ngươi vận khí điều tức, dựng một tầng hộ thể quanh thân'+(o.guardG?', linh lực dần hồi lại':'');
    else if(f.stance)a='Ngươi thu thế, chăm chú chờ đối phương ra đòn';
    else if(sk.id==='_atk')a=pick(ATK_P);
    else if(f.p)a='Ngươi bấm quyết thi triển '+sk.n+', '+pick(EL_FL[sk.el]||EL_FL.vo);
    else{a='Ngươi bấm quyết thi triển '+sk.n;const e=[];if(o.heal)e.push('sinh cơ tràn về, vết thương dần khép lại');if(f.block)e.push('một tầng hộ thể lóe sáng quanh thân');if(f.evade)e.push('thân hình nhòe đi thành tàn ảnh');if(f.rage)e.push('sát khí bốc lên ngùn ngụt');if(f.cleanse)e.push('độc tố trong người tiêu tan');if(f.regen)e.push('linh khí thấm dần vào kinh mạch');if(e.length)a+=', '+e.join(', ');}
  }else{const V=VERB[u.f]||VERB.vat;const it=sk.it;
    if(sk.fx&&sk.fx.charge)a=pick(V.heavy);else if(V[it])a=pick(V[it]);else a=VERB2[it]||'{e} ra tay';a=a.replace('{e}',u.name);}
  if(f.p&&o.hits>1&&o.total)a+=', liền '+numVi(o.hits)+' đòn như mưa sa';
  if(f.p){
    if(o.kiep){if(o.total)P.push('Mây kiếp chấn động, kiếp uy yếu bớt.');}
    else if(!o.total&&o.dod)P.push(pick(['{T} nghiêng mình tránh thoát.','{T} lách người, đòn đánh trượt qua trong gang tấc.','Thân ảnh {T} chợt lóe, né được trong đường tơ kẽ tóc.']));
    else if(!o.total&&o.hits)P.push(pick(['Hộ thể của {T} lóe sáng, đỡ trọn đòn.','Đòn đánh vào hộ thể của {T} như đá ném xuống hồ, không suy suyển.']));
    else if(o.total){if(o.crits)P.push(pick(['Trúng ngay yếu huyệt!','Đánh trúng chỗ sơ hở!']));if(o.blk)P.push('{T} kịp đưa tay đỡ, hóa giải bớt lực đạo.');P.push(hitPh(o.r,'{T}')+'.');if(o.dod)P.push('{T} né được '+(o.dod>1?'vài':'một')+' đòn.');}
    for(const n of o.stunL||[])P.push(n+' bị chấn cho choáng váng.');}
  return capS((a+'.'+(P.length?' '+P.join(' '):'')).replace(/\{T\}/g,tgN));}
// lời kể phát ra giữa lúc ra đòn (gục ngã, choáng…) xếp sau câu ra đòn; số nhỏ đổi thành chữ
{const _cl=clog;clog=function(sc,t,c){t=String(t).replace(/\b(\d{1,2})\b(?!\s*%)/g,(m,n)=>+n<=15?numVi(+n):m);if(sc&&sc._dq){sc._dq.push([t,c]);return;}return _cl(sc,t,c);};}

// ----- Luyện Khí tầng 13: không phải ai cũng tu tới. Mặc định kẹt ở đỉnh tầng 12 (bình cảnh). Mở ra nhờ:
//  · tâm pháp đang vận hành từ Huyền phẩm trở lên (căn cơ công pháp đủ sâu);
//  · đốn ngộ khi bế quan lúc đang kẹt (năm càng dài, ngộ tính càng cao càng dễ);
//  · gặp linh tuyền tẩy tủy khi thăm dò nơi linh khí dồi dào (nơi trung bình thì hiếm hơn).
const LK_CAP=100;
function lk13Open(){const r=G.run;const a=typeof tuArt==='function'&&tuArt();return !!(r&&(r.lk13||(a&&a.tier>=2)));}
function lkCapped(){return lkOn()&&lkGate()===12&&lkFull()&&!lk13Open();}
{const _at34=addTv;addTv=function(x){const res=_at34(x);const r=G.run;if(r&&lkOn()&&!lk13Open()&&r.tv>LK_CAP)r.tv=LK_CAP;return res;};}
function lk13Unlock(why,txt){const r=G.run;if(!r||r.lk13)return;r.lk13=1;log('Bình cảnh tầng 12 đã phá: '+why+'.');if(typeof bio==='function')bio(`Năm ${Math.floor(r.age)} tuổi, ${r.ten} ${why}, phá bình cảnh Luyện Khí tầng 12.`);note('✨ '+txt,'up');}
{const _bc34=bqCustom;bqCustom=function(y){const cap=lkCapped();const res=_bc34(y);const r=G.run;
  if(res&&r&&cap&&lkOn()&&!r.lk13&&y>=0.5&&chance(Math.min(0.35,0.05*y*Math.max(0.5,S().ngo/10)))){lk13Unlock('đốn ngộ khi bế quan','Trong lúc nhập định, một tia linh quang chợt lóe: bình cảnh tầng 12 vỡ tan. Từ nay có thể tu lên tầng 13.');
    const sc=r.scene;if(sc&&Array.isArray(sc.chips))sc.chips.push(chip('✨','đốn ngộ','Phá bình cảnh Luyện Khí tầng 12, có thể tu lên tầng 13','up'));}
  return res;};}
{const _pa34=placeAct;placeAct=function(a){const r=G.run;const sc=r&&r.scene;const n=sc&&sc.type==='place'?nodeById(sc.id):null;const cap=a==='explore'&&lkOn()&&lkTang()>=12&&!lk13Open();
  const res=_pa34(a);
  if(cap&&G.run&&n&&!G.run.lk13){const lv=lkOf(n);if(chance(lv>=3?0.12:lv>=2?0.04:0))lk13Unlock('gặp linh tuyền tẩy tủy ở '+n.name,'Sâu trong '+n.name+' có một mạch linh tuyền. Ngâm mình ba ngày ba đêm, kinh mạch được gột rửa: từ nay có thể tu lên tầng 13.');}
  return res;};}

// tên kiếp: kiếp đầu tiên, kiếp thứ 2…
function kiepName(k){return +k===1?'Kiếp đầu tiên':'Kiếp thứ '+k;}

// phần đã tu của tầng Luyện Khí đang ở (đầy 100% là trọn tầng)
function lkPct(tv){const r=G.run;if(tv==null)tv=r.tv;const g=lkTang(tv);const a=LK_TH[g-1],b=lkEnd(g);return Math.floor(clamp((tv-a)/(b-a),0,1)*100+1e-6);}

// ----- Luyện Khí: chặn tu vi ở đỉnh tầng đang mở; xung kích lên tầng kế -----
{const _at36=addTv;addTv=function(x){const res=_at36(x);const r=G.run;if(r&&lkOn()&&r.tv>lkEnd(lkGate()))r.tv=lkEnd(lkGate());return res;};}
{const _ts36=tvSimAdd;tvSimAdd=function(raw){const v=_ts36(raw);if(!lkOn())return v;return Math.max(0,Math.min(v,lkEnd(lkGate())-G.run.tv));};}
{const _bn36=bqNeedY;bqNeedY=function(){if(!lkOn())return _bn36();const r=G.run;const left=lkEnd(lkGate())-r.tv;return left<=1e-6?0:Math.max(0.25,Math.ceil(left/bqReal()*4)/4);};}
function lkXkState(){if(!lkOn()||lkTang()<9)return null;const g=lkGate();if(g>=13)return null;if(!lkFull())return {ok:false,why:'Tu vi tầng '+g+' chưa đầy, chưa đủ sức xung kích.'};if(g===12&&!lk13Open())return {ok:false,why:'Linh lực xông mãi vẫn không qua được.'};return {ok:true,why:''};}
function lkXk(){const S0=lkXkState();if(!S0||!S0.ok)return false;const r=G.run;r.lkG=lkGate()+1;advanceTime(HM);if(!G.run)return true;const t='Ngươi dồn hết linh lực xông thẳng qua kinh mạch. Một tiếng “rắc” khẽ vang trong người: đã lên Luyện Khí tầng '+r.lkG+'.';log('Xung kích lên Luyện Khí tầng '+r.lkG+'.');note('✨ Lên Luyện Khí tầng '+r.lkG,'up');const sc=r.scene;if(sc&&sc.type==='place'){sc.msg=[t];sc.chips=[chip('✨','tầng '+r.lkG,'Xung kích thành công','up')];}return true;}
{const _pa36=placeActs;placeActs=function(n){const L=_pa36(n);const X=lkXkState();if(X&&n.type!=='ai'&&n.type!=='sao'){const g=lkGate();L.push({a:'xk',i:'✨',l:'Xung kích tầng '+(g+1),h:HM,tip:X.ok?'Dồn linh lực phá quan, lên Luyện Khí tầng '+(g+1)+'.\nTầng càng cao, đột phá Trúc Cơ càng được nhiều lợi.':X.why,dis:!X.ok,x:''});}return L;};}
{const _pa37=placeAct;placeAct=function(a){if(a==='xk'){lkXk();return;}return _pa37(a);};}
// hiện tu vi: ở Luyện Khí là phần trăm của tầng đang ở
function tvShow(){return lkOn()?lkPct():Math.floor(G.run.tv);}
function lkW(g){g=g||lkTang();return lkEnd(g)-LK_TH[g-1];}
function lkShowGain(x){return lkOn()?x*LK_MUL/lkW()*100:x;} // % tu vi (thang cảnh giới) → % của tầng đang ở
function btReadyTv(){return lkOn()?(lkTang()>=10||(lkTang()===9&&lkFull())):G.run.tv>=100;}
// ở Luyện Khí, mất tu vi (đột phá hỏng…) không làm rớt tầng
{const _at38=addTv;addTv=function(x){const r=G.run;if(r&&lkOn()&&x<0){const f=LK_TH[lkTang()-1];const res=_at38(x);if(G.run&&G.run.tv<f)G.run.tv=f;return res;}return _at38(x);};}
{const _bi38=bqInfo;bqInfo=function(){const o=_bi38();if(lkOn())o.full=lkFull();return o;};}

// ================= ĐỢT 37: XUNG KÍCH TIỂU CẢNH GIỚI, ĐỘT PHÁ ĐẠI CẢNH GIỚI =================
// Trong một đại cảnh giới, mỗi tầng (Luyện Khí) hay mỗi kỳ (sơ, trung, hậu) có thanh tu vi riêng 0–100%.
// Đầy thanh thì tu vi dừng lại; muốn lên tầng/kỳ kế phải tự xung kích. Lên đại cảnh giới mới gọi là đột phá.
// Phàm nhân lên Luyện Khí tầng 1 cũng là xung kích.
const SG_TH=[0,100/3,200/3];
function sgOn(){const r=G.run;return !!r&&!r.pham;}
function sgTh(){return G.run.realm===0?LK_TH:SG_TH;}
function sgNat(tv){let n=0;for(const t of sgTh())if(tv>=t-1e-6)n++;return Math.max(1,n);}
function sgGate(){const r=G.run;if(!r)return 1;if(r.sg==null)r.sg=r.realm===0&&r.lkG?r.lkG:sgNat(r.tv); // bản lưu cũ: lấy theo tu vi đang có
  return r.sg;}
function sgEnd(g){const th=sgTh();return g<th.length?th[g]:100;}
function sgTang(tv){if(tv==null)tv=G.run.tv;return Math.min(sgNat(tv),sgGate());}
function sgFull(){return sgOn()&&G.run.tv>=sgEnd(sgGate())-0.15;} // tu vi làm tròn tới 0,1: sát mốc là tính đầy
function sgW(g){g=g||sgTang();return sgEnd(g)-sgTh()[g-1];}
function sgPct(tv){const r=G.run;if(tv==null)tv=r.tv;const g=sgTang(tv);return Math.floor(clamp((tv-sgTh()[g-1])/sgW(g),0,1)*100+1e-6);}
function sgName(g){return G.run.realm===0?'tầng '+g:TIEU[g-1];}
// Luyện Khí dùng chung
function lkGate(){return sgGate();}
function lkTang(tv){return sgTang(tv);}
function lkEnd(g){return sgEnd(g);}
function lkFull(){return lkOn()&&sgFull();}
function lkW(g){return sgW(g);}
function lkPct(tv){return sgPct(tv);}
function tvShow(){return sgOn()?sgPct():Math.floor(G.run.tv);}
function lkShowGain(x){return sgOn()?x*(lkOn()?LK_MUL:1)/sgW()*100:x;}
// xung kích
function lkXkState(){if(!sgOn())return null;const r=G.run;const g=sgGate();const last=sgTh().length;if(g>=last)return null;
  const nx=r.realm===0?'Luyện Khí tầng '+(g+1):REALM[r.realm]+' '+TIEU[g];
  if(!sgFull())return {ok:false,nx,why:'Tu vi '+sgName(g)+' chưa đầy, chưa đủ sức xung kích.'};
  if(r.realm===0&&g===12&&!lk13Open())return {ok:false,nx,why:'Linh lực xông mãi vẫn không qua được.'};return {ok:true,nx,why:''};}
function lkXk(){const X=lkXkState();if(!X||!X.ok)return false;const r=G.run;r.sg=sgGate()+1;if(r.realm===0)r.lkG=r.sg;advanceTime(HM);if(!G.run)return true;
  const s=S();r.hp=Math.max(r.hp,0);clampHp();
  const t='Ngươi dồn hết linh lực xông thẳng qua kinh mạch. Một tiếng “rắc” khẽ vang trong người: đã lên '+X.nx+'.';log('Xung kích lên '+X.nx+'.');note('✨ Lên '+X.nx,'up');
  const sc=r.scene;if(sc&&sc.type==='place'){sc.msg=[t];sc.chips=[chip('✨',X.nx,'Xung kích thành công','up')];}return true;}
// đổi đại cảnh giới (đột phá, dẫn khí nhập thể): về tầng/kỳ đầu
{const _bf37=btFinish;btFinish=function(){const rl=G.run&&G.run.realm;const res=_bf37.apply(this,arguments);if(G.run&&G.run.realm!==rl){G.run.sg=1;G.run.lkG=null;}return res;};}
{const _pu37=phamUp;phamUp=function(){const was=isPham();const res=_pu37.apply(this,arguments);if(was&&G.run&&!isPham()){G.run.sg=1;G.run.lkG=null;}return res;};}
// chặn tu vi ở đỉnh tầng/kỳ đang mở; mất tu vi không rớt tầng/kỳ
{const _at37=addTv;addTv=function(x){const r=G.run;if(!r||!sgOn())return _at37(x);const f=sgTh()[sgTang()-1];const res=_at37(x);const r2=G.run;if(r2&&sgOn()){if(r2.tv>=sgEnd(sgGate())-0.15)r2.tv=sgEnd(sgGate());if(x<0&&r2.tv<f)r2.tv=f;}return res;};}
{const _ts37=tvSimAdd;tvSimAdd=function(raw){const v=_ts37(raw);if(!sgOn())return v;return Math.max(0,Math.min(v,sgEnd(sgGate())-G.run.tv));};}
{const _bn37=bqNeedY;bqNeedY=function(){if(!sgOn())return _bn37();const r=G.run;const left=sgEnd(sgGate())-r.tv;return left<=1e-6?0:Math.max(0.25,Math.ceil(left/bqReal()*4)/4);};}
{const _bi37=bqInfo;bqInfo=function(){const o=_bi37();if(sgOn())o.full=sgFull();return o;};}
// nhãn trên thanh đầu: thêm "xung kích" khi tầng/kỳ đã đầy
function btState(){const r=G.run;if(!r)return '';if(canBreak())return 'dp';const X=lkXkState();if(X&&X.ok)return 'xk';if((isPham()?r.tv>=100:btReadyTv())&&llOf()<llNeedBt())return 'bc';return '';}
// phàm nhân: nút ghi "Xung kích Luyện Khí tầng 1"
{const _pa39=placeActs;placeActs=function(n){const L=_pa39(n);if(isPham())for(const a of L)if(a.a==='bt'){a.l='Xung kích Luyện Khí tầng 1';a.tip='Dẫn khí nhập thể, bước vào Luyện Khí tầng 1.';}return L;};}

// ================= ĐỢT 38: NGHIỀN ÉP, UY ÁP, TỐC CHIẾN =================
// Lực chiến chênh từ 3 lần trở lên (hơn một đại cảnh giới) thì bên mạnh nghiền ép bên yếu:
// bên yếu bị uy áp, đòn đánh chỉ sượt được chút da (1–2 khí huyết); bên mạnh ra đòn nặng gấp rưỡi hơn.
const NE_T=3,NE_UP=2.5;
function uLc(u){return u._lc||lcCalc(u);}
function crushPair(a,b){if(!a||!b||a.kind==='kiep'||b.kind==='kiep')return 0;const x=uLc(a),y=uLc(b);return x>=y*NE_T?1:y>=x*NE_T?-1:0;}
function crushD(u,t,d){const c=crushPair(u,t);if(c>0)return Math.round(d*NE_UP);if(c<0)return d>0?ri(1,2):d;return d;}
function uyApSet(sc){const A=sc.units.filter(u=>u.side==='A'),Bs=sc.units.filter(u=>u.side==='B'&&u.kind!=='kiep');
  for(const u of sc.units){u._lc=lcCalc(u);if(u.st)u.st.uyap=0;}
  for(const a of A)for(const b of Bs){const c=crushPair(a,b);if(c>0)b.st.uyap=1;if(c<0)a.st.uyap=1;}
  const me=mainUnit(sc);
  if(me&&me.st.uyap){const f=Bs.find(b=>crushPair(b,me)>0);clog(sc,`Uy áp của ${f.name} ập xuống như núi đè. Linh lực trong người ngươi trì trệ hẳn, ra tay chẳng khác gì gãi ngứa.`,'en');}
  const low=Bs.filter(b=>b.st.uyap);if(low.length)clog(sc,`Uy áp của ngươi tỏa ra, ${low.map(b=>b.name).join(', ')} run rẩy, khí thế tan nát.`,'me');}
{const _cs38=combatStep;combatStep=function(dt){const sc=G.run&&G.run.scene;if(sc&&sc.type==='combat'&&!sc.prep&&!sc._ua&&!sc.kiep){sc._ua=1;uyApSet(sc);}return _cs38(dt);};}
// so sánh một kẻ địch với nhân vật chính (màn chuẩn bị)
function foeCmp(f,meLc){const q=lcCalc(f)/Math.max(1,meLc);return q>=NE_T?{t:'Nghiền ép',c:'ne'}:q>=1.35?{t:'Mạnh hơn',c:'rt1'}:q>0.75?{t:'Vừa sức',c:'rt2'}:{t:'Yếu hơn',c:'rt3'};}
function meCrushes(sc,meLc){const Bs=sc.units.filter(u=>u.side==='B'&&u.kind!=='kiep');return Bs.length&&Bs.every(b=>meLc>=lcCalc(b)*NE_T);}
function crushAny(sc){return typeof crushVictims==='function'&&sc.units.some(u=>u.kind!=='kiep'&&crushVictims(sc,u).length);}

// ----- lịch luyện hiện theo tầng/kỳ đang ở, như tu vi. Xung kích cần lịch luyện của tầng/kỳ đó từ 65%; đột phá đại cảnh giới vẫn cần đầy.
const XK_LL=0.65;
function llShow(){const ll=llOf();if(!sgOn())return Math.floor(Math.min(100,ll));const g=sgTang();return Math.floor(clamp((ll-sgTh()[g-1])/sgW(g),0,1)*100+1e-6);}
function llShowGain(x){return sgOn()?Math.max(1,Math.round(x/sgW()*100)):Math.max(1,Math.round(x));}
{const _xs40=lkXkState;lkXkState=function(){const X=_xs40();if(!X||!X.ok)return X;const g=sgGate();if(llOf()<sgTh()[g-1]+sgW(g)*XK_LL-1e-6)return {ok:false,ll:1,nx:X.nx,why:'Lịch luyện '+sgName(g)+' mới '+llShow()+'%, cần chừng '+Math.round(XK_LL*100)+'% mới xung kích được. Hãy ra ngoài lịch luyện.'};return X;};}
{const _bs40=btState;btState=function(){const st=_bs40();if(st)return st;const X=lkXkState();return X&&X.ll?'bc':'';};}

// ================= ĐỢT 41: SÀN CÓ KHÍ VẬN TRUNG BÌNH; THIÊN PHÚ 5 BẬC CHO NGƯỜI CHƠI VÀ NPC =================
// Người chuẩn dùng làm sàn cũng mang khí vận và thể chất ở mức trung bình (lấy mẫu 3000 lần đầu thai),
// nên ai có khí vận trung bình thì ra "Bình thường", hơn mới ra "Mạnh".
const TT_AVG={matkP:2.64,mpP:0.63,than:1.58,atkP:2.86,defP:2.67,tp:0.69,ngo:1.53,lifeP:0.25,hpP:1,crit:0.48,tvP:2.42,tam:0.43,bqP:0.31,dodge:0.21,critDmg:0.62};
{const _ag41=aggFx;aggFx=function(){const fx=_ag41();const r=G.run;if(r&&r._avgTT)for(const [k,v] of Object.entries(TT_AVG))fx[k]=(fx[k]||0)+v;return fx;};}
// Thiên phú: tố chất bẩm sinh, không tính đồ đạc hay cảnh giới. Gộp linh căn, tư chất, tiên thiên khí vận, thể chất, ngộ tính/đạo tâm/khí vận gốc.
const TAL_N=['Phế vật','Bình phàm','Bất phàm','Tinh anh','Thiên kiêu'];
const TAL_T=[0.94,1.37,1.88,2.52]; // mốc chia 5 bậc (cân theo lấy mẫu: ~10% · 25% · 35% · 22% · 8%)
const TAL_RL={tap:0,tu:1,tam:2,song:3,thien:4,bien:4,cuc:4};
function talScore(p){const root=TAL_RL[p.root]!=null?TAL_RL[p.root]:2;const tc=clamp(p.tc,0,4);const kv=Math.min(4,p.kv*0.8);const th=Math.min(4,Math.max(0,(p.th-1)*1.2));const bs=clamp(2+p.dev*0.5,0,4);
  return (1.3*root+1.3*tc+kv+th+0.6*bs)/5.2;}
function talTierOf(sc){let t=0;for(const x of TAL_T)if(sc>=x)t++;return t;}
function playerTalProfile(r){r=r||G.run;const tc=4-TC_N.findIndex(x=>tuChat()>=x[0]);return {root:r.root.id,tc,kv:(r.kv||[]).reduce((a,k)=>a+(((TT_DEST[k]||{}).rank||1)-1),0),
  th:Math.max(1,...(r.the||[]).map(k=>(ttPhysOf(k)||{}).rank||1)),dev:(r.base.ngo-10)+(r.base.tam-9)+(r.base.van-4)};}
function playerTal(){const r=G.run;if(!r)return null;const p=playerTalProfile(r);const sc=talScore(p);return {tier:talTierOf(sc),score:sc,p};}
// NPC: tạo hồ sơ bẩm sinh theo đúng cách nhân vật chính được sinh ra, cố định theo tên (gặp lại vẫn y nguyên)
function seedRng(key){let a=hashS(String(key))>>>0;return ()=>{a=(a+0x6D2B79F5)>>>0;let t=a;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return ((t^(t>>>14))>>>0)/4294967296;};}
function npcTalProfile(key){const R1=seedRng('tal:'+key);const wp=(L,w)=>{let s=L.reduce((a,x)=>a+w(x),0)*R1();for(const x of L){s-=w(x);if(s<=0)return x;}return L[L.length-1];};
  const root=wp(ROOT,x=>x.w).id;const tcv=clamp(Math.floor(R1()*41)+Math.floor(R1()*41)+10+(TC_BIAS[root]||0),5,100);const tc=4-TC_N.findIndex(x=>tcv>=x[0]);
  const n=wp([1,2,3],x=>[40,45,15][x-1]);let kv=0;for(let i=0;i<n;i++)kv+=wp([1,2,3,4,5,6],x=>TT_RW[x])-1;
  const th=wp([1,2,3,4,5,6],x=>[35,20,20,17,6,2][x-1]);const dev=[0,0,0].reduce(a=>a+Math.floor(R1()*5)-2,0);return {root,tc,kv,th,dev};}
const NPC_TAL_C={};
function npcTal(key,minTier){const k=key+'|'+(minTier||0);if(NPC_TAL_C[k])return NPC_TAL_C[k];const p=npcTalProfile(key);const sc=talScore(p);const o={tier:Math.max(minTier||0,talTierOf(sc)),score:sc,p};NPC_TAL_C[k]=o;return o;}
// thiên kiêu các tông môn: ít nhất là Tinh anh, thiên tư cao thì là Thiên kiêu
function rivalTal(i){const w=W();const rv=w.rivals[i];if(!rv)return null;return npcTal('rv:'+rv.ten,rv.tal>=1.2?4:3);}
// đơn vị trong trận và thực thể trên bản đồ: chỉ người mới có thiên phú
function unitTal(u){if(!u)return null;if(u.isMain)return playerTal();if(u.kind==='kiep'||u.immune)return null;if(u.side==='A')return u.ally===-7?null:npcTal('ally:'+u.name);if(u.f&&u.f!=='nhan')return null;return npcTal('foe:'+u.name);}
function entTal(e){if(!e)return null;if(e.type==='thienkieu')return e.data&&e.data.rv!=null?rivalTal(e.data.rv):null;if(['khach','tuantra','truysat','thuong'].includes(e.type))return npcTal('ent:'+e.id+':'+e.name);return null;}

// ----- khí vận hợp linh căn: mỗi khí vận có một "tính" (cương, linh, tốc, liệt) gắn với hai hành, hoặc trung tính.
// Lúc đầu thai và lúc chọn khí vận sau đột phá: khí vận hợp linh căn dễ ra gấp đôi, khí vận tương khắc chỉ còn một nửa.
const KV_GRP={cuong:{k:['physicalStrength','physicalBody','maxHp','maxStamina','hpRegen','critResist','damageReduction','counterDamage'],els:['kim','tho'],n:'Cương'},
  linh:{k:['spiritualSense','aptitude','maxMentalState','maxSpiritPower','spRegen','resIce','dmgIce'],els:['thuy','bang'],n:'Linh'},
  toc:{k:['agility','attackSpeed','evasion','accuracy','dmgWind'],els:['phong','moc'],n:'Tốc'},
  liet:{k:['magicPower','critChance','critDamage','armorPen','dmgLightning','dmgFire','lifeSteal'],els:['hoa','loi'],n:'Liệt'}};
function kvGroup(d){const E=(d&&d.effects)||{};const nb=E.nguHanhBonus;if(nb){const L=Object.entries(nb).filter(([e,v])=>v>0).map(([e])=>e);if(L.length)return {g:'hanh',els:L.includes('all')?NGUHANH.slice():L};}
  const sc={};for(const o of [E.attributeChangePercent,E.primaryStatChangePercent])if(o)for(const [k,v] of Object.entries(o))if(v>0)for(const [g,G0] of Object.entries(KV_GRP))if(G0.k.includes(k))sc[g]=(sc[g]||0)+v;
  const best=Object.entries(sc).sort((a,b)=>b[1]-a[1])[0];return best?{g:best[0],els:KV_GRP[best[0]].els}:null;}
function kvAff(d,rootEls){const G0=kvGroup(d);if(!G0||!rootEls||!rootEls.length)return 1;const R=rootEls;if(G0.els.some(e=>R.includes(e)))return 2;
  const kh=(a,b)=>typeof KHAC!=='undefined'&&KHAC[a]===b;if(G0.els.some(e=>R.some(r=>kh(r,e)||kh(e,r))))return 0.5;return 1;}
ttRoll=function(els){const n=wpick([1,2,3],x=>[40,45,15][x-1]);const L=[];const all=Object.values(TT_DEST);
  for(let i=0;i<n;i++){const rk=wpick([1,2,3,4,5,6],x=>TT_RW[x]);const pool=all.filter(d=>d.rank===rk&&!L.includes(d.id));if(pool.length)L.push(wpick(pool,d=>kvAff(d,els)).id);}return L;}
// hiệu ứng chữ khi ra đòn / dùng vật phẩm, và hiệu ứng hồi chỉ số
const FXG_K=['hp','mp','dl','than','tl'];
function fxSnap(sc){return sc.units.map(u=>[u,u.hp,u.mp||0,u.dl==null?100:u.dl,u.than||0,u.tl==null?100:u.tl]);}
function fxGains(sc,snap,all){for(const s of snap){const u=s[0];if(u.hp<=0)continue;const now=[u.hp,u.mp||0,u.dl==null?100:u.dl,u.than||0,u.tl==null?100:u.tl];
  for(let i=0;i<5;i++){if(i>=2&&!all)continue;const mx=i===0?u.max:i===1?u.maxMp:100;if(!mx)continue;if(now[i]-s[i+1]>mx*0.02)cfx(sc,{k:'gain',id:u.id,s:FXG_K[i]});}}}
{const _rsA=resolveSkill;resolveSkill=function(sc,u,sk,lv,tg,qm,offs){const snap=fxSnap(sc);
  const nm=/thường/i.test(sk.n||'')?'Tấn công':sk.n;if(nm)cfx(sc,{k:'act',id:u.id,n:nm});
  const res=_rsA.apply(this,arguments);fxGains(sc,snap,!(sk.fx&&sk.fx.p));return res;};}
playerPillAct=function(idx){const sc=G.run.scene;const u=readyPlayer(sc);if(!u)return false;
  syncMain(sc);const snap=fxSnap(sc);const m=usePill(idx,true);if(!m)return false;
  runAct(sc,()=>{u.hp=G.run.hp;u.mp=G.run.mp;cfx(sc,{k:'act',id:u.id,n:m});fxGains(sc,snap,true);clog(sc,'Ngươi nuốt vội '+m+', dược lực lan khắp kinh mạch.','me');toRecover(sc,u,0.8);doneAct(sc,u);});return true;};
{const _pb=playerBurn;playerBurn=function(k){const sc=G.run&&G.run.scene;const ok=_pb(k);if(ok&&sc){const u=mainUnit(sc);cfx(sc,{k:'act',id:u.id,n:k==='tinh'?'Thiêu đốt tinh huyết':k==='tho'?'Thiêu đốt thọ nguyên':'Huyết tế'});cfx(sc,{k:'burst',id:u.id,t:k});}return ok;};}

// phàm nhân chưa có thần thức, linh lực: ẩn các lựa chọn cần đến tu vi
const PHAM_RX=/thần thức|linh lực|pháp lực|pháp thuật|chân khí|vận công|luyện hóa|ngự kiếm|phi kiếm/i;
{const _vc=visChoices;visChoices=function(sc){const L=_vc(sc);if(!isPham())return L;const F=L.filter(({c})=>!((c.l&&c.l[0]!=='{'&&PHAM_RX.test(c.l))||(c.cost&&c.cost.mp)));return F.length?F:L;};}
// chuyện đặc biệt ở trà lâu/khách điếm/tửu phường: lăn khi vào địa điểm, không bị xóa khi mở quán khác
venueSpec=function(n,v){const r=G.run,w=W();const a=n.vsp;
  if(a&&a.k===r.kiep&&a.until>w.t)return a.v===v?a.until-w.t:0;
  if(!a||a.k!==r.kiep||w.t>=(a.next||0)){n.vsp={k:r.kiep,v,until:chance(.35)?w.t+ri(4,12):-1,next:w.t+ri(12,36)};return n.vsp.until>w.t&&n.vsp.v===v?n.vsp.until-w.t:0;}
  return 0;};
{const _op=openPlace;openPlace=function(id){_op(id);const r=G.run;const n=nodeById(id==null?r.at:id);if(!n)return;const V=placeActs(n).map(a=>a.a).filter(k=>VENUE_N[k]);if(V.length)venueSpec(n,pick(V));};}
// Thiên phú (bản khắt khe): gốc rễ bên trong, không phải sức chiến đấu.
// Gồm: linh căn, tư chất, ngộ tính, phẩm cao nhất của tiên thiên khí vận, phẩm cao nhất của thể chất, đạo cơ.
// Tạp linh căn tối đa Bình phàm; tư chất hạ phẩm tối đa Bất phàm.
const TAL_W={root:1.4,tc:1.4,ngo:1.0,kv:0.8,th:0.8,dao:0.6};
talScore=function(p){const root=TAL_RL[p.root]!=null?TAL_RL[p.root]:2;const tc=clamp(((p.tcv!=null?p.tcv:20+p.tc*18)-20)/18,0,4);
  const ngo=clamp(((p.ngo!=null?p.ngo:10)-8)/1.5,0,4);const kv=clamp(((p.kvMax||1)-1)*0.8,0,4);const th=clamp(((p.th||1)-1)*0.8,0,4);const dao=clamp((p.dao||0)/5,0,4);
  const W0=TAL_W;return (W0.root*root+W0.tc*tc+W0.ngo*ngo+W0.kv*kv+W0.th*th+W0.dao*dao)/(W0.root+W0.tc+W0.ngo+W0.kv+W0.th+W0.dao);};
function talCap(p){let c=4;if(p.root==='tap')c=Math.min(c,1);if((p.tcv!=null?p.tcv:50)<35)c=Math.min(c,2);return c;}
playerTalProfile=function(r){r=r||G.run;const tcv=tuChat();return {root:r.root.id,tcv,tc:4-TC_N.findIndex(x=>tcv>=x[0]),ngo:r.base.ngo,
  kvMax:Math.max(1,...(r.kv||[]).map(k=>(TT_DEST[k]||{}).rank||1)),th:Math.max(1,...(r.the||[]).map(k=>(ttPhysOf(k)||{}).rank||1)),dao:r.dao||0};};
playerTal=function(){const r=G.run;if(!r)return null;const p=playerTalProfile(r);const sc=talScore(p);return {tier:Math.min(talCap(p),talTierOf(sc)),score:sc,p};};
npcTalProfile=function(key){const R1=seedRng('tal:'+key);const wp=(L,w)=>{let s=L.reduce((a,x)=>a+w(x),0)*R1();for(const x of L){s-=w(x);if(s<=0)return x;}return L[L.length-1];};
  const root=wp(ROOT,x=>x.w).id;const tcv=clamp(Math.floor(R1()*41)+Math.floor(R1()*41)+10+(TC_BIAS[root]||0),5,100);const tc=4-TC_N.findIndex(x=>tcv>=x[0]);
  const n=wp([1,2,3],x=>[40,45,15][x-1]);let kvMax=1;for(let i=0;i<n;i++)kvMax=Math.max(kvMax,wp([1,2,3,4,5,6],x=>TT_RW[x]));
  const th=wp([1,2,3,4,5,6],x=>[35,20,20,17,6,2][x-1]);const ngo=8+Math.floor(R1()*5)+(R1()<0.3?Math.floor(R1()*4):0);const dao=Math.floor(R1()*6);return {root,tcv,tc,ngo,kvMax,th,dao};};
npcTal=function(key,minTier){const k=key+'|'+(minTier||0);if(NPC_TAL_C[k])return NPC_TAL_C[k];const p=npcTalProfile(key);const sc=talScore(p);const o={tier:Math.max(minTier||0,Math.min(talCap(p),talTierOf(sc))),score:sc,p};NPC_TAL_C[k]=o;return o;};
TAL_T.splice(0,4,1.05,1.62,2.05,2.45);
// ----- Phẩm Trúc Cơ theo tầng Luyện Khí lúc đột phá (thay cho cách tính theo đạo cơ, chỉ ở Trúc Cơ) -----
// Thứ tự từ thấp lên cao: Nhân đạo → Hoàn mỹ → Địa đạo → Thiên đạo. Hoàn mỹ dùng chỉ số 4 trong bảng phẩm.
//  · đột phá ở tầng 9: Nhân đạo
//  · tầng 10–13: Hoàn mỹ
//  · tầng 10–13, không dùng Trúc Cơ Đan, tâm pháp đang tu từ Địa phẩm trở lên và đã học hết các tầng: Địa đạo
//  · tầng 13, đủ điều kiện trên với tâm pháp Thiên phẩm trở lên và luyện thể tầng 10: Thiên đạo
QNAME[4]='Hoàn mỹ';QPRE[4]='Hoàn Mỹ';QMUL[4]=1.09;QLIFE[4]=7;
const LT_REQ=10; // luyện thể chưa có: tạm để mốc tầng 10, sau thay giá trị thật
function ltTang(){const r=G.run;return (r&&r.lt)||0;}
function tcQual(dan){const r=G.run;const g=lkDone();if(g<10)return {q:1,g,why:[]};const a=tuArt();const full=!!(a&&a.lv>=a.lines.length);const why=[];
  if(dan)why.push('đã dùng Trúc Cơ Đan');if(!a||a.tier<3)why.push('tâm pháp chưa tới Địa phẩm');if(a&&!full)why.push('tâm pháp chưa học hết các tầng');
  if(why.length)return {q:4,g,why};
  if(g>=13&&a.tier>=4&&ltTang()>=LT_REQ)return {q:3,g,why:[]};
  const w2=[];if(g<13)w2.push('chưa tu trọn tầng 13');if(a.tier<4)w2.push('tâm pháp chưa tới Thiên phẩm');if(ltTang()<LT_REQ)w2.push('luyện thể chưa tới tầng '+LT_REQ);return {q:2,g,why:w2};}
function tcOn(){const r=G.run;return !!(r&&r.realm===0&&!isPham()&&lkOn());}
{const _ps=prepStart;prepStart=function(){const r=G.run,sc=r&&r.scene;if(sc&&sc.type==='prep')r._tcDan=sc.slots.some(i=>r.pills[i]&&r.pills[i].id==='trucco');return _ps.apply(this,arguments);};}
{const _bfq=btFinish;btFinish=function(){const r=G.run;if(r&&r.bt&&r.bt.to===1&&tcOn()){const Q=tcQual(r._tcDan).q;const _q=qOf;qOf=()=>Q;try{return _bfq.apply(this,arguments);}finally{qOf=_q;if(G.run)G.run._tcDan=0;}}return _bfq.apply(this,arguments);};}
{const _pv=prepView;prepView=function(){const v=_pv();if(tcOn()){const sc=G.run.scene;const dan=sc.slots.some(i=>G.run.pills[i]&&G.run.pills[i].id==='trucco');const T0=tcQual(dan);v.q=T0.q;v.tcWhy=T0.why;v.next=null;}return v;};}
// Trúc Cơ: đạo cơ là thêm một điều kiện cho từng phẩm (Hoàn mỹ ≥3, Địa đạo ≥6, Thiên đạo ≥10) và cộng tỉ lệ thành công
const TC_DAO={4:3,2:6,3:10};// đạo cơ đủ (từ 3) cộng vừa phải; thiếu thì trừ mạnh, càng thiếu trừ càng nặng
function tcDaoRate(d){return d>=10?0.10:d>=6?0.08:d>=3?0.05:[-0.35,-0.20,-0.10][Math.max(0,Math.floor(d))];}
tcQual=function(dan,dao){const r=G.run;dao=dao==null?(r.dao||0):dao;const g=lkDone();if(g<10)return {q:1,g,why:['đột phá ở tầng '+Math.max(g,9)+', cần từ tầng 10']};
  const a=tuArt();const full=!!(a&&a.lv>=a.lines.length);
  if(dao<TC_DAO[4])return {q:1,g,why:['đạo cơ '+dao+', cần '+TC_DAO[4]+' cho Hoàn mỹ']};
  const why=[];if(dan)why.push('đã dùng Trúc Cơ Đan');if(!a||a.tier<3)why.push('công pháp chưa tới Địa phẩm');if(a&&!full)why.push('công pháp chưa học hết các tầng');if(dao<TC_DAO[2])why.push('đạo cơ '+dao+', cần '+TC_DAO[2]);
  if(why.length)return {q:4,g,why};
  const w2=[];if(g<13)w2.push('chưa tu trọn tầng 13');if(a.tier<4)w2.push('công pháp chưa tới Thiên phẩm');if(ltTang()<LT_REQ)w2.push('luyện thể chưa tới tầng '+LT_REQ);if(dao<TC_DAO[3])w2.push('đạo cơ '+dao+', cần '+TC_DAO[3]);
  return w2.length?{q:2,g,why:w2}:{q:3,g,why:[]};};
btFinish=(function(prev){return function(){return prev.apply(this,arguments);};})(btFinish);
{const _bfq2=btFinish;btFinish=function(){const r=G.run;if(r&&r.bt&&r.bt.to===1&&tcOn()){const dan=r._tcDan;const _q=qOf;qOf=p=>tcQual(dan,p).q;try{return _bfq2.apply(this,arguments);}finally{qOf=_q;}}return _bfq2.apply(this,arguments);};}
{const _pv2=prepView;prepView=function(){const v=_pv2();if(tcOn()){const sc=G.run.scene;const dan=sc.slots.some(i=>G.run.pills[i]&&G.run.pills[i].id==='trucco');const T0=tcQual(dan,v.dao);v.q=T0.q;v.tcWhy=T0.why;}return v;};}
{const _br=btRate;btRate=function(slots){const p=_br(slots);if(!tcOn())return p;const e=btEff(slots||[]);const d=(G.run.dao||0)+e.dao;return clamp(p+tcDaoRate(d),0.05,0.97);};}
// ===== Chỉ số khi lên cảnh giới: căn cốt bẩm sinh gần như đứng yên, cái luyện ra thì tăng mạnh =====
// ngộ tính: rất ít (+1 mỗi 2 đại cảnh giới); đạo tâm, khí vận, tư chất: không đổi theo cảnh giới;
// thần thức (thần lực) và thân pháp: tăng rất mạnh; chỉ số chiến đấu: như cũ (tăng mạnh); chí mạng, bạo thương: tăng ít.
{const _Sx=S;S=function(){const s=_Sx();const r=G.run;if(!r)return s;const R0=r.realm||0,t=tieu();
  s.ngo+=Math.floor(R0/2)-R0*2;s.tam-=R0*2;
  s.tp+=R0*6+t;s.ne+=R0*6+t;
  s.than=Math.round(s.than-2*R0+15*R0+t*1.5);s.nl=Math.round(s.than*3);
  s.crit+=R0*0.6;s.critDmg+=R0*4;
  // đại viên mãn: +5% khí huyết, linh lực, công, thủ
  if(dvm()){for(const k of ['maxHp','maxMp','atk','def','matk'])s[k]=Math.round(s[k]*1.05);s.dvm=1;}
  return s;};}
// bù cho tỉ lệ đột phá (trước đây ngộ tính, đạo tâm tự tăng theo cảnh giới và góp vào tỉ lệ)
{const _brx=btRate;btRate=function(slots){const r=G.run;const R0=r.realm||0;return clamp(_brx(slots)+(R0*4-Math.floor(R0/2))*0.012,0.05,0.97);};}
// tâm ma giảm nhẹ khi xung kích tiểu cảnh giới / đột phá đại cảnh giới
{const _xk=lkXk;lkXk=function(){const ok=_xk.apply(this,arguments);const r=G.run;if(ok&&r)r.tamma=Math.max(0,(r.tamma||0)-2);return ok;};}
{const _bfz=btFinish;btFinish=function(){const r=G.run;const rl=r&&r.realm;const res=_bfz.apply(this,arguments);const r2=G.run;if(r2&&r2.realm>rl)r2.tamma=Math.max(0,(r2.tamma||0)-5);return res;};}

// ===== Tiểu cảnh giới: sơ kỳ → trung kỳ → hậu kỳ → đỉnh phong (đầy tu vi) → đại viên mãn =====
TIEU[3]='đỉnh phong';
// Luyện Khí: tầng 1–3 sơ, 4–6 trung, 7–9 hậu, 10–12 đỉnh phong, 13 bán bộ Trúc Cơ
{const _ti=tieu;tieu=function(){if(typeof lkOn==='function'&&lkOn()){const g=lkTang();return g>=10?3:g>=7?2:g>=4?1:0;}return _ti();};}
function dinhPhong(){const r=G.run;return !!(r&&!isPham()&&r.realm<5&&tieu()===3);}
const DVM_TAMMA=25,DVM_TAM=12; // đại viên mãn: tâm ma dưới 25, đạo tâm từ 12 (mức Cao)
function dvmTam(){const r=G.run;return r.base.tam+(r.bon.tam||0)+((aggFx().tam)||0);}
function dvmWhy(){const r=G.run;if(!dinhPhong())return 'chưa tới đỉnh phong';const L=[];if(injured())L.push('đang trọng thương');if((r.tamma||0)>=DVM_TAMMA)L.push('tâm ma từ '+DVM_TAMMA+' trở lên');if(dvmTam()<DVM_TAM)L.push('đạo tâm chưa đủ cao');return L.join(', ');}
let _dvmIn=0;function dvm(){if(_dvmIn)return false;_dvmIn=1;try{return dinhPhong()&&!dvmWhy();}finally{_dvmIn=0;}}

// ===== Bán bộ: dùng được đồ của cảnh giới sau, chỉ số vẫn như cũ =====
//  · tạm thời: xung quan thành công, đang vượt thiên kiếp/tâm ma kiếp
//  · lâu dài: Luyện Khí tầng 13; hoặc đang đỉnh phong và vận hành tâm pháp của cảnh giới sau
function chuRaw(){const r=G.run;const n=chuSlots();const L=[];for(let i=0;i<n;i++){const a=r.chu[i]&&artBy(r.chu[i].u);if(a)L.push(a);}return L;}
function bbTemp(){const r=G.run;return !!(r&&r.bt&&r.bt.stages&&r.bt.stages.length&&r.bt.to===r.realm+1);}
function bbKind(){const r=G.run;if(!r||isPham()||r.realm>=5)return '';if(bbTemp())return 'temp';if(lkOn()&&lkTang()>=13)return 'lk13';
  if(dinhPhong()&&chuRaw().some(a=>a.type==='tp'&&a.req===r.realm+1))return 'tp';return '';}
function bb(){return !!bbKind();}
function effRealm(){const r=G.run;return (r.realm||0)+(bb()?1:0);}
{const _plv=plv;plv=function(){return _plv()+(G.run&&!isPham()&&bb()?1:0);};}
// tầng công pháp và học bí tịch theo cảnh giới hiệu lực
artOpen=function(a,i){const x=a.lines[i];return i<a.lv&&effRealm()>=x.req;};
artNextWhy=function(a){if(a.lv>=a.lines.length)return 'Đã tham ngộ hết các tầng.';const x=a.lines[a.lv];if(effRealm()<x.req)return 'Tầng kế tiếp cần '+reqName(x.req)+'.';return '';};
// ngộ tính vượt xa người thường: đọc hiểu được công pháp/tâm pháp của cảnh giới kế tiếp (mức Tinh anh, Thiên kiêu)
const NGO_BB={1:20,2:24,3:28,4:32};
function ngoLearn(req){const r=G.run;return req===r.realm+1&&NGO_BB[req]!=null&&S().ngo>=NGO_BB[req];}
{const _lw=learnWhy;learnWhy=function(rel){const r=G.run;const w=_lw(rel);if(!w||!rel||!rel.art||!/mới đọc hiểu/.test(w))return w;const q=rel.art.req;
  if(effRealm()>=q||ngoLearn(q))return '';return w+(q===r.realm+1&&NGO_BB[q]?' Hoặc ngộ tính từ '+NGO_BB[q]+' (đang có '+S().ngo+').':'');};}
// công pháp/tâm pháp vượt cảnh giới: học được nhưng chưa chắc dùng được
function artUseWhy(a){const r=G.run;if(!a||a.req<=effRealm())return '';if(a.req===r.realm+1&&a.type==='tp'){return dinhPhong()?'':'Tâm pháp '+reqName(a.req)+': phải tới đỉnh phong mới vận hành được.';}
  return 'Cần '+reqName(a.req)+' (hoặc bán bộ '+reqName(a.req)+') mới dùng được.';}
{const _aa=activeArts;activeArts=function(){return _aa().filter(a=>!artUseWhy(a));};}
// Thiên đạo Trúc Cơ: chắc chắn gặp 3 đạo lôi kiếp
{const _bs=btStages;btStages=function(to){const L=_bs(to);const r=G.run;if(to===1&&tcOn()&&tcQual(r._tcDan,r.dao||0).q===3)return [{n:3}];return L;};}
// tên cảnh giới hiển thị
{const _rl=realmLabel;realmLabel=function(){const r=G.run;if(!r||isPham())return _rl();const k=bbKind();if(k&&k!=='temp'&&r.realm<5)return 'Bán bộ '+REALM[r.realm+1];if(k==='temp')return 'Bán bộ '+REALM[r.realm+1]+' (đang độ kiếp)';
  const b=_rl();return dvm()?b.replace(/đỉnh phong$/,'')+(lkOn()?' · đại viên mãn':'đại viên mãn'):b;};}
// ===== Cưỡng ép lĩnh ngộ trước khi độ kiếp (đang bán bộ tạm thời) =====
WOUND.thanbb={n:'Thức hải trọng thương',m:[1,3],fx:{ngo:-3,tam:-2},d:'Cưỡng ép lĩnh ngộ công pháp cảnh giới trên để độ kiếp. Thần thức và niệm lực chỉ còn bốn phần mười.'};
const BB_THAN=0.4;
{const _Sb=S;S=function(){const s=_Sb();const r=G.run;if(r&&(r.wounds||[]).some(x=>x.k==='thanbb')){s.than=Math.round(s.than*BB_THAN);s.nl=Math.round(s.than*3);}return s;};}
function bbBooks(){const r=G.run;if(!r||!bbTemp())return [];return r.relics.map((x,i)=>({x,i})).filter(o=>o.x.k==='book'&&o.x.art&&o.x.art.req===r.realm+1&&!arts().some(a=>a.n===o.x.art.n&&a.type===o.x.art.type));}
function bbForceLearn(i){const r=G.run;const rel=r.relics[i];if(!rel||rel.k!=='book'||!bbTemp())return null;const a=rel.art;normArt(a);
  if(arts().filter(x=>x.type===a.type).length>=artCap(a.type))return 'Đã đủ ô '+(a.type==='cp'?'công pháp':'tâm pháp')+', không chứa thêm được.';
  r.relics.splice(i,1);r.arts.push(a);const n=chuSlots();for(let j=0;j<n;j++)if(!r.chu[j]){r.chu[j]={k:'a',u:a.u};break;}
  addWound('thanbb','cưỡng ép lĩnh ngộ');log(`Cưỡng ép lĩnh ngộ ${a.n} trước giờ độ kiếp, thức hải rạn nứt.`);syncSkills();clampHp();saveSoon();return '';}
// ===== Thần thức trong trận: đủ thì dò được khí huyết, linh lực, định lực… của đối phương =====
function unitLv(u){const r=G.run;if(u.kind==='kiep')return (r.bt&&r.bt.to)||r.realm+1;if(r.bt&&u.k==='tamma')return r.bt.to||r.realm+1;return (r.region||0)+(u.boss?1:u.elite?0.5:0);}
function seeNeed(u){return Math.round(10+10.5*unitLv(u));}
function canSee(u){if(!u||u.side!=='B')return true;return S().than>=seeNeed(u);}
// ===== Độ kiếp thành công: hồi đầy, xóa thương tích và trạng thái bất lợi =====
{const _bfk=btFinish;btFinish=function(){const r=G.run;const k=!!(r&&r.bt&&r.bt.stages&&r.bt.stages.length);const rl=r&&r.realm;const res=_bfk.apply(this,arguments);const r2=G.run;
  if(k&&r2&&r2.realm>rl){r2.wounds=(r2.wounds||[]).filter(x=>x.perm);r2.inj=null;r2.ht=[];const s=S();r2.hp=s.maxHp;r2.mp=s.maxMp;const sc=r2.scene;if(sc&&Array.isArray(sc.chips))sc.chips.push(chip('✨','thân thể như mới','Độ kiếp thành công: hồi đầy, mọi thương tích và trạng thái bất lợi đều tan','up'));}
  return res;};}
// ===== Thần thức trong trận (bản mới): vượt cấp thì hầu như không thấy, trừ khi thần thức thật cao =====
// mức cần = thần thức của người bình thường ở cấp đối phương: 12 + 15 × cấp
unitLv=function(u){const r=G.run;if(u.kind==='kiep')return (r.bt&&r.bt.to)||r.realm+1;if(r.bt&&u.k==='tamma')return r.bt.to||r.realm+1;return (r.region||0)+(u.boss?0.6:u.elite?0.3:0);};
seeNeed=function(u){return Math.round(12+15*unitLv(u));};
// lý lịch (tên, chức vụ…) của người lạ: chỉ biết khi quen biết hoặc đã có tin tức
function knownNames(){const r=G.run,w=W();const K=new Set(r.known||[]);for(const x of r.rivals||[]){const wr=w.rivals[x.i];if(wr)K.add(wr.ten);}for(const s of r.seeds||[])K.add(s.ten);for(const p of r.party||[])K.add(p.ten);if(w.nemesis)K.add(w.nemesis.n);return K;}
function isHumanFoe(u){return u&&u.side==='B'&&u.kind!=='kiep'&&u.k!=='tamma'&&(u.f==='nhan'||u.kind==='nhan');}
function knowUnit(u){if(!isHumanFoe(u))return true;const n=u.realName||u.name;return knownNames().has(n);}
function addKnown(n){const r=G.run;if(!r||!n)return;r.known=r.known||[];if(!r.known.includes(n)){r.known.push(n);if(r.known.length>200)r.known.shift();}}
// trận đánh: người lạ hiện là "???"; đánh xong thì biết mặt biết tên
{const _scK=startCombat;startCombat=function(spec,after){const res=_scK(spec,after);const sc=G.run&&G.run.scene;if(sc&&sc.type==='combat')for(const u of sc.units)if(isHumanFoe(u)&&!knowUnit(u)){if(sc.en&&sc.en.n===u.name){sc.en.realN=sc.en.n;sc.en.n='???';}u.realName=u.name;u.realSub=u.sub;u.name='???';u.sub='???';}return res;};}
{const _fcK=finishCombat;finishCombat=function(sc){if(sc&&sc.en&&sc.en.realN){sc.en.n=sc.en.realN;delete sc.en.realN;}if(sc&&sc.units)for(const u of sc.units)if(u.realName){addKnown(u.realName);u.name=u.realName;u.sub=u.realSub;}return _fcK(sc);};}
{const _me=meetEnt;meetEnt=function(e){if(e&&e.name)addKnown(e.name);return _me(e);};}

// ===== Học gấp cuốn thứ hai trước giờ độ kiếp: cần vật bảo mệnh và thần thức đủ, không thì thần thức tan vỡ mà chết =====
function bbGuards(){const r=G.run;return r.pills.map((p,i)=>({p,i})).filter(o=>PILL[o.p.id]&&PILL[o.p.id].bt&&PILL[o.p.id].bt.guard);}
function bb2Need(){const r=G.run;return Math.round((12+15*((r.bt&&r.bt.to)||r.realm+1))*0.5);}
function bbCount(){const r=G.run;return (r.bt&&r.bt.bbN)||0;}
{const _bfl=bbForceLearn;bbForceLearn=function(i){const r=G.run;const e=_bfl(i);if(e===''&&r.bt)r.bt.bbN=(r.bt.bbN||0)+1;return e;};}
// gi: chỉ số vật bảo mệnh trong túi đan (-1 = không dùng)
function bbForceLearn2(i,gi){const r=G.run;const rel=r.relics[i];if(!rel||!bbTemp())return null;
  const g=gi>=0?r.pills[gi]:null;const ok=g&&PILL[g.id].bt&&PILL[g.id].bt.guard&&S().than>=bb2Need();
  if(g&&PILL[g.id].bt&&PILL[g.id].bt.guard)r.pills.splice(gi,1);
  if(!ok){r.bt=null;die('thanvo',{n:'Thần thức tan vỡ'});return 'dead';}
  const e=bbForceLearn(i);if(e)return e;r.tamma=Math.min(100,(r.tamma||0)+10);log(`Lấy ${PILL[g.id].n} hộ thần thức, cưỡng ép lĩnh ngộ thêm ${rel.art?rel.art.n:'một môn'}.`);return '';}
// ===== Hậu thiên khí vận: cơ duyên có được sau mỗi lần đột phá đại cảnh giới (chọn 1 trong 3) =====
const HT_RANK=['','Hạ phẩm','Trung phẩm','Thượng phẩm','Cực phẩm'];
const HT_RW={1:40,2:33,3:20,4:7};
const HTKV=[
 {id:'ht_kiemy',r:1,n:'Kiếm Ý Sơ Thành',fx:{atkP:6,crit:1},d:'Công +6%, chí mạng +1%',st:'Lúc linh khí cuộn trào, {ten} bỗng thấy kiếm khí trong người tự tìm đường đi. Từ đó vung tay một cái, gió cũng phải nhường lối.'},
 {id:'ht_kimcot',r:1,n:'Kim Cốt Sơ Hiện',fx:{defP:7,hpP:3},d:'Thủ +7%, khí huyết +3%',st:'Xương cốt rèn qua thiên kiếp ánh lên sắc vàng nhạt. {ten} gõ nhẹ lên cánh tay mình, nghe như gõ vào chuông đồng.'},
 {id:'ht_linhtuyen',r:1,n:'Linh Tuyền Đan Điền',fx:{mpP:8},d:'Linh lực +8%',st:'Đan điền mở rộng như một mạch suối ngầm. Linh lực chảy vào không ngớt, rót mãi không đầy.'},
 {id:'ht_khinhthan',r:1,n:'Khinh Thân Như Yến',fx:{tp:2,dodge:2},d:'Thân pháp +2, né +2',st:'Thân thể nhẹ bẫng, {ten} đứng dậy mà ngỡ mình sắp bay lên. Gió núi lướt qua, áo không động.'},
 {id:'ht_tinhtam',r:1,n:'Tĩnh Tâm Như Thủy',fx:{tam:1,tammaRes:15},d:'Đạo tâm +1, kháng tâm ma +15%',st:'Sau cơn bão, lòng {ten} lặng như mặt hồ thu. Những tạp niệm cũ trôi qua như mây, không còn vướng lại.'},
 {id:'ht_tuluc',r:1,n:'Tụ Linh Chi Thể',fx:{tvP:6},d:'Tốc độ tu luyện +6%',st:'Linh khí quanh động phủ như có mắt, tự tìm tới thân {ten}. Ngồi yên một khắc bằng người khác ngồi nửa ngày.'},
 {id:'ht_lohoa',r:2,n:'Lô Hỏa Thuần Thanh',fx:{matkP:10,mpP:4},d:'Pháp công +10%, linh lực +4%',st:'Chân hỏa trong đan điền chuyển từ đỏ sang xanh. {ten} búng tay, đốm lửa nhỏ bay ra cháy mãi không tắt.'},
 {id:'ht_banthach',r:2,n:'Bàn Thạch Chi Khu',fx:{defP:10,hpP:8},d:'Thủ +10%, khí huyết +8%',st:'Thiên lôi đánh xuống mà thân thể chỉ hơi tê. {ten} biết từ nay mình đã có một tấm thân như đá tảng giữa dòng.'},
 {id:'ht_thanthuc',r:2,n:'Thức Hải Khai Khoát',fx:{than:6,ngo:1},d:'Thần thức +6, ngộ tính +1',st:'Thức hải rộng ra như biển sau mưa. Nhắm mắt lại, {ten} nghe được cả tiếng lá rơi ngoài trăm trượng.'},
 {id:'ht_trudiem',r:2,n:'Trường Sinh Chi Mạch',fx:{lifeP:8,hpP:4},d:'Thọ nguyên +8%, khí huyết +4%',st:'Một sợi sinh cơ xanh biếc quấn quanh tâm mạch. Tóc mai {ten} đen lại, khóe mắt bớt đi mấy nếp nhăn.'},
 {id:'ht_phong',r:2,n:'Ngự Phong Thân Pháp',fx:{tp:4,dodge:3},d:'Thân pháp +4, né +3',st:'Gió trên đỉnh núi như quen biết từ lâu. {ten} bước một bước, người đã ở ngoài mười trượng.'},
 {id:'ht_satkhi',r:2,n:'Sát Khí Ngưng Hình',fx:{atkP:9,critDmg:15},d:'Công +9%, bạo thương +15%',st:'Sát khí tích bao năm chiến đấu ngưng lại thành một luồng lạnh buốt. Thú dữ quanh núi im bặt khi {ten} bước ra.'},
 {id:'ht_ngodao',r:3,n:'Ngộ Đạo Linh Quang',fx:{ngo:2,tvP:10},d:'Ngộ tính +2, tốc độ tu luyện +10%',st:'Trong khoảnh khắc lôi quang tắt lịm, {ten} chợt thấy một tia linh quang. Bao điều trước nay mù mờ bỗng rõ như ban ngày.'},
 {id:'ht_hutien',r:3,n:'Hư Tiên Cốt',fx:{atkP:8,defP:8,hpP:8,mpP:8},d:'Công, thủ, khí huyết, linh lực +8%',st:'Thân thể được thiên kiếp tôi luyện từ trong ra ngoài. Mỗi tấc da thịt của {ten} đều ánh lên một tầng ánh ngọc nhàn nhạt.'},
 {id:'ht_thanthong',r:3,n:'Thần Thức Hóa Kiếm',fx:{than:12,crit:3},d:'Thần thức +12, chí mạng +3%',st:'Thần thức của {ten} sắc như lưỡi kiếm. Chỉ một ánh nhìn, kẻ yếu bóng vía đã thấy đầu óc ong ong.'},
 {id:'ht_bathu',r:3,n:'Bất Hủ Chi Tâm',fx:{tam:2,tammaRes:30,lifeP:6},d:'Đạo tâm +2, kháng tâm ma +30%, thọ nguyên +6%',st:'Qua kiếp nạn, lòng {ten} cứng như kim cương. Tâm ma gõ cửa, chỉ nghe thấy một khoảng lặng.'},
 {id:'ht_lucdao',r:4,n:'Lục Đạo Luân Hồi Ấn',fx:{atkP:14,defP:12,hpP:12,mpP:12,tvP:8},d:'Công +14%, thủ, khí huyết, linh lực +12%, tu luyện +8%',st:'Giữa lôi vân hiện ra một ấn ký sáu cánh, lặng lẽ in vào giữa trán {ten}. Trời đất như cúi đầu một khắc.'},
 {id:'ht_thienco',r:4,n:'Thiên Cơ Khai Nhãn',fx:{ngo:3,than:15,crit:4},d:'Ngộ tính +3, thần thức +15, chí mạng +4%',st:'Đôi mắt {ten} chợt nhìn thấu những sợi tơ vô hình giăng khắp thiên địa. Đó là thiên cơ, mấy ai được thấy một lần.'},
 {id:'ht_vanco',r:4,n:'Vạn Cổ Trường Thanh',fx:{lifeP:20,hpP:15,tammaRes:25},d:'Thọ nguyên +20%, khí huyết +15%, kháng tâm ma +25%',st:'Một gốc tùng cổ hiện ra trong thức hải {ten}, rễ cắm sâu vào hư không. Năm tháng từ nay trôi chậm hẳn quanh người.'},
];
const HTMAP={};for(const x of HTKV)HTMAP[x.id]=x;
function htOffer(n,to){const r=G.run;const own=r.htkv||[];const L=[];for(let i=0;i<n;i++){const left=HTKV.filter(x=>!own.includes(x.id)&&!L.includes(x.id));if(!left.length)break;
  const rk=wpick([1,2,3,4].filter(k=>left.some(x=>x.r===k)),k=>HT_RW[k]*Math.pow(1.5,((to||1)-1)*(k-1)/2));L.push(pick(left.filter(x=>x.r===rk)).id);}return L;}
function htChoose(i){const r=G.run;if(!r||!r.htPick)return null;const id=r.htPick[+i];r.htPick=null;if(!HTMAP[id])return null;(r.htkv=r.htkv||[]).push(id);log(`Nhận hậu thiên khí vận: ${HTMAP[id].n}.`);if(typeof bio==='function')bio(`Năm ${Math.floor(r.age)} tuổi, ${r.ten} được ${HTMAP[id].n} sau lần đột phá.`);const s=S();r.hp=s.maxHp;r.mp=s.maxMp;return id;}
{const _agH=aggFx;aggFx=function(){const fx=_agH();const r=G.run;if(r&&r.htkv)for(const id of r.htkv){const x=HTMAP[id];if(x)for(const k in x.fx)fx[k]=(fx[k]||0)+x.fx[k];}return fx;};}
// đột phá đại cảnh giới: thay lựa chọn tiên thiên khí vận bằng hậu thiên khí vận
{const _bfH=btFinish;btFinish=function(){const r=G.run;const rl=r&&r.realm;const res=_bfH.apply(this,arguments);const r2=G.run;if(r2&&r2.realm>rl&&r2.realm<5){r2.kvPick=null;const o=htOffer(3,r2.realm);if(o.length)r2.htPick=o;}return res;};}
// ===== Ghi lại trước/sau khi xung kích, đột phá để giao diện diễn hiệu ứng lột xác =====
const ASC_K=[['maxHp','Khí huyết'],['maxMp','Linh lực'],['atk','Công'],['def','Thủ'],['matk','Pháp công'],['than','Thần thức'],['tp','Thân pháp'],['ngo','Ngộ tính'],['crit','Chí mạng'],['life','Thọ nguyên']];
function ascSnap(){const s=S();const o={};for(const [k] of ASC_K)o[k]=s[k]||0;return o;}
function ascDiff(a,b){const L=[];for(const [k,n] of ASC_K){const x=a[k]||0,y=b[k]||0;if(y<=x+1e-6)continue;const p=x>0?(y-x)/x:1;L.push({k,n,lv:p>=0.8?3:p>=0.3?2:1});}return L;}
{const _psA=prepStart;prepStart=function(){const r=G.run;if(r){r._ascPre=ascSnap();r._ascFrom=realmLabel();}return _psA.apply(this,arguments);};}
{const _bfA=btFinish;btFinish=function(){const r=G.run;const rl=r&&r.realm;const pre=r&&r._ascPre,from=r&&r._ascFrom;const res=_bfA.apply(this,arguments);const r2=G.run;
  if(r2&&r2.realm>rl&&pre){r2.asc={k:'bt',from,to:realmLabel(),realm:r2.realm,diff:ascDiff(pre,ascSnap()),place:(r2.place&&r2.place.t)||'dong'};}if(r2){r2._ascPre=null;}return res;};}
{const _xkA=lkXk;lkXk=function(){const r=G.run;const pre=r&&ascSnap(),from=r&&realmLabel();const ok=_xkA.apply(this,arguments);const r2=G.run;if(ok&&r2&&pre)r2.asc={k:'xk',from,to:realmLabel(),diff:ascDiff(pre,ascSnap())};return ok;};}

// hậu thiên khí vận: mô tả bằng chữ (tăng nhẹ/khá/mạnh/rất mạnh), không lộ con số
const HT_FXN=Object.assign({},TT_FXN,{tammaRes:'Kháng tâm ma {v}%',tvP:'Tốc độ tu luyện {v}%'});
function htFxText(x){const L=[];for(const [k,v] of Object.entries(x.fx||{})){const t=HT_FXN[k];if(t)L.push(numWords(t.replace('{v}',(v>0?'+':'')+v)));}return L;}

// ===== Bậc (trước gọi là thiên phú) nay chủ yếu theo lực chiến so với người cùng cảnh giới =====
playerTal=function(){const r=G.run;if(!r)return null;const p=playerTalProfile(r);const lc=lucChien();const f=floorStats();const fl=f?lcCalc(f):0;
  const lv=rateOf('lc',lc).lv;return {tier:clamp(lv,0,4),score:fl>0?lc/fl:1,p,lc:1};};
// đơn vị trong trận: so lực chiến với mức thường của cấp đó (mỗi đại cảnh giới chừng ×2,2)
const TAL_LV_G=2.2;
{const _ut=unitTal;unitTal=function(u){if(!u)return null;if(u.isMain)return playerTal();if(u.kind==='kiep'||u.immune)return null;if(u.f&&u.f!=='nhan'&&u.side==='B')return null;
  const r=G.run;const f=floorStats();if(!f)return _ut(u);const fl=lcCalc(f);const L=u.side==='A'?r.realm:unitLv(u);const exp=fl*Math.pow(TAL_LV_G,L-(r.realm||0));const q=lcCalc(u)/Math.max(1,exp);
  let lv=0;for(const x of RATE_T)if(q>=x-1e-9)lv++;return {tier:clamp(lv,0,4),score:q};};}
// Uy áp theo bậc: bên thấp hơn bị giảm công và thủ (kém 1 bậc 6%, kém từ 2 bậc 12%)
const TAP_P=[0,0.06,0.12];
{const _ua=uyApSet;uyApSet=function(sc){_ua(sc);const me=mainUnit(sc);if(!me)return;const mt=unitTal(me);if(!mt)return;
  for(const b of sc.units.filter(u=>u.side==='B'&&u.kind!=='kiep'&&!u.immune)){const bt=unitTal(b);if(!bt)continue;const d=bt.tier-mt.tier;
    const lo=d>0?me:d<0?b:null;if(!lo)continue;const k=Math.min(2,Math.abs(d));if((lo.st.tap||0)>=k)continue;const prev=lo.st.tap||0;const m=(1-TAP_P[k])/(1-TAP_P[prev]);
    lo.atk=Math.round(lo.atk*m);lo.def=Math.round(lo.def*m);if(lo.matk)lo.matk=Math.round(lo.matk*m);lo.st.tap=k;
    clog(sc,lo===me?`Khí thế của ${b.name} lấn át ngươi${k>1?' hẳn hai bậc':''}, ra tay có phần chùn lại.`:`${b.name} bị khí thế của ngươi lấn át${k>1?' hẳn hai bậc':''}.`,lo===me?'en':'me');}};}

// ===================== MỊ LỰC =====================
// con số ẩn, người chơi thấy mức chữ. Ảnh hưởng: giá mua bán, phép thử thuyết phục, ấn tượng ban đầu của NPC,
// dễ được nhận làm đồ đệ / vào tông, mặt trái: dễ bị ghen ghét.
const MI_N=[[25,'Tiên tư'],[20,'Khuynh thành'],[15,'Xuất chúng'],[10,'Ưa nhìn'],[5,'Tầm thường'],[-99,'Xấu xí']];
function miBase(r){r=r||G.run;if(r.mi==null){const h=hashS('mi'+r.ten+r.kiep+(r.bornT||0));r.mi=clamp(3+(h%7)+((h>>>5)%7),2,18);}return r.mi;}
function miOf(){const r=G.run;if(!r)return 10;return Math.round(miBase(r)+((aggFx().mi)||0));}
function miName(v){if(v==null)v=miOf();for(const [t,n] of MI_N)if(v>=t)return n;return 'Xấu xí';}
// giá: mỗi điểm trên 10 giảm 0,8% giá mua (tối đa 10%), dưới 10 thì đắt lên (tối đa 6%)
function miShop(){return clamp((miOf()-10)*0.8,-6,10);}
{const _agM=aggFx;aggFx=function(){const fx=_agM();if(G.run&&!G.run._miIn){G.run._miIn=1;try{fx.shopP=(fx.shopP||0)+miShop();}finally{G.run._miIn=0;}}return fx;};}
// bán đồ: giá bán tăng theo mị lực thay vì giảm
{const _sl=sellList;sellList=function(){const L=_sl();const b=miShop();const m=(1+Math.max(-6,b)/100)/Math.max(0.6,1-Math.min(40,(aggFx().shopP||0))/100);for(const x of L)x.p=Math.max(1,Math.round(x.p*m));return L;};}
// phép thử thuyết phục: cộng theo mị lực
const MI_RX=/thuyết|xin |mời|nói |hỏi|khuyên|năn nỉ|dỗ|làm quen|kết giao|cầu|thương lượng|mặc cả|trả giá/i;
CHKN.mi='Mị lực';
{const _cc=chkChance;chkChance=function(chk){if(chk&&chk[0]==='mi'){const s=S();return clamp(0.5+(miOf()-chk[1]-G.run.region)*0.05+s.van*0.004,0.08,0.95);}return _cc(chk);};}
{const _ch=choose;choose=function(i){const r=G.run,sc=r&&r.scene;let bump=0;if(sc&&sc.type==='event'){const e=EVMAP[sc.id];const L=resolveP(e,sc.cur)||[];const c=L[i];if(c&&c.chk&&(MI_RX.test(c.l||'')||sc.id==='son_mon')){bump=clamp((miOf()-10)*0.012,-0.06,0.12);}}
  if(!bump)return _ch(i);const _cc2=chkChance;chkChance=function(k){return clamp(_cc2(k)+bump,0.05,0.97);};try{return _ch(i);}finally{chkChance=_cc2;}};}

// ===================== HẢO CẢM (gộp) =====================
// -100 … 100. Mức: Tử địch, Thù địch, Ghét bỏ, Xa lạ, Quen biết, Thân thiện, Tri kỷ, Đồng minh
const FAV_N=[[85,'Đồng minh','al'],[60,'Tri kỷ','tk'],[35,'Thân thiện','th'],[10,'Quen biết','qb'],[-19,'Xa lạ','xl'],[-49,'Ghét bỏ','gb'],[-79,'Thù địch','td'],[-101,'Tử địch','tu']];
function favLv(v){for(const x of FAV_N)if(v>=x[0])return x;return FAV_N[FAV_N.length-1];}
function npcs(){const r=G.run;return r.npcs||(r.npcs={});}
function favKey(n){return String(n||'');}
function npcRec(n,info){const N=npcs();const k=favKey(n);if(!k)return null;let o=N[k];if(!o){o=N[k]={n:k,fav:0,met:0};
  // ấn tượng ban đầu theo mị lực
  o.fav=clamp(Math.round((miOf()-10)*0.8),-8,12);}
  if(info)for(const x in info)if(info[x]!=null)o[x]=info[x];return o;}
function favOf(n){const r=G.run;const o=npcs()[favKey(n)];if(o)return o.fav;
  const s=(r.seeds||[]).find(x=>x.ten===n);if(s)return s.t==='an'?45:-60;
  const w=W();const ri=(w.rivals||[]).findIndex(x=>x.ten===n);if(ri>=0){const rv=(r.rivals||[]).find(x=>x.i===ri);return clamp(Math.round(((rv&&rv.rel)||0)*10),-100,100);}
  if((r.party||[]).some(p=>p.ten===n))return 40;return 0;}
function favAdd(n,d,why){if(!n||!d)return 0;const o=npcRec(n);if(o.fav===0&&!o.met)o.fav=favOf(n)||o.fav;const b=o.fav;o.fav=clamp(o.fav+d,-100,100);const L0=favLv(b),L1=favLv(o.fav);
  if(L0[1]!==L1[1]&&typeof note==='function')note(`${n}: ${L1[1].toLowerCase()}`,o.fav>b?'up':'dn');if(why)log(`${n} ${o.fav>b?'có thêm thiện cảm':'thêm phần bất mãn'} (${why}).`);return o.fav-b;}
// đồng bộ từ hệ thống cũ: ân tình, oán thù, thiên kiêu
{const _sd=typeof addSeed==='function'?addSeed:null;}
// gặp NPC trên bản đồ: ghi nhận, kẻ thù thì tấn công, người thân thì tặng quà
{const _me2=meetEnt;meetEnt=function(e){const r=G.run;if(e&&e.name&&['khach','tuantra','truysat','thuong','thienkieu'].includes(e.type)){
    const o=npcRec(e.name,{type:e.type,g:e.data&&e.data.g,sect:e.data&&e.data.s});o.met=(o.met||0)+1;if(o.met===1&&e.type!=='truysat')o.fav=Math.max(o.fav,favOf(e.name));
    const f=o.fav;
    if(f<=-50&&e.type!=='thienkieu'&&!r.moving){note(`${e.name} thấy ngươi, sát khí bốc lên!`,'dn');startCombat({cnt:1},{kind:'node'});const sc=G.run.scene;if(sc&&sc.units){const u=sc.units.find(x=>x.side==='B');if(u){u.name=e.name;if(u.realName)u.realName=e.name;}}return;}
    if(f>=35&&chance(f>=60?0.5:0.3)){const g=f>=60?ri(15,40):ri(5,15);const v=Math.round(g*SC[r.region]);r.st+=v;note(`${e.name} vui vẻ biếu ngươi ${v} linh thạch.`,'up');}
    else favAdd(e.name,2);}
  return _me2(e);};}
// đánh người: kẻ bại thêm hận
{const _fcF=finishCombat;finishCombat=function(sc){const r=G.run;if(sc&&sc.units&&sc.over==='win'&&!sc.spar)for(const u of sc.units)if(u.side==='B'&&isHumanFoe(u)){const n=u.realName||u.name;if(n&&n!=='???')favAdd(n,-35);}
  if(sc&&sc.spar&&sc.units)for(const u of sc.units)if(u.side==='B'){const n=u.realName||u.name;if(n&&n!=='???')favAdd(n,sc.over==='win'?6:3);}return _fcF(sc);};}
// tặng lễ: tốn linh thạch, tăng hảo cảm (càng thân càng khó tăng)
function giftCost(n){return Math.max(5,Math.round(12*SC[G.run.region]));}
function favGift(n){const r=G.run;const c=giftCost(n);if(r.st<c)return 'Không đủ linh thạch.';r.st-=c;const f=favOf(n);const d=f>=60?3:f>=35?5:f>=0?8:6;favAdd(n,d+Math.max(0,Math.round((miOf()-10)/5)));advanceTime(2);return '';}

// ===================== HẢO CẢM TÔNG MÔN =====================
// = 60% cao tầng (chưởng môn, trưởng lão) + 40% đệ tử (thiên kiêu và đệ tử đã gặp của tông đó)
const ELDER_T=['Chưởng môn','Đại trưởng lão','Truyền công trưởng lão'];
function sectElders(i){const w=W();const s=w.sects[i];if(!s)return [];if(!s.eld){const R1=seedRng('eld:'+s.n);s.eld=ELDER_T.map((t,k)=>({t,ten:(NAME&&NAME.ho?NAME.ho[Math.floor(R1()*NAME.ho.length)]:'Lý')+' '+(k===0?'Chân Nhân':['Huyền','Thanh','Vân','Mặc','Trường'][Math.floor(R1()*5)]+' '+['Tử','Tôn','Lão'][Math.floor(R1()*3)])}));}return s.eld;}
function sectDisciples(i){const w=W();const r=G.run;const L=[];(w.rivals||[]).forEach((x,k)=>{if(x.s===i)L.push(x.ten);});for(const o of Object.values(npcs()))if(o.sect===i&&!L.includes(o.n))L.push(o.n);return L;}
function sectFav(i){const r=G.run;const E=sectElders(i).map(e=>favOf('@'+i+':'+e.t));const D=sectDisciples(i).map(favOf);const avg=a=>a.length?a.reduce((x,y)=>x+y,0)/a.length:0;
  const base=(r.sfav&&r.sfav[i])||0;return clamp(Math.round(avg(E)*0.6+avg(D)*0.4+base),-100,100);}
function sectFavAdd(i,d){const r=G.run;r.sfav=r.sfav||{};r.sfav[i]=clamp((r.sfav[i]||0)+d,-100,100);}

// ===================== MỐI QUAN HỆ =====================
// kết nghĩa (huynh đệ/tỷ muội), nghĩa phụ/nghĩa mẫu, sư đồ (bái sư / thu đồ), phu thê, đạo lữ
const REL_T={
  kn:{n:'Kết nghĩa',need:60,d:'Huynh đệ / tỷ muội kết nghĩa: gặp nạn thì giúp, thỉnh thoảng gửi quà.',fx:{hpP:3,chkP:3}},
  np:{n:'Nghĩa phụ / nghĩa mẫu',need:60,d:'Nhận làm cha mẹ nuôi: được chở che, che chở khi gặp hiểm.',fx:{lifeP:3,tammaRes:10}},
  sp:{n:'Sư phụ',need:60,d:'Bái sư: được chỉ dạy, tu luyện nhanh hơn.',fx:{tvP:6,ngo:1}},
  dd:{n:'Đồ đệ',need:50,d:'Thu đồ: có người nối y bát, đạo tâm vững hơn.',fx:{tam:1}},
  pt:{n:'Phu thê',need:85,d:'Kết tóc se duyên: một nhà yên ấm, tâm ma khó xâm.',fx:{hpP:5,tammaRes:20}},
  dl:{n:'Đạo lữ',need:85,d:'Cùng nhau tu đạo: song tu tinh tiến.',fx:{tvP:10,mpP:5}}};
function bonds(){const r=G.run;return r.bonds||(r.bonds={});}
function relOfNpc(n){return bonds()[favKey(n)]||null;}
// điều kiện từng mối quan hệ; trả '' nếu được
function relWhy(n,k,info){const r=G.run;const T=REL_T[k];const f=favOf(n);info=info||{};const B=bonds();
  if(B[favKey(n)])return 'Đã có mối quan hệ: '+REL_T[B[favKey(n)]].n+'.';if(f<T.need)return 'Cần hảo cảm từ mức '+favLv(T.need)[1]+'.';
  const has=x=>Object.values(B).includes(x);const myR=isPham()?-1:r.realm;const hisR=info.realm!=null?info.realm:null;
  if(k==='sp'){if(has('sp'))return 'Đã có sư phụ.';if(hisR==null||hisR<myR+1)return 'Người này phải cao hơn ngươi ít nhất một đại cảnh giới.';}
  if(k==='dd'){if(hisR!=null&&hisR>=myR)return 'Đồ đệ phải thấp hơn ngươi.';if(myR<1)return 'Phải tới Trúc Cơ mới thu đồ được.';}
  if(k==='np'){if(hisR==null||hisR<myR)return 'Người này phải là bậc trưởng bối, cảnh giới không thấp hơn ngươi.';}
  if(k==='pt'||k==='dl'){if(has('pt')||has('dl'))return 'Đã có '+(has('pt')?'phu thê':'đạo lữ')+'.';if(info.g&&info.g===r.g)return 'Chỉ kết được với người khác giới.';if(miOf()<5)return 'Mị lực quá thấp, người ta không để mắt tới.';
    if(k==='dl'&&(isPham()||hisR==null||Math.abs(hisR-myR)>1))return 'Đạo lữ phải đều là tu sĩ, cảnh giới chênh không quá một bậc.';}
  return '';}
function relMake(n,k,info){const w=relWhy(n,k,info);if(w)return w;bonds()[favKey(n)]=k;favAdd(n,5);log(`Kết ${REL_T[k].n.toLowerCase()} với ${n}.`);if(typeof bio==='function')bio(`Năm ${Math.floor(G.run.age)} tuổi, ${G.run.ten} cùng ${n} kết ${REL_T[k].n.toLowerCase()}.`);return '';}
function relBreak(n){const B=bonds();const k=B[favKey(n)];if(!k)return;delete B[favKey(n)];favAdd(n,-40,'cắt đứt quan hệ');}
{const _agR=aggFx;aggFx=function(){const fx=_agR();const r=G.run;if(r&&r.bonds)for(const k of Object.values(r.bonds)){const T=REL_T[k];if(T)for(const x in T.fx)fx[x]=(fx[x]||0)+T.fx[x];}return fx;};}
// mặt trái mị lực: rất đẹp thì đôi khi bị kẻ xấu để mắt (thêm hận nhẹ với người lạ gặp lần đầu)
{const _nr=npcRec;npcRec=function(n,info){const N=npcs();const fresh=!N[favKey(n)];const o=_nr(n,info);if(fresh&&o&&miOf()>=20&&chance(0.12))o.fav-=25;return o;};}
