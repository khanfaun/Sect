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
1. **Sinh thái** (đang làm): thêm loại địa hình theo 5 đại khu vực từ địa hình cũ (MAPD) + độ cao + khoảng cách tới nước + nhiễu.
   Bản nháp: công cụ sẽ là `tools/sinh-thai.py`. 0=Trung Châu (giữa), 1=Đông Hoang, 2=Nam Trạch, 3=Tây Lĩnh, 4=Bắc Nhạc.
   - Bắc (lạnh): Tuyết nguyên, Đồi tuyết, Núi tuyết, Rừng lá kim, Hồ băng.
   - Tây (khô): Sa mạc, Hoang mạc đá, Núi đá đỏ, Ốc đảo.
   - Nam (ẩm): Rừng nhiệt đới, Trúc lâm, Đầm lầy, Hồ sen.
   - Đông (hoang dã): Thảo nguyên, Rừng nguyên sinh.
   - Giữa: giữ Đồng bằng, Đồi, Núi cao, Rừng lá rộng, Sông; đỉnh rất cao có tuyết.
   Loại mới cần thêm vào `TER_N`, `TER_COST`, `WP_TY`, `WP_BASE` (content/rules) và rà ~33 chỗ dùng `.ter[`/`terWalk`.
2. **Mặt đất ô**: ComfyUI vẽ 2–3 tấm mặt đất liền mạch / loại → code cắt ô lục giác (đầu nhọn, lệch hàng lẻ, `hexCenter`),
   viền dày phía dưới cho khối, khe hở; vẽ sẵn thành từng mảng canvas để chạy nhanh.
3. **Đồ trên ô**: cây theo khí hậu (nhiều biến thể), núi lớn phủ cụm ô, đá, cỏ.
4. **Địa điểm**: giảm số, cỡ theo quy mô, ngẫu nhiên kiếp đầu, giãn cách; ảnh 3D mới + trang trí rìa.
5. **Dấu sự kiện** trên bản đồ (ông lão, lá thư, yêu lang…).
6. (Sau) biến thể địa điểm theo đại khu vực.
