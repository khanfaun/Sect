// ---------------- SỰ KIỆN ----------------
const EVS=[];const EVMAP={};
function ev(o){EVS.push(o);EVMAP[o.id]=o;}
function resolveP(e,path){let x=e;for(const k of path){x=x==null?undefined:x[k];}return x;}
function chkChance(chk){
  const r=G.run,s=S();const [k,dc]=chk;
  if(k==='root'){return clamp(0.15+(rootView(r.root).m-0.7)*0.9+s.van*0.005,0.08,0.95);}
  const val=s[k]!=null?s[k]:0;const d=dc+rT()*2;
  return clamp(0.5+(val-d)*0.05+s.van*0.004+((s.fx.chkP||0)/100),0.08,0.95);
}
// Bảng CHKN: content/items/chkn.js
// Bảng CHKI: content/items/chki.js
function costOk(c){if(!c)return true;const r=G.run,s=S();if(c.st&&r.st<Math.max(1,Math.round(c.st*SC[rT()])))return false;if(c.mp&&(s.maxMp<=0||r.mp<Math.round(s.maxMp*parseFloat(c.mp)/100)))return false;return true;}
function costChips(c){const r=G.run,s=S(),o=[];if(!c)return o;
  if(c.st){const d=Math.max(1,Math.round(c.st*SC[rT()]));r.st-=d;o.push(chip('💎','−'+d,contentText("core_06-su-kien_js.costChips.006"),'dn'));}
  if(c.mp){const d=Math.round(s.maxMp*parseFloat(c.mp)/100);r.mp-=d;o.push(chip('💧','−'+d,contentText("core_06-su-kien_js.costChips.007"),'dn'));}
  if(c.hp){const d=Math.round(s.maxHp*parseFloat(c.hp)/100);r.hp=Math.max(1,r.hp-d);o.push(chip('❤️','−'+d,contentText("core_06-su-kien_js.costChips.008"),'dn'));}
  return o;}
function whenOk(e){if(!e.when)return true;const t=W().t;if(e.when.part&&!e.when.part.includes(partOf(t)))return false;if(e.when.season&&!e.when.season.includes(seasonOf(t)))return false;return true;}
function srcOk(e,src){const s=e.src||'explore';if(!src)return true;if(s===src)return true;if(src==='explore'&&!ENT_ON&&s.startsWith('ent:'))return true;return false;}
let ENT_ON=false;
function evOk(e,type,src){
  const r=G.run;if(!srcOk(e,src)||!whenOk(e))return false;
  if(e.r&&!e.r.includes(rT()))return false;
  if(type&&e.tg&&!e.tg.includes('*')&&!e.tg.includes(type))return false;
  if(e.once&&r.evCount[e.id])return false;
  if((r.evCount[e.id]||0)>=2)return false;
  if(r.evRecent.includes(e.id))return false;
  if(e.cond&&!e.cond(r))return false;
  if(e.spec)return false;
  return true;
}
function pickEvent(type,src){
  const r=G.run;src=src||'explore';
  // sự kiện đặc biệt
  const sp=src!=='explore'?[]:EVS.filter(e=>e.spec&&srcOk(e,src)&&whenOk(e)&&(!type||!e.tg||e.tg.includes('*')||e.tg.includes(type))&&(r.evCount[e.id]||0)<2&&(!e.r||e.r.includes(rT()))&&!(e.once&&r.evCount[e.id])&&!r.evRecent.includes(e.id)&&e.cond&&e.cond(r));
  if(sp.length&&chance(.55))return pick(sp).id;
  let pool=EVS.filter(e=>evOk(e,type,src));
  if(!pool.length)pool=EVS.filter(e=>evOk(e,null,src));
  if(!pool.length)pool=EVS.filter(e=>!e.spec&&!e.once&&srcOk(e,src)&&(!e.r||e.r.includes(rT())));
  if(!pool.length)return null;
  return wpick(pool,e=>(e.w||1)*((e.tg&&e.tg.includes(type))?2:1)/(1+(r.evCount[e.id]||0)*2)).id;
}
function startEvent(id,extra){
  const r=G.run,e=EVMAP[id];
  const v=Object.assign(baseV(),e.v?e.v(r):{},extra||{});
  if(!v.en&&v.a&&v.a.ten)v.en=v.a.ten; // sự kiện của người đi đường gặp qua thăm dò: lấy tên người trong sự kiện
  r.evCount[id]=(r.evCount[id]||0)+1;r.evRecent.push(id);if(r.evRecent.length>14)r.evRecent.shift();r.evDone++;
  const story=[T(e.t,v)];const back=sceneBack();
  r.scene={type:'event',id,v,story,cur:['c'],phase:'choose',chips:[],news:takeNews(),back};
}
function takeNews(){const r=G.run;if(r.newsQ&&r.newsQ.length&&chance(.45))return r.newsQ.shift();return null;}
function visChoices(sc){
  const e=EVMAP[sc.id];const list=resolveP(e,sc.cur)||[];const r=G.run;
  return list.map((c,i)=>({c,i})).filter(({c})=>!c.req||c.req(r,sc.v));
}
function choose(i){
  const r=G.run,sc=r.scene,e=EVMAP[sc.id];const list=resolveP(e,sc.cur);const ch=list[i];if(!ch)return;
  if(!costOk(ch.cost))return;
  const pre=costChips(ch.cost);
  let out,path;
  if(ch.chk){const ok=R()<chkChance(ch.chk);out=ok?ch.ok:ch.no;path=[...sc.cur,i,ok?'ok':'no'];sc.lastOk=ok;}
  else if(ch.o){const k=wIdx(ch.o);out=ch.o[k];path=[...sc.cur,i,'o',k];}
  else {out=ch;path=[...sc.cur,i];}
  sc.story.push({q:T(ch.l,sc.v)});
  doOutcome(out||{},path,pre);
}
function doOutcome(out,path,pre){
  const r=G.run,sc=r.scene;
  const text=out.t?T(out.t,sc.v):'';
  if(text)sc.story.push(text);
  const chips=(pre||[]).concat(applyE(out.e,sc.v));
  if(!G.run)return;
  sc.chips=chips;
  if(out.fight){startCombat(out.fight,{kind:'ev',path,ev:JSON.parse(JSON.stringify(sc))});return;}
  if(out.c){sc.cur=[...path,'c'];sc.phase='choose';}
  else sc.phase='done';
}

