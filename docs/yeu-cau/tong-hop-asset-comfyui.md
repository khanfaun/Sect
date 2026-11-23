# Yêu cầu tổng hợp: làm thêm ảnh (asset) cho Phù Sinh bằng ComfyUI MCP

Dán nguyên tệp này vào phiên mới. Đọc `CLAUDE.md` trước. Người dùng không phải lập trình viên: trả lời ngắn, dễ hiểu, ít thuật ngữ.

## Quy tắc chung cho mọi ảnh
- Ảnh để ở `src/assets/ui/*.webp` (tự nhúng vào trang khi build). Gắn ảnh vào game ở `src/react/giao-dien/anh.js` (dùng `I('tên')`).
- **Phong cách phải khớp ảnh sẵn có**: tranh 2D tiên hiệp cổ phong, nét mềm, màu ngọc bích / vàng đồng / xám đá, ánh sáng từ trên trái. Trước khi tạo, **xem vài ảnh mẫu trong `src/assets/ui/`** và dùng làm ảnh tham chiếu phong cách (img2img / IPAdapter nếu ComfyUI có).
- Nền **trong suốt** (nếu không ra thì xoá nền bằng RMBG/BiRefNet), kiểm bằng mắt viền không còn quầng trắng. Không chữ, không khung.
- Lưu webp có alpha, mỗi ảnh nhỏ nhất có thể (trang nhúng hết ảnh vào một tệp HTML, hiện ~7.6 MB; ảnh nhỏ dưới ~25 KB, ảnh lớn như nhân vật dưới ~150 KB).
- Làm xong: `npm run build`, `node tools/test-ui.js`, `node tools/test.js` (**không chạy bot**, bỏ bài `smoke`). Chụp vài ảnh màn hình (điện thoại 400×820, máy tính 1440×860) gửi người dùng xem. Đạt hết thì gộp và đẩy lên `main`.
- Ảnh nào chưa làm thì **game vẫn chạy bằng ảnh tạm / biểu tượng cũ**, không được để trống.

## Thứ tự ưu tiên
1. Ảnh địa điểm trên bản đồ (phần A, nhiều nhất, người chơi thấy mọi lúc).
2. Chân dung nữ lão giả + ngoại hình nhân vật các độ tuổi (phần B, C).
3. Biểu tượng pháp bảo, phương tiện (phần D, E).
4. Còn lại (phần F).

---

## Phần A. Ảnh địa điểm trên bản đồ

### Mục tiêu
Trên bản đồ lớn, mỗi địa điểm hiện đang vẽ bằng một **huy hiệu tròn + ký hiệu vẽ tay** (hàm `badge()` trong `src/game/ui/05-gfx.js`, khoảng dòng 351–360). Thay bằng **ảnh 2D vẽ sẵn** (kiểu công trình thu nhỏ, nhìn chéo từ trên xuống), và **cùng một loại nơi nhưng quy mô khác nhau thì ảnh khác nhau**: thôn nhỏ trông nghèo nàn, đại thành trông đồ sộ; sơn môn nhỏ đơn sơ, đại tông lộng lẫy; nơi đổ nát trông tàn tạ.

Đọc CLAUDE.md trước. Người dùng không phải lập trình viên: trả lời ngắn, dễ hiểu.

### Phong cách ảnh (phải khớp ảnh đang có)
- Tham khảo: `src/assets/ui/bd-*.webp` (công trình tông môn) và ảnh công trình trong màn địa điểm (`src/react/giao-dien/cong-trinh.js`). Xem vài ảnh đó trước khi tạo, dùng làm ảnh mẫu phong cách (img2img / IPAdapter nếu ComfyUI có).
- Kiểu: tranh 2D tiên hiệp cổ phong, góc nhìn isometric chéo ~30°, nét mềm, màu ngọc bích / vàng đồng / xám đá, ánh sáng từ trên trái, có bóng đổ nhẹ dưới chân.
- **Nền trong suốt**, vật thể nằm giữa, chân đế ở **giữa cạnh dưới** (để đặt đúng vào ô bản đồ). Không chữ, không khung, không viền tròn.
- Phải nhận ra được khi nhỏ (bản đồ vẽ ảnh chỉ cỡ 28–64px): hình khối rõ, bóng dáng đặc trưng, không chi tiết vụn.

