// ---------- màn bản đồ: thẻ trạng thái, nút bản đồ, thẻ địa điểm ----------
function sectText(){const r=G.run;return r.flags.tongmon?'Đệ tử tông môn':'Tán tu · Tự do';}
function clkStr(t){return `<span>ngày ${Math.floor((t%HM)/HD)+1} · tháng ${tMonth(t)+1}</span><b class="ck-y">Năm ${tYear(t)}</b><span>giờ ${gioName(t)}</span>`;}
// thẻ thông tin quận: hiện khi chạm một ô đất trống
function distCardHTML(c){const g=geo(),I=hexInfo(c),r=G.run;
  if(I.sea)return `<div class="dock card nc"><div class="nc-top"><div class="nc-tt"><b>Vô Tận Hải</b><small>biển khơi</small></div><button class="icb" data-act="unsel" aria-label="Đóng">${ic('close')}</button></div><p class="nc-d">Không có đường bộ. Đi ngang qua tốn gấp sáu lần đồng bằng.</p></div>`;
  const d=g.dist[c];const cells=[];for(let i=0;i<g.dist.length;i++)if(g.dist[i]===d&&g.reg[i]===I.reg)cells.push(i);
  const tc={};for(const i of cells){const t=TER_N[g.ter[i]];tc[t]=(tc[t]||0)+1;}const ter=Object.keys(tc).sort((a,b)=>tc[b]-tc[a]).slice(0,3);
  const all=regionOf(I.reg).nodes.filter(n=>g.dist[nodeHex(n)]===d);const kn=all.filter(n=>n.fog>=2||n.memory);
  const dg=kn.length?Math.max(...kn.map(dangerTag)):0;const lk=kn.length?Math.round(kn.reduce((a,n)=>a+lkOf(n),0)/kn.length):1;
  const luc=kn.find(n=>n.type==='tong')||kn.find(n=>n.type==='thanh')||kn.find(n=>n.type==='tran');
  return `<div class="dock card nc"><div class="nc-top"><div class="nc-tt"><b>${esc(I.dist||'Vùng vô danh')}</b><small>quận thuộc ${esc(I.regName)}</small></div><button class="icb" data-act="unsel" aria-label="Đóng">${ic('close')}</button></div>
   <p class="nc-m"><span class="nc-g dg${dg}"><i></i>${kn.length?DTAG[dg]:'chưa rõ'}</span><span>linh khí ${kn.length?LK_N[lk].toLowerCase():'chưa rõ'}</span><span>rộng ${cells.length} ô</span></p>
   <div class="nc-kv"><div><small>Địa thế</small><b>${esc(ter.join(', '))}</b></div><div><small>Trấn giữ</small><b>${luc?esc(placeMeta(luc).luc):'Chưa rõ'}</b></div></div>
   <p class="nc-d sm" style="-webkit-line-clamp:3">${kn.length?'Nơi đã biết ('+kn.length+'/'+all.length+'): '+esc(kn.map(n=>n.name).join(', ')):'Chưa biết nơi nào trong quận này'+(all.length?' (nghe nói có '+all.length+' nơi).':'.')}</p>
   <p class="nc-d sm">Ô đang chọn: ${esc(I.ter.toLowerCase())}, đi qua tốn ${numVN(TER_COST[g.ter[c]])} lần đồng bằng.</p></div>`;}
function hudIsOpen(){return G.run&&G.run.scene?!!UI.hudScene:UI.hudOpen;}
function hudHTML(){
  const r=G.run,s=S(),t=W().t;const left=s.life-r.age;const warn=left<s.life*0.12;const pa=PART[partOf(t)];
  const row=(n,cur,max,cls,txt,tip)=>`<div class="hrow"${ta(tip)}><span class="hn">${sib(n)}${n}</span>${bar(cur,max,cls)}<span class="hv">${txt}</span></div>`;
  const n=curNode();const atDp=n&&n.dp&&!r.moving;const brk=canBreak();const bqNo=bqCan();
  const hurt=wounds().length?' · <b class="bad">'+esc(WOUND[wounds()[0].k].n)+(wounds().length>1?' +'+(wounds().length-1):'')+'</b>':r.hp<s.maxHp*0.35?' · <b class="bad">Khí huyết cạn</b>':'';
  const av=assetImg('hero','me',`<span class="av-txt">${esc((r.ten.split(' ').pop()||'?')[0])}</span>`);
  // khung tròn quanh ảnh: nửa trên khí huyết (xanh, vàng, đỏ theo %), nửa dưới linh lực
  const R=27,HC=Math.PI*R,hp=clamp(r.hp/Math.max(1,s.maxHp),0,1),mp=clamp(r.mp/Math.max(1,s.maxMp),0,1);const hc=hp>0.5?'ok':hp>0.2?'mid':'low';
  const ring=`<svg class="hud-ring" viewBox="0 0 64 64"><path class="bg" d="M5 32A27 27 0 0 1 59 32"/><path class="bg" d="M5 32A27 27 0 0 0 59 32"/>
    <path class="hp ${hc}" d="M5 32A27 27 0 0 1 59 32" stroke-dasharray="${(HC*hp).toFixed(1)} ${HC.toFixed(1)}"/><path class="mp" d="M5 32A27 27 0 0 0 59 32" stroke-dasharray="${(HC*mp).toFixed(1)} ${HC.toFixed(1)}"/></svg>`;
  const tm=r.tamma;
  let h=`<div class="hud-top"><button class="hud-av hud-av2" data-act="panel" data-arg="char" aria-label="Nhân vật"${ta('Khí huyết '+pctOf(r.hp,s.maxHp)+' (nửa trên)\nLinh lực '+(s.maxMp?pctOf(r.mp,s.maxMp):'chưa có')+' (nửa dưới)\nChạm để mở nhân vật')}>${ring}<span class="hud-avi">${av}</span></button>
   <div class="hud-id"><span class="nmrow"><b class="nm">${esc(r.ten)}</b>${btBadge()}</span><span class="rl"${ta(realmLabel()+'\nTu vi '+tvShow()+'%\n'+rootView(r.root).n+': '+r.root.els.map(e=>EL[e].n).join(', '))}>${esc(realmLabel())}</span><small class="${warn?'bad':''}"${ta('Tuổi / thọ nguyên '+s.life+(warn?'\nThọ nguyên sắp cạn!':''))}>${Math.floor(r.age)} tuổi · còn ${Math.max(0,Math.floor(left))} năm${hurt}</small></div><div class="hud-clk3" id="clk"${ta(dateText(t)+'\nBuổi '+pa.n+', mùa '+SEASON[seasonOf(t)])}>${clkStr(t)}</div>
   </div><div class="hud-stats"><span class="hs lc"${ta('Lực chiến: '+rateOf('lc',lucChien()).t+'\nSo với người cùng cảnh giới, tính từ chỉ số chiến đấu và trang bị.')}>${ic('sword')}${RT('lc',lucChien())}</span><span class="hs tu"${ta('Tốc độ tu luyện khi bế quan ở đây: '+rateOf('bq',bqReal(),'toc').t+'\nThổ nạp: '+rateOf('thonap',thonapPct(),'toc').t)}>${ic('seat')}${RT('bq',bqReal(),'toc')}</span><span class="hs tm${tm>=60?' hi':''}"${ta('Tâm ma: '+tmWord(tm).toLowerCase()+'\nĐầy sẽ phải đối mặt với chính mình')}>${ic('skull')}${tmWord(tm)}</span><span class="hs dt"${ta('Đạo tâm: '+rateOf('tam',s.tam,'muc').t+'\nChống ảo cảnh, giúp đột phá')}>${ic('lotus')}${RT('tam',s.tam,'muc')}</span><span class="hs st"${ta('Linh thạch')}><i class="rh"></i>${fmtN(r.st)}</span></div>
   <i class="hud-tv" style="width:${clamp(tvShow(),0,100)}%"${ta('Tu vi '+tvShow()+'%')}></i><i class="hud-ll" style="width:${llShow()}%"${ta('Lịch luyện '+llShow()+'%')}></i>`;
  return h;
}
function statusList(){const r=G.run,s=S(),w=W();const L=[];
  for(const x of wounds())L.push(['bad',WOUND[x.k].n,WOUND[x.k].d+' '+woundText(x)]);
  if(injured())L.push(['bad','Đang mang thương','Thua trận nữa là chết. Dưỡng thương ở động phủ trị ngoại thương, bỏng; y sư ở phường thị trị thêm gãy xương, độc.']);
  if(r.hp<s.maxHp*0.35)L.push(['bad','Khí huyết cạn','Khí huyết dưới 35%. Nghỉ ngơi hoặc dùng đan.']);
  if(r.tamma>=60)L.push(['bad','Tâm ma dày','Tâm ma '+tmWord(r.tamma).toLowerCase()+'. Tĩnh tọa hoặc dưỡng thương để giảm.']);
  if(s.life-r.age<s.life*0.12)L.push(['bad','Thọ nguyên sắp cạn','Còn chừng '+Math.max(0,Math.floor(s.life-r.age))+' năm.']);
  if(entsHere(r.region).some(e=>e.type==='truysat'))L.push(['bad','Bị truy đuổi','Có kẻ đang lần theo dấu ngươi.']);
  for(const p of r.party||[])L.push(['','Đồng hành: '+p.ten,'Còn '+durH(Math.max(0,p.until-w.t))]);
  const pet=typeof petOut==='function'&&r.pets&&r.petOut!=null&&r.pets[r.petOut];if(pet)L.push(['','Linh thú: '+pet.n,pet.rest>w.t?'Đang dưỡng thương, còn '+durH(pet.rest-w.t):'Bậc '+pet.lv+' · '+petFxText(pet)]);
  for(const q of r.quests)if(q.state==='open')L.push(['','Việc: '+q.text,'Còn '+durH(Math.max(0,q.due-w.t))]);
  {const w=tuWhy();if(w)L.push(['bad',isPham()&&!hasTp()?'Chưa có tâm pháp':'Tâm pháp chưa vận hành',w]);const c=tuCapWhy();if(c&&btReadyTv())L.push(['bad','Tâm pháp tới giới hạn',c]);}
  const lk9=lkOn();
  if(canBreak())L.push(lk9?['good','Luyện Khí tầng '+lkTang(),'Có thể đột phá Trúc Cơ ở nơi có động phủ. Khi tầng đang ở đầy thanh, cũng có thể xung kích lên tầng kế: tu trọn tầng càng cao, đột phá càng được nhiều lợi.']:['good','Tu vi viên mãn','Tới nơi có động phủ để đột phá.']);
  else if(btReadyTv()&&llOf()<llNeedBt())L.push(['bad','Lịch luyện chưa đủ',lk9?'Tu vi đủ tầng '+lkTang()+' nhưng lịch luyện chưa theo kịp, chưa đột phá được.':'Tu vi đã viên mãn nhưng lịch luyện mới '+llShow()+'%, cần đầy mới đột phá được.']);
  if(llEff(r.tv)<0.5)L.push(['bad','Bình cảnh','Tu vi bỏ xa lịch luyện: tu vi thực nhận giảm rất mạnh.']);
  return L;}
