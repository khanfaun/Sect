// ---------- màn bản đồ: thẻ trạng thái, nút bản đồ, thẻ địa điểm ----------
function sectText(){const r=G.run;return r.flags.tongmon?'Đệ tử tông môn':'Tán tu · Tự do';}
function hudHTML(){
  const r=G.run,s=S(),t=W().t;const left=s.life-r.age;const warn=left<s.life*0.12;const pa=PART[partOf(t)];
  const row=(n,cur,max,cls,txt,tip)=>`<div class="hrow"${ta(tip)}><span class="hn">${sib(n)}${n}</span>${bar(cur,max,cls)}<span class="hv">${txt}</span></div>`;
  const n=curNode();const atDp=n&&n.dp&&!r.moving;const brk=canBreak();const bqNo=bqCan();
  const hurt=wounds().length?' · <b class="bad">'+esc(WOUND[wounds()[0].k].n)+(wounds().length>1?' +'+(wounds().length-1):'')+'</b>':r.hp<s.maxHp*0.35?' · <b class="bad">Khí huyết cạn</b>':'';
  let h=`<div class="hud-top" data-act="hud"><div class="hud-date"${ta(dateText(t)+'\nBuổi '+pa.n+', mùa '+SEASON[seasonOf(t)]+'\nNgày '+(Math.floor((t%HM)/HD)+1)+' trong tháng')}><small>Năm</small><b id="clkY">${tYear(t)}</b><small id="clkM">Ngày ${Math.floor((t%HM)/HD)+1} · tháng ${MONTH[tMonth(t)]}</small></div>
   <div class="hud-id"><b class="nm">${esc(r.ten)}</b><span class="rl"${ta(realmLabel()+'\nTu vi '+Math.floor(r.tv)+'%\n'+rootView(r.root).n+': '+r.root.els.map(e=>EL[e].n).join(', '))}>${esc(realmLabel())}</span><small><span id="clkH">Giờ ${gioName(t)}</span> · ${sectText()}${UI.paused?' · <i>đang dừng</i>':''}</small></div>
   ${UI.hudOpen?'':`<span class="hud-st"${ta('Linh thạch')}>${stoneHTML(r.st)}</span>`}<span class="hud-tg">${ic(UI.hudOpen?'up':'down')}</span></div>`;
  if(UI.hudOpen){
    h+=`<div class="hud-body">${row('Tu vi',r.tv,100,'tv',Math.floor(r.tv)+'%','Đủ 100% thì có thể đột phá ở nơi có động phủ')}
     ${row('Khí huyết',r.hp,s.maxHp,'hp',r.hp+' / '+s.maxHp,'Về 0 là chết')}
     ${row('Linh lực',r.mp,s.maxMp,'mp',r.mp+' / '+s.maxMp,'Dùng để thi triển pháp thuật')}
     ${row('Thọ',r.age,s.life,warn?'life warn':'life',Math.floor(r.age)+' / '+s.life,'Tuổi / thọ nguyên. Đột phá để sống lâu hơn.'+(warn?'\nThọ nguyên sắp cạn!':''))}
     <div class="hline"><span class="hn">${sib('Linh thạch')}Linh thạch</span>${stoneHTML(r.st)}${hurt}${r.tamma>0?` · <span class="${r.tamma>=60?'bad':''}"${ta('Tâm ma\nĐủ 100 sẽ phải đối mặt với chính mình')}>Tâm ma ${r.tamma}</span>`:''}</div>
     <div class="hbtns"><button data-act="hudBq"${bqNo?' disabled':''}${ta(bqNo||('Ngồi tu luyện ngay tại đây, tự chọn thời gian.\nLinh khí nơi này: '+LK_N[lkOf(n)]+(n&&n.dp?', có động phủ':'')))}>Bế quan</button>
      <button data-act="hudBt" class="${brk&&atDp?'hl':''}"${brk&&atDp?'':' disabled'}${ta(brk?(atDp?'Chuẩn bị đột phá':'Tu vi đã viên mãn. Tìm nơi có động phủ để đột phá'):'Tu vi chưa viên mãn')}>Đột phá</button>
      <button data-act="panel" data-arg="craft"${r.moving?' disabled':''}${ta('Luyện đan, luyện khí từ vật liệu nhặt được')}>Luyện chế</button></div></div>`;
  }
  return h;
}
function statusList(){const r=G.run,s=S(),w=W();const L=[];
  for(const x of wounds())L.push(['bad',WOUND[x.k].n,WOUND[x.k].d+' '+woundText(x)]);
  if(injured())L.push(['bad','Đang mang thương','Thua trận nữa là chết. Dưỡng thương ở động phủ trị ngoại thương, bỏng; y sư ở phường thị trị thêm gãy xương, độc.']);
  if(r.hp<s.maxHp*0.35)L.push(['bad','Khí huyết cạn','Khí huyết dưới 35%. Nghỉ ngơi hoặc dùng đan.']);
  if(r.tamma>=60)L.push(['bad','Tâm ma dày','Tâm ma '+r.tamma+'/100. Tĩnh tọa hoặc dưỡng thương để giảm.']);
  if(s.life-r.age<s.life*0.12)L.push(['bad','Thọ nguyên sắp cạn','Còn chừng '+Math.max(0,Math.floor(s.life-r.age))+' năm.']);
  if(entsHere(r.region).some(e=>e.type==='truysat'))L.push(['bad','Bị truy đuổi','Có kẻ đang lần theo dấu ngươi.']);
  for(const p of r.party||[])L.push(['','Đồng hành: '+p.ten,'Còn '+durH(Math.max(0,p.until-w.t))]);
  const pet=typeof petOut==='function'&&r.pets&&r.petOut!=null&&r.pets[r.petOut];if(pet)L.push(['','Linh thú: '+pet.n,pet.rest>w.t?'Đang dưỡng thương, còn '+durH(pet.rest-w.t):'Bậc '+pet.lv+' · '+petFxText(pet)]);
  for(const q of r.quests)if(q.state==='open')L.push(['','Việc: '+q.text,'Còn '+durH(Math.max(0,q.due-w.t))]);
  if(canBreak())L.push(['good','Tu vi viên mãn','Tới nơi có động phủ để đột phá.']);
  return L;}
