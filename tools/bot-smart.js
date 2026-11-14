// Chiến lược "thông minh" cho bot (bật bằng: node bot.js 20 --quiet --smart). Nạp sau bot-ext.js, ghi đè botPlan/botPlace/botScene/botManage.
// Thứ tự ưu tiên: 1) sống sót  2) đột phá khi đủ chắc  3) tu luyện (bế quan, lịch luyện)  4) tích luỹ linh thạch, đan đột phá
//                 5) tiến vùng khi đủ mạnh (thủ lĩnh, vượt ải)  6) tranh cơ duyên (hội đấu giá, tranh bảo vật) khi đủ sức  7) khám phá.
// Mỗi quyết định có lý do, đếm trong DEC và ghi vào nhật ký NK ('bot.dinh'). Cuối bản in: "Quyết định của bot".
var SMART=true,DEC={};
function why(tag,reason){const k=tag+': '+reason;DEC[k]=(DEC[k]||0)+1;dbg('bot.dinh',{tag,reason});}
function hpR(){const r=G.run;return r.hp/Math.max(1,S().maxHp);}
// dự trữ linh thạch: đủ mua đan đột phá và đan hồi máu
function reserve(){const r=G.run;return price(60)+(btItems().length<2?price(90):0)+(r.realm>=1?price(40):0);}
function pillsOf(id){return G.run.pills.filter(p=>p.id===id).length;}
// chọn vật phẩm đặt vào ô chuẩn bị đột phá: lần lượt món nâng tỉ lệ nhiều nhất
function bestSlots(){const sc=G.run.scene;const items=btItems().map(x=>x.i);let slots=[];
  for(let k=0;k<5;k++){let best=null,bg=0.004;const base=btRate(slots);for(const i of items){if(slots.includes(i))continue;const g=btRate(slots.concat([i]))-base;if(g>bg){bg=g;best=i;}}if(best==null)break;slots.push(best);}
  return slots;}
// đột phá khi tỉ lệ đủ cao; chưa đủ thì chuẩn bị thêm (tối đa vài lần) rồi vẫn thử để khỏi kẹt
function breakRate(){const best=bestSlots();return btRate(best);}
function breakReady(){const r=G.run;if(!canBreak())return false;if(hpR()<0.95)return false;
  const p=breakRate();r._prep=r._prep||0;
  if(p>=0.6||camNgoFull())return true;
  if(r._prep>=4){return true;}   // đã chuẩn bị nhiều lần, thử luôn
  return false;}
// gom thông tin sống còn
function weak(){const r=G.run;return hpR()<0.5;}
// điểm giá trị của một kết quả sự kiện (đoán theo khoá hiệu ứng)
function scoreE(e){let s=0;if(!e)return 0;
  for(const k in e){const v=e[k];
    if(k==='relic')s+=6;else if(k==='pill')s+=4*(typeof v==='number'?v:1);else if(k==='st')s+=(+v||0)*0.04;else if(k==='tv')s+=(+v||0)*(isPham()?1.3:0.35);
    else if(k==='lore'||k==='skill')s+=3;else if(k==='karma')s+=(+v||0)*0.4;else if(k==='oan')s-=2;else if(k==='an')s+=2;
    else if(k==='tamma')s-=(+v||0)*0.15;else if(k==='hp'||k==='hpP'){const x=parseFloat(v);if(x)s+=x*(k==='hpP'?0.05:0.08);}
    else if(k==='ngo'||k==='van'||k==='tam'||k==='tp')s+=(+v||0)*2;}
  return s;}
function scoreOut(o){if(!o)return 0;let s=scoreE(o.e);if(o.fight){const risk=(hpR()>0.7?1.5:hpR()>0.5?4:9)+(G.run.realm===0?5:0);s-=risk;if(o.win)s+=0.8*scoreOut(o.win);if(o.lose)s+=0.2*scoreOut(o.lose);}return s;}
function scoreChoice(c){let s;
  if(c.chk){const p=chkChance(c.chk);s=p*scoreOut(c.ok)+(1-p)*scoreOut(c.no);}
  else if(c.o&&c.o.length){s=c.o.reduce((a,x)=>a+scoreOut(x),0)/c.o.length;}
  else{s=scoreOut(c);if(c.fight)s-=0;}
  if(c.cost&&c.cost.st){const d=Math.max(1,Math.round(c.cost.st*SC[G.run.region]));s-=d*0.05*(G.run.st-d<reserve()?3:1);}
  return s;}
function smartEvent(sc){
  if(sc.phase!=='choose'){endScene();return;}
  const L=visChoices(sc).filter(({c})=>costOk(c.cost));if(!L.length){sc.phase='done';return;}
  const sc2=L.map(({c,i})=>({i,s:scoreChoice(c)+Math.random()*0.3}));sc2.sort((a,b)=>b.s-a.s);
  why('sự kiện',sc2[0].s>0.5?'chọn việc có lợi':'chọn việc ít hại');choose(sc2[0].i);}