const WICON={ngoai:'M5 19L19 5M8 8l3 3M13 13l3 3',bong:'M12 3c1 4 5 5 5 10a5 5 0 01-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-5 1-9z',gay:'M6 6l12 12M4 6a2 2 0 114 0 2 2 0 11-4 0M16 18a2 2 0 114 0 2 2 0 11-4 0M11 9l-2 2M15 13l-2 2',
  noi:'M12 20s-7-4.5-7-10a4 4 0 017-2.5A4 4 0 0119 10c0 5.5-7 10-7 10zM12 8l-2 4h4l-2 4',than:'M12 4a8 8 0 100 16 8 8 0 000-16zM12 8a4 4 0 104 4M12 12h.01',doc:'M12 3s6 7 6 11a6 6 0 01-12 0c0-4 6-11 6-11zM10 14h.01M14 14h.01',
  nguy:'M12 4v10M12 18v.5',mu:'M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zM4 4l16 16',cut:'M6 4v8a4 4 0 004 4h2M14 16l5 5M19 16l-5 5',que:'M9 4v9l-3 7M9 13h5l3 7M4 20h16',
  ma:'M6 12a6 6 0 1112 0v3l-2 1v3H8v-3l-2-1zM9.5 12.5h.01M14.5 12.5h.01',tho:'M6 3h12M6 21h12M7 3c0 5 5 6 5 9s-5 4-5 9M17 3c0 5-5 6-5 9s5 4 5 9',truy:'M14 4h6v6L9 21l-2-2-3 1 1-3-2-2L14 4z'};
function durShort(h){if(h<HD)return Math.max(1,Math.round(h))+' giờ';if(h<HM)return Math.round(h/HD)+' ngày';if(h<HY)return Math.round(h/HM)+' th';return numVN(h/HY)+' năm';}
function woundBar(){const r=G.run,s=S(),w=W();const L=[];
  for(const x of wounds()){const D=WOUND[x.k];L.push({k:x.k,t:x.perm?'∞':x.k==='nguy'?durShort(Math.max(1,x.dl-w.t)):durShort(Math.max(1,x.until-w.t)),tip:D.n+'\n'+D.d+'\n'+woundText(x)+(x.perm||x.k==='doc'?'':'\nĐang mang thương: thua trận nữa là chết.'),cls:x.k==='nguy'?'crit':x.perm?'perm':''});}
  if(r.tamma>=60)L.push({k:'ma',t:tmWord(r.tamma),tip:'Tâm ma dày\nĐủ 100 sẽ phải đối mặt với chính mình. Tĩnh tọa, dưỡng thương, bế quan để giảm.',cls:''});
  if(s.life-r.age<s.life*0.12)L.push({k:'tho',t:durShort(Math.max(0,s.life-r.age)*HY),tip:'Thọ nguyên sắp cạn\nĐột phá để sống lâu hơn.',cls:'crit'});
  if(entsHere(r.region).some(e=>e.type==='truysat'))L.push({k:'truy',t:'',tip:'Bị truy đuổi\nCó kẻ đang lần theo dấu ngươi.',cls:''});
  return L.map(x=>`<div class="wi ${x.cls}"${ta(x.tip)}><svg viewBox="0 0 24 24"><path d="${WICON[x.k]}"/></svg><small>${x.t}</small></div>`).join('');}
function mapUiHTML(){
  const r=G.run;const sp=UI.speed||1;
  const B=(act,arg,lab,tip,on,dis)=>`<button class="mb${on?' on':''}" data-act="${act}"${arg!=null?` data-arg="${arg}"`:''}${dis?' disabled':''}${ta(tip)}>${lab}</button>`;
  let h=`<div class="mleft wb">${woundBar()}</div>`;
  h+=`<div class="mright">${B('gridT',null,ic('hex'),CFG.grid?'Ẩn lưới ô':'Hiện lưới ô',CFG.grid)}${B('legendOpen',null,ic('list'),'Chú giải ký hiệu trên bản đồ')}${B('center',null,ic('target'),'Về chỗ ngươi')}</div>`;
  // góc trái dưới: luyện chế, túi đồ, bế quan (nhấp nháy khi đủ điều kiện đột phá)
  const bqNo=bqCan();const brk=canBreak();
  h+=`<div class="mbl">${B('panel','craft',ic('flask'),'Luyện chế: luyện đan, luyện khí từ vật liệu',0,!!r.moving)}${B('bagOpen',null,ic('bag'),'Túi đồ')}<button class="mb${brk?' glow':''}" data-act="hudBq"${bqNo?' disabled':''}${ta(bqNo||(brk?'Bế quan · tu vi viên mãn: vào để đột phá':'Bế quan tu luyện ngay tại đây'))}>${ic('seat')}</button></div>`;
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
    return `<div class="dock loc">${ASSET.place[n.type]?`<span class="loc-pic${n.fog>=2||n.memory?'':' rum'}"><img src="${ASSET.place[n.type]}" alt=""></span>`:''}<span class="lc-n">${esc(n.name)}</span>${here?`<button class="btn pri" data-act="enter">${ENTER_L[n.type]||'Vào'}</button>`:`<button class="btn pri" data-act="go" data-arg="${n.id}"${findPath(r.at,n.id)?'':' disabled'}>Đi tới</button>`}<button class="icb" data-act="cardMax"${ta('Mở rộng')} aria-label="Mở rộng">${ic('up')}</button></div>`;}
  if(n&&n.fog>=1&&Math.floor(n.id/100)===r.region&&!UI.cardMin){
    const I=nodeInfo(n);const here=n.id===r.at;const dg=dangerTag(n);
    let mid='';
    const nt=noteOf(n.id);const M=I.sure?placeMeta(n):null;
    if(!here){const p=findPath(r.at,n.id);mid=p?`<span>${ic('pin')}~${Math.round(pathLen(p))} dặm · ${durH(travelHours(p))}</span>`:'<span>Chưa biết đường</span>';}else mid='<span class="here">Ngươi đang ở đây</span>';
    const eb=[I.info,I.sure?hexInfo(nodeHex(n)).dist:''].filter(Boolean).join(' · ');
    const pimg=ASSET.place[n.type];return `<div class="dock card nc"><div class="nc-head"><div class="nc-pic${I.sure?'':' rum'}">${pimg?`<img src="${pimg}" alt="">`:''}${I.sure?'':'<b>?</b>'}</div>
      <div class="nc-info"><small class="nc-eb">${esc(eb)}</small><b class="nc-nm">${esc(n.name+(I.sure?'':'?'))}</b>
      <div class="nc-chips"><span class="nc-g dg${dg}"${ta(dangerWhy(n))}><i></i>${DTAG[dg]}${I.sure?'':'?'}</span>${I.sure?`<span>Linh khí ${LK_N[lkOf(n)].toLowerCase()}</span>`:''}${mid}</div></div>
      <div class="nc-btns"><button class="icb" data-act="noteEdit" data-arg="${n.id}"${ta('Ghi chú: ghim một dòng lên điểm này')} aria-label="Ghi chú">${ic('pen')}</button><button class="icb" data-act="cardMin"${ta('Thu gọn')} aria-label="Thu gọn">${ic('down')}</button><button class="icb" data-act="unsel" aria-label="Đóng">${ic('close')}</button></div></div>
      ${M?`<div class="nc-kv2"><div><small>Tọa trấn</small><span>${esc(M.luc)}</span></div><div><small>Quy mô</small><span>${esc(M.quy)}</span></div></div>${M.desc?`<p class="nc-d">${esc(M.desc)}</p>`:''}`:'<p class="nc-d">Mới nghe đồn, chưa tận mắt thấy.</p>'}
      ${I.tags.length?`<p class="nc-tags">${I.tags.map(t=>`<span>${esc(t)}</span>`).join('')}</p>`:''}
      ${nt?`<p class="nc-n">${ic('pin')} ${esc(nt)}</p>`:''}
      <div class="nc-b">${here?`<button class="btn pri" data-act="enter">${ENTER_L[n.type]||'Vào'}</button>`:`<button class="btn pri" data-act="go" data-arg="${n.id}"${findPath(r.at,n.id)?'':' disabled'}>Đi tới</button>`}</div></div>`;}
  if(UI.cell!=null)return distCardHTML(UI.cell);
  return '';
}
function navHTML(){
  const r=G.run;const it=[['tong','flag','Tông môn'],['pets','paw','Linh thú'],['journal','book','Sổ tay'],['bonds','people','Giao tình'],['more','more','Thêm']];
  const dot={journal:r&&r.quests.some(q=>q.state==='open'),pets:r&&r.eggs&&r.eggs.length>0};
  return it.map(([k,i,n])=>`<button class="nv${UI.panel===k?' on':''}" data-act="panel" data-arg="${k}">${ib(i)}<span>${n}</span>${dot[k]?`<i class="dot soft"${ta(k==='journal'?'Đang có nhiệm vụ chưa xong':'Có trứng linh thú đang ấp')}></i>`:''}</button>`).join('');
}

