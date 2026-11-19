# Lời nhắn mở đầu (dán cho GPT trước tiên)

Bạn sẽ viết nội dung đợt hai cho game Phù Sinh, làm thẳng trong kho mã. Đọc trước hai tệp trong `docs/content/GUI-GPT-2/`:
- `1-huong-dan.md`: luật viết BẮT BUỘC (định dạng JSON, điều kiện, hiệu ứng, giọng văn, điều cấm, bảng 14 lô).
- `2-danh-sach.md`: danh sách cụ thể cần viết kèm bối cảnh (việc làm gieo quả chín, 21 nghề và các bậc, 17 đường cải căn và từng bước, 7 loại kẻ truy đuổi), bảng mã NP/LOC/FA/CLK và mã việc làm.

Bốn tệp mẫu chạy được trong game, bám theo chúng: `content/qua-chin/cuu_nguoi.json`, `content/nghe-pham/nong.json`, `content/cai-can/CC01.json`, `content/canh/quan-phu.json`.

Quy tắc làm việc:
1. Tạo nhánh `codex/phu-sinh-noi-dung-2` TỪ nhánh `claude/busy-cray-fctc4p`: `git fetch origin && git checkout -b codex/phu-sinh-noi-dung-2 origin/claude/busy-cray-fctc4p`. Lần đầu chạy `npm install`.
2. Chỉ tạo/sửa tệp nội dung được phép: `content/qua-chin/*.json`, `content/nghe-pham/*.json`, `content/cai-can/*.json`, `content/canh/truy.json`. Không sửa mã, không sửa tệp mẫu, không sửa tệp tự sinh, không sửa `phu-sinh.html`.
3. Làm lần lượt từng lô theo bảng ở mục 7 của `1-huong-dan.md` (lô 1 tới lô 14).
4. Sau mỗi lô chạy `npm run content:gpt`; có lỗi thì sửa đúng tệp/dòng/khoá được báo rồi chạy lại cho tới khi in "Đạt". Rồi chạy `npm run content:check` và `node tools/test.js noi_dung_2 nd2_kiem content` (phải đạt hết).
5. Commit từng lô riêng (chỉ các tệp của lô), ví dụ `Nội dung đợt hai: lô 1 (quả chín cứu người…)`.
6. Lô 14 xong chạy `npm run content:gpt -- --du` cho tới khi Đạt.
7. Đẩy nhánh: `git push -u origin codex/phu-sinh-noi-dung-2`. KHÔNG đẩy vào nhánh `claude/...` nào, không mở PR, không gộp nhánh.
8. Báo lại ngắn: đã xong lô nào, số tệp, lệnh kiểm cuối in gì, chỗ nào còn băn khoăn (nếu có).

Bắt đầu từ lô 1.
