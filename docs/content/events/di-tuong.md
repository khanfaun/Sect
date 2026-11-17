# content/events/di-tuong.json

Nguồn chuẩn: `content/events/di-tuong.json`. Bản đọc tự sinh. Cú pháp: xem [guideline](../GUIDELINE.md).

<a id="bi_canh"></a>
## Bí cảnh mở cửa — `bi_canh`

- Loại: event; nguồn: Dị tượng; chủ đề: Cơ duyên; cảm xúc: không gắn nhãn.
- Nơi: *.
- Điều kiện: mọi tầng; một lần/kiếp.
- Bối cảnh tác giả: *.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/core/12-dong-doi-tam-thoi.js`.

1. Trên trời bỗng mở ra một khe nứt ngũ sắc. Tu sĩ khắp nơi đổ về: bí cảnh trăm năm mới mở một lần!

2. Một vòng sáng xoáy giữa khoảng đất trống. Lối vào bí cảnh mở ra, để lộ những bậc đá không thuộc về nơi này.

### Lựa chọn

- **1. Xông vào**
  - **Khả năng 1**: Một con thủ hộ thú chặn ngay lối vào. `{"w":2,"fight":{"elite":1,"k":"ho","n":"Hổ giữ cửa bí cảnh"},"win":{"t":"Thủ hộ thú gục xuống. Phía sau là một bệ đá, trên đó có bảo vật đang phát sáng.","e":{"relic":1}}}`
  - **Khả năng 2**: Bí cảnh là một vườn thuốc bỏ hoang. Ngươi hái mỏi tay. `{"w":2,"e":{"pill":["tinhnguyen","hoixuan","taytuy"],"h":144}}`
  - **Khả năng 3**: Bí cảnh sụp đổ khi ngươi mới vào được nửa đường. Ngươi chạy thục mạng ra ngoài, chỉ kịp vơ lấy một thứ. `{"w":1,"e":{"relic":0,"hp":"-20%"}}`
- **2. Chờ ở cửa, cướp kẻ đi ra**
  - `chk`: `["tp",11]`
  - **Thành công**: Mấy kẻ lảo đảo đi ra, mình đầy thương tích. Ngươi ra tay nhanh gọn.
    `{"e":{"st":40,"karma":-6}}`
  - **Thất bại**: Kẻ đi ra đầu tiên lại là kẻ mạnh nhất.
    `{"fight":{"k":"tantu","elite":1},"win":{"t":"Hắn gục. Túi trữ vật của hắn nặng trịch.","e":{"st":30,"karma":-3}}}`
- **3. Không tham gia**
  Nơi nhiều người tranh, thường lắm kẻ chết. Ngươi đi tiếp.

<a id="sao_roi"></a>
## Sao rơi — `sao_roi`

- Loại: event; nguồn: Dị tượng; chủ đề: Cơ duyên; cảm xúc: không gắn nhãn.
- Nơi: núi non, hoang nguyên, rừng sâu, biển khơi, thiên lộ.
- Điều kiện: mọi tầng; nghỉ 720 giờ.
- Bối cảnh tác giả: nui / hoang / rung / bien / thien.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/core/12-dong-doi-tam-thoi.js`.

1. Đêm qua có sao băng rơi xuống phía tây, đất rung ba lần. Sáng nay khói vẫn còn bốc lên.

2. Một quả cầu lửa vạch ngang trời rồi đâm xuống thung lũng gần đó. Tiếng nổ làm chim chóc bay rợp trời.

### Lựa chọn

- **1. Tới xem**
  - **Khả năng 1**: Giữa hố sâu là một khối sắt đỏ rực, tỏa ra kiếm khí lạnh buốt. `{"w":2,"e":{"relic":"tinhthiet"}}`
  - **Khả năng 2**: Ngươi tới sau. Đã có kẻ đứng giữa hố. `{"w":2,"fight":{"k":"tantu"},"win":{"t":"Kẻ kia bỏ chạy. Khối sắt sao vẫn nằm đó, còn nóng hổi.","e":{"relic":"tinhthiet"}}}`
  - **Khả năng 3**: Thứ rơi xuống không phải sắt. Nó đang cử động. `{"w":1,"fight":{"k":"tinhthu","m":1.15},"win":{"t":"Tinh thú tan thành bụi sao. Trong lòng bàn tay ngươi còn đọng lại mấy hạt sáng.","e":{"tv":10,"st":25}}}`
- **2. Kệ nó**
  Trời rơi xuống thứ gì, kệ trời.
- **3. Cáo từ, tiếp tục lên đường**
  Ngươi chọn rời khỏi nơi này, không can dự thêm.

<a id="dau_gia"></a>
## Hội đấu giá — `dau_gia`

