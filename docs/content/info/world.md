# Thông tin nền — world

Bản đọc tự sinh; không sửa tại đây.

## PLACE

Nguồn: `content/world/place.js`

```json
{
  "a": [
    "Thanh",
    "Xích",
    "Hắc",
    "Bạch",
    "Tử",
    "Kim",
    "Ngân",
    "Huyền",
    "Bích",
    "Thương",
    "Hoàng",
    "Ngọc",
    "Lưu",
    "Tàn",
    "Đoạn",
    "Cô",
    "Vụ",
    "Lạc",
    "Cửu",
    "Vạn",
    "Thiên",
    "U",
    "Linh",
    "Huyễn",
    "Tịch",
    "Hàn",
    "Liệt",
    "Vọng",
    "Ẩn",
    "Phi",
    "Trầm",
    "Cổ",
    "Phù",
    "Mê",
    "Vân",
    "Nguyệt",
    "Tinh",
    "Sương",
    "Tuyết",
    "Phong",
    "Lôi",
    "Băng",
    "Long",
    "Hổ",
    "Hạc",
    "Phượng",
    "Quy",
    "Lang",
    "Nhạn",
    "Thạch",
    "Liễu",
    "Đào",
    "Trúc",
    "Tùng",
    "Lạn",
    "Vĩnh",
    "Phú",
    "An",
    "Bảo",
    "Lợi",
    "Tử Phúc",
    "Bình"
  ],
  "b": [
    "Vân",
    "Phong",
    "Vũ",
    "Tuyết",
    "Sương",
    "Nguyệt",
    "Nhật",
    "Tinh",
    "Hà",
    "Thạch",
    "Hỏa",
    "Lôi",
    "Long",
    "Hổ",
    "Hạc",
    "Phượng",
    "Lang",
    "Nhạn",
    "Ưng",
    "Liễu",
    "Trúc",
    "Tùng",
    "Hoa",
    "Diệp",
    "Tuyền",
    "Ba",
    "Yên",
    "Vụ",
    "Kiếm",
    "Cốt",
    "Hồn",
    "Ảnh",
    "Âm",
    "Dương",
    "Minh",
    "Tịch",
    "Thủy",
    "Lâm",
    "Khê",
    "Âu",
    "Phách",
    "Bằng",
    "Lan",
    "Mai",
    "Cầm",
    "Thủ"
  ],
  "sfx": {
    "tran": [
      "Trấn",
      "Thôn",
      "Phường",
      "Tập",
      "Trấn",
      "Thôn"
    ],
    "thanh": [
      "Thành",
      "Đô",
      "Phủ",
      "Thành"
    ],
    "rung": [
      "Lâm",
      "Sâm Lâm",
      "Mộc Hải",
      "Lâm"
    ],
    "nui": [
      "Sơn",
      "Lĩnh",
      "Phong",
      "Nhai",
      "Đỉnh",
      "Sơn"
    ],
    "song": [
      "Hồ",
      "Khê",
      "Giang",
      "Đàm",
      "Độ",
      "Tân"
    ],
    "phe": [
      "Cổ Mộ",
      "Phế Tự",
      "Di Tích",
      "Tàn Điện",
      "Uyên",
      "Đài",
      "Cổ Thành"
    ],
    "dong": [
      "Động",
      "Quật",
      "Cốc",
      "Huyệt"
    ],
    "tong": [
      "Sơn Môn"
    ],
    "bien": [
      "Hải",
      "Đảo",
      "Loan",
      "Tiều",
      "Hải Vực"
    ],
    "hoang": [
      "Nguyên",
      "Hoang Mạc",
      "Chiến Trường",
      "Bãi",
      "Hoang Nguyên"
    ],
    "ma": [
      "Ma Uyên",
      "Quỷ Vực",
      "Huyết Trì",
      "Thi Lĩnh",
      "U Cốc",
      "Ma Thành"
    ],
    "thien": [
      "Thiên Môn",
      "Tinh Lộ",
      "Vân Hải",
      "Hư Không",
      "Tiên Khư",
      "Thiên Giai"
    ],
    "ai": [
      "Quan",
      "Ải",
      "Quan Ải",
      "Quan"
    ],
    "sao": [
      "Sào Huyệt",
      "Trại",
      "Hang Ổ",
      "Ma Quật"
    ]
  }
}
```

