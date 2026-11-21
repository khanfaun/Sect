# content/events/chains/no_mot_mua_toc_bac.json

Nguồn chuẩn: `content/events/chains/no_mot_mua_toc_bac.json`. Bản đọc tự sinh. Cú pháp: xem [guideline](../../GUIDELINE.md).

<a id="ch_no_mot_mua_toc_bac_1"></a>
## Mùa đông đặt trên cân — `ch_no_mot_mua_toc_bac_1`

- Loại: story; nguồn: Khám phá; chủ đề: Thọ nguyên; cảm xúc: Day dứt.
- Nơi: ma địa.
- Điều kiện: tầng 3; chuỗi no_mot_mua_toc_bac / phần 1; một lần/kiếp.
- Bối cảnh tác giả: Sảnh cầm tuổi ở Cửu U Ma Vực.
- Vai: `{"a":{"gender":"nam","role":"ma tu","alignment":"context"},"b":{"gender":"nam","role":"Người em","alignment":"context"},"c":{"gender":"nam","role":"Chủ khế","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Ma tu {$a.ten} đã cầm phần thọ nguyên cuối để chuộc tuổi cho người em {$b.ten}. Chủ khế {$c.ten} vẫn đòi bù thêm vì lãi tăng qua mùa rét. Người anh không còn gì để cầm, người em đứng bên xin xem lại từng dòng khế.

### Lựa chọn

- **1. Bù phần thiếu bằng thọ nguyên của ngươi**
  {$b.ten} nhận lại tuổi. {$a.ten} nhặt sợi tóc, lặng lẽ gài sau tai mình.
  - `e`: `{"hd":{"p":3},"ng":{"g":3},"lifeCut":4,"an":["a","mùa đông đặt trên cân"]}`
- **2. Mua nửa món nợ của {$c.ten}**
  Ngươi có phần tuổi để thu. {$a.ten} xin được đem chiếc cân về một đêm để tập đặt tay.
  - `cost`: `{"st":19}`
  - `e`: `{"deed":"ep_ta_dien"}`
- **3. Bỏ đi**
  {$c.ten} đặt quả cân xuống. Đĩa nhẹ nhấc khỏi bàn dù {$a.ten} đang giữ.

### Lịch sử và nhánh

```json
{
  "id": "no_mot_mua_toc_bac",
  "part": "1",
  "waitHours": 0,
  "needs": [],
  "paths": null
}
```

<a id="ch_no_mot_mua_toc_bac_2"></a>
## Tóc rụng khỏi khăn — `ch_no_mot_mua_toc_bac_2`

- Loại: story; nguồn: Khám phá; chủ đề: Chuyện anh em; cảm xúc: Cảm động.
- Nơi: ma địa.
- Điều kiện: tầng 3, 4; chuỗi no_mot_mua_toc_bac / phần 2; chờ ≥ 2160 giờ; một lần/kiếp.
- Bối cảnh tác giả: Nhà hong khăn ở Cửu U Ma Vực.
- Vai: `{"a":{"gender":"nam","role":"ma tu","alignment":"context"},"b":{"gender":"nam","role":"Người em","alignment":"context"},"c":{"gender":"nam","role":"story_person","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Người em {$b.ten} thấy tóc ma tu {$a.ten} bạc đi vì phần tuổi đã cầm. Hắn se tóc thành chỉ, định đổi lấy một mảnh phù giữ nhiệt.

### Lựa chọn

- **1. Góp lửa để hai người qua mùa**
  Ngươi trả tiền mua than linh giữ ấm căn nhà. Hai anh em thôi phải đổi tóc lấy phù, cùng ngồi vá lại áo trước bếp. Người em hẹn tới khi khỏe sẽ tự tìm việc, không để anh cầm thêm tuổi nữa.
  - `cost`: `{"st":19}`
  - `e`: `{"hd":{"p":3},"ng":{"g":3},"an":["a","tóc rụng khỏi khăn"]}`
- **2. Dạy hắn kiếm linh thạch bằng bùa tuổi**
  Hắn đủ tiền chuộc một ít tuổi. Mẻ bùa đầu có một sợi tóc trắng nằm ngang.
  - `e`: `{"hd":{"p":1},"ng":{"g":1},"tamma":2}`
- **3. Bỏ đi**
  Hắn phủ khăn qua vai anh, để chỗ tóc vừa cắt quay vào trong.

### Lịch sử và nhánh

```json
{
  "id": "no_mot_mua_toc_bac",
  "part": "2",
  "waitHours": 2160,
  "needs": [
    0
  ],
  "paths": null
}
```

<a id="ch_no_mot_mua_toc_bac_2b"></a>
## Kẻ đến thu lãi — `ch_no_mot_mua_toc_bac_2b`

- Loại: story; nguồn: Khám phá; chủ đề: Đòi nợ; cảm xúc: Phẫn nộ.
- Nơi: ma địa.
- Điều kiện: tầng 3, 4; chuỗi no_mot_mua_toc_bac / phần 2b; chờ ≥ 2160 giờ; một lần/kiếp.
- Bối cảnh tác giả: Hẻm bán bùa ở Cửu U Ma Vực.
- Vai: `{"a":{"gender":"nam","role":"ma tu","alignment":"context"},"b":{"gender":"nam","role":"Người em","alignment":"context"},"c":{"gender":"nam","role":"Chủ khế","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Chủ khế {$c.ten} đến thu tuổi trước hạn vì đoán ma tu {$a.ten} sắp chết. Người em {$b.ten} cầm phần bùa đã bán được, ngón tay còn đen ở chỗ cầm mực.

### Lựa chọn

- **1. Hủy phần nợ của ngươi và kéo dài hạn**
  Ngươi hủy phần nợ mình giữ, buộc chủ khế ghi lại số tuổi và hạn còn lại. Hai anh em có thêm thời gian xoay xở. Người em giữ bản đối chiếu, không còn giao cả giấy cho một mình chủ khế.
  - `e`: `{"hd":{"p":3},"ng":{"g":3}}`
- **2. Mua nốt món nợ để tự định hạn**
  Ngươi có quyền giữ tuổi lẫn lãi. {$b.ten} đưa thẳng cho ngươi lá bùa cuối còn khô.
  - `cost`: `{"st":19}`
  - `e`: `{"deed":"ep_ta_dien"}`
- **3. Bỏ đi**
  {$c.ten} đếm tuổi bằng móng tay. Người đứng cạnh nghe tiếng cào từ trong giấy.

### Lịch sử và nhánh

```json
{
  "id": "no_mot_mua_toc_bac",
  "part": "2b",
  "waitHours": 2160,
  "needs": [
    1
  ],
  "paths": null
}
```

<a id="ch_no_mot_mua_toc_bac_3"></a>
## Tuổi của người đứng sau — `ch_no_mot_mua_toc_bac_3`

- Loại: story; nguồn: Khám phá; chủ đề: Thọ nguyên và ân oán; cảm xúc: Căng thẳng.
- Nơi: ma địa.
- Điều kiện: tầng 3, 4; chuỗi no_mot_mua_toc_bac / phần 3; chờ ≥ 8640 giờ; một lần/kiếp.
- Bối cảnh tác giả: Ngách truyền thọ ở Cửu U Ma Vực.
- Vai: `{"a":{"gender":"nam","role":"Ma tu","alignment":"context"},"b":{"gender":"nam","role":"story_person","alignment":"context"},"c":{"gender":"nam","role":"Chủ khế","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Chủ khế {$c.ten} bị thương nặng, cần thọ nguyên để sống qua đêm. Nếu ngươi từng giúp hai anh em, người em tự tới đề nghị đổi một phần tuổi lấy việc trả khế. Nếu ngươi từng giữ quyền thu nợ, chủ khế tìm ngươi thương lượng bán cả số khế còn lại để mua tuổi cứu mình. Lần này chính lão phải chờ người khác ra giá.

### Lựa chọn

- **1. Buộc lão trả hết giấy cầm trước khi truyền tuổi**
  Ngươi yêu cầu lão trả khế trước, rồi giúp giữ mạch lúc truyền tuổi. Luồng khí đứt quãng khiến ngươi bị thương, nhưng lão qua được cơn nguy. Người em kiểm đủ giấy của anh mình rồi mới nhận lời dừng truyền.
  - `e`: `{"hd":{"p":3},"ng":{"g":3},"hp":"-10%"}`
- **2. Mua chỗ tuổi còn dư sau khi cứu lão**
  Sau khi cứu lão, người em bán một phần tuổi để lấy tiền chuộc nốt cho anh. Ngươi nhận mua, thêm thọ nguyên; hắn giữ lại đủ tuổi mình cần, không nghe lời ngươi trả giá cao hơn.
  - `cost`: `{"st":19}`
  - `e`: `{"deed":"lua_loi","tamma":3,"life":20}`
- **3. Bỏ đi**
  Ma tu {$a.ten} cầm đèn tới, ánh đèn không đủ soi hết một mặt khế.

### Lịch sử và nhánh

```json
{
  "id": "no_mot_mua_toc_bac",
  "part": "3",
  "waitHours": 8640,
  "needs": [],
  "paths": [
    [
      "2:0",
      "2:1",
      "2b:0"
    ],
    [
      "2b:1"
    ]
  ]
}
```

<a id="ch_no_mot_mua_toc_bac_4"></a>
## Một người tự gấp giấy — `ch_no_mot_mua_toc_bac_4`

- Loại: story; nguồn: Khám phá; chủ đề: Trả tuổi; cảm xúc: Lắng dịu.
- Nơi: ma địa.
- Điều kiện: tầng 3, 4; chuỗi no_mot_mua_toc_bac / phần 4; chờ ≥ 1440 giờ; một lần/kiếp.
- Bối cảnh tác giả: Bếp giữ lửa ở Cửu U Ma Vực.
- Vai: `{"a":{"gender":"nam","role":"Ma tu","alignment":"context"},"b":{"gender":"nam","role":"story_person","alignment":"context"},"c":{"gender":"nam","role":"story_person","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Nếu giấy đã trả, hai anh em đã hết nợ, đem khế cũ bỏ vào bếp. Nếu người em từng bán thêm tuổi, hắn giữ tiền mua thuốc và phần giấy xác nhận số tuổi đã giao. Thọ nguyên người anh đã cầm từ trước không tự trở lại khi xóa nợ. Lão vẫn yếu, người em hỏi ngươi có cách nào giúp anh qua thêm mùa rét.

### Lựa chọn

- **1. Trao phần tuổi ngươi còn giữ hoặc bù bằng tuổi mình**
  Ma tu {$a.ten} có thêm một mùa bên em. Trên bếp vẫn còn một tờ chưa cháy hết.
  - `e`: `{"hd":{"p":3},"ng":{"g":3},"lifeCut":3}`
- **2. Giữ tuổi và trả bằng linh thạch**
  Họ dùng bạc đắp lại mái, chỗ cạnh bếp ấm lâu hơn. Ma tu {$a.ten} tự gấp tờ giấy, lấy móng tay miết đến phẳng.
  - `cost`: `{"st":19}`
  - `e`: `{"hd":{"p":1},"ng":{"g":1}}`
- **3. Bỏ đi**
  Người em hỏi anh có muốn ra ngoài xem tuyết không. Ngươi cáo từ trước khi họ quyết, để hai anh em có một buổi riêng.

### Lịch sử và nhánh

```json
{
  "id": "no_mot_mua_toc_bac",
  "part": "4",
  "waitHours": 1440,
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
