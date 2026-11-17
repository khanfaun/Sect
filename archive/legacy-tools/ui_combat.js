function unitTile(sc,u,pickMode){
  const dead=u.hp<=0&&!u.immune;const me=u.isMain;
  const it=u.side==='B'&&u.intent&&!u.immune&&!dead?INTENT[u.intent]:null;const pv=it?intentPreview(u):'';
  const tgt=pickMode&&u.side==='B'&&!dead&&!u.immune;
  const ph=u.phase==='charge'?'<span class="ph"'+ta('Đang tụ lực, chờ đối phương ra tay')+'>⏳</span>':u.stunT>0?'<span class="ph">💫</span>':'';
  return `<div class="ut${dead?' dead':''}${me?' me':''}${tgt?' tg':''}${sc.cur===u.id?' cur':''}"${tgt?` data-act="tgt" data-arg="${u.id}"`:''}${ta(u.name+(u.sub?'\n'+u.sub:'')+(u.immune?'':'\nKhí huyết '+Math.max(0,u.hp)+'/'+u.max))}>
   <div class="ui-c">${u.icon}${ph}${it?`<span class="intent"${ta('Sắp tới: '+it.n+(pv?'\nƯớc tính '+pv+' sát thương':''))}>${it.i}${pv?' '+pv:''}</span>`:''}${me&&sc.dodge?`<span class="ring" style="animation-duration:${sc.dodge.T}s;animation-iteration-count:${sc.dodge.n}"></span>`:''}</div>
   <div class="ui-n">${esc(u.name)}</div>${u.immune?`<div class="ui-s">${sc.kiep?'Đạo '+Math.min(sc.kiep.n,sc.kiep.done+1)+'/'+sc.kiep.n+(sc.kiep.waves>1?' · đợt '+sc.kiep.wave:''):''}${sc.kiep&&sc.kiep.uy<1?' · uy '+Math.round(sc.kiep.uy*100)+'%':''}</div>`:bar(Math.max(0,u.hp),u.max,'hp')+(u.maxMp?bar(u.mp,u.maxMp,'mp'):'')}
   ${stIcons(u.st)}</div>`;
}
function abarHTML(sc){
  let h='<div class="abar"><i class="mk m50"></i><i class="mk m75"></i>';
  for(const u of sc.units){if(u.hp<=0&&!u.immune)continue;h+=`<span class="av ${u.side}${u.isMain?' me':''}" id="av${u.id}" style="bottom:${Math.min(100,u.pos)}%">${u.icon}</span>`;}
  return h+'</div>';
}
function vCombat(sc){
  const r=G.run;const me=mainUnit(sc);const rp=readyPlayer(sc);const pickMode=!!(rp&&UI.pendSk);
  let h=`<div class="cb">${abarHTML(sc)}<div class="cmain">`;
  h+=`<div class="urow">${sc.units.filter(u=>u.side==='B').map(u=>unitTile(sc,u,pickMode)).join('')}</div>`;
  const lg=sc.log.slice(-3);
  h+=`<div class="clog">${lg.map((l,i)=>`<p class="${l.c} ${i<lg.length-1?'old':''}">${esc(l.t)}</p>`).join('')}</div>`;
  h+=`<div class="urow">${sc.units.filter(u=>u.side==='A').map(u=>unitTile(sc,u,false)).join('')}</div>`;
  if(sc.done){
    const t={win:'Thắng',lose:'Thua trận',flee:'Thoát thân',dead:sc.kiep?'Ngươi tan biến trong lôi kiếp':'Ngươi đã ngã xuống'}[sc.over];
    return h+`<p class="cres ${sc.over}">${t}</p>`+goBtn('cont','Tiếp tục')+'</div></div>';
  }
  if(rp){
    if(pickMode){h+=`<p class="hint">Chọn mục tiêu cho ${esc(pSkill(UI.pendSk).sk.n)}</p><div class="acts"><button data-act="cancelSk">Thôi</button></div>`;}
    else{
      h+='<div class="skills">';
      const btn=(id,sk,lv)=>{const c=skillCost(sk);const no=me.mp<c;return `<button class="sk" data-act="skill" data-arg="${id}"${no?' disabled':''}${ta(id==='_atk'?'Đánh thường bằng chân khí\nKhông tốn linh lực':skillTip(sk,lv))}>${elSeal(sk.el)}<span class="sn">${esc(sk.n)}${sk.fx.charge?' ⏳':''}${lv>1?' <i>'+'Ⅰ Ⅱ Ⅲ'.split(' ')[lv-1]+'</i>':''}</span><small>${c?'💧'+c:''}</small></button>`;};
      h+=btn('_atk',BASIC,1);for(const k of r.skills)h+=btn(k.id,SK[k.id],k.lv);h+='</div>';
      const cp=r.pills.map((p,i)=>({p,i})).filter(x=>PILL[x.p.id].w!=='bt');
      h+=`<div class="acts"><button data-act="guard"${ta('Vận khí thủ thế\nĐược hộ thể và hồi 30% linh lực')}>🛡️ Vận khí</button>
       <button data-act="tray"${cp.length?'':' disabled'}${ta('Dùng đan dược, phù lục')}>⚗️ Đan <i>${cp.length}</i></button>
       ${sc.boss||sc.kiep||sc.noFlee?'':`<button data-act="flee"${ta('Cả đội bỏ chạy\nThành công dựa vào thân pháp')}>🏃 Thoát</button>`}</div>`;
      if(UI.pillTray&&cp.length)h+=`<div class="tray">${cp.map(({p,i})=>`<button data-act="cpill" data-arg="${i}"${ta(pillTip(p.id,p.q))}>${PILL[p.id].i} ${esc(PILL[p.id].n)}</button>`).join('')}</div>`;
    }
  } else h+=`<p class="hint cwait">${sc.dodge?(sc.dodge.lit?'Lôi giáng! Chạm “Đỡ” đúng lúc vòng khép lại':'Đòn đánh tới! Chạm “Né” đúng lúc vòng khép lại'):sc.qte?'Chạm đúng lúc vạch vào vùng vàng':'…'}</p>`;
  h+='</div></div>';
  if(sc.dodge)h+=`<button id="dodgeBtn" class="dodge">${sc.dodge.lit?'Đỡ':'Né'}</button>`;
  if(sc.qte)h+=`<div id="qte" class="qte"><div class="qbar"><i class="qg"></i><i class="qy"></i><span class="qm"></span></div><p>Chạm để tung chiêu</p></div>`;
  return h;
}
function vPrep(sc){
  const r=G.run;const v=prepView();const to=btTarget();
  let h=banner(r.place.n,r.region,to===5?'Độ kiếp phi thăng':'Đột phá '+REALM[to],true);
  h+=`<div class="story"><p>Chọn tối đa ba vật phẩm đặt vào ô chuẩn bị. Vật phẩm bị tiêu hao khi bắt đầu, dù thành hay bại.</p></div>`;
  h+=`<div class="slots">${[0,1,2].map(k=>{const i=sc.slots[k];const it=i!=null&&r.pills[i];return it?`<button class="slot on" data-act="prep" data-arg="${i}"${ta(pillTip(it.id,it.q))}>${PILL[it.id].i}<small>${esc(PILL[it.id].n)}</small></button>`:'<span class="slot">＋</span>';}).join('')}</div>`;
  const stg=btStages(to).map(x=>x==='tamma'?'Tâm ma kiếp':'Lôi kiếp '+x.n+' đạo'+(x.waves>1?' × '+x.waves+' đợt':'')).join(', ')||'Không có thiên kiếp';
  h+=`<div class="chips"><span class="chip"${ta('Tỉ lệ xung quan thành công')}>🌕 ${Math.round(v.rate*100)}%</span><span class="chip"${ta('Phẩm chất dự kiến nếu thành công\nĐạo cơ hiện có '+v.dao+(v.next?', mốc kế tiếp '+v.next:''))}>☯️ ${QNAME[v.q]} (${v.dao})</span>${v.e.guard?'<span class="chip up">🛡️ hộ mệnh</span>':''}<span class="chip"${ta('Thiên kiếp phải vượt sau khi xung quan')}>🌩️ ${esc(stg)}</span></div>`;
  const L=btItems();
  h+=`<h4 class="sub">Túi đồ dùng được</h4><div class="list">`+(L.length?L.map(({p,i})=>`<button class="li pick${sc.slots.includes(i)?' taken':''}" data-act="prep" data-arg="${i}"${ta(pillTip(p.id,p.q))}><span>${PILL[p.id].i}</span><span>${p.q?PQ[p.q]+' ':''}${esc(PILL[p.id].n)}</span><small>${esc(PILL[p.id].d.replace('{x}',pillX(p.id,p.q)))}</small></button>`).join(''):'<p class="hint">Không có vật phẩm nào dùng được.</p>')+'</div>';
  return h+`<div class="gorow"><button class="go" data-act="prepGo">Bắt đầu</button></div>`+goBtn('next','Để sau');
}
function vBtres(sc){
  const r=G.run;let h=banner(r.place.n,r.region,sc.ok?'Đột phá':'Thất bại',true)+`<div class="story"><p class="new">${esc(sc.text)}</p></div>`+chipsHTML(sc.chips);
  const more=r.bt&&!sc.done&&r.bt.si<r.bt.stages.length;
  if(more){const st=r.bt.stages[r.bt.si];h+=`<p class="hint">${st==='tamma'?'Tâm ma kiếp: đánh một trận với chính mình.':'Lôi kiếp: '+st.n+' đạo lôi không né được, chỉ đỡ được. Gục là chết thật.'}</p>`;}
  return h+goBtn('btGo',more?'Nghênh kiếp':'Tiếp tục');
}
function sceneView(sc){return ({prep:vPrep,btres:vBtres}[sc.type]||(()=>''))(sc);}
// ---------- nhịp trận trên màn hình ----------
function combatFrame(now,dt){
  const sc=G.run&&G.run.scene;if(!sc||sc.type!=='combat'||sc.done||UI.sheet||document.hidden)return;
  // vòng né
  if(sc.dodge){
    if(!UI.dg||UI.dg.id!==sc.dodge.id){UI.dg={id:sc.dodge.id,t0:now,n:sc.dodge.n,T:sc.dodge.T*1000,offs:[]};}
    const d=UI.dg;if(now>d.t0+d.n*d.T+250){const o=[];for(let k=0;k<d.n;k++)o.push(d.offs[k]==null?null:d.offs[k]);UI.dg=null;dodgeResolve(o);after();}
    return;
  }
  if(sc.qte){
    if(!UI.qt||UI.qt.id!==sc.qte.id)UI.qt={id:sc.qte.id,t0:now};
    if(now>UI.qt.t0+1200){UI.qt=null;qteResolve(null);after();}
    return;
  }
  const rev=sc.rev;combatStep(Math.min(dt,0.05));
  if(!G.run||G.run.scene!==sc||sc.rev!==rev){after();return;}
  for(const u of sc.units){const e=document.getElementById('av'+u.id);if(e)e.style.bottom=Math.min(100,u.pos)+'%';}
}
function dodgePress(){
  const d=UI.dg;if(!d)return;const now=performance.now();
  let k=Math.round((now-d.t0)/d.T)-1;k=clamp(k,0,d.n-1);
  if(d.offs[k]!=null)return; // chỉ nhận lần nhấn đầu tiên của mỗi vòng
  d.offs[k]=(now-(d.t0+(k+1)*d.T))/1000;
  const b=$('#dodgeBtn');if(b){b.classList.add('hit');const a=Math.abs(d.offs[k]);b.textContent=a<=0.09?'Chuẩn!':a<=0.25?'Khá':'Hụt';}
}
function qtePress(){
  const q=UI.qt;if(!q)return;const ph=((performance.now()-q.t0)/1200);const x=ph<0.5?ph*2:2-ph*2;UI.qt=null;qteResolve(qteMult(clamp(x,0,1)));after();
}
document.addEventListener('pointerdown',e=>{if(e.target.closest('#dodgeBtn')){e.preventDefault();dodgePress();}else if(e.target.closest('#qte')){e.preventDefault();qtePress();}},true);
