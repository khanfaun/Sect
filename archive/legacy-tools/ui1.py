import sys
s=open('phu-sinh.html',encoding='utf-8').read()
a=s.index('// ---------- các cảnh ----------'); b=s.index('// ---------- màn hình ngoài ----------')
s=s[:a]+open('build/ui_views.js',encoding='utf-8').read()+'\n'+s[b:]
def rep(x,y,c=1):
    global s
    n=s.count(x)
    if n!=c: sys.exit(f'!! {n}: {x[:80]}')
    s=s.replace(x,y)
rep("goBtn('screen','Quay lại',G.run?'run':'meta')","goBtn('screen','Quay lại',G.run?'map':'meta')")
rep("""  top.innerHTML=(G.screen==='run'&&G.run)?topBar():'';
  top.hidden=!(G.screen==='run'&&G.run);""","""  top.innerHTML=(G.screen==='map'&&G.run)?topBar():'';
  top.hidden=!(G.screen==='map'&&G.run);""")
rep("""    else if(G.run){const sc=G.run.scene;
      h=({region:vRegion,path:vPath,event:vEvent,enc:vEnc,boss:vBoss,combat:vCombat,reward:vReward,shop:vShop,rest:vRest,swap:vSwap,regionEnd:vRegionEnd}[sc.type]||(()=>''))(sc);}""","""    else if(G.run){const sc=G.run.scene;
      h=sc?({region:vRegion,event:vEvent,enc:vEnc,boss:vBoss,combat:vCombat,reward:vReward,shop:vShop,swap:vSwap,place:vPlace,pass:vPass}[sc.type]||(typeof sceneView==='function'?sceneView:(()=>'')))(sc):vMap();}""")
rep("""  resume:()=>{G.screen='run';},
  screen:a=>{UI.sheet=null;UI.tab=null;if(a==='run'){G.screen=G.run?'run':'title';}else{G.screen=a;}if(a==='meta')G.over=null;},
  regionGo:()=>regionGo(),
  path:i=>choosePath(+i),
  choose:i=>choose(+i),
  next:()=>nextNode(),""","""  resume:()=>{G.screen='map';},
  screen:a=>{UI.sheet=null;UI.tab=null;if(a==='map'){G.screen=G.run?'map':'title';}else{G.screen=a;}if(a==='meta')G.over=null;},
  regionGo:()=>{G.run.scene=null;UI.vx=null;},
  choose:i=>choose(+i),
  next:()=>endScene(),
  pact:a=>{if(a==='quyan'&&UI.confirm!=='quyan'){UI.confirm='quyan';return;}UI.confirm=null;placeAct(a);},
  leave:()=>leavePlace(),
  pass:a=>passAct(a),
  sel:id=>{UI.sel=+id;},
  go:id=>{if(travelTo(+id)){UI.paused=false;}},
  enter:()=>{openPlace(G.run.at);},
  stop:()=>stopTravel(),
  speed:v=>{v=+v;if(!v)UI.paused=!UI.paused;else{UI.paused=false;UI.speed=v;}},
  wait:k=>{const h=tHour(W().t);const tgt=k==='sang'?5:17;let d=(tgt-h+24)%24;if(d<0.01)d=24;advanceTime(d);if(G.run)autoCheck();},
  zoom:d=>{const z0=UI.z||1;const z=clamp(z0*(+d>0?1.5:1/1.5),1,4);const w0=1000/z0,w1=1000/z;UI.vx+=(w0-w1)/2;UI.vy+=(w0-w1)/2;UI.z=z;},
  center:()=>{UI.vx=null;},""")
rep("""  rest:a=>{if(a==='quyan'&&UI.confirm!=='quyan'){UI.confirm='quyan';return;}UI.confirm=null;restAct(a);},
  restGo:()=>restContinue(),
""","")
rep("  nextReg:()=>nextRegion(),\n","")
rep("if(a!=='rest'&&a!=='wipe')UI.confirm=null;","if(a!=='pact'&&a!=='wipe')UI.confirm=null;")
rep("const KEY='phusinh_save_v1';","const KEY='phusinh2_save_v1';")
rep("function snapshot(){return {v:1,","function snapshot(){return {v:SAVE_V,")
rep("""function loadData(d){if(!d||!d.meta)throw new Error('bad');""","""// điền giá trị mặc định cho trường mới; mỗi lần chỉnh sửa tăng SAVE_V và thêm một bước ở đây
function migrate(d){
  if(!d||!d.meta||!d.meta.world||!d.meta.world.regions)throw new Error('bad');
  d.v=d.v||1;
  if(d.run&&d.run.scene&&d.run.scene.type==='combat'&&d.run.scene.dodge)d.run.scene.dodge=null;
  if(typeof migrateX==='function')migrateX(d);
  d.v=SAVE_V;d.meta.v=SAVE_V;
  return d;
}
function loadData(d){d=migrate(d);""")
rep("if(G.screen==='run'&&!G.run)G.screen='title';","if((G.screen==='map'||G.screen==='run')&&!G.run)G.screen='title';if(G.screen==='run')G.screen='map';")
# thanh trạng thái: ngày giờ
rep("""  return `<div class="bar"><div class="realm"${ta(realmTip())}>${esc(realmLabel())}</div>""","""  const t=W().t,pa=PART[partOf(t)];
  return `<div class="date"${ta(dateText(t)+'\\nBuổi '+pa.n+', mùa '+SEASON[seasonOf(t)]+'\\n'+tDayText(t))}><span>${pa.i}</span> <span id="clock">${esc(dateText(t))}</span>${UI.paused?' <i>(dừng)</i>':''}</div>
  <div class="bar"><div class="realm"${ta(realmTip())}>${esc(realmLabel())}</div>""")
