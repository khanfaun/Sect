# content/events/opportunities/intro.json

Nguồn chuẩn: `content/events/opportunities/intro.json`. Bản đọc tự sinh. Cú pháp: xem [guideline](../../GUIDELINE.md).

<a id="tp_hoathuong"></a>
## Hòa thượng hành cước — `tp_hoathuong`

- Loại: initiation; nguồn: Truyền tâm pháp; chủ đề: Nhập đạo; cảm xúc: không gắn nhãn.
- Nơi: thôn trấn, thành trì, núi non, rừng sâu, sơn môn.
- Điều kiện: mọi tầng.
- Bối cảnh tác giả: *.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/data/03-su_kien-du-lieu.js`.

Một hòa thượng gầy gò, bình bát sứt mẻ, đứng chắn giữa đường. Ông chắp tay: “Thí chủ hít thở rối loạn như ngựa hoang. Để bần tăng chỉ cho một cách thở.”

### Lựa chọn

- **1. Theo sư phụ đi một đoạn đường**
  Suốt một tháng ngươi khất thực, ngủ miếu cùng ông. Tối nào ông cũng ngồi thiền, ngươi ngồi theo. Lúc chia tay, ông chỉ nói: “Tâm yên thì khí tự về.”
  - `cost`: `"1 tháng"`
- **2. Xin khẩu quyết rồi đi ngay**
  Ông cười hiền, đọc chậm ba lần. Ngươi nhẩm theo tới khi thuộc làu.

### Nối cơ chế

```json
{
  "pop": "Một hòa thượng hành cước ghé xin nước, tiện tay chỉ cho ngươi cách điều hòa hơi thở.",
  "tp": {
    "n": [
      "Tĩnh Tâm Thiền Quyết",
      "Bát Nhã Điều Tức Pháp",
      "Thanh Tịnh Tọa Thiền Kinh"
    ],
    "el": "vo",
    "src": "hòa thượng truyền"
  }
}
```

<a id="tp_ysu"></a>
## Nữ y sư giữa làng dịch — `tp_ysu`

- Loại: initiation; nguồn: Truyền tâm pháp; chủ đề: Nhập đạo; cảm xúc: không gắn nhãn.
- Nơi: thôn trấn.
- Điều kiện: mọi tầng.
- Bối cảnh tác giả: *.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/data/03-su_kien-du-lieu.js`.

Làng bên đường đang có dịch. Một nữ y sư áo xanh chạy đôn chạy đáo giữa các mái nhà. Nàng liếc ngươi: “Thân thể khỏe mạnh mà không có chút linh khí… Phụ ta một tay, ta dạy cho ngươi cách dưỡng khí.”

### Lựa chọn

- **1. Ở lại phụ chữa bệnh**
  Mười ngày sắc thuốc, đun nước, khiêng người. Dịch lui, nàng giữ lời, đêm cuối ngồi dạy ngươi từng nhịp thở.
  - `cost`: `"10 ngày"`
- **2. Xin học ngay, ta còn đường xa**
  Nàng thở dài, vẫn viết cho ngươi bài khẩu quyết: “Học được thì nhớ quay lại giúp người.”

### Nối cơ chế

```json
{
  "pop": "Một nữ y sư đi ngang, bắt mạch cho ngươi rồi viết lên giấy một bài dưỡng khí quyết.",
  "tp": {
    "n": [
      "Thanh Mộc Dưỡng Sinh Quyết",
      "Hồi Xuân Dưỡng Khí Thiên",
      "Bách Thảo Điều Tức Pháp"
    ],
    "el": "moc",
    "src": "y sư truyền"
  }
}
```

<a id="tp_xactu"></a>
## Xác tu sĩ trong khe núi — `tp_xactu`

- Loại: initiation; nguồn: Truyền tâm pháp; chủ đề: Nhập đạo; cảm xúc: không gắn nhãn.
- Nơi: núi non, hang động.
- Điều kiện: mọi tầng.
- Bối cảnh tác giả: *.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/data/03-su_kien-du-lieu.js`.

Dưới khe núi có một xác người mặc đạo bào đã khô quắt, tay vẫn ôm chặt một quyển sách mỏng trước ngực.

### Lựa chọn

- **1. Chôn cất tử tế rồi mới lấy sách**
  Ngươi đào huyệt, đắp mộ, cắm một cành cây làm bia. Lúc mở sách, trang đầu ghi: “Người chôn ta, sách này tặng ngươi.”
  - `cost`: `"1 ngày"`
- **2. Lấy sách, lục luôn túi áo**
  Ngươi lấy sách, lại moi được mấy viên linh thạch. Đêm ấy nằm mơ thấy có người đứng nhìn ngươi rất lâu.

### Nối cơ chế

```json
{
  "pop": "Ngươi tình cờ thấy xác một tu sĩ, trong ngực áo còn quyển tâm pháp nhập môn.",
  "tp": {
    "n": [
      "Huyền Môn Nhập Đạo Thiên",
      "Dẫn Khí Sơ Giải",
      "Vân Du Tâm Pháp"
    ],
    "el": "root",
    "src": "di vật cổ nhân"
  }
}
```

<a id="tp_mong"></a>
## Giấc mộng giữa đêm — `tp_mong`

- Loại: initiation; nguồn: Truyền tâm pháp; chủ đề: Nhập đạo; cảm xúc: không gắn nhãn.
- Nơi: *.
- Điều kiện: mọi tầng.
- Bối cảnh tác giả: *.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/data/03-su_kien-du-lieu.js`.

