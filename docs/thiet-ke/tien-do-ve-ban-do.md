# Tiến độ vẽ địa điểm vào bản đồ

Cập nhật: 2026-11-28 lúc 3h30 (đã dừng mọi tiến trình vẽ lúc 3h28).

Cách vẽ, quy trình và bẫy: xem skill `.claude/skills/ve-dia-diem-ban-do` và `docs/thiet-ke/ve-dia-diem-ban-do.md`.

## Đã vẽ (30 quận, đánh số 0–29)

| Quận | Số nơi | Trạng thái |
|---|---|---|
| 5, 6, 7 | 17 / 19 / 6 | Xong (phiên trước) |
| 8 | 14 | Xong, không lỗi |
| 9 | 8 | Xong (đã vẽ lại di tích 160) |
| 10 | 13 | Xong (di tích 177 vẽ lại vẫn thưa, tạm chấp nhận) |
| 11 | 17 | Xong (đã vẽ lại tông môn 118 ở 80%, linh địa 130, trấn 179 và 182) |
| 12 | 3 | Xong |
| 13 | 25 | Xong (đã vẽ lại tông môn 218 ở 70%, cổ mộ 261, đầm 226) |
| 14 | 13 | Xong, không lỗi |
| 15 | 4 | Xong, còn 1 lỗi (xem dưới) |
| 16 | 10 | Xong, không lỗi |
| 17 | 20 | Đã vẽ cả 20, còn 3 lỗi (xem dưới) |
| 18 | 10 | **Dở**: đã vẽ 9/10; còn thiếu động thiên 334 và 2 lỗi |

Còn lại chưa vẽ: quận 0, 1, 2, 3, 4, 19–29 (khoảng 230 nơi, ước tính 1,5–2 giờ máy, cộng thời gian soát và vẽ lại).

## Nơi hỏng cần vẽ lại (lệnh: `python tools/xoa.py <q> <khung>` rồi `SEED=<khác> [DN=…] python tools/quan-phac.py <q> ve <id>`)

- Quận 15, khung 102, tu trấn 260: ra cái cây. Đã thử 75% và 60%, lần nào cũng ra cây; có thể phải sửa bản phác hoặc lời tả.
- Quận 17, khung 100, tông môn 214: trống (chỉ có mảng giấy trắng) → vẽ lại với `DN=0.7`.
- Quận 17, khung 102, tông môn 212: trống → `DN=0.7`.
- Quận 17, khung 115, trấn 275: ra đá và cây, không có nhà.
- Quận 18, khung 105, trấn 331: mảng trắng nhoè, gần như trống.
- Quận 18, khung 106, phế tích 335: ra vòng mực đen xoáy.

## Kinh nghiệm phiên này

- Tông môn trên đất bằng hoặc đất trống ở 90% hay bị xoá sạch, hoặc chỉ còn mây. Hạ xuống 70–80% (`DN=0.7`) thì ra đủ quần thể.
- Nơi nhỏ thỉnh thoảng chỉ ra một cái cây dù bản phác có nhà; hạ % chưa chắc sửa được.
- Công cụ phiên này:
  - `tools/chay-lo.sh` chạy lần lượt các quận, dừng khi tới hạn giờ `HAN` (giây epoch).
  - `tools/quan-phac.py` cũng đọc `HAN`: không bắt đầu ảnh mới nếu không kịp xong trước hạn.
  - `tools/xoa.py` xoá vùng của khung về nền.
  - `tools/soat.py` ghép ảnh soát trước | sau.
  - `tools/bocuc-q5.sh` cập nhật `BO_CUC_Q5`.
- Vẽ lại song song với lô được (ComfyUI tự xếp hàng), nhưng sau đó nên chạy lại `xuat_ve(q)` cho các quận đã vẽ lại, để bảng ô ảnh không bị ghi đè lẫn nhau.
- Quận 18: chạy tiếp bằng `python tools/quan-phac.py 18 ve` (đã xoá cờ `het-gio`). Nơi đã có `done-<k>` sẽ được bỏ qua.