// cửa hàng: chỉ mua thứ cần, giữ dự trữ
function smartShop(sc){const r=G.run;let bought=0;
  const want=(it)=>{const id=it.id;if(it.sold||it.k!=='pill')return 0;const P=PILL[id];
    if(P.w==='bt'&&btItems().length<4)return 3;
    if(P.bt&&P.bt.guard&&!r.pills.some(p=>PILL[p.id].bt&&PILL[p.id].bt.guard)&&r.realm>=1)return 3;
    if((id==='hoixuan'||id==='baohuyet')&&pillsOf(id)<2)return 2;return 0;};
  const L=sc.items.map((it,i)=>({it,i,w:want(it)})).filter(x=>x.w>0).sort((a,b)=>b.w-a.w);
  for(const x of L){const keep=x.w>=3?0:reserve();if(r.st-x.it.p>=keep){buy(x.i);bought++;why('mua','đan cần thiết (đột phá/hộ mệnh/hồi máu)');}}
  if(!bought)why('mua','không có gì đáng mua hoặc phải giữ dự trữ');
  if(G.run.scene===sc)endScene();}
// bán đồ thừa khi thiếu linh thạch (giữ món đang mang, giữ đan đột phá)
function smartSell(){const r=G.run;if(r.st>=reserve()*1.5)return false;
  const L=sellList().filter(x=>x.k==='r'?(r.relics[x.i]&&r.relics[x.i].k!=='book'):(!PILL[r.pills[x.i].id].bt&&!/hoixuan|baohuyet/.test(r.pills[x.i].id)));
  if(!L.length)return false;L.sort((a,b)=>b.p-a.p);sellItem(L[0].k,L[0].i);why('bán','thiếu linh thạch, bán đồ thừa');return true;}
// quản lý có chọn lọc
function smartManage(){const r=G.run;if(!r||!free())return;
  if(r.kvPick){kvChoose(0);return;}if(r.htPick){htChoose(0);return;}
  if(!chance(.3))return;
  for(const k of ['equip','book','study','chu','kn','craft','pet','mount','tong']){if(!G.run)return;if(chance(.5)&&MANAGE[k]()){covInc('m:'+k);return;}}
  if(r.st>=reserve()*3&&MANAGE.mount()){return;}}