## TYPE_NAME

Nguồn: `content/world/type-name.js`

```json
{
  "tran": "thôn trấn",
  "thanh": "thành trì",
  "rung": "rừng sâu",
  "nui": "núi non",
  "song": "sông hồ",
  "phe": "phế tích",
  "dong": "hang động",
  "tong": "sơn môn",
  "bien": "biển khơi",
  "hoang": "hoang nguyên",
  "ma": "ma địa",
  "thien": "thiên lộ",
  "ai": "quan ải",
  "sao": "sào huyệt",
  "linhdia": "phúc địa",
  "khoang": "mỏ linh khoáng",
  "duoc": "dược cốc",
  "cho": "chợ phiên tu sĩ",
  "ancu": "thảo lư ẩn sĩ",
  "dam": "đầm lầy"
}
```

## REG

Nguồn: `content/world/reg.js`

```json
[
  {
    "n": "Trung Châu",
    "seal": "中",
    "sub": "Đất giữa thiên hạ, sông lớn chảy qua",
    "types": [
      "tran",
      "thanh",
      "rung",
      "song",
      "tong",
      "phe"
    ],
    "tint": [
      "#C9B98E",
      "#A99A72",
      "#8A7F62"
    ],
    "sky": "#F6ECD2",
    "intro": [
      "Ngươi rời {$que} vào một sớm sương mù. Trung Châu rộng lớn, sông dài uốn khúc giữa đồng lúa. Đường tiên dài lắm, nhưng bước đầu tiên chỉ cần một bước.",
      "Người trong làng tiễn ngươi ra tới bến sông. Trung Châu đông người, lắm chợ, lắm tông môn. Ngươi không ngoảnh lại."
    ]
  },
  {
    "n": "Đông Hoang",
    "seal": "東",
    "sub": "Đồi thấp, rừng sâu, sương mù quanh năm",
    "types": [
      "rung",
      "hoang",
      "dong",
      "nui",
      "phe",
      "thanh"
    ],
    "tint": [
      "#A9BFA2",
      "#7F9E86",
      "#5F7E6A"
    ],
    "sky": "#EEF0DE",
    "intro": [
      "Ngươi rời {$que}. Phía đông là đồi nối đồi, rừng già chen kín, sương chẳng bao giờ tan hẳn.",
      "Đông Hoang ít người ở. Tiếng thú gầm vọng qua thung, khói bếp thưa như sao buổi sớm."
    ]
  },
  {
    "n": "Nam Trạch",
    "seal": "南",
    "sub": "Sông nhánh, đầm lầy, đồng nước",
    "types": [
      "song",
      "bien",
      "rung",
      "dong",
      "tran",
      "thanh"
    ],
    "tint": [
      "#9FB8BE",
      "#7899A3",
      "#566F7E"
    ],
    "sky": "#E8EEE8",
    "intro": [
      "Ngươi rời {$que}. Nam Trạch nước nhiều hơn đất, thuyền nan len giữa lau sậy, cá quẫy dưới chân cầu.",
      "Gió nồm thổi ẩm. Ở Nam Trạch, đường đi tính bằng con nước, không tính bằng dặm."
    ]
  },
  {
    "n": "Tây Lĩnh",
    "seal": "西",
    "sub": "Vạn núi chen nhau, mây phủ đỉnh",
    "types": [
      "nui",
      "dong",
      "tong",
      "rung",
      "thanh",
      "ma"
    ],
    "tint": [
      "#B49A9A",
      "#8A6F78",
      "#5E4A5A"
    ],
    "sky": "#F0E2DA",
    "intro": [
      "Ngươi rời {$que}. Tây Lĩnh núi nối núi, mỗi ngọn là một sơn môn, mỗi hang là một bí mật.",
      "Đường đá dốc đứng, mây lưng chừng núi. Người tu tiên ở Tây Lĩnh nhìn nhau bằng ánh mắt dò xét."
    ]
  },
  {
    "n": "Bắc Nhạc",
    "seal": "北",
    "sub": "Đỉnh cao chạm trời, gió lạnh thấu xương",
    "types": [
      "nui",
      "thien",
      "phe",
      "hoang",
      "dong",
      "ma"
    ],
    "tint": [
      "#D8CFB2",
      "#BFB38F",
      "#A29673"
    ],
    "sky": "#FBF6E6",
    "intro": [
      "Ngươi rời {$que}. Phía bắc, những đỉnh núi đâm thẳng vào mây, tuyết trên cao không bao giờ tan.",
      "Bắc Nhạc lạnh và vắng. Di cốt của kẻ đi trước rải rác ven đường đá cổ."
    ]
  }
]
```

