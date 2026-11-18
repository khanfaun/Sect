// ----- cống hiến tông môn -----
const CH_YEAR=10;
// Đ3.4: cống hiến theo từng thế lực: r.chMap={'sect:<tên tông>':{v,dong}}. Khóa là tông đang đứng (nếu đứng ở sơn môn), không thì tông mình thuộc.
function chSectOf(n){return n&&n.type==='tong'?(n.owner||n.name):null;}
function chKey(){const r=G.run;if(!r)return null;const h=chSectOf(nodeById(r.at));const nm=h||contentSectName();return nm?'sect:'+nm:null;}
function chGet(k){const r=G.run;if(!r||!k)return 0;const e=(r.chMap||{})[k];if(!e)return 0;if(e.dong&&!(r.flags.tongmon&&'sect:'+contentSectName()===k))return 0;return e.v||0;}
function chAdd(k,x){const r=G.run;if(!r||!k||!x)return 0;const m=r.chMap||(r.chMap={});const e=m[k]||(m[k]={v:0,dong:0});const v0=e.v||0;e.v=Math.max(0,v0+x);dbg('ch.add',{k,x,v:e.v});return e.v-v0;}
// rời tông: tự nguyện thì sổ đóng lại (giữ số), bị trục xuất thì xóa sổ
function chLeave(k,expel){const r=G.run;if(!r||!k||!r.chMap||!r.chMap[k])return;if(expel)delete r.chMap[k];else r.chMap[k].dong=1;dbg('ch.leave',{k,expel:!!expel});}
// Bảng CH_GIVE: content/rules/ch-give.js
function chGive(k){const r=run2();if(!r.flags.tongmon||!r.mats[k])return;r.mats[k]--;chAdd(chKey(),CH_GIVE[k]);}
function chTrade(){const r=run2();if(chGet(chKey())<15||r.pills.length>=S().pillMax)return;chAdd(chKey(),-15);const id=rollPill();gainPill(id,1);note(contentText("core2_03-cong-hien-tong-mon_js.chTrade.001")+PILL[id].n+'.','up');}

// ----- lựa chọn có điều kiện: đủ thì sáng, thiếu thì mờ kèm lý do -----
// Bảng STAT_N: content/rules/stat-n.js
function needList(c){const r=G.run,s=S(),L=[];if(!c)return L;
  if(c.cost&&c.cost.st){const v=Math.max(1,Math.round(c.cost.st*SC[rT()]));L.push({ok:r.st>=v,t:contentText("core2_03-cong-hien-tong-mon_js.needList.006")+v});}
  if(c.cost&&c.cost.mp){const v=Math.round(s.maxMp*parseFloat(c.cost.mp)/100);L.push({ok:r.mp>=v,t:contentText("core2_03-cong-hien-tong-mon_js.needList.007")+v});}
  const n=c.need;if(n){
    if(n.realm!=null)L.push({ok:r.realm>=n.realm,t:'cần '+REALM[n.realm]});
    for(const k in (n.stat||{}))L.push({ok:s[k]>=n.stat[k],t:STAT_N[k]+' ≥ '+n.stat[k]});
    if(n.item)L.push({ok:r.pills.some(p=>p.id===n.item),t:contentText("core2_03-cong-hien-tong-mon_js.needList.008")+PILL[n.item].n});
    if(n.mat)for(const k in n.mat)L.push({ok:(r.mats&&r.mats[k]||0)>=n.mat[k],t:n.mat[k]+' '+MAT[k].n.toLowerCase()});
    if(n.karma!=null&&feat('nq')){const L0=hdLvIdx(r);L.push(n.karma>=0?{ok:L0<=1,t:HD_LV[1].n.toLowerCase()}:{ok:L0>=3,t:HD_LV[3].n.toLowerCase()});}else if(n.karma!=null)L.push({ok:n.karma>=0?r.karma>=n.karma:r.karma<=n.karma,t:n.karma>=0?contentText("core2_03-cong-hien-tong-mon_js.needList.009"):contentText("core2_03-cong-hien-tong-mon_js.needList.010")});
    if(n.member)L.push({ok:!!r.flags.tongmon,t:contentText("core2_03-cong-hien-tong-mon_js.needList.011")});
    if(n.ch)L.push({ok:chGet(chKey())>=n.ch,t:contentText("core2_03-cong-hien-tong-mon_js.needList.012")+n.ch});}
  return L;}
