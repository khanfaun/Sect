# Hướng dẫn viết nội dung đợt hai cho Phù Sinh (dành cho GPT)

Đọc hết tệp này trước khi viết. Bối cảnh từng mục cần viết nằm ở `2-danh-sach.md` (sinh từ mã game, có bảng mã NP/LOC/FA/CLK và mã việc làm).

## 1. Viết gì, game dùng ra sao

| loại | tệp | game hiện lúc nào | thiếu tệp thì |
|---|---|---|---|
| A. Quả chín | `content/qua-chin/<mã việc làm>.json` | 6–18 tháng sau khi nhân vật làm việc ấy, hộp kỳ ngộ "quả chín" hiện ra (chọn một biến thể hợp điều kiện) | một dòng nhật ký chung |
| B. Nghề phàm | `content/nghe-pham/<mã nghề>.json` | `len`: lúc lên bậc nghề; `ket`: ở màn hết kiếp, cho nghề chính (bậc cao nhất) | lời chung "Người trong nghề bắt đầu gọi ngươi là …"; không có kết cục |
| C. Cải căn dọc đường | `content/cai-can/<mã đường>.json` | lúc người chơi vừa bước vào một bước của đường cải căn (hiện khi rảnh, không chen vào trận/hộp khác) | chỉ có một câu mỗi bước như cũ |
| D. Cảnh kể | `content/canh/truy-duoi.json` | kẻ truy đuổi chặn đường (theo loại kẻ đuổi) | lời chung cũ |

Bốn tệp mẫu Claude đã viết, chạy được trong game — ĐỌC KỸ và bám theo: `content/qua-chin/cuu_nguoi.json`, `content/nghe-pham/nong.json`, `content/cai-can/CC01.json`, `content/canh/quan-phu.json`. Không sửa bốn tệp mẫu.

## 2. Được sửa và không được sửa

- CHỈ tạo/sửa tệp `.json` trong: `content/qua-chin/`, `content/nghe-pham/`, `content/cai-can/`, `content/canh/truy-duoi.json`.
- KHÔNG sửa mã (`src/`, `tools/`), không sửa `content/rules`, `content/text`, `content/tuyen`, không sửa tệp tự sinh `src/game/data/*`, không sửa `phu-sinh.html`, không sửa tài liệu.
- Tên tệp = mã (ví dụ `content/qua-chin/bo_thi.json`, `content/nghe-pham/tieu.json`, `content/cai-can/CC02.json`).
- JSON chuẩn: ngoặc kép, không dấu phẩy thừa, không xuống dòng giữa chuỗi, UTF-8.

## 3. Định dạng

### 3.1 Quả chín (`loai: "qua_chin"`)
```json
{
  "schemaVersion": 1,
  "loai": "qua_chin",
  "deed": "bo_thi",
  "bien": [
    { "id": "a", "ten": "…", "t": "…", "c": [ {"id":"…","l":"…","t":"…","e":{…}}, … ] },
    { "id": "b", "dk": {"pham": false}, "ten": "…", "t": "…", "c": [ … ] },
    { "id": "c", "ten": "…", "t": "…", "c": [ … ] }
  ]
}
```
- `bien`: ít nhất **3** biến thể (`id` "a", "b", "c"…). Ít nhất một biến thể KHÔNG có `dk`.
- `ten` (4–40 ký tự) tên hộp; `t` (150–900 ký tự) đoạn kể: việc năm xưa quay lại thế nào.
- `c`: **2–4** lựa chọn. Mỗi lựa chọn: `id` (chữ thường không dấu, `_`), `l` nhãn nút (dưới 60 ký tự), `t` kết quả (60–700 ký tự), tuỳ chọn `dk`, `e`. Ít nhất một lựa chọn không có `dk`.

