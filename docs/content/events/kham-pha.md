# content/events/kham-pha.json

Nguồn chuẩn: `content/events/kham-pha.json`. Bản đọc tự sinh. Cú pháp: xem [guideline](../GUIDELINE.md).

<a id="linh_thao"></a>
## Linh thảo trên vách — `linh_thao`

- Loại: event; nguồn: Khám phá; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: núi non, rừng sâu, hang động.
- Điều kiện: mọi tầng; nghỉ 720 giờ.
- Bối cảnh tác giả: nui / rung / dong.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/core/12-dong-doi-tam-thoi.js`.

1. {$canh} Trên vách đá dựng đứng, một gốc linh thảo lá đỏ như son tỏa ánh sáng nhạt. Ít nhất cũng trăm năm tuổi.

2. Ngươi ngửi thấy mùi hương ngọt lịm. Ngẩng lên, một đóa hoa trắng muốt mọc nơi kẽ đá cao mấy chục trượng, có con rắn nhỏ quấn quanh thân.

3. Giữa khe đá ẩm ướt mọc một cây nấm màu tím, tán to bằng cái nón. Quanh đó không có cọng cỏ nào, như mọi thứ đều nhường chỗ cho nó.

### Lựa chọn

- **1. Leo lên hái**
  - `chk`: `["tp",9]`
  - **Thành công**: Ngươi bám từng mỏm đá mà lên. Lúc chạm được linh thảo, mồ hôi đã ướt đẫm lưng. Đáng giá.,Một chân trượt, một tay bám, ngươi treo lơ lửng giữa không trung một hồi lâu. Nhưng cuối cùng, linh thảo đã nằm trong tay.
    `{"e":{"pill":"tinhnguyen","tv":4}}`
  - **Thất bại**: Đá vụn dưới tay vỡ ra. Ngươi rơi xuống, lăn mấy vòng mới dừng. Ngẩng lên, linh thảo vẫn đung đưa trên cao như trêu ngươi.
    `{"e":{"hp":"-25%"}}`
- **2. Dùng pháp thuật hái từ xa**
  Linh lực hóa thành bàn tay vô hình, nhẹ nhàng nhổ cả gốc. Ngươi thở ra, mệt nhưng hài lòng.
  - `cost`: `{"mp":"40%"}`
  - `e`: `{"pill":"hoixuan","tv":3}`
- **3. Chờ thủ hộ thú lộ diện**
  - `fight`: `{"k":"mang"}`
  - **Thắng trận**: Thủ hộ thú chết. Ngươi thong thả hái linh thảo, lại được thêm cái mật.
    `{"e":{"pill":"tinhnguyen","st":8}}`
- **4. Cáo từ, tiếp tục lên đường**
  Ngươi chọn rời khỏi nơi này, không can dự thêm.

<a id="tranh_bao"></a>
## Tranh đoạt bảo vật — `tranh_bao`

- Loại: event; nguồn: Khám phá; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: núi non, rừng sâu, phế tích, hang động, hoang nguyên, biển khơi.
- Điều kiện: mọi tầng; nghỉ 720 giờ.
- Bối cảnh tác giả: nui / rung / phe / dong / hoang / bien.
- Vai: `{"a":{"role":"tre","alignment":"context"},"b":{"role":"tre","alignment":"context"}}`.
- Xuất xứ: `d9ab301` / `src/game/core/12-dong-doi-tam-thoi.js`.

1. Kiếm quang và hỏa quang va vào nhau trên không trung. {$a.ten} và {$b.ten} đang tranh nhau một chiếc hộp ngọc, cả hai đều đã bị thương.

2. Một bảo vật vừa xuất thế, hào quang chiếu sáng nửa sườn núi. Bên dưới, hai nhóm tu sĩ đang đánh nhau sống chết.

### Lựa chọn

- **1. Đợi cả hai kiệt sức rồi ra tay**
  - `chk`: `["tp",11]`
  - **Thành công**: Lúc cả hai cùng thở dốc, ngươi lao ra chộp lấy hộp ngọc rồi độn thổ. Sau lưng là tiếng chửi rủa vang trời.
    `{"e":{"relic":0,"hd":{"t":3},"ng":{"b":1},"oan":["a","cướp bảo vật trước mắt"]}}`
  - **Thất bại**: Cả hai đều quay lại nhìn ngươi. Có lẽ đó là lần duy nhất họ đồng lòng.
    `{"fight":{"k":"tantu","m":1.2},"win":{"t":"Ngươi đánh lui cả hai. Bảo vật về tay ngươi, dù cái giá không nhỏ.","e":{"relic":0}}}`
- **2. Giúp {$a.ten}**
  - `fight`: `{"k":"tantu","n":"{$b.ten}"}`
  - **Thắng trận**: {$a.ten} chia cho ngươi một nửa chiến lợi phẩm, còn kéo ngươi đi uống rượu tới khuya.
    `{"e":{"st":25,"pill":1,"an":["a","giúp giữ bảo vật"]}}`
- **3. Không dính vào**
  Bảo vật nhiều kẻ tranh thường là mồi câu. Ngươi rời đi.
  - `e`: `{"tv":2}`

### Nối cơ chế

```json
{
  "variables": {
    "$hook": "tranh_bao_v"
  }
}
```

<a id="sap_ban"></a>
## Sạp hàng đồ cổ — `sap_ban`

- Loại: event; nguồn: Khám phá; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: thôn trấn, thành trì.
- Điều kiện: mọi tầng; nghỉ 720 giờ.
- Bối cảnh tác giả: tran / thanh.
- Vai: `{"a":{"role":"thuong","alignment":"context"}}`.
- Xuất xứ: `d9ab301` / `src/game/core/12-dong-doi-tam-thoi.js`.

1. Một sạp hàng nhỏ bày la liệt đồ cũ. {$a.ten}, {$a.look}, vừa thấy ngươi đã nhoẻn cười: “{$a.goi} xem thử, toàn đồ thượng cổ cả!”

2. Ở góc chợ, một gã bán hàng rong đang thề sống thề chết rằng cái bát mẻ trên tay từng là bát cơm của tiên nhân.

### Lựa chọn

- **1. Mua đại một món**
  - `cost`: `{"st":22}`
  - **Khả năng 1**: Về nhìn kỹ, hóa ra là đồ thật! `{"w":2,"e":{"relic":0}}`
  - **Khả năng 2**: Là một viên đan không rõ tên, ngửi thấy thơm. Ngươi đánh liều cất đi. `{"w":2,"e":{"pill":1}}`
  - **Khả năng 3**: Đồ giả. Rõ ràng là đồ giả. Ngươi cười khổ, coi như học phí. `{"w":2}`
- **2. Mặc cả**
  - `chk`: `["van",8]`
  - **Thành công**: Ngươi nói một hồi, gã bán hàng mặt tái mét, cuối cùng đưa ngươi một món gần như cho không.
    `{"e":{"relic":0,"st":-6}}`
  - **Thất bại**: Gã cười hề hề, không bớt một đồng. Ngươi bỏ đi.
- **3. Vạch trần đồ giả**
  - `chk`: `["ngo",10]`
  - **Thành công**: Ngươi chỉ ra từng vết keo dán. Đám đông cười ồ, gã phải bồi thường cho mấy người bị lừa trước đó, lại dúi cho ngươi chút tiền để im miệng.
    `{"e":{"st":15,"hd":{"p":1},"ng":{"g":1}}}`
  - **Thất bại**: Ngươi nói sai. Món đó là thật. Cả chợ cười ngươi.
    `{"e":{"tamma":2}}`
- **4. Cáo từ, tiếp tục lên đường**
  Ngươi chọn rời khỏi nơi này, không can dự thêm.

### Nối cơ chế

```json
{
  "variables": {
    "$hook": "sap_ban_v"
  }
}
```

<a id="thu_con"></a>
## Thú non lạc mẹ — `thu_con`

- Loại: event; nguồn: Khám phá; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: rừng sâu, núi non, hang động, hoang nguyên.
- Điều kiện: mọi tầng; nghỉ 720 giờ.
- Bối cảnh tác giả: rung / nui / dong / hoang.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/core/12-dong-doi-tam-thoi.js`.

1. Trong hốc cây, một con hồ ly nhỏ lông trắng đang run rẩy, chân bị kẹp. Nó kêu ư ử khi thấy ngươi.

2. Tiếng kêu non nớt dẫn ngươi tới một con hồ ly con, lông đỏ như lửa, mắt đen láy. Mẹ nó nằm chết cách đó không xa, trên mình cắm ba mũi tên.

### Lựa chọn

- **1. Cứu và nuôi nó**
  Ngươi ôm nó lên, lau sạch bùn đất, băng chỗ bị thương. Con thú nhỏ liếm tay ngươi rồi chui vào ngực áo, từ đó không chịu rời.
  - `req`: `{"$hook":"thu_con_c_0_req"}`
  - `e`: `{"petNew":"holy","deed":"phong_sinh"}`
- **2. Lấy yêu đan**
  Ngươi xuống tay dứt khoát. Yêu đan nhỏ như hạt đậu, vẫn còn ấm.
  - `e`: `{"tv":6,"deed":"giet_thu_vo_hai","tamma":3}`
- **3. Đưa về hang**
  - **Khả năng 1**: Ngươi đặt nó trước cửa hang. Một con thú lớn hiện ra, nhìn ngươi rất lâu, rồi đẩy ra một viên ngọc sáng. `{"w":2,"e":{"relic":0,"deed":"phong_sinh"}}`
  - **Khả năng 2**: Thú mẹ tưởng ngươi bắt con nó, gầm lên lao tới! `{"w":1,"fight":{"k":"beast"},"win":{"t":"Ngươi đánh lui thú mẹ. Hai mẹ con chạy vào rừng sâu. Ngươi đứng đó, không biết nên vui hay buồn.","e":{"tv":3}}}`
- **4. Cáo từ, tiếp tục lên đường**
  Ngươi chọn rời khỏi nơi này, không can dự thêm.

<a id="thac_ngo"></a>
## Ngộ đạo dưới thác — `thac_ngo`

- Loại: event; nguồn: Khám phá; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: sông hồ.
- Điều kiện: mọi tầng; nghỉ 720 giờ.
- Bối cảnh tác giả: nui / song / rung.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/core/12-dong-doi-tam-thoi.js`.

1. Thác nước trắng xóa đổ xuống từ trăm trượng. Ngươi ngồi xuống tảng đá bên dưới, tiếng nước gầm như sấm mà lòng lại tĩnh lạ thường.

2. {$canh} Tiếng nước chảy có nhịp, như có ai đang gảy đàn. Ngươi bỗng nhớ tới một câu khẩu quyết chưa từng hiểu.

### Lựa chọn

- **1. Ngồi xuống ngộ đạo**
  - `chk`: `["ngo",9]`
  - **Thành công**: {tvgain} Khi mở mắt, trăng đã lên tới đỉnh. Ngươi ngồi đó nửa năm.
    `{"e":{"dao":2,"tv":14,"tam":1,"h":360}}`
  - **Thất bại**: Càng nghĩ càng rối. Tiếng nước như tiếng cười nhạo. Ngươi đứng dậy, đầu đau như búa bổ.
    `{"e":{"tamma":4,"tv":3,"h":216}}`
- **2. Đứng dưới thác luyện thể**
  Nước đập vào lưng như búa tạ. Ngươi nghiến răng chịu đựng ba ngày ba đêm, da thịt tím bầm rồi lại lành.
  - `e`: `{"hp":"-15%","hpP":5}`
- **3. Ngắm một lúc rồi đi**
  Cảnh đẹp, nhưng đường còn dài.
  - `e`: `{"tamma":-3}`
- **4. Cáo từ, tiếp tục lên đường**
  Ngươi chọn rời khỏi nơi này, không can dự thêm.

<a id="bia_co"></a>
## Bia đá cổ — `bia_co`

- Loại: event; nguồn: Khám phá; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: phế tích, núi non, hoang nguyên, thiên lộ.
- Điều kiện: mọi tầng; nghỉ 720 giờ.
- Bối cảnh tác giả: phe / nui / hoang / thien.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/core/12-dong-doi-tam-thoi.js`.

1. Một tấm bia đá cao ba trượng, chữ khắc như rồng bay phượng múa. Nhìn lâu, ngươi thấy chữ như đang chuyển động.

2. Giữa đống đổ nát có tấm bia gãy. Nửa trên đã mất, nửa dưới còn mấy hàng chữ cổ, nét nào cũng sâu như kiếm khắc.

### Lựa chọn

- **1. Tham ngộ**
  - `chk`: `["ngo",11]`
  - **Thành công**: Chữ trên bia hóa thành kiếm, thành lửa, thành nước, rồi tụ lại trong đầu ngươi thành một môn pháp thuật.
    `{"e":{"dao":2,"skill":1,"lore":"doan_thien"}}`
  - **Thất bại**: Chữ trên bia đâm vào thức hải như kim. Ngươi ôm đầu lùi lại, mũi chảy máu.
    `{"e":{"hp":"-10%","tamma":3}}`
- **2. Chép lại để bán**
  Mất ba ngày mới chép xong. Ít ra cũng có thứ để bán cho đám thư sinh hiếu kỳ.
  - `e`: `{"st":18,"h":36}`
- **3. Đập bia lấy linh thạch bên trong**
  Bia vỡ. Trong lõi đá quả có linh thạch, nhưng ngươi có cảm giác vừa làm một chuyện không nên làm.
  - `e`: `{"st":35,"deed":"dao_mo"}`
- **4. Cáo từ, tiếp tục lên đường**
  Ngươi chọn rời khỏi nơi này, không can dự thêm.

<a id="ao_tran"></a>
## Ảo trận — `ao_tran`

- Loại: event; nguồn: Khám phá; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: rừng sâu, phế tích, hang động, núi non, ma địa.
- Điều kiện: mọi tầng; nghỉ 720 giờ.
- Bối cảnh tác giả: rung / phe / dong / nui / ma.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/core/12-dong-doi-tam-thoi.js`.

1. Sương mù dâng lên. Khi tan đi, ngươi thấy mình đứng giữa sân nhà cũ ở {$que}. Có tiếng gọi vào ăn cơm.

2. Bước thêm một bước, cảnh vật đổi khác. Ngươi đứng trên đài cao, bên dưới hàng vạn người quỳ lạy, gọi ngươi là Tiên Tôn.

3. Đi mãi vẫn quay về gốc cây ấy. Lần thứ ba, ngươi khắc một dấu lên thân cây. Lần thứ tư, dấu khắc đã ở đó trước khi ngươi khắc.

### Lựa chọn

- **1. Giữ vững bản tâm**
  - `chk`: `["tam",10]`
  - **Thành công**: Ngươi nhắm mắt, niệm một câu tĩnh tâm. Ảo cảnh vỡ như gương. Trận nhãn hiện ra, bên trong còn sót linh thạch.
    `{"e":{"st":20,"tam":1,"tv":5}}`
  - **Thất bại**: Ngươi chìm trong ảo cảnh mấy tháng trời. Khi tỉnh lại, người gầy rộc, tóc dài chấm vai.
    `{"e":{"h":432,"tamma":6}}`
- **2. Dùng sức phá trận**
  Ngươi tung toàn lực vào hư không. Ảo trận nứt toác, nhưng phản chấn khiến ngươi hộc máu.
  - `cost`: `{"mp":"40%"}`
  - `e`: `{"hp":"-15%","tv":4}`
- **3. Ở lại thêm chút nữa**
  Biết là giả, ngươi vẫn ngồi xuống ăn hết bát cơm. Rời đi, ngươi khóc như đứa trẻ. Lòng nhẹ đi nhiều.
  - `e`: `{"tamma":-10,"h":72}`
- **4. Cáo từ, tiếp tục lên đường**
  Ngươi chọn rời khỏi nơi này, không can dự thêm.

<a id="linh_tuyen"></a>
## Linh tuyền — `linh_tuyen`

- Loại: event; nguồn: Khám phá; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: núi non, rừng sâu, hang động, sông hồ.
- Điều kiện: mọi tầng; nghỉ 720 giờ.
- Bối cảnh tác giả: nui / rung / dong / song.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/core/12-dong-doi-tam-thoi.js`.

1. Giữa khe núi có một hồ nước nhỏ, mặt nước bốc hơi trắng, linh khí nồng đến mức đọng thành giọt.

2. {$canh} Ngươi tìm thấy một dòng suối nước ấm, đáy suối lấp lánh như rải ngọc vụn.

### Lựa chọn

- **1. Ngâm mình**
  Nước thấm vào từng lỗ chân lông. Xương cốt kêu răng rắc, rồi nhẹ bẫng.
  - `e`: `{"dao":1,"hp":"100%","hpP":4}`
- **2. Uống vài ngụm**
  Nước ngọt lịm, đi tới đâu mát tới đó. Linh lực trong người như được rửa sạch.
  - `e`: `{"mp":"100%","mpP":5}`
- **3. Đóng vào bình**
  Ngươi đổ đầy hai bình. Thứ nước này luyện đan rất tốt.
  - `e`: `{"pill":["hoixuan","tukhi"]}`
- **4. Cáo từ, tiếp tục lên đường**
  Ngươi chọn rời khỏi nơi này, không can dự thêm.

<a id="do_thach"></a>
## Đổ thạch — `do_thach`

- Loại: event; nguồn: Khám phá; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: thành trì, thôn trấn.
- Điều kiện: tầng 0, 1, 2; nghỉ 720 giờ.
- Bối cảnh tác giả: thanh / tran.
- Vai: `{"a":{"role":"thuong","alignment":"context"}}`.
- Xuất xứ: `d9ab301` / `src/game/core/12-dong-doi-tam-thoi.js`.

1. Phường đổ thạch đông nghịt. Những khối đá thô xếp thành đống, mở ra có thể là linh ngọc, cũng có thể chỉ là đá.

2. “Một đao nghèo, một đao giàu!” {$a.ten} hét lớn, tay vỗ lên khối đá đen sì.

### Lựa chọn

- **1. Mua một khối nhỏ**
  - `cost`: `{"st":15}`
  - **Khả năng 1**: Đá. Chỉ là đá. `{"w":3}`
  - **Khả năng 2**: Có một mạch linh thạch nhỏ, đủ hoàn vốn và lời chút ít. `{"w":2,"e":{"st":25}}`
  - **Khả năng 3**: Lớp vỏ vỡ, ánh xanh tràn ra. Cả phường lặng đi. Một khối linh tủy! `{"w":1,"e":{"st":60,"van":1}}`
- **2. Chơi lớn**
  - `cost`: `{"st":40}`
  - **Khả năng 1**: Đá. Ngươi nghe tiếng ai đó cười khúc khích sau lưng. `{"w":3}`
  - **Khả năng 2**: Một mạch linh thạch dày bằng ngón tay. Đám đông xuýt xoa. `{"w":2,"e":{"st":80}}`
  - **Khả năng 3**: Bên trong là một món bảo vật bị phong ấn trong đá! `{"w":1,"e":{"relic":1}}`
