// Nguồn chuẩn: LOI_CT. Luật xử lý ở src/game/core2/77-loi-ct-hop-thu.js.
// Công trình ngươi sở hữu (ô đất có công trình, chủ là ngươi) sinh lời mỗi tháng, gửi về hộp thư; ở đâu cũng nhận được.
// ty: phần giá công trình (DAT.mua.ct) thu về mỗi tháng (≈ mười năm hoàn vốn). Thành trấn phàm trả bạc (xu); thành trấn tu sĩ trả linh thạch hạ phẩm (giá / DAT.mua.lt).
// them[loại nơi][công trình]: thứ khác ngoài tiền. x: nhân tiền lời; an: kèm một món ăn; tin: biết thêm một nơi quanh đó;
//   dan: xác suất kèm một viên đan rẻ; vat: xác suất kèm một vật liệu (thao/khoang/dan).
// giu: hộp thư giữ tối đa bao nhiêu thư (cũ nhất gộp vào thư kế tiếp).
const LOI_CT={ty:0.008,
  them:{
    pham:{tien_trang:{x:1.5},tap_hoa:{an:1},tra_lau:{tin:1},tuu_lau:{x:1.2},lai_buon:{x:1.3},khach_diem:{tin:0.3},cam_do:{x:1.2}},
    tu:{phuong_thi:{dan:0.25},quy_thi:{vat:0.4},am_hoi:{vat:0.3,dan:0.15},doi_lt:{x:1.5},tra_lau:{tin:1},loi_dai:{dan:0.1},thuong_cac:{x:1.2}}},
  boQua:['nha_rieng','tran_phap','dong_phu'],giu:24};
