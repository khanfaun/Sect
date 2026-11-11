// ---------- các bảng mở từ thanh dưới ----------
function kvRow(n,v,t,cls){return `<div class="kr ${cls||''}"${ta(t)}><span>${sib(n)}${n}</span><b>${v}</b></div>`;}
function sgBox(icon,name,rows,two){return `<section class="sgbox"><h4 class="sgrp">${ib(icon,'soft')}${name}</h4><div class="kvl${two?' two':''}">${rows.join('')}</div></section>`;}
function pChar(){
  const r=G.run,s=S();let tab=UI.tab.char||'base';if(tab==='chu')tab='hoc';
  let b=tabsHTML('char',[['base','Căn cơ'],['bag','Túi đồ'],['hoc','Sở học'],['kn','Kỹ năng']],tab);
  if(tab==='base'){
    const og=ORIGIN.find(o=>o.id===r.origin),tr=TRAIT.find(t=>t.id===r.trait),R0=rootView(r.root);
    b+=`<div class="hrow tvrow"><span class="hn">${sib('Tu vi')}Tu vi</span>${bar(r.tv,100,'tv')}<span class="hv">${Math.floor(r.tv)}%</span></div><div class="basegrid">`;
    b+=sgBox('yin','Tu hành',[kvRow('Cảnh giới',esc(realmLabel()),'Tu vi '+Math.floor(r.tv)+'%'),
      kvRow('Linh căn',r.root.els.map(elSeal).join(' ')+' '+esc(R0.n),ROOT.find(x=>x.id===r.root.id).d),
      kvRow('Tu luyện','+'+numVN(bqRate())+'% mỗi năm','Tốc độ khi bế quan. Phụ thuộc linh căn, ngộ tính, vòng vận công'),
      kvRow('Đạo cơ',(r.dao||0)+' · '+QNAME[qOf(r.dao||0)],'Điểm đạo cơ quyết định phẩm chất khi đột phá.'+(qNext(r.dao||0)?'\nMốc kế tiếp: '+qNext(r.dao||0)+' điểm':'\nĐã đạt Thiên đạo'))]);
    b+=sgBox('heart','Sinh mệnh',[kvRow('Tuổi',Math.floor(r.age)+' / '+s.life,'Hết thọ nguyên là tọa hóa'),kvRow('Tâm ma',r.tamma,'Đủ 100 phải đối mặt với chính mình',r.tamma>=60?'bad':''),
      kvRow('Khí huyết',r.hp+' / '+s.maxHp,'Về 0 là chết'),kvRow('Linh lực',r.mp+' / '+s.maxMp,'Thi triển pháp thuật')],true);
    b+=sgBox('sword','Công kích',[kvRow('Công vật lý',s.atk,'Dùng cho đánh thường và kiếm pháp, quyền cước'),kvRow('Công phép',s.matk,'Dùng cho pháp thuật'),
      kvRow('Chí mạng',Math.round(s.crit)+'%','Tỉ lệ chí mạng'),kvRow('ST chí mạng',s.critDmg+'%','Sát thương khi chí mạng'),
      kvRow('Chính xác',s.cx,'Đối phương né khó hơn'),kvRow('Niệm lực',s.than,'Sức mạnh thần thức. Hơn đối thủ thì đòn thần thức làm choáng được. Tăng theo cảnh giới, ngộ tính và tâm pháp.')],true);
    b+=sgBox('shield','Phòng ngự',[kvRow('Thủ',s.def,'Giảm sát thương nhận vào'),kvRow('Hộ tâm',s.hoTam,'Giảm sát thương chí mạng nhận vào'),
      kvRow('Né',s.ne,'Phải bấm Né đúng lúc mới phát huy hết'),kvRow('Thân pháp',s.tp,'Tốc độ chạy trên nửa đầu thanh hành động'),kvRow('Hồi phục',s.hoi,'Tốc độ trên nửa sau thanh hành động')],true);
    b+=sgBox('star','Thiên phú',[kvRow('Ngộ tính',s.ngo,'Tu luyện nhanh hơn, giải đố, đột phá, luyện chế'),kvRow('Đạo tâm',s.tam,'Chống ảo cảnh, đột phá'),kvRow('Khí vận',s.van,'Chí mạng, may mắn')],true);
    b+=sgBox('walk','Hành tẩu',[kvRow('Đi lại',capS(moveText())+' · '+numVN(walkSpeed()*24)+' dặm/ngày','Tùy thân pháp, cảnh giới và phương tiện. Sắm phương tiện ở Trạm dịch.'),kvRow('Thần thức',SENSE[r.realm]+' dặm','Tầm nhìn trên bản đồ')]);
    b+=sgBox('flag','Thân thế',[kvRow('Xuất thân',esc(og.n),og.d),kvRow('Mệnh cách',esc(tr.n),tr.d),kvRow('Nhân quả',karmaName(r.karma)+' ('+r.karma+')','Thiện ác đều có báo'),
      kvRow('Cống hiến',r.ch||0,'Điểm cống hiến tông môn'),kvRow('Đã hạ',r.kills,'Số kẻ địch đã đánh bại')]);
    b+='</div>';
  }
  if(tab==='bag')b+=bagTabHTML();
  if(tab==='hoc')b+=hocTabHTML();
  if(tab==='kn')b+=knTabHTML();
  return win(esc(r.ten),b,{cls:'tall wide'});
}
// nút X nhỏ ở góc ô để gỡ / tháo
function slotX(act,arg,tip){return `<span class="slx" data-act="${act}" data-arg="${arg}" role="button" aria-label="${tip||'Gỡ'}"${ta(tip||'Gỡ ra')}>${ic('close')}</span>`;}
// vòng vận công: các ô xếp thành vòng quanh đan điền, khí chảy theo chiều kim đồng hồ
function chuHTML(){
  const r=run2();const v=chuView();const n=v.n;const R=128,cx=160,cy=160,RD=56;
  const P=i=>{const a=-Math.PI/2+i*2*Math.PI/n;return [cx+R*Math.cos(a),cy+R*Math.sin(a)];};
  const LC={1:'var(--jade)',2:'var(--gold)','-1':'var(--seal)',0:'var(--line)'};
  const HY2=chuHuyet();
  let svg=`<svg class="chu" viewBox="0 0 320 320"><defs><radialGradient id="ddg"><stop offset="0.55" stop-color="#6fb6ea" stop-opacity=".0"/><stop offset="0.8" stop-color="#6fb6ea" stop-opacity=".28"/><stop offset="1" stop-color="#6fb6ea" stop-opacity="0"/></radialGradient></defs>
   <circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="var(--line)" stroke-dasharray="2 6"/>`;
  for(let i=0;i<n;i++){if(!v.it[i])continue;const p=P(i),a=Math.atan2(p[1]-cy,p[0]-cx);const x0=cx+Math.cos(a)*(RD+4),y0=cy+Math.sin(a)*(RD+4),x1=p[0]-Math.cos(a)*19,y1=p[1]-Math.sin(a)*19;
    svg+=`<line class="lk-g" x1="${x0}" y1="${y0}" x2="${x1}" y2="${y1}"/><line class="lk" style="animation-delay:-${(i*0.37).toFixed(2)}s" x1="${x0}" y1="${y0}" x2="${x1}" y2="${y1}"/>`;}
  for(let i=0;i<n;i++){const a=P(i),b=P((i+1)%n);const l=v.links[i];const mx=(a[0]+b[0])/2,my=(a[1]+b[1])/2;const ox=(mx-cx)*0.16,oy=(my-cy)*0.16;const d=`M${a[0]} ${a[1]} Q${mx+ox} ${my+oy} ${b[0]} ${b[1]}`;
    if(l){svg+=`<path d="${d}" fill="none" stroke="${LC[l]}" stroke-width="7" opacity=".18"/><path class="${l===-1?'':'lkf'}" style="animation-delay:-${(i*0.5).toFixed(2)}s" d="${d}" fill="none" stroke="${LC[l]}" stroke-width="2.4" ${l===-1?'stroke-dasharray="5 4"':''} opacity=".95"/>`;
      svg+=`<text x="${mx+ox*2.1}" y="${my+oy*2.1+4}" text-anchor="middle" class="chu-l" fill="${LC[l]}">${l===1?'sinh':l===2?'đồng':'khắc'}</text>`;}
    else svg+=`<path d="${d}" fill="none" stroke="var(--line)" stroke-width="1.2" opacity=".7"/>`;}
  svg+=`<circle class="dd-glow" cx="${cx}" cy="${cy}" r="${RD+22}" fill="url(#ddg)"/>
   <g class="dd-rev"><circle cx="${cx}" cy="${cy}" r="${RD}" fill="var(--paper)" stroke="var(--gold)" stroke-width="1.5"/><circle cx="${cx}" cy="${cy}" r="${RD-6}" fill="none" stroke="var(--gold)" stroke-width="3" stroke-dasharray="2 9" opacity=".8"/></g>
   <g class="dd-rot"><circle cx="${cx}" cy="${cy}" r="40" fill="var(--paper)" stroke="var(--acc)" stroke-width="1.5"/><path d="M${cx} ${cy-40}a40 40 0 0 1 0 80a20 20 0 0 1 0-40a20 20 0 0 0 0-40z" fill="var(--acc)"/><circle cx="${cx}" cy="${cy-20}" r="5.5" fill="var(--acc)"/><circle cx="${cx}" cy="${cy+20}" r="5.5" fill="var(--paper)"/></g>
   <text x="${cx}" y="${cy+RD+15}" text-anchor="middle" class="chu-s">đan điền</text>`;
  for(let i=0;i<n;i++){const p=P(i),it=v.it[i];const st=it?` style="--pc:${PCOL[it.tier||0]}"`:'';
    svg+=`<g class="chu-n${it?' on':''}"${st} data-act="chuPick" data-arg="${i}" transform="translate(${p[0]} ${p[1]})"><rect x="-17" y="-17" width="34" height="34" rx="8"/>${HY2.includes(i)?'<circle class="hy" cx="13" cy="-13" r="4.5"/>':''}${it?`<text y="4.5" text-anchor="middle" class="chu-e el-${it.el}">${(EL[it.el]||EL.vo).c}</text>`:'<text y="6" text-anchor="middle" class="chu-p">＋</text>'}<text y="-21" text-anchor="middle" class="chu-i">${i+1}</text>${it?`<g class="chu-x" data-act="chuDel" data-arg="${i}" transform="translate(-15 -15)"><circle r="7"/><path d="M-2.8 -2.8L2.8 2.8M2.8 -2.8L-2.8 2.8"/></g>`:''}</g>`;}
  svg+='</svg>';
  let h=`<p class="hint">Linh khí chảy quanh đan điền theo chiều kim đồng hồ. Ô trước <b class="good">sinh</b> ô sau thì hệ đó mạnh lên, <b class="bad">khắc</b> thì yếu đi. Chạm một ô để đặt công pháp, tâm pháp; chỉ môn nằm trong vòng mới vận hành.</p>${svg}`;
  h+=`<div class="chips">${chipSpan('up','Mỗi mối tương sinh: hệ của ô nhận +6% uy lực, linh lực +3%','tương sinh '+v.sinh)}${chipSpan('','Hai ô cạnh nhau cùng hệ: hệ đó +3% uy lực','đồng hệ '+v.dong)}${chipSpan('dn','Mỗi mối tương khắc: hệ bị khắc −5% uy lực','tương khắc '+v.khac)}${chipSpan(v.dai?'item':'','Kín vòng, không có mối khắc nào và chỉ hở tối đa một mối: tu luyện +15%, khí huyết +8%',v.dai?'Đại chu thiên đã thành':'Đại chu thiên chưa thành')}</div>`;
  h+=`<div class="hbtns"><button data-act="chuAuto"${ta('Máy thử xếp sao cho nhiều mối tương sinh nhất')}>Tự xếp</button><button data-act="chuClear">Gỡ hết</button></div>`;
  const blk=chuBlocked();
  h+=`<p class="hint">Ô có chấm vàng là <b>huyệt</b>: môn đặt ở đó mạnh gấp rưỡi. ${blk?`Còn <b class="bad">${blk} ô bị tắc</b>.`:''} Số ô tăng theo cảnh giới (đang có ${n}/8). Tương sinh: Mộc → Hỏa → Thổ → Kim → Thủy → Mộc; hệ Vô không sinh không khắc.</p>`;
  if(blk)h+=`<div class="hbtns"><button data-act="chuUnblock"${r.tv<15||r.scene||r.moving?' disabled':''}${ta('Dồn chân khí xung phá một ô tắc.\nTốn 15% tu vi và 6 tháng.')}>Đả thông một ô · 15% tu vi · 6 tháng</button></div>`;
  return h;
}
function chipSpan(c,tip,t){return `<span class="chip ${c}"${ta(tip)}>${t}</span>`;}
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
  let b=tabsHTML('journal',[['log','Đời này'],['aff','Thiên hạ'],['quest','Việc'],['news','Tin đồn'],['chron','Biên niên']],tab);
  if(tab==='aff')b+=affairsBody();
  if(tab==='log')b+=`<div class="logl">${r.log.slice().reverse().map(l=>`<p><span>${l.a} tuổi</span>${esc(l.t)}</p>`).join('')}</div>`;
  if(tab==='quest'){const L=r.quests.slice().reverse();b+=L.length?`<div class="rows">${L.map(q=>`<div class="row${q.state==='fail'?' dim':''}"><span class="r-i">${q.state==='done'?ic('check'):q.state==='fail'?ic('close'):ic('hour')}</span><span class="r-t"><b>${esc(q.text)}</b><small>${q.state==='open'?'còn '+durH(Math.max(0,q.due-w.t)):q.state==='done'?'đã xong':'thất hứa'}</small></span></div>`).join('')}</div>`:'<p class="empty">Chưa nhận việc nào. Tìm bảng treo thưởng ở thôn trấn.</p>';}
  if(tab==='news')b+=`<div class="logl">${r.news.length?r.news.slice().reverse().map(l=>`<p><span>${l.a} tuổi</span>${esc(l.t)}</p>`).join(''):'<p class="empty">Chưa nghe được gì. Ghé trà lâu mà hỏi.</p>'}</div>`;
  if(tab==='chron'){const C=w.chron.slice().reverse();b+=C.length?`<div class="logl">${C.map(l=>`<p><span>năm ${l.y}</span>${esc(l.t)}</p>`).join('')}</div>`:'<p class="empty">Thế gian còn yên ả.</p>';}
  return win('Sổ tay',b,{cls:'tall'});
}
function affairsBody(){
  const L=affairs();const f=UI.filter||'all';const cnt=k=>k==='all'?L.length:L.filter(x=>x.cat===k).length;
  let b=`<div class="tabs wrap">${Object.keys(AFF_CAT).map(k=>`<button data-act="filter" data-arg="${k}" class="${k===f?'on':''}">${AFF_CAT[k]} · ${cnt(k)}</button>`).join('')}</div>`;
  const M=L.filter(x=>f==='all'||x.cat===f);
  b+=M.length?`<div class="rows">${M.map(x=>`<button class="row" data-act="affGo" data-arg="${x.x!=null?Math.round(x.x)+','+Math.round(x.y)+','+(x.node!=null?x.node:''):''}"${x.x==null?' disabled':''}><span class="r-i">${x.i}</span><span class="r-t"><b>${esc(x.n)}</b><small>${esc(x.sub)}${x.old?' · nghe '+durH(x.old)+' trước':''}</small></span><span class="r-x">${x.left!=null?'còn chừng '+durH(Math.max(1,x.left)):''}</span></button>`).join('')}</div><p class="hint">Chạm một dòng để xem chỗ đó trên bản đồ. Chỉ hiện những chuyện ngươi tự thấy hoặc đã nghe tin.</p>`:'<p class="empty">Chưa nghe ngóng được gì. Ghé trà lâu, hoặc đi xa hơn.</p>';
  return b;
}
function pAffairs(){return win('Thiên hạ',affairsBody(),{cls:'tall'});}
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
     <button class="row" data-act="newGame"><span class="r-i">${ic('cycle')}</span><span class="r-t"><b class="${UI.confirm==='newGame'?'bad':''}">${UI.confirm==='newGame'?'Bấm lần nữa để chơi lại từ đầu':'Chơi mới từ đầu'}</b><small>Xóa kiếp này, thế giới và mọi tích lũy, đầu thai lại. Không hoàn tác.</small></span></button>
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
  if(st==='view')b+=setRow('Cỡ chữ',seg('font',[['m','Vừa'],['l','Lớn'],['xl','Rất lớn']]))
    +setRow('Tên địa danh',onoff('names'))+setRow('Thực thể qua lại',onoff('ents'),'Thương đội, thú triều, tuần tra, thiên kiêu, dị tượng trên bản đồ')+setRow('Vòng thần thức',onoff('ring'))+setRow('Dấu ghi chú',onoff('notes'))+setRow('Địa hình vẽ tay',onoff('terrain'));
  if(st==='play'){const ad=G.meta.opt&&G.meta.opt.userDodge;
    b+=setRow('Tự né',`<div class="seg"><button data-act="autoDodge" data-arg="0" class="${ad?'':'on'}">Tắt</button><button data-act="autoDodge" data-arg="1" class="${ad?'on':''}">Bật</button></div>`,'Bật thì không cần nhấn nút Né.\nLuôn tính như né ở mức khá, trừ đi 10%.')
    +setRow('Tự đánh',onoff('autoFight'),'Máy tự chọn chiêu và tự né trong trận')+setRow('Tốc độ trận',seg('cspeed',[[1,'×1'],[2,'×2'],[3,'×3']]))
    +setRow('Hỏi lại khi vào tử địa',onoff('confirmDanger'))+setRow('Đồng hồ tự chạy',onoff('clockIdle'),'Bật: đứng ở bản đồ thì 1 giây = 1 giờ.\nTắt: thời gian chỉ trôi khi ngươi làm việc gì đó.');}
  if(st==='data')b+=`</div><div class="menu"><button class="row" data-act="exp"><span class="r-i">${ic('book')}</span><span class="r-t"><b>Lấy mã lưu</b><small>Sao chép để cất hoặc chuyển sang máy khác</small></span></button><button class="row" data-act="imp"><span class="r-i">${ic('down')}</span><span class="r-t"><b>Nạp mã lưu</b></span></button><button class="row" data-act="newGame"><span class="r-i">${ic('cycle')}</span><span class="r-t"><b class="bad">${UI.confirm==='newGame'?'Bấm lần nữa để chơi lại từ đầu, không hoàn tác':'Chơi mới từ đầu'}</b><small>Xóa kiếp này, thế giới và mọi thứ tích lũy, rồi đầu thai lại</small></span></button><button class="row" data-act="wipe"><span class="r-i">${ic('trash')}</span><span class="r-t"><b class="bad">${UI.confirm==='wipe'?'Bấm lần nữa để xóa hết, không hoàn tác':'Xóa toàn bộ dữ liệu'}</b></span></button></div>
    ${UI.code!=null?`<textarea id="code" rows="4" placeholder="Dán mã lưu vào đây">${esc(UI.code)}</textarea>${UI.codeMode==='imp'?goBtn('impGo','Nạp'):''}`:''}${UI.msg?`<p class="hint">${esc(UI.msg)}</p>`:''}<div>`;
  return b+`</div><p class="hint ver">Phù Sinh · bản 3 · cấu hình đồ họa lưu riêng trên từng máy.</p>`;
}
const PANEL_V={char:pChar,pets:pPets,journal:pJournal,affairs:pAffairs,bonds:pBonds,more:pMore,craft:pCraft};