### Thông số tệp
- Tạo ở 512×512 hoặc 768×768, xoá nền (nếu ComfyUI không ra nền trong suốt thì dùng nút xoá nền như RMBG/BiRefNet), kiểm tra bằng mắt viền không còn quầng trắng.
- Cắt sát vật thể chừa lề ~6%, thu về **192×192**, lưu **webp có alpha** vào `src/assets/ui/` tên `map-<loại>-<bậc>.webp` (ví dụ `map-thanh-3.webp`, `map-tran-1.webp`, `map-tong-4.webp`, `map-phe-ruin.webp`).
- Mỗi ảnh nên dưới ~25 KB (trang nhúng hết ảnh vào một tệp HTML).

### Danh sách ảnh cần làm
Loại nơi lấy từ `content/world/size-t.js` (`SIZE_T`), `NODE_CAT` trong 05-gfx.js. Bậc quy mô gợi ý:

| Loại (`n.type`) | Nghĩa | Bậc | Mô tả từng bậc |
|---|---|---|---|
| `tran` | trấn phàm nhân | 1–3 | 1: thôn nhỏ vài nóc nhà tranh · 2: trấn vừa, vài mái ngói, giếng, rào gỗ · 3: trấn lớn, chợ, cổng gỗ, nhiều mái |
| `thanh` | thành phàm nhân | 1–3 | 1: thành trì tường đất, một cổng · 2: thành cổ tường đá cao, lầu canh · 3: đại thành, tường nhiều lớp, cung điện giữa |
| `tutran` | trấn tu sĩ | 1–2 | như trấn nhưng có đèn linh quang, cờ phù, mái cong xanh ngọc |
| `tuthanh` | thành tu sĩ | 1–2 | thành có trận pháp mờ bao quanh, tháp linh, đảo nổi nhỏ |
| `tong` | tông môn | 1–4 (`n.quy`) | 1: sơn môn nhỏ, một điện trên núi · 2: vài điện, cầu thang đá · 3: quần thể điện các, thác · 4: đại tông, đỉnh núi lơ lửng, mây quấn |
| `cho` | phường thị | 1–2 | vài sạp vải che / dãy sạp, đèn lồng |
| `ancu` | ẩn cư | 1 | túp lều tranh dưới gốc tùng |
| `dong` | động phủ | 1–2 | cửa hang đá / cửa hang có cấm chế phát sáng |
| `khoang` | mỏ khoáng | 1–2 | lối mỏ gỗ chống / mỏ lớn có tinh thạch lộ ra |
| `duoc` | dược viên | 1–2 | luống dược thảo / dược viên có rào, linh chi lớn |
| `linhdia` | linh địa | 1–2 | suối linh khí / đài đá có linh quang |
| `rung`, `nui`, `song`, `bien`, `hoang`, `dam` | thiên nhiên | 1 mỗi loại | cụm cây cổ thụ / núi đá nhọn / bến sông có thuyền / đảo đá ngoài khơi / bãi hoang có xương thú / đầm lầy cây chết |
| `thien` | thiên môn | 1 | cổng đá giữa biển mây |
| `phe`, `ditich` | phế tích, di tích | 1–2 | vài cột đá đổ / điện cổ sụp một nửa |
| `como` | cổ mộ | 1–2 | bia mộ đá / lăng có tượng đá canh |
| `bicanh`, `dongthien` | bí cảnh, động thiên | 1–2 | khe nứt không gian phát sáng tím / cổng vòm có xoáy sáng |
| `ma`, `sao`, `yeusao` | ma vực, sào huyệt, yêu sào | 1–2 | đất nứt đỏ, khói đen / hang có xương, mắt đỏ |
| `ai` | quan ải | 1 | cửa ải đá chắn giữa hai vách núi |
| (mọi thành trấn) | **đổ nát** (`state==='ruin'`) | `-ruin` | `map-tran-ruin`, `map-thanh-ruin`, `map-tong-ruin`: cháy sém, mái sập |

