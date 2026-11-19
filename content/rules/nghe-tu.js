// Nguồn chuẩn: TU_NGHE, TU_TANG, TU_CFG, TU_PM_CAM, TU_PM_LOI. Luật xử lý ở src/game/core2/51-nghe-tu.js. Chữ: content/text/nghe-tu.json
// Đ7: 16 nghề tu lõi (HN C §10 P.1–P.4; A.8; B §7.5 luật ghép). Công pháp ở content/catalog/arts.json (mục có "tu"), chiêu sk01a…sk16c ở content/items/sk-raw.js.
// n: tên nghề; cp: mã công pháp; pm: pháp môn (dùng cho luật ghép B §7.5); res: tài nguyên riêng trong trận; loc: nơi thầy dạy (neo LOC, chưa có thì chọn theo loại nút t);
// phi: phí nhập học (linh thạch Hạ phẩm); hd: hợp đồng khởi nghiệp {l, ngay, von: vốn linh thạch, cong: tổng thù lao, noi: loại nút, hp: % khí huyết tự hiến}
const TU_NGHE={
  TU01:{n:'Kiếm tu',cp:'cp_tu01',pm:'kiem',res:'Kiếm ý',loc:'LOC13',t:['thanh','nui'],phi:20,hd:{l:'Hộ tống một đoàn qua đường rừng',ngay:3,von:2,cong:5,noi:['tran','thanh']}},
  TU02:{n:'Thể tu',cp:'cp_tu02',pm:'the',res:'Cương khí',loc:'LOC13',t:['thanh','nui'],phi:15,hd:{l:'Gia cố hầm, cứu người mắc kẹt',ngay:4,von:3,cong:6,noi:['khoang','tran']}},
  TU03:{n:'Huyết tu',cp:'cp_tu03',pm:'huyet',res:'Huyết khí',loc:'LOC07',t:['ma','phe'],phi:25,hd:{l:'Trị huyết bệnh theo thỏa thuận',ngay:3,von:4,cong:7,noi:['tran','thanh'],hp:5}},
  TU04:{n:'Hồn tu',cp:'cp_tu04',pm:'hon',res:'Hồn lực',loc:'LOC12',t:['tong','nui'],phi:20,hd:{l:'Tìm tên, giải oan cho một hồn',ngay:7,von:3,cong:8,noi:['phe','ma','tran']}},
  TU05:{n:'Thần thức tu',cp:'cp_tu05',pm:'than',res:'Niệm lực',loc:'LOC15',t:['linhdia','nui'],phi:25,hd:{l:'Xác minh ký ức, dò lời nguyền',ngay:5,von:4,cong:8,noi:['thanh','tran']}},
  TU06:{n:'Triệu hoán sư',cp:'cp_tu06',pm:'trieu',res:'Khế lực',loc:'LOC08',t:['tong','rung'],phi:25,hd:{l:'Triệu linh giữ cửa mùa lũ',ngay:2,von:5,cong:9,noi:['tran','dam']}},
  TU07:{n:'Ngự thú sư',cp:'cp_tu07',pm:'thu',res:'Đồng tâm',loc:'LOC08',t:['tong','rung'],phi:15,hd:{l:'Nuôi một con thú hồi phục rồi bàn giao',ngay:30,von:6,cong:12,noi:['rung','tran']}},
  TU08:{n:'Trận pháp sư',cp:'cp_tu08',pm:'tran',res:'Trận thế',loc:'LOC05',t:['tong','thanh'],phi:30,hd:{l:'Sửa trận bảo hộ một công trình',ngay:10,von:10,cong:18,noi:['thanh','tong']}},
  TU09:{n:'Đan sư',cp:'cp_tu09',pm:'dan',res:'Hỏa hậu',loc:'LOC10',t:['duoc','rung'],phi:30,hd:{l:'Chế một mẻ đan theo đơn',ngay:5,von:8,cong:14,noi:['thanh','cho','tong']}},
  TU10:{n:'Dược sư tu luyện',cp:'cp_tu10',pm:'dan',res:'Sinh cơ',loc:'LOC10',t:['duoc','rung'],phi:15,hd:{l:'Trồng một khoảnh dược trị dịch',ngay:90,von:6,cong:12,noi:['duoc','tran']}},
  TU11:{n:'Luyện khí sư',cp:'cp_tu11',pm:'khi',res:'Khí văn',loc:'LOC11',t:['khoang','nui'],phi:30,hd:{l:'Rèn một pháp khí đã có thiết kế',ngay:15,von:15,cong:24,noi:['thanh','khoang']}},
  TU12:{n:'Phù sư',cp:'cp_tu12',pm:'phu',res:'Phù lực',loc:'LOC11',t:['khoang','nui'],phi:20,hd:{l:'Viết sáu lá phù theo lô',ngay:3,von:4,cong:8,noi:['thanh','cho']}},
  TU13:{n:'Khôi lỗi sư',cp:'cp_tu13',pm:'khoi',res:'Cơ lực',loc:'LOC05',t:['tong','thanh'],phi:25,hd:{l:'Lắp một khôi vận mỏ',ngay:20,von:18,cong:28,noi:['khoang','thanh']}},
  TU14:{n:'Độc tu',cp:'cp_tu14',pm:'dan',res:'Độc tính',loc:'LOC10',t:['duoc','rung'],phi:20,hd:{l:'Giám định độc, chế giải dược',ngay:7,von:5,cong:10,noi:['tran','thanh']}},
  TU15:{n:'Âm luật tu',cp:'cp_tu15',pm:'am',res:'Âm thế',loc:'LOC09',t:['dam','tran'],phi:20,hd:{l:'Giữ tinh thần một đoàn di tản',ngay:4,von:2,cong:7,noi:['tran','thanh']}},
  TU16:{n:'Ảnh sát tu',cp:'cp_tu16',pm:'an',res:'Sát cơ',loc:'LOC07',t:['ma','phe'],phi:25,hd:{l:'Lấy chứng cứ trong khu bị canh',ngay:6,von:4,cong:12,noi:['thanh','cho']}},
};
// bốn tầng công pháp (P.1): ngày nghiên cứu, cảnh giới (0 Luyện Khí, 1 Trúc Cơ, 2 Kết Đan), tầng Luyện Khí tối thiểu, tiến bộ nghề tối thiểu; lv: số dòng công pháp mở
const TU_TANG=[{ngay:30,realm:0,lk:1,xp:0,lv:2},{ngay:90,realm:0,lk:6,xp:100,lv:4},{ngay:180,realm:1,lk:0,xp:300,lv:6},{ngay:360,realm:2,lk:0,xp:700,lv:7}];
// hd: kinh nghiệm một hợp đồng; xpMax: trần tiến bộ; cho: ngày một hợp đồng chỉ cho kinh nghiệm một lần; phu: hệ số chuyên môn phụ; doiPhu: ngày đổi chuyên môn phụ;
// luu: học qua bản lưu (thời gian ×2, phí ×0,5); rui: khả năng hợp đồng hỏng; resMax: trần tài nguyên riêng; resX: uy lực khi dồn đủ tài nguyên; loi: hệ số ghép có lợi
const TU_CFG={hd:10,xpMax:1000,cho:30,phu:0.5,doiPhu:30,luu:2,luuPhi:0.5,rui:0.1,resMax:5,resX:1.25,loi:1.15,bac:[0,100,300,700]};
// B §7.5: không ghép được (pháp môn mở rộng Phật, Nho, Lôi, Thi, Thôn phệ, Cổ… làm ở Đ11 nhưng luật đã có sẵn)
const TU_PM_CAM=[['phat','huyet'],['phat','hon'],['phat','thon'],['phat','thi'],['nho','huyet'],['nho','hon'],['nho','thon'],['nho','thi'],['nho','co'],['loi','thi'],['loi','hon']];
// ghép có lợi: +15% hiệu quả chiêu của cả hai
const TU_PM_LOI=[['kiem','than'],['tran','phu'],['thu','trieu'],['co','dan'],['huyet','thon'],['am','huyen'],['phat','loi'],['nho','than']];