// ---------- Túi đồ: hình người mặc trang bị, đan điền uẩn dưỡng, vật tùy thân, linh thạch và các ô đồ ----------
// màu phẩm dùng chung: chữ tên và khung ảnh của mọi thứ có phẩm
const PCOL=['#8d8672','#4f8a4a','#4a6fae','#7b56a8','#c97a2b','#c05a94','#b8402f'];
const PHAM_FROM=['Phàm Nhân','Phàm Nhân','Luyện Khí','Trúc Cơ','Kết Đan','Nguyên Anh','Hóa Thần'];
function pcs(t){return '--pc:'+PCOL[clamp(t||0,0,6)];}
function qName(n,t){return `<b class="qt" style="${pcs(t)}">${esc(n)}</b>`;}
const SLOT_IC={vukhi:'M14 4h6v6L9 21l-2-2-3 1 1-3-2-2L14 4zM6 15l3 3',non:'M4 16c0-6 3-10 8-10s8 4 8 10zM2 16h20M12 6V3',boi:'M12 3v5M12 8a5 5 0 100 10 5 5 0 000-10zM12 18v3M12 11v4',gang:'M7 21v-9l-2-4 2-1 2 3V4h2v6V3h2v7-6h2v8l2-3 1 2-2 5v5z',giap:'M7 4l5 2 5-2 3 4-3 2v10H7V10L4 8z',choang:'M8 3h8l4 17H4zM8 3c1 3 7 3 8 0',nhan:'M12 9a6 6 0 100 12 6 6 0 000-12zM9 6l3-3 3 3-3 3z',dai:'M3 10h18v4H3zM10 9h4v6h-4z',phapbao:'M12 3l7 9-7 9-7-9zM5 12h14M12 3v18',giay:'M5 4h5v9l8 3v4H5zM5 16h13',tuivat:'M6 8h12l1 12H5L6 8zM9 8V6a3 3 0 016 0v2',phuongtien:'M3 6h12v9H3zM15 9h4l2 3v3h-6M7 18a2 2 0 100-.01M17 18a2 2 0 100-.01',hoa:'M12 3c1 4 5 5 5 10a5 5 0 01-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-5 1-9z',dinh:'M6 8h12v6a6 6 0 01-12 0zM4 8h16M8 20l-1 2M16 20l1 2M9 5h6',tran:'M12 3l8 5v8l-8 5-8-5V8zM12 3v18M4 8l16 8M20 8L4 16',book:'M5 4h10l4 4v12H5zM15 4v4h4M8 12h8M8 16h6'};
function slotIcon(s){s=String(s).replace(/[12]$/,'');return `<svg class="sli" viewBox="0 0 24 24"><path d="${SLOT_IC[s]||SLOT_IC.phapbao}"/></svg>`;}
function relIcon(rel){return slotIcon(rel.k==='book'?'book':slotOf(rel));}
function bagSt(){return UI.bag||(UI.bag={tab:'all',pham:-1,sort:0,sel:null,n:1});}
// một ô trang bị: bấm mở hộp chọn, nút X ở góc để tháo
function eqCell(key,label,rel,o){o=o||{};const tip=rel?rel.name+'\n'+PHAM[rel.tier||0]+'\n'+fxLines(relicFx(rel),rel).join('\n'):(o.tip||label+': trống. Chạm để chọn.');
  return `<button class="eqc${rel?' on':''}${o.lock?' lock':''}" data-act="slotPick" data-arg="${key}"${o.lock?' disabled':''} style="${rel?pcs(rel.tier):''}"${ta(tip)}>${slotIcon(o.ic||slotOf(rel||{k:''}))}<small>${rel?esc(rel.name):label}</small>${o.badge?`<i>${o.badge}</i>`:''}${rel&&o.x?slotX(o.x[0],o.x[1],o.x[2]):''}</button>`;}