### 3.2 Nghề phàm (`loai: "nghe"`)
```json
{
  "schemaVersion": 1,
  "loai": "nghe",
  "nghe": "tieu",
  "len": ["(lên bậc 1)", "(lên bậc 2)", "(lên bậc 3)", "(lên bậc 4)", "(lên bậc 5)"],
  "ket": [
    {"id": "A", "ten": "…", "dk": {"bacNgheTu": 4, "nghiep": "thien"}, "t": "…"},
    {"id": "B", "ten": "…", "dk": {"bacNgheTu": 4}, "t": "…"},
    {"id": "C", "ten": "…", "dk": {"bacNgheTu": 2}, "t": "…"},
    {"id": "D", "ten": "…", "t": "…"}
  ]
}
```
- `len`: một đoạn (80–600 ký tự) cho mỗi lần lên bậc, từ bậc 1 tới bậc cuối (số đoạn = số bậc − 1; Binh lính và Quan viên có 7 bậc → 6 đoạn). BẮT BUỘC với 16 nghề chưa có lời thăng bậc (ghi rõ ở `2-danh-sach.md` mục B). Bốn nghề `ngu`, `thuong`, `vo_gia`, `y` đã có: KHÔNG viết `len`.
- `ket`: đúng **4** kết, thứ tự A, B, C, D. Game xét A → B → C, cái đầu tiên hợp điều kiện được chọn; D là dự phòng, KHÔNG có `dk`. Kết đặt ở cảnh cuối đời (đoạn 150–900 ký tự): người ấy chết đi, nghề để lại gì, ai nhớ.
- Điều kiện kết (`dk` của `ket`):

| khoá | nghĩa | ví dụ |
|---|---|---|
| `bacNgheTu` / `bacNgheDen` | bậc nghề từ / tới (0 là bậc đầu) | `"bacNgheTu": 4` |
| `nghiep` | `"thien"` phúc duyên hơn nghiệp chướng, `"ac"` ngược lại | `"nghiep": "ac"` |
| `hanhDao` | `"chinh"` hay `"ta"` (việc làm nghiêng chính/tà) | `"hanhDao": "ta"` |
| `nang` | năng lực tối thiểu (1–100; Khá ≈ 20, Thạo ≈ 35, Lão luyện ≈ 55) | `"nang": {"thuong": 35}` |
| `bacTu` | tiền đang có từ (xu) | `"bacTu": 20000` |
| `pham`, `tuoiTu` | còn là phàm nhân; chết từ tuổi | `"pham": true` |

  Năng lực: `giac` giác quan, `giao` giao tế, `thuong` thương lượng, `canh` cảnh giác, `duoc` nhận dược, `khao` khảo vật, `tu` tự chủ, `nhan` nhẫn nại.
- Nên có: một kết cho người lên bậc cao mà sống tử tế, một kết cho người lên cao bằng thủ đoạn (`nghiep: "ac"` hoặc `hanhDao: "ta"`), một kết bậc giữa, một kết dự phòng cho người chỉ mới vào nghề.

### 3.3 Cải căn dọc đường (`loai: "cai_can"`)
```json
{
  "schemaVersion": 1,
  "loai": "cai_can",
  "duong": "CC02",
  "ev": [
    {"buoc": 0, "id": "…", "ten": "…", "t": "…", "c": [ … ]},
    {"buoc": 1, "id": "…", "ten": "…", "t": "…", "c": [ … ]}
  ]
}
```
- Mỗi bước liệt kê ở `2-danh-sach.md` mục C (trừ bước nghi thức gạch ngang) phải có ít nhất một sự kiện có `buoc` đúng số ấy. Viết thêm sự kiện thứ hai cho cùng bước thì game chọn một.
- Sự kiện là chuyện xảy ra BÊN LỀ bước ấy (người gặp, việc nhỏ phải chọn), KHÔNG thay kết quả bước (không cho vật tư, không cho thành công nghi thức, không đổi linh căn). Lựa chọn chỉ dùng hiệu ứng ở mục 4.
- `c`: 2–4 lựa chọn như mục 3.1.

### 3.4 Cảnh kể truy đuổi (`loai: "canh"`, `nhom: "truy"`)
```json
{
  "schemaVersion": 1,
  "loai": "canh",
  "nhom": "truy",
  "canh": {
    "thu":  [{"t": "…"}, {"t": "…"}, {"t": "…"}],
    "tac":  [ … ], "tu": [ … ], "ke": [ … ], "quy": [ … ], "no": [ … ], "cuop": [ … ]
  }
}
```
- Đủ 7 khoá, mỗi khoá ≥ **3** biến thể; mỗi `t` 80–600 ký tự; có thể thêm `dk` (`pham`, `tuoiTu`, `tuoiDen`), ít nhất một biến thể không `dk`.
- Gọi kẻ đuổi bằng `{ke}` (game thay bằng tên, ví dụ "Sơn tặc", "Sai dịch quan phủ"). Chỉ viết cảnh chặn đường; KHÔNG viết câu "dừng chân giữa đường" hay "thần thức báo trước" (game tự nối), KHÔNG viết lựa chọn (game thêm đánh/chạy/nộp/thương lượng).
- Ví dụ một biến thể `tac`: `{"t": "Tiếng tù và rúc lên sau rặng lau. {ke} nhảy ra chắn ngang lối, lưỡi đao mẻ còn dính bùn, mấy tên đàn em cười hô hố vây kín hai bên."}`

