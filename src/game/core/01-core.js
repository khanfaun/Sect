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
