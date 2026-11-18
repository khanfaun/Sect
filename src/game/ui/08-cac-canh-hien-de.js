// ---------- các cảnh hiện đè lên bản đồ ----------

function card(title,sub,body,o){o=o||{};return `<section class="scard ${o.cls||''}">${o.art||''}<header class="sc-h"><h2>${esc(title)}</h2>${sub?`<small>${esc(sub)}</small>`:''}${o.head||''}${o.x?`<button class="xb sc-x" data-act="closeAll" aria-label="Đóng"${ta('Đóng hẳn, về bản đồ')}>${ic('close')}</button>`:''}</header><div class="sc-b">${body}</div>${o.foot?`<footer class="sc-f">${o.foot}</footer>`:''}</section>`;}

function itemView(p){
  if(p.k==='relic')return {ic:relIcon(p.rel),n:p.rel.name,sub:GRADE[p.rel.tier],tip:relicTip(p.rel),t:p.rel.tier||0};
  if(p.k==='skill'){const sk=SK[p.id];const h=G.run.skills.find(x=>x.id===p.id);return {ic:elSeal(sk.el),n:sk.n,sub:'Bí tịch công pháp · '+PHAM[sk.t],tip:skillTip(sk,h?h.lv+1:1),t:sk.t};}
  if(p.k==='pill')return {ic:PILL[p.id].i,n:(p.q?PQ[p.q]+' ':'')+PILL[p.id].n,sub:PILL[p.id].d.replace('{x}',pillX(p.id,p.q)),tip:pillTip(p.id,p.q),t:p.q||0};
  if(p.k==='qi'){const x=CAT.byId[p.id]||{};return {ic:x.i||'🪨',n:x.n||p.id,sub:x.dang||'',tip:[x.d,x.use].filter(Boolean).join('\n'),t:2};}
  if(p.k==='pass')return {ic:'🎫',n:p.n,sub:'Lệnh bài thông quan',tip:'Trình ở quan ải để sang '+REG[p.reg].n,t:2};
  return {ic:'💎',n:p.n+' linh thạch',sub:'',tip:''};}

const PGROUP=[['Sự vụ',['board','thuongcac','vay']],['Tông môn',['congmon','join','lib','nhansu','tongviec','conghien','tinhthat']],['Mua bán',['laibuon','taphoa','shop','doilt','camdo','ghost','amhoi']],['Mưu sinh',['muusinh']],['Nghỉ chân',['nha','tea','inn','tuu','tinh','heal']],['Đi lại',['tram','goback']],['Tu luyện',['khaiphu','thinhgiao']],['Hoang dã',['sanbat','sanyeu','haithuoc','daokhoang']],['Việc khác',['coduyen','grave','patron','bury','quyan']]];
const PNOW=['boss','cross','bt','xk'];
const GRP_IC={'Sự vụ':'scroll','Mưu sinh':'bag','Tông môn':'gate','Mua bán':'bag','Nghỉ chân':'tea','Đi lại':'cart','Tu luyện':'seat','Hoang dã':'tree','Việc khác':'more'};
const PL_N={tea:'Trà lâu',inn:'Khách điếm',shop:'Phường thị',board:'Bảng treo thưởng',ghost:'Quỷ thị',join:'Sơn môn',lib:'Tàng Kinh Các',tinh:'Tĩnh tọa',heal:'Dưỡng thương'};

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