// ---------------- KẺ ĐỊCH ----------------
// Bảng GIAI: content/items/giai.js
function mkEnemy(spec,v){
  const r=G.run,reg=rTv();spec=spec||{};
  if(spec.k==='tamma'){const s=S();return {n:contentText("core_06-su-kien_js.mkEnemy.009"),sub:contentText("core_06-su-kien_js.mkEnemy.010"),i:'🌑',el:'am',f:'vat',hp:Math.round(s.maxHp*0.85),max:Math.round(s.maxHp*0.85),atk:Math.round(s.atk*0.9),def:Math.round(s.def*0.9),pat:['drain','weak','atk','charge','heavy','rage'],pi:0,st:{}};}
  let k=spec.k;
  if(spec.nem&&v){k=v.kk;spec=Object.assign({},spec,{i:v.ki});}
  const habitat=x=>{const t=tAs(r.place&&r.place.t);return EN[x].pl.includes('*')||EN[x].pl.includes(t);};
  const famPick=f=>{let pool=REG_EN[reg].filter(x=>EN[x].f===f&&habitat(x));if(!pool.length)pool=Object.keys(EN).filter(x=>EN[x].f===f&&habitat(x));return pool.length?pick(pool):null;};
  if(k==='beast')k=famPick('thu');else if(k==='human')k=famPick('nhan');else if(k==='quy')k=famPick('quy');
  if(!k||!EN[k]){const t=r.place&&r.place.t;let pool=REG_EN[reg].filter(x=>EN[x].pl.includes('*')||EN[x].pl.includes(t));if(!pool.length)pool=Object.keys(EN).filter(habitat);k=pick(pool);}
  const ty=EN[k];
  const m=(spec.mv?((v&&v[spec.mv])||1):(spec.m||1))*(1+curDanger()*0.1);
  let el=spec.el||(ty.el?pick(ty.el):(ty.ma?(chance(.6)?'am':pick(NGUHANH)):pick(NGUHANH)));
  let n,sub;
  if(ty.f==='thu'){n=pick(DESC[el]||DESC.vo)+' '+pick(ty.nb);sub=contentText("core_06-su-kien_js.mkEnemy.011")+GIAI[reg+(spec.elite?1:0)].toLowerCase()+' giai';}
  else if(ty.f==='nhan'){
    n=spec.n?T(spec.n,v):(ty.noname?pick(ty.t):(ty.ma?maName():ty.tang?tangName():ty.dao?daoName():genName(chance(.65)?'nam':'nu')));
    sub=T(pick(ty.t),Object.assign({sect:pick(G.meta.world.sects).n},v||{}));
    if(ty.noname){sub=REG[reg].n;}
  } else {
    n=(chance(.35)?pick([contentText("core_06-su-kien_js.mkEnemy.012"),contentText("core_06-su-kien_js.mkEnemy.013"),'Huyết','Hắc','Bạch','Cổ'])+' ':'')+pick(ty.nb);sub=ty.f==='quy'?contentText("core_06-su-kien_js.mkEnemy.014"):contentText("core_06-su-kien_js.mkEnemy.015");
  }
  if(spec.n&&ty.f!=='nhan')n=T(spec.n,v);
  if(spec.sub)sub=T(spec.sub,v);
  const eM=spec.elite?1.6:1, aM=spec.elite?1.2:1;
  const hp=Math.round(EH[reg]*ty.hp*m*eM);
  return {n:up1(n),sub,i:spec.i||ty.i,el,f:ty.f,k,hp,max:hp,atk:Math.round(EA[reg]*ty.atk*m*aM),def:Math.round(ED[reg]*ty.def*m),pat:ty.pat.slice(),pi:ri(0,ty.pat.length-1),st:{},elite:!!spec.elite};
}
function mkBoss(){
  const r=G.run,b=r.bossDef;const reg=rT();const v=baseV();v.ten=genName(chance(.7)?'nam':'nu');v.trai=pick([contentText("core_06-su-kien_js.mkBoss.016"),contentText("core_06-su-kien_js.mkBoss.017"),contentText("core_06-su-kien_js.mkBoss.018"),contentText("core_06-su-kien_js.mkBoss.019")]);
  const n=T(b.n,Object.assign(v,r.bossV||{}));const sub=T(b.sub,Object.assign(v,r.bossV||{}));
  const m=1.3;
  const hp=Math.round(EH[reg]*b.hp*m*[0.72,0.9,1,1,1][reg]);
  return {n,sub,i:b.i,el:b.el,f:'boss',hp,max:hp,atk:Math.round(EA[reg]*b.atk*m*[0.85,0.95,1,1,1][reg]),def:Math.round(ED[reg]*b.def*m),pat:b.pat.slice(),pi:0,st:{},boss:true,esc:b.esc};
}

