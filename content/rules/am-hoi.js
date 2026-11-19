// Nguồn chuẩn cho U Minh Ám Hội làm lại (Sửa-I câu 39). Luật: src/game/core2/58-am-hoi.js · chữ: content/text/am-hoi.json (khoá amh.*).
// Buổi họp kín: vài NPC giữ vai (tu sĩ, có túi đồ ở w.vai[NPxx].tui) + vài khách vô danh (túi sinh lúc hội mở) + người chơi.
// Mỗi người đưa ra VẬT ĐANG CÓ trong túi; cả bàn trả giá bằng linh thạch (quy ra Hạ phẩm: 1 Trung = 100 Hạ, 1 Thượng = 100 Trung, 1 Cực = 100 Thượng) hoặc đổi vật.
// vai: số NPC giữ vai tối đa ngồi bàn · khach: [ít nhất, nhiều nhất] khách vô danh · khachTui: số món khách mang · khachCua: của cải khách (Hạ phẩm) × hệ số vùng
// gia0: giá khởi điểm = gia0 × giá trị · buoc: bước giá (phần của giá hiện tại) · nhu: [thấp, cao] hệ số nhu cầu của người trả giá
// bietGia: khả năng một NPC trả giá nhìn ra đồ dởm · gia: khả năng khách đem một món đồ cải căn dởm · that: hệ số khả năng khách mang đồ cải căn thật (× CC_DO[p].dg)
// Sửa-J: giá trị mọi vật = giá gốc × nhu cầu thế giới (ncGet). gia0: giá mở (phần của giá trị) — danh sách vật muốn nhận nêu số lượng đủ giá mở
// buoc: mỗi lần trả phải hơn mức đang dẫn ít nhất buoc × giá trị · dem: đếm ngược (ms, thời gian thật) · tre: [ít, nhiều] ms NPC ngẫm trước khi trả
// slMax: số lượng tối đa một món trong danh sách · muonN: số thứ ngoài linh thạch người bán nêu · hop: độ hợp nhu cầu khi thương lượng (cùng loại / pháp bảo / vật khác) · hopMin: dưới mức này người bán không nhận
// relic: giá gốc pháp bảo phẩm t = relic × 3^t · vaiTui: [ít, nhiều] món trong túi NPC giữ vai lúc lập · vaiCua: của cải NPC = vaiCua × 4^cảnh giới
const AM_HOI={vai:3,khach:[2,3],khachTui:[2,4],khachCua:[300,2500],gia0:0.6,buoc:0.1,nhu:[0.75,1.35],bietGia:0.4,gia:0.35,that:4,
  relic:40,vaiTui:[2,5],vaiCua:120,toiDa:9,
  dem:10000,tre:[1500,8000],slMax:12,muonN:2,hop:{cung:0.8,pb:0.6,khac:0.4},hopMin:0.5};
