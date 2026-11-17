# content/venues/services.json

Nguồn chuẩn: `content/venues/services.json`. Bản đọc tự sinh. Cú pháp: xem [guideline](../../GUIDELINE.md).

<a id="service_tea_nghe"></a>
## Gọi ấm trà, ngồi nghe chuyện — `service_tea_nghe`

- Loại: service; nguồn: Trong quán; chủ đề: Dịch vụ địa điểm; cảm xúc: không gắn nhãn.
- Nơi: thôn trấn, thành trì, chợ phiên tu sĩ / Trà lâu.
- Điều kiện: mọi tầng.
- Bối cảnh tác giả: .
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/core2/07-dot-10-tho-nap.js`.

Biết thêm một nơi và nghe tin đồn; lời truyền miệng được tách khỏi sự thật đã xác nhận.

### Lựa chọn

- **1. Gọi ấm trà, ngồi nghe chuyện**
  Biết thêm một nơi và nghe tin đồn; lời truyền miệng được tách khỏi sự thật đã xác nhận.

### Nối cơ chế

```json
{
  "service": {
    "id": "nghe",
    "h": 1,
    "stoneBase": 0,
    "g": {
      "info": 1
    },
    "req": null,
    "limited": false
  }
}
```

<a id="service_tea_hoi"></a>
## Dúi tiền hỏi tiểu nhị đường đi — `service_tea_hoi`

- Loại: service; nguồn: Trong quán; chủ đề: Dịch vụ địa điểm; cảm xúc: không gắn nhãn.
- Nơi: thôn trấn, thành trì, chợ phiên tu sĩ / Trà lâu.
- Điều kiện: mọi tầng.
- Bối cảnh tác giả: .
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/core2/07-dot-10-tho-nap.js`.

Trả tiền hỏi đường đến hai địa điểm trong vùng.

### Lựa chọn

- **1. Dúi tiền hỏi tiểu nhị đường đi**
  Trả tiền hỏi đường đến hai địa điểm trong vùng.

### Nối cơ chế

```json
{
  "service": {
    "id": "hoi",
    "h": 1,
    "stoneBase": 1,
    "g": {
      "info": 2
    },
    "req": null,
    "limited": false
  }
}
```

<a id="service_tea_co"></a>
## Đánh một ván cờ với khách lạ — `service_tea_co`

- Loại: service; nguồn: Trong quán; chủ đề: Dịch vụ địa điểm; cảm xúc: không gắn nhãn.
- Nơi: thôn trấn, thành trì, chợ phiên tu sĩ / Trà lâu.
- Điều kiện: mọi tầng.
- Bối cảnh tác giả: .
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/core2/07-dot-10-tho-nap.js`.

Chơi cờ giúp tăng lịch luyện và tĩnh tâm; cần ngộ tính.

### Lựa chọn

- **1. Đánh một ván cờ với khách lạ**
  Chơi cờ giúp tăng lịch luyện và tĩnh tâm; cần ngộ tính.

### Nối cơ chế

```json
{
  "service": {
    "id": "co",
    "h": 2,
    "stoneBase": 0,
    "g": {
      "ll": 3,
      "tamma": -2
    },
    "req": [
      "ngo",
      12,
      "Ngộ tính"
    ],
    "limited": false
  }
}
```

<a id="service_tea_tinh"></a>
## Ngồi yên thưởng trà, tĩnh tâm — `service_tea_tinh`

- Loại: service; nguồn: Trong quán; chủ đề: Dịch vụ địa điểm; cảm xúc: không gắn nhãn.
- Nơi: thôn trấn, thành trì, chợ phiên tu sĩ / Trà lâu.
- Điều kiện: mọi tầng.
- Bối cảnh tác giả: .
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/core2/07-dot-10-tho-nap.js`.

Thưởng trà giúp giảm tâm ma.

### Lựa chọn

