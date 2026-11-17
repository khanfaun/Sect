# Thông tin ngoài sự kiện

Tệp này giải thích dữ liệu nào được viết sẵn, dữ liệu nào được sinh và trạng thái nào thay đổi khi chơi. Tra đường dẫn cụ thể trong [bản đồ nguồn](BAN-DO-NGUON.md); xem toàn bộ giá trị của từng bảng trong thư mục `info/`.

## Tông môn

Nguyên mẫu gồm phe (`chinh`, `ma`, `phat`, `trung`), nghề (`kiem`, `dan`, `dao`, `tran`, `khi`, `phu`, `am`, `thu`, `the`…), tiền tố tên và hậu tố truyền thừa. Nguồn ở `content/characters/sect-pre.js`, `sect-sfx.js`.

Một thế giới sinh ra các tông môn cụ thể trong `world.sects`. Tên tông trên địa điểm (`node.owner`) phải trỏ đúng hồ sơ này. Thiên kiêu giữ chỉ số tông `s`; người chơi giữ `sectName` sau khi nhập môn. Cống hiến là tài nguyên của quan hệ này, không phải vé vào mọi tông.

Không có một danh sách “tám tông môn cố định” áp cho mọi lượt chơi. Việc sinh tên và bố trí thế lực là luật tại `genWorld0`, `genRegion` và thế giới mở. Những tông môn hiện hữu của một bản lưu phải lấy từ bản lưu, không sinh lại khi kể chuyện.

## Nhân vật

- Người chơi: xuất thân, giới tính, tên, linh căn, tư chất, khí vận, thể chất; tu vi, lịch luyện, khí huyết, linh lực, tuổi và thọ; công pháp đang vận hành, kỹ năng, trang bị, quan hệ và lịch sử.
- Thiên kiêu: nguyên mẫu trong `world.rivals` giữ danh tính/tông/tính tình; trạng thái trong `run.rivals` giữ còn sống, cảnh giới, tuổi, tiến độ, quan hệ. Tên nổi tiếng không tự đồng nghĩa tốt hoặc xấu.
- Người qua đường, thương nhân, tuần tra: danh tính gắn với thực thể gặp được, không đổi tên giữa mở cảnh và kết quả lựa chọn.
- Nhân vật truyện: khai báo vai trong `actors`; tên được sinh một lần và giữ qua chuỗi. Danh tính không bị trộn với thiên kiêu hoặc một tông ngẫu nhiên khác.
- Kẻ địch: loài/nghề, họ (`thu`, `nhan`, `quy`, `vat`), sinh cảnh, nguyên tố, mẫu hành động và hệ số chiến đấu. Hệ số được áp theo tầng khó, không phải tên khu vực địa lý.

Bảng tên ở `content/characters/name.js`; ngoại hình trong kho `P` ở `content/narration/`; hồ sơ loài/kẻ địch trong `content/characters/en.js` và `content/catalog/beasts.json`. Trạng thái còn sống và quan hệ không được ghi thủ công vào bảng nguyên mẫu.

## Xuất thân, khí vận và thể chất

Xuất thân có thông tin cơ học và truyện thơ ấu riêng. `ORIGIN`, `LS_OG`, `LS_TPG` là bộ nền; `catalog/origins.json` thêm xuất thân viết sẵn. Khí vận gốc mệnh cách cũ có bảng gộp để đọc bản lưu cũ. Hậu thiên khí vận (`HTKV`) là một bộ khác, đạt được trong diễn biến tu luyện.

`TT_DEST` và `TT_PHYS` là dữ liệu tiên thiên. Các hiệu ứng nhập từ game nguồn được chuyển qua `TT_MAP`, bổ sung bởi `TT_EXTRA` và các luật gộp. Đã phân biệt:

- `description`: hiệu ứng được hệ thống thực thi.
- `story`: câu dùng trong lời kể mở đầu.
- `lore`: lời tựa gốc để đối chiếu.

Báo cáo `birth-changes.json` ghi 107 hồ sơ đã rà và 15 trường nhập không được hệ thống hỗ trợ. Không xem “vạn pháp bất xâm” trong lời tựa là cơ chế miễn mọi sát thương.

## Vật phẩm và năng lực

