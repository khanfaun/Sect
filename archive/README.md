# Tư liệu lịch sử, không nạp vào game

- `imports/8b9c479/`: bản thảo sự kiện đúng commit được người dùng chỉ định.
- `imports/excel/`: sổ vật phẩm, bản sửa và mẫu cũ. Nguồn hiện hành đã chuyển sang `content/catalog/` và được kiểm lại.
- `legacy-docs/`: hướng dẫn và thiết kế trước khi thống nhất nguồn.
- `legacy-html/`: bản game cũ để đối chiếu.
- `legacy-tools/`: các đoạn ghép, thử nghiệm, mô phỏng đời cũ; không nằm trong pipeline build hiện tại.

Không sửa các tệp này để thay đổi game đang hoạt động. Công cụ nhập cũ ở `tools/imports/` chỉ tạo bản xem trước vào `work/import-preview/`.
