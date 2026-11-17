// ---------- các cảnh ----------
function vRegion(sc){const r=G.run;return banner(REG[r.region].n,r.region,T(REG[r.region].sub,{quoc:G.meta.world.quoc}))+`<div class="story"><p class="new">${esc(sc.text)}</p>${sc.sub?`<p class="hint">${esc(sc.sub)}</p>`:''}</div>`+goBtn('regionGo','Lên đường');}
function choiceExtra(c){
  let x='';const r=G.run;
  if(c.cost){if(c.cost.st)x+=`<span class="cx${r.st<Math.round(c.cost.st*SC[r.region])?' no':''}"${ta('Tốn linh thạch')}>💎${Math.round(c.cost.st*SC[r.region])}</span>`;if(c.cost.mp)x+=`<span class="cx"${ta('Tốn linh lực')}>💧${c.cost.mp}</span>`;if(c.cost.hp)x+=`<span class="cx"${ta('Tốn khí huyết')}>❤️${c.cost.hp}</span>`;}
  if(c.chk){const p=Math.round(chkChance(c.chk)*100);x+=`<span class="cx chk"${ta('Phép thử '+CHKN[c.chk[0]]+'\nCơ hội thành công '+p+'%')}>${CHKI[c.chk[0]]}${p}%</span>`;}
  if(c.fight)x+=`<span class="cx"${ta('Sẽ phải giao chiến'+(c.fight.spar?' (luận võ, thua không chết)':''))}>⚔️</span>`;
  return x;
}
function vEvent(sc){
  const r=G.run;let h=banner(r.place.n,r.region,EVMAP[sc.id]&&EVMAP[sc.id].n)+`<div class="story">${storyHTML(sc.story)}</div>`;
  if(sc.news)h+=`<p class="news"${ta('Tin đồn giang hồ')}>🍃 ${esc(sc.news)}</p>`;
  h+=chipsHTML(sc.chips);
  if(sc.phase==='choose'){h+='<div class="choices">';for(const {c,i} of visChoices(sc)){const ok=costOk(c.cost);h+=`<button class="ch" data-act="choose" data-arg="${i}"${ok?'':' disabled'}><span class="ci">${c.i||'•'}</span><span class="ct">${esc(T(c.l,sc.v))}</span>${choiceExtra(c)}</button>`;}h+='</div>';}
  else h+=goBtn('next','Tiếp tục');
  return h;
}
function vEnc(sc){
  const r=G.run,en=sc.en;let h=banner(r.place.n,r.region,sc.elite?'Hung địa':'Giao chiến')+foeCard(en,false)+`<div class="story"><p class="new">${esc(sc.text)}</p>${sc.res?`<p class="new">${esc(sc.res)}</p>`:''}</div>`;
  if(sc.done)return h+chipsHTML(sc.paid?[chip('💎','−'+sc.paid,'Linh thạch','dn')]:[])+goBtn('next','Tiếp tục');
  const p=Math.round(encSneak(sc)*100);const pay=Math.round(12*SC[r.region]);
  h+=`<div class="choices"><button class="ch" data-act="enc" data-arg="fight"><span class="ci">⚔️</span><span class="ct">Xuất thủ</span></button>
  <button class="ch" data-act="enc" data-arg="sneak"><span class="ci">🌀</span><span class="ct">Lẩn tránh</span><span class="cx chk"${ta('Thân pháp\nThất bại thì vẫn phải đánh')}>🌀${p}%</span></button>`;
  if(en.f==='nhan'&&!sc.elite)h+=`<button class="ch" data-act="enc" data-arg="pay"${r.st<pay?' disabled':''}><span class="ci">💎</span><span class="ct">Nộp tiền mãi lộ</span><span class="cx">💎${pay}</span></button>`;
  return h+'</div>';
}
function foeCard(en,live,sc){
  const it=live&&en.intent?INTENT[en.intent]:null;const pv=live?intentPreview(sc):'';
  return `<section class="foe"><div class="foe-ic${en.boss?' boss':''}${en.elite?' elite':''}">${en.i}${it?`<span class="intent"${ta('Lượt tới: '+it.n+(pv?'\nƯớc tính '+pv+' sát thương':''))}>${it.i}${pv?' '+pv:''}</span>`:''}</div>
   <div class="foe-n">${esc(en.n)}</div><div class="foe-sub">${elSeal(en.el)} ${esc(en.sub||'')}</div>
   ${live?`<div class="foe-hp">${bar(Math.max(0,en.hp),en.max,'hp')}<span>${Math.max(0,en.hp)}/${en.max}</span></div>${stIcons(en.st)}`:''}</section>`;
}
function vBoss(sc){const r=G.run;return banner(r.place.n,r.region,'Sào huyệt')+`<section class="foe"><div class="foe-ic boss">${sc.b.i}</div><div class="foe-n">${esc(sc.b.n)}</div></section><div class="story"><p class="new">${esc(sc.text)}</p></div>`+goBtn('bossFight','Nghênh chiến');}
function vCombat(sc){
  const r=G.run,s=S(),en=sc.en;
  let h=`<div class="combat">`+foeCard(en,!sc.done,sc);
  const lg=sc.log.slice(-5);
  h+=`<div class="clog">${lg.map((l,i)=>`<p class="${l.c} ${i<lg.length-1?'old':''}">${esc(l.t)}</p>`).join('')}</div>`;
  h+=`<section class="me"><div class="me-row"><span${ta('Khí huyết')}>❤️</span>${bar(r.hp,s.maxHp,'hp')}<b>${r.hp}</b></div><div class="me-row"><span${ta('Linh lực')}>💧</span>${bar(r.mp,s.maxMp,'mp')}<b>${r.mp}</b></div>${stIcons(sc.ps)}</section>`;
  if(sc.done){
    const t={win:'Thắng',lose:'Thua trận',flee:'Thoát thân',dead:'Ngươi đã ngã xuống'}[sc.over];
    return h+`<p class="cres ${sc.over}">${t}</p>`+goBtn('cont','Tiếp tục')+'</div>';
  }
  h+='<div class="skills">';
  const btn=(id,sk,lv)=>{const c=skillCost(sk);const no=r.mp<c;return `<button class="sk" data-act="skill" data-arg="${id}"${no?' disabled':''}${ta(id==='_atk'?'Đánh thường bằng chân khí\nKhông tốn linh lực':skillTip(sk,lv))}>${elSeal(sk.el)}<span class="sn">${esc(sk.n)}${lv>1?' <i>'+'Ⅰ Ⅱ Ⅲ'.split(' ')[lv-1]+'</i>':''}</span><small>${c?'💧'+c:''}</small></button>`;};
  h+=btn('_atk',BASIC,1);
  for(const k of r.skills)h+=btn(k.id,SK[k.id],k.lv);
  h+='</div>';
  const cp=r.pills.map((p,i)=>({p,i})).filter(x=>PILL[x.p.id].w!=='bt');
  h+=`<div class="acts"><button data-act="guard"${ta('Vận khí thủ thế\nĐược hộ thể và hồi 30% linh lực')}>🛡️ Vận khí</button>
   <button data-act="tray"${cp.length?'':' disabled'}${ta('Dùng đan dược, phù lục')}>⚗️ Đan <i>${cp.length}</i></button>
   ${sc.boss?'':`<button data-act="flee"${ta('Bỏ chạy\nThành công dựa vào thân pháp')}>🏃 Thoát</button>`}</div>`;
  if(UI.pillTray&&cp.length)h+=`<div class="tray">${cp.map(({p,i})=>`<button data-act="cpill" data-arg="${i}"${ta(pillTip(p.id,p.q))}>${PILL[p.id].i} ${esc(PILL[p.id].n)}</button>`).join('')}</div>`;
  return h+'</div>';
}
function pickHTML(p,i,taken){
  let ic,n,sub,tip;
  if(p.k==='relic'){ic='🏺';n=p.rel.name;sub=GRADE[p.rel.tier];tip=relicTip(p.rel);}
  else if(p.k==='skill'){const sk=SK[p.id];const h=G.run.skills.find(x=>x.id===p.id);ic=elSeal(sk.el);n=sk.n;sub=h?'Tinh thông thêm một bậc':'Pháp thuật bậc '+sk.t;tip=skillTip(sk,h?h.lv+1:1);}
  else if(p.k==='pill'){ic=PILL[p.id].i;n=(p.q?PQ[p.q]+' ':'')+PILL[p.id].n;sub=PILL[p.id].d.replace('{x}',pillX(p.id,p.q));tip=pillTip(p.id,p.q);}
  else {ic='💎';n=p.n+' linh thạch';sub='';tip='';}
  const cls=taken===i?' taken':taken>=0?' dim':'';
  return `<button class="pick${cls}" data-act="pick" data-arg="${i}"${taken>=0?' disabled':''}${ta(tip)}><span class="pk-i">${ic}</span><span class="pk-t"><b>${esc(n)}</b><small>${esc(sub)}</small></span></button>`;
}
function vReward(sc){
  const r=G.run;let h=banner(r.place.n,r.region,sc.kind==='boss'?'Chiến thắng':'Chiến lợi phẩm',true)+`<div class="story"><p class="new">${esc(sc.text)}</p></div>`+chipsHTML(sc.chips);
  if(sc.picks.length){h+=`<p class="hint">${sc.taken<0?'Chọn một':'Đã chọn'}</p><div class="picks">${sc.picks.map((p,i)=>pickHTML(p,i,sc.taken)).join('')}</div>`;}
  return h+goBtn('rcont',sc.picks.length&&sc.taken<0?'Bỏ qua':'Tiếp tục');
}
function vShop(sc){
  const r=G.run;let h=banner(r.place.n,r.region,'Phường thị',true)+`<div class="story"><p class="new">${esc(sc.text)}</p></div><div class="shop">`;
  sc.items.forEach((it,i)=>{let ic,n,tip,sub;
    if(it.k==='pill'){ic=PILL[it.id].i;n=(it.q?PQ[it.q]+' ':'')+PILL[it.id].n;tip=pillTip(it.id,it.q);sub=PILL[it.id].d.replace('{x}',pillX(it.id,it.q));}
    else if(it.k==='skill'){const sk=SK[it.id];ic=elSeal(sk.el);n=sk.n;tip=skillTip(sk,1);sub='Bí tịch bậc '+sk.t;}
    else if(it.k==='pass'){ic='🎫';n=it.n;tip='Trình ở quan ải để sang '+REG[it.reg].n;sub='Đồ đấu giá';}
    else {ic='🏺';n=it.rel.name;tip=relicTip(it.rel);sub=GRADE[it.rel.tier];}
    const no=it.sold||r.st<it.p;
    h+=`<button class="srow${it.sold?' sold':''}" data-act="buy" data-arg="${i}"${no?' disabled':''}${ta(tip)}><span class="pk-i">${ic}</span><span class="pk-t"><b>${esc(n)}</b><small>${esc(sub)}</small></span><span class="price">${it.sold?'✓':'💎'+it.p}</span></button>`;});
  h+=`<button class="srow" data-act="heal"${sc.healed||r.st<sc.heal?' disabled':''}${ta('Hồi đầy khí huyết và linh lực')}><span class="pk-i">🩹</span><span class="pk-t"><b>Mời y sư trị thương</b><small>Hồi đầy</small></span><span class="price">${sc.healed?'✓':'💎'+sc.heal}</span></button></div>`;
  return h+goBtn('next','Rời đi');
}
function vSwap(sc){
  const r=G.run,sk=SK[sc.id];
  let h=`<div class="story pad"><p>Ngươi lĩnh ngộ được <b${ta(skillTip(sk,1))}>${esc(sk.n)}</b>. Nhưng tâm trí chỉ chứa nổi bốn môn. Quên đi môn nào?</p></div><div class="choices">`;
  r.skills.forEach((k,i)=>{const s0=SK[k.id];h+=`<button class="ch" data-act="swap" data-arg="${i}"${ta(skillTip(s0,k.lv))}><span class="ci">${elSeal(s0.el)}</span><span class="ct">${esc(s0.n)}</span><span class="cx">quên</span></button>`;});
  return h+`<button class="ch soft" data-act="swap" data-arg="-1"><span class="ci">✋</span><span class="ct">Không học ${esc(sk.n)}</span></button></div>`;
}
function vPlace(sc){
  const r=G.run,n=nodeById(sc.id);
  let h=banner(n.name,r.region,TYPE_NAME[n.type]+' · '+DANGER[n.danger])+`<div class="story"><p>${esc(sc.intro)}</p>${sc.msg.map(m=>`<p class="new">${esc(m)}</p>`).join('')}</div>`+chipsHTML(sc.chips);
  h+='<div class="choices">';
  for(const a of placeActs(n)){
    const qa=a.a==='quyan'&&UI.confirm==='quyan';
    const x=(a.x?`<span class="cx">${esc(a.x)}</span>`:'')+(a.h?`<span class="cx"${ta('Thời gian sẽ trôi qua')}>⏳${durH(a.h)}</span>`:'');
    h+=`<button class="ch${a.a==='bt'?' hl':''}${a.a==='quyan'?' soft':''}" data-act="pact" data-arg="${a.a}"${a.dis?' disabled':''}${ta(a.tip)}><span class="ci">${a.i}</span><span class="ct">${esc(qa?'Chắc chắn gác kiếm? Kiếp này sẽ kết thúc':a.l)}</span>${x}</button>`;
  }
  return h+'</div>'+goBtn('leave','Ra bản đồ');
}
function vPass(sc){
  const r=G.run;let h=banner(r.place.n,r.region,'Quan ải → '+REG[sc.k].n)+`<div class="story"><p class="new">${esc(sc.text)}</p><p class="hint">Qua ải mất khoảng ${CROSS_M[sc.k]} tháng đường.</p></div><div class="choices">`;
  for(const o of passOpts())h+=`<button class="ch" data-act="pass" data-arg="${o.a}"${o.ok?'':' disabled'}${ta(o.tip)}><span class="ci">${o.i}</span><span class="ct">${esc(o.l)}</span>${o.x?`<span class="cx">${o.x}</span>`:''}</button>`;
  return h+'</div>'+goBtn('next','Quay lại');
}