- **1. Ngồi yên thưởng trà, tĩnh tâm**
  Thưởng trà giúp giảm tâm ma.

### Nối cơ chế

```json
{
  "service": {
    "id": "tinh",
    "h": 2,
    "stoneBase": 1,
    "g": {
      "tamma": -4
    },
    "req": null,
    "limited": false
  }
}
```

<a id="service_inn_phong"></a>
## Thuê phòng thường, ngủ một đêm — `service_inn_phong`

- Loại: service; nguồn: Trong quán; chủ đề: Dịch vụ địa điểm; cảm xúc: không gắn nhãn.
- Nơi: thôn trấn, thành trì, chợ phiên tu sĩ / Khách điếm.
- Điều kiện: mọi tầng.
- Bối cảnh tác giả: .
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/core2/07-dot-10-tho-nap.js`.

Hồi đầy khí huyết và linh lực sau tám giờ nghỉ.

### Lựa chọn

- **1. Thuê phòng thường, ngủ một đêm**
  Hồi đầy khí huyết và linh lực sau tám giờ nghỉ.

### Nối cơ chế

```json
{
  "service": {
    "id": "phong",
    "h": 8,
    "stoneBase": 4,
    "g": {
      "hpFull": true,
      "mpFull": true,
      "tamma": -2
    },
    "req": null,
    "limited": false
  }
}
```

<a id="service_inn_thuong"></a>
## Thuê phòng thượng hạng có tụ linh trận — `service_inn_thuong`

- Loại: service; nguồn: Trong quán; chủ đề: Dịch vụ địa điểm; cảm xúc: không gắn nhãn.
- Nơi: thôn trấn, thành trì, chợ phiên tu sĩ / Khách điếm.
- Điều kiện: mọi tầng.
- Bối cảnh tác giả: .
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/core2/07-dot-10-tho-nap.js`.

Hồi đầy khí huyết và linh lực, giảm tâm ma và nhận chút tu vi.

### Lựa chọn

- **1. Thuê phòng thượng hạng có tụ linh trận**
  Hồi đầy khí huyết và linh lực, giảm tâm ma và nhận chút tu vi.

### Nối cơ chế

```json
{
  "service": {
    "id": "thuong",
    "h": 8,
    "stoneBase": 10,
    "g": {
      "hpFull": true,
      "mpFull": true,
      "tamma": -6,
      "tv": 1
    },
    "req": null,
    "limited": false
  }
}
```

<a id="service_inn_an"></a>
## Ngồi sảnh dưới ăn một bữa — `service_inn_an`

- Loại: service; nguồn: Trong quán; chủ đề: Dịch vụ địa điểm; cảm xúc: không gắn nhãn.
- Nơi: thôn trấn, thành trì, chợ phiên tu sĩ / Khách điếm.
- Điều kiện: mọi tầng.
- Bối cảnh tác giả: .
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/core2/07-dot-10-tho-nap.js`.

Hồi tối đa 15% khí huyết, không vượt mức tối đa.

### Lựa chọn

- **1. Ngồi sảnh dưới ăn một bữa**
  Hồi tối đa 15% khí huyết, không vượt mức tối đa.

### Nối cơ chế

```json
{
  "service": {
    "id": "an",
    "h": 1,
    "stoneBase": 1,
    "g": {
      "hpPct": 15
    },
    "req": null,
    "limited": false
  }
}
```

<a id="service_inn_chuong"></a>
## Hỏi chưởng quầy có chuyện gì lạ — `service_inn_chuong`

- Loại: service; nguồn: Trong quán; chủ đề: Dịch vụ địa điểm; cảm xúc: không gắn nhãn.
- Nơi: thôn trấn, thành trì, chợ phiên tu sĩ / Khách điếm.
- Điều kiện: mọi tầng.
- Bối cảnh tác giả: .
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/core2/07-dot-10-tho-nap.js`.

Hỏi tin tức và địa điểm quanh vùng.

