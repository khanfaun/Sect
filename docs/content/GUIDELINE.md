# Guideline nội dung Phù Sinh

Ngày biên soạn: 17/11/2026. Luật nền: workspace `d9ab301`. Nội dung truyện được đối chiếu đúng `8b9c479` trên nhánh `codex/chinh-su-kien`. Không merge `main`.

Tài liệu này là quy ước để viết, xếp loại, nhập và kiểm tra **mọi nội dung**, từ một câu tin đồn đến một chuỗi truyện. Nguồn đang hoạt động nằm trong `content/`. Các tài liệu, Excel, HTML cũ trong `archive/` chỉ để đối chiếu.

## 1. Bốn lớp cần phân biệt

| Lớp | Trả lời câu hỏi | Nguồn chính |
|---|---|---|
| Dữ liệu thế giới | Thế giới có những vùng, nơi chốn, loài và thế lực nào? | `content/world/`, `content/characters/` |
| Nội dung tương tác | Người chơi gặp chuyện gì, được chọn gì, trả giá và nhận hậu quả gì? | `content/events/`, `content/venues/services.json` |
| Thông tin vật phẩm và năng lực | Món này thuộc ô nào, dùng ở bậc nào, tác dụng thật là gì? | `content/catalog/`, `content/items/`, `content/rules/` |
| Lời kể và trình bày | Cùng một hành động được kể, mô tả và thông báo như thế nào? | `content/narration/`, `content/text/`, `scriptText` của từng sự kiện |

Luật tính sát thương, đi đường, đột phá, sinh thế giới, lưu/tải và giải quyết lựa chọn nằm ở `src/game/`. Giao diện ở `src/react/`. Không dùng bản HTML đã build làm nơi viết nội dung.

**Một ID có một nguồn chính.** Không sửa đồng thời Excel, Markdown, JSON và bản HTML cho cùng một sự kiện. `tools/content-build.js` sinh lớp dữ liệu tương thích từ nguồn chuẩn. `thu-tu.json` xác định thứ tự nạp bảng và luật.

## 2. Phân loại bằng nhiều trục, không trộn thành một danh sách

Mỗi mục có:

1. `kind`: bộ xử lý — `event`, `story`, `opportunity`, `initiation`, `quest`, `quest-door`, `service`.
2. `trigger.source`: người chơi gặp bằng đường nào — khám phá, đi đường, gặp thực thể, vào quán, kỳ ngộ, nhiệm vụ hoặc một diễn biến hệ thống.
3. `trigger.places` và `venues`: ở đâu.
4. `trigger.levels`, `minUserLevel`, `membership`, `time`: khi nào và ai đủ điều kiện.
5. `theme`: chủ đề; `emotion`/`tags`: cảm xúc hoặc nhãn biên tập.
6. `chain`: truyện lẻ hay phần của một chuỗi, cần lịch sử nào.

Ví dụ: một cảnh tranh luận ở Tàng Kinh Các có thể là `story`, chủ đề thầy trò, cảm xúc phẫn nộ, tại `tong`, chỉ dành cho đệ tử của chính tông môn đó. “Kinh dị”, “ban đêm”, “tông môn” và “chuỗi” thuộc các trục khác nhau.

### Số lượng sau khi tổ chức lại

- 349 cảnh trong kho sự kiện: 149 cảnh nền và 200 cảnh truyện nhập từ nhánh đã chỉ định.
- 28 kỳ ngộ/hộp thoại truyền tâm pháp và tâm ma.
- 8 tình huống dọc đường nhiệm vụ; 3 tình huống khi giao hàng.
- 15 dịch vụ/cơ hội trong trà lâu, khách điếm, tửu phường.
- Tổng **403 mục tương tác** trong cùng danh mục; không gọi 403 mục này là 403 truyện độc lập.
- Bộ `8b9c479`: **100 truyện lẻ + 20 chuỗi × 5 cảnh khai báo = 200 cảnh**. Một lượt đi chuỗi đi qua phần 1 → 2 **hoặc** 2b → 3 → 4, tức bốn cảnh; 2 và 2b là hai nhánh thay thế.

Danh sách đầy đủ ở `DANH-MUC-SU-KIEN.md`; danh sách riêng và phân loại từng cảnh của commit ở `NHANH-8b9c479.md`.

