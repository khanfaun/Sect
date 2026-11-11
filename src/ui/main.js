// ---------- vẽ màn hình ----------
const HCACHE={};
function setH(id,html){const el=document.getElementById(id);if(!el)return false;if(HCACHE[id]===html){return false;}
  const sc=el.querySelector('.win-b,.sc-b');const top=sc?sc.scrollTop:0;const key=el.dataset.k;
  HCACHE[id]=html;el.innerHTML=html;el.hidden=!html;
  const k2=viewKey(id);el.dataset.k=k2;if(top&&key===k2){const s2=el.querySelector('.win-b,.sc-b');if(s2)s2.scrollTop=top;}
  return true;}
function viewKey(id){const sc=G.run&&G.run.scene;if(id==='sheet')return sc?sc.type+':'+(sc.id||'')+':'+(sc.story?sc.story.length:0)+':'+(sc.phase||''):'';if(id==='panel')return (UI.panel||'')+JSON.stringify(UI.tab);if(id==='full')return G.screen+(UI.tab.meta||'');return '';}
function syncDodge(){const o=G.meta.opt=G.meta.opt||{};if(o.userDodge===undefined)o.userDodge=!!o.autoDodge;o.autoDodge=!!(o.userDodge||CFG.autoFight);o.autoQte=!!CFG.autoFight;}
function render(){
  let full='',hud='',mapui='',dock='',nav='',sheet='',panel='',modal='';
  try{
    if(G.screen==='map'&&!G.run)G.screen='title';
    const inMap=G.screen==='map'&&!!G.run;const sc=inMap?G.run.scene:null;const cb=sc&&sc.type==='combat';
    if(!G.run&&UI.panel&&UI.panel!=='more')UI.panel=null;
    if(cb){UI.panel=null;}
    if(!inMap){full=G.screen==='birth'&&G.birth?vBirth():G.screen==='over'&&G.over?vOver():G.screen==='meta'?vMeta():vTitle();}
    else{
      if(cb)full=vCombat(sc);
      else{hud=hudHTML();nav=navHTML();
        if(!sc){mapui=mapUiHTML();dock=dockHTML();}
        else if(UI.evMin&&sc.type==='event'){mapui=mapUiHTML();dock=dockHTML();}
        else if(sc.type==='region')sheet=vRegionIntro(sc);
        else sheet=(SCENE_V[sc.type]||(()=>''))(sc);}
    }
    if(UI.panel)panel=(PANEL_V[UI.panel]||(()=>''))();
    modal=modalHTML();
    document.documentElement.dataset.view=inMap?(cb?'combat':sc?'scene':'map'):'screen';
  }catch(e){console.error(e);full=`<div class="title"><p>Có lỗi khi vẽ màn hình: ${esc(e.message)}</p><button class="btn pri" data-act="screen" data-arg="title">Về màn hình đầu</button></div>`;UI.panel=null;UI.modal=null;panel='';modal='';}
  setH('hud',hud);setH('mapui',mapui);setH('dock',dock);setH('nav',nav);setH('sheet',sheet);setH('full',full);setH('panel',panel);setH('modal',modal);
  const sc2=G.run&&G.run.scene;UI.lastStory=sc2&&sc2.story?sc2.story.length:0;
  const hd=document.getElementById('hud');document.getElementById('app').style.setProperty('--hudh',(hd&&!hd.hidden?hd.offsetHeight:0)+'px');
  const dl=document.getElementById('dlg');if(dl)dl.scrollTop=dl.scrollHeight;
  Map2.resize();Art.fillAll();Map2.invalidate();toastFlush();hideTip();
}
function after(){render();saveSoon();}
function mapTap(n){const r=G.run;if(!r||r.scene)return;if(UI.status){UI.status=false;}UI.sel=n?n.id:null;UI.cardMin=false;render();}

