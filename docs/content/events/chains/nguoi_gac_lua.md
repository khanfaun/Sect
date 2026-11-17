# content/events/chains/nguoi_gac_lua.json

Nguồn chuẩn: `content/events/chains/nguoi_gac_lua.json`. Bản đọc tự sinh. Cú pháp: xem [guideline](../../GUIDELINE.md).

<a id="ch_nguoi_gac_lua_1"></a>
## Hồi kẻng thứ ba — `ch_nguoi_gac_lua_1`

- Loại: story; nguồn: Khám phá; chủ đề: Việc làng ban đêm; cảm xúc: Căng thẳng.
- Nơi: thôn trấn, thành trì.
- Điều kiện: tầng 0; dem; chuỗi nguoi_gac_lua / phần 1; một lần/kiếp.
- Bối cảnh tác giả: Chòi báo lửa ở Phàm Trần.
- Vai: `{"a":{"gender":"nam","role":"người gác","alignment":"context"},"b":{"gender":"nam","role":"hào trưởng","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Người gác {$a.ten} muốn đánh thêm một hồi kẻng vì thấy khói ngoài đê. Hào trưởng {$b.ten} nắm dùi, bảo báo cháy lần nữa thì dân bỏ ruộng chạy về, còn lúa nhà hắn đang phơi kín sân.

### Lựa chọn

- **1. Đánh kẻng cùng {$a.ten}**
  Dân chạy về kịp dập lửa trước khi cháy lan. Cơn mưa tới sau làm ướt số lúa chưa thu, {$b.ten} lập tức đổ lỗi cho người đánh kẻng. Người gác cãi: “Không gọi họ về thì giờ còn nhà đâu mà giữ lúa?”
  - `e`: `{"karma":4}`
- **2. Im kẻng và tự ra xem**
  Ngươi dập được lửa trước khi bén nhà, tay bị bỏng khi kéo giàn phơi ra khỏi lối. Một dãy rơm đã cháy hết. Người gác chạy tới giúp, bảo lần sau dù ai cản cũng phải báo cho cả xóm.
  - `e`: `{"karma":4,"hp":"-10%"}`
- **3. Bỏ đi**
  Ngươi nghe hai hồi kẻng, hồi cuối dội ra từ phía nhà đã bắt lửa.

### Lịch sử và nhánh

```json
{
  "id": "nguoi_gac_lua",
  "part": "1",
  "waitHours": 0,
  "needs": [],
  "paths": null
}
```

<a id="ch_nguoi_gac_lua_2"></a>
## Tiền mua một tiếng — `ch_nguoi_gac_lua_2`

- Loại: story; nguồn: Khám phá; chủ đề: Chuyện làng; cảm xúc: Uất ức.
- Nơi: thôn trấn, thành trì.
- Điều kiện: tầng 0, 1, 2, 3, 4; chuỗi nguoi_gac_lua / phần 2; chờ ≥ 120 giờ; một lần/kiếp.
- Bối cảnh tác giả: Sân phơi thóc ở Phàm Trần.
- Vai: `{"a":{"gender":"nam","role":"Người gác","alignment":"context"},"b":{"gender":"nam","role":"Hào trưởng","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Hào trưởng {$b.ten} bắt người gác {$a.ten} đền lúa ướt. {$a.ten} mang tới một nong thóc mới nhặt, từng hạt đã được vặt mầm bằng tay.

### Lựa chọn

- **1. Chia phần đền và xin lập lệ báo cháy**
  Ngươi góp một phần đền số lúa ướt, dân góp phần còn lại. Trước mặt cả làng, mọi người lập lệ thấy cháy được đánh kẻng ngay. Hào trưởng buộc phải điểm chỉ vào giấy.
  - `cost`: `{"st":10}`
  - `e`: `{"karma":4}`
- **2. Trả hết rồi đòi giữ dùi kẻng**
  {$a.ten} thoát nợ và dân phải qua ngươi để xin báo cháy. Lão quấn giẻ quanh tay mình dù chiếc dùi đã được mang đi.
  - `cost`: `{"st":10}`
  - `e`: `{"karma":-2}`
- **3. Bỏ đi**
  Lão bán nong thóc cho người nấu rượu. Bên đáy nong vẫn còn những chấm trắng mắc vào nan.

### Lịch sử và nhánh

```json
{
  "id": "nguoi_gac_lua",
  "part": "2",
  "waitHours": 120,
  "needs": [
    0
  ],
  "paths": null
}
```

<a id="ch_nguoi_gac_lua_2b"></a>
## Giàn phơi mới — `ch_nguoi_gac_lua_2b`

- Loại: story; nguồn: Khám phá; chủ đề: Tái dựng; cảm xúc: Day dứt.
- Nơi: thôn trấn, thành trì.
- Điều kiện: tầng 0, 1, 2, 3, 4; chuỗi nguoi_gac_lua / phần 2b; chờ ≥ 120 giờ; một lần/kiếp.
- Bối cảnh tác giả: Xóm phơi rơm ở Phàm Trần.
- Vai: `{"a":{"gender":"nam","role":"Người gác","alignment":"context"},"b":{"gender":"nam","role":"Hào trưởng","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Dân dựng lại giàn, treo ngay chỗ cũ. Người gác {$a.ten} đem dùi kẻng ra đặt giữa sân và xin tìm một chỗ gác nhìn được cả hai xóm.

### Lựa chọn

- **1. Góp gỗ dựng chòi mới**
  Ngươi mua gỗ dựng chòi nhìn được cả hai xóm, giao người gác tự quyết lúc báo động. Lão gọi mấy người trẻ lên học phân biệt khói bếp với khói cháy, không muốn lần sau chỉ mình lão biết.
  - `cost`: `{"st":10}`
  - `e`: `{"karma":4,"an":["a","giàn phơi mới"]}`
- **2. Thuê người thay lão giữ chòi**
  Hào trưởng {$b.ten} bằng lòng vì người mới chịu hỏi hắn trước khi đánh. {$a.ten} đặt dùi lên giàn phơi, ở ngay khoảng rơm từng cháy.
  - `cost`: `{"st":10}`
- **3. Bỏ đi**
  Dùi nằm giữa sân tới chiều. Một đứa trẻ nhấc lên thử, hai tay vẫn chưa nhấc nổi đầu dùi.

### Lịch sử và nhánh

```json
{
  "id": "nguoi_gac_lua",
  "part": "2b",
  "waitHours": 120,
  "needs": [
    1
  ],
  "paths": null
}
```

<a id="ch_nguoi_gac_lua_3"></a>
## Đêm lửa trườn — `ch_nguoi_gac_lua_3`

- Loại: story; nguồn: Khám phá; chủ đề: Hỏa hoạn; cảm xúc: Căng thẳng.
- Nơi: rừng sâu, thôn trấn.
- Điều kiện: tầng 0, 1, 2, 3, 4; chuỗi nguoi_gac_lua / phần 3; chờ ≥ 8640 giờ; một lần/kiếp.
- Bối cảnh tác giả: Gò cỏ ở Phàm Trần.
- Vai: `{"a":{"gender":"nam","role":"story_person","alignment":"context"},"b":{"gender":"nam","role":"Hào trưởng","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Gió mạnh đẩy lửa qua bãi cỏ khô về phía xóm dưới. Nếu người gác đã được tự đánh kẻng, dân có mặt từ sớm và đang đưa trâu ra đường đất. Nếu quyền báo vẫn phải xin phép, người chạy tin còn đợi trả lời ở nhà hào trưởng. Người gác gọi ngươi giúp mở đường cản lửa; không còn thời gian chờ nữa.

### Lựa chọn

- **1. Dẫn người phá hàng rào làm đường cản lửa**
  Ngươi dẫn dân phá rào, dọn cỏ thành dải đất trống. Nhà trong xóm giữ được, ngươi bị tàn lửa làm bỏng tay, còn phải trả phần rào đã phá. Dân nhận giúp chăm vết thương rồi cùng ngươi tính tiền đền.
  - `e`: `{"karma":4,"hp":"-15%"}`
- **2. Giữ riêng dãy nhà phía trên**
  Hào trưởng {$b.ten} thưởng bạc vì nhà hắn thoát lửa. Phía dưới gò chỉ còn những khoanh đất sáng màu nơi từng đặt chum nước.
  - `e`: `{"st":14,"karma":-3}`
- **3. Bỏ đi**
  Gió thổi ngược khi trời gần sáng. Trên gò chỉ còn một đoạn rào cắm nghiêng về xóm dưới.

### Lịch sử và nhánh

```json
{
  "id": "nguoi_gac_lua",
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

<a id="ch_nguoi_gac_lua_4"></a>
## Dùi treo ngang vai — `ch_nguoi_gac_lua_4`

- Loại: story; nguồn: Khám phá; chủ đề: Lệ làng; cảm xúc: Trầm buồn.
- Nơi: thôn trấn, thành trì.
- Điều kiện: tầng 0, 1, 2, 3, 4; chuỗi nguoi_gac_lua / phần 4; chờ ≥ 504 giờ; một lần/kiếp.
- Bối cảnh tác giả: Nhà họp ở Phàm Trần.
- Vai: `{"a":{"gender":"nam","role":"Người gác","alignment":"context"},"b":{"gender":"nam","role":"hào trưởng","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Nếu đường cản lửa đã mở, dân mang cọc rào cháy tới để chia tiền đền. Nếu dãy nhà trên được giữ, người xóm dưới ngồi ngoài cửa với một cái chum nứt, chờ xem tiền thưởng thuộc về ai.

### Lựa chọn

- **1. Nhận phần đền và giao dùi cho cả làng**
  Ngươi góp bạc bồi thường cho những nhà chịu thiệt, đề nghị cả làng cùng giữ quyền báo cháy. Sau một hồi tranh luận, họ giao chìa chòi cho ba người ở ba đầu xóm. Từ nay không ai được giữ riêng dùi kẻng.
  - `cost`: `{"st":10}`
  - `e`: `{"karma":6}`
- **2. Để hào trưởng {$b.ten} giữ quyền báo**
  Hắn cấp tiền dựng lại chòi và yêu cầu cất dùi trong hòm khóa. Người gác {$a.ten} đục một lỗ trên vách chòi để nhìn về xóm dưới.
  - `e`: `{"st":14,"karma":-2}`
- **3. Bỏ đi**
  Cuộc họp còn kéo dài. Người gác nói sẽ ở lại tới khi có lệ rõ ràng; ngươi chào lão rồi lên đường.

### Lịch sử và nhánh

```json
{
  "id": "nguoi_gac_lua",
  "part": "4",
  "waitHours": 504,
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