### Lựa chọn

- **1. Hỏi chưởng quầy có chuyện gì lạ**
  Hỏi tin tức và địa điểm quanh vùng.

### Nối cơ chế

```json
{
  "service": {
    "id": "chuong",
    "h": 1,
    "stoneBase": 0,
    "g": {
      "info": 1
    },
    "req": null,
    "limited": false
  }
}
```

<a id="service_tuu_chen"></a>
## Uống vài chén, nghe chuyện — `service_tuu_chen`

- Loại: service; nguồn: Trong quán; chủ đề: Dịch vụ địa điểm; cảm xúc: không gắn nhãn.
- Nơi: thôn trấn, thành trì, chợ phiên tu sĩ / Tửu phường.
- Điều kiện: mọi tầng.
- Bối cảnh tác giả: .
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/core2/07-dot-10-tho-nap.js`.

Giảm tâm ma, hồi tối đa 10% khí huyết và nghe tin.

### Lựa chọn

- **1. Uống vài chén, nghe chuyện**
  Giảm tâm ma, hồi tối đa 10% khí huyết và nghe tin.

### Nối cơ chế

```json
{
  "service": {
    "id": "chen",
    "h": 3,
    "stoneBase": 2,
    "g": {
      "hpPct": 10,
      "tamma": -4,
      "info": 1
    },
    "req": null,
    "limited": false
  }
}
```

<a id="service_tuu_moi"></a>
## Mời cả bàn một vò rượu ngon — `service_tuu_moi`

- Loại: service; nguồn: Trong quán; chủ đề: Dịch vụ địa điểm; cảm xúc: không gắn nhãn.
- Nơi: thôn trấn, thành trì, chợ phiên tu sĩ / Tửu phường.
- Điều kiện: mọi tầng.
- Bối cảnh tác giả: .
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/core2/07-dot-10-tho-nap.js`.

Mời rượu để kết giao, tăng lịch luyện và nghe tin.

### Lựa chọn

- **1. Mời cả bàn một vò rượu ngon**
  Mời rượu để kết giao, tăng lịch luyện và nghe tin.

### Nối cơ chế

```json
{
  "service": {
    "id": "moi",
    "h": 3,
    "stoneBase": 6,
    "g": {
      "tamma": -5,
      "ll": 3,
      "info": 1
    },
    "req": null,
    "limited": false
  }
}
```

<a id="service_tuu_dau"></a>
## Đấu rượu với gã tửu khách to con — `service_tuu_dau`

- Loại: service; nguồn: Trong quán; chủ đề: Dịch vụ địa điểm; cảm xúc: không gắn nhãn.
- Nơi: thôn trấn, thành trì, chợ phiên tu sĩ / Tửu phường.
- Điều kiện: mọi tầng.
- Bối cảnh tác giả: .
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/core2/07-dot-10-tho-nap.js`.

Cần đạo tâm; thắng cuộc nhận tiền cược và lịch luyện.

### Lựa chọn

- **1. Đấu rượu với gã tửu khách to con**
  Cần đạo tâm; thắng cuộc nhận tiền cược và lịch luyện.

### Nối cơ chế

```json
{
  "service": {
    "id": "dau",
    "h": 2,
    "stoneBase": 0,
    "g": {
      "stBase": 5,
      "ll": 1
    },
    "req": [
      "tam",
      11,
      "Đạo tâm"
    ],
    "limited": false
  }
}
```

<a id="service_tuu_ca"></a>
## Nghe ca kỹ đàn hát — `service_tuu_ca`

- Loại: service; nguồn: Trong quán; chủ đề: Dịch vụ địa điểm; cảm xúc: không gắn nhãn.
- Nơi: thôn trấn, thành trì, chợ phiên tu sĩ / Tửu phường.
- Điều kiện: mọi tầng.
- Bối cảnh tác giả: .
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/core2/07-dot-10-tho-nap.js`.

