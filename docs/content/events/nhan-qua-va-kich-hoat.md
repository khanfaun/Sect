# content/events/nhan-qua-va-kich-hoat.json

Nguồn chuẩn: `content/events/nhan-qua-va-kich-hoat.json`. Bản đọc tự sinh. Cú pháp: xem [guideline](../GUIDELINE.md).

<a id="nhan_tinh"></a>
## Hồn trong nhẫn — `nhan_tinh`

- Loại: event; nguồn: Khám phá; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: *.
- Điều kiện: mọi tầng; một lần/kiếp.
- Bối cảnh tác giả: *.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/core/12-dong-doi-tam-thoi.js`.

1. Chiếc nhẫn cũ nóng rực lên. Lần này giọng nói ấy rõ ràng: “{$p.tt}, ta là {$lao}, ba nghìn năm trước từng đứng đầu một phương. Giờ chỉ còn tàn hồn này. Ngươi giúp ta một việc, ta giúp ngươi một đời.”

### Lựa chọn

- **1. Đồng ý giúp**
  - **Khả năng 1**: Lão chỉ ngươi đến một mộ cổ, lấy lại thứ lão giấu năm xưa. Đổi lại, lão truyền cho ngươi tâm pháp cả đời. `{"w":2,"e":{"skill":2,"tv":12}}`
  - **Khả năng 2**: “Việc ấy” là thân thể của ngươi. Thần hồn lão tràn ra từ chiếc nhẫn, muốn đoạt xá! `{"w":1,"fight":{"k":"amhon","n":"{$lao}","m":1.3,"elite":1},"win":{"t":"Tàn hồn tan biến. Chiếc nhẫn vỡ đôi, nhưng ký ức tu luyện của lão đọng lại trong đầu ngươi.","e":{"tv":18,"ngo":3,"rmRelic":"nhancu"}}}`
- **2. Luyện hóa tàn hồn**
  - `chk`: `["tam",12]`
  - **Thành công**: Lão gào thét rồi im bặt. Sức mạnh ba nghìn năm chảy vào kinh mạch ngươi, lạnh và đắng.
    `{"e":{"tv":18,"tamma":8,"karma":-6,"rmRelic":"nhancu"}}`
  - **Thất bại**: Tàn hồn phản kích, suýt nữa chiếm luôn thức hải của ngươi.
    `{"e":{"hp":"-30%","tamma":6}}`
- **3. Mời lão đi đầu thai**
  Lão im lặng rất lâu. “Ba nghìn năm… cũng mệt rồi.” Ánh sáng tắt. Chiếc nhẫn trở lại là sắt vụn, nhưng ngươi giữ nó lại.
  - `e`: `{"karma":8,"van":3,"lore":"luan_hoi"}`

### Nối cơ chế

```json
{
  "condition": {
    "$hook": "nhan_tinh_cond"
  }
}
```

<a id="mo_kiep_truoc"></a>
## Nấm mộ quen — `mo_kiep_truoc`

- Loại: event; nguồn: Khám phá; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: *.
- Điều kiện: mọi tầng; nghỉ 720 giờ.
- Bối cảnh tác giả: *.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/core/14-thien-lo.js`.

1. Giữa rừng thông có một nấm mộ nhỏ, bia gỗ đã mục. Ngươi cúi xuống đọc: “{$g.ten}, hưởng dương {$g.tuoi} tuổi.” Tay ngươi run lên. Cái tên ấy, ngươi biết. Ngươi đã từng là người đó.

2. Ngươi dừng lại trước một nấm mồ hoang mà chẳng hiểu vì sao. Cỏ mọc kín, bia ghi tên {$g.ten}. Đêm qua ngươi mơ thấy đúng cái tên này.

### Lựa chọn

- **1. Thắp hương**
  Khói hương bay thẳng lên trời. Ngươi có cảm giác ai đó đang mỉm cười.
  - `e`: `{"tam":3,"tamma":-10,"van":2,"lore":"luan_hoi"}`
- **2. Đào lên**
  Trong quan tài chỉ còn bộ xương và vài thứ tùy thân. Ngươi cầm lên, thấy quen như của chính mình.
  - `e`: `{"graveItems":1,"relic":"mocu","st":10,"karma":-2,"lore":"luan_hoi"}`
- **3. Cáo từ, tiếp tục lên đường**
  Ngươi chọn rời khỏi nơi này, không can dự thêm.

