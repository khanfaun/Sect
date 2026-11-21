// Nguồn chuẩn: NGHE, NG_MAX, NG_EV_P. Luật xử lý ở src/game/core2/42-nghe.js.
// Đại đạo ba ngàn — nghề phàm (HN B §7.1–§7.2, A.8; C §6 PM01–PM18). Thu nhập tính bằng đồng, đã chia ba theo A.7.
// ranks: 6 bậc danh vị; xp: ngưỡng kinh nghiệm lên bậc; thu: hệ số tiền công theo bậc; og: xuất thân vào nghề sẵn (cửa vào thứ nhất; cửa thứ hai là tự làm việc của nghề)
// dk: điều kiện vào nghề {vo: bậc võ tối thiểu}; acts: việc lặp — noi: loại nút; mua: mùa; h: giờ; cong:[min,max] đồng ở bậc 0; xp; min: bậc nghề tối thiểu;
//   stat:{ngo:..} chỉ số tối thiểu; dem: việc đêm (chỉ để đọc); an: có cơm; von:[a,b] vốn bỏ ra (đồng) và lai:[a,b] lãi trên vốn; ruiRo:{p,hau:{wound,hpLoss,bacLoss}}
// up: kỳ ngộ thăng bậc (sinh tự động: ng_<mã>_<bậc mới>, chữ ở content/text/nghe.json)
const NG_MAX=3;      // tối đa ba đường cùng lúc; đường thứ tư làm đường lâu không làm nhất "phai"
const NG_EV_P=0.12;  // sau mỗi việc của nghề: khả năng gặp một sự kiện của nghề
const NGHE={
  nong:{n:'Nông dân',ranks:['Làm thuê','Tá điền','Tiểu nông','Trung nông','Phú nông','Địa chủ'],xp:[0,60,200,600,1500,4000],thu:[1,1.2,1.5,2,3,4.5],og:['nong'],
    acts:[
      {id:'gieo',l:'Gieo mạ',noi:['tran'],mua:['xuan'],h:10,cong:[24,30],xp:6,an:1},
      {id:'cham',l:'Chăm ruộng, tát nước',noi:['tran'],mua:['ha'],h:8,cong:[18,24],xp:5},
      {id:'gat',l:'Gặt lúa',noi:['tran'],mua:['thu'],h:10,cong:[30,40],xp:8,an:1},
      {id:'dan',l:'Đan lát mùa nông nhàn',noi:['tran'],mua:['dong'],h:6,cong:[10,14],xp:4},
      {id:'ban_thoc',l:'Đem thóc ra chợ bán',noi:['cho','thanh'],mua:['thu','dong'],h:4,cong:[40,70],xp:3,min:2}]},
  ngu:{n:'Ngư dân',ranks:['Phụ chài','Ngư phủ','Chủ thuyền','Chủ ghe lớn','Chủ vạn chài','Hải thương'],xp:[0,60,200,600,1500,4000],thu:[1,1.25,1.6,2.1,3,4.5],og:['chai'],
    acts:[
      {id:'cau',l:'Ngồi câu cá',noi:['song','bien'],h:6,cong:[8,20],xp:4},
      {id:'va_luoi',l:'Vá lưới thuê',noi:['song','bien','tran'],h:4,cong:[7,10],xp:3},
      {id:'tha_luoi',l:'Thả lưới',noi:['song','bien'],mua:['xuan','ha','thu'],h:8,cong:[15,40],xp:7,min:1,ruiRo:{p:0.02,hau:{hpLoss:10}}},
      {id:'ban_ca',l:'Đem cá ra chợ',noi:['cho'],h:3,cong:[15,30],xp:2},
      {id:'ra_khoi',l:'Ra khơi ba ngày',noi:['bien'],mua:['xuan','ha','thu'],h:72,cong:[250,700],xp:25,min:2,ruiRo:{p:0.08,hau:{wound:'gay',hpLoss:30}}}]},
  thuong:{n:'Thương nhân',ranks:['Gánh hàng rong','Tiểu thương','Chủ cửa hiệu','Buôn đường dài','Chủ thương hội','Phú giáp một châu'],xp:[0,60,200,600,1500,4000],thu:[1,1.3,1.8,2.5,3.5,5],og:['buon'],
    acts:[
      {id:'ganh',l:'Gánh hàng rong',noi:['tran','cho'],h:8,cong:[12,30],xp:5,stat:{ngo:6}},
      {id:'mua_ban',l:'Mua rẻ bán đắt ở chợ',noi:['cho','thanh'],h:8,von:[300,600],lai:[-0.1,0.35],xp:7,min:1},
      {id:'trong_hieu',l:'Trông cửa hiệu',noi:['thanh'],h:8,cong:[40,90],xp:6,min:2},
      {id:'buon_xa',l:'Theo thương đội buôn xa (mười ngày)',noi:['thanh'],h:240,von:[2000,5000],lai:[0.2,0.8],xp:40,min:3,ruiRo:{p:0.1,hau:{mat:1,hpLoss:20}}}]},
  vo_gia:{n:'Chiến binh giang hồ',ranks:['Vô danh','Có chút tiếng','Hảo hán một vùng','Danh hiệp','Đại hiệp','Võ lâm minh chủ'],xp:[0,60,200,600,1500,4000],thu:[1,1.3,1.7,2.3,3.2,4.5],og:['ren'],dk:{vo:1},
    acts:[
      {id:'bao_ke',l:'Giữ cửa, bảo kê quán',noi:['thanh','tran','cho'],dem:1,h:8,cong:[18,30],xp:5,ruiRo:{p:0.05,hau:{wound:'ngoai',hpLoss:10}}},
      {id:'ho_tong',l:'Nhận hộ tống người đi đường (một ngày)',noi:['thanh','tran'],h:24,cong:[50,90],xp:10,min:1,ruiRo:{p:0.08,hau:{wound:'ngoai',hpLoss:20}}},
      {id:'hanh_hiep',l:'Đi tuần quanh vùng, giúp người bị ức hiếp',noi:['tran','rung','nui'],h:8,cong:[0,10],xp:8},
      {id:'day_vo',l:'Dạy võ cho trai làng',noi:['tran','thanh'],h:6,cong:[30,60],xp:6,min:2}]},
  y:{n:'Y sư phàm',ranks:['Học trò bốc thuốc','Lang băm','Lang trung','Danh y một vùng','Ngự y','Thần y'],xp:[0,60,200,600,1500,4000],thu:[1,1.3,1.8,2.5,3.5,5],og:['duoc'],
    acts:[
      {id:'boc_thuoc',l:'Bốc thuốc ở hiệu',noi:['tran','thanh','cho'],h:6,cong:[10,16],xp:5},
      {id:'hai_thuoc',l:'Vào rừng hái thuốc',noi:['rung','nui','duoc'],h:8,cong:[10,25],xp:5,ruiRo:{p:0.03,hau:{wound:'doc'}}},
      {id:'kham',l:'Khám bệnh, bắt mạch',noi:['tran','thanh'],h:6,cong:[18,40],xp:7,min:1,stat:{ngo:8}},
      {id:'bo_xuong',l:'Bó xương, khâu vết thương',noi:['tran','thanh','cho'],h:4,cong:[25,50],xp:6,min:2},
      {id:'chua_dich',l:'Vào làng có dịch chữa bệnh (ba ngày)',noi:['tran'],h:72,cong:[120,300],xp:30,min:3,ruiRo:{p:0.1,hau:{wound:'doc',hpLoss:25}}}]},
  // ---- Đ7.3: mười sáu nghề phàm còn lại (HN A.8; C §6 PM02, PM04–PM06, PM08, PM10, PM11, PM13–PM18; B §7.2 Thợ săn, Tiêu sư, Khất cái) ----
  tieu:{n:'Tiều phu',ranks:['Đốn củi thuê','Tiều phu','Thợ đốn gỗ','Đầu nậu gỗ','Chủ xưởng gỗ','Chủ rừng'],xp:[0,60,200,600,1500,4000],thu:[1,1.2,1.5,2,3,4.5],og:['xt_con_nha_ham_than'],
    acts:[
      {id:'don_cui',l:'Vào rừng đốn củi',noi:['rung'],h:8,cong:[12,18],xp:5},
      {id:'ban_cui',l:'Gánh củi ra chợ bán',noi:['tran','thanh'],h:3,cong:[8,16],xp:2},
      {id:'don_go',l:'Đốn gỗ lớn cho xưởng',noi:['rung'],h:10,cong:[28,42],xp:8,min:1,ruiRo:{p:0.05,hau:{wound:'ngoai',hpLoss:15}}},
      {id:'di_sau',l:'Đi sâu vào rừng tìm gỗ quý (một ngày)',noi:['rung','nui'],h:24,cong:[40,120],xp:15,min:2,ruiRo:{p:0.1,hau:{wound:'gay',hpLoss:25}}}]},
  mo:{n:'Thợ mỏ',ranks:['Phu gùi quặng','Thợ đào','Thợ cả','Cai mỏ','Chủ lò quặng','Chủ mỏ'],xp:[0,60,200,600,1500,4000],thu:[1,1.25,1.6,2.1,3,4.5],og:['xt_nguoi_lam_thue_o_mo'],
    acts:[
      {id:'gui_quang',l:'Gùi quặng ra cửa hầm',noi:['khoang','nui'],h:8,cong:[15,21],xp:5,an:1,ruiRo:{p:0.04,hau:{wound:'ngoai',hpLoss:10}}},
      {id:'dao_ham',l:'Xuống hầm đào quặng',noi:['khoang'],h:10,cong:[26,38],xp:8,min:1,an:1,ruiRo:{p:0.08,hau:{wound:'gay',hpLoss:25}}},
      {id:'do_mach',l:'Dò mạch quặng mới',noi:['khoang','nui'],h:6,cong:[30,60],xp:6,min:2,stat:{ngo:8}},
      {id:'cai_tho',l:'Coi một ca thợ dưới hầm',noi:['khoang'],h:8,cong:[60,100],xp:7,min:3}]},
  ren:{n:'Thợ rèn',ranks:['Kéo bễ','Thợ phụ','Thợ cả','Chủ lò','Danh tượng','Đại tượng'],xp:[0,60,200,600,1500,4000],thu:[1,1.3,1.7,2.3,3.2,4.5],og:['ren'],
    acts:[
      {id:'keo_be',l:'Kéo bễ ở lò rèn',noi:['tran','thanh'],h:8,cong:[12,18],xp:5},
      {id:'nong_cu',l:'Rèn dao cuốc, lưỡi cày',noi:['tran','thanh'],h:8,cong:[24,38],xp:7,min:1},
      {id:'binh_khi',l:'Rèn binh khí theo đơn',noi:['thanh'],h:10,cong:[60,110],xp:9,min:2},
      {id:'don_lon',l:'Nhận đơn lớn của tiêu cục (một ngày)',noi:['thanh'],h:24,cong:[150,300],xp:20,min:3}]},
  tho:{n:'Thợ thủ công',ranks:['Học việc','Thợ phụ','Thợ cả','Chủ xưởng','Danh tượng','Đại tượng'],xp:[0,60,200,600,1500,4000],thu:[1,1.25,1.6,2.1,3,4.5],og:['xt_con_nguoi_det_chieu','xt_con_nha_nung_men','xt_nguoi_hoc_khac_khuon','xt_nguoi_boi_giay_do'],
    acts:[
      {id:'lam_hang',l:'Làm hàng ở xưởng (mộc, gốm, dệt)',noi:['tran','thanh'],h:8,cong:[14,22],xp:6},
      {id:'ban_hang',l:'Bày hàng ra chợ',noi:['tran','thanh'],h:4,cong:[10,30],xp:3},
      {id:'nhan_don',l:'Nhận đơn hàng của phủ nhà giàu',noi:['thanh'],h:16,cong:[60,120],xp:12,min:2},
      {id:'day_tro',l:'Dạy nghề cho học trò',noi:['tran','thanh'],h:6,cong:[30,50],xp:6,min:3}]},
  chep:{n:'Người chép sách',ranks:['Học trò','Đồng sinh','Tú tài','Cử nhân','Tiến sĩ','Đại nho'],xp:[0,60,200,600,1500,4000],thu:[1,1.3,1.8,2.5,3.5,5],og:['thusinh','xt_ke_viet_thu_ho','xt_ke_bo_truong_thi','xt_nguoi_chep_so_thoc'],
    acts:[
      {id:'chep_thue',l:'Chép sách thuê',noi:['tran','thanh'],h:6,cong:[12,20],xp:5,stat:{ngo:6}},
      {id:'viet_thu',l:'Viết thư hộ ở đầu chợ',noi:['tran','thanh'],h:3,cong:[6,12],xp:3},
      {id:'day_hoc',l:'Dạy chữ cho trẻ trong làng',noi:['tran'],h:8,cong:[20,34],xp:6,min:1},
      {id:'doi_cau',l:'Đối câu, bình văn ở trà lâu',noi:['thanh'],h:4,cong:[0,40],xp:5,min:2},
      {id:'soan_sach',l:'Soạn sách cho thư phòng nhà quan',noi:['thanh'],h:24,cong:[120,220],xp:18,min:3}]},
  tram:{n:'Phu trạm',ranks:['Giữ ngựa','Phu trạm','Lính trạm','Trạm trưởng','Đốc trạm','Quản đường thư'],xp:[0,60,200,600,1500,4000],thu:[1,1.2,1.5,2,2.8,4],og:['xt_tre_giu_ngua_tram','xt_con_nha_giu_kho_duong'],
    acts:[
      {id:'giu_ngua',l:'Cho ngựa trạm ăn, chải lông',noi:['tran'],h:8,cong:[12,18],xp:5,an:1},
      {id:'dua_thu',l:'Đưa thư sang trạm kế (một ngày)',noi:['tran','thanh'],h:24,cong:[48,78],xp:10,ruiRo:{p:0.05,hau:{wound:'ngoai',hpLoss:15}}},
      {id:'hoa_toc',l:'Chạy công văn hỏa tốc (hai ngày)',noi:['thanh'],h:48,cong:[120,200],xp:18,min:2,ruiRo:{p:0.08,hau:{wound:'gay',hpLoss:20}}},
      {id:'quan_tram',l:'Coi sổ sách một trạm',noi:['tran','thanh'],h:8,cong:[50,80],xp:7,min:3}]},
  binh:{n:'Binh lính',ranks:['Lính trơn','Ngũ trưởng','Thập trưởng','Bách hộ','Thiên hộ','Tướng quân','Đại tướng quân'],xp:[0,60,200,600,1500,4000,9000],thu:[1,1.2,1.5,2,3,4.5,6],og:['linh','xt_nguoi_bi_tra_ve_tu_bien_ai'],
    acts:[
      {id:'luyen_binh',l:'Luyện binh ở doanh trại',noi:['thanh'],h:8,cong:[14,20],xp:5,an:1},
      {id:'tuan_thu',l:'Tuần thủ cổng thành, đường làng',noi:['thanh','tran'],dem:1,h:8,cong:[18,25],xp:6,ruiRo:{p:0.03,hau:{wound:'ngoai',hpLoss:10}}},
      {id:'truy_cuop',l:'Theo đội đi truy cướp (một ngày)',noi:['rung','nui'],h:24,cong:[60,100],xp:12,min:1,ruiRo:{p:0.1,hau:{wound:'ngoai',hpLoss:20}}},
      {id:'xuat_chinh',l:'Xuất chinh biên ải (mười ngày)',noi:['thanh'],h:240,cong:[600,1200],xp:45,min:3,an:1,ruiRo:{p:0.2,hau:{wound:'gay',hpLoss:30}}}]},
  sat:{n:'Sát thủ phàm',ranks:['Tay mới','Đồng bài','Ngân bài','Kim bài','Huyết bài','Lâu chủ'],xp:[0,60,200,600,1500,4000],thu:[1,1.4,2,2.8,4,6],og:[],dk:{vo:1},
    acts:[
      {id:'theo_doi',l:'Theo dõi một người theo lời thuê',noi:['thanh','tran'],h:8,cong:[10,20],xp:5,ruiRo:{p:0.05,hau:{wound:'ngoai',hpLoss:10}}},
      {id:'dieu_tra',l:'Điều tra mục tiêu, xem người ấy thật sự ra sao',noi:['thanh'],h:24,cong:[30,60],xp:10,min:1},
      {id:'phi_tang',l:'Xoá dấu vết cho kẻ thuê',noi:['thanh'],h:6,cong:[30,60],xp:6,min:2,ruiRo:{p:0.08,hau:{bacLoss:20}}}]},
  trom:{n:'Đạo chích',ranks:['Móc túi','Trộm vặt','Phi tặc','Đạo vương một thành','Đại đạo','Bang chủ hắc đạo'],xp:[0,60,200,600,1500,4000],thu:[1,1.4,2,2.8,4,6],og:[],
    acts:[
      {id:'moc_tui',l:'Móc túi giữa chợ đông',noi:['thanh','tran'],h:4,cong:[5,25],xp:4,deed:'trom_ngheo',ruiRo:{p:0.1,hau:{wound:'ngoai',hpLoss:10}}},
      {id:'trom_dem',l:'Đêm xuống, lẻn vào nhà phú hộ',noi:['thanh'],dem:1,h:8,cong:[30,120],xp:8,min:1,deed:'trom_ac_ba',ruiRo:{p:0.15,hau:{wound:'ngoai',hpLoss:15}}},
      {id:'tieu_thu',l:'Tiêu thụ đồ gian cho người quen',noi:['thanh'],h:4,cong:[20,50],xp:4,min:2}]},
  hat:{n:'Nghệ nhân gánh hát',ranks:['Học trò','Đào kép','Kép chính','Bầu gánh','Danh kỹ một châu','Đại gia lừng danh'],xp:[0,60,200,600,1500,4000],thu:[1,1.3,1.8,2.5,3.5,5],og:['hat'],
    acts:[
      {id:'tap_tuong',l:'Tập tuồng với gánh',noi:['tran','thanh'],h:6,cong:[0,6],xp:4},
      {id:'dien_cho',l:'Diễn ở sân chợ',noi:['tran','thanh'],h:6,cong:[15,35],xp:6},
      {id:'luu_dien',l:'Theo gánh đi lưu diễn (ba ngày)',noi:['thanh'],h:72,cong:[150,300],xp:22,min:2,an:1},
      {id:'dien_phu',l:'Diễn cho phủ quan',noi:['thanh'],h:8,cong:[100,200],xp:10,min:3}]},
  quan:{n:'Quan viên',ranks:['Thư lại','Huyện thừa','Huyện lệnh','Tri phủ','Thứ sử','Thượng thư','Tể tướng'],xp:[0,60,200,600,1500,4000,9000],thu:[1,1.4,2,3,4.5,6.5,9],og:['thegia','xt_hau_due_nguoi_coi_an'],
    acts:[
      {id:'chep_an',l:'Chép án, giữ sổ ở nha môn',noi:['thanh'],h:8,cong:[20,30],xp:5,stat:{ngo:7}},
      {id:'thu_thue',l:'Về làng thu thuế',noi:['tran'],h:8,cong:[30,50],xp:6,min:1},
      {id:'xu_an',l:'Ngồi công đường xử án',noi:['thanh'],h:8,cong:[60,100],xp:9,min:2},
      {id:'cuu_te',l:'Mở kho cứu tế dân đói (một ngày)',noi:['tran'],h:24,cong:[0,20],xp:14,min:3,deed:'bo_thi'},
      {id:'dang_so',l:'Soạn sớ dâng lên triều',noi:['thanh'],h:8,cong:[150,250],xp:10,min:4}]},
  do:{n:'Người chèo đò',ranks:['Phụ đò','Lái đò','Chủ đò','Chủ bến','Đầu bến','Thủy bá'],xp:[0,60,200,600,1500,4000],thu:[1,1.2,1.5,2,3,4.5],og:['xt_ke_cheo_do_ban_dem','xt_con_nha_va_luoi'],
    acts:[
      {id:'cheo_do',l:'Chèo đò chở khách qua sông',noi:['song','tran'],h:6,cong:[10,18],xp:5},
      {id:'sua_thuyen',l:'Trét lại mạn thuyền',noi:['song','tran'],h:6,cong:[10,16],xp:4,min:1},
      {id:'cuu_nuoc',l:'Canh bến mùa nước lớn, vớt người',noi:['song'],mua:['ha','thu'],h:8,cong:[0,10],xp:8,ruiRo:{p:0.05,hau:{hpLoss:15}}},
      {id:'cho_hang',l:'Chở hàng xuôi dòng (một ngày)',noi:['song'],h:24,cong:[50,90],xp:12,min:2,ruiRo:{p:0.06,hau:{mat:1,hpLoss:15}}}]},
  chuong:{n:'Chưởng môn võ phái',ranks:['Võ quán','Tiểu phái','Môn phái một huyện','Danh môn một châu','Đại phái giang hồ','Thái Sơn Bắc Đẩu'],xp:[0,60,200,600,1500,4000],thu:[1,1.4,2,2.8,4,6],og:[],dk:{vo:2},
    acts:[
      {id:'thu_do',l:'Mở cửa võ quán nhận đồ đệ',noi:['tran','thanh'],h:8,cong:[0,10],xp:6},
      {id:'day_vo',l:'Dạy võ cho đồ đệ',noi:['tran','thanh'],h:8,cong:[30,60],xp:7},
      {id:'bao_ke',l:'Nhận bảo kê một con phố (một ngày)',noi:['thanh'],h:24,cong:[80,150],xp:12,min:1,ruiRo:{p:0.06,hau:{wound:'ngoai',hpLoss:15}}},
      {id:'mo_chi',l:'Mở chi nhánh ở huyện bên (ba ngày)',noi:['thanh'],h:72,cong:[200,400],xp:25,min:3}]},
  san:{n:'Thợ săn',ranks:['Đặt bẫy','Thợ săn','Thợ săn giỏi','Đầu phường săn','Săn yêu nhân','Thần tiễn'],xp:[0,60,200,600,1500,4000],thu:[1,1.25,1.6,2.1,3,4.5],og:['xt_ke_lon_len_ben_vach_da','dote'],
    acts:[
      {id:'dat_bay',l:'Đặt bẫy thú nhỏ',noi:['rung','nui'],h:6,cong:[8,20],xp:5},
      {id:'lot_da',l:'Lột da, xẻ thịt đem bán',noi:['tran','rung'],h:4,cong:[10,20],xp:3},
      {id:'di_san',l:'Đi săn thú lớn',noi:['rung','nui'],h:10,cong:[20,50],xp:8,min:1,ruiRo:{p:0.06,hau:{wound:'ngoai',hpLoss:15}}},
      {id:'dan_duong',l:'Dẫn đường rừng cho khách (một ngày)',noi:['rung','nui'],h:24,cong:[60,100],xp:12,min:2},
      {id:'san_yeu',l:'Săn yêu thú cấp thấp (hai ngày)',noi:['rung','nui'],h:48,cong:[200,500],xp:25,min:4,ruiRo:{p:0.15,hau:{wound:'gay',hpLoss:30}}}]},
  tieu_su:{n:'Tiêu sư',ranks:['Tiêu đồng','Tiêu sư','Tiêu đầu','Phó tổng tiêu đầu','Tổng tiêu đầu','Chủ tiêu cục'],xp:[0,60,200,600,1500,4000],thu:[1,1.3,1.7,2.3,3.2,4.5],og:[],dk:{vo:1},
    acts:[
      {id:'tham_duong',l:'Thám đường trước cho đoàn tiêu',noi:['rung','nui'],h:12,cong:[30,50],xp:6},
      {id:'ap_tieu',l:'Áp tiêu qua núi (ba ngày)',noi:['thanh','tran'],h:72,cong:[150,250],xp:20,an:1,ruiRo:{p:0.1,hau:{wound:'ngoai',hpLoss:20}}},
      {id:'ket_giao',l:'Lên sơn trại kết giao, nộp lễ qua đường',noi:['nui','rung'],h:24,cong:[0,30],xp:10,min:2},
      {id:'tong_tieu',l:'Ngồi ghế tổng tiêu, chia đoàn',noi:['thanh'],h:8,cong:[100,180],xp:8,min:4}]},
  khat_cai:{n:'Khất cái',ranks:['Ăn mày','Có địa bàn','Đầu đàn','Trưởng lão Cái bang một thành','Đà chủ','Bang chủ Cái bang'],xp:[0,60,200,600,1500,4000],thu:[1,1.3,1.8,2.5,3.5,5],og:['khat','mieu'],
    acts:[
      {id:'xin_an',l:'Ngồi đầu chợ, cửa chùa xin ăn',noi:['tran','thanh'],h:6,cong:[2,10],xp:4},
      {id:'nghe_ngong',l:'Lân la nghe ngóng chuyện trong thành',noi:['thanh','tran'],h:6,cong:[5,15],xp:5},
      {id:'dua_tin',l:'Đưa tin thuê',noi:['tran','thanh'],h:12,cong:[15,30],xp:6,min:1},
      {id:'giu_dia_ban',l:'Giữ địa bàn, chia phần cho anh em',noi:['thanh'],h:8,cong:[20,40],xp:7,min:2}]},
};
