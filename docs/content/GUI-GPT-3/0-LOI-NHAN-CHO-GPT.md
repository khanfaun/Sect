# Lời nhắn mở đầu (dán cho GPT trước tiên) — đợt ba

Bạn sẽ viết nội dung đợt ba cho game Phù Sinh, làm thẳng trong kho mã. Đợt này có hai phần:
- **Phần A (lô 1–8): lời văn Đại Mộng** — Mộng Ấn, Người Gác Bến, khảo sát nơi cổ, nghi thức, màn kết.
- **Phần B (lô 9–13): sửa câu chữ 54 tuyến** (45 tuyến xuất thân + 9 đại lộ) theo `docs/content/GUI-GPT/sua-sau-ra-soat.md`.

Đọc trước `docs/content/GUI-GPT-3/1-huong-dan.md` (luật viết BẮT BUỘC, định dạng, bảng mã, giọng văn, điều cấm, mẫu, bảng 13 lô) và `docs/content/GUI-GPT-3/2-danh-sach.md` (từng tệp phải viết, bối cảnh, điều được hé lộ).

Sáu tệp mẫu Claude đã viết, chạy được trong game — bám theo, KHÔNG sửa: `content/dai-mong/mong-an/MA01.json`, `content/dai-mong/gac-ben/lao_cheo_do.json`, `content/dai-mong/ben.json`, `content/dai-mong/ket/END04.json`, `content/dai-mong/nghi-thuc/NG01.json`, `content/dai-mong/khao/LOC05.json`.

Quy tắc làm việc:
1. Tạo nhánh `codex/phu-sinh-noi-dung-3` TỪ nhánh `claude/busy-cray-fctc4p`: `git fetch origin && git checkout -b codex/phu-sinh-noi-dung-3 origin/claude/busy-cray-fctc4p`. Lần đầu chạy `npm install`.
2. Chỉ tạo/sửa tệp nội dung được phép:
   - Phần A: tệp `.json` mới trong `content/dai-mong/mong-an/`, `content/dai-mong/gac-ben/`, `content/dai-mong/khao/`, `content/dai-mong/nghi-thuc/`, `content/dai-mong/ket/` (đúng tên ở `2-danh-sach.md`).
   - Phần B: chỉ đổi CHỮ trong `content/tuyen/*.json`, ở các khoá `ten`, `mo`, `t`, `l`, `su`, `dauVong`, `thayThe`, `ngoai`, `tomTat`. Không đổi mã, điều kiện, hiệu ứng, số lựa chọn.
   - Không sửa mã (`src/`, `tools/`), `content/rules`, `content/text`, tệp mẫu, tệp tự sinh `src/game/data/*`, `phu-sinh.html`, tài liệu.
3. Làm lần lượt từng lô theo bảng ở mục 8 của `1-huong-dan.md` (lô 1 tới lô 13).
4. Kiểm từng lô (phải in "Đạt" / "Tất cả đạt" rồi mới commit):
   - Phần A: `npm run content:mong` → sửa đúng tệp/dòng/khoá được báo → chạy lại. Rồi `npm run content:check` và `node tools/test.js dai_mong ket_thuc ben_vong_xuyen nhieu_kiep dm_kiem content`.
   - Phần B: `npm run content:chu` (chỉ đổi chữ), `npm run content:tuyen`, `node tools/mo-phong-tuyen.js`, rồi `node tools/test.js menh_tuyen menh_thu menh_tuyen_d94 tuyen_ra_soat so_tay_nv`.
5. Commit từng lô riêng (chỉ các tệp của lô), ví dụ `Nội dung đợt ba: lô 1 (Mộng Ấn MA02–MA05)`.
6. Lô 8 xong chạy `npm run content:mong -- --du` cho tới khi Đạt (đủ 33 tệp Đại Mộng).
7. Đẩy nhánh: `git push -u origin codex/phu-sinh-noi-dung-3`. KHÔNG đẩy vào nhánh `claude/...` nào, không mở PR, không gộp nhánh.
8. Báo lại ngắn: đã xong lô nào, số tệp, lệnh kiểm cuối in gì, chỗ nào còn băn khoăn (nếu có).

Bắt đầu từ lô 1.