## 4. Điều kiện `dk` của biến thể / lựa chọn và hiệu ứng `e`

`dk` (biến thể, lựa chọn): `pham` (true chỉ phàm nhân, false chỉ tu sĩ), `tuoiTu`, `tuoiDen`, `bacTu` (phải có ít nhất số xu này), `canhGioiTu` (0–5, tự ngầm là tu sĩ).

`e` (chỉ trong lựa chọn):

| khoá | nghĩa | ví dụ |
|---|---|---|
| `bac` | tiền phàm, **số nguyên xu** (âm là trả) | `"bac": -300` |
| `deed` | ghi một việc làm vào sổ nghiệp (mã ở `2-danh-sach.md` mục F) | `"deed": "bo_thi"` |
| `hp` | khí huyết, phần trăm dạng chuỗi | `"hp": "-10%"` |
| `h` | giờ trôi qua 1–720 | `"h": 8` |
| `tamma` | tâm ma −15…15 (âm là lòng nhẹ đi) | `"tamma": -2` |
| `nang` | rèn năng lực −3…3 | `"nang": {"nhan": 1}` |

### Đơn vị tiền (rất quan trọng)
- 1 lượng bạc = 1000 xu. Một bữa cơm thường khoảng hai mươi xu, một tháng cơm khoảng sáu trăm xu, thuê nhà trấn một tháng một trăm năm mươi xu.
- Lựa chọn trả tiền thì PHẢI có `"dk": {"bacTu": N}` với cùng số N, để người không đủ tiền không bấm được.
- Tiền chỉ ghi trong `e.bac` / `dk.bacTu`; lời văn KHÔNG ghi số ("vài đồng", "một túi bạc", "nửa tháng tiền công").
- Không có linh thạch trong đợt này (đa số người đọc là phàm nhân).

## 5. Chỗ thay trong lời văn
`{ten}` tên nhân vật, `{que}` quê, `{NPxx}` người đang giữ vai (tên đổi theo thế giới), `{NPxx.vai}` tên vai, `{NPxx.noi}` nơi của vai, `{LOCxx}` nơi neo, `{FAxx}` thế lực; riêng tệp truy đuổi thêm `{ke}`. Không chỗ thay nào khác.

## 6. Giọng văn, điều cấm

### Giọng văn
- U tối nhưng có hơi ấm: đời khổ, người nhỏ bé, cái giá thật; nhưng luôn có một chi tiết người với người (bát cháo, gáo nước, câu dặn). Không anh hùng ca, không hài nhảm.
- Gọi nhân vật chính là "ngươi". Câu ngắn vừa, cụ thể (mùi, tiếng, vật), ít tính từ chung chung.
- Quả chín: kể rõ việc năm xưa quay lại — đừng nói "nghiệp báo", hãy cho thấy người/vật mang nó tới. Ác thì không phải lúc nào cũng trả thù bằng máu: có thể là ánh mắt, một đứa trẻ mồ côi, một món nợ.
- Lựa chọn phải khác nhau thật (khác cái giá, khác lòng), không có lựa chọn "đúng" hiển nhiên.

### CẤM (bộ kiểm báo lỗi)
1. Con số trong lời văn (kể cả "3 ngày", "100 xu"); chỉ tuổi được ghi số ("16 tuổi").
2. Nhắc điểm số: điểm nghiệp, nghiệp +, kinh nghiệm, karma.
3. Tên riêng mới (người, nơi, phái). Dùng mã NP/LOC/FA hoặc gọi chung ("một bà cụ", "gã lái buôn", "ngôi chùa nhỏ ven đường"). Tên thật của NP/LOC/FA cũng không ghi thẳng — dùng `{NPxx}`/`{LOCxx}`/`{FAxx}`.
4. Mã không có (deed, nghề, đường, khoá năng lực, NP/LOC/FA).
5. Thiếu số lượng (biến thể, lựa chọn, kết, bước).
6. Người đã chết sống lại, hay người chơi bỗng thành tu sĩ / có linh căn trong sự kiện (cải căn chỉ thành ở nghi thức).

