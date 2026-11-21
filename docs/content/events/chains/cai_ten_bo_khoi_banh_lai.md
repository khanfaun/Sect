# content/events/chains/cai_ten_bo_khoi_banh_lai.json

Nguồn chuẩn: `content/events/chains/cai_ten_bo_khoi_banh_lai.json`. Bản đọc tự sinh. Cú pháp: xem [guideline](../../GUIDELINE.md).

<a id="ch_cai_ten_bo_khoi_banh_lai_1"></a>
## Đinh giữ tên — `ch_cai_ten_bo_khoi_banh_lai_1`

- Loại: story; nguồn: Khám phá; chủ đề: Chuyện hải tặc; cảm xúc: Căng thẳng.
- Nơi: thành trì, thôn trấn.
- Điều kiện: tầng 2; chuỗi cai_ten_bo_khoi_banh_lai / phần 1; một lần/kiếp.
- Bối cảnh tác giả: Xưởng tháo tàu ở Đông Hải Yêu Vực.
- Vai: `{"a":{"gender":"nam","role":"cựu hải tặc","alignment":"context"},"b":{"gender":"nam","role":"người đòi nợ","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Tàu hải tặc đã đầu hàng đang được tháo bán. Cựu hải tặc {$a.ten} gỡ tấm tên người cầm lái khỏi bánh lái, đúng lúc người đòi nợ {$b.ten} tới tìm kẻ gây ra vụ mất tàu năm trước. Hắn nắm tấm gỗ, chưa biết nên giấu hay đưa ra.

### Lựa chọn

- **1. Giữ người lại để nghe hết chuyện**
  Ngươi bảo lãnh cho {$a.ten}. Hắn đặt tấm tên úp xuống, chỗ cạnh gỗ còn rỉ nhựa.
  - `e`: `{"hd":{"p":3},"ng":{"g":3},"an":["a","đinh giữ tên"]}`
- **2. Giao tấm tên đổi tiền treo**
  Ngươi lấy bạc và hắn bị giữ. Bánh lái vẫn quay được, hở đúng một lỗ đinh.
  - `e`: `{"st":22,"deed":"lua_loi","oan":["a","đinh giữ tên"]}`
- **3. Bỏ đi**
  Tấm tên bị quăng vào đống gỗ tháo, mặt chữ quay lên.

### Lịch sử và nhánh

```json
{
  "id": "cai_ten_bo_khoi_banh_lai",
  "part": "1",
  "waitHours": 0,
  "needs": [],
  "paths": null
}
```

<a id="ch_cai_ten_bo_khoi_banh_lai_2"></a>
## Những lần đổi tay — `ch_cai_ten_bo_khoi_banh_lai_2`

- Loại: story; nguồn: Khám phá; chủ đề: Trả nợ hải chiến; cảm xúc: Bi thương.
- Nơi: thành trì, thôn trấn.
- Điều kiện: tầng 2, 3, 4; chuỗi cai_ten_bo_khoi_banh_lai / phần 2; chờ ≥ 2160 giờ; một lần/kiếp.
- Bối cảnh tác giả: Nhà hội ở Đông Hải Yêu Vực.
- Vai: `{"a":{"gender":"nam","role":"Cựu hải tặc","alignment":"context"},"b":{"gender":"nam","role":"Người đòi nợ","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Cựu hải tặc {$a.ten} kể mình từng giữ lái cho thuyền chạy thoát, rồi quay lại chở người bị bỏ giữa nước. Người đòi nợ {$b.ten} nhận ra một chuyến trong lời hắn, ngón tay dừng đúng tên cha mình.

### Lựa chọn

- **1. Giúp ghi riêng từng chuyến đã chở người**
  Ngươi theo hắn tìm người làm chứng cho từng chuyến đã cứu nạn. Có chuyến được xác nhận, có chuyến không ai nhớ. Người đòi nợ đồng ý ghi riêng công cứu người, nhưng nói việc cướp tàu vẫn phải xét đủ.
  - `e`: `{"hd":{"p":3},"ng":{"g":3},"an":["a","những lần đổi tay"],"h":24}`
- **2. Đòi hắn làm công lái thuyền để trả nợ**
  Người mất tàu có phần công, ngươi có người dẫn lối. Hắn bọc bánh lái bằng vải để khỏi thấy lỗ đinh.
  - `e`: `{"hd":{"t":1}}`
- **3. Bỏ đi**
  {$b.ten} xin đọc lại đúng một dòng.

### Lịch sử và nhánh

```json
{
  "id": "cai_ten_bo_khoi_banh_lai",
  "part": "2",
  "waitHours": 2160,
  "needs": [
    0
  ],
  "paths": null
}
```

<a id="ch_cai_ten_bo_khoi_banh_lai_2b"></a>
## Chỗ tay bấu vào cũi — `ch_cai_ten_bo_khoi_banh_lai_2b`

- Loại: story; nguồn: Khám phá; chủ đề: Chuyện người bị giữ; cảm xúc: Day dứt.
- Nơi: biển khơi.
- Điều kiện: tầng 2, 3, 4; chuỗi cai_ten_bo_khoi_banh_lai / phần 2b; chờ ≥ 2160 giờ; một lần/kiếp.
- Bối cảnh tác giả: Bè giam ở Đông Hải Yêu Vực.
- Vai: `{"a":{"gender":"nam","role":"Cựu hải tặc","alignment":"context"},"b":{"gender":"nam","role":"Người đòi nợ","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Người đòi nợ {$b.ten} đem cháo đến bè vì nhận ra cựu hải tặc {$a.ten} từng vớt em mình. {$a.ten} đứng ở chỗ thanh cũi đã nhẵn bằng lòng bàn tay.

### Lựa chọn

- **1. Dùng tiền treo xin cho hắn ra làm chứng**
  Ngươi bỏ tiền bảo lãnh, xin cho hắn ra đối chứng và nhận trách nhiệm đưa trở lại nếu việc chưa rõ. Người đòi nợ dẫn tới gặp người em từng được hắn cứu. Hắn nghe xong mới biết người ấy còn sống.
  - `cost`: `{"st":16}`
  - `e`: `{"hd":{"p":3},"ng":{"g":3},"an":["a","chỗ tay bấu vào cũi"]}`
- **2. Xin cho hắn trả nợ bằng công thay vì giam**
  Hắn nhận việc lái những chuyến nguy hiểm. {$b.ten} bỏ thêm một bát cháo vào thúng khi tiễn.
  - `e`: `{"hd":{"p":3},"ng":{"g":3}}`
- **3. Bỏ đi**
  Sóng đánh bè nghiêng. Hai người cùng đưa tay giữ bát.

### Lịch sử và nhánh

```json
{
  "id": "cai_ten_bo_khoi_banh_lai",
  "part": "2b",
  "waitHours": 2160,
  "needs": [
    1
  ],
  "paths": null
}
```

<a id="ch_cai_ten_bo_khoi_banh_lai_3"></a>
## Thuyền trở đầu giữa bãi cạn — `ch_cai_ten_bo_khoi_banh_lai_3`

- Loại: story; nguồn: Khám phá; chủ đề: Cứu nạn; cảm xúc: Căng thẳng.
- Nơi: biển khơi.
- Điều kiện: tầng 2, 3, 4; chuỗi cai_ten_bo_khoi_banh_lai / phần 3; chờ ≥ 4320 giờ; một lần/kiếp.
- Bối cảnh tác giả: Bãi cạn ở Đông Hải Yêu Vực.
- Vai: `{"a":{"gender":"nam","role":"story_person","alignment":"context"},"b":{"gender":"nam","role":"story_person","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Một tàu chở khách mắc cạn ngoài cảng, phải bỏ hàng mới có thể đón người từ thuyền nhỏ đang vỡ. Nếu cựu hải tặc đã được ra làm chứng, người mất tàu chịu theo hắn đi cứu nạn. Nếu hắn còn làm công trả nợ, người đòi nợ đem lệnh tới để cho hắn rời chuyến hàng đang nhận. Ngươi có mặt trên tàu cứu hộ khi hắn xin quyết ngay việc cắt hàng.

### Lựa chọn

- **1. Ứng tiền đền hàng, cho cắt dây cứu người**
  Ngươi nhận ứng tiền đền phần hàng phải bỏ. Hắn cắt dây, quay mạn đón từng người từ thuyền nhỏ. Người lên cuối hỏi ai mất hàng, hắn bảo cứ lên cho đủ rồi tính.
  - `cost`: `{"st":16}`
  - `e`: `{"deed":"cuu_nguoi"}`
- **2. Cứu tàu bằng cách bỏ lại thuyền nhỏ**
  Hàng giữ được, người đi thuyền nhỏ được vớt sau một đêm lạnh. Trên mạn tàu còn hai vết móng.
  - `e`: `{"hd":{"t":1}}`
- **3. Bỏ đi**
  Tàu quay được nửa vòng rồi mắc lại, mũi hướng về bờ.

### Lịch sử và nhánh

```json
{
  "id": "cai_ten_bo_khoi_banh_lai",
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

<a id="ch_cai_ten_bo_khoi_banh_lai_4"></a>
## Hàng tên trên mặt gỗ — `ch_cai_ten_bo_khoi_banh_lai_4`

- Loại: story; nguồn: Khám phá; chủ đề: Trách nhiệm và ân oán; cảm xúc: Lắng dịu.
- Nơi: thành trì, thôn trấn.
- Điều kiện: tầng 2, 3, 4; chuỗi cai_ten_bo_khoi_banh_lai / phần 4; chờ ≥ 8640 giờ; một lần/kiếp.
- Bối cảnh tác giả: Xưởng bánh lái ở Đông Hải Yêu Vực.
- Vai: `{"a":{"gender":"nam","role":"Cựu hải tặc","alignment":"context"},"b":{"gender":"nam","role":"người đòi nợ","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Nếu người được đưa qua trước, họ mang đến một tấm gỗ góp làm bánh lái. Nếu hàng từng được giữ, người đi thuyền nhỏ đem tới những mảnh ván đã vớt được và đặt chúng dựa ngoài cửa.

### Lựa chọn

- **1. Khắc cả tên người cứu lẫn người chịu thiệt**
  Ngươi chịu phần tiền đền hoặc mất phần thưởng còn lại. Cựu hải tặc {$a.ten} khoan lỗ đinh đầu tiên ở mặt trong.
  - `cost`: `{"st":16}`
  - `e`: `{"hd":{"p":3},"ng":{"g":3}}`
- **2. Mua bánh lái và thuê hắn đi chuyến mới**
  Ngươi có một tay lái giỏi. Trước khi rời bờ, hắn nhờ người đòi nợ {$b.ten} kiểm lại chỗ thuyền nhỏ đã được buộc.
  - `cost`: `{"st":16}`
- **3. Bỏ đi**
  Ngươi từ biệt họ. Cựu hải tặc đặt tấm tên cũ bên bánh lái mới, để ai thuê cũng biết mình từng là ai.

### Lịch sử và nhánh

```json
{
  "id": "cai_ten_bo_khoi_banh_lai",
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