### Câu kết/thông báo của phần xử lý đặc thù

- `event.mo_kiep_truoc.001`: vô danh

### Nối cơ chế

```json
{
  "variables": {
    "$hook": "mo_kiep_truoc_v"
  },
  "condition": {
    "$hook": "mo_kiep_truoc_cond"
  }
}
```

<a id="no_kiep_truoc"></a>
## Nợ kiếp trước — `no_kiep_truoc`

- Loại: event; nguồn: Truy sát; chủ đề: Ân oán; cảm xúc: không gắn nhãn.
- Nơi: *.
- Điều kiện: mọi tầng; nghỉ 720 giờ.
- Bối cảnh tác giả: *.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/core/14-thien-lo.js`.

1. Ngươi gặp {$k} lần đầu tiên trong kiếp này, vậy mà tim lại đập thình thịch như gặp kẻ thù truyền kiếp. Một mảnh ký ức lóe lên: máu, đau, và khuôn mặt này.

2. Giấc mơ đêm nào cũng lặp lại: ngươi chết dưới tay một kẻ. Hôm nay, kẻ đó đang đứng trước mặt ngươi. {$k}.

### Lựa chọn

- **1. Báo thù kiếp trước**
  - `fight`: `{"n":"{$k}","mv":"km","elite":1,"nem":1}`
  - **Thắng trận**: Nợ cũ đã trả. Ngươi thấy nhẹ hẳn, như vừa đặt xuống một gánh nặng mang từ đời trước.
    `{"e":{"tv":10,"tamma":-15,"ach":"baothu","relic":1,"nemDone":1}}`
- **2. Buông bỏ**
  Kiếp trước là kiếp trước. Ngươi quay đi. {$k} nhìn theo, không hiểu vì sao lại thấy lạnh gáy.
  - `e`: `{"tam":3,"tamma":-5}`
- **3. Cáo từ, tiếp tục lên đường**
  Ngươi chọn rời khỏi nơi này, không can dự thêm.

### Nối cơ chế

```json
{
  "variables": {
    "$hook": "no_kiep_truoc_v"
  },
  "condition": {
    "$hook": "no_kiep_truoc_cond"
  }
}
```

<a id="bao_an"></a>
## Người cũ báo ân — `bao_an`

- Loại: event; nguồn: Khám phá; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: *.
- Điều kiện: mọi tầng; nghỉ 720 giờ.
- Bối cảnh tác giả: *.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/core/14-thien-lo.js`.

1. Có người gọi tên ngươi từ phía sau. Quay lại, ngươi mất một lúc mới nhận ra: {$s.ten}, người ngươi từng {$s.d} năm nào. Giờ {$s.hn} đã khác xưa nhiều.

2. Một đoàn người dừng lại trước mặt ngươi. Kẻ dẫn đầu xuống ngựa, cúi đầu thật thấp: “Còn nhớ {$s.ten} không? Ơn {$s.d} năm ấy, hôm nay xin trả.”

### Lựa chọn

- **1. Nhận tấm lòng**
  {$s.ten} kể đã tu luyện ra sao, đã qua những gì. Lúc chia tay, {$s.hn} nhất quyết để lại một món quà.
  - `e`: `{"relic":1,"pill":1,"tv":6,"ach":"baoan"}`
- **2. Chỉ uống một chén rượu**
  Hai người cạn chén. Ngươi không nhận gì cả. {$s.ten} nhìn ngươi rất lâu, rồi cười.
  - `e`: `{"tam":3,"van":3,"tamma":-8,"ach":"baoan"}`
- **3. Cáo từ, tiếp tục lên đường**
  Ngươi chọn rời khỏi nơi này, không can dự thêm.

### Nối cơ chế

```json
{
  "variables": {
    "$hook": "bao_an_v"
  },
  "condition": {
    "$hook": "bao_an_cond"
  }
}
```

<a id="bao_oan"></a>
## Kẻ thù cũ — `bao_oan`