- **3. Dùng thần thức dò trước**
  - `chk`: `["ngo",12]`
  - **Thành công**: Thần thức len qua lớp vỏ đá. Trong một khối xấu xí ở góc, một mạch linh ngọc đang ẩn hiện. Chủ sạp không hay biết, chỉ ra giá như đá thường.
    `{"c":[{"i":"💰","l":"Mua khối đá ấy","cost":{"st":20},"t":"Ngươi trả tiền, ôm khối đá ra một góc. Đao bổ xuống, ánh xanh tràn ra, cả phường im bặt.","e":{"st":55}},{"i":"🚶","l":"Thôi, không mua","t":"Ngươi lặng lẽ đi ra. Khối đá vẫn nằm đó, chờ một kẻ có duyên khác."}]}`
  - **Thất bại**: Thần thức vừa chạm vào đã bị cấm chế đánh bật. Bị phát hiện dò trộm, ngươi bị mời ra ngoài.
    `{"e":{"tamma":2}}`
- **4. Cáo từ, tiếp tục lên đường**
  Ngươi chọn rời khỏi nơi này, không can dự thêm.

### Nối cơ chế

```json
{
  "variables": {
    "$hook": "do_thach_v"
  }
}
```

<a id="hac_diem"></a>
## Quán trọ đen — `hac_diem`

- Loại: event; nguồn: Khám phá; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: thôn trấn, rừng sâu, sông hồ, hoang nguyên.
- Điều kiện: mọi tầng; nghỉ 720 giờ.
- Bối cảnh tác giả: tran / rung / song / hoang.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/core/12-dong-doi-tam-thoi.js`.

1. Quán trọ ven đường đèn đóm lờ mờ. Bà chủ cười rất tươi, rót rượu rất đầy.

2. Trời tối, chỉ có một khách điếm giữa rừng. Tiểu nhị nhìn túi trữ vật của ngươi lâu hơn nhìn mặt ngươi.

### Lựa chọn

- **1. Uống rượu, nghỉ đêm**
  - `chk`: `["ngo",10]`
  - **Thành công**: Rượu có mùi lạ. Ngươi vờ uống, đợi nửa đêm cả bọn mò vào thì…
    `{"fight":{"k":"sontac","n":"Chủ quán đen"},"win":{"t":"Hắc điếm bị dẹp. Dưới hầm có cả đống đồ của khách bị hại.","e":{"st":30,"deed":"giet_cuop_dang_ac","pill":1}}}`
  - **Thất bại**: Tỉnh dậy, ngươi nằm ngoài bãi tha ma, túi trữ vật nhẹ bẫng, đầu đau như búa bổ.
    `{"e":{"st":"-30%","hp":"-10%"}}`
- **2. Ra tay trước**
  - `fight`: `{"k":"sontac","n":"Chủ quán đen"}`
  - **Thắng trận**: Ngươi đoán không sai. Dưới hầm toàn xương người. Ngươi phóng hỏa đốt quán, mang theo số tiền chúng cướp được.
    `{"e":{"st":28,"deed":"giet_cuop_dang_ac"}}`
- **3. Ngủ ngoài trời**
  Ngươi gác kiếm ngủ dưới gốc cây. Nửa đêm nghe tiếng bước chân lảng vảng, rồi xa dần.
  - `e`: `{"hp":"15%"}`

<a id="tra_lau"></a>
## Trà lâu — `tra_lau`

- Loại: event; nguồn: Trong quán; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: thôn trấn, thành trì, chợ phiên tu sĩ / Trà lâu.
- Điều kiện: mọi tầng; nghỉ 720 giờ.
- Bối cảnh tác giả: tran / thanh.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/core/12-dong-doi-tam-thoi.js`.

1. Trà lâu chật kín người. Tiên sinh kể chuyện vỗ thước gỗ xuống bàn: “Hôm nay, ta kể chuyện Ngũ Tổ chém Yêu Hoàng!”

2. Ngồi góc trà lâu, ngươi nghe đủ chuyện thiên hạ. Người ta bàn về {$rv}, về {$sect}, về giá linh thạch lên xuống.

### Lựa chọn

- **1. Ngồi nghe**
  Kể tới chỗ máu Yêu Hoàng bắn lên cửa trời, cả trà lâu nín thở. Câu chuyện ấy ai cũng thuộc, mà vẫn nghe.
  - `e`: `{"lore":"ngu_to","rumor":2}`
- **2. Lên kể chuyện kiếm tiền**
  - `chk`: `["ngo",8]`
  - **Thành công**: Ngươi kể chuyện mình đánh nhau với yêu thú, thêm thắt chút ít. Khách vỗ tay, quăng tiền lên bục.
    `{"e":{"st":15}}`
  - **Thất bại**: Ngươi kể lộn đầu lộn đuôi, khách ném vỏ lạc lên bục. Ba tối được đúng ít tiền lẻ.
    `{"e":{"st":3}}`
- **3. Uống trà rồi đi**
  Trà ngon. Vậy là đủ.
  - `e`: `{"hp":"10%","tamma":-2}`
- **4. Cáo từ, tiếp tục lên đường**
  Ngươi chọn rời khỏi nơi này, không can dự thêm.

<a id="cao_thi"></a>
## Cáo thị truy nã — `cao_thi`

- Loại: event; nguồn: Khám phá; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: thôn trấn, thành trì.
- Điều kiện: mọi tầng; nghỉ 720 giờ.
- Bối cảnh tác giả: tran / thanh.
- Vai: `{"a":{"role":"ma","alignment":"hostile"}}`.
- Xuất xứ: `d9ab301` / `src/game/core/12-dong-doi-tam-thoi.js`.

1. Trên tường thành dán cáo thị: truy nã {$a.ten}, kẻ đã giết cả nhà một vị huyện lệnh. Thưởng hậu.

2. Bảng cáo thị ở cổng trấn có tờ mới: {$a.ten}, ma tu, đang lẩn trốn quanh {$pl}. Bên dưới có hàng chữ đỏ: “Sống chết không cần.”

### Lựa chọn

- **1. Bóc cáo thị**
  - `fight`: `{"k":"matu","n":"{$a.ten}","m":1.15}`
  - **Thắng trận**: Ngươi mang đầu {$a.ten} về phủ nha. Quan phủ thưởng linh thạch theo lệ, dân chúng đốt pháo mừng.
    `{"e":{"st":45,"deed":"giet_cuop_dang_ac","tv":4}}`
- **2. Không phải việc của ta**
  Ngươi đi qua. Phía sau có người thở dài: “Lại một tu sĩ chẳng quan tâm.”

### Nối cơ chế

```json
{
  "variables": {
    "$hook": "cao_thi_v"
  }
}
```

<a id="xem_tuong"></a>
## Thầy bói — `xem_tuong`

- Loại: event; nguồn: Khám phá; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: thôn trấn, thành trì, sông hồ.
- Điều kiện: tầng 0, 1, 2, 3; nghỉ 720 giờ.
- Bối cảnh tác giả: tran / thanh / song.
- Vai: `{"a":{"role":"dao","alignment":"lawful"}}`.
- Xuất xứ: `d9ab301` / `src/game/core/12-dong-doi-tam-thoi.js`.

1. Một lão đạo ngồi dưới lá phướn ghi bốn chữ “Thiết khẩu trực đoán”. Thấy ngươi, lão nheo mắt: “{$a.goi}, mệnh có kiếp nạn đấy.”

2. Bàn bói dựng bên đường. Thầy bói là {$a.ten}, {$a.look}. Lão gọi giật ngươi lại: “Đứng đó. Ấn đường của ngươi có khí đen.”

### Lựa chọn

- **1. Trả tiền xem quẻ**
  - `cost`: `{"st":10}`
  - **Khả năng 1**: Lão gieo ba đồng xu, nhìn rất lâu rồi nói: “Đi phương nào cũng gặp quý nhân, chỉ cần đừng tham.” Lòng ngươi bỗng nhẹ nhõm. `{"w":2,"e":{"van":2}}`
  - **Khả năng 2**: Lão rùng mình, đẩy tiền lại: “Quẻ này ta không dám nói. Ngươi tự bảo trọng.” `{"w":2,"e":{"st":10,"tamma":2}}`
  - **Khả năng 3**: Lão phán ngươi sống không quá ba mươi. Ngươi cười. Lão không cười. `{"w":1,"e":{"tam":1}}`
- **2. Vạch mặt kẻ lừa đảo**
  - `chk`: `["ngo",9]`
  - **Thành công**: Ngươi chỉ ra ba chỗ sai trong lời lão. Lão đạo nhìn ngươi một lúc lâu, rồi cười ha hả, tặng ngươi một lá bùa.
    `{"e":{"pill":"kimcang"}}`
  - **Thất bại**: Lão cười nhạt, nói đúng ba chuyện cũ của ngươi mà ngươi chưa từng kể với ai. Ngươi lạnh gáy.
    `{"e":{"tamma":3}}`
- **3. Cáo từ, tiếp tục lên đường**
  Ngươi chọn rời khỏi nơi này, không can dự thêm.

### Nối cơ chế

```json
{
  "variables": {
    "$hook": "xem_tuong_v"
  }
}
```

<a id="an_may"></a>
## Kẻ ăn mày lạ — `an_may`

- Loại: event; nguồn: Khám phá; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: thôn trấn, thành trì, sông hồ.
- Điều kiện: mọi tầng; nghỉ 720 giờ.
- Bối cảnh tác giả: tran / thanh / song.
- Vai: `{"a":{"role":"gia","alignment":"context"}}`.
- Xuất xứ: `d9ab301` / `src/game/core/12-dong-doi-tam-thoi.js`.

1. Một lão ăn mày {$a.look} chìa cái bát mẻ về phía ngươi. “{$a.goi}, cho xin miếng ăn.”

2. Ở góc phố, một kẻ ăn mày nằm ngáy pho pho, bên cạnh là bầu rượu rỗng. Thấy ngươi, {$a.hn} mở một mắt: “Có rượu không?”

### Lựa chọn

- **1. Cho tiền mua đồ ăn**
  - `cost`: `{"st":8}`
  - **Khả năng 1**: {$a.hn} ăn ngấu nghiến, xong chùi tay vào áo, móc từ trong ngực ra một cuốn sách nhàu nát: “Giấy lau tay, cho ngươi.” Ngươi lật vài trang, tay run lên. `{"w":2,"e":{"skill":1,"deed":"bo_thi"}}`
  - **Khả năng 2**: {$a.hn} cảm tạ rối rít, chúc ngươi sống lâu. Chỉ vậy thôi. Nhưng ngươi thấy vui. `{"w":3,"e":{"deed":"bo_thi","van":1}}`
- **2. Mời rượu, ngồi nói chuyện**
  Hai người uống tới khuya. {$a.hn} kể chuyện trên trời dưới đất, có mấy câu nghe như khẩu quyết. Sáng ra, {$a.hn} biến mất.
  - `cost`: `{"st":12}`
  - `e`: `{"tv":8,"ngo":1}`
- **3. Lắc đầu đi qua**
  {$a.hn} nhìn theo, khẽ thở dài: “Lại một kẻ không có duyên.”

### Nối cơ chế

```json
{
  "variables": {
    "$hook": "an_may_v"
  }
}
```

<a id="tre_ban_hoa"></a>
## Đứa trẻ bán hoa — `tre_ban_hoa`

- Loại: event; nguồn: Khám phá; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: thôn trấn, thành trì.
- Điều kiện: mọi tầng; nghỉ 720 giờ.
- Bối cảnh tác giả: tran / thanh.
- Vai: `{"a":{"role":"hai","alignment":"context"}}`.
- Xuất xứ: `d9ab301` / `src/game/core/12-dong-doi-tam-thoi.js`.

1. Một đứa trẻ {$a.look} đứng nép bên đường bán từng bó hoa dại. “Mua hoa đi {$a.goi}, mẹ cháu ốm nặng lắm…”

2. {$a.ten}, một đứa trẻ {$a.look}, quỳ trước tiệm thuốc, trán dập xuống đất đã rớm máu. Chủ tiệm đứng khoanh tay.

### Lựa chọn

- **1. Cho linh thạch**
  Ngươi đặt linh thạch vào tay đứa trẻ. {$a.hn} sững sờ, rồi òa khóc, rồi chạy biến đi. Ngươi không biết nó có mua được thuốc không.
  - `cost`: `{"st":12}`
  - `e`: `{"deed":"bo_thi","an":["a","cho tiền mua thuốc"]}`
- **2. Theo về xem bệnh**
  Người bệnh bị âm khí xâm thể. Ngươi truyền linh lực đẩy âm khí ra ngoài. Người đỡ dần, cả nhà quỳ lạy ngươi.
  - `cost`: `{"mp":"30%"}`
  - `e`: `{"deed":"cuu_nguoi","tv":3,"an":["a","chữa bệnh cho người nhà"]}`
- **3. Thế gian khổ nhiều, giúp không xuể**
  Ngươi bước đi. Tiếng rao non nớt đuổi theo mãi một đoạn đường.
  - `e`: `{"tamma":2}`

### Nối cơ chế

```json
{
  "variables": {
    "$hook": "tre_ban_hoa_v"
  }
}
```

<a id="kiem_khach"></a>
## Kiếm khách say — `kiem_khach`

- Loại: event; nguồn: Trong quán; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: thôn trấn, thành trì, chợ phiên tu sĩ / Tửu phường.
- Điều kiện: mọi tầng; nghỉ 720 giờ.
- Bối cảnh tác giả: tran / thanh.
- Vai: `{"a":{"role":"nam","alignment":"context"}}`.
- Xuất xứ: `d9ab301` / `src/game/core/12-dong-doi-tam-thoi.js`.

1. Trên lan can tửu lâu, một kiếm khách {$a.look} đang ngửa cổ tu rượu. Thấy ngươi đứng nhìn, hắn cười lớn: “Đấu một trận không?”

2. Giữa cầu đá có kẻ say nằm chắn ngang, kiếm đặt trên bụng. Hắn không nhúc nhích: “Muốn qua cầu, đỡ ta ba kiếm.”

### Lựa chọn

- **1. Nhận lời**
  - `fight`: `{"k":"kiemtu","n":"{$a.ten}","spar":1}`
  - **Thắng trận**: Hắn tỉnh rượu hẳn, chắp tay: “Hay! Hay!” Rồi tặng ngươi nửa bầu rượu và một câu kiếm quyết.
    `{"e":{"tv":6,"atkP":3}}`
  - **Thua trận**: Ba kiếm. Ngươi đỡ được hai. Hắn thu kiếm, vỗ vai ngươi: “Không tệ.”
    `{"e":{"tv":4}}`
- **2. Uống cùng hắn**
  Hai người uống từ trưa tới tối. Hắn kể về một người con gái đã chết, về thanh kiếm hắn chưa từng rút khỏi vỏ. Lúc chia tay, hắn cười rất buồn.
  - `cost`: `{"st":8}`
  - `e`: `{"tam":2,"an":["a","uống rượu nghe chuyện"]}`
- **3. Đi đường khác**
  Kẻ say rượu, nói chuyện với hắn làm gì.
- **4. Cáo từ, tiếp tục lên đường**
  Ngươi chọn rời khỏi nơi này, không can dự thêm.

### Nối cơ chế

```json
{
  "variables": {
    "$hook": "kiem_khach_v"
  }
}
```

<a id="hoa_duyen"></a>
## Tăng nhân hóa duyên — `hoa_duyen`

- Loại: event; nguồn: Khám phá; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: thôn trấn, thành trì, sông hồ, núi non.
- Điều kiện: mọi tầng; nghỉ 720 giờ.
- Bối cảnh tác giả: tran / thanh / song / nui.
- Vai: `{"a":{"role":"tang","alignment":"lawful"}}`.
- Xuất xứ: `d9ab301` / `src/game/core/12-dong-doi-tam-thoi.js`.

1. Một vị hòa thượng {$a.look} đứng trước mặt ngươi, chắp tay: “A di đà Phật. Thí chủ có thể bố thí cho bần tăng một bữa chay?”

2. Tiếng mõ lốc cốc. {$a.ten}, vị tăng khổ hạnh, đi chân đất qua cổng trấn. Đi tới đâu, chó dữ cũng im.

### Lựa chọn

- **1. Bố thí**
  Vị tăng nhận, rồi đặt tay lên đỉnh đầu ngươi. Một luồng ấm áp lan xuống, những ý nghĩ đen tối trong lòng tan như sương.
  - `cost`: `{"st":6}`
  - `e`: `{"tamma":-12,"deed":"bo_thi"}`
- **2. Hỏi đạo**
  - `chk`: `["ngo",10]`
  - **Thành công**: “Thí chủ hỏi trường sinh để làm gì?” Ngươi á khẩu. Vị tăng cười, đọc cho ngươi một đoạn kinh. Về sau ngươi mới hiểu, đó là tâm pháp.
    `{"e":{"tam":3,"tv":5}}`
  - **Thất bại**: Hai bên nói chuyện như gà với vịt. Vị tăng chắp tay cáo từ.
- **3. Thử bản lĩnh vị tăng**
  - `fight`: `{"k":"votang","n":"{$a.ten}","spar":1}`
  - **Thắng trận**: Vị tăng thu tay, mỉm cười: “Thí chủ võ công cao, chỉ tiếc tâm còn nóng.”
    `{"e":{"tv":6,"hd":{"t":1}}}`
  - **Thua trận**: “Thí chủ, nóng giận hại thân.” Vị tăng đỡ ngươi dậy, phủi bụi cho ngươi.
    `{"e":{"tamma":-5,"tv":3}}`
- **4. Cáo từ, tiếp tục lên đường**
  Ngươi chọn rời khỏi nơi này, không can dự thêm.

### Nối cơ chế

```json
{
  "variables": {
    "$hook": "hoa_duyen_v"
  }
}
```

<a id="ho_ly"></a>
## Thiếu nữ trong rừng — `ho_ly`

- Loại: event; nguồn: Khám phá; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: rừng sâu, thôn trấn, phế tích.
- Điều kiện: tầng 0, 1, 2; nghỉ 720 giờ.
- Bối cảnh tác giả: rung / tran / phe.
- Vai: `{"a":{"role":"nu","alignment":"context"}}`.
- Xuất xứ: `d9ab301` / `src/game/core/12-dong-doi-tam-thoi.js`.

1. Giữa rừng sâu lại có một thiếu nữ ngồi khóc bên suối. Nàng {$a.look}, nói bị lạc đường, xin ngươi đưa về nhà.

2. Đêm mưa, có người gõ cửa miếu nơi ngươi trú. Một nữ tử ướt sũng, cười e lệ: “Cho tiểu nữ trú nhờ một đêm được không?”

### Lựa chọn

- **1. Đưa nàng về**
  - `chk`: `["ngo",10]`
  - **Thành công**: Đi một đoạn, ngươi để ý thấy chân nàng không chạm đất. Ngươi dừng lại. Nàng cũng dừng lại, cười: “Đạo hữu tinh mắt thật.” Rồi hóa thành hồ ly, để lại một món quà.
    `{"e":{"relic":0,"tv":4}}`
  - **Thất bại**: Nàng dẫn ngươi vào một tòa nhà lộng lẫy. Sáng ra ngươi tỉnh dậy giữa bãi tha ma, người mệt lả như bị rút hết sinh khí.
    `{"e":{"hp":"-25%","tv":-6}}`