### Ví dụ đúng / sai
| sai | đúng |
|---|---|
| `"t": "Gã trả ngươi 50 xu."` | `"t": "Gã dúi vào tay ngươi mấy đồng xu ấm hơi người."`, `"e": {"bac": 50}` |
| `"t": "Lão Trương Đại Hổ ở Hắc Phong Trại tìm tới."` | `"t": "Một gã râu quai nón từ trại cướp trên núi tìm tới."` |
| `"t": "Nghiệp của ngươi giảm, phúc duyên +2."` | `"t": "Người đàn bà cúi đầu thật thấp rồi bế con đi vào bóng tối."`, `"e": {"tamma": -2}` |
| `{"id":"tra","l":"Trả tiền","e":{"bac":-500}}` | `{"id":"tra","l":"Trả tiền","dk":{"bacTu":500},"e":{"bac":-500}}` |
| `"bac": -0.5` (nửa lượng) | `"bac": -500` |
| cảnh truy: `"… Ngươi phải dừng chân giữa đường."` | bỏ câu ấy, game tự nối |

## 7. Chia lô (14 lô, mỗi lô 4 tệp hoặc ít hơn)

| lô | loại | tệp cần viết |
|---|---|---|
| 1 | quả chín | `content/qua-chin/cuu_nguoi_hy_sinh.json`, `bo_thi.json`, `tha_ke_ac.json`, `phong_sinh.json` |
| 2 | quả chín | `giet_thu_cuu_sinh.json`, `hanh_hiep.json`, `an_tang.json`, `diet_mon_ma.json` |
| 3 | quả chín | `giet_vo_toi.json`, `diet_khau.json`, `trom_ngheo.json`, `ban_dong_doi.json` |
| 4 | quả chín | `bo_roi_gia_dinh.json`, `tham_o.json`, `pha_phong_an.json`, `dao_mo.json` |
| 5 | nghề (chỉ `ket`) | `content/nghe-pham/ngu.json`, `thuong.json`, `vo_gia.json`, `y.json` |
| 6 | nghề (`len` + `ket`) | `tieu.json`, `mo.json`, `ren.json`, `tho.json` |
| 7 | nghề (`len` + `ket`) | `chep.json`, `tram.json`, `binh.json` (6 đoạn len), `quan.json` (6 đoạn len) |
| 8 | nghề (`len` + `ket`) | `sat.json`, `trom.json`, `hat.json`, `do.json` |
| 9 | nghề (`len` + `ket`) | `chuong.json`, `san.json`, `tieu_su.json`, `khat_cai.json` |
| 10 | cải căn | `content/cai-can/CC02.json`, `CC03.json`, `CC04.json`, `CC05.json` |
| 11 | cải căn | `CC06.json`, `CC07.json`, `CC08.json`, `TAY_TUY.json` |
| 12 | cải căn | `QUAN_DINH.json`, `HUYET_TE.json`, `LINH_CO.json`, `THIEN_LOI.json` |
| 13 | cải căn | `XA_LOI.json`, `TUC_CAN.json`, `DUOC_NHAN.json`, `TAO_HOA.json` |
| 14 | cảnh kể | `content/canh/truy-duoi.json` (7 khoá × ≥ 3) — rồi chạy kiểm đủ `--du` |

Tổng: 16 quả chín (+ 1 mẫu), 20 nghề (+ 1 mẫu), 16 đường cải căn (+ 1 mẫu), 1 tệp cảnh kể (+ 1 mẫu).

## 8. Quy trình mỗi lô
1. Viết các tệp của lô (đọc bối cảnh ở `2-danh-sach.md`).
2. Chạy `npm run content:gpt`. Có dòng `✗ Lỗi` thì sửa đúng tệp/dòng/khoá được chỉ, chạy lại tới khi in **Đạt**. Cảnh báo `⚠` nên sửa nếu hợp lý.
3. Chạy `npm run content:check` (phải Đạt) và `node tools/test.js noi_dung_2 nd2_kiem content` (phải "Tất cả đạt").
4. Commit chỉ các tệp của lô: `git add content/qua-chin content/nghe-pham content/cai-can content/canh` rồi `git commit -m "Nội dung đợt hai: lô N (…)"`.
5. Lô 14 xong: chạy `npm run content:gpt -- --du` (đòi đủ mọi tệp) tới khi Đạt.

### Tự kiểm trước khi chạy lệnh
- Tên tệp = mã; `schemaVersion` 1; `loai` đúng.
- Không chữ số trong lời văn (trừ tuổi); không tên riêng mới; tiền là xu nguyên; lựa chọn trả tiền có `dk.bacTu`.
- Đủ: ≥ 3 biến thể (quả chín), 4 kết + đúng số đoạn `len` (nghề), mỗi bước một sự kiện (cải căn), 7 khoá × ≥ 3 (truy đuổi).
