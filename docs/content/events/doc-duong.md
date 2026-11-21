# content/events/doc-duong.json

Nguồn chuẩn: `content/events/doc-duong.json`. Bản đọc tự sinh. Cú pháp: xem [guideline](../GUIDELINE.md).

<a id="lao_gia"></a>
## Lão nhân hấp hối — `lao_gia`

- Loại: event; nguồn: Đi đường; chủ đề: Lữ hành; cảm xúc: không gắn nhãn.
- Nơi: *.
- Điều kiện: tầng 0, 1, 2; nghỉ 720 giờ.
- Bối cảnh tác giả: *.
- Vai: `{"a":{"role":"gia","alignment":"context"}}`.
- Xuất xứ: `d9ab301` / `src/game/core/12-dong-doi-tam-thoi.js`.

1. {mo} Bên vệ đường, một lão nhân {$a.look} nằm co ro dưới gốc cây, hơi thở đứt quãng. Thấy ngươi, {$a.hn} gắng nhấc tay: “{$a.goi}… nước…”

2. Ngươi suýt vấp phải một người nằm giữa lối. Là một lão nhân {$a.look}, ngực áo loang máu đã thâm đen. Bên hông {$a.hn} là một túi trữ vật thêu chỉ bạc.

3. {$canh} Dưới mái đình đổ, có người đang ho ra máu. {$a.ten}, một tán tu {$a.look}, ngẩng lên nhìn ngươi bằng ánh mắt của kẻ biết mình sắp chết.

### Lựa chọn

- **1. Đỡ dậy, truyền chút linh lực**
  - `cost`: `{"mp":"30%"}`
  - **Khả năng 1**: {$a.hn} nắm chặt tay ngươi, cười khà: “Không ngờ cuối đời còn gặp được người tốt.” {$a.hn} nhét vào tay ngươi một cuốn sách nhàu nát, rồi nhắm mắt. Gió thổi, mái tóc bạc khẽ lay. `{"w":3,"e":{"skill":1,"deed":"cuu_nguoi"}}`
  - **Khả năng 2**: {$a.hn} gắng gượng kể về một khe đá sau núi, rồi tắt thở. Ngươi chôn cất tử tế. Theo lời {$a.hn}, ngươi tìm được mấy túi linh thạch giấu kỹ. `{"w":2,"e":{"st":25,"deed":"cuu_nguoi","tv":4}}`
  - **Khả năng 3**: Bàn tay khô héo bỗng siết lại như gọng kìm. {$a.hn} ngẩng lên, mắt đỏ ngầu: “Thân thể trẻ thật…” Là ma tu muốn đoạt xá! `{"w":1,"fight":{"k":"matu","n":"{$a.ten}","m":1.1},"win":{"t":"Lão ma tan thành khói đen. Trong túi còn ít linh thạch và một viên đan.","e":{"st":20,"pill":1}}}`
- **2. Lấy túi trữ vật**
  - **Khả năng 1**: Ngươi giật lấy túi. {$a.hn} trợn mắt nhìn ngươi, muốn nói gì đó mà không thành tiếng. Đi xa rồi, ngươi vẫn thấy ánh mắt ấy sau gáy. `{"w":2,"e":{"st":35,"hd":{"t":8},"ng":{"b":8},"tamma":6}}`
  - **Khả năng 2**: Túi có cấm chế. Vừa chạm vào, một luồng hắc khí xộc lên tay. {$a.hn} cười khàn khàn rồi tắt thở. `{"w":1,"e":{"hp":"-20%","hd":{"t":8},"ng":{"b":8},"st":15}}`
- **3. Bước qua**
  Ngươi bước qua. Sau lưng có tiếng thở dài, rồi im bặt. Tu tiên giới mỗi ngày đều có người chết như vậy.
  - `e`: `{"tamma":2}`
- **4. Cáo từ, tiếp tục lên đường**
  Ngươi chọn rời khỏi nơi này, không can dự thêm.

### Nối cơ chế

```json
{
  "variables": {
    "$hook": "lao_gia_v"
  }
}
```

<a id="thuong_doan"></a>
## Thương đội gặp nạn — `thuong_doan`

