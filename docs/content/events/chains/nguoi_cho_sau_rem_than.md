# content/events/chains/nguoi_cho_sau_rem_than.json

Nguồn chuẩn: `content/events/chains/nguoi_cho_sau_rem_than.json`. Bản đọc tự sinh. Cú pháp: xem [guideline](../../GUIDELINE.md).

<a id="ch_nguoi_cho_sau_rem_than_1"></a>
## Hai tiếng ho qua rèm — `ch_nguoi_cho_sau_rem_than_1`

- Loại: story; nguồn: Khám phá; chủ đề: Chuyện sống chết; cảm xúc: Lãng mạn.
- Nơi: ma địa.
- Điều kiện: tầng 3; chuỗi nguoi_cho_sau_rem_than / phần 1; một lần/kiếp.
- Bối cảnh tác giả: Nhà tro ở Cửu U Ma Vực.
- Vai: `{"a":{"gender":"nam","role":"Người giữ lò","alignment":"context"},"b":{"gender":"nam","role":"oán hồn","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Người giữ lò {$a.ten} trò chuyện với oán hồn {$b.ten} qua tấm rèm than. Nàng đã chết vì lửa, mỗi khi lão cười nàng lại ho, dù cách tấm rèm còn một sải tay.

### Lựa chọn

- **1. Cho họ mượn phù giữ hơi lạnh**
  Ngươi dùng phù của nhà lò dẫn hơi lạnh qua rèm, hao linh lực giữ nó tới khi hai người nói hết câu. Nàng thôi ho một lúc, hỏi lão có chịu nghỉ lò sớm được một hôm không.
  - `cost`: `{"mp":"20%"}`
  - `e`: `{"karma":4,"an":["a","hai tiếng ho qua rèm"]}`
- **2. Thu tiếng ho để bán làm mồi dẫn hồn**
  Ngươi có vật luyện phù. {$a.ten} kéo ghế lại sát rèm, dỏng tai nghe khoảng trống.
  - `e`: `{"karma":-3,"pill":1,"tamma":3}`
- **3. Bỏ đi**
  Nàng ho một tiếng, lão ho lại một tiếng rất khẽ.

### Lịch sử và nhánh

```json
{
  "id": "nguoi_cho_sau_rem_than",
  "part": "1",
  "waitHours": 0,
  "needs": [],
  "paths": null
}
```

<a id="ch_nguoi_cho_sau_rem_than_2"></a>
## Lò tắt trước giờ hẹn — `ch_nguoi_cho_sau_rem_than_2`

- Loại: story; nguồn: Khám phá; chủ đề: Lời hẹn; cảm xúc: Dịu dàng.
- Nơi: ma địa.
- Điều kiện: tầng 3, 4; chuỗi nguoi_cho_sau_rem_than / phần 2; chờ ≥ 2160 giờ; một lần/kiếp.
- Bối cảnh tác giả: Sân hong củi ở Cửu U Ma Vực.
- Vai: `{"a":{"gender":"nam","role":"Người giữ lò","alignment":"context"},"b":{"gender":"nam","role":"story_person","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Người giữ lò {$a.ten} muốn tắt lửa để đưa nàng ra sân. Lão đã xếp củi thành hai hàng, chừa giữa sân một khoảng trống như lối đi.

### Lựa chọn

- **1. Giữ lửa trong đan điền đến khi họ gặp**
  Ngươi thu lửa lò vào khí hải, chịu nóng cho tới khi hai người gặp nhau ngoài sân. Nàng đi chậm, lão cũng đi chậm theo. Hết buổi, họ tự quay lại, không để ngươi phải gọi.
  - `cost`: `{"mp":"20%"}`
  - `e`: `{"karma":4,"an":["a","lò tắt trước giờ hẹn"],"hp":"-10%"}`
- **2. Nhận củi tốt, giúp họ dọn một chỗ nghỉ dưới hiên**
  Ngươi nhận phần củi lão trả công, lấy linh lực ép lại thành một viên hỏa đan mang đi. Chỗ dưới hiên đủ mát để hai người ngồi gần nhau, dù nàng chưa bước được ra sân.
  - `e`: `{"karma":-2,"pill":1}`
- **3. Bỏ đi**
  Lão chừa lối đi tới khi củi nguội hẳn.

### Lịch sử và nhánh

```json
{
  "id": "nguoi_cho_sau_rem_than",
  "part": "2",
  "waitHours": 2160,
  "needs": [
    0
  ],
  "paths": null
}
```

<a id="ch_nguoi_cho_sau_rem_than_2b"></a>
## Người gọi nhầm tiếng — `ch_nguoi_cho_sau_rem_than_2b`

- Loại: story; nguồn: Khám phá; chủ đề: Hậu quả luyện phù; cảm xúc: Day dứt.
- Nơi: ma địa.
- Điều kiện: tầng 3, 4; chuỗi nguoi_cho_sau_rem_than / phần 2b; chờ ≥ 2160 giờ; một lần/kiếp.
- Bối cảnh tác giả: Đường khói ở Cửu U Ma Vực.
- Vai: `{"a":{"gender":"nam","role":"người giữ lò","alignment":"context"},"b":{"gender":"nam","role":"Oán hồn","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Tiếng ho bị bán dẫn một đoàn hồn lạc vào lò. Oán hồn {$b.ten} đứng lẫn trong đoàn, người giữ lò {$a.ten} đưa tay mời từng người nhưng ghế chỉ có một.

### Lựa chọn

- **1. Mua lại tiếng ho và trả vào rèm**
  Ngươi trả hơn khoản bán ban đầu để chuộc tiếng ho, đưa về cho nàng. Nàng gọi được tên từng hồn lạc, chỉ họ lối ra khỏi lò. Người giữ lò chờ người cuối đi rồi mới kéo ghế lại.
  - `cost`: `{"st":19}`
  - `e`: `{"karma":4,"an":["a","người gọi nhầm tiếng"]}`
- **2. Mượn lại tiếng ho để dẫn đoàn hồn tới chỗ nghỉ**
  Ngươi xin mượn vật dẫn hồn, đưa cả đoàn rời lò rồi trả vật cho người mua. Nàng vẫn chưa lấy lại tiếng nói. Người giữ lò mang ghế theo, để nàng có chỗ chờ lúc dừng đường.
  - `e`: `{"karma":2}`
- **3. Bỏ đi**
  Lão đặt ghế bên đường. Người ngồi xuống đầu tiên quay mặt sai phía.

### Lịch sử và nhánh

```json
{
  "id": "nguoi_cho_sau_rem_than",
  "part": "2b",
  "waitHours": 2160,
  "needs": [
    1
  ],
  "paths": null
}
```

<a id="ch_nguoi_cho_sau_rem_than_3"></a>
## Vực có gió làm tắt lửa — `ch_nguoi_cho_sau_rem_than_3`

- Loại: story; nguồn: Khám phá; chủ đề: Lời chia tay; cảm xúc: Căng thẳng.
- Nơi: ma địa.
- Điều kiện: tầng 3, 4; dong; chuỗi nguoi_cho_sau_rem_than / phần 3; chờ ≥ 4320 giờ; một lần/kiếp.
- Bối cảnh tác giả: Vực gió ở Cửu U Ma Vực.
- Vai: `{"a":{"gender":"nam","role":"story_person","alignment":"context"},"b":{"gender":"nam","role":"Oán hồn","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Oán hồn {$b.ten} đã tìm được đường rời ma vực. Nếu nàng chưa từng mất giọng hoặc đã được trả tiếng ho, nàng hỏi người giữ lò có muốn tiễn mình không. Nếu tiếng ho vẫn thuộc người khác, nàng viết lời từ biệt lên lớp tro trên ghế. Lão đọc xong, nhờ ngươi giữ gió bớt lạnh một đoạn để mình theo được nàng.

### Lựa chọn

- **1. Giữ luồng gió để họ đi cạnh nhau**
  Ngươi dùng pháp lực chắn gió, để lão tiễn nàng tới cuối đoạn đường người sống còn đi được. Hai người tự nói lời từ biệt. Khi nàng đi tiếp, lão đứng nhìn một lúc rồi nhờ ngươi cùng trở lên.
  - `cost`: `{"mp":"20%"}`
  - `e`: `{"karma":4}`
- **2. Thu một luồng gió để chữa cơn ho trong hồn**
  Nàng lấy lại hơi đủ nói lời cuối, nhưng phải đi một mình. Lão để ghế trống suốt quãng đường lên.
  - `e`: `{"karma":-1}`
- **3. Bỏ đi**
  Ngươi nghe một tiếng ho lẫn trong gió, lần này rất xa.

### Lịch sử và nhánh

```json
{
  "id": "nguoi_cho_sau_rem_than",
  "part": "3",
  "waitHours": 4320,
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

<a id="ch_nguoi_cho_sau_rem_than_4"></a>
## Lửa nhỏ qua đêm — `ch_nguoi_cho_sau_rem_than_4`

- Loại: story; nguồn: Khám phá; chủ đề: Chuyện người ở lại; cảm xúc: Lắng dịu.
- Nơi: ma địa.
- Điều kiện: tầng 3, 4; chuỗi nguoi_cho_sau_rem_than / phần 4; chờ ≥ 8640 giờ; một lần/kiếp.
- Bối cảnh tác giả: Quán lửa ở Cửu U Ma Vực.
- Vai: `{"a":{"gender":"nam","role":"story_person","alignment":"context"},"b":{"gender":"nam","role":"story_person","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Nếu lão đã tiễn nàng, lão đặt ghế nhìn ra đường. Nếu nàng rời đi một mình, ghế quay về phía rèm, nhưng lão đã tháo hết những hạt than cũ.

### Lựa chọn

- **1. Góp lửa cho quán đón cả người sống lẫn hồn**
  Ngươi để lại một phần khí dưỡng thần. Lão đặt hai cái chén ở hai đầu ghế.
  - `cost`: `{"st":19,"mp":"20%"}`
  - `e`: `{"karma":4}`
- **2. Mua tấm rèm cũ để giữ hơi của hồn**
  Ngươi luyện được một vật che dương khí. Lão treo rèm mới, ngang chỗ cũ còn một vệt tro.
  - `cost`: `{"st":19}`
  - `e`: `{"namedRelic":{"k":"phu","name":"Phù Rèm Tro","lore":"Ngươi luyện được một vật che dương khí. Lão treo rèm mới, ngang chỗ cũ còn một vệt tro."}}`
- **3. Bỏ đi**
  Lão gọi ngươi ghé quán lúc trở về. Khách mới tới, lão đứng lên đón, hỏi họ muốn ngồi gần lửa hay ngoài hiên.

### Lịch sử và nhánh

```json
{
  "id": "nguoi_cho_sau_rem_than",
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
