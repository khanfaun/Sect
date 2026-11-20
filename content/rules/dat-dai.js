// Nguồn chuẩn cho Đ8b: đất đai. Luật: src/game/core2/64-dat-dai.js · chữ: content/text/dat-dai.json (khoá dat.*).
// Mỗi địa điểm có N ô đất; mỗi ô mang 0–1 công trình; mỗi công trình mở đúng một mục trong hộp chi tiết địa điểm
// (mục = một nút của PGROUP, ui/08-cac-canh-hien-de.js; riêng "Sơn môn điện" mở cả nhóm Tông môn vì các việc tông môn là một khối).
// Nút KHÔNG gắn công trình (thăm dò, bế quan, xung kích, dưỡng thương, hành trang, nhà mình, mưu sinh, cơ duyên, pháp môn…) vẫn hiện như cũ.
//
// CONG_TRINH[id]:
//   n = tên · nhom = nhóm PGROUP mà mục đó thuộc · tu = 1 công trình tự nhiên (không xây được), 0 nhân tạo
//   acts = các nút mở ra (thường một) · noi = loại nơi thường có (chỉ để ghi chú, sinh ô dùng DAT.goc / DAT.hoang)
//   xay = null không xây được; {noi:[loại nơi], st: linh thạch Hạ phẩm, h: số giờ, tu: 1 phải là tu sĩ} xây được trên ô trống
//   pha = null không phá được; {h: số giờ phá} · hau = hậu quả khi phá (ghi trong hộp xác nhận)
//   dp = 1 công trình này là động phủ của nơi đó (n.dp: bế quan nhanh hơn, ít bị quấy)
const CONG_TRINH={
  // --- nhân tạo ở thôn trấn / thành ---
  khach_diem:{n:'Khách điếm',nhom:'Nghỉ chân',tu:0,acts:['inn'],noi:['tran','thanh','tutran','tuthanh'],xay:null,pha:{h:6},hau:'Mất chỗ trọ ở nơi này.'},
  tra_lau:{n:'Trà lâu',nhom:'Nghỉ chân',tu:0,acts:['tea'],noi:['tran','thanh','tutran','tuthanh','cho'],xay:null,pha:{h:4},hau:'Mất chỗ nghe ngóng tin tức.'},
  tuu_lau:{n:'Tửu lầu',nhom:'Nghỉ chân',tu:0,acts:['tuu'],noi:['tran','thanh'],xay:null,pha:{h:4},hau:'Mất quán rượu.'},
  bang_thuong:{n:'Bảng treo thưởng',nhom:'Sự vụ',tu:0,acts:['board'],noi:['tran','thanh','tutran','tuthanh'],xay:null,pha:{h:1},hau:'Không còn nhận việc treo thưởng ở đây.'},
  thuong_cac:{n:'Thưởng Các',nhom:'Sự vụ',tu:0,acts:['thuongcac'],noi:['tutran','tuthanh'],xay:null,pha:{h:4},hau:'Mất chỗ đổi Thưởng Lệnh.'},
  tien_trang:{n:'Tiền trang',nhom:'Sự vụ',tu:0,acts:['vay'],noi:['tran','thanh'],xay:null,pha:{h:6},hau:'Không còn ai cho vay ở đây.'},
  tap_hoa:{n:'Tạp hóa',nhom:'Mua bán',tu:0,acts:['taphoa'],noi:['tran','thanh','cho'],xay:null,pha:{h:3},hau:'Mất chỗ mua đồ phàm.'},
  lai_buon:{n:'Bến hàng lái buôn',nhom:'Mua bán',tu:0,acts:['laibuon'],noi:['tran','thanh','cho'],xay:null,pha:{h:3},hau:'Lái buôn không ghé nữa.'},
  phuong_thi:{n:'Phường thị',nhom:'Mua bán',tu:0,acts:['shop'],noi:['tutran','tuthanh'],xay:null,pha:{h:8},hau:'Mất chỗ mua bán đồ tu sĩ.'},
  quy_thi:{n:'Quỷ thị',nhom:'Mua bán',tu:0,acts:['ghost'],noi:['tuthanh','ma'],xay:null,pha:{h:6},hau:'Mất chợ đêm.'},
  am_hoi:{n:'Hầm Ám Hội',nhom:'Mua bán',tu:0,acts:['amhoi'],noi:['tuthanh','ma'],xay:null,pha:{h:6},hau:'U Minh Ám Hội không họp ở đây nữa.'},
  doi_lt:{n:'Ngân phường',nhom:'Mua bán',tu:0,acts:['doilt'],noi:['tutran','tuthanh','cho'],xay:null,pha:{h:6},hau:'Mất chỗ đổi linh thạch.'},
  cam_do:{n:'Hiệu cầm đồ',nhom:'Mua bán',tu:0,acts:['camdo'],noi:['thanh','cho'],xay:null,pha:{h:3},hau:'Mất hiệu cầm đồ.'},
  tram_dich:{n:'Trạm dịch',nhom:'Đi lại',tu:0,acts:['tram'],noi:['tran','thanh','tuthanh'],xay:null,pha:{h:6},hau:'Mất chỗ mua hoặc thuê phương tiện và đi xe chuyến.'},
  loi_dai:{n:'Lôi đài',nhom:'Tu luyện',tu:0,acts:['loidai'],noi:['tuthanh'],xay:null,pha:{h:4},hau:'Không còn đấu lôi đài ở đây.'},
  thao_lu:{n:'Thảo lư ẩn sĩ',nhom:'Tu luyện',tu:0,acts:['thinhgiao'],noi:['ancu'],xay:null,pha:{h:2},hau:'Ẩn sĩ bỏ đi, không còn chỗ thỉnh giáo.'},
  son_mon:{n:'Sơn môn điện',nhom:'Tông môn',tu:0,acts:['join','lib','congmon','nhansu','tongviec','conghien','tinhthat','taphoa','doilt','tinh'],noi:['tong'],xay:null,pha:null,hau:''},
  // --- tự nhiên ở hoang dã: không xây được, phá được ---
  bai_san:{n:'Bãi săn',nhom:'Hoang dã',tu:1,acts:['sanbat'],noi:['rung','nui','hoang','dam','khoang','duoc','linhdia','song','bien','yeusao'],xay:null,pha:{h:12},hau:'Muông thú bỏ đi, không săn bắt được nữa.'},
  ho_ca:{n:'Hồ cá',nhom:'Hoang dã',tu:1,acts:['sanbat'],noi:['song','bien','dam'],xay:null,pha:{h:24},hau:'Hồ bị lấp nên không còn đánh bắt được ở đây.'},
  hang_yeu:{n:'Hang yêu thú',nhom:'Hoang dã',tu:1,acts:['sanyeu'],noi:['nui','dong','rung','yeusao'],xay:null,pha:{h:12},hau:'Lấp hang: yêu thú không còn tụ về để săn.'},
  dam_yeu:{n:'Đầm yêu',nhom:'Hoang dã',tu:1,acts:['sanyeu'],noi:['dam','song','bien','hoang','ma','phe','thien','yeusao','como'],xay:null,pha:{h:24},hau:'Lấp đầm: yêu thú không còn tụ về để săn.'},
  rung_thuoc:{n:'Rừng thuốc',nhom:'Hoang dã',tu:1,acts:['haithuoc'],noi:['rung','duoc','song','bien','yeusao'],xay:null,pha:{h:12},hau:'Đốt rừng thuốc: không hái thuốc được nữa.'},
  bai_thao:{n:'Bãi linh thảo',nhom:'Hoang dã',tu:1,acts:['haithuoc'],noi:['hoang','thien','duoc','bicanh','ditich'],xay:null,pha:{h:8},hau:'Cào bãi thảo: không hái thuốc được nữa.'},
  mo_khoang:{n:'Mỏ khoáng',nhom:'Hoang dã',tu:1,acts:['daokhoang'],noi:['khoang','nui','dong','phe','ma','dongthien','como','ditich'],xay:null,pha:{h:24},hau:'Sập mỏ: không đào khoáng được nữa.'},
  hang_dong:{n:'Hang động',nhom:'Nghỉ chân',tu:1,acts:['tinh'],noi:['dong','nui','dongthien'],xay:null,pha:{h:24},hau:'Sập hang: mất chỗ tĩnh tọa.'},
  linh_tuyen:{n:'Linh tuyền',nhom:'Nghỉ chân',tu:1,acts:['tinh'],noi:['linhdia','thien','bicanh','dongthien'],xay:null,pha:{h:24},hau:'Lấp linh tuyền: mất chỗ tĩnh tọa.'},
  co_thu:{n:'Cổ thụ',nhom:'Nghỉ chân',tu:1,acts:['tinh'],noi:['rung','hoang','yeusao'],xay:null,pha:{h:12},hau:'Đốn cổ thụ: mất chỗ tĩnh tọa.'},
  ho_nuoc:{n:'Hồ nước',nhom:'Nghỉ chân',tu:1,acts:['tinh'],noi:['song','bien'],xay:null,pha:{h:24},hau:'Lấp hồ: mất chỗ tĩnh tọa bên nước.'},
  tran_co:{n:'Trận pháp cổ',nhom:'Nghỉ chân',tu:1,acts:['tinh'],noi:['hoang','phe','nui','dong','linhdia','bicanh','como','ditich'],xay:null,pha:{h:12},hau:'Phá trận cổ: mất chỗ tĩnh tọa, linh khí tản đi.'},
  // --- người chơi xây trên đất hoang không chủ (tu sĩ) ---
  dong_phu:{n:'Động phủ',nhom:'Nghỉ chân',tu:0,acts:['tinh'],noi:[],dp:1,xay:{noi:['rung','nui','song','bien','hoang','phe','dong','dam','khoang','duoc','linhdia','thien','ma','dongthien','ditich'],st:30,h:720,tu:1},pha:{h:12},hau:'Mất động phủ: bế quan ở đây không còn được che chở.'},
  tran_phap:{n:'Trận pháp hộ thân',nhom:'Nghỉ chân',tu:0,acts:['tinh'],noi:[],xay:{noi:['rung','nui','song','bien','hoang','phe','dong','dam','khoang','duoc','linhdia','thien','ma','bicanh','dongthien','como','yeusao','ditich','tran','thanh','tutran','tuthanh','cho','ancu'],st:50,h:240,tu:1},pha:{h:6},hau:'Trận tan, ngươi mất chỗ tĩnh tọa được trận che chở.'},
  // --- người chơi dựng trên đất đã mua ở nơi có dân (câu 80): phàm nhân cũng dựng được, trả bằng bạc (xu) ---
  nha_rieng:{n:'Nhà riêng',nhom:'Nghỉ chân',tu:0,acts:[],noi:[],xay:{noi:['tran','thanh','tutran','tuthanh','cho','ancu'],st:0,bac:25000,h:360,cuaTa:1},pha:{h:6},hau:'Nhà mất, ngươi không còn chỗ ngủ và nghỉ riêng ở đây.'}};

