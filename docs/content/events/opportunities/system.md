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

<a id="tl_tuyendo"></a>
## Sơn môn tuyển đồ — `tl_tuyendo`

- Loại: opportunity; nguồn: Hệ thống; chủ đề: Trắc linh; cảm xúc: không gắn nhãn.
- Nơi: *.
- Điều kiện: mọi tầng.
- Bối cảnh tác giả: *.
- Vai: `{}`.
- Xuất xứ: `d2` / `src/game/core2/37-linh-can.js`.

Tiếng chiêng vang khắp quê. Sơn môn trên núi xuống tuyển đồ, bày một khối ngọc trắng giữa sân đình. Trẻ con xếp hàng dài, lần lượt đặt tay lên ngọc. Tới lượt ngươi.

### Lựa chọn

- **1. Đặt tay lên ngọc**
  - `go`: `{"$hook":"ky_tl_tuyendo_c_0_go"}`

### Câu kết/thông báo của phần xử lý đặc thù

- `event.tl_tuyendo.vo`: Ngọc lạnh ngắt, không chút ánh sáng. Vị chấp sự liếc qua rồi phất tay: “Phế vật. Người kế.” Tiếng cười khẽ sau lưng theo ngươi suốt đường về.
- `event.tl_tuyendo.thuong`: Ngọc le lói vài sắc mờ. Chấp sự gật đầu cho có: “Có linh căn, tư chất bình thường. Muốn thì lên núi làm tạp dịch ngoại môn.”
- `event.tl_tuyendo.tot`: Ngọc bừng sáng, cả sân đình lặng đi. Chấp sự đứng bật dậy, giọng đổi hẳn: “Tư chất này, sơn môn mở cửa đón ngươi bất cứ lúc nào.”

### Nối cơ chế

```json
{
  "paid": false,
  "joke": false,
  "system": true
}
```

<a id="tl_dusi"></a>
## Tu sĩ du phương — `tl_dusi`

- Loại: opportunity; nguồn: Hệ thống; chủ đề: Trắc linh; cảm xúc: không gắn nhãn.
- Nơi: *.
- Điều kiện: mọi tầng.
- Bối cảnh tác giả: *.
- Vai: `{}`.
- Xuất xứ: `d2` / `src/game/core2/37-linh-can.js`.

Một tu sĩ áo bạc màu dừng chân bên quán nước, nhìn ngươi hồi lâu. “Lại đây, để ta xem cốt cách.” Bàn tay khô gầy đặt lên cổ tay ngươi.

### Lựa chọn

- **1. Chìa tay cho y xem**
  - `go`: `{"$hook":"ky_tl_dusi_c_0_go"}`

### Câu kết/thông báo của phần xử lý đặc thù

- `event.tl_dusi.vo`: Y buông tay, thở dài: “Kinh mạch bịt kín, linh khí không vào. Tiên lộ không có phần ngươi. Làm người tốt là đủ rồi.”
- `event.tl_dusi.thuong`: Y gật gù: “Có linh căn, không tốt không xấu. Chịu khổ được thì cũng đi được một đoạn đường.”
- `event.tl_dusi.tot`: Y siết chặt cổ tay ngươi, mắt sáng lên: “Hiếm thấy! Nếu muốn, theo ta làm đồng tử, ta dạy ngươi dẫn khí.”

### Nối cơ chế

```json
{
  "paid": false,
  "joke": false,
  "system": true
}
```

<a id="tl_thach"></a>
## Trắc Linh Thạch — `tl_thach`

- Loại: opportunity; nguồn: Hệ thống; chủ đề: Trắc linh; cảm xúc: không gắn nhãn.
- Nơi: *.
- Điều kiện: mọi tầng.
- Bối cảnh tác giả: *.
- Vai: `{}`.
- Xuất xứ: `d2` / `src/game/core2/37-linh-can.js`.

Viên đá xám trơn nhẵn nằm trong lòng bàn tay. Người bán dặn: nắm chặt, nín thở, đá sẽ nói thật.

### Lựa chọn