const WICON={ngoai:'M5 19L19 5M8 8l3 3M13 13l3 3',bong:'M12 3c1 4 5 5 5 10a5 5 0 01-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-5 1-9z',gay:'M6 6l12 12M4 6a2 2 0 114 0 2 2 0 11-4 0M16 18a2 2 0 114 0 2 2 0 11-4 0M11 9l-2 2M15 13l-2 2',
  noi:'M12 20s-7-4.5-7-10a4 4 0 017-2.5A4 4 0 0119 10c0 5.5-7 10-7 10zM12 8l-2 4h4l-2 4',than:'M12 4a8 8 0 100 16 8 8 0 000-16zM12 8a4 4 0 104 4M12 12h.01',doc:'M12 3s6 7 6 11a6 6 0 01-12 0c0-4 6-11 6-11zM10 14h.01M14 14h.01',
  nguy:'M12 4v10M12 18v.5',mu:'M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zM4 4l16 16',cut:'M6 4v8a4 4 0 004 4h2M14 16l5 5M19 16l-5 5',que:'M9 4v9l-3 7M9 13h5l3 7M4 20h16',
  ma:'M6 12a6 6 0 1112 0v3l-2 1v3H8v-3l-2-1zM9.5 12.5h.01M14.5 12.5h.01',tho:'M6 3h12M6 21h12M7 3c0 5 5 6 5 9s-5 4-5 9M17 3c0 5-5 6-5 9s5 4 5 9',truy:'M14 4h6v6L9 21l-2-2-3 1 1-3-2-2L14 4z'};
function durShort(h){if(h<HD)return Math.max(1,Math.round(h))+' giờ';if(h<HM)return Math.round(h/HD)+' ngày';if(h<HY)return Math.round(h/HM)+' th';return numVN(h/HY)+' năm';}
function woundBar(){const r=G.run,s=S(),w=W();const L=[];
  for(const x of wounds()){const D=WOUND[x.k];L.push({k:x.k,t:x.perm?'∞':x.k==='nguy'?durShort(Math.max(1,x.dl-w.t)):durShort(Math.max(1,x.until-w.t)),tip:D.n+'\n'+D.d+'\n'+woundText(x)+(x.perm||x.k==='doc'?'':'\nĐang mang thương: thua trận nữa là chết.'),cls:x.k==='nguy'?'crit':x.perm?'perm':''});}
  if(r.tamma>=60)L.push({k:'ma',t:r.tamma+'/100',tip:'Tâm ma dày\nĐủ 100 sẽ phải đối mặt với chính mình. Tĩnh tọa, dưỡng thương, bế quan để giảm.',cls:''});
  if(s.life-r.age<s.life*0.12)L.push({k:'tho',t:durShort(Math.max(0,s.life-r.age)*HY),tip:'Thọ nguyên sắp cạn\nĐột phá để sống lâu hơn.',cls:'crit'});
  if(entsHere(r.region).some(e=>e.type==='truysat'))L.push({k:'truy',t:'',tip:'Bị truy đuổi\nCó kẻ đang lần theo dấu ngươi.',cls:''});
  return L.map(x=>`<div class="wi ${x.cls}"${ta(x.tip)}><svg viewBox="0 0 24 24"><path d="${WICON[x.k]}"/></svg><small>${x.t}</small></div>`).join('');}
function mapUiHTML(){
  const r=G.run;const sp=UI.speed||1;
  const B=(act,arg,lab,tip,on,dis)=>`<button class="mb${on?' on':''}" data-act="${act}"${arg!=null?` data-arg="${arg}"`:''}${dis?' disabled':''}${ta(tip)}>${lab}</button>`;
  let h=`<div class="mleft wb">${woundBar()}</div>`;
  h+=`<div class="mright">${B('zoom',1,ic('plus'),'Phóng to')}${B('zoom',-1,ic('minus'),'Thu nhỏ')}${B('center',null,ic('target'),'Về chỗ ngươi')}${B('gridT',null,ic('hex'),CFG.grid?'Ẩn lưới ô':'Hiện lưới ô',CFG.grid)}<i class="sp"></i>
   ${B('speed',0,ic(UI.paused?'play':'pause'),UI.paused?'Cho thời gian chạy tiếp':'Tạm dừng thời gian',UI.paused)}${B('speed',1,'×1','1 giây = 1 giờ',!UI.paused&&sp===1)}${B('speed',12,'×12','Chờ nhanh',!UI.paused&&sp===12)}${B('wait','sang',ic('sun'),'Chờ tới sáng',0,!!r.moving)}${B('wait','toi',ic('moon'),'Chờ tới tối',0,!!r.moving)}</div>`;
  return h;
}
const ENTER_L={tran:'Vào thôn trấn',thanh:'Vào thành',tong:'Lên sơn môn',ai:'Tới cửa ải',sao:'Vào sào huyệt',dong:'Vào hang',phe:'Vào phế tích',ma:'Vào ma địa',thien:'Bước lên',rung:'Vào rừng',nui:'Lên núi',song:'Ra bến nước',bien:'Ra bờ biển',hoang:'Vào hoang dã'};
function nodeInfo(n){const sure=n.fog>=2||n.memory;let info=`${capS(TYPE_NAME[n.type])}${sure?'':' (nghe đồn)'}`;
  const tags=[];if(n.fog>=3&&n.dp)tags.push('có động phủ');if(n.memory)tags.push('ký ức kiếp trước');if((n.vstate||'ok')==='ruin'&&n.fog>=2)tags.push('hoang tàn');if(n.fog>=2&&W().t-n.seenT>HY)tags.push('tin cũ');if(n.grave)tags.push('có mộ cũ');
  return {sure,info,tags};}
