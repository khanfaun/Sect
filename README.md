# Phù Sinh

Game tu tiên luân hồi chạy trong một tệp duy nhất: mở `phu-sinh.html` bằng trình duyệt là chơi.

- `phu-sinh.html` — bản chơi (được ráp tự động, đừng sửa tay).
- `src/core.js` — luật chơi và kho truyện gốc. `src/core2.js` — luật bổ sung: vòng chu thiên, linh thú, luyện chế, bế quan tùy chọn, thế cục, nhân mạch, ghi chú.
- `src/ui/` và `src/style.css` — giao diện: bản đồ canvas, các màn, các bảng, cấu hình.
- `old-phu-sinh-2.html`, `phu-sinh-v1.html` — các bản cũ, giữ để đối chiếu.

Sau khi sửa trong `src/`:

```bash
node tools/build.js
```

Kiểm tra: `node bot.js 80 --quiet` (máy tự chơi 80 kiếp), `node tools/play.js <thư mục ảnh> full` (bấm thử giao diện, chụp ảnh từng màn).
