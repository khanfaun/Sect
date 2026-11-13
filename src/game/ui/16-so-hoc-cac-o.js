// ---------- Sở học: các ô công pháp, tâm pháp (số ô có hạn theo cảnh giới) và vòng vận công ----------
function artSlot(a){const r=G.run;const v=chuView();return r.chu.findIndex((c,i)=>i<v.n&&c&&c.u===a.u);}
function artCard(a){const r=G.run;const v=chuView();const slot=artSlot(a);const pot=slot>=0?chuPot(v,slot):null;const aff=artAff(a);
  return `${artTipH(a,pot)}<div class="art-st">${lvPips(a.lv,a.lines.length)}<span class="${slot>=0?'good':'hint'}">${slot>=0?'Đang vận hành · ×'+numVN(pot):'Chưa vận hành'}</span>${aff<1?`<span class="bad"${ta('Không hợp linh căn: hiệu quả còn 80%')}>lệch linh căn</span>`:''}</div>
   <div class="bact">${slot<0?`<button class="btn pri sm" data-act="artRun" data-arg="${a.u}"${chuView().it.filter(Boolean).length>=chuSlots()?' disabled':''}>Vận hành</button>`:`<button class="btn sm" data-act="chuDel" data-arg="${slot}">Ngừng vận hành</button>`}<button class="btn sm" data-act="study" data-arg="${a.u}"${artNextWhy(a)||(r.scene&&r.scene.type!=='place')||r.moving?' disabled':''}${ta(artNextWhy(a)||(r.moving?'Đang đi đường, dừng lại rồi mới tham ngộ được.':(r.scene&&r.scene.type!=='place')?'Xong việc trước mắt rồi mới tham ngộ được.':'Tham ngộ lên tầng '+(a.lv+1)+': mở dòng kế tiếp.'))}>${a.lv>=a.lines.length?'Viên mãn':'Tham ngộ · '+durH(studyTime(a))}</button><button class="btn sm" data-act="forget" data-arg="${a.u}">${UI.confirm==='fg'+a.u?'Chắc chứ?':'Phế bỏ'}</button></div>`;}
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
function ttRow(label,L,tip){L=L.filter(Boolean);const v=L.length?`<span class="ttl">${L.map(d=>`<span class="ttc r${d.rank}" style="--pc:${TT_COL[d.rank]}"${tah(`<div class="tt-it" style="--pc:${TT_COL[d.rank]}"><div><b>${esc(d.name)}</b><small>${TT_RANK[d.rank]}</small><p>${esc(d.description)}</p><p>${ttFxText(d).map(esc).join('<br>')}</p></div></div>`)}>${esc(d.name)}</span>`).join('')}</span>`:'<span class="hint">Không có</span>';
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

// ô Thiên phú ở đầu tab Căn cơ: nổi bật nhất bảng; Tinh anh khung bạc, Thiên kiêu khung vàng
function talCardHTML(){const t=playerTal();if(!t)return '';const p=t.p;const RLN={tap:'Ngũ hành tạp linh căn',tu:'Tứ linh căn',tam:'Tam linh căn',song:'Song linh căn',thien:'Thiên linh căn',bien:'Biến dị linh căn',cuc:'Cực linh căn'};
  const w=v=>['rất kém','kém','bình thường','tốt','rất tốt'][clamp(Math.round(v),0,4)];
  const tip='Đánh giá theo lực chiến so với người cùng cảnh giới: công, thủ, khí huyết, linh lực, trang bị, công pháp.\nTrong trận, ai kém bậc hơn sẽ bị khí thế lấn át: kém một bậc giảm nhẹ công và thủ, kém từ hai bậc giảm khá.\n\nNăm bậc: Phế vật, Bình phàm, Bất phàm, Tinh anh, Thiên kiêu.';
  return `<div class="tal-wrap tw${t.tier}"><div class="tal-card tal${t.tier}"${ta(tip)}><b>${TAL_N[t.tier]}</b></div>${talCardOrn(t)}</div>`;}
function talCls(t){return t&&t.tier>=0?' tf'+t.tier:'';}

// mục gập/mở được trong tab Căn cơ (Thân thế, Tu luyện), cùng kiểu với mục Chiến đấu
function sgBoxC(key,icon,name,rows){const o=UI.ccOpen=UI.ccOpen||{};const open=o[key]!==false;
  return `<details class="sgbox cbstat"${open?' open':''}><summary class="sgrp" data-act="ccOpen" data-arg="${key}">${ib(icon,'soft')}${name}<i class="cc-ch" aria-label="${open?'Thu gọn':'Mở rộng'}">${ic(open?'up':'down')}</i></summary><div class="kvl">${rows.join('')}</div></details>`;}
