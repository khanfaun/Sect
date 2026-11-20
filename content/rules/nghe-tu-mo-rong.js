// Nguồn chuẩn: thêm vào TU_NGHE; TU_BI, TU_MR. Luật xử lý ở src/game/core2/69-nghe-tu-mo-rong.js. Chữ: content/text/nghe-tu-mo-rong.json
// Đ11: nghề tu mở rộng (HN A.8, B §7.4–§7.5): Cổ sư, Thi tu, Phật tu, Nho tu, Thiên cơ sư, Thương tu và ba pháp môn Lôi pháp, Huyễn thuật, Thôn phệ.
// Chiêu viết lại theo khuôn số của C (sk17a…sk25c ở content/items/sk-raw.js), công pháp cp_tu17…cp_tu25 ở content/catalog/arts.json.
// Trường thêm so với nghề lõi: mr: nghề mở rộng; dh: hướng khi bái học ('chinh' | 'ta', một quyết định vừa);
//   hdMax: chỉ học được khi Hành Đạo từ bậc này trở lên (0 chính tâm, 1 nghiêng chính);
//   hd.deed: hợp đồng ghi một hành vi; hd.res: hợp đồng xong thì tài nguyên riêng +1 (nguyện lực, hạo nhiên khí); hd.tho: năm thọ mất mỗi lần (Thiên cơ); hd.tamma: tâm ma tăng mỗi lần (Thôn phệ)
Object.assign(TU_NGHE,{
  TU17:{n:'Cổ sư',cp:'cp_tu17',pm:'co',res:'Cổ trùng',loc:'LOC09',t:['dam','tran'],phi:20,mr:1,hd:{l:'Giải cổ cho một nhà bị hạ',ngay:5,von:4,cong:9,noi:['tran','dam']}},
  TU18:{n:'Thi tu',cp:'cp_tu18',pm:'thi',res:'Thi khí',loc:'LOC14',t:['phe','hoang'],phi:20,mr:1,dh:'ta',hd:{l:'Thu liệm xác vô chủ ở bãi chiến cũ',ngay:4,von:3,cong:8,noi:['phe','ma','dong']}},
  TU19:{n:'Phật tu',cp:'cp_tu19',pm:'phat',res:'Nguyện lực',loc:'LOC12',t:['linhdia','nui'],phi:15,mr:1,dh:'chinh',hd:{l:'Siêu độ vong hồn một làng chết dịch',ngay:7,von:2,cong:6,noi:['tran','phe'],deed:'sieu_do',res:1}},
  TU20:{n:'Nho tu',cp:'cp_tu20',pm:'nho',res:'Hạo nhiên khí',loc:'LOC02',t:['thanh'],phi:20,mr:1,dh:'chinh',hdMax:1,hd:{l:'Dạy chữ một mùa cho trẻ trong trấn',ngay:30,von:2,cong:10,noi:['tran','thanh'],res:1}},
  TU21:{n:'Thiên cơ sư',cp:'cp_tu21',pm:'thienco',res:'Quẻ tượng',loc:'LOC05',t:['linhdia','thanh'],phi:30,mr:1,hd:{l:'Xem quẻ cho một nhà buôn lớn',ngay:2,von:3,cong:9,noi:['thanh','cho'],tho:0.5}},
  TU22:{n:'Thương tu',cp:'cp_tu22',pm:'thuong',res:'Tài khí',loc:'LOC03',t:['cho','thanh'],phi:25,mr:1,hd:{l:'Áp tải một chuyến linh vật qua hai khu',ngay:10,von:12,cong:21,noi:['cho','thanh']}},
  TU23:{n:'Lôi pháp sư',cp:'cp_tu23',pm:'loi',res:'Lôi ấn',loc:'LOC15',t:['thien','nui'],phi:25,mr:1,dh:'chinh',hd:{l:'Trừ tà cho một ngôi nhà bị ám',ngay:3,von:3,cong:8,noi:['tran','thanh','phe']}},
  TU24:{n:'Huyễn thuật sư',cp:'cp_tu24',pm:'huyen',res:'Huyễn lực',loc:'LOC04',t:['tran','phe'],phi:20,mr:1,hd:{l:'Dựng ảo cảnh cho một buổi tế lễ',ngay:2,von:2,cong:6,noi:['thanh','tran']}},
  TU25:{n:'Thôn phệ tu',cp:'cp_tu25',pm:'thon',res:'Thôn phệ',loc:'LOC07',t:['ma','dong'],phi:25,mr:1,dh:'ta',hd:{l:'Nuốt tà khí rò ra từ một mỏ cũ',ngay:4,von:3,cong:9,noi:['khoang','ma','dong'],tamma:3}},
});
// HN A.16: bí truyền ngoại lệ luân hồi, tham ngộ ở nơi neo (loc) khi một nghề trong "nghe" đã tới tầng bốn.
//   ngay: số ngày tham ngộ; phi: linh thạch; pick: kiếp sau được chọn một trong ba lá số; mem: kiếp sau nhớ chuyên môn chính (học lại miễn phí, nửa thời gian)
const TU_BI={
  lhct:{n:'Luân Hồi Chuyển Thế Kinh',nghe:['TU19','TU21'],loc:['LOC12','LOC05'],ngay:360,phi:60,pick:1},
  bmlq:{n:'Bất Muội Linh Quang Quyết',nghe:['TU04','TU05'],loc:['LOC05'],ngay:360,phi:60,mem:1},
};
// Luật riêng của nghề mở rộng (B §7.5 "cái giá"):
//   phatGioi: hành vi giết người làm Phật quang tắt (ngày tắt phatTat, chiêu Phật pháp còn phatX); phatGiau: giữ quá số linh thạch này thì nguyện lực ngừng tăng
//   nhoNut: một quyết định tà từ bấy nhiêu điểm làm văn tâm nứt (mất nửa hạo nhiên khí); nhoVo: nứt bấy nhiêu lần thì vỡ, mất pháp môn
//   tcNam: dùng thuật tổn thọ quá bấy nhiêu lần một năm thì có tcKhien khả năng bị thiên khiển (thần thức tổn thương)
//   khuy: Khuy Mệnh của Thiên cơ sư — cảnh giới tối thiểu (3 Nguyên Anh), năm thọ mất; tucMang: khả năng nhớ lại mỗi nghề tu ở kiếp sau (Túc Mạng Thông)
//   coNuoi: linh thạch nuôi cổ mỗi tháng; coDoi: số tháng bỏ đói thì cổ cắn chủ; thonTam: khả năng tâm ma dâng mỗi lần thôn phệ, thonTamV: mức tăng
const TU_MR={phatGioi:['giet_vo_toi','giet_dau_hang','giet_cuop_dang_ac','giet_thien_kieu_chinh','giet_ma_dau','giet_doat_bao'],phatTat:30,phatX:0.5,phatGiau:500,
  nhoNut:5,nhoVo:3,tcNam:3,tcKhien:0.2,khuy:{realm:3,tho:10},tucMang:0.5,coNuoi:1,coDoi:2,thonTam:0.2,thonTamV:3,
  // hiệu ứng ngoài trận (số ở dòng công pháp, content/catalog/arts.json): amNoi: loại nơi âm khí nặng (lôi pháp yếu, dòng loiAm);
  //   thiTrong: loại nơi tính là trong nhà / dưới đất (ban ngày ở đây xác luyện không yếu, dòng thiNgay)
  amNoi:['ma','phe'],thiTrong:['dong','khoang']};
