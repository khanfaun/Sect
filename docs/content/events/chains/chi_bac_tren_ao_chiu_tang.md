# content/events/chains/chi_bac_tren_ao_chiu_tang.json

Nguồn chuẩn: `content/events/chains/chi_bac_tren_ao_chiu_tang.json`. Bản đọc tự sinh. Cú pháp: xem [guideline](../../GUIDELINE.md).

<a id="ch_chi_bac_tren_ao_chiu_tang_1"></a>
## Mặt trong áo trắng — `ch_chi_bac_tren_ao_chiu_tang_1`

- Loại: story; nguồn: Khám phá; chủ đề: Hai phái; cảm xúc: Xót xa.
- Nơi: núi non, sơn môn.
- Điều kiện: tầng 1; chuỗi chi_bac_tren_ao_chiu_tang / phần 1; một lần/kiếp.
- Bối cảnh tác giả: Dốc đưa tang ở Linh Sơn Vạn Lĩnh.
- Vai: `{"a":{"gender":"nu","role":"Nữ đệ tử","alignment":"context"},"b":{"gender":"nam","role":"đệ tử","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Nữ đệ tử {$a.ten} may một sợi chỉ bạc của đệ tử {$b.ten} dưới cổ áo tang sư phụ. Hai phái đang có hiềm khích, người coi lễ xét cả đồ của khách. Sợi chỉ lộ ra khi nàng cúi chào, người gác lập tức gọi lại.

### Lựa chọn

- **1. Nhận cuộn chỉ là của ngươi**
  Hai phái bỏ qua. {$a.ten} luồn phần chỉ đã lộ vào một vết rách phía trong.
  - `e`: `{"hd":{"p":3},"ng":{"g":3},"an":["a","mặt trong áo trắng"]}`
- **2. Để họ xem cổ áo**
  Ngươi được coi là giữ lễ. {$a.ten} tự tháo chỉ, còn {$b.ten} đứng nhìn đến hết nút cuối.
  - `e`: `{"hd":{"t":1}}`
- **3. Bỏ đi**
  Chiếc áo đi qua cửa. Một đoạn chỉ mắc vào then.

### Lịch sử và nhánh

```json
{
  "id": "chi_bac_tren_ao_chiu_tang",
  "part": "1",
  "waitHours": 0,
  "needs": [],
  "paths": null
}
```

<a id="ch_chi_bac_tren_ao_chiu_tang_2"></a>
## Hẹn ở vườn mai — `ch_chi_bac_tren_ao_chiu_tang_2`

- Loại: story; nguồn: Khám phá; chủ đề: Lời hẹn; cảm xúc: Lãng mạn.
- Nơi: núi non, sơn môn.
- Điều kiện: tầng 1, 2, 3, 4; xuan; chuỗi chi_bac_tren_ao_chiu_tang / phần 2; chờ ≥ 4320 giờ; một lần/kiếp.
- Bối cảnh tác giả: Vườn mai ở Linh Sơn Vạn Lĩnh.
- Vai: `{"a":{"gender":"nu","role":"Đệ tử","alignment":"context"},"b":{"gender":"nam","role":"đệ tử","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Đệ tử {$a.ten} đem áo tới để đệ tử {$b.ten} khâu lại. Dưới đất đã trải một mảnh vải khô đủ chỗ cho hai người quỳ.

### Lựa chọn

- **1. Cho họ dùng nhà mái kín qua một buổi**
  Ngươi cho họ mượn gian nhà một buổi, chịu lời trách vì đưa người ngoại phái vào. Lúc trả chìa, họ nói đã bàn xong chuyện tự xin ra ngoài làm việc chung; lần sau sẽ không phải lén gặp nữa.
  - `e`: `{"hd":{"p":3},"ng":{"g":3},"an":["a","hẹn ở vườn mai"]}`
- **2. Nhờ họ trao đổi tin hai phái để trả ơn**
  Ngươi có tin đổi người giữ đèo. Họ gói tin trong hai mảnh vải, mỗi mảnh lấy từ một đầu áo.
  - `e`: `{"hd":{"t":1},"st":10}`
- **3. Bỏ đi**
  Mưa bụi bắt đầu, {$b.ten} lấy vai che chỗ kim đang xỏ.

### Lịch sử và nhánh

```json
{
  "id": "chi_bac_tren_ao_chiu_tang",
  "part": "2",
  "waitHours": 4320,
  "needs": [
    0
  ],
  "paths": null
}
```

<a id="ch_chi_bac_tren_ao_chiu_tang_2b"></a>
## Chiếc kim trả lại — `ch_chi_bac_tren_ao_chiu_tang_2b`

- Loại: story; nguồn: Khám phá; chủ đề: Xa cách; cảm xúc: Bi thương.
- Nơi: sơn môn.
- Điều kiện: tầng 1, 2, 3, 4; xuan; chuỗi chi_bac_tren_ao_chiu_tang / phần 2b; chờ ≥ 4320 giờ; một lần/kiếp.
- Bối cảnh tác giả: Cửa phát đồ vải ở Linh Sơn Vạn Lĩnh.
- Vai: `{"a":{"gender":"nu","role":"Đệ tử","alignment":"context"},"b":{"gender":"nam","role":"Đệ tử","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Đệ tử {$b.ten} trả chiếc kim bị thu cùng cuộn chỉ. Đệ tử {$a.ten} nhận bằng tay áo kéo kín, vạt áo tang đã được thay bằng một màu trắng khác.

### Lựa chọn

- **1. Đứng tên cho hai người nhận chung một việc ngoài núi**
  Ngươi đứng tên xin cho họ cùng nhận một việc ngoài núi, nhận trách nhiệm nếu về trễ. Họ hẹn nhau ngay trước cửa phát áo mưa, lần này không giấu người đang nhìn.
  - `e`: `{"hd":{"p":3},"ng":{"g":3},"an":["a","chiếc kim trả lại"]}`
- **2. Đổi việc ấy lấy phần thưởng cho mình**
  Ngươi được trả công giới thiệu. Hai người đi hai lượt khác nhau, chiếc kim nằm nguyên trong khe cửa.
  - `e`: `{"st":12,"deed":"lua_loi"}`
- **3. Bỏ đi**
  {$b.ten} quay lại một lần. Bên kia cửa chỉ còn vết kim hằn trên bụi.

### Lịch sử và nhánh

```json
{
  "id": "chi_bac_tren_ao_chiu_tang",
  "part": "2b",
  "waitHours": 4320,
  "needs": [
    1
  ],
  "paths": null
}
```

<a id="ch_chi_bac_tren_ao_chiu_tang_3"></a>
## Người đứng ở đèo — `ch_chi_bac_tren_ao_chiu_tang_3`

- Loại: story; nguồn: Khám phá; chủ đề: Tranh chấp tông môn; cảm xúc: Căng thẳng.
- Nơi: núi non, sơn môn.
- Điều kiện: tầng 1, 2, 3, 4; chuỗi chi_bac_tren_ao_chiu_tang / phần 3; chờ ≥ 2160 giờ; một lần/kiếp.
- Bối cảnh tác giả: Đèo ở Linh Sơn Vạn Lĩnh.
- Vai: `{"a":{"gender":"nu","role":"story_person","alignment":"context"},"b":{"gender":"nam","role":"story_person","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Hai phái đóng đèo giữa lúc dân chở vải lên. Nếu ngươi từng mở chỗ gặp, hai đệ tử đến cùng nhau. Nếu ngươi từng lấy tin hoặc tiền thưởng, họ đến từ hai đầu đèo, mỗi người cầm một lệnh riêng.

### Lựa chọn

- **1. Bảo lãnh cho cả hai cùng mở lối**
  Ngươi bảo lãnh cho họ mở đèo, chịu bị một phái thu lại quyền ra vào vì trái lệnh giữ đường. Dân chở vải qua được trước mưa. Hai đệ tử ở lại nhận lỗi cùng nhau, không để một người chịu thay.
  - `e`: `{"hd":{"p":3},"ng":{"g":3}}`
- **2. Bán lệnh đi qua cho người chịu trả**
  Ngươi có lời, họ phải chia lượt canh. Một người ôm chồng vải của khách không đủ tiền cho tới khi trời tối.
  - `e`: `{"st":18,"deed":"lua_loi"}`
- **3. Bỏ đi**
  Vải nằm giữa đèo gặp mưa. Hai người ở hai đầu đều lấy áo ra che.

### Lịch sử và nhánh

```json
{
  "id": "chi_bac_tren_ao_chiu_tang",
  "part": "3",
  "waitHours": 2160,
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

<a id="ch_chi_bac_tren_ao_chiu_tang_4"></a>
## Màu chỉ sau giặt — `ch_chi_bac_tren_ao_chiu_tang_4`

- Loại: story; nguồn: Khám phá; chủ đề: Chọn đường tu; cảm xúc: Lãng mạn.
- Nơi: núi non, sơn môn.
- Điều kiện: tầng 1, 2, 3, 4; chuỗi chi_bac_tren_ao_chiu_tang / phần 4; chờ ≥ 8640 giờ; một lần/kiếp.
- Bối cảnh tác giả: Xóm dệt ở Linh Sơn Vạn Lĩnh.
- Vai: `{"a":{"gender":"nu","role":"story_person","alignment":"context"},"b":{"gender":"nam","role":"story_person","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Nếu lối từng mở cho mọi người, hai đệ tử đã rời phái và cùng giữ đường vải. Nếu lệnh qua từng được bán, họ vẫn giữ hai bậc gác, lâu lâu cùng đem áo xuống giặt.

### Lựa chọn

- **1. Trả lại tiền lệnh hoặc góp vải mở nhà trú đèo**
  Người gánh vải có chỗ nghỉ, hai người đặt chung một hòm kim. Nắp hòm để mở, bên trong có sợi chỉ bạc đã xỉn.
  - `cost`: `{"st":13}`
  - `e`: `{"hd":{"p":3},"ng":{"g":3}}`
- **2. Đặt họ làm áo hộ thân cho ngươi**
  Ngươi có áo chịu gió kiếm, họ có tiền sống qua mùa. Phần chỉ bạc cuối dùng để viền một chiếc túi nhỏ bên trong.
  - `cost`: `{"st":13}`
  - `e`: `{"namedRelic":{"k":"bao","name":"Áo Chỉ Bạc","lore":"Ngươi có áo chịu gió kiếm, họ có tiền sống qua mùa. Phần chỉ bạc cuối dùng để viền một chiếc túi nhỏ bên trong."}}`
- **3. Bỏ đi**
  Hai người hỏi đường ngươi sắp đi, dặn đèo phía bắc còn đóng. Ngươi cảm tạ rồi từ biệt, để họ thu nốt áo trước mưa.

### Lịch sử và nhánh

```json
{
  "id": "chi_bac_tren_ao_chiu_tang",
  "part": "4",
  "waitHours": 8640,
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
