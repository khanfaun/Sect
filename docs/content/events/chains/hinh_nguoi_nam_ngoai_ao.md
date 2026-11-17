# content/events/chains/hinh_nguoi_nam_ngoai_ao.json

Nguồn chuẩn: `content/events/chains/hinh_nguoi_nam_ngoai_ao.json`. Bản đọc tự sinh. Cú pháp: xem [guideline](../../GUIDELINE.md).

<a id="ch_hinh_nguoi_nam_ngoai_ao_1"></a>
## Chiếc áo đi tìm vai — `ch_hinh_nguoi_nam_ngoai_ao_1`

- Loại: story; nguồn: Khám phá; chủ đề: Thiên ma; cảm xúc: Bất an.
- Nơi: thiên lộ.
- Điều kiện: tầng 4; chuỗi hinh_nguoi_nam_ngoai_ao / phần 1; một lần/kiếp.
- Bối cảnh tác giả: Nơi phát áo ở Cửu Thiên Cổ Lộ.
- Vai: `{"a":{"gender":"nam","role":"Thiên ma","alignment":"context"},"b":{"gender":"nam","role":"Người coi cửa","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Thiên ma {$a.ten} muốn học dáng người để qua cửa. Người coi cửa {$b.ten} cho xem chiếc áo cũ: ai mặc vào sẽ mang hình vai và dáng bước của chủ đã mất. Hắn nhìn áo rồi hỏi có cách nào qua cửa mà vẫn giữ dáng của mình không.

### Lựa chọn

- **1. Mua cho hắn áo mới để tự học dáng đi**
  Ngươi mua một chiếc áo vừa vai hắn, để người coi cửa dạy từng bước. Hắn đi chậm, vạt áo chưa chịu nằm yên, nhưng bóng đã là của riêng mình.
  - `cost`: `{"st":22}`
  - `e`: `{"karma":4,"an":["a","chiếc áo đi tìm vai"]}`
- **2. Thuê hắn mặc áo của người đã mất**
  Ngươi được mở cửa một lần theo tên cũ. Hắn cúi chào, cổ áo chậm một nhịp mới hạ xuống.
  - `cost`: `{"st":22}`
  - `e`: `{"karma":-1,"tamma":2}`
- **3. Bỏ đi**
  Ngươi để hắn tự quyết. Hắn xin người coi cửa cho thử đi không mặc áo cũ trước, chưa muốn mượn hình người khác.

### Lịch sử và nhánh

```json
{
  "id": "hinh_nguoi_nam_ngoai_ao",
  "part": "1",
  "waitHours": 0,
  "needs": [],
  "paths": null
}
```

<a id="ch_hinh_nguoi_nam_ngoai_ao_2"></a>
## Học cách ngồi im — `ch_hinh_nguoi_nam_ngoai_ao_2`

- Loại: story; nguồn: Khám phá; chủ đề: Thiên ma học làm khách; cảm xúc: Hài hước.
- Nơi: thiên lộ.
- Điều kiện: tầng 4; chuỗi hinh_nguoi_nam_ngoai_ao / phần 2; chờ ≥ 2160 giờ; một lần/kiếp.
- Bối cảnh tác giả: Phòng chờ ở Cửu Thiên Cổ Lộ.
- Vai: `{"a":{"gender":"nam","role":"Thiên ma","alignment":"context"},"b":{"gender":"nam","role":"Người coi cửa","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Thiên ma {$a.ten} học ngồi im nhưng chỉ giữ được nửa người, vạt áo kia liên tục đứng dậy. Người coi cửa {$b.ten} kê thêm một ghế để nó có chỗ ngồi riêng.

### Lựa chọn

- **1. Dạy hắn ngồi theo dáng của chính hắn**
  Ngươi dạy hắn tự tìm thế ngồi vững, không cần bắt chước dáng ai. Hắn thử vài lần mới được, vui đến mức đứng bật dậy khoe. Ngươi phải nhắc bài hôm nay là ngồi im.
  - `e`: `{"karma":4,"tv":4}`
- **2. Dạy hắn giả dáng một khách quen**
  Hắn dẫn ngươi qua cửa hẹp. Khi được chào bằng tên người kia, hắn mất một lúc mới nhớ cúi đầu.
  - `e`: `{"karma":-1}`
- **3. Bỏ đi**
  Vạt áo đứng lên lần nữa. Hắn ngồi nhìn nó với vẻ rất kiên nhẫn.

### Lịch sử và nhánh

```json
{
  "id": "hinh_nguoi_nam_ngoai_ao",
  "part": "2",
  "waitHours": 2160,
  "needs": [
    0
  ],
  "paths": null
}
```

<a id="ch_hinh_nguoi_nam_ngoai_ao_2b"></a>
## Nhà có một người ngồi nhầm — `ch_hinh_nguoi_nam_ngoai_ao_2b`

- Loại: story; nguồn: Khám phá; chủ đề: Chuyện nhận nhầm; cảm xúc: Bi thương.
- Nơi: thiên lộ.
- Điều kiện: tầng 4; chuỗi hinh_nguoi_nam_ngoai_ao / phần 2b; chờ ≥ 2160 giờ; một lần/kiếp.
- Bối cảnh tác giả: Mái gặp ở Cửu Thiên Cổ Lộ.
- Vai: `{"a":{"gender":"nam","role":"Thiên ma","alignment":"context"},"b":{"gender":"nam","role":"story_person","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Một người nhận thiên ma {$a.ten} là anh đã mất. Hắn biết chiếc áo đang dẫn tay mình ôm lại, nhưng vẫn hỏi ngươi có nên đưa tay ra hay không.

### Lựa chọn

- **1. Kể cho người ấy nghe chiếc áo đã mượn từ đâu**
  Ngươi kể rõ áo thuộc về ai, người đang mặc là ai. Người ấy im lặng rồi xin giữ lại áo cũ, mời thiên ma ngồi bên như một vị khách. Hắn lần đầu được hỏi chính mình muốn ăn gì.
  - `e`: `{"karma":4,"an":["a","nhà có một người ngồi nhầm"]}`
- **2. Để hắn ở lại qua một bữa cơm**
  Người ấy có một bữa với dáng người quen. {$a.ten} trả áo muộn, vạt áo vương mùi cơm mới.
  - `e`: `{"karma":1}`
- **3. Bỏ đi**
  Người ấy bưng thêm một bát. Hắn giữ hai tay trong tay áo.

### Lịch sử và nhánh

```json
{
  "id": "hinh_nguoi_nam_ngoai_ao",
  "part": "2b",
  "waitHours": 2160,
  "needs": [
    1
  ],
  "paths": null
}
```

<a id="ch_hinh_nguoi_nam_ngoai_ao_3"></a>
## Tấm áo chọn người — `ch_hinh_nguoi_nam_ngoai_ao_3`

- Loại: story; nguồn: Khám phá; chủ đề: Danh phận; cảm xúc: Căng thẳng.
- Nơi: thiên lộ.
- Điều kiện: tầng 4; chuỗi hinh_nguoi_nam_ngoai_ao / phần 3; chờ ≥ 8640 giờ; một lần/kiếp.
- Bối cảnh tác giả: Ngưỡng cửa ở Cửu Thiên Cổ Lộ.
- Vai: `{"a":{"gender":"nam","role":"story_person","alignment":"context"},"b":{"gender":"nam","role":"Người coi cửa","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Cửa soi bóng để nhận khách, không chỉ nhìn hình áo. Nếu thiên ma từng học ngồi theo dáng mình hoặc được nói rõ thân phận, hắn đứng ra khỏi chiếc áo, tự xin qua. Nếu hắn vẫn quen mượn dáng người khác, hắn tìm lại nếp áo cũ, sợ bị gọi đúng tên mình. Người coi cửa cho cả hai một lượt thử.

### Lựa chọn

- **1. Đặt tên hắn dưới chính cái bóng ấy**
  Ngươi đứng ra xác nhận tên riêng của hắn, bỏ cách mượn tên cũ qua cửa. Cửa nhận bóng, cho hắn đi dù hai vai còn lệch. Hắn quay lại tự xưng tên một lần nữa, lần này không hỏi ngươi đã đúng chưa.
  - `e`: `{"karma":4}`
- **2. Dùng chiếc áo để cả hai qua nhanh**
  Ngươi tiết kiệm một lượt chờ. Bên kia cửa, hắn phải cởi áo mới nghe được giọng mình.
  - `e`: `{"karma":-2}`
- **3. Bỏ đi**
  Người coi cửa {$b.ten} chừa cửa hé. Hắn nhìn qua khe, tay vẫn đặt ở cổ áo.

### Lịch sử và nhánh

```json
{
  "id": "hinh_nguoi_nam_ngoai_ao",
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

<a id="ch_hinh_nguoi_nam_ngoai_ao_4"></a>
## Một cái móc thấp hơn — `ch_hinh_nguoi_nam_ngoai_ao_4`

- Loại: story; nguồn: Khám phá; chủ đề: Danh phận; cảm xúc: Ấm áp.
- Nơi: thiên lộ.
- Điều kiện: tầng 4; chuỗi hinh_nguoi_nam_ngoai_ao / phần 4; chờ ≥ 25920 giờ; một lần/kiếp.
- Bối cảnh tác giả: Nhà giữ áo ở Cửu Thiên Cổ Lộ.
- Vai: `{"a":{"gender":"nam","role":"thiên ma","alignment":"context"},"b":{"gender":"nam","role":"story_person","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Nếu từng qua bằng tên mình, thiên ma {$a.ten} trông áo cho khách. Nếu từng qua nhờ áo, hắn làm việc ở mép cửa và tháo áo mỗi lúc có người gọi một cái tên cũ.

### Lựa chọn

- **1. Góp gỗ làm chỗ treo áo cho khách**
  Ngươi mua gỗ giúp hắn đóng thêm móc cho khách tự treo đồ. Hắn làm đủ cao thấp, giải thích có người không thích mượn hình vai của ai khác. Người coi cửa nghe xong, cười bảo hắn đã hiểu nghề.
  - `cost`: `{"st":22}`
  - `e`: `{"karma":4,"an":["a","một cái móc thấp hơn"]}`
- **2. Đặt hắn làm một chiếc áo mở lối**
  Ngươi được áo tốt, hắn có tiền sửa nhà. Trước khi trao, hắn gỡ sạch hình vai cũ khỏi lớp lót.
  - `cost`: `{"st":22}`
  - `e`: `{"namedRelic":{"k":"bao","name":"Áo Mở Lối","lore":"Ngươi được áo tốt, hắn có tiền sửa nhà. Trước khi trao, hắn gỡ sạch hình vai cũ khỏi lớp lót."}}`
- **3. Bỏ đi**
  Hắn tự gọi tên mình chào ngươi. Ngươi đáp lại rồi qua cửa, không cần mượn chiếc áo nào.

### Lịch sử và nhánh

```json
{
  "id": "hinh_nguoi_nam_ngoai_ao",
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