Ưu tiên làm trước: `tran` 1–3, `thanh` 1–3, `tong` 1–4, `tutran`, `tuthanh`, `ruin`. Loại hoang dã làm sau. Loại nào chưa có ảnh thì **giữ huy hiệu cũ** (không được để trống).

### Cách chọn bậc cho mỗi nơi (cần thêm vào luật)
Hiện thành/trấn chưa lưu bậc quy mô: dòng chữ "Thôn nhỏ / Trấn vừa / Trấn lớn", "Thành trì / Thành cổ / Đại thành" được chọn bằng băm trong `placeMeta()` (`src/game/core2/02-dia-diem-mo-rong.js`, dòng ~97). Cần:
- Viết hàm `capOf(n)` trả bậc 1–3 (hoặc 1–4 với tông môn = `n.quy`), **dùng chung cho cả `placeMeta()` lẫn bản đồ**, để chữ "Đại thành" và ảnh đại thành luôn khớp nhau. Có thể kết hợp số ô của nơi (`n.cells`, theo `SIZE_T`) nếu hợp lý.
- Không lưu gì mới vào `G.run` (tính lại được từ seed) để bản lưu cũ vẫn chạy.
- Thêm `dbg('map.anh',{...})` khi nạp ảnh, và bài luật trong `tools/test.js` (cuối danh sách, giữ seed) kiểm `capOf` khớp chữ quy mô.

### Gắn vào bản đồ
- Bản đồ là canvas trong `src/game/ui/05-gfx.js`; ảnh trong `src/assets/ui` được nhúng khi build (xem cách `src/react/giao-dien/anh.js` lấy ảnh qua `I('tên')` / `ASSET`). Cần cách cho canvas lấy được ảnh đó (tạo `Image()` từ data URI, nạp một lần, vẽ lại khi nạp xong).
- Vẽ ảnh thay `badge()`; giữ: viền sáng khi đang chọn, mờ / nét đứt khi chưa chắc (`!sure` → vẽ mờ hoặc vẫn dùng huy hiệu "?"), màu nguy hiểm (có thể là chấm nhỏ hoặc quầng dưới chân), tên nơi bên dưới.
- Kích thước ảnh theo mức phóng và theo bậc (bậc cao to hơn một chút). Nơi người chơi đang đứng vẫn phải thấy rõ nhân vật.
- Có chế độ tiết kiệm (Cấu hình) thì vẫn chạy được.

### Kiểm tra
- `npm run build`, rồi `node tools/test-ui.js` — thêm bài mới kiểm: ảnh đã nạp, bản đồ vẽ không lỗi, loại chưa có ảnh vẫn ra huy hiệu.
- Chụp vài ảnh bản đồ ở mức phóng gần và xa (điện thoại 400×820 và máy tính 1440×860) gửi người dùng xem.
- **Không chạy bot** (bỏ bài `smoke`).
- Đạt hết thì gộp và đẩy lên `main`.

---

## Phần B. Chân dung nữ lão giả
- Hiện chân dung nhân vật chính: `cd-nam`, `cd-nu` (trẻ), `cd-lao` (lão giả nam). **Thiếu lão giả nữ**: nữ từ 70 tuổi vẫn hiện mặt trẻ.
- Làm `cd-lao-nu.webp` cùng khổ, cùng phong cách với `cd-lao.webp` (192×192) và `cd-nu.webp`.
- Gắn: `src/react/giao-dien/anh.js`, dòng `A.heroG = {...}` và getter `A.hero.me` (đang chỉ dùng `lao` cho nam). Thêm khoá `laonu`, sửa getter để nữ ≥70 tuổi dùng nó.

