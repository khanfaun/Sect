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
  else if(c.id==='khi'){const rel=genRelic(clamp(r.region+(chance(rate*0.35)?1:0),0,4));r.relics.push(rel);clampHp();res.t=`Lò mở. ${rel.name} nằm giữa tro than, còn ấm.`;res.chips.push(chip('🏺',rel.name,relicTip(rel),'item'));log(`Rèn được ${rel.name}.`);}
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
  if(p){const s=S();tmp={id:-7,ten:p.n,icon:p.i,el:p.el,pow:petPow(p),hp:Math.round(s.maxHp*petPow(p))};r.party=[tmp].concat((r.party||[]).slice(0,1),(r.party||[]).slice(1));}
  try{return _sc(spec,after);}finally{if(tmp)r.party=r.party.filter(x=>x!==tmp);}};}
{const _fc=finishCombat;finishCombat=function(sc){
  _fc(sc);const r=run2();if(!r||sc.kiep)return;
  const pu=sc.units.find(u=>u.ally===-7);const p=r.petOut!=null&&r.pets[r.petOut];
  if(pu&&p){if(pu.hp<=0){p.rest=W().t+HM;clog(sc,`${p.n} bị thương nặng, phải nghỉ một tháng.`,'en');}else if(sc.over==='win')petExp(p,1);}
  if(sc.over!=='win'||sc.spar)return;
  const E=EN[sc.en.k];if(!E||E.f!=='thu')return;
  if(chance(.6)){const k=sc.elite||sc.boss?2:1;r.mats.dan+=k;clog(sc,`Nhặt được ${k} yêu đan.`,'win');}
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
{const _ar=arrive;arrive=function(id){_ar(id);const r=G.run;if(r&&r.place)r.place.t=tAs(r.place.t);if(r&&r.dest===id)r.dest=null;};}
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
  if(c.cost&&c.cost.st){const v=Math.round(c.cost.st*SC[r.region]);L.push({ok:r.st>=v,t:'linh thạch ≥ '+v});}
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
