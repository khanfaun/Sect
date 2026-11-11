// ---------- các bảng mở từ thanh dưới ----------
function kvRow(n,v,t,cls){return `<div class="kr ${cls||''}"${ta(t)}><span>${n}</span><b>${v}</b></div>`;}
function pChar(){
  const r=G.run,s=S();const tab=UI.tab.char||'base';
  let b=tabsHTML('char',[['base','Căn cơ'],['chu','Chu thiên'],['bag','Túi đồ']],tab);
  if(tab==='base'){
    const og=ORIGIN.find(o=>o.id===r.origin),tr=TRAIT.find(t=>t.id===r.trait),R0=rootView(r.root);
    b+=`<h4 class="sgrp">Căn cơ</h4><div class="hrow"><span class="hn">Tu vi</span>${bar(r.tv,100,'tv')}<span class="hv">${Math.floor(r.tv)}%</span></div>
    <div class="kvl">${kvRow('Cảnh giới',esc(realmLabel()),'Tu vi '+Math.floor(r.tv)+'%')}
    ${kvRow('Tu luyện','+'+numVN(bqRate())+'% mỗi năm','Tốc độ khi bế quan. Phụ thuộc linh căn, ngộ tính, vòng chu thiên')}
    ${kvRow('Đi lại',capS(moveText())+' · '+numVN(walkSpeed()*24)+' dặm mỗi ngày','Tùy thân pháp, cảnh giới và phương tiện. Sắm phương tiện ở Trạm dịch.')}${kvRow('Cống hiến',r.ch||0,'Điểm cống hiến tông môn')}${kvRow('Thần thức',SENSE[r.realm]+' dặm','Tầm nhìn trên bản đồ')}
    ${kvRow('Xuất thân',esc(og.n),og.d)}${kvRow('Mệnh cách',esc(tr.n),tr.d)}
    ${kvRow('Tuổi',Math.floor(r.age)+' / '+s.life,'Hết thọ nguyên là tọa hóa')}${kvRow('Khí huyết',r.hp+' / '+s.maxHp,'Về 0 là chết')}${kvRow('Linh lực',r.mp+' / '+s.maxMp,'Thi triển pháp thuật')}
    ${kvRow('Linh thạch',stoneHTML(r.st))}${kvRow('Đạo cơ',(r.dao||0)+' · '+QNAME[qOf(r.dao||0)],'Điểm đạo cơ quyết định phẩm chất khi đột phá.'+(qNext(r.dao||0)?'\nMốc kế tiếp: '+qNext(r.dao||0)+' điểm':'\nĐã đạt Thiên đạo'))}
    ${kvRow('Nhân quả',karmaName(r.karma)+' ('+r.karma+')','Thiện ác đều có báo')}${kvRow('Tâm ma',r.tamma,'Đủ 100 phải đối mặt với chính mình',r.tamma>=60?'bad':'')}</div>
    <h4 class="sgrp">Tư chất</h4><div class="kvl">${kvRow('Linh căn',r.root.els.map(elSeal).join(' ')+' '+esc(R0.n),ROOT.find(x=>x.id===r.root.id).d)}</div>
    <h4 class="sgrp">Chỉ số</h4><div class="kvl two">${kvRow('Công vật lý',s.atk,'Dùng cho đánh thường và kiếm pháp, quyền cước')}${kvRow('Công phép',s.matk,'Dùng cho pháp thuật')}
    ${kvRow('Thủ',s.def,'Giảm sát thương nhận vào')}${kvRow('Chí mạng',Math.round(s.crit)+'%','Tỉ lệ chí mạng')}${kvRow('Sát thương chí mạng',s.critDmg+'%')}${kvRow('Hộ tâm',s.hoTam,'Giảm sát thương chí mạng nhận vào')}
    ${kvRow('Thân pháp',s.tp,'Tốc độ chạy trên nửa đầu thanh hành động')}${kvRow('Chính xác',s.cx,'Đối phương né khó hơn')}${kvRow('Né',s.ne,'Phải bấm Né đúng lúc mới phát huy hết')}${kvRow('Hồi phục',s.hoi,'Tốc độ trên nửa sau thanh hành động')}
    ${kvRow('Ngộ tính',s.ngo,'Tu luyện nhanh hơn, giải đố, đột phá, luyện chế')}${kvRow('Đạo tâm',s.tam,'Chống ảo cảnh, đột phá')}${kvRow('Khí vận',s.van,'Chí mạng, may mắn')}${kvRow('Đã hạ',r.kills,'Số kẻ địch đã đánh bại')}</div>`;
  }
  if(tab==='chu')b+=chuHTML();
  if(tab==='bag'){
    const AS=atkSlots();
    b+=`<h4 class="sgrp">Pháp thuật <small>${r.skills.length}/4</small></h4><div class="rows">`+r.skills.map(x=>{const sk=SK[x.id];const on=AS.includes(x.id);return `<div class="row"${ta(skillTip(sk,x.lv))}><span class="r-i">${elSeal(sk.el)}</span><span class="r-t"><b>${esc(sk.n)}${x.lv>1?' · bậc '+x.lv:''}</b><small>${skillCost(sk)} linh lực${sk.fx.p?'':' · phòng thủ'}</small></span>${sk.fx.p?`<button class="btn sm${on?' on':''}" data-act="atkslot" data-arg="${x.id}"${ta('Đặt vào nút Tấn công trong trận (tối đa 3)')}>${on?'đang dùng':'đặt'}</button>`:''}</div>`;}).join('')+'</div>';
    b+=`<h4 class="sgrp">Pháp bảo <small>${r.relics.length}</small></h4><div class="grid">`+(r.relics.length?r.relics.map(x=>`<div class="cell"${ta(relicTip(x))}><span class="c-i">${elSeal(x.el||'vo')}</span><span class="c-n">${esc(x.name)}</span><span class="c-p">${GRADE[x.tier]}</span></div>`).join(''):'<p class="hint">Chưa có món nào.</p>')+'</div>';
    b+=`<h4 class="sgrp">Đan dược · phù lục <small>${r.pills.length}/${s.pillMax}</small></h4><div class="rows">`+(r.pills.length?r.pills.map((p,i)=>{const P0=PILL[p.id];const can=P0.w==='any';return `<div class="row"${ta(pillTip(p.id,p.q))}><span class="r-i">${P0.i}</span><span class="r-t"><b>${p.q?PQ[p.q]+' ':''}${esc(P0.n)}</b><small>${esc(P0.d.replace('{x}',pillX(p.id,p.q)))}</small></span>${can?`<button class="btn sm" data-act="usepill" data-arg="${i}">Dùng</button>`:`<small class="r-x">${P0.w==='bt'?'khi đột phá':'trong trận'}</small>`}</div>`;}).join(''):'<p class="hint">Trống.</p>')+'</div>';
    const m=r.mats||{};b+=`<h4 class="sgrp">Vật liệu</h4><div class="grid">${Object.keys(MAT).map(k=>`<div class="cell"${ta(MAT[k].n+'\n'+MAT[k].d)}><span class="c-i">${MAT[k].i}</span><span class="c-n">${MAT[k].n}</span><span class="c-p">${m[k]||0}</span></div>`).join('')}</div>`;
  }
  return win(esc(r.ten),b,{cls:'tall'});
}
// vòng chu thiên: các ô xếp thành vòng quanh đan điền, khí chảy theo chiều kim đồng hồ
function chuHTML(){
  const r=run2();const v=chuView();const n=v.n;const R=104,cx=150,cy=150;const sel=UI.chuSel;
  const P=i=>{const a=-Math.PI/2+i*2*Math.PI/n;return [cx+R*Math.cos(a),cy+R*Math.sin(a)];};
  const LC={1:'var(--jade)',2:'var(--gold)','-1':'var(--seal)',0:'var(--line)'};
  let svg=`<svg class="chu" viewBox="0 0 300 300"><circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="var(--line)" stroke-dasharray="2 5"/>`;
  for(let i=0;i<n;i++){const a=P(i),b=P((i+1)%n);const l=v.links[i];const mx=(a[0]+b[0])/2,my=(a[1]+b[1])/2;const ox=(mx-cx)*0.16,oy=(my-cy)*0.16;
    svg+=`<path d="M${a[0]} ${a[1]} Q${mx+ox} ${my+oy} ${b[0]} ${b[1]}" fill="none" stroke="${LC[l]}" stroke-width="${l?4:1.5}" ${l===-1?'stroke-dasharray="5 4"':''} opacity="${l?0.9:0.6}"/>`;
    if(l)svg+=`<text x="${mx+ox*1.9}" y="${my+oy*1.9+4}" text-anchor="middle" class="chu-l" fill="${LC[l]}">${l===1?'sinh':l===2?'đồng':'khắc'}</text>`;}
  svg+=`<circle cx="${cx}" cy="${cy}" r="30" fill="var(--paper)" stroke="var(--seal)" stroke-width="2"/><text x="${cx}" y="${cy-2}" text-anchor="middle" class="chu-c">Đan</text><text x="${cx}" y="${cy+14}" text-anchor="middle" class="chu-s">đan điền</text>`;
  for(let i=0;i<n;i++){const p=P(i),it=v.it[i];svg+=`<g class="chu-n${sel===i?' sel':''}${it?' on':''}" data-act="chuSel" data-arg="${i}" transform="translate(${p[0]} ${p[1]})"><circle r="24"/>${it?`<text y="7" text-anchor="middle" class="chu-e el-${it.el}">${(EL[it.el]||EL.vo).c}</text>`:'<text y="7" text-anchor="middle" class="chu-p">＋</text>'}<text y="-29" text-anchor="middle" class="chu-i">${i+1}</text></g>`;}
  svg+='</svg>';
  let h=`<p class="hint">Linh khí chảy quanh đan điền theo chiều kim đồng hồ. Ô trước <b class="good">sinh</b> ô sau thì hệ đó mạnh lên, <b class="bad">khắc</b> thì yếu đi. Chạm một ô để đặt công pháp hoặc pháp bảo.</p>${svg}`;
  h+=`<div class="chips"><span class="chip up"${ta('Mỗi mối tương sinh: hệ của ô nhận +6% uy lực, linh lực +3%')}>tương sinh ${v.sinh}</span><span class="chip"${ta('Hai ô cạnh nhau cùng hệ: hệ đó +3% uy lực')}>đồng hệ ${v.dong}</span><span class="chip dn"${ta('Mỗi mối tương khắc: hệ bị khắc −5% uy lực')}>tương khắc ${v.khac}</span><span class="chip ${v.dai?'item':''}"${ta('Kín vòng, không có mối khắc nào và chỉ hở tối đa một mối: tu luyện +15%, khí huyết +8%')}>${v.dai?'Đại chu thiên đã thành':'Đại chu thiên chưa thành'}</span></div>`;
  h+=`<div class="hbtns"><button data-act="chuAuto"${ta('Máy thử xếp sao cho nhiều mối tương sinh nhất')}>Tự xếp</button><button data-act="chuClear">Gỡ hết</button></div>`;
  if(sel!=null&&sel<n){const it=v.it[sel];const pool=chuPool();
    h+=`<h4 class="sgrp">Ô ${sel+1}${it?' · '+esc(it.n):' · trống'}</h4><div class="rows">${it?`<button class="row" data-act="chuPut" data-arg="-1"><span class="r-i">✕</span><span class="r-t"><b>Gỡ ra</b></span></button>`:''}`+
      (pool.length?pool.map((c,i)=>{const x=chuItem(c);return `<button class="row" data-act="chuPut" data-arg="${i}"><span class="r-i">${elSeal(x.el)}</span><span class="r-t"><b>${esc(x.n)}</b><small>${x.k==='s'?'Công pháp':'Pháp bảo'} · hệ ${EL[x.el]?EL[x.el].n:'Vô'}${QUY[x.el]?' (xét như '+EL[QUY[x.el]].n+')':''}</small></span></button>`;}).join(''):'<p class="hint">Không còn món nào để đặt. Học thêm công pháp, tìm thêm pháp bảo.</p>')+'</div>';}
  h+=`<p class="hint">Ngũ hành tương sinh: Mộc → Hỏa → Thổ → Kim → Thủy → Mộc. Hệ Vô không sinh không khắc. Số ô tăng theo cảnh giới (đang có ${n}/8).</p>`;
  return h;
}
function pPets(){
  const r=run2(),w=W();const tab=UI.tab.pets||'out';
  let b=tabsHTML('pets',[['out','Theo bên mình'],['egg','Trứng · Nuôi']],tab);
  if(tab==='out'){
    b+=`<p class="hint">Linh thú mang theo sẽ vào trận cùng ngươi và cho một lợi ích nhỏ. Giữ được tối đa ${PET_MAX} con.</p>`;
    b+=r.pets.length?`<div class="rows">${r.pets.map((p,i)=>{const on=r.petOut===i;const rest=p.rest>w.t;return `<div class="row${on?' taken':''}"><span class="r-i big">${p.i}</span><span class="r-t"><b>${esc(p.n)} · bậc ${p.lv}/${petCap()}</b><small>${elSeal(p.el)} ${petFxText(p)} · sức bằng ${Math.round(petPow(p)*100)}% chủ${rest?' · <span class="bad">dưỡng thương còn '+durH(p.rest-w.t)+'</span>':''}</small>${bar(p.exp,p.lv*3,'tv')}</span><span class="r-x col"><button class="btn sm${on?' on':''}" data-act="petSet" data-arg="${i}">${on?'đang theo':'mang theo'}</button><button class="btn sm" data-act="petFree" data-arg="${i}">${UI.confirm==='free'+i?'chắc chứ?':'thả'}</button></span></div>`;}).join('')}</div>`:'<p class="empty">Chưa có con nào theo ngươi. Hạ yêu thú, đôi khi sẽ nhặt được trứng trong ổ của nó.</p>';
  } else {
    b+=`<h4 class="sgrp">Trứng đang ấp</h4>`+(r.eggs.length?`<div class="rows">${r.eggs.map((e,i)=>`<div class="row"><span class="r-i big">🥚</span><span class="r-t"><b>Trứng ${esc(e.n)}</b><small>${e.t>w.t?'còn '+durH(e.t-w.t)+' nữa thì nở':'sắp nở'}</small></span><button class="btn sm" data-act="petHatch" data-arg="${i}"${r.st<price(10)||r.pets.length>=PET_MAX?' disabled':''}${ta('Dùng linh thạch thúc trứng nở ngay')}>Thúc nở ${stoneHTML(price(10))}</button></div>`).join('')}</div>`:'<p class="hint">Không có trứng nào.</p>');
    const cur=r.petOut!=null&&r.pets[r.petOut];
    b+=`<h4 class="sgrp">Cho ăn${cur?' · '+esc(cur.n):''}</h4>`+(cur?(r.pills.length?`<div class="rows">${r.pills.map((p,i)=>`<button class="row" data-act="petFeed" data-arg="${i}"${ta('Linh thú lớn nhanh hơn. Đang dưỡng thương thì khỏi ngay.')}><span class="r-i">${PILL[p.id].i}</span><span class="r-t"><b>${esc(PILL[p.id].n)}</b><small>cho ${esc(cur.n)} ăn</small></span></button>`).join('')}</div>`:'<p class="hint">Túi không có đan dược nào.</p>'):'<p class="hint">Chọn một con mang theo trước đã.</p>');
  }
  return win('Linh thú',b,{cls:'tall'});
}
function pJournal(){
  const r=G.run,w=W();const tab=UI.tab.journal||'log';
  let b=tabsHTML('journal',[['log','Đời này'],['quest','Việc'],['news','Tin đồn'],['chron','Biên niên']],tab);
  if(tab==='log')b+=`<div class="logl">${r.log.slice().reverse().map(l=>`<p><span>${l.a} tuổi</span>${esc(l.t)}</p>`).join('')}</div>`;
  if(tab==='quest'){const L=r.quests.slice().reverse();b+=L.length?`<div class="rows">${L.map(q=>`<div class="row${q.state==='fail'?' dim':''}"><span class="r-i">${q.state==='done'?ic('check'):q.state==='fail'?ic('close'):ic('hour')}</span><span class="r-t"><b>${esc(q.text)}</b><small>${q.state==='open'?'còn '+durH(Math.max(0,q.due-w.t)):q.state==='done'?'đã xong':'thất hứa'}</small></span></div>`).join('')}</div>`:'<p class="empty">Chưa nhận việc nào. Tìm bảng treo thưởng ở thôn trấn.</p>';}
  if(tab==='news')b+=`<div class="logl">${r.news.length?r.news.slice().reverse().map(l=>`<p><span>${l.a} tuổi</span>${esc(l.t)}</p>`).join(''):'<p class="empty">Chưa nghe được gì. Ghé trà lâu mà hỏi.</p>'}</div>`;
  if(tab==='chron'){const C=w.chron.slice().reverse();b+=C.length?`<div class="logl">${C.map(l=>`<p><span>năm ${l.y}</span>${esc(l.t)}</p>`).join('')}</div>`:'<p class="empty">Thế gian còn yên ả.</p>';}
  return win('Sổ tay',b,{cls:'tall'});
}
function pAffairs(){
  const L=affairs();const f=UI.filter||'all';const cnt=k=>k==='all'?L.length:L.filter(x=>x.cat===k).length;
  let b=`<div class="tabs wrap">${Object.keys(AFF_CAT).map(k=>`<button data-act="filter" data-arg="${k}" class="${k===f?'on':''}">${AFF_CAT[k]} · ${cnt(k)}</button>`).join('')}</div>`;
  const M=L.filter(x=>f==='all'||x.cat===f);
  b+=M.length?`<div class="rows">${M.map(x=>`<button class="row" data-act="affGo" data-arg="${x.x!=null?Math.round(x.x)+','+Math.round(x.y)+','+(x.node!=null?x.node:''):''}"${x.x==null?' disabled':''}><span class="r-i">${x.i}</span><span class="r-t"><b>${esc(x.n)}</b><small>${esc(x.sub)}${x.old?' · nghe '+durH(x.old)+' trước':''}</small></span><span class="r-x">${x.left!=null?'còn chừng '+durH(Math.max(1,x.left)):''}</span></button>`).join('')}</div><p class="hint">Chạm một dòng để xem chỗ đó trên bản đồ. Chỉ hiện những chuyện ngươi tự thấy hoặc đã nghe tin.</p>`:'<p class="empty">Chưa nghe ngóng được gì. Ghé trà lâu, hoặc đi xa hơn.</p>';
  return win('Thiên hạ',b,{cls:'tall'});
}
function pBonds(){
  const r=G.run,w=W();const R=relations();const tab=UI.tab.bonds||'an';
  let b=tabsHTML('bonds',[['an','Ân oán'],['bang','Thiên Kiêu Bảng'],['tong','Tông môn']],tab);
  if(tab==='an'){
    const seed=(s,cls)=>`<div class="row"><span class="r-i">${cls==='an'?ic('people'):ic('sword')}</span><span class="r-t"><b>${esc(s.ten)}</b><small>${cls==='an'?'chịu ơn ngươi: ':'mang thù với ngươi: '}${esc(s.d)} · ${esc(REG[s.r||0].n)}</small></span></div>`;
    b+=`<h4 class="sgrp">Đồng hành</h4>`+(R.party.length?`<div class="rows">${R.party.map(p=>`<div class="row"><span class="r-i">${p.icon}</span><span class="r-t"><b>${esc(p.ten)}</b><small>đi cùng thêm ${durH(Math.max(0,p.until-w.t))}</small></span></div>`).join('')}</div>`:'<p class="hint">Đang đi một mình.</p>');
    b+=`<h4 class="sgrp">Ân tình <small>${R.an.length}</small></h4>`+(R.an.length?`<div class="rows">${R.an.map(s=>seed(s,'an')).join('')}</div>`:'<p class="hint">Chưa ai nợ ngươi điều gì.</p>');
    b+=`<h4 class="sgrp">Oán thù <small>${R.oan.length}</small></h4>`+(R.oan.length?`<div class="rows">${R.oan.map(s=>seed(s,'oan')).join('')}</div>`:'<p class="hint">Chưa kết oán với ai.</p>');
    if(R.nemesis)b+=`<h4 class="sgrp">Kẻ thù truyền kiếp</h4><div class="rows"><div class="row"><span class="r-i">${R.nemesis.i||'🗡️'}</span><span class="r-t"><b>${esc(R.nemesis.n)}</b><small>kẻ đã kết liễu một kiếp trước của ngươi, nay mạnh hơn xưa</small></span></div></div>`;
  }
  if(tab==='bang'){
    b+=r.bang?`<p class="hint">Công bố năm ${r.bang.y||''}, khi ngươi ${r.bang.nam} tuổi</p><div class="rows">${r.bang.ds.map((x,i)=>`<div class="row${x.i<0?' taken':''}"><span class="r-i">${i+1}</span><span class="r-t"><b>${esc(x.ten)}</b></span><span class="r-x">${REALM[x.realm]}</span></div>`).join('')}</div>`:`<p class="hint">Thiên Kiêu Bảng chưa tới kỳ công bố (năm ${w.bangY}).</p>`;
    b+=`<h4 class="sgrp">Thiên kiêu đương thời</h4><div class="rows">${R.rivals.map(x=>`<div class="row${x.alive?'':' dim'}"><span class="r-i">${elSeal(x.el)}</span><span class="r-t"><b>${esc(x.ten)}</b><small>${esc(x.tt)} của ${esc(x.sect)}</small></span><span class="r-x">${x.alive?REALM[x.realm]:'đã mất'}</span></div>`).join('')}</div>`;
  }
  if(tab==='tong'){const AL={chinh:'chính đạo',ta:'tà đạo',ma:'ma đạo',trung:'trung lập'};
    b+=`<p class="hint">${R.mine?'Ngươi là đệ tử tông môn.':'Ngươi là tán tu, chưa vào tông môn nào.'}</p><div class="rows">${R.sects.map(s=>`<div class="row"><span class="r-i">${ic('flag')}</span><span class="r-t"><b>${esc(s.n)}</b><small>${AL[s.al]||s.al||''}</small></span></div>`).join('')}</div>`;}
  return win('Giao tình',b,{cls:'tall'});
}
function pCraft(){
  const r=run2();const m=r.mats;
  let b=`<p class="hint">Vật liệu nhặt được khi thăm dò và hạ yêu thú. Luyện chế tốn thời gian; thất bại mất nửa vật liệu.</p><div class="grid">${Object.keys(MAT).map(k=>`<div class="cell"${ta(MAT[k].n+'\n'+MAT[k].d)}><span class="c-i">${MAT[k].i}</span><span class="c-n">${MAT[k].n}</span><span class="c-p">${m[k]||0}</span></div>`).join('')}</div><div class="rows">`;
  for(const c of CRAFT){const ok=craftOk(c);b+=`<button class="row" data-act="craft" data-arg="${c.id}"${ok&&!r.moving?'':' disabled'}${ta(c.d)}><span class="r-i">${c.i}</span><span class="r-t"><b>${c.n}</b><small>${Object.entries(c.cost).map(([k,v])=>`<span class="${m[k]<v?'bad':''}">${v} ${MAT[k].n.toLowerCase()}</span>`).join(' + ')} · ${durH(c.h)}</small><small>${esc(c.d)}</small></span><span class="r-x">${Math.round(craftRate(c)*100)}%</span></button>`;}
  return win('Luyện chế',b+'</div>',{cls:'tall'});
}
// ---------- bảng "Thêm": lớp bản đồ, chú giải, ghi chú, cấu hình ----------
function seg(key,opts){return `<div class="seg">${opts.map(([v,n])=>`<button data-act="cfg" data-arg='${key}=${JSON.stringify(v)}' class="${CFG[key]===v?'on':''}">${n}</button>`).join('')}</div>`;}
function onoff(key){return seg(key,[[false,'Tắt'],[true,'Bật']]);}
function setRow(n,ctl,tip){return `<div class="set"><span${ta(tip)}>${n}${tip?' '+ic('info','sm'):''}</span>${ctl}</div>`;}
function pMore(){
  const tab=UI.tab.more||'menu';const r=G.run;
  let b=tabsHTML('more',[['menu','Mục lục'],['layer','Bản đồ'],['legend','Chú giải'],['notes','Ghi chú'],['cfg','Cấu hình']],tab);
  if(tab==='menu'){
    b+=`<div class="menu">${[['cfg','gear','Cấu hình','Đồ họa, khung hình, hiển thị, lối chơi'],['layer','layers','Lớp bản đồ','Bật tắt tên, thực thể qua lại'],['legend','list','Chú giải','Ý nghĩa các ký hiệu trên bản đồ'],['notes','pin','Ghi chú','Các điểm ngươi đã ghim'],['help','info','Cách chơi','Tóm tắt luật chơi']].map(([k,i,n,d])=>`<button class="row" data-act="tab" data-arg="more:${k}"><span class="r-i">${ic(i)}</span><span class="r-t"><b>${n}</b><small>${d}</small></span></button>`).join('')}
     <button class="row" data-act="screen" data-arg="title"><span class="r-i">${ic('home')}</span><span class="r-t"><b>Về màn hình đầu</b><small>Kiếp này vẫn được giữ lại</small></span></button></div>`;
  }
  if(tab==='layer')b+=`<div class="sets">${setRow('Tên địa danh',onoff('names'))}${setRow('Thực thể qua lại',onoff('ents'),'Thương đội, thú triều, đệ tử tuần tra, thiên kiêu, dị tượng… đang di chuyển trên bản đồ')}${setRow('Vòng thần thức',onoff('ring'),'Vòng tròn cho biết tầm nhìn hiện tại')}${setRow('Lưới ô lục giác',onoff('grid'),'Lưới ô và ranh giới các quận. Ranh giới đại khu vực luôn hiện.')}${setRow('Dấu ghi chú',onoff('notes'))}${setRow('Địa hình vẽ tay',onoff('terrain'),'Tắt đi thì bản đồ chỉ còn nền giấy trơn, nhẹ máy nhất')}</div>`;
  if(tab==='legend'){const HT=CFG.hideT||{},HE=CFG.hideE||{};const any=Object.keys(HT).length+Object.keys(HE).length>0;
    const gi=(k,c)=>`<svg class="lgi" viewBox="0 0 24 24" style="background:var(--${c})"><path d="${GLYPH[k]}"/></svg>`;
    const ck=(act,k,on,inner)=>`<button class="lgc${on?' on':''}" data-act="${act}" data-arg="${k}"><i class="ckb">${on?ic('check'):''}</i>${inner}</button>`;
    const G1=[['Nơi có người',['tran','thanh','cho','tong','ancu','ai']],['Hoang dã',['rung','nui','song','bien','hoang','dam','thien']],['Tài nguyên',['linhdia','duoc','khoang','dong']],['Hiểm địa',['phe','ma','sao']]];
    b+=`<p class="hint">Bỏ chọn loại nào thì loại đó ẩn khỏi bản đồ (nơi ngươi đang đứng vẫn hiện).</p><div class="hbtns"><button data-act="legAll">${any?'Chọn hết':'Bỏ chọn hết'}</button></div>`;
    for(const [name,ks] of G1)b+=`<h4 class="sgrp">${name}</h4><div class="lgg">${ks.map(k=>ck('legT',k,!HT[k],gi(k,NODE_CAT[k]||'ink')+capS(TYPE_NAME[k]))).join('')}</div>`;
    b+=`<h4 class="sgrp">Thực thể qua lại · ô tròn</h4><div class="lgg">${Object.keys(ENT_T).map(k=>ck('legE',k,!HE[k],`<span class="lge">${ENT_T[k].i}</span>`+ENT_T[k].n)).join('')}</div>
    <h4 class="sgrp">Màu viền · mức nguy hiểm so với ngươi</h4><div class="lgg">${DTAG.map((d,i)=>`<div class="nc-g dg${i}"><i></i>${d}</div>`).join('')}</div>
    <h4 class="sgrp">Linh khí</h4><p class="hint">${LK_N.join(' · ')}: xem trong thẻ địa điểm. Linh khí càng dồi dào, bế quan càng nhanh.</p>
    <h4 class="sgrp">Dấu phụ</h4><div class="lg"><div><i class="sq hollow"></i>Nghe đồn, chưa tận mắt thấy (vị trí có thể lệch)</div><div><i class="sq" style="background:var(--ink3);opacity:.6"></i>Ký ức kiếp trước hoặc tin đã cũ</div><div><i class="dt" style="background:var(--jade)"></i>Có động phủ</div><div><i class="dt" style="background:var(--gold)"></i>Có ghi chú của ngươi</div><div><i class="sq" style="background:var(--ink2);width:8px;height:11px"></i>Có mộ cũ</div><div><i class="rd dash"></i>Thực thể chỉ nghe tin, vị trí lúc nghe</div></div>`;}
  if(tab==='notes'){const N=(G.meta.world.notes)||{};const ks=Object.keys(N);
    b+=`<p class="hint">Chạm một điểm trên bản đồ rồi bấm “Ghi chú” để ghim. Ghim chỉ để nhớ, giữ qua các kiếp. ${ks.length}/50</p>`+(ks.length?`<div class="rows">${ks.map(k=>{const n=nodeById(+k);return `<button class="row" data-act="noteGo" data-arg="${k}"><span class="r-i">${ic('pin')}</span><span class="r-t"><b>${esc(n&&n.fog>=1?n.name:'Một nơi kiếp trước')}</b><small>${esc(N[k])}</small></span></button>`;}).join('')}</div>`:'<p class="empty">Chưa ghim chỗ nào.</p>');}
  if(tab==='help')b+=`<div class="story help"><p><b>Mục tiêu.</b> Tu luyện, đột phá qua các cảnh giới trước khi hết thọ nguyên. Chết thì luân hồi, thế giới vẫn tiếp tục già đi.</p><p><b>Thời gian.</b> Đứng ở bản đồ, 1 giây = 1 giờ. Đi đường, bế quan, đột phá, vượt ải ngốn tháng năm. Mở bảng nào đó thì thời gian dừng.</p><p><b>Bản đồ.</b> Chạm một điểm để xem, bấm “Đi tới”. Tới nơi bấm “Vào” để thăm dò, nghỉ ngơi, mua bán. Chấm xanh ngọc là nơi có động phủ: bế quan và đột phá ở đó.</p><p><b>Chiến đấu.</b> Mỗi bên chạy trên thanh hành động; tới mốc giữa thì ra chiêu. Bị đánh thì bấm “Né” đúng lúc vòng khép lại. Lười thì bật “Tự đánh”.</p><p><b>Vòng chu thiên.</b> Trong bảng Nhân vật: xếp công pháp, pháp bảo quanh đan điền sao cho hệ trước sinh hệ sau.</p><p><b>Linh thú, luyện chế.</b> Hạ yêu thú có khi được trứng và yêu đan. Thăm dò nơi hoang dã được linh thảo, linh khoáng để luyện đan, luyện khí.</p></div>`;
  if(tab==='cfg')b+=cfgHTML();
  return win('Thêm',b,{cls:'tall'});
}
function cfgHTML(){
  const st=UI.tab.cfg||'gfx';const lv=gfxLv();
  let b=`<div class="tabs sub">${[['gfx','Đồ họa'],['view','Hiển thị'],['play','Lối chơi'],['data','Dữ liệu']].map(([k,n])=>`<button data-act="tab" data-arg="cfg:${k}" class="${k===st?'on':''}">${n}</button>`).join('')}</div><div class="sets">`;
  if(st==='gfx')b+=setRow('Mức đồ họa',seg('gfx',[['auto','Tự động'],['low','Tiết kiệm'],['mid','Cân bằng'],['high','Đẹp']]),'Tự động: game tự đo máy và hạ mức khi máy đuối.\nTiết kiệm: không hiệu ứng, chỉ vẽ lại khi có thay đổi; mát máy nhất.')
    +`<p class="hint">Đang chạy ở mức <b>${['tiết kiệm','cân bằng','đẹp'][lv]}</b>.</p>`
    +setRow('Khung hình mỗi giây',seg('fps',[[20,'20'],[30,'30'],[45,'45'],[60,'60']]),'Thấp hơn thì mát máy, đỡ tốn pin. 30 là đủ mượt cho game này.')
    +setRow('Độ nét',seg('dpr',[[0,'Tự động'],[1,'Thường'],[1.5,'Nét'],[2,'Rất nét']]),'Độ nét của bản đồ. Càng nét càng nặng trên màn hình độ phân giải cao.')
    +setRow('Mây trôi',onoff('clouds'),'Bóng mây lướt trên bản đồ')+setRow('Hạt theo mùa',onoff('fx'),'Hoa rơi mùa xuân, đom đóm đêm hè, lá thu, tuyết đông')
    +setRow('Sắc trời theo buổi',onoff('daynight'),'Bản đồ ngả màu theo sáng, chiều, tối, đêm')+setRow('Chuyển động giao diện',onoff('anim'),'Hiệu ứng trượt, mờ dần của các bảng')+setRow('Hiện số khung hình',onoff('showFps'));
  if(st==='view')b+=setRow('Giao diện',seg('theme',[['light','Giấy dó'],['dark','Dạ mặc']]),'Nền sáng hoặc nền tối')+setRow('Cỡ chữ',seg('font',[['m','Vừa'],['l','Lớn'],['xl','Rất lớn']]))
    +setRow('Tên địa danh',onoff('names'))+setRow('Thực thể qua lại',onoff('ents'),'Thương đội, thú triều, tuần tra, thiên kiêu, dị tượng trên bản đồ')+setRow('Vòng thần thức',onoff('ring'))+setRow('Dấu ghi chú',onoff('notes'))+setRow('Địa hình vẽ tay',onoff('terrain'));
  if(st==='play'){const ad=G.meta.opt&&G.meta.opt.userDodge;
    b+=setRow('Tự né',`<div class="seg"><button data-act="autoDodge" data-arg="0" class="${ad?'':'on'}">Tắt</button><button data-act="autoDodge" data-arg="1" class="${ad?'on':''}">Bật</button></div>`,'Bật thì không cần nhấn nút Né.\nLuôn tính như né ở mức khá, trừ đi 10%.')
    +setRow('Tự đánh',onoff('autoFight'),'Máy tự chọn chiêu và tự né trong trận')+setRow('Tốc độ trận',seg('cspeed',[[1,'×1'],[2,'×2'],[3,'×3']]))
    +setRow('Hỏi lại khi vào tử địa',onoff('confirmDanger'))+setRow('Đồng hồ tự chạy',onoff('clockIdle'),'Bật: đứng ở bản đồ thì 1 giây = 1 giờ.\nTắt: thời gian chỉ trôi khi ngươi làm việc gì đó.');}
  if(st==='data')b+=`</div><div class="menu"><button class="row" data-act="exp"><span class="r-i">${ic('book')}</span><span class="r-t"><b>Lấy mã lưu</b><small>Sao chép để cất hoặc chuyển sang máy khác</small></span></button><button class="row" data-act="imp"><span class="r-i">${ic('down')}</span><span class="r-t"><b>Nạp mã lưu</b></span></button><button class="row" data-act="wipe"><span class="r-i">${ic('trash')}</span><span class="r-t"><b class="bad">${UI.confirm==='wipe'?'Bấm lần nữa để xóa hết, không hoàn tác':'Xóa toàn bộ dữ liệu'}</b></span></button></div>
    ${UI.code!=null?`<textarea id="code" rows="4" placeholder="Dán mã lưu vào đây">${esc(UI.code)}</textarea>${UI.codeMode==='imp'?goBtn('impGo','Nạp'):''}`:''}${UI.msg?`<p class="hint">${esc(UI.msg)}</p>`:''}<div>`;
  return b+`</div><p class="hint ver">Phù Sinh · bản 3 · cấu hình đồ họa lưu riêng trên từng máy.</p>`;
}
const PANEL_V={char:pChar,pets:pPets,journal:pJournal,affairs:pAffairs,bonds:pBonds,more:pMore,craft:pCraft};