// ------- kế hoạch trên bản đồ -------
function smartPlan(){
  if(typeof learnAll==='function')learnAll();if(!G.run)return;
  const r=G.run,s=S();
  if(r.kvPick){kvChoose(0);return;}if(r.htPick)htChoose(0);if(r.asc)r.asc=null;
  {const X=lkXkState();if(X&&X.ok&&!(r.realm===0&&lkTang()>=9)&&(!r.scene||r.scene.type==='place')){why('tu luyện','xung kích tầng');lkXk();return;}}
  const R0=regionOf(r.region);
  // 1. sống sót
  if(hpR()<0.55){const n=nearest(n=>n.dp||((n.type==='tran'||n.type==='thanh')&&n.state==='ok'&&r.st>=price(4)));if(n&&goOrOpen(n)){r._goal='heal';why('sống sót','máu thấp, tìm chỗ hồi');return;}}
  // 2. đột phá
  if(r.realm<4&&canBreak()){const n=nearest(n=>n.dp&&dangerTag(n)<3);
    if(breakReady()){if(n&&goOrOpen(n)){r._goal='bt';why('đột phá','tỉ lệ đủ cao');return;}}
    else{r._prep=(r._prep||0)+1;
      // chưa đủ chắc: đi chợ mua đan đột phá nếu có tiền, không thì đi lịch luyện/ kiếm tiền
      if(r.st>=price(60)){const t=nearest(x=>(x.type==='tran'||x.type==='thanh')&&x.state==='ok'&&x.id!==r.at);if(t&&goOrOpen(t)){r._goal='shop';why('đột phá','đi mua đan hỗ trợ trước khi đột phá');return;}}
    }}
  // 3. tu luyện
  if(!isPham()&&r.tv<100&&!bqCan()&&bqNeedY()>0&&(r.ll||0)>=r.tv-15&&(r.tvMinor>=30||chance(.5))){const n=nearest(n=>n.dp&&dangerTag(n)<3);if(n&&goOrOpen(n)){r._goal='bq';why('tu luyện','bế quan, lịch luyện đã theo kịp');return;}}
  const XK=lkXkState();const lag=(r.ll||0)<r.tv-15||((r.tv>=100||(lkOn()&&lkTang()>=9))&&(r.ll||0)<llNeedBt())||!!(XK&&XK.ll);
  if(lag){const seen=new Set(r.llP||[]);const n=nearest(x=>x.id!==r.at&&!seen.has(x.id)&&x.type!=='ai'&&x.type!=='sao'&&dangerTag(x)<=Math.min(3,r.realm+1));if(n&&goOrOpen(n)){r._goal='explore';why('tu luyện','lịch luyện tụt sau tu vi, đi nơi mới');return;}}
  // 4. tích luỹ
  if(r.st<reserve()){const q=r.quests.find(q=>q.state==='open');if(q&&goOrOpen(nodeById(q.node))){r._goal='explore';why('tích luỹ','làm việc treo thưởng lấy linh thạch');return;}
    const g=nearest(x=>x.fog>=1&&placeActs(x).some(a=>a.a==='board'||a.a==='haithuoc'||a.a==='daokhoang')&&dangerTag(x)<(r.realm>=1?3:2));if(g&&goOrOpen(g)){r._goal='farm';why('tích luỹ','thiếu linh thạch, đi kiếm');return;}}
  // 5. tiến vùng khi đủ mạnh
  if(r.region<=4&&r.realm>=r.region+1&&hpR()>=0.85){
    if(!r.bossDone[r.region]){const n=nodeById(R0.lair);if(n.fog>=1&&goOrOpen(n)){r._goal='boss';why('tiến vùng','đủ cảnh giới, đánh thủ lĩnh');return;}}
    if(r.region<4&&(r.realm>=r.region+1||r.passes.includes(r.region+1))){const n=nodeById(R0.pass);if(n.fog>=1&&goOrOpen(n)){r._goal='cross';why('tiến vùng','đủ cảnh giới, vượt ải');return;}}}
  // 6. tranh cơ duyên: hội đấu giá, sao rơi, bí cảnh khi khoẻ và có tiền
  if(hpR()>=0.8){const e=entsHere(r.region).find(e=>e.to==null&&['daugia','saoroi','bicanh'].includes(e.type)&&nodeById(e.at).fog>=1);if(e&&goOrOpen(nodeById(e.at))){r._goal='ent';why('cơ duyên','đi tranh '+e.type);return;}}
  // 7. khám phá
  const cand=R0.nodes.filter(n=>n.fog>=1&&n.fog<3&&n.id!==r.at&&dangerTag(n)<=Math.min(3,r.realm+1));
  const t=cand.length&&chance(.7)?pick(cand):pick(R0.nodes.filter(n=>n.fog>=1&&n.type!=='ai'&&n.type!=='sao').concat([nodeById(r.at)]));
  r._goal='explore';why('khám phá','không có việc gấp hơn');goOrOpen(t);}
function smartPlace(){
  const r=G.run,sc=r.scene,n=nodeById(sc.id);const acts=placeActs(n).filter(a=>!a.dis);const has=k=>acts.find(a=>a.a===k);
  r._pc=(r._pc||0)+1;if(r._pc>7){r._pc=0;leavePlace();return;}const s=S();
  {const qq=r.quests.find(q=>q.state==='open'&&q.node===sc.id);if(qq&&hpR()>0.5&&questDo(qq.id)){why('tích luỹ','giao/hoàn thành việc treo thưởng');return;}}
  if(smartSell())return;
  // hồi phục
  if(hpR()<0.7){if(has('inn')&&venueDo('inn','phong')){why('sống sót','nghỉ trọ');return;}if(has('heal')){placeAct('heal');why('sống sót','hồi tại chỗ');return;}if(has('tinh')){placeAct('tinh');return;}}
  // đột phá
  if(has('bt')){if(hpR()<0.95&&has('heal')){placeAct('heal');return;}if(breakReady()){why('đột phá','vào chuẩn bị đột phá');placeAct('bt');return;}}
  // chợ: mua đan cần thiết
  if(r._goal==='shop'&&has('shop')){r._goal=null;placeAct('shop');return;}
  // tu luyện
  if(!isPham()&&n.dp&&!bqCan()&&bqNeedY()>0&&r.tv<100&&(r._goal==='bq'||r.tvMinor>=30)){const left=Math.max(0,s.life-r.age);const y=Math.max(0.25,Math.min(2,bqNeedY()||0.25,left-1));if(bqCustom(y)){why('tu luyện','bế quan '+y+' năm');return;}}
  if(r._goal==='cross'&&has('cross')){r._goal=null;placeAct('cross');return;}
  if(r._goal==='boss'&&has('boss')){r._goal=null;placeAct('boss');return;}
  if(r._goal==='ent'||true){const e=entsHere(r.region).find(e=>e.to==null&&e.at===sc.id&&['daugia','saoroi','bicanh'].includes(e.type));if(e&&hpR()>=0.7){r._goal=null;why('cơ duyên','gặp '+e.type);meetEnt(e);return;}}
  // kiếm tiền khi thiếu
  if(r.st<reserve()){if(has('board')&&chance(.7)){placeAct('board');return;}for(const k of ['haithuoc','daokhoang','sanyeu']){if(k==='sanyeu'&&r.realm<1)continue;if(has(k)&&hpR()>0.7&&dangerTag(n)<(r.realm>=1?3:2)){why('tích luỹ','thu thập '+k);placeAct(k);return;}}}
  if(has('shop')&&r.st>=reserve()*1.5&&chance(.4)){placeAct('shop');return;}
  if(has('tea')&&chance(.1)&&venueDo('tea','nghe'))return;
  if(has('explore')&&chance(.85)){placeAct('explore');return;}
  r._pc=0;leavePlace();}
