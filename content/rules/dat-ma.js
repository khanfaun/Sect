// Nguồn chuẩn: MA_BAC, MA_CFG. Luật xử lý ở src/game/core2/57-dat-ma.js.
// Đất ma (HN B §14.9, bản tạm 3 khu): ma khí 100 lúc hóa; hồi theo THẾ KỶ (−6 mỗi trăm năm ⇒ ~500 năm hết Ma vực, ~1.400 năm phục hồi).
// lk: hệ số tu luyện (chinh: chính đạo, ma: ma đạo); dg: cộng nguy hiểm nút; mat 1: thôn trấn biến mất; nhiem: tỉ lệ mỗi ngày phàm nhân nhiễm ma khí.
const MA_BAC=[
  {min:70,n:'Ma vực',lk:{chinh:0.5,ma:1.3},dg:2,mat:1,nhiem:0.2},
  {min:40,n:'Đất chết',lk:{chinh:0.75,ma:1.15},dg:1,mat:0,nhiem:0},
  {min:15,n:'Hoang địa',lk:{chinh:1,ma:1},dg:1,mat:0,nhiem:0},
  {min:0,n:'Phục hồi',lk:{chinh:1,ma:1},dg:0,mat:0,nhiem:0}
];
// hoi: ma khí giảm mỗi năm; nhanh: có sơn môn Phật / chính đạo gần; cham: có ma tông gần; ban: bán kính một khu; gan: khoảng cách tính là "gần"
const MA_CFG={dau:100,hoi:0.06,nhanh:2,cham:0.5,ban:140,gan:320,khu:3};
