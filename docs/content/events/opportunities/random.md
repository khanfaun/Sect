# content/events/opportunities/random.json

Nguồn chuẩn: `content/events/opportunities/random.json`. Bản đọc tự sinh. Cú pháp: xem [guideline](../../GUIDELINE.md).

<a id="doitho"></a>
## Lão nhân đổi thọ — `doitho`

- Loại: opportunity; nguồn: Kỳ ngộ; chủ đề: Kỳ ngộ; cảm xúc: không gắn nhãn.
- Nơi: *.
- Điều kiện: mọi tầng; nghỉ 4320 giờ.
- Bối cảnh tác giả: *.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/data/03-su_kien-du-lieu.js`.

Bên vách đá có lão nhân tóc bạc ngồi đánh cờ một mình. Lão ngẩng lên: “Ngươi có muốn thông tuệ hơn người? Ta lấy của ngươi tám năm thọ.”

### Lựa chọn

- **1. Đổi tám năm thọ lấy ngộ tính**
  - `cost`: `"−8 năm thọ nguyên"`
  - `go`: `{"$hook":"ky_doitho_c_0_go"}`
- **2. Cúi chào rồi đi**
  - `go`: `{"$hook":"ky_doitho_c_1_go"}`

### Câu kết/thông báo của phần xử lý đặc thù

- `event.doitho.005`: Lão chạm hai ngón tay lên trán ngươi. Đầu óc bỗng sáng như gương. Lúc tỉnh lại, lão đã biến mất, tóc mai ngươi điểm bạc.
- `event.doitho.006`: Lão cười khà, tiếp tục ván cờ dang dở.

### Nối cơ chế

```json
{
  "paid": true,
  "joke": false,
  "system": false
}
```

<a id="huyette"></a>
## Huyết tế bảo vật — `huyette`

- Loại: opportunity; nguồn: Kỳ ngộ; chủ đề: Kỳ ngộ; cảm xúc: không gắn nhãn.
- Nơi: phế tích, ma địa, hang động.
- Điều kiện: mọi tầng; nghỉ 4320 giờ.
- Bối cảnh tác giả: *.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/data/03-su_kien-du-lieu.js`.

Một tế đàn cổ phủ rêu, trên khắc: “Hiến một bảo vật, đổi lấy một bảo vật.” Rãnh máu vẫn còn ướt.

### Lựa chọn

- **1. Hiến một món trang bị trong ô túi mở**
  - `cost`: `"mất một món trang bị ngẫu nhiên"`
  - `need`: `{"$hook":"ky_huyette_c_0_need"}`
  - `go`: `{"$hook":"ky_huyette_c_0_go"}`
- **2. Không dám, rời đi**
  - `go`: `{"$hook":"ky_huyette_c_1_go"}`

### Câu kết/thông báo của phần xử lý đặc thù

- `event.huyette.007`: Không có trang bị trong ô túi mở
- `event.huyette.008`:  tan vào tế đàn. Khói đỏ cuộn lên, rồi một bảo vật khác từ từ hiện ra.
- `event.huyette.009`: Đã hiến
- `event.huyette.010`: Ngươi lùi lại. Sau lưng như có tiếng ai thở dài.

### Nối cơ chế

```json
{
  "paid": true,
  "joke": false,
  "system": false
}
```

<a id="linhtuyen"></a>
## Linh tuyền cấm địa — `linhtuyen`

