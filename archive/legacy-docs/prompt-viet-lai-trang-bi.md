# PROMPT CHO GPT: viết lại chỉ số trang bị theo luật mới, bổ sung xuất thân

Gửi kèm **2 file**: `mau-vat-pham_1.xlsx` (bài GPT đã viết lần trước) và `vat-pham.xlsx` (bản mới theo luật mới). Rồi dán nguyên khối dưới đây.

---

Game tu tiên "Phù Sinh" vừa đổi luật trang bị. Tôi gửi kèm 2 file:
- **`mau-vat-pham_1.xlsx`**: bài bạn đã viết lần trước (theo luật cũ). Đây là **bản gốc để dựa vào**.
- **`vat-pham.xlsx`**: cùng các món đó (cùng ID, tên, lời tựa), đã sắp xếp lại theo luật mới, phần chỉ số đang để trống.

Nhiệm vụ: với từng món, tìm dòng **cùng ID** trong file cũ, **chuyển chỉ số cũ sang luật mới** rồi điền vào file mới. Giữ "tính cách" của món: món cũ thiên về công thì vẫn thiên về công, món cũ có nội tại phản đòn thì vẫn ưu tiên phản đòn… nhưng số dòng, mã và độ lớn phải theo luật mới bên dưới. Ngoài ra **viết thêm phần còn thiếu cho xuất thân**. Trả lại file `vat-pham.xlsx` đã điền (không sửa file cũ).

Cách chuyển:
- Mã chỉ số cũ nào là **mã gốc của Dạng** thì đưa vào cột Gốc. Số lấy theo bảng A ở cột Cảnh giới cần.
- Mã cũ thuộc **13 mã phụ** thì ưu tiên giữ làm dòng Phụ. Thiếu thì thêm mã phụ hợp với món, thừa thì bỏ bớt cái yếu nhất.
- Mã cũ là **nội tại** mà Dạng không có: nếu món Độc nhất thì giữ 1 cái ở cột "Nội tại thêm", còn lại bỏ.
- Bỏ hẳn con số cũ, tính số mới theo bảng. Số cũ được tính theo phẩm, luật mới tính theo cảnh giới.

## Đọc trước
- Trang **02 Bảng chỉ số**: hệ số theo cảnh giới, mã gốc của từng Dạng (bảng A, đã nhân sẵn số cho từng cảnh giới), 13 mã dòng phụ (bảng B), danh sách nội tại (bảng C).
- **Dòng chữ nghiêng đầu mỗi trang**: luật của trang đó.

## Luật trang bị mới (BẮT BUỘC)
Ô số **luôn ghi con số** (ví dụ 14, 0.15, -3), không ghi chữ. Việc hiện mạnh/yếu cho người chơi là việc của game.

1. **Phẩm quyết định SỐ DÒNG**, **Cảnh giới cần quyết định ĐỘ LỚN**. Phẩm nào cũng có thể gặp ở mọi cảnh giới.
2. **Cảnh giới cần** theo Vùng xuất hiện (chia gần đều hai mức):
   - vùng 0 → Phàm nhân hoặc Luyện Khí
   - vùng 1 → Luyện Khí hoặc Trúc Cơ
   - vùng 2 → Trúc Cơ hoặc Kết Đan
   - vùng 3 → Kết Đan hoặc Nguyên Anh
   - vùng 4 → Nguyên Anh hoặc Hóa Thần

   Riêng đồ Độc nhất ở vùng 4 được lên Độ Kiếp.
3. **Gốc 1–3**: đúng các mã gốc của Dạng ở bảng A, không thêm không bớt. Số lấy theo cột cảnh giới tương ứng ở bảng A, lệch được ±25%.
4. **Phụ 1–4**: đúng số dòng theo phẩm: Phàm 0 · Hoàng 1 · Huyền 1 · Địa 2 · Thiên 2 · Tiên 3 · Thần 4. Mã chọn trong 13 mã ở bảng B, không trùng mã gốc, không trùng nhau. Số lấy theo bảng B, lệch được ±25%. Chọn mã phụ hợp với Hệ, Dạng và lời tựa của món.
5. **Nội tại**: nội tại có sẵn trong mã gốc của Dạng thì giữ đủ (trận pháp, túi trữ vật có 2).
   - Dạng nào trong bảng A đã có nội tại (ghi "Nội tại: …") thì không được thêm.
   - Chỉ món **Độc nhất** mà Dạng chưa có nội tại mới được ghi 1 nội tại ở cột "Nội tại thêm".
   - Số nội tại lấy "Số gốc" ở bảng C × hệ số cảnh giới. Riêng dạng đếm (firstEvade, weakStart, vulnStart, pillSlot) không nhân, ghi 1–3.
6. **Độc nhất** được mạnh hơn tới +40%, và được có thêm **1 dòng âm** (cái giá phải trả, ví dụ đạo tâm giảm, thọ nguyên giảm): ghi số âm ở một ô Phụ, mã chọn trong 13 mã phụ hoặc lifeP.
7. **Giữ nguyên**: ID, Tên, Dạng, Hệ, Phẩm, Vùng, Độc nhất, Biểu tượng, Nguồn gặp.
   - Lời tựa được sửa nhẹ nếu không còn hợp với chỉ số.
   - **Không đụng các dòng tô xanh** (đồ đang có trong game).
8. Không đổi tên cột, không thêm hay xóa cột, không đổi tên trang.

## Xuất thân (trang NV Xuất thân)
Điền 5 cột còn trống cho **30 xuất thân mới** (dòng không tô xanh). Xem các dòng xanh làm mẫu giọng văn.
- **Chuyện thơ ấu 1** và **Chuyện thơ ấu 2**: mỗi cột 1–2 câu, kể thuở nhỏ tới lúc rời nhà. Dùng {ten} (tên), {que} (quê), {ho} (họ). Không đặt tên riêng.
- **Tính tình**: 1–2 giá trị trong danh sách ở dòng đầu trang.
- **Tâm pháp gia truyền**: Không / Phàm phẩm / Hoàng phẩm. Chỉ khoảng 5–6 xuất thân hợp lý mới có (nhà có học, đạo quán, thế gia…).
- **Câu kể tâm pháp**: chỉ viết nếu có tâm pháp gia truyền. Dùng {ten}, {n} (tên tâm pháp), {ho}.

## Kế hoạch: làm lần lượt, mỗi lượt tối đa 60 dòng
Hết lượt thì dừng, ghi "Xong lượt X/16, trang …". Tôi gõ "tiếp" thì làm lượt kế. Mỗi lượt trả về file .xlsx cộng dồn các lượt trước.

| Lượt | Trang | Số dòng |
|---|---|---|
| 1–2 | TB Vũ khí | 120 |
| 3 | TB Nón | 51 |
| 4 | TB Ngọc bội | 50 |
| 5 | TB Găng | 51 |
| 6 | TB Giáp | 60 |
| 7 | TB Áo choàng | 51 |
| 8 | TB Trang sức | 50 |
| 9 | TB Đai lưng + TB Giày | 82 (chia 2 phần nếu dài) |
| 10–13 | TB Pháp bảo | 200 (50 mỗi lượt) |
| 14 | VT Trữ vật + VT Hỏa chủng | 47 |
| 15 | VT Lô đỉnh + VT Trận pháp | 52 |
| 16 | NV Xuất thân | 30 |

Tổng: 909 dòng. Cuối mỗi lượt, tự kiểm: số dòng phụ đúng theo phẩm, không món nào quá 1 nội tại, Cảnh giới cần khớp vùng.

Bắt đầu lượt 1: TB Vũ khí, 60 dòng đầu.
