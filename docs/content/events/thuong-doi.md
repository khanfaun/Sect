# content/events/thuong-doi.json

Nguồn chuẩn: `content/events/thuong-doi.json`. Bản đọc tự sinh. Cú pháp: xem [guideline](../GUIDELINE.md).

<a id="td_mua"></a>
## Thương đội dừng chân — `td_mua`

- Loại: event; nguồn: Thương đội; chủ đề: Giao thương; cảm xúc: không gắn nhãn.
- Nơi: *.
- Điều kiện: mọi tầng; nghỉ 720 giờ.
- Bối cảnh tác giả: *.
- Vai: `{"a":{"role":"thuong","alignment":"context"}}`.
- Xuất xứ: `d9ab301` / `src/game/core/14-thien-lo.js`.

1. Tiếng chuông lạc đà leng keng. {$en} dừng lại bên đường, {$a.ten} vẫy tay gọi ngươi: “{$a.goi}, xem hàng không? Rẻ hơn trong thành.”

2. Đoàn xe của {$en} nghỉ chân dưới gốc cây. Hàng hóa bày ra trên tấm vải bạt, có cả thứ ngươi chưa thấy bao giờ.

### Lựa chọn

- **1. Xem hàng**
  {$a.ten} mở từng hòm, vừa mở vừa kể lai lịch từng món.
  - `e`: `{"shop":1}`
- **2. Chào rồi đi tiếp**
  Ngươi gật đầu chào. Đoàn xe lại lục tục lên đường.

### Nối cơ chế

```json
{
  "variables": {
    "$hook": "td_mua_v"
  }
}
```

<a id="td_hotong"></a>
## Thuê hộ tống — `td_hotong`

- Loại: event; nguồn: Thương đội; chủ đề: Giao thương; cảm xúc: không gắn nhãn.
- Nơi: *.
- Điều kiện: mọi tầng; nghỉ 720 giờ.
- Bối cảnh tác giả: *.
- Vai: `{"a":{"role":"thuong","alignment":"context"}}`.
- Xuất xứ: `d9ab301` / `src/game/core/14-thien-lo.js`.

1. {$a.ten}, chủ {$en}, chặn ngươi lại: “Đoạn đường trước mặt có cướp. Đi cùng chúng ta một quãng, trả công hậu hĩnh.”

### Lựa chọn

- **1. Nhận lời**
  - **Khả năng 1**: Một ngày một đêm, không có chuyện gì. {$a.ten} trả đủ công, còn dúi thêm một viên đan. `{"w":3,"e":{"h":24,"st":22,"pill":1,"an":["a","hộ tống qua đoạn đường nguy hiểm"]}}`
  - **Khả năng 2**: Đúng như lời đồn, bọn cướp xông ra giữa đường. `{"w":2,"fight":{"k":"sontac","cnt":2},"win":{"t":"Bọn cướp tháo chạy. {$a.ten} vái ngươi ba vái, trả gấp đôi tiền công.","e":{"st":40,"karma":4,"an":["a","đánh lui bọn cướp"]}}}`
- **2. Từ chối**
  Ngươi lắc đầu. {$a.ten} thở dài, cho đoàn xe đi vòng.

### Nối cơ chế

```json
{
  "variables": {
    "$hook": "td_hotong_v"
  }
}
```

<a id="td_tin"></a>
## Tin từ phương xa — `td_tin`

- Loại: event; nguồn: Thương đội; chủ đề: Giao thương; cảm xúc: không gắn nhãn.
- Nơi: *.
- Điều kiện: mọi tầng; nghỉ 720 giờ.
- Bối cảnh tác giả: *.
- Vai: `{"a":{"role":"thuong","alignment":"context"}}`.
- Xuất xứ: `d9ab301` / `src/game/core/14-thien-lo.js`.

1. Người dắt lạc đà của {$en} là kẻ lắm mồm. Chưa hỏi đã kể, kể không ngừng.

### Lựa chọn

- **1. Mời một chén trà, nghe kể**
  Gã kể chuyện khắp nơi, thật có giả có.
  - `cost`: `{"st":2}`
  - `e`: `{"rumor":2,"h":1}`
- **2. Bỏ đi**
  Ngươi đi tiếp, sau lưng vẫn còn tiếng gã kể.

### Nối cơ chế

```json
{
  "variables": {
    "$hook": "td_tin_v"
  }
}
```

<a id="td_doi"></a>
## Đổi hàng — `td_doi`