- **2. Vạch mặt yêu tinh**
  - `fight`: `{"k":"holy","n":"Hồ yêu {$a.ten}"}`
  - **Thắng trận**: Hồ yêu bỏ chạy, để lại cái đuôi gãy và một viên yêu đan nhỏ.
    `{"e":{"tv":5,"st":10}}`
- **3. Giả vờ không thấy**
  Ngươi quay lưng đi. Sau lưng có tiếng cười khúc khích, như tiếng chuông gió.

### Nối cơ chế

```json
{
  "variables": {
    "$hook": "ho_ly_v"
  }
}
```

<a id="co_mo"></a>
## Cổ mộ — `co_mo`

- Loại: event; nguồn: Khám phá; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: phế tích, núi non, hoang nguyên, hang động.
- Điều kiện: mọi tầng; nghỉ 720 giờ.
- Bối cảnh tác giả: phe / nui / hoang / dong.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/core/12-dong-doi-tam-thoi.js`.

1. Mưa lở núi, để lộ cửa một ngôi cổ mộ. Trên cửa đá khắc hình thú đầu người, mắt khảm hai viên hồng ngọc.

2. Dưới chân ngươi có tiếng rỗng. Đào xuống ba thước, lộ ra bậc đá dẫn sâu vào lòng đất, hơi lạnh phả lên tận mặt.

### Lựa chọn

- **1. Vào trong**
  Hành lang dài hun hút. Đi được trăm bước, trước mặt có ba cánh cửa: một cửa vẽ rồng, một cửa vẽ hổ, một cửa không vẽ gì.
    - **1. Cửa rồng**
      Bên trong là kho báu, nhưng cũng là chỗ của thủ mộ khôi lỗi.
      - `fight`: `{"k":"khoiloi","m":1.1}`
      - **Thắng trận**: Khôi lỗi đổ sập. Kho báu là của ngươi.
        `{"e":{"relic":1,"st":25}}`
    - **2. Cửa hổ**
      - `chk`: `["tp",11]`
      - **Thành công**: Tên tẩm độc bắn ra từ bốn phía. Ngươi lăn qua làn mưa tên. Cuối phòng là một hộp gỗ, bên trong có bí tịch.
        `{"e":{"skill":1}}`
      - **Thất bại**: Ba mũi tên găm vào vai. Ngươi lết ra, chỉ kịp vơ được ít linh thạch.
        `{"e":{"hp":"-30%","st":15}}`
    - **3. Cửa trơn**
      Căn phòng trống, chỉ có một bộ xương ngồi xếp bằng. Trên vách khắc mấy dòng di ngôn: kẻ đến sau, chớ tham.
      - `e`: `{"tam":2,"tv":8,"lore":"thien_dao"}`
- **2. Lấp cửa mộ lại**
  Người chết cần yên nghỉ. Ngươi lăn tảng đá chặn cửa, vái ba vái.
  - `e`: `{"deed":"an_tang","van":1}`
- **3. Cáo từ, tiếp tục lên đường**
  Ngươi chọn rời khỏi nơi này, không can dự thêm.

### Nối cơ chế

```json
{
  "variables": {
    "$hook": "co_mo_v"
  }
}
```

<a id="dong_phu_cu"></a>
## Động phủ tiền bối — `dong_phu_cu`

- Loại: event; nguồn: Khám phá; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: núi non, hang động, rừng sâu.
- Điều kiện: mọi tầng; nghỉ 720 giờ.
- Bối cảnh tác giả: nui / dong / rung.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/core/12-dong-doi-tam-thoi.js`.

1. Sau thác nước có một động phủ bị bỏ hoang. Cấm chế ở cửa đã yếu, chỉ còn lớp màng mờ như bong bóng.

2. Ngươi phát hiện một động phủ ẩn sau dây leo. Trên cửa treo tấm biển gỗ: “{$who} bế quan, kẻ tự tiện vào, chết.” Chữ đã mốc meo.

### Lựa chọn

- **1. Phá cấm chế**
  - `chk`: `["ngo",10]`
  - **Thành công**: Cấm chế tan. Bàn ghế đá phủ bụi dày, trên bồ đoàn có một túi trữ vật.
    `{"e":{"dao":2,"relic":0,"pill":1}}`
  - **Thất bại**: Cấm chế phản phệ, một đạo kiếm quang bắn ra sượt qua vai ngươi.
    `{"e":{"hp":"-20%"}}`
- **2. Vái ba vái rồi mới vào**
  - **Khả năng 1**: Cấm chế tự tan như đáp lễ. Trên bàn đá có một ngọc giản, bên trong là truyền thừa của chủ nhân. `{"w":2,"e":{"skill":1,"hd":{"p":1}}}`
  - **Khả năng 2**: Không có chuyện gì xảy ra. Có lẽ chủ nhân đã đi quá lâu. Ngươi vào lấy vài thứ còn dùng được. `{"w":1,"e":{"st":20}}`
- **3. Rời đi**
  Động phủ của người khác, ngươi không đụng vào.

<a id="loi_moc"></a>
## Cây bị sét đánh — `loi_moc`

- Loại: event; nguồn: Khám phá; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: rừng sâu, núi non.
- Điều kiện: mọi tầng; nghỉ 720 giờ.
- Bối cảnh tác giả: rung / nui.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/core/12-dong-doi-tam-thoi.js`.

1. Cây tùng cổ thụ trên đỉnh đồi bị sét đánh toạc làm đôi, lõi cây đen bóng, vẫn còn tia điện nhảy lách tách.

### Lựa chọn

- **1. Lấy lõi gỗ**
  - **Khả năng 1**: Ngươi bị giật tê dại cả người, nhưng lấy được. `{"w":2,"e":{"hp":"-15%","relic":"loimoc"}}`
  - **Khả năng 2**: Lõi gỗ tan thành tro ngay khi chạm tay. Chỉ còn lại cảm giác tê rần ở đầu ngón. `{"w":1,"e":{"mpP":3}}`
- **2. Ngồi dưới gốc cảm ngộ lôi ý**
  - `chk`: `["ngo",11]`
  - **Thành công**: Trong đầu ngươi vang lên tiếng sấm. Khi tĩnh lại, lòng bàn tay đã có thể tóe ra tia điện.
    `{"e":{"tv":8,"skill":"chuongloi"}}`
  - **Thất bại**: Tia điện còn sót lại chui vào kinh mạch. Ngươi giật nảy, tóc dựng đứng cả ngày.
    `{"e":{"hp":"-10%"}}`
- **3. Cáo từ, tiếp tục lên đường**
  Ngươi chọn rời khỏi nơi này, không can dự thêm.

<a id="lo_dan_no"></a>
## Lò đan nổ — `lo_dan_no`

- Loại: event; nguồn: Khám phá; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: thôn trấn, thành trì, sơn môn, núi non.
- Điều kiện: mọi tầng; nghỉ 720 giờ.
- Bối cảnh tác giả: tran / thanh / tong / nui.
- Vai: `{"a":{"role":"tre","alignment":"context"}}`.
- Xuất xứ: `d9ab301` / `src/game/core/12-dong-doi-tam-thoi.js`.

1. Một tiếng nổ lớn. Khói đen bốc lên từ căn nhà gỗ ven đường. {$a.ten} chạy ra, mặt đen thui, tóc dựng đứng: “Lò… lò của ta!”

2. Mùi khét lẹt bay khắp phố. Một đan sư trẻ ngồi bệt giữa đống đổ nát, ôm cái lò đan nứt đôi mà khóc.

### Lựa chọn

- **1. Giúp dập lửa**
  Lửa tắt. {$a.ten} cảm kích, tặng ngươi mấy viên đan còn sót lại sau vụ nổ.
  - `e`: `{"pill":["hoixuan","tukhi"],"deed":"cuu_nguoi","an":["a","giúp dập lửa lò đan"]}`
- **2. Nhặt đan dược văng ra**
  - `chk`: `["tp",9]`
  - **Thành công**: Ngươi nhanh tay vơ được mấy viên lăn lóc ngoài đường.
    `{"e":{"pill":[1,1],"hd":{"t":1}}}`
  - **Thất bại**: Một viên đan cháy dở nổ ngay trong tay ngươi.
    `{"e":{"hp":"-15%"}}`
- **3. Chỉ ra chỗ sai trong phối dược**
  - `chk`: `["ngo",11]`
  - **Thành công**: {$a.ten} sững người, rồi vỗ đùi: “Đúng rồi! Phải cho Huyết Linh Chi vào sau Cửu Diệp Thảo!” Lần luyện sau thành công, {$a.hn} chia cho ngươi một nửa.
    `{"e":{"pill":"taytuy","an":["a","chỉ cách luyện đan"]}}`
  - **Thất bại**: {$a.hn} nhìn ngươi như nhìn kẻ ngốc.
- **4. Cáo từ, tiếp tục lên đường**
  Ngươi chọn rời khỏi nơi này, không can dự thêm.

### Nối cơ chế

```json
{
  "variables": {
    "$hook": "lo_dan_no_v"
  }
}
```

<a id="hon_phien"></a>
## Hồn phiên vô chủ — `hon_phien`

- Loại: event; nguồn: Khám phá; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: phế tích, hoang nguyên, ma địa, hang động.
- Điều kiện: mọi tầng; một lần/kiếp.
- Bối cảnh tác giả: phe / hoang / ma / dong.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/core/12-dong-doi-tam-thoi.js`.

1. Giữa bãi chiến trường cũ cắm một lá cờ đen, gió không thổi mà vẫn bay phần phật. Trên mặt cờ thêu trăm khuôn mặt người, mặt nào cũng đang nhìn ngươi.

2. Ngươi nghe tiếng khóc ri rỉ. Lần theo, chỉ thấy một lá hồn phiên cắm trên mỏm đá, quanh đó cỏ không mọc nổi.

### Lựa chọn

- **1. Nhổ lấy**
  Cán cờ lạnh như băng. Tiếng khóc im bặt, như chờ chủ nhân mới ra lệnh.
  - `e`: `{"relic":"honphien","deed":"luyen_hon_nguoi","tamma":8}`
- **2. Thiêu hủy, siêu độ vong hồn**
  - `fight`: `{"k":"amhon","m":1.1}`
  - **Thắng trận**: Lá cờ cháy rụi. Trăm luồng khói trắng bay lên, khẽ cúi đầu với ngươi rồi tan vào trời.
    `{"e":{"deed":"sieu_do","tv":6,"tam":2}}`
- **3. Tránh xa**
  Thứ này không nên đụng vào.

<a id="nhan_cu"></a>
## Chiếc nhẫn cũ — `nhan_cu`

- Loại: event; nguồn: Khám phá; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: *.
- Điều kiện: tầng 0, 1; một lần/kiếp.
- Bối cảnh tác giả: *.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/core/12-dong-doi-tam-thoi.js`.

1. Ở sạp đồ cũ có một chiếc nhẫn sắt đen sì, giá chỉ ba đồng. Lúc ngươi chạm vào, nó khẽ ấm lên.

2. Đêm ấy, chiếc nhẫn sắt nhặt được ở bờ sông bỗng phát sáng mờ mờ. Có giọng ai khàn khàn vang lên trong đầu: “Ngủ lâu quá…”

### Lựa chọn

- **1. Giữ lấy**
  Ngươi đeo nhẫn vào tay. Từ đó, những đêm tu luyện, ngươi luôn có cảm giác có người nhìn qua vai mình, thỉnh thoảng hừ một tiếng khi ngươi vận khí sai.
  - `e`: `{"relic":"nhancu","flag":"nhancu"}`
- **2. Vứt đi**
  Đồ cũ thì có gì tốt. Ngươi ném nó xuống sông. Mặt nước gợn lên một vòng, rồi thôi.
- **3. Cáo từ, tiếp tục lên đường**
  Ngươi chọn rời khỏi nơi này, không can dự thêm.

<a id="thu_khan"></a>
## Thư khẩn — `thu_khan`

- Loại: event; nguồn: Khám phá; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: thôn trấn, thành trì.
- Điều kiện: mọi tầng; nghỉ 720 giờ.
- Bối cảnh tác giả: tran / thanh.
- Vai: `{"a":{"role":"pham","alignment":"context"}}`.
- Xuất xứ: `d9ab301` / `src/game/core/12-dong-doi-tam-thoi.js`.

1. Trạm dịch hỗn loạn. Ngựa trạm chết dọc đường, mà bức thư khẩn về phủ thành phải tới trong ba ngày. Dịch thừa {$a.ten} vò đầu bứt tai.

### Lựa chọn

- **1. Nhận đưa thư**
  - `chk`: `["tp",8]`
  - **Thành công**: Ba ngày ba đêm không ngủ, tới cổng phủ thì hai bàn chân ngươi rộp cả. Thư tới kịp, quan phủ thưởng linh thạch theo lệ.
    `{"e":{"st":30,"deed":"giu_loi"}}`
  - **Thất bại**: Ngươi tới trễ nửa ngày. Quan phủ lắc đầu, chỉ thưởng chút ít.
    `{"e":{"st":8}}`
- **2. Không rảnh**
  Việc của phàm nhân, để phàm nhân lo.

### Nối cơ chế

```json
{
  "variables": {
    "$hook": "thu_khan_v"
  }
}
```

<a id="tho_san"></a>
## Thợ săn đặt bẫy — `tho_san`

- Loại: event; nguồn: Khám phá; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: rừng sâu, núi non.
- Điều kiện: mọi tầng; nghỉ 720 giờ.
- Bối cảnh tác giả: rung / nui.
- Vai: `{"a":{"role":"pham","alignment":"context"}}`.
- Xuất xứ: `d9ab301` / `src/game/core/12-dong-doi-tam-thoi.js`.

1. Ngươi suýt giẫm phải bẫy kẹp. Gần đó, thợ săn {$a.ten} đang kéo một con hươu sừng ngọc bị thương nặng.

2. Một thợ săn chặn ngươi lại: “Đừng đi lối đó, ta đặt bẫy yêu thú. Mà nếu {$a.goi} rảnh, giúp ta một tay?”

### Lựa chọn

- **1. Giúp săn yêu thú**
  - `fight`: `{"k":"beast"}`
  - **Thắng trận**: {$a.ten} chia cho ngươi một nửa da thịt và yêu đan, còn chỉ cho ngươi lối tắt qua núi.
    `{"e":{"st":18}}`
- **2. Mua con hươu rồi thả**
  Con hươu nhìn ngươi một cái rồi nhảy vào rừng. Sừng ngọc của nó lấp lánh như sao.
  - `cost`: `{"st":10}`
  - `e`: `{"deed":"phong_sinh","van":2}`
- **3. Đi tiếp**
  Ngươi gật đầu chào rồi đi.

### Nối cơ chế

```json
{
  "variables": {
    "$hook": "tho_san_v"
  }
}
```

<a id="chay_rung"></a>
## Rừng thuốc cháy — `chay_rung`

- Loại: event; nguồn: Khám phá; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: rừng sâu, núi non.
- Điều kiện: mọi tầng; nghỉ 720 giờ.
- Bối cảnh tác giả: rung / nui.
- Vai: `{"a":{"role":"pham","alignment":"context"}}`.
- Xuất xứ: `d9ab301` / `src/game/core/12-dong-doi-tam-thoi.js`.

1. Khói đen bốc lên từ thung lũng. Cả một rừng thuốc đang cháy, tiếng người kêu cứu lẫn trong tiếng lửa reo.

### Lựa chọn

- **1. Dập lửa cứu người**
  Ngươi dốc hết linh lực gọi mưa, lửa tắt dần. Mấy người hái thuốc quỳ xuống lạy ngươi như lạy thần.
  - `cost`: `{"mp":"50%"}`
  - `e`: `{"deed":"cuu_nguoi_hy_sinh","tv":4,"an":["a","cứu khỏi đám cháy"]}`
- **2. Tranh thủ hái linh dược**
  Lửa lan nhanh, ngươi vơ vội được mấy gốc linh thảo quý. Tiếng kêu cứu sau lưng nhỏ dần.
  - `e`: `{"pill":["tinhnguyen","hoixuan"],"hd":{"t":3},"ng":{"b":1}}`
- **3. Tìm kẻ phóng hỏa**
  - `fight`: `{"k":"matu"}`
  - **Thắng trận**: Kẻ phóng hỏa là ma tu cần tro linh thảo để luyện độc. Hắn không còn cơ hội luyện nữa.
    `{"e":{"deed":"giet_ma_dau","st":20}}`
- **4. Cáo từ, tiếp tục lên đường**
  Ngươi chọn rời khỏi nơi này, không can dự thêm.

### Nối cơ chế

```json
{
  "variables": {
    "$hook": "chay_rung_v"
  }
}
```

<a id="khach_diem"></a>
## Khách điếm — `khach_diem`

- Loại: event; nguồn: Trong quán; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: thôn trấn, thành trì, chợ phiên tu sĩ / Khách điếm.
- Điều kiện: mọi tầng; nghỉ 720 giờ.
- Bối cảnh tác giả: tran / thanh / song.
- Vai: `{"a":{"role":"tre","alignment":"context"}}`.
- Xuất xứ: `d9ab301` / `src/game/core/12-dong-doi-tam-thoi.js`.

1. Khách điếm ở {$pl} đông đúc. Ngươi gọi một bình rượu, ngồi bên cửa sổ nhìn mưa.

2. Đêm ấy ngươi nghỉ ở khách điếm. Phòng bên có tiếng đàn, réo rắt đến tận canh ba.

### Lựa chọn

- **1. Nghỉ ngơi**
  Một giấc ngủ không mộng mị. Sáng ra, người nhẹ bẫng.
  - `cost`: `{"st":5}`
  - `e`: `{"hp":"60%","mp":"60%"}`
- **2. Sang làm quen người đánh đàn**
  - **Khả năng 1**: Người đánh đàn là {$a.ten}. Hai người nói chuyện tới sáng, hóa ra cùng có một giấc mơ thời thơ ấu. `{"w":2,"e":{"tam":2,"an":["a","nghe đàn suốt đêm"]}}`
  - **Khả năng 2**: Ngươi gõ cửa, tiếng đàn tắt. Phòng trống không, chỉ có cây đàn đứt dây và một mùi hương lạ. `{"w":1,"e":{"tamma":3,"relic":0}}`
- **3. Nghe ngóng tin tức**
  Dưới nhà, mấy tay buôn đang bàn chuyện thiên hạ. Ngươi mời một bình rượu, nghe được không ít.
  - `e`: `{"rumor":2,"st":-2}`
- **4. Cáo từ, tiếp tục lên đường**
  Ngươi chọn rời khỏi nơi này, không can dự thêm.

### Nối cơ chế

```json
{
  "variables": {
    "$hook": "khach_diem_v"
  }
}
```

<a id="co_tu"></a>
## Cổ tự hoang — `co_tu`

- Loại: event; nguồn: Khám phá; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: phế tích, núi non, rừng sâu, thôn trấn.
- Điều kiện: mọi tầng; nghỉ 720 giờ.
- Bối cảnh tác giả: phe / nui / rung / tran.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/core/12-dong-doi-tam-thoi.js`.

