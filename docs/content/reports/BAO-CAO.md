# Báo cáo kiểm kê và sửa logic nội dung

## Phạm vi và xuất xứ

- Luật nền d9ab301; truyện và sửa tính liên tục lấy đúng 8b9c479.
- 469 mục tương tác: `{"story":200,"event":209,"initiation":9,"opportunity":24,"quest-door":3,"quest":8,"service":16}`.
- 205 bảng nền, 1943 mục danh mục có ID, 48 nhóm lời kể hệ thống.

## Các sửa đã thực hiện

- 68 dòng pháp bảo có yêu cầu dưới Trúc Cơ được sửa trong nguồn; áp sàn cho cả đồ độc nhất, đồ rơi và bản lưu cũ.
- 148 cảnh truyện sửa sinh cảnh; thêm điều kiện giờ/mùa theo bối cảnh, tránh nhầm tầng tu vi với địa lý.
- 122 sửa lựa chọn, phần thưởng và ngữ cảnh đã ghi theo ID ở semantic-changes.json.
- Cứu người tiêu đúng đan hồi khí huyết trong ô mở; bán đan dùng giá của viên đan thật.
- Áo, kiếm, mực, linh tro và vật kỷ niệm trao đúng nhóm thay vì trang bị bất kỳ.
- Vốn mua-bán được trừ và hoàn trả cùng lãi; thêm chi phí cho các đoạn trả tiền bị thiếu.
- Tông môn nội bộ phải là tông đã ghi danh; danh tính thiên kiêu, khách và tông trong chuỗi được giữ.
- Tin đồn không báo tử người sống, không gán giết người đoạt bảo ngẫu nhiên cho người nghĩa hiệp.
- Chính đạo không mặc định đòi mãi lộ hoặc lục túi người thua; sinh thú theo môi trường.
- Sửa đối thủ trai ngọc và các trận trong quán; không dùng nhóm quỷ/ngẫu nhiên thay sinh vật đã kể.
- Danh mục phương tiện được nối vào kho trạm dịch thật; phi kiếm nhập môn không cho phàm nhân sử dụng.
- 107 hồ sơ khí vận/thể chất tách lời tựa và tác dụng; bỏ 15 trường nhập không được bộ chuyển thực thi.
- Tám lựa chọn giao đấu đã chuyển từ phép thử thân pháp sang trận thật; kiểm cả thắng, thua, bỏ chạy và lưu giữa trận (combat-changes.json).
- Chuỗi lưu riêng phần 2b và kết quả thử sức; bản lưu cũ thiếu kết quả không bị suy đã thắng.

## Báo cáo từng mục

- `catalog-audit.csv`: từng ID trong danh mục; `event-audit.csv`: từng mục tương tác.
- `catalog/` và `info/`: toàn bộ dữ liệu và thông tin sau phân loại; bảng gốc không bị bỏ sót chỉ vì không nằm trong Excel.
- `catalog-changes.json`, `location-changes.json`, `semantic-changes.json`, `birth-changes.json`: chi tiết thay đổi.
- `combat-changes.json`, `runtime-fixes.json`: các sửa trận thật và quy tắc xử lý nội dung.
- [Kết quả kiểm chứng và phạm vi](KIEM-CHUNG.md); `validation.json` giữ số lượng kiểm tra nội dung gần nhất.

## Ranh giới kết quả

- Các vật truyện ghi `reference` là dữ liệu dự trữ chưa có sự kiện trao/thu; đã tách rõ khỏi mục có thể chơi. Không tự bịa thêm nhiệm vụ để làm cho mọi vật phẩm dự trữ có vẻ hoạt động.
- Các cơ chế như công thức riêng theo từng tên nguyên liệu, quyền sở hữu nhà/thuyền lâu dài hoặc phép đặc biệt trong lời tựa không được coi là đã triển khai nếu không có hiệu ứng.
- Các luật tính toán cũ vẫn chạy qua lớp bọc; đợt này tách nguồn và nối bằng adapter để giữ bản lưu và các tính năng mới, không thay toàn bộ bộ máy game.
- Báo cáo PASS xác nhận các bất biến và đường đi được kiểm, không chứng minh mọi trải nghiệm cân bằng hoặc mọi câu văn đều hoàn hảo. Không dùng bot trong đợt này.
