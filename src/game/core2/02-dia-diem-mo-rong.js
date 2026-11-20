// ---------------- ĐỊA ĐIỂM MỞ RỘNG ----------------
for(const k in EL)EL[k].c=EL[k].n; // hiện tên hệ bằng tiếng Việt thay cho chữ Hán
// Bảng WILD2: content/rules/wild2.js
function isWild(n){return WILD2.includes(n.type);}
// chuyện "trước mắt" của mỗi nơi: hiện sẵn, tự mất sau chừng 5 năm
function nodeEvs(n){const r=G.run,w=W();if(n.type==='ai')return [];
  if(!n.evs||n.evs.kiep!==r.kiep||w.t>n.evs.until){const k=n.type==='sao'?1:isWild(n)?3:ri(1,3);const L=[];
    for(let i=0;i<k*4&&L.length<k;i++){const id=pickEvent(n.type,'explore');if(id&&EVMAP[id]&&!L.includes(id))L.push(id);}
    n.evs={kiep:r.kiep,until:w.t+5*HY,L};}
  return n.evs.L;}
function exploreStats(n){const tt=tAs(n.type);const fp=[0.04,0.14,0.26,0.4][n.danger]+(['phe','ma'].includes(tt)?0.08:0)+(n.type==='sao'?0.3:0);
  const foes=Object.keys(EN).filter(k=>EN[k].pl&&EN[k].pl.includes(tt)).map(k=>EN[k]);
  const mat=['rung','hoang','song','bien','thien'].includes(tt)?'thao':['nui','dong','phe','ma','sao'].includes(tt)?'khoang':null;
  return {fp:Math.min(.9,fp),foes,mat,egg:Math.min(.5,0.1+S().van*0.01)};}
{const _pa0=placeActs;placeActs=function(n){const L=_pa0(n);const r=G.run,w=W(),t=n.type,ruin=n.state==='ruin';
  const add=(a,i,l,h,tip,dis,x)=>L.push({a,i,l,h,tip,dis:!!dis,x});
  if(isTownT(t)&&!ruin){if(t==='tran'||(t==='thanh'&&W().v2))add('taphoa','',contentText("core2_02-dia-diem-mo-rong_js.001"),1,contentText("core2_02-dia-diem-mo-rong_js.002"));
    add('laibuon','',contentText("core2_02-dia-diem-mo-rong_js.003"),0,contentText("core2_02-dia-diem-mo-rong_js.004"));
    add('tuu','',contentText("core2_02-dia-diem-mo-rong_js.005"),3,contentText("core2_02-dia-diem-mo-rong_js.006"),r.st<price(2),contentText("core2_02-dia-diem-mo-rong_js.007")+price(2));
    add('tram','',contentText("core2_02-dia-diem-mo-rong_js.008"),0,contentText("core2_02-dia-diem-mo-rong_js.009"));}
  if(t==='tong')add('nhansu','',contentText("core2_02-dia-diem-mo-rong_js.010"),0,contentText("core2_02-dia-diem-mo-rong_js.011"));
  if(isWild(n)){
    if(!n.dp)add('khaiphu','',contentText("core2_02-dia-diem-mo-rong_js.012"),HM,contentText("core2_02-dia-diem-mo-rong_js.013"),n.danger>=3,n.danger>=3?contentText("core2_02-dia-diem-mo-rong_js.014"):'');
    const y=Math.floor(w.t/HY);const hc=n.hunt&&n.hunt.y===y&&n.hunt.k===r.kiep?n.hunt.c:0;
    add('sanyeu','',hc>=SAN.san?contentText("core2_02-dia-diem-mo-rong_js.015"):contentText("core2_02-dia-diem-mo-rong_js.016")+(SAN.san-hc)+' lần',2,contentText("core2_02-dia-diem-mo-rong_js.017"),hc>=SAN.san); // Sửa-C.11: số lượt săn yêu mỗi năm theo SAN.san
    const m=Math.floor(w.t/HM);const gc=n.gath&&n.gath.m===m&&n.gath.k===r.kiep?n.gath.c:0;const mt=n.type==='duoc'?'thao':n.type==='khoang'?'khoang':exploreStats(n).mat; // dược cốc luôn hái thuốc, mỏ luôn đào khoáng
    if(mt==='thao')add('haithuoc','',contentText("core2_02-dia-diem-mo-rong_js.018"),6,contentText("core2_02-dia-diem-mo-rong_js.019"),gc>=2);
    if(mt==='khoang')add('daokhoang','',contentText("core2_02-dia-diem-mo-rong_js.020"),6,contentText("core2_02-dia-diem-mo-rong_js.021"),gc>=2);}
  return L;};}
