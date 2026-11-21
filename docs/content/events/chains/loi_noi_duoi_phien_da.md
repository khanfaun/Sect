# content/events/chains/loi_noi_duoi_phien_da.json

Nguồn chuẩn: `content/events/chains/loi_noi_duoi_phien_da.json`. Bản đọc tự sinh. Cú pháp: xem [guideline](../../GUIDELINE.md).

<a id="ch_loi_noi_duoi_phien_da_1"></a>
## Nêm cửa phòng kín — `ch_loi_noi_duoi_phien_da_1`

- Loại: story; nguồn: Khám phá; chủ đề: Kỷ luật trong tông; cảm xúc: Bất an.
- Nơi: núi non, sơn môn.
- Điều kiện: tầng 1; chuỗi loi_noi_duoi_phien_da / phần 1; một lần/kiếp.
- Bối cảnh tác giả: Dãy phòng tĩnh tu ở Linh Sơn Vạn Lĩnh.
- Vai: `{"b":{"gender":"nam","role":"Đệ tử","alignment":"context"},"a":{"gender":"nam","role":"Đệ tử","alignment":"context"},"c":{"gender":"nam","role":"giám luật","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Đệ tử {$b.ten} bị phạt nhốt trong phòng tĩnh tu, bình nước đã cạn từ sáng. Đệ tử {$a.ten} chèn nêm giữ khe cửa để đưa thêm nước, vừa rót được nửa bình thì giám luật {$c.ten} tới. Lão hỏi ai cho phép mở cửa.

### Lựa chọn

- **1. Nhận là ngươi đặt nêm**
  Ngươi chịu một đêm tĩnh tu thay. {$a.ten} lấy vạt áo thấm nốt phần nước tràn.
  - `e`: `{"hd":{"p":3},"ng":{"g":3},"h":12,"tamma":-2}`
- **2. Rút nêm rồi trả bình**
  Ngươi được {$c.ten} cho qua. Từ bên trong có người đưa ra một cái chén còn khô.
  - `e`: `{"hd":{"t":1}}`
- **3. Bỏ đi**
  Chiếc nêm bị đá sang góc. {$a.ten} nhặt nó lên bằng chân trần.

### Lịch sử và nhánh

```json
{
  "id": "loi_noi_duoi_phien_da",
  "part": "1",
  "waitHours": 0,
  "needs": [],
  "paths": null
}
```

<a id="ch_loi_noi_duoi_phien_da_2"></a>
## Chén nước đã nguội — `ch_loi_noi_duoi_phien_da_2`

- Loại: story; nguồn: Khám phá; chủ đề: Chuyện trong tông; cảm xúc: Cảm động.
- Nơi: núi non, sơn môn.
- Điều kiện: tầng 1, 2, 3, 4; chuỗi loi_noi_duoi_phien_da / phần 2; chờ ≥ 120 giờ; một lần/kiếp.
- Bối cảnh tác giả: Kho nước ở Linh Sơn Vạn Lĩnh.
- Vai: `{"b":{"gender":"nam","role":"đệ tử","alignment":"context"},"a":{"gender":"nam","role":"Đệ tử","alignment":"context"},"c":{"gender":"nam","role":"story_person","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Đệ tử {$b.ten} ra khỏi phòng kín với cổ họng rớm máu. Đệ tử {$a.ten} dùng móng tay đục vạch thấp trong bình để người kế tiếp biết chỗ đủ uống.

### Lựa chọn

- **1. Giúp họ ghi lại người đã chịu phạt**
  Ngươi cùng họ ghi tên những người từng bị cắt nước khi chịu phạt. Chuyện tới tai giám luật, ngươi bị cấm mượn sách một kỳ. Danh sách đã được chép thành nhiều bản, không còn giấu dưới bình nữa.
  - `e`: `{"hd":{"p":3},"ng":{"g":3},"an":["a","chén nước đã nguội"]}`
- **2. Đưa đan dược để {$b.ten} khỏi phải nói**
  Hắn dưỡng được giọng, còn danh sách nằm dưới bình. Khi nhấc bình lên, trên giấy có một vòng tròn sẫm.
  - `e`: `{"pill":1,"hd":{"p":1},"ng":{"g":1}}`
- **3. Bỏ đi**
  {$a.ten} đổi chén lớn hơn, đặt bên cạnh bình.

### Lịch sử và nhánh

```json
{
  "id": "loi_noi_duoi_phien_da",
  "part": "2",
  "waitHours": 120,
  "needs": [
    0
  ],
  "paths": null
}
```

<a id="ch_loi_noi_duoi_phien_da_2b"></a>
## Bình úp mặt — `ch_loi_noi_duoi_phien_da_2b`

- Loại: story; nguồn: Khám phá; chủ đề: Chuyện trong tông; cảm xúc: Day dứt.
- Nơi: núi non, sơn môn.
- Điều kiện: tầng 1, 2, 3, 4; chuỗi loi_noi_duoi_phien_da / phần 2b; chờ ≥ 120 giờ; một lần/kiếp.
- Bối cảnh tác giả: Dãy bếp ở Linh Sơn Vạn Lĩnh.
- Vai: `{"b":{"gender":"nam","role":"đệ tử","alignment":"context"},"a":{"gender":"nam","role":"Đệ tử","alignment":"context"},"c":{"gender":"nam","role":"story_person","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Đệ tử {$a.ten} bị bắt úp hết bình nước không dùng. Hắn úp riêng một bình lên khăn ướt, dưới khăn giấu một mẩu giấy của đệ tử {$b.ten}.

### Lựa chọn

- **1. Đọc mẩu giấy trước mặt người làm bếp**
  Ngươi đọc lời kể của đệ tử bị nhốt cho mọi người trong bếp nghe. Họ nhận ra không chỉ một người từng bị bỏ khát. Giám luật ghi tên ngươi, nhưng lần này đã có nhiều người đứng lại làm chứng.
  - `e`: `{"hd":{"p":3},"ng":{"g":3},"an":["a","bình úp mặt"]}`
- **2. Trả tiền giữ kín và mua nước cho người trong phòng**
  Nước được đưa vào mỗi tối. Người mang nước xin thêm tiền để mua một cái chén không sứt.
  - `cost`: `{"st":13}`
  - `e`: `{"hd":{"p":1},"ng":{"g":1}}`
- **3. Bỏ đi**
  Khăn khô dần và giấy cong lên, đẩy miệng bình nhích khỏi bàn.

### Lịch sử và nhánh

```json
{
  "id": "loi_noi_duoi_phien_da",
  "part": "2b",
  "waitHours": 120,
  "needs": [
    1
  ],
  "paths": null
}
```

<a id="ch_loi_noi_duoi_phien_da_3"></a>
## Dời phòng xuống thấp — `ch_loi_noi_duoi_phien_da_3`

- Loại: story; nguồn: Khám phá; chủ đề: Cải lệ; cảm xúc: Phẫn nộ.
- Nơi: sơn môn, thành trì.
- Điều kiện: tầng 1, 2, 3, 4; chuỗi loi_noi_duoi_phien_da / phần 3; chờ ≥ 720 giờ; một lần/kiếp.
- Bối cảnh tác giả: Sân chuyển nhà ở Linh Sơn Vạn Lĩnh.
- Vai: `{"b":{"gender":"nam","role":"story_person","alignment":"context"},"a":{"gender":"nam","role":"story_person","alignment":"context"},"c":{"gender":"nam","role":"Giám luật","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Giám luật {$c.ten} dời phòng phạt xuống dưới đất. Nếu lời chứng đã được chia sẻ, đệ tử đến mang theo giấy. Nếu ngươi từng giúp kín, người bị nhốt mang ra một hàng chén rồi đứng lại.

### Lựa chọn

- **1. Đòi giám luật mở phòng cho mọi người xem**
  Ngươi đòi mở phòng mới cho mọi người kiểm tra, bị gạch tên khỏi buổi nghị sự trong tông. Người tới xem phát hiện khe thông khí quá hẹp, đồng loạt yêu cầu sửa trước khi nhốt người.
  - `e`: `{"hd":{"p":3},"ng":{"g":3}}`
- **2. Mua quyền trông việc nước**
  Người trong phòng có nước đều. Mỗi tháng ngươi nhận một phần lương kèm chìa khóa dài hơn chìa khóa cũ.
  - `cost`: `{"st":13}`
  - `e`: `{"st":20,"hd":{"p":1},"ng":{"g":1}}`
- **3. Bỏ đi**
  Phiến đá được hạ xuống. Mấy chiếc chén trên sân cùng rung.

### Lịch sử và nhánh

```json
{
  "id": "loi_noi_duoi_phien_da",
  "part": "3",
  "waitHours": 720,
  "needs": [],
  "paths": [
    [
      "2:0",
      "2b:0"
    ],
    [
      "2:1",
      "2b:1"
    ]
  ]
}
```

<a id="ch_loi_noi_duoi_phien_da_4"></a>
## Nêm mới của cửa cũ — `ch_loi_noi_duoi_phien_da_4`

- Loại: story; nguồn: Khám phá; chủ đề: Chuyện trong tông; cảm xúc: Lắng dịu.
- Nơi: sơn môn, thành trì.
- Điều kiện: tầng 1, 2, 3, 4; chuỗi loi_noi_duoi_phien_da / phần 4; chờ ≥ 8640 giờ; một lần/kiếp.
- Bối cảnh tác giả: Nhà hội ở Linh Sơn Vạn Lĩnh.
- Vai: `{"b":{"gender":"nam","role":"đệ tử","alignment":"context"},"a":{"gender":"nam","role":"Đệ tử","alignment":"context"},"c":{"gender":"nam","role":"giám luật","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Nếu phòng đã mở công khai, giám luật {$c.ten} mang tới tờ đề nghị bỏ lệ đóng cửa. Nếu ngươi giữ chìa, đệ tử {$b.ten} đem nộp sổ nước, trong đó có cột ghi những đêm chỉ mở cửa bằng tiền.

### Lựa chọn

- **1. Ủng hộ bỏ cửa khóa kín**
  Ngươi phải trả chìa hoặc mất phần tiếng nói còn lại trong nhà luật. Đệ tử {$a.ten} đem cái nêm cũ kê cửa phòng họp.
  - `e`: `{"hd":{"p":3},"ng":{"g":3}}`
- **2. Giữ phòng và buộc có người chứng kiến**
  Người trong phòng luôn được gặp người ngoài, còn {$c.ten} tiếp tục giữ cửa. Lão làm một cái ghế cho người chứng kiến, quay mặt thẳng vào khe.
  - `e`: `{"hd":{"p":1},"ng":{"g":1}}`
- **3. Bỏ đi**
  Ngươi không dự việc quyết định của họ. Khi ra ngoài, ngươi nghe hai bên bắt đầu bàn hạn phạt và người được quyền tới thăm.

### Lịch sử và nhánh

```json
{
  "id": "loi_noi_duoi_phien_da",
  "part": "4",
  "waitHours": 8640,
  "needs": [
    0,
    1
  ],
  "paths": [
    [
      "3:0"
    ],
    [
      "3:1"
    ]
  ]
}
```
