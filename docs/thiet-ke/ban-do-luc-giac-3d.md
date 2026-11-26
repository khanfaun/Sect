# Bản đồ lục giác 3D (làm lại hoàn toàn) — kế hoạch

Người dùng yêu cầu ngày 2026-11-26. Thay hướng cũ (vẽ thuỷ mặc lên một ảnh liền).

## Đã chốt với người dùng
- **Giữ nguyên** ảnh bản đồ chưa khám phá (`Hidden-map.webp`, lớp sương). Bỏ ảnh đã khám phá và lưới vẽ bằng code.
- Bản đồ ghép từ các ô lục giác trông như khối 3D (kiểu Civilization), mỗi loại địa hình một màu/chất liệu,
  có **khe hở nhỏ** giữa các ô, ô cạnh nhau không giống nhau (không thấy lặp).
- Cách làm ô: **AI (ComfyUI) vẽ mặt đất lớn liền mạch cho từng loại, code cắt ngẫu nhiên thành ô** (xoay, lật, viền dày tạo khối).
- Trên ô: rừng có 2–3 cây (bắc lạnh = lá kim, nam = nhiệt đới/trúc…), núi to chiếm cụm vài ô.
- Địa điểm (thành, trấn, tông môn, thế lực…) theo phong cách ảnh `src/assets-goc/backup-anh-3d/`, quay mặt về phía người nhìn,
  đặt trên 1 ô hoặc cụm ô. Tông môn lớn kiểu tiên hiệp: nhà lơ lửng / núi bay, mây quanh. Rìa có trang trí cây, đá cho hoà hợp.
- Cỡ tông môn: **nhỏ 10, trung 20, lớn 40 ô**.
- **Giảm địa điểm từ 496 xuống khoảng 200** (≈15 tông môn, 20 thành, 40 trấn, còn lại nơi hoang dã).
- Vị trí địa điểm: **ngẫu nhiên ở kiếp đầu, cố định từ kiếp thứ hai**; các nơi phải cách xa nhau.
  (Hiện đang cố định cho mọi thế giới ở `core2/91-dia-diem-co-dinh.js`, `DD_HAT` — phải đổi lại.)
- Sự kiện ngẫu nhiên (giúp ông lão, giết yêu lang, truyền thư…) có hình trên bản đồ, cỡ bằng một cái cây.
- Để sau: mỗi địa điểm vài biến thể theo đại khu vực.

## Các bước
1. **Sinh thái** (XONG, commit 2d21906; ô có `g.bio`, tên `terTen(i)`, công `BIO_COST`; `g.ter` gốc giữ nguyên nên luật cũ chạy như trước): thêm loại địa hình theo 5 đại khu vực từ địa hình cũ (MAPD) + độ cao + khoảng cách tới nước + nhiễu.
   Bản nháp: công cụ sẽ là `tools/sinh-thai.py`. 0=Trung Châu (giữa), 1=Đông Hoang, 2=Nam Trạch, 3=Tây Lĩnh, 4=Bắc Nhạc.
   - Bắc (lạnh): Tuyết nguyên, Đồi tuyết, Núi tuyết, Rừng lá kim, Hồ băng.
   - Tây (khô): Sa mạc, Hoang mạc đá, Núi đá đỏ, Ốc đảo.
   - Nam (ẩm): Rừng nhiệt đới, Trúc lâm, Đầm lầy, Hồ sen.
   - Đông (hoang dã): Thảo nguyên, Rừng nguyên sinh.
   - Giữa: giữ Đồng bằng, Đồi, Núi cao, Rừng lá rộng, Sông; đỉnh rất cao có tuyết.
   Đã làm theo cách thêm lớp `g.bio` (BIO_N, BIO_GOC, BIO_COST ở content/rules/sinh-thai.js) thay vì đổi TER_N.
2. **Mặt đất ô**: ComfyUI vẽ 2–3 tấm mặt đất liền mạch / loại → code cắt ô lục giác (đầu nhọn, lệch hàng lẻ, `hexCenter`),
   viền dày phía dưới cho khối, khe hở; vẽ sẵn thành từng mảng canvas để chạy nhanh.
3. **Đồ trên ô**: cây theo khí hậu (nhiều biến thể), núi lớn phủ cụm ô, đá, cỏ.
4. **Địa điểm**: giảm số, cỡ theo quy mô, ngẫu nhiên kiếp đầu, giãn cách; ảnh 3D mới + trang trí rìa.
5. **Dấu sự kiện** trên bản đồ (ông lão, lá thư, yêu lang…).
6. (Sau) biến thể địa điểm theo đại khu vực.

## Demo một quận (2026-11-26): Xích Hà Quận (số 13, Nam Trạch)
Ảnh xem: `docs/thiet-ke/anh/quan-13-xem.jpg` (ghép thử), `quan-13-trong-game.jpg`.
Quy trình cho một quận:
1. `python tools/lg-comfy.py dat [loại…]` — ComfyUI (Qwen 2.1 Turbo, **vẽ thẳng từ chữ**, latent rỗng `EmptySD3LatentImage`) vẽ mặt đất nhìn thẳng từ trên, 2 tấm/loại.
   Vẽ từ ảnh màu mẫu thì mô hình bám màu phẳng / vệt mờ của ảnh mẫu, không dùng.