// Bảng PA2: content/rules/pa2.js
{const _pa1=placeAct;placeAct=function(a){if(!PA2[a])return _pa1(a);
  const r=G.run,sc=r&&r.scene;if(!sc||sc.type!=='place')return;const n=nodeById(sc.id);const act=placeActs(n).find(x=>x.a===a);if(!act||act.dis)return;
  sc.msg=[];sc.chips=[];const tick=h=>{advanceTime(h);return !!G.run&&G.run.scene===sc;};
  if(a==='taphoa'){if(tick(1))openShop(n);return;}
  if(a==='sanyeu'){const y=Math.floor(W().t/HY);if(!n.hunt||n.hunt.y!==y||n.hunt.k!==r.kiep)n.hunt={y,k:r.kiep,c:0};n.hunt.c++;if(!tick(2))return;{const ty=n.danger>=3&&chance(.35)?'elite':'combat';encounter({type:ty,en:mkEnemy({k:chance(.85)?'beast':'quy',elite:ty==='elite'})});}return;} // săn yêu là đi tìm yêu thú, không đụng người
  if(a==='khaiphu'){if(!tick(HM))return;n.dp=1;sc.msg=[contentText("core2_02-dia-diem-mo-rong_js.022")];sc.chips=[chip('⏳',contentText("core2_02-dia-diem-mo-rong_js.023"),contentText("core2_02-dia-diem-mo-rong_js.024"),'')];return;}
  if(a==='haithuoc'||a==='daokhoang'){const m=Math.floor(W().t/HM);if(!n.gath||n.gath.m!==m||n.gath.k!==r.kiep)n.gath={m,k:r.kiep,c:0};n.gath.c++;if(!tick(6))return;
    const k=a==='haithuoc'?'thao':'khoang';const x=ri(1,3)+(n.danger>=2?1:0);run2().mats[k]+=x;
    sc.msg=[k==='thao'?contentText("core2_02-dia-diem-mo-rong_js.025"):contentText("core2_02-dia-diem-mo-rong_js.026")];
    sc.chips=[chip(MAT[k].i,'+'+x+' '+MAT[k].n.toLowerCase(),contentText("core2_02-dia-diem-mo-rong_js.027"),'up'),chip('⏳','6 giờ',contentText("core2_02-dia-diem-mo-rong_js.028"),'')];return;}
  if(a==='tuu'){r.st-=price(2);if(!tick(3))return;const s=S();r.hp=Math.min(s.maxHp,r.hp+Math.round(s.maxHp*.1));teaHouse(n);
    sc.msg.unshift(pick([contentText("core2_02-dia-diem-mo-rong_js.029"),contentText("core2_02-dia-diem-mo-rong_js.030"),contentText("core2_02-dia-diem-mo-rong_js.031")]));
    sc.chips=[chip('💎','−'+price(2),contentText("core2_02-dia-diem-mo-rong_js.032"),'dn'),chip('⏳','3 giờ',contentText("core2_02-dia-diem-mo-rong_js.033"),'')].concat(applyE({tamma:-4}));return;}
};}
function sellList(){const r=G.run;const L=[];
  r.relics.forEach((x,i)=>L.push({k:'r',i,n:x.name,sub:GRADE[x.tier||0],p:price(25+(x.tier||0)*30),ic:'🏺'}));
  r.pills.forEach((x,i)=>L.push({k:'p',i,n:PILL[x.id].n,sub:contentText("core2_02-dia-diem-mo-rong_js.sellList.034"),p:Math.max(1,Math.round(price(PILL[x.id].p||10)*0.4)),ic:PILL[x.id].i}));return L;}
function sellItem(k,i){const r=G.run;const it=sellList().find(x=>x.k===k&&x.i===i);if(!it)return;
  if(k==='r'){const rel=r.relics[i];r.relics.splice(i,1);const c=run2().chu;for(let j=0;j<8;j++)if(c[j]&&c[j].k==='r'&&c[j].n===rel.name)c[j]=null;clampHp();}else r.pills.splice(i,1);
  r.st+=it.p;log(contentText("core2_02-dia-diem-mo-rong_js.sellItem.035", [it.n,it.p]));note(contentText("core2_02-dia-diem-mo-rong_js.sellItem.036", [it.n,it.p]),'up');}
