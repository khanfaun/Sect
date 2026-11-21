# Gói GPT đợt năm — hướng dẫn (đọc hết rồi mới viết)

Bạn viết **lời văn và nội dung** cho game Phù Sinh. Không sửa mã. Đợt này gồm 6 phần (lô 1–6). Làm lần lượt, mỗi lô một commit.

## 0. Cách làm việc
1. `npm install` (lần đầu). Tạo nhánh từ nhánh Claude: `git fetch origin && git checkout -b codex/phu-sinh-noi-dung-5 origin/claude/busy-cray-fctc4p`.
2. **Đọc trước** `docs/content/GUI-GPT-3/1-huong-dan.md` (bối cảnh Đại Mộng, giọng văn, điều cấm, bảng mã `{LOC..}` `{NP..}` `{FA..}`). **Mọi luật ở đó áp dụng nguyên:** không con số trong lời văn, không nhớ lại kiếp trước (quên sạch), không lộ thân phận Người Gác Bến sớm, không tạo người/nơi mới ngoài mã có sẵn, gọi người chơi là "ngươi", câu ngắn, chi tiết cụ thể, không giải thích thừa.
3. Chỉ sửa đúng chỗ ghi ở từng lô (bảng ở mục 7). Không đụng `src/`, `tools/`, `content/rules`, tệp tự sinh, `phu-sinh.html`.
4. Kiểm sau mỗi lô: mỗi tệp JSON đọc được (`node -e "JSON.parse(require('fs').readFileSync(process.argv[1],'utf8'))" <tệp>`); lô sửa trong `content/` thì chạy `npm run content:check` (phải in Đạt, không lỗi) và `npm run content:chu` nếu đổi `content/tuyen`.
5. Commit từng lô riêng, đẩy `git push -u origin codex/phu-sinh-noi-dung-5`. Không mở PR, không gộp nhánh. Báo ngắn: xong lô nào, số tệp, lệnh kiểm in gì, chỗ băn khoăn.

## 1. Lô 1–6: sự kiện và kết cục sáu tu đạo (bản thảo)
Sáu nghề tu mới, mỗi nghề **12 sự kiện + 4 kết cục**. Thiết kế gốc (tên sự kiện, kết cục, rủi ro) nằm ở `docs/thiet-ke/PHAN-TICH-HOP-NHAT.md`, mục "7.4 Mười chín tu đạo", dòng của từng nghề. Đọc đúng dòng đó để bám tên các sự kiện và kết cục. Luật cái giá của nghề nằm ở `content/rules/nghe-tu-mo-rong.js` (đọc để biết nghề có cơ chế gì, đừng viết trái).

| Lô | Nghề | Mục trong 7.4 | Tệp bản thảo |
|---|---|---|---|
| 1 | Cổ sư | số 12 | `ban-thao/L1-co-su.json` |
| 2 | Phật tu | số 15 | `ban-thao/L2-phat-tu.json` |
| 3 | Thi tu | số 16 | `ban-thao/L3-thi-tu.json` |
| 4 | Thương tu | số 17 | `ban-thao/L4-thuong-tu.json` |
| 5 | Thiên cơ sư | số 18 | `ban-thao/L5-thien-co-su.json` |
| 6 | Nho tu | số 19 | `ban-thao/L6-nho-tu.json` |

Định dạng và độ dài: theo `mau/su-kien-nghe.mau.json`. Mỗi sự kiện: `ten`, `text` (2–3 đoạn, mỗi đoạn 2–4 câu), 2–3 `choices` (mỗi lựa chọn `l` nhãn ngắn, `t` kết quả 2–3 câu, **khác nhau thật**, và `e` để `{}` — Claude gắn hiệu ứng). Mỗi kết cục: `ten`, `canh` (2 đoạn). Chỗ nào cần mã nơi/thế lực, dùng mã có sẵn trong bảng mã.

## 2. Lô 7: biến thể bản thảo (thêm lời, không tạo cơ chế mới)
Tệp `ban-thao/L7-bien-the.json`, khoá theo `mau/bien-the.mau.json`:
- `tin_don_END02`, `tin_don_END03`, `tin_don_END06`: mỗi kết thêm **6 tin đồn mới** (1–2 câu, giọng người đi đường), không trùng 4 tin đã có trong `content/dai-mong/hau-qua/ENDxx.json`.
- `ky_ngo_A1`, `ky_ngo_A2`: mỗi kỳ ngộ thêm **2 bản kể khác** (đoạn `text` mở đầu khác, cùng hai lựa chọn gốc, `t` viết lại khác chữ). Xem `content/dai-mong/ky-ngo/A1.json`, `A2.json`.
- `gac_ben_hien_them`: thêm **2 đoạn `hien`** (cảnh gặp) cho mỗi dạng Người Gác Bến ở `content/dai-mong/gac-ben/*.json` (5 dạng), không lộ thân phận.

## 3. Lô 8: viết lại chữ tính năng mới (sửa giá trị trực tiếp trong `content/`)
CHỈ đổi **giá trị chữ**, không đổi khoá, không đổi chỗ `{0}` `{1}` (giữ nguyên số lượng và thứ tự tham số), không thêm bớt khoá:
- `content/text/nghe-tu-mo-rong.json` (57 khoá: tên hiệu ứng, lời nghề tu mới).
- `content/text/truy-na.json` (lời truy nã, hoãn sự kiện, Quan phủ, Chấp pháp đường).
- `content/text/dat-dai.json` chỉ các khoá bắt đầu bằng `dat.mua` và `dat.nha` (mua đất, nhà riêng).
Tên công pháp và chiêu của 9 nghề mới trong `content/catalog/arts.json` (mã `cp_tu17`…`cp_tu25`) chỉ đổi khoá `n` (tên) và `d` (mô tả). Tên chiêu `sk17a`…`sk25c` ở `content/items/sk-raw.js`: chỉ đổi `n` và `d`, không đụng số. Giữ giọng cổ phong, tên ngắn 2–4 chữ, mô tả 1 câu không số.

## 4. Lô 9: ba tên riêng còn lại
`content/tuyen/DL01.json`, `DL02.json`, `DL04.json`: chỉ đổi khoá `ten` (đang là "Thăng Lộ", "Thế Ma Đồ", "Giáp Thiên Hạ" bị bộ kiểm báo tên riêng). Đổi sang cách gọi chung, giữ nghĩa, như đã làm với DL06–08. Chạy `npm run content:chu` và `npm run content:check`; ba cảnh báo phải hết.

## 5. Điều cấm riêng đợt này
- Không viết cơ chế mới, không nhắc con số (tuổi, tiền, số lần) trong lời văn.
- Phật tu không giảng đạo dài; Nho tu không khoe chữ; Thi tu và Cổ sư rùng rợn vừa phải, kể bằng chi tiết đời thường; Thương tu không đạo lý hoá; Thiên cơ sư luôn có cái giá, không bói đúng tuyệt đối.
- Không tên người/nơi mới (dùng mã hoặc gọi chung: "một lão nông", "gã lái buôn").

## 6. Tự kiểm trước khi trả
- [ ] Mỗi sự kiện có 2–3 lựa chọn và kết quả khác nhau; không `e` thật.
- [ ] Mã `{..}` có thật trong bảng mã.
- [ ] Không con số, không "kiếp trước", không tên mới.
- [ ] Lô 8–9: `npm run content:check` Đạt.

## 7. Thứ tự gợi ý
Lô 9 (nhỏ nhất) → 8 → 7 → 1 → 2 → 3 → 4 → 5 → 6. Nếu hết thời gian, dừng sau lô nào xong lô đó, commit, đẩy.
