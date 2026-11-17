# content/events/chains/mot_chu_dung_tren_van_cau.json

Nguồn chuẩn: `content/events/chains/mot_chu_dung_tren_van_cau.json`. Bản đọc tự sinh. Cú pháp: xem [guideline](../../GUIDELINE.md).

<a id="ch_mot_chu_dung_tren_van_cau_1"></a>
## Tên đường ở mặt dưới — `ch_mot_chu_dung_tren_van_cau_1`

- Loại: story; nguồn: Khám phá; chủ đề: Nhân quả; cảm xúc: Trầm buồn.
- Nơi: thiên lộ.
- Điều kiện: tầng 4; chuỗi mot_chu_dung_tren_van_cau / phần 1; một lần/kiếp.
- Bối cảnh tác giả: Cầu ván giữa đường ngọc ở Cửu Thiên Cổ Lộ.
- Vai: `{"a":{"gender":"nam","role":"Người khắc cầu","alignment":"context"},"b":{"gender":"nam","role":"story_person","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Người khắc cầu {$a.ten} chỉ cho ngươi tên những người đã đổi mạng để giữ cầu. Chữ nằm dưới ván nên mỗi lần qua, người ta giẫm đúng lên chỗ lưng chữ.

### Lựa chọn

- **1. Giúp lão lật một tấm ván để đọc**
  Ngươi lỡ lượt qua để giúp lão lật ván đọc tên người giữ cầu đã mất. Lão kể rõ người ấy đã giữ nhịp cho dân thoát thế nào. Ngươi nhớ được cả việc lẫn tên, đặt ván lại rồi mới đi.
  - `e`: `{"karma":4,"h":12}`
- **2. Mượn tên dưới ván để bước nhanh hơn**
  Cầu nâng bước ngươi. Ở đầu kia, một chữ đã mờ một nửa dù lão chưa hề chạm đục.
  - `e`: `{"karma":-2,"tp":1}`
- **3. Bỏ đi**
  Lão áp tai dưới ván, đợi tiếng chân chấm dứt rồi đọc tiếp.

### Lịch sử và nhánh

```json
{
  "id": "mot_chu_dung_tren_van_cau",
  "part": "1",
  "waitHours": 0,
  "needs": [],
  "paths": null
}
```

<a id="ch_mot_chu_dung_tren_van_cau_2"></a>
## Người không biết tên mình còn đó — `ch_mot_chu_dung_tren_van_cau_2`

- Loại: story; nguồn: Khám phá; chủ đề: Người đã khuất; cảm xúc: Cảm động.
- Nơi: thiên lộ.
- Điều kiện: tầng 4; chuỗi mot_chu_dung_tren_van_cau / phần 2; chờ ≥ 2160 giờ; một lần/kiếp.
- Bối cảnh tác giả: Bãi ván ở Cửu Thiên Cổ Lộ.
- Vai: `{"a":{"gender":"nam","role":"story_person","alignment":"context"},"b":{"gender":"nam","role":"Hồn người giữ cầu","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Hồn người giữ cầu {$b.ten} nhớ tiếng ván nứt mà quên tên. Nó chỉ nhận ra cái tên ngươi đọc khi đặt chân vào đúng chỗ ván cong.

### Lựa chọn

- **1. Kể cả cái tên lẫn việc nó đã làm**
  Ngươi dành một đêm kể cho hồn nghe tên và việc giữ cầu của nó. Đến sáng, nó tự nhắc lại được mà không cần ngươi đọc trước. Người khắc cầu xin ghi tên lên mặt trên, để người sau cũng nhớ.
  - `e`: `{"karma":4,"h":24,"an":["a","người không biết tên mình còn đó"]}`
- **2. Đổi tên lấy cách giữ cầu của nó**
  Ngươi học được cách phân lực lên nhiều nhịp. Khi lặp lại tên mình, hồn nói hụt ở chữ cuối.
  - `e`: `{"skill":1,"karma":-1}`
- **3. Bỏ đi**
  Nó đi một vòng quanh tấm ván, đợi tên tự trở lại.

### Lịch sử và nhánh

```json
{
  "id": "mot_chu_dung_tren_van_cau",
  "part": "2",
  "waitHours": 2160,
  "needs": [
    0
  ],
  "paths": null
}
```

<a id="ch_mot_chu_dung_tren_van_cau_2b"></a>
## Tiếng chân của người đã mượn — `ch_mot_chu_dung_tren_van_cau_2b`

- Loại: story; nguồn: Khám phá; chủ đề: Nhân quả; cảm xúc: Day dứt.
- Nơi: thiên lộ.
- Điều kiện: tầng 4; chuỗi mot_chu_dung_tren_van_cau / phần 2b; chờ ≥ 2160 giờ; một lần/kiếp.
- Bối cảnh tác giả: Đường rải gỗ ở Cửu Thiên Cổ Lộ.
- Vai: `{"a":{"gender":"nam","role":"Người khắc cầu","alignment":"context"},"b":{"gender":"nam","role":"Hồn người giữ cầu","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Hồn người giữ cầu {$b.ten} theo tiếng chân ngươi vì nghe tên mình trong mỗi bước. Người khắc cầu {$a.ten} muốn lấy lại nửa chữ còn thiếu, lão đã mài sẵn đầu đục rất mỏng.

### Lựa chọn

- **1. Để lão gỡ nửa chữ khỏi dấu chân**
  Ngươi để lão gỡ nét tên đã nhập vào dấu chân, trả lại cho hồn. Bước đi mất phần nhẹ trước đó, nhưng tiếng chân phía sau cũng dừng. Hồn tự đọc được trọn tên mình rồi cúi chào ngươi.
  - `e`: `{"karma":4,"tp":-1,"an":["a","tiếng chân của người đã mượn"]}`
- **2. Giữ nửa chữ và mời hồn cùng đi**
  Hồn thấy thêm nhiều chỗ trên cổ lộ, đổi lại phải theo tốc độ của ngươi. Đến chỗ nghỉ, nó vẫn đứng ngay sau gót.
  - `e`: `{"karma":1}`
- **3. Bỏ đi**
  Nó bước đúng lên dấu cuối ngươi để lại. Dấu ấy sâu thêm.

### Lịch sử và nhánh

```json
{
  "id": "mot_chu_dung_tren_van_cau",
  "part": "2b",
  "waitHours": 2160,
  "needs": [
    1
  ],
  "paths": null
}
```

<a id="ch_mot_chu_dung_tren_van_cau_3"></a>
## Cầu chờ người cuối — `ch_mot_chu_dung_tren_van_cau_3`

- Loại: story; nguồn: Khám phá; chủ đề: Nhân quả; cảm xúc: Căng thẳng.
- Nơi: thiên lộ.
- Điều kiện: tầng 4; chuỗi mot_chu_dung_tren_van_cau / phần 3; chờ ≥ 4320 giờ; một lần/kiếp.
- Bối cảnh tác giả: Nhịp cầu trắng ở Cửu Thiên Cổ Lộ.
- Vai: `{"a":{"gender":"nam","role":"Người khắc cầu","alignment":"context"},"b":{"gender":"nam","role":"story_person","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Một nhịp cầu mới chưa chịu nhận người qua. Nếu hồn đã được kể lại tên hoặc được trả nét tên, nó tự đứng vào chỗ ván cong, nhớ mình từng giữ cầu ra sao. Nếu tên đã đổi lấy phép hoặc vẫn đi theo ngươi, nó chờ bên chân ngươi, không biết phải đứng ở đâu. Người khắc cầu xin ngươi giúp trước khi đoàn khách tới.

### Lựa chọn

- **1. Viết tên ngươi xuống để đỡ nhịp cầu cùng hồn**
  Ngươi viết tên mình cạnh tên hồn, để lại một phần thần niệm cùng đỡ cầu. Cả đoàn qua hết, hồn vẫn đứng vững tại nhịp giữa. Lão khắc cầu hứa sẽ coi phần tên ngươi để lại.
  - `e`: `{"karma":4,"tv":-3}`
- **2. Nhờ hồn chia phép giữ cầu vào nhiều tấm ván**
  Cầu chịu được đoàn người, nhưng các tên cũ mờ đi. Người khắc cầu {$a.ten} đặt đục xuống ngay giữa một chữ.
  - `e`: `{"karma":-1}`
- **3. Bỏ đi**
  Hồn bước ra thử. Nhịp ván hạ xuống vừa đủ chạm đầu ngón chân.

### Lịch sử và nhánh

```json
{
  "id": "mot_chu_dung_tren_van_cau",
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

<a id="ch_mot_chu_dung_tren_van_cau_4"></a>
## Tên ở phía người nhìn — `ch_mot_chu_dung_tren_van_cau_4`

- Loại: story; nguồn: Khám phá; chủ đề: Nhân quả; cảm xúc: Lắng dịu.
- Nơi: thiên lộ.
- Điều kiện: tầng 4; chuỗi mot_chu_dung_tren_van_cau / phần 4; chờ ≥ 25920 giờ; một lần/kiếp.
- Bối cảnh tác giả: Bãi sửa cầu ở Cửu Thiên Cổ Lộ.
- Vai: `{"a":{"gender":"nam","role":"người khắc cầu","alignment":"context"},"b":{"gender":"nam","role":"story_person","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Nếu ngươi đã để tên, một người qua cầu đọc nó rồi hỏi tới tên đứng cạnh. Nếu tên cũ mờ đi, người khắc cầu {$a.ten} đem từng tấm ván xuống cho người còn nhớ đến chạm tay.

### Lựa chọn

- **1. Khắc lại những tên còn nhớ ở phía trên**
  Ngươi giúp lão dò lại những tên còn nhớ, khắc trên mặt ván để người qua đọc được. Hồn chỉ đúng chỗ tên mình rồi đứng tránh sang bên. Lần đầu nó được nghe người lạ gọi tên mà không phải xin.
  - `e`: `{"karma":4,"an":["a","tên ở phía người nhìn"]}`
- **2. Xin hồn truyền phép giữ cầu để dùng ở những nơi khác**
  Nhiều nhịp mới đứng được. Mỗi nơi ngươi chừa một tấm ván trắng cho người địa phương tự khắc.
  - `e`: `{"skill":1}`
- **3. Bỏ đi**
  Ngươi chào hồn giữ cầu trước khi đi. Nó đáp lời, đứng lại nhận phần việc đã chọn.

### Lịch sử và nhánh

```json
{
  "id": "mot_chu_dung_tren_van_cau",
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
