# content/events/nghe/y.json

Nguồn chuẩn: `content/events/nghe/y.json`. Bản đọc tự sinh. Cú pháp: xem [guideline](../../GUIDELINE.md).

<a id="ng_y_khong_tien"></a>
## Bệnh nhân không tiền — `ng_y_khong_tien`

- Loại: event; nguồn: Khám phá; chủ đề: Sinh kế; cảm xúc: nghe:y, nghe-tang:0.
- Nơi: thôn trấn, thành trì, chợ phiên tu sĩ.
- Điều kiện: mọi tầng; một lần/kiếp; nghỉ 720 giờ.
- Bối cảnh tác giả: .
- Vai: `{}`.
- Xuất xứ: `d5.3` / `content/events/nghe/y.json`.

Người mẹ bế đứa con sốt hầm hập, quỳ trước hiệu thuốc. Trong tay chị không có một đồng.

### Lựa chọn

- **1. Chữa, không lấy tiền**
  Sáng hôm sau đứa bé hạ sốt. Chị đem tới một giỏ trứng gà.
  - `e`: `{"nxp":["y",6],"deed":"bo_thi"}`
- **2. Bảo chị đi chỗ khác**
  Chị bế con đi trong mưa. Ngươi đóng cửa hiệu sớm hơn mọi ngày.
  - `e`: `{}`

<a id="ng_y_thu_thuoc"></a>
## Thử thuốc trên mình — `ng_y_thu_thuoc`

- Loại: event; nguồn: Khám phá; chủ đề: Sinh kế; cảm xúc: nghe:y, nghe-tang:0.
- Nơi: thôn trấn, thành trì, chợ phiên tu sĩ.
- Điều kiện: mọi tầng; một lần/kiếp; nghỉ 720 giờ.
- Bối cảnh tác giả: .
- Vai: `{}`.
- Xuất xứ: `d5.3` / `content/events/nghe/y.json`.

Một bài thuốc mới chép được, không ai dám uống thử.

### Lựa chọn

- **1. Tự uống thử**
  - `chk`: `["tam",9]`
  - **Thành công**: Ngươi sốt một đêm, sáng ra ghi lại đủ từng triệu chứng. Bài thuốc dùng được.
    `{"e":{"nxp":["y",10]}}`
  - **Thất bại**: Ngươi nôn thốc nôn tháo ba ngày.
    `{"e":{"hp":"-20%","nxp":["y",4]}}`
- **2. Cất đi**
  Ngươi kẹp bài thuốc vào sách, đợi ngày có thầy giỏi hỏi.

<a id="ng_y_thay_cung"></a>
## Tranh với thầy cúng — `ng_y_thay_cung`

- Loại: event; nguồn: Khám phá; chủ đề: Sinh kế; cảm xúc: nghe:y, nghe-tang:0.
- Nơi: thôn trấn, thành trì, chợ phiên tu sĩ.
- Điều kiện: mọi tầng; một lần/kiếp; nghỉ 720 giờ.
- Bối cảnh tác giả: .
- Vai: `{}`.
- Xuất xứ: `d5.3` / `content/events/nghe/y.json`.

Ông thầy cúng trong làng bảo bệnh của nhà kia là do ma làm, đòi một con lợn để trừ tà. Người nhà nhìn ngươi.

### Lựa chọn

- **1. Nói thẳng là bệnh, không phải ma**
  - `chk`: `["ngo",9]`
  - **Thành công**: Ngươi bắt mạch, kê đơn. Ba hôm sau người bệnh ngồi dậy được. Thầy cúng bỏ đi.
    `{"e":{"bac":40,"nxp":["y",8]}}`
  - **Thất bại**: Người nhà tin thầy cúng. Ngươi bị đuổi ra cổng.
    `{"e":{"bac":-30}}`
- **2. Không xen vào**
  Tiếng mõ trừ tà vang suốt đêm. Sáng ra nhà ấy có tang.
  - `e`: `{"tamma":3}`

<a id="ng_y_do_de"></a>
## Đỡ đẻ khó — `ng_y_do_de`

- Loại: event; nguồn: Khám phá; chủ đề: Sinh kế; cảm xúc: nghe:y, nghe-tang:0.
- Nơi: thôn trấn, thành trì, chợ phiên tu sĩ.
- Điều kiện: mọi tầng; một lần/kiếp; nghỉ 720 giờ.
- Bối cảnh tác giả: .
- Vai: `{}`.
- Xuất xứ: `d5.3` / `content/events/nghe/y.json`.

Nửa đêm có người đập cửa. Vợ hắn đau đẻ từ chiều, bà đỡ đã bó tay.

### Lựa chọn

- **1. Đi ngay**
  - `chk`: `["ngo",10]`
  - **Thành công**: Gần sáng, tiếng khóc trẻ con vang lên. Người cha quỳ xuống trước ngươi.
    `{"e":{"bac":60,"nxp":["y",10],"deed":"cuu_nguoi"}}`
  - **Thất bại**: Ngươi giữ được người mẹ. Đứa bé không qua khỏi.
    `{"e":{"tamma":8,"nxp":["y",4]}}`