1. Ngôi cổ tự bỏ hoang, tượng Phật sứt mũi nhìn xuống với nụ cười không đổi. Trời tối rồi, ngươi đành trú lại.

2. Chùa không còn sư, chỉ còn tiếng gió lùa qua khung cửa. Trên bàn thờ có ai mới thắp một nén nhang, khói còn nghi ngút.

### Lựa chọn

- **1. Thắp nến, tụng kinh**
  Đêm yên ả. Gần sáng ngươi nghe tiếng chuông, mà chùa không có chuông.
  - `e`: `{"dao":1,"tamma":-8,"tam":1}`
- **2. Khám phá hậu điện**
  - **Khả năng 1**: Trong bóng tối có thứ đang chờ ngươi. `{"w":1,"fight":{"k":"quy"},"win":{"t":"Âm vật tan biến. Dưới chỗ nó đứng có một hộp gỗ.","e":{"relic":0}}}`
  - **Khả năng 2**: Dưới bệ tượng có một ngăn bí mật, bên trong là cuốn kinh chép tay. `{"w":2,"e":{"skill":1}}`
- **3. Ngủ một giấc**
  - **Khả năng 1**: Ngươi ngủ một mạch tới sáng. `{"w":2,"e":{"hp":"40%"}}`
  - **Khả năng 2**: Nửa đêm, một kẻ bịt mặt lẻn vào hậu điện, lưỡi dao nhắm thẳng chỗ ngươi nằm. `{"w":1,"fight":{"k":"satthu"},"win":{"t":"Ngươi ngủ tiếp tới sáng, cạnh cái xác.","e":{"hp":"20%"}}}`
- **4. Cáo từ, tiếp tục lên đường**
  Ngươi chọn rời khỏi nơi này, không can dự thêm.

<a id="son_mon"></a>
## Tông môn tuyển đồ — `son_mon`

- Loại: event; nguồn: Khám phá; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: sơn môn, thôn trấn, thành trì, núi non.
- Điều kiện: tầng 0, 1; một lần/kiếp.
- Bối cảnh tác giả: tong / tran / thanh / nui.
- Vai: `{"a":{"role":"tre","alignment":"context"}}`.
- Xuất xứ: `d9ab301` / `src/game/core/12-dong-doi-tam-thoi.js`.

1. {$sectC} mở sơn môn thu nhận đệ tử. Thiếu niên khắp nơi nô nức kéo về, xếp hàng dài dưới chân núi. Đệ tử canh cổng {$a.ten} mặt lạnh như tiền.

2. Cáo thị dán khắp thành trấn: {$sectC} tuyển đồ. Ba đường vào cửa: trắc linh thạch, vấn tâm lộ, hoặc dâng lễ làm tạp dịch.

### Lựa chọn

- **1. Thi trắc linh thạch**
  - `chk`: `["root",0]`
  - **Thành công**: Viên trắc linh thạch sáng rực lên. {$a.ten} sững sờ, rồi cúi đầu: “Mời {$p.sd} vào.”
    `{"e":{"relic":"lenhtong","flag":"tongmon","skill":1}}`
  - **Thất bại**: Viên đá chỉ lóe lên mờ mờ. {$a.ten} lắc đầu: “Linh căn thế này, tông ta không thu thẳng.”
    `{"e":{"tamma":3}}`
- **2. Đi vấn tâm lộ**
  - `chk`: `["tam",11]`
  - **Thành công**: Ba nghìn bậc thang, mỗi bậc một ảo cảnh. Tới bậc cuối, ngươi chỉ còn lại chính mình. Trưởng lão vuốt râu gật đầu.
    `{"e":{"relic":"lenhtong","flag":"tongmon","tam":2}}`
  - **Thất bại**: Tới bậc thứ chín trăm, ngươi gục xuống, mơ thấy nỗi sợ lớn nhất đời mình. Tỉnh dậy đã ở chân núi.
    `{"e":{"tamma":5}}`
- **3. Dâng lễ làm tạp dịch**
  Ngươi gánh nước bổ củi hai năm, rảnh thì lén nghe giảng đạo. Cuối cùng cũng được ghi tên vào sổ.
  - `cost`: `{"st":40}`
  - `e`: `{"relic":"lenhtong","flag":"tongmon","tv":12,"h":1080}`
- **4. Cáo từ, tiếp tục lên đường**
  Ngươi chọn rời khỏi nơi này, không can dự thêm.

### Nối cơ chế

```json
{
  "variables": {
    "$hook": "son_mon_v"
  },
  "condition": {
    "$hook": "son_mon_cond"
  }
}
```

<a id="dai_bi"></a>
## Tông môn đại bỉ — `dai_bi`

- Loại: event; nguồn: Khám phá; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: sơn môn.
- Điều kiện: tầng 0, 1, 2; đệ tử chính tông; nghỉ 720 giờ.
- Bối cảnh tác giả: tong / thanh.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/core/12-dong-doi-tam-thoi.js`.

1. {$sect} mở kỳ đại bỉ: đệ tử lên lôi đài thi đấu, người thắng được vào Tàng Kinh Các chọn một môn công pháp.

2. Lôi đài dựng giữa quảng trường {$sect}. Khán đài chật kín, ai cũng muốn xem thiên kiêu năm nay là ai.

### Lựa chọn

- **1. Ghi danh**
  - `fight`: `{"k":"detu","m":1.15,"spar":1}`
  - **Thắng trận**: Ngươi thắng liền ba trận, tiếng hò reo vang dội. Phần thưởng là một lượt vào Tàng Kinh Các.
    `{"e":{"skill":2,"st":20}}`
  - **Thua trận**: Ngươi thua ở trận thứ hai. Nhưng một vị trưởng lão đã nhớ mặt ngươi.
    `{"e":{"tv":5}}`
- **2. Đứng xem học hỏi**
  Mỗi trận đấu là một bài học. Ngươi ghi nhớ từng chiêu.
  - `e`: `{"tv":6}`
- **3. Cáo từ, tiếp tục lên đường**
  Ngươi chọn rời khỏi nơi này, không can dự thêm.

<a id="loi_dai"></a>
## Lôi đài — `loi_dai`

- Loại: event; nguồn: Khám phá; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: thành trì, thôn trấn.
- Điều kiện: mọi tầng; nghỉ 720 giờ.
- Bối cảnh tác giả: thanh / tran.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/core/12-dong-doi-tam-thoi.js`.

1. Lôi đài dựng giữa quảng trường, ai thắng được ba trận liền thì nhận cả hũ linh thạch. Đám đông gào thét.

### Lựa chọn

- **1. Lên đài**
  - `fight`: `{"k":"human","spar":1,"m":1.05}`
  - **Thắng trận**: Ngươi giơ hũ linh thạch lên cao. Đám đông gọi tên ngươi.
    `{"e":{"st":35,"van":1}}`
  - **Thua trận**: Ngươi bị đánh văng khỏi đài. Có người huýt sáo chế giễu.
    `{"e":{"tamma":2}}`
- **2. Đặt cược**
  - `cost`: `{"st":15}`
  - **Khả năng 1**: Ngươi thắng cược! `{"e":{"st":32}}`
  - **Khả năng 2**: Ngươi thua. Đời là vậy. `{}`
- **3. Đi qua**
  Tiếng hò reo nhỏ dần sau lưng.

<a id="yeu_quai_lang"></a>
## Thôn bị yêu quấy — `yeu_quai_lang`

- Loại: event; nguồn: Khám phá; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: thôn trấn.
- Điều kiện: tầng 0, 1, 2; nghỉ 720 giờ.
- Bối cảnh tác giả: tran.
- Vai: `{"a":{"role":"pham","alignment":"context"}}`.
- Xuất xứ: `d9ab301` / `src/game/core/12-dong-doi-tam-thoi.js`.

1. Cả thôn treo bùa đỏ khắp cửa. {$a.ten} quỳ xuống trước mặt ngươi: “Tiên sư cứu mạng! Đêm nào cũng có người mất tích, gia súc chết khô.”

2. Thôn {$pl} vắng tanh giữa ban ngày. Một bà lão lén hé cửa, thì thào: “Đi đi, đêm nay nó lại tới.”

### Lựa chọn

- **1. Đêm nay canh gác**
  - **Khả năng 1**: Nửa đêm, gió lạnh thổi tắt mọi ngọn đèn. Nó tới. `{"w":2,"fight":{"k":"quy","m":1.1},"win":{"t":"Yêu vật gục ngã. Dân làng mổ lợn ăn mừng ba ngày liền.","e":{"st":25,"deed":"hanh_hiep","tv":6}}}`
  - **Khả năng 2**: Thứ xuất hiện là một con hồ ly già. Nó không tấn công, chỉ dẫn ngươi tới cái giếng cuối làng. Dưới đáy giếng có ánh lửa. Hóa ra nó mới là kẻ bảo vệ thôn. `{"w":1,"c":[{"i":"⚔️","l":"Xuống giếng","fight":{"k":"luyenthi","m":1.15},"win":{"t":"Tên luyện thi nhân chết dưới đáy giếng. Con hồ ly ngồi trên miệng giếng nhìn ngươi, rồi lặng lẽ bỏ đi.","e":{"st":30,"deed":"giet_ma_dau","tv":8}}},{"i":"🦊","l":"Nghi ngờ con hồ ly","fight":{"k":"holy"},"win":{"t":"Ngươi giết con hồ ly. Đêm hôm sau, lại có người mất tích.","e":{"hd":{"t":3},"ng":{"b":8,"yd":"tai_nan"},"tamma":8}}}]}`
- **2. Đòi thù lao trước**
  {$a.ten} gom góp được ít linh thạch, run run đưa cho ngươi. Đêm ấy, nó tới.
  - `e`: `{"st":12,"hd":{"t":1}}`
  - `fight`: `{"k":"quy"}`
  - **Thắng trận**: Việc đã xong. Dân làng không ăn mừng, chỉ đóng cửa im lặng.
    `{"e":{"tv":5}}`
- **3. Bỏ đi**
  Ngươi đi khỏi thôn. Đêm ấy, ngươi nằm mãi không ngủ được.
  - `e`: `{"tamma":4}`

### Nối cơ chế

```json
{
  "variables": {
    "$hook": "yeu_quai_lang_v"
  }
}
```

<a id="thuy_quy"></a>
## Bến đò đêm — `thuy_quy`

- Loại: event; nguồn: Khám phá; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: sông hồ.
- Điều kiện: mọi tầng; toi/dem; nghỉ 720 giờ.
- Bối cảnh tác giả: song.
- Vai: `{"a":{"role":"pham","alignment":"context"}}`.
- Xuất xứ: `d9ab301` / `src/game/core/12-dong-doi-tam-thoi.js`.

1. Lái đò {$a.ten} nhất quyết không chở ai qua sông sau giờ Dậu. “Dưới sông có thứ kéo người xuống, năm nay đã mất bảy mạng.”

2. Đò ra giữa dòng thì nước bỗng đen kịt. Một bàn tay trắng bệch bám lên mạn thuyền.

### Lựa chọn

- **1. Diệt thủy quỷ**
  - `fight`: `{"k":"thuyquy"}`
  - **Thắng trận**: Mặt nước lặng dần. Lái đò quỳ lạy ngươi, nước mắt giàn giụa.
    `{"e":{"deed":"giet_ma_dau","st":15}}`
- **2. Thả đèn cầu siêu**
  - `chk`: `["tam",9]`
  - **Thành công**: Ngọn đèn hoa sen trôi đi. Mặt nước lặng dần. Từ đó bến đò không còn ai chết đuối.
    `{"e":{"deed":"sieu_do","tam":1}}`
  - **Thất bại**: Đèn bị một bàn tay dìm xuống. Nó không muốn đi.
    `{"fight":{"k":"thuyquy"},"win":{"t":"Nó đi rồi. Lần này thì thật.","e":{"deed":"sieu_do"}}}`
- **3. Tìm chỗ khác qua sông**
  - `chk`: `["tp",8]`
  - **Thành công**: Ngươi tìm được chỗ cạn, lội qua an toàn.
  - **Thất bại**: Nước xiết hơn ngươi tưởng. Ngươi bị cuốn đi mấy dặm mới bám được vào bờ.
    `{"e":{"hp":"-15%"}}`
- **4. Cáo từ, tiếp tục lên đường**
  Ngươi chọn rời khỏi nơi này, không can dự thêm.

### Nối cơ chế

```json
{
  "variables": {
    "$hook": "thuy_quy_v"
  }
}
```

<a id="hoa_bi"></a>
## Cô dâu mới — `hoa_bi`

- Loại: event; nguồn: Khám phá; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: thôn trấn, thành trì.
- Điều kiện: tầng 0, 1, 2, 3; nghỉ 720 giờ.
- Bối cảnh tác giả: tran / thanh.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/core/12-dong-doi-tam-thoi.js`.

1. Nhà phú hộ trong trấn vừa cưới vợ ba. Từ đó, cứ cách mấy đêm lại có gia nhân chết, tim bị moi mất.

2. Ngươi đi ngang một nhà giàu, thấy yêu khí lẩn khuất trên mái ngói. Cô dâu mới đứng tựa cửa sổ, nhìn ngươi cười.

### Lựa chọn

- **1. Điều tra**
  - `chk`: `["ngo",10]`
  - **Thành công**: Ngươi tìm thấy tấm da người treo trong tủ. Đêm ấy, cô dâu không có da để mặc.
    `{"fight":{"k":"hoabi"},"win":{"t":"Họa bì cháy thành tro. Nhà phú hộ tạ ơn hậu hĩnh.","e":{"deed":"giet_ma_dau","st":30,"relic":0}}}`
  - **Thất bại**: Ngươi không tìm ra gì. Đêm ấy, chính ngươi suýt bị moi tim.
    `{"fight":{"k":"hoabi","m":1.2},"win":{"t":"Nguy hiểm thật. Ngươi chạm tay lên ngực, tim vẫn còn đập.","e":{"deed":"giet_ma_dau","st":15}}}`
- **2. Không xen vào**
  Chuyện nhà người ta. Nhưng nụ cười ấy đi theo ngươi vào giấc ngủ.
  - `e`: `{"tamma":2}`

<a id="lao_ngu"></a>
## Cá chép vàng — `lao_ngu`

- Loại: event; nguồn: Khám phá; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: sông hồ, biển khơi.
- Điều kiện: mọi tầng; nghỉ 720 giờ.
- Bối cảnh tác giả: song / bien.
- Vai: `{"a":{"role":"gia","alignment":"context"}}`.
- Xuất xứ: `d9ab301` / `src/game/core/12-dong-doi-tam-thoi.js`.

1. Ông lão đánh cá kéo lưới lên, trong lưới là một con cá chép vàng to bằng đứa trẻ, mắt rưng rưng như người khóc.

### Lựa chọn

- **1. Mua lại rồi thả**
  Ngươi thả cá xuống sông. Nó quẫy đuôi ba lần như lạy rồi lặn mất. Đêm ấy, có viên ngọc trai sáng rực đặt ở đầu giường ngươi.
  - `cost`: `{"st":15}`
  - `e`: `{"relic":0,"deed":"phong_sinh","van":2}`
- **2. Mua về nấu**
  Thịt cá ngọt như mật, ăn vào nóng rực cả người. Nửa đêm, ngươi mơ thấy có ai đứng khóc ở cửa.
  - `cost`: `{"st":10}`
  - `e`: `{"hpP":4,"tv":6,"deed":"giet_thu_vo_hai"}`
- **3. Đi qua**
  Ông lão xách con cá ra chợ. Ngươi không ngoảnh lại.

### Nối cơ chế

```json
{
  "variables": {
    "$hook": "lao_ngu_v"
  }
}
```

<a id="chuong_xac"></a>
## Chuông dẫn xác — `chuong_xac`

- Loại: event; nguồn: Khám phá; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: hoang nguyên, phế tích, rừng sâu.
- Điều kiện: mọi tầng; dem; nghỉ 720 giờ.
- Bối cảnh tác giả: hoang / phe / rung.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/core/12-dong-doi-tam-thoi.js`.

1. Tiếng chuông lắc leng keng giữa đêm. Một đoàn xác chết dán bùa vàng nhảy cò cò trên đường, dẫn đầu là một đạo sĩ áo đen.

2. Trên cành cây khô treo một chiếc chuông đồng nhỏ, gió thổi lại kêu. Dưới gốc cây là bảy cái xác không tên.

### Lựa chọn

- **1. Nhường đường**
  Đạo sĩ cản thi gật đầu cảm ơn. Đoàn xác đi qua, mùi đất ẩm thoảng lại rất lâu.
  - `e`: `{"van":1}`
- **2. Chặn lại xem xét**
  - `fight`: `{"k":"luyenthi"}`
  - **Thắng trận**: Hóa ra đây là luyện thi nhân bắt người sống luyện thi. Ngươi chôn cất bảy cái xác.
    `{"e":{"deed":"giet_ma_dau","st":20}}`
- **3. Lấy cái chuông**
  Chuông nằm trong tay ngươi, không còn kêu nữa. Nhưng đêm nào ngươi cũng nghe thấy nó.
  - `e`: `{"relic":0,"tamma":4}`
- **4. Cáo từ, tiếp tục lên đường**
  Ngươi chọn rời khỏi nơi này, không can dự thêm.

<a id="cho_que"></a>
## Con chó vàng — `cho_que`

- Loại: event; nguồn: Khám phá; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: thôn trấn.
- Điều kiện: mọi tầng; nghỉ 720 giờ.
- Bối cảnh tác giả: tran.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/core/12-dong-doi-tam-thoi.js`.

1. Một con chó vàng cứ lẽo đẽo theo ngươi từ đầu trấn tới cuối trấn. Ngươi dừng, nó dừng. Ngươi đi, nó đi.

### Lựa chọn

- **1. Mua cho nó cái bánh**
  Nó vẫy đuôi ăn hết, rồi chạy biến. Hôm sau, ngươi nhặt được một túi linh thạch ai đánh rơi ngay chỗ nó nằm.
  - `cost`: `{"st":2}`
  - `e`: `{"van":2,"st":10}`
- **2. Đuổi đi**
  Nó cụp đuôi bỏ đi. Ngươi thấy hơi áy náy.
- **3. Cáo từ, tiếp tục lên đường**
  Ngươi chọn rời khỏi nơi này, không can dự thêm.

<a id="hoi_den"></a>
## Hội hoa đăng — `hoi_den`

- Loại: event; nguồn: Khám phá; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: thôn trấn, thành trì, sông hồ.
- Điều kiện: mọi tầng; toi/dem; xuan; nghỉ 720 giờ.
- Bối cảnh tác giả: tran / thanh / song.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/core/12-dong-doi-tam-thoi.js`.

1. {$pl} mở hội hoa đăng. Trẻ con chạy khắp phố, đèn giấy thả trôi trên sông như một dải ngân hà nhỏ.

### Lựa chọn

