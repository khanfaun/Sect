# content/events/chains/den_soi_duong_lui.json

Nguồn chuẩn: `content/events/chains/den_soi_duong_lui.json`. Bản đọc tự sinh. Cú pháp: xem [guideline](../../GUIDELINE.md).

<a id="ch_den_soi_duong_lui_1"></a>
## Bấc quay về phía thấp — `ch_den_soi_duong_lui_1`

- Loại: story; nguồn: Khám phá; chủ đề: Chọn đường tu; cảm xúc: Trầm buồn.
- Nơi: thiên lộ.
- Điều kiện: tầng 4; chuỗi den_soi_duong_lui / phần 1; một lần/kiếp.
- Bối cảnh tác giả: Trạm đèn ở Cửu Thiên Cổ Lộ.
- Vai: `{"a":{"gender":"nam","role":"người giữ đèn","alignment":"context"},"b":{"gender":"nam","role":"tu sĩ","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Người giữ đèn {$a.ten} châm một ngọn soi xuống đường lui, trong khi tu sĩ {$b.ten} cần cả bình dầu để tìm lối lên. Bấc cong sẵn về phía thấp, trên đầu có một đốm than.

### Lựa chọn

- **1. Góp dầu để giữ cả hai lối**
  Ngươi mua thêm dầu giữ cả đèn lên lẫn đèn xuống. Người giữ đèn thắp thử hai ngọn, tu sĩ nhìn rõ đường rồi mới khởi hành. Lão dặn hắn nhớ vị trí ngọn đèn thấp, đi xa còn biết chỗ quay về.
  - `cost`: `{"st":22}`
  - `e`: `{"hd":{"p":3},"ng":{"g":3}}`
- **2. Đổ dầu vào đèn đi lên**
  Ngươi và {$b.ten} thấy rõ đường. Sau lưng, {$a.ten} ép bấc tắt xuống đĩa.
  - `e`: `{"hd":{"t":1}}`
- **3. Bỏ đi**
  Có người từ trên cao gõ ba tiếng vào lan can, phía dưới không đáp.

### Lịch sử và nhánh

```json
{
  "id": "den_soi_duong_lui",
  "part": "1",
  "waitHours": 0,
  "needs": [],
  "paths": null
}
```

<a id="ch_den_soi_duong_lui_2"></a>
## Người mang đèn bằng hai tay — `ch_den_soi_duong_lui_2`

- Loại: story; nguồn: Khám phá; chủ đề: Chọn đường tu; cảm xúc: Cảm động.
- Nơi: thiên lộ.
- Điều kiện: tầng 4; chuỗi den_soi_duong_lui / phần 2; chờ ≥ 2160 giờ; một lần/kiếp.
- Bối cảnh tác giả: Sân đổi đường ở Cửu Thiên Cổ Lộ.
- Vai: `{"a":{"gender":"nam","role":"story_person","alignment":"context"},"b":{"gender":"nam","role":"Tu sĩ","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Tu sĩ {$b.ten} quay lại vì muốn xuống thăm người nhà. Hắn chưa biết đèn soi lối lui phải cầm thấp, ngọn lửa đang quệt vào tay áo.

### Lựa chọn

- **1. Dẫn hắn xuống đoạn đầu**
  Ngươi dẫn hắn xuống đoạn đầu, lỡ cửa lên mở trong ngày. Tới chỗ tự nhận ra đường, hắn hạ đèn, cảm tạ rồi đi tiếp. Người giữ đèn rủ ngươi về trạm chờ lượt sau.
  - `e`: `{"hd":{"p":3},"ng":{"g":3},"h":24,"an":["a","người mang đèn bằng hai tay"]}`
- **2. Đổi đường về riêng lấy ngọn đèn chung**
  Ngươi chỉ cho hắn một lối riêng về nhà, nhận ngọn đèn của trạm làm vật dẫn đường. Hắn có thể đi, nhưng khách tới sau không còn đèn dùng chung. Người giữ đèn đứng chờ ngươi trả, ngươi không hẹn ngày.
  - `e`: `{"hd":{"t":1},"namedRelic":{"k":"dang","name":"Đèn Dẫn Đường Chung","lore":"Ngươi chỉ cho hắn một lối riêng về nhà, nhận ngọn đèn của trạm làm vật dẫn đường. Hắn có thể đi, nhưng khách tới sau không còn đèn dùng chung. Người giữ đèn đứng chờ ngươi trả, ngươi không hẹn ngày."}}`
- **3. Bỏ đi**
  Hắn chậm rãi hạ tay. Vết cháy trên áo còn bốc một sợi khói.

### Lịch sử và nhánh

```json
{
  "id": "den_soi_duong_lui",
  "part": "2",
  "waitHours": 2160,
  "needs": [
    0
  ],
  "paths": null
}
```

<a id="ch_den_soi_duong_lui_2b"></a>
## Lối xuống ở trong tay — `ch_den_soi_duong_lui_2b`

- Loại: story; nguồn: Khám phá; chủ đề: Chọn đường tu; cảm xúc: Day dứt.
- Nơi: thiên lộ.
- Điều kiện: tầng 4; chuỗi den_soi_duong_lui / phần 2b; chờ ≥ 2160 giờ; một lần/kiếp.
- Bối cảnh tác giả: Gờ đá ở Cửu Thiên Cổ Lộ.
- Vai: `{"a":{"gender":"nam","role":"story_person","alignment":"context"},"b":{"gender":"nam","role":"Tu sĩ","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Tu sĩ {$b.ten} muốn xuống nhưng chỉ nhớ hướng ngọn lửa từng tắt. Hắn vạch đường lên lòng bàn tay, nét cuối cùng quặp vào ngón cái.

### Lựa chọn

- **1. Chia lửa hộ thân cho hắn thử lại**
  Ngươi truyền linh hỏa vào nét đường hắn đã vạch. Hơi lạnh phản lại làm ngực đau nhói, ngươi vẫn giữ tới khi hắn tìm được lối thật. Hắn gọi thêm người theo xuống, còn ngươi ở lại dưỡng khí.
  - `e`: `{"hd":{"p":3},"ng":{"g":3},"hp":"-10%"}`
- **2. Bán cho hắn một lối xuống riêng**
  Hắn trả bằng vật đã lấy ở tầng trên. Người theo sau hỏi đường, ngươi chỉ thấy bàn tay hắn khép lại.
  - `e`: `{"deed":"lua_loi","relic":0}`
- **3. Bỏ đi**
  Hắn đặt lòng bàn tay lên đá, chờ hơi ấm vạch đường.

### Lịch sử và nhánh

```json
{
  "id": "den_soi_duong_lui",
  "part": "2b",
  "waitHours": 2160,
  "needs": [
    1
  ],
  "paths": null
}
```

<a id="ch_den_soi_duong_lui_3"></a>
## Đường cho người đã đi xa — `ch_den_soi_duong_lui_3`

- Loại: story; nguồn: Khám phá; chủ đề: Đường lui; cảm xúc: Căng thẳng.
- Nơi: thiên lộ.
- Điều kiện: tầng 4; chuỗi den_soi_duong_lui / phần 3; chờ ≥ 8640 giờ; một lần/kiếp.
- Bối cảnh tác giả: Mái đèn ở Cửu Thiên Cổ Lộ.
- Vai: `{"a":{"gender":"nam","role":"Người giữ đèn","alignment":"context"},"b":{"gender":"nam","role":"tu sĩ","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Một đoàn tu sĩ muốn quay xuống sau khi cửa lên khép. Nếu từng có đèn hoặc lửa chia, tu sĩ {$b.ten} biết đưa người xuống từng tốp. Nếu ngươi từng giữ đèn hoặc bán đường riêng, họ đứng chờ ngươi mở lối.

### Lựa chọn

- **1. Đốt một phần đạo hạnh dựng đường lui chung**
  Ngươi dùng một phần tu vi mở đường lui cho cả đoàn. Người biết lối xuống đi trước dẫn đường, người khỏe dìu người yếu. Khi đường khép, tu sĩ cuối đã về tới trạm; ngươi ngồi xuống dưỡng thần.
  - `e`: `{"hd":{"p":3},"ng":{"g":3},"tv":-4}`
- **2. Gom lễ vật rồi mở đường theo lượt**
  Ngươi có linh thạch, chỉ người trả đủ được qua trước khi ánh tắt. Bên mép đá còn một túi vải rỗng.
  - `e`: `{"st":30,"hd":{"t":3},"ng":{"b":1}}`
- **3. Bỏ đi**
  Người giữ đèn {$a.ten} nhấc một đĩa không dầu. Đám người vẫn dạt sang hai bên cho lão qua.

### Lịch sử và nhánh

```json
{
  "id": "den_soi_duong_lui",
  "part": "3",
  "waitHours": 8640,
  "needs": [],
  "paths": [
    [
      "2:0",
      "2b:0"
    ],
    [
      "2:1",
      "2b:1"
    ]
  ]
}
```

<a id="ch_den_soi_duong_lui_4"></a>
## Một đốm lửa nhìn từ dưới — `ch_den_soi_duong_lui_4`

- Loại: story; nguồn: Khám phá; chủ đề: Chuyện người quay về; cảm xúc: Lắng dịu.
- Nơi: thiên lộ.
- Điều kiện: tầng 4; chuỗi den_soi_duong_lui / phần 4; chờ ≥ 25920 giờ; một lần/kiếp.
- Bối cảnh tác giả: Bậc đầu Cửu Thiên Cổ Lộ.
- Vai: `{"a":{"gender":"nam","role":"người giữ đèn","alignment":"context"},"b":{"gender":"nam","role":"Tu sĩ","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Nếu từng mở đường chung, người về góp dầu đặt đèn mới. Nếu từng thu lễ, tu sĩ {$b.ten} lấy dầu riêng đốt ở bậc đầu. Người đứng đợi vẫn giữ những túi đã từng đem lên.

### Lựa chọn

- **1. Trao phần dầu hoặc lễ vật cho người giữ đèn {$a.ten}**
  Lão giữ lửa cho người đi hai chiều. Bấc cắt thành hai đầu, đầu quay xuống cháy trước.
  - `cost`: `{"st":22}`
  - `e`: `{"hd":{"p":3},"ng":{"g":3}}`
- **2. Dựng lối có người trông bằng phí qua đường**
  Đường giữ được lâu và ngươi có phần thu. {$b.ten} chừa dưới đèn một bậc cho người chưa trả nghỉ chân.
  - `e`: `{"st":30}`
- **3. Bỏ đi**
  Ngươi chào người giữ đèn rồi đi tiếp. Sau lưng, hai ngọn đèn vẫn cháy; người lên và người xuống đã biết tự nhường đường cho nhau.

### Lịch sử và nhánh

```json
{
  "id": "den_soi_duong_lui",
  "part": "4",
  "waitHours": 25920,
  "needs": [
    0,
    1
  ],
  "paths": [
    [
      "3:0"
    ],
    [
      "3:1"
    ]
  ]
}
```
