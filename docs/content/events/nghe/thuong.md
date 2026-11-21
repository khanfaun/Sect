# content/events/nghe/thuong.json

Nguồn chuẩn: `content/events/nghe/thuong.json`. Bản đọc tự sinh. Cú pháp: xem [guideline](../../GUIDELINE.md).

<a id="ng_thuong_cuop"></a>
## Hàng bị cướp — `ng_thuong_cuop`

- Loại: event; nguồn: Khám phá; chủ đề: Sinh kế; cảm xúc: nghe:thuong, nghe-tang:0.
- Nơi: thôn trấn, chợ phiên tu sĩ, thành trì.
- Điều kiện: mọi tầng; một lần/kiếp; nghỉ 720 giờ.
- Bối cảnh tác giả: .
- Vai: `{}`.
- Xuất xứ: `d5.3` / `content/events/nghe/thuong.json`.

Đường vắng, hai gã bịt mặt nhảy ra từ bụi rậm, giật lấy gánh hàng của ngươi.

### Lựa chọn

- **1. Bỏ hàng, giữ mạng**
  Ngươi chạy một mạch. Gánh hàng coi như mất.
  - `e`: `{"bac":-80}`
- **2. Giằng lại**
  - `chk`: `["tp",9]`
  - **Thành công**: Ngươi quật được một gã. Gã kia bỏ chạy.
    `{"e":{"nxp":["thuong",6]}}`
  - **Thất bại**: Ngươi bị đánh ngã, mất cả hàng lẫn tiền.
    `{"e":{"hp":"-20%","bac":-120}}`

<a id="ng_thuong_mua"></a>
## Mưa hỏng hàng — `ng_thuong_mua`

- Loại: event; nguồn: Khám phá; chủ đề: Sinh kế; cảm xúc: nghe:thuong, nghe-tang:0.
- Nơi: thôn trấn, chợ phiên tu sĩ, thành trì.
- Điều kiện: mọi tầng; một lần/kiếp; nghỉ 720 giờ.
- Bối cảnh tác giả: .
- Vai: `{}`.
- Xuất xứ: `d5.3` / `content/events/nghe/thuong.json`.

Cơn mưa bất chợt làm ướt sũng mấy bao hàng khô. Mùi mốc bốc lên.

### Lựa chọn

- **1. Bán tháo ngay**
  Người mua ép giá, ngươi đành gật.
  - `e`: `{"bac":10,"nxp":["thuong",2]}`
- **2. Phơi lại, bán dần**
  Phơi ba hôm, lựa ra được quá nửa còn dùng được.
  - `e`: `{"h":12,"bac":40,"nxp":["thuong",4]}`

<a id="ng_thuong_lot_tay"></a>
## Quan đòi lót tay — `ng_thuong_lot_tay`

- Loại: event; nguồn: Khám phá; chủ đề: Sinh kế; cảm xúc: nghe:thuong, nghe-tang:0.
- Nơi: thôn trấn, chợ phiên tu sĩ, thành trì.
- Điều kiện: mọi tầng; một lần/kiếp; nghỉ 720 giờ.
- Bối cảnh tác giả: .
- Vai: `{}`.
- Xuất xứ: `d5.3` / `content/events/nghe/thuong.json`.

Tên sai nha chặn quầy hàng, gõ gõ cán roi: hàng của ngươi "chưa có giấy".

### Lựa chọn

- **1. Dúi cho hắn ít tiền**
  Hắn nhét tiền vào tay áo, đi sang quầy khác.
  - `e`: `{"bac":-60,"nxp":["thuong",4]}`
- **2. Không đưa, đòi lên huyện**
  - `chk`: `["tam",10]`
  - **Thành công**: Hắn chột dạ, chửi vài câu rồi bỏ đi.
    `{"e":{"nxp":["thuong",6]}}`
  - **Thất bại**: Hắn tịch thu nửa gánh hàng, bảo ngươi lên huyện mà đòi.
    `{"e":{"bac":-150}}`

<a id="ng_thuong_hang_gia"></a>
## Hàng giả — `ng_thuong_hang_gia`

- Loại: event; nguồn: Khám phá; chủ đề: Sinh kế; cảm xúc: nghe:thuong, nghe-tang:0.
- Nơi: thôn trấn, chợ phiên tu sĩ, thành trì.
- Điều kiện: mọi tầng; một lần/kiếp; nghỉ 720 giờ.
- Bối cảnh tác giả: .
- Vai: `{}`.
- Xuất xứ: `d5.3` / `content/events/nghe/thuong.json`.

Lô hàng mới mua về toàn đồ giả: sâm làm bằng rễ cây tẩm mật.

### Lựa chọn

- **1. Bán cho khách lạ qua đường**
  Bán hết trong hai ngày. Ngươi không dám ngẩng đầu khi có khách quen.
  - `e`: `{"bac":150,"deed":"lua_loi"}`
