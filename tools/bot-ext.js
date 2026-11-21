// Phần mở rộng cho bot.js (chạy trong cùng không gian với lõi game): thử càng nhiều tính năng càng tốt và báo độ phủ.
// - botManage(): bước "quản lý" ngẫu nhiên: trang bị, đồ, công pháp, linh thú, luyện chế, mua bán, khóa chiêu...
// - botPlaceX(): ở địa điểm, ưu tiên việc mà bot ít làm nhất (theo bộ đếm độ phủ).
// - botSceneY(): xử lý thêm các loại cảnh bot cũ bỏ qua (kỳ ngộ, chuyện việc treo thưởng...).
// - COV: bộ đếm số lần mỗi tính năng được gọi. botReport() in ra phần chưa từng chạm tới.
var COV={};
function covInc(k){COV[k]=(COV[k]||0)+1;}
// bọc hàm để đếm số lần gọi (chỉ quan sát)
const COV_FN=['triQuyet','triNam','triGapTk','triThuyet','ntMo','ntChon','ntKet','dmDl02','dmDietThieu','mrDuyenTick','dmDo','datMua','datBan','kyDmChon','mongNhat','triThem','gbChon','benDoi','benUong','benTiep','dmKetDoi','dmKetHet','datPha','datXay','tnaToi','tnaChPick','tnaQpDo','tnaGiam','equip','unequip','bagUse','usePill','learnBook','studyArt','dropArt','artStash','artUnstash','petHatch','petFeed','petSet','petFree','craft','sellItem','buyUpg','buyMount','chGive','chTrade','ddPut','ddTake','chuAuto','knSet','stageGo','meetEnt','venueDo','questDo','takeQuest','kyPick','qevPick','btFinish','btFail','doCross','doGoBack','lkXk','bqCustom','playerAct','playerPillAct','playerFlee','playerYield','playerDD','playerMind','playerUlt','playerBurn','kvChoose','htChoose','skLockToggle','bossFight','encAct','retire','sellItem','passAct','buy','takePick','rewardContinue','combatContinue','choose','tamMaChon','hoatAnh','ccStart','ccDo','ccRite','tuHoc','tuHd','tuTang','tuDoiPhu','tuBiHoc','tuKhuy','mrTho','mrBo'];
for(const n of COV_FN){const f=globalThis[n];if(typeof f!=='function')continue;globalThis[n]=function(){covInc(n);return f.apply(this,arguments);};}
{const f=placeAct;placeAct=function(a){covInc('placeAct:'+a);return f.apply(this,arguments);};}
{const f=venueDo;venueDo=function(v,id){covInc('venue:'+v+':'+id);return f.apply(this,arguments);};}
{const f=playerAct;playerAct=function(id,t){covInc('skill:'+(String(id)[0]==='_'?id:'chiêu'));return f.apply(this,arguments);};}