// chiến đấu: bỏ chạy khi kẻ địch mạnh hơn nhiều, hoặc gần ngang sức mà mình yếu
{const _bc=botCombat;botCombat=function(sc){const u=readyPlayer(sc);
  if(u&&!sc.dodge&&!sc.qte&&!sc.kiep&&!sc.boss&&!sc.done){const foes=alive(sc,'B');const ratio=foes.length?Math.max(...foes.map(f=>lcCalc(f)))/Math.max(1,lcCalc(u)):0;
    if((ratio>1.25||(ratio>0.9&&u.hp<u.max*0.45))&&playerFlee()){why('sống sót','bỏ chạy khỏi kẻ mạnh hơn');return;}}
  return _bc(sc);};}
// cảnh: sự kiện, cửa hàng, chuẩn bị đột phá chọn thông minh; còn lại dùng bot cũ
{const _bs=botScene;botScene=function(){const r=G.run,sc=r.scene;
  if(sc.type==='event'){covInc('scene:event');if(sc.id)covInc('ev:'+sc.id);smartEvent(sc);return;}
  if(sc.type==='shop'){covInc('scene:shop');smartShop(sc);return;}
  if(sc.type==='prep'&&!isPham()){covInc('scene:prep');const sl=bestSlots();for(const i of sl)if(sc.slots.length<5&&!sc.slots.includes(i))prepToggle(i);r._prep=0;why('đột phá','vào đột phá, tỉ lệ '+Math.round(btRate(sc.slots)*100)+'%');prepStart();return;}
  if(sc.type==='enc'&&!sc.done){covInc('scene:enc');if(hpR()<0.5){why('sống sót','né tránh khi máu thấp');encAct('sneak');}else encAct('fight');return;}
  return _bs();};}
botPlan=smartPlan;botPlace=smartPlace;botManage=smartManage;botPlaceX=function(){return false;};
{const _rep=botReport;botReport=function(){const k=Object.keys(DEC).sort((a,b)=>DEC[b]-DEC[a]);return _rep()+'\n  Quyết định của bot (theo ưu tiên): \n'+k.map(x=>'    '+DEC[x]+'× '+x).join('\n');};}
// ghi lại hoàn cảnh mỗi lần chết để biết bot chết vì sao
var DEATHS=[],LASTWHY=[],LASTFOE='';
{const _w=why;why=function(t,r){LASTWHY.push(t+': '+r);if(LASTWHY.length>3)LASTWHY.shift();return _w(t,r);};}
{const _d=die;die=function(cause){try{const r=G.run;if(r)DEATHS.push({c:cause,realm:r.realm,reg:r.region,age:Math.floor(r.age),at:(nodeById(r.at)||{}).type,sc:r.scene&&r.scene.type,foe:LASTFOE,why:LASTWHY.slice(),st:r.st,pills:r.pills.length,tv:Math.round(r.tv),ll:Math.round(r.ll||0),tvMinor:r.tvMinor,need:+(bqNeedY()||0).toFixed(2),canBr:canBreak(),btr:canBreak()?+btRate(bestSlots()).toFixed(2):null,pham:r.pham});}catch(e){}return _d.apply(this,arguments);};}
{const _s=startCombat;startCombat=function(spec,after){const x=_s.apply(this,arguments);try{const sc=G.run.scene;LASTFOE=sc.units.filter(u=>u.side==='B').map(u=>u.name+'('+Math.round(lcCalc(u)/Math.max(1,lcCalc(mainUnit(sc)))*10)/10+'x)').join(',')+' via '+((after&&after.kind)||'?');}catch(e){}return x;};}
{const _rep2=botReport;botReport=function(){return _rep2()+'\n  Hoàn cảnh chết:\n'+DEATHS.slice(0,25).map(d=>'    '+JSON.stringify(d)).join('\n');};}
