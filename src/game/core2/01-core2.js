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
// vật liệu nhận qua sự kiện: linh thảo (thao), linh khoáng (khoang)
{const _aeMat=applyE;applyE=function(e,v){const has=e&&(e.thao||e.khoang);const ch=_aeMat(has?Object.assign({},e,{thao:undefined,khoang:undefined}):e,v);if(has&&G.run){const r=run2();for(const k of ['thao','khoang'])if(e[k]){r.mats[k]=(r.mats[k]||0)+e[k];ch.push(chip(MAT[k].i,'+'+e[k]+' '+MAT[k].n.toLowerCase(),'Vật liệu để luyện chế','up'));}}return ch;};}
// linh thú nhận qua sự kiện (không qua trứng): vào thẳng mục Linh thú
{const _aePet=applyE;applyE=function(e,v){const ch=_aePet(e&&e.petNew?Object.assign({},e,{petNew:undefined}):e,v);if(e&&e.petNew&&G.run){const r=run2();
  if(r.pets.length<PET_MAX){const E=EN[e.petNew]||{};const p={n:pick(['Đoàn Tử','Tiểu Hỏa','Mao Cầu','Tiểu Tuyết','A Hoàng']),i:E.i||'🐾',el:pick(E.el||['vo']),k:e.petNew,lv:1,exp:0,rest:0};r.pets.push(p);if(r.petOut==null)r.petOut=r.pets.length-1;
    log(`${p.n} theo ngươi.`);ch.push(chip(p.i,p.n,'Linh thú mới, xem ở mục Linh thú','up'));}}return ch;};}
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
  const g=bqRate()*y*(y<1?0.9:1);sc.msg=[T(bqText())];sc.chips=[];
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
  if(p){const s=S();tmp={id:-7,ten:p.n,icon:p.i,el:p.el,f:'thu',pow:petPow(p),hp:Math.round(s.maxHp*petPow(p)),sub:'Yêu thú '+GIAI[clamp((p.lv||1)-1,0,GIAI.length-1)].toLowerCase()+' giai'};r.party=[tmp].concat((r.party||[]).slice(0,1),(r.party||[]).slice(1));}
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