Nghe đàn giúp giảm tâm ma.

### Lựa chọn

- **1. Nghe ca kỹ đàn hát**
  Nghe đàn giúp giảm tâm ma.

### Nối cơ chế

```json
{
  "service": {
    "id": "ca",
    "h": 2,
    "stoneBase": 3,
    "g": {
      "tamma": -8
    },
    "req": null,
    "limited": false
  }
}
```

<a id="service_tea_doicau"></a>
## Thi đối câu đối của lão tú tài — `service_tea_doicau`

- Loại: service; nguồn: Trong quán; chủ đề: Cơ hội trong quán; cảm xúc: không gắn nhãn.
- Nơi: thôn trấn, thành trì, chợ phiên tu sĩ / Trà lâu.
- Điều kiện: mọi tầng.
- Bối cảnh tác giả: .
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/core2/07-dot-10-tho-nap.js`.

Lão tú tài treo giải: ai đối được vế của lão thì nhận một túi linh thạch.

### Lựa chọn

- **1. Thi đối câu đối của lão tú tài**
  Lão tú tài treo giải: ai đối được vế của lão thì nhận một túi linh thạch.

### Nối cơ chế

```json
{
  "service": {
    "id": "doicau",
    "h": 1,
    "stoneBase": 0,
    "g": {
      "st": 12,
      "ll": 2
    },
    "req": [
      "ngo",
      14,
      "Ngộ tính"
    ],
    "limited": true,
    "fight": 0
  }
}
```

<a id="service_inn_hotong"></a>
## Nhận lời hộ tống một thương nhân — `service_inn_hotong`

- Loại: service; nguồn: Trong quán; chủ đề: Cơ hội trong quán; cảm xúc: không gắn nhãn.
- Nơi: thôn trấn, thành trì, chợ phiên tu sĩ / Khách điếm.
- Điều kiện: mọi tầng.
- Bối cảnh tác giả: .
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/core2/07-dot-10-tho-nap.js`.

Một thương nhân đang tìm người hộ tống qua đoạn đường vắng. Trả công hậu, nhưng dễ đụng cướp.

### Lựa chọn

- **1. Nhận lời hộ tống một thương nhân**
  Một thương nhân đang tìm người hộ tống qua đoạn đường vắng. Trả công hậu, nhưng dễ đụng cướp.

### Nối cơ chế

```json
{
  "service": {
    "id": "hotong",
    "h": 4,
    "stoneBase": 0,
    "g": {
      "st": 15
    },
    "req": null,
    "limited": true,
    "fight": 1,
    "fightSpec": {
      "k": "sontac",
      "cnt": 2
    }
  }
}
```

<a id="service_tuu_gaysu"></a>
## Dạy cho gã say gây sự một bài học — `service_tuu_gaysu`

- Loại: service; nguồn: Trong quán; chủ đề: Cơ hội trong quán; cảm xúc: không gắn nhãn.
- Nơi: thôn trấn, thành trì, chợ phiên tu sĩ / Tửu phường.
- Điều kiện: mọi tầng.
- Bối cảnh tác giả: .
- Vai: `{}`.
- Xuất xứ: `d9ab301` / `src/game/core2/07-dot-10-tho-nap.js`.

Một gã say đập bàn, chửi bới, giật đồ của tửu khách. Không ai dám can.

### Lựa chọn

- **1. Dạy cho gã say gây sự một bài học**
  Một gã say đập bàn, chửi bới, giật đồ của tửu khách. Không ai dám can.

### Nối cơ chế

```json
{
  "service": {
    "id": "gaysu",
    "h": 1,
    "stoneBase": 0,
    "g": {
      "st": 6,
      "karma": 1
    },
    "req": null,
    "limited": true,
    "fight": 1,
    "fightSpec": {
      "k": "tantu",
      "n": "Gã say gây sự",
      "spar": 1
    }
  }
}
```