- Loại: opportunity; nguồn: Kỳ ngộ; chủ đề: Kỳ ngộ; cảm xúc: không gắn nhãn.
- Nơi: núi non, sông hồ.
- Điều kiện: mọi tầng; nghỉ 4320 giờ.
- Bối cảnh tác giả: *.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/data/03-su_kien-du-lieu.js`.

Giữa hẻm núi có một dòng suối xanh biếc, linh khí đặc quánh. Nhưng nước lạnh thấu xương, ngấm vào là tổn kinh mạch.

### Lựa chọn

- **1. Ngâm mình trong linh tuyền**
  - `cost`: `"khí huyết tối đa −10% vĩnh viễn"`
  - `go`: `{"$hook":"ky_linhtuyen_c_0_go"}`
- **2. Chỉ vốc một ngụm**
  - `go`: `{"$hook":"ky_linhtuyen_c_1_go"}`

### Câu kết/thông báo của phần xử lý đặc thù

- `event.linhtuyen.011`: Ngươi run lên từng cơn. Khi bước ra, linh lực trong người dồi dào gấp bội, còn thân thể thì yếu đi trông thấy.
- `event.linhtuyen.012`: Một ngụm nước lạnh buốt. Tinh thần tỉnh táo hẳn.

### Nối cơ chế

```json
{
  "paid": true,
  "joke": false,
  "system": false
}
```

<a id="mataam"></a>
## Ma tâm kinh — `mataam`

- Loại: opportunity; nguồn: Kỳ ngộ; chủ đề: Kỳ ngộ; cảm xúc: không gắn nhãn.
- Nơi: rừng sâu, phế tích.
- Điều kiện: mọi tầng; nghỉ 4320 giờ.
- Bối cảnh tác giả: *.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/data/03-su_kien-du-lieu.js`.

Trong hốc cây cháy đen có cuốn sách da người. Chữ trong đó như đang bò, thì thầm hứa hẹn sức mạnh.

### Lựa chọn

- **1. Đọc hết cuốn sách**
  - `cost`: `"đạo tâm −3 vĩnh viễn, tâm ma +15"`
  - `go`: `{"$hook":"ky_mataam_c_0_go"}`
- **2. Đốt nó đi**
  - `go`: `{"$hook":"ky_mataam_c_1_go"}`

### Câu kết/thông báo của phần xử lý đặc thù

- `event.mataam.013`: Từng chữ khắc vào xương. Ngươi thấy mình mạnh lên, nhưng giấc ngủ không còn yên.
- `event.mataam.014`: Lửa bén vào, sách kêu lên như người. Lòng ngươi thanh thản.

### Nối cơ chế

```json
{
  "paid": true,
  "joke": false,
  "system": false
}
```

<a id="cuoc"></a>
## Đánh cược với tiên nhân — `cuoc`

- Loại: opportunity; nguồn: Kỳ ngộ; chủ đề: Kỳ ngộ; cảm xúc: không gắn nhãn.
- Nơi: thôn trấn, thành trì, núi non.
- Điều kiện: mọi tầng; nghỉ 4320 giờ.
- Bối cảnh tác giả: *.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/data/03-su_kien-du-lieu.js`.

Một gã say mặc đạo bào rách, tay cầm hồ lô: “Cược không? Ngươi đặt một nửa linh thạch, ta đặt một viên đan đột phá.”

### Lựa chọn

- **1. Đặt cược một nửa linh thạch**
  - `cost`: `"mất một nửa linh thạch đang có"`
  - `need`: `{"$hook":"ky_cuoc_c_0_need"}`
  - `go`: `{"$hook":"ky_cuoc_c_0_go"}`
- **2. Lắc đầu đi tiếp**
  - `go`: `{"$hook":"ky_cuoc_c_1_go"}`

### Câu kết/thông báo của phần xử lý đặc thù

- `event.cuoc.015`: Không đủ linh thạch
- `event.cuoc.016`: Linh thạch
- `event.cuoc.017`: Gã lắc hồ lô, đổ ra ba hạt xúc xắc. Ngươi thắng. Gã cười ha hả, ném viên đan qua.
- `event.cuoc.018`: Ba hạt xúc xắc lăn tròn. Ngươi thua. Gã cười, ôm túi linh thạch, biến vào mây.
- `event.cuoc.019`: Gã nhún vai, ngửa cổ tu một ngụm.

### Nối cơ chế

```json
{
  "paid": true,
  "joke": false,
  "system": false
}
```

<a id="saoroi"></a>
## Sao rơi trước mặt — `saoroi`

- Loại: opportunity; nguồn: Kỳ ngộ; chủ đề: Kỳ ngộ; cảm xúc: không gắn nhãn.
- Nơi: rừng sâu, hoang nguyên, núi non.
- Điều kiện: mọi tầng; dem; nghỉ 4320 giờ.
- Bối cảnh tác giả: *.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/data/03-su_kien-du-lieu.js`.