function needOk(c){return needList(c).every(x=>x.ok);}
{const _ch=choose;choose=function(i){const r=G.run,sc=r.scene,e=EVMAP[sc.id];const c=(resolveP(e,sc.cur)||[])[i];if(!c||!needOk(c))return;
  const n=c.need;if(n){if(n.item&&n.use){const k=r.pills.findIndex(p=>p.id===n.item);if(k>=0)r.pills.splice(k,1);}if(n.mat&&n.use)for(const k in n.mat)r.mats[k]-=n.mat[k];if(n.ch)chAdd(chKey(),-n.ch);}
  _ch(i);};}
// cổng sơn môn: một đoạn hội thoại mẫu dùng đủ các loại điều kiện
// Nội dung sự kiện: content/events/ (tra ID cong_son_mon).
{const _pa2=placeActs;placeActs=function(n){let L=_pa2(n);const r=G.run;
  L=L.filter(a=>a.a!=='bq1'&&a.a!=='bq3'&&a.a!=='khaiphu');
  const add=(a,l,h,tip,dis,x)=>L.push({a,i:'',l,h,tip,dis:!!dis,x});
  if(n.type==='tong'){add('congmon',contentText("core2_03-cong-hien-tong-mon_js.013"),1,contentText("core2_03-cong-hien-tong-mon_js.014"));
    if(r.flags.tongmon){const m=Math.floor(W().t/HM);const done=n.tv&&n.tv.m===m&&n.tv.k===r.kiep;
      add('tongviec',contentText("core2_03-cong-hien-tong-mon_js.015"),10*HD,contentText("core2_03-cong-hien-tong-mon_js.016"),done,done?contentText("core2_03-cong-hien-tong-mon_js.017"):contentText("core2_03-cong-hien-tong-mon_js.018"));
      add('conghien',contentText("core2_03-cong-hien-tong-mon_js.019"),0,contentText("core2_03-cong-hien-tong-mon_js.020"),false,contentText("core2_03-cong-hien-tong-mon_js.021")+chGet(chKey()));
      add('tinhthat',contentText("core2_03-cong-hien-tong-mon_js.022"),0,contentText("core2_03-cong-hien-tong-mon_js.023")+CH_YEAR+contentText("core2_03-cong-hien-tong-mon_js.024"),chGet(chKey())<CH_YEAR/4,CH_YEAR+contentText("core2_03-cong-hien-tong-mon_js.025"));}}
  if(n.type==='cho'){add('taphoa',contentText("core2_03-cong-hien-tong-mon_js.026"),1,contentText("core2_03-cong-hien-tong-mon_js.027"));add('laibuon',contentText("core2_03-cong-hien-tong-mon_js.028"),0,contentText("core2_03-cong-hien-tong-mon_js.029"));add('tea',contentText("core2_03-cong-hien-tong-mon_js.030"),1,contentText("core2_03-cong-hien-tong-mon_js.031"));}
  if(n.type==='ancu'){const m=Math.floor(W().t/HM);const done=n.tg&&n.tg.m===m&&n.tg.k===r.kiep;add('thinhgiao',contentText("core2_03-cong-hien-tong-mon_js.032"),HD,contentText("core2_03-cong-hien-tong-mon_js.033"),done,done?contentText("core2_03-cong-hien-tong-mon_js.034"):'');}
  if(isWild(n)&&!n.dp)add('khaiphu',contentText("core2_03-cong-hien-tong-mon_js.035"),HM,contentText("core2_03-cong-hien-tong-mon_js.036"),dangerTag(n)>=3,dangerTag(n)>=3?contentText("core2_03-cong-hien-tong-mon_js.037"):'');
  return L;};}
{const _pa3=placeAct;placeAct=function(a){const r=G.run,sc=r&&r.scene;
  if(!['congmon','tongviec','thinhgiao'].includes(a))return _pa3(a);
  if(!sc||sc.type!=='place')return;const n=nodeById(sc.id);const act=placeActs(n).find(x=>x.a===a);if(!act||act.dis)return;sc.msg=[];sc.chips=[];
  if(a==='congmon'){advanceTime(1);if(G.run&&G.run.scene===sc)startEvent('cong_son_mon');return;}
  const m=Math.floor(W().t/HM);
  if(a==='tongviec'){n.tv={m,k:r.kiep};advanceTime(10*HD);if(!G.run||G.run.scene!==sc)return;chAdd(chKey(),6);sc.msg=[contentText("core2_03-cong-hien-tong-mon_js.038")];sc.chips=[chip('🏅',contentText("core2_03-cong-hien-tong-mon_js.039"),contentText("core2_03-cong-hien-tong-mon_js.040"),'up'),chip('⏳',contentText("core2_03-cong-hien-tong-mon_js.041"),contentText("core2_03-cong-hien-tong-mon_js.042"),'')];return;}
  if(a==='thinhgiao'){n.tg={m,k:r.kiep};advanceTime(HD);if(!G.run||G.run.scene!==sc)return;sc.msg=[pick([contentText("core2_03-cong-hien-tong-mon_js.043"),contentText("core2_03-cong-hien-tong-mon_js.044")])];sc.chips=[chip('⏳',contentText("core2_03-cong-hien-tong-mon_js.045"),contentText("core2_03-cong-hien-tong-mon_js.046"),'')].concat(applyE({tv:3,tamma:-6,dao:chance(.25)?1:0}));return;}
};}
// thăm dò ở nơi có người: hàng hóa chắc chắn có và thứ chỉ gặp khi có duyên
function townStats(n){const r=G.run,g=rT(),L=[],M=[];const q=g>=2?2:g>=1?1:0;const G1=clamp(g,0,4),G2=clamp(g+1,0,4);
  const rg=(a,b)=>a===b?a:a+' – '+b;
  if(n.type==='thanh'||n.type==='tran'||n.type==='cho'){L.push([contentText("core2_03-cong-hien-tong-mon_js.townStats.047"),rg(PQ[0],PQ[q])],[contentText("core2_03-cong-hien-tong-mon_js.townStats.048"),contentText("core2_03-cong-hien-tong-mon_js.townStats.049")+Math.min(4,g+2)],[contentText("core2_03-cong-hien-tong-mon_js.townStats.050"),rg(GRADE[G1],GRADE[G2])]);
    if(n.type!=='cho')L.push([contentText("core2_03-cong-hien-tong-mon_js.townStats.051"),MOUNT.filter(m=>r.realm>=(m.realm||0)).map(m=>m.n).join(', ')],[contentText("core2_03-cong-hien-tong-mon_js.townStats.052"),contentText("core2_03-cong-hien-tong-mon_js.townStats.053")]);}
  if(n.type==='tong')L.push([contentText("core2_03-cong-hien-tong-mon_js.townStats.054"),contentText("core2_03-cong-hien-tong-mon_js.townStats.055")+Math.min(4,g+2)],[contentText("core2_03-cong-hien-tong-mon_js.townStats.056"),PQ[1]],[contentText("core2_03-cong-hien-tong-mon_js.townStats.057"),contentText("core2_03-cong-hien-tong-mon_js.townStats.058")]);
  if(n.type==='ancu')L.push([contentText("core2_03-cong-hien-tong-mon_js.townStats.059"),contentText("core2_03-cong-hien-tong-mon_js.townStats.060")]);
  M.push([contentText("core2_03-cong-hien-tong-mon_js.townStats.061"),contentText("core2_03-cong-hien-tong-mon_js.townStats.062")+rg(GRADE[G1],GRADE[G2])+contentText("core2_03-cong-hien-tong-mon_js.townStats.063")+rg(PQ[0],PQ[2])],[contentText("core2_03-cong-hien-tong-mon_js.townStats.064"),contentText("core2_03-cong-hien-tong-mon_js.townStats.065")+rg(GRADE[G2],GRADE[clamp(g+2,0,4)])+contentText("core2_03-cong-hien-tong-mon_js.townStats.066")],[contentText("core2_03-cong-hien-tong-mon_js.townStats.067"),contentText("core2_03-cong-hien-tong-mon_js.townStats.068")]);
  if(n.type==='thanh'||n.type==='cho')M.push([contentText("core2_03-cong-hien-tong-mon_js.townStats.069"),contentText("core2_03-cong-hien-tong-mon_js.townStats.070")+rg(GRADE[G1],GRADE[clamp(g+2,0,4)])]);
  const evs=EVS.filter(e=>!e.spec&&(e.src||'explore')==='explore'&&e.tg&&e.tg.includes(tAs(n.type))&&(!e.r||e.r.includes(g))).slice(0,8).map(e=>e.n).filter(Boolean);
  return {L,M,evs};}