## 3. Quy tắc xuất hiện: ngữ cảnh trước, xác suất sau

Thứ tự quyết định:

1. **Đúng nguồn kích hoạt.** Không kéo một cảnh nội bộ tông môn vào cuộc gặp khách đi đường; không đưa dịch vụ cố định vào kho truyện ngẫu nhiên.
2. **Đúng nơi thực tế.** Kiểm tra loại địa điểm, quán đang mở, chủ sở hữu và sinh cảnh. Không có truyện phù hợp thì không sinh truyện đó; tuyệt đối không bỏ điều kiện để lấp khoảng trống.
3. **Đúng tư cách, bậc và thời điểm.** Kiểm tra quan hệ tông môn, tu vi, mùa, buổi và điều kiện riêng.
4. **Đúng lịch sử.** Chuỗi chưa kết thúc, phần trước đã xảy ra và lựa chọn/kết quả thật khớp.
5. **Đủ thời gian chờ, chưa hết hạn, chưa vượt số lần.** Thiếu tài nguyên khóa lựa chọn cần trả, không nhất thiết khóa cả cảnh.
6. **Chọn theo trọng số** trong tập đã hợp lệ.

Luồng đang dùng: khi khám phá, phần nối tiếp đủ điều kiện được ưu tiên với xác suất 55% nếu có; phần còn lại chọn trong kho thường theo trọng số và số lần đã gặp. Truyện mới gặp tối đa một lần mỗi kiếp. Cảnh nền thường có giới hạn hai lần mỗi kiếp, danh sách gần đây chống lặp, và hồi chờ được khai báo. Danh sách “chuyện trước mắt” được kiểm lại khi buổi, mùa, tháng hoặc cảnh giới đổi.

Với gặp thực thể, danh tính được lấy từ thực thể thật trên bản đồ. Với kỳ ngộ ngẫu nhiên, vẫn phải qua bộ lọc sinh cảnh và thời khắc; quy tắc hiếm và thời gian nghỉ chung của hệ kỳ ngộ tiếp tục có hiệu lực. Truyền tâm pháp bảo đảm có trường hợp ký ức phù hợp ở mọi nơi, không cần tạo ngư ông giữa hoang mạc.

### Năm chủ đề cũ không còn là năm khu vực địa lý

Game hiện dùng một bản đồ liền gồm Trung Châu, Đông Hoang, Nam Trạch, Tây Lĩnh, Bắc Nhạc. `r.region` là địa lý; `rT()` là tầng độ khó theo tu vi.

“Phàm Trần / Linh Sơn / Đông Hải / Cửu U / Cổ Lộ” trong bản thảo là **xuất xứ chủ đề của nội dung cũ**. Không được vì người chơi đạt Kết Đan mà coi mọi nơi họ đứng là biển. Cảnh Đông Hải vẫn cần bến nước, biển hoặc nơi cư trú hợp cảnh; cảnh Cổ Lộ cần địa điểm `thien`. Các phần sau của chuỗi cho phép người chơi đã lên bậc cao quay lại hoàn thành, nhưng vẫn phải tới đúng sinh cảnh và chờ đúng mùa/buổi.

## 4. Ma trận địa điểm và nội dung

