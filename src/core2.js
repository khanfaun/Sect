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
const SLOTS=[['vukhi','Vũ khí'],['non','Nón'],['boi','Ngọc bội'],['gang','Găng'],['giap','Giáp'],['choang','Áo choàng'],['nhan1','Nhẫn'],['dai','Đai lưng'],['nhan2','Nhẫn'],['phapbao1','Pháp bảo'],['giay','Giày'],['phapbao2','Pháp bảo']];
const SPEC=[['tuivat','Trữ vật'],['phuongtien','Phương tiện'],['hoa','Hỏa chủng'],['dinh','Lô đỉnh'],['tran','Trận pháp']];
const KSLOT={kiem:'vukhi',dao:'vukhi',phap:'vukhi',but:'vukhi',giap:'giap',bao:'choang',tram:'non',non:'non',ngoa:'giay',hoan:'gang',gang:'gang',dai:'dai',nhan:'nhan',boi:'boi',hotam:'boi',tui:'tuivat',dinh:'dinh',hoa:'hoa',tran:'tran'};
const SLOT_N={vukhi:'Vũ khí',non:'Nón',boi:'Ngọc bội',gang:'Găng',giap:'Giáp',choang:'Áo choàng',nhan:'Nhẫn',dai:'Đai lưng',phapbao:'Pháp bảo',giay:'Giày',tuivat:'Trữ vật',hoa:'Hỏa chủng',dinh:'Lô đỉnh',tran:'Trận pháp',phuongtien:'Phương tiện'};
function slotOf(rel){return KSLOT[rel.k]||'phapbao';}
function slotsFor(rel){const s=slotOf(rel);return s==='nhan'?['nhan1','nhan2']:s==='phapbao'?['phapbao1','phapbao2']:[s];}
function eqOf(){const r=G.run;if(!r.eq)r.eq={};if(!r.dd)r.dd=[];return r.eq;}
function equip(i){const r=G.run,E=eqOf();const rel=r.relics[i];if(!rel)return;const S0=slotsFor(rel);const s=S0.find(x=>!E[x])||S0[0];
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
  return chip('📖',b.name,PHAM[a.tier]+'\n'+b.lore+'\n\nMở Nhân vật → Sở học để học.','item');}
function gainBookTp(tier){const r=G.run;run2();const b=bookOf(genArt('tp',tier));r.relics.push(b);return b;}
function arts(){const r=G.run;if(!r.arts)r.arts=[];for(const a of r.arts)if(a.v!==2)normArt(a);return r.arts;}
function artBy(u){return arts().find(a=>a.u===u);}
function learnTime(a){return (a.tier+1)*2*HM;}
const ART_MAX=10,ART_CAP={cp:[5,6,7,8,9,10],tp:[5,6,7,8,9,10]};
function artCap(type){const r=G.run;return ART_CAP[type][clamp(r.realm,0,5)];}
function learnWhy(rel){const r=G.run;if(rel&&rel.art&&!arts().some(x=>x.n===rel.art.n&&x.type===rel.art.type)&&arts().filter(x=>x.type===rel.art.type).length>=artCap(rel.art.type))return 'Đã đủ '+artCap(rel.art.type)+' ô '+(rel.art.type==='cp'?'công pháp':'tâm pháp')+'. Phế bỏ một môn hoặc lên cảnh giới để mở thêm ô.';if(r.scene||r.moving)return 'Phải đứng yên ngoài bản đồ mới tham ngộ được.';normArt(rel.art);if(r.realm<rel.art.req)return 'Cần '+reqName(rel.art.req)+' mới đọc hiểu.';return '';}
function learnBook(i){const r=G.run;const rel=r.relics[i];if(!rel||rel.k!=='book'||learnWhy(rel))return null;const a=rel.art;r.relics.splice(i,1);
  const old=arts().find(x=>x.n===a.n&&x.type===a.type);advanceTime(learnTime(a));if(!G.run)return null;let t;
  if(old){if(old.lv<old.lines.length)old.lv++;t=`Đọc lại ${a.n}, lĩnh hội thêm một tầng: ${LV_N[old.lv-1]}.`;}
  else{r.arts.push(a);const n=chuSlots();for(let j=0;j<n;j++)if(!r.chu[j]){r.chu[j]={k:'a',u:a.u};break;}t=`Học được ${a.n}.`;if(a.lines.some(x=>x.sk&&SK[x.sk].dao)&&addDao(3,'skill'))t+=' Đạo cơ +3.';}
  log(t);syncSkills();clampHp();autoCheck();saveSoon();return t;}
