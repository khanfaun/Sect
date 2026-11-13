// ---------- các bảng mở từ thanh dưới ----------
function kvRow(n,v,t,cls){return `<div class="kr ${cls||''}"${ta(t)}><span>${sib(n)}${n}</span><b>${v}</b></div>`;}
function sgBox(icon,name,rows,two){return `<section class="sgbox"><h4 class="sgrp">${ib(icon,'soft')}${name}</h4><div class="kvl${two?' two':''}">${rows.join('')}</div></section>`;}
function pChar(){
  const r=G.run,s=S();let tab=UI.tab.char||'base';if(tab==='chu')tab='hoc';
  let b=tabsHTML('char',[['base','Căn cơ'],['bag','Túi đồ'],['hoc','Sở học'],['kn','Kỹ năng']],tab);
  if(tab==='base'){
    const og=ORIGIN.find(o=>o.id===r.origin),tr=TRAIT.find(t=>t.id===r.trait),R0=rootView(r.root);
    const R1=ROOT.find(x=>x.id===r.root.id);const tc=s.tuchat;const left=Math.max(0,Math.floor(s.life-r.age));
    const lcV=`<span class="lc2"><small>${esc(R0.n)}</small><span class="lc-els">${r.root.els.map(elSeal).join('')}</span></span>`;
    b+=talCardHTML();
    b+=`<div class="basegrid">`;
    b+=sgBoxC('than','flag','Thân thế',[kvRow('Xuất thân',esc(og.n),og.d),...(tr&&tr.id!=='none'?[kvRow('Mệnh cách',esc(tr.n),tr.d)]:[]),
      kvRow('Linh căn',lcV,R1.d+'\nLinh căn là số đường dẫn linh khí vào thân. Càng ít hệ càng thuần, tu càng nhanh (×'+numVN(R1.m)+').'),
      ttRow('Tiên thiên khí vận',(r.kv||[]).map(k=>TT_DEST[k]),'Khí vận định sẵn lúc đầu thai. Có cái kéo linh căn về một hành, có cái ép linh căn biến dị, có cái quyết định thể chất.'),
      htRow(),
      ttRow('Tiên thiên thể chất',(r.the||[]).map(ttPhysOf),'Suy ra từ linh căn, khí vận, nhân quả và tính tình lúc sinh ra. Tối đa ba thể chất, phẩm cao nhất trước.'),
      kvRow('Tư chất',`<span style="color:${PCOL[Math.max(0,4-TC_N.findIndex(x=>tc>=x[0]))]}">${tcName(tc)}</span>`,'Độ tinh thuần của linh căn, định sẵn lúc sinh.\nCùng một loại linh căn, tư chất cao thì hấp thu linh khí nhanh hơn.\nHệ số tu luyện ×'+numVN(Math.round(tcMult(tc)*100)/100)+' (từ ×0,7 tới ×1,3).'),
      kvRow('Ngộ tính',RT('ngo',s.ngo,'muc'),'Tu luyện nhanh hơn, giải đố, đột phá, luyện chế'),kvRow('Đạo tâm',RT('tam',s.tam,'muc'),'Chống ảo cảnh, đột phá'),kvRow('Khí vận',RT('van',s.van,'muc'),'Chí mạng, may mắn'),kvRow('Mị lực',`<span class="mi-v">${miName()}</span>`,'Dung mạo, phong thái. Ảnh hưởng giá mua bán, các phép thử thuyết phục, ấn tượng ban đầu của người lạ, việc kết giao, bái sư, kết đạo lữ.\nQuá nổi bật đôi khi cũng chuốc lấy ghen ghét.'),
      kvRow('Nhân quả',karmaName(r.karma),'Thiện ác đều có báo'),kvRow('Tuổi',Math.floor(r.age)+' · còn '+left+' năm','Thọ nguyên '+s.life+'. Hết thọ nguyên là tọa hóa')]);
    b+=sgBoxC('tu','yin','Tu luyện',[kvRow('Cảnh giới',esc(realmLabel())+` <span class="qhelp" data-act="cgOpen"${ta('Mở hệ thống cảnh giới')}>?</span>`,'Tu vi '+tvShow()+'%'+(dinhPhong()?(dvm()?'\nĐại viên mãn: khí huyết, linh lực, công, thủ +5%.':'\nChưa đại viên mãn: '+dvmWhy()+'.\n(Cần: không trọng thương, tâm ma dưới '+DVM_TAMMA+', đạo tâm từ '+DVM_TAM+')'):'')+(bbKind()?'\nBán bộ '+REALM[G.run.realm+1]+': dùng được đồ, công pháp, tâm pháp của '+REALM[G.run.realm+1]+'; chỉ số vẫn như cũ.':'')),
      `<div class="hrow tvrow"><span class="hn">${sib('Tu vi')}Tu vi</span>${bar(tvShow(),100,'tv')}<span class="hv">${tvShow()}%</span></div>`,
      `<div class="hrow tvrow"${ta('Lịch luyện '+llShow()+'%\nCó được nhờ thực chiến (thắng nhiều, thua ít, đánh kẻ mạnh hơn được nhiều hơn), tới nơi mới, quen người mới, làm xong việc.\nTu vi bỏ xa lịch luyện thì tu vi thực nhận giảm dần. Lịch luyện tính theo tầng/kỳ đang ở: chừng 65% là xung kích được, đột phá đại cảnh giới thì cần đầy.')}><span class="hn">${sib('Lịch luyện')}Lịch luyện</span>${bar(llShow(),100,'ll')}<span class="hv">${llShow()}%</span></div>`,
      kvRow('Tốc độ tu',RT('bq',bqReal(),'toc'),'Tu vi nhận được mỗi tháng BẾ QUAN ở nơi đang đứng. Không bế quan thì không tăng theo chỉ số này. Hên xui trong khoảng này.\nPhụ thuộc linh căn, tư chất, ngộ tính, Khí Hải và linh khí nơi bế quan.'),
      kvRow('Thổ nạp',RT('thonap',thonapPct(),'toc'),'Thân thể tự hít thở linh khí: không cần bế quan, tu vi vẫn tự tăng theo thời gian, kể cả lúc đi đường hay bế quan.\nRất ít, chừng 5% tốc độ bế quan. Theo linh căn, tư chất, ngộ tính, công pháp, tâm pháp, trang bị, mệnh cách và linh khí nơi đang đứng.'),
      kvRow('Hiệu suất tu',(()=>{const e=llEff(r.tv);const t=e>1.001?'Ngộ đạo':e>=0.99?'Đầy đủ':e>=0.7?'Hơi giảm':e>=0.35?'Giảm':e>=0.1?'Giảm mạnh':'Bình cảnh';return `<span class="${e>1.001?'rt4':e>=0.99?'rt3':e>=0.7?'rt2':e>=0.35?'rt1':e>=0.1?'rt0':'bad'}">${t}</span>`;})(),'Phần tu vi thực nhận so với lẽ ra được nhận, do chênh lệch tu vi và lịch luyện.\nTu vi càng bỏ xa lịch luyện thì nhận càng ít, tới mức bình cảnh gần như đứng yên.\nLịch luyện cao hơn tu vi thì được ngộ đạo, nhận thêm một ít.'),
      kvRow('Đạo cơ',QNAME[qOf(r.dao||0)],'Đạo cơ quyết định phẩm chất khi đột phá.'+(qNext(r.dao||0)?'':'\nĐã đạt Thiên đạo')),
      kvRow('Tâm ma',`<span class="${['rt3','rt3','rt2','bad','bad'][Math.min(4,Math.floor((r.tamma||0)/20))]}">${tmWord(r.tamma)}</span>`,'Tâm ma đầy thì phải đối mặt với chính mình',r.tamma>=60?'bad':''),
      kvRow('Thần thức',RT('than',s.than,'luc'),'Sức mạnh thần thức. Hơn đối thủ thì đòn thần thức làm choáng được. Tầm thần thức là tầm nhìn trên bản đồ.\nTăng theo cảnh giới, ngộ tính và tâm pháp.'),
      kvRow('Niệm lực',RT('nl',s.nl,'luc'),'Kho sức thần thức dùng trong trận, bằng ba lần Thần thức. Vào trận thì đầy.\nDùng vật phẩm, tế pháp bảo, đòn thần thức đều tốn niệm lực.'),
      kvRow('Thân pháp',RT('tp',s.tp,'toc'),'Nhanh nhẹn. Trong trận là tốc độ chạy trên nửa đầu thanh hành động; ngoài trận đi lại cũng nhanh hơn.')]);
    b+=`<details class="sgbox cbstat"${UI.cbOpen!==false?' open':''}><summary class="sgrp" data-act="cbOpen">${ib('sword','soft')}Chiến đấu<i class="cc-ch" aria-label="${UI.cbOpen!==false?'Thu gọn':'Mở rộng'}">${ic(UI.cbOpen!==false?'up':'down')}</i></summary><div class="kvl">${[
      kvRow('Lực chiến',RT('lc',lucChien(),'luc'),'Lực chiến: tính từ chỉ số chiến đấu và trang bị','lcrow'),kvRow('Khí huyết',RT('maxHp',s.maxHp,'ben'),'Khí huyết tối đa dày hay mỏng. Về 0 là chết'),kvRow('Linh lực',RT('maxMp',s.maxMp,'ben'),'Thi triển pháp thuật'),
      kvRow('Công vật lý',RT('atk',s.atk),'Dùng cho đánh thường và kiếm pháp, quyền cước'),kvRow('Công phép',RT('matk',s.matk),'Dùng cho pháp thuật'),
      kvRow('Chí mạng',RT('crit',s.crit,'muc'),'Tỉ lệ chí mạng'),kvRow('ST chí mạng',RT('critDmg',s.critDmg),'Sát thương khi chí mạng'),
      kvRow('Chính xác',RT('cx',s.cx,'muc'),'Đối phương né khó hơn'),kvRow('Thủ',RT('def',s.def),'Giảm sát thương nhận vào'),
      kvRow('Hộ tâm',RT('hoTam',s.hoTam),'Giảm sát thương chí mạng nhận vào'),kvRow('Né',RT('ne',s.ne,'muc'),'Phải bấm Né đúng lúc mới phát huy hết'),
      kvRow('Hồi phục',RT('hoi',s.hoi,'toc'),'Tốc độ trên nửa sau thanh hành động')].join('')}</div></details>`;
    b+='</div>';
  }
  if(tab==='bag')b+=bagTabHTML();
  if(tab==='hoc')b+=hocTabHTML();
  if(tab==='kn')b+=knTabHTML();
  return win(esc(r.ten),b,{cls:'tall wide'});
}
// nút X nhỏ ở góc ô để gỡ / tháo
function slotX(act,arg,tip){return `<span class="slx" data-act="${act}" data-arg="${arg}" role="button" aria-label="${tip||'Gỡ'}"${ta(tip||'Gỡ ra')}>${ic('close')}</span>`;}
function pPets(){
  const r=run2(),w=W();const tab=UI.tab.pets||'out';
  let b=tabsHTML('pets',[['out','Theo bên mình'],['egg','Trứng · Nuôi']],tab);
  if(tab==='out'){
    b+=`<p class="hint">Linh thú mang theo sẽ vào trận cùng ngươi và cho một lợi ích nhỏ. Giữ được tối đa ${PET_MAX} con.</p>`;
    b+=r.pets.length?`<div class="rows">${r.pets.map((p,i)=>{const on=r.petOut===i;const rest=p.rest>w.t;return `<div class="row${on?' taken':''}"><span class="r-i big av-r">${assetImg('pet',p.k,p.i)}</span><span class="r-t"><b>${esc(p.n)} · bậc ${p.lv}/${petCap()}</b><small>${elSeal(p.el)} ${petFxText(p)} · sức bằng ${Math.round(petPow(p)*100)}% chủ${rest?' · <span class="bad">dưỡng thương còn '+durH(p.rest-w.t)+'</span>':''}</small>${bar(p.exp,p.lv*3,'tv')}</span><span class="r-x col"><button class="btn sm${on?' on':''}" data-act="petSet" data-arg="${i}">${on?'đang theo':'mang theo'}</button><button class="btn sm" data-act="petFree" data-arg="${i}">${UI.confirm==='free'+i?'chắc chứ?':'thả'}</button></span></div>`;}).join('')}</div>`:'<p class="empty">Chưa có con nào theo ngươi. Hạ yêu thú, đôi khi sẽ nhặt được trứng trong ổ của nó.</p>';
  } else {
    b+=`<h4 class="sgrp">Trứng đang ấp</h4>`+(r.eggs.length?`<div class="rows">${r.eggs.map((e,i)=>`<div class="row"><span class="r-i big">🥚</span><span class="r-t"><b>Trứng ${esc(e.n)}</b><small>${e.t>w.t?'còn '+durH(e.t-w.t)+' nữa thì nở':'sắp nở'}</small></span><button class="btn sm" data-act="petHatch" data-arg="${i}"${r.st<price(10)||r.pets.length>=PET_MAX?' disabled':''}${ta('Dùng linh thạch thúc trứng nở ngay')}>Thúc nở ${stoneHTML(price(10))}</button></div>`).join('')}</div>`:'<p class="hint">Không có trứng nào.</p>');
    const cur=r.petOut!=null&&r.pets[r.petOut];
    b+=`<h4 class="sgrp">Cho ăn${cur?' · '+esc(cur.n):''}</h4>`+(cur?(r.pills.length?`<div class="rows">${r.pills.map((p,i)=>`<button class="row" data-act="petFeed" data-arg="${i}"${ta('Linh thú lớn nhanh hơn. Đang dưỡng thương thì khỏi ngay.')}><span class="r-i">${PILL[p.id].i}</span><span class="r-t"><b>${esc(PILL[p.id].n)}</b><small>cho ${esc(cur.n)} ăn</small></span></button>`).join('')}</div>`:'<p class="hint">Túi không có đan dược nào.</p>'):'<p class="hint">Chọn một con mang theo trước đã.</p>');
  }
  return win('Linh thú',b,{cls:'tall'});
}
function pJournal(){
  const r=G.run,w=W();const tab=UI.tab.journal||'quest';
  let b=tabsHTML('journal',[['quest','Nhiệm vụ'],['log','Đời này'],['aff','Thiên hạ'],['news','Tin đồn'],['chron','Biên niên']],tab);
  if(tab==='aff')b+=affairsBody();
  if(tab==='log')b+=`<div class="logl">${r.log.slice().reverse().map(l=>`<p><span>${l.a} tuổi</span>${esc(l.t)}</p>`).join('')}</div>`;
  if(tab==='quest'){const L=r.quests.slice().reverse();UI.qOpen=UI.qOpen||{};
    b+=L.length?`<div class="rows">${L.map(q=>questCardHTML(q)).join('')}</div>`:'<p class="empty">Chưa nhận nhiệm vụ nào. Tìm bảng treo thưởng ở thôn trấn.</p>';}
  if(tab==='news')b+=`<div class="logl">${r.news.length?r.news.slice().reverse().map(l=>`<p><span>${l.a} tuổi</span>${esc(l.t)}</p>`).join(''):'<p class="empty">Chưa nghe được gì. Ghé trà lâu mà hỏi.</p>'}</div>`;
  if(tab==='chron'){const C=w.chron.slice().reverse();b+=C.length?`<div class="logl">${C.map(l=>`<p><span>năm ${l.y}</span>${esc(l.t)}</p>`).join('')}</div>`:'<p class="empty">Thế gian còn yên ả.</p>';}
  return win('Sổ tay',b,{cls:'tall'});
}
function affairsBody(){
  const L=affairs();const f=UI.filter||'all';const cnt=k=>k==='all'?L.length:L.filter(x=>x.cat===k).length;
  let b=`<div class="bfil one">${ddSel('affCat','Loại tin',Object.keys(AFF_CAT).map(k=>({v:k,h:esc(AFF_CAT[k])+` <small>${cnt(k)}</small>`})),f)}</div>`;
  const M=L.filter(x=>f==='all'||x.cat===f);
  b+=M.length?`<div class="rows">${M.map(x=>`<button class="row" data-act="affGo" data-arg="${x.x!=null?Math.round(x.x)+','+Math.round(x.y)+','+(x.node!=null?x.node:''):''}"${x.x==null?' disabled':''}><span class="r-i">${x.i}</span><span class="r-t"><b>${esc(x.n)}</b><small>${esc(x.sub)}${x.old?' · nghe '+durH(x.old)+' trước':''}</small></span><span class="r-x">${x.left!=null?'còn chừng '+durH(Math.max(1,x.left)):''}</span></button>`).join('')}</div><p class="hint">Chạm một dòng để xem chỗ đó trên bản đồ. Chỉ hiện những chuyện ngươi tự thấy hoặc đã nghe tin.</p>`:'<p class="empty">Chưa nghe ngóng được gì. Ghé trà lâu, hoặc đi xa hơn.</p>';
  return b;
}
function pAffairs(){return win('Thiên hạ',affairsBody(),{cls:'tall'});}
function pBonds(){
  const r=G.run,w=W();const R=relations();const tab=UI.tab.bonds||'an';
  let b=tabsHTML('bonds',[['an','Nhân mạch'],['bang','Thiên Kiêu Bảng'],['tong','Tông môn']],tab);
  if(tab==='an'){
    const seed=(s,cls)=>bondRow(s.ten,null,cls==='an'?'Chịu ơn ngươi':'Mang thù với ngươi','',[['Chuyện cũ',s.d],['Vùng',REG[s.r||0].n]]);
    b+=`<h4 class="sgrp">Đồng hành</h4>`+(R.party.length?`<div class="rows">${R.party.map(p=>bondRow(p.ten,null,'Đồng hành','',[['Còn đi cùng',durH(Math.max(0,p.until-w.t))]])).join('')}</div>`:'<p class="hint">Đang đi một mình.</p>');
    b+=`<h4 class="sgrp">Ân tình <small>${R.an.length}</small></h4>`+(R.an.length?`<div class="rows">${R.an.map(s=>seed(s,'an')).join('')}</div>`:'<p class="hint">Chưa ai nợ ngươi điều gì.</p>');
    b+=`<h4 class="sgrp">Oán thù <small>${R.oan.length}</small></h4>`+(R.oan.length?`<div class="rows">${R.oan.map(s=>seed(s,'oan')).join('')}</div>`:'<p class="hint">Chưa kết oán với ai.</p>');
    if(R.nemesis)b+=`<h4 class="sgrp">Kẻ thù truyền kiếp</h4><div class="rows"><div class="row"><span class="r-i">${R.nemesis.i||'🗡️'}</span><span class="r-t"><b>${esc(R.nemesis.n)}</b><small>kẻ đã kết liễu một kiếp trước của ngươi, nay mạnh hơn xưa</small></span></div></div>`;
  }
  if(tab==='bang'){
    b+=r.bang?`<p class="hint">Công bố năm ${r.bang.y||''}, khi ngươi ${r.bang.nam} tuổi</p><div class="rows">${r.bang.ds.map((x,i)=>`<div class="row${x.i<0?' taken':''}"><span class="r-i">${i+1}</span><span class="r-t"><b>${esc(x.ten)}</b></span><span class="r-x">${REALM[x.realm]}</span></div>`).join('')}</div>`:`<p class="hint">Thiên Kiêu Bảng chưa tới kỳ công bố (năm ${w.bangY}).</p>`;
    b+=`<h4 class="sgrp">Thiên kiêu đương thời</h4><div class="rows">${R.rivals.map(x=>bondRow(x.ten,x.g,x.tt+' của '+x.sect,x.alive?REALM[x.realm]:'đã mất',[['Danh hiệu',x.tt],['Tông môn',x.sect],['Cảnh giới',x.alive?REALM[x.realm]:'đã mất'],['Thuộc tính',x.el&&EL[x.el]?EL[x.el].n:'']],!x.alive)).join('')}</div>`;
  }
  if(tab==='tong'){const AL={chinh:'chính đạo',ta:'tà đạo',ma:'ma đạo',trung:'trung lập',phat:'Phật môn'};
    b+=`<p class="hint">${R.mine?'Ngươi là đệ tử tông môn.':'Ngươi là tán tu, chưa vào tông môn nào.'}</p><div class="rows">${R.sects.map((s,i)=>{const f=sectFav(i),L=favLv(f);return `<details class="bond"><summary class="row"><span class="r-i sect-i"><img src="${sectPic(s.n,s.al)}" alt=""></span><span class="r-t"><b>${esc(s.n)}</b><small>${AL[s.al]||s.al||''}</small></span><span class="fav f-${L[2]}">${L[1]}</span><i class="cc-ch">${ic('down')}</i></summary><div class="bond-d"><p class="hint">Hảo cảm của tông môn tính từ cao tầng (nặng hơn) và đệ tử.</p>${sectElders(i).map(e=>bondRow('@'+i+':'+e.t,null,e.t,'',[],false,{disp:e.ten,realm:Math.min(5,(G.run.realm||0)+2)})).join('')}${sectDisciples(i).slice(0,6).map(n=>bondRow(n,null,'Đệ tử','',[],false)).join('')}</div></details>`;}).join('')}</div>`;}
  return win('Giao tình',b,{cls:'tall'});
}
function pCraft(){
  const r=run2();const m=r.mats;
  let b=`<p class="hint">Vật liệu nhặt được khi thăm dò và hạ yêu thú. Luyện chế tốn thời gian; thất bại mất nửa vật liệu.</p><div class="grid">${Object.keys(MAT).map(k=>`<div class="cell"${ta(MAT[k].n+'\n'+MAT[k].d)}><span class="c-i">${MAT[k].i}</span><span class="c-n">${MAT[k].n}</span><span class="c-p">${m[k]||0}</span></div>`).join('')}</div><div class="rows">`;
  for(const c of CRAFT){const ok=craftOk(c);b+=`<button class="row" data-act="craft" data-arg="${c.id}"${ok&&!r.moving?'':' disabled'}${ta(c.d)}><span class="r-i">${c.i}</span><span class="r-t"><b>${c.n}</b><small>${Object.entries(c.cost).map(([k,v])=>`<span class="${m[k]<v?'bad':''}">${v} ${MAT[k].n.toLowerCase()}</span>`).join(' + ')} · ${durH(c.h)}</small><small>${esc(c.d)}</small></span><span class="r-x">${Math.round(craftRate(c)*100)}%</span></button>`;}
  return win('Luyện chế',b+'</div>',{cls:'tall'});
}