function bagTabHTML(){
  const r=run2(),E=eqOf(),B=bagSt();
  // --- cột trái: hình người, đan điền, vật tùy thân ---
  let L=`<div class="doll">${sceneCv('doll'+r.ten,r.region,'','dollbg','nhan:0.5:0.92:0:doll')}<div class="dgrid">${SLOTS.map(([k,n])=>eqCell('E'+k,n,E[k],{ic:k,x:['eqOff',k,'Tháo ra']})).join('')}</div></div>`;
  const dn=DD_N[r.realm];
  L+=`<h4 class="sgrp">Đan điền · uẩn dưỡng <small>${r.dd.length}/${dn}</small><span class="grow"></span><span class="qhelp"${ta('Vũ khí, pháp bảo nuôi trong đan điền mỗi năm mạnh thêm 5% (tối đa gấp đôi), vẫn cho chỉ số, và trong trận tế ra đánh được một lần.')}>${ic('info','sm')}</span></h4><div class="ddrow">${[0,1,2,3].map(j=>{const d=r.dd[j];if(d)return eqCell('D'+j,'',d.rel,{badge:'+'+Math.round((ddMul(d)-1)*100)+'%',x:['ddTake',j,'Lấy ra']});const need=DD_N.findIndex(x=>x>j);return eqCell('D'+j,j<dn?'Trống':'Cần '+REALM[need],null,{lock:j>=dn,ic:'phapbao',tip:j<dn?'Chạm để chọn vũ khí hoặc pháp bảo đưa vào uẩn dưỡng.':'Mở khi đạt '+REALM[need]+'.'});}).join('')}</div>`;
  L+=`<h4 class="sgrp">Vật tùy thân</h4><div class="ddrow five">${SPEC.map(([k,n])=>{if(k==='phuongtien'){const m=mountOf();return `<div class="eqc${m?' on':''}" style="${m?pcs(1):''}"${ta(m?m.n+'\n'+m.d:'Chưa có phương tiện. Sắm ở Trạm dịch trong thôn trấn.')}>${slotIcon(k)}<small>${m?m.n:n}</small></div>`;}return eqCell('E'+k,n,E[k],{ic:k,x:['eqOff',k,'Tháo ra']});}).join('')}</div>`;
  // --- cột phải: linh thạch, bộ lọc, các ô đồ ---
  const items=bagItems();const cnt=c=>c==='all'?items.length:items.filter(x=>x.cat===c).length;
  const V=items.filter(x=>(B.tab==='all'||x.cat===B.tab)&&(B.pham<0||x.tier===B.pham));
  const SORT=['Phẩm cao','Phẩm thấp','Tên A–Z','Loại'];
  V.sort([(a,b)=>b.tier-a.tier||a.n.localeCompare(b.n),(a,b)=>a.tier-b.tier||a.n.localeCompare(b.n),(a,b)=>a.n.localeCompare(b.n),(a,b)=>a.cat.localeCompare(b.cat)||b.tier-a.tier][B.sort]);
  const opt=(v,n,cur)=>`<option value="${v}"${String(v)===String(cur)?' selected':''}>${n}</option>`;
  const TOP=`<div class="bagtop"><div class="bst"${ta('Linh thạch: tiền tệ của giới tu tiên')}>${ib('gem','jade')}<span><small>Linh thạch</small>${stoneHTML(r.st)}</span></div><div class="bcap"><small>Túi đồ</small><b>${items.length} / ${bagCap()} ô</b></div><button class="icb" data-act="phamHelp" aria-label="Các phẩm"${ta('Bảng màu các phẩm')}>?</button></div>`;
  let R=`<div class="bfil"><label><small>Loại</small><select data-chg="bagTab">${Object.keys(BAG_CAT).map(c=>opt(c,BAG_CAT[c]+(cnt(c)?' ('+cnt(c)+')':''),B.tab)).join('')}</select></label>
   <label><small>Phẩm</small><select data-chg="bagPham" style="${B.pham>=0?pcs(B.pham)+';color:var(--pc);font-weight:700':''}">${opt(-1,'Mọi phẩm',B.pham)}${PHAM.map((p,i)=>opt(i,p,B.pham)).join('')}</select></label>
   <label><small>Sắp xếp</small><select data-chg="bagSort">${SORT.map((n,i)=>opt(i,n,B.sort)).join('')}</select></label></div>`;
  const pad=B.tab==='all'&&B.pham<0?Math.max(bagCap(),V.length):Math.ceil(Math.max(V.length,10)/5)*5;
  R+=`<div class="bgrid">${V.map(x=>`<button class="bc on${B.sel===x.key?' sel':''}" data-act="bagSel" data-arg="${x.key}" style="${pcs(x.tier)}"${ta(x.n+'\n'+PHAM[x.tier]+(x.tip?'\n'+x.tip:''))}>${x.em?`<span class="bem">${x.em}</span>`:slotIcon(x.ref.t==='rel'&&r.relics[x.ref.i].k==='book'?'book':x.slot||'phapbao')}${x.cnt>1?`<i>${x.cnt}</i>`:''}</button>`).join('')}${'<span class="bc"></span>'.repeat(Math.max(0,pad-V.length))}</div>`;
  if(!V.length&&items.length)R+=`<p class="hint">Không có món nào khớp bộ lọc.</p>`;
  // --- ô chi tiết món đang chọn ---
  let D='';const k=B.sel;const it=k?items.find(x=>x.key===k):null;
  if(it){let act='';let rel=null;
    if(it.ref.t==='rel'&&r.relics[it.ref.i].k==='book'){const bk=r.relics[it.ref.i];const why=learnWhy(bk);
      act=`<button class="btn pri" data-act="learn" data-arg="${it.ref.i}"${why?' disabled':''}${ta(why||'Tham ngộ mất '+durH(learnTime(bk.art)))}>Học · ${durH(learnTime(bk.art))}</button><button class="btn" data-act="bagDrop">${UI.confirm==='drop'?'Chắc chứ?':'Vứt'}</button>${why?`<span class="hint">${esc(why)}</span>`:''}`;
      D=`<div class="bdet" style="${pcs(bk.tier)}"><b class="bn">${esc(bk.name)}</b><small>${PHAM[bk.tier||0]} · bí tịch ${bk.art.type==='cp'?'công pháp':'tâm pháp'}</small><p>${esc(bk.lore||'')}</p><div class="bact">${act}</div></div>`;}
    else if(it.ref.t==='rel'){rel=r.relics[it.ref.i];
      act=`<button class="btn pri" data-act="eqOn" data-arg="${it.ref.i}">Mặc vào</button>${ddCan(rel)?`<button class="btn" data-act="ddPut" data-arg="${it.ref.i}"${r.dd.length>=dn?' disabled':''}${ta(dn?'Đưa vào đan điền uẩn dưỡng':'Phải đạt Trúc Cơ mới uẩn dưỡng được')}>Uẩn dưỡng</button>`:''}<button class="btn" data-act="bagDrop">${UI.confirm==='drop'?'Chắc chứ?':'Vứt'}</button>`;
      D=relDetail(rel,act);}
    else{const n=clamp(B.n||1,1,it.cnt);B.n=n;const canDrop=it.ref.t!=='pass';
      act=(it.cnt>1?`<span class="qty"><button class="btn sm" data-act="bagN" data-arg="-1">−</button><b>${n}</b><button class="btn sm" data-act="bagN" data-arg="1">+</button><button class="btn sm" data-act="bagN" data-arg="all">Tất cả</button></span>`:'')+(it.use?`<button class="btn pri" data-act="bagUse">Dùng ${n>1?n:''}</button>`:'')+(it.ref.t==='egg'?`<button class="btn" data-act="panel" data-arg="pets">Xem ở Linh thú</button>`:'')+(canDrop?`<button class="btn" data-act="bagDrop">${UI.confirm==='drop'?'Chắc chứ?':'Vứt '+(n>1?n:'')}</button>`:'');
      D=`<div class="bdet" style="${pcs(it.tier)}"><b class="bn">${esc(it.n)}${it.cnt>1?' ×'+it.cnt:''}</b><small>${PHAM[it.tier]} · ${BAG_CAT[it.cat]}</small><p>${esc(it.tip||'').replace(/\n/g,'<br>')}</p><div class="bact">${act}</div></div>`;}}
  return TOP+`<div class="bagwrap"><div class="bagL">${L}</div><div class="bagR">${R}${D||'<p class="hint">Chạm một món để xem và dùng. Chạm ô trang bị để chọn đồ mặc vào, bấm dấu X ở góc ô để tháo.</p>'}</div></div>`;
}
function relDetail(rel,act){return `<div class="bdet" style="${pcs(rel.tier)}"><b class="bn">${esc(rel.name)}</b><small>${PHAM[rel.tier||0]} · ${SLOT_N[slotOf(rel)]} · hệ ${(EL[rel.el]||EL.vo).n}</small><p>${fxLines(relicFx(rel),rel).map(esc).join('<br>')}</p>${rel.lore?`<p class="hint">${esc(rel.lore)}</p>`:''}${act?`<div class="bact">${act}</div>`:''}</div>`;}
function relRow(rel,act,arg,cls){const fx=fxLines(relicFx(rel),rel);return `<button class="row prow${cls?' '+cls:''}" data-act="${act}" data-arg="${arg}" style="${pcs(rel.tier)}"${ta(fx.join('\n'))}><span class="qi">${relIcon(rel)}</span><span class="r-t"><b class="qt">${esc(rel.name)}</b><small>${PHAM[rel.tier||0]} · ${esc(fx.slice(0,2).join(' · '))}</small></span></button>`;}
// bảng màu các phẩm
function phamHelpHTML(){return `<div class="mbox"><div class="mb-h"><h3>Các phẩm</h3><button class="xb" data-act="modalX" aria-label="Đóng">${ic('close')}</button></div><div class="plist">${PHAM.map((p,i)=>`<div class="pl" style="${pcs(i)}"><i class="qsw"></i><span>${qName(p,i)} công dụng ×${String(PHAM_M[i]).replace('.',',')} · từ ${PHAM_FROM[i]}</span></div>`).join('')}</div><p class="hint">Màu chữ và màu khung của mọi vật phẩm, công pháp, chiêu thức đều theo phẩm.</p></div>`;}

