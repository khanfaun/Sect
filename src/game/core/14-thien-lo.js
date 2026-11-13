// ----- Thiên lộ -----
ev({id:'tinh_ha',n:'Sông sao',tg:['thien'],w:2,
 t:['Dải ngân hà chảy ngang lối đi như một dòng suối. Trong nước là sao thật, mỗi ngôi to bằng nắm tay.'],
 c:[
  {i:'✋',l:'Vớt một ngôi sao',chk:['tam',12],ok:{t:'Ngôi sao nằm trong tay ngươi, ấm như trái tim.',e:{relic:2}},no:{t:'Sao nóng như mặt trời. Tay ngươi bỏng rộp.',e:{hp:'-25%'}}},
  {i:'🧘',l:'Ngồi bên bờ quan sát',t:'Ngươi nhìn sao trôi. Mỗi ngôi sao là một con đường. Ngươi hiểu ra vài điều.',e:{dao:2,tv:14,ngo:2,h:360}},
  {i:'🚶',l:'Bước qua',t:'Nước sao lạnh buốt tới tận xương.'}
 ]});

ev({id:'di_thue',n:'Di thuế tiên nhân',tg:['thien','phe'],w:2,
 t:['Một bộ xác ngồi xếp bằng trên đài ngọc, da thịt vẫn hồng hào. Đây là tiên nhân di thuế, cái xác một bậc tiền bối để lại khi phi thăng.'],
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