function stageList(n){const r=G.run;return regionOf(r.region).nodes.filter(x=>x.id!==n.id&&isTownT(x.type)&&x.fog>=3&&x.state!=='ruin')
  .map(x=>{const p=findPath(n.id,x.id);return p?{id:x.id,n:x.name,h:travelHours(p)/3,c:price(1+Math.round(pathLen(p)/60))}:null;}).filter(Boolean);}
function stageGo(id){const r=G.run;const s=stageList(nodeById(r.at)).find(x=>x.id===id);if(!s||r.st<s.c)return;r.st-=s.c;r.scene=null;
  advanceTime(s.h);if(!G.run||G.run.scene)return;arrive(id);openPlace(id);G.run.scene.msg=[contentText("core2_02-dia-diem-mo-rong_js.stageGo.037")+durH(s.h)+contentText("core2_02-dia-diem-mo-rong_js.stageGo.038")+s.n+'.'];}
function sectPeople(n){const w=W();return w.rivals.map((x,i)=>({x,i})).filter(o=>w.sects[o.x.s]&&w.sects[o.x.s].n===n.owner).map(o=>{const st=(w.rstate||[]).find(s=>s.i===o.i)||{};return {ten:o.x.ten,tt:o.x.tt,el:o.x.el,realm:st.realm||0,alive:st.alive!==false};});}

