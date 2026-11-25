# Vẽ địa điểm vào bản đồ: hướng đã chọn và các bước, cho phiên sau

## Kết quả người dùng duyệt (mốc để so)
- Ảnh duyệt cuối (người dùng chọn "bản bên phải", seed 72):
  - `src/assets-goc/ban-do/dd/thu-moi/DAT-tong-ban-do.png`: tông môn lớn đã vẽ bù vào bản đồ, cỡ thật, khung 1024 điểm ảnh bản đồ.
  - `DAT-tong-ban-do-1536.png`: ảnh gốc ComfyUI trả về.
  - `DAT-mau-tong.png`: ảnh mẫu tông môn đã dùng (ảnh 2).
- Ảnh phong cách người dùng thích:
  - `thu-moi/ref-1.webp`: núi phủ điện các, nhiều đảo bay có thác, biển mây.
  - `thu-moi/ref-2.webp`: tông môn trên núi, đảo bay nối xích, mây cuộn.
- Đặc điểm cần giữ:
  - Tông môn to, hùng tráng: cả quả núi phủ điện các, bậc đá thẳng lên chính điện trên đỉnh, đảo bay to rõ có xích và thác.
  - Mực đậm nâu đen, tương phản như cây và núi của bản đồ.
  - Chân núi liền vào đất xung quanh, không có mép.

## Quy trình 2 bước (tools/thu-ve-moi.py)
1. **Vẽ ảnh mẫu cho từng loại nơi** (`chay2`).
   - Qwen Image 2.1 bản đầy đủ (`qwen-image-2.1-UC-int8_convrot`, 25 bước).
   - Ảnh 1, 2: `ref-1.webp`, `ref-2.webp`.
   - Lời tả `P2`: vẽ MỚI một nơi đúng phong cách 2 ảnh mẫu. Mảng đất dưới chân loang dần ra mép kiểu mực thấm giấy. Nền trắng.
   - Người dùng chọn bản nền trắng thay vì nền be.
   - Một nơi chỉ cần 1 ảnh mẫu, hoặc vài ảnh cho mỗi cỡ.
2. **Vẽ bù (inpaint) vào bản đồ theo ảnh mẫu** (`chay3`).
   - Ảnh 1: mảnh bản đồ sạch quanh khu đất (`kc` = 1024 điểm ảnh bản đồ gốc 4128, phóng lên 1536).
   - Ảnh 2: ảnh mẫu thu còn 512. Thu nhỏ để mô hình CHỈ lấy ý hình dáng, KHÔNG chép màu hay độ đậm nét.
   - Lời tả `P3`:
     - Ảnh 2 chỉ là ý tưởng bố cục.
     - Vẽ bằng ĐÚNG mực của ảnh 1 (đậm, tương phản như cây núi xung quanh, không nhạt, không xám).
     - Chân đất hoà vào đất bản đồ. Giữ nguyên phần còn lại.
   - Workflow:
     - `VAEEncode(ảnh 1)`, rồi `SetLatentNoiseMask(mặt nạ)`, `DifferentialDiffusion`, denoise 1.0.
     - Mặt nạ là vệt loang bầu dục có nhiễu, rộng khoảng 2/3 khung (`rr` 0.36), nới cao phía trên cho đỉnh núi và đảo bay.
   - Ghép về: `Image.composite(kết quả, nền, mặt nạ làm mềm 4px)`. Ngoài mặt nạ giữ nguyên từng điểm ảnh.
   - Mỗi nơi nên chạy 2 seed để người dùng hoặc máy chọn.

