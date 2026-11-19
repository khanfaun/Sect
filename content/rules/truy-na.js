// Nguồn chuẩn cho Sửa-O (câu 77): hệ truy nã kiểu thế giới mở. Luật: src/game/core2/66-truy-na.js · chữ: content/text/truy-na.json (khoá tna.*).
// Phạm tội → (nhân chứng) → quan phủ ghi MỨC TRUY NÃ theo VÙNG (đại khu vực) + TIỀN TREO THƯỞNG của vùng đó.
// Mức 0..5 chỉ dùng bên trong; người chơi chỉ thấy chữ + biểu tượng (tna.m.1..5, icon).
//   toi[mã] = sức nặng của tội (cộng vào mức): pha_dat phá đất dân · no quỵt nợ · chong chống lại quan sai · giet_chung giết nhân chứng bị lộ ·
//            danh tiếng xấu tới mức bị ghét cả vùng (danh) · các việc làm trong sổ nghiệp (deed) phạm luật khi ở nơi có dân (bảng deed).
//   chung[loại nơi] = xác suất có nhân chứng; chac: từ mức này trở lên coi như chắc chắn, báo quan ngay (thành); dưới thì nhân chứng chạy đi
//            báo, ngươi được chọn ngăn / mua chuộc / giết / mặc kệ. hoang = nơi không có dân. che = cải trang / che giấu tu vi nhân vào xác suất.
//   ngan: đuổi kịp nhân chứng = goc + tp × thân pháp (tối đa max) · mua: mua chuộc tốn xu × sức tội (hoặc linh thạch st × sức tội), p giữ lời ·
//   giet: giết nhân chứng — lo = xác suất xác bị phát hiện (thì tội giet_chung cộng thêm), che giấu tu vi nhân che.
//   tien = xu treo thưởng mỗi một sức tội (thành ×thanh) · matDau[m] = số ngày không bị quan sai nhận ra thì hạ một mức (ngoai: đang ở vùng khác thì × ngoai) ·
//   nhan[m] = xác suất bị nhận ra mỗi lần tới thôn trấn / thành trong vùng (bị nhận ra: quan sai đuổi theo, đồng hồ mất dấu tính lại) ·
//   lan: từ mức này trở lên (rất nặng) tội lan sang mọi vùng khác ở mức lanM · danh: từ mức 2, danh tiếng khu bị kéo xuống mức này (Đ1.4 "Bị truy nã");
//   danhSau: khi hết truy nã (xoá hoặc mất dấu xuống dưới mức 2) danh tiếng khu được nâng lên mức này (vẫn bị ghét, không còn truy nã).
//   san: thợ săn tiền thưởng — mỗi tháng, vùng có tiền treo thưởng từ min xu thì xác suất p có kẻ lần theo (truy loại san, đi theo cả khi sang vùng khác).
//   quan: nơi có quan phủ (mục "Quan phủ") · phat: nộp phạt = tiền treo thưởng (xu), hoặc linh thạch = ceil(xu / xuLt); từ mức phatMax không nộp phạt được.
//   tu[m] = số tháng ngồi tù · cong[m] = số tháng làm công (0 = không cho) · cai: cải trang (xu, ngày hiệu lực) mua ở tạp hóa / thôn trấn / thành.
const TNA={
  toi:{pha_dat:2,no:2,chong:1,giet_chung:2,danh:2},
  deed:{giet_vo_toi:3,diet_khau:3,giet_doat_bao:3,luyen_hon_nguoi:3,dau_doc:2,ban_nguoi:2,huyet_te_nguoi:2,trom_ngheo:1,trom_ac_ba:1,hiep_dao:1,lua_loi:1,dao_mo:1,tham_o:1},
  chung:{thanh:0.95,tran:0.5,cho:0.5,ancu:0.25,tong:0.6,hoang:0.08,chac:0.9,che:0.6},
  ngan:{goc:0.35,tp:0.015,max:0.85},
  mua:{xu:300,st:3,p:0.85},
  giet:{lo:0.35,che:0.6},
  tien:{xu:500,thanh:2},
  matDau:[0,20,45,90,180,365],ngoai:0.5,
  nhan:[0,0.15,0.3,0.5,0.7,0.9],
  lan:5,lanM:2,danh:-60,danhSau:-45,
  san:{min:2000,p:0.25},
  quan:['tran','thanh'],
  phat:{xuLt:200,phatMax:5},
  tu:[0,1,3,6,12,36],
  cong:[0,2,6,12,24,0],
  cai:{xu:300,ngay:30}};
