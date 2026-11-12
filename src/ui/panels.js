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
    b+=`<div class="basegrid">`;
    b+=sgBox('flag','Thân thế',[kvRow('Xuất thân',esc(og.n),og.d),...(tr&&tr.id!=='none'?[kvRow('Mệnh cách',esc(tr.n),tr.d)]:[]),
      kvRow('Linh căn',lcV,R1.d+'\nLinh căn là số đường dẫn linh khí vào thân. Càng ít hệ càng thuần, tu càng nhanh (×'+numVN(R1.m)+').'),
      ttRow('Tiên thiên khí vận',(r.kv||[]).map(k=>TT_DEST[k]),'Khí vận định sẵn lúc đầu thai. Có cái kéo linh căn về một hành, có cái ép linh căn biến dị, có cái quyết định thể chất.'),
      ttRow('Tiên thiên thể chất',(r.the||[]).map(ttPhysOf),'Suy ra từ linh căn, khí vận, nhân quả và tính tình lúc sinh ra. Tối đa ba thể chất, phẩm cao nhất trước.'),
      kvRow('Tư chất',`<span style="color:${PCOL[Math.max(0,4-TC_N.findIndex(x=>tc>=x[0]))]}">${tcName(tc)}</span>`,'Độ tinh thuần của linh căn, định sẵn lúc sinh.\nCùng một loại linh căn, tư chất cao thì hấp thu linh khí nhanh hơn.\nHệ số tu luyện ×'+numVN(Math.round(tcMult(tc)*100)/100)+' (từ ×0,7 tới ×1,3).'),
      kvRow('Ngộ tính',RT('ngo',s.ngo,'muc'),'Tu luyện nhanh hơn, giải đố, đột phá, luyện chế'),kvRow('Đạo tâm',RT('tam',s.tam,'muc'),'Chống ảo cảnh, đột phá'),kvRow('Khí vận',RT('van',s.van,'muc'),'Chí mạng, may mắn'),
      kvRow('Nhân quả',karmaName(r.karma),'Thiện ác đều có báo'),kvRow('Tuổi',Math.floor(r.age)+' · còn '+left+' năm','Thọ nguyên '+s.life+'. Hết thọ nguyên là tọa hóa')]);
    b+=sgBox('yin','Tu luyện',[kvRow('Cảnh giới',esc(realmLabel()),'Tu vi '+Math.floor(r.tv)+'%'+(lkOn()?'\nTầng '+lkTang()+': đã tu được '+lkPct()+'%':'')),
      `<div class="hrow tvrow"><span class="hn">${sib('Tu vi')}Tu vi</span>${bar(r.tv,100,'tv')}<span class="hv">${Math.floor(r.tv)}%</span></div>`,
      `<div class="hrow tvrow"${ta('Lịch luyện '+Math.floor(Math.min(100,llOf()))+'%\nCó được nhờ thực chiến (thắng nhiều, thua ít, đánh kẻ mạnh hơn được nhiều hơn), tới nơi mới, quen người mới, làm xong việc.\nTu vi bỏ xa lịch luyện thì tu vi thực nhận giảm dần. Cần đầy lịch luyện mới đột phá được.')}><span class="hn">${sib('Lịch luyện')}Lịch luyện</span>${bar(Math.min(100,llOf()),100,'ll')}<span class="hv">${Math.floor(Math.min(100,llOf()))}%</span></div>`,
      kvRow('Tốc độ tu',RT('bq',bqReal(),'toc'),'Tu vi nhận được mỗi tháng BẾ QUAN ở nơi đang đứng. Không bế quan thì không tăng theo chỉ số này. Hên xui trong khoảng này.\nPhụ thuộc linh căn, tư chất, ngộ tính, Khí Hải và linh khí nơi bế quan.'),
      kvRow('Thổ nạp',RT('thonap',thonapPct(),'toc'),'Thân thể tự hít thở linh khí: không cần bế quan, tu vi vẫn tự tăng theo thời gian, kể cả lúc đi đường hay bế quan.\nRất ít, chừng 5% tốc độ bế quan. Theo linh căn, tư chất, ngộ tính, công pháp, tâm pháp, trang bị, mệnh cách và linh khí nơi đang đứng.'),
      kvRow('Hiệu suất tu',(()=>{const e=llEff(r.tv);const t=e>1.001?'Ngộ đạo':e>=0.99?'Đầy đủ':e>=0.7?'Hơi giảm':e>=0.35?'Giảm':e>=0.1?'Giảm mạnh':'Bình cảnh';return `<span class="${e>1.001?'rt4':e>=0.99?'rt3':e>=0.7?'rt2':e>=0.35?'rt1':e>=0.1?'rt0':'bad'}">${t}</span>`;})(),'Phần tu vi thực nhận so với lẽ ra được nhận, do chênh lệch tu vi và lịch luyện.\nTu vi càng bỏ xa lịch luyện thì nhận càng ít, tới mức bình cảnh gần như đứng yên.\nLịch luyện cao hơn tu vi thì được ngộ đạo, nhận thêm một ít.'),
      kvRow('Đạo cơ',QNAME[qOf(r.dao||0)],'Đạo cơ quyết định phẩm chất khi đột phá.'+(qNext(r.dao||0)?'':'\nĐã đạt Thiên đạo')),
      kvRow('Tâm ma',`<span class="${['rt3','rt3','rt2','bad','bad'][Math.min(4,Math.floor((r.tamma||0)/20))]}">${tmWord(r.tamma)}</span>`,'Tâm ma đầy thì phải đối mặt với chính mình',r.tamma>=60?'bad':''),
      kvRow('Thần thức',RT('than',s.than,'luc'),'Sức mạnh thần thức. Hơn đối thủ thì đòn thần thức làm choáng được. Tầm thần thức là tầm nhìn trên bản đồ.\nTăng theo cảnh giới, ngộ tính và tâm pháp.'),
      kvRow('Niệm lực',RT('nl',s.nl,'luc'),'Kho sức thần thức dùng trong trận, bằng ba lần Thần thức. Vào trận thì đầy.\nDùng vật phẩm, tế pháp bảo, đòn thần thức đều tốn niệm lực.'),
      kvRow('Thân pháp',RT('tp',s.tp,'toc'),'Nhanh nhẹn. Trong trận là tốc độ chạy trên nửa đầu thanh hành động; ngoài trận đi lại cũng nhanh hơn.')]);
    b+=`<details class="sgbox cbstat"${UI.cbOpen?' open':''}><summary class="sgrp" data-act="cbOpen">${ib('sword','soft')}Chỉ số chiến đấu<span class="lc-c"${ta('Lực chiến: tính từ chỉ số chiến đấu và trang bị')}>Lực chiến ${RT('lc',lucChien(),'luc')}</span><small>${UI.cbOpen?'thu gọn':'mở rộng'}</small></summary><div class="kvl">${[
      kvRow('Khí huyết',RT('maxHp',s.maxHp,'ben'),'Khí huyết tối đa dày hay mỏng. Về 0 là chết'),kvRow('Linh lực',RT('maxMp',s.maxMp,'ben'),'Thi triển pháp thuật'),
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
    b+=`<p class="hint">${R.mine?'Ngươi là đệ tử tông môn.':'Ngươi là tán tu, chưa vào tông môn nào.'}</p><div class="rows">${R.sects.map(s=>`<div class="row"><span class="r-i sect-i"><img src="${sectPic(s.n,s.al)}" alt=""></span><span class="r-t"><b>${esc(s.n)}</b><small>${AL[s.al]||s.al||''}</small></span></div>`).join('')}</div>`;}
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
  if(tab==='layer')b+=`<div class="sets">${setRow('Tên địa danh',onoff('names'))}${setRow('Thực thể qua lại',onoff('ents'),'Thương đội, thú triều, đệ tử tuần tra, thiên kiêu, dị tượng… đang di chuyển trên bản đồ')}${setRow('Lưới ô lục giác',onoff('grid'),'Lưới ô và ranh giới các quận. Ranh giới đại khu vực luôn hiện.')}${setRow('Dấu ghi chú',onoff('notes'))}${setRow('Địa hình vẽ tay',onoff('terrain'),'Tắt đi thì bản đồ chỉ còn nền giấy trơn, nhẹ máy nhất')}</div>`;
  if(tab==='legend'){const HT=CFG.hideT||{},HE=CFG.hideE||{};const any=Object.keys(HT).length+Object.keys(HE).length>0;
    const gi=(k,c)=>`<svg class="lgi" viewBox="0 0 24 24" style="background:var(--${c})"><path d="${GLYPH[k]}"/></svg>`;
    const ck=(act,k,on,inner)=>`<button class="lgc${on?' on':''}" data-act="${act}" data-arg="${k}"><i class="ckb">${on?ic('check'):''}</i>${inner}</button>`;
    const G1=[['Nơi có người',['tran','thanh','cho','tong','ancu','ai']],['Hoang dã',['rung','nui','song','bien','hoang','dam','thien']],['Tài nguyên',['linhdia','duoc','khoang','dong']],['Hiểm địa',['phe','ma','sao']]];
    b+=`<p class="hint">Bỏ chọn loại nào thì loại đó ẩn khỏi bản đồ.</p><div class="hbtns"><button data-act="legAll">${any?'Chọn hết':'Bỏ chọn hết'}</button></div>`;
    b+=`<h4 class="sgrp">Nhân vật</h4><div class="lgg">${ck('legT','_me',!HT._me,`<span class="lav me">${esc(avLetter(G.run?G.run.ten:'?'))}</span>Ngươi`)}</div>`;
    for(const [name,ks] of G1)b+=`<h4 class="sgrp">${name}</h4><div class="lgg">${ks.map(k=>ck('legT',k,!HT[k],gi(k,'ink2')+capS(TYPE_NAME[k]))).join('')}</div>`;
    b+=`<h4 class="sgrp">Người, vật qua lại</h4><p class="hint">Ô tròn có chữ là người. Dấu chân là bầy thú. Ngôi sao là dị tượng (cơ duyên, không phải người hay thú). Xe là thương đội.</p><div class="lgg">${Object.keys(ENT_T).map(k=>ck('legE',k,!HE[k],`<span class="lav e-${k}"${ta(ENT_DESC[k]||'')}>${k==='thuong'?`<img class="lwag" src="${WAGON_URI}" alt="">`:ENT_GLYPH[k]?ic(ENT_GLYPH[k]):esc(avLetter(ENT_T[k].n))}</span>`+ENT_T[k].n)).join('')}</div>
    <h4 class="sgrp">Màu nền biểu tượng · mức nguy hiểm so với ngươi</h4><div class="lgg">${DTAG.map((d,i)=>`<div class="nc-g dg${i}"><i></i>${d}</div>`).join('')}</div>
    <h4 class="sgrp">Linh khí</h4><p class="hint">${LK_N.join(' · ')}: xem trong thẻ địa điểm. Linh khí càng dồi dào, bế quan càng nhanh.</p>
    <h4 class="sgrp">Dấu phụ</h4><div class="lg"><div><i class="sq hollow"></i>Nghe đồn, chưa tận mắt thấy</div><div><i class="sq" style="background:var(--ink3);opacity:.6"></i>Ký ức kiếp trước hoặc tin đã cũ</div><div><i class="dt" style="background:var(--jade)"></i>Có động phủ</div><div><i class="dt" style="background:var(--gold)"></i>Có ghi chú của ngươi</div><div><i class="dt qd">!</i>Nơi cần tới của nhiệm vụ đang nhận</div><div><i class="sq" style="background:var(--ink2);width:8px;height:11px"></i>Có mộ cũ</div><div><i class="rd dash"></i>Thực thể chỉ nghe tin, vị trí lúc nghe</div></div>`;}
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
    +setRow('Tên địa danh',onoff('names'))+setRow('Thực thể qua lại',onoff('ents'),'Thương đội, thú triều, tuần tra, thiên kiêu, dị tượng trên bản đồ')+setRow('Dấu ghi chú',onoff('notes'))+setRow('Địa hình vẽ tay',onoff('terrain'));
  if(st==='play'){const ad=G.meta.opt&&G.meta.opt.userDodge;
    b+=setRow('Tự né',`<div class="seg"><button data-act="autoDodge" data-arg="0" class="${ad?'':'on'}">Tắt</button><button data-act="autoDodge" data-arg="1" class="${ad?'on':''}">Bật</button></div>`,'Bật thì không cần nhấn nút Né.\nLuôn tính như né ở mức khá, trừ đi 10%.')
    +setRow('Tự đánh',onoff('autoFight'),'Máy tự chọn chiêu và tự né trong trận')+setRow('Tốc độ trận',seg('cspeed',[[1,'×1'],[2,'×2'],[3,'×3']]))
    +setRow('Hỏi lại khi vào tử địa',onoff('confirmDanger'))+setRow('Đồng hồ tự chạy',onoff('clockIdle'),'Bật: đứng ở bản đồ thì 1 giây = 1 giờ.\nTắt: thời gian chỉ trôi khi ngươi làm việc gì đó.');}
  if(st==='data')b+=`</div><div class="menu"><button class="row" data-act="exp"><span class="r-i">${ic('book')}</span><span class="r-t"><b>Lấy mã lưu</b><small>Sao chép để cất hoặc chuyển sang máy khác</small></span></button><button class="row" data-act="imp"><span class="r-i">${ic('down')}</span><span class="r-t"><b>Nạp mã lưu</b></span></button><button class="row" data-act="newGame"><span class="r-i">${ic('cycle')}</span><span class="r-t"><b class="bad">${UI.confirm==='newGame'?'Bấm lần nữa để chơi lại từ đầu, không hoàn tác':'Chơi mới từ đầu'}</b><small>Xóa kiếp này, thế giới và mọi thứ tích lũy, rồi đầu thai lại</small></span></button><button class="row" data-act="wipe"><span class="r-i">${ic('trash')}</span><span class="r-t"><b class="bad">${UI.confirm==='wipe'?'Bấm lần nữa để xóa hết, không hoàn tác':'Xóa toàn bộ dữ liệu'}</b></span></button></div>
    ${UI.code!=null?`<textarea id="code" rows="4" placeholder="Dán mã lưu vào đây">${esc(UI.code)}</textarea>${UI.codeMode==='imp'?goBtn('impGo','Nạp'):''}`:''}${UI.msg?`<p class="hint">${esc(UI.msg)}</p>`:''}<div>`;
  return b+`</div><p class="hint ver">Phù Sinh · bản 3 · cấu hình đồ họa lưu riêng trên từng máy.</p>`;
}
// Tông môn: phát triển sau, tạm hiện các tông môn đã biết
function pTong(){const R=relations();const AL={chinh:'chính đạo',ta:'tà đạo',ma:'ma đạo',trung:'trung lập'};
  return win('Tông môn',`<div class="soon">${ib('flag','soft')}<b>Tông môn</b><p class="hint">Phần này đang được xây dựng: lập tông, chiêu đệ tử, xây điện các.</p></div><p class="hint">${R.mine?'Ngươi là đệ tử tông môn.':'Ngươi là tán tu, chưa vào tông môn nào.'}</p><div class="rows">${R.sects.map(s=>`<div class="row"><span class="r-i sect-i"><img src="${sectPic(s.n,s.al)}" alt=""></span><span class="r-t"><b>${esc(s.n)}</b><small>${AL[s.al]||s.al||''}</small></span></div>`).join('')}</div>`,{cls:'tall'});}
const PANEL_V={tong:pTong,char:pChar,pets:pPets,journal:pJournal,affairs:pAffairs,bonds:pBonds,more:pMore,craft:pCraft};

// ---------- Túi đồ: hình người mặc trang bị, đan điền uẩn dưỡng, vật tùy thân, linh thạch và các ô đồ ----------
// màu phẩm dùng chung: chữ tên và khung ảnh của mọi thứ có phẩm
const PCOL=['#8d8672','#4f8a4a','#4a6fae','#7b56a8','#c97a2b','#c05a94','#b8402f'];
const PHAM_FROM=['Phàm Nhân','Phàm Nhân','Luyện Khí','Trúc Cơ','Kết Đan','Nguyên Anh','Hóa Thần'];
function pcs(t){return '--pc:'+PCOL[clamp(t||0,0,6)];}
function qName(n,t){return `<b class="qt" style="${pcs(t)}">${esc(n)}</b>`;}
const SLOT_IC={vukhi:'M14 4h6v6L9 21l-2-2-3 1 1-3-2-2L14 4zM6 15l3 3',non:'M4 16c0-6 3-10 8-10s8 4 8 10zM2 16h20M12 6V3',boi:'M12 3v5M12 8a5 5 0 100 10 5 5 0 000-10zM12 18v3M12 11v4',gang:'M7 21v-9l-2-4 2-1 2 3V4h2v6V3h2v7-6h2v8l2-3 1 2-2 5v5z',giap:'M7 4l5 2 5-2 3 4-3 2v10H7V10L4 8z',choang:'M8 3h8l4 17H4zM8 3c1 3 7 3 8 0',nhan:'M12 9a6 6 0 100 12 6 6 0 000-12zM9 6l3-3 3 3-3 3z',dai:'M3 10h18v4H3zM10 9h4v6h-4z',phapbao:'M12 3l7 9-7 9-7-9zM5 12h14M12 3v18',giay:'M5 4h5v9l8 3v4H5zM5 16h13',tuivat:'M6 8h12l1 12H5L6 8zM9 8V6a3 3 0 016 0v2',
  phuongtien:'M5 13L17 3l2.5.5L20 6 9 17l-2.5-.5zM8 13l2 2M3 20c2-1.4 4-1.4 6 0s4 1.4 6 0 4-1.4 6 0M6 17c1.5-.8 3-.8 4.5 0',
  hoa:'M12 3c1 4 5 5 5 10a5 5 0 01-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-5 1-9z',dinh:'M6 8h12v6a6 6 0 01-12 0zM4 8h16M8 20l-1 2M16 20l1 2M9 5h6',tran:'M12 3l8 5v8l-8 5-8-5V8zM12 3v18M4 8l16 8M20 8L4 16',book:'M5 4h10l4 4v12H5zM15 4v4h4M8 12h8M8 16h6'};
function slotIcon(s){s=String(s).replace(/[123]$/,'');return `<svg class="sli" viewBox="0 0 24 24"><path d="${SLOT_IC[s]||SLOT_IC.phapbao}"/></svg>`;}
function relIcon(rel){return assetImg('item',rel.img||rel.k,slotIcon(rel.k==='book'?'book':slotOf(rel)));}
// ô ảnh vật phẩm (chừa chỗ gắn ảnh asset vuông)
function itemArt(x){if(x.ref&&x.ref.t==='rel')return relIcon(G.run.relics[x.ref.i]);const id=x.ref.t==='pill'?'pill:'+x.ref.id:x.ref.t==='mat'?'mat:'+x.ref.k:x.ref.t;return assetImg('item',id,x.em?`<span class="bem">${x.em}</span>`:slotIcon('phapbao'));}
// thẻ chú thích vật phẩm: tên và phẩm theo màu
function tipCard(o){const L=(o.lines||[]).filter(Boolean);return `<div class="tp" style="${pcs(o.t)}"><div class="tp-h"><span class="qi">${o.ic||''}</span><span><b>${esc(o.n)}</b><small><span class="qt">${PHAM[clamp(o.t||0,0,6)]}</span>${o.sub?' · '+esc(o.sub):''}</small></span></div>${L.length||o.lore?`<div class="tp-b">${L.length?'<ul>'+L.map(l=>'<li>'+esc(l)+'</li>').join('')+'</ul>':''}${o.lore?'<p>'+esc(o.lore)+'</p>':''}</div>`:''}</div>`;}
function relTip(rel){if(rel.k==='book'&&rel.art){const h=artTipH(rel.art);return h.replace(/<small><span class="qt">([^<]*)<\/span> · /,'<small><span class="qt">$1</span> · Bí tịch · ');}return tipCard({ic:relIcon(rel),n:rel.name,t:rel.tier,sub:rel.k==='book'?'Bí tịch':SLOT_N[slotOf(rel)]+' · hệ '+(EL[rel.el]||EL.vo).n,lines:rel.k==='book'?[]:fxLines(relicFx(rel),rel),lore:rel.lore});}
function itemTip(x){if(x.ref.t==='rel')return relTip(G.run.relics[x.ref.i]);const L=String(x.tip||'').split('\n').filter(Boolean);return tipCard({ic:itemArt(x),n:x.n,t:x.tier,sub:BAG_CAT[x.cat]+(x.cnt>1?' · ×'+x.cnt:''),lines:L.slice(1),lore:L[0]});}
function bagSt(){return UI.bag||(UI.bag={tab:'all',pham:-1,sort:0,sel:null,n:1});}
// ô thả xuống tự vẽ: chữ trong danh sách có màu (vd. tên phẩm)
function ddSel(act,label,opts,cur){const o=opts.find(x=>String(x.v)===String(cur))||opts[0];const open=UI.dd===act;
  return `<div class="ddw${open?' open':''}"><small>${label}</small><button class="dds" data-act="ddOpen" data-arg="${act}"><span>${o.h}</span>${ic(open?'up':'down')}</button>${open?`<div class="ddl">${opts.map(x=>`<button class="ddo${String(x.v)===String(cur)?' on':''}" data-act="${act}" data-arg="${x.v}">${x.h}</button>`).join('')}</div>`:''}</div>`;}
// một ô trang bị: bấm mở hộp chọn, nút X ở góc để tháo
function eqCell(key,label,rel,o){o=o||{};const tip=rel?tah(relTip(rel)):ta(o.tip||label+': trống. Chạm để chọn.');
  if(o.lock&&!rel)return `<span class="eqc lock"${tip}>${ic('lock')}<small>${label}</small></span>`;
  return `<button class="eqc${rel?' on':''}${o.lock?' lock':''}" data-act="slotPick" data-arg="${key}"${o.lock?' disabled':''} style="${rel?pcs(rel.tier):''}"${tip}>${rel?relIcon(rel):o.lock?ic('lock'):slotIcon(o.ic||'phapbao')}<small>${rel?esc(rel.name):label}</small>${o.badge?`<i>${o.badge}</i>`:''}${rel&&o.x?slotX(o.x[0],o.x[1],o.x[2]):''}</button>`;}
function itemLocked(x){const r=G.run;if(x.ref.t==='rel')return !!(r.relics[x.ref.i]&&r.relics[x.ref.i].lock);return !!(r.locks&&r.locks[x.key]);}
function bagTabHTML(){
  const r=run2(),E=eqOf(),B=bagSt();
  // --- cột trái: hình người, đan điền, vật tùy thân ---
  let L=`<div class="eqwrap"><div class="doll">${sceneCv('doll'+r.ten,r.region,'','dollbg','nhan:0.5:0.92:0:doll')}<div class="dgrid">${SLOTS.map(([k,n])=>eqCell('E'+k,n,E[k],{ic:k,x:['eqOff',k,'Tháo ra']})).join('')}</div></div>`;
  const dn=DD_N[r.realm];
  L+='<div class="ddpair"><div class="ddg">';
  {const po=pbOpen();L+=`<h4 class="sgrp">Pháp bảo <small>${PB_SLOTS.filter(k=>E[k]).length}/${po}</small><span class="grow"></span><span class="qhelp"${ta('Pháp bảo đang mang theo người: cho chỉ số. Ô thứ nhất mở ở Trúc Cơ, ô thứ hai ở Kết Đan, ô thứ ba ở Nguyên Anh.')}>${ic('info','sm')}</span></h4><div class="ddrow three">${PB_SLOTS.map((k,j)=>j<po?eqCell('E'+k,'Pháp bảo',E[k],{ic:'phapbao',x:['eqOff',k,'Tháo ra']}):eqCell('E'+k,REALM[PB_REQ[j]],null,{lock:1,ic:'phapbao',tip:'Mở khi đạt '+REALM[PB_REQ[j]]+'.'})).join('')}</div>`;}
  L+=`<h4 class="sgrp">Đan điền · uẩn dưỡng <small>${r.dd.length}/${dn}</small><span class="grow"></span><span class="qhelp"${ta('Vũ khí, pháp bảo nuôi trong đan điền mỗi năm mạnh thêm 5% (tối đa gấp đôi), vẫn cho chỉ số, và trong trận tế ra đánh được một lần.')}>${ic('info','sm')}</span></h4><div class="ddrow">${[0,1,2,3].map(j=>{const d=r.dd[j];if(d)return eqCell('D'+j,'',d.rel,{badge:'+'+Math.round((ddMul(d)-1)*100)+'%',x:['ddTake',j,'Lấy ra']});const need=DD_N.findIndex(x=>x>j);return eqCell('D'+j,j<dn?'Trống':REALM[need],null,{lock:j>=dn,ic:'phapbao',tip:j<dn?'Chạm để chọn vũ khí hoặc pháp bảo đưa vào uẩn dưỡng.':'Mở khi đạt '+REALM[need]+'.'});}).join('')}</div>`;
  L+='</div><div class="ddg">';
  L+=`<h4 class="sgrp">Pháp khí tùy thân</h4><div class="ddrow five">${SPEC.map(([k,n])=>{if(k==='phuongtien'){const m=mountOf();const off=r.vehOff||r.rentOff;return `<div class="eqc${m?' on':''}" style="${m?pcs(m.tier||1):''}"${off&&!m?' data-act="vehOn"':''}${ta(m?m.n+(m.d?'\n'+m.d:'')+'\nTốc độ ×'+numVN(m.m||1):off?'Đang tháo '+off.n+(off.v?off.v.n:'')+'. Chạm để dùng lại.':'Chưa có phương tiện. Sắm ở Trạm dịch trong thôn trấn.')}>${m&&m.k&&ASSET.veh&&ASSET.veh[m.k]?`<img class="asset" src="${ASSET.veh[m.k]}" alt="">`:slotIcon(k)}<small>${m?m.n:n}</small>${m?slotX('vehOff','','Tháo phương tiện'):''}</div>`;}return eqCell('E'+k,n,E[k],{ic:k,x:['eqOff',k,'Tháo ra']});}).join('')}</div>`;
  L+='</div></div></div>';
  // --- cột phải: bộ lọc, các ô đồ ---
  const items=bagItems();const cnt=c=>c==='all'?items.length:items.filter(x=>x.cat===c).length;
  const V=items.filter(x=>(B.tab==='all'||x.cat===B.tab)&&(B.pham<0||x.tier===B.pham));
  const SORT=['Phẩm cao','Phẩm thấp','Tên A–Z','Loại'];
  V.sort([(a,b)=>b.tier-a.tier||a.n.localeCompare(b.n),(a,b)=>a.tier-b.tier||a.n.localeCompare(b.n),(a,b)=>a.n.localeCompare(b.n),(a,b)=>a.cat.localeCompare(b.cat)||b.tier-a.tier][B.sort]);
  const cap=bagCap();
  const TOP=`<div class="bagtop"><div class="bst"${ta('Linh thạch: tiền tệ của giới tu tiên')}><span><small>Linh thạch</small>${stoneHTML(r.st)}</span></div><div class="bcap"${ta('Sức chứa tăng theo cảnh giới và túi trữ vật đang đeo.\nTối đa '+BAG_MAX+' ô.')}><small>Túi đồ</small><b>${items.length} / ${cap} ô</b></div><button class="icb" data-act="phamHelp" aria-label="Các phẩm"${ta('Bảng màu các phẩm')}>?</button></div>`;
  let R=`<div class="bfil">${ddSel('bagTab','Loại',Object.keys(BAG_CAT).map(c=>({v:c,h:esc(BAG_CAT[c])+(cnt(c)?` <small>${cnt(c)}</small>`:'')})),B.tab)}
   ${ddSel('bagPham','Phẩm',[{v:-1,h:'Mọi phẩm'}].concat(PHAM.map((p,i)=>({v:i,h:qName(p,i)}))),B.pham)}
   ${ddSel('bagSort','Sắp xếp',SORT.map((n,i)=>({v:i,h:n})),B.sort)}</div>`;
  const full=B.tab==='all'&&B.pham<0;
  const cells=V.map(x=>{const lk=itemLocked(x);return `<button class="bc on${B.sel===x.key?' sel':''}" data-act="bagSel" data-arg="${x.key}" style="${pcs(x.tier)}"${tah(itemTip(x))}>${itemArt(x)}${x.cnt>1?`<i>${x.cnt}</i>`:''}${lk?`<em class="lk">${ic('lock')}</em>`:''}${(()=>{const rl=x.ref&&x.ref.t==='rel'&&r.relics[x.ref.i];return rl&&rl.k!=='book'&&!relOk(rl)?`<em class="rq">${LV_NAME[relReq(rl)]}</em>`:'';})()}</button>`;}).join('');
  const emp=full?Math.max(0,cap-V.length):Math.max(0,Math.ceil(Math.max(V.length,10)/6)*6-V.length);
  const locked=full?Math.max(0,BAG_MAX-Math.max(cap,V.length)):0;
  R+=`<div class="bscroll"><div class="bgrid">${cells}${'<span class="bc"></span>'.repeat(emp)}${`<span class="bc lock"${ta('Ô bị khóa. Lên cảnh giới hoặc đeo túi trữ vật tốt hơn để mở.')}>${ic('lock')}</span>`.repeat(locked)}</div></div>`;
  if(!V.length&&items.length)R+=`<p class="hint">Không có món nào khớp bộ lọc.</p>`;
  return TOP+`<div class="bagwrap"><div class="bagL">${L}</div><div class="bagR">${R}<p class="hint">Chạm một món để xem và dùng. Ô trang bị: chạm để chọn đồ, dấu × ở góc để tháo.</p></div></div>`;
}
// hộp nhỏ khi chạm một món trong túi: thông tin và các nút dùng, vứt, khóa...
function itemModalHTML(m){
  const r=run2(),B=bagSt();const items=bagItems();const it=items.find(x=>x.key===m.key);if(!it)return '';const dn=DD_N[r.realm];
  const lk=itemLocked(it);let act='';
  const rel=it.ref.t==='rel'?r.relics[it.ref.i]:null;
  if(rel&&rel.k==='book'){const why=learnWhy(rel);act+=`<button class="btn pri" data-act="learn" data-arg="${it.ref.i}"${why?' disabled':''}${ta(why||'Tham ngộ mất '+durH(learnTime(rel.art)))}>${ic('book')} Học · ${durH(learnTime(rel.art))}</button>`;}
  else if(rel){act+=`<button class="btn pri" data-act="eqOn" data-arg="${it.ref.i}">Mặc vào</button>`+(ddCan(rel)?`<button class="btn" data-act="ddPut" data-arg="${it.ref.i}"${r.dd.length>=dn?' disabled':''}${ta(dn?'Đưa vào đan điền uẩn dưỡng':'Phải đạt Trúc Cơ mới uẩn dưỡng được')}>Uẩn dưỡng</button>`:'');}
  else if(it.use)act+=`<button class="btn pri" data-act="bagUse">Dùng${B.n>1?' '+B.n:''}</button>`;
  if(it.ref.t==='egg')act+=`<button class="btn" data-act="panel" data-arg="pets">Xem ở Linh thú</button>`;
  const n=clamp(B.n||1,1,it.cnt);B.n=n;
  const qty=it.cnt>1?`<div class="qty"><button class="btn sm" data-act="bagN" data-arg="-1">−</button><b>${n}</b><button class="btn sm" data-act="bagN" data-arg="1">+</button><button class="btn sm" data-act="bagN" data-arg="all">Tất cả</button></div>`:'';
  const canDrop=it.ref.t!=='pass';
  const sub=`<div class="bact sub"><button class="btn sm" data-act="bagLock"${ta(lk?'Mở khóa':'Khóa lại: không vứt nhầm được')}>${ic(lk?'unlock':'lock')} ${lk?'Mở khóa':'Khóa'}</button>${canDrop?`<button class="btn sm" data-act="bagDrop"${lk?' disabled':''}>${ic('trash')} ${UI.confirm==='drop'?'Chắc chứ?':'Vứt'+(n>1?' '+n:'')}</button>`:''}<button class="btn sm" disabled${ta('Phân giải: sắp có')}>Phân giải</button><button class="btn sm" disabled${ta('Tăng giai: sắp có')}>Tăng giai</button></div>`;
  return `<div class="mbox imod"><div class="mb-h"><span class="grow"></span><button class="xb" data-act="modalX" aria-label="Đóng">${ic('close')}</button></div>${itemTip(it)}${qty}${act?`<div class="bact">${act}</div>`:''}${sub}</div>`;
}
function relDetail(rel,act){return `<div class="pdet">${relTip(rel)}${act?`<div class="bact">${act}</div>`:''}</div>`;}
// bảng màu các phẩm
function phamHelpHTML(){return `<div class="mbox"><div class="mb-h"><h3>Các phẩm</h3><button class="xb" data-act="modalX" aria-label="Đóng">${ic('close')}</button></div><div class="plist">${PHAM.map((p,i)=>`<div class="pl" style="${pcs(i)}"><i class="qsw"></i><span>${qName(p,i)} công dụng ×${String(PHAM_M[i]).replace('.',',')} · từ ${PHAM_FROM[i]}</span></div>`).join('')}</div><p class="hint">Màu chữ và màu khung của mọi vật phẩm, công pháp, chiêu thức đều theo phẩm.</p></div>`;}

// ---------- hộp chọn: trang bị, đan điền, vòng vận công, ô kỹ năng, ô công pháp. Các lựa chọn xếp thành ô nhỏ ----------
function pickModalHTML(m){
  const r=run2(),E=eqOf();const k=m.key;let title='',cur='',C=[],empty='';
  // C: danh sách ứng viên {cell, det, act, arg}
  const relC=(x,i,act)=>({t:x.tier||0,cell:relIcon(x),tip:relTip(x),det:relTip(x),act,arg:i,btn:act==='eqPut'?'Mặc vào':act==='ddPutM'?'Uẩn dưỡng':'Chọn'});
  if(k[0]==='E'){const s=k.slice(1);title=SLOT_N[s.replace(/[123]$/,'')]||'Trang bị';const rel=E[s];
    if(rel)cur=relDetail(rel,`<button class="btn sm" data-act="eqOff" data-arg="${s}">${ic('close')} Tháo ra</button>`);
    C=r.relics.map((x,i)=>({x,i})).filter(o=>o.x.k!=='book'&&slotsFor(o.x).includes(s)).sort((a,b)=>(b.x.tier||0)-(a.x.tier||0)).map(o=>relC(o.x,o.i,'eqPut'));
    empty='Trong túi không có món nào hợp ô này.';}
  else if(k[0]==='D'){const j=+k.slice(1);const d=r.dd[j];title='Đan điền · ô '+(j+1);
    if(d)cur=relDetail(d.rel,`<span class="hint">Đã uẩn dưỡng ${durH(Math.max(1,W().t-d.t0))} · +${Math.round((ddMul(d)-1)*100)}%</span><button class="btn sm" data-act="ddTake" data-arg="${j}">${ic('close')} Lấy ra</button>`);
    else C=r.relics.map((x,i)=>({x,i})).filter(o=>o.x.k!=='book'&&ddCan(o.x)).sort((a,b)=>(b.x.tier||0)-(a.x.tier||0)).map(o=>relC(o.x,o.i,'ddPutM'));
    empty=d?'':'Chỉ vũ khí và pháp bảo uẩn dưỡng được. Trong túi chưa có món nào.';}
  else if(k[0]==='C'){const i=+k.slice(1);const v=chuView();const it=v.it[i];title='Đại huyệt '+(i+1)+(chuHuyet().includes(i)?' · huyệt đạo (×1,5)':'');
    if(it){const a=artBy(it.u);cur=`<div class="pdet">${artTipH(a,chuPot(v,i))}<div class="bact"><button class="btn sm" data-act="chuDel" data-arg="${i}">${ic('close')} Gỡ ra</button></div></div>`;}
    C=chuPool().map((c,j)=>({a:artBy(c.u),j})).filter(o=>o.a).sort((x,y)=>y.a.tier-x.a.tier).map(({a,j})=>({t:a.tier,cell:artArt(a),tip:artTipH(a),det:artTipH(a),act:'chuPut',arg:j,btn:'Vận hành'}));
    empty='Mọi môn đã học đều đang vận hành.';}
  else if(k[0]==='K'){const [c,iS]=k.slice(1).split(':');const i=+iS;syncSkills();const L=r.kn[c]||[];const av=knAvail(c);title=CAT_N[c];const id=L[i];
    if(id&&SK[id])cur=`<div class="pdet">${skTipH(SK[id],av[id]||1)}<div class="bact"><button class="btn sm" data-act="knDel" data-arg="${c}:${i}">${ic('close')} Gỡ khỏi ô</button></div></div>`;
    C=Object.keys(av).filter(x=>x!==id).sort((a,b)=>SK[b].t-SK[a].t).map(x=>({t:SK[x].t,cell:skArt(SK[x]),tip:skTipH(SK[x],av[x]),det:skTipH(SK[x],av[x]),act:'knPut',arg:x,btn:L.includes(x)?'Đổi chỗ vào ô này':'Gắn vào ô',name:SK[x].n}));
    empty=`Chưa có chiêu ${CAT_N[c].toLowerCase()} nào khác từ các công pháp đang vận hành.`;}
  else if(k[0]==='L'){const ty=k.slice(1);title='Chọn '+(ty==='cp'?'công pháp':'tâm pháp');
    // trong kho (đã học, đã tháo ra) trước, rồi tới bí tịch trong túi
    C=artKho().filter(a=>a.type===ty).sort((a,b)=>b.tier-a.tier).map(a=>({t:a.tier,cell:artArt(a)+'<i class="pk-tag">kho</i>',tip:artTipH(a),det:artTipH(a)+'<p class="hint">Đã học, đang cất trong kho. Lắp vào ngay, không tốn thời gian.</p>',act:'artUnstash',arg:a.u,btn:'Lắp vào ô',name:a.n})).concat(r.relics.map((x,i)=>({x,i})).filter(o=>o.x.k==='book'&&o.x.art.type===ty).sort((a,b)=>b.x.tier-a.x.tier).map(o=>{const why=learnWhy(o.x);return {t:o.x.tier,cell:artArt(o.x.art),tip:artTipH(o.x.art),det:artTipH(o.x.art)+(why?`<p class="hint bad">${esc(why)}</p>`:''),act:'learn',arg:o.i,btn:'Học · '+durH(learnTime(o.x.art)),dis:!!why};}));
    empty='Trong kho và trong túi không có bí tịch '+(ty==='cp'?'công pháp':'tâm pháp')+' nào. Tìm ở phường thị, Tàng Kinh Các, kỳ ngộ.';}
  const sel=clamp(m.sel||0,0,Math.max(0,C.length-1));const S0=C[sel];
  const grid=C.length?`<div class="pgrid">${C.map((c,j)=>`<button class="bc on${j===sel?' sel':''}" data-act="pickSel" data-arg="${j}" style="${pcs(c.t)}"${tah(c.tip)}>${c.cell}</button>`).join('')}</div>`:(empty?`<p class="hint">${empty}</p>`:'');
  const det=S0?`<div class="pdet">${S0.det}<div class="bact"><button class="btn pri" data-act="${S0.act}" data-arg="${S0.arg}"${S0.dis?' disabled':''}>${S0.btn}</button></div></div>`:'';
  return `<div class="mbox pick"><div class="mb-h"><h3>${esc(title)}</h3><button class="xb" data-act="modalX" aria-label="Đóng">${ic('close')}</button></div>${cur?`<h4 class="sgrp">Đang dùng</h4>${cur}`:''}${C.length||empty?`<h4 class="sgrp">${cur?'Đổi sang':'Chọn'} <small>${C.length}</small></h4>`:''}${grid}${det}</div>`;
}

// ---------- công pháp, tâm pháp, chiêu: ô ảnh (chừa chỗ asset) và thẻ chú thích ----------
// ảnh công pháp, tâm pháp, chiêu: tranh nhỏ theo chủ đề; hệ là biểu tượng nhỏ ở góc dưới phải
function artArt(a){return assetImg('art',a.n,`<img class="asset" src="${artUri(a.n,a.el,a.type==='tp'?'tp':'cp')}" alt="">`)+`<i class="elb">${elSeal(a.el)}</i>`;}
function skArt(sk){return assetImg('art',sk.n,`<img class="asset" src="${artUri(sk.n,sk.el,skCat(sk)||'atk')}" alt="">`)+`<i class="elb">${elSeal(sk.el)}</i>`;}
function lvPips(lv,n){n=n||3;return `<span class="lvp">${Array.from({length:n},(_,i)=>`<i class="${i<lv?'on':''}"></i>`).join('')}</span>`;}
function artTipH(a,pot){normArt(a);const r=G.run;const known=arts().includes(a);
  const li=a.lines.map((x,k)=>{const on=known&&artOpen(a,k);const why=!known?'':k>=a.lv?'tầng '+(k+1):r.realm<x.req?'cần '+reqName(x.req):'';return `<li class="${on?'on':'off'}${x.sk||x.mind?' skl':''}">${esc(lineText(a,x,pot))}${x.req>a.req&&!why?` <small>(${reqName(x.req)})</small>`:''}${why?` <small>· ${why}</small>`:''}</li>`;}).join('');
  return `<div class="tp" style="${pcs(a.tier)}"><div class="tp-h"><span class="qi">${artArt(a)}</span><span><b>${esc(a.n)}</b><small><span class="qt">${PHAM[a.tier]}</span> · ${a.type==='cp'?'Công pháp':'Tâm pháp'} · hệ ${(EL[a.el]||EL.vo).n}</small><small>Cần <b>${reqName(a.req)}</b>${known?' · '+LV_N[a.lv-1]+' / '+a.lines.length:''}</small></span></div><div class="tp-b"><ul class="alines">${li}</ul></div></div>`;}
function skTipH(sk,lv){const L=String(skillTip(sk,lv||1)).split('\n').filter(Boolean);return tipCard({ic:skArt(sk),n:sk.n,t:sk.t,sub:CAT_N[skCat(sk)]+' · '+skillCost(sk)+' linh lực',lines:L.slice(1)});}

// ---------- vòng vận công: đan điền ở giữa đổi hình theo cảnh giới, các huyệt tròn xếp quanh ----------
function danTianSVG(rl,cx,cy){
  const T=`transform-origin:${cx}px ${cy}px`;
  const glow=(id,c,o)=>`<radialGradient id="${id}"><stop offset="0" stop-color="${c}" stop-opacity="${o}"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></radialGradient>`;
  let d=`<defs><filter id="dtb" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="5"/></filter><filter id="dtb2" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="2"/></filter>${glow('dtg0','#bfe3ff',.55)}${glow('dtg1','#ffffff',.9)}${glow('dtg2','#ffd76a',.8)}${glow('dtg3','#c9b8ff',.7)}${glow('dtg4','#ffe9b0',.85)}${glow('dtg5','#b58cff',.8)}
    <radialGradient id="dtpearl" cx=".35" cy=".3"><stop offset="0" stop-color="#fff"/><stop offset=".6" stop-color="#eef6ff"/><stop offset="1" stop-color="#b9cde0"/></radialGradient>
    <radialGradient id="dtgold" cx=".35" cy=".3"><stop offset="0" stop-color="#fff6c8"/><stop offset=".45" stop-color="#f2c24a"/><stop offset="1" stop-color="#9a6a12"/></radialGradient>
    <radialGradient id="dtorb" cx=".38" cy=".32"><stop offset="0" stop-color="#ffffff" stop-opacity=".9"/><stop offset=".5" stop-color="#d9ccff" stop-opacity=".55"/><stop offset="1" stop-color="#7d68c9" stop-opacity=".75"/></radialGradient>
    <radialGradient id="dtvio" cx=".38" cy=".32"><stop offset="0" stop-color="#fff"/><stop offset=".5" stop-color="#b58cff"/><stop offset="1" stop-color="#4b2a8c"/></radialGradient></defs>`;
  if(rl<=0){ // Luyện Khí: một đám linh khí xoáy, chưa thành hình
    d+=`<circle cx="${cx}" cy="${cy}" r="56" fill="url(#dtg0)"/><g class="dt-spin" style="${T}" filter="url(#dtb)">${[0,1,2,3,4].map(i=>{const a=i*1.256;return `<ellipse cx="${cx+Math.cos(a)*16}" cy="${cy+Math.sin(a)*16}" rx="22" ry="12" transform="rotate(${i*36} ${cx+Math.cos(a)*16} ${cy+Math.sin(a)*16})" fill="#cfe9ff" opacity=".55"/>`;}).join('')}</g>
     <g class="dt-spin-r" style="${T}" fill="none" stroke="#e8f5ff" stroke-width="2" stroke-linecap="round" opacity=".8" filter="url(#dtb2)"><path d="M${cx-26} ${cy}a26 26 0 0 1 40-20"/><path d="M${cx+22} ${cy+10}a24 24 0 0 1-34 14"/><path d="M${cx-8} ${cy-14}a12 12 0 0 1 16 10"/></g>
     <circle class="dt-pulse" style="${T}" cx="${cx}" cy="${cy}" r="9" fill="#fff" opacity=".7" filter="url(#dtb2)"/>`;}
  else if(rl===1){ // Trúc Cơ: hạt ngọc trắng nhỏ phát sáng, xoay quanh mình, có vài đốm linh quang bay theo
    d+=`<circle class="dt-pulse" style="${T}" cx="${cx}" cy="${cy}" r="50" fill="url(#dtg1)" opacity=".7"/><circle cx="${cx}" cy="${cy}" r="32" fill="none" stroke="#fff" stroke-opacity=".35" stroke-dasharray="2 5"/>
     <g class="dt-spin" style="${T}"><circle cx="${cx}" cy="${cy-32}" r="4" fill="#fff" filter="url(#dtb2)"/><circle cx="${cx+28}" cy="${cy+16}" r="2.5" fill="#fff" opacity=".8"/><circle cx="${cx-28}" cy="${cy+16}" r="2" fill="#fff" opacity=".7"/></g>
     <circle cx="${cx}" cy="${cy}" r="20" fill="#fff" opacity=".6" filter="url(#dtb)"/><g class="dt-spin-r" style="${T}"><circle cx="${cx}" cy="${cy}" r="14" fill="url(#dtpearl)"/><ellipse cx="${cx-5}" cy="${cy-6}" rx="4.5" ry="2.6" fill="#fff" opacity=".9"/></g>`;}
  else if(rl===2){ // Kết Đan: kim đan vàng lớn, phát sáng, có vòng đan khí cuộn quanh
    d+=`<circle class="dt-pulse" style="${T}" cx="${cx}" cy="${cy}" r="60" fill="url(#dtg2)"/>
     <g class="dt-spin" style="${T}" fill="none" stroke="#ffd76a" stroke-width="2" stroke-linecap="round"><ellipse cx="${cx}" cy="${cy}" rx="44" ry="14" opacity=".7" stroke-dasharray="30 18"/><ellipse cx="${cx}" cy="${cy}" rx="44" ry="14" transform="rotate(60 ${cx} ${cy})" opacity=".5" stroke-dasharray="20 26"/><ellipse cx="${cx}" cy="${cy}" rx="44" ry="14" transform="rotate(-60 ${cx} ${cy})" opacity=".5" stroke-dasharray="14 30"/></g>
     <circle cx="${cx}" cy="${cy}" r="30" fill="#ffd76a" opacity=".55" filter="url(#dtb)"/><g class="dt-bob" style="${T}"><circle cx="${cx}" cy="${cy}" r="25" fill="url(#dtgold)"/><path d="M${cx-14} ${cy+6}q14 10 28 0" fill="none" stroke="#fff3c0" stroke-opacity=".5" stroke-width="2"/><ellipse cx="${cx-9}" cy="${cy-10}" rx="7" ry="4" fill="#fffbe6" opacity=".85"/></g>`;}
  else if(rl===3){ // Nguyên Anh: một hài nhi ngồi tĩnh tọa trong hòn ngọc trong suốt
    d+=`<circle class="dt-pulse" style="${T}" cx="${cx}" cy="${cy}" r="62" fill="url(#dtg3)"/><g class="dt-bob" style="${T}"><circle cx="${cx}" cy="${cy}" r="36" fill="url(#dtorb)" stroke="#fff" stroke-opacity=".5"/>
     <g fill="#fff6e8" opacity=".95" filter="url(#dtb2)"><circle cx="${cx}" cy="${cy-13}" r="7"/><path d="M${cx-9} ${cy-4}q9-5 18 0l3 13q-12 6-24 0z"/><ellipse cx="${cx}" cy="${cy+12}" rx="15" ry="5"/></g>
     <g fill="#fff6e8"><circle cx="${cx}" cy="${cy-13}" r="5.5"/><path d="M${cx-8} ${cy-4}q8-4 16 0l2.5 12q-10.5 5-21 0z"/><ellipse cx="${cx}" cy="${cy+11.5}" rx="13" ry="4"/></g>
     <ellipse cx="${cx-13}" cy="${cy-18}" rx="9" ry="5" fill="#fff" opacity=".7"/></g>
     <g class="dt-spin" style="${T}"><circle cx="${cx+46}" cy="${cy}" r="3" fill="#e7deff"/><circle cx="${cx-46}" cy="${cy}" r="2" fill="#e7deff"/></g>`;}
  else if(rl===4){ // Hóa Thần: nguyên thần tỏa hào quang, tia sáng xoay chậm
    d+=`<circle class="dt-pulse" style="${T}" cx="${cx}" cy="${cy}" r="64" fill="url(#dtg4)"/><g class="dt-spin" style="${T}" stroke="#ffe9b0" stroke-width="2" stroke-linecap="round" opacity=".7">${Array.from({length:12},(_,i)=>{const a=i*Math.PI/6;return `<line x1="${cx+Math.cos(a)*34}" y1="${cy+Math.sin(a)*34}" x2="${cx+Math.cos(a)*(i%2?44:52)}" y2="${cy+Math.sin(a)*(i%2?44:52)}"/>`;}).join('')}</g>
     <circle cx="${cx}" cy="${cy}" r="30" fill="#fff8dc" opacity=".8" filter="url(#dtb)"/><circle cx="${cx}" cy="${cy}" r="34" fill="none" stroke="#d9a640" stroke-opacity=".55" stroke-width="1.5"/><g class="dt-bob" style="${T}" fill="#fffaf0" stroke="#c9952e" stroke-width="1.2"><circle cx="${cx}" cy="${cy-12}" r="6"/><path d="M${cx-10} ${cy-3}q10-5 20 0l4 14q-14 7-28 0z"/><ellipse cx="${cx}" cy="${cy+12}" rx="18" ry="5"/></g>`;}
  else { // Độ Kiếp: hòn ngọc tím tích lôi
    d+=`<circle class="dt-pulse" style="${T}" cx="${cx}" cy="${cy}" r="64" fill="url(#dtg5)"/><circle cx="${cx}" cy="${cy}" r="30" fill="url(#dtvio)"/><g class="dt-spin-r" style="${T}" fill="none" stroke="#efe2ff" stroke-width="1.8" stroke-linejoin="round"><path d="M${cx-30} ${cy-10}l10 6-6 6 12 4"/><path d="M${cx+28} ${cy+12}l-10-4 5-7-12-5"/><path d="M${cx-4} ${cy+30}l2-11 6 3 1-11"/></g><ellipse cx="${cx-9}" cy="${cy-12}" rx="8" ry="4.5" fill="#fff" opacity=".8"/>`;}
  return d;
}
function chuHTML(){
  const r=run2();const v=chuView();const n=v.n;const R=124,cx=160,cy=160;
  const P=i=>{const a=-Math.PI/2+i*2*Math.PI/n;return [cx+R*Math.cos(a),cy+R*Math.sin(a)];};
  const LC={1:'var(--jade)',2:'var(--gold)','-1':'var(--seal)',0:'var(--line)'};
  const HY2=chuHuyet();
  let svg=`<svg class="chu" viewBox="0 0 320 320">`;
  for(let i=0;i<n;i++){if(!v.it[i])continue;const p=P(i),a=Math.atan2(p[1]-cy,p[0]-cx);const x0=cx+Math.cos(a)*60,y0=cy+Math.sin(a)*60,x1=p[0]-Math.cos(a)*21,y1=p[1]-Math.sin(a)*21;
    svg+=`<line class="lk-g" x1="${x0}" y1="${y0}" x2="${x1}" y2="${y1}"/><line class="lk" style="animation-delay:-${(i*0.37).toFixed(2)}s" x1="${x0}" y1="${y0}" x2="${x1}" y2="${y1}"/>`;}
  svg+=danTianSVG(r.realm,cx,cy);
  for(let i=0;i<n;i++){const p=P(i),it=v.it[i];const st=it?` style="${pcs(it.tier||0)}"`:'';const hy=HY2.includes(i);
    svg+=`<g class="chu-n${it?' on':''}${hy?' hy-on':''}"${st} data-act="chuPick" data-arg="${i}" transform="translate(${p[0]} ${p[1]})"><circle class="chu-o" r="19"/>${it?`<circle r="13.5" class="chu-in el-${it.el}"/><path class="chu-ei" transform="translate(-7.5 -7.5) scale(.625)" d="${EL_P[it.el]||EL_P.vo}"/>`:'<path class="chu-p" d="M-5 0h10M0 -5v10"/>'}${hy?'<circle class="hy" cx="13" cy="-13" r="4"/>':''}${it?`<g class="chu-x" data-act="chuDel" data-arg="${i}" transform="translate(-14 -14)"><circle r="6"/><path d="M-2.3 -2.3L2.3 2.3M2.3 -2.3L-2.3 2.3"/></g>`:''}</g>`;}
  // tiểu huyệt: rải quanh đan điền, lệch nhẹ vào ra cho tự nhiên
  const TL=thList();
  for(let i=0;i<TH_N;i++){const ang=-Math.PI/2+(i+0.5)*2*Math.PI/TH_N;const rr=88;const x=cx+Math.cos(ang)*rr,y=cy+Math.sin(ang)*rr;const on=TL.includes(i);
    svg+=`<g class="th-n${on?' on':''}" data-act="thPick" data-arg="${i}" transform="translate(${x.toFixed(1)} ${y.toFixed(1)})"><circle class="th-hit" r="11"/><circle class="th-o el-${thEl(i)}" r="${on?6.5:5}"/></g>`;}
  svg+='</svg>';
  const blk=chuBlocked();
  let h=svg+`<div class="chips cen">${chipSpan('up','Mỗi mối tương sinh: hệ của ô nhận +6% uy lực, linh lực +3%','sinh '+v.sinh)}${chipSpan('','Hai ô cạnh nhau cùng hệ: +3% uy lực','đồng '+v.dong)}${chipSpan('dn','Mỗi mối tương khắc: hệ bị khắc −5% uy lực','khắc '+v.khac)}${chipSpan(v.dai?'item':'','Kín vòng, không mối khắc, hở tối đa một mối: tu luyện +15%, khí huyết +8%',v.dai?'Đại chu thiên ✓':'Đại chu thiên ✗')}</div>`;
  h+=`<div class="hbtns"><button data-act="chuAuto"${ta('Máy thử xếp sao cho nhiều mối tương sinh nhất')}>Tự xếp</button><button data-act="chuClear">Gỡ hết</button>${blk?`<button data-act="chuUnblock"${r.tv<15||r.scene||r.moving?' disabled':''}${ta('Còn '+blk+' ô kinh mạch bị tắc.\nDồn chân khí xung phá một ô: tốn 15% tu vi và 6 tháng.')}>${ic('lock')} Đả thông</button>`:''}</div>`;
  return h;
}
function chipSpan(c,tip,t){return `<span class="chip ${c}"${ta(tip)}>${t}</span>`;}

// ---------- Sở học: các ô công pháp, tâm pháp (số ô có hạn theo cảnh giới) và vòng vận công ----------
function artSlot(a){const r=G.run;const v=chuView();return r.chu.findIndex((c,i)=>i<v.n&&c&&c.u===a.u);}
function artCard(a){const r=G.run;const v=chuView();const slot=artSlot(a);const pot=slot>=0?chuPot(v,slot):null;const aff=artAff(a);
  return `${artTipH(a,pot)}<div class="art-st">${lvPips(a.lv,a.lines.length)}<span class="${slot>=0?'good':'hint'}">${slot>=0?'Đang vận hành · ×'+numVN(pot):'Chưa vận hành'}</span>${aff<1?`<span class="bad"${ta('Không hợp linh căn: hiệu quả còn 80%')}>lệch linh căn</span>`:''}</div>
   <div class="bact">${slot<0?`<button class="btn pri sm" data-act="artRun" data-arg="${a.u}"${chuView().it.filter(Boolean).length>=chuSlots()?' disabled':''}>Vận hành</button>`:`<button class="btn sm" data-act="chuDel" data-arg="${slot}">Ngừng vận hành</button>`}<button class="btn sm" data-act="study" data-arg="${a.u}"${artNextWhy(a)||r.scene||r.moving?' disabled':''}${ta(artNextWhy(a)||'Tham ngộ lên tầng '+(a.lv+1)+': mở dòng kế tiếp.')}>${a.lv>=a.lines.length?'Viên mãn':'Tham ngộ · '+durH(studyTime(a))}</button><button class="btn sm" data-act="forget" data-arg="${a.u}">${UI.confirm==='fg'+a.u?'Chắc chứ?':'Phế bỏ'}</button></div>`;}
function artModalHTML(m){const a=artBy(+m.u);if(!a)return '';return `<div class="mbox imod"><div class="mb-h"><span class="grow"></span><button class="xb" data-act="modalX" aria-label="Đóng">${ic('close')}</button></div>${artCard(a)}</div>`;}
function artGrid(type){const r=run2();const A=arts().filter(a=>a.type===type).sort((a,b)=>(artSlot(b)>=0)-(artSlot(a)>=0)||b.tier-a.tier);const cap=artCap(type);const books=r.relics.filter(x=>x.k==='book'&&x.art.type===type).length+artKho().filter(x=>x.type===type).length;
  let h=A.map(a=>{const s=artSlot(a);return `<button class="acell${s>=0?' run':''}" data-act="artOpen" data-arg="${a.u}" style="${pcs(a.tier)}"${tah(artTipH(a))}><span class="qi">${artArt(a)}<i class="alv"${ta('Tầng '+a.lv+' / '+a.lines.length)}>${a.lv}</i></span><b class="qt">${esc(a.n)}</b>${slotX('artStash',a.u,'Tháo ra, cất vào kho công pháp')}</button>`;}).join('');
  for(let i=A.length;i<cap;i++)h+=`<button class="acell emp" data-act="slotPick" data-arg="L${type}"${ta(books?'Có '+books+' môn trong kho và trong túi. Chạm để chọn.':'Ô trống. Tìm bí tịch để học.')}><span class="qi">${ic('plus')}</span><small>${books?books+' môn chờ':'trống'}</small></button>`;
  // luôn bày đủ 10 ô (2 hàng × 5); ô chưa mở ghi cảnh giới cần
  for(let i=Math.max(A.length,cap);i<ART_MAX;i++){const nx=ART_CAP[type].findIndex(x=>x>i);h+=`<span class="acell lockc"${ta('Mở khi đạt '+REALM[nx])}><span class="qi">${ic('lock')}</span><small>${REALM[nx]}</small></span>`;}
  const kh='';
  return `<div class="agrid2">${h}</div>${kh}`;}
function hocTabHTML(){const A=arts();const v=chuView();
  const head=(icn,t,type)=>`<h4 class="sgrp">${ib(icn,'soft')}${t} <small>${A.filter(a=>a.type===type).length}/${artCap(type)}</small></h4>`;
  const R=head('sword','Công pháp','cp')+artGrid('cp')+head('lotus','Tâm pháp','tp')+artGrid('tp');
  const L=`<h4 class="sgrp">${ib('cycle','soft')}Khí Hải <small>${v.it.filter(Boolean).length}/${chuSlots()} · tiểu huyệt ${thList().length}/${TH_N}</small><span class="grow"></span><span class="qhelp"${ta('Khí Hải là đan điền và các huyệt quanh nó.\nĐại huyệt (ô lớn): đặt công pháp, tâm pháp để vận hành. Mỗi cảnh giới mở thêm một ô.\nHai đại huyệt cạnh nhau: hành trước sinh hành sau thì mạnh lên, khắc thì yếu đi (Mộc → Hỏa → Thổ → Kim → Thủy → Mộc).\nChấm vàng: huyệt đạo, mạnh gấp rưỡi.\nTiểu huyệt (chấm nhỏ): khai bằng tu vi và linh thạch, mỗi cái cho một chỉ số nhỏ; cùng hành với môn ở đại huyệt gần nó thì môn đó mạnh thêm 8%.')}>${ic('info','sm')}</span></h4>`+chuHTML();
  return `<div class="hocwrap"><div class="hocR">${R}</div><div class="hocL">${L}</div></div>`;}
// ---------- Kỹ năng: gắn chiêu vào ô dùng trong trận, xem nội tại đang chạy ----------
function knTabHTML(){const r=run2();syncSkills();
  let h=`<div class="knwrap">`;
  for(const c in CAT_MAX){const av=knAvail(c);const L=r.kn[c];
    h+=`<div class="knline"><div class="kn-c">${ib({atk:'sword',def:'shield',move:'wind',ult:'spark'}[c],'soft')}<b>${CAT_N[c]}</b><small>${L.length}/${CAT_MAX[c]}</small></div><div class="knrow">`;
    for(let i=0;i<CAT_MAX[c];i++){const id=L[i];const sk=id&&SK[id];
      h+=`<button class="kns${sk?' on':''}" data-act="knPick" data-arg="${c}:${i}" style="${sk?pcs(sk.t):''}"${sk?tah(skTipH(sk,av[id])):ta('Ô trống. Chạm để chọn chiêu.')}>${sk?`<span class="qi">${skArt(sk)}</span><span class="at-t"><b class="qt">${esc(sk.n)}</b><small>${skillCost(sk)} linh lực</small></span>`+slotX('knDel',c+':'+i,'Gỡ chiêu'):`<span class="kn-e">${ic('plus')}</span><small>${Object.keys(av).length?'chọn chiêu':'trống'}</small>`}</button>`;}
    h+='</div></div>';}
  h+='</div><p class="hint">Chiêu lấy từ các công pháp đang vận hành. Trong trận, Tấn công và Thân pháp nằm ở nút Tấn công; Phòng thủ nằm ở nút Phòng thủ. Thần thông: khi thần lực đầy, chạm avatar để hiển hóa pháp tướng, chạm lần nữa để tung đòn tối thượng.</p>';
  const m=mindArt();
  if(m)h+=`<h4 class="sgrp">${ib('eye','soft')}Thần thức</h4><div class="row"><span class="r-i">${ic('eye')}</span><span class="r-t"><b>Thần Thức Thứ</b><small>Từ ${qName(m.n,m.tier)} · tốn 30% linh lực · niệm lực ${S().than}: hơn đối thủ thì làm choáng</small></span></div>`;
  const P=[];const vv=chuView();vv.it.forEach((it,i)=>{if(!it)return;const a=artBy(it.u);artFxList(a,chuPot(vv,i)).forEach(x=>P.push([a,(x.n?x.n+': ':'')+x.t.replace('{v}',numFx(x.v))]));});
  h+=`<h4 class="sgrp">${ib('cycle','soft')}Nội tại đang vận hành <small>${P.length}</small></h4>`+(P.length?`<div class="kvl">${P.map(([a,t])=>`<div class="kr"><span>${esc(t)}</span><b class="qt sm" style="${pcs(a.tier)}">${esc(a.n)}</b></div>`).join('')}</div>`:'<p class="hint">Chưa có.</p>');
  return h;}
// hộp tiểu huyệt: hành, công dụng, đại huyệt gần nhất, giá khai
function thModalHTML(m){const i=+m.i;const r=G.run;const el=thEl(i);const f=TH_FX[el];const on=thList().includes(i);const v=chuView();const j=thNear(i,v.n);const it=v.it[j];const c=thCost();const why=thWhy(i);
  const same=it&&chuBase(it.el)===el;
  return `<div class="mbox imod"><div class="mb-h"><h3>Tiểu huyệt · hành ${EL[el].n}</h3><button class="xb" data-act="modalX" aria-label="Đóng">${ic('close')}</button></div>
   <div class="kv"><div><span>Trạng thái</span><b class="${on?'good':''}">${on?'Đã khai thông':'Còn bế tắc'}</b></div><div><span>Công dụng</span><b>${f[2].replace('{v}',numFx(f[1]))}</b></div>
   <div><span>Đại huyệt gần nhất</span><b>${it?esc(it.n):'ô '+(j+1)+' đang trống'}</b></div><div><span>Cộng hưởng</span><b class="${same&&on?'good':''}">${same?'cùng hành: môn ở đó +8%':'khác hành: không cộng hưởng'}</b></div></div>
   ${on?'':`<p class="hint">Khai thông tốn ${c.tv}% tu vi, ${c.st} linh thạch và ${durH(c.h)}. ${realmName()} khai tối đa ${TH_MAX[clamp(r.realm,0,5)]} tiểu huyệt (đã khai ${thList().length}).</p>${why?`<p class="hint bad">${esc(why)}</p>`:''}<div class="mb-f"><button class="btn" data-act="modalX">Thôi</button><button class="btn pri" data-act="thOpen" data-arg="${i}"${why?' disabled':''}>Khai huyệt</button></div>`}</div>`;}

// thẻ nhiệm vụ dùng chung cho sổ tay và bảng treo thưởng: mở rộng, dẫn đường, hủy
function questCardHTML(q){const w=W();const g=questGrade(q);const op=q.state==='open';const ex=UI.qOpen[q.id];const tg=nodeById(q.node);const fn=nodeById(q.from);
      return `<div class="qcard${op?'':' dim'}${g>=5?' q5':''}" style="${qpc(g)}"><div class="qc-h"><span class="r-i">${q.state==='done'?ic('check'):q.state==='fail'?ic('close'):ic('hour')}</span><span class="r-t"><b>${esc(q.text)}</b><small><span class="qgr">${QGRADE[g]}</span> · ${op?'còn '+durH(Math.max(0,q.due-w.t)):q.state==='done'?'đã xong':q.dropped?'đã trả lại':'thất hứa'}</small></span>
        <span class="qc-b"><button class="icb" data-act="qExp" data-arg="${q.id}"${ta(ex?'Thu gọn':'Xem thêm')}>${ic(ex?'up':'down')}</button>${op?`<button class="icb" data-act="qNav" data-arg="${q.id}"${ta('Dẫn đường: đưa bản đồ tới nơi cần tới')}>${ic('target')}</button><button class="icb" data-act="qDrop" data-arg="${q.id}"${ta('Hủy nhiệm vụ')}>${ic('trash')}</button>`:''}</span></div>
        ${ex?`<div class="qc-d"><p>${esc(q.d||(q.kind==='diet'?'Tới nơi, vào mục Nhiệm vụ trong địa điểm để lùng tìm và hạ mục tiêu.':'Tới nơi, vào mục Nhiệm vụ trong địa điểm để giao tận tay.'))}</p><div class="kv"><div><span>Nơi tới</span><b>${esc(tg&&tg.fog>=1?tg.name:'chưa rõ')}</b></div><div><span>Nhận ở</span><b>${esc(fn?fn.name:'')}</b></div><div class="qrw-row"><span>Phần thưởng</span><b class="qrw">${chipsHTML(questRewardChips(q))}</b></div><div><span>Hủy thì phạt</span><b class="bad">mất ${questPenalty(q).st} linh thạch, nhân quả ${questPenalty(q).karma}</b></div></div></div>`:''}</div>`;}
const ENT_DESC={thuong:'Thương đội: đoàn xe buôn đi giữa các thôn trấn. Ảnh nhỏ trên xe là người dẫn đầu.',thutrieu:'Thú triều: bầy yêu thú kéo đi thành đàn. Không phải người, gặp là phải đánh.',tuantra:'Đệ tử tuần tra của tông môn quanh vùng.',thienkieu:'Thiên kiêu: thiên tài trẻ của các tông môn đi lịch luyện.',truysat:'Kẻ truy sát đang lùng tìm ngươi.',di:'Dị tượng: cơ duyên hiện ra trong ít ngày như bí cảnh mở cửa, sao rơi, hội đấu giá. Không phải người hay thú, là một nơi đáng tới.',khach:'Khách qua đường: lữ khách, tiều phu, thợ săn, thư sinh...'};

// phàm nhân: khóa tab Kỹ năng và Khí Hải
const PHAM_LOCK=(t,d)=>`<div class="pham-lock">${ic('lock')}<b>${t}</b><p>${d}</p></div>`;
{const _kn=knTabHTML;knTabHTML=function(){return isPham()?PHAM_LOCK('Chưa dẫn khí nhập thể','Phàm nhân chưa có linh lực nên chưa dùng được chiêu thức. Trong trận chỉ đánh thường, thủ thế, đỡ đòn và dùng đồ. Đủ tu vi để dẫn khí nhập thể, bước vào Luyện Khí thì mở.'):_kn();};}
{const _hc=hocTabHTML;hocTabHTML=function(){const h=_hc();if(!isPham())return h;const i=h.indexOf('<div class="hocL">');return i<0?h:h.slice(0,i)+'<div class="hocL">'+PHAM_LOCK('Khí Hải chưa mở','Phàm nhân chưa dẫn khí vào thân, đan điền còn trống. Dẫn khí nhập thể rồi mới vận hành công pháp trong Khí Hải được.')+'</div></div>';};}
// ô dẫn khí của phàm nhân: chạy tâm pháp nhập môn
function tuSlotHTML(){const a=tuArt();const r=G.run;
  if(a)return `<h4 class="sgrp">${ib('lotus','soft')}Ô dẫn khí</h4><div class="tu-slot on" style="${pcs(a.tier)}" data-act="artOpen" data-arg="${a.u}"${tah(artTipH(a))}><span class="qi">${artArt(a)}</span><span class="grow"><b>${esc(a.n)}</b><small>${PHAM[a.tier]} · đang vận hành · tốc độ tu luyện ×${numFx(Math.round(tuMul()*100)/100)}</small><small>Đưa tới tối đa ${REALM[tpMax(a)]} viên mãn</small></span></div>`;
  const y=Math.max(0,TP_Y-(r.age-r.birthAge));const bk=r.relics.some(x=>x.k==='book'&&x.art&&x.art.type==='tp');
  return `<h4 class="sgrp">${ib('lotus','soft')}Ô dẫn khí</h4><div class="tu-slot"><span class="qi">${ic('lock')}</span><span class="grow"><b>Chưa có tâm pháp tu luyện</b><small>${bk?'Trong túi có bí tịch tâm pháp: học ở mục Tâm pháp bên cạnh.':'Không có tâm pháp thì không bế quan, không thổ nạp, tu vi không lên.'}</small>
   <small>Cách có: xuất thân gia truyền · bái nhập tông môn · bản chép tay ở tạp hóa · cao nhân truyền dạy · kỳ ngộ · tự ngộ (ngộ tính từ 14).</small><small>Trời không tuyệt đường người: chậm nhất ${y>0.05?'chừng '+numFx(Math.ceil(y*2)/2)+' năm nữa':'sắp tới'} sẽ gặp được người truyền pháp.</small></span></div>`;}
// thẻ tâm pháp: tốc độ tu luyện, cảnh giới tối đa
{const _at21=artTipH;artTipH=function(a,pot){const h=_at21(a,pot);if(!a||a.type!=='tp')return h;const i=h.lastIndexOf('</div></div>');return i<0?h:h.slice(0,i)+`<p class="tu-ln">Tốc độ tu luyện ×${numFx(TU_M[clamp(a.tier,0,6)])}${a.el!=='vo'&&G.run.root.els.includes(a.el)?' (hợp linh căn +10%)':''}</p>`+h.slice(i);};}

// dòng khí vận, thể chất trong tab Căn cơ: mỗi mục một nhãn màu theo phẩm, chạm xem tác dụng
function ttRow(label,L,tip){L=L.filter(Boolean);const v=L.length?`<span class="ttl">${L.map(d=>`<span class="ttc" style="--pc:${TT_COL[d.rank]}"${tah(`<div class="tt-it" style="--pc:${TT_COL[d.rank]}"><div><b>${esc(d.name)}</b><small>${TT_RANK[d.rank]}</small><p>${esc(d.description)}</p><p>${ttFxText(d).map(esc).join('<br>')}</p></div></div>`)}>${esc(d.name)}</span>`).join('')}</span>`:'<span class="hint">Không có</span>';
  return kvRow(label,v,tip);}

// tooltip vật phẩm: dòng yêu cầu cảnh giới (đỏ khi chưa đủ)
{const _rt30=relTip;relTip=function(rel){const h=_rt30(rel);if(!rel||rel.k==='book')return h;const ok=relOk(rel);const i=h.lastIndexOf('</div>');return h.slice(0,i)+`<p class="req${ok?'':' bad'}">Yêu cầu: ${LV_NAME[relReq(rel)]}${ok?'':' · chưa đủ'}</p>`+h.slice(i);};}

// tooltip vật phẩm: chỉ số thường ở trên, nội tại tách riêng bên dưới
{const _rt34=relTip;relTip=function(rel){if(!rel||rel.k==='book')return _rt34(rel);const fx=relicFx(rel);const nt={},ns={};for(const [k,v] of Object.entries(fx))(NT_KEYS.includes(k)?nt:ns)[k]=v;
  const sub=SLOT_N[slotOf(rel)]+' · hệ '+(EL[rel.el]||EL.vo).n;const ok=relOk(rel);const NL=Object.keys(nt).map(k=>({n:NT_NAME[k]||'',t:fxLines({[k]:nt[k]},rel)[0]||''})).filter(x=>x.t);
  const cmp=relCmpOf(rel);let h=tipCard({ic:relIcon(rel),n:rel.name,t:rel.tier,sub,lines:(cmp?['So với '+cmp.name+' đang dùng:']:[]).concat(relCmpLines(ns,rel,cmp)),lore:rel.lore});if(rel.lore){const lp='<p>'+esc(rel.lore)+'</p>';if(h.includes('<div class="tp-b"><ul>')){h=h.replace(lp,'').replace('<div class="tp-b"><ul>','<div class="tp-b">'+lp+'<ul>');}}const i=h.lastIndexOf('</div>');
  const add=(NL.length?`<div class="nt"><b>Nội tại duy nhất · không cộng dồn</b>${NL.map(x=>`<span><em class="ntn">${esc(x.n)}</em>${esc(x.t)}</span>`).join('')}</div>`:'')+`<p class="req${ok?'':' bad'}">Yêu cầu: ${LV_NAME[relReq(rel)]}${ok?'':' · chưa đủ'}</p>`;
  return h.slice(0,i)+add+h.slice(i);};}

// đánh giá một chỉ số thành chữ có màu (5 mức so với sàn của tiểu cảnh giới hiện tại)
function RT(key,val,kind){const o=rateOf(key,val,kind);return `<span class="rt rt${o.lv}">${o.t}</span>`;}

// so với món đang dùng cùng ô: mỗi dòng chỉ số có ▲ (hơn), ▼ (kém), = (ngang); món đang mặc thì không so
function relCmpOf(rel){const r=G.run;if(!r||!rel||rel.k==='book')return null;const E=eqOf();if(Object.values(E).includes(rel)||(r.dd||[]).some(d=>d.rel===rel))return null;
  const S0=slotsFor(rel).length?slotsFor(rel):[slotOf(rel)];const cur=S0.map(k=>E[k]).filter(Boolean);if(!cur.length)return null;return cur.sort((a,b)=>Object.keys(relicFx(a)).length-Object.keys(relicFx(b)).length)[0];}
function relCmpLines(ns,rel,cmp){const keys=Object.keys(ns);if(!cmp)return fxLines(ns,rel);const cf=relicFx(cmp);
  return keys.map(k=>{const t=fxLines({[k]:ns[k]},rel)[0]||'';const v=ns[k],o=cf[k]||0;const a=typeof v!=='number'?'':v>o?' ▲':v<o?' ▼':' =';return t+a;}).concat(Object.keys(cf).filter(k=>!(k in ns)&&!NT_KEYS.includes(k)).map(k=>'Mất: '+(fxLines({[k]:cf[k]},cmp)[0]||'')+' ▼'));}
