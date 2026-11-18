# content/events/nghe/vo_gia.json

Nguồn chuẩn: `content/events/nghe/vo_gia.json`. Bản đọc tự sinh. Cú pháp: xem [guideline](../../GUIDELINE.md).

<a id="ng_vo_gia_loi_dai"></a>
## Lôi đài sinh tử — `ng_vo_gia_loi_dai`

- Loại: event; nguồn: Khám phá; chủ đề: Sinh kế; cảm xúc: nghe:vo_gia, nghe-tang:0.
- Nơi: thành trì, thôn trấn.
- Điều kiện: mọi tầng; một lần/kiếp; nghỉ 720 giờ.
- Bối cảnh tác giả: .
- Vai: `{}`.
- Xuất xứ: `d5.3` / `content/events/nghe/vo_gia.json`.

Giữa chợ dựng một lôi đài. Người trên đài là gã to con, đã đánh gãy tay ba người. Hắn chỉ thẳng vào ngươi.

### Lựa chọn

- **1. Lên đài**
  - `chk`: `["tp",10]`
  - **Thành công**: Ngươi né đòn, đánh trúng gáy hắn. Dưới đài vỗ tay rầm rầm.
    `{"e":{"bac":150,"nxp":["vo_gia",10]}}`
  - **Thất bại**: Hắn đánh ngươi văng khỏi đài. Ngươi bò dậy, máu mũi chảy ròng.
    `{"e":{"hp":"-40%","nxp":["vo_gia",3]}}`
- **2. Lắc đầu bỏ đi**
  Sau lưng có tiếng cười chê. Ngươi không quay lại.

<a id="ng_vo_gia_ket_nghia"></a>
## Kết nghĩa huynh đệ — `ng_vo_gia_ket_nghia`

- Loại: event; nguồn: Khám phá; chủ đề: Sinh kế; cảm xúc: nghe:vo_gia, nghe-tang:0.
- Nơi: thành trì, thôn trấn, rừng sâu.
- Điều kiện: mọi tầng; một lần/kiếp; nghỉ 720 giờ.
- Bối cảnh tác giả: .
- Vai: `{}`.
- Xuất xứ: `d5.3` / `content/events/nghe/vo_gia.json`.

Người bạn cùng đi đường mấy tháng rót hai bát rượu, rạch tay nhỏ máu vào: "Từ nay sống chết có nhau."

### Lựa chọn

- **1. Uống cạn bát rượu**
  Hai người lạy trời đất. Đêm ấy say tới sáng.
  - `e`: `{"nxp":["vo_gia",6],"tamma":-5}`
- **2. Nói lời từ chối**
  Hắn cười gượng, đổ bát rượu xuống đất. Sáng ra mỗi người một ngả.

<a id="ng_vo_gia_son_tac"></a>
## Cứu thôn khỏi sơn tặc — `ng_vo_gia_son_tac`

- Loại: event; nguồn: Khám phá; chủ đề: Sinh kế; cảm xúc: nghe:vo_gia, nghe-tang:0.
- Nơi: thôn trấn.
- Điều kiện: mọi tầng; một lần/kiếp; nghỉ 720 giờ.
- Bối cảnh tác giả: .
- Vai: `{}`.
- Xuất xứ: `d5.3` / `content/events/nghe/vo_gia.json`.

Sơn tặc kéo xuống thôn, đốt hai mái nhà. Người làng trốn trong đình, nhìn ngươi như nhìn cọng rơm cuối cùng.

### Lựa chọn

- **1. Ra đánh**
  - `chk`: `["tp",10]`
  - **Thành công**: Ngươi hạ tên đầu đảng. Bọn còn lại tan tác vào núi. Làng giết lợn đãi ngươi.
    `{"e":{"bac":50,"nxp":["vo_gia",12],"deed":"hanh_hiep"}}`
  - **Thất bại**: Ngươi đánh lui được chúng nhưng lưng trúng một nhát dao.
    `{"e":{"hp":"-30%","nxp":["vo_gia",6],"deed":"hanh_hiep"}}`
