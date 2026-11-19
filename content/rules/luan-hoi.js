// Nguồn chuẩn: LH_KHOANG, LH_CFG. Luật xử lý ở src/game/core2/56-luan-hoi.js.
// Thời gian giữa hai kiếp (HN B §14.8, A.17): bốn khoảng, tỉ lệ gốc; lời ở Bến Vong Xuyên (không ghi số năm).
const LH_KHOANG=[
  {k:'gan',a:3,b:30,p:55,loi:'Mấy chục năm trôi qua bên bến.'},
  {k:'vua',a:31,b:150,p:28,loi:'Hơn trăm năm trôi qua bên bến.'},
  {k:'xa',a:151,b:800,p:13,loi:'Mấy trăm năm trôi qua bên bến.'},
  {k:'ratXa',a:801,b:5000,p:4,loi:'Ngàn năm nước Vong Xuyên chảy qua chân.'}
];
// dau: số kiếp đầu chỉ ở khoảng Gần; ngBac: bậc nghiệp chướng từ đó Xa ×2, Rất xa ×3; chap: tỉ lệ chấp niệm (huyết thù / duyên sinh tử còn mở) kéo về Gần;
// tua: khoảng dài hơn số năm này thì tua theo thập kỷ (L6); lat: xác suất mỗi thập kỷ một nơi đổi chủ / gặp nạn; hau: tỉ lệ ân oán với người phàm chuyển sang hậu duệ
const LH_CFG={dau:3,ngBac:3,ngMul:{xa:2,ratXa:3},chap:0.4,tua:60,lat:0.3,hau:0.5,hauTu:60,oanHon:150};