function dockHTML(){
  const r=G.run;const cur=curNode();
  if(r.scene&&UI.evMin){const e=EVMAP[r.scene.id];return `<div class="dock loc"><span class="lc-n">Đang dở: ${esc(e&&e.n||'một chuyện')}</span><button class="btn pri" data-act="evBack">Quay lại</button></div>`;}
  if(r.dest!=null&&!r.moving&&r.dest!==r.at){const d=nodeById(r.dest);return `<div class="dock go"><div class="dk-t"><small>Bị cản giữa đường</small><b>${esc(d.name)}</b></div><button class="btn pri" data-act="goSure" data-arg="${d.id}">Đi tiếp</button><button class="btn" data-act="destX">Thôi</button></div>`;}
  if(r.moving&&r.halt){const m=r.moving;const dest=nodeById(m.path[m.path.length-1]),from=nodeById(m.path[m.seg]);const I=hexInfo(hexAt(...playerMapXY()));
    return `<div class="dock card"><div class="nc-h"><b>Dừng chân giữa đường</b><small>${esc(I.ter)} · ${esc(I.dist)}</small></div><p class="nc-d">Đang trên đường tới ${esc(dest.name)}. Thời gian vẫn trôi.</p><div class="nc-b"><button class="btn pri" data-act="goOn">Đi tiếp</button><button class="btn" data-act="turnBack">Quay lại ${esc(from.name)}</button></div></div>`;}
  if(r.moving){const m=r.moving;const dest=nodeById(m.path[m.path.length-1]);let L=0;for(let i=m.seg;i<m.path.length-1;i++)L+=edgeLen(m.path[i],m.path[i+1])*(i===m.seg?1-m.prog:1);
    return `<div class="dock go"><div class="dk-t"><small>Đang trên đường tới</small><b>${esc(dest.name)}</b><small id="mvLeft">còn ${Math.round(L)} dặm</small></div><button class="btn" data-act="stop">Dừng lại</button></div>`;}
  const n=UI.sel!=null&&nodeById(UI.sel);
  if(n&&n.fog>=1&&Math.floor(n.id/100)===r.region&&UI.cardMin){const here=n.id===r.at;
    return `<div class="dock loc"><span class="lc-n">${esc(n.name)}</span>${here?`<button class="btn pri" data-act="enter">${ENTER_L[n.type]||'Vào'}</button>`:`<button class="btn pri" data-act="go" data-arg="${n.id}"${findPath(r.at,n.id)?'':' disabled'}>Đi tới</button>`}<button class="icb" data-act="cardMax"${ta('Mở rộng')} aria-label="Mở rộng">${ic('up')}</button></div>`;}
  if(n&&n.fog>=1&&Math.floor(n.id/100)===r.region&&!UI.cardMin){
    const I=nodeInfo(n);const here=n.id===r.at;const dg=dangerTag(n);
    let mid='';
    if(!here){const p=findPath(r.at,n.id);mid=p?`<span>~${Math.round(pathLen(p))} dặm · ${durH(travelHours(p))}</span>`:'<span>chưa biết đường</span>';}else mid='<span class="good">ngươi đang ở đây</span>';
    const nt=noteOf(n.id);const M=I.sure?placeMeta(n):null;
    return `<div class="dock card nc"><div class="nc-top"><div class="nc-tt"><b>${esc(n.name+(I.sure?'':'?'))}</b><small>${esc(I.info)}</small></div>
      <button class="icb" data-act="noteEdit" data-arg="${n.id}"${ta('Ghi chú: ghim một dòng lên điểm này')} aria-label="Ghi chú">${ic('pen')}</button><button class="icb" data-act="cardMin"${ta('Thu gọn')} aria-label="Thu gọn">${ic('down')}</button><button class="icb" data-act="unsel" aria-label="Đóng">${ic('close')}</button></div>
      <p class="nc-m"><span class="nc-g dg${dg}"${ta(dangerWhy(n))}><i></i>${DTAG[dg]}${I.sure?'':'?'}</span>${I.sure?`<span>linh khí ${LK_N[lkOf(n)].toLowerCase()}</span>`:''}${mid}</p>
      ${M?`<div class="nc-kv"><div><small>Tọa trấn</small><b>${esc(M.luc)}</b></div><div><small>Quy mô</small><b>${esc(M.quy)}</b></div></div>${M.desc?`<p class="nc-d">${esc(M.desc)}</p>`:''}`:'<p class="nc-d">Mới nghe đồn, chưa tận mắt thấy. Vị trí có thể lệch.</p>'}
      ${I.tags.length||I.sure?`<p class="nc-d sm">${esc([I.sure?hexInfo(nodeHex(n)).dist:''].concat(I.tags).filter(Boolean).join(' · '))}</p>`:''}
      ${nt?`<p class="nc-n">${ic('pin')} ${esc(nt)}</p>`:''}
      <div class="nc-b">${here?`<button class="btn pri" data-act="enter">${ENTER_L[n.type]||'Vào'}</button>`:`<button class="btn pri" data-act="go" data-arg="${n.id}"${findPath(r.at,n.id)?'':' disabled'}>Đi tới</button>`}</div></div>`;}
  if(UI.cell!=null){const I=hexInfo(UI.cell);return `<div class="dock card"><div class="nc-h"><b>${I.sea?'Biển khơi':I.ter}</b><small>ô trống</small></div><p class="nc-d">${esc(I.regName)}${I.dist?' › '+esc(I.dist):''}</p><p class="nc-d">${I.sea?'Không có đường bộ. Đi ngang qua tốn gấp sáu lần đồng bằng.':'Không có địa điểm nào ở ô này. Đi ngang qua tốn '+numVN(TER_COST[geo().ter[UI.cell]])+' lần đồng bằng.'}</p><div class="nc-b"><button class="btn" data-act="unsel">Đóng</button></div></div>`;}
  return `<div class="dock loc"><span class="lc-n">${esc(cur.name)}</span><button class="btn pri" data-act="enter">${ENTER_L[cur.type]||'Vào'}</button></div>`;
}
function navHTML(){
  const r=G.run;const it=[['char','user','Nhân vật'],['pets','paw','Linh thú'],['journal','book','Sổ tay'],['bonds','people','Giao tình'],['more','more','Thêm']];
  const dot={journal:r&&r.quests.some(q=>q.state==='open'),pets:r&&r.eggs&&r.eggs.length>0};
  return it.map(([k,i,n])=>`<button class="nv${UI.panel===k?' on':''}" data-act="panel" data-arg="${k}">${ib(i)}<span>${n}</span>${dot[k]?'<i class="dot soft"></i>':''}</button>`).join('');
}

// ---------- các cảnh hiện đè lên bản đồ ----------
function storyHTML(story){return story.map((x,i)=>{const old=i<story.length-1?' old':'';const neu=i>=UI.lastStory?' new':'';
  if(typeof x==='object')return `<p class="q${old}">${esc(x.q)}</p>`;return `<p class="${old}${neu}">${esc(x)}</p>`;}).join('');}
function card(title,sub,body,o){o=o||{};return `<section class="scard ${o.cls||''}">${o.art||''}<header class="sc-h"><h2>${esc(title)}</h2>${sub?`<small>${esc(sub)}</small>`:''}${o.head||''}</header><div class="sc-b">${body}</div>${o.foot?`<footer class="sc-f">${o.foot}</footer>`:''}</section>`;}
function goBtn(act,label,arg,cls){return `<button class="btn ${cls||'pri'} wide" data-act="${act}"${arg!=null?` data-arg="${arg}"`:''}>${label}</button>`;}
function choiceBtn(n,act,arg,label,extra,o){o=o||{};return `<button class="ch${o.cls?' '+o.cls:''}" data-act="${act}" data-arg="${arg}"${o.dis?' disabled':''}${ta(o.tip)}><span class="cn">${n}</span><span class="ct">${label}</span>${extra||''}</button>`;}
function choiceExtra(c){let x='';const r=G.run;
  if(c.cost){if(c.cost.st){const v=Math.round(c.cost.st*SC[r.region]);x+=`<span class="cx${r.st<v?' no':''}"${ta('Tốn linh thạch')}>${stoneHTML(v)}</span>`;}if(c.cost.mp)x+=`<span class="cx"${ta('Tốn linh lực')}>linh lực ${c.cost.mp}</span>`;if(c.cost.hp)x+=`<span class="cx"${ta('Tốn khí huyết')}>khí huyết ${c.cost.hp}</span>`;}
  if(c.chk){const p=Math.round(chkChance(c.chk)*100);x+=`<span class="cx chk"${ta('Phép thử '+CHKN[c.chk[0]]+'\nCơ hội thành công '+p+'%')}>${CHKN[c.chk[0]].toLowerCase()} ${p}%</span>`;}
  if(c.fight)x+=`<span class="cx"${ta('Sẽ phải giao chiến'+(c.fight.spar?' (luận võ, thua không chết)':''))}>giao chiến</span>`;
  return x;}