- **2. Chạy lên huyện báo quan**
  Quan quân tới thì sơn tặc đã đi. Làng mất ba con trâu.
  - `e`: `{"h":12,"nxp":["vo_gia",2]}`

<a id="ng_vo_gia_mao_danh"></a>
## Bị mạo danh — `ng_vo_gia_mao_danh`

- Loại: event; nguồn: Khám phá; chủ đề: Sinh kế; cảm xúc: nghe:vo_gia, nghe-tang:0.
- Nơi: thành trì, thôn trấn, rừng sâu.
- Điều kiện: mọi tầng; một lần/kiếp; nghỉ 720 giờ.
- Bối cảnh tác giả: .
- Vai: `{}`.
- Xuất xứ: `d5.3` / `content/events/nghe/vo_gia.json`.

Người ta đồn ngươi đã cướp một nhà phú hộ ở trấn bên. Có kẻ đang mượn tên ngươi làm càn.

### Lựa chọn

- **1. Đi tìm kẻ mạo danh**
  - `chk`: `["ngo",9]`
  - **Thành công**: Ngươi tóm được hắn trong một sòng bạc, trói đem nộp quan.
    `{"e":{"h":24,"nxp":["vo_gia",10]}}`
  - **Thất bại**: Tìm hai ngày không ra dấu vết. Tiếng xấu vẫn bám theo.
    `{"e":{"h":24,"nxp":["vo_gia",3]}}`
- **2. Mặc kệ**
  Tiếng đồn rồi cũng tắt. Có điều vài quán trọ không còn cho ngươi ở.

<a id="ng_vo_gia_am_toan"></a>
## Bát rượu có độc — `ng_vo_gia_am_toan`

- Loại: event; nguồn: Khám phá; chủ đề: Sinh kế; cảm xúc: nghe:vo_gia, nghe-tang:1.
- Nơi: thành trì, thôn trấn, rừng sâu.
- Điều kiện: mọi tầng; một lần/kiếp; nghỉ 720 giờ.
- Bối cảnh tác giả: .
- Vai: `{}`.
- Xuất xứ: `d5.3` / `content/events/nghe/vo_gia.json`.

Trong quán, một người lạ mời ngươi bát rượu. Mùi rượu thơm, nhưng đáy bát hơi đục.

### Lựa chọn

- **1. Vận khí uống thử một ngụm**
  - `chk`: `["tam",11]`
  - **Thành công**: Ngươi ép được độc ra theo mồ hôi. Kẻ lạ tái mặt, bỏ chạy.
    `{"e":{"nxp":["vo_gia",8]}}`
  - **Thất bại**: Bụng quặn đau như dao cắt. Ngươi nằm liệt hai ngày.
    `{"e":{"hp":"-30%"}}`
- **2. Hắt rượu đi, rút đao**
  Kẻ lạ nhảy qua cửa sổ biến mất. Ngươi từ đó không uống rượu của người lạ.
  - `e`: `{"nxp":["vo_gia",4]}`

<a id="ng_vo_gia_bi_tich"></a>
## Tranh bí tịch — `ng_vo_gia_bi_tich`

- Loại: event; nguồn: Khám phá; chủ đề: Sinh kế; cảm xúc: nghe:vo_gia, nghe-tang:1.
- Nơi: thành trì, thôn trấn, rừng sâu.
- Điều kiện: mọi tầng; một lần/kiếp; nghỉ 720 giờ.
- Bối cảnh tác giả: .
- Vai: `{}`.
- Xuất xứ: `d5.3` / `content/events/nghe/vo_gia.json`.

Ở ngôi miếu hoang, mấy võ giả đang giằng nhau một cuốn sách cũ. Một kẻ đã nằm bất động dưới đất.

### Lựa chọn

- **1. Nhảy vào giành**
  - `chk`: `["tp",11]`
  - **Thành công**: Ngươi giật được cuốn sách, chạy thoát ra cửa sau.
    `{"e":{"item":"bt_that_tinh_kiem","nxp":["vo_gia",10]}}`
  - **Thất bại**: Ba kẻ quay sang đánh ngươi. Ngươi chạy thoát, người đầy vết thương.
    `{"e":{"hp":"-30%"}}`
