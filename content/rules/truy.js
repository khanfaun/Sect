// Nguồn chuẩn cho Sửa-K: hệ truy đuổi. Luật: src/game/core2/60-truy-duoi.js · chữ: content/text/truy.json (khoá truy.*).
// Chạy thoát khỏi trận (hoặc bị quan phủ truy nã vì nợ) → địch có thể bám theo một thời gian. Trong hạn đó cứ mỗi khoảng
// ngẫu nhiên lại tung xác suất bị chặn đánh, kể cả đang đi giữa chặng (dừng ở tâm ô gần nhất trên đường).
// loai[k]: p = xác suất bám theo sau khi bị ngươi chạy thoát · ngay = [ít, nhiều] số ngày truy · gian = [ít, nhiều] số giờ giữa hai lần dò
//          chan = xác suất chặn được mỗi lần dò · opt = lựa chọn khi bị chặn (danh: đánh, chay: chạy tiếp, nop: nộp của, tl: thương lượng)
//   thu: yêu thú · tac: sơn tặc · tu: tu sĩ, tán tu, ma tu · ke: kẻ thù kiếp trước / kẻ thù truy sát · quy: quỷ vật · no: quan sai đòi nợ · cuop: kẻ bị ngươi cướp (Đ8b: cả chủ đất bị ngươi xây / phá trên đất họ) · quan: quan sai lùng kẻ bị truy nã (Đ8b, Sửa-O) · san: thợ săn tiền thưởng (Sửa-O, đi theo qua mọi vùng)
// Sửa-L (câu 50): hạn truy tính bằng năm (yêu thú/quỷ 1–2 năm … kẻ thù 6–10 năm), dò thưa (10–90 ngày một lần) để không bị chặn liên tục.
// manh: địch hơn ngươi mỗi một cảnh giới thì hạn truy ×(1 + ngay), chan + chan (tính tối đa `max` bậc). Kém hơn từ 2 bậc trở lên thì không đuổi.
// an: tới nơi an toàn. thanh = thành có thủ vệ, tong = tông môn của mình: 'huy' cắt đuôi hẳn, 'giam' rút hạn còn lại × giam, 0 = không có tác dụng.
// che: che giấu tu vi làm chan × hide; thần thức hơn địch (đang phóng thần thức, hoặc địch kém cảnh giới) làm chan × than và biết trước (có thêm lựa chọn "lan": lẩn đi, xác suất lan).
// chay: chạy tiếp thành công = goc + tp × thân pháp, tối đa max; thành công thì lần dò sau lùi thêm lui giờ. Hỏng thì phải đánh.
// nop: nộp của: mất phần st linh thạch Hạ phẩm (ít nhất stMin) hoặc phần bac tiền phàm; quan sai (no) thì trả hết nợ nếu đủ tiền.
//   pham: kẻ bám theo là người của quan phủ phàm nhân (câu 81) → chỉ nhận tiền phàm (xu / bạc / vàng), không nhận linh thạch.
// tl: thương lượng = goc + tam × đạo tâm, tối đa max; không thành thì phải đánh.
const TRUY={
  loai:{
    thu:{p:0.45,ngay:[365,730],gian:[240,720],chan:0.3,opt:['danh','chay']},
    tac:{p:0.6,ngay:[730,1460],gian:[360,1080],chan:0.35,opt:['danh','chay','nop','tl']},
    tu:{p:0.5,ngay:[1095,2190],gian:[480,1440],chan:0.3,opt:['danh','chay','tl']},
    ke:{p:0.8,ngay:[2190,3650],gian:[480,1440],chan:0.35,opt:['danh','chay','tl']},
    quy:{p:0.3,ngay:[365,730],gian:[240,720],chan:0.35,opt:['danh','chay']},
    no:{p:1,ngay:[1460,2920],gian:[720,2160],chan:0.3,opt:['danh','chay','nop','tl']},
    cuop:{p:0.7,ngay:[1095,2555],gian:[480,1440],chan:0.3,opt:['danh','chay','nop','tl']},
    quan:{p:1,ngay:[730,1460],gian:[720,2160],chan:0.3,opt:['danh','chay','nop','tl']},
    san:{p:1,ngay:[180,540],gian:[240,720],chan:0.35,opt:['danh','chay','tl']}},
  manh:{ngay:0.25,chan:0.08,max:3},
  an:{thanh:{thu:'huy',tac:'huy',quy:'huy',tu:'giam',ke:'giam',cuop:'giam',no:0,quan:0,san:'giam'},tong:'huy',giam:0.5},
  che:{hide:0.6,than:0.8,lan:0.6},
  chay:{goc:0.4,tp:0.015,max:0.85,lui:[12,24]},
  nop:{st:0.25,stMin:5,bac:0.3,pham:['quan','no']},
  tl:{goc:0.3,tam:0.01,max:0.7}};