const rr=a=>a[Math.floor(Math.random()*a.length)];
function free(){const r=G.run;return r&&!r.moving&&(!r.scene||r.scene.type==='place');}
// các việc quản lý: mỗi việc trả về true nếu đã làm gì đó
const MANAGE={
  equip(){const r=G.run;const i=r.relics.findIndex(x=>x.k!=='book');if(i<0)return false;equip(i);return true;},
  unequip(){const E=eqOf();const s=Object.keys(E).find(k=>E[k]);if(s==null||!chance(.3))return false;unequip(s);return true;},
  bag(){const it=bagItems().filter(x=>x.use);if(!it.length)return false;bagUse(rr(it).key,1);return true;},
  pillOut(){const r=G.run;const L=r.pills.map((p,i)=>({p,i})).filter(x=>PILL[x.p.id].w!=='bt');if(!L.length||!chance(.4))return false;usePill(rr(L).i,false);return true;},
  book(){const r=G.run;const i=r.relics.findIndex(x=>x.k==='book');if(i<0)return false;return !!learnBook(i);},
  study(){const r=G.run;if(!free()||r.scene)return false;const a=rr(arts()||[]);if(!a)return false;return !!studyArt(a.u);},
  stash(){const A=arts();if(!A.length||!chance(.2))return false;const a=rr(A);if(chance(.5)){artStash(a.u);return true;}const K=artKho();if(K.length){artUnstash(rr(K).u);return true;}return false;},
  forget(){const A=arts();if(A.length<3||!chance(.1))return false;dropArt(rr(A).u);return true;},
  chu(){chuAuto();syncSkills();return true;},
  kn(){const r=G.run;if(!r.kn)return false;const c=rr(['atk','def','move']);const av=knAvail(c);const ids=Object.keys(av);if(!ids.length)return false;knSet(c,chance(.3)?r.kn[c].length:0,rr(ids));return true;},
  dd(){const r=G.run;eqOf();if(r.dd&&r.dd.length&&chance(.3)){ddTake(0);return true;}const i=r.relics.findIndex(x=>x.k!=='book'&&ddCan(x));if(i<0)return false;return !!ddPut(i);},
  pet(){const r=run2();if(r.eggs&&r.eggs.length&&chance(.5)){petHatch(0,true);return true;}if(r.pets.length){const i=Math.floor(Math.random()*r.pets.length);if(chance(.4)){petSet(i);return true;}if(r.pills.length&&chance(.5)){petFeed(i,0);return true;}if(chance(.1)){petFree(i);return true;}}return false;},
  craft(){const r=run2();if(!free()||r.scene)return false;const L=CRAFT.filter(c=>craftOk(c));if(!L.length)return false;return !!craft(rr(L).id);},
  sell(){const L=sellList();if(!L.length||!chance(.4))return false;const it=rr(L);sellItem(it.k,it.i);return true;},
  mount(){const m=MOUNT.filter(x=>G.run.mount!==x.id&&G.run.st>=price(x.p)&&G.run.realm>=(x.realm||0));if(!m.length||!chance(.3))return false;buyMount(rr(m).id);return true;},
  tong(){const r=run2();if(!r.flags||!r.flags.tongmon)return false;const k=Object.keys(r.mats||{}).find(x=>r.mats[x]>0);if(chGet(chKey())>=15&&chance(.5)){chTrade();return true;}if(k){chGive(k);return true;}return false;},
  lock(){const r=G.run;if(!r.skills.length)return false;skLockToggle(rr(r.skills).id);return true;},
  // Đ6 cải căn: vô căn đã nghe dấu vết thì thử bắt đầu một đường (các bước làm ở hộp Cơ duyên tại nơi neo)
  nghetu(){const r=G.run;if(typeof tuOpts!=='function'||!r||r.pham)return false;const n=nodeById(r.at);const L=tuOpts(n).filter(o=>!o.no);if(!L.length)return false;const o=rr(L);return !!tuDo(n,o.id);},
  caican(){const r=G.run;if(typeof ccStart!=='function'||!r||r.cc||r.ccOk||!r.ccHeard)return false;const L=Object.keys(r.ccHeard).filter(id=>!ccWhyStart(id));if(!L.length)return false;return ccStart(rr(L));},
  meta(){const M=G.meta;const u=UPG.filter(x=>(M.upg[x.id]||0)<x.max&&M.pts>=x.c[M.upg[x.id]||0]);if(!u.length)return false;buyUpg(rr(u).id);return true;},
};
// mua đồ ăn mang theo khi ở thôn trấn mà túi còn ít (người chơi thật được báo "đường xa sẽ đói", bot thì không đọc)
function botFood(muc){muc=muc||300;const r=G.run;if(!r||!free()||typeof feat!=='function'||!feat('an')||r.anFree||typeof anTuiV!=='function')return false;
  const n=nodeById(r.at);if(!n||!AN.quan.includes(n.type)||n.state==='ruin'||anTuiV(r)>=muc/2||(r.bac||0)<400)return false;
  if(r._anMua===r.at+':'+Math.floor(W().t/HD))return false;r._anMua=r.at+':'+Math.floor(W().t/HD);
  const sc0=r.scene;openShop(n);const sc=G.run.scene;let k=0;
  if(sc&&sc.type==='shop')for(let g=0;g<12&&anTuiV(r)<muc&&(r.bac||0)>300;g++){
    const L=sc.items.map((it,i)=>({it,i})).filter(x=>x.it.k==='qi'&&anMon(x.it.id)&&!x.it.sold&&(r.bac||0)-x.it.bac>200);if(!L.length)break;
    L.sort((a,b)=>anMonV(b.it.id)/b.it.bac-anMonV(a.it.id)/a.it.bac);const n0=r.qitems.length;buy(L[0].i);if(r.qitems.length===n0)break;k++;}
  G.run.scene=sc0;if(k)covInc('m:muaAn');return k>0;}
