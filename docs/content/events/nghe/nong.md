# content/events/nghe/nong.json

Nguồn chuẩn: `content/events/nghe/nong.json`. Bản đọc tự sinh. Cú pháp: xem [guideline](../../GUIDELINE.md).

<a id="ng_nong_han"></a>
## Mùa hạn — `ng_nong_han`

- Loại: event; nguồn: Khám phá; chủ đề: Sinh kế; cảm xúc: nghe:nong, nghe-tang:0.
- Nơi: thôn trấn.
- Điều kiện: mọi tầng; ha; một lần/kiếp; nghỉ 720 giờ.
- Bối cảnh tác giả: .
- Vai: `{}`.
- Xuất xứ: `d5.3` / `content/events/nghe/nong.json`.

Nắng như đổ lửa suốt tháng. Ruộng nứt nẻ từng đường to bằng ngón tay, mạ non rũ xuống.

### Lựa chọn

- **1. Gánh nước từ suối lên, suốt đêm**
  - `chk`: `["tam",8]`
  - **Thành công**: Ngươi gánh tới lúc vai rớm máu. Sáng ra, mấy luống mạ đầu bờ đã ngẩng lên.
    `{"e":{"nxp":["nong",10],"h":8}}`
  - **Thất bại**: Gánh được nửa đêm thì ngươi ngã quỵ bên bờ ruộng. Mạ vẫn héo.
    `{"e":{"hp":"-10%","nxp":["nong",4]}}`
- **2. Bỏ ruộng, đi làm thuê chỗ khác ít hôm**
  Ngươi khoá cửa, theo người ta xuống trấn bốc vác. Ruộng thì phó mặc cho trời.
  - `e`: `{"bac":30}`

<a id="ng_nong_tranh_nuoc"></a>
## Tranh nước với làng bên — `ng_nong_tranh_nuoc`

- Loại: event; nguồn: Khám phá; chủ đề: Sinh kế; cảm xúc: nghe:nong, nghe-tang:0.
- Nơi: thôn trấn.
- Điều kiện: mọi tầng; một lần/kiếp; nghỉ 720 giờ.
- Bối cảnh tác giả: .
- Vai: `{}`.
- Xuất xứ: `d5.3` / `content/events/nghe/nong.json`.

Con mương chung cạn tới đáy. Người làng bên đã đắp bờ chặn dòng từ đêm qua, mấy gã trai cầm gậy đứng canh.

### Lựa chọn

- **1. Ra bờ mương nói phải trái**
  - `chk`: `["tam",9]`
  - **Thành công**: Ngươi đứng nói tới trưa. Cuối cùng họ chịu chia nước mỗi bên một nửa ngày.
    `{"e":{"nxp":["nong",6]}}`
  - **Thất bại**: Lời qua tiếng lại thành xô đẩy. Ngươi về nhà với một bên mắt sưng.
    `{"e":{"hp":"-10%"}}`
- **2. Nhường họ, đợi mưa**
  Ngươi lặng lẽ về. Ba hôm sau trời đổ mưa rào, ruộng hai làng cùng xanh.
  - `e`: `{"nxp":["nong",3]}`
- **3. Đêm xuống, phá bờ của họ**
  Nước chảy về ruộng ngươi suốt đêm. Sáng ra làng bên chửi đổng, không ai biết là ai.
  - `e`: `{"nxp":["nong",8]}`

<a id="ng_nong_trau_om"></a>
## Trâu ốm — `ng_nong_trau_om`

- Loại: event; nguồn: Khám phá; chủ đề: Sinh kế; cảm xúc: nghe:nong, nghe-tang:0.
- Nơi: thôn trấn.
- Điều kiện: mọi tầng; một lần/kiếp; nghỉ 720 giờ.
- Bối cảnh tác giả: .
- Vai: `{}`.
- Xuất xứ: `d5.3` / `content/events/nghe/nong.json`.

Con trâu mượn của nhà bên nằm bẹp trong chuồng, mũi khô, không chịu ăn cỏ.

### Lựa chọn