// ---------- hộp chọn: trang bị, đan điền, vòng vận công, ô kỹ năng ----------
function pickModalHTML(m){
  const r=run2(),E=eqOf();const k=m.key;let title='',cur='',rows=[],empty='';
  if(k[0]==='E'){const s=k.slice(1);title=SLOT_N[s.replace(/[12]$/,'')]||'Trang bị';const rel=E[s];
    if(rel)cur=relDetail(rel,`<button class="btn" data-act="eqOff" data-arg="${s}">${ic('close')} Tháo ra</button>`);
    rows=r.relics.map((x,i)=>({x,i})).filter(o=>o.x.k!=='book'&&slotsFor(o.x).includes(s)).sort((a,b)=>(b.x.tier||0)-(a.x.tier||0)).map(o=>relRow(o.x,'eqPut',o.i));
    empty='Trong túi không có món nào hợp ô này.';}
  else if(k[0]==='D'){const j=+k.slice(1);const d=r.dd[j];title='Đan điền · ô '+(j+1);
    if(d)cur=relDetail(d.rel,`<span class="hint">Đã uẩn dưỡng ${durH(Math.max(1,W().t-d.t0))} · mạnh thêm ${Math.round((ddMul(d)-1)*100)}%</span><button class="btn" data-act="ddTake" data-arg="${j}">${ic('close')} Lấy ra</button>`);
    else rows=r.relics.map((x,i)=>({x,i})).filter(o=>o.x.k!=='book'&&ddCan(o.x)).sort((a,b)=>(b.x.tier||0)-(a.x.tier||0)).map(o=>relRow(o.x,'ddPutM',o.i));
    empty=d?'':'Chỉ vũ khí và pháp bảo uẩn dưỡng được. Trong túi chưa có món nào.';}
  else if(k[0]==='C'){const i=+k.slice(1);const v=chuView();const it=v.it[i];title='Vòng vận công · ô '+(i+1)+(chuHuyet().includes(i)?' · huyệt':'');
    if(it){const a=artBy(it.u);cur=`<div class="bdet" style="${pcs(it.tier)}"><b class="bn">${elSeal(it.el)} ${esc(it.n)}</b><small>${it.type==='cp'?'Công pháp':'Tâm pháp'} · ${PHAM[it.tier]} · hiệu lực ×${numVN(chuPot(v,i))}</small>${a?`<ul class="ul">${artLines(a,chuPot(v,i)).map(t=>`<li>${esc(t)}</li>`).join('')}</ul>`:''}<div class="bact"><button class="btn" data-act="chuDel" data-arg="${i}">${ic('close')} Gỡ ra</button></div></div>`;}
    rows=chuPool().map((c,j)=>{const x=chuItem(c);return {x,j};}).filter(o=>o.x).sort((a,b)=>b.x.tier-a.x.tier).map(({x,j})=>`<button class="row prow" data-act="chuPut" data-arg="${j}" style="${pcs(x.tier)}"><span class="qi">${elSeal(x.el)}</span><span class="r-t"><b class="qt">${esc(x.n)}</b><small>${x.type==='cp'?'Công pháp':'Tâm pháp'} · ${PHAM[x.tier]} · hệ ${EL[x.el]?EL[x.el].n:'Vô'}${QUY[x.el]?' (xét như '+EL[QUY[x.el]].n+')':''}</small></span></button>`);
    empty='Không còn môn nào để đặt. Học thêm từ bí tịch.';}
  else if(k[0]==='K'){const [c,iS]=k.slice(1).split(':');const i=+iS;syncSkills();const L=r.kn[c]||[];const av=knAvail(c);title=CAT_N[c]+' · ô '+(i+1);const id=L[i];
    if(id&&SK[id]){const sk=SK[id];cur=`<div class="bdet" style="${pcs(sk.t)}"><b class="bn">${elSeal(sk.el)} ${esc(sk.n)}</b><small>${PHAM[sk.t]} · ${skillCost(sk)} linh lực</small><p>${esc(skillTip(sk,av[id]||1)).replace(/\n/g,'<br>')}</p><div class="bact"><button class="btn" data-act="knDel" data-arg="${c}:${i}">${ic('close')} Gỡ khỏi ô</button></div></div>`;}
    rows=Object.keys(av).filter(x=>x!==id).sort((a,b)=>SK[b].t-SK[a].t).map(x=>{const sk=SK[x];const at=L.indexOf(x);return `<button class="row prow" data-act="knPut" data-arg="${x}" style="${pcs(sk.t)}"${ta(skillTip(sk,av[x]))}><span class="qi">${elSeal(sk.el)}</span><span class="r-t"><b class="qt">${esc(sk.n)}</b><small>${PHAM[sk.t]} · ${skillCost(sk)} linh lực${sk.fx.p?' · uy '+Math.round(sk.fx.p*100)+'%':''}${at>=0?' · đang ở ô '+(at+1):''}</small></span></button>`;});
    empty=`Chưa có chiêu ${CAT_N[c].toLowerCase()} nào khác từ các công pháp đang vận hành.`;}
  return `<div class="mbox pick"><div class="mb-h"><h3>${esc(title)}</h3><button class="xb" data-act="modalX" aria-label="Đóng">${ic('close')}</button></div>${cur?`<h4 class="sgrp">Đang dùng</h4>${cur}`:''}${rows.length||empty?`<h4 class="sgrp">${cur?'Đổi sang':'Chọn'} <small>${rows.length}</small></h4>`:''}<div class="rows">${rows.join('')||(empty?`<p class="hint">${empty}</p>`:'')}</div></div>`;
}

