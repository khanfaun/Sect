// ĐỢT 0: nền cho các hệ mới. Cờ FEAT cho phép tắt từng hệ khi gặp sự cố (bật = 1 khi đợt đó hoàn tất).
const FEAT={nq:0,vo:0,tue:0,tien:0,an:0,tut:0,nghe:0,cc:0,the:0,arc:0,mong:0};
function feat(k){return !!FEAT[k];}
// Chuyển đổi G.meta / thế giới của bản lưu cũ. Các đợt sau BỌC hàm này, không viết lại.
function migrateX(d){if(!d||!d.meta)return d;const M=d.meta;M.v2=M.v2||{};return d;}
// năm nguyên của tuổi hiện tại
function ageY(r){r=r||G.run;return r?Math.floor(r.age||0):0;}
// điểm neo địa điểm: Đ8 điền thật; trước đó trả về nút gần nhất có loại phù hợp
const ANCHOR_FALLBACK={LOC01:['tran'],LOC02:['thanh'],LOC03:['thanh','cho'],LOC04:['phe','tran'],LOC05:['tong','thanh'],LOC06:['rung'],LOC07:['ma','phe'],LOC08:['tong','rung'],LOC09:['song','bien'],LOC10:['duoc','rung'],LOC11:['khoang','nui'],LOC12:['tong','nui'],LOC13:['thanh','nui'],LOC14:['phe','nui'],LOC15:['thien','nui']};
function anchorNode(code){const w=W();if(!w||!w.regions)return null;const all=w.regions.flatMap(R=>R.nodes||[]);const a=all.find(n=>n.anchor===code);if(a)return a;
  const types=ANCHOR_FALLBACK[code]||[];const r=G.run;const here=r&&nodeById(r.at);
  const cand=all.filter(n=>types.includes(n.type)&&n.state!=='ruin');if(!cand.length)return null;
  if(!here)return cand[0];return cand.sort((x,y)=>Math.hypot(x.x-here.x,x.y-here.y)-Math.hypot(y.x-here.x,y.y-here.y))[0];}