Đêm ấy một vệt sáng rạch trời, rơi ngay bãi cỏ trước mặt ngươi. Trong hố còn ấm, một món đồ đang tỏa quang.

### Lựa chọn

- **1. Nhặt lên**
  - `go`: `{"$hook":"ky_saoroi_c_0_go"}`

### Câu kết/thông báo của phần xử lý đặc thù

- `event.saoroi.020`: Là một bảo vật, còn vương hơi nóng của trời cao. Hữu duyên mới gặp.

### Nối cơ chế

```json
{
  "paid": false,
  "joke": false,
  "system": false
}
```

<a id="mongtien"></a>
## Tiên nhân báo mộng — `mongtien`

- Loại: opportunity; nguồn: Kỳ ngộ; chủ đề: Kỳ ngộ; cảm xúc: không gắn nhãn.
- Nơi: *.
- Điều kiện: mọi tầng; dem; nghỉ 4320 giờ.
- Bối cảnh tác giả: *.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/data/03-su_kien-du-lieu.js`.

Trong giấc ngủ, ngươi thấy mình đứng giữa biển mây. Một bóng người áo trắng giảng một đoạn kinh rồi tan biến.

### Lựa chọn

- **1. Ngồi dậy ghi nhớ**
  - `go`: `{"$hook":"ky_mongtien_c_0_go"}`

### Câu kết/thông báo của phần xử lý đặc thù

- `event.mongtien.021`: Lời kinh vẫn còn văng vẳng. Ngươi ngộ ra thêm đôi điều.

### Nối cơ chế

```json
{
  "paid": false,
  "joke": false,
  "system": false
}
```

<a id="linhchi"></a>
## Linh chi ngàn năm — `linhchi`

- Loại: opportunity; nguồn: Kỳ ngộ; chủ đề: Kỳ ngộ; cảm xúc: không gắn nhãn.
- Nơi: rừng sâu, dược cốc.
- Điều kiện: mọi tầng; nghỉ 4320 giờ.
- Bối cảnh tác giả: *.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/data/03-su_kien-du-lieu.js`.

Dưới gốc cây cổ thụ đổ, một cây linh chi to bằng chiếc nón lá, vân đỏ như máu.

### Lựa chọn

- **1. Hái và ăn ngay**
  - `go`: `{"$hook":"ky_linhchi_c_0_go"}`

### Câu kết/thông báo của phần xử lý đặc thù

- `event.linhchi.022`: Vị đắng chát, rồi một luồng ấm chạy khắp thân. Ngươi thấy mình trẻ ra.

### Nối cơ chế

```json
{
  "paid": false,
  "joke": false,
  "system": false
}
```

<a id="lakhach"></a>
## Kiếm khách vô danh — `lakhach`

- Loại: opportunity; nguồn: Kỳ ngộ; chủ đề: Kỳ ngộ; cảm xúc: không gắn nhãn.
- Nơi: *.
- Điều kiện: mọi tầng; nghỉ 4320 giờ.
- Bối cảnh tác giả: *.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/data/03-su_kien-du-lieu.js`.

Một kiếm khách lướt qua, dừng lại nhìn ngươi hồi lâu: “Căn cốt không tệ.” Rồi múa một đường kiếm cho ngươi xem.

### Lựa chọn

- **1. Chăm chú xem**
  - `go`: `{"$hook":"ky_lakhach_c_0_go"}`

### Câu kết/thông báo của phần xử lý đặc thù

- `event.lakhach.023`: Đường kiếm như nước chảy. Ngươi nhìn mà thấy tay mình ngứa ngáy.

### Nối cơ chế

```json
{
  "paid": false,
  "joke": false,
  "system": false
}
```

<a id="bikip"></a>
## Bí kíp gia truyền — `bikip`

- Loại: opportunity; nguồn: Kỳ ngộ; chủ đề: Kỳ ngộ; cảm xúc: không gắn nhãn.
- Nơi: thôn trấn, thành trì, chợ phiên tu sĩ.
- Điều kiện: mọi tầng; nghỉ 4320 giờ.
- Bối cảnh tác giả: *.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/data/03-su_kien-du-lieu.js`.

