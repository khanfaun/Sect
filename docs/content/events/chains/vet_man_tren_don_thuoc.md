# content/events/chains/vet_man_tren_don_thuoc.json

Nguồn chuẩn: `content/events/chains/vet_man_tren_don_thuoc.json`. Bản đọc tự sinh. Cú pháp: xem [guideline](../../GUIDELINE.md).

<a id="ch_vet_man_tren_don_thuoc_1"></a>
## Tay nếm muối — `ch_vet_man_tren_don_thuoc_1`

- Loại: story; nguồn: Khám phá; chủ đề: Sinh kế; cảm xúc: Bất an.
- Nơi: thành trì, thôn trấn.
- Điều kiện: tầng 2; chuỗi vet_man_tren_don_thuoc / phần 1; một lần/kiếp.
- Bối cảnh tác giả: Nhà chứa muối ở Đông Hải Yêu Vực.
- Vai: `{"a":{"gender":"nam","role":"Diêm dân","alignment":"context"},"b":{"gender":"nam","role":"Chủ ruộng","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Diêm dân {$a.ten} nếm muối mà chỉ thấy vị sắt. Chủ ruộng {$b.ten} nhờ ngươi xác nhận mẻ hàng tốt, hạt muối trên tay hắn có một chấm xám ở giữa.

### Lựa chọn

- **1. Giữ mẻ muối lại để xét nước**
  Ngươi yêu cầu giữ mẻ muối, ở lại cùng diêm dân xem nguồn nước. Chủ ruộng giục giao hàng, ngươi không ký xác nhận. Người mua đành chờ kết quả thay vì mang muối lạ về bán.
  - `e`: `{"hd":{"p":3},"ng":{"g":3}}`
- **2. Cho bán và lấy tiền hoa hồng**
  Ngươi có bạc. {$a.ten} dùng nước rửa tay ba lần, chấm xám vẫn còn dưới móng.
  - `e`: `{"st":22,"deed":"lua_loi","tamma":3}`
- **3. Bỏ đi**
  Thúng muối được nâng lên, một nhúm xám rơi ra sau chót.

### Lịch sử và nhánh

```json
{
  "id": "vet_man_tren_don_thuoc",
  "part": "1",
  "waitHours": 0,
  "needs": [],
  "paths": null
}
```

<a id="ch_vet_man_tren_don_thuoc_2"></a>
## Chum đứng ở đầu dòng — `ch_vet_man_tren_don_thuoc_2`

- Loại: story; nguồn: Khám phá; chủ đề: Ô uế biển; cảm xúc: Căng thẳng.
- Nơi: biển khơi.
- Điều kiện: tầng 2, 3, 4; chuỗi vet_man_tren_don_thuoc / phần 2; chờ ≥ 504 giờ; một lần/kiếp.
- Bối cảnh tác giả: Trạm nước ở Đông Hải Yêu Vực.
- Vai: `{"a":{"gender":"nam","role":"Diêm dân","alignment":"context"},"b":{"gender":"nam","role":"Chủ ruộng","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Diêm dân {$a.ten} tìm thấy nước rửa quặng chảy vào ruộng qua chum lắng. Chủ ruộng {$b.ten} đặt nắp mới lên chum, vệt xám đã lên tới miệng.

### Lựa chọn

- **1. Góp tiền dẫn dòng rửa quặng sang bể kín**
  Ngươi góp tiền xây bể kín nhận nước rửa quặng, tách hẳn khỏi dòng vào ruộng muối. Thợ thử nước xong mới tháo ván chặn. Diêm dân nhờ thầy thuốc kiểm thêm mẻ muối sau, chưa dám đem bán ngay.
  - `cost`: `{"st":16}`
  - `e`: `{"hd":{"p":3},"ng":{"g":3}}`
- **2. Bán tung tích cho người tranh ruộng với chủ**
  Ngươi có bạc và ruộng bị đóng. Dân tới xin việc đứng bên chum đã cạn.
  - `e`: `{"st":22,"deed":"lua_loi"}`
- **3. Bỏ đi**
  {$a.ten} rút nắp. Nước bên trong trong đến thấy đáy, cặn xám bám cả thành.

### Lịch sử và nhánh

```json
{
  "id": "vet_man_tren_don_thuoc",
  "part": "2",
  "waitHours": 504,
  "needs": [
    0
  ],
  "paths": null
}
```

<a id="ch_vet_man_tren_don_thuoc_2b"></a>
## Đầu lưỡi ngậm sắt — `ch_vet_man_tren_don_thuoc_2b`

- Loại: story; nguồn: Khám phá; chủ đề: Bệnh nghề; cảm xúc: Day dứt.
- Nơi: thành trì, thôn trấn.
- Điều kiện: tầng 2, 3, 4; chuỗi vet_man_tren_don_thuoc / phần 2b; chờ ≥ 504 giờ; một lần/kiếp.
- Bối cảnh tác giả: Nhà thuốc ở Đông Hải Yêu Vực.
- Vai: `{"a":{"gender":"nam","role":"Diêm dân","alignment":"context"},"b":{"gender":"nam","role":"Chủ ruộng","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Diêm dân {$a.ten} đưa đơn thuốc có chữ nhòe. Người mua muối xếp hàng ngoài cửa, mỗi người cầm một cái bát để thử xem còn nếm được nước thuốc.

### Lựa chọn

- **1. Dùng tiền hoa hồng bù phí thuốc**
  Ngươi đem tiền hoa hồng trả phí thuốc, để thầy thuốc ghi rõ nguồn muối vào đơn. Người bệnh nhẹ dần, nhưng vẫn còn người chưa trở lại làm được. Diêm dân nhờ ngươi cùng họ đòi xét nguồn nước.
  - `cost`: `{"st":16}`
  - `e`: `{"hd":{"p":3},"ng":{"g":3}}`
- **2. Mua hết đơn có nhắc mẻ muối**
  Chủ ruộng {$b.ten} trả ngươi khoản lớn hơn. Người xếp cuối cầm bát đi hỏi tên thuốc.
  - `cost`: `{"st":16}`
  - `e`: `{"st":40,"hd":{"t":3},"ng":{"b":8,"tn":"tiep_tay"},"tamma":4}`
  - `accounting`: `{"mode":"buy-and-sell","capital":16,"profit":24}`
- **3. Bỏ đi**
  {$a.ten} liếm mép bát rồi đậy nắp. Nước thuốc vẫn còn nguyên.

### Lịch sử và nhánh

```json
{
  "id": "vet_man_tren_don_thuoc",
  "part": "2b",
  "waitHours": 504,
  "needs": [
    1
  ],
  "paths": null
}
```

<a id="ch_vet_man_tren_don_thuoc_3"></a>
## Ô ruộng giữ nước riêng — `ch_vet_man_tren_don_thuoc_3`

- Loại: story; nguồn: Khám phá; chủ đề: Sinh kế; cảm xúc: Căng thẳng.
- Nơi: biển khơi.
- Điều kiện: tầng 2, 3, 4; chuỗi vet_man_tren_don_thuoc / phần 3; chờ ≥ 4320 giờ; một lần/kiếp.
- Bối cảnh tác giả: Bờ dẫn nước ở Đông Hải Yêu Vực.
- Vai: `{"a":{"gender":"nam","role":"story_person","alignment":"context"},"b":{"gender":"nam","role":"chủ ruộng","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Nếu nước từng được dẫn đi hoặc thuốc có ghi nguồn, dân đã tụ lại đòi một dòng sạch. Nếu ngươi từng bán tin hoặc mua đơn, chủ ruộng {$b.ten} đòi ngươi chứng một mẻ mới trước khi mở lại.

### Lựa chọn

- **1. Chia dòng sạch cho từng ô dân góp công**
  Ngươi trả phí dựng bờ, chia nước sạch theo phần ruộng và công dân đã góp. Mẻ đầu ít vì phải rửa lại nền, nhưng không còn vị sắt. Mọi người thống nhất chưa đem bán cho tới khi thử thêm một mẻ.
  - `cost`: `{"st":16}`
  - `e`: `{"hd":{"p":3},"ng":{"g":3}}`
- **2. Dành nước sạch cho một ô bán đắt**
  Ngươi có lời và đủ tiền mua thuốc cho người làm ô ấy. Các ô bên cạnh chỉ phơi được bùn.
  - `e`: `{"st":22,"deed":"lua_loi"}`
- **3. Bỏ đi**
  Nước lên trong mương, chảy tới chỗ tấm ván chắn rồi quay ngược.

### Lịch sử và nhánh

```json
{
  "id": "vet_man_tren_don_thuoc",
  "part": "3",
  "waitHours": 4320,
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

<a id="ch_vet_man_tren_don_thuoc_4"></a>
## Muối chia bằng tay — `ch_vet_man_tren_don_thuoc_4`

- Loại: story; nguồn: Khám phá; chủ đề: Trả nợ cũ; cảm xúc: Lắng dịu.
- Nơi: thành trì, thôn trấn.
- Điều kiện: tầng 2, 3, 4; chuỗi vet_man_tren_don_thuoc / phần 4; chờ ≥ 8640 giờ; một lần/kiếp.
- Bối cảnh tác giả: Sân chia muối ở Đông Hải Yêu Vực.
- Vai: `{"a":{"gender":"nam","role":"Diêm dân","alignment":"context"},"b":{"gender":"nam","role":"story_person","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Nếu nước đã chia, dân mang nắm đầu mùa tới bỏ chung vào rổ. Nếu chỉ một ô sạch, diêm dân {$a.ten} đem bát thuốc đã rửa tới đong phần muối mình được mua.

### Lựa chọn

- **1. Để dân giữ quyền coi mương**
  Ngươi nhường phần lợi lâu dài. {$a.ten} dùng bát thuốc múc một bát cho người cuối hàng.
  - `e`: `{"hd":{"p":3},"ng":{"g":3}}`
- **2. Giữ quyền bán và trả đủ tiền chữa bệnh**
  Người đã bệnh nhận được bạc, ô sạch vẫn thuộc ngươi. Dưới đáy rổ xuất hiện một vệt trắng rất mỏng.
  - `cost`: `{"st":16}`
  - `e`: `{"hd":{"p":1},"ng":{"g":1}}`
- **3. Bỏ đi**
  Ngươi chào người coi mương rồi đi. Trên sân, dân đang tranh luận giá muối vụ mới, lần này không phải xếp hàng đợi phát thuốc.

### Lịch sử và nhánh

```json
{
  "id": "vet_man_tren_don_thuoc",
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
