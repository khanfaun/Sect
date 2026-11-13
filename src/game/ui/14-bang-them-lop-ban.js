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
function pTong(){const R=relations();const AL={chinh:'chính đạo',ta:'tà đạo',ma:'ma đạo',trung:'trung lập',phat:'Phật môn'};
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
  const cells=V.map(x=>{const lk=itemLocked(x);return `<button class="bc on${B.sel===x.key?' sel':''}" data-act="bagSel" data-arg="${x.key}" style="${pcs(x.tier)}"${tah(itemTip(x))}>${itemArt(x)}${x.cnt>1?`<i>${x.cnt}</i>`:''}${lk?`<em class="lk">${ic('lock')}</em>`:''}${(()=>{const rl=x.ref&&x.ref.t==='rel'&&r.relics[x.ref.i];if(rl&&rl.k==='book'&&rl.art&&r.realm<rl.art.req)return `<em class="rq">${reqName(rl.art.req)}</em>`;return rl&&rl.k!=='book'&&!relOk(rl)?`<em class="rq">${LV_NAME[relReq(rl)]}</em>`:'';})()}</button>`;}).join('');
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