| Địa điểm/nguồn | Nên xuất hiện | Điều kiện đặc biệt | Không đặt ở đây |
|---|---|---|---|
| Thôn trấn `tran` | Gia đình, sinh kế, nghề thủ công, mùa gặt, dân gặp nạn, truyền tâm pháp nhập môn | Mùa, buổi; dịch vụ phải vào đúng quán | Long cung, biển sâu, nội điện tông khác |
| Thành/chợ `thanh`, `cho` | Mua bán, phường nghề, lôi đài, bảng việc, đấu giá | Đấu giá có thực thể/thông báo; quỷ thị đúng ban đêm | Coi mọi phố là sông/đảo |
| Trà lâu `tea` | Tin đường sá, chuyện thế lực, bàn cờ, đối câu, truyện người trong quán | Chỉ khi mở trà lâu; tin đồn không tự thay thế sự thật | Đánh cướp mặc định; săn yêu thú |
| Tửu phường `tuu` | Mời rượu, đấu rượu, nghe đàn, kiếm khách say, gã say gây sự | Đối tượng gây sự là người, không sinh yêu thú tùy ý | Tự gán mọi tửu khách là thiên kiêu hoặc kẻ trộm |
| Khách điếm `inn` | Trọ, ăn uống, hỏi chưởng quầy, nhận hộ tống | Có giá và số giờ cụ thể; kẻ đánh chặn hộ tống là cướp | Nghỉ không trả tiền mà vẫn kể đã thuê phòng |
| Sơn môn `tong` | Tuyển đồ, chấp sự, học nghề, luận đạo, chuyện hai phái | Nội bộ: ghi danh đúng tông; khách chỉ được việc ngoài sơn môn | Coi cờ “đã vào tông” là quyền dùng mọi tông |
| Nội bộ tông môn | Dược viên, Tàng Kinh Các, đại bỉ, vu oan, cống hiến | `membership: own`; dùng cùng danh tính tông qua các phần | Người chưa nhập môn tự xưng sư huynh để nhận thưởng chắc chắn |
| Rừng/dược cốc `rung`, `duoc` | Linh thảo, thú rừng, cháy rừng, thợ săn, làng ven rừng | Loài theo sinh cảnh; hái thuốc theo mùa nếu có | Cá biển hoặc sinh vật thủy sinh thuần túy trên đất khô |
| Núi/mỏ/hang `nui`, `khoang`, `dong` | Vách đá, khai khoáng, động phủ, cổ trận | Hang nước phải nói rõ; loại vật liệu đúng nhóm | Mọi hang đều mặc nhiên là long cung |
| Sông/đầm `song`, `dam` | Bến đò, lũ, ngư ông, đầm nước, thủy quỷ | Cảnh đò đêm giới hạn buổi; có thuyền thì giải thích ai sở hữu | Người đang đi bộ đột nhiên có thuyền riêng |
| Biển `bien` | Thuyền, đảo, bão, ngư nhân, hải tặc, lặn | Nói rõ chuyến đò/thuê thuyền; chi phí hợp lời kể | Đặt vào kho thành trì chỉ vì người chơi Kết Đan |
| Phế tích/ma địa `phe`, `ma` | Cổ mộ, oán hồn, luyện thi, bài vị, cấm chế | Không mặc định ai ở ma địa cũng tà ác | Biến cứu người thành ác chỉ vì địa điểm |
| Thiên lộ `thien` | Hư không, thời gian, tiên tích, thử đạo tâm | Bậc nội dung phù hợp; phần thường và phép lạ có quy luật | Phàm nhân mặc nhiên tự ngự kiếm/thi triển thần thông |
| Thương đội | Giao thương, đổi hàng, hộ tống, tin tức | Dùng thương nhân/đoàn thật, giá và mặt hàng có nguồn | Gắn tên một thiên kiêu khác vào thương nhân |
| Tuần tra | Hỏi giấy tờ, kiểm tra, mời vào tông, luận võ, truy bắt có lý do | Giữ đúng tông của đội tuần tra; tỉ thí không cướp túi người thua | Mặc định chính đạo đòi mãi lộ |
| Thiên kiêu | Luận võ, kết giao, tranh cơ duyên, cứu viện | Đúng người còn sống, tông, tính tình và quan hệ | Gán trộm cắp cho người nghĩa hiệp chỉ vì ngẫu nhiên |
| Truy sát | Món oán cũ, người được thuê, báo thù | Có nguồn thù oán và danh tính nhất quán | Chỉ đổi tên người qua đường rồi tự gọi là kẻ thù kiếp trước |
| Nhiệm vụ | Chặn hàng, mưa hỏng hàng, mua chuộc, đổi địa chỉ, người chỉ đường | Có nhiệm vụ mở, loại việc khớp, hạn và thưởng theo trạng thái thật | Cảnh giao hàng khi người chơi không mang nhiệm vụ |

## 5. Chuẩn của một mục sự kiện

Mẫu có thể chép: `content/schemas/event.example.json`. Đặc tả: `content/schemas/event.schema.json`. Văn và lựa chọn đặt chung một mục; một chuỗi ở một tệp, truyện lẻ gom theo chủ đề xuất xứ, các nhóm thực thể tách riêng.

