# Công cụ nhập dữ liệu cũ

Chỉ dùng để đọc lại tư liệu trong `archive/imports/`. Không phải đường build hiện tại.

- `python3 tools/imports/excel2game.py` → `work/import-preview/catalog.js` và báo cáo.
- `python3 tools/imports/su_kien_chuyen.py` → `work/import-preview/story.js`.

Hai bộ chuyển cũ có suy đoán thưởng/phạt và nơi chốn từ từ khóa. Kết quả chỉ để đối chiếu; cần rà, ánh xạ vào schema và sửa nguồn `content/` trước khi dùng. Không ghi kết quả nhập thẳng lên `src/game/data/` hoặc ghi đè dữ liệu đã kiểm duyệt.

Các script đổi tên, hạ số và nhập đồ cũ được lưu ở archive/legacy-import-tools; chúng cần bố cục mã đời cũ và không thuộc công cụ hiện hành. `HUONG-DAN-DANH-MUC.md` trong thư mục này là hướng dẫn cũ; ưu tiên `docs/content/GUIDELINE.md` khi có khác biệt.
