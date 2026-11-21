// Não của máy tự chơi (bot): dùng chung cho bot.js (chạy hàng loạt) và nút Dev test > Tự chơi trong game.
// Chạy trong không gian của lõi game: gọi thẳng hàm lõi.
var BOT={seen:new Set()};
function botTexts(){
  const out=[];const r=G.run;if(!r)return out;const sc=r.scene;
  const push=x=>{if(x==null)return;if(typeof x==='string')out.push(x);else if(Array.isArray(x))x.forEach(push);else if(typeof x==='object'){if(x.q)out.push(x.q);if(x.t&&typeof x.t==='string')out.push(x.t);if(x.tip)out.push(x.tip);}};
  if(sc){push(sc.text);push(sc.story);push(sc.msg);push(sc.intro);push(sc.res);push(sc.chips);push(sc.news);
    if(sc.type==='event'&&sc.phase==='choose')visChoices(sc).forEach(({c})=>push(T(c.l,sc.v)));
    if(sc.type==='combat'){sc.log.forEach(l=>push(l.t));if(sc.en)push(sc.en.n),push(sc.en.sub);}
    if(sc.type==='place'){placeActs(nodeById(sc.id)).forEach(a=>{push(a.l);push(a.tip);});}
    if(sc.type==='pass'){passOpts().forEach(o=>{push(o.l);push(o.tip);});}
    if(sc.type==='boss')push(sc.b.n);
  }
  r.log.slice(-3).forEach(l=>push(l.t));r.news.slice(-2).forEach(l=>push(l.t));
  push(dateText(W().t));
  return out;
}
function nearest(pred){const r=G.run;let best=null,bl=1e9;for(const n of regionOf(r.region).nodes){if(!pred(n))continue;if(n.fog<1&&n.id!==r.at)continue;if(n.id===r.at)return n;const p=findPath(r.at,n.id);if(!p)continue;const L=pathLen(p);if(L<bl){bl=L;best=n;}}return best;}
function goOrOpen(n){const r=G.run;if(!n)return false;if(n.id===r.at){openPlace(n.id);return true;}if(!travelTo(n.id))return false;travelTick(1e7);return true;}
function botPlan(){
  if(typeof learnAll==='function')learnAll();if(!G.run)return;
  if(G.run.kvPick&&(!G.run.scene||G.run.scene.type==='place')){kvChoose(0);return;}
  if(G.run.htPick){htChoose(0);}
  if(G.run.asc)G.run.asc=null;
  {const X=typeof lkXkState==='function'&&lkXkState();if(X&&X.ok&&!(G.run.realm===0&&lkTang()>=9)&&(!G.run.scene||G.run.scene.type==='place')){lkXk();return;}}
  const r=G.run,s=S();
  if(botBossGoal()||botBackGoal()||botStageGoal())return;
  // mục tiêu
  if(r.hp<s.maxHp*0.45){const n=nearest(n=>(n.type==='tran'||n.type==='thanh')&&n.state==='ok'&&r.st>=price(4)||n.dp);if(n&&goOrOpen(n)){r._goal=n.dp?'heal':'inn';return;}}
  if(r.realm<4&&canBreak()){const n=nearest(n=>n.dp&&dangerTag(n)<3);if(n&&goOrOpen(n)){r._goal='bt';return;}}
  if((r.tvMinor>=40||r.tv<100&&!bqCan()&&chance((r.ll||0)>=r.tv+10?.75:r.tv>=60?.3:.2))&&(r.ll||0)>=r.tv-15){const n=nearest(n=>n.dp&&dangerTag(n)<3);if(n&&goOrOpen(n)){r._goal='bq';return;}}
  const R0=regionOf(r.region);
  if(r.region<4&&(r.realm>=r.region+1||r.passes.includes(r.region+1))){const n=nodeById(R0.pass);if(n.fog>=1&&goOrOpen(n)){r._goal='cross';return;}}
  if(!r.bossDone[r.region]&&r.realm>=r.region+1&&chance(.5)){const n=nodeById(R0.lair);if(n.fog>=1&&goOrOpen(n)){r._goal='boss';return;}}
  if(r.region<4&&r.realm>=r.region&&chance(.05)){const n=nodeById(R0.pass);if(n.fog>=1&&goOrOpen(n)){r._goal='cross';return;}}
  // việc treo thưởng còn hạn
  const q=r.quests.find(q=>q.state==='open');if(q&&chance(.6)){const n=nodeById(q.node);if(goOrOpen(n)){r._goal='explore';return;}}
  // khám phá: ưu tiên điểm chưa tới
  const cand=R0.nodes.filter(n=>n.fog>=1&&n.fog<3&&n.id!==r.at);
  const known=R0.nodes.filter(n=>n.fog>=1&&n.id!==r.at&&n.type!=='ai'&&n.type!=='sao');
  // lịch luyện tụt sau tu vi: ưu tiên nơi chưa tới
  const lag=(r.ll||0)<r.tv-15;
  if(lag||((r.tv>=100||(lkOn()&&lkTang()>=9))&&(r.ll||0)<llNeedBt())||(lkXkState()&&lkXkState().ll)){const seen=new Set(r.llP||[]);const n=nearest(x=>x.id!==r.at&&!seen.has(x.id)&&x.type!=='ai'&&x.type!=='sao');if(n&&goOrOpen(n)){r._goal='explore';return;}}
  let t=cand.length&&chance(lag?.95:.7)?pick(cand):(chance(.5)?nodeById(r.at):pick(known.length?known:[nodeById(r.at)]));
  r._goal='explore';goOrOpen(t);
}
function botPlace(){
  const r=G.run,sc=r.scene,n=nodeById(sc.id);const acts=placeActs(n).filter(a=>!a.dis);const has=k=>acts.find(a=>a.a===k);
  r._pc=(r._pc||0)+1;if(r._pc>6){r._pc=0;leavePlace();return;}
  const s=S();
  if(botPlaceX(acts,has,n))return;
  {const qq=r.quests.find(q=>q.state==='open'&&q.node===r.scene.id);if(qq&&r.hp>s.maxHp*0.5&&questDo(qq.id))return;}
  if(r._goal==='cross'&&has('cross')){r._goal=null;placeAct('cross');return;}
  if(r._goal==='boss'&&has('boss')){r._goal=null;placeAct('boss');return;}
  if(has('bt')){if(r.hp<s.maxHp*0.95&&has('heal')){placeAct('heal');return;}placeAct('bt');return;}
  if(r.hp<s.maxHp*0.45){if(has('inn')&&venueDo('inn','phong'))return;if(has('heal')){placeAct('heal');return;}if(has('tinh')){placeAct('tinh');return;}}
  if(r._goal==='bq'&&!bqCan()){r._goal=null;bqCustom(Math.max(0.25,Math.min(chance(.7)?2:0.25,bqNeedY()||0.25)));return;}
  if(n.dp&&!bqCan()&&r.tvMinor>=40){bqCustom(Math.max(0.25,Math.min(chance(.75)?2:0.25,bqNeedY()||0.25)));return;}
  if(has('tea')&&chance(.3)&&venueDo('tea','nghe'))return;
  if(has('shop')&&chance(.3)){placeAct('shop');return;}
  if(has('board')&&chance(.4)){placeAct('board');return;}
  if(has('ghost')&&chance(.3)){placeAct('ghost');return;}
  if(has('bury')&&chance(.03)&&typeof buryItems==='function'){placeAct('bury');return;}
  if(has('grave')&&chance(.5)){placeAct('grave');return;}
  if(has('patron')&&chance(.5)){placeAct('patron');return;}
  if(has('explore')&&chance(.8)){placeAct('explore');return;}
  r._pc=0;leavePlace();
}
function botScene(){
  const r=G.run,sc=r.scene;covInc('scene:'+sc.type);if(sc.type==='event'&&sc.id)covInc('ev:'+sc.id);
  if(botSceneY(sc))return;
  switch(sc.type){
    case 'region':r.scene=null;return;
    case 'place':botPlace();return;
    case 'event':{if(sc.phase==='choose'){const L=visChoices(sc).filter(({c})=>costOk(c.cost));if(!L.length){sc.phase='done';return;}choose(pick(L).i);}else endScene();return;}
    case 'enc':{if(sc.done){endScene();return;}encAct(chance(.8)?'fight':'sneak');return;}
    case 'boss':bossFight();return;
    case 'combat':botCombat(sc);return;
    case 'reward':if(sc.picks.length&&sc.taken<0)takePick(0);rewardContinue();return;
    case 'shop':{const bp=sc.items.findIndex(it=>!it.sold&&it.k==='pill'&&PILL[it.id].w==='bt'&&r.st>=it.p);if(bp>=0)buy(bp);else{const i=sc.items.findIndex(it=>!it.sold&&r.st>=it.p);if(i>=0&&chance(.5))buy(i);}if(G.run.scene===sc)endScene();return;}
    case 'swap':swapSkill(chance(.5)?0:-1);return;
    case 'pass':{for(const o of passOpts()){if(o.ok&&o.a!=='fight'){passAct(o.a);return;}}if(chance(.3)){passAct('fight');return;}endScene();return;}
    default:if(typeof botSceneX==='function'&&botSceneX(sc))return;endScene();return;
  }
}
// chiến đấu: thanh hành động
function botCombat(sc){
  if(sc.done){combatContinue();return;}
  if(sc.dodge){dodgeResolve(null);return;}   // coi mọi lần né là "không nhấn"
  if(sc.qte){qteResolve(null);return;}
  const u=readyPlayer(sc);
  if(u){
    if(botCombatX(sc))return;
    const r=G.run;const heal=r.skills.find(k=>SK[k.id].fx.heal&&u.mp>=skillCost(SK[k.id]));
    const hp=r.pills.findIndex(p=>p.id==='hoixuan');
    if(u.hp<u.max*0.35&&hp>=0){if(playerPillAct(hp))return;}
    if(u.hp<u.max*0.45&&heal){if(playerAct(heal.id))return;}
    if(sc.kiep){if(u.hp<u.max*0.5&&heal&&playerAct(heal.id))return;if(u.hp<u.max*0.75||chance(.5)){if(playerAct('_guard'))return;}}
    if(!sc.kiep&&!sc.boss&&u.hp<u.max*0.25&&chance(.6)&&playerFlee())return;
    const ok=r.skills.filter(k=>{const sk=SK[k.id];return sk.fx.p&&u.mp>=skillCost(sk);});
    const foes=alive(sc,'B');const t=foes.slice().sort((a,b)=>a.hp-b.hp)[0];
    if(ok.length&&chance(.7)){if(playerAct(pick(ok).id,t&&t.id))return;}
    if(chance(.12)&&playerAct('_guard'))return;
    playerAct('_atk',t&&t.id);return;
  }
  for(let i=0;i<4000;i++){combatStep(0.05);if(sc.done||sc.dodge||sc.qte||readyPlayer(sc))break;}
}
function botSceneX(sc){
  if(sc.type==='prep'){for(const x of btItems()){if(sc.slots.length>=3)break;prepToggle(x.i);}prepStart();return true;}
  if(sc.type==='btres'){btContinue();return true;}
  if(sc.type==='board'){const n=nodeById(sc.id);const i=n.board.list.findIndex(q=>!q.taken);if(i>=0&&chance(.6))takeQuest(i);endScene();return true;}
  if(sc.type==='bury'){if(G.run.relics.length)buryToggle('r0');else if(G.run.pills.length)buryToggle('p0');if(sc.sel.length)buryItems();else endScene();return true;}
  return false;
}