## LORE

Nguồn: `content/world/lore.js`

```json
{
  "ngu_to": {
    "n": "Ngũ Tổ chém Yêu Hoàng",
    "t": "Ba vạn năm trước, Yêu Hoàng nuốt mặt trời, thiên hạ chìm trong đêm suốt chín năm. Năm vị tổ sư của năm tông môn liên thủ, chém đầu Yêu Hoàng trên Nam Thiên Môn. Máu nó bắn lên cửa trời, nên đến nay hoàng hôn vẫn đỏ."
  },
  "doan_thien": {
    "n": "Đoạn Thiên chính sử",
    "t": "Sử chép rằng thuở xưa người và tiên đi chung một con đường. Rồi có kẻ chặt đứt Thiên Thê, từ đó người tu tiên phải tự mở đường lên trời bằng lôi kiếp. Kẻ chặt Thiên Thê là ai, sử không chép. Trang ấy bị xé mất."
  },
  "van_bao": {
    "n": "Vạn Bảo Thương Hội",
    "t": "Không ai biết hội trưởng Vạn Bảo là ai. Thương hội có mặt ở mọi thành trì, mua mọi thứ, bán mọi thứ, kể cả tin tức. Thiên Kiêu Bảng do họ công bố mười năm một lần, chưa từng sai một ai."
  },
  "thien_kieu": {
    "n": "Thiên Kiêu Bảng",
    "t": "Mười năm một lần, Vạn Bảo Thương Hội treo bảng xếp hạng những người trẻ đáng sợ nhất thiên hạ. Có tên trên bảng là vinh dự, cũng là bia ngắm."
  },
  "linh_can": {
    "n": "Luận về linh căn",
    "t": "Ngũ hành tạp linh căn bị gọi là phế linh căn, vì linh khí vào người như nước vào rổ. Nhưng cổ thư có chép: Ngũ Tổ năm xưa, có một vị là tạp linh căn."
  },
  "kim_dan": {
    "n": "Phẩm kim đan",
    "t": "Kim đan chia làm hạ, trung, thượng phẩm. Trên thượng phẩm còn có vô khuyết, vạn người không được một. Người kết vô khuyết kim đan, thiên đạo cũng phải nhường ba phần."
  },
  "tam_ma": {
    "n": "Tâm ma",
    "t": "Tâm ma không đến từ bên ngoài. Mỗi lần ngươi làm điều mình biết là sai, nó lớn thêm một chút. Đến khi nó lớn hơn ngươi, nó sẽ là ngươi."
  },
  "long_cung": {
    "n": "Long cung chìm",
    "t": "Đông Hải từng có Long Cung, cung điện bằng san hô và ngọc trai dưới đáy biển sâu. Một đêm nọ, cả Long Cung chìm vào vực thẳm. Ngư dân nói những đêm biển lặng, còn nghe tiếng chuông vọng lên."
  },
  "ma_vuc": {
    "n": "Cánh cửa Cửu U",
    "t": "Ma vực vốn là Thanh Châu, đất lành chim đậu. Một vị đại năng muốn tìm đường trường sinh, mở cánh cửa thông sang U Minh. Cánh cửa không đóng lại được nữa."
  },
  "quy_thi": {
    "n": "Quỷ thị",
    "t": "Ở quỷ thị, thứ người ta trao đổi không phải linh thạch mà là năm tháng. Một năm thọ nguyên đổi một viên đan, mười năm đổi một môn công pháp. Có kẻ đổi hết, rồi chết ngay tại sạp."
  },
  "phi_thang": {
    "n": "Kẻ phi thăng cuối cùng",
    "t": "Đã ba nghìn năm không ai phi thăng. Có người nói tiên giới đã đóng cửa. Có người nói tiên giới chưa từng tồn tại. Chỉ có lôi kiếp là vẫn đến đều đặn."
  },
  "kiem_trung": {
    "n": "Kiếm trủng",
    "t": "Kiếm tu chết đi, kiếm không chết theo. Những thanh kiếm vô chủ tụ về một nơi, cắm kín một ngọn núi. Chúng chọn người, không phải người chọn chúng."
  },
  "luan_hoi": {
    "n": "Luân hồi ấn",
    "t": "Có những linh hồn mang dấu ấn trên trán mà mắt thường không thấy. Họ chết đi, sinh lại, mỗi kiếp nhớ thêm một chút. Cổ thư gọi họ là người đi lại trên Tiên Lộ."
  },
  "hu_khong": {
    "n": "Hư không",
    "t": "Bên ngoài trời còn có trời. Giữa các tầng trời là hư không, nơi thời gian và không gian vỡ vụn. Kẻ lạc trong hư không không chết, chỉ quên dần mình là ai."
  },
  "thien_dao": {
    "n": "Thiên đạo vô tình",
    "t": "Thiên đạo không thiện, không ác. Nó chỉ cân. Kẻ lấy quá nhiều sẽ bị đòi lại, kẻ cho quá nhiều sẽ được trả lại, sớm hay muộn mà thôi."
  },
  "tien_khu": {
    "n": "Tiên khư",
    "t": "Di tích của tiên nhân rơi xuống từ thượng giới. Bên trong có bảo vật, có truyền thừa, và có cả những thứ tiên nhân muốn vứt đi."
  },
  "chan_tuong": {
    "n": "Chân tướng Tiên Lộ",
    "t": "Ngươi đứng ở cửa trời và nhìn lại. Vạn kiếp luân hồi trải dài phía sau như một con đường. Mỗi kiếp chết đi không phải thất bại, mà là một viên đá lót đường. Tiên Lộ chưa bao giờ là con đường của một người."
  }
}
```

