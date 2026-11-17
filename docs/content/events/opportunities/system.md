# content/events/opportunities/system.json

Nguồn chuẩn: `content/events/opportunities/system.json`. Bản đọc tự sinh. Cú pháp: xem [guideline](../../GUIDELINE.md).

<a id="tp_ansi"></a>
## Ẩn sĩ bên suối — `tp_ansi`

- Loại: opportunity; nguồn: Hệ thống; chủ đề: Diễn biến nhân vật; cảm xúc: không gắn nhãn.
- Nơi: *.
- Điều kiện: mọi tầng.
- Bối cảnh tác giả: *.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/data/03-su_kien-du-lieu.js`.

Bên con suối có túp lều tranh. Lão ẩn sĩ chân yếu đang loay hoay với đống củi ướt. Thấy ngươi, lão nheo mắt: “Hậu sinh, thân thể ngươi chưa có lấy một sợi linh khí.”

### Lựa chọn

- **1. Ở lại giúp lão ba tháng**
  - `cost`: `"3 tháng"`
  - `go`: `{"$hook":"ky_tp_ansi_c_0_go"}`
- **2. Đang vội, cáo từ**
  - `go`: `{"$hook":"ky_tp_ansi_c_1_go"}`

### Câu kết/thông báo của phần xử lý đặc thù

- `event.tp_ansi.041`: ẩn sĩ truyền
- `event.tp_ansi.042`: Ngươi bổ củi, gánh nước, sắc thuốc cho lão. Tối nào lão cũng đọc cho ngươi vài câu khẩu quyết. Ngày đi, lão chỉ nói: “Nhớ thở cho đúng.”
- `event.tp_ansi.043`: 3 tháng
- `event.tp_ansi.044`: Thời gian trôi qua
- `event.tp_ansi.045`: Lão phẩy tay: “Duyên chưa tới thì thôi.”

### Nối cơ chế

```json
{
  "paid": false,
  "joke": false,
  "system": true
}
```

<a id="tm_du"></a>
## Tâm ma thì thầm — `tm_du`

- Loại: opportunity; nguồn: Hệ thống; chủ đề: Diễn biến nhân vật; cảm xúc: không gắn nhãn.
- Nơi: *.
- Điều kiện: mọi tầng.
- Bối cảnh tác giả: *.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/data/03-su_kien-du-lieu.js`.

Đêm khuya, một giọng nói vang lên trong đầu ngươi, giọng của chính ngươi: “Lão già bán thuốc dưới chân núi giàu lắm. Giết lão, lấy hết, ai biết được?”

### Lựa chọn

- **1. Định thần, xua nó đi**
  - `cost`: `"cần đạo tâm vững"`
  - `go`: `{"$hook":"ky_tm_du_c_0_go"}`
- **2. Nghe theo**
  - `cost`: `"nhân quả xấu đi, tâm ma tăng"`
  - `go`: `{"$hook":"ky_tm_du_c_1_go"}`

### Câu kết/thông báo của phần xử lý đặc thù

- `event.tm_du.047`: Ngươi ngồi thẳng lưng, thở đều. Giọng nói tắt dần như ngọn nến trước gió. Lòng sáng hơn một chút.
- `event.tm_du.048`: đạo tâm +1
- `event.tm_du.049`: Chống được tâm ma
- `event.tm_du.050`: tâm ma −6
- `event.tm_du.051`: Ngươi cố xua nhưng giọng nói cứ bám riết tới sáng. Đầu nặng trĩu.
- `event.tm_du.052`: tâm ma +4
- `event.tm_du.053`: Không xua được
- `event.tm_du.054`: Sáng hôm sau, trong tay ngươi có một túi linh thạch nặng trĩu. Ngươi không nhớ rõ đêm qua đã làm gì.
- `event.tm_du.055`: Linh thạch
- `event.tm_du.056`: nhân quả −6
- `event.tm_du.057`: Nghiêng về ác
- `event.tm_du.058`: tâm ma +8

### Nối cơ chế

```json
{
  "paid": false,
  "joke": false,
  "system": true
}
```

<a id="tm_quyen"></a>
## Tâm ma dụ dỗ — `tm_quyen`

- Loại: opportunity; nguồn: Hệ thống; chủ đề: Diễn biến nhân vật; cảm xúc: không gắn nhãn.
- Nơi: *.
- Điều kiện: mọi tầng.
- Bối cảnh tác giả: *.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/data/03-su_kien-du-lieu.js`.

Trong mơ, ngươi thấy mình ngồi trên ngai cao, vạn người quỳ lạy. Một bóng đen thì thầm: “Chỉ cần uống máu kẻ yếu, ngươi sẽ có tất cả.”

### Lựa chọn

- **1. Tỉnh lại, giữ vững bản tâm**
  - `cost`: `"cần đạo tâm vững"`
  - `go`: `{"$hook":"ky_tm_quyen_c_0_go"}`
- **2. Đón nhận**
  - `cost`: `"nhân quả xấu đi, tâm ma tăng"`
  - `go`: `{"$hook":"ky_tm_quyen_c_1_go"}`

### Câu kết/thông báo của phần xử lý đặc thù

- `event.tm_quyen.059`: Ngươi bừng tỉnh, mồ hôi ướt đẫm. Nhưng tâm cảnh vững vàng hơn trước.
- `event.tm_quyen.060`: đạo tâm +1
- `event.tm_quyen.061`: Chống được tâm ma
- `event.tm_quyen.062`: Giấc mơ cứ lặp đi lặp lại. Ngươi tỉnh dậy mệt mỏi.
- `event.tm_quyen.063`: tâm ma +4
- `event.tm_quyen.064`: Một luồng sức mạnh lạnh lẽo chảy vào kinh mạch. Ngươi thấy mình mạnh hơn, và lạnh hơn.
- `event.tm_quyen.065`: nhân quả −5
- `event.tm_quyen.066`: Nghiêng về ác
- `event.tm_quyen.067`: tâm ma +8

### Nối cơ chế

```json
{
  "paid": false,
  "joke": false,
  "system": true
}
```

<a id="tho_can"></a>
## Thọ nguyên đã cạn — `tho_can`

- Loại: opportunity; nguồn: Hệ thống; chủ đề: Diễn biến nhân vật; cảm xúc: không gắn nhãn.
- Nơi: *.
- Điều kiện: mọi tầng.
- Bối cảnh tác giả: *.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/data/03-su_kien-du-lieu.js`.

Cảnh giới tụt xuống, thọ nguyên co lại theo. Ngươi cảm thấy sinh cơ trong người đang tắt dần như ngọn đèn cạn dầu.

### Lựa chọn

- **1. Buông tay, nhắm mắt**
  - `cost`: `"chết ngay"`
  - `go`: `{"$hook":"ky_tho_can_c_0_go"}`
- **2. Cưỡng ép giữ mạng**
  - `cost`: `"mỗi tháng mất 4% khí huyết tối đa tới khi chết"`
  - `go`: `{"$hook":"ky_tho_can_c_1_go"}`

### Câu kết/thông báo của phần xử lý đặc thù

- `event.tho_can.068`: Ngươi thở ra một hơi dài, rồi không hít vào nữa.
- `event.tho_can.069`: Ngươi đốt tinh huyết, níu kéo từng hơi thở. Mỗi tháng trôi qua, thân thể lại khô héo thêm.

### Nối cơ chế

```json
{
  "paid": false,
  "joke": false,
  "system": true
}
```
