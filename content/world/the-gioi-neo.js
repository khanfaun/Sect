// Nguồn chuẩn: LOC_NEO, LOC_DUONG, LOC_LOI, VAI_NP, THE_LUC. Luật xử lý ở src/game/core2/54-the-gioi-neo.js.
// Mã LOC/NP/FA giữ đúng thiết kế (HN Phần C §6, §7) — file hướng dẫn viết cốt truyện dùng các mã này.
// LOC_NEO: n tên; kv đại khu (0 Trung Châu, 1 Đông Hoang, 2 Nam Trạch, 3 Tây Lĩnh, 4 Bắc Nhạc);
//   t loại nút được chọn làm neo (theo thứ tự ưu tiên; không dùng nút sơn môn để không đổi tên tông);
//   fa thế lực chủ; dung công dụng; pha các trạng thái khi bị phá (Luật 2 HN A.17: chỉ đi theo các trạng thái này);
//   luu nơi giữ bản lưu khi nơi này mất; loi 1 = có phần lõi không thể mất (Luật 5).
const LOC_NEO={
  LOC01:{n:'Thanh Khê Thôn',kv:0,t:['tran'],fa:'FA04',dung:'Ruộng, nhà hộ dân, đê, kho thóc, chợ.',pha:['trại tị nạn','di tích'],luu:'LOC02'},
  LOC02:{n:'Lương Kinh',kv:0,t:['thanh'],fa:'FA01',dung:'Triều đình, trường thi, ngục, sổ thuế, sân khấu.',pha:['kinh thành đổi chủ','kinh thành dưới luật mới']},
  LOC03:{n:'Vạn Bảo Hội Quán',kv:0,t:['cho','thanh','tran'],fa:'FA02',dung:'Hợp đồng, thương đội, bảo quản, đấu giá.',pha:['hội quán cháy, sổ nợ còn bản sao trong thương đội','nền hội quán cũ'],luu:'LOC09'},
  LOC04:{n:'Cổ Miếu Vô Danh',kv:1,t:['phe','ancu','tran'],fa:null,dung:'Trú ẩn, bia tên người mất, dấu mộng.',pha:['miếu đổ, bia vỡ còn mảnh chữ đọc được','nền miếu giữa cỏ']},
  LOC05:{n:'Huyền Cơ Trận Các',kv:1,t:['linhdia','dong','phe','thanh'],fa:'FA03',dung:'Trận đồ, trục quan trắc, hồ sơ Ngũ Tổ.',pha:['các sụp, còn phòng lõi nguy hiểm có thể khảo sát','phòng lõi giữa đá đổ'],loi:1},
  LOC06:{n:'Đoạn Tùng Lâm',kv:1,t:['rung','nui','dam','linhdia','dong'],fa:null,dung:'Gỗ, dược phàm, thú, đất chôn.',pha:['rừng cháy, lộ nền đá cổ','rừng non mọc trên nền đá cổ']},
  LOC07:{n:'Huyết Sát Cốc',kv:2,t:['ma','dong','sao','dam'],fa:'FA05',dung:'Huyết tộc, huyết trì, pháp ước, tranh quyền.',pha:['cốc vắng, còn ấn và hồ sơ bị nguyền','huyết trì khô']},
  LOC08:{n:'Vạn Thú Môn',kv:2,t:['rung','sao','linhdia','dong'],fa:'FA06',dung:'Chuồng thú, trại cứu thương, sổ khế ước, cửa gọi linh.',pha:['chuồng bỏ ngỏ, thú thả ra thành bầy thật','trại cũ giữa bầy thú']},
  LOC09:{n:'Tịch Chiếu Bến',kv:2,t:['song','dam','tran'],fa:null,dung:'Đò, lưới, chợ nước, sân hát, xác tàu.',pha:['lũ đổi lối vào, lời khai nằm trên bảng khắc thuyền','bến mới bên dòng cũ']},
  LOC10:{n:'Bách Thảo Cốc',kv:3,t:['duoc','linhdia','rung'],fa:'FA07',dung:'Ruộng thuốc, bệnh xá, hồ sơ dịch, bàn luyện đan.',pha:['vườn bị đốt, hạt giống còn trong kho lạnh','vườn mọc lại từ kho lạnh']},
  LOC11:{n:'Hàn Thiết Lô',kv:3,t:['khoang','nui','dong','tran'],fa:'FA08',dung:'Mỏ, lò, xưởng giấy và khuôn.',pha:['mỏ đóng, còn đường hầm, bảng công và lô kim loại cuối','đường hầm bỏ hoang']},
  LOC12:{n:'Lạn Kha Tự',kv:3,t:['ancu','phe','linhdia','nui','dong'],fa:'FA09',dung:'Thư khố, nhà tạm trú, tháp tro, văn bia.',pha:['chùa đổ, văn bản tản mát ở người hành hương','tháp tro còn đứng'],loi:1},
  LOC13:{n:'Bắc Phong Ải',kv:4,t:['thanh','tran'],fa:'FA10',dung:'Quân doanh, trường luyện, trạm ngựa, kho.',pha:['ải thất thủ thành chiến địa, tuyến tiếp tế lưu vong','chiến địa cũ']},
  LOC14:{n:'Táng Cốt Nguyên',kv:4,t:['phe','hoang','dong','tran'],fa:null,dung:'Mồ tập thể, bia trận vong, trại người trở về, xưởng dựng bia.',pha:['trại bỏ hoang, dấu linh hồn còn đọc được','đồng mộ không người']},
  LOC15:{n:'Hồi Thanh Đài',kv:4,t:['thien','linhdia','nui','dong','phe'],fa:null,dung:'Điểm nghe ký ức, quan trắc Đêm Dài và cửa kết thúc.',pha:['nền đá nứt, lõi đài còn nghe được','nền đá'],loi:1}
};
// đường neo bắt buộc (C §6): [a,b,cách đi]
const LOC_DUONG=[['LOC01','LOC02','bo'],['LOC02','LOC03','bo'],['LOC01','LOC04','bo'],['LOC04','LOC05','bo'],['LOC04','LOC06','bo'],['LOC06','LOC08','bo'],['LOC08','LOC07','bo'],['LOC08','LOC09','bo'],
  ['LOC09','LOC03','thuy'],['LOC03','LOC11','thuong'],['LOC11','LOC10','bo'],['LOC10','LOC12','bo'],['LOC11','LOC13','bo'],['LOC13','LOC14','bo'],['LOC14','LOC15','son'],['LOC12','LOC15','son']];