## NODE_IC

Nguồn: `content/world/node-ic.js`

```json
{
  "tran": "🏘️",
  "thanh": "🏯",
  "rung": "🌲",
  "nui": "⛰️",
  "song": "🌊",
  "phe": "🏚️",
  "dong": "🕳️",
  "tong": "⛩️",
  "bien": "🐚",
  "hoang": "🏜️",
  "ma": "💀",
  "thien": "☁️",
  "ai": "🚧",
  "sao": "☠️",
  "linhdia": "•",
  "khoang": "•",
  "duoc": "•",
  "cho": "•",
  "ancu": "•",
  "dam": "•"
}
```

## DANGER

Nguồn: `content/world/danger.js`

```json
[
  "Yên bình",
  "Có nguy",
  "Hiểm địa",
  "Tử địa"
]
```

## ENT_T

Nguồn: `content/world/ent-t.js`

```json
{
  "thuong": {
    "n": "Thương đội",
    "i": "🐫",
    "sp": 0.06666666666666667,
    "w": 3,
    "life": [
      600,
      1200
    ]
  },
  "thutrieu": {
    "n": "Thú triều",
    "i": "🐾",
    "sp": 0.05,
    "w": 2,
    "life": [
      300,
      600
    ]
  },
  "tuantra": {
    "n": "Đệ tử tuần tra",
    "i": "🥋",
    "sp": 0.1,
    "w": 2,
    "life": [
      300,
      750
    ]
  },
  "thienkieu": {
    "n": "Thiên kiêu",
    "i": "🌟",
    "sp": 0.16666666666666666,
    "w": 1,
    "life": [
      240,
      600
    ]
  },
  "truysat": {
    "n": "Kẻ truy sát",
    "i": "🗡️",
    "sp": 0.11666666666666667,
    "w": 0,
    "life": [
      900,
      1800
    ]
  },
  "di": {
    "n": "Dị tượng",
    "i": "✨",
    "sp": 0,
    "w": 2,
    "life": [
      3,
      10
    ]
  },
  "khach": {
    "n": "Khách qua đường",
    "i": "🎒",
    "sp": 0.05,
    "w": 1,
    "life": [
      300,
      750
    ]
  },
  "giaotranh": {
    "n": "Giao tranh",
    "i": "⚔️",
    "sp": 0,
    "w": 0,
    "life": [
      2,
      6
    ]
  }
}
```

