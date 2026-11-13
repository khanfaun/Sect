// ================= LÕI TRÒ CHƠI =================
function hashS(s){let h=2166136261;for(const c of String(s)){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return h>>>0;}
function mul(a){return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
let RS=null; // khi khác null: mọi phép ngẫu nhiên dùng bộ sinh có hạt giống (mulberry32)
const R = ()=>RS?RS():Math.random();
function seeded(seed,fn){const o=RS;RS=mul(hashS(seed));try{return fn();}finally{RS=o;}}
const ri = (a,b)=>a+Math.floor(R()*(b-a+1));
const pick = a=>a[Math.floor(R()*a.length)];
const chance = p=>R()<p;
const clamp = (x,a,b)=>Math.max(a,Math.min(b,x));
const rnd1 = x=>Math.round(x*10)/10;
function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(R()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function wIdx(arr){let t=0;arr.forEach(x=>t+=(x.w==null?1:x.w));let r=R()*t;for(let i=0;i<arr.length;i++){r-=(arr[i].w==null?1:arr[i].w);if(r<=0)return i;}return arr.length-1;}
function wpick(arr,wf){let t=0;arr.forEach(x=>t+=wf(x));let r=R()*t;for(const x of arr){r-=wf(x);if(r<=0)return x;}return arr[arr.length-1];}

let G = {meta:null, run:null, birth:null, over:null, screen:'title'};

// ---------------- CHỮ ----------------
const BAG = {};
function bagPick(key,arr){let b=BAG[key];if(!b||!b.length){b=BAG[key]=shuffle([...arr.keys()]);}const i=b.pop();return arr[i<arr.length?i:0];}
function gp(o,path){return path.split('.').reduce((x,k)=>x==null?undefined:x[k],o);}
function capS(s){return s.replace(/(^|[.!?…:]\s+|“|\n)([a-zà-ỹđ])/g,(m,a,b)=>a+b.toUpperCase());}
function T(s,v){
  if(Array.isArray(s)) s=s.length?bagPick('_t'+s[0].slice(0,24),s):'';
  if(s==null) return '';
  v=v||{};
  let out=String(s), g=0;
  while(g++<8 && /[\[{]/.test(out)){
    const b4=out;
    out=out.replace(/\[([^\[\]{}]*?\|[^\[\]{}]*?)\]/g,(_,a)=>pick(a.split('|')));
    out=out.replace(/\{(\$?)([\w.]+)\}/g,(m,d,k)=>{
      if(d){const x=gp(v,k);return x!=null?String(x):'';}
      const pool=P[k];return pool?bagPick(k,pool):m;
    });
    if(out===b4)break;
  }
  return capS(out.replace(/\s+([,.!?])/g,'$1').replace(/ {2,}/g,' ').trim());
}
const up1 = s=>s?s[0].toUpperCase()+s.slice(1):s;
const lc1 = s=>s?s[0].toLowerCase()+s.slice(1):s;

// ---------------- TÊN ----------------
function genName(g,rare){const ho=chance(rare?0.45:0.16)?pick(NAME.ho2):pick(NAME.ho);return ho+' '+pick(g==='nu'?NAME.nu:NAME.nam);}
function tangName(){let a=pick(NAME.tang1),b=pick(NAME.tang2);while(b===a)b=pick(NAME.tang2);return a+' '+b;}
function daoName(){return pick(NAME.dao1)+' '+pick(NAME.dao2);}
function maName(){return pick(NAME.ma1)+' '+pick(NAME.ma2);}
function biName(){const r=R();if(r<0.55)return pick(NAME.bi1)+' '+pick(NAME.bi2);return pick(NAME.ho)+' '+pick(NAME.bi3);}
function placeName(type,w){
  if(type==='tong') return pick((w||G.meta.world).sects).n;
  let a=pick(PLACE.a),b=pick(PLACE.b),k=0;while((b===a||a.includes(b))&&k++<9)b=pick(PLACE.b);
  const s=pick(PLACE.sfx[type]||['Địa']);
  if(type==='tran'&&chance(.3)) return a+' '+s;
  return a+' '+b+' '+s;
}
function npc(kind){
  const pg=G.run?G.run.g:'nam';
  let g=kind==='nu'?'nu':kind==='nam'?'nam':chance(.5)?'nam':'nu';
  const o={g};
  if(kind==='gia'){g=o.g=chance(.72)?'nam':'nu';o.ten=pick(NAME.ho)+' '+pick(g==='nam'?NAME.nam:NAME.nu);o.hn=g==='nam'?'lão':'bà';o.xung=g==='nam'?'lão phu':'lão thân';o.goi=pg==='nam'?'tiểu hữu':'nha đầu';o.look=lc1(T('{look_gia_'+g+'}'));}
  else if(kind==='tang'){o.g='nam';o.ten=tangName();o.hn='vị tăng';o.xung='bần tăng';o.goi='thí chủ';o.look=lc1(T('{look_tang}'));}
  else if(kind==='dao'){o.g='nam';o.ten=daoName();o.hn='lão đạo';o.xung='bần đạo';o.goi='đạo hữu';o.look=lc1(T('{look_dao}'));}
  else if(kind==='ma'){o.g=g;o.ten=maName();o.hn=g==='nam'?'hắn':'mụ';o.xung='bản tọa';o.goi='tiểu bối';o.look=lc1(T('{look_ma}'));}
  else if(kind==='thuong'){o.g='nam';o.ten='chưởng quỹ '+pick(NAME.ho);o.hn='gã';o.xung='tiểu nhân';o.goi='khách quan';o.look=lc1(T('{look_thuong}'));}
  else if(kind==='hai'){o.ten=biName();o.hn=g==='nam'?'thằng bé':'con bé';o.xung='cháu';o.goi=pg==='nam'?'đại ca':'tỷ tỷ';o.look=lc1(T('{look_hai}'));}
  else if(kind==='pham'){o.ten=pick(NAME.ho)+' '+pick(NAME.bi3);o.g=/Nương|Tẩu|Bà|Muội/.test(o.ten)?'nu':'nam';o.hn=o.g==='nam'?'gã':'thị';o.xung='tiểu nhân';o.goi='tiên sư';o.look=lc1(T('{look_phamnhan}'));}
  else if(kind==='yeu'){o.ten=pick(DESC.vo.concat(DESC.am))+' '+pick(['Tộc trưởng','Đại tướng','Yêu sứ','Yêu vương']);o.hn='hắn';o.xung='bổn tọa';o.goi='người tu tiên';o.look='mắt vàng, tai nhọn, nanh dài quá môi';}
  else {o.ten=genName(g);o.hn=g==='nam'?'hắn':'nàng';o.xung=g==='nam'?'tại hạ':'tiểu nữ';o.goi=chance(.5)?'đạo hữu':(pg==='nam'?'huynh đài':'cô nương');o.look=lc1(T('{look_tre_'+g+'}'));}
  return o;
}

// ---------------- THẾ GIỚI (bền qua các kiếp) ----------------
const SECT_PRE={chinh:['Thanh Vân','Huyền Thiên','Thái Ất','Ngọc Hư','Tử Tiêu','Côn Lôn','Thiên Diễn','Lăng Tiêu','Bạch Vân','Ngân Hạc','Thiên Hà','Huyền Vũ','Thái Chung','Thanh Nguyệt','Hàn Chung','Lạc Hà','Đan Hà','Vấn Đạo','Lưu Vân','Thái Hư','Quy Nguyên'],ma:['Huyết Sát','Âm Phong','Vạn Băng','Cửu U','Thiên Ma','Hợp Hoan','Bách Độc','Tàn Ẩn','Phệ Hồn','Huyết Ảnh','Hắc Sát','Thi Âm','Vô Gian','U Minh'],phat:['Kim Cương','Đại Bi','Bồ Đề','Tịnh Thổ','Lạn Kha','Thiền Tâm','Vô Tướng','Bát Nhã'],trung:['Bạch Nguyệt','Thần Hà','Bách Thảo','Vạn Thú','Linh Lung','Thiên Cơ','Phiêu Miểu']};
const SECT_SFX={kiem:['Kiếm Tông','Kiếm Phái','Kiếm Các','Kiếm Sơn Trang'],dan:['Cốc','Đan Tông','Đan Các'],dao:['Tông','Môn','Cung','Phái'],tran:['Trận Tông','Trận Các'],khi:['Khí Tông','Khí Phái'],phu:['Phù Môn','Phù Tông'],ma:['Ma Tông','Ma Giáo','Sát Tông','Huyết Điện'],am:['Âm Phái','Thi Động','Quỷ Tông'],phat:['Tự','Thiền Viện'],thu:['Ngự Thú Môn','Linh Thú Sơn']};
function genWorld(seed){
  seed=seed||Math.floor(Math.random()*1e9);
  return seeded('w'+seed,()=>{const w=genWorld0();w.seed=seed;w.t=0;w.bangY=1010;w.ents=[];w.legacy=[];w.nemesis=null;w.chron=[];w.lastBirth=null;
    w.regions=[0,1,2,3,4].map(k=>seeded(seed+':r'+k,()=>genRegion(k,w)));w.rstate=w.rivals.map((x,i)=>({i,realm:0,prog:ri(10,60),alive:true,age:ri(16,22)}));return w;});
}
function genWorld0(){
  const used=new Set();
  const mk=(al,kind)=>{let p,k=0;do{p=pick(SECT_PRE[al]);}while(used.has(p)&&k++<20);used.add(p);return {n:p+' '+pick(SECT_SFX[kind]),al,kind};};
  const sects=[mk('chinh','kiem'),mk('chinh','dan'),mk('chinh','dao'),mk('chinh',pick(['tran','khi','phu'])),mk('ma','ma'),mk('ma','am'),mk('phat','phat')];
  if(chance(.5)) sects.push(mk('trung','thu')); else sects.push({n:pick(NAME.ho2)+' Thế Gia',al:'trung',kind:'the'});
  const rivals=[];const usedN=new Set();
  for(let i=0;i<7;i++){
    const s=sects[i%sects.length];
    let g=s.kind==='phat'?'nam':(chance(.5)?'nam':'nu');
    let ten,k=0;do{ten=s.kind==='phat'?tangName():genName(g,true);}while(usedN.has(ten)&&k++<20);usedN.add(ten);
    const tt={kiem:g==='nam'?'kiếm tử':'kiếm tiên tử',dan:g==='nam'?'đan tử':'đan tiên tử',phat:'phật tử',ma:g==='nam'?'ma tử':'yêu nữ',am:g==='nam'?'quỷ tử':'âm nữ',the:g==='nam'?'thiếu chủ':'đại tiểu thư',thu:g==='nam'?'thú vương tử':'linh thú tiên tử'}[s.kind]||(g==='nam'?'thánh tử':'thánh nữ');
    rivals.push({ten,g,s:i%sects.length,tt,el:pick(['kim','moc','thuy','hoa','tho','loi','bang','phong']),tinh:s.al==='ma'?pick(['hiem','hiem','loi']):pick(['nghia','nghia','loi','hiem']),tal:rnd1(0.85+R()*0.55)});
  }
  return {quoc:pick(['Lương Quốc','Triệu Quốc','Đại Tề','Tây Lương','Bắc Yến','Nam Chiếu','Đại Hạ','Việt Quốc','Đại Chu']),sects,rivals};
}
function newMeta(){return {opt:{},v:SAVE_V,pts:0,total:0,upg:{},lives:[],lore:[],ach:[],kills:0,world:genWorld(),last:null,nlife:0};}
const SAVE_V=3;
const U = id=>(G.meta&&G.meta.upg[id])||0;

// ---------------- NGƯỜI CHƠI ----------------
function pView(){const r=G.run;return {ten:r.ten,cn:r.g==='nam'?'công tử':'cô nương',ht:r.g==='nam'?'huynh đài':'cô nương',dh:r.g==='nam'?'huynh':'tỷ',sd:r.g==='nam'?'sư đệ':'sư muội',tt:r.g==='nam'?'tiểu tử':'nha đầu',ong:r.g==='nam'?'ông lão':'bà lão'};}
function rootView(r){const R0=ROOT.find(x=>x.id===r.id);return {n:R0.n,els:r.els,m:R0.m};}
function relicFx(rel){
  const o={};const m=TM[rel.tier||0];
  for(const [k,v] of Object.entries(rel.fx||{})){
    if(['firstEvade'].includes(k)) o[k]=v+((rel.tier||0)>=3?1:0);
    else if(['weakStart','vulnStart'].includes(k)) o[k]=v+Math.floor((rel.tier||0)/2);
    else if(['pillSlot'].includes(k)) o[k]=v;
    else if(k==='poisonHit') o[k]=rnd1(v*m*100)/100;
    else o[k]=Math.round(v*m);
  }
  return o;
}
function aggFx(){
  const r=G.run, fx={elP:{}};
  const add=(src)=>{if(!src)return;for(const[k,v]of Object.entries(src)){if(k==='elP'){for(const[e,x]of Object.entries(v))fx.elP[e]=(fx.elP[e]||0)+x;}else fx[k]=(fx[k]||0)+v;}};
  const og=ORIGIN.find(o=>o.id===r.origin);add(og&&og.fx);
  const tr=TRAIT.find(t=>t.id===r.trait);add(tr&&tr.fx);
  for(const rel of r.relics){const f=relicFx(rel);if(f.elX){fx.elP[rel.el]=(fx.elP[rel.el]||0)+f.elX;delete f.elX;}add(f);}
  add({hpP:U('hp')*8,mpP:U('mp')*10,ngo:U('ngo')*2,tam:U('tam')*3,van:U('st'),lifeP:U('tho')*6,pillSlot:U('tui')*2});
  return fx;
}
function tieu(){const t=G.run.tv;if(typeof lkOn==='function'&&lkOn()){const g=lkTang();return g>=9?3:g>=7?2:g>=4?1:0;}if(typeof sgOn==='function'&&sgOn())return t>=100?3:sgTang()-1;return t>=100?3:t>=66?2:t>=33?1:0;}
function S(){
  const r=G.run, fx=aggFx(), b=r.bon, k=tieu()*0.1, R0=r.realm;
  const lerp=(a)=>a[R0]+(a[R0+1]-a[R0])*k;
  const dq=qMulAll(r); // hệ số phẩm chất nhân dồn, chỉ nhân ở đây
  const s={fx};
  s.maxHp=Math.round(lerp(TAB.hp)*(1+((fx.hpP||0)+b.hpP)/100)*dq);
  s.maxMp=Math.round(lerp(TAB.mp)*(1+((fx.mpP||0)+b.mpP)/100)*dq);
  s.atk=Math.round(lerp(TAB.atk)*(1+((fx.atkP||0)+b.atkP)/100)*dq);
  s.def=Math.round(lerp(TAB.def)*(1+((fx.defP||0)+b.defP)/100)*dq);
  s.tp=r.base.tp+b.tp+(fx.tp||0)+R0*2; s.ngo=r.base.ngo+b.ngo+(fx.ngo||0)+R0*2;
  s.van=r.base.van+b.van+(fx.van||0); s.tam=r.base.tam+b.tam+(fx.tam||0)+R0*2;
  s.matk=Math.round(lerp(TAB.atk)*(1+((fx.matkP||0)+(fx.mpP||0)*0.4+(b.matkP||0))/100)*dq);
  s.crit=5+s.van*0.5+(fx.crit||0); s.critDmg=150+(fx.critDmg||0); s.hoTam=R0*2+(fx.hoTam||0);
  s.cx=10+2*R0; s.ne=s.tp+Math.round((fx.dodge||0)*0.5); s.hoi=10+2*R0;
  s.life=Math.round(LIFE[R0]*(1+(fx.lifeP||0)/100+QLIFE[(r.quality||[])[R0]||0]/100)+r.lifeAdj);
  s.pillMax=5+(fx.pillSlot||0);
  s.tvM=rootView(r.root).m*(1+s.ngo/60)*(1+(fx.tvP||0)/100);
  return s;
}
function clampHp(){const s=S();G.run.hp=clamp(G.run.hp,0,s.maxHp);G.run.mp=clamp(G.run.mp,0,s.maxMp);}
function realmText(r){r=r||G.run;return REALM[r.realm]+' '+TIEU[r.realm===G.run?.realm&&r===G.run?tieu():0];}
function realmLabel(){const r=G.run;return qualName(r.realm,(r.quality||[])[r.realm]||0)+' '+TIEU[tieu()];}
function log(t){const r=G.run;r.log.push({a:Math.floor(r.age),t});if(r.log.length>240)r.log.shift();}
function bio(t){G.run.bio.push(t);}
function karmaName(k){return k>=60?'Đại thiện':k>=25?'Thiện':k<=-60?'Ma đầu':k<=-25?'Tà':'Trung dung';}

// ---------------- ĐẦU THAI ----------------
function genRoot(){
  const R0=wpick(ROOT,x=>x.w);let els;
  if(R0.id==='bien') els=[pick(['loi','bang','phong'])];
  else els=shuffle(NGUHANH.slice()).slice(0,R0.k);
  return {id:R0.id,els};
}
function birthNode(){const w=W();let pool=regionOf(0).nodes.filter(n=>n.type==='tran'&&n.id!==w.lastBirth);if(!pool.length)pool=regionOf(0).nodes.filter(n=>n.type==='tran'||n.type==='thanh');return pick(pool);}
function genBirth(){
  const n=3+U('menh');const cards=[];
  for(let i=0;i<n;i++){
    const g=chance(.5)?'nam':'nu';
    const og=pick(ORIGIN), tr=pick(TRAIT);
    const home=birthNode();
    cards.push({ten:genName(g),g,origin:og.id,trait:tr.id,root:genRoot(),que:home.name,at:home.id,
      base:{tp:5+ri(0,3),ngo:8+ri(0,4),van:3+ri(0,3),tam:8+ri(0,3)}});
  }
  G.birth={cards};G.screen='birth';
}
function newRun(c){
  const og=ORIGIN.find(o=>o.id===c.origin);
  const r=G.run={ten:c.ten,g:c.g,origin:c.origin,trait:c.trait,root:c.root,que:c.que,base:c.base,
    age:16+(og.age||0),birthAge:16+(og.age||0),bornT:G.meta.world.t,at:c.at,moving:null,reveal:[],passes:[],bossDone:[0,0,0,0,0],tvMinor:0,maxRegion:0,party:[],quests:[],dao:0,quality:[0,0,0,0,0],speed:1,realm:0,tv:0,hp:1,mp:1,bon:{atkP:0,defP:0,hpP:0,mpP:0,tp:0,ngo:0,van:0,tam:0},
    tamma:og.tamma||0,karma:og.karma||0,st:Math.round((25+(og.st||0)+U('st')*25)*ECON*1.4),skills:[],relics:[],pills:[],
    region:0,kills:0,bossKills:0,evDone:0,evCount:{},evRecent:[],flags:{},seeds:[],log:[],bio:[],
    lifeAdj:0,btFail:0,daoSk:0,daoPill:0,revived:false,news:[],bang:null,place:{n:c.que,t:'tran'},
    rivals:(G.meta.world.rstate||G.meta.world.rivals.map((x,i)=>({i,realm:0,prog:ri(10,60),alive:true,age:18}))).map(x=>({i:x.i,realm:x.realm,prog:x.prog,alive:x.alive,age:x.age||18,rel:0})),
    kiep:G.meta.nlife+1,scene:null,lastPicks:{},maxRealm:0};
  if(c.trait==='loithan') r.root.els.push('loi');
  r.st=Math.max(0,r.st);
  // không còn công pháp khởi đầu cho mọi kiếp: chỉ xuất thân hoặc ký ức kiếp trước mới có
  if(og.skill||U('ky')){const t=U('ky')>=2?2:1;const pool=SK_RAW.filter(s=>s[3]===t&&!r.skills.find(k=>k.id===s[0]));r.skills.push({id:pick(pool)[0],lv:1,src:og.skill?'xuat':'ky'});}
  if(og.pill) r.pills.push({id:og.pill,q:0});
  if(og.pill2) r.pills.push({id:og.pill2,q:0});
  const s=S();r.hp=s.maxHp;r.mp=s.maxMp;
  G.meta.nlife++;
  log(`${kiepName(r.kiep)}: ${r.ten}, ${og.n.toLowerCase()}, quê ở ${r.que}.`);
  bio(T(`${r.ten} ${og.bio}.`,{que:r.que,quoc:G.meta.world.quoc}));
  for(const L of (G.meta.world.legacy||[]))if(L.feud&&!L.used&&chance(.5)){L.used=1;r.seeds.push({t:'oan',ten:L.ten,hn:L.hn,d:L.d+' (kiếp trước, khi ngươi còn là '+L.who+')',r:0,at:G.meta.world.t-60*HD});}
  G.birth=null;G.screen='map';G.meta.world.lastBirth=c.at;
  arrive(c.at);
  r.scene={type:'region',text:T(REG[0].intro,{que:r.que})};
  saveSoon();
}

// ---------------- BIẾN NGỮ CẢNH ----------------
function rivalView(rv){const w=G.meta.world.rivals[rv.i];return {ten:w.ten,tt:w.tt,sect:G.meta.world.sects[w.s].n,hn:w.g==='nam'?'hắn':'nàng',realm:REALM[rv.realm],rank:rankOf(rv.i)};}
function rankOf(i){const b=G.run.bang;if(!b)return '?';const k=b.ds.findIndex(x=>x.i===i);return k<0?'?':k+1;}
function btPill(){return ['trucco','ngungkim','phaanh','hoathan','phacanh'][Math.min(4,G.run.realm)];}
function baseV(type){
  const w=G.meta.world, r=G.run, ss=w.sects;
  const sC=ss.filter(s=>s.al==='chinh'), sM=ss.filter(s=>s.al==='ma');
  const alive=r.rivals.filter(x=>x.alive);
  const t=type||r.place.t||'tran';
  const own=r.place&&r.place.t==='tong'&&ss.find(x=>x.n===(r.place.owner||r.place.n));const s1=own||pick(ss);let s2=pick(ss);if(s2===s1)s2=ss[(ss.indexOf(s1)+1)%ss.length];
  return {p:pView(),pl:r.place.n,plt:TYPE_NAME[t]||'',quoc:w.quoc,que:r.que,sect:s1.n,sect2:s2.n,sectC:pick(sC).n,sectM:pick(sM).n,
    sectP:(ss.find(s=>s.al==='phat')||s1).n,rv:alive.length?rivalView(pick(alive)).ten:genName('nam',true),
    canh:T('{canh_'+t+'}'),who:genName(chance(.5)?'nam':'nu'),nick:pick(NAME.ma1),dan:PILL[btPill()].n,
    reg:REG[r.region].n,lao:pick(NAME.ho2)+' '+pick(NAME.nam)};
}
