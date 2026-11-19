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
  chon:300,        // chôn vật bản mệnh ở quê (hộp gỗ, giấy dầu, một ngày) — xu
  // Sửa-G (câu 29): vật tư cải căn là vật quý hiếm, "chỉ gặp không thể cầu" — không bày ở tiệm.
  timNgay:3,       // dò hỏi người giữ vật (mỗi vật một lần mỗi tháng): mất bấy nhiêu ngày
  tim:0.35,        // khả năng dò ra người đang giữ vật
  ban:0.5,         // khả năng người giữ chịu nhượng lại (không thì từ chối, tháng sau hỏi lại)
  hiemX:3,         // giá người giữ đòi = gia × hiemX (xu) hoặc st × hiemX (linh thạch Hạ phẩm); lời đề nghị giữ trong tháng
  ky:0.04,         // mỗi tháng đang gom vật tư: khả năng gặp kỳ ngộ được một món còn thiếu
  am:0.25,         // U Minh Ám Hội: mỗi tháng mỗi nơi, khả năng có một món cải căn đang thiếu được đem ra
  amX:5            // giá ở Ám Hội = gia × amX (xu) hoặc st × amX (linh thạch Hạ phẩm)
};
// CC_VT: gia = giá trị (xu) khi gặp người chịu nhượng; st = giá trị bằng linh thạch Hạ phẩm (vật của tu sĩ).
//   Không có chỗ mua thẳng. Nguồn: cong (làm công đổi lấy), che (tự chế từ nguyên liệu cũng hiếm), cho của bước phục vụ,
//   dò hỏi người giữ (CC_CFG.tim/ban, giá ×hiemX), kỳ ngộ khi đang gom (CC_CFG.ky), U Minh Ám Hội (CC_CFG.am, giá ×amX).
const CC_VT={
  ho_mach_tan:{n:'Hộ Mạch Tán',gia:400,che:{can:[['mach_thao',2],['cam_thach_phan',1]],ngay:2}},
  mach_thao:{n:'Mạch Thảo',gia:100,cong:{ngay:2,l:'Hái Mạch Thảo ở bãi dược'}},
  cam_thach_phan:{n:'Cam Thạch Phấn',gia:70},
  dau_lac_kim:{n:'Dầu Lạc Kim',gia:170},
  ho_tam_cao:{n:'Hộ Tâm Cao',gia:700,che:{can:[['mach_thao',2],['dau_lac_kim',1]],ngay:3}},
  bo_chong_sap:{n:'Bộ Chống Sập',gia:4000},
  doi_mo:{n:'Đội thợ mỏ ba người',gia:20000,cong:{ngay:120,l:'Làm công cho phường mỏ, rủ ba cộng sự chia lợi'}},
  kim_sa:{n:'Kim Sa Dưỡng Mạch',gia:700,cong:{ngay:30,l:'Đãi cát ở khúc suối'}},
  moc_tam:{n:'Mộc Tâm Dưỡng Mạch',gia:700,cong:{ngay:30,l:'Chăm vườn cổ thụ đổi cành tỉa'}},
  thuy_chau:{n:'Thủy Châu Dưỡng Mạch',gia:700,cong:{ngay:30,l:'Làm công giữ ao nuôi trai'}},
  hoa_nham:{n:'Hỏa Nham Dưỡng Mạch',gia:700,cong:{ngay:30,l:'Làm lò cho thợ tuyển đá'}},
  tho_tuy:{n:'Thổ Tủy Dưỡng Mạch',gia:700,cong:{ngay:30,l:'Nhào đất cho lò gốm'}},
  bo_cach_nhiet:{n:'Bộ Cách Nhiệt',gia:2000},
  giu_lua:{n:'Người giữ lửa',gia:1700,cong:{ngay:60,l:'Làm lò sáu mươi ngày đổi công giữ lửa'}},
  khe_huyet:{n:'Khế Huyết Song Sinh',gia:7000},
  bo_cay_can:{n:'Bộ Hộ Mạch Cấy Căn',gia:10000},
  thay_cay:{n:'Công thầy cấy căn',gia:13000},
  sao_ha:{n:'Mảnh Sao Hạ',loc:'LOC04',cong:{ngay:1,l:'Thả dây xuống đáy giếng cũ'}},
  sao_trung:{n:'Mảnh Sao Trung',gia:5000,cong:{ngay:60,l:'Sao chép sổ thiên tượng sáu mươi ngày'}},
  sao_thuong:{n:'Mảnh Sao Thượng',loc:'LOC15',cong:{ngay:30,l:'Giúp gia đình giữ kho kỷ vật phân xử quyền sở hữu'}},
  co_trung:{n:'Linh cổ non',gia:1000},
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
  CC02:{n:'Địa Mạch Linh Tủy',noi:{loc:'LOC11',t:['khoang','nui','tran']},mode:'vo',hoi:120,tuoi:3,dk:{tp:5},
    clue:'Phường thợ mỏ ở {{0}} truyền tai nhau: trong mỏ bỏ có một hốc tủy, một trăm hai mươi năm mới tụ đủ một ống Địa Mạch Linh Tủy.',
    steps:[
      {b:'proof',L:[{id:'ban_do',l:'Mua lại bản đo vỉa cũ của lão thợ mỏ',ngay:3,bac:100},{id:'da_dan',l:'Thử đá dẫn mạch bằng dụng cụ của phường',ngay:2}],
        lua:{l:'Mua quặng phát quang của tay buôn',bac:500}},
      {b:'gain',vt:[['bo_chong_sap',1],['doi_mo',1]]},
      {b:'tranh',t:'Một toán đào mỏ lậu cũng đánh hơi được hốc tủy, kéo tới cửa mỏ.',
        L:[{id:'chia',l:'Chia cho chúng một phần quặng thường đào được',bac:1200,t:'Chúng lấy quặng rồi đi, hẹn không quay lại.'},
           {id:'liu',l:'Cùng đội thợ chặn cửa mỏ',p:0.5,vo:1,wound:'gay',t:'Đuổi được bọn đào lậu, cửa mỏ giờ là của đội ngươi.'},
           {id:'nhuong',kq:'nhuong',l:'Để chúng vào trước'}]},
      {b:'serve',l:'Thăm dò lòng mỏ, chống sập từng đoạn',ngay:90,chunk:30,rui:{p:0.08,wound:'gay',hpP:30,t:'Vách mỏ rùng mình, đội ngươi kịp rút nhưng một tảng đá vẫn đè trúng người.'}},
      {b:'rite',l:'Niêm ống tủy, uống trong bảy ngày',ngay:7,ok:0.65,out:{id:'thien',q:'khuyet',el:'tho'},okFx:{tam:{nam:2,fx:{hpP:-10}}},
        fail:{tam:{nam:2,fx:{hpP:-25,atkP:-20}},wound:'noi'},vt:[['bo_chong_sap',1],['doi_mo',1]],
        okT:'Đất như thở cùng ngươi. Một luồng khí nặng và ấm chìm xuống đan điền. Thân thể phải mất hai năm mới hồi lại.',failT:'Tủy quá nặng, kinh mạch không giữ nổi. Hai năm tới ngươi đi đứng cũng phải nghỉ.'}]},
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
        okT:'Năm năm mồ hôi đổ xuống một mảnh đất. Hôm nay năm luồng hơi nhạt từ vườn chảy vào người ngươi.',failT:'Vụ dược hỏng ngay đêm cuối. Ngươi ốm một năm, khu vườn trơ lại đất.'}]},
  CC04:{n:'Hóa Sinh Liên',noi:{loc:'LOC09',t:['dam','song','bien','tran']},mode:'vo',hoi:30,tuoi:4,dk:{vo:1},
    clue:'Người ven nước ở {{0}} canh một hồ cổ. Sổ thuế nước ghi ba mươi năm hồ nở một đài Hóa Sinh Liên.',
    steps:[
      {b:'proof',L:[{id:'hat',l:'Xin xem hạt sen lưu trong nhà tổ',ngay:2},{id:'so_thue',l:'Tra lịch nở ghi trong sổ thuế nước',ngay:3,bac:60}],
        lua:{l:'Mua bông sen "đổi màu dưới đèn" của tay buôn',bac:600}},
      {b:'tranh',t:'Thượng nguồn có người đắp đập, hồ cạn dần. Người giữ hồ nói: ai cứu được hồ thì xin hái đài sen.',
        L:[{id:'cuu',l:'Cùng dân ven nước phá đập, khơi lại dòng',ngay:20,p:0.7,vo:1,deed:'hanh_hiep',t:'Nước về, người giữ hồ ghi tên ngươi vào sổ.'},
           {id:'mua',l:'Mua quyền thu hái',bac:3000,t:'Người giữ hồ nhận tiền, ghi quyền thu hái vào sổ.'},
           {id:'cuop',l:'Chiếm lấy hồ, đuổi người giữ đi',deed:'hiep_dao',t:'Hồ là của ngươi. Người ven nước sẽ nhớ chuyện này.'},
           {id:'nhuong',kq:'nhuong',l:'Rời đi'}]},
      {b:'serve',l:'Phục vụ hồ, học cách giữ sen',ngay:60,chunk:30,alt:{l:'Thuê người luyện dược chủ trì thay',bac:1000}},
      {b:'rite',l:'Hái đài sen, ba mươi ngày luyện hóa',ngay:30,ok:0.7,bloom:1,out:{id:'song',q:'thuong',els:['moc','thuy']},
        fail:{tam:{nam:0.5,fx:{hpP:-30,atkP:-20}},life:-3},
        okT:'Sen tan trong miệng thành một dòng mát. Mộc và thủy cùng bén rễ trong kinh mạch.',failT:'Cơn sốt kéo dài nửa năm. Khi tỉnh lại, tóc mai đã bạc thêm.'}]},
  CC05:{n:'Tàn Hỏa Chủng',noi:{loc:'LOC11',t:['khoang','nui','tran']},mode:'vo',hoi:0,tuoi:6,dk:{tp:5},
    clue:'Thợ rèn già ở {{0}} kể về một tàn lò bỏ hoang, đáy lò còn giữ hạt lửa cuối cùng của cả thiên hạ.',
    steps:[
      {b:'gain',vt:[['bo_cach_nhiet',1]]},
      {b:'proof',L:[{id:'manh_lo',l:'Đọc mảnh lò và nhật ký tôi',ngay:2},{id:'thu_cat',l:'Thử cùng cát cách nhiệt',ngay:1}],
        lua:{l:'Mua "hỏa chủng" của thương lái (tro nguội)',bac:500}},
      {b:'tranh',t:'Một kẻ đã lấy trộm bản đồ tàn lò, đang rao bán cho người trả cao nhất.',
        L:[{id:'thu',l:'Mang thư của thợ già tới phường rèn, xin người làm chứng',p:0.6,nang:'giao',t:'Phường rèn đứng ra, kẻ trộm phải trả bản đồ.'},
           {id:'mua',l:'Mua lại bản đồ',bac:2500,t:'Bản đồ về tay ngươi, đắt nhưng thật.'},
           {id:'cuop',l:'Cướp lại bản đồ',p:0.5,vo:1,wound:'ngoai',deed:'hiep_dao',t:'Ngươi giật được bản đồ, kẻ kia bỏ chạy.'},
           {id:'nhuong',kq:'nhuong',l:'Thôi, không theo nữa'}]},
      {b:'gain',vt:[['ho_tam_cao',1],['giu_lua',1]]},
      {b:'rite',l:'Khai hỏa chủng, một đêm giữ lửa',ngay:0.5,ok:0.6,out:{id:'thien',q:'thuong',el:'hoa'},okFx:{life:-5,flag:'bong_mach'},
        fail:{wound:'bong',tam:{nam:1,fx:{hpP:-25,defP:-20}}},vt:[['ho_tam_cao',1],['giu_lua',1]],
        okT:'Lửa chui vào lòng bàn tay, chạy dọc kinh mạch. Ngươi sống sót, đổi bằng năm năm thọ và một dấu bỏng trong mạch.',failT:'Lửa quá dữ. Ngươi bỏng nặng, hạt lửa cuối cùng tắt trong tay.'}]},
  CC06:{n:'Huyết Mạch Khế',noi:{loc:'LOC08',t:['tong','rung','tran'],re:/Thú|Vạn/},mode:'vo',hoi:null,tuoi:1,
    clue:'Ở {{0}} có người làm khế giữa người và linh thú. Thú ký khế thì chia cho chủ một phần huyết mạch.',
    steps:[
      {b:'proof',L:[{id:'doi_chung',l:'Nhờ người biết chữ và người hiểu thú đối chứng khế',ngay:3,bac:80},{id:'thu_huyet',l:'Thử huyết dịch tương thích',ngay:2}],
        lua:{l:'Mua tờ khế viết sẵn của kẻ lạ',bac:1000}},
      {b:'tranh',t:'Con linh thú hợp huyết với ngươi đang bị thương, nằm trong chuồng của người khác.',
        L:[{id:'cham',l:'Chăm nó cho tới khi nó tự nguyện',ngay:90,deed:'phong_sinh',t:'Một sáng nó tự đặt đầu lên tay ngươi.'},
           {id:'ep',l:'Ép nó ký khế',deed:'tra_tan',t:'Nó ký, nhưng mắt nó nhìn ngươi như kẻ thù.'},
           {id:'nhuong',kq:'nhuong',l:'Để nó yên'}]},
      {b:'gain',vt:[['khe_huyet',1]]},
      {b:'rite',l:'Ký khế, nhường một phần năm thọ nguyên còn lại',ngay:3,ok:0.8,out:{id:'thien',q:'thuong',elSrc:'thu'},cost:{lifePct:20},
        fail:{tam:{nam:2,fx:{hpP:-20,atkP:-15}}},vt:[['khe_huyet',1]],
        okT:'Máu thú và máu người hòa vào nhau. Từ nay hai bên cùng chia một phần đời.',failT:'Huyết mạch đào thải nhau. Ngươi suy nhược hai năm, con thú cũng ốm theo.'}]},
  CC07:{n:'Vay Căn Nghịch Mệnh',noi:{loc:'LOC07',t:['ma','phe','tran']},mode:'vo',hoi:null,tuoi:12,
    clue:'Có lời thì thầm: ở {{0}} có y quán bí mật cấy linh căn của người này sang người khác.',
    steps:[
      {b:'proof',L:[{id:'nguoi_cho',l:'Gặp tận mặt người cho',ngay:2},{id:'ho_so',l:'Đối chiếu hồ sơ mạch và lời xác nhận',ngay:3,bac:100}],
        lua:{l:'Mua hộp gỗ ghi "linh căn"',bac:2000}},
      {b:'tranh',t:'Người có căn sắp chết vì bệnh. Người nhà còn do dự, còn y quán thì có "hàng" khác rẻ hơn.',
        L:[{id:'hien',l:'Chăm người cho tới lúc họ tự nguyện hiến',ngay:90,deed:'cuu_nguoi',t:'Trước khi đi, người ấy ký tên vào giấy hiến căn.'},
           {id:'mua',l:'Mua căn từ y quán, không hỏi nguồn',bac:8000,deed:'ban_nguoi',t:'Ngươi không hỏi, họ không kể.'},
           {id:'giet',l:'Giết người có căn mà lấy',deed:'doat_can',t:'Máu chưa khô thì thầy cấy đã tới.'},
           {id:'nhuong',kq:'nhuong',l:'Bỏ đi'}]},
      {b:'gain',vt:[['ho_mach_tan',1],['bo_cay_can',1],['thay_cay',1]]},
      {b:'rite',l:'Cấy căn, ba trăm sáu mươi ngày tịnh dưỡng',ngay:360,ok:0.55,out:{pick:['tap','tu','tam','song'],q:'thuong'},cost:{life:10},
        fail:{hpP:-10},vt:[['ho_mach_tan',1],['bo_cay_can',1],['thay_cay',1]],
        okT:'Một năm nằm yên. Căn của người khác giờ bén rễ trong ngươi.',failT:'Thân thể đào thải căn lạ. Khí huyết ngươi vĩnh viễn kém đi.'}]},
  CC08:{n:'Tinh Hồn Kết Căn',noi:{loc:'LOC05',t:['tong','thanh'],re:/Trận|Cơ|Tinh/},mode:'vo',hoi:0,tuoi:3,dk:{nghe:1},
    clue:'Người giữ thiên tượng ở {{0}} kể có ba mảnh sao cùng rơi một năm. Đủ ba mảnh, trận pháp có thể kết thành căn.',
    steps:[
      {b:'proof',L:[{id:'thien_tuong',l:'Đối chiếu bản sao thiên tượng với ngày rơi',ngay:5},{id:'cong_huong',l:'Thử mẫu cộng hưởng',ngay:2,bac:150}],
        lua:{l:'Mua "mảnh sao" của người giữ trận khác',bac:1500}},
      {b:'gain',vt:[['sao_ha',1],['sao_trung',1],['sao_thuong',1]]},
      {b:'serve',l:'Nghiên cứu trận, khảo sao',thang:24,chunk:30,alt:{l:'Trả công người vận hành trận',bac:17000,thang:18}},
      {b:'rite',l:'Vận trận kết căn, hy sinh một ký ức kỹ năng',ngay:7,ok:0.5,out:{id:'bien',q:'khuyet',elSrc:'sao'},
        fail:{ngheDown:1},vt:[['sao_ha',1],['sao_trung',1],['sao_thuong',1]],
        okT:'Ba mảnh sao cùng sáng lên một lúc. Ngươi nghe trong người có tiếng gió, tiếng băng hoặc tiếng sấm xa.',failT:'Trận tắt. Một tay nghề ngươi từng thuộc lòng bỗng như của người khác.'}]},
  // ---------- mười đường bổ sung (HN A.3, viết lại theo khuôn C) ----------
  TAY_TUY:{n:'Tẩy Tủy Phạt Mạch Kinh',noi:{loc:'LOC12',t:['ancu','tong','nui','tran']},mode:'vo',hoi:null,tuoi:4,dk:{vo:1},
    clue:'Võ phái ẩn ở {{0}} còn giữ quyển Tẩy Tủy Phạt Mạch Kinh. Ba năm khổ luyện, đánh vỡ mạch tắc mà mở căn.',
    steps:[
      {b:'proof',L:[{id:'vo_su',l:'Hỏi hai võ sư từng thấy người luyện thành',ngay:3}],lua:{l:'Mua bản kinh chép tay ở chợ',bac:300}},
      {b:'serve',l:'Khổ luyện Tẩy Tủy Kinh',thang:36,chunk:30,rui:{p:0.05,wound:'noi',t:'Một lần luyện quá sức, nội tạng chấn động.'}},
      {b:'rite',l:'Phạt mạch lần cuối',ngay:7,ok:0.7,out:{pick:['tap','tap','tap','thien'],q:'khuyet'},
        fail:{wound:'noi',tam:{nam:1,fx:{hpP:-20}}},
        okT:'Một tiếng vỡ nhỏ trong xương sống. Mạch tắc thông rồi.',failT:'Mạch không vỡ, chỉ có người ngươi gục xuống. Một năm sau mới cầm lại được binh khí.'}]},
  QUAN_DINH:{n:'Tiên nhân quán đỉnh',noi:{loc:'LOC04',t:['phe','dong','tran']},mode:'vo',hoi:50,tuoi:1,
    clue:'Tiều phu ở {{0}} gặp một lão tu sĩ hấp hối trong hang, lão hỏi có ai không có căn mà muốn nhận di nguyện.',
    steps:[
      {b:'proof',L:[{id:'hang',l:'Lần theo lời tiều phu tìm hang',ngay:2},{id:'dau_vet',l:'Hỏi người làng xem lão là ai',ngay:1}],lua:{l:'Trả tiền cho kẻ tự xưng là đệ tử của lão',bac:400}},
      {b:'serve',l:'Chăm lão tu sĩ những ngày cuối',ngay:30,chunk:30,deed:'cuu_nguoi'},
      {b:'rite',l:'Nhận quán đỉnh, mang theo di nguyện',ngay:3,ok:0.8,out:{pick:['tu','tam','song'],q:'thuong',qMax:'thuong'},okFx:{flag:'di_nguyen'},
        fail:{life:-1},
        okT:'Lão đặt tay lên đỉnh đầu ngươi rồi tắt thở. Căn của lão ở lại, cùng một lời dặn chưa nói hết.',failT:'Linh lực của lão tan trước khi kịp vào người ngươi. Ngươi chôn lão bên cửa hang.'}]},
  HUYET_TE:{n:'Huyết Tế Khai Mạch',noi:{loc:'LOC07',t:['ma','phe']},mode:'vo',hoi:null,tuoi:2,
    clue:'Ở {{0}} có kẻ truyền phép huyết tế: lấy máu người sống mở mạch cho kẻ không căn.',
    steps:[
      {b:'proof',L:[{id:'huyet_kinh',l:'Xem bản huyết kinh và người đã khai mạch',ngay:2}]},
      {b:'rite',l:'Làm lễ huyết tế',ngay:1,ok:0.7,deed:'huyet_te_nguoi',out:{id:'thien',q:'khuyet',el:'thuy'},okFx:{flag:'huyet_can'},
        fail:{wound:'noi',life:-2},
        okT:'Máu người khác chảy qua mạch ngươi, để lại một căn mỏng và lạnh. Từ nay mùi máu dễ gọi nó dậy.',failT:'Lễ hỏng. Máu đã đổ, căn không thành.'}]},
  LINH_CO:{n:'Linh Căn Cổ',noi:{loc:'LOC09',t:['dam','rung','song','tran']},mode:'vo',hoi:null,tuoi:2,
    clue:'Cổ sư ở {{0}} nuôi một loài cổ sống trong kinh mạch, thay người ta làm linh căn. Đổi lại, phải nuôi nó đến hết đời.',
    steps:[
      {b:'proof',L:[{id:'nguoi_mang',l:'Gặp người đang mang cổ',ngay:2},{id:'thu_co',l:'Xem cổ sư thử cổ trên lá',ngay:1}],lua:{l:'Mua "cổ" đựng trong ống tre ở chợ',bac:300}},
      {b:'gain',vt:[['co_trung',1]]},
      {b:'rite',l:'Thả cổ vào kinh mạch',ngay:3,ok:0.75,out:{pick:['tam','tu'],q:'khuyet'},okFx:{flag:'nuoi_co'},
        fail:{wound:'doc',tam:{nam:1,fx:{hpP:-15}}},vt:[['co_trung',1]],
        okT:'Con cổ cuộn mình trong đan điền. Mỗi tháng phải cho nó ăn, không thì nó ăn ngươi.',failT:'Cổ chết trong mạch, để lại chất độc.'}]},
  THIEN_LOI:{n:'Thiên Lôi Quán Thể',noi:{loc:'LOC14',t:['nui','phe','tran']},mode:'vo',hoi:null,tuoi:1,
    clue:'Người ta đồn trên đỉnh núi ở {{0}}, mùa hạ giông nhiều, có kẻ không căn đứng chịu sét mà thành Lôi căn. Phần lớn thì chết.',
    steps:[
      {b:'proof',L:[{id:'dau_set',l:'Tìm vết sét đánh và người còn sống',ngay:3}]},
      {b:'rite',l:'Đứng trên đỉnh núi giữa giông',ngay:1,ok:0.05,mua:'ha',out:{id:'bien',q:'thuong',el:'loi'},
        fail:{die:0.5,wound:'nguy'},
        okT:'Sét đánh thẳng xuống. Ngươi không chết. Trong người có tiếng sấm.',failT:'Sét đánh xuống. Ngươi tỉnh lại giữa đá cháy, thân thể tan nát.'}]},
  XA_LOI:{n:'Phật môn Xá Lợi',noi:{loc:'LOC12',t:['tong'],re:/Tự|Chùa|Thiền|Phật/},mode:'vo',hoi:null,tuoi:6,dk:{hd:2},
    clue:'Chùa {{0}} giữ một viên xá lợi. Ai giữ giới năm năm ở chùa thì được ngồi dưới xá lợi một đêm.',
    steps:[
      {b:'proof',L:[{id:'su_gia',l:'Hỏi sư già trong chùa',ngay:1}]},
      {b:'serve',l:'Giữ giới, làm việc chùa',thang:60,chunk:30,an:1,deed:'bo_thi'},
      {b:'rite',l:'Ngồi dưới xá lợi một đêm',ngay:1,ok:0.85,out:{id:'thien',q:'thuong',pick_el:['tho','kim']},
        fail:{},
        okT:'Đêm ấy không có gì lạ. Sáng ra, ngươi thấy mình nghe được hơi thở của đất.',failT:'Đêm trôi qua. Ngươi vẫn là ngươi, năm năm giữ giới cũng không mất đi đâu.'}]},
  HAO_NHIEN:{n:'Dưỡng Hạo Nhiên Khí',off:'nho',noi:{loc:'LOC02',t:['thanh']},mode:'vo',hoi:null,tuoi:1,
    clue:'Thư sinh ở {{0}} bàn về hạo nhiên khí: đỗ đạt, ngộ lời thánh hiền thì lòng có một thứ căn khác.',
    steps:[{b:'rite',l:'Ngộ lời thánh hiền',ngay:1,ok:1,out:{id:'tap',q:'khuyet'}}]},
  TUC_CAN:{n:'Túc căn kiếp trước',noi:{meta:1},mode:'tuc',hoi:null,tuoi:1,
    clue:'Có đêm ngươi mơ thấy {{0}}, dưới một gốc cây có thứ của mình chôn từ rất lâu.',
    steps:[
      {b:'proof',L:[{id:'nho',l:'Đào đúng chỗ trong giấc mơ',ngay:1}]},
      {b:'rite',l:'Cầm lại vật bản mệnh',ngay:1,ok:0.9,out:{tuc:1},fail:{},
        okT:'Vật cũ ấm lên trong tay. Căn kiếp trước quay về, mờ hơn một chút.',failT:'Vật cũ vỡ vụn. Kiếp trước đã thật sự qua rồi.'}]},
  DUOC_NHAN:{n:'Làm dược nhân',noi:{loc:'LOC07',t:['ma','tong','phe']},mode:'vo',hoi:null,tuoi:1,
    clue:'Ma tông ở {{0}} tìm người không căn thử thuốc. Họ hứa: mười người, có một người ra có căn.',
    steps:[
      {b:'proof',L:[{id:'nguoi_ve',l:'Tìm người từng làm dược nhân trở về',ngay:3}]},
      {b:'rite',l:'Nằm lên giường thử thuốc',ngay:30,ok:0.1,out:{id:'tap',q:'khuyet'},fail:{die:0.78,wound:'doc'},
        okT:'Ba mươi ngày sống trong thuốc. Ngươi là người thứ mười ấy.',failT:'Ngươi sống sót ra khỏi đó, không căn, người đầy độc.'}]},
  TAO_HOA:{n:'Tạo Hóa Thần Dịch',noi:{loc:'LOC15',t:['thien','linhdia','nui']},mode:'nang',hoi:60,tuoi:1,dk:{tu:1},
    clue:'Tin từ {{0}}: di tích trên thiên lộ còn một giọt Tạo Hóa Thần Dịch, chỉ nâng căn sẵn có, không cho kẻ không căn.',
    steps:[
      {b:'proof',L:[{id:'di_tich',l:'Dò lối vào di tích',ngay:5},{id:'bia',l:'Đọc bia ghi cách dùng',ngay:2}]},
      {b:'tranh',t:'Một tu sĩ khác cũng tìm tới, muốn chia đôi.',
        L:[{id:'chia',l:'Trả hắn để hắn rút',st:8,t:'Hắn nhận linh thạch rồi đi.'},
           {id:'dau',l:'Đấu một trận',p:0.55,vo:0,wound:'noi',t:'Hắn thua, bỏ đi.'},
           {id:'nhuong',kq:'nhuong',l:'Nhường hắn'}]},
      {b:'gain',vt:[['tao_hoa_dich',1]]},
      {b:'rite',l:'Uống Tạo Hóa Thần Dịch',ngay:7,ok:0.7,out:{nang:1},fail:{wound:'noi',tam:{nam:1,fx:{mpP:-20}}},vt:[['tao_hoa_dich',1]],
        okT:'Thần dịch rửa qua linh căn, vết rạn trên căn mờ đi.',failT:'Căn không nhận thần dịch. Kinh mạch chấn động một năm.'}]}
};