## MEET_SOFT

Nguồn: `content/world/meet-soft.js`

```json
{
  "thuong": {
    "p": 0.25,
    "cd": 20,
    "g": "td"
  },
  "khach": {
    "p": 0.3,
    "cd": 12,
    "g": "kh"
  },
  "tuantra": {
    "p": 0.5,
    "cd": 8,
    "g": "tt"
  }
}
```

## DI_K

Nguồn: `content/world/di-k.js`

```json
{
  "bicanh": {
    "n": "Bí cảnh mở cửa",
    "i": "🌀",
    "ev": "bi_canh"
  },
  "saoroi": {
    "n": "Sao rơi",
    "i": "☄️",
    "ev": "sao_roi"
  },
  "daugia": {
    "n": "Hội đấu giá",
    "i": "🏮",
    "ev": "dau_gia"
  }
}
```

## NEWT

Nguồn: `content/world/newt.js`

```json
{
  "linhdia": {
    "n": "phúc địa",
    "as": "nui",
    "sfx": [
      "Phúc Địa",
      "Linh Tuyền",
      "Tiên Cốc"
    ]
  },
  "khoang": {
    "n": "mỏ linh khoáng",
    "as": "dong",
    "sfx": [
      "Khoáng Động",
      "Thạch Mạch",
      "Linh Khoáng"
    ]
  },
  "duoc": {
    "n": "dược cốc",
    "as": "rung",
    "sfx": [
      "Dược Cốc",
      "Thảo Viên",
      "Dược Lâm"
    ]
  },
  "cho": {
    "n": "chợ phiên tu sĩ",
    "as": "thanh",
    "sfx": [
      "Tụ Bảo Phường",
      "Chợ Phiên",
      "Giao Dịch Phường"
    ]
  },
  "ancu": {
    "n": "thảo lư ẩn sĩ",
    "as": "nui",
    "sfx": [
      "Thảo Lư",
      "Trúc Xá",
      "Am"
    ]
  },
  "dam": {
    "n": "đầm lầy",
    "as": "song",
    "sfx": [
      "Đầm",
      "Trạch",
      "Bãi Lầy"
    ]
  }
}
```

## NAME_PRE

Nguồn: `content/world/name-pre.js`

```json
[
  "Thanh Vân",
  "Bạch Lộ",
  "Huyền Sương",
  "Tử Yên",
  "Xích Hà",
  "Lạc Nhạn",
  "Vọng Nguyệt",
  "Thính Vũ",
  "Ngọa Long",
  "Phi Hạc",
  "Tàng Phong",
  "Minh Kính",
  "U Lan",
  "Hàn Tuyền",
  "Kim Tước",
  "Thúy Trúc",
  "Vân Mộng",
  "Cổ Tùng",
  "Lưu Sa",
  "Bích Đào",
  "Ngân Hạnh",
  "Thiên Trì",
  "Mặc Trì",
  "Hồng Diệp"
]
```