- **2. Đốt bỏ**
  Lỗ một khoản. Nhưng tiếng ngươi trong chợ vẫn sạch.
  - `e`: `{"bac":-50,"nxp":["thuong",5]}`

<a id="ng_thuong_tu_si"></a>
## Tu sĩ mua hàng — `ng_thuong_tu_si`

- Loại: event; nguồn: Khám phá; chủ đề: Sinh kế; cảm xúc: nghe:thuong, nghe-tang:1.
- Nơi: thôn trấn, chợ phiên tu sĩ, thành trì.
- Điều kiện: mọi tầng; một lần/kiếp; nghỉ 720 giờ.
- Bối cảnh tác giả: .
- Vai: `{}`.
- Xuất xứ: `d5.3` / `content/events/nghe/thuong.json`.

Một người áo trắng đứng trước quầy, chỉ vào mấy món đồ cổ, đặt xuống một viên đá sáng như ngọc.

### Lựa chọn

- **1. Nhận viên linh thạch**
  Viên đá ấm trong tay. Người kia đi rồi, quanh quầy còn phảng phất mùi trầm.
  - `e`: `{"st":1,"nxp":["thuong",6]}`
- **2. Xin trả bằng bạc**
  Hắn nhíu mày, rồi cũng đặt xuống một túi bạc.
  - `e`: `{"bac":300,"nxp":["thuong",6]}`

<a id="ng_thuong_phan"></a>
## Bạn hàng phản — `ng_thuong_phan`

- Loại: event; nguồn: Khám phá; chủ đề: Sinh kế; cảm xúc: nghe:thuong, nghe-tang:1.
- Nơi: thôn trấn, chợ phiên tu sĩ, thành trì.
- Điều kiện: mọi tầng; một lần/kiếp; nghỉ 720 giờ.
- Bối cảnh tác giả: .
- Vai: `{}`.
- Xuất xứ: `d5.3` / `content/events/nghe/thuong.json`.

Người cùng góp vốn đã ôm tiền lẫn hàng trốn đi trong đêm.

### Lựa chọn

- **1. Kiện lên quan**
  - `chk`: `["ngo",10]`
  - **Thành công**: Ngươi đem đủ giấy tờ. Quan xử cho ngươi đòi lại được một phần.
    `{"e":{"h":24,"bac":300,"nxp":["thuong",8]}}`
  - **Thất bại**: Giấy tờ thiếu dấu, kiện không thành, còn mất tiền lót.
    `{"e":{"h":24,"bac":-100}}`
- **2. Coi như học phí**
  Ngươi ghi tên hắn vào trong lòng, rồi làm lại từ đầu.
  - `e`: `{"tamma":5,"nxp":["thuong",6]}`

<a id="ng_thuong_con_no"></a>
## Con nợ chết — `ng_thuong_con_no`

- Loại: event; nguồn: Khám phá; chủ đề: Sinh kế; cảm xúc: nghe:thuong, nghe-tang:1.
- Nơi: thôn trấn, chợ phiên tu sĩ, thành trì.
- Điều kiện: mọi tầng; một lần/kiếp; nghỉ 720 giờ.
- Bối cảnh tác giả: .
- Vai: `{}`.
- Xuất xứ: `d5.3` / `content/events/nghe/thuong.json`.

Người nợ ngươi một khoản lớn vừa chết. Vợ con hắn quỳ trước cửa, xin khất.

### Lựa chọn

- **1. Đòi bằng được**
  Họ bán nhà trả nợ. Ngươi nhận tiền, cả xóm nhìn ngươi khác đi.
  - `e`: `{"bac":200,"deed":"ep_ta_dien"}`
- **2. Xé giấy nợ**
  Bà vợ lạy ngươi ba lạy. Tiếng ngươi trong xóm tốt lên.
  - `e`: `{"nxp":["thuong",4],"deed":"bo_thi"}`

<a id="ng_thuong_muoi_lau"></a>
## Buôn muối lậu — `ng_thuong_muoi_lau`

- Loại: event; nguồn: Khám phá; chủ đề: Sinh kế; cảm xúc: nghe:thuong, nghe-tang:1.
- Nơi: thôn trấn, chợ phiên tu sĩ, thành trì.
- Điều kiện: mọi tầng; một lần/kiếp; nghỉ 720 giờ.
- Bối cảnh tác giả: .
- Vai: `{}`.
- Xuất xứ: `d5.3` / `content/events/nghe/thuong.json`.

Một gã đội nón lá kéo ngươi vào góc: có chuyến muối lậu cần người chở qua trạm, lãi gấp mấy lần buôn thường.

### Lựa chọn

- **1. Nhận chuyến**
  - `chk`: `["tp",10]`
  - **Thành công**: Ngươi qua trạm trót lọt. Tiền công dày cộp.
    `{"e":{"bac":500,"nxp":["thuong",8]}}`
  - **Thất bại**: Trạm khám xe, ngươi bị phạt nặng, bị đánh mấy gậy.
    `{"e":{"bac":-300,"hp":"-20%"}}`