- Loại: event; nguồn: Dị tượng; chủ đề: Đấu giá; cảm xúc: không gắn nhãn.
- Nơi: thành trì.
- Điều kiện: tầng 0, 1, 2, 3; nghỉ 720 giờ.
- Bối cảnh tác giả: thanh.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/core/12-dong-doi-tam-thoi.js`.

1. Đại hội đấu giá của Vạn Bảo Thương Hội. Món cuối cùng được bưng ra, phủ khăn đỏ. Người dẫn chương trình mỉm cười: “{$dan}, giá khởi điểm…”

2. Ngươi chen được vào hội đấu giá ở {$pl}. Đèn lồng vạn ngọn, người tu tiên ngồi kín ba tầng lầu.

### Lựa chọn

- **1. Ra giá món chót**
  Tiếng búa gõ xuống. Món đồ là của ngươi. Mấy ánh mắt hằm hằm nhìn theo.
  - `cost`: `{"st":55}`
  - `e`: `{"pill":"@bt","lore":"van_bao"}`
- **2. Mua một món nhỏ hơn**
  Một món bảo vật không ai để ý. Ngươi mua với giá hời.
  - `cost`: `{"st":30}`
  - `e`: `{"relic":0}`
- **3. Chỉ xem**
  Xem người ta tranh nhau, ngươi hiểu ra giá trị thật của mọi thứ trên đời.
  - `e`: `{"rumor":1,"lore":"van_bao"}`

### Nối cơ chế

```json
{
  "dk": "daugia"
}
```

<a id="dt_khi"></a>
## Linh khí phun trào — `dt_khi`

- Loại: event; nguồn: Dị tượng; chủ đề: Cơ duyên; cảm xúc: không gắn nhãn.
- Nơi: *.
- Điều kiện: mọi tầng; nghỉ 720 giờ.
- Bối cảnh tác giả: *.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/core/15-thu-trieu.js`.

1. Cửa bí cảnh mở hé, linh khí phun ra như suối. Tu sĩ khắp nơi kéo tới.

### Lựa chọn

- **1. Ngồi hấp thu ngay tại chỗ**
  Ngươi ngồi suốt một ngày một đêm.
  - `e`: `{"h":24,"tv":6,"dao":1}`
- **2. Lách vào trong**
  - `fight`: `{"k":"tantu","cnt":2}`
  - **Thắng trận**: Đánh lui kẻ tranh giành, ngươi vơ được một món.
    `{"e":{"relic":1,"tv":6}}`
- **3. Cáo từ, tiếp tục lên đường**
  Ngươi chọn rời khỏi nơi này, không can dự thêm.

### Nối cơ chế

```json
{
  "dk": "bicanh"
}
```

<a id="dt_sao"></a>
## Mảnh sao còn nóng — `dt_sao`

- Loại: event; nguồn: Dị tượng; chủ đề: Cơ duyên; cảm xúc: không gắn nhãn.
- Nơi: *.
- Điều kiện: mọi tầng; nghỉ 720 giờ.
- Bối cảnh tác giả: *.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/core/15-thu-trieu.js`.

1. Hố sâu còn bốc khói. Giữa hố là một mảnh thiên thạch đỏ rực.

### Lựa chọn

- **1. Nhặt lên**
  - `chk`: `["tp",10]`
  - **Thành công**: Nóng bỏng tay, nhưng là đồ thật.
    `{"e":{"relic":"tinhthiet"}}`
  - **Thất bại**: Bỏng rát cả hai tay.
    `{"e":{"hp":"-20%","st":15}}`
- **2. Nghiên cứu tinh lực**
  Ngươi ngồi bên hố, cảm ngộ tinh lực trời sao.
  - `e`: `{"h":12,"tv":4,"dao":1}`
- **3. Cáo từ, tiếp tục lên đường**
  Ngươi chọn rời khỏi nơi này, không can dự thêm.

### Nối cơ chế

```json
{
  "dk": "saoroi"
}
```

<a id="dt_dau"></a>
## Đấu giá trong thành — `dt_dau`

- Loại: event; nguồn: Dị tượng; chủ đề: Cơ duyên; cảm xúc: không gắn nhãn.
- Nơi: thành trì, chợ phiên tu sĩ.
- Điều kiện: mọi tầng; nghỉ 720 giờ.
- Bối cảnh tác giả: *.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/core/15-thu-trieu.js`.

1. Vạn Bảo Thương Hội treo đèn khắp phố. Đấu giá sắp bắt đầu, nghe nói có cả lệnh bài thông quan.

### Lựa chọn

- **1. Vào xem hàng**
  Ngươi chen vào phòng đấu giá.
  - `e`: `{"shop":1}`
- **2. Không có tiền, thôi**
  Ngươi đứng ngoài nghe tiếng hô giá.

### Nối cơ chế

```json
{
  "dk": "daugia"
}
```
