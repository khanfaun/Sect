# content/events/chains/le_do_nuoc.json

Nguồn chuẩn: `content/events/chains/le_do_nuoc.json`. Bản đọc tự sinh. Cú pháp: xem [guideline](../../GUIDELINE.md).

<a id="ch_le_do_nuoc_1"></a>
## Vạch triều bị dời — `ch_le_do_nuoc_1`

- Loại: story; nguồn: Khám phá; chủ đề: Thuế bến; cảm xúc: Phẫn nộ.
- Nơi: biển khơi.
- Điều kiện: tầng 2; chuỗi le_do_nuoc / phần 1; một lần/kiếp.
- Bối cảnh tác giả: Cọc nước ở Đông Hải Yêu Vực.
- Vai: `{"a":{"gender":"nam","role":"Chủ bến","alignment":"context"},"b":{"gender":"nam","role":"Người đo nước","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Chủ bến {$a.ten} dời vạch triều để thu tiền neo thêm một canh. Người đo nước {$b.ten} cạo thử mặt cọc, tìm thấy đường mực cũ dưới một lớp hà mỏng.

### Lựa chọn

- **1. Ghi lại vạch cũ và đứng ra làm chứng**
  Ngươi chép vạch cũ lên ván đo của bến, ký tên làm chứng. Chủ bến giữ ngươi lại xét hỏi hết buổi. Người đo nước đem bản chép khác cho thuyền ngoài đảo, trước khi vạch bị cạo mất.
  - `e`: `{"hd":{"p":3},"ng":{"g":3},"h":24}`
- **2. Đổi im lặng lấy quyền neo rẻ**
  Ngươi bớt được tiền neo. {$b.ten} phải đục đi đường vạch, mùn gỗ lẫn vào lớp hà.
  - `e`: `{"st":22,"deed":"lua_loi"}`
- **3. Bỏ đi**
  Một người từ xa đặt dây theo vạch mới rồi đứng đợi nước không lên.

### Lịch sử và nhánh

```json
{
  "id": "le_do_nuoc",
  "part": "1",
  "waitHours": 0,
  "needs": [],
  "paths": null
}
```

<a id="ch_le_do_nuoc_2"></a>
## Giấy phơi theo sóng — `ch_le_do_nuoc_2`

- Loại: story; nguồn: Khám phá; chủ đề: Chuyện bến; cảm xúc: Căng thẳng.
- Nơi: biển khơi.
- Điều kiện: tầng 2, 3, 4; chuỗi le_do_nuoc / phần 2; chờ ≥ 120 giờ; một lần/kiếp.
- Bối cảnh tác giả: Sân kê thuyền ở Đông Hải Yêu Vực.
- Vai: `{"a":{"gender":"nam","role":"story_person","alignment":"context"},"b":{"gender":"nam","role":"người đo nước","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Người đo nước {$b.ten} chép vạch triều lên nhiều mảnh giấy. Gió thổi từng tờ về phía bến, hắn lấy vỏ sò chặn những tờ còn đọc rõ.

### Lựa chọn

- **1. Góp người canh mực nước**
  Ngươi ở lại cùng người đo nước canh đủ một con triều, lỡ chuyến thuyền thuận. Số đo của nhiều người trùng nhau, đủ để đối lại lệ thu tiền. Họ rủ nhau đem giấy tới nhà chủ bến vào sáng mai.
  - `cost`: `{"st":16}`
  - `e`: `{"hd":{"p":3},"ng":{"g":3},"h":12}`
- **2. Bán bản đo cho bến đối diện**
  Ngươi có bạc, bến kia dùng giấy để giành khách. Tờ có nét của {$b.ten} được gấp che tên.
  - `e`: `{"st":22,"deed":"lua_loi"}`
- **3. Bỏ đi**
  Hắn đổi vỏ sò lớn hơn, đến lúc nước lên mới nhớ nhấc giấy.

### Lịch sử và nhánh

```json
{
  "id": "le_do_nuoc",
  "part": "2",
  "waitHours": 120,
  "needs": [
    0
  ],
  "paths": null
}
```

<a id="ch_le_do_nuoc_2b"></a>
## Sợi dây neo ngắn — `ch_le_do_nuoc_2b`

- Loại: story; nguồn: Khám phá; chủ đề: Thuế bến; cảm xúc: Day dứt.
- Nơi: biển khơi, sông hồ.
- Điều kiện: tầng 2, 3, 4; chuỗi le_do_nuoc / phần 2b; chờ ≥ 120 giờ; một lần/kiếp.
- Bối cảnh tác giả: Bến cá ở Đông Hải Yêu Vực.
- Vai: `{"a":{"gender":"nam","role":"story_person","alignment":"context"},"b":{"gender":"nam","role":"Người đo nước","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Người đo nước {$b.ten} bị đuổi sau khi vạch cũ bị xóa. Lão đang giúp dân bến nhỏ nối dây: chủ bến đã bán dây theo mốc sai, tới kỳ triều cao thuyền bị kéo nghiêng. Lão giữ được một vạch đo đúng trên cán dao.

### Lựa chọn

- **1. Trả phần tiền đã được bớt cho người neo thuyền**
  Ngươi trả lại số tiền neo đã được bớt, giúp họ mua dây đủ dài. Người đo nước tự thử từng sợi trước con triều kế tiếp. Một người hỏi sao trước đây lão không nói, lão đáp rằng đã nói nhưng không ai chịu nghe.
  - `cost`: `{"st":16}`
  - `e`: `{"hd":{"p":3},"ng":{"g":3}}`
- **2. Mua dây ngắn bán cho bến lớn**
  Ngươi có lời mỗi lượt đổi dây. Bến cá treo phần dây thừa lên cho mượn.
  - `cost`: `{"st":16}`
  - `e`: `{"st":38,"deed":"lua_loi"}`
  - `accounting`: `{"mode":"buy-and-sell","capital":16,"profit":22}`
- **3. Bỏ đi**
  {$b.ten} bện hai đầu thừa với nhau, nút nối to bằng đốt ngón tay.

### Lịch sử và nhánh

```json
{
  "id": "le_do_nuoc",
  "part": "2b",
  "waitHours": 120,
  "needs": [
    1
  ],
  "paths": null
}
```

<a id="ch_le_do_nuoc_3"></a>
## Cọc nước ra giữa chợ — `ch_le_do_nuoc_3`

- Loại: story; nguồn: Khám phá; chủ đề: Tranh lệ cảng; cảm xúc: Phẫn nộ.
- Nơi: thành trì, thôn trấn.
- Điều kiện: tầng 2, 3, 4; chuỗi le_do_nuoc / phần 3; chờ ≥ 2160 giờ; một lần/kiếp.
- Bối cảnh tác giả: Chợ nổi ở Đông Hải Yêu Vực.
- Vai: `{"a":{"gender":"nam","role":"Chủ bến","alignment":"context"},"b":{"gender":"nam","role":"story_person","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Chủ bến {$a.ten} nhổ cọc nước đem bán cho thuyền ngoại đảo. Nếu ngươi từng góp tiền hoặc góp người, dân đem vạch đo của họ ra. Nếu ngươi từng bán giấy hoặc bán dây, chủ bến đối diện gọi giá trước.

### Lựa chọn

- **1. Mua cọc cho người ở cả hai bến cùng đo**
  Ngươi mua lại cọc làm mốc chung, nhờ người đo nước kiểm tra từ đầu. Cả hai bến cử người ghi số đo mỗi ngày. Chủ bến không còn được tự dời vạch rồi tính thêm tiền.
  - `cost`: `{"st":16}`
  - `e`: `{"hd":{"p":3},"ng":{"g":3}}`
- **2. Bán lại quyền dùng vạch**
  Ngươi lấy được tiền của hai bến. Một đứa bé đặt dấu riêng bằng than trên cọc, ngay chỗ ngập nước.
  - `e`: `{"st":22,"deed":"lua_loi"}`
- **3. Bỏ đi**
  Cọc được nhấc lên. Một đoạn hà rơi đúng chỗ từng ghi giờ nước.

### Lịch sử và nhánh

```json
{
  "id": "le_do_nuoc",
  "part": "3",
  "waitHours": 2160,
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

<a id="ch_le_do_nuoc_4"></a>
## Dấu vôi ở cửa biển — `ch_le_do_nuoc_4`

- Loại: story; nguồn: Khám phá; chủ đề: Chuyện bến; cảm xúc: Lắng dịu.
- Nơi: biển khơi.
- Điều kiện: tầng 2, 3, 4; chuỗi le_do_nuoc / phần 4; chờ ≥ 8640 giờ; một lần/kiếp.
- Bối cảnh tác giả: Cửa biển ở Đông Hải Yêu Vực.
- Vai: `{"a":{"gender":"nam","role":"Chủ bến","alignment":"context"},"b":{"gender":"nam","role":"Người đo nước","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Nếu vạch thuộc cả hai bến, thuyền mới đến dùng chung một lệ. Nếu vạch từng bị bán, thuyền nghèo buộc xa bến, đánh dấu nước bằng vôi trên mái đá.

### Lựa chọn

- **1. Chuyển vạch lên vách đá ai cũng nhìn được**
  Chủ bến {$a.ten} cắt phần lợi của ngươi hoặc đòi phí dựng mốc. Người đo nước {$b.ten} khắc đủ sâu để vôi phai vẫn thấy đường.
  - `e`: `{"hd":{"p":3},"ng":{"g":3}}`
- **2. Dùng tiền neo dựng một cầu riêng**
  Ngươi giữ mối thu phí và có chỗ trú cho thuyền khách. Người đo nước {$b.ten} để lại một thang mộc cho thuyền nhỏ tự ghé.
  - `e`: `{"st":22,"hd":{"p":1},"ng":{"g":1}}`
- **3. Bỏ đi**
  Ngươi lên thuyền đi tiếp. Những người ở lại bàn dựng thêm mốc trên đá, để lần sau dù cọc bị nhổ vẫn còn chỗ đối chứng.

### Lịch sử và nhánh

```json
{
  "id": "le_do_nuoc",
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