Đêm ấy ngươi mơ thấy mình ngồi trên đỉnh núi mây. Một bóng người không rõ mặt ngồi đối diện, giọng như tiếng chuông xa: “Nghe cho kỹ, ta chỉ nói một lần.”

### Lựa chọn

- **1. Bật dậy chép lại ngay**
  Ngươi thắp đèn, chép một mạch tới sáng. Đọc lại thấy câu nào cũng đúng.
- **2. Nằm yên, cố mơ tiếp**
  Ba đêm liền ngươi mơ cùng một giấc mơ. Đêm thứ ba bóng người ấy gật đầu rồi tan đi. Đầu óc ngươi sáng hẳn ra, chỉ là đôi khi giật mình không biết đâu là mộng.
  - `cost`: `"3 ngày"`

### Nối cơ chế

```json
{
  "pop": "Một đêm nằm mộng, có người không rõ mặt giảng cho ngươi một bài khẩu quyết. Tỉnh dậy vẫn nhớ từng chữ.",
  "tp": {
    "n": [
      "Mộng Trung Dẫn Khí Quyết",
      "Vân Đỉnh Tâm Kinh",
      "Thái Hư Mộng Đạo Thiên"
    ],
    "el": "root",
    "src": "mộng truyền"
  }
}
```

<a id="tp_nguong"></a>
## Ngư ông hát chèo — `tp_nguong`

- Loại: initiation; nguồn: Truyền tâm pháp; chủ đề: Nhập đạo; cảm xúc: không gắn nhãn.
- Nơi: sông hồ.
- Điều kiện: mọi tầng.
- Bối cảnh tác giả: *.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/data/03-su_kien-du-lieu.js`.

Bên sông, một ngư ông buông câu, miệng hát bài chèo nghe rất lạ: hít vào ba nhịp, thở ra chín nhịp, lời hát cứ xoáy vào tai ngươi.

### Lựa chọn

- **1. Ngồi câu cá cùng ông tới tối**
  Tới khi mặt trời lặn, ngươi đã hát theo được cả bài. Ông thu cần: “Hát đúng nhịp thì khí tự theo.”
  - `cost`: `"nửa ngày"`
- **2. Hỏi thẳng lời hát là gì**
  Ông cười khà: “Hỏi thì ta hát chậm lại.” Hát chậm lại ba lần, ngươi nhớ hết.

### Nối cơ chế

```json
{
  "pop": "Một ngư ông bên sông hát đi hát lại một bài chèo. Nghe mãi ngươi mới biết lời hát là khẩu quyết dẫn khí.",
  "tp": {
    "n": [
      "Thủy Nguyệt Điều Tức Ca",
      "Ngư Ca Dẫn Khí Quyết",
      "Trường Giang Tâm Pháp"
    ],
    "el": "thuy",
    "src": "ngư ông truyền"
  }
}
```

<a id="tp_tantu"></a>
## Tán tu trọng thương — `tp_tantu`

- Loại: initiation; nguồn: Truyền tâm pháp; chủ đề: Nhập đạo; cảm xúc: không gắn nhãn.
- Nơi: thôn trấn, núi non, rừng sâu, hoang nguyên.
- Điều kiện: mọi tầng.
- Bối cảnh tác giả: *.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/data/03-su_kien-du-lieu.js`.

Bên vệ đường một tán tu mình đầy máu, thều thào: “Đưa ta qua núi… người của chúng đang đuổi… ta không có gì ngoài một quyển tâm pháp.”

### Lựa chọn

- **1. Cõng hắn qua núi**
  Bảy ngày băng rừng, hai lần suýt bị phát hiện. Qua được núi, hắn dúi quyển sách vào tay ngươi: “Ân này ta nhớ.”
  - `cost`: `"7 ngày"`
- **2. Băng bó rồi đi đường mình**
  Hắn nhìn ngươi một lúc, rồi vẫn ném cho ngươi quyển sách: “Cầm lấy, ta sợ chết rồi không ai đọc.”

### Nối cơ chế