- **2. Đứng ngoài nhìn**
  Cuối cùng một gã mặt sẹo ôm sách bỏ đi. Hắn nhìn ngươi một cái.

<a id="ng_vo_gia_tu_si"></a>
## Đối mặt một tu sĩ — `ng_vo_gia_tu_si`

- Loại: event; nguồn: Khám phá; chủ đề: Sinh kế; cảm xúc: nghe:vo_gia, nghe-tang:1.
- Nơi: thành trì, thôn trấn, rừng sâu.
- Điều kiện: mọi tầng; một lần/kiếp; nghỉ 720 giờ.
- Bối cảnh tác giả: .
- Vai: `{}`.
- Xuất xứ: `d5.3` / `content/events/nghe/vo_gia.json`.

Một tu sĩ trẻ đang đánh đập chủ quán vì đồ ăn nguội. Mọi người đều cúi mặt.

### Lựa chọn

- **1. Đứng ra can**
  - `chk`: `["tam",12]`
  - **Thành công**: Hắn tát ngươi một cái, ngươi không lùi. Hắn nhìn ngươi lâu rồi bỏ đi. Từ đó giang hồ biết tên ngươi.
    `{"e":{"nxp":["vo_gia",20],"deed":"hanh_hiep"}}`
  - **Thất bại**: Một cái phẩy tay của hắn đã làm ngươi văng vào tường.
    `{"e":{"hp":"-50%","deed":"hanh_hiep"}}`
- **2. Lùi lại**
  Phàm nhân với tu sĩ, khác nhau như kiến với voi. Ngươi đứng nép vào góc.
  - `e`: `{"nxp":["vo_gia",2]}`

<a id="ng_vo_gia_duyen"></a>
## Duyên giang hồ — `ng_vo_gia_duyen`

- Loại: event; nguồn: Khám phá; chủ đề: Sinh kế; cảm xúc: nghe:vo_gia, nghe-tang:1.
- Nơi: thành trì, thôn trấn, rừng sâu.
- Điều kiện: mọi tầng; một lần/kiếp; nghỉ 720 giờ.
- Bối cảnh tác giả: .
- Vai: `{}`.
- Xuất xứ: `d5.3` / `content/events/nghe/vo_gia.json`.

Một cô gái mang kiếm xin đi cùng đường qua đèo. Nàng ít nói, kiếm pháp nhanh như chớp.

### Lựa chọn

- **1. Đi cùng nàng**
  Hai ngày qua đèo, đêm ngồi bên lửa trại kể chuyện giang hồ. Lúc chia tay, nàng để lại một nụ cười.
  - `e`: `{"h":48,"nxp":["vo_gia",8],"tamma":-5}`
- **2. Mỗi người một đường**
  Nàng gật đầu, đi trước. Bóng áo lam khuất sau núi.

<a id="ng_vo_gia_dai_hoi"></a>
## Đại hội võ lâm — `ng_vo_gia_dai_hoi`

- Loại: event; nguồn: Khám phá; chủ đề: Sinh kế; cảm xúc: nghe:vo_gia, nghe-tang:2.
- Nơi: thành trì.
- Điều kiện: mọi tầng; một lần/kiếp; nghỉ 720 giờ.
- Bối cảnh tác giả: .
- Vai: `{}`.
- Xuất xứ: `d5.3` / `content/events/nghe/vo_gia.json`.

Các môn phái tụ về thành mở đại hội. Ai thắng ba trận được ghi tên lên bảng vàng.

### Lựa chọn

- **1. Lên đài**
  - `chk`: `["tp",12]`
  - **Thành công**: Ngươi thắng liền ba trận. Tên ngươi được gọi vang giữa thành, kèm một cuốn chưởng pháp làm thưởng.
    `{"e":{"bac":600,"nxp":["vo_gia",25],"item":"bt_bat_quai_chuong"}}`
  - **Thất bại**: Trận thứ hai, ngươi bị đánh gãy xương sườn.
    `{"e":{"hp":"-40%","nxp":["vo_gia",8]}}`
- **2. Đứng dưới xem**
  Ngươi học được mấy thế đánh. Đủ để mất ngủ mấy đêm.
  - `e`: `{"nxp":["vo_gia",6]}`

