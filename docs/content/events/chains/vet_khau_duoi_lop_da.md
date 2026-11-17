# content/events/chains/vet_khau_duoi_lop_da.json

Nguồn chuẩn: `content/events/chains/vet_khau_duoi_lop_da.json`. Bản đọc tự sinh. Cú pháp: xem [guideline](../../GUIDELINE.md).

<a id="ch_vet_khau_duoi_lop_da_1"></a>
## Mũi chỉ bắt đầu từ đâu — `ch_vet_khau_duoi_lop_da_1`

- Loại: story; nguồn: Khám phá; chủ đề: Luyện thi; cảm xúc: Bất an.
- Nơi: ma địa.
- Điều kiện: tầng 3; chuỗi vet_khau_duoi_lop_da / phần 1; một lần/kiếp.
- Bối cảnh tác giả: Bàn khâu ở Cửu U Ma Vực.
- Vai: `{"a":{"gender":"nam","role":"người luyện thi","alignment":"context"},"b":{"gender":"nam","role":"Người em","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Trước lúc khép lò, người luyện thi {$a.ten} thấy một mũi kim chọc từ trong ngực xác ra ngoài. Người em {$b.ten} nhận ra cách cầm kim của người anh đã chết, xin lão dừng tay. Người luyện thi hỏi ai sẽ trả tiền phôi nếu bỏ mẻ này.

### Lựa chọn

- **1. Ngừng luyện và giữ kim để hỏi**
  Ngươi bù phí phôi. Mũi chỉ tự rút một nửa rồi dừng.
  - `cost`: `{"st":19}`
  - `e`: `{"karma":4,"tamma":-3}`
- **2. Cho luyện tiếp để đổi bí quyết**
  Ngươi có khẩu quyết giữ thi. {$b.ten} đem theo cái kim mà không ai nghĩ tới việc đòi lại.
  - `e`: `{"karma":-3,"tamma":4,"skill":1}`
- **3. Bỏ đi**
  Lò khép. Ở mép nắp còn lòi ra một đầu chỉ.

### Lịch sử và nhánh

```json
{
  "id": "vet_khau_duoi_lop_da",
  "part": "1",
  "waitHours": 0,
  "needs": [],
  "paths": null
}
```

<a id="ch_vet_khau_duoi_lop_da_2"></a>
## Cái túi khâu phía trong — `ch_vet_khau_duoi_lop_da_2`

- Loại: story; nguồn: Khám phá; chủ đề: Luyện thi; cảm xúc: Kinh dị.
- Nơi: ma địa.
- Điều kiện: tầng 3, 4; chuỗi vet_khau_duoi_lop_da / phần 2; chờ ≥ 120 giờ; một lần/kiếp.
- Bối cảnh tác giả: Kho vải ở Cửu U Ma Vực.
- Vai: `{"a":{"gender":"nam","role":"story_person","alignment":"context"},"b":{"gender":"nam","role":"Người em","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Thi thể tự khâu một cái túi vào vải liệm. Người em {$b.ten} nhét thử hạt ngô vào. Đầu kia túi có người đẩy ra một nút áo cũ.

### Lựa chọn

- **1. Cho thi thể chọn vật mang theo**
  Ngươi giữ thi thức thêm một đêm, để nó tự chọn đồ mang theo. Nó bỏ hạt ngô ra, cất nút áo vào túi rồi khâu miệng túi lại. Người em nói đó là nút áo mẹ từng đơm cho anh.
  - `e`: `{"karma":4,"tamma":-3,"h":24}`
- **2. Dùng túi để chuyển linh vật qua vách**
  Ngươi lấy được một vật bị kẹt trong lò. Khi trở về, tay áo ngươi có thêm một đường chỉ ngược.
  - `e`: `{"karma":-2,"tamma":3,"item":"story_item_vet_khau_duoi_lop_da_2"}`
- **3. Bỏ đi**
  {$b.ten} sờ cái túi đến khi nút áo ấm lên.

### Lịch sử và nhánh

```json
{
  "id": "vet_khau_duoi_lop_da",
  "part": "2",
  "waitHours": 120,
  "needs": [
    0
  ],
  "paths": null
}
```

<a id="ch_vet_khau_duoi_lop_da_2b"></a>
## Vết kim quanh cổ — `ch_vet_khau_duoi_lop_da_2b`

- Loại: story; nguồn: Khám phá; chủ đề: Luyện thi; cảm xúc: Phẫn nộ.
- Nơi: ma địa.
- Điều kiện: tầng 3, 4; chuỗi vet_khau_duoi_lop_da / phần 2b; chờ ≥ 120 giờ; một lần/kiếp.
- Bối cảnh tác giả: Sân sai thi ở Cửu U Ma Vực.
- Vai: `{"a":{"gender":"nam","role":"story_person","alignment":"context"},"b":{"gender":"nam","role":"người em","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Thi thể vâng lệnh mọi người, riêng khi người em {$b.ten} gọi thì quay cổ ngược hướng. Vết chỉ trên gáy đã thành một vòng kín.

### Lựa chọn

- **1. Thuyết phục người luyện thi tháo phù chủ**
  Ngươi nhắc thi thể vẫn nhận ra người nhà, ở lại nói tới khi lão chịu tháo phù chủ. Nó quay đúng về phía người em, đưa tay đòi chiếc kim. Người em đứng im một lúc mới dám trao.
  - `e`: `{"karma":4}`
- **2. Mua quyền ra lệnh cho nó**
  Nó theo ngươi, đổi lại {$b.ten} xin được tự mang kim theo. Mỗi lúc nghỉ, nó ngồi quay mặt về phía tiếng kim chạm đá.
  - `cost`: `{"st":19}`
  - `e`: `{"karma":-4,"tamma":4}`
- **3. Bỏ đi**
  Người luyện thi gọi tiếp. Bàn chân thi thể quay trước, cổ quay sau.

### Lịch sử và nhánh

```json
{
  "id": "vet_khau_duoi_lop_da",
  "part": "2b",
  "waitHours": 120,
  "needs": [
    1
  ],
  "paths": null
}
```

<a id="ch_vet_khau_duoi_lop_da_3"></a>
## Đường chỉ qua mạch cốt — `ch_vet_khau_duoi_lop_da_3`

- Loại: story; nguồn: Khám phá; chủ đề: Giao đấu; cảm xúc: Căng thẳng.
- Nơi: ma địa, phế tích, hang động.
- Điều kiện: tầng 3, 4; chuỗi vet_khau_duoi_lop_da / phần 3; chờ ≥ 2160 giờ; một lần/kiếp.
- Bối cảnh tác giả: Hốc lưu cốt ở Cửu U Ma Vực.
- Vai: `{"a":{"gender":"nam","role":"người luyện thi","alignment":"context"},"b":{"gender":"nam","role":"story_person","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Thi thể khâu mình vào vách để khỏi bị mang đi. Nếu từng được lựa chọn, nó để lại một đầu chỉ cho em. Nếu từng bị sai khiến hoặc đem dùng, chỉ xuyên qua cổ tay, không chừa đầu.

### Lựa chọn

- **1. Cắt chỉ và chống thi trận của người luyện thi {$a.ten}**
  - `fight`: `{"k":"luyenthi","n":"{$a.ten}"}`
  - **Thắng trận**: Ngươi tháo trận, để thi thể tự rút những mũi chỉ cuối rồi chọn nơi nằm.
    `{"e":{"karma":4}}`
  - **Thua trận**: Thua, ngươi bị trận đánh bật, chỉ cắt được một vòng; người em phải giữ cổ tay còn mắc trong vách để nó không bị kéo sâu thêm.
- **2. Thương lượng để người luyện thi rút trận**
  Lão đồng ý rút trận nếu được giữ phần cốt dùng tụ linh khí. Người em nhận lời để cứu anh khỏi vách, nhưng bàn tay thi thể nhẹ đi rõ rệt. Nó vẫn giữ được chiếc kim.
  - `e`: `{"karma":1}`
- **3. Bỏ đi**
  Từng mũi chỉ chìm sâu, mặt đá khép lại ở chỗ sau cùng.

### Lịch sử và nhánh

```json
{
  "id": "vet_khau_duoi_lop_da",
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

<a id="ch_vet_khau_duoi_lop_da_4"></a>
## Kim nằm dưới gối đá — `ch_vet_khau_duoi_lop_da_4`

- Loại: story; nguồn: Khám phá; chủ đề: Chuyện anh em; cảm xúc: Bi thương.
- Nơi: ma địa, phế tích, hang động.
- Điều kiện: tầng 3, 4; chuỗi vet_khau_duoi_lop_da / phần 4; chờ ≥ 8640 giờ; một lần/kiếp.
- Bối cảnh tác giả: Dốc an táng ở Cửu U Ma Vực.
- Vai: `{"a":{"gender":"nam","role":"story_person","alignment":"context"},"b":{"gender":"nam","role":"Người em","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Nếu ngươi đã thắng thi trận, thi thể tự đi tới dốc an táng theo sau người em. Nếu ngươi từng thua trận, người em nhờ người tháo dần vòng chỉ còn lại rồi đưa anh tới đây. Nếu ngươi từng thương lượng rút trận, người em mang thi thể thiếu phần cốt tụ linh tới dốc. Nó đặt kim bên gối đá, chờ người em chọn chỗ chôn.

### Lựa chọn

- **1. Chôn cả kim lẫn phần cốt còn lại**
  Ngươi cùng người em chôn cả kim và bộ cốt, canh tới khi thi khí tan hết. Hắn kể xong chuyện nhà, xin ngươi để mình ở lại thêm một lúc.
  - `e`: `{"karma":4}`
- **2. Giữ kim để nhận ra thi thức còn sống**
  Ngươi có một vật thử thi. Người em {$b.ten} xin chỉ một đoạn chỉ, đủ quấn qua ngón tay.
  - `e`: `{"karma":-1,"item":"story_item_vet_khau_duoi_lop_da_4"}`
- **3. Bỏ đi**
  Ngươi lui ra khỏi dốc. Người em ngồi cạnh gối đá, kể tiếp câu chuyện đang dang dở.

### Lịch sử và nhánh

```json
{
  "id": "vet_khau_duoi_lop_da",
  "part": "4",
  "waitHours": 8640,
  "needs": [
    0,
    1
  ],
  "paths": [
    [
      "3:0:ok"
    ],
    [
      "3:0:no"
    ],
    [
      "3:1"
    ]
  ]
}
```