- Loại: event; nguồn: Truy sát; chủ đề: Ân oán; cảm xúc: không gắn nhãn.
- Nơi: *.
- Điều kiện: mọi tầng; nghỉ 720 giờ.
- Bối cảnh tác giả: *.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/core/14-thien-lo.js`.

1. {$s.ten}. Ngươi suýt không nhận ra. Gương mặt ấy giờ đầy sẹo, ánh mắt chỉ còn hận thù. “Nhớ ta không? Năm ấy ngươi {$s.d}.”

2. Có kẻ đã chờ ngươi rất lâu. {$s.ten}, người năm xưa bị ngươi {$s.d}, giờ đứng chắn giữa đường, binh khí đã tuốt khỏi vỏ.

### Lựa chọn

- **1. Ứng chiến**
  - `fight`: `{"k":"tantu","n":"{$s.ten}","m":1.2,"elite":1}`
  - **Thắng trận**: Ngươi thắng. Nhưng ánh mắt lúc ngã xuống của {$s.ten} khiến ngươi mất ngủ nhiều đêm.
    `{"e":{"tamma":5,"tv":8}}`
- **2. Xin lỗi**
  - `chk`: `["tam",12]`
  - **Thành công**: {$s.ten} sững người. Rất lâu sau, {$s.hn} quay đi, không nói một lời.
    `{"e":{"tamma":-15,"karma":8}}`
  - **Thất bại**: “Xin lỗi?” {$s.ten} cười như khóc. “Muộn rồi.”
    `{"fight":{"k":"tantu","n":"{$s.ten}","m":1.2},"win":{"t":"Một mối nợ đã trả bằng máu.","e":{"tamma":4}}}`
- **3. Cáo từ, tiếp tục lên đường**
  Ngươi chọn rời khỏi nơi này, không can dự thêm.

### Nối cơ chế

```json
{
  "variables": {
    "$hook": "bao_oan_v"
  },
  "condition": {
    "$hook": "bao_oan_cond"
  }
}
```

<a id="tam_ma_xam"></a>
## Tâm ma — `tam_ma_xam`

- Loại: event; nguồn: Khám phá; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: *.
- Điều kiện: mọi tầng; nghỉ 720 giờ.
- Bối cảnh tác giả: *.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/core/14-thien-lo.js`.

1. Đêm ấy ngươi mơ thấy chính mình đứng cười ở cuối giường. “Mệt không?” Nó hỏi. “Để ta làm thay cho.”

2. Đang đi, bóng của ngươi bỗng dừng lại, dù ngươi vẫn bước tiếp.

### Lựa chọn

- **1. Đối diện tâm ma**
  - `fight`: `{"k":"tamma"}`
  - **Thắng trận**: Nó tan đi như khói. Ngươi đứng một mình giữa đêm, lòng sáng như gương.
    `{"e":{"tamma":-40,"tam":3,"tv":8,"lore":"tam_ma"}}`
- **2. Tụng tĩnh tâm chú**
  - `chk`: `["tam",12]`
  - **Thành công**: Câu chú lặp đi lặp lại, cho tới khi tiếng cười kia nhỏ dần rồi tắt.
    `{"e":{"tamma":-20}}`
  - **Thất bại**: Càng tụng, tiếng cười càng to.
    `{"e":{"tamma":10,"hp":"-15%"}}`
- **3. Thuận theo nó**
  Một luồng sức mạnh lạnh lẽo tràn vào kinh mạch. Dễ chịu tới đáng sợ.
  - `e`: `{"atkP":10,"tamma":15,"karma":-10}`

### Nối cơ chế

```json
{
  "condition": {
    "$hook": "tam_ma_xam_cond"
  },
  "force": [
    {
      "i": "⚔️",
      "l": "Đối diện tâm ma",
      "fight": {
        "k": "tamma"
      },
      "win": {
        "t": "Ngươi đánh bại chính mình. Tâm ma tan đi, để lại một khoảng trống yên tĩnh lạ lùng.",
        "e": {
          "tamma": -60,
          "tam": 4,
          "lore": "tam_ma"
        }
      }
    }
  ]
}
```

<a id="bao_an_co"></a>
## Người cũ báo ân — `bao_an_co`

