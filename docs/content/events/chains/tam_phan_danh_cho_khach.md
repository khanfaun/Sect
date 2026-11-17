# content/events/chains/tam_phan_danh_cho_khach.json

Nguồn chuẩn: `content/events/chains/tam_phan_danh_cho_khach.json`. Bản đọc tự sinh. Cú pháp: xem [guideline](../../GUIDELINE.md).

<a id="ch_tam_phan_danh_cho_khach_1"></a>
## Gió lùa dưới ván — `ch_tam_phan_danh_cho_khach_1`

- Loại: story; nguồn: Khám phá; chủ đề: Chuyện phường nghề; cảm xúc: Ấm áp.
- Nơi: thôn trấn, thành trì.
- Điều kiện: tầng 0; chuỗi tam_phan_danh_cho_khach / phần 1; một lần/kiếp.
- Bối cảnh tác giả: Xưởng mộc ở Phàm Trần.
- Vai: `{"a":{"gender":"nam","role":"Thợ mộc","alignment":"context"},"b":{"gender":"nam","role":"học việc","alignment":"context"},"c":{"gender":"nam","role":"story_person","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Thợ mộc {$a.ten} làm tấm phản cho một nhà có người bệnh nằm lâu. Học việc {$b.ten} lắp nhầm một chân ngắn, rồi lẳng lặng cắt ba chân kia theo chân ấy.

### Lựa chọn

- **1. Góp gỗ thay lại bốn chân**
  Ngươi mua đủ gỗ cho hắn thay cả bốn chân, bảo hắn tự trình việc cắt sai với thầy. Lão mộc mắng một trận rồi ngồi xuống chỉ lại cách đo. Học việc lần này đo hai lượt mới cưa.
  - `cost`: `{"st":10}`
  - `e`: `{"karma":4,"an":["a","gió lùa dưới ván"]}`
- **2. Mua tấm phản thấp cho mình**
  {$a.ten} có tiền làm tấm khác, nhưng đuổi {$b.ten} vì giấu lỗi. Hắn đem theo mẩu gỗ cắt ra từ chân đầu tiên.
  - `cost`: `{"st":10}`
- **3. Bỏ đi**
  Lão thợ mộc phát hiện phản thấp quá mức đặt hàng, gọi học trò tới hỏi. Ngươi đi khỏi giữa tiếng hắn lắp bắp nhận lỗi.

### Lịch sử và nhánh

```json
{
  "id": "tam_phan_danh_cho_khach",
  "part": "1",
  "waitHours": 0,
  "needs": [],
  "paths": null
}
```

<a id="ch_tam_phan_danh_cho_khach_2"></a>
## Khóa cửa từ bên trong — `ch_tam_phan_danh_cho_khach_2`

- Loại: story; nguồn: Khám phá; chủ đề: Chuyện chăm bệnh; cảm xúc: Cảm động.
- Nơi: thôn trấn, thành trì.
- Điều kiện: tầng 0, 1, 2, 3, 4; chuỗi tam_phan_danh_cho_khach / phần 2; chờ ≥ 2160 giờ; một lần/kiếp.
- Bối cảnh tác giả: Xóm trong ở Phàm Trần.
- Vai: `{"a":{"gender":"nam","role":"thợ mộc","alignment":"context"},"b":{"gender":"nam","role":"Học việc","alignment":"context"},"c":{"gender":"nam","role":"người bệnh","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Người bệnh {$c.ten} đã ngồi dậy được, nhưng then cửa nằm cao quá tầm với. Học việc {$b.ten} lắp một sợi dây kéo then xuống, còn thợ mộc {$a.ten} đứng bên ngoài chờ nghe cửa tự mở.

### Lựa chọn

- **1. Góp sắt làm then mới**
  Cửa mở nhẹ và {$c.ten} tự khóa được từ bên trong. {$b.ten} cất sợi dây cũ, trên đầu dây có ba nút đã thắt thử.
  - `cost`: `{"st":10}`
  - `e`: `{"karma":4,"an":["a","khóa cửa từ bên trong"]}`
- **2. Nhận sửa nhà, lấy công sau khi người bệnh bán được**
  Ngươi lo việc sửa và tìm người mua, nhận vốn cùng tiền công khi bán xong nhà. Người bệnh được tự chọn phòng thuê gần họ hàng trước ngày dọn đi. Hai thầy trò giúp chuyển đồ tới tận cửa.
  - `e`: `{"st":14}`
- **3. Bỏ đi**
  Ngươi vừa qua góc ngõ thì nghe then rơi, tiếp đó là tiếng cười rất nhỏ.

### Lịch sử và nhánh

```json
{
  "id": "tam_phan_danh_cho_khach",
  "part": "2",
  "waitHours": 2160,
  "needs": [
    0
  ],
  "paths": null
}
```

<a id="ch_tam_phan_danh_cho_khach_2b"></a>
## Bàn thấp ở bến xe — `ch_tam_phan_danh_cho_khach_2b`

- Loại: story; nguồn: Khám phá; chủ đề: Sinh kế; cảm xúc: Chua chát.
- Nơi: thôn trấn, thành trì.
- Điều kiện: tầng 0, 1, 2, 3, 4; chuỗi tam_phan_danh_cho_khach / phần 2b; chờ ≥ 2160 giờ; một lần/kiếp.
- Bối cảnh tác giả: Bến xe bò ở Phàm Trần.
- Vai: `{"a":{"gender":"nam","role":"thợ mộc","alignment":"context"},"b":{"gender":"nam","role":"học việc","alignment":"context"},"c":{"gender":"nam","role":"Người bệnh","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Học việc {$b.ten} bị đuổi khỏi xưởng, giờ nhận đóng bàn ở bến xe. Người bệnh {$c.ten} thuê hắn làm bàn bán kim chỉ vừa tầm ngồi, nhưng chiếc bào sứt khiến việc chậm mãi. Hắn thấy ngươi, ngập ngừng hỏi có thể xem giúp chân bàn đã đều chưa.

### Lựa chọn

- **1. Đặt một chiếc bàn riêng cho {$c.ten}**
  {$b.ten} đóng vừa tầm tay người ngồi. Tiền ngươi trả đủ để hắn mua một lưỡi bào có cán liền.
  - `cost`: `{"st":10}`
  - `e`: `{"karma":4}`
- **2. Gọi thợ mộc {$a.ten} đến nhận lại học trò**
  Hai người làm việc cùng nhau, với điều kiện {$b.ten} bù tiền gỗ hỏng bằng tiền công. Hắn buộc lưỡi bào sứt vào hông.
  - `e`: `{"karma":2}`
- **3. Bỏ đi**
  {$c.ten} kê túi kim chỉ lên đầu gối. Vết lún trên túi sâu thêm một chút.

### Lịch sử và nhánh

```json
{
  "id": "tam_phan_danh_cho_khach",
  "part": "2b",
  "waitHours": 2160,
  "needs": [
    1
  ],
  "paths": null
}
```

<a id="ch_tam_phan_danh_cho_khach_3"></a>
## Sân đầy bào vụn — `ch_tam_phan_danh_cho_khach_3`

- Loại: story; nguồn: Khám phá; chủ đề: Việc thiện; cảm xúc: Căng thẳng.
- Nơi: thôn trấn, thành trì.
- Điều kiện: tầng 0, 1, 2, 3, 4; chuỗi tam_phan_danh_cho_khach / phần 3; chờ ≥ 25920 giờ; một lần/kiếp.
- Bối cảnh tác giả: Lán cứu tế ở Phàm Trần.
- Vai: `{"a":{"gender":"nam","role":"Thợ mộc","alignment":"context"},"b":{"gender":"nam","role":"Học việc","alignment":"context"},"c":{"gender":"nam","role":"người bệnh","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Học việc {$b.ten} đã biết nghề, đang đóng phản cho lán cứu tế. Thợ mộc {$a.ten} mang gỗ tới, hai người gặp lại sau những lần làm riêng rồi cùng nhận việc. Nếu ngươi từng giúp làm then hoặc đặt bàn, người bệnh {$c.ten} đã tự đến trông lán. Nếu ngươi từng giúp bán nhà hoặc gọi thầy trở lại, người bệnh gửi bạc góp từ xa, nhờ ngươi chuyển lời thăm. Người tới lán mỗi ngày một đông, gỗ và tiền công đều sắp cạn.

### Lựa chọn

- **1. Góp gỗ và giúp làm theo tầm người nằm**
  Ngươi góp gỗ, cùng thợ hỏi từng người cần phản cao thấp ra sao. Buổi đầu làm chậm, đến khi đưa vào lán thì không phải sửa lại. Người bệnh tự với được bát nước, cười gọi người nằm bên thử xem.
  - `cost`: `{"st":10}`
  - `e`: `{"karma":4}`
- **2. Mua trọn mẻ phản để bán lên thành**
  Ngươi có lời và hai thợ mộc đủ tiền trả công thợ phụ. Trong lán, một người lót bào vụn dưới chiếu để khỏi nằm trực tiếp trên đất.
  - `cost`: `{"st":10}`
  - `e`: `{"st":24}`
  - `accounting`: `{"mode":"buy-and-sell","capital":10,"profit":14}`
- **3. Bỏ đi**
  Bào vụn bị gió thổi dồn vào chân người đang đợi. Họ lấy tay giữ cho khỏi bay vào bát.

### Lịch sử và nhánh

```json
{
  "id": "tam_phan_danh_cho_khach",
  "part": "3",
  "waitHours": 25920,
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

<a id="ch_tam_phan_danh_cho_khach_4"></a>
## Chỗ thừa một gang — `ch_tam_phan_danh_cho_khach_4`

- Loại: story; nguồn: Khám phá; chủ đề: Thầy trò; cảm xúc: Lắng dịu.
- Nơi: thôn trấn, thành trì.
- Điều kiện: tầng 0, 1, 2, 3, 4; dong; chuỗi tam_phan_danh_cho_khach / phần 4; chờ ≥ 4320 giờ; một lần/kiếp.
- Bối cảnh tác giả: Kho gỗ ở Phàm Trần.
- Vai: `{"a":{"gender":"nam","role":"Thợ mộc","alignment":"context"},"b":{"gender":"nam","role":"story_person","alignment":"context"},"c":{"gender":"nam","role":"Người bệnh","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Nếu phản từng được giữ ở lán, dân đem gỗ tới nhờ hai thầy trò đóng thêm. Nếu phản từng đem bán, khách trong thành đã đặt mẻ mới nhưng lán vẫn thiếu chỗ nằm. Thợ mộc {$a.ten} nhắc học trò chừa mặt phản rộng thêm một gang để đặt bát thuốc. Hắn cười: “Lần này con không cắt bớt đâu.”

### Lựa chọn

- **1. Đổi tiền lời hoặc tiền mua gỗ lấy phản cho lán**
  Hai thợ đưa phản sang, mỗi chiếc chừa một gang để đặt bát. Người bệnh {$c.ten} đặt bát đầu tiên xuống mà nước chỉ gợn một vòng.
  - `cost`: `{"st":10}`
  - `e`: `{"karma":4,"an":["a","chỗ thừa một gang"]}`
- **2. Nhận mẻ hàng của khách thành**
  Ngươi nhận tiền công thu xếp mẻ hàng mới của khách trong thành. Học việc xin giữ gỗ thừa để sửa phản cho lán, hai bên đồng ý. Chuyến buôn có lời, trong lán cũng được thêm vài chỗ nằm.
  - `e`: `{"st":14}`
- **3. Bỏ đi**
  Ngươi chào hai thầy trò. Họ tranh luận thêm một lúc về chiều cao chân phản, rồi cùng khiêng tấm đầu tiên vào lán.

### Lịch sử và nhánh

```json
{
  "id": "tam_phan_danh_cho_khach",
  "part": "4",
  "waitHours": 4320,
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