- **1. Thức đêm sắc lá cho nó uống**
  Ngươi ngồi bên chuồng ba đêm liền. Sáng thứ tư con trâu đứng dậy, rống một tiếng dài.
  - `e`: `{"h":24,"nxp":["nong",6]}`
- **2. Mời thầy lang thú**
  Thầy lang bốc cho mấy thang thuốc, lấy tiền không rẻ. Trâu khỏi.
  - `e`: `{"bac":-60,"nxp":["nong",4]}`

<a id="ng_nong_tang_to"></a>
## Địa chủ tăng tô — `ng_nong_tang_to`

- Loại: event; nguồn: Khám phá; chủ đề: Sinh kế; cảm xúc: nghe:nong, nghe-tang:0.
- Nơi: thôn trấn.
- Điều kiện: mọi tầng; một lần/kiếp; nghỉ 720 giờ.
- Bối cảnh tác giả: .
- Vai: `{}`.
- Xuất xứ: `d5.3` / `content/events/nghe/nong.json`.

Quản gia nhà địa chủ đi từng nhà, gõ thước vào cửa: năm nay tô lên thêm một phần, ai không nộp thì trả ruộng.

### Lựa chọn

- **1. Cắn răng nộp**
  Ngươi đếm từng đồng đưa ra. Quản gia ghi sổ, không ngẩng mặt.
  - `e`: `{"bac":-80,"nxp":["nong",6]}`
- **2. Xin khất tới mùa sau**
  - `chk`: `["tam",10]`
  - **Thành công**: Quản gia nhìn ngươi hồi lâu rồi gật. "Mùa sau nộp đủ, thiếu một hạt là trả ruộng."
    `{"e":{"nxp":["nong",6]}}`
  - **Thất bại**: Hắn cười khẩy, sai người dắt luôn con gà mái trong sân để trừ nợ.
    `{"e":{"bac":-120}}`

<a id="ng_nong_duoc_mua"></a>
## Được mùa — `ng_nong_duoc_mua`

- Loại: event; nguồn: Khám phá; chủ đề: Sinh kế; cảm xúc: nghe:nong, nghe-tang:1.
- Nơi: thôn trấn.
- Điều kiện: mọi tầng; thu; một lần/kiếp; nghỉ 720 giờ.
- Bối cảnh tác giả: .
- Vai: `{}`.
- Xuất xứ: `d5.3` / `content/events/nghe/nong.json`.

Năm nay mưa thuận gió hoà. Lúa trĩu bông, gặt tới đâu kho đầy tới đó. Lái buôn đã đứng chờ ở đầu làng.

### Lựa chọn

- **1. Bán ngay cho lái buôn**
  Giá không cao nhưng tiền về tay ngay. Ngươi đếm xong, thở ra nhẹ nhõm.
  - `e`: `{"bac":200,"nxp":["nong",8]}`
- **2. Giữ thóc, đợi giá lên**
  - `chk`: `["ngo",10]`
  - **Thành công**: Qua tết giá thóc lên gấp đôi. Ngươi bán vừa đúng lúc.
    `{"e":{"bac":400,"nxp":["nong",10]}}`
  - **Thất bại**: Thóc ẩm, mọt vào nửa kho. Bán được chẳng bao nhiêu.
    `{"e":{"bac":60,"nxp":["nong",4]}}`

<a id="ng_nong_binh_luong"></a>
## Quan thu binh lương — `ng_nong_binh_luong`

- Loại: event; nguồn: Khám phá; chủ đề: Sinh kế; cảm xúc: nghe:nong, nghe-tang:1.
- Nơi: thôn trấn.
- Điều kiện: mọi tầng; một lần/kiếp; nghỉ 720 giờ.
- Bối cảnh tác giả: .
- Vai: `{}`.
- Xuất xứ: `d5.3` / `content/events/nghe/nong.json`.

Lính huyện về làng, trống đánh dồn. Mỗi nhà phải nộp thêm một phần thóc làm lương cho quân ngoài biên.

### Lựa chọn

- **1. Nộp đủ**
  Ngươi khiêng thóc ra đình. Lính ghi tên, đóng dấu đỏ vào sổ.
  - `e`: `{"bac":-150,"nxp":["nong",4]}`
