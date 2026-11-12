# PROMPT CHO GPT – điền file Excel "mau-vat-pham.xlsx"

Cách dùng: gửi cho GPT **file Excel `mau-vat-pham.xlsx`** cùng toàn bộ đoạn dưới. Mỗi lượt chỉ yêu cầu 1 trang (sheet), 30–60 dòng.

---

Bạn là người biên soạn dữ liệu cho một game tu tiên chữ tên "Phù Sinh". Tôi gửi kèm file Excel mẫu. **Hãy điền thêm dòng vào đúng trang tôi chỉ định, rồi trả lại file Excel (.xlsx).**

## Đọc trước khi viết
1. Đọc trang **00 Hướng dẫn**, **01 Danh mục**, **02 Bảng chỉ số**, **03 Hiệu ứng chiêu**. Đây là luật của game.
2. Đọc **dòng chú thích ở đầu** trang cần điền (dòng chữ nghiêng), và các **dòng ví dụ màu kem**. Ví dụ lấy từ game thật, hãy viết cùng mức số và cùng giọng văn.

## Luật bắt buộc
- Không đổi tên cột, không thêm/bớt cột, không đổi tên trang, không xóa trang khác.
- **ID**: chữ thường không dấu, nối bằng gạch dưới, bắt đầu bằng tiền tố của trang (xem trang 01). Không trùng nhau, không trùng ID ví dụ.
- Cột có danh sách chọn: chỉ điền một giá trị trong danh sách.
- **Chỉ số**: chỉ dùng mã ở trang 02 (và mã riêng ghi trong chú thích của trang đó). **Hiệu ứng chiêu**: chỉ dùng mã ở trang 03. Không tự nghĩ ra mã mới.
- **Con số**: theo khung ở trang 02/03 và chú thích của trang. Phẩm cao thì số cao hơn. Không vượt mức trần.
- **Không đặt tên riêng** cho người, tông môn, địa danh. Mô tả cần nhắc thì dùng {who} (một người), {sect} (một tông môn), {pl} (một nơi). Tên của chính món đồ thì được đặt tự do.
- Không trùng tên với các dòng ví dụ và với tên đồ đã có trong game.

## Văn phong
Thế giới tu tiên cổ phong, lạnh và hơi buồn, có tình người. Mô tả 1–2 câu, gợi hình, có hồn: một vết xước, một mùi hương, một người chủ cũ. Có món buồn, món rợn, món hài kiểu tỉnh bơ. Không dùng từ hiện đại, không sáo rỗng ("vô cùng mạnh mẽ", "huyền thoại").
Lấy cảm hứng từ các tiên hiệp nổi tiếng (Phàm Nhân Tu Tiên, Tiên Nghịch, Cầu Ma, Ngã Dục Phong Thiên, Đạo Quỷ Dị Tiên, Tru Tiên, Già Thiên…) ở **không khí và cách đặt tên**, nhưng **không chép nguyên tên** đồ, công pháp hay nhân vật của các truyện đó.

## Phân bổ trong mỗi lượt
- Trải đều qua các phẩm và các vùng: phẩm thấp nhiều, phẩm cao ít (xem trang 00).
- Món **Độc nhất** (có câu chuyện riêng) chiếm khoảng 15–20%. Món Thần phẩm chỉ là đồ độc nhất, rất ít.
- Trải đều các hệ và các dạng trong cột "Dạng". Không dồn vào một dạng.

## Yêu cầu lượt này
Điền **<SỐ DÒNG>** dòng vào trang **<TÊN TRANG>**.
<Ghi thêm nếu muốn: chỉ phẩm …, chỉ vùng …, chủ đề … (vd: đồ của ma tu Cửu U)>

Trả về file .xlsx đã điền, kèm một dòng tóm tắt: đã thêm bao nhiêu dòng, phân bổ theo phẩm ra sao.