| Trường | Nghĩa |
|---|---|
| `id` | Mã ổn định, không đổi khi chỉ sửa văn; bản lưu dùng mã này |
| `name`, `kind`, `theme`, `emotion`, `tags` | Tên, bộ xử lý và phân loại biên tập |
| `trigger` | Nguồn, nơi, bậc, buổi/mùa, tư cách, tần suất; phải khai báo, không suy từ văn |
| `actors` | Vai, giới tính, phe hoặc nguồn danh tính; nhân vật cố định trong một chuỗi |
| `setting` | Mô tả bối cảnh và điều kiện bản thảo để người viết đối chiếu |
| `text` | Mở cảnh; chuỗi là một đoạn, mảng là các cách mở **cùng ngữ cảnh** |
| `choices` | Nhãn `l`, văn kết `t`, giá `cost`, điều kiện `need`/`req`, hệ quả `e` |
| `chain` | Mã chuỗi, phần, thời gian chờ, lựa chọn cần, đường dẫn nhánh |
| `logic` | Nối cơ chế đặc thù đang có; hàm được tham chiếu bằng `$hook` |
| `scriptText` | Toàn bộ câu kết/thông báo của callback trong chính mục này, để sửa văn không cần sửa hàm |
| `origin` | Nguồn trước khi di chuyển, ID và commit để tra lịch sử |

Mục mới không nên cần callback. Dùng `cost`, `e`, `chk`, `ok/no`, `fight`, `win/lose` nếu đủ. Callback cũ đã tách vào `content/hooks.js`; không viết code dưới dạng chuỗi rồi `eval` lúc chơi. Kiểm tra build từ chối ID trùng, hook không tồn tại, trường hiệu ứng không hỗ trợ và đường dẫn chuỗi sai.

### Quy tắc lựa chọn và hệ quả

- Nói rõ **ai làm, ai giữ vật, chi phí thuộc ai**. Không mặc định người chơi có vườn, kho, thuyền hay quân tùy tùng.
- Hành động có phép phải cần linh lực; phàm nhân không được trả “20% của 0” để dùng phép miễn phí.
- Giúp người có thể đơn giản là giúp; không tự cộng thương tích, tâm ma hoặc mất thọ nếu không được kể.
- Nhận tiền công hợp pháp không mặc định trừ nhân quả. Cứu người không tự phát thêm một món nợ.
- Cho thuốc chữa thương phải tiêu thuốc hồi khí huyết trong ô túi đang mở. Không lấy ngẫu nhiên đan đột phá hay độc dược.
- “Mua rồi bán” phải có vốn nếu là giao dịch thực. Khai báo vốn bị trừ, vốn được hoàn lại cộng lãi; `accounting` giải thích cách tính.
- “Nhận áo”, “nhận kiếm”, “lấy mực” phải trao đúng loại. `namedRelic` cho trang bị có loại cố định; `namedMat` cho nguyên liệu cụ thể; `item/rmItem` cho vật truyện. Không thay bằng món đồ ngẫu nhiên không liên quan.
- Kỷ vật và nguyên liệu không tự có kỹ năng đang hoạt động chỉ vì lời tựa tả phép lạ. Tác dụng thật nằm trong trường hiệu ứng và bảng chỉ số.
- Đánh nhau phải nêu đúng đối thủ. `chk` là phép thử chỉ số; nó không phải một trận chiến. Trận chiến cần `fight` và kết quả `win`, nên viết cả `lose`. Chuỗi có trận thật cần đánh dấu lịch sử ở kết quả tương ứng.
- Tỉ thí và người chính đạo không mặc định lục túi đối thủ thua. Hành vi trái phe chỉ hợp lệ khi có sự kiện, tính tình hoặc bí mật giải thích rõ.
- Có lối bỏ qua khi hoàn cảnh cho phép. Giữa bão không “cáo từ” để biến về bờ; lối tránh nguy hiểm vẫn phải có cái giá được kể.

### Thời gian và đơn vị

