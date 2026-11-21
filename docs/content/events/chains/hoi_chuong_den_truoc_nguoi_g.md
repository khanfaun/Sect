# content/events/chains/hoi_chuong_den_truoc_nguoi_g.json

Nguồn chuẩn: `content/events/chains/hoi_chuong_den_truoc_nguoi_g.json`. Bản đọc tự sinh. Cú pháp: xem [guideline](../../GUIDELINE.md).

<a id="ch_hoi_chuong_den_truoc_nguoi_g_1"></a>
## Tiếng chuông chưa có tay — `ch_hoi_chuong_den_truoc_nguoi_g_1`

- Loại: story; nguồn: Khám phá; chủ đề: Thời gian; cảm xúc: Bất an.
- Nơi: thiên lộ.
- Điều kiện: tầng 4; chuỗi hoi_chuong_den_truoc_nguoi_g / phần 1; một lần/kiếp.
- Bối cảnh tác giả: Lầu chuông ở Cửu Thiên Cổ Lộ.
- Vai: `{"a":{"gender":"nam","role":"người giữ chuông","alignment":"context"},"b":{"gender":"nam","role":"thợ cầu","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Chuông báo đổ cầu vang khi người giữ chuông {$a.ten} còn đứng cách dùi một sải. Dưới lầu, thợ cầu {$b.ten} ngẩng đầu, tay vẫn đặt trên cái chốt vừa đóng.

### Lựa chọn

- **1. Tin tiếng chuông và cho mọi người rời cầu**
  Ngươi cho người rời cầu, lỡ giờ qua cửa. Thợ cầu xuống kiểm tra, phát hiện chốt neo đã nứt. Hắn xin đóng cầu sửa ngay, không ai còn hỏi chuông vì sao tự kêu.
  - `e`: `{"deed":"cuu_nguoi"}`
- **2. Ép chuông im để đoàn qua trước**
  Người và hàng qua được. Một cái chốt bắn ra, rơi đúng chỗ {$a.ten} vừa đặt chân.
  - `e`: `{"hd":{"t":3},"ng":{"b":1},"tamma":3}`
- **3. Bỏ đi**
  Hồi chuông thứ hai vang nhỏ hơn, như có người đã kịp bịt một bên tai.

### Lịch sử và nhánh

```json
{
  "id": "hoi_chuong_den_truoc_nguoi_g",
  "part": "1",
  "waitHours": 0,
  "needs": [],
  "paths": null
}
```

<a id="ch_hoi_chuong_den_truoc_nguoi_g_2"></a>
## Hai vạch trên đồng hồ nước — `ch_hoi_chuong_den_truoc_nguoi_g_2`

- Loại: story; nguồn: Khám phá; chủ đề: Thời gian; cảm xúc: Căng thẳng.
- Nơi: thiên lộ.
- Điều kiện: tầng 4; chuỗi hoi_chuong_den_truoc_nguoi_g / phần 2; chờ ≥ 120 giờ; một lần/kiếp.
- Bối cảnh tác giả: Kho chốt ở Cửu Thiên Cổ Lộ.
- Vai: `{"a":{"gender":"nam","role":"story_person","alignment":"context"},"b":{"gender":"nam","role":"Thợ cầu","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Thợ cầu {$b.ten} nối chuông với một đồng hồ nước: khi chuông tự vang, hắn đánh dấu mực nước; lúc chốt bắt đầu trượt, hắn đánh dấu lần nữa. Hai vạch cho biết chuông báo sớm được bao lâu. Hắn chỉ chốt nứt vừa tháo, nói lần sau có thể không còn kịp như vậy.

### Lựa chọn

- **1. Giữ cầu đóng tới khi thay đủ chốt**
  Ngươi trả phí cho đoàn hàng ở lại, giữ cầu đóng tới khi thay đủ chốt. Sửa xong, thợ cho xe nhẹ thử trước rồi mới mở. Chiếc chốt nứt được giữ lại bên đồng hồ làm lời nhắc.
  - `cost`: `{"st":22}`
  - `e`: `{"hd":{"p":3},"ng":{"g":3}}`
- **2. Mua giờ báo trước để đi lối ngắn**
  Ngươi mua riêng một lượt theo dõi đồng hồ, kịp chọn đường ngắn trước khi cầu đóng. Người giữ chuông ghi tên từng người đã mua lượt; những người khác vẫn phải đợi tin ngoài cổng.
  - `cost`: `{"st":22}`
  - `e`: `{"hd":{"t":1}}`
- **3. Bỏ đi**
  Ngươi chọn đường vòng. Thợ cầu tiếp tục canh đồng hồ, chờ xem khoảng báo trước có thay đổi không.

### Lịch sử và nhánh

```json
{
  "id": "hoi_chuong_den_truoc_nguoi_g",
  "part": "2",
  "waitHours": 120,
  "needs": [
    0
  ],
  "paths": null
}
```

<a id="ch_hoi_chuong_den_truoc_nguoi_g_2b"></a>
## Người đến sau tiếng đổ — `ch_hoi_chuong_den_truoc_nguoi_g_2b`

- Loại: story; nguồn: Khám phá; chủ đề: Hậu quả; cảm xúc: Day dứt.
- Nơi: thiên lộ.
- Điều kiện: tầng 4; chuỗi hoi_chuong_den_truoc_nguoi_g / phần 2b; chờ ≥ 120 giờ; một lần/kiếp.
- Bối cảnh tác giả: Giàn hứng ván ở Cửu Thiên Cổ Lộ.
- Vai: `{"a":{"gender":"nam","role":"story_person","alignment":"context"},"b":{"gender":"nam","role":"Thợ cầu","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Một nhịp cầu đã đổ sau khi đoàn ngươi qua. Thợ cầu {$b.ten} ngồi nắn lại chiếc chốt cong, ở đầu giàn có một dấu chân dừng sát mép.

### Lựa chọn

- **1. Dùng phần tiền chuyến hàng sửa nhịp cầu**
  Ngươi góp tiền thuê thợ sửa lại nhịp đã đổ. Người đi sau được mở lối khi công việc xong, thợ cầu xin ghi cả ngày sập lẫn ngày sửa lên bảng để không ai quên.
  - `cost`: `{"st":22}`
  - `e`: `{"deed":"hanh_hiep"}`
- **2. Bán riêng tin chuông báo sập lần tới**
  Ngươi giữ chốt cong làm dấu đối chiếu với đồng hồ, bán riêng tin báo sớm cho khách đủ tiền. Những người còn lại phải đợi ngoài giàn. Người giữ chuông hỏi nếu lần tới nó gọi tên một người không trả tiền thì ngươi tính sao.
  - `e`: `{"st":30,"deed":"lua_loi"}`
- **3. Bỏ đi**
  {$b.ten} đặt chốt xuống rồi đổi sang tay còn lành.

### Lịch sử và nhánh

```json
{
  "id": "hoi_chuong_den_truoc_nguoi_g",
  "part": "2b",
  "waitHours": 120,
  "needs": [
    1
  ],
  "paths": null
}
```

<a id="ch_hoi_chuong_den_truoc_nguoi_g_3"></a>
## Hồi chuông gọi một người — `ch_hoi_chuong_den_truoc_nguoi_g_3`

- Loại: story; nguồn: Khám phá; chủ đề: Cứu người; cảm xúc: Căng thẳng.
- Nơi: thiên lộ.
- Điều kiện: tầng 4; chuỗi hoi_chuong_den_truoc_nguoi_g / phần 3; chờ ≥ 2160 giờ; một lần/kiếp.
- Bối cảnh tác giả: Mặt cầu ở Cửu Thiên Cổ Lộ.
- Vai: `{"a":{"gender":"nam","role":"Người giữ chuông","alignment":"context"},"b":{"gender":"nam","role":"thợ cầu","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Chuông báo thợ cầu {$b.ten} sẽ rơi, gọi đúng tên hắn. Nếu ngươi từng giữ cầu hoặc góp sửa, dân lập tức dừng chân. Nếu từng mua hay bán giờ báo, họ quay về phía ngươi hỏi còn bao lâu.

### Lựa chọn

- **1. Tự lên cầu giữ người rồi ra lệnh tháo nhịp**
  Ngươi lên cầu giữ thợ khỏi rơi, dùng một phần tu vi chống nhịp trong lúc mọi người rút đi. Người giữ chuông cho tháo cầu sau khi đủ người lên bờ. Ngươi bị thương, thợ cầu ở lại giúp dưỡng khí.
  - `e`: `{"deed":"cuu_nguoi_hy_sinh","hp":"-15%","tv":-4}`
- **2. Nhờ người giữ chuông {$a.ten} canh từng lượt qua**
  Người qua đủ, nhưng {$b.ten} gãy tay khi tự cắt dây. Hồi chuông dừng đúng lúc sợi dây chạm đá.
  - `e`: `{"hd":{"t":1}}`
- **3. Bỏ đi**
  Người giữ chuông {$a.ten} hạ dùi xuống, chuông vẫn gọi thêm một lần.

### Lịch sử và nhánh

```json
{
  "id": "hoi_chuong_den_truoc_nguoi_g",
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

<a id="ch_hoi_chuong_den_truoc_nguoi_g_4"></a>
## Gõ bằng bàn tay không — `ch_hoi_chuong_den_truoc_nguoi_g_4`

- Loại: story; nguồn: Khám phá; chủ đề: Trả giá; cảm xúc: Lắng dịu.
- Nơi: thiên lộ.
- Điều kiện: tầng 4; chuỗi hoi_chuong_den_truoc_nguoi_g / phần 4; chờ ≥ 8640 giờ; một lần/kiếp.
- Bối cảnh tác giả: Sân đúc ở Cửu Thiên Cổ Lộ.
- Vai: `{"a":{"gender":"nam","role":"Người giữ chuông","alignment":"context"},"b":{"gender":"nam","role":"thợ cầu","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Nếu nhịp đã tháo, người qua cầu góp đồng đúc chuông mới. Nếu mọi người qua theo lượt, thợ cầu {$b.ten} tới thử chuông bằng bàn tay còn cứng, mỗi lần gõ chỉ nhấc được hai ngón.

### Lựa chọn

- **1. Đúc chuông báo cho mọi đầu cầu**
  Ngươi góp tiền đúc chuông, yêu cầu người trông mỗi đầu cầu đều được biết cách nghe và báo. Thợ cầu thử tiếng đầu tiên, người bên kia đáp lại. Từ nay không phải mua riêng giờ báo trước mới được biết.
  - `cost`: `{"st":22}`
  - `e`: `{"hd":{"p":3},"ng":{"g":3}}`
- **2. Giữ tiếng báo sớm cho người trông cầu**
  Ngươi có một phần công coi đường. Người giữ chuông {$a.ten} bắt đầu học cách gọi tên người còn chưa nhìn thấy.
  - `e`: `{"st":30}`
- **3. Bỏ đi**
  Ngươi đi khi thợ cầu đang thử chuông. Lần này tay chạm đồng rồi tiếng mới vang, người quanh sân cùng thở phào.

### Lịch sử và nhánh

```json
{
  "id": "hoi_chuong_den_truoc_nguoi_g",
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
