// ---------- vẽ màn hình ----------
const HCACHE={};
// html: chuỗi HTML (bản cũ) hoặc {rx:'TênMàn',fb:hàmBảnCũ} (vẽ bằng React, xem ui/22-cau-noi-react.js)
function setH(id,html){const el=document.getElementById(id);if(!el)return false;const isRx=html&&typeof html==='object';if(!isRx&&HCACHE[id]===html){return false;}
  const tk0=id==='sheet'&&document.getElementById('plTalk');const tkTop=tk0?tk0.scrollTop:0,tkN=tk0?tk0.dataset.n:null;
  const sc=el.querySelector('.win-b,.sc-b');const top=sc?sc.scrollTop:0;const key=el.dataset.k;
  const k2=viewKey(id);
  if(isRx){try{RX.show(el,html.rx,id+':'+k2);HCACHE[id]=undefined;el.hidden=!el.childNodes.length;}catch(e){console.error(e);RX.hide(el);html=html.fb();}}
  if(typeof html==='string'){if(el._rx)RX.hide(el);HCACHE[id]=html;el.innerHTML=html;el.hidden=!html;}el.dataset.k=k2;if(id==='modal')el.classList.toggle('still',!!k2&&key===k2);
  if(id==='sheet'){el.classList.toggle('still',!!k2&&key===k2);const tk=document.getElementById('plTalk');if(tk){if(tkN!=null&&tkN===tk.dataset.n)tk.scrollTop=tkTop;else tk.scrollTop=tk.scrollHeight;}}if(top&&key===k2){const s2=el.querySelector('.win-b,.sc-b');if(s2)s2.scrollTop=top;}
  return true;}
function viewKey(id){const sc=G.run&&G.run.scene;if(id==='sheet')return sc?sc.type+':'+(sc.id||'')+':'+(sc.story?sc.story.length:0)+':'+(sc.phase||''):'';if(id==='panel')return (UI.panel||'')+JSON.stringify(UI.tab);if(id==='full')return G.screen+(UI.tab.meta||'');if(id==='modal')return UI.modal?UI.modal.k:'';return '';}
function syncDodge(){const o=G.meta.opt=G.meta.opt||{};if(o.userDodge===undefined)o.userDodge=!!o.autoDodge;o.autoDodge=!!o.userDodge;o.autoQte=!!CFG.autoFight;}
function render(){
  let full='',hud='',mapui='',dock='',nav='',sheet='',panel='',modal='';
  try{
    if(G.screen==='map'&&!G.run)G.screen='title';
    const inMap=G.screen==='map'&&!!G.run;const sc=inMap?G.run.scene:null;const cb=sc&&sc.type==='combat'&&!sc.prep;
    if(!G.run&&UI.panel&&UI.panel!=='more')UI.panel=null;
    if(cb&&UI.panel!=='more'){UI.panel=null;}
    if(!inMap&&UI.modal)UI.modal=null;
    if(!inMap){full=G.screen==='birth'&&G.birth?rxv('Birth',vBirth):G.screen==='over'&&G.over?rxv('Over',vOver):G.screen==='meta'?rxv('Meta',vMeta):G.screen==='life'&&G.run?rxv('Life',vLife):rxv('Title',vTitle);}
    else{
      if(cb)full=rxv('TranDau',()=>vCombat(sc));
      else{hud=rxv('Hud',hudHTML);nav=rxv('Nav',navHTML);
        if(!sc){mapui=rxv('NutBanDo',mapUiHTML);dock=rxv('TheDiaDiem',dockHTML);}
        else if(UI.evMin&&sc.type==='event'){mapui=rxv('NutBanDo',mapUiHTML);dock=rxv('TheDiaDiem',dockHTML);}
        else if(sc.type==='region')sheet=rxv('Canh:region',()=>vRegionIntro(sc));
        else sheet=rxv('Canh:'+sc.type,()=>(SCENE_V[sc.type]||(()=>''))(sc));}
    }
    if(UI.panel)panel=rxv('Bang:'+UI.panel,()=>(PANEL_V[UI.panel]||(()=>''))());
    modal=modalHTML();
    document.documentElement.dataset.tf=CFG.tfStyle||'hang';document.documentElement.dataset.view=inMap?(cb?'combat':sc?'scene':'map'):'screen';
  }catch(e){console.error(e);full=`<div class="title"><p>Có lỗi khi vẽ màn hình: ${esc(e.message)}</p><button class="btn pri" data-act="screen" data-arg="title">Về màn hình đầu</button></div>`;UI.panel=null;UI.modal=null;panel='';modal='';}
  const vtok=document.documentElement.dataset.view==='combat'?'combat':G.screen==='map'&&G.run?'map':'screen:'+G.screen;
  if(UI.inkBusy)return;
  if(UI.vtok&&UI.vtok!==vtok&&CFG.anim!==false){UI.inkBusy=true;inkCover(()=>{UI.inkBusy=false;UI.vtok=vtok;render();inkReveal();});return;}
  UI.vtok=vtok;
  setH('hud',hud);setH('mapui',mapui);setH('dock',dock);setH('nav',nav);setH('sheet',sheet);setH('full',full);setH('panel',panel);setH('modal',modal);
  const sc2=G.run&&G.run.scene;UI.lastStory=sc2&&sc2.story?sc2.story.length:0;
  const hd=document.getElementById('hud');document.getElementById('app').style.setProperty('--hudh',(hd&&!hd.hidden?hd.offsetHeight:0)+'px');
  const dl=document.getElementById('dlg');if(dl)dl.scrollTop=dl.scrollHeight;
  if(UI.plTop){UI.plTop=0;const pb=document.querySelector('#sheet .sc-b');if(pb)pb.scrollTop=0;}

  qpopFlush();
  Map2.resize();Art.fillAll();Map2.invalidate();toastFlush();hideTip();
}
function after(){render();saveSoon();}
function mapTap(n,c){const r=G.run;if(!r||r.scene)return;UI.sel=n?n.id:null;UI.cell=n||c==null?null:(UI.cell===c?null:c);UI.cardMin=false;render();}
function hexTip(c,x,y){const tip=$('#tip');const n=hexNode(c);const I=hexInfo(c);const shown=n&&!(CFG.hideT||{})[n.type];if(!shown){hideTip();return;}
  tip.textContent=n.name+(n.fog>=2||n.memory?'':'?')+' · '+TYPE_NAME[n.type]+'\n'+DTAG[dangerTag(n)]+'\n'+I.regName+(I.dist?' › '+I.dist:'');tip.hidden=false;tipEl=null;
  tip.className='';placeTip(x,y);}