// hết tiền xu: làm thuê ở nơi có việc (lương cao / giờ, tránh việc rủi ro nếu được)
function botWork(){const r=G.run;if(!r||!free()||typeof vtList!=='function'||!feat('tien')||(r.bac||0)>=300)return false;
  const n=nodeById(r.at);if(!n||n.state==='ruin')return false;const L=vtList(n).filter(v=>!v.why);if(!L.length)return false;
  L.sort((a,b)=>(b.rui?0:1)-(a.rui?0:1)||(b.cong[0]+b.cong[1])/b.h-(a.cong[0]+a.cong[1])/a.h);
  const sc0=r.scene;if(!sc0||sc0.type!=='place'||sc0.id!==n.id)openPlace(n.id);const ok=vtDo(L[0].id);
  if(G.run&&G.run.scene&&G.run.scene.type!=='place'&&G.run.scene.type!=='combat'&&G.run.scene.type!=='kyngo'&&G.run.scene.type!=='event')G.run.scene=sc0;
  if(ok)covInc('m:lamThue');return ok;}
// đi đường: đọc lời báo "đường xa sẽ chết đói" như người chơi; đang ở thôn trấn thì mua thêm đồ ăn rồi mới đi, vẫn chết đói thì thôi
function botQuan(n){return !!n&&AN.quan.includes(n.type)&&n.state!=='ruin';}
{const _g=goOrOpen;goOrOpen=function(n){const r=G.run;if(!r||!n||n.id===r.at||typeof anTripRisk!=='function'||!feat('an'))return _g.apply(this,arguments);
  let R=anTripRisk(n.id);if(R&&botQuan(nodeById(r.at))){r._anMua=null;botFood(600);R=anTripRisk(n.id);}
  if(R&&!BOT_VE&&(R.doi1>=R.chet||!botQuan(n))){covInc('m:tranhDoi');return false;}return _g.apply(this,arguments);};}
var BOT_VE=0;
// đói mà không còn gì ăn, đang ở nơi hoang: về thôn trấn gần nhất
function botVeAn(){const r=G.run;if(!r||(r.moving&&!r.halt)||(r.scene&&r.scene.type!=='place')||!feat('an')||(r.doi||0)<AN.anQuan||anTuiV(r)>=100-(r.doi||0)||botQuan(nodeById(r.at)))return false;
  let best=null,bh=1e9;for(const R of W().regions)for(const n of R.nodes){if(!botQuan(n)||!(n.fog>=1))continue;const p=findPath(r.at,n.id);if(!p)continue;const h=travelHours(p);if(h<bh){bh=h;best=n;}}
  if(!best)return false;covInc('m:veAn');BOT_VE=1;try{if(r.scene)r.scene=null;return goOrOpen(best);}finally{BOT_VE=0;}}