- Loại: event; nguồn: Đi đường; chủ đề: Lữ hành; cảm xúc: không gắn nhãn.
- Nơi: rừng sâu, núi non, hoang nguyên, sông hồ, biển khơi.
- Điều kiện: mọi tầng; nghỉ 720 giờ.
- Bối cảnh tác giả: rung / nui / hoang / song / bien.
- Vai: `{"a":{"role":"thuong","alignment":"context"}}`.
- Xuất xứ: `d9ab301` / `src/game/core/12-dong-doi-tam-thoi.js`.

1. {mo} Phía trước có tiếng la hét. Một đoàn xe thương lái bị chặn giữa đường, {$a.ten} đang quỳ lạy một đám người bịt mặt.

2. Tiếng ngựa hí, tiếng hàng hóa đổ loảng xoảng. Một thương đội bị cướp chặn đánh, hộ vệ đã ngã quá nửa. {$a.ten}, {$a.look}, co rúm sau bánh xe.

### Lựa chọn

- **1. Ra tay tương trợ**
  - `fight`: `{"k":"sontac"}`
  - **Thắng trận**: {$a.ten} lạy ngươi như tế sao: “Ân nhân! Ân nhân!” Gã nhất quyết dúi vào tay ngươi một túi linh thạch, hứa sau này gặp lại sẽ báo đáp.
    `{"e":{"st":30,"deed":"cuu_nguoi","an":["a","cứu khỏi tay bọn cướp"]}}`
- **2. Đứng xem, chờ ngư ông đắc lợi**
  - `chk`: `["tp",10]`
  - **Thành công**: Hai bên đánh nhau tan tác. Ngươi lặng lẽ nhặt mấy thứ rơi vãi rồi biến mất trước khi ai kịp để ý.
    `{"e":{"st":25,"hd":{"t":1},"pill":1}}`
  - **Thất bại**: Một tên cướp phát hiện ra ngươi. “Còn một con chuột!” Cả đám quay sang.
    `{"fight":{"k":"sontac"},"win":{"t":"Bọn cướp chạy tán loạn. Thương đội đã bỏ đi từ lúc nào.","e":{"st":10}}}`
- **3. Đi đường vòng**
  Chuyện của người ta, ngươi không xen vào. Đi vòng mất thêm nửa ngày.
  - `e`: `{"h":36}`
- **4. Cáo từ, tiếp tục lên đường**
  Ngươi chọn rời khỏi nơi này, không can dự thêm.

### Nối cơ chế

```json
{
  "variables": {
    "$hook": "thuong_doan_v"
  }
}
```

<a id="ke_bi_duoi"></a>
## Kẻ bị truy sát — `ke_bi_duoi`

- Loại: event; nguồn: Đi đường; chủ đề: Lữ hành; cảm xúc: không gắn nhãn.
- Nơi: *.
- Điều kiện: mọi tầng; nghỉ 720 giờ.
- Bối cảnh tác giả: *.
- Vai: `{"a":{"role":"tre","alignment":"context"},"b":{"role":"tre","alignment":"context"}}`.
- Xuất xứ: `d9ab301` / `src/game/core/12-dong-doi-tam-thoi.js`.

1. Một bóng người lao ra từ bụi rậm, suýt đâm sầm vào ngươi. Là {$a.ten}, {$a.look}, vai cắm một mũi tên. “Cứu… người của {$sect} đang đuổi theo!”

2. Có tiếng bước chân dồn dập. {$a.ten} chạy tới, sắc mặt trắng bệch: “{$a.goi}, xin che giấu giúp {$a.xung}! {$sect} muốn giết người diệt khẩu!”

### Lựa chọn

- **1. Đứng chắn phía trước**
  - `fight`: `{"k":"detu","n":"{$b.ten}"}`
  - **Thắng trận**: {$a.ten} cúi đầu thật sâu: “Ơn này {$a.xung} khắc cốt.” Trước khi đi, {$a.hn} để lại cho ngươi một viên đan.
    `{"e":{"pill":1,"deed":"cuu_nguoi","an":["a","cứu khỏi tay truy binh"]}}`
