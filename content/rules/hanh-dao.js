// Nguồn chuẩn: HD_LV. Luật xử lý ở src/game/core2/35-hanh-dao-nghiep.js.
// p = P/(P+T) của 24 quyết định gần nhất; e = 2(p-0.5). Nhãn chỉ đổi khi vượt ngưỡng 0.03 (chống nhấp nháy).
const HD_LV=[
  {min:0.8, n:'Chính tâm kiên định', d:'Giỏi che chở, chậm ra tay tuyệt tình.'},
  {min:0.55,n:'Nghiêng về chính đạo',d:'Thuật bảo hộ nhỉnh hơn, thế công bớt quyết liệt.'},
  {min:0.45,n:'Chính tà đan xen',    d:'Chưa có một lối hành xử lấn át.'},
  {min:0.2, n:'Nghiêng về tà đạo',   d:'Ra tay quyết liệt hơn, khó tiếp nhận dưỡng lành.'},
  {min:0,   n:'Tà niệm ăn sâu',       d:'Thế công dữ dội, thương tổn khó lành.'}];
const HD_W={nho:1,vua:3,lon:8}; // trọng số quyết định
const HD_HYS=0.03, HD_KEEP=24;
// Sửa-C.2: mức giúp đỡ trong truyện (không phải DEED): nhẹ (một lời, một tay, chút pháp lực/thì giờ) < vừa (bỏ tiền, chịu trách, lỡ việc dài)
// < nặng (đổ máu, tổn tu vi/thọ nguyên). Cứu mạng thật dùng DEED cuu_nguoi / cuu_nguoi_hy_sinh. Danh sách: docs/thiet-ke/karma-muc-giup.csv
const HD_GIUP={nhe:{hd:{p:1},ng:{g:1}},vua:{hd:{p:3},ng:{g:3}},nang:{hd:{p:5},ng:{g:5}}};
