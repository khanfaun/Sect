// ---------- bảng "Thêm": lớp bản đồ, chú giải, ghi chú, cấu hình ----------
function seg(key,opts){return `<div class="seg">${opts.map(([v,n])=>`<button data-act="cfg" data-arg='${key}=${JSON.stringify(v)}' class="${CFG[key]===v?'on':''}">${n}</button>`).join('')}</div>`;}

// Tông môn: phát triển sau, tạm hiện các tông môn đã biết

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

// hộp nhỏ khi chạm một món trong túi: thông tin và các nút dùng, vứt, khóa...

function relDetail(rel,act){return `<div class="pdet">${relTip(rel)}${act?`<div class="bact">${act}</div>`:''}</div>`;}
// bảng màu các phẩm

