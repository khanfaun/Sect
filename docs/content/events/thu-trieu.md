# content/events/thu-trieu.json

Nguồn chuẩn: `content/events/thu-trieu.json`. Bản đọc tự sinh. Cú pháp: xem [guideline](../GUIDELINE.md).

<a id="tt_chan"></a>
## Thú triều ập tới — `tt_chan`

- Loại: event; nguồn: Thú triều; chủ đề: Thú triều; cảm xúc: không gắn nhãn.
- Nơi: *.
- Điều kiện: mọi tầng; nghỉ 720 giờ.
- Bối cảnh tác giả: *.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/core/15-thu-trieu.js`.

1. Mặt đất rung lên. {$en} tràn tới như nước vỡ bờ, mắt đỏ rực, nhắm thẳng hướng thôn trấn gần nhất.

2. Bụi mù che kín trời. {$en} đang lao qua, cây cối đổ rạp theo từng bước chạy.

### Lựa chọn

- **1. Chặn thú triều lại**
  - `fight`: `{"k":"beast","cnt":3}`
  - **Thắng trận**: Con đầu đàn ngã xuống, cả bầy tan rã. Thôn trấn phía sau sẽ không bao giờ biết mình vừa thoát nạn.
    `{"e":{"entGone":1,"tv":8,"deed":"cuu_nguoi_hy_sinh","st":20}}`
- **2. Tránh đường**
  Ngươi nép vào vách đá cho tới khi bầy thú chạy qua. Phía trước có ai đó sẽ không may.
  - `e`: `{"tamma":3}`

<a id="tt_vua"></a>
## Thú vương dẫn đàn — `tt_vua`

- Loại: event; nguồn: Thú triều; chủ đề: Thú triều; cảm xúc: không gắn nhãn.
- Nơi: *.
- Điều kiện: mọi tầng; nghỉ 720 giờ.
- Bối cảnh tác giả: *.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/core/15-thu-trieu.js`.

1. Giữa {$en} có một con thú to gấp ba con khác, sừng như cây khô. Nó dừng lại, nhìn ngươi.

### Lựa chọn

- **1. Giết con đầu đàn**
  - `fight`: `{"k":"beast","cnt":2,"elite":1,"m":1.1}`
  - **Thắng trận**: Thú vương gục xuống. Bầy thú hoảng loạn, chạy về núi.
    `{"e":{"entGone":1,"tv":12,"relic":0}}`
- **2. Nhìn thẳng vào mắt nó**
  - `chk`: `["tam",12]`
  - **Thành công**: Rất lâu sau, thú vương quay đầu. Cả bầy theo nó rút về rừng.
    `{"e":{"entGone":1,"tam":1,"hd":{"p":3}}}`
  - **Thất bại**: Nó gầm lên, lao tới.
    `{"fight":{"k":"beast","cnt":3},"win":{"t":"Ngươi đứng giữa xác thú, thở dốc.","e":{"entGone":1,"tv":8}}}`
- **3. Lùi lại**
  Ngươi lùi từng bước. Nó không đuổi theo.
- **4. Cáo từ, tiếp tục lên đường**
  Ngươi chọn rời khỏi nơi này, không can dự thêm.

<a id="tt_dan"></a>
## Dân chạy loạn — `tt_dan`

- Loại: event; nguồn: Thú triều; chủ đề: Thú triều; cảm xúc: không gắn nhãn.
- Nơi: *.
- Điều kiện: mọi tầng; nghỉ 720 giờ.
- Bối cảnh tác giả: *.
- Vai: `{"a":{"role":"pham","alignment":"context"}}`.
- Xuất xứ: `d9ab301` / `src/game/core/15-thu-trieu.js`.

1. Một đoàn người già trẻ chạy ngược lại, gánh gồng lỉnh kỉnh. {$a.ten} hét lên: “Thú triều! Chạy đi!”

### Lựa chọn

- **1. Hộ tống dân chạy nạn**
  Ngươi dẫn họ đi đường tắt qua núi. Đi tới đâu, người ta lạy tới đó.
  - `e`: `{"h":12,"deed":"cuu_nguoi","an":["a","cứu cả nhà khỏi thú triều"]}`