// ---------- Sở học: công pháp, tâm pháp đã học, bí tịch chờ học, vòng vận công ----------
function artSlot(a){const r=G.run;const v=chuView();return r.chu.findIndex((c,i)=>i<v.n&&c&&c.u===a.u);}
function artCard(a){const r=G.run;const v=chuView();const slot=artSlot(a);const pot=slot>=0?chuPot(v,slot):null;const aff=artAff(a);
  const sk=a.sk.map(id=>`<span class="chip"${ta(skillTip(SK[id],a.lv))}>${CAT_N[skCat(SK[id])]} · ${qName(SK[id].n,SK[id].t)}</span>`).join('')+(a.mind?`<span class="chip"${ta('Thần Thức Thứ: tốn 30% linh lực, đánh vào thức hải. Niệm lực hơn đối thủ thì làm nó choáng.')}>Thần thức · Thần Thức Thứ</span>`:'');
  return `<div class="art" style="${pcs(a.tier)}"><div class="art-h">${elSeal(a.el)}<b>${esc(a.n)}</b><small>${a.type==='cp'?'Công pháp':'Tâm pháp'} · ${PHAM[a.tier]} · ${LV_N[a.lv-1]}${aff<1?' · <span class="bad">không hợp linh căn, còn 80%</span>':''}</small></div>
   <p class="art-s ${slot>=0?'good':''}">${slot>=0?`Đang vận hành ở ô ${slot+1} · hiệu lực ×${numVN(pot)}`:'Chưa vận hành: đặt vào vòng vận công thì mới có tác dụng'}</p>
   <ul>${artLines(a,pot==null?1:pot).map(t=>`<li>${esc(t)}</li>`).join('')}</ul>${sk?`<div class="chips">${sk}</div>`:''}
   <div class="bact"><button class="btn sm" data-act="study" data-arg="${a.u}"${a.lv>=3||r.scene||r.moving?' disabled':''}${ta(a.lv>=3?'Đã viên mãn':'Ngồi tham ngộ để lên một tầng: mọi con số của môn này tăng thêm.')}>${a.lv>=3?'Đã viên mãn':'Tham ngộ · '+durH(a.lv*HY)}</button><button class="btn sm" data-act="forget" data-arg="${a.u}">${UI.confirm==='fg'+a.u?'Chắc chứ?':'Phế bỏ'}</button></div></div>`;}
