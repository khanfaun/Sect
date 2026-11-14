// ---------- các cảnh hiện đè lên bản đồ ----------
function storyHTML(story){return story.map((x,i)=>{const old=i<story.length-1?' old':'';const neu=i>=UI.lastStory?' new':'';
  if(typeof x==='object')return `<p class="q${old}">${esc(x.q)}</p>`;return `<p class="${old}${neu}">${txt(x)}</p>`;}).join('');}
function card(title,sub,body,o){o=o||{};return `<section class="scard ${o.cls||''}">${o.art||''}<header class="sc-h"><h2>${esc(title)}</h2>${sub?`<small>${esc(sub)}</small>`:''}${o.head||''}${o.x?`<button class="xb sc-x" data-act="closeAll" aria-label="Đóng"${ta('Đóng hẳn, về bản đồ')}>${ic('close')}</button>`:''}</header><div class="sc-b">${body}</div>${o.foot?`<footer class="sc-f">${o.foot}</footer>`:''}</section>`;}
function goBtn(act,label,arg,cls){return `<button class="btn ${cls||'pri'} wide" data-act="${act}"${arg!=null?` data-arg="${arg}"`:''}>${label}</button>`;}
function choiceBtn(n,act,arg,label,extra,o){o=o||{};return `<button class="ch${o.cls?' '+o.cls:''}" data-act="${act}" data-arg="${arg}"${o.dis?' disabled':''}${ta(o.tip)}><span class="cn">${n}</span><span class="ct">${label}</span>${extra||''}</button>`;}
function choiceExtra(c){let x='';const r=G.run;
  if(c.cost){if(c.cost.st){const v=Math.round(c.cost.st*SC[r.region]);x+=`<span class="cx${r.st<v?' no':''}"${ta('Tốn linh thạch')}>${stoneHTML(v)}</span>`;}if(c.cost.mp)x+=`<span class="cx"${ta('Tốn linh lực')}>linh lực ${c.cost.mp}</span>`;if(c.cost.hp)x+=`<span class="cx"${ta('Tốn khí huyết')}>khí huyết ${c.cost.hp}</span>`;}
  if(c.fight)x+=`<span class="cx"${ta('Sẽ phải giao chiến'+(c.fight.spar?' (luận võ, thua không chết)':''))}>giao chiến</span>`;
  return x;}
function vRegionIntro(sc){const r=G.run;const og=ORIGIN.find(o=>o.id===r.origin);
  return `<div class="intro" data-act="regionGo"><div class="in-b"><small>${kiepName(r.kiep)}</small><h1>${esc(r.ten)}</h1><p class="in-o">${esc(og.n)} · quê ở ${esc(r.que)}</p><p class="in-t">${esc(sc.text)}</p>${sc.sub?`<p class="hint">${esc(sc.sub)}</p>`:''}<p class="hint tap">Chạm để lên đường</p></div></div>`;}