// Lối vào nghề theo duyên (B §7.4 "Vào"), ngoài bái học ở nơi thầy. Có duyên thì: bái học ở nơi thầy không mất phí; mỗi kiếp một lần,
// khi đã có thể học (tu sĩ, đủ tầng Luyện Khí, còn chỗ, hợp luật ghép) hiện hộp "Duyên nghề" cho tự ngộ ngay tại chỗ (thời gian như bái học, không phí).
//   kv: khí vận (r.kv) · cc: cờ cải căn (r.ccFlag) · el: hệ linh căn (r.root.els) · og: xuất thân (r.origin)
//   Tự quyết theo B: Cổ ← Linh Căn Cổ · Thi ← Quỷ Nhãn · Phật ← Phật Tử · Nho ← Văn tâm (cải căn Dưỡng Hạo Nhiên Khí), Hạo Nhiên Chính Khí ·
//   Thiên cơ ← Nhân Quả Đạo, Thiên Lý Nhãn · Thương ← thương nhân có linh căn · Lôi ← linh căn hệ Lôi, Lôi Đình Bá, Lôi Thần Giáng Thế ·
//   Huyễn ← Huyễn Ảnh Phong Thân, Mị Cốt · Thôn phệ ← Thiên Ma Hàng Thế, Tà Thần Nghịch Tử.
const TU_DUYEN={
  TU17:{cc:['nuoi_co']},
  TU18:{kv:['quy_nhan']},
  TU19:{kv:['phat_tu']},
  TU20:{cc:['van_tam'],kv:['hao_nhien_chinh_khi']},
  TU21:{kv:['nhan_qua_dao','thien_ly_nhan']},
  TU22:{og:['buon']},
  TU23:{el:['loi'],kv:['loi_dinh_ba','loi_than_giang_the']},
  TU24:{kv:['huyen_anh_phong_than','mi_cot']},
  TU25:{kv:['thien_ma_hang_the','ta_than_nghich_tu']},
};
