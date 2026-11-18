# content/events/khach-qua-duong.json

Nguồn chuẩn: `content/events/khach-qua-duong.json`. Bản đọc tự sinh. Cú pháp: xem [guideline](../GUIDELINE.md).

<a id="kh_hoiduong"></a>
## Hỏi đường — `kh_hoiduong`

- Loại: event; nguồn: Khách qua đường; chủ đề: Gặp gỡ; cảm xúc: không gắn nhãn.
- Nơi: *.
- Điều kiện: mọi tầng; nghỉ 720 giờ.
- Bối cảnh tác giả: *.
- Vai: `{"a":{"role":"pham","alignment":"context"}}`.
- Xuất xứ: `d9ab301` / `src/game/core/14-thien-lo.js`.

1. {$en} đứng bên ngã ba, tay cầm tấm bản đồ rách. Thấy ngươi, {$a.hn} mừng rỡ: “{$a.goi}, đường nào ra trấn gần nhất?”

2. Một bóng người từ trong bụi bước ra, là {$en}. {$a.hn} lúng túng chắp tay hỏi đường.

### Lựa chọn

- **1. Chỉ đường cho tử tế**
  {$a.ten} cảm ơn rối rít, còn kể cho ngươi nghe chuyện vừa thấy dọc đường.
  - `e`: `{"rumor":1,"hd":{"p":1},"ng":{"g":1}}`
- **2. Bảo không biết**
  Ngươi lắc đầu rồi đi tiếp. Sau lưng, {$a.hn} vẫn xoay xoay tấm bản đồ.

### Nối cơ chế

```json
{
  "variables": {
    "$hook": "kh_hoiduong_v"
  }
}
```

<a id="kh_chung"></a>
## Đi chung một quãng — `kh_chung`

- Loại: event; nguồn: Khách qua đường; chủ đề: Gặp gỡ; cảm xúc: không gắn nhãn.
- Nơi: *.
- Điều kiện: mọi tầng; nghỉ 720 giờ.
- Bối cảnh tác giả: *.
- Vai: `{"a":{"role":"pham","alignment":"context"}}`.
- Xuất xứ: `d9ab301` / `src/game/core/14-thien-lo.js`.

1. {$en} đi cùng hướng với ngươi. Đường dài, {$a.hn} bắt chuyện cho đỡ buồn.

2. Trời sắp tối. {$en} đề nghị đốt chung một đống lửa bên đường cho đỡ sợ thú dữ.

### Lựa chọn

- **1. Ngồi cùng nghỉ chân**
  Hai người chia nhau miếng lương khô. {$a.ten} kể chuyện quê nhà, ngươi nghe mà lòng nhẹ đi.
  - `e`: `{"h":6,"tamma":-3,"an":["a","cùng nghỉ chân bên đường"]}`
- **2. Đi trước một mình**
  Ngươi chào rồi rảo bước. Tu tiên vốn là đường một người.
- **3. Cáo từ, tiếp tục lên đường**
  Ngươi chọn rời khỏi nơi này, không can dự thêm.

### Nối cơ chế

```json
{
  "variables": {
    "$hook": "kh_chung_v"
  }
}
```

<a id="kh_benh"></a>
## Người ốm bên đường — `kh_benh`

- Loại: event; nguồn: Khách qua đường; chủ đề: Gặp gỡ; cảm xúc: không gắn nhãn.
- Nơi: *.
- Điều kiện: mọi tầng; nghỉ 720 giờ.
- Bối cảnh tác giả: *.
- Vai: `{"a":{"role":"gia","alignment":"context"}}`.
- Xuất xứ: `d9ab301` / `src/game/core/14-thien-lo.js`.

1. {$en} ngồi gục dưới gốc cây, mặt tái mét, thở không ra hơi.

### Lựa chọn

- **1. Cho một viên đan hồi khí huyết**
  Một lúc sau {$a.ten} hồng hào trở lại, run run lạy ngươi một lạy.
  - `cost`: `{"pillGroup":"healing"}`
  - `e`: `{"deed":"cuu_nguoi","an":["a","cứu mạng giữa đường"]}`
- **2. Truyền chút chân khí**
  Chân khí ấm áp chạy vào kinh mạch người phàm. {$a.ten} đỡ hẳn, cảm kích không thôi.
  - `cost`: `{"mp":8}`
  - `e`: `{"deed":"cuu_nguoi","an":["a","truyền chân khí cứu giúp"]}`
- **3. Đi qua**
  Ngươi không dừng lại. Đi được một quãng vẫn còn nghe tiếng ho khan.
  - `e`: `{"tamma":2}`

### Nối cơ chế

