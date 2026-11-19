// Nguồn chuẩn cho Sửa-K: hệ truy đuổi. Luật: src/game/core2/60-truy-duoi.js · chữ: content/text/truy.json (khoá truy.*).
// Chạy thoát khỏi trận (hoặc bị quan phủ truy nã vì nợ) → địch có thể bám theo một thời gian. Trong hạn đó cứ mỗi khoảng
// ngẫu nhiên lại tung xác suất bị chặn đánh, kể cả đang đi giữa chặng (dừng ở tâm ô gần nhất trên đường).
// loai[k]: p = xác suất bám theo sau khi bị ngươi chạy thoát · ngay = [ít, nhiều] số ngày truy · gian = [ít, nhiều] số giờ giữa hai lần dò
//          chan = xác suất chặn được mỗi lần dò · opt = lựa chọn khi bị chặn (danh: đánh, chay: chạy tiếp, nop: nộp của, tl: thương lượng)
//   thu: yêu thú · tac: sơn tặc · tu: tu sĩ, tán tu, ma tu · ke: kẻ thù kiếp trước / kẻ thù truy sát · quy: quỷ vật · no: quan sai đòi nợ · cuop: kẻ bị ngươi cướp
// manh: địch hơn ngươi mỗi một cảnh giới thì hạn truy ×(1 + ngay), chan + chan (tính tối đa `max` bậc). Kém hơn từ 2 bậc trở lên thì không đuổi.
// an: tới nơi an toàn. thanh = thành có thủ vệ, tong = tông môn của mình: 'huy' cắt đuôi hẳn, 'giam' rút hạn còn lại × giam, 0 = không có tác dụng.
// che: che giấu tu vi làm chan × hide; thần thức hơn địch (đang phóng thần thức, hoặc địch kém cảnh giới) làm chan × than và biết trước (có thêm lựa chọn "lan": lẩn đi, xác suất lan).
// chay: chạy tiếp thành công = goc + tp × thân pháp, tối đa max; thành công thì lần dò sau lùi thêm lui giờ. Hỏng thì phải đánh.
// nop: nộp của: mất phần st linh thạch Hạ phẩm (ít nhất stMin) hoặc phần bac tiền phàm; quan sai (no) thì trả hết nợ nếu đủ tiền.
// tl: thương lượng = goc + tam × đạo tâm, tối đa max; không thành thì phải đánh.
const TRUY={
  loai:{
    thu:{p:0.45,ngay:[1,4],gian:[6,18],chan:0.35,opt:['danh','chay']},
    tac:{p:0.6,ngay:[3,8],gian:[8,24],chan:0.4,opt:['danh','chay','nop','tl']},
    tu:{p:0.5,ngay:[5,15],gian:[12,36],chan:0.35,opt:['danh','chay','tl']},
    ke:{p:0.8,ngay:[15,40],gian:[24,72],chan:0.3,opt:['danh','chay','tl']},
    quy:{p:0.3,ngay:[1,2],gian:[4,12],chan:0.4,opt:['danh','chay']},
    no:{p:1,ngay:[20,45],gian:[24,96],chan:0.3,opt:['danh','chay','nop','tl']},
    cuop:{p:0.7,ngay:[7,20],gian:[12,48],chan:0.35,opt:['danh','chay','nop','tl']}},
  manh:{ngay:0.5,chan:0.08,max:3},
  an:{thanh:{thu:'huy',tac:'huy',quy:'huy',tu:'giam',ke:'giam',cuop:'giam',no:0},tong:'huy',giam:0.5},
  che:{hide:0.6,than:0.8,lan:0.6},
  chay:{goc:0.4,tp:0.015,max:0.85,lui:[12,24]},
  nop:{st:0.25,stMin:5,bac:0.3},
  tl:{goc:0.3,tam:0.01,max:0.7}};
