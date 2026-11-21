// Đ4: hành động của khung tân thủ (luật ở core2/40-tan-thu.js; giao diện src/react/chung/TanThu.jsx)
ACT.tutHide=()=>{const r=G.run;if(r&&r.tut)r.tut.hide=r.tut.hide?0:1;};
ACT.tutClaim=id=>{const t=tutById(id);const rw=t?tutRwList(t.rw):[];const ch=tutClaim(id);if(ch){UI.modal=null;note(contentText('tut.nhan',[rw.join(', ')||t.n]),'up');}};
ACT.tutSkip=id=>{if(tutById(id))UI.modal={k:'tutSkip',id};};
ACT.tutSkipGo=id=>{UI.modal=null;tutSkip(id);};
ACT.wishOpen=()=>{UI.modal={k:'wish'};};
ACT.wishSet=id=>{if(wishSet(id))UI.modal=null;};
// tìm nút gần nhất đã thấy có loại hợp (và có hành động act nếu cần)
function tutFindNode(go){const r=G.run,w=W();const me=nodeById(r.at);const [x0,y0]=me?[me.x,me.y]:[0,0];
  const has=(n,a)=>{try{return placeActs(n).some(x=>x.a===a);}catch(e){return false;}};
  const all=w.regions.flatMap(R0=>R0.nodes).filter(n=>n.fog>=1);
  const pick=L=>L.sort((a,b)=>Math.hypot(a.x-x0,a.y-y0)-Math.hypot(b.x-x0,b.y-y0))[0]||null;
  const okT=n=>go.place==='*'||!Array.isArray(go.place)||go.place.includes(n.type);
  let L=all.filter(n=>okT(n)&&(!go.act||has(n,go.act))&&(go.act||n.id!==r.at));
  if(!L.length&&go.act)L=all.filter(n=>has(n,go.act));
  return pick(L);}
ACT.tutGo=id=>{const t=tutById(id),r=G.run;if(!t||!r)return;const go=t.go||{};const sc=r.scene;
  if(sc&&(sc.type==='combat'||sc.type==='event'||sc.type==='enc'||sc.type==='ky'||sc.type==='kyngo')){note(contentText('tut.ban'));return;}
  dbg('tut.go',{id});
  if(go.panel){UI.modal=null;UI.panel=go.panel;if(go.tab)UI.tab[go.panel]=go.tab;return;}
  if(go.modal==='bag'){UI.modal=null;ACT.bagOpen();return;}
  if(go.modal){UI.modal={k:go.modal};return;}
  if(go.hud&&ACT[go.hud]){UI.panel=null;ACT[go.hud]();return;}
  if(go.place){const n=tutFindNode(go);if(!n){note(contentText('tut.khongNoi'));return;}
    if(sc&&sc.type==='place'&&sc.id===n.id){}else{if(sc&&sc.type==='place')r.scene=null;ACT.noteGo(n.id);}
    if(go.act)UI.tutFlash={sel:'[data-act="pact"][data-arg="'+go.act+'"]',until:Date.now()+3000};}};
// đếm các việc chỉ xảy ra ở giao diện (mở bảng, mở túi, xem sổ nghiệp duyên, mở Mưu sinh), và nhấp nháy nút được dẫn tới
{const _rd=render;render=function(){try{if(G.run&&G.run.tut&&G.screen==='map'){
    if(UI.panel==='char'){tutTick('panel:char');if(UI.tab.char==='bag')tutTick('bag');}
    if(UI.panel==='journal'&&UI.tab.journal==='nq')tutTick('nqlog');
    if(UI.modal&&UI.modal.k==='muusinh')tutTick('jobs.open');}}catch(e){}
  const res=_rd.apply(this,arguments);
  const f=UI.tutFlash;if(f){if(Date.now()>f.until)UI.tutFlash=null;else try{document.querySelectorAll(f.sel).forEach(e=>e.classList.add('tut-flash'));}catch(e){}}
  return res;};}
// chạm dòng có data-tut (vd. Linh căn) → đếm
{const _st=showTip;showTip=function(el){try{const k=el&&el.closest&&el.closest('[data-tut]');if(k&&k.dataset.tut)tutTick(k.dataset.tut);}catch(e){}return _st.apply(this,arguments);};}