- Đồng hồ nội bộ: 1 ngày = 24 giờ, 1 tháng = 720 giờ, 1 năm = 8.640 giờ.
- `waitHours` là **thời gian tối thiểu**, không phải lịch hẹn chính xác. Nếu yêu cầu mùa đông, vẫn cần `time.season: ["dong"]`.
- `cost.st` và `e.st` của EVS là số cơ sở, được nhân hệ số kinh tế theo tầng hiện tại; không dùng giá của dịch vụ rồi nhân lần nữa. Dịch vụ dùng `stoneBase` và hàm `price()`.
- `cost.mp: "20%"`, `e.hp: "-15%"` là phần trăm mức tối đa. `lifeCut` là phần trăm thọ tối đa; `life` là số năm cộng. Viết “mất tám năm” thì dùng thao tác mất số năm, không dùng `lifeCut: 8`.
- Buổi: `sang` 05–11h, `chieu` 11–17h, `toi` 17–21h, `dem` 21–05h. Mùa: `xuan`, `ha`, `thu`, `dong`.
- “Có hạn chót” trong nhãn văn chương chưa phải nhiệm vụ có hạn. Hạn của nhiệm vụ phải nằm trong trạng thái nhiệm vụ; cảnh trước hoàng hôn được giới hạn buổi khi chọn.

## 6. Chuỗi và bản lưu

Giữ nguyên ID, thứ tự lựa chọn đã phát hành và vai nhân vật. Thêm lựa chọn ở cuối; không đổi chỗ lựa chọn cũ. Thay nghĩa một nhánh phải đổi cả `paths` và viết kiểm tra đường đi.

`chain.paths` dùng `phần:chỉ_số` hoặc `phần:chỉ_số:ok/no`; chỉ số bắt đầu từ 0. Phần 2b là một phần riêng, không chép đè vào phần 2. Kết quả thắng/thua được lưu vào lịch sử chuỗi. Không suy rằng lựa chọn 0 luôn là thiện hoặc đã thắng. Cụm câu “Nếu …,” phải tương ứng với danh sách đường dẫn, phần văn chung đặt sau cụm.

Tên nhân vật và các tông môn trong chuỗi được giữ; địa điểm hiện tại vẫn theo từng phần. Bỏ đi khép chuỗi. Đủ thời gian không đảm bảo tự gặp ngay: người chơi vẫn cần tới sinh cảnh phù hợp. Với bản lưu cũ thiếu kết quả phép thử, dùng đoạn chung an toàn, không tự suy đã thắng. Bản lưu chỉ biết “đã vào tông” mà thiếu danh tính sẽ gắn vào tông đang đứng nếu phù hợp, nếu không dùng tông chính đạo đầu tiên theo thứ tự thế giới; quy tắc này chỉ nhằm khôi phục dữ liệu thiếu, không phải chuyển tông mới.

## 7. Vật phẩm, trang bị và năng lực

| Khái niệm | Đơn vị/ý nghĩa |
|---|---|
| Cảnh giới game `realm` | 0 Luyện Khí, 1 Trúc Cơ, 2 Kết Đan, 3 Nguyên Anh, 4 Hóa Thần, 5 Độ Kiếp; phàm nhân có cờ riêng |
| Bậc người dùng trang bị `req` | 0 Phàm nhân, 1 Luyện Khí, **2 Trúc Cơ**, 3 Kết Đan, 4 Nguyên Anh, 5 Hóa Thần, 6 Độ Kiếp |
| `arts.req` và dòng công pháp | Chỉ số đại cảnh giới 0–5; nhập môn dẫn khí có xử lý riêng cho phàm nhân |
| Phẩm `t`/`tier` | 0–6: Phàm, Hoàng, Huyền, Địa, Thiên, Tiên, Thần; không đồng nghĩa cảnh giới |
| `reg`/`regs` trong danh mục nhập | Tầng nội dung/độ khó 0–4, không phải khu vực địa lý mới |
| Loại `k` | Quyết định ô thật qua `KSLOT`; không suy từ chữ “bảo” trong tên |

Ô pháp bảo đầu tiên mở từ Trúc Cơ. Tất cả đường tạo pháp bảo — danh mục, đồ ngẫu nhiên, độc nhất, thưởng truyện, vật đang có trong bản lưu — cùng tuân sàn yêu cầu **bậc 2**. Đồ phẩm cao chưa chắc cần cảnh giới cao; trang bị khác vẫn có thể có yêu cầu bậc 0 hoặc 1.

Kiếm, giáp, ngọc bội, túi trữ vật, hỏa chủng, lô đỉnh và trận bàn có ô riêng. Dùng “bảo vật/trang bị” khi nói chung; “pháp bảo” dùng cho ô pháp bảo cụ thể. Chiêu bậc 3 trở lên là thần thông, vận hành qua pháp tướng. Đọc được bí tịch không đồng nghĩa được dùng mọi dòng bên trong.