function artTile(a){const slot=artSlot(a);
  return `<button class="atile${slot>=0?' run':''}" data-act="artOpen" data-arg="${a.u}" style="${pcs(a.tier)}">${elSeal(a.el)}<span class="at-t"><b class="qt">${esc(a.n)}</b><small>${PHAM[a.tier]} · ${LV_N[a.lv-1]}</small></span>${slot>=0?`<i class="at-on"${ta('Đang vận hành ở ô '+(slot+1))}>${slot+1}</i>`:''}</button>`;}
function artModalHTML(m){const a=artBy(+m.u);if(!a)return '';return `<div class="mbox"><div class="mb-h"><h3>${a.type==='cp'?'Công pháp':'Tâm pháp'}</h3><button class="xb" data-act="modalX" aria-label="Đóng">${ic('close')}</button></div>${artCard(a)}</div>`;}
function hocTabHTML(){const r=run2();const A=arts().slice().sort((a,b)=>(artSlot(b)>=0)-(artSlot(a)>=0)||b.tier-a.tier);const cp=A.filter(a=>a.type==='cp'),tp=A.filter(a=>a.type==='tp');
  const books=r.relics.map((x,i)=>({x,i})).filter(o=>o.x.k==='book');
  let h=`<h4 class="sgrp">${ib('sword','soft')}Công pháp <small>${cp.length}</small></h4>`+(cp.length?`<div class="agrid">${cp.map(artTile).join('')}</div>`:'<p class="hint">Chưa học môn nào.</p>');
  h+=`<h4 class="sgrp">${ib('lotus','soft')}Tâm pháp <small>${tp.length}</small></h4>`+(tp.length?`<div class="agrid">${tp.map(artTile).join('')}</div>`:'<p class="hint">Chưa học môn nào.</p>');
  h+=`<h4 class="sgrp">${ib('scroll','soft')}Bí tịch chờ học <small>${books.length}</small></h4>`+(books.length?`<div class="agrid wide">${books.map(({x,i})=>{const why=learnWhy(x);return `<div class="atile book" style="${pcs(x.tier)}"${ta(x.lore+(why?'\n\n'+why:''))}>${elSeal(x.el)}<span class="at-t"><b class="qt">${esc(x.art.n)}</b><small>${x.art.type==='cp'?'Công pháp':'Tâm pháp'} · ${PHAM[x.tier]}</small></span><button class="btn sm pri" data-act="learn" data-arg="${i}"${why?' disabled':''}${ta(why||'Tham ngộ mất '+durH(learnTime(x.art)))}>Học</button></div>`;}).join('')}</div>`:'<p class="hint">Không có bí tịch nào trong túi. Tìm ở phường thị, Tàng Kinh Các, kỳ ngộ.</p>');
  h+=`<p class="hint">Chạm một môn để xem chi tiết, tham ngộ hoặc phế bỏ. Học không giới hạn, nhưng chỉ môn đặt trong vòng vận công mới có tác dụng.</p>`;
  return `<div class="hocwrap"><div class="hocL">${h}</div><div class="hocR"><h4 class="sgrp">${ib('cycle','soft')}Vòng vận công <small>${chuView().it.filter(Boolean).length}/${chuSlots()}</small></h4>${chuHTML()}</div></div>`;}
