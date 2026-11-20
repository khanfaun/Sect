// Nguồn chuẩn: AN. Luật xử lý ở src/game/core2/39-tien-te.js (phần Đ3.6).
// Mức ăn tự chọn (HN B §6.3, giá theo mặt bằng C §12 B.3, tính bằng đồng mỗi ngày); rg = cộng vào hồi phục; tm = tâm ma giảm mỗi tháng.
// doi: mốc số bữa (ngày ăn) bỏ lỡ liên tiếp — Sửa lỗi đói: thang tháng/năm thay vì ngày thực tế.
//   thieu 30 (chỉ báo), doi 60 (hồi phục −25%), la 150 (khí huyết tối đa −15%), kiet 300 (−30%, mất 0,5% khí huyết/ngày, không chết), canh 630 (báo sắp chết), chet 660.
// nhip: phần ăn mỗi ngày (phàm 1, Luyện Khí ½, Trúc Cơ+ 1/60); bế quan ×⅓; sau bế quan ×½ trong sauBqNgay ngày (câu 19).
// bao: chỉ báo khi đói nặng (mốc từ baoTu: 4 kiệt, 5 sắp chết), mỗi mốc một lần mỗi cơn đói; hai lần báo cách nhau ít nhất baoNghi ngày (riêng mốc sắp chết luôn báo).
// thang: ở quán/quê đủ tiền thật (không mua chịu) thì mua một lần lương thực cả tháng (anCov ngày, mang theo người).
const AN={muc:{dam:{n:'Đạm bạc',bac:12,rg:-0.1},thuong:{n:'Thường',bac:20,rg:0},kha:{n:'Khá',bac:40,rg:0.1,tm:1}},
  lkNgay:90,maxNgay:400,lkBac:70,lkQty:5,
  doi:{thieu:30,doi:60,la:150,kiet:300,canh:630,chet:660},rgDoi:-0.25,rgKiet:-0.5,hpLa:-0.15,hpKiet:-0.3,kietHp:0.005,
  nhip:{lk:0.5,tc:1/60,bq:1/3,sauBq:0.5},sauBqNgay:90,thang:30,
  quan:['tran','thanh','tutran','tuthanh','cho'],baoTu:4,baoNghi:90};
// ---- Ăn uống bản mới (20/11, core2/75-an-moi.js): không tính theo ngày nữa ----
// r.doi giờ là "độ đói" 0..chet: 0 no căng, 100 cạn bụng (thanh no = 100 - doi). No căng tới cạn mất thangNo tháng (phàm; tu sĩ chậm theo nhip).
// Cạn bụng rồi thì còn chừng thangKiet tháng nữa là chết đói. Mốc doi dưới đây tính theo thang mới.
// Một bữa ở quán/quê: no căng, giá = mức ăn (bac) × buaX. Ở quán/sơn môn: chỉ ăn khi doi >= anQuan.
// Đồ ăn trong túi (mon: số tháng no) tự ăn khi doi >= anTu2: chọn món no lâu nhất mà không phí (lấp vừa chỗ trống);
//   không món nào vừa mà đã đói quá nửa (doi >= doi.doi) thì ăn món nhỏ nhất. Hết đồ ăn khi đang đi mà đói quá nửa: dừng đường, báo.
AN.doi={thieu:30,doi:50,la:70,kiet:100,canh:170,chet:200};
Object.assign(AN,{thangNo:6,thangKiet:2,buaX:6,anQuan:30,anTu2:40,
  mon:{banh_bao:{thang:0.5,bac:15},com_nam:{thang:1,bac:30},luong_kho:{thang:2,bac:60},thit_kho:{thang:3,bac:90},banh_chung:{thang:4,bac:120},gao_rang:{thang:6,bac:170}},monQty:5});