// ---------- đồng hồ và vòng lặp khung hình ----------
function clockOn(){const r=G.run;return G.screen==='map'&&r&&!r.scene&&!UI.panel&&!UI.modal&&!UI.paused&&!document.hidden&&(CFG.clockIdle||!!r.moving);}
let clkLast=performance.now(),clkAcc=0,clkFlush=0,clkSaveT=0,clkDay=-1,clkPart='';
function clockText(){const t=W().t;const a=$('#clkY'),b=$('#clkM'),c=$('#clkH');if(a)a.textContent=tYear(t);if(b)b.textContent='Ngày '+(Math.floor((t%HM)/HD)+1)+' · tháng '+MONTH[tMonth(t)];if(c)c.textContent='Giờ '+gioName(t);}
function loop(now){
  let dt=Math.min(1,(now-clkLast)/1000);clkLast=now;
  const r=G.run;
  if(r&&r.scene&&r.scene.type==='combat'){try{combatFrame(now,dt);}catch(e){console.error(e);}}
  else if(clockOn()){
    try{
      const sp=UI.speed||1;let redraw=false;
      if(r.moving){const m=r.moving;const segH=m.seg<m.path.length-1?edgeLen(m.path[m.seg],m.path[m.seg+1])/walkSpeed():24;
        travelTick(Math.max(6,segH/2.2)*(sp>1?3:1)*dt);redraw=true;Map2.invalidate();}
      else clkAcc+=dt;
      if(now-clkFlush>=250||!G.run||G.run.scene){clkFlush=now;
        if(G.run&&!G.run.moving&&!G.run.scene&&clkAcc>0){advanceTime(clkAcc*sp);if(G.run)autoCheck();}
        clkAcc=0;
        if(!G.run||G.run.scene||G.screen!=='map'){UI.evMin=false;after();}
        else{const t=W().t;const d=Math.floor(t/HD),p=partOf(t);if(d!==clkDay||p!==clkPart||redraw||(G.toasts&&G.toasts.length)){clkDay=d;clkPart=p;render();}else clockText();Map2.invalidate();}
        if(G.run&&(W().t-clkSaveT>=30||(G.run.moving&&now-(UI.mvSave||0)>800))){clkSaveT=W().t;UI.mvSave=now;saveSoon();}
      }
    }catch(e){console.error(e);}
  } else clkAcc=0;
  if(G.screen==='map'&&G.run)Map2.frame(now);
  requestAnimationFrame(loop);
}
document.addEventListener('visibilitychange',()=>{clkLast=performance.now();clkAcc=0;Map2.invalidate();});
window.addEventListener('resize',()=>{Map2.resize();Art.clear();Art.fillAll();});

