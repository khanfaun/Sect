// Nguồn chuẩn: TIEN. Luật xử lý ở src/game/core2/39-tien-te.js.
// Tiền phàm tính bằng đồng: 1 quan = 1.000 đồng; 1 linh thạch = 100 quan = 100.000 đồng (HN A.7).
// grpBac: tiền khởi đầu (đồng) theo nhóm xuất thân khi xuất thân không ghi riêng `bac`.
// mua/ban: giá tiền trang bán ra / mua vào một linh thạch; ttMax: số linh thạch mỗi tiền trang đổi mỗi tháng.
const TIEN={quan:1000,lt:100000,mua:110000,ban:90000,ttMax:3,
  grpBac:{kho:[0,300],thuong:[500,1500],kha:[5000,20000]},
  hc:{bap:0.75,nang:1.25},
  tpBac:800,tlBac:9900}; // tpBac: bản chép tay tâm pháp ở tạp hóa; tlBac: Trắc Linh Thạch (đồng)
