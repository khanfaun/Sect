# content/events/nghe/ngu.json

Nguồn chuẩn: `content/events/nghe/ngu.json`. Bản đọc tự sinh. Cú pháp: xem [guideline](../../GUIDELINE.md).

<a id="ng_ngu_bao"></a>
## Giông giữa nước — `ng_ngu_bao`

- Loại: event; nguồn: Khám phá; chủ đề: Sinh kế; cảm xúc: nghe:ngu, nghe-tang:0.
- Nơi: sông hồ, biển khơi.
- Điều kiện: mọi tầng; một lần/kiếp; nghỉ 720 giờ.
- Bối cảnh tác giả: .
- Vai: `{}`.
- Xuất xứ: `d5.3` / `content/events/nghe/ngu.json`.

Trời tối sầm lúc thuyền đang ở giữa dòng. Gió quật, sóng dựng, lưới còn chưa thu.

### Lựa chọn

- **1. Cắt lưới, chèo vào bờ**
  - `chk`: `["tp",9]`
  - **Thành công**: Ngươi chèo tới tróc da tay. Thuyền chạm bờ vừa lúc mưa trút xuống.
    `{"e":{"nxp":["ngu",6]}}`
  - **Thất bại**: Một con sóng hất ngươi xuống nước. Bò được lên bờ thì người đã tím tái.
    `{"e":{"hp":"-20%"}}`
- **2. Cố kéo lưới lên**
  - `chk`: `["tam",10]`
  - **Thành công**: Lưới nặng trĩu cá. Ngươi vào bờ muộn nhưng mẻ cá đáng giá.
    `{"e":{"bac":80,"nxp":["ngu",8]}}`
  - **Thất bại**: Lưới mắc đá, thuyền chao nghiêng. Ngươi mất cả lưới lẫn cá.
    `{"e":{"hp":"-25%"}}`

<a id="ng_ngu_xac"></a>
## Lưới vớt xác người — `ng_ngu_xac`

- Loại: event; nguồn: Khám phá; chủ đề: Sinh kế; cảm xúc: nghe:ngu, nghe-tang:0.
- Nơi: sông hồ, biển khơi.
- Điều kiện: mọi tầng; một lần/kiếp; nghỉ 720 giờ.
- Bối cảnh tác giả: .
- Vai: `{}`.
- Xuất xứ: `d5.3` / `content/events/nghe/ngu.json`.

Mẻ lưới nặng khác thường. Kéo lên, trong lưới là một người đàn ông đã chết, bên hông còn đeo túi tiền.

### Lựa chọn

- **1. Đưa vào bờ chôn cất**
  Ngươi đào huyệt dưới gốc gạo, cắm một nén nhang.
  - `e`: `{"h":4,"nxp":["ngu",3],"deed":"an_tang"}`
- **2. Lấy túi tiền rồi thả xuống nước**
  Túi có ít bạc vụn. Đêm ấy ngươi ngủ không yên.
  - `e`: `{"bac":60,"tamma":3,"deed":"dao_mo"}`
- **3. Báo cho lý trưởng**
  Lý trưởng ghi tên ngươi vào sổ, khen là dân lành.
  - `e`: `{"h":6,"nxp":["ngu",2]}`

<a id="ng_ngu_ca_chep"></a>
## Cá chép vàng — `ng_ngu_ca_chep`

- Loại: event; nguồn: Khám phá; chủ đề: Sinh kế; cảm xúc: nghe:ngu, nghe-tang:0.
- Nơi: sông hồ, biển khơi.
- Điều kiện: mọi tầng; một lần/kiếp; nghỉ 720 giờ.
- Bối cảnh tác giả: .
- Vai: `{}`.
- Xuất xứ: `d5.3` / `content/events/nghe/ngu.json`.

Trong giỏ có một con cá chép vảy vàng như dát, mắt nó nhìn ngươi như biết khóc.

### Lựa chọn

- **1. Thả nó về**
  Con cá quẫy đuôi ba lần trên mặt nước rồi lặn mất. Lòng ngươi nhẹ đi.
  - `e`: `{"tamma":-5,"deed":"phong_sinh"}`