// ================= THƯƠNG THẾ =================
// Thua hoặc nhận thua: bị thương, bị lục đồ. Đang bị thương mà thua nữa: chết. Để vài tháng tới một năm thì tự lành.
function injured(){const r=G.run;return !!(r&&r.inj&&r.inj.until>W().t);}
function injHeal(msg){const r=G.run;if(r&&r.inj){r.inj=null;clampHp();if(msg)note(msg,'up');}}
function lootPlayer(sc){if(encLawful(sc.en))return [];const r=G.run;const out=[];const E=EN[sc.en.k];const human=!E||E.f==='nhan'||sc.boss;
  if(r.st>0){const d=Math.max(1,Math.round(r.st*(0.2+R()*0.2)));r.st-=d;out.push(d+contentText("core2_03-cong-hien-tong-mon_js.lootPlayer.071"));}
  if(human){const n=ri(1,2);for(let i=0;i<n;i++){const pool=[];r.relics.forEach((x,j)=>{if(!x.u)pool.push(['r',j]);});r.pills.forEach((x,j)=>pool.push(['p',j]));if(!pool.length)break;const [k,j]=pick(pool);
      if(k==='r'){const x=r.relics.splice(j,1)[0];out.push(x.name);const c=run2().chu;for(let q=0;q<8;q++)if(c[q]&&c[q].k==='r'&&c[q].n===x.name)c[q]=null;}else{const x=r.pills.splice(j,1)[0];out.push(PILL[x.id].n);}}}
  return out;}
