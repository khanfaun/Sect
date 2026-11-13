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
    const m=Math.floor(w.t/HM);const gc=n.gath&&n.gath.m===m&&n.gath.k===r.kiep?n.gath.c:0;const mt=n.type==='duoc'?'thao':n.type==='khoang'?'khoang':exploreStats(n).mat; // dược cốc luôn hái thuốc, mỏ luôn đào khoáng
    if(mt==='thao')add('haithuoc','','Hái thuốc dại',6,'Kiếm linh thảo để luyện đan. Mỗi tháng hai lần.',gc>=2);
    if(mt==='khoang')add('daokhoang','','Đào khoáng',6,'Kiếm linh khoáng để luyện khí. Mỗi tháng hai lần.',gc>=2);}
  return L;};}
const PA2={khaiphu:1,sanyeu:1,haithuoc:1,daokhoang:1,tuu:1,taphoa:1};
{const _pa1=placeAct;placeAct=function(a){if(!PA2[a])return _pa1(a);
  const r=G.run,sc=r&&r.scene;if(!sc||sc.type!=='place')return;const n=nodeById(sc.id);const act=placeActs(n).find(x=>x.a===a);if(!act||act.dis)return;
  sc.msg=[];sc.chips=[];const tick=h=>{advanceTime(h);return !!G.run&&G.run.scene===sc;};
  if(a==='taphoa'){if(tick(1))openShop(n);return;}
  if(a==='sanyeu'){const y=Math.floor(W().t/HY);if(!n.hunt||n.hunt.y!==y||n.hunt.k!==r.kiep)n.hunt={y,k:r.kiep,c:0};n.hunt.c++;if(!tick(2))return;{const ty=n.danger>=3&&chance(.35)?'elite':'combat';encounter({type:ty,en:mkEnemy({k:chance(.85)?'beast':'quy',elite:ty==='elite'})});}return;} // săn yêu là đi tìm yêu thú, không đụng người
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
  const g=bqRate()*y*(y<1?0.9:1);const risk=bqRisk(y);G.bqRoom=false;sc.msg=[T(bqText())];sc.chips=[];
  if(chance(risk)){advanceTime(y*HY*0.5);if(!G.run)return true;sc.msg.push(T(REST_T.bqint));
    sc.chips=applyE({tv:g*0.5,tvMajor:1,tamma:-3});if(!G.run)return true;startCombat({},{kind:'place',msg:sc.msg.slice()});return true;}
  const o=advanceTime(y*HY);if(!G.run)return true;if(o.length)sc.msg.push('Trong lúc ấy: '+o.slice(-2).join(' '));
  const ch=[chip('⏳',durH(y*HY),'Thời gian trôi qua','')].concat(applyE({tv:g,tvMajor:1,tamma:-Math.min(12,Math.round(3*y)+3)}));if(!G.run)return true;
  const s1=S();r.hp=s1.maxHp;r.mp=s1.maxMp;if(G.run.scene===sc)sc.chips=ch;return true;}
