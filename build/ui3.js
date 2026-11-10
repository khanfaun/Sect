// ---------- thực thể trên bản đồ ----------
function entsSVG(){
  const r=G.run,w=W();const [x,y]=playerXY();const R0=senseR();let s='';
  for(const e of entsHere(r.region)){
    const p=entXY(e);const see=Math.hypot(p[0]-x,p[1]-y)<=R0;
    if(see){e.heard=null;s+=`<g class="ent" transform="translate(${p[0]} ${p[1]})"${ta(e.name+'\n'+ENT_T[e.type].n)}><circle r="17" fill="var(--paper)" stroke="var(--red)" stroke-width="2"/><text y="8" text-anchor="middle" font-size="20">${e.icon}</text></g>`;}
    else if(e.heard){const d=Math.max(0,Math.round((w.t-e.heard.t)/HD));s+=`<g class="ent old" transform="translate(${e.heard.x} ${e.heard.y})"${ta(e.name+'\nNghe được '+(d?d+' ngày trước':'hôm nay'))}><circle r="15" fill="none" stroke="var(--ink3)" stroke-dasharray="4 4" stroke-width="2"/><text y="7" text-anchor="middle" font-size="17" opacity=".6">${e.icon}</text><text class="nn" y="38" text-anchor="middle" font-size="16">${d?d+' ngày trước':'hôm nay'}</text></g>`;}
  }
  return s;
}
function vBoard(sc){
  const r=G.run,n=nodeById(sc.id);const open=r.quests.filter(q=>q.state==='open').length;
  let h=banner(n.name,r.region,'Bảng treo thưởng',true)+`<div class="story"><p>Mấy tờ cáo thị dán chồng lên nhau, giấy đã ngả vàng. Nhận việc thì phải xong trước hạn, thất hứa thì mang tiếng.</p></div><div class="choices">`;
  n.board.list.forEach((q,i)=>{h+=`<button class="ch" data-act="quest" data-arg="${i}"${q.taken||open>=3?' disabled':''}${ta(q.kind==='diet'?'Tới nơi rồi thăm dò để tìm mục tiêu':'Chỉ cần tới nơi')}><span class="ci">${q.kind==='diet'?'⚔️':'✉️'}</span><span class="ct">${esc(q.text)}</span><span class="cx">⏳${q.days} ngày</span><span class="cx">💎${q.reward.st}</span></button>`;});
  return h+`</div><p class="hint">Đang nhận ${open}/3 việc.</p>`+goBtn('next','Quay lại');
}
function vBury(sc){
  const r=G.run,n=nodeById(sc.id);
  let h=banner(n.name,r.region,'Chôn đồ',true)+`<div class="story"><p>Chọn tối đa ba món. Kiếp sau tới đúng chỗ này, thăm dò sẽ tìm thấy.</p></div><div class="list">`;
  r.relics.forEach((x,i)=>{const k='r'+i;h+=`<button class="li pick${sc.sel.includes(k)?' taken':''}" data-act="bsel" data-arg="${k}"${ta(relicTip(x))}><span>🏺</span><span>${esc(x.name)}</span><small>${GRADE[x.tier]}</small></button>`;});
  r.pills.forEach((x,i)=>{const k='p'+i;h+=`<button class="li pick${sc.sel.includes(k)?' taken':''}" data-act="bsel" data-arg="${k}"${ta(pillTip(x.id,x.q))}><span>${PILL[x.id].i}</span><span>${esc(PILL[x.id].n)}</span><small></small></button>`;});
  return h+`</div><div class="gorow"><button class="go" data-act="buryGo"${sc.sel.length?'':' disabled'}>Chôn</button></div>`+goBtn('next','Thôi');
}