// ---------- hành động ----------
function openBq(){const r=G.run;if(bqCan())return;UI.bqOpened=!r.scene;if(!r.scene)openPlace(r.at);if(r.scene&&r.scene.type==='place')UI.modal={k:'bq'};}
const ACT={
  birth:()=>{genBirth();const c=G.birth.cards;newRun(c[Math.floor(Math.random()*c.length)]);UI.sel=null;UI.panel=null;run2();},
  born:i=>{newRun(G.birth.cards[+i]);UI.sel=null;UI.panel=null;run2();},
  resume:()=>{G.screen='map';},
  screen:a=>{UI.panel=null;UI.modal=null;if(a==='map'){G.screen=G.run?'map':'title';}else if(a==='codex'){G.screen='meta';UI.tab.meta='lives';}else{G.screen=a;}if(a==='meta'||a==='title')G.over=null;if(a==='title')UI.narrSkip=true;},
  overNext:()=>{G.over=null;G.screen='title';UI.narrSkip=false;},
  narrSkip:()=>{UI.narrSkip=true;},
  titleCfg:()=>{UI.panel='more';UI.tab.more='cfg';},
  regionGo:()=>{G.run.scene=null;Map2.center();},
  choose:i=>{UI.evMin=false;choose(+i);},
  next:()=>endScene(),
  pact:a=>{if(a==='bq'){UI.modal={k:'bq'};return;}if(a==='laibuon'||a==='tram'||a==='nhansu'||a==='conghien'){UI.modal={k:a};return;}if(a==='tinhthat'){G.bqRoom=true;UI.bqOpened=false;UI.modal={k:'bq'};return;}if(a==='quyan'&&UI.confirm!=='quyan'){UI.confirm='quyan';return;}UI.confirm=null;placeAct(a);},
  leave:()=>leavePlace(),
  pass:a=>passAct(a),
  hud:()=>{UI.hudOpen=!UI.hudOpen;},
  hudBq:()=>{G.bqRoom=false;openBq();},
  evMin:()=>{UI.evMin=true;},
  evBack:()=>{UI.evMin=false;},
  destX:()=>{G.run.dest=null;},
  mount:id=>buyMount(id),
  chGive:k=>chGive(k),
  chTrade:()=>chTrade(),
  legT:t=>{const h=Object.assign({},CFG.hideT||{});if(h[t])delete h[t];else h[t]=1;cfgSet('hideT',h);},
  legE:t=>{const h=Object.assign({},CFG.hideE||{});if(h[t])delete h[t];else h[t]=1;cfgSet('hideE',h);},
  legAll:()=>{const any=Object.keys(CFG.hideT||{}).length+Object.keys(CFG.hideE||{}).length>0;if(any){cfgSet('hideT',{});cfgSet('hideE',{});}else{const a={},b={};Object.keys(GLYPH).forEach(k=>{if(TYPE_NAME[k])a[k]=1;});Object.keys(ENT_T).forEach(k=>b[k]=1);cfgSet('hideT',a);cfgSet('hideE',b);}},
  hudBt:()=>{const r=G.run;if(!r.scene)openPlace(r.at);if(r.scene&&r.scene.type==='place')placeAct('bt');},
  status:()=>{UI.status=!UI.status;},
  panel:k=>{UI.panel=UI.panel===k?null:k;UI.code=null;UI.msg=null;UI.confirm=null;UI.chuSel=null;},
  closePanel:()=>{UI.panel=null;UI.code=null;UI.msg=null;},
  modalX:()=>{const m=UI.modal;UI.modal=null;G.bqRoom=false;if(m&&m.k==='bq'&&UI.bqOpened&&G.run&&G.run.scene&&G.run.scene.type==='place'){G.run.scene=null;}UI.bqOpened=false;},
  unsel:()=>{UI.sel=null;},
  cardMin:()=>{UI.cardMin=true;},
  cardMax:()=>{UI.cardMin=false;},
  descTg:()=>{UI.descHide=!UI.descHide;},
  exStat:()=>{UI.modal={k:'explore'};},
  exGo:()=>{UI.modal=null;placeAct('explore');},
  evGo:i=>{const r=G.run,n=nodeById(r.scene.id);const id=n.evs&&n.evs.L[+i];if(!id)return;n.evs.L.splice(+i,1);advanceTime(2);if(G.run&&G.run.scene&&G.run.scene.type==='place')startEvent(id);},
  meet:id=>{const r=G.run,at=r.at;const e=W().ents.find(x=>String(x.id)===id);if(!e)return;meetEnt(e);if(G.run&&G.run.scene&&G.run.scene.type==='event')G.run.scene.back=at;else note('Họ lướt qua, chẳng để ý tới ngươi.');},
  questGo:()=>{const n=nodeById(G.run.at);advanceTime(2);if(G.run&&G.run.scene&&G.run.scene.type==='place'&&!questExplore(n))note('Chưa thấy tung tích gì.');},
  sell:a=>{const [k,i]=a.split(':');sellItem(k,+i);},
  stage:id=>{UI.modal=null;stageGo(+id);},
  go:id=>{const n=nodeById(+id);if(CFG.confirmDanger&&dangerTag(n)>=3&&n.id!==G.run.at){UI.modal={k:'danger',id:n.id};return;}ACT.goSure(id);},
  goSure:id=>{UI.modal=null;if(travelTo(+id)){G.run.dest=+id;UI.paused=false;UI.cardMin=true;Map2.cam.follow=true;}},
  enter:()=>{G.run.dest=null;openPlace(G.run.at);},
  stop:()=>{stopTravel();if(G.run)G.run.dest=null;},
  speed:v=>{v=+v;if(!v)UI.paused=!UI.paused;else{UI.paused=false;UI.speed=v;}},
  wait:k=>{const t0=W().t;const h=t0%HD;const tgt=k==='sang'?7:19;let d=tgt-h;if(d<0.5)d+=24;advanceTime(d);if(!G.run)return;const t=W().t;G.meta.world.t=Math.floor(t/HD)*HD+tgt+(Math.floor(t/HD)*HD+tgt<t0?HD:0);autoCheck();note('Chờ '+Math.round(d)+' giờ. Nay là giờ '+gioName(W().t)+', buổi '+PART[partOf(W().t)].n+'.');},
  zoom:d=>{Map2.zoom(+d>0?1.4:1/1.4);},
  center:()=>{Map2.center();},
  noteEdit:id=>{UI.modal={k:'note',id:+id};setTimeout(()=>{const i=$('#noteIn');if(i)i.focus();},50);},
  noteSave:id=>{const i=$('#noteIn');if(noteSet(+id,i?i.value:'')===false){note('Đã ghim đủ 50 chỗ.');}UI.modal=null;},
  noteGo:k=>{const n=nodeById(+k);if(n&&Math.floor(n.id/100)===G.run.region&&n.fog>=1){UI.panel=null;UI.sel=n.id;UI.cardMin=false;const p=nodeShown(n);Map2.focus(p[0],p[1]);}else note('Chỗ ấy không ở vùng này, hoặc kiếp này ngươi chưa biết tới.');},
  bqSet:y=>{if(UI.modal&&UI.modal.k==='bq')UI.modal.y=+y;},
  bqGo:()=>{const y=UI.modal&&UI.modal.y||1;UI.modal=null;const t0=W().t,tv0=G.run.tv;bqCustom(y);const r=G.run,sc=r&&r.scene;if(sc&&sc.type==='place'){UI.modal={k:'res',title:'Xuất quan',t:sc.msg.join(' ')+' Thời gian trôi qua '+durH(W().t-t0)+', tu vi '+(r.tv>=tv0?'tăng '+numVN(r.tv-tv0)+'%':'đã viên mãn')+'.',chips:sc.chips};sc.msg=[];sc.chips=[];if(UI.bqOpened)r.scene=null;}UI.bqOpened=false;},
  enc:a=>encAct(a),
  bossFight:()=>bossFight(),
  skill:id=>{UI.menu=null;const sc=G.run.scene;if(needTarget(sc,id)){UI.pendSk=id;return;}UI.pendSk=null;playerAct(id);},
  tgt:id=>{const k=UI.pendSk;UI.pendSk=null;if(k)playerAct(k,+id);},
  cancelSk:()=>{UI.pendSk=null;},
  menu:m=>{UI.menu=m||null;},
  atkslot:id=>toggleAtkSlot(id),
  prep:i=>prepToggle(i),
  prepGo:()=>prepStart(),
  btGo:()=>btContinue(),
  quest:i=>takeQuest(i),
  bsel:k=>buryToggle(k),
  buryGo:()=>buryItems(),
  autoDodge:v=>{const o=G.meta.opt=G.meta.opt||{};o.userDodge=v==='1';syncDodge();},
  autoFight:()=>{cfgSet('autoFight',!CFG.autoFight);syncDodge();UI.menu=null;UI.pendSk=null;},
  cspeed:()=>{cfgSet('cspeed',CFG.cspeed>=3?1:CFG.cspeed+1);},
  clog:()=>{UI.modal={k:'clog'};},
  cpill:i=>{UI.menu=null;playerPillAct(+i);},
  flee:()=>{UI.menu=null;playerFlee();},
  yield:()=>{UI.menu=null;playerYield();},
  cont:()=>{UI.menu=null;UI.pendSk=null;combatContinue();},
  pick:i=>takePick(+i),
  rcont:()=>rewardContinue(),
  buy:i=>buy(+i),
  heal:()=>healBuy(),
  swap:i=>swapSkill(+i),
  upg:id=>buyUpg(id),
  tab:a=>{const [k,v]=a.split(':');UI.tab[k]=v;if(k==='more'&&v==='cfg'&&!UI.tab.cfg)UI.tab.cfg='gfx';UI.confirm=null;},
  filter:f=>{UI.filter=f;},
  affGo:a=>{if(!a)return;const [x,y,id]=a.split(',');UI.panel=null;Map2.focus(+x,+y);if(id!==''){UI.sel=+id;UI.cardMin=false;}},
  cfg:a=>{const i=a.indexOf('=');const k=a.slice(0,i);cfgSet(k,JSON.parse(a.slice(i+1)));if(k==='autoFight')syncDodge();if(k==='theme'||k==='font'){Art.clear();}Map2.resize();},
  usepill:i=>{const m=usePill(+i,false);if(m&&G.run)log('Dùng '+m+'.');},
  chuSel:i=>{UI.chuSel=UI.chuSel===+i?null:+i;},
  chuPut:i=>{if(UI.chuSel==null)return;if(+i<0)chuSet(UI.chuSel,null);else{const c=chuPool()[+i];if(c)chuSet(UI.chuSel,c);}},
  chuAuto:()=>{chuAuto();UI.chuSel=null;},
  chuClear:()=>{const r=run2();r.chu=[null,null,null,null,null,null,null,null];clampHp();UI.chuSel=null;},
  petSet:i=>petSet(+i),
  petFree:i=>{if(UI.confirm!=='free'+i){UI.confirm='free'+i;return;}UI.confirm=null;petFree(+i);},
  petHatch:i=>{petHatch(+i,true);},
  petFeed:i=>{const r=run2();if(r.petOut!=null)petFeed(r.petOut,+i);},
  craft:id=>{const res=craft(id);if(res){UI.modal={k:'res',title:res.name+(res.ok?' thành công':' thất bại'),t:res.t,chips:res.chips};}},
  exp:()=>{UI.code=encodeSave();UI.codeMode='exp';UI.msg='Sao chép đoạn mã trên và cất đi. Dán lại ở mục Nạp mã lưu để khôi phục.';setTimeout(()=>{const t=$('#code');if(t){t.select();}},30);},
  imp:()=>{UI.code='';UI.codeMode='imp';UI.msg=null;},
  impGo:()=>{const t=$('#code');try{const d=decodeSave(t.value);loadData(d);UI.panel=null;UI.code=null;}catch(e){UI.code=t.value;UI.msg='Mã lưu không hợp lệ.';}},
  wipe:()=>{if(UI.confirm!=='wipe'){UI.confirm='wipe';return;}UI.confirm=null;G={meta:newMeta(),run:null,birth:null,over:null,screen:'title'};UI.panel=null;UI.sel=null;syncDodge();},
};
const KEEP_CONFIRM={pact:1,wipe:1,petFree:1};
document.addEventListener('click',e=>{
  if(UI.suppress){UI.suppress=false;e.preventDefault();e.stopPropagation();return;}
  const el=e.target.closest('[data-act]');
  if(!el){const t=e.target.closest('[data-tip]');if(t){showTip(t,true);}else hideTip();return;}
  if(el.disabled)return;
  const a=el.dataset.act;const f=ACT[a];if(!f)return;
  if(!KEEP_CONFIRM[a])UI.confirm=null;
  try{f(el.dataset.arg,el);}catch(err){console.error(err);note('Có lỗi: '+err.message);}
  after();
},true);
document.addEventListener('input',e=>{if(e.target.id==='bqR'&&UI.modal&&UI.modal.k==='bq'){const y=+e.target.value;UI.modal.y=y;const a=$('#bqY');if(a)a.textContent=durH(y*HY);
  const gain=bqRate()*y*(y<1?0.9:1),risk=Math.round(bqRisk(y)*100);const h=$('#bqHint');if(h)h.textContent=`Tu vi +${numVN(Math.min(100,gain))}%${risk?' · '+risk+'% bị quấy nhiễu giữa chừng':' · yên ổn'}. Xuất quan thì khí huyết, linh lực hồi đầy.`;HCACHE.modal=null;}});