// ---------- đồng hồ và vòng lặp khung hình ----------
function clockOn(){const r=G.run;return G.screen==='map'&&r&&!r.scene&&!UI.panel&&!UI.modal&&!UI.paused&&!document.hidden&&(CFG.clockIdle||!!r.moving);}
let clkLast=performance.now(),clkAcc=0,clkFlush=0,clkSaveT=0,clkDay=-1,clkPart='';
function clockText(){const a=$('#clk');if(a)a.innerHTML=clkStr(W().t);}
function loop(now){
  let dt=Math.min(1,(now-clkLast)/1000);clkLast=now;
  const r=G.run;
  if(r&&r.scene&&r.scene.type==='combat'&&!r.scene.prep){try{combatFrame(now,dt);}catch(e){console.error(e);}}
  else if(clockOn()){
    try{
      const sp=UI.speed||1;let redraw=false;
      if(r.moving&&!r.halt){const m=r.moving;const segH=m.seg<m.path.length-1?edgeLen(m.path[m.seg],m.path[m.seg+1])/walkSpeed():24;
        const nc=m.seg<m.path.length-1?hexPath(nodeHex(nodeById(m.path[m.seg])),nodeHex(nodeById(m.path[m.seg+1]))).cells.length:2;travelTick(Math.max(6,segH/Math.max(2,0.4*nc))*(sp>1?3:1)*dt);redraw=true;Map2.invalidate();}
      else clkAcc+=dt;
      if(now-clkFlush>=250||!G.run||G.run.scene){clkFlush=now;
        if(G.run&&(!G.run.moving||G.run.halt)&&!G.run.scene&&clkAcc>0){advanceTime(clkAcc*sp);if(G.run)autoCheck();}
        clkAcc=0;
        if(!G.run||G.run.scene||G.screen!=='map'){UI.evMin=false;after();}
        else{const t=W().t;const d=Math.floor(t/HD),p=partOf(t);const mv=$('#mvLeft');if(redraw&&mv&&G.run.moving&&!(G.toasts&&G.toasts.length)){const m=G.run.moving;const L=m.seg<m.path.length-1?edgeLen(m.path[m.seg],m.path[m.seg+1])*(1-m.prog):0;mv.textContent='còn '+Math.round(L)+' dặm';clockText();if(d!==clkDay){clkDay=d;setH('hud',hudHTML());}}else if(d!==clkDay||p!==clkPart||redraw||(G.toasts&&G.toasts.length)){clkDay=d;clkPart=p;render();}else clockText();Map2.invalidate();}
        if(G.run&&(W().t-clkSaveT>=30||(G.run.moving&&now-(UI.mvSave||0)>800))){clkSaveT=W().t;UI.mvSave=now;saveSoon();}
      }
    }catch(e){console.error(e);}
  } else clkAcc=0;
  if((UI.lvGlow&&now<UI.lvGlow.t1+100)||UI.dnMv)Map2.soft();
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
  resume:()=>{G.screen='map';UI.modal=null;UI.panel=null;UI.menu=null;UI.pendSk=null;UI.confirm=null;
    const r=G.run,sc=r&&r.scene;
    if(sc&&sc.type==='place')r.scene=null; // bảng chi tiết địa điểm: đóng, mở lại khi cần
    else if(sc&&sc.type==='combat'&&!sc.done)UI.modal={k:'cbResume'};}, // đang đánh: phải xác nhận mới đánh tiếp
  cbResumeGo:()=>{UI.modal=null;},
  screen:a=>{UI.panel=null;UI.modal=null;if(a==='map'){G.screen=G.run?'map':'title';}else if(a==='codex'){G.screen='meta';UI.tab.meta='lives';}else{G.screen=a;}if(a==='meta'||a==='title')G.over=null;if(a==='title')UI.narrSkip=true;},
  overNext:()=>{G.over=null;G.screen='title';UI.narrSkip=false;},
  narrSkip:()=>{UI.narrSkip=true;},
  titleCfg:()=>{UI.panel='more';UI.tab.more='cfg';},
  regionGo:()=>{G.run.scene=null;Map2.center();},
  choose:i=>{UI.evMin=false;choose(+i);},
  next:()=>endScene(),
  pact:a=>{const sc=G.run&&G.run.scene;if(VENUE_N[a]&&sc&&sc.type==='place'){sc.venue=a;UI.plTop=1;return;}
    if(sc&&sc.type==='place'&&!['bq','laibuon','tram','nhansu','conghien','tinhthat','quyan','bt','board','cross'].includes(a)){const A=placeActs(nodeById(sc.id)).find(x=>x.a===a);if(A&&!A.dis&&A.h>0){UI.modal={k:'pconf',a};return;}}
    if(a==='bq'){UI.modal={k:'bq'};return;}if(a==='laibuon'||a==='tram'||a==='nhansu'||a==='conghien'){UI.modal={k:a};return;}if(a==='tinhthat'){G.bqRoom=true;UI.bqOpened=false;UI.modal={k:'bq'};return;}if(a==='quyan'&&UI.confirm!=='quyan'){UI.confirm='quyan';return;}UI.confirm=null;placeAct(a);},
  leave:()=>leavePlace(),
  pass:a=>passAct(a),
  hud:()=>{if(G.run&&G.run.scene)UI.hudScene=!UI.hudScene;else UI.hudOpen=!UI.hudOpen;},
  cbGo:()=>prepGo(),ppKn:()=>{const sc=G.run&&G.run.scene;const cmp=sc&&sc.units&&sc.units.length>2;UI.ppKn=!(UI.ppKn!=null?UI.ppKn:!cmp);},cbQuick:()=>quickFight(),ccOpen:k=>{const o=UI.ccOpen=UI.ccOpen||{};o[k]=o[k]===false;},cbOpen:()=>{UI.cbOpen=UI.cbOpen===false;},prepKn:()=>{UI.panel='char';UI.tab.char='kn';},prepBag:()=>{UI.panel='char';UI.tab.char='bag';},
  hudBq:()=>{G.bqRoom=false;openBq();},
  evMin:()=>{UI.evMin=true;},
  evBack:()=>{UI.evMin=false;},
  destX:()=>{G.run.dest=null;},
  mount:id=>buyMount(id),
  vehi:i=>{UI.modal={k:'vehi',i:+i};},tramBack:()=>{UI.modal={k:'tram'};},vehGo:x=>{const [i,md]=x.split(':');if(vehTake(+i,md))UI.modal={k:'tram'};},
  chGive:k=>chGive(k),
  chTrade:()=>chTrade(),
  legT:t=>{const h=Object.assign({},CFG.hideT||{});if(h[t])delete h[t];else h[t]=1;cfgSet('hideT',h);},
  legE:t=>{const h=Object.assign({},CFG.hideE||{});if(h[t])delete h[t];else h[t]=1;cfgSet('hideE',h);},
  legAll:()=>{const any=Object.keys(CFG.hideT||{}).length+Object.keys(CFG.hideE||{}).length>0;if(any){cfgSet('hideT',{});cfgSet('hideE',{});}else{const a={},b={};Object.keys(GLYPH).forEach(k=>{if(TYPE_NAME[k])a[k]=1;});a._me=1;Object.keys(ENT_T).forEach(k=>b[k]=1);cfgSet('hideT',a);cfgSet('hideE',b);}},
  legendOpen:()=>{UI.panel='more';UI.tab.more='legend';},
  bagOpen:()=>{UI.panel='char';UI.tab.char='bag';UI.code=null;UI.msg=null;},
  hudBt:()=>{UI.modal=null;const r=G.run;if(!r.scene)openPlace(r.at);if(r.scene&&r.scene.type==='place'){placeAct('bt');if(r.scene&&r.scene.type==='place')note(nodeById(r.at).dp?'Chưa đủ điều kiện đột phá.':'Đột phá cần ngồi trong động phủ. Hãy khai phủ ở nơi hoang dã, hoặc quay về động phủ cũ.');}},
  status:()=>{UI.status=!UI.status;},
  panel:k=>{UI.panel=UI.panel===k?null:k;UI.code=null;UI.msg=null;UI.confirm=null;UI.chuSel=null;},
  closePanel:()=>{UI.panel=null;UI.code=null;UI.msg=null;},
  modalX:()=>{const m=UI.modal;UI.modal=null;G.bqRoom=false;if(m&&m.k==='bq'&&UI.bqOpened&&G.run&&G.run.scene&&G.run.scene.type==='place'){G.run.scene=null;}UI.bqOpened=false;},
  unsel:()=>{UI.sel=null;UI.cell=null;},
  gridT:()=>{cfgSet('grid',!CFG.grid);},
  cardMin:()=>{UI.cardMin=true;},
  cardMax:()=>{UI.cardMin=false;},
  descTg:()=>{UI.descHide=!UI.descHide;},
  exStat:()=>{UI.modal={k:'explore'};},
  exGo:()=>{UI.modal=null;placeAct('explore');},
  evGo:i=>{const r=G.run,n=nodeById(r.scene.id);const id=n.evs&&n.evs.L[+i];if(!id)return;n.evs.L.splice(+i,1);advanceTime(2);if(G.run&&G.run.scene&&G.run.scene.type==='place')startEvent(id);},
  meet:id=>{const r=G.run,at=r.at;const e=W().ents.find(x=>String(x.id)===id);if(!e)return;meetEnt(e);if(G.run&&G.run.scene&&G.run.scene.type==='event')G.run.scene.back=at;else note('Họ lướt qua, chẳng để ý tới ngươi.');},
  closeAll:()=>{if(G.run){G.run.scene=null;}UI.modal=null;UI.panel=null;},
  openJournal:()=>{if(G.run)G.run.scene=null;UI.modal=null;UI.panel='journal';UI.tab.journal='quest';},
  qevPick:i=>qevPick(+i),qevDone:()=>{if(G.run)G.run.scene=null;},
  kyPick:i=>kyPick(+i),kyDone:()=>{const r=G.run;if(r){r.scene=null;if(r.moving)r.moving.halt=0;}},
  vehOff:()=>vehOff(),vehOn:()=>{vehOn();},
  qDo:id=>{UI.modal={k:'qdo',id};},qDoGo:id=>{UI.modal=null;const q=G.run.quests.find(x=>x.id===id);UI.lastQ=q?(q.kind==='den'?'Giao tận tay: ':'Lùng tìm: ')+q.text:null;questDo(id);UI.plTop=1;},
  questGo:()=>{const n=nodeById(G.run.at);advanceTime(2);if(G.run&&G.run.scene&&G.run.scene.type==='place'&&!questExplore(n))note('Chưa thấy tung tích gì.');},
  sell:a=>{const [k,i]=a.split(':');sellItem(k,+i);},
  stage:id=>{UI.modal=null;stageGo(+id);},
  go:id=>{const n=nodeById(+id);if(CFG.confirmDanger&&dangerTag(n)>=3&&n.id!==G.run.at){UI.modal={k:'danger',id:n.id};return;}ACT.goSure(id);},
  goSure:id=>{UI.modal=null;G.run.halt=false;if(travelTo(+id)){G.run.dest=+id;UI.paused=false;UI.cardMin=true;Map2.cam.follow=true;}},
  enter:()=>{G.run.dest=null;openPlace(G.run.at);},
  stop:()=>{const r=G.run;if(r.moving){r.halt=true;snapStop();}},
  goOn:()=>{G.run.halt=false;UI.paused=false;},
  turnBack:()=>{const r=G.run,m=r.moving;if(!m)return;r.halt=false;const a=m.path[m.seg];if(travelTo(a))r.dest=a;},
  speed:v=>{v=+v;if(!v)UI.paused=!UI.paused;else{UI.paused=false;UI.speed=v;}},
  wait:k=>{const t0=W().t;const h=t0%HD;const tgt=k==='sang'?7:19;let d=tgt-h;if(d<0.5)d+=24;advanceTime(d);if(!G.run)return;const t=W().t;G.meta.world.t=Math.floor(t/HD)*HD+tgt+(Math.floor(t/HD)*HD+tgt<t0?HD:0);autoCheck();note('Chờ '+Math.round(d)+' giờ. Nay là giờ '+gioName(W().t)+', buổi '+PART[partOf(W().t)].n+'.');},
  zoom:d=>{Map2.zoom(+d>0?1.4:1/1.4);},
  center:()=>{Map2.center();},
  noteEdit:id=>{UI.modal={k:'note',id:+id};setTimeout(()=>{const i=$('#noteIn');if(i)i.focus();},50);},
  noteSave:id=>{const i=$('#noteIn');if(noteSet(+id,i?i.value:'')===false){note('Đã ghim đủ 50 chỗ.');}UI.modal=null;},
  noteGo:k=>{const n=nodeById(+k);if(n&&Math.floor(n.id/100)===G.run.region&&n.fog>=1){UI.panel=null;UI.sel=n.id;UI.cardMin=false;const p=nodeShown(n);Map2.focus(p[0],p[1]);}else note('Chỗ ấy không ở vùng này, hoặc kiếp này ngươi chưa biết tới.');},
  pactGo:a=>{UI.modal=null;UI.confirm=null;const sc=G.run.scene;const A=sc&&sc.type==='place'&&placeActs(nodeById(sc.id)).find(x=>x.a===a);UI.lastQ=PL_N[a]||(A&&A.l)||null;placeAct(a);UI.plTop=1;},
  vclose:()=>{const sc=G.run&&G.run.scene;if(sc)sc.venue=null;},
  vopt:id=>{const sc=G.run&&G.run.scene;if(!sc||!sc.venue)return;const o=venueOpts(nodeById(sc.id),sc.venue).find(x=>x.id===id);if(!o)return;UI.modal={k:o.lack||o.no?'vreq':'vconf',v:sc.venue,id};},
  vgo:x=>{const [v,id]=x.split(':');UI.modal=null;const sc=G.run.scene;const o=sc&&venueOpts(nodeById(sc.id),v).find(z=>z.id===id);UI.lastQ=o?VENUE_N[v]+': '+o.l:null;venueDo(v,id);UI.plTop=1;},
  kvPick:i=>{kvChoose(+i);},
  xkGo:()=>{UI.modal=null;const r=G.run;if(!r.scene)openPlace(r.at);if(r.scene&&r.scene.type==='place')placeAct('xk');},
  bqSet:y=>{if(UI.modal&&UI.modal.k==='bq'){UI.modal.y=+y;UI.modal.ok=0;const c=bqCapY();UI.modal.warn=c!=null&&+y>c?1:0;}},
  bqWarnX:()=>{if(UI.modal){UI.modal.warn=0;const c=bqCapY();if(c!=null)UI.modal.y=c;}},bqWarnOk:()=>{if(UI.modal){UI.modal.warn=0;UI.modal.ok=1;ACT.bqGo();}},
  bqGo:()=>{const y=UI.modal&&UI.modal.y;if(!(y>0)||bqFullNow())return;{const c=bqCapY();if(c!=null&&y>c&&!UI.modal.ok){UI.modal.warn=1;return;}}UI.modal=null;const t0=W().t,tv0=G.run.tv;const done=bqCustom(y);const r=G.run,sc=r&&r.scene;if(!done){note(bqCan()||'Không bế quan được ở đây.');if(UI.bqOpened&&sc&&sc.type==='place')r.scene=null;}else if(sc&&sc.type==='place'){UI.modal={k:'res',title:'Xuất quan',t:sc.msg.join(' '),chips:sc.chips.map(c=>c&&c.i==='⏳'?Object.assign({},c,{t:durH(W().t-t0)}):c)};sc.msg=[];sc.chips=[];if(UI.bqOpened)r.scene=null;}UI.bqOpened=false;},
  enc:a=>encAct(a),
  bossFight:()=>bossFight(),
  skill:id=>{UI.menu=null;const sc=G.run.scene;if(needTarget(sc,id)){UI.pendSk=id;return;}UI.pendSk=null;playerAct(id);},
  tgt:id=>{const k=UI.pendSk;UI.pendSk=null;if(k)playerAct(k,+id);},
  cancelSk:()=>{UI.pendSk=null;},
  menu:m=>{UI.menu=m||null;},
  atkslot:id=>toggleAtkSlot(id),
  skLock:id=>skLockToggle(id),
  nkToggle:()=>{nkSet(!NK.on);if(NK.on)dbg('nhatky.bat',{});},
  nkCopy:()=>{const t=NK.dump();try{navigator.clipboard.writeText(t).then(()=>note('Đã sao chép '+NK.buf.length+' dòng nhật ký.','up'),()=>note('Không sao chép được.','dn'));}catch(e){note('Không sao chép được.','dn');}},
  prep:i=>prepToggle(i),
  prepGo:()=>prepStart(),
  btGo:()=>btContinue(),
  quest:i=>takeQuest(i),
  qExp:id=>{UI.qOpen=UI.qOpen||{};UI.qOpen[id]=!UI.qOpen[id];},
  qDrop:id=>{UI.modal={k:'qdrop',id};},qDropGo:id=>{UI.modal=null;questCancel(id);},
  qNav:id=>{const q=G.run.quests.find(x=>x.id===id);if(!q)return;const n=nodeById(q.node);if(!n)return;if(Math.floor(n.id/100)!==G.run.region){note('Nơi ấy không ở vùng này.');return;}
    UI.panel=null;if(G.run.scene&&G.run.scene.type!=='combat')G.run.scene=null;if(n.fog>=1){UI.sel=n.id;UI.cardMin=false;const p=nodeShown(n);Map2.focus(p[0],p[1]);}else{UI.sel=null;Map2.focus(n.x,n.y);note('Nơi ấy còn chìm trong sương mù, chỉ biết đại khái ở quanh đây.');}},
  bsel:k=>buryToggle(k),
  buryGo:()=>buryItems(),
  autoDodge:v=>{const o=G.meta.opt=G.meta.opt||{};o.userDodge=v==='1';syncDodge();},
  autoFight:()=>{cfgSet('autoFight',!CFG.autoFight);syncDodge();UI.menu=null;UI.pendSk=null;},
  autoOpen:()=>{UI.autoOpen=!UI.autoOpen;},
  autoTg:k=>{if(!['autoFight','autoBlk','autoDg'].includes(k))return;cfgSet(k,!CFG[k]);syncDodge();if(k==='autoFight'){UI.menu=null;UI.pendSk=null;}},
  cspd:n=>{cfgSet('cspeed',+n);},
  cspeed:()=>{cfgSet('cspeed',CFG.cspeed>=3?1:CFG.cspeed+1);},
  clog:()=>{UI.modal={k:'clog'};},
  cpill:i=>{UI.menu=null;playerPillAct(+i);},
  flee:()=>{UI.menu=null;playerFlee();},
  dd:j=>{UI.menu=null;playerDD(+j);},
  mind:()=>{UI.menu=null;playerMind();},
  learn:i=>{const t=learnBook(+i);bagSt().sel=null;UI.modal=t?{k:'res',title:'Sở học',t,chips:[]}:null;},
  study:u=>{const t=studyArt(+u);if(t)UI.modal={k:'res',title:'Tham ngộ',t,chips:[]};},
  forget:u=>{if(UI.confirm!=='fg'+u){UI.confirm='fg'+u;return;}UI.confirm=null;dropArt(+u);},
  chuUnblock:()=>{if(chuUnblock())note('Một ô kinh mạch đã thông.','up');},
  knSel:a=>{const [c,i]=a.split(':');const K=UI.knSel;UI.knSel=K&&K.c===c&&K.i===+i?null:{c,i:+i};},
  knPick:a=>{const [c,i]=a.split(':');UI.knSel={c,i:+i};UI.modal={k:'pick',key:'K'+a};},
  knPut:id=>{const K=UI.knSel;if(!K)return;knSet(K.c,K.i,id||null);UI.knSel=null;if(UI.modal&&UI.modal.k==='pick')UI.modal=null;},
  knDel:a=>{const [c,i]=a.split(':');knSet(c,+i,null);UI.knSel=null;if(UI.modal&&UI.modal.k==='pick')UI.modal=null;},
  slotPick:k=>{UI.modal={k:'pick',key:k};},
  eqPut:i=>{const m=UI.modal;if(m&&m.key&&m.key[0]==='E')equipTo(+i,m.key.slice(1));UI.modal=null;bagSt().sel=null;},
  ddPutM:i=>{ddPut(+i);UI.modal=null;bagSt().sel=null;},
  chuPick:i=>{UI.chuSel=+i;UI.modal={k:'pick',key:'C'+i};},
  chuDel:i=>{chuSet(+i,null);syncSkills();UI.chuSel=null;if(UI.modal&&UI.modal.k==='pick')UI.modal=null;},
  thPick:i=>{UI.modal={k:'th',i:+i};},
  thOpen:i=>{if(thOpenAct(+i)){UI.modal=null;note('Một tiểu huyệt đã khai thông.','up');}},
  artStash:u=>{artStash(+u);},artUnstash:u=>{if(!artUnstash(+u))note('Hết ô trống. Tháo một môn khác ra trước.');else if(UI.modal&&UI.modal.k==='pick')UI.modal=null;},
  artOpen:u=>{UI.modal={k:'art',u:+u};},
  phamHelp:()=>{UI.modal={k:'pham'};},
  bagTab:c=>{UI.dd=null;const B=bagSt();B.tab=c;B.sel=null;},
  ddOpen:k=>{UI.dd=UI.dd===k?null:k;},
  pickSel:j=>{if(UI.modal)UI.modal.sel=+j;},
  bagLock:()=>{const r=G.run,B=bagSt();const it=bagItems().find(x=>x.key===B.sel);if(!it)return;if(it.ref.t==='rel'){const x=r.relics[it.ref.i];x.lock=x.lock?0:1;}else{r.locks=r.locks||{};if(r.locks[it.key])delete r.locks[it.key];else r.locks[it.key]=1;}},
  artRun:u=>{const r=run2();const n=chuSlots();for(let j=0;j<n;j++)if(!r.chu[j]){chuSet(j,{k:'a',u:+u});break;}syncSkills();},
  bagSel:k=>{const B=bagSt();B.sel=k;B.n=1;UI.modal={k:'item',key:k};},
  bagPham:v=>{UI.dd=null;const B=bagSt();B.pham=v==null?(B.pham>=6?-1:B.pham+1):+v;B.sel=null;},
  bagSort:v=>{UI.dd=null;const B=bagSt();B.sort=v==null?(B.sort+1)%4:+v;},
  bagN:d=>{const B=bagSt();const it=bagItems().find(x=>x.key===B.sel);if(!it)return;B.n=d==='all'?it.cnt:clamp((B.n||1)+(+d),1,it.cnt);},
  bagUse:()=>{const B=bagSt();bagUse(B.sel,B.n||1);if(!bagItems().find(x=>x.key===B.sel)){B.sel=null;if(UI.modal&&UI.modal.k==='item')UI.modal=null;}B.n=1;},
  bagDrop:()=>{const B=bagSt();if(UI.confirm!=='drop'){UI.confirm='drop';return;}UI.confirm=null;bagDrop(B.sel,B.n||1);B.n=1;if(!bagItems().find(x=>x.key===B.sel)){B.sel=null;if(UI.modal&&UI.modal.k==='item')UI.modal=null;}},
  eqOn:i=>{equip(+i);bagSt().sel=null;if(UI.modal&&UI.modal.k==='item')UI.modal=null;},
  eqOff:s=>{unequip(s);bagSt().sel=null;if(UI.modal&&UI.modal.k==='pick')UI.modal=null;},
  ddPut:i=>{if(ddPut(+i)){bagSt().sel=null;if(UI.modal&&UI.modal.k==='item')UI.modal=null;}},
  ddTake:j=>{ddTake(+j);bagSt().sel=null;if(UI.modal&&UI.modal.k==='pick')UI.modal=null;},
  ult:(a,el)=>{if(el&&el.getAttribute('aria-disabled'))return;UI.menu=null;UI.pendSk=null;playerUlt();},
  burnOpen:()=>{UI.burnOpen=!UI.burnOpen;},
  burn:k=>{if(playerBurn(k))UI.burnOpen=false;},
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
  affCat:f=>{UI.filter=f;UI.dd=null;},
  affGo:a=>{if(!a)return;const [x,y,id]=a.split(',');UI.panel=null;Map2.focus(+x,+y);if(id!==''){UI.sel=+id;UI.cardMin=false;}},
  cfg:a=>{const i=a.indexOf('=');const k=a.slice(0,i);cfgSet(k,JSON.parse(a.slice(i+1)));if(k==='autoFight')syncDodge();if(k==='theme'||k==='font'){Art.clear();}Map2.resize();},
  usepill:i=>{const m=usePill(+i,false);if(m&&G.run)log('Dùng '+m+'.');},
  chuSel:i=>{UI.chuSel=UI.chuSel===+i?null:+i;},
  chuPut:i=>{if(UI.chuSel==null)return;if(+i<0)chuSet(UI.chuSel,null);else{const c=chuPool()[+i];if(c)chuSet(UI.chuSel,c);}syncSkills();if(UI.modal&&UI.modal.k==='pick'){UI.modal=null;UI.chuSel=null;}},
  chuAuto:()=>{chuAuto();syncSkills();UI.chuSel=null;},
  chuClear:()=>{const r=run2();r.chu=[null,null,null,null,null,null,null,null];clampHp();syncSkills();UI.chuSel=null;},
  petSet:i=>petSet(+i),
  petFree:i=>{if(UI.confirm!=='free'+i){UI.confirm='free'+i;return;}UI.confirm=null;petFree(+i);},
  petHatch:i=>{petHatch(+i,true);},
  petFeed:i=>{const r=run2();if(r.petOut!=null)petFeed(r.petOut,+i);},
  craft:id=>{const res=craft(id);if(res){UI.modal={k:'res',title:res.name+(res.ok?' thành công':' thất bại'),t:res.t,chips:res.chips};}},
  exp:()=>{UI.code=encodeSave();UI.codeMode='exp';UI.msg='Sao chép đoạn mã trên và cất đi. Dán lại ở mục Nạp mã lưu để khôi phục.';setTimeout(()=>{const t=$('#code');if(t){t.select();}},30);},
  imp:()=>{UI.code='';UI.codeMode='imp';UI.msg=null;},
  impGo:()=>{const t=$('#code');try{const d=decodeSave(t.value);loadData(d);UI.panel=null;UI.code=null;}catch(e){UI.code=t.value;UI.msg='Mã lưu không hợp lệ.';}},
  newGame:()=>{if(UI.confirm!=='newGame'){UI.confirm='newGame';return;}UI.confirm=null;G={meta:newMeta(),run:null,birth:null,over:null,screen:'title'};UI.panel=null;UI.modal=null;UI.sel=null;UI.bag=null;syncDodge();ACT.birth();saveSoon();},
  wipe:()=>{if(UI.confirm!=='wipe'){UI.confirm='wipe';return;}UI.confirm=null;G={meta:newMeta(),run:null,birth:null,over:null,screen:'title'};UI.panel=null;UI.sel=null;syncDodge();},
};
const KEEP_CONFIRM={pact:1,wipe:1,newGame:1,petFree:1,bagDrop:1,forget:1};
document.addEventListener('click',e=>{
  if(UI.suppress){UI.suppress=false;e.preventDefault();e.stopPropagation();return;}
  // chú thích vừa hiện bằng chạm nhanh: bỏ qua cú click đi kèm để khỏi bật rồi tắt ngay
  if(performance.now()-tipTapAt<600&&e.target.closest('[data-tip]')&&!e.target.closest('[data-act]')){e.preventDefault();return;}
  // chạm vào nhãn vật phẩm hay chữ gạch chân: chỉ xem chú thích, không bấm nút chứa nó
  {const t0=e.target.closest('.chip[data-tip],.gl[data-tip]');if(t0){e.preventDefault();showTip(t0,false,e.clientX||e.clientY?[e.clientX,e.clientY]:null);return;}}
  const el=e.target.closest('[data-act]');
  if(!el&&UI.dd){UI.dd=null;render();}
  if(!el){const t=e.target.closest('[data-tip]');if(t){showTip(t,true,e.clientX||e.clientY?[e.clientX,e.clientY]:null);}else hideTip();return;}
  if(el.disabled)return;
  const a=el.dataset.act;const f=ACT[a];if(!f)return;
  if(!KEEP_CONFIRM[a])UI.confirm=null;
  if(a!=='burnOpen'&&a!=='burn')UI.burnOpen=false;
  if(a!=='ddOpen'&&!/^bag(Tab|Pham|Sort)$|^affCat$/.test(a))UI.dd=null;
  try{f(el.dataset.arg,el);}catch(err){console.error(err);note('Có lỗi: '+err.message);}
  after();
},true);
// ô chọn dạng thả xuống (bộ lọc túi đồ): đổi giá trị thì gọi đúng hành động
document.addEventListener('change',e=>{const el=e.target.closest&&e.target.closest('select[data-chg]');if(!el)return;const f=ACT[el.dataset.chg];if(!f)return;try{f(el.value,el);}catch(err){console.error(err);}after();});
document.addEventListener('change',e=>{if(e.target.id==='bqR'&&UI.modal&&UI.modal.k==='bq'){const y=+e.target.value;const c=bqCapY();UI.modal.y=y;UI.modal.ok=0;if(c!=null&&y>c){UI.modal.warn=1;render();}}});
document.addEventListener('input',e=>{if(e.target.id==='bqR'&&UI.modal&&UI.modal.k==='bq'){const y=+e.target.value;UI.modal.y=y;bqUpd(y);HCACHE.modal=null;}});
