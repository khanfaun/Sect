# content/events/stories/cuu-u.json

Nguồn chuẩn: `content/events/stories/cuu-u.json`. Bản đọc tự sinh. Cú pháp: xem [guideline](../../GUIDELINE.md).

<a id="gk_giot_dau_khong_ben_lua"></a>
## Giọt dầu không bén lửa — `gk_giot_dau_khong_ben_lua`

- Loại: story; nguồn: Khám phá; chủ đề: Đêm lạnh; cảm xúc: Kinh dị.
- Nơi: ma địa.
- Điều kiện: tầng 3; một lần/kiếp.
- Bối cảnh tác giả: Dãy đèn dưới vực.
- Vai: `{"a":{"gender":"nam","role":"Người châm đèn","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Người châm đèn {$a.ten} thử ba lần, bấc vẫn không bén. Lão soi bóng mình lên vách: có một cái miệng đang thổi, trong khi miệng lão ngậm kín. Thấy ngươi nhìn, cái miệng trong bóng từ từ dừng lại.

### Lựa chọn

- **1. Đổi dầu rồi đốt lại từ đèn của ngươi**
  Ngươi thay dầu rồi truyền lửa sang, giữ phù quanh bóng cho tới khi nó khớp lại với người. Lão cầm đèn đi thử vài bước, không còn ai thổi nữa. Ngươi hao pháp lực, phải ngồi lại dưỡng khí trước khi đi.
  - `cost`: `{"mp":"20%"}`
  - `e`: `{"karma":4,"tamma":-3}`
- **2. Thu giọt dầu vào phù**
  Ngươi luyện được một lá phù dập lửa. Mỗi lần châm đèn, ngươi phải đợi một hơi thở sau gáy mới thấy lửa bắt.
  - `e`: `{"pill":1,"tamma":4}`
- **3. Bỏ đi**
  {$a.ten} đợi đến khi cái bóng thôi phồng má rồi mới bước.

<a id="gk_cai_mieng_giau_trong_vai"></a>
## Cái miệng giấu trong vai — `gk_cai_mieng_giau_trong_vai`

- Loại: story; nguồn: Khám phá; chủ đề: Luyện thi; cảm xúc: Bất an.
- Nơi: ma địa.
- Điều kiện: tầng 3; một lần/kiếp.
- Bối cảnh tác giả: Sân chắp xương.
- Vai: `{"a":{"gender":"nam","role":"Thợ chắp xương","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Thợ chắp xương {$a.ten} gắn nhầm một đốt hàm vào vai thi thể. Mỗi lúc lão đặt tay lên đúng chỗ, cái miệng gọi lão bằng một tiếng thân thuộc.

### Lựa chọn

- **1. Rút đốt hàm và trả về phần cốt**
  Ngươi dùng phù ở bàn khâu giữ thi thể nằm yên, giúp lão rút phần hàm trả về đúng bộ cốt. Tiếng gọi tắt. Lão xin chôn riêng bộ cốt, rồi tự thu dọn bàn, không nhận thêm việc trong hôm ấy.
  - `e`: `{"karma":4,"tamma":-3}`
- **2. Mua thi thể để hỏi chuyện người đã khuất**
  Cái miệng nói đúng về một lối cất đồ. Đêm sau nó dùng giọng ngươi gọi từ phía vai.
  - `cost`: `{"st":19}`
  - `e`: `{"tamma":5,"item":"story_item_cai_mieng_giau_trong_vai"}`
- **3. Bỏ đi**
  Lão khoác áo cho thi thể, chừa chỗ vai vừa đủ hở.

<a id="gk_gio_am_cua_cho_tro"></a>
## Giờ ấm của chợ tro — `gk_gio_am_cua_cho_tro`

- Loại: story; nguồn: Khám phá; chủ đề: Chuyện cộng đồng; cảm xúc: Ấm áp.
- Nơi: ma địa.
- Điều kiện: tầng 3; một lần/kiếp.
- Bối cảnh tác giả: Lán nghỉ ven đường hầm.
- Vai: `{"a":{"gender":"nam","role":"người giữ lán","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Người đi đường góp tro nóng vào một lò chung. Người giữ lán {$a.ten} gõ từng cục than xem có lửa, cục nhẹ nhất được đặt vào dưới chỗ một đứa bé đang ngủ.

### Lựa chọn

- **1. Góp phần linh hỏa dưỡng thân**
  Ngươi góp linh hỏa giữ lò ấm thêm một canh. Người trong lán dời ra cho khách mới vào, gọi ngươi ngồi ăn chút gì nóng. Đứa bé tỉnh giấc đòi nghe tiếp chuyện lúc nãy, cả lán lại có tiếng nói cười.
  - `cost`: `{"mp":"20%"}`
  - `e`: `{"karma":4,"an":["a","giờ ấm của chợ tro"]}`
- **2. Đổi tro tốt lấy một chỗ nằm gần lò**
  Ngươi ngủ được một canh. Tới lúc đi, {$a.ten} đưa một tấm đệm cho đứa bé nằm vào chỗ còn ấm.
  - `e`: `{"karma":-2}`
- **3. Bỏ đi**
  Ngươi rời lán sau khi hơ tay. Người giữ lò nhắc đoạn đường trước mặt có gió lùa, dặn ngươi buộc kín cổ áo.

<a id="gk_muon_tuoi_qua_mua_ret"></a>
## Mượn tuổi qua mùa rét — `gk_muon_tuoi_qua_mua_ret`

- Loại: story; nguồn: Khám phá; chủ đề: Thọ nguyên; cảm xúc: Day dứt.
- Nơi: ma địa.
- Điều kiện: tầng 3; một lần/kiếp.
- Bối cảnh tác giả: Nhà đo tuổi.
- Vai: `{"a":{"gender":"nam","role":"Ma tu","alignment":"context"},"b":{"gender":"nu","role":"Người mẹ","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Ma tu {$a.ten} cho người bệnh vay thọ nguyên, thu lãi bằng số mùa họ muốn giữ lại. Người mẹ {$b.ten} đặt ngón tay lên dấu mực chỉ tuổi của mình, ngay cạnh một vệt nhỏ hơn của con.

### Lựa chọn

- **1. Trả một phần thọ nguyên để hủy lãi**
  Ngươi chuyển một phần thọ nguyên để xóa số lãi hai mẹ con còn thiếu, bắt chủ nợ trả bản khế đã sửa. Người mẹ đọc lại ngày hết nợ hai lần rồi mới dám nhận. Ngươi thấy mình già thêm, cần ngồi xuống một lát.
  - `e`: `{"karma":4,"lifeCut":3,"an":["a","mượn tuổi qua mùa rét"]}`
- **2. Mua món nợ để thu vào mùa sau**
  Ngươi có quyền lấy thọ nguyên kèm lời cam kết. Đứa trẻ tập viết ngày trả bằng nét rất chậm.
  - `cost`: `{"st":19}`
  - `e`: `{"st":40,"karma":-5,"tamma":4}`
- **3. Bỏ đi**
  {$b.ten} nhấc tay lên, để lại một dấu xám trên vệt tuổi của con.

<a id="gk_bat_canh_danh_cho_nguoi_cam"></a>
## Bát canh dành cho người câm — `gk_bat_canh_danh_cho_nguoi_cam`

- Loại: story; nguồn: Khám phá; chủ đề: Oán hồn; cảm xúc: Cảm động.
- Nơi: ma địa.
- Điều kiện: tầng 3; một lần/kiếp.
- Bối cảnh tác giả: Hốc bếp trong vách.
- Vai: `{"a":{"gender":"nu","role":"Bà nấu canh","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Bà nấu canh {$a.ten} bỏ một bát canh bên mép hốc. Oán hồn thường đến đã mất lưỡi. Mỗi lần uống xong chỉ dùng ngón tay chấm vệt lên thành bát.

### Lựa chọn

- **1. Đọc vệt tay và đưa nó tìm hài cốt**
  Ngươi lần theo những dấu tay oán hồn vẽ, mất một đêm mới tìm được nơi chôn cốt. Chôn lại xong, nó trở về bếp cúi đầu chào bà rồi tan đi. Bà hỏi ngươi còn đói không, trong nồi vẫn đủ một bát.
  - `e`: `{"karma":4,"an":["a","bát canh dành cho người câm"],"h":24,"tamma":-2}`
- **2. Hỏi đường tắt đổi lấy bát canh của mình**
  Oán hồn chỉ đúng đường. Nó chấm lên hai bát, vệt thứ hai nhỏ hơn.
  - `e`: `{"karma":-2}`
- **3. Bỏ đi**
  Bà đặt thêm chén nước bên cạnh để nó dễ vẽ. Ngươi đi khỏi, để hai người tiếp tục câu chuyện không thành tiếng.

<a id="gk_hai_cot_che_doi_ung"></a>
## Hài cốt chê đôi ủng — `gk_hai_cot_che_doi_ung`

- Loại: story; nguồn: Khám phá; chủ đề: Luyện thi; cảm xúc: Hài hước.
- Nơi: ma địa.
- Điều kiện: tầng 3; một lần/kiếp.
- Bối cảnh tác giả: Quầy sửa đồ đi đêm.
- Vai: `{"a":{"gender":"nam","role":"Thi công","alignment":"context"},"b":{"gender":"nam","role":"Người đóng ủng","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Thi công {$a.ten} nhất quyết đòi trả ủng, bảo người đóng đã làm hai chiếc chân phải. Người đóng ủng {$b.ten} tháo ra kiểm, phát hiện khách được ghép cả hai chân trái. Hai người im lặng nhìn nhau, rồi cùng hỏi ngươi nên sửa bên nào.

### Lựa chọn

- **1. Đổi một chiếc ủng của ngươi cho hắn thử**
  Ngươi cho hắn thử một chiếc ủng rộng hơn. Hắn đi được vài bước, quay lại nhận mình trách nhầm thợ. Người đóng ủng hẹn sửa đúng cỡ, nhưng yêu cầu hắn đừng tự đổi xương trước ngày lấy.
  - `e`: `{"karma":2}`
- **2. Đổi hai chân cho vừa ủng**
  Hắn đứng thẳng một lát rồi cúi xin đổi lại vì chân mới quen đi trước. {$b.ten} ghi cả hai cỡ lên một miếng da.
  - `e`: `{"karma":1,"tamma":2}`
- **3. Bỏ đi**
  Thi công ngồi xuống chờ đo lại, còn người đóng ủng đem bảng giá bổ sung một dòng: xin kiểm đủ chân trước khi đặt.

<a id="gk_nut_that_giu_cau_noi_cuoi"></a>
## Nút thắt giữ câu nói cuối — `gk_nut_that_giu_cau_noi_cuoi`

- Loại: story; nguồn: Khám phá; chủ đề: Tang tục; cảm xúc: Bi thương.
- Nơi: ma địa.
- Điều kiện: tầng 3; một lần/kiếp.
- Bối cảnh tác giả: Cửa đường tống táng.
- Vai: `{"a":{"gender":"nu","role":"Cô gái đưa tang","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Cô gái đưa tang {$a.ten} giữ nút dây chứa lời cuối của chị. Mở nút thì lời sẽ vang lên một lần rồi mất, nên qua ba cửa vực nàng vẫn chưa dám nghe. Nàng hỏi ngươi có vật nào giữ lại tiếng người được không.

### Lựa chọn

- **1. Dùng thần niệm giúp nàng nghe rõ lời cuối**
  Ngươi giữ tiếng trong thần niệm, đọc lại cho nàng nghe trọn lời dặn về chỗ cất chum trong nhà. Nàng nghe thêm lần nữa rồi tự tháo nút. Khi nàng chào, ngươi biết nàng đã sẵn sàng trở về.
  - `cost`: `{"mp":"20%"}`
  - `e`: `{"karma":4,"an":["a","nút thắt giữ câu nói cuối"]}`
- **2. Mua nút để dùng vào thuật truyền âm**
  Nàng có tiền lo an táng. Khi ngươi mở nút, giọng bên trong hỏi ai đã nhấc chum đi.
  - `cost`: `{"st":19}`
  - `e`: `{"karma":1}`
- **3. Bỏ đi**
  Nàng tháo sợi dài khỏi cổ tay, giữ nguyên đúng một nút.

<a id="gk_nap_hom_co_then_ngoai"></a>
## Nắp hòm có then ngoài — `gk_nap_hom_co_then_ngoai`

- Loại: story; nguồn: Khám phá; chủ đề: Chuyện ma môn; cảm xúc: Phẫn nộ.
- Nơi: ma địa.
- Điều kiện: tầng 3; một lần/kiếp.
- Bối cảnh tác giả: Sân phạt của [tông môn ma đạo].
- Vai: `{"a":{"gender":"nam","role":"Giám thi","alignment":"context"},"b":{"gender":"nam","role":"đệ tử","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Giám thi {$a.ten} bảo đệ tử {$b.ten} đã chết, cần nhốt trong hòm để giữ hồn. Nhưng từ bên trong vang tiếng đòi nước, rồi có bàn tay đẩy nắp lên. Giám thi gài thêm then ngoài, ngăn ngươi tới gần.

### Lựa chọn

- **1. Phá then và giao đấu với {$a.ten}**
  - `fight`: `{"k":"luyenthi","n":"{$a.ten}"}`
  - **Thắng trận**: Ngươi đưa {$b.ten} ra và lấy lại phù giữ hồn.
    `{"e":{"karma":4}}`
  - **Thua trận**: Thua, ngươi bị đánh bật khỏi sân, còn người trong hòm tự nhét bùa ra khe.
- **2. Đổi pháp khí lấy quyền mở hòm**
  {$a.ten} nhận giá, {$b.ten} bước ra mà vẫn ôm nắp hòm như ôm một tấm chăn.
  - `cost`: `{"st":19}`
  - `e`: `{"karma":4}`
- **3. Bỏ đi**
  Ngươi nghe người trong hòm hít vào ngay lúc then thứ hai sập xuống.

<a id="gk_mach_nuoc_khong_nhan_mau"></a>
## Mạch nước không nhận máu — `gk_mach_nuoc_khong_nhan_mau`

- Loại: story; nguồn: Khám phá; chủ đề: Ngộ đạo; cảm xúc: Trầm tĩnh.
- Nơi: ma địa.
- Điều kiện: tầng 3; một lần/kiếp.
- Bối cảnh tác giả: Hõm đá có mạch nước.
- Vai: `{"a":{"gender":"nam","role":"Tu sĩ","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Nước rỉ qua đá, gặp máu là vòng sang bên. Tu sĩ {$a.ten} rửa vết thương đã lâu mà tay vẫn khô, một giọt nước treo ngay trên khớp.

### Lựa chọn

- **1. Dẫn khí quanh vết thương thay vì ép vào**
  Ngươi thử dẫn khí vòng quanh phần mạch đang tổn thương, để nó tự khép thay vì ép mạnh vào. Cơn đau dịu xuống. Tu sĩ bên cạnh làm theo, cuối cùng rửa được bàn tay trong dòng nước.
  - `e`: `{"tv":5}`
- **2. Giữ mạch nước để luyện công pháp khắc huyết**
  Ngươi có một bình nước lạ. Khi {$a.ten} đưa tay ra, mạch nước còn lại đổi sang bên kia vách.
  - `e`: `{"tv":4,"karma":-3,"tamma":3}`
- **3. Bỏ đi**
  {$a.ten} đưa bàn tay kia ra, chờ giọt nước chịu rơi.

<a id="gk_nguoi_than_tinh_theo_bai_vi"></a>
## Người thân tính theo bài vị — `gk_nguoi_than_tinh_theo_bai_vi`

- Loại: story; nguồn: Khám phá; chủ đề: Nhận nhầm thân thích; cảm xúc: Cẩu huyết.
- Nơi: ma địa.
- Điều kiện: tầng 3; một lần/kiếp.
- Bối cảnh tác giả: Nhà giữ đồ thừa kế.
- Vai: `{"a":{"gender":"nam","role":"Thiếu chủ","alignment":"context"},"b":{"gender":"nam","role":"ma tu","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Thiếu chủ {$a.ten} đem sáu bài vị tới nhận mình là cháu thất lạc của ma tu {$b.ten}. Khi hắn dâng hương, cả sáu bài vị cùng dịch sang phía người quét nhà.

### Lựa chọn

- **1. Xin người quét nhà tự dâng hương**
  Ngươi mời người quét nhà dâng hương. Sáu bài vị cùng quay về phía y, thiếu chủ cuống quýt thu gia phả. Ma tu bảo cả hai ở lại đối chứng, riêng ngươi được mời một chén trà vì đã ngăn việc nhận nhầm.
  - `e`: `{"karma":4}`
- **2. Đổi thứ tự bài vị để nhận phần gia sản**
  Hắn chia cho ngươi một món pháp khí. Tới giỗ, trong món ấy có sáu tiếng đồng thanh nhắc hắn quét sân.
  - `e`: `{"karma":-4,"tamma":2,"namedRelic":{"k":"phu","name":"Phù Sáu Bài Vị","lore":"Hắn chia cho ngươi một món pháp khí. Tới giỗ, trong món ấy có sáu tiếng đồng thanh nhắc hắn quét sân."}}`
- **3. Bỏ đi**
  Người quét nhà lấy chổi khều tàn hương. Cả sáu bài vị lùi lại cho chổi qua.

<a id="gk_huong_dot_tu_dau_chan"></a>
## Hương đốt từ đầu chân — `gk_huong_dot_tu_dau_chan`

- Loại: story; nguồn: Khám phá; chủ đề: Hạn chót; cảm xúc: Kinh dị.
- Nơi: ma địa.
- Điều kiện: tầng 3; một lần/kiếp.
- Bối cảnh tác giả: Hành lang thờ tro.
- Vai: `{"a":{"gender":"nam","role":"oán hồn","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Nén hương cháy từ phía chân cắm, còn oán hồn {$a.ten} quỳ phía trên. Khi lửa lên tới đầu hương, nó sẽ nhớ người từng nhốt mình, lúc này đang đứng sau ngươi.

### Lựa chọn

- **1. Bẻ hương và đưa cả hai cùng ra**
  Ngươi bẻ hương, giữ ký ức chưa tràn về hết để cả hai có một canh nói chuyện. Người đứng sau phải tự nhận việc đã làm, không còn núp sau lưng ngươi. Oán hồn nghe xong mới quyết có theo hắn ra ngoài hay không.
  - `e`: `{"karma":4,"tamma":-3}`
- **2. Để hương cháy hết rồi giữ người đứng sau**
  Oán hồn nhớ được tên kẻ đã hại mình. Trong lúc giằng co, móng tay nó cào thành một chữ thiếu nét trên áo ngươi.
  - `e`: `{"karma":2,"hp":"-10%","tamma":3}`
- **3. Bỏ đi**
  Nén hương ngã đúng lúc ngươi rời hành lang, đầu lửa vẫn hướng lên.

<a id="gk_hai_chiec_ghe_quay_lung"></a>
## Hai chiếc ghế quay lưng — `gk_hai_chiec_ghe_quay_lung`

- Loại: story; nguồn: Khám phá; chủ đề: Tình người trong ma vực; cảm xúc: Lãng mạn.
- Nơi: ma địa.
- Điều kiện: tầng 3; một lần/kiếp.
- Bối cảnh tác giả: Nhà sưởi kín gió.
- Vai: `{"a":{"gender":"nu","role":"Nữ ma tu","alignment":"context"},"b":{"gender":"nam","role":"Tu sĩ","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Nữ ma tu {$a.ten} chỉ giữ được thân thể khi có người áp lưng truyền khí. Tu sĩ {$b.ten} ngồi quay lưng sát nàng. Hai người nói chuyện qua một cái vai đã tê.

### Lựa chọn

- **1. Đốt đá ấm cho họ ngồi đối diện**
  Ngươi dùng linh lực làm ấm đá, thay cho phần khí người kia phải truyền liên tục. Hai người xoay ghế nhìn nhau. Nàng im lặng một lúc rồi bật cười: “Hóa ra ngươi nói chuyện cứ hay cau mày.”
  - `cost`: `{"mp":"20%"}`
  - `e`: `{"karma":4,"an":["a","hai chiếc ghế quay lưng"]}`
- **2. Đổi đá ấm lấy một đoạn công pháp**
  Họ có một đêm nhìn mặt nhau, ngươi có khẩu quyết. Nàng đặt chiếc ghế cũ sát vách để lần sau còn dùng.
  - `e`: `{"skill":1,"karma":-1}`
- **3. Bỏ đi**
  Ngươi rời nhà sưởi giữa lúc họ bàn xem mai ai đi mua củi. Người kia nhắc nàng nói chậm, lưng y đã tê đến không phân biệt được gật hay lắc.

<a id="gk_coi_nghien_chu_the"></a>
## Cối nghiền chữ thề — `gk_coi_nghien_chu_the`

- Loại: story; nguồn: Khám phá; chủ đề: Lời thề; cảm xúc: Xót xa.
- Nơi: ma địa.
- Điều kiện: tầng 3; một lần/kiếp.
- Bối cảnh tác giả: Phường giải khế.
- Vai: `{"a":{"gender":"nam","role":"Người giải khế","alignment":"context"},"b":{"gender":"nam","role":"Phu xe","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Người giải khế {$a.ten} đưa lời thề vào cối để xay bỏ. Phu xe {$b.ten} nhận ra tiếng vợ trong lần quay đầu tiên, còn dưới tay quay đã rơi xuống một ít mực khô.

### Lựa chọn

- **1. Giữ tay quay để hắn nghe hết lời thề**
  Ngươi giữ tay quay, chịu cơn đau của khế để người phu xe nghe hết lời vợ. Nàng chỉ dặn hắn đừng vì lời hẹn cũ mà sống một mình mãi. Hắn xin người giải khế xay tiếp, tự tay đỡ lấy phần giấy đã hết chữ.
  - `e`: `{"karma":4,"an":["a","cối nghiền chữ thề"],"hp":"-10%"}`
- **2. Thu mực để viết lời thề mới**
  Lời ngươi viết có sức ràng buộc. Mỗi khi dùng mực, trong chữ ký lại hiện một nét không thuộc về ngươi.
  - `e`: `{"karma":-3,"tamma":2,"namedMat":"story_mat_coi_nghien_chu_the"}`
- **3. Bỏ đi**
  {$a.ten} giảm tay. Cối mất thêm một vòng mới thôi nói.

<a id="gk_con_bui_bo_duoi_chan"></a>
## Cơn bụi bò dưới chân — `gk_con_bui_bo_duoi_chan`

- Loại: story; nguồn: Khám phá; chủ đề: Thiên tượng; cảm xúc: Hồi hộp.
- Nơi: ma địa.
- Điều kiện: tầng 3; một lần/kiếp.
- Bối cảnh tác giả: Đáy vực trong mùa bụi.
- Vai: `{"a":{"gender":"nam","role":"Người dẫn đường","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Bụi tro bò sát nền, hễ gặp người thở là dựng đứng. Người dẫn đường {$a.ten} nằm xuống, ép một chiếc khăn ướt lên mũi. Người qua lại bàn tán: “Bụi đi tìm hơi sống.” “Cứ để nó đi qua nơi có tiếng nước.”

### Lựa chọn

- **1. Dùng linh lực mở một đường nước chảy**
  Ngươi dẫn nước từ khe đá qua lối đi. Tro gặp nước hạ xuống, cả đoàn bám theo rãnh mà qua, không ai được chạy trước. Ra khỏi vùng bụi, ngươi phải nghỉ dưỡng khí; người dẫn đường nhận chờ cùng.
  - `cost`: `{"mp":"20%"}`
  - `e`: `{"karma":4}`
- **2. Dồn bụi về phía kho trống để thu linh tro**
  Ngươi lấy được nguyên liệu luyện trận. Lúc đóng kho, trong bụi hiện dấu một bàn chân đã đi xa.
  - `e`: `{"karma":-1,"namedMat":"story_mat_con_bui_bo_duoi_chan"}`
- **3. Bỏ đi**
  Ngươi bước lên đá cao, phía dưới chiếc khăn ướt đổi màu.

<a id="gk_mong_tay_tren_cua_luyen_thi"></a>
## Móng tay trên cửa luyện thi — `gk_mong_tay_tren_cua_luyen_thi`

- Loại: story; nguồn: Khám phá; chủ đề: Giao đấu; cảm xúc: Căng thẳng.
- Nơi: ma địa.
- Điều kiện: tầng 3; một lần/kiếp.
- Bối cảnh tác giả: Nhà luyện thi bỏ lò.
- Vai: `{"a":{"gender":"nam","role":"Người luyện thi","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Một thi khôi cào cửa từ ngoài, đòi lại xương tay bị lấy làm chìa. Người luyện thi {$a.ten} trốn trong nhà, chìa vẫn cắm ở khóa phía trong. Lão gọi ngươi đuổi nó đi, hứa sẽ mở cửa trả công.

### Lựa chọn

- **1. Đánh lui thi khôi để người trong nhà thoát ra**
  - `fight`: `{"k":"cuongthi","n":"Thi khôi chặn cửa"}`
  - **Thắng trận**: Ngươi đẩy thi khôi khỏi cửa, buộc người luyện thi mở khóa mang xương ra trả.
    `{"e":{"karma":4}}`
  - **Thua trận**: Thua, ngươi bị cào rách tay, phải lùi khỏi sân để tránh đòn tiếp.
- **2. Đập khóa và trả xương tay**
  Ngươi đập khóa bằng búa trước sân, buộc người luyện thi trả xương tay. Thi khôi nhận lại xương rồi rời đi. Khi ngươi đặt búa xuống, tiếng cào vẫn vang từ cán búa thêm một lúc.
  - `e`: `{"karma":2,"tamma":2}`
- **3. Bỏ đi**
  Từ sau cánh cửa, có người đẩy một chiếc chìa khác qua khe, rất chậm.

<a id="gk_ban_khe_khong_co_mat_chu"></a>
## Bản khế không có mặt chữ — `gk_ban_khe_khong_co_mat_chu`

- Loại: story; nguồn: Khám phá; chủ đề: Nhân quả; cảm xúc: Bất an.
- Nơi: ma địa.
- Điều kiện: tầng 3; một lần/kiếp.
- Bối cảnh tác giả: Sảnh đổi lời thề.
- Vai: `{"a":{"gender":"nu","role":"Nữ quản sảnh","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Một bản khế chỉ đọc được khi người ký nói dối. Nữ quản sảnh {$a.ten} xin ngươi cầm góc giấy trong lúc nàng thử một câu về người nhà, giấy bật sáng ở đúng chỗ ngón tay nàng.

### Lựa chọn

- **1. Đặt khế vào lửa trước khi câu nói dứt**
  Ngươi thả khế vào lửa trước khi lời nàng làm sáng hết mặt giấy. Để chặn khế phản lại người giữ, ngươi dùng thần niệm chịu một lần giằng xé. Nàng cảm tạ, không giải thích thêm chuyện người nhà; ngươi cũng không hỏi.
  - `e`: `{"karma":4,"an":["a","bản khế không có mặt chữ"]}`
- **2. Nghe hết rồi mua bản khế**
  Ngươi có vật xét lời dối. Mỗi khi nàng đi ngang, giấy nóng lên dù đang gấp.
  - `cost`: `{"st":19}`
  - `e`: `{"tamma":3,"namedRelic":{"k":"gian","name":"Khế Giữ Lời","lore":"Ngươi có vật xét lời dối. Mỗi khi nàng đi ngang, giấy nóng lên dù đang gấp."}}`
- **3. Bỏ đi**
  Ánh sáng đi hết mặt giấy rồi mới tắt, để lại hai chữ chưa đọc.

<a id="gk_dau_kim_tim_duong_ve"></a>
## Đầu kim tìm đường về — `gk_dau_kim_tim_duong_ve`

- Loại: story; nguồn: Khám phá; chủ đề: Chuyện phường nghề; cảm xúc: Lắng dịu.
- Nơi: ma địa.
- Điều kiện: tầng 3; một lần/kiếp.
- Bối cảnh tác giả: Nhà may áo cho oán hồn.
- Vai: `{"a":{"gender":"nam","role":"thợ may","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Thợ may {$a.ten} buộc chỉ vào áo để oán hồn tìm về được đường cũ. Một chiếc áo chưa có đường chỉ vì người đến lấy chẳng nhớ mình từng ở đâu.

### Lựa chọn

- **1. Cho mượn hướng về {$que}**
  Ngươi cho hồn mượn ký ức đường về quê mình. Nó theo chỉ ra khỏi ma vực, còn ngươi phải ngồi nhớ lại từng ngã rẽ đã cho đi. Người thợ may ở lại cùng ngươi tới khi ngươi tự nhắc được tên quê.
  - `e`: `{"karma":4,"an":["a","đầu kim tìm đường về"]}`
- **2. Bán cho nó một đường về bất kỳ**
  Ngươi có chút âm thạch. Ở đầu chỉ còn lại, {$a.ten} buộc một nút nhỏ để hồn có thể quay đầu.
  - `e`: `{"karma":-3,"tamma":4,"st":20}`
- **3. Bỏ đi**
  Lão đặt kim xuống ngay ngắn, đầu kim hướng vào áo trống.

<a id="gk_mau_phan_thu_giong"></a>
## Mẩu phấn thử giọng — `gk_mau_phan_thu_giong`

- Loại: story; nguồn: Khám phá; chủ đề: Chuyện oán hồn; cảm xúc: Hài hước.
- Nơi: ma địa.
- Điều kiện: tầng 3; một lần/kiếp.
- Bối cảnh tác giả: Hốc dạy nói.
- Vai: `{"a":{"gender":"nam","role":"oán hồn","alignment":"context"},"b":{"gender":"nam","role":"Thầy dạy","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Oán hồn {$a.ten} trả tiền học hú đã ba buổi, cứ mở miệng lại thành tiếng nấc. Thầy dạy {$b.ten} bảo nó thiếu oán khí. Nó ngập ngừng đáp: “Ta chết lâu quá, quên mất giận ai rồi.”

### Lựa chọn

- **1. Chỉ nó thở chậm qua một lỗ sáo**
  Ngươi chỉ nó lấy hơi chậm theo tiếng sáo của thầy. Nó hú được một tiếng dài, tự nghe cũng giật mình. Thầy vội ghi lại cách dạy mới, nói biết đâu ngày mai nhận thêm học trò.
  - `e`: `{"karma":2}`
- **2. Thu tiếng nấc vào một lá phù xua ngủ**
  Phù dùng được, {$a.ten} xin ngươi trả tiếng nấc vào những hôm học thanh dài.
  - `e`: `{"karma":-1,"tamma":2,"pill":1}`
- **3. Bỏ đi**
  Ngươi bảo nó cứ thử hát xem sao. Nó nhìn thầy xin phép; thầy tính một lúc rồi nói học hát vẫn cùng giá.

<a id="gk_mat_dat_nho_chan_quy"></a>
## Mặt đất nhớ chân quỳ — `gk_mat_dat_nho_chan_quy`

- Loại: story; nguồn: Khám phá; chủ đề: Tâm ma; cảm xúc: Phẫn nộ.
- Nơi: ma địa.
- Điều kiện: tầng 3; một lần/kiếp.
- Bối cảnh tác giả: Sân sám hối của [tông môn ma đạo].
- Vai: `{"a":{"gender":"nam","role":"Giám lễ","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Dấu đầu gối trên sân tự lõm mỗi khi giám lễ {$a.ten} gọi tên một người. Đến tên ngươi, đất chỉ lõm một bên.

### Lựa chọn

- **1. Buộc {$a.ten} gọi tên chính hắn**
  Ngươi buộc giám lễ gọi chính tên hắn. Đất kéo hắn quỳ xuống, cũng kéo ngươi ngã vì đứng trong trận. Khi hai người đứng dậy, người chờ chịu lễ đồng loạt hỏi ai đã đặt luật này.
  - `e`: `{"karma":4,"hp":"-10%"}`
- **2. Lấy đất lõm luyện phù ép người**
  Phù dùng được một lần. Về sau mỗi khi niệm chú, đầu gối ngươi nhói trước khi đất chuyển.
  - `e`: `{"pill":1,"karma":-2,"tamma":3}`
- **3. Bỏ đi**
  {$a.ten} gọi tên tiếp theo, chỗ đất phía ngươi vẫn chưa đầy lên.

<a id="gk_bep_tro_phia_sau_nha_giam"></a>
## Bếp tro phía sau nhà giam — `gk_bep_tro_phia_sau_nha_giam`

- Loại: story; nguồn: Khám phá; chủ đề: Sinh kế; cảm xúc: Xót xa.
- Nơi: ma địa.
- Điều kiện: tầng 3; một lần/kiếp.
- Bối cảnh tác giả: Xóm nấu ăn sát vách ngục.
- Vai: `{"a":{"gender":"nam","role":"Người đun bếp","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Người đun bếp {$a.ten} hứng tro từ bếp ngục về ủ khoai. Hôm nay trong tro có một miếng sắt mỏng, cầm lên mới thấy đó là tay cầm của một cái chén.

### Lựa chọn

- **1. Mua củi cho xóm khỏi dùng tro ngục**
  Ngươi mua củi để cả xóm thôi phải xin tro nóng từ ngục. Người đun bếp đốt mẻ đầu, giữ lại miếng sắt hỏi tin người làm ra chiếc chén. Lão mời ngươi ăn khoai, lần này không cần phủi tro trước.
  - `cost`: `{"st":19}`
  - `e`: `{"karma":4,"an":["a","bếp tro phía sau nhà giam"]}`
- **2. Đổi tro lấy ít khí âm**
  Ngươi luyện được một mẻ mực. Lão nướng khoai bằng củi sống, khói bám vào từng đường rãnh trên vỏ.
  - `e`: `{"pill":1,"tamma":2}`
- **3. Bỏ đi**
  Lão đặt miếng sắt bên nồi, thỉnh thoảng lại thử cầm lên.