- **2. Giấu bớt thóc dưới hầm**
  - `chk`: `["tp",10]`
  - **Thành công**: Lính chọc giáo khắp sân mà không thấy nắp hầm. Ngươi giữ được nửa kho.
    `{"e":{"nxp":["nong",5]}}`
  - **Thất bại**: Một tên lính đạp trúng nắp hầm. Ngươi bị đánh mấy roi, thóc bị tịch thu sạch.
    `{"e":{"bac":-300,"hp":"-10%"}}`

<a id="ng_nong_trom_lua"></a>
## Trộm lúa đêm — `ng_nong_trom_lua`

- Loại: event; nguồn: Khám phá; chủ đề: Sinh kế; cảm xúc: nghe:nong, nghe-tang:1.
- Nơi: thôn trấn.
- Điều kiện: mọi tầng; một lần/kiếp; nghỉ 720 giờ.
- Bối cảnh tác giả: .
- Vai: `{}`.
- Xuất xứ: `d5.3` / `content/events/nghe/nong.json`.

Nửa đêm có tiếng sột soạt ngoài ruộng. Một bóng người đang tuốt lúa bỏ vào bao.

### Lựa chọn

- **1. Đuổi theo**
  - `chk`: `["tp",9]`
  - **Thành công**: Ngươi tóm được hắn ở bờ tre, lấy lại bao lúa. Hắn quỳ xuống xin tha.
    `{"e":{"nxp":["nong",6]}}`
  - **Thất bại**: Hắn chạy nhanh như sóc. Ngươi vấp bờ ruộng, trẹo chân.
    `{"e":{"hp":"-15%"}}`
- **2. Lại gần thì thấy là đứa trẻ, để nó đi**
  Đứa bé gầy giơ xương, ôm bao lúa run cầm cập. Ngươi bảo nó mang về, mai đừng tới nữa.
  - `e`: `{"bac":-20,"deed":"bo_thi"}`

<a id="ng_nong_de_vo"></a>
## Đê vỡ — `ng_nong_de_vo`

- Loại: event; nguồn: Khám phá; chủ đề: Sinh kế; cảm xúc: nghe:nong, nghe-tang:1.
- Nơi: thôn trấn.
- Điều kiện: mọi tầng; một lần/kiếp; nghỉ 720 giờ.
- Bối cảnh tác giả: .
- Vai: `{}`.
- Xuất xứ: `d5.3` / `content/events/nghe/nong.json`.

Mưa ba ngày ba đêm. Tiếng mõ dồn dập: đê đầu làng vỡ một đoạn, nước đỏ ngầu tràn vào ruộng.

### Lựa chọn

- **1. Cùng cả làng đắp đê**
  Ngươi vác đất suốt đêm, ngâm mình trong nước tới ngực. Sáng ra đoạn đê đã được chặn.
  - `e`: `{"h":24,"nxp":["nong",12],"hp":"-10%","deed":"cuu_nguoi"}`
- **2. Chạy về be bờ ruộng nhà mình**
  Ruộng ngươi giữ được. Mấy nhà cuối làng thì mất trắng.
  - `e`: `{"nxp":["nong",6]}`

<a id="ng_nong_linh_dien"></a>
## Tu sĩ thuê người trồng linh điền — `ng_nong_linh_dien`

- Loại: event; nguồn: Khám phá; chủ đề: Sinh kế; cảm xúc: nghe:nong, nghe-tang:2.
- Nơi: thôn trấn.
- Điều kiện: mọi tầng; một lần/kiếp; nghỉ 720 giờ.
- Bối cảnh tác giả: .
- Vai: `{}`.
- Xuất xứ: `d5.3` / `content/events/nghe/nong.json`.

Một tu sĩ áo xanh dừng ở đầu làng, cần người biết làm ruộng giỏi theo lên núi trồng linh điền hai ngày. Trả công hậu.

### Lựa chọn

- **1. Theo lên núi**
  Linh điền nhỏ như cái sân nhưng đất mềm như bông. Tu sĩ trả công rồi tiễn ngươi xuống núi, không nói thêm câu nào.
  - `e`: `{"h":48,"bac":600,"nxp":["nong",15]}`