- **2. Bảo hắn đi tìm thầy khác**
  Hắn chạy đi trong đêm. Ngươi không ngủ lại được.
  - `e`: `{"tamma":3}`

<a id="ng_y_dai_dich"></a>
## Đại dịch — `ng_y_dai_dich`

- Loại: event; nguồn: Khám phá; chủ đề: Sinh kế; cảm xúc: nghe:y, nghe-tang:1.
- Nơi: thôn trấn.
- Điều kiện: mọi tầng; một lần/kiếp; nghỉ 720 giờ.
- Bối cảnh tác giả: .
- Vai: `{}`.
- Xuất xứ: `d5.3` / `content/events/nghe/y.json`.

Dịch lan khắp làng, nhà nào cũng có người nằm. Người khỏe đã bỏ đi gần hết.

### Lựa chọn

- **1. Ở lại chữa**
  Mười ngày liền ngươi không ngủ đủ một canh. Dịch lui dần. Ngươi gầy rộc.
  - `e`: `{"h":240,"nxp":["y",20],"hp":"-20%","deed":"cuu_dich"}`
- **2. Rời làng**
  Ngươi đi không ngoái lại. Tiếng ho đuổi theo tới đầu làng.
  - `e`: `{}`

<a id="ng_y_quy_nhan"></a>
## Quý nhân bệnh nặng — `ng_y_quy_nhan`

- Loại: event; nguồn: Khám phá; chủ đề: Sinh kế; cảm xúc: nghe:y, nghe-tang:1.
- Nơi: thành trì.
- Điều kiện: mọi tầng; một lần/kiếp; nghỉ 720 giờ.
- Bối cảnh tác giả: .
- Vai: `{}`.
- Xuất xứ: `d5.3` / `content/events/nghe/y.json`.

Phủ quan cho người tới mời: lão thái gia bệnh nặng, chữa khỏi có thưởng lớn.

### Lựa chọn

- **1. Nhận lời**
  - `chk`: `["ngo",11]`
  - **Thành công**: Bệnh lão thái gia lui. Phủ quan trả công hậu, còn khắc biển tặng.
    `{"e":{"bac":800,"nxp":["y",15]}}`
  - **Thất bại**: Bệnh trở nặng. Ngươi bị đánh hai mươi trượng rồi đuổi đi.
    `{"e":{"hp":"-20%","bac":-200}}`
- **2. Viện cớ từ chối**
  Người nhà quan liếc ngươi, không nói gì.

<a id="ng_y_ep_doc"></a>
## Bị ép bào chế độc — `ng_y_ep_doc`

- Loại: event; nguồn: Khám phá; chủ đề: Sinh kế; cảm xúc: nghe:y, nghe-tang:1.
- Nơi: thôn trấn, thành trì, chợ phiên tu sĩ.
- Điều kiện: mọi tầng; một lần/kiếp; nghỉ 720 giờ.
- Bối cảnh tác giả: .
- Vai: `{}`.
- Xuất xứ: `d5.3` / `content/events/nghe/y.json`.

Một gã mặt lạnh đặt túi bạc lên quầy: cần một liều thuốc không mùi không vị, uống vào ngủ không dậy.

### Lựa chọn

- **1. Làm**
  Ngươi bào chế trong đêm. Túi bạc nặng tay, còn lòng thì nặng hơn.
  - `e`: `{"bac":300,"deed":"dau_doc"}`
- **2. Từ chối**
  - `chk`: `["tam",11]`
  - **Thành công**: Hắn nhìn ngươi hồi lâu rồi cầm túi bạc đi.
    `{"e":{}}`
  - **Thất bại**: Hắn đập vỡ quầy thuốc, đánh ngươi một trận rồi mới đi.
    `{"e":{"hp":"-30%"}}`

<a id="ng_y_ma_tu"></a>
## Bệnh nhân lạ — `ng_y_ma_tu`

- Loại: event; nguồn: Khám phá; chủ đề: Sinh kế; cảm xúc: nghe:y, nghe-tang:1.
- Nơi: thôn trấn, thành trì, chợ phiên tu sĩ.
- Điều kiện: mọi tầng; một lần/kiếp; nghỉ 720 giờ.
- Bối cảnh tác giả: .
- Vai: `{}`.
- Xuất xứ: `d5.3` / `content/events/nghe/y.json`.

Người khách nửa đêm mặc áo đen, vết thương trên vai bốc khói đen. Hắn trả trước, không nói tên.

### Lựa chọn

- **1. Chữa cho hắn**
  Ngươi rửa vết thương bằng nước muối, đắp thuốc. Hắn đi trước khi trời sáng, để lại tiền công gấp ba.
  - `e`: `{"bac":200,"nxp":["y",8]}`
- **2. Từ chối, đóng cửa**
  Hắn cười nhạt, biến vào bóng tối. Mấy hôm sau nghe đồn làng bên có người chết lạ.
  - `e`: `{}`

