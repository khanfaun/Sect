// Nguồn chuẩn: THH. Luật xử lý ở src/game/core2/80-thi-huyen.js (hai dòng công pháp tầng hai trước đây chỉ ghi bằng chữ).
// Thi tu (TU18) "đào mộ lấy xác": ở noiVoChu (cổ mộ, di tích, phế tích) là xác vô chủ, không vướng nghiệp; ở noiNguoi (thôn trấn, thành phàm) là mộ người thường: ghi việc ác dao_mo.
//   h giờ, res xác luyện, xp nghề; mỗi nơi một lần mỗi `cach` tháng.
// Huyễn thuật (TU24) "ảo cảnh cắt dấu": đang bị truy đuổi thì dựng ảo cảnh: tốn mp phần linh lực tối đa, h giờ; p cơ hội cắt dấu (hết truy đuổi), hỏng thì kẻ đuổi áp sát (chặn ngay).
const THH={tang:2,
  dao:{noiVoChu:['como','ditich','phe'],noiNguoi:['tran','thanh'],h:8,res:[2,3],xp:[2,3],cach:6},
  ao:{mp:0.3,h:4,p:0.7}};
