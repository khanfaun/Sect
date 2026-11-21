// Nguồn chuẩn: DD. Luật xử lý ở src/game/core2/81-dung-dau.js — lên làm người đứng đầu một thế lực.
// Ba loại: tông môn của ngươi (ở sơn môn), thế lực có trụ sở neo (ở trụ sở), Hoàng quốc (ở kinh đô: Lương Kinh, nước khác lấy thành phàm lớn nhất nước đó).
// ke: kế vị êm (đủ công, đủ cảnh giới; Hoàng quốc cần thêm số thành trấn ngươi đang cai quản cho nước đó).
// thach: thách đấu / soán ngôi (đủ công tối thiểu, cảnh giới tối thiểu): đánh trận với người đang giữ ngôi và cận vệ (cnt), thắng thì lên ngôi, người cũ chết.
//   Hoàng quốc soán ngôi: thiện ác −soanKarma, bị truy nã ở kinh đô.
// realm: cảnh giới tối thiểu (-1 không cần; thế lực phàm nhân không cần). danh: tên gọi người đứng đầu theo thế lực.
const DD={
  tong:{ke:{cong:3000,realm:3},thach:{cong:1000,realm:2,cnt:3}},
  fa:{ke:{cong:1500,realm:2},thach:{cong:500,realm:1,cnt:3}},
  hq:{ke:{cong:3000,thanh:2},thach:{cong:1000,cnt:4},soanKarma:30},
  pham:['FA04','FA10'],
  danh:{tong:'Chưởng môn',hq:'Hoàng đế',FA02:'Hội chủ',FA03:'Các chủ',FA04:'Trưởng thôn',FA05:'Cốc chủ',FA06:'Môn chủ',FA07:'Cốc chủ',FA08:'Hội chủ',FA09:'Trụ trì',FA10:'Đại tướng quân',_:'Gia chủ'}};
