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

## Gắn ảnh (asset)

Game đã chừa sẵn chỗ cho ảnh. Mở `src/ui/base.js`, tìm `const ASSET=` và điền đường dẫn ảnh:

- `item`: ảnh vuông PNG không nền cho vật phẩm. Khóa là loại món (`kiem`, `giap`, `nhan`...), đan dược `pill:<mã>`, nguyên liệu `mat:<mã>`.
- `art`: ảnh vuông cho công pháp, tâm pháp, chiêu thức, theo tên.
- `hero` (khóa `me`), `npc`, `pet`, `foe`: ảnh hiển thị trong khung tròn.
- `place`: ảnh ngang cho thẻ địa điểm, theo loại nơi (`tran`, `thanh`, `rung`...).

Chưa có ảnh thì game tự dùng hình vẽ tạm.