```json
{
  "variables": {
    "$hook": "kh_benh_v"
  }
}
```

<a id="kh_cuop"></a>
## Kẻ cướp đường — `kh_cuop`

- Loại: event; nguồn: Khách qua đường; chủ đề: Gặp gỡ; cảm xúc: không gắn nhãn.
- Nơi: *.
- Điều kiện: mọi tầng; nghỉ 720 giờ.
- Bối cảnh tác giả: *.
- Vai: `{"a":{"role":"disguised_bandit","alignment":"hostile"}}`.
- Xuất xứ: `d9ab301` / `src/game/core/14-thien-lo.js`.

1. Một kẻ mặc áo lữ khách chặn đường ngươi, tự nhận là người cùng đoàn với {$en}. Vừa tới gần, hắn rút dao; hai đồng bọn cũng nhảy khỏi bụi. {$en} lùi lại, rõ ràng không quen chúng.

### Lựa chọn

- **1. Ra tay**
  - `fight`: `{"k":"sontac","cnt":2}`
  - **Thắng trận**: Bọn chúng chạy mất dép, bỏ lại túi tiền cướp được.
    `{"e":{"st":18}}`
- **2. Lách người bỏ đi**
  - `chk`: `["tp",9]`
  - **Thành công**: Ngươi lướt qua như gió. Bọn chúng còn chưa kịp nhìn rõ mặt.
  - **Thất bại**: Không thoát được, đành bỏ ra ít linh thạch cho xong chuyện.
    `{"e":{"st":-8}}`

### Nối cơ chế

```json
{
  "variables": {
    "$hook": "kh_cuop_v"
  }
}
```

<a id="kh_vat"></a>
## Đồ đánh rơi — `kh_vat`

- Loại: event; nguồn: Khách qua đường; chủ đề: Gặp gỡ; cảm xúc: không gắn nhãn.
- Nơi: *.
- Điều kiện: mọi tầng; nghỉ 720 giờ.
- Bối cảnh tác giả: *.
- Vai: `{"a":{"role":"pham","alignment":"context"}}`.
- Xuất xứ: `d9ab301` / `src/game/core/14-thien-lo.js`.

1. Trên đường có một cái túi vải. Phía trước chừng trăm bước, {$en} đang lật đật tìm kiếm thứ gì.

### Lựa chọn

- **1. Trả lại**
  {$a.ten} mừng như bắt được vàng, nhất quyết biếu ngươi chút lộ phí.
  - `e`: `{"st":6,"deed":"giu_loi"}`
- **2. Giữ lấy**
  Trong túi có ít bạc vụn và một lá thư nhà. Ngươi lặng lẽ rẽ sang lối khác.
  - `e`: `{"st":10,"deed":"trom_ngheo","deedO":{"yd":"phot_lo"}}`
- **3. Cáo từ, tiếp tục lên đường**
  Ngươi chọn rời khỏi nơi này, không can dự thêm.

### Nối cơ chế

```json
{
  "variables": {
    "$hook": "kh_vat_v"
  }
}
```

<a id="kh_dam"></a>
## Đàm đạo — `kh_dam`

- Loại: event; nguồn: Khách qua đường; chủ đề: Gặp gỡ; cảm xúc: không gắn nhãn.
- Nơi: *.
- Điều kiện: mọi tầng; nghỉ 720 giờ.
- Bối cảnh tác giả: *.
- Vai: `{"a":{"role":"dao","alignment":"lawful"}}`.
- Xuất xứ: `d9ab301` / `src/game/core/14-thien-lo.js`.

1. {$en} ngồi nghỉ trên tảng đá, thấy ngươi liền mỉm cười: “{$a.goi} cũng là người tu hành? Ngồi đây nói chuyện một lát.”

### Lựa chọn

- **1. Ngồi luận đạo**
  - `chk`: `["ngo",10]`
  - **Thành công**: Một câu nói vu vơ của {$a.ten} chạm đúng chỗ ngươi đang vướng. Chân khí trong người thông suốt hẳn.
    `{"e":{"tv":4,"h":3}}`
  - **Thất bại**: Hai người nói chuyện trời đất, không thu được gì nhưng lòng thấy thư thái.
    `{"e":{"tamma":-2,"h":3}}`
- **2. Chắp tay rồi đi**
  Ngươi cúi chào. {$a.ten} gật đầu, lại nhắm mắt như ngủ.
- **3. Cáo từ, tiếp tục lên đường**
  Ngươi chọn rời khỏi nơi này, không can dự thêm.

### Nối cơ chế

```json
{
  "variables": {
    "$hook": "kh_dam_v"
  }
}
```