- **2. Giấu vào bụi rậm, đánh lạc hướng**
  - `chk`: `["tam",10]`
  - **Thành công**: Đám đệ tử {$sect} hỏi, ngươi chỉ bừa sang hướng khác, mặt không đổi sắc. Chúng đi rồi, {$a.ten} bò ra, run rẩy cảm tạ.
    `{"e":{"deed":"cuu_nguoi","tv":3,"an":["a","che giấu khỏi truy binh"]}}`
  - **Thất bại**: “Nói dối không chớp mắt nhỉ?” Kẻ cầm đầu cười lạnh, rút kiếm.
    `{"fight":{"k":"detu","n":"{$b.ten}"},"win":{"t":"Đuổi được bọn chúng, nhưng {$a.ten} đã biến mất, chỉ để lại vệt máu và một miếng ngọc bội.","e":{"relic":0}}}`
- **3. Chỉ chỗ cho kẻ đuổi**
  Ngươi chỉ tay. {$a.ten} nhìn ngươi bằng ánh mắt mà ngươi sẽ còn nhớ rất lâu. Đệ tử {$sect} ném cho ngươi túi linh thạch như ném xương cho chó.
  - `e`: `{"st":30,"deed":"giet_vo_toi","deedO":{"tn":"tiep_tay"},"tamma":5,"oan":["a","chỉ chỗ cho kẻ thù"]}`
- **4. Cáo từ, tiếp tục lên đường**
  Ngươi chọn rời khỏi nơi này, không can dự thêm.

### Nối cơ chế

```json
{
  "variables": {
    "$hook": "ke_bi_duoi_v"
  }
}
```

<a id="thi_the"></a>
## Thi thể bên đường — `thi_the`

