# Hướng dẫn viết nội dung đợt ba cho Phù Sinh (dành cho GPT)

Đọc hết tệp này trước khi viết. Bối cảnh từng tệp cần viết nằm ở `2-danh-sach.md`.

## 1. Bối cảnh: Đại Mộng

Thế giới tên là Cổ Giới. Năm vị tổ xưa (Ngũ Tổ) dựng vòng luân hồi để cứu một thế giới đang chết; nay vòng ấy quay bằng **ký ức của chúng sinh** (thứ người ta bỏ lại ở bến khi uống canh quên). Người chơi chết đi, đầu thai ngẫu nhiên và **quên sạch** — nhân vật mới không nhớ gì. Thứ còn lại qua các kiếp nằm trong **sổ luân hồi** của người chơi, không nằm trong đầu nhân vật:
- **Mộng Ấn** (8 mảnh): những lần "chợt thấy như đã từng" — viếng mộ chính mình kiếp trước, xem vở tuồng kể đời mình, gặp lại một người không già… Mỗi kiếp nhặt tối đa một mảnh.
- **Ba tri thức** (ba điều bí mật): "Vòng đã từng khép", "Ký ức đang nuôi vòng", "Cửa có thể chọn". Mỗi điều cần **hai chứng độc lập** (Mộng Ấn hoặc khảo sát ở nơi cổ LOC05 Huyền Cơ Trận Các, LOC12 Lạn Kha Tự, LOC15 Hồi Thanh Đài).
- **Người Gác Bến**: mỗi kiếp hiện một lần, mỗi lần một dạng (lão chèo đò, đứa trẻ ăn mày, ni cô mù, người bán canh, lão đạo ăn xin, bà đỡ). Thật ra là **mảnh ký ức của Yêu Hoàng** (kẻ bị Ngũ Tổ chém) trôi ra ngoài vòng. Nói thật **từng phần**, giấu lý do mình bị chém; muốn người chơi **chặt đứt vòng** (vì vòng khép thì nó được tan), khuyên ngăn việc "sửa vòng". Người chơi không nên tin trọn. NP12 (sứ thú của Yêu Hoàng) nhận ra nó.
- **Bến Vong Xuyên**: khi chết, người chơi chọn "Uống canh, đi ngay" hoặc "Ngồi đợi" (nghe người bên bến nói; nghe tới cuối lần đầu thì nhặt Mộng Ấn #1).
- **Tám kết thúc**: bốn kết ghi theo đời (Một đời đã sống, Nhân Hoàng, Ma chủ, Truyền một ngọn đèn) và bốn kết khép cả hành trình qua nghi thức (Phi thăng tỉnh mộng, Giữ mộng bằng tên mình, Người chặt vòng, Thế giới không còn người gọi tên). Phi thăng khi chưa đủ ba tri thức là **"mộng trong mộng"**: lên tới nơi lại thấy một bến Vong Xuyên khác. Cưỡng mở Diệt Thế khi thiếu điều kiện: nghi thức vỡ, chỉ **ba khu thành đất ma**.

## 2. Viết gì, game dùng ra sao

| loại | tệp | game hiện lúc nào | thiếu tệp thì |
|---|---|---|---|
| A. Mộng Ấn | `content/dai-mong/mong-an/MAxx.json` | lúc nhặt mảnh (chọn một đoạn trong `nhat`) | một câu chung kèm tên mảnh |
| B. Người Gác Bến | `content/dai-mong/gac-ben/<dạng>.json` | kỳ ngộ "Người lạ không già" mỗi kiếp một lần: `hien` (cảnh gặp), `nhan` (khi người chơi nói "Ta đã gặp ngươi"), `loi[bậc]` (khi ngồi hỏi chuyện) | lời chung của mọi dạng |
| C. Khảo sát nơi cổ | `content/dai-mong/khao/LOCxx.json` | mục "Đại sự" ở nơi ấy: đoạn kể khi làm xong từng việc | một câu chung |
| D. Nghi thức | `content/dai-mong/nghi-thuc/NGxx.json` | `chuanBi` lúc bắt đầu, `xong` mở đầu màn kết, `hong` khi hỏng | một câu chung |
| E. Màn kết | `content/dai-mong/ket/ENDxx.json` | `canh` cảnh kết (game tự thêm câu kết cố định sau), `hau` vài câu hậu truyện | chỉ câu kết cố định |

Bến Vong Xuyên (`content/dai-mong/ben.json`) Claude đã viết xong, không cần viết.

## 3. Được sửa và không được sửa

- Phần A (lô 1–8): CHỈ tạo tệp `.json` mới trong `content/dai-mong/mong-an/`, `gac-ben/`, `khao/`, `nghi-thuc/`, `ket/`, đúng tên ở `2-danh-sach.md`. Tên tệp = mã.
- Phần B (lô 9–13): CHỈ đổi chữ trong `content/tuyen/*.json`, ở các khoá `ten`, `mo`, `t`, `l`, `su`, `dauVong`, `thayThe`, `ngoai`, `tomTat`. Không thêm/bớt nút, lựa chọn, điều kiện, hiệu ứng, mã. `npm run content:chu` bắt mọi thay đổi ngoài chữ.
- KHÔNG sửa mã (`src/`, `tools/`), `content/rules`, `content/text`, sáu tệp mẫu, tệp tự sinh `src/game/data/*`, `phu-sinh.html`, tài liệu.
- JSON chuẩn: ngoặc kép, không dấu phẩy thừa, không xuống dòng giữa chuỗi, UTF-8. Ngoặc kép trong lời thoại viết `\"`.

## 4. Định dạng (đúng khoá, không thêm khoá lạ)

### 4.1 Mộng Ấn (`loai: "mong_an"`)
```json
{ "schemaVersion": 1, "loai": "mong_an", "ma": "MA02",
  "nhat": [ "đoạn 1 (150–700 ký tự)", "đoạn 2", "đoạn 3 (tuỳ)" ] }
```
2–3 đoạn, mỗi đoạn là một cách khác nhau mảnh mộng hiện ra. Kết đoạn bằng hình ảnh, không giảng giải điều được hé lộ (game tự ghi tên mảnh và câu hé lộ ngay sau).

### 4.2 Người Gác Bến (`loai: "gac_ben"`)
```json
{ "schemaVersion": 1, "loai": "gac_ben", "dang": "ni_co_mu",
  "hien": [ "2–4 cảnh gặp (120–600)" ],
  "nhan": [ "2–4 đoạn đáp khi bị nhận ra (80–500)" ],
  "loi":  [ "bậc 0", "bậc 1", "bậc 2", "bậc 3", "bậc 4" ] }
```
`loi` đúng **5** đoạn (100–600), theo bậc lộ: 0 chưa ai nhận ra — nói bóng gió; 1 — canh không làm quên hết; 2 — vòng do năm người xưa dựng, quay bằng ký ức; 3 — vòng có ba nút ở ba nơi cổ, xúi **chặt vòng**, chê việc sửa vòng; 4 (sau khi NP12 nói ra) — tự nhận là mảnh ký ức của kẻ bị chém, vòng khép thì được tan, "chưa nói dối, chỉ chưa nói hết". **Chỉ `loi[4]` được nhắc Yêu Hoàng / bị chém.** Dạng nào cũng một người, cùng một mạch lời, chỉ đổi giọng và vật dụng theo dạng (đứa trẻ ăn mày nói ngắn, ni cô mù nói về tiếng, bà đỡ nói về sinh nở…).

### 4.3 Khảo sát nơi cổ (`loai: "khao"`)
```json
{ "schemaVersion": 1, "loai": "khao", "loc": "LOC12",
  "muc": { "k12a": "đoạn (150–700)", "k12b": "…", "que": "…", "khoa12": "…" } }
```
Đủ mọi mã việc của nơi ấy (bảng ở `2-danh-sach.md`), không thêm mã khác.

### 4.4 Nghi thức (`loai: "nghi_thuc"`)
```json
{ "schemaVersion": 1, "loai": "nghi_thuc", "ma": "NG03", "chuanBi": "…", "xong": "…", "hong": "…" }
```
Khoá theo nghi thức: NG02 `chuanBi`, `xong` · NG03 `chuanBi`, `xong`, `hong` · NG04 `xong`, `hong`. Mỗi đoạn 150–700.

### 4.5 Màn kết (`loai: "ket"`)
```json
{ "schemaVersion": 1, "loai": "ket", "ma": "END07",
  "canh": [ "2–3 cảnh kết (200–900)" ], "hau": [ "2–5 câu hậu truyện (30–220)" ] }
```
Không chép lại câu kết cố định (game tự thêm). `hau` là chuyện thế gian sau đó, cụ thể, không tô hồng.

## 5. Chỗ thay tên và bảng mã

Trong lời văn chỉ dùng: `{ten}` (tên nhân vật; KHÔNG dùng ở Bến và lúc chết), `{NPxx}` (tên người đang giữ vai, hoặc "người từng là …" nếu đã mất), `{NPxx.vai}`, `{NPxx.noi}`, `{LOCxx}` (tên nơi hiện tại), `{FAxx}`. **Không ghi thẳng tên** người/nơi/thế lực trong bảng; không đặt tên riêng mới. Tên chung được dùng: Vong Xuyên, Người Gác Bến, Ngũ Tổ, Yêu Hoàng (chỉ loi[4]), Cổ Giới, Đêm Dài, Mộng Ấn, Thiên Lộ, tên năm đại khu và tên cảnh giới.

#### Địa điểm neo LOC
| Mã | Tên | Đại khu | Loại nút được chọn | Thế lực | Công dụng | Khi bị phá (Luật 2) | Lõi |
|---|---|---|---|---|---|---|---|
| LOC01 | Thanh Khê Thôn | Trung Châu | tran | FA04 | Ruộng, nhà hộ dân, đê, kho thóc, chợ. | trại tị nạn → di tích |  |
| LOC02 | Lương Kinh | Trung Châu | thanh | FA01 | Triều đình, trường thi, ngục, sổ thuế, sân khấu. | kinh thành đổi chủ → kinh thành dưới luật mới |  |
| LOC03 | Vạn Bảo Hội Quán | Trung Châu | cho, thanh, tran | FA02 | Hợp đồng, thương đội, bảo quản, đấu giá. | hội quán cháy, sổ nợ còn bản sao trong thương đội → nền hội quán cũ |  |
| LOC04 | Cổ Miếu Vô Danh | Đông Hoang | phe, ancu, tran | — | Trú ẩn, bia tên người mất, dấu mộng. | miếu đổ, bia vỡ còn mảnh chữ đọc được → nền miếu giữa cỏ |  |
| LOC05 | Huyền Cơ Trận Các | Đông Hoang | linhdia, dong, phe, thanh | FA03 | Trận đồ, trục quan trắc, hồ sơ Ngũ Tổ. | các sụp, còn phòng lõi nguy hiểm có thể khảo sát → phòng lõi giữa đá đổ | có |
| LOC06 | Đoạn Tùng Lâm | Đông Hoang | rung, nui, dam, linhdia, dong | — | Gỗ, dược phàm, thú, đất chôn. | rừng cháy, lộ nền đá cổ → rừng non mọc trên nền đá cổ |  |
| LOC07 | Huyết Sát Cốc | Nam Trạch | ma, dong, sao, dam | FA05 | Huyết tộc, huyết trì, pháp ước, tranh quyền. | cốc vắng, còn ấn và hồ sơ bị nguyền → huyết trì khô |  |
| LOC08 | Vạn Thú Môn | Nam Trạch | rung, sao, linhdia, dong | FA06 | Chuồng thú, trại cứu thương, sổ khế ước, cửa gọi linh. | chuồng bỏ ngỏ, thú thả ra thành bầy thật → trại cũ giữa bầy thú |  |
| LOC09 | Tịch Chiếu Bến | Nam Trạch | song, dam, tran | — | Đò, lưới, chợ nước, sân hát, xác tàu. | lũ đổi lối vào, lời khai nằm trên bảng khắc thuyền → bến mới bên dòng cũ |  |
| LOC10 | Bách Thảo Cốc | Tây Lĩnh | duoc, linhdia, rung | FA07 | Ruộng thuốc, bệnh xá, hồ sơ dịch, bàn luyện đan. | vườn bị đốt, hạt giống còn trong kho lạnh → vườn mọc lại từ kho lạnh |  |
| LOC11 | Hàn Thiết Lô | Tây Lĩnh | khoang, nui, dong, tran | FA08 | Mỏ, lò, xưởng giấy và khuôn. | mỏ đóng, còn đường hầm, bảng công và lô kim loại cuối → đường hầm bỏ hoang |  |
| LOC12 | Lạn Kha Tự | Tây Lĩnh | ancu, phe, linhdia, nui, dong | FA09 | Thư khố, nhà tạm trú, tháp tro, văn bia. | chùa đổ, văn bản tản mát ở người hành hương → tháp tro còn đứng | có |
| LOC13 | Bắc Phong Ải | Bắc Nhạc | thanh, tran | FA10 | Quân doanh, trường luyện, trạm ngựa, kho. | ải thất thủ thành chiến địa, tuyến tiếp tế lưu vong → chiến địa cũ |  |
| LOC14 | Táng Cốt Nguyên | Bắc Nhạc | phe, hoang, dong, tran | — | Mồ tập thể, bia trận vong, trại người trở về, xưởng dựng bia. | trại bỏ hoang, dấu linh hồn còn đọc được → đồng mộ không người |  |
| LOC15 | Hồi Thanh Đài | Bắc Nhạc | thien, linhdia, nui, dong, phe | — | Điểm nghe ký ức, quan trắc Đêm Dài và cửa kết thúc. | nền đá nứt, lõi đài còn nghe được → nền đá | có |

Đường neo: LOC01–LOC02, LOC02–LOC03, LOC01–LOC04, LOC04–LOC05, LOC04–LOC06, LOC06–LOC08, LOC08–LOC07, LOC08–LOC09, LOC09–LOC03 (thủy), LOC03–LOC11 (thương lộ), LOC11–LOC10, LOC10–LOC12, LOC11–LOC13, LOC13–LOC14, LOC14–LOC15 (sơn), LOC12–LOC15 (sơn).

#### Vai NPC NP (tên là người giữ vai thời mở đầu; luôn gọi `vaiNow`)
| Mã | Tên (người mở đầu) | Vai | Nơi | Thế lực | Cảnh giới | Nối vai | Vật chứng thay |
|---|---|---|---|---|---|---|---|
| NP01 | Lý Thổ | đại diện hộ nông (đứng đầu) | LOC01 Thanh Khê Thôn | FA04 | phàm | con cái | sổ hộ và bia người giữ giống |
| NP02 | Mộc Nghi | dân binh | LOC01 Thanh Khê Thôn | FA04 | phàm | người thay | danh sách quân dịch ở trạm |
| NP03 | Tạ Văn Kính | thư lại | LOC02 Lương Kinh | FA01 | phàm | học trò | bản sổ thuế có nét sửa |
| NP04 | Lương Hạo | quân chủ (đứng đầu) | LOC02 Lương Kinh | FA01 | phàm | con cái | chiếu chỉ và ấn triều |
| NP05 | Thẩm Cửu | chưởng quỹ (đứng đầu) | LOC03 Vạn Bảo Hội Quán | FA02 | phàm | học trò | sổ nợ bản sao trong thương đội |
| NP06 | Lạc Tín | người dẫn thương đội | LOC03 Vạn Bảo Hội Quán | FA02 | phàm | người thay | khế cầm cố người nhà |
| NP07 | Vô Đăng | người giữ miếu | LOC04 Cổ Miếu Vô Danh | — | phàm | học trò | bia tên người mất trong miếu |
| NP08 | Mạc Liên | người dò phả hệ | LOC04 Cổ Miếu Vô Danh | — | phàm | người thay | tập chép bia |
| NP09 | Hứa Triều | trận sư (đứng đầu) | LOC05 Huyền Cơ Trận Các | FA03 | Kết Đan | học trò | trận đồ ở phòng lõi |
| NP10 | Diệp Vân | học đồ trận | LOC05 Huyền Cơ Trận Các | FA03 | Luyện Khí | học trò | bản sao bảng người bị hiến |
| NP11 | Đỗ Lộc | tiều phu | LOC06 Đoạn Tùng Lâm | FA04 | phàm | con cái | dấu khắc trên cây mẹ |
| NP12 | Dã Tâm | sứ thú của Yêu Hoàng | LOC06 Đoạn Tùng Lâm | — | Nguyên Anh | người thay | hiệp ước sinh cảnh khắc trên đá |
| NP13 | Tần Huyết Lăng | chủ huyết cốc (đứng đầu) | LOC07 Huyết Sát Cốc | FA05 | Nguyên Anh | con cái | ấn huyết cốc và hồ sơ bị nguyền |
| NP14 | A Túc | người giữ huyết phả | LOC07 Huyết Sát Cốc | FA05 | Luyện Khí | người thay | huyết phả |
| NP15 | Bạch Kỳ | người quản thú (đứng đầu) | LOC08 Vạn Thú Môn | FA06 | Kết Đan | học trò | sổ khế ước thú |
| NP16 | Kỷ Vũ | thú y | LOC08 Vạn Thú Môn | FA06 | Luyện Khí | học trò | phương thuốc thú |
| NP17 | Giang Mộ | lái đò | LOC09 Tịch Chiếu Bến | — | phàm | con cái | bảng khắc thuyền |
| NP18 | Ninh Ca | chủ gánh hát | LOC09 Tịch Chiếu Bến | — | phàm | học trò | vở tuồng chép tay |
| NP19 | Tô Bán Hạ | y sư (đứng đầu) | LOC10 Bách Thảo Cốc | FA07 | Trúc Cơ | học trò | hồ sơ dịch và hạt giống kho lạnh |
| NP20 | Hà Tề | dược đồng | LOC10 Bách Thảo Cốc | FA07 | phàm | học trò | mẫu nước và sổ ghi bệnh |
| NP21 | Cố Chùy | chủ lò (đứng đầu) | LOC11 Hàn Thiết Lô | FA08 | phàm | con cái | bảng công thợ mỏ |
| NP22 | La Men | thợ khuôn và giấy | LOC11 Hàn Thiết Lô | FA08 | phàm | học trò | khuôn ấn giả |
| NP23 | Trí Viễn | người giữ thư khố (đứng đầu) | LOC12 Lạn Kha Tự | FA09 | Trúc Cơ | học trò | thư khố Lạn Kha |
| NP24 | Sầm Tro | người khắc bia | LOC12 Lạn Kha Tự | FA09 | phàm | học trò | văn bia đã khắc |
| NP25 | Đường Bắc Quy | chỉ huy (đứng đầu) | LOC13 Bắc Phong Ải | FA10 | Luyện Khí | người thay | bản đồ quân doanh |
| NP26 | A Mãn | giữ ngựa trạm | LOC13 Bắc Phong Ải | FA10 | phàm | người thay | sổ trạm ngựa |
| NP27 | Mạnh Cốt | thầy bó xương | LOC14 Táng Cốt Nguyên | — | phàm | học trò | sổ tên người được cứu |
| NP28 | Bùi Ấn | cựu coi ấn | LOC14 Táng Cốt Nguyên | — | phàm | con cái | ấn thật được giấu |
| NP29 | Kha Vọng | người nghe ký ức | LOC15 Hồi Thanh Đài | — | Kết Đan | học trò | nền đá ghi lời nghe được |
| NP30 | Tịch Âm | ký ức kết tụ | LOC15 Hồi Thanh Đài | — | phàm | không già, không người kế | tiếng vọng ở nền đá |

#### Thế lực FA
| Mã | Tên | Căn cứ | Đứng đầu (vai) | Giữ | Nợ / cần |
|---|---|---|---|---|---|
| FA01 | Lương triều | LOC02 Lương Kinh | NP04 | thuế và ngôi | FA02, FA10 |
| FA02 | Vạn Bảo Thương Hội | LOC03 Vạn Bảo Hội Quán | NP05 | hợp đồng, độc quyền vận chuyển | FA08, FA05 |
| FA03 | Huyền Cơ Trận Các | LOC05 Huyền Cơ Trận Các | NP09 | hệ trận Ngũ Tổ | FA09 |
| FA04 | Thanh Khê Liên Thôn | LOC01 Thanh Khê Thôn | NP01 | đất, nước, an táng | FA01 |
| FA05 | Huyết Sát Cốc | LOC07 Huyết Sát Cốc | NP13 | huyết hệ và quyền tự trị | FA02 |
| FA06 | Vạn Thú Môn | LOC08 Vạn Thú Môn | NP15 | nơi sống, khế ước và nguồn thú | FA04 |
| FA07 | Bách Thảo Cốc | LOC10 Bách Thảo Cốc | NP19 | cứu chữa và đan phương | FA01 |
| FA08 | Hàn Thiết Hội | LOC11 Hàn Thiết Lô | NP21 | lò và quyền thợ | FA02 |
| FA09 | Lạn Kha Tự | LOC12 Lạn Kha Tự | NP23 | ký ức người chết | FA03 |
| FA10 | Bắc Phong Quân | LOC13 Bắc Phong Ải | NP25 | biên ải và lương quân | FA01 |

#### Đồng hồ thế giới CLK
| Mã | Đồng hồ | Nhịp | Nơi |
|---|---|---|---|
| CLK01 | Mùa đói Thanh Khê | 6–14 năm | LOC01 |
| CLK02 | Nợ của triều đình | 8–15 năm | LOC02 |
| CLK03 | Biên ải | 10–20 năm | LOC13 |
| CLK04 | Huyết ước | 3–3 năm | LOC07 |
| CLK05 | Thú triều | 22–28 năm | LOC08 |
| CLK06 | Đêm Dài trở lại | chỉ tăng vì hành động | LOC15 |
| CLK07 | Đại Hội Thiên Kiêu | 30–30 năm | LOC02 |
| CLK08 | Tông Chiến Chính–Ma | 150–150 năm | — |
| CLK09 | Đổi Ngôi | 60–120 năm | LOC02 |
| CLK10 | Đại Dịch | 80–160 năm | LOC10 |
| CLK11 | Bí Cảnh Thượng Cổ Mở | 50–50 năm | — |
| CLK12 | Tiên Nhân Hạ Phàm | một lần | LOC15 |
| CLK13 | Long Mạch Đứt | 300–600 năm | — |
| CLK14 | Thiên Lộ Mở | 300–300 năm | LOC15 |


## 6. Giọng văn

- Ngôi thứ hai "ngươi", câu ngắn, cảnh cụ thể: ai, ở đâu, đang làm gì, thấy vật gì, nghe tiếng gì. Một chi tiết đời thường (bát canh mẻ, mái chèo mòn, mùi bếp) đáng hơn mười chữ "huyền bí".
- U buồn nhưng có hi vọng nhỏ là thật; không phải lòng tốt nào cũng bị phản. Không tô hồng, không giảng đạo.
- Người Gác Bến: hiền, mệt, nói vòng; mỗi câu thật nhưng thiếu một nửa. Người đọc tinh ý phải thấy nó có lợi riêng khi xúi chặt vòng.
- Bí mật hé ra qua vật chứng (bản khắc, tiếng chuông, sợi khói vào lõi trận, người làng quên tên con), không qua lời tuyên bố.

## 7. Điều cấm (bộ kiểm bắt, báo lỗi kèm cách sửa)

1. Không con số trong lời văn (viết "ba ngày", "trăm năm"); chỉ tuổi được ghi số ("16 tuổi").
2. Không ghi mã nội bộ (TRI01, MA02, END05, NG03, CLK12) trong lời văn.
3. Không nhắc điểm số (nghiệp, kinh nghiệm, điểm luân hồi).
4. **Quên sạch**: nhân vật không "nhớ lại kiếp trước". Viết "cảm giác đã từng", "mảnh mộng chợt hiện", "như đã thấy ở đâu".
5. Không ghi thẳng tên người/nơi/thế lực trong bảng mã; không tạo tên riêng mới.
6. Người đã chết không sống lại.
7. Người Gác Bến không lộ thân phận trước `loi[4]`.
8. Màn kết không chép câu kết cố định.
9. Phần B: chỉ đổi chữ; `npm run content:chu` phải Đạt.

## 8. Bảng lô

| lô | phần | tệp | kiểm |
|---|---|---|---|
| 1 | A | `mong-an/MA02.json`, `MA03.json`, `MA04.json`, `MA05.json` | `npm run content:mong` |
| 2 | A | `mong-an/MA06.json`, `MA07.json`, `MA08.json` | như trên |
| 3 | A | `gac-ben/tre_an_may.json`, `ni_co_mu.json`, `ban_canh.json` | như trên |
| 4 | A | `gac-ben/lao_dao.json`, `ba_do.json`, `khao/LOC06.json` (hai cảnh NP12) | như trên |
| 5 | A | `khao/LOC07.json`, `LOC09.json`, `LOC12.json`, `LOC15.json` | như trên |
| 6 | A | `nghi-thuc/NG02.json`, `NG03.json`, `NG04.json` | như trên |
| 7 | A | `ket/END01.json`, `END02.json`, `END03.json` | như trên |
| 8 | A | `ket/END05.json`, `END06.json`, `END07.json`, `END08.json`; rồi `npm run content:mong -- --du` | đủ 33 tệp |
| 9 | B | đại lộ `content/tuyen/DL01.json` … `DL05.json` (mục 1 của sua-sau-ra-soat.md) | `npm run content:chu`, `npm run content:tuyen`, `node tools/mo-phong-tuyen.js DL01 DL02 DL03 DL04 DL05` |
| 10 | B | đại lộ `DL06.json` … `DL09.json` | như trên với DL06–DL09 |
| 11 | B | tuyến xuất thân `OR01.json` … `OR15.json` (mục 2; OR07 N2 xem mục 3) | như trên với OR01–OR15 |
| 12 | B | `OR16.json` … `OR30.json` | như trên |
| 13 | B | `OR31.json` … `OR45.json`; rồi `node tools/mo-phong-tuyen.js` (cả 54) và `node tools/test.js menh_tuyen menh_thu menh_tuyen_d94 tuyen_ra_soat so_tay_nv` | tất cả đạt |

Sau mỗi lô phần A còn chạy `npm run content:check` và `node tools/test.js dai_mong ket_thuc ben_vong_xuyen nhieu_kiep dm_kiem content`.

## 9. Phần B — sửa câu chữ 54 tuyến

Theo `docs/content/GUI-GPT/sua-sau-ra-soat.md`:
- Đại lộ (DL01–DL09): mỗi `mo` mở bằng một cảnh cụ thể rồi mới tới điều phải chọn; nhãn `l` là động từ rõ, đoán được hậu quả; DL02 (Diệt Thế Ma Đồ), DL05 (Huyết Cừu) mỗi hồi có ít nhất một lựa chọn tàn nhẫn thật (**chỉ đổi chữ của lựa chọn có sẵn**, không thêm lựa chọn); đại lộ được gọi người giữ vai bằng `{NPxx}` trong lời văn (người khác với tuyến xuất thân gợi ý nó).
- Tuyến xuất thân: đọc to từng câu `t`; câu phải đọc hai lần mới hiểu thì viết lại ngắn hơn (ví dụ OR41 N3).
- OR07 N2: `{NP08}` giao việc ở LOC12 — lời văn nói rõ người ấy đi tới đó.
- Giữ nguyên ý của hậu quả đã ghi (`e`, `dau`, `dk`): lời mới phải kể đúng việc mà hiệu ứng làm. Luật lời văn như mục 6–7 (bộ kiểm tuyến cũng bắt con số, tên thẳng, mã).

## 10. Mẫu

Đọc kỹ sáu tệp mẫu (đường dẫn ở `0-LOI-NHAN-CHO-GPT.md`). Đoạn trích mẫu `loi[3]` của lão chèo đò:

> "Vòng có ba nút buộc, nằm ở ba nơi cổ," lão nói, mái chèo dừng giữa dòng. "Ngươi đã đi qua cả ba rồi, chỉ là không biết. Chặt cả ba một lúc, sông sẽ thôi chảy ngược. Đừng nghe kẻ bảo ngươi sửa nó. Thứ đã quen ăn không chịu đói lâu."