- **2. Quay lại chặn thú**
  - `fight`: `{"k":"beast","cnt":3}`
  - **Thắng trận**: Ngươi chặn được thú triều. Đám dân quay lại, mang theo rượu và gà.
    `{"e":{"entGone":1,"tv":8,"deed":"cuu_nguoi","st":15}}`
- **3. Mặc kệ**
  Ngươi đi tiếp. Tiếng trẻ con khóc mãi sau lưng.
  - `e`: `{"tamma":3}`
- **4. Cáo từ, tiếp tục lên đường**
  Ngươi chọn rời khỏi nơi này, không can dự thêm.

### Nối cơ chế

```json
{
  "variables": {
    "$hook": "tt_dan_v"
  }
}
```

<a id="tt_bay"></a>
## Đặt bẫy trước thú triều — `tt_bay`

- Loại: event; nguồn: Thú triều; chủ đề: Thú triều; cảm xúc: không gắn nhãn.
- Nơi: *.
- Điều kiện: mọi tầng; nghỉ 720 giờ.
- Bối cảnh tác giả: *.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/core/15-thu-trieu.js`.

1. {$en} còn cách nửa ngày đường. Đủ thời gian cho một kẻ biết làm bẫy.

### Lựa chọn

- **1. Bày trận bẫy**
  - `chk`: `["ngo",11]`
  - **Thành công**: Bầy thú lao vào hố chông, con trước đè con sau. Phần còn lại tan tác.
    `{"e":{"entGone":1,"tv":6,"st":25,"h":6}}`
  - **Thất bại**: Bẫy sụp quá sớm. Bầy thú vòng qua, lao về phía ngươi.
    `{"fight":{"k":"beast","cnt":2},"win":{"t":"Đánh tan được cả đàn, mệt muốn đứt hơi.","e":{"entGone":1,"tv":6}}}`
- **2. Bỏ đi**
  Một mình ngươi không ngăn nổi trời.

<a id="tt_cuu"></a>
## Đứa trẻ giữa đường — `tt_cuu`

- Loại: event; nguồn: Thú triều; chủ đề: Thú triều; cảm xúc: không gắn nhãn.
- Nơi: *.
- Điều kiện: mọi tầng; nghỉ 720 giờ.
- Bối cảnh tác giả: *.
- Vai: `{"a":{"role":"hai","alignment":"context"}}`.
- Xuất xứ: `d9ab301` / `src/game/core/15-thu-trieu.js`.

1. {$en} sắp tràn qua. Giữa đường có một đứa trẻ ngồi khóc, {$a.look}.

### Lựa chọn

- **1. Ôm đứa trẻ chạy**
  - `chk`: `["tp",10]`
  - **Thành công**: Ngươi chạy như bay, bầy thú sượt qua sau lưng. Đứa bé ôm cổ ngươi không buông.
    `{"e":{"deed":"cuu_nguoi_hy_sinh","an":["a","cứu giữa thú triều"]}}`
  - **Thất bại**: Chậm một bước. Bầy thú cắn xé, ngươi che cho đứa bé bằng chính lưng mình.
    `{"e":{"hp":"-35%","deed":"cuu_nguoi_hy_sinh","an":["a","cứu giữa thú triều"]}}`
- **2. Không kịp nữa**
  Ngươi quay mặt đi.
  - `e`: `{"tamma":8}`

### Nối cơ chế

```json
{
  "variables": {
    "$hook": "tt_cuu_v"
  }
}
```

<a id="tt_tron"></a>
## Theo dấu thú triều — `tt_tron`

- Loại: event; nguồn: Thú triều; chủ đề: Thú triều; cảm xúc: không gắn nhãn.
- Nơi: *.
- Điều kiện: mọi tầng; nghỉ 720 giờ.
- Bối cảnh tác giả: *.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/core/15-thu-trieu.js`.

1. Dấu chân của {$en} còn mới. Thú chạy loạn thường bỏ lại thứ gì đó.

### Lựa chọn

- **1. Lần theo nhặt nhạnh**
  - **Khả năng 1**: Ngươi nhặt được mấy viên yêu đan rơi vãi. `{"w":2,"e":{"st":20,"h":4}}`
  - **Khả năng 2**: Một con thú tụt lại, quay đầu cắn ngươi. `{"w":1,"fight":{"k":"beast"},"win":{"t":"Thêm một viên yêu đan.","e":{"st":12}}}`
- **2. Tránh xa**
  Ngươi đi đường khác.
