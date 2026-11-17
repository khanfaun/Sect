# Kết quả kiểm chứng nội dung

Ngày kiểm tra: 17/11/2026. Nhánh làm việc: `codex/he-thong-hoa-content`, nền luật `d9ab301`, đối chiếu truyện `8b9c47911cff8399da6923b1ec377fe826c79372`.

## Kết quả

| Phần kiểm | Kết quả và phạm vi | Chứng cứ |
|---|---|---|
| Luật chơi | 18 nhóm, 113 khẳng định đạt; gồm túi khóa, cảnh giới, pháp bảo và nội dung | [Nhật ký luật](checks/rules.txt) |
| Nội dung | 403 mục hợp lệ; render 349 cảnh EVS; thực thi 68 lựa chọn callback; kiểm 1.925 ID danh mục | [Số liệu](validation.json) |
| Chuỗi truyện | 200 cảnh, 20 chuỗi, 328 đường tới kết thúc, 100 đường bỏ đi; kiểm nhánh 2b và lưu/tải | [Nhật ký truyện](checks/stories.txt) |
| Trận từ truyện | 8 lựa chọn × thắng/thua/bỏ chạy = 24 ca; lưu/tải giữa trận, giữ đúng kết quả chuỗi | [Nhật ký luật](checks/rules.txt) |
| Giao diện | 3 bài, 20 khẳng định đạt: vào đúng quán, điều kiện pháp bảo, trận thật, túi và bản đồ; không có lỗi trang | [Nhật ký UI](checks/ui.txt) |
| Hai bản game | Build bản chính và bản thử thành công | [Bản chính](checks/build.txt), [bản thử](checks/build-thu.txt) |
| Tài liệu và Excel | Không có liên kết nội bộ hỏng; 21 sheet, đủ 403 tương tác và 1.925 ID danh mục | [Kiểm gói tài liệu](checks/documents.txt) |
| Xuất xứ | 349 ID cảnh ban đầu đều còn; bản thảo lưu trữ trùng SHA-256 với đúng commit yêu cầu | [Kiểm gói tài liệu](checks/documents.txt) |

Bản thảo đối chiếu có SHA-256: `7e0f01c248d5f6f7f6398200848ca5df86e5cc7192ef5c8755828df944126a67`.

## Cách chạy lại

```sh
npm run content:check
npm run content:stories
npm run test:rules
npm run content:docs
npm run build
npm run build:thu
node tools/test-ui.js content dot32 bando
python3 tools/content-export.py work/content-review.xlsx
```

Kiểm UI dùng Playwright và Chromium; font ngoài được thay bằng CSS rỗng trong bài kiểm để kết quả không phụ thuộc mạng. Xuất Excel cần `openpyxl`. Bài luật dùng dữ liệu thế giới có seed cố định để dễ tái hiện.

Không chạy bot theo quy định dự án. Những kiểm tra này xác nhận cấu trúc, tham chiếu và các hành vi được nêu; cân bằng dài hạn và chất lượng văn học vẫn cần thử chơi/biên tập riêng. Các trường chưa được hệ thống thực thi và vật truyện dự trữ được ghi rõ trong báo cáo, không tính là tính năng đã có.
