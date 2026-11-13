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
 c:[{i:'🌿',l:'Hái',t:'Ngươi hái được một gùi linh thảo, đủ để luyện mấy lò đan.',e:{thao:5,h:6}},
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


// lời kể bế quan theo chỗ ngồi: giữa thành trấn (chưa có động phủ) thì là phòng trọ, không phải vách đá
function bqText(){const r=G.run;const n=r&&nodeById(r.at);return n&&!n.dp&&['tran','thanh','cho'].includes(n.type)?REST_T.bqTown:REST_T.bq;}

// câu mở đầu {mo} (thời tiết, thời khắc) phải hợp giờ và mùa đang có: không "giữa trưa" lúc nửa đêm, không "tuyết đầu mùa" giữa hè
{const MO0=P.mo.slice();const PART={sang:[5,11],chieu:[4,9,18,22],toi:[0,10],dem:[3,7,13,19,23]};const ANY=[1,2,8,12,14,16,17];const SEA={dong:[6,15],thu:[20],xuan:[21],ha:[9]};
 const dayAll=[16];let key='';
 Object.defineProperty(P,'mo',{configurable:true,get(){if(!G.run||!G.meta||!G.meta.world)return MO0;const t=W().t,pt=partOf(t),se=seasonOf(t);
   const ok=new Set(ANY.concat(PART[pt]||[],SEA[se]||[]));if(pt==='dem'||pt==='toi')ok.delete(16);for(const [k,L] of Object.entries(SEA))if(k!==se)L.forEach(i=>ok.delete(i));
   const k=pt+se;if(k!==key){key=k;delete BAG.mo;}return MO0.filter((x,i)=>ok.has(i));}});}