- **1. Thả một ngọn đèn**
  Ngươi viết lên đèn một cái tên. Đèn trôi đi. Lòng nhẹ hẳn.
  - `e`: `{"tamma":-10,"tam":1}`
- **2. Ăn uống thỏa thích**
  Bánh trôi, kẹo hồ lô, rượu nếp. Lâu lắm rồi ngươi mới thấy mình là người.
  - `cost`: `{"st":5}`
  - `e`: `{"hp":"50%","van":1}`
- **3. Cáo từ, tiếp tục lên đường**
  Ngươi chọn rời khỏi nơi này, không can dự thêm.

<a id="thu_nha"></a>
## Thư nhà — `thu_nha`

- Loại: event; nguồn: Khám phá; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: *.
- Điều kiện: tầng 0, 1; một lần/kiếp.
- Bối cảnh tác giả: *.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/core/12-dong-doi-tam-thoi.js`.

1. Một người phu trạm đường xa hỏi thăm mãi mới tìm được ngươi, trao một lá thư gói trong giấy dầu. Thư từ {$que}.

### Lựa chọn

- **1. Đọc thư**
  - **Khả năng 1**: Thư viết: ở nhà vẫn ổn, năm nay được mùa, đừng lo. Cuối thư có vẽ một bông hoa xiêu vẹo. `{"w":2,"e":{"tam":2,"tamma":-8}}`
  - **Khả năng 2**: Thư báo tin người thân của ngươi đã mất từ mùa thu. Ngươi đọc đi đọc lại ba lần. Rồi ngươi ngồi xuống, rất lâu. `{"w":1,"e":{"tamma":6,"tam":2,"tv":5}}`
- **2. Đốt đi không đọc**
  Đã bước lên tiên lộ, không quay đầu. Tro giấy bay theo gió.
  - `e`: `{"tam":1,"tamma":3}`

### Nối cơ chế

```json
{
  "condition": {
    "$hook": "thu_nha_cond"
  }
}
```

<a id="xin_lam_do"></a>
## Đứa trẻ xin bái sư — `xin_lam_do`

- Loại: event; nguồn: Khám phá; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: thôn trấn, thành trì.
- Điều kiện: mọi tầng; nghỉ 720 giờ.
- Bối cảnh tác giả: tran / thanh.
- Vai: `{"a":{"role":"hai","alignment":"context"}}`.
- Xuất xứ: `d9ab301` / `src/game/core/12-dong-doi-tam-thoi.js`.

1. {$a.ten}, một đứa trẻ {$a.look}, đòi bái ngươi làm sư phụ. Quỳ trước cửa ba ngày không chịu đứng dậy.

### Lựa chọn

- **1. Nhận làm đệ tử**
  Nửa năm dạy nó luyện khí. Lúc chia tay, nó khóc như mưa, hứa sau này nổi danh sẽ đi tìm ngươi.
  - `e`: `{"deed":"nhan_nuoi","tam":2,"h":288,"an":["a","nhận làm đệ tử"]}`
- **2. Cho ít tiền rồi khuyên về**
  Nó cầm tiền, cúi đầu đi. Có lẽ làm phàm nhân yên ổn cũng là một cái phúc.
  - `cost`: `{"st":5}`
  - `e`: `{"deed":"bo_thi"}`
- **3. Mắng cho về**
  Nó đứng dậy, mắt đỏ hoe. Ngươi biết nó sẽ không quên ngày hôm nay.
  - `e`: `{"oan":["a","đuổi đi như đuổi chó"]}`
- **4. Cáo từ, tiếp tục lên đường**
  Ngươi chọn rời khỏi nơi này, không can dự thêm.

### Nối cơ chế

```json
{
  "variables": {
    "$hook": "xin_lam_do_v"
  }
}
```

<a id="hoa_su"></a>
## Họa sư — `hoa_su`

- Loại: event; nguồn: Khám phá; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: thôn trấn, thành trì, sông hồ, núi non.
- Điều kiện: mọi tầng; nghỉ 720 giờ.
- Bối cảnh tác giả: tran / thanh / song / nui.
- Vai: `{"a":{"role":"tre","alignment":"context"}}`.
- Xuất xứ: `d9ab301` / `src/game/core/12-dong-doi-tam-thoi.js`.

1. Một họa sư {$a.look} xin vẽ chân dung ngươi. “{$a.goi} có tướng lạ, {$a.xung} vẽ không lấy tiền.”

### Lựa chọn

- **1. Ngồi làm mẫu**
  Bức họa giống đến kỳ lạ, chỉ có đôi mắt là già hơn ngươi. Họa sư nói người trong tranh sau này sẽ nổi danh. Ngươi cười.
  - `e`: `{"van":1,"tam":1}`
- **2. Từ chối**
  Ngươi không muốn lưu lại dấu vết gì ở thế gian này.

### Nối cơ chế

```json
{
  "variables": {
    "$hook": "hoa_su_v"
  }
}
```

<a id="tuyet_son"></a>
## Người ngồi trong tuyết — `tuyet_son`

- Loại: event; nguồn: Khám phá; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: núi non.
- Điều kiện: mọi tầng; dong; nghỉ 720 giờ.
- Bối cảnh tác giả: nui.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/core/12-dong-doi-tam-thoi.js`.

1. Trên đỉnh núi tuyết có người ngồi thiền, tuyết phủ tới vai. Người dưới núi nói người ấy đã ngồi đó ba năm.

### Lựa chọn

- **1. Ngồi xuống bên cạnh**
  Ngươi ngồi một năm. Tuyết phủ lên vai ngươi. Ngày ngươi đứng dậy, người kia cũng mở mắt, khẽ gật đầu với ngươi, rồi đi xuống núi.
  - `e`: `{"dao":2,"tv":14,"tam":2,"h":720}`
- **2. Đốt lửa sưởi cho người ấy**
  Ngọn lửa cháy tới sáng. Người ấy không động đậy, nhưng tuyết trên vai đã tan.
  - `e`: `{"hd":{"p":1},"ng":{"g":1},"tamma":-5}`
- **3. Cáo từ, tiếp tục lên đường**
  Ngươi chọn rời khỏi nơi này, không can dự thêm.

<a id="ga_quay"></a>
## Tranh nhau con gà — `ga_quay`

- Loại: event; nguồn: Khám phá; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: thôn trấn, thành trì.
- Điều kiện: mọi tầng; nghỉ 720 giờ.
- Bối cảnh tác giả: tran / thanh.
- Vai: `{"a":{"role":"tre","alignment":"context"},"b":{"role":"tre","alignment":"context"}}`.
- Xuất xứ: `d9ab301` / `src/game/core/12-dong-doi-tam-thoi.js`.

1. Giữa chợ, hai tu sĩ Trúc Cơ đánh nhau tới bụi mù chỉ vì một con gà quay. Con gà vẫn nằm trên mẹt, bốc khói thơm lừng.

### Lựa chọn

- **1. Lấy con gà rồi chạy**
  - `chk`: `["tp",9]`
  - **Thành công**: Lúc hai người nhận ra thì ngươi đã ngồi gặm đùi gà ở đầu phố bên kia. Ngon thật.
    `{"e":{"hp":"20%","van":1}}`
  - **Thất bại**: Hai người cùng dừng tay, cùng quay sang ngươi.
    `{"fight":{"k":"tantu","n":"{$a.ten}"},"win":{"t":"Ngươi ăn con gà trước mặt cả hai.","e":{"hp":"20%"}}}`
- **2. Đứng ra phân xử**
  - `chk`: `["ngo",9]`
  - **Thành công**: Ngươi chia đôi con gà, mỗi người một nửa, rồi thu phí phân xử. Cả hai cùng chửi ngươi, nhưng cùng trả tiền.
    `{"e":{"st":10}}`
  - **Thất bại**: Hai người cùng bảo ngươi lo chuyện bao đồng.
    `{"e":{"tamma":1}}`
- **3. Cáo từ, tiếp tục lên đường**
  Ngươi chọn rời khỏi nơi này, không can dự thêm.

### Nối cơ chế

```json
{
  "variables": {
    "$hook": "ga_quay_v"
  }
}
```

<a id="bat_nat"></a>
## Ức hiếp tạp dịch — `bat_nat`

- Loại: event; nguồn: Khám phá; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: sơn môn.
- Điều kiện: mọi tầng; nghỉ 720 giờ.
- Bối cảnh tác giả: tong.
- Vai: `{"a":{"role":"tre","alignment":"context"},"b":{"role":"nam","alignment":"context"}}`.
- Xuất xứ: `d9ab301` / `src/game/core/13-su-kien-2-tong.js`.

1. Sau bếp tông môn, mấy đệ tử ngoại môn đang vây đánh một tạp dịch gầy gò. Kẻ cầm đầu là {$b.ten}, cháu một vị trưởng lão.

2. {$a.ten} quỳ giữa sân, đầu đội chậu nước. {$b.ten} đứng cạnh cười cợt: “Rơi một giọt, đánh một roi.”

### Lựa chọn

- **1. Can ngăn**
  - `fight`: `{"k":"detu","n":"{$b.ten}"}`
  - **Thắng trận**: {$b.ten} ôm mặt bỏ chạy, buông một câu: “Ngươi chờ đấy!” {$a.ten} lén nhìn ngươi, mắt sáng lên như sao.
    `{"e":{"deed":"hanh_hiep","an":["a","cứu khỏi trận đòn"],"oan":["b","đánh cho mất mặt"]}}`
- **2. Lấy danh nghĩa sư huynh quát lui**
  - `req`: `{"$hook":"bat_nat_c_1_req"}`
  - `chk`: `["tam",9]`
  - **Thành công**: Ngươi chỉ đứng đó, giơ lệnh bài lên. Cả đám tản đi như chim vỡ tổ.
    `{"e":{"deed":"hanh_hiep","an":["a","giải vây"]}}`
  - **Thất bại**: Chúng cười vào mặt ngươi. “Sư huynh nào? Ta chưa nghe tên.”
    `{"fight":{"k":"detu","n":"{$b.ten}"},"win":{"t":"Giờ thì chúng nghe tên rồi.","e":{"deed":"hanh_hiep"}}}`
- **3. Làm ngơ**
  Ngươi đi qua. Tiếng roi vụt đuổi theo một quãng dài.
  - `e`: `{"tamma":3}`

### Nối cơ chế

```json
{
  "variables": {
    "$hook": "bat_nat_v"
  }
}
```

<a id="duoc_vien"></a>
## Dược viên — `duoc_vien`

- Loại: event; nguồn: Khám phá; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: sơn môn.
- Điều kiện: mọi tầng; đệ tử chính tông; nghỉ 720 giờ.
- Bối cảnh tác giả: tong.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/core/13-su-kien-2-tong.js`.

1. Dược viên của {$sect} trải dài sườn núi, linh thảo trăm năm mọc như cỏ. Người canh vườn là một lão già đang ngủ gật.

2. Mùi thuốc thơm ngát. Ngươi đứng trước hàng rào trúc của dược viên {$sect}, bên trong có con hạc trắng đang mổ cỏ.

### Lựa chọn

- **1. Lén hái**
  - `chk`: `["tp",11]`
  - **Thành công**: Ngươi vào ra như gió. Trong túi đã có mấy gốc linh thảo thượng hạng.
    `{"e":{"thao":8,"hd":{"t":3},"ng":{"b":1}}}`
  - **Thất bại**: Lão già mở mắt. Hóa ra lão chỉ giả ngủ.
    `{"fight":{"k":"votang","n":"Lão canh vườn","m":1.1},"win":{"t":"Ngươi chạy thoát, trên tay còn kịp nhổ một gốc.","e":{"thao":2,"hd":{"t":3},"ng":{"b":1}}}}`
- **2. Xin làm thuê**
  Nửa năm nhổ cỏ tưới cây, ngươi học được cách phân biệt trăm loại linh thảo. Lão canh vườn trả công bằng thuốc.
  - `e`: `{"st":20,"pill":"hoixuan","tv":5,"h":288}`
- **3. Đi qua**
  Con hạc ngẩng đầu nhìn ngươi, rồi lại cúi xuống mổ cỏ.

<a id="tang_kinh"></a>
## Tàng Kinh Các — `tang_kinh`

- Loại: event; nguồn: Khám phá; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: sơn môn.
- Điều kiện: mọi tầng; đệ tử chính tông; nghỉ 720 giờ.
- Bối cảnh tác giả: tong.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/core/13-su-kien-2-tong.js`.

1. Tàng Kinh Các bảy tầng, mỗi tầng một cấm chế. Lão nhân quét sân trước cửa không ngẩng đầu: “Muốn vào, trả giá.”

### Lựa chọn

- **1. Nộp phí xem sách**
  - `cost`: `{"st":35}`
  - `chk`: `["ngo",10]`
  - **Thành công**: Giữa vạn quyển sách, ngươi tìm được đúng quyển dành cho mình.
    `{"e":{"skill":2}}`
  - **Thất bại**: Đọc mỏi mắt, ngươi chỉ hiểu được một quyển tầm thường.
    `{"e":{"skill":1}}`
- **2. Giúp lão quét sân**
  - **Khả năng 1**: Ba tháng quét sân. Ngày cuối, lão đưa ngươi một cuốn sách bìa đã bong: “Thứ này để ở tầng một chẳng ai đọc.” `{"w":2,"e":{"skill":2,"tam":1,"h":216}}`
  - **Khả năng 2**: Lão chẳng nói gì. Nhưng ngươi quét sân lâu ngày, tâm bỗng tĩnh như mặt nước. `{"w":1,"e":{"tam":3,"h":216}}`
- **3. Lẻn vào ban đêm**
  - `chk`: `["tp",12]`
  - **Thành công**: Ngươi chép vội một quyển rồi chuồn ra trước khi trời sáng.
    `{"e":{"skill":2,"hd":{"t":3},"ng":{"b":1}}}`
  - **Thất bại**: Cấm chế réo lên như chuông. Đệ tử tuần đêm ập tới.
    `{"fight":{"k":"detu","m":1.2},"win":{"t":"Ngươi chạy thoát, tay trắng.","e":{"hd":{"t":3},"ng":{"b":1}}}}`
- **4. Cáo từ, tiếp tục lên đường**
  Ngươi chọn rời khỏi nơi này, không can dự thêm.

<a id="luan_dao"></a>
## Luận đạo — `luan_dao`

- Loại: event; nguồn: Khám phá; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: sơn môn, núi non, thành trì.
- Điều kiện: mọi tầng; nghỉ 720 giờ.
- Bối cảnh tác giả: tong / nui / thanh.
- Vai: `{"a":{"role":"dao","alignment":"lawful"}}`.
- Xuất xứ: `d9ab301` / `src/game/core/13-su-kien-2-tong.js`.

1. Trên đài luận đạo, {$a.ten} đặt câu hỏi cho đám hậu bối: “Tu tiên, rốt cuộc là tu cái gì?”

2. Một lão đạo chặn ngươi giữa đường, không đánh mà hỏi: “Tu tiên, rốt cuộc là tu cái gì?”

### Lựa chọn

- **1. “Tu sức mạnh. Không có sức mạnh, đạo chỉ là lời nói.”**
  {$a.ten} gật gù: “Thẳng thắn. Nhưng cẩn thận, sức mạnh không có đáy.”
  - `e`: `{"atkP":5}`
- **2. “Tu cái tâm. Tâm không vững, tiên cũng thành ma.”**
  {$a.hn} mỉm cười: “Nói thì dễ. Giữ được mới khó.”
  - `e`: `{"tam":3}`
- **3. “Không biết. Nên mới phải tu.”**
  {$a.hn} cười lớn: “Hay cho câu không biết!”
  - `e`: `{"dao":1,"ngo":2,"tv":4}`
- **4. Im lặng**
  {$a.hn} nhìn ngươi một lúc rồi bỏ đi. Có lẽ im lặng cũng là một câu trả lời.
  - `e`: `{"tamma":-6}`

### Nối cơ chế

```json
{
  "variables": {
    "$hook": "luan_dao_v"
  }
}
```

<a id="kiem_trung"></a>
## Kiếm trủng — `kiem_trung`

- Loại: event; nguồn: Khám phá; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: núi non, phế tích, thiên lộ.
- Điều kiện: tầng 1, 2, 4; một lần/kiếp.
- Bối cảnh tác giả: nui / phe / thien.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/core/13-su-kien-2-tong.js`.

1. Cả một ngọn núi cắm đầy kiếm. Kiếm gỉ, kiếm gãy, kiếm còn sáng loáng. Gió thổi qua, ngàn thanh kiếm cùng ngân lên như khóc.

### Lựa chọn

- **1. Để kiếm chọn người**
  - `chk`: `["tam",12]`
  - **Thành công**: Một thanh kiếm gãy tự rút mình khỏi đá, bay tới đặt vào tay ngươi.
    `{"e":{"dao":2,"relic":"kiemgay","lore":"kiem_trung"}}`
  - **Thất bại**: Kiếm ý ngàn năm ập tới như thác. Ngươi bị đánh văng ra ngoài.
    `{"e":{"hp":"-20%","lore":"kiem_trung"}}`
- **2. Nhổ một thanh**
  - `fight`: `{"k":"kiemlinh"}`
  - **Thắng trận**: Kiếm hồn tan đi. Thanh kiếm nằm im trong tay ngươi, nặng trĩu.
    `{"e":{"relic":1,"lore":"kiem_trung"}}`
- **3. Vái rồi đi**
  Ngàn thanh kiếm cùng im lặng khi ngươi cúi đầu.
  - `e`: `{"tam":1,"lore":"kiem_trung"}`

<a id="linh_mach"></a>
## Mạch linh thạch — `linh_mach`

- Loại: event; nguồn: Khám phá; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: núi non, hang động.
- Điều kiện: mọi tầng; nghỉ 720 giờ.
- Bối cảnh tác giả: nui / dong.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/core/13-su-kien-2-tong.js`.

1. Vách hang lấp lánh ánh xanh: một mạch linh thạch lộ thiên! Nhưng trên vách có dấu ấn của {$sect}.

### Lựa chọn

- **1. Khai thác lén**
  - `chk`: `["tp",10]`
  - **Thành công**: Ngươi đào suốt đêm, túi trữ vật nặng trĩu.
    `{"e":{"st":50,"hd":{"t":3},"ng":{"b":1}}}`
  - **Thất bại**: Đệ tử tuần núi phát hiện ra ngươi.
    `{"fight":{"k":"detu"},"win":{"t":"Ngươi mang được nửa số đã đào.","e":{"st":25}}}`
- **2. Báo cho {$sect}**
  Tông môn thưởng cho ngươi một phần theo lệ, còn ghi tên ngươi vào sổ khách quý.
  - `e`: `{"st":20,"hd":{"p":1},"ng":{"g":1}}`
- **3. Ngồi tu luyện cạnh mạch**
  Linh khí đặc quánh. Ngươi ngồi nửa năm, như ngồi trong lò luyện.
  - `e`: `{"tv":12,"h":360}`
- **4. Cáo từ, tiếp tục lên đường**
  Ngươi chọn rời khỏi nơi này, không can dự thêm.

<a id="tran_co"></a>
## Trận đồ cổ — `tran_co`