function playerYield(){const sc=G.run.scene;const u=readyPlayer(sc);if(!u||sc.kiep||sc.spar||sc.en.n===contentText("core2_03-cong-hien-tong-mon_js.playerYield.072")||injured())return false;
  runAct(sc,()=>{sc.over='lose';sc.beaten=2;clog(sc,contentText("core2_03-cong-hien-tong-mon_js.playerYield.073"),'me');finishCombat(sc);});return true;}
{const _ce=checkEnd;checkEnd=function(sc){
  if(!sc.over&&!sc.spar&&!sc.kiep&&sc.en&&sc.en.n!==contentText("core2_03-cong-hien-tong-mon_js.074")){const me=mainUnit(sc);
    if(me.hp<=0&&!injured()&&!(U('hoi')&&!G.run.revived)){me.hp=1;sc.over='lose';sc.beaten=1;clog(sc,contentText("core2_03-cong-hien-tong-mon_js.075"),'en');finishCombat(sc);return;}}
  _ce(sc);};}
{const _fc2=finishCombat;finishCombat=function(sc){_fc2(sc);const r=G.run;if(!r||!sc.beaten||sc.looted)return;sc.looted=1;
  const mo=sc.beaten===2?ri(2,5):ri(4,12);r.inj={until:W().t+mo*HM};clampHp();
  const L=lootPlayer(sc);
  if(L.length)clog(sc,contentText("core2_03-cong-hien-tong-mon_js.076", [sc.en.n,L.join(', ')]),'en');
  log(contentText("core2_03-cong-hien-tong-mon_js.077", [sc.en.n])+(L.length?contentText("core2_03-cong-hien-tong-mon_js.078")+L.join(', '):'')+'.');};}
{const _agg2=aggFx;aggFx=function(){const fx=_agg2();if(injured()){fx.atkP=(fx.atkP||0)-20;fx.defP=(fx.defP||0)-20;fx.matkP=(fx.matkP||0)-20;}return fx;};}
{const _ac2=autoCheck;autoCheck=function(){const r=G.run;if(r&&r.inj&&r.inj.until<=W().t)injHeal(contentText("core2_03-cong-hien-tong-mon_js.079"));_ac2();};}
{const _pa4=placeAct;placeAct=function(a){const was=injured();_pa4(a);if(was&&a==='heal'&&G.run)injHeal(contentText("core2_03-cong-hien-tong-mon_js.080"));};}
{const _hb=healBuy;healBuy=function(){const r=G.run;const st=r.st;_hb();if(G.run&&G.run.st<st&&injured())injHeal(contentText("core2_03-cong-hien-tong-mon_js.081"));};}

