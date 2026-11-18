// Nguồn chuẩn: CAI_CAN, CC_VT, CC_CFG. Luật xử lý ở src/game/core2/49-cai-can.js.
// Cải tạo linh căn (HN A.3; Phần C §5.3 CC01–CC08 và vật tư CC-VT01–23; mười đường bổ sung của B viết lại theo khuôn C).
// Giá: phàm dùng xu (giá đồng của HN chia ba như thu nhập nghề ở content/rules/nghe.js); đường của tu sĩ dùng linh thạch Hạ phẩm (st).
// noi: {loc: mã neo LOC, t: loại nút ưu tiên (theo thứ tự), re: lọc theo tên nút (nếu có)} — nút được chốt một lần cho cả thế giới.
// mode: 'vo' người vô căn (đã trắc) · 'nang' nâng phẩm người đã có căn · 'tuc' túc căn kiếp trước.
// hoi: số năm nguồn hồi lại sau khi bị lấy (0 = độc nhất, không hồi; null = nguồn theo người, không giữ ở sổ thế giới).
// tuoi: thọ nguyên còn lại tối thiểu (năm) trước nghi thức — chỉ cảnh báo, không tự từ chối (HN C §5.3).
// dk: điều kiện bắt đầu {tp: thể phách, vo: bậc võ, hd: bậc Hành Đạo tối đa (0 chính … 4 tà), tu: phải là tu sĩ}.
// steps (b): proof (kiểm chứng; L: đầu mối, lua: kẻ bán đồ giả) · tranh (người tranh giành; L: cách xử) · gain (vt: vật tư cần có)
//   serve (phục vụ/khổ luyện; thang|ngay, chunk ngày mỗi lần, an: bao cơm, rui: rủi ro mỗi lần, alt: trả tiền thay, cho: vật tư nhận khi xong)
//   grow (nuôi qua nam năm, mỗi năm phải về chăm một lần) · rite (nghi thức: ok tỉ lệ, out kết quả, fail hậu quả, mua: chỉ mùa đó, bloom: chờ kỳ nở)
// out: {id: loại linh căn, q: phẩm, el/els: hệ, elSrc: 'thu'|'sao' lấy hệ chốt sẵn của nguồn, pick: chọn ngẫu nhiên trong các loại}
// fail: {hpP: giảm khí huyết tối đa vĩnh viễn (%), tam: {nam, fx} suy nhược có hạn, life: mất năm thọ, wound, die: khả năng chết, ngheDown: mất một bậc nghề}
const CC_CFG={
  nghe:0.2,        // mỗi tháng: khả năng người vô căn (đã trắc) nghe được một dấu vết cơ duyên
  ngheTu:0.03,     // mỗi tháng: tu sĩ nghe dấu vết đường nâng phẩm
  npc:0.02,        // mỗi năm: khả năng người khác dùng mất một nguồn có lịch hồi (nguồn độc nhất: một phần tư số này)
  cho:1,           // thất bại xong phải chờ bấy nhiêu năm mới bắt đầu đường khác
  bloomNgay:60,    // Hóa Sinh Liên giữ trên cây 60 ngày
  coThang:100,     // Linh Căn Cổ: tiền nuôi cổ mỗi tháng (xu)
  bep:33,          // thuê bếp thuốc mỗi ngày khi tự chế (xu)
  chon:300         // chôn vật bản mệnh ở quê (hộp gỗ, giấy dầu, một ngày) — xu
};
const CC_VT={
  ho_mach_tan:{n:'Hộ Mạch Tán',mua:400,che:{can:[['mach_thao',2],['cam_thach_phan',1]],ngay:2}},
  mach_thao:{n:'Mạch Thảo',mua:100,cong:{ngay:2,l:'Hái Mạch Thảo ở bãi dược'}},
  cam_thach_phan:{n:'Cam Thạch Phấn',mua:70},
  dau_lac_kim:{n:'Dầu Lạc Kim',mua:170},
  ho_tam_cao:{n:'Hộ Tâm Cao',mua:700,che:{can:[['mach_thao',2],['dau_lac_kim',1]],ngay:3}},
  bo_chong_sap:{n:'Bộ Chống Sập',mua:4000},
  doi_mo:{n:'Đội thợ mỏ ba người',mua:20000,cong:{ngay:120,l:'Làm công cho phường mỏ, rủ ba cộng sự chia lợi'}},
  kim_sa:{n:'Kim Sa Dưỡng Mạch',mua:700,cong:{ngay:30,l:'Đãi cát ở khúc suối'}},
  moc_tam:{n:'Mộc Tâm Dưỡng Mạch',mua:700,cong:{ngay:30,l:'Chăm vườn cổ thụ đổi cành tỉa'}},
  thuy_chau:{n:'Thủy Châu Dưỡng Mạch',mua:700,cong:{ngay:30,l:'Làm công giữ ao nuôi trai'}},
  hoa_nham:{n:'Hỏa Nham Dưỡng Mạch',mua:700,cong:{ngay:30,l:'Làm lò cho thợ tuyển đá'}},
  tho_tuy:{n:'Thổ Tủy Dưỡng Mạch',mua:700,cong:{ngay:30,l:'Nhào đất cho lò gốm'}},
  bo_cach_nhiet:{n:'Bộ Cách Nhiệt',mua:2000},
  giu_lua:{n:'Người giữ lửa',mua:1700,cong:{ngay:60,l:'Làm lò sáu mươi ngày đổi công giữ lửa'}},
  khe_huyet:{n:'Khế Huyết Song Sinh',mua:7000},
  bo_cay_can:{n:'Bộ Hộ Mạch Cấy Căn',mua:10000},
  thay_cay:{n:'Công thầy cấy căn',mua:13000},
  sao_ha:{n:'Mảnh Sao Hạ',loc:'LOC04',cong:{ngay:1,l:'Thả dây xuống đáy giếng cũ'}},
  sao_trung:{n:'Mảnh Sao Trung',mua:5000,cong:{ngay:60,l:'Sao chép sổ thiên tượng sáu mươi ngày'}},
  sao_thuong:{n:'Mảnh Sao Thượng',loc:'LOC15',cong:{ngay:30,l:'Giúp gia đình giữ kho kỷ vật phân xử quyền sở hữu'}},
  co_trung:{n:'Linh cổ non',mua:1000},
  tao_hoa_dich:{n:'Tạo Hóa Thần Dịch',st:20}
};
const CAI_CAN={
  // ---------- tám đường chính thức (HN C §5.3) ----------
  CC01:{n:'Tái Mạch Đan',noi:{loc:'LOC10',t:['duoc','rung','tran']},mode:'vo',hoi:20,tuoi:1,dk:{tp:4},
    clue:'Người ta kể dược viện ở {{0}} giữ một lò đan hai mươi năm mới ra một viên Tái Mạch Đan. Không bán, chỉ trao cho người chịu ở lại cứu dịch.',
    steps:[
      {b:'proof',L:[{id:'bao_che',l:'Xin xem bản bào chế có dấu dược viện',ngay:2},{id:'benh_an',l:'Tìm người từng dùng đan còn sống, đối chiếu bệnh án',ngay:4,bac:30}],
        lua:{l:'Mua bao đan của kẻ rao ngoài chợ',bac:300}},
      {b:'serve',l:'Phục vụ dược viện, theo đoàn cứu dịch',thang:18,chunk:30,an:1,rui:{p:0.04,hpP:20},cho:[['ho_mach_tan',3]],deed:'cuu_dich'},
      {b:'tranh',t:'Một công tử nhà giàu đem lễ tới xin viện chủ nhường viên đan, nói sẵn lòng trả gấp mười.',
        L:[{id:'to',l:'Kể với viện chủ mười tám tháng mình đã làm',p:0.7,nang:'giao',t:'Viện chủ gật đầu: "Đan trao cho người cứu dịch, không trao cho tiền."'},
           {id:'tien',l:'Góp thêm tiền thuốc cho viện để giữ suất',bac:1500,t:'Viện chủ nhận tiền mua thuốc cho người bệnh, giữ lời với ngươi.'},
           {id:'nhuong',kq:'nhuong',l:'Thôi, nhường cho hắn'}]},
      {b:'gain',vt:[['ho_mach_tan',3]]},
      {b:'rite',l:'Uống Tái Mạch Đan, bảy ngày tĩnh dưỡng',ngay:7,ok:0.75,out:{id:'tap',q:'thuong'},
        fail:{hpP:-5,flag:'seo_mach'},vt:[['ho_mach_tan',3]],
        okT:'Bảy ngày sau, kinh mạch bỗng ấm lên. Năm luồng hơi mỏng như sợi tóc tìm được đường đi.',failT:'Đan tan mà mạch không mở. Một vết sẹo âm ỉ nằm lại trong kinh mạch.'}]},
  CC03:{n:'Ngũ Hành Dưỡng Căn Pháp',noi:{loc:'LOC01',t:['tran'],re:/Thôn|Khê/},mode:'vo',hoi:null,tuoi:6,
    clue:'Ở {{0}} có gia phả ghi một pháp dưỡng căn: năm năm nuôi năm vị vật liệu trong một khu vườn, không cần một chút linh lực nào.',
    steps:[
      {b:'proof',L:[{id:'gia_pha',l:'Đối chiếu bản khuyết với bia mộ tổ',ngay:10},{id:'kiem_duoc',l:'Thử năm vật liệu theo quyển kiểm dược',ngay:3,bac:50}],
        lua:{l:'Mua bản chép "Dưỡng Căn Pháp" của thầy đồ dạo',bac:400}},
      {b:'tranh',t:'Địa chủ trong vùng đang đòi khu vườn cũ để làm ruộng, dân thôn không ai dám cãi.',
        L:[{id:'thuong',l:'Thương lượng, xin thôn giữ vườn',p:0.6,nang:'thuong',t:'Địa chủ chịu lùi một bước khi cả thôn đứng sau ngươi.'},
           {id:'tien',l:'Bỏ tiền chuộc lại quyền dùng vườn',bac:1500,t:'Tờ khế chuộc vườn có dấu lý trưởng.'},
           {id:'nhuong',kq:'nhuong',l:'Bỏ khu vườn cho địa chủ'}]},
      {b:'serve',l:'Sửa kênh, chăm vườn công cho thôn',ngay:120,chunk:30},
      {b:'gain',vt:[['kim_sa',1],['moc_tam',1],['thuy_chau',1],['hoa_nham',1],['tho_tuy',1]]},
      {b:'grow',l:'Về chăm vườn dưỡng căn',nam:5,ngay:3},
      {b:'rite',l:'Thu vườn, theo pháp mà dưỡng căn ba ngày',ngay:3,ok:0.9,out:{id:'tap',q:'khuyet'},
        fail:{tam:{nam:1,fx:{hpP:-15}}},vt:[['kim_sa',1],['moc_tam',1],['thuy_chau',1],['hoa_nham',1],['tho_tuy',1]],
        okT:'Năm năm mồ hôi đổ xuống một mảnh đất. Hôm nay năm luồng hơi nhạt từ vườn chảy vào người ngươi.',failT:'Vụ dược hỏng ngay đêm cuối. Ngươi ốm một năm, khu vườn trơ lại đất.'}]}
};