<a id="ng_y_chua_nham"></a>
## Chữa nhầm — `ng_y_chua_nham`

- Loại: event; nguồn: Khám phá; chủ đề: Sinh kế; cảm xúc: nghe:y, nghe-tang:2.
- Nơi: thôn trấn, thành trì, chợ phiên tu sĩ.
- Điều kiện: mọi tầng; một lần/kiếp; nghỉ 720 giờ.
- Bối cảnh tác giả: .
- Vai: `{}`.
- Xuất xứ: `d5.3` / `content/events/nghe/y.json`.

Một bệnh nhân uống thuốc ngươi kê mà bệnh nặng thêm. Người nhà kéo tới đông như hội.

### Lựa chọn

- **1. Nhận lỗi, đền tiền thuốc**
  Ngươi đổi bài thuốc, đền tiền. Người bệnh khỏi dần, người nhà thôi không làm khó.
  - `e`: `{"bac":-300,"tamma":5,"nxp":["y",10]}`
- **2. Đổ cho số trời**
  Họ chửi bới rồi bỏ đi. Từ đó vắng khách hẳn.
  - `e`: `{}`

<a id="ng_y_linh_duoc"></a>
## Linh dược quá đắt — `ng_y_linh_duoc`

- Loại: event; nguồn: Khám phá; chủ đề: Sinh kế; cảm xúc: nghe:y, nghe-tang:2.
- Nơi: thôn trấn, thành trì, chợ phiên tu sĩ.
- Điều kiện: mọi tầng; một lần/kiếp; nghỉ 720 giờ.
- Bối cảnh tác giả: .
- Vai: `{}`.
- Xuất xứ: `d5.3` / `content/events/nghe/y.json`.

Bệnh của đứa bé chỉ có một vị linh dược chữa được. Giá của nó bằng cả gia tài nhà nó.

### Lựa chọn

- **1. Bỏ tiền mình ra mua**
  Đứa bé khỏi bệnh. Cha mẹ nó khắc tên ngươi lên bàn thờ.
  - `e`: `{"bac":-500,"nxp":["y",10],"deed":"cuu_nguoi"}`
- **2. Tìm vị thuốc phàm thay thế**
  - `chk`: `["ngo",12]`
  - **Thành công**: Ba vị thuốc phàm phối với nhau, đủ đẩy lùi bệnh. Ngươi chép bài ấy vào sách.
    `{"e":{"nxp":["y",20]}}`
  - **Thất bại**: Thuốc không đủ sức. Đứa bé yếu dần.
    `{"e":{"tamma":8}}`

<a id="ng_y_nguoi_than"></a>
## Người thân bệnh nặng — `ng_y_nguoi_than`

- Loại: event; nguồn: Khám phá; chủ đề: Sinh kế; cảm xúc: nghe:y, nghe-tang:2.
- Nơi: thôn trấn, thành trì, chợ phiên tu sĩ.
- Điều kiện: mọi tầng; một lần/kiếp; nghỉ 720 giờ.
- Bối cảnh tác giả: .
- Vai: `{}`.
- Xuất xứ: `d5.3` / `content/events/nghe/y.json`.

Lá thư từ quê: người nhà ngươi bệnh nặng, các thầy trong vùng đều lắc đầu.

### Lựa chọn

- **1. Về quê chữa**
  - `chk`: `["ngo",12]`
  - **Thành công**: Ngươi thức trắng bảy đêm bên giường bệnh. Người nhà qua khỏi.
    `{"e":{"h":168,"tamma":-10,"nxp":["y",15]}}`
  - **Thất bại**: Ngươi về kịp để nắm tay lần cuối.
    `{"e":{"h":168,"tamma":15}}`
- **2. Gửi thuốc về**
  Ngươi gói thuốc nhờ người mang về. Đêm nào cũng ngồi nhìn về phía quê.
  - `e`: `{"bac":-100,"tamma":5}`

<a id="ng_y_y_thu"></a>
## Truyền y thư — `ng_y_y_thu`

- Loại: event; nguồn: Khám phá; chủ đề: Sinh kế; cảm xúc: nghe:y, nghe-tang:2.
- Nơi: thôn trấn, thành trì, chợ phiên tu sĩ.
- Điều kiện: mọi tầng; một lần/kiếp; nghỉ 720 giờ.
- Bối cảnh tác giả: .
- Vai: `{}`.
- Xuất xứ: `d5.3` / `content/events/nghe/y.json`.

Học trò xin ngươi chép lại những gì đã học cả đời.

### Lựa chọn

- **1. Viết lại y thư**
  Một tháng ngồi viết. Ngươi nhận ra mình đã biết nhiều hơn mình tưởng.
  - `e`: `{"h":720,"nxp":["y",30]}`
- **2. Dạy miệng cho học trò**
  Mỗi tối một bài. Học trò ghi chép, ngươi thì ngẫm lại.
  - `e`: `{"nxp":["y",10]}`
