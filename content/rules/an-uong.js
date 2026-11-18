// Nguồn chuẩn: AN. Luật xử lý ở src/game/core2/39-tien-te.js (phần Đ3.6).
// Mức ăn tự chọn (HN B §6.3, giá theo mặt bằng C §12 B.3, tính bằng đồng mỗi ngày); rg = cộng vào hồi phục; tm = tâm ma giảm mỗi tháng.
// doi: mốc số ngày đói liên tiếp → đói (hồi phục −50%), đói lả (khí huyết tối đa −20%), kiệt sức (−5% khí huyết mỗi ngày), chết đói.
const AN={muc:{dam:{n:'Đạm bạc',bac:12,rg:-0.1},thuong:{n:'Thường',bac:20,rg:0},kha:{n:'Khá',bac:40,rg:0.1,tm:1}},
  lkNgay:5,maxNgay:400,lkBac:70,lkQty:5,
  doi:{doi:1,la:3,kiet:7,chet:15},rgDoi:-0.5,hpLa:-0.2,kietHp:0.05,
  quan:['tran','thanh','cho']};
