# content/events/chains/vach_phan_tren_chuoi_kiem.json

Nguồn chuẩn: `content/events/chains/vach_phan_tren_chuoi_kiem.json`. Bản đọc tự sinh. Cú pháp: xem [guideline](../../GUIDELINE.md).

<a id="ch_vach_phan_tren_chuoi_kiem_1"></a>
## Kiếm cầm tay nào — `ch_vach_phan_tren_chuoi_kiem_1`

- Loại: story; nguồn: Khám phá; chủ đề: Kiếm tu; cảm xúc: Căng thẳng.
- Nơi: sơn môn.
- Điều kiện: tầng 1; chuỗi vach_phan_tren_chuoi_kiem / phần 1; một lần/kiếp.
- Bối cảnh tác giả: Hiên phát kiếm ở Linh Sơn Vạn Lĩnh.
- Vai: `{"a":{"gender":"nu","role":"Nữ kiếm đồ","alignment":"context"},"b":{"gender":"nam","role":"Kiếm sư","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Nữ kiếm đồ {$a.ten} xin một thanh kiếm thuận tay trái. Kiếm sư {$b.ten} dùng phấn đánh dấu tay phải lên chuôi, ngay chỗ ngón cái của nàng đặt hụt.

### Lựa chọn

- **1. Mua chuôi kiếm thuận tay trái**
  Ngươi mua chuôi phù hợp ở xưởng, để nàng thử lại cách cầm. Kiếm sư chưa chịu đổi bài dạy, nhưng nàng đã có thể đặt ngón tay đúng chỗ.
  - `cost`: `{"st":13}`
  - `e`: `{"hd":{"p":3},"ng":{"g":3},"an":["a","kiếm cầm tay nào"]}`
- **2. Khuyên nàng học đúng lối truyền trong tông**
  {$b.ten} cho ngươi dự buổi dạy riêng. Nàng chép thêm một dòng nhỏ ở cuối bài để nhớ đổi tay.
  - `e`: `{"tv":4}`
- **3. Bỏ đi**
  Nàng xin thầy cho thử cả hai tay rồi mới quyết. Ngươi rời hiên trong lúc hai người còn tranh luận.

### Lịch sử và nhánh

```json
{
  "id": "vach_phan_tren_chuoi_kiem",
  "part": "1",
  "waitHours": 0,
  "needs": [],
  "paths": null
}
```

<a id="ch_vach_phan_tren_chuoi_kiem_2"></a>
## Nét chéo trên vách — `ch_vach_phan_tren_chuoi_kiem_2`

- Loại: story; nguồn: Khám phá; chủ đề: Học kiếm; cảm xúc: Ấm áp.
- Nơi: sơn môn.
- Điều kiện: tầng 1, 2, 3, 4; chuỗi vach_phan_tren_chuoi_kiem / phần 2; chờ ≥ 2160 giờ; một lần/kiếp.
- Bối cảnh tác giả: Vách luyện kiếm ở Linh Sơn Vạn Lĩnh.
- Vai: `{"a":{"gender":"nu","role":"Nữ kiếm đồ","alignment":"context"},"b":{"gender":"nam","role":"story_person","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Nữ kiếm đồ {$a.ten} để lại một vết chéo mà tay phải khó đánh tới. Hai đệ tử đến xem, mỗi người tự cầm một que phấn.

### Lựa chọn

- **1. Giúp nàng dạy thế kiếm ấy**
  Ngươi dành một buổi giúp nàng chỉ thế kiếm cho hai đệ tử. Một người thuận tay phải phải đổi cách đứng mới làm được. Nàng cười: “Ta cũng đã học bài của các ngươi khó như thế.”
  - `e`: `{"hd":{"p":3},"ng":{"g":3},"an":["a","nét chéo trên vách"],"h":12}`
- **2. Mua riêng khẩu quyết của nàng**
  Nàng có bạc sửa kiếm. Vết chéo bị trát lại, lớp vôi mới khác màu đá.
  - `cost`: `{"st":13}`
  - `e`: `{"skill":1}`
- **3. Bỏ đi**
  Hai đệ tử rời vách, một que phấn đã được bẻ đôi.

### Lịch sử và nhánh

```json
{
  "id": "vach_phan_tren_chuoi_kiem",
  "part": "2",
  "waitHours": 2160,
  "needs": [
    0
  ],
  "paths": null
}
```

<a id="ch_vach_phan_tren_chuoi_kiem_2b"></a>
## Vết chai lệch — `ch_vach_phan_tren_chuoi_kiem_2b`

- Loại: story; nguồn: Khám phá; chủ đề: Học kiếm; cảm xúc: Day dứt.
- Nơi: sơn môn, thành trì.
- Điều kiện: tầng 1, 2, 3, 4; chuỗi vach_phan_tren_chuoi_kiem / phần 2b; chờ ≥ 2160 giờ; một lần/kiếp.
- Bối cảnh tác giả: Nhà ngâm tay ở Linh Sơn Vạn Lĩnh.
- Vai: `{"a":{"gender":"nu","role":"Nữ kiếm đồ","alignment":"context"},"b":{"gender":"nam","role":"Kiếm sư","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Nữ kiếm đồ {$a.ten} ngâm bàn tay phải vào nước thuốc, lòng bàn tay phồng ở chỗ phấn thường in. Kiếm sư {$b.ten} treo kiếm lên để nàng khỏi nhìn thấy chuôi.

### Lựa chọn

- **1. Đổi buổi học của ngươi lấy thời gian cho nàng tập tay trái**
  Ngươi nhường buổi có người hướng dẫn để nàng thử lại kiếm tay trái. Sau vài lần còn vụng, nàng bắt đúng đường kiếm. Kiếm sư đứng xem hết buổi, chưa nói lời nào.
  - `e`: `{"hd":{"p":3},"ng":{"g":3},"h":24,"an":["a","vết chai lệch"]}`
- **2. Mua thuốc để nàng tiếp tục bài cũ**
  Nàng theo kịp lớp. Lúc ghi tên vào sổ, nàng lặng lẽ dùng tay trái.
  - `cost`: `{"st":13}`
  - `e`: `{"hd":{"p":1},"ng":{"g":1}}`
- **3. Bỏ đi**
  Nước thuốc nguội. Thanh kiếm trên vách vẫn treo chuôi quay vào trong.

### Lịch sử và nhánh

```json
{
  "id": "vach_phan_tren_chuoi_kiem",
  "part": "2b",
  "waitHours": 2160,
  "needs": [
    1
  ],
  "paths": null
}
```

<a id="ch_vach_phan_tren_chuoi_kiem_3"></a>
## Lối kiếm qua mái đổ — `ch_vach_phan_tren_chuoi_kiem_3`

- Loại: story; nguồn: Khám phá; chủ đề: Cứu người; cảm xúc: Căng thẳng.
- Nơi: sơn môn.
- Điều kiện: tầng 1, 2, 3, 4; chuỗi vach_phan_tren_chuoi_kiem / phần 3; chờ ≥ 8640 giờ; một lần/kiếp.
- Bối cảnh tác giả: Hành lang ở Linh Sơn Vạn Lĩnh.
- Vai: `{"a":{"gender":"nu","role":"nữ kiếm đồ","alignment":"context"},"b":{"gender":"nam","role":"kiếm sư","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Đá ép xà xuống ngang vai kiếm sư {$b.ten}. Nếu nữ kiếm đồ {$a.ten} đã tập tay trái, nàng tìm được góc kiếm mở đường. Nếu vẫn học bài cũ, nàng phải đổi tay ngay trong khe đá.

### Lựa chọn

- **1. Dùng linh lực chống xà cho nàng cứu người**
  Ngươi chống xà tới khi nàng đưa kiếm sư ra được. Đá ép xuống khiến vai ngươi bị thương, nhưng cả hai đã ra khỏi hành lang trước lúc mái sập.
  - `cost`: `{"mp":"20%"}`
  - `e`: `{"deed":"cuu_nguoi","hp":"-10%"}`
- **2. Chỉ nàng cắt xà bằng đường kiếm riêng**
  Nàng theo góc ngươi chỉ, cắt xà rồi kéo thầy ra ngoài. Mái đổ xuống nghiền nát giá kiếm chung. Lão nhìn đống gỗ, bảo nàng đừng quay lại nhặt, người còn đủ mới là được.
  - `e`: `{"hd":{"p":1},"ng":{"g":1},"tv":3}`
- **3. Bỏ đi**
  Nàng bảo lão nhắm mắt. Ngươi nghe kiếm chạm xà một lần rồi im.

### Lịch sử và nhánh

```json
{
  "id": "vach_phan_tren_chuoi_kiem",
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

<a id="ch_vach_phan_tren_chuoi_kiem_4"></a>
## Một chuôi chưa sơn — `ch_vach_phan_tren_chuoi_kiem_4`

- Loại: story; nguồn: Khám phá; chủ đề: Thầy trò; cảm xúc: Lắng dịu.
- Nơi: sơn môn.
- Điều kiện: tầng 1, 2, 3, 4; chuỗi vach_phan_tren_chuoi_kiem / phần 4; chờ ≥ 2160 giờ; một lần/kiếp.
- Bối cảnh tác giả: Sân làm chuôi ở Linh Sơn Vạn Lĩnh.
- Vai: `{"a":{"gender":"nu","role":"Nữ kiếm đồ","alignment":"context"},"b":{"gender":"nam","role":"kiếm sư","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Nếu ngươi chống xà, kiếm sư {$b.ten} đặt kiếm cong trên bàn để đo lại chuôi. Nếu xà bị cắt, lão dùng gỗ của giá kiếm vỡ, còn nữ kiếm đồ {$a.ten} đứng chỉ cho lão chỗ khoét.

### Lựa chọn

- **1. Góp công làm chuôi cho cả hai tay**
  Từ nay người học được chọn. Lão đặt hộp phấn giữa bàn để khỏi phải chuyền qua ai.
  - `cost`: `{"st":13}`
  - `e`: `{"hd":{"p":3},"ng":{"g":3},"an":["a","một chuôi chưa sơn"]}`
- **2. Nhận thanh kiếm được sửa riêng**
  Ngươi có một thanh kiếm vừa tay. {$a.ten} giữ phần gỗ thừa, đủ làm nửa chuôi nữa.
  - `e`: `{"namedRelic":{"k":"kiem","name":"Kiếm Chuôi Thuận Tay","lore":"Ngươi có một thanh kiếm vừa tay. {$a.ten} giữ phần gỗ thừa, đủ làm nửa chuôi nữa."}}`
- **3. Bỏ đi**
  Lão nhờ nàng cầm thử từng chuôi trước khi giao cho đệ tử mới. Ngươi nghe nàng hỏi người đầu tiên thuận tay nào, rồi mới xuống núi.

### Lịch sử và nhánh

```json
{
  "id": "vach_phan_tren_chuoi_kiem",
  "part": "4",
  "waitHours": 2160,
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
