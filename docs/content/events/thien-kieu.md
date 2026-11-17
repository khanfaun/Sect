# content/events/thien-kieu.json

Nguồn chuẩn: `content/events/thien-kieu.json`. Bản đọc tự sinh. Cú pháp: xem [guideline](../GUIDELINE.md).

<a id="thien_kieu"></a>
## Gặp thiên kiêu — `thien_kieu`

- Loại: event; nguồn: Thiên kiêu; chủ đề: Thiên kiêu; cảm xúc: không gắn nhãn.
- Nơi: *.
- Điều kiện: tầng 0, 1, 2, 3, 4; nghỉ 720 giờ.
- Bối cảnh tác giả: *.
- Vai: `{"rv":{"role":"rival","alignment":"world-record","identity":"entity.data.rv"}}`.
- Xuất xứ: `d9ab301` / `src/game/core/14-thien-lo.js`.

1. Trên đường có người chặn lại. {$rv.ten}, {$rv.tt} của {$rv.sect}, cảnh giới {$rv.realm}. “Nghe nói gần đây có kẻ khá lắm. Là ngươi?”

2. Ngươi dừng chân bên suối thì thấy {$rv.ten} đang rửa kiếm. {$rv.hn} ngẩng lên, ánh mắt sắc như dao: “Ngươi là ai?”

3. Cả quán rượu im bặt khi {$rv.ten} bước vào. {$rv.tt} của {$rv.sect}. {$rv.hn} nhìn quanh, rồi ngồi xuống đúng bàn của ngươi.

### Lựa chọn

- **1. Luận võ**
  - `fight`: `{"k":"kiemtu","n":"{$rv.ten}","mv":"rvm","spar":1,"sub":"{$rv.tt} {$rv.sect}"}`
  - **Thắng trận**: Thiên kiêu bại dưới tay ngươi. {$rv.ten} im lặng hồi lâu, rồi cười: “Nhớ tên ngươi rồi.”
    `{"e":{"tv":10,"van":2,"rival":1}}`
  - **Thua trận**: {$rv.ten} thu chiêu: “Còn non lắm.” Nhưng ánh mắt {$rv.hn} đã khác.
    `{"e":{"tv":5}}`
- **2. Kết giao**
  - `chk`: `["tam",10]`
  - **Thành công**: Hai người nói chuyện tới khuya, từ kiếm pháp tới chuyện nhà. Lúc chia tay, {$rv.hn} tặng ngươi một viên đan.
    `{"e":{"rival":1,"pill":1}}`
  - **Thất bại**: {$rv.ten} lạnh nhạt đứng dậy: “Ta không kết giao với kẻ vô danh.”
    `{"e":{"tamma":2}}`
- **3. Tránh mặt**
  Ngươi cúi đầu đi qua. Thiên kiêu không thèm nhìn ngươi lấy một cái.

### Nối cơ chế

```json
{
  "variables": {
    "$hook": "thien_kieu_v"
  },
  "condition": {
    "$hook": "thien_kieu_cond"
  }
}
```

<a id="tk_ruou"></a>
## Thiên kiêu uống rượu — `tk_ruou`

- Loại: event; nguồn: Thiên kiêu; chủ đề: Thiên kiêu; cảm xúc: không gắn nhãn.
- Nơi: thôn trấn, thành trì, chợ phiên tu sĩ.
- Điều kiện: mọi tầng; nghỉ 720 giờ.
- Bối cảnh tác giả: *.
- Vai: `{"rv":{"role":"rival","alignment":"world-record","identity":"entity.data.rv"}}`.
- Xuất xứ: `d9ab301` / `src/game/core/15-thu-trieu.js`.

1. {$rv.ten} ngồi một mình trong quán ven đường, rượu đã cạn ba bình. Thấy ngươi, {$rv.hn} vẫy tay: “Ngồi đi. Một mình uống buồn lắm.”

### Lựa chọn

- **1. Ngồi uống cùng**
  {$rv.ten} kể về {$rv.sect}, về những kẻ ganh ghét, về áp lực của danh hiệu thiên kiêu. Lúc chia tay, cả hai đều đã say.
  - `e`: `{"rival":1,"tam":1,"h":6}`
- **2. Từ chối**
  Ngươi chắp tay rồi đi.

### Nối cơ chế

```json
{
  "variables": {
    "$hook": "tk_ruou_v"
  },
  "condition": {
    "$hook": "tk_ruou_cond"
  }
}
```

<a id="tk_thach"></a>
## Lời thách đấu — `tk_thach`

- Loại: event; nguồn: Thiên kiêu; chủ đề: Thiên kiêu; cảm xúc: không gắn nhãn.
- Nơi: *.
- Điều kiện: mọi tầng; nghỉ 720 giờ.
- Bối cảnh tác giả: *.
- Vai: `{"rv":{"role":"rival","alignment":"world-record","identity":"entity.data.rv"}}`.
- Xuất xứ: `d9ab301` / `src/game/core/15-thu-trieu.js`.

1. {$rv.ten} chặn ngươi giữa đường: “Nghe nói ngươi muốn chen chân vào Thiên Kiêu Bảng? Qua được ta đã.”

### Lựa chọn

- **1. Nhận lời**
  - `fight`: `{"k":"kiemtu","n":"{$rv.ten}","mv":"rvm","spar":1,"sub":"{$rv.tt} {$rv.sect}"}`
  - **Thắng trận**: Thiên kiêu bại trận. Tin này sẽ lan khắp nơi.
    `{"e":{"tv":10,"van":2,"rival":-1,"rumor":1}}`
  - **Thua trận**: Ngươi thua. {$rv.ten} quay lưng bỏ đi, không thèm nói một lời.
    `{"e":{"tv":4,"tamma":3}}`
