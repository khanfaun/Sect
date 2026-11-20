# Gói GPT đợt bốn — hướng dẫn (đọc hết rồi mới viết)

Bạn viết **lời văn** cho game Phù Sinh. Bạn không sửa mã. Đợt này nhỏ, gồm 3 phần, tổng 8 tệp nháp + 3 chỗ sửa tên.

## 0. Cách làm việc
1. Lần đầu: `npm install`. Tạo nhánh từ nhánh Claude: `git fetch origin && git checkout -b codex/phu-sinh-noi-dung-4 origin/claude/busy-cray-fctc4p`.
2. **Chỉ tạo tệp trong `docs/content/GUI-GPT-4/ban-thao/`** (phần A, B) và chỉ đổi khoá `ten` trong 3 tệp `content/tuyen/DL06.json`, `DL07.json`, `DL08.json` (phần C). Không đụng nơi nào khác (Claude sẽ nhập bản nháp vào game, vì phần này cần nối luật).
3. Đọc trước, để nắm giọng văn, điều cấm, bảng mã `{LOC..}` `{NP..}` `{FA..}`: `docs/content/GUI-GPT-3/1-huong-dan.md` (mục luật viết bắt buộc, giọng văn, điều cấm, bảng mã). **Mọi luật ở đó áp dụng nguyên cho đợt này**: không con số trong lời văn, không nhớ lại kiếp trước (luật quên sạch), không lộ thân phận Người Gác Bến quá sớm, không tạo người/nơi mới ngoài mã có sẵn, dùng "ngươi" cho người chơi.
4. Xem mẫu trong `mau/` (tệp mẫu đã viết sẵn, bám đúng khoá và độ dài). Xem thêm tệp thật đang chạy: `content/dai-mong/ket/END02.json`, `END03.json`, `END06.json`, `content/dai-mong/gac-ben/lao_cheo_do.json`.
5. Kiểm: mỗi tệp `.json` phải đọc được (`node -e "JSON.parse(require('fs').readFileSync(process.argv[1],'utf8'))" <tệp>`). Phần C chạy thêm `npm run content:check` (không còn cảnh báo tên riêng ở DL06–08).
6. Commit từng phần riêng (A, B, C), đẩy `git push -u origin codex/phu-sinh-noi-dung-4`. Không mở PR, không gộp nhánh. Báo ngắn: xong phần nào, số tệp, chỗ băn khoăn.

## A. Hai kỳ ngộ (2 tệp)
Kỳ ngộ = một đoạn kể + 2–3 lựa chọn, mỗi lựa chọn có đoạn kết quả. Khoá theo `mau/A-ky-ngo.mau.json`.
- **A1 `A1-mong-du-tien-canh.json`** — "Mộng du tiên cảnh". Người chơi (tu sĩ, ngủ hoặc tĩnh toạ giữa đường) mơ thấy mình đứng trên một cõi sáng lạnh, có bậc thang trắng, nghe như tiếng sông ở xa. Tỉnh lại có cảm giác "đã từng", không nhớ rõ. Mơ hồ, không giải thích, không nói tên Người Gác Bến, không nhắc "kiếp trước". Hai lựa chọn: theo bậc thang lên (tỉnh dậy mệt nhưng lòng tĩnh) / quay lưng bỏ đi (tỉnh dậy nhẹ nhõm, thoáng tiếc). Cuối mỗi nhánh một chi tiết nhỏ còn lại ngoài đời (một cánh hoa, một vết ướt…).
- **A2 `A2-nhan-ra-nguoi-gac-ben.json`** — "Một người chèo đò quen". Người chơi (đã có Mộng Ấn) gặp ở bến/ngã sông một người chèo đò, lão thợ, hoặc bà bán nước — chọn MỘT dạng — mà người chơi thấy quen một cách vô cớ. Người ấy nói đúng một câu lạ, khó hiểu mà người chơi thấy "đúng". Không lộ thân phận (người ấy chỉ là người đi đường bình thường nhất có thể). Ba lựa chọn: hỏi han / im lặng ngồi cạnh / đi tiếp. Mỗi nhánh kết bằng một câu người ấy nói hoặc làm khiến người chơi băn khoăn.

Mỗi tệp: `text` 2–3 đoạn (mỗi đoạn 2–4 câu); mỗi `choices[].t` 2–3 câu. Không `e` (hiệu ứng) — Claude sẽ gắn. Giữ khoá `"e": {}` rỗng như mẫu.

## B. Hậu quả thế giới của ba kết (3 tệp)
Ba kết: END02 Nhân Hoàng, END03 Ma chủ, END06 Truyền một ngọn đèn. Đời vẫn tiếp sau kết, nên cần chữ cho thế giới đổi thay. Mỗi kết một tệp `B-ENDxx-hau-qua.json`, khoá theo `mau/B-hau-qua.mau.json`:
- `tin_don`: 4 tin đồn ngắn (1–2 câu, kiểu người đi đường kể), rải qua các năm sau kết.
- `dia_diem`: 3 đoạn tả cách một nơi đổi thay (dùng mã `{LOCxx}` có thật, chọn nơi hợp), mỗi đoạn 2 câu; giọng quan sát, không báo số.
- `su_luoc`: 2 dòng sử lược một câu, giọng sử sách, nói việc đã đổi (ví dụ Nhân Hoàng: đổi cách thu thuế, thay quan cai quản...).
- `muon`: 1 đoạn ngắn (3 câu) cho hồi ức nhiều năm sau, người chơi nghe tên mình thành chuyện kể (không tả người chơi bằng tên, dùng "một người từng ngồi trên ngai").
Điều cấm thêm: không phán xét tốt/xấu; không số lượng (người, năm, tấn); không dùng NP mới; không lộ Người Gác Bến; END03 không rùng rợn quá mức, giữ ý "quyền lực có giá".

## C. Đổi tên riêng trong 3 tuyến (sửa 3 chỗ)
Bộ kiểm cảnh báo `ten` ở DL06, DL07, DL08 là tên riêng mới ("Lâm Chí Tôn", "Gia Vạn Đại", "Độ Thế"). Đổi chỉ khoá `ten` đó thành cách gọi chung hoặc mã NP/LOC/FA phù hợp, giữ nghĩa. Chạy `npm run content:chu` (chỉ đổi chữ) và `npm run content:check`; cảnh báo ba tên phải hết.

## D. Tự kiểm trước khi trả
- [ ] Không con số, không "kiếp trước", không tên người/nơi mới.
- [ ] Mã `{..}` là mã có thật trong bảng mã.
- [ ] Mỗi lựa chọn có kết quả riêng, không giống nhau.
- [ ] Giọng văn như tệp mẫu: câu ngắn, chi tiết cụ thể, không giải thích thừa.