// ---------- các cảnh hiện đè lên bản đồ ----------
function storyHTML(story){return story.map((x,i)=>{const old=i<story.length-1?' old':'';const neu=i>=UI.lastStory?' new':'';
  if(typeof x==='object')return `<p class="q${old}">${esc(x.q)}</p>`;return `<p class="${old}${neu}">${txt(x)}</p>`;}).join('');}
function card(title,sub,body,o){o=o||{};return `<section class="scard ${o.cls||''}">${o.art||''}<header class="sc-h"><h2>${esc(title)}</h2>${sub?`<small>${esc(sub)}</small>`:''}${o.head||''}${o.x?`<button class="xb sc-x" data-act="closeAll" aria-label="Đóng"${ta('Đóng hẳn, về bản đồ')}>${ic('close')}</button>`:''}</header><div class="sc-b">${body}</div>${o.foot?`<footer class="sc-f">${o.foot}</footer>`:''}</section>`;}
function goBtn(act,label,arg,cls){return `<button class="btn ${cls||'pri'} wide" data-act="${act}"${arg!=null?` data-arg="${arg}"`:''}>${label}</button>`;}
function choiceBtn(n,act,arg,label,extra,o){o=o||{};return `<button class="ch${o.cls?' '+o.cls:''}" data-act="${act}" data-arg="${arg}"${o.dis?' disabled':''}${ta(o.tip)}><span class="cn">${n}</span><span class="ct">${label}</span>${extra||''}</button>`;}
function choiceExtra(c){let x='';const r=G.run;
  if(c.cost){if(c.cost.st){const v=Math.round(c.cost.st*SC[r.region]);x+=`<span class="cx${r.st<v?' no':''}"${ta('Tốn linh thạch')}>${stoneHTML(v)}</span>`;}if(c.cost.mp)x+=`<span class="cx"${ta('Tốn linh lực')}>linh lực ${c.cost.mp}</span>`;if(c.cost.hp)x+=`<span class="cx"${ta('Tốn khí huyết')}>khí huyết ${c.cost.hp}</span>`;}
  if(c.chk){const p=Math.round(chkChance(c.chk)*100);x+=`<span class="cx chk"${ta('Phép thử '+CHKN[c.chk[0]]+'\nCơ hội thành công '+p+'%')}>${CHKN[c.chk[0]].toLowerCase()} ${p}%</span>`;}
  if(c.fight)x+=`<span class="cx"${ta('Sẽ phải giao chiến'+(c.fight.spar?' (luận võ, thua không chết)':''))}>giao chiến</span>`;
  return x;}
function vRegionIntro(sc){const r=G.run;const og=ORIGIN.find(o=>o.id===r.origin);
  return `<div class="intro" data-act="regionGo"><div class="in-b"><small>${kiepName(r.kiep)}</small><h1>${esc(r.ten)}</h1><p class="in-o">${esc(og.n)} · quê ở ${esc(r.que)}</p><p class="in-t">${esc(sc.text)}</p>${sc.sub?`<p class="hint">${esc(sc.sub)}</p>`:''}<p class="hint tap">Chạm để lên đường</p></div></div>`;}
function vEvent(sc){
  const r=G.run;const e=EVMAP[sc.id];const st=sc.story;const qi=st.findIndex(x=>typeof x==='object');
  let b=qi<0?`<div class="story">${storyHTML(st)}</div>`:`<div class="story">${storyHTML(st.slice(0,qi))}</div><div class="dlg" id="dlg">${st.slice(qi).map((x,i)=>typeof x==='object'?`<p class="dq">› ${esc(x.q)}</p>`:`<p class="${qi+i>=UI.lastStory?'new':''}">${txt(x)}</p>`).join('')}</div>`;
  if(sc.news)b+=`<p class="news"${ta('Tin đồn giang hồ')}>${esc(sc.news)}</p>`;
  b+=chipsHTML(sc.chips);
  if(sc.phase==='choose'){b+='<div class="choices">';let k=1;for(const {c,i} of visChoices(sc)){const NL=needList(c);const bad=NL.filter(x=>!x.ok);b+=choiceBtn((k++)+'.','choose',i,esc(T(c.l,sc.v)),choiceExtra(c),{dis:bad.length>0,cls:bad.length?'soft':''});if(bad.length)b+=`<p class="why">(${esc(bad.map(x=>x.t).join(', '))})</p>`;}b+='</div>';}
  return card(e&&e.n||'Kỳ ngộ',r.place.n,b,{head:sc.phase==='choose'?`<button class="pl-tg" data-act="evMin"${ta('Tạm gác lại để xem bản đồ, túi đồ… rồi quay lại chọn sau')}>Để sau ${ic('down')}</button>`:'',foot:sc.phase==='choose'?'':goBtn('next','Tiếp tục')});
}
function foeLine(en){return `<div class="foe-l"><span class="foe-i">${assetImg('foe',en.k||en.n,en.i)}</span><div><b>${esc(en.n)}</b><small>${elSeal(en.el)} ${esc(en.sub||'')}</small></div></div>`;}
function vEnc(sc){
  const r=G.run,en=sc.en;let b=foeLine(en)+`<div class="story"><p class="new">${txt(sc.text)}</p>${sc.res?`<p class="new">${txt(sc.res)}</p>`:''}</div>`;
  if(sc.done)return card(sc.elite?'Hung địa':'Chạm trán',r.place.n,b+chipsHTML(sc.paid?[chip('💎','−'+sc.paid,'Linh thạch','dn')]:[]),{foot:goBtn('next','Tiếp tục')});
  if(injured())b+=`<p class="cb-warn">Đang mang thương: thua trận này là chết.</p>`;
  const p=Math.round(encSneak(sc)*100);const pay=Math.round(12*SC[r.region]);
  b+=`<div class="choices">${choiceBtn('1.','enc','fight','Xuất thủ','<span class="cx">giao chiến</span>')}${choiceBtn('2.','enc','sneak','Lẩn tránh',`<span class="cx chk"${ta('Dựa vào thân pháp\nThất bại thì vẫn phải đánh')}>thân pháp ${p}%</span>`)}`;
  if(en.f==='nhan'&&!sc.elite)b+=choiceBtn('3.','enc','pay','Nộp tiền mãi lộ',`<span class="cx">${stoneHTML(pay)}</span>`,{dis:r.st<pay});
  return card(sc.elite?'Hung địa':'Chạm trán',r.place.n,b+'</div>');
}
function vBoss(sc){const r=G.run;return card('Sào huyệt',r.place.n,`<div class="foe-l big"><span class="foe-i">${assetImg('foe','_boss',sc.b.i)}</span><div><b>${esc(sc.b.n)}</b><small>Thủ lĩnh vùng ${esc(REG[r.region].n)}</small></div></div><div class="story"><p class="new">${esc(sc.text)}</p></div>`,{foot:goBtn('bossFight','Nghênh chiến')});}
function itemView(p){
  if(p.k==='relic')return {ic:relIcon(p.rel),n:p.rel.name,sub:GRADE[p.rel.tier],tip:relicTip(p.rel),t:p.rel.tier||0};
  if(p.k==='skill'){const sk=SK[p.id];const h=G.run.skills.find(x=>x.id===p.id);return {ic:elSeal(sk.el),n:sk.n,sub:'Bí tịch công pháp · '+PHAM[sk.t],tip:skillTip(sk,h?h.lv+1:1),t:sk.t};}
  if(p.k==='pill')return {ic:PILL[p.id].i,n:(p.q?PQ[p.q]+' ':'')+PILL[p.id].n,sub:PILL[p.id].d.replace('{x}',pillX(p.id,p.q)),tip:pillTip(p.id,p.q),t:p.q||0};
  if(p.k==='pass')return {ic:'🎫',n:p.n,sub:'Lệnh bài thông quan',tip:'Trình ở quan ải để sang '+REG[p.reg].n,t:2};
  return {ic:'💎',n:p.n+' linh thạch',sub:'',tip:''};}