function vRegionIntro(sc){const r=G.run;const og=ORIGIN.find(o=>o.id===r.origin);
  return `<div class="intro" data-act="regionGo"><div class="in-b"><small>Kiếp thứ ${r.kiep}</small><h1>${esc(r.ten)}</h1><p class="in-o">${esc(og.n)} · quê ở ${esc(r.que)}</p><p class="in-t">${esc(sc.text)}</p>${sc.sub?`<p class="hint">${esc(sc.sub)}</p>`:''}<p class="hint tap">Chạm để lên đường</p></div></div>`;}
function vEvent(sc){
  const r=G.run;const e=EVMAP[sc.id];const st=sc.story;const qi=st.findIndex(x=>typeof x==='object');
  let b=qi<0?`<div class="story">${storyHTML(st)}</div>`:`<div class="story">${storyHTML(st.slice(0,qi))}</div><div class="dlg" id="dlg">${st.slice(qi).map((x,i)=>typeof x==='object'?`<p class="dq">› ${esc(x.q)}</p>`:`<p class="${qi+i>=UI.lastStory?'new':''}">${esc(x)}</p>`).join('')}</div>`;
  if(sc.news)b+=`<p class="news"${ta('Tin đồn giang hồ')}>${esc(sc.news)}</p>`;
  b+=chipsHTML(sc.chips);
  if(sc.phase==='choose'){b+='<div class="choices">';let k=1;for(const {c,i} of visChoices(sc)){const NL=needList(c);const bad=NL.filter(x=>!x.ok);b+=choiceBtn((k++)+'.','choose',i,esc(T(c.l,sc.v)),choiceExtra(c),{dis:bad.length>0,cls:bad.length?'soft':''});if(bad.length)b+=`<p class="why">(${esc(bad.map(x=>x.t).join(', '))})</p>`;}b+='</div>';}
  return card(e&&e.n||'Kỳ ngộ',r.place.n,b,{head:sc.phase==='choose'?`<button class="pl-tg" data-act="evMin"${ta('Tạm gác lại để xem bản đồ, túi đồ… rồi quay lại chọn sau')}>Để sau ${ic('down')}</button>`:'',foot:sc.phase==='choose'?'':goBtn('next','Tiếp tục')});
}
function foeLine(en){return `<div class="foe-l"><span class="foe-i">${en.i}</span><div><b>${esc(en.n)}</b><small>${elSeal(en.el)} ${esc(en.sub||'')}</small></div></div>`;}
function vEnc(sc){
  const r=G.run,en=sc.en;let b=foeLine(en)+`<div class="story"><p class="new">${esc(sc.text)}</p>${sc.res?`<p class="new">${esc(sc.res)}</p>`:''}</div>`;
  if(sc.done)return card(sc.elite?'Hung địa':'Chạm trán',r.place.n,b+chipsHTML(sc.paid?[chip('💎','−'+sc.paid,'Linh thạch','dn')]:[]),{foot:goBtn('next','Tiếp tục')});
  if(injured())b+=`<p class="cb-warn">Đang mang thương: thua trận này là chết.</p>`;
  const p=Math.round(encSneak(sc)*100);const pay=Math.round(12*SC[r.region]);
  b+=`<div class="choices">${choiceBtn('1.','enc','fight','Xuất thủ','<span class="cx">giao chiến</span>')}${choiceBtn('2.','enc','sneak','Lẩn tránh',`<span class="cx chk"${ta('Dựa vào thân pháp\nThất bại thì vẫn phải đánh')}>thân pháp ${p}%</span>`)}`;
  if(en.f==='nhan'&&!sc.elite)b+=choiceBtn('3.','enc','pay','Nộp tiền mãi lộ',`<span class="cx">${stoneHTML(pay)}</span>`,{dis:r.st<pay});
  return card(sc.elite?'Hung địa':'Chạm trán',r.place.n,b+'</div>');
}
function vBoss(sc){const r=G.run;return card('Sào huyệt',r.place.n,`<div class="foe-l big"><span class="foe-i">${sc.b.i}</span><div><b>${esc(sc.b.n)}</b><small>Thủ lĩnh vùng ${esc(REG[r.region].n)}</small></div></div><div class="story"><p class="new">${esc(sc.text)}</p></div>`,{foot:goBtn('bossFight','Nghênh chiến')});}
function itemView(p){
  if(p.k==='relic')return {ic:relIcon(p.rel),n:p.rel.name,sub:GRADE[p.rel.tier],tip:relicTip(p.rel),t:p.rel.tier||0};
  if(p.k==='skill'){const sk=SK[p.id];const h=G.run.skills.find(x=>x.id===p.id);return {ic:elSeal(sk.el),n:sk.n,sub:'Bí tịch công pháp · '+PHAM[sk.t],tip:skillTip(sk,h?h.lv+1:1),t:sk.t};}
  if(p.k==='pill')return {ic:PILL[p.id].i,n:(p.q?PQ[p.q]+' ':'')+PILL[p.id].n,sub:PILL[p.id].d.replace('{x}',pillX(p.id,p.q)),tip:pillTip(p.id,p.q),t:p.q||0};
  if(p.k==='pass')return {ic:'🎫',n:p.n,sub:'Lệnh bài thông quan',tip:'Trình ở quan ải để sang '+REG[p.reg].n,t:2};
  return {ic:'💎',n:p.n+' linh thạch',sub:'',tip:''};}
