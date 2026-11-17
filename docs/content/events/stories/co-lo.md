# content/events/stories/co-lo.json

Nguồn chuẩn: `content/events/stories/co-lo.json`. Bản đọc tự sinh. Cú pháp: xem [guideline](../../GUIDELINE.md).

<a id="gk_chiec_can_can_mot_buoc_chan"></a>
## Chiếc cân cân một bước chân — `gk_chiec_can_can_mot_buoc_chan`

- Loại: story; nguồn: Khám phá; chủ đề: Ngộ đạo; cảm xúc: Trầm tĩnh.
- Nơi: thiên lộ.
- Điều kiện: tầng 4; một lần/kiếp.
- Bối cảnh tác giả: Trạm nghỉ trên đường ngọc.
- Vai: `{"a":{"gender":"nam","role":"Người trông trạm","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Chiếc cân ở trạm nghiêng mỗi khi ngươi định bước. Người trông trạm {$a.ten} bỏ hết hành trang xuống, nhưng đĩa cân chỉ nhẹ đi khi lão thôi nghĩ tới nơi mình phải đến.

### Lựa chọn

- **1. Thử đi mà bỏ ý đến đích**
  Ngươi thử thu thần niệm lại, chỉ lo bước hiện tại. Đĩa cân trở về ngang, chân cũng nhẹ hơn. Người trông trạm hỏi ngươi định tới đâu, ngươi cười bảo để qua trạm rồi tính.
  - `e`: `{"tv":5,"tam":1}`
- **2. Ép cân bằng bằng thần niệm**
  Ngươi có một bước vượt xa. Khi dừng lại, bụi từ bước đầu mới theo tới và phủ lên mu bàn chân.
  - `e`: `{"tv":3,"karma":-1}`
- **3. Bỏ đi**
  Ngươi đi tiếp, không đợi cân đứng yên. Người trông trạm cũng xách hành trang lên, nói đứng mãi ở đây chưa chắc hiểu thêm.

<a id="gk_tam_ao_cu_qua_nam_tram_mua"></a>
## Tấm áo cũ qua năm trăm mùa — `gk_tam_ao_cu_qua_nam_tram_mua`

- Loại: story; nguồn: Khám phá; chủ đề: Thời gian trên cổ lộ; cảm xúc: Bi thương.
- Nơi: thiên lộ.
- Điều kiện: tầng 4; một lần/kiếp.
- Bối cảnh tác giả: Mái phơi bên đường ngọc.
- Vai: `{"a":{"gender":"nam","role":"Tu sĩ","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Tu sĩ {$a.ten} treo áo mỗi lần có gió, vì người từng mặc đã hẹn về khi áo khô. Một nửa vạt áo đã mục, nửa trong tay lão vẫn ướt từ ngày ấy.

### Lựa chọn

- **1. Dùng thần niệm hứng giọt nước cuối**
  Ngươi dùng thần niệm hứng giọt nước cuối khỏi vạt áo. Áo khô, lão sờ thử rồi gấp lại, nói lần này sẽ tự đi tìm người đã hẹn. Ngươi hao khí giữ giọt nước tới khi nó tan, rồi chúc lão thuận đường.
  - `cost`: `{"mp":"20%"}`
  - `e`: `{"karma":4,"an":["a","tấm áo cũ qua năm trăm mùa"]}`
- **2. Mua vạt áo ướt để giữ một khoảnh khắc**
  Ngươi có vật luyện phép trì hoãn. {$a.ten} gấp nửa áo còn lại, lúc gấp vẫn chừa phần vạt đã bán.
  - `cost`: `{"st":22}`
  - `e`: `{"karma":-2,"namedMat":"story_mat_tam_ao_cu_qua_nam_tram_mua"}`
- **3. Bỏ đi**
  Lão dịch móc áo sang phía có gió. Chỗ móc cũ chưa kịp khô.

<a id="gk_loi_chao_dung_lai_ngoai_cua"></a>
## Lời chào đứng lại ngoài cửa — `gk_loi_chao_dung_lai_ngoai_cua`

- Loại: story; nguồn: Khám phá; chủ đề: Chuyện thường ngày; cảm xúc: Ấm áp.
- Nơi: thiên lộ.
- Điều kiện: tầng 4; một lần/kiếp.
- Bối cảnh tác giả: Trạm nghỉ nhìn xuống hư không.
- Vai: `{"a":{"gender":"nam","role":"người giữ trạm","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

“Mời ngồi.” Chiếc bình trên kệ vừa lên tiếng, người giữ trạm {$a.ten} đã mang trà tới. Lão cười bảo nơi này giữ được lời chào của khách, dành cho người đi xa tới mức quên cả cách cất tiếng. Trên kệ có bình nhỏ, bình lớn, giọng nào cũng khác.

### Lựa chọn

- **1. Để lại một lời chào của chính mình**
  Ngươi để lại một lời chào, giọng khàn đi sau khi rút thần niệm khỏi bình. Một khách mới bước vào, nghe tiếng ngươi thì ngẩng đầu đáp lễ. Người giữ trạm kê thêm ghế, mời cả hai uống trà.
  - `e`: `{"karma":4,"an":["a","lời chào đứng lại ngoài cửa"],"tam":1}`
- **2. Mua một lời chào để gửi về {$que}**
  Một tiếng người về được tới quê. Lúc mở, {$a.ten} đưa ngươi cái bình còn vương hơi trà.
  - `cost`: `{"st":22}`
  - `e`: `{"tamma":-4}`
- **3. Bỏ đi**
  Ngươi chào lão trước khi đi. Lão chỉ chiếc bình vừa có thêm tiếng, hỏi ngươi lần sau có muốn nghe lại không.

<a id="gk_mot_dem_giu_nen_troi"></a>
## Một đêm giữ nền trời — `gk_mot_dem_giu_nen_troi`

- Loại: story; nguồn: Khám phá; chủ đề: Thiên tượng; cảm xúc: Căng thẳng.
- Nơi: thiên lộ.
- Điều kiện: tầng 4; một lần/kiếp.
- Bối cảnh tác giả: Bãi ghim thiên quang.
- Vai: `{"a":{"gender":"nu","role":"Nữ thợ đóng ghim","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Dải sáng sà thấp, người bên dưới già đi mỗi khi ánh lướt qua. Nữ thợ đóng ghim {$a.ten} tìm mũ ghim đã rụng, trên tóc nàng có một đường trắng mới. Người qua lại bàn tán: “Ai đi ngược dải sáng sẽ trẻ lại.” “Có người trẻ được một đêm, sáng ra không còn nhớ mình sống ở đâu.”

### Lựa chọn

- **1. Dùng pháp lực giữ thiên quang cho thợ đóng lại ghim**
  Ngươi ép dải sáng đứng yên, để người đóng ghim tìm và lắp lại mũ chốt. Khi nàng ra hiệu đã chắc, ngươi mới thu tay, hao gần hết phần khí đang dưỡng. Dân dưới bãi được rời đi trước khi ánh sáng lại quét qua.
  - `cost`: `{"mp":"20%"}`
  - `e`: `{"karma":4,"an":["a","một đêm giữ nền trời"]}`
- **2. Hứng thiên quang rồi gọi người lùi về bóng tối**
  Ngươi dưỡng được phần linh lực lớn. {$a.ten} cắt bỏ lọn tóc bạc trước khi đội mũ.
  - `e`: `{"tv":4,"karma":-3}`
- **3. Bỏ đi**
  Bãi tối đi khi dải sáng dịch qua, người cuối cùng đưa tay sờ lại gáy.

<a id="gk_doi_chan_cua_tuong_quy"></a>
## Đôi chân của tượng quỳ — `gk_doi_chan_cua_tuong_quy`

- Loại: story; nguồn: Khám phá; chủ đề: Tranh công; cảm xúc: Cẩu huyết.
- Nơi: thiên lộ.
- Điều kiện: tầng 4; một lần/kiếp.
- Bối cảnh tác giả: Điện khắc công đức.
- Vai: `{"a":{"gender":"nam","role":"Tu sĩ","alignment":"context"},"b":{"gender":"nam","role":"người làm mẫu","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Tu sĩ {$a.ten} tự nhận bức tượng trong điện dựng theo dáng cha mình. Khi thợ lật bệ để khắc tên, người ta thấy dưới đôi chân quỳ có hàng chữ ghi tiền thuê người làm mẫu.

### Lựa chọn

- **1. Gọi người làm mẫu {$b.ten} tới nhận tiền còn thiếu**
  Ngươi mời người làm mẫu tới đối lại tiền công và nét khắc dưới bệ. Tu sĩ hết đường nhận tượng là cha mình, người coi điện cũng phải trả khoản còn thiếu. Thợ xin ghi đúng tên người làm mẫu trước rồi mới khắc lời ca tụng.
  - `e`: `{"karma":4}`
- **2. Đổi im lặng lấy chỗ khắc tên ngươi**
  Ngươi có một hàng công đức sáng. Bên dưới bệ, tờ giấy thuê người vẫn bị một cái gót đá đè lên.
  - `e`: `{"karma":-3,"van":1}`
- **3. Bỏ đi**
  Thợ khắc ghi thêm chữ “tương truyền”. {$a.ten} ngồi đợi lão mài lại đục.

<a id="gk_mua_roi_nguoc_trong_long_ban"></a>
## Mưa rơi ngược trong lòng bàn tay — `gk_mua_roi_nguoc_trong_long_ban`

- Loại: story; nguồn: Khám phá; chủ đề: Chuyện biệt ly; cảm xúc: Lãng mạn.
- Nơi: thiên lộ.
- Điều kiện: tầng 4; một lần/kiếp.
- Bối cảnh tác giả: Mái nghỉ cuối đường ngọc.
- Vai: `{"a":{"gender":"nu","role":"Nữ tu","alignment":"context"},"b":{"gender":"nam","role":"tu sĩ","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Nữ tu {$a.ten} đón nước mưa đang rơi ngược để giữ lời hẹn với tu sĩ {$b.ten} ở tầng đường phía dưới. Hai bàn tay nàng khép rất hờ, chừa cho một ngón tay khác lách vào.

### Lựa chọn

- **1. Dùng thần niệm giữ một giọt mưa nối hai tầng đường**
  Ngươi giữ giọt mưa đứng lại giữa hai tầng, hao khí cho tới khi người phía dưới hiện rõ. Họ chạm được tay qua giọt nước, nói xong lời hẹn gặp. Nàng tự thu tay trước khi ngươi không giữ nổi nữa.
  - `cost`: `{"mp":"20%"}`
  - `e`: `{"karma":4,"an":["a","mưa rơi ngược trong lòng bàn tay"]}`
- **2. Lấy giọt mưa luyện pháp khí nghịch lưu**
  Nàng nhận linh thạch rồi rời mái. Về sau, chiếc nhẫn khắc hình ngón tay nhỏ luôn quay mặt khắc vào trong.
  - `e`: `{"karma":-3,"namedRelic":{"k":"nhan","name":"Nhẫn Giọt Mưa","lore":"Nàng nhận linh thạch rồi rời mái. Về sau, chiếc nhẫn khắc hình ngón tay nhỏ luôn quay mặt khắc vào trong."}}`
- **3. Bỏ đi**
  Mưa ngừng từ dưới lên. Nàng vẫn giữ hai tay khép hờ.

<a id="gk_ke_doi_binh_tren_dau"></a>
## Kẻ đội bình trên đầu — `gk_ke_doi_binh_tren_dau`

- Loại: story; nguồn: Khám phá; chủ đề: Thiên ma; cảm xúc: Hài hước.
- Nơi: thiên lộ.
- Điều kiện: tầng 4; một lần/kiếp.
- Bối cảnh tác giả: Trạm thử thần niệm.
- Vai: `{"a":{"gender":"nam","role":"Thiên ma","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Thiên ma {$a.ten} đã học được dáng người, đang tập đội bình qua trạm. Hắn vừa cúi chào, bình cũng nghiêng theo, nước đổ lên người coi cửa. Hắn quay sang ngươi hỏi rất nghiêm túc: “Người ta chào nhau mà không ướt bằng cách nào?”

### Lựa chọn

- **1. Dạy hắn đỡ đáy bình bằng một tay**
  Ngươi chỉ hắn giữ bình bằng một tay, cúi vừa đủ rồi đứng thẳng. Hắn qua được trạm, sung sướng định cúi tạ ơn lần nữa. Ngươi kịp nhắc hắn đặt bình xuống trước.
  - `e`: `{"karma":2}`
- **2. Mua cái bình biết cúi**
  Nó giữ được thần niệm tản ra. Lúc ngươi giận, nó cúi chào người đứng gần nhất.
  - `cost`: `{"st":22}`
  - `e`: `{"namedRelic":{"k":"holo","name":"Bình Cúi Chào","lore":"Nó giữ được thần niệm tản ra. Lúc ngươi giận, nó cúi chào người đứng gần nhất."}}`
- **3. Bỏ đi**
  Hắn quyết định xách bình thay vì đội. Người coi cửa thở phào, cho đi ngay, không hỏi thêm chuyện dáng người.

<a id="gk_mep_bong_muon_cua_nguoi_sau"></a>
## Mép bóng mượn của người sau — `gk_mep_bong_muon_cua_nguoi_sau`

- Loại: story; nguồn: Khám phá; chủ đề: Thiên ma; cảm xúc: Kinh dị.
- Nơi: thiên lộ.
- Điều kiện: tầng 4; một lần/kiếp.
- Bối cảnh tác giả: Đoạn đường qua trời đứng bóng.
- Vai: `{"a":{"gender":"nam","role":"thiên ma","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Bóng ngươi chậm một nhịp, còn bóng của người trước ngươi đứng yên. Thiên ma {$a.ten} đang giẫm lên cả hai, nhưng dưới chân hắn chẳng có một vệt tối.

### Lựa chọn

- **1. Giao đấu với {$a.ten} bằng vật giữ thần**
  - `fight`: `{"k":"thienma","n":"{$a.ten}"}`
  - **Thắng trận**: Ngươi lấy lại hai cái bóng và đẩy hắn khỏi đường.
    `{"e":{"karma":4}}`
  - **Thua trận**: Thua, ngươi phải rút lui, cái bóng bước trước ngươi đúng một nhịp.
- **2. Dùng thần niệm tạo bóng thay thế**
  Ngươi dựng bóng giả, để thiên ma tưởng đã lấy đủ mà thả hai người. Qua khỏi đoạn đường, ngươi mới tán bóng, hao một phần khí giữ thần. Nó nhận ra thì cả hai đã đi xa.
  - `cost`: `{"mp":"20%"}`
  - `e`: `{"karma":2,"tamma":-2}`
- **3. Bỏ đi**
  Người đứng trước bước tiếp. Bóng của y còn đợi thêm một bước mới chịu theo.

<a id="gk_hai_bac_nhin_xuong_nha"></a>
## Hai bậc nhìn xuống nhà — `gk_hai_bac_nhin_xuong_nha`

- Loại: story; nguồn: Khám phá; chủ đề: Nhân quả; cảm xúc: Cảm động.
- Nơi: thiên lộ.
- Điều kiện: tầng 4; một lần/kiếp.
- Bối cảnh tác giả: Thềm ngọc trông về phàm thế.
- Vai: `{"a":{"gender":"nam","role":"Tu sĩ","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Tu sĩ {$a.ten} chỉ nhìn thấy {$que} khi đứng ở bậc thấp. Ngươi đứng cùng chỗ lại thấy nơi lão sinh ra. Trên cả hai bậc có một vệt lõm do người ta quỳ lâu.

### Lựa chọn

- **1. Đổi phần nhìn của hai người bằng thần niệm**
  Ngươi đổi phần nhìn bằng thần niệm, để mỗi người thấy quê mình một lát. Lão bật cười khi thấy cây trước sân đã lớn hơn mái nhà. Ngươi ngồi lại tới khi phép khép, không ai giục ai nói.
  - `e`: `{"karma":4,"an":["a","hai bậc nhìn xuống nhà"]}`
- **2. Ghi cảnh quê lão vào pháp khí để đổi lấy tin đường**
  Ngươi biết một lối ngắn. Lão ôm pháp khí xem, lấy tay che riêng mái nhà đã sập.
  - `e`: `{"karma":-1,"tv":2}`
- **3. Bỏ đi**
  Ngươi kể lão nghe mái nhà mình đang thấy, rồi nhờ lão tả lại quê ngươi. Đứng thêm một lúc, hai người cùng xuống thềm.

<a id="gk_o_cua_nho_hon_tieng_goi"></a>
## Ô cửa nhỏ hơn tiếng gọi — `gk_o_cua_nho_hon_tieng_goi`

- Loại: story; nguồn: Khám phá; chủ đề: Chuyện thời gian; cảm xúc: Kinh dị.
- Nơi: thiên lộ.
- Điều kiện: tầng 4; một lần/kiếp.
- Bối cảnh tác giả: Hành lang của người nghe vọng.
- Vai: `{"a":{"gender":"nam","role":"Người giữ cửa","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Tiếng trẻ con lọt qua một ô cửa vừa bằng đồng tiền. Người giữ cửa {$a.ten} bảo giọng ấy đã già đi nhiều lần, nhưng mỗi khi người ta ghé tai, nó lại gọi “mẹ”.

### Lựa chọn

- **1. Mở ô bằng một phần thọ nguyên**
  Ngươi đổi một phần thọ nguyên để mở rộng ô cửa. Sau đó chỉ có phòng trống và chiếc nôi lật; tiếng gọi tiếp tục già đi, cho tới khi một người già hỏi con đã về chưa. Ngươi khép cửa, hiểu mình không thể bước vào đúng thời người ấy chờ.
  - `e`: `{"karma":4,"lifeCut":3,"tamma":-3}`
- **2. Dùng ô cửa nghe một lời sắp tới**
  Ngươi tránh được một lần sập lối. Sau đó, ở đầu giường ngươi có tiếng một người tập nói.
  - `e`: `{"van":1,"tamma":3}`
- **3. Bỏ đi**
  Khi ngang ô kế, ngươi nghe một người già cất lời ru rất vụng.

<a id="gk_tay_vin_du_mot_nguoi_giu"></a>
## Tay vịn đủ một người giữ — `gk_tay_vin_du_mot_nguoi_giu`

- Loại: story; nguồn: Khám phá; chủ đề: Luật đường ngọc; cảm xúc: Phẫn nộ.
- Nơi: thiên lộ.
- Điều kiện: tầng 4; một lần/kiếp.
- Bối cảnh tác giả: Mép cầu vắng bóng.
- Vai: `{"a":{"gender":"nam","role":"Tu sĩ","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Đường chỉ nâng tay vịn cho ai đã đi qua một lần. Tu sĩ {$a.ten} ngã giữa cầu lần đầu, phía trước người khác giơ một tấm bài đổi lượt qua.

### Lựa chọn

- **1. Đi lùi để nhường tay vịn đang có cho {$a.ten}**
  Ngươi đi lùi, dẫn phần tay vịn cầu dành cho mình tới chỗ tu sĩ đang ngã. Y bám được, sang bờ rồi cúi đầu cảm tạ. Ngươi phải chờ cầu trở lại, nhưng có thêm một người ngồi đợi cùng.
  - `e`: `{"karma":4,"h":12,"an":["a","tay vịn đủ một người giữ"]}`
- **2. Mua lượt để kéo cả hai qua**
  Hai người an toàn, kẻ bán lượt treo thêm bảng ở đầu cầu. {$a.ten} gấp tiền lẻ còn lại vào vạt áo rách.
  - `cost`: `{"st":22}`
  - `e`: `{"karma":2}`
- **3. Bỏ đi**
  {$a.ten} bò tiếp, thẻ lượt vẫn đung đưa ngang đầu.

<a id="gk_cuong_la_ganh_mot_vung_troi"></a>
## Cuống lá gánh một vùng trời — `gk_cuong_la_ganh_mot_vung_troi`

- Loại: story; nguồn: Khám phá; chủ đề: Ngộ đạo; cảm xúc: Trầm tĩnh.
- Nơi: thiên lộ.
- Điều kiện: tầng 4; một lần/kiếp.
- Bối cảnh tác giả: Vườn nổi trên cổ lộ.
- Vai: `{"a":{"gender":"nam","role":"người tỉa cây","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Cây nhỏ chịu sức nặng của cả mái trời, cuống lá nào cũng cong. Người tỉa cây {$a.ten} dặn ngươi chờ lá rơi, rồi đặt giỏ dưới một cành vẫn thẳng.

### Lựa chọn

- **1. Đỡ chiếc lá đầu tiên mà không nâng cả cành**
  Ngươi chỉ đỡ chiếc lá, không đưa lực vào cả cành. Thần niệm vừa đủ, sức nặng bỗng tan đi. Người tỉa cây gật đầu, đưa ngươi chiếc giỏ rồi chỉ sang cành kế tiếp: “Thử lại đi, đừng vội cho là đã hiểu.”
  - `e`: `{"tv":5}`
- **2. Cắt cành thẳng để lấy linh mộc**
  Ngươi có đoạn mộc chịu sức ép lớn. Cành bên cạnh cong xuống thêm, {$a.ten} kê giỏ cao hơn.
  - `e`: `{"karma":-2,"namedMat":"story_mat_cuong_la_ganh_mot_vung_troi"}`
- **3. Bỏ đi**
  Chiếc lá đầu tiên rơi, lão nhấc giỏ lệch sang một chút.

<a id="gk_mot_vong_quay_doi_gio_com"></a>
## Một vòng quay đổi giờ cơm — `gk_mot_vong_quay_doi_gio_com`

- Loại: story; nguồn: Khám phá; chủ đề: Chuyện cổ lộ; cảm xúc: Hài hước.
- Nơi: thiên lộ.
- Điều kiện: tầng 4; một lần/kiếp.
- Bối cảnh tác giả: Bếp có lò chạy ngược.
- Vai: `{"a":{"gender":"nam","role":"Người giữ bếp","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Người giữ bếp {$a.ten} quay lò ngược một vòng, cơm khê trở lại thành gạo. Lão lỡ quay thêm, chiếc bát bên trong cũng trở lại thành đất chưa nung. Khách đang đợi cơm nhìn nhau; lão hỏi có ai giỏi nhớ giờ không.

### Lựa chọn

- **1. Đứng giữ một mốc giờ cho lão**
  Ngươi giữ mốc bằng thần niệm, bảo lão dừng đúng lúc cơm vừa chín. Cả quán được ăn, bát cũng còn nguyên. Lão mời ngươi phần cơm đầu, quyết định từ mai nấu bằng lò thường.
  - `e`: `{"karma":2}`
- **2. Mua lò để sửa một món vừa hỏng**
  Món đồ lành lại, kèm theo cái túi ngươi đã dùng bọc nó lần đầu. Cái túi còn một nắm gạo.
  - `cost`: `{"st":22}`
  - `e`: `{"item":"story_item_mot_vong_quay_doi_gio_com"}`
- **3. Bỏ đi**
  Ngươi sang quán khác ăn. Vừa ra cửa đã nghe lão gọi người bán bát, lần này xin mua loại không đắt quá.

<a id="gk_manh_dem_va_ban_ngay"></a>
## Mảnh đêm vá ban ngày — `gk_manh_dem_va_ban_ngay`

- Loại: story; nguồn: Khám phá; chủ đề: Thiên tượng; cảm xúc: Bất an.
- Nơi: thiên lộ.
- Điều kiện: tầng 4; một lần/kiếp.
- Bối cảnh tác giả: Cổng chia ngày đêm.
- Vai: `{"a":{"gender":"nam","role":"Người coi cổng","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Một lỗ thủng để ban ngày chảy sang phía đêm. Người coi cổng {$a.ten} vá bằng vải tối, nhưng kim vừa chạm đã lộ rõ máu dưới móng. Người qua lại bàn tán: “Ngủ qua lỗ thủng sẽ không mơ.” “Người sống dưới đó phơi áo suốt đêm, mà áo chẳng khô.”

### Lựa chọn

- **1. Khâu bằng bóng của ngươi**
  Ngươi dẫn bóng mình qua mép thủng, giữ hai phía khép lại cho người coi cổng khâu xong. Thần niệm hao nhiều, bóng dưới chân còn hở một đoạn vai. Lão chỉ ngươi cách dưỡng lại bóng, dặn đừng qua cổng khác trước khi lành.
  - `cost`: `{"mp":"20%"}`
  - `e`: `{"karma":4,"tam":1}`
- **2. Hứng phần ban ngày rỉ ra vào bình**
  Ngươi có ánh dùng trong lúc bế quan. {$a.ten} rút kim, dưới kia có người dập đèn quá sớm.
  - `e`: `{"tv":4,"karma":-3,"tamma":2}`
- **3. Bỏ đi**
  Lão kéo vạt áo che lỗ, tay áo sáng lên ở đường chỉ.

<a id="gk_nguoi_quet_bui_tren_mat_tran"></a>
## Người quét bụi trên mặt trăng — `gk_nguoi_quet_bui_tren_mat_tran`

- Loại: story; nguồn: Khám phá; chủ đề: Chuyện thường ngày; cảm xúc: Lắng dịu.
- Nơi: thiên lộ.
- Điều kiện: tầng 4; một lần/kiếp.
- Bối cảnh tác giả: Sân phơi ánh trăng.
- Vai: `{"a":{"gender":"nam","role":"Người quét sân","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Người quét sân {$a.ten} quét dấu giày khỏi mặt trăng trước khi thả xuống thấp. Có một dấu chân nhỏ lão luôn quét vòng qua, gót đã nhòe do nhiều lần trăng khuyết.

### Lựa chọn

- **1. Gánh giúp một lượt bụi trăng**
  Ngươi gánh một lượt bụi trăng tới bờ sân, mỗi bước nặng thêm cho tới sáng. Lão mời ngươi ngồi ngắm trăng hạ xuống, kể dấu chân nhỏ là của người con từng chạy chơi ở đây. Hôm nay lão kể mà đã có thể cười.
  - `e`: `{"karma":4,"an":["a","người quét bụi trên mặt trăng"],"h":12}`
- **2. Mua dấu chân để luyện pháp bước không dấu**
  Ngươi có thêm một phép ẩn bước. Lão vẫn quét vòng qua chỗ ấy, dù nền đã sạch.
  - `cost`: `{"st":22}`
  - `e`: `{"tp":1}`
- **3. Bỏ đi**
  Trăng hạ thấp. Cái chổi đặt ngang sân, đầu cán chỉ vào dấu chân.

<a id="gk_hat_bui_co_tieng_vo"></a>
## Hạt bụi có tiếng vỡ — `gk_hat_bui_co_tieng_vo`

- Loại: story; nguồn: Khám phá; chủ đề: Di tích cổ lộ; cảm xúc: Bi thương.
- Nơi: thiên lộ.
- Điều kiện: tầng 4; một lần/kiếp.
- Bối cảnh tác giả: Phòng giữ vật đã mất.
- Vai: `{"a":{"gender":"nam","role":"Người giữ phòng","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Mỗi hạt bụi giữ một tiếng của vật vỡ ra. Người giữ phòng {$a.ten} lật vỉ bụi để tìm tiếng chén mẹ làm rơi, trước mặt có một cái chén khác đã dùng đến mòn.

### Lựa chọn

- **1. Dùng thần niệm nghe từng hạt cùng lão**
  Ngươi cùng lão nghe từng hạt bụi tới tê tai. Tìm được tiếng chén vỡ, cả hai còn nghe tiếng mẹ lão mắng vì chân trần chạy vào nhặt. Lão cười rất lâu rồi xin giữ riêng hạt ấy, không tìm nữa.
  - `e`: `{"karma":4,"an":["a","hạt bụi có tiếng vỡ"],"hp":"-10%"}`
- **2. Gom cả vỉ làm pháp khí phá âm**
  Ngươi có vật chặn một tiếng lớn. Đêm ấy, bên trong nó có một tiếng cười theo sau tiếng chén rơi.
  - `e`: `{"tamma":3,"namedRelic":{"k":"linh","name":"Chuông Chặn Âm","lore":"Ngươi có vật chặn một tiếng lớn. Đêm ấy, bên trong nó có một tiếng cười theo sau tiếng chén rơi."}}`
- **3. Bỏ đi**
  Lão rót nước vào cái chén đang cầm, rót vừa tới chỗ sứt.

<a id="gk_san_buoc_qua_mot_lan_noi_gia"></a>
## Sân bước qua một lần nổi giận — `gk_san_buoc_qua_mot_lan_noi_gia`

- Loại: story; nguồn: Khám phá; chủ đề: Tâm ma; cảm xúc: Căng thẳng.
- Nơi: thiên lộ.
- Điều kiện: tầng 4; một lần/kiếp.
- Bối cảnh tác giả: Sân thử kiếm giữa hư không.
- Vai: `{"a":{"gender":"nam","role":"Người thu kiếm","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Một thanh kiếm dựng đứng, mỗi lần ngươi nhớ tới người mình căm, nó lại quay về hướng ấy. Người thu kiếm {$a.ten} đã đặt ba vỏ kiếm quanh sân, vỏ nào cũng rỗng.

### Lựa chọn

- **1. Đấu với kiếm ảnh do cơn giận của ngươi sinh ra**
  - `fight`: `{"k":"kiemlinh","n":"Kiếm ảnh của cơn giận"}`
  - **Thắng trận**: Ngươi ghìm được mũi kiếm trước khi nó tìm người kia.
    `{"e":{"karma":4}}`
  - **Thua trận**: Thua, thần thức rách một đường, ngươi lùi khỏi sân với vị sắt trong miệng.
- **2. Hạ một vỏ xuống và đợi cơn giận nguội**
  Ngươi hạ vỏ kiếm, ngồi chờ tới khi nghĩ được chuyện khác ngoài người mình giận. Kiếm vào vỏ, cơ hội luyện kiếm khí cũng qua. Người thu kiếm hỏi ngươi có tiếc không; ngươi nhận kiếm rồi lên đường.
  - `e`: `{"tamma":-6,"tam":1}`
- **3. Bỏ đi**
  Kiếm quay thêm một vòng, rồi chỉ thẳng theo lưng ngươi.

<a id="gk_mot_cai_o_co_hai_cai_bong"></a>
## Một cái ô có hai cái bóng — `gk_mot_cai_o_co_hai_cai_bong`

- Loại: story; nguồn: Khám phá; chủ đề: Tu hành và thời gian; cảm xúc: Lãng mạn.
- Nơi: thiên lộ.
- Điều kiện: tầng 4; một lần/kiếp.
- Bối cảnh tác giả: Đường có hai vầng sáng.
- Vai: `{"a":{"gender":"nam","role":"Tu sĩ","alignment":"context"},"b":{"gender":"nam","role":"tu sĩ","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Tu sĩ {$a.ten} đi dưới ô với tu sĩ {$b.ten}, hai cái bóng theo hai chiều ngược nhau. Khi họ cùng nhấc tay, chiếc ô chỉ chịu ngả về phía người sống lâu hơn.

### Lựa chọn

- **1. Chia bớt một phần thọ nguyên để giữ ô thẳng**
  Ngươi chia một phần thọ nguyên để hai luồng sáng dưới ô cân lại. Hai người đi cùng tốc độ được một đoạn, vui vẻ cảm tạ ngươi. Tới ngã rẽ, họ tự chọn đường còn có thể đi chung, không xin ngươi chia thêm tuổi.
  - `e`: `{"karma":4,"lifeCut":3,"an":["a","một cái ô có hai cái bóng"]}`
- **2. Đổi chiếc ô lấy đường tắt**
  Họ dùng đường tắt rời tầng sáng. Chiếc ô của ngươi từ đó chỉ che được một bên vai.
  - `e`: `{"karma":-1}`
- **3. Bỏ đi**
  Người đi chậm đổi tay giữ cán. Một cái bóng vẫn dừng lại đợi.

<a id="gk_ao_giap_chua_lo_nghe_tim"></a>
## Áo giáp chừa lỗ nghe tim — `gk_ao_giap_chua_lo_nghe_tim`

- Loại: story; nguồn: Khám phá; chủ đề: Pháp khí; cảm xúc: Xót xa.
- Nơi: thiên lộ.
- Điều kiện: tầng 4; một lần/kiếp.
- Bối cảnh tác giả: Xưởng thử giáp trên cổ lộ.
- Vai: `{"a":{"gender":"nam","role":"Thợ giáp","alignment":"context"},"b":{"gender":"nam","role":"tu sĩ","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Bộ giáp ngăn cả gió hư không lẫn tiếng động, người mặc lâu dễ mất cảm giác về nhịp thở của mình. Thợ giáp {$a.ten} chừa một khe nhỏ dẫn tiếng tim lên tai, còn tu sĩ {$b.ten} muốn bịt để giáp kín hơn. Hắn cầm miếng kim loại, chưa quyết.

### Lựa chọn

- **1. Dùng linh lực giúp thợ đặt vòng chắn gió quanh khe**
  Ngươi giữ linh lực cho thợ khắc một vòng chắn gió riêng, để khe vẫn truyền tiếng tim. Tu sĩ mặc thử, nghe được nhịp mình mà không còn gió lọt. Hắn hỏi kỹ cách bảo dưỡng rồi mới nhận giáp.
  - `cost`: `{"mp":"20%"}`
  - `e`: `{"karma":4,"an":["a","áo giáp chừa lỗ nghe tim"]}`
- **2. Bịt lỗ và lấy công rèn**
  Ngươi giúp bịt khe, nhận công rèn. Giáp kín, nhưng tu sĩ phải tự dừng lại kiểm mạch sau mỗi đoạn đường dài. Hắn nghe ngươi dặn hết rồi mới rời xưởng.
  - `e`: `{"st":24,"karma":-1}`
- **3. Bỏ đi**
  {$a.ten} đặt miếng bịt vào lỗ. Tới lúc người mặc hít vào mới nhấc ra.

<a id="gk_phan_troi_mong_hon_mot_dong"></a>
## Phần trời mỏng hơn một đồng — `gk_phan_troi_mong_hon_mot_dong`

- Loại: story; nguồn: Khám phá; chủ đề: Nhân quả; cảm xúc: Căng thẳng.
- Nơi: thiên lộ.
- Điều kiện: tầng 4; một lần/kiếp.
- Bối cảnh tác giả: Sân trải bản đồ trời.
- Vai: `{"a":{"gender":"nam","role":"Người canh bản đồ","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Bản đồ cổ lộ mỏng dần ở nơi ít người quay lại. Người canh bản đồ {$a.ten} chỉ một trạm nghỉ sắp rách, trên giấy còn in bóng hai bát nước.

### Lựa chọn

- **1. Đi ngược đường đặt lại dấu chân**
  Ngươi quay lại trạm cũ, chậm mất một lượt mở đường lên. Có người thấy dấu chân mới cũng ghé vào nghỉ, nét bản đồ dày trở lại. Người coi trạm hỏi ngươi có ở lâu không, ngươi bảo đủ một ấm trà.
  - `e`: `{"karma":4,"h":24}`
- **2. Cắt phần giấy sắp rách làm phù qua đường**
  Ngươi mở được một lối đi nhanh. Chỗ từng là trạm nghỉ chỉ còn hai vòng bát, dính sát vào nhau.
  - `e`: `{"karma":-3,"pill":1}`
- **3. Bỏ đi**
  {$a.ten} ép một đồng xuống mép giấy. Gió thổi, đồng tiền không nhúc nhích, còn một bát đã mờ.