- **2. Đem lên chợ bán**
  Một phú hộ trả giá cao để mua về thả ao. Ngươi cầm tiền mà thấy lành lạnh.
  - `e`: `{"bac":250}`

<a id="ng_ngu_ep_gia"></a>
## Chợ cá ép giá — `ng_ngu_ep_gia`

- Loại: event; nguồn: Khám phá; chủ đề: Sinh kế; cảm xúc: nghe:ngu, nghe-tang:0.
- Nơi: chợ phiên tu sĩ, sông hồ, biển khơi.
- Điều kiện: mọi tầng; một lần/kiếp; nghỉ 720 giờ.
- Bối cảnh tác giả: .
- Vai: `{}`.
- Xuất xứ: `d5.3` / `content/events/nghe/ngu.json`.

Bến cá đông người. Lái cá trả giá thấp như cho, ai không bán thì cá ươn.

### Lựa chọn

- **1. Bán rẻ cho xong**
  Ngươi cầm mấy đồng bạc lẻ đi về.
  - `e`: `{"bac":15}`
- **2. Mặc cả**
  - `chk`: `["ngo",9]`
  - **Thành công**: Ngươi chỉ ra mấy con cá còn quẫy. Lái cá chép miệng trả thêm.
    `{"e":{"bac":40,"nxp":["ngu",3]}}`
  - **Thất bại**: Lái cá quay đi. Tới trưa ngươi đành bán còn rẻ hơn.
    `{"e":{"bac":10}}`
- **3. Mang về phơi khô**
  Cá phơi ba nắng, bán dần cũng được giá.
  - `e`: `{"h":6,"bac":30,"nxp":["ngu",2]}`

<a id="ng_ngu_thuy_quy"></a>
## Thủy quỷ kéo chân — `ng_ngu_thuy_quy`

- Loại: event; nguồn: Khám phá; chủ đề: Sinh kế; cảm xúc: nghe:ngu, nghe-tang:1.
- Nơi: sông hồ, biển khơi.
- Điều kiện: mọi tầng; một lần/kiếp; nghỉ 720 giờ.
- Bối cảnh tác giả: .
- Vai: `{}`.
- Xuất xứ: `d5.3` / `content/events/nghe/ngu.json`.

Đang lội gỡ lưới, có bàn tay lạnh ngắt nắm lấy cổ chân ngươi, kéo xuống.

### Lựa chọn

- **1. Giữ bình tĩnh, gỡ tay nó ra**
  - `chk`: `["tam",10]`
  - **Thành công**: Ngươi nín thở, bẻ từng ngón tay lạnh như đá. Nó buông ra. Ngươi ngoi lên, thở dốc.
    `{"e":{"nxp":["ngu",10]}}`
  - **Thất bại**: Ngươi uống mấy ngụm nước mới vùng được lên. Đêm ấy sốt mê man.
    `{"e":{"hp":"-25%","tamma":5}}`
- **2. Đạp mạnh, bơi về thuyền**
  - `chk`: `["tp",10]`
  - **Thành công**: Ngươi đạp trúng thứ gì mềm nhũn rồi trườn lên thuyền.
    `{"e":{"nxp":["ngu",6]}}`
  - **Thất bại**: Bàn tay siết chặt hơn. Lúc thoát ra, cổ chân hằn năm vết tím.
    `{"e":{"hp":"-20%"}}`

<a id="ng_ngu_hai_tac"></a>
## Bọn chặn đường sông — `ng_ngu_hai_tac`

- Loại: event; nguồn: Khám phá; chủ đề: Sinh kế; cảm xúc: nghe:ngu, nghe-tang:1.
- Nơi: sông hồ, biển khơi.
- Điều kiện: mọi tầng; một lần/kiếp; nghỉ 720 giờ.
- Bối cảnh tác giả: .
- Vai: `{}`.
- Xuất xứ: `d5.3` / `content/events/nghe/ngu.json`.

Ba chiếc xuồng nhỏ chặn ngang luồng. Người đứng đầu cầm mã tấu, đòi tiền mãi lộ.

### Lựa chọn