// ---------------- CHIẾN ĐẤU: THANH HÀNH ĐỘNG ----------------
// Thanh dài 100: chạy 0→50 theo thân pháp, ra lệnh ở 50, tụ lực đứng ở 75, hồi 50/75→100 theo hồi phục, chạm 100 về 0.
// Bảng VERB: content/narration/verb.js
// Bảng VERB2: content/narration/verb2.js
// đòn của kẻ địch theo ý định cũ
// Bảng EN_SK: content/items/en-sk.js
const PHAT=75; // mốc phát lực: điểm cuối của tụ lực và của thế đỡ
const TL_DODGE=25,TL_BLOCK=30,TL_REGEN=20,BLOCK_CUT=0.6;
function tlD(u){return TL_DODGE;} function tlB(u){return TL_BLOCK;} // thể lực né / đỡ (Sửa-C.8: người già tốn thêm, bọc ở core2/45)
// Bảng BLOCK_SK: content/items/block-sk.js
// Bảng WAIT_SK: content/items/wait-sk.js
// Bảng GUARD_SK: content/items/guard-sk.js
const STUN_S=2,CHARGE_MAX=12;
function skRec(sk){if(sk.rec)return sk.rec;if(sk.fx&&sk.fx.rec)return sk.fx.rec;return [0.8,0.9,1.0,1.2,1.4][sk.t||0];}
function U_(sc,id){return sc.units.find(u=>u.id===id);}
function alive(sc,side){return sc.units.filter(u=>u.side===side&&u.hp>0&&!u.gone);}
function foeSide(s){return s==='A'?'B':'A';}
function mainUnit(sc){return sc.units.find(u=>u.isMain);}
function clog(sc,t,c){sc.log.push({t,c:c||''});if(sc.log.length>40)sc.log.shift();sc.rev=(sc.rev||0)+1;}
function playerUnit(){
  const r=G.run,s=S();
  return {id:1,side:'A',ctrl:'player',isMain:true,name:r.ten,icon:r.g==='nam'?'🧑':'👩',el:r.root.els[0]||'vo',f:'me',
    realm:r.realm,matk:s.matk,critDmg:s.critDmg,hoTam:s.hoTam,hp:r.hp,max:s.maxHp,mp:r.mp,maxMp:s.maxMp,atk:s.atk,def:s.def,tp:s.tp,cx:s.cx,ne:s.ne,hoi:s.hoi,crit:s.crit,
    skills:r.skills.map(x=>({id:x.id,lv:x.lv})),st:{},pos:0,phase:'run',pending:null,waitSet:[],stunT:0,rec:1,chargeT:0,tl:100};
}
function enemyUnit(en,id,f){
  const reg=rT();f=f||1;
  const tp=Math.round((6+reg*2.5+(en.boss?2:0)+(en.elite?1:0))*(en.k&&EN[en.k]&&EN[en.k].f==='thu'?1.05:1)),cx=10+2*reg+(en.elite||en.boss?2:0);
  return {id,side:'B',ctrl:'ai',name:en.n,sub:en.sub,icon:en.i,el:en.el,f:en.boss?'boss':en.f,k:en.k,boss:!!en.boss,elite:!!en.elite,esc:en.esc,
    hp:Math.round(en.hp*f),max:Math.round(en.max*f),mp:0,maxMp:0,atk:Math.round(en.atk*f*0.85),def:en.def,tp:en.tp||tp,cx:en.cx||cx,ne:en.ne||tp,hoi:en.hoi||cx,crit:5+reg*1.5+(en.elite?3:0)+(en.boss?5:0),critDmg:150,hoTam:reg*2+(en.elite?4:0)+(en.boss?8:0),realm:reg+(en.boss?1:0)+(en.elite?0.5:0),matk:Math.round(en.atk*f*0.85),
    pat:en.pat.slice(),pi:en.pi||0,st:Object.assign({},en.st||{}),pos:0,phase:'run',pending:null,waitSet:[],stunT:0,rec:1,chargeT:0,intent:null};
}
// spec: {k,n,m,elite,spar,cnt,...}, 'boss', {pre:en}, {kiep:{n,waves}}, {party:[đơn vị phe A]}
function startCombat(spec,after){
  const r=G.run;const back=sceneBack();
  const sc={type:'combat',units:[],hold:false,log:[],t:0,after,back,spar:!!(spec&&spec.spar),boss:spec==='boss',elite:!!(spec&&spec.elite),rev:0,cur:null,aiWait:null,dodge:null,qte:null,over:null,done:false,nid:2};
  const me=playerUnit();sc.units.push(me);
  if(!(spec&&spec.kiep))for(const p of (r.party||[]).slice(0,2)){const u=partyUnit(p,sc.nid++);if(u)sc.units.push(u);}
  if(spec&&spec.kiep){
    const k={id:sc.nid++,side:'B',ctrl:'ai',kind:'kiep',immune:true,name:contentText("core_06-su-kien_js.startCombat.075"),icon:'🌩️',el:'loi',f:'vat',hp:1,max:1,mp:0,maxMp:0,atk:0,def:0,tp:0,cx:99,ne:0,hoi:10,crit:0,skills:[],st:{},pos:0,phase:'run',pending:null,waitSet:[],stunT:0,rec:1,chargeT:0};
    sc.units.push(k);sc.kiep={n:spec.kiep.n,waves:spec.kiep.waves||1,wave:1,done:0,uy:1,cut:spec.kiep.cut||0};
    sc.en={n:contentText("core_06-su-kien_js.startCombat.076"),k:'kiep',i:'🌩️',el:'loi',boss:true};
    if(spec.kiep.block)me.st.block=Math.round(me.max*spec.kiep.block/100);
    clog(sc,contentText("core_06-su-kien_js.startCombat.077", [capS(numVi(spec.kiep.n)),sc.kiep.waves>1?', chia làm '+numVi(sc.kiep.waves)+' đợt,':'']),'en');
  } else {
    let ens=[];
    if(spec==='boss')ens=[mkBoss()];
    else if(spec&&spec.pre){ens=[spec.pre];const n=spec.cnt||1;for(let i=1;i<n;i++)ens.push(mkEnemy({k:spec.pre.k,elite:spec.elite}));}
    else{const n=spec&&spec.cnt||1;for(let i=0;i<n;i++)ens.push(mkEnemy(spec,after&&after.ev&&after.ev.v));}
    if(spec&&spec.elite)ens.forEach(e=>e.elite=true);
    const n=ens.length;const f=[1,1.6,2.1][n-1]/n; // ngân sách chia đều
    ens.forEach(e=>sc.units.push(enemyUnit(e,sc.nid++,n>1?f:1)));
    sc.en={n:ens[0].n,k:ens[0].k,i:ens[0].i,el:ens[0].el,boss:!!ens[0].boss,elite:!!ens[0].elite,sub:ens[0].sub};
    clog(sc,ens.map(e=>`${e.i} ${e.n}`).join(', ')+contentText("core_06-su-kien_js.startCombat.078"));
  }
  // trung bình thân pháp và hồi phục, tính một lần lúc vào trận
  const L=sc.units.filter(u=>!u.immune);
  sc.tpTB=Math.max(1,L.reduce((a,u)=>a+u.tp,0)/L.length);sc.hoiTB=Math.max(1,L.reduce((a,u)=>a+u.hoi,0)/L.length);
  if(sc.kiep){const k=sc.units.find(u=>u.kind==='kiep');const cyc=50/vRun(sc,me)+(100-PHAT)/vRec(sc,me);k.fixedV=1.1*50/cyc; /* nhanh hơn một vòng hành động của người chơi 1,1 lần */}
  // hiệu ứng pháp bảo đầu trận
  const fx=S().fx;
  if(fx.startBlock)me.st.block=(me.st.block||0)+Math.round(me.max*fx.startBlock/100);
  if(fx.firstEvade)me.st.evade=fx.firstEvade;
  for(const u of alive(sc,'B')){if(u.immune)continue;if(fx.weakStart)u.st.weak=fx.weakStart;if(fx.vulnStart)u.st.vuln=fx.vulnStart;}
  for(const u of sc.units)if(u.side==='B'&&!u.immune)nextIntent(u);
  r.scene=sc;
}
function partyUnit(p,id){
  const r=G.run,s=S();if(!p||p.hp<=0)return null;
  const m=p.pow||0.6;
  return {realm:r.realm,sub:p.sub||(typeof realmName==='function'?realmName():REALM[r.realm]),matk:Math.round(s.matk*m),critDmg:150,hoTam:s.hoTam,id,side:'A',ctrl:'ai',ally:p.id,name:p.ten,icon:p.icon||'🧑',el:p.el||'vo',f:p.f||'nhan',hp:p.hp,max:Math.round(s.maxHp*m),mp:0,maxMp:0,atk:Math.round(s.atk*m),def:Math.round(s.def*m),tp:Math.round(s.tp*0.9),cx:s.cx,ne:Math.round(s.ne*0.9),hoi:s.hoi,crit:5,
    pat:['atk','atk','multi','block','heavy'],pi:0,st:{},pos:0,phase:'run',pending:null,waitSet:[],stunT:0,rec:1,chargeT:0};
}
const CHG_SLOW=0.6; // tụ lực, thủ thế: đoạn từ mốc giữa tới mốc phát lực chạy chậm lại còn 60%
function vRun(sc,u){if(u.fixedV)return u.fixedV;return 20*clamp(u.tp/sc.tpTB,0.6,1.8);}
function vRec(sc,u){if(u.fixedV)return u.fixedV;return 26*clamp(u.hoi/sc.hoiTB,0.6,1.8)/(u.rec||1);}
function nextIntent(u){
  let it=u.pat[u.pi%u.pat.length];u.pi++;if(it==='charge')it='heavy';
  if(chance(.22)&&!u.boss){it=pick(u.pat);if(it==='charge')it='heavy';}
  u.intent=it;
}
// gỡ id khỏi waitSet của mọi người đang tụ lực phe kia
function doneAct(sc,u){for(const x of sc.units)if(x.side!==u.side&&x.waitSet.length)x.waitSet=x.waitSet.filter(i=>i!==u.id);}