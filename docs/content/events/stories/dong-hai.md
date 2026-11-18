# content/events/stories/dong-hai.json

Nguồn chuẩn: `content/events/stories/dong-hai.json`. Bản đọc tự sinh. Cú pháp: xem [guideline](../../GUIDELINE.md).

<a id="gk_lo_tho_phia_tren_vach_trieu"></a>
## Lỗ thở phía trên vạch triều — `gk_lo_tho_phia_tren_vach_trieu`

- Loại: story; nguồn: Khám phá; chủ đề: Cứu người; cảm xúc: Căng thẳng.
- Nơi: biển khơi.
- Điều kiện: tầng 2; một lần/kiếp.
- Bối cảnh tác giả: Khoang đá dưới chân đảo.
- Vai: `{"a":{"gender":"nam","role":"Người giữ đê","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Tiếng đục dồn dập vọng ra từ khoang đá dưới chân đảo. Thợ sửa đê bị kẹt bên trong, nước đã gần bịt lỗ thông khí cuối cùng. Người giữ đê {$a.ten} kéo ngươi tới, chỉ chỗ có thể phá vách; hắn nói nhanh, không kịp chào.

### Lựa chọn

- **1. Dùng khí hộ thể giữ khô khoang**
  Ngươi dùng khí hộ thể ép nước khỏi khoang, giữ tới khi họ đục thông lối ra. Linh lực tiêu hao quá mức làm đan điền đau nhói. Người cuối cùng dìu ngươi lên bờ, liên tục gọi để ngươi đừng ngất.
  - `cost`: `{"mp":"20%"}`
  - `e`: `{"hd":{"p":3},"ng":{"g":3},"hp":"-15%","tv":-3}`
- **2. Mở nhanh từ phía nước nông**
  Thợ thoát, phần nước mới làm chìm dụng cụ và đập vỡ chiếc thuyền lương. Một cái đục nổi lên nhờ cán rỗng.
  - `e`: `{"hd":{"p":1},"ng":{"g":1}}`
- **3. Bỏ đi**
  Tiếng gõ chuyển lên cao dần, đến sát lỗ thở.

<a id="gk_cau_thang_cho_nguoi_co_vay"></a>
## Cầu thang cho người có vây — `gk_cau_thang_cho_nguoi_co_vay`

- Loại: story; nguồn: Khám phá; chủ đề: Chuyện người và yêu; cảm xúc: Ấm áp.
- Nơi: biển khơi, sông hồ.
- Điều kiện: tầng 2; một lần/kiếp.
- Bối cảnh tác giả: Bến buôn hai loài.
- Vai: `{"a":{"gender":"nam","role":"Thợ cả","alignment":"context"},"b":{"gender":"nam","role":"ngư nhân","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Thợ cả {$a.ten} đóng bậc cầu cho người đi bộ, còn ngư nhân {$b.ten} chỉ xin bôi rêu lên một lối dốc. Lần lên thử, hắn đặt cả hai tay xuống trước.

### Lựa chọn

- **1. Góp ván làm hai lối**
  Ngươi mua thêm ván để thợ làm cả bậc lẫn lối dốc. Bến mở lại, ngư nhân tự kéo được hàng lên, người già cũng có chỗ đi chắc chân. Thợ cả nhìn người qua một buổi rồi chỉnh thêm tay vịn.
  - `cost`: `{"st":16}`
  - `e`: `{"hd":{"p":3},"ng":{"g":3},"an":["a","cầu thang cho người có vây"]}`
- **2. Đổi bậc thành lối dốc rồi thu phí**
  Ngư nhân lên bến dễ hơn, người già trên đảo phải thuê người kéo. Trên tay vịn, một sợi dây buộc thấp dần.
  - `e`: `{"st":22,"deed":"lua_loi"}`
- **3. Bỏ đi**
  Thợ cả hỏi ngư nhân cách làm dốc cho khỏi trơn. Ngươi nghe họ bàn giá gỗ rồi tiếp tục ra bến.

<a id="gk_khuyen_tai_buoc_neo"></a>
## Khuyên tai buộc neo — `gk_khuyen_tai_buoc_neo`

- Loại: story; nguồn: Khám phá; chủ đề: Lời hẹn; cảm xúc: Lãng mạn.
- Nơi: biển khơi.
- Điều kiện: tầng 2; một lần/kiếp.
- Bối cảnh tác giả: Bờ neo lúc nước rút.
- Vai: `{"a":{"gender":"nam","role":"Người lái thuyền","alignment":"context"},"b":{"gender":"nam","role":"người vá lưới","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Chuyến thuyền sắp rời bến. Người lái thuyền {$a.ten} không dám trao khuyên tai thẳng cho người vá lưới {$b.ten}, đành luồn vào dây neo. Người kia tháo ra cầm trong tay, hỏi: “Gửi ta giữ, hay định mang ra biển?”

### Lựa chọn

- **1. Giữ thuyền một lát để họ nói chuyện**
  Ngươi giữ thuyền đợi thêm một lát, lỡ con nước thuận. Người lái thuyền cuối cùng cũng nói được lời hẹn, tự tay đeo khuyên cho người ở lại. Chủ thuyền thúc lần nữa, lần này hắn mới chịu lên.
  - `e`: `{"hd":{"p":3},"ng":{"g":3},"an":["a","khuyên tai buộc neo"],"h":6}`
- **2. Mang chiếc khuyên sang chuyến kế**
  Họ gửi ngươi tiền công. Lúc tới nơi, ngươi thấy người nhận đã đeo một chiếc khuyên gỗ cùng cỡ.
  - `e`: `{"st":12,"hd":{"t":1}}`
- **3. Bỏ đi**
  Ngươi lên đường, để họ tự nói chuyện. Khi dây neo được kéo lên, chiếc khuyên đã ở lại trên bờ.

<a id="gk_chan_cua_thue_theo_ngay"></a>
## Chân cua thuê theo ngày — `gk_chan_cua_thue_theo_ngay`

- Loại: story; nguồn: Khám phá; chủ đề: Linh thú; cảm xúc: Hài hước.
- Nơi: biển khơi.
- Điều kiện: tầng 2; một lần/kiếp.
- Bối cảnh tác giả: Bãi kéo thuyền.
- Vai: `{"a":{"gender":"nam","role":"Yêu cua","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

“Sáu chân kéo thuyền, hai càng buộc dây, phải tính riêng.” Yêu cua {$a.ten} đặt hai càng lên bàn đòi công. Người thuê cãi đã trả trọn ngày, nó liền chỉ tấm bảng chỉ ghi đúng hai chữ “công chân”.

### Lựa chọn

- **1. Trả thêm bằng cá khô**
  Ngươi mua cá khô trả thêm, nó nhận kéo thuyền lên tận bãi cứng. Xong việc, nó chia cá thành tám phần, nhìn hai càng hồi lâu rồi tự gom lại ăn hết.
  - `cost`: `{"st":16}`
  - `e`: `{"hd":{"p":1},"ng":{"g":1}}`
- **2. Thuê nó kéo bằng đúng số chân đã trả**
  Nó làm đúng lời, nhưng mất nửa buổi vì để hai càng khoanh trước ngực. Trên cát chỉ có sáu hàng dấu.
  - `cost`: `{"st":16}`
- **3. Bỏ đi**
  Yêu cua nhờ người viết lại bảng giá cho rõ. Nó còn hỏi có nên tính thêm tiền lúc phải bò ngang không.

<a id="gk_muc_tron_khoi_nghien"></a>
## Mực trốn khỏi nghiên — `gk_muc_tron_khoi_nghien`

- Loại: story; nguồn: Khám phá; chủ đề: Linh vật; cảm xúc: Bất an.
- Nơi: biển khơi.
- Điều kiện: tầng 2; một lần/kiếp.
- Bối cảnh tác giả: Phòng chép hải đồ.
- Vai: `{"a":{"gender":"nam","role":"Người chép đồ","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Bản hải đồ mỗi ngày mất một nét bờ. Người chép đồ {$a.ten} nằm rình và thấy đàn mực nhỏ chui lên khỏi nghiên, lưng chúng mang những dải bờ ướt.

### Lựa chọn

- **1. Dẫn đàn mực về vùng biển chúng đã vẽ**
  Ngươi bỏ chuyến thuận triều, đưa đàn mực về đúng vùng biển trên bản đồ. Chúng nhả nét mực xuống nước; cùng lúc ấy, bờ đảo hiện lại trên giấy. Chỉ chỗ đẻ trứng của chúng vẫn không có trên hải đồ.
  - `e`: `{"hd":{"p":3},"ng":{"g":3},"tamma":-3,"h":24}`
- **2. Mượn một con để sửa đường trên hải đồ**
  Ngươi tìm được luồng nước mới. Đêm ấy, trong bát nước của ngươi nổi lên một nét bờ khác.
  - `e`: `{"tv":3,"tamma":3}`
- **3. Bỏ đi**
  {$a.ten} chừa nghiên mở. Sáng ra có một hòn đảo đậu trên mép giấy, còn ướt.

<a id="gk_mam_com_buoc_phao"></a>
## Mâm cơm buộc phao — `gk_mam_com_buoc_phao`

- Loại: story; nguồn: Khám phá; chủ đề: Chuyện đảo nhỏ; cảm xúc: Cảm động.
- Nơi: thành trì, thôn trấn.
- Điều kiện: tầng 2; một lần/kiếp.
- Bối cảnh tác giả: Xóm nhà cọc.
- Vai: `{"a":{"gender":"nam","role":"Người đầu bếp","alignment":"context"},"b":{"gender":"nu","role":"bà cụ","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Người đầu bếp {$a.ten} buộc mâm cơm vào phao cho bà cụ {$b.ten} qua lại giữa hai căn nhà cọc. Chiếc cầu ván mất một nhịp, còn món canh bà thích luôn sang sau cùng.

### Lựa chọn

- **1. Mua ván bắc lại nhịp cầu**
  Ngươi mua ván, cùng dân nối lại đoạn cầu. Bà cụ tự sang bếp, vừa đi vừa mắng người đầu bếp lần sau đừng nấu canh nhạt. Hắn cười bảo từ nay bà cứ tới nếm trước.
  - `cost`: `{"st":16}`
  - `e`: `{"hd":{"p":3},"ng":{"g":3},"an":["a","mâm cơm buộc phao"]}`
- **2. Thuê thuyền mang cơm mỗi tối**
  Cơm còn nóng khi tới, người chèo đò có công. Đêm đầu thuyền nghỉ, bà vẫn đặt một sợi dây ở bậc cửa.
  - `cost`: `{"st":16}`
  - `e`: `{"hd":{"p":3},"ng":{"g":3}}`
- **3. Bỏ đi**
  Người đầu bếp kéo phao về, rửa bát cho bữa sau. Bà cụ bên kia gọi vọng sang hỏi mai có cá không.

<a id="gk_con_song_biet_cho"></a>
## Con sóng biết chờ — `gk_con_song_biet_cho`

- Loại: story; nguồn: Khám phá; chủ đề: Ngộ đạo; cảm xúc: Trầm tĩnh.
- Nơi: biển khơi.
- Điều kiện: tầng 2; một lần/kiếp.
- Bối cảnh tác giả: Vũng đá dưới vách san hô.
- Vai: `{"a":{"gender":"nu","role":"Nữ thợ lặn","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Hai con sóng chen vào khe rồi đẩy nhau trở lại. Nữ thợ lặn {$a.ten} chỉ ngươi nhìn bọt thứ ba, thứ đi qua mà chẳng làm ướt mép đá.

### Lựa chọn

- **1. Chờ đúng lúc rồi dẫn khí qua đan điền**
  Ngươi đợi hai luồng nước rút rồi thử dẫn khí theo nhịp bọt thứ ba. Khí qua đan điền êm hơn trước, chẳng cần thêm sức. Đến khi đứng dậy, chuyến tàu đã đi; thợ lặn bảo mai còn chuyến khác.
  - `e`: `{"tv":5,"h":12}`
- **2. Dùng pháp lực ép nước rẽ đôi**
  Ngươi tìm ra lối bổ sóng mạnh. {$a.ten} phải đi nhặt rổ ốc ở phía bên kia.
  - `e`: `{"tv":4,"hd":{"t":1}}`
- **3. Bỏ đi**
  Ngươi rời vũng đá theo đường khô. Thợ lặn đã xuống nước, không còn ai trên bờ.

<a id="gk_luoi_ca_chan_cong_thue"></a>
## Lưới cá chắn cổng thuế — `gk_luoi_ca_chan_cong_thue`

- Loại: story; nguồn: Khám phá; chủ đề: Tranh chấp bến cảng; cảm xúc: Phẫn nộ.
- Nơi: biển khơi.
- Điều kiện: tầng 2; một lần/kiếp.
- Bối cảnh tác giả: Cổng cân cá.
- Vai: `{"a":{"gender":"nam","role":"Quan bến","alignment":"context"},"b":{"gender":"nam","role":"Người đan lưới","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Quan bến {$a.ten} tính thuế theo số mắt lưới, mặc người đánh cá bảo đêm qua không được mấy con. Người đan lưới {$b.ten} giơ tấm lưới rách: mắt không còn cũng bị tính. Hắn hỏi quan bến có muốn xuống biển bắt nốt phần cá ấy không.

### Lựa chọn

- **1. Bắt cân số cá thực nộp**
  Ngươi bảo lãnh cho dân nộp theo cá thực có, chịu để hàng của mình bị giữ tới khi đối sổ. Người đan lưới đếm từng giỏ ngay trước mặt quan bến. Hàng chờ rất lâu, nhưng không ai chịu bỏ về.
  - `e`: `{"hd":{"p":3},"ng":{"g":3},"h":12}`
- **2. Đổi lấy quyền mua cá thuế**
  Ngươi nhận mua cá thuế giá thấp rồi bán lại cho thuyền buôn, có lời ngay trong phiên. Dân vẫn phải nộp theo tấm lưới rách. Người đan lưới nhận ra ngươi đứng bên cân, quay đi không chào.
  - `e`: `{"st":22,"deed":"lua_loi"}`
- **3. Bỏ đi**
  Người đan lưới thắt nút quanh chỗ rách, tới chiều còn một mảnh nhỏ như bàn tay.

<a id="gk_vay_cao_duoi_bung_thuyen"></a>
## Vảy cạo dưới bụng thuyền — `gk_vay_cao_duoi_bung_thuyen`

- Loại: story; nguồn: Khám phá; chủ đề: Ban đêm; cảm xúc: Kinh dị.
- Nơi: biển khơi.
- Điều kiện: tầng 2; dem; một lần/kiếp.
- Bối cảnh tác giả: Triền thuyền.
- Vai: `{"a":{"gender":"nam","role":"Thợ trét thuyền","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Dưới thuyền úp có tiếng ai cạo vảy. Thợ trét thuyền {$a.ten} chỉ cho ngươi một vệt trắng trên gỗ, mỗi tiếng cạo lại dài thêm một đốt tay.

### Lựa chọn

- **1. Kê thuyền và soi vào vệt cạo**
  Ngươi kê cao thuyền, dùng đèn của xưởng soi vào khe. Một con vật không mắt bò ra, đuổi theo ánh sáng tới tận mép biển. Ngươi ném đèn xuống nước; tiếng cạo dứt ngay khi lửa tắt.
  - `e`: `{"hd":{"p":3},"ng":{"g":3},"tamma":-3}`
- **2. Hứng vảy để tôi giáp**
  Ngươi gom vảy, đổi cho thợ giáp lấy một món hộ thân đã tôi cùng loại. Khi đeo thử, da vai bị cứa thành những vệt rớm máu dù mặt trong giáp nhẵn. Thợ bảo ngươi có thể trả lại, nhưng ngươi vẫn giữ.
  - `e`: `{"tamma":4,"hp":"-5%","namedRelic":{"k":"giap","name":"Giáp Vảy Giao","lore":"Ngươi gom vảy, đổi cho thợ giáp lấy một món hộ thân đã tôi cùng loại. Khi đeo thử, da vai bị cứa thành những vệt rớm máu dù mặt trong giáp nhẵn. Thợ bảo ngươi có thể trả lại, nhưng ngươi vẫn giữ."}}`
- **3. Bỏ đi**
  Tới sáng, chiếc thuyền đã quay mũi ra biển dù hai con kê vẫn nguyên chỗ.

<a id="gk_ban_tay_dat_o_mui_thuyen"></a>
## Bàn tay đặt ở mũi thuyền — `gk_ban_tay_dat_o_mui_thuyen`

- Loại: story; nguồn: Khám phá; chủ đề: Tang tục; cảm xúc: Bi thương.
- Nơi: biển khơi.
- Điều kiện: tầng 2; một lần/kiếp.
- Bối cảnh tác giả: Bãi quấn buồm.
- Vai: `{"b":{"gender":"nam","role":"Người con","alignment":"context"},"a":{"gender":"nam","role":"Người thợ khâu","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Người con {$b.ten} sắp bán chiếc thuyền của cha để trả nợ. Trên buồm có bàn tay vải do cha khâu năm hắn lần đầu ra biển, nay hắn muốn tháo giữ lại. Người thợ khâu {$a.ten} nói phải hạ buồm mới rút được những mũi chỉ phía trong.

### Lựa chọn

- **1. Đỡ buồm để hai người rút từng mũi**
  Ngươi giúp hạ và đỡ buồm, để họ tháo nguyên bàn tay vải. Họ lỡ phiên bán nhưng không còn phải cắt nó ra. Người con nhờ thợ khâu may vào áo đi biển của mình.
  - `e`: `{"hd":{"p":3},"ng":{"g":3},"an":["a","bàn tay đặt ở mũi thuyền"],"h":12}`
- **2. Mua thuyền nguyên buồm**
  Họ đủ tiền trả nợ bến. Mỗi khi có gió ngược, bàn tay vải quệt một lần lên mặt ngươi.
  - `cost`: `{"st":16}`
  - `e`: `{"hd":{"p":1},"ng":{"g":1},"tamma":2}`
- **3. Bỏ đi**
  {$b.ten} cắt quanh cổ tay, chừa lại một vành vải tròn trên buồm.

<a id="gk_to_khe_ngam_trong_mang"></a>
## Tờ khế ngậm trong mang — `gk_to_khe_ngam_trong_mang`

- Loại: story; nguồn: Khám phá; chủ đề: Chuyện dòng họ yêu tộc; cảm xúc: Cẩu huyết.
- Nơi: biển khơi.
- Điều kiện: tầng 2; một lần/kiếp.
- Bối cảnh tác giả: Bãi tập dưới triều.
- Vai: `{"a":{"gender":"nam","role":"Yêu tu","alignment":"context"},"b":{"gender":"nam","role":"yêu tu","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Yêu tu {$a.ten} nói tất cả con nước dưới chân đảo thuộc dòng họ hắn. Yêu tu {$b.ten} lấy khế từ trong mang ra, chỗ ghi tên chủ chỉ còn nguyên tên người sửa cống.

### Lựa chọn

- **1. Đọc khế cho người đang tập nghe**
  Ngươi đọc rõ khế: dòng họ ấy chỉ được coi cống, không có quyền thu tiền bãi tập. Người đang tập yêu cầu dỡ biển. Yêu tu cãi thêm vài câu rồi mang biển đi, không tìm được chỗ nào trong khế để chỉ lại.
  - `e`: `{"hd":{"p":3},"ng":{"g":3}}`
- **2. Nhận phần lợi để chứng khế cho hắn**
  Hắn chia tiền thu bãi, cho ngươi dùng riêng một khoảng nước để đổi việc chứng khế. Người sửa cống tới đòi đọc giấy gốc, hắn bảo chữ của ngươi đã đủ làm bằng. Mọi người quay sang chờ ngươi trả lời.
  - `e`: `{"st":22,"deed":"lua_loi"}`
- **3. Bỏ đi**
  Nước lên, {$b.ten} ngậm khế lại. Tấm biển thu tiền nổi mất chữ đầu.

<a id="gk_cong_co_trong_be_trung"></a>
## Cọng cỏ trong bể trứng — `gk_cong_co_trong_be_trung`

- Loại: story; nguồn: Khám phá; chủ đề: Mùa sinh sản; cảm xúc: Xót xa.
- Nơi: biển khơi.
- Điều kiện: tầng 2; một lần/kiếp.
- Bối cảnh tác giả: Trạm nước ven đảo.
- Vai: `{"a":{"gender":"nu","role":"Nữ thợ chăm bể","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Nữ thợ chăm bể {$a.ten} cắm một cọng cỏ để biết dòng nước có chảy qua ổ trứng. Kẻ thuê nàng đã chặn nước ngọt đem bán, cọng cỏ đứng thẳng cả buổi.

### Lựa chọn

- **1. Mua nước sạch cứu bể trứng**
  Ngươi mua thùng nước dự trữ của thuyền buôn, dẫn qua bể cho trứng khỏi ngạt. Người chăm bể gọi thêm người giúp chuyển trứng sang trạm khác, không muốn phải chờ kẻ thuê nàng mở nước nữa.
  - `cost`: `{"st":16}`
  - `e`: `{"hd":{"p":3},"ng":{"g":3},"an":["a","cọng cỏ trong bể trứng"]}`
- **2. Mua ổ trứng trước khi bể khô**
  Ngươi giữ được ổ ở một bể riêng và bán được con giống. {$a.ten} lấy cọng cỏ trồng bên bể trống.
  - `cost`: `{"st":16}`
  - `e`: `{"st":38,"hd":{"t":1}}`
  - `accounting`: `{"mode":"buy-and-sell","capital":16,"profit":22}`
- **3. Bỏ đi**
  Nàng đi gọi những người còn giữ nước ở gần trạm. Ngươi rời bến khi họ đang gánh từng thùng tới.

<a id="gk_dinh_bien_rut_luc_trieu_xuon"></a>
## Đinh biển rút lúc triều xuống — `gk_dinh_bien_rut_luc_trieu_xuon`

- Loại: story; nguồn: Khám phá; chủ đề: Có hạn chót; cảm xúc: Hồi hộp.
- Nơi: biển khơi, sông hồ.
- Điều kiện: tầng 2; một lần/kiếp.
- Bối cảnh tác giả: Mỏm đá ngoài bến.
- Vai: `{"a":{"gender":"nam","role":"Thợ rèn","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Nước chỉ rút tới chân đê này một lần trong năm. Thợ rèn {$a.ten} đang rút chiếc đinh neo đã mục, nhưng kìm mắc chặt giữa khe đá. Con sóng đầu tiên tràn qua gót lão; nếu không bỏ kìm, lão sẽ không kịp lên.

### Lựa chọn

- **1. Dùng thanh sắt ở bờ làm đòn bẩy**
  Ngươi hạ người bẩy đinh bằng thanh sắt của đội sửa đê. Đinh bật ra trước khi nước dâng, ngươi cùng lão chạy lên bậc cuối. Lão thở hổn hển, vẫn nhớ giữ kìm khỏi rơi xuống biển.
  - `e`: `{"deed":"cuu_nguoi","an":["a","đinh biển rút lúc triều xuống"]}`
- **2. Rút kìm để giữ mạng người trước**
  {$a.ten} lên bờ an toàn, đê phải chống thêm qua một mùa. Lão dành tối đó mài lại kìm.
  - `e`: `{"deed":"cuu_nguoi"}`
- **3. Bỏ đi**
  Khi ngươi lên bờ, chuôi kìm đã ở ngang mặt nước.

<a id="gk_mat_bien_con_tro"></a>
## Mặt biển còn tro — `gk_mat_bien_con_tro`

- Loại: story; nguồn: Khám phá; chủ đề: Việc sau hải chiến; cảm xúc: Bi thương.
- Nơi: biển khơi.
- Điều kiện: tầng 2; dong; một lần/kiếp.
- Bối cảnh tác giả: Bãi triều đầu đông.
- Vai: `{"a":{"gender":"nam","role":"Người nhặt tro","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Gió thổi tro buồm về bờ. Người nhặt tro {$a.ten} rây từng gáo nước vì tin mỗi tàu đốt một loại vải khác nhau, trên rây chỉ còn mấy sợi màu nâu.

### Lựa chọn

- **1. Giúp tách tro bằng linh lực**
  Ngươi dùng linh lực tách sợi vải còn sót khỏi tro, giúp họ đối với mảnh buồm giữ ở nhà. Có nhà nhận ra tàu của người thân, có nhà vẫn chưa biết. Người nhặt tro nhờ ngươi đừng vội gộp phần chưa rõ vào chung.
  - `cost`: `{"mp":"20%"}`
  - `e`: `{"hd":{"p":3},"ng":{"g":3},"an":["a","mặt biển còn tro"]}`
- **2. Mua phần tro có tơ linh**
  Ngươi luyện được mực chịu nước. Lúc mở túi, một nút chỉ nhỏ rơi ra còn nguyên hai vòng.
  - `cost`: `{"st":16}`
  - `e`: `{"namedMat":"story_mat_mat_bien_con_tro"}`
- **3. Bỏ đi**
  {$a.ten} rửa rây, để phần chưa biết tên trôi qua mắt lưới.

<a id="gk_hang_rang_tren_mai_cho"></a>
## Hàng răng trên mái chợ — `gk_hang_rang_tren_mai_cho`

- Loại: story; nguồn: Khám phá; chủ đề: Chuyện yêu tộc; cảm xúc: Hài hước.
- Nơi: thành trì, thôn trấn.
- Điều kiện: tầng 2; một lần/kiếp.
- Bối cảnh tác giả: Mái chợ cá.
- Vai: `{"a":{"gender":"nam","role":"giao yêu","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Giao yêu {$a.ten} thay răng đúng ngày chợ họp, mỗi lần hắt hơi lại rơi một chiếc xuống mẹt. Hắn dặn dân chớ nhặt, rồi lén đếm lại mỗi khi có ai cúi xuống.

### Lựa chọn

- **1. Trải chiếu hứng giúp hắn**
  Ngươi trải chiếu giúp, nhận một chiếc răng cũ làm công. Giao yêu dặn không được nói nó thay răng mất một bên trước. Dưới chợ đã có người nghe thấy, nó đành ngậm miệng bay đi.
  - `e`: `{"hd":{"p":1},"ng":{"g":1},"pill":1}`
- **2. Thu tiền người muốn đứng chờ**
  Ngươi kiếm được ít bạc, {$a.ten} bay đi trước lần hắt hơi cuối. Đám người dưới mái chỉ hứng được một cục vảy.
  - `e`: `{"st":22,"deed":"lua_loi"}`
- **3. Bỏ đi**
  Giao yêu gọi người dọn hàng tránh ra, hắt hơi nốt rồi mới bay. Chợ cá trở lại ồn ào, chẳng ai còn mặc cả chuyện chiếc răng.

<a id="gk_tang_da_che_mua_nang"></a>
## Tảng đá che mùa nắng — `gk_tang_da_che_mua_nang`

- Loại: story; nguồn: Khám phá; chủ đề: Chuyện cộng đồng; cảm xúc: Lắng dịu.
- Nơi: biển khơi.
- Điều kiện: tầng 2; một lần/kiếp.
- Bối cảnh tác giả: Bãi san đá ngoài đảo.
- Vai: `{"a":{"gender":"nam","role":"Lão ngư nhân","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Dân đảo đẩy một tảng đá để lấy nắng phơi cá. Lão ngư nhân {$a.ten} nằm dưới bóng nó, trên da có những vệt trắng do nhiều năm chỉ nằm nghiêng một phía.

### Lựa chọn

- **1. Gọi người đổi hướng tảng đá**
  Ngươi gọi dân xoay tảng đá sang phía bãi trống, tự bỏ công dọn chỗ neo đang vướng đường. Mọi người có nắng phơi cá, lão vẫn được nằm trong bóng. Lão bảo lúc đầu chỉ cần hỏi nhau một tiếng là xong.
  - `e`: `{"hd":{"p":3},"ng":{"g":3},"an":["a","tảng đá che mùa nắng"]}`
- **2. Mua chỗ nằm khác cho lão**
  Lão có mái che. Hôm đầu, lão vẫn lội về bãi cũ để nhặt phần rong đã phơi dở.
  - `cost`: `{"st":16}`
  - `e`: `{"hd":{"p":3},"ng":{"g":3}}`
- **3. Bỏ đi**
  Tảng đá dịch qua khỏi vệt ẩm trên cát. Lão chờ bóng mới rồi mới đứng dậy.

<a id="gk_vang_bac_theo_trieu_nguoc"></a>
## Váng bạc theo triều ngược — `gk_vang_bac_theo_trieu_nguoc`

- Loại: story; nguồn: Khám phá; chủ đề: Thiên tượng; cảm xúc: Căng thẳng.
- Nơi: biển khơi.
- Điều kiện: tầng 2; một lần/kiếp.
- Bối cảnh tác giả: Rìa vùng nước sâu.
- Vai: `{"a":{"gender":"nam","role":"Người giữ phao","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Mặt nước dựng váng bạc, phủ kín nơi chim biển vẫn đậu. Người giữ phao {$a.ten} thử thả một chiếc lông, váng khép quanh nó như da mới kéo. Người qua lại bàn tán: “Bên kia váng vẫn có gió.” “Người thu váng bảo nó giữ được một mùa nước.”

### Lựa chọn

- **1. Phá một đường dẫn chim về bờ**
  Ngươi dùng kiếm khí phá một đường qua lớp váng, đánh tới khi tay tê dại. Đàn chim thoát về bờ trước khi khe khép lại. Người giữ phao vội đánh dấu vùng nước, ngăn thuyền sau đi vào.
  - `e`: `{"hd":{"p":3},"ng":{"g":3},"hp":"-10%"}`
- **2. Thu váng để bọc pháp khí**
  Ngươi có vật liệu cứng. Lũ chim đổi bãi, trên đảo thiếu phân bón suốt một mùa.
  - `e`: `{"hd":{"t":3},"ng":{"b":1},"namedMat":"story_mat_vang_bac_theo_trieu_nguoc"}`
- **3. Bỏ đi**
  Một con chim vỗ cánh ba lần rồi bỏ chiếc lông lại.

<a id="gk_mau_khoa_phia_duoi_boong"></a>
## Mấu khóa phía dưới boong — `gk_mau_khoa_phia_duoi_boong`

- Loại: story; nguồn: Khám phá; chủ đề: Chuyện hải tặc; cảm xúc: Căng thẳng.
- Nơi: thành trì, thôn trấn.
- Điều kiện: tầng 2; một lần/kiếp.
- Bối cảnh tác giả: Xưởng đóng khoang tàu.
- Vai: `{"a":{"gender":"nam","role":"Thợ đóng tàu","alignment":"context"},"b":{"gender":"nam","role":"chủ thuyền","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Thợ đóng tàu {$a.ten} giấu lẫy mở trong khoang hàng, vừa tầm người nằm. Chủ thuyền {$b.ten} sai tháo lẫy đi vì sợ đám người bị chở biết đường thoát.

### Lựa chọn

- **1. Giữ lẫy và dẫn người xét hàng tới**
  Ngươi giữ lại lẫy mở, dẫn người xét hàng tới xưởng. Những người bị nhốt được đưa lên, có người đứng không vững vì nằm quá lâu. Chủ thuyền nhìn ngươi đầy căm tức khi bị giữ lại hỏi tội.
  - `e`: `{"hd":{"p":3},"ng":{"g":3},"oan":["a","mấu khóa phía dưới boong"]}`
- **2. Tháo lẫy để bán lấy tin hành trình**
  Chủ thuyền trả linh thạch cùng bản ghi đường qua đá ngầm để ngươi tháo lẫy. Ngươi nhận đủ rồi rời xưởng. Tiếng người gõ đúng chỗ lẫy cũ còn theo ra tới cổng.
  - `e`: `{"st":16,"deed":"lua_loi","tamma":3}`
- **3. Giao đấu với {$b.ten} để giành khoang**
  - `fight`: `{"k":"sontac","n":"{$b.ten}"}`
  - **Thắng trận**: Ngươi lấy chìa và đưa người lên boong.
    `{"e":{"hd":{"p":3},"ng":{"g":3}}}`
  - **Thua trận**: Thua, ngươi bị đẩy xuống triền tàu, trên tay vẫn nắm một mẩu lẫy.
- **4. Bỏ đi**
  {$a.ten} nhét một mẩu gỗ thay vào, tay làm rất chậm.

<a id="gk_mai_nha_moc_tren_coc_chet"></a>
## Mái nhà mọc trên cọc chết — `gk_mai_nha_moc_tren_coc_chet`

- Loại: story; nguồn: Khám phá; chủ đề: Ranh giới người và yêu; cảm xúc: Bất an.
- Nơi: biển khơi.
- Điều kiện: tầng 2; một lần/kiếp.
- Bối cảnh tác giả: Xóm cọc bỏ trống.
- Vai: `{"a":{"gender":"nam","role":"Người giữ đất","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Mỗi khi nhà bỏ trống, san hô leo lên cọc rồi trổ mái mới. Người giữ đất {$a.ten} cắm biển bán nhà, dưới tấm biển đã mọc một viền san hô mỏng.

### Lựa chọn

- **1. Giúp dân nhường bãi cọc cho san hô**
  Ngươi giúp tháo những tấm ván còn dùng được trước đợt triều cao. San hô nối liền quanh chân cọc cũ, dân chuyển nhà lên nền đá. Người giữ đất thôi cắm biển bán những căn đã không còn ở được.
  - `e`: `{"hd":{"p":1},"ng":{"g":1}}`
- **2. Mua một mái mới để dưỡng pháp khí**
  Mái giữ được linh khí, còn căn nhà kế mất chỗ dựa. Đêm xuống, san hô chạm nhau ngoài mặt nước.
  - `cost`: `{"st":16}`
  - `e`: `{"hd":{"t":1},"item":"story_item_mai_nha_moc_tren_coc_chet"}`
- **3. Bỏ đi**
  Ngươi tránh bãi cọc khi nước lên. Người giữ đất cũng gỡ biển, đứng nhìn hồi lâu rồi mang về.

<a id="gk_bong_nguoi_trong_guong_nuoc_"></a>
## Bóng người trong gương nước mưa — `gk_bong_nguoi_trong_guong_nuoc_`

- Loại: story; nguồn: Khám phá; chủ đề: Chuyện biệt ly; cảm xúc: Lãng mạn.
- Nơi: biển khơi.
- Điều kiện: tầng 2; một lần/kiếp.
- Bối cảnh tác giả: Sân hứng mưa trên đảo.
- Vai: `{"a":{"gender":"nu","role":"Nữ tu vẽ bùa","alignment":"context"},"b":{"gender":"nam","role":"người đi biển","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Nữ tu vẽ bùa {$a.ten} ngồi bên thau hứng mưa để người đi biển {$b.ten} nhìn thấy mặt nàng từ xa. Nàng để chỗ bên kia thau trống, trên ghế đặt một áo choàng đã khô.

### Lựa chọn

- **1. Giữ mưa trong thau đến hết đêm**
  Ngươi giữ mặt nước bằng linh lực đến hết đêm, không còn đủ khí dưỡng vết thương ngay. Hai người hỏi nhau những chuyện rất thường: ăn gì, ngủ ở đâu, bao giờ về. Trời sáng, nàng tự nghiêng thau khép phép rồi cảm tạ ngươi.
  - `cost`: `{"mp":"20%"}`
  - `e`: `{"hd":{"p":3},"ng":{"g":3},"an":["a","bóng người trong gương nước mưa"]}`
- **2. Dùng mặt nước gửi lời mình trước**
  Lời ngươi đi xa và nàng mất một buổi đợi. Chiếc ghế còn lại vẫn phủ áo.
  - `e`: `{"tv":3,"hd":{"t":1}}`
- **3. Bỏ đi**
  Mưa ngớt, nàng nghiêng thau để giữ mặt người ấy thêm một lát.
