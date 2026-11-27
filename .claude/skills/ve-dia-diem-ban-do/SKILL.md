---
name: ve-dia-diem-ban-do
description: Vẽ địa điểm (tông môn, thành, trấn, nơi nhỏ) thẳng vào bản đồ đã khám phá của Phù Sinh bằng ComfyUI (Klein 9B + Qwen 2.1 + LanPaint) rồi ghép và xuất ô ảnh. Dùng khi người dùng nhờ vẽ/vẽ lại một nơi trên bản đồ, đổi tốc độ vẽ, hoặc làm tiếp các quận.
---

# Vẽ địa điểm vào bản đồ (tools/quan-ve.py)

Đọc trước: phần "Vẽ địa điểm vào bản đồ" và "Bản đồ chia ô ảnh" trong CLAUDE.md, và `docs/thiet-ke/ve-dia-diem-ban-do.md`.

## Quy tắc người dùng (bắt buộc)
- Cách mới / nơi mới: chỉ chạy **1 khung nhỏ**, gửi ảnh so sánh trước–sau (SendUserFile), chờ duyệt rồi mới làm tiếp. Không vẽ cả quận một lượt.
- Vẽ thẳng trên bản đồ đã khám phá (không dùng bản chưa mở). Không vẽ asset rời rồi dán.
- Hạn chế kiểm tra; vẽ xong ghép vào game cho người dùng xem. Trả lời ngắn, ít thuật ngữ. Kiểm tra xong thì commit + đẩy main.
- Luôn Qwen 2.1 bản đầy đủ (không Turbo). Tông môn: lâu đài nổi, xích, thác, mây ngang; góc nhìn xiên cao như bản đồ.

## Thiết lập nhẹ đã duyệt (2026-11-27, ~30 giây Qwen thay vì 100–200)
- Khung `KHUNG=1280` (mặc định). Nơi nhỏ / trấn / thành nhỏ dùng `KHUNG=1024`. Tông môn 37 ô cao ~1016 nên không dùng 1024.
- LanPaint 2 vòng (`LP=2`, mặc định). Klein 8 bước. Qwen 8 bước, vẽ lại 60% (`wf_qwen2`).
- Nơi nhỏ/trấn: có thể chỉ cần Klein hoặc chỉ Qwen; gộp vài nơi gần nhau vào một khung. Chạy liên tiếp để model còn nạp sẵn (lần đầu chậm vì nạp model).

## Các bước (chạy từ thư mục gốc dự án, `PYTHONIOENCODING=utf-8`, đặt `KHUNG`/`LP` cho mọi lệnh cùng một lượt)
1. `python tools/quan-ve.py ve <q> <k> <loai>`: cắt khung, làm mờ vùng nơi đó, tạo mặt nạ (`ra/qv<q>-v<k>-vao.png`, `-mn.png`). Khung 0 reset `lam.png` từ nền: sao lưu `work/quan-<q>/lam.png` trước.
2. `python tools/quan-ve.py lpref <q> <k> <loai>`: tạo `ra/v<k>-kref.json` (Klein + LanPaint + 2 ảnh mẫu tông môn).
3. comfy-mcp `upload_file` (overwrite) vao + mn → `run_workflow` kref → tải kết quả bằng `curl http://127.0.0.1:8000/view?filename=...&type=output` (fetch_outputs bị lỗi) → lưu thành `ra/qv<q>-v<k>-klein-vao.png` và upload lại.
4. `python tools/quan-ve.py qwen2 <q> <k> <loai>` → `run_workflow ra/v<k>-nhe.json` → curl tải ảnh.
5. `python tools/quan-ve.py ghepk <q> <k> <ảnh.png>`: khớp màu, loang mực, bớt vàng ra rìa, giữ cây gốc (`GIU_CAY=0` nếu cây che mất nơi vẽ), cắt ô ảnh, sinh `03d-o-anh.js`.
6. Tạo ảnh so sánh cũ/mới, gửi người dùng. `npm run build`, `node tools/test.js`, `node tools/test-ui.js o_anh_ban_do`; được duyệt thì commit + đẩy main.

## Bẫy đã gặp
- Cho Qwen xem ảnh Klein làm ảnh mẫu thì nó chép y: ảnh mẫu phải là bản đồ gốc, Klein chỉ là latent khởi đầu.
- Vẽ bù mẫu rời rồi dán bị chê (lộ vết ghép, lệch màu, vàng quá); màu phải kéo về màu bản đồ ở rìa.
- Qwen với mặt nạ mềm không LanPaint sẽ chép ảnh vào; luôn dùng LanPaint.
- Bố cục nơi (`DD_BOCUC`) cố định: đổi luật đặt nơi phải chạy lại `node tools/dd-luu.js` và vẽ lại các quận đã vẽ.
- Cây phía trước phủ lên chân nơi vẽ bị mờ: dùng giữ cây (mặc định bật).