function studyArt(u){const r=G.run;const a=artBy(u);if(!a||artNextWhy(a)||r.scene||r.moving)return null;advanceTime(studyTime(a));if(!G.run)return null;a.lv++;const t=`Tham ngộ ${a.n}: ${LV_N[a.lv-1]}.`;log(t);syncSkills();clampHp();autoCheck();saveSoon();return t;}
function dropArt(u){const r=G.run;r.arts=arts().filter(a=>a.u!==u);for(let j=0;j<8;j++)if(r.chu[j]&&r.chu[j].u===u)r.chu[j]=null;syncSkills();clampHp();saveSoon();}
function learnAll(){const r=G.run;if(!r||r.scene||r.moving)return;for(let i=r.relics.length-1;i>=0&&G.run;i--)if(r.relics[i]&&r.relics[i].k==='book'&&!learnWhy(r.relics[i]))learnBook(i);}
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
  if(mine>his){t.stunT=Math.max(t.stunT||0,(typeof STUN_S==='number'?STUN_S:2)*1.5);clog(sc,`Niệm lực của ngươi (${mine}) đè bẹp ${t.name} (${his}): nó choáng váng.`,'me');}else clog(sc,`Niệm lực của ngươi (${mine}) không xuyên nổi ${t.name} (${his}).`,'en');
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
  const s0=(r.skills||[]).find(k=>SK[k.id]);const c0=genArt('cp',0,s0?s0.id:null,{req:0});c0.lines.forEach(x=>x.req=0);r.arts.push(c0);
  const t0=genArt('tp',0,null,{req:0,el:'vo'});t0.n='Dẫn Khí Quyết';t0.lines[0]={fx:'tvP',v:6,n:'Tu luyện',d:'Tu vi nhận thêm {v}%',req:0};t0.lines.forEach(x=>x.req=0);r.arts.push(t0);
  r.chu=[null,null,null,null,null,null,null,null];r.chuOpen=4;r.arts.slice(0,4).forEach((a,i)=>{r.chu[i]={k:'a',u:a.u};});r.kn=null;syncSkills();return r;};}
// ----- thiêu đốt thọ nguyên: mỗi trận tối đa hai lần, lần sau đắt và dữ hơn -----
// Lần 1 · Đốt huyết: mất ~7% thọ tối đa, hồi 60% linh lực, đầy thể lực, giải độc, bỏng, suy yếu. Không mất lượt.
// Lần 2 · Đốt nguyên thần: mất ~14%; 3 lượt tới đòn đánh xuyên 25% thủ và hút 10% sát thương; hết thì suy yếu 2 lượt.
// Mỗi lượt chỉ thiêu đốt một lần.
const BURN=[{n:'Đốt huyết',m:0.07},{n:'Đốt nguyên thần',m:0.14}];
function burnInfo(sc){const r=G.run;const k=(sc&&sc.burnN)||0;if(k>=2)return {k,done:true};const y=Math.max(4*(k+1),Math.round(LIFE[r.realm]*BURN[k].m));const left=Math.floor(S().life-r.age);return {k,y,left,ok:left>y+1};}
function playerBurn(){const sc=G.run.scene;const u=readyPlayer(sc);if(!u)return false;const b=burnInfo(sc);if(b.done||!b.ok||u.burnedTurn||u.dazed)return false;const r=G.run;u.burnedTurn=1;
  r.lifeAdj-=b.y;sc.burnN=b.k+1;
  if(b.k===0){u.mp=Math.min(u.maxMp,u.mp+Math.round(u.maxMp*0.6));u.tl=100;u.st.poison=0;u.st.burn=0;u.st.weak=0;clog(sc,`Ngươi thiêu đốt ${b.y} năm thọ nguyên. Huyết khí sôi trào: linh lực hồi 60%, thể lực đầy, độc tố tiêu tan.`,'me');}
  else{u.st.soul=3;clog(sc,`Ngươi đốt cả nguyên thần, mất ${b.y} năm thọ. Ba lượt tới mỗi đòn xuyên giáp, hút máu.`,'me');}
  syncMain(sc);sc.rev=(sc.rev||0)+1;log(`Thiêu đốt ${b.y} năm thọ nguyên trong trận.`);return true;}
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
    if(t.dl<=0){t.dazed=1;clog(sc,(t.isMain?'Ngươi':t.name)+' cạn định lực, choáng váng: mất lượt kế tiếp.',t.side==='A'?'en':'me');cfx(sc,{k:'daze',id:t.id});
      if(t.phase==='charge'&&!(t.pending&&t.pending.sk.fx.steady)){toRecover(sc,t,1);doneAct(sc,t);}}}
  if(!sc.pt){const me=mainUnit(sc);if(me&&me.hp>0){if(u===me)me.than=Math.min(100,(me.than||0)+12);else if(t===me)me.than=Math.min(100,(me.than||0)+17);}}
}
function dazeClear(sc,u){u.dazed=0;u.dl=100;clog(sc,(u.isMain?'Ngươi':u.name)+' choáng, bỏ lỡ một lượt.',u.side==='A'?'en':'me');}
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
    clog(sc,`Thần lực viên mãn! ${P.n} hiển hóa sau lưng ngươi: ${P.d}${P.turns?' trong '+P.turns+' lượt':' tới hết trận'}.`,'me');
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
  if(!dep&&G.run&&h>0&&G.run.tv<100){const add=thonapPct()*h/HM;if(add>0)addTv(add);}return o;};}