function vReward(sc){
  const r=G.run;let b=`<div class="story"><p class="new">${txt(sc.text)}</p></div>`+chipsHTML(sc.chips);
  if(sc.picks.length){b+=`<p class="hint">${sc.taken<0?'Chọn một món':'Đã chọn'}</p><div class="rows">${sc.picks.map((p,i)=>{const v=itemView(p);const cls=sc.taken===i?' taken':sc.taken>=0?' dim':'';return `<button class="row prow${cls}" data-act="pick" data-arg="${i}"${sc.taken>=0?' disabled':''} style="${v.t!=null?pcs(v.t):''}"${ta(v.tip)}><span class="qi">${v.ic}</span><span class="r-t"><b class="${v.t!=null?'qt':''}">${esc(v.n)}</b><small>${esc(v.sub)}</small></span></button>`;}).join('')}</div>`;}
  return card(sc.kind==='boss'?'Chiến thắng':'Chiến lợi phẩm',r.place.n,b,{foot:goBtn('rcont',sc.picks.length&&sc.taken<0?'Bỏ qua':'Tiếp tục')});
}
function vShop(sc){
  const r=G.run;const tab=UI.tab.shop||'buy';
  let b=`<p class="shop-top">${esc(sc.text)}</p>`+tabsHTML('shop',[['buy','Mua'],['svc','Việc khác']],tab);
  if(tab==='buy'){b+='<div class="grid">';sc.items.forEach((it,i)=>{const v=itemView(it);const no=it.sold||r.st<it.p;
    b+=`<button class="cell qc${it.sold?' sold':''}" data-act="buy" data-arg="${i}"${no?' disabled':''} style="${v.t!=null?pcs(v.t):''}"${ta(v.tip||v.n)}><span class="c-i">${v.ic}</span><span class="c-n${v.t!=null?' qt':''}">${esc(v.n)}</span><span class="c-p">${it.sold?'hết hàng':stoneHTML(it.p)}</span>${!it.sold&&it.qty!=null?`<span class="c-q">còn ${it.qty}</span>`:''}</button>`;});b+=`</div><p class="hint">Chạm giữ một món để xem công dụng. Chạm để mua. Hàng mới sau ${durH(shopResetIn())}.</p>`;}
  else b+=`<div class="rows"><button class="row" data-act="heal"${sc.healed||r.st<sc.heal?' disabled':''}${ta('Hồi đầy khí huyết và linh lực')}><span class="r-i">🩹</span><span class="r-t"><b>Mời y sư trị thương</b><small>Hồi đầy khí huyết, linh lực</small></span><span class="r-x">${sc.healed?'xong':stoneHTML(sc.heal)}</span></button></div>`;
  return card('Phường thị',r.place.n,b,{cls:'tall',x:1,foot:`<span class="grow">Trong túi: ${stoneHTML(r.st)}</span>`+goBtn('next','Rời đi','', 'pri')});
}
function vSwap(sc){
  const r=G.run,sk=SK[sc.id];let b=`<div class="story"><p>Ngươi lĩnh ngộ được <b class="qt" style="${pcs(sk.t)}"${ta(skillTip(sk,1))}>${esc(sk.n)}</b>. Nhưng tâm trí chỉ chứa nổi bốn môn. Quên đi môn nào?</p></div><div class="choices">`;
  r.skills.forEach((k,i)=>{const s0=SK[k.id];b+=choiceBtn(elSeal(s0.el),'swap',i,qName(s0.n,s0.t),'<span class="cx">quên</span>',{tip:skillTip(s0,k.lv)});});
  return card('Lĩnh ngộ','',b+choiceBtn('·','swap',-1,'Không học '+esc(sk.n),'',{cls:'soft'})+'</div>');
}
const PGROUP=[['Sự vụ',['board']],['Tông môn',['congmon','join','lib','nhansu','tongviec','conghien','tinhthat']],['Mua bán',['laibuon','taphoa','shop','ghost']],['Nghỉ chân',['tea','inn','tuu','tinh','heal']],['Đi lại',['tram']],['Tu luyện',['khaiphu','thinhgiao']],['Hoang dã',['sanyeu','haithuoc','daokhoang']],['Việc khác',['grave','patron','bury','quyan']]];
const PNOW=['boss','cross','bt','xk'];
const GRP_IC={'Sự vụ':'scroll','Tông môn':'gate','Mua bán':'bag','Nghỉ chân':'tea','Đi lại':'cart','Tu luyện':'seat','Hoang dã':'tree','Việc khác':'more'};
const PL_N={tea:'Trà lâu',inn:'Khách điếm',shop:'Phường thị',board:'Bảng treo thưởng',ghost:'Quỷ thị',join:'Sơn môn',lib:'Tàng Kinh Các',tinh:'Tĩnh tọa',heal:'Dưỡng thương'};
function vPlace(sc){
  const r=G.run,n=nodeById(sc.id),w=W();const acts=placeActs(n).filter(a=>!['bq1','bq3','explore'].includes(a.a));
  const by=k=>acts.find(a=>a.a===k);let k=0;
  const btn=a=>{const qa=a.a==='quyan'&&UI.confirm==='quyan';const x=VENUE_N[a.a]?`<span class="cx">${a.dis?'đang đóng cửa':'chọn việc'}</span>`:(a.x&&!/^(💎|linh thạch )/.test(a.x)?`<span class="cx">${esc(String(a.x).replace(/✨/g,'tu vi ').replace(/🌕/g,'thành công '))}</span>`:'')+(a.h&&!a.dis&&a.a!=='bt'?`<span class="cx tm"${ta('Thời gian sẽ trôi qua')}>${durH(a.h)}</span>`:'');
    return `<button class="ch${a.a==='bt'?' hl big':PNOW.includes(a.a)?' big':''}${a.a==='quyan'||a.dis?' soft':''}" data-act="pact" data-arg="${a.a}"${a.dis?' disabled':''}${ta(a.tip)}><span class="cn">${++k}.</span><span class="ct">${esc(qa?'Chắc chắn gác kiếm? Kiếp này sẽ kết thúc':(PL_N[a.a]&&a.l.length>PL_N[a.a].length+6?PL_N[a.a]:a.l))}</span>${x}</button>`;};
  let b=sc.venue&&VENUE_N[sc.venue]?venueHTML(n,sc.venue):'';
  // lời kể: cảnh trí và chuyện vừa xảy ra cùng một kiểu chữ, nằm trong một khung cuộn riêng
  // lịch sử: mỗi lần chọn một việc, giữ lại lựa chọn và kết quả (giống hộp thoại sự kiện)
  sc.hist=sc.hist||[];if((sc.msg&&sc.msg.length)||(sc.chips&&sc.chips.length)){const key=(sc.seq||0)+JSON.stringify(sc.msg)+JSON.stringify((sc.chips||[]).map(c=>c.t));if(sc.histK!==key){sc.hist.push({q:UI.lastQ||null,m:sc.msg.slice(),c:(sc.chips||[]).slice()});sc.histK=key;if(sc.hist.length>12)sc.hist.shift();}}
  UI.lastQ=null;
  const tm=!!UI.descHide;const HL=tm?sc.hist.slice(-1):sc.hist;
  b+=`<div class="pl-talkw${tm?' min':''}"><button class="pl-tg2" data-act="descTg"${ta(tm?'Mở rộng hội thoại':'Thu gọn hội thoại: chỉ giữ diễn biến mới nhất')} aria-label="${tm?'Mở rộng':'Thu gọn'}">${ic(tm?'down':'up')}</button><div class="pl-talk" id="plTalk" data-n="${sc.hist.length}"><div class="story">${tm&&HL.length?'':`<p>${txt(sc.intro)}</p>`}${HL.map(h=>(h.q?`<div class="ev-q"><p class="ev-c">› ${esc(h.q)}</p>${h.m.map(m=>`<p>${txt(m)}</p>`).join('')}</div>`:h.m.map(m=>`<p>${txt(m)}</p>`).join(''))+chipsHTML(h.c)).join('')}</div></div></div>`;
  const ents=entsHere(r.region).filter(e=>e.to==null&&e.at===n.id);const qs=r.quests.filter(q=>q.state==='open'&&q.node===n.id);
  const big=PNOW.map(by).filter(Boolean);
  if(qs.length){b+=`<h3 class="grp big">${ib('scroll','gold')}Nhiệm vụ</h3><div class="choices">${qs.map(q=>`<button class="ch qrow qdo" data-act="qDo" data-arg="${q.id}" style="${qpc(questGrade(q))}"><span class="ct">${q.kind==='den'?'Giao tận tay':'Lùng tìm mục tiêu'} · ${esc(q.text)}</span><span class="qmeta"><span class="qgr">${QGRADE[questGrade(q)]}</span>${costHTML(q.kind==='den'?1:2,0)}</span></button>`).join('')}</div>`;}
  if(big.length||ents.length){b+=`<h3 class="grp big">${ib('flag','gold')}Chuyện lớn</h3><div class="choices">${big.map(btn).join('')}
    ${ents.map(e=>`<button class="ch big" data-act="meet" data-arg="${e.id}"${ta(ENT_T[e.type].n+' đang dừng chân ở đây.\nChạm để tới gặp. Họ sẽ rời đi sau '+durH(Math.max(1,e.until-w.t))+'.')}><span class="cn">${++k}.</span><span class="ct">Gặp ${esc(e.name)}</span><span class="cx">${esc(ENT_T[e.type].n.toLowerCase())}</span></button>`).join('')}
    </div>`;}
  const evs=nodeEvs(n);
  if(evs.length){const yl=Math.max(1,Math.round((n.evs.until-w.t)/HY));b+=`<h3 class="grp now">${ib('bell','seal')}Trước mắt<i${ta('Những chuyện này không chờ ai. Bỏ mặc lâu thì tự mất.')}>biến mất sau chừng ${yl} năm</i></h3><div class="choices">${evs.map((id,i)=>`<button class="ch now" data-act="evGo" data-arg="${i}"${ta('Chạm để dính vào chuyện này. Tốn 2 giờ.')}><span class="cn">${++k}.</span><span class="ex">!</span><span class="ct">${esc(EVMAP[id].n||'Một chuyện lạ')}</span></button>`).join('')}</div>`;}
  let g='';for(const [name,ks] of PGROUP){const L=ks.map(by).filter(Boolean);if(!L.length)continue;g+=`<h4 class="sgrp">${ib(GRP_IC[name]||'more','soft')}${name}</h4><div class="choices">${L.map(btn).join('')}</div>`;}
  if(g)b+=`<h3 class="grp">${ib('book','ink')}Thường nhật</h3>`+g;
  const canEx=n.type!=='ai';
  const M=placeMeta(n),dg=dangerTag(n);
  const meta=`<div class="pl-meta"><span>${esc(capS(TYPE_NAME[n.type]))}</span><span>${esc(REG[r.region].n)}</span><span class="nc-g dg${dg}"><i></i>${esc(DANGER[n.danger])}</span><span>Linh khí ${esc(LK_N[lkOf(n)].toLowerCase())}</span></div>`;const kv=(M?`<div class="pl-kv"><div><small>Tọa trấn</small><span>${esc(M.luc)}</span></div><div><small>Quy mô</small><span>${esc(M.quy)}</span></div></div>`:'');
  return card(n.name,'',kv+b,{cls:'tall place',art:ASSET.place[n.type]?`<div class="art strip pimg"><img class="asset" src="${ASSET.place[n.type]}" alt=""></div>`:sceneCv(n.name,r.region,n.type,'strip'),
    head:`<button class="xb sc-x" data-act="leave"${ta('Đóng, rời khỏi nơi này')} aria-label="Đóng">${ic('close')}</button>${meta}`,
    foot:(canEx?`<button class="btn" data-act="exStat"${ta('Xem nơi này có gì: yêu ma, vật liệu, tỉ lệ')}>Thăm dò</button>`:'')+`<span class="grow"></span><button class="btn" data-act="leave">Rời đi</button>`});
}
function vPass(sc){
  const r=G.run;let b=`<div class="story"><p class="new">${txt(sc.text)}</p><p class="hint">Qua ải mất khoảng ${CROSS_M[sc.k]} tháng đường.</p></div><div class="choices">`;let k=1;
  for(const o of passOpts())b+=choiceBtn((k++)+'.','pass',o.a,esc(o.l),o.x?`<span class="cx">${emoTxt(esc(String(o.x)))}</span>`:'',{dis:!o.ok,tip:o.tip});
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
  const r=G.run;let b=`<div class="story"><p class="new">${txt(sc.text)}</p></div>`+chipsHTML(sc.chips);
  const more=r.bt&&!sc.done&&r.bt.si<r.bt.stages.length;
  if(more){const st=r.bt.stages[r.bt.si];b+=`<p class="hint">${st==='tamma'?'Tâm ma kiếp: đánh một trận với chính mình.':esc(stageName(st)+': '+KIEP[st.kind||'loi'].d+' Gục là chết thật.')}</p>`;}
  return card(sc.ok?'Đột phá':'Thất bại',r.place.n,b,{foot:goBtn('btGo',more?'Nghênh kiếp':'Tiếp tục')});
}
function vBoard(sc){
  const r=G.run,n=nodeById(sc.id);const open=r.quests.filter(q=>q.state==='open').length;
  let b=`<div class="story"><p>Mấy tờ cáo thị dán chồng lên nhau, giấy đã ngả vàng. Nhận việc thì phải xong trước hạn, thất hứa thì mang tiếng.</p></div><div class="choices">`;
  b=b.replace('</p></div><div class="choices">',`</p><p class="hint">Bảng thay việc mới sau ${durH(boardLeft(n))}.</p></div><div class="choices">`);
  n.board.list.forEach((q,i)=>{const g=questGrade(q);const exp=q.acc&&W().t>q.acc;const dis=q.taken||open>=3||exp;b+=`<div role="button" class="ch qrow${dis?' qdis':''}${g>=5?' q5':''}"${dis?'':` data-act="quest" data-arg="${i}"`} style="${qpc(g)}"${ta(q.kind==='diet'?'Tới nơi rồi lùng tìm, đánh hạ mục tiêu':'Tới nơi rồi giao tận tay')}><span class="ct">${esc(q.text)}</span><span class="qmeta"><span class="qgr">${QGRADE[g]}</span>${q.special?'<span class="qsp">Đặc biệt</span>':''}<span class="qdl"${ta('Thời gian để làm xong, tính từ lúc nhận')}>làm trong ${durH(q.days*HD)}</span>${q.acc&&!q.taken?`<span class="qdl${exp?'':' hot'}"${ta('Phải nhận trước hạn này')}>${exp?'hết hạn nhận':'hạn nhận còn '+durH(q.acc-W().t)}</span>`:''}${q.cancelled?'<span class="qtk">đã hủy, không nhận lại được</span>':q.taken?'<span class="qtk">đã nhận</span>':''}</span><span class="qrw">${chipsHTML(q.taken?questRewardChips(q):questRewardChipsHidden(q))}</span></div>`;});
  const mine=r.quests.filter(q=>q.state==='open'&&q.from===n.id);
  b+=`</div><p class="hint">Đang nhận ${open}/3 việc.</p>`;
  UI.qOpen=UI.qOpen||{};if(mine.length)b+=`<h4 class="sgrp">Việc đã nhận ở đây</h4><div class="rows">${mine.map(q=>questCardHTML(q)).join('')}</div>`;
  return card('Bảng treo thưởng',n.name,b,{x:1,foot:`<button class="btn" data-act="next">Quay lại</button><span class="grow"></span><button class="btn pri" data-act="openJournal">${ic('book')} Sổ tay</button>`});
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
  const m=UI.modal;if(!m){const r=G.run;if(r&&r.kvPick&&(!r.scene||r.scene.type==='place')&&G.screen==='map')return kvPickHTML();return '';}
  if(m.k==='danger'){const n=nodeById(m.id);return `<div class="mbox"><h3>Tử địa</h3><p>${esc(n.name)}: ${esc(dangerWhy(n))} Với ${esc(realmName())} của ngươi, Bước vào đó, sơ sẩy là hết kiếp này.</p><div class="mb-f"><button class="btn" data-act="modalX">Thôi</button><button class="btn pri" data-act="goSure" data-arg="${n.id}">Vẫn đi</button></div></div>`;}
  if(m.k==='note'){const n=nodeById(m.id);return `<div class="mbox"><h3>Ghi chú · ${esc(n.name)}</h3><p class="hint">Ghim chỉ để nhớ, không đổi đường đi. Để trống rồi lưu là gỡ ghim.</p><input id="noteIn" maxlength="80" value="${esc(noteOf(n.id))}" placeholder="vd: có động phủ, quay lại khi Trúc Cơ"><div class="mb-f"><button class="btn" data-act="modalX">Thôi</button><button class="btn pri" data-act="noteSave" data-arg="${n.id}">Lưu</button></div></div>`;}
  if(m.k==='bq'){const I=bqInfo();const mx=Math.min(5,I.maxY);const y=clamp(m.y==null?Math.min(1,mx):m.y,0,mx);m.y=y;const cn=curNode();const B=bqBits(y,I);const cap=bqCapY();const capP=cap!=null&&mx>0?Math.min(100,cap/mx*100):100;const r=G.run,T=tvPts(r.realm);
    return `<div class="mbox bq">${sceneCv('bequan'+G.run.at,G.run.region,'dong','mart','nhan:0.5:0.5:0:bq')}<h3>Bế quan</h3>
     <div class="kv"><div><span>Nơi bế quan</span>${lkTag(cn)}</div><div><span>Tu vi</span><b>${tvShow()}%</b></div><div><span>Lịch luyện</span><b>${llShow()}%</b></div></div>
     <label class="rng"><span>Thời gian: <b id="bqY">${y>0?durH(y*HY):'0 tháng'}</b></span><input type="range" id="bqR" min="0" max="${mx}" step="0.25" value="${y}" style="--cap:${capP}%;--val:${mx>0?y/mx*100:0}%"></label>
     <div class="hbtns"><button data-act="bqSet" data-arg="0.25">3 tháng</button><button data-act="bqSet" data-arg="0.5"${mx<0.5?' disabled':''}>6 tháng</button><button data-act="bqSet" data-arg="1"${mx<1?' disabled':''}>1 năm</button><button data-act="bqSet" data-arg="${Math.min(mx,bqNeedY())}"${I.full?' disabled':''}>${sgOn()&&sgGate()<sgTh().length?'Tới đầy '+(lkOn()?'tầng':'kỳ'):'Tới viên mãn'}</button></div>
     <div class="bq-res"${ta('Hên xui: mỗi lần bế quan nhận được một số trong khoảng này. Đã gồm phần thổ nạp.')}><small>Nhận được</small><b class="tu-c" id="bqG">${B.g}</b></div>
     <p class="bq-ll ${B.sc}" id="bqS">${B.s}</p>
     <div class="kv"><div><span>Thọ nguyên còn lại</span><b id="bqL" class="${B.lc}">${B.l}</b></div><div><span>${sgOn()&&sgGate()<sgTh().length?'Tới đầy '+(lkOn()?'tầng':'kỳ')+' còn':'Tới viên mãn còn'}</span><b id="bqN">${B.n}</b></div></div>
     <p class="hint" id="bqHint">${B.h}</p>
     ${(()=>{{const cw=tuCapWhy();if(btReadyTv()&&cw)return `<div class="bt-box"><b>${ic('spark')} Tu vi đã viên mãn</b><p class="hint bad">${esc(cw)}</p></div>`;}const lk9=lkOn();const bth=isPham()?'Đủ để xung kích Luyện Khí tầng 1':lk9?'Luyện Khí tầng '+lkTang()+', đủ để đột phá':'Tu vi đã viên mãn';if(btReadyTv()&&llOf()<llNeedBt())return `<div class="bt-box"><b>${ic('spark')} ${bth}</b><p class="hint bad">Lịch luyện chưa theo kịp nên chưa đột phá được. Hãy ra ngoài lịch luyện.</p></div>`;const brk=canBreak();if(!brk)return '';const atDp=(cn&&cn.dp)||isPham();return `<div class="bt-box${atDp?' on':''}"><b>${ic('spark')} ${bth}</b><p class="hint">${isPham()?'Có thể dẫn khí nhập thể ngay tại đây.':atDp?'Nơi này có động phủ, có thể đột phá ngay.':'Phải tới nơi có động phủ mới đột phá được.'}</p><button class="btn ${atDp?'pri glow':''}" data-act="hudBt"${atDp?'':' disabled'}>${isPham()?'Xung kích':'Đột phá'}</button></div>`;})()}
     ${xkBoxHTML()}
     ${m.warn?`<div class="bq-warn"><p><b>Lịch luyện không đủ</b></p><p>Bế quan quá ${durH(cap*HY)} thì gần như không tăng thêm tu vi nữa. Nên ra ngoài lịch luyện trước.</p><p>Vẫn tiếp tục bế quan ${durH(y*HY)}?</p><div class="mb-f"><button class="btn" data-act="bqWarnX">Thôi</button><button class="btn pri" data-act="bqWarnOk">Xác nhận, tiếp tục</button></div></div>`:''}
     <div class="mb-f"><button class="btn" data-act="modalX">Thôi</button><button class="btn pri" id="bqGoB" data-act="bqGo"${y>0?'':' disabled'}>Nhập định</button></div></div>`;}
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
  if(m.k==='tram'||m.k==='vehi'){const n=nodeById(G.run.at);const L=tramStock(n);const r=G.run;const cur=mountOf();
    if(m.k==='vehi'){const v=L[m.i];if(!v)return '';const lock=r.realm<v.realm;const cb=vehBuy(v),cr=vehRent(v);
      return `<div class="mbox veh"><div class="vh-top"><span class="vslot big" style="${pcs(v.tier)}">${ASSET.veh&&ASSET.veh[v.k]?`<img src="${ASSET.veh[v.k]}" alt="">`:ic(v.ic)}</span><div><h3 class="qt" style="${pcs(v.tier)}">${esc(v.n)}</h3><small>${GRADE[v.tier]} · còn ${v.qty}</small></div></div>
       <div class="kv"><div><span>Tốc độ đi đường</span><b>×${numVN(v.m)}</b></div><div><span>Đang dùng</span><b>${cur?esc(cur.n)+' ×'+numVN(cur.m)+(cur.rented?' (thuê)':''):'đi bộ'}</b></div>${lock?`<div><span>Yêu cầu</span><b class="bad">${REALM[v.realm]}</b></div>`:''}</div>
       <div class="veh-b"><button class="btn" data-act="vehGo" data-arg="${m.i}:rent"${lock||v.qty<=0||r.st<cr?' disabled':''}><span>Thuê 1 tháng</span><span class="cost-s"><i class="rh"></i>${cr}</span></button><button class="btn pri" data-act="vehGo" data-arg="${m.i}:buy"${lock||v.qty<=0||r.st<cb?' disabled':''}><span>Mua</span><span class="cost-s"><i class="rh"></i>${fmtN(cb)}</span></button></div>
       <div class="mb-f"><span class="grow">Trong túi: ${stoneHTML(r.st)}</span><button class="btn" data-act="tramBack">Quay lại</button></div></div>`;}
    const S0=stageList(n);const rl=r.rent&&r.rent.until>W().t?r.rent:null;
    return `<div class="mbox tram"><h3>Trạm dịch</h3>
     <div class="vh-cur"><span class="vslot${cur?'':' empty'}" style="${cur?pcs(cur.tier||0):''}">${cur?(ASSET.veh&&ASSET.veh[cur.k]?`<img src="${ASSET.veh[cur.k]}" alt="">`:ic(cur.ic||'run')):ic('walk')}</span><div><b>${cur?esc(cur.n):'Đi bộ'}</b><small>${cur?'Tốc độ ×'+numVN(cur.m)+(cur.rented&&rl?' · thuê, còn '+durH(rl.until-W().t):''):'Chưa có phương tiện'}</small></div></div>
     <h4 class="sgrp">Hàng ở trạm<small>đổi hàng sau ${durH(tramResetIn())}</small></h4>
     <div class="vgrid">${L.map((v,i)=>`<button class="vcell${v.qty<=0?' out':''}${r.realm<v.realm?' lock':''}" data-act="vehi" data-arg="${i}" style="${pcs(v.tier)}"${ta(v.n+' · '+GRADE[v.tier]+'\nTốc độ ×'+numVN(v.m))}><span class="vslot" style="${pcs(v.tier)}">${ASSET.veh&&ASSET.veh[v.k]?`<img src="${ASSET.veh[v.k]}" alt="">`:ic(v.ic)}</span><span class="vn">${esc(v.n)}</span><span class="vq">${v.qty>0?'còn '+v.qty:'hết'}</span></button>`).join('')}</div>
     <h4 class="sgrp">Thuê xe chuyến</h4><div class="rows">${S0.length?S0.map(x=>`<button class="row" data-act="stage" data-arg="${x.id}"${r.st<x.c?' disabled':''}><span class="r-t"><b>${esc(x.n)}</b><small>${durH(x.h)} đường · nhanh gấp ba, không bị chặn</small></span><span class="r-x">${stoneHTML(x.c)}</span></button>`).join(''):'<p class="empty">Chưa tới thôn trấn nào khác trong vùng.</p>'}</div>
     <div class="mb-f"><span class="grow">Trong túi: ${stoneHTML(r.st)}</span><button class="btn" data-act="modalX">Đóng</button></div></div>`;}
  if(m.k==='nhansu'){const n=nodeById(G.run.at);const L=sectPeople(n);return `<div class="mbox"><h3>Nhân sự · ${esc(n.name)}</h3><div class="rows">${L.length?L.map(x=>`<div class="row${x.alive?'':' dim'}"><span class="r-i">${elSeal(x.el)}</span><span class="r-t"><b>${esc(x.ten)}</b><small>${esc(x.tt)}</small></span><span class="r-x">${x.alive?REALM[x.realm]:'đã mất'}</span></div>`).join(''):'<p class="empty">Chưa nghe danh ai nổi bật ở đây.</p>'}</div><div class="mb-f"><button class="btn pri" data-act="modalX">Đóng</button></div></div>`;}
  if(m.k==='pick')return pickModalHTML(m);
  if(m.k==='item')return itemModalHTML(m);
  if(m.k==='th')return thModalHTML(m);
  if(m.k==='art')return artModalHTML(m);
  if(m.k==='pham')return phamHelpHTML();
  if(m.k==='res'){return `<div class="mbox"><h3>${esc(m.title)}</h3><p>${esc(m.t)}</p>${chipsHTML(m.chips)}<div class="mb-f"><span class="grow"></span><button class="btn pri" data-act="modalX">Tiếp tục</button></div></div>`;}
  if(m.k==='clog'){const sc=G.run.scene;return `<div class="mbox"><h3>Diễn biến trận</h3><div class="logl">${(sc.log||[]).slice().reverse().map(l=>`<p class="${l.c?'lg-'+l.c:''}">${esc(l.t)}</p>`).join('')}</div><div class="mb-f"><span class="grow"></span><button class="btn pri" data-act="modalX">Đóng</button></div></div>`;}
  return '';
}