// nơi có phần lõi không thể mất: mỗi tri thức luôn có ít nhất một nguồn ở đây (Luật 5)
const LOC_LOI=['LOC05','LOC12','LOC15'];
// VAI_NP: mỗi NP là một VAI (Luật 1 HN A.17), tên ở đây là người giữ vai thời mở đầu.
//   g giới; vai việc của vai; noi neo LOC; fa thế lực; tu cảnh giới (-1 = phàm, thọ 60–80; ≥0 thọ theo LIFE); tuoi tuổi lúc mở đầu;
//   ke cách nối vai: con (con cái), tro (học trò), thay (người thay); qh quan hệ; muc mục đích; lich lịch thường lệ;
//   thay người/vật chứng thay thế khi vai không còn ai giữ; lead 1 = người đứng đầu thế lực; bat 1 = không già, không người kế (NP30).
const VAI_NP={
  NP01:{ten:'Lý Thổ',g:'nam',vai:'đại diện hộ nông',noi:'LOC01',fa:'FA04',tu:-1,tuoi:46,ke:'con',lead:1,qh:'người nuôi OR01',muc:'Giữ đê và đất',lich:'ban ngày ruộng LOC01, tối kho thóc; ngày bảy họp hộ',thay:'sổ hộ và bia người giữ giống'},
  NP02:{ten:'Mộc Nghi',g:'nu',vai:'dân binh',noi:'LOC01',fa:'FA04',tu:-1,tuoi:31,ke:'thay',qh:'đồng đội cũ NP25',muc:'Đưa quân dịch trở về',lich:'ngày tại trạm LOC01, tối sân luyện; ngày ba đi LOC02',thay:'danh sách quân dịch ở trạm'},
  NP03:{ten:'Tạ Văn Kính',g:'nam',vai:'thư lại',noi:'LOC02',fa:'FA01',tu:-1,tuoi:38,ke:'tro',qh:'học trò cũ NP23',muc:'Sửa sổ thuế nhưng sợ mất chức',lich:'ngày công đường LOC02, tối chép sách; ngày bảy thăm ngục',thay:'bản sổ thuế có nét sửa'},
  NP04:{ten:'Lương Hạo',g:'nam',vai:'quân chủ',noi:'LOC02',fa:'FA01',tu:-1,tuoi:42,ke:'con',lead:1,qh:'chủ nợ là NP05',muc:'Giữ ngôi, sợ tên mình thành tên cuối sử',lich:'ngày triều LOC02, đêm nội cung; ngày năm tế miếu',thay:'chiếu chỉ và ấn triều'},
  NP05:{ten:'Thẩm Cửu',g:'nam',vai:'chưởng quỹ',noi:'LOC03',fa:'FA02',tu:-1,tuoi:52,ke:'tro',lead:1,qh:'chủ hợp đồng NP06',muc:'Giữ chữ tín có lợi cho hội',lich:'ngày quầy LOC03, tối kiểm sổ; ngày hai đấu giá',thay:'sổ nợ bản sao trong thương đội'},
  NP06:{ten:'Lạc Tín',g:'nam',vai:'người dẫn thương đội',noi:'LOC03',fa:'FA02',tu:-1,tuoi:34,ke:'thay',qh:'anh em kết nghĩa NP17',muc:'Chuộc người nhà bị cầm cố',lich:'ngày lẻ LOC03, ngày chẵn trên tuyến LOC03–LOC11, đêm trại đường',thay:'khế cầm cố người nhà'},
  NP07:{ten:'Vô Đăng',g:'nam',vai:'người giữ miếu',noi:'LOC04',fa:null,tu:-1,tuoi:61,ke:'tro',qh:'người nuôi OR07',muc:'Giữ danh tính người bị xóa',lich:'sáng sửa bia LOC04, tối đốt đèn; ngày sáu đưa tro LOC12',thay:'bia tên người mất trong miếu'},
  NP08:{ten:'Mạc Liên',g:'nu',vai:'người dò phả hệ',noi:'LOC04',fa:null,tu:-1,tuoi:27,ke:'thay',qh:'từng bị FA05 truy tìm',muc:'Tìm tên mẹ mình',lich:'ngày LOC04, tối đọc bia; ngày ba khảo sát LOC07 nếu có hộ tống',thay:'tập chép bia'},
  NP09:{ten:'Hứa Triều',g:'nam',vai:'trận sư',noi:'LOC05',fa:'FA03',tu:2,tuoi:180,ke:'tro',lead:1,qh:'thầy NP10',muc:'Giữ trận dù biết nó có nợ',lich:'ngày lõi LOC05, tối thư thất; ngày một nhận học đồ',thay:'trận đồ ở phòng lõi'},
  NP10:{ten:'Diệp Vân',g:'nu',vai:'học đồ trận',noi:'LOC05',fa:'FA03',tu:0,tuoi:24,ke:'tro',qh:'thân nhân một thợ chết',muc:'Công khai bảng người bị hiến',lich:'ngày sửa trận LOC05, đêm sao hồ sơ; ngày bảy tới LOC04',thay:'bản sao bảng người bị hiến'},
  NP11:{ten:'Đỗ Lộc',g:'nam',vai:'tiều phu',noi:'LOC06',fa:'FA04',tu:-1,tuoi:36,ke:'con',qh:'người anh của tuyến giữ rừng',muc:'Nuôi con và không bán hết rừng',lich:'sáng LOC06, tối LOC01; ngày năm họp hộ',thay:'dấu khắc trên cây mẹ'},
  NP12:{ten:'Dã Tâm',g:'nam',vai:'sứ thú của Yêu Hoàng',noi:'LOC06',fa:null,tu:3,tuoi:420,ke:'thay',qh:'từng cứu NP16; nhận ra Người Gác Bến',muc:'Lập lại hiệp ước sinh cảnh',lich:'ngày tuần rừng LOC06, đêm bờ suối; ngày trăng khuyết tới LOC08',thay:'hiệp ước sinh cảnh khắc trên đá'},
  NP13:{ten:'Tần Huyết Lăng',g:'nu',vai:'chủ huyết cốc',noi:'LOC07',fa:'FA05',tu:3,tuoi:260,ke:'con',lead:1,qh:'có quan hệ phả hệ OR14',muc:'Giữ dòng tộc, không muốn bị chiếm hồn',lich:'ngày nghi điện LOC07, tối huyết trì; ngày ba xử tranh quyền',thay:'ấn huyết cốc và hồ sơ bị nguyền'},
  NP14:{ten:'A Túc',g:'nu',vai:'người giữ huyết phả',noi:'LOC07',fa:'FA05',tu:0,tuoi:29,ke:'thay',qh:'bị NP13 kiểm soát',muc:'Cứu những tên bị loại khỏi tộc',lich:'ngày kho phả LOC07, tối nhà nhỏ; ngày sáu giao thư LOC09',thay:'huyết phả'},
  NP15:{ten:'Bạch Kỳ',g:'nam',vai:'người quản thú',noi:'LOC08',fa:'FA06',tu:2,tuoi:150,ke:'tro',lead:1,qh:'thầy NP16',muc:'Giữ môn tồn tại qua thú triều',lich:'ngày chuồng LOC08, tối sổ khế; ngày hai tuyển học đồ',thay:'sổ khế ước thú'},
  NP16:{ten:'Kỷ Vũ',g:'nu',vai:'thú y',noi:'LOC08',fa:'FA06',tu:0,tuoi:26,ke:'tro',qh:'mang ơn NP12',muc:'Chấm dứt khế ước cưỡng ép',lich:'ngày bệnh thú LOC08, tối soạn phương; ngày năm vào LOC06',thay:'phương thuốc thú'},
  NP17:{ten:'Giang Mộ',g:'nam',vai:'lái đò',noi:'LOC09',fa:null,tu:-1,tuoi:49,ke:'con',qh:'kết nghĩa NP06',muc:'Chở người sống và trả tên người chết',lich:'sáng tối LOC09, trưa nghỉ; ngày mười lăm cúng xác vô danh',thay:'bảng khắc thuyền'},
  NP18:{ten:'Ninh Ca',g:'nu',vai:'chủ gánh hát',noi:'LOC09',fa:null,tu:-1,tuoi:33,ke:'tro',qh:'được NP03 che chở',muc:'Đưa lời khai bị cấm lên sân khấu',lich:'ngày tập LOC09, tối diễn; ngày hai và năm lưu diễn LOC02',thay:'vở tuồng chép tay'},
  NP19:{ten:'Tô Bán Hạ',g:'nu',vai:'y sư',noi:'LOC10',fa:'FA07',tu:1,tuoi:88,ke:'tro',lead:1,qh:'thầy NP20',muc:'Mở bệnh xá đủ sức nuôi người chữa',lich:'ngày bệnh xá LOC10, tối ruộng thuốc; ngày bảy nhận ca nghèo',thay:'hồ sơ dịch và hạt giống kho lạnh'},
  NP20:{ten:'Hà Tề',g:'nam',vai:'dược đồng',noi:'LOC10',fa:'FA07',tu:-1,tuoi:19,ke:'tro',qh:'anh em họ NP27',muc:'Tìm nguồn dịch, nghi sổ triều bị sửa',lich:'sáng vườn LOC10, tối giã thuốc; ngày ba tới LOC11 lấy mẫu',thay:'mẫu nước và sổ ghi bệnh'},
  NP21:{ten:'Cố Chùy',g:'nam',vai:'chủ lò',noi:'LOC11',fa:'FA08',tu:-1,tuoi:50,ke:'con',lead:1,qh:'đối tác NP05',muc:'Trả nợ lò mà không chôn thêm thợ',lich:'ngày lò LOC11, tối nhà thợ; ngày bảy phát công',thay:'bảng công thợ mỏ'},
  NP22:{ten:'La Men',g:'nam',vai:'thợ khuôn và giấy',noi:'LOC11',fa:'FA08',tu:-1,tuoi:44,ke:'tro',qh:'từng làm ấn giả cho NP28',muc:'Mua lại tên tuổi nghề',lich:'ngày xưởng LOC11, tối thử men; ngày bốn chợ nghề',thay:'khuôn ấn giả'},
  NP23:{ten:'Trí Viễn',g:'nam',vai:'người giữ thư khố',noi:'LOC12',fa:'FA09',tu:1,tuoi:97,ke:'tro',lead:1,qh:'thầy cũ NP03',muc:'Ghi sự thật mà không khiến chiến tranh tái phát',lich:'ngày thư khố LOC12, tối tháp tro; ngày một tiếp người đọc',thay:'thư khố Lạn Kha'},
  NP24:{ten:'Sầm Tro',g:'nam',vai:'người khắc bia',noi:'LOC12',fa:'FA09',tu:-1,tuoi:55,ke:'tro',qh:'đồng đội mất tại LOC14',muc:'Trả tên cho từng nắm tro',lich:'ngày LOC12, đêm khắc; tuần cuối tháng tới LOC14',thay:'văn bia đã khắc'},
  NP25:{ten:'Đường Bắc Quy',g:'nam',vai:'chỉ huy',noi:'LOC13',fa:'FA10',tu:0,tuoi:45,ke:'thay',lead:1,qh:'đồng đội NP02',muc:'Đưa quân về đủ người, có thể phản triều vì việc ấy',lich:'ngày doanh LOC13, tối bản đồ; ngày ba duyệt kho',thay:'bản đồ quân doanh'},
  NP26:{ten:'A Mãn',g:'nam',vai:'giữ ngựa trạm',noi:'LOC13',fa:'FA10',tu:-1,tuoi:17,ke:'thay',qh:'em người lính mất tích',muc:'Giữ đường tin không bị sửa',lich:'sáng trạm LOC13, tối chăm ngựa; ngày hai chạy LOC14',thay:'sổ trạm ngựa'},
  NP27:{ten:'Mạnh Cốt',g:'nam',vai:'thầy bó xương',noi:'LOC14',fa:null,tu:-1,tuoi:41,ke:'tro',qh:'anh em họ NP20',muc:'Cứu người còn sống giữa nghĩa địa',lich:'ngày trại LOC14, tối ghi tên; ngày bảy tìm hài cốt',thay:'sổ tên người được cứu'},
  NP28:{ten:'Bùi Ấn',g:'nam',vai:'cựu coi ấn',noi:'LOC14',fa:null,tu:-1,tuoi:58,ke:'con',qh:'cha mẹ của hậu duệ OR37',muc:'Công bố lệnh chết bị giả',lich:'ngày trại LOC14, đêm giấu ấn; ngày năm tới LOC12',thay:'ấn thật được giấu'},
  NP29:{ten:'Kha Vọng',g:'nu',vai:'người nghe ký ức',noi:'LOC15',fa:null,tu:2,tuoi:210,ke:'tro',qh:'học trò cũ NP09',muc:'Chứng minh có thể sửa vòng mà không hiến thêm người',lich:'ngày trục LOC15, tối nền đá; không nhận khách giữa lúc Đêm Dài dâng',thay:'nền đá ghi lời nghe được'},
  NP30:{ten:'Tịch Âm',g:'nu',vai:'ký ức kết tụ',noi:'LOC15',fa:null,tu:-1,tuoi:0,ke:'thay',bat:1,qh:'không phải người sống lại',muc:'Muốn được chấm dứt việc lặp lời người chết',lich:'chỉ hiện LOC15 khi có dấu thức tỉnh; gặp một lần mỗi giai đoạn',thay:'tiếng vọng ở nền đá'}
};
// THE_LUC: n tên; noi căn cứ; chu vai đứng đầu; tien/quan/dan sức tài, quân, dân (0–100); suc sức duy trì ban đầu; giu điều thế lực giữ;
//   no thế lực nó nợ / cần; lai mỗi năm sức duy trì đổi bao nhiêu khi yên ổn (âm: tự hao); phuc năm tối thiểu để có người lập lại sau khi diệt.
const THE_LUC={
  FA01:{n:'Lương triều',loai:'hq',kv:0,noi:'LOC02',chu:'NP04',tien:45,quan:55,dan:80,suc:65,giu:'thuế và ngôi',no:['FA02','FA10'],lai:-0.2,phuc:20},
  FA02:{n:'Vạn Bảo Thương Hội',noi:'LOC03',chu:'NP05',tien:90,quan:30,dan:40,suc:75,giu:'hợp đồng, độc quyền vận chuyển',no:['FA08','FA05'],lai:0.3,phuc:30},
  FA03:{n:'Huyền Cơ Trận Các',noi:'LOC05',chu:'NP09',tien:50,quan:35,dan:20,suc:60,giu:'hệ trận Ngũ Tổ',no:['FA09'],lai:0,phuc:60},
  FA04:{n:'Thanh Khê Liên Thôn',noi:'LOC01',chu:'NP01',tien:20,quan:15,dan:70,suc:55,giu:'đất, nước, an táng',no:['FA01'],lai:0.1,phuc:10},
  FA05:{n:'Huyết Sát Cốc',noi:'LOC07',chu:'NP13',tien:55,quan:60,dan:30,suc:60,giu:'huyết hệ và quyền tự trị',no:['FA02'],lai:0,phuc:80},
  FA06:{n:'Vạn Thú Môn',noi:'LOC08',chu:'NP15',tien:35,quan:45,dan:35,suc:55,giu:'nơi sống, khế ước và nguồn thú',no:['FA04'],lai:0.1,phuc:50},
  FA07:{n:'Bách Thảo Cốc',noi:'LOC10',chu:'NP19',tien:40,quan:20,dan:50,suc:55,giu:'cứu chữa và đan phương',no:['FA01'],lai:-0.1,phuc:40},
  FA08:{n:'Hàn Thiết Hội',noi:'LOC11',chu:'NP21',tien:45,quan:30,dan:60,suc:55,giu:'lò và quyền thợ',no:['FA02'],lai:-0.1,phuc:25},
  FA09:{n:'Lạn Kha Tự',noi:'LOC12',chu:'NP23',tien:25,quan:10,dan:45,suc:70,giu:'ký ức người chết',no:['FA03'],lai:0.2,phuc:30},
  FA10:{n:'Bắc Phong Quân',noi:'LOC13',chu:'NP25',tien:30,quan:80,dan:40,suc:60,giu:'biên ải và lương quân',no:['FA01'],lai:-0.1,phuc:20},
  // Hoàng quốc (loai:'hq'): thế lực phàm nhân nắm các thành, trấn phàm nhân của một nhóm quận. Mỗi đại khu vực hai nước, kv = đại khu vực.
  //   Không có trụ sở neo (noi:null) và chưa có người giữ vai (chu:null). Tên dưới đây là tên tạm.
  FA11:{n:'Yên quốc',loai:'hq',kv:0,noi:null,chu:null,tien:50,quan:50,dan:70,suc:60,giu:'ruộng, thuế và dân phàm',no:[],lai:0,phuc:30},
  FA12:{n:'Sở quốc',loai:'hq',kv:1,noi:null,chu:null,tien:45,quan:55,dan:70,suc:60,giu:'ruộng, thuế và dân phàm',no:[],lai:0,phuc:30},
  FA13:{n:'Ngô quốc',loai:'hq',kv:1,noi:null,chu:null,tien:55,quan:45,dan:65,suc:60,giu:'ruộng, thuế và dân phàm',no:[],lai:0,phuc:30},
  FA14:{n:'Việt quốc',loai:'hq',kv:2,noi:null,chu:null,tien:50,quan:45,dan:70,suc:60,giu:'ruộng, thuế và dân phàm',no:[],lai:0,phuc:30},
  FA15:{n:'Mân quốc',loai:'hq',kv:2,noi:null,chu:null,tien:55,quan:40,dan:65,suc:58,giu:'ruộng, thuế và dân phàm',no:[],lai:0,phuc:30},
  FA16:{n:'Thục quốc',loai:'hq',kv:3,noi:null,chu:null,tien:45,quan:50,dan:70,suc:60,giu:'ruộng, thuế và dân phàm',no:[],lai:0,phuc:30},
  FA17:{n:'Tần quốc',loai:'hq',kv:3,noi:null,chu:null,tien:40,quan:60,dan:65,suc:62,giu:'ruộng, thuế và dân phàm',no:[],lai:0,phuc:30},
  FA18:{n:'Triệu quốc',loai:'hq',kv:4,noi:null,chu:null,tien:35,quan:65,dan:60,suc:60,giu:'ruộng, thuế và dân phàm',no:[],lai:0,phuc:30},
  FA19:{n:'Hán quốc',loai:'hq',kv:4,noi:null,chu:null,tien:40,quan:55,dan:65,suc:58,giu:'ruộng, thuế và dân phàm',no:[],lai:0,phuc:30}
};
// HQ_KV: hai Hoàng quốc của từng đại khu vực (kv 0..4); Lương triều (FA01) luôn là nước ở nhóm quận có Lương Kinh (LOC02).
const HQ_KV=[['FA01','FA11'],['FA12','FA13'],['FA14','FA15'],['FA16','FA17'],['FA18','FA19']];
// thế lực tu sĩ có căn cứ neo: thành, trấn tu sĩ gần căn cứ nào thì thuộc căn cứ đó (tông môn gần hơn thì thuộc tông môn)
const FA_TU=['FA02','FA03','FA05','FA06','FA07','FA08','FA09'];
// người dạy nghề tu ở từng nơi neo (nối Đ7: nhập học P.2 gọi người đang giữ vai)
const TU_THAY={LOC05:'NP09',LOC07:'NP13',LOC08:'NP15',LOC09:'NP17',LOC10:'NP19',LOC11:'NP21',LOC12:'NP23',LOC13:'NP25',LOC15:'NP29'};