Một gã mặt mũi bí hiểm kéo ngươi vào góc: “Bí kíp tuyệt thế của tổ tiên ta. Thấy ngươi có duyên, chỉ lấy ba linh thạch.”

### Lựa chọn

- **1. Mua ngay kẻo lỡ**
  - `need`: `{"$hook":"ky_bikip_c_0_need"}`
  - `go`: `{"$hook":"ky_bikip_c_0_go"}`
- **2. Mỉm cười từ chối**
  - `go`: `{"$hook":"ky_bikip_c_1_go"}`

### Câu kết/thông báo của phần xử lý đặc thù

- `event.bikip.024`: Không đủ linh thạch
- `event.bikip.025`: Về mở ra đọc: “Món kho cá ngon nhất làng.” Trang cuối còn ghi: “Thêm chút đường.” Ngươi bật cười, lòng nhẹ hẳn.
- `event.bikip.026`: Linh thạch
- `event.bikip.027`: Gã lắc đầu tiếc rẻ rồi chạy sang mời người khác.

### Nối cơ chế

```json
{
  "paid": false,
  "joke": true,
  "system": false
}
```

<a id="tiendan"></a>
## Tiên đan giá rẻ — `tiendan`

- Loại: opportunity; nguồn: Kỳ ngộ; chủ đề: Kỳ ngộ; cảm xúc: không gắn nhãn.
- Nơi: thôn trấn, thành trì, chợ phiên tu sĩ.
- Điều kiện: mọi tầng; nghỉ 4320 giờ.
- Bối cảnh tác giả: *.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/data/03-su_kien-du-lieu.js`.

Đạo sĩ dạo bày bán “Cửu Chuyển Kim Đan, uống vào thành tiên”, giá chỉ năm linh thạch một viên. Đan đen bóng, mùi hơi lạ.

### Lựa chọn

- **1. Mua một viên, uống thử**
  - `need`: `{"$hook":"ky_tiendan_c_0_need"}`
  - `go`: `{"$hook":"ky_tiendan_c_0_go"}`
- **2. Hỏi đan làm từ gì**
  - `go`: `{"$hook":"ky_tiendan_c_1_go"}`

### Câu kết/thông báo của phần xử lý đặc thù

- `event.tiendan.028`: Không đủ linh thạch
- `event.tiendan.029`: Uống xong ngươi đau bụng cả buổi chiều. Tới lúc nhìn kỹ viên thứ hai mới nhận ra: là phân dê vo tròn, lăn qua bột than.
- `event.tiendan.030`: Linh thạch
- `event.tiendan.031`: Khí huyết
- `event.tiendan.032`: Đạo sĩ ấp úng, thu sạp chạy mất.

### Nối cơ chế

```json
{
  "paid": false,
  "joke": true,
  "system": false
}
```

<a id="anmay"></a>
## Cao nhân ăn mày — `anmay`

- Loại: opportunity; nguồn: Kỳ ngộ; chủ đề: Kỳ ngộ; cảm xúc: không gắn nhãn.
- Nơi: thôn trấn, thành trì, chợ phiên tu sĩ.
- Điều kiện: mọi tầng; nghỉ 4320 giờ.
- Bối cảnh tác giả: *.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/data/03-su_kien-du-lieu.js`.

Lão ăn mày rách rưới nắm áo ngươi: “Ta là ẩn thế cao nhân. Cúi đầu lại gần, ta truyền công cho.”

### Lựa chọn

- **1. Cúi đầu lại gần**
  - `go`: `{"$hook":"ky_anmay_c_0_go"}`
- **2. Cho lão cái bánh rồi đi**
  - `go`: `{"$hook":"ky_anmay_c_1_go"}`

### Câu kết/thông báo của phần xử lý đặc thù

