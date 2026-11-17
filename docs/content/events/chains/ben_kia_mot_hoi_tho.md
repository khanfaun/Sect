# content/events/chains/ben_kia_mot_hoi_tho.json

Nguồn chuẩn: `content/events/chains/ben_kia_mot_hoi_tho.json`. Bản đọc tự sinh. Cú pháp: xem [guideline](../../GUIDELINE.md).

<a id="ch_ben_kia_mot_hoi_tho_1"></a>
## Dây kéo ở hai đầu — `ch_ben_kia_mot_hoi_tho_1`

- Loại: story; nguồn: Khám phá; chủ đề: Chuyện hai loài; cảm xúc: Lãng mạn.
- Nơi: biển khơi.
- Điều kiện: tầng 2; chuỗi ben_kia_mot_hoi_tho / phần 1; một lần/kiếp.
- Bối cảnh tác giả: Giàn lặn ở Đông Hải Yêu Vực.
- Vai: `{"a":{"gender":"nu","role":"Nữ thợ lặn","alignment":"context"},"b":{"gender":"nam","role":"ngư nhân","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Nữ thợ lặn {$a.ten} đứng trên giàn, giữ sợi dây có đầu kia nằm trong tay ngư nhân {$b.ten} dưới nước. Hai lần giật là hỏi, một lần là đáp. Nàng muốn xuống gặp hắn, nhưng không đủ tiền mua bùa thở.

### Lựa chọn

- **1. Mua bùa thở giúp nàng xuống gặp**
  Ngươi mua bùa ở trạm lặn. Nàng xuống gặp được hắn, trở lên đúng trước khi bùa hết hiệu lực. Gỡ dây xong, nàng vẫn quay lại nhìn mặt nước.
  - `cost`: `{"st":16}`
  - `e`: `{"karma":4,"an":["a","dây kéo ở hai đầu"]}`
- **2. Mua chỗ trên giàn để xuống trước**
  Ngươi tới được mạch khí đang mở. Hai người đợi trên và dưới mặt nước, dây nằm ngang qua một vòng phao.
  - `cost`: `{"st":16}`
  - `e`: `{"tv":4}`
- **3. Bỏ đi**
  Dây giật hai lần. Sau đó chỉ còn một nhịp rất nhẹ.

### Lịch sử và nhánh

```json
{
  "id": "ben_kia_mot_hoi_tho",
  "part": "1",
  "waitHours": 0,
  "needs": [],
  "paths": null
}
```

<a id="ch_ben_kia_mot_hoi_tho_2"></a>
## Chén úp giữ khí — `ch_ben_kia_mot_hoi_tho_2`

- Loại: story; nguồn: Khám phá; chủ đề: Chuyện hai loài; cảm xúc: Dịu dàng.
- Nơi: biển khơi.
- Điều kiện: tầng 2, 3, 4; chuỗi ben_kia_mot_hoi_tho / phần 2; chờ ≥ 2160 giờ; một lần/kiếp.
- Bối cảnh tác giả: Buồng đá ở Đông Hải Yêu Vực.
- Vai: `{"a":{"gender":"nu","role":"Nữ thợ lặn","alignment":"context"},"b":{"gender":"nam","role":"Ngư nhân","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Hai người tìm một buồng có túi khí đủ lâu để nói chuyện. Ngư nhân {$b.ten} mang xuống hai cái chén, một chiếc úp để giữ chút khí trên bờ.

### Lựa chọn

- **1. Gia cố vòm buồng bằng pháp lực**
  Ngươi dùng pháp lực gia cố vòm, để túi khí không tan theo sóng lớn. Hai người có chỗ gặp nhau lâu hơn một hơi lặn. Nàng nhờ ngươi dạy cách nhìn vết nứt, lần sau sẽ tự kiểm tra trước khi xuống.
  - `cost`: `{"mp":"20%"}`
  - `e`: `{"karma":4}`
- **2. Đổi giờ dùng buồng lấy công dẫn đường**
  Họ chỉ ngươi lối đi sâu. Khi ngươi tới buồng, trên tường còn dấu hai chỗ từng treo áo.
  - `e`: `{"tv":3}`
- **3. Bỏ đi**
  Nữ thợ lặn {$a.ten} nhấc chén lên, nghe phần khí bên trong thoát ra.

### Lịch sử và nhánh

```json
{
  "id": "ben_kia_mot_hoi_tho",
  "part": "2",
  "waitHours": 2160,
  "needs": [
    0
  ],
  "paths": null
}
```

<a id="ch_ben_kia_mot_hoi_tho_2b"></a>
## Vòng phao bỏ trống — `ch_ben_kia_mot_hoi_tho_2b`

- Loại: story; nguồn: Khám phá; chủ đề: Chuyện hai loài; cảm xúc: Day dứt.
- Nơi: biển khơi.
- Điều kiện: tầng 2, 3, 4; chuỗi ben_kia_mot_hoi_tho / phần 2b; chờ ≥ 2160 giờ; một lần/kiếp.
- Bối cảnh tác giả: Bãi phao ở Đông Hải Yêu Vực.
- Vai: `{"a":{"gender":"nu","role":"Nữ thợ lặn","alignment":"context"},"b":{"gender":"nam","role":"ngư nhân","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Giàn đã mục. Nữ thợ lặn {$a.ten} đem vòng phao lên bãi, trên dây ngư nhân {$b.ten} buộc một nút nàng chưa kịp tháo.

### Lựa chọn

- **1. Tìm chỗ neo cho hai người gặp lại**
  Ngươi trả tiền thuê thuyền, đưa nàng tìm một mỏm đá kín gió, mất trọn ngày dò đường. Người dưới nước nhận ra sợi dây thả xuống, bơi lên đón. Cả hai chọn chỗ ấy làm nơi gặp mới.
  - `cost`: `{"st":16}`
  - `e`: `{"karma":4,"h":24,"an":["a","vòng phao bỏ trống"]}`
- **2. Mua vòng phao lấy gỗ nhẹ**
  Nàng đủ tiền thuê giàn khác một lần. Nút dây còn lại vướng vào tay ngươi lúc cưa gỗ.
  - `cost`: `{"st":16}`
  - `e`: `{"karma":2}`
- **3. Bỏ đi**
  Nàng quấn dây quanh vòng. Đến nút ấy thì dừng.

### Lịch sử và nhánh

```json
{
  "id": "ben_kia_mot_hoi_tho",
  "part": "2b",
  "waitHours": 2160,
  "needs": [
    1
  ],
  "paths": null
}
```

<a id="ch_ben_kia_mot_hoi_tho_3"></a>
## Nước dồn qua trần thấp — `ch_ben_kia_mot_hoi_tho_3`

- Loại: story; nguồn: Khám phá; chủ đề: Hai loài nương nhau; cảm xúc: Căng thẳng.
- Nơi: biển khơi.
- Điều kiện: tầng 2, 3, 4; chuỗi ben_kia_mot_hoi_tho / phần 3; chờ ≥ 4320 giờ; một lần/kiếp.
- Bối cảnh tác giả: Hốc trú ở Đông Hải Yêu Vực.
- Vai: `{"a":{"gender":"nu","role":"Nữ thợ lặn","alignment":"context"},"b":{"gender":"nam","role":"story_person","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Triều lớn ép một nhóm người vào hốc đá giữa biển. Nếu ngươi từng gia cố buồng hoặc tìm lại chỗ neo, đôi bạn đã thuộc lối thoát quanh vòm. Nếu chỗ gặp từng đổi lấy quyền dùng riêng hoặc bị bán đi, họ phải dò lại đường giữa dòng nước đục. Nước lên gần sát trần. Nữ thợ lặn {$a.ten} buộc đầu dây vào đá, gọi mọi người xếp hàng.

### Lựa chọn

- **1. Căng dây dẫn cả nhóm ra ngoài**
  Ngươi cùng nàng kéo dây từ hốc tới mỏm đá. Ngư nhân dẫn từng người bám dây ra khỏi nước, ngươi giữ đầu trong tới lượt cuối. Không còn ai mắc lại.
  - `e`: `{"karma":4}`
- **2. Giữ túi khí để chờ cứu từ bờ**
  Ngươi dùng pháp lực giữ túi khí, để người biết bơi ra bờ gọi thuyền. Tới khi cứu được người cuối, ngươi kiệt khí, phải nhờ đôi bạn dìu lên. Họ đếm lại đủ người rồi mới rời đi.
  - `cost`: `{"mp":"20%"}`
  - `e`: `{"karma":2}`
- **3. Bỏ đi**
  Trước khi tiếng người bị nước lấp, dây giật một lần.

### Lịch sử và nhánh

```json
{
  "id": "ben_kia_mot_hoi_tho",
  "part": "3",
  "waitHours": 4320,
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

<a id="ch_ben_kia_mot_hoi_tho_4"></a>
## Mặt ghế luôn ướt — `ch_ben_kia_mot_hoi_tho_4`

- Loại: story; nguồn: Khám phá; chủ đề: Chuyện hai loài; cảm xúc: Ấm áp.
- Nơi: thành trì, thôn trấn.
- Điều kiện: tầng 2, 3, 4; chuỗi ben_kia_mot_hoi_tho / phần 4; chờ ≥ 8640 giờ; một lần/kiếp.
- Bối cảnh tác giả: Nhà chờ ở Đông Hải Yêu Vực.
- Vai: `{"a":{"gender":"nu","role":"story_person","alignment":"context"},"b":{"gender":"nam","role":"story_person","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Nếu nhóm thoát qua dây, họ mang thừng dựng nhà chờ. Nếu từng đợi người cứu, họ xây thêm một vòm nổi, dưới vòm đặt ghế vừa chìm nửa mặt.

### Lựa chọn

- **1. Góp bùa cho người đi ngang dùng chung**
  Ngươi mua bùa thở mới để người qua bến dùng chung. Hai người ngồi ở ghế nửa chìm, mỗi người đặt một cái chén.
  - `cost`: `{"st":16}`
  - `e`: `{"karma":4}`
- **2. Nhận quyền cho thuê nhà chờ**
  Ngươi có linh thạch và trả công giữ nhà. Một nửa ghế vẫn được chừa cho người đến từ dưới nước.
  - `e`: `{"st":22}`
- **3. Bỏ đi**
  Đôi bạn gọi ngươi ghé nghỉ lúc quay về. Nàng gõ hai lần xuống bậc ngập nước, hắn nổi lên chào rồi cùng cười vì ngươi vẫn chưa thuộc hiệu dây.

### Lịch sử và nhánh

```json
{
  "id": "ben_kia_mot_hoi_tho",
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
