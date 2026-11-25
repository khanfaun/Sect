# Dấu sự kiện trên bản đồ (ảnh nền trong suốt) — CHƯA LÀM, ghi chú cho phiên sau

## Mục tiêu
Một số sự kiện ngẫu nhiên không gắn với địa điểm cố định (đến từ sự kiện / nhiệm vụ) cần một hình nhỏ trên bản đồ để người chơi biết phải đến đó:
- gặp ông lão → hình **ông lão**
- đưa thư → hình **lá thư**
- tiêu diệt yêu lang → hình **yêu lang**
- (thêm dần: bảo rương, xác người, đàn yêu thú, trận pháp lạ, ...)

Hình **bé, cỡ một cái cây** trên bản đồ (không theo tỉ lệ thật), đủ nhìn thấy. Nền trong suốt, vẽ chồng lên bản đồ lúc chạy (khác địa điểm cố định đã vẽ thẳng vào ảnh bản đồ).

## Cách làm đề xuất
1. **Tạo ảnh bằng ComfyUI** (Qwen Image 2.1 bản đầy đủ, như `tools/dd-ve-ban-do.py`):
   - Ảnh 1: một mảnh bản đồ thật (đất bằng trống) cỡ 576 phóng 1536; ảnh 2: tấm mẫu phong cách `dd2.mau()` (6 mảnh cắt từ bản đồ).
   - Lời tả: vẽ đúng một vật nhỏ ở giữa, cùng nét mực nâu đen, cùng màu giấy cũ, cùng góc nhìn chéo từ trên cao, cỡ như một cái cây trên bản đồ.
   - Lượt 2: bảo Qwen *"Remove the background map completely ... Transparent background, output a PNG"* (đã thử, ra RGBA sạch — xem `xoa_nen` trong `tools/dd2-comfy.py`).
   - Hoà màu: chạy `hoa_mau()` (dd-ve-ban-do.py) trên phần RGB để về đúng bảng màu nâu đỏ của bản đồ; KHÔNG làm mờ mép (người dùng không chấp nhận mép fade).
   - Soát từng ảnh: bỏ ảnh lệch màu, còn viền đỏ, dính nền.
2. **Lưu**: `src/assets/ui/dau-<tên>.webp` (vd `dau-onglao`, `dau-thu`, `dau-yeulang`), cỡ nhỏ (~96–128 px), gắn qua `ASSET` trong `src/react/giao-dien/anh.js`.
3. **Trong game**: sự kiện tạo dấu với `{k:'onglao', hex, het:<thời điểm hết>}` lưu ở `G.run` (đọc kiểu `r.x||[]` cho bản lưu cũ); vẽ ở `ui/05-gfx.js` cùng chỗ vẽ địa điểm (nhún nhẹ hoặc sáng nhẹ để nổi), chỉ khi ô đã thấy (`VIS`). Bấm vào = đi tới / mở sự kiện.
4. **Kiểm tra**: bài luật (dấu được tạo / hết hạn / xoá khi xong) và bài giao diện (ảnh đã gắn, vẽ không lỗi), có `dbg('dau.*')`.
