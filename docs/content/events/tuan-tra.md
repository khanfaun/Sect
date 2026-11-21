# content/events/tuan-tra.json

Nguồn chuẩn: `content/events/tuan-tra.json`. Bản đọc tự sinh. Cú pháp: xem [guideline](../GUIDELINE.md).

<a id="tr_hoi"></a>
## Bị hỏi han — `tr_hoi`

- Loại: event; nguồn: Tuần tra; chủ đề: Tông môn; cảm xúc: không gắn nhãn.
- Nơi: *.
- Điều kiện: mọi tầng; nghỉ 720 giờ.
- Bối cảnh tác giả: *.
- Vai: `{"a":{"role":"tre","alignment":"context"}}`.
- Xuất xứ: `d9ab301` / `src/game/core/15-thu-trieu.js`.

1. {$en} chặn ngươi lại. Kẻ cầm đầu, {$a.ten}, hỏi: “Từ đâu tới? Tới đây làm gì?”

### Lựa chọn

- **1. Trả lời tử tế**
  {$a.ten} gật đầu, ghi vào sổ rồi cho qua. Trước khi đi còn chỉ đường giúp ngươi.
  - `e`: `{"rumor":1}`
- **2. Đáp xấc**
  - `chk`: `["tam",11]`
  - **Thành công**: Bị ngươi nhìn chằm chằm, {$a.ten} ngượng ngùng tránh đường.
    `{"e":{"tam":1}}`
  - **Thất bại**: “Láo!” {$a.ten} rút kiếm.
    `{"fight":{"k":"detu","n":"{$a.ten}","spar":1},"win":{"t":"Đánh bại đệ tử tuần tra. Ngươi biết từ nay sơn môn đó sẽ nhớ mặt ngươi.","e":{"tv":4,"oan":["a","làm nhục giữa đường"]}},"lose":{"t":"Bị đánh một trận, ngươi biết điều hơn.","e":{"tv":2}}}`
- **3. Cáo từ, tiếp tục lên đường**
  Ngươi chọn rời khỏi nơi này, không can dự thêm.

### Nối cơ chế

```json
{
  "variables": {
    "$hook": "tr_hoi_v"
  }
}
```

<a id="tr_luan"></a>
## Luận võ với đệ tử tuần tra — `tr_luan`

- Loại: event; nguồn: Tuần tra; chủ đề: Tông môn; cảm xúc: không gắn nhãn.
- Nơi: *.
- Điều kiện: mọi tầng; nghỉ 720 giờ.
- Bối cảnh tác giả: *.
- Vai: `{"a":{"role":"tre","alignment":"context"}}`.
- Xuất xứ: `d9ab301` / `src/game/core/15-thu-trieu.js`.

1. {$a.ten} của {$en} nhìn ngươi đầy hứng thú: “Đạo hữu có vẻ không tầm thường. Thử vài chiêu chứ?”

### Lựa chọn

- **1. Luận võ**
  - `fight`: `{"k":"detu","n":"{$a.ten}","spar":1}`
  - **Thắng trận**: {$a.ten} chắp tay phục. Hai người trao đổi tâm đắc tới tận chiều.
    `{"e":{"tv":6,"an":["a","chỉ điểm võ nghệ"]}}`
  - **Thua trận**: {$a.ten} thu kiếm, cười: “Đạo hữu còn non.”
    `{"e":{"tv":3}}`
- **2. Từ chối**
  Ngươi chắp tay xin kiếu.

### Nối cơ chế

```json
{
  "variables": {
    "$hook": "tr_luan_v"
  }
}
```

<a id="tr_bat"></a>
## Truy bắt — `tr_bat`

- Loại: event; nguồn: Tuần tra; chủ đề: Tông môn; cảm xúc: không gắn nhãn.
- Nơi: *.
- Điều kiện: mọi tầng; nghỉ 720 giờ.
- Bối cảnh tác giả: *.
- Vai: `{"a":{"role":"tre","alignment":"context"}}`.
- Xuất xứ: `d9ab301` / `src/game/core/15-thu-trieu.js`.

1. {$en} vây kín bốn phía. {$a.ten} giơ lên một tờ cáo thị: “Kẻ này, đúng là ngươi.”

### Lựa chọn

- **1. Phá vây**
  - `fight`: `{"k":"detu","cnt":2}`
  - **Thắng trận**: Ngươi phá vây mà đi. Lệnh truy nã sẽ còn dán khắp nơi.
    `{"e":{"tv":6,"hd":{"t":3}}}`
- **2. Đút lót**
  {$a.ten} nhìn túi linh thạch, quay mặt đi. “Hôm nay không thấy ai cả.”
  - `cost`: `{"st":30}`
  - `e`: `{"deed":"lua_loi"}`
