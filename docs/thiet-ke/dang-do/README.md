# Bản đồ mới — đang dở (cất ngày 20/11)
Agent dừng vì hết hạn mức. Mã đã đưa về bản cũ; phần làm dở nằm trong `ban-do-moi.patch` (44 tệp, gồm tệp mới core2/74-chu-thanh-tran.js).
Áp lại: `git apply docs/thiet-ke/dang-do/ban-do-moi.patch` (từ gốc repo).

Đã làm (bài `the_gioi_moi` đạt 16/16 trước khi cất): loại nơi tutran/tuthanh + bicanh/dongthien/como/yeusao/ditich; số nơi theo cỡ quận (tổng ~616); 10 Hoàng quốc (HQ_KV), chủ thành trấn n.fa (core2/74); công trình/cửa hàng phàm ↔ tu sĩ; tnaFa đọc n.fa; bản lưu cũ giữ bản đồ cũ (w.v2); sinh thế giới ~49 ms.
Còn phải làm: (1) kiểm icon nơi mới trên bản đồ + Chú giải (src/react chỉ đổi 2 dòng — có thể chưa xong); (2) `npm run content:check`, `npm run build`; (3) chạy `npm run test:rules` và `node tools/test-ui.js` một lần, sửa bài cũ hỏng do số nơi/vị trí đổi (không nới ý nghĩa); (4) ghi 3–5 dòng vào ghi-chu-trien-khai.md; xoá thư mục dang-do sau khi gộp.
Giao việc tiếp: Sonnet, mức trung bình, prompt ngắn trỏ vào README này.