// Lịch luyện: như tu vi nhưng chỉ có được nhờ thực chiến và đi lại giang hồ. Lưu theo % như tu vi.
// Tu vi bỏ xa lịch luyện thì tu vi thực nhận giảm dần (mọi nguồn, kể cả đan dược):
// vượt dưới 20% nhận đủ; 30% còn 70%; 40% còn 35%; 60% còn 10%; từ 70% trở lên chỉ còn 2% (bình cảnh).
// Lịch luyện cao hơn tu vi thì được ngộ đạo: nhận thêm tối đa 15%.
// Muốn đột phá phải có lịch luyện ít nhất 70%. Đột phá xong lịch luyện về 0, giữ lại 20% phần vượt quá 100%.
const LL_T=[[20,1],[30,.7],[40,.35],[60,.1],[70,.02]],LL_BT=70,LL_MAX=150,LL_CAPE=0.05; // dưới 5% coi như chạm đáy
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
  if(d>0&&!quiet){if(why)log(`Lịch luyện +${d} (${why}).`);const sc=r.scene;if(sc&&sc.type==='combat')sc.llGain=(sc.llGain||0)+d;else if(sc&&Array.isArray(sc.chips))sc.chips.push(chip('⚔','+'+d+' lịch luyện','Lịch luyện: '+why,'up'));else note('+'+d+' lịch luyện · '+why);}return d;}
{const _cb10=canBreak;canBreak=function(){return _cb10()&&llOf()>=LL_BT;};}
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
function llChipMerge(L,d){if(!(d>0))return;const c=L.find(x=>x&&x.i==='⚔');if(c){c.t='+'+(parseInt(c.t.replace(/\D/g,''))+d)+' lịch luyện';}else L.unshift(chip('⚔','+'+d+' lịch luyện','Lịch luyện: có được nhờ thực chiến','up'));}
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
function questRewardChips(q){const R0=questRewardOf(q);const L=[chip('💎','+'+R0.st,'Linh thạch','up'),chip('⚔','+'+Math.round(R0.ll/100*tvPts(G.run.realm))+' lịch luyện','Lịch luyện','up')];
  const tt=(av,n,sub,d,t)=>`<div class="tt-it" style="${t!=null?'--pc:'+QCOL[clamp(t,0,5)]:''}"><span class="tt-av">${av}</span><div><b>${n}</b><small>${sub}</small><p>${d}</p></div></div>`;
  for(const x of R0.it){let c;if(x.k==='pill'){const P0=PILL[x.id];c=chip(P0.i,(x.q?PQ[x.q]+' ':'')+P0.n,pillTip(x.id,x.q),'item');c.h=tt(P0.i,(x.q?PQ[x.q]+' ':'')+P0.n,'Đan dược',P0.d.replace('{x}',pillX(x.id,x.q)),x.q||0);}
    else if(x.k==='mat'){const M0=MAT[x.m];c=chip(M0.i,x.n+' '+M0.n.toLowerCase(),M0.n+'\n'+M0.d,'item');c.h=tt(M0.i,M0.n+' × '+x.n,'Vật liệu luyện chế',M0.d);}
    else if(x.k==='relic'){c=chip('🏺','pháp bảo '+GRADE[x.tier].toLowerCase(),'Pháp bảo '+GRADE[x.tier]+'\nChưa rõ là món gì, nhận rồi mới biết.','item');c.h=tt('?','Pháp bảo ?',GRADE[x.tier],'Chưa rõ là món gì. Nhận rồi mới biết.',x.tier);}
    if(c)L.push(c);}
  return L;}
