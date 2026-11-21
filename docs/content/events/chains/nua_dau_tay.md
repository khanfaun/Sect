# content/events/chains/nua_dau_tay.json

Nguồn chuẩn: `content/events/chains/nua_dau_tay.json`. Bản đọc tự sinh. Cú pháp: xem [guideline](../../GUIDELINE.md).

<a id="ch_nua_dau_tay_1"></a>
## Giấy bán thân — `ch_nua_dau_tay_1`

- Loại: story; nguồn: Khám phá; chủ đề: Chuyện gia đình; cảm xúc: Xót xa.
- Nơi: thôn trấn, thành trì.
- Điều kiện: tầng 0; chuỗi nua_dau_tay / phần 1; một lần/kiếp.
- Bối cảnh tác giả: Cổng nhà giàu ở Phàm Trần.
- Vai: `{"a":{"gender":"nu","role":"Người mẹ","alignment":"context"},"c":{"gender":"nam","role":"Chủ nợ","alignment":"context"},"b":{"gender":"nam","role":"Cậu bé","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Người mẹ {$a.ten} nhận trước tiền công hai mùa để nuôi con, nay tới nhà chủ nợ {$c.ten} ký giấy làm trả nợ. Cậu bé {$b.ten} níu tay bà, khiến dấu ngón cái chỉ in được một nửa. Chủ nợ đẩy nghiên mực lại: “Ấn cho rõ, rồi hãy nhận tiền.”

### Lựa chọn

- **1. Chuộc tờ giấy**
  Ngươi bỏ bạc cho {$c.ten}. {$a.ten} xé phần giấy có dấu mực và giữ lại một mảnh bằng móng tay.
  - `cost`: `{"st":10}`
  - `e`: `{"hd":{"p":3},"ng":{"g":3},"an":["a","giấy bán thân"]}`
- **2. Để bà ký và làm chứng**
  {$c.ten} gạch bớt một mùa công để có chữ của ngươi. {$b.ten} nhặt giẻ lau ngón tay mẹ, để lại một vệt đen trên tay mình.
  - `e`: `{"hd":{"p":1},"ng":{"g":1}}`
- **3. Bỏ đi**
  Cậu bé bị gỡ tay ra. Lần này dấu ngón cái in trọn dưới giá bạc.

### Lịch sử và nhánh

```json
{
  "id": "nua_dau_tay",
  "part": "1",
  "waitHours": 0,
  "needs": [],
  "paths": null
}
```

<a id="ch_nua_dau_tay_2"></a>
## Trục nước — `ch_nua_dau_tay_2`

- Loại: story; nguồn: Khám phá; chủ đề: Sinh kế; cảm xúc: Ấm áp.
- Nơi: sông hồ, thôn trấn.
- Điều kiện: tầng 0, 1, 2, 3, 4; chuỗi nua_dau_tay / phần 2; chờ ≥ 2160 giờ; một lần/kiếp.
- Bối cảnh tác giả: Bến xay bột ở Phàm Trần.
- Vai: `{"a":{"gender":"nu","role":"Người mẹ","alignment":"context"},"c":{"gender":"nam","role":"story_person","alignment":"context"},"b":{"gender":"nam","role":"Cậu bé","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Thoát món nợ cũ, người mẹ {$a.ten} góp tiền công với hàng xóm mua lại cối nước bỏ hoang. Cậu bé {$b.ten} đang học sửa guồng, thấy ngươi liền chạy ra đón: “Cối sắp chạy được rồi!”

### Lựa chọn

- **1. Góp một trục gỗ mới**
  Ngươi mua giúp một trục gỗ đủ già để chịu nước. Cậu bé theo thợ lắp từ sáng đến chiều, khắc dấu nửa vòng ở đầu trục để nhớ chiều quay.
  - `cost`: `{"st":10}`
  - `e`: `{"hd":{"p":3},"ng":{"g":3}}`
- **2. Cho họ vay bằng tiền công xay**
  Họ mua đủ gỗ, đổi lại phải xay phần thóc của ngươi trước mỗi phiên. {$a.ten} khâu riêng một bao đựng phần ấy.
  - `e`: `{"st":14,"hd":{"t":1}}`
- **3. Bỏ đi**
  Cối vẫn chạy bằng trục cũ. Lần cuối ngươi ngoái lại, cậu bé còn ngồi mài cái chốt bị vênh.

### Lịch sử và nhánh

```json
{
  "id": "nua_dau_tay",
  "part": "2",
  "waitHours": 2160,
  "needs": [
    0
  ],
  "paths": null
}
```

<a id="ch_nua_dau_tay_2b"></a>
## Hai túi cám — `ch_nua_dau_tay_2b`

- Loại: story; nguồn: Khám phá; chủ đề: Chuyện chủ nợ; cảm xúc: Uất ức.
- Nơi: thôn trấn, thành trì.
- Điều kiện: tầng 0, 1, 2, 3, 4; chuỗi nua_dau_tay / phần 2b; chờ ≥ 2160 giờ; một lần/kiếp.
- Bối cảnh tác giả: Sân nhà phơi cám ở Phàm Trần.
- Vai: `{"a":{"gender":"nu","role":"Người mẹ","alignment":"context"},"c":{"gender":"nam","role":"Chủ nợ","alignment":"context"},"b":{"gender":"nam","role":"Cậu bé","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Chủ nợ {$c.ten} giữ hết tiền công vì bảo một mùa rét năm ấy dài hơn lệ. Người mẹ {$a.ten} xin hai túi cám đem về, mỗi túi chỉ đầy đến lưng chừng.

### Lựa chọn

- **1. Đòi trả công theo tờ giấy đã ký**
  Ngươi đem tờ giấy làm chứng ra đối lại ngày công. Chủ nợ phải trả đủ, nhưng đuổi hai mẹ con khỏi cối. Người mẹ nhận tiền, nói sẽ sang bến khác tìm việc; cậu bé xin mang theo chiếc trục hỏng để học sửa.
  - `e`: `{"hd":{"p":3},"ng":{"g":3}}`
- **2. Trả bạc mua lại mùa công còn thiếu**
  Hai người được về. Cậu bé {$b.ten} vác cả hai túi cám, đi tới cổng mới nhận ra mình vẫn chưa đặt chúng xuống.
  - `cost`: `{"st":10}`
  - `e`: `{"hd":{"p":3},"ng":{"g":3}}`
- **3. Bỏ đi**
  {$c.ten} buộc lại hai miệng túi, rút phần dây thừa bỏ vào tay áo.

### Lịch sử và nhánh

```json
{
  "id": "nua_dau_tay",
  "part": "2b",
  "waitHours": 2160,
  "needs": [
    1
  ],
  "paths": null
}
```

<a id="ch_nua_dau_tay_3"></a>
## Bột đọng đáy bao — `ch_nua_dau_tay_3`

- Loại: story; nguồn: Khám phá; chủ đề: Cứu đói; cảm xúc: Căng thẳng.
- Nơi: thôn trấn, thành trì.
- Điều kiện: tầng 0, 1, 2, 3, 4; chuỗi nua_dau_tay / phần 3; chờ ≥ 25920 giờ; một lần/kiếp.
- Bối cảnh tác giả: Kho lương ven quan đạo ở Phàm Trần.
- Vai: `{"a":{"gender":"nu","role":"story_person","alignment":"context"},"c":{"gender":"nam","role":"chủ nợ","alignment":"context"},"b":{"gender":"nam","role":"Cậu bé","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Cậu bé {$b.ten} năm xưa đã mở được một kho bột từ tiền xay thuê. Dân mất mùa tới xin mua chịu, còn chủ nợ {$c.ten} trả giá gấp đôi để gom hết hàng. Nếu ngươi từng góp trục, cậu khoe chiếc cối vẫn dùng trục ngươi mua. Nếu ngươi từng cho vay, cậu nói khoản vay đã trả đủ bằng tiền công xay những năm trước. Nếu từng giúp ở sân phơi cám, cậu nhắc hai mẹ con đã dùng tiền công ấy gây dựng lại từ đầu.

### Lựa chọn

- **1. Mua bột chia cho dân đói**
  Ngươi trả tiền mua một phần bột phát cho dân. Cậu tự góp thêm, chia mỗi nhà đủ ăn vài ngày để kho vẫn còn hàng bán. Chủ nợ thấy không gom trọn được nữa, thu cân bỏ đi.
  - `cost`: `{"st":10}`
  - `e`: `{"deed":"phat_chan"}`
- **2. Khuyên cậu bán cho {$c.ten}**
  Cậu có vốn qua mùa sau và chia tiền môi giới cho ngươi. Cậu mở cửa sau cho người tới quét nền kho, nơi bột còn đọng trong kẽ gạch.
  - `e`: `{"st":14,"deed":"lua_loi"}`
- **3. Bỏ đi**
  Cậu xin dân chờ để tính lại lượng bột. Người mua chịu đứng thành hàng trước kho; không ai muốn về tay không.

### Lịch sử và nhánh

```json
{
  "id": "nua_dau_tay",
  "part": "3",
  "waitHours": 25920,
  "needs": [],
  "paths": [
    [
      "2:0"
    ],
    [
      "2:1"
    ],
    [
      "2b:0",
      "2b:1"
    ]
  ]
}
```

<a id="ch_nua_dau_tay_4"></a>
## Hòn kê dưới ghế — `ch_nua_dau_tay_4`

- Loại: story; nguồn: Khám phá; chủ đề: Hậu quả nhân tình; cảm xúc: Trầm buồn.
- Nơi: thôn trấn, thành trì.
- Điều kiện: tầng 0, 1, 2, 3, 4; xuan; chuỗi nua_dau_tay / phần 4; chờ ≥ 4320 giờ; một lần/kiếp.
- Bối cảnh tác giả: Sân nhà mới ở Phàm Trần.
- Vai: `{"a":{"gender":"nu","role":"Người mẹ","alignment":"context"},"c":{"gender":"nam","role":"story_person","alignment":"context"},"b":{"gender":"nam","role":"story_person","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Nếu ngươi từng chia bột cứu đói, dân qua vụ mới đem quà tới cảm ơn hai mẹ con. Nếu bột từng bán cho chủ nợ, cậu đã có vốn mua thóc mới nhưng người nghèo vẫn phải xin mua chịu. Người mẹ {$a.ten} mời ngươi ngồi, lấy đá kê chiếc ghế thấp. Cậu hỏi ngươi có muốn cùng bỏ vốn mở thêm một cối xay.

### Lựa chọn

- **1. Đứng tên bảo cho người mua chịu**
  Ngươi đặt tiền bảo lãnh cho những nhà chưa trả được ngay. Cậu ghi rõ hạn và số bột từng nhà, mẹ cậu ngồi bên đọc lại để không ai bị tính nhầm.
  - `cost`: `{"st":10}`
  - `e`: `{"hd":{"p":3},"ng":{"g":3}}`
- **2. Nhận tiền công xem giúp sổ sách**
  Ngươi kiểm lại sổ thu chi và chỉ cậu cách để riêng tiền mua thóc giống. Hai mẹ con trả công đã thỏa thuận. Khoản giúp dân năm trước được ghi là cho tặng, không tính thành nợ.
  - `e`: `{"st":14}`
- **3. Bỏ đi**
  Ngươi chúc cối mới làm ăn khá rồi cáo từ. Cậu tiễn ra cổng, hẹn vụ sau ghé ăn bữa cơm.

### Lịch sử và nhánh

```json
{
  "id": "nua_dau_tay",
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