## DTAG

Nguồn: `content/world/dtag.js`

```json
[
  "An toàn",
  "Ngang sức",
  "Nguy hiểm",
  "Tử địa"
]
```

## SETTLE

Nguồn: `content/world/settle.js`

```json
[
  "tran",
  "thanh",
  "cho",
  "tong",
  "ancu"
]
```

## MOUNT

Nguồn: `content/world/mount.js`

```json
[
  {
    "id": "pt_thuyen_van_ghep_lau",
    "n": "Thuyền Ván Ghép Lau",
    "m": 1.6,
    "p": 20,
    "d": "Đầu ván ghép cắm một cọng lau để dò nước. Lau ngừng rung là đã đến bờ cạn.",
    "realm": 0
  },
  {
    "id": "pt_dieu_vai_do_nguoi",
    "n": "Diều Vải Đỡ Người",
    "m": 1.6,
    "p": 26,
    "d": "Căng đủ hai sải tay, tấm diều nâng người khỏi ngọn cỏ. Dây kéo còn buộc bằng lạt tre.",
    "realm": 0
  },
  {
    "id": "pt_lua_got_xam",
    "n": "Lừa Gót Xám",
    "m": 1.8,
    "p": 30,
    "d": "Con lừa cúi đầu trước từng dốc đá. Lên tới đỉnh, nó tự tìm một vạt cỏ mà đứng.",
    "realm": 0
  },
  {
    "id": "pt_xe_mui_tre_xep",
    "n": "Xe Mui Tre Xếp",
    "m": 1.8,
    "p": 23,
    "d": "Mui xe đan đủ thưa để thấy mưa. Ngồi trong nghe tiếng vành gỗ nghiến qua hạt sỏi.",
    "realm": 0
  },
  {
    "id": "ngua",
    "n": "Tuấn mã",
    "m": 2,
    "p": 30,
    "d": "Đi nhanh gấp đôi"
  },
  {
    "id": "pt_huou_may_dau_bo",
    "n": "Hươu Mây Đầu Bờ",
    "m": 2.3,
    "p": 55,
    "d": "Móng hươu thả từng nhúm mây trên mặt đất. Mùi cỏ ướt còn theo nó qua mấy bận gió.",
    "realm": 0
  },
  {
    "id": "pt_ghe_canh_manh",
    "n": "Ghe Cánh Mành",
    "m": 2.3,
    "p": 42,
    "d": "Mành kéo lên, bóng lá buồm bò qua lòng ghe như một con cá rộng vây.",
    "realm": 0
  },
  {
    "id": "pt_xe_banh_thau",
    "n": "Xe Bánh Thau",
    "m": 2.5,
    "p": 59,
    "d": "Mỗi bánh gắn hai vòng thau mỏng. Đêm khuya đứng đầu dốc vẫn nghe chúng chuyển động.",
    "realm": 0
  },
  {
    "id": "pt_co_lung_bac",
    "n": "Cò Lưng Bạc",
    "m": 2.6,
    "p": 53,
    "d": "Cò cất cánh sau ba bước lội. Nước từ lông rơi xuống thẳng hàng như dấu chân.",
    "realm": 0
  },
  {
    "id": "pt_lac_da_bo_cat",
    "n": "Lạc Đà Bờ Cát",
    "m": 2.9,
    "p": 55,
    "d": "Một chiếc chuông đất treo dưới hàm. Đi vào cát sâu, tiếng chuông càng nhỏ.",
    "realm": 0
  },
  {
    "id": "pt_phi_kiem_can_dau",
    "n": "Phi Kiếm Cán Dâu",
    "m": 1.6,
    "p": 33,
    "d": "Cán dâu mòn ở chỗ bám tay. Khi đưa người qua khe, lưỡi kiếm luôn chao một nhịp.",
    "realm": 1
  },
  {
    "id": "pt_kiem_ranh_hung_gio",
    "n": "Kiếm Rãnh Hứng Gió",
    "m": 3.3,
    "p": 234,
    "d": "Một khe dài trên sống giữ gió thành tiếng huýt. Tiếng ấy tắt hẳn khi kiếm hạ độ cao.",
    "realm": 1
  },
  {
    "id": "pt_be_giay_do_suong",
    "n": "Bè Giấy Dò Sương",
    "m": 3.5,
    "p": 155,
    "d": "Mực vẽ sống bè ăn qua mười lớp giấy. Rơi xuống mưa, bè lại bay cao thêm.",
    "realm": 1
  },
  {
    "id": "thuyen",
    "n": "Phi chu",
    "m": 4,
    "p": 220,
    "d": "Pháp khí phi hành, nhanh gấp bốn",
    "realm": 1
  },
  {
    "id": "pt_nhan_nguc_dom_trang",
    "n": "Nhạn Ngực Đốm Trắng",
    "m": 4,
    "p": 271,
    "d": "Chỗ trắng trên ngực nhạn chỉ lộ khi gập cánh. Người cưỡi quen nhìn đốm ấy để biết sắp hạ.",
    "realm": 1
  },
  {
    "id": "pt_de_cuon_may_thap",
    "n": "Dê Cuộn Mây Thấp",
    "m": 4.2,
    "p": 252,
    "d": "Râu dê kéo theo một vệt mây dưới móng. Vệt càng dài, nó càng leo qua đá dễ.",
    "realm": 1
  },
  {
    "id": "pt_huou_dam_man",
    "n": "Hươu Đầm Mặn",
    "m": 4.2,
    "p": 191,
    "d": "Bốn móng phẳng dần vì dẫm bãi triều. Nó tìm được bờ lúc mắt người chỉ còn thấy nước.",
    "realm": 1
  }
]
```

