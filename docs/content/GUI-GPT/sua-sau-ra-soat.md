# Sửa sau rà soát 54 tuyến (Đ9, Claude rà bằng `node tools/mo-phong-tuyen.js`)

Kết quả máy: 54 tuyến đều đúng định dạng; 162/162 kết có đường tới; 252/252 đường mẫu chạy thật trong game không kẹt; không có lựa chọn nào không bao giờ mở; không đòi vật mà không ai trao. Không phải sửa tệp nào để game chạy được.

Những việc dưới đây là **chất lượng lời văn**, không gấp. Sửa thì giữ nguyên mã nút, mã lựa chọn, dấu (`dau`) và điều kiện; chỉ đổi chữ.

## 1. Lời văn đại lộ DL01–DL09 khô và trừu tượng
Đọc mẫu DL02 N5, DL05 N3: câu kiểu "Ngươi giữ mạch và kho theo lời thề đã nhận, cùng bản nợ đi theo quyền", "Dựng chỗ gặp với quyền rời" khó hiểu, giống văn bản hành chính dịch máy. Đại lộ là con đường lớn của cả đời (Diệt Thế Ma Đồ, Huyết Cừu, Võ Lâm Chí Tôn…) nhưng đọc lên như họp làng.
- Mỗi đoạn `mo`: một cảnh cụ thể (ai, ở đâu, đang làm gì, thấy vật gì), rồi mới tới điều phải chọn.
- Nhãn lựa chọn `l`: động từ rõ ràng, người chơi đoán được hậu quả (ví dụ "Giấu người làm chứng trong thuyền đò", không "Giữ người làm chứng và bản sao khi đổi ngôi").
- DL02 (Diệt Thế Ma Đồ), DL05 (Huyết Cừu) nên có ít nhất một lựa chọn tàn nhẫn thật ở mỗi hồi; hiện gần như mọi lựa chọn đều ôn hoà.
- Chín đại lộ không gọi người nào bằng mã `{NPxx}`; nên cho mỗi đại lộ một hai người giữ vai (khác người ở tuyến xuất thân gợi ý nó) để đường đi có mặt người.

## 2. Một vài câu tuyến xuất thân tối nghĩa
Ví dụ OR41 N3 "Ngươi dùng phiếu sức làm việc để xin đơn trồng trọt đầu cho nhóm tự chọn". Khi rà lại lô của mình, đọc to từng câu `t`; câu nào phải đọc hai lần mới hiểu thì viết lại ngắn hơn.

## 3. Kiểm vai
- OR07 N2: `{NP08}` (người dò phả hệ ở Cổ Miếu, LOC04) giao việc ở LOC12. Được, nếu lời văn nói rõ người ấy đi tới đó; xem lại.

## 4. Lưu ý từ bộ máy (không phải lỗi của người viết)
- Bản đồ rất rộng: hai nơi neo kề nhau có khi đi bộ cả năm. Bộ máy nay tự cộng thời gian đi đường vào hạn của nút có nơi hẹn (tối đa ba năm), nên không cần kéo dài `han`.
- Tin đồn (`cach: "tin"`) hiện ngay khi người chơi tới nơi; vẫn nên ghi tên nơi trong `ten` hoặc `mo` để người chơi biết phải đi đâu.
