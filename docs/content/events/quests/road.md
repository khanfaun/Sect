# content/events/quests/road.json

Nguồn chuẩn: `content/events/quests/road.json`. Bản đọc tự sinh. Cú pháp: xem [guideline](../../GUIDELINE.md).

<a id="cuop"></a>
## Chặn đường nhiệm vụ — `cuop`

- Loại: quest; nguồn: Đường nhiệm vụ; chủ đề: Nhiệm vụ; cảm xúc: không gắn nhãn.
- Nơi: *.
- Điều kiện: mọi tầng.
- Bối cảnh tác giả: *.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/data/03-su_kien-du-lieu.js`.

Nội dung động qua callback `quest_cuop_t`; xem các câu văn phía dưới.

### Lựa chọn

- **1. Rút binh khí nghênh chiến**
  - `fight`: `1`
- **2. Bỏ ra ít linh thạch cho qua**
  - `go`: `{"$hook":"quest_cuop_c_1_go"}`

### Câu kết/thông báo của phần xử lý đặc thù

- `event.cuop.076`: Bọn chúng đếm tiền, cười khẩy rồi tránh đường.

### Nối cơ chế

```json
{
  "questKinds": [
    "den",
    "diet"
  ]
}
```

<a id="mua"></a>
## Mưa làm ướt hàng — `mua`

- Loại: quest; nguồn: Đường nhiệm vụ; chủ đề: Nhiệm vụ; cảm xúc: không gắn nhãn.
- Nơi: *.
- Điều kiện: mọi tầng.
- Bối cảnh tác giả: *.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/data/03-su_kien-du-lieu.js`.

Nội dung động qua callback `quest_mua_t`; xem các câu văn phía dưới.

### Lựa chọn

- **1. Tìm chỗ trú, đợi tạnh hẳn**
  - `go`: `{"$hook":"quest_mua_c_0_go"}`
- **2. Che tạm, đi tiếp**
  - `go`: `{"$hook":"quest_mua_c_1_go"}`

### Câu kết/thông báo của phần xử lý đặc thù

- `event.mua.077`: Mưa lớn ập tới. Bọc hàng của nhiệm vụ bắt đầu thấm nước.
- `event.mua.078`: Ngươi ngồi dưới mái đình hoang cả ngày. Hàng khô ráo, chỉ mất chút thời gian.
- `event.mua.079`: Tới chặng sau mới thấy một góc hàng đã ướt sũng. Người nhận chắc sẽ trả ít đi.
- `event.mua.080`: thưởng giảm một nửa
- `event.mua.081`: Hàng bị hỏng một phần
- `event.mua.082`: May mắn, lớp vải dầu che kín. Hàng vẫn nguyên.

### Nối cơ chế

```json
{
  "questKinds": [
    "den"
  ]
}
```

<a id="muagia"></a>
## Mua chuộc người giao — `muagia`

- Loại: quest; nguồn: Đường nhiệm vụ; chủ đề: Nhiệm vụ; cảm xúc: không gắn nhãn.
- Nơi: *.
- Điều kiện: mọi tầng.
- Bối cảnh tác giả: *.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/data/03-su_kien-du-lieu.js`.

Nội dung động qua callback `quest_muagia_t`; xem các câu văn phía dưới.

### Lựa chọn

- **1. Từ chối, giữ chữ tín**
  - `go`: `{"$hook":"quest_muagia_c_0_go"}`
- **2. Bán cho hắn**
  - `go`: `{"$hook":"quest_muagia_c_1_go"}`

### Câu kết/thông báo của phần xử lý đặc thù

- `event.muagia.083`: Một thương nhân áo gấm chặn ngươi lại: “Món hàng đó, ta trả gấp rưỡi. Ai biết đâu mà.”
- `event.muagia.084`: Hắn nhún vai bỏ đi. Lòng ngươi thanh thản.
- `event.muagia.085`: Linh thạch nặng tay. Nhưng tiếng thất tín sẽ theo ngươi một thời gian.
- `event.muagia.086`: Linh thạch

### Nối cơ chế

```json
{
  "questKinds": [
    "den"
  ]
}
```

<a id="doinoi"></a>
## Người nhận chuyển chỗ — `doinoi`

- Loại: quest; nguồn: Đường nhiệm vụ; chủ đề: Nhiệm vụ; cảm xúc: không gắn nhãn.
- Nơi: *.
- Điều kiện: mọi tầng.
- Bối cảnh tác giả: *.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/data/03-su_kien-du-lieu.js`.

Nội dung động qua callback `quest_doinoi_t`; xem các câu văn phía dưới.

### Lựa chọn

- **1. Hỏi nơi ở mới**
  - `go`: `{"$hook":"quest_doinoi_c_0_go"}`

### Câu kết/thông báo của phần xử lý đặc thù

- `event.doinoi.087`: Một người quen của người nhận báo tin: họ đã dọn đi nơi khác.
- `event.doinoi.088`: Không ai biết họ đi đâu. Ngươi đành tới chỗ cũ xem sao.
- `event.doinoi.089`: Họ đã chuyển tới
- `event.doinoi.090`: . Hạn được nới thêm hai mươi ngày.

### Nối cơ chế

```json
{
  "questKinds": [
    "den"
  ]
}
```

