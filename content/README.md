# Nguồn nội dung đang hoạt động

Bắt đầu tại [guideline](../docs/content/GUIDELINE.md) và [mục lục](../docs/content/README.md).

- `events/`: truyện lẻ, chuỗi, gặp người, thực thể, nhiệm vụ, kỳ ngộ. `manifest.json` đăng ký tệp.
- `venues/services.json`: dịch vụ cố định và cơ hội trong quán, cùng schema mục tương tác.
- `catalog/`: danh mục viết sẵn; `manifest.json` đăng ký nhóm.
- `characters/`: hồ sơ nguyên mẫu NPC, tông môn, xuất thân, khí vận/thể chất và bảng tên.
- `world/`: loại địa điểm, địa lý, thực thể, loài, điển tích.
- `items/`: nguyên mẫu sinh trang bị/công pháp/chiêu, ô trang bị và hiệu ứng.
- `rules/`: bảng luật, thang bậc, thời gian; `content-policy.json` ghi quy ước bắt buộc.
- `narration/`: kho lời kể theo hệ thống, tin đồn, lời chiến đấu.
- `text/`: lời kể/thông báo của các hàm; `{{0}}` là tham số của câu, không phải biến nhân vật `{$a.ten}`.
- `hooks.js`: hàm của một số nội dung cũ; chỉ sửa khi đổi cơ chế, văn của chúng ở `scriptText` trong mục sự kiện.
- `schemas/`: mẫu và đặc tả để thêm mục mới.
- `manifest.json`: sổ nguồn của toàn bộ bảng thông tin đã tách khỏi code; không phải một nguồn dữ liệu song song.

Nguồn đã được sinh: `src/game/data/00-content-text.js`, `01-catalog-du-lieu.js`, `03-su_kien-du-lieu.js`. Không sửa tay ba tệp này. HTML được build cũng không phải nguồn.