## Áp cho các loại địa điểm khác
| Loại | Ảnh mẫu (bước 1) | Vùng vẽ bù (bước 2) |
|---|---|---|
| Tông môn nhỏ / trung / lớn / rất lớn (4/7/9/12 ô) | Theo `TG` trong `tools/dd-ve-ban-do.py`: càng lớn càng nhiều đảo bay, cổng sơn môn, biển mây | rr ~0.20 / 0.28 / 0.33 / 0.36, cao lên trời |
| Thành phàm (`thanh`, 5–9 ô) | Tường đá, cổng lầu, mái ngói (`dd2.TH`). Trên núi: thành dựa núi, tường theo sống núi | rr ~0.2–0.3, gần tròn |
| Thành tu sĩ (`tuthanh`) | `TT`: tháp, điện các, lầu bay trong mây | rr ~0.22–0.28, cao hơn một chút |
| Trấn / thôn (`tran`, `tutran`) | `TR`, `TU`: vài nhà mái tranh hay ngói, ruộng, liễu. Trên núi: thôn núi trên bậc ruộng | rr ~0.10–0.16 |
| Nơi đặc biệt 1–3 ô (động phủ, di tích, cổ mộ, bí cảnh, mỏ, dược viên, linh địa, yêu sào…) | Lời tả trong `dd2.V` và `THEM` | rr ~0.08–0.12 |
| Núi, rừng, sông, hồ, hoang, đầm | KHÔNG vẽ: bản đồ đã có sẵn (`TU_NHIEN`) | — |

Kích thước: hình vẽ to hơn cụm ô của nơi đó trong luật chơi. Tông môn rất lớn chiếm khoảng 15–20 ô trên ảnh. Vì vậy khi đặt nơi phải chừa đủ khu đất trống quanh nó (xem mục "Việc còn lại").

## Những thứ đã làm (chưa commit)
- **Vị trí địa điểm cố định**, tên ngẫu nhiên: `src/game/core2/91-dia-diem-co-dinh.js`.
  - `DD_HAT` là hạt giống bố cục. `ddBoCuc(h)` sinh bố cục, `ddTenMoi` đổi tên theo thế giới.
  - Nơi neo cốt truyện giữ tên riêng. Ranh quận cố định, tên quận theo thế giới.
- **Ô đất đo từ ảnh**: `tools/o-phang.py` sinh ra `src/game/core2/03c-o-phang.js`.
  - `O_PHANG`: đất bằng trống, ít nét mực, màu đất so theo trung vị vùng.
  - `O_CHE`: ô dữ liệu ghi là đất bằng / rừng / đầm nhưng ảnh có núi hay rừng che. Ô núi thật thì vẫn xây được.
- **Luật đặt nơi** (`growPlaces`, core2/33):
  - Thành, trấn ưu tiên đất bằng. Hết chỗ thì lên sườn hoặc đỉnh núi không bị che.
  - Thành có thể sang quận khác. Trấn hết chỗ thì thành nơi ẩn cư.
  - Tông môn tránh `O_CHE`, tìm chỗ rộng (bán kính 60).
  - Thành chọn chỗ trước, rồi tông môn, trấn, sau cùng nơi hoang.
  - Số trấn giảm (`content/world/size-t.js` `NOI_SL`). Cỡ tông môn 4/7/9/12 (`tong-sz.js`, `HINH[12]`), thành tới 9 ô.
- **Công cụ**:
  - `tools/dd-xuat.js <hạt>`: xuất bố cục JSON (loại, cụm ô, số ô bằng).
  - `tools/dd-ve-ban-do.py`: chia 5×3 mảnh, vẽ bù từng nơi, có `velai`, `xem`, `CACH=tudo`. Đây là cách cũ, người dùng chê vì tông môn bị gò. Phần hữu ích còn dùng được: `hoa_mau`, `vung_ve` (không đè ô nơi khác), `kiem`, `chay_wf`, `full`.
  - `tools/thu-ve-moi.py`: các hàm `chay2` (ảnh mẫu), `chay3` (vẽ bù theo mẫu), `tach2` (tách nền loang, nếu cần ảnh rời).
- **Bài kiểm tra**: `dat_thanh_tran`, `themo`, `the_gioi_moi` đã sửa theo luật mới và đạt. Bài `anh_ban_do` (test-ui) đổi tên khoá ảnh.
- `src/game/ui/05-gfx.js` có `UI.mapBlend`, mặc định `source-over`. Multiply bị chê.

