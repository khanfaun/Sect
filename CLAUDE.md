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
- Bản đồ (core2/33-ban-do-moi.js): một đại lục vẽ sẵn, ảnh ở `src/assets/ban-do` (nhúng qua react/anh.js → `window.PS_ANH`). Nền theo mùa + ngày (5h–19h)/đêm; chỗ chưa thấy là Hidden-map, mép nhòe qua Transition-map (`buildComposite` trong ui/05-gfx.js).
  - Ảnh nhúng là bản nén (`python3 tools/nen_anh.py [rộng] [chất lượng]`, gốc ở `src/assets-goc/ban-do`, không nhúng). Mức đồ họa đổi độ phân giải nền (1000/1600/2400) và lớp chuyển tiếp: tiết kiệm bỏ giấy chuyển tiếp.
  - Chuyển buổi/mùa: đang đi thì giữ ảnh cũ (`SH.base`), dừng lại mới đổi; ảnh mới loang ra như mực qua mặt nạ nhiễu (`trMask`, 2,8 giây). Mép vùng đã thấy/chưa thấy là mực loang (`inkLayers`: lõi + vành giấy + vết mực), không còn làm nhòe.
  - Nền be ở giao diện sáng đã đổi sang texture bằng khối CSS sinh tự động ở cuối style.css (giao diện tối giữ nền cũ).
  - Địa hình từng ô: `MAP_TER` (core2/32, sinh bằng `python3 tools/dia_hinh.py --xem ảnh.jpg`; sông hồ núi mây vẽ tay bằng đa giác trong tệp đó). Ô nhỏ 30 đơn vị, 119×76 ô. Sông/hồ/mây không đi bộ được, lên dốc tốn thêm (`stepCost`), từ Kết Đan bay qua sông hồ (`flyMode`).
  - 5 đại khu vực `KHU` (Trung Châu, Đông Hoang, Nam Lĩnh, Tây Nhạc, Bắc Vân), mỗi khu 6–8 tông môn (`sect.sz` 0–2). Địa điểm id = khu*100+i, thế giới sinh một lần rồi giữ qua các kiếp.
  - `r.region` giờ là BẬC ĐỘ KHÓ = cảnh giới (0..4), `r.khu` là khu đang đứng. Không còn quan ải/lệnh bài; sào huyệt tính riêng từng nơi (`r.bossAt`).
  - Tầm nhìn theo ô (`visCalc`: núi chắn, nước nhìn xa); ô đã thấy lưu ở `r.vis` (base64). Thấy thực thể/điểm: `canSee(x,y)`.
  - Bản lưu cũ (`world.mapV` khác `MAP_V`) được `migrateX` dựng lại thế giới và đưa người chơi về một thôn trấn.
- Túi đồ (core2/31): 10 ô mang trên người + túi trữ vật (relic k:'tui' đeo ở ô tuivat) mở thêm ô, ô túi khoá khi linh lực = 0 hoặc phàm nhân. Mỗi pháp bảo/vật liệu/trứng/lệnh bài/viên đan chiếm một ô. Giao diện ô/khoá chưa gắn (dùng `bagLayout()`, `it.locked`/`it.bsrc` của `bagItems()`).
- Lịch luyện nhận ×`LL_BOOST` (20-ngo-tinh-khi-van.js). Bế quan: linh lực hồi ×`BQ_MP_MUL` nhanh hơn khí huyết, xuất quan không còn hồi đầy cả hai (24-hoi-phuc.js).

