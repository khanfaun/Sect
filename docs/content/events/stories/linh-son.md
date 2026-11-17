# content/events/stories/linh-son.json

Nguồn chuẩn: `content/events/stories/linh-son.json`. Bản đọc tự sinh. Cú pháp: xem [guideline](../../GUIDELINE.md).

<a id="gk_tam_dem_duoi_kiem"></a>
## Tấm đệm dưới kiếm — `gk_tam_dem_duoi_kiem`

- Loại: story; nguồn: Khám phá; chủ đề: Kiếm tu; cảm xúc: Ấm áp.
- Nơi: sơn môn.
- Điều kiện: tầng 1; một lần/kiếp.
- Bối cảnh tác giả: Vách tập kiếm của [tông môn].
- Vai: `{"a":{"gender":"nam","role":"Kiếm tu","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

“Kiếm mới phát, đừng vội đem thử đá.” Kiếm tu {$a.ten} vừa nói vừa cột đệm lên vách tập. Một đệ tử thấp bé nhìn chỗ đệm quá cao, rồi nhìn thanh kiếm của mình.

### Lựa chọn

- **1. Góp da làm thêm một tấm**
  Ngươi mua thêm da cho hắn làm tấm đệm thấp. Đệ tử nhỏ tuổi thử một kiếm, trúng giữa tấm rồi quay lại chắp tay cảm tạ. Người dạy kiếm gật đầu: “Đúng tầm rồi.”
  - `cost`: `{"st":13}`
  - `e`: `{"karma":4}`
- **2. Xin thử đường kiếm trên đá trần**
  Kiếm mẻ, ngươi hiểu chỗ nào mình thường hạ cổ tay. {$a.ten} nhặt mảnh thép và gói bằng góc đệm.
  - `e`: `{"tv":4,"karma":-1}`
- **3. Bỏ đi**
  Kiếm tu gọi người mới xếp hàng, nhắc từng người đứng cho vững. Tiếng tập kiếm rộn lên sau lưng ngươi.

<a id="gk_ghe_da_co_nguoi_dat_truoc"></a>
## Ghế đá có người đặt trước — `gk_ghe_da_co_nguoi_dat_truoc`

- Loại: story; nguồn: Khám phá; chủ đề: Gia thế; cảm xúc: Cẩu huyết.
- Nơi: sơn môn.
- Điều kiện: tầng 1; một lần/kiếp.
- Bối cảnh tác giả: Sân lễ của [tông môn].
- Vai: `{"a":{"gender":"nam","role":"Thiếu gia","alignment":"context"},"b":{"gender":"nam","role":"Quản sự","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Thiếu gia {$a.ten} đuổi khách khỏi ghế đá vì trên chân ghế khắc họ nhà hắn. Quản sự {$b.ten} lật chiếc ghế lại, chỗ vết khắc đen ấy còn dính một mẩu lá dùng chà cho cũ.

### Lựa chọn

- **1. Xin lấy nước rửa mặt ghế**
  Ngươi xin chậu nước, rửa lớp mực làm cũ trên chân ghế. Nét khắc còn mới nguyên. {$b.ten} hỏi ai cho phép tự chiếm chỗ của tông môn, thiếu gia đành đứng dậy giữa tiếng xì xào.
  - `e`: `{"karma":4}`
- **2. Đứng về phía hắn để đổi một lời giới thiệu**
  Hắn dẫn ngươi vào hàng khách danh dự, dúi thêm linh thạch cảm tạ đã bênh mình. Những người bị đuổi phải đặt đồ lễ xuống đất. Quản sự nhìn thấy khoản tiền, ghi cả tên ngươi vào sổ xét việc.
  - `e`: `{"karma":-4,"st":10,"tamma":2}`
- **3. Bỏ đi**
  {$b.ten} kê ghế nghiêng. {$a.ten} ngồi xuống, vừa đúng bên thấp.

<a id="gk_dot_tre_o_cua_ngach"></a>
## Đốt tre ở cửa ngách — `gk_dot_tre_o_cua_ngach`

- Loại: story; nguồn: Khám phá; chủ đề: Việc trong tông; cảm xúc: Căng thẳng.
- Nơi: sơn môn.
- Điều kiện: tầng 1; một lần/kiếp.
- Bối cảnh tác giả: Hành lang kín gió.
- Vai: `{"a":{"gender":"nam","role":"đệ tử","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Đệ tử {$a.ten} đã tháo một đoạn ống thông khí của phòng bế quan để sắc thuốc, giờ nối lại không khít. Trong phòng có người ho, cửa lại đang phong kín bằng trận pháp. Hắn níu tay ngươi: “Xin đạo hữu cứu trước, chuyện phạt để sau.”

### Lựa chọn

- **1. Dùng linh lực giữ khí qua chỗ ống gãy**
  Ngươi dẫn khí qua chỗ nối cho tới khi quản sự mở được trận. Người trong phòng tỉnh lại, ngươi bị luồng khí ngược làm đau ngực. Đệ tử tự tới nhận lỗi, không nhờ ngươi giấu nữa.
  - `cost`: `{"mp":"20%"}`
  - `e`: `{"karma":4,"hp":"-5%"}`
- **2. Nộp ống hỏng làm chứng**
  Phòng được mở khẩn cấp, ngươi được thưởng, còn {$a.ten} bị cấm làm việc. Nồi thuốc của hắn sôi khô ngoài cửa.
  - `e`: `{"st":18,"karma":-3,"oan":["a","đốt tre ở cửa ngách"]}`
- **3. Bỏ đi**
  Ngươi đi báo người coi phòng. Khi quay đầu, đệ tử vẫn áp tay giữ đoạn ống, không dám buông.

<a id="gk_duong_may_nguoc"></a>
## Đường may ngược — `gk_duong_may_nguoc`

- Loại: story; nguồn: Khám phá; chủ đề: Chuyện hai phái; cảm xúc: Lãng mạn.
- Nơi: sơn môn.
- Điều kiện: tầng 1; một lần/kiếp.
- Bối cảnh tác giả: Bậc đá giữa hai sơn môn.
- Vai: `{"a":{"gender":"nam","role":"Đệ tử","alignment":"context"},"b":{"gender":"nam","role":"đệ tử","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Đệ tử {$a.ten} đến trả áo cho đệ tử {$b.ten} đúng giờ đổi người gác. Chỗ tà áo rách đã vá ngược mặt để mũi chỉ đẹp nằm sát da.

### Lựa chọn

- **1. Đổi ca để hai người tự gặp**
  Ngươi nhận đứng thay một ca gác, để họ gặp nhau lúc đổi người. Người nhận áo xem đường vá, nói nhỏ: “Lần sau rách nữa, ta còn nhờ được không?” Người kia gật đầu, giục hắn mặc vào kẻo lạnh.
  - `e`: `{"karma":4,"an":["a","đường may ngược"]}`
- **2. Đòi trả công để giữ kín**
  Hai người trả bằng phần linh thạch họ góp mua áo mới. Từ lần sau, vết rách chỉ được gập vào trong.
  - `e`: `{"st":18,"karma":-3}`
- **3. Bỏ đi**
  Họ đổi áo trên bậc giữa. Bậc đá ướt mà gói áo khô nguyên.

<a id="gk_nguoi_ke_ban_tho"></a>
## Người kê bàn thờ — `gk_nguoi_ke_ban_tho`

- Loại: story; nguồn: Khám phá; chủ đề: Chuyện trong tông; cảm xúc: Bi thương.
- Nơi: sơn môn.
- Điều kiện: tầng 1; một lần/kiếp.
- Bối cảnh tác giả: Nhà thờ đệ tử vô danh.
- Vai: `{"a":{"gender":"nam","role":"Quản sự","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Quản sự {$a.ten} đang kê lại bàn thờ những đệ tử chết khi vận đá dựng điện. Bài vị đông quá, vài tấm phải xếp khuất phía sau. Ngươi hỏi vì sao điện mới khang trang mà nhà thờ họ lại nhỏ, lão lặng đi một lúc.

### Lựa chọn

- **1. Góp công sửa bàn thờ và khắc lại danh sách**
  Ngươi bỏ buổi nghe giảng, cùng lão làm lại giá đặt bài vị và chép đủ tên lên vách. Người tới thắp hương từ nay tìm được tên người nhà, không phải xin dỡ từng hàng xuống.
  - `e`: `{"karma":4,"h":6,"an":["a","người kê bàn thờ"]}`
- **2. Nộp gỗ tốt để đổi quyền đặt bài vị của mình**
  Ngươi có chỗ trước hàng đầu. Những bài vị rơi được gom vào một ngăn, vừa khít chiều dài ngón tay.
  - `cost`: `{"st":13}`
  - `e`: `{"karma":-2,"van":1}`
- **3. Bỏ đi**
  Lão tiếp tục chép tên, nhờ ngươi gặp người nhà ai thì báo họ có thể tới nhận di vật.

<a id="gk_dinh_lo_mat_nap"></a>
## Đỉnh lò mất nắp — `gk_dinh_lo_mat_nap`

- Loại: story; nguồn: Khám phá; chủ đề: Chuyện luyện khí; cảm xúc: Hài hước.
- Nơi: sơn môn.
- Điều kiện: tầng 1; một lần/kiếp.
- Bối cảnh tác giả: Sân phơi đan cụ.
- Vai: `{"a":{"gender":"nam","role":"linh viên","alignment":"context"},"b":{"gender":"nam","role":"đệ tử","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Lò đan sắp tới giờ giữ lửa mà nắp lại nằm trong tay linh viên {$a.ten} trên xà nhà. Đệ tử {$b.ten} đọc giới luật dọa phạt, nó vẫn thản nhiên gặm hạt. Chỉ khi hắn nhắc tới phần quả được chia, nó mới ngẩng đầu.

### Lựa chọn

- **1. Mua quả đổi lấy nắp lò**
  Ngươi mua ít quả chín, đặt xuống đất rồi lùi ra. Linh viên mang nắp xuống đổi, còn chỉ tay đòi ngươi thêm một quả cho công leo xà. Đệ tử vội ôm nắp chạy về lò.
  - `cost`: `{"st":13}`
  - `e`: `{"karma":2}`
- **2. Cho {$b.ten} mượn nắp nồi**
  Hắn cứu được mẻ đan, nồi cơm của ngươi từ đó phảng phất mùi thuốc tẩy tủy.
  - `e`: `{"karma":3}`
- **3. Bỏ đi**
  Ngươi vừa ra cổng, đệ tử đã bỏ quyển luật xuống đi tìm quả. Có lẽ hắn cũng nhận ra phải nói đúng chuyện linh viên muốn nghe.

<a id="gk_cua_da_tho_mua_dong"></a>
## Cửa đá thở mùa đông — `gk_cua_da_tho_mua_dong`

- Loại: story; nguồn: Khám phá; chủ đề: Mùa đông; cảm xúc: Kinh dị.
- Nơi: sơn môn.
- Điều kiện: tầng 1; dong; một lần/kiếp.
- Bối cảnh tác giả: Kho phù dưới dốc.
- Vai: `{}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Khe cửa kho thở ra hơi ấm dù phù giữ nhiệt đã hết. Bên trong không có tiếng người, chỉ có dấu bàn tay tụ sương in dần trên mặt cửa phía ngoài.

### Lựa chọn

- **1. Tháo từng lá phù khỏi khung**
  Ngươi tháo phù cũ theo thứ tự ngược với trận giữ kho. Hơi ấm tắt hẳn; một bàn tay lạnh túm cổ tay ngươi rồi tan khi lá phù cuối rời cửa. Ngươi bị thương nhẹ, phải đứng ngoài vận khí hồi lâu mới dám mở kho.
  - `e`: `{"karma":4,"hp":"-10%","tamma":-3}`
- **2. Hứng hơi ấm vào bình**
  Ngươi lấy được một bình khí âm luyện phù. Lúc mở nắp, chiếc bình hít vào trước.
  - `e`: `{"pill":1,"tamma":4}`
- **3. Bỏ đi**
  Đến khi ngươi xuống dốc, cả dấu tay đã mờ, riêng ngón cái vẫn nóng đỏ.

<a id="gk_bac_da_chi_mon_mot_ben"></a>
## Bậc đá chỉ mòn một bên — `gk_bac_da_chi_mon_mot_ben`

- Loại: story; nguồn: Khám phá; chủ đề: Ngộ đạo; cảm xúc: Trầm tĩnh.
- Nơi: núi non, sơn môn.
- Điều kiện: tầng 1; một lần/kiếp.
- Bối cảnh tác giả: Đường vòng lưng núi.
- Vai: `{"a":{"gender":"nam","role":"Đệ tử","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Bậc đá quanh núi chỉ mòn về phía vực. Đệ tử {$a.ten} gánh nước đi qua, đặt chân phía trong cho người ngược chiều có chỗ bám vách.

### Lựa chọn

- **1. Gánh cùng hắn một chuyến**
  Ngươi nhận một bên gánh, theo hắn đi hết đường núi. Đến đoạn hẹp, hắn nhắc hạ vai thay vì ghì tay; ngươi làm theo, nước không sóng ra nữa. Một việc nhỏ mà sửa được cả thói quen dùng lực.
  - `e`: `{"tv":4,"h":4}`
- **2. Dùng khinh thân thuật đi mép ngoài**
  Ngươi luyện được một bước đổi chân giữa không trung. Nước trong thùng hắn sóng ra, để lại vết sạch trên bậc mòn.
  - `e`: `{"tv":3,"karma":-1}`
- **3. Bỏ đi**
  Ngươi nhường đường rồi tiếp tục lên núi. Hắn gọi với theo đoạn trên có đá lở, dặn ngươi đi sát vách.

<a id="gk_nua_qua_can_cua_hai_phai"></a>
## Nửa quả cân của hai phái — `gk_nua_qua_can_cua_hai_phai`

- Loại: story; nguồn: Khám phá; chủ đề: Tranh chấp tông môn; cảm xúc: Căng thẳng.
- Nơi: núi non, sơn môn.
- Điều kiện: tầng 1; một lần/kiếp.
- Bối cảnh tác giả: Trạm chia than linh.
- Vai: `{"a":{"gender":"nam","role":"đệ tử","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Hai phái dùng chung kho than, mỗi bên giữ nửa quả cân chuẩn. Đệ tử {$a.ten} mang phần cân của mình tới, vết gãy còn sắc như vừa bị mài.

### Lựa chọn

- **1. Cân lại bằng linh thạch của ngươi**
  Ngươi bỏ linh thạch cùng cỡ lên cân làm đối chứng. Hai nửa quả cân ghép lại đã nhẹ hơn trước, đôi bên phải kiểm sổ rồi chia lại than. Ngươi để lại số linh thạch ấy cho tới khi việc đối chứng xong.
  - `cost`: `{"st":13}`
  - `e`: `{"karma":4}`
- **2. Nhận linh thạch để xác nhận cách cân cũ**
  Ngươi lấy linh thạch, ký xác nhận mà không cân lại. Bên bị hụt than phải nhóm lò bằng gỗ ướt, kéo nhau tới đòi xem chữ ký. Phái trả tiền bảo ngươi đã nhận thì tự ra giải thích.
  - `e`: `{"st":18,"karma":-3}`
- **3. Thách {$a.ten} đỡ một kiếm trên đòn cân**
  - `fight`: `{"k":"detu","n":"{$a.ten}","spar":1}`
  - **Thắng trận**: Ngươi gạt được kiếm hắn mà cân vẫn đứng, hai bên chịu dùng quả cân của ngươi.
    `{"e":{"karma":4}}`
  - **Thua trận**: Thua, ngươi phải trả cả phần than văng khỏi đĩa.
    `{"e":{"st":-10}}`
- **4. Bỏ đi**
  Mỗi phái đem nửa quả cân về. Đĩa cân trống đong đưa đến tối.

<a id="gk_loi_khac_o_tay_vin"></a>
## Lời khắc ở tay vịn — `gk_loi_khac_o_tay_vin`

- Loại: story; nguồn: Khám phá; chủ đề: Chuyện tông môn; cảm xúc: Phẫn nộ.
- Nơi: sơn môn.
- Điều kiện: tầng 1; một lần/kiếp.
- Bối cảnh tác giả: Hiên chịu phạt.
- Vai: `{"a":{"gender":"nam","role":"quản sự","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Người sửa hiên định thay thanh tay vịn có khắc lời kêu oan của các đệ tử từng chịu phạt. Quản sự {$a.ten} bảo đem đốt trước ngày đón khách. Ngươi nhìn thấy dưới một cái tên còn ghi ngày xin xét lại, tới nay đã qua ba năm.

### Lựa chọn

- **1. Tháo thanh gỗ để đưa cho người từng chịu phạt**
  Ngươi bị giữ lại giải trình. Tới khi được thả, họ đã mang thanh gỗ đặt ngay ngưỡng cửa của {$sect}.
  - `e`: `{"karma":4,"h":24}`
- **2. Bán thanh gỗ cho {$a.ten}**
  Ngươi nhận bạc để bỏ qua việc thay gỗ. Lửa nhà bếp bén ở chữ cuối, nơi có nhiều mạt gỗ nhất.
  - `e`: `{"st":18,"karma":-3,"tamma":2}`
- **3. Bỏ đi**
  Thợ mộc gói thanh gỗ, chưa đem vào bếp. Hắn hỏi người bên cạnh có biết ai trong số những cái tên ấy còn ở tông môn không.

<a id="gk_canh_man_trong_chen_mai"></a>
## Cành mận trong chén mài — `gk_canh_man_trong_chen_mai`

- Loại: story; nguồn: Khám phá; chủ đề: Tình thầy trò; cảm xúc: Cảm động.
- Nơi: sơn môn.
- Điều kiện: tầng 1; một lần/kiếp.
- Bối cảnh tác giả: Nhà tập viết phù.
- Vai: `{"a":{"gender":"nam","role":"Phù sư","alignment":"context"},"b":{"gender":"nam","role":"học trò","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Phù sư {$a.ten} nhúng cành mận vào nước mài mực để học trò {$b.ten} lần theo nét khi mắt mờ. Những lá bùa cuối ngày đều có mùi hoa rất nhạt.

### Lựa chọn

- **1. Mài lại phiến đá cho nét mực dày**
  Ngươi dành một buổi mài lại nghiên, để mực giữ thành nét nổi khi khô. Học trò lần tay đọc được lá phù mình vừa viết. Phù sư bảo hắn thử thêm một tờ, giọng vui hơn hẳn.
  - `e`: `{"karma":4,"an":["a","cành mận trong chén mài"],"h":12}`
- **2. Mua lại bút cũ của {$b.ten}**
  Hắn có bạc đi chữa mắt, còn ngươi lấy được bút từng ăn nhiều linh lực. Cành mận vẫn đặt trong chén, chúc xuống.
  - `cost`: `{"st":13}`
  - `e`: `{"karma":1,"namedRelic":{"k":"but","name":"Bút Cành Mận","lore":"Hắn có bạc đi chữa mắt, còn ngươi lấy được bút từng ăn nhiều linh lực. Cành mận vẫn đặt trong chén, chúc xuống."}}`
- **3. Bỏ đi**
  Hai thầy trò vẫn chậm rãi tập từng nét. Ngươi khép cửa giúp họ để gió khỏi làm xô giấy.

<a id="gk_nam_hon_da_vao_mua_gio"></a>
## Năm hòn đá vào mùa gió — `gk_nam_hon_da_vao_mua_gio`

- Loại: story; nguồn: Khám phá; chủ đề: Thiên tượng đầu thu; cảm xúc: Hồi hộp.
- Nơi: núi non, sơn môn.
- Điều kiện: tầng 1; thu; một lần/kiếp.
- Bối cảnh tác giả: Hẻm đá dưới sườn núi.
- Vai: `{"a":{"gender":"nam","role":"Người kéo cầu","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Gió đầu thu thổi ngang hẻm, rồi đột ngột đổi chiều giữa hai vách. Người kéo cầu {$a.ten} đặt đá giữ dây, mỗi lần quay lưng lại mất một hòn. Người qua lại bàn tán: “Gió lấy thứ chưa buộc tên.” “Hôm qua nó trả lại một hòn có rêu mặt dưới.”

### Lựa chọn

- **1. Xuống hẻm buộc lại dây vào gốc đá**
  Ngươi xuống hẻm buộc dây cầu vào gốc đá. Gió cắt đứt sợi dây kéo phụ, làm ngươi va vào vách, nhưng cầu đã được neo chắc. Leo lên tới bờ, ngươi mới thở ra được.
  - `e`: `{"karma":4,"hp":"-10%"}`
- **2. Thu luồng gió vào hồ lô**
  Ngươi có khí nhẹ để luyện thân pháp. Cầu mất một nhịp dây, người qua phải đi nghiêng đến hết thu.
  - `e`: `{"tv":4,"karma":-3}`
- **3. Bỏ đi**
  Ngươi chọn đường vòng tránh hẻm. Người kéo cầu đóng lối cũ, gọi mọi người chờ gió lặng rồi mới qua.

<a id="gk_mat_ca_trong_ranh_kiem"></a>
## Mắt cá trong rãnh kiếm — `gk_mat_ca_trong_ranh_kiem`

- Loại: story; nguồn: Khám phá; chủ đề: Cơ duyên; cảm xúc: Day dứt.
- Nơi: sơn môn.
- Điều kiện: tầng 1; một lần/kiếp.
- Bối cảnh tác giả: Ruộng bậc thang dưới kiếm đường.
- Vai: `{"a":{"gender":"nam","role":"Nông phu","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Dư khí từ kiếm đường đọng trong rãnh nước, giữ cá con đứng im suốt một ngày. Nông phu {$a.ten} múc chúng lên, con nào cũng còn sống, mắt nhìn về phía nước.

### Lựa chọn

- **1. Đục rãnh vòng qua kiếm đường**
  Ngươi đục lối nước vòng qua nơi dư khí đọng lại, làm hết buổi còn bị kiếm khí cứa tay. Cá vừa vào dòng mới đã bơi đi. Nông phu xin tông môn từ nay xả nước sau giờ luyện, ngươi nhận giúp chuyển lời.
  - `e`: `{"karma":4,"h":12,"an":["a","mắt cá trong rãnh kiếm"],"hp":"-10%"}`
- **2. Luyện kiếm bằng luồng dư khí**
  Kiếm ngươi bén thêm, cá chết hết trước khi mặt trời lặn. {$a.ten} chôn chúng dưới gốc mạ mới cấy.
  - `e`: `{"tv":5,"karma":-4,"tamma":3}`
- **3. Bỏ đi**
  Lão đặt gáo nghiêng để cá còn nhìn thấy nước.

<a id="gk_ban_ve_tren_lung_rua"></a>
## Bản vẽ trên lưng rùa — `gk_ban_ve_tren_lung_rua`

- Loại: story; nguồn: Khám phá; chủ đề: Linh thú; cảm xúc: Hài hước.
- Nơi: sơn môn.
- Điều kiện: tầng 1; một lần/kiếp.
- Bối cảnh tác giả: Sân học trận.
- Vai: `{"a":{"gender":"nam","role":"Linh quy","alignment":"context"},"b":{"gender":"nam","role":"đệ tử","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Linh quy {$a.ten} ngủ trên bản vẽ của đệ tử {$b.ten}. Hắn chép theo những nét lộ ra quanh mai, đến lúc dựng trận mới thấy cửa ra nằm đúng dưới bụng rùa.

### Lựa chọn

- **1. Dụ rùa đi bằng rau non**
  Ngươi hái rau non dẫn rùa khỏi giấy, đệ tử vội chép nốt cửa trận. Nó ăn xong lại nằm vào giữa. Hắn thở dài: “Mai ta phải trải hai tờ, cho nó riêng một tờ.”
  - `e`: `{"karma":4}`
- **2. Mua bản trận dựng nhầm**
  Ngươi có một trận giữ chân khá chắc. Khi thử thu trận, ngươi phải bước ra trước rồi mới cúi xuống nhặt đồ.
  - `cost`: `{"st":13}`
  - `e`: `{"namedRelic":{"k":"tran","name":"Trận Bàn Mai Rùa","lore":"Ngươi có một trận giữ chân khá chắc. Khi thử thu trận, ngươi phải bước ra trước rồi mới cúi xuống nhặt đồ."}}`
- **3. Bỏ đi**
  Ngươi nhắc hắn thử nhấc cả tờ giấy lên. Hắn ngẩn ra, rồi gọi thêm hai người tới khiêng rùa.

<a id="gk_so_truc_sau_ba_tieng_mo"></a>
## Sổ trực sau ba tiếng mõ — `gk_so_truc_sau_ba_tieng_mo`

- Loại: story; nguồn: Khám phá; chủ đề: Hạn chót ban đêm; cảm xúc: Căng thẳng.
- Nơi: sơn môn, thành trì.
- Điều kiện: tầng 1; dem; một lần/kiếp.
- Bối cảnh tác giả: Nhà trực chân núi.
- Vai: `{"a":{"gender":"nam","role":"Đệ tử","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Đệ tử {$a.ten} muốn ngươi ký thay để hắn xuống núi nhìn mặt cha lần cuối. Qua tiếng mõ thứ ba, người kiểm trực sẽ khép sổ, đầu bút đã gác trên nghiên.

### Lựa chọn

- **1. Xin nhận ca trực bằng tên ngươi**
  Ngươi xin ghi tên nhận ca trực thay, để hắn kịp xuống núi. Trở về, hắn cảm tạ rồi đứng cạnh ngươi tới hết ca, kể cha đã tỉnh được một lúc để nhận ra mình.
  - `e`: `{"karma":4,"h":12,"an":["a","sổ trực sau ba tiếng mõ"]}`
- **2. Ký tên hắn và giữ tiền cảm tạ**
  Hắn kịp đi. Khi bút tích lộ ra, hắn nhận cả lỗi, còn chữ giả vẫn đen hơn mọi chữ khác trong sổ.
  - `e`: `{"st":10,"karma":-2}`
- **3. Bỏ đi**
  Ngươi khuyên hắn trình thẳng việc nhà với người kiểm trực. Hắn cầm đơn đi tới bàn; ngươi không biết có được cho phép hay không.

<a id="gk_vet_cat_tren_thiep_hon"></a>
## Vết cắt trên thiệp hôn — `gk_vet_cat_tren_thiep_hon`

- Loại: story; nguồn: Khám phá; chủ đề: Từ hôn; cảm xúc: Cẩu huyết.
- Nơi: sơn môn.
- Điều kiện: tầng 1; một lần/kiếp.
- Bối cảnh tác giả: Sân thỉnh giảng.
- Vai: `{"a":{"gender":"nam","role":"Thiếu chủ","alignment":"context"},"b":{"gender":"nu","role":"Cô gái","alignment":"context"},"c":{"gender":"nam","role":"trưởng lão","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Thiếu chủ {$a.ten} đem thiệp hôn ra xé trước khi cô gái {$b.ten} bước lên thềm. Nàng cúi nhặt, trên nửa thiệp rơi phía ngươi có lời nhà hắn xin hoãn khoản nợ đan dược.

### Lựa chọn

- **1. Đọc nốt nửa thiệp trước mặt trưởng lão {$c.ten}**
  Nhà hắn phải nhận lại món nợ. {$b.ten} tự xé nửa thiệp của mình, giữ riêng mảnh ghi ngày trả.
  - `e`: `{"karma":4}`
- **2. Mua lại khoản nợ đan dược của nhà hắn**
  Ngươi trả tiền cho chủ nợ để nhận giấy nợ của nhà thiếu chủ, kiểm đủ dấu trước mặt trưởng lão. Cô gái xin lại phần thiệp mang tên mình, tuyên bố từ nay việc nợ nần của nhà hắn không liên quan tới nàng.
  - `cost`: `{"st":13}`
  - `e`: `{"st":25}`
- **3. Hộ tống nàng rời sân**
  Ngươi hộ tống nàng xuống núi, lỡ buổi thỉnh giảng. Đi được một đoạn, nàng tự gấp thiệp cất đi: “Đạo hữu đưa tới đây được rồi. Đường sau ta tự đi.”
  - `e`: `{"karma":4,"h":12,"an":["a","vết cắt trên thiệp hôn"]}`
- **4. Bỏ đi**
  {$a.ten} giẫm lên tờ thiệp đã xé. Một góc giấy dính dưới đế giày hắn.

<a id="gk_nam_voi_chua_toi"></a>
## Nắm vôi chưa tôi — `gk_nam_voi_chua_toi`

- Loại: story; nguồn: Khám phá; chủ đề: Chuyện xây sơn môn; cảm xúc: Bất an.
- Nơi: núi non, sơn môn.
- Điều kiện: tầng 1; một lần/kiếp.
- Bối cảnh tác giả: Vách núi có vết lở.
- Vai: `{"a":{"gender":"nam","role":"Thợ đá","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Thợ trát vôi lên vết nứt rồi giăng vải che lễ mở cổng. Thợ đá {$a.ten} bóp một nắm vôi trong tay, kẽ ngón tay rỉ ra nước trắng.

### Lựa chọn

- **1. Yêu cầu dừng lễ và cạo vôi kiểm tra**
  Ngươi buộc người coi lễ cho thợ cạo lớp vôi. Vết nứt chạy sâu vào chân cổng, phải gia cố ngay. Dù bị gạt khỏi hàng khách vì làm chậm lễ, ngươi thấy đoàn người đã được chuyển sang lối an toàn.
  - `e`: `{"karma":4}`
- **2. Dùng linh lực cố vách tới hết lễ**
  Ngươi kiệt sức và được trả công. Sau khi người cuối cùng qua, trên vôi xuất hiện lại một đường chân tóc.
  - `cost`: `{"mp":"20%"}`
  - `e`: `{"st":12,"karma":2}`
- **3. Bỏ đi**
  Một nắm vôi rơi xuống trước đám rước, tròn như vừa được bóp.

<a id="gk_duong_kim_qua_phu_rach"></a>
## Đường kim qua phù rách — `gk_duong_kim_qua_phu_rach`

- Loại: story; nguồn: Khám phá; chủ đề: Sinh kế; cảm xúc: Xót xa.
- Nơi: chợ phiên tu sĩ, thành trì.
- Điều kiện: tầng 1; một lần/kiếp.
- Bối cảnh tác giả: Hiên chợ dưới núi.
- Vai: `{"a":{"gender":"nam","role":"Thợ vá","alignment":"context"},"b":{"gender":"nam","role":"Đệ tử","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Thợ vá {$a.ten} vá phù hộ thân cũ bằng chỉ tơ. Đệ tử {$b.ten} đem phù của mẹ tới, nếp rách trùng đúng đường linh lực chạy qua tim phù.

### Lựa chọn

- **1. Mua chỉ tơ linh giúp vá phù**
  Ngươi mua đúng loại tơ dẫn linh lực. Thợ vá lần theo nét phù cũ, giữ được thêm một lần hộ thân cho người mang. Đệ tử hỏi kỹ cách bảo quản rồi mới cất vào ngực.
  - `cost`: `{"st":13}`
  - `e`: `{"karma":4,"an":["a","đường kim qua phù rách"]}`
- **2. Mua lại phù để lấy phần giấy còn tốt**
  {$b.ten} dùng tiền mua thuốc. Đường chỉ cắt ra, hắn xin giữ rồi quấn quanh cổ tay.
  - `cost`: `{"st":13}`
  - `e`: `{"karma":1,"pill":1}`
- **3. Bỏ đi**
  Ngươi nhường chỗ cho người tới nhận đồ. Người thợ vẫn cặm cụi vá, đệ tử ngồi bên kể chuyện mẹ mình đã giữ lá phù bao năm.

<a id="gk_bac_tren_cung_thieu_mot_phie"></a>
## Bậc trên cùng thiếu một phiến — `gk_bac_tren_cung_thieu_mot_phie`

- Loại: story; nguồn: Khám phá; chủ đề: Rời tông; cảm xúc: Lắng dịu.
- Nơi: sơn môn.
- Điều kiện: tầng 1; một lần/kiếp.
- Bối cảnh tác giả: Dốc ra sơn môn.
- Vai: `{"a":{"gender":"nam","role":"Đệ tử","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Đệ tử {$a.ten} xin rời {$sect} khi tuổi đã cao. Lão mang theo đúng một phiến đá đã mài để thay bậc lỏng, trên vai áo phủ đầy bụi trắng.

### Lựa chọn

- **1. Giúp lão kê phiến đá rồi tiễn xuống**
  Ngươi giúp lão kê lại phiến đá, lỡ giờ nghe giảng. Lão dẫm thử cho chắc rồi từ biệt sơn môn: “Ở đây mấy chục năm, ít ra cũng để lại được một bậc lành.”
  - `e`: `{"karma":4,"an":["a","bậc trên cùng thiếu một phiến"]}`
- **2. Xin bản chú giải và nhận giúp việc kê đá**
  Lão trao ngươi trang kinh đã chép, nhờ ngươi học xong nhớ chuyển cho người cần. Ngươi nhận phiến đá, để lại cạnh bậc lỏng chờ người tới giúp kê.
  - `e`: `{"tv":5,"h":6}`
- **3. Bỏ đi**
  Lão tự kê xong bậc đá rồi xuống núi. Ngươi đứng tránh bên đường, chắp tay tiễn lão.

<a id="gk_soi_day_giua_hai_mai"></a>
## Sợi dây giữa hai mái — `gk_soi_day_giua_hai_mai`

- Loại: story; nguồn: Khám phá; chủ đề: Chuyện phường nghề; cảm xúc: Lãng mạn.
- Nơi: sơn môn.
- Điều kiện: tầng 1; một lần/kiếp.
- Bối cảnh tác giả: Mái nhà kính của [tông môn].
- Vai: `{"a":{"gender":"nam","role":"người giữ mái","alignment":"context"},"b":{"gender":"nam","role":"Người giữ mái","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Người giữ mái {$a.ten} căng dây hong găng sang mái đối diện. Người giữ mái {$b.ten} buộc thêm một chiếc găng tay phải, chiếc của {$a.ten} đã mất ngón cái.

### Lựa chọn

- **1. Trông mái để hai người xuống uống trà**
  Ngươi nhận trông mái hết cơn mưa cho họ xuống uống trà. Trở lên, hai người mang thêm cho ngươi một ấm nóng, đứng kể chuyện sửa mái tới khi trời tạnh.
  - `e`: `{"karma":4,"an":["a","sợi dây giữa hai mái"],"h":6}`
- **2. Tháo dây lấy sợi tơ chống sét**
  Ngươi có tơ luyện phù, hai đôi găng rơi vào hai sân khác nhau. Mãi tối họ mới tìm được chiếc thiếu ngón.
  - `e`: `{"pill":1,"karma":-2}`
- **3. Bỏ đi**
  Gió thổi hai chiếc găng sát vào nhau. Cái ngón nguyên chui qua chỗ cái kia đã rách.
