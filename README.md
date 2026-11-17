# Phù Sinh

Game tu tiên luân hồi chạy bằng `phu-sinh.html`. Mở tệp trong trình duyệt để chơi.

## Nội dung và dữ liệu

Bắt đầu đọc [mục lục nội dung](docs/content/README.md) và [guideline viết, phân loại, đặt sự kiện](docs/content/GUIDELINE.md).

**Nguồn chính là `content/`.** Truyện, kỳ ngộ, nhiệm vụ và dịch vụ dùng một schema; vật phẩm, nhân vật, thế giới và lời kể có thư mục riêng. Bản thảo ở commit `8b9c479` đã được phân loại và giữ nguồn đối chiếu. Tài liệu và Excel cũ nằm trong `archive/`, không nạp vào game.

- `content/events/`, `content/venues/`: tương tác và điều kiện xuất hiện.
- `content/catalog/`, `content/items/`: danh mục viết sẵn, nguyên mẫu và thuộc tính vật phẩm/năng lực.
- `content/characters/`, `content/world/`, `content/rules/`: nhân vật, tông môn, địa điểm và bảng quy tắc.
- `content/narration/`, `content/text/`: lời kể, tin đồn và thông báo.
- `src/game/`: luật xử lý và cầu nối, nạp theo `thu-tu.json`.
- `src/react/`: giao diện; đọc trạng thái qua `PS`.
- `docs/content/`: hướng dẫn, toàn bộ danh mục đọc và báo cáo từng ID.
- `tools/`: build, xuất tài liệu và kiểm tra. `tools/imports/` chỉ để xem lại đầu vào cũ.
- `archive/`: dữ liệu lịch sử, không phải nguồn đang dùng.

Các tệp dữ liệu tự sinh trong `src/game/data/` và hai bản HTML không sửa tay. Build và dev tự biên dịch JSON trước khi nạp game.

## Làm việc

```sh
npm install
npm run dev
npm run content:check
npm run content:stories
npm run test:rules
npm run content:docs
npm run build
npm run build:thu
```

Kiểm tra giao diện sau build: `node tools/test-ui.js content dot32`.

Xuất Excel để đọc: `python3 tools/content-export.py` (cần Python và `openpyxl`; mặc định lưu trong `work/`). Kiểm tra giao diện cần gói `playwright` và Chromium; có thể chọn trình duyệt qua `PS_CHROMIUM`.

Không chạy bot hoặc bài `smoke` nếu người dùng chưa yêu cầu (xem `CLAUDE.md`). Các lệnh kiểm tra trên không gọi bot.
