// Nguồn chuẩn: THOI_CUC, QUOC_MOI. Luật xử lý ở src/game/core2/55-thoi-cuc.js.
// 14 đồng hồ thế giới (HN A.9.2: 6 của C + 8 của B). Chạy theo NĂM THẾ GIỚI, không theo tuổi nhân vật.
//   noi neo chính; kv đại khu chịu ảnh hưởng; lap [ít, nhiều] năm giữa hai lần (0 = không theo thời gian, chỉ tăng vì hành động);
//   dau [ít, nhiều] năm (tính từ năm 1000) của lần đầu; mot 1 = chỉ một lần; giaiDoan ba giai đoạn; dai số năm mỗi giai đoạn;
//   can cách can thiệp; macDinh chuyện xảy ra nếu không ai can thiệp (ghi Sử lược); anhHuong điều để lại; fx tác dụng mặc định (luật đọc).
const THOI_CUC={
  CLK01:{n:'Mùa đói Thanh Khê',nguon:'C',noi:'LOC01',kv:[0],lap:[6,14],dau:[5,12],giaiDoan:['kho lương vơi','thiếu lương hai quý','dân bỏ làng'],dai:[1,1,1],
    can:'Trữ thóc, sửa đê, giảm thuế, cướp kho, hộ tống',macDinh:'Hộ nghèo Thanh Khê di cư, ruộng đổi chủ; người sống sót mang sổ hộ tới Lương Kinh.',
    macDinh2:'Hạn hán ba năm khắp cõi: giá lương lên gấp ba, dân tản cư, cướp nổi.',anhHuong:'Giá lương, làng bỏ hoang',fx:{fa:{FA04:-12,FA01:-4},loc:'LOC01',toan:0.15}},
  CLK02:{n:'Nợ của triều đình',nguon:'C',noi:'LOC02',kv:[0],lap:[8,15],dau:[6,12],giaiDoan:['đến kỳ trả nợ','trễ kỳ thứ nhất','trễ kỳ thứ hai'],dai:[1,1,1],
    can:'Thanh tra, trả nợ, thương lượng, đảo chính',macDinh:'Triều đình trễ hai kỳ nợ; Vạn Bảo Thương Hội nắm kho mỏ Hàn Thiết Lô.',anhHuong:'Quyền mỏ',fx:{fa:{FA01:-6,FA02:8,FA08:-10}}},
  CLK03:{n:'Biên ải',nguon:'C',noi:'LOC13',kv:[4],lap:[10,20],dau:[8,16],giaiDoan:['đông về, xét lương quân','thiếu lương, thiếu người','quân địch phá ải'],dai:[1,1,1],
    can:'Tiếp tế, đàm phán, chỉ huy, phá đường quân địch',macDinh:'Bắc Phong Ải thất thủ; dân và quân rút về Táng Cốt Nguyên.',anhHuong:'Chiến địa, tuyến tiếp tế lưu vong',fx:{fa:{FA10:-15,FA01:-5},loc:'LOC13',ruin:[3,6]}},
  CLK04:{n:'Huyết ước',nguon:'C',noi:'LOC07',kv:[2],lap:[3,3],dau:[3,3],giaiDoan:['gọi họp huyết tộc','trình vật chứng huyết mạch','xác nhận quyền kế vị'],dai:[0,0,1],
    can:'Dự họp, công bố hồ sơ, cướp ấn, hủy nghi lễ',macDinh:'Huyết tộc họp; người kế vị do chủ cốc chọn được xác nhận.',anhHuong:'Quyền kế vị Huyết Sát Cốc',fx:{fa:{FA05:2}}},
  CLK05:{n:'Thú triều',nguon:'C+B',noi:'LOC08',kv:[4,2],lap:[22,28],dau:[15,25],giaiDoan:['dấu hiệu trong rừng','vạn thú xuống núi','thú vương hiện'],dai:[1,1,1],
    can:'Giảm săn, dời đường, săn thủ lĩnh, lập bẫy, lập ước',macDinh:'Đàn thú tràn qua; vài thôn ở Bắc Nhạc bị xoá, thành tàn tích.',anhHuong:'Thôn mất, tàn tích',fx:{fa:{FA06:-6,FA10:-4},ruinTran:{kv:4,n:[1,2],y:[4,8]}}},
  CLK06:{n:'Đêm Dài trở lại',nguon:'C+B',noi:'LOC15',kv:[0,1,2,3,4],lap:0,giaiDoan:['trăng đỏ (Huyết Nguyệt)','ma tu trỗi dậy','Ma chủ tỉnh'],dai:[0,0,5],
    can:'Vá phong ấn, thay nhiên liệu, chiếm trục hoặc mở cửa thoát',macDinh:'Không ai ngăn được Đêm Dài; ba khu đất quanh nơi Ma chủ tỉnh hóa đất ma.',anhHuong:'Ba khu đất ma (hồi phục theo thế kỷ)',
    note:'Chỉ tăng vì hành động (phá phong ấn, diệt hồn quy mô lớn, lạm dụng trục luân hồi); không tăng vì thời gian hay số kiếp.',fx:{maVuc:3}},
  CLK07:{n:'Đại Hội Thiên Kiêu',nguon:'B',noi:'LOC02',kv:[0],lap:[30,30],dau:[30,30],giaiDoan:['mở đăng ký','vòng loại ở các khu','chung kết'],dai:[0,0,1],
    can:'Tham dự, ám sát, đặt cược, kết giao',macDinh:'Đại Hội Thiên Kiêu khép lại; bảng thiên kiêu mới xếp theo sức.',anhHuong:'Hạng thiên kiêu',fx:{}},
  CLK08:{n:'Tông Chiến Chính–Ma',nguon:'B',noi:null,kv:[0,1,2,3,4],lap:[150,150],dau:[40,60],giaiDoan:['xích mích','vây công','quyết chiến'],dai:[1,1,1],
    can:'Chọn phe, phản bội, cứu tạp dịch, đứng ngoài',macDinh:'Tông chiến chính ma: một sơn môn của phe yếu hơn bị đánh chiếm.',anhHuong:'Sơn môn đổi chủ',fx:{tong:1}},
  CLK09:{n:'Đổi Ngôi',nguon:'B',noi:'LOC02',kv:[0],lap:[60,120],dau:[60,120],giaiDoan:['thuế nặng, loạn','khởi nghĩa','kinh thành thất thủ'],dai:[2,1,1],
    can:'Phò ai, tự lên ngôi, cứu vua cũ',macDinh:'Lương Kinh thất thủ; triều mới do một phe lập, đổi quốc hiệu.',anhHuong:'Tên triều đại, quốc hiệu',fx:{doiNgoi:1,fa:{FA10:-3}}},
  CLK10:{n:'Đại Dịch',nguon:'B',noi:'LOC10',kv:[2,3],lap:[80,160],dau:[30,90],giaiDoan:['người chết lạ','dịch lan rộng','phong tỏa'],dai:[1,1,1],
    can:'Tìm thuốc, diệt nguồn',macDinh:'Đại dịch qua Nam Trạch và Tây Lĩnh; chừng một phần ba dân chết, làng bỏ hoang, lăng mộ dịch.',anhHuong:'Làng bỏ hoang, lăng mộ dịch',fx:{fa:{FA07:-10,FA06:-5},dich:{kv:[2,3],p:0.33}}},
  CLK11:{n:'Bí Cảnh Thượng Cổ Mở',nguon:'B',noi:null,kv:[3],lap:[50,50],dau:[45,55],giaiDoan:['ánh sáng ở Tây Lĩnh','tông lớn kéo tới','cửa đóng'],dai:[0,1,0],
    can:'Vào tranh, cướp, dẫn đường',macDinh:'Bí cảnh thượng cổ mở rồi đóng; tông lớn lấy hết bảo vật.',anhHuong:'Bảo vật xuất thế trong tay ai',fx:{}},
  CLK12:{n:'Tiên Nhân Hạ Phàm',nguon:'B',noi:'LOC15',kv:[0,1,2,3,4],lap:0,mot:1,dau:[200,320],giaiDoan:['dị tượng','người thượng giới đi tìm một vật','một tông diệt'],dai:[1,1,1],
    can:'Che giấu vật, trao vật, đối đầu',macDinh:'Người từ thượng giới xuống tìm một vật rồi đi; một sơn môn tan, trên trời còn vết nứt.',anhHuong:'Vết nứt trên trời (một nguồn chứng của tri thức)',fx:{tong:1,vetNut:1}},
  CLK13:{n:'Long Mạch Đứt',nguon:'B',noi:null,kv:[0,1,2,3,4],lap:[300,600],dau:[100,250],giaiDoan:['linh khí suy','động phủ khô','tranh linh mạch'],dai:[2,2,1],
    can:'Nối long mạch, phá ma trận',macDinh:'Long mạch một khu đứt; linh khí khu đó suy, tu luyện chậm về sau.',anhHuong:'Linh khí khu vực',fx:{longMach:0.3}},
  CLK14:{n:'Thiên Lộ Mở',nguon:'B',noi:'LOC15',kv:[4],lap:[300,300],dau:[280,320],giaiDoan:['cầu ánh sáng','tranh vào','cửa khép'],dai:[1,8,1],
    can:'Tranh vào Thiên Lộ; trong mười năm này lôi kiếp bớt một đợt',macDinh:'Thiên Lộ mở rồi khép; vài tu sĩ phi thăng.',anhHuong:'Người phi thăng; cửa Hồi Thanh Đài dễ mở hơn',fx:{thienLo:1}}
};
// quốc hiệu cho triều mới (Đổi Ngôi)
const QUOC_MOI=['Hậu Lương','Tân Chu','Đại Tề','Bắc Yến','Nam Chiếu','Đại Ninh','Hậu Tấn','Đông Việt','Tây Lương','Đại Khang','Thuận Hòa','Vĩnh An'];