function vReward(sc){
  const r=G.run;let b=`<div class="story"><p class="new">${esc(sc.text)}</p></div>`+chipsHTML(sc.chips);
  if(sc.picks.length){b+=`<p class="hint">${sc.taken<0?'Chọn một món':'Đã chọn'}</p><div class="rows">${sc.picks.map((p,i)=>{const v=itemView(p);const cls=sc.taken===i?' taken':sc.taken>=0?' dim':'';return `<button class="row prow${cls}" data-act="pick" data-arg="${i}"${sc.taken>=0?' disabled':''} style="${v.t!=null?pcs(v.t):''}"${ta(v.tip)}><span class="qi">${v.ic}</span><span class="r-t"><b class="${v.t!=null?'qt':''}">${esc(v.n)}</b><small>${esc(v.sub)}</small></span></button>`;}).join('')}</div>`;}
  return card(sc.kind==='boss'?'Chiến thắng':'Chiến lợi phẩm',r.place.n,b,{foot:goBtn('rcont',sc.picks.length&&sc.taken<0?'Bỏ qua':'Tiếp tục')});
}
function vShop(sc){
  const r=G.run;const tab=UI.tab.shop||'buy';
  let b=`<p class="shop-top">${esc(sc.text)}</p>`+tabsHTML('shop',[['buy','Mua'],['svc','Việc khác']],tab);
  if(tab==='buy'){b+='<div class="grid">';sc.items.forEach((it,i)=>{const v=itemView(it);const no=it.sold||r.st<it.p;
    b+=`<button class="cell qc${it.sold?' sold':''}" data-act="buy" data-arg="${i}"${no?' disabled':''} style="${v.t!=null?pcs(v.t):''}"${ta(v.tip||v.n)}><span class="c-i">${v.ic}</span><span class="c-n${v.t!=null?' qt':''}">${esc(v.n)}</span><span class="c-p">${it.sold?'đã mua':stoneHTML(it.p)}</span></button>`;});b+='</div><p class="hint">Chạm giữ một món để xem công dụng. Chạm để mua.</p>';}
  else b+=`<div class="rows"><button class="row" data-act="heal"${sc.healed||r.st<sc.heal?' disabled':''}${ta('Hồi đầy khí huyết và linh lực')}><span class="r-i">🩹</span><span class="r-t"><b>Mời y sư trị thương</b><small>Hồi đầy khí huyết, linh lực</small></span><span class="r-x">${sc.healed?'xong':stoneHTML(sc.heal)}</span></button></div>`;
  return card('Phường thị',r.place.n,b,{cls:'tall',foot:`<span class="grow">Trong túi: ${stoneHTML(r.st)}</span>`+goBtn('next','Rời đi','', 'pri')});
}
function vSwap(sc){
  const r=G.run,sk=SK[sc.id];let b=`<div class="story"><p>Ngươi lĩnh ngộ được <b class="qt" style="${pcs(sk.t)}"${ta(skillTip(sk,1))}>${esc(sk.n)}</b>. Nhưng tâm trí chỉ chứa nổi bốn môn. Quên đi môn nào?</p></div><div class="choices">`;
  r.skills.forEach((k,i)=>{const s0=SK[k.id];b+=choiceBtn(elSeal(s0.el),'swap',i,qName(s0.n,s0.t),'<span class="cx">quên</span>',{tip:skillTip(s0,k.lv)});});
  return card('Lĩnh ngộ','',b+choiceBtn('·','swap',-1,'Không học '+esc(sk.n),'',{cls:'soft'})+'</div>');
}
const PGROUP=[['Sự vụ',['board']],['Tông môn',['congmon','join','lib','nhansu','tongviec','conghien','tinhthat']],['Mua bán',['laibuon','taphoa','shop','ghost']],['Nghỉ chân',['tea','inn','tuu','tinh','heal']],['Đi lại',['tram']],['Tu luyện',['khaiphu','thinhgiao']],['Hoang dã',['sanyeu','haithuoc','daokhoang']],['Việc khác',['grave','patron','bury','quyan']]];
const PNOW=['boss','cross','bt'];
const GRP_IC={'Sự vụ':'scroll','Tông môn':'gate','Mua bán':'bag','Nghỉ chân':'tea','Đi lại':'cart','Tu luyện':'seat','Hoang dã':'tree','Việc khác':'more'};
const PL_N={tea:'Trà lâu',inn:'Khách điếm',shop:'Phường thị',board:'Bảng treo thưởng',ghost:'Quỷ thị',join:'Sơn môn',lib:'Tàng Kinh Các',tinh:'Tĩnh tọa',heal:'Dưỡng thương'};
function vPlace(sc){
  const r=G.run,n=nodeById(sc.id),w=W();const acts=placeActs(n).filter(a=>!['bq1','bq3','explore'].includes(a.a));
  const by=k=>acts.find(a=>a.a===k);let k=0;
  const btn=a=>{const qa=a.a==='quyan'&&UI.confirm==='quyan';const x=(a.x?`<span class="cx">${esc(String(a.x).replace(/💎/g,'linh thạch ').replace(/✨/g,'tu vi ').replace(/🌕/g,'thành công '))}</span>`:'')+(a.h&&!a.dis?`<span class="cx tm"${ta('Thời gian sẽ trôi qua')}>${durH(a.h)}</span>`:'');
    return `<button class="ch${a.a==='bt'?' hl big':PNOW.includes(a.a)?' big':''}${a.a==='quyan'||a.dis?' soft':''}" data-act="pact" data-arg="${a.a}"${a.dis?' disabled':''}${ta(a.tip)}><span class="cn">${++k}.</span><span class="ct">${esc(qa?'Chắc chắn gác kiếm? Kiếp này sẽ kết thúc':(PL_N[a.a]&&a.l.length>PL_N[a.a].length+6?PL_N[a.a]:a.l))}</span>${x}</button>`;};
  let b=`<div class="pl-desc${UI.descHide?' hide':''}"><div class="story"><p>${esc(sc.intro)}</p></div></div>`;
  if(sc.msg.length)b+=`<div class="story">${sc.msg.map(m=>`<p class="new">${esc(m)}</p>`).join('')}</div>`;
  b+=chipsHTML(sc.chips);
  const ents=entsHere(r.region).filter(e=>e.to==null&&e.at===n.id);const qs=r.quests.filter(q=>q.state==='open'&&q.node===n.id);
  const big=PNOW.map(by).filter(Boolean);
  if(big.length||ents.length||qs.length){b+=`<h3 class="grp big">${ib('flag','gold')}Chuyện lớn</h3><div class="choices">${big.map(btn).join('')}
    ${ents.map(e=>`<button class="ch big" data-act="meet" data-arg="${e.id}"${ta(ENT_T[e.type].n+' đang dừng chân ở đây.\nChạm để tới gặp. Họ sẽ rời đi sau '+durH(Math.max(1,e.until-w.t))+'.')}><span class="cn">${++k}.</span><span class="ct">Gặp ${esc(e.name)}</span><span class="cx">${esc(ENT_T[e.type].n.toLowerCase())}</span></button>`).join('')}
    ${qs.map(q=>`<button class="ch big" data-act="questGo"${ta('Việc đã nhận ở bảng treo thưởng. Chạm để lùng tìm, tốn 2 giờ.')}><span class="cn">${++k}.</span><span class="ct">${esc(q.text)}</span><span class="cx tm">2 giờ</span></button>`).join('')}</div>`;}
  const evs=nodeEvs(n);
  if(evs.length){const yl=Math.max(1,Math.round((n.evs.until-w.t)/HY));b+=`<h3 class="grp now">${ib('bell','seal')}Trước mắt<i${ta('Những chuyện này không chờ ai. Bỏ mặc lâu thì tự mất.')}>biến mất sau chừng ${yl} năm</i></h3><div class="choices">${evs.map((id,i)=>`<button class="ch now" data-act="evGo" data-arg="${i}"${ta('Chạm để dính vào chuyện này. Tốn 2 giờ.')}><span class="cn">${++k}.</span><span class="ex">!</span><span class="ct">${esc(EVMAP[id].n||'Một chuyện lạ')}</span></button>`).join('')}</div>`;}
  let g='';for(const [name,ks] of PGROUP){const L=ks.map(by).filter(Boolean);if(!L.length)continue;g+=`<h4 class="sgrp">${ib(GRP_IC[name]||'more','soft')}${name}</h4><div class="choices">${L.map(btn).join('')}</div>`;}
  if(g)b+=`<h3 class="grp">${ib('book','ink')}Thường nhật</h3>`+g;
  const canEx=n.type!=='ai';
  return card(n.name,capS(TYPE_NAME[n.type])+' · '+REG[r.region].n+' · '+DANGER[n.danger],b,{cls:'tall place',art:sceneCv(n.name,r.region,n.type,'strip'),
    head:`<button class="pl-tg" data-act="descTg">Cảnh trí ${ic(UI.descHide?'down':'up')}</button>`,
    foot:(canEx?`<button class="btn" data-act="exStat"${ta('Xem nơi này có gì: yêu ma, vật liệu, tỉ lệ')}>Thăm dò</button>`:'')+`<span class="grow"></span><button class="btn" data-act="leave">Rời đi</button>`});
}
function vPass(sc){
  const r=G.run;let b=`<div class="story"><p class="new">${esc(sc.text)}</p><p class="hint">Qua ải mất khoảng ${CROSS_M[sc.k]} tháng đường.</p></div><div class="choices">`;let k=1;
  for(const o of passOpts())b+=choiceBtn((k++)+'.','pass',o.a,esc(o.l),o.x?`<span class="cx">${esc(String(o.x).replace(/💎/g,'linh thạch '))}</span>`:'',{dis:!o.ok,tip:o.tip});
  return card('Quan ải → '+REG[sc.k].n,r.place.n,b+'</div>',{foot:goBtn('next','Quay lại','','')});
}
function vPrep(sc){
  const r=G.run;const v=prepView();const to=btTarget();
  let b=`<div class="story"><p>Chọn tối đa ba vật phẩm đặt vào ô chuẩn bị. Vật phẩm bị tiêu hao khi bắt đầu, dù thành hay bại.</p></div>`;
  b+=`<div class="slots">${[0,1,2].map(k=>{const i=sc.slots[k];const it=i!=null&&r.pills[i];return it?`<button class="slot on" data-act="prep" data-arg="${i}"${ta(pillTip(it.id,it.q))}>${PILL[it.id].i}<small>${esc(PILL[it.id].n)}</small></button>`:'<span class="slot">＋</span>';}).join('')}</div>`;
  const stg=btStages(to).map(x=>x==='tamma'?'Tâm ma kiếp':'Lôi kiếp '+x.n+' đạo'+(x.waves>1?' × '+x.waves+' đợt':'')).join(', ')||'Không có thiên kiếp';
  b+=`<div class="kv"><div${ta('Tỉ lệ xung quan thành công')}><span>Tỉ lệ thành công</span><b>${Math.round(v.rate*100)}%</b></div><div${ta('Phẩm chất dự kiến nếu thành công\nĐạo cơ hiện có '+v.dao+(v.next?', mốc kế tiếp '+v.next:''))}><span>Phẩm chất dự kiến</span><b>${QNAME[v.q]} (đạo cơ ${v.dao})</b></div><div${ta('Thiên kiếp phải vượt sau khi xung quan')}><span>Thiên kiếp</span><b>${esc(stg)}</b></div>${v.e.guard?'<div><span>Hộ mệnh</span><b>có</b></div>':''}</div>`;
  const L=btItems();
  b+=`<h4 class="sgrp">Túi đồ dùng được</h4><div class="rows">`+(L.length?L.map(({p,i})=>`<button class="row${sc.slots.includes(i)?' taken':''}" data-act="prep" data-arg="${i}"${ta(pillTip(p.id,p.q))}><span class="r-i">${PILL[p.id].i}</span><span class="r-t"><b>${p.q?PQ[p.q]+' ':''}${esc(PILL[p.id].n)}</b><small>${esc(PILL[p.id].d.replace('{x}',pillX(p.id,p.q)))}</small></span></button>`).join(''):'<p class="hint">Không có vật phẩm nào dùng được.</p>')+'</div>';
  return card(to===5?'Độ kiếp phi thăng':'Đột phá '+REALM[to],r.place.n,b,{cls:'tall',foot:`<button class="btn" data-act="next">Để sau</button><span class="grow"></span><button class="btn pri" data-act="prepGo">Bắt đầu</button>`});
}
function vBtres(sc){
  const r=G.run;let b=`<div class="story"><p class="new">${esc(sc.text)}</p></div>`+chipsHTML(sc.chips);
  const more=r.bt&&!sc.done&&r.bt.si<r.bt.stages.length;
  if(more){const st=r.bt.stages[r.bt.si];b+=`<p class="hint">${st==='tamma'?'Tâm ma kiếp: đánh một trận với chính mình.':'Lôi kiếp: '+st.n+' đạo lôi không né được, chỉ đỡ được. Gục là chết thật.'}</p>`;}
  return card(sc.ok?'Đột phá':'Thất bại',r.place.n,b,{foot:goBtn('btGo',more?'Nghênh kiếp':'Tiếp tục')});
}
function vBoard(sc){
  const r=G.run,n=nodeById(sc.id);const open=r.quests.filter(q=>q.state==='open').length;
  let b=`<div class="story"><p>Mấy tờ cáo thị dán chồng lên nhau, giấy đã ngả vàng. Nhận việc thì phải xong trước hạn, thất hứa thì mang tiếng.</p></div><div class="choices">`;
  n.board.list.forEach((q,i)=>{b+=choiceBtn((i+1)+'.','quest',i,esc(q.text),`<span class="cx tm">${q.days} ngày</span><span class="cx">${stoneHTML(q.reward.st)}</span>`,{dis:q.taken||open>=3,tip:q.kind==='diet'?'Tới nơi rồi thăm dò để tìm mục tiêu':'Chỉ cần tới nơi'});});
  return card('Bảng treo thưởng',n.name,b+`</div><p class="hint">Đang nhận ${open}/3 việc.</p>`,{foot:goBtn('next','Quay lại','','')});
}
function vBury(sc){
  const r=G.run,n=nodeById(sc.id);
  let b=`<div class="story"><p>Chọn tối đa ba món. Kiếp sau tới đúng chỗ này, thăm dò sẽ tìm thấy.</p></div><div class="rows">`;
  r.relics.forEach((x,i)=>{const k='r'+i;b+=`<button class="row prow${sc.sel.includes(k)?' taken':''}" data-act="bsel" data-arg="${k}" style="${pcs(x.tier)}"${ta(relicTip(x))}><span class="qi">${relIcon(x)}</span><span class="r-t"><b class="qt">${esc(x.name)}</b><small>${GRADE[x.tier]}</small></span></button>`;});
  r.pills.forEach((x,i)=>{const k='p'+i;b+=`<button class="row${sc.sel.includes(k)?' taken':''}" data-act="bsel" data-arg="${k}"${ta(pillTip(x.id,x.q))}><span class="r-i">${PILL[x.id].i}</span><span class="r-t"><b>${esc(PILL[x.id].n)}</b></span></button>`;});
  return card('Chôn đồ',n.name,b+'</div>',{cls:'tall',foot:`<button class="btn" data-act="next">Thôi</button><span class="grow"></span><button class="btn pri" data-act="buryGo"${sc.sel.length?'':' disabled'}>Chôn</button>`});
}
const SCENE_V={event:vEvent,enc:vEnc,boss:vBoss,reward:vReward,shop:vShop,swap:vSwap,place:vPlace,pass:vPass,prep:vPrep,btres:vBtres,board:vBoard,bury:vBury};