- **2. Ruộng nhà còn việc, từ chối**
  Tu sĩ gật đầu, đi sang làng khác.

<a id="ng_nong_hat_la"></a>
## Hạt giống lạ — `ng_nong_hat_la`

- Loại: event; nguồn: Khám phá; chủ đề: Sinh kế; cảm xúc: nghe:nong, nghe-tang:2.
- Nơi: thôn trấn.
- Điều kiện: mọi tầng; một lần/kiếp; nghỉ 720 giờ.
- Bối cảnh tác giả: .
- Vai: `{}`.
- Xuất xứ: `d5.3` / `content/events/nghe/nong.json`.

Trong bao giống mua ở chợ lẫn mấy hạt màu vàng óng, cầm lên thấy ấm tay.

### Lựa chọn

- **1. Gieo riêng một góc ruộng**
  - `chk`: `["ngo",11]`
  - **Thành công**: Mấy cây lúa lạ trổ bông thơm ngát. Hạt nấu lên ăn, người nhẹ hẳn đi.
    `{"e":{"pill":"tinhnguyen","nxp":["nong",15]}}`
  - **Thất bại**: Mầm lên được ít hôm thì héo rũ. Ngươi tiếc mãi.
    `{"e":{"nxp":["nong",5]}}`
- **2. Đem lên trấn bán cho người biết hàng**
  Người mua ngắm hạt giống hồi lâu, trả một món tiền khiến ngươi giật mình.
  - `e`: `{"bac":300}`

<a id="ng_nong_heo_yeu"></a>
## Heo rừng thành yêu — `ng_nong_heo_yeu`

- Loại: event; nguồn: Khám phá; chủ đề: Sinh kế; cảm xúc: nghe:nong, nghe-tang:2.
- Nơi: thôn trấn.
- Điều kiện: mọi tầng; một lần/kiếp; nghỉ 720 giờ.
- Bối cảnh tác giả: .
- Vai: `{}`.
- Xuất xứ: `d5.3` / `content/events/nghe/nong.json`.

Đêm nào cũng có một con heo rừng to như con nghé xuống phá ruộng. Mắt nó đỏ, nanh dài, người làng không ai dám ra.

### Lựa chọn

- **1. Cầm đinh ba ra đuổi**
  - `chk`: `["tp",11]`
  - **Thành công**: Ngươi đâm trúng vai nó. Con heo rống lên rồi chạy vào núi, không quay lại nữa. Làng góp tiền tạ ơn.
    `{"e":{"bac":100,"nxp":["nong",15],"deed":"giet_thu_cuu_sinh"}}`
  - **Thất bại**: Nó húc ngươi văng xuống mương. Ngươi nằm liệt mấy ngày.
    `{"e":{"hp":"-30%"}}`
- **2. Góp tiền thuê thợ săn**
  Thợ săn đặt bẫy ba đêm thì bắt được. Ngươi góp phần lớn nhất.
  - `e`: `{"bac":-200,"nxp":["nong",6]}`

<a id="ng_nong_nam_doi"></a>
## Năm đói, dân bỏ làng — `ng_nong_nam_doi`

- Loại: event; nguồn: Khám phá; chủ đề: Sinh kế; cảm xúc: nghe:nong, nghe-tang:2.
- Nơi: thôn trấn.
- Điều kiện: mọi tầng; một lần/kiếp; nghỉ 720 giờ.
- Bối cảnh tác giả: .
- Vai: `{}`.
- Xuất xứ: `d5.3` / `content/events/nghe/nong.json`.

Hai năm mất mùa liền. Người làng gánh con bỏ đi tha phương. Kho thóc nhà ngươi là kho duy nhất còn đầy.

### Lựa chọn

- **1. Mở kho chia thóc cho người ở lại**
  Hàng người xếp trước cửa nhà ngươi. Có bà lão vừa nhận thóc vừa khóc.
  - `e`: `{"bac":-300,"nxp":["nong",10],"deed":"phat_chan"}`
- **2. Bán thóc với giá năm đói**
  Tiền đổ về như nước. Người mua không ai nhìn mặt ngươi.
  - `e`: `{"bac":800,"nxp":["nong",6],"deed":"ep_ta_dien"}`
