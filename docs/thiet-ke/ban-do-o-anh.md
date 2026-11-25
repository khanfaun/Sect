# Bản đồ chia ô ảnh, phóng tới đâu tải chi tiết tới đó — Ý TƯỞNG, để làm sau

## Vì sao
Địa điểm (nhất là tông môn) giờ vẽ thẳng vào ảnh bản đồ bằng ComfyUI (`tools/dd-ve-ban-do.py`, vẽ bù / inpaint).
ComfyUI vẽ mỗi nơi ở khung 1536 điểm ảnh (rất chi tiết: điện các, bậc đá, đảo bay, thác nước), nhưng khi ghép vào bản đồ
4128 điểm ảnh phải thu nhỏ ~2,7 lần: một tông môn 7 ô chỉ còn ~100 điểm ảnh, thành một khối mờ, mất vẻ hùng tráng.
Một tấm bản đồ to gấp 2,5–3 lần (10–12 nghìn điểm ảnh) thì quá nặng cho máy yếu / điện thoại.

## Ý tưởng
Giống Google Maps: bản đồ chia thành nhiều ô ảnh (vd 512×512) ở vài mức phóng.
- Nhìn xa: dùng ảnh nhỏ (như bây giờ). Phóng gần: chỉ tải ô ảnh chi tiết của vùng đang xem, bỏ bớt ô ngoài màn hình.
- Mức chi tiết nhất lấy thẳng từ ảnh ComfyUI 1536 (không thu nhỏ) — giữ nguyên độ nét như ảnh gốc.

## Ăn khớp với các phần đã có
- Bản đồ đã chia 5×3 mảnh, mỗi mảnh nhiều biến thể bố cục (ngẫu nhiên mỗi thế giới ở kiếp đầu, cố định từ kiếp sau): mỗi mảnh vốn là một ảnh riêng -> cắt tiếp thành ô ảnh theo từng mức phóng.
- Vẽ ở `ui/05-gfx.js` (`mapImg`, chỗ vẽ ảnh nền bản đồ): đổi từ vẽ 1 ảnh sang vẽ các ô ảnh đang thấy theo mức phóng; mực loang (`inkMask`) và tầm nhìn giữ nguyên.
- Công cụ: thêm bước xuất ô ảnh (theo mức phóng, webp) sau khi ghép xong biến thể; lưu ở `src/assets*/ban-do/o/<mảnh>-<biến thể>/<mức>/<x>-<y>.webp`.
- Bản HTML đóng gói một tệp (`npm run build`) đang nhúng ảnh: cần xem cách nạp nhiều ô ảnh (nhúng hết hay tải theo nhu cầu).

## Phải làm nét bản đồ nền TRƯỚC (người dùng chỉ ra)
Ảnh đầu vào cho ComfyUI hiện là mảnh 576 điểm ảnh phóng lên 1536 (~2,7 lần) nên nền đã mềm; nhà vẽ sắc trên nền mờ trông như dán lên.
Thứ tự đúng:
1. Vẽ lại cả bản đồ nền ở độ phân giải cao (×2,5–3, ~10–12 nghìn điểm ảnh ngang) bằng Qwen theo từng mảnh, giữ nguyên vị trí địa hình
   (như `tools/ban-do-ve-lai.py` nhưng mỗi mảnh 1024 chỉ lấy ~400 điểm ảnh gốc -> nét cây, đá, đường được vẽ lại sắc ở cỡ mới).
2. Vẽ bù (inpaint) địa điểm lên bản đồ nền mới: khung 1536 gần như 1:1 với bản đồ, không phóng / thu -> nền sắc, nhà sắc, liền nét.
3. Cắt thành ô ảnh theo mức phóng.
Lưu ý: dữ liệu ô (`MAPD`, `O_PHANG`, `O_CHE`) lấy từ ảnh: vẽ lại nền phải giữ vị trí, đo lại `tools/o-phang.py` trên ảnh mới.

## Việc cần quyết khi làm
Kích thước ô ảnh, số mức phóng, dung lượng tổng, cách nhúng vào bản build.
