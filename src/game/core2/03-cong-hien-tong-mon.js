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