- `event.anmay.033`: Lão vỗ “bốp” một cái lên trán ngươi, hét: “Ngộ chưa!” Ngươi còn đang choáng thì lão đã cắp túi linh thạch chạy biến.
- `event.anmay.034`: Bị móc túi
- `event.anmay.035`: Lão nhai ngấu nghiến, gật gù: “Hậu sinh khả úy.”

### Nối cơ chế

```json
{
  "paid": false,
  "joke": true,
  "system": false
}
```

<a id="thanbinh"></a>
## Thần binh dưới bùn — `thanbinh`

- Loại: opportunity; nguồn: Kỳ ngộ; chủ đề: Kỳ ngộ; cảm xúc: không gắn nhãn.
- Nơi: sông hồ, thôn trấn.
- Điều kiện: mọi tầng; nghỉ 4320 giờ.
- Bối cảnh tác giả: *.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/data/03-su_kien-du-lieu.js`.

Dưới đáy ao cạn, một thanh binh khí cắm thẳng, quanh chuôi như có ánh sáng mờ.

### Lựa chọn

- **1. Lội xuống rút lên**
  - `go`: `{"$hook":"ky_thanbinh_c_0_go"}`

### Câu kết/thông báo của phần xử lý đặc thù

- `event.thanbinh.036`: Dao phay rỉ sét
- `event.thanbinh.037`: Rút mãi mới ra. Ánh sáng là do mặt trời phản chiếu. Chuôi còn khắc chữ “Hàng thịt chợ Đông”.

### Nối cơ chế

```json
{
  "paid": false,
  "joke": true,
  "system": false
}
```

<a id="khobau"></a>
## Kho báu dưới gốc đa — `khobau`

- Loại: opportunity; nguồn: Kỳ ngộ; chủ đề: Kỳ ngộ; cảm xúc: không gắn nhãn.
- Nơi: thôn trấn.
- Điều kiện: mọi tầng; nghỉ 4320 giờ.
- Bối cảnh tác giả: *.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/data/03-su_kien-du-lieu.js`.

Ngươi nhặt được tấm bản đồ rách, đánh dấu chữ thập đỏ dưới gốc đa đầu làng: “Kho báu ở đây.”

### Lựa chọn

- **1. Đào suốt đêm**
  - `go`: `{"$hook":"ky_khobau_c_0_go"}`
- **2. Vứt bản đồ đi**
  - `go`: `{"$hook":"ky_khobau_c_1_go"}`

### Câu kết/thông báo của phần xử lý đặc thù

- `event.khobau.038`: Gần sáng, xẻng chạm vào một cái hũ. Mở ra: dưa muối, còn khá ngon. Dưới đáy hũ có mảnh giấy: “Bà để dành cho cháu.”
- `event.khobau.039`: Thời gian trôi qua
- `event.khobau.040`: Gió thổi tấm bản đồ bay mất. Có lẽ là duyên chưa tới, hoặc là may.

### Nối cơ chế

```json
{
  "paid": false,
  "joke": true,
  "system": false
}
```

<a id="tp_cothu"></a>
## Thạch thất cổ nhân — `tp_cothu`

- Loại: opportunity; nguồn: Kỳ ngộ; chủ đề: Kỳ ngộ; cảm xúc: không gắn nhãn.
- Nơi: *.
- Điều kiện: mọi tầng; nghỉ 4320 giờ.
- Bối cảnh tác giả: *.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/data/03-su_kien-du-lieu.js`.

Mưa lở một mảng vách núi, lộ ra thạch thất của cổ nhân. Trên bàn đá có một quyển sách lụa, chữ vẫn còn rõ.

### Lựa chọn

- **1. Cất quyển sách**
  - `go`: `{"$hook":"ky_tp_cothu_c_0_go"}`

### Câu kết/thông báo của phần xử lý đặc thù

- `event.tp_cothu.046`: Trang đầu ghi: “Người hữu duyên tự học.” Ngươi cẩn thận gói lại.

### Nối cơ chế

```json
{
  "paid": false,
  "joke": false,
  "system": false
}
```