- Loại: event; nguồn: Khám phá; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: phế tích, hang động, sơn môn.
- Điều kiện: mọi tầng; nghỉ 720 giờ.
- Bối cảnh tác giả: phe / dong / tong.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/core/13-su-kien-2-tong.js`.

1. Mặt đất khắc trận đồ chằng chịt, ở giữa là một hộp ngọc. Ở rìa trận có ba bộ xương, tư thế như đang chạy.

### Lựa chọn

- **1. Giải trận**
  - `chk`: `["ngo",12]`
  - **Thành công**: Ngươi bước theo đúng ba mươi sáu bước. Trận đồ tắt dần. Hộp ngọc là của ngươi.
    `{"e":{"relic":1,"ngo":1}}`
  - **Thất bại**: Bước thứ bảy sai. Trận đồ bùng lên, thiêu cháy nửa vạt áo ngươi.
    `{"e":{"hp":"-30%"}}`
- **2. Phá trận bằng sức**
  Trận đồ vỡ. Hộp ngọc cũng vỡ theo, chỉ còn một thứ sót lại bên trong.
  - `cost`: `{"mp":"60%"}`
  - `e`: `{"relic":0,"hp":"-10%"}`
- **3. Đi vòng**
  Ba bộ xương kia đã là đủ cảnh báo.
- **4. Cáo từ, tiếp tục lên đường**
  Ngươi chọn rời khỏi nơi này, không can dự thêm.

<a id="dao_lu"></a>
## Đạo lữ — `dao_lu`

- Loại: event; nguồn: Khám phá; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: *.
- Điều kiện: tầng 1, 2, 3; một lần/kiếp.
- Bối cảnh tác giả: *.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/core/13-su-kien-2-tong.js`.

1. Mấy ngày nay {$a.ten} cứ đi cùng một con đường với ngươi, lúc trước lúc sau. Tối nay bên đống lửa, {$a.hn} không giả vờ tình cờ nữa: “Đường tiên dài lắm. Đi cùng nhau, được không?”

2. Sau trận chiến, {$a.ten} băng bó vết thương cho ngươi. Tay {$a.hn} run run: “Ta không muốn thấy ngươi bị thương nữa.”

### Lựa chọn

- **1. Nhận lời kết làm đạo lữ**
  Hai người cùng thắt một sợi dây đỏ. Từ hôm ấy, đường xa bớt lạnh.
  - `e`: `{"relic":"dongtam","flag":"daolu","tam":2}`
- **2. Từ chối**
  {$a.hn} cười buồn, quay lưng đi. Ngươi không gọi lại.
  - `e`: `{"tam":1}`

### Nối cơ chế

```json
{
  "variables": {
    "$hook": "dao_lu_v"
  },
  "condition": {
    "$hook": "dao_lu_cond"
  }
}
```

<a id="bi_vu_oan"></a>
## Bị vu oan — `bi_vu_oan`

- Loại: event; nguồn: Khám phá; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: sơn môn.
- Điều kiện: mọi tầng; đệ tử chính tông; nghỉ 720 giờ.
- Bối cảnh tác giả: tong.
- Vai: `{"a":{"role":"nam","alignment":"context"}}`.
- Xuất xứ: `d9ab301` / `src/game/core/13-su-kien-2-tong.js`.

1. Trưởng lão triệu ngươi tới: kho đan dược mất trộm, có người khai thấy ngươi đêm đó. Sư huynh {$a.ten} đứng bên cạnh, khóe miệng khẽ nhếch.

### Lựa chọn

- **1. Tự biện hộ**
  - `chk`: `["ngo",11]`
  - **Thành công**: Ngươi chỉ ra vết tro trên giày {$a.ten}, thứ tro chỉ có trong kho đan. Trưởng lão biến sắc, phạt hắn ba năm diện bích, bồi thường cho ngươi.
    `{"e":{"hd":{"p":1},"st":25,"oan":["a","vạch mặt trước trưởng lão"]}}`
  - **Thất bại**: Không ai tin ngươi. Ngươi bị phạt nộp linh thạch và quét tàng kinh các ba tháng.
    `{"e":{"st":"-30%","tamma":6}}`
- **2. Thách đấu sinh tử**
  - `fight`: `{"k":"detu","n":"{$a.ten}","m":1.2}`
  - **Thắng trận**: {$a.ten} quỳ xuống nhận tội. Trưởng lão thở dài, nhìn ngươi bằng ánh mắt khác.
    `{"e":{"tamma":-5,"tv":8}}`
- **3. Cáo từ, tiếp tục lên đường**
  Ngươi chọn rời khỏi nơi này, không can dự thêm.

### Nối cơ chế

```json
{
  "variables": {
    "$hook": "bi_vu_oan_v"
  },
  "condition": {
    "$hook": "bi_vu_oan_cond"
  }
}
```

<a id="luyen_khi"></a>
## Lò rèn pháp bảo — `luyen_khi`

- Loại: event; nguồn: Khám phá; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: sơn môn, thành trì, núi non.
- Điều kiện: tầng 1, 2, 3; nghỉ 720 giờ.
- Bối cảnh tác giả: tong / thanh / nui.
- Vai: `{"a":{"role":"gia","alignment":"context"}}`.
- Xuất xứ: `d9ab301` / `src/game/core/13-su-kien-2-tong.js`.

1. Lò rèn đỏ rực giữa sườn núi. {$a.ten}, luyện khí sư nổi tiếng khó tính, đang dùng búa đập lên một miếng sắt đen. “Muốn ta luyện gì cho ngươi?”

### Lựa chọn

- **1. Nhờ luyện một món**
  - `cost`: `{"st":45}`
  - **Khả năng 1**: Bảy ngày bảy đêm. {$a.hn} nhúng món đồ vào nước, hơi trắng bốc lên. “Cầm lấy. Đừng làm mất.” `{"w":3,"e":{"relic":1}}`
  - **Khả năng 2**: Lò nổ. {$a.hn} chửi ầm lên, trả lại nửa tiền. `{"w":1,"e":{"st":20}}`
- **2. Phụ việc kiếm chút kinh nghiệm**
  Ngươi kéo bễ ba tháng, hiểu ra lửa cũng có tính khí như người.
  - `e`: `{"defP":4,"h":216}`
- **3. Cáo từ, tiếp tục lên đường**
  Ngươi chọn rời khỏi nơi này, không can dự thêm.

### Nối cơ chế

```json
{
  "variables": {
    "$hook": "luyen_khi_v"
  }
}
```

<a id="ngu_nhan"></a>
## Ngư nhân đổi hàng — `ngu_nhan`

- Loại: event; nguồn: Khám phá; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: biển khơi, sông hồ.
- Điều kiện: mọi tầng; nghỉ 720 giờ.
- Bối cảnh tác giả: bien / song.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/core/13-su-kien-2-tong.js`.

1. Một nhóm ngư nhân trồi lên bên mạn đá, trong tay là những viên trân châu to bằng quả trứng. Chúng chỉ vào túi trữ vật của ngươi, kêu ríu rít.

### Lựa chọn

- **1. Trao đổi**
  Đổi được một viên ngọc và mấy gói thuốc biển. Ngư nhân vui vẻ lặn mất.
  - `cost`: `{"st":20}`
  - `e`: `{"relic":0,"pill":1}`
- **2. Cướp**
  - `fight`: `{"k":"ngunhan"}`
  - **Thắng trận**: Ngươi gom hết trân châu. Mặt biển im lặng một cách đáng sợ.
    `{"e":{"st":40,"hd":{"t":3},"ng":{"b":3}}}`
- **3. Tặng quà làm quen**
  Ngư nhân nhận quà, vẫy đuôi chào. Từ đó, sóng biển quanh ngươi êm hơn một chút.
  - `cost`: `{"st":10}`
  - `e`: `{"van":2,"hd":{"p":1},"ng":{"g":1},"flag":"ngunhan"}`
- **4. Cáo từ, tiếp tục lên đường**
  Ngươi chọn rời khỏi nơi này, không can dự thêm.

<a id="dao_hoang"></a>
## Khói trên đảo hoang — `dao_hoang`

- Loại: event; nguồn: Khám phá; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: biển khơi.
- Điều kiện: mọi tầng; nghỉ 720 giờ.
- Bối cảnh tác giả: bien.
- Vai: `{"a":{"role":"tre","alignment":"context"}}`.
- Xuất xứ: `d9ab301` / `src/game/core/13-su-kien-2-tong.js`.

1. Trên đảo hoang có khói bốc lên. Ai đó đang đốt lửa cầu cứu.

### Lựa chọn

- **1. Ghé vào**
  - **Khả năng 1**: Là {$a.ten}, một tu sĩ đắm thuyền, mắc kẹt đã ba năm. {$a.hn} mừng phát khóc, tặng ngươi toàn bộ tài sản còn lại. `{"w":2,"e":{"st":35,"deed":"cuu_nguoi","an":["a","cứu khỏi đảo hoang"]}}`
  - **Khả năng 2**: Lửa là bẫy. Hải tặc từ trong rừng ùa ra. `{"w":1,"fight":{"k":"sontac","m":1.1},"win":{"t":"Sào huyệt hải tặc còn đầy của cải.","e":{"st":40}}}`
- **2. Đi tiếp**
  Biển rộng, ai cũng phải tự cứu mình.

### Nối cơ chế

```json
{
  "variables": {
    "$hook": "dao_hoang_v"
  }
}
```

<a id="hai_thi"></a>
## Hải thị thận lâu — `hai_thi`

- Loại: event; nguồn: Khám phá; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: biển khơi.
- Điều kiện: mọi tầng; nghỉ 720 giờ.
- Bối cảnh tác giả: bien / hoang.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/core/13-su-kien-2-tong.js`.

1. Trên mặt biển hiện ra một tòa thành, lầu son gác tía, người đi lại tấp nập. Hải thị thận lâu! Người ta nói trong đó mua được những thứ không tồn tại.

### Lựa chọn

- **1. Đi vào**
  - **Khả năng 1**: Ngươi mua được một thứ kỳ lạ từ một người không có mặt. `{"w":2,"e":{"relic":2}}`
  - **Khả năng 2**: Thành biến mất khi ngươi chạm tới cổng. Ngươi đứng giữa biển, nước tới ngực. `{"w":2,"e":{"hp":"-10%"}}`
  - **Khả năng 3**: Ngươi ở trong thành tưởng một ngày. Ra ngoài, ba năm đã qua. `{"w":1,"e":{"h":1080,"tv":15}}`
- **2. Ngắm từ xa**
  Tòa thành tan vào sương sớm. Ngươi không chắc mình đã thấy gì.
  - `e`: `{"tamma":-3}`

<a id="bao_bien"></a>
## Bão biển — `bao_bien`

- Loại: event; nguồn: Khám phá; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: biển khơi.
- Điều kiện: mọi tầng; nghỉ 720 giờ.
- Bối cảnh tác giả: bien.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/core/13-su-kien-2-tong.js`.

1. Ngươi vừa lên một chuyến đò biển thì mây đen ập tới. Sóng cao mười trượng, con đò chao đảo; người lái đang cố tìm chỗ tránh bão.

### Lựa chọn

- **1. Dùng linh lực chống bão**
  Ngươi đứng ở mũi thuyền, hai tay đẩy ra. Sóng rẽ đôi. Ba ngày sau trời quang, ngươi gầy rộc nhưng tâm cảnh vững hơn.
  - `cost`: `{"mp":"60%"}`
  - `e`: `{"tv":8,"h":72}`
- **2. Để sóng đẩy vào đảo**
  - **Khả năng 1**: Ngươi cùng người lái đò dạt vào một đảo nhỏ. Một toán thủy tặc từ bãi đá lao ra, định cướp hết đồ của người gặp nạn. `{"fight":{"k":"sontac"},"win":{"t":"Thủy tặc bỏ chạy, để lại túi tiền cướp được. Ngươi giúp người lái kéo đò lên bãi.","e":{"st":20}}}`
  - **Khả năng 2**: Trên đảo có một rương gỗ mục, bên trong là đồ của ai đó. `{"e":{"relic":0}}`
- **3. Cầu Long Vương**
  - `chk`: `["van",10]`
  - **Thành công**: Bão tan đột ngột như chưa từng có. Một con cá voi trắng nổi lên, phun nước ba lần rồi lặn.
    `{"e":{"van":1,"lore":"long_cung"}}`
  - **Thất bại**: Long Vương không nghe. Thuyền vỡ, ngươi bơi ba ngày mới vào bờ.
    `{"e":{"hp":"-25%"}}`
- **4. Nấp cùng người lái đò, chờ bão qua**
  Hai người buộc mình vào cột giữa đò, chịu sóng suốt đêm. Sáng ra đò dạt vào bãi cạn, ngươi trầy xước nhưng còn sống.
  - `e`: `{"h":24,"hp":"-10%"}`

<a id="long_cung"></a>
## Long cung chìm — `long_cung`

- Loại: event; nguồn: Khám phá; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: biển khơi.
- Điều kiện: tầng 2; một lần/kiếp.
- Bối cảnh tác giả: bien / dong.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/core/13-su-kien-2-tong.js`.

1. Đêm biển lặng, ngươi nghe tiếng chuông vọng lên từ đáy biển. Lặn xuống trăm trượng, một cung điện san hô hiện ra trong bóng tối.

### Lựa chọn

- **1. Vào chính điện**
  - `fight`: `{"k":"giao","elite":1,"m":1.1}`
  - **Thắng trận**: Con giao canh điện gục xuống. Trên ngai rồng có một tấm vảy to bằng cái mâm.
    `{"e":{"relic":"longlan","lore":"long_cung","tv":10}}`
- **2. Tìm cái chuông**
  - `chk`: `["ngo",12]`
  - **Thành công**: Chiếc chuông đồng treo ở tháp cao nhất. Ngươi gõ một tiếng. Trong đầu vang lên một bài pháp quyết cổ xưa.
    `{"e":{"lore":"long_cung","skill":3,"tam":2}}`
  - **Thất bại**: Ngươi lạc trong mê cung san hô, suýt chết đuối.
    `{"e":{"lore":"long_cung","hp":"-20%"}}`
- **3. Nổi lên**
  Có những thứ nên để yên dưới đáy biển.
  - `e`: `{"lore":"long_cung"}`

<a id="trai_ngoc"></a>
## Trai ngàn năm — `trai_ngoc`

- Loại: event; nguồn: Khám phá; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: biển khơi, sông hồ.
- Điều kiện: mọi tầng; nghỉ 720 giờ.
- Bối cảnh tác giả: bien / song.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/core/13-su-kien-2-tong.js`.

1. Con trai khổng lồ nằm dưới đáy đầm, vỏ hé mở, ánh sáng từ viên ngọc bên trong hắt lên như trăng.

### Lựa chọn

- **1. Thò tay lấy ngọc**
  - `chk`: `["tp",11]`
  - **Thành công**: Nhanh như cắt. Viên ngọc to bằng nắm tay nằm gọn trong lòng bàn tay ngươi.
    `{"e":{"relic":0,"st":20}}`
  - **Thất bại**: Vỏ trai sập lại như hàm cá sấu.
    `{"e":{"hp":"-25%"}}`
- **2. Cạy vỏ**
  - `fight`: `{"k":"thu_trai_ngoc_can_dam"}`
  - **Thắng trận**: Vỏ trai bị cạy toang. Ngọc là của ngươi.
    `{"e":{"relic":0}}`
- **3. Để yên**
  Nghìn năm mới có một viên ngọc. Để nó tiếp tục sáng.
  - `e`: `{"hd":{"p":1}}`
- **4. Cáo từ, tiếp tục lên đường**
  Ngươi chọn rời khỏi nơi này, không can dự thêm.

<a id="thuyen_ma"></a>
## Thuyền ma — `thuyen_ma`

- Loại: event; nguồn: Khám phá; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: biển khơi.
- Điều kiện: mọi tầng; dem; nghỉ 720 giờ.
- Bối cảnh tác giả: bien.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/core/13-su-kien-2-tong.js`.

1. Một chiếc thuyền buồm rách trôi tới trong sương. Không người lái, nhưng đèn trên boong vẫn sáng.

### Lựa chọn

- **1. Lên thuyền**
  - **Khả năng 1**: Cả đoàn thủy thủ vẫn còn đó, chỉ là không còn thịt. `{"w":2,"fight":{"k":"kholau"},"win":{"t":"Khoang thuyền đầy hàng hóa trăm năm trước.","e":{"st":40,"relic":0}}}`
  - **Khả năng 2**: Trên thuyền chỉ có một bức thư chưa gửi, đề tên một người ở {$que}. Ngươi cất đi. `{"w":1,"e":{"tam":2,"hd":{"p":1},"ng":{"g":1},"item":"nv_thu_chuadua"}}`
- **2. Đốt thuyền**
  Lửa bùng lên trong sương. Có tiếng thở phào rất khẽ.
  - `e`: `{"deed":"sieu_do"}`
- **3. Tránh xa**
  Chiếc thuyền trôi qua, đèn trên boong tắt dần.

### Nối cơ chế

```json
{
  "variables": {
    "$hook": "thuyen_ma_v"
  }
}
```

<a id="hang_bang"></a>
## Hang băng — `hang_bang`

- Loại: event; nguồn: Khám phá; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: hang động, sông hồ, biển khơi, núi non.
- Điều kiện: tầng 1, 2; nghỉ 720 giờ.
- Bối cảnh tác giả: dong / song / bien / nui.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/core/13-su-kien-2-tong.js`.

1. Hang băng sâu hun hút, vách băng trong suốt như pha lê. Bên trong đông cứng cả một đàn cá to như người, con nào cũng mở mắt.

### Lựa chọn

- **1. Đục lấy lõi hàn tinh**
  - **Khả năng 1**: Lõi hàn tinh lạnh buốt, cầm trên tay mà tê dại. `{"w":2,"e":{"relic":0,"hp":"-10%"}}`
  - **Khả năng 2**: Băng nứt. Một con cá đột nhiên quẫy đuôi. `{"w":1,"fight":{"k":"beast"},"win":{"t":"Hang băng lại im lặng.","e":{"relic":0}}}`
- **2. Tu luyện trong hang**
  Hàn khí rèn kinh mạch. Chịu được thì tiến bộ thần tốc.
  - `e`: `{"tv":12,"mpP":3,"h":360}`
- **3. Cáo từ, tiếp tục lên đường**
  Ngươi chọn rời khỏi nơi này, không can dự thêm.

<a id="quy_thi"></a>
## Quỷ thị — `quy_thi`

- Loại: event; nguồn: Khám phá; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: ma địa, thành trì, phế tích.
- Điều kiện: tầng 3, 4; dem; nghỉ 720 giờ.
- Bối cảnh tác giả: ma / thanh / phe.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/core/13-su-kien-2-tong.js`.

1. Quỷ thị mở lúc canh ba. Người bán đeo mặt nạ giấy, người mua không có bóng. Ở đây không ai lấy linh thạch, chỉ lấy năm tháng.

### Lựa chọn

- **1. Đổi thọ nguyên lấy công pháp**
  Ngươi thấy mình già đi một chút. Trong tay là một quyển sách viết bằng mực đen.
  - `e`: `{"lifeCut":8,"skill":3,"lore":"quy_thi"}`