- **2. Nhường**
  Ngươi tránh đường. {$rv.ten} cười khẩy.
  - `e`: `{"tamma":2}`
- **3. Cáo từ, tiếp tục lên đường**
  Ngươi chọn rời khỏi nơi này, không can dự thêm.

### Nối cơ chế

```json
{
  "variables": {
    "$hook": "tk_thach_v"
  },
  "condition": {
    "$hook": "tk_thach_cond"
  }
}
```

<a id="tk_dong"></a>
## Thiên kiêu rủ đồng hành — `tk_dong`

- Loại: event; nguồn: Thiên kiêu; chủ đề: Thiên kiêu; cảm xúc: không gắn nhãn.
- Nơi: *.
- Điều kiện: mọi tầng; nghỉ 720 giờ.
- Bối cảnh tác giả: *.
- Vai: `{"rv":{"role":"rival","alignment":"world-record","identity":"entity.data.rv"}}`.
- Xuất xứ: `d9ab301` / `src/game/core/15-thu-trieu.js`.

1. {$rv.ten} nhận ra ngươi từ xa: “Lại gặp rồi! Ta đang tới chỗ dị tượng, đi cùng không?”

### Lựa chọn

- **1. Đi cùng**
  Có thiên kiêu bên cạnh, đường đi bớt cô độc.
  - `e`: `{"partyRv":20,"rival":1}`
- **2. Để lần khác**
  {$rv.ten} nhún vai, đi trước.
- **3. Cáo từ, tiếp tục lên đường**
  Ngươi chọn rời khỏi nơi này, không can dự thêm.

### Nối cơ chế

```json
{
  "variables": {
    "$hook": "tk_dong_v"
  },
  "condition": {
    "$hook": "tk_dong_cond"
  }
}
```

<a id="tk_tranh"></a>
## Tranh bảo với thiên kiêu — `tk_tranh`

- Loại: event; nguồn: Thiên kiêu; chủ đề: Thiên kiêu; cảm xúc: không gắn nhãn.
- Nơi: rừng sâu, núi non, phế tích, hang động, biển khơi, hoang nguyên, thiên lộ, ma địa.
- Điều kiện: mọi tầng; nghỉ 720 giờ.
- Bối cảnh tác giả: *.
- Vai: `{"rv":{"role":"rival","alignment":"world-record","identity":"entity.data.rv"}}`.
- Xuất xứ: `d9ab301` / `src/game/core/15-thu-trieu.js`.

1. Một gốc linh dược vừa chín. Cùng lúc ngươi tới thì {$rv.ten} cũng tới.

### Lựa chọn

- **1. Tranh**
  - `fight`: `{"k":"kiemtu","n":"{$rv.ten}","mv":"rvm","spar":1,"sub":"{$rv.tt} {$rv.sect}"}`
  - **Thắng trận**: Linh dược về tay ngươi.
    `{"e":{"pill":"tinhnguyen","rival":-1}}`
  - **Thua trận**: {$rv.ten} cầm linh dược đi mất.
    `{"e":{"tv":3}}`
- **2. Chia đôi**
  - `chk`: `["tam",11]`
  - **Thành công**: {$rv.ten} ngẩn ra, rồi bật cười đồng ý.
    `{"e":{"tv":4,"rival":1}}`
  - **Thất bại**: “Chia đôi?” {$rv.hn} cười lạnh, lấy cả gốc đi.
    `{"e":{"tamma":2}}`
- **3. Nhường lại**
  Ngươi để lại cho {$rv.hn}.
  - `e`: `{"rival":1,"karma":2}`
- **4. Cáo từ, tiếp tục lên đường**
  Ngươi chọn rời khỏi nơi này, không can dự thêm.

### Nối cơ chế

```json
{
  "variables": {
    "$hook": "tk_tranh_v"
  },
  "condition": {
    "$hook": "tk_tranh_cond"
  }
}
```

<a id="tk_dau"></a>
## Thiên kiêu bị vây — `tk_dau`

- Loại: event; nguồn: Thiên kiêu; chủ đề: Thiên kiêu; cảm xúc: không gắn nhãn.
- Nơi: *.
- Điều kiện: mọi tầng; nghỉ 720 giờ.
- Bối cảnh tác giả: *.
- Vai: `{"rv":{"role":"rival","alignment":"world-record","identity":"entity.data.rv"}}`.
- Xuất xứ: `d9ab301` / `src/game/core/15-thu-trieu.js`.

1. {$rv.ten} đang bị mấy tên ma tu vây đánh, áo đã nhuộm máu.

### Lựa chọn

- **1. Ra tay giúp**
  - `fight`: `{"k":"matu","cnt":2}`
  - **Thắng trận**: {$rv.ten} thở dốc: “Ơn này, {$rv.sect} sẽ nhớ.”
    `{"e":{"rival":2,"tv":6,"karma":4}}`
- **2. Chờ xem**
  {$rv.ten} tự phá vây được, nhưng đã thấy ngươi đứng xem.
  - `e`: `{"rival":-1}`
- **3. Cáo từ, tiếp tục lên đường**
  Ngươi chọn rời khỏi nơi này, không can dự thêm.

### Nối cơ chế

```json
{
  "variables": {
    "$hook": "tk_dau_v"
  },
  "condition": {
    "$hook": "tk_dau_cond"
  }
}
```
