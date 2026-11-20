# Các điểm cần xử lý ở luật và dữ liệu Phù Sinh

| Nguồn và khóa | Vấn đề đối chiếu được | Đề xuất |
|---|---|---|
| `src/game/core/06-su-kien.js`, `pickEvent` và `evOk`. Nguồn điều kiện là `trigger.places` và `trigger.time` trong `content/events/**`. | Khi tập đúng ngữ cảnh rỗng, lượt tìm kế gọi `evOk(e,null,src)` và bỏ điều kiện nơi. Lượt dự phòng cuối còn bỏ qua buổi, mùa, điều kiện riêng và giới hạn gặp gần đây. Cảnh có thể xuất hiện ở nơi hoặc lúc mà tác giả đã loại. | Giữ điều kiện nơi, buổi, mùa và tư cách trong mọi lượt chọn. Trả về không có cảnh nếu tập hợp hợp lệ rỗng. Nếu cần nới lịch sử gặp, tách rõ điều kiện được nới. |
| `src/game/core/05-thoi-gian-the-gioi.js`, `rumorV.pl`. Mẫu dùng biến này nằm trong `content/narration/rumor.js`. | `rumorV` ghép tên địa điểm mới bằng `placeName` thay vì chọn nút có thật. Tin về giao đấu, thú triều hoặc chết có thể nhắc một nơi người chơi không tìm được trên bản đồ. | Gắn tin với nút có thật và sinh cảnh phù hợp. Khi không có nút thích hợp, dùng lời kể không nêu tên nơi. |
| `content/catalog/mounts.json`, `p` và `content/world/veh-t.js`, `p`. Đường mua kiểm ở `src/game/core2/08-dot-13-tram-dich.js`, `tramStock`. | Danh mục có giá riêng, nhưng hàng trạm dịch hiện sinh từ `VEH_T`. Đổi giá danh mục sẽ chưa đổi giá mua hay thuê tại trạm dịch. | Chốt bảng nào là nguồn chuẩn của hàng trạm và cách nối mẫu danh mục. Khi giá đổi, kiểm số tiền thực trừ ở cả mua lẫn thuê. |
| `content/rules/an-uong.js`, `AN.lkBac`, `AN.lkNgay` và `content/rules/tien.js`, `TIEN2.hang.luong_kho`. | Gói lương khô giá 70 xu thay được 90 ngày ăn, trong khi cơm thường 20 xu mỗi ngày. Chênh lệch làm lương khô lấn át đường mua cơm. | Thử đồng thời giá, số ngày và nguồn thưởng gói lương khô. Xem các phương án trong `gia-de-xuat.md`. |
| `content/rules/dat-dai.js`, `DAT.thue.ty.thanh` và `content/rules/no-nha.js`, `NHA.thue.thanh`. | Thuế đất thành tính theo giá gốc là 4.000 xu mỗi năm, cao hơn tiền thuê nhà thành cả năm là 3.600 xu, chưa kể vốn mua đất và dựng nhà. | Chốt nhà riêng là mục tiêu tiết kiệm hay tài sản chịu thuế cao cho dịch vụ khác. Thử đồng thời tiền thuê, giá đất và nghĩa vụ thuế nếu chọn mục tiêu tiết kiệm. |

## Đối chiếu chuyện đang chạy

- Cảnh `gk_mai_ra_dem_ngoi` có thể mở ở tầng đầu. Lời chào đã được sửa để dùng được cả với người chưa nhập đạo. Lựa chọn dùng linh lực vẫn ở đúng nhánh và dùng chi phí cũ.
- Bộ kiểm chuỗi chạy tới các đường kết và kiểm lưu/tải. Kết quả máy không xác nhận hết mức hợp lý của mọi kết quả ngẫu nhiên.
