// ================= KHO CHỮ =================
const NAME = {
  ho: ['Vương','Lý','Trương','Lưu','Trần','Dương','Hoàng','Triệu','Chu','Ngô','Từ','Tôn','Mã','Hồ','Quách','Hà','Cao','Lâm','La','Trịnh','Lương','Tạ','Tống','Đường','Hứa','Hàn','Phùng','Tào','Bành','Tiêu','Điền','Đổng','Viên','Đỗ','Thẩm','Khương','Diệp','Ngụy','Tiết','Dư','Chung','Uông','Nhậm','Phương','Thạch','Diêu','Đàm','Liêu','Hùng','Lục','Khổng','Bạch','Thôi','Mạnh','Tần','Giang','Cố','Hầu','Thiệu','Long','Vạn','Đoàn','Tiền','Doãn','Kiều','Lăng','Ôn','Lạc','Ninh','Yến','Cát','Liễu','Sở','Quan','Ân','Mục','Tô','Bùi','Phó','Tư','Hạ','Lệ','Văn','Tưởng','Tịch','Mộc','Tề','Ứng','Nghiêm','Khúc','Phong','Hoa','Lam','Chử','Thương'],
  ho2: ['Mộ Dung','Thác Bạt','Độc Cô','Lệnh Hồ','Tư Mã','Âu Dương','Nam Cung','Hạ Hầu','Đoan Mộc','Thượng Quan','Công Tôn','Úy Trì','Hách Liên','Thân Đồ','Gia Cát','Tây Môn','Đông Phương','Hoàng Phủ','Tư Đồ','Vũ Văn','Chung Ly','Bách Lý','Thái Sử','Mộ Hoa','Tông Chính'],
  nam: ['Triệt','Kiên','Mặc','Hàn','Viễn','Dật','Thương Hải','Tùng Niên','Kinh Lôi','Bắc Quy','Thanh Sơn','Vô Kỵ','Phong','Lăng','Thần','Hạo','Uyên','Tịch','Trầm','Cẩn','Khuyết','Bất Phàm','Trường Sinh','Nhất','Huyền','Cửu','Lưu Vân','Kình','Ưng','Trác','Thừa','Bách','Ngạn','Tranh','Thiên Hành','Tử Ngọc','Trọng','Quân','Liệt','Ẩn','Tuấn','Mạc','Tiêu Dao','Sách','Hoành','Lẫm','Tuyệt','Kiệt','Viêm','Hiên','Khải','Duệ','Tông','Nhai','Diễn','Khanh','Vọng','Từ','Lam Sơn','Hành Chi','Mộ Bạch','Thủ Chuyết','Tri Hành','Vấn Thiên','Cô Hồng','Thất','Nghị','Chiêu','Dực'],
  nu: ['Linh','Sương','Uyển','Như Ngọc','Thanh Y','Nhu','Tuyết','Ngưng','Yên','Dao','Vân Tâm','Mộng','Nguyệt','Ly','Thủy','Lan','Băng','Huyên','Tố','Nhược','Khinh','Vũ','Tịch Nhan','Bích','Cầm','Đình','Châu','Vãn','Liên','Dung','Kha','Thiền','Hy','Diệu','Tử Yên','Hàm','Mạn','Sênh','Âm','Duyệt','Phù','Oánh','Nghi','Giai','Hiểu','Thi','Nhan','Lạc Anh','Tiêm Tiêm','Tố Tâm','Ngọc Hành','Lăng Ba','Tình','Vi','Hạ','Tuyết Kiến','Lãnh Nguyệt','Bán Hạ','Thanh Ca','Hồng Diệp','U Lan','Tử Uyển','Tâm Duyệt'],
  tang1: ['Huệ','Minh','Viên','Pháp','Liễu','Tịnh','Không','Giác','Trí','Hư','Đạo','Diệu'],
  tang2: ['Chân','Nghiêm','Độ','Trần','Giác','Năng','Tâm','Tịnh','Hải','Quang','Duyên','Tĩnh','Thiện','Ngộ','Không','Tuệ'],
  dao1: ['Thanh Hư','Huyền Cơ','Vô Trần','Tử Dương','Ngọc Đỉnh','Xích Tùng','Bạch Vân','Linh Hư','Thái Nhất','Hạc Minh','Vân Tiêu','Thủy Nguyệt','Tùng Hạc','Thiên Cơ','Hư Tĩnh','Cô Phong','Ngũ Liễu','Thần Tiêu'],
  dao2: ['Tử','Chân Nhân','Đạo Nhân','Tán Nhân','Thượng Nhân','Lão Đạo','Cư Sĩ','Đạo Trưởng'],
  ma1: ['Huyết Thủ','Quỷ Ảnh','Độc Thủ','Âm Sát','Bách Cốt','Hắc Sát','Thực Tâm','Vô Diện','Cửu U','Tàn Nguyệt','Ma Nhãn','Huyết Y','Bạch Cốt','Phệ Hồn','Thiên Diện','Hoạt Tử','Lục Chỉ','Song Đầu','Táng Hoa','Tam Mục'],
  ma2: ['Lão Ma','Tôn Giả','Thư Sinh','Bà Bà','Đồng Tử','Đạo Nhân','Lão Quái','Ma Quân','Tán Nhân','Nương Tử','Hòa Thượng','Tú Tài'],
  bi1: ['A','Tiểu','A','Tiểu','Lão'],
  bi2: ['Mãn','Vân','Phúc','Ngưu','Cẩu','Hoa','Tứ','Lục','Thất','Đản','Bảo','Hỷ','Thuận','Ngốc','Hổ','Thạch','Liên','Đào','Mai','Quế','Xuyên','Điền'],
  bi3: ['Lão Tứ','Tam Nương','Thập Tam Nương','Đại Ca','Nhị Tẩu','Lão Hán','Bà Bà','Tiểu Muội','Lão Cửu','Bát Gia','Đại Nương','Thất Thúc'],
};

const PLACE = {
  a: ['Thanh','Xích','Hắc','Bạch','Tử','Kim','Ngân','Huyền','Bích','Thương','Hoàng','Ngọc','Lưu','Tàn','Đoạn','Cô','Vụ','Lạc','Cửu','Vạn','Thiên','U','Linh','Huyễn','Tịch','Hàn','Liệt','Vọng','Ẩn','Phi','Trầm','Cổ','Phù','Mê','Vân','Nguyệt','Tinh','Sương','Tuyết','Phong','Lôi','Băng','Long','Hổ','Hạc','Phượng','Quy','Lang','Nhạn','Thạch','Liễu','Đào','Trúc','Tùng','Lạn','Vĩnh','Phú','An','Bảo','Lợi','Tử Phúc','Bình'],
  b: ['Vân','Phong','Vũ','Tuyết','Sương','Nguyệt','Nhật','Tinh','Hà','Thạch','Hỏa','Lôi','Long','Hổ','Hạc','Phượng','Lang','Nhạn','Ưng','Liễu','Trúc','Tùng','Hoa','Diệp','Tuyền','Ba','Yên','Vụ','Kiếm','Cốt','Hồn','Ảnh','Âm','Dương','Minh','Tịch','Thủy','Lâm','Khê','Âu','Phách','Bằng','Lan','Mai','Cầm','Thủ'],
  sfx: {
    tran: ['Trấn','Thôn','Phường','Tập','Trấn','Thôn'],
    thanh: ['Thành','Đô','Phủ','Thành'],
    rung: ['Lâm','Sâm Lâm','Mộc Hải','Lâm'],
    nui: ['Sơn','Lĩnh','Phong','Nhai','Đỉnh','Sơn'],
    song: ['Hồ','Khê','Giang','Đàm','Độ','Tân'],
    phe: ['Cổ Mộ','Phế Tự','Di Tích','Tàn Điện','Uyên','Đài','Cổ Thành'],
    dong: ['Động','Quật','Cốc','Huyệt'],
    tong: ['Sơn Môn'],
    bien: ['Hải','Đảo','Loan','Tiều','Hải Vực'],
    hoang: ['Nguyên','Hoang Mạc','Chiến Trường','Bãi','Hoang Nguyên'],
    ma: ['Ma Uyên','Quỷ Vực','Huyết Trì','Thi Lĩnh','U Cốc','Ma Thành'],
    thien: ['Thiên Môn','Tinh Lộ','Vân Hải','Hư Không','Tiên Khư','Thiên Giai'],
  },
};

const TYPE_NAME = {tran:'thôn trấn',thanh:'thành trì',rung:'rừng sâu',nui:'núi non',song:'sông hồ',phe:'phế tích',dong:'hang động',tong:'sơn môn',bien:'biển khơi',hoang:'hoang nguyên',ma:'ma địa',thien:'thiên lộ'};

const P = {
  // ---------- mở đầu: thời tiết, thời khắc
  mo: [
    'Trời chạng vạng, mây đỏ như máu loang.','Mưa phùn giăng kín lối, vạt áo ngươi ướt sẫm.','Gió thổi lạnh buốt, mang theo mùi lá mục.','Trăng lưỡi liềm treo trên ngọn tùng.','Nắng gắt như đổ lửa, bóng người ngắn lại dưới chân.','Sương sớm còn đọng trên ngọn cỏ.','Tuyết đầu mùa rơi lất phất.','Đêm không trăng, chỉ có tiếng côn trùng rả rích.','Sấm rền phía chân trời, mà mưa mãi chưa tới.','Một ngày oi ả, ve kêu đến váng đầu.','Hoàng hôn buông, khói bếp lác đác bốc lên.','Trời vừa hửng sáng, chim chóc còn chưa dậy.','Mây đen vần vũ, gió thốc từng cơn.','Một đêm trăng tròn, sáng đến mức đếm được từng sợi tóc.','Mưa rào vừa tạnh, đất bốc hơi nồng.','Gió bấc rít qua khe đá như tiếng ai khóc.','Trời quang mây tạnh, xa xa có bầy hạc bay qua.','Sương mù dày đặc, ba bước đã không thấy người.','Giữa trưa, mặt trời trắng bệch sau lớp mây mỏng.','Canh ba, sao trời lấp lánh như vãi bạc.','Cuối thu, lá phong đỏ rụng đầy lối.','Đầu xuân, hoa đào nở muộn bên đường.','Một buổi chiều lặng gió, mọi thứ im đến lạ.','Đêm khuya, nến đã tàn quá nửa.'
  ],
  // ---------- cảnh theo loại nơi
  canh_tran: ['Đường đất lầy lội, trẻ con đuổi nhau qua mấy mái tranh.','Chợ phiên ồn ã, mùi bánh hấp lẫn mùi phân trâu.','Giếng làng có bà lão ngồi giặt áo, chó sủa từng chập.','Cổng gỗ trấn đã mục, tấm biển chữ mờ gần hết.','Quán rượu đầu trấn treo lá cờ vải bạc màu.','Ruộng lúa ngả vàng, có ông lão đánh trâu về muộn.','Mấy nóc nhà quây quanh một cây đa cổ thụ.'],
  canh_thanh: ['Phố xá tấp nập, xe ngựa nối đuôi qua cổng thành.','Tường thành cao vút, lính gác uể oải dựa giáo.','Lầu son gác tía, tiếng đàn ca vẳng ra từ tửu lâu.','Phường thị tu tiên chen chúc, người bán bùa kẻ bán đan.','Đèn lồng treo dọc hai bên phố, đỏ rực như sông lửa.','Mùi trầm hương và mồ hôi trộn lẫn trong đám đông.'],
  canh_rung: ['Tán cây che kín trời, ánh sáng lọt xuống từng vệt mỏng.','Rễ cổ thụ ngoằn ngoèo như rắn, rêu xanh phủ dày.','Tiếng chim lạ gọi nhau, rồi im bặt.','Bụi gai cào rách vạt áo, đất ẩm dưới chân lún sâu.','Một dòng suối nhỏ róc rách luồn qua đá cuội.','Lá khô xào xạc, như có thứ gì đang đi song song với ngươi.'],
  canh_nui: ['Đường núi dốc đứng, đá vụn lăn xuống vực không nghe tiếng rơi.','Mây trôi ngang lưng chừng núi, đỉnh non chìm trong trắng xóa.','Thông già bám vách đá, gió núi rít từng hồi.','Một khoảng đất bằng nhô ra như bàn tay của núi.','Thác nước đổ ầm ầm, bụi nước bay thành cầu vồng.','Bậc đá cũ mòn vẹt, không biết ai đã đục từ bao giờ.'],
  canh_song: ['Mặt nước phẳng lặng như gương, phản chiếu trời mây.','Sóng vỗ vào mạn đá, rong rêu đong đưa.','Bến đò vắng tanh, con thuyền nhỏ buộc vào gốc liễu.','Lau sậy cao quá đầu người, xào xạc trong gió.','Hơi nước lạnh bốc lên, mặt hồ mờ như khói.','Mấy con cò trắng đứng một chân trên bãi bồi.'],
  canh_phe: ['Cột đá đổ nghiêng, chữ khắc trên đó đã bị gió mòn.','Tượng thần cụt đầu đứng giữa sân, rêu phủ kín vai.','Tường đổ ngói vỡ, gió lùa qua những ô cửa trống hoác.','Bậc thềm ngọc đã nứt, cỏ dại mọc chen.','Mùi ẩm mốc và tro tàn lẩn quẩn mãi không tan.','Trên vách còn sót vết kiếm sâu ba tấc, như mới chém hôm qua.'],
  canh_dong: ['Cửa hang hẹp, phải nghiêng người mới lọt.','Nhũ đá rủ xuống như răng thú, nước nhỏ giọt tí tách.','Trong hang tối om, chỉ có ánh lân quang xanh nhạt.','Hơi lạnh từ sâu trong lòng núi phả ra, mang mùi lưu huỳnh.','Vách đá có vết móng vuốt cào, mỗi vết dài bằng cánh tay.'],
  canh_tong: ['Bậc đá dẫn lên sơn môn dài như không có điểm dừng.','Chuông sớm ngân xa, đệ tử áo xanh lướt qua trên kiếm quang.','Cổng tông môn khắc hai chữ lớn, nét bút như rồng bay.','Linh khí nơi này đặc đến mức hít vào thấy ngọt.','Vườn thuốc trải dài sườn núi, hạc trắng thong thả dạo bước.'],
  canh_bien: ['Biển xanh ngắt không bờ, sóng bạc đầu xô vào đá ngầm.','Gió biển mặn chát, hải âu kêu thảm thiết.','Đảo nhỏ trơ trọi, vài cây dừa nghiêng ngả.','Mặt biển đêm lấp lánh lân tinh, như có ai rắc sao xuống nước.','Sương biển mờ mịt, tiếng tù và từ xa vọng lại.'],
  canh_hoang: ['Đồng hoang mênh mông, cỏ úa cao ngang gối.','Xương trắng rải rác, giáo gãy cắm nghiêng trong cát.','Gió cát thổi rát mặt, chân trời đỏ quạch.','Một gò đất cô độc, trên đó có gốc cây khô.','Mặt đất nứt nẻ như mai rùa, hơi nóng bốc lên run rẩy.'],
  canh_ma: ['Trời đỏ như máu, mặt trăng màu tím bầm.','Ma khí lượn lờ thành từng sợi đen, bám vào da thịt lạnh buốt.','Đất đen như mực, cây cối vặn vẹo như người đang quằn quại.','Tiếng khóc than ở đâu đó, nghe kỹ lại thành tiếng cười.','Sông máu chảy chậm, mặt nổi bọt lục bục.'],
  canh_thien: ['Mây trắng dưới chân, sao trời ngay trên đầu.','Bậc thang ngọc lơ lửng giữa hư không, không biết dẫn về đâu.','Gió nơi đây mang theo tiếng chuông, mà không thấy chuông.','Những mảnh lục địa vỡ trôi lững lờ, cỏ cây trên đó vẫn xanh.','Ánh sáng không có nguồn, chiếu từ mọi phía.'],
  canh_ai: ['Cổng ải xây bằng đá xanh, rêu bám kín chân tường, cờ hiệu rách tả tơi bay trên lầu canh.','Hai vách núi kẹp lấy một con đường hẹp, cửa ải chặn ngang như hàm răng đá.','Lính gác ải ngồi quanh đống lửa, giáo dựng cạnh người, mắt không rời lối đi.','Bia đá trước ải khắc tên những kẻ từng vượt qua. Phần lớn đã mờ, vài cái tên còn mới.'],
  canh_sao: ['Xương thú chất thành đống trước cửa hang, ruồi nhặng bay vo ve.','Hàng rào gỗ nhọn cắm máu khô, đầu lâu treo lủng lẳng trên cọc.','Khói đen bốc lên từ sâu bên trong, mùi tanh nồng phả ra từng đợt.','Tiếng trống da thú đập đều đều, như tim của một con quái vật khổng lồ.'],
  buoi_sang: ['Nắng sớm còn nhạt, sương chưa tan hẳn trên ngọn cỏ.','Gà gáy xa xa, khói bếp đầu tiên vừa bốc lên.','Trời mới hửng, gió sớm mát rượi.','Chim chóc ríu rít gọi nhau đón ngày mới.','Mặt trời vừa nhô khỏi rặng núi, rải vàng lên mọi thứ.'],
  buoi_chieu: ['Nắng gắt đổ thẳng xuống, bóng người ngắn lại dưới chân.','Buổi trưa oi ả, ve kêu không ngớt.','Nắng chiều nghiêng, gió bắt đầu nổi.','Mây trắng trôi lững lờ, trời trong vắt.','Giữa ngày, mọi thứ uể oải như muốn ngủ.'],
  buoi_toi: ['Hoàng hôn buông, trời đỏ như than hồng.','Đèn lồng lục tục thắp lên, bóng người dài ra.','Chạng vạng, dơi bắt đầu chao liệng.','Khói bếp bay lên, mùi cơm mới thoang thoảng.','Mặt trời lặn hẳn, chân trời chỉ còn một vệt tím.'],
  buoi_dem: ['Đêm đen như mực, chỉ có tiếng côn trùng rả rích.','Trăng treo lưng trời, sáng lạnh như sương.','Canh khuya, gió thổi qua nghe như tiếng ai thì thầm.','Sao trời dày đặc, dải ngân hà vắt ngang đầu.','Đêm tĩnh mịch, xa xa có tiếng chó sủa rồi im.'],
  mua_xuan: ['Hoa đào nở rộ, cánh hồng bay theo gió.','Mưa xuân lất phất, cỏ non xanh mướt.','Cành liễu đâm chồi, chim én chao liệng.','Khí trời ấm dần, đất ẩm thơm mùi lá mới.'],
  mua_ha: ['Mùa hạ nóng bức, sen nở kín mặt hồ.','Mưa rào bất chợt, rồi nắng lại gắt như cũ.','Cây cối xanh um, ve kêu suốt ngày.','Gió nồm thổi tới, mang theo hơi nước.'],
  mua_thu: ['Lá phong đỏ rụng đầy lối, gió heo may se lạnh.','Trời thu cao vời vợi, nhạn bay thành hàng.','Lúa chín vàng ruộng, hương cốm thoang thoảng.','Sương thu buông sớm, trăng thu tròn vành vạnh.'],
  mua_dong: ['Tuyết phủ trắng xóa, hơi thở hóa thành sương.','Gió bấc rít từng cơn, cây trơ cành khẳng khiu.','Băng đóng trên mái ngói, nước giếng lạnh buốt.','Trời đông âm u, ngày ngắn đêm dài.'],
  // ---------- dáng vẻ người
  look_gia_nam: ['râu tóc bạc phơ, mắt đục như nước giếng','gầy như que củi, khoác tấm đạo bào vá chằng vá đụp','lưng còng, tay chống gậy trúc đã lên nước bóng','mặt đầy nếp nhăn, cười hở hai chiếc răng cửa','mắt nhắm hờ, móng tay dài cong như vuốt chim','mặc áo vải thô, sau lưng đeo một chiếc hồ lô sứt miệng'],
  look_gia_nu: ['tóc bạc búi cao, cài trâm gỗ đào','lưng còng, tay xách giỏ trúc','mắt đã mờ, nhưng nhìn ngươi như nhìn thấu tâm can','da nhăn như vỏ quýt khô, giọng lại trong như chuông'],
  look_tre_nam: ['mày kiếm mắt sao, áo trắng không vương hạt bụi','vai rộng lưng dày, da sạm nắng gió','gầy gò, mắt sáng quắc như mắt chim ưng','mặt mũi non choẹt, cố tỏ ra già dặn','một vết sẹo chạy dọc má trái','tóc buộc vội, áo dính đầy bùn đất','phe phẩy quạt giấy, khóe miệng lúc nào cũng nhếch'],
  look_tre_nu: ['áo lụa xanh, dung nhan thanh lệ như hoa sen mới nở','mặt che sa mỏng, chỉ lộ đôi mắt lạnh như sương','tóc đen như thác, eo đeo một thanh đoản kiếm','má lúm đồng tiền, cười lên mắt cong như trăng non','ăn vận giản dị, ngón tay chai sạn vì cầm kiếm','áo đỏ như lửa, đi tới đâu mùi hương theo tới đó'],
  look_tang: ['đầu tròn bóng, áo cà sa vá víu','gầy nhom, tay lần tràng hạt không ngừng','mặt phúc hậu, bụng to như cái chum','mắt cụp xuống, chân đất dính bùn'],
  look_dao: ['áo bát quái, tay cầm phất trần','râu ba chòm, mắt híp lại như đang tính toán','đội mũ hoa sen, lưng giắt kiếm gỗ đào','mặc đạo bào xám, trên vai đậu một con quạ'],
  look_ma: ['mặt trắng bệch như giấy, môi đỏ như son','áo đen thêu đầu lâu, mắt đỏ ngầu','cười không thành tiếng, móng tay đen sì','trên cổ đeo một chuỗi răng người','một bên mặt đẹp như ngọc, bên kia cháy sém'],
  look_thuong: ['béo tốt, tay đeo năm chiếc nhẫn ngọc','gầy, mắt láo liên, tay không rời bàn tính','ăn mặc lịch sự, nói năng nhỏ nhẹ như rót mật'],
  look_hai: ['mặt lấm lem, tóc rối như tổ quạ','gầy trơ xương, mắt to tròn ầng ậc nước','chân đất, tay cầm cành cây làm kiếm'],
  look_phamnhan: ['tay chân thô ráp, mặt đen sạm','mặc áo nâu bạc màu, vai gánh đòn gánh','dáng thật thà, nói chuyện cứ gãi đầu'],
  // ---------- câu điểm xuyết
  im: ['Một khoảng lặng.','Gió thổi qua, không ai nói gì.','Ngươi nghe rõ tiếng tim mình đập.','Thời gian như ngừng lại trong chốc lát.'],
  tvgain: ['Linh khí trong đan điền cuộn lên như sóng, rồi lắng xuống trong vắt.','Kinh mạch nóng ran, như có dòng suối ấm chảy qua.','Ngươi thấy mình nhẹ hẳn đi, như vừa trút được một lớp bụi.','Một tia minh ngộ lóe lên, rồi lặn vào sâu trong thức hải.','Chân khí vận chuyển một chu thiên, tròn trịa không chút trở ngại.','Tâm thần yên tĩnh lạ, tiếng gió cũng nghe ra có nhịp.'],
  dau: ['Máu tươi trào lên cổ họng, ngươi cố nuốt xuống.','Xương sườn nhói buốt mỗi lần thở.','Mắt tối sầm, phải vịn vào vách mới đứng vững.','Ngươi nghiến răng, mồ hôi lạnh túa ra.'],
  vui: ['Khóe môi ngươi khẽ cong lên.','Ngươi cất kỹ vào ngực áo.','Không uổng chuyến này.','Trời cao có mắt.'],
  di: ['Ngươi lần theo con đường mòn','Ngươi đi theo dòng suối','Ngươi băng qua mấy ngọn đồi trọc','Ngươi men theo vách đá','Ngươi theo chân một đoàn thương lái','Ngươi ngự gió lướt đi','Ngươi đi suốt đêm không nghỉ','Ngươi quá giang một chiếc xe bò'],
  ngumuoi: ['Lời còn chưa dứt,','Ngay khi ấy,','Bất chợt,','Chưa kịp phản ứng,','Trong nháy mắt,'],
  motto: ['Kiếm tại nhân tại','Thiên địa bất nhân','Tâm như minh kính','Vạn pháp quy nhất','Một niệm thành ma','Đạo vô chừng mực','Sinh tử hữu mệnh','Thủ chuyết quy chân','Chớ quên cố nhân','Cầu đạo bất cầu tiên','Trời xanh không mắt','Nhất kiếm sương hàn','Thủy trường lưu','Nghịch thiên cải mệnh'],
  epitaph: ['Một kiếp khổ cũng là một kiếp.','Đường tiên xa vời, bụi trần một nắm.','Gió thổi qua mộ, cỏ xanh lại mọc.','Kiếm gãy, người đi, chuyện cũ không ai nhắc.','Cầu trường sinh, được một giấc mộng.','Hồng trần vạn trượng, xin chôn một lần.','Đời người như bóng câu qua cửa sổ.','Nửa đời phiêu bạt, một nắm tro tàn.','Thiên đạo vô tình, kẻ ở người đi.','Sinh ra từ bụi, lại về với bụi.','Có người còn nhớ, ấy là đủ.','Đi một vòng lớn, lại về chốn cũ.'],
};

// ---------- tin đồn giang hồ (thế giới)
const RUMOR = {
  tien: ['Nghe nói {$a} bế quan đã ba năm chưa ra, động phủ ngày đêm tỏa hào quang.','{$a} một mình xông vào sào huyệt yêu thú, ba ngày sau ôm về một viên nội đan to bằng nắm tay.','Trên luận đạo hội, {$a} chỉ nói một câu mà khiến trưởng lão {$s} trầm ngâm cả buổi.','{$a} đột phá {$cg}, trời quang bỗng nổi mây ngũ sắc.','Người ta thấy {$a} ngự kiếm qua {$pl}, kiếm quang dài như cầu vồng.','{$a} đoạt khôi thủ đại bỉ {$s}, cả tông môn treo đèn ba đêm.'],
  ma: ['Nghe nói {$a} giết người đoạt bảo ở {$pl}, ba mươi sáu xác không còn một giọt máu.','{$a} phản {$s}, trước khi đi đốt sạch tàng kinh các.','Có kẻ nói {$a} đã nhập ma, nửa đêm thét lên, quanh người bốc lửa đen.','Lệnh truy nã {$a} dán khắp các thành trấn, giá treo tới ba nghìn linh thạch.'],
  tinh: ['{$s} treo đèn đỏ khắp núi: {$a} thành hôn với {$b}.','Người ta đồn {$a} và {$b} từng cùng nhau ngắm trăng ở {$pl}. Không ai dám hỏi thật.','{$a} cầu thân {$b} bị từ chối, uống say ba ngày ở tửu lâu.'],
  tu: ['Tin dữ: {$a} tử trận ở {$pl}, kiếm gãy làm ba.','Thú triều tràn qua {$pl}. Người ta tìm thấy di vật của {$a} giữa xác yêu thú.','{$a} độ kiếp thất bại, tro bụi bay khắp ba ngọn núi.','{$a} vào bí cảnh rồi không trở ra nữa. Tông môn đã dựng bia.'],
  the: ['{$s} mở sơn môn thu nhận đệ tử, thiếu niên khắp nơi nô nức kéo về.','{$s} mở kỳ đại bỉ: đệ tử trong tông lên lôi đài thi đấu.','Vạn Bảo Thương Hội treo vạn ngọn đèn khắp {$pl}: đăng hội mở, đấu giá theo sau.','Đại hội đấu giá ở {$pl} sắp mở, nghe đồn có cả {$dan}.','Mặt trời không mọc ở {$pl} đã mười ngày. Dân quanh đó chất củi, chèn cửa: Đêm Dài tới.','Yêu khí ở {$pl} bốc lên tận trời, thương đội đều đi đường vòng.','{$s} và {$s2} vì một mạch linh thạch mà đánh nhau, chết mấy chục đệ tử.','Trà lâu khắp nơi lại kể chuyện Ngũ Tổ chém Yêu Hoàng. Ai cũng thuộc, mà vẫn nghe.','Có sao chổi quét ngang trời, các đạo quan đều đóng cửa bói quẻ.','Lương thực mất mùa, phàm nhân dưới chân núi bán con lấy gạo.'],
};

// ================= DỮ LIỆU TRÒ CHƠI =================
const EL = {
  kim:{n:'Kim',c:'金'}, moc:{n:'Mộc',c:'木'}, thuy:{n:'Thủy',c:'水'}, hoa:{n:'Hỏa',c:'火'}, tho:{n:'Thổ',c:'土'},
  loi:{n:'Lôi',c:'雷'}, bang:{n:'Băng',c:'冰'}, phong:{n:'Phong',c:'風'}, am:{n:'Âm',c:'陰'}, phat:{n:'Phật',c:'佛'}, vo:{n:'Vô',c:'無'}
};
const KHAC = {kim:'moc', moc:'tho', tho:'thuy', thuy:'hoa', hoa:'kim', loi:'am', phat:'am', bang:'hoa'};
const NGUHANH = ['kim','moc','thuy','hoa','tho'];

const REALM = ['Luyện Khí','Trúc Cơ','Kết Đan','Nguyên Anh','Hóa Thần','Độ Kiếp'];
const TIEU = ['sơ kỳ','trung kỳ','hậu kỳ','viên mãn'];
const LIFE = [60,130,300,650,1500,3000];
const TAB = { // chỉ số gốc theo đại cảnh giới
  hp:[80,180,400,880,1900,4000], mp:[30,60,120,240,480,960],
  atk:[10,22,48,105,230,500], def:[3,7,15,32,70,150]
};
const TS = [1,2,4.5,10,22];         // nhịp thời gian theo vùng
// hệ số linh thạch theo vùng. Linh thạch quý: cả trăm là cả một gia tài, chừng 40 đã là nhiều.
const ECON=0.15,SC=[1,2.2,4.8,10,20].map(x=>x*ECON);
const EH = [32,75,170,380,840];     // khí huyết yêu ma thường
const EA = [11,24,54,120,265];
const ED = [2,5,11,24,52];

const ROOT = [
  {id:'thien',n:'Thiên linh căn',m:1.6,w:5,k:1,d:'Một hệ thuần khiết. Tu luyện cực nhanh.'},
  {id:'bien',n:'Biến dị linh căn',m:1.45,w:6,k:1,d:'Lôi, Băng hoặc Phong. Hiếm có, uy lực lạ.'},
  {id:'song',n:'Song linh căn',m:1.2,w:18,k:2,d:'Hai hệ. Tư chất tốt.'},
  {id:'tam',n:'Tam linh căn',m:1.0,w:30,k:3,d:'Ba hệ. Bình thường.'},
  {id:'tu',n:'Tứ linh căn',m:0.85,w:25,k:4,d:'Bốn hệ. Tu luyện chậm, học được nhiều hệ.'},
  {id:'tap',n:'Ngũ hành tạp linh căn',m:0.7,w:16,k:5,d:'Đủ năm hệ. Người đời gọi là phế linh căn.'},
];

const ORIGIN = [
  {id:'nong',n:'Con nhà nông',i:'🌾',fx:{hpP:10},d:'Khí huyết +10%',bio:'vốn là con nhà nông, tuổi thơ quanh quẩn bờ ruộng {$que}'},
  {id:'tran',n:'Con nhà trận sư',i:'🔯',fx:{ngo:2,tam:1},d:'Ngộ tính +2, đạo tâm +1',bio:'vốn là con nhà trận sư sa sút, lớn lên ở {$que}'},
  {id:'dote',n:'Con nhà đồ tể',i:'🔪',fx:{atkP:8,tam:-1},d:'Công +8%, đạo tâm −1',bio:'là con nhà đồ tể ở {$que}, từ nhỏ đã quen mùi máu'},
  {id:'thusinh',n:'Thư sinh nghèo',i:'📜',fx:{ngo:3,hpP:-5},d:'Ngộ tính +3, khí huyết −5%',bio:'là thư sinh nghèo ở {$que}, thi ba lần không đỗ'},
  {id:'khat',n:'Tiểu khất cái',i:'🥣',fx:{van:2,tp:2},st:-10,d:'Khí vận +2, thân pháp +2, không xu dính túi',bio:'là đứa trẻ ăn xin ở {$que}, không cha không mẹ'},
  {id:'thegia',n:'Con thứ thế gia',i:'🏯',st:45,pill:'hoixuan',d:'Thêm linh thạch và một viên đan',bio:'là con thứ của một thế gia ở {$que}, không được ai coi trọng'},
  {id:'mieu',n:'Đứa trẻ bị bỏ ở miếu',i:'🛕',fx:{tam:3},karma:5,d:'Đạo tâm +3',bio:'bị bỏ trước cửa miếu hoang ở {$que}, được lão từ giữ đền nuôi lớn'},
  {id:'ren',n:'Con nhà thợ rèn',i:'⚒️',fx:{defP:15},d:'Thủ +15%',bio:'là con nhà thợ rèn ở {$que}, tay chai từ năm lên tám'},
  {id:'daodong',n:'Tiểu đạo đồng',i:'☯️',fx:{mpP:15},skill:1,d:'Linh lực +15%, biết sẵn một môn pháp thuật',bio:'là đạo đồng quét sân trong một đạo quán nhỏ ở {$que}'},
  {id:'linh',n:'Cựu binh biên ải',i:'🛡️',fx:{hpP:10,atkP:5},age:6,d:'Khí huyết +10%, công +5%, nhập đạo muộn sáu năm',bio:'từng là lính biên ải {$quoc}, sống sót trở về {$que} với ba vết sẹo'},
  {id:'buon',n:'Con nhà buôn',i:'⚖️',st:70,d:'Thêm nhiều linh thạch',bio:'là con nhà buôn vải ở {$que}, giỏi tính toán hơn giỏi đánh nhau'},
  {id:'chai',n:'Con nhà chài lưới',i:'🎣',fx:{tp:3},d:'Thân pháp +3',bio:'là con nhà chài lưới ở {$que}, bơi giỏi trước khi biết đi'},
  {id:'duoc',n:'Dược đồng',i:'🌿',pill:'hoixuan',pill2:'giaidoc',d:'Thêm hai viên đan',bio:'là dược đồng cho một hiệu thuốc ở {$que}, thuộc lòng trăm vị thảo dược'},
  {id:'mahuyet',n:'Mang huyết mạch ma tộc',i:'🩸',fx:{atkP:12},karma:-10,tamma:10,d:'Công +12%, mang sẵn tâm ma',bio:'sinh ra ở {$que} với đôi mắt đỏ, dân làng gọi là con quỷ'},
  {id:'hat',n:'Con nhà gánh hát',i:'🎭',fx:{van:2,ngo:1},d:'Khí vận +2, ngộ tính +1',bio:'theo gánh hát rong khắp {$quoc}, giỏi đóng vai người khác'},
];

const TRAIT = [
  {id:'kiemtam',n:'Kiếm tâm',i:'🗡️',fx:{elP:{kim:25}},d:'Pháp thuật hệ Kim +25%'},
  {id:'thanluc',n:'Thiên sinh thần lực',i:'💪',fx:{atkP:15},d:'Công +15%'},
  {id:'menhcung',n:'Mệnh cứng',i:'🪨',fx:{hpP:20},d:'Khí huyết +20%'},
  {id:'chithuy',n:'Tâm như chỉ thủy',i:'🪷',fx:{tam:3,tammaRes:50},d:'Đạo tâm +3, tâm ma tăng chậm một nửa'},
  {id:'linhnhan',n:'Linh nhãn',i:'👁️',fx:{chkP:10},d:'Mọi phép thử +10%'},
  {id:'luoi',n:'Ba tấc lưỡi',i:'👅',fx:{shopP:20},d:'Mua đồ rẻ 20%'},
  {id:'yeuhuyet',n:'Huyết mạch yêu tộc',i:'🐾',fx:{regenHp:3},d:'Mỗi lượt hồi 3% khí huyết'},
  {id:'thiendo',n:'Thiên đố anh tài',i:'🌩️',fx:{ngo:5,lifeP:-15},d:'Ngộ tính +5, thọ nguyên −15%'},
  {id:'phuctinh',n:'Phúc tinh cao chiếu',i:'🍀',fx:{van:5},d:'Khí vận +5'},
  {id:'hoalinh',n:'Hỏa linh thể',i:'🔥',fx:{elP:{hoa:25},burnHit:0.15},d:'Hỏa +25%, mỗi đòn gây thêm Thiêu'},
  {id:'bangco',n:'Băng cơ ngọc cốt',i:'❄️',fx:{defP:20,elP:{thuy:15,bang:15}},d:'Thủ +20%, Thủy và Băng +15%'},
  {id:'truongtho',n:'Trường thọ',i:'🐢',fx:{lifeP:25},d:'Thọ nguyên +25%'},
  {id:'bachdoc',n:'Bách độc bất xâm',i:'🧪',fx:{poisonImm:1,hpP:5},d:'Miễn nhiễm độc'},
  {id:'ngodao',n:'Ngộ đạo nhanh',i:'💫',fx:{tvP:20},d:'Tu vi nhận thêm 20%'},
  {id:'khotu',n:'Khổ tu',i:'⛰️',fx:{bqP:50},d:'Bế quan hiệu quả gấp rưỡi'},
  {id:'sattinh',n:'Sát tinh',i:'☄️',fx:{execute:30},d:'Đánh kẻ dưới 30% khí huyết +30%'},
  {id:'mongdu',n:'Mộng du tiên cảnh',i:'🌙',fx:{tvP:10,tam:2},d:'Tu vi +10%, đạo tâm +2'},
  {id:'huyenco',n:'Huyền cơ',i:'🎐',fx:{mpP:20,mpCost:-15},d:'Linh lực +20%, pháp thuật tốn ít hơn 15%'},
];

// ---- Công pháp / pháp thuật: [id, tên, hệ, bậc, linh lực, hiệu ứng, câu tả]
const SK_RAW = [
  ['ngukiem','Ngự Kiếm Thuật','vo',1,6,{p:1.35},'Phi kiếm rời vỏ, lượn một vòng rồi lao thẳng tới.'],
  ['kimcham','Kim Châm Quyết','kim',1,5,{p:.62,h:2,pierce:.5},'Mấy sợi kim quang mảnh như lông trâu bắn ra.'],
  ['duekim','Duệ Kim Kiếm Khí','kim',1,8,{p:1.6,crit:20},'Kiếm khí sắc lạnh xé gió.'],
  ['triendang','Triền Đằng Thuật','moc',1,6,{p:.8,poison:.35},'Dây leo mọc lên quấn chặt, gai đâm vào thịt.'],
  ['hoixuan','Thanh Mộc Hồi Xuân','moc',1,8,{heal:18,regen:2},'Lục quang mát rượi lan khắp kinh mạch.'],
  ['thuytien','Thủy Tiễn Thuật','thuy',1,5,{p:1.35},'Ba mũi tên nước xé không lao tới.'],
  ['hanbang','Hàn Băng Chưởng','thuy',1,7,{p:1.1,weak:2},'Chưởng phong lạnh buốt, sương đóng trên vạt áo đối phương.'],
  ['hoacau','Hỏa Cầu Thuật','hoa',1,7,{p:1.6},'Quả cầu lửa to bằng cái bát gào thét bay ra.'],
  ['phanhuyet','Phần Huyết Quyết','hoa',1,0,{selfHp:8,rage:2},'Máu trong người sôi lên, mắt đỏ ngầu.'],
  ['thachgiap','Thạch Giáp Thuật','tho',1,6,{block:1.6},'Đá vụn bay lên kết thành lớp giáp dày.'],
  ['lacthach','Lạc Thạch Thuật','tho',1,8,{p:1.2,stun:30},'Tảng đá từ trên cao giáng xuống.'],
  ['luuvan','Lưu Vân Bộ','phong',1,5,{p:.5,evade:1},'Thân hình nhòe đi như mây trôi.'],
  ['chuongloi','Chưởng Tâm Lôi','loi',1,9,{p:1.4,stun:35},'Lòng bàn tay lóe sáng, tia sét nổ đanh.'],
  ['canhkim','Canh Kim Liệt Không Trảm','kim',2,14,{p:2.4,pierce:.3},'Một đường kim quang chém xuống, không khí rách toạc.'],
  ['phanquang','Phân Quang Kiếm Ảnh','kim',2,14,{p:.55,h:4},'Một kiếm hóa bốn, ảnh thật khó phân.'],
  ['docchuong','Vạn Mộc Độc Chướng','moc',2,12,{p:.5,poison:.9,weak:1},'Sương xanh lục bốc lên, cỏ cây quanh đó héo rũ.'],
  ['khovinh','Khô Vinh Đạo','moc',2,12,{p:1.5,drain:50},'Sinh cơ của đối phương chảy ngược về phía ngươi.'],
  ['bichchuong','Huyền Thủy Bích Chướng','thuy',2,10,{block:2.2,cleanse:1},'Màn nước xanh thẫm dựng lên, sóng gợn không ngừng.'],
  ['phuchai','Phúc Hải Chưởng','thuy',2,14,{p:2.0,weak:2},'Chưởng ra như sóng dữ đổ ập.'],
  ['lietdiem','Liệt Diễm Phần Thiên','hoa',2,16,{p:1.7,burn:.8,vuln:2},'Lửa đỏ cuộn lên tận trời, đá cũng chảy thành nước.'],
  ['hoalong','Hỏa Long Quyết','hoa',2,15,{p:1.9,bonusIf:'dot'},'Rồng lửa gầm lên, lao vào chỗ thịt đang thối rữa.'],
  ['transon','Hậu Thổ Trấn Sơn Ấn','tho',2,15,{p:1.8,stun:45},'Ấn đá to như quả núi đè xuống.'],
  ['kimcuong','Kim Cương Bất Hoại','tho',2,12,{block:2.6,rage:1},'Da thịt ánh lên sắc vàng đồng.'],
  ['phongnhan','Phong Nhận Thuật','phong',2,10,{p:.7,h:3,evade:1},'Gió hóa thành lưỡi dao vô hình.'],
  ['bangphong','Băng Phong Thiên Lý','bang',2,14,{p:1.5,stun:40,weak:1},'Băng lan ra như mạng nhện, đông cứng mọi thứ.'],
  ['nhiephon','Nhiếp Hồn Âm','am',2,10,{p:1.0,weak:2,vuln:2},'Tiếng thì thầm chui thẳng vào thức hải.'],
  ['tukhi','Tử Khí Đông Lai','vo',2,12,{rage:2,heal:10},'Khí tím từ phương đông tràn vào thất khiếu.'],
  ['vankiem','Vạn Kiếm Quy Tông','kim',3,26,{p:.55,h:6},'Ngàn vạn kiếm ảnh từ trời đổ xuống như mưa.'],
  ['truongsinh','Thanh Đế Trường Sinh Quyết','moc',3,22,{heal:35,regen:3,cleanse:1},'Vết thương khép lại, nơi máu rơi mọc lên hoa cỏ.'],
  ['thienha','Thiên Hà Đảo Quyển','thuy',3,26,{p:3.0,weak:2},'Cả dải ngân hà như đổ ngược xuống trần gian.'],
  ['tammuoi','Tam Muội Chân Hỏa','hoa',3,28,{p:2.4,burn:1.6},'Ngọn lửa trắng xanh, nóng đến mức không còn khói.'],
  ['daidia','Đại Địa Chi Nộ','tho',3,26,{p:2.6,stun:55},'Mặt đất nứt toác, nuốt lấy chân đối phương.'],
  ['cuutieu','Cửu Tiêu Thần Lôi','loi',3,30,{p:3.2,stun:40},'Chín đạo sấm từ cửu tiêu giáng xuống.'],
  ['huyetma','Huyết Ma Đại Pháp','am',3,0,{selfHp:12,p:3.0,drain:30},'Máu ngươi hóa thành sương đỏ, nuốt chửng đối phương.'],
  ['daibi','Đại Bi Chưởng','phat',3,20,{p:2.0,heal:15},'Phật quang vàng nhạt, một chưởng mà như có ngàn tay.'],
  ['trutien','Tru Tiên Kiếm Trận','kim',4,40,{p:.6,h:8,pierce:1},'Bốn thanh kiếm cắm bốn phương, trời đất hóa thành lò sát.'],
  ['phanthien','Phần Thiên Diệt Thế','hoa',4,45,{p:4.0,burn:2},'Bầu trời cháy đỏ, mặt trời như rơi xuống.'],
  ['voluong','Vô Lượng Băng Phong','thuy',4,40,{p:3.0,stun:70,weak:2},'Vạn dặm hóa thành băng nguyên trong một hơi thở.'],
  ['vanco','Vạn Cổ Thanh Thiên','moc',4,38,{heal:50,regen:3,cleanse:1,rage:1},'Cây cổ thụ hư ảnh vươn cao chạm trời, che chở cho ngươi.'],
  ['banco','Bàn Cổ Khai Thiên Ấn','tho',4,45,{p:4.0,vuln:3},'Một ấn bổ xuống như khai thiên lập địa.'],
  ['thienphat','Thiên Phạt Lôi Kiếp','loi',4,50,{p:5.0},'Ngươi mượn thiên uy, sét đánh không chừa một tấc.'],
  ['tieudao','Tiêu Dao Du','phong',4,30,{p:1.2,h:3,evade:2},'Cưỡi gió mà đi, thân như không có trọng lượng.'],
  ['thaicuc','Thái Cực Huyền Công','vo',4,35,{block:2.5,p:2.5},'Âm dương xoay chuyển, công thủ hợp nhất.'],
];
const SK = {};
const SK_PHYS=['ngukiem','kimcham','duekim','canhkim','phanquang','vankiem','trutien','phongnhan','luuvan','tieudao','thaicuc','phanhuyet','huyetma','lacthach','transon','daidia','banco'];
const SK_CHARGE=['cuutieu','thienha','banco','thienphat','phanthien','daidia','voluong'];
const SK_AOE=['vankiem','trutien','lietdiem','docchuong','phanthien','nhiephon','bangphong'];
const SK_DAO=['vankiem','truongsinh','tammuoi','daibi','trutien','vanco','tieudao','thaicuc'];
SK_RAW.forEach(([id,n,el,t,c,fx,f])=>{fx=Object.assign({},fx);
  if(SK_CHARGE.includes(id)){fx.charge=true;if(fx.p)fx.p=Math.round(fx.p*1.35*100)/100;}
  if(SK_AOE.includes(id))fx.aoe=true;
  SK[id]={id,n,el,t,c,fx,f,dao:SK_DAO.includes(id)?1:0,dt:SK_PHYS.includes(id)?'vl':'phep'};});
const BASIC = {id:'_atk',n:'Đánh thường',el:'vo',t:0,c:0,fx:{p:1.0},f:'',dt:'vl'};

// ---- Pháp bảo: nguyên mẫu hiệu ứng + tên gốc
const RELIC_K = [
  {k:'kiem',b:['Kiếm','Trường Kiếm','Đoản Kiếm','Cổ Kiếm'],fx:{atkP:10}},
  {k:'dao',b:['Đao','Trảm Mã Đao','Đoản Đao'],fx:{atkP:7,crit:5,critDmg:10}},
  {k:'hotam',b:['Hộ Tâm Phù','Hộ Tâm Ngọc','Hộ Tâm Kính'],fx:{hoTam:6,defP:5}},
  {k:'phap',b:['Pháp Trượng','Phất Trần','Bảo Châu'],fx:{matkP:12}},
  {k:'giap',b:['Giáp','Nhuyễn Giáp','Hộ Tâm Kính'],fx:{defP:20}},
  {k:'bao',b:['Đạo Bào','Pháp Y','Phi Phong'],fx:{hpP:12}},
  {k:'boi',b:['Ngọc Bội','Ngọc Quyết','Ngọc Bài'],fx:{mpP:18}},
  {k:'ngoa',b:['Ngoa','Vân Hài','Đạp Vân Ngoa'],fx:{tp:3,dodge:3}},
  {k:'linh',b:['Linh','Chung','Khánh'],fx:{startBlock:12}},
  {k:'hoan',b:['Hoàn','Thủ Trạc','Kim Hoàn'],fx:{regenMp:6}},
  {k:'dinh',b:['Đỉnh','Đan Lô','Lư Hương'],fx:{pillP:30}},
  {k:'phien',b:['Phiên','Cờ Lệnh','Hồn Phiên'],fx:{poisonHit:.15}},
  {k:'chau',b:['Châu','Dạ Minh Châu','Định Phong Châu'],fx:{regenHp:3}},
  {k:'kinh',b:['Kính','Đồng Kính','Chiếu Yêu Kính'],fx:{reflect:15}},
  {k:'gian',b:['Ngọc Giản','Bí Lục','Kinh Quyển'],fx:{tvP:15}},
  {k:'an',b:['Ấn','Phiên Thiên Ấn','Triện'],fx:{stunP:8}},
  {k:'tram',b:['Trâm','Thoa','Bộ Diêu'],fx:{dodge:6}},
  {k:'holo',b:['Hồ Lô','Ngọc Bình','Tịnh Bình'],fx:{healAfter:10}},
  {k:'thap',b:['Tháp','Bảo Tháp','Linh Lung Tháp'],fx:{defP:8,blockTurn:4}},
  {k:'tan',b:['Tán','Bảo Tán','Hoa Cái'],fx:{firstEvade:1}},
  {k:'cam',b:['Cầm','Ngọc Địch','Tiêu'],fx:{weakStart:1}},
  {k:'xich',b:['Xích','Khổn Tiên Thằng','Khốn Tác'],fx:{vulnStart:1}},
  {k:'but',b:['Bút','Nghiên','Thần Bút'],fx:{ngo:3}},
  {k:'tui',b:['Càn Khôn Đại','Trữ Vật Đại'],fx:{stonesP:20,pillSlot:2}},
  {k:'nhan',b:['Nhẫn','Ban Chỉ'],fx:{van:3,crit:3,critDmg:8}},
  {k:'lenh',b:['Lệnh Bài','Phù Tiết'],fx:{tam:3,shopP:8}},
  {k:'dang',b:['Đăng','Liên Đăng','Lưu Ly Đăng'],fx:{tam:2,tammaRes:30}},
  {k:'cot',b:['Yêu Nha','Yêu Đan','Thú Cốt'],fx:{execute:20}},
  {k:'huyet',b:['Huyết Ngọc','Huyết Tinh'],fx:{drain:8}},
  {k:'phu',b:['Hộ Mệnh Phù','Phù Lục'],fx:{hpP:6,defP:8}},
  {k:'hap',b:['Kiếm Hạp'],fx:{elX:20}},
];
const RELIC_PRE = {
  kim:['Canh Kim','Tử Kim','Huyền Thiết','Xích Đồng','Ngân Nguyệt','Thanh Phong'],
  moc:['Thanh Mộc','Bích Ngọc','Lôi Kích Mộc','Tử Trúc','Thiên Tàm','Lục Liễu'],
  thuy:['Huyền Thủy','Băng Phách','Hàn Ngọc','Thương Lan','Bích Ba','Lưu Ly'],
  hoa:['Xích Diễm','Chu Tước','Liệt Dương','Hỏa Vân','Lưu Hỏa','Kim Ô'],
  tho:['Hậu Thổ','Huyền Hoàng','Thạch Tâm','Sơn Hà','Hoàng Sa','Tức Nhưỡng'],
  vo:['Cửu Long','Thất Tinh','Âm Dương','Bát Quái','Tứ Tượng','Thái Cực','Hỗn Nguyên','Vạn Tượng','Tiên Thiên','Như Ý','Phục Ma','Định Hải','Trấn Hồn','Tàn Nguyệt','Vô Ưu','Lưỡng Nghi','Thanh Tâm','Bích Lạc'],
};
const GRADE = ['Phàm phẩm','Linh phẩm','Bảo phẩm','Huyền phẩm','Tiên phẩm'];
const TM = [1,1.4,1.9,2.5,3.2];
const RELIC_LORE = [
  'Tương truyền là di vật của {$who}, {$sect}.','Trên thân khắc một hàng chữ nhỏ đã mờ: “{motto}”.','Có vết nứt chạy dọc, như từng đỡ một đòn rất nặng.','Cầm lên thấy ấm, như vẫn còn hơi người.','Do thợ rèn {$who} ở {$pl} luyện trong bốn mươi chín ngày.','Nghe nói từng qua tay bảy chủ nhân, không ai sống quá trăm tuổi.','Khi trăng tròn, nó khẽ ngân lên như hát.','Đáy có con dấu của Vạn Bảo Thương Hội.','Bị chôn dưới đất trăm năm, gỉ sét chỉ phủ một lớp mỏng.','Lúc chạm vào, ngươi thoáng nghe tiếng ai thở dài.','Hoa văn mây cuộn, tay nghề ấy nay không còn ai làm được.','Người bán thề sống thề chết là đồ thượng cổ. Ngươi bán tín bán nghi.','Có dính một vệt máu khô, lau mãi không sạch.','Mùi trầm hương thoang thoảng, không biết từ đâu ra.'
];
const RELIC_UNIQUE = {
  nhancu:{name:'Nhẫn sắt cũ',k:'nhan',fx:{tvP:25,van:2},lore:'Chiếc nhẫn sắt đen, bên trong như có ai đang ngủ.',el:'vo'},
  honphien:{name:'Hồn Phiên Vô Chủ',k:'phien',fx:{poisonHit:.3,atkP:10,tam:-3},lore:'Lá cờ đen thêu trăm mặt người. Đêm đêm nghe tiếng khóc.',el:'am'},
  dongtam:{name:'Đồng Tâm Kết',k:'boi',fx:{hpP:15,tam:3,regenHp:2},lore:'Sợi dây đỏ thắt nút đồng tâm. Đầu kia ở trong tay một người.',el:'vo'},
  kiemgay:{name:'Kiếm Gãy Vô Danh',k:'kiem',fx:{atkP:22,crit:8},lore:'Chỉ còn nửa lưỡi, nhưng kiếm ý chưa tắt.',el:'kim'},
  mocu:{name:'Di Vật Kiếp Trước',k:'nhan',fx:{van:3,tvP:10,hpP:8},lore:'Thứ ngươi từng mang theo trong một đời khác.',el:'vo'},
  tamkinh:{name:'Vấn Tâm Kính',k:'kinh',fx:{reflect:25,tam:4,tammaRes:40},lore:'Soi vào thấy người, soi lâu thấy mình.',el:'vo'},
  longlan:{name:'Long Lân Hộ Tâm',k:'giap',fx:{defP:35,hpP:10},lore:'Vảy rồng già, to bằng cái mâm.',el:'thuy'},
  tinhthiet:{name:'Tinh Thiết Kiếm Phôi',k:'kiem',fx:{atkP:18,elX:15},lore:'Rơi từ trời xuống, vẫn còn nóng.',el:'kim'},
  loimoc:{name:'Lôi Kích Mộc Tâm',k:'hap',fx:{elX:30,stunP:8},lore:'Lõi gỗ bị sét đánh trăm năm, sờ vào tê rần.',el:'loi'},
  thientam:{name:'Thiên Tâm Ngọc',k:'boi',fx:{mpP:25,mpCost:-15,ngo:3},lore:'Trong ngọc có một vệt mây trôi mãi không dừng.',el:'vo'},
  lenhtong:{name:'Lệnh bài đệ tử',k:'lenh',fx:{tam:2,shopP:15,tvP:10},lore:'Lệnh bài khắc tên ngươi. Có nó, ngươi là người của tông môn.',el:'vo'},
};

// ---- Đan dược / phù lục
const PILL = {
  hoixuan:{n:'Hồi Xuân Đan',i:'🟢',x:35,d:'Hồi {x}% khí huyết',w:'any',p:22},
  tukhi:{n:'Tụ Khí Đan',i:'🔵',x:50,d:'Hồi {x}% linh lực',w:'any',p:18},
  baohuyet:{n:'Bạo Huyết Đan',i:'🔴',x:3,d:'Cuồng nộ +{x} trong trận',w:'combat',p:28},
  kimcang:{n:'Kim Cang Phù',i:'🟨',x:35,d:'Hộ thể {x}% khí huyết',w:'combat',p:24},
  loiphu:{n:'Chưởng Lôi Phù',i:'⚡',x:250,d:'Đánh một đòn {x}% công, hệ Lôi',w:'combat',p:30},
  giaidoc:{n:'Giải Độc Đan',i:'⚪',x:15,d:'Giải độc và thiêu, hồi {x}% khí huyết',w:'any',p:16},
  thanhanh:{n:'Thần Hành Phù',i:'🍃',x:0,d:'Chắc chắn thoát thân (trừ thủ lĩnh)',w:'combat',p:26},
  dinhthan:{n:'Định Thần Đan',i:'🟣',x:25,d:'Tâm ma −{x}',w:'any',p:30},
  tinhnguyen:{n:'Tinh Nguyên Đan',i:'✨',x:12,d:'Tu vi +{x}%',w:'any',p:45},
  taytuy:{dao:1,n:'Tẩy Tủy Đan',i:'💠',x:6,d:'Khí huyết tối đa +{x}% vĩnh viễn',w:'any',p:60},
  khaitri:{dao:1,n:'Khai Trí Đan',i:'🧿',x:2,d:'Ngộ tính +{x}',w:'any',p:55},
  dientho:{n:'Diên Thọ Đan',i:'🍑',x:8,d:'Thọ nguyên +{x}%',w:'any',p:70},
  phacanh:{n:'Phá Cảnh Đan',i:'🌕',x:15,d:'Đặt vào ô chuẩn bị: đột phá +{x}%',w:'bt',p:55,bt:{rate:15}},
  homach:{n:'Hộ Mạch Đan',i:'🛡️',x:0,d:'Hộ mệnh: thất bại không mất tu vi, không trọng thương; gục giữa kiếp vẫn sống',w:'bt',p:70,bt:{guard:1}},
  bode:{n:'Bồ Đề Tử',i:'📿',x:0,d:'Hộ mệnh khi đột phá, giữ mạng khi gục giữa kiếp',w:'bt',p:90,bt:{guard:1}},
  tiloi:{n:'Tị Lôi Phù',i:'🪬',x:0,d:'Trợ kiếp: bớt một đạo lôi',w:'bt',p:65,bt:{kiepCut:1}},
  duongnguyen:{n:'Dưỡng Nguyên Đan',i:'🍵',x:20,d:'Trợ kiếp: vào kiếp được hộ thể {x}% khí huyết',w:'bt',p:50,bt:{kiepHp:20}},
  thiendao:{n:'Thiên Đạo Quả',i:'🍎',x:4,d:'Phẩm chất: đạo cơ +{x} khi đột phá',w:'bt',p:140,bt:{dao:4}},
  diamach:{n:'Địa Mạch Linh Nhũ',i:'🥛',x:3,d:'Phẩm chất: đạo cơ +{x} khi đột phá',w:'bt',p:100,bt:{dao:3}},
  nhanhoang:{n:'Nhân Hoàng Thảo',i:'🌿',x:2,d:'Phẩm chất: đạo cơ +{x} khi đột phá',w:'bt',p:70,bt:{dao:2}},
  linhnhu:{n:'Linh Nhũ Ngưng Thần',i:'💧',x:2,d:'Đạo cơ +{x} (tối đa 4 điểm mỗi cảnh giới từ đan dược)',w:'any',p:60,dao:2},
  trucco:{bt:{rate:30},n:'Trúc Cơ Đan',i:'🏵️',x:30,d:'Đặt vào ô chuẩn bị: đột phá Trúc Cơ +{x}%',w:'bt',realm:0,p:80},
  ngungkim:{bt:{rate:30},n:'Ngưng Kim Đan',i:'🌟',x:30,d:'Đột phá Kết Đan +{x}%',w:'bt',realm:1,p:90},
  phaanh:{bt:{rate:30},n:'Toái Đan Thành Anh Đan',i:'👶',x:30,d:'Đột phá Nguyên Anh +{x}%',w:'bt',realm:2,p:100},
  hoathan:{bt:{rate:30},n:'Hóa Thần Đan',i:'🌌',x:30,d:'Đột phá Hóa Thần +{x}%',w:'bt',realm:3,p:110},
};
const PQ = ['Hạ phẩm','Trung phẩm','Thượng phẩm'];
const PQM = [1,1.35,1.75];

// ---- Yêu ma
const DESC = {
  kim:['Thiết Bối','Ngân Giác','Kim Trảo','Đồng Bì','Kiếm Vĩ'], moc:['Thanh Mộc','Bích Lục','Độc Đằng','Lục Ảnh','Hoa Văn'],
  thuy:['Huyền Thủy','Lam Lân','Bích Ba','Hàn Đàm','Vụ Ảnh'], hoa:['Xích Diễm','Hỏa Vân','Liệt Dương','Phần Thiên','Hỏa Bối'],
  tho:['Hoàng Sa','Thạch Giáp','Sơn Nhạc','Hậu Bì','Độn Địa'], loi:['Lôi Dực','Điện Quang','Tử Lôi'], bang:['Băng Lân','Sương Phách','Hàn Băng'],
  am:['Âm Ảnh','Huyết Văn','Xích Mục','Độc Nhãn','Cuồng Huyết','Hắc Phong','Quỷ Diện'], vo:['Hắc Phong','Xích Mục','Độc Nhãn','Cuồng Huyết','Huyết Văn'],
};
const EN = {
  lang:{f:'thu',i:'🐺',nb:['Lang','Yêu Lang'],hp:.9,atk:1,def:.8,pat:['atk','multi','atk','rage'],el:['moc','tho','bang','am','vo'],pl:['rung','nui','hoang','tran']},
  ho:{f:'thu',i:'🐯',nb:['Hổ','Bạch Hổ','Mãnh Hổ'],hp:1.1,atk:1.1,def:1,pat:['atk','charge','heavy','atk'],el:['kim','hoa','vo'],pl:['rung','nui']},
  mang:{f:'thu',i:'🐍',nb:['Mãng','Xà','Thanh Xà'],hp:1,atk:.9,def:.9,pat:['poison','atk','poison','drain'],el:['moc','thuy','am'],pl:['rung','song','dong','phe']},
  hung:{f:'thu',i:'🐻',nb:['Hùng','Bạo Hùng'],hp:1.4,atk:1,def:1.2,pat:['atk','block','charge','heavy'],el:['tho','moc','vo'],pl:['rung','nui']},
  ung:{f:'thu',i:'🦅',nb:['Ưng','Điêu','Thứu'],hp:.8,atk:1,def:.6,pat:['multi','multi','atk','vuln'],el:['kim','phong','loi'],pl:['nui','hoang','bien']},
  holy:{f:'thu',i:'🦊',nb:['Hồ','Hồ Ly'],hp:.9,atk:.9,def:.8,pat:['weak','drain','atk','heal'],el:['hoa','am','moc'],pl:['rung','tran','phe']},
  quy:{f:'thu',i:'🐢',nb:['Quy','Huyền Quy'],hp:1.5,atk:.8,def:1.8,pat:['block','atk','block','charge','heavy'],el:['thuy','tho'],pl:['song','bien','dong']},
  chu:{f:'thu',i:'🕷️',nb:['Chu','Độc Chu'],hp:.8,atk:.9,def:.8,pat:['poison','weak','multi'],el:['am','moc'],pl:['dong','rung','phe','ma']},
  vien:{f:'thu',i:'🦍',nb:['Viên','Ma Viên'],hp:1.2,atk:1.1,def:1,pat:['rage','atk','charge','heavy'],el:['tho','kim','vo'],pl:['nui','rung']},
  ngac:{f:'thu',i:'🐊',nb:['Ngạc','Giao Ngạc'],hp:1.3,atk:1.1,def:1.3,pat:['atk','drain','charge','heavy'],el:['thuy','tho'],pl:['song','bien']},
  buc:{f:'thu',i:'🦇',nb:['Bức','Huyết Bức'],hp:.7,atk:.9,def:.5,pat:['drain','multi','drain'],el:['am','vo'],pl:['dong','phe','ma']},
  hat:{f:'thu',i:'🦂',nb:['Hạt','Độc Hạt'],hp:.9,atk:1,def:1.1,pat:['poison','atk','charge','heavy'],el:['hoa','tho','am'],pl:['hoang','dong','ma']},
  thiem:{f:'thu',i:'🐸',nb:['Thiềm','Độc Thiềm'],hp:1.1,atk:.9,def:1,pat:['poison','weak','atk'],el:['moc','thuy','am'],pl:['song','dong','rung']},
  giao:{f:'thu',i:'🐉',nb:['Giao','Giao Long'],hp:1.4,atk:1.2,def:1.2,pat:['atk','charge','heavy','multi','block'],el:['thuy','loi','hoa'],pl:['bien','song','thien']},
  sontac:{f:'nhan',i:'🗡️',t:['Sơn tặc','Đạo tặc','Mã tặc','Thủy tặc'],hp:1,atk:1,def:.9,pat:['atk','atk','rage','charge','heavy'],pl:['tran','rung','nui','song','hoang']},
  tantu:{f:'nhan',i:'🧙',t:['Tán tu','Tán tu tham lam','Kẻ đoạt bảo'],hp:1,atk:1,def:1,pat:['atk','block','weak','charge','heavy'],pl:['*']},
  matu:{f:'nhan',i:'😈',t:['Ma tu','Tà tu'],hp:1,atk:1.1,def:.9,pat:['drain','weak','atk','rage'],ma:1,pl:['*']},
  detu:{f:'nhan',i:'🥋',t:['Đệ tử {$sect}'],hp:1,atk:1,def:1,pat:['atk','multi','block','atk'],pl:['tong','thanh','nui']},
  satthu:{f:'nhan',i:'🥷',t:['Sát thủ','Ám vệ'],hp:.75,atk:1.3,def:.7,pat:['multi','weak','charge','heavy'],pl:['thanh','tran','ma','*']},
  votang:{f:'nhan',i:'📿',t:['Võ tăng','Khổ hạnh tăng'],tang:1,hp:1.2,atk:.9,def:1.3,pat:['block','atk','heal','atk'],pl:['nui','phe','tong']},
  luyenthi:{f:'nhan',i:'⚰️',t:['Luyện thi nhân','Cản thi sư'],hp:1,atk:1,def:1,pat:['poison','atk','drain','rage'],ma:1,pl:['phe','ma','hoang']},
  kiemtu:{f:'nhan',i:'⚔️',t:['Kiếm tu','Kiếm khách'],hp:.9,atk:1.25,def:.8,pat:['charge','heavy','multi','atk'],pl:['nui','tong','thien','*']},
  phusu:{f:'nhan',i:'🧧',t:['Phù sư','Đạo sĩ áo vàng'],dao:1,hp:.9,atk:1,def:.9,pat:['weak','atk','block','burn'],pl:['tran','thanh','phe']},
  ngunhan:{f:'nhan',i:'🧜',t:['Ngư nhân','Ngư nhân chiến binh'],noname:1,hp:1.1,atk:1,def:1.1,pat:['multi','atk','block','weak'],pl:['bien','song']},
  amhon:{f:'quy',i:'👻',nb:['Âm Hồn','Oán Hồn','U Hồn'],hp:.8,atk:1,def:.4,pat:['weak','drain','atk'],pl:['phe','dong','ma','tran','hoang']},
  cuongthi:{f:'quy',i:'🧟',nb:['Cương Thi','Hắc Cương','Mao Cương'],hp:1.4,atk:1,def:1.3,pat:['atk','atk','charge','heavy','poison'],pl:['phe','hoang','ma','dong']},
  kholau:{f:'quy',i:'💀',nb:['Khô Lâu','Bạch Cốt Binh'],hp:.9,atk:1,def:1.1,pat:['multi','block','atk'],pl:['phe','hoang','ma']},
  hoabi:{f:'quy',i:'🎭',nb:['Họa Bì','Mỹ Nhân Bì'],hp:.9,atk:1,def:.8,pat:['weak','drain','heal','atk'],pl:['tran','thanh','phe','ma']},
  thuyquy:{f:'quy',i:'🌊',nb:['Thủy Quỷ','Thủy Hầu Tử'],hp:1,atk:1,def:.8,pat:['weak','atk','drain'],pl:['song','bien']},
  oanlinh:{f:'quy',i:'🕯️',nb:['Oán Linh','Lệ Quỷ','Anh Linh'],hp:.9,atk:1.1,def:.6,pat:['vuln','drain','multi'],pl:['ma','phe','hoang']},
  khoiloi:{f:'vat',i:'🗿',nb:['Khôi Lỗi','Thạch Khôi','Đồng Nhân'],hp:1.5,atk:1,def:1.5,pat:['block','charge','heavy','atk'],pl:['phe','dong','tong','thien']},
  thienma:{f:'vat',i:'👹',nb:['Thiên Ma','Vực Ngoại Thiên Ma','Ma Tướng'],hp:1.1,atk:1.2,def:1,pat:['rage','drain','vuln','heavy'],pl:['ma','thien']},
  kiemlinh:{f:'vat',i:'🔱',nb:['Kiếm Linh','Kiếm Hồn'],hp:.8,atk:1.35,def:.8,pat:['multi','charge','heavy','multi'],pl:['thien','phe','nui']},
  trung:{f:'vat',i:'🪲',nb:['Hư Không Trùng','Phệ Linh Trùng'],hp:.9,atk:1,def:1.2,pat:['drain','multi','poison'],pl:['thien','hoang']},
  tinhthu:{f:'vat',i:'🌠',nb:['Tinh Thú','Lưu Tinh Thú'],hp:1.2,atk:1.1,def:1.1,pat:['burn','atk','charge','heavy'],pl:['thien','hoang']},
};
const REG_EN = [
  ['lang','ho','mang','hung','holy','chu','buc','sontac','tantu','amhon','kholau','thuyquy','cuongthi','phusu','thiem'],
  ['ho','mang','ung','vien','hat','quy','detu','tantu','matu','kiemtu','phusu','khoiloi','hoabi','holy','votang'],
  ['ngac','quy','thiem','ngunhan','mang','ung','matu','satthu','thuyquy','giao','hat','chu'],
  ['matu','luyenthi','cuongthi','kholau','oanlinh','hoabi','thienma','satthu','buc','hat','chu'],
  ['kiemlinh','khoiloi','thienma','trung','tinhthu','giao','kiemtu','oanlinh'],
];
const INTENT = {
  atk:{i:'⚔️',n:'Tấn công'}, multi:{i:'⚔️',n:'Liên kích'}, charge:{i:'🌀',n:'Tụ lực'}, heavy:{i:'💥',n:'Trọng kích'},
  block:{i:'🛡️',n:'Phòng thủ'}, rage:{i:'💢',n:'Cuồng nộ'}, poison:{i:'☠️',n:'Phun độc'}, burn:{i:'🔥',n:'Thiêu đốt'},
  weak:{i:'🥀',n:'Làm suy yếu'}, vuln:{i:'💔',n:'Phá giáp'}, drain:{i:'🩸',n:'Hút máu'}, heal:{i:'🌿',n:'Hồi phục'}, stun:{i:'💫',n:'Trấn áp'}
};
const BOSS = [
  [
    {id:'traichu',i:'🪓',n:'Trại chủ {$nick}',sub:'Thủ lĩnh {$trai}',el:'tho',pat:['atk','rage','charge','heavy','multi','block'],hp:4.2,atk:1.25,def:1.2,
      t:['Hắn ngồi trên chiếc ghế phủ da hổ, đao dựng bên cạnh còn dính máu chưa khô. “Lại một đứa muốn làm anh hùng.”','Sau lưng hắn là ba mươi tên lâu la, trước mặt là đống lửa nướng nửa con trâu. Hắn chùi mỡ lên áo, đứng dậy.']},
    {id:'thuyeu',i:'🌳',n:'Thụ Yêu Ngàn Năm',sub:'Linh thụ hóa yêu',el:'moc',pat:['poison','block','drain','charge','heavy','heal'],hp:4.6,atk:1.1,def:1.3,
      t:['Cây hòe già trước miếu bỗng mở mắt. Hàng nghìn rễ cây trồi lên khỏi mặt đất, trên đó còn vướng xương người.','Lá cây xào xạc thành tiếng người: “Ngàn năm… ngươi là kẻ thứ bao nhiêu nhỉ?”']},
    {id:'huyetlang',i:'🐺',n:'Huyết Lang Vương',sub:'Yêu thú nhị giai',el:'am',pat:['multi','rage','multi','charge','heavy'],hp:4.0,atk:1.3,def:1,
      t:['Tiếng tru vang dội cả thung lũng. Con sói đầu đàn to như con trâu, lông đỏ như nhuộm máu.','Bầy sói rẽ ra hai bên. Lang Vương bước tới, mỗi bước để lại một vết chân cháy đen.']},
  ],
  [
    {id:'phando',i:'🧔',n:'{$ten}',sub:'Phản đồ {$sect}',el:'kim',pat:['weak','atk','charge','heavy','drain','block'],hp:4.2,atk:1.25,def:1.1,
      t:['“{$sect} đuổi ta ba nghìn dặm, rốt cuộc lại sai một đứa ranh đến?” Hắn cười, kiếm quang quấn quanh người như rắn.','Áo đệ tử của hắn đã rách tả tơi, nhưng ánh mắt vẫn kiêu ngạo như ngày còn là chân truyền.']},
    {id:'hacgiao',i:'🐉',n:'Hắc Giao',sub:'Yêu giao trăm năm',el:'thuy',pat:['atk','poison','charge','heavy','block','multi'],hp:4.6,atk:1.2,def:1.2,
      t:['Mặt đầm sủi bọt. Một cái đầu to như cái chum nhô lên, sừng mới nhú, mắt vàng như hai ngọn đèn.','Nước rút xuống đột ngột. Giữa đáy đầm lộ ra một thân rắn đen bóng, vảy dày như mai rùa.']},
    {id:'giadan',i:'😈',n:'{$nick} Ma Quân',sub:'Ma tu giả đan',el:'am',pat:['drain','vuln','multi','charge','heavy','rage'],hp:4.0,atk:1.3,def:1,
      t:['Ma khí cuồn cuộn. Lão tóc trắng xóa mà mặt như đứa trẻ. “Giả đan cũng là đan. Huyết nhục của ngươi sẽ giúp ta thành thật.”','Trong động là chín cái đỉnh đồng, cái nào cũng sôi sùng sục thứ nước đỏ sệt.']},
  ],
  [
    {id:'ngunhantl',i:'🧜',n:'Ngư Nhân Thống Lĩnh',sub:'Chúa tể rạn san hô',el:'thuy',pat:['multi','block','charge','heavy','weak','atk'],hp:4.3,atk:1.25,def:1.2,
      t:['Tiếng tù và vỏ ốc rúc lên ba hồi. Thống lĩnh ngư nhân cưỡi trên lưng cá mập trắng, đinh ba xanh lè ánh độc.','Biển rẽ đôi. Kẻ cầm đầu tộc ngư nhân bước ra, cao gấp rưỡi người thường, vảy lấp lánh như giáp bạc.']},
    {id:'cuuvi',i:'🦊',n:'Cửu Vĩ Yêu Hồ',sub:'Yêu vương Thanh Khâu',el:'hoa',pat:['weak','drain','multi','heal','charge','heavy'],hp:4.0,atk:1.3,def:1,
      t:['Chín cái đuôi xòe ra như quạt lửa. Nàng cười, và ngươi bỗng quên mất mình đến đây làm gì.','Trên ngai bằng xương, một nữ tử áo trắng gác chân. “Người tu tiên các ngươi, thịt có vị khác hẳn.”']},
    {id:'haitroc',i:'🐙',n:'Hải Trọc Lão Yêu',sub:'Yêu vật biển sâu',el:'thuy',pat:['weak','multi','drain','block','charge','heavy'],hp:4.8,atk:1.15,def:1.3,
      t:['Những xúc tu to như cột đình trồi lên quanh thuyền. Ở giữa là một con mắt duy nhất, to bằng cái nong.','Nước biển đen lại như mực. Thứ gì đó dưới kia vừa thức giấc sau năm trăm năm.']},
  ],
  [
    {id:'maton',i:'👹',n:'{$nick} Ma Tôn',sub:'Chủ nhân một phương ma vực',el:'am',pat:['rage','drain','vuln','charge','heavy','multi'],hp:4.3,atk:1.3,def:1.1,
      t:['Ngai đá đen dựng trên núi xương. Người ngồi trên đó mỉm cười, giọng ôn hòa như thầy đồ: “Ngồi đi. Trước khi chết, nói chuyện chút đã.”','Huyết vân che kín trời. Ma Tôn giơ tay, cả vạn oan hồn cùng gào lên một lúc.']},
    {id:'thivuong',i:'🧟',n:'Thi Vương',sub:'Cương thi vạn năm',el:'tho',pat:['poison','block','atk','charge','heavy','heal'],hp:5,atk:1.15,def:1.4,
      t:['Nắp quan tài bằng đồng xanh từ từ trượt ra. Bên trong là một vị tướng quân, giáp trụ còn nguyên, mắt mở trừng trừng.','Cả nghĩa địa rung chuyển. Hàng nghìn bàn tay xương thò lên khỏi mặt đất, cùng chỉ về phía ngươi.']},
    {id:'huyethai',i:'🩸',n:'Huyết Hải Lão Tổ',sub:'Kẻ uống cạn một dòng sông',el:'am',pat:['drain','drain','rage','charge','heavy','vuln'],hp:4.5,atk:1.25,def:1.1,
      t:['Biển máu sôi lên, một bóng người từ từ đứng dậy, máu chảy ròng ròng mà không dính vào áo.','“Ba nghìn năm trước ta cũng là chính đạo.” Lão nói, giọng buồn như mưa. “Rồi ta khát.”']},
  ],
  [
    {id:'thumon',i:'🗿',n:'Thủ Môn Thiên Tướng',sub:'Kẻ giữ cửa trời',el:'kim',pat:['atk','multi','stun','charge','heavy','rage','block'],hp:5.2,atk:1.25,def:1.3,esc:1,
      t:['Một pho tượng đá cao trăm trượng đứng chắn cổ lộ. Khi ngươi tới gần, đôi mắt đá từ từ mở ra.','“Vạn năm qua, chưa ai qua được cửa này.” Giọng nói vang lên từ trong đá, nặng như núi.']},
  ],
];

const REG = [
  {n:'Phàm Trần',seal:'壹',sub:'Biên thùy {$quoc}',types:['tran','rung','nui','song','phe','thanh'],tint:['#C9B98E','#A99A72','#8A7F62'],sky:'#F6ECD2',
    intro:['Ngươi rời {$que} vào một sớm sương mù. Phía trước là núi, sau lưng là khói bếp. Đường tiên dài lắm, nhưng bước đầu tiên chỉ cần một bước.','Người trong làng tiễn ngươi đến đầu đường. Có người dúi vào tay ngươi gói xôi, có người lắc đầu. Ngươi không ngoảnh lại.']},
  {n:'Linh Sơn Vạn Lĩnh',seal:'貳',sub:'Đất của tông môn',types:['tong','nui','rung','thanh','dong','phe'],tint:['#A9BFA2','#7F9E86','#5F7E6A'],sky:'#EEF0DE',
    intro:['Trúc Cơ rồi, ngươi mới thấy được thế giới thật sự. Những ngọn núi ở đây lơ lửng trên mây, mỗi ngọn là một tông môn, mỗi tông môn là một vương quốc.','Phàm trần ở lại sau lưng như một giấc mơ cũ. Linh khí nơi đây đặc như sương, và người tu tiên ở đây nhìn nhau bằng ánh mắt dò xét.']},
  {n:'Đông Hải Yêu Vực',seal:'參',sub:'Vạn đảo, vạn yêu',types:['bien','song','dong','rung','hoang','thanh'],tint:['#9FB8BE','#7899A3','#566F7E'],sky:'#E8EEE8',
    intro:['Biển. Ngươi chưa từng thấy nhiều nước đến thế. Ngàn hòn đảo rải rác như sao, đảo nào cũng có chủ, chủ nào cũng không phải người.','Gió mặn thổi rát mặt. Ở Đông Hải, luật lệ duy nhất là sức mạnh, và yêu tộc nhớ dai hơn con người.']},
  {n:'Cửu U Ma Vực',seal:'肆',sub:'Nơi mặt trời không chiếu tới',types:['ma','hoang','phe','dong','thanh'],tint:['#B49A9A','#8A6F78','#5E4A5A'],sky:'#F0E2DA',
    intro:['Ranh giới ma vực là một con sông đen. Bên này còn có tiếng chim, bên kia chỉ còn tiếng gió. Ngươi bước qua cầu đá, và nghe thấy tiếng cười đâu đó.','Nghe nói ba nghìn năm trước, nơi đây là một thiên đường. Rồi có người mở một cánh cửa không nên mở.']},
  {n:'Cửu Thiên Cổ Lộ',seal:'伍',sub:'Con đường cuối cùng',types:['thien','phe','hoang','nui'],tint:['#D8CFB2','#BFB38F','#A29673'],sky:'#FBF6E6',
    intro:['Phía trên mây còn có mây. Con đường cổ bằng ngọc vắt qua hư không, trên đó rải rác di cốt của những kẻ đi trước.','Ở đây, thời gian trôi chậm như mật. Mỗi bước chân đều là một lần hỏi lại chính mình: vì sao ta tu tiên?']},
];

const UPG = [
  {id:'hp',n:'Căn cốt thâm hậu',i:'❤️',max:5,c:[6,10,16,24,34],d:'Khí huyết +8% mỗi bậc'},
  {id:'mp',n:'Linh hải mênh mông',i:'💧',max:5,c:[5,9,14,20,28],d:'Linh lực +10% mỗi bậc'},
  {id:'ngo',n:'Túc tuệ',i:'🧠',max:5,c:[6,10,16,24,34],d:'Ngộ tính +2 mỗi bậc'},
  {id:'st',n:'Phúc trạch',i:'💎',max:5,c:[4,8,12,18,26],d:'Linh thạch khởi đầu +5, khí vận +1 mỗi bậc'},
  {id:'menh',n:'Thiên mệnh',i:'🎴',max:2,c:[12,30],d:'Thêm một mệnh cách để chọn khi đầu thai'},
  {id:'tho',n:'Diên thọ',i:'⏳',max:5,c:[5,9,14,20,28],d:'Thọ nguyên +6% mỗi bậc'},
  {id:'ky',n:'Ký ức công pháp',i:'📖',max:2,c:[10,26],d:'Đầu thai mang theo pháp thuật bậc 1, bậc 2 thì là bậc 2'},
  {id:'nhan',n:'Thiên nhãn',i:'👁️',max:1,c:[18],d:'Thấy trước nội dung các lối rẽ'},
  {id:'tam',n:'Đạo tâm kiên định',i:'🪷',max:3,c:[6,12,20],d:'Đạo tâm +3 mỗi bậc'},
  {id:'hoi',n:'Hồi quang phản chiếu',i:'🕯️',max:1,c:[30],d:'Mỗi kiếp một lần, khi tử trận sống lại với 30% khí huyết'},
  {id:'duyen',n:'Cơ duyên',i:'🎁',max:1,c:[22],d:'Mỗi lần nhận thưởng có thêm một lựa chọn'},
  {id:'tui',n:'Càn khôn đại',i:'👝',max:2,c:[8,16],d:'Thêm 2 ô đan dược mỗi bậc'},
];

const ACH = [
  {id:'chet1',n:'Lần đầu luân hồi',d:'Chết lần đầu tiên.'},
  {id:'tc',n:'Trúc cơ',d:'Đạt Trúc Cơ.'},{id:'kd',n:'Kết đan',d:'Đạt Kết Đan.'},{id:'na',n:'Nguyên anh',d:'Đạt Nguyên Anh.'},{id:'ht',n:'Hóa thần',d:'Đạt Hóa Thần.'},
  {id:'phithang',n:'Phi thăng',d:'Vượt Cửu Trùng Lôi Kiếp.'},
  {id:'thien',n:'Thiện nhân',d:'Nhân quả từ +60 trở lên.'},{id:'ma',n:'Ma đầu',d:'Nhân quả từ −60 trở xuống.'},
  {id:'toahoa',n:'Tọa hóa',d:'Chết vì hết thọ nguyên.'},{id:'quyan',n:'Quy ẩn',d:'Gác kiếm về vườn.'},
  {id:'vokhuyet',n:'Kim đan vô khuyết',d:'Kết thành kim đan vô khuyết.'},{id:'baothu',n:'Nợ cũ',d:'Đánh bại kẻ đã giết ngươi kiếp trước.'},
  {id:'bang1',n:'Thiên kiêu đệ nhất',d:'Đứng đầu Thiên Kiêu Bảng.'},{id:'tram',n:'Bách chiến',d:'Hạ một trăm kẻ địch (cộng dồn các kiếp).'},
  {id:'baoan',n:'Ân tình',d:'Được người cũ báo ân.'},{id:'kiep5',n:'Ngũ thế',d:'Trải qua năm kiếp.'},
];

const LORE = {
  ngu_to:{n:'Ngũ Tổ chém Yêu Hoàng',t:'Ba vạn năm trước, Yêu Hoàng nuốt mặt trời, thiên hạ chìm trong đêm suốt chín năm. Năm vị tổ sư của năm tông môn liên thủ, chém đầu Yêu Hoàng trên Nam Thiên Môn. Máu nó bắn lên cửa trời, nên đến nay hoàng hôn vẫn đỏ.'},
  doan_thien:{n:'Đoạn Thiên chính sử',t:'Sử chép rằng thuở xưa người và tiên đi chung một con đường. Rồi có kẻ chặt đứt Thiên Thê, từ đó người tu tiên phải tự mở đường lên trời bằng lôi kiếp. Kẻ chặt Thiên Thê là ai, sử không chép. Trang ấy bị xé mất.'},
  van_bao:{n:'Vạn Bảo Thương Hội',t:'Không ai biết hội trưởng Vạn Bảo là ai. Thương hội có mặt ở mọi thành trì, mua mọi thứ, bán mọi thứ, kể cả tin tức. Thiên Kiêu Bảng do họ công bố mười năm một lần, chưa từng sai một ai.'},
  thien_kieu:{n:'Thiên Kiêu Bảng',t:'Mười năm một lần, Vạn Bảo Thương Hội treo bảng xếp hạng những người trẻ đáng sợ nhất thiên hạ. Có tên trên bảng là vinh dự, cũng là bia ngắm.'},
  linh_can:{n:'Luận về linh căn',t:'Ngũ hành tạp linh căn bị gọi là phế linh căn, vì linh khí vào người như nước vào rổ. Nhưng cổ thư có chép: Ngũ Tổ năm xưa, có một vị là tạp linh căn.'},
  kim_dan:{n:'Phẩm kim đan',t:'Kim đan chia làm hạ, trung, thượng phẩm. Trên thượng phẩm còn có vô khuyết, vạn người không được một. Người kết vô khuyết kim đan, thiên đạo cũng phải nhường ba phần.'},
  tam_ma:{n:'Tâm ma',t:'Tâm ma không đến từ bên ngoài. Mỗi lần ngươi làm điều mình biết là sai, nó lớn thêm một chút. Đến khi nó lớn hơn ngươi, nó sẽ là ngươi.'},
  long_cung:{n:'Long cung chìm',t:'Đông Hải từng có Long Cung, cung điện bằng san hô và ngọc trai dưới đáy biển sâu. Một đêm nọ, cả Long Cung chìm vào vực thẳm. Ngư dân nói những đêm biển lặng, còn nghe tiếng chuông vọng lên.'},
  ma_vuc:{n:'Cánh cửa Cửu U',t:'Ma vực vốn là Thanh Châu, đất lành chim đậu. Một vị đại năng muốn tìm đường trường sinh, mở cánh cửa thông sang U Minh. Cánh cửa không đóng lại được nữa.'},
  quy_thi:{n:'Quỷ thị',t:'Ở quỷ thị, thứ người ta trao đổi không phải linh thạch mà là năm tháng. Một năm thọ nguyên đổi một viên đan, mười năm đổi một môn công pháp. Có kẻ đổi hết, rồi chết ngay tại sạp.'},
  phi_thang:{n:'Kẻ phi thăng cuối cùng',t:'Đã ba nghìn năm không ai phi thăng. Có người nói tiên giới đã đóng cửa. Có người nói tiên giới chưa từng tồn tại. Chỉ có lôi kiếp là vẫn đến đều đặn.'},
  kiem_trung:{n:'Kiếm trủng',t:'Kiếm tu chết đi, kiếm không chết theo. Những thanh kiếm vô chủ tụ về một nơi, cắm kín một ngọn núi. Chúng chọn người, không phải người chọn chúng.'},
  luan_hoi:{n:'Luân hồi ấn',t:'Có những linh hồn mang dấu ấn trên trán mà mắt thường không thấy. Họ chết đi, sinh lại, mỗi kiếp nhớ thêm một chút. Cổ thư gọi họ là người đi lại trên Tiên Lộ.'},
  hu_khong:{n:'Hư không',t:'Bên ngoài trời còn có trời. Giữa các tầng trời là hư không, nơi thời gian và không gian vỡ vụn. Kẻ lạc trong hư không không chết, chỉ quên dần mình là ai.'},
  thien_dao:{n:'Thiên đạo vô tình',t:'Thiên đạo không thiện, không ác. Nó chỉ cân. Kẻ lấy quá nhiều sẽ bị đòi lại, kẻ cho quá nhiều sẽ được trả lại, sớm hay muộn mà thôi.'},
  tien_khu:{n:'Tiên khư',t:'Di tích của tiên nhân rơi xuống từ thượng giới. Bên trong có bảo vật, có truyền thừa, và có cả những thứ tiên nhân muốn vứt đi.'},
  chan_tuong:{n:'Chân tướng Tiên Lộ',t:'Ngươi đứng ở cửa trời và nhìn lại. Vạn kiếp luân hồi trải dài phía sau như một con đường. Mỗi kiếp chết đi không phải thất bại, mà là một viên đá lót đường. Tiên Lộ chưa bao giờ là con đường của một người.'},
};

// ================= LÕI TRÒ CHƠI =================
function hashS(s){let h=2166136261;for(const c of String(s)){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return h>>>0;}
function mul(a){return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
let RS=null; // khi khác null: mọi phép ngẫu nhiên dùng bộ sinh có hạt giống (mulberry32)
const R = ()=>RS?RS():Math.random();
function seeded(seed,fn){const o=RS;RS=mul(hashS(seed));try{return fn();}finally{RS=o;}}
const ri = (a,b)=>a+Math.floor(R()*(b-a+1));
const pick = a=>a[Math.floor(R()*a.length)];
const chance = p=>R()<p;
const clamp = (x,a,b)=>Math.max(a,Math.min(b,x));
const rnd1 = x=>Math.round(x*10)/10;
function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(R()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function wIdx(arr){let t=0;arr.forEach(x=>t+=(x.w==null?1:x.w));let r=R()*t;for(let i=0;i<arr.length;i++){r-=(arr[i].w==null?1:arr[i].w);if(r<=0)return i;}return arr.length-1;}
function wpick(arr,wf){let t=0;arr.forEach(x=>t+=wf(x));let r=R()*t;for(const x of arr){r-=wf(x);if(r<=0)return x;}return arr[arr.length-1];}

let G = {meta:null, run:null, birth:null, over:null, screen:'title'};

// ---------------- CHỮ ----------------
const BAG = {};
function bagPick(key,arr){let b=BAG[key];if(!b||!b.length){b=BAG[key]=shuffle([...arr.keys()]);}const i=b.pop();return arr[i<arr.length?i:0];}
function gp(o,path){return path.split('.').reduce((x,k)=>x==null?undefined:x[k],o);}
function capS(s){return s.replace(/(^|[.!?…:]\s+|“|\n)([a-zà-ỹđ])/g,(m,a,b)=>a+b.toUpperCase());}
function T(s,v){
  if(Array.isArray(s)) s=s.length?bagPick('_t'+s[0].slice(0,24),s):'';
  if(s==null) return '';
  v=v||{};
  let out=String(s), g=0;
  while(g++<8 && /[\[{]/.test(out)){
    const b4=out;
    out=out.replace(/\[([^\[\]{}]*?\|[^\[\]{}]*?)\]/g,(_,a)=>pick(a.split('|')));
    out=out.replace(/\{(\$?)([\w.]+)\}/g,(m,d,k)=>{
      if(d){const x=gp(v,k);return x!=null?String(x):'';}
      const pool=P[k];return pool?bagPick(k,pool):m;
    });
    if(out===b4)break;
  }
  return capS(out.replace(/\s+([,.!?])/g,'$1').replace(/ {2,}/g,' ').trim());
}
const up1 = s=>s?s[0].toUpperCase()+s.slice(1):s;
const lc1 = s=>s?s[0].toLowerCase()+s.slice(1):s;

// ---------------- TÊN ----------------
function genName(g,rare){const ho=chance(rare?0.45:0.16)?pick(NAME.ho2):pick(NAME.ho);return ho+' '+pick(g==='nu'?NAME.nu:NAME.nam);}
function tangName(){let a=pick(NAME.tang1),b=pick(NAME.tang2);while(b===a)b=pick(NAME.tang2);return a+' '+b;}
function daoName(){return pick(NAME.dao1)+' '+pick(NAME.dao2);}
function maName(){return pick(NAME.ma1)+' '+pick(NAME.ma2);}
function biName(){const r=R();if(r<0.55)return pick(NAME.bi1)+' '+pick(NAME.bi2);return pick(NAME.ho)+' '+pick(NAME.bi3);}
function placeName(type,w){
  if(type==='tong') return pick((w||G.meta.world).sects).n;
  let a=pick(PLACE.a),b=pick(PLACE.b),k=0;while((b===a||a.includes(b))&&k++<9)b=pick(PLACE.b);
  const s=pick(PLACE.sfx[type]||['Địa']);
  if(type==='tran'&&chance(.3)) return a+' '+s;
  return a+' '+b+' '+s;
}
function npc(kind){
  const pg=G.run?G.run.g:'nam';
  let g=kind==='nu'?'nu':kind==='nam'?'nam':chance(.5)?'nam':'nu';
  const o={g};
  if(kind==='gia'){g=o.g=chance(.72)?'nam':'nu';o.ten=pick(NAME.ho)+' '+pick(g==='nam'?NAME.nam:NAME.nu);o.hn=g==='nam'?'lão':'bà';o.xung=g==='nam'?'lão phu':'lão thân';o.goi=pg==='nam'?'tiểu hữu':'nha đầu';o.look=lc1(T('{look_gia_'+g+'}'));}
  else if(kind==='tang'){o.g='nam';o.ten=tangName();o.hn='vị tăng';o.xung='bần tăng';o.goi='thí chủ';o.look=lc1(T('{look_tang}'));}
  else if(kind==='dao'){o.g='nam';o.ten=daoName();o.hn='lão đạo';o.xung='bần đạo';o.goi='đạo hữu';o.look=lc1(T('{look_dao}'));}
  else if(kind==='ma'){o.g=g;o.ten=maName();o.hn=g==='nam'?'hắn':'mụ';o.xung='bản tọa';o.goi='tiểu bối';o.look=lc1(T('{look_ma}'));}
  else if(kind==='thuong'){o.g='nam';o.ten='chưởng quỹ '+pick(NAME.ho);o.hn='gã';o.xung='tiểu nhân';o.goi='khách quan';o.look=lc1(T('{look_thuong}'));}
  else if(kind==='hai'){o.ten=biName();o.hn=g==='nam'?'thằng bé':'con bé';o.xung='cháu';o.goi=pg==='nam'?'đại ca':'tỷ tỷ';o.look=lc1(T('{look_hai}'));}
  else if(kind==='pham'){o.ten=pick(NAME.ho)+' '+pick(NAME.bi3);o.g=/Nương|Tẩu|Bà|Muội/.test(o.ten)?'nu':'nam';o.hn=o.g==='nam'?'gã':'thị';o.xung='tiểu nhân';o.goi='tiên sư';o.look=lc1(T('{look_phamnhan}'));}
  else if(kind==='yeu'){o.ten=pick(DESC.vo.concat(DESC.am))+' '+pick(['Tộc trưởng','Đại tướng','Yêu sứ','Yêu vương']);o.hn='hắn';o.xung='bổn tọa';o.goi='người tu tiên';o.look='mắt vàng, tai nhọn, nanh dài quá môi';}
  else {o.ten=genName(g);o.hn=g==='nam'?'hắn':'nàng';o.xung=g==='nam'?'tại hạ':'tiểu nữ';o.goi=chance(.5)?'đạo hữu':(pg==='nam'?'huynh đài':'cô nương');o.look=lc1(T('{look_tre_'+g+'}'));}
  return o;
}

// ---------------- THẾ GIỚI (bền qua các kiếp) ----------------
const SECT_PRE={chinh:['Thanh Vân','Huyền Thiên','Thái Ất','Ngọc Hư','Tử Tiêu','Côn Lôn','Thiên Diễn','Lăng Tiêu','Bạch Vân','Ngân Hạc','Thiên Hà','Huyền Vũ','Thái Chung','Thanh Nguyệt','Hàn Chung','Lạc Hà','Đan Hà','Vấn Đạo','Lưu Vân','Thái Hư','Quy Nguyên'],ma:['Huyết Sát','Âm Phong','Vạn Băng','Cửu U','Thiên Ma','Hợp Hoan','Bách Độc','Tàn Ẩn','Phệ Hồn','Huyết Ảnh','Hắc Sát','Thi Âm','Vô Gian','U Minh'],phat:['Kim Cương','Đại Bi','Bồ Đề','Tịnh Thổ','Lạn Kha','Thiền Tâm','Vô Tướng','Bát Nhã'],trung:['Bạch Nguyệt','Thần Hà','Bách Thảo','Vạn Thú','Linh Lung','Thiên Cơ','Phiêu Miểu']};
const SECT_SFX={kiem:['Kiếm Tông','Kiếm Phái','Kiếm Các','Kiếm Sơn Trang'],dan:['Cốc','Đan Tông','Đan Các'],dao:['Tông','Môn','Cung','Phái'],tran:['Trận Tông','Trận Các'],khi:['Khí Tông','Khí Phái'],phu:['Phù Môn','Phù Tông'],ma:['Ma Tông','Ma Giáo','Sát Tông','Huyết Điện'],am:['Âm Phái','Thi Động','Quỷ Tông'],phat:['Tự','Thiền Viện'],thu:['Ngự Thú Môn','Linh Thú Sơn']};
function genWorld(seed){
  seed=seed||Math.floor(Math.random()*1e9);
  return seeded('w'+seed,()=>{const w=genWorld0();w.seed=seed;w.t=0;w.bangY=1010;w.ents=[];w.legacy=[];w.nemesis=null;w.chron=[];w.lastBirth=null;
    w.regions=[0,1,2,3,4].map(k=>seeded(seed+':r'+k,()=>genRegion(k,w)));w.rstate=w.rivals.map((x,i)=>({i,realm:0,prog:ri(10,60),alive:true,age:ri(16,22)}));return w;});
}
function genWorld0(){
  const used=new Set();
  const mk=(al,kind)=>{let p,k=0;do{p=pick(SECT_PRE[al]);}while(used.has(p)&&k++<20);used.add(p);return {n:p+' '+pick(SECT_SFX[kind]),al,kind};};
  const sects=[mk('chinh','kiem'),mk('chinh','dan'),mk('chinh','dao'),mk('chinh',pick(['tran','khi','phu'])),mk('ma','ma'),mk('ma','am'),mk('phat','phat')];
  if(chance(.5)) sects.push(mk('trung','thu')); else sects.push({n:pick(NAME.ho2)+' Thế Gia',al:'trung',kind:'the'});
  const rivals=[];const usedN=new Set();
  for(let i=0;i<7;i++){
    const s=sects[i%sects.length];
    let g=s.kind==='phat'?'nam':(chance(.5)?'nam':'nu');
    let ten,k=0;do{ten=s.kind==='phat'?tangName():genName(g,true);}while(usedN.has(ten)&&k++<20);usedN.add(ten);
    const tt={kiem:g==='nam'?'kiếm tử':'kiếm tiên tử',dan:g==='nam'?'đan tử':'đan tiên tử',phat:'phật tử',ma:g==='nam'?'ma tử':'yêu nữ',am:g==='nam'?'quỷ tử':'âm nữ',the:g==='nam'?'thiếu chủ':'đại tiểu thư',thu:g==='nam'?'thú vương tử':'linh thú tiên tử'}[s.kind]||(g==='nam'?'thánh tử':'thánh nữ');
    rivals.push({ten,g,s:i%sects.length,tt,el:pick(['kim','moc','thuy','hoa','tho','loi','bang','phong']),tinh:s.al==='ma'?pick(['hiem','hiem','loi']):pick(['nghia','nghia','loi','hiem']),tal:rnd1(0.85+R()*0.55)});
  }
  return {quoc:pick(['Lương Quốc','Triệu Quốc','Đại Tề','Tây Lương','Bắc Yến','Nam Chiếu','Đại Hạ','Việt Quốc','Đại Chu']),sects,rivals};
}
function newMeta(){return {opt:{},v:SAVE_V,pts:0,total:0,upg:{},lives:[],lore:[],ach:[],kills:0,world:genWorld(),last:null,nlife:0};}
const SAVE_V=3;
const U = id=>(G.meta&&G.meta.upg[id])||0;

// ---------------- NGƯỜI CHƠI ----------------
function pView(){const r=G.run;return {ten:r.ten,cn:r.g==='nam'?'công tử':'cô nương',ht:r.g==='nam'?'huynh đài':'cô nương',dh:r.g==='nam'?'huynh':'tỷ',sd:r.g==='nam'?'sư đệ':'sư muội',tt:r.g==='nam'?'tiểu tử':'nha đầu',ong:r.g==='nam'?'ông lão':'bà lão'};}
function rootView(r){const R0=ROOT.find(x=>x.id===r.id);return {n:R0.n,els:r.els,m:R0.m};}
function relicFx(rel){
  const o={};const m=TM[rel.tier||0];
  for(const [k,v] of Object.entries(rel.fx||{})){
    if(['firstEvade'].includes(k)) o[k]=v+((rel.tier||0)>=3?1:0);
    else if(['weakStart','vulnStart'].includes(k)) o[k]=v+Math.floor((rel.tier||0)/2);
    else if(['pillSlot'].includes(k)) o[k]=v;
    else if(k==='poisonHit') o[k]=rnd1(v*m*100)/100;
    else o[k]=Math.round(v*m);
  }
  return o;
}
function aggFx(){
  const r=G.run, fx={elP:{}};
  const add=(src)=>{if(!src)return;for(const[k,v]of Object.entries(src)){if(k==='elP'){for(const[e,x]of Object.entries(v))fx.elP[e]=(fx.elP[e]||0)+x;}else fx[k]=(fx[k]||0)+v;}};
  const og=ORIGIN.find(o=>o.id===r.origin);add(og&&og.fx);
  const tr=TRAIT.find(t=>t.id===r.trait);add(tr&&tr.fx);
  for(const rel of r.relics){const f=relicFx(rel);if(f.elX){fx.elP[rel.el]=(fx.elP[rel.el]||0)+f.elX;delete f.elX;}add(f);}
  add({hpP:U('hp')*8,mpP:U('mp')*10,ngo:U('ngo')*2,tam:U('tam')*3,van:U('st'),lifeP:U('tho')*6,pillSlot:U('tui')*2});
  return fx;
}
function tieu(){const t=G.run.tv;if(typeof lkOn==='function'&&lkOn()){const g=lkTang();return g>=9?3:g>=7?2:g>=4?1:0;}return t>=100?3:t>=66?2:t>=33?1:0;}
function S(){
  const r=G.run, fx=aggFx(), b=r.bon, k=tieu()*0.18, R0=r.realm;
  const lerp=(a)=>a[R0]+(a[R0+1]-a[R0])*k;
  const dq=qMulAll(r); // hệ số phẩm chất nhân dồn, chỉ nhân ở đây
  const s={fx};
  s.maxHp=Math.round(lerp(TAB.hp)*(1+((fx.hpP||0)+b.hpP)/100)*dq);
  s.maxMp=Math.round(lerp(TAB.mp)*(1+((fx.mpP||0)+b.mpP)/100)*dq);
  s.atk=Math.round(lerp(TAB.atk)*(1+((fx.atkP||0)+b.atkP)/100)*dq);
  s.def=Math.round(lerp(TAB.def)*(1+((fx.defP||0)+b.defP)/100)*dq);
  s.tp=r.base.tp+b.tp+(fx.tp||0)+R0*2; s.ngo=r.base.ngo+b.ngo+(fx.ngo||0)+R0*2;
  s.van=r.base.van+b.van+(fx.van||0); s.tam=r.base.tam+b.tam+(fx.tam||0)+R0*2;
  s.matk=Math.round(lerp(TAB.atk)*(1+((fx.matkP||0)+(fx.mpP||0)*0.4+(b.matkP||0))/100)*dq);
  s.crit=5+s.van*0.5+(fx.crit||0); s.critDmg=150+(fx.critDmg||0); s.hoTam=R0*2+(fx.hoTam||0);
  s.cx=10+2*R0; s.ne=s.tp+Math.round((fx.dodge||0)*0.5); s.hoi=10+2*R0;
  s.life=Math.round(LIFE[R0]*(1+(fx.lifeP||0)/100+QLIFE[(r.quality||[])[R0]||0]/100)+r.lifeAdj);
  s.pillMax=5+(fx.pillSlot||0);
  s.tvM=rootView(r.root).m*(1+s.ngo/60)*(1+(fx.tvP||0)/100);
  return s;
}
function clampHp(){const s=S();G.run.hp=clamp(G.run.hp,0,s.maxHp);G.run.mp=clamp(G.run.mp,0,s.maxMp);}
function realmText(r){r=r||G.run;return REALM[r.realm]+' '+TIEU[r.realm===G.run?.realm&&r===G.run?tieu():0];}
function realmLabel(){const r=G.run;return qualName(r.realm,(r.quality||[])[r.realm]||0)+' '+TIEU[tieu()];}
function log(t){const r=G.run;r.log.push({a:Math.floor(r.age),t});if(r.log.length>240)r.log.shift();}
function bio(t){G.run.bio.push(t);}
function karmaName(k){return k>=60?'Đại thiện':k>=25?'Thiện':k<=-60?'Ma đầu':k<=-25?'Tà':'Trung dung';}

// ---------------- ĐẦU THAI ----------------
function genRoot(){
  const R0=wpick(ROOT,x=>x.w);let els;
  if(R0.id==='bien') els=[pick(['loi','bang','phong'])];
  else els=shuffle(NGUHANH.slice()).slice(0,R0.k);
  return {id:R0.id,els};
}
function birthNode(){const w=W();let pool=regionOf(0).nodes.filter(n=>n.type==='tran'&&n.id!==w.lastBirth);if(!pool.length)pool=regionOf(0).nodes.filter(n=>n.type==='tran'||n.type==='thanh');return pick(pool);}
function genBirth(){
  const n=3+U('menh');const cards=[];
  for(let i=0;i<n;i++){
    const g=chance(.5)?'nam':'nu';
    const og=pick(ORIGIN), tr=pick(TRAIT);
    const home=birthNode();
    cards.push({ten:genName(g),g,origin:og.id,trait:tr.id,root:genRoot(),que:home.name,at:home.id,
      base:{tp:5+ri(0,3),ngo:8+ri(0,4),van:3+ri(0,3),tam:8+ri(0,3)}});
  }
  G.birth={cards};G.screen='birth';
}
function newRun(c){
  const og=ORIGIN.find(o=>o.id===c.origin);
  const r=G.run={ten:c.ten,g:c.g,origin:c.origin,trait:c.trait,root:c.root,que:c.que,base:c.base,
    age:16+(og.age||0),birthAge:16+(og.age||0),bornT:G.meta.world.t,at:c.at,moving:null,reveal:[],passes:[],bossDone:[0,0,0,0,0],tvMinor:0,maxRegion:0,party:[],quests:[],dao:0,quality:[0,0,0,0,0],speed:1,realm:0,tv:0,hp:1,mp:1,bon:{atkP:0,defP:0,hpP:0,mpP:0,tp:0,ngo:0,van:0,tam:0},
    tamma:og.tamma||0,karma:og.karma||0,st:Math.round((25+(og.st||0)+U('st')*25)*ECON*1.4),skills:[],relics:[],pills:[],
    region:0,kills:0,bossKills:0,evDone:0,evCount:{},evRecent:[],flags:{},seeds:[],log:[],bio:[],
    lifeAdj:0,btFail:0,daoSk:0,daoPill:0,revived:false,news:[],bang:null,place:{n:c.que,t:'tran'},
    rivals:(G.meta.world.rstate||G.meta.world.rivals.map((x,i)=>({i,realm:0,prog:ri(10,60),alive:true,age:18}))).map(x=>({i:x.i,realm:x.realm,prog:x.prog,alive:x.alive,age:x.age||18,rel:0})),
    kiep:G.meta.nlife+1,scene:null,lastPicks:{},maxRealm:0};
  if(c.trait==='loithan') r.root.els.push('loi');
  r.st=Math.max(0,r.st);
  // không còn công pháp khởi đầu cho mọi kiếp: chỉ xuất thân hoặc ký ức kiếp trước mới có
  if(og.skill||U('ky')){const t=U('ky')>=2?2:1;const pool=SK_RAW.filter(s=>s[3]===t&&!r.skills.find(k=>k.id===s[0]));r.skills.push({id:pick(pool)[0],lv:1,src:og.skill?'xuat':'ky'});}
  if(og.pill) r.pills.push({id:og.pill,q:0});
  if(og.pill2) r.pills.push({id:og.pill2,q:0});
  const s=S();r.hp=s.maxHp;r.mp=s.maxMp;
  G.meta.nlife++;
  log(`Kiếp thứ ${r.kiep}: ${r.ten}, ${og.n.toLowerCase()}, quê ở ${r.que}.`);
  bio(T(`${r.ten} ${og.bio}.`,{que:r.que,quoc:G.meta.world.quoc}));
  for(const L of (G.meta.world.legacy||[]))if(L.feud&&!L.used&&chance(.5)){L.used=1;r.seeds.push({t:'oan',ten:L.ten,hn:L.hn,d:L.d+' (kiếp trước, khi ngươi còn là '+L.who+')',r:0,at:G.meta.world.t-60*HD});}
  G.birth=null;G.screen='map';G.meta.world.lastBirth=c.at;
  arrive(c.at);
  r.scene={type:'region',text:T(REG[0].intro,{que:r.que})};
  saveSoon();
}

// ---------------- BIẾN NGỮ CẢNH ----------------
function rivalView(rv){const w=G.meta.world.rivals[rv.i];return {ten:w.ten,tt:w.tt,sect:G.meta.world.sects[w.s].n,hn:w.g==='nam'?'hắn':'nàng',realm:REALM[rv.realm],rank:rankOf(rv.i)};}
function rankOf(i){const b=G.run.bang;if(!b)return '?';const k=b.ds.findIndex(x=>x.i===i);return k<0?'?':k+1;}
function btPill(){return ['trucco','ngungkim','phaanh','hoathan','phacanh'][Math.min(4,G.run.realm)];}
function baseV(type){
  const w=G.meta.world, r=G.run, ss=w.sects;
  const sC=ss.filter(s=>s.al==='chinh'), sM=ss.filter(s=>s.al==='ma');
  const alive=r.rivals.filter(x=>x.alive);
  const t=type||r.place.t||'tran';
  const s1=pick(ss);let s2=pick(ss);if(s2===s1)s2=ss[(ss.indexOf(s1)+1)%ss.length];
  return {p:pView(),pl:r.place.n,plt:TYPE_NAME[t]||'',quoc:w.quoc,que:r.que,sect:s1.n,sect2:s2.n,sectC:pick(sC).n,sectM:pick(sM).n,
    sectP:(ss.find(s=>s.al==='phat')||s1).n,rv:alive.length?rivalView(pick(alive)).ten:genName('nam',true),
    canh:T('{canh_'+t+'}'),who:genName(chance(.5)?'nam':'nu'),nick:pick(NAME.ma1),dan:PILL[btPill()].n,
    reg:REG[r.region].n,lao:pick(NAME.ho2)+' '+pick(NAME.nam)};
}

// ---------------- THỜI GIAN & THẾ GIỚI ----------------
function pushNews(t,quiet){const r=G.run;if(!r)return;if(TICK_OUT&&!quiet)TICK_OUT.push(t);r.news.push({a:Math.floor(r.age),t});if(r.news.length>40)r.news.shift();r.newsQ=(r.newsQ||[]);r.newsQ.push(t);if(r.newsQ.length>4)r.newsQ.shift();}
function rumorV(rv,extra){
  const w=G.meta.world, wr=w.rivals[rv.i];
  return Object.assign({a:wr.ten,s:w.sects[wr.s].n,s2:pick(w.sects).n,pl:placeName(pick(['nui','phe','hoang','song','thanh'])),cg:REALM[rv.realm],dan:PILL[pick(['trucco','ngungkim','phaanh','hoathan'])].n},extra||{});
}
function worldTick(dy){
  const r=G.run,w=G.meta.world;if(!r)return;
  for(const rv of r.rivals){
    if(!rv.alive)continue;
    const wr=w.rivals[rv.i];rv.age=(rv.age||18)+dy;
    rv.prog+=dy*wr.tal*[14,6,2.6,1.2,.5,.3][rv.realm];
    if(rv.prog>=100&&rv.realm<4){rv.realm++;rv.prog=ri(0,15);if(chance(.6))pushNews(T(pick(RUMOR.tien.filter(x=>x.includes('{$cg}'))),rumorV(rv)));}
    if(chance(Math.min(.5,dy*0.035))){
      const roll=R();
      if(roll<0.45) pushNews(T(RUMOR.tien,rumorV(rv)));
      else if(roll<0.62&&wr.tinh!=='nghia') pushNews(T(RUMOR.ma,rumorV(rv)));
      else if(roll<0.75){const o=r.rivals.filter(x=>x.alive&&x!==rv&&w.rivals[x.i].g!==wr.g);if(o.length){const b=pick(o);pushNews(T(RUMOR.tinh,rumorV(rv,{b:w.rivals[b.i].ten})));}}
      else if(roll<0.83&&rv.realm>=1&&r.rivals.filter(x=>x.alive).length>3){rv.alive=false;pushNews(T(RUMOR.tu,rumorV(rv)));}
    }
  }
  if(chance(Math.min(.6,dy*0.06))){if(chance(.12)){const k=rumorKiep();if(k){pushNews(k);return;}}const rv=pick(r.rivals);pushNews(T(RUMOR.the,rumorV(rv)));}
}
function publishBang(){
  const r=G.run,w=G.meta.world;
  const ds=r.rivals.filter(x=>x.alive).map(x=>({i:x.i,ten:w.rivals[x.i].ten,realm:x.realm,sc:x.realm*100+x.prog}));
  ds.push({i:-1,ten:r.ten,realm:r.realm,q:(r.quality||[])[r.realm]||0,sc:r.realm*100+r.tv*0.9});
  ds.sort((a,b)=>b.sc-a.sc);
  r.bang={nam:Math.floor(r.age),y:tYear(w.t),ds:ds.slice(0,6)};
  const me=r.bang.ds.findIndex(x=>x.i===-1);
  const top=r.bang.ds.slice(0,3).map((x,k)=>`${k+1}. ${x.ten} (${REALM[x.realm]})`).join(', ');
  pushNews(`Vạn Bảo Thương Hội công bố Thiên Kiêu Bảng: ${top}.`+(me<0?' Trên bảng không có tên ngươi.':''));
  if(me>=0){log(`Thiên Kiêu Bảng: ngươi đứng hạng ${me+1}.`);r.bon.van+=1;if(me===0){ach('bang1');r.bangTop=1;bio(`Năm ${Math.floor(r.age)} tuổi, đứng đầu Thiên Kiêu Bảng.`);}}
}

// ---------------- HIỆU ỨNG ----------------
function chip(i,t,tip,c){return {i,t,tip,c};}
function sgn(x){return (x>0?'+':'−')+Math.abs(Math.round(x));}
function addTv(x){
  const r=G.run;const b=tieu();const s0=S();const g0=lkOn()?lkTang():0;
  r.tv=clamp(r.tv+x,0,100);
  const a=tieu();const g1=lkOn()?lkTang():0;
  if(g1>g0&&a<=b)log(`Tu vi tiến tới ${realmLabel()}.`);
  if(a>b){const s1=S();r.hp+=s1.maxHp-s0.maxHp;r.mp+=s1.maxMp-s0.maxMp;log(`Tu vi tiến tới ${realmLabel()}.`);}
  clampHp();
}
function tvGain(base){return base*S().tvM;}
function applyE(e,v){
  const r=G.run, ch=[];if(!e)return ch;
  let s=S();
  const pct=(x,max)=>{if(typeof x==='string'&&x.endsWith('%'))return max*parseFloat(x)/100;return +x;};
  if(e.hp!=null){const d=Math.round(pct(e.hp,s.maxHp));const before=r.hp;r.hp=clamp(r.hp+d,1,s.maxHp);const dd=r.hp-before;if(dd)ch.push(chip('❤️',sgn(Math.round(dd/Math.max(1,s.maxHp)*100)||Math.sign(dd))+'%','Khí huyết',dd>0?'up':'dn'));}
  if(e.mp!=null){const d=Math.round(pct(e.mp,s.maxMp));const before=r.mp;r.mp=clamp(r.mp+d,0,s.maxMp);const dd=r.mp-before;if(dd)ch.push(chip('💧',sgn(Math.round(dd/Math.max(1,s.maxMp)*100)||Math.sign(dd))+'%','Linh lực',dd>0?'up':'dn'));}
  if(e.tv){let x=e.tv>0?tvGain(e.tv):e.tv;if(x>0&&!e.tvMajor){const room=Math.max(0,40-(r.tvMinor||0));x=Math.min(x,room);r.tvMinor=(r.tvMinor||0)+x;}const b=r.tv;addTv(x);const d=r.tv-b;if(Math.abs(d)>=0.5)ch.push(chip('✨',sgn(Math.round(d)||Math.sign(d))+'% tu vi','Tu vi',d>0?'up':'dn'));else if(e.tv>0&&r.tv>=100)ch.push(chip('✨','viên mãn','Tu vi đã đầy, cần đột phá ở động phủ','up'));}
  if(e.st!=null){let d;if(typeof e.st==='string')d=Math.round(r.st*parseFloat(e.st)/100);else{d=Math.round(e.st*SC[r.region]*(e.st>0?(1+(s.fx.stonesP||0)/100):1));if(!d&&e.st)d=e.st>0?1:-1;}const b=r.st;r.st=Math.max(0,r.st+d);const dd=r.st-b;if(dd)ch.push(chip('💎',sgn(dd),'Linh thạch',dd>0?'up':'dn'));}
  const statN={atkP:['⚔️','Công','%'],defP:['🛡️','Thủ','%'],hpP:['❤️','Khí huyết tối đa','%'],mpP:['💧','Linh lực tối đa','%'],tp:['🌀','Thân pháp',''],ngo:['🧠','Ngộ tính',''],van:['🍀','Khí vận',''],tam:['🪷','Đạo tâm','']};
  for(const k in statN){if(e[k]){const s0=S();r.bon[k]+=e[k];const s1=S();if(k==='hpP')r.hp+=s1.maxHp-s0.maxHp;if(k==='mpP')r.mp+=s1.maxMp-s0.maxMp;ch.push(chip(statN[k][0],statN[k][1]+(e[k]>0?' ▲':' ▼'),statN[k][1]+(e[k]>0?' tăng':' giảm')+' vĩnh viễn',e[k]>0?'up':'dn'));}}
  if(e.tamma){let d=e.tamma;if(d>0)d=d*(1-Math.min(80,s.fx.tammaRes||0)/100);d=Math.round(d);const b=r.tamma;r.tamma=clamp(r.tamma+d,0,100);const dd=r.tamma-b;if(dd)ch.push(chip('😈',dd>0?'tâm ma ▲':'tâm ma ▼','Tâm ma '+(dd>0?'dày thêm':'nguôi bớt'),dd>0?'dn':'up'));}
  if(e.karma){r.karma=clamp(r.karma+e.karma,-100,100);ch.push(chip('☯️',(e.karma>0?'thiện ▲':'ác ▲'),'Nhân quả: '+(e.karma>0?'thêm việc thiện':'thêm việc ác'),e.karma>0?'up':'dn'));if(r.karma>=60)ach('thien');if(r.karma<=-60)ach('ma');}
  if(e.h){ch.push(chip('⏳',durH(e.h),'Thời gian trôi qua',''));advanceTime(e.h);if(!G.run)return ch;}
  if(e.lifeCut){const y=Math.round(LIFE[r.realm]*e.lifeCut/100);r.lifeAdj-=y;ch.push(chip('⏳','thọ −'+y+' năm','Thọ nguyên giảm','dn'));if(r.age>=S().life){die('toahoa');return ch;}}
  if(e.life){r.lifeAdj+=e.life;ch.push(chip('⏳','thọ +'+e.life+' năm','Thọ nguyên','up'));}
  if(e.relic!=null){const rel=typeof e.relic==='number'?genRelic(clamp(r.region+e.relic,0,4)):uniqueRelic(e.relic);if(rel&&!(rel.u&&r.relics.find(x=>x.u===rel.u))){r.relics.push(rel);clampHp();ch.push(chip('🏺',rel.name,relicTip(rel),'item'));log(`Nhận được ${rel.name}.`);}}
  if(e.rmRelic){const k=r.relics.findIndex(x=>x.u===e.rmRelic);if(k>=0){const n=r.relics[k].name;r.relics.splice(k,1);clampHp();ch.push(chip('🏺','mất '+n,'Pháp bảo đã mất','dn'));}}
  if(e.skill!=null){const id=typeof e.skill==='number'?rollSkill(e.skill):e.skill;const c=gainSkill(id);if(c)ch.push(c);}
  if(e.pill!=null){const arr=Array.isArray(e.pill)?e.pill:[e.pill];if(e.pill2)arr.push(e.pill2);for(const p of arr){const c=gainPill(p===1||p===0?rollPill():(p==='@bt'?btPill():p),r.region>=3?2:r.region>=1?ri(0,1):0);if(c)ch.push(c);}}
  if(e.lore){const c=gainLore(e.lore);if(c)ch.push(c);}
  if(e.dao){const g=addDao(e.dao,'ev');if(g)ch.push(chip('☯️','đạo cơ ▲','Đạo cơ vững thêm: quyết định phẩm chất khi đột phá','up'));}
  if(e.flag) r.flags[e.flag]=1;
  if(e.shop)r.goShop=1;
  if(e.dropPill&&r.pills.length){const i=Math.floor(R()*r.pills.length);const p=r.pills.splice(i,1)[0];ch.push(chip(PILL[p.id].i,'mất '+PILL[p.id].n,'Đã trao đi','dn'));}
  if(e.party&&v&&v[e.party.k]){const c=addParty(v[e.party.k],e.party.days);if(c)ch.push(c);}
  if(e.partyRv&&v&&v.rv){const c=addParty({ten:v.rv.ten,g:v.rv.hn==='nàng'?'nu':'nam'},e.partyRv,0.9);if(c)ch.push(c);}
  if(e.partyP&&v&&v.p){const c=addParty({ten:v.p.ten,g:'nam'},e.partyP,0.7);if(c)ch.push(c);}
  if(e.nemDone)W().nemesis=null;
  if(e.entGone&&v&&v.eid!=null){const x=W().ents.find(z=>z.id===v.eid);if(x)removeEnt(x);}
  if(e.patronDone&&v&&v.pn!=null){const n=nodeById(v.pn);if(n)n.patron=null;}
  if(e.graveItems&&v){graveTake(v).forEach(c=>ch.push(c));}
  if(e.ach) ach(e.ach);
  if(e.an){const [k,d]=Array.isArray(e.an)?e.an:[e.an,'giúp đỡ'];const n=v&&v[k];if(n&&n.ten){r.seeds.push({t:'an',ten:n.ten,hn:n.hn,d,r:r.region,at:G.meta.world.t});ch.push(chip('🤝','kết duyên','Một ân tình đã gieo. Có thể sẽ được đền đáp.','up'));}}
  if(e.oan){const [k,d]=Array.isArray(e.oan)?e.oan:[e.oan,'hại']; const n=v&&v[k];if(n&&n.ten){r.seeds.push({t:'oan',ten:n.ten,hn:n.hn,d,r:r.region,at:G.meta.world.t});ch.push(chip('🗡️','kết oán','Một mối thù đã gieo.','dn'));}}
  if(e.rumor){for(let i=0;i<e.rumor;i++){const rv=pick(r.rivals);const pool=chance(.5)?RUMOR.the:RUMOR[pick(['tien','tien','ma','tu'])];pushNews(T(pool,rumorV(rv)));}ch.push(chip('🍃','tin đồn','Xem trong Nhật ký','')); r.showNews=e.rumor;}
  if(e.rival){const rv=r.rivals.find(x=>x.i===(v&&v.rvi));if(rv){rv.rel+=e.rival;ch.push(chip('🤝',e.rival>0?'thiện cảm':'ác cảm','Quan hệ với thiên kiêu',e.rival>0?'up':'dn'));}}
  clampHp();
  return ch;
}
function dur(y){if(y<1){const m=Math.max(1,Math.round(y*12));return m+' tháng';}return (Math.round(y*10)/10).toString().replace('.',',')+' năm';}
function ach(id){if(!G.meta.ach.includes(id)){G.meta.ach.push(id);const a=ACH.find(x=>x.id===id);if(G.run&&a)log(`Thành tựu: ${a.n}.`);}}
function gainLore(id){if(!LORE[id])return null;if(G.run&&!G.run.flags['lore_'+id]){G.run.flags['lore_'+id]=1;}const fresh=!G.meta.lore.includes(id);if(fresh)G.meta.lore.push(id);return chip('📜',LORE[id].n,fresh?'Điển tích mới, xem trong Tiên Lộ':'Đã có trong Tiên Lộ','item');}

// ---------------- VẬT PHẨM ----------------
function genRelic(tier){
  const r=G.run;const K=pick(RELIC_K);
  let el,base;
  if(K.k==='hap'){el=chance(.7)?pick(r.root.els):pick(['kim','moc','thuy','hoa','tho','loi']);base={kim:'Kiếm Hạp',moc:'Mộc Trượng',thuy:'Thủy Bình',hoa:'Phiến',tho:'Sơn Ấn',loi:'Lôi Châu',bang:'Băng Châu',phong:'Phong Linh'}[el];}
  else {el=chance(.45)?'vo':pick(NGUHANH);base=pick(K.b);}
  const pre=pick(RELIC_PRE[el]||RELIC_PRE.vo);
  const who=genName(chance(.5)?'nam':'nu');
  const lore=T(pick(RELIC_LORE),{who,sect:pick(G.meta.world.sects).n,pl:placeName(pick(['nui','thanh','tran']))});
  return {name:pre+' '+base,k:K.k,tier,el,fx:Object.assign({},K.fx),lore};
}
function uniqueRelic(id){
  if(id==='linhthu'){const n=pick(['Tiểu Bạch','Tiểu Hắc','Đoàn Tử','Tiểu Hỏa','Mao Cầu','A Hoàng','Tiểu Tuyết']);return {name:'Linh thú '+n,k:'linhthu',u:'linhthu',tier:G.run.region,el:'vo',fx:{dodge:4,van:2,regenHp:2},lore:'Nhỏ như nắm tay, lúc nào cũng nằm trong ngực áo ngươi. Lúc nguy hiểm, nó cắn trước.'};}
  const U0=RELIC_UNIQUE[id];if(!U0)return null;
  return {name:U0.name,k:U0.k,u:id,tier:Math.min(4,G.run.region),el:U0.el,fx:Object.assign({},U0.fx),lore:U0.lore};
}
const FXT={matkP:'🔮 Sát thương phép +{v}%',critDmg:'💥 Sát thương chí mạng +{v}%',hoTam:'🫀 Hộ tâm +{v}',atkP:'⚔️ Sát thương vật lý +{v}%',defP:'🛡️ Thủ +{v}%',hpP:'❤️ Khí huyết +{v}%',mpP:'💧 Linh lực +{v}%',tp:'🌀 Thân pháp +{v}',ngo:'🧠 Ngộ tính +{v}',van:'🍀 Khí vận +{v}',tam:'🪷 Đạo tâm +{v}',crit:'🎯 Tỉ lệ chí mạng +{v}%',dodge:'🍃 Né tránh +{v}%',startBlock:'🛡️ Vào trận được hộ thể {v}% khí huyết',regenMp:'💧 Mỗi lượt hồi {v}% linh lực',regenHp:'❤️ Mỗi lượt hồi {v}% khí huyết',pillP:'⚗️ Đan dược mạnh thêm {v}%',poisonHit:'☠️ Mỗi đòn gây độc',reflect:'🪞 Phản {v}% sát thương nhận vào',tvP:'✨ Tu vi nhận thêm {v}%',stunP:'💫 Đòn đánh thêm {v}% gây choáng',healAfter:'🌿 Thắng trận hồi {v}% khí huyết',blockTurn:'🛡️ Mỗi lượt thêm hộ thể {v}% khí huyết',firstEvade:'🍃 Né {v} đòn đầu mỗi trận',weakStart:'🥀 Địch suy nhược {v} lượt đầu trận',vulnStart:'💔 Địch phá giáp {v} lượt đầu trận',stonesP:'💎 Linh thạch nhận thêm {v}%',pillSlot:'👝 Thêm {v} ô đan dược',shopP:'🏪 Mua rẻ {v}%',tammaRes:'😈 Tâm ma tăng chậm {v}%',execute:'☄️ Đánh kẻ dưới 30% khí huyết +{v}%',drain:'🩸 Hút {v}% sát thương thành khí huyết',mpCost:'💧 Pháp thuật tốn ít hơn {v}%',lifeP:'⏳ Thọ nguyên {v}%'};
function fxLines(fx,rel){const out=[];for(const[k,v]of Object.entries(fx)){if(k==='elX'){out.push(`${EL[rel.el].c} Hệ ${EL[rel.el].n} +${v}%`);continue;}if(k==='elP'){for(const[e,x]of Object.entries(v))out.push(`${EL[e].c} Hệ ${EL[e].n} +${x}%`);continue;}if(FXT[k])out.push(FXT[k].replace('{v}',k==='mpCost'?Math.abs(v):(k==='poisonHit'?'':v)));}return out;}
function relicTip(rel){return `${rel.name}\n${GRADE[rel.tier]}\n${fxLines(relicFx(rel),rel).join('\n')}\n\n${rel.lore}`;}
function rollSkill(tier){
  const r=G.run;tier=clamp(tier||[1,2,2,3,4][r.region],1,4);
  if(chance(.35))tier=clamp(tier+(chance(.5)?-1:1),1,4);
  let pool=SK_RAW.filter(s=>s[3]===tier);
  const mine=pool.filter(s=>r.root.els.includes(s[2]));
  if(mine.length&&chance(.6))pool=mine;
  return pick(pool)[0];
}
function gainSkill(id){
  const r=G.run, sk=SK[id];if(!sk)return null;
  const h=r.skills.find(x=>x.id===id);
  if(h){if(h.lv<3){h.lv++;log(`${sk.n} tinh thông thêm một bậc.`);return chip('📖',sk.n+' bậc '+h.lv,skillTip(sk,h.lv),'item');}return chip('📖',sk.n+' (đã tinh thông)','Đã đạt bậc cao nhất','');}
  if(r.skills.length<4){r.skills.push({id,lv:1});log(`Lĩnh ngộ ${sk.n}.`);if(sk.dao&&addDao(3,'skill'))log('Đạo cơ +3.');return chip('📖',sk.n+(sk.dao?' ☯':''),skillTip(sk,1),'item');}
  r.pendingSkill=id;return chip('📖',sk.n,'Đã đủ bốn môn, cần bỏ bớt một môn','item');
}
function skillCost(sk){if(!sk.c)return 0;const fx=aggFx();return Math.max(1,Math.round(sk.c*(TAB.mp[G.run.realm]/30)*(1+(fx.mpCost||0)/100)));}
function skillTip(sk,lv){
  const f=sk.fx,L=[];const m=1+0.25*((lv||1)-1);
  if(f.p)L.push(`Sát thương ${Math.round(f.p*m*100)}% ${sk.dt==='vl'?'sát thương vật lý':'sát thương phép'}`+(f.h?` × ${f.h} lần`:''));
  if(f.pierce)L.push(`Xuyên ${Math.round(f.pierce*100)}% phòng thủ`);
  if(f.crit)L.push(`Tỉ lệ chí mạng +${f.crit}%`);
  if(f.poison)L.push('Gây ☠️ Độc');if(f.burn)L.push('Gây 🔥 Thiêu');
  if(f.weak)L.push(`🥀 Suy nhược ${f.weak} vòng`);if(f.vuln)L.push(`💔 Phá giáp ${f.vuln} vòng`);
  if(f.stun)L.push(`💫 ${f.stun}% gây choáng 2 giây`);if(f.block)L.push(`🛡️ Hộ thể ${Math.round(f.block*m*100)}% công`);
  if(f.heal)L.push(`🌿 Hồi ${Math.round(f.heal*m)}% khí huyết`);if(f.regen)L.push(`🌱 Hồi xuân ${f.regen} vòng`);
  if(f.drain)L.push(`🩸 Hút ${f.drain}% sát thương`);if(f.rage)L.push(`💢 Cuồng nộ +${f.rage}`);
  if(f.evade)L.push(`🍃 Né ${f.evade} đòn`);if(f.cleanse)L.push('Giải trừ độc, thiêu, suy nhược');
  if(f.selfHp)L.push(`Tốn ${f.selfHp}% khí huyết`);if(f.bonusIf)L.push('+50% nếu địch đang trúng độc hoặc thiêu');
  if(f.charge)L.push('⏳ Tụ lực: đứng chờ ở mốc 75 tới khi mọi kẻ địch ra tay');if(f.aoe)L.push('🌐 Đánh cả phe địch (60% uy lực)');if(sk.dao)L.push('☯ Học được: đạo cơ +3');
  L.push('Độ nặng ×'+String(skRec(sk)).replace('.',','));
  return `${sk.n}${lv>1?' (bậc '+lv+')':''}\n${EL[sk.el].n} hệ, bậc ${sk.t}\n${L.join('\n')}\n\n${sk.f}`;
}
function rollPill(){const r=G.run;const pool=['hoixuan','hoixuan','tukhi','baohuyet','kimcang','loiphu','giaidoc','thanhanh','dinhthan','tinhnguyen','linhnhu'];if(chance(.25))pool.push(pick(['homach','tiloi','duongnguyen','nhanhoang','diamach','thiendao','bode']));if(r.region>=1)pool.push('taytuy','khaitri','dientho');if(chance(.12))pool.push(btPill());return pick(pool);}
function gainPill(id,q){
  const r=G.run,p=PILL[id];if(!p)return null;q=q||0;
  if(r.pills.length>=S().pillMax){const g=Math.max(1,Math.round(p.p*SC[r.region]*0.4));r.st+=g;return chip(p.i,p.n+' → 💎'+g,'Túi đầy, đã bán đi','');}
  r.pills.push({id,q});return chip(p.i,(q?PQ[q]+' ':'')+p.n,pillTip(id,q),'item');
}
function pillX(id,q){const p=PILL[id];const fx=aggFx();return Math.round(p.x*PQM[q||0]*(1+(fx.pillP||0)/100));}
function pillTip(id,q){const p=PILL[id];return `${q?PQ[q]+' ':''}${p.n}\n${p.d.replace('{x}',pillX(id,q))}\n${p.w==='combat'?'Dùng trong trận':p.w==='bt'?'Đặt vào ô chuẩn bị đột phá':'Dùng bất cứ lúc nào'}${p.dao?'\nĐạo cơ +'+p.dao:''}`;}
function usePill(idx,inCombat){
  const r=G.run,it=r.pills[idx];if(!it)return null;const p=PILL[it.id];const x=pillX(it.id,it.q);const s=S();
  if(p.w==='bt')return null;if(p.w==='combat'&&!inCombat)return null;
  r.pills.splice(idx,1);let msg=p.n;const sc=r.scene;
  switch(it.id){
    case 'hoixuan':r.hp=Math.min(s.maxHp,r.hp+s.maxHp*x/100);break;
    case 'tukhi':r.mp=Math.min(s.maxMp,r.mp+s.maxMp*x/100);break;
    case 'baohuyet':{const me=mainUnit(sc);me.st.rage=(me.st.rage||0)+x;break;}
    case 'kimcang':{const me=mainUnit(sc);me.st.block=(me.st.block||0)+Math.round(s.maxHp*x/100);break;}
    case 'loiphu':{const t=alive(sc,'B').filter(u=>!u.immune).sort((a,b)=>a.hp-b.hp)[0];if(t){let d=Math.max(s.atk*x/100*0.25,s.atk*x/100-t.def*0.7);if(t.st.vuln)d*=1.3;if(KHAC.loi===t.el)d*=1.5;d=absorb(t.st,Math.round(d));t.hp-=d;msg+=': '+d;if(t.hp<=0){down(sc,t);checkEnd(sc);}}break;}
    case 'giaidoc':if(sc&&sc.type==='combat'){const me=mainUnit(sc);me.st.poison=0;me.st.burn=0;}r.hp=Math.min(s.maxHp,r.hp+s.maxHp*x/100);break;
    case 'thanhanh':sc.fleeSure=1;break;
    case 'dinhthan':r.tamma=Math.max(0,r.tamma-x);break;
    case 'tinhnguyen':addTv(tvGain(x));break;
    case 'taytuy':{const s0=S();r.bon.hpP+=x;r.hp+=S().maxHp-s0.maxHp;break;}
    case 'khaitri':r.bon.ngo+=x;break;
    case 'linhnhu':break;
    case 'dientho':r.lifeAdj+=Math.round(LIFE[r.realm]*x/100);break;
  }
  if(p.dao){const g=addDao(p.dao,'pill');if(g)msg+=' (đạo cơ +'+g+')';}
  r.hp=Math.round(r.hp);r.mp=Math.round(r.mp);clampHp();
  return msg;
}

// ---------------- SỰ KIỆN ----------------
const EVS=[];const EVMAP={};
function ev(o){EVS.push(o);EVMAP[o.id]=o;}
function resolveP(e,path){let x=e;for(const k of path){x=x==null?undefined:x[k];}return x;}
function chkChance(chk){
  const r=G.run,s=S();const [k,dc]=chk;
  if(k==='root'){return clamp(0.15+(rootView(r.root).m-0.7)*0.9+s.van*0.005,0.08,0.95);}
  const val=s[k]!=null?s[k]:0;const d=dc+r.region*2;
  return clamp(0.5+(val-d)*0.05+s.van*0.004+((s.fx.chkP||0)/100),0.08,0.95);
}
const CHKN={tp:'Thân pháp',ngo:'Ngộ tính',tam:'Đạo tâm',van:'Khí vận',root:'Linh căn'};
const CHKI={tp:'🌀',ngo:'🧠',tam:'🪷',van:'🍀',root:'💠'};
function costOk(c){if(!c)return true;const r=G.run,s=S();if(c.st&&r.st<Math.max(1,Math.round(c.st*SC[r.region])))return false;if(c.mp&&r.mp<Math.round(s.maxMp*parseFloat(c.mp)/100))return false;return true;}
function costChips(c){const r=G.run,s=S(),o=[];if(!c)return o;
  if(c.st){const d=Math.max(1,Math.round(c.st*SC[r.region]));r.st-=d;o.push(chip('💎','−'+d,'Linh thạch','dn'));}
  if(c.mp){const d=Math.round(s.maxMp*parseFloat(c.mp)/100);r.mp-=d;o.push(chip('💧','−'+d,'Linh lực','dn'));}
  if(c.hp){const d=Math.round(s.maxHp*parseFloat(c.hp)/100);r.hp=Math.max(1,r.hp-d);o.push(chip('❤️','−'+d,'Khí huyết','dn'));}
  return o;}
function whenOk(e){if(!e.when)return true;const t=W().t;if(e.when.part&&!e.when.part.includes(partOf(t)))return false;if(e.when.season&&!e.when.season.includes(seasonOf(t)))return false;return true;}
function srcOk(e,src){const s=e.src||'explore';if(!src)return true;if(s===src)return true;if(src==='explore'&&!ENT_ON&&s.startsWith('ent:'))return true;return false;}
let ENT_ON=false;
function evOk(e,type,src){
  const r=G.run;if(!srcOk(e,src)||!whenOk(e))return false;
  if(e.r&&!e.r.includes(r.region))return false;
  if(type&&e.tg&&!e.tg.includes('*')&&!e.tg.includes(type))return false;
  if(e.once&&r.evCount[e.id])return false;
  if((r.evCount[e.id]||0)>=2)return false;
  if(r.evRecent.includes(e.id))return false;
  if(e.cond&&!e.cond(r))return false;
  if(e.spec)return false;
  return true;
}
function pickEvent(type,src){
  const r=G.run;src=src||'explore';
  // sự kiện đặc biệt
  const sp=src!=='explore'?[]:EVS.filter(e=>e.spec&&srcOk(e,src)&&whenOk(e)&&(r.evCount[e.id]||0)<2&&(!e.r||e.r.includes(r.region))&&!(e.once&&r.evCount[e.id])&&!r.evRecent.includes(e.id)&&e.cond&&e.cond(r));
  if(sp.length&&chance(.55))return pick(sp).id;
  let pool=EVS.filter(e=>evOk(e,type,src));
  if(!pool.length)pool=EVS.filter(e=>evOk(e,null,src));
  if(!pool.length)pool=EVS.filter(e=>!e.spec&&!e.once&&srcOk(e,src)&&(!e.r||e.r.includes(r.region)));
  if(!pool.length)return null;
  return wpick(pool,e=>(e.w||1)*((e.tg&&e.tg.includes(type))?2:1)/(1+(r.evCount[e.id]||0)*2)).id;
}
function startEvent(id){
  const r=G.run,e=EVMAP[id];
  const v=Object.assign(baseV(),e.v?e.v(r):{});
  r.evCount[id]=(r.evCount[id]||0)+1;r.evRecent.push(id);if(r.evRecent.length>14)r.evRecent.shift();r.evDone++;
  const story=[T(e.t,v)];const back=sceneBack();
  r.scene={type:'event',id,v,story,cur:['c'],phase:'choose',chips:[],news:takeNews(),back};
}
function takeNews(){const r=G.run;if(r.newsQ&&r.newsQ.length&&chance(.45))return r.newsQ.shift();return null;}
function visChoices(sc){
  const e=EVMAP[sc.id];const list=resolveP(e,sc.cur)||[];const r=G.run;
  return list.map((c,i)=>({c,i})).filter(({c})=>!c.req||c.req(r,sc.v));
}
function choose(i){
  const r=G.run,sc=r.scene,e=EVMAP[sc.id];const list=resolveP(e,sc.cur);const ch=list[i];if(!ch)return;
  if(!costOk(ch.cost))return;
  const pre=costChips(ch.cost);
  let out,path;
  if(ch.chk){const ok=R()<chkChance(ch.chk);out=ok?ch.ok:ch.no;path=[...sc.cur,i,ok?'ok':'no'];sc.lastOk=ok;}
  else if(ch.o){const k=wIdx(ch.o);out=ch.o[k];path=[...sc.cur,i,'o',k];}
  else {out=ch;path=[...sc.cur,i];}
  sc.story.push({q:T(ch.l,sc.v)});
  doOutcome(out||{},path,pre);
}
function doOutcome(out,path,pre){
  const r=G.run,sc=r.scene;
  const text=out.t?T(out.t,sc.v):'';
  if(text)sc.story.push(text);
  const chips=(pre||[]).concat(applyE(out.e,sc.v));
  if(!G.run)return;
  sc.chips=chips;
  if(out.fight){startCombat(out.fight,{kind:'ev',path,ev:JSON.parse(JSON.stringify(sc))});return;}
  if(out.c){sc.cur=[...path,'c'];sc.phase='choose';}
  else sc.phase='done';
}

// ---------------- KẺ ĐỊCH ----------------
const GIAI=['Nhất','Nhị','Tam','Tứ','Ngũ','Lục','Thất'];
function mkEnemy(spec,v){
  const r=G.run,reg=r.region;spec=spec||{};
  if(spec.k==='tamma'){const s=S();return {n:'Tâm Ma',sub:'Bóng tối trong lòng ngươi',i:'🌑',el:'am',f:'vat',hp:Math.round(s.maxHp*0.85),max:Math.round(s.maxHp*0.85),atk:Math.round(s.atk*0.9),def:Math.round(s.def*0.9),pat:['drain','weak','atk','charge','heavy','rage'],pi:0,st:{}};}
  let k=spec.k;
  if(spec.nem&&v){k=v.kk;spec=Object.assign({},spec,{i:v.ki});}
  const famPick=f=>{let pool=REG_EN[reg].filter(x=>EN[x].f===f);if(!pool.length)pool=Object.keys(EN).filter(x=>EN[x].f===f);return pick(pool);};
  if(k==='beast')k=famPick('thu');else if(k==='human')k=famPick('nhan');else if(k==='quy')k=famPick('quy');
  if(!k||!EN[k]){const t=r.place&&r.place.t;let pool=REG_EN[reg].filter(x=>EN[x].pl.includes('*')||EN[x].pl.includes(t));if(!pool.length)pool=REG_EN[reg];k=pick(pool);}
  const ty=EN[k];
  const m=(spec.mv?((v&&v[spec.mv])||1):(spec.m||1))*(1+curDanger()*0.1);
  let el=spec.el||(ty.el?pick(ty.el):(ty.ma?(chance(.6)?'am':pick(NGUHANH)):pick(NGUHANH)));
  let n,sub;
  if(ty.f==='thu'){n=pick(DESC[el]||DESC.vo)+' '+pick(ty.nb);sub='Yêu thú '+GIAI[reg+(spec.elite?1:0)].toLowerCase()+' giai';}
  else if(ty.f==='nhan'){
    n=spec.n?T(spec.n,v):(ty.noname?pick(ty.t):(ty.ma?maName():ty.tang?tangName():ty.dao?daoName():genName(chance(.65)?'nam':'nu')));
    sub=T(pick(ty.t),Object.assign({sect:pick(G.meta.world.sects).n},v||{}));
    if(ty.noname){sub=REG[reg].n;}
  } else {
    n=(chance(.35)?pick(['Bách Niên','Thiên Niên','Huyết','Hắc','Bạch','Cổ'])+' ':'')+pick(ty.nb);sub=ty.f==='quy'?'Âm vật':'Dị vật';
  }
  if(spec.n&&ty.f!=='nhan')n=T(spec.n,v);
  if(spec.sub)sub=T(spec.sub,v);
  const eM=spec.elite?1.6:1, aM=spec.elite?1.2:1;
  const hp=Math.round(EH[reg]*ty.hp*m*eM);
  return {n:up1(n),sub,i:spec.i||ty.i,el,f:ty.f,k,hp,max:hp,atk:Math.round(EA[reg]*ty.atk*m*aM),def:Math.round(ED[reg]*ty.def*m),pat:ty.pat.slice(),pi:ri(0,ty.pat.length-1),st:{},elite:!!spec.elite};
}
function mkBoss(){
  const r=G.run,b=r.bossDef;const reg=r.region;const v=baseV();v.ten=genName(chance(.7)?'nam':'nu');v.trai=pick(['Hắc Phong Trại','Huyết Đao Trại','Thiết Cốt Trại','Lang Nha Trại']);
  const n=T(b.n,Object.assign(v,r.bossV||{}));const sub=T(b.sub,Object.assign(v,r.bossV||{}));
  const m=1.3;
  const hp=Math.round(EH[reg]*b.hp*m*[0.72,0.9,1,1,1][reg]);
  return {n,sub,i:b.i,el:b.el,f:'boss',hp,max:hp,atk:Math.round(EA[reg]*b.atk*m*[0.85,0.95,1,1,1][reg]),def:Math.round(ED[reg]*b.def*m),pat:b.pat.slice(),pi:0,st:{},boss:true,esc:b.esc};
}

// ---------------- CHIẾN ĐẤU: THANH HÀNH ĐỘNG ----------------
// Thanh dài 100: chạy 0→50 theo thân pháp, ra lệnh ở 50, tụ lực đứng ở 75, hồi 50/75→100 theo hồi phục, chạm 100 về 0.
const VERB={
  thu:{atk:['{e} vồ tới','{e} cắn xé','{e} quật mạnh','{e} lao thẳng tới'],multi:['{e} cào liên tiếp','{e} tấn công tới tấp'],heavy:['{e} dồn toàn lực húc tới','{e} gầm lên, tung đòn chí mạng']},
  nhan:{atk:['{e} vung binh khí chém xuống','{e} tung một chưởng','{e} điểm ra một chỉ','{e} phóng phi kiếm'],multi:['{e} xuất liền mấy chiêu','{e} kiếm ảnh chồng chất'],heavy:['{e} dồn hết chân nguyên vào một kích','{e} quát lớn, tung sát chiêu']},
  quy:{atk:['{e} lướt xuyên qua','{e} cào móng vuốt lạnh buốt','{e} rít lên chói tai'],multi:['{e} ẩn hiện liên hồi'],heavy:['{e} hóa thành luồng âm phong ập tới']},
  vat:{atk:['{e} giáng một đòn','{e} va mạnh tới'],multi:['{e} công kích liên hoàn'],heavy:['{e} phát ra một kích kinh thiên']},
  boss:{atk:['{e} ra tay','{e} vung tay áo, kình phong ập tới','{e} đánh ra một đòn nặng như núi'],multi:['{e} công kích như mưa bão'],heavy:['{e} tung đòn sát thủ','Trời đất tối sầm, {e} dồn toàn lực']}
};
const VERB2={charge:'{e} bắt đầu tụ lực…',block:'{e} thủ thế',rage:'{e} nổi cơn cuồng nộ',poison:'{e} phun độc',burn:'{e} phun lửa',weak:'{e} tỏa ra âm khí',vuln:'{e} xé toạc hộ thể',drain:'{e} hút lấy sinh khí',heal:'{e} hồi phục vết thương',stun:'{e} giáng uy áp'};
// đòn của kẻ địch theo ý định cũ
const EN_SK={
  atk:{n:'Tấn công',fx:{p:1},rec:1},multi:{n:'Liên kích',fx:{p:.5,h:2},rec:1.1},heavy:{n:'Trọng kích',fx:{p:2.2,charge:true},rec:1.2},
  block:{n:'Phòng thủ',fx:{eblock:1.3},rec:.8},rage:{n:'Cuồng nộ',fx:{rage:1},rec:.8},poison:{n:'Phun độc',fx:{p:.5,epoison:.45},rec:1},burn:{n:'Thiêu đốt',fx:{p:.6,eburn:.6},rec:1},
  weak:{n:'Làm suy yếu',fx:{p:.5,weak:2},rec:1},vuln:{n:'Phá giáp',fx:{p:.5,vuln:2},rec:1},drain:{n:'Hút máu',fx:{p:.9,edrain:60},rec:1},heal:{n:'Hồi phục',fx:{eheal:10},rec:.9},stun:{n:'Trấn áp',fx:{p:.7,stun:30},rec:1}
};
const PHAT=75; // mốc phát lực: điểm cuối của tụ lực và của thế đỡ
const TL_DODGE=25,TL_BLOCK=30,TL_REGEN=20,BLOCK_CUT=0.6;
const BLOCK_SK={id:'_block',n:'Đỡ đòn',el:'vo',t:0,c:0,fx:{stance:1,steady:true},f:'',rec:.8};
const WAIT_SK={id:'_wait',n:'Qua lượt',el:'vo',t:0,c:0,fx:{},f:'',rec:.7};
const GUARD_SK={id:'_guard',n:'Vận khí',el:'vo',t:0,c:0,fx:{guard:1},f:'',rec:.8};
const STUN_S=2,CHARGE_MAX=12;
function skRec(sk){if(sk.rec)return sk.rec;if(sk.fx&&sk.fx.rec)return sk.fx.rec;return [0.8,0.9,1.0,1.2,1.4][sk.t||0];}
function U_(sc,id){return sc.units.find(u=>u.id===id);}
function alive(sc,side){return sc.units.filter(u=>u.side===side&&u.hp>0&&!u.gone);}
function foeSide(s){return s==='A'?'B':'A';}
function mainUnit(sc){return sc.units.find(u=>u.isMain);}
function clog(sc,t,c){sc.log.push({t,c:c||''});if(sc.log.length>40)sc.log.shift();sc.rev=(sc.rev||0)+1;}
function playerUnit(){
  const r=G.run,s=S();
  return {id:1,side:'A',ctrl:'player',isMain:true,name:r.ten,icon:r.g==='nam'?'🧑':'👩',el:r.root.els[0]||'vo',f:'me',
    realm:r.realm,matk:s.matk,critDmg:s.critDmg,hoTam:s.hoTam,hp:r.hp,max:s.maxHp,mp:r.mp,maxMp:s.maxMp,atk:s.atk,def:s.def,tp:s.tp,cx:s.cx,ne:s.ne,hoi:s.hoi,crit:s.crit,
    skills:r.skills.map(x=>({id:x.id,lv:x.lv})),st:{},pos:0,phase:'run',pending:null,waitSet:[],stunT:0,rec:1,chargeT:0,tl:100};
}
function enemyUnit(en,id,f){
  const reg=G.run.region;f=f||1;
  const tp=Math.round((6+reg*2.5+(en.boss?2:0)+(en.elite?1:0))*(en.k&&EN[en.k]&&EN[en.k].f==='thu'?1.05:1)),cx=10+2*reg+(en.elite||en.boss?2:0);
  return {id,side:'B',ctrl:'ai',name:en.n,sub:en.sub,icon:en.i,el:en.el,f:en.boss?'boss':en.f,k:en.k,boss:!!en.boss,elite:!!en.elite,esc:en.esc,
    hp:Math.round(en.hp*f),max:Math.round(en.max*f),mp:0,maxMp:0,atk:Math.round(en.atk*f*0.85),def:en.def,tp:en.tp||tp,cx:en.cx||cx,ne:en.ne||tp,hoi:en.hoi||cx,crit:5+reg*1.5+(en.elite?3:0)+(en.boss?5:0),critDmg:150,hoTam:reg*2+(en.elite?4:0)+(en.boss?8:0),realm:reg+(en.boss?1:0)+(en.elite?0.5:0),matk:Math.round(en.atk*f*0.85),
    pat:en.pat.slice(),pi:en.pi||0,st:Object.assign({},en.st||{}),pos:0,phase:'run',pending:null,waitSet:[],stunT:0,rec:1,chargeT:0,intent:null};
}
// spec: {k,n,m,elite,spar,cnt,...}, 'boss', {pre:en}, {kiep:{n,waves}}, {party:[đơn vị phe A]}
function startCombat(spec,after){
  const r=G.run;const back=sceneBack();
  const sc={type:'combat',units:[],hold:false,log:[],t:0,after,back,spar:!!(spec&&spec.spar),boss:spec==='boss',elite:!!(spec&&spec.elite),rev:0,cur:null,aiWait:null,dodge:null,qte:null,over:null,done:false,nid:2};
  const me=playerUnit();sc.units.push(me);
  if(!(spec&&spec.kiep))for(const p of (r.party||[]).slice(0,2)){const u=partyUnit(p,sc.nid++);if(u)sc.units.push(u);}
  if(spec&&spec.kiep){
    const k={id:sc.nid++,side:'B',ctrl:'ai',kind:'kiep',immune:true,name:'Kiếp vân',icon:'🌩️',el:'loi',f:'vat',hp:1,max:1,mp:0,maxMp:0,atk:0,def:0,tp:0,cx:99,ne:0,hoi:10,crit:0,skills:[],st:{},pos:0,phase:'run',pending:null,waitSet:[],stunT:0,rec:1,chargeT:0};
    sc.units.push(k);sc.kiep={n:spec.kiep.n,waves:spec.kiep.waves||1,wave:1,done:0,uy:1,cut:spec.kiep.cut||0};
    sc.en={n:'Lôi kiếp',k:'kiep',i:'🌩️',el:'loi',boss:true};
    if(spec.kiep.block)me.st.block=Math.round(me.max*spec.kiep.block/100);
    clog(sc,`Mây kiếp vần vũ. ${capS(numVi(spec.kiep.n))} đạo lôi${sc.kiep.waves>1?', chia làm '+numVi(sc.kiep.waves)+' đợt,':''} sắp giáng xuống.`,'en');
  } else {
    let ens=[];
    if(spec==='boss')ens=[mkBoss()];
    else if(spec&&spec.pre){ens=[spec.pre];const n=spec.cnt||1;for(let i=1;i<n;i++)ens.push(mkEnemy({k:spec.pre.k,elite:spec.elite}));}
    else{const n=spec&&spec.cnt||1;for(let i=0;i<n;i++)ens.push(mkEnemy(spec,after&&after.ev&&after.ev.v));}
    if(spec&&spec.elite)ens.forEach(e=>e.elite=true);
    const n=ens.length;const f=[1,1.6,2.1][n-1]/n; // ngân sách chia đều
    ens.forEach(e=>sc.units.push(enemyUnit(e,sc.nid++,n>1?f:1)));
    sc.en={n:ens[0].n,k:ens[0].k,i:ens[0].i,el:ens[0].el,boss:!!ens[0].boss,elite:!!ens[0].elite,sub:ens[0].sub};
    clog(sc,ens.map(e=>`${e.i} ${e.n}`).join(', ')+' xuất hiện.');
  }
  // trung bình thân pháp và hồi phục, tính một lần lúc vào trận
  const L=sc.units.filter(u=>!u.immune);
  sc.tpTB=Math.max(1,L.reduce((a,u)=>a+u.tp,0)/L.length);sc.hoiTB=Math.max(1,L.reduce((a,u)=>a+u.hoi,0)/L.length);
  if(sc.kiep){const k=sc.units.find(u=>u.kind==='kiep');const cyc=50/vRun(sc,me)+(100-PHAT)/vRec(sc,me);k.fixedV=1.1*50/cyc; /* nhanh hơn một vòng hành động của người chơi 1,1 lần */}
  // hiệu ứng pháp bảo đầu trận
  const fx=S().fx;
  if(fx.startBlock)me.st.block=(me.st.block||0)+Math.round(me.max*fx.startBlock/100);
  if(fx.firstEvade)me.st.evade=fx.firstEvade;
  for(const u of alive(sc,'B')){if(u.immune)continue;if(fx.weakStart)u.st.weak=fx.weakStart;if(fx.vulnStart)u.st.vuln=fx.vulnStart;}
  for(const u of sc.units)if(u.side==='B'&&!u.immune)nextIntent(u);
  r.scene=sc;
}
function partyUnit(p,id){
  const r=G.run,s=S();if(!p||p.hp<=0)return null;
  const m=p.pow||0.6;
  return {realm:r.realm,matk:Math.round(s.matk*m),critDmg:150,hoTam:s.hoTam,id,side:'A',ctrl:'ai',ally:p.id,name:p.ten,icon:p.icon||'🧑',el:p.el||'vo',f:'nhan',hp:p.hp,max:Math.round(s.maxHp*m),mp:0,maxMp:0,atk:Math.round(s.atk*m),def:Math.round(s.def*m),tp:Math.round(s.tp*0.9),cx:s.cx,ne:Math.round(s.ne*0.9),hoi:s.hoi,crit:5,
    pat:['atk','atk','multi','block','heavy'],pi:0,st:{},pos:0,phase:'run',pending:null,waitSet:[],stunT:0,rec:1,chargeT:0};
}
const CHG_SLOW=0.6; // tụ lực, thủ thế: đoạn từ mốc giữa tới mốc phát lực chạy chậm lại còn 60%
function vRun(sc,u){if(u.fixedV)return u.fixedV;return 20*clamp(u.tp/sc.tpTB,0.6,1.8);}
function vRec(sc,u){if(u.fixedV)return u.fixedV;return 26*clamp(u.hoi/sc.hoiTB,0.6,1.8)/(u.rec||1);}
function nextIntent(u){
  let it=u.pat[u.pi%u.pat.length];u.pi++;if(it==='charge')it='heavy';
  if(chance(.22)&&!u.boss){it=pick(u.pat);if(it==='charge')it='heavy';}
  u.intent=it;
}
// gỡ id khỏi waitSet của mọi người đang tụ lực phe kia
function doneAct(sc,u){for(const x of sc.units)if(x.side!==u.side&&x.waitSet.length)x.waitSet=x.waitSet.filter(i=>i!==u.id);}
// ---------- vòng lặp trận ----------
function combatStep(dt){
  const sc=G.run&&G.run.scene;if(!sc||sc.type!=='combat'||sc.over)return;
  if(sc.hold){
    if(sc.aiWait!=null){sc.aiWait-=dt;if(sc.aiWait<=0){sc.aiWait=null;const u=U_(sc,sc.cur);runAct(sc,()=>aiAct(sc,u));}}
    return;
  }
  sc.t+=dt;
  for(const u of sc.units){
    if(u.hp<=0||u.gone){u.phase='down';continue;}
    if(u.stunT>0){u.stunT=Math.max(0,u.stunT-dt);continue;}
    if(u.phase==='run')u.pos+=vRun(sc,u)*dt;
    else if(u.phase==='recover'){u.pos+=vRec(sc,u)*dt;if(u.pos>=100){u.pos=0;u.phase='run';onZero(sc,u);if(sc.over)return;}}
    else if(u.phase==='charge'||u.phase==='guard'){u.pos=Math.min(PHAT,u.pos+vRec(sc,u)*dt*CHG_SLOW);u.chargeT+=dt;if(u.phase==='guard'&&u.pos>=PHAT)endStance(sc,u,(u.ctrl==='player'?'Ngươi':u.name)+' không phải đỡ đòn nào, buông thế.');}
  }
  // người đang tụ lực: đủ điều kiện thì tung chiêu
  const ch=sc.units.find(u=>u.phase==='charge'&&u.hp>0&&u.pos>=PHAT);
  if(ch){sc.hold=true;sc.cur=ch.id;
    if(ch.ctrl==='player'&&!sc.kiep&&!(G.meta.opt&&G.meta.opt.autoQte)){sc.qte={uid:ch.id,id:(sc.qid=(sc.qid||0)+1)};sc.rev++;return;}
    runAct(sc,()=>fireCharge(sc,ch,1));return;}
  // ai chạm mốc 50
  const rd=sc.units.filter(u=>u.phase==='run'&&u.hp>0&&u.pos>=50);
  if(rd.length){
    rd.sort((a,b)=>(b.pos-a.pos)||(b.tp-a.tp)||((a.side==='A'?0:1)-(b.side==='A'?0:1))||(a.id-b.id));
    const u=rd[0];
    for(const x of rd.slice(1))x.pos=49.9;
    u.pos=50;u.phase='ready';u.burnedTurn=0;sc.cur=u.id;sc.hold=true;sc.rev++;
    if(u.kind==='kiep'){runAct(sc,()=>kiepStrike(sc,u));return;}
    if(u.ctrl==='player')return; // chờ người chơi chọn chiêu
    sc.aiWait=0.3;
  }
}
// tắt hold ở đúng một chỗ
function runAct(sc,fn){
  try{fn();}
  finally{
    if(sc.dodge||sc.qte||sc.critQ)return; // còn chờ thao tác
    sc.cur=null;sc.aiWait=null;checkEnd(sc);sc.hold=false;sc.rev++;
    syncMain(sc);
  }
}
function syncMain(sc){const me=mainUnit(sc),r=G.run;if(me&&r){r.hp=Math.max(0,Math.round(me.hp));r.mp=Math.round(me.mp);}}
function onZero(sc,u){
  if(u.immune)return;
  const isP=u.ctrl==='player';const fx=isP?S().fx:{};
  u.st.block=0;
  if(isP&&fx.blockTurn)u.st.block=Math.round(u.max*fx.blockTurn/100);
  let d=0;
  if(u.st.poison>0){if(isP&&fx.poisonImm)u.st.poison=0;else{d+=u.st.poison;u.st.poison=Math.floor(u.st.poison*0.75);}}
  if(u.st.burn>0){d+=u.st.burn;u.st.burn=Math.floor(u.st.burn*0.5);}
  if(d){u.hp-=d;clog(sc,(u.isMain?'Ngươi':u.name)+' '+T(['bị độc hỏa gặm nhấm kinh mạch','bị độc khí và lửa thiêu hành hạ','khí huyết hao mòn vì độc hỏa'])+'.','dot');if(u.hp<=0){down(sc,u);checkEnd(sc);return;}}
  let reg=(fx.regenHp||0)+(u.st.regen>0?6:0);if(u.st.regen>0)u.st.regen--;
  if(reg)u.hp=Math.min(u.max,u.hp+Math.round(u.max*reg/100));
  if(u.maxMp)u.mp=Math.min(u.maxMp,u.mp+Math.round(u.maxMp*(0.05+(fx.regenMp||0)/100)));
  if(u.tl!=null)u.tl=Math.min(100,u.tl+TL_REGEN);
  if(u.st.vuln>0)u.st.vuln--;if(u.st.weak>0)u.st.weak--;
  if(u.esc)u.st.rage=(u.st.rage||0)+1;
  syncMain(sc);
}
function down(sc,u){
  if(u.immune)return;
  if(u.isMain&&!sc.spar&&U('hoi')&&!G.run.revived){G.run.revived=true;u.hp=Math.round(u.max*0.3);clog(sc,'🕯️ Hồi quang phản chiếu! Ngươi gượng đứng dậy.','me');return;}
  u.hp=0;u.phase='down';u.pending=null;u.waitSet=[];doneAct(sc,u);
  // gỡ khỏi mọi waitSet ngay khi gục
  for(const x of sc.units)x.waitSet=x.waitSet.filter(i=>i!==u.id);
  clog(sc,`${u.name} gục ngã.`,u.side==='A'?'en':'win');
}
function checkEnd(sc){
  if(sc.over)return;const me=mainUnit(sc);
  if(me.hp<=0){
    if(sc.spar){me.hp=1;sc.over='lose';clog(sc,'Ngươi gục xuống. Trận đấu kết thúc.','en');}
    else sc.over='dead';
    finishCombat(sc);return;}
  if(sc.kiep){const k=sc.kiep;if(k.done>=k.n){if(k.wave<k.waves){k.wave++;k.done=0;me.hp=Math.min(me.max,me.hp+Math.round(me.max*0.3));clog(sc,`Đợt lôi thứ ${numVi(k.wave)} kéo tới. Ngươi kịp hồi lại một hơi.`,'en');}else{sc.over='win';clog(sc,'Mây kiếp tan. Ngươi vẫn đứng đó.','win');finishCombat(sc);}}return;}
  if(!alive(sc,'B').length){sc.over='win';finishCombat(sc);}
}
function finishCombat(sc){
  sc.done=true;sc.hold=true;sc.dodge=null;sc.qte=null;sc.critQ=null;syncMain(sc);
  const r=G.run;
  // đồng đội: ghi lại khí huyết
  for(const u of sc.units)if(u.ally!=null){const p=(r.party||[]).find(x=>x.id===u.ally);if(p)p.hp=Math.max(0,u.hp);}
  if(r.party)r.party=r.party.filter(p=>p.hp>0);
  if(sc.over==='win'&&!sc.kiep){r.kills+=sc.units.filter(u=>u.side==='B').length;G.meta.kills+=1;if(G.meta.kills>=100)ach('tram');
    clog(sc,`${sc.en.n} bại trận.`,'win');
    const fx=aggFx();if(fx.healAfter){const s=S();r.hp=Math.min(s.maxHp,r.hp+Math.round(s.maxHp*fx.healAfter/100));}
    if(sc.after&&sc.after.nemesis)ach('baothu');}
}
// ---------- người chơi ra lệnh ----------
function readyPlayer(sc){const u=sc&&sc.cur&&U_(sc,sc.cur);return u&&u.ctrl==='player'&&u.phase==='ready'&&!sc.dodge&&!sc.qte&&!sc.critQ?u:null;}
function pSkill(id){
  const r=G.run;if(id==='_atk')return {sk:BASIC,lv:1};if(id==='_guard')return {sk:GUARD_SK,lv:1};if(id==='_wait')return {sk:WAIT_SK,lv:1};if(id==='_block')return {sk:BLOCK_SK,lv:1};
  const own=r.skills.find(x=>x.id===id);return own?{sk:SK[id],lv:own.lv}:null;
}
function atkSlots(){const r=G.run;const at=r.skills.filter(k=>SK[k.id].fx.p).map(k=>k.id);let L=(r.atkSlots||[]).filter(id=>at.includes(id));for(const id of at){if(L.length>=3)break;if(!L.includes(id))L.push(id);}return L.slice(0,3);}
function defSkills(){return G.run.skills.filter(k=>!SK[k.id].fx.p).map(k=>k.id);}
function toggleAtkSlot(id){const r=G.run;let L=atkSlots();if(L.includes(id))L=L.filter(x=>x!==id);else{if(L.length>=3)L.shift();L.push(id);}r.atkSlots=L;}
function needTarget(sc,id){const p=pSkill(id);if(!p)return false;const f=p.sk.fx;return !!(f.p&&!f.aoe&&alive(sc,'B').length>1);}
function playerAct(id,tid){
  const sc=G.run.scene;const u=readyPlayer(sc);if(!u)return false;
  const p=pSkill(id);if(!p)return false;const sk=p.sk;const cost=skillCost(sk);if(u.mp<cost)return false;
  if(sc.kiep&&p.sk.fx.p){tid=sc.units.find(x=>x.kind==='kiep').id;}
  const foes=alive(sc,'B');if(tid==null||!U_(sc,+tid)||U_(sc,+tid).hp<=0)tid=foes.length?foes[0].id:null;
  runAct(sc,()=>beginSkill(sc,u,sk,p.lv,tid==null?null:+tid));return true;
}
function playerPillAct(idx){
  const sc=G.run.scene;const u=readyPlayer(sc);if(!u)return false;
  syncMain(sc);const m=usePill(idx,true);if(!m)return false;
  runAct(sc,()=>{u.hp=G.run.hp;u.mp=G.run.mp;clog(sc,'Dùng '+m+'.','me');toRecover(sc,u,0.8);doneAct(sc,u);});return true;
}
function playerFlee(){
  const sc=G.run.scene;const u=readyPlayer(sc);if(!u||sc.boss||sc.kiep||sc.noFlee)return false;
  const s=S();let p=clamp(0.35+s.tp*0.02,0.2,0.85);if(sc.elite)p*=0.6;if(sc.fleeSure)p=1;
  runAct(sc,()=>{if(chance(p)){sc.over='flee';clog(sc,'Cả đội rút lui, thoát thân.','me');finishCombat(sc);}else{clog(sc,'Thoát không được!','me');toRecover(sc,u,1);doneAct(sc,u);}});return true;
}
// đỡ đòn: giảm khoảng 20–30%, tùy chênh lệch cảnh giới và lực chiến hai bên
function power(u){return Math.sqrt(Math.max(1,u.max)*Math.max(1,(u.atk+(u.matk||u.atk))/2+(u.def||0)));}
function blockCut(att,def){const rd=(def.realm||0)-(att.realm||0);return clamp(0.25+0.03*rd+0.08*Math.log(power(def)/power(att)),0.15,0.35);}
// hết thế đỡ: chạy tiếp từ chỗ đang đứng về mốc cuối
function endStance(sc,u,msg){u.st.stance=0;u._blk=0;u.phase='recover';u.rec=BLOCK_SK.rec;u.pending=null;u.waitSet=[];u.chargeT=0;if(u.pos<50)u.pos=50;if(msg)clog(sc,msg,'fl');sc.rev=(sc.rev||0)+1;}
// ra chiêu xong: nhảy thẳng tới mốc phát lực rồi chạy dần về mốc cuối
function toRecover(sc,u,rec){u.phase='recover';u.rec=rec||1;if(u.pos<PHAT)u.pos=PHAT;u.pending=null;u.waitSet=[];u.chargeT=0;}
// ---------- máy điều khiển ----------
function aiAct(sc,u){
  if(!u||u.hp<=0)return;
  const foes=alive(sc,foeSide(u.side));if(!foes.length){toRecover(sc,u,1);return;}
  const it=u.intent||'atk';const base=EN_SK[it]||EN_SK.atk;
  const sk={id:'_e'+it,n:base.n,el:u.el,t:1,c:0,fx:Object.assign({},base.fx),f:'',rec:base.rec,it};
  if(it==='multi')sk.fx.h=G.run.region>=2?3:2;
  // chọn mục tiêu: 60% kẻ khí huyết thấp nhất, 40% ngẫu nhiên
  const tgt=chance(.6)?foes.slice().sort((a,b)=>a.hp-b.hp)[0]:pick(foes);
  beginSkill(sc,u,sk,1,tgt.id);
  if(u.side==='B'||u.pat)nextIntent(u);
}
// ---------- tung chiêu ----------
function beginSkill(sc,u,sk,lv,tid){
  const cost=skillCost(sk);u.st.stance=0;
  if(u.ctrl==='player'){u.mp-=cost;if(sk.fx.selfHp)u.hp=Math.max(1,u.hp-Math.round(u.max*sk.fx.selfHp/100));}
  if(sk.fx.stance){
    // đỡ đòn: chạy dần từ mốc ra chiêu tới mốc phát lực; trong quãng đó bị đánh thì đỡ được một lần
    u.phase='guard';u.pos=50;u.rec=1;u.chargeT=0;u.pending=null;u.st.stance=1;u._blk=0;u.waitSet=[];
    clog(sc,(u.ctrl==='player'?'Ngươi':u.name)+' thủ thế, chờ đòn.',u.side==='A'?'me':'en');doneAct(sc,u);return;
  }
  if(sk.fx.charge){
    // vào tụ lực: nhảy tới 75, chờ mọi kẻ địch còn sống hành động xong
    // tụ lực: chạy dần từ mốc ra chiêu tới mốc phát lực, tới nơi thì tung chiêu
    u.phase='charge';u.pos=50;u.rec=1;u.chargeT=0;u.pending={sk,lv,tid};u.waitSet=[];
    clog(sc,(u.ctrl==='player'?'Ngươi':u.name)+' bắt đầu tụ lực: '+sk.n+'…',u.side==='A'?'me':'en');
    doneAct(sc,u); // bước vào tụ lực cũng tính là đã hành động
    return;
  }
  doSkill(sc,u,sk,lv,tid,1);
}
function fireCharge(sc,u,qm){
  const p=u.pending;if(!p){toRecover(sc,u,1);return;}
  doSkill(sc,u,p.sk,p.lv,p.tid,qm);
}
function qteResolve(m){
  const sc=G.run.scene;if(!sc||!sc.qte)return;const u=U_(sc,sc.qte.uid);sc.qte=null;
  runAct(sc,()=>fireCharge(sc,u,m==null?1:m));
}
function qteMult(x){if(x==null)return 1;const d=Math.abs(x-0.5);return d<=0.07?1.3:d<=0.2?1.1:0.9;}
// chọn mục tiêu thật sự lúc ra đòn
function pickTargets(sc,u,sk,tid){
  const f=sk.fx;const side=foeSide(u.side);
  if(f.aoe)return alive(sc,side).filter(x=>!x.immune||sc.kiep);
  let t=tid!=null?U_(sc,tid):null;
  if(!t||t.hp<=0||t.side!==side){const L=alive(sc,side);if(!L.length)return [];t=L.slice().sort((a,b)=>a.hp-b.hp)[0];}
  return [t];
}
function hasDmg(sk){return !!sk.fx.p;}
function doSkill(sc,u,sk,lv,tid,qm){
  const f=sk.fx;
  const tg=hasDmg(sk)?pickTargets(sc,u,sk,tid):[];
  if(hasDmg(sk)&&!tg.length){clog(sc,(u.ctrl==='player'?'Ngươi':u.name)+' mất mục tiêu, chiêu bị hủy.',u.side==='A'?'me':'en');finishAct(sc,u,sk);return;}
  const me=mainUnit(sc);
  const autoD=G.meta.opt&&G.meta.opt.autoDodge;
  // nhắm vào nhân vật người chơi: hiện vòng né
  if(hasDmg(sk)&&tg.includes(me)&&u.side==='B'&&!autoD&&!sc.skipDodge){
    const n=Math.min(3,f.h||1);
    sc.dodge={id:(sc.did=(sc.did||0)+1),uid:u.id,sk,lv,tids:tg.map(x=>x.id),qm,n,T:u.phase==='charge'?1.1:0.8,lit:false};sc.rev++;return;
  }
  let ao=autoD?'auto':null;if(ao&&tg.includes(me)&&u.side==='B'){if(me.tl>=TL_DODGE)me.tl-=TL_DODGE;else ao=[];}
  resolveSkill(sc,u,sk,lv,tg,qm,ao);
}
// offs: mảng độ lệch (giây) cho tối đa 3 nhát đầu; null = không nhấn
function dodgeResolve(offs){
  const sc=G.run&&G.run.scene;if(!sc||!sc.dodge)return;const d=sc.dodge;sc.dodge=null;
  const u=U_(sc,d.uid);
  runAct(sc,()=>{
    if(d.kiep){kiepHit(sc,u,offs&&offs[0]);return;}
    const me=mainUnit(sc);if(Array.isArray(offs))offs=offs.map(o=>{if(o==null)return null;if(me.tl>=TL_DODGE){me.tl-=TL_DODGE;return o;}return null;});
    const tg=d.tids.map(i=>U_(sc,i)).filter(x=>x&&x.hp>0);
    if(!tg.length){finishAct(sc,u,d.sk);return;}
    resolveSkill(sc,u,d.sk,d.lv,tg,d.qm,offs||[]);
  });
}
function dodgeP(att,def,off,isMain){
  // tỉ lệ né dựa vào Né của bên bị đánh và Chính xác của bên đánh
  const base=clamp(0.35+(def.ne-att.cx)*0.025,0.05,0.80);
  if(!isMain)return {p:base*0.5,q:null};
  if(off==='auto')return {p:base*0.8,q:'kha'};
  if(off==null||Math.abs(off)>0.25)return {p:0,q:null}; // không bấm hoặc bấm hụt: không né được
  return {p:1,q:Math.abs(off)<=0.09?'chuan':'kha'}; // bấm trúng nhịp: chắc chắn né
}
function resolveSkill(sc,u,sk,lv,tg,qm,offs){
  const f=sk.fx,isP=u.ctrl==='player';const s=isP?S():null;const fx=isP?s.fx:{};
  const lvM=1+0.25*((lv||1)-1);const who=isP?'Ngươi':u.name;
  let total=0,hits=0,dod=0,blk=0,crits=0,msg=isP?(sk.id==='_atk'?T(['Ngươi vung chưởng đánh ra','Ngươi vận chân khí tung một quyền','Ngươi điểm ra một chỉ','Ngươi lướt tới, xuất thủ']):'Ngươi thi triển '+sk.n):sk.n;for(const t of tg)t._blk=0;
  if(f.p){
    const n=f.h||1;
    for(const t of tg){
      if(t.hp<=0&&!t.immune)continue;
      for(let h=0;h<n;h++){
        if(t.hp<=0&&!t.immune)break;
        if(t.kind==='kiep'){const d0=dmgCalc(u.atk,u.st.rage,u.st.weak,0,0,f.p,(isP?elemMult(sk.el,'loi'):1)*lvM*qm*(f.aoe?0.6:1),0);total+=d0;hits++;continue;}
        // né
        let ev=false,q=null;
        if(t.st.evade>0){t.st.evade--;ev=true;}
        else{const o=offs==='auto'?'auto':(Array.isArray(offs)?offs[Math.min(h,2)]:null);const D=dodgeP(u,t,o,t.isMain&&offs!=null);q=D.q;ev=R()<D.p;}
        if(ev){dod++;cfx(sc,{k:'dodge',id:t.id});if(t.isMain&&q==='chuan')t.bonusPos=8;continue;}
        let mult=lvM*qm*(f.aoe?0.6:1);
        if(isP){mult*=elemMult(sk.el,t.el);if(f.bonusIf==='dot'&&(t.st.poison>0||t.st.burn>0))mult*=1.5;if(fx.execute&&t.hp<t.max*0.3)mult*=1+fx.execute/100;}
        else if(KHAC[u.el]===t.el)mult*=1.25;
        const magic=(sk.dt?sk.dt==='phep':(!isP&&(u.f==='quy'||u.f==='vat')));const av=magic?(u.matk||u.atk):u.atk;
        const crit=u._critF!=null?u._critF:chance(((u.crit||5)+(f.crit||0))/100);if(crit){mult*=Math.max(1.1,((u.critDmg||150)-(t.hoTam||0))/100);crits++;}
        let d=dmgCalc(av,u.st.rage,u.st.weak,t.def,t.st.vuln,f.p,mult,f.pierce);
        if(t.st.stance){if(!t._blk){if((t.tl==null?100:t.tl)>=TL_BLOCK){if(t.tl!=null)t.tl-=TL_BLOCK;t._blk=1;blk++;}else t._blk=2;}if(t._blk===1)d=Math.max(1,Math.round(d*(1-blockCut(u,t))));}
        d=absorb(t.st,d);t.hp-=d;total+=d;hits++;onHit(sc,u,t,d,crit,t._blk===1,sk);
        if(t.isMain&&d>0){const fx2=S().fx;if(fx2.reflect){u.hp-=Math.round(d*fx2.reflect/100);if(u.hp<=0)down(sc,u);}}
        if(isP){if(fx.poisonHit)t.st.poison=(t.st.poison||0)+Math.round(u.atk*fx.poisonHit);if(fx.burnHit)t.st.burn=(t.st.burn||0)+Math.round(u.atk*fx.burnHit);}
        // phá tụ lực
        if(t.phase==='charge'&&d>=t.max*0.15&&!(t.pending&&t.pending.sk.fx.steady)){clog(sc,`${t.name} bị phá thế tụ lực!`,t.side==='A'?'en':'me');toRecover(sc,t,1);t.pos=75;doneAct(sc,t);}
        if(t.hp<=0){down(sc,t);checkEnd(sc);if(sc.over)break;}
      }
      if(sc.over)break;
      // trạng thái lên mục tiêu
      if(t.hp>0&&!t.immune){
        if(f.poison)t.st.poison=(t.st.poison||0)+Math.round(u.atk*f.poison*lvM);
        if(f.epoison&&!(t.isMain&&S().fx.poisonImm))t.st.poison=(t.st.poison||0)+Math.round(u.atk*f.epoison);
        if(f.burn)t.st.burn=(t.st.burn||0)+Math.round(u.atk*f.burn*lvM);
        if(f.eburn)t.st.burn=(t.st.burn||0)+Math.round(u.atk*f.eburn);
        if(f.weak)t.st.weak=Math.max(t.st.weak||0,f.weak);
        if(f.vuln)t.st.vuln=Math.max(t.st.vuln||0,f.vuln);
        const stunC=(f.stun||0)+(isP?(fx.stunP||0):0);
        if(stunC&&chance(stunC/100*(t.boss?0.5:1))){t.stunT=STUN_S;msg+=' 💫';
          if(t.phase==='charge'&&!(t.pending&&t.pending.sk.fx.steady)){toRecover(sc,t,1);t.pos=75;clog(sc,`${t.name} bị choáng, tụ lực tan biến.`,'fl');}
          doneAct(sc,t);}
      }
    }
    for(const t of tg)if(t.st.stance&&t.phase==='guard'&&t._blk&&t.hp>0)endStance(sc,t,null);
    if(total&&(f.drain||(isP&&fx.drain)))u.hp=Math.min(u.max,u.hp+Math.round(total*((f.drain||0)+(isP?fx.drain||0:0))/100));
    if(total&&f.edrain)u.hp=Math.min(u.max,u.hp+Math.round(total*f.edrain/100));
    if(sc.kiep&&total){const k=sc.kiep;const me=mainUnit(sc);const cut=Math.min(0.25,total/me.max*0.5);k.uy=Math.max(0.3,k.uy-cut);msg+=', kiếp uy yếu bớt';}
  }
  // tự thân
  const hp0=u.hp;
  if(f.block)u.st.block=(u.st.block||0)+Math.round(u.atk*f.block*lvM);
  if(f.eblock)u.st.block=(u.st.block||0)+Math.round(u.atk*f.eblock);
  if(f.heal)u.hp=Math.min(u.max,u.hp+Math.round(u.max*f.heal*lvM/100));
  if(f.eheal)u.hp=Math.min(u.max,u.hp+Math.round(u.max*(u.boss?0.07:0.1)));
  if(f.regen)u.st.regen=Math.max(u.st.regen||0,f.regen);
  if(f.rage)u.st.rage=(u.st.rage||0)+f.rage;
  if(f.evade)u.st.evade=(u.st.evade||0)+f.evade;
  if(f.cleanse){u.st.poison=0;u.st.burn=0;u.st.weak=0;}
  if(f.stance){u.st.stance=1;msg='Thủ thế đỡ đòn';}
  if(f.guard){u.st.block=(u.st.block||0)+Math.round(u.atk*0.9+u.max*0.06);const g=Math.round(u.maxMp*0.3);u.mp=Math.min(u.maxMp,u.mp+g);msg='Vận khí thủ thế'+(g?', linh lực hồi lại một phần':'');}
  const tgN=cbTgName(tg),tgR=total/Math.max(1,tg.reduce((a,t)=>a+(t.max||0),0));
  if(total&&!(tg[0]&&tg[0].kind==='kiep')){if(hits>1)msg+=' liền '+numVi(hits)+' đòn';msg+=', '+hitPh(tgR,tgN);}
  if(crits)msg+='. Trúng chỗ hiểm!';if(dod)msg+='. '+capS(tgN)+' lách mình né được'+(dod>1?' '+numVi(dod)+' đòn':'');if(blk)msg+=', bị đỡ lại';
  if(f.p&&!total&&!dod&&hits)msg+=', đánh vào hộ thể mà không suy suyển';
  if(isP&&sk.f&&!sc['_u'+sk.id]){sc['_u'+sk.id]=1;clog(sc,sk.f,'fl');}
  if(!isP){const V=(VERB[u.f]||VERB.vat);const it=sk.it;const tail=(total?', '+hitPh(tgR,tgN):'')+(dod?'. '+capS(tgN)+' lách mình tránh được':'')+(crits?'. Trúng chỗ hiểm!':'')+(blk?'. '+capS(tgN)+' đỡ được':'');msg=(V[it]?T(V[it]):(VERB2[it]||'{e} ra tay')).replace('{e}',u.name)+tail+(f.p&&!total&&!dod?', bị hộ thể chặn lại':'');if(sk.fx.charge)msg=T((VERB[u.f]||VERB.vat).heavy).replace('{e}',u.name)+tail;}
  if(u.hp>hp0)cfx(sc,{k:'heal',id:u.id,d:Math.round(u.hp-hp0)});
  if(f.guard||f.block||f.eblock)cfx(sc,{k:'shield',id:u.id});
  clog(sc,msg+(/[.!?…]$/.test(msg)?'':'.'),u.side==='A'?'me':'en');
  finishAct(sc,u,sk);
}
function finishAct(sc,u,sk){
  if(u.hp>0){const from75=u.phase==='charge';toRecover(sc,u,skRec(sk));if(from75)u.pos=75;if(u.bonusPos){u.bonusPos=0;}}
  doneAct(sc,u);
  // thưởng né chuẩn: +8 điểm ở vòng chạy kế tiếp
  for(const x of sc.units)if(x.bonusPos&&x.phase==='run'){x.pos=Math.min(49,x.pos+x.bonusPos);x.bonusPos=0;}
}
function absorb(st,d){if(st.block>0){const a=Math.min(st.block,d);st.block-=a;d-=a;}return d;}
function dmgCalc(atk,rage,weak,def,vuln,power,mult,pierce){
  const raw=atk*power*mult*(1+0.12*(rage||0))*(weak?0.7:1)*(0.9+R()*0.2);
  let d=Math.max(raw*0.25,raw-def*0.7*(1-(pierce||0)));
  if(vuln)d*=1.3;return Math.max(1,Math.round(d));
}
function elemMult(skEl,enEl){const r=G.run,fx=aggFx();let m=1;
  if(r.root.els.includes(skEl))m*=1.25;
  m*=1+((fx.elP&&fx.elP[skEl])||0)/100;
  if(KHAC[skEl]===enEl)m*=1.5;else if(KHAC[enEl]===skEl)m*=0.8;
  return m;}
// ---------- lôi kiếp ----------
function kiepStrike(sc,k){
  const me=mainUnit(sc);
  if(G.meta.opt&&G.meta.opt.autoDodge){kiepHit(sc,k,'auto');return;}
  if(sc.skipDodge){kiepHit(sc,k,null);return;}
  sc.dodge={id:(sc.did=(sc.did||0)+1),uid:k.id,kiep:1,n:1,T:1.1,lit:true};sc.rev++;
}
function kiepHit(sc,k,off){
  const K=sc.kiep,me=mainUnit(sc);const i=K.done+1;
  let d=Math.round(me.max*(0.14+0.03*i)*K.uy);K.uy=1;
  if(me.st.stance&&me.tl>=TL_BLOCK){me.tl-=TL_BLOCK;d=Math.round(d*(1-0.25));}
  if(me.st.stance&&me.phase==='guard')endStance(sc,me,null);
  let red=0;if(off==='auto')red=0.25*0.6;else if(off!=null&&Math.abs(off)<=0.09)red=0.5;else if(off!=null&&Math.abs(off)<=0.25)red=0.25;
  d=Math.round(d*(1-red));d=absorb(me.st,d);me.hp-=d;K.done++;
  clog(sc,`Đạo lôi thứ ${numVi(i)}${K.waves>1?' của đợt '+numVi(K.wave):''} giáng xuống, `+hitPh(d/Math.max(1,me.max),'ngươi')+(red?(red>=0.5?'. Ngươi đón đúng thời khắc, hóa giải được phần lớn lôi lực':'. Ngươi gồng mình chống đỡ, giảm bớt lôi lực'):'')+'.','en');
  doneAct(sc,k); // người đang tụ lực: waitSet rỗng khi kiếp vân giáng xong
  k.phase='run';k.pos=0;
  if(me.hp<=0){me.hp=0;down(sc,me);}
}
// ---------- kết thúc trận ----------
function combatContinue(){
  const r=G.run,sc=r.scene;const res=sc.over;const af=sc.after||{kind:'node'};
  if(af.kind==='bt'){btAfterStage(res);return;}
  if(res==='dead'){die(sc.en.n==='Tâm Ma'?'tamma':'combat',sc.en);return;}
  advanceTime(1);if(!G.run)return;
  if(af.kind==='place'){openPlace(r.at);const ps=r.scene;ps.msg=af.msg||[];if(res==='win'){ps.chips=applyE({tv:6,st:8});ps.msg.push('Kẻ phá quan đã nằm xuống. Ngươi ngồi lại, nhưng tâm cảnh khó mà tĩnh như trước.');}else{ps.msg.push('Ngươi bỏ động phủ mà chạy.');}return;}
  if(af.kind==='cross'){if(res==='win'){r.scene=null;doCross(af.k,'fight');}else{r.scene={type:'pass',id:r.at,back:r.at,k:af.k,text:'Ngươi bị đánh bật trở lại. Kẻ gác ải đứng chắn trên cổng, cười lạnh.'};}return;}
  if(af.kind==='ent'&&typeof entAfter==='function'){entAfter(af,res,sc);return;}
  const en=sc.en;const many=sc.units.filter(u=>u.side==='B').length;
  if(af.kind==='ev'){
    const e=EVMAP[af.ev.id];const out=resolveP(e,af.path);
    r.scene=af.ev;const esc=r.scene;
    if(res==='win'){
      const gain=applyE({tv:sc.elite?12:6,st:(sc.elite?15:6)*(many>1?1.4:1)},esc.v);
      const w=out.win||{t:'Đối thủ đã gục. Ngươi thở dốc, lau vết máu trên khóe miệng.'};
      doOutcome(w,[...af.path,'win'],gain);
    } else if(res==='lose'){
      doOutcome(out.lose||{t:'Ngươi thua. Đối phương thu tay, không truy cùng giết tận.',e:{tv:3}},[...af.path,'lose'],[]);
    } else {
      esc.story.push(pick(['Ngươi thoát thân, tim vẫn đập thình thịch.','Ngươi bỏ chạy, không ngoảnh lại.','Ngươi rút lui. Có những trận không đáng đánh.']));esc.phase='done';esc.chips=[];
    }
    return;
  }
  if(res==='flee'||res==='lose'){r.scene={type:'combat',back:sc.back};endScene();return;}
  if(af.kind==='boss'){r.bossKills++;r.bossDone[r.region]=1;bio(T(`Năm ${Math.floor(r.age)} tuổi, đánh bại ${en.n} ở ${r.place.n}.`));log(`Đánh bại ${en.n}.`);rewardScene('boss',en);return;}
  rewardScene(sc.elite?'elite':'normal',en,many);
}
function rememberKill(en){}
// ---------- tiện cho bot và kiểm thử ----------
function intentPreview(u){
  const sc=G.run.scene;const me=mainUnit(sc);const it=u.intent;const B=EN_SK[it];if(!B||!B.fx.p)return '';
  const p=B.fx.p;const d=Math.max(1,Math.round(Math.max(u.atk*p*(1+0.12*(u.st.rage||0))*(u.st.weak?0.7:1)*0.25,u.atk*p*(1+0.12*(u.st.rage||0))*(u.st.weak?0.7:1)-me.def*0.7)*(me.st.vuln?1.3:1)));
  return it==='multi'?d+'×'+(G.run.region>=2?3:2):String(d);
}

// ---------------- ĐỘT PHÁ: CHUẨN BỊ → XUNG QUAN → THIÊN KIẾP ----------------
const QNAME=['Phàm','Nhân đạo','Địa đạo','Thiên đạo'];
const QPRE=['','Nhân Đạo','Địa Đạo','Thiên Đạo'];
const QMUL=[1,1.06,1.13,1.22],QLIFE=[0,5,10,20];
const BT_BASE=[0.62,0.52,0.46,0.40,0.35];
function qOf(p){return p>=10?3:p>=6?2:p>=3?1:0;}
function qNext(p){return p<3?3:p<6?6:p<10?10:null;}
function qualName(realm,q){return (q?QPRE[q]+' ':'')+REALM[realm];}
function qMulAll(r){let m=1;for(let i=1;i<=Math.min(r.realm,4);i++)m*=QMUL[(r.quality||[])[i]||0];return m;}
function btTarget(){const r=G.run;return r.realm>=4?5:r.realm+1;}
function btStages(to){return to===1?[]:to===2?['tamma']:to===3?[{n:6}]:to===4?[{n:9},'tamma']:[{n:9,waves:3}];}
function btItems(){const r=G.run;return r.pills.map((p,i)=>({p,i})).filter(x=>PILL[x.p.id].bt&&(PILL[x.p.id].realm==null||PILL[x.p.id].realm===r.realm));}
function btEff(slots){
  const r=G.run;const o={rate:0,guard:0,kiepHp:0,kiepCut:0,dao:0};
  for(const i of slots){const it=r.pills[i];if(!it)continue;const b=PILL[it.id].bt;const m=PQM[it.q||0];
    if(b.rate)o.rate+=Math.round(b.rate*m);if(b.guard)o.guard=1;if(b.kiepHp)o.kiepHp+=b.kiepHp;if(b.kiepCut)o.kiepCut+=b.kiepCut;if(b.dao)o.dao+=b.dao;}
  return o;
}
function btRate(slots){
  const r=G.run,s=S();const e=btEff(slots||[]);
  const p=BT_BASE[Math.min(4,r.realm)]+(s.ngo-10)*0.012+(s.tam-10)*0.012-r.tamma*0.004+(r.btFail||0)*0.08+e.rate/100;
  return clamp(p,0.05,0.97);
}
function btChance(){return btRate([]);}
function canBreak(){const r=G.run;return (r.tv>=100||(lkOn()&&lkTang()>=9))&&(r.realm<4||(r.realm===4&&r.region===4));}
function openPrep(n){const r=G.run;r.scene={type:'prep',slots:[],back:n.id,id:n.id};}
function prepToggle(i){
  const sc=G.run.scene;if(!sc||sc.type!=='prep')return;i=+i;
  const k=sc.slots.indexOf(i);if(k>=0){sc.slots.splice(k,1);return;}
  if(sc.slots.length>=3)return;if(!btItems().some(x=>x.i===i))return;sc.slots.push(i);
}
function prepView(){const sc=G.run.scene;const e=btEff(sc.slots);const p=G.run.dao+e.dao;return {rate:btRate(sc.slots),e,dao:p,q:qOf(p),next:qNext(p)};}
function prepStart(){
  const r=G.run,sc=r.scene;if(!sc||sc.type!=='prep'||!canBreak())return;
  const to=btTarget();const e=btEff(sc.slots);const p=btRate(sc.slots);
  // tiêu hao đúng một lần, trước khi gieo số
  const idx=sc.slots.slice().sort((a,b)=>b-a);const used=idx.map(i=>r.pills[i]).filter(Boolean).map(x=>PILL[x.id].n);for(const i of idx)r.pills.splice(i,1);
  sc.slots=[];
  advanceTime(HM);if(!G.run)return;
  const back=sc.back;
  r.bt={to,guard:e.guard,kiepHp:e.kiepHp,kiepCut:e.kiepCut,dao:e.dao,si:0,stages:btStages(to),hpLeft:null,used};
  if(R()<p){
    const txt=to===5?'Ngươi ngẩng nhìn trời. Mây đen đã kéo tới từ bốn phương, xoáy thành một con mắt khổng lồ.':T(['Linh khí cuộn trào, quan ải đầu tiên đã phá. Nhưng trời đất còn chưa chịu buông tha.','Xung quan thành công. Ngươi thở ra một hơi, rồi nghe thấy tiếng sấm rền phía chân trời.']);
    r.scene={type:'btres',back,ok:true,text:txt,chips:used.map(n=>chip('⚗️',n,'Đã dùng','')),stage:0};
    if(!r.bt.stages.length){btFinish();return;}
  } else btFail(back,used);
}
function btFail(back,used){
  const r=G.run;const g=r.bt&&r.bt.guard;
  r.btFail=(r.btFail||0)+1;r.dao-=2;
  let ch=(used||[]).map(n=>chip('⚗️',n,'Đã dùng',''));
  if(g){ch=ch.concat(applyE({tamma:5}));}else ch=ch.concat(applyE({hp:'-40%',tv:-25,tamma:10}));
  ch.push(chip('☯️','đạo cơ −2','Thất bại làm tổn hại đạo cơ','dn'));
  log('Đột phá thất bại.');r.bt=null;
  r.scene={type:'btres',back,ok:false,text:T(REST_T.btf)+(g?' May có vật hộ mệnh, kinh mạch không tổn hại.':''),chips:ch,done:1};
}
function btNextStage(){
  const r=G.run;const b=r.bt;if(!b)return;const st=b.stages[b.si];
  if(st==='tamma'){startCombat({k:'tamma'},{kind:'bt'});r.scene.noFlee=1;clog(r.scene,'Tâm ma kiếp: bóng tối trong lòng ngươi đứng dậy.','en');return;}
  let n=st.n-(b.kiepCut||0);n=Math.max(1,n);
  startCombat({kiep:{n,waves:st.waves||1,block:b.kiepHp}},{kind:'bt'});
}
function btAfterStage(res){
  const r=G.run,sc=r.scene,b=r.bt;const back=sc.back;
  const me=mainUnit(sc);
  if(res!=='win'){
    if(b&&b.guard){r.hp=1;r.scene=null;btFail(back,[]);r.scene.text='Ngươi gục giữa kiếp. Vật hộ mệnh vỡ tan, giữ lại cho ngươi một hơi thở. Đột phá thất bại.';return;}
    r.bt=null;die(b&&b.stages[b.si]==='tamma'?'tamma':'kiep',{n:'Thiên kiếp'});return;
  }
  if(sc.kiep)b.hpLeft=Math.min(b.hpLeft==null?1:b.hpLeft,me.hp/me.max);
  r.hp=Math.max(1,me.hp);b.si++;
  if(b.si<b.stages.length){r.scene={type:'btres',back,ok:true,text:'Một kiếp đã qua. Trời vẫn còn chưa yên.',chips:[],stage:b.si};return;}
  r.scene={type:'btres',back,ok:true,text:'',chips:[]};btFinish();
}
function btFinish(){
  const r=G.run,sc=r.scene,b=r.bt;const to=b.to;
  if(to===5){r.bt=null;victory();return;}
  let pts=r.dao+b.dao;const kiepBonus=b.hpLeft!=null&&b.hpLeft>=0.5;if(kiepBonus)pts+=2;
  const q=qOf(pts);
  r.realm=to;r.quality[to]=q;r.tv=0;r.btFail=0;r.tvMinor=0;r.dao=0;r.daoSk=0;r.daoPill=0;r.maxRealm=Math.max(r.maxRealm,r.realm);
  const s1=S();r.hp=s1.maxHp;r.mp=s1.maxMp;
  const name=qualName(to,q);
  sc.text=(T(REST_T.bt[to-1])+' '+['','Đạo cơ vững vàng hơn người thường.','Đạo cơ rắn như đá núi, trời đất cũng phải ghi nhận.','Thiên Đạo ban phẩm! Mưa hoa rơi khắp động phủ, mây lành ngũ sắc kéo tới.'][q]).trim();
  sc.ok=true;sc.done=1;
  sc.chips=[chip('☯️',name,'Đại cảnh giới mới.\nPhẩm chất: '+QNAME[q]+'\nHệ số chỉ số ×'+String(QMUL[q]).replace('.',',')+', thọ nguyên +'+QLIFE[q]+'%','up'),chip('⏳','thọ '+s1.life,'Thọ nguyên mới','up')];
  if(kiepBonus)sc.chips.push(chip('🌩️','đạo cơ +2','Qua thiên kiếp với hơn nửa khí huyết','up'));
  log(`Đột phá ${name}.`);bio(`Năm ${Math.floor(r.age)} tuổi, đột phá ${name} ở ${r.place.n}.`);
  ach(['','tc','kd','na','ht'][to]);if(q===3&&to===2)ach('vokhuyet');
  r.bt=null;sense();
}
function btContinue(){const r=G.run,sc=r.scene;if(r.bt&&!sc.done&&r.bt.si<r.bt.stages.length){btNextStage();return;}endScene();}
// điểm đạo cơ
function addDao(x,src){
  const r=G.run;if(!x)return 0;
  if(src==='skill'){if((r.daoSk||0)>=2)return 0;r.daoSk=(r.daoSk||0)+1;}
  if(src==='pill'){const room=4-(r.daoPill||0);x=Math.max(0,Math.min(x,room));r.daoPill=(r.daoPill||0)+x;}
  r.dao=(r.dao||0)+x;return x;
}

// ---------------- THƯỞNG ----------------
function genPicks(kind){
  const r=G.run,n=3+U('duyen');const out=[];const reg=r.region;
  const relT=clamp(reg+(kind==='boss'?1:0)+(kind==='elite'&&chance(.4)?1:0),0,4);
  for(let i=0;i<n;i++){
    let k;
    if(kind==='boss')k=i<2?'relic':pick(['relic','skill']);
    else if(kind==='elite')k=i===0?'relic':pick(['relic','skill','pill']);
    else k=pick(['skill','pill','pill','st','relic']);
    if(k==='relic')out.push({k,rel:genRelic(relT)});
    else if(k==='skill'){let id,g=0;do{id=rollSkill(kind==='boss'?[1,2,3,4,4][reg]:null);}while(out.some(o=>o.id===id)&&g++<10);out.push({k,id});}
    else if(k==='pill')out.push({k,id:rollPill(),q:reg>=3?ri(1,2):reg>=1?ri(0,1):0});
    else out.push({k:'st',n:Math.max(1,Math.round(ri(18,30)*SC[reg]))});
  }
  return out;
}
function rewardScene(kind,en){
  const r=G.run;
  const base={normal:{tv:7,st:9},elite:{tv:15,st:22},boss:{tv:25,st:55}}[kind];
  const chips=applyE({st:base.st+ri(-3,4)}); // đánh nhau không cho tu vi: lịch luyện tính ở finishCombat
  {const af=r.scene&&r.scene.after;if(af&&af.quest)questWin(af.quest).forEach(c=>chips.push(c));}
  if(kind==='boss'){const s=S();r.hp=Math.min(s.maxHp,r.hp+Math.round(s.maxHp*0.5));r.mp=s.maxMp;}
  const picks=(kind!=='normal'||chance(.55))?genPicks(kind):[];
  const text=kind==='boss'?T(['{$e} ngã xuống, đất trời như lặng đi một nhịp. Ngươi đứng giữa chiến trường, gió thổi tung vạt áo.','Đòn cuối cùng. {$e} gục xuống, không còn đứng dậy. Ngươi thở ra một hơi dài, như trút được cả một vùng trời.'],{e:en.n})
    :T(['{$e} không còn động đậy. Ngươi lục lọi chiến trường.','Trận chiến kết thúc. Ngươi chỉnh lại y phục, nhặt nhạnh những gì còn dùng được.','{$e} gục xuống. Bụi lắng, máu thấm vào đất.','Một trận ác chiến. Ngươi thắng, nhưng không vui lắm.','Kết thúc nhanh gọn. {$e} thậm chí chưa kịp kêu.'],{e:en.n});
  if(kind==='boss'&&r.region>=4){chips.push(chip('☁️','cửa trời mở','Đạt Hóa Thần viên mãn, độ kiếp ở động phủ để phi thăng','item'));const p=gainPill('thiendao',2);if(p)chips.push(p);}
  if(kind==='boss'&&r.region<4&&!r.passes.includes(r.region+1)){r.passes.push(r.region+1);chips.push(chip('🎫','Lệnh bài thông quan','Trình ở quan ải để sang '+REG[r.region+1].n,'item'));}
  r.scene={type:'reward',kind,text,chips,picks,taken:-1,back:sceneBack()};
}
function takePick(i){
  const r=G.run,sc=r.scene;if(sc.taken>=0)return;const p=sc.picks[i];if(!p)return;sc.taken=i;let c;
  if(p.k==='relic'){r.relics.push(p.rel);clampHp();log(`Nhận được ${p.rel.name}.`);c=chip('🏺',p.rel.name,relicTip(p.rel),'item');}
  else if(p.k==='skill')c=gainSkill(p.id);
  else if(p.k==='pill')c=gainPill(p.id,p.q);
  else {r.st+=p.n;c=chip('💎','+'+p.n,'Linh thạch','up');}
  sc.chips=sc.chips.concat([c]);
}
function rewardContinue(){endScene();}

// ---------------- THỜI GIAN ----------------
// Đơn vị gốc: giờ game, lưu ở G.meta.world.t. Mọi thay đổi thời gian đi qua advanceTime(h).
const HD=24, HM=720, HY=8640;
const MONTH=['Giêng','Hai','Ba','Tư','Năm','Sáu','Bảy','Tám','Chín','Mười','Mười Một','Chạp'];
const CHI=['Tý','Sửu','Dần','Mão','Thìn','Tỵ','Ngọ','Mùi','Thân','Dậu','Tuất','Hợi'];
const PART={sang:{n:'sáng',i:'🌅'},chieu:{n:'chiều',i:'☀️'},toi:{n:'tối',i:'🌇'},dem:{n:'đêm',i:'🌙'}};
const SEASON={xuan:'xuân',ha:'hạ',thu:'thu',dong:'đông'};
function W(){return G.meta.world;}
function tYear(t){return 1000+Math.floor(t/HY);}
function tMonth(t){return Math.floor((t%HY)/HM);}
function tHour(t){return t%HD;}
function partOf(t){const h=tHour(t);return h>=5&&h<11?'sang':h>=11&&h<17?'chieu':h>=17&&h<21?'toi':'dem';}
function seasonOf(t){const m=tMonth(t)+1;return m<=3?'xuan':m<=6?'ha':m<=9?'thu':'dong';}
function gioName(t){return CHI[Math.floor(((Math.floor(tHour(t))+1)%24)/2)];}
function dateText(t){return `Năm ${tYear(t)}, tháng ${MONTH[tMonth(t)]}, giờ ${gioName(t)}`;}
function durH(h){if(h<24)return Math.max(1,Math.round(h))+' giờ';if(h<HM)return Math.round(h/24)+' ngày';if(h<HY)return Math.round(h/HM)+' tháng';return (Math.round(h/HY*10)/10).toString().replace('.',',')+' năm';}
let TICK_OUT=null; // gom "chuyện xảy ra trong lúc đó"
function advanceTime(h){
  const w=W(),out=[];
  if(!(h>0))return out;
  const outer=TICK_OUT;TICK_OUT=out;
  try{
    if(h<=48){w.t+=h;worldStep(h);}
    else{
      const fine=Math.min(h,30*HD);
      for(let d=0;d<fine-1e-9;d+=HD){const s=Math.min(HD,fine-d);w.t+=s;worldStep(s);if(!G.run&&G.screen==='over')break;}
      let rest=h-fine;const m=Math.floor(rest/HM);
      if(m>0){worldCoarse(m);worldCoarseEnts();if(G.run)director();}
      rest-=m*HM;if(rest>0){w.t+=rest;worldStep(Math.min(rest,HD));}
    }
    while(tYear(w.t)>=w.bangY){w.bangY+=10;if(G.run)publishBang();}
    const r=G.run;
    if(r){
      r.age=r.birthAge+(w.t-r.bornT)/HY;
      if(r.age>=S().life&&!(r.scene&&r.scene.type==='combat')){die('toahoa');}
    }
    if(G.run&&typeof timeHooks==='function')timeHooks(h);
  }finally{TICK_OUT=outer;if(outer)outer.push(...out);}
  return out;
}
function worldStep(h){
  const r=G.run;
  if(r){
    worldTick(h/HY);
    if(!(r.scene&&r.scene.type==='combat')){
      const s=S();r.rgH=(r.rgH||0)+s.maxHp*0.005*h;r.rgM=(r.rgM||0)+s.maxMp*0.02*h;
      const a=Math.floor(r.rgH),b=Math.floor(r.rgM);r.rgH-=a;r.rgM-=b;
      r.hp=Math.min(s.maxHp,r.hp+a);r.mp=Math.min(s.maxMp,r.mp+b);
    }
  }
  nodeRecover();
}
function worldCoarse(m){
  const w=W();
  for(let i=0;i<m;i++){
    w.t+=HM;
    if(G.run)worldTick(HM/HY);
    if(chance(.08))flipNode();
    nodeRecover();
  }
}
function nodeRecover(){
  const w=W();
  for(const R0 of w.regions)for(const n of R0.nodes){if(n.state==='ruin'&&w.t>=n.stateUntil){n.state='ok';n.stateUntil=0;}}
}
function flipNode(){
  const w=W();const r=G.run;
  const pool=[];for(const R0 of w.regions)for(const n of R0.nodes)if(['tran','thanh','tong'].includes(n.type)&&(!r||n.id!==r.at))pool.push(n);
  if(!pool.length)return;const n=pick(pool);
  if(n.state==='ruin'){n.state='ok';n.stateUntil=0;chron(`${n.name} dần hồi sinh, khói bếp lại bốc lên.`);}
  else if(n.type==='tong'){const s=pick(w.sects);n.owner=s.n;chron(`Sơn môn ở ${n.name} đổi chủ, nay thuộc ${s.n}.`);}
  else {n.state='ruin';n.stateUntil=w.t+6*HM;chron(`${n.name} gặp nạn, thành hoang tàn.`);}
}
function chron(t){const w=W();w.chron.push({y:tYear(w.t),t});if(w.chron.length>60)w.chron.shift();if(TICK_OUT)TICK_OUT.push(t);if(G.run)pushNews(t,true);}

// ---------------- BẢN ĐỒ ----------------
const SENSE=[120,200,320,500,800,800];
const WALK=[8,20,60,200,800,800];
const CROSS_M=[0,1,2,4,6];
const WILD=['rung','nui','song','bien','hoang'];
TYPE_NAME.ai='quan ải';TYPE_NAME.sao='sào huyệt';
PLACE.sfx.ai=['Quan','Ải','Quan Ải','Quan'];PLACE.sfx.sao=['Sào Huyệt','Trại','Hang Ổ','Ma Quật'];
const NODE_IC={tran:'🏘️',thanh:'🏯',rung:'🌲',nui:'⛰️',song:'🌊',phe:'🏚️',dong:'🕳️',tong:'⛩️',bien:'🐚',hoang:'🏜️',ma:'💀',thien:'☁️',ai:'🚧',sao:'☠️'};
const DANGER=['Yên bình','Có nguy','Hiểm địa','Tử địa'];
function genRegion(k,w){
  const reg=REG[k],X0=k*1000;
  const pts=[{x:ri(60,170),y:ri(400,600)}];
  if(k<4)pts.push({x:ri(870,950),y:ri(320,680)});
  const N=ri(14,18);let g=0;
  while(pts.length<N&&g++<5000){const p={x:ri(40,960),y:ri(40,960)};if(pts.every(q=>Math.hypot(q.x-p.x,q.y-p.y)>=110))pts.push(p);}
  const nodes=pts.map((p,i)=>({id:k*100+i,r:k,x:X0+p.x,y:p.y,type:null,name:'',danger:0,fog:0,seenT:-1,memory:false,state:'ok',stateUntil:0,explore:0,exploreT:-1,grave:null,cache:null,patron:null,dp:0}));
  // cạnh: cây khung nhỏ nhất (Prim), rồi thêm 1–2 cạnh gần nhất cho mỗi điểm
  const d=(a,b)=>Math.round(Math.hypot(a.x-b.x,a.y-b.y));
  const edges=[];const has=(a,b)=>edges.some(e=>(e.a===a&&e.b===b)||(e.a===b&&e.b===a));
  const inT=new Set([0]);
  while(inT.size<nodes.length){let best=null;for(const i of inT)for(let j=0;j<nodes.length;j++){if(inT.has(j))continue;const L=d(nodes[i],nodes[j]);if(!best||L<best[2])best=[i,j,L];}inT.add(best[1]);edges.push({a:nodes[best[0]].id,b:nodes[best[1]].id,len:best[2]});}
  for(let i=0;i<nodes.length;i++){const near=nodes.map((n,j)=>[j,d(nodes[i],n)]).filter(x=>x[0]!==i).sort((a,b)=>a[1]-b[1]);const want=ri(1,2);let c=0;for(const [j,L] of near){if(c>=want)break;if(L>380)break;if(!has(nodes[i].id,nodes[j].id))edges.push({a:nodes[i].id,b:nodes[j].id,len:L});c++;}}
  // khoảng cách đường đi từ điểm vào
  const dist=dijkstraAll(nodes,edges,nodes[0].id);
  const dmax=Math.max(...Object.values(dist));
  // gán loại: điểm vào, quan ải, sào huyệt (xa nhất), thành lớn, 2 động phủ, còn lại ngẫu nhiên
  const free=nodes.map((n,i)=>i).filter(i=>i>(k<4?1:0));
  const take=(fn)=>{free.sort(fn);return free.shift();};
  nodes[0].type=k===0?'tran':(reg.types.includes('thanh')?'thanh':'tran');
  if(k<4){nodes[1].type='ai';}
  const sao=take((a,b)=>dist[nodes[b].id]-dist[nodes[a].id]);nodes[sao].type='sao';
  if(nodes[0].type!=='thanh'){const c=take(()=>R()-.5);nodes[c].type='thanh';}
  const caveT=reg.types.includes('dong')?'dong':'nui';
  for(let q=0;q<2;q++){const c=take(()=>R()-.5);nodes[c].type=q===0?caveT:pick(['nui','dong','rung'].filter(x=>reg.types.includes(x)).concat([caveT]));nodes[c].dp=1;}
  if(k===0){for(let q=0;q<2;q++){const c=take(()=>R()-.5);nodes[c].type='tran';}}
  for(const i of free){nodes[i].type=pick(reg.types);}
  for(const n of nodes){
    if(n.type==='dong')n.dp=1;
    const dd=dist[n.id]/Math.max(1,dmax);
    n.danger=n.id===nodes[0].id?0:clamp(Math.floor(dd*4),0,3);
    if(n.type==='sao')n.danger=3;if(n.type==='ai')n.danger=Math.max(2,n.danger);
    if(n.type==='tong'){const s=pick(w.sects);n.name=s.n;n.owner=s.n;}
    else n.name=placeName(n.type);
  }
  // không trùng tên trong vùng
  const seen=new Set();for(const n of nodes){let g2=0;while(seen.has(n.name)&&g2++<8)n.name=n.type==='tong'?n.name+' Biệt Viện':placeName(n.type);seen.add(n.name);}
  // địa hình nền
  const terr=[];for(let i=0;i<ri(4,7);i++)terr.push({k:'m',x:X0+ri(60,940),y:ri(60,940),s:ri(40,90)});
  const rv=[];let x=X0+ri(100,900),y=0;rv.push([x,y]);while(y<1000){y+=ri(80,160);x=clamp(x+ri(-120,120),X0+30,X0+970);rv.push([x,Math.min(1000,y)]);}
  terr.push({k:'r',p:rv});
  return {k,nodes,edges,entry:nodes[0].id,pass:k<4?nodes[1].id:null,lair:nodes[sao].id,terr};
}
function dijkstraAll(nodes,edges,src){
  const D={};for(const n of nodes)D[n.id]=Infinity;D[src]=0;const done=new Set();
  while(done.size<nodes.length){let u=null;for(const n of nodes)if(!done.has(n.id)&&(u===null||D[n.id]<D[u]))u=n.id;if(u===null||D[u]===Infinity)break;done.add(u);
    for(const e of edges){if(e.a!==u&&e.b!==u)continue;const v=e.a===u?e.b:e.a;if(D[u]+e.len<D[v])D[v]=D[u]+e.len;}}
  return D;
}
function nodeById(id){const w=W();const R0=w.regions[Math.floor(id/100)];return R0&&R0.nodes[id%100];}
function regionOf(k){return W().regions[k];}
function curNode(){return G.run?nodeById(G.run.at):null;}
function curDanger(){const n=curNode();return n?n.danger:0;}
function edgeLen(a,b){const R0=regionOf(Math.floor(a/100));const e=R0.edges.find(e=>(e.a===a&&e.b===b)||(e.a===b&&e.b===a));return e?e.len:Math.round(Math.hypot(nodeById(a).x-nodeById(b).x,nodeById(a).y-nodeById(b).y));}
function neighbors(id){const R0=regionOf(Math.floor(id/100));return R0.edges.filter(e=>e.a===id||e.b===id).map(e=>e.a===id?e.b:e.a);}
function findPath(from,to){
  const R0=regionOf(Math.floor(from/100));if(Math.floor(to/100)!==R0.k)return null;
  const D={},P={};for(const n of R0.nodes)D[n.id]=Infinity;D[from]=0;const done=new Set();
  while(true){let u=null;for(const n of R0.nodes)if(!done.has(n.id)&&D[n.id]<Infinity&&(u===null||D[n.id]<D[u]))u=n.id;if(u===null)break;if(u===to)break;done.add(u);
    for(const v of neighbors(u)){const L=D[u]+edgeLen(u,v);if(L<D[v]){D[v]=L;P[v]=u;}}}
  if(D[to]===Infinity)return null;const p=[to];while(p[0]!==from)p.unshift(P[p[0]]);return p;
}
function pathLen(p){let s=0;for(let i=0;i+1<p.length;i++)s+=edgeLen(p[i],p[i+1]);return s;}
function walkSpeed(){let v=WALK[G.run.realm];if(SEASON_ON&&seasonOf(W().t)==='dong')v*=0.8;return v;}
let SEASON_ON=false;
function travelHours(p){return pathLen(p)/walkSpeed();}
function playerXY(){
  const r=G.run;const m=r.moving;const a=nodeById(r.at);
  if(!m||m.seg>=m.path.length-1)return [a.x,a.y];
  const p=nodeById(m.path[m.seg]),q=nodeById(m.path[m.seg+1]);
  return [p.x+(q.x-p.x)*m.prog,p.y+(q.y-p.y)*m.prog];
}
function senseR(){return SENSE[G.run.realm];}
function addReveal(x,y,R0){const L=G.run.reveal;if(L.some(c=>Math.hypot(c[0]-x,c[1]-y)<30&&c[2]>=R0))return false;L.push([Math.round(x),Math.round(y),R0]);if(L.length>300)L.shift();return true;}
function sense(){
  const r=G.run,w=W();const [x,y]=playerXY();const R0=senseR();let ch=false;
  for(const n of regionOf(r.region).nodes){if(Math.hypot(n.x-x,n.y-y)<=R0){if(n.fog<2){n.fog=2;ch=true;}if(n.memory){n.memory=false;ch=true;}n.seenT=w.t;n.vstate=n.state;}}
  if(addReveal(x,y,R0))ch=true;
  return ch;
}
function arrive(id){
  const r=G.run,n=nodeById(id);r.at=id;r.place={n:n.name,t:n.type};
  n.fog=3;n.memory=false;n.seenT=W().t;n.vstate=n.state;
  for(const v of neighbors(id))hearOf(nodeById(v)); // biển chỉ đường: biết tên các điểm kề
  sense();
}
function travelTo(id){
  const r=G.run;if(!r||r.scene)return false;
  const n=nodeById(id);if(!n||n.fog<1)return false;
  // đang giữa đường: đi tiếp về điểm kế rồi tìm đường từ đó
  const m=r.moving;let start=r.at,head=[];
  if(m&&m.seg<m.path.length-1){const a=m.path[m.seg],b=m.path[m.seg+1];if(id===a){r.moving={path:[b,a],seg:0,prog:1-m.prog};r.at=b;return true;}start=b;head=[a];if(id===b){r.moving={path:[a,b],seg:0,prog:m.prog};return true;}}
  if(id===start&&!head.length)return false;
  const p=findPath(start,id);if(!p)return false;
  r.moving={path:head.concat(p),seg:0,prog:head.length?m.prog:0};
  return true;
}
function stopTravel(){const r=G.run;if(!r||!r.moving)return;const m=r.moving;if(m.seg<m.path.length-1){const a=m.path[m.seg],b=m.path[m.seg+1];r.moving=m.prog>0.001?{path:[a,b],seg:0,prog:m.prog}:null;if(!r.moving)arrive(a);}else r.moving=null;}
// đi một khoảng h giờ trên đường; trả về true nếu bản đồ cần vẽ lại
function travelTick(h){
  const r=G.run;let ch=false;
  while(G.run&&r.moving&&h>1e-9&&!r.scene){
    const m=r.moving;if(m.seg>=m.path.length-1){r.moving=null;break;}
    const a=m.path[m.seg],b=m.path[m.seg+1];const segH=edgeLen(a,b)/walkSpeed();
    const dt=Math.min(h,(1-m.prog)*segH);
    advanceTime(dt);if(!G.run)return true;
    h-=dt;m.prog+=dt/segH;
    if(sense())ch=true;
    if(m.prog>=1-1e-9){
      m.seg++;m.prog=0;arrive(b);ch=true;
      if(m.seg>=m.path.length-1)r.moving=null;
      questArrive(b);
      if(!entMeetAt(b,a))roadRoll(a,b);
      if(G.run&&!r.scene)autoCheck();
    }
  }
  return ch;
}
function roadRoll(a,b){
  const r=G.run;const dg=Math.max(nodeById(a).danger,nodeById(b).danger);
  let p=0.08+0.06*dg;if(partOf(W().t)==='dem')p*=1.5;
  if(!chance(p))return;
  r.place={n:'đường tới '+nodeById(b).name,t:nodeById(b).type};
  if(chance(.55)){const id=pickEvent(nodeById(b).type,'road');if(id){startEvent(id);r.scene.back=null;r.scene.road=1;return;}}
  encounter({type:dg>=3&&chance(.3)?'elite':'combat'});r.scene.back=null;
}
// sau mỗi hành động: tâm ma, kỹ năng chờ đổi
function autoCheck(){
  const r=G.run;if(!r||r.scene)return;
  if(r.pendingSkill){r.scene={type:'swap',id:r.pendingSkill,back:r.lastBack!=null?r.lastBack:null};return;}
  if(r.tamma>=100){forceTamma();return;}
}
// nghe đồn về một điểm: nâng từ 0 lên 1, vị trí lệch tới 40, mức nguy hiểm 30% sai
function hearOf(n){if(n.fog>=1)return false;n.fog=1;n.rx=n.x+ri(-40,40);n.ry=n.y+ri(-40,40);n.rd=chance(.3)?clamp(n.danger+(chance(.5)?1:-1),0,3):n.danger;return true;}
function nodeShown(n){return [n.x,n.y];} // nơi nghe đồn hiện đúng vị trí thật, không lệch nữa (tránh nhảy chỗ khi tới nơi)
function nodeDanger(n){return n.fog>=2?n.danger:(n.memory?n.danger:(n.rd!=null?n.rd:n.danger));}

// ---------------- ĐỊA ĐIỂM ----------------
const BQ_Y=[8,16,30,50,80,80]; // số năm bế quan cho 100% tu vi theo cảnh giới
function openPlace(id){const r=G.run;const n=nodeById(id==null?r.at:id);r.place={n:n.name,t:n.type};r.scene={type:'place',id:n.id,msg:[],chips:[],intro:placeIntro(n)};}
function placeIntro(n){
  const t=W().t;let s=T('{canh_'+(P['canh_'+n.type]?n.type:(n.type==='ai'?'nui':n.type==='sao'?'phe':'tran'))+'}');
  const pp=P['buoi_'+partOf(t)],ss=P['mua_'+seasonOf(t)];
  if(pp&&pp.length)s+=' '+T(pp);if(SEASON_ON&&ss&&ss.length&&chance(.5))s+=' '+T(ss);
  if(n.state==='ruin')s+=' '+T(['Nhà cửa đổ nát, xác thú và tro tàn còn ngổn ngang. Chẳng còn ai buôn bán gì.','Nơi này đã thành hoang tàn. Vài người sống sót ngồi thẫn thờ bên đống gạch vỡ.']);
  return s;
}
function svcOpen(k){if(!HOURS_ON)return true;const h=tHour(W().t);const H={shop:[5,21],tea:[7,23],ghost:[21,5]}[k];if(!H)return true;return H[0]<H[1]?(h>=H[0]&&h<H[1]):(h>=H[0]||h<H[1]);}
let HOURS_ON=false;
function placeActs(n){
  const r=G.run,t=n.type,ruin=n.state==='ruin',L=[];
  const add=(a,i,l,h,tip,dis,x)=>L.push({a,i,l,h,tip,dis:!!dis,x});
  if(t==='ai'){add('cross','🚧','Vượt ải',0,'Sang vùng đất kế tiếp');return L;}
  if(t==='sao'){const done=r.bossDone[r.region];add('boss','☠️',done?'Sào huyệt đã trống':'Khiêu chiến thủ lĩnh',1,'Thủ lĩnh của vùng này. Hạ được thì có lệnh bài thông quan.',done);add('explore','🔍','Thăm dò',2,'Lục soát quanh sào huyệt. Rất nguy hiểm.');return L;}
  add('explore','🔍','Thăm dò',2,'Tìm cơ duyên, gặp chuyện.'+(n.danger>=2?'\nNơi nguy hiểm, dễ gặp kẻ địch.':''));
  if((t==='tran'||t==='thanh')&&!ruin){
    add('inn','🛏️','Nghỉ ở khách điếm',8,'Hồi đầy khí huyết và linh lực',r.st<price(4),'💎'+price(4));
    add('tea','🍵','Nghe tin ở trà lâu',1,'Nghe ngóng tin tức quanh vùng'+(svcOpen('tea')?'':'\nTrà lâu mở từ giờ Mão tới giờ Tý'),!svcOpen('tea'));
    if(QUEST_ON)add('board','📜','Bảng treo thưởng',0,'Nhận việc có hạn chót');
  }
  if(t==='thanh'&&!ruin)add('shop','🏪','Phường thị',1,'Mua đan dược, bí tịch, pháp bảo'+(svcOpen('shop')?'':'\nChợ chỉ họp từ giờ Mão tới giờ Hợi'),!svcOpen('shop'));
  if(HOURS_ON&&(t==='thanh'||t==='ma')&&!ruin)add('ghost','🏮','Quỷ thị',1,'Chợ đêm của kẻ không dám ra ánh sáng.\nChỉ họp từ giờ Hợi tới giờ Dần',!svcOpen('ghost'));
  if(t==='tong'){if(!r.flags.tongmon)add('join','⛩️','Xin bái nhập',2,'Sơn môn tuyển đồ');else add('lib','📚','Tàng Kinh Các',2,'Đệ tử được vào đọc kinh thư');}
  if(WILD.includes(t)||n.dp||t==='tong')add('tinh','🧘','Tĩnh tọa',6,'Hồi 45% khí huyết, đầy linh lực');
  if(n.dp){
    const s=S(),bqm=1+(s.fx.bqP||0)/100;
    add('heal','🩹','Dưỡng thương',HM,'Hồi đầy, giảm tâm ma');
    add('bq1','📿','Bế quan ngắn',3*HM,'Tu vi tăng, hồi đầy',false,'✨+'+Math.round(bqGain(0.25)*bqm)+'%');
    add('bq3','⛰️','Bế quan dài',2*HY,'Tu vi tăng nhiều, có thể bị quấy nhiễu',false,'✨+'+Math.round(bqGain(2)*bqm)+'%');
    if(canBreak())add('bt','🌕',r.realm>=4?'Độ kiếp phi thăng':'Đột phá '+REALM[r.realm+1],HM,'Cần ở động phủ, tu vi viên mãn.\nChuẩn bị vật phẩm, xung quan, rồi vượt thiên kiếp nếu có.',false,'🌕'+btWord(btChance()));
    add('quyan','🍃','Gác kiếm quy ẩn',0,'Kết thúc kiếp này trong yên bình');
  }
  if(CACHE_ON&&WILD.concat(['phe','dong','ma','thien']).includes(t))add('bury','⚱️','Chôn đồ',1,'Chôn vật phẩm cho kiếp sau');
  if(n.grave&&GRAVE_ON)add('grave','🪦','Viếng mộ',1,'Một nấm mộ quen');
  if(n.patron&&GRAVE_ON)add('patron','🤝','Tìm cố nhân',1,'Người cũ của kiếp trước');
  return L;
}
let QUEST_ON=false,CACHE_ON=false,GRAVE_ON=false;
function bqGain(y){const r=G.run;return tvGain(100*y/BQ_Y[r.realm])*(y<1?0.9:1);}
function pmsg(t){const sc=G.run.scene;if(sc&&sc.type==='place')sc.msg=[t];}
function placeAct(a){
  const r=G.run,sc=r.scene;if(!sc||sc.type!=='place')return;
  const n=nodeById(sc.id),s=S();let ch=[];sc.msg=[];sc.chips=[];
  const act=placeActs(n).find(x=>x.a===a);if(!act||act.dis)return;
  const tick=(h)=>{const o=advanceTime(h);if(!G.run)return false;if(h>48&&o.length)sc.msg.push('Trong lúc ấy: '+o.slice(-2).join(' '));return true;};
  switch(a){
    case 'explore':{
      if(!tick(2))return;
      const m=Math.floor(W().t/HM);if(n.exploreT!==m){n.exploreT=m;n.explore=0;}n.explore++;
      if(n.explore>=4){sc.msg.unshift(T(['Ngươi đi một vòng nữa. Không còn gì mới.','Chỗ này ngươi đã lục tung cả rồi. Không còn gì mới.','Mọi ngóc ngách đều đã quen mặt. Không còn gì mới.']));sc.chips=[chip('⏳','2 giờ','Thời gian trôi qua','')];return;}
      if(CACHE_ON&&n.cache&&n.cache.items&&n.cache.items.length){findCache(n);return;}
      if(questExplore(n))return;
      const fp=[0.04,0.14,0.26,0.4][n.danger]+(['phe','ma'].includes(n.type)?0.08:0)+(n.type==='sao'?0.3:0);
      if(chance(fp)){encounter({type:n.danger>=3&&chance(.35)?'elite':'combat'});return;}
      const id=pickEvent(n.type,'explore');startEvent(id);return;}
    case 'inn':{r.st-=price(4);if(!tick(8))return;const s1=S();r.hp=s1.maxHp;r.mp=s1.maxMp;ch=[chip('💎','−'+price(4),'Linh thạch','dn'),chip('❤️','hồi đầy','Khí huyết, linh lực','up')].concat(applyE({tamma:-2}));sc.msg.unshift(T(['Phòng chật nhưng sạch, chăn có mùi nắng. Ngươi ngủ một giấc tới sáng.','Tiểu nhị mang lên một bát canh nóng. Ngươi ăn xong, ngủ say như chết.','Đêm ấy mưa rơi trên mái ngói. Ngươi ngủ ngon hơn mọi đêm.']));break;}
    case 'tea':{if(!tick(1))return;ch=teaHouse(n);break;}
    case 'shop':{if(!tick(1))return;openShop(n);return;}
    case 'ghost':{if(!tick(1))return;startEvent('quy_thi');return;}
    case 'board':{openBoard(n);return;}
    case 'join':{if(!tick(2))return;startEvent('son_mon');return;}
    case 'lib':{if(!tick(2))return;startEvent('tang_kinh');return;}
    case 'tinh':{if(!tick(6))return;const s1=S();r.hp=Math.min(s1.maxHp,r.hp+Math.round(s1.maxHp*0.45));r.mp=s1.maxMp;sc.msg.unshift(T(REST_T.tinh));ch=[chip('❤️','hồi','Khí huyết hồi 45%','up'),chip('⏳','6 giờ','Thời gian trôi qua','')].concat(applyE({tv:2,tamma:-4}));break;}
    case 'heal':{if(!tick(HM))return;const s1=S();r.hp=s1.maxHp;r.mp=s1.maxMp;sc.msg.unshift(T(['Ngươi nằm trong động suốt một tháng, uống nước suối, ăn quả rừng. Vết thương lành dần.','Một tháng tĩnh dưỡng. Xương cốt lại liền, kinh mạch lại thông.']));ch=[chip('❤️','hồi đầy','Khí huyết, linh lực','up'),chip('⏳','1 tháng','Thời gian trôi qua','')].concat(applyE({tamma:-8}));break;}
    case 'bq1':case 'bq3':{
      const y=a==='bq1'?0.25:2;const g=bqGain(y)*(1+(s.fx.bqP||0)/100);
      sc.msg.unshift(T(REST_T.bq));
      if(a==='bq3'&&chance(.22)){
        if(!tick(HY))return;sc.msg.push(T(REST_T.bqint));
        ch=applyE({tv:g*0.5,tvMajor:1,tamma:-3});sc.chips=ch;
        startCombat({},{kind:'place',msg:sc.msg.slice()});return;}
      if(!tick(y*HY))return;
      ch=[chip('⏳',durH(y*HY),'Thời gian trôi qua','')].concat(applyE({tv:g,tvMajor:1,tamma:-6}));if(!G.run)return;const s1=S();r.hp=s1.maxHp;r.mp=s1.maxMp;break;}
    case 'bt':{openPrep(n);return;}
    case 'boss':{if(!tick(1))return;bossIntro();return;}
    case 'cross':{openPass(n);return;}
    case 'quyan':{retire();return;}
    case 'bury':{if(typeof openBury==='function')openBury(n);return;}
    case 'grave':{if(!tick(1))return;visitGrave(n);return;}
    case 'patron':{if(!tick(1))return;startEvent('bao_an_co');return;}
  }
  if(G.run&&G.run.scene===sc)sc.chips=ch;
}
function teaHouse(n){
  const r=G.run,ch=[];const msg=[];
  const cand=regionOf(r.region).nodes.filter(x=>x.fog===0).sort((a,b)=>Math.hypot(a.x-n.x,a.y-n.y)-Math.hypot(b.x-n.x,b.y-n.y)).slice(0,4);
  if(cand.length){const x=pick(cand);hearOf(x);msg.push(T(['Bàn bên có người kể về {$pl}, {$t}, cách đây không xa.','Lão kể chuyện gõ quạt: “Ai từng tới {$pl} chưa? Nghe nói là {$t}.”','Tiểu nhị rỉ tai: đi thêm một quãng là tới {$pl}, {$t}.'],{pl:x.name,t:TYPE_NAME[x.type]}));ch.push(chip('🗺️',x.name+'?','Đã ghi lên bản đồ, vị trí chưa chắc','up'));}
  if(typeof teaEnt==='function'){const m=teaEnt();if(m)msg.push(m);}
  const rv=pick(r.rivals);const pool=chance(.5)?RUMOR.the:RUMOR[pick(['tien','tien','ma','tu'])];const t=T(pool,rumorV(rv));pushNews(t);msg.push(t);
  G.run.scene.msg=msg.length?msg:['Trà nhạt, chuyện cũng nhạt.'];
  ch.push(chip('⏳','1 giờ','Thời gian trôi qua',''));
  return ch;
}
function endScene(){
  const r=G.run;if(!r)return;const sc=r.scene;const back=sc&&sc.back!=null?sc.back:null;
  r.lastBack=back;r.scene=null;
  if(r.goShop){r.goShop=0;openShop(null);r.scene.back=back;return;}
  autoCheck();if(r.scene)return;
  if(back!=null&&r.at===back&&!r.moving)openPlace(back);
}
function leavePlace(){const r=G.run;if(r&&r.scene&&r.scene.type==='place'){r.scene=null;autoCheck();}}

// ---------------- QUAN ẢI ----------------
function openPass(n){
  const r=G.run;const k=r.region+1;if(k>4)return;
  r.scene={type:'pass',id:n.id,back:n.id,k,text:T(['Cửa ải xây bằng đá xanh, cao chín trượng. Lính gác khoanh tay nhìn ngươi từ trên xuống dưới: “Đi đâu? Giấy tờ đâu?”','Quan ải nằm giữa hai vách núi, chỉ một lối đi. Bên kia là {$reg}. Kẻ gác ải không có ý định để ai qua dễ dàng.'],{reg:REG[k].n}),res:null};
}
function passOpts(){
  const r=G.run,sc=r.scene,k=sc.k;const o=[];
  const gp=price(45);const an=r.seeds.findIndex(s=>s.t==='an');
  o.push({a:'realm',i:'☯️',l:'Lấy tu vi mà qua',ok:r.realm>=k,tip:'Cảnh giới từ '+REALM[k]+' trở lên thì không ai dám cản'});
  o.push({a:'pass',i:'🎫',l:'Trình lệnh bài thông quan',ok:r.passes.includes(k),tip:'Lệnh bài rơi từ thủ lĩnh vùng, hoặc mua ở đấu giá'});
  o.push({a:'guide',i:'🧭',l:'Thuê người dẫn đường lén qua',ok:r.st>=gp,tip:'Tốn 💎'+gp,x:'💎'+gp});
  if(an>=0)o.push({a:'favor',i:'🤝',l:'Nhờ '+r.seeds[an].ten+' dẫn đường',ok:true,tip:'Dùng một ân tình đã gieo'});
  o.push({a:'fight',i:'⚔️',l:'Liều mạng xông qua',ok:true,tip:'Đánh một trận với kẻ gác ải rất mạnh'});
  return o;
}
function passAct(a){
  const r=G.run,sc=r.scene;if(!sc||sc.type!=='pass')return;const o=passOpts().find(x=>x.a===a);if(!o||!o.ok)return;
  if(a==='guide'){r.st-=price(45);}
  if(a==='favor'){const i=r.seeds.findIndex(s=>s.t==='an');r.seeds.splice(i,1);}
  if(a==='fight'){startCombat({k:'human',m:1.6,n:'Tướng gác ải',sub:'Kẻ giữ quan ải',elite:1},{kind:'cross',k:sc.k});return;}
  doCross(sc.k,a);
}
function doCross(k,how){
  const r=G.run;const mo=CROSS_M[k];
  advanceTime(mo*HM);if(!G.run)return;
  r.region=k;const R0=regionOf(k);r.moving=null;arrive(R0.entry);r.maxRegion=Math.max(r.maxRegion||0,k);
  log(`Vượt ải, tới ${REG[k].n}.`);bio(`Năm ${Math.floor(r.age)} tuổi, vượt ải tới ${REG[k].n}.`);
  r.scene={type:'region',text:T(REG[k].intro,baseV()),sub:`Đường đi mất ${mo} tháng`};
}

function forceTamma(){
  const r=G.run;const v=baseV();
  r.scene={type:'event',id:'tam_ma_xam',v,story:['Tâm ma đã lớn tới mức không thể đè nén. Đêm ấy, nó bước ra khỏi thân thể ngươi, khoác khuôn mặt của ngươi, và mỉm cười.'],cur:['force'],phase:'choose',chips:[],back:r.lastBack!=null?r.lastBack:null};
}
const ENC_T={
  thu:['{mo} Bụi cây rung lên. {$e} bước ra, mắt xanh lè, nước dãi nhỏ giọt.','Mùi tanh hôi xộc tới trước khi ngươi kịp thấy nó. {$e} chặn ngay giữa lối, gầm gừ.','{$canh} Tiếng gầm vang lên sát bên tai. {$e} đã theo dấu ngươi từ lâu.','Đàn chim vụt bay. {$e} lao ra từ chỗ tối, nhắm thẳng vào ngươi.','Ngươi giẫm phải lãnh địa của {$e}. Nó không định để ngươi đi.','{$canh} Trên mặt đất có dấu chân to bằng cái nong, còn mới. Rồi {$e} xuất hiện.'],
  nhan:['“Đứng lại!” {$e} chặn đường, ánh mắt dán vào túi trữ vật của ngươi.','{$e} từ trên cây nhảy xuống, cười nhạt: “Giao đồ ra, ta cho ngươi chết toàn thây.”','Có kẻ bám theo ngươi đã ba ngày. Hôm nay, {$e} không giấu nữa.','{$canh} {$e} ngồi chờ sẵn ở ngã ba, như biết ngươi sẽ đi qua.','“{$p.tt}, giết ngươi cũng chẳng oan đâu.” {$e} nói, giọng như bàn chuyện thời tiết.','{mo} Ngươi vừa dừng chân thì {$e} đã chắn trước mặt, tay đặt lên chuôi binh khí.'],
  quy:['Nhiệt độ hạ xuống đột ngột, hơi thở ngươi hóa thành sương. {$e} trôi ra từ bóng tối.','{mo} Tiếng khóc than vẳng tới, càng lúc càng gần. Rồi {$e} hiện ra, ngay sau lưng ngươi.','Đuốc trong tay ngươi tắt phụt. Khi thắp lại, {$e} đã đứng đó.','{$canh} Có tiếng cười khanh khách. {$e} ngồi vắt vẻo trên cành cây chết, nhìn ngươi.'],
  vat:['Mặt đất rung lên. {$e} từ từ chuyển động, như vừa tỉnh dậy sau giấc ngủ ngàn năm.','Không tiếng động, không dấu hiệu. {$e} đã ở đó, chặn đường ngươi.','{$canh} Từ khe nứt hư không, {$e} chui ra.'],
};
function sceneBack(){const r=G.run,sc=r.scene;if(!sc)return null;if(sc.type==='place')return sc.id;return sc.back!=null?sc.back:null;}
function encounter(o){
  const r=G.run;const back=sceneBack();const en=o.en||mkEnemy({elite:o.type==='elite'});
  const v=baseV();v.e=en.n;
  let text=T(ENC_T[en.f]||ENC_T.vat,v);
  if(o.type==='elite')text+=' '+T(['Khí tức của nó đè nặng lên vai ngươi. Kẻ này mạnh hơn hẳn những gì ngươi từng gặp.','Ngươi cảm thấy tử khí. Trận này không dễ.','Uy áp tỏa ra khiến cỏ cây quanh đó rạp xuống.']);
  r.scene={type:'enc',en,elite:o.type==='elite',text,v,back};
}
function encAct(a){
  const r=G.run,sc=r.scene;
  if(a==='fight'){startCombat({pre:sc.en,elite:sc.elite},{kind:'node',quest:sc.quest});return;}
  if(a==='sneak'){const ok=R()<encSneak(sc);if(ok){sc.res=T(['Ngươi nín thở, lùi vào bóng tối. Nó đi qua, không phát hiện ra.','Ngươi đi vòng qua một quãng xa. Thoát được.','Ngươi ẩn mình sau tảng đá cho tới khi bóng nó khuất hẳn.']);sc.done=1;}else{sc.failSneak=1;encAct('fight');clog(G.run.scene,'Bị phát hiện!','en');}return;}
  if(a==='pay'){const c=Math.max(1,Math.round(12*SC[r.region]));if(r.st<c)return;r.st-=c;sc.res=T(['Ngươi ném túi linh thạch qua. {$e} cân thử, cười khẩy rồi tránh đường.','“Biết điều đấy.” {$e} cất linh thạch, phẩy tay cho ngươi đi.'],{e:sc.en.n});sc.paid=c;sc.done=1;return;}
}
function encSneak(sc){const s=S();return clamp(0.35+(s.tp-8-G.run.region*3)*0.05,0.1,0.85)*(sc.elite?0.5:1);}
function bossIntro(){
  const r=G.run;const back=sceneBack();const pool=BOSS[r.region];const b=pick(pool);r.bossDef=b;r.bossV={nick:pick(NAME.ma1),sect:pick(G.meta.world.sects.filter(s=>s.al==='chinh')).n,ten:genName('nam')};
  const v=Object.assign(baseV(),r.bossV);
  r.scene={type:'boss',text:T(b.t,v),b:{i:b.i,n:T(b.n,v)},back};
}
function bossFight(){startCombat('boss',{kind:'boss'});}

// ---------------- PHƯỜNG THỊ ----------------
function price(base){const fx=aggFx();return Math.max(1,Math.round(base*SC[G.run.region]*(1-Math.min(40,fx.shopP||0)/100)));}
function openShop(n){
  const r=G.run;const back=sceneBack();const a=npc('thuong');const v=Object.assign(baseV(),{a});
  const text=T(['{$a.ten}, {$a.look}, xoa tay cười: “{$a.goi} cần gì? Hàng ở đây không giả.”','Tiệm tạp hóa nhỏ, hàng bày lộn xộn. {$a.ten} ngáp dài: “Xem thoải mái. Mua thì trả tiền.”','Chi nhánh Vạn Bảo Thương Hội. Tiểu nhị cúi chào tới tận đất, mắt liếc túi trữ vật của ngươi.','Một tán tu bày sạp ven đường, vừa thấy ngươi đã mời mọc rối rít.','Phường thị đông nghịt. Ngươi chen vào một sạp hàng có tấm biển viết: “Không trả giá.”'],v);
  const m=Math.floor(W().t/HM);
  if(n&&n.shop&&n.shop.m===m&&n.shop.kiep===r.kiep){r.scene={type:'shop',text,items:n.shop.items,heal:n.shop.heal,back,node:n.id};return;}
  const items=[];
  for(let i=0;i<3;i++){const id=rollPill();const q=r.region>=2?ri(0,2):r.region>=1?ri(0,1):0;items.push({k:'pill',id,q,p:price(PILL[id].p*PQM[q])});}
  if(chance(.6)||r.realm>=r.region)items.push({k:'pill',id:btPill(),q:0,p:price(PILL[btPill()].p)});
  for(let i=0;i<2;i++){const id=rollSkill();items.push({k:'skill',id,p:price(40+SK[id].t*28)});}
  const rel=genRelic(clamp(r.region+(chance(.2)?1:0),0,4));items.push({k:'relic',rel,p:price(70+rel.tier*45)});
  if(typeof shopExtra==='function')shopExtra(items,n);
  const heal=price(10);
  if(n)n.shop={m,kiep:r.kiep,items,heal};
  r.scene={type:'shop',text,items,heal,back,node:n?n.id:null};
}
function buy(i){
  const r=G.run,sc=r.scene;if(sc.type!=='shop')return;const it=sc.items[i];if(!it||it.sold||r.st<it.p)return;
  if(it.k==='pill'&&r.pills.length>=S().pillMax)return;
  r.st-=it.p;it.sold=1;
  if(it.k==='pill')gainPill(it.id,it.q);else if(it.k==='skill')gainSkill(it.id);else if(it.k==='pass'){if(!r.passes.includes(it.reg))r.passes.push(it.reg);log(`Mua được ${it.n}.`);}else{r.relics.push(it.rel);clampHp();log(`Mua được ${it.rel.name}.`);}
  if(r.pendingSkill){r.scene={type:'swap',id:r.pendingSkill,back:'shop',shop:sc};}
}
function healBuy(){const r=G.run,sc=r.scene;if(r.st<sc.heal)return;r.st-=sc.heal;const s=S();r.hp=s.maxHp;r.mp=s.maxMp;sc.healed=1;}

// ---------------- ĐỘNG PHỦ ----------------
const REST_T={
  tinh:['Ngươi ngồi xếp bằng, vận khí một chu thiên. Mệt mỏi tan dần như sương dưới nắng.','Gió nhẹ, lá rơi. Ngươi điều tức nửa ngày, thương thế lành quá nửa.','Một nén nhang, rồi hai nén. Hơi thở ngươi dài ra, chậm lại, hòa vào tiếng côn trùng.'],
  bq:['Ngươi bố trí cấm chế, ngồi vào chỗ sâu nhất của động phủ. Ngày tháng trôi qua như nước chảy dưới cầu.','Đá phủ rêu, rêu khô rồi lại xanh. Ngươi mở mắt, bên ngoài đã đổi mùa mấy lượt.','Bế quan lần này ngươi mơ rất nhiều. Có giấc mơ là kiếp trước, có giấc mơ là kiếp sau.','Linh khí trong động bị ngươi hút cạn, vách đá bạc trắng như vôi. Ngươi đứng dậy, xương cốt kêu răng rắc.','Ngươi quên cả ngày đêm. Lúc xuất quan, có con chim đã làm tổ trên vai.'],
  bqint:['Đang ngồi thì có động, đành xuất quan giữa chừng. Có kẻ tới trước chỗ ngươi ngồi.','Cấm chế vỡ tan. Ngươi bừng mắt: kẻ xâm nhập đã đứng ngay cửa động.'],
  bt:[['Linh khí trong đan điền ngưng tụ thành một đài sen, vững như núi. Đạo cơ đã thành.','Ngươi nghe trong người có tiếng nổ nhẹ như măng mọc. Rồi mọi thứ lắng lại. Trúc Cơ.'],
      ['Chân nguyên xoay tròn, nén lại, nén nữa, cho đến khi hóa thành một viên kim đan lấp lánh như sao.','Ba ngày ba đêm, đan điền như lò lửa. Sáng ngày thứ tư, một viên đan vàng lặng lẽ thành hình.'],
      ['Kim đan vỡ ra. Từ trong đó, một hài nhi nhỏ bằng ngón tay mở mắt, giống ngươi như đúc. Nguyên Anh xuất thế.','Đau như xé xác. Rồi một tiếng khóc trẻ thơ vang lên trong đan điền. Ngươi bật cười giữa nước mắt.'],
      ['Nguyên anh hòa vào thiên địa. Trong một khoảnh khắc, ngươi là gió, là núi, là tất cả. Rồi ngươi lại là ngươi, nhưng không còn như trước.','Thần thức lan ra ngàn dặm. Ngươi nghe được tiếng lá rơi ở một khu rừng chưa từng tới.']],
  btf:['Linh khí cuộn ngược, kinh mạch như bị dao cắt. Ngươi phun ra một ngụm máu. Đột phá thất bại.','Tới bước cuối cùng thì tâm thần dao động. Một tiếng “phựt” khẽ, công sức tan thành mây khói.','Tâm ma hiện lên đúng lúc then chốt, cười vào mặt ngươi. Ngươi lỡ nhịp. Thất bại.'],
};

// ---------------- KẾT THÚC KIẾP ----------------
function lifeSummary(cause,info){
  const r=G.run;const age=Math.floor(r.age);
  const lines=r.bio.slice(0,6);
  let end='';
  if(cause==='combat')end=`Năm ${age} tuổi, ${r.ten} chết dưới tay ${info.n} ở ${r.place.n}.`;
  else if(cause==='toahoa')end=`Năm ${age} tuổi, thọ nguyên cạn kiệt, ${r.ten} tọa hóa ở ${r.place.n}.`;
  else if(cause==='tamma')end=`Năm ${age} tuổi, ${r.ten} tẩu hỏa nhập ma.`;
  else if(cause==='kiep')end=`Năm ${age} tuổi, ${r.ten} tan thành tro bụi dưới thiên kiếp ở ${r.place.n}.`;
  else if(cause==='quyan')end=`Năm ${age} tuổi, ${r.ten} gác kiếm quy ẩn ở ${r.place.n}, sống nốt phần đời còn lại như một phàm nhân.`;
  else if(cause==='phithang')end=`Năm ${age} tuổi, ${r.ten} vượt Cửu Trùng Lôi Kiếp, phá không phi thăng.`;
  lines.push(end+(cause==='combat'||cause==='toahoa'?' '+pick(['Một đời tu tiên, như bao người khác.','Không ai kịp nhớ tên.','Người đời nhắc tới vài năm, rồi quên.','Tiên lộ dài, chân người ngắn.']):''));
  return lines;
}
function calcPts(cause){
  const r=G.run;const o=[];
  o.push(['Cảnh giới',r.maxRealm*12+Math.floor(r.tv/25)]);
  o.push(['Vùng đất đã qua',r.region*6]);
  o.push(['Thủ lĩnh bị hạ',r.bossKills*8]);
  o.push(['Kẻ địch bị hạ',Math.floor(r.kills/3)]);
  o.push(['Kỳ ngộ đã trải',Math.floor(r.evDone/4)]);
  if(cause==='phithang')o.push(['Phi thăng',80]);
  if(cause==='quyan')o.push(['Quy ẩn an lành',4]);
  return o.filter(x=>x[1]>0);
}
function die(cause,info){
  const r=G.run;if(!r)return;
  const pts=calcPts(cause);const tot=pts.reduce((a,b)=>a+b[1],0)+1;
  const lines=lifeSummary(cause,info);
  const ep=T('{epitaph}');
  const life={_mr:r.maxRegion||0,k:r.kiep,ten:r.ten,g:r.g,tuoi:Math.floor(r.age),realm:qualName(r.maxRealm,(r.quality||[])[r.maxRealm]||0),cause,lines,ep,pts:tot,origin:r.origin};
  const M=G.meta;M.lives.unshift(life);if(M.lives.length>40)M.lives.pop();
  M.pts+=tot;M.total+=tot;
  M.last={grave:cause!=='phithang'?{ten:r.ten,tuoi:Math.floor(r.age),r:r.region}:null,killer:cause==='combat'&&info&&!info.boss&&info.k?{n:info.n,k:info.k,i:info.i,el:info.el,r:r.region}:(cause==='combat'&&info&&info.boss?{n:info.n,k:'boss',i:info.i,el:info.el,r:r.region}:null),ten:r.ten};
  ach('chet1');if(cause==='toahoa')ach('toahoa');if(cause==='quyan')ach('quyan');if(cause==='phithang'){ach('phithang');gainLore('chan_tuong');}
  if(M.nlife>=5)ach('kiep5');
  G.over={life,pts,cause,title:{combat:'Tử trận',kiep:'Hồn phi phách tán',toahoa:'Tọa hóa',tamma:'Tẩu hỏa nhập ma',quyan:'Quy ẩn',phithang:'Phi thăng'}[cause]};
  life.y=tYear(W().t);if(r.bossKills)life.hero='hạ '+r.bossKills+' thủ lĩnh';else if(r.bangTop)life.hero='đứng đầu Thiên Kiêu Bảng';
  fogToMemory();
  G.run=null;afterlife(r,cause,info);G.over.gap=G.lastGap;G.screen='over';saveSoon();
}
function fogToMemory(){for(const R0 of W().regions)for(const n of R0.nodes){if(n.fog>=2){n.fog=1;n.memory=true;}else if(n.fog===1&&!n.memory){n.fog=0;}}}
function retire(){die('quyan');}
function victory(){die('phithang');}

// ---------------- ĐỔI CÔNG PHÁP ----------------
function swapSkill(i){
  const r=G.run,sc=r.scene;const id=sc.id;
  if(i>=0&&r.skills[i]){const old=SK[r.skills[i].id].n;r.skills[i]={id,lv:1};log(`Quên ${old}, lĩnh ngộ ${SK[id].n}.`);}
  r.pendingSkill=null;
  if(sc.back==='shop'){r.scene=sc.shop;return;}
  if(sc.back==='res'){r.scene=sc.res;return;}
  r.scene={type:'swap',back:typeof sc.back==='number'?sc.back:null};endScene();
}

// ---------------- NÂNG CẤP LUÂN HỒI ----------------
function buyUpg(id){const M=G.meta,u=UPG.find(x=>x.id===id);const lv=M.upg[id]||0;if(lv>=u.max)return;const c=u.c[lv];if(M.pts<c)return;M.pts-=c;M.upg[id]=lv+1;saveSoon();}

// ---------------- THẾ GIỚI SỐNG: THỰC THỂ ----------------
ENT_ON=true;HOURS_ON=true;SEASON_ON=true;QUEST_ON=true;CACHE_ON=true;GRAVE_ON=true;
const ENT_T={
  thuong:{n:'Thương đội',i:'🐫',sp:4,w:3,life:[20,40]},
  thutrieu:{n:'Thú triều',i:'🐾',sp:3,w:2,life:[10,20]},
  tuantra:{n:'Đệ tử tuần tra',i:'🥋',sp:6,w:2,life:[10,25]},
  thienkieu:{n:'Thiên kiêu',i:'🌟',sp:10,w:1,life:[8,20]},
  truysat:{n:'Kẻ truy sát',i:'🗡️',sp:7,w:0,life:[30,60]},
  di:{n:'Dị tượng',i:'✨',sp:0,w:2,life:[3,10]},
  khach:{n:'Khách qua đường',i:'🎒',sp:3,w:1,life:[10,25]},
};
// gặp thực thể hiền: chỉ có xác suất p, và cách lần gặp trước (cùng nhóm g) ít nhất cd ngày
const MEET_SOFT={thuong:{p:.25,cd:20,g:'td'},khach:{p:.3,cd:12,g:'kh'},tuantra:{p:.5,cd:8,g:'tt'}};
const KHACH_K=[['Lữ khách','🎒'],['Tiều phu','🪓'],['Thợ săn','🏹'],['Hành cước tăng','📿'],['Thư sinh lên kinh','📜'],['Tán tu','🧘'],['Gánh hát rong','🎭'],['Người hái thuốc','🌿']];
const DI_K={bicanh:{n:'Bí cảnh mở cửa',i:'🌀',ev:'bi_canh'},saoroi:{n:'Sao rơi',i:'☄️',ev:'sao_roi'},daugia:{n:'Hội đấu giá',i:'🏮',ev:'dau_gia'}};
function entsHere(k){return W().ents.filter(e=>e.r===k);}
function entXY(e){const a=nodeById(e.at);if(e.to==null)return [a.x,a.y];const b=nodeById(e.to);return [a.x+(b.x-a.x)*e.prog,a.y+(b.y-a.y)*e.prog];}
function townsOf(k){return regionOf(k).nodes.filter(n=>(n.type==='tran'||n.type==='thanh')&&n.state==='ok');}
function setRoute(e,dest){const p=findPath(e.at,dest);if(!p||p.length<2){e.route=[];e.to=null;return false;}e.route=p.slice(1);e.to=e.route[0];e.prog=0;e.dest=dest;return true;}
function spawnEnt(type,k,o){
  const w=W();o=o||{};const T0=ENT_T[type];const R0=regionOf(k);const ns=R0.nodes;
  if(entsHere(k).length>=12)return null;
  const e={id:(w.eid=(w.eid||0)+1),type,r:k,name:T0.n,icon:T0.i,at:null,to:null,prog:0,route:[],speed:T0.sp,until:w.t+ri(T0.life[0],T0.life[1])*HD,data:{},wait:0};
  if(type==='thuong'){const ts=townsOf(k);if(ts.length<2)return null;let a=pick(ts),b=pick(ts.filter(x=>x!==a));
    if(o.near!=null){const nb=neighbors(o.near);a=nodeById(pick(nb));const far=ns.filter(x=>x.id!==o.near&&x.id!==a.id&&x.type!=='ai');const p=pick(far);e.at=a.id;setRoute(e,o.near);e.route=e.route.concat((findPath(o.near,p.id)||[]).slice(1));e.dest=p.id;}
    else{e.at=a.id;setRoute(e,b.id);}e.name='Thương đội '+pick(NAME.ho);}
  else if(type==='thutrieu'){const src=ns.filter(n=>n.danger>=2&&!['ai','tran','thanh'].includes(n.type));if(!src.length)return null;const a=pick(src);e.at=a.id;
    const ts=townsOf(k).sort((x,y)=>Math.hypot(x.x-a.x,x.y-a.y)-Math.hypot(y.x-a.x,y.y-a.y));if(!ts.length)return null;setRoute(e,ts[0].id);e.data.tgt=ts[0].id;e.name='Thú triều từ '+a.name;if(e.route.length)e.until=w.t+pathLen([a.id].concat(e.route))/e.speed+5*HD;}
  else if(type==='tuantra'){const ss=ns.filter(n=>n.type==='tong');const base=ss.length?pick(ss):pick(townsOf(k).length?townsOf(k):ns);e.at=base.id;e.data.home=base.id;const nb=neighbors(base.id);setRoute(e,pick(nb));e.name='Đệ tử '+(base.owner||pick(w.sects).n);}
  else if(type==='thienkieu'){const al=(G.run?G.run.rivals:w.rstate||[]).filter(x=>x.alive);if(!al.length)return null;const rv=o.rv!=null?o.rv:pick(al).i;if(w.ents.some(x=>x.type==='thienkieu'&&x.data.rv===rv))return null;e.data.rv=rv;e.name=w.rivals[rv].ten;
    const di=w.ents.find(x=>x.r===k&&x.type==='di');const a=pick(ns.filter(n=>n.type!=='ai'));e.at=a.id;setRoute(e,di?di.at:pick(ns).id);}
  else if(type==='truysat'){const a=o.at!=null?o.at:pick(ns.filter(n=>n.id!==(G.run&&G.run.at))).id;e.at=a;e.data=o.data||{};e.name=o.name||'Kẻ truy sát';e.until=w.t+60*HD;if(G.run)setRoute(e,G.run.at);}
  else if(type==='khach'){const pool=ns.filter(n=>n.type!=='ai');let a=pick(pool),dst=pick(pool.filter(x=>x!==a));
    if(o.near!=null){a=nodeById(pick(neighbors(o.near)));e.at=a.id;setRoute(e,o.near);e.route=e.route.concat((findPath(o.near,dst.id)||[]).slice(1));e.dest=dst.id;}
    else{e.at=a.id;setRoute(e,dst.id);}
    const kk=pick(KHACH_K);e.data.k=kk[0];e.name=kk[0]+' họ '+pick(NAME.ho);e.icon=kk[1];}
  else if(type==='di'){const kk=o.k||pick(Object.keys(DI_K));const pool=ns.filter(n=>kk==='daugia'?n.type==='thanh':!['tran','thanh','ai','sao'].includes(n.type));if(!pool.length)return null;const a=pick(pool);e.at=a.id;e.data.k=kk;e.name=DI_K[kk].n;e.icon=DI_K[kk].i;e.speed=0;
    chronQuiet(`${DI_K[kk].n} ở ${a.name}.`);}
  if(e.at==null)return null;
  w.ents.push(e);return e;
}
function chronQuiet(t){if(G.run)pushNews(t,true);}
function removeEnt(e){const w=W();w.ents=w.ents.filter(x=>x!==e&&x.id!==e.id);}
function director(){
  const r=G.run;if(!r)return;const k=r.region;const L=entsHere(k);
  // kẻ truy sát từ hạt giống oán đã chín
  for(const s of r.seeds){if(s.t==='oan'&&!s.ent&&W().t-(s.at||0)>=30*HD&&chance(.25)){const e=spawnEnt('truysat',k,{name:s.ten,data:{seed:1}});if(e){s.ent=e.id;}}}
  const nem=W().nemesis;if(nem&&!nem.ent&&k>=Math.min(nem.r,3)&&r.kiep>nem.kiep&&chance(.2)){const e=spawnEnt('truysat',k,{name:nem.n,data:{nem:1}});if(e){e.icon=nem.i||'🗡️';nem.ent=e.id;}}
  // quanh người chơi trống trải: cho một đoàn người đi ngang qua
  {const me=nodeById(r.at);if(!L.some(e=>{const p=entXY(e);return Math.hypot(p[0]-me.x,p[1]-me.y)<=senseR();})&&L.length<12&&chance(.12))spawnEnt(chance(.5)?'thuong':'khach',k,{near:r.at});}
  if(L.length>=6)return;
  const cnt={};for(const e of L)cnt[e.type]=(cnt[e.type]||0)+1;
  const pool=Object.keys(ENT_T).filter(t=>ENT_T[t].w>0&&(cnt[t]||0)<3);
  let n=6-L.length;while(n-->0&&pool.length){const t=wpick(pool,x=>ENT_T[x].w);spawnEnt(t,k);}
}
function entsStep(h){
  const w=W(),r=G.run;if(!r)return;
  for(const e of entsHere(r.region).slice()){
    if(w.t>e.until){if(e.type==='truysat'&&e.data.nem&&w.nemesis)w.nemesis.ent=null;removeEnt(e);continue;}
    if(e.wait>0){e.wait=Math.max(0,e.wait-h);if(e.wait>0)continue;}
    if(e.to==null){entIdle(e);continue;}
    const L=edgeLen(e.at,e.to)||1;e.prog+=e.speed*h/L;
    while(e.to!=null&&e.prog>=1){e.prog-=1;e.at=e.to;e.route.shift();e.to=e.route.length?e.route[0]:null;if(e.to==null){e.prog=0;entArrive(e);break;}}
  }
}
function entIdle(e){
  const r=G.run;
  if(e.type==='thuong'){const ts=townsOf(e.r).filter(x=>x.id!==e.at);if(ts.length)setRoute(e,pick(ts).id);}
  else if(e.type==='tuantra'){const nb=neighbors(e.data.home);setRoute(e,e.at===e.data.home?pick(nb):e.data.home);}
  else if(e.type==='thienkieu'){const di=W().ents.find(x=>x.r===e.r&&x.type==='di');setRoute(e,di&&di.at!==e.at?di.at:pick(regionOf(e.r).nodes).id);}
  else if(e.type==='truysat'&&r)setRoute(e,r.at);
  else if(e.type==='khach'){const ns=regionOf(e.r).nodes.filter(x=>x.id!==e.at&&x.type!=='ai');if(ns.length)setRoute(e,pick(ns).id);}
}
function entArrive(e){
  const w=W();const n=nodeById(e.at);
  if(e.type==='thuong')e.wait=12;
  if(e.type==='thutrieu'&&e.at===e.data.tgt){
    if(n.state==='ok'){n.state='ruin';n.stateUntil=w.t+6*HM;chron(`Thú triều tràn qua ${n.name}. Nhà cửa đổ nát, người sống sót bỏ đi.`);}
    removeEnt(e);return;}
  if(e.type==='tuantra')e.wait=6;
  if(e.type==='khach')e.wait=ri(4,16);
  if(e.type==='thienkieu')e.wait=ri(6,24);
}
// gặp nhau: người chơi tới điểm có thực thể, hoặc đi ngược chiều trên cùng đoạn đường
function entMeetAt(id,from){
  const r=G.run;if(!r||r.scene)return false;
  for(const e of entsHere(r.region)){
    if(e.met===r.kiep+':'+Math.floor(W().t/HD))continue;
    const atNode=e.to==null&&e.at===id||e.to!=null&&e.prog<0.05&&e.at===id;
    const opp=from!=null&&e.at===id&&e.to===from;
    if(atNode||opp){
      // thương đội và khách qua đường: không phải lần nào đi ngang cũng dừng lại nói chuyện
      const soft=MEET_SOFT[e.type];
      if(soft){const day=Math.floor(W().t/HD);e.met=r.kiep+':'+day;const last=(r.meetT||{})[soft.g];
        if(last!=null&&W().t-last<soft.cd*HD||!chance(soft.p))continue;
        (r.meetT||(r.meetT={}))[soft.g]=W().t;}
      meetEnt(e);return true;}
  }
  return false;
}
function meetEnt(e){
  const r=G.run;e.met=r.kiep+':'+Math.floor(W().t/HD);
  if(r.moving){const m=r.moving;r.moving=null;}
  let id=null;
  if(e.type==='di'&&chance(.6))id=DI_K[e.data.k].ev;
  else if(e.type==='truysat'&&e.data.nem)id='no_kiep_truoc';
  if(!id){const L=EVS.filter(x=>x.src==='ent:'+e.type&&(e.type!=='di'||!x.dk||x.dk===e.data.k)&&(e.type!=='truysat'||x.id!=='no_kiep_truoc')&&whenOk(x)&&(!x.cond||x.cond(r))&&(!x.r||x.r.includes(r.region)));if(L.length)id=wpick(L,x=>(x.w||1)/(1+(r.evCount[x.id]||0))).id;}
  if(!id||!EVMAP[id]){return;}
  if(e.type==='thienkieu')r.metRival=e.data.rv;
  startEvent(id);r.scene.back=null;r.scene.v.eid=e.id;r.scene.v.en=e.name;
  if(e.type==='di'||e.type==='truysat'&&!e.data.nem)removeEnt(e);
  if(e.type==='truysat'&&e.data.nem){removeEnt(e);}
}
function teaEnt(){
  const r=G.run;const [x,y]=playerXY();const L=entsHere(r.region).filter(e=>{const p=entXY(e);return Math.hypot(p[0]-x,p[1]-y)>senseR();});
  if(!L.length)return null;const e=pick(L);const p=entXY(e);e.heard={x:Math.round(p[0]),y:Math.round(p[1]),t:W().t};
  const at=nodeById(e.at);hearOf(at);
  return T(['Có khách vừa tới kể: {$e} đang ở gần {$pl}.','Người ta xì xào về {$e}, thấy ở quanh {$pl}.'],{e:e.name,pl:at.name});
}
function entAfter(af,res,sc){endScene();}
// mọi lần advanceTime: thực thể di chuyển, đạo diễn, hạn chót, đồng đội tạm, tâm ma tự phát
function timeHooks(h){
  const r=G.run,w=W();if(!r)return;
  if(h<=48)entsStep(h);
  if(w.t-(w.dirT||0)>=HD){w.dirT=w.t;director();}
  for(const q of r.quests){if(q.state==='open'&&w.t>q.due){q.state='fail';r.karma=clamp(r.karma-4,-100,100);log(`Thất hứa: ${q.text}`);pushNews('Thất hứa, nhân quả giảm.',true);}}
  if(r.quests.length>12)r.quests=r.quests.filter(q=>q.state==='open').concat(r.quests.filter(q=>q.state!=='open').slice(-4));
  if(r.party&&r.party.length){const b=r.party.length;r.party=r.party.filter(p=>p.until>w.t&&p.hp>0);if(r.party.length<b)log('Một người đồng hành đã chia tay.');}
  // kẻ địch tự tìm tới khi đứng yên
  if(!r.scene&&!r.moving&&h<=48){const e=entsHere(r.region).find(e=>e.type==='truysat'&&e.to==null&&e.at===r.at);if(e)meetEnt(e);}
}
function worldCoarseEnts(){const w=W();w.ents=w.ents.filter(e=>e.until>w.t);}

// ---------------- NHIỆM VỤ CÓ HẠN CHÓT ----------------
function openBoard(n){
  const r=G.run;const m=Math.floor(W().t/HM);
  if(!n.board||n.board.m!==m||n.board.kiep!==r.kiep){
    const L=[];const ns=regionOf(r.region).nodes.filter(x=>x.id!==n.id&&x.type!=='ai');
    for(let i=0;i<ri(2,3);i++){
      const tgt=pick(ns);const dist=pathLen(findPath(n.id,tgt.id)||[n.id]);const kind=tgt.danger>=1&&chance(.55)?'diet':'den';
      const days=Math.ceil(dist/walkSpeed()/24)+ri(3,8);
      const who=npc(chance(.5)?'thuong':'pham');
      const text=kind==='diet'?T(['Trừ yêu vật quấy nhiễu ở {$pl}','Diệt bọn cướp đóng ở {$pl}','Tìm và giết con hung thú ở {$pl}'],{pl:tgt.name}):T(['Đưa thư của {$a} tới {$pl}','Chuyển một hộp thuốc tới {$pl} giúp {$a}','Mang tin dữ về cho người nhà {$a} ở {$pl}'],{a:who.ten,pl:tgt.name});
      hearOf(tgt);
      L.push({id:'q'+n.id+'_'+m+'_'+i,text,node:tgt.id,kind,days,reward:{st:Math.round((10+tgt.danger*8+days)*1),tv:kind==='diet'?6:3},taken:false});
    }
    n.board={m,kiep:r.kiep,list:L};
  }
  r.scene={type:'board',id:n.id,back:n.id};
}
function takeQuest(i){
  const r=G.run,sc=r.scene;const n=nodeById(sc.id);const q=n.board.list[+i];if(!q||q.taken)return;
  if(r.quests.filter(x=>x.state==='open').length>=3)return;
  q.taken=true;const tg=nodeById(q.node);hearOf(tg);
  r.quests.push({id:q.id,text:q.text,node:q.node,kind:q.kind,due:W().t+q.days*HD,reward:q.reward,state:'open',from:n.id});
  log(`Nhận việc: ${q.text} (hạn ${q.days} ngày).`);
}
function questArrive(id){
  const r=G.run;for(const q of r.quests){if(q.state!=='open'||q.node!==id)continue;
    if(q.kind==='den'){q.state='done';const ch=applyE({st:q.reward.st,tv:q.reward.tv,karma:2});log(`Xong việc: ${q.text}.`);pushNews('Xong việc: '+q.text,true);r.qdone=(r.qdone||[]).concat(ch).slice(-4);}
  }
}
function questExplore(n){
  const r=G.run;const q=r.quests.find(q=>q.state==='open'&&q.kind==='diet'&&q.node===n.id);if(!q)return false;
  encounter({type:n.danger>=3?'elite':'combat'});r.scene.quest=q.id;r.scene.text='Ngươi đã tìm ra mục tiêu của tờ cáo thị. '+r.scene.text;return true;
}
function questWin(qid){const r=G.run;const q=r.quests.find(x=>x.id===qid&&x.state==='open');if(!q)return [];q.state='done';log(`Xong việc: ${q.text}.`);return applyE({st:q.reward.st,tv:q.reward.tv,karma:2});}

// ---------------- MỘ, CHÔN ĐỒ, CỐ NHÂN ----------------
function visitGrave(n){
  const g=n.grave;startEvent('mo_kiep_truoc');const sc=G.run.scene;sc.v.g=g;sc.v.gnode=n.id;sc.story=[T(EVMAP.mo_kiep_truoc.t,sc.v)];
}
function graveTake(v){
  const r=G.run;const n=nodeById(v.gnode);const ch=[];if(!n||!n.grave)return ch;
  for(const it of n.grave.items||[]){r.relics.push(it);ch.push(chip('🏺',it.name,relicTip(it),'item'));log(`Đào được ${it.name} từ mộ cũ.`);}
  n.grave.items=[];n.grave.dug=1;clampHp();return ch;
}
function openBury(n){const r=G.run;if(n.cache||W().regions.reduce((a,R0)=>a+R0.nodes.filter(x=>x.cache).length,0)>=5){pmsg('Chỗ này không chôn thêm được nữa. Cả thế gian ngươi chỉ nhớ nổi năm hố.');return;}r.scene={type:'bury',id:n.id,back:n.id,sel:[]};}
function buryToggle(k){const sc=G.run.scene;const i=sc.sel.indexOf(k);if(i>=0)sc.sel.splice(i,1);else if(sc.sel.length<3)sc.sel.push(k);}
function buryItems(){
  const r=G.run,sc=r.scene;if(!sc.sel.length)return;const n=nodeById(sc.id);const items=[];
  const rel=sc.sel.filter(k=>k[0]==='r').map(k=>+k.slice(1)).sort((a,b)=>b-a),pil=sc.sel.filter(k=>k[0]==='p').map(k=>+k.slice(1)).sort((a,b)=>b-a);
  for(const i of rel){items.push({k:'relic',rel:r.relics[i]});r.relics.splice(i,1);}
  for(const i of pil){items.push({k:'pill',id:r.pills[i].id,q:r.pills[i].q});r.pills.splice(i,1);}
  n.cache={by:r.ten,t:W().t,items};clampHp();advanceTime(1);log(`Chôn ${items.length} món đồ ở ${n.name}.`);
  openPlace(n.id);G.run.scene.msg=['Ngươi đào một hố dưới gốc cây, đặt đồ vào, lấp đất, đánh dấu bằng ba hòn đá. Kiếp sau, nếu còn nhớ, hãy tìm về đây.'];
}
function findCache(n){
  const r=G.run;const c=n.cache;n.cache=null;const ch=[];
  for(const it of c.items){if(it.k==='relic'){r.relics.push(it.rel);ch.push(chip('🏺',it.rel.name,relicTip(it.rel),'item'));}else{const x=gainPill(it.id,it.q);if(x)ch.push(x);}}
  clampHp();log(`Đào được đồ ${c.by} chôn năm ${tYear(c.t)}.`);
  openPlace(n.id);const sc=r.scene;sc.msg=[c.by===r.ten?'Ngươi đào đúng chỗ đã chôn.':`Dưới ba hòn đá xếp chồng có một hố đất cũ. Bên trong là đồ của ${c.by}, chôn từ năm ${tYear(c.t)}. Ngươi biết chỗ này. Ngươi đã từng là người chôn nó.`];sc.chips=ch;
}

// ---------------- ĐỒNG ĐỘI TẠM THỜI ----------------
function addParty(v,days,pow){
  const r=G.run;r.party=r.party||[];if(r.party.length>=2)return null;
  const s=S();const p={id:(r.pid=(r.pid||0)+1),ten:v.ten,icon:v.g==='nu'?'👩':'🧑',hp:Math.round(s.maxHp*(pow||0.6)),pow:pow||0.6,until:W().t+(days||30)*HD,el:'vo'};
  r.party.push(p);log(`${v.ten} đi cùng ngươi ${days||30} ngày.`);return chip('🤝',v.ten+' đồng hành','Đi cùng và chiến đấu bên ngươi '+(days||30)+' ngày','up');
}

// ---------------- NỐI CÁC KIẾP ----------------
function rivalsCoarse(months){
  const w=W();for(const rv of w.rstate){if(!rv.alive)continue;const dy=months/12;rv.age=(rv.age||18)+dy;const wr=w.rivals[rv.i];
    let left=dy;while(left>0&&rv.realm<4){const step=Math.min(left,1);rv.prog+=step*wr.tal*[14,6,2.6,1.2,.5][rv.realm];left-=step;if(rv.prog>=100){rv.realm++;rv.prog=ri(0,15);}}
    if(rv.age>LIFE[rv.realm]*0.95||(rv.age>60&&rv.realm<1)){rv.alive=false;rv.died=tYear(w.t);}}
}
function newRival(i,from){
  const w=W();const s=w.sects[w.rivals[i].s];const g=s.kind==='phat'?'nam':(chance(.5)?'nam':'nu');
  const old=w.rivals[i];const ten=s.kind==='phat'?tangName():genName(g,true);
  const rel=from&&chance(.3)?(chance(.5)?'đệ tử của '+old.ten:'hậu duệ của '+old.ten):null;
  const tt={kiem:g==='nam'?'kiếm tử':'kiếm tiên tử',dan:g==='nam'?'đan tử':'đan tiên tử',phat:'phật tử',ma:g==='nam'?'ma tử':'yêu nữ',am:g==='nam'?'quỷ tử':'âm nữ',the:g==='nam'?'thiếu chủ':'đại tiểu thư',thu:g==='nam'?'thú vương tử':'linh thú tiên tử'}[s.kind]||(g==='nam'?'thánh tử':'thánh nữ');
  w.rivals[i]={ten,g,s:old.s,tt,el:pick(['kim','moc','thuy','hoa','tho','loi','bang','phong']),tinh:old.tinh,tal:rnd1(0.85+R()*0.55),rel};
  w.rstate[i]={i,realm:0,prog:ri(5,40),alive:true,age:ri(16,20)};
  if(rel)chron(`${ten}, ${rel}, bước vào hàng thiên kiêu.`);
}
function afterlife(r,cause,info){
  const w=W();
  // 2. mộ tại điểm đang đứng (chết trên đường: điểm vừa rời)
  let at=r.at;if(r.moving&&r.moving.seg<r.moving.path.length-1)at=r.moving.path[r.moving.seg];
  const n=nodeById(at);
  if(cause!=='phithang'&&n){const items=shuffle(r.relics.slice()).slice(0,2);n.grave={ten:r.ten,tuoi:Math.floor(r.age),realmName:qualName(r.realm,(r.quality||[])[r.realm]||0),t:w.t,items,r:n.r};
    const gs=[];for(const R0 of w.regions)for(const x of R0.nodes)if(x.grave)gs.push(x);gs.sort((a,b)=>a.grave.t-b.grave.t);while(gs.length>12){gs.shift().grave=null;}}
  // 3. sương mù thành ký ức (đã gọi fogToMemory)
  // 4. ân oán còn lại vào legacy
  for(const s of r.seeds)w.legacy.push({t:s.t,ten:s.ten,d:s.d,hn:s.hn,who:r.ten,r:s.r});
  while(w.legacy.length>20)w.legacy.shift();
  w.rstate=r.rivals.map(x=>({i:x.i,realm:x.realm,prog:x.prog,alive:x.alive,age:x.age||18,died:x.died}));
  // kẻ đã giết người chơi
  if(cause==='combat'&&info&&!info.boss&&info.k&&info.k!=='kiep'){const old=w.nemesis&&w.nemesis.n===info.n?w.nemesis.lv:0;w.nemesis={n:info.n,k:info.k,i:info.i,el:info.el,r:r.region,lv:old+1,kiep:r.kiep,who:r.ten};}
  // 5. năm tháng trôi qua
  const yrs=ri(3,30);G.lastGap=yrs;
  worldCoarse(yrs*12);rivalsCoarse(yrs*12);
  // 6. thế hệ
  for(let i=0;i<w.rstate.length;i++){if(!w.rstate[i].alive)newRival(i,true);}
  const keep=[];
  for(const L of w.legacy){
    if(L.done){continue;}
    if(L.t==='an'&&chance(.5)){const pool=[];for(const R0 of w.regions.slice(0,Math.max(1,(r.maxRegion||0)+1)))for(const x of R0.nodes)if(['tran','thanh','tong'].includes(x.type)&&!x.patron)pool.push(x);
      if(pool.length){const x=pick(pool);x.patron={ten:L.ten,who:L.who,d:L.d,role:x.type==='tong'?'trưởng lão':'chưởng quỹ'};continue;}}
    if(L.t==='oan'&&chance(.5)){L.feud=1;keep.push(L);continue;}
    if(L.t==='oan'&&!L.feud)continue;
    keep.push(L);
  }
  w.legacy=keep.slice(-20);
  if(w.chron.length>60)w.chron=w.chron.slice(-60);
}
// tin đồn về các kiếp trước
const RUMOR_KIEP=['Trà lâu vẫn kể chuyện {$a}, người năm {$y} từng {$v}. Có kẻ bảo người ấy chưa chết, chỉ đổi một cái tên.','Ở {$pl} có tấm bia khắc tên {$a}. Người qua đường vẫn dừng lại vái một vái.','“Thời {$a} còn sống ấy à…” Lão già lắc đầu. “Bây giờ không còn ai như thế nữa.”'];
function rumorKiep(){const L=G.meta.lives.filter(x=>x.hero);if(!L.length)return null;const x=pick(L);return T(RUMOR_KIEP,{a:x.ten,y:x.y||tYear(W().t)-20,v:x.hero,pl:placeName(pick(['nui','thanh','tran']))});}
function shopExtra(items,n){const r=G.run;if(n&&W().ents.some(e=>e.type==='di'&&e.data.k==='daugia'&&e.at===n.id)&&r.region<4)items.push({k:'pass',reg:r.region+1,n:'Lệnh bài thông quan '+REG[r.region+1].n,p:price(90)});}

// lưu (được UI gán)
let saveSoon=()=>{};

// ================= SỰ KIỆN 1: GIANG HỒ, PHÀM TRẦN =================
ev({id:'lao_gia',src:'road',n:'Lão nhân hấp hối',tg:['*'],r:[0,1,2],w:3,v:()=>({a:npc('gia')}),
 t:['{mo} Bên vệ đường, một lão nhân {$a.look} nằm co ro dưới gốc cây, hơi thở đứt quãng. Thấy ngươi, {$a.hn} gắng nhấc tay: “{$a.goi}… nước…”',
    'Ngươi suýt vấp phải một người nằm giữa lối. Là một lão nhân {$a.look}, ngực áo loang máu đã thâm đen. Bên hông {$a.hn} là một túi trữ vật thêu chỉ bạc.',
    '{$canh} Dưới mái đình đổ, có người đang ho ra máu. {$a.ten}, một tán tu {$a.look}, ngẩng lên nhìn ngươi bằng ánh mắt của kẻ biết mình sắp chết.'],
 c:[
  {i:'🤲',l:'Đỡ dậy, truyền chút linh lực',cost:{mp:'30%'},o:[
    {w:3,t:'{$a.hn} nắm chặt tay ngươi, cười khà: “Không ngờ cuối đời còn gặp được người tốt.” {$a.hn} nhét vào tay ngươi một cuốn sách nhàu nát, rồi nhắm mắt. Gió thổi, mái tóc bạc khẽ lay.',e:{skill:1,karma:5}},
    {w:2,t:'{$a.hn} gắng gượng kể về một khe đá sau núi, rồi tắt thở. Ngươi chôn cất tử tế. Theo lời {$a.hn}, ngươi tìm được mấy túi linh thạch giấu kỹ.',e:{st:25,karma:5,tv:4}},
    {w:1,t:'Bàn tay khô héo bỗng siết lại như gọng kìm. {$a.hn} ngẩng lên, mắt đỏ ngầu: “Thân thể trẻ thật…” Là ma tu muốn đoạt xá!',fight:{k:'matu',n:'{$a.ten}',m:1.1},win:{t:'Lão ma tan thành khói đen. Trong túi còn ít linh thạch và một viên đan.',e:{st:20,pill:1}}}]},
  {i:'🎒',l:'Lấy túi trữ vật',o:[
    {w:2,t:'Ngươi giật lấy túi. {$a.hn} trợn mắt nhìn ngươi, muốn nói gì đó mà không thành tiếng. Đi xa rồi, ngươi vẫn thấy ánh mắt ấy sau gáy.',e:{st:35,karma:-8,tamma:6}},
    {w:1,t:'Túi có cấm chế. Vừa chạm vào, một luồng hắc khí xộc lên tay. {$a.hn} cười khàn khàn rồi tắt thở.',e:{hp:'-20%',karma:-5,st:15}}]},
  {i:'🚶',l:'Bước qua',t:'Ngươi bước qua. Sau lưng có tiếng thở dài, rồi im bặt. Tu tiên giới mỗi ngày đều có người chết như vậy.',e:{tamma:2}}
 ]});

ev({id:'thuong_doan',src:'road',n:'Thương đội gặp nạn',tg:['rung','nui','hoang','song','bien'],w:2,v:()=>({a:npc('thuong')}),
 t:['{mo} Phía trước có tiếng la hét. Một đoàn xe thương lái bị chặn giữa đường, {$a.ten} đang quỳ lạy một đám người bịt mặt.',
    'Tiếng ngựa hí, tiếng hàng hóa đổ loảng xoảng. Một thương đội bị cướp chặn đánh, hộ vệ đã ngã quá nửa. {$a.ten}, {$a.look}, co rúm sau bánh xe.'],
 c:[
  {i:'⚔️',l:'Ra tay tương trợ',fight:{k:'sontac'},win:{t:'{$a.ten} lạy ngươi như tế sao: “Ân nhân! Ân nhân!” Gã nhất quyết dúi vào tay ngươi một túi linh thạch, hứa sau này gặp lại sẽ báo đáp.',e:{st:30,karma:6,an:['a','cứu khỏi tay bọn cướp']}}},
  {i:'👀',l:'Đứng xem, chờ ngư ông đắc lợi',chk:['tp',10],
    ok:{t:'Hai bên đánh nhau tan tác. Ngươi lặng lẽ nhặt mấy thứ rơi vãi rồi biến mất trước khi ai kịp để ý.',e:{st:25,karma:-3,pill:1}},
    no:{t:'Một tên cướp phát hiện ra ngươi. “Còn một con chuột!” Cả đám quay sang.',fight:{k:'sontac'},win:{t:'Bọn cướp chạy tán loạn. Thương đội đã bỏ đi từ lúc nào.',e:{st:10}}}},
  {i:'🚶',l:'Đi đường vòng',t:'Chuyện của người ta, ngươi không xen vào. Đi vòng mất thêm nửa ngày.',e:{h:36}}
 ]});

ev({id:'ke_bi_duoi',src:'road',n:'Kẻ bị truy sát',tg:['*'],w:2,v:()=>({a:npc('tre'),b:npc('tre')}),
 t:['Một bóng người lao ra từ bụi rậm, suýt đâm sầm vào ngươi. Là {$a.ten}, {$a.look}, vai cắm một mũi tên. “Cứu… người của {$sect} đang đuổi theo!”',
    'Có tiếng bước chân dồn dập. {$a.ten} chạy tới, sắc mặt trắng bệch: “{$a.goi}, xin che giấu giúp {$a.xung}! {$sect} muốn giết người diệt khẩu!”'],
 c:[
  {i:'🛡️',l:'Đứng chắn phía trước',fight:{k:'detu',n:'{$b.ten}'},win:{t:'{$a.ten} cúi đầu thật sâu: “Ơn này {$a.xung} khắc cốt.” Trước khi đi, {$a.hn} để lại cho ngươi một viên đan.',e:{pill:1,karma:5,an:['a','cứu khỏi tay truy binh']}}},
  {i:'🌿',l:'Giấu vào bụi rậm, đánh lạc hướng',chk:['tam',10],
    ok:{t:'Đám đệ tử {$sect} hỏi, ngươi chỉ bừa sang hướng khác, mặt không đổi sắc. Chúng đi rồi, {$a.ten} bò ra, run rẩy cảm tạ.',e:{karma:5,tv:3,an:['a','che giấu khỏi truy binh']}},
    no:{t:'“Nói dối không chớp mắt nhỉ?” Kẻ cầm đầu cười lạnh, rút kiếm.',fight:{k:'detu',n:'{$b.ten}'},win:{t:'Đuổi được bọn chúng, nhưng {$a.ten} đã biến mất, chỉ để lại vệt máu và một miếng ngọc bội.',e:{relic:0}}}},
  {i:'👉',l:'Chỉ chỗ cho kẻ đuổi',t:'Ngươi chỉ tay. {$a.ten} nhìn ngươi bằng ánh mắt mà ngươi sẽ còn nhớ rất lâu. Đệ tử {$sect} ném cho ngươi túi linh thạch như ném xương cho chó.',e:{st:30,karma:-8,tamma:5,oan:['a','chỉ chỗ cho kẻ thù']}}
 ]});

ev({id:'linh_thao',n:'Linh thảo trên vách',tg:['nui','rung','dong'],w:2,
 t:['{$canh} Trên vách đá dựng đứng, một gốc linh thảo lá đỏ như son tỏa ánh sáng nhạt. Ít nhất cũng trăm năm tuổi.',
    'Ngươi ngửi thấy mùi hương ngọt lịm. Ngẩng lên, một đóa hoa trắng muốt mọc nơi kẽ đá cao mấy chục trượng, có con rắn nhỏ quấn quanh thân.',
    'Giữa khe đá ẩm ướt mọc một cây nấm màu tím, tán to bằng cái nón. Quanh đó không có cọng cỏ nào, như mọi thứ đều nhường chỗ cho nó.'],
 c:[
  {i:'🧗',l:'Leo lên hái',chk:['tp',9],ok:{t:['Ngươi bám từng mỏm đá mà lên. Lúc chạm được linh thảo, mồ hôi đã ướt đẫm lưng. Đáng giá.','Một chân trượt, một tay bám, ngươi treo lơ lửng giữa không trung một hồi lâu. Nhưng cuối cùng, linh thảo đã nằm trong tay.'],e:{pill:'tinhnguyen',tv:4}},
    no:{t:'Đá vụn dưới tay vỡ ra. Ngươi rơi xuống, lăn mấy vòng mới dừng. Ngẩng lên, linh thảo vẫn đung đưa trên cao như trêu ngươi.',e:{hp:'-25%'}}},
  {i:'🪄',l:'Dùng pháp thuật hái từ xa',cost:{mp:'40%'},t:'Linh lực hóa thành bàn tay vô hình, nhẹ nhàng nhổ cả gốc. Ngươi thở ra, mệt nhưng hài lòng.',e:{pill:'hoixuan',tv:3}},
  {i:'🐍',l:'Chờ thủ hộ thú lộ diện',fight:{k:'mang'},win:{t:'Thủ hộ thú chết. Ngươi thong thả hái linh thảo, lại được thêm cái mật.',e:{pill:'tinhnguyen',st:8}}}
 ]});

ev({id:'thi_the',src:'road',n:'Thi thể bên đường',tg:['*'],w:2,
 t:['Một thi thể nằm sấp bên đường, áo đệ tử {$sect} đã bạc màu. Bên hông vẫn còn túi trữ vật.',
    'Dưới gốc cây có một bộ xương còn mặc đạo bào. Tay xương ôm chặt một hộp gỗ, như sợ ai lấy mất.',
    '{$canh} Mùi tử khí xộc vào mũi. Một tu sĩ chết chưa lâu, mắt vẫn mở, như đang nhìn thứ gì phía sau ngươi.'],
 c:[
  {i:'🔍',l:'Lục soát',o:[
    {w:3,t:'Ngươi tìm được ít linh thạch và một viên đan còn nguyên trong lọ.',e:{st:18,pill:1}},
    {w:2,t:'Trong hộp là một cuộn bí tịch dính máu. Chữ viết run rẩy, như được chép trong cơn hấp hối.',e:{skill:1}},
    {w:1,t:'Túi có độc. Ngón tay ngươi tím tái lại, phải vận công nửa ngày mới ép ra được.',e:{hp:'-15%',st:10}},
    {w:1,t:'Thi thể bỗng co giật, rồi ngồi bật dậy!',fight:{k:'cuongthi'},win:{t:'Lần này thì nó nằm yên thật. Trong túi còn ít linh thạch.',e:{st:20}}}]},
  {i:'⚱️',l:'Chôn cất tử tế',t:['Ngươi đào huyệt, đặt thi thể xuống, cắm một cành cây làm bia. Đêm ấy ngươi mơ thấy một người cúi đầu cảm tạ.','Ngươi khép mắt người chết lại, đắp đất thành nấm. Không biết tên, ngươi khắc lên đá: “Người đi đường”.'],e:{karma:6,tam:1,van:1}},
  {i:'🚶',l:'Không đụng vào',t:'Người chết rồi, ân oán nên chết theo. Ngươi đi tiếp.'}
 ]});

ev({id:'tranh_bao',n:'Tranh đoạt bảo vật',tg:['nui','rung','phe','dong','hoang','bien'],w:2,v:()=>({a:npc('tre'),b:npc('tre')}),
 t:['Kiếm quang và hỏa quang va vào nhau trên không trung. {$a.ten} và {$b.ten} đang tranh nhau một chiếc hộp ngọc, cả hai đều đã bị thương.',
    'Một bảo vật vừa xuất thế, hào quang chiếu sáng nửa sườn núi. Bên dưới, hai nhóm tu sĩ đang đánh nhau sống chết.'],
 c:[
  {i:'🎣',l:'Đợi cả hai kiệt sức rồi ra tay',chk:['tp',11],
    ok:{t:'Lúc cả hai cùng thở dốc, ngươi lao ra chộp lấy hộp ngọc rồi độn thổ. Sau lưng là tiếng chửi rủa vang trời.',e:{relic:0,karma:-3,oan:['a','cướp bảo vật trước mắt']}},
    no:{t:'Cả hai đều quay lại nhìn ngươi. Có lẽ đó là lần duy nhất họ đồng lòng.',fight:{k:'tantu',m:1.2},win:{t:'Ngươi đánh lui cả hai. Bảo vật về tay ngươi, dù cái giá không nhỏ.',e:{relic:0}}}},
  {i:'🤝',l:'Giúp {$a.ten}',fight:{k:'tantu',n:'{$b.ten}'},win:{t:'{$a.ten} chia cho ngươi một nửa chiến lợi phẩm, còn kéo ngươi đi uống rượu tới khuya.',e:{st:25,pill:1,an:['a','giúp giữ bảo vật']}}},
  {i:'🚶',l:'Không dính vào',t:'Bảo vật nhiều kẻ tranh thường là mồi câu. Ngươi rời đi.',e:{tv:2}}
 ]});

ev({id:'sap_ban',n:'Sạp hàng đồ cổ',tg:['tran','thanh'],w:2,v:()=>({a:npc('thuong')}),
 t:['Một sạp hàng nhỏ bày la liệt đồ cũ. {$a.ten}, {$a.look}, vừa thấy ngươi đã nhoẻn cười: “{$a.goi} xem thử, toàn đồ thượng cổ cả!”',
    'Ở góc chợ, một gã bán hàng rong đang thề sống thề chết rằng cái bát mẻ trên tay từng là bát cơm của tiên nhân.'],
 c:[
  {i:'🎲',l:'Mua đại một món',cost:{st:22},o:[
    {w:2,t:'Về nhìn kỹ, hóa ra là đồ thật!',e:{relic:0}},
    {w:2,t:'Là một viên đan không rõ tên, ngửi thấy thơm. Ngươi đánh liều cất đi.',e:{pill:1}},
    {w:2,t:'Đồ giả. Rõ ràng là đồ giả. Ngươi cười khổ, coi như học phí.'}]},
  {i:'🗣️',l:'Mặc cả',chk:['van',8],ok:{t:'Ngươi nói một hồi, gã bán hàng mặt tái mét, cuối cùng đưa ngươi một món gần như cho không.',e:{relic:0,st:-6}},no:{t:'Gã cười hề hề, không bớt một đồng. Ngươi bỏ đi.'}},
  {i:'🔎',l:'Vạch trần đồ giả',chk:['ngo',10],ok:{t:'Ngươi chỉ ra từng vết keo dán. Đám đông cười ồ, gã phải bồi thường cho mấy người bị lừa trước đó, lại dúi cho ngươi chút tiền để im miệng.',e:{st:15,karma:2}},no:{t:'Ngươi nói sai. Món đó là thật. Cả chợ cười ngươi.',e:{tamma:2}}}
 ]});

ev({id:'thu_con',n:'Thú non lạc mẹ',tg:['rung','nui','dong','hoang'],w:2,
 t:['Trong hốc cây, một con thú nhỏ lông trắng đang run rẩy, chân bị kẹp. Nó kêu ư ử khi thấy ngươi.',
    'Tiếng kêu non nớt dẫn ngươi tới một con hồ ly con, lông đỏ như lửa, mắt đen láy. Mẹ nó nằm chết cách đó không xa, trên mình cắm ba mũi tên.'],
 c:[
  {i:'🐾',l:'Cứu và nuôi nó',req:r=>!r.relics.find(x=>x.u==='linhthu'),t:'Ngươi gỡ bẫy, băng bó cho nó. Con thú nhỏ liếm tay ngươi rồi chui vào ngực áo, từ đó không chịu rời.',e:{relic:'linhthu',karma:4}},
  {i:'🗡️',l:'Lấy yêu đan',t:'Ngươi xuống tay dứt khoát. Yêu đan nhỏ như hạt đậu, vẫn còn ấm.',e:{tv:6,karma:-5,tamma:3}},
  {i:'🔙',l:'Đưa về hang',o:[
    {w:2,t:'Ngươi đặt nó trước cửa hang. Một con thú lớn hiện ra, nhìn ngươi rất lâu, rồi đẩy ra một viên ngọc sáng.',e:{relic:0,karma:4}},
    {w:1,t:'Thú mẹ tưởng ngươi bắt con nó, gầm lên lao tới!',fight:{k:'beast'},win:{t:'Ngươi đánh lui thú mẹ. Hai mẹ con chạy vào rừng sâu. Ngươi đứng đó, không biết nên vui hay buồn.',e:{tv:3}}}]}
 ]});

ev({id:'thac_ngo',n:'Ngộ đạo dưới thác',tg:['nui','song','rung'],w:2,
 t:['Thác nước trắng xóa đổ xuống từ trăm trượng. Ngươi ngồi xuống tảng đá bên dưới, tiếng nước gầm như sấm mà lòng lại tĩnh lạ thường.',
    '{$canh} Tiếng nước chảy có nhịp, như có ai đang gảy đàn. Ngươi bỗng nhớ tới một câu khẩu quyết chưa từng hiểu.'],
 c:[
  {i:'🧘',l:'Ngồi xuống ngộ đạo',chk:['ngo',9],ok:{t:'{tvgain} Khi mở mắt, trăng đã lên tới đỉnh. Ngươi ngồi đó nửa năm.',e:{dao:2,tv:14,tam:1,h:360}},no:{t:'Càng nghĩ càng rối. Tiếng nước như tiếng cười nhạo. Ngươi đứng dậy, đầu đau như búa bổ.',e:{tamma:4,tv:3,h:216}}},
  {i:'🏊',l:'Đứng dưới thác luyện thể',t:'Nước đập vào lưng như búa tạ. Ngươi nghiến răng chịu đựng ba ngày ba đêm, da thịt tím bầm rồi lại lành.',e:{hp:'-15%',hpP:5}},
  {i:'🚶',l:'Ngắm một lúc rồi đi',t:'Cảnh đẹp, nhưng đường còn dài.',e:{tamma:-3}}
 ]});

ev({id:'bia_co',n:'Bia đá cổ',tg:['phe','nui','hoang','thien'],w:2,
 t:['Một tấm bia đá cao ba trượng, chữ khắc như rồng bay phượng múa. Nhìn lâu, ngươi thấy chữ như đang chuyển động.',
    'Giữa đống đổ nát có tấm bia gãy. Nửa trên đã mất, nửa dưới còn mấy hàng chữ cổ, nét nào cũng sâu như kiếm khắc.'],
 c:[
  {i:'👁️',l:'Tham ngộ',chk:['ngo',11],ok:{t:'Chữ trên bia hóa thành kiếm, thành lửa, thành nước, rồi tụ lại trong đầu ngươi thành một môn pháp thuật.',e:{dao:2,skill:1,lore:'doan_thien'}},no:{t:'Chữ trên bia đâm vào thức hải như kim. Ngươi ôm đầu lùi lại, mũi chảy máu.',e:{hp:'-10%',tamma:3}}},
  {i:'📜',l:'Chép lại để bán',t:'Mất ba ngày mới chép xong. Ít ra cũng có thứ để bán cho đám thư sinh hiếu kỳ.',e:{st:18,h:36}},
  {i:'🔨',l:'Đập bia lấy linh thạch bên trong',t:'Bia vỡ. Trong lõi đá quả có linh thạch, nhưng ngươi có cảm giác vừa làm một chuyện không nên làm.',e:{st:35,karma:-4}}
 ]});

ev({id:'ao_tran',n:'Ảo trận',tg:['rung','phe','dong','nui','ma'],w:2,
 t:['Sương mù dâng lên. Khi tan đi, ngươi thấy mình đứng giữa sân nhà cũ ở {$que}. Có tiếng gọi vào ăn cơm.',
    'Bước thêm một bước, cảnh vật đổi khác. Ngươi đứng trên đài cao, bên dưới hàng vạn người quỳ lạy, gọi ngươi là Tiên Tôn.',
    'Đi mãi vẫn quay về gốc cây ấy. Lần thứ ba, ngươi khắc một dấu lên thân cây. Lần thứ tư, dấu khắc đã ở đó trước khi ngươi khắc.'],
 c:[
  {i:'🪷',l:'Giữ vững bản tâm',chk:['tam',10],ok:{t:'Ngươi nhắm mắt, niệm một câu tĩnh tâm. Ảo cảnh vỡ như gương. Trận nhãn hiện ra, bên trong còn sót linh thạch.',e:{st:20,tam:1,tv:5}},no:{t:'Ngươi chìm trong ảo cảnh mấy tháng trời. Khi tỉnh lại, người gầy rộc, tóc dài chấm vai.',e:{h:432,tamma:6}}},
  {i:'💥',l:'Dùng sức phá trận',cost:{mp:'40%'},t:'Ngươi tung toàn lực vào hư không. Ảo trận nứt toác, nhưng phản chấn khiến ngươi hộc máu.',e:{hp:'-15%',tv:4}},
  {i:'😌',l:'Ở lại thêm chút nữa',t:'Biết là giả, ngươi vẫn ngồi xuống ăn hết bát cơm. Rời đi, ngươi khóc như đứa trẻ. Lòng nhẹ đi nhiều.',e:{tamma:-10,h:72}}
 ]});

ev({id:'linh_tuyen',n:'Linh tuyền',tg:['nui','rung','dong','song'],w:2,
 t:['Giữa khe núi có một hồ nước nhỏ, mặt nước bốc hơi trắng, linh khí nồng đến mức đọng thành giọt.','{$canh} Ngươi tìm thấy một dòng suối nước ấm, đáy suối lấp lánh như rải ngọc vụn.'],
 c:[
  {i:'🛁',l:'Ngâm mình',t:'Nước thấm vào từng lỗ chân lông. Xương cốt kêu răng rắc, rồi nhẹ bẫng.',e:{dao:1,hp:'100%',hpP:4}},
  {i:'🫗',l:'Uống vài ngụm',t:'Nước ngọt lịm, đi tới đâu mát tới đó. Linh lực trong người như được rửa sạch.',e:{mp:'100%',mpP:5}},
  {i:'🏺',l:'Đóng vào bình',t:'Ngươi đổ đầy hai bình. Thứ nước này luyện đan rất tốt.',e:{pill:['hoixuan','tukhi']}}
 ]});

ev({id:'do_thach',n:'Đổ thạch',tg:['thanh','tran'],r:[0,1,2],w:2,v:()=>({a:npc('thuong')}),
 t:['Phường đổ thạch đông nghịt. Những khối đá thô xếp thành đống, mở ra có thể là linh ngọc, cũng có thể chỉ là đá.','“Một đao nghèo, một đao giàu!” {$a.ten} hét lớn, tay vỗ lên khối đá đen sì.'],
 c:[
  {i:'🪨',l:'Mua một khối nhỏ',cost:{st:15},o:[{w:3,t:'Đá. Chỉ là đá.'},{w:2,t:'Có một mạch linh thạch nhỏ, đủ hoàn vốn và lời chút ít.',e:{st:25}},{w:1,t:'Lớp vỏ vỡ, ánh xanh tràn ra. Cả phường lặng đi. Một khối linh tủy!',e:{st:60,van:1}}]},
  {i:'💰',l:'Chơi lớn',cost:{st:40},o:[{w:3,t:'Đá. Ngươi nghe tiếng ai đó cười khúc khích sau lưng.'},{w:2,t:'Một mạch linh thạch dày bằng ngón tay. Đám đông xuýt xoa.',e:{st:80}},{w:1,t:'Bên trong là một món pháp bảo bị phong ấn trong đá!',e:{relic:1}}]},
  {i:'👁️',l:'Dùng thần thức dò trước',chk:['ngo',12],ok:{t:'Ngươi chọn một khối xấu xí ở góc. Chủ sạp cười, bán rẻ. Mở ra, cả phường im bặt.',e:{st:50}},no:{t:'Thần thức vừa chạm vào đã bị cấm chế đánh bật. Bị phát hiện dò trộm, ngươi bị mời ra ngoài.',e:{tamma:2}}}
 ]});

ev({id:'hac_diem',n:'Quán trọ đen',tg:['tran','rung','song','hoang'],w:2,
 t:['Quán trọ ven đường đèn đóm lờ mờ. Bà chủ cười rất tươi, rót rượu rất đầy.','Trời tối, chỉ có một khách điếm giữa rừng. Tiểu nhị nhìn túi trữ vật của ngươi lâu hơn nhìn mặt ngươi.'],
 c:[
  {i:'🍶',l:'Uống rượu, nghỉ đêm',chk:['ngo',10],
    ok:{t:'Rượu có mùi lạ. Ngươi vờ uống, đợi nửa đêm cả bọn mò vào thì…',fight:{k:'sontac',n:'Chủ quán đen'},win:{t:'Hắc điếm bị dẹp. Dưới hầm có cả đống đồ của khách bị hại.',e:{st:30,karma:4,pill:1}}},
    no:{t:'Tỉnh dậy, ngươi nằm ngoài bãi tha ma, túi trữ vật nhẹ bẫng, đầu đau như búa bổ.',e:{st:'-30%',hp:'-10%'}}},
  {i:'🗡️',l:'Ra tay trước',fight:{k:'sontac',n:'Chủ quán đen'},win:{t:'Ngươi đoán không sai. Dưới hầm toàn xương người. Ngươi phóng hỏa đốt quán, mang theo số tiền chúng cướp được.',e:{st:28,karma:3}}},
  {i:'🌙',l:'Ngủ ngoài trời',t:'Ngươi gác kiếm ngủ dưới gốc cây. Nửa đêm nghe tiếng bước chân lảng vảng, rồi xa dần.',e:{hp:'15%'}}
 ]});

ev({id:'tra_lau',n:'Trà lâu',tg:['tran','thanh'],w:3,
 t:['Trà lâu chật kín người. Tiên sinh kể chuyện vỗ thước gỗ xuống bàn: “Hôm nay, ta kể chuyện Ngũ Tổ chém Yêu Hoàng!”','Ngồi góc trà lâu, ngươi nghe đủ chuyện thiên hạ. Người ta bàn về {$rv}, về {$sect}, về giá linh thạch lên xuống.'],
 c:[
  {i:'👂',l:'Ngồi nghe',t:'Kể tới chỗ máu Yêu Hoàng bắn lên cửa trời, cả trà lâu nín thở. Câu chuyện ấy ai cũng thuộc, mà vẫn nghe.',e:{lore:'ngu_to',rumor:2}},
  {i:'📢',l:'Lên kể chuyện kiếm tiền',chk:['ngo',8],ok:{t:'Ngươi kể chuyện mình đánh nhau với yêu thú, thêm thắt chút ít. Khách vỗ tay, quăng tiền lên bục.',e:{st:15}},no:{t:'Ngươi kể lộn đầu lộn đuôi, khách ném vỏ lạc lên bục. Ba tối được đúng ít tiền lẻ.',e:{st:3}}},
  {i:'🍵',l:'Uống trà rồi đi',t:'Trà ngon. Vậy là đủ.',e:{hp:'10%',tamma:-2}}
 ]});

ev({id:'cao_thi',n:'Cáo thị truy nã',tg:['tran','thanh'],w:2,v:()=>({a:npc('ma')}),
 t:['Trên tường thành dán cáo thị: truy nã {$a.ten}, kẻ đã giết cả nhà một vị huyện lệnh. Thưởng hậu.','Bảng cáo thị ở cổng trấn có tờ mới: {$a.ten}, ma tu, đang lẩn trốn quanh {$pl}. Bên dưới có hàng chữ đỏ: “Sống chết không cần.”'],
 c:[
  {i:'📜',l:'Bóc cáo thị',fight:{k:'matu',n:'{$a.ten}',m:1.15},win:{t:'Ngươi mang đầu {$a.ten} về phủ nha. Quan phủ thưởng linh thạch theo lệ, dân chúng đốt pháo mừng.',e:{st:45,karma:5,tv:4}}},
  {i:'🚶',l:'Không phải việc của ta',t:'Ngươi đi qua. Phía sau có người thở dài: “Lại một tu sĩ chẳng quan tâm.”'}
 ]});

ev({id:'xem_tuong',n:'Thầy bói',tg:['tran','thanh','song'],r:[0,1,2,3],w:2,v:()=>({a:npc('dao')}),
 t:['Một lão đạo ngồi dưới lá phướn ghi bốn chữ “Thiết khẩu trực đoán”. Thấy ngươi, lão nheo mắt: “{$a.goi}, mệnh có kiếp nạn đấy.”','Bàn bói dựng bên đường. Thầy bói là {$a.ten}, {$a.look}. Lão gọi giật ngươi lại: “Đứng đó. Ấn đường của ngươi có khí đen.”'],
 c:[
  {i:'🪙',l:'Trả tiền xem quẻ',cost:{st:10},o:[
    {w:2,t:'Lão gieo ba đồng xu, nhìn rất lâu rồi nói: “Đi phương nào cũng gặp quý nhân, chỉ cần đừng tham.” Lòng ngươi bỗng nhẹ nhõm.',e:{van:2}},
    {w:2,t:'Lão rùng mình, đẩy tiền lại: “Quẻ này ta không dám nói. Ngươi tự bảo trọng.”',e:{st:10,tamma:2}},
    {w:1,t:'Lão phán ngươi sống không quá ba mươi. Ngươi cười. Lão không cười.',e:{tam:1}}]},
  {i:'🙅',l:'Vạch mặt kẻ lừa đảo',chk:['ngo',9],ok:{t:'Ngươi chỉ ra ba chỗ sai trong lời lão. Lão đạo nhìn ngươi một lúc lâu, rồi cười ha hả, tặng ngươi một lá bùa.',e:{pill:'kimcang'}},no:{t:'Lão cười nhạt, nói đúng ba chuyện cũ của ngươi mà ngươi chưa từng kể với ai. Ngươi lạnh gáy.',e:{tamma:3}}}
 ]});

ev({id:'an_may',n:'Kẻ ăn mày lạ',tg:['tran','thanh','song'],w:2,v:()=>({a:npc('gia')}),
 t:['Một lão ăn mày {$a.look} chìa cái bát mẻ về phía ngươi. “{$a.goi}, cho xin miếng ăn.”','Ở góc phố, một kẻ ăn mày nằm ngáy pho pho, bên cạnh là bầu rượu rỗng. Thấy ngươi, {$a.hn} mở một mắt: “Có rượu không?”'],
 c:[
  {i:'🍚',l:'Cho tiền mua đồ ăn',cost:{st:8},o:[
    {w:2,t:'{$a.hn} ăn ngấu nghiến, xong chùi tay vào áo, móc từ trong ngực ra một cuốn sách nhàu nát: “Giấy lau tay, cho ngươi.” Ngươi lật vài trang, tay run lên.',e:{skill:1,karma:3}},
    {w:3,t:'{$a.hn} cảm tạ rối rít, chúc ngươi sống lâu. Chỉ vậy thôi. Nhưng ngươi thấy vui.',e:{karma:4,van:1}}]},
  {i:'🍶',l:'Mời rượu, ngồi nói chuyện',cost:{st:12},t:'Hai người uống tới khuya. {$a.hn} kể chuyện trên trời dưới đất, có mấy câu nghe như khẩu quyết. Sáng ra, {$a.hn} biến mất.',e:{tv:8,ngo:1}},
  {i:'🙅',l:'Lắc đầu đi qua',t:'{$a.hn} nhìn theo, khẽ thở dài: “Lại một kẻ không có duyên.”'}
 ]});

ev({id:'tre_ban_hoa',n:'Đứa trẻ bán hoa',tg:['tran','thanh'],w:2,v:()=>({a:npc('hai')}),
 t:['Một đứa trẻ {$a.look} đứng nép bên đường bán từng bó hoa dại. “Mua hoa đi {$a.goi}, mẹ cháu ốm nặng lắm…”','{$a.ten}, một đứa trẻ {$a.look}, quỳ trước tiệm thuốc, trán dập xuống đất đã rớm máu. Chủ tiệm đứng khoanh tay.'],
 c:[
  {i:'💎',l:'Cho linh thạch',cost:{st:12},t:'Ngươi đặt linh thạch vào tay đứa trẻ. {$a.hn} sững sờ, rồi òa khóc, rồi chạy biến đi. Ngươi không biết nó có mua được thuốc không.',e:{karma:6,an:['a','cho tiền mua thuốc']}},
  {i:'🌿',l:'Theo về xem bệnh',cost:{mp:'30%'},t:'Người bệnh bị âm khí xâm thể. Ngươi truyền linh lực đẩy âm khí ra ngoài. Người đỡ dần, cả nhà quỳ lạy ngươi.',e:{karma:8,tv:3,an:['a','chữa bệnh cho người nhà']}},
  {i:'🚶',l:'Thế gian khổ nhiều, giúp không xuể',t:'Ngươi bước đi. Tiếng rao non nớt đuổi theo mãi một đoạn đường.',e:{tamma:2}}
 ]});

ev({id:'kiem_khach',n:'Kiếm khách say',tg:['tran','thanh','song','nui'],w:2,v:()=>({a:npc('nam')}),
 t:['Trên lan can tửu lâu, một kiếm khách {$a.look} đang ngửa cổ tu rượu. Thấy kiếm khí trên người ngươi, hắn cười lớn: “Đấu một trận không?”','Giữa cầu đá có kẻ say nằm chắn ngang, kiếm đặt trên bụng. Hắn không nhúc nhích: “Muốn qua cầu, đỡ ta ba kiếm.”'],
 c:[
  {i:'⚔️',l:'Nhận lời',fight:{k:'kiemtu',n:'{$a.ten}',spar:1},win:{t:'Hắn tỉnh rượu hẳn, chắp tay: “Hay! Hay!” Rồi tặng ngươi nửa bầu rượu và một câu kiếm quyết.',e:{tv:6,atkP:3}},lose:{t:'Ba kiếm. Ngươi đỡ được hai. Hắn thu kiếm, vỗ vai ngươi: “Không tệ.”',e:{tv:4}}},
  {i:'🍶',l:'Uống cùng hắn',cost:{st:8},t:'Hai người uống từ trưa tới tối. Hắn kể về một người con gái đã chết, về thanh kiếm hắn chưa từng rút khỏi vỏ. Lúc chia tay, hắn cười rất buồn.',e:{tam:2,an:['a','uống rượu nghe chuyện']}},
  {i:'🚶',l:'Đi đường khác',t:'Kẻ say rượu, nói chuyện với hắn làm gì.'}
 ]});

ev({id:'hoa_duyen',n:'Tăng nhân hóa duyên',tg:['tran','thanh','song','nui'],w:2,v:()=>({a:npc('tang')}),
 t:['Một vị hòa thượng {$a.look} đứng trước mặt ngươi, chắp tay: “A di đà Phật. Thí chủ có thể bố thí cho bần tăng một bữa chay?”','Tiếng mõ lốc cốc. {$a.ten}, vị tăng khổ hạnh, đi chân đất qua cổng trấn. Đi tới đâu, chó dữ cũng im.'],
 c:[
  {i:'🙏',l:'Bố thí',cost:{st:6},t:'Vị tăng nhận, rồi đặt tay lên đỉnh đầu ngươi. Một luồng ấm áp lan xuống, những ý nghĩ đen tối trong lòng tan như sương.',e:{tamma:-12,karma:3}},
  {i:'💬',l:'Hỏi đạo',chk:['ngo',10],ok:{t:'“Thí chủ hỏi trường sinh để làm gì?” Ngươi á khẩu. Vị tăng cười, đọc cho ngươi một đoạn kinh. Về sau ngươi mới hiểu, đó là tâm pháp.',e:{tam:3,tv:5}},no:{t:'Hai bên nói chuyện như gà với vịt. Vị tăng chắp tay cáo từ.'}},
  {i:'⚔️',l:'Thử bản lĩnh vị tăng',fight:{k:'votang',n:'{$a.ten}',spar:1},win:{t:'Vị tăng thu tay, mỉm cười: “Thí chủ võ công cao, chỉ tiếc tâm còn nóng.”',e:{tv:6,karma:-2}},lose:{t:'“Thí chủ, nóng giận hại thân.” Vị tăng đỡ ngươi dậy, phủi bụi cho ngươi.',e:{tamma:-5,tv:3}}}
 ]});

ev({id:'ho_ly',n:'Thiếu nữ trong rừng',tg:['rung','tran','phe'],r:[0,1,2],w:2,v:()=>({a:npc('nu')}),
 t:['Giữa rừng sâu lại có một thiếu nữ ngồi khóc bên suối. Nàng {$a.look}, nói bị lạc đường, xin ngươi đưa về nhà.','Đêm mưa, có người gõ cửa miếu nơi ngươi trú. Một nữ tử ướt sũng, cười e lệ: “Cho tiểu nữ trú nhờ một đêm được không?”'],
 c:[
  {i:'🏮',l:'Đưa nàng về',chk:['ngo',10],ok:{t:'Đi một đoạn, ngươi để ý thấy chân nàng không chạm đất. Ngươi dừng lại. Nàng cũng dừng lại, cười: “Đạo hữu tinh mắt thật.” Rồi hóa thành hồ ly, để lại một món quà.',e:{relic:0,tv:4}},no:{t:'Nàng dẫn ngươi vào một tòa nhà lộng lẫy. Sáng ra ngươi tỉnh dậy giữa bãi tha ma, người mệt lả như bị rút hết sinh khí.',e:{hp:'-25%',tv:-6}}},
  {i:'👁️',l:'Vạch mặt yêu tinh',fight:{k:'holy',n:'Hồ yêu {$a.ten}'},win:{t:'Hồ yêu bỏ chạy, để lại cái đuôi gãy và một viên yêu đan nhỏ.',e:{tv:5,st:10}}},
  {i:'🙈',l:'Giả vờ không thấy',t:'Ngươi quay lưng đi. Sau lưng có tiếng cười khúc khích, như tiếng chuông gió.'}
 ]});

ev({id:'co_mo',n:'Cổ mộ',tg:['phe','nui','hoang','dong'],w:2,v:()=>({}),
 t:['Mưa lở núi, để lộ cửa một ngôi cổ mộ. Trên cửa đá khắc hình thú đầu người, mắt khảm hai viên hồng ngọc.','Dưới chân ngươi có tiếng rỗng. Đào xuống ba thước, lộ ra bậc đá dẫn sâu vào lòng đất, hơi lạnh phả lên tận mặt.'],
 c:[
  {i:'🔦',l:'Vào trong',t:'Hành lang dài hun hút. Đi được trăm bước, trước mặt có ba cánh cửa: một cửa vẽ rồng, một cửa vẽ hổ, một cửa không vẽ gì.',c:[
    {i:'🐉',l:'Cửa rồng',t:'Bên trong là kho báu, nhưng cũng là chỗ của thủ mộ khôi lỗi.',fight:{k:'khoiloi',m:1.1},win:{t:'Khôi lỗi đổ sập. Kho báu là của ngươi.',e:{relic:1,st:25}}},
    {i:'🐯',l:'Cửa hổ',chk:['tp',11],ok:{t:'Tên tẩm độc bắn ra từ bốn phía. Ngươi lăn qua làn mưa tên. Cuối phòng là một hộp gỗ, bên trong có bí tịch.',e:{skill:1}},no:{t:'Ba mũi tên găm vào vai. Ngươi lết ra, chỉ kịp vơ được ít linh thạch.',e:{hp:'-30%',st:15}}},
    {i:'⬜',l:'Cửa trơn',t:'Căn phòng trống, chỉ có một bộ xương ngồi xếp bằng. Trên vách khắc mấy dòng di ngôn: kẻ đến sau, chớ tham.',e:{tam:2,tv:8,lore:'thien_dao'}}]},
  {i:'🪨',l:'Lấp cửa mộ lại',t:'Người chết cần yên nghỉ. Ngươi lăn tảng đá chặn cửa, vái ba vái.',e:{karma:3,van:1}}
 ]});

ev({id:'dong_phu_cu',n:'Động phủ tiền bối',tg:['nui','dong','rung'],w:2,
 t:['Sau thác nước có một động phủ bị bỏ hoang. Cấm chế ở cửa đã yếu, chỉ còn lớp màng mờ như bong bóng.','Ngươi phát hiện một động phủ ẩn sau dây leo. Trên cửa treo tấm biển gỗ: “{$who} bế quan, kẻ tự tiện vào, chết.” Chữ đã mốc meo.'],
 c:[
  {i:'✋',l:'Phá cấm chế',chk:['ngo',10],ok:{t:'Cấm chế tan. Bàn ghế đá phủ bụi dày, trên bồ đoàn có một túi trữ vật.',e:{dao:2,relic:0,pill:1}},no:{t:'Cấm chế phản phệ, một đạo kiếm quang bắn ra sượt qua vai ngươi.',e:{hp:'-20%'}}},
  {i:'🙇',l:'Vái ba vái rồi mới vào',o:[{w:2,t:'Cấm chế tự tan như đáp lễ. Trên bàn đá có một ngọc giản, bên trong là truyền thừa của chủ nhân.',e:{skill:1,karma:2}},{w:1,t:'Không có chuyện gì xảy ra. Có lẽ chủ nhân đã đi quá lâu. Ngươi vào lấy vài thứ còn dùng được.',e:{st:20}}]},
  {i:'🚶',l:'Rời đi',t:'Động phủ của người khác, ngươi không đụng vào.'}
 ]});

ev({id:'bi_canh',src:'ent:di',n:'Bí cảnh mở cửa',tg:['*'],once:1,w:2,
 t:['Trên trời bỗng mở ra một khe nứt ngũ sắc. Tu sĩ khắp nơi đổ về: bí cảnh trăm năm mới mở một lần!','Mặt hồ phẳng lặng bỗng xoáy thành vòng tròn, ánh sáng từ đáy hồ chiếu lên. Lối vào bí cảnh đã mở.'],
 c:[
  {i:'🌀',l:'Xông vào',o:[
    {w:2,t:'Một con thủ hộ thú chặn ngay lối vào.',fight:{elite:1},win:{t:'Thủ hộ thú gục xuống. Phía sau là một bệ đá, trên đó có bảo vật đang phát sáng.',e:{relic:1}}},
    {w:2,t:'Bí cảnh là một vườn thuốc bỏ hoang. Ngươi hái mỏi tay.',e:{pill:['tinhnguyen','hoixuan','taytuy'],h:144}},
    {w:1,t:'Bí cảnh sụp đổ khi ngươi mới vào được nửa đường. Ngươi chạy thục mạng ra ngoài, chỉ kịp vơ lấy một thứ.',e:{relic:0,hp:'-20%'}}]},
  {i:'⏳',l:'Chờ ở cửa, cướp kẻ đi ra',chk:['tp',11],ok:{t:'Mấy kẻ lảo đảo đi ra, mình đầy thương tích. Ngươi ra tay nhanh gọn.',e:{st:40,karma:-6}},no:{t:'Kẻ đi ra đầu tiên lại là kẻ mạnh nhất.',fight:{k:'tantu',elite:1},win:{t:'Hắn gục. Túi trữ vật của hắn nặng trịch.',e:{st:30,karma:-3}}}},
  {i:'🚶',l:'Không tham gia',t:'Nơi nhiều người tranh, thường lắm kẻ chết. Ngươi đi tiếp.'}
 ]});

ev({id:'sao_roi',src:'ent:di',n:'Sao rơi',tg:['nui','hoang','rung','bien','thien'],w:1,
 t:['Đêm qua có sao băng rơi xuống phía tây, đất rung ba lần. Sáng nay khói vẫn còn bốc lên.','Một quả cầu lửa vạch ngang trời rồi đâm xuống thung lũng gần đó. Tiếng nổ làm chim chóc bay rợp trời.'],
 c:[
  {i:'🔥',l:'Tới xem',o:[
    {w:2,t:'Giữa hố sâu là một khối sắt đỏ rực, tỏa ra kiếm khí lạnh buốt.',e:{relic:'tinhthiet'}},
    {w:2,t:'Ngươi tới sau. Đã có kẻ đứng giữa hố.',fight:{k:'tantu'},win:{t:'Kẻ kia bỏ chạy. Khối sắt sao vẫn nằm đó, còn nóng hổi.',e:{relic:'tinhthiet'}}},
    {w:1,t:'Thứ rơi xuống không phải sắt. Nó đang cử động.',fight:{k:'tinhthu',m:1.15},win:{t:'Tinh thú tan thành bụi sao. Trong lòng bàn tay ngươi còn đọng lại mấy hạt sáng.',e:{tv:10,st:25}}}]},
  {i:'🙅',l:'Kệ nó',t:'Trời rơi xuống thứ gì, kệ trời.'}
 ]});

ev({id:'loi_moc',n:'Cây bị sét đánh',tg:['rung','nui'],w:1,
 t:['Cây tùng cổ thụ trên đỉnh đồi bị sét đánh toạc làm đôi, lõi cây đen bóng, vẫn còn tia điện nhảy lách tách.'],
 c:[
  {i:'🪓',l:'Lấy lõi gỗ',o:[{w:2,t:'Ngươi bị giật tê dại cả người, nhưng lấy được.',e:{hp:'-15%',relic:'loimoc'}},{w:1,t:'Lõi gỗ tan thành tro ngay khi chạm tay. Chỉ còn lại cảm giác tê rần ở đầu ngón.',e:{mpP:3}}]},
  {i:'🧘',l:'Ngồi dưới gốc cảm ngộ lôi ý',chk:['ngo',11],ok:{t:'Trong đầu ngươi vang lên tiếng sấm. Khi tĩnh lại, lòng bàn tay đã có thể tóe ra tia điện.',e:{tv:8,skill:'chuongloi'}},no:{t:'Tia điện còn sót lại chui vào kinh mạch. Ngươi giật nảy, tóc dựng đứng cả ngày.',e:{hp:'-10%'}}}
 ]});

ev({id:'bi_cuop',src:'road',n:'Cướp đường',tg:['rung','nui','hoang','song','tran'],w:2,v:()=>({a:npc('nam')}),
 t:['“Núi này ta mở, cây này ta trồng…” Một đám sơn tặc nhảy ra chặn đường, kẻ cầm đầu {$a.look}.','Dây thừng bật lên từ mặt đất, suýt quật ngã ngươi. Mấy gã đàn ông mặt mũi bặm trợn bước ra từ hai bên đường.'],
 c:[
  {i:'⚔️',l:'Đánh',fight:{k:'sontac',n:'{$a.ten}'},win:{t:'Bọn cướp chạy tán loạn, bỏ lại cả của cướp được.',e:{st:20,karma:2}}},
  {i:'💎',l:'Nộp tiền mãi lộ',cost:{st:12},t:'Bọn chúng cười hô hố, nhường đường. Ngươi nuốt cục tức xuống bụng.',e:{tamma:3}},
  {i:'😤',l:'Tỏa uy áp dọa chúng',chk:['tam',9],ok:{t:'Ngươi chỉ hừ một tiếng. Cả bọn quỳ rạp, dập đầu xin tha, còn dâng cả của cướp được.',e:{st:15}},no:{t:'Uy áp của ngươi như gió thoảng. Cả bọn cười rồ lên rồi xông vào.',fight:{k:'sontac',n:'{$a.ten}'},win:{t:'Lần sau chúng sẽ biết sợ.',e:{st:12}}}}
 ]});

ev({id:'lo_dan_no',n:'Lò đan nổ',tg:['tran','thanh','tong','nui'],w:2,v:()=>({a:npc('tre')}),
 t:['Một tiếng nổ lớn. Khói đen bốc lên từ căn nhà gỗ ven đường. {$a.ten} chạy ra, mặt đen thui, tóc dựng đứng: “Lò… lò của ta!”','Mùi khét lẹt bay khắp phố. Một đan sư trẻ ngồi bệt giữa đống đổ nát, ôm cái lò đan nứt đôi mà khóc.'],
 c:[
  {i:'🧯',l:'Giúp dập lửa',t:'Lửa tắt. {$a.ten} cảm kích, tặng ngươi mấy viên đan còn sót lại sau vụ nổ.',e:{pill:['hoixuan','tukhi'],karma:3,an:['a','giúp dập lửa lò đan']}},
  {i:'🔍',l:'Nhặt đan dược văng ra',chk:['tp',9],ok:{t:'Ngươi nhanh tay vơ được mấy viên lăn lóc ngoài đường.',e:{pill:[1,1],karma:-2}},no:{t:'Một viên đan cháy dở nổ ngay trong tay ngươi.',e:{hp:'-15%'}}},
  {i:'🗨️',l:'Chỉ ra chỗ sai trong phối dược',chk:['ngo',11],ok:{t:'{$a.ten} sững người, rồi vỗ đùi: “Đúng rồi! Phải cho Huyết Linh Chi vào sau Cửu Diệp Thảo!” Lần luyện sau thành công, {$a.hn} chia cho ngươi một nửa.',e:{pill:'taytuy',an:['a','chỉ cách luyện đan']}},no:{t:'{$a.hn} nhìn ngươi như nhìn kẻ ngốc.'}}
 ]});

ev({id:'hon_phien',n:'Hồn phiên vô chủ',tg:['phe','hoang','ma','dong'],once:1,w:1,
 t:['Giữa bãi chiến trường cũ cắm một lá cờ đen, gió không thổi mà vẫn bay phần phật. Trên mặt cờ thêu trăm khuôn mặt người, mặt nào cũng đang nhìn ngươi.','Ngươi nghe tiếng khóc ri rỉ. Lần theo, chỉ thấy một lá hồn phiên cắm trên mỏm đá, quanh đó cỏ không mọc nổi.'],
 c:[
  {i:'✊',l:'Nhổ lấy',t:'Cán cờ lạnh như băng. Tiếng khóc im bặt, như chờ chủ nhân mới ra lệnh.',e:{relic:'honphien',karma:-8,tamma:8}},
  {i:'🔥',l:'Thiêu hủy, siêu độ vong hồn',fight:{k:'amhon',m:1.1},win:{t:'Lá cờ cháy rụi. Trăm luồng khói trắng bay lên, khẽ cúi đầu với ngươi rồi tan vào trời.',e:{karma:10,tv:6,tam:2}}},
  {i:'🚶',l:'Tránh xa',t:'Thứ này không nên đụng vào.'}
 ]});

ev({id:'nhan_cu',n:'Chiếc nhẫn cũ',tg:['*'],r:[0,1],once:1,w:1,
 t:['Ở sạp đồ cũ có một chiếc nhẫn sắt đen sì, giá chỉ ba đồng. Lúc ngươi chạm vào, nó khẽ ấm lên.','Đêm ấy, chiếc nhẫn sắt nhặt được ở bờ sông bỗng phát sáng mờ mờ. Có giọng ai khàn khàn vang lên trong đầu: “Ngủ lâu quá…”'],
 c:[
  {i:'💍',l:'Giữ lấy',t:'Ngươi đeo nhẫn vào tay. Từ đó, những đêm tu luyện, ngươi luôn có cảm giác có người nhìn qua vai mình, thỉnh thoảng hừ một tiếng khi ngươi vận khí sai.',e:{relic:'nhancu',flag:'nhancu'}},
  {i:'🗑️',l:'Vứt đi',t:'Đồ cũ thì có gì tốt. Ngươi ném nó xuống sông. Mặt nước gợn lên một vòng, rồi thôi.'}
 ]});
ev({id:'nhan_tinh',n:'Hồn trong nhẫn',spec:1,once:1,cond:r=>r.flags.nhancu&&r.region>=1&&r.relics.some(x=>x.u==='nhancu'),
 t:['Chiếc nhẫn cũ nóng rực lên. Lần này giọng nói ấy rõ ràng: “{$p.tt}, ta là {$lao}, ba nghìn năm trước từng đứng đầu một phương. Giờ chỉ còn tàn hồn này. Ngươi giúp ta một việc, ta giúp ngươi một đời.”'],
 c:[
  {i:'🤝',l:'Đồng ý giúp',o:[
    {w:2,t:'Lão chỉ ngươi đến một mộ cổ, lấy lại thứ lão giấu năm xưa. Đổi lại, lão truyền cho ngươi tâm pháp cả đời.',e:{skill:2,tv:12}},
    {w:1,t:'“Việc ấy” là thân thể của ngươi. Thần hồn lão tràn ra từ chiếc nhẫn, muốn đoạt xá!',fight:{k:'amhon',n:'{$lao}',m:1.3,elite:1},win:{t:'Tàn hồn tan biến. Chiếc nhẫn vỡ đôi, nhưng ký ức tu luyện của lão đọng lại trong đầu ngươi.',e:{tv:18,ngo:3,rmRelic:'nhancu'}}}]},
  {i:'🔥',l:'Luyện hóa tàn hồn',chk:['tam',12],ok:{t:'Lão gào thét rồi im bặt. Sức mạnh ba nghìn năm chảy vào kinh mạch ngươi, lạnh và đắng.',e:{tv:18,tamma:8,karma:-6,rmRelic:'nhancu'}},no:{t:'Tàn hồn phản kích, suýt nữa chiếm luôn thức hải của ngươi.',e:{hp:'-30%',tamma:6}}},
  {i:'🙏',l:'Mời lão đi đầu thai',t:'Lão im lặng rất lâu. “Ba nghìn năm… cũng mệt rồi.” Ánh sáng tắt. Chiếc nhẫn trở lại là sắt vụn, nhưng ngươi giữ nó lại.',e:{karma:8,van:3,lore:'luan_hoi'}}
 ]});

ev({id:'thu_khan',n:'Thư khẩn',tg:['tran','thanh'],w:1,v:()=>({a:npc('pham')}),
 t:['Trạm dịch hỗn loạn. Ngựa trạm chết dọc đường, mà bức thư khẩn về phủ thành phải tới trong ba ngày. Dịch thừa {$a.ten} vò đầu bứt tai.'],
 c:[
  {i:'📨',l:'Nhận đưa thư',chk:['tp',8],ok:{t:'Ba ngày ba đêm không ngủ, tới cổng phủ thì hai bàn chân ngươi rộp cả. Thư tới kịp, quan phủ thưởng linh thạch theo lệ.',e:{st:30,karma:3}},no:{t:'Ngươi tới trễ nửa ngày. Quan phủ lắc đầu, chỉ thưởng chút ít.',e:{st:8}}},
  {i:'🚶',l:'Không rảnh',t:'Việc của phàm nhân, để phàm nhân lo.'}
 ]});

ev({id:'tho_san',n:'Thợ săn đặt bẫy',tg:['rung','nui'],w:2,v:()=>({a:npc('pham')}),
 t:['Ngươi suýt giẫm phải bẫy kẹp. Gần đó, thợ săn {$a.ten} đang kéo một con hươu sừng ngọc bị thương nặng.','Một thợ săn chặn ngươi lại: “Đừng đi lối đó, ta đặt bẫy yêu thú. Mà nếu {$a.goi} rảnh, giúp ta một tay?”'],
 c:[
  {i:'🤝',l:'Giúp săn yêu thú',fight:{k:'beast'},win:{t:'{$a.ten} chia cho ngươi một nửa da thịt và yêu đan, còn chỉ cho ngươi lối tắt qua núi.',e:{st:18}}},
  {i:'🦌',l:'Mua con hươu rồi thả',cost:{st:10},t:'Con hươu nhìn ngươi một cái rồi nhảy vào rừng. Sừng ngọc của nó lấp lánh như sao.',e:{karma:5,van:2}},
  {i:'🚶',l:'Đi tiếp',t:'Ngươi gật đầu chào rồi đi.'}
 ]});

ev({id:'chay_rung',n:'Rừng thuốc cháy',tg:['rung','nui'],w:1,v:()=>({a:npc('pham')}),
 t:['Khói đen bốc lên từ thung lũng. Cả một rừng thuốc đang cháy, tiếng người kêu cứu lẫn trong tiếng lửa reo.'],
 c:[
  {i:'💧',l:'Dập lửa cứu người',cost:{mp:'50%'},t:'Ngươi dốc hết linh lực gọi mưa, lửa tắt dần. Mấy người hái thuốc quỳ xuống lạy ngươi như lạy thần.',e:{karma:10,tv:4,an:['a','cứu khỏi đám cháy']}},
  {i:'🌿',l:'Tranh thủ hái linh dược',t:'Lửa lan nhanh, ngươi vơ vội được mấy gốc linh thảo quý. Tiếng kêu cứu sau lưng nhỏ dần.',e:{pill:['tinhnguyen','hoixuan'],karma:-5}},
  {i:'🔍',l:'Tìm kẻ phóng hỏa',fight:{k:'matu'},win:{t:'Kẻ phóng hỏa là ma tu cần tro linh thảo để luyện độc. Hắn không còn cơ hội luyện nữa.',e:{karma:6,st:20}}}
 ]});

ev({id:'khach_diem',n:'Khách điếm',tg:['tran','thanh','song'],w:3,v:()=>({a:npc('tre')}),
 t:['Khách điếm ở {$pl} đông đúc. Ngươi gọi một bình rượu, ngồi bên cửa sổ nhìn mưa.','Đêm ấy ngươi nghỉ ở khách điếm. Phòng bên có tiếng đàn, réo rắt đến tận canh ba.'],
 c:[
  {i:'🛏️',l:'Nghỉ ngơi',cost:{st:5},t:'Một giấc ngủ không mộng mị. Sáng ra, người nhẹ bẫng.',e:{hp:'60%',mp:'60%'}},
  {i:'🎶',l:'Sang làm quen người đánh đàn',o:[
    {w:2,t:'Người đánh đàn là {$a.ten}. Hai người nói chuyện tới sáng, hóa ra cùng có một giấc mơ thời thơ ấu.',e:{tam:2,an:['a','nghe đàn suốt đêm']}},
    {w:1,t:'Ngươi gõ cửa, tiếng đàn tắt. Phòng trống không, chỉ có cây đàn đứt dây và một mùi hương lạ.',e:{tamma:3,relic:0}}]},
  {i:'🍶',l:'Nghe ngóng tin tức',t:'Dưới nhà, mấy tay buôn đang bàn chuyện thiên hạ. Ngươi mời một bình rượu, nghe được không ít.',e:{rumor:2,st:-2}}
 ]});

ev({id:'co_tu',n:'Cổ tự hoang',tg:['phe','nui','rung','tran'],w:2,
 t:['Ngôi cổ tự bỏ hoang, tượng Phật sứt mũi nhìn xuống với nụ cười không đổi. Trời tối rồi, ngươi đành trú lại.','Chùa không còn sư, chỉ còn tiếng gió lùa qua khung cửa. Trên bàn thờ có ai mới thắp một nén nhang, khói còn nghi ngút.'],
 c:[
  {i:'🕯️',l:'Thắp nến, tụng kinh',t:'Đêm yên ả. Gần sáng ngươi nghe tiếng chuông, mà chùa không có chuông.',e:{dao:1,tamma:-8,tam:1}},
  {i:'🔦',l:'Khám phá hậu điện',o:[{w:1,t:'Trong bóng tối có thứ đang chờ ngươi.',fight:{k:'quy'},win:{t:'Âm vật tan biến. Dưới chỗ nó đứng có một hộp gỗ.',e:{relic:0}}},{w:2,t:'Dưới bệ tượng có một ngăn bí mật, bên trong là cuốn kinh chép tay.',e:{skill:1}}]},
  {i:'😴',l:'Ngủ một giấc',o:[{w:2,t:'Ngươi ngủ một mạch tới sáng.',e:{hp:'40%'}},{w:1,t:'Nửa đêm có kẻ tới trước chỗ ngươi nằm.',fight:{},win:{t:'Ngươi ngủ tiếp tới sáng, cạnh cái xác.',e:{hp:'20%'}}}]}
 ]});

ev({id:'son_mon',n:'Tông môn tuyển đồ',tg:['tong','tran','thanh','nui'],r:[0,1],once:1,w:3,cond:r=>!r.flags.tongmon,v:()=>({a:npc('tre')}),
 t:['{$sectC} mở sơn môn thu nhận đệ tử. Thiếu niên khắp nơi nô nức kéo về, xếp hàng dài dưới chân núi. Đệ tử canh cổng {$a.ten} mặt lạnh như tiền.','Cáo thị dán khắp thành trấn: {$sectC} tuyển đồ. Ba đường vào cửa: trắc linh thạch, vấn tâm lộ, hoặc dâng lễ làm tạp dịch.'],
 c:[
  {i:'💠',l:'Thi trắc linh thạch',chk:['root',0],ok:{t:'Viên trắc linh thạch sáng rực lên. {$a.ten} sững sờ, rồi cúi đầu: “Mời {$p.sd} vào.”',e:{relic:'lenhtong',flag:'tongmon',skill:1}},no:{t:'Viên đá chỉ lóe lên mờ mờ. {$a.ten} lắc đầu: “Linh căn thế này, tông ta không thu thẳng.”',e:{tamma:3}}},
  {i:'🪜',l:'Đi vấn tâm lộ',chk:['tam',11],ok:{t:'Ba nghìn bậc thang, mỗi bậc một ảo cảnh. Tới bậc cuối, ngươi chỉ còn lại chính mình. Trưởng lão vuốt râu gật đầu.',e:{relic:'lenhtong',flag:'tongmon',tam:2}},no:{t:'Tới bậc thứ chín trăm, ngươi gục xuống, mơ thấy nỗi sợ lớn nhất đời mình. Tỉnh dậy đã ở chân núi.',e:{tamma:5}}},
  {i:'🎁',l:'Dâng lễ làm tạp dịch',cost:{st:40},t:'Ngươi gánh nước bổ củi hai năm, rảnh thì lén nghe giảng đạo. Cuối cùng cũng được ghi tên vào sổ.',e:{relic:'lenhtong',flag:'tongmon',tv:12,h:1080}}
 ]});

ev({id:'dai_bi',n:'Tông môn đại bỉ',tg:['tong','thanh'],r:[0,1,2],w:2,
 t:['{$sect} mở kỳ đại bỉ: đệ tử lên lôi đài thi đấu, người thắng được vào Tàng Kinh Các chọn một môn công pháp.','Lôi đài dựng giữa quảng trường {$sect}. Khán đài chật kín, ai cũng muốn xem thiên kiêu năm nay là ai.'],
 c:[
  {i:'🥋',l:'Ghi danh',fight:{k:'detu',m:1.15,spar:1},win:{t:'Ngươi thắng liền ba trận, tiếng hò reo vang dội. Phần thưởng là một lượt vào Tàng Kinh Các.',e:{skill:2,st:20}},lose:{t:'Ngươi thua ở trận thứ hai. Nhưng một vị trưởng lão đã nhớ mặt ngươi.',e:{tv:5}}},
  {i:'👀',l:'Đứng xem học hỏi',t:'Mỗi trận đấu là một bài học. Ngươi ghi nhớ từng chiêu.',e:{tv:6}}
 ]});

ev({id:'dau_gia',src:'ent:dauGia',n:'Hội đấu giá',tg:['thanh'],r:[0,1,2,3],w:2,
 t:['Đại hội đấu giá của Vạn Bảo Thương Hội. Món cuối cùng được bưng ra, phủ khăn đỏ. Người dẫn chương trình mỉm cười: “{$dan}, giá khởi điểm…”','Ngươi chen được vào hội đấu giá ở {$pl}. Đèn lồng vạn ngọn, người tu tiên ngồi kín ba tầng lầu.'],
 c:[
  {i:'💎',l:'Ra giá món chót',cost:{st:55},t:'Tiếng búa gõ xuống. Món đồ là của ngươi. Mấy ánh mắt hằm hằm nhìn theo.',e:{pill:'@bt',lore:'van_bao'}},
  {i:'🏺',l:'Mua một món nhỏ hơn',cost:{st:30},t:'Một món pháp bảo không ai để ý. Ngươi mua với giá hời.',e:{relic:0}},
  {i:'👀',l:'Chỉ xem',t:'Xem người ta tranh nhau, ngươi hiểu ra giá trị thật của mọi thứ trên đời.',e:{rumor:1,lore:'van_bao'}}
 ]});

ev({id:'loi_dai',n:'Lôi đài',tg:['thanh','tran'],w:2,
 t:['Lôi đài dựng giữa quảng trường, ai thắng được ba trận liền thì nhận cả hũ linh thạch. Đám đông gào thét.'],
 c:[
  {i:'🥊',l:'Lên đài',fight:{k:'human',spar:1,m:1.05},win:{t:'Ngươi giơ hũ linh thạch lên cao. Đám đông gọi tên ngươi.',e:{st:35,van:1}},lose:{t:'Ngươi bị đánh văng khỏi đài. Có người huýt sáo chế giễu.',e:{tamma:2}}},
  {i:'🎰',l:'Đặt cược',cost:{st:15},o:[{t:'Ngươi thắng cược!',e:{st:32}},{t:'Ngươi thua. Đời là vậy.'}]},
  {i:'🚶',l:'Đi qua',t:'Tiếng hò reo nhỏ dần sau lưng.'}
 ]});

ev({id:'yeu_quai_lang',n:'Thôn bị yêu quấy',tg:['tran'],r:[0,1,2],w:2,v:()=>({a:npc('pham')}),
 t:['Cả thôn treo bùa đỏ khắp cửa. {$a.ten} quỳ xuống trước mặt ngươi: “Tiên sư cứu mạng! Đêm nào cũng có người mất tích, gia súc chết khô.”','Thôn {$pl} vắng tanh giữa ban ngày. Một bà lão lén hé cửa, thì thào: “Đi đi, đêm nay nó lại tới.”'],
 c:[
  {i:'🌙',l:'Đêm nay canh gác',o:[
    {w:2,t:'Nửa đêm, gió lạnh thổi tắt mọi ngọn đèn. Nó tới.',fight:{k:'quy',m:1.1},win:{t:'Yêu vật gục ngã. Dân làng mổ lợn ăn mừng ba ngày liền.',e:{st:25,karma:8,tv:6}}},
    {w:1,t:'Thứ xuất hiện là một con hồ ly già. Nó không tấn công, chỉ dẫn ngươi tới cái giếng cuối làng. Dưới đáy giếng có ánh lửa. Hóa ra nó mới là kẻ bảo vệ thôn.',c:[
      {i:'⚔️',l:'Xuống giếng',fight:{k:'luyenthi',m:1.15},win:{t:'Tên luyện thi nhân chết dưới đáy giếng. Con hồ ly ngồi trên miệng giếng nhìn ngươi, rồi lặng lẽ bỏ đi.',e:{st:30,karma:10,tv:8}}},
      {i:'🦊',l:'Nghi ngờ con hồ ly',fight:{k:'holy'},win:{t:'Ngươi giết con hồ ly. Đêm hôm sau, lại có người mất tích.',e:{karma:-8,tamma:8}}}]}]},
  {i:'💎',l:'Đòi thù lao trước',t:'{$a.ten} gom góp được ít linh thạch, run run đưa cho ngươi. Đêm ấy, nó tới.',e:{st:12,karma:-2},fight:{k:'quy'},win:{t:'Việc đã xong. Dân làng không ăn mừng, chỉ đóng cửa im lặng.',e:{tv:5}}},
  {i:'🚶',l:'Bỏ đi',t:'Ngươi đi khỏi thôn. Đêm ấy, ngươi nằm mãi không ngủ được.',e:{tamma:4}}
 ]});

ev({id:'thuy_quy',when:{part:['toi','dem']},n:'Bến đò đêm',tg:['song'],w:2,v:()=>({a:npc('pham')}),
 t:['Lái đò {$a.ten} nhất quyết không chở ai qua sông sau giờ Dậu. “Dưới sông có thứ kéo người xuống, năm nay đã mất bảy mạng.”','Đò ra giữa dòng thì nước bỗng đen kịt. Một bàn tay trắng bệch bám lên mạn thuyền.'],
 c:[
  {i:'⚔️',l:'Diệt thủy quỷ',fight:{k:'thuyquy'},win:{t:'Mặt nước lặng dần. Lái đò quỳ lạy ngươi, nước mắt giàn giụa.',e:{karma:6,st:15}}},
  {i:'🪔',l:'Thả đèn cầu siêu',chk:['tam',9],ok:{t:'Ngọn đèn hoa sen trôi đi. Mặt nước lặng dần. Từ đó bến đò không còn ai chết đuối.',e:{karma:8,tam:1}},no:{t:'Đèn bị một bàn tay dìm xuống. Nó không muốn đi.',fight:{k:'thuyquy'},win:{t:'Nó đi rồi. Lần này thì thật.',e:{karma:4}}}},
  {i:'🏊',l:'Tìm chỗ khác qua sông',chk:['tp',8],ok:{t:'Ngươi tìm được chỗ cạn, lội qua an toàn.'},no:{t:'Nước xiết hơn ngươi tưởng. Ngươi bị cuốn đi mấy dặm mới bám được vào bờ.',e:{hp:'-15%'}}}
 ]});

ev({id:'hoa_bi',n:'Cô dâu mới',tg:['tran','thanh'],r:[0,1,2,3],w:1,
 t:['Nhà phú hộ trong trấn vừa cưới vợ ba. Từ đó, cứ cách mấy đêm lại có gia nhân chết, tim bị moi mất.','Ngươi đi ngang một nhà giàu, thấy yêu khí lẩn khuất trên mái ngói. Cô dâu mới đứng tựa cửa sổ, nhìn ngươi cười.'],
 c:[
  {i:'🔍',l:'Điều tra',chk:['ngo',10],ok:{t:'Ngươi tìm thấy tấm da người treo trong tủ. Đêm ấy, cô dâu không có da để mặc.',fight:{k:'hoabi'},win:{t:'Họa bì cháy thành tro. Nhà phú hộ tạ ơn hậu hĩnh.',e:{karma:8,st:30,relic:0}}},no:{t:'Ngươi không tìm ra gì. Đêm ấy, chính ngươi suýt bị moi tim.',fight:{k:'hoabi',m:1.2},win:{t:'Nguy hiểm thật. Ngươi chạm tay lên ngực, tim vẫn còn đập.',e:{karma:6,st:15}}}},
  {i:'🚶',l:'Không xen vào',t:'Chuyện nhà người ta. Nhưng nụ cười ấy đi theo ngươi vào giấc ngủ.',e:{tamma:2}}
 ]});

ev({id:'lao_ngu',n:'Cá chép vàng',tg:['song','bien'],w:1,v:()=>({a:npc('gia')}),
 t:['Ông lão đánh cá kéo lưới lên, trong lưới là một con cá chép vàng to bằng đứa trẻ, mắt rưng rưng như người khóc.'],
 c:[
  {i:'💎',l:'Mua lại rồi thả',cost:{st:15},t:'Ngươi thả cá xuống sông. Nó quẫy đuôi ba lần như lạy rồi lặn mất. Đêm ấy, có viên ngọc trai sáng rực đặt ở đầu giường ngươi.',e:{relic:0,karma:5,van:2}},
  {i:'🍲',l:'Mua về nấu',cost:{st:10},t:'Thịt cá ngọt như mật, ăn vào nóng rực cả người. Nửa đêm, ngươi mơ thấy có ai đứng khóc ở cửa.',e:{hpP:4,tv:6,karma:-3}},
  {i:'🚶',l:'Đi qua',t:'Ông lão xách con cá ra chợ. Ngươi không ngoảnh lại.'}
 ]});

ev({id:'chuong_xac',when:{part:['dem']},n:'Chuông dẫn xác',tg:['hoang','phe','rung'],w:1,
 t:['Tiếng chuông lắc leng keng giữa đêm. Một đoàn xác chết dán bùa vàng nhảy cò cò trên đường, dẫn đầu là một đạo sĩ áo đen.','Trên cành cây khô treo một chiếc chuông đồng nhỏ, gió thổi lại kêu. Dưới gốc cây là bảy cái xác không tên.'],
 c:[
  {i:'🙇',l:'Nhường đường',t:'Đạo sĩ cản thi gật đầu cảm ơn. Đoàn xác đi qua, mùi đất ẩm thoảng lại rất lâu.',e:{van:1}},
  {i:'⚔️',l:'Chặn lại xem xét',fight:{k:'luyenthi'},win:{t:'Hóa ra đây là luyện thi nhân bắt người sống luyện thi. Ngươi chôn cất bảy cái xác.',e:{karma:6,st:20}}},
  {i:'🔔',l:'Lấy cái chuông',t:'Chuông nằm trong tay ngươi, không còn kêu nữa. Nhưng đêm nào ngươi cũng nghe thấy nó.',e:{relic:0,tamma:4}}
 ]});

ev({id:'cho_que',n:'Con chó vàng',tg:['tran'],w:1,
 t:['Một con chó vàng cứ lẽo đẽo theo ngươi từ đầu trấn tới cuối trấn. Ngươi dừng, nó dừng. Ngươi đi, nó đi.'],
 c:[
  {i:'🍖',l:'Mua cho nó cái bánh',cost:{st:2},t:'Nó vẫy đuôi ăn hết, rồi chạy biến. Hôm sau, ngươi nhặt được một túi linh thạch ai đánh rơi ngay chỗ nó nằm.',e:{van:2,st:10}},
  {i:'🚶',l:'Đuổi đi',t:'Nó cụp đuôi bỏ đi. Ngươi thấy hơi áy náy.'}
 ]});

ev({id:'hoi_den',when:{season:['xuan']},n:'Hội hoa đăng',tg:['tran','thanh','song'],w:1,
 t:['{$pl} mở hội hoa đăng. Trẻ con chạy khắp phố, đèn giấy thả trôi trên sông như một dải ngân hà nhỏ.'],
 c:[
  {i:'🏮',l:'Thả một ngọn đèn',t:'Ngươi viết lên đèn một cái tên. Đèn trôi đi. Lòng nhẹ hẳn.',e:{tamma:-10,tam:1}},
  {i:'🍡',l:'Ăn uống thỏa thích',cost:{st:5},t:'Bánh trôi, kẹo hồ lô, rượu nếp. Lâu lắm rồi ngươi mới thấy mình là người.',e:{hp:'50%',van:1}}
 ]});

ev({id:'thu_nha',n:'Thư nhà',tg:['*'],r:[0,1],once:1,w:1,
 t:['Một con hạc giấy bay tới đậu trên vai ngươi. Thư từ {$que}.'],
 c:[
  {i:'📜',l:'Đọc thư',o:[
    {w:2,t:'Thư viết: ở nhà vẫn ổn, năm nay được mùa, đừng lo. Cuối thư có vẽ một bông hoa xiêu vẹo.',e:{tam:2,tamma:-8}},
    {w:1,t:'Thư báo tin người thân của ngươi đã mất từ mùa thu. Ngươi đọc đi đọc lại ba lần. Rồi ngươi ngồi xuống, rất lâu.',e:{tamma:6,tam:2,tv:5}}]},
  {i:'🔥',l:'Đốt đi không đọc',t:'Đã bước lên tiên lộ, không quay đầu. Tro giấy bay theo gió.',e:{tam:1,tamma:3}}
 ]});

ev({id:'xin_lam_do',n:'Đứa trẻ xin bái sư',tg:['tran','thanh'],w:1,v:()=>({a:npc('hai')}),
 t:['{$a.ten}, một đứa trẻ {$a.look}, đòi bái ngươi làm sư phụ. Quỳ trước cửa ba ngày không chịu đứng dậy.'],
 c:[
  {i:'🧑‍🏫',l:'Nhận làm đệ tử',t:'Nửa năm dạy nó luyện khí. Lúc chia tay, nó khóc như mưa, hứa sau này nổi danh sẽ đi tìm ngươi.',e:{karma:4,tam:2,h:288,an:['a','nhận làm đệ tử']}},
  {i:'🍚',l:'Cho ít tiền rồi khuyên về',cost:{st:5},t:'Nó cầm tiền, cúi đầu đi. Có lẽ làm phàm nhân yên ổn cũng là một cái phúc.',e:{karma:1}},
  {i:'😠',l:'Mắng cho về',t:'Nó đứng dậy, mắt đỏ hoe. Ngươi biết nó sẽ không quên ngày hôm nay.',e:{oan:['a','đuổi đi như đuổi chó']}}
 ]});

ev({id:'hoa_su',n:'Họa sư',tg:['tran','thanh','song','nui'],w:1,v:()=>({a:npc('tre')}),
 t:['Một họa sư {$a.look} xin vẽ chân dung ngươi. “{$a.goi} có tướng lạ, {$a.xung} vẽ không lấy tiền.”'],
 c:[
  {i:'🖼️',l:'Ngồi làm mẫu',t:'Bức họa giống đến kỳ lạ, chỉ có đôi mắt là già hơn ngươi. Họa sư nói người trong tranh sau này sẽ nổi danh. Ngươi cười.',e:{van:1,tam:1}},
  {i:'🚶',l:'Từ chối',t:'Ngươi không muốn lưu lại dấu vết gì ở thế gian này.'}
 ]});

ev({id:'tuyet_son',when:{season:['dong']},n:'Người ngồi trong tuyết',tg:['nui'],w:1,
 t:['Trên đỉnh núi tuyết có người ngồi thiền, tuyết phủ tới vai. Người dưới núi nói người ấy đã ngồi đó ba năm.'],
 c:[
  {i:'🧘',l:'Ngồi xuống bên cạnh',t:'Ngươi ngồi một năm. Tuyết phủ lên vai ngươi. Ngày ngươi đứng dậy, người kia cũng mở mắt, khẽ gật đầu với ngươi, rồi đi xuống núi.',e:{dao:2,tv:14,tam:2,h:720}},
  {i:'🔥',l:'Đốt lửa sưởi cho người ấy',t:'Ngọn lửa cháy tới sáng. Người ấy không động đậy, nhưng tuyết trên vai đã tan.',e:{karma:3,tamma:-5}}
 ]});

ev({id:'ga_quay',n:'Tranh nhau con gà',tg:['tran','thanh'],w:1,v:()=>({a:npc('tre'),b:npc('tre')}),
 t:['Giữa chợ, hai tu sĩ Trúc Cơ đánh nhau tới bụi mù chỉ vì một con gà quay. Con gà vẫn nằm trên mẹt, bốc khói thơm lừng.'],
 c:[
  {i:'🍗',l:'Lấy con gà rồi chạy',chk:['tp',9],ok:{t:'Lúc hai người nhận ra thì ngươi đã ngồi gặm đùi gà ở đầu phố bên kia. Ngon thật.',e:{hp:'20%',van:1}},no:{t:'Hai người cùng dừng tay, cùng quay sang ngươi.',fight:{k:'tantu',n:'{$a.ten}'},win:{t:'Ngươi ăn con gà trước mặt cả hai.',e:{hp:'20%'}}}},
  {i:'⚖️',l:'Đứng ra phân xử',chk:['ngo',9],ok:{t:'Ngươi chia đôi con gà, mỗi người một nửa, rồi thu phí phân xử. Cả hai cùng chửi ngươi, nhưng cùng trả tiền.',e:{st:10}},no:{t:'Hai người cùng bảo ngươi lo chuyện bao đồng.',e:{tamma:1}}}
 ]});

// ================= SỰ KIỆN 2: TÔNG MÔN, ĐÔNG HẢI, MA VỰC, THIÊN LỘ =================
ev({id:'bat_nat',n:'Ức hiếp tạp dịch',tg:['tong'],w:2,v:()=>({a:npc('tre'),b:npc('nam')}),
 t:['Sau bếp tông môn, mấy đệ tử ngoại môn đang vây đánh một tạp dịch gầy gò. Kẻ cầm đầu là {$b.ten}, cháu một vị trưởng lão.','{$a.ten} quỳ giữa sân, đầu đội chậu nước. {$b.ten} đứng cạnh cười cợt: “Rơi một giọt, đánh một roi.”'],
 c:[
  {i:'✋',l:'Can ngăn',fight:{k:'detu',n:'{$b.ten}'},win:{t:'{$b.ten} ôm mặt bỏ chạy, buông một câu: “Ngươi chờ đấy!” {$a.ten} lén nhìn ngươi, mắt sáng lên như sao.',e:{karma:6,an:['a','cứu khỏi trận đòn'],oan:['b','đánh cho mất mặt']}}},
  {i:'🗨️',l:'Lấy danh nghĩa sư huynh quát lui',req:r=>r.flags.tongmon,chk:['tam',9],ok:{t:'Ngươi chỉ đứng đó, giơ lệnh bài lên. Cả đám tản đi như chim vỡ tổ.',e:{karma:5,an:['a','giải vây']}},no:{t:'Chúng cười vào mặt ngươi. “Sư huynh nào? Ta chưa nghe tên.”',fight:{k:'detu',n:'{$b.ten}'},win:{t:'Giờ thì chúng nghe tên rồi.',e:{karma:4}}}},
  {i:'😶',l:'Làm ngơ',t:'Ngươi đi qua. Tiếng roi vụt đuổi theo một quãng dài.',e:{tamma:3}}
 ]});

ev({id:'duoc_vien',n:'Dược viên',tg:['tong','nui'],w:2,
 t:['Dược viên của {$sect} trải dài sườn núi, linh thảo trăm năm mọc như cỏ. Người canh vườn là một lão già đang ngủ gật.','Mùi thuốc thơm ngát. Ngươi đứng trước hàng rào trúc của dược viên {$sect}, bên trong có con hạc trắng đang mổ cỏ.'],
 c:[
  {i:'🌿',l:'Lén hái',chk:['tp',11],ok:{t:'Ngươi vào ra như gió. Trong túi đã có mấy gốc linh thảo thượng hạng.',e:{pill:['tinhnguyen','taytuy'],karma:-4}},no:{t:'Lão già mở mắt. Hóa ra lão chỉ giả ngủ.',fight:{k:'votang',n:'Lão canh vườn',m:1.1},win:{t:'Ngươi chạy thoát, trên tay còn kịp nhổ một gốc.',e:{pill:1,karma:-4}}}},
  {i:'🧑‍🌾',l:'Xin làm thuê',t:'Nửa năm nhổ cỏ tưới cây, ngươi học được cách phân biệt trăm loại linh thảo. Lão canh vườn trả công bằng thuốc.',e:{st:20,pill:'hoixuan',tv:5,h:288}},
  {i:'🚶',l:'Đi qua',t:'Con hạc ngẩng đầu nhìn ngươi, rồi lại cúi xuống mổ cỏ.'}
 ]});

ev({id:'tang_kinh',n:'Tàng Kinh Các',tg:['tong'],w:2,
 t:['Tàng Kinh Các bảy tầng, mỗi tầng một cấm chế. Lão nhân quét sân trước cửa không ngẩng đầu: “Muốn vào, trả giá.”'],
 c:[
  {i:'💎',l:'Nộp phí xem sách',cost:{st:35},chk:['ngo',10],ok:{t:'Giữa vạn quyển sách, ngươi tìm được đúng quyển dành cho mình.',e:{skill:2}},no:{t:'Đọc mỏi mắt, ngươi chỉ hiểu được một quyển tầm thường.',e:{skill:1}}},
  {i:'🧹',l:'Giúp lão quét sân',o:[{w:2,t:'Ba tháng quét sân. Ngày cuối, lão đưa ngươi một cuốn sách bìa đã bong: “Thứ này để ở tầng một chẳng ai đọc.”',e:{skill:2,tam:1,h:216}},{w:1,t:'Lão chẳng nói gì. Nhưng ngươi quét sân lâu ngày, tâm bỗng tĩnh như mặt nước.',e:{tam:3,h:216}}]},
  {i:'🌙',l:'Lẻn vào ban đêm',chk:['tp',12],ok:{t:'Ngươi chép vội một quyển rồi chuồn ra trước khi trời sáng.',e:{skill:2,karma:-3}},no:{t:'Cấm chế réo lên như chuông. Đệ tử tuần đêm ập tới.',fight:{k:'detu',m:1.2},win:{t:'Ngươi chạy thoát, tay trắng.',e:{karma:-3}}}}
 ]});

ev({id:'luan_dao',n:'Luận đạo',tg:['tong','nui','thanh'],w:2,v:()=>({a:npc('dao')}),
 t:['Trên đài luận đạo, {$a.ten} đặt câu hỏi cho đám hậu bối: “Tu tiên, rốt cuộc là tu cái gì?”','Một lão đạo chặn ngươi giữa đường, không đánh mà hỏi: “Tu tiên, rốt cuộc là tu cái gì?”'],
 c:[
  {i:'⚔️',l:'“Tu sức mạnh. Không có sức mạnh, đạo chỉ là lời nói.”',t:'{$a.ten} gật gù: “Thẳng thắn. Nhưng cẩn thận, sức mạnh không có đáy.”',e:{atkP:5}},
  {i:'🪷',l:'“Tu cái tâm. Tâm không vững, tiên cũng thành ma.”',t:'{$a.hn} mỉm cười: “Nói thì dễ. Giữ được mới khó.”',e:{tam:3}},
  {i:'🌫️',l:'“Không biết. Nên mới phải tu.”',t:'{$a.hn} cười lớn: “Hay cho câu không biết!”',e:{dao:1,ngo:2,tv:4}},
  {i:'🤐',l:'Im lặng',t:'{$a.hn} nhìn ngươi một lúc rồi bỏ đi. Có lẽ im lặng cũng là một câu trả lời.',e:{tamma:-6}}
 ]});

ev({id:'kiem_trung',n:'Kiếm trủng',tg:['nui','phe','thien'],r:[1,2,4],once:1,w:2,
 t:['Cả một ngọn núi cắm đầy kiếm. Kiếm gỉ, kiếm gãy, kiếm còn sáng loáng. Gió thổi qua, ngàn thanh kiếm cùng ngân lên như khóc.'],
 c:[
  {i:'🗡️',l:'Để kiếm chọn người',chk:['tam',12],ok:{t:'Một thanh kiếm gãy tự rút mình khỏi đá, bay tới đặt vào tay ngươi.',e:{dao:2,relic:'kiemgay',lore:'kiem_trung'}},no:{t:'Kiếm ý ngàn năm ập tới như thác. Ngươi bị đánh văng ra ngoài.',e:{hp:'-20%',lore:'kiem_trung'}}},
  {i:'✊',l:'Nhổ một thanh',fight:{k:'kiemlinh'},win:{t:'Kiếm hồn tan đi. Thanh kiếm nằm im trong tay ngươi, nặng trĩu.',e:{relic:1,lore:'kiem_trung'}}},
  {i:'🙇',l:'Vái rồi đi',t:'Ngàn thanh kiếm cùng im lặng khi ngươi cúi đầu.',e:{tam:1,lore:'kiem_trung'}}
 ]});

ev({id:'linh_mach',n:'Mạch linh thạch',tg:['nui','dong'],w:2,
 t:['Vách hang lấp lánh ánh xanh: một mạch linh thạch lộ thiên! Nhưng trên vách có dấu ấn của {$sect}.'],
 c:[
  {i:'⛏️',l:'Khai thác lén',chk:['tp',10],ok:{t:'Ngươi đào suốt đêm, túi trữ vật nặng trĩu.',e:{st:50,karma:-3}},no:{t:'Đệ tử tuần núi phát hiện ra ngươi.',fight:{k:'detu'},win:{t:'Ngươi mang được nửa số đã đào.',e:{st:25}}}},
  {i:'📮',l:'Báo cho {$sect}',t:'Tông môn thưởng cho ngươi một phần theo lệ, còn ghi tên ngươi vào sổ khách quý.',e:{st:20,karma:3}},
  {i:'🧘',l:'Ngồi tu luyện cạnh mạch',t:'Linh khí đặc quánh. Ngươi ngồi nửa năm, như ngồi trong lò luyện.',e:{tv:12,h:360}}
 ]});

ev({id:'tran_co',n:'Trận đồ cổ',tg:['phe','dong','tong'],w:2,
 t:['Mặt đất khắc trận đồ chằng chịt, ở giữa là một hộp ngọc. Ở rìa trận có ba bộ xương, tư thế như đang chạy.'],
 c:[
  {i:'🔯',l:'Giải trận',chk:['ngo',12],ok:{t:'Ngươi bước theo đúng ba mươi sáu bước. Trận đồ tắt dần. Hộp ngọc là của ngươi.',e:{relic:1,ngo:1}},no:{t:'Bước thứ bảy sai. Trận đồ bùng lên, thiêu cháy nửa vạt áo ngươi.',e:{hp:'-30%'}}},
  {i:'💥',l:'Phá trận bằng sức',cost:{mp:'60%'},t:'Trận đồ vỡ. Hộp ngọc cũng vỡ theo, chỉ còn một thứ sót lại bên trong.',e:{relic:0,hp:'-10%'}},
  {i:'🚶',l:'Đi vòng',t:'Ba bộ xương kia đã là đủ cảnh báo.'}
 ]});

ev({id:'dao_lu',n:'Đạo lữ',tg:['*'],r:[1,2,3],once:1,w:1,cond:r=>!r.flags.daolu,v:r=>({a:npc(r.g==='nam'?'nu':'nam')}),
 t:['Đã ba lần ngươi gặp {$a.ten} trên đường. Lần này, {$a.hn} không giả vờ tình cờ nữa: “Đường tiên dài lắm. Đi cùng nhau, được không?”','Sau trận chiến, {$a.ten} băng bó vết thương cho ngươi. Tay {$a.hn} run run: “Ta không muốn thấy ngươi bị thương nữa.”'],
 c:[
  {i:'❤️',l:'Nhận lời kết làm đạo lữ',t:'Hai người cùng thắt một sợi dây đỏ. Từ hôm ấy, đường xa bớt lạnh.',e:{relic:'dongtam',flag:'daolu',tam:2}},
  {i:'🌫️',l:'Từ chối',t:'{$a.hn} cười buồn, quay lưng đi. Ngươi không gọi lại.',e:{tam:1}}
 ]});

ev({id:'bi_vu_oan',n:'Bị vu oan',tg:['tong'],cond:r=>r.flags.tongmon,w:2,v:()=>({a:npc('nam')}),
 t:['Trưởng lão triệu ngươi tới: kho đan dược mất trộm, có người khai thấy ngươi đêm đó. Sư huynh {$a.ten} đứng bên cạnh, khóe miệng khẽ nhếch.'],
 c:[
  {i:'🗣️',l:'Tự biện hộ',chk:['ngo',11],ok:{t:'Ngươi chỉ ra vết tro trên giày {$a.ten}, thứ tro chỉ có trong kho đan. Trưởng lão biến sắc, phạt hắn ba năm diện bích, bồi thường cho ngươi.',e:{karma:2,st:25,oan:['a','vạch mặt trước trưởng lão']}},no:{t:'Không ai tin ngươi. Ngươi bị phạt nộp linh thạch và quét tàng kinh các ba tháng.',e:{st:'-30%',tamma:6}}},
  {i:'⚔️',l:'Thách đấu sinh tử',fight:{k:'detu',n:'{$a.ten}',m:1.2},win:{t:'{$a.ten} quỳ xuống nhận tội. Trưởng lão thở dài, nhìn ngươi bằng ánh mắt khác.',e:{tamma:-5,tv:8}}}
 ]});

ev({id:'luyen_khi',n:'Lò rèn pháp bảo',tg:['tong','thanh','nui'],r:[1,2,3],w:1,v:()=>({a:npc('gia')}),
 t:['Lò rèn đỏ rực giữa sườn núi. {$a.ten}, luyện khí sư nổi tiếng khó tính, đang dùng búa đập lên một miếng sắt đen. “Muốn ta luyện gì cho ngươi?”'],
 c:[
  {i:'🔨',l:'Nhờ luyện một món',cost:{st:45},o:[{w:3,t:'Bảy ngày bảy đêm. {$a.hn} nhúng món đồ vào nước, hơi trắng bốc lên. “Cầm lấy. Đừng làm mất.”',e:{relic:1}},{w:1,t:'Lò nổ. {$a.hn} chửi ầm lên, trả lại nửa tiền.',e:{st:20}}]},
  {i:'🪨',l:'Phụ việc kiếm chút kinh nghiệm',t:'Ngươi kéo bễ ba tháng, hiểu ra lửa cũng có tính khí như người.',e:{defP:4,h:216}}
 ]});

// ----- Đông Hải -----
ev({id:'ngu_nhan',n:'Ngư nhân đổi hàng',tg:['bien','song'],w:2,
 t:['Một nhóm ngư nhân trồi lên bên mạn đá, trong tay là những viên trân châu to bằng quả trứng. Chúng chỉ vào túi trữ vật của ngươi, kêu ríu rít.'],
 c:[
  {i:'🤝',l:'Trao đổi',cost:{st:20},t:'Đổi được một viên ngọc và mấy gói thuốc biển. Ngư nhân vui vẻ lặn mất.',e:{relic:0,pill:1}},
  {i:'⚔️',l:'Cướp',fight:{k:'ngunhan'},win:{t:'Ngươi gom hết trân châu. Mặt biển im lặng một cách đáng sợ.',e:{st:40,karma:-5}}},
  {i:'🎁',l:'Tặng quà làm quen',cost:{st:10},t:'Ngư nhân nhận quà, vẫy đuôi chào. Từ đó, sóng biển quanh ngươi êm hơn một chút.',e:{van:2,karma:3,flag:'ngunhan'}}
 ]});

ev({id:'dao_hoang',n:'Khói trên đảo hoang',tg:['bien'],w:2,v:()=>({a:npc('tre')}),
 t:['Trên đảo hoang có khói bốc lên. Ai đó đang đốt lửa cầu cứu.'],
 c:[
  {i:'⛵',l:'Ghé vào',o:[{w:2,t:'Là {$a.ten}, một tu sĩ đắm thuyền, mắc kẹt đã ba năm. {$a.hn} mừng phát khóc, tặng ngươi toàn bộ tài sản còn lại.',e:{st:35,karma:4,an:['a','cứu khỏi đảo hoang']}},{w:1,t:'Lửa là bẫy. Hải tặc từ trong rừng ùa ra.',fight:{k:'sontac',m:1.1},win:{t:'Sào huyệt hải tặc còn đầy của cải.',e:{st:40}}}]},
  {i:'🚶',l:'Đi tiếp',t:'Biển rộng, ai cũng phải tự cứu mình.'}
 ]});

ev({id:'hai_thi',n:'Hải thị thận lâu',tg:['bien','hoang'],w:1,
 t:['Trên mặt biển hiện ra một tòa thành, lầu son gác tía, người đi lại tấp nập. Hải thị thận lâu! Người ta nói trong đó mua được những thứ không tồn tại.'],
 c:[
  {i:'🏯',l:'Đi vào',o:[{w:2,t:'Ngươi mua được một thứ kỳ lạ từ một người không có mặt.',e:{relic:2}},{w:2,t:'Thành biến mất khi ngươi chạm tới cổng. Ngươi đứng giữa biển, nước tới ngực.',e:{hp:'-10%'}},{w:1,t:'Ngươi ở trong thành tưởng một ngày. Ra ngoài, ba năm đã qua.',e:{h:1080,tv:15}}]},
  {i:'🚶',l:'Ngắm từ xa',t:'Tòa thành tan vào sương sớm. Ngươi không chắc mình đã thấy gì.',e:{tamma:-3}}
 ]});

ev({id:'bao_bien',n:'Bão biển',tg:['bien'],w:2,
 t:['Mây đen ập tới như bức tường. Sóng cao mười trượng, thuyền ngươi như chiếc lá.'],
 c:[
  {i:'🌀',l:'Dùng linh lực chống bão',cost:{mp:'60%'},t:'Ngươi đứng ở mũi thuyền, hai tay đẩy ra. Sóng rẽ đôi. Ba ngày sau trời quang, ngươi gầy rộc nhưng tâm cảnh vững hơn.',e:{tv:8}},
  {i:'🏝️',l:'Để sóng đẩy vào đảo',o:[{t:'Ngươi dạt vào một hòn đảo lạ, cát trắng như muối.',fight:{},win:{t:'Chủ đảo không mời mà tới. Giờ thì đảo không còn chủ.',e:{st:20}}},{t:'Trên đảo có một rương gỗ mục, bên trong là đồ của ai đó.',e:{relic:0}}]},
  {i:'🙏',l:'Cầu Long Vương',chk:['van',10],ok:{t:'Bão tan đột ngột như chưa từng có. Một con cá voi trắng nổi lên, phun nước ba lần rồi lặn.',e:{van:1,lore:'long_cung'}},no:{t:'Long Vương không nghe. Thuyền vỡ, ngươi bơi ba ngày mới vào bờ.',e:{hp:'-25%'}}}
 ]});

ev({id:'long_cung',n:'Long cung chìm',tg:['bien','dong'],r:[2],once:1,w:2,
 t:['Đêm biển lặng, ngươi nghe tiếng chuông vọng lên từ đáy biển. Lặn xuống trăm trượng, một cung điện san hô hiện ra trong bóng tối.'],
 c:[
  {i:'🐉',l:'Vào chính điện',fight:{k:'giao',elite:1,m:1.1},win:{t:'Con giao canh điện gục xuống. Trên ngai rồng có một tấm vảy to bằng cái mâm.',e:{relic:'longlan',lore:'long_cung',tv:10}}},
  {i:'🔔',l:'Tìm cái chuông',chk:['ngo',12],ok:{t:'Chiếc chuông đồng treo ở tháp cao nhất. Ngươi gõ một tiếng. Trong đầu vang lên một bài pháp quyết cổ xưa.',e:{lore:'long_cung',skill:3,tam:2}},no:{t:'Ngươi lạc trong mê cung san hô, suýt chết đuối.',e:{lore:'long_cung',hp:'-20%'}}},
  {i:'🌊',l:'Nổi lên',t:'Có những thứ nên để yên dưới đáy biển.',e:{lore:'long_cung'}}
 ]});

ev({id:'yeu_toc',src:'road',n:'Yêu tộc chặn đường',tg:['bien','rung','hoang'],r:[2,3,4],w:2,v:()=>({a:npc('yeu')}),
 t:['Một đoàn yêu tộc hóa hình chặn đường. Kẻ cầm đầu là {$a.ten}, {$a.look}: “Người tu tiên, đất này của yêu tộc. Nộp mãi lộ, hoặc nộp mạng.”'],
 c:[
  {i:'💎',l:'Nộp',cost:{st:30},t:'{$a.ten} nhận, phẩy tay. Đoàn yêu tộc rẽ ra hai bên.'},
  {i:'⚔️',l:'Đánh',fight:{k:'beast',elite:1,n:'{$a.ten}'},win:{t:'Thủ lĩnh ngã, cả đoàn yêu tộc lùi vào rừng.',e:{st:30}}},
  {i:'🗣️',l:'Thuyết phục',chk:['ngo',12],ok:{t:'Ngươi kể về Ngũ Tổ, về hòa ước ba nghìn năm giữa người và yêu. {$a.ten} nheo mắt, rồi tránh đường.',e:{flag:'yeutoc',van:2,lore:'ngu_to'}},no:{t:'“Người các ngươi nói hay lắm.” {$a.ten} nhe nanh.',fight:{k:'beast',n:'{$a.ten}'},win:{t:'Lần này ngươi nói bằng nắm đấm.',e:{st:15}}}}
 ]});

ev({id:'trai_ngoc',n:'Trai ngàn năm',tg:['bien','song'],w:2,
 t:['Con trai khổng lồ nằm dưới đáy đầm, vỏ hé mở, ánh sáng từ viên ngọc bên trong hắt lên như trăng.'],
 c:[
  {i:'✋',l:'Thò tay lấy ngọc',chk:['tp',11],ok:{t:'Nhanh như cắt. Viên ngọc to bằng nắm tay nằm gọn trong lòng bàn tay ngươi.',e:{relic:0,st:20}},no:{t:'Vỏ trai sập lại như hàm cá sấu.',e:{hp:'-25%'}}},
  {i:'🗡️',l:'Cạy vỏ',fight:{k:'quy'},win:{t:'Vỏ trai bị cạy toang. Ngọc là của ngươi.',e:{relic:0}}},
  {i:'🚶',l:'Để yên',t:'Nghìn năm mới có một viên ngọc. Để nó tiếp tục sáng.',e:{karma:2}}
 ]});

ev({id:'thuyen_ma',when:{part:['dem']},n:'Thuyền ma',tg:['bien'],w:1,v:()=>({}),
 t:['Một chiếc thuyền buồm rách trôi tới trong sương. Không người lái, nhưng đèn trên boong vẫn sáng.'],
 c:[
  {i:'🕯️',l:'Lên thuyền',o:[{w:2,t:'Cả đoàn thủy thủ vẫn còn đó, chỉ là không còn thịt.',fight:{k:'kholau'},win:{t:'Khoang thuyền đầy hàng hóa trăm năm trước.',e:{st:40,relic:0}}},{w:1,t:'Trên thuyền chỉ có một bức thư chưa gửi, đề tên một người ở {$que}. Ngươi cất đi.',e:{tam:2,karma:3}}]},
  {i:'🔥',l:'Đốt thuyền',t:'Lửa bùng lên trong sương. Có tiếng thở phào rất khẽ.',e:{karma:3}},
  {i:'🚶',l:'Tránh xa',t:'Chiếc thuyền trôi qua, đèn trên boong tắt dần.'}
 ]});

ev({id:'hang_bang',n:'Hang băng',tg:['dong','song','bien','nui'],r:[1,2],w:1,
 t:['Hang băng sâu hun hút, vách băng trong suốt như pha lê. Bên trong đông cứng cả một đàn cá to như người, con nào cũng mở mắt.'],
 c:[
  {i:'⛏️',l:'Đục lấy lõi hàn tinh',o:[{w:2,t:'Lõi hàn tinh lạnh buốt, cầm trên tay mà tê dại.',e:{relic:0,hp:'-10%'}},{w:1,t:'Băng nứt. Một con cá đột nhiên quẫy đuôi.',fight:{k:'beast'},win:{t:'Hang băng lại im lặng.',e:{relic:0}}}]},
  {i:'🧘',l:'Tu luyện trong hang',t:'Hàn khí rèn kinh mạch. Chịu được thì tiến bộ thần tốc.',e:{tv:12,mpP:3,h:360}}
 ]});

// ----- Ma Vực -----
ev({id:'quy_thi',when:{part:['dem']},n:'Quỷ thị',tg:['ma','thanh','phe'],r:[3,4],w:2,
 t:['Quỷ thị mở lúc canh ba. Người bán đeo mặt nạ giấy, người mua không có bóng. Ở đây không ai lấy linh thạch, chỉ lấy năm tháng.'],
 c:[
  {i:'⏳',l:'Đổi thọ nguyên lấy công pháp',t:'Ngươi thấy mình già đi một chút. Trong tay là một quyển sách viết bằng mực đen.',e:{lifeCut:8,skill:3,lore:'quy_thi'}},
  {i:'⏳',l:'Đổi thọ nguyên lấy đan dược',t:'Kẻ đeo mặt nạ cười khanh khách, đếm năm tháng của ngươi như đếm tiền.',e:{lifeCut:5,pill:['taytuy','phacanh'],lore:'quy_thi'}},
  {i:'👀',l:'Chỉ xem',t:'Ngươi thấy một người đổi hết thọ nguyên lấy một bình rượu, uống xong rồi chết ngay tại sạp. Hắn cười.',e:{lore:'quy_thi'}}
 ]});

ev({id:'huyet_tri',n:'Huyết trì',tg:['ma'],w:2,
 t:['Huyết trì sôi lục bục, mùi tanh nồng nặc. Ma tu đồn rằng tắm trong đó một đêm, công lực tăng gấp bội.'],
 c:[
  {i:'🩸',l:'Ngâm mình',t:'Máu nóng như dung nham, chui vào từng lỗ chân lông. Sáng ra, ngươi mạnh lên thấy rõ. Và khát.',e:{atkP:10,hpP:8,karma:-10,tamma:12}},
  {i:'🔥',l:'Thanh tẩy huyết trì',fight:{k:'oanlinh',m:1.15},win:{t:'Huyết trì cạn dần, lộ ra đáy toàn xương trắng. Ngươi chôn cất từng mảnh.',e:{karma:10,tv:10}}},
  {i:'🚶',l:'Đi tiếp',t:'Thứ sức mạnh ấy, ngươi không cần.'}
 ]});

ev({id:'tu_binh',n:'Tù binh chính đạo',tg:['ma','phe','dong'],w:2,v:()=>({a:npc('tre')}),
 t:['Trong lồng sắt treo trên vách đá là {$a.ten}, đệ tử {$sectC}. Hai tên ma tu canh gác đang uống rượu, cười đùa chuyện ngày mai mổ bụng lấy đan.'],
 c:[
  {i:'⚔️',l:'Cứu người',fight:{k:'matu',elite:1},win:{t:'{$a.ten} được thả ra, quỳ xuống trước mặt ngươi. “Mạng này là của ân nhân.”',e:{karma:8,st:20,an:['a','cứu khỏi lồng sắt ma tu']}}},
  {i:'🌙',l:'Lén mở lồng',chk:['tp',12],ok:{t:'Hai tên canh say mềm. Ngươi mở khóa, cõng người chạy suốt đêm.',e:{karma:8,an:['a','cứu khỏi lồng sắt ma tu']}},no:{t:'Then cửa kêu cót két.',fight:{k:'matu'},win:{t:'Người đã được cứu. Ngươi mệt lả.',e:{karma:6,an:['a','cứu khỏi lồng sắt ma tu']}}}},
  {i:'🚶',l:'Mặc kệ',t:'Ngươi đi qua. Tiếng kêu cứu bị gió cuốn đi.',e:{tamma:5}}
 ]});

ev({id:'van_thi',n:'Hố vạn thi',tg:['ma','hoang'],w:2,
 t:['Hố thi chất xác cao như núi, ruồi bay đen trời. Giữa đống xác có thứ gì đó phát sáng.'],
 c:[
  {i:'🔍',l:'Xuống lấy',fight:{k:'cuongthi'},win:{t:'Thứ phát sáng là một món pháp bảo, nằm trong tay một cái xác không chịu buông.',e:{relic:1}}},
  {i:'🔥',l:'Hỏa táng',cost:{mp:'50%'},t:'Lửa cháy ba ngày ba đêm. Khói đen bay lên, rồi trắng dần.',e:{karma:8,tamma:-8}},
  {i:'🚶',l:'Bịt mũi đi qua',t:'Mùi tử khí bám vào áo ngươi suốt mấy ngày.'}
 ]});

ev({id:'tam_kinh',n:'Gương đồng',tg:['ma','phe','thien'],once:1,w:2,
 t:['Giữa đại điện đổ nát có một tấm gương đồng to bằng cánh cửa. Người trong gương giống ngươi như đúc, chỉ khác là nó đang cười.'],
 c:[
  {i:'🪞',l:'Nhìn thẳng vào gương',fight:{k:'tamma'},win:{t:'Người trong gương ngừng cười. Rồi nó cúi đầu, và gương trở lại là gương.',e:{relic:'tamkinh',tamma:-30,lore:'tam_ma'}}},
  {i:'🔨',l:'Đập vỡ',t:'Gương vỡ, nhưng tiếng cười còn vang trong đầu ngươi nhiều ngày.',e:{tamma:8,hp:'-10%'}},
  {i:'🙈',l:'Không nhìn',t:'Ngươi đi qua, mắt nhìn xuống đất.'}
 ]});

ev({id:'ma_chung',n:'Hạt giống đen',tg:['ma','thanh','hoang'],r:[2,3,4],w:2,v:()=>({a:npc('ma')}),
 t:['{$a.ten}, {$a.look}, ngồi chờ ngươi ở ngã ba. {$a.hn} chìa ra một hạt giống đen bóng: “Gieo vào đan điền, ngươi sẽ mạnh lên gấp mười. Cái giá à? Rồi ngươi sẽ biết.”'],
 c:[
  {i:'🖤',l:'Nhận',t:'Hạt giống chui vào bụng ngươi như con rắn nhỏ. Sức mạnh dâng lên. Và có tiếng thì thầm rất khẽ.',e:{atkP:15,defP:10,karma:-15,tamma:20}},
  {i:'⚔️',l:'Giết hắn',fight:{k:'matu',elite:1,n:'{$a.ten}'},win:{t:'Hạt giống rơi xuống đất, mọc thành một cây gai đen rồi khô héo.',e:{karma:6,tv:8}}},
  {i:'🚶',l:'Từ chối',t:'“Ngươi sẽ quay lại.” Giọng {$a.hn} đuổi theo ngươi.'}
 ]});

ev({id:'nai_ha',n:'Sông không bờ',tg:['ma','hoang'],r:[3,4],once:1,w:2,
 t:['Dòng sông đen ngòm không thấy bờ bên kia. Người lái đò đội nón lá, mặt chìm trong bóng tối. “Qua sông, phải để lại một thứ.”'],
 c:[
  {i:'🧠',l:'Để lại một ký ức',t:'Ngươi quên mất một chuyện. Không biết chuyện gì. Chỉ thấy lòng nhẹ hơn.',e:{tamma:-25,ngo:-1}},
  {i:'💎',l:'Để lại tiền',cost:{st:40},t:'Người lái đò cầm lấy, không nói gì. Bờ bên kia hiện ra.'},
  {i:'⏳',l:'Để lại năm tháng',t:'Ngươi thấy tóc mình bạc đi vài sợi. Bờ bên kia có hoa nở đỏ rực.',e:{lifeCut:6,tv:8}}
 ]});

ev({id:'ma_tu_xin_tha',n:'Ma tu xin tha',tg:['ma','hoang','phe'],w:2,v:()=>({a:npc('ma')}),
 t:['{$a.ten} bị thương nặng, quỳ trước mặt ngươi, dập đầu lia lịa: “Tha cho ta! Ta có vợ con! Ta sẽ nói chỗ giấu bảo vật!”'],
 c:[
  {i:'🕊️',l:'Tha',o:[{w:2,t:'{$a.hn} giữ lời. Chỗ giấu có một món pháp bảo.',e:{karma:5,relic:0}},{w:1,t:'Ngươi vừa quay lưng, một con dao găm đã cắm vào vai.',e:{hp:'-15%'},fight:{k:'matu',n:'{$a.ten}'},win:{t:'Lần này ngươi không quay lưng nữa.',e:{tamma:3}}}]},
  {i:'🗡️',l:'Trừ ma',t:'Ma tu là ma tu. Ngươi không để lời van xin làm mềm tay.',e:{karma:2,tv:6,st:15}},
  {i:'❓',l:'Tra hỏi trước',chk:['ngo',10],ok:{t:'Ngươi bắt {$a.hn} dẫn tới tận nơi rồi mới quyết.',e:{relic:0,st:20}},no:{t:'{$a.hn} nói dối. Ngươi biết, nhưng quá muộn. {$a.hn} đã chạy.'}}
 ]});

// ----- Thiên lộ -----
ev({id:'tinh_ha',n:'Sông sao',tg:['thien'],w:2,
 t:['Dải ngân hà chảy ngang lối đi như một dòng suối. Trong nước là sao thật, mỗi ngôi to bằng nắm tay.'],
 c:[
  {i:'✋',l:'Vớt một ngôi sao',chk:['tam',12],ok:{t:'Ngôi sao nằm trong tay ngươi, ấm như trái tim.',e:{relic:2}},no:{t:'Sao nóng như mặt trời. Tay ngươi bỏng rộp.',e:{hp:'-25%'}}},
  {i:'🧘',l:'Ngồi bên bờ quan sát',t:'Ngươi nhìn sao trôi. Mỗi ngôi sao là một con đường. Ngươi hiểu ra vài điều.',e:{dao:2,tv:14,ngo:2,h:360}},
  {i:'🚶',l:'Bước qua',t:'Nước sao lạnh buốt tới tận xương.'}
 ]});

ev({id:'di_thue',n:'Di thuế tiên nhân',tg:['thien','phe'],w:2,
 t:['Một bộ xác ngồi xếp bằng trên đài ngọc, da thịt vẫn hồng hào. Tiên nhân di thuế: thân xác tiên nhân bỏ lại khi phi thăng.'],
 c:[
  {i:'🙇',l:'Bái lạy',t:'Ngươi lạy ba lạy. Khóe môi bộ xác dường như khẽ cong lên.',e:{tam:3,van:2,lore:'tien_khu'}},
  {i:'✋',l:'Lấy pháp bảo trên người',fight:{k:'khoiloi',elite:1},win:{t:'Khôi lỗi canh giữ đổ sập. Pháp bảo của tiên nhân là của ngươi.',e:{relic:2,karma:-3}}},
  {i:'🧘',l:'Tham ngộ đạo vận còn sót',chk:['ngo',13],ok:{t:'Đạo vận chảy vào thức hải như nước tràn đê.',e:{dao:2,tv:20,skill:4}},no:{t:'Đạo vận quá lớn. Đầu ngươi như sắp nổ tung.',e:{tamma:10,hp:'-15%'}}}
 ]});

ev({id:'thien_van',n:'Thiên đạo hỏi',tg:['thien'],once:1,w:3,
 t:['Một giọng nói không đến từ đâu cả vang lên trong đầu ngươi: “Nếu được làm lại, ngươi có chọn tu tiên nữa không?”'],
 c:[
  {i:'✅',l:'“Có.”',t:'Thiên đạo im lặng. Ngươi coi như đó là đồng ý.',e:{dao:3,tam:5,tv:8}},
  {i:'❌',l:'“Không.”',t:'Một tiếng cười rất khẽ. “Thành thật đấy.”',e:{tamma:-30,van:3}},
  {i:'🌫️',l:'“Ta không nhớ mình đã từng chọn.”',t:'Một thoáng im lặng. Rồi ngươi nghe như có tiếng thở dài.',e:{ngo:3,lore:'luan_hoi'}}
 ]});

ev({id:'hu_khong',n:'Khe nứt hư không',tg:['thien','hoang'],w:2,
 t:['Không gian trước mặt nứt toác như mặt gương vỡ. Bên kia khe nứt là bóng tối, trong bóng tối có thứ gì đó lấp lánh.'],
 c:[
  {i:'🌌',l:'Thò tay vào',o:[{w:2,t:'Ngươi rút ra một thứ không thuộc về thế giới này.',e:{dao:2,relic:2,lore:'hu_khong'}},{w:1,t:'Thứ lấp lánh ấy có răng.',fight:{k:'trung',elite:1},win:{t:'Hư không trùng chết, để lại thứ nó đang giữ.',e:{relic:1,lore:'hu_khong'}}},{w:1,t:'Thời gian bên trong trôi khác. Ngươi rút tay ra, tóc đã bạc thêm.',e:{hp:'-30%',h:216,lore:'hu_khong'}}]},
  {i:'🚶',l:'Tránh xa',t:'Khe nứt khép lại sau lưng ngươi, như một con mắt nhắm.',e:{lore:'hu_khong'}}
 ]});

ev({id:'tien_khu',n:'Tiên khư',tg:['thien','phe'],r:[3,4],w:2,
 t:['Một tòa cung điện rơi từ thượng giới, cắm nghiêng xuống mây. Cửa chính đã vỡ, bên trong tối om.'],
 c:[
  {i:'🏛️',l:'Đi vào',o:[{w:2,t:'Khôi lỗi canh điện vẫn còn hoạt động.',fight:{k:'khoiloi'},win:{t:'Trong điện có một rương ngọc.',e:{dao:3,relic:1,lore:'tien_khu'}}},{w:1,t:'Bên trong chỉ có một tấm bia: “Thứ ta vứt đi, ngươi đừng nhặt.” Ngươi nghe lời.',e:{tam:3,lore:'tien_khu'}}]},
  {i:'🚶',l:'Đi tiếp',t:'Tiên nhân vứt đi, chắc gì đã là thứ tốt.'}
 ]});

ev({id:'co_nhan_mong',n:'Giấc mơ kiếp trước',tg:['*'],r:[2,3,4],w:1,cond:()=>G.meta.lives.length>0,v:()=>({g:G.meta.lives[0]}),
 t:['Đêm ấy ngươi mơ thấy mình là {$g.ten}, chết năm {$g.tuoi} tuổi. Tỉnh dậy, gối ướt đẫm mà không nhớ vì sao.','Ngươi chợt nhớ một cái tên chưa từng nghe: {$g.ten}. Rồi nhớ cả cảm giác lúc chết. Tay ngươi run lên.'],
 c:[
  {i:'🧘',l:'Lần theo ký ức',chk:['ngo',11],ok:{t:'Ký ức kiếp trước trải ra như một cuộn tranh. Những chiêu thức cũ trở về trong tay ngươi.',e:{tv:12,lore:'luan_hoi'}},no:{t:'Ký ức vỡ vụn, cắt vào tâm trí như mảnh sứ.',e:{tamma:6}}},
  {i:'🌫️',l:'Buông xuống',t:'Kiếp trước là kiếp trước. Ngươi rửa mặt, đi tiếp.',e:{tam:2}}
 ]});

// ----- Thiên kiêu -----
ev({id:'thien_kieu',src:'ent:thienkieu',n:'Gặp thiên kiêu',tg:['*'],r:[0,1,2,3,4],w:2,cond:r=>r.rivals.some(x=>x.alive),
 v:r=>{const al=r.rivals.filter(x=>x.alive);const rv=pick(al);const m=clamp(1.05+(rv.realm-r.realm)*0.45,0.85,1.8);return {rv:rivalView(rv),rvi:rv.i,rvm:m};},
 t:['Trên đường có người chặn lại. {$rv.ten}, {$rv.tt} của {$rv.sect}, cảnh giới {$rv.realm}. “Nghe nói gần đây có kẻ khá lắm. Là ngươi?”','Ngươi dừng chân bên suối thì thấy {$rv.ten} đang rửa kiếm. {$rv.hn} ngẩng lên, ánh mắt sắc như dao: “Ngươi là ai?”','Cả quán rượu im bặt khi {$rv.ten} bước vào. {$rv.tt} của {$rv.sect}. {$rv.hn} nhìn quanh, rồi ngồi xuống đúng bàn của ngươi.'],
 c:[
  {i:'⚔️',l:'Luận võ',fight:{k:'kiemtu',n:'{$rv.ten}',mv:'rvm',spar:1,sub:'{$rv.tt} {$rv.sect}'},win:{t:'Thiên kiêu bại dưới tay ngươi. {$rv.ten} im lặng hồi lâu, rồi cười: “Nhớ tên ngươi rồi.”',e:{tv:10,van:2,rival:1}},lose:{t:'{$rv.ten} thu chiêu: “Còn non lắm.” Nhưng ánh mắt {$rv.hn} đã khác.',e:{tv:5}}},
  {i:'🍵',l:'Kết giao',chk:['tam',10],ok:{t:'Hai người nói chuyện tới khuya, từ kiếm pháp tới chuyện nhà. Lúc chia tay, {$rv.hn} tặng ngươi một viên đan.',e:{rival:1,pill:1}},no:{t:'{$rv.ten} lạnh nhạt đứng dậy: “Ta không kết giao với kẻ vô danh.”',e:{tamma:2}}},
  {i:'🙇',l:'Tránh mặt',t:'Ngươi cúi đầu đi qua. Thiên kiêu không thèm nhìn ngươi lấy một cái.'}
 ]});

// ----- Đặc biệt -----
ev({id:'mo_kiep_truoc',n:'Nấm mộ quen',spec:1,cond:()=>false,v:r=>{const n=nodeById(r.at);return {g:n.grave||{ten:'vô danh',tuoi:'?'},gnode:n.id};},
 t:['Giữa rừng thông có một nấm mộ nhỏ, bia gỗ đã mục. Ngươi cúi xuống đọc: “{$g.ten}, hưởng dương {$g.tuoi} tuổi.” Tay ngươi run lên. Cái tên ấy, ngươi biết. Ngươi đã từng là người đó.','Ngươi dừng lại trước một nấm mồ hoang mà chẳng hiểu vì sao. Cỏ mọc kín, bia ghi tên {$g.ten}. Đêm qua ngươi mơ thấy đúng cái tên này.'],
 c:[
  {i:'🙏',l:'Thắp hương',t:'Khói hương bay thẳng lên trời. Ngươi có cảm giác ai đó đang mỉm cười.',e:{tam:3,tamma:-10,van:2,lore:'luan_hoi'}},
  {i:'⛏️',l:'Đào lên',t:'Trong quan tài chỉ còn bộ xương và vài thứ tùy thân. Ngươi cầm lên, thấy quen như của chính mình.',e:{graveItems:1,relic:'mocu',st:10,karma:-2,lore:'luan_hoi'}}
 ]});

ev({id:'no_kiep_truoc',src:'ent:truysat',n:'Nợ kiếp trước',spec:1,cond:()=>!!W().nemesis,
 v:()=>{const k=W().nemesis;return {k:k.n,kk:k.k==='boss'||!EN[k.k]?'kiemtu':k.k,ki:k.i,km:1.25+0.15*(k.lv||1)};},
 t:['Ngươi gặp {$k} lần đầu tiên trong kiếp này, vậy mà tim lại đập thình thịch như gặp kẻ thù truyền kiếp. Một mảnh ký ức lóe lên: máu, đau, và khuôn mặt này.','Giấc mơ đêm nào cũng lặp lại: ngươi chết dưới tay một kẻ. Hôm nay, kẻ đó đang đứng trước mặt ngươi. {$k}.'],
 c:[
  {i:'⚔️',l:'Báo thù kiếp trước',fight:{n:'{$k}',mv:'km',elite:1,nem:1},win:{t:'Nợ cũ đã trả. Ngươi thấy nhẹ hẳn, như vừa đặt xuống một gánh nặng mang từ đời trước.',e:{tv:10,tamma:-15,ach:'baothu',relic:1,nemDone:1}}},
  {i:'🌫️',l:'Buông bỏ',t:'Kiếp trước là kiếp trước. Ngươi quay đi. {$k} nhìn theo, không hiểu vì sao lại thấy lạnh gáy.',e:{tam:3,tamma:-5}}
 ]});

ev({id:'bao_an',n:'Người cũ báo ân',spec:1,cond:r=>r.seeds.some(s=>s.t==='an'&&(s.r<r.region||G.meta.world.t-(s.at||0)>=HM)),
 v:r=>{const i=r.seeds.findIndex(s=>s.t==='an'&&(s.r<r.region||G.meta.world.t-(s.at||0)>=HM));const s=r.seeds.splice(i,1)[0];return {s};},
 t:['Có người gọi tên ngươi từ phía sau. Quay lại, ngươi mất một lúc mới nhận ra: {$s.ten}, người ngươi từng {$s.d} năm nào. Giờ {$s.hn} đã khác xưa nhiều.','Một đoàn người dừng lại trước mặt ngươi. Kẻ dẫn đầu xuống ngựa, cúi đầu thật thấp: “Còn nhớ {$s.ten} không? Ơn {$s.d} năm ấy, hôm nay xin trả.”'],
 c:[
  {i:'🤝',l:'Nhận tấm lòng',t:'{$s.ten} kể đã tu luyện ra sao, đã qua những gì. Lúc chia tay, {$s.hn} nhất quyết để lại một món quà.',e:{relic:1,pill:1,tv:6,ach:'baoan'}},
  {i:'🍶',l:'Chỉ uống một chén rượu',t:'Hai người cạn chén. Ngươi không nhận gì cả. {$s.ten} nhìn ngươi rất lâu, rồi cười.',e:{tam:3,van:3,tamma:-8,ach:'baoan'}}
 ]});

ev({id:'bao_oan',src:'ent:truysat',n:'Kẻ thù cũ',spec:1,cond:r=>r.seeds.some(s=>s.t==='oan'&&(s.r<r.region||G.meta.world.t-(s.at||0)>=HM)),
 v:r=>{const i=r.seeds.findIndex(s=>s.t==='oan'&&(s.r<r.region||G.meta.world.t-(s.at||0)>=HM));const s=r.seeds.splice(i,1)[0];return {s};},
 t:['{$s.ten}. Ngươi suýt không nhận ra. Gương mặt ấy giờ đầy sẹo, ánh mắt chỉ còn hận thù. “Nhớ ta không? Năm ấy ngươi {$s.d}.”','Có kẻ đã chờ ngươi rất lâu. {$s.ten}, người năm xưa bị ngươi {$s.d}, giờ đứng chắn giữa đường, binh khí đã tuốt khỏi vỏ.'],
 c:[
  {i:'⚔️',l:'Ứng chiến',fight:{k:'tantu',n:'{$s.ten}',m:1.2,elite:1},win:{t:'Ngươi thắng. Nhưng ánh mắt lúc ngã xuống của {$s.ten} khiến ngươi mất ngủ nhiều đêm.',e:{tamma:5,tv:8}}},
  {i:'🙇',l:'Xin lỗi',chk:['tam',12],ok:{t:'{$s.ten} sững người. Rất lâu sau, {$s.hn} quay đi, không nói một lời.',e:{tamma:-15,karma:8}},no:{t:'“Xin lỗi?” {$s.ten} cười như khóc. “Muộn rồi.”',fight:{k:'tantu',n:'{$s.ten}',m:1.2},win:{t:'Một mối nợ đã trả bằng máu.',e:{tamma:4}}}}
 ]});

ev({id:'tam_ma_xam',n:'Tâm ma',spec:1,cond:r=>r.tamma>=45,
 t:['Đêm ấy ngươi mơ thấy chính mình đứng cười ở cuối giường. “Mệt không?” Nó hỏi. “Để ta làm thay cho.”','Đang đi, bóng của ngươi bỗng dừng lại, dù ngươi vẫn bước tiếp.'],
 c:[
  {i:'⚔️',l:'Đối diện tâm ma',fight:{k:'tamma'},win:{t:'Nó tan đi như khói. Ngươi đứng một mình giữa đêm, lòng sáng như gương.',e:{tamma:-40,tam:3,tv:8,lore:'tam_ma'}}},
  {i:'🧘',l:'Tụng tĩnh tâm chú',chk:['tam',12],ok:{t:'Câu chú lặp đi lặp lại, cho tới khi tiếng cười kia nhỏ dần rồi tắt.',e:{tamma:-20}},no:{t:'Càng tụng, tiếng cười càng to.',e:{tamma:10,hp:'-15%'}}},
  {i:'🌑',l:'Thuận theo nó',t:'Một luồng sức mạnh lạnh lẽo tràn vào kinh mạch. Dễ chịu tới đáng sợ.',e:{atkP:10,tamma:15,karma:-10}}
 ],
 force:[{i:'⚔️',l:'Đối diện tâm ma',fight:{k:'tamma'},win:{t:'Ngươi đánh bại chính mình. Tâm ma tan đi, để lại một khoảng trống yên tĩnh lạ lùng.',e:{tamma:-60,tam:4,lore:'tam_ma'}}}]
});

// ================= SỰ KIỆN 3: THỰC THỂ, ĐÊM, MÙA, CỐ NHÂN =================
// ----- Thương đội -----
ev({id:'td_mua',src:'ent:thuong',n:'Thương đội dừng chân',tg:['*'],w:3,v:()=>({a:npc('thuong')}),
 t:['Tiếng chuông lạc đà leng keng. {$en} dừng lại bên đường, {$a.ten} vẫy tay gọi ngươi: “{$a.goi}, xem hàng không? Rẻ hơn trong thành.”','Đoàn xe của {$en} nghỉ chân dưới gốc cây. Hàng hóa bày ra trên tấm vải bạt, có cả thứ ngươi chưa thấy bao giờ.'],
 c:[{i:'🏪',l:'Xem hàng',t:'{$a.ten} mở từng hòm, vừa mở vừa kể lai lịch từng món.',e:{shop:1}},
    {i:'🚶',l:'Chào rồi đi tiếp',t:'Ngươi gật đầu chào. Đoàn xe lại lục tục lên đường.'}]});
ev({id:'td_hotong',src:'ent:thuong',n:'Thuê hộ tống',tg:['*'],w:2,v:()=>({a:npc('thuong')}),
 t:['{$a.ten}, chủ {$en}, chặn ngươi lại: “Đoạn đường trước mặt có cướp. Đi cùng chúng ta một quãng, trả công hậu hĩnh.”'],
 c:[{i:'🛡️',l:'Nhận lời',o:[{w:3,t:'Một ngày một đêm, không có chuyện gì. {$a.ten} trả đủ công, còn dúi thêm một viên đan.',e:{h:24,st:22,pill:1,an:['a','hộ tống qua đoạn đường nguy hiểm']}},
    {w:2,t:'Đúng như lời đồn, bọn cướp xông ra giữa đường.',fight:{k:'sontac',cnt:2},win:{t:'Bọn cướp tháo chạy. {$a.ten} vái ngươi ba vái, trả gấp đôi tiền công.',e:{st:40,karma:4,an:['a','đánh lui bọn cướp']}}}]},
    {i:'✋',l:'Từ chối',t:'Ngươi lắc đầu. {$a.ten} thở dài, cho đoàn xe đi vòng.'}]});
ev({id:'td_tin',src:'ent:thuong',n:'Tin từ phương xa',tg:['*'],w:2,v:()=>({a:npc('thuong')}),
 t:['Người dắt lạc đà của {$en} là kẻ lắm mồm. Chưa hỏi đã kể, kể không ngừng.'],
 c:[{i:'🍵',l:'Mời một chén trà, nghe kể',cost:{st:2},t:'Gã kể chuyện khắp nơi, thật có giả có.',e:{rumor:2,h:1}},
    {i:'🚶',l:'Bỏ đi',t:'Ngươi đi tiếp, sau lưng vẫn còn tiếng gã kể.'}]});
ev({id:'td_doi',src:'ent:thuong',n:'Đổi hàng',tg:['*'],w:2,v:()=>({a:npc('thuong')}),
 t:['{$a.ten} để mắt tới túi trữ vật của ngươi: “Có đan dược dư không? Ta đổi linh thạch, giá tốt.”'],
 c:[{i:'⚖️',l:'Đổi một viên đan lấy linh thạch',req:r=>r.pills.length>0,t:'Gã soi viên đan dưới nắng, gật gù rồi trả tiền.',e:{st:30,dropPill:1}},
    {i:'💬',l:'Mặc cả đủ thứ',chk:['van',10],ok:{t:'Mặc cả một hồi, gã tặng thêm ngươi một món cho xong chuyện.',e:{pill:1}},no:{t:'Gã cười: “{$a.goi} ăn nói khéo thật, nhưng ta không ngu.”'}},
    {i:'🚶',l:'Không đổi',t:'Ngươi lắc đầu.'}]});
ev({id:'td_lua',src:'ent:thuong',n:'Món hàng lạ',tg:['*'],w:1,v:()=>({a:npc('thuong')}),
 t:['{$a.ten} lén kéo ngươi ra sau xe, mở một hộp gỗ: “Đồ thượng cổ, chỉ bán cho người có duyên.”'],
 c:[{i:'💎',l:'Mua',cost:{st:30},o:[{w:1,t:'Đồ thật. Ngươi không ngờ vận may lại tới dễ như vậy.',e:{relic:1}},{w:2,t:'Về tới chỗ nghỉ mới biết là đồ giả, sơn còn chưa khô.',e:{tamma:3}}]},
    {i:'👁️',l:'Soi kỹ',chk:['ngo',11],ok:{t:'Ngươi chỉ ra chỗ giả. Gã đỏ mặt, đành tặng ngươi một viên đan để bịt miệng.',e:{pill:1}},no:{t:'Ngươi không nhìn ra gì. Gã cất hộp đi, mặt hơi tiếc.'}},
    {i:'🚶',l:'Bỏ đi',t:'Đồ tốt không ai bán sau xe ngựa.'}]});
ev({id:'td_nan',src:'ent:thuong',n:'Thương đội bị yêu thú vây',tg:['*'],w:1,v:()=>({a:npc('thuong')}),
 t:['Tiếng ngựa hí thất thanh. {$en} bị một bầy yêu thú vây giữa đường, hộ vệ đã ngã mấy người.'],
 c:[{i:'⚔️',l:'Xông vào cứu',fight:{k:'beast',cnt:2},win:{t:'Bầy thú tan tác. {$a.ten} quỳ xuống cảm tạ, dâng cả túi linh thạch.',e:{st:35,karma:6,an:['a','cứu khỏi bầy yêu thú']}}},
    {i:'🚶',l:'Đứng xa nhìn',t:'Ngươi không xen vào. Lúc ngươi đi, tiếng kêu cứu đã tắt.',e:{tamma:4,karma:-2}}]});
// ----- Khách qua đường (người thường, không buôn bán) -----
ev({id:'kh_hoiduong',src:'ent:khach',n:'Hỏi đường',tg:['*'],w:3,v:()=>({a:npc('pham')}),
 t:['{$en} đứng bên ngã ba, tay cầm tấm bản đồ rách. Thấy ngươi, {$a.hn} mừng rỡ: “{$a.goi}, đường nào ra trấn gần nhất?”','Một bóng người từ trong bụi bước ra, là {$en}. {$a.hn} lúng túng chắp tay hỏi đường.'],
 c:[{i:'👉',l:'Chỉ đường cho tử tế',t:'{$a.ten} cảm ơn rối rít, còn kể cho ngươi nghe chuyện vừa thấy dọc đường.',e:{rumor:1,karma:2}},
    {i:'🤷',l:'Bảo không biết',t:'Ngươi lắc đầu rồi đi tiếp. Sau lưng, {$a.hn} vẫn xoay xoay tấm bản đồ.'}]});
ev({id:'kh_chung',src:'ent:khach',n:'Đi chung một quãng',tg:['*'],w:3,v:()=>({a:npc('pham')}),
 t:['{$en} đi cùng hướng với ngươi. Đường dài, {$a.hn} bắt chuyện cho đỡ buồn.','Trời sắp tối. {$en} đề nghị đốt chung một đống lửa bên đường cho đỡ sợ thú dữ.'],
 c:[{i:'🔥',l:'Ngồi cùng nghỉ chân',t:'Hai người chia nhau miếng lương khô. {$a.ten} kể chuyện quê nhà, ngươi nghe mà lòng nhẹ đi.',e:{h:6,tamma:-3,an:['a','cùng nghỉ chân bên đường']}},
    {i:'🚶',l:'Đi trước một mình',t:'Ngươi chào rồi rảo bước. Tu tiên vốn là đường một người.'}]});
ev({id:'kh_benh',src:'ent:khach',n:'Người ốm bên đường',tg:['*'],w:2,v:()=>({a:npc('gia')}),
 t:['{$en} ngồi gục dưới gốc cây, mặt tái mét, thở không ra hơi.'],
 c:[{i:'💊',l:'Cho một viên đan',req:r=>r.pills.length>0,t:'Một lúc sau {$a.ten} hồng hào trở lại, run run lạy ngươi một lạy.',e:{dropPill:1,karma:6,an:['a','cứu mạng giữa đường']}},
    {i:'🤲',l:'Truyền chút chân khí',cost:{mp:8},t:'Chân khí ấm áp chạy vào kinh mạch người phàm. {$a.ten} đỡ hẳn, cảm kích không thôi.',e:{karma:4,an:['a','truyền chân khí cứu giúp']}},
    {i:'🚶',l:'Đi qua',t:'Ngươi không dừng lại. Đi được một quãng vẫn còn nghe tiếng ho khan.',e:{tamma:2}}]});
ev({id:'kh_cuop',src:'ent:khach',n:'Kẻ cướp đường',tg:['*'],w:1,v:()=>({a:npc('pham')}),
 t:['{$en} trông hiền lành, nhưng vừa tới gần đã rút dao, sau bụi còn hai tên đồng bọn nhảy ra.'],
 c:[{i:'⚔️',l:'Ra tay',fight:{k:'sontac',cnt:2},win:{t:'Bọn chúng chạy mất dép, bỏ lại túi tiền cướp được.',e:{st:18}}},
    {i:'💨',l:'Lách người bỏ đi',chk:['tp',9],ok:{t:'Ngươi lướt qua như gió. Bọn chúng còn chưa kịp nhìn rõ mặt.'},no:{t:'Không thoát được, đành bỏ ra ít linh thạch cho xong chuyện.',e:{st:-8}}}]});
ev({id:'kh_vat',src:'ent:khach',n:'Đồ đánh rơi',tg:['*'],w:2,v:()=>({a:npc('pham')}),
 t:['Trên đường có một cái túi vải. Phía trước chừng trăm bước, {$en} đang lật đật tìm kiếm thứ gì.'],
 c:[{i:'🤝',l:'Trả lại',t:'{$a.ten} mừng như bắt được vàng, nhất quyết biếu ngươi chút lộ phí.',e:{st:6,karma:5}},
    {i:'👜',l:'Giữ lấy',t:'Trong túi có ít bạc vụn và một lá thư nhà. Ngươi lặng lẽ rẽ sang lối khác.',e:{st:10,karma:-5}}]});
ev({id:'kh_dam',src:'ent:khach',n:'Đàm đạo',tg:['*'],w:2,v:()=>({a:npc('dao')}),
 t:['{$en} ngồi nghỉ trên tảng đá, thấy ngươi liền mỉm cười: “{$a.goi} cũng là người tu hành? Ngồi đây nói chuyện một lát.”'],
 c:[{i:'🍵',l:'Ngồi luận đạo',chk:['ngo',10],ok:{t:'Một câu nói vu vơ của {$a.ten} chạm đúng chỗ ngươi đang vướng. Chân khí trong người thông suốt hẳn.',e:{tv:4,h:3}},no:{t:'Hai người nói chuyện trời đất, không thu được gì nhưng lòng thấy thư thái.',e:{tamma:-2,h:3}}},
    {i:'🙏',l:'Chắp tay rồi đi',t:'Ngươi cúi chào. {$a.ten} gật đầu, lại nhắm mắt như ngủ.'}]});
// ----- Thú triều -----
ev({id:'tt_chan',src:'ent:thutrieu',n:'Thú triều ập tới',tg:['*'],w:3,
 t:['Mặt đất rung lên. {$en} tràn tới như nước vỡ bờ, mắt đỏ rực, nhắm thẳng hướng thôn trấn gần nhất.','Bụi mù che kín trời. {$en} đang lao qua, cây cối đổ rạp theo từng bước chạy.'],
 c:[{i:'⚔️',l:'Chặn thú triều lại',fight:{k:'beast',cnt:3},win:{t:'Con đầu đàn ngã xuống, cả bầy tan rã. Thôn trấn phía sau sẽ không bao giờ biết mình vừa thoát nạn.',e:{entGone:1,tv:8,karma:8,st:20}}},
    {i:'🏃',l:'Tránh đường',t:'Ngươi nép vào vách đá cho tới khi bầy thú chạy qua. Phía trước có ai đó sẽ không may.',e:{tamma:3}}]});
ev({id:'tt_vua',src:'ent:thutrieu',n:'Thú vương dẫn đàn',tg:['*'],w:2,
 t:['Giữa {$en} có một con thú to gấp ba con khác, sừng như cây khô. Nó dừng lại, nhìn ngươi.'],
 c:[{i:'⚔️',l:'Giết con đầu đàn',fight:{k:'beast',cnt:2,elite:1,m:1.1},win:{t:'Thú vương gục xuống. Bầy thú hoảng loạn, chạy về núi.',e:{entGone:1,tv:12,relic:0}}},
    {i:'👁️',l:'Nhìn thẳng vào mắt nó',chk:['tam',12],ok:{t:'Rất lâu sau, thú vương quay đầu. Cả bầy theo nó rút về rừng.',e:{entGone:1,tam:1,karma:4}},no:{t:'Nó gầm lên, lao tới.',fight:{k:'beast',cnt:3},win:{t:'Ngươi đứng giữa xác thú, thở dốc.',e:{entGone:1,tv:8}}}},
    {i:'🏃',l:'Lùi lại',t:'Ngươi lùi từng bước. Nó không đuổi theo.'}]});
ev({id:'tt_dan',src:'ent:thutrieu',n:'Dân chạy loạn',tg:['*'],w:2,v:()=>({a:npc('pham')}),
 t:['Một đoàn người già trẻ chạy ngược lại, gánh gồng lỉnh kỉnh. {$a.ten} hét lên: “Thú triều! Chạy đi!”'],
 c:[{i:'🤲',l:'Hộ tống dân chạy nạn',t:'Ngươi dẫn họ đi đường tắt qua núi. Đi tới đâu, người ta lạy tới đó.',e:{h:12,karma:8,an:['a','cứu cả nhà khỏi thú triều']}},
    {i:'⚔️',l:'Quay lại chặn thú',fight:{k:'beast',cnt:3},win:{t:'Ngươi chặn được thú triều. Đám dân quay lại, mang theo rượu và gà.',e:{entGone:1,tv:8,karma:6,st:15}}},
    {i:'🚶',l:'Mặc kệ',t:'Ngươi đi tiếp. Tiếng trẻ con khóc mãi sau lưng.',e:{tamma:3}}]});
ev({id:'tt_bay',src:'ent:thutrieu',n:'Đặt bẫy trước thú triều',tg:['*'],w:2,
 t:['{$en} còn cách nửa ngày đường. Đủ thời gian cho một kẻ biết làm bẫy.'],
 c:[{i:'🪤',l:'Bày trận bẫy',chk:['ngo',11],ok:{t:'Bầy thú lao vào hố chông, con trước đè con sau. Phần còn lại tan tác.',e:{entGone:1,tv:6,st:25,h:6}},no:{t:'Bẫy sụp quá sớm. Bầy thú vòng qua, lao về phía ngươi.',fight:{k:'beast',cnt:2},win:{t:'Đánh tan được cả đàn, mệt muốn đứt hơi.',e:{entGone:1,tv:6}}}},
    {i:'🚶',l:'Bỏ đi',t:'Một mình ngươi không ngăn nổi trời.'}]});
ev({id:'tt_cuu',src:'ent:thutrieu',n:'Đứa trẻ giữa đường',tg:['*'],w:1,v:()=>({a:npc('hai')}),
 t:['{$en} sắp tràn qua. Giữa đường có một đứa trẻ ngồi khóc, {$a.look}.'],
 c:[{i:'🤲',l:'Ôm đứa trẻ chạy',chk:['tp',10],ok:{t:'Ngươi chạy như bay, bầy thú sượt qua sau lưng. Đứa bé ôm cổ ngươi không buông.',e:{karma:10,an:['a','cứu giữa thú triều']}},no:{t:'Chậm một bước. Bầy thú cắn xé, ngươi che cho đứa bé bằng chính lưng mình.',e:{hp:'-35%',karma:10,an:['a','cứu giữa thú triều']}}},
    {i:'🚶',l:'Không kịp nữa',t:'Ngươi quay mặt đi.',e:{tamma:8}}]});
ev({id:'tt_tron',src:'ent:thutrieu',n:'Theo dấu thú triều',tg:['*'],w:1,
 t:['Dấu chân của {$en} còn mới. Thú chạy loạn thường bỏ lại thứ gì đó.'],
 c:[{i:'🔍',l:'Lần theo nhặt nhạnh',o:[{w:2,t:'Ngươi nhặt được mấy viên yêu đan rơi vãi.',e:{st:20,h:4}},{w:1,t:'Một con thú tụt lại, quay đầu cắn ngươi.',fight:{k:'beast'},win:{t:'Thêm một viên yêu đan.',e:{st:12}}}]},
    {i:'🚶',l:'Tránh xa',t:'Ngươi đi đường khác.'}]});
// ----- Đệ tử tuần tra -----
ev({id:'tr_hoi',src:'ent:tuantra',n:'Bị hỏi han',tg:['*'],w:3,v:()=>({a:npc('tre')}),
 t:['{$en} chặn ngươi lại. Kẻ cầm đầu, {$a.ten}, hỏi: “Từ đâu tới? Tới đây làm gì?”'],
 c:[{i:'🙇',l:'Trả lời tử tế',t:'{$a.ten} gật đầu, ghi vào sổ rồi cho qua. Trước khi đi còn chỉ đường giúp ngươi.',e:{rumor:1}},
    {i:'😤',l:'Đáp xấc',chk:['tam',11],ok:{t:'Bị ngươi nhìn chằm chằm, {$a.ten} ngượng ngùng tránh đường.',e:{tam:1}},no:{t:'“Láo!” {$a.ten} rút kiếm.',fight:{k:'detu',n:'{$a.ten}',spar:1},win:{t:'Đánh bại đệ tử tuần tra. Ngươi biết từ nay sơn môn đó sẽ nhớ mặt ngươi.',e:{tv:4,oan:['a','làm nhục giữa đường']}},lose:{t:'Bị đánh một trận, ngươi biết điều hơn.',e:{tv:2}}}}]});
ev({id:'tr_luan',src:'ent:tuantra',n:'Luận võ với đệ tử tuần tra',tg:['*'],w:2,v:()=>({a:npc('tre')}),
 t:['{$a.ten} của {$en} nhìn ngươi đầy hứng thú: “Đạo hữu có vẻ không tầm thường. Thử vài chiêu chứ?”'],
 c:[{i:'⚔️',l:'Luận võ',fight:{k:'detu',n:'{$a.ten}',spar:1},win:{t:'{$a.ten} chắp tay phục. Hai người trao đổi tâm đắc tới tận chiều.',e:{tv:6,an:['a','chỉ điểm võ nghệ']}},lose:{t:'{$a.ten} thu kiếm, cười: “Đạo hữu còn non.”',e:{tv:3}}},
    {i:'🙇',l:'Từ chối',t:'Ngươi chắp tay xin kiếu.'}]});
ev({id:'tr_bat',src:'ent:tuantra',n:'Truy bắt',tg:['*'],w:3,cond:r=>r.karma<=-15,v:()=>({a:npc('tre')}),
 t:['{$en} vây kín bốn phía. {$a.ten} giơ lên một tờ cáo thị: “Kẻ này, đúng là ngươi.”'],
 c:[{i:'⚔️',l:'Phá vây',fight:{k:'detu',cnt:2},win:{t:'Ngươi phá vây mà đi. Lệnh truy nã sẽ còn dán khắp nơi.',e:{tv:6,karma:-3}}},
    {i:'💎',l:'Đút lót',cost:{st:30},t:'{$a.ten} nhìn túi linh thạch, quay mặt đi. “Hôm nay không thấy ai cả.”',e:{karma:-2}},
    {i:'🙇',l:'Chịu phạt',t:'Ngươi bị giữ lại ba ngày, chép kinh sám hối.',e:{h:72,karma:6,tamma:-4}}]});
ev({id:'tr_giup',src:'ent:tuantra',n:'Đệ tử bị thương',tg:['*'],w:2,v:()=>({a:npc('tre')}),
 t:['Trong nhóm {$en} có một người bị thương nặng. {$a.ten} hỏi ngươi có thuốc không.'],
 c:[{i:'💊',l:'Cho một viên đan',req:r=>r.pills.length>0,t:'Thương thế ổn lại. {$a.ten} nói muốn đi cùng ngươi một đoạn để trả ơn.',e:{dropPill:1,karma:5,party:{k:'a',days:20}}},
    {i:'🤲',l:'Truyền linh lực giúp',cost:{mp:'40%'},t:'Người kia tỉnh lại. {$a.ten} cúi đầu cảm tạ.',e:{karma:4,an:['a','cứu sư huynh đệ']}},
    {i:'🚶',l:'Không giúp',t:'Ngươi đi qua.'}]});
ev({id:'tr_moi',src:'ent:tuantra',n:'Lời mời của sơn môn',tg:['*'],w:1,cond:r=>!r.flags.tongmon,v:()=>({a:npc('gia')}),
 t:['Đi cùng {$en} có một trưởng lão, {$a.look}. {$a.hn} nhìn ngươi hồi lâu: “Căn cốt không tệ. Có muốn về núi không?”'],
 c:[{i:'⛩️',l:'Theo về sơn môn',t:'Ngươi được nhận làm đệ tử ngoại môn. Từ nay vào được Tàng Kinh Các.',e:{flag:'tongmon',relic:'lenhtong',h:48}},
    {i:'✋',l:'Từ chối',t:'Ngươi quen một mình rồi.',e:{tam:1}}]});
ev({id:'tr_kiem',src:'ent:tuantra',n:'Khám xét',tg:['*'],w:1,v:()=>({a:npc('tre')}),
 t:['“Gần đây có kẻ trộm bảo vật của bổn môn.” {$a.ten} nhìn túi trữ vật của ngươi. “Mở ra.”'],
 c:[{i:'🎒',l:'Cho khám',t:'Không tìm thấy gì. {$a.ten} xin lỗi rồi cho ngươi đi.',e:{h:1}},
    {i:'🏃',l:'Chạy',chk:['tp',11],ok:{t:'Ngươi chạy mất dạng.',e:{karma:-2}},no:{t:'Bị đuổi kịp.',fight:{k:'detu',cnt:2},win:{t:'Thoát được, nhưng giờ thì thật sự là kẻ thù.',e:{karma:-4}}}}]});
// ----- Thiên kiêu (ngoài sự kiện gặp thiên kiêu có sẵn) -----
const RVV=r=>{const w=W();let i=r.metRival;let rv=r.rivals.find(x=>x.i===i&&x.alive)||pick(r.rivals.filter(x=>x.alive));const m=clamp(1.05+(rv.realm-r.realm)*0.45,0.85,1.8);return {rv:rivalView(rv),rvi:rv.i,rvm:m};};
ev({id:'tk_ruou',src:'ent:thienkieu',n:'Thiên kiêu uống rượu',tg:['*'],w:2,cond:r=>r.rivals.some(x=>x.alive),v:RVV,
 t:['{$rv.ten} ngồi một mình trong quán ven đường, rượu đã cạn ba bình. Thấy ngươi, {$rv.hn} vẫy tay: “Ngồi đi. Một mình uống buồn lắm.”'],
 c:[{i:'🍶',l:'Ngồi uống cùng',t:'{$rv.ten} kể về {$rv.sect}, về những kẻ ganh ghét, về áp lực của danh hiệu thiên kiêu. Lúc chia tay, cả hai đều đã say.',e:{rival:1,tam:1,h:6}},
    {i:'🚶',l:'Từ chối',t:'Ngươi chắp tay rồi đi.'}]});
ev({id:'tk_thach',src:'ent:thienkieu',n:'Lời thách đấu',tg:['*'],w:2,cond:r=>r.rivals.some(x=>x.alive),v:RVV,
 t:['{$rv.ten} chặn ngươi giữa đường: “Nghe nói ngươi muốn chen chân vào Thiên Kiêu Bảng? Qua được ta đã.”'],
 c:[{i:'⚔️',l:'Nhận lời',fight:{k:'kiemtu',n:'{$rv.ten}',mv:'rvm',spar:1,sub:'{$rv.tt} {$rv.sect}'},win:{t:'Thiên kiêu bại trận. Tin này sẽ lan khắp nơi.',e:{tv:10,van:2,rival:-1,rumor:1}},lose:{t:'Ngươi thua. {$rv.ten} quay lưng bỏ đi, không thèm nói một lời.',e:{tv:4,tamma:3}}},
    {i:'🙇',l:'Nhường',t:'Ngươi tránh đường. {$rv.ten} cười khẩy.',e:{tamma:2}}]});
ev({id:'tk_dong',src:'ent:thienkieu',n:'Thiên kiêu rủ đồng hành',tg:['*'],w:1,cond:r=>r.rivals.some(x=>x.alive&&x.rel>=1),v:RVV,
 t:['{$rv.ten} nhận ra ngươi từ xa: “Lại gặp rồi! Ta đang tới chỗ dị tượng, đi cùng không?”'],
 c:[{i:'🤝',l:'Đi cùng',t:'Có thiên kiêu bên cạnh, đường đi bớt cô độc.',e:{partyRv:20,rival:1}},
    {i:'✋',l:'Để lần khác',t:'{$rv.ten} nhún vai, đi trước.'}]});
ev({id:'tk_tranh',src:'ent:thienkieu',n:'Tranh bảo với thiên kiêu',tg:['*'],w:2,cond:r=>r.rivals.some(x=>x.alive),v:RVV,
 t:['Một gốc linh dược vừa chín. Cùng lúc ngươi tới thì {$rv.ten} cũng tới.'],
 c:[{i:'⚔️',l:'Tranh',fight:{k:'kiemtu',n:'{$rv.ten}',mv:'rvm',spar:1,sub:'{$rv.tt} {$rv.sect}'},win:{t:'Linh dược về tay ngươi.',e:{pill:'tinhnguyen',rival:-1}},lose:{t:'{$rv.ten} cầm linh dược đi mất.',e:{tv:3}}},
    {i:'🤝',l:'Chia đôi',chk:['tam',11],ok:{t:'{$rv.ten} ngẩn ra, rồi bật cười đồng ý.',e:{tv:4,rival:1}},no:{t:'“Chia đôi?” {$rv.hn} cười lạnh, lấy cả gốc đi.',e:{tamma:2}}},
    {i:'🙇',l:'Nhường lại',t:'Ngươi để lại cho {$rv.hn}.',e:{rival:1,karma:2}}]});
ev({id:'tk_dau',src:'ent:thienkieu',n:'Thiên kiêu bị vây',tg:['*'],w:1,cond:r=>r.rivals.some(x=>x.alive),v:RVV,
 t:['{$rv.ten} đang bị mấy tên ma tu vây đánh, áo đã nhuộm máu.'],
 c:[{i:'⚔️',l:'Ra tay giúp',fight:{k:'matu',cnt:2},win:{t:'{$rv.ten} thở dốc: “Ơn này, {$rv.sect} sẽ nhớ.”',e:{rival:2,tv:6,karma:4}}},
    {i:'👀',l:'Chờ xem',t:'{$rv.ten} tự phá vây được, nhưng đã thấy ngươi đứng xem.',e:{rival:-1}}]});
// ----- Kẻ truy sát -----
ev({id:'ts_phuc',src:'ent:truysat',n:'Mai phục',tg:['*'],w:2,
 t:['Gió lạnh sau gáy. {$en} đã bám theo ngươi nhiều ngày, giờ mới ra tay.','Một mũi tên cắm phập vào thân cây ngay cạnh tai. {$en} bước ra từ bóng tối.'],
 c:[{i:'⚔️',l:'Ứng chiến',fight:{k:'satthu',n:'{$en}',elite:1},win:{t:'Kẻ truy sát gục xuống. Ngươi lục người hắn, thấy một tờ giấy ghi tên ngươi.',e:{tv:8,st:20}}},
    {i:'🏃',l:'Bỏ chạy',chk:['tp',12],ok:{t:'Ngươi cắt đuôi được. Nhưng hắn sẽ còn quay lại.',e:{h:4}},no:{t:'Không thoát được.',fight:{k:'satthu',n:'{$en}'},win:{t:'Thoát chết trong gang tấc.',e:{tv:5}}}}]});
ev({id:'ts_dam',src:'ent:truysat',n:'Kẻ truy sát lên tiếng',tg:['*'],w:1,
 t:['{$en} đứng chắn giữa đường, không rút binh khí: “Ta nhận tiền để giết ngươi. Nhưng ta muốn nghe ngươi nói trước.”'],
 c:[{i:'💬',l:'Thuyết phục',chk:['tam',12],ok:{t:'Hắn nghe hết, im lặng rất lâu, rồi bẻ gãy tờ lệnh.',e:{karma:5,tamma:-5}},no:{t:'“Lý lẽ hay đấy. Nhưng tiền đã nhận rồi.”',fight:{k:'satthu',n:'{$en}'},win:{t:'Kết thúc.',e:{tv:6}}}},
    {i:'💎',l:'Trả gấp đôi tiền thuê',cost:{st:40},t:'Hắn cân túi linh thạch, gật đầu rồi biến mất.'}]});
ev({id:'ts_doc',src:'ent:truysat',n:'Rượu có độc',tg:['*'],w:1,
 t:['Quán trọ ven đường. Bát rượu bưng lên có mùi lạ. Ở góc quán, {$en} đang nhìn ngươi.'],
 c:[{i:'👃',l:'Ngửi kỹ',chk:['ngo',11],ok:{t:'Ngươi hất bát rượu vào mặt hắn rồi xông tới.',fight:{k:'satthu',n:'{$en}'},win:{t:'Kẻ hạ độc không ngờ bị lộ sớm vậy.',e:{tv:6}}},no:{t:'Ngươi uống một ngụm. Ruột gan quặn lại.',e:{hp:'-30%'},fight:{k:'satthu',n:'{$en}'},win:{t:'Ngươi ép được độc ra, hạ được hắn.',e:{tv:6}}}},
    {i:'🚶',l:'Bỏ bát rượu, rời quán',t:'Ngươi đặt tiền xuống rồi đi. Hắn không theo.'}]});
ev({id:'ts_bay',src:'ent:truysat',n:'Cạm bẫy',tg:['*'],w:1,
 t:['Đất dưới chân sụp xuống. Hố chông! {$en} đứng trên miệng hố, cười.'],
 c:[{i:'🌀',l:'Nhảy lên',chk:['tp',11],ok:{t:'Ngươi đạp vách hố bật lên, tung đòn trước khi hắn kịp phản ứng.',fight:{k:'satthu',n:'{$en}'},win:{t:'Hắn đã chọn sai con mồi.',e:{tv:7}}},no:{t:'Chông đâm vào đùi.',e:{hp:'-25%'},fight:{k:'satthu',n:'{$en}'},win:{t:'Thắng, nhưng phải băng bó lâu.',e:{tv:6}}}}]});
ev({id:'ts_dau',src:'ent:truysat',n:'Đấu tay đôi',tg:['*'],w:1,
 t:['{$en} cắm kiếm xuống đất: “Đuổi ngươi đủ rồi. Hôm nay phân thắng bại.”'],
 c:[{i:'⚔️',l:'Nhận lời',fight:{k:'kiemtu',n:'{$en}',elite:1},win:{t:'Kẻ truy sát gục trước mặt ngươi.',e:{tv:9,relic:0}}},
    {i:'🏃',l:'Không đấu',t:'Ngươi quay lưng đi. Hắn không chém sau lưng.',e:{tamma:2}}]});
// ----- Dị tượng thêm -----
ev({id:'dt_khi',src:'ent:di',dk:'bicanh',n:'Linh khí phun trào',tg:['*'],w:1,
 t:['Cửa bí cảnh mở hé, linh khí phun ra như suối. Tu sĩ khắp nơi kéo tới.'],
 c:[{i:'🧘',l:'Ngồi hấp thu ngay tại chỗ',t:'Ngươi ngồi suốt một ngày một đêm.',e:{h:24,tv:6,dao:1}},
    {i:'🚪',l:'Lách vào trong',fight:{k:'tantu',cnt:2},win:{t:'Đánh lui kẻ tranh giành, ngươi vơ được một món.',e:{relic:1,tv:6}}}]});
ev({id:'dt_sao',src:'ent:di',dk:'saoroi',n:'Mảnh sao còn nóng',tg:['*'],w:1,
 t:['Hố sâu còn bốc khói. Giữa hố là một mảnh thiên thạch đỏ rực.'],
 c:[{i:'🧤',l:'Nhặt lên',chk:['tp',10],ok:{t:'Nóng bỏng tay, nhưng là đồ thật.',e:{relic:'tinhthiet'}},no:{t:'Bỏng rát cả hai tay.',e:{hp:'-20%',st:15}}},
    {i:'🔍',l:'Nghiên cứu tinh lực',t:'Ngươi ngồi bên hố, cảm ngộ tinh lực trời sao.',e:{h:12,tv:4,dao:1}}]});
ev({id:'dt_dau',src:'ent:di',dk:'daugia',n:'Đấu giá trong thành',tg:['*'],w:1,
 t:['Vạn Bảo Thương Hội treo đèn khắp phố. Đấu giá sắp bắt đầu, nghe nói có cả lệnh bài thông quan.'],
 c:[{i:'🏮',l:'Vào xem hàng',t:'Ngươi chen vào phòng đấu giá.',e:{shop:1}},
    {i:'🚶',l:'Không có tiền, thôi',t:'Ngươi đứng ngoài nghe tiếng hô giá.'}]});
// ----- Chỉ có ban đêm -----
ev({id:'d_hon',n:'Hồn ma tìm người',when:{part:['dem']},tg:['phe','hoang','tran','rung'],w:2,
 t:['Nửa đêm, có ai đó gõ cửa. Mở ra, một nữ tử áo trắng đứng đó, chân không chạm đất: “Ngươi có thấy phu quân ta không?”'],
 c:[{i:'🙏',l:'Tụng kinh siêu độ',chk:['tam',10],ok:{t:'Nàng mỉm cười, tan thành sương.',e:{karma:6,tam:1}},no:{t:'Nàng gào lên, mặt biến dạng.',fight:{k:'quy'},win:{t:'Hồn ma tan biến.',e:{tv:4}}}},
    {i:'🚪',l:'Đóng cửa',t:'Tiếng gõ cửa kéo dài tới gà gáy.',e:{tamma:3}}]});
ev({id:'d_dom',n:'Đom đóm dẫn đường',when:{part:['dem','toi']},tg:['rung','song','nui'],w:2,
 t:['Một đàn đom đóm bay thành dòng, như có ai cầm đèn dẫn đường.'],
 c:[{i:'✨',l:'Đi theo',o:[{w:2,t:'Chúng dẫn ngươi tới một gốc linh thảo nở về đêm.',e:{pill:'tinhnguyen'}},{w:1,t:'Chúng dẫn ngươi vào ổ của một con yêu nhện.',fight:{k:'chu'},win:{t:'Trong tổ nhện có ít linh thạch.',e:{st:15}}}]},
    {i:'🛏️',l:'Ngủ tiếp',t:'Đêm yên tĩnh.'}]});
ev({id:'d_trom',n:'Kẻ trộm đêm',when:{part:['dem']},tg:['tran','thanh'],w:2,v:()=>({a:npc('pham')}),
 t:['Nửa đêm, có bàn tay lần vào túi trữ vật của ngươi.'],
 c:[{i:'✊',l:'Chộp tay',chk:['tp',9],ok:{t:'Là {$a.ten}, gầy trơ xương. Nhà có mẹ già đang ốm.',c:[{i:'💎',l:'Cho ít linh thạch',cost:{st:8},t:'Gã khóc rồi đi.',e:{karma:6,an:['a','tha tội và cho tiền']}},{i:'👮',l:'Giao cho quan',t:'Gã bị lôi đi.',e:{karma:-2}}]},no:{t:'Kẻ trộm chạy mất, mang theo ít linh thạch.',e:{st:'-15%'}}},
    {i:'😴',l:'Giả ngủ, xem hắn làm gì',t:'Hắn lấy mấy viên linh thạch rồi đi. Ngươi để yên.',e:{st:'-8%',karma:2}}]});
ev({id:'d_sao',n:'Ngắm sao',when:{part:['dem']},tg:['nui','hoang','bien','thien'],w:2,
 t:['Trời đêm trong vắt. Ngươi nằm ngửa trên đá, sao trời gần như chạm tay.'],
 c:[{i:'🌌',l:'Quan sát tinh tượng',chk:['ngo',10],ok:{t:'Ngươi chợt hiểu ra nhịp xoay của trời đất.',e:{tv:5,dao:1}},no:{t:'Ngươi ngủ quên lúc nào không biết.',e:{h:6}}},
    {i:'🛏️',l:'Ngủ',t:'Một giấc ngon lành.',e:{hp:'15%'}}]});
ev({id:'d_quan',n:'Quán đêm',when:{part:['dem','toi']},tg:['tran','thanh','song'],w:2,v:()=>({a:npc('tre')}),
 t:['Quán nhỏ còn sáng đèn. {$a.ten}, {$a.look}, đang uống một mình.'],
 c:[{i:'🍶',l:'Ngồi cùng',t:'Hai người uống tới khuya, kể chuyện giang hồ.',e:{rumor:2,an:['a','bầu bạn trong đêm']}},
    {i:'🚶',l:'Về nghỉ',t:'Ngươi về phòng.'}]});
ev({id:'d_lua',n:'Lửa ma trơi',when:{part:['dem']},tg:['phe','hoang','ma'],w:2,
 t:['Đốm lửa xanh lơ lửng giữa đồng, cứ cách ngươi mười bước.'],
 c:[{i:'🔥',l:'Đuổi theo',o:[{w:1,t:'Lửa dừng lại trên một nấm mộ cổ. Dưới đó có đồ tùy táng.',e:{relic:0,karma:-2}},{w:1,t:'Lửa hóa thành một bộ xương.',fight:{k:'kholau'},win:{t:'Xương vụn rải đầy cỏ.',e:{st:10}}}]},
    {i:'🙏',l:'Khấn rồi đi',t:'Lửa tắt.',e:{tam:1}}]});
ev({id:'d_trang',n:'Trăng máu',when:{part:['dem']},tg:['*'],w:1,
 t:['Mặt trăng đỏ như máu. Yêu khí khắp nơi trỗi dậy.'],
 c:[{i:'🧘',l:'Ngồi trấn tâm',chk:['tam',11],ok:{t:'Ngươi giữ được tâm, đêm qua bình an.',e:{tamma:-5}},no:{t:'Những ý nghĩ xấu xa trỗi dậy trong lòng.',e:{tamma:8}}},
    {i:'⚔️',l:'Đi săn yêu',fight:{k:'beast',cnt:2},win:{t:'Đêm trăng máu, yêu đan cũng đỏ hơn.',e:{st:20,tv:4}}}]});
ev({id:'d_ca',n:'Tiếng hát trên sông',when:{part:['dem','toi']},tg:['song','bien'],w:2,
 t:['Tiếng hát vẳng lên từ mặt nước, buồn tới thắt lòng.'],
 c:[{i:'🛶',l:'Chèo thuyền ra',o:[{w:1,t:'Một ngư nữ đang hát. Thấy ngươi, nàng tặng một viên ngọc rồi lặn mất.',e:{relic:0}},{w:1,t:'Là thủy quỷ dụ người!',fight:{k:'thuyquy'},win:{t:'Mặt sông lặng lại.',e:{st:10}}}]},
    {i:'🎧',l:'Ngồi nghe',t:'Ngươi nghe tới khi tiếng hát tắt.',e:{tam:1,tamma:-2}}]});
ev({id:'d_mong',n:'Giấc mơ lạ',when:{part:['dem']},tg:['*'],w:2,
 t:['Ngươi mơ thấy mình là một người khác, sống ở một thời khác.'],
 c:[{i:'💭',l:'Cố nhớ lại',chk:['ngo',10],ok:{t:'Lúc tỉnh dậy, ngươi nhớ được một đoạn khẩu quyết.',e:{skill:1}},no:{t:'Tỉnh dậy, chỉ còn cảm giác buồn mơ hồ.',e:{tamma:2}}},
    {i:'😴',l:'Ngủ tiếp',t:'Giấc mơ tan đi.'}]});
ev({id:'d_soi',n:'Bầy sói đêm',when:{part:['dem']},tg:['rung','nui','hoang'],w:2,
 t:['Trong bóng tối, hàng chục đôi mắt xanh lè sáng lên quanh đống lửa.'],
 c:[{i:'🔥',l:'Đốt lửa to xua đuổi',chk:['tam',9],ok:{t:'Bầy sói lùi dần rồi bỏ đi.',e:{h:2}},no:{t:'Chúng lao vào.',fight:{k:'lang',cnt:3},win:{t:'Xác sói nằm quanh đống lửa.',e:{st:15,tv:4}}}},
    {i:'⚔️',l:'Ra tay trước',fight:{k:'lang',cnt:2},win:{t:'Bầy sói tan tác.',e:{st:12,tv:3}}}]});
// ----- Theo mùa -----
ev({id:'m_xuan1',n:'Lễ hội mùa xuân',when:{season:['xuan']},tg:['tran','thanh'],w:2,
 t:['Đầu xuân, người ta rước kiệu khắp phố, pháo nổ đỏ đường.'],
 c:[{i:'🎉',l:'Vui cùng dân chúng',t:'Ngươi ăn bánh, xem múa lân, cười thật lòng lần đầu sau nhiều tháng.',e:{tamma:-8,van:1,h:8}},
    {i:'🚶',l:'Đi tiếp',t:'Tiếng pháo xa dần.'}]});
ev({id:'m_xuan2',n:'Hoa nở linh thảo',when:{season:['xuan']},tg:['rung','nui','song'],w:2,
 t:['Mùa xuân, linh thảo đâm chồi khắp sườn núi.'],
 c:[{i:'🌿',l:'Hái',t:'Ngươi hái được một gùi.',e:{pill:'hoixuan',st:10,h:6}},
    {i:'🧘',l:'Ngồi cảm thụ sinh khí',t:'Sinh khí mùa xuân thấm vào kinh mạch.',e:{tv:3,h:6}}]});
ev({id:'m_ha1',n:'Mưa rào mùa hạ',when:{season:['ha']},tg:['*'],w:2,
 t:['Mưa rào ập xuống, trắng xóa trời đất. Sấm rền liên hồi.'],
 c:[{i:'⚡',l:'Ngồi giữa mưa cảm ngộ lôi đình',chk:['tam',11],ok:{t:'Tiếng sấm như gõ vào tâm ngươi.',e:{tv:5,dao:1}},no:{t:'Sét đánh trúng cây cạnh ngươi, tóc dựng ngược.',e:{hp:'-15%'}}},
    {i:'🏠',l:'Trú mưa',t:'Ngươi ngồi chờ tạnh.',e:{h:3}}]});
ev({id:'m_ha2',n:'Hạn hán',when:{season:['ha']},tg:['tran','hoang'],w:1,v:()=>({a:npc('gia')}),
 t:['Ruộng nứt nẻ. {$a.ten} quỳ giữa ruộng khấn trời.'],
 c:[{i:'🌧️',l:'Dùng linh lực gọi mưa',cost:{mp:'60%'},t:'Mây kéo tới, mưa lất phất. Cả làng quỳ lạy.',e:{karma:10,an:['a','gọi mưa cứu làng']}},
    {i:'🚶',l:'Không giúp được',t:'Ngươi đi qua.'}]});
ev({id:'m_thu1',n:'Mùa gặt',when:{season:['thu']},tg:['tran'],w:2,v:()=>({a:npc('pham')}),
 t:['Lúa chín vàng đồng. {$a.ten} nhờ ngươi gặt giúp.'],
 c:[{i:'🌾',l:'Gặt giúp',t:'Một ngày mồ hôi. Tối đó được ăn cơm mới.',e:{h:12,karma:4,hp:'30%',an:['a','gặt lúa giúp']}},
    {i:'🚶',l:'Từ chối',t:'Ngươi bận việc.'}]});
ev({id:'m_thu2',n:'Lá phong rụng',when:{season:['thu']},tg:['nui','rung'],w:2,
 t:['Lá phong đỏ rụng đầy lối, mỗi chiếc lá như một ngọn lửa nhỏ.'],
 c:[{i:'🍁',l:'Ngồi ngắm, nghĩ về sinh tử',chk:['ngo',10],ok:{t:'Lá rụng để cây sống qua đông. Ngươi chợt hiểu.',e:{tv:4,dao:1}},no:{t:'Ngươi thấy lòng buồn vô cớ.',e:{tamma:2}}}]});
ev({id:'m_dong1',n:'Bão tuyết',when:{season:['dong']},tg:['nui','hoang','rung'],w:2,
 t:['Bão tuyết ập tới, trắng xóa không thấy đường.'],
 c:[{i:'🕳️',l:'Tìm hang trú',t:'Hai ngày trong hang, ăn đồ khô.',e:{h:48}},
    {i:'🚶',l:'Cố đi tiếp',chk:['tp',10],ok:{t:'Ngươi vượt được bão.'},no:{t:'Lạc trong tuyết, chân tay tê cóng.',e:{hp:'-25%',h:24}}}]});
ev({id:'m_dong2',n:'Đêm đông người rét',when:{season:['dong']},tg:['tran','thanh'],w:2,v:()=>({a:npc('hai')}),
 t:['Trời rét cắt da. {$a.ten} ngồi co ro bên vệ đường, môi tím tái.'],
 c:[{i:'🧥',l:'Cởi áo khoác cho',t:'Đứa bé ôm chặt chiếc áo.',e:{karma:6,tamma:-3,an:['a','cho áo giữa đêm đông']}},
    {i:'🚶',l:'Đi qua',t:'Sáng hôm sau, ngươi nghe nói có đứa bé chết rét.',e:{tamma:5}}]});
// ----- Cố nhân kiếp trước -----
ev({id:'bao_an_co',n:'Người cũ báo ân',spec:1,cond:()=>false,
 v:r=>{const n=nodeById(r.at);const p=n.patron||{ten:'Một người lạ',who:'ngươi',d:'giúp đỡ',role:'chưởng quỹ'};return {p,pn:n.id};},
 t:['{$p.role} ở đây là {$p.ten}, tóc đã bạc. Nhìn ngươi rất lâu, {$p.ten} run giọng: “Ngươi… giống hệt {$p.who}. Năm ấy người đó từng {$p.d} ta.”','Có người đuổi theo ngươi tới tận cửa. Là {$p.ten}, nay đã là {$p.role}. “{$p.who} năm xưa từng {$p.d} ta. Ta nợ người ấy. Nay trả cho ngươi.”'],
 c:[{i:'🤝',l:'Nhận lấy',t:'{$p.ten} đưa ngươi một túi đồ, dặn dò rất lâu như dặn con cháu.',e:{relic:1,pill:1,tv:6,ach:'baoan',patronDone:1}},
    {i:'🍶',l:'Chỉ ngồi uống chén trà',t:'Hai người ngồi tới chiều. {$p.ten} kể về {$p.who}, về những chuyện chính ngươi không còn nhớ.',e:{tam:3,tamma:-8,ach:'baoan',patronDone:1,partyP:30}}]});

