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