- Loại: event; nguồn: Đi đường; chủ đề: Lữ hành; cảm xúc: không gắn nhãn.
- Nơi: *.
- Điều kiện: mọi tầng; nghỉ 720 giờ.
- Bối cảnh tác giả: *.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/core/12-dong-doi-tam-thoi.js`.

1. Một thi thể nằm sấp bên đường, áo đệ tử {$sect} đã bạc màu. Bên hông vẫn còn túi trữ vật.

2. Dưới gốc cây có một bộ xương còn mặc đạo bào. Tay xương ôm chặt một hộp gỗ, như sợ ai lấy mất.

3. {$canh} Mùi tử khí xộc vào mũi. Một tu sĩ chết chưa lâu, mắt vẫn mở, như đang nhìn thứ gì phía sau ngươi.

### Lựa chọn

- **1. Lục soát**
  - **Khả năng 1**: Ngươi tìm được ít linh thạch và một viên đan còn nguyên trong lọ. `{"w":3,"e":{"st":18,"pill":1}}`
  - **Khả năng 2**: Trong hộp là một cuộn bí tịch dính máu. Chữ viết run rẩy, như được chép trong cơn hấp hối. `{"w":2,"e":{"skill":1}}`
  - **Khả năng 3**: Túi có độc. Ngón tay ngươi tím tái lại, phải vận công nửa ngày mới ép ra được. `{"w":1,"e":{"hp":"-15%","st":10}}`
  - **Khả năng 4**: Thi thể bỗng co giật, rồi ngồi bật dậy! `{"w":1,"fight":{"k":"cuongthi"},"win":{"t":"Lần này thì nó nằm yên thật. Trong túi còn ít linh thạch.","e":{"st":20}}}`
- **2. Chôn cất tử tế**
  Ngươi đào huyệt, đặt thi thể xuống, cắm một cành cây làm bia. Đêm ấy ngươi mơ thấy một người cúi đầu cảm tạ.,Ngươi khép mắt người chết lại, đắp đất thành nấm. Không biết tên, ngươi khắc lên đá: “Người đi đường”.
  - `e`: `{"deed":"an_tang","tam":1,"van":1}`
- **3. Không đụng vào**
  Người chết rồi, ân oán nên chết theo. Ngươi đi tiếp.

<a id="bi_cuop"></a>
## Cướp đường — `bi_cuop`

- Loại: event; nguồn: Đi đường; chủ đề: Lữ hành; cảm xúc: không gắn nhãn.
- Nơi: rừng sâu, núi non, hoang nguyên, sông hồ, thôn trấn.
- Điều kiện: mọi tầng; nghỉ 720 giờ.
- Bối cảnh tác giả: rung / nui / hoang / song / tran.
- Vai: `{"a":{"role":"nam","alignment":"context"}}`.
- Xuất xứ: `d9ab301` / `src/game/core/12-dong-doi-tam-thoi.js`.

1. “Núi này ta mở, cây này ta trồng…” Một đám sơn tặc nhảy ra chặn đường, kẻ cầm đầu {$a.look}.

2. Dây thừng bật lên từ mặt đất, suýt quật ngã ngươi. Mấy gã đàn ông mặt mũi bặm trợn bước ra từ hai bên đường.

### Lựa chọn

- **1. Đánh**
  - `fight`: `{"k":"sontac","n":"{$a.ten}"}`
  - **Thắng trận**: Bọn cướp chạy tán loạn, bỏ lại cả của cướp được.
    `{"e":{"st":20,"deed":"giet_cuop_dang_ac"}}`
- **2. Nộp tiền mãi lộ**
  Bọn chúng cười hô hố, nhường đường. Ngươi nuốt cục tức xuống bụng.
  - `cost`: `{"st":12}`
  - `e`: `{"tamma":3}`
- **3. Tỏa uy áp dọa chúng**
  - `chk`: `["tam",9]`
  - **Thành công**: Ngươi chỉ hừ một tiếng. Cả bọn quỳ rạp, dập đầu xin tha, còn dâng cả của cướp được.
    `{"e":{"st":15}}`
  - **Thất bại**: Uy áp của ngươi như gió thoảng. Cả bọn cười rồ lên rồi xông vào.
    `{"fight":{"k":"sontac","n":"{$a.ten}"},"win":{"t":"Lần sau chúng sẽ biết sợ.","e":{"st":12}}}`
- **4. Cáo từ, tiếp tục lên đường**
  Ngươi chọn rời khỏi nơi này, không can dự thêm.

### Nối cơ chế

```json
{
  "variables": {
    "$hook": "bi_cuop_v"
  }
}
```

<a id="yeu_toc"></a>
## Yêu tộc chặn đường — `yeu_toc`

- Loại: event; nguồn: Đi đường; chủ đề: Lữ hành; cảm xúc: không gắn nhãn.
- Nơi: biển khơi, rừng sâu, hoang nguyên.
- Điều kiện: tầng 2, 3, 4; nghỉ 720 giờ.
- Bối cảnh tác giả: bien / rung / hoang.
- Vai: `{"a":{"role":"yeu","alignment":"context"}}`.
- Xuất xứ: `d9ab301` / `src/game/core/13-su-kien-2-tong.js`.

1. Một đoàn yêu tộc hóa hình chặn đường. Kẻ cầm đầu là {$a.ten}, {$a.look}: “Người tu tiên, đất này của yêu tộc. Nộp mãi lộ, hoặc nộp mạng.”

### Lựa chọn

- **1. Nộp**
  {$a.ten} nhận, phẩy tay. Đoàn yêu tộc rẽ ra hai bên.
  - `cost`: `{"st":30}`
- **2. Đánh**
  - `fight`: `{"k":"beast","elite":1,"n":"{$a.ten}"}`
  - **Thắng trận**: Thủ lĩnh ngã, cả đoàn yêu tộc lùi vào rừng.
    `{"e":{"st":30}}`
- **3. Thuyết phục**
  - `chk`: `["ngo",12]`
  - **Thành công**: Ngươi kể về Ngũ Tổ, về hòa ước ba nghìn năm giữa người và yêu. {$a.ten} nheo mắt, rồi tránh đường.
    `{"e":{"flag":"yeutoc","van":2,"lore":"ngu_to"}}`
  - **Thất bại**: “Người các ngươi nói hay lắm.” {$a.ten} nhe nanh.
    `{"fight":{"k":"beast","n":"{$a.ten}"},"win":{"t":"Lần này ngươi nói bằng nắm đấm.","e":{"st":15}}}`
- **4. Cáo từ, tiếp tục lên đường**
  Ngươi chọn rời khỏi nơi này, không can dự thêm.

### Nối cơ chế

```json
{
  "variables": {
    "$hook": "yeu_toc_v"
  }
}
```
