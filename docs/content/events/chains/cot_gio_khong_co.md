# content/events/chains/cot_gio_khong_co.json

Nguồn chuẩn: `content/events/chains/cot_gio_khong_co.json`. Bản đọc tự sinh. Cú pháp: xem [guideline](../../GUIDELINE.md).

<a id="ch_cot_gio_khong_co_1"></a>
## Dây cờ đứt — `ch_cot_gio_khong_co_1`

- Loại: story; nguồn: Khám phá; chủ đề: Việc sơn môn; cảm xúc: Căng thẳng.
- Nơi: núi non, sơn môn.
- Điều kiện: tầng 1; chuỗi cot_gio_khong_co / phần 1; một lần/kiếp.
- Bối cảnh tác giả: Trụ gió ở Linh Sơn Vạn Lĩnh.
- Vai: `{"a":{"gender":"nam","role":"Trưởng lão","alignment":"context"},"b":{"gender":"nam","role":"Đệ tử","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Trưởng lão {$a.ten} cần lấy dây giữ cầu để treo cờ đón khách. Đệ tử {$b.ten} chỉ vết sờn giữa dây, nơi sợi trong đã lộ ra màu xám.

### Lựa chọn

- **1. Góp tiền mua dây treo cờ riêng**
  Ngươi trả tiền mua dây ở kho, yêu cầu giữ nguyên dây cầu. Đệ tử thử neo xong mới treo cờ, rồi nhờ quản sự ghi lại: đồ giữ cầu không được lấy dùng việc lễ.
  - `cost`: `{"st":13}`
  - `e`: `{"hd":{"p":3},"ng":{"g":3}}`
- **2. Cho lấy dây cầu để được vào đoàn đón khách**
  Ngươi nhận linh thạch. {$b.ten} bện dây rơm thay chỗ trống, giấu đầu sợi dưới tay vịn.
  - `e`: `{"st":16,"deed":"lua_loi"}`
- **3. Bỏ đi**
  Lá cờ bay lên, phía dưới vọng một tiếng dây kéo qua đá.

### Lịch sử và nhánh

```json
{
  "id": "cot_gio_khong_co",
  "part": "1",
  "waitHours": 0,
  "needs": [],
  "paths": null
}
```

<a id="ch_cot_gio_khong_co_2"></a>
## Cờ hong dưới đất — `ch_cot_gio_khong_co_2`

- Loại: story; nguồn: Khám phá; chủ đề: Chuyện trong tông; cảm xúc: Ấm áp.
- Nơi: núi non, sơn môn.
- Điều kiện: tầng 1, 2, 3, 4; chuỗi cot_gio_khong_co / phần 2; chờ ≥ 504 giờ; một lần/kiếp.
- Bối cảnh tác giả: Bãi cất cờ ở Linh Sơn Vạn Lĩnh.
- Vai: `{"a":{"gender":"nam","role":"story_person","alignment":"context"},"b":{"gender":"nam","role":"Đệ tử","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Lễ đón khách đã xong. Đệ tử {$b.ten} thu dây ngươi mua, hỏi có thể để lại một phần làm vòng buộc tay vịn cầu không. Hắn chỉ đoạn cầu trơn, nơi người gánh nước thường phải vịn vào vách.

### Lựa chọn

- **1. Cho hắn giữ phần dây cứng**
  Ngươi cho hắn giữ phần dây còn dùng được. Hắn buộc thêm tay vịn, gọi người gánh nước đi thử ngay rồi mới siết nút.
  - `e`: `{"hd":{"p":3},"ng":{"g":3}}`
- **2. Xin nhận lại tiền mua dây theo lệ tông môn**
  Ngươi nhận lại khoản đã ứng. Đệ tử đem dây vào kho, ghi rõ nguồn để lần sau xin dùng không phải mua thêm.
  - `e`: `{"st":13}`
- **3. Bỏ đi**
  Ngươi bảo hắn trình người coi cầu rồi quyết. Hắn cuộn dây lại, mang theo bản ghi việc sửa cầu tới nhà quản sự.

### Lịch sử và nhánh

```json
{
  "id": "cot_gio_khong_co",
  "part": "2",
  "waitHours": 504,
  "needs": [
    0
  ],
  "paths": null
}
```

<a id="ch_cot_gio_khong_co_2b"></a>
## Sợi rơm ngậm nước — `ch_cot_gio_khong_co_2b`

- Loại: story; nguồn: Khám phá; chủ đề: Cầu núi; cảm xúc: Xót xa.
- Nơi: núi non, sơn môn.
- Điều kiện: tầng 1, 2, 3, 4; chuỗi cot_gio_khong_co / phần 2b; chờ ≥ 504 giờ; một lần/kiếp.
- Bối cảnh tác giả: Lối qua suối ở Linh Sơn Vạn Lĩnh.
- Vai: `{"a":{"gender":"nam","role":"story_person","alignment":"context"},"b":{"gender":"nam","role":"Đệ tử","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Dây rơm no mưa và võng xuống. Đệ tử {$b.ten} ngâm chân dưới suối để người qua có chỗ đặt tay lên vai.

### Lựa chọn

- **1. Mua dây mới bằng tiền đã nhận**
  Ngươi dùng khoản nhận từ lễ đón khách mua dây mới. Đệ tử lên bờ, cùng thợ thay xong mới cho mở cầu. Hắn ngồi bóp đôi chân ngâm nước lâu, bảo lần sau sẽ nhất quyết không tháo dây.
  - `cost`: `{"st":13}`
  - `e`: `{"hd":{"p":3},"ng":{"g":3}}`
- **2. Mở đường vòng thu phí**
  Người có tiền qua trên đường khô. {$b.ten} ở lại dưới suối với những người cầm túi rỗng.
  - `e`: `{"st":18,"deed":"lua_loi"}`
- **3. Bỏ đi**
  Hắn hỏi người sau còn bao nhiêu người. Người ấy cúi nhìn nước, đếm bằng tay.

### Lịch sử và nhánh

```json
{
  "id": "cot_gio_khong_co",
  "part": "2b",
  "waitHours": 504,
  "needs": [
    1
  ],
  "paths": null
}
```

<a id="ch_cot_gio_khong_co_3"></a>
## Gió đổi mặt vách — `ch_cot_gio_khong_co_3`

- Loại: story; nguồn: Khám phá; chủ đề: Thiên tai; cảm xúc: Căng thẳng.
- Nơi: núi non, sơn môn.
- Điều kiện: tầng 1, 2, 3, 4; chuỗi cot_gio_khong_co / phần 3; chờ ≥ 4320 giờ; một lần/kiếp.
- Bối cảnh tác giả: Bãi đá ở Linh Sơn Vạn Lĩnh.
- Vai: `{"a":{"gender":"nam","role":"story_person","alignment":"context"},"b":{"gender":"nam","role":"đệ tử","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Trụ cờ bị gió bẻ nghiêng, dây chằng của nó mắc vào neo cầu. Nếu ngươi từng để dây lại sửa cầu hoặc mua dây mới, đệ tử {$b.ten} đã giữ được tay vịn để đưa khách lên bờ. Nếu dây bị cất kho hoặc chỉ có đường vòng thu phí, người chưa qua được đang dồn ở đầu cầu. Trụ sắp đổ; giữ trụ thì phải bỏ lối cầu, cắt dây cờ thì cứu được neo.

### Lựa chọn

- **1. Cắt dây cờ, neo lại cầu**
  Ngươi cắt dây chằng, cho trụ cờ đổ về bãi trống rồi dùng đoạn dây còn chắc neo lại cầu. Người qua hết, quản sự đòi ngươi chịu phạt vì hỏng đồ lễ. Đệ tử đứng ra kể rõ vì sao phải cắt.
  - `e`: `{"hd":{"p":3},"ng":{"g":3}}`
- **2. Đỡ trụ cờ và gọi người đi vòng**
  Ngươi được thưởng. Người qua đường vòng bỏ lại những gánh quá nặng, ngay dưới bóng lá cờ còn nguyên.
  - `e`: `{"st":16,"deed":"lua_loi"}`
- **3. Bỏ đi**
  Trụ nghiêng về phía cầu. Lá cờ chạm nước trước.

### Lịch sử và nhánh

```json
{
  "id": "cot_gio_khong_co",
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

<a id="ch_cot_gio_khong_co_4"></a>
## Cột phơi dây — `ch_cot_gio_khong_co_4`

- Loại: story; nguồn: Khám phá; chủ đề: Lệ sơn môn; cảm xúc: Lắng dịu.
- Nơi: sơn môn, thành trì.
- Điều kiện: tầng 1, 2, 3, 4; chuỗi cot_gio_khong_co / phần 4; chờ ≥ 8640 giờ; một lần/kiếp.
- Bối cảnh tác giả: Sân dựng trụ ở Linh Sơn Vạn Lĩnh.
- Vai: `{"a":{"gender":"nam","role":"trưởng lão","alignment":"context"},"b":{"gender":"nam","role":"đệ tử","alignment":"context"}}`.
- Xuất xứ: `8b9c479` / `src/game/data/03-su_kien-du-lieu.js`.

Nếu cờ từng cứu cầu, dân đem vải tới vá lại. Nếu trụ từng được cứu, trưởng lão {$a.ten} mang lá cờ nguyên tới, còn đệ tử {$b.ten} đem dây cầu đã tuột.

### Lựa chọn

- **1. Dành trụ mới để phơi dây và vải cầu**
  Ngươi đề nghị chuyển cột mới sang sân phơi dây cầu, chịu bị gạt khỏi lễ đón khách. Người coi cầu nhận việc hong và kiểm dây mỗi tuần. Đệ tử xin học cùng, nói mình đã biết một sợi dây hỏng có thể làm khổ bao nhiêu người.
  - `e`: `{"hd":{"p":3},"ng":{"g":3}}`
- **2. Treo lại cờ và đặt quỹ sửa cầu**
  Ngươi đóng một phần bạc và có tên trong lễ. Dưới lá cờ, người đi qua đặt những đồng nhỏ lên một phiến đá.
  - `cost`: `{"st":13}`
  - `e`: `{"hd":{"p":1},"ng":{"g":1}}`
- **3. Bỏ đi**
  Ngươi để người trong tông tự bàn chuyện dựng trụ. Trước khi đi, ngươi thấy đệ tử đã đem sổ sửa cầu tới, không đứng ngoài cửa đợi nữa.

### Lịch sử và nhánh

```json
{
  "id": "cot_gio_khong_co",
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
