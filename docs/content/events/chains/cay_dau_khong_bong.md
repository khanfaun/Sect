# content/events/chains/cay_dau_khong_bong.json

Nguồn chuẩn: `content/events/chains/cay_dau_khong_bong.json`. Bản đọc tự sinh. Cú pháp: xem [guideline](../../GUIDELINE.md).

<a id="ch_cay_dau_khong_bong_1"></a>
## Cành qua bờ — `ch_cay_dau_khong_bong_1`

- Loại: story; nguồn: Khám phá; chủ đề: Chuyện hai nhà; cảm xúc: Lãng mạn.
- Nơi: rừng sâu, thôn trấn.
- Điều kiện: tầng 0; chuỗi cay_dau_khong_bong / phần 1; một lần/kiếp.
- Bối cảnh tác giả: Bờ ruộng ở Phàm Trần.
- Vai: `{"a":{"gender":"nu","role":"cô gái","alignment":"context"},"b":{"gender":"nam","role":"chàng trai","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Cô gái {$a.ten} hái lá dâu qua tường cho chàng trai {$b.ten} nuôi tằm. Hai nhà đang tranh ranh đất, nên nàng dùng một cành dài đẩy rổ qua, trên thành rổ còn mắc một sợi tóc.

### Lựa chọn

- **1. Giữ thang cho {$a.ten} đưa rổ**
  Ngươi giữ thang, nàng chuyển được rổ lá sang. Chàng trai giấu một cuộn tơ mới vào rổ trả lại, lí nhí nhờ nàng may khăn. Nàng nhận, chưa kịp đáp thì trong nhà có tiếng gọi.
  - `e`: `{"hd":{"p":3},"ng":{"g":3},"an":["a","cành qua bờ"]}`
- **2. Mua cây dâu rồi thu lá cả hai bên**
  Ngươi mua được lá rẻ vì hai nhà muốn dứt tranh cãi. Chàng trai đến xin hái lá sót, còn cô gái rút chiếc rổ về.
  - `cost`: `{"st":10}`
  - `e`: `{"hd":{"t":1}}`
- **3. Bỏ đi**
  Rổ mắc trên tường, hai người cùng kéo. Một nắm lá rơi đúng xuống rãnh ranh.

### Lịch sử và nhánh

```json
{
  "id": "cay_dau_khong_bong",
  "part": "1",
  "waitHours": 0,
  "needs": [],
  "paths": null
}
```

<a id="ch_cay_dau_khong_bong_2"></a>
## Tấm vải ướt — `ch_cay_dau_khong_bong_2`

- Loại: story; nguồn: Khám phá; chủ đề: Lời hẹn; cảm xúc: Dịu dàng.
- Nơi: sông hồ, thôn trấn.
- Điều kiện: tầng 0, 1, 2, 3, 4; chuỗi cay_dau_khong_bong / phần 2; chờ ≥ 2160 giờ; một lần/kiếp.
- Bối cảnh tác giả: Lạch nhuộm ở Phàm Trần.
- Vai: `{"a":{"gender":"nu","role":"Cô gái","alignment":"context"},"b":{"gender":"nam","role":"Chàng trai","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Chàng trai {$b.ten} căng tấm vải đầu tiên ở lạch. Cô gái {$a.ten} may sẵn hai túi nhỏ từ phần mép, giấu một chiếc dưới hòn đá nàng dùng giặt vải.

### Lựa chọn

- **1. Giữ chỗ ở bến xe cho cả hai**
  Ngươi đặt bạc trước và để họ tự quyết. Họ kịp rời làng trước khi nhà nàng khóa cổng, mỗi người mang một túi nhỏ.
  - `cost`: `{"st":10}`
  - `e`: `{"hd":{"p":3},"ng":{"g":3},"an":["a","tấm vải ướt"]}`
- **2. Khuyên họ ở lại nói chuyện với hai nhà**
  Họ chia lá và tiền tơ ngay trên bờ lạch. Hai nhà chịu nghe, song chiếc túi của nàng bị mẹ giữ lại dưới chậu giặt.
  - `e`: `{"hd":{"p":1},"ng":{"g":1}}`
- **3. Bỏ đi**
  Ngươi chào họ rồi đi. Hai người kéo vải vào dưới mái hiên, tiếp tục bàn chuyện có nên rời làng.

### Lịch sử và nhánh

```json
{
  "id": "cay_dau_khong_bong",
  "part": "2",
  "waitHours": 2160,
  "needs": [
    0
  ],
  "paths": null
}
```

<a id="ch_cay_dau_khong_bong_2b"></a>
## Giá của một rổ lá — `ch_cay_dau_khong_bong_2b`

- Loại: story; nguồn: Khám phá; chủ đề: Sinh kế; cảm xúc: Day dứt.
- Nơi: thôn trấn, thành trì.
- Điều kiện: tầng 0, 1, 2, 3, 4; chuỗi cay_dau_khong_bong / phần 2b; chờ ≥ 2160 giờ; một lần/kiếp.
- Bối cảnh tác giả: Sân hong kén ở Phàm Trần.
- Vai: `{"a":{"gender":"nu","role":"Cô gái","alignment":"context"},"b":{"gender":"nam","role":"Chàng trai","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Chàng trai {$b.ten} thiếu lá, phải bán tằm trước khi kết kén. Cô gái {$a.ten} đưa chiếc rổ cũ đến xin đổi công, dưới đáy rổ lót đúng số lá khô đã rụng sang nhà nàng.

### Lựa chọn

- **1. Trả lại cây dâu cho hai người trông**
  Ngươi trả quyền hái lá cho hai người cùng trông coi, chịu mất khoản đã mua. Họ bàn ngay việc chia công tưới cây, rồi mới nhận ra chưa ai nói lời cảm ơn ngươi.
  - `e`: `{"hd":{"p":3},"ng":{"g":3}}`
- **2. Cho cả hai làm thuê lấy lá**
  Ngươi giao họ chăm cây, trả công bằng phần lá và nhận tiền bán số lá còn lại. Họ giữ được nghề, nhưng người hai nhà vẫn canh nhau từng rổ. Có việc làm chưa khiến chuyện ranh đất tự mất đi.
  - `e`: `{"st":14}`
- **3. Bỏ đi**
  Chàng trai bán cả mẹt nuôi tằm. Nàng gói mấy con tằm cuối vào một chiếc lá vàng.

### Lịch sử và nhánh

```json
{
  "id": "cay_dau_khong_bong",
  "part": "2b",
  "waitHours": 2160,
  "needs": [
    1
  ],
  "paths": null
}
```

<a id="ch_cay_dau_khong_bong_3"></a>
## Tơ phơi đầu ngõ — `ch_cay_dau_khong_bong_3`

- Loại: story; nguồn: Khám phá; chủ đề: Chuyện hai nhà; cảm xúc: Bi thương.
- Nơi: thôn trấn, thành trì.
- Điều kiện: tầng 0, 1, 2, 3, 4; chuỗi cay_dau_khong_bong / phần 3; chờ ≥ 8640 giờ; một lần/kiếp.
- Bối cảnh tác giả: Đầu ngõ ở Phàm Trần.
- Vai: `{"a":{"gender":"nu","role":"story_person","alignment":"context"},"b":{"gender":"nam","role":"story_person","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Nếu hai người từng rời làng, ngươi gặp họ trở về bán lứa tơ đầu sau một năm tự lập. Nếu họ từng ở lại giảng hòa, hai nhà đã chịu chia lá nhưng vẫn tính toán từng phần công. Nếu họ từng nhận trông cây cho ngươi, họ đem tiền bán tơ tới và báo cây dâu đã chết vì sương muối. Họ giữ được một cành còn mầm sống, đang tìm đất ấm để giâm.

### Lựa chọn

- **1. Thuê đất ấm cho họ giâm cành**
  Ngươi trả tiền thuê một khoảnh đất khuất gió đủ vài năm. Họ tự lo giâm cành và dựng giàn, hẹn khi cây bén rễ sẽ báo ngươi biết.
  - `cost`: `{"st":10}`
  - `e`: `{"hd":{"p":3},"ng":{"g":3}}`
- **2. Mua cành sống với giá cao**
  Ngươi trả giá cao cho cành sống, gửi lại để họ ươm và nhận phần lá sau này. Họ có tiền thuê khung cửi, còn ngươi cũng mong cây qua được mùa rét.
  - `cost`: `{"st":10}`
  - `e`: `{"hd":{"p":3},"ng":{"g":3}}`
- **3. Bỏ đi**
  Họ bọc mắt dâu trong mảnh vải cuối cùng. Một vệt nước thấm qua và nhỏ đều xuống đầu gánh.

### Lịch sử và nhánh

```json
{
  "id": "cay_dau_khong_bong",
  "part": "3",
  "waitHours": 8640,
  "needs": [],
  "paths": [
    [
      "2:0"
    ],
    [
      "2:1"
    ],
    [
      "2b:0",
      "2b:1"
    ]
  ]
}
```

<a id="ch_cay_dau_khong_bong_4"></a>
## Ai ngồi dưới dâu — `ch_cay_dau_khong_bong_4`

- Loại: story; nguồn: Khám phá; chủ đề: Chuyện hai nhà; cảm xúc: Lắng dịu.
- Nơi: thôn trấn, thành trì.
- Điều kiện: tầng 0, 1, 2, 3, 4; chuỗi cay_dau_khong_bong / phần 4; chờ ≥ 25920 giờ; một lần/kiếp.
- Bối cảnh tác giả: Sân dệt ở Phàm Trần.
- Vai: `{"a":{"gender":"nu","role":"Cô gái","alignment":"context"},"b":{"gender":"nam","role":"story_person","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Nếu ngươi từng thuê đất giúp họ, cây dâu đã lớn đủ cho hai người ngồi nghỉ dưới tán. Nếu ngươi từng mua cành, cây đang được họ chăm trong vườn thuê để trả phần lá đã hẹn. Cô gái {$a.ten} gọi ngươi vào xem tấm vải mới. Ngoài sân, người hai nhà đang cùng sửa hàng rào.

### Lựa chọn

- **1. Nhường phần lá và góp giống cho hai nhà**
  Ngươi để họ dùng trọn lá mùa này, mua thêm cành giống cho hai nhà cùng trồng. Chàng trai cười bảo lần này sẽ trồng hẳn một hàng, khỏi chuyền rổ qua tường.
  - `cost`: `{"st":10}`
  - `e`: `{"hd":{"p":3},"ng":{"g":3}}`
- **2. Đặt mua một tấm vải bằng giá đã hẹn**
  Ngươi trả tiền mua vải, họ có thêm một mối hàng quen. Nàng hỏi ngươi muốn màu nào, chàng trai đã mang cả ba cuộn ra cho chọn.
  - `cost`: `{"st":10}`
- **3. Bỏ đi**
  Ngươi lên đường sau chén trà. Hai người trở lại khung cửi, vừa làm vừa tranh nhau kể chuyện cây dâu năm ấy.

### Lịch sử và nhánh

```json
{
  "id": "cay_dau_khong_bong",
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
