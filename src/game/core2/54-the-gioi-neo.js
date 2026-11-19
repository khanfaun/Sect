// ĐỢT 8: thế giới neo — 15 địa điểm neo (Đ8.1), vai NPC có người kế (Đ8.2), mười thế lực (Đ8.3).
// Bảng LOC_NEO, LOC_DUONG, LOC_LOI, VAI_NP, THE_LUC: content/world/the-gioi-neo.js. Chữ: content/text/the-gioi.json (khoá tg.*).
// Mọi phép ngẫu nhiên của thế giới neo dùng băm theo hạt giống thế giới (không động vào R()), để thế giới tái lập được và không xô lệch các hệ khác.
function wHash(s){let h=2166136261;s=String(s);for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619);}h^=h>>>13;h=Math.imul(h,1274126177);h^=h>>>16;return (h>>>0)/4294967296;}
function wRnd(w,k){return wHash((w&&w.seed!=null?w.seed:0)+'|'+k);}
function wPick(w,L,k){return L.length?L[Math.floor(wRnd(w,k)*L.length)]:null;}

// ---------- Đ8.1: đặt 15 địa điểm neo ----------
// Chọn một nút CÓ SẴN đúng đại khu, đúng loại ưu tiên; không tạo nút mới (giữ địa hình MAPD), không dùng sơn môn (tên nút là tên tông).
// Neo nào có đường neo tới neo đã đặt thì chọn nút gần neo đó nhất, để các đường neo ngắn và đi được.
function anchorsPlace(w){if(!w||!w.regions||w.anchorsV1)return false;
  const all=[];for(const R0 of w.regions)for(const n of R0.nodes)all.push(n);
  const used=new Set(all.filter(n=>n.anchor).map(n=>n.id));const at={};for(const n of all)if(n.anchor)at[n.anchor]=n;
  for(const code of Object.keys(LOC_NEO)){if(at[code])continue;const L=LOC_NEO[code];
    const pool=all.filter(n=>Math.floor(n.id/100)===L.kv&&n.type!=='tong'&&!used.has(n.id)&&!n.anchor);if(!pool.length)continue;
    const link=LOC_DUONG.filter(d=>d[0]===code||d[1]===code).map(d=>at[d[0]===code?d[1]:d[0]]).filter(Boolean);
    let cand=null;for(const t of L.t){const c=pool.filter(n=>n.type===t);if(c.length){cand=c;break;}}
    if(!cand)cand=pool.filter(n=>n.type!=='sao');if(!cand.length)cand=pool;
    let n;if(link.length){const d=x=>Math.min(...link.map(o=>Math.hypot(x.x-o.x,x.y-o.y)));n=cand.slice().sort((a,b)=>d(a)-d(b)||a.id-b.id)[0];}
    else n=wPick(w,cand.slice().sort((a,b)=>a.id-b.id),'neo:'+code);
    n.anchor=code;n.name0=n.name;n.name=L.n;n.sectFix=1;used.add(n.id);at[code]=n;dbg('neo.dat',{code,id:n.id,type:n.type});}
  w.anchorsV1=1;return true;}
// bản lưu cũ: nơi thầy dạy, nguồn cải căn, vật tư đã chốt theo loại nút → chốt lại theo neo
function anchorsRepin(w){if(!G.meta||G.meta.world!==w)return;
  if(w.ccSrc&&typeof CAI_CAN!=='undefined')for(const id in w.ccSrc){const P=CAI_CAN[id];if(P&&P.noi&&!P.noi.meta){const a=anchorOf(w,P.noi.loc);if(a)w.ccSrc[id].node=a.id;}}
  if(w.ccVtN)for(const vt in w.ccVtN){const V=typeof CC_VT!=='undefined'&&CC_VT[vt];const a=V&&anchorOf(w,V.loc);if(a)w.ccVtN[vt]=a.id;}
  if(w.tuSrc)for(const loc in w.tuSrc){const a=anchorOf(w,loc);if(a)w.tuSrc[loc]=a.id;}
  const r=G.run;if(r&&r.place){const n=nodeById2(w,r.at);if(n&&n.anchor)r.place.n=n.name;}}
function anchorOf(w,code){if(!w||!w.regions||!code)return null;for(const R0 of w.regions)for(const n of R0.nodes)if(n.anchor===code)return n;return null;}
function locNode(code){return anchorOf(W(),code);}
// tên nơi neo để viết chuyện: luôn đọc tên hiện tại trên bản đồ
function locName(code){const n=locNode(code);return n?n.name:(LOC_NEO[code]?LOC_NEO[code].n:code);}
// snapWorld chạy sau ensureCounts (đổi loại/tên nút) và sau khi tải bản lưu → đặt neo ở đây
{const _sw=snapWorld;snapWorld=function(w){_sw(w);if(w&&w.regions&&anchorsPlace(w))anchorsRepin(w);};}