// ---------- chú thích ----------
let tipT=null,tipEl=null;
function showTip(el,toggle){
  const tip=$('#tip');const txt=el.dataset.tip;if(!txt)return;
  if(toggle&&tipEl===el&&!tip.hidden){hideTip();return;}
  tipEl=el;tip.textContent=txt;tip.hidden=false;
  const r=el.getBoundingClientRect(),tw=tip.offsetWidth,th=tip.offsetHeight;
  let x=r.left+r.width/2-tw/2;x=Math.max(8,Math.min(window.innerWidth-tw-8,x));
  let y=r.top-th-10;if(y<8)y=r.bottom+10;
  tip.style.left=x+'px';tip.style.top=y+'px';
}
function hideTip(){const t=$('#tip');if(t){t.hidden=true;}tipEl=null;}
document.addEventListener('pointerover',e=>{if(e.pointerType!=='mouse')return;const t=e.target.closest('[data-tip]');if(t)showTip(t);else hideTip();});
document.addEventListener('pointerdown',e=>{if(e.pointerType==='mouse')return;const t=e.target.closest('[data-tip]');clearTimeout(tipT);if(!t)return;tipT=setTimeout(()=>{if(t.closest('[data-act]')){UI.suppress=true;}showTip(t);},420);});
['pointerup','pointercancel','pointermove'].forEach(ev=>document.addEventListener(ev,e=>{if(ev==='pointermove'&&e.pointerType==='mouse')return;clearTimeout(tipT);}));
document.addEventListener('scroll',()=>{if(tipEl)hideTip();},{passive:true,capture:true});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(UI.modal)UI.modal=null;else if(UI.panel)UI.panel=null;else return;render();}});