function questGive(q){const r=G.run;const R0=questRewardOf(q);const ch=[];r.st+=R0.st;ch.push(chip('💎','+'+R0.st,'Linh thạch','up'));
  for(const x of R0.it){if(x.k==='pill'){const c=gainPill(x.id,x.q);if(c)ch.push(c);}else if(x.k==='mat'){run2().mats[x.m]=(run2().mats[x.m]||0)+x.n;ch.push(chip(MAT[x.m].i,'+'+x.n+' '+MAT[x.m].n.toLowerCase(),'Vật liệu','up'));}
    else if(x.k==='relic'){const rel=genRelic(x.tier);r.relics.push(rel);clampHp();ch.push(chip('🏺',rel.name,relicTip(rel),'item'));}}
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
    return {t:'Món '+old.name+' tan vào tế đàn. Khói đỏ cuộn lên, rồi một bảo vật khác từ từ hiện ra.',ch:[chip('🏺','mất '+old.name,'Đã hiến','dn'),chip('🏺',nw.name,relicTip(nw),'item')]};}},{l:'Không dám, rời đi',go:()=>({t:'Ngươi lùi lại. Sau lưng như có tiếng ai thở dài.'})}]},
 {id:'linhtuyen',paid:1,n:'Linh tuyền cấm địa',t:'Giữa hẻm núi có một dòng suối xanh biếc, linh khí đặc quánh. Nhưng nước lạnh thấu xương, ngấm vào là tổn kinh mạch.',
  c:[{l:'Ngâm mình trong linh tuyền',cost:'khí huyết tối đa −10% vĩnh viễn',go:()=>({t:'Ngươi run lên từng cơn. Khi bước ra, linh lực trong người dồi dào gấp bội, còn thân thể thì yếu đi trông thấy.',ch:applyE({hpP:-10,mpP:25,tv:6,tvMajor:1})})},{l:'Chỉ vốc một ngụm',go:()=>({t:'Một ngụm nước lạnh buốt. Tinh thần tỉnh táo hẳn.',ch:applyE({tamma:-5})})}]},
 {id:'mataam',paid:1,n:'Ma tâm kinh',t:'Trong hốc cây cháy đen có cuốn sách da người. Chữ trong đó như đang bò, thì thầm hứa hẹn sức mạnh.',
  c:[{l:'Đọc hết cuốn sách',cost:'đạo tâm −3 vĩnh viễn, tâm ma +15',go:()=>({t:'Từng chữ khắc vào xương. Ngươi thấy mình mạnh lên, nhưng giấc ngủ không còn yên.',ch:applyE({tam:-3,tamma:15,atkP:15})})},{l:'Đốt nó đi',go:()=>({t:'Lửa bén vào, sách kêu lên như người. Lòng ngươi thanh thản.',ch:applyE({karma:3,tam:1})})}]},
 {id:'cuoc',paid:1,n:'Đánh cược với tiên nhân',t:'Một gã say mặc đạo bào rách, tay cầm hồ lô: “Cược không? Ngươi đặt một nửa linh thạch, ta đặt một viên đan đột phá.”',
  c:[{l:'Đặt cược một nửa linh thạch',cost:'mất một nửa linh thạch đang có',need:()=>G.run.st>=4?'':'Không đủ linh thạch',go:()=>{const r=G.run;const v=Math.floor(r.st/2);r.st-=v;const ch=[chip('💎','−'+v,'Linh thạch','dn')];
    if(chance(.5)){const c=gainPill(btPill(),2);if(c)ch.push(c);return {t:'Gã lắc hồ lô, đổ ra ba hạt xúc xắc. Ngươi thắng. Gã cười ha hả, ném viên đan qua.',ch};}return {t:'Ba hạt xúc xắc lăn tròn. Ngươi thua. Gã cười, ôm túi linh thạch, biến vào mây.',ch};}},{l:'Lắc đầu đi tiếp',go:()=>({t:'Gã nhún vai, ngửa cổ tu một ngụm.'})}]},
 {id:'saoroi',n:'Sao rơi trước mặt',t:'Đêm ấy một vệt sáng rạch trời, rơi ngay bãi cỏ trước mặt ngươi. Trong hố còn ấm, một món đồ đang tỏa quang.',
  c:[{l:'Nhặt lên',go:()=>{const nw=genRelic(clamp(G.run.region+1,0,4));G.run.relics.push(nw);clampHp();return {t:'Là một pháp bảo, còn vương hơi nóng của trời cao. Hữu duyên mới gặp.',ch:[chip('🏺',nw.name,relicTip(nw),'item')]};}}]},
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
    const roll=R();if(roll<KY_P[0]){kyStart(pick(KYNGO.filter(x=>x.paid)));break;}if(roll<KY_P[0]+KY_P[1]){kyStart(pick(KYNGO.filter(x=>!x.paid&&!x.joke)));break;}if(roll<KY_P[0]+KY_P[1]+KY_P[2]){kyStart(pick(KYNGO.filter(x=>x.joke)));break;}}
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
  c:[{l:'Lội xuống rút lên',go:()=>{const x=junkRelic('Dao phay rỉ sét');G.run.relics.push(x);clampHp();return {t:'Rút mãi mới ra. Ánh sáng là do mặt trời phản chiếu. Chuôi còn khắc chữ “Hàng thịt chợ Đông”.',ch:[chip('🏺',x.name,relicTip(x),'item')]};}}]},
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
  const res=_at19(x*PHAM_MUL);if(G.run&&G.run.pham&&G.run.tv>=100){const g=G.run;g.pham=0;g.tv=0;g.tvAcc=0;const s=S();g.hp=s.maxHp;g.mp=s.maxMp;
    log(`Năm ${Math.floor(g.age)} tuổi, dẫn khí nhập thể, bước vào Luyện Khí.`);if(typeof bio==='function')bio(`Năm ${Math.floor(g.age)} tuổi, ${g.ten} dẫn khí nhập thể, bước vào Luyện Khí.`);
    note('Dẫn khí nhập thể: bước vào Luyện Khí sơ kỳ!','up');if(typeof qPop==='function'){G.qpop=G.qpop||[];G.qpop.push({kind:'done',text:'Dẫn khí nhập thể · Luyện Khí sơ kỳ',grade:1,ch:[],title:'Đột phá'});}}
  return res;};}
// phàm nhân không có lịch luyện ràng buộc
{const _le19=llEff;llEff=function(tv){return isPham()?1:_le19(tv);};}
{const _S19=S;S=function(){const s=_S19();if(isPham()){s.maxHp=Math.round(s.maxHp*0.8);s.maxMp=Math.round(s.maxMp*0.5);s.atk=Math.round(s.atk*0.85);s.matk=Math.round(s.matk*0.85);}return s;};}
// tên cảnh giới
{const _rl19=realmLabel;realmLabel=function(){return isPham()?'Phàm nhân':_rl19();};}
{const _rt19=realmText;realmText=function(r){r=r||G.run;return r===G.run&&isPham()?'Phàm nhân':_rt19(r);};}
function realmName(){return isPham()?'Phàm nhân':REALM[G.run.realm];}
{const _ae19=applyE;applyE=function(e,v){const was=isPham();const ch=_ae19(e,v);if(was&&G.run&&!isPham()&&Array.isArray(ch)){const i=ch.findIndex(c=>c&&c.i==='✨');if(i>=0)ch.splice(i,1);ch.push(chip('✨','dẫn khí nhập thể','Bước vào Luyện Khí sơ kỳ','up'));}return ch;};}