// ================= CÁC LOẠI THƯƠNG THẾ =================
// m: số tháng tự lành [ít, nhiều]; fx: ảnh hưởng khi còn mang; perm: vĩnh viễn cho tới cảnh giới regen
// Bảng WOUND: content/rules/wound.js
// Bảng REGEN_REALM: content/world/regen-realm.js
// Bảng HEAL_PILL: content/rules/heal-pill.js
function wounds(){const r=G.run;if(!r)return [];if(!r.wounds)r.wounds=[];if(r.inj){if(r.inj.until>W().t)r.wounds.push({k:'ngoai',until:r.inj.until});r.inj=null;}return r.wounds;}
function addWound(k,by){const r=G.run,L=wounds(),w=W(),D=WOUND[k];const old=L.find(x=>x.k===k);
  if(D.perm){if(!old)L.push({k,perm:1});return D.n;}
  if(k==='nguy'){if(!old)L.push({k,dl:w.t+3*HD,by});return D.n;}
  const u=w.t+ri(D.m[0],D.m[1])*HM;if(old)old.until=Math.max(old.until,u)+2*HM;else L.push({k,until:u});return D.n;}
function cureWound(ks){const r=G.run;const n=wounds().length;r.wounds=r.wounds.filter(x=>!ks.includes(x.k));clampHp();return n-r.wounds.length;}
function injured(){return wounds().some(x=>!x.perm&&x.k!=='doc');}
function injHeal(){}
function woundText(x){const D=WOUND[x.k],w=W();return x.perm?contentText("core2_03-cong-hien-tong-mon_js.woundText.082")+REALM[REGEN_REALM]+contentText("core2_03-cong-hien-tong-mon_js.woundText.083"):x.k==='nguy'?'Còn '+durH(Math.max(1,x.dl-w.t))+contentText("core2_03-cong-hien-tong-mon_js.woundText.084"):contentText("core2_03-cong-hien-tong-mon_js.woundText.085")+durH(Math.max(1,x.until-w.t))+'.';}
function woundTick(){const r=G.run;if(!r)return;const L=wounds(),w=W();const dt=Math.max(0,w.t-(r.wT==null?w.t:r.wT));r.wT=w.t;if(!L.length)return;
  if(r.realm>=REGEN_REALM&&L.some(x=>x.perm)){r.wounds=L.filter(x=>!x.perm);note(contentText("core2_03-cong-hien-tong-mon_js.woundTick.086"),'up');log(contentText("core2_03-cong-hien-tong-mon_js.woundTick.087"));}
  for(const x of r.wounds.slice()){
    if(x.k==='doc'&&dt>0){const s=S();const fl=Math.ceil(s.maxHp*0.1);if(r.hp>fl)r.hp=Math.max(fl,Math.round(r.hp-s.maxHp*0.01*dt));}
    if(x.until&&x.until<=w.t){r.wounds=r.wounds.filter(y=>y!==x);note(WOUND[x.k].n+contentText("core2_03-cong-hien-tong-mon_js.woundTick.088"),'up');}
    if(x.k==='nguy'&&x.dl<=w.t){r.wounds=r.wounds.filter(y=>y!==x);
      if(chance(.3)&&!r.scene){log(contentText("core2_03-cong-hien-tong-mon_js.woundTick.089"));die('combat',{n:x.by||contentText("core2_03-cong-hien-tong-mon_js.woundTick.090")});return;}
      const p=pick(['mu','cut','que']);addWound(p);addWound('noi');note(contentText("core2_03-cong-hien-tong-mon_js.woundTick.091")+WOUND[p].n.toLowerCase()+'.','dn');log(contentText("core2_03-cong-hien-tong-mon_js.woundTick.092")+WOUND[p].n+'.');}}
  clampHp();}