// ---------- lưu ----------
const KEY='phusinh2_save_v1';
function snapshot(){return {v:SAVE_V,ts:Date.now(),meta:G.meta,run:G.run,over:G.over,birth:G.birth,screen:G.screen};}
function encodeSave(){return 'PS1.'+btoa(unescape(encodeURIComponent(JSON.stringify(snapshot()))));}
function decodeSave(s){s=s.trim();if(s.startsWith('PS1.'))s=s.slice(4);return JSON.parse(decodeURIComponent(escape(atob(s))));}
// điền giá trị mặc định cho trường mới; bản lưu của các lần chỉnh sửa trước vẫn tải được
function migrate(d){
  if(!d||!d.meta||!d.meta.world||!d.meta.world.regions)throw new Error('bad');
  d.v=d.v||1;
  if(d.v<2&&d.run){const r=d.run;r.dao=r.dao||0;r.daoSk=0;r.daoPill=0;r.quality=r.quality||[0,0,0,0,0];
    if(r.realm>=2&&r.danQ)r.quality[2]=r.danQ;delete r.danQ;
    if(r.scene&&(r.scene.type==='combat'||r.scene.type==='rest'))r.scene=null;}
  if(d.meta&&!d.meta.opt)d.meta.opt={};
  if(d.v<3){const w=d.meta.world;w.ents=w.ents||[];w.legacy=w.legacy||[];w.chron=w.chron||[];
    if(!w.rstate)w.rstate=(d.run&&d.run.rivals?d.run.rivals.map(x=>({i:x.i,realm:x.realm,prog:x.prog,alive:x.alive,age:18})):w.rivals.map((x,i)=>({i,realm:0,prog:20,alive:true,age:18})));
    if(d.run){d.run.party=d.run.party||[];d.run.quests=d.run.quests||[];}}
  if(typeof migrateX==='function')migrateX(d);
  d.v=SAVE_V;d.meta.v=SAVE_V;
  return d;
}
function loadData(d){d=migrate(d);G={meta:d.meta,run:d.run||null,over:d.over||null,birth:d.birth||null,screen:d.screen||'title'};
  if((G.screen==='map'||G.screen==='run')&&!G.run)G.screen='title';if(G.screen==='run')G.screen='map';if(G.screen==='codex')G.screen='meta';if(G.screen==='over'&&!G.over)G.screen='title';if(G.screen==='birth'&&!G.birth)G.screen='title';
  if(!G.meta.world)G.meta.world=genWorld();
  extendWorld(G.meta.world);if(G.run)run2();syncDodge();
  const sc=G.run&&G.run.scene;if(sc&&sc.type==='combat'){if(sc.dodge)dodgeResolve(null);if(sc.qte)qteResolve(null);}}
