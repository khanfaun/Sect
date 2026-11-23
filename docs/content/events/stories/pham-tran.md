# content/events/stories/pham-tran.json

Nguồn chuẩn: `content/events/stories/pham-tran.json`. Bản đọc tự sinh. Cú pháp: xem [guideline](../../GUIDELINE.md).

<a id="gk_tro_giu_am"></a>
## Tro giữ ấm — `gk_tro_giu_am`

- Loại: story; nguồn: Khám phá; chủ đề: Chuyện thường ngày; cảm xúc: Hài hước.
- Nơi: thôn trấn, thành trì.
- Điều kiện: tầng 0; một lần/kiếp.
- Bối cảnh tác giả: Mái hiên ở [thị trấn này].
- Vai: `{"a":{"gender":"nam","role":"Người bán bùa","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

“Tro nhà ta giữ ấm đến tận tiết Thanh Minh!” Người bán bùa {$a.ten} vừa rao vừa mời ngươi hơ tay trên thúng. Một góc khăn tuột xuống, để lộ viên gạch nung đỏ bên dưới.

### Lựa chọn

- **1. Mua cho hắn một lá bùa giữ nhiệt**
  Ngươi mua bùa ở sạp bên cạnh, bắt hắn dán lên thúng rồi mới được bán hàng. Hắn thử một lúc, mắt sáng lên: “Thế này thì khỏi phải chạy về thay gạch!”
  - `cost`: `{"st":10}`
  - `e`: `{"hd":{"p":3},"ng":{"g":3}}`
- **2. Đòi một nửa tiền bán**
  Hắn dúi cho ngươi mấy đồng, rồi gói tro vào những mảnh giấy nhỏ hơn. Trên mỗi gói vẫn viết “đủ dùng đến xuân”.
  - `e`: `{"st":14,"deed":"lua_loi"}`
- **3. Bỏ đi**
  Ngươi vừa đi khỏi, hắn đã đổi lời rao: “Tro có kèm gạch ấm, ai mua thì lại đây!”

<a id="gk_nuoc_qua_bo_thap"></a>
## Nước qua bờ thấp — `gk_nuoc_qua_bo_thap`

- Loại: story; nguồn: Khám phá; chủ đề: Lũ đầu hạ; cảm xúc: Phẫn nộ.
- Nơi: sông hồ.
- Điều kiện: tầng 0; ha; một lần/kiếp.
- Bối cảnh tác giả: Bờ đê giữa hai xóm.
- Vai: `{"a":{"gender":"nam","role":"Lý trưởng","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Nước lũ đã ngập sân xóm dưới. Lý trưởng {$a.ten} vẫn cho xe bò chắn cửa cống: mở cống sẽ cứu được xóm, nhưng nước sẽ tràn qua kho thóc của hắn. Trên mái nhà đối diện, có người đang buộc đứa nhỏ vào lưng. Người qua lại bàn tán: “Kho ấy có thóc cứu đói.” “Có cả thóc cho vay, mỗi đấu đòi hai.” “Đêm nay nước lên thì cùng ướt cả.”

### Lựa chọn

- **1. Kéo xe bò đi và mở cống**
  Dòng nước đổi hướng, người trên mái rạ xuống được. Nước tràn vào kho, cuốn theo cả những bao thóc giống gửi nhờ có buộc lạt xanh.
  - `e`: `{"deed":"cuu_nguoi"}`
- **2. Lấy ván kho đắp bờ tạm**
  Ngươi giữ được bờ đến lúc dân vét xong lối thoát nước, nhưng một cây cọc đập rạn xương tay. {$a.ten} sai người đi nhặt ván trước khi hỏi tay ngươi.
  - `e`: `{"hd":{"p":3},"ng":{"g":3},"hp":"-15%"}`
- **3. Bỏ đi**
  Ngươi đi tìm lối tránh lũ. Sau lưng vang tiếng dân xô xe, rồi tiếng gỗ gãy giữa dòng nước xiết.

<a id="gk_rang_roi_tren_them"></a>
## Răng rơi trên thềm — `gk_rang_roi_tren_them`

- Loại: story; nguồn: Khám phá; chủ đề: Chuyện hào hộ; cảm xúc: Cẩu huyết.
- Nơi: thôn trấn, thành trì.
- Điều kiện: tầng 0; một lần/kiếp.
- Bối cảnh tác giả: Sân nhà từ đường.
- Vai: `{"a":{"gender":"nam","role":"Thiếu gia","alignment":"context"},"b":{"gender":"nam","role":"Quản gia","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

“Đứng lại! Ngươi giẫm lên di vật tổ phụ ta!” Thiếu gia {$a.ten} chỉ chiếc răng dưới giày ngươi, đòi ngươi quỳ tạ tội. Con chó cạnh hắn đang chảy máu miệng; thấy chiếc răng, nó lại cúi xuống ngửi.

### Lựa chọn

- **1. Đưa chiếc răng cho quản gia {$b.ten} xem**
  {$b.ten} nhìn chiếc răng rồi nhìn con chó: “Bẩm thiếu gia, tổ phụ không có răng nanh thế này.” Đám người đứng xem bật cười. {$a.ten} giật lại chiếc răng, quát đuổi cả chó lẫn người.
  - `e`: `{"hd":{"p":3},"ng":{"g":3}}`
- **2. Nhận tiền để nhận lỗi**
  Hắn trả tiền cho ngươi cúi đầu trước đám đông, rồi truyền rằng ngươi đã lạy cả nhà hắn. Trên đường, có người trỏ xuống đôi ủng của ngươi mà cười.
  - `e`: `{"st":14,"hd":{"t":3},"ng":{"b":1}}`
- **3. Bỏ đi**
  Hắn gọi với theo hỏi ngươi biết cha hắn là ai chưa. Con chó ngậm mất chiếc răng giữa lúc hắn chờ câu trả lời.

<a id="gk_hu_muc_mua_thu"></a>
## Hũ mực mùa thu — `gk_hu_muc_mua_thu`

- Loại: story; nguồn: Khám phá; chủ đề: Thầy trò; cảm xúc: Cảm động.
- Nơi: thôn trấn, thành trì.
- Điều kiện: tầng 0; một lần/kiếp.
- Bối cảnh tác giả: Lớp học ở [thôn này].
- Vai: `{"a":{"gender":"nam","role":"thầy đồ","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Mỗi đứa trẻ mang một thìa muội đèn tới lớp để góp mực. Thầy đồ {$a.ten} dùng phần mực đầu tiên viết lên vách tên những đứa đã nghỉ học đi làm thuê, trong đó có tên còn viết lệch nét móc.

### Lựa chọn

- **1. Mua công một buổi của những đứa đã nghỉ**
  Ngươi trả công một buổi để bọn trẻ được về lớp. Chúng chen nhau đọc lại bài cũ, đứa nhớ đứa quên. {$a.ten} cười, chấm thêm nước vào nghiên: “Đọc chậm thôi, hôm nay không ai giành việc của các con.”
  - `cost`: `{"st":10}`
  - `e`: `{"hd":{"p":3},"ng":{"g":3},"an":["a","hũ mực mùa thu"]}`
- **2. Thuê {$a.ten} chép sách cho ngươi**
  Ngươi có bản chép đẹp và lão có tiền mua giấy, nhưng lớp nghỉ đến khi chép xong. Những đứa nhỏ tập viết bằng que trên sân.
  - `cost`: `{"st":10}`
  - `e`: `{"hd":{"t":1},"tv":3}`
- **3. Bỏ đi**
  Tiếng đánh vần theo ngươi ra tận đầu ngõ. Trong lớp vẫn còn vài chỗ trống.

<a id="gk_tieng_dep_trong_chum"></a>
## Tiếng dép trong chum — `gk_tieng_dep_trong_chum`

- Loại: story; nguồn: Khám phá; chủ đề: Ban đêm; cảm xúc: Kinh dị.
- Nơi: thôn trấn, thành trì.
- Điều kiện: tầng 0; dem; một lần/kiếp.
- Bối cảnh tác giả: Lò gốm ở cuối xóm.
- Vai: `{"a":{"gender":"nam","role":"Thợ gốm","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Trong chum úp có tiếng người đi dép ướt. Thợ gốm {$a.ten} đã nung mẻ ấy bằng gỗ dỡ từ một nhà cháy, và trong men chum còn in nửa dấu bàn chân.

### Lựa chọn

- **1. Úp chum lên một đôi dép khô**
  Ngươi đặt đôi dép khô dưới chum rồi niêm bùa quanh miệng. Tiếng bước chân dừng lại; đến sáng, dấu chân ướt dẫn từ lò gốm ra con đường cũ. Hai bàn chân ngươi lạnh buốt, nhưng trong chum không còn tiếng động.
  - `e`: `{"hd":{"p":3},"ng":{"g":3},"hp":"-10%","h":24,"tamma":-3}`
- **2. Niêm chum để bán cho người thu tà vật**
  Ngươi có linh thạch. Đêm ấy, trong bọc đựng tiền của ngươi có tiếng dép dừng ngay sát miệng bọc.
  - `e`: `{"st":14,"deed":"lua_loi","tamma":4}`
- **3. Bỏ đi**
  {$a.ten} dùng gạch chèn miệng chum. Tới gà gáy, viên gạch nằm ở đầu kia sân, ngay ngắn bên vũng nước.

<a id="gk_manh_truc_quay_vao"></a>
## Mành trúc quay vào — `gk_manh_truc_quay_vao`

- Loại: story; nguồn: Khám phá; chủ đề: Chuyện thường ngày; cảm xúc: Lãng mạn.
- Nơi: thôn trấn, thành trì.
- Điều kiện: tầng 0; một lần/kiếp.
- Bối cảnh tác giả: Hai căn nhà qua ngõ hẹp.
- Vai: `{"a":{"gender":"nu","role":"cô thợ đan","alignment":"context"},"b":{"gender":"nam","role":"người đẽo guốc","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Tấm mành nhà cô thợ đan {$a.ten} quay mặt đan hoa vào trong. Bên kia ngõ, người đẽo guốc {$b.ten} ngồi gọt một đôi guốc đã gần xong, thỉnh thoảng lại nhìn sang. Ngươi đi qua lần thứ ba, hắn vẫn đang gọt đúng một chỗ.

### Lựa chọn

- **1. Gõ cửa hỏi {$a.ten}**
  Nàng hé mành: “Phiền đạo hữu bảo người bên kia mang đôi guốc sang thử.” Nghe ngươi nhắn, {$b.ten} đứng bật dậy, suýt giẫm lên dao. Nàng đã kéo mành cao lên từ lúc nào.
  - `e`: `{"hd":{"p":3},"ng":{"g":3},"an":["a","mành trúc quay vào"]}`
- **2. Mua tấm mành**
  Nàng bán cho ngươi đủ tiền trả nhà. Trước khi cuộn mành, nàng gọi sang bên kia ngõ: “Mai mang guốc tới, không cần ngồi đợi nữa.”
  - `cost`: `{"st":10}`
  - `e`: `{"hd":{"t":1}}`
- **3. Bỏ đi**
  Ngươi đi được vài bước thì nghe tiếng nàng gọi người đẽo guốc. Hắn đáp lớn đến mức cả ngõ ngoái nhìn.

<a id="gk_mot_nen_duong_do"></a>
## Một nén đường đỏ — `gk_mot_nen_duong_do`

- Loại: story; nguồn: Khám phá; chủ đề: Chuyện thường ngày; cảm xúc: Ấm áp.
- Nơi: thôn trấn, thành trì.
- Điều kiện: tầng 0; một lần/kiếp.
- Bối cảnh tác giả: Bếp ăn ở bến củi.
- Vai: `{"a":{"gender":"nu","role":"Bà bán cháo","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

“Còn đủ, cứ ngồi xuống.” Bà bán cháo {$a.ten} gọi đám phu mới tan việc, rồi bẻ nén đường cuối cùng vào nồi. Ngươi nhìn bát của bà: chỉ có một ít cháo trắng, đã nguội.

### Lựa chọn

- **1. Góp một túi gạo và ngồi ăn**
  Ngươi mua thêm gạo, ngồi chờ cùng đám phu đến khi nồi mới chín. Bà múc cho ngươi bát đầy. Một người nhường chỗ, hỏi ngươi đường lên núi có khó đi không.
  - `cost`: `{"st":10}`
  - `e`: `{"hd":{"p":3},"ng":{"g":3},"an":["a","một nén đường đỏ"]}`
- **2. Mua cả nồi mang đi**
  Bà bán hết nồi cháo, đủ tiền nghỉ bếp một ngày. Khi đám phu tới muộn hỏi còn gì ăn, bà đành chỉ họ sang quán khác.
  - `cost`: `{"st":10}`
  - `e`: `{"hd":{"p":3},"ng":{"g":3}}`
- **3. Bỏ đi**
  Một người phu gọi ngươi ngồi ăn cùng. Ngươi chào bà rồi lên đường; sau lưng, câu chuyện lại rôm rả.

<a id="gk_hon_da_ke_quan_tai"></a>
## Hòn đá kê quan tài — `gk_hon_da_ke_quan_tai`

- Loại: story; nguồn: Khám phá; chủ đề: Tang tục; cảm xúc: Bi thương.
- Nơi: thôn trấn, thành trì.
- Điều kiện: tầng 0; một lần/kiếp.
- Bối cảnh tác giả: Xưởng mộc bên đường đất.
- Vai: `{"a":{"gender":"nam","role":"Thợ mộc","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Chiếc giá đặt quan tài bị gãy một chân. Thợ mộc {$a.ten} chèn đá bên dưới mà vẫn không vững, chưa dám đóng nắp. Người cha đứng đợi, trong tay nắm con quay sắt của đứa trẻ vừa mất.

### Lựa chọn

- **1. Sửa lại chân giá**
  Ngươi giữ hòm cho lão thay chân giá, làm đến gần sáng nên lỡ chuyến xe lên núi. Trước khi đóng nắp, người cha đặt con quay bên tay con rồi xin mọi người đợi thêm một lát.
  - `e`: `{"hd":{"p":3},"ng":{"g":3},"h":24,"an":["a","hòn đá kê quan tài"]}`
- **2. Mua hòm tốt hơn cho nhà có tang**
  Ngươi trả tiền làm một chiếc hòm chắc hơn. Người cha nói lời cảm tạ rất nhỏ, rồi nhờ lão thợ mộc đặt con quay vào cùng con mình.
  - `cost`: `{"st":10}`
  - `e`: `{"deed":"bo_thi"}`
- **3. Bỏ đi**
  Lão nhờ thêm hai người giữ hòm trong lúc sửa giá. Người cha vẫn đứng đó, chưa buông con quay.

<a id="gk_can_muoi_dau_cho"></a>
## Cân muối đầu chợ — `gk_can_muoi_dau_cho`

- Loại: story; nguồn: Khám phá; chủ đề: Sinh kế; cảm xúc: Phẫn nộ.
- Nơi: thôn trấn, thành trì.
- Điều kiện: tầng 0; một lần/kiếp.
- Bối cảnh tác giả: Cổng chợ.
- Vai: `{"a":{"gender":"nam","role":"người thu thuế","alignment":"context"},"b":{"gender":"nam","role":"Người gánh muối","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Người thu thuế {$a.ten} cân cả nước mưa đọng trong bao muối để bắt nộp thêm. Người gánh muối {$b.ten} tháo nón đong thử một nón nước chảy ra từ bao, dưới đáy nón đọng vài hạt trắng.

### Lựa chọn

- **1. Hong khô muối ngay trước mặt dân chợ**
  Ngươi hong muối bằng linh lực đến rát lòng bàn tay. Bao nhẹ đi rõ rệt, người thu thuế vẫn định ghi số cũ. Dân chợ vây lại đòi xem sổ; hắn buộc phải cân lại.
  - `cost`: `{"mp":"20%"}`
  - `e`: `{"hd":{"p":3},"ng":{"g":3},"hp":"-15%"}`
- **2. Đứng ra nộp thay**
  Muối được đem bán trước giờ đóng chợ. Hôm sau, {$a.ten} đặt cân ngay dưới chỗ dột.
  - `cost`: `{"st":10}`
  - `e`: `{"hd":{"p":3},"ng":{"g":3}}`
- **3. Bỏ đi**
  Người gánh muối xin được phơi hàng rồi quay lại cân. Lính gác giữ bao, không cho mang đi. Ngươi nghe tiếng đôi bên cãi nhau suốt đoạn đường ra chợ.

<a id="gk_con_dau_bun"></a>
## Con dấu bùn — `gk_con_dau_bun`

- Loại: story; nguồn: Khám phá; chủ đề: Lừa đảo vụng về; cảm xúc: Hài hước.
- Nơi: thôn trấn, thành trì.
- Điều kiện: tầng 0; một lần/kiếp.
- Bối cảnh tác giả: Sân phơi gạch.
- Vai: `{"a":{"gender":"nam","role":"Kẻ làm giả","alignment":"context"},"b":{"gender":"nam","role":"Viên lại","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Kẻ làm giả {$a.ten} xin ngươi xem giùm con dấu hắn khắc để miễn phu dịch. Hắn đã khắc đúng mọi nét chữ, kể cả chữ “mặt sau” ghi trên mảnh giấy làm mẫu.

### Lựa chọn

- **1. Dẫn hắn tới xin miễn cho người nhà đang bệnh**
  Ngươi cùng hắn đợi hết buổi, trình rõ việc người nhà đang bệnh. Viên lại {$b.ten} cấp giấy miễn dịch có hạn, dặn tới kỳ phải xin lại. Hắn cầm giấy thật, nhìn con dấu giả trong túi rồi đỏ mặt.
  - `e`: `{"hd":{"p":3},"ng":{"g":3},"h":24}`
- **2. Mua con dấu để đem bán**
  Ngươi kiếm ít tiền khi bán nó làm khuôn bánh. Hôm sau, cả chợ nhai chữ “mặt sau” bằng bột nếp.
  - `cost`: `{"st":10}`
  - `e`: `{"st":24,"hd":{"t":1}}`
  - `accounting`: `{"mode":"buy-and-sell","capital":10,"profit":14}`
- **3. Bỏ đi**
  Hắn đóng thử dấu lên gạch ướt, nhấc lên không được. “Đất này bám quá,” hắn lẩm bẩm. Ngươi nghĩ lỗi không hẳn ở đất.

<a id="gk_da_trong_cuoi_nam"></a>
## Da trống cuối năm — `gk_da_trong_cuoi_nam`

- Loại: story; nguồn: Khám phá; chủ đề: Giao thừa; cảm xúc: Bất an.
- Nơi: thôn trấn, thành trì.
- Điều kiện: tầng 0; toi/dem; dong; một lần/kiếp.
- Bối cảnh tác giả: Lầu canh.
- Vai: `{"a":{"gender":"nam","role":"Người giữ canh","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Đến đêm cuối năm, mặt trống canh phồng lên từ phía trong. Người giữ canh {$a.ten} áp tai nghe, rồi đếm từng tiếng đáp bằng những ngón tay đã mất hai đốt.

### Lựa chọn

- **1. Mua da mới thay mặt trống**
  Ngươi trả tiền mua tấm da ở xưởng gần đó, cùng người giữ canh thay trước giờ điểm trống. Khi tháo mặt cũ, bên trong trống rỗng. Tiếng gõ vẫn vang thêm ba lần rồi mới dứt.
  - `cost`: `{"st":10}`
  - `e`: `{"hd":{"p":3},"ng":{"g":3},"tamma":-3}`
- **2. Đánh theo nhịp vọng bên trong**
  Trống chỉ cho ngươi chỗ giấu một hũ bạc cũ. Đêm sau, lúc ngươi khép mắt, có hai tiếng gõ phát ra từ đáy hũ.
  - `e`: `{"st":14,"hd":{"t":3},"ng":{"b":1},"tamma":4}`
- **3. Bỏ đi**
  Ngươi xuống lầu. Được nửa thang, tiếng trống vang lên ngay sau lưng; nhìn lại, người giữ canh vẫn chưa cầm dùi.

<a id="gk_duong_kien_qua_nong"></a>
## Đường kiến qua nong — `gk_duong_kien_qua_nong`

- Loại: story; nguồn: Khám phá; chủ đề: Ngộ đạo; cảm xúc: Trầm tĩnh.
- Nơi: thôn trấn, thành trì.
- Điều kiện: tầng 0; một lần/kiếp.
- Bối cảnh tác giả: Sân nhà nuôi tằm.
- Vai: `{"a":{"gender":"nam","role":"Người nuôi tằm","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Kiến tha từng hạt gạo qua mép nong, tản ra mỗi khi bóng bàn tay ngươi che xuống. Người nuôi tằm {$a.ten} dời nong sang một bên cho đàn kiến đi thẳng, còn mình bưng rá chạy vòng qua sân.

### Lựa chọn

- **1. Ngồi quan sát tới khi đàn kiến qua hết**
  Ngươi nhìn đàn kiến đổi lối quanh vết nứt, chợt hiểu không cần ép khí đi qua huyệt đang đau. Thử vận công một vòng, ngực nhẹ hẳn. {$a.ten} gọi ngươi ăn cơm, ngươi mới biết đã ngồi hết buổi.
  - `e`: `{"tv":4,"h":6}`
- **2. Chặn đường kiến để thử đổi dòng khí**
  Đàn kiến dồn lại, ngươi ngộ ra cách giữ một luồng khí trước khi buông. {$a.ten} im lặng nhặt từng hạt gạo đổ trên đất.
  - `e`: `{"tv":4,"hd":{"t":1}}`
- **3. Bỏ đi**
  Ngươi tránh sang bên cho đàn kiến qua. Người nuôi tằm gật đầu chào, tiếp tục thu nong trước khi trời mưa.

<a id="gk_gio_dong_cua_ai"></a>
## Giờ đóng cửa ải — `gk_gio_dong_cua_ai`

- Loại: story; nguồn: Khám phá; chủ đề: Có hạn chót; cảm xúc: Căng thẳng.
- Nơi: núi non.
- Điều kiện: tầng 0; chieu; một lần/kiếp.
- Bối cảnh tác giả: Ải núi trước hoàng hôn.
- Vai: `{"a":{"gender":"nam","role":"Thợ xẻ đá","alignment":"context"},"b":{"gender":"nam","role":"người giữ ải","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Mỗi tờ giấy qua ải chỉ cho một người đi. Thợ xẻ đá {$a.ten} đã nhường lượt cuối cho người làm bị thương, giờ phải chờ ngoài cổng đến sáng. Lão xin lính gác nhắn nhà đừng đợi cơm; cửa ải đang hạ xuống.

### Lựa chọn

- **1. Dùng giấy của ngươi đưa lão qua trước**
  Lão nhận giấy, đưa lại cho ngươi áo khoác để qua đêm ngoài ải. “Mai ta ra đón.” Sáng sớm, lão quả nhiên trở lại, còn mang theo cơm nóng.
  - `e`: `{"hd":{"p":3},"ng":{"g":3},"an":["a","giờ đóng cửa ải"],"h":12}`
- **2. Trả bạc xin kéo cửa thêm**
  Hai người qua được. Hôm sau lính ải treo thêm một cái bát bên cửa, đúng tầm người qua phải cúi đầu.
  - `cost`: `{"st":10}`
  - `e`: `{"hd":{"p":3},"ng":{"g":3}}`
- **3. Thách người giữ ải {$b.ten} đấu gậy để đổi một lượt qua**
  - `fight`: `{"k":"detu","n":"{$b.ten}","spar":1}`
  - **Thắng trận**: Ngươi đưa lão qua trước khi hạ cửa.
    `{"e":{"hd":{"p":3},"ng":{"g":3}}}`
  - **Thua trận**: Thua, ngươi phải nằm lại ngoài ải với cán gậy đã nứt.
- **4. Bỏ đi**
  Ngươi nghe lão gọi qua khe cửa nhờ người nhà ăn cơm trước. Chiếc gậy lão đẩy qua nằm ngang dưới chân lính.

<a id="gk_cai_bong_o_chan_coi"></a>
## Cái bóng ở chân cối — `gk_cai_bong_o_chan_coi`

- Loại: story; nguồn: Khám phá; chủ đề: Đêm trăng; cảm xúc: Kinh dị.
- Nơi: thôn trấn, thành trì.
- Điều kiện: tầng 0; dem; một lần/kiếp.
- Bối cảnh tác giả: Nhà xay thóc.
- Vai: `{"a":{"gender":"nam","role":"Người xay thóc","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Cái cối quay trong đêm dù người xay thóc {$a.ten} đã tháo ách lừa. Dưới chân cối, bóng một người quỳ xoay theo, còn chính giữa bóng có một viên răng cối vỡ.

### Lựa chọn

- **1. Đục viên đá vỡ ra**
  Ngươi mượn đục của người xay thóc, phá mảnh đá đang ghim cái bóng xuống nền. Lưỡi đục gãy đúng lúc cái bóng đứng lên. Nó cúi đầu với ngươi rồi đi qua cửa, cối xay cũng dừng.
  - `e`: `{"hd":{"p":3},"ng":{"g":3},"tamma":-3}`
- **2. Kê cối lại và giữ cái bóng làm việc**
  {$a.ten} chia tiền công cho ngươi. Mỗi khi ngươi nhai cơm, góc hàm đau đúng vào nhịp đá nghiến.
  - `e`: `{"st":14,"deed":"lua_loi","tamma":4}`
- **3. Bỏ đi**
  Ra khỏi nhà xay, ngươi vẫn nghe tiếng cối. Đi thêm một đoạn, tiếng ấy chậm dần, như người kéo đã mỏi.

<a id="gk_mot_dot_den_gianh_lai"></a>
## Một đốt đèn giành lại — `gk_mot_dot_den_gianh_lai`

- Loại: story; nguồn: Khám phá; chủ đề: Chuyện phường nghề; cảm xúc: Xót xa.
- Nơi: thôn trấn, thành trì.
- Điều kiện: tầng 0; một lần/kiếp.
- Bối cảnh tác giả: Xóm làm nến.
- Vai: `{"a":{"gender":"nam","role":"Người làm nến","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Người làm nến {$a.ten} rút bớt sáp trong mỗi khuôn, nhét bấc dài cho đủ chiều cao rồi đem phần sáp giấu về nhà. Con gái hắn dùng sáp ấy làm nến học chữ. Chủ lò sắp kiểm hàng, hắn loay hoay cắt bấc thừa mà chưa biết giấu đi đâu.

### Lựa chọn

- **1. Bù tiền sáp và đặt hai cha con làm một mẻ nến**
  Ngươi mua chỗ nến thiếu sáp rồi đặt thêm một mẻ đúng cân. Hắn nhận lỗi với chủ lò, xin trừ dần phần đã lấy vào tiền công. Con gái được phụ việc se bấc, có tiền mua nến học.
  - `cost`: `{"st":10}`
  - `e`: `{"hd":{"p":3},"ng":{"g":3},"an":["a","một đốt đèn giành lại"]}`
- **2. Đem nến thiếu tới gặp chủ lò**
  Chủ lò thưởng bạc cho ngươi, đuổi người thợ vì ăn bớt sáp. Hắn không cãi, chỉ xin mang đồ của con đi. Cô bé ôm hộp bấc đứng đợi ngoài sân.
  - `e`: `{"st":14,"deed":"lua_loi","tamma":2,"oan":["a","một đốt đèn giành lại"]}`
- **3. Bỏ đi**
  Hắn đem phần sáp giấu được trở lại lò. Ngươi chưa biết hắn sẽ nhận lỗi hay tìm cách đổ vào khuôn cho kịp.

<a id="gk_duoi_vach_voi"></a>
## Dưới vạch vôi — `gk_duoi_vach_voi`

- Loại: story; nguồn: Khám phá; chủ đề: Tranh chấp ruộng; cảm xúc: Phẫn nộ.
- Nơi: thôn trấn, thành trì.
- Điều kiện: tầng 0; một lần/kiếp.
- Bối cảnh tác giả: Bờ đất sau nhà.
- Vai: `{"a":{"gender":"nam","role":"Địa chủ","alignment":"context"},"b":{"gender":"nam","role":"người tá điền","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Địa chủ {$a.ten} quét vôi qua cả bếp nhà người tá điền {$b.ten} để dời mốc ruộng. Đứa nhỏ trong nhà ngồi ăn khoai bên này vạch, còn củi để nấu nồi sau nằm hết bên kia.

### Lựa chọn

- **1. Đào tìm chân mốc cũ**
  Ngươi đào được mốc cũ có dấu của hai nhà, ở lại làm chứng đến hết buổi. {$a.ten} không cãi được, đành cho người xóa vạch. Bữa trưa hôm ấy, nhà tá điền kê thêm một chỗ mời ngươi.
  - `e`: `{"hd":{"p":3},"ng":{"g":3},"h":24}`
- **2. Mua phần đất sát bếp**
  Họ giữ được bếp dưới tên ngươi. Mỗi mùa, {$b.ten} đem một túi khoai tới và đứng đợi ngoài vạch cũ.
  - `cost`: `{"st":10}`
  - `e`: `{"hd":{"p":3},"ng":{"g":3}}`
- **3. Bỏ đi**
  Đứa nhỏ kéo một que củi qua vạch bằng đầu đũa, rón rén như câu cá.

<a id="gk_cai_chan_ke_cao"></a>
## Cái chạn kê cao — `gk_cai_chan_ke_cao`

- Loại: story; nguồn: Khám phá; chủ đề: Nạn chuột; cảm xúc: Cảm động.
- Nơi: thôn trấn, thành trì.
- Điều kiện: tầng 0; một lần/kiếp.
- Bối cảnh tác giả: Xóm ven đồng.
- Vai: `{"a":{"gender":"nam","role":"người đan sọt","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Chuột đã gặm chân chạn nhà người đan sọt {$a.ten}. Lão kê chạn lên thúng, còn tấm phản duy nhất trong nhà bị tháo ván để nâng cả chỗ để thức ăn. Người qua lại bàn tán: “Chuột từ vựa cũ tràn ra.” “Có người thấy chúng kéo cả một củ khoai bằng đuôi.”

### Lựa chọn

- **1. Cùng dân bịt ổ và kê lại chạn**
  Ngươi cùng dân làng bịt lối chuột từ vựa cũ, làm đến sáng mới xong. Lão đan sọt giữ ngươi lại ăn khoai nóng. Cả nhà ngồi ngay dưới chạn, lần đầu ăn mà không phải canh tiếng sột soạt.
  - `e`: `{"hd":{"p":3},"ng":{"g":3},"h":24,"an":["a","cái chạn kê cao"]}`
- **2. Lấy tiền đặt bùa đuổi chuột riêng cho nhà lão**
  Nhà lão giữ được thức ăn. Đàn chuột tràn sang nhà kế bên, nơi cái chạn còn thấp hơn một gang tay.
  - `cost`: `{"st":10}`
  - `e`: `{"hd":{"p":1},"ng":{"g":1}}`
- **3. Bỏ đi**
  Lão hỏi nhà bên có dư mèo con không. Người hàng xóm nhận lời đi hỏi giúp; xem ra cả xóm rồi cũng phải cùng lo.

<a id="gk_manh_va_tren_buom_giay"></a>
## Mảnh vá trên buồm giấy — `gk_manh_va_tren_buom_giay`

- Loại: story; nguồn: Khám phá; chủ đề: Chiều đầu xuân; cảm xúc: Ấm áp.
- Nơi: sông hồ, thôn trấn.
- Điều kiện: tầng 0; xuan; một lần/kiếp.
- Bối cảnh tác giả: Mương làng.
- Vai: `{"a":{"gender":"nam","role":"Đứa trẻ","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Đám trẻ đang thả thuyền giấy xuống mương. Đứa trẻ {$a.ten} đặt thêm một miếng ngói lên thuyền: mẹ bảo mộ cha ngoài rừng bị dột, nó muốn gửi ngói tới sửa. Thuyền vừa chạm nước đã nghiêng.

### Lựa chọn

- **1. Mua giấy dai gấp lại thuyền**
  Ngươi mua tờ giấy dai ở hàng gần đó, gấp thuyền đủ chắc để chở miếng ngói qua khúc mương. Đứa trẻ chạy theo reo lên. Ngươi dặn nó muốn sửa mộ thì phải nhờ người lớn dẫn đi.
  - `cost`: `{"st":10}`
  - `e`: `{"hd":{"p":3},"ng":{"g":3},"an":["a","mảnh vá trên buồm giấy"]}`
- **2. Lấy miếng ngói xuống**
  Thuyền trôi ngay khi ngươi nhấc miếng ngói xuống. Ngươi giải thích đường nước không dẫn tới mộ cha nó. Nó nghe hết, rồi hỏi ngươi đường vào rừng.
- **3. Bỏ đi**
  Một đứa lớn hơn rủ cả bọn ngày mai theo mẹ nó vào rừng. Chúng vớt thuyền lên, gói miếng ngói lại cẩn thận.

<a id="gk_ao_cung_may_do"></a>
## Áo cúng may dở — `gk_ao_cung_may_do`

- Loại: story; nguồn: Khám phá; chủ đề: Chuyện gia đình; cảm xúc: Bi thương.
- Nơi: thôn trấn, thành trì.
- Điều kiện: tầng 0; một lần/kiếp.
- Bối cảnh tác giả: Nhà nhuộm chàm.
- Vai: `{"a":{"gender":"nam","role":"Thợ nhuộm","alignment":"context"},"b":{"gender":"nu","role":"Người vợ","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Thợ nhuộm {$a.ten} ngâm một vạt áo cúng cho con trai mất tích trong lần bắt lính. Người vợ {$b.ten} đem sang vạt còn lại, trên vai áo có chỗ bà đã nới thêm cho vừa một người trưởng thành.

### Lựa chọn

- **1. Giữ một vạt để hỏi tin dọc đường**
  Ngươi mất mấy ngày dò hỏi, tìm được người cùng đội lính và nơi chôn cất con họ. Hai người nghe hết, xin ngươi chỉ đường để tự đi đón hài cốt. Chiếc áo được mang theo trong hành trang.
  - `e`: `{"hd":{"p":3},"ng":{"g":3},"h":24,"an":["a","áo cúng may dở"]}`
- **2. Mua vải cho họ may áo mới**
  Họ đem vải chia cho những nhà cũng đang đợi người về. Vạt áo cũ được gấp vào ngăn cao nhất của chạn.
  - `cost`: `{"st":10}`
  - `e`: `{"hd":{"p":3},"ng":{"g":3}}`
- **3. Bỏ đi**
  {$b.ten} cầm kéo đứng bên thùng chàm. Bà cắt một mẩu vải thừa để thử màu trước.

<a id="gk_mai_ra_dem_ngoi"></a>
## Mái rạ đếm ngói — `gk_mai_ra_dem_ngoi`

- Loại: story; nguồn: Khám phá; chủ đề: Tu sĩ và phàm nhân; cảm xúc: Trầm buồn.
- Nơi: thôn trấn, thành trì.
- Điều kiện: tầng 0; một lần/kiếp.
- Bối cảnh tác giả: Xóm lợp mái.
- Vai: `{"a":{"gender":"nam","role":"tán tu","alignment":"context"},"b":{"gender":"nu","role":"bà lợp nhà","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Tán tu {$a.ten} nhận đưa ngói lên mái, còn bà lợp nhà {$b.ten} phải tự leo thang xếp từng viên. Hắn thấy ngươi thì chào đồng đạo, khoe mình làm chưa đầy một khắc. Bà ở trên mái gọi xuống: “Còn nửa ngày buộc ngói, tiên trưởng có tính không?”

### Lựa chọn

- **1. Đưa ngói lên và ở lại buộc lạt**
  Ngươi dùng linh lực đưa ngói lên, rồi theo bà buộc ngói tới tối. Hắn ngồi dưới nhìn một lúc cũng leo lên phụ. Ba người làm xong trước trận mưa đêm.
  - `cost`: `{"mp":"20%"}`
  - `e`: `{"hd":{"p":3},"ng":{"g":3},"h":12}`
- **2. Trả công cho {$a.ten} làm trọn việc**
  Hắn nhận thêm tiền, hỏi bà cách buộc ngói rồi làm trọn mái. Đến lúc xuống thang, hắn mới nói: “Việc này đúng là không chỉ nhấc tay một cái.”
  - `cost`: `{"st":10}`
  - `e`: `{"hd":{"p":1},"ng":{"g":1}}`
- **3. Bỏ đi**
  Bà gọi hắn giữ thang. Hắn định chối, thấy thang nghiêng lại vội đứng dậy đỡ.
