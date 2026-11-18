// Nguồn chuẩn: NO (nợ, vay) và NHA (nhà ở). Luật xử lý ở src/game/core2/44-no-nha.js (Sửa-B, người dùng chốt câu 10).
// Mọi số tiền tính bằng xu, thời gian tính bằng ngày.
// chiu: ở quê được mua chịu tới mức âm này. han: hạn trả nợ từ lúc bắt đầu nợ; bao: báo trước bấy nhiêu ngày; giaHan: gia hạn sau mỗi lần bị phạt.
// nhieu: từ mức nợ này trở lên là "nợ nhiều". heo: hình phạt đánh hèo theo lần quá hạn (hp: phần khí huyết tối đa mất, w: thương thế, truy: bị truy nã).
// laoNam: năm làm công trả nợ [nợ dưới laoNam3, từ laoNam3 trở lên]. truyDanh: danh tiếng khu quê bị đẩy xuống mức này khi truy nã.
// vay: các khoản vay (goc xu, thang kỳ hạn, tong = tổng phải trả CỐ ĐỊNH định sẵn lúc vay, lãi trọn gói = tong − goc, không cộng theo tháng; Sửa-F câu 27); khoVay: xuất thân khốn khó chỉ vay được khoản đầu.
const NO={chiu:600,han:60,bao:10,giaHan:45,nhieu:3000,
  heo:[{hp:0.25,w:'ngoai'},{hp:0.45,w:'gay',truy:1}],laoNam:[2,3],laoNam3:8000,truyDanh:-60,
  vay:[{id:'v1',goc:1000,thang:6,tong:1180},{id:'v3',goc:3000,thang:6,tong:3540},{id:'v10',goc:10000,thang:12,tong:13000}],khoVay:1,
  vayNoi:['tran','thanh'],vayBao:15};
// NHA: nhà ở. khong: xuất thân không có nhà ở quê (ngoài GD.none và nhóm khốn khó). thue: tiền thuê mỗi tháng theo loại nơi.
// ngoai: ngủ ngoài trời từ `min` ngày trong một tháng thì bị lạnh (mất lanh × khí huyết tối đa × số ngày/30),
// và có thể bệnh với xác suất benh + benhNgay × số ngày/30 (mất benhHp khí huyết tối đa, tâm ma +benhTm). nghi: nghỉ ở nhà hồi phần khí huyết.
const NHA={khong:['daodong','linh','hat'],thue:{tran:150,thanh:300},thueNoi:['tran','thanh'],
  ngoai:{min:8,lanh:0.08,benh:0.15,benhNgay:0.35,benhHp:0.15,benhTm:5},nghi:0.3,nghiH:8,troNgay:1};