// ---------- hộp thoại ----------
function modalHTML(){
  const m=UI.modal;if(!m)return '';
  if(m.k==='danger'){const n=nodeById(m.id);return `<div class="mbox"><h3>Tử địa</h3><p>${esc(n.name)}: ${esc(dangerWhy(n))} Với ${esc(REALM[G.run.realm])} của ngươi, Bước vào đó, sơ sẩy là hết kiếp này.</p><div class="mb-f"><button class="btn" data-act="modalX">Thôi</button><button class="btn pri" data-act="goSure" data-arg="${n.id}">Vẫn đi</button></div></div>`;}
  if(m.k==='note'){const n=nodeById(m.id);return `<div class="mbox"><h3>Ghi chú · ${esc(n.name)}</h3><p class="hint">Ghim chỉ để nhớ, không đổi đường đi. Để trống rồi lưu là gỡ ghim.</p><input id="noteIn" maxlength="80" value="${esc(noteOf(n.id))}" placeholder="vd: có động phủ, quay lại khi Trúc Cơ"><div class="mb-f"><button class="btn" data-act="modalX">Thôi</button><button class="btn pri" data-act="noteSave" data-arg="${n.id}">Lưu</button></div></div>`;}
  if(m.k==='bq'){const I=bqInfo();const y=clamp(m.y||Math.min(1,I.maxY),0.25,I.maxY);m.y=y;const gain=bqRate()*y*(y<1?0.9:1);const risk=Math.round(bqRisk(y)*100);const cn=curNode();
    return `<div class="mbox bq">${sceneCv('bequan'+G.run.at,G.run.region,'dong','mart','nhan:0.5:0.5:0:bq')}<h3>Bế quan</h3>
     <div class="kv"><div><span>Linh khí nơi này</span><b>${LK_N[lkOf(cn)]}${cn.dp?' · có động phủ':''}${G.bqRoom?' · tĩnh thất tông môn':''}</b></div><div><span>Tốc độ tu luyện</span><b>+${numVN(I.rate)}% mỗi năm</b></div><div><span>Thọ nguyên còn</span><b>${numVN(Math.max(0,I.left))} năm</b></div><div><span>Tới viên mãn cần</span><b>${I.full?'đã viên mãn':'chừng '+numVN(I.need)+' năm'}</b></div></div>
     <label class="rng"><span>Thời gian: <b id="bqY">${durH(y*HY)}</b></span><input type="range" id="bqR" min="0.25" max="${I.maxY}" step="0.25" value="${y}"></label>
     <div class="hbtns"><button data-act="bqSet" data-arg="0.25">3 tháng</button><button data-act="bqSet" data-arg="1">1 năm</button><button data-act="bqSet" data-arg="${Math.min(I.maxY,I.need)}"${I.full?' disabled':''}>Tới viên mãn</button></div>
     <p class="hint" id="bqHint">Tu vi +${numVN(Math.min(100,gain))}%${risk?' · '+risk+'% bị quấy nhiễu giữa chừng':' · yên ổn'}. Xuất quan thì khí huyết, linh lực hồi đầy.</p>
     <div class="mb-f"><button class="btn" data-act="modalX">Thôi</button><button class="btn pri" data-act="bqGo">Nhập định</button></div></div>`;}
  if(m.k==='explore'&&SETTLE.includes(nodeById(G.run.at).type)){const n=nodeById(G.run.at);const X=townStats(n);const tb=UI.tab.ex||'L';const rows=L=>`<div class="kv">${L.map(x=>`<div><span>${esc(x[0])}</span><b>${esc(x[1])}</b></div>`).join('')}</div>`;
    return `<div class="mbox"><h3>${esc(n.name)}</h3>${tabsHTML('ex',[['L','Kiếm được · '+X.L.length],['M','Có thể gặp · '+(X.M.length+X.evs.length)]],tb)}
     ${tb==='L'?`<p class="hint">Những thứ chắc chắn có ở đây. Hàng trên kệ đổi theo tháng, không phải lúc nào cũng đủ.</p>${rows(X.L)}`:`<p class="hint">Chỉ gặp khi có duyên; thường là đồ tốt hơn hàng bày sẵn.</p>${rows(X.M)}${X.evs.length?`<h4 class="sgrp">Chuyện, người có thể gặp</h4><div class="foes">${X.evs.map(t=>`<span class="chip">${esc(t)}</span>`).join('')}</div>`:''}`}
     <div class="mb-f"><button class="btn" data-act="modalX">Đóng</button><button class="btn pri" data-act="exGo">Dạo một vòng · 2 giờ</button></div></div>`;}
  if(m.k==='conghien'){const r=run2();return `<div class="mbox"><h3>Điện cống hiến</h3><p class="hint">Đang có <b>${r.ch||0}</b> cống hiến.</p><h4 class="sgrp">Nộp vật liệu</h4><div class="rows">${Object.keys(CH_GIVE).map(k=>`<button class="row" data-act="chGive" data-arg="${k}"${r.mats[k]?'':' disabled'}><span class="r-i">${MAT[k].i}</span><span class="r-t"><b>${MAT[k].n}</b><small>đang có ${r.mats[k]||0}</small></span><span class="r-x">+${CH_GIVE[k]} cống hiến</span></button>`).join('')}</div><h4 class="sgrp">Đổi thưởng</h4><div class="rows"><button class="row" data-act="chTrade"${(r.ch||0)<15||r.pills.length>=S().pillMax?' disabled':''}><span class="r-t"><b>Một viên đan trung phẩm</b><small>ngẫu nhiên</small></span><span class="r-x">15 cống hiến</span></button></div><div class="mb-f"><button class="btn pri" data-act="modalX">Xong</button></div></div>`;}
  if(m.k==='explore'){const n=nodeById(G.run.at);const X=exploreStats(n);const fp=Math.round(X.fp*100);
    return `<div class="mbox"><h3>Thăm dò · ${esc(n.name)}</h3><div class="kv"><div><span>So với ngươi</span><b>${DTAG[dangerTag(n)]}</b></div><div><span>Linh khí</span><b>${LK_N[lkOf(n)]}</b></div><div><span>Lục soát mà đụng yêu ma</span><b>${fp}%</b></div><div><span>Gặp cơ duyên, kỳ ngộ</span><b>${100-fp}%</b></div><div><span>Lục soát lần này trong tháng</span><b>${n.exploreT===Math.floor(W().t/HM)?Math.min(3,n.explore):0} / 3</b></div></div>
     <h4 class="sgrp">Yêu ma có thể gặp</h4>${X.foes.length?`<div class="foes">${X.foes.map(E=>`<span class="chip">${E.i} ${esc((E.nb&&E.nb[0])||(E.t&&E.t[0])||"Yêu vật")}</span>`).join('')}</div>`:'<p class="hint">Chưa nghe nói tới.</p>'}
     <h4 class="sgrp">Có thể nhận được</h4><div class="kv">${X.mat?`<div><span>${MAT[X.mat].i} ${MAT[X.mat].n}</span><b>50% mỗi lần lục soát</b></div>`:''}<div><span>${MAT.dan.i} Yêu đan</span><b>60% khi hạ yêu thú</b></div><div><span>🥚 Trứng linh thú</span><b>${Math.round(X.egg*100)}% khi hạ yêu thú</b></div><div><span>Đan dược, pháp bảo, công pháp</span><b>tùy kỳ ngộ</b></div></div>
     <div class="mb-f"><button class="btn" data-act="modalX">Đóng</button><button class="btn pri" data-act="exGo">Lục soát · 2 giờ</button></div></div>`;}
  if(m.k==='laibuon'){const L=sellList();return `<div class="mbox"><h3>Lái buôn thu mua</h3><p class="hint">Giá bằng chừng nửa giá mua. Trong túi: ${stoneHTML(G.run.st)}</p><div class="rows">${L.length?L.map(x=>`<button class="row" data-act="sell" data-arg="${x.k}:${x.i}"><span class="r-i">${x.ic}</span><span class="r-t"><b>${esc(x.n)}</b><small>${esc(x.sub)}</small></span><span class="r-x">bán ${stoneHTML(x.p)}</span></button>`).join(''):'<p class="empty">Không có gì để bán.</p>'}</div><div class="mb-f"><button class="btn pri" data-act="modalX">Xong</button></div></div>`;}
  if(m.k==='tram'){const L=stageList(nodeById(G.run.at));return `<div class="mbox"><h3>Trạm dịch</h3><p class="hint">Xe ngựa chỉ tới những thôn trấn ngươi từng đặt chân. Nhanh gấp ba, không bị chặn đường.</p><h4 class="sgrp">Sắm phương tiện riêng</h4><div class="rows">${MOUNT.map(x=>{const own=G.run.mount===x.id;const no=G.run.realm<(x.realm||0);return `<button class="row${own?' taken':''}" data-act="mount" data-arg="${x.id}"${own||no||G.run.st<price(x.p)?' disabled':''}><span class="r-t"><b>${x.n}</b><small>${x.d}${no?' · cần '+REALM[x.realm]:''}</small></span><span class="r-x">${own?'đang dùng':stoneHTML(price(x.p))}</span></button>`;}).join('')}</div><h4 class="sgrp">Thuê xe chuyến</h4><div class="rows">${L.length?L.map(x=>`<button class="row" data-act="stage" data-arg="${x.id}"${G.run.st<x.c?' disabled':''}><span class="r-t"><b>${esc(x.n)}</b><small>${durH(x.h)} đường</small></span><span class="r-x">${stoneHTML(x.c)}</span></button>`).join(''):'<p class="empty">Chưa tới thôn trấn nào khác trong vùng.</p>'}</div><div class="mb-f"><button class="btn" data-act="modalX">Thôi</button></div></div>`;}
  if(m.k==='nhansu'){const n=nodeById(G.run.at);const L=sectPeople(n);return `<div class="mbox"><h3>Nhân sự · ${esc(n.name)}</h3><div class="rows">${L.length?L.map(x=>`<div class="row${x.alive?'':' dim'}"><span class="r-i">${elSeal(x.el)}</span><span class="r-t"><b>${esc(x.ten)}</b><small>${esc(x.tt)}</small></span><span class="r-x">${x.alive?REALM[x.realm]:'đã mất'}</span></div>`).join(''):'<p class="empty">Chưa nghe danh ai nổi bật ở đây.</p>'}</div><div class="mb-f"><button class="btn pri" data-act="modalX">Đóng</button></div></div>`;}
  if(m.k==='pick')return pickModalHTML(m);
  if(m.k==='art')return artModalHTML(m);
  if(m.k==='pham')return phamHelpHTML();
  if(m.k==='res'){return `<div class="mbox"><h3>${esc(m.title)}</h3><p>${esc(m.t)}</p>${chipsHTML(m.chips)}<div class="mb-f"><span class="grow"></span><button class="btn pri" data-act="modalX">Tiếp tục</button></div></div>`;}
  if(m.k==='clog'){const sc=G.run.scene;return `<div class="mbox"><h3>Diễn biến trận</h3><div class="logl">${(sc.log||[]).slice().reverse().map(l=>`<p class="${l.c?'lg-'+l.c:''}">${esc(l.t)}</p>`).join('')}</div><div class="mb-f"><span class="grow"></span><button class="btn pri" data-act="modalX">Đóng</button></div></div>`;}
  return '';
}
