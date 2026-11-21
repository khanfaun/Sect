// Nguồn chuẩn: DEED. Luật xử lý ở src/game/core2/35-hanh-dao-nghiep.js.
// Chuyển từ bảng HN Phần B §10. p/t = trọng số Hành Đạo (HD_W), g/b = mức Nghiệp Duyên (NQ_MUC), seed = có quả chín, tuyen = loại tuyến nhân quả.
const DEED={
  cuu_nguoi:{p:'vua',g:8,seed:1}, // Cứu người đang gặp nạn
  cuu_nguoi_hy_sinh:{p:'lon',g:8,seed:1}, // Cứu người phải chịu thương nặng/mất của
  bo_thi:{p:'nho',g:1,seed:1}, // Bố thí người nghèo
  phat_chan:{p:'vua',g:8}, // Phát chẩn năm đói (từ 5 lượng)
  giet_cuop_dang_ac:{p:'vua',t:'nho',g:1,b:1}, // Giết kẻ cướp đang hành ác
  tha_ke_ac:{p:'vua',seed:1}, // Tha kẻ ác đầu hàng
  giet_vo_toi:{t:'lon',b:15,seed:1,tuyen:'huyet_thu'}, // Giết người vô tội
  diet_khau:{t:'lon',b:15,seed:1,tuyen:'huyet_thu'}, // Giết người diệt khẩu
  giet_dau_hang:{t:'vua',b:3}, // Giết kẻ đã đầu hàng
  tra_tan:{t:'vua',b:3}, // Tra tấn
  tra_tan_cuu_nguoi:{t:'vua',g:3,b:1}, // Tra hỏi để cứu người khác
  giet_thu_vo_hai:{t:'nho',b:1}, // Giết yêu thú vô hại để lấy yêu đan
  giet_thu_cuu_sinh:{t:'nho',g:3,seed:1}, // Giết thú đang hại sinh linh khác
  phong_sinh:{p:'nho',g:1,seed:1}, // Phóng sinh, thả thú bị nhốt
  trom_ngheo:{t:'vua',b:3,seed:1}, // Trộm của người nghèo
  trom_ac_ba:{t:'vua',g:1,b:1}, // Trộm của ác bá
  hiep_dao:{p:'nho',t:'vua',g:3,b:1}, // Trộm của ác bá chia cho người nghèo
  lua_loi:{t:'vua',b:1}, // Lừa gạt vì lợi
  lua_cuu:{t:'nho',g:3}, // Nói dối để cứu người
  giu_loi:{p:'vua',g:1}, // Giữ lời hứa khi khó
  that_hua:{t:'vua',b:1,tuyen:'hua'}, // Thất hứa
  phan_su_mon:{t:'lon',b:3,tuyen:'oan'}, // Phản bội sư môn
  phan_ma_cuu:{p:'vua',t:'nho',g:3,tuyen:'oan'}, // Phản ma môn để cứu người
  hieu_kinh:{p:'nho',g:1}, // Phụng dưỡng cha mẹ (mỗi năm)
  bo_roi_gia_dinh:{t:'nho',b:3,seed:1}, // Bỏ rơi gia đình
  quan_thanh_liem:{p:'nho',g:1}, // Làm quan thanh liêm (mỗi năm)
  tham_o:{t:'vua',b:3,seed:1}, // Tham ô một vụ
  an_oan:{t:'nho',b:8,tuyen:'huyet_thu'}, // Xử oan người vô tội
  ep_ta_dien:{t:'nho',b:3}, // Ép tá điền, cho vay nặng lãi (mỗi năm)
  hanh_hiep:{p:'vua',g:3,seed:1}, // Hành hiệp trượng nghĩa
  dau_doc:{t:'vua',b:8}, // Đầu độc người
  giet_thien_kieu_chinh:{t:'lon',b:8,tuyen:'huyet_thu'}, // Giết thiên kiêu chính đạo
  giet_ma_dau:{p:'vua',g:3,b:1,tuyen:'oan'}, // Giết ma đầu
  giet_doat_bao:{t:'lon',b:8,tuyen:'huyet_thu'}, // Giết người đoạt bảo
  diet_mon_ma:{p:'lon',t:'vua',g:3,b:8,seed:1}, // Tham gia diệt môn ma tông
  diet_mon_chinh:{t:'lon',b:15,tuyen:'huyet_thu'}, // Tham gia diệt môn chính tông
  pha_phong_an:{t:'vua',seed:1}, // Phá phong ấn thả yêu ma
  sieu_do:{p:'vua',g:3}, // Siêu độ vong hồn
  dao_mo:{t:'nho',b:1,seed:1}, // Đào mộ lấy của
  an_tang:{p:'nho',g:1,seed:1}, // An táng người chết bên đường
  huyet_te_nguoi:{t:'nho',b:1}, // Huyết tế người (mỗi mạng)
  luyen_hon_nguoi:{t:'lon',b:8}, // Luyện hồn người sống
  doat_can:{t:'lon',b:15,tuyen:'huyet_thu'}, // Đoạt linh căn
  dung_ma_cong:{t:'nho'}, // Dùng công pháp tà trong một trận
  cuu_dich:{p:'vua',g:15}, // Chữa một vùng dịch
  pha_de:{t:'vua',g:15,b:8}, // Phá đê cứu thành, nhấn chìm làng nhỏ
  ban_dong_doi:{t:'vua',b:3,seed:1,tuyen:'oan'}, // Bỏ đồng đội bị thương giữa hiểm cảnh
  ket_lieu_dong_doi:{t:'lon',b:8,tuyen:'huyet_thu'}, // Kết liễu đồng đội để lấy đồ
  bao_thu:{t:'nho',b:1,khep:1}, // Báo thù kẻ đã hại mình
  hoa_giai:{p:'vua',g:3,khep:1}, // Tha thứ kẻ thù, hóa giải
  ban_nguoi:{t:'lon',b:8}, // Bán người làm nô
  nhan_nuoi:{p:'vua',g:3,tuyen:'duyen'}, // Nhận nuôi trẻ mồ côi
  sam_hoi:{p:'nho',bPct:-10}, // Sám hối ở chùa
  nghich_thien:{b:8}, // Nghịch thiên cải mệnh (Thiên cơ)
};
