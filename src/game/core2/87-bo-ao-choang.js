// Bỏ áo choàng khỏi game: không còn ô áo choàng, không sinh đồ loại 'bao' (đạo bào, pháp y, phi phong).
// Bản lưu cũ: boChoang() (gọi khi tải, ui/35) chuyển áo choàng đang mặc sang ô giáp (nếu trống) hoặc về túi; mọi món 'bao' thành 'giap'.
// (ô áo choàng, loại 'bao' đã bỏ khỏi content/items: slots, slot-n, kslot, relic-k; ở đây lọc thêm danh mục pháp bảo)
for(let i=CAT.relics.length-1;i>=0;i--)if(CAT.relics[i].k==='bao')CAT.relics.splice(i,1);
function boChoang(r){if(!r)return 0;let n=0;const E=r.eq;
  if(E&&E.choang){if(!E.giap)E.giap=E.choang;else(r.relics=r.relics||[]).push(E.choang);delete E.choang;n++;}
  const doi=x=>{if(x&&x.k==='bao'){x.k='giap';n++;}};
  (r.relics||[]).forEach(doi);if(E)Object.values(E).forEach(doi);(r.dd||[]).forEach(d=>d&&doi(d.rel));
  if(n)dbg('choang.bo',{n});return n;}