// ---------- bế quan: các con số đổi theo thanh trượt ----------
function bqBits(y,I){I=I||bqInfo();const sp=bqSpan(y);const left=Math.max(0,I.left-y);const need=Math.max(0,bqNeedY()-y);const risk=Math.round(bqRisk(y)*100);
  const r=G.run;const P=tvPts(r.realm)/100;const e0=llEff(r.tv),e1=llEff(Math.min(100,r.tv+sp[1]/P));const cap=bqCapY();
  let st,sc;
  if(r.tv>=100){st='Tu vi đã viên mãn, bế quan thêm không tăng tu vi.';sc='';}
  else if(sgOn()&&sgFull()&&!lkCapped()){st='Tu vi '+sgName(sgTang())+' đã đầy, bế quan thêm không tăng. '+(canBreak()?'Đột phá, hoặc xung kích lên '+(lkOn()?'tầng':'kỳ')+' kế.':'Hãy xung kích lên '+(lkOn()?'tầng':'kỳ')+' kế.');sc='';}
  else if(lkCapped()){st='Tu vi dường như đã chạm tới giới hạn, không nhích thêm được nữa.';sc='mid';}
  else if(y>0&&cap!=null&&y>cap){st=`Lịch luyện không đủ: bế quan quá ${durH(cap*HY)} thì gần như không tăng thêm tu vi.`;sc='bad';}
  else if(e0<0.5){st='Bình cảnh: tu vi đã bỏ lịch luyện quá xa nên bế quan rất chậm. Hãy ra ngoài đánh trận, đi đây đó.';sc='bad';}
  else if(e0<1||e1<0.9){st='Lịch luyện hơi mỏng: bế quan càng lâu càng chậm dần. Nên xen kẽ ra ngoài lịch luyện.';sc='mid';}
  else if(e0>1){st='Lịch luyện dày dặn: bế quan nhanh hơn bình thường.';sc='ok';}
  else{st='Lịch luyện vững vàng: bế quan bình thường.';sc='ok';}
  return {g:y>0?bqGainTxt(sp[0]/P,sp[1]/P):'0% tu vi',s:st,sc:'bq-'+(sc||'n'),l:Math.floor(left)+' năm',lc:left<=10?'lv-bad':left<=30?'lv-mid':'lv-ok',
    n:I.full?(sgOn()&&G.run.tv<100?'đã đầy':'đã viên mãn'):need<=0?'viên mãn':'chừng '+numVN(need)+' năm',h:(y>0?(risk?(risk<10?'Ít khi':risk<30?'Có thể':'Dễ')+' bị quấy nhiễu giữa chừng. ':'Yên ổn, không bị quấy nhiễu. '):'Chọn thời gian bế quan. ')+'Xuất quan thì khí huyết, linh lực hồi đầy.'};}