## Phần C. Ngoại hình nhân vật ngồi thiền theo độ tuổi
- Hệ thống ở `src/game/core2/84-ngoai-hinh.js` (`NH_TUOI`). Hiện chỉ có bộ ảnh cho **thanh niên** (`ch-head-r1`, `ch-hmv-r1`, `ch-of-hero`) và **lão giả** (`ch-head-e1`, `ch-hmv-e1`, `ch-of-e1`). **Thiếu thiếu niên (dưới 20 tuổi) và trung niên (40–70)**: đang tạm dùng bộ gần nhất.
- Mỗi độ tuổi cần: ảnh đầu+tóc `ch-head-<tên>` (640×640), mặt nạ tóc `ch-hmv-<tên>` (cùng khổ, xem mẫu `ch-hmv-r1`), áo `ch-of-<tên>`. Đặt cùng bố cục, cùng vị trí với bộ có sẵn để xếp chồng khớp (xem `src/react/giao-dien/NhanVatThien.jsx`, `doll3.css`).
- Gợi ý: thiếu niên: tóc buộc cao, áo vải giản dị; trung niên: tóc búi, râu ngắn, áo bào xanh trầm.
- Gắn: điền `toc`/`ao` của độ tuổi đó trong `NH_TUOI` (ví dụ `toc:[['t1','Tóc buộc cao']]`, `ao:[['t1','Áo vải']]`). Nữ nên có bản riêng nếu đủ sức (`r.g==='nu'`, hiện chưa tách).
- Bài luật `ngoai_hinh` trong `tools/test.js` đã có; cập nhật nếu đổi.

## Phần D. Biểu tượng pháp bảo thiếu ảnh riêng
Sáu loại đang mượn ảnh tạm (`ITEM` trong `anh.js`). Mỗi loại làm 1 ảnh **128×128** cho đúng loại, rồi đổi tên trong `ITEM`:

| Khoá | Loại | Đang mượn | Cần vẽ |
|---|---|---|---|
| `gang` | găng tay / hộ thủ | `it-nhan` | đôi găng tay giáp, thêu vân |
| `non` | mũ / quan / đấu lạp | `it-mu` | mũ ngọc quan hoặc đấu lạp |
| `hap` | hộp kiếm | `it-ruong` | hộp kiếm dài khảm ngọc |
| `dai` | đai lưng | `it-dai` | đai lưng có khoá ngọc |
| `hoa` | linh hỏa | `sk-fire` | ngọn lửa linh trong đèn / lòng bàn tay |
| `tran` | trận đồ / trận kỳ | `it-co` | trận bàn tròn khắc phù văn |

Tên tệp gợi ý: `it-gang`, `it-non`, `it-hap`, `it-dai-lung`, `it-hoa`, `it-tran`.

## Phần E. Hình phương tiện
- Phương tiện chọn hình theo tên (`vehKind` trong `src/game/data/05-content-runtime.js`). Đã có ảnh: hạc (`mt-crane`), kiếm (`mt-sword`), chim (`mt-phoenix`), thuyền (`mt-turtle`, đang là rùa, tạm). **Chưa có ảnh: ngựa (`ngua`, cả xe, lạc đà, trâu, dê, báo) và hươu (`loc`)**: đang dùng hình vẽ vector cũ.
- Cần: `mt-horse.webp` (xe / ngựa / thú cưỡi trên đất), `mt-deer.webp` (hươu mây), và nên có `mt-boat.webp` (thuyền thật, thay rùa).
- Khổ **320×240**, nền trong suốt, giống phong cách `mt-crane`. Gắn trong `anh.js` ở dòng `A.veh.hac = ...` (thêm `A.veh.ngua`, `A.veh.loc`, đổi `A.veh.rua`).

## Phần F. Tuỳ chọn, làm sau
- Ảnh kẻ địch: các thú (`f==='thu'`, 76 loài) hiện dùng ảnh/vector cũ, người / quỷ / boss chỉ có 3 ảnh dùng chung (`mo-kim-giap`, `mo-tam-ma`, `mo-huyet-ma`). Muốn đẹp hơn thì làm ảnh riêng cho các loại hay gặp (danh sách ở `content/catalog/beasts.json`, gắn vào `A.foe[khoá]`).
- Ảnh nguyên liệu: đang mượn 3 ảnh chung (thảo, khoáng, đan); có sẵn ảnh chưa dùng `it-linh-chi`, `it-nhan-sam`, `it-quang-do` có thể gắn tạm cho thảo dược / quặng khác nhau.
- Ảnh chưa dùng trong `src/assets/ui`: `ban-do-hanh-trinh`, `chan-dung`, `nv-nam`, `de-tu-*` (không cần làm thêm, chỉ để biết).
