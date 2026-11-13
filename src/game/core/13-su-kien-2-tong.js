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
  {i:'🌿',l:'Lén hái',chk:['tp',11],ok:{t:'Ngươi vào ra như gió. Trong túi đã có mấy gốc linh thảo thượng hạng.',e:{thao:8,karma:-4}},no:{t:'Lão già mở mắt. Hóa ra lão chỉ giả ngủ.',fight:{k:'votang',n:'Lão canh vườn',m:1.1},win:{t:'Ngươi chạy thoát, trên tay còn kịp nhổ một gốc.',e:{thao:2,karma:-4}}}},
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
 t:['Mấy ngày nay {$a.ten} cứ đi cùng một con đường với ngươi, lúc trước lúc sau. Tối nay bên đống lửa, {$a.hn} không giả vờ tình cờ nữa: “Đường tiên dài lắm. Đi cùng nhau, được không?”','Sau trận chiến, {$a.ten} băng bó vết thương cho ngươi. Tay {$a.hn} run run: “Ta không muốn thấy ngươi bị thương nữa.”'],
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