function bqUpd(y){const B=bqBits(y);const set=(id,t,c)=>{const e=document.getElementById(id);if(e){e.textContent=t;if(c!=null)e.className=c;}};
  set('bqY',y>0?durH(y*HY):'0 tháng');set('bqG',B.g);set('bqS',B.s,'bq-ll '+B.sc);set('bqL',B.l,B.lc);set('bqN',B.n);set('bqHint',B.h);const b=document.getElementById('bqGoB');if(b)b.disabled=!(y>0);
  const R=document.getElementById('bqR');if(R)R.style.setProperty('--val',(+R.max>0?y/+R.max*100:0)+'%');}
function lkTag(n){const m=LK_M[lkOf(n)]*(n&&n.dp?1.15:1)*(G.bqRoom?1.5:1);const c=m>=1.3?'lk-up':m>=0.9?'':m>=0.7?'lk-dn':'lk-bad';
  const t=LK_N[lkOf(n)]+(n&&n.dp?' · có động phủ':'')+(G.bqRoom?' · tĩnh thất tông môn':'');return `<b class="lk ${c}">${t}</b>`;}

// ---------- trà lâu, khách điếm, tửu phường: các lựa chọn ----------
function costHTML(h,st){return `${h?`<span class="cost-t">${ic('hour')}${durH(h)}</span>`:''}${st?`<span class="cost-s"><i class="rh"></i>${st}</span>`:''}`;}
function venueHTML(n,v){const L=venueOpts(n,v);const vi=(n.vin&&n.vin[v])||(n.vin=n.vin||{},n.vin[v]=pick(VENUE_IN[v]));
  return `<div class="venue"><div class="vn-h"><b>${VENUE_N[v]}</b><button class="xb sm" data-act="vclose" aria-label="Rời đi">${ic('close')}</button></div><p class="vn-in">${txt(vi)}</p>
   <div class="vn-l">${L.map((o,i)=>`<button class="vn-o${o.spec?' spec':''}${o.lack||o.no?' dim':''}" data-act="vopt" data-arg="${o.id}"><span class="vn-t"><span class="vn-k">${i+1}.</span>${esc(o.l)}</span>
    <span class="vn-c">${o.spec?`<span class="vn-sp">${ic('hour')}còn ${durH(o.spec)}</span>`:''}${costHTML(o.h,o.st)}${o.req?`<span class="vn-rq${o.lack?' bad':''}">${esc(o.req[2])} ${o.req[1]}</span>`:''}</span></button>`).join('')}</div></div>`;}