function botManage(){
  if(botVeAn()||botFood()||botWork())return;
  if(G.run&&G.run.kvPick&&free()){kvChoose(Math.floor(Math.random()*G.run.kvPick.length));return;} // chọn khí vận sau đột phá
  if(G.run&&G.run.htPick&&free()){htChoose(0);return;}
  if(!G.run||!free()||!chance(.25))return;
  const ks=Object.keys(MANAGE);
  // ưu tiên việc ít được làm nhất
  ks.sort((a,b)=>(COV['m:'+a]||0)-(COV['m:'+b]||0)+(Math.random()-.5)*3);
  for(const k of ks.slice(0,3)){if(!G.run)return;if(MANAGE[k]()){covInc('m:'+k);return;}}
}
// ở địa điểm: làm việc ít làm nhất (20% số lần), gồm cả việc quán/rượu/trọ, quay về vùng cũ, lịch luyện...
function botPlaceX(acts,has,n){
  const r=G.run;if(r._goal==='tram'&&has('tram')){r._goal=null;const L2=stageList(n).filter(x=>r.st>=x.c);if(L2.length){stageGo(rr(L2).id);return true;}}
  if(r._goal==='back'&&has('goback')){r._goal=null;placeAct('goback');return true;}
  if(!chance(.3))return false;
  const skip=['bt','cross','boss','explore','xk','quyan','bq1','bq3'];
  const L=acts.filter(a=>!a.dis&&!skip.includes(a.a));
  if(chance(.004)&&has('quyan')){placeAct('quyan');return true;}
  if(!L.length)return false;
  L.sort((a,b)=>(COV['placeAct:'+a.a]||0)+(COV['venue:'+a.a]?1:0)-((COV['placeAct:'+b.a]||0)+(COV['venue:'+b.a]?1:0))+(Math.random()-.5)*2);
  const a=L[0];
  if(a.a==='goback'&&!chance(.25))return false;
  if(VENUE_N[a.a]){const O=venueOpts(n,a.a).filter(o=>!o.no&&!o.lack);if(!O.length)return false;return !!venueDo(a.a,rr(O).id);}
  if(a.a==='tram'){const L2=stageList(n).filter(x=>r.st>=x.c);if(L2.length&&chance(.5)){stageGo(rr(L2).id);return true;}placeAct('tram');return true;}
  placeAct(a.a);return true;
}
// cảnh bot cũ chưa biết xử lý
function botSceneY(sc){
  const r=G.run;
  if(sc.type==='kyngo'){if(sc.res){r.scene=null;if(r.moving)r.moving.halt=0;return true;}const ev=KYNGO.find(x=>x.id===sc.ev);const ok=ev.c.map((c,i)=>i).filter(i=>!(ev.c[i].need&&ev.c[i].need()));if(!ok.length){r.scene=null;return true;}kyPick(rr(ok));return true;}
  if(sc.type==='qev'){if(sc.res){r.scene=null;return true;}for(let i=0;i<4&&!sc.res;i++)qevPick(i);if(!sc.res)r.scene=null;return true;}
  if(sc.type==='tp'){r.scene=null;return true;}
  return false;
}
// sau mỗi bước chiến đấu: thử thêm đòn phụ (đỡ, tế pháp bảo, thần thức, thần thông, đốt lực, nhường)
function botCombatX(sc){
  const u=readyPlayer(sc);if(!u||!chance(.15))return false;
  const k=rr(['block','dd','mind','ult','burn','yield','pill','flee']);
  if(k==='pill'){const L=G.run.pills.map((p,i)=>i).filter(i=>PILL[G.run.pills[i].id].w!=='bt');return L.length?playerPillAct(rr(L)):false;}
  if(k==='flee')return chance(.3)?playerFlee():false;
  if(k==='block')return playerAct('_block');
  if(k==='dd'){const r=G.run;return r.dd&&r.dd.length?playerDD(0,null):false;}
  if(k==='mind')return playerMind(null);
  if(k==='ult')return playerUlt();
  if(k==='burn'){const o=typeof burnOpts==='function'?burnOpts(sc).find(x=>x.ok):null;return o?playerBurn(o.k):false;}
  if(k==='yield'&&chance(.2))return playerYield();
  return false;
}
// báo cáo độ phủ: mọi hàm bọc + việc quản lý + việc ở địa điểm
function botReport(){
  const all=COV_FN.filter((x,i,A)=>typeof globalThis[x]==='function'&&A.indexOf(x)===i).concat(Object.keys(MANAGE).map(k=>'m:'+k));
  const hit=all.filter(k=>COV[k]),miss=all.filter(k=>!COV[k]);
  const pl=Object.keys(COV).filter(k=>k.startsWith('placeAct:')).map(k=>k.slice(9)+'×'+COV[k]).join(' ');
  const vn=Object.keys(COV).filter(k=>k.startsWith('venue:')).length;
  const sk=Object.keys(COV).filter(k=>k.startsWith('skill:')).map(k=>k.slice(6)+'×'+COV[k]).join(' ');
  return `Độ phủ tính năng: ${hit.length}/${all.length}\n  Chưa từng chạy: ${miss.join(', ')||'(không)'}\n  Việc ở địa điểm: ${pl}\n  Việc quán/trọ/rượu khác nhau đã thử: ${vn}\n  Chiêu: ${sk}\n  Cảnh đã gặp: ${Object.keys(COV).filter(k=>k.startsWith('scene:')).map(k=>k.slice(6)+'×'+COV[k]).join(' ')}\n  Sự kiện khác nhau đã gặp: ${Object.keys(COV).filter(k=>k.startsWith('ev:')).length}`;
}

