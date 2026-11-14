# Hướng dẫn cho Claude khi làm việc trên Phù Sinh

Người dùng không phải lập trình viên: trả lời ngắn, ít thuật ngữ; chỉ đọc đúng tệp cần thiết (dùng grep, không quét cả dự án).

## Cách kiểm tra (ưu tiên chữ, rất ít khi chụp ảnh)
1. **Luật chơi (không cần trình duyệt):** `node tools/test.js` (hoặc `node tools/test.js crush ngovan`, thêm `--log` để xem nhật ký). Thêm bài mới vào `TESTS` trong `tools/test.js`.
2. **Giao diện (trình duyệt không màn hình):** `npm run build` rồi `node tools/test-ui.js` (thêm tên bài, `--log`). Kiểm bằng DOM và nhật ký. Chỉ khi thật cần nhìn bố cục mới dùng `--shot <thư mục>` (thư mục trong scratchpad), và xem ảnh thưa thôi.
3. **Máy tự chơi hàng loạt:** `node bot.js 25 --quiet` (thêm `--boost` để bot sống lâu, tới Hóa Thần và vùng 5; bài `smoke` trong test.js đã gọi sẵn 15 kiếp). Cuối bản in có "Độ phủ tính năng": danh sách tính năng bot chưa từng chạy. Tính năng mới thì thêm tên hàm vào `COV_FN` và, nếu là việc quản lý, thêm vào `MANAGE` trong `tools/bot-ext.js` để bot tự thử. Chạy 25+ kiếp có thể mất 1–2 phút (dùng `--quiet`, đặt timeout cao).
   - `--smart`: bot có chiến lược (sống sót > đột phá > tu luyện > tích luỹ > tiến vùng > tranh cơ duyên > khám phá), xem `tools/bot-smart.js`. Cuối bản in có "Quyết định của bot" (đếm lý do) và "Hoàn cảnh chết". Dùng để đo độ khó: 20 kiếp smart thường tới Kết Đan/Nguyên Anh, phần lớn chết ở thiên kiếp. Bot thường (không smart) phủ nhiều tính năng hơn, bot smart đi sâu hơn.
   - Bẫy đã gặp: phàm nhân không bế quan được (bqReal=0), tu vi tới từ sự kiện; tầng tu luyện đã đầy thì phải đi lịch luyện rồi xung kích chứ không bế quan thêm; `bqCustom` trả false khi bị từ chối nên phải kiểm tra kết quả.
4. Sửa xong tính năng nào thì thêm bài kiểm tra cho tính năng đó vào test.js (luật) và/hoặc test-ui.js (giao diện).

## Nhật ký gỡ lỗi (NK)
- `src/game/core2/22-nhat-ky.js`. Mặc định tắt; bật bằng `?debug=1` trên địa chỉ, nút trong Cấu hình, hoặc `NK.on=true` trong bài kiểm tra.
- Thêm dòng ở bất kỳ đâu: `dbg('nhóm.tên',{khoá:giá_trị})`. Đọc: `NK.dump(n)`, `NK.count('nhóm')`, `NK.clear()`.
- Tính năng mới quan trọng nên có `dbg` để lần sau kiểm bằng chữ.

## Lưu ý kỹ thuật đã gặp
- Tệp trong `src/game/` ghép theo thứ tự `src/game/thu-tu.json`; hàm sau ghi đè hàm trước bằng kiểu bọc `{const _x=f;f=function(){...}}`. Tệp mới phải ghi tên vào thu-tu.json.
- Chiêu thức không nằm trực tiếp trong `r.skills`: `syncSkills()` dựng lại từ công pháp. Muốn bỏ hẳn một chiêu phải ghi vào `r.skUsed` (xem 20-ngo-tinh-khi-van.js).
- Chiêu tier 3 trở lên là "thần thông" chỉ tung qua pháp tướng; chiêu dùng một lần nên đặt tier thấp hơn.
- Nút hành động ở thẻ địa điểm chỉ hiện nếu có trong `PGROUP` (ui/08-cac-canh-hien-de.js).
- Mọi tính năng mới thêm dữ liệu vào `G.run` phải chịu được bản lưu cũ (đọc kiểu `r.x||0`).
- Sửa xong phải `npm run build` (ra phu-sinh.html) rồi mới kiểm giao diện. Lần đầu cần `npm install`.
- Các hệ thống mới (core2/23–30): thương thế 3 bậc, hồi phục theo lượt/tháng (đã bỏ hồi theo giờ trong `worldStep`), tĩnh toạ, đối thủ liều mạng, tâm ma, rớt cảnh giới + sống tạm, che giấu tu vi, thần thức/giao tranh. Lựa chọn dạng hộp thoại dùng khung kỳ ngộ: thêm vào `KYNGO` với `sp:1` để không lẫn vào kỳ ngộ ngẫu nhiên.
- Tuổi (`r.age`) được tính lại từ `birthAge` và thời gian thế giới; trong bài kiểm tra muốn đổi tuổi phải đặt `birthAge`.
- Bản đồ: phóng to từ 1,6 lần thì vẽ lại mảnh đang nhìn ở độ nét cao (`DTC` trong ui/05-gfx.js); hai vùng lật gương (CELL mx) chưa có mảnh chi tiết.
- Túi đồ (core2/31): 10 ô mang trên người + túi trữ vật (relic k:'tui' đeo ở ô tuivat) mở thêm ô, ô túi khoá khi linh lực = 0 hoặc phàm nhân. Mỗi pháp bảo/vật liệu/trứng/lệnh bài/viên đan chiếm một ô. Giao diện ô/khoá chưa gắn (dùng `bagLayout()`, `it.locked`/`it.bsrc` của `bagItems()`).
- Lịch luyện nhận ×`LL_BOOST` (20-ngo-tinh-khi-van.js). Bế quan: linh lực hồi ×`BQ_MP_MUL` nhanh hơn khí huyết, xuất quan không còn hồi đầy cả hai (24-hoi-phuc.js).

