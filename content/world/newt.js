// Nguồn chuẩn: NEWT. Luật xử lý ở src/game/core2/02-dia-diem-mo-rong.js.
const NEWT={
  linhdia:{n:'phúc địa',as:'nui',sfx:['Phúc Địa','Linh Tuyền','Tiên Cốc']},
  khoang:{n:'mỏ linh khoáng',as:'dong',sfx:['Khoáng Động','Thạch Mạch','Linh Khoáng']},
  duoc:{n:'dược cốc',as:'rung',sfx:['Dược Cốc','Thảo Viên','Dược Lâm']},
  cho:{n:'chợ phiên tu sĩ',as:'thanh',sfx:['Tụ Bảo Phường','Chợ Phiên','Giao Dịch Phường']},
  ancu:{n:'thảo lư ẩn sĩ',as:'nui',sfx:['Thảo Lư','Trúc Xá','Am']},
  dam:{n:'đầm lầy',as:'song',sfx:['Đầm','Trạch','Bãi Lầy']},
  // loại sinh riêng ở thế giới mới (no:1 = không rải ngẫu nhiên ở extendWorld; mượn cảnh, sự kiện, yêu ma của loại `as`; ic = biểu tượng chữ)
  tutran:{n:'trấn tu sĩ',as:'tran',no:1,ic:'🏘️',sfx:['Phường','Tập','Bảo']},
  tuthanh:{n:'thành tu sĩ',as:'thanh',no:1,ic:'🏯',sfx:['Tiên Thành','Linh Thành']},
  bicanh:{n:'bí cảnh',as:'thien',no:1,ic:'🌀',sfx:['Bí Cảnh','Huyền Cảnh']},
  dongthien:{n:'động thiên',as:'dong',no:1,ic:'🌌',sfx:['Động Thiên']},
  como:{n:'cổ mộ',as:'phe',no:1,ic:'⚰️',sfx:['Cổ Mộ','Địa Cung']},
  yeusao:{n:'yêu sào',as:'rung',no:1,ic:'🐾',sfx:['Yêu Sào','Yêu Quật']},
  ditich:{n:'di tích cổ',as:'phe',no:1,ic:'🗿',sfx:['Di Tích','Cổ Điện']},
};