// DAT: cách sinh ô và hậu quả.
//   goc[loại nơi] = công trình luôn có ở loại nơi đó (bảo đảm dịch vụ cốt lõi; bản lưu cũ cũng sinh theo bảng này)
//   trong[loại nơi] = [ít, nhiều] số ô trống thêm (ở thành/trấn là đất của dân, ở hoang dã là đất hoang không chủ)
//   hoang[nút] = các công trình tự nhiên có thể cấp nút đó; chọn theo địa hình quanh nút (ter: chỉ số TER_N, nặng = trọng số) và hạt giống thế giới
//   them = [xác suất, tối đa] thêm công trình tự nhiên (mỗi công trình cấp một nút đã có ở nơi đó) — chỉ thêm cho đẹp, không mở thêm dịch vụ
//   phat: hậu quả khi xây/phá trên ô có chủ. fav = thiện cảm chủ (vai NPC) · fa = điểm quan hệ thế lực (r.faQh, ×2 khi tính thang) ·
//         danh = danh tiếng khu (thôn trấn / thành) · truy = xác suất bị chủ hoặc người của họ truy đuổi (hệ Sửa-K, loại cuop) ·
//         đất của dân: truy nã đi qua hệ truy nã (Sửa-O, content/rules/truy-na.js: nhân chứng theo loại nơi, tội pha_dat)
//   moc = [ít, nhiều] số năm một công trình tự nhiên bị phá tự mọc lại (Sửa-O câu 76; ô đã xây gì lên thì không mọc)
//   hu = số tháng một công trình cốt lõi ở nơi neo bị phá thì chỉ hư tạm (dựng lại sau ngần ấy)
const DAT={
  // Thế giới mới chia hai loại: thành/trấn PHÀM NHÂN (tạp hóa, lái buôn, tiền trang, cầm đồ, trạm dịch, tửu lầu…) và thành/trấn TU SĨ
  // (phường thị, quỷ thị, ngân phường, lôi đài, thưởng các, Ám Hội…). Ai cũng vào được cả hai. gocCu = bảng của thế giới sinh từ bản cũ (chưa chia hai loại).
  goc:{
    tran:['khach_diem','tra_lau','tuu_lau','bang_thuong','tien_trang','tap_hoa','lai_buon','tram_dich'],
    thanh:['khach_diem','tra_lau','tuu_lau','bang_thuong','tien_trang','tap_hoa','lai_buon','cam_do','tram_dich'],
    tutran:['khach_diem','tra_lau','bang_thuong','thuong_cac','phuong_thi','doi_lt'],
    tuthanh:['khach_diem','tra_lau','bang_thuong','thuong_cac','phuong_thi','quy_thi','am_hoi','doi_lt','loi_dai','tram_dich'],
    cho:['tra_lau','tap_hoa','lai_buon','doi_lt','cam_do'],
    tong:['son_mon'],ancu:['thao_lu'],ma:['quy_thi','am_hoi']},
  gocCu:{
    tran:['khach_diem','tra_lau','tuu_lau','bang_thuong','thuong_cac','tien_trang','tap_hoa','lai_buon','tram_dich'],
    thanh:['khach_diem','tra_lau','tuu_lau','bang_thuong','thuong_cac','tien_trang','phuong_thi','quy_thi','am_hoi','lai_buon','doi_lt','cam_do','tram_dich','loi_dai']},
  trong:{tran:[1,2],thanh:[1,3],tutran:[1,2],tuthanh:[1,3],cho:[0,1],tong:[0,0],ancu:[0,1],hoang:[1,2]},
  hoang:{
    sanbat:[['bai_san',{1:2,2:3,3:1,6:2}],['ho_ca',{4:3,5:3,7:2}]],
    sanyeu:[['hang_yeu',{2:2,3:3,6:2}],['dam_yeu',{4:1,5:1,7:3,1:1}]],
    haithuoc:[['rung_thuoc',{2:3,4:1,7:1}],['bai_thao',{1:2,6:2,3:1}]],
    daokhoang:[['mo_khoang',{3:1,6:1,1:1}]],
    tinh:[['hang_dong',{3:3,6:2}],['linh_tuyen',{5:2,4:1}],['co_thu',{2:3,1:1}],['ho_nuoc',{4:2,5:3}],['tran_co',{1:1,3:1,6:1,7:1}]]},
  them:[0.35,1],
  phat:{
    vai:{fav:-15,fa:-3,truy:0.3},
    fa:{fa:-4,truy:0.25},
    dan:{danh:{tran:-12,thanh:-20,tutran:-12,tuthanh:-20}},
    tong:{danh:-15,truy:0.4}},
  moc:[20,40],
  hu:3,
  // mua: mua đất (câu 80, Đ8b đợt sau). Chỉ mua ô TRỐNG ở nơi có dân (thôn trấn, thành, chợ, ẩn cư; tông môn không bán). Hoang dã không chủ thì cứ dựng là thành của ngươi.
  //   gia[loại nơi] = giá gốc (xu; HN B.2: nhà tranh 25 lượng, ruộng một mẫu 40 lượng) × chu[loại chủ] (dân / người giữ vai / thế lực)
  //   lt = số xu đổi một linh thạch khi trả bằng linh thạch (tu sĩ, thiếu bạc) · ban = phần giá nhận lại khi bán · h = giờ làm giấy
  //   favMin: người giữ vai có thiện cảm dưới mức này thì không bán · faMin: bậc quan hệ thế lực (faQhBac 0..6) tối thiểu để thế lực bán (3 = Xa lạ)
  //   toiDa = số ô tối đa của ngươi ở một nơi · naMin: đang bị truy nã từ mức này ở vùng đó thì không mua được
  //   tran: tác dụng trận pháp hộ thân trên đất của ngươi (câu 78): bq = hệ số rủi ro bế quan bị quấy, tm = hệ số tâm ma giảm khi tĩnh tọa, ngu = tính là có chỗ ngủ
  //   ct = giá công trình (xu) khi mua ô ĐÃ có công trình của dân / người giữ vai / thế lực: giá = (giá đất + ct) × chu; '_' = mặc định.
  //        Mua xong công trình giữ nguyên (vẫn mở dịch vụ); bán lại ô mua kèm công trình được ban × (giá đất + ct).
  mua:{gia:{tran:30000,thanh:80000,tutran:36000,tuthanh:100000,cho:20000,ancu:10000},chu:{dan:1,vai:1.3,fa:1.6},lt:200,ban:0.5,h:4,favMin:-10,faMin:3,toiDa:2,naMin:2,
    ct:{_:20000,khach_diem:40000,tra_lau:25000,tuu_lau:30000,bang_thuong:10000,thuong_cac:40000,tien_trang:60000,tap_hoa:15000,lai_buon:15000,
      phuong_thi:80000,quy_thi:60000,am_hoi:80000,doi_lt:60000,cam_do:30000,tram_dich:40000,loi_dai:50000,thao_lu:5000,nha_rieng:25000,tran_phap:20000},
    tran:{bq:0.5,tm:2,ngu:1}},
  // thue: thuế đất trên ô của ngươi ở thôn trấn / thành (chợ, ẩn cư không thu). Mỗi ky tháng nộp ty[loại nơi] × giá đất gốc (trấn 900 xu, thành 4.000 xu một năm).
  //   Trả bạc, tu sĩ thiếu bạc trả linh thạch (như mua). Không trả được thì ghi nợ trên ô, danh tiếng khu thêm danh mỗi kỳ; có tiền thì tự trả nợ (xét mỗi ngày).
  //   Nợ quá noKy kỳ thì quan phủ ghi thành nợ thường (r.bac âm, hệ nợ Sửa-B: hạn, phạt…); không mất đất. Đang nợ thuế ở nơi nào thì không mua thêm đất ở đó.
  //   Chỉ thu trên đất mua trong kiếp này (ô ghi kiếp lúc mua; bản lưu cũ ghi kiếp hiện tại, kỳ đầu tính từ lúc xét).
  thue:{ky:12,ty:{tran:0.03,thanh:0.05,tutran:0.03,tuthanh:0.05},danh:-3,noKy:3}};