- Loại: event; nguồn: Thương đội; chủ đề: Giao thương; cảm xúc: không gắn nhãn.
- Nơi: *.
- Điều kiện: mọi tầng; nghỉ 720 giờ.
- Bối cảnh tác giả: *.
- Vai: `{"a":{"role":"thuong","alignment":"context"}}`.
- Xuất xứ: `d9ab301` / `src/game/core/14-thien-lo.js`.

1. {$a.ten} để mắt tới túi trữ vật của ngươi: “Có đan dược dư không? Ta đổi linh thạch, giá tốt.”

### Lựa chọn

- **1. Bán một viên đan thường rẻ nhất trong túi**
  Gã chọn viên đan thường rẻ nhất ngươi đang có, soi dưới nắng rồi trả đúng giá thu mua.
  - `cost`: `{"pillGroup":"any"}`
  - `e`: `{"soldPillValue":1}`
- **2. Mặc cả đủ thứ**
  - `chk`: `["van",10]`
  - **Thành công**: Mặc cả một hồi, gã tặng thêm ngươi một món cho xong chuyện.
    `{"e":{"pill":1}}`
  - **Thất bại**: Gã cười: “{$a.goi} ăn nói khéo thật, nhưng ta không ngu.”
- **3. Không đổi**
  Ngươi lắc đầu.

### Nối cơ chế

```json
{
  "variables": {
    "$hook": "td_doi_v"
  }
}
```

<a id="td_lua"></a>
## Món hàng lạ — `td_lua`

- Loại: event; nguồn: Thương đội; chủ đề: Giao thương; cảm xúc: không gắn nhãn.
- Nơi: *.
- Điều kiện: mọi tầng; nghỉ 720 giờ.
- Bối cảnh tác giả: *.
- Vai: `{"a":{"role":"thuong","alignment":"context"}}`.
- Xuất xứ: `d9ab301` / `src/game/core/14-thien-lo.js`.

1. {$a.ten} lén kéo ngươi ra sau xe, mở một hộp gỗ: “Đồ thượng cổ, chỉ bán cho người có duyên.”

### Lựa chọn

- **1. Mua**
  - `cost`: `{"st":30}`
  - **Khả năng 1**: Đồ thật. Ngươi không ngờ vận may lại tới dễ như vậy. `{"w":1,"e":{"relic":1}}`
  - **Khả năng 2**: Về tới chỗ nghỉ mới biết là đồ giả, sơn còn chưa khô. `{"w":2,"e":{"tamma":3}}`
- **2. Soi kỹ**
  - `chk`: `["ngo",11]`
  - **Thành công**: Ngươi chỉ ra chỗ giả. Gã đỏ mặt, đành tặng ngươi một viên đan để bịt miệng.
    `{"e":{"pill":1}}`
  - **Thất bại**: Ngươi không nhìn ra gì. Gã cất hộp đi, mặt hơi tiếc.
- **3. Bỏ đi**
  Đồ tốt không ai bán sau xe ngựa.

### Nối cơ chế

```json
{
  "variables": {
    "$hook": "td_lua_v"
  }
}
```

<a id="td_nan"></a>
## Thương đội bị yêu thú vây — `td_nan`

- Loại: event; nguồn: Thương đội; chủ đề: Giao thương; cảm xúc: không gắn nhãn.
- Nơi: *.
- Điều kiện: mọi tầng; nghỉ 720 giờ.
- Bối cảnh tác giả: *.
- Vai: `{"a":{"role":"thuong","alignment":"context"}}`.
- Xuất xứ: `d9ab301` / `src/game/core/14-thien-lo.js`.

1. Tiếng ngựa hí thất thanh. {$en} bị một bầy yêu thú vây giữa đường, hộ vệ đã ngã mấy người.

### Lựa chọn

- **1. Xông vào cứu**
  - `fight`: `{"k":"beast","cnt":2}`
  - **Thắng trận**: Bầy thú tan tác. {$a.ten} quỳ xuống cảm tạ, dâng cả túi linh thạch.
    `{"e":{"st":35,"karma":6,"an":["a","cứu khỏi bầy yêu thú"]}}`
- **2. Đứng xa nhìn**
  Ngươi không xen vào. Lúc ngươi đi, tiếng kêu cứu đã tắt.
  - `e`: `{"tamma":4,"karma":-2}`
- **3. Cáo từ, tiếp tục lên đường**
  Ngươi chọn rời khỏi nơi này, không can dự thêm.

### Nối cơ chế

```json
{
  "variables": {
    "$hook": "td_nan_v"
  }
}
```