- **1. Nộp tiền**
  Chúng lấy tiền rồi tránh đường, còn cười chúc ngươi may mắn.
  - `e`: `{"bac":-100}`
- **2. Lái thuyền lách qua**
  - `chk`: `["tp",11]`
  - **Thành công**: Ngươi cho thuyền lướt qua khe giữa hai xuồng. Tiếng chửi đuổi theo sau lưng.
    `{"e":{"nxp":["ngu",12]}}`
  - **Thất bại**: Xuồng chúng áp mạn. Ngươi bị đánh, mất sạch tiền mang theo.
    `{"e":{"hp":"-30%","bac":-200}}`

<a id="ng_ngu_ca_chay"></a>
## Mùa cá chạy — `ng_ngu_ca_chay`

- Loại: event; nguồn: Khám phá; chủ đề: Sinh kế; cảm xúc: nghe:ngu, nghe-tang:1.
- Nơi: sông hồ, biển khơi.
- Điều kiện: mọi tầng; một lần/kiếp; nghỉ 720 giờ.
- Bối cảnh tác giả: .
- Vai: `{}`.
- Xuất xứ: `d5.3` / `content/events/nghe/ngu.json`.

Nước đổi màu. Đàn cá kéo về đông như bão, mặt nước lấp lánh suốt đêm.

### Lựa chọn

- **1. Thả lưới cả đêm**
  Tới sáng thuyền ngươi đầy cá tới mạn. Hai tay rã rời.
  - `e`: `{"h":12,"bac":150,"nxp":["ngu",10]}`
- **2. Gọi người trong xóm cùng đánh**
  Cả xóm chài cùng thả lưới. Chia nhau ai cũng có phần.
  - `e`: `{"bac":80,"nxp":["ngu",6]}`

<a id="ng_ngu_hop_go"></a>
## Hộp gỗ cổ — `ng_ngu_hop_go`

- Loại: event; nguồn: Khám phá; chủ đề: Sinh kế; cảm xúc: nghe:ngu, nghe-tang:1.
- Nơi: sông hồ, biển khơi.
- Điều kiện: mọi tầng; một lần/kiếp; nghỉ 720 giờ.
- Bối cảnh tác giả: .
- Vai: `{}`.
- Xuất xứ: `d5.3` / `content/events/nghe/ngu.json`.

Lưới vướng một chiếc hộp gỗ đen, khoá đồng đã gỉ, bọc trong rong rêu.

### Lựa chọn

- **1. Cạy ra xem**
  - `chk`: `["ngo",10]`
  - **Thành công**: Trong hộp là một cuốn sách da cá còn khô. Chữ viết về cách thở dưới nước.
    `{"e":{"item":"bt_quy_tuc","nxp":["ngu",5]}}`
  - **Thất bại**: Nắp vừa bật, một luồng khí tanh xộc lên. Ngươi ho tới chảy nước mắt.
    `{"e":{"hp":"-10%"}}`
- **2. Ném lại xuống nước**
  Thứ của sông thì trả cho sông. Ngươi chèo đi, không ngoái lại.
  - `e`: `{}`

<a id="ng_ngu_giao_long"></a>
## Giao long mắc cạn — `ng_ngu_giao_long`

- Loại: event; nguồn: Khám phá; chủ đề: Sinh kế; cảm xúc: nghe:ngu, nghe-tang:2.
- Nơi: biển khơi.
- Điều kiện: mọi tầng; một lần/kiếp; nghỉ 720 giờ.
- Bối cảnh tác giả: .
- Vai: `{}`.
- Xuất xứ: `d5.3` / `content/events/nghe/ngu.json`.

Nước rút, trên bãi cát nằm một con rắn biển khổng lồ có sừng. Nó thở phì phò, vảy khô nứt.

### Lựa chọn

- **1. Gọi người cùng đẩy nó ra biển**
  Hơn chục người kéo tới chiều mới đưa được nó xuống nước. Nó quay đầu nhìn ngươi rất lâu.
  - `e`: `{"h":12,"nxp":["ngu",15],"deed":"phong_sinh"}`
