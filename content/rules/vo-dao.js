// Nguồn chuẩn: VO_BAC, VO_HOC, VO_LUYEN. Luật xử lý ở src/game/core2/41-vo-dao.js.
// Võ đạo phàm nhân (HN B §7.3). bac 0 = chưa nhập lưu; 1–6 = sáu bậc của B.
// k: hệ số công/thủ, kh: hệ số khí huyết (so với phàm nhân thường của game; bậc 4–6 ngang Luyện Khí sơ / trung / viên mãn)
// noi: nội lực tối đa (dùng chung thanh linh lực khi là phàm nhân); ngay: số ngày luyện cần; win: số trận thắng; loi: lôi đài thắng; ky: kỳ ngộ thăng bậc
const VO_BAC=[
  {n:'Chưa nhập lưu',k:1,kh:1,noi:0},
  {n:'Tam lưu',k:1.05,kh:1.06,noi:20,ngay:60},
  {n:'Nhị lưu',k:1.1,kh:1.12,noi:35,ngay:365,win:3},
  {n:'Nhất lưu',k:1.15,kh:1.18,noi:50,ngay:365,loi:1},
  {n:'Hậu thiên đỉnh phong',k:1.18,kh:1.25,noi:70,ngay:3650},
  {n:'Tiên thiên',k:1.46,kh:1.56,noi:95,ngay:3650,ky:'vo_nham_doc'},
  {n:'Tông sư',k:1.74,kh:1.88,noi:125,ngay:5000,ky:'vo_vo_y'},
];
// 14 bí tịch: need = bậc cần; sk = chiêu (trong SK_RAW, cờ fx.vo); fx = tác dụng bị động khi đủ bậc
// noiP: nội lực tối đa +%; lifeY: thọ +năm; bac: giá ở tạp hóa thành (chỉ hai quyển đầu của võ quán)
const VO_HOC=[
  {id:'truong_quyen',n:'Trường Quyền Nhập Môn',loai:'quyền',need:1,sk:'vo_truongquyen',fx:{atkP:5},bac:600},
  {id:'ngu_ho_dao',n:'Ngũ Hổ Đoạn Môn Đao',loai:'đao',need:2,sk:'vo_nguho'},
  {id:'that_tinh_kiem',n:'Thất Tinh Kiếm Pháp',loai:'kiếm',need:2,sk:'vo_thattinh',fx:{crit:5}},
  {id:'thiet_bo_sam',n:'Thiết Bố Sam',loai:'ngạnh công',need:2,sk:'vo_thietbo',fx:{defP:15,hpP:5}},
  {id:'thao_thuong_phi',n:'Thảo Thượng Phi',loai:'khinh công',need:3,sk:'vo_thaothuong',fx:{tp:6}},
  {id:'bat_quai_chuong',n:'Bát Quái Chưởng',loai:'chưởng',need:3,sk:'vo_batquai'},
  {id:'lien_chau_tien',n:'Liên Châu Tiễn Pháp',loai:'cung',need:3,sk:'vo_lienchau'},
  {id:'ung_trao_cong',n:'Ưng Trảo Công',loai:'trảo',need:3,sk:'vo_ungtrao'},
  {id:'thai_cuc',n:'Thái Cực Hóa Kình',loai:'nội gia',need:4,sk:'vo_thaicuc'},
  {id:'kim_chung_trao',n:'Kim Chung Tráo',loai:'ngạnh công',need:5,sk:'vo_kimchung'},
  {id:'pha_ngoc_quyen',n:'Phá Ngọc Quyền',loai:'cương quyền',need:5,sk:'vo_phangoc'},
  {id:'doan_thuy_kiem',n:'Đoạn Thủy Kiếm Ý',loai:'kiếm ý',need:6,sk:'vo_doanthuy'},
  {id:'hon_nguyen',n:'Hỗn Nguyên Nhất Khí Công',loai:'nội công',need:1,fx:{noiP:20},bac:900},
  {id:'quy_tuc',n:'Quy Tức Công',loai:'nội công',need:2,fx:{lifeY:2}},
];
// h: giờ một buổi luyện (một "ngày luyện"); tu: hệ số của tu sĩ (một nửa); hoi: nội lực hồi đầy sau số giờ này
const VO_LUYEN={h:6,tu:0.5,hoi:12,noi:['*']};
