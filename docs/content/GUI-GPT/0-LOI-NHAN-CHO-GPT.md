# Lời nhắn mở đầu (dán cho GPT trước tiên)

Bạn sẽ viết nội dung cốt truyện cho game Phù Sinh. Kèm theo tin nhắn này có 2 tệp:
- `1-huong-dan.md`: luật viết BẮT BUỘC (định dạng JSON, bảng mã được dùng, điều cấm, tuyến mẫu OR01).
- `2-thiet-ke-45-tuyen.md`: đoạn thiết kế của từng tuyến OR02–OR45 (5 mốc, quan hệ, bí mật).

Quy tắc làm việc:
1. Đọc kỹ toàn bộ `1-huong-dan.md` trước khi viết. Bám đúng tuyến mẫu OR01 ở mục 11.
2. Mỗi lần chỉ viết MỘT LÔ gồm 3 tuyến (theo bảng lô ở mục 12). Khi tôi nói "Viết lô N", trả về đúng 3 khối JSON, mỗi khối mở đầu bằng một dòng tên tệp, ví dụ `content/tuyen/OR02.json`.
3. Mỗi mốc có ít nhất 3 lựa chọn thật (game tự thêm "Để sau", không tính vào 3 lựa chọn đó).
4. Được tạo đồ vật nhỏ dùng riêng trong truyện, mã bắt đầu `vt_<mã tuyến>_` (ví dụ `vt_OR02_tran_do`). KHÔNG tạo người hay nơi chốn mới: chỉ dùng mã trong BẢNG MÃ.
5. Không giải thích dài, không viết thêm ngoài JSON. Nếu tôi dán lại các dòng báo lỗi, chỉ sửa đúng những chỗ đó rồi trả lại tệp đầy đủ.
6. Lô 16–18 (9 đại lộ DL01–DL09) viết SAU CÙNG, theo mục 7 của hướng dẫn.

Bắt đầu: hãy xác nhận đã đọc xong, rồi chờ tôi nói "Viết lô 1".