// ---------- Kỹ năng: gắn chiêu vào ô dùng trong trận, xem nội tại đang chạy ----------
function knTabHTML(){const r=run2();syncSkills();
  let h=`<p class="hint">Chiêu lấy từ các công pháp đang vận hành. Chạm một ô để chọn chiêu, bấm dấu X ở góc để gỡ. Trong trận: Tấn công, Thân pháp, Thần thông nằm ở nút Tấn công; Phòng thủ nằm ở nút Phòng thủ.</p><div class="knwrap">`;
  for(const c in CAT_MAX){const av=knAvail(c);const L=r.kn[c];
    h+=`<div class="knline"><div class="kn-c">${ib({atk:'sword',def:'shield',move:'wind',ult:'spark'}[c],'soft')}<b>${CAT_N[c]}</b><small>${L.length}/${CAT_MAX[c]} · có ${Object.keys(av).length} chiêu</small></div><div class="knrow">`;
    for(let i=0;i<CAT_MAX[c];i++){const id=L[i];const sk=id&&SK[id];
      h+=`<button class="kns${sk?' on':''}" data-act="knPick" data-arg="${c}:${i}" style="${sk?pcs(sk.t):''}"${ta(sk?skillTip(sk,av[id]):'Ô trống. Chạm để chọn chiêu.')}>${sk?elSeal(sk.el)+`<span class="at-t"><b class="qt">${esc(sk.n)}</b><small>${skillCost(sk)} linh lực${sk.fx.p?' · uy '+Math.round(sk.fx.p*100)+'%':''}</small></span>`+slotX('knDel',c+':'+i,'Gỡ chiêu'):`<span class="kn-e">${ic('plus')}</span><small>trống</small>`}</button>`;}
    h+='</div></div>';}
  h+='</div>';
  const m=mindArt();
  h+=`<h4 class="sgrp">${ib('eye','soft')}Thần thức</h4>`+(m?`<div class="row"><span class="r-i">${ic('eye')}</span><span class="r-t"><b>Thần Thức Thứ</b><small>Từ ${qName(m.n,m.tier)} · tốn 30% linh lực · niệm lực của ngươi ${S().than}: hơn đối thủ thì làm choáng</small></span></div>`:'<p class="hint">Chưa có tâm pháp nào dạy đòn thần thức.</p>');
  const v=chuView();const P=[];v.it.forEach((it,i)=>{if(!it)return;const a=artBy(it.u);artFxList(a,chuPot(v,i)).forEach(x=>P.push([a,(x.n?x.n+': ':'')+x.t.replace('{v}',numFx(x.v))]));});
  h+=`<h4 class="sgrp">${ib('cycle','soft')}Nội tại đang vận hành <small>${P.length}</small></h4>`+(P.length?`<div class="kvl">${P.map(([a,t])=>`<div class="kr"><span>${esc(t)}</span><b class="qt sm" style="${pcs(a.tier)}">${esc(a.n)}</b></div>`).join('')}</div>`:'<p class="hint">Chưa có.</p>');
  return h;}