- Trang bị: loại `k` → ô mặc; phẩm → số dòng; yêu cầu sử dụng → bậc người dùng và độ lớn chỉ số. Pháp bảo là một ô cụ thể, mở từ Trúc Cơ.
- Công pháp/tâm pháp: yêu cầu đọc và yêu cầu mở từng dòng. Một dòng có thể thêm chỉ số, mở chiêu, mở tầng hoặc tâm pháp; tham chiếu chiêu bằng ID.
- Kỹ năng/chiêu thức: nguyên tố, bậc, tiêu hao, hiệu ứng, tấn công vật lý/phép, tụ lực, diện rộng. Thần thông bậc 3+ dùng qua pháp tướng; không đồng nhất sách với một chiêu độc lập.
- Đan dược/phù: dùng ngoài trận, trong trận hoặc khi đột phá; có nhóm hiệu ứng thật. Phù cùng hệ có thể dùng tác dụng đánh theo nguyên tố, không coi mọi phù là thuốc hồi máu.
- Nguyên liệu: có tên riêng nhưng tổng lượng vận hành theo ba nhóm. Gợi ý lời tựa được giữ riêng với công thức đang tồn tại.
- Phương tiện: danh mục viết sẵn và nguyên mẫu trạm dịch. Kho có số lượng, mua/thuê, thời gian thuê và yêu cầu dùng. Danh mục viết sẵn đã nối vào kho thật.
- Vật cốt truyện: cất trong `qitems`, chiếm ô túi. Những mục chưa có sự kiện trao/thu được đánh dấu `reference`; tên đẹp không chứng minh một nhiệm vụ đã được triển khai.
- Đồ độc nhất, đồ ngẫu nhiên và bí tịch sinh từ nguyên mẫu vẫn là nguồn hoạt động, bên cạnh danh mục viết sẵn; chúng được liệt kê trong bảng nền `info/items.md`.

Sổ kiểm từng mục nằm trong `reports/catalog-audit.csv`, bản đọc đầy đủ tại `catalog/`. Không đổi ID để chỉ sửa tên.

## Địa lý, địa điểm và thế giới sống

Năm đại khu vực là vị trí trên cùng bản đồ. Mỗi địa điểm có ID, loại, tên, chủ sở hữu, linh khí/nguy hiểm suy ra, trạng thái, vùng đã khám phá và dữ liệu dịch vụ. Mùa, giờ và thời gian thế giới là nguồn cho các điều kiện xuất hiện.

Thực thể có ID, loại, vị trí, lộ trình, hạn tồn tại và dữ liệu danh tính: thương đội, khách, thú triều, tuần tra, thiên kiêu, kẻ truy sát, dị tượng, giao tranh. Chúng khác với chính cảnh sự kiện được mở khi gặp. Không tính mỗi thực thể đang di chuyển là một sự kiện mới được tác giả viết.

`MAPD` là dữ liệu địa hình được sinh từ ảnh; thuật toán đi và tầm nhìn là luật. Tên và mô tả địa điểm thuộc content; hình bản đồ và ảnh gốc vẫn ở `src/assets/` và `src/assets-goc/` để giữ đường dẫn đang hoạt động.

## Nhiệm vụ, dịch vụ, tin tức và điển tích

Nhiệm vụ đang chạy giữ người giao, nơi giao, loại việc, hạn, thưởng, trạng thái và các hậu quả dọc đường. Bảng nhiệm vụ được sinh từ luật; lời yêu cầu và thông báo nằm trong `content/text/`. Các tình huống phụ dùng schema sự kiện ở `content/events/quests/`.

Dịch vụ cố định không cần giả làm truyện ngẫu nhiên: bảng giá, số giờ, yêu cầu và kết quả ở `content/venues/services.json`. Lời thay đổi theo lượt phục vụ vẫn ở kho text; cấu trúc giữ chung ID dịch vụ.

Tin đồn (`RUMOR`) và tin người kiếp trước (`RUMOR_KIEP`) là kho câu. Bảng xếp hạng, người chết, trạng thái làng, hạn nhiệm vụ và kết quả trận là thông tin suy ra từ trạng thái thật. Điển tích (`LORE`), thành tựu (`ACH`) và nâng cấp luân hồi (`UPG`) là các bảng riêng, không phải sự kiện lựa chọn.

## Giao diện, hình ảnh và bản phát hành

`src/react/` vẽ các màn và bảng; `src/game/ui/` giữ cầu nối/hành động, chú thích và các công cụ vẽ. Các mô tả chỉ số phải lấy từ dữ liệu thật. Hình minh họa và âm thanh, nếu được gắn, không nên mang một bản chỉ số riêng.

`phu-sinh.html` và `phu-sinh-thu.html` là sản phẩm build. Không sửa ở đây rồi mong sửa đó quay về nguồn. Các HTML và công cụ ghép đời cũ trong `archive/` không tham gia build.
