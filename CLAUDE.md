# Hướng dẫn cho Claude khi làm việc trên Phù Sinh

Người dùng không phải lập trình viên: trả lời ngắn, ít thuật ngữ; chỉ đọc đúng tệp cần thiết (dùng grep, không quét cả dự án).

## Cách kiểm tra (ưu tiên chữ, rất ít khi chụp ảnh)
1. **Luật chơi (không cần trình duyệt):** `node tools/test.js` (hoặc `node tools/test.js crush ngovan`, thêm `--log` để xem nhật ký). Thêm bài mới vào `TESTS` trong `tools/test.js`.
2. **Giao diện (trình duyệt không màn hình):** `npm run build` rồi `node tools/test-ui.js` (thêm tên bài, `--log`). Kiểm bằng DOM và nhật ký. Chỉ khi thật cần nhìn bố cục mới dùng `--shot <thư mục>` (thư mục trong scratchpad), và xem ảnh thưa thôi.
3. **Máy tự chơi hàng loạt:** `node bot.js 40 --quiet` (bài `smoke` trong test.js đã gọi sẵn 15 kiếp). Không cần viết lại máy chơi.
4. Sửa xong tính năng nào thì thêm bài kiểm tra cho tính năng đó vào test.js (luật) và/hoặc test-ui.js (giao diện).

## Nhật ký gỡ lỗi (NK)
- `src/game/core2/22-nhat-ky.js`. Mặc định tắt; bật bằng `?debug=1` trên địa chỉ, nút trong Cấu hình, hoặc `NK.on=true` trong bài kiểm tra.
- Thêm dòng ở bất kỳ đâu: `dbg('nhóm.tên',{khoá:giá_trị})`. Đọc: `NK.dump(n)`, `NK.count('nhóm')`, `NK.clear()`.
- Tính năng mới quan trọng nên có `dbg` để lần sau kiểm bằng chữ.

## Lưu ý kỹ thuật đã gặp
- Tệp trong `src/game/` ghép theo thứ tự `src/game/thu-tu.json`; hàm sau ghi đè hàm trước bằng kiểu bọc `{const _x=f;f=function(){...}}`. Tệp mới phải ghi tên vào thu-tu.json.
- Chiêu thức không nằm trực tiếp trong `r.skills`: `syncSkills()` dựng lại từ công pháp. Muốn bỏ hẳn một chiêu phải ghi vào `r.skUsed` (xem 20-ngo-tinh-khi-van.js).
- Chiêu tier 3 trở lên là "thần thông" chỉ tung qua pháp tướng; chiêu dùng một lần nên đặt tier thấp hơn.
- Nút hành động ở thẻ địa điểm chỉ hiện nếu có trong `PGROUP` (ui/08-cac-canh-hien-de.js).
- Mọi tính năng mới thêm dữ liệu vào `G.run` phải chịu được bản lưu cũ (đọc kiểu `r.x||0`).
- Sửa xong phải `npm run build` (ra phu-sinh.html) rồi mới kiểm giao diện. Lần đầu cần `npm install`.