rep("""function topBar(){""","""function tDayText(t){return 'Ngày '+(Math.floor((t%HM)/HD)+1)+' trong tháng';}
function topBar(){""")
# bảng thiên kiêu
rep("<p class=\"hint\">Công bố năm ngươi ${r.bang.nam} tuổi</p>","<p class=\"hint\">Công bố năm ${r.bang.y||''}, khi ngươi ${r.bang.nam} tuổi</p>")
# vẽ lại & đồng hồ
rep("""let lastSceneKey='';""","""let lastSceneKey='';
// ---------- đồng hồ chạy ngầm ----------
function clockOn(){return G.screen==='map'&&G.run&&!G.run.scene&&!UI.sheet&&!UI.paused&&!document.hidden;}
let clkLast=performance.now(),clkAcc=0,clkFlush=0,clkSaveT=0;
function clockLoop(now){
  let dt=Math.min(1,(now-clkLast)/1000);clkLast=now;
  if(clockOn()&&!UI.drag){
    clkAcc+=dt;
    if(now-clkFlush>=250){clkFlush=now;const r=G.run;const sp=UI.speed||1;const hrs=clkAcc*sp;clkAcc=0;
      try{
        let redraw=false;
        if(r.moving){redraw=travelTick(hrs*Math.max(sp,6)/sp*1)||true;}
        else{advanceTime(hrs);if(G.run)autoCheck();}
        if(!G.run||G.run.scene||G.screen!=='map'){after();}
        else if(redraw){render();}
        else{const c=$('#clock');if(c)c.textContent=dateText(W().t);}
        if(G.run&&W().t-clkSaveT>=30){clkSaveT=W().t;saveSoon();}
      }catch(e){console.error(e);}
    }
  } else clkAcc=0;
  requestAnimationFrame(clockLoop);
}
document.addEventListener('visibilitychange',()=>{clkLast=performance.now();clkAcc=0;});
// kéo bản đồ
document.addEventListener('pointerdown',e=>{const m=e.target.closest('#map');if(!m)return;UI.drag={x:e.clientX,y:e.clientY,vx:UI.vx,vy:UI.vy,moved:false,w:m.getBoundingClientRect().width};});
document.addEventListener('pointermove',e=>{const d=UI.drag;if(!d)return;const dx=e.clientX-d.x,dy=e.clientY-d.y;if(Math.abs(dx)+Math.abs(dy)>6)d.moved=true;if(!d.moved)return;const k=(1000/(UI.z||1))/d.w;UI.vx=d.vx-dx*k;UI.vy=d.vy-dy*k;const v=mapView();const m=$('#map');if(m)m.setAttribute('viewBox',v.join(' '));});
['pointerup','pointercancel'].forEach(t=>document.addEventListener(t,()=>{const d=UI.drag;if(d&&d.moved)UI.suppress=true;UI.drag=null;}));""")
rep("""  render();
  initDB();
})();""","""  render();
  initDB();
  requestAnimationFrame(clockLoop);
})();""")
rep("if(key!==lastSceneKey&&!(sc&&sc.type==='combat'))","if(key!==lastSceneKey&&!(sc&&sc.type==='combat')&&sc)")
# CSS bản đồ
rep("#tip{position:fixed;","""/* bản đồ */
.date{font-size:.82rem;color:var(--ink2);padding:0 0 2px;cursor:help}.date i{color:var(--red);font-style:normal}
.mapw{position:relative;margin:8px -22px 0;background:var(--bg2)}
#map{display:block;width:100%;height:min(66vh,118vw);touch-action:none;user-select:none;-webkit-user-select:none}
#map .nd{cursor:pointer}#map .nd.rum{opacity:.7}#map .nd.old{opacity:.5}#map .nd.sel circle{stroke:var(--red)}
#map .ni{font-size:26px}#map .nn{font:600 22px var(--disp);fill:var(--ink);paint-order:stroke;stroke:var(--paper);stroke-width:5px}
.mctl{position:absolute;left:8px;top:8px;display:flex;gap:4px;flex-wrap:wrap}
.mzoom{position:absolute;right:8px;top:8px;display:flex;flex-direction:column;gap:4px}
.mstop{position:absolute;left:50%;bottom:10px;transform:translateX(-50%)}
.mb{min-width:38px;height:36px;padding:0 9px;border:0;border-radius:999px;background:var(--paper);box-shadow:inset 0 0 0 1px var(--gold2);font-size:.9rem}
.mb.on{background:var(--gold);color:var(--paper)}.mb:disabled{opacity:.4}
.ncard{display:flex;align-items:center;gap:10px;padding:12px 2px;border-bottom:1px solid var(--line);min-height:64px}
.ncard.hint{color:var(--ink3);font-size:.9rem}
.nc-t{flex:1;display:flex;flex-direction:column;line-height:1.3}.nc-t b{font:600 1.2rem var(--disp)}.nc-t small{color:var(--ink2);font-size:.82rem}
.nc-b{display:flex;align-items:center;gap:8px;flex-wrap:wrap;justify-content:flex-end}
.go.sm{padding:5px 18px;font-size:1rem}
#tip{position:fixed;""")
rep("#top,.banner,.title{margin-left:-18px;margin-right:-18px}","#top,.banner,.title,.mapw{margin-left:-18px;margin-right:-18px}")
open('phu-sinh.html','w',encoding='utf-8').write(s)
print('ok')