- **2. Từ chối**
  Gã nhổ bọt, đi tìm người khác.

<a id="ng_thuong_dau_co"></a>
## Đầu cơ năm đói — `ng_thuong_dau_co`

- Loại: event; nguồn: Khám phá; chủ đề: Sinh kế; cảm xúc: nghe:thuong, nghe-tang:2.
- Nơi: thôn trấn, chợ phiên tu sĩ, thành trì.
- Điều kiện: mọi tầng; một lần/kiếp; nghỉ 720 giờ.
- Bối cảnh tác giả: .
- Vai: `{}`.
- Xuất xứ: `d5.3` / `content/events/nghe/thuong.json`.

Mất mùa khắp vùng. Kho thóc của ngươi đủ cho cả trấn ăn một tháng.

### Lựa chọn

- **1. Đóng kho, đợi giá**
  Giá thóc lên từng ngày. Ngươi bán ra từng đấu, tiền đầy rương.
  - `e`: `{"bac":1500,"nxp":["thuong",10],"deed":"ep_ta_dien"}`
- **2. Bán giá thường**
  Lãi không nhiều, nhưng người trấn nhớ tên ngươi.
  - `e`: `{"bac":300,"nxp":["thuong",12]}`

<a id="ng_thuong_vu_cao"></a>
## Đối thủ vu cáo — `ng_thuong_vu_cao`

- Loại: event; nguồn: Khám phá; chủ đề: Sinh kế; cảm xúc: nghe:thuong, nghe-tang:2.
- Nơi: thôn trấn, chợ phiên tu sĩ, thành trì.
- Điều kiện: mọi tầng; một lần/kiếp; nghỉ 720 giờ.
- Bối cảnh tác giả: .
- Vai: `{}`.
- Xuất xứ: `d5.3` / `content/events/nghe/thuong.json`.

Lái buôn nhà bên đưa đơn lên huyện, tố ngươi bán hàng cấm.

### Lựa chọn

- **1. Lo lót quan trên**
  Đơn bị bác. Tiền thì đi một khoản lớn.
  - `e`: `{"bac":-400,"nxp":["thuong",8]}`
- **2. Lên công đường đối chất**
  - `chk`: `["ngo",12]`
  - **Thành công**: Ngươi chỉ ra từng chỗ vô lý trong đơn. Kẻ vu cáo bị phạt.
    `{"e":{"nxp":["thuong",15]}}`
  - **Thất bại**: Quan không tin. Ngươi nộp phạt, cửa hàng đóng mấy hôm.
    `{"e":{"bac":-600}}`

<a id="ng_thuong_yeu_thu"></a>
## Thương đội gặp yêu thú — `ng_thuong_yeu_thu`

- Loại: event; nguồn: Khám phá; chủ đề: Sinh kế; cảm xúc: nghe:thuong, nghe-tang:2.
- Nơi: thành trì, thôn trấn.
- Điều kiện: mọi tầng; một lần/kiếp; nghỉ 720 giờ.
- Bối cảnh tác giả: .
- Vai: `{}`.
- Xuất xứ: `d5.3` / `content/events/nghe/thuong.json`.

Trên đường buôn xa, một con sói to như ngựa chặn trước đoàn xe. Phu xe run lẩy bẩy.

### Lựa chọn

- **1. Bỏ lại một xe hàng cho nó**
  Con sói xé tan xe hàng. Cả đoàn lặng lẽ đi vòng.
  - `e`: `{"bac":-500,"nxp":["thuong",6]}`
- **2. Trả tiền cho tiêu sư liều đánh**
  Tiêu sư bị thương nhưng đuổi được nó. Ngươi trả công gấp đôi.
  - `e`: `{"bac":-200,"nxp":["thuong",10]}`

<a id="ng_thuong_tien_trang"></a>
## Mở tiền trang — `ng_thuong_tien_trang`

- Loại: event; nguồn: Khám phá; chủ đề: Sinh kế; cảm xúc: nghe:thuong, nghe-tang:2.
- Nơi: thành trì.
- Điều kiện: mọi tầng; một lần/kiếp; nghỉ 720 giờ.
- Bối cảnh tác giả: .
- Vai: `{}`.
- Xuất xứ: `d5.3` / `content/events/nghe/thuong.json`.

Mấy lái buôn lớn rủ ngươi góp vốn mở một tiền trang trong thành.

### Lựa chọn

- **1. Góp vốn**
  - `chk`: `["ngo",12]`
  - **Thành công**: Tiền trang làm ăn khấm khá. Cuối năm ngươi nhận lãi.
    `{"e":{"bac":3000,"nxp":["thuong",20]}}`
  - **Thất bại**: Một chủ hàng lớn vỡ nợ, kéo theo cả tiền trang.
    `{"e":{"bac":-1500,"nxp":["thuong",6]}}`
- **2. Thôi, giữ vốn**
  Ngươi cười, rót rượu mời họ rồi từ chối.