2. `python tools/lg-comfy.py vat [tên…]` — cây, núi, đá, sậy, địa điểm (nền trong suốt sẵn). Lời nhắc cấm đế vuông.
   Ảnh gốc ở `src/assets-goc/luc-giac/` (không lưu git, trừ `quan-*.json`).
3. `node tools/lg-xuat.js <quận>` — xuất ô / độ cao / sinh thái / địa điểm.
4. `python tools/lg-ghep.py src/assets-goc/luc-giac/quan-<số>.json` — cắt ô lục giác (cắt chỗ ngẫu nhiên, xoay 60°, chỉnh sáng; nước chỉ lấy phần giữa tấm),
   khối dày + nâng theo độ cao, nước lún xuống, khe hở tối. Ra `src/assets/luc-giac/quan-<số>.webp`, ảnh vật `v-*.webp`, ảnh địa điểm `dd-*.webp`,
   và `content/rules/luc-giac.js` (`LG_QUAN` khung + ô, `LG_DD`, `LG_VAT` danh sách cây/núi). Thêm `--dd --xem tệp.jpg` để xem thử cả địa điểm.
5. Game (`src/game/ui/05-gfx.js`, `lgDraw` / `lgVat` / `lgKey`): dán ảnh quận lên trên ảnh bản đồ cũ (vẫn dưới sương), vẽ cây/núi lúc chạy và
   **bỏ ô có địa điểm** (địa điểm đổi theo thế giới); núi to bị bỏ thì hiện núi nhỏ dự phòng. Địa điểm trong quận dùng ảnh `dd-*`
   (tông môn ≥9 ô dùng tông môn bay). Bài giao diện `luc_giac`.
Còn lại: các quận khác + loại đất lạnh/khô (tuyết, lá kim…); ranh quận khác giữa thế giới nên game nhận quận theo danh sách ô;
cỡ tông môn hiện vẫn theo bố cục cũ (7/9 ô), làm 10/20/40 ở bước 4.

## Cập nhật 2026-11-26 (lần 2)
- Mô hình: **Qwen 2.1 bản đầy đủ** (`qwen-image-2.1-UC`, 25 bước, cfg 1) — không dùng Turbo. Phối cảnh: nhìn thẳng từ phía nam, chếch ~30–35°, mặt chính quay về người xem;
  **không isometric** (đế hình thoi). Công trình một ô dùng lời nhắc `P_O` (chỉ đúng công trình, không núi / ụ đất phía sau); ô cảnh dùng `P_DD`.
- **Cụm ô địa điểm luôn là lục giác lớn** (core2/33 `hinhLG`, `lgCo`, `LG_SO`): 1 / 7 / 19 / 37 ô. Tông môn nhỏ/trung/lớn 7/19/37, thành 7, đại thành 19,
  trấn 1 hoặc 7, nơi hoang dã 1 hoặc 7. Bậc thành trấn (`capOf`) theo số ô. Bản lưu cũ xếp lại (`w.sep=4`).
- **Mỗi ô một công trình** (ui/05-gfx.js `LG_BO`, `lgVai`, `lgDiem`): ô giữa công trình chính (tông môn ≥19 ô: đỉnh núi bay, chính điện ở ô phía bắc),
  ô dưới cùng là cổng, còn lại nhà/tháp/lầu…; tông môn xen ô cảnh (núi, hồ, thác, tùng, đảo bay) ~35%; thành có tường vẽ theo mép cụm (`lgTuong`).
  Nơi hoang dã 7 ô: ô giữa ảnh `dd-<loại>`, vòng ngoài cảnh hợp loại (`LG_VONG`). Ô có địa điểm không mọc cây/núi.
- Còn chưa đẹp: vài công trình vẫn có đế (ruộng, điện, xá, võ trường), dd-ancu / dd-rung / dd-duoc còn nền núi — vẽ lại bằng `SEED=…`.

## Cập nhật 2026-11-26 (lần 3)
- Công trình địa điểm: **vật 3D render** (lời nhắc `P_O` + `GOC45`): góc xiên ~45° từ phía trước, mặt chính quay về camera, đối xứng (mặt trước song song mép dưới ảnh),
  chỉ có vật thể (không nền, không đất, không mây/sương), nét sạch không loang mực. Đế lục giác do game vẽ (`lgDe`, mặt lát `t-lat` / `t-datnen`) nên luôn khớp ô.
- Bỏ tường thành. Mặt đất rừng (rung, nhietdoi, truc) vẽ lại như các loại đất khác (cỏ + bụi), cây mọc từ ô.
- Thử **Juggernaut XL v9 Lightning** (`MODEL=jugg`, vẽ nền trắng rồi `tach_trang`): nhanh (~4 giây/ảnh) nhưng phần lớn ảnh ra cả cảnh có nền, không tách được
  (`docs/thiet-ke/anh/so-sanh-qwen-juggernaut.jpg`). Giữ Qwen 2.1 bản đầy đủ.