<a id="nho"></a>
## Gửi thêm gói thuốc — `nho`

- Loại: quest; nguồn: Đường nhiệm vụ; chủ đề: Nhiệm vụ; cảm xúc: không gắn nhãn.
- Nơi: *.
- Điều kiện: mọi tầng.
- Bối cảnh tác giả: *.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/data/03-su_kien-du-lieu.js`.

Nội dung động qua callback `quest_nho_t`; xem các câu văn phía dưới.

### Lựa chọn

- **1. Nhận lời**
  - `go`: `{"$hook":"quest_nho_c_0_go"}`
- **2. Từ chối khéo**
  - `go`: `{"$hook":"quest_nho_c_1_go"}`

### Câu kết/thông báo của phần xử lý đặc thù

- `event.nho.091`: Một bà lão nghe nói ngươi đi về phía ấy, nhờ mang thêm một gói thuốc cho cháu.
- `event.nho.092`: Bà lão cảm tạ. Người nhận chắc sẽ hậu tạ thêm.
- `event.nho.093`: Bà lão gật đầu, không nói gì.

### Nối cơ chế

```json
{
  "questKinds": [
    "den"
  ]
}
```

<a id="cam"></a>
## Cấm chế trên hàng — `cam`

- Loại: quest; nguồn: Đường nhiệm vụ; chủ đề: Nhiệm vụ; cảm xúc: không gắn nhãn.
- Nơi: *.
- Điều kiện: mọi tầng.
- Bối cảnh tác giả: *.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/data/03-su_kien-du-lieu.js`.

Nội dung động qua callback `quest_cam_t`; xem các câu văn phía dưới.

### Lựa chọn

- **1. Thử giải cấm chế**
  - `req`: `["ngo",12,"Ngộ tính"]`
  - `go`: `{"$hook":"quest_cam_c_0_go"}`
- **2. Mặc kệ, ngủ tiếp**
  - `go`: `{"$hook":"quest_cam_c_1_go"}`

### Câu kết/thông báo của phần xử lý đặc thù

- `event.cam.094`: Đêm nghỉ chân, bọc hàng của nhiệm vụ bỗng phát ra ánh sáng xanh mờ. Có cấm chế lạ bám trên đó.
- `event.cam.095`: Ngươi lần theo trận văn, gỡ từng nút. Cấm chế tan, lòng ngươi lĩnh hội thêm chút ít.
- `event.cam.096`: Cả đêm ngươi mơ thấy những tiếng thì thầm.

### Nối cơ chế

```json
{
  "questKinds": [
    "den"
  ]
}
```

<a id="manhmoi"></a>
## Manh mối mục tiêu — `manhmoi`

- Loại: quest; nguồn: Đường nhiệm vụ; chủ đề: Nhiệm vụ; cảm xúc: không gắn nhãn.
- Nơi: *.
- Điều kiện: mọi tầng.
- Bối cảnh tác giả: *.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/data/03-su_kien-du-lieu.js`.

Nội dung động qua callback `quest_manhmoi_t`; xem các câu văn phía dưới.

### Lựa chọn

- **1. Ngồi nghe kỹ**
  - `go`: `{"$hook":"quest_manhmoi_c_0_go"}`
- **2. Cho người ấy ít thuốc**
  - `go`: `{"$hook":"quest_manhmoi_c_1_go"}`

### Câu kết/thông báo của phần xử lý đặc thù

- `event.manhmoi.097`: Một người sống sót kể lại cách mục tiêu của nhiệm vụ ra tay.
- `event.manhmoi.098`: Ngươi ghi nhớ thói quen của nó. Trận tới sẽ chủ động hơn.
- `event.manhmoi.099`: Người ấy cảm tạ, chỉ thêm đường tắt.

### Nối cơ chế

```json
{
  "questKinds": [
    "diet"
  ]
}
```

<a id="tho"></a>
## Thợ săn hợp sức — `tho`

- Loại: quest; nguồn: Đường nhiệm vụ; chủ đề: Nhiệm vụ; cảm xúc: không gắn nhãn.
- Nơi: *.
- Điều kiện: mọi tầng.
- Bối cảnh tác giả: *.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/data/03-su_kien-du-lieu.js`.

Nội dung động qua callback `quest_tho_t`; xem các câu văn phía dưới.

### Lựa chọn

- **1. Đồng ý chia đôi**
  - `go`: `{"$hook":"quest_tho_c_0_go"}`
- **2. Tự làm một mình**
  - `go`: `{"$hook":"quest_tho_c_1_go"}`

### Câu kết/thông báo của phần xử lý đặc thù

- `event.tho.100`: Một thợ săn già cũng đang lùng mục tiêu của nhiệm vụ, muốn chia đôi phần thưởng nếu hợp sức.
- `event.tho.101`: Lão chỉ cho ngươi chỗ nó hay lui tới. Thưởng chia đôi, nhưng dễ tìm hơn hẳn.
- `event.tho.102`: thưởng giảm một nửa
- `event.tho.103`: Chia cho thợ săn
- `event.tho.104`: Lão nhún vai: “Tùy ngươi.”

### Nối cơ chế

```json
{
  "questKinds": [
    "diet"
  ]
}
```