function rollWounds(sc){const E=EN[sc.en.k]||{};const el=sc.en.el;const out=[];
  if(sc.beaten===2){out.push(addWound('ngoai'));return out;}
  const pool=[['ngoai',35],['gay',20],['noi',20]];if(el==='hoa'||el==='loi')pool.push(['bong',25]);if(E.f==='quy'||el==='am')pool.push(['than',25]);
  out.push(addWound(wpick(pool,x=>x[1])[0]));if(chance(.3))out.push(addWound(wpick(pool,x=>x[1])[0]));
  const fx=aggFx();if(!fx.poisonImm&&((E.pat||[]).includes('poison')||(E.f==='thu'&&chance(.25))))out.push(addWound('doc'));
  if(chance(.06))out.push(addWound('nguy',sc.en.n));else if(chance(.03))out.push(addWound(pick(['mu','cut','que'])));
  return [...new Set(out)];}
{const _fc3=finishCombat;finishCombat=function(sc){_fc3(sc);const r=G.run;if(!r||!sc.beaten||sc.wounded)return;sc.wounded=1;r.inj=null;
  const L=rollWounds(sc);clog(sc,contentText("core2_03-cong-hien-tong-mon_js.093")+L.join(', ')+contentText("core2_03-cong-hien-tong-mon_js.094"),'en');log(contentText("core2_03-cong-hien-tong-mon_js.095")+L.join(', ')+'.');
  if(L.includes(WOUND.nguy.n))note(contentText("core2_03-cong-hien-tong-mon_js.096"),'dn');};}
{const _agg3=aggFx;aggFx=function(){const fx=_agg3();const r=G.run;if(r&&r.wounds)for(const x of r.wounds){const f=WOUND[x.k].fx;for(const k in f)fx[k]=(fx[k]||0)+f[k];}return fx;};}
{const _ac3=autoCheck;autoCheck=function(){woundTick();if(G.run)_ac3();};}
{const _up=usePill;usePill=function(idx,inCombat){const r=G.run;const p=r.pills[idx];const id=p&&p.id;const res=_up(idx,inCombat);
  if(G.run&&id&&r.pills[idx]!==p){if(id==='giaidoc'&&cureWound(['doc']))note(contentText("core2_03-cong-hien-tong-mon_js.097"),'up');if(HEAL_PILL.includes(id)&&cureWound(['nguy'])){addWound('ngoai');note(contentText("core2_03-cong-hien-tong-mon_js.098"),'up');}}
  return res;};}
{const _pa5=placeAct;placeAct=function(a){const had=wounds().length;_pa5(a);const r=G.run;if(!r||!had||a!=='heal')return;
  const n=cureWound(['ngoai','bong']);for(const x of r.wounds)if(x.until)x.until-=6*HM;woundTick();if(n)note(contentText("core2_03-cong-hien-tong-mon_js.099"),'up');};}
{const _hb2=healBuy;healBuy=function(){const r=G.run;const st=r.st;_hb2();if(!G.run||G.run.st>=st||!wounds().length)return;
  const n=cureWound(['ngoai','bong','gay','doc','nguy']);for(const x of r.wounds)if(x.until)x.until-=6*HM;woundTick();if(n)note(contentText("core2_03-cong-hien-tong-mon_js.100"),'up');};}
