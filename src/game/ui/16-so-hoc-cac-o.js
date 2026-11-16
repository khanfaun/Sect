// ---------- Sở học: các ô công pháp, tâm pháp (số ô có hạn theo cảnh giới) và vòng vận công ----------
function artSlot(a){const r=G.run;const v=chuView();return r.chu.findIndex((c,i)=>i<v.n&&c&&c.u===a.u);}
function artCard(a){const r=G.run;const v=chuView();const slot=artSlot(a);const pot=slot>=0?chuPot(v,slot):null;const aff=artAff(a);
  return `${artTipH(a,pot)}<div class="art-st">${lvPips(a.lv,a.lines.length)}<span class="${slot>=0?'good':'hint'}">${slot>=0?'Đang vận hành · ×'+numVN(pot):'Chưa vận hành'}</span>${aff<1?`<span class="bad"${ta('Không hợp linh căn: hiệu quả còn 80%')}>lệch linh căn</span>`:''}</div>
   <div class="bact">${slot<0?`<button class="btn pri sm" data-act="artRun" data-arg="${a.u}"${chuView().it.filter(Boolean).length>=chuSlots()?' disabled':''}>Vận hành</button>`:`<button class="btn sm" data-act="chuDel" data-arg="${slot}">Ngừng vận hành</button>`}<button class="btn sm" data-act="study" data-arg="${a.u}"${artNextWhy(a)||(r.scene&&r.scene.type!=='place')||r.moving?' disabled':''}${ta(artNextWhy(a)||(r.moving?'Đang đi đường, dừng lại rồi mới tham ngộ được.':(r.scene&&r.scene.type!=='place')?'Xong việc trước mắt rồi mới tham ngộ được.':'Tham ngộ lên tầng '+(a.lv+1)+': mở dòng kế tiếp.'))}>${a.lv>=a.lines.length?'Viên mãn':'Tham ngộ · '+durH(studyTime(a))}</button><button class="btn sm" data-act="forget" data-arg="${a.u}">${UI.confirm==='fg'+a.u?'Chắc chứ?':'Phế bỏ'}</button></div>`;}

// ---------- Kỹ năng: gắn chiêu vào ô dùng trong trận, xem nội tại đang chạy ----------

// hộp tiểu huyệt: hành, công dụng, đại huyệt gần nhất, giá khai

// thẻ nhiệm vụ dùng chung cho sổ tay và bảng treo thưởng: mở rộng, dẫn đường, hủy

const ENT_DESC={thuong:'Thương đội: đoàn xe buôn đi giữa các thôn trấn. Ảnh nhỏ trên xe là người dẫn đầu.',thutrieu:'Thú triều: bầy yêu thú kéo đi thành đàn. Không phải người, gặp là phải đánh.',tuantra:'Đệ tử tuần tra của tông môn quanh vùng.',thienkieu:'Thiên kiêu: thiên tài trẻ của các tông môn đi lịch luyện.',truysat:'Kẻ truy sát đang lùng tìm ngươi.',di:'Dị tượng: cơ duyên hiện ra trong ít ngày như bí cảnh mở cửa, sao rơi, hội đấu giá. Không phải người hay thú, là một nơi đáng tới.',khach:'Khách qua đường: lữ khách, tiều phu, thợ săn, thư sinh...'};

// phàm nhân: khóa tab Kỹ năng và Khí Hải
const PHAM_LOCK=(t,d)=>`<div class="pham-lock">${ic('lock')}<b>${t}</b><p>${d}</p></div>`;

// ô dẫn khí của phàm nhân: chạy tâm pháp nhập môn

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