## REGEN_REALM

Nguồn: `content/world/regen-realm.js`

```json
3
```

## VEH_T

Nguồn: `content/world/veh-t.js`

```json
[
  {
    "k": "ngua",
    "n": [
      "Ngựa thồ",
      "Tuấn mã",
      "Hãn huyết mã",
      "Long câu",
      "Thiên lý long câu"
    ],
    "m": 1.7,
    "p": 60,
    "realm": 0,
    "ic": "run"
  },
  {
    "k": "loc",
    "n": [
      "Linh lộc",
      "Bạch lộc",
      "Ngọc giác lộc",
      "Cửu sắc lộc",
      "Thần lộc"
    ],
    "m": 1.9,
    "p": 90,
    "realm": 0,
    "ic": "tree"
  },
  {
    "k": "hac",
    "n": [
      "Bạch hạc",
      "Tiên hạc",
      "Huyền hạc",
      "Đan đỉnh hạc",
      "Cửu thiên hạc"
    ],
    "m": 2.8,
    "p": 260,
    "realm": 1,
    "ic": "feather"
  },
  {
    "k": "chu",
    "n": [
      "Phi chu",
      "Mộc lan chu",
      "Thanh vân chu",
      "Bích lạc chu",
      "Càn khôn chu"
    ],
    "m": 3.6,
    "p": 500,
    "realm": 1,
    "ic": "cart"
  },
  {
    "k": "kiem",
    "n": [
      "Phi kiếm",
      "Thanh phong kiếm",
      "Lưu quang kiếm",
      "Tử điện kiếm",
      "Tru tiên kiếm"
    ],
    "m": 6,
    "p": 1600,
    "realm": 2,
    "ic": "sword"
  }
]
```

## AREA

Nguồn: `content/world/area.js`