let DB=null,dbBusy=false,dbPending=false,dbTimer=null;
saveSoon=function(){
  try{localStorage.setItem(KEY,JSON.stringify(snapshot()));}catch(e){}
  if(DB){clearTimeout(dbTimer);dbTimer=setTimeout(dbWrite,1500);}
};
async function dbWrite(){if(!DB)return;if(dbBusy){dbPending=true;return;}dbBusy=true;
  try{await DB.set({ts:Date.now(),data:JSON.stringify(snapshot())});}catch(e){}
  dbBusy=false;if(dbPending){dbPending=false;dbWrite();}}
async function initDB(){
  try{
    if(!window.claude||!window.claude.use)return;
    const [db,user]=await Promise.all([window.claude.use('db'),window.claude.use('user')]);
    if(!db||!user)return;const id=await user.id();if(!id)return;
    const ref=db.collection('data/users/'+id).doc('save');
    let snap=null;try{snap=await ref.get();}catch(e){}
    DB=ref;
    if(snap&&snap.exists){const d=snap.data();let local=0;try{const l=JSON.parse(localStorage.getItem(KEY)||'null');local=l?l.ts:0;}catch(e){}
      if(d&&d.data&&d.ts>local){try{loadData(JSON.parse(d.data));render();}catch(e){}}}
  }catch(e){DB=null;}
}

// ---------- khởi động ----------
(function boot(){
  gfxDetect();cfgLoad();
  let ok=false;
  try{const l=JSON.parse(localStorage.getItem(KEY)||'null');if(l){loadData(l);ok=true;}}catch(e){}
  if(!ok){G={meta:newMeta(),run:null,birth:null,over:null,screen:'title'};syncDodge();}
  UI.narrSkip=false;if(G.screen==='map'&&G.run)G.screen='title';
  try{Map2.setFont(getComputedStyle(document.body).fontFamily);}catch(e){}
  Map2.attach($('#mapcv'));
  render();
  initDB();
  requestAnimationFrame(loop);
})();