- **1. Nắm chặt viên đá**
  - `go`: `{"$hook":"ky_tl_thach_c_0_go"}`

### Câu kết/thông báo của phần xử lý đặc thù

- `event.tl_thach.vo`: Đá vẫn xám như cũ. Ngươi nắm tới mỏi tay, nó cũng chẳng ấm lên lấy một chút. Rồi đá vỡ vụn thành bụi.
- `event.tl_thach.thuong`: Trong đá hiện lên vài vệt màu nhạt, chập chờn như đèn trước gió, rồi đá vỡ vụn. Có linh căn, chẳng hơn ai.
- `event.tl_thach.tot`: Đá bừng sáng rực rỡ, nóng rát lòng bàn tay, rồi vỡ tung. Linh căn của ngươi không tầm thường.

### Nối cơ chế

```json
{
  "paid": false,
  "joke": false,
  "system": true
}
```

<a id="tl_tubiet"></a>
## Tự biết — `tl_tubiet`

- Loại: opportunity; nguồn: Hệ thống; chủ đề: Trắc linh; cảm xúc: không gắn nhãn.
- Nơi: *.
- Điều kiện: mọi tầng.
- Bối cảnh tác giả: *.
- Vai: `{}`.
- Xuất xứ: `d2` / `src/game/core2/37-linh-can.js`.

Ngươi ngồi thở theo khẩu quyết đã thuộc lòng, ngày này qua ngày khác. Đã quá lâu rồi.

### Lựa chọn

- **1. Ngồi thêm một đêm nữa**
  - `go`: `{"$hook":"ky_tl_tubiet_c_0_go"}`

### Câu kết/thông báo của phần xử lý đặc thù

- `event.tl_tubiet.vo`: Khí trời đất đi qua người như gió qua lưới rách. Không một sợi nào ở lại. Ngươi đã hiểu, chỉ là chưa muốn tin.
- `event.tl_tubiet.thuong`: Giữa đêm, một sợi khí mát chạy qua ngực rồi tan. Mỏng manh, nhưng là thật. Ngươi có linh căn.
- `event.tl_tubiet.tot`: Linh khí ùa vào như nước vỡ bờ, chạy khắp tứ chi. Ngươi mở mắt, trời đất như rõ hơn một tầng.

### Nối cơ chế

```json
{
  "paid": false,
  "joke": false,
  "system": true
}
```

<a id="tl_laodao"></a>
## Lão đạo ăn xin — `tl_laodao`

- Loại: opportunity; nguồn: Hệ thống; chủ đề: Trắc linh; cảm xúc: không gắn nhãn.
- Nơi: *.
- Điều kiện: mọi tầng.
- Bối cảnh tác giả: *.
- Vai: `{}`.
- Xuất xứ: `d2` / `src/game/core2/37-linh-can.js`.

Một lão đạo rách rưới gõ cửa xin bát cơm. Ăn xong, lão không đi, cầm lấy bàn tay ngươi lật qua lật lại, mắt đục như nước sông.

### Lựa chọn

- **1. Để lão xem**
  - `go`: `{"$hook":"ky_tl_laodao_c_0_go"}`

### Câu kết/thông báo của phần xử lý đặc thù

- `event.tl_laodao.vo`: Lão buông tay, cười khà: “Không có rễ, không mọc thành cây. Nhưng người không rễ cũng có đường của người không rễ.” Rồi lão đi mất, không ai thấy lão rẽ lối nào.
- `event.tl_laodao.thuong`: Lão gật đầu: “Có rễ, rễ cạn. Tưới cho siêng thì cũng ra hoa.” Ngoái lại, bến sông đầu làng đã không còn bóng lão.
- `event.tl_laodao.tot`: Lão nheo mắt, ngón tay run khẽ: “Rễ sâu lắm. Giữ cho kỹ, kẻo người ta đào mất.” Ngươi chớp mắt, lão đã khuất sau bến sông.

### Nối cơ chế

```json
{
  "paid": false,
  "joke": false,
  "system": true
}
```