// biểu tượng phần nhận được: chỉ biểu tượng và con số
function gainHTML(g){if(!g)return '';const P=tvPts(G.run.realm)/100;const L=[];
  if(g.hp>0)L.push(['heart','hp','+'+Math.max(1,Math.round(g.hp/Math.max(1,S().maxHp)*100))+'%','Khí huyết']);if(g.hpTxt)L.push(['heart','hp',g.hpTxt,'Khí huyết']);
  if(g.mp>0)L.push(['drop','mp','+'+Math.max(1,Math.round(g.mp/Math.max(1,S().maxMp)*100))+'%','Linh lực']);if(g.mpTxt)L.push(['drop','mp',g.mpTxt,'Linh lực']);
  if(g.tamma)L.push(['skull','tm',(g.tamma>0?'▲':'▼'),'Tâm ma']);if(g.tmTxt)L.push(['skull','tm',g.tmTxt,'Tâm ma']);
  if(g.tv)L.push(['spark','tv','+'+Math.max(1,Math.round(lkShowGain(tvGain(g.tv))))+'%','Tu vi']);if(g.ll)L.push(['sword','ll','+'+Math.max(1,Math.round(g.ll*(typeof LL_MUL==='number'?LL_MUL:1)))+'%','Lịch luyện']);
  if(g.st)L.push(['rh','st','+'+g.st,'Linh thạch']);if(g.info)L.push(['eye','in','tin tức','Biết thêm nơi chốn, tin giang hồ']);if(g.txt)L.push(['star','in',g.txt,'']);
  return `<div class="gains">${L.map(([i,c,t,tip])=>`<span class="gn ${c}"${ta(tip)}>${i==='rh'?'<i class="rh"></i>':ic(i)}${esc(t)}</span>`).join('')}</div>`;}
// giải thích các việc trong địa điểm
const PA_INFO={explore:{d:'Đi một vòng quanh đây: có thể gặp cơ duyên, chuyện lạ, hoặc kẻ địch.',g:{txt:'cơ duyên'}},
  shop:{d:'Vào phường thị xem hàng: đan dược, bí tịch, pháp bảo.'},taphoa:{d:'Vào tiệm tạp hóa xem hàng: đan dược, bí tịch, pháp bảo.'},ghost:{d:'Chợ đêm của kẻ không dám ra ánh sáng. Hàng lạ, giá lạ, người càng lạ.'},
  join:{d:'Tới sơn môn xin bái sư. Được nhận thì thành đệ tử, có chỗ tu luyện và cống hiến.'},lib:{d:'Vào Tàng Kinh Các đọc kinh thư, có thể lĩnh hội công pháp.'},
  tinh:{d:'Ngồi xuống tĩnh tọa điều tức: khí huyết hồi gần một nửa, linh lực hồi đầy, tâm ma nguôi bớt.',g:()=>{const s=S(),r=G.run;return {hp:Math.min(s.maxHp-r.hp,Math.round(s.maxHp*0.45)),mp:s.maxMp-r.mp,tamma:-4,tv:2};}},
  heal:{d:'Nằm trong động phủ tĩnh dưỡng: khí huyết, linh lực hồi đầy, thương thế lành dần.',g:()=>{const s=S(),r=G.run;return {hp:s.maxHp-r.hp,mp:s.maxMp-r.mp,tmTxt:'giảm'};}},
  boss:{d:'Bước vào sào huyệt khiêu chiến thủ lĩnh của vùng. Thắng thì có lệnh bài thông quan.'},sanyeu:{d:'Lùng yêu thú quanh đây. Thắng thì được yêu đan, đôi khi có trứng linh thú, và lịch luyện.'},
  haithuoc:{d:'Lần theo mùi thuốc trong rừng, hái linh thảo để luyện đan.',g:{txt:'linh thảo'}},daokhoang:{d:'Gõ đá đoán mạch, đào linh khoáng để luyện khí.',g:{txt:'linh khoáng'}},
  khaiphu:{d:'Đục một động phủ ở đây. Có động phủ mới bế quan, đột phá được.'},bury:{d:'Chôn vật phẩm ở đây cho kiếp sau.'},grave:{d:'Viếng mộ, thắp nén hương.'},patron:{d:'Tới thăm ân nhân.'}};
function confirmHTML(title,d,h,st,g,act,arg){return `<div class="mbox pconf"><h3>${esc(title)}</h3><p>${esc(d)}</p>
   ${h||st?`<div class="pc-row"><small>Tốn</small><span class="cost">${costHTML(h,st)}</span></div>`:''}${g?`<div class="pc-row"><small>Nhận được</small>${gainHTML(g)}</div>`:''}
   <div class="mb-f"><button class="btn" data-act="modalX">Thôi</button><button class="btn pri" data-act="${act}" data-arg="${arg}">Đồng ý</button></div></div>`;}
{const _mh12=modalHTML;modalHTML=function(){const m=UI.modal;const r=G.run;
  if(m&&m.k==='qdo'&&r){const q=r.quests.find(x=>x.id===m.id);if(!q)return '';const den=q.kind==='den';
    return `<div class="mbox pconf"><h3>${den?'Giao tận tay':'Lùng tìm mục tiêu'}</h3><p>${esc(q.text)}.</p><p>${den?'Tìm đúng người nhận, trao tận tay rồi lấy tiền công.':'Lần theo dấu vết trong tờ cáo thị. Tìm ra thì phải đánh một trận. Thắng thì xong việc; thua hoặc bỏ chạy thì nhiệm vụ thất bại.'}</p>
     <div class="pc-row"><small>Tốn</small><span class="cost">${costHTML(den?1:2,0)}</span></div><div class="pc-row"><small>Nhận được</small><span class="qrw">${chipsHTML(questRewardChips(q))}</span></div>
     <div class="mb-f"><button class="btn" data-act="modalX">Thôi</button><button class="btn pri" data-act="qDoGo" data-arg="${q.id}">${den?'Giao':'Đi tìm'}</button></div></div>`;}
  if(m&&m.k==='qdrop'&&r){const q=r.quests.find(x=>x.id===m.id);if(!q)return '';const P=questPenalty(q);
    return `<div class="mbox pconf"><h3>Hủy nhiệm vụ?</h3><p>${esc(q.text)}</p><p>Đã nhận lời thì phải giữ chữ tín. Bỏ ngang thì phải đền một nửa tiền thưởng và mang tiếng thất hứa.</p><div class="pc-row"><small>Bị phạt</small><span class="gains"><span class="gn st"><i class="rh"></i>−${P.st}</span><span class="gn in">nhân quả ${P.karma}</span></span></div><div class="mb-f"><button class="btn" data-act="modalX">Thôi</button><button class="btn pri" data-act="qDropGo" data-arg="${q.id}">Hủy nhiệm vụ</button></div></div>`;}
  if(m&&m.k==='pconf'&&r&&r.scene){const n=nodeById(r.scene.id);const a=placeActs(n).find(x=>x.a===m.a);if(!a)return '';const I=PA_INFO[m.a]||{d:a.tip||''};const g=typeof I.g==='function'?I.g():I.g;
    return confirmHTML(PL_N[m.a]||a.l,I.d,a.h,0,g,'pactGo',m.a);}
  if(m&&(m.k==='vconf'||m.k==='vreq')&&r&&r.scene){const n=nodeById(r.scene.id);const o=venueOpts(n,m.v).find(x=>x.id===m.id);if(!o)return '';
    if(m.k==='vreq')return `<div class="mbox pconf"><h3>${esc(o.l)}</h3><p>${esc(o.d)}</p><div class="pc-row bad"><small>Chưa đủ</small><span>${esc(o.lack||o.no)}</span></div><div class="mb-f"><button class="btn pri" data-act="modalX">Đã hiểu</button></div></div>`;
    return confirmHTML(o.l,o.d,o.h,o.st,o.fight?{st:o.g.st,txt:'phải đánh một trận'}:o.g,'vgo',m.v+':'+m.id);}
  return _mh12();};}

// sự kiện dọc đường của nhiệm vụ
function vQev(sc){const r=G.run;const q=r.quests.find(x=>x.id===sc.q);let b=`<div class="story"><p class="new">${txt(sc.text)}</p></div>${q?`<p class="hint">Nhiệm vụ: ${esc(q.text)}</p>`:''}`;
  if(sc.res){b+=`<div class="story"><div class="ev-q"><p class="ev-c">› ${esc(sc.res.l)}</p><p>${txt(sc.res.t)}</p></div></div>`+chipsHTML(sc.chips);return card('Trên đường làm nhiệm vụ',r.place.n,b,{foot:goBtn('qevDone','Tiếp tục')});}
  b+='<div class="choices">'+qevOpts(sc).map((o,i)=>`<button class="ch${o.lack||o.no?' soft':''}" data-act="qevPick" data-arg="${i}"${o.lack||o.no?' disabled':''}><span class="cn">${i+1}.</span><span class="ct">${esc(o.l)}</span>${o.fight?'<span class="cx">phải đánh</span>':''}${o.h||o.st?`<span class="cx">${costHTML(o.h,o.st)}</span>`:''}${o.lack?`<span class="cx no">${esc(o.lack)}</span>`:''}</button>`).join('')+'</div>';
  return card('Trên đường làm nhiệm vụ',r.place.n,b,{});}