// ================= ĐỢT 3: ĐẠI LỤC LIỀN, LOẠI ĐỊA ĐIỂM MỚI, LINH KHÍ, NGUY HIỂM TƯƠNG ĐỐI, ĐI ĐƯỜNG DÀI, CỐNG HIẾN =================
// Bảng NEWT: content/world/newt.js
// Bảng NAME_PRE: content/world/name-pre.js
for(const k in NEWT){TYPE_NAME[k]=NEWT[k].n;NODE_IC[k]=NEWT[k].ic||'•';if(!P['canh_'+k])P['canh_'+k]=P['canh_'+NEWT[k].as];}
function tAs(t){return NEWT[t]?NEWT[t].as:t;}
function extendWorld(w){if(!w||!w.regions)return;
  for(const R0 of w.regions){if(R0.ext)continue;R0.ext=1;const k=R0.k,X0=k*1000;const used=new Set(R0.nodes.map(n=>n.name));
    const nk=Object.keys(NEWT).filter(k=>!NEWT[k].no);const types=shuffle(nk.slice()).concat(shuffle(nk.slice())).slice(0,10);
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
// Bảng LK_N, LK_M: content/rules/lk-n.js
function lkOf(n){if(!n)return 1;if(n.type==='linhdia'||n.type==='dongthien'||n.type==='bicanh')return 3;if(n.type==='tong')return 2;if(['tran','thanh','cho','ai'].includes(n.type))return 0;if(isTuT(n.type))return 1; // nơi tu sĩ có chút linh khí
  return Math.min(3,hashS('lk'+W().seed+':'+n.id)%3+(n.dp?1:0));}
// ----- mức nguy hiểm so với chính ngươi -----
// Bảng DTAG: content/world/dtag.js
// Bảng SETTLE: content/world/settle.js
function dangerTag(n){const r=G.run;if(!n||!r)return 0;
  if(SETTLE.includes(n.type)){
    if(n.type==='tong'){const s=W().sects.find(x=>x.n===n.owner);const al=s&&s.al;
      if(al==='chinh'&&r.karma<=-60||(al==='ma'||al==='ta')&&r.karma>=60)return 3;
      if(al==='chinh'&&r.karma<=-25||(al==='ma'||al==='ta')&&r.karma>=25)return 2;return 0;}
    if(r.karma<=-60&&n.type!=='ancu')return 2; // tiếng ác đồn xa, quan phủ treo thưởng
    return (n.state==='ruin'&&n.fog>=2)?1:0;}
  const d=rT()+nodeDanger(n)*0.5-r.realm;return d<=0?0:d<0.75?1:d<1.5?2:3;}
function dangerWhy(n){const g=dangerTag(n);if(SETTLE.includes(n.type))return g?contentText("core2_02-dia-diem-mo-rong_js.dangerWhy.042"):contentText("core2_02-dia-diem-mo-rong_js.dangerWhy.043");
  return [contentText("core2_02-dia-diem-mo-rong_js.dangerWhy.044"),contentText("core2_02-dia-diem-mo-rong_js.dangerWhy.045"),contentText("core2_02-dia-diem-mo-rong_js.dangerWhy.046"),contentText("core2_02-dia-diem-mo-rong_js.dangerWhy.047")][g];}

// ----- thông tin thêm cho thẻ địa điểm: thế lực tọa trấn, quy mô, đôi dòng mô tả (cố định theo từng nơi) -----
function placeMeta(n){const h=hashS('pm'+W().seed+':'+n.id),w=W();const pk=(L,k)=>L[(h>>>(k||0))%L.length];
  const sect=w.sects&&w.sects.length?pk(w.sects,3).n:contentText("core2_02-dia-diem-mo-rong_js.placeMeta.048");const ho=pk(NAME.ho,5);
  let luc,quy;const t=isTownT(n.type)?(isThanhT(n.type)?'thanh':'tran'):n.type;
  if(t==='tong'){luc=n.owner||sect;quy=pk([contentText("core2_02-dia-diem-mo-rong_js.placeMeta.049"),contentText("core2_02-dia-diem-mo-rong_js.placeMeta.050"),contentText("core2_02-dia-diem-mo-rong_js.placeMeta.051")],7);}
  else if(t==='thanh'){luc=pk([contentText("core2_02-dia-diem-mo-rong_js.placeMeta.052")+ho,contentText("core2_02-dia-diem-mo-rong_js.placeMeta.053"),sect+contentText("core2_02-dia-diem-mo-rong_js.placeMeta.054"),contentText("core2_02-dia-diem-mo-rong_js.placeMeta.055")+ho+' gia'],2);quy=pk([contentText("core2_02-dia-diem-mo-rong_js.placeMeta.056"),contentText("core2_02-dia-diem-mo-rong_js.placeMeta.057"),contentText("core2_02-dia-diem-mo-rong_js.placeMeta.058")],6);}
  else if(t==='tran'){luc=pk([contentText("core2_02-dia-diem-mo-rong_js.placeMeta.059"),contentText("core2_02-dia-diem-mo-rong_js.placeMeta.060")+ho,ho+contentText("core2_02-dia-diem-mo-rong_js.placeMeta.061"),contentText("core2_02-dia-diem-mo-rong_js.placeMeta.062")+ho],2);quy=pk([contentText("core2_02-dia-diem-mo-rong_js.placeMeta.063"),contentText("core2_02-dia-diem-mo-rong_js.placeMeta.064"),contentText("core2_02-dia-diem-mo-rong_js.placeMeta.065")],6);}
  else if(t==='cho'){luc=contentText("core2_02-dia-diem-mo-rong_js.placeMeta.066")+ho+' gia';quy=pk([contentText("core2_02-dia-diem-mo-rong_js.placeMeta.067"),contentText("core2_02-dia-diem-mo-rong_js.placeMeta.068")],6);}
  else if(t==='ancu'){luc=contentText("core2_02-dia-diem-mo-rong_js.placeMeta.069");quy=contentText("core2_02-dia-diem-mo-rong_js.placeMeta.070");}
  else if(t==='ai'){luc=contentText("core2_02-dia-diem-mo-rong_js.placeMeta.071");quy=contentText("core2_02-dia-diem-mo-rong_js.placeMeta.072");}
  else if(t==='ma'){luc=pk([contentText("core2_02-dia-diem-mo-rong_js.placeMeta.073"),contentText("core2_02-dia-diem-mo-rong_js.placeMeta.074"),contentText("core2_02-dia-diem-mo-rong_js.placeMeta.075")],2);quy=pk([contentText("core2_02-dia-diem-mo-rong_js.placeMeta.076"),contentText("core2_02-dia-diem-mo-rong_js.placeMeta.077")],6);}
  else{luc=(n.danger||0)>=3?contentText("core2_02-dia-diem-mo-rong_js.placeMeta.078"):(n.danger||0)>=2?contentText("core2_02-dia-diem-mo-rong_js.placeMeta.079"):(n.danger||0)>=1?contentText("core2_02-dia-diem-mo-rong_js.placeMeta.080"):contentText("core2_02-dia-diem-mo-rong_js.placeMeta.081");
    quy=pk([contentText("core2_02-dia-diem-mo-rong_js.placeMeta.082"),contentText("core2_02-dia-diem-mo-rong_js.placeMeta.083"),contentText("core2_02-dia-diem-mo-rong_js.placeMeta.084"),contentText("core2_02-dia-diem-mo-rong_js.placeMeta.085")],6);}
  if(n.fa&&isTownT(n.type)&&typeof chuTen==='function'){const o=chuTen(n.fa);if(o)luc=o;} // thế giới mới: chủ thành trấn là Hoàng quốc hoặc thế lực tu sĩ
  if((n.vstate||n.state)==='ruin'){luc=contentText("core2_02-dia-diem-mo-rong_js.placeMeta.086");}
  const L=P['canh_'+t]||P.canh_tran;const desc=L[(h>>>9)%L.length];
  return {luc,quy,desc:desc.indexOf('{')<0?desc:''};}
// ----- đi đường: tính theo tháng năm, tùy thân pháp và phương tiện -----
// Bảng MOUNT: content/world/mount.js
function mountOf(){const r=G.run;return r&&r.mount?MOUNT.find(x=>x.id===r.mount):null;}
function walkSpeed(){const r=G.run;const m=mountOf();let v=WALK[r.realm]/180*(1+S().tp/25)*(m?m.m:1);if(SEASON_ON&&seasonOf(W().t)==='dong')v*=0.8;return v;}
function moveText(){const m=mountOf();return m?m.n:(G.run.realm>=2?contentText("core2_02-dia-diem-mo-rong_js.moveText.087"):'đi bộ');}
function buyMount(id){const r=G.run;const m=MOUNT.find(x=>x.id===id);if(!m||r.mount===id)return;const c=price(m.p);if(r.st<c||r.realm<(m.realm||0))return;r.st-=c;r.mount=id;log(contentText("core2_02-dia-diem-mo-rong_js.buyMount.088")+m.n+'.');note(contentText("core2_02-dia-diem-mo-rong_js.buyMount.089")+m.n.toLowerCase()+'.','up');}

// ----- bế quan: hầu hết mọi nơi, trừ tử địa; linh khí quyết định tốc độ -----
function bqRate(){const s=S(),n=curNode();return bqGain(1)*(1+(s.fx.bqP||0)/100)*LK_M[lkOf(n)]*(n&&n.dp?1.15:1)*(G.bqRoom?1.5:1);}
function bqRisk(y){if(G.bqRoom)return 0;const n=curNode();if(y<1)return 0;return Math.min(.7,.11*y*(1+dangerTag(n)*0.6)*(n&&n.dp?0.6:1));}
function bqCan(){const r=G.run;if(!r||r.moving)return contentText("core2_02-dia-diem-mo-rong_js.bqCan.090");if(dangerTag(curNode())>=3)return contentText("core2_02-dia-diem-mo-rong_js.bqCan.091");return '';}
function bqInfo(){const r=G.run,s=S();const rate=bqRate();const left=Math.max(0,s.life-r.age);
  const need=Math.max(0,100-r.tv)/rate;let maxY=Math.max(0.25,Math.min(20,Math.floor(left*4)/4));
  if(G.bqRoom)maxY=Math.max(0.25,Math.min(maxY,Math.floor(chGet(chKey())/CH_YEAR*4)/4));
  return {rate,left,need:Math.max(0.25,Math.ceil(need*4)/4),maxY,full:r.tv>=100};}
function bqCustom(y){const r=G.run;if(!r||bqCan())return false;if(!r.scene)openPlace(r.at);const sc=r.scene;if(!sc||sc.type!=='place')return false;
  const I=bqInfo();y=clamp(Math.round(y*4)/4,0.25,I.maxY);const room=!!G.bqRoom;
  if(room){const c=Math.ceil(y*CH_YEAR);if(chGet(chKey())<c){G.bqRoom=false;return false;}chAdd(chKey(),-c);}
  const g=bqRate()*y*(y<1?0.9:1);const risk=bqRisk(y);G.bqRoom=false;sc.msg=[T(bqText())];sc.chips=[];
  if(chance(risk)){advanceTime(y*HY*0.5);if(!G.run)return true;sc.msg.push(T(REST_T.bqint));
    sc.chips=applyE({tv:g*0.5,tvMajor:1,tamma:-3});if(!G.run)return true;startCombat({},{kind:'place',msg:sc.msg.slice()});return true;}
  const o=advanceTime(y*HY);if(!G.run)return true;if(o.length)sc.msg.push(contentText("core2_02-dia-diem-mo-rong_js.bqCustom.092")+o.slice(-2).join(' '));
  const ch=[chip('⏳',durH(y*HY),contentText("core2_02-dia-diem-mo-rong_js.bqCustom.093"),'')].concat(applyE({tv:g,tvMajor:1,tamma:-Math.min(12,Math.round(3*y)+3)}));if(!G.run)return true;
  const s1=S();r.hp=s1.maxHp;r.mp=s1.maxMp;if(G.run.scene===sc)sc.chips=ch;return true;}
