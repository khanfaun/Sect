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