SCENE_V.qev=vQev;

// kỳ ngộ
function vKyngo(sc){const r=G.run;const ev=KYNGO.find(x=>x.id===sc.ev);let b=`<p class="ky-tag${ev.paid?' paid':''}">${ev.paid?'Kỳ ngộ · phải trả giá':'Kỳ ngộ · hữu duyên'/* loại vớ vẩn cũng ghi hữu duyên cho người chơi mắc lừa */}</p><div class="story"><p class="new">${txt(sc.text)}</p></div>`;
  if(sc.res){b+=`<div class="story"><div class="ev-q"><p class="ev-c">› ${esc(sc.res.l)}</p><p>${txt(sc.res.t)}</p></div></div>`+chipsHTML(sc.chips);return card(ev.n,'',b,{cls:'kyngo',foot:goBtn('kyDone','Tiếp tục')});}
  b+='<div class="choices">'+kyOpts(sc).map((o,i)=>`<button class="ch${o.no?' soft':''}" data-act="kyPick" data-arg="${i}"${o.no?' disabled':''}><span class="cn">${i+1}.</span><span class="ct">${esc(o.l)}</span>${o.cost?`<span class="cx no">${esc(o.cost)}</span>`:''}${o.no?`<span class="cx no">${esc(o.no)}</span>`:''}</button>`).join('')+'</div>';
  return card(ev.n,'',b,{cls:'kyngo'});}
SCENE_V.kyngo=vKyngo;
// nhãn trên thanh đầu, cùng hàng tên: bình cảnh (tu vi đầy, lịch luyện chưa đầy) hoặc đột phá (cả hai đầy, nhấp nháy)
function btBadge(){const st=btState();if(!st)return '';const r=G.run;
  if(st==='bc'&&!canBreak()&&lkXkState()&&lkXkState().ll)return `<span class="hbt bc"${ta('Bình cảnh: tu vi đã đầy, không tăng thêm được.\nLịch luyện '+llShow()+'%: cần chừng 65% mới xung kích được.\nHãy ra ngoài lịch luyện: đánh trận, tới nơi mới, quen người mới, làm việc.')}>Bình cảnh</span>`;
  if(st==='bc')return `<span class="hbt bc"${ta('Bình cảnh: tu vi đã đầy, không tăng thêm được.\nLịch luyện '+llShow()+'%: cần đầy mới đột phá được.\nHãy ra ngoài lịch luyện: đánh trận, tới nơi mới, quen người mới, làm việc.')}>Bình cảnh</span>`;
  if(st==='xk')return `<button class="hbt dp" data-act="hudBq"${ta('Tu vi '+sgName(sgTang())+' đã đầy: có thể xung kích lên '+lkXkState().nx+'.\nMở bế quan rồi chọn Xung kích.')}>Xung kích</button>`;
  return `<button class="hbt dp" data-act="hudBq"${ta(isPham()?'Tu vi và lịch luyện đều đầy: có thể xung kích Luyện Khí tầng 1.\nBế quan ở bất cứ đâu để dẫn khí nhập thể.':'Có thể đột phá '+(G.run.realm>=4?'phi thăng':REALM[G.run.realm+1])+'.\nTới nơi có động phủ, mở bế quan rồi chọn Đột phá.')}>${isPham()?'Xung kích':'Đột phá'}</button>`;}
// màn chuẩn bị đột phá: tỉ lệ thành công tách theo từng nguồn, phẩm chất dự kiến cũng vậy
vPrep=function(sc){const r=G.run;const v=prepView();const to=btTarget();const ph=isPham();const P=btParts(sc.slots);const D=daoParts();const e0=btEff(sc.slots);const dD=D.reduce((a,x)=>a+x.v,0);
  let b=`<div class="story"><p>${ph?'Ngồi yên, theo tâm pháp dẫn sợi linh khí đầu tiên vào thân. Thành thì bước vào Luyện Khí; bại thì tổn thương kinh mạch, mất một phần tu vi.':'Chọn tối đa ba vật phẩm đặt vào ô chuẩn bị. Vật phẩm bị tiêu hao khi bắt đầu, dù thành hay bại.'}</p></div>`;
  b+=`<div class="slots">${[0,1,2].map(k=>{const i=sc.slots[k];const it=i!=null&&r.pills[i];return it?`<button class="slot on" data-act="prep" data-arg="${i}"${ta(pillTip(it.id,it.q))}>${PILL[it.id].i}<small>${esc(PILL[it.id].n)}</small></button>`:'<span class="slot">＋</span>';}).join('')}</div>`;
  const stg=btStages(to).map(stageName).join(' → ')||'Không có thiên kiếp';
  b+=`<div class="bt-sum"><div><small>Khả năng thành công</small><b>${btWord(v.rate)}</b></div>${ph?'':`<div><small>Phẩm chất dự kiến</small><b>${QNAME[v.q]}</b></div>`}</div>`;
  b+=`<h4 class="sgrp">Khả năng thành công</h4><div class="bt-parts">${P.map((x,i)=>`<div${ta(x.tip||'')}><span>${esc(x.t)}</span><b class="${i===0?'':x.v>0?'good':'bad'}">${i===0?btWord(x.v/100):partWord(x.v)}</b></div>`).join('')}<div class="tot"><span>Tổng</span><b>${btWord(v.rate)}</b></div></div>`;
  if(!ph){const DL=[{t:'Đạo cơ tích lũy',v:r.dao||0}].concat(e0.dao-dD?[{t:'Linh dược trong ô',v:e0.dao-dD}]:[]).concat(D);
    b+=`<h4 class="sgrp">Đạo cơ · phẩm chất</h4><div class="bt-parts">${DL.filter(x=>x.v).map(x=>`<div><span>${esc(x.t)}</span><b class="${x.v>0?'good':'bad'}">${x.v>0?'▲':'▼'}</b></div>`).join('')}<div><span>Qua thiên kiếp còn trên nửa khí huyết</span><b class="good">▲</b></div></div><p class="hint">Đạo cơ càng vững, phẩm chất càng cao: Nhân Đạo, Địa Đạo rồi Thiên Đạo. Phẩm chất càng cao, chỉ số càng mạnh, thọ nguyên càng dài.</p>`;}
  b+=`<div class="kv"><div${ta('Xung quan thành công thì các kiếp lần lượt kéo tới, từng cái một. Gục giữa kiếp là chết.')}><span>Thiên kiếp</span><b>${esc(stg)}</b></div>${v.e.guard?'<div><span>Hộ mệnh</span><b>Có</b></div>':''}</div>`;
  const L=btItems();
  b+=`<h4 class="sgrp">Túi đồ dùng được</h4><div class="rows">`+(L.length?L.map(({p,i})=>`<button class="row${sc.slots.includes(i)?' taken':''}" data-act="prep" data-arg="${i}"${ta(pillTip(p.id,p.q))}><span class="r-i">${PILL[p.id].i}</span><span class="r-t"><b>${p.q?PQ[p.q]+' ':''}${esc(PILL[p.id].n)}</b><small>${esc(PILL[p.id].d.replace('{x}',pillX(p.id,p.q)))}</small></span></button>`).join(''):'<p class="hint">Không có vật phẩm nào dùng được.</p>')+'</div>';
  return card(ph?'Xung kích Luyện Khí tầng 1':to===5?'Độ kiếp phi thăng':'Đột phá '+REALM[to],r.place.n,b,{cls:'tall',foot:`<button class="btn" data-act="next">Để sau</button><span class="grow"></span><button class="btn pri" data-act="prepGo">Bắt đầu</button>`});};
SCENE_V.prep=vPrep;


// chọn một trong ba tiên thiên khí vận sau khi đột phá đại cảnh giới
function kvPickHTML(){const r=G.run;return `<div class="mbox kvpick"><h3>Khí vận hội tụ</h3><p class="hint">Đột phá thành công, thiên địa cảm ứng. Chọn một tiên thiên khí vận.</p><div class="kvp">${r.kvPick.map((id,i)=>{const d=TT_DEST[id];return `<button class="kvo" data-act="kvPick" data-arg="${i}" style="--pc:${TT_COL[d.rank]}"><span class="kvh"><b>${esc(d.name)}</b><small>${TT_RANK[d.rank]}</small></span><p>${esc(d.description)}</p><p class="kvf">${ttFxText(d).map(esc).join('<br>')}</p></button>`;}).join('')}</div></div>`;}

// nút xung kích tầng Luyện Khí trong bảng bế quan
function xkBoxHTML(){const X=lkXkState();if(!X)return '';const g=sgGate();return `<div class="bt-box${X.ok?' on':''}"><b>${ic('spark')} Xung kích ${esc(X.nx)}</b><p class="hint${X.ok?'':' bad'}">${X.ok?'Thanh tu vi '+sgName(g)+' đã đầy. Dồn linh lực phá quan để lên '+X.nx+' (mất chừng một tháng).':esc(X.why)}</p><button class="btn ${X.ok?'pri':''}" data-act="xkGo"${X.ok?'':' disabled'}>Xung kích</button></div>`;}

// khoảng tu vi nhận được khi bế quan; ở Luyện Khí tính theo tầng (vượt tầng thì nói lên mấy tầng)
function bqGainTxt(a,b){if(!sgOn())return '~'+Math.floor(a)+'% – '+Math.ceil(b)+'% tu vi';const w=sgW();return '~'+Math.floor(a/w*100)+'% – '+Math.ceil(b/w*100)+'% tu vi';}
