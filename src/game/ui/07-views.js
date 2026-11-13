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
  let h=`<div class="hud-top"><button class="hud-av hud-av2${talCls(playerTal())}" data-act="panel" data-arg="char" aria-label="Nhân vật"${ta('Khí huyết '+pctOf(r.hp,s.maxHp)+' (nửa trên)\nLinh lực '+(s.maxMp?pctOf(r.mp,s.maxMp):'chưa có')+' (nửa dưới)\nChạm để mở nhân vật')}>${ring}<span class="hud-avi">${av}</span>${(()=>{const t=playerTal();return t&&t.tier>=0?`<span class="tfr">${talFrameSVG(t,'hudtf')}</span>`:'';})()}</button>
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
  h+=`<div class="mbl">${B('panel','craft',ic('flask'),'Luyện chế: luyện đan, luyện khí từ vật liệu',0,!!r.moving)}${B('bagOpen',null,ic('bag'),'Túi đồ')}<button class="mb${brk?' glow':''}" data-act="hudBq"${bqNo?' disabled':''}${ta(bqNo||(brk?'Bế quan · tu vi viên mãn: vào để đột phá':'Bế quan tu luyện ngay tại đây'))}>${ic('seat')}</button><button class="mb" data-act="cgOpen"${ta('Cảnh giới: các đại cảnh giới, tiểu cảnh giới, phẩm và đột phá')}>${ic('yin')}</button>${typeof DEV!=='undefined'&&DEV?`<button class="mb dev" data-act="devOpen"${ta('Dev test: thử hiệu ứng')}>${ic('bolt')}</button>`:''}</div>`;
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
    if(!here){const p=findPath(r.at,n.id);mid=p?`<span>${ic('pin')}~${Math.round(pathLen(p))} dặm · ${durH(travelHours(p))}</span>`:'<span>Chưa biết đường</span>';}else mid='';
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
