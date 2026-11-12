// ---------- màn ngoài: mở đầu, chọn kiếp, hết kiếp, Bến Vong Xuyên ----------
function vTitle(){
  const M=G.meta;const has=!!G.run;const last=M.lives[0];
  let mid='';
  if(has){mid=`<p class="t-sub">Một kiếp tu tiên. Vạn kiếp luân hồi.</p><div class="t-btn"><button class="btn pri big" data-act="resume">Tiếp tục kiếp ${G.run.kiep}</button><p class="hint">${esc(G.run.ten)} · ${esc(realmLabel())} · ${Math.floor(G.run.age)} tuổi</p></div>`;}
  else if(last){
    const L=last.lines.slice(-4);const N=[`Kiếp trước, có một người tên ${last.ten}.`].concat(L,[`Hồn phách qua cầu Nại Hà. Bát canh Mạnh Bà xóa đi tên họ, xóa đi ân oán, chỉ ${M.pts} điểm luân hồi còn khắc trong chân linh.`]);
    mid=`<div class="narr${UI.narrSkip?' skip':''}" data-act="narrSkip">${N.map((t,i)=>`<p style="animation-delay:${i*1.1}s">${txt(t)}</p>`).join('')}<p class="k" style="animation-delay:${N.length*1.1}s">Kiếp thứ ${M.nlife+1} bắt đầu.</p></div>
     <div class="t-btn" style="animation-delay:${UI.narrSkip?0:N.length*1.1+0.6}s"><button class="btn pri big" data-act="birth">Luân hồi</button><button class="btn" data-act="screen" data-arg="meta">Lên Bến Vong Xuyên · ${M.pts} điểm</button><p class="hint">Đã trải ${M.nlife} kiếp</p></div>`;}
  else mid=`<p class="t-sub">Một kiếp tu tiên. Vạn kiếp luân hồi.</p><div class="t-btn"><button class="btn pri big" data-act="birth">Nhập thế</button><p class="hint">Thế gian không chờ ai. Chết rồi lại sinh, mang theo chút gì còn khắc trong chân linh.</p></div>`;
  return `<div class="title">${sceneCv('phusinh-title'+M.nlife,Math.min(4,last?last._mr||0:0),'song','t-art')}<div class="t-seal">Phù</div><h1>Phù Sinh</h1>${mid}
   <div class="t-foot">${has&&M.nlife>1?`<button class="lnk" data-act="screen" data-arg="meta">Bến Vong Xuyên · ${M.pts} điểm</button>`:''}<button class="lnk" data-act="titleCfg">Cấu hình</button></div></div>`;
}
function vBirth(){
  let h=`<div class="birth"><h2>Chọn một kiếp</h2><p class="hint">Mỗi lá số là một xuất thân, một linh căn, một mệnh cách. Chọn rồi không đổi được.</p><div class="fates">`;
  G.birth.cards.forEach((c,i)=>{const og=ORIGIN.find(o=>o.id===c.origin),tr=TRAIT.find(t=>t.id===c.trait),R0=ROOT.find(x=>x.id===c.root.id);
    h+=`<button class="fate" data-act="born" data-arg="${i}"><span class="f-n"><b>${esc(c.ten)}</b><small>${c.g==='nam'?'nam':'nữ'} · quê ${esc(c.que)}</small></span>
     <span class="f-r"><i>Xuất thân</i><b>${esc(og.n)}</b><small>${esc(og.d)}</small></span>
     <span class="f-r"><i>Linh căn</i><b>${c.root.els.map(e=>elSeal(e)).join('')} ${esc(R0.n)}</b><small>${esc(R0.d)}</small></span>
     <span class="f-r"><i>Mệnh cách</i><b>${esc(tr.n)}</b><small>${esc(tr.d)}</small></span></button>`;});
  return h+`</div><button class="lnk" data-act="screen" data-arg="title">Quay lại</button></div>`;
}
function vOver(){
  const o=G.over,L=o.life;
  return `<div class="over">${sceneCv('over'+L.ten,o.cause==='phithang'?4:(L._mr||0),o.cause==='phithang'?'thien':'phe','o-art')}
   <section class="scard"><header class="sc-h"><h2>${esc(L.ten)} — một đời đã hết</h2><small>${esc(o.title)}</small></header><div class="sc-b">
   <p>${esc(L.lines[L.lines.length-1])}</p><p class="ep">${esc(L.ep)}</p>${o.gap?`<p class="hint">${o.gap} năm sau, thế gian vẫn tiếp tục. Nay là năm ${tYear(W().t)}.</p>`:''}
   <div class="kvl">${o.pts.map(([n,v])=>kvRow(esc(n),'+'+v)).join('')}${kvRow('Một kiếp khổ cũng là một kiếp','+1')}${kvRow('<b>Điểm luân hồi</b>','<b>+'+L.pts+'</b>','', 'tot')}</div></div>
   <footer class="sc-f">${goBtn('overNext','Luân hồi')}</footer></section></div>`;
}
function vMeta(){
  const M=G.meta;const tab=UI.tab.meta||'upg';
  let b=`<p class="m-in">Lão Đò neo thuyền bên bến, chờ ngươi bày ra những gì còn mang theo được.</p>`+tabsHTML('meta',[['upg','Khắc vào chân linh'],['lives','Các kiếp'],['lore','Điển tích'],['ach','Thành tựu']],tab);
  if(tab==='upg'){b+='<div class="rows">';for(const u of UPG){const lv=M.upg[u.id]||0;const mx=lv>=u.max;const c=mx?0:u.c[lv];
    b+=`<div class="row"><span class="r-t"><b>${esc(u.n)}</b><small>${esc(u.d)}</small><span class="pips">${'●'.repeat(lv)}${'○'.repeat(u.max-lv)}</span></span>${mx?'<span class="r-x">đã đủ</span>':`<button class="btn sm" data-act="upg" data-arg="${u.id}"${M.pts<c?' disabled':''}>Khắc · ${c} điểm</button>`}</div>`;}b+='</div>';}
  if(tab==='lives')b+=M.lives.length?M.lives.map(L=>`<details class="life"><summary><b>${esc(L.ten)}</b><small>Kiếp ${L.k} · ${L.tuoi} tuổi · ${esc(L.realm)}</small></summary><p class="ep">${esc(L.ep)}</p>${L.lines.map(l=>`<p>${esc(l)}</p>`).join('')}</details>`).join(''):'<p class="empty">Chưa có kiếp nào kết thúc.</p>';
  if(tab==='lore'){const ks=Object.keys(LORE);b+=`<p class="hint">Đã biết ${M.lore.length}/${ks.length}</p>`+ks.map(k=>M.lore.includes(k)?`<details class="life"><summary><b>${esc(LORE[k].n)}</b></summary><p>${esc(LORE[k].t)}</p></details>`:`<div class="life lock">chưa biết</div>`).join('');}
  if(tab==='ach')b+=`<p class="hint">Đạt ${M.ach.length}/${ACH.length}</p><div class="rows">`+ACH.map(a=>`<div class="row${M.ach.includes(a.id)?' taken':' dim'}"><span class="r-i">${M.ach.includes(a.id)?ic('check'):''}</span><span class="r-t"><b>${esc(a.n)}</b><small>${esc(a.d)}</small></span></div>`).join('')+'</div>';
  return `<div class="meta">${sceneCv('ben-vong-xuyen',3,'song','m-art','nhan:0.62:0.42:1:laodo')}${win('Bến Vong Xuyên',b,{cls:'tall',noClose:true,extra:`<span class="m-pts">${M.pts} điểm luân hồi</span>`,foot:`<span class="grow"></span><button class="btn pri" data-act="screen" data-arg="title">Rời bến</button>`})}</div>`;
}