- **2. Đổi thọ nguyên lấy đan dược**
  Kẻ đeo mặt nạ cười khanh khách, đếm năm tháng của ngươi như đếm tiền.
  - `e`: `{"lifeCut":5,"pill":["taytuy","phacanh"],"lore":"quy_thi"}`
- **3. Chỉ xem**
  Ngươi thấy một người đổi hết thọ nguyên lấy một bình rượu, uống xong rồi chết ngay tại sạp. Hắn cười.
  - `e`: `{"lore":"quy_thi"}`

<a id="huyet_tri"></a>
## Huyết trì — `huyet_tri`

- Loại: event; nguồn: Khám phá; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: ma địa.
- Điều kiện: mọi tầng; nghỉ 720 giờ.
- Bối cảnh tác giả: ma.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/core/13-su-kien-2-tong.js`.

1. Huyết trì sôi lục bục, mùi tanh nồng nặc. Ma tu đồn rằng tắm trong đó một đêm, công lực tăng gấp bội.

### Lựa chọn

- **1. Ngâm mình**
  Máu nóng như dung nham, chui vào từng lỗ chân lông. Sáng ra, ngươi mạnh lên thấy rõ. Và khát.
  - `e`: `{"atkP":10,"hpP":8,"hd":{"t":8},"ng":{"b":3},"tamma":12}`
- **2. Thanh tẩy huyết trì**
  - `fight`: `{"k":"oanlinh","m":1.15}`
  - **Thắng trận**: Huyết trì cạn dần, lộ ra đáy toàn xương trắng. Ngươi chôn cất từng mảnh.
    `{"e":{"deed":"sieu_do","tv":10}}`
- **3. Đi tiếp**
  Thứ sức mạnh ấy, ngươi không cần.

<a id="tu_binh"></a>
## Tù binh chính đạo — `tu_binh`

- Loại: event; nguồn: Khám phá; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: ma địa, phế tích, hang động.
- Điều kiện: mọi tầng; nghỉ 720 giờ.
- Bối cảnh tác giả: ma / phe / dong.
- Vai: `{"a":{"role":"tre","alignment":"context"}}`.
- Xuất xứ: `d9ab301` / `src/game/core/13-su-kien-2-tong.js`.

1. Trong lồng sắt treo trên vách đá là {$a.ten}, đệ tử {$sectC}. Hai tên ma tu canh gác đang uống rượu, cười đùa chuyện ngày mai mổ bụng lấy đan.

### Lựa chọn

- **1. Cứu người**
  - `fight`: `{"k":"matu","elite":1}`
  - **Thắng trận**: {$a.ten} được thả ra, quỳ xuống trước mặt ngươi. “Mạng này là của ân nhân.”
    `{"e":{"deed":"cuu_nguoi","st":20,"an":["a","cứu khỏi lồng sắt ma tu"]}}`
- **2. Lén mở lồng**
  - `chk`: `["tp",12]`
  - **Thành công**: Hai tên canh say mềm. Ngươi mở khóa, cõng người chạy suốt đêm.
    `{"e":{"deed":"cuu_nguoi","an":["a","cứu khỏi lồng sắt ma tu"]}}`
  - **Thất bại**: Then cửa kêu cót két.
    `{"fight":{"k":"matu"},"win":{"t":"Người đã được cứu. Ngươi mệt lả.","e":{"deed":"cuu_nguoi","an":["a","cứu khỏi lồng sắt ma tu"]}}}`
- **3. Mặc kệ**
  Ngươi đi qua. Tiếng kêu cứu bị gió cuốn đi.
  - `e`: `{"tamma":5}`
- **4. Cáo từ, tiếp tục lên đường**
  Ngươi chọn rời khỏi nơi này, không can dự thêm.

### Nối cơ chế

```json
{
  "variables": {
    "$hook": "tu_binh_v"
  }
}
```

<a id="van_thi"></a>
## Hố vạn thi — `van_thi`

- Loại: event; nguồn: Khám phá; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: ma địa, hoang nguyên.
- Điều kiện: mọi tầng; nghỉ 720 giờ.
- Bối cảnh tác giả: ma / hoang.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/core/13-su-kien-2-tong.js`.

1. Hố thi chất xác cao như núi, ruồi bay đen trời. Giữa đống xác có thứ gì đó phát sáng.

### Lựa chọn

- **1. Xuống lấy**
  - `fight`: `{"k":"cuongthi"}`
  - **Thắng trận**: Thứ phát sáng là một món bảo vật, nằm trong tay một cái xác không chịu buông.
    `{"e":{"relic":1}}`
- **2. Hỏa táng**
  Lửa cháy ba ngày ba đêm. Khói đen bay lên, rồi trắng dần.
  - `cost`: `{"mp":"50%"}`
  - `e`: `{"deed":"an_tang","tamma":-8}`
- **3. Bịt mũi đi qua**
  Mùi tử khí bám vào áo ngươi suốt mấy ngày.

<a id="tam_kinh"></a>
## Gương đồng — `tam_kinh`

- Loại: event; nguồn: Khám phá; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: ma địa, phế tích, thiên lộ.
- Điều kiện: mọi tầng; một lần/kiếp.
- Bối cảnh tác giả: ma / phe / thien.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/core/13-su-kien-2-tong.js`.

1. Giữa đại điện đổ nát có một tấm gương đồng to bằng cánh cửa. Người trong gương giống ngươi như đúc, chỉ khác là nó đang cười.

### Lựa chọn

- **1. Nhìn thẳng vào gương**
  - `fight`: `{"k":"tamma"}`
  - **Thắng trận**: Người trong gương ngừng cười. Rồi nó cúi đầu, và gương trở lại là gương.
    `{"e":{"relic":"tamkinh","tamma":-30,"lore":"tam_ma"}}`
- **2. Đập vỡ**
  Gương vỡ, nhưng tiếng cười còn vang trong đầu ngươi nhiều ngày.
  - `e`: `{"tamma":8,"hp":"-10%"}`
- **3. Không nhìn**
  Ngươi đi qua, mắt nhìn xuống đất.

<a id="ma_chung"></a>
## Hạt giống đen — `ma_chung`

- Loại: event; nguồn: Khám phá; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: ma địa, thành trì, hoang nguyên.
- Điều kiện: tầng 2, 3, 4; nghỉ 720 giờ.
- Bối cảnh tác giả: ma / thanh / hoang.
- Vai: `{"a":{"role":"ma","alignment":"hostile"}}`.
- Xuất xứ: `d9ab301` / `src/game/core/13-su-kien-2-tong.js`.

1. {$a.ten}, {$a.look}, ngồi chờ ngươi ở ngã ba. {$a.hn} chìa ra một hạt giống đen bóng: “Gieo vào đan điền, ngươi sẽ mạnh lên gấp mười. Cái giá à? Rồi ngươi sẽ biết.”

### Lựa chọn

- **1. Nhận**
  Hạt giống chui vào bụng ngươi như con rắn nhỏ. Sức mạnh dâng lên. Và có tiếng thì thầm rất khẽ.
  - `e`: `{"atkP":15,"defP":10,"hd":{"t":8},"tamma":20}`
- **2. Giết hắn**
  - `fight`: `{"k":"matu","elite":1,"n":"{$a.ten}"}`
  - **Thắng trận**: Hạt giống rơi xuống đất, mọc thành một cây gai đen rồi khô héo.
    `{"e":{"deed":"giet_ma_dau","tv":8}}`
- **3. Từ chối**
  “Ngươi sẽ quay lại.” Giọng {$a.hn} đuổi theo ngươi.

### Nối cơ chế

```json
{
  "variables": {
    "$hook": "ma_chung_v"
  }
}
```

<a id="nai_ha"></a>
## Sông không bờ — `nai_ha`

- Loại: event; nguồn: Khám phá; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: sông hồ, ma địa.
- Điều kiện: tầng 3, 4; một lần/kiếp.
- Bối cảnh tác giả: ma / hoang.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/core/13-su-kien-2-tong.js`.

1. Dòng sông đen ngòm không thấy bờ bên kia. Người lái đò đội nón lá, mặt chìm trong bóng tối. “Qua sông, phải để lại một thứ.”

### Lựa chọn

- **1. Để lại một ký ức**
  Ngươi quên mất một chuyện. Không biết chuyện gì. Chỉ thấy lòng nhẹ hơn.
  - `e`: `{"tamma":-25,"ngo":-1}`
- **2. Để lại tiền**
  Người lái đò cầm lấy, không nói gì. Bờ bên kia hiện ra.
  - `cost`: `{"st":40}`
- **3. Để lại năm tháng**
  Ngươi thấy tóc mình bạc đi vài sợi. Bờ bên kia có hoa nở đỏ rực.
  - `e`: `{"lifeCut":6,"tv":8}`
- **4. Cáo từ, tiếp tục lên đường**
  Ngươi chọn rời khỏi nơi này, không can dự thêm.

<a id="ma_tu_xin_tha"></a>
## Ma tu xin tha — `ma_tu_xin_tha`

- Loại: event; nguồn: Khám phá; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: ma địa, hoang nguyên, phế tích.
- Điều kiện: mọi tầng; nghỉ 720 giờ.
- Bối cảnh tác giả: ma / hoang / phe.
- Vai: `{"a":{"role":"ma","alignment":"hostile"}}`.
- Xuất xứ: `d9ab301` / `src/game/core/13-su-kien-2-tong.js`.

1. {$a.ten} bị thương nặng, quỳ trước mặt ngươi, dập đầu lia lịa: “Tha cho ta! Ta có vợ con! Ta sẽ nói chỗ giấu bảo vật!”

### Lựa chọn

- **1. Tha**
  - **Khả năng 1**: {$a.hn} giữ lời. Chỗ giấu có một món bảo vật. `{"w":2,"e":{"deed":"tha_ke_ac","relic":0}}`
  - **Khả năng 2**: Ngươi vừa quay lưng, một con dao găm đã cắm vào vai. `{"w":1,"e":{"hp":"-15%"},"fight":{"k":"matu","n":"{$a.ten}"},"win":{"t":"Lần này ngươi không quay lưng nữa.","e":{"tamma":3}}}`
- **2. Trừ ma**
  Ma tu là ma tu. Ngươi không để lời van xin làm mềm tay.
  - `e`: `{"deed":"giet_ma_dau","tv":6,"st":15}`
- **3. Tra hỏi trước**
  - `chk`: `["ngo",10]`
  - **Thành công**: Ngươi bắt {$a.hn} dẫn tới tận nơi rồi mới quyết.
    `{"e":{"relic":0,"st":20}}`
  - **Thất bại**: {$a.hn} nói dối. Ngươi biết, nhưng quá muộn. {$a.hn} đã chạy.
- **4. Cáo từ, tiếp tục lên đường**
  Ngươi chọn rời khỏi nơi này, không can dự thêm.

### Nối cơ chế

```json
{
  "variables": {
    "$hook": "ma_tu_xin_tha_v"
  }
}
```

<a id="tinh_ha"></a>
## Sông sao — `tinh_ha`

- Loại: event; nguồn: Khám phá; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: thiên lộ.
- Điều kiện: mọi tầng; nghỉ 720 giờ.
- Bối cảnh tác giả: thien.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/core/14-thien-lo.js`.

1. Dải ngân hà chảy ngang lối đi như một dòng suối. Trong nước là sao thật, mỗi ngôi to bằng nắm tay.

### Lựa chọn

- **1. Vớt một ngôi sao**
  - `chk`: `["tam",12]`
  - **Thành công**: Ngôi sao nằm trong tay ngươi, ấm như trái tim.
    `{"e":{"relic":2}}`
  - **Thất bại**: Sao nóng như mặt trời. Tay ngươi bỏng rộp.
    `{"e":{"hp":"-25%"}}`
- **2. Ngồi bên bờ quan sát**
  Ngươi nhìn sao trôi. Mỗi ngôi sao là một con đường. Ngươi hiểu ra vài điều.
  - `e`: `{"dao":2,"tv":14,"ngo":2,"h":360}`
- **3. Bước qua**
  Nước sao lạnh buốt tới tận xương.
- **4. Cáo từ, tiếp tục lên đường**
  Ngươi chọn rời khỏi nơi này, không can dự thêm.

<a id="di_thue"></a>
## Di thuế tiên nhân — `di_thue`

- Loại: event; nguồn: Khám phá; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: thiên lộ, phế tích.
- Điều kiện: mọi tầng; nghỉ 720 giờ.
- Bối cảnh tác giả: thien / phe.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/core/14-thien-lo.js`.

1. Một bộ xác ngồi xếp bằng trên đài ngọc, da thịt vẫn hồng hào. Đây là tiên nhân di thuế, cái xác một bậc tiền bối để lại khi phi thăng.

### Lựa chọn

- **1. Bái lạy**
  Ngươi lạy ba lạy. Khóe môi bộ xác dường như khẽ cong lên.
  - `e`: `{"tam":3,"van":2,"lore":"tien_khu"}`
- **2. Lấy pháp bảo trên người**
  - `fight`: `{"k":"khoiloi","elite":1}`
  - **Thắng trận**: Khôi lỗi canh giữ đổ sập. Pháp bảo của tiên nhân là của ngươi.
    `{"e":{"relic":2,"deed":"dao_mo"}}`
- **3. Tham ngộ đạo vận còn sót**
  - `chk`: `["ngo",13]`
  - **Thành công**: Đạo vận chảy vào thức hải như nước tràn đê.
    `{"e":{"dao":2,"tv":20,"skill":4}}`
  - **Thất bại**: Đạo vận quá lớn. Đầu ngươi như sắp nổ tung.
    `{"e":{"tamma":10,"hp":"-15%"}}`
- **4. Cáo từ, tiếp tục lên đường**
  Ngươi chọn rời khỏi nơi này, không can dự thêm.

<a id="thien_van"></a>
## Thiên đạo hỏi — `thien_van`

- Loại: event; nguồn: Khám phá; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: thiên lộ.
- Điều kiện: mọi tầng; một lần/kiếp.
- Bối cảnh tác giả: thien.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/core/14-thien-lo.js`.

1. Một giọng nói không đến từ đâu cả vang lên trong đầu ngươi: “Nếu được làm lại, ngươi có chọn tu tiên nữa không?”

### Lựa chọn

- **1. “Có.”**
  Thiên đạo im lặng. Ngươi coi như đó là đồng ý.
  - `e`: `{"dao":3,"tam":5,"tv":8}`
- **2. “Không.”**
  Một tiếng cười rất khẽ. “Thành thật đấy.”
  - `e`: `{"tamma":-30,"van":3}`
- **3. “Ta không nhớ mình đã từng chọn.”**
  Một thoáng im lặng. Rồi ngươi nghe như có tiếng thở dài.
  - `e`: `{"ngo":3,"lore":"luan_hoi"}`

<a id="hu_khong"></a>
## Khe nứt hư không — `hu_khong`

- Loại: event; nguồn: Khám phá; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: thiên lộ, hoang nguyên.
- Điều kiện: mọi tầng; nghỉ 720 giờ.
- Bối cảnh tác giả: thien / hoang.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/core/14-thien-lo.js`.

1. Không gian trước mặt nứt toác như mặt gương vỡ. Bên kia khe nứt là bóng tối, trong bóng tối có thứ gì đó lấp lánh.

### Lựa chọn

- **1. Thò tay vào**
  - **Khả năng 1**: Ngươi rút ra một thứ không thuộc về thế giới này. `{"w":2,"e":{"dao":2,"relic":2,"lore":"hu_khong"}}`
  - **Khả năng 2**: Thứ lấp lánh ấy có răng. `{"w":1,"fight":{"k":"trung","elite":1},"win":{"t":"Hư không trùng chết, để lại thứ nó đang giữ.","e":{"relic":1,"lore":"hu_khong"}}}`
  - **Khả năng 3**: Thời gian bên trong trôi khác. Ngươi rút tay ra, tóc đã bạc thêm. `{"w":1,"e":{"hp":"-30%","h":216,"lore":"hu_khong"}}`
- **2. Tránh xa**
  Khe nứt khép lại sau lưng ngươi, như một con mắt nhắm.
  - `e`: `{"lore":"hu_khong"}`

<a id="tien_khu"></a>
## Tiên khư — `tien_khu`

- Loại: event; nguồn: Khám phá; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: thiên lộ, phế tích.
- Điều kiện: tầng 3, 4; nghỉ 720 giờ.
- Bối cảnh tác giả: thien / phe.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/core/14-thien-lo.js`.

1. Một tòa cung điện rơi từ thượng giới, cắm nghiêng xuống mây. Cửa chính đã vỡ, bên trong tối om.

### Lựa chọn

- **1. Đi vào**
  - **Khả năng 1**: Khôi lỗi canh điện vẫn còn hoạt động. `{"w":2,"fight":{"k":"khoiloi"},"win":{"t":"Trong điện có một rương ngọc.","e":{"dao":3,"relic":1,"lore":"tien_khu"}}}`
  - **Khả năng 2**: Bên trong chỉ có một tấm bia: “Thứ ta vứt đi, ngươi đừng nhặt.” Ngươi nghe lời. `{"w":1,"e":{"tam":3,"lore":"tien_khu"}}`
- **2. Đi tiếp**
  Tiên nhân vứt đi, chắc gì đã là thứ tốt.

<a id="co_nhan_mong"></a>
## Giấc mơ kiếp trước — `co_nhan_mong`

- Loại: event; nguồn: Khám phá; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: *.
- Điều kiện: tầng 2, 3, 4; nghỉ 720 giờ.
- Bối cảnh tác giả: *.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/core/14-thien-lo.js`.

1. Đêm ấy ngươi mơ thấy mình là {$g.ten}, chết năm {$g.tuoi} tuổi. Tỉnh dậy, gối ướt đẫm mà không nhớ vì sao.

2. Ngươi chợt nhớ một cái tên chưa từng nghe: {$g.ten}. Rồi nhớ cả cảm giác lúc chết. Tay ngươi run lên.

### Lựa chọn

- **1. Lần theo ký ức**
  - `chk`: `["ngo",11]`
  - **Thành công**: Ký ức kiếp trước trải ra như một cuộn tranh. Những chiêu thức cũ trở về trong tay ngươi.
    `{"e":{"tv":12,"lore":"luan_hoi"}}`
  - **Thất bại**: Ký ức vỡ vụn, cắt vào tâm trí như mảnh sứ.
    `{"e":{"tamma":6}}`
- **2. Buông xuống**
  Kiếp trước là kiếp trước. Ngươi rửa mặt, đi tiếp.
  - `e`: `{"tam":2}`
- **3. Cáo từ, tiếp tục lên đường**
  Ngươi chọn rời khỏi nơi này, không can dự thêm.

### Nối cơ chế

```json
{
  "variables": {
    "$hook": "co_nhan_mong_v"
  },
  "condition": {
    "$hook": "co_nhan_mong_cond"
  }
}
```

<a id="d_hon"></a>
## Hồn ma tìm người — `d_hon`

