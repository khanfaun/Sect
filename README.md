# Phù Sinh

Game tu tiên luân hồi chạy trong một tệp duy nhất: mở `phu-sinh.html` bằng trình duyệt là chơi.

- `phu-sinh.html` — bản chơi (được ráp tự động, đừng sửa tay).
- `src/game/` — mã game, chia thành nhiều tệp nhỏ theo nhóm (tên tệp nói nội dung):
  - `core/` — luật chơi và kho truyện gốc (thế giới, chiến đấu, đột phá, bản đồ, sự kiện…).
  - `core2/` — luật bổ sung theo từng đợt: vòng chu thiên, linh thú, luyện chế, bế quan, thế cục…
  - `data/` — danh mục vật phẩm và sự kiện cốt truyện (sinh tự động từ Excel/markdown).
  - `ui/` — giao diện: bản đồ canvas, các màn, các bảng, cấu hình. `style.css` — trang trí.
  - `thu-tu.json` — **thứ tự ghép các tệp**. Thêm tệp mới thì ghi tên vào đây, đúng chỗ.
- `old-phu-sinh-2.html`, `phu-sinh-v1.html` — các bản cũ, giữ để đối chiếu.

Sau khi sửa trong `src/`:

```bash
npm install        # lần đầu
npm run dev        # mở game trên máy để sửa, lưu tệp là tự tải lại
npm run build      # ra phu-sinh.html (hoặc: node tools/build.js, không cần cài gì)
```

Kiểm tra: `node bot.js 80 --quiet` (máy tự chơi 80 kiếp), `node tools/play.js <thư mục ảnh> full` (bấm thử giao diện, chụp ảnh từng màn).

## Gắn ảnh (asset)

Game đã chừa sẵn chỗ cho ảnh. Mở `src/game/ui/01-base.js`, tìm `const ASSET=` và điền đường dẫn ảnh:

- `item`: ảnh vuông PNG không nền cho vật phẩm. Khóa là loại món (`kiem`, `giap`, `nhan`...), đan dược `pill:<mã>`, nguyên liệu `mat:<mã>`.
- `art`: ảnh vuông cho công pháp, tâm pháp, chiêu thức, theo tên.
- `hero` (khóa `me`), `npc`, `pet`, `foe`: ảnh hiển thị trong khung tròn.
- `place`: ảnh ngang cho thẻ địa điểm, theo loại nơi (`tran`, `thanh`, `rung`...).

Chưa có ảnh thì game dùng bộ hình 2D vẽ sẵn bằng vector trong `src/ui/assets.js` (pháp bảo, đan dược, vật liệu, kẻ địch theo họ, chân dung nhân vật nam/nữ, phương tiện, xe ngựa thương đội). Ảnh gắn vào `ASSET` luôn được ưu tiên hơn bộ hình này.

## Danh mục vật phẩm từ Excel và sự kiện cốt truyện

`docs/vat-pham.xlsx` là sổ gốc của mọi vật phẩm, công pháp, chiêu thức, đan dược, linh thú, xuất thân, khí vận, thể chất. Dòng xanh lá là đồ đã có sẵn trong game (cột Ghi chú ghi mã, đừng đổi mã).

Sau khi sửa Excel:

```bash
python3 tools/excel2game.py
node tools/build-thu.js
```

- `tools/excel2game.py` kiểm tra lỗi từng dòng, ghi `src/data/catalog.js` và báo cáo `docs/bao-cao-vat-pham.md`.
- `tools/build.js` ráp cả danh mục và sự kiện cốt truyện vào bản chính `phu-sinh.html`; `tools/build-thu.js` ráp cùng nội dung ra `phu-sinh-thu.html`.
- Sự kiện cốt truyện: sửa `docs/nhap/phu-sinh-su-kien.md` hoặc `tools/su_kien_sua.txt`, chạy `python3 tools/su_kien_chuyen.py` rồi `node tools/build.js`.
- `src/catalog.js` nối danh mục vào luật game bằng các lớp bọc; bỏ tệp này ra là game trở lại như cũ.
- `tools/nhap_do_cu.py` chép mọi thứ đang có trong code game vào Excel (chạy lại không sinh dòng trùng).
- Hướng dẫn đầy đủ (luật vật phẩm, công cụ, cách kiểm tra): `tools/HUONG-DAN-DANH-MUC.md`.
