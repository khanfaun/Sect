# Hướng dẫn: danh mục vật phẩm từ Excel

Đọc trước khi làm bất cứ việc gì với vật phẩm, công pháp, chiêu thức, đan dược, linh thú, xuất thân. Viết cho người và cho AI ở phiên làm việc sau.

## 1. Tóm tắt

- **Sổ gốc** của mọi nội dung là `docs/vat-pham.xlsx`. Muốn thêm hay sửa đồ thì sửa Excel, không sửa tay trong code.
- Công cụ đọc Excel, kiểm luật, rồi ghi dữ liệu cho game vào `src/data/catalog.js`.
- `src/catalog.js` nối dữ liệu đó vào luật game bằng các **lớp bọc** quanh hàm sẵn có. Bỏ tệp này ra thì game trở lại như cũ.
- **Hiện chỉ là bản thử**: dữ liệu chỉ được ráp vào `phu-sinh-thu.html` (bằng `tools/build-thu.js`). Bản chính `phu-sinh.html` (bằng `tools/build.js`) **chưa dùng** danh mục.
- **Chủ dự án dặn: KHÔNG đưa vào `main` khi chưa được cho phép rõ ràng.** Làm trên nhánh riêng, push lên nhánh đó.
- Chủ dự án không phải lập trình viên: trao đổi bằng tiếng Việt dễ hiểu, ít thuật ngữ.

## 2. Các tệp

| Tệp | Việc |
|---|---|
| `docs/vat-pham.xlsx` | Sổ gốc, 34 trang. Dòng **xanh lá** = đồ có sẵn trong code game (cột Ghi chú có `Có trong game · mã: <mã>`), chỉ để tra, công cụ không đè lên game. |
| `docs/bao-cao-vat-pham.md` | Báo cáo sinh tự động mỗi lần chuyển: số món vào game, dòng bị **BỎ** hoặc tự **sửa**, lý do. |
| `docs/prompt-viet-lai-trang-bi.md` | Prompt đã dùng để GPT viết lại chỉ số trang bị theo luật mới. |
| `docs/mau-vat-pham.md`, `docs/mau-viet-su-kien.md` | Prompt cũ cho GPT (vật phẩm, sự kiện). Phần vật phẩm đã lỗi thời, xem luật mới ở mục 4. |
| `docs/nhap/` | Bản gốc GPT gửi (không sửa): `mau-vat-pham_1.xlsx` (lần 1, luật cũ), `vat-pham-fix.xlsx` (lần 2, luật mới), `phu-sinh-su-kien.md` (sự kiện, **chưa xử lý**). |
| `tools/excel_chung.py` | Bảng tra dùng chung: Dạng → loại món trong game, trang Excel của từng loại, phẩm, vùng, cảnh giới, hệ, đọc dòng Excel. |
| `tools/excel2game.py` | **Chuyển Excel → game.** Kiểm luật, ghi `src/data/catalog.js` và báo cáo. |
| `tools/build-thu.js` | Ráp bản thử `phu-sinh-thu.html` (có danh mục). |
| `tools/ha_chi_so.py` | Nhân đều chỉ số trang bị viết sẵn với một hệ số (mặc định 0.9). Sửa thẳng Excel. |
| `tools/nhap_do_cu.py` | Chép đồ đang có trong code game vào Excel (tô xanh). Chạy lại không sinh dòng trùng, chỉ điền ô trống. |
| `tools/excel_v2.py` | Công cụ chạy **một lần** đã dùng để đổi Excel sang luật vật phẩm mới. Không cần chạy lại. |
| `src/data/catalog.js` | Tệp sinh tự động. **Đừng sửa tay.** |
| `src/catalog.js` | Lớp bọc nối danh mục vào game. |

## 3. Quy trình thường dùng

```bash
python3 tools/excel2game.py
```

```bash
node tools/build-thu.js
```

Sau đó đọc `docs/bao-cao-vat-pham.md`. Mục tiêu: 0 dòng bỏ, 0 chỗ sửa. Nếu có, xem lý do rồi sửa Excel (hoặc sửa công cụ nếu luật của công cụ sai so với game).

Chỉnh mạnh yếu cả loạt trang bị (chạy trước hai lệnh trên):

```bash
python3 tools/ha_chi_so.py 0.9
```

Thử một file Excel khác mà không đè dữ liệu thật: `python3 tools/excel2game.py <file.xlsx> <ra.js> <bao-cao.md>`. Nhớ chạy lại lệnh không tham số sau đó để trả dữ liệu thật về.

Khi `main` có thay đổi: gộp `origin/main` vào nhánh đang làm, rồi so các bảng dữ liệu của game (RELIC_K, REL_POOL, NT_KEYS, REL_M, REL_X, PILL, SK_RAW, ORIGIN, TT_DEST, TT_PHYS, LS_OG…) giữa hai bản để biết Excel có phải sửa không. Cách so: chạy phần lõi `src/core.js` + `src/core2.js` của hai bản trong `vm` của node rồi so JSON.

## 4. Luật vật phẩm hiện tại (theo main, đợt 30–37 trong `src/core2.js`)