```json
[
  {
    "n": "Trung Châu",
    "seal": "中",
    "sub": "Đất giữa thiên hạ, sông lớn chảy qua",
    "types": [
      "tran",
      "thanh",
      "rung",
      "song",
      "tong",
      "phe"
    ],
    "intro": [
      "Ngươi rời {$que} vào một sớm sương mù. Trung Châu rộng lớn, sông dài uốn khúc giữa đồng lúa. Đường tiên dài lắm, nhưng bước đầu tiên chỉ cần một bước.",
      "Người trong làng tiễn ngươi ra tới bến sông. Trung Châu đông người, lắm chợ, lắm tông môn. Ngươi không ngoảnh lại."
    ]
  },
  {
    "n": "Đông Hoang",
    "seal": "東",
    "sub": "Đồi thấp, rừng sâu, sương mù quanh năm",
    "types": [
      "rung",
      "hoang",
      "dong",
      "nui",
      "phe",
      "thanh"
    ],
    "intro": [
      "Ngươi rời {$que}. Phía đông là đồi nối đồi, rừng già chen kín, sương chẳng bao giờ tan hẳn.",
      "Đông Hoang ít người ở. Tiếng thú gầm vọng qua thung, khói bếp thưa như sao buổi sớm."
    ]
  },
  {
    "n": "Nam Trạch",
    "seal": "南",
    "sub": "Sông nhánh, đầm lầy, đồng nước",
    "types": [
      "song",
      "bien",
      "rung",
      "dong",
      "tran",
      "thanh"
    ],
    "intro": [
      "Ngươi rời {$que}. Nam Trạch nước nhiều hơn đất, thuyền nan len giữa lau sậy, cá quẫy dưới chân cầu.",
      "Gió nồm thổi ẩm. Ở Nam Trạch, đường đi tính bằng con nước, không tính bằng dặm."
    ]
  },
  {
    "n": "Tây Lĩnh",
    "seal": "西",
    "sub": "Vạn núi chen nhau, mây phủ đỉnh",
    "types": [
      "nui",
      "dong",
      "tong",
      "rung",
      "thanh",
      "ma"
    ],
    "intro": [
      "Ngươi rời {$que}. Tây Lĩnh núi nối núi, mỗi ngọn là một sơn môn, mỗi hang là một bí mật.",
      "Đường đá dốc đứng, mây lưng chừng núi. Người tu tiên ở Tây Lĩnh nhìn nhau bằng ánh mắt dò xét."
    ]
  },
  {
    "n": "Bắc Nhạc",
    "seal": "北",
    "sub": "Đỉnh cao chạm trời, gió lạnh thấu xương",
    "types": [
      "nui",
      "thien",
      "phe",
      "hoang",
      "dong",
      "ma"
    ],
    "intro": [
      "Ngươi rời {$que}. Phía bắc, những đỉnh núi đâm thẳng vào mây, tuyết trên cao không bao giờ tan.",
      "Bắc Nhạc lạnh và vắng. Di cốt của kẻ đi trước rải rác ven đường đá cổ."
    ]
  }
]
```

## SIZE_T

Nguồn: `content/world/size-t.js`

```json
{
  "tran": [
    2,
    4
  ],
  "thanh": [
    4,
    7
  ],
  "dong": [
    1,
    2
  ],
  "khoang": [
    1,
    2
  ],
  "duoc": [
    1,
    2
  ],
  "ancu": [
    1,
    1
  ],
  "cho": [
    1,
    2
  ],
  "phe": [
    1,
    3
  ],
  "ma": [
    2,
    4
  ],
  "sao": [
    2,
    3
  ],
  "rung": [
    3,
    6
  ],
  "nui": [
    3,
    6
  ],
  "song": [
    2,
    4
  ],
  "bien": [
    3,
    6
  ],
  "hoang": [
    4,
    7
  ],
  "thien": [
    3,
    5
  ],
  "linhdia": [
    2,
    4
  ],
  "dam": [
    2,
    4
  ]
}
```

## TONG_SZ

Nguồn: `content/world/tong-sz.js`

```json
[
  null,
  [
    3,
    4
  ],
  [
    5,
    6
  ],
  [
    7,
    8
  ],
  [
    9,
    10
  ]
]
```

## VIS_COST

Nguồn: `content/world/vis-cost.js`

```json
[
  0.8,
  1,
  1.7,
  1,
  0.7,
  0.65,
  1.4,
  1.1
]
```