- **2. Đợi nó chết, bán xương vảy**
  Lái buôn từ thành về tận nơi mua. Ngươi giàu lên trong một đêm. Biển sau đó động suốt một tháng.
  - `e`: `{"bac":900}`

<a id="ng_ngu_tieng_hat"></a>
## Tiếng hát dưới nước — `ng_ngu_tieng_hat`

- Loại: event; nguồn: Khám phá; chủ đề: Sinh kế; cảm xúc: nghe:ngu, nghe-tang:2.
- Nơi: sông hồ, biển khơi.
- Điều kiện: mọi tầng; một lần/kiếp; nghỉ 720 giờ.
- Bối cảnh tác giả: .
- Vai: `{}`.
- Xuất xứ: `d5.3` / `content/events/nghe/ngu.json`.

Đêm trăng, mặt nước phẳng lặng. Từ dưới đáy vọng lên tiếng hát, ngọt như mật.

### Lựa chọn

- **1. Chèo lại gần**
  - `chk`: `["tam",12]`
  - **Thành công**: Ngươi nghe trọn khúc hát mà vẫn tỉnh. Sáng ra trên mạn thuyền có một viên ngọc trai nhỏ.
    `{"e":{"pill":"tinhnguyen","nxp":["ngu",12]}}`
  - **Thất bại**: Ngươi tỉnh lại khi nước đã tới cổ. Bò lên được thuyền, đầu đau như búa bổ.
    `{"e":{"hp":"-20%","tamma":5}}`
- **2. Nhét bông vào tai, chèo đi**
  Tiếng hát nhỏ dần sau lưng. Ngươi chèo một mạch về bến.

<a id="ng_ngu_thuyen_dam"></a>
## Thuyền đắm — `ng_ngu_thuyen_dam`

- Loại: event; nguồn: Khám phá; chủ đề: Sinh kế; cảm xúc: nghe:ngu, nghe-tang:2.
- Nơi: sông hồ, biển khơi.
- Điều kiện: mọi tầng; một lần/kiếp; nghỉ 720 giờ.
- Bối cảnh tác giả: .
- Vai: `{}`.
- Xuất xứ: `d5.3` / `content/events/nghe/ngu.json`.

Một chiếc thuyền buôn lật úp giữa dòng. Hàng hoá trôi lềnh bềnh, có người đang chới với.

### Lựa chọn

- **1. Lao xuống cứu người**
  - `chk`: `["tp",11]`
  - **Thành công**: Ngươi kéo được hai người lên thuyền. Chủ hàng sau đó tìm tới tận nhà cảm tạ.
    `{"e":{"bac":150,"nxp":["ngu",10],"deed":"cuu_nguoi"}}`
  - **Thất bại**: Ngươi cứu được một người nhưng bị sặc nước, phải nằm mấy hôm.
    `{"e":{"hp":"-25%","deed":"cuu_nguoi_hy_sinh"}}`
- **2. Vớt hàng trôi**
  Ngươi vớt được mấy kiện vải lụa. Tiếng kêu cứu tắt dần.
  - `e`: `{"bac":400,"tamma":5}`

<a id="ng_ngu_nguoi_cho"></a>
## Người nhà chờ ở bến — `ng_ngu_nguoi_cho`

- Loại: event; nguồn: Khám phá; chủ đề: Sinh kế; cảm xúc: nghe:ngu, nghe-tang:2.
- Nơi: sông hồ, biển khơi.
- Điều kiện: mọi tầng; một lần/kiếp; nghỉ 720 giờ.
- Bối cảnh tác giả: .
- Vai: `{}`.
- Xuất xứ: `d5.3` / `content/events/nghe/ngu.json`.

Chiều nào cũng có người đứng ở đầu bến nhìn ra nước, chờ thuyền ngươi về.

### Lựa chọn

- **1. Ở nhà ít hôm**
  Mấy ngày không ra nước, ngươi ngủ được những giấc dài.
  - `e`: `{"h":48,"tamma":-10}`
- **2. Lại ra nước, kiếm thêm mùa này**
  Người ở bến vẫy tay. Thuyền ngươi xa dần.
  - `e`: `{"bac":200,"nxp":["ngu",8],"tamma":3}`
