# content/events/chains/buc_tuong_nghe_ten_minh.json

Nguồn chuẩn: `content/events/chains/buc_tuong_nghe_ten_minh.json`. Bản đọc tự sinh. Cú pháp: xem [guideline](../../GUIDELINE.md).

<a id="ch_buc_tuong_nghe_ten_minh_1"></a>
## Đáp lời trong đá — `ch_buc_tuong_nghe_ten_minh_1`

- Loại: story; nguồn: Khám phá; chủ đề: Tâm ma; cảm xúc: Kinh dị.
- Nơi: ma địa.
- Điều kiện: tầng 3; chuỗi buc_tuong_nghe_ten_minh / phần 1; một lần/kiếp.
- Bối cảnh tác giả: Hành lang đá đen ở Cửu U Ma Vực.
- Vai: `{"a":{"gender":"nam","role":"người khắc tên","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Vách đá đáp lại tên người vừa đi qua bằng giọng của chính họ. Người khắc tên {$a.ten} bảo ngươi gọi thử, lão đã đục sẵn một chỗ ngang miệng.

### Lựa chọn

- **1. Hỏi vách bằng tên ngươi**
  Nó đáp bằng một lời ngươi từng hối hận. {$a.ten} hứng mạt đá vào một cái chén.
  - `e`: `{"tv":3,"tamma":-4}`
- **2. Gọi tên {$a.ten} trước**
  Vách nín một lúc rồi bật ra tên khác. Lão bấu tay lên chỗ chưa khắc.
  - `e`: `{"hd":{"t":1},"tamma":2}`
- **3. Bỏ đi**
  Ngươi không thử gọi tên. Vừa quay đi, ngươi nghe tiếng mình từ trong đá hỏi tại sao không dám.

### Lịch sử và nhánh

```json
{
  "id": "buc_tuong_nghe_ten_minh",
  "part": "1",
  "waitHours": 0,
  "needs": [],
  "paths": null
}
```

<a id="ch_buc_tuong_nghe_ten_minh_2"></a>
## Vết đục hình miệng — `ch_buc_tuong_nghe_ten_minh_2`

- Loại: story; nguồn: Khám phá; chủ đề: Tâm ma; cảm xúc: Day dứt.
- Nơi: ma địa.
- Điều kiện: tầng 3, 4; chuỗi buc_tuong_nghe_ten_minh / phần 2; chờ ≥ 504 giờ; một lần/kiếp.
- Bối cảnh tác giả: Nhà chứa mạt ở Cửu U Ma Vực.
- Vai: `{"a":{"gender":"nam","role":"Người khắc tên","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Người khắc tên {$a.ten} đổ mạt đá thành một khuôn miệng. Khuôn lặp lại câu cũ mỗi khi ngươi định nói một lời khác.

### Lựa chọn

- **1. Nói nốt câu mà ngày ấy ngươi đã nuốt**
  Ngươi nói trọn điều ngày trước không dám nhận. Khuôn miệng vỡ, Nguyên Anh đau nhói khiến ngươi phải dưỡng một đêm. Người khắc tên không hỏi chuyện ấy; lão chỉ lấy nước cho ngươi.
  - `e`: `{"hd":{"p":3},"ng":{"g":3},"an":["a","vết đục hình miệng"],"hp":"-15%","tamma":-6}`
- **2. Mua khuôn để cất câu cũ**
  Từ nay ngươi nói dễ hơn. Đến lúc im lặng, trong tay áo mới bắt đầu có tiếng.
  - `cost`: `{"st":19}`
  - `e`: `{"tamma":4}`
- **3. Bỏ đi**
  Lão úp chén. Cái miệng mạt đá ịn ra trên mặt bàn.

### Lịch sử và nhánh

```json
{
  "id": "buc_tuong_nghe_ten_minh",
  "part": "2",
  "waitHours": 504,
  "needs": [
    0
  ],
  "paths": null
}
```

<a id="ch_buc_tuong_nghe_ten_minh_2b"></a>
## Tên bị mài mất nửa — `ch_buc_tuong_nghe_ten_minh_2b`

- Loại: story; nguồn: Khám phá; chủ đề: Tên tuổi; cảm xúc: Bi thương.
- Nơi: ma địa, phế tích, hang động.
- Điều kiện: tầng 3, 4; chuỗi buc_tuong_nghe_ten_minh / phần 2b; chờ ≥ 504 giờ; một lần/kiếp.
- Bối cảnh tác giả: Dãy bia ở Cửu U Ma Vực.
- Vai: `{"a":{"gender":"nam","role":"Người khắc tên","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Người khắc tên {$a.ten} thú nhận lão lấy tên một người đã chết để trốn món nợ của mình. Trên bia người ấy, lão mài đến nửa chữ thì thôi.

### Lựa chọn

- **1. Giữ tay lão và đòi nghe tên thật**
  Ngươi giữ tay lão, nghe lão đọc tên thật và lý do phải trốn. Ngươi không nhận giữ kín thay lão, chỉ nhắc tên người chết phải trả lại. Lão bỏ đục xuống, lần đầu đọc được trọn tên trên bia.
  - `e`: `{"hd":{"p":3},"ng":{"g":3},"an":["a","tên bị mài mất nửa"]}`
- **2. Mua cái tên đã lấy để qua cổng vực**
  Ngươi có tên dùng một lần. Lão chỉ ngươi chỗ khắc, để tránh đục lên nửa chữ cũ.
  - `cost`: `{"st":19}`
  - `e`: `{"hd":{"t":1}}`
- **3. Bỏ đi**
  Mưa phủ lên bia. Nửa chữ đọc được đổi màu trước.

### Lịch sử và nhánh

```json
{
  "id": "buc_tuong_nghe_ten_minh",
  "part": "2b",
  "waitHours": 504,
  "needs": [
    1
  ],
  "paths": null
}
```

<a id="ch_buc_tuong_nghe_ten_minh_3"></a>
## Tiếng gọi từ cầu treo — `ch_buc_tuong_nghe_ten_minh_3`

- Loại: story; nguồn: Khám phá; chủ đề: Tâm ma; cảm xúc: Căng thẳng.
- Nơi: ma địa.
- Điều kiện: tầng 3, 4; chuỗi buc_tuong_nghe_ten_minh / phần 3; chờ ≥ 4320 giờ; một lần/kiếp.
- Bối cảnh tác giả: Cầu treo ở Cửu U Ma Vực.
- Vai: `{"a":{"gender":"nam","role":"người khắc tên","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Cầu gọi người đi qua bằng những tên họ từng bỏ lại. Nếu ngươi đã nói thật, tiếng gọi chỉ níu người khắc tên {$a.ten}. Nếu đã mua khuôn hoặc tên, nó vọng lên từ cả dây ngươi đang nắm.

### Lựa chọn

- **1. Đọc tên đang mang và dìu lão qua**
  Ngươi đọc rõ tên đang mang, dìu lão qua từng bước. Dây cầu siết cổ tay tới bật máu rồi lỏng ra. Sang bờ, ngươi bảo lão tự gọi lại tên mình; lần này tiếng đáp từ hẻm không đổi thành tên người khác.
  - `e`: `{"hd":{"p":3},"ng":{"g":3},"hp":"-10%"}`
- **2. Cắt một sợi dây có tiếng vọng**
  Ngươi mang được một đoạn dây luyện phù. Những người sau phải bò qua cầu, tai sát mặt ván.
  - `e`: `{"hd":{"t":3},"ng":{"b":1},"namedMat":"story_mat_buc_tuong_nghe_ten_minh_3"}`
- **3. Bỏ đi**
  Tiếng gọi theo đến đầu cầu, rồi gọi tiếp một người chưa tới.

### Lịch sử và nhánh

```json
{
  "id": "buc_tuong_nghe_ten_minh",
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

<a id="ch_buc_tuong_nghe_ten_minh_4"></a>
## Chữ đặt vừa một miệng — `ch_buc_tuong_nghe_ten_minh_4`

- Loại: story; nguồn: Khám phá; chủ đề: Trả tên; cảm xúc: Lắng dịu.
- Nơi: ma địa.
- Điều kiện: tầng 3, 4; chuỗi buc_tuong_nghe_ten_minh / phần 4; chờ ≥ 25920 giờ; một lần/kiếp.
- Bối cảnh tác giả: Ngách khắc đá ở Cửu U Ma Vực.
- Vai: `{"a":{"gender":"nam","role":"story_person","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Nếu lão tự đọc tên, lão mở chỗ khắc bài vị cho người không có ai nhớ. Nếu cầu bị cắt, lão nhặt tiếng rơi từ hẻm, viết mỗi tiếng lên một phiến đá nhỏ.

### Lựa chọn

- **1. Nói lại lời cũ hoặc khắc lại nửa tên đã mất**
  Ngươi phải nghe trọn lời cũ trước khi đặt đục xuống. Lão chừa khoảng trống đúng chỗ chữ vừa khép.
  - `e`: `{"hd":{"p":3},"ng":{"g":3},"tamma":-3}`
- **2. Xin giữ một phiến đá chưa có tên**
  Ngươi có vật giữ lời tự nhắc. Khi cầm lên, mặt đá ấm ngang miệng.
  - `e`: `{"tam":1}`
- **3. Bỏ đi**
  Lão tiễn ngươi bằng tên thật. Ngươi đáp lời, rồi nghe lão quay lại hỏi người khách kế tiếp muốn khắc tên ai.

### Lịch sử và nhánh

```json
{
  "id": "buc_tuong_nghe_ten_minh",
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