**Trang bị và vật tùy thân**
- **Phẩm quyết định số dòng**, **Cảnh giới cần quyết định độ lớn**. Phẩm nào cũng gặp được ở mọi cảnh giới.
- Hệ số theo cảnh giới cần (REL_M): Phàm nhân 1 · Luyện Khí 1,3 · Trúc Cơ 1,7 · Kết Đan 2,2 · Nguyên Anh 2,8 · Hóa Thần 3,5 · Độ Kiếp 4,3.
- Dòng phụ theo phẩm (REL_X): Phàm 0 · Hoàng 1 · Huyền 1 · Địa 2 · Thiên 2 · Tiên 3 · Thần 4. Mã phụ lấy trong 13 mã của REL_POOL.
- Mã gốc theo Dạng = `RELIC_K` của game (trang 02 Excel có bảng tra, đã nhân sẵn theo cảnh giới).
- **Nội tại** (NT_KEYS) có tên riêng, không cộng dồn giữa các món. Nội tại có sẵn trong mã gốc của Dạng thì giữ đủ (trận pháp, túi trữ vật có 2). Chỉ đồ Độc nhất mà Dạng chưa có nội tại mới được thêm 1.
- Nội tại dạng đếm (firstEvade, weakStart, vulnStart, pillSlot) **không** nhân theo cảnh giới. `pillSlot` nay nghĩa là thêm ô túi đồ.
- Cảnh giới cần theo vùng: vùng k → k hoặc k+1 (vùng 0 → Phàm nhân/Luyện Khí … vùng 4 → Nguyên Anh/Hóa Thần; đồ độc nhất vùng 4 được Độ Kiếp).
- Đồ Độc nhất được mạnh hơn tới +40% và có thể có 1 dòng âm (cái giá phải trả).
- Số trong Excel là **số thật** ở đúng cảnh giới cần. Người chơi chỉ thấy chữ (tăng nhẹ / khá / mạnh / rất mạnh), game tự đổi.
- Ô mặc: 9 ô trang bị (1 ô Trang sức), Pháp bảo 3 ô mở ở Trúc Cơ, Kết Đan, Nguyên Anh; 5 ô vật tùy thân.
- Công cụ kiểm: mã gốc đúng Dạng (thiếu thì bù theo số game), số dòng phụ đúng phẩm, không vượt số của game ở cùng cảnh giới quá 25% (độc nhất 40%), chỉ số điểm (tp, ngo, tam, van) làm tròn số nguyên.
- Trong game, đồ viết sẵn mang cờ `fix` (dùng đúng số Excel) và `req`. Đồ thường rơi cùng phẩm, cùng cảnh giới cần như đồ game tự sinh (khoảng một nửa số đồ rơi); đồ độc nhất 3,5% mỗi lần rơi, mỗi kiếp gặp 1 lần.
- Đã hạ 10% toàn bộ chỉ số GPT viết để ngang đồ game tự sinh (đo bằng giá trị trung bình mỗi dòng).

**Nhân vật**
- Thiên phú (mệnh cách) **đã bỏ**. Thay bằng **tiên thiên khí vận** (TT_DEST, 6 bậc) và **thể chất** (TT_PHYS, game tự suy ra). Hai trang này trong Excel **chỉ để tra**, chưa chuyển vào game.
- Xuất thân có thêm: chuyện thơ ấu 2 câu (LS_OG, dùng {ten} {que} {ho}), tính tình (TT_TRAITS, dùng xét thể chất), tâm pháp gia truyền (TP_ORIGIN: 0 Phàm phẩm, 1 Hoàng phẩm) và câu kể (LS_TPG, dùng {ten} {n} {ho}).

**Các nhóm khác** (chưa đổi luật): công pháp, tâm pháp (công cụ quy số GPT về mức gốc vì game tự nhân theo phẩm), chiêu thức (tụ lực được game cộng 35%), đan dược (mượn cách tác dụng của đan gốc cùng loại), phù lục, đan đột phá, phương tiện, linh thú (thêm vào EN và REG_EN), nguyên liệu có tên (chỉ chia phần tổng số của game), vật nhiệm vụ (sự kiện trao bằng `e.item`, lấy lại bằng `e.rmItem`, kiểm `hasItem()`; chưa sự kiện nào dùng).

## 5. Kiểm tra sau khi sửa

- Báo cáo `docs/bao-cao-vat-pham.md` sạch.
- Không có chữ lỗi: nạp phần lõi của `phu-sinh-thu.html` trong `vm` của node (cắt tới mốc `// ================= GIAO DIỆN`), tạo nhân vật, gọi `relicTip(catRelic(x))` cho mọi món, `pillTip`, `artDesc(catArt(a))`, câu tiểu sử xuất thân; tìm `undefined`, `NaN`, `null`, `{` còn sót.
- Máy tự chơi trên bản thử: chép `bot.js` ra thư mục nháp, đổi đường dẫn `phu-sinh.html` thành `phu-sinh-thu.html`, chạy `node <bản chép> 30 --quiet`, so với `node bot.js 30 --quiet` của bản chính. Kết quả rất ngẫu nhiên, nên so nhiều lượt.
- Chụp giao diện: Playwright mở `phu-sinh-thu.html`, đợi qua màn mở đầu kiếp, mở `UI.panel='char'; UI.tab.char='bag'`.

## 6. Việc còn dở

- Sự kiện GPT viết (`docs/nhap/phu-sinh-su-kien.md`) chưa đọc và chưa đưa vào game. Đã thống nhất với chủ dự án: AI đọc như đọc sách, tự lọc, sắp xếp, chuyển thành sự kiện trong code; có chuỗi sự kiện nối tiếp và đủ sắc thái cảm xúc.
- Lỗi có sẵn trong game gốc, chưa sửa vì chủ dự án chưa cho đụng: sự kiện "Nấm mộ quen" cho "Đào lên" nhiều lần, mỗi lần được thêm linh thạch.
- Đưa danh mục vào bản chính: chỉ làm khi chủ dự án đồng ý. Khi đó thêm `src/data/catalog.js` và `src/catalog.js` vào danh sách tệp của `tools/build.js` (sau `src/core2.js`, trước `src/ui/base.js`).