- Loại: event; nguồn: Khám phá; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: phế tích, hoang nguyên, thôn trấn, rừng sâu.
- Điều kiện: mọi tầng; dem; nghỉ 720 giờ.
- Bối cảnh tác giả: phe / hoang / tran / rung.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/core/15-thu-trieu.js`.

1. Nửa đêm, có ai đó gõ cửa. Mở ra, một nữ tử áo trắng đứng đó, chân không chạm đất: “Ngươi có thấy phu quân ta không?”

### Lựa chọn

- **1. Tụng kinh siêu độ**
  - `chk`: `["tam",10]`
  - **Thành công**: Nàng mỉm cười, tan thành sương.
    `{"e":{"deed":"sieu_do","tam":1}}`
  - **Thất bại**: Nàng gào lên, mặt biến dạng.
    `{"fight":{"k":"quy"},"win":{"t":"Hồn ma tan biến.","e":{"tv":4}}}`
- **2. Đóng cửa**
  Tiếng gõ cửa kéo dài tới gà gáy.
  - `e`: `{"tamma":3}`
- **3. Cáo từ, tiếp tục lên đường**
  Ngươi chọn rời khỏi nơi này, không can dự thêm.

<a id="d_dom"></a>
## Đom đóm dẫn đường — `d_dom`

- Loại: event; nguồn: Khám phá; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: rừng sâu, sông hồ, núi non.
- Điều kiện: mọi tầng; dem/toi; nghỉ 720 giờ.
- Bối cảnh tác giả: rung / song / nui.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/core/15-thu-trieu.js`.

1. Một đàn đom đóm bay thành dòng, như có ai cầm đèn dẫn đường.

### Lựa chọn

- **1. Đi theo**
  - **Khả năng 1**: Chúng dẫn ngươi tới một gốc linh thảo nở về đêm. `{"w":2,"e":{"pill":"tinhnguyen"}}`
  - **Khả năng 2**: Chúng dẫn ngươi vào ổ của một con yêu nhện. `{"w":1,"fight":{"k":"chu"},"win":{"t":"Trong tổ nhện có ít linh thạch.","e":{"st":15}}}`
- **2. Ngủ tiếp**
  Đêm yên tĩnh.
- **3. Cáo từ, tiếp tục lên đường**
  Ngươi chọn rời khỏi nơi này, không can dự thêm.

<a id="d_trom"></a>
## Kẻ trộm đêm — `d_trom`

- Loại: event; nguồn: Khám phá; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: thôn trấn, thành trì.
- Điều kiện: mọi tầng; dem; nghỉ 720 giờ.
- Bối cảnh tác giả: tran / thanh.
- Vai: `{"a":{"role":"pham","alignment":"context"}}`.
- Xuất xứ: `d9ab301` / `src/game/core/15-thu-trieu.js`.

1. Nửa đêm, có bàn tay lần vào túi trữ vật của ngươi.

### Lựa chọn

- **1. Chộp tay**
  - `chk`: `["tp",9]`
  - **Thành công**: Là {$a.ten}, gầy trơ xương. Nhà có mẹ già đang ốm.
    `{"c":[{"i":"💎","l":"Cho ít linh thạch","cost":{"st":8},"t":"Gã khóc rồi đi.","e":{"deed":"bo_thi","an":["a","tha tội và cho tiền"]}},{"i":"👮","l":"Giao cho quan","t":"Gã bị lôi đi.","e":{"hd":{"t":1}}}]}`
  - **Thất bại**: Kẻ trộm chạy mất, mang theo ít linh thạch.
    `{"e":{"st":"-15%"}}`
- **2. Giả ngủ, xem hắn làm gì**
  Hắn lấy mấy viên linh thạch rồi đi. Ngươi để yên.
  - `e`: `{"st":"-8%","deed":"bo_thi"}`
- **3. Cáo từ, tiếp tục lên đường**
  Ngươi chọn rời khỏi nơi này, không can dự thêm.

### Nối cơ chế

```json
{
  "variables": {
    "$hook": "d_trom_v"
  }
}
```

<a id="d_sao"></a>
## Ngắm sao — `d_sao`

- Loại: event; nguồn: Khám phá; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: núi non, hoang nguyên, biển khơi, thiên lộ.
- Điều kiện: mọi tầng; dem; nghỉ 720 giờ.
- Bối cảnh tác giả: nui / hoang / bien / thien.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/core/15-thu-trieu.js`.

1. Trời đêm trong vắt. Ngươi nằm ngửa trên đá, sao trời gần như chạm tay.

### Lựa chọn

- **1. Quan sát tinh tượng**
  - `chk`: `["ngo",10]`
  - **Thành công**: Ngươi chợt hiểu ra nhịp xoay của trời đất.
    `{"e":{"tv":5,"dao":1}}`
  - **Thất bại**: Ngươi ngủ quên lúc nào không biết.
    `{"e":{"h":6}}`
- **2. Ngủ**
  Một giấc ngon lành.
  - `e`: `{"hp":"15%"}`
- **3. Cáo từ, tiếp tục lên đường**
  Ngươi chọn rời khỏi nơi này, không can dự thêm.

<a id="d_quan"></a>
## Quán đêm — `d_quan`

- Loại: event; nguồn: Trong quán; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: thôn trấn, thành trì, chợ phiên tu sĩ / Tửu phường.
- Điều kiện: mọi tầng; dem/toi; nghỉ 720 giờ.
- Bối cảnh tác giả: tran / thanh / song.
- Vai: `{"a":{"role":"tre","alignment":"context"}}`.
- Xuất xứ: `d9ab301` / `src/game/core/15-thu-trieu.js`.

1. Quán nhỏ còn sáng đèn. {$a.ten}, {$a.look}, đang uống một mình.

### Lựa chọn

- **1. Ngồi cùng**
  Hai người uống tới khuya, kể chuyện giang hồ.
  - `e`: `{"rumor":2,"an":["a","bầu bạn trong đêm"]}`
- **2. Về nghỉ**
  Ngươi về phòng.
- **3. Cáo từ, tiếp tục lên đường**
  Ngươi chọn rời khỏi nơi này, không can dự thêm.

### Nối cơ chế

```json
{
  "variables": {
    "$hook": "d_quan_v"
  }
}
```

<a id="d_lua"></a>
## Lửa ma trơi — `d_lua`

- Loại: event; nguồn: Khám phá; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: phế tích, hoang nguyên, ma địa.
- Điều kiện: mọi tầng; dem; nghỉ 720 giờ.
- Bối cảnh tác giả: phe / hoang / ma.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/core/15-thu-trieu.js`.

1. Đốm lửa xanh lơ lửng giữa đồng, cứ cách ngươi mười bước.

### Lựa chọn

- **1. Đuổi theo**
  - **Khả năng 1**: Lửa dừng lại trên một nấm mộ cổ. Dưới đó có đồ tùy táng. `{"w":1,"e":{"relic":0,"hd":{"t":1}}}`
  - **Khả năng 2**: Lửa hóa thành một bộ xương. `{"w":1,"fight":{"k":"kholau"},"win":{"t":"Xương vụn rải đầy cỏ.","e":{"st":10}}}`
- **2. Khấn rồi đi**
  Lửa tắt.
  - `e`: `{"tam":1}`
- **3. Cáo từ, tiếp tục lên đường**
  Ngươi chọn rời khỏi nơi này, không can dự thêm.

<a id="d_trang"></a>
## Trăng máu — `d_trang`

- Loại: event; nguồn: Khám phá; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: *.
- Điều kiện: mọi tầng; dem; nghỉ 720 giờ.
- Bối cảnh tác giả: *.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/core/15-thu-trieu.js`.

1. Mặt trăng đỏ như máu. Yêu khí khắp nơi trỗi dậy.

### Lựa chọn

- **1. Ngồi trấn tâm**
  - `chk`: `["tam",11]`
  - **Thành công**: Ngươi giữ được tâm, đêm qua bình an.
    `{"e":{"tamma":-5}}`
  - **Thất bại**: Những ý nghĩ xấu xa trỗi dậy trong lòng.
    `{"e":{"tamma":8}}`
- **2. Đi săn yêu**
  - `fight`: `{"k":"beast","cnt":2}`
  - **Thắng trận**: Đêm trăng máu, yêu đan cũng đỏ hơn.
    `{"e":{"st":20,"tv":4}}`
- **3. Cáo từ, tiếp tục lên đường**
  Ngươi chọn rời khỏi nơi này, không can dự thêm.

<a id="d_ca"></a>
## Tiếng hát trên sông — `d_ca`

- Loại: event; nguồn: Khám phá; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: sông hồ, biển khơi.
- Điều kiện: mọi tầng; dem/toi; nghỉ 720 giờ.
- Bối cảnh tác giả: song / bien.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/core/15-thu-trieu.js`.

1. Tiếng hát vẳng lên từ mặt nước, buồn tới thắt lòng.

### Lựa chọn

- **1. Chèo thuyền ra**
  - **Khả năng 1**: Một ngư nữ đang hát. Thấy ngươi, nàng tặng một viên ngọc rồi lặn mất. `{"w":1,"e":{"relic":0}}`
  - **Khả năng 2**: Là thủy quỷ dụ người! `{"w":1,"fight":{"k":"thuyquy"},"win":{"t":"Mặt sông lặng lại.","e":{"st":10}}}`
- **2. Ngồi nghe**
  Ngươi nghe tới khi tiếng hát tắt.
  - `e`: `{"tam":1,"tamma":-2}`
- **3. Cáo từ, tiếp tục lên đường**
  Ngươi chọn rời khỏi nơi này, không can dự thêm.

<a id="d_mong"></a>
## Giấc mơ lạ — `d_mong`

- Loại: event; nguồn: Khám phá; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: *.
- Điều kiện: mọi tầng; dem; nghỉ 720 giờ.
- Bối cảnh tác giả: *.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/core/15-thu-trieu.js`.

1. Ngươi mơ thấy mình là một người khác, sống ở một thời khác.

### Lựa chọn

- **1. Cố nhớ lại**
  - `chk`: `["ngo",10]`
  - **Thành công**: Lúc tỉnh dậy, ngươi nhớ được một đoạn khẩu quyết.
    `{"e":{"skill":1}}`
  - **Thất bại**: Tỉnh dậy, chỉ còn cảm giác buồn mơ hồ.
    `{"e":{"tamma":2}}`
- **2. Ngủ tiếp**
  Giấc mơ tan đi.
- **3. Cáo từ, tiếp tục lên đường**
  Ngươi chọn rời khỏi nơi này, không can dự thêm.

<a id="d_soi"></a>
## Bầy sói đêm — `d_soi`

- Loại: event; nguồn: Khám phá; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: rừng sâu, núi non, hoang nguyên.
- Điều kiện: mọi tầng; dem; nghỉ 720 giờ.
- Bối cảnh tác giả: rung / nui / hoang.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/core/15-thu-trieu.js`.

1. Trong bóng tối, hàng chục đôi mắt xanh lè sáng lên quanh đống lửa.

### Lựa chọn

- **1. Đốt lửa to xua đuổi**
  - `chk`: `["tam",9]`
  - **Thành công**: Bầy sói lùi dần rồi bỏ đi.
    `{"e":{"h":2}}`
  - **Thất bại**: Chúng lao vào.
    `{"fight":{"k":"lang","cnt":3},"win":{"t":"Xác sói nằm quanh đống lửa.","e":{"st":15,"tv":4}}}`
- **2. Ra tay trước**
  - `fight`: `{"k":"lang","cnt":2}`
  - **Thắng trận**: Bầy sói tan tác.
    `{"e":{"st":12,"tv":3}}`
- **3. Cáo từ, tiếp tục lên đường**
  Ngươi chọn rời khỏi nơi này, không can dự thêm.

<a id="m_xuan1"></a>
## Lễ hội mùa xuân — `m_xuan1`

- Loại: event; nguồn: Khám phá; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: thôn trấn, thành trì.
- Điều kiện: mọi tầng; xuan; nghỉ 720 giờ.
- Bối cảnh tác giả: tran / thanh.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/core/15-thu-trieu.js`.

1. Đầu xuân, người ta rước kiệu khắp phố, pháo nổ đỏ đường.

### Lựa chọn

- **1. Vui cùng dân chúng**
  Ngươi ăn bánh, xem múa lân, cười thật lòng lần đầu sau nhiều tháng.
  - `e`: `{"tamma":-8,"van":1,"h":8}`
- **2. Đi tiếp**
  Tiếng pháo xa dần.

<a id="m_xuan2"></a>
## Hoa nở linh thảo — `m_xuan2`

- Loại: event; nguồn: Khám phá; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: rừng sâu, núi non, sông hồ.
- Điều kiện: mọi tầng; xuan; nghỉ 720 giờ.
- Bối cảnh tác giả: rung / nui / song.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/core/15-thu-trieu.js`.

1. Mùa xuân, linh thảo đâm chồi khắp sườn núi.

### Lựa chọn

- **1. Hái**
  Ngươi hái được một gùi linh thảo, đủ để luyện mấy lò đan.
  - `e`: `{"thao":5,"h":6}`
- **2. Ngồi cảm thụ sinh khí**
  Sinh khí mùa xuân thấm vào kinh mạch.
  - `e`: `{"tv":3,"h":6}`
- **3. Cáo từ, tiếp tục lên đường**
  Ngươi chọn rời khỏi nơi này, không can dự thêm.

<a id="m_ha1"></a>
## Mưa rào mùa hạ — `m_ha1`

- Loại: event; nguồn: Khám phá; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: *.
- Điều kiện: mọi tầng; ha; nghỉ 720 giờ.
- Bối cảnh tác giả: *.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/core/15-thu-trieu.js`.

1. Mưa rào ập xuống, trắng xóa trời đất. Sấm rền liên hồi.

### Lựa chọn

- **1. Ngồi giữa mưa cảm ngộ lôi đình**
  - `chk`: `["tam",11]`
  - **Thành công**: Tiếng sấm như gõ vào tâm ngươi.
    `{"e":{"tv":5,"dao":1}}`
  - **Thất bại**: Sét đánh trúng cây cạnh ngươi, tóc dựng ngược.
    `{"e":{"hp":"-15%"}}`
- **2. Trú mưa**
  Ngươi ngồi chờ tạnh.
  - `e`: `{"h":3}`
- **3. Cáo từ, tiếp tục lên đường**
  Ngươi chọn rời khỏi nơi này, không can dự thêm.

<a id="m_ha2"></a>
## Hạn hán — `m_ha2`

- Loại: event; nguồn: Khám phá; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: thôn trấn, hoang nguyên.
- Điều kiện: mọi tầng; ha; nghỉ 720 giờ.
- Bối cảnh tác giả: tran / hoang.
- Vai: `{"a":{"role":"gia","alignment":"context"}}`.
- Xuất xứ: `d9ab301` / `src/game/core/15-thu-trieu.js`.

1. Ruộng nứt nẻ. {$a.ten} quỳ giữa ruộng khấn trời.

### Lựa chọn

- **1. Dùng linh lực gọi mưa**
  Mây kéo tới, mưa lất phất. Cả làng quỳ lạy.
  - `cost`: `{"mp":"60%"}`
  - `e`: `{"deed":"cuu_dich","an":["a","gọi mưa cứu làng"]}`
- **2. Không giúp được**
  Ngươi đi qua.

### Nối cơ chế

```json
{
  "variables": {
    "$hook": "m_ha2_v"
  }
}
```

<a id="m_thu1"></a>
## Mùa gặt — `m_thu1`

- Loại: event; nguồn: Khám phá; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: thôn trấn.
- Điều kiện: mọi tầng; thu; nghỉ 720 giờ.
- Bối cảnh tác giả: tran.
- Vai: `{"a":{"role":"pham","alignment":"context"}}`.
- Xuất xứ: `d9ab301` / `src/game/core/15-thu-trieu.js`.

1. Lúa chín vàng đồng. {$a.ten} nhờ ngươi gặt giúp.

### Lựa chọn

- **1. Gặt giúp**
  Một ngày mồ hôi. Tối đó được ăn cơm mới.
  - `e`: `{"h":12,"hd":{"p":3},"ng":{"g":3},"hp":"30%","an":["a","gặt lúa giúp"]}`
- **2. Từ chối**
  Ngươi bận việc.

### Nối cơ chế

```json
{
  "variables": {
    "$hook": "m_thu1_v"
  }
}
```

<a id="m_thu2"></a>
## Lá phong rụng — `m_thu2`

- Loại: event; nguồn: Khám phá; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: núi non, rừng sâu.
- Điều kiện: mọi tầng; thu; nghỉ 720 giờ.
- Bối cảnh tác giả: nui / rung.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/core/15-thu-trieu.js`.

1. Lá phong đỏ rụng đầy lối, mỗi chiếc lá như một ngọn lửa nhỏ.

### Lựa chọn

- **1. Ngồi ngắm, nghĩ về sinh tử**
  - `chk`: `["ngo",10]`
  - **Thành công**: Lá rụng để cây sống qua đông. Ngươi chợt hiểu.
    `{"e":{"tv":4,"dao":1}}`
  - **Thất bại**: Ngươi thấy lòng buồn vô cớ.
    `{"e":{"tamma":2}}`
- **2. Cáo từ, tiếp tục lên đường**
  Ngươi chọn rời khỏi nơi này, không can dự thêm.

<a id="m_dong1"></a>
## Bão tuyết — `m_dong1`

- Loại: event; nguồn: Khám phá; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: núi non, hoang nguyên, rừng sâu.
- Điều kiện: mọi tầng; dong; nghỉ 720 giờ.
- Bối cảnh tác giả: nui / hoang / rung.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/core/15-thu-trieu.js`.

1. Bão tuyết ập tới, trắng xóa không thấy đường.

### Lựa chọn

- **1. Tìm hang trú**
  Hai ngày trong hang, ăn đồ khô.
  - `e`: `{"h":48}`
- **2. Cố đi tiếp**
  - `chk`: `["tp",10]`
  - **Thành công**: Ngươi vượt được bão.
  - **Thất bại**: Lạc trong tuyết, chân tay tê cóng.
    `{"e":{"hp":"-25%","h":24}}`

<a id="m_dong2"></a>
## Đêm đông người rét — `m_dong2`

- Loại: event; nguồn: Khám phá; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: thôn trấn, thành trì.
- Điều kiện: mọi tầng; dong; nghỉ 720 giờ.
- Bối cảnh tác giả: tran / thanh.
- Vai: `{"a":{"role":"hai","alignment":"context"}}`.
- Xuất xứ: `d9ab301` / `src/game/core/15-thu-trieu.js`.

1. Trời rét cắt da. {$a.ten} ngồi co ro bên vệ đường, môi tím tái.

### Lựa chọn

- **1. Cởi áo khoác cho**
  Đứa bé ôm chặt chiếc áo.
  - `e`: `{"deed":"bo_thi","tamma":-3,"an":["a","cho áo giữa đêm đông"]}`
- **2. Đi qua**
  Sáng hôm sau, ngươi nghe nói có đứa bé chết rét.
  - `e`: `{"tamma":5}`

### Nối cơ chế

```json
{
  "variables": {
    "$hook": "m_dong2_v"
  }
}
```