Mỗi vật phẩm phải có ID, loại, phẩm, yêu cầu, hiệu ứng thật, nguồn và trạng thái. Công pháp phải tham chiếu chiêu có thật; cảnh giới mở dòng không thấp hơn yêu cầu sách. Đan đột phá phải đúng **cảnh giới đang chuẩn bị đột phá**, không nhầm với cảnh giới đích.

Nguyên liệu đang được gom theo ba nhóm `thao/khoang/dan`. Tên đan được nhắc trong lời tựa không tự tạo một công thức riêng. Các gợi ý nhập cũ giữ trong `recipeNotes`. Vật truyện chưa có sự kiện trao/thu được đánh dấu `reference`, không mô tả như một nhiệm vụ đã chơi được.

Khí vận/thể chất nhập từ game nguồn được rà qua bộ chuyển hiệu ứng của Phù Sinh. `description` ghi tác dụng thực; `story` là câu cho truyện mở đầu; `lore` lưu lời tựa cũ để đối chiếu. Trường hồi phục/chỉ số không được bộ chuyển hỗ trợ không được quảng cáo như đang hoạt động.

## 8. Tin đồn, thông tin nhân vật và thế giới

- Tin đồn không là sự thật xác nhận. Dòng truyền miệng phải được nhận diện; tin chết phải khớp trạng thái người đã chết.
- Dùng hồ sơ thiên kiêu thật: tên, giới tính, tông, tính tình, cảnh giới, còn sống và quan hệ. Không sinh lại một nhân vật khác cho kết quả của cùng cuộc gặp.
- Người `nghia` không được đưa vào mẫu tin giết người đoạt bảo ngẫu nhiên. Trường hợp vu cáo cần viết thành sự kiện riêng có lời đồn, bằng chứng và hậu quả.
- Tông môn có phe `chinh/ma/phat/trung` và nghề truyền thừa; phe không tự định mọi phẩm chất của từng người.
- Sinh yêu thú theo môi trường, không chỉ theo tầng người chơi. Một cảnh trai ngọc phải đánh trai ngọc, không dùng nhầm mã nhóm “quỷ”.
- Bảng tên và hậu tố sinh ngẫu nhiên là dữ liệu; bản thân phép sinh thế giới là luật. Danh mục nguyên mẫu khác với nhân vật thực của mỗi thế giới đã lưu.
- Các thông tin giao diện như giá hiện tại, trạng thái túi khóa, điểm khí huyết, danh tính người lạ là dữ liệu suy ra khi chơi; không sao chép thành một bản thủ công dễ lỗi thời.

## 9. Quy trình sửa và kiểm tra

1. Tìm ID trong danh mục đọc; mở **nguồn chuẩn** được ghi cạnh ID đó.
2. Sửa văn và điều kiện cùng lúc. Nếu chỉ sửa câu chữ, không đổi ID/thứ tự lựa chọn.
3. Nếu thêm mục hoặc tệp, đăng ký trong manifest; dùng schema mẫu. Không ghi số thưởng vào văn nếu hệ số có thể thay đổi theo tầng.
4. Chạy `npm run content:check` và `npm run content:stories`.
5. Chạy các bài luật liên quan; sau thay đổi rộng chạy `npm run test:rules` (đã bỏ bài bot `smoke`).
6. Chạy `npm run content:docs`, `npm run build`, `npm run build:thu`; kiểm tra giao diện liên quan bằng `tools/test-ui.js`.
7. Đọc báo cáo thay đổi theo từng ID. Nếu bài kiểm tra thất bại thì sửa nguồn/luật, không sửa kết quả mong đợi để che sai ngữ nghĩa.

Bộ kiểm tra có thể xác nhận dữ liệu, biến, nhánh, chi phí và tác dụng đang thực thi; nó không thay thế biên tập văn học hoặc đánh giá cân bằng dài hạn. Đợt này không chạy bot theo hướng dẫn của dự án. Mọi giới hạn hoặc dữ liệu chưa được nối cơ chế phải được ghi trong báo cáo, không tính như một tính năng hoàn chỉnh.