```json
{
  "pop": "Ngươi băng bó cho một tán tu bị thương. Trước khi đi, hắn để lại một quyển tâm pháp nhập môn.",
  "tp": {
    "n": [
      "Liệt Hỏa Luyện Khí Quyết",
      "Kim Cương Dẫn Khí Thiên",
      "Phong Lôi Sơ Thức Pháp"
    ],
    "el": "root",
    "src": "tán tu tặng"
  }
}
```

<a id="tp_mieuhoang"></a>
## Vách khắc trong miếu hoang — `tp_mieuhoang`

- Loại: initiation; nguồn: Truyền tâm pháp; chủ đề: Nhập đạo; cảm xúc: không gắn nhãn.
- Nơi: phế tích.
- Điều kiện: mọi tầng.
- Bối cảnh tác giả: *.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/data/03-su_kien-du-lieu.js`.

Mưa to, ngươi chui vào một ngôi miếu hoang trú tạm. Sau tượng thần đổ nát, trên vách đá có khắc chi chít chữ: một bài khẩu quyết dẫn khí.

### Lựa chọn

- **1. Thắp hương rồi mới đọc**
  Ngươi dọn sạch bàn thờ, thắp mấy nén hương cỏ. Đọc tới đâu thuộc tới đó.
- **2. Đọc cả đêm cho thuộc**
  Ngươi đọc đi đọc lại tới sáng, còn ngộ ra mấy chỗ người khắc viết sai.
  - `cost`: `"1 ngày"`

### Nối cơ chế

```json
{
  "pop": "Trú mưa trong miếu hoang, ngươi đọc được bài khẩu quyết dẫn khí khắc sau tượng thần.",
  "tp": {
    "n": [
      "Hậu Thổ Thạch Bích Quyết",
      "Cổ Miếu Dẫn Khí Văn",
      "Thạch Khắc Tâm Kinh"
    ],
    "el": "tho",
    "src": "vách khắc cổ"
  }
}
```

<a id="tp_tre"></a>
## Sách lót chuồng trâu — `tp_tre`

- Loại: initiation; nguồn: Truyền tâm pháp; chủ đề: Nhập đạo; cảm xúc: không gắn nhãn.
- Nơi: thôn trấn, rừng sâu.
- Điều kiện: mọi tầng.
- Bối cảnh tác giả: *.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/data/03-su_kien-du-lieu.js`.

Đứa bé chăn trâu chìa ra một quyển sách cũ: “Người có bánh không? Đổi cái này. Nhà em lấy lót chuồng, mà chữ đẹp lắm.”

### Lựa chọn

- **1. Đổi bánh lấy sách**
  Thằng bé cầm bánh chạy biến. Quyển sách hơi mùi trâu, nhưng chữ vẫn đọc được.
- **2. Cho thêm ít tiền**
  Ngươi dúi thêm cho nó một viên linh thạch. Nó tròn mắt, chạy về khoe cả làng.
  - `need`: `{"$hook":"tp_tp_tre_5_1_need"}`

### Câu kết/thông báo của phần xử lý đặc thù

- `event.tp_tre.070`: Không có linh thạch

### Nối cơ chế

```json
{
  "pop": "Một đứa bé chăn trâu đổi cho ngươi quyển sách lót chuồng. Mở ra mới biết là một bài tâm pháp.",
  "tp": {
    "n": [
      "Dẫn Khí Quyết (bản cũ)",
      "Mục Đồng Tâm Pháp",
      "Thanh Ngưu Điều Tức Thiên"
    ],
    "el": "vo",
    "src": "đổi được"
  }
}
```

<a id="tp_kyuc"></a>
## Ký ức chợt về — `tp_kyuc`

- Loại: initiation; nguồn: Truyền tâm pháp; chủ đề: Nhập đạo; cảm xúc: không gắn nhãn.
- Nơi: *.
- Điều kiện: mọi tầng.
- Bối cảnh tác giả: *.
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/data/03-su_kien-du-lieu.js`.

Vừa dừng chân, ngươi bỗng đứng sững: cảnh này dường như đã từng thấy. Trong đầu vang lên một bài khẩu quyết, như của ai đó, mà cũng như của chính mình.

### Lựa chọn

- **1. Nhắm mắt nhớ lại**
  Từng câu hiện lên rõ dần. Ngươi không biết mình đã học nó ở đâu, chỉ biết là đúng.
- **2. Ngồi bên sông cả ngày**
  Ngươi ngồi tới khi trăng lên. Bài khẩu quyết đã thuộc, lòng cũng yên hẳn.
  - `cost`: `"1 ngày"`

### Nối cơ chế

```json
{
  "pop": "Một hôm đi ngang khúc sông quen lạ, trong đầu ngươi bỗng vang lên một bài khẩu quyết từ kiếp nào.",
  "tp": {
    "n": [
      "Túc Tuệ Dẫn Khí Quyết",
      "Luân Hồi Tâm Ấn",
      "Vong Xuyên Tàn Thiên"
    ],
    "el": "root",
    "src": "ký ức kiếp trước"
  }
}
```