- Loại: event; nguồn: Khám phá; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: *.
- Điều kiện: mọi tầng; nghỉ 720 giờ.
- Bối cảnh tác giả: *.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/core/15-thu-trieu.js`.

1. {$p.role} ở đây là {$p.ten}, tóc đã bạc. Nhìn ngươi rất lâu, {$p.ten} run giọng: “Ngươi… giống hệt {$p.who}. Năm ấy người đó từng {$p.d} ta.”

2. Có người đuổi theo ngươi tới tận cửa. Là {$p.ten}, nay đã là {$p.role}. “{$p.who} năm xưa từng {$p.d} ta. Ta nợ người ấy. Nay trả cho ngươi.”

### Lựa chọn

- **1. Nhận lấy**
  {$p.ten} đưa ngươi một túi đồ, dặn dò rất lâu như dặn con cháu.
  - `e`: `{"relic":1,"pill":1,"tv":6,"ach":"baoan","patronDone":1}`
- **2. Chỉ ngồi uống chén trà**
  Hai người ngồi tới chiều. {$p.ten} kể về {$p.who}, về những chuyện chính ngươi không còn nhớ.
  - `e`: `{"tam":3,"tamma":-8,"ach":"baoan","patronDone":1,"partyP":30}`
- **3. Cáo từ, tiếp tục lên đường**
  Ngươi chọn rời khỏi nơi này, không can dự thêm.

### Câu kết/thông báo của phần xử lý đặc thù

- `event.bao_an_co.002`: Một người lạ
- `event.bao_an_co.003`: giúp đỡ
- `event.bao_an_co.004`: chưởng quỹ

### Nối cơ chế

```json
{
  "variables": {
    "$hook": "bao_an_co_v"
  },
  "condition": {
    "$hook": "bao_an_co_cond"
  }
}
```

<a id="cong_son_mon"></a>
## Sơn môn — `cong_son_mon`

- Loại: event; nguồn: Khám phá; chủ đề: Khám phá; cảm xúc: không gắn nhãn.
- Nơi: sơn môn.
- Điều kiện: mọi tầng; nghỉ 720 giờ.
- Bối cảnh tác giả: *.
- Vai: `{"a":{"role":"tre","alignment":"context"}}`.
- Xuất xứ: `d9ab301` / `src/game/core2/03-cong-hien-tong-mon.js`.

1. Sơn môn sừng sững trong mây. Đệ tử nội môn {$a.ten} cùng một sư đệ canh cổng, nhìn ngươi từ đầu tới chân, ánh mắt lạnh nhạt.

### Lựa chọn

- **1. Chắp tay hỏi bao giờ tông môn thu đồ**
  {$a.ten}: “Hừ, tuyển đồ à? Tới kỳ tự khắc có cáo thị dán khắp các thành trấn. Về mà chờ.”
  - `e`: `{}`
- **2. Hỏi tông môn thu người ra sao**
  {$a.ten}: “Có ba đường. Tới kỳ tuyển đồ thì thi trắc linh thạch hoặc vấn tâm lộ; thiên linh căn hay biến dị linh căn thì miễn thi. Chưa có tên thì dâng lễ vật làm tạp dịch. Còn đại tu sĩ Nguyên Anh trở lên thì xưng danh, tông môn mời làm Trưởng lão.”
  - `e`: `{}`
- **3. Dúi vào tay hắn mấy viên linh thạch, hỏi cho rõ**
  {$a.ten} liếc quanh, hạ giọng: “Trưởng lão chấm thi thích người đạo tâm vững hơn là linh căn đẹp. Vấn tâm lộ dễ qua hơn ngươi tưởng.”
  - `cost`: `{"st":5}`
  - `e`: `{"tam":1}`
- **4. Xưng danh, xin gia nhập làm Trưởng lão**
  Chuông sơn môn điểm chín tiếng. Chưởng môn đích thân ra đón, trao lệnh bài khách khanh.
  - `need`: `{"realm":3}`
  - `e`: `{"flag":"tongmon","st":120}`
- **5. Dâng lễ vật, xin làm tạp dịch**
  Ngươi gánh nước bổ củi hai năm, rảnh thì lén nghe giảng đạo. Cuối cùng cũng được ghi tên vào sổ.
  - `cost`: `{"st":60}`
  - `req`: `{"$hook":"cong_son_mon_c_4_req"}`
  - `e`: `{"flag":"tongmon","tv":12,"h":1080}`
- **6. Xin một gian tĩnh thất khách**
  Gian phòng đá nhỏ, cửa sổ nhìn ra biển mây. Ngươi ngồi một đêm, lòng lặng như nước.
  - `cost`: `{"st":20}`
  - `need`: `{"stat":{"tam":12}}`
  - `e`: `{"tamma":-8,"tv":2}`
- **7. Cáo từ**
  Ngươi chắp tay, lui xuống núi.
  - `e`: `{}`

### Nối cơ chế

```json
{
  "variables": {
    "$hook": "cong_son_mon_v"
  },
  "condition": {
    "$hook": "cong_son_mon_cond"
  }
}
```