- **3. Chịu phạt**
  Ngươi bị giữ lại ba ngày, chép kinh sám hối.
  - `e`: `{"h":72,"deed":"sam_hoi","tamma":-4}`
- **4. Cáo từ, tiếp tục lên đường**
  Ngươi chọn rời khỏi nơi này, không can dự thêm.

### Nối cơ chế

```json
{
  "variables": {
    "$hook": "tr_bat_v"
  },
  "condition": {
    "$hook": "tr_bat_cond"
  }
}
```

<a id="tr_giup"></a>
## Đệ tử bị thương — `tr_giup`

- Loại: event; nguồn: Tuần tra; chủ đề: Tông môn; cảm xúc: không gắn nhãn.
- Nơi: *.
- Điều kiện: mọi tầng; nghỉ 720 giờ.
- Bối cảnh tác giả: *.
- Vai: `{"a":{"role":"tre","alignment":"context"}}`.
- Xuất xứ: `d9ab301` / `src/game/core/15-thu-trieu.js`.

1. Trong nhóm {$en} có một người bị thương nặng. {$a.ten} hỏi ngươi có thuốc không.

### Lựa chọn

- **1. Cho một viên đan hồi khí huyết**
  Thương thế ổn lại. {$a.ten} nói muốn đi cùng ngươi một đoạn để trả ơn.
  - `cost`: `{"pillGroup":"healing"}`
  - `e`: `{"deed":"cuu_nguoi","party":{"k":"a","days":20}}`
- **2. Truyền linh lực giúp**
  Người kia tỉnh lại. {$a.ten} cúi đầu cảm tạ.
  - `cost`: `{"mp":"40%"}`
  - `e`: `{"deed":"cuu_nguoi","an":["a","cứu sư huynh đệ"]}`
- **3. Không giúp**
  Ngươi đi qua.

### Nối cơ chế

```json
{
  "variables": {
    "$hook": "tr_giup_v"
  }
}
```

<a id="tr_moi"></a>
## Lời mời của sơn môn — `tr_moi`

- Loại: event; nguồn: Tuần tra; chủ đề: Tông môn; cảm xúc: không gắn nhãn.
- Nơi: *.
- Điều kiện: mọi tầng; nghỉ 720 giờ.
- Bối cảnh tác giả: *.
- Vai: `{"a":{"role":"gia","alignment":"context"}}`.
- Xuất xứ: `d9ab301` / `src/game/core/15-thu-trieu.js`.

1. Đi cùng {$en} có một trưởng lão, {$a.look}. {$a.hn} nhìn ngươi hồi lâu: “Căn cốt không tệ. Có muốn về núi không?”

### Lựa chọn

- **1. Theo về sơn môn**
  Ngươi được nhận làm đệ tử ngoại môn. Từ nay vào được Tàng Kinh Các.
  - `e`: `{"flag":"tongmon","relic":"lenhtong","h":48}`
- **2. Từ chối**
  Ngươi quen một mình rồi.
  - `e`: `{"tam":1}`

### Nối cơ chế

```json
{
  "variables": {
    "$hook": "tr_moi_v"
  },
  "condition": {
    "$hook": "tr_moi_cond"
  }
}
```

<a id="tr_kiem"></a>
## Khám xét — `tr_kiem`

- Loại: event; nguồn: Tuần tra; chủ đề: Tông môn; cảm xúc: không gắn nhãn.
- Nơi: *.
- Điều kiện: mọi tầng; nghỉ 720 giờ.
- Bối cảnh tác giả: *.
- Vai: `{"a":{"role":"tre","alignment":"context"}}`.
- Xuất xứ: `d9ab301` / `src/game/core/15-thu-trieu.js`.

1. “Gần đây có kẻ trộm bảo vật của bổn môn.” {$a.ten} nhìn túi trữ vật của ngươi. “Mở ra.”

### Lựa chọn

- **1. Cho khám**
  Không tìm thấy gì. {$a.ten} xin lỗi rồi cho ngươi đi.
  - `e`: `{"h":1}`
- **2. Chạy**
  - `chk`: `["tp",11]`
  - **Thành công**: Ngươi chạy mất dạng.
    `{"e":{"hd":{"t":1}}}`
  - **Thất bại**: Bị đuổi kịp.
    `{"fight":{"k":"detu","cnt":2},"win":{"t":"Thoát được, nhưng giờ thì thật sự là kẻ thù.","e":{"hd":{"t":1}}}}`
- **3. Cáo từ, tiếp tục lên đường**
  Ngươi chọn rời khỏi nơi này, không can dự thêm.

### Nối cơ chế

```json
{
  "variables": {
    "$hook": "tr_kiem_v"
  }
}
```