function vEvent(sc){
  const r=G.run;const e=EVMAP[sc.id];const st=sc.story;const qi=st.findIndex(x=>typeof x==='object');
  let b=qi<0?`<div class="story">${storyHTML(st)}</div>`:`<div class="story">${storyHTML(st.slice(0,qi))}</div><div class="dlg" id="dlg">${st.slice(qi).map((x,i)=>typeof x==='object'?`<p class="dq">› ${esc(x.q)}</p>`:`<p class="${qi+i>=UI.lastStory?'new':''}">${txt(x)}</p>`).join('')}</div>`;
  if(sc.news&&sc.phase==='choose')b+=`<p class="news"><b>Tin đồn giang hồ:</b> ${esc(sc.news)}</p>`; // chỉ hiện lúc đang chọn, ghi rõ là tin đồn để không lẫn vào lời kể
  b+=chipsHTML(sc.chips);
  if(sc.phase==='choose'){b+='<div class="choices">';let k=1;const VC=visChoices(sc);const anyOk=VC.some(({c})=>!needList(c).some(x=>!x.ok)&&(!c.chk||chkChance(c.chk)>=0.5));for(const {c,i} of VC){const NL=needList(c);const bad=NL.filter(x=>!x.ok);const ck=c.chk?(chkChance(c.chk)>=0.5||!anyOk):true;const dis=bad.length>0||!ck;b+=choiceBtn((k++)+'.','choose',i,esc(T(c.l,sc.v)),choiceExtra(c),{dis,cls:dis?'soft':''});{const bw=bad.filter(x=>!/^linh thạch/.test(x.t));if(bw.length)b+=`<p class="why">(${esc(bw.map(x=>x.t).join(', '))})</p>`;}if(c.chk)b+=`<p class="chreq ${ck?'ok':'bad'}">${CHKN[c.chk[0]]} ${ck?'đạt yêu cầu':'chưa đạt yêu cầu'}</p>`;}b+='</div>';}
  return card(e&&e.n||'Kỳ ngộ',r.place.n,b,{head:sc.phase==='choose'?`<button class="pl-tg" data-act="evMin"${ta('Tạm gác lại để xem bản đồ, túi đồ… rồi quay lại chọn sau')}>Để sau ${ic('down')}</button>`:'',foot:sc.phase==='choose'?'':goBtn('next','Tiếp tục')});
}
function foeLine(en){return `<div class="foe-l"><span class="foe-i">${assetImg('foe',en.k||en.n,en.i)}</span><div><b>${esc(en.n)}</b><small>${elSeal(en.el)} ${esc(en.sub||'')}</small></div></div>`;}
function vEnc(sc){
  const r=G.run,en=sc.en;let b=foeLine(en)+`<div class="story"><p class="new">${txt(sc.text)}</p>${sc.res?`<p class="new">${txt(sc.res)}</p>`:''}</div>`;
  if(sc.done)return card(sc.elite?'Hung địa':'Chạm trán',r.place.n,b+chipsHTML(sc.paid?[chip('💎','−'+sc.paid,'Linh thạch','dn')]:[]),{foot:goBtn('next','Tiếp tục')});
  if(injured())b+=`<p class="cb-warn">Đang mang thương: thua trận này là chết.</p>`;
  const p=Math.round(encSneak(sc)*100);const pay=Math.round(12*SC[r.region]);
  b+=`<div class="choices">${choiceBtn('1.','enc','fight','Xuất thủ','<span class="cx">giao chiến</span>')}${choiceBtn('2.','enc','sneak','Lẩn tránh',`<span class="cx chk"${ta('Dựa vào thân pháp\nThất bại thì vẫn phải đánh')}>thân pháp ${p}%</span>`)}`;
  if(en.f==='nhan'&&!sc.elite&&!encLawful(en))b+=choiceBtn('3.','enc','pay','Nộp tiền mãi lộ',`<span class="cx">${stoneHTML(pay)}</span>`,{dis:r.st<pay});
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
const PGROUP=[['Sự vụ',['board']],['Tông môn',['congmon','join','lib','nhansu','tongviec','conghien','tinhthat']],['Mua bán',['laibuon','taphoa','shop','ghost']],['Nghỉ chân',['tea','inn','tuu','tinh','heal']],['Đi lại',['tram','goback']],['Tu luyện',['khaiphu','thinhgiao']],['Hoang dã',['sanyeu','haithuoc','daokhoang']],['Việc khác',['grave','patron','bury','quyan']]];
const PNOW=['boss','cross','bt','xk'];
const GRP_IC={'Sự vụ':'scroll','Tông môn':'gate','Mua bán':'bag','Nghỉ chân':'tea','Đi lại':'cart','Tu luyện':'seat','Hoang dã':'tree','Việc khác':'more'};
const PL_N={tea:'Trà lâu',inn:'Khách điếm',shop:'Phường thị',board:'Bảng treo thưởng',ghost:'Quỷ thị',join:'Sơn môn',lib:'Tàng Kinh Các',tinh:'Tĩnh tọa',heal:'Dưỡng thương'};
function vPlace(sc){
  const r=G.run,n=nodeById(sc.id),w=W();const acts=placeActs(n).filter(a=>!['bq1','bq3','explore','xk','bt'].includes(a.a));
  const by=k=>acts.find(a=>a.a===k);let k=0;
  const btn=a=>{const qa=a.a==='quyan'&&UI.confirm==='quyan';const x=VENUE_N[a.a]?`<span class="cx">${a.dis?'đang đóng cửa':'chọn việc'}</span>`:(a.x&&!/^(💎|linh thạch )/.test(a.x)?`<span class="cx">${esc(String(a.x).replace(/✨/g,'tu vi ').replace(/🌕/g,'thành công '))}</span>`:'')+(a.h&&!a.dis&&a.a!=='bt'?`<span class="cx tm"${ta('Thời gian sẽ trôi qua')}>${durH(a.h)}</span>`:'');
    return `<button class="ch${a.a==='bt'?' hl big':PNOW.includes(a.a)?' big':''}${a.a==='quyan'||a.dis?' soft':''}" data-act="pact" data-arg="${a.a}"${a.dis?' disabled':''}${ta(a.tip)}><span class="cn">${++k}.</span>${VENUE_N[a.a]&&n.vsp&&n.vsp.k===r.kiep&&n.vsp.v===a.a&&n.vsp.until>w.t?`<span class="ex"${ta('Đang có chuyện đặc biệt, không chờ lâu')}>!</span>`:''}<span class="ct">${esc(qa?'Chắc chắn gác kiếm? Kiếp này sẽ kết thúc':(PL_N[a.a]&&a.l.length>PL_N[a.a].length+6?PL_N[a.a]:a.l))}</span>${x}</button>`;};
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
  const meta=`<div class="pl-meta"><span>${esc(capS(TYPE_NAME[n.type]))}</span><span>${esc(REG[r.region].n)}</span><span class="nc-g dg${dg}"${ta(dangerWhy(n))}><i></i>${esc(DTAG[dg])}</span><span>Linh khí ${esc(LK_N[lkOf(n)].toLowerCase())}</span></div>`;const kv=(M?`<div class="pl-kv"><div><small>Tọa trấn</small><span>${esc(M.luc)}</span></div><div><small>Quy mô</small><span>${esc(M.quy)}</span></div></div>`:'');
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
  let b=`<div class="story"><p>Chọn tối đa năm vật phẩm đặt vào ô chuẩn bị. Vật phẩm bị tiêu hao khi bắt đầu, dù thành hay bại.</p></div>`;
  b+=`<div class="slots">${[0,1,2,3,4].map(k=>{const i=sc.slots[k];const it=i!=null&&r.pills[i];return it?`<button class="slot on" data-act="prep" data-arg="${i}"${ta(pillTip(it.id,it.q))}>${PILL[it.id].i}<small>${esc(PILL[it.id].n)}</small></button>`:'<span class="slot">＋</span>';}).join('')}</div>`;
  const stg=btStages(to).map(x=>x==='tamma'?'Tâm ma kiếp':'Lôi kiếp '+x.n+' đạo'+(x.waves>1?' × '+x.waves+' đợt':'')).join(', ')||'Không có thiên kiếp';
  b+=`<div class="kv"><div${ta('Tỉ lệ xung quan thành công')}><span>Tỉ lệ thành công</span><b>${Math.round(v.rate*100)}%</b></div><div${ta('Phẩm chất dự kiến nếu thành công\nĐạo cơ hiện có '+v.dao+(v.next?', mốc kế tiếp '+v.next:''))}><span>Phẩm chất dự kiến</span><b>${QNAME[v.q]}${v.tcWhy?'':' (đạo cơ '+v.dao+')'}</b></div><div${ta('Thiên kiếp phải vượt sau khi xung quan')}><span>Thiên kiếp</span><b>${esc(stg)}</b></div>${v.e.guard?'<div><span>Hộ mệnh</span><b>có</b></div>':''}</div>`;
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
