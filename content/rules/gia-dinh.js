// Nguồn chuẩn: GD. Luật xử lý ở src/game/core2/39-tien-te.js (phần Đ3.8).
// Gia đình cơ bản (HN B §6.6): cha, mẹ hơn nhân vật 22–34 tuổi (38–50 khi nhân vật mười sáu), 0–3 anh chị em.
// none: xuất thân mồ côi, khất cái, bị bỏ → không có người nhà. gia: tuổi từ đó mỗi năm pChet chết; tuổi yeu/benh: từ đó sức khỏe sa sút dần.
const GD={none:['khat','mieu','xt_dua_tre_nhat_o_bac_cua','xt_dua_tre_lon_sau_bep','xt_ke_mang_tro_ve_que'],
  chaMe:[22,34],anhEm:[0,3],gia:60,pChet:0.08,yeu:50,pYeu:0.06,pBenh:0.04,pLc:0.1,
  thai:{thuong:0.75,lanh:0.2,ghet:0.05},
  qh:{cha:'Cha',me:'Mẹ',anh:'Anh',chi:'Chị',em:'Em'},
  suc:{khoe:'Khỏe',yeu:'Yếu',benh:'Bệnh'},
  thaiN:{thuong:'Thương ngươi',lanh:'Lạnh nhạt',ghet:'Ghét ngươi'}};