// ---------- bản đồ ----------
function mapView(){
  const r=G.run;const X0=r.region*1000;const z=UI.z||1;const w=1000/z;
  if(UI.vreg!==r.region||UI.vx==null){const [px,py]=playerXY();UI.vx=px-w/2;UI.vy=py-w/2;UI.vreg=r.region;}
  UI.vx=clamp(UI.vx,X0-w*0.25,X0+1000-w*0.75);UI.vy=clamp(UI.vy,-w*0.25,1000-w*0.75);
  return [UI.vx,UI.vy,w,w];
}
function mapSVG(){
  const r=G.run,w=W(),R0=regionOf(r.region),X0=r.region*1000,tint=REG[r.region].tint;
  const [vx,vy,vw,vh]=mapView();
  let s=`<svg id="map" viewBox="${vx} ${vy} ${vw} ${vh}" preserveAspectRatio="xMidYMid meet"><defs>
   <radialGradient id="fogg"><stop offset=".55" stop-color="#000"/><stop offset="1" stop-color="#fff"/></radialGradient>
   <mask id="fogm" maskUnits="userSpaceOnUse" x="${X0-500}" y="-500" width="2000" height="2000"><rect x="${X0-500}" y="-500" width="2000" height="2000" fill="#fff"/>${r.reveal.filter(c=>c[0]>=X0-200&&c[0]<X0+1200).map(c=>`<circle cx="${c[0]}" cy="${c[1]}" r="${c[2]}" fill="url(#fogg)"/>`).join('')}</mask></defs>
   <rect x="${X0-500}" y="-500" width="2000" height="2000" fill="var(--paper)"/>`;
  for(const t of R0.terr){
    if(t.k==='m')s+=`<path d="M${t.x-t.s} ${t.y+t.s*0.5} L${t.x} ${t.y-t.s*0.6} L${t.x+t.s} ${t.y+t.s*0.5} Z M${t.x-t.s*0.4} ${t.y+t.s*0.5} L${t.x+t.s*0.25} ${t.y-t.s*0.15} L${t.x+t.s*0.7} ${t.y+t.s*0.5}" fill="${tint[0]}" opacity=".55" stroke="${tint[2]}" stroke-width="2"/>`;
    else s+=`<path d="M${t.p.map(p=>p.join(' ')).join(' L')}" fill="none" stroke="var(--blue)" stroke-width="7" opacity=".28" stroke-linecap="round" stroke-linejoin="round"/>`;
  }
  s+=`<rect x="${X0-500}" y="-500" width="2000" height="2000" fill="var(--bg2)" mask="url(#fogm)" opacity=".96"/>`;
  s+=`<rect x="${X0}" y="0" width="1000" height="1000" fill="none" stroke="var(--line)" stroke-width="3" stroke-dasharray="14 10"/>`;
  const vis=n=>n.fog>=2;
  for(const e of R0.edges){const a=nodeById(e.a),b=nodeById(e.b);if(!vis(a)||!vis(b))continue;s+=`<line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" stroke="var(--ink2)" stroke-width="3" opacity=".55" stroke-dasharray="2 7" stroke-linecap="round"/>`;}
  if(r.moving){const m=r.moving;let d='';for(let i=m.seg;i<m.path.length;i++){const n=nodeById(m.path[i]);d+=(d?' L':'M')+(i===m.seg?playerXY().join(' '):n.x+' '+n.y);}s+=`<path d="${d}" fill="none" stroke="var(--red)" stroke-width="3" opacity=".6"/>`;}
  for(const n of R0.nodes){
    if(n.fog<1)continue; // điểm chưa biết: không vẽ gì
    const [x,y]=nodeShown(n);const sure=n.fog>=2||n.memory;const old=n.fog>=2&&n.seenT>=0&&w.t-n.seenT>HY;
    const sel=UI.sel===n.id;const ruin=(n.vstate||'ok')==='ruin'&&n.fog>=2;
    s+=`<g class="nd${sure?'':' rum'}${old||n.memory?' old':''}${sel?' sel':''}" data-act="sel" data-arg="${n.id}" transform="translate(${x} ${y})">
      <circle r="26" fill="var(--paper)" stroke="${n.dp?'var(--jade)':'var(--gold)'}" stroke-width="${sel?5:3}"${sure?'':' stroke-dasharray="6 5"'}/>
      <text class="ni" y="10" text-anchor="middle">${n.fog>=2||n.memory?(ruin?'🔥':NODE_IC[n.type]):'❔'}</text>
      <text class="nn" y="50" text-anchor="middle">${esc(n.name+(sure?'':'?'))}</text>${old?`<text class="nn" y="72" text-anchor="middle" font-size="18">tin cũ</text>`:''}</g>`;
  }
  if(typeof entsSVG==='function')s+=entsSVG();
  const [px,py]=playerXY();
  s+=`<g id="me" transform="translate(${px} ${py})"><rect x="-15" y="-15" width="30" height="30" rx="3" fill="var(--red)" transform="rotate(-6)"/><text y="9" text-anchor="middle" fill="#F8EBD6" font-size="22">我</text></g>`;
  return s+'</svg>';
}
function nodeCard(){
  const r=G.run;const n=UI.sel!=null&&nodeById(UI.sel);
  if(!n||n.fog<1||Math.floor(n.id/100)!==r.region)return `<div class="ncard hint">Chạm vào một điểm trên bản đồ để xem.</div>`;
  const sure=n.fog>=2||n.memory;const here=n.id===r.at&&!r.moving;
  let info=`${TYPE_NAME[n.type]}${sure?'':' (nghe đồn)'} · ${DANGER[nodeDanger(n)]}${n.fog>=2||n.memory?'':'?'}`;
  if(n.fog>=3&&n.dp)info+=' · có động phủ';
  if(n.memory)info+=' · ký ức kiếp trước';
  if((n.vstate||'ok')==='ruin'&&n.fog>=2)info+=' · hoang tàn';
  if(n.fog>=2&&W().t-n.seenT>HY)info+=' · tin cũ';
  let btn='';
  if(here)btn=`<button class="go sm" data-act="enter">Vào</button>`;
  else{let p=null;const m=r.moving;const st=m&&m.seg<m.path.length-1?m.path[m.seg+1]:r.at;p=findPath(st,n.id)||(n.id===st?[st]:null);
    if(p){const L=Math.round(pathLen(p));btn=`<span class="cx">${L} dặm · ${durH(L/walkSpeed())}</span><button class="go sm" data-act="go" data-arg="${n.id}">Đi tới</button>`;}}
  return `<div class="ncard"><div class="nc-t"><b>${esc(n.name+(sure?'':'?'))}</b><small>${esc(info)}</small></div><div class="nc-b">${btn}</div></div>`;
}
function vMap(){
  const r=G.run;const sp=UI.speed||1;
  const B=(act,arg,lab,tip,on,dis)=>`<button class="mb${on?' on':''}" data-act="${act}"${arg!=null?` data-arg="${arg}"`:''}${dis?' disabled':''}${ta(tip)}>${lab}</button>`;
  return `<div class="mapw"><div id="mapbox">${mapSVG()}</div>
   <div class="mctl">${B('speed',0,'⏸','Tạm dừng',UI.paused)}${B('speed',1,'×1','1 giây = 1 giờ',!UI.paused&&sp===1)}${B('speed',12,'×12','Chờ nhanh',!UI.paused&&sp===12)}${B('wait','sang','🌅','Chờ tới sáng',0,!!r.moving)}${B('wait','toi','🌇','Chờ tới tối',0,!!r.moving)}</div>
   <div class="mzoom">${B('zoom',1,'＋','Phóng to')}${B('zoom',-1,'－','Thu nhỏ')}${B('center',null,'◎','Về chỗ ngươi')}</div>
   ${r.moving?`<div class="mstop">${B('stop',null,'✋ Dừng','Dừng lại giữa đường')}</div>`:''}</div>${nodeCard()}`;
}
