# content/events/truy-sat.json

Nguồn chuẩn: `content/events/truy-sat.json`. Bản đọc tự sinh. Cú pháp: xem [guideline](../GUIDELINE.md).

<a id="ts_phuc"></a>
## Mai phục — `ts_phuc`

- Loại: event; nguồn: Truy sát; chủ đề: Ân oán; cảm xúc: không gắn nhãn.
- Nơi: *.
- Điều kiện: mọi tầng; nghỉ 720 giờ.
- Bối cảnh tác giả: *.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/core/15-thu-trieu.js`.

1. Gió lạnh sau gáy. {$en} đã bám theo ngươi nhiều ngày, giờ mới ra tay.

2. Một mũi tên cắm phập vào thân cây ngay cạnh tai. {$en} bước ra từ bóng tối.

### Lựa chọn

- **1. Ứng chiến**
  - `fight`: `{"k":"satthu","n":"{$en}","elite":1}`
  - **Thắng trận**: Kẻ truy sát gục xuống. Ngươi lục người hắn, thấy một tờ giấy ghi tên ngươi.
    `{"e":{"tv":8,"st":20}}`
- **2. Bỏ chạy**
  - `chk`: `["tp",12]`
  - **Thành công**: Ngươi cắt đuôi được. Nhưng hắn sẽ còn quay lại.
    `{"e":{"h":4}}`
  - **Thất bại**: Không thoát được.
    `{"fight":{"k":"satthu","n":"{$en}"},"win":{"t":"Thoát chết trong gang tấc.","e":{"tv":5}}}`
- **3. Cáo từ, tiếp tục lên đường**
  Ngươi chọn rời khỏi nơi này, không can dự thêm.

<a id="ts_dam"></a>
## Kẻ truy sát lên tiếng — `ts_dam`

- Loại: event; nguồn: Truy sát; chủ đề: Ân oán; cảm xúc: không gắn nhãn.
- Nơi: *.
- Điều kiện: mọi tầng; nghỉ 720 giờ.
- Bối cảnh tác giả: *.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/core/15-thu-trieu.js`.

1. {$en} đứng chắn giữa đường, không rút binh khí: “Ta nhận tiền để giết ngươi. Nhưng ta muốn nghe ngươi nói trước.”

### Lựa chọn

- **1. Thuyết phục**
  - `chk`: `["tam",12]`
  - **Thành công**: Hắn nghe hết, im lặng rất lâu, rồi bẻ gãy tờ lệnh.
    `{"e":{"deed":"hoa_giai","tamma":-5}}`
  - **Thất bại**: “Lý lẽ hay đấy. Nhưng tiền đã nhận rồi.”
    `{"fight":{"k":"satthu","n":"{$en}"},"win":{"t":"Kết thúc.","e":{"tv":6}}}`
- **2. Trả gấp đôi tiền thuê**
  Hắn cân túi linh thạch, gật đầu rồi biến mất.
  - `cost`: `{"st":40}`
- **3. Cáo từ, tiếp tục lên đường**
  Ngươi chọn rời khỏi nơi này, không can dự thêm.

<a id="ts_doc"></a>
## Rượu có độc — `ts_doc`

- Loại: event; nguồn: Truy sát; chủ đề: Ân oán; cảm xúc: không gắn nhãn.
- Nơi: *.
- Điều kiện: mọi tầng; nghỉ 720 giờ.
- Bối cảnh tác giả: *.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/core/15-thu-trieu.js`.

1. Quán trọ ven đường. Bát rượu bưng lên có mùi lạ. Ở góc quán, {$en} đang nhìn ngươi.

### Lựa chọn

- **1. Ngửi kỹ**
  - `chk`: `["ngo",11]`
  - **Thành công**: Ngươi hất bát rượu vào mặt hắn rồi xông tới.
    `{"fight":{"k":"satthu","n":"{$en}"},"win":{"t":"Kẻ hạ độc không ngờ bị lộ sớm vậy.","e":{"tv":6}}}`
  - **Thất bại**: Ngươi uống một ngụm. Ruột gan quặn lại.
    `{"e":{"hp":"-30%"},"fight":{"k":"satthu","n":"{$en}"},"win":{"t":"Ngươi ép được độc ra, hạ được hắn.","e":{"tv":6}}}`
- **2. Bỏ bát rượu, rời quán**
  Ngươi đặt tiền xuống rồi đi. Hắn không theo.

<a id="ts_bay"></a>
## Cạm bẫy — `ts_bay`

- Loại: event; nguồn: Truy sát; chủ đề: Ân oán; cảm xúc: không gắn nhãn.
- Nơi: *.
- Điều kiện: mọi tầng; nghỉ 720 giờ.
- Bối cảnh tác giả: *.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/core/15-thu-trieu.js`.

1. Đất dưới chân sụp xuống. Hố chông! {$en} đứng trên miệng hố, cười.

### Lựa chọn

- **1. Nhảy lên**
  - `chk`: `["tp",11]`
  - **Thành công**: Ngươi đạp vách hố bật lên, tung đòn trước khi hắn kịp phản ứng.
    `{"fight":{"k":"satthu","n":"{$en}"},"win":{"t":"Hắn đã chọn sai con mồi.","e":{"tv":7}}}`
  - **Thất bại**: Chông đâm vào đùi.
    `{"e":{"hp":"-25%"},"fight":{"k":"satthu","n":"{$en}"},"win":{"t":"Thắng, nhưng phải băng bó lâu.","e":{"tv":6}}}`
- **2. Cáo từ, tiếp tục lên đường**
  Ngươi chọn rời khỏi nơi này, không can dự thêm.

<a id="ts_dau"></a>
## Đấu tay đôi — `ts_dau`

- Loại: event; nguồn: Truy sát; chủ đề: Ân oán; cảm xúc: không gắn nhãn.
- Nơi: *.
- Điều kiện: mọi tầng; nghỉ 720 giờ.
- Bối cảnh tác giả: *.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/core/15-thu-trieu.js`.

1. {$en} cắm kiếm xuống đất: “Đuổi ngươi đủ rồi. Hôm nay phân thắng bại.”

### Lựa chọn

- **1. Nhận lời**
  - `fight`: `{"k":"kiemtu","n":"{$en}","elite":1}`
  - **Thắng trận**: Kẻ truy sát gục trước mặt ngươi.
    `{"e":{"tv":9,"relic":0}}`
- **2. Không đấu**
  Ngươi quay lưng đi. Hắn không chém sau lưng.
  - `e`: `{"tamma":2}`