## Đã thử và bị loại (đừng làm lại)
- **Ảnh rời từng ô lục giác, tường thành vẽ bằng code**: giả, không cùng nét.
- **Vẽ đè lên bản đồ rồi cắt theo chỗ khác** (diff-cut): dính đất, mép theo hình ô.
- **Bắt Qwen xoá nền ảnh đã vẽ**: xê dịch vị trí.
- **Ghép multiply**: tối và ố.
- **Làm mờ mép (fade) quanh nhà**: người dùng cấm. Chỉ chấp nhận loang mực ở mảng đất.
- **Vẽ tự do cả khung rồi cắt dán**: đẹp nhưng mô hình đổi cả núi sông, cắt ra bị vuông và cụt.
- **Vẽ bù gò trong cụm ô nhỏ**: tông môn bị gò, xấu, thành khối mờ ở cỡ bản đồ.
- **Ảnh mẫu đưa vào ở cỡ lớn (1024)**: mô hình chép màu nhạt của mẫu. Phải thu còn 512 và dặn chỉ lấy ý.
- **Đặt thành trấn theo dữ liệu địa hình cũ `MAPD`**: lệch ảnh mới, thành bị đặt lên vách núi. Phải dùng `O_PHANG` / `O_CHE`.

## Việc còn lại (theo thứ tự)
1. Chọn khu đất cho từng nơi theo cỡ hình (tông môn lớn cần khoảng trống ~15–20 ô).
   - Có thể đổi luật đặt nơi: chừa vòng trống lớn hơn quanh tông môn, thành lớn.
   - Hoặc tính vị trí khung vẽ theo tâm cụm ô và chấp nhận hình phủ vòng quanh, miễn không đè nơi khác (`vung_ve` đã trừ ô nơi khác).
2. Vẽ theo mảnh và biến thể.
   - Người dùng lo hỏng card, nên giữ số lần vẽ ít.
   - Ưu tiên tông môn và thành. Thôn và nơi nhỏ dùng vùng nhỏ, có thể gộp vài nơi gần nhau trong một khung.
   - Chỉ làm 1 bố cục trước. 2 biến thể (`DD_HAT` + một hạt nữa, chọn mảnh ngẫu nhiên) để sau.
3. Đưa ảnh bản đồ đã vẽ vào game:
   - Thay `Hidden-map - Backup.webp` theo mảnh và biến thể (ghép lại một tấm hoặc theo mảnh).
   - Bỏ ảnh rời `map-*` cho các loại đã vẽ vào bản đồ (`mapKey` trong ui/05-gfx.js).
   - Giữ huy hiệu và tên. Cập nhật test-ui `anh_ban_do`.
4. Đo lại `tools/o-phang.py` nếu bản đồ nền đổi.
5. Cập nhật CLAUDE.md (mục bản đồ). Chạy kiểm tra, build, commit và đẩy `main` (người dùng muốn đẩy luôn sau khi kiểm tra đạt).
6. Để sau, đã có ghi chú:
   - `docs/thiet-ke/ban-do-o-anh.md`: bản đồ chia ô ảnh nhiều mức phóng, phải làm nét bản đồ nền trước.
   - `docs/thiet-ke/dau-su-kien-ban-do.md`: dấu sự kiện ông lão, lá thư, yêu lang… bằng ảnh nền trong suốt.

## Lưu ý vận hành
- ComfyUI Desktop chạy ở `127.0.0.1:8000`, gọi thẳng HTTP (`tools/nv-comfy.py`), không qua comfy-mcp (công cụ đó gọi cổng 8188).
- Nếu bị treo: POST `/queue {"clear":true}`, POST `/interrupt`. Vẫn kẹt thì nhờ người dùng khởi động lại ComfyUI.
- Chạy việc dài ở nền và báo tiến độ thưa. Không vẽ hàng loạt khi chưa được đồng ý (tốn card).
- In tiếng Việt từ Python: đặt `PYTHONIOENCODING=utf-8`.
