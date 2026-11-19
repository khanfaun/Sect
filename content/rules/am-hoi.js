// Nguồn chuẩn cho U Minh Ám Hội làm lại (Sửa-I câu 39). Luật: src/game/core2/58-am-hoi.js · chữ: content/text/am-hoi.json (khoá amh.*).
// Buổi họp kín: vài NPC giữ vai (tu sĩ, túi ở w.vai[NPxx].tui) + vài thiên kiêu (túi ở G.run.rivals[i].tui) hóa trang + người chơi.
// Mỗi người đưa ra VẬT ĐANG CÓ trong túi; cả bàn trả giá bằng linh thạch (quy ra Hạ phẩm: 1 Trung = 100 Hạ, 1 Thượng = 100 Trung, 1 Cực = 100 Thượng) hoặc đổi vật.
// Sửa-J câu 43: người ngồi bàn chỉ là NPC thật — vai: số người giữ vai (tu sĩ) tối đa · tk: số thiên kiêu còn sống tối đa · tkTui: số món trong túi thiên kiêu lúc lập
// nhan: khả năng nhận ra người hóa trang — goc + thần thức (than × (thần−10), tối đa thanMax; đang mở thần thức +tk; chỉ khi tu vi họ không cao hơn) + khao × khảo vật/100 + giao tình thiên kiêu ≥ gt thì +gtCong; tối đa max
// gia0: giá khởi điểm = gia0 × giá trị · buoc: bước giá (phần của giá hiện tại) · nhu: [thấp, cao] hệ số nhu cầu của người trả giá
// bietGia: khả năng một NPC trả giá nhìn ra đồ dởm · gia: khả năng túi thiên kiêu có một món đồ cải căn dởm · that: hệ số khả năng mang đồ cải căn thật (× CC_DO[p].dg, khi lập túi có opt.that)
// Sửa-J: giá trị mọi vật = giá gốc × nhu cầu thế giới (ncGet). gia0: giá mở (phần của giá trị) — danh sách vật muốn nhận nêu số lượng đủ giá mở
// buoc: mỗi lần trả phải hơn mức đang dẫn ít nhất buoc × giá trị · dem: đếm ngược (ms, thời gian thật) · tre: [ít, nhiều] ms NPC ngẫm trước khi trả
// slMax: số lượng tối đa một món trong danh sách · muonN: số thứ ngoài linh thạch người bán nêu · hop: độ hợp nhu cầu khi thương lượng (cùng loại / pháp bảo / vật khác) · hopMin: dưới mức này người bán không nhận
// relic: giá gốc pháp bảo phẩm t = relic × 3^t · vaiTui: [ít, nhiều] món trong túi NPC giữ vai lúc lập · vaiCua: của cải NPC = vaiCua × 4^cảnh giới
const AM_HOI={vai:3,tk:2,tkTui:[2,4],gia0:0.6,buoc:0.1,nhu:[0.75,1.35],bietGia:0.4,gia:0.35,that:4,
  relic:40,vaiTui:[2,5],vaiCua:120,
  dem:10000,tre:[1500,8000],slMax:12,muonN:2,hop:{cung:0.8,pb:0.6,khac:0.4},hopMin:0.5,
  nhan:{goc:0.05,than:0.02,thanMax:0.3,tk:0.35,khao:0.3,gt:30,gtCong:0.4,max:0.9}};