// chế độ --boost: cấp thêm linh thạch và hồi máu ngoài trận để bot sống lâu hơn, đi sâu hơn vào các cảnh giới và vùng cao
var BOOST_EN=null;
function botBoost(){const r=G.run;if(!r)return;if(r.st<800)r.st=800;
  // thủ lĩnh vùng: cho bot biết chỗ sào huyệt khi đủ cảnh giới để thử đánh thủ lĩnh
  if(r.region<5&&r.realm>=r.region+1){const L=nodeById(regionOf(r.region).lair);if(L&&L.fog<1)L.fog=1;}
  // trứng linh thú: nhặt từ kẻ địch vừa đánh (cùng công thức với trò chơi) để thử ấp, cho ăn, thả
  {const sc=r.scene;if(sc&&sc.type==='combat'&&sc.en)BOOST_EN=sc.en;else if(!sc&&BOOST_EN){const q=run2();if(q.pets.length+q.eggs.length<PET_MAX&&chance(.4))q.eggs.push({k:BOOST_EN.k,n:petName(BOOST_EN),i:BOOST_EN.i,el:BOOST_EN.el||'vo',t:W().t+3*HM});BOOST_EN=null;}}
  // cống hiến tông môn: đủ để đổi đan
  {const q=run2();if(q.flags&&q.flags.tongmon&&(q.ch||0)<15&&chance(.1))q.ch=15;}const sc=r.scene;if(!sc||sc.type!=='combat'){const s=S();if(r.hp<s.maxHp)r.hp=s.maxHp;if(r.mp<s.maxMp)r.mp=s.maxMp;}
  else{const me=mainUnit(sc);if(me&&me.hp>0&&me.hp<me.max*0.6)me.hp=Math.round(me.max*0.6);}}
// đi về điểm vào của vùng để thử quay về vùng cũ
// đánh thủ lĩnh vùng khi đủ cảnh giới (trước đây mục tiêu vượt ải luôn lấn át nên chưa bao giờ đánh thủ lĩnh)
function botBossGoal(){const r=G.run;if(r.region>4||r.bossDone[r.region]||r.realm<r.region+1||r.hp<S().maxHp*0.7||!chance(.15))return false;const n=nodeById(regionOf(r.region).lair);if(n.fog<1&&n.id!==r.at)return false;r._goal='boss';return goOrOpen(n);}
// đi tới nơi có trạm dịch để thử đi trạm
function botStageGoal(){const r=G.run;if(!chance(.03))return false;const n=nearest(x=>x.fog>=1&&placeActs(x).some(a=>a.a==='tram'));if(!n)return false;r._goal='tram';return goOrOpen(n);}
function botBackGoal(){const r=G.run;if(r.region<1||!chance(.03))return false;const n=nodeById(regionOf(r.region).entry);if(n.fog<1&&n.id!==r.at)return false;r._goal='back';return goOrOpen(n);}