<a id="ng_vo_gia_an_su"></a>
## Ân sư bị giết — `ng_vo_gia_an_su`

- Loại: event; nguồn: Khám phá; chủ đề: Sinh kế; cảm xúc: nghe:vo_gia, nghe-tang:2.
- Nơi: thành trì, thôn trấn, rừng sâu.
- Điều kiện: mọi tầng; một lần/kiếp; nghỉ 720 giờ.
- Bối cảnh tác giả: .
- Vai: `{}`.
- Xuất xứ: `d5.3` / `content/events/nghe/vo_gia.json`.

Tin dữ tới: người thầy dạy võ đầu tiên của ngươi bị một tên đại đạo giết, nhà cửa bị đốt.

### Lựa chọn

- **1. Đi báo thù**
  - `chk`: `["tp",12]`
  - **Thành công**: Mười ngày truy đuổi. Ngươi chém hắn ở bến đò, đem đầu về tế thầy.
    `{"e":{"h":240,"nxp":["vo_gia",20]}}`
  - **Thất bại**: Ngươi đuổi kịp hắn nhưng không địch nổi, suýt chết.
    `{"e":{"h":240,"hp":"-50%"}}`
- **2. Chôn thầy, nuốt hận**
  Ngươi đắp mộ thầy, ngồi đó tới tối. Hận cứ nằm trong ngực.
  - `e`: `{"tamma":10}`

<a id="ng_vo_gia_tong_su"></a>
## Thách đấu tông sư — `ng_vo_gia_tong_su`

- Loại: event; nguồn: Khám phá; chủ đề: Sinh kế; cảm xúc: nghe:vo_gia, nghe-tang:2.
- Nơi: thành trì, thôn trấn, rừng sâu.
- Điều kiện: mọi tầng; một lần/kiếp; nghỉ 720 giờ.
- Bối cảnh tác giả: .
- Vai: `{}`.
- Xuất xứ: `d5.3` / `content/events/nghe/vo_gia.json`.

Một lão tông sư lui về ẩn cư dưới chân núi. Ai muốn học thì phải đỡ được của lão mười chiêu.

### Lựa chọn

- **1. Xin đỡ mười chiêu**
  - `chk`: `["tam",13]`
  - **Thành công**: Chiêu thứ mười, lão dừng tay. Lão ném cho ngươi một cuốn sách mỏng.
    `{"e":{"item":"bt_kim_chung_trao","nxp":["vo_gia",30]}}`
  - **Thất bại**: Chiêu thứ ba ngươi đã nằm dưới đất. Lão bảo ngươi về luyện thêm mười năm.
    `{"e":{"hp":"-60%"}}`
- **2. Chỉ đứng xa nhìn lão luyện công**
  Một buổi sáng nhìn lão đánh quyền, ngươi hiểu ra vài điều.
  - `e`: `{"nxp":["vo_gia",8]}`

<a id="ng_vo_gia_gac_kiem"></a>
## Rửa tay gác kiếm — `ng_vo_gia_gac_kiem`

- Loại: event; nguồn: Khám phá; chủ đề: Sinh kế; cảm xúc: nghe:vo_gia, nghe-tang:2.
- Nơi: thành trì, thôn trấn, rừng sâu.
- Điều kiện: mọi tầng; một lần/kiếp; nghỉ 720 giờ.
- Bối cảnh tác giả: .
- Vai: `{}`.
- Xuất xứ: `d5.3` / `content/events/nghe/vo_gia.json`.

Một người bạn giang hồ mời ngươi dự lễ rửa tay gác kiếm. Hắn mời ngươi cùng về quê làm ruộng.

### Lựa chọn

- **1. Ở lại giang hồ**
  Ngươi uống chén rượu tiễn hắn rồi lại lên đường.
  - `e`: `{"nxp":["vo_gia",10]}`
- **2. Về ở với hắn mấy tháng**
  Mấy tháng làm ruộng, câu cá. Tay cầm đao bắt đầu quen cầm cuốc.
  - `e`: `{"h":720,"tamma":-20}`
