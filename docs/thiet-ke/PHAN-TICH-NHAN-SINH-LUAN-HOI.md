# Phù Sinh — Phân tích & hướng đi: Trăm kiếp nhân sinh

Ngày soạn: 17/11/2026 · Nhánh: `claude/busy-cray-fctc4p` (đã gồm `main` ef2ced2) · Loại: tài liệu thiết kế, **chưa sửa mã**.

Tài liệu này phân tích 13 yêu cầu, đối chiếu với game hiện có, tham khảo tác phẩm, rồi chốt **một hướng đi cụ thể** và **toàn bộ dữ liệu cần có**. Mọi bảng đều là dữ liệu thật để nhập, không phải ví dụ. Chỗ nào ghi "đề xuất số ban đầu" nghĩa là con số dùng ngay được, chỉ chỉnh lại khi người dùng cho phép đo bằng bot.

Cách đọc: Phần 0 là tóm tắt. Phần 1–2 là nền. Phần 3–15 là thiết kế từng yêu cầu. Phần 16–19 là danh mục dữ liệu, kiểm tra, lộ trình, câu hỏi còn mở.

---

## 0. Tóm tắt các quyết định chính

| # | Yêu cầu | Quyết định |
|---|---|---|
| 1–4 | Vô linh căn | Thêm bậc **Vô linh căn** (không dẫn khí được, bị coi là phế vật). Kiếp 1 luôn có linh căn. Từ kiếp 2: **45%** vô linh căn, dao động **30–65%** theo nhân quả kiếp trước. Linh căn được tung **một lần cho cả kiếp** và **giấu đến lúc trắc linh** (không còn chọn thẻ để né). Có **15 con đường cải tạo** bằng kỳ ngộ, tạo ra 7 loại **hậu thiên linh căn**. |
| 5, 12 | Mục tiêu game, văn phong | Phù Sinh là game **trải nghiệm đời người** trong thế giới tu tiên u ám: mỗi kiếp là một con người khác, phần lớn khổ, ít người thành. Vòng luân hồi là một giấc mộng lặp lại; mục tiêu tối thượng là **Tỉnh Mộng + Phi Thăng**. Độ khó tăng có bảng chỉ tiêu cụ thể. |
| 6 | Đại đạo ba ngàn | Không chọn lớp nhân vật. Con đường hình thành từ việc làm: **17 phàm đạo**, **võ đạo phàm nhân 6 bậc**, **19 tu đạo**, **22 pháp môn** (mỗi pháp môn 3 công pháp + 5 chiêu). |
| 7–9 | Nhân quả & chính tà | Tách làm hai thước đo, **không hiện số**: **Đạo Hướng** (chính–tà, tác dụng kiếp này, 7 bậc hướng × 5 bậc đậm nhạt) và **Nhân Quả** (phúc–nghiệp, quyết định khởi đầu kiếp sau và uy lực thiên kiếp, 9 bậc + "Thiện ác đan xen"). Thêm **Nhân Quả Tuyến** (ân, oán, nợ, hứa, huyết thù, duyên) đi theo người chơi qua các kiếp. |
| 8 | Thiên kiếp công bằng | Nghiệp càng nặng → kiếp càng dữ, thêm đạo, đổi sang Nghiệp Hỏa; qua được → thưởng nhiều hơn và tiêu bớt nghiệp. Phúc dày → "công đức hộ thể" che bớt sát thương, thưởng bình thường. |
| 10 | Tuế biến | Mỗi lần thêm một tuổi, khí vận/thể chất/mệnh cách phù hợp được **tích lũy**, **hao mòn** hoặc gây **biến cố**. Tooltip có dòng "Theo năm tháng" bằng chữ ước lượng. Bảng đủ cho **33 thể chất, 74 khí vận, 18 mệnh cách**. |
| 11 | Tân thủ | **30 nhiệm vụ tân thủ**, chỉ ở kiếp đầu. 6 cái đầu đi lần lượt, sau đó tối đa 3 cái song song. Có thanh tiến độ, phần thưởng ghi rõ, bấm để dẫn đường, ẩn/hiện, bỏ qua có hỏi lại. |
| 13 | Cốt truyện theo xuất thân | Không viết 45 cốt truyện rời. Gom thành **9 Mệnh Tuyến** (đại cốt truyện), mỗi xuất thân gắn một mệnh tuyến + mở đầu riêng. Cốt truyện **kéo chứ không ép**: mỗi bước là một lời mời có hạn; bỏ qua thì thế giới tự diễn tiếp và mệnh tuyến rẽ nhánh, không bao giờ khóa chết. Kết cục xét theo trạng thái lúc kết kiếp nên làm gì cũng có kết cục có nghĩa. Thế giới giữ lại qua các kiếp nên kết cục kiếp này đổi thế giới kiếp sau. |

---

## 1. Hiện trạng game liên quan (đã đối chiếu mã)

| Hệ thống | Hiện có | Vướng với yêu cầu mới |
|---|---|---|
| Linh căn | `content/characters/root.js`: Thiên (×1.6, 5%), Biến dị (×1.45, 6%), Song (×1.2, 18%), Tam (×1.0, 30%), Tứ (×0.85, 25%), Ngũ hành tạp (×0.7, 16%); Cực linh căn chỉ có qua khí vận. Tỉ lệ đột phá cộng theo linh căn `BT_ROOT`. | Không có vô linh căn. Khí vận "Vô Căn" có trong dữ liệu nhưng bị xoá khi chạy (`delete TT_DEST.vo_can` ở core2/12). |
| Phàm nhân | Cờ `r.pham`: bậc trước Luyện Khí, cần 50 tu vi để dẫn khí; khí huyết −20%, linh lực −50%, công −15%. Không có tâm pháp thì sau `TP_Y` năm game **bảo đảm** trao một tâm pháp (core2/10). | Hiện ai cũng tu được. Phàm nhân chỉ là "chờ tu", không phải một cách sống. |
| Đầu thai | Chọn 1 trong 3 thẻ (+1 thẻ mỗi bậc nâng cấp "Thiên mệnh"). Mỗi thẻ có linh căn riêng, xuất thân, mệnh cách, quê, chỉ số; khí vận tung 1–3 cái mỗi thẻ. | Nếu giữ như cũ, người chơi luôn chọn được thẻ có linh căn → tỉ lệ vô linh căn cao trở nên vô nghĩa. |
| Chính tà / nhân quả | Một số duy nhất `r.karma` (−100..100), tên "Thiện / Tà / Trung dung". Dùng ở: điều kiện tông môn, độ thù của thành (≤−60 bị treo thưởng), loại thiên kiếp Nghiệp Hỏa (≤−30), điều kiện thể chất (≥40 / ≤−40), khí vận "thiên về thiện/ác", thành tựu Thiện nhân/Ma đầu, phạt nhiệm vụ trễ hạn. | Gộp chung hai khái niệm khác nhau; hiện bằng số. |
| Xuyên kiếp | `G.meta`: điểm luân hồi, 12 nâng cấp `UPG`, 40 kiếp gần nhất, ký ức tâm pháp, mộ, chôn đồ cho kiếp sau, ân nhân, oan gia (`nemesis`, `legacy.feud`), tin đồn kiếp trước, sự kiện "Nợ kiếp trước", "Người cũ báo ân", "Kẻ thù cũ", "Nấm mộ quen". Thế giới (`G.meta.world`: tông môn, thiên kiêu, thời gian) **giữ lại qua các kiếp**. | Nền rất tốt cho nhân quả xuyên kiếp và cốt truyện thế giới lâu dài. |
| Khí vận, thể chất | 74 khí vận tiên thiên (`TT_DEST`, 6 phẩm), 33 thể chất (`TT_PHYS`) suy ra từ linh căn + khí vận + karma + tính tình; 18 mệnh cách (`TRAIT`); hậu thiên khí vận `HTKV`. Mô tả đã dùng thang chữ "nhẹ / khá / mạnh / rất mạnh". | Chỉ cộng chỉ số cố định, không đổi theo năm. |
| Thời gian | 1 ngày 24 giờ, 1 tháng 720 giờ, 1 năm 8.640 giờ; hồi phục theo tháng; tuổi tính từ `birthAge`. | Chưa có mốc "qua một năm". |
| Thiên kiếp | Kết Đan: tâm ma; Nguyên Anh: 6 đạo; Hóa Thần: 9 đạo + tâm ma; Phi thăng: Âm Hỏa, Bị Phong, Cửu Trùng Lôi. Loại kiếp theo linh căn, Nghiệp Hỏa khi karma ≤ −30. | Chưa phân "nghiệp nặng thì thưởng lớn". |
| Đột phá | Tỉ lệ gốc `BT_BASE` = 62% / 52% / 46% / 40% / 35%. | Dễ so với tinh thần "tu tiên muôn vàn trắc trở". |
| Hướng dẫn | Chỉ có trợ giúp phàm nhân (`phamHelp`) và chú thích. | Chưa có nhiệm vụ tân thủ. |
| Nhiệm vụ | Bảng treo thưởng: 2 loại (đến nơi, diệt), có hạn, phạt. Sổ tay có thẻ nhiệm vụ (`TheNhiemVu.jsx`). | Dùng lại được khung thẻ cho nhiệm vụ tân thủ. |
| Tiền | Chỉ có linh thạch, kể cả phàm nhân mua bánh. | Không tả được "kiếm ngày ba bữa". |
| Kết kiếp | Điểm luân hồi tính theo cảnh giới, số kẻ giết, sự kiện; nguyên nhân chết: chiến đấu, kiếp, tọa hóa, tâm ma, quy ẩn, phi thăng. | Đời phàm nhân gần như không có điểm → người chơi sẽ ghét vô linh căn. |

---

## 2. Tham khảo tác phẩm và điều rút ra

| Tác phẩm | Giai đoạn | Điều đáng học | Áp vào Phù Sinh |
|---|---|---|---|
| Phàm Nhân Tu Tiên (Vong Ngữ) | Kinh điển | Ngụy linh căn tư chất kém; tu tiên là tranh tài nguyên tàn nhẫn; sống sót nhờ cẩn trọng; trắc linh khi sơn môn tuyển đồ | Trắc linh giấu kín; tán tu khổ hành; độ khó; "ngụy linh căn" là kết quả cải tạo phổ biến |
| Tiên Nghịch (Nhĩ Căn) | Kinh điển | Bị tông môn chê tư chất, nghịch thiên nhờ một vật kỳ lạ; đạo tâm đổi theo đau thương | Đường cải tạo linh căn bằng kỳ ngộ có cái giá; nỗi đau làm đổi đạo hướng |
| Đấu Phá Thương Khung (Thiên Tàm Thổ Đậu) | Kinh điển | "Phế vật" bị khinh nhiều năm, cảm xúc bị coi thường | Vô linh căn có sự kiện bị khinh, bị từ hôn, bị gia tộc gạt ra |
| Già Thiên (Thần Đông) | Kinh điển | Thể chất mạnh nhưng không tu theo lối thường được, phải tự mở đường | Vô linh căn có thể đi võ đạo, sau này nối sang luyện thể |
| Thế Giới Hoàn Mỹ (Thần Đông) | Kinh điển | Bị đào cốt cướp thiên phú, tự tu lại | Linh căn có thể bị đoạt; "đoạt căn" và "tàn căn" |
| Tru Tiên (Tiêu Đỉnh) | Kinh điển | Chính đạo giả dối, ma giáo có tình; ranh giới chính tà mờ | Tách "danh" (Đạo Hướng) khỏi "thực" (Nhân Quả) |
| Kiếm Lai (Phong Hỏa Hí Chư Hầu) | Gần đây | Nhân vật mất cơ hội tu tiên, đi võ phu; Nho–Phật–Đạo–Binh mỗi nhà một đạo; quy củ và nhân quả | Võ đạo phàm nhân; Nho tu dưỡng hạo nhiên khí; giữ lời hứa là nhân quả |
| Đại Phụng Đả Canh Nhân (Mại Báo Tiểu Lang Quân) | Gần đây | Nhiều hệ siêu phàm song song (Nho, Đạo, Phật, Võ phu, Binh gia, Thuật sĩ, Cổ, Vu, Yêu) | Đại đạo chia rõ đạo đồ và pháp môn, mỗi đường một bậc thang riêng |
| Quỷ Bí Chi Chủ (Ái Tiềm Thủy Đích Ô Tặc) | Gần đây | Mỗi con đường có thứ tự thăng tiến và cái giá mất kiểm soát | Mỗi pháp môn có phản phệ riêng (huyết thuật mất máu, luyện hồn điên loạn…) |
| Đạo Quỷ Dị Tiên (Hồ Vĩ Đích Bút) | Gần đây | Tu tiên quỷ dị, thực–mộng lẫn lộn, tinh thần tan vỡ | Chủ đề "giấc mộng luân hồi"; ma đạo và luyện hồn có giá tinh thần |
| Xích Tâm Tuần Thiên (Tình Hà Dĩ Thậm) | Gần đây | Thiên kiêu xuất thân thường, thế giới chính trị nhiều tầng, mỗi bước là đánh đổi | Quan viên, binh lính phàm nhân đan xen với tu sĩ và triều đình |
| Huyền Giám Tiên Tộc (Quý Việt Nhân) | Gần đây | Một gia tộc phàm nhân qua nhiều đời, phần lớn không có linh căn, chết nhiều, đi lên chậm | Mệnh tuyến "Thế Gia Vạn Đại"; gặp lại hậu duệ của kiếp trước |
| Lạn Kha Kỳ Duyên (Chân Phí Sự) | Gần đây | Đời sống phàm nhân bình thường cũng đáng kể | Sinh kế, gia đình, mùa vụ là nội dung chính chứ không phải nền |
| Liễu Phàm Tứ Huấn; Thái Thượng Cảm Ứng Thiên; Công Quá Cách | Cổ thư | Sổ ghi công – quá; mệnh có thể đổi bằng việc làm | "Sổ Nhân Quả" ẩn, mở ra khi kết kiếp |
| Quỷ Cốc Bát Hoang (Tale of Immortal) | Game, gần đây | Linh căn, khí vận theo phẩm, nghịch thiên cải mệnh | Khí vận nhiều phẩm, sự kiện cải mệnh |
| Kỳ Diệu Tu Tiên Mô Phỏng Khí (Amazing Cultivation Simulator) | Game | Môn phái nhận cả người không tu được làm tạp dịch | Vô linh căn làm tạp dịch tông môn; chưởng môn võ phái |
| Mịch Trường Sinh | Game | Tu tiên khắc nghiệt, tài nguyên hiếm, thọ nguyên là áp lực | Bảng độ khó, giá cả, thọ |
| Nhân Sinh Trùng Khai Mô Phỏng Khí (trò chơi web) | Game, gần đây | Mỗi kiếp tung thiên phú; phần lớn đời bình thường; tổng kết đời ngắn mà thấm | Vô linh căn cao; bia mộ cuối kiếp; đời vô danh vẫn có kết |
| The Life and Suffering of Sir Brante | Game, gần đây | Sinh ra trong tầng lớp; lựa chọn đạo đức mơ hồ; chết có giới hạn | Xuất thân quyết định nhiều; lựa chọn có giá |
| Crusader Kings III | Game, gần đây | Tính cách + căng thẳng khi làm trái tính; chí hướng | Làm trái Đạo Hướng gây đạo tâm dao động; "Chí hướng" thay cho bắt buộc theo truyện |
| Mount & Blade II: Bannerlord | Game, gần đây | Cốt truyện chính có thể bỏ, tự làm thương nhân/lính/lãnh chúa | Mệnh tuyến không ép; phàm đạo tự do |
| Đại Hiệp Lập Chí Truyện (Hero's Adventure) | Game, gần đây | Võ hiệp tự do, nhiều nghề | Võ đạo phàm nhân, nghề nghiệp |
| Fallen London / Sunless Sea | Game | Cốt truyện dạng mảnh mở theo điều kiện, không theo đường thẳng | Mệnh tuyến = chuỗi nút mở theo điều kiện |
| Rogue Legacy | Game | Mỗi đời có đặc điểm tốt/xấu ngẫu nhiên | Khí vận xấu vẫn vui vì là màu sắc của đời |
| Kenshi | Game | Bạn không phải người được chọn | Phàm nhân rất yếu; tu sĩ là tai họa |
| Hades | Game | Chết là một phần câu chuyện; tiến bộ xuyên kiếp | Bến Vong Xuyên có câu chuyện riêng; Mộng Ấn |
| Citizen Sleeper | Game, gần đây | Sinh tồn từng ngày theo chu kỳ, u buồn mà ấm | Cơm ăn mỗi ngày có cơ chế |
| Stardew Valley | Game | Nghề theo mùa | Nông dân, ngư dân, tiều phu theo mùa |

---

## 3. Mục tiêu mới của game và văn phong (yêu cầu 5, 12)

### 3.1 Định nghĩa một câu

> **Phù Sinh là game trải nghiệm những đời người trong một thế giới tu tiên u ám. Mỗi kiếp là một con người khác — có kiếp là đứa trẻ vô linh căn chết đói năm ba mươi tuổi, có kiếp là thiên kiêu vượt lôi kiếp, có kiếp là ma đầu không còn biết thương ai. Game không chấm điểm đạo đức; nó ghi lại nhân quả và trả về đúng lúc. Vòng luân hồi là một giấc mộng lặp lại; chỉ người tỉnh mộng và phá cửa phi thăng mới thoát ra.**

Tên game khớp chủ đề: "Phù sinh nhược mộng" — đời người nổi trôi như giấc mộng.

### 3.2 Bốn trụ cột (dùng để duyệt mọi tính năng)

| Trụ cột | Nghĩa | Hệ quả thiết kế | Cách kiểm |
|---|---|---|---|
| Đa dạng nhân sinh | Mỗi kiếp khác thật sự | Linh căn giấu, vô linh căn cao, xuất thân đổi theo nhân quả, 17 phàm đạo + 19 tu đạo, mệnh tuyến theo xuất thân | Trong 10 kiếp liên tiếp có ít nhất 4 "kiểu đời" khác nhau (đo bằng đạo đồ chủ đạo lúc kết kiếp) |
| Sự thật trần trụi | Tu tiên khó, chết dễ, người thường càng khổ | Bảng độ khó ở Phần 4; cơm áo; thương thế lâu lành | Tỉ lệ đạt cảnh giới theo bảng chỉ tiêu |
| Không phán xét | Thiện có thể bị phạt, ác có thể được lợi | Hai thước đo tách nhau; 30 tình huống mơ hồ; hậu quả đến trễ | Mọi sự kiện có lựa chọn "thiện" đều phải có ít nhất một nhánh kết quả xấu và ngược lại |
| Cảm xúc trước con số | Kể bằng chữ | Đạo Hướng, Nhân Quả, tuế biến hiện bằng chữ; bia mộ + Sổ Nhân Quả cuối kiếp | Không có con số nào trong tooltip của ba hệ đó |

### 3.3 Mười hai "kiểu đời" mà game phải tạo ra được

| Kiểu đời | Sinh ra từ | Nhịp cảm xúc mong muốn |
|---|---|---|
| Phàm nhân mưu sinh | Vô linh căn + phàm đạo nông/ngư/tiều | Mỏi mệt, niềm vui nhỏ (bữa cơm, đứa con), mất mát (mùa đói, binh lửa) |
| Phế vật nghịch mệnh | Vô linh căn + cải tạo linh căn | Tủi nhục → hy vọng → trả giá |
| Tán tu khổ hành | Có linh căn, không tông môn | Cô độc, dè chừng, mỗi viên đan là một canh bạc |
| Đệ tử tông môn | Nhập tông chính hoặc ma | Thuộc về, ganh đua, bị lợi dụng |
| Thiên kiêu tuyệt thế | Linh căn cao + khí vận phẩm cao | Ngạo nghễ, bị đố kỵ, sợ ngã |
| Ác ma vô tình | Đạo Hướng Ma Tâm/Vô Gian | Quyền lực, trống rỗng, bị cả thiên hạ săn |
| Kẻ trung dung lặng lẽ | Đạo Hướng Tùy Tâm + thương tu | Khôn ngoan, không ai tin hẳn |
| Võ lâm tông sư | Vô linh căn + võ đạo | Đỉnh cao của người thường vẫn thấp hơn tu sĩ — kiêu hãnh và bất lực |
| Quan lại / tướng quân | Phàm đạo quan viên/binh lính | Quyền thế phàm trần, bị tu sĩ coi như cỏ |
| Thầy thuốc cứu đời | Lang trung / dược sư | Cứu được người này, không cứu được người kia |
| Kẻ báo thù | Nhân quả tuyến huyết thù từ kiếp trước | Chấp niệm, khi báo xong thì trống rỗng |
| Người sống tạm | Rớt cảnh giới / thọ sắp cạn | Chạy đua với thời gian |

### 3.4 Văn phong (yêu cầu 12) — quy ước viết cho mọi nội dung mới

Nội dung sự kiện trên `main` đã được chỉnh theo hướng u ám; mục này ghi thành quy ước để mọi tính năng mới viết cùng giọng.

**Giọng kể**
- Ngôi thứ ba, lạnh, chừng mực. Câu ngắn xen câu dài. Không cảm thán, không đùa cợt lố.
- Bảng màu chữ: tro, sương, mực loang, bùn, mưa dầm, đèn dầu sắp tắt, chuông xa, gió lùa khe cửa, mùi thuốc, mùi máu khô.
- Niềm vui phải nhỏ và mong manh (bát cháo nóng, tiếng con gọi, một mùa được lúa) để mất mát có sức nặng.
- Không hiện số trong văn kể. Số chỉ nằm ở bảng chỉ số và chip kết quả.
- Không từ hiện đại; Hán Việt vừa phải, ưu tiên chữ thuần Việt cho đời thường.

**Ba tầng tuyệt vọng (mỗi kiếp phải chạm ít nhất hai tầng)**
1. Tầng đời: cơm áo, bệnh tật, thuế má, binh lửa, già yếu, người thân chết.
2. Tầng đạo: tu sĩ coi phàm nhân như cỏ; cá lớn nuốt cá bé; tông môn dùng đệ tử như quân cờ; đột phá thất bại là tàn phế.
3. Tầng mộng: cảm giác "đã từng sống cảnh này"; ký ức kiếp trước loé lên rồi tắt; người lạ nhìn mình như quen; mọi thứ quay vòng.

**Mô-típ xuyên kiếp (dùng lại có chủ đích, không lạm dụng)**

| Mô-típ | Xuất hiện ở | Ý nghĩa |
|---|---|---|
| Bến Vong Xuyên | Màn giữa hai kiếp (đã có `ManBenVongXuyen`) | Nơi mộng nối mộng |
| Chuông Phù Sinh | Một tiếng chuông khi đầu thai, khi chết, khi nhặt Mộng Ấn | Dấu hiệu vòng lặp |
| Người Gác Bến | Mỗi kiếp hiện ra một lần dưới hình dạng khác (lão chèo đò, đứa trẻ ăn mày, ni cô mù, người bán canh) | Người biết sự thật về vòng mộng |
| Mộng Ấn | Mảnh ký ức chân tướng, mỗi kiếp nhặt được tối đa 1 | Tiến độ "Tỉnh Mộng" (Phần 14.7) |
| Vết son nơi cổ tay | Mô tả nhân vật có Mộng Ấn | Người khác nhận ra kẻ "đã tỉnh một phần" |
| Bát canh nguội | Lời kể khi đầu thai | Quên mà không quên hết |

**Hy vọng duy nhất là thức tỉnh.** Chủ đề phải cho thấy: sống tốt hay xấu đều quay lại bến cũ; chỉ hiểu được giấc mộng và phá cửa phi thăng mới ra khỏi vòng. Điều này đặt nền cho kết thúc thật của game (Phần 14.7).

---

## 4. Độ khó mới (yêu cầu 5)

### 4.1 Chỉ tiêu mục tiêu (kiếp có linh căn, người chơi trung bình, không mất phí nâng cấp luân hồi)

| Mốc | Tỉ lệ kiếp đạt được |
|---|---|
| Dẫn khí nhập thể (vào Luyện Khí) | 85% |
| Trúc Cơ | 40% |
| Kết Đan | 12% |
| Nguyên Anh | 3% |
| Hóa Thần | 0,7% |
| Phi thăng | dưới 0,1% |

| Nguyên nhân chết (mọi kiếp, gồm vô linh căn) | Tỉ lệ mục tiêu |
|---|---|
| Chiến đấu (yêu thú, cướp, tu sĩ) | 35% |
| Thọ tận / già yếu | 25% |
| Bệnh tật, đói rét, tai ương phàm trần | 12% |
| Đột phá thất bại / thiên kiếp | 13% |
| Tâm ma | 5% |
| Bị truy sát / oan gia | 5% |
| Quy ẩn, phi thăng, khác | 5% |

### 4.2 Đòn bẩy cụ thể (đề xuất số ban đầu, so với hiện tại)

| Đòn bẩy | Hiện tại | Đề xuất |
|---|---|---|
| Tỉ lệ đột phá gốc `BT_BASE` (Luyện Khí→Trúc Cơ, →Kết Đan, →Nguyên Anh, →Hóa Thần, →Độ Kiếp) | 62 / 52 / 46 / 40 / 35% | **45 / 36 / 28 / 20 / 14%** |
| Trần tỉ lệ đột phá sau mọi cộng thêm | không rõ | **88%** (không bao giờ chắc chắn) |
| Đột phá thất bại | mất tu vi / thương thế | thêm: 25% rơi thương thế bậc 2, 8% bậc 3 (tàn phế), thất bại lần 3 liên tiếp ở cùng cảnh giới → "tâm cảnh vỡ" tâm ma +15 |
| Tu vi nhận khi bế quan | ×1 | **×0,75** |
| Tu vi nhận từ lịch luyện | ×1 | **×0,85** |
| Chỉ số kẻ địch cùng tầng | ×1 | **×1,15**; thêm biến thể "tinh anh" 15% (×1,5 chỉ số, rơi đồ tốt hơn) |
| Linh thạch rơi | ×1 | **×0,8** |
| Giá đan dược ở phường thị | ×1 | **×1,2**; đan đột phá Trúc Cơ trở lên chỉ có ở đấu giá, cống hiến tông môn, kỳ ngộ |
| Thương thế tự lành | theo tháng | chậm hơn **30%**; bậc 3 không tự lành, cần thuốc hoặc dưỡng thương |
| Thua trận khi không bỏ chạy được | mất máu, thương thế | thêm 20% bị cướp sạch đồ trên người (trừ túi trữ vật đã khoá) nếu đối thủ là người |
| Phàm nhân/vô linh căn | khí huyết −20% | kẻ cướp phàm, sói, lũ lụt đủ giết người; tu sĩ Luyện Khí sơ kỳ đã gấp 3 lần một phàm nhân khỏe |

Chỉ chỉnh lại các số này khi người dùng cho phép chạy bot đo (quy định CLAUDE.md).

### 4.3 Bù lại để khó mà không bực
- Thông tin rõ: trước khi đột phá, bảng chuẩn bị nói tỉ lệ bằng chữ ("may rủi chia đôi", "mười phần chỉ hai ba") và nói luôn hậu quả thất bại.
- Chết sớm vẫn có ý nghĩa: điểm luân hồi mới cho đời phàm nhân, Mộng Ấn, nhân quả tuyến chuyển sang kiếp sau (Phần 15).
- Luôn có đường lui: bỏ chạy có giá, quy ẩn, phàm đạo.

---

## 5. Linh căn, vô linh căn và cải tạo linh căn (yêu cầu 1–4)

### 5.1 Bảng linh căn đầy đủ sau khi thêm

**Tiên thiên (sinh ra đã có)**

| Mã | Tên | Hệ | Tốc độ tu | Cộng đột phá | Tỉ lệ kiếp 1 | Tỉ lệ kiếp 2+ (trước khi chỉnh theo nhân quả) |
|---|---|---|---|---|---|---|
| `vo` | **Vô linh căn** | 0 | không tu được | — | 0% | **45%** |
| `tap` | Ngũ hành tạp linh căn | 5 | ×0,7 | −6 | 16% | 8,8% |
| `tu` | Tứ linh căn | 4 | ×0,85 | −3 | 25% | 13,75% |
| `tam` | Tam linh căn | 3 | ×1,0 | 0 | 30% | 16,5% |
| `song` | Song linh căn | 2 | ×1,2 | +2 | 18% | 9,9% |
| `bien` | Biến dị linh căn (Lôi/Băng/Phong) | 1 | ×1,45 | +4 | 6% | 3,3% |
| `thien` | Thiên linh căn | 1 | ×1,6 | +6 | 5% | 2,75% |
| `cuc` | Cực linh căn | 5 | ×1,5 | — | chỉ qua khí vận | chỉ qua khí vận |

Kiếp 2+: 55% còn lại chia theo đúng tỉ trọng cũ (5:6:18:30:25:16).

**Hậu thiên (có được nhờ cải tạo)** — trần cảnh giới là cảnh giới cao nhất có thể đạt nếu không cải tạo tiếp.

| Mã | Tên | Hệ | Tốc độ tu | Cộng đột phá | Trần cảnh giới | Tác dụng phụ | Nâng cấp được thành |
|---|---|---|---|---|---|---|---|
| `tan` | Tàn linh căn | 1 hệ ngẫu nhiên hoặc theo vật | ×0,5 | −10 | Trúc Cơ viên mãn | Linh lực tối đa −20% | `nguy` (Khai Linh Đan lần 2) hoặc `hau` (linh tủy) |
| `nguy` | Ngụy linh căn | 4–5 hệ | ×0,6 | −8 | Kết Đan viên mãn | Không | `hau` (linh tủy, Ngũ Hành Linh Quả) |
| `hau` | Hậu thiên linh căn | 1–3 hệ theo vật | ×0,8 (1 hệ ×0,9) | −4 | Nguyên Anh viên mãn | Không | `tao` (Tạo Hóa Thần Dịch) |
| `doat` | Đoạt linh căn | Giữ hệ của nạn nhân | ×0,85 × tốc độ gốc của nạn nhân | −2 | như gốc | **Bài xích**: mỗi năm 30% tâm ma +4..8; khi tâm ma ≥ 80, 10% linh căn tan rã thành `tan` | không |
| `huyet` | Huyết linh căn | hệ Huyết (riêng) | ×0,9 khi tu huyết thuật, ×0,4 với công pháp khác | 0 | Hóa Thần | Mỗi tháng không có máu tươi (giết sinh linh hoặc tự rút 10% khí huyết tối đa trong 7 ngày) → tu vi tháng đó bằng 0 | không |
| `co` | Cổ căn | theo loại cổ (Mộc/Thủy/Độc) | ×0,75 | −4 | Kết Đan (diệt cổ mẫu → thành `hau`) | Nuôi cổ mỗi tháng; bỏ 2 tháng → phản phệ: thương thế bậc 3, mất căn | `hau` |
| `tao` | Tạo hóa linh căn | 50% Thiên linh căn, 50% Biến dị | như `thien`/`bien` | như gốc | không trần | Không | — |
| `van` | Văn tâm (Nho) | không hệ | chỉ tu Nho thuật ×1,0 | 0 | Nguyên Anh | Không dùng được pháp thuật ngũ hành | không |

### 5.2 Cách tung linh căn (yêu cầu 2, 3)

1. **Kiếp 1** (`G.meta.nlife === 0` lúc đầu thai): không có `vo`, giữ bảng cũ. Linh căn hiện rõ trên thẻ như bây giờ (người mới cần hiểu game).
2. **Kiếp 2 trở đi**: tung **một lần cho cả kiếp**, dùng chung cho mọi thẻ đầu thai. Thẻ khác nhau ở xuất thân, mệnh cách, quê, chỉ số, khí vận — **không** ở linh căn.
3. Tỉ lệ vô linh căn = 45% + điều chỉnh theo bậc nhân quả kiếp trước (Phần 9.5) + điều chỉnh khí vận, kẹp trong khoảng **30%–65%**.
4. Khí vận khi tung:
   - Tung được **Vô Căn** (khôi phục khí vận `vo_can`, bỏ dòng xoá ở core2/12) → chắc chắn vô linh căn. Ngược lại, nếu linh căn ra `vo` thì tự gắn khí vận Vô Căn để hiện trong bảng nhân vật.
   - Khí vận ép linh căn (Lôi Đình Bá, Băng Tâm Ngọc Cốt, Huyễn Ảnh Phong Thân, Băng Phách, Phong Thần, Lôi Thần Giáng Thế, Hỗn Nguyên Đạo, Ngũ Hành Hợp Nhất) và khí vận "nghiêng về hành" **không tác dụng** khi vô linh căn, chuyển thành **ẩn mệnh**: khi cải tạo thành công, linh căn mới được nắn theo các khí vận này (vd vô linh căn mang Lôi Thần Giáng Thế, cải tạo ra `hau` → thành Biến dị Lôi). Tooltip ghi "Ẩn mệnh: chưa có linh căn để ứng nghiệm".
5. Nâng cấp luân hồi mới **Túc Căn** (3 bậc, giá 15 / 30 / 50 điểm): mỗi bậc giảm 4 điểm phần trăm vô linh căn; vẫn không xuống dưới 30%.

### 5.3 Giấu linh căn và Trắc linh

**Lý do:** nếu linh căn hiện trên thẻ, người chơi né được, tỉ lệ cao thành vô nghĩa; giấu đến lúc trắc linh tạo được khoảnh khắc hy vọng → tuyệt vọng (hoặc mừng rỡ) đúng như truyện.

- Kiếp 2+, mọi thẻ ghi **"Linh căn: chưa trắc"**. Nâng cấp "Thiên nhãn" (đã có) hoặc khí vận Thiên Lý Nhãn / Quỷ Nhãn / Nhân Quả Đạo cho thêm **một câu gợi ý mơ hồ** trên thẻ: "Bà đỡ nói đứa bé có cốt cách lạ" (có linh căn) / "Thầy bói lắc đầu, không nói gì" (vô linh căn). Gợi ý đúng 85%.
- Trắc linh xảy ra trong tháng 1–3 của kiếp, theo cách đầu tiên trong các cách sau:

| Cách | Khi nào | Ghi chú |
|---|---|---|
| Sơn môn tuyển đồ ở quê | Sự kiện cố định tháng 1–2 nếu quê có tông môn trong 3 ngày đường | Có linh căn tốt (song trở lên) → được mời nhập môn ngay. Tam/tứ/tạp → làm tạp dịch ngoại môn được. Vô → bị đuổi về, sự kiện "Phế vật" |
| Tu sĩ du phương | Ngẫu nhiên tháng 1–3 ở thôn trấn | Nói thẳng kết quả, có thể nhận làm đồng tử nếu có linh căn |
| Trắc Linh Thạch | Mua ở tạp hóa thành lớn: 30 lượng bạc | Tự trắc bất cứ lúc nào |
| Tự biết | Đọc tâm pháp và tĩnh tọa đủ 60 ngày mà không cảm được khí | Lời kể: "Khí trời đất đi qua người như gió qua lưới rách" |
| Bảo đảm | Hết tháng 3 chưa trắc | Một lão đạo ăn xin ghé cửa, xem tay, nói kết quả (đây cũng là một lần hiện của Người Gác Bến) |

- Trước khi trắc, nhân vật là phàm nhân, chưa dẫn khí được (dù có linh căn); thanh tu vi hiện "Chưa biết mình có tiên duyên hay không".

### 5.4 Vô linh căn = phế vật: tác dụng cụ thể (yêu cầu 1, 4)

**Bị chặn**
- Không dẫn khí nhập thể: tu vi luôn 0; linh lực tối đa 0; không có lịch luyện tu tiên; không bế quan, không đột phá, không thiên kiếp.
- Đọc tâm pháp, công pháp được (biết chữ) nhưng không vận hành; game ghi "Có thể đọc, không thể luyện".
- Không dùng pháp bảo, phù, trận bàn, chiêu cần linh lực; không mở túi trữ vật (đã khoá với phàm nhân).
- Đan tăng tu vi vô dụng; uống đan trên Hoàng phẩm → "linh khí bạo thể": mất 20% khí huyết, 10% thương thế bậc 1.
- Thọ nguyên: 60 năm gốc, dao động 45–80 theo thể chất và khí vận; lão hóa từ 50 tuổi (Phần 12.4).

**Bị đối xử như phế vật**
- Tông môn tuyển đồ đuổi về; nội môn mọi tông cấm vào; chỉ làm tạp dịch ngoại môn (gánh nước, quét sân, chăm dược viên) với lương 1 lượng bạc/tháng và bị đệ tử sai bảo.
- Phường thị, đấu giá của tu sĩ: phải có người dẫn hoặc thẻ khách; giá +30%; nhiều chủ quán từ chối bán.
- Sự kiện xã hội riêng (Phần 16.4): bị từ hôn, bị gia tộc gạt khỏi gia phả, bị tu sĩ trẻ làm nhục, bị bắt làm dược nhân, đứng nhìn em ruột có linh căn được đưa lên núi.

**Được bù (để kiếp vô linh căn vẫn đáng chơi)**
- Tu sĩ, tuần tra, kẻ truy sát cấp cao không để ý: tần suất bị chặn đường bởi tu sĩ giảm 60%.
- Không có tâm ma từ tu luyện; tâm ma chỉ tăng vì biến cố đời.
- Thuật thần thức nhắm vào linh hải (mê hồn, nhiếp tâm) yếu đi 30% với người không có linh hải.
- Kinh nghiệm phàm đạo và võ đạo nhận **+20%** (ngộ tính dồn vào đời thường).
- Võ đạo phàm nhân lên tới bậc **Tông Sư** (ngang Luyện Khí viên mãn), Phần 7.3.
- Điểm luân hồi tính theo thành tựu đời phàm (Phần 15).

### 5.5 Mười lăm con đường cải tạo linh căn

Mỗi con đường là một chuỗi kỳ ngộ/sự kiện thật, có nơi chốn, có giá. Tuổi càng cao kinh mạch càng cứng: **trên 40 tuổi, tỉ lệ thất bại ×1,5; trên 55 tuổi ×2**.

| # | Tên | Loại | Lấy ở đâu / bằng cách nào | Điều kiện | Kết quả | Cái giá | Đạo Hướng | Nhân Quả |
|---|---|---|---|---|---|---|---|---|
| 1 | **Khai Linh Đan** | Đan, Huyền phẩm | Đấu giá ở thành lớn (khởi giá 300 linh thạch ≈ 7.500 lượng bạc); phần thưởng đại sự kiện tông môn; kỳ ngộ cao nhân | Khí huyết ≥ 50% | 60% → `nguy`; 10% → `hau` 2–3 hệ; 30% thất bại | Thất bại: mất 5 năm thọ, thương thế bậc 2 | 0 | 0 |
| 2 | **Tẩy Tủy Phạt Mạch Kinh** | Công pháp phàm, Hoàng phẩm | Tàng thư võ phái; ẩn sĩ trong núi (kỳ ngộ); 3% có ở tạp hóa thành lớn giá 120 lượng | Luyện liền 3 năm: mỗi tháng tĩnh tọa đủ 10 ngày; mỗi năm một phép thử đạo tâm, trượt thì năm đó làm lại | 70% → `tan` (1 hệ ngẫu nhiên); 30% → `nguy` | Mỗi năm luyện: khí huyết tối đa −5% vĩnh viễn (tối đa −15%) | Chính +2 | 0 |
| 3 | **Ngũ Hành Linh Quả** (5 quả Kim, Mộc, Thủy, Hỏa, Thổ, cùng một cây ngàn năm) | Linh dược | Một cây duy nhất mỗi thế giới, ở dược cốc sâu Nam Trạch hoặc Đông Hoang, có yêu thú Trúc Cơ canh; quả chín mùa thu | Ăn trong 10 ngày | Ăn đủ 5 → `nguy` cân bằng 5 hệ (nếu có khí vận nghiêng ngũ hành → `hau` 5 hệ); ăn 3–4 → `tan` | Ăn lẻ 1–2 quả: không gì, quả mất | 0 | Giết yêu thú canh cây: Nghiệp +2 |
| 4 | **Địa Tâm Linh Tủy** | Linh tủy Thổ | Đào khoáng ở mỏ cấp cao (0,3% mỗi lần), long mạch trong sự kiện | Ngâm 49 ngày trong động phủ hoặc hang kín | 75% → `hau` Thổ; 25% thất bại | Phép thử thể chất mỗi 7 ngày; trượt 3 lần → thương thế bậc 3 | 0 | 0 |
| 5 | **Hỏa Tủy** | Linh tủy Hỏa | Núi lửa Tây Lĩnh, mỏ nóng; phần thưởng diệt Hỏa yêu | Như trên | 75% → `hau` Hỏa | Như trên + bỏng: khí huyết tối đa −5% | 0 | 0 |
| 6 | **Hàn Tủy** | Linh tủy Thủy/Băng | Băng nguyên Bắc Nhạc | Như trên | 60% → `hau` Thủy; 15% → `hau` Băng (biến dị); 25% thất bại | Như trên + hàn độc: linh lực tối đa −5% | 0 | 0 |
| 7 | **Canh Kim Tủy** | Linh tủy Kim | Mạch kim khoáng Tây Lĩnh | Như trên | 75% → `hau` Kim | Như trên | 0 | 0 |
| 8 | **Mộc Linh Tủy** | Linh tủy Mộc | Lõi cổ thụ vạn năm (sự kiện rừng sâu Đông Hoang) | Như trên | 75% → `hau` Mộc | Chặt cổ thụ: cả khu rừng úa | 0 | Chặt cây thần: Nghiệp +6; xin được nhựa (sự kiện tinh linh cây): Phúc +2, kết quả chỉ 50% |
| 9 | **Tiên nhân quán đỉnh** | Kỳ ngộ truyền công | Lão tu sĩ sắp tọa hóa trong hang, cổ mộ, chùa hoang | Không | 100% → linh căn giống người truyền (1–3 hệ), loại `hau` | Nhận **Nhân Quả Tuyến "Di nguyện"** (báo thù / tìm hậu nhân / đưa di vật), hạn 10 năm; trễ → Nghiệp +15, tâm ma +20 | 0 | Hoàn thành: Phúc +10 |
| 10 | **Đoạt Căn Thuật** | Bí thuật ma đạo | Ma tông (chấp sự trở lên), cổ tịch ở phế tích/ma địa | Bắt sống một tu sĩ có linh căn; trận pháp 9 ngày | 80% → `doat`; 20% phản phệ: chết hoặc thương thế bậc 3 + `tan` | Nạn nhân chết | Tà +25 | Nghiệp +40; Nhân Quả Tuyến **Huyết thù** với thân nhân/tông môn nạn nhân |
| 11 | **Huyết Tế Khai Mạch** | Nghi thức huyết thuật | Trận đồ ở ma địa; ma tu truyền | Tế 100 sinh linh trong 1 năm | → `huyet` 100% | Tế người: thiên hạ truy nã | Tế người: Tà +20; tế yêu thú: Tà +8 | Tế người: Nghiệp +30; tế yêu thú: Nghiệp +8 |
| 12 | **Linh Căn Cổ** | Cổ trùng | Cổ sư ở Nam Trạch (đổi bằng 3 nhiệm vụ cho cổ sư hoặc 80 linh thạch) | Cấy vào người | → `co` 100% | Nuôi cổ mỗi tháng: 2 linh thảo hoặc 3% khí huyết tối đa trong 30 ngày | Tà +3 | 0 |
| 13 | **Giao Long Tinh Huyết** | Kỳ ngộ mơ hồ | Sau lũ lớn mùa hạ ở sông Nam Trạch: một giao long hấp hối mắc cạn | Gặp đúng lúc | **Cứu nó**: nó tặng một giọt tinh huyết → `hau` Thủy, 20% thêm mệnh cách "Huyết mạch yêu tộc". **Giết lấy máu**: → `hau` Thủy 1 hệ ×0,9, thêm mệnh cách đó chắc chắn | Giết: giao long mẹ báo thù sau 2–5 năm | Cứu: Chính +4; giết: Tà +4 | Cứu: Phúc +8; giết: Nghiệp +10 + tuyến Oán |
| 14 | **Thiên Lôi Quán Thể** | Đánh cược mạng | Đỉnh núi cao trong cơn giông mùa hạ (sự kiện "Lôi vũ") | Tự đứng ra hứng sét | 5% → `hau` Lôi (biến dị); 25% không gì; 70% chết hoặc thương thế bậc 3 | Mạng sống | 0 | 0 |
| 15 | **Phật môn Xá Lợi** | Truyền thừa | Chùa thuộc tông Phật: làm tạp dịch tăng 5 năm, không sát sinh người, Đạo Hướng từ Chính Trực trở lên | Thầy trụ trì truyền | → `hau` Thổ hoặc Kim + mệnh cách "Phật tâm" (kháng tâm ma +30%) | Phạm giới sát sinh người: mất xá lợi, linh căn rớt thành `tan` | Chính +6 | Phúc +6 |

Thêm ba đường **không tạo linh căn tu tiên nhưng mở đạo khác** cho vô linh căn:

| Tên | Cách | Kết quả |
|---|---|---|
| Dưỡng Hạo Nhiên Khí | Đỗ Cử nhân trở lên (phàm đạo Văn nhân/Quan viên) + sự kiện "Ngộ lời thánh hiền" + Đạo Hướng Quang Minh trở lên | `van` (Văn tâm): tu Nho thuật |
| Túc căn kiếp trước | Kiếp trước đạt Nguyên Anh trở lên và đã "chôn đồ cho kiếp sau" một vật bản mệnh; kiếp này tìm lại được (mộ/chỗ chôn đã có) | Chạm vào: thức tỉnh linh căn giống kiếp trước, tốc độ −0,1 |
| Tạo Hóa Thần Dịch | Di tích tiên nhân trên Thiên lộ (sự kiện bậc cao) | `tao`. Vô linh căn gần như không thể tới được — để dành cho người đã có `hau` muốn vượt trần |

Và một đường tối: **Làm dược nhân cho ma tông** — tự nguyện để đổi 50 lượng bạc gửi gia đình; 3 năm thử thuốc; 70% chết, 20% tàn phế, 10% ra khỏi đó với `nguy` (Đạo Hướng không đổi; Nhân Quả: Phúc +4 nếu tiền thật sự tới tay gia đình).

### 5.6 Vật phẩm mới cho phần linh căn

| Mã đề xuất | Tên | Loại / ô | Phẩm | Nguồn | Giá tham khảo |
|---|---|---|---|---|---|
| `trac_linh_thach` | Trắc Linh Thạch | Vật dùng, 1 ô | Phàm | Tạp hóa thành lớn | 30 lượng bạc |
| `khai_linh_dan` | Khai Linh Đan | Đan | Huyền | Đấu giá, tông môn, kỳ ngộ | 300 linh thạch |
| `tay_tuy_phat_mach_kinh` | Tẩy Tủy Phạt Mạch Kinh | Bí tịch (tâm pháp phàm) | Hoàng | Võ phái, ẩn sĩ, tạp hóa hiếm | 120 lượng bạc |
| `qua_kim`, `qua_moc`, `qua_thuy`, `qua_hoa`, `qua_tho` | Ngũ Hành Linh Quả (Kim/Mộc/Thủy/Hỏa/Thổ) | Linh dược | Địa | Cây ngàn năm | không bán |
| `tuy_dia_tam`, `tuy_hoa`, `tuy_han`, `tuy_canh_kim`, `tuy_moc` | Địa Tâm Linh Tủy, Hỏa Tủy, Hàn Tủy, Canh Kim Tủy, Mộc Linh Tủy | Linh tủy | Địa | Như bảng 5.5 | đấu giá 200–260 linh thạch |
| `linh_can_co` | Linh Căn Cổ | Cổ trùng (vật truyện) | Huyền | Cổ sư Nam Trạch | 80 linh thạch |
| `giao_long_huyet` | Giao Long Tinh Huyết | Linh dược | Địa | Sự kiện giao long | không bán |
| `xa_loi` | Xá Lợi | Vật truyện | Thiên | Chùa | không bán |
| `doat_can_thuat` | Đoạt Căn Thuật | Bí tịch ma đạo | Địa | Ma tông, phế tích | không bán |
| `huyet_te_tran_do` | Huyết Tế Trận Đồ | Vật truyện | Huyền | Ma địa | không bán |
| `tao_hoa_than_dich` | Tạo Hóa Thần Dịch | Linh dược | Tiên | Thiên lộ | không bán |

Lưu ý trùng tên: game đã có **Tẩy Tủy Đan** (`taytuy`, khí huyết tối đa +6%). Giữ nguyên; bí tịch mới tên "Tẩy Tủy **Phạt Mạch Kinh**" để không lẫn.

---

## 6. Cơm áo phàm trần: tiền bạc, cái ăn, việc làm, gia đình

Không có phần này thì "bận rộn kiếm ngày ba bữa" chỉ là lời kể. Đây là nền của mọi phàm đạo.

### 6.1 Tiền phàm
- Đơn vị: **văn** và **lượng bạc**; 1 lượng = 1.000 văn. Hiện: "3 lượng 200 văn".
- Linh thạch vẫn là tiền của tu sĩ. Đổi ở tiền trang / phường thị: **mua 1 linh thạch = 25 lượng**, **bán 1 linh thạch = 18 lượng**. Quán phàm (trà lâu, khách điếm, tửu phường, tạp hóa thôn) nhận linh thạch quy ra 20 lượng.
- Quán phàm niêm giá bằng bạc; phường thị, quỷ thị, đấu giá niêm giá bằng linh thạch.
- Bản lưu cũ: linh thạch đang có giữ nguyên, bạc = 0.

### 6.2 Bảng giá phàm (dữ liệu thật)

| Nhóm | Món | Giá |
|---|---|---|
| Ăn | Bát cháo / cái bánh | 5 văn |
| | Bữa cơm thường | 15 văn |
| | Bữa khá có thịt | 40 văn |
| | Mâm tửu lâu | 150 văn |
| | Ấm trà | 10 văn |
| | Vò rượu thường | 60 văn |
| | Lương khô (đủ 5 ngày, 1 ô túi, chồng tối đa 4 gói) | 60 văn |
| Ngủ | Đình làng / chuồng ngựa | 0–3 văn |
| | Phòng thường khách điếm | 30 văn/đêm |
| | Phòng tốt | 120 văn/đêm |
| | Thuê nhà tranh | 800 văn/tháng |
| | Mua nhà tranh / nhà ngói | 25 / 120 lượng |
| Mặc | Áo vải / áo bông mùa đông | 150 / 400 văn |
| | Giày cỏ / giày vải | 10 / 80 văn |
| Thuốc | Thuốc cảm / bó thuốc trị thương / tiền khám | 80 / 200 / 50 văn |
| Đồ nghề | Cuốc / rìu / cần câu / lưới | 300 / 350 / 50 / 500 văn |
| | Cung săn / bẫy | 2 lượng / 200 văn |
| | Thuyền nhỏ / trâu cày | 12 / 15 lượng |
| | Ruộng một mẫu: thuê một vụ / mua đứt | 3 / 40 lượng |
| Binh khí phàm | Đao sắt / kiếm / giáp da | 1,5 / 3 / 4 lượng |
| Việc đời | Sính lễ / ma chay / học phí trường làng | 10 lượng / 5 lượng / 300 văn mỗi tháng |
| | Học võ ở võ quán | 2 lượng/tháng |
| | Mua chức thư lại | 200 lượng |
| Thuế | Thuế đinh mỗi người lớn | 1 lượng/năm |
| | Thuế ruộng | 1/10 hoa lợi |
| | Phu dịch: mỗi năm 10% bị gọi đi 1 tháng; không đi thì nộp | 2 lượng |
| Tu tiên | Tích Cốc Đan (no 30 ngày) | 15 lượng hoặc 1 linh thạch |
| | Trắc Linh Thạch | 30 lượng |

### 6.3 Cái ăn

| Trạng thái | Khi nào | Tác dụng |
|---|---|---|
| No đủ | Ăn đủ phần trong ngày | Bình thường |
| Lưng bụng | Chỉ ăn 1–2 bữa | Hồi phục −10% |
| Đói | 1 ngày không ăn | Hồi phục −50% |
| Đói lả | 3 ngày | Khí huyết tối đa −20%, việc làm −30% |
| Kiệt sức | 7 ngày | Mỗi ngày −5% khí huyết |
| Chết đói | 15 ngày | Kết kiếp, nguyên nhân mới `doi` |

- Mức ăn tự chọn: **Đạm bạc** (15 văn/ngày, hồi phục −10%), **Thường** (45 văn), **Khá** (120 văn, hồi phục +10%, tâm ma −1 mỗi tháng).
- "Tự lo cơm nước" bật sẵn: ở nơi có quán thì tự mua, ra hoang dã thì ăn lương khô, hết lương khô thì săn/hái tại chỗ được thì ăn.
- Luyện Khí cần ăn nửa phần; Trúc Cơ trở lên **tịch cốc**, không cần ăn.
- Mùa đông không áo bông mà ngủ ngoài trời: mỗi đêm 10% **nhiễm lạnh** (khí huyết −10% trong 7 ngày; không chữa thì 20% thành bệnh nặng = thương thế bậc 2).

### 6.4 Sức lực trong ngày
Làm tối đa 12 giờ/ngày. Quá 12 giờ → "mệt nhọc": ngày sau hiệu quả −30%. Ba ngày liền quá sức → ốm 5 ngày (khí huyết −10%).

### 6.5 Việc làm thuê (ai cũng làm được)

| Việc | Nơi | Giờ | Công | Điều kiện / rủi ro |
|---|---|---|---|---|
| Bốc vác bến | sông, biển, thành | 8 | 60 văn | — |
| Gánh nước thuê | thôn trấn | 6 | 30 văn | — |
| Làm ruộng thuê mùa vụ | thôn trấn, mùa xuân/thu | 10 | 80 văn + 1 bữa | — |
| Chặt củi bán | rừng | 8 | 1–2 gánh × 40 văn | 3% gặp sói |
| Hái rau dại, nấm | rừng | 6 | 20–50 văn hoặc tự ăn | 2% ngộ độc nấm |
| Rửa bát tửu lâu | tửu phường | 8 | 35 văn + 2 bữa | — |
| Dọn chuồng khách điếm | khách điếm | 6 | 25 văn + chỗ ngủ | — |
| Chép sách | thành | 8 | 100 văn | Ngộ tính từ 10 |
| Viết thư hộ | chợ | 4 | 30 văn | Biết chữ |
| Đào mỏ thuê | mỏ | 10 | 120 văn | 2% tai nạn (thương thế bậc 1–2) |
| Kéo thuyền | sông | 10 | 90 văn | — |
| Canh đêm | thôn trấn, thành | 8 (đêm) | 50 văn | 5% gặp trộm |
| Phu khuân, khiêng kiệu | thành | 8 | 70 văn | — |
| Tạp dịch tông môn | sơn môn (ngoại môn) | cam kết 30 ngày | 1 lượng/tháng + ăn ở | Bị đệ tử sai bảo; vô linh căn làm được |

### 6.6 Gia đình và người thân
- Đầu thai có cha, mẹ (38–50 tuổi) và 0–3 anh chị em, trừ xuất thân mồ côi/khất cái/bị bỏ.
- Mỗi người thân lưu: tên, quan hệ, tuổi, sức khỏe (khỏe / yếu / bệnh / hấp hối), thái độ (thương / lạnh nhạt / ghét), nơi ở, còn sống, có linh căn hay không.
- Hôn nhân: từ 16 tuổi; phàm nhân cần sính lễ 10 lượng; tu sĩ kết đạo lữ qua giao tình. Người phối ngẫu sinh từ người địa phương hoặc người quen đủ giao tình.
- Con cái: sau cưới mỗi năm 30% có con (tối đa 5). Nuôi 300 văn/tháng/con đến 16 tuổi. 16 tuổi con được trắc linh: **15%** có linh căn nếu cha mẹ đều vô linh căn, **50%** nếu một bên có, **80%** nếu cả hai có. Con có linh căn có thể được tông môn đón đi.
- 14 sự kiện gia đình: Cha mẹ già bệnh · Tang lễ · Anh em tranh gia sản · Em có linh căn được đưa lên núi · Cưới hỏi · Sinh con · Con ốm nặng · Con trắc linh · Con bỏ nhà theo tu sĩ · Vợ/chồng bị bắt đi phu · Nhà cháy · Chủ nợ tới cửa · Ngày giỗ · Về quê sau nhiều năm bế quan, người thân đã già hoặc đã mất.
- Kết cục riêng **"Chết bên con cháu"** (chết vì thọ, còn ít nhất một con sống). Dòng họ ghi vào thế giới (`world.lineage`): kiếp sau 10% đầu thai làm hậu duệ chính dòng họ mình, và có sự kiện "Hậu duệ kiếp trước".

---

## 7. Đại đạo ba ngàn (yêu cầu 6)

### 7.1 Nguyên tắc
1. **Không chọn lớp nhân vật lúc đầu.** Con đường hình thành từ việc người chơi làm. Mỗi con đường có kinh nghiệm riêng (ẩn) tăng khi làm đúng việc của đường đó; danh vị mở khi đủ kinh nghiệm và qua sự kiện thăng bậc.
2. **Tối đa 3 đường cùng lúc.** Bắt đầu đường thứ tư thì đường lâu không làm nhất "phai" (ngừng tăng). Đường có bậc cao nhất là **chủ đạo** (người chơi ghim lại được).
3. Mỗi đường bắt buộc có đủ: ít nhất 2 cửa vào · 6 bậc danh vị · việc lặp lại (nút hành động ở thẻ địa điểm, phải thêm vào `PGROUP`) · thu nhập theo bậc · rủi ro · **12 sự kiện** (4 nhập môn, 4 giữa đường, 4 đỉnh cao) · **4 kết cục** · xu hướng Đạo Hướng / Nhân Quả · mệnh tuyến liên quan.
4. Bảng nhân vật có thẻ **Đạo đồ**: tên đường, danh vị, tiến độ bằng chữ (mới vào nghề / thạo việc / có tiếng / bậc thầy / lừng lẫy).
5. Tu sĩ vẫn làm phàm đạo được (chủ tiệm, quan viên tu sĩ), nhưng kinh nghiệm phàm đạo nhận −30% (lòng không ở đó).

### 7.2 Mười bảy phàm đạo

**1. Nông dân** — Mệnh tuyến: Thế Gia Vạn Đại
- Vào: xuất thân nhà nông; thuê ruộng ở thôn trấn; làm ruộng thuê đủ 30 ngày.
- Bậc: Làm thuê → Tá điền → Tiểu nông (1 mẫu) → Trung nông (3 mẫu + trâu) → Phú nông (10 mẫu, thuê người) → Địa chủ (30 mẫu, cho thuê).
- Việc: Gieo mạ (xuân) · Chăm ruộng (hạ) · Gặt (thu) · Đan lát / làm thuê (đông) · Bán thóc (chợ).
- Thu: một mẫu ra 6 lượng/năm (được mùa ×1,5, mất mùa ×0,3); tá điền nộp 50%.
- Rủi ro: hạn, lũ, châu chấu, yêu thú phá ruộng, binh lương, cướp.
- Sự kiện: Mùa hạn · Đê vỡ · Tranh nước với làng bên · Địa chủ tăng tô · Trâu ốm · Được mùa · Quan thu binh lương · Trộm lúa đêm · Tu sĩ thuê người trồng linh điền · Hạt giống lạ (linh mễ) · Heo rừng thành yêu phá ruộng · Năm đói, dân bỏ làng.
- Kết cục: Chết già bên con cháu · Địa chủ một vùng · Chết đói năm mất mùa · Bị binh lửa cuốn đi.
- Nhân quả: chia thóc cứu đói → Phúc; ép tá điền → Nghiệp mỗi năm.

**2. Tiều phu** — Mệnh tuyến: Tỉnh Mộng
- Vào: có rìu, sống gần rừng; xuất thân hầm than.
- Bậc: Đốn củi thuê → Tiều phu → Thợ đốn gỗ → Đầu nậu gỗ → Chủ xưởng gỗ → Chủ rừng (có giấy quan).
- Việc: Đốn củi · Đốn gỗ lớn · Bán củi · Đi sâu vào rừng (gặp linh thảo, yêu thú).
- Thu: 40–80 văn/ngày; gỗ quý 2–10 lượng.
- Rủi ro: cây đổ, sói, yêu thú, lạc rừng, sơn tinh.
- Sự kiện: Cây đổ đè chân · **Ngồi xem hai ông lão đánh cờ trong núi** (ra khỏi rừng thế giới đã qua 20 năm; tích Lạn Kha) · Cổ thụ biết nói · Sói đói mùa đông · Quan cấm rừng · Củi ế · Cứu người bị thương · Thấy tu sĩ đánh nhau, nhặt túi người chết · Cháy rừng · Gỗ trầm hương · Sơn tinh dụ người · Lạc trong sương.
- Kết cục: Chết già trong nhà gỗ · Chủ rừng · Chết trong rừng không ai biết · Mất tích bên bàn cờ tiên (kết cục hiếm, cho Mộng Ấn).

**3. Ngư dân** — Mệnh tuyến: Thế Gia Vạn Đại
- Vào: có lưới hoặc cần câu, sống ở bến; xuất thân chài lưới, vá lưới, chèo đò.
- Bậc: Phụ chài → Ngư phủ → Chủ thuyền → Chủ ghe lớn → Chủ vạn chài → Hải thương.
- Việc: Câu cá · Thả lưới · Ra khơi (biển, 3 ngày) · Bán cá · Vá lưới.
- Thu: 30–150 văn/ngày; ra khơi 2–8 lượng.
- Rủi ro: bão, chết đuối, thủy quỷ, hải tặc, cá yêu.
- Sự kiện: Bão giữa khơi · Lưới vớt xác người · Cá chép vàng xin tha · Thủy quỷ kéo chân · Mùa cá chạy · Hải tặc thu tiền · Thuyền đắm · Giao long mắc cạn (đường cải tạo #13) · Vớt hộp gỗ cổ · Đêm trăng nghe tiếng hát dưới nước · Chợ cá ép giá · Người nhà chờ ở bến.
- Kết cục: Chết già ở bến · Chủ vạn chài · Mất tích ngoài khơi · Được mời xuống thủy phủ (hiếm).

**4. Thợ săn** — Mệnh tuyến: Huyết Cừu
- Vào: có cung hoặc bẫy; sống ven núi.
- Bậc: Đặt bẫy → Thợ săn → Thợ săn giỏi → Đầu phường săn → Săn yêu nhân (săn yêu thú cấp thấp) → Thần tiễn.
- Việc: Đặt bẫy · Đi săn · Lột da · Bán thịt da · Dẫn đường rừng.
- Thu: 50–300 văn/ngày; da quý 3–10 lượng.
- Rủi ro: thú dữ, yêu thú, lạc.
- Sự kiện: Hổ vồ bầy hươu (tình huống mơ hồ #2) · Bẫy dính hồ ly trắng · Gấu ngủ đông · Yêu sói đầu đàn · Tu sĩ thuê dẫn đường · Phường săn tranh địa bàn · Săn thuê cho quan · Mũi tên lạc trúng người · Con mồi bị thương chạy về hang có con nhỏ · Mùa đông không thú · Dấu chân khổng lồ · Cứu người lạc.
- Kết cục: Thần tiễn được triều đình mời · Chết dưới móng thú · Già làm người kể chuyện · Bị yêu thú tha đi.

**5. Thợ thủ công** (chọn một nghề: rèn / mộc / gốm / dệt) — Mệnh tuyến: Võ Lâm Chí Tôn (rèn) hoặc Phú Giáp Thiên Hạ (gốm, dệt, mộc)
- Vào: xuất thân thợ rèn, nung men, dệt chiếu, khắc khuôn, cạo vôi, bồi giấy; học việc 1 năm ở xưởng.
- Bậc: Học việc → Thợ phụ → Thợ cả → Chủ lò → Danh tượng → Đại tượng (tu sĩ cũng đặt hàng).
- Việc: Làm hàng (8 giờ) · Nhận đơn · Bán ở chợ · Dạy học trò. Danh tượng rèn được binh khí phàm phẩm Hoàng.
- Thu: 60 văn/ngày → 2 lượng/ngày.
- Sự kiện: Tu sĩ đặt rèn bằng linh khoáng (nổ lò) · Quan đặt binh khí cho chiến tranh · Học trò cướp nghề · Lò cháy · Tranh danh với lò bên · Rèn kiếm cho kẻ báo thù · Thợ già truyền bí quyết · Bị ép giá · Đúc chuông chùa · Phường hội đánh thuế · Kiệt tác đời người · Tay bị thương.
- Kết cục: Đại tượng lưu danh · Chết bên lò · Bỏ nghề · Kiệt tác truyền đời (vật phẩm chôn được cho kiếp sau).

**6. Thương nhân** — Mệnh tuyến: Phú Giáp Thiên Hạ
- Vào: xuất thân nhà buôn, gánh muối, sạp bạc, giữ kho đường; vốn từ 5 lượng; xin theo thương đội.
- Bậc: Gánh hàng rong → Tiểu thương → Chủ cửa hiệu → Buôn đường dài → Chủ thương hội → Phú giáp một châu.
- Việc: Mua rẻ bán đắt giữa các nơi (giá theo vùng, mùa) · Mở cửa hiệu · Theo thương đội (thực thể đã có) · Cho vay · Đầu cơ.
- Thu: cửa hiệu 3–20 lượng/tháng; buôn đường dài lãi 20–80% chuyến.
- Sự kiện: Hàng bị cướp · Mưa hỏng hàng · Quan đòi lót tay · Đầu cơ lương thực năm đói · Đối thủ vu cáo · Tu sĩ mua hàng trả linh thạch · Thương đội gặp yêu thú · Con nợ chết · Buôn muối lậu · Hàng giả · Bạn hàng phản · Mở tiền trang.
- Kết cục: Phú khả địch quốc · Phá sản, treo cổ ở kho hàng · Bị cướp giết giữa đường · Về quê với gia tài.

**7. Quan viên** — Mệnh tuyến: Đế Nghiệp
- Vào: đỗ khoa cử (Văn nhân) · mua chức thư lại 200 lượng · lập công (Binh lính).
- Bậc: Thư lại → Huyện thừa → Huyện lệnh → Tri phủ → Thứ sử → Thượng thư → Tể tướng (7 bậc, bậc cuối mở mệnh tuyến Đế Nghiệp).
- Việc: Xử án (sự kiện chọn) · Thu thuế · Cứu tế · Tuần tra · Dâng sớ · Đút lót / nhận đút.
- Thu: bổng 3 lượng/tháng (thư lại) → 300 lượng/tháng (tể tướng), cộng "lộc ngoài".
- Rủi ro: giáng chức, tru di, ám sát; tu sĩ không coi triều đình ra gì.
- Sự kiện: Án oan · Cứu tế năm hạn (bớt xén hay không) · Thế gia tu tiên đòi đất · Phản loạn · Đổi ngôi · Đồng liêu vu cáo · Thanh tra · Dân dâng vạn dân tán · Ma tu tàn sát cả huyện (quan phàm bất lực) · Gả con cho quyền quý · Tham ô kho lương · Thăng chức về kinh.
- Kết cục: Danh thần lưu sử · Gian thần bị tru di · Từ quan về quê · Lên ngôi.

**8. Binh lính** — Mệnh tuyến: Đế Nghiệp
- Vào: xuất thân cựu binh / bị trả về từ biên ải · bị bắt lính (phu dịch) · đầu quân ở thành.
- Bậc: Lính trơn → Ngũ trưởng → Thập trưởng → Bách hộ → Thiên hộ → Tướng quân → Đại tướng quân.
- Việc: Luyện binh · Tuần thủ · Xuất chinh (trận nhiều lượt) · Truy cướp.
- Thu: 1 lượng/tháng → 50 lượng/tháng + chiến lợi phẩm.
- Rủi ro: chết trận, đào ngũ bị chém, dịch trong doanh.
- Sự kiện: Trận đầu · Đồng đội chết trên tay · Lệnh tàn sát thành đã hàng · Tù binh là trẻ con · Doanh trại bị yêu thú tập kích · Tu sĩ đứng về phía địch · Đào ngũ · Lập công đầu · Tướng ăn bớt lương · Thư nhà · Thủ thành đến người cuối · Phong tước.
- Kết cục: Đại tướng quân trấn biên · Da ngựa bọc thây · Về quê cụt tay · Binh biến lên ngôi.

**9. Võ giả giang hồ** ("chiến binh") — Mệnh tuyến: Võ Lâm Chí Tôn
- Vào: học võ quán; xuất thân thợ rèn, cựu binh, vác bia; nhặt bí tịch.
- Bậc danh vọng: Vô danh → Có chút tiếng → Hảo hán một vùng → Danh hiệp → Đại hiệp → Võ lâm minh chủ (bậc võ ở 7.3).
- Việc: Luyện võ · Đấu lôi đài (đã có ở thành) · Hành hiệp · Nhận thuê bảo vệ · Thách đấu.
- Sự kiện: Lôi đài sinh tử · Kết nghĩa huynh đệ · Đại hội võ lâm · Bị ám toán bằng độc · Cứu thôn khỏi sơn tặc · Đối mặt một tu sĩ Luyện Khí · Ân sư bị giết · Tranh bí tịch · Rửa tay gác kiếm · Duyên giang hồ · Thách đấu tông sư · Bị mạo danh.
- Kết cục: Võ lâm minh chủ · Chết dưới tay tu sĩ · Rửa tay gác kiếm · Truyền nghề, lập phái.

**10. Chưởng môn võ phái** (tự dựng môn phái luyện võ) — Mệnh tuyến: Võ Lâm Chí Tôn
- Vào: võ bậc Nhất lưu trở lên + 100 lượng + một căn nhà → sự kiện "Khai môn lập phái".
- Bậc: Võ quán → Tiểu phái → Môn phái một huyện → Danh môn một châu → Đại phái giang hồ → Thái Sơn Bắc Đẩu.
- Việc: Thu đồ đệ · Dạy võ · Nhận bảo kê · Mở chi nhánh · Dự đại hội.
- Đệ tử: số tối đa theo bậc 3 / 6 / 12 / 24 / 48 / 100. Mỗi đệ tử: tên, tuổi, tư chất, trung thành, bậc võ; 5% có linh căn (bị tông môn tu tiên đòi người, hoặc giữ lại thành tu sĩ của môn).
- Thu: học phí 2 lượng/đệ tử/tháng, bảo kê.
- Sự kiện: Đệ tử đầu tiên · Phái lớn tới đạp quán · Đệ tử có linh căn · Đệ tử phản sư mang bí tịch · Quan phủ treo biển · Tông môn tu tiên đòi cống nạp · Tranh chức minh chủ · Đệ tử chết trên lôi đài · Truyền chức · Môn phái bị diệt · Lập quy củ · Bí tịch trấn phái.
- Kết cục: Môn phái truyền đời (**tồn tại trong thế giới các kiếp sau**, lưu ở `world.vophai`) · Diệt môn · Truyền ngôi cho đệ tử · Môn phái hóa tông môn tu tiên (hiếm).

**11. Tiêu sư** — Mệnh tuyến: Võ Lâm Chí Tôn
- Vào: võ Tam lưu + xin vào tiêu cục ở thành; nhận hộ tống ở khách điếm (dịch vụ đã có).
- Bậc: Tiêu đồng → Tiêu sư → Tiêu đầu → Phó tổng tiêu đầu → Tổng tiêu đầu → Chủ tiêu cục.
- Việc: Áp tiêu (dùng hệ đi đường + thực thể cướp) · Thám đường · Kết giao sơn trại.
- Thu: 5–10% giá trị hàng.
- Sự kiện: Sơn tặc chặn · Kiện hàng là người bị bắt cóc · Phản bội trong đoàn · Tu sĩ cướp tiêu · Hàng giao cho ma tông · Mất tiêu phải bồi · Tuyết lở · Kết giao sơn trại · Chủ hàng chết giữa đường · Hộ tống thư sinh đi thi · Tiêu giả nhử cướp · Tiêu cục bị đốt.
- Kết cục: Chủ tiêu cục lừng danh · Chết giữ tiêu · Bỏ nghề làm sơn tặc · Về quê.

**12. Sát thủ (phàm)** — Mệnh tuyến: Huyết Cừu
- Vào: Ám lâu dụ khi Đạo Hướng từ Tà Khí trở xuống, hoặc võ Nhị lưu + tính tình Lạnh lùng / Tàn nhẫn; xuất thân cô nhi, trốn nợ.
- Bậc: Tay mới → Đồng bài → Ngân bài → Kim bài → Huyết bài → Lâu chủ.
- Việc: Nhận hợp đồng (mục tiêu là người thật có tên) · Điều tra mục tiêu (tốn ngày, cho biết người đó thật sự ra sao) · Ám sát · Phi tang.
- Thu: 5 lượng → 500 lượng/hợp đồng.
- Đạo Hướng: mỗi hợp đồng Tà +3..8. Nhân Quả tùy mục tiêu (ác bá: Phúc nhỏ; vô tội: Nghiệp nặng).
- Sự kiện: Hợp đồng đầu · Mục tiêu là người tốt · Mục tiêu là người quen · Bị chính lâu bán đứng · Đứa trẻ chứng kiến · Thuê giết một tu sĩ · Hợp đồng thử lòng (mục tiêu là chính mình) · Rửa tay khỏi lâu · Kẻ thuê lật lọng · Rơi mặt nạ · Mục tiêu là ân nhân năm xưa · Lâu chủ già.
- Kết cục: Lâu chủ trong bóng tối · Chết không danh tính · Rửa tay sống ẩn · Bị chém giữa chợ.

**13. Đạo chích** — Mệnh tuyến: Huyết Cừu hoặc Tỉnh Mộng
- Vào: xuất thân khất cái, trốn nợ; sự kiện trộm lần đầu.
- Bậc: Móc túi → Trộm vặt → Phi tặc → Đạo vương một thành → Hiệp đạo / Đại đạo → Bang chủ hắc đạo.
- Việc: Móc túi (chợ, thành) · Trộm đêm (nhà giàu) · Tiêu thụ đồ gian (quỷ thị) · Cướp đường (khi có đồng bọn).
- Thu: 10 văn → 50 lượng/lần.
- Rủi ro: bị bắt chặt ngón, tù, đánh chết.
- Sự kiện: Lần đầu móc túi · Trộm nhầm nhà tu sĩ · Bị chặt ngón · Hiệp đạo phát của · Đồng bọn phản · Trộm được bí tịch · Vào ngục · Vượt ngục · Lập trại · Trộm của người nghèo (con họ chết đói) · Mỹ nhân kế · Lão đạo chích truyền nghề.
- Kết cục: Bang chủ hắc đạo · Hiệp đạo lưu truyền · Chết trong ngục · Hoàn lương.

**14. Lang trung** — Mệnh tuyến: Y Giả Độ Thế
- Vào: xuất thân dược đồng, bốc thuốc, bó xương; học ở hiệu thuốc 1 năm.
- Bậc: Học trò bốc thuốc → Lang băm → Lang trung → Danh y một vùng → Ngự y → Thần y.
- Việc: Khám bệnh · Bốc thuốc · Hái thuốc (đã có) · Chữa dịch · Mổ xẻ.
- Thu: 50 văn/người → 20 lượng (ngự y).
- Sự kiện: Bệnh nhân không tiền · Đại dịch · Quý nhân bệnh nặng · Bị ép bào chế độc · Thử thuốc trên mình · Bệnh nhân là ma tu bị thương · Chữa nhầm · Tranh với thầy cúng · Linh dược quá đắt · Đỡ đẻ khó · Không cứu được con mình · Truyền y thư.
- Kết cục: Thần y · Chết vì dịch · Bị xử vì chữa chết quý nhân · Y thư truyền đời.

**15. Văn nhân** (sĩ tử, thầy đồ) — Mệnh tuyến: Đế Nghiệp hoặc Tỉnh Mộng
- Vào: biết chữ (thư sinh nghèo, kẻ bỏ trường thi, viết thư hộ, chép sổ thóc); học trường làng.
- Bậc: Học trò → Đồng sinh → Tú tài → Cử nhân → Tiến sĩ → Trạng nguyên / Đại nho.
- Việc: Đọc sách · Dạy học (300 văn/trò/tháng) · Viết thuê · Đi thi (3 năm một khoa: thi hương ở thành, thi hội ở kinh) · Đối câu ở trà lâu (đã có).
- Sự kiện: Thi trượt · Bị tráo bài · Thầy đồ làng · Viết hịch chống quan tham · Văn tự ngục · Gặp Nho tu · Thư đồng · Vinh quy · Sách bị đốt · Duyên tiểu thư · Học trò thành quan · Ngộ lời thánh hiền (cửa Văn tâm).
- Kết cục: Đại nho · Ra làm quan · Chết già chưa đỗ · Văn chương truyền đời (thơ hiện trong tin đồn kiếp sau).

**16. Khất cái** — Mệnh tuyến: Tỉnh Mộng
- Vào: xuất thân tiểu khất cái; phá sản; mất hết.
- Bậc: Ăn mày → Có địa bàn → Đầu đàn → Trưởng lão Cái bang một thành → Đà chủ → Bang chủ Cái bang.
- Việc: Xin ăn (chợ, chùa: 5–30 văn/ngày) · Nghe ngóng (tin đồn chính xác hơn người thường) · Đưa tin thuê.
- Lợi thế: không ai để ý; mạng lưới tin tức.
- Sự kiện: Chết cóng mùa đông · Bị đánh đuổi · Bà lão cho bánh · Nhặt đứa bé bị bỏ · Tu sĩ ném linh thạch như bố thí · Nghe trộm bí mật · Cái bang tuyển người · Tranh địa bàn · Bị bắt bán làm nô · Cứu người sa cơ · Lão ăn mày là cao nhân · Chết bên đường.
- Kết cục: Bang chủ Cái bang · Chết cóng bên đường · Được người báo ân nuôi · Theo cao nhân rời trần (Mộng Ấn).

**17. Nghệ nhân giang hồ** (gánh hát, kể chuyện, đàn ca) — Mệnh tuyến: Tỉnh Mộng
- Vào: xuất thân gánh hát; học đàn hoặc kể chuyện ở trà lâu.
- Bậc: Học trò → Đào kép / người kể → Kép chính → Bầu gánh → Danh kỹ một châu → Đại gia lừng danh.
- Việc: Diễn ở chợ, thành · Lưu diễn · Diễn cho phủ quan · Học tuồng. Giả dạng được (nối hệ che giấu tu vi).
- Thu: 50 văn → 10 lượng/đêm.
- Sự kiện: Đêm ế khách · Quan lớn ép hát riêng · Gánh tan · Vở tuồng chọc giận quyền quý · Diễn đám tang tu sĩ · Bị nghi gián điệp · Tình đào kép · Gặp cướp khi lưu diễn · **Vở tuồng kể đúng đời mình kiếp trước** · Mất giọng · Bầu gánh ăn chặn · Đêm diễn cuối.
- Kết cục: Danh kỹ (vở tuồng mang tên mình trong tin đồn kiếp sau) · Chết nghèo · Gián điệp triều đình · Nhận ra giấc mộng (Mộng Ấn).

### 7.3 Võ đạo phàm nhân (cho mọi người, trọng tâm của vô linh căn)

- Tài nguyên: **Nội lực** — khí huyết tôi luyện, không dùng linh khí. Thanh nội lực thay chỗ thanh linh lực khi không có linh lực. Tu sĩ luyện võ nhận một nửa hiệu quả.
- Bậc và sức mạnh tương đương:

| Bậc | Sức mạnh | Điều kiện lên bậc |
|---|---|---|
| Tam lưu | phàm nhân khỏe ×1,3 | 60 ngày luyện võ |
| Nhị lưu | ×1,7 | 1 năm luyện + thắng 3 trận |
| Nhất lưu | ×2,2 | Thắng một lôi đài |
| Hậu thiên đỉnh phong | ngang Luyện Khí sơ kỳ | 10 năm luyện võ |
| Tiên thiên | ngang Luyện Khí trung kỳ | Sự kiện "Đả thông nhâm đốc" + phép thử đạo tâm |
| Tông sư | ngang Luyện Khí viên mãn (trần) | Sự kiện sinh tử "Ngộ võ ý" |

- Bí tịch võ phàm (14 quyển):

| Tên | Loại | Bậc cần | Tác dụng |
|---|---|---|---|
| Trường Quyền Nhập Môn | quyền | Tam lưu | Công +5% |
| Ngũ Hổ Đoạn Môn Đao | đao | Nhị lưu | Đòn chém làm giảm thủ địch 10% trong 2 lượt |
| Thất Tinh Kiếm Pháp | kiếm | Nhị lưu | Chí mạng +5 |
| Thiết Bố Sam | ngạnh công | Nhị lưu | Thủ +15%, khí huyết +5% |
| Thảo Thượng Phi | khinh công | Nhất lưu | Thân pháp +4, bỏ chạy chắc hơn |
| Bát Quái Chưởng | chưởng | Nhất lưu | 20% phản lại một phần đòn |
| Liên Châu Tiễn Pháp | cung | Nhất lưu | Hai lượt đầu được bắn trước |
| Ưng Trảo Công | trảo | Nhất lưu | 15% tước vũ khí người địch |
| Thái Cực Hóa Kình | nội gia | Hậu thiên đỉnh phong | Chuyển 20% sát thương nhận thành nội lực |
| Kim Chung Tráo | ngạnh công | Tiên thiên | Đỡ được một đòn đầu mỗi trận |
| Phá Ngọc Quyền | cương quyền | Tiên thiên | Xuyên hộ thể linh khí, đánh bị thương được tu sĩ |
| Đoạn Thủy Kiếm Ý | kiếm ý | Tông sư | Một đòn mỗi trận chém đứt lớp hộ thể |
| Hỗn Nguyên Nhất Khí Công | nội công | Tam lưu | Nội lực tối đa +20% |
| Quy Tức Công | nội công | Nhị lưu | Giả chết thoát thân; thọ +2 năm; nhịn ăn lâu gấp đôi |

- Nơi có bí tịch: võ quán (2 quyển đầu), võ phái của người chơi hoặc NPC, rương cổ mộ, phần thưởng lôi đài, đạo chích trộm, tiêu sư nhận công.
- Nối hệ luyện thể sau này: bậc Tông sư là cửa sang **Thể tu** khi hệ đó ra mắt (điều kiện để dành: Tông sư + thể chất loại cương + sự kiện "Phá kén").

### 7.4 Mười chín tu đạo (con đường của người có linh căn)

Bậc danh vị của tu đạo độc lập với cảnh giới, nhưng mỗi bậc có cảnh giới tối thiểu ghi trong ngoặc. Hệ có sẵn được nối ghi ở dòng "Nối".

**1. Đệ tử chính đạo** — Mệnh tuyến: Phi Thăng Lộ
- Vào: sơn môn tuyển đồ · tuần tra mời · tiến cử. Nội môn cần Đạo Hướng từ Chính Trực trở lên.
- Bậc: Tạp dịch → Ngoại môn (Luyện Khí) → Nội môn (Luyện Khí hậu kỳ) → Chân truyền (Trúc Cơ) → Trưởng lão (Kết Đan) → Chưởng môn (Nguyên Anh).
- Việc: việc tông, cống hiến, Tàng Kinh Các, đại bỉ, trấn thủ, đi trừ ma. Nối: hệ tông môn và cống hiến đã có.
- Sự kiện: Đại bỉ ngoại môn · Sư huynh ức hiếp · Bị vu trộm đan · Chọn sư phụ · Lệnh trừ một thôn "nhiễm ma" (tình huống #6) · Bí cảnh tông môn · Tranh chân truyền · Sư phụ bị hại · Tông chiến · Lộ bí mật bẩn của tông · Trưởng lão cướp công · Kế nhiệm.
- Kết cục: Chưởng môn · Chết vì tông · Phản tông · Phi thăng từ tông.

**2. Ma tu** — Mệnh tuyến: Diệt Thế Ma Đồ
- Vào: Đạo Hướng từ Tà Khí trở xuống + ma tông mời · tự luyện ma công cướp được.
- Bậc: Ma nô → Ma đồ (Luyện Khí) → Hộ pháp (Trúc Cơ) → Đường chủ (Kết Đan) → Ma tôn (Nguyên Anh) → Ma chủ (Hóa Thần).
- Việc: huyết luyện, cướp đoạt, việc ma tông (giết, bắt người), lập ma vực.
- Rủi ro: phản phệ, tâm ma, chính đạo vây quét, đồng môn ăn thịt nhau.
- Sự kiện: Nhập ma · Lần đầu luyện huyết · Bị đồng môn hãm hại · Có nên tha một mạng · Đại hội vây quét · Ma chủng thức tỉnh · Thu ma nô · Duyên với đệ tử chính đạo · Phản phệ · Ma kiếp · Lập ma vực · Diệt một tông chính.
- Kết cục: Ma chủ một phương · Diệt thế · Bị vây giết · Quay đầu (phế ma công, tàn phế).

**3. Tán tu** — Mệnh tuyến: Phi Thăng Lộ
- Vào: trắc linh xong mà không vào tông · rời tông.
- Bậc: Tán tu vô danh → Có động phủ → Có tiếng một vùng (Trúc Cơ) → Thủ lĩnh liên minh tán tu (Kết Đan) → Lão quái (Nguyên Anh) → Tán tiên (Hóa Thần).
- Việc: lịch luyện, săn yêu, khám phá, buôn ở phường thị, khai phủ. Nối: khai phủ, bế quan, lịch luyện đã có.
- Rủi ro: không chỗ dựa, bị tông môn chèn, bị giết đoạt bảo.
- Sự kiện: Bí cảnh mở · Bị phục ở phường thị · Liên minh tán tu · Giết người đoạt bảo hay bị đoạt · Động phủ bị phát hiện · Tông môn chiêu mộ · Bạn đồng hành phản · Làm khách khanh · Đấu giá · Thiên tài địa bảo xuất thế · Già mà không đột phá · Truyền thừa cổ tu.
- Kết cục: Tán tiên · Chết vô danh trong bí cảnh · Khách khanh tông môn · Lão quái ẩn thế.

**4. Sát thủ tu sĩ (Ám Đường)** — Mệnh tuyến: Huyết Cừu
- Vào: Ám Đường ở quỷ thị mời · từng là sát thủ phàm rồi có linh căn.
- Bậc: Ảnh vệ → Ám sứ (Luyện Khí hậu kỳ) → Tử sứ (Trúc Cơ) → Đoạt hồn sứ (Kết Đan) → Ảnh chủ (Nguyên Anh) → Vô Diện (Hóa Thần).
- Việc: hợp đồng giết tu sĩ, thiên kiêu thật trong `world.rivals`; điều tra mục tiêu; ẩn nặc; phá hộ vệ. Nối: che giấu tu vi.
- Sự kiện: Hợp đồng đầu · Mục tiêu là thiên kiêu nổi danh · Mục tiêu là đồng môn cũ · Bị chính đường bán đứng · Đứa trẻ chứng kiến · Mục tiêu có hộ đạo Nguyên Anh · Thử lòng · Rời đường · Kẻ thuê lật lọng · Lộ mặt · Ân nhân năm xưa · Ảnh chủ già.
- Kết cục: Vô Diện · Chết không tên · Ẩn thế · Bị tông môn nạn nhân treo xác.

**5. Trận pháp sư** — Mệnh tuyến: Phi Thăng Lộ
- Vào: xuất thân trận sư · tông nghề trận · nhặt trận đồ.
- Bậc: Trận đồ → Nhất giai → Nhị giai (Trúc Cơ) → Tam giai (Kết Đan) → Trận pháp đại sư (Nguyên Anh) → Trận đạo tông sư (Hóa Thần).
- Việc: bày trận cho động phủ, phá trận cổ mộ và bí cảnh, nhận đơn bày hộ sơn đại trận. Nối: ô trận bàn.
- Rủi ro: trận phản, bị diệt khẩu sau khi bày trận bí mật.
- Sự kiện: Trận đầu tay · Phá cấm chế cổ mộ · Thế gia thuê bày trận rồi muốn diệt khẩu · Trận bị phá giữa lúc bế quan · Thi trận ở thành · Trận đồ thất truyền · Bị nhốt trong trận cổ · Nhận đồ đệ · Hộ sơn đại trận · Trận diệt một tông · Ngộ trận đạo từ sao trời · Trận cuối đời.
- Kết cục: Trận đạo tông sư · Chết trong trận của mình · Bị diệt khẩu · Để lại trận đồ cho kiếp sau.

**6. Đan sư / Dược sư** — Mệnh tuyến: Y Giả Độ Thế
- Vào: xuất thân dược đồng, bốc thuốc · tông nghề đan · khí vận Dược Đồng.
- Bậc: Đan đồng → Nhất phẩm → Nhị phẩm (Trúc Cơ) → Tam phẩm (Kết Đan) → Đan vương (Nguyên Anh) → Đan thánh (Hóa Thần).
- Việc: luyện đan, hái thuốc, trồng dược viên, bán đan. Nối: bảng luyện chế, ô lô đỉnh, ô hỏa chủng.
- Rủi ro: nổ lò, ngộ độc, bị bắt làm nô luyện đan.
- Sự kiện: Lò đầu tiên · Nổ lò · Đơn thuốc cổ · Thử đan trên người · Bị thế gia giam luyện đan · Đan hội · Dịch bệnh cần đan · Kẻ ác cầu đan cứu mạng · Linh hỏa xuất thế · Độc đan bị đánh tráo · Học trò thiên tài · Đan thành dị tượng.
- Kết cục: Đan thánh · Chết vì nổ lò · Nô luyện đan suốt đời · Đan phương truyền đời.

**7. Luyện khí sư** — Mệnh tuyến: Võ Lâm Chí Tôn (nếu xuất thân thợ rèn) hoặc Phi Thăng Lộ
- Vào: xuất thân thợ rèn · tông nghề luyện khí.
- Bậc: Học đồ → Nhất giai → Nhị giai (Trúc Cơ) → Tam giai (Kết Đan) → Luyện khí đại sư (Nguyên Anh) → Khí đạo tông sư (Hóa Thần).
- Việc: luyện, sửa, khắc trận văn lên pháp bảo. Nối: bảng luyện chế, nguyên liệu nhóm khoáng.
- Rủi ro: khí linh phản chủ, đồ hỏng mất nguyên liệu quý.
- Sự kiện: Món đầu tay · Khí linh thức tỉnh · Đặt hàng của ma tông · Rèn binh khí cho tông chiến · Tranh khoáng · Thiên thạch rơi · Luyện bằng máu người · Bị cướp kiệt tác · Thi khí ở thành · Sửa kiếm cho kiếm tiên · Học trò phản · Khí thành dị tượng.
- Kết cục: Khí đạo tông sư · Bị khí linh nuốt · Bị cướp giết · Kiệt tác truyền đời.

**8. Phù sư** — Mệnh tuyến: Phi Thăng Lộ
- Vào: xuất thân đạo đồng · tông nghề phù.
- Bậc: Phù đồ → Hoàng phù sư → Huyền phù sư (Trúc Cơ) → Địa phù sư (Kết Đan) → Thiên phù sư (Nguyên Anh) → Phù tổ (Hóa Thần).
- Việc: vẽ phù, bán phù, trừ tà bằng phù. Nối: ô bút, đan/phù đang có (Kim Cang Phù, Chưởng Lôi Phù, Thần Hành Phù, Tị Lôi Phù).
- Sự kiện: Tấm phù đầu · Phù hỏng phát nổ · Trừ tà cho làng · Chu sa máu yêu · Phù giả bán chợ đen · Thi phù · Phù trận · Tông cần ngàn tấm phù cho chiến tranh · Phù cổ trong mộ · Phù đoạt mệnh · Học trò · Phù thành có linh.
- Kết cục: Phù tổ · Chết vì phản phù · Thầy phù làng · Phù lục truyền đời.

**9. Ngự thú sư** — Mệnh tuyến: Thế Gia Vạn Đại
- Vào: tông nghề thú · ấp nở linh thú.
- Bậc: Dưỡng thú đồng → Ngự thú sư → Thuần thú sư (Trúc Cơ) → Thú vương sứ (Kết Đan) → Vạn thú tôn (Nguyên Anh) → Vạn thú chi chủ (Hóa Thần).
- Việc: bắt, ấp, huấn luyện, phối giống, đấu thú. Nối: hệ linh thú (ấp, cho ăn, thả).
- Sự kiện: Con thú đầu · Thú chết thay chủ · Đấu thú trường · Thú mẹ đòi con · Thú hóa hình · Bị ép bán thú cho ma tông · Thú triều · Thú phản chủ · Thần thú con · Thú già · Huyết khế · Thú vương.
- Kết cục: Vạn thú chi chủ · Bị chính thú của mình giết · Sống ẩn với bầy thú · Bầy thú truyền đời (linh thú tồn tại sang kiếp sau).

**10. Triệu hoán sư** — Mệnh tuyến: Tỉnh Mộng
- Vào: khí vận Quỷ Nhãn / Nhân Quả Đạo · cổ tịch · đạo quán (thỉnh thần) · ma tông Phệ Hồn (âm binh).
- Bậc: Khế đồ → Khế sư → Linh sư (Trúc Cơ) → Thỉnh thần sư (Kết Đan) → Vạn linh sứ (Nguyên Anh) → Vạn linh chi chủ (Hóa Thần).
- Khác ngự thú: khế ước tạm, triệu trong trận bằng linh lực + vật dẫn; không cần nuôi nhưng mỗi lần đòi giá (hương, máu, hồn).
- Sự kiện: Khế ước đầu · Linh thể đòi giá cao hơn · Thỉnh nhầm thần · Âm binh không chịu về · Miếu hoang · Hồn kiếp trước của chính mình đáp lời (Mộng Ấn) · Khế ước bị cướp · Thần làng chết đói vì hết hương · Triệu yêu ma · Ma tông săn khế ước · Linh thể yêu chủ · Vạn linh triều bái.
- Kết cục: Vạn linh chi chủ · Bị linh thể nuốt · Thành thần làng sau khi chết · Tỉnh mộng (Mộng Ấn).

**11. Khôi lỗi sư** — Mệnh tuyến: Phú Giáp Thiên Hạ
- Vào: tông nghề luyện khí · Thiên Cơ tông · nhặt khôi lỗi hỏng ở phế tích.
- Bậc: Mộc tượng → Khôi lỗi sư → Cơ quan sư (Trúc Cơ) → Thiên cơ sư khôi lỗi (Kết Đan) → Khôi lỗi đại sư (Nguyên Anh) → Vạn cơ chi chủ (Hóa Thần).
- Việc: chế khôi lỗi (gỗ, kim loại; xác người là tà), sửa, bán, đấu khôi lỗi. Nối: bảng luyện chế.
- Sự kiện: Con rối đầu · Khôi lỗi có hồn · Đấu khôi lỗi · Thi khôi từ xác người thân · Tông cần chiến khôi · Khôi lỗi cổ trong mộ · Bị trộm bản vẽ · Khôi lỗi thay thân chết · Đặt hàng của triều đình · Con rối giống người đã mất · Khôi lỗi phản · Kiệt tác biết nói.
- Kết cục: Vạn cơ chi chủ · Bị khôi lỗi giết · Sống với con rối giống người đã khuất · Khôi lỗi truyền đời.

**12. Cổ sư** — Mệnh tuyến: Diệt Thế Ma Đồ hoặc Y Giả Độ Thế
- Vào: cổ sư Nam Trạch truyền · Linh Căn Cổ.
- Bậc: Dưỡng cổ nhân → Cổ sư → Đại cổ sư (Trúc Cơ) → Cổ vương sứ (Kết Đan) → Cổ tôn (Nguyên Anh) → Cổ thần (Hóa Thần).
- Việc: nuôi cổ, luyện cổ vương (trăm trùng một vò), hạ cổ, giải cổ.
- Sự kiện: Vò cổ đầu · Cổ cắn chủ · Giải cổ cho người · Hạ tình cổ · Trại cổ bị đốt · Cổ vương xuất vò · Dịch cổ lan làng · Cổ mẫu · Cổ sư đối đầu · Bị quan phủ truy · Cổ hóa người · Cổ thần.
- Kết cục: Cổ thần · Bị cổ ăn mòn · Thầy giải cổ được kính · Gieo dịch cổ diệt thành.

**13. Kiếm tu** — Mệnh tuyến: Phi Thăng Lộ
- Vào: tông nghề kiếm · khí vận Kiếm Phách / Kiếm Khí Trường Giang · thể chất Vô Cấu Kiếm Thể.
- Bậc: Kiếm đồng → Kiếm sĩ → Kiếm sư (Trúc Cơ) → Kiếm khách có kiếm ý (Kết Đan) → Kiếm tôn (Nguyên Anh) → Kiếm tiên (Hóa Thần).
- Việc: dưỡng kiếm, luận kiếm, ngộ kiếm ý (ngắm thác, ngắm mưa, xem người đốn củi), ngự kiếm đi đường.
- Sự kiện: Thanh kiếm đầu · Kiếm gãy · Luận kiếm trên núi · Ngộ kiếm dưới thác · Kiếm mộ · Kiếm linh · Đối thủ một đời · Kiếm của người đã chết · Ngự kiếm lần đầu · Một kiếm phá thành · Từ bỏ kiếm · Kiếm tâm thông minh.
- Kết cục: Kiếm tiên · Chết trên một trận luận kiếm · Treo kiếm quy ẩn · Kiếm ý truyền đời.

**14. Thể tu** — chỗ chờ cho hệ luyện thể sắp làm
- Vào để dành: Tông sư võ đạo · thể chất loại cương (Hoang Cổ Thánh Thể, Man Hoang Lực Thể, Kim Cương Bất Hoại, Thương Thiên Bá Thể, Cuồng Chiến Thể) · tông nghề thể.
- Bậc tạm: Đồng bì → Thiết cốt → Ngọc tủy → Kim thân → Bất diệt → Thánh thân. Thay toàn bộ khi hệ luyện thể có thiết kế riêng.

**15. Phật tu** — Mệnh tuyến: Y Giả Độ Thế hoặc Tỉnh Mộng
- Vào: xuống tóc ở chùa tông Phật · khí vận Phật Tử.
- Bậc: Sa di → Tỳ kheo → Thiền sư (Trúc Cơ) → La hán (Kết Đan) → Bồ tát (Nguyên Anh) → Phật (Hóa Thần).
- Việc: tụng kinh, thiền, siêu độ, hóa duyên, hàng ma.
- Giới: không giết người (phạm → mất một tiểu cảnh giới tu vi), không giữ của lớn (trên 500 linh thạch thì nguyện lực ngừng tăng).
- Sự kiện: Xuống tóc · Hóa duyên bị đuổi · Siêu độ làng chết dịch · Phá giới cứu người · Ma đầu xin quy y · Sư phụ viên tịch · Chùa bị ma tông đốt · Thiền trăm ngày · Người tình cũ tìm tới · Độ hóa yêu · Xá lợi · Ngộ không.
- Kết cục: Thành Phật · Phá giới hoàn tục · Viên tịch để lại xá lợi · Tỉnh mộng (Mộng Ấn).

**16. Thi tu** (luyện thi, nuôi quỷ) — Mệnh tuyến: Diệt Thế Ma Đồ
- Vào: khí vận Quỷ Nhãn · ma tông Thi Âm, U Minh.
- Bậc: Dưỡng thi nhân → Thi sư → Thiết thi sứ (Trúc Cơ) → Đồng giáp thi sứ (Kết Đan) → Phi thi tôn (Nguyên Anh) → Thi vương (Hóa Thần).
- Việc: đào mộ, luyện thi, nuôi quỷ ở đất âm.
- Sự kiện: Xác đầu tiên · Đào nhầm mộ người quen · Thi biến · Đạo sĩ Lôi pháp truy đuổi · Thi luyện từ người thân · Làng bị thi triều · Cổ thi trong lăng · Mặt trời đổ lửa · Thi tỉnh trí · Bị tông chính vây · Thi vương mộ · Ngàn xác một đêm.
- Kết cục: Thi vương · Bị chính thi phản · Bị Lôi pháp tru diệt · Tự chôn mình làm thi.

**17. Thương tu** — Mệnh tuyến: Phú Giáp Thiên Hạ
- Vào: thương nhân có linh căn · thương hội tu tiên ở phường thị.
- Bậc: Tiểu thương tu → Chưởng quỹ → Chủ thương hành (Trúc Cơ) → Đại thương chủ (Kết Đan) → Hội chủ thương minh (Nguyên Anh) → Tài thần (Hóa Thần).
- Việc: buôn linh vật giữa các khu, đấu giá, cho vay linh thạch, mở phường thị. Nối: thương đội, phường thị, quỷ thị.
- Sự kiện: Chuyến hàng linh vật đầu · Bị cướp ở biên khu · Đấu giá gian lận · Con nợ là tông môn · Đầu cơ linh thảo trước thú triều · Thương minh chèn ép · Buôn hàng cấm cho ma tông · Linh thạch giả · Cứu một thương đội · Phường thị riêng · Tài thần giáng (tin đồn) · Phá sản.
- Kết cục: Tài thần · Phá sản, bị chủ nợ giết · Quy ẩn với kho báu (chôn cho kiếp sau) · Thương minh truyền đời.

**18. Thiên cơ sư** (bói toán, nhân quả) — Mệnh tuyến: Tỉnh Mộng
- Vào: khí vận Nhân Quả Đạo, Thiên Lý Nhãn · Thiên Cơ các.
- Bậc: Bói toán đồng → Tướng sư → Thiên cơ sư (Trúc Cơ) → Đại thiên cơ sư (Kết Đan) → Khuy thiên giả (Nguyên Anh) → Thiên cơ tử (Hóa Thần).
- Việc: xem quẻ, đọc nhân quả người khác, bán tin cơ duyên, tính kiếp. Mỗi lần nhìn trộm thiên cơ mất thọ.
- Sự kiện: Quẻ đầu · Quẻ báo chết cho người thân · Vua mời xem quốc vận · Ma đầu ép xem đường sống · Thấy chính kiếp trước trong quẻ (Mộng Ấn) · Bị thiên khiển · Đổi mệnh cho người khác · Đoán sai · Thiên cơ các truy sát kẻ lộ thiên cơ · Đứa trẻ có mệnh đế vương · Xem tận thế · Quẻ cuối.
- Kết cục: Thiên cơ tử · Mù vì thiên khiển · Chết vì lộ thiên cơ · Tỉnh mộng.

**19. Nho tu** — Mệnh tuyến: Đế Nghiệp
- Vào: Văn tâm (Phần 5.5). Đạo Hướng phải giữ từ Chính Trực trở lên; xuống thấp hơn thì văn tâm nứt.
- Bậc: Văn sĩ → Đọc sách nhập đạo → Lập ngôn (Trúc Cơ) → Lập công (Kết Đan) → Lập đức (Nguyên Anh) → Á thánh (Hóa Thần).
- Việc: đọc sách, viết sách, dạy học, khuyên vua, ngôn xuất pháp tùy.
- Sự kiện: Đêm đọc sách thấy chữ phát sáng · Viết hịch · Can vua · Đốt sách · Học trò phản đạo · Văn tự ngục · Một câu hàng phục sơn tặc · Đối đáp với ma tu · Lập học đường · Sách truyền thiên hạ · Văn tâm nứt · Thánh ngôn.
- Kết cục: Á thánh · Văn tâm vỡ thành phế nhân · Đế sư · Sách truyền đời.

### 7.5 Hai mươi hai pháp môn (cách lấy sức mạnh)

Đạo đồ là "làm nghề gì", pháp môn là "đánh và tu bằng cách nào". Mỗi pháp môn có: tài nguyên riêng, 3 công pháp (Hoàng phẩm cho Luyện Khí, Huyền phẩm cho Trúc Cơ, Địa phẩm cho Kết Đan), 5 chiêu (bậc 1–2 dùng thường; bậc 3 là thần thông, chỉ tung qua pháp tướng), cái giá, Đạo Hướng / Nhân Quả.

Luật chung:
- Mỗi người tối đa **2 pháp môn chính** cộng Ngũ hành pháp thuật.
- **Không ghép được**: Phật pháp với Huyết thuật, Luyện hồn, Thôn phệ, Thi thuật · Nho thuật với Huyết thuật, Luyện hồn, Thôn phệ, Thi thuật, Cổ thuật · Lôi pháp với Thi thuật, Luyện hồn.
- **Ghép có lợi** (+15% hiệu quả chiêu của cả hai): Kiếm thuật + Thần thức · Trận thuật + Phù thuật · Khiển thú + Triệu hoán · Cổ thuật + Đan độc · Huyết thuật + Thôn phệ · Âm luật + Huyễn thuật · Phật pháp + Lôi pháp · Nho thuật + Thần thức.

| # | Pháp môn | Tài nguyên riêng | Công pháp (Hoàng → Huyền → Địa) | Đạo Hướng | Nhân Quả |
|---|---|---|---|---|---|
| 1 | Ngũ hành pháp thuật | linh lực (đã có) | giữ nguyên dữ liệu hiện có | trung | — |
| 2 | Kiếm thuật | Kiếm ý 0–5 (mỗi đòn kiếm +1) | Thanh Phong Kiếm Quyết → Lưu Vân Kiếm Điển → Vạn Kiếm Quy Nhất Kinh | trung | — |
| 3 | Huyết thuật | Huyết khí (nạp bằng khí huyết mình hoặc máu địch) | Huyết Hà Tâm Kinh → Vạn Huyết Quy Tông → Huyết Thần Bất Diệt Kinh | Tà +1 mỗi trận dùng | Chỉ khi dùng máu người vô tội |
| 4 | Luyện hồn thuật | Hồn trong hồn phiên (tối đa 9 / 27 / 81) | Thu Hồn Quyết → Vạn Hồn Phiên Pháp → U Minh Luyện Hồn Kinh | Tà | Thu hồn người vô tội Nghiệp +3/hồn; thu oán hồn đang hại người Phúc +1 |
| 5 | Luyện thể thuật (tạm, chờ hệ luyện thể) | khí huyết | Kim Cương Luyện Thể Quyết → Long Tượng Bàn Nhược Thân → Bất Diệt Kim Thân Kinh | trung | — |
| 6 | Thần thức thuật | Thần thức (đã có) | Minh Tâm Quán Tưởng Pháp → Thái Hư Thần Niệm Kinh → Tử Phủ Đăng Thiên Lục | trung | — |
| 7 | Triệu hoán thuật | Khế ước 1 / 2 / 3 | Thỉnh Linh Phù Kinh (đạo) hoặc Âm Linh Triệu Hồn Quyết (ma) → Bát Hoang Khế Ước Thư → Vạn Linh Triều Bái Kinh | Thỉnh thần Chính; âm binh Tà | Âm binh từ hồn người: Nghiệp |
| 8 | Khiển thú thuật | Linh thú (đã có) | Ngự Thú Tâm Quyết → Vạn Thú Đồng Tâm Kinh → Thú Hoàng Huyết Khế | trung; ngược đãi thú Tà | — |
| 9 | Trận thuật | Trận kỳ (tiêu hao) + ô trận bàn | Cơ Sở Trận Lý → Cửu Cung Bát Quái Trận Đồ → Chu Thiên Tinh Đấu Trận Kinh | trung | — |
| 10 | Phù thuật | Phù đã vẽ + ô bút | Hoàng Phù Đồ Lục → Huyền Phù Bảo Giám → Thiên Phù Chân Kinh | trung | — |
| 11 | Đan thuật & độc thuật | Độc dược trong túi | Bách Thảo Kinh → Vạn Độc Chân Kinh → Thần Nông Bản Thảo Chân Giải | trung; hạ độc người Tà | Theo nạn nhân |
| 12 | Khôi lỗi thuật | Khôi lỗi (đồng đội bền, chế ở luyện chế) | Mộc Giáp Thuật → Thiên Cơ Khôi Lỗi Đồ → Vạn Cơ Thần Biến Lục | trung; thi khôi Tà +5 | Thi khôi Nghiệp +3 |
| 13 | Cổ thuật | Cổ trùng trong vò | Dưỡng Cổ Thiên → Vạn Cổ Quy Tông → Cổ Thần Kinh | Tà nhẹ | Hạ cổ người vô tội Nghiệp |
| 14 | Âm luật thuật | Nhạc khí (thêm loại vũ khí "cầm/tiêu") | Thanh Tâm Phổ → Bát Âm Thiên Lại Kinh → Cửu Thiên Tiên Âm Lục | trung | — |
| 15 | Huyễn thuật | Huyễn lực (theo thần thức) | Kính Hoa Thủy Nguyệt Quyết → Đại Mộng Thiên Huyễn Kinh → Hoàng Lương Nhất Mộng Lục | trung; lừa người Tà | — |
| 16 | Lôi pháp | Lôi ấn (mỗi lượt +1) | Ngũ Lôi Phù Ấn → Thái Thượng Lôi Đình Kinh → Cửu Tiêu Thần Lôi Chân Pháp | Chính | Trừ tà Phúc |
| 17 | Phật pháp | Nguyện lực (siêu độ, cứu người, tụng kinh) | Bát Nhã Tâm Kinh Giải → Kim Cương Bất Hoại Thân Kinh → Đại Thừa Bồ Đề Kinh | Chính | Siêu độ tiêu nghiệp |
| 18 | Thi thuật | Thi (xác luyện) | Dưỡng Thi Quyết → Thiết Thi Luyện Pháp → Phi Thi Bất Hóa Kinh | Tà | Đào mộ người thường Nghiệp +2/mộ |
| 19 | Ẩn sát thuật | Sát cơ (tăng khi ẩn) | Ám Ảnh Quyết → Vô Ảnh Sát Kinh → Vô Diện Tâm Kinh | Tà nhẹ | Theo mục tiêu |
| 20 | Thôn phệ thuật | Thôn phệ (hút tu vi, linh lực kẻ chết) | Phệ Linh Quyết → Thôn Thiên Ma Công → Hỗn Độn Thôn Phệ Kinh | Tà mạnh | Theo nạn nhân |
| 21 | Thiên cơ thuật | Thọ nguyên | Mai Hoa Dịch Số → Thái Ất Thần Số → Thiên Cơ Bất Khả Lộ | trung | Nghịch thiên cải mệnh Nghiệp +10 |
| 22 | Nho thuật | Hạo nhiên khí (đọc sách, việc chính trực) | Đại Học Chính Tâm Thiên → Hạo Nhiên Chính Khí Ca → Thánh Ngôn Lập Pháp | Chính bắt buộc | — |

**Chiêu của từng pháp môn** (bậc · tác dụng). Bậc 3 là thần thông.

| Pháp môn | Chiêu 1 | Chiêu 2 | Chiêu 3 | Chiêu 4 | Chiêu 5 (thần thông) |
|---|---|---|---|---|---|
| Kiếm thuật | Kiếm Khí Trảm · 1 · 140% công vật lý, +1 kiếm ý | Ngự Kiếm Thuật · 1 · đánh từ xa; từ Trúc Cơ ngoài trận đi đường nhanh hơn 20% | Kiếm Võng · 2 · diện rộng 90% | Kiếm Tâm Thông Minh · 2 · tiêu 3 kiếm ý: 2 lượt chí mạng chắc chắn | Nhất Kiếm Khai Thiên · 3 · tiêu 5 kiếm ý, 500% công, xuyên hộ thể |
| Huyết thuật | Huyết Tiễn · 1 · đốt 8% khí huyết mình, 160% phép, hút 30% sát thương | Huyết Độn · 1 · chắc chắn thoát thân, mất 25% khí huyết | Huyết Ảnh Phân Thân · 2 · phân thân chịu một đòn | Huyết Hà Đại Trận · 2 · mỗi lượt hút 5% khí huyết mọi địch, 3 lượt | Huyết Thần Giáng · 3 · 3 lượt công +60%, mỗi lượt mất 10% khí huyết |
| Luyện hồn | Nhiếp Hồn · 1 · choáng 1 lượt, trúng theo thần thức | Quỷ Ảnh Phệ Thân · 1 · tiêu 1 hồn, 200% phép bỏ qua thủ | Hồn Khiếu · 2 · diện rộng, công địch −15% 3 lượt | Vạn Hồn Tề Phát · 2 · tiêu mọi hồn, mỗi hồn 30% phép | Hồn Phiên Già Thiên · 3 · 3 lượt địch không hồi phục, mỗi lượt mất 8% |
| Luyện thể (tạm) | Thiết Cốt · 1 · thủ +30% 3 lượt | Băng Sơn Kháo · 1 · 180% công, 30% choáng | Bất Động Như Sơn · 2 · phản 20% sát thương 3 lượt | Khí Huyết Như Long · 2 · hồi 20% khí huyết | Pháp Thiên Tượng Địa · 3 · 3 lượt mọi chỉ số +40% |
| Thần thức | Thần Thức Thứ · 1 · sát thương theo thần thức, bỏ qua thủ | Linh Giác · 1 · ngoài trận: thấy địch ẩn, bẫy, tầm nhìn bản đồ +2 ô trong 1 ngày | Nhiếp Tâm · 2 · địch thần thức kém hơn tự đánh mình 1 lượt | Thần Niệm Hóa Binh · 2 · 3 thần binh, mỗi cái 60% phép | Thần Uy Như Ngục · 3 · địch thần thức thấp hơn bị trấn 2 lượt |
| Triệu hoán | Triệu Sơn Tinh · 1 · linh thể Thổ đỡ đòn 3 lượt | Triệu Phong Linh · 1 · đồng đội thân pháp +30% 3 lượt | Âm Binh Quá Cảnh · 2 · 5 âm binh, mỗi cái 40% (đường ma) | Thỉnh Thần Giáng Thể · 2 · 3 lượt mọi chỉ số +30%, rồi hư nhược 2 lượt | Vạn Linh Triều Bái · 3 · triệu mọi khế ước cùng lúc |
| Khiển thú | Đồng Tâm · 1 · linh thú +20% 3 lượt | Thú Hống · 1 · choáng địch nhỏ hơn | Hợp Kích · 2 · chủ và thú cùng đánh 150% | Huyết Khế Hộ Chủ · 2 · thú đỡ đòn chí mạng thay chủ | Thú Hóa · 3 · chủ nhận năng lực thú 3 lượt |
| Trận thuật | Khốn Trận · 1 · địch không chạy được, né −20% | Mê Tung Trận · 1 · trong trận địch trượt 30%; ngoài trận kẻ đuổi mất dấu | Ngũ Hành Sát Trận · 2 · mỗi lượt sát thương theo hành 4 lượt | Tụ Linh Trận · 2 · ngoài trận: bế quan ở động phủ +15% | Hộ Sơn Đại Trận · 3 · chỉ ở động phủ hoặc tông: miễn sát thương 3 lượt đầu |
| Phù thuật (phù vẽ được) | Hỏa Cầu Phù · 1 · 180% phép Hỏa | Trấn Hồn Phù · 1 · quỷ, thi choáng 2 lượt | Ẩn Thân Phù · 1 · ngoài trận tránh một lần chạm trán | Truyền Tống Phù · 2 · ngoài trận về thành gần nhất | Thiên Lôi Phù · 3 · 400% phép Lôi diện rộng |
| Đan độc | Độc Châm · 1 · độc chồng 2 lớp | Độc Vụ · 1 · diện rộng độc 3 lượt | Vạn Độc Phệ Tâm · 2 · độc trên địch gây gấp đôi | Bách Độc Bất Xâm · 2 · miễn độc 5 lượt | Độc Long Xuất Hải · 3 · độc diện rộng, địch không hồi phục |
| Khôi lỗi | Khôi Lỗi Xuất Kích · 1 · khôi lỗi đánh 120% | Thế Thân Khôi Lỗi · 1 · chịu một đòn chết thay | Tự Bạo · 2 · khôi lỗi nổ 300% | Thiên Ti Khống · 2 · điều khiển thêm một khôi lỗi | Kim Cương Chiến Khôi · 3 · chiến khôi sức Kết Đan 3 lượt |
| Cổ thuật | Phệ Tâm Cổ · 1 · mỗi lượt mất 5% khí huyết | Kim Tằm Cổ · 1 · hút máu chuyển sang mình | Tình Cổ · 2 · ngoài trận: một người không thể phản bội mình (Tà +3) | Vạn Cổ Thực Thiên · 2 · diện rộng, giảm thủ 20% | Cổ Vương Giáng Thế · 3 · cổ vương đánh 3 lượt, mỗi lượt 200% |
| Âm luật | Thanh Tâm Khúc · 1 · đồng đội tâm ma −5, hồi linh lực 10% | Loạn Hồn Khúc · 1 · địch loạn 1 lượt | Sát Phạt Khúc · 2 · đứng đàn 3 lượt, mỗi lượt 80% diện rộng | Thập Diện Mai Phục · 2 · địch né −20%, đồng đội chí mạng +10 | Thiên Lại Tuyệt Âm · 3 · 3 lượt địch không dùng chiêu |
| Huyễn thuật | Huyễn Ảnh · 1 · 2 ảnh, địch trượt | Mê Hồn · 1 · địch ngủ 1 lượt | Kính Trung Nhân · 2 · phản lại chiêu đầu tiên của địch | Thiên Huyễn Lao Lung · 2 · nhốt địch 2 lượt, địch mất đạo tâm | Hoàng Lương Nhất Mộng · 3 · địch thần thức kém xa: kết thúc trận; còn lại choáng 3 lượt |
| Lôi pháp | Chưởng Tâm Lôi · 1 · 150% phép Lôi, đánh quỷ thi ×1,5 | Lôi Độn · 1 · né chắc một đòn | Ngũ Lôi Oanh Đỉnh · 2 · 5 đạo, mỗi đạo 50% | Lôi Đình Hộ Thể · 2 · phản sát thương Lôi 3 lượt | Cửu Tiêu Thần Lôi · 3 · 600% phép Lôi; luyện lôi pháp giảm 10% sát thương thiên lôi |
| Phật pháp | Sư Tử Hống · 1 · choáng, đánh ma ×1,5 | Kim Cương Hộ Thể · 1 · hộ thể 30% khí huyết | Đại Bi Chú · 2 · hồi 25% đồng đội, tâm ma −10 | Đại Thủ Ấn · 2 · 220% công, phá hộ thể | Phật Quang Phổ Chiếu · 3 · ma, quỷ, thi mất 30% mỗi lượt; ma tu yếu có thể quy y |
| Thi thuật | Thi Độc Trảo · 1 · 130% + độc | Thiết Thi Hộ Chủ · 1 · thi đỡ đòn 3 lượt | Thi Bạo · 2 · nổ xác 250% diện rộng | Vạn Thi Triều · 2 · gọi 6 xác yếu | Phi Thi Giáng Thế · 3 · phi thi sức Kết Đan 3 lượt |
| Ẩn sát | Ẩn Nặc · 1 · ẩn 2 lượt; ngoài trận tránh chạm trán | Bối Thứ · 1 · từ trạng thái ẩn: chí mạng chắc 300% | Ảnh Độn · 2 · thoát thân và ẩn | Phong Hầu · 2 · địch dưới 30% khí huyết chết ngay (trừ thủ lĩnh, kiếp) | Vô Diện Sát · 3 · 3 đòn ẩn liên tiếp |
| Thôn phệ | Phệ Linh Thủ · 1 · hút 15% linh lực địch | Thôn Phệ Tinh Huyết · 2 · kết liễu, nhận 5% tu vi nạn nhân | Hắc Động · 2 · địch thủ −25% 3 lượt | Phệ Hồn · 2 · hút thần thức | Vạn Vật Quy Khư · 3 · 450% phép, hồi 50% sát thương gây ra |
| Thiên cơ | Bốc Quẻ · 1 · ngoài trận: thấy trước lối rẽ hiện tại (−0,2 năm thọ) | Quan Nhân Quả · 1 · ngoài trận: xem nhân quả và tuyến của một người (−0,5 năm) | Tiên Tri · 1 · biết chiêu địch lượt sau, né +50% 1 lượt | Tránh Hung · 2 · 30 ngày một lần: huỷ một sự kiện xấu sắp tới (−1 năm) | Nghịch Thiên Cải Mệnh · 3 · ngoài trận: đổi một khí vận xấu thành khí vận ngẫu nhiên khác (−10 năm, Nghiệp +10) |
| Nho thuật | Ngôn "Định" · 1 · địch yếu hơn không hành động 1 lượt | Văn Khí Hộ Thân · 1 · hộ thể theo hạo nhiên khí | Ngôn "Hàng" · 2 · kẻ địch người, yếu hơn và sai lý phải đầu hàng | Bút Lạc Kinh Phong · 2 · 200% phép, đánh tà ×1,5 | Thánh Nhân Giáng Ngôn · 3 · 3 lượt địch tà mất 20% mỗi lượt, đồng đội tâm ma về 0 |

**Cái giá / phản phệ từng pháp môn**

| Pháp môn | Cái giá |
|---|---|
| Kiếm thuật | Không cầm kiếm: hiệu quả −30%. Kiếm bản mệnh gãy: tâm ma +5 |
| Huyết thuật | Dùng khi khí huyết dưới 20%: 30% thương thế bậc 2. Bị Phật pháp, Lôi pháp, Nho thuật đánh trúng chịu ×1,3 |
| Luyện hồn | Mỗi 10 hồn đang giữ: tâm ma +1 mỗi tháng. Hồn phiên vỡ: điên loạn 30 ngày (không điều khiển được lựa chọn tự động trong sự kiện) |
| Luyện thể (tạm) | Mỗi lần dùng chiêu bậc 2+: 10% thương thế bậc 1 |
| Thần thức | Thần thức cạn: hôn mê 1 ngày |
| Triệu hoán | Mỗi lần triệu tốn vật dẫn: hương 20 văn, hoặc 5% khí huyết, hoặc 1 hồn |
| Khiển thú | Thú chết: tâm ma +10 |
| Trận thuật | Cần lượt chuẩn bị đầu trận; địch thần thức gấp đôi phá trận ngay |
| Phù thuật | Vẽ phù tốn linh lực + chu sa (nhóm khoáng) + 2 giờ; tỉ lệ hỏng giảm theo bậc phù sư (40% → 5%) |
| Đan độc | Luyện độc: 5% tự trúng độc |
| Khôi lỗi | Khôi lỗi hỏng phải sửa ở luyện chế |
| Cổ thuật | Nuôi cổ mỗi tháng; bỏ đói 2 tháng: cổ cắn chủ (thương thế bậc 2) |
| Âm luật | Bị ngắt đàn (choáng) thì khúc dừng |
| Huyễn thuật | Địch thần thức mạnh hơn: phản ảo, mình choáng 1 lượt |
| Lôi pháp | Dùng ở nơi âm khí nặng hiệu quả −20% |
| Phật pháp | Giết người: mất nguyện lực, Phật quang tắt 30 ngày |
| Thi thuật | Ban ngày ngoài trời: thi −30%; bị Lôi pháp, Phật pháp ×1,5 |
| Ẩn sát | Bị phát hiện khi đang ẩn: lượt đó không hành động |
| Thôn phệ | Mỗi lần thôn phệ 20% tâm ma +3; tu vi do thôn phệ quá nửa tầng: đột phá −10 |
| Thiên cơ | Mất thọ mỗi lần dùng; dùng quá 3 lần/năm: 20% thiên khiển (mù 30 ngày) |
| Nho thuật | Làm một việc Tà ≥ 5: văn tâm nứt (mất nửa hạo nhiên khí); nứt 3 lần: vỡ, mất pháp môn |

---

## 8. Đạo Hướng — chính và tà (yêu cầu 8, 9)

### 8.1 Định nghĩa
**Đạo Hướng đo cách bạn chọn**: phương tiện, động cơ, công pháp, lời nói và việc làm — và vì thế, thiên hạ nhìn bạn ra sao. Nó **chỉ có tác dụng trong kiếp này** và về 0 khi đầu thai. Nó **không** nói việc bạn làm thật sự tốt hay xấu cho chúng sinh — đó là việc của Nhân Quả (Phần 9).

Ví dụ phân biệt: chính đạo diệt cả một thôn "nhiễm ma" theo lệnh tông → Đạo Hướng nghiêng Chính (theo lệnh, trừ ma), nhưng Nhân Quả mang Nghiệp nặng nếu thôn đó chỉ bị bệnh dịch.

### 8.2 Cách tính (ẩn với người chơi)
- Hai dòng tích lũy: **Chính khí** và **Tà khí** (từ 0, không âm).
- **Hướng** = Chính khí ÷ (Chính khí + Tà khí). **Độ đậm** = Chính khí + Tà khí.
- Khởi đầu kiếp: tính tình theo xuất thân và mệnh cách (Chính trực, Nhân hậu → Chính khí 20; Tàn nhẫn, Cuồng tà, Sát phạt → Tà khí 20; khác → 0); khí vận "Thiên về thiện/ác" (trường `amDuongBonus`) → nhân 2 đổ vào dòng tương ứng.
- Mỗi năm cả hai dòng phai **3%** (người đời quên dần), nên Đạo Hướng phản ánh việc làm gần đây nhiều hơn.

### 8.3 Bảng chữ hiển thị

| Hướng (tỉ lệ chính khí) | Tên | Màu thanh | Lời tooltip |
|---|---|---|---|
| từ 90% | **Hạo Nhiên** | trắng ngà | Chính khí ngút trời, tà ma tránh xa, nhưng cũng chẳng thể cúi đầu. |
| 75–90% | **Quang Minh** | vàng nhạt | Làm việc đường hoàng, người ngay tin cậy. |
| 60–75% | **Chính Trực** | xanh ngọc | Phần nhiều theo lẽ phải. |
| 40–60% | **Tùy Tâm** | xám tro | Không theo chính, không theo tà; chỉ theo lòng mình. |
| 25–40% | **Tà Khí** | tím than | Thủ đoạn khó lường, người thường e ngại. |
| 10–25% | **Ma Tâm** | đỏ sẫm | Lòng đã nhuốm ma, thiên hạ xa lánh. |
| dưới 10% | **Vô Gian** | đỏ đen | Không còn đường quay đầu. |

| Độ đậm | Tên | Hệ số mạnh yếu của mọi tác dụng ở 8.4 |
|---|---|---|
| dưới 30 | **Sơ tâm** (chưa định hình; luôn hiện là "Sơ tâm", không hiện hướng) | ×0 |
| 30–150 | **nhạt** | ×0,4 |
| 150–500 | **rõ** | ×0,7 |
| 500–1.500 | **đậm** | ×1,0 |
| từ 1.500 | **thấm cốt** | ×1,2 và mở danh hiệu riêng (Hạo Nhiên: "Chính khí trường tồn"; Vô Gian: "Ma đầu") |

Hiển thị trong bảng nhân vật: "Đạo Hướng: **Chính Trực · rõ**" + thanh hai màu (ngà ↔ đỏ thẫm) **không có số**.

### 8.4 Được và mất theo hướng (giá trị ở độ đậm "đậm"; nhân hệ số ở 8.3)

| Hướng | Được | Mất |
|---|---|---|
| **Hạo Nhiên** | Kháng tâm ma +40% · Hộ tâm +8 · Chiêu Lôi pháp, Phật pháp, Nho thuật +15% · Sát thương lên ma tu, quỷ, thi +20% · Phàm dân và chính đạo: giá −15%, dễ được mời nhập tông chính · Phúc nhận +20% | Không dùng được Huyết thuật, Luyện hồn, Thôn phệ, Thi thuật (cố dùng → phá đạo tâm: tâm ma +15, Chính khí −30%) · Làm trái hướng dao động gấp đôi · Ma tông chủ động truy sát · Không lục túi người thua mà không mất Chính khí · Khó che giấu thân phận |
| **Quang Minh** | Kháng tâm ma +25% · Chiêu chính +10% · Giá −10% ở chính đạo, thôn trấn · Nhiệm vụ tông chính trả cống hiến +10% | Công pháp tà hiệu quả −50% · Dao động ×1,5 · Ma tông có thể truy sát |
| **Chính Trực** | Kháng tâm ma +15% · Giá −5% ở thành trấn có tông chính · Mở nhiệm vụ tông chính | Công pháp tà −30%; mỗi lần dùng tâm ma +5 |
| **Tùy Tâm** | Dùng được cả công pháp chính lẫn tà ở 85% hiệu quả · Mua bán cả phường thị lẫn quỷ thị · Hai phe ít truy sát (−50%) · Chí mạng +5 (khó đoán) | Không phe nào tin hẳn: không vào được nội môn của tông lớn nhất mỗi phe (chỉ ngoại môn, khách khanh) · Cống hiến nhận −15% · Không có kháng tâm ma · **Không bị dao động** khi làm trái |
| **Tà Khí** | Sát thương +8% · Đe dọa: giá quỷ thị −10%, ép giá được ở thôn trấn · Huyết thuật, Thôn phệ +10% | Phàm dân sợ: giá ở thôn trấn +15% (nếu không ép) · Tông chính từ chối · Tuần tra chính đạo hỏi giấy · Tâm ma tăng nhanh hơn 15% |
| **Ma Tâm** | Sát thương +15% · Hút máu +3% · Ma tông mời làm chấp sự · Giết người được tu vi (huyết luyện, 1% tầng mỗi mạng) | Thành chính đạo treo thưởng (thay luật karma ≤ −60 cũ) · Tâm ma tăng nhanh hơn 25% · Thiên kiêu chính đạo chủ động tìm diệt · Phàm dân bỏ chạy: mất dịch vụ ở thôn |
| **Vô Gian** | Sát thương +22% · Giết địch hồi 5% khí huyết · Uy áp: địch thấp hơn một đại cảnh giới công −10% · Lập được ma môn riêng | Mọi chính đạo truy sát · Không vào thành có tông chính · Tâm ma tăng nhanh hơn 40% · **Ma niệm**: mỗi năm khi tâm ma ≥ 50, 20% tự làm một việc ác ngẫu nhiên (game kể lại, người chơi chỉ chọn cách đối diện hậu quả) |

### 8.5 Làm trái hướng — "đạo tâm dao động" (học từ Crusader Kings)
Khi một việc làm cộng từ 3 điểm trở lên vào dòng **ngược** với hướng hiện tại: tâm ma + (số điểm × hệ số độ đậm: sơ tâm 0, nhạt 0,2, rõ 0,4, đậm 0,6, thấm cốt 1,0). Tùy Tâm không bị. Lời kể: "Tay run khi rút kiếm về; lòng như có ai gõ cửa."

### 8.6 Thay chỗ số `karma` cũ

| Chỗ dùng `karma` cũ | Thay bằng |
|---|---|
| Điều kiện vào tông (`need.karma`) | Bậc Đạo Hướng tối thiểu/tối đa |
| Độ thù của thành, treo thưởng (02-dia-diem) | Đạo Hướng (Ma Tâm, Vô Gian) và tuyến Huyết thù với thành đó |
| Loại thiên kiếp Nghiệp Hỏa (≤ −30) | Nghiệp tuyệt đối (Phần 9.7) |
| Điều kiện thể chất `pureR` (≥40) / `pureE` (≤−40) / `neutral` | Quang Minh trở lên / Ma Tâm trở xuống / Tùy Tâm |
| Khí vận "thiên về thiện/ác" | Đổ Chính khí / Tà khí lúc đầu thai |
| Thành tựu "Thiện nhân", "Ma đầu" | Hạo Nhiên thấm cốt / Vô Gian thấm cốt |
| Phạt nhiệm vụ trễ, bỏ nhiệm vụ (karma −2, −4) | Thất hứa: Tà khí +3, Nghiệp +2 (bảng 10) |
| Thưởng giao hàng đúng hạn (karma +2) | Giữ lời: Chính khí +2 |

**Bản lưu cũ:** karma > 0 → Chính khí = karma × 5, Phúc = karma × 2. karma < 0 → Tà khí = |karma| × 5, Nghiệp = |karma| × 2. karma = 0 → cả bốn bằng 0.

---

## 9. Nhân Quả (yêu cầu 7, 8, 9)

### 9.1 Định nghĩa
**Nhân Quả đo điều thực sự đã xảy ra vì bạn**: ai được sống, ai chết, ai khổ, ai mang ơn, ai mang hận. Phần lớn **ẩn** và **đến trễ**. Nó quyết định **khởi đầu kiếp sau** và **uy lực thiên kiếp** kiếp này. Game không bảo việc nào là đúng; nó chỉ ghi.

### 9.2 Ba thành phần
1. **Phúc** — thiện quả tích lũy.
2. **Nghiệp** — ác quả tích lũy. Phúc và Nghiệp **không xóa nhau**: một người có thể vừa nhiều phúc vừa nặng nghiệp.
3. **Nhân Quả Tuyến** — các sợi duyên cụ thể với từng người (9.9).

### 9.3 Bảng chữ hiển thị (theo cán cân Phúc − Nghiệp)

| Cán cân | Bậc | Tên hiển thị | Lời tooltip |
|---|---|---|---|
| từ +300 | +4 | **Công Đức Vô Lượng** | Ánh vàng mờ quanh người, kẻ ác thấy cũng chùn tay. |
| +150..+300 | +3 | **Phúc Duyên Thâm Hậu** | Đi đâu cũng gặp người tốt. |
| +60..+150 | +2 | **Phúc Trạch** | Phúc đức đủ che cho con cháu. |
| +20..+60 | +1 | **Thiện Duyên** | Có chút thiện duyên. |
| −20..+20 | 0 | **Thanh Tịnh** | Chưa vướng gì nhiều. |
| — | 0* | **Thiện Ác Đan Xen** (khi cả Phúc và Nghiệp đều từ 100 trở lên, cán cân trong ±60) | Tay vừa cứu người vừa nhuốm máu. |
| −60..−20 | −1 | **Vướng Nghiệp** | Có món nợ chưa trả. |
| −150..−60 | −2 | **Nghiệp Chướng** | Đêm nằm hay mơ thấy người lạ. |
| −300..−150 | −3 | **Nghiệp Hỏa** | Lửa nghiệp đã bén gót chân. |
| dưới −300 | −4 | **Nghiệp Chướng Ngập Trời** | Trời đất cũng muốn thu. |

Người chơi chỉ thấy tên bậc. Khí vận **Nhân Quả Đạo** và pháp môn Thiên cơ cho thấy rõ hơn (Phần 12, 7.5).

### 9.4 Quả chín (hậu quả đến trễ)
- Mỗi hành vi có thể gieo một **hạt** (dùng lại `r.seeds` đã có) với: loại quả, người liên quan, độ trễ (tháng), lượng Phúc/Nghiệp **chưa cộng**.
- Đến hạn và người chơi ở nơi phù hợp → mở sự kiện "quả chín"; lúc đó mới cộng Phúc/Nghiệp. Chưa kịp chín mà đã chết → mở ra trong Sổ Nhân Quả lúc kết kiếp và vẫn cộng (chuyển sang kiếp sau).
- Ví dụ: tha tên cướp (Chính khí +4 ngay) → 6–18 tháng sau, 50% hắn cướp làng khác giết người (Nghiệp +3, tin đồn tới tai), 50% hắn hoàn lương và sau này cứu bạn (tuyến Ân).

### 9.5 Ảnh hưởng tới kiếp sau

| Bậc cán cân lúc chết | Vô linh căn (điểm %) | Xuất thân | Khí vận | Thọ | Của cải ban đầu | Khác |
|---|---|---|---|---|---|---|
| +4 | −15 | khá giả ×2 | phẩm 4+ ×1,8; xấu ×0,3 | +10% | +50% | +1 thẻ đầu thai; kỳ ngộ +15% |
| +3 | −10 | khá giả ×1,6 | phẩm 4+ ×1,5; xấu ×0,5 | +6% | +30% | +1 thẻ đầu thai |
| +2 | −6 | khá giả ×1,3 | phẩm 4+ ×1,25; xấu ×0,7 | +3% | +15% | — |
| +1 | −3 | khá giả ×1,1 | xấu ×0,9 | 0 | +5% | — |
| 0 / 0* | 0 | như thường | như thường | 0 | 0 | Đan xen: 1 tuyến Ân + 1 tuyến Oán chắc chắn |
| −1 | +3 | khốn khó ×1,2 | xấu ×1,2 | −2% | −10% | — |
| −2 | +7 | khốn khó ×1,5 | xấu ×1,5; khí vận tà mạnh ×1,3 | −5% | −25% | 1 oan gia chắc chắn |
| −3 | +12 | khốn khó ×2 | xấu ×2; tà mạnh ×1,6 | −8% | −40% | Mang sẵn tâm ma 10; 2 oan gia |
| −4 | +20 | chỉ khốn khó và tàn tật | xấu ×3; tà mạnh ×2 | −12% | −60% | Tâm ma 20; sự kiện "Thiên khiển" năm 7 tuổi; 3 oan gia; nhưng **ma chủng** (Thiên Ma Hàng Thế, Huyết Ma, Vô Tình Sát Đạo, Tà Thần Nghịch Tử) ×2 — trời phạt mà cũng trao mầm ác |

"Khí vận xấu" = các khí vận có tác dụng giảm: Kẻ Ngốc, Yểu Mệnh, Mù Màu, Tay Chân Lóng Ngóng, Sợ Độ Cao, Ngũ Hành Khuyết Mộc, Vô Căn, Bệnh Tật Quấn Thân, Tâm Ma Xâm Thực, Thiên Sát Cô Tinh. "Khí vận tà mạnh" = Huyết Ma, Ma Tính Thâm Tàng, Quỷ Nhãn, Vô Tình Sát Đạo, Tà Thần Nghịch Tử, Thiên Ma Hàng Thế, Đạo Ma Chuyển Thế.

Xuất thân mới cần thêm để có "khốn khó" và "khá giả" thật (Phần 16.2).

### 9.6 Mang sang kiếp sau
- **Túc phúc** kiếp sau = 50% × (Phúc kiếp này + Túc phúc đang mang). Túc nghiệp tương tự. Nên ảnh hưởng tắt dần qua 2–3 kiếp.
- Bậc dùng cho bảng 9.5 tính từ Túc phúc − Túc nghiệp.
- Tuyến: mỗi tuyến chưa khép có xác suất theo sang (9.9).

### 9.7 Thiên kiếp công bằng (yêu cầu 8)

Bậc **Nghiệp tuyệt đối** (không trừ Phúc): 0–20 → 0 · 20–60 → 1 · 60–150 → 2 · 150–300 → 3 · từ 300 → 4. Bậc **Phúc tuyệt đối** chia y hệt.

| Bậc Nghiệp | Uy lực mỗi đạo | Số đạo | Loại kiếp | Thưởng khi vượt | Nghiệp được tiêu khi vượt |
|---|---|---|---|---|---|
| 0 | ×1,0 | như cũ | theo linh căn | như cũ | 0 |
| 1 | ×1,10 | như cũ | theo linh căn | ×1,25 | 15% |
| 2 | ×1,20 | +1 | **Nghiệp Hỏa** | ×1,5 + "Nghiệp hỏa tôi thể": khí huyết tối đa +3% vĩnh viễn | 25% |
| 3 | ×1,30 | +2 | Nghiệp Hỏa | ×1,75 + khí huyết tối đa +6%, thủ +3% | 35% |
| 4 | ×1,40 | +3, cộng 1 trận tâm ma cuối | Nghiệp Hỏa | ×2,0 + khí huyết tối đa +9%, thủ +5%, đạo tâm +2 | 50% |

"Thưởng" = phần thưởng hiện có khi vượt kiếp (phẩm chất cảnh giới, chỉ số cộng) nhân hệ số.

| Bậc Phúc | Công đức hộ thể |
|---|---|
| 0 | không |
| 1 | mỗi đạo bớt 5% sát thương |
| 2 | bớt 10% |
| 3 | bớt 15% |
| 4 | bớt 20% và đạo đầu tiên bị công đức chặn hẳn |

Phúc hộ thể **không** giảm thưởng. Người vừa nhiều phúc vừa nặng nghiệp nhận cả hai: kiếp dữ, có hộ thể, thưởng lớn.

Trước khi độ kiếp, bảng chuẩn bị nói bằng chữ: "Mây kiếp đen kịt, mùi lưu huỳnh nồng — kiếp này dữ hơn thường" (Nghiệp ≥ 2) · "Quanh người có ánh vàng mờ" (Phúc ≥ 1).

**Phàm nhân và vô linh căn không có thiên kiếp** nhưng có **Nhân kiếp**: mỗi năm, nếu bậc Nghiệp tuyệt đối ≥ 2, xác suất gặp tai ương phàm trần (bệnh dịch, binh đao, cháy nhà, bị vu oan, mất mùa riêng nhà mình) tăng thêm 8% mỗi bậc. Vượt qua một nhân kiếp (sống sót, không bỏ chạy) tiêu 10% Nghiệp.

### 9.8 Tiêu nghiệp và tích phúc

| Cách | Tác dụng | Giới hạn |
|---|---|---|
| Trả nợ một tuyến (bồi thường, xin lỗi, chịu đòn, hoàn thành di nguyện) | Khép tuyến; tiêu phần Nghiệp gắn với tuyến | — |
| Sám hối ở chùa (5 lượng bạc hoặc 2 linh thạch + 7 ngày) | Nghiệp −10% | 1 lần/năm |
| Siêu độ người mình đã giết (Phật pháp, hoặc mời sư: 20 lượng) | Nghiệp của đúng vụ đó −50% | mỗi vụ một lần |
| Vượt thiên kiếp / nhân kiếp | Theo bảng 9.7 | — |
| Chết dưới tay oan gia | Khép tuyến; Nghiệp −30% | — |
| Việc chuộc lỗi lớn (sự kiện riêng, vd dựng lại làng mình đã đốt) | Nghiệp −40 đến −80 | sự kiện một lần |
| Việc thiện | **Chỉ tăng Phúc, không xóa Nghiệp** | — |

### 9.9 Nhân Quả Tuyến

| Loại | Nghĩa | Mức | Hạn / tự khép | Sang kiếp sau | Hiện ra kiếp sau bằng |
|---|---|---|---|---|---|
| **Ân** | Người ấy mang ơn bạn | nhẹ / nặng / sinh tử | không hạn | 40% / 60% / 80% | "Người cũ báo ân" (đã có), giúp đỡ giữa trận, cho tiền, che giấu |
| **Nợ** | Bạn mang ơn người ấy | nhẹ / nặng / sinh tử | trả thì khép | 50% / 70% / 90% | Người ấy (hoặc hậu duệ) gặp nạn trước mặt bạn |
| **Oán** | Người ấy hận bạn | nhẹ / nặng | 10 năm không gặp thì nhẹ tự khép | 30% / 60% | "Kẻ thù cũ" (đã có), vu cáo, gài bẫy |
| **Huyết thù** | Bạn giết người thân/sư môn của ai đó | sinh tử | chỉ khép khi báo hoặc hóa giải | 90% | "Nợ kiếp trước" (đã có), truy sát (`nemesis`) |
| **Hứa** | Lời hứa chưa giữ | nhẹ / nặng | đúng hạn ghi trong lời hứa; trễ → chuyển thành Oán + Nghiệp | 50% (thành Nợ) | Người được hứa tìm tới đòi |
| **Duyên** | Đạo lữ, sư đồ, huynh đệ, bằng hữu | — | khi một bên chết thì thành "Duyên cũ" | 70% | "Người quen lạ mặt": nhìn mình như đã gặp; khởi đầu giao tình cao hơn |
| **Di nguyện** | Từ quán đỉnh, từ người chết nhờ | nặng | 10 năm | 100% (thành Nợ) | Hồn người chết hiện trong mộng |
| **Huyết mạch** | Con cháu kiếp trước còn sống | — | — | 100% khi dòng họ còn | "Hậu duệ kiếp trước", hoặc đầu thai vào chính dòng họ |

Dữ liệu một tuyến: mã, loại, mức, người (tên + nguồn danh tính: thiên kiêu, NPC, người thân), lý do (câu kể), kiếp tạo, thời điểm tạo, hạn, trạng thái (mở / khép / chuyển kiếp), lượng Phúc/Nghiệp đi kèm khi khép.

### 9.10 Sổ Nhân Quả (giao diện)
- Thêm thẻ **Nhân quả** vào Sổ tay. Trong kiếp: liệt kê việc đã biết bằng chữ, không số ("Năm 23 tuổi, cõng một bà lão xuống núi — chưa rõ quả"). Tuyến đang mở hiện kèm tên người.
- Lúc kết kiếp, màn Hết kiếp có trang **"Quả chín"**: mở mọi hạt chưa chín, kể hậu quả thật ("Con hổ bạn giết năm hai mươi ba — bầy hươu ở Thanh Lâm sống qua mùa đông năm ấy"), rồi nói bậc nhân quả mang sang kiếp sau.

---

## 10. Bảng hành vi → Đạo Hướng & Nhân Quả (dữ liệu nhập)

Cột "Quả chín" = có gieo hạt đến trễ không. Giá trị là điểm cộng vào Chính khí (CK), Tà khí (TK), Phúc, Nghiệp. Những việc làm thuê, buôn bán ngay thẳng, đánh yêu thú tự vệ không nằm ở đây vì **không tạo nhân quả** (đúng quy tắc của GUIDELINE: nhận tiền công hợp pháp không trừ nhân quả).

| Mã | Hành vi | CK | TK | Phúc | Nghiệp | Quả chín |
|---|---|---|---|---|---|---|
| `cuu_nguoi` | Cứu người đang gặp nạn | 6 | 0 | 8 | 0 | có: người được cứu có thể là kẻ ác (Nghiệp gián tiếp 0–3) hoặc thành tuyến Ân |
| `cuu_nguoi_hy_sinh` | Cứu người phải chịu thương nặng/mất của | 8 | 0 | 12 | 0 | có |
| `bo_thi` | Bố thí người nghèo | 2 | 0 | 2 | 0 | có: 20% kẻ lừa (Phúc thành 0) |
| `phat_chan` | Phát chẩn năm đói (từ 5 lượng) | 4 | 0 | 10 | 0 | — |
| `giet_cuop_dang_ac` | Giết kẻ cướp đang hành ác | 3 | 1 | 2 | 1 | — |
| `tha_ke_ac` | Tha kẻ ác đầu hàng | 4 | 0 | 0 | 0 | có: 50% Nghiệp +3 / 50% tuyến Ân |
| `giet_vo_toi` | Giết người vô tội | 0 | 12 | 0 | 15 | có: tuyến Huyết thù 60% |
| `diet_khau` | Giết người diệt khẩu | 0 | 15 | 0 | 18 | có: Huyết thù 70% |
| `giet_dau_hang` | Giết kẻ đã đầu hàng | 0 | 6 | 0 | 6 | — |
| `tra_tan` | Tra tấn | 0 | 6 | 0 | 5 | — |
| `tra_tan_cuu_nguoi` | Tra hỏi để cứu người khác | 0 | 4 | 4 | 2 | — |
| `giet_thu_vo_hai` | Giết yêu thú vô hại để lấy yêu đan | 0 | 1 | 0 | 2 | — |
| `giet_thu_cuu_sinh` | Giết thú đang hại sinh linh khác | 0 | 1 | 4 | 0 | có |
| `phong_sinh` | Phóng sinh, thả thú bị nhốt | 1 | 0 | 2 | 0 | có: 15% con thú hại người sau (Nghiệp +4) |
| `trom_ngheo` | Trộm của người nghèo | 0 | 5 | 0 | 6 | có: 30% gia đình đó chết đói (Nghiệp +8) |
| `trom_ac_ba` | Trộm của ác bá | 0 | 3 | 1 | 1 | — |
| `hiep_dao` | Trộm của ác bá chia cho người nghèo | 1 | 3 | 6 | 1 | — |
| `lua_loi` | Lừa gạt vì lợi | 0 | 3 | 0 | 2 | — |
| `lua_cuu` | Nói dối để cứu người | 0 | 2 | 3 | 0 | — |
| `giu_loi` | Giữ lời hứa khi khó | 4 | 0 | 2 | 0 | — |
| `that_hua` | Thất hứa | 0 | 3 | 0 | 2 | tuyến Hứa → Oán |
| `phan_su_mon` | Phản bội sư môn | 0 | 10 | 0 | 6 | tuyến Oán nặng với tông |
| `phan_ma_cuu` | Phản ma môn để cứu người | 6 | 2 | 6 | 0 | tuyến Oán với ma tông |
| `hieu_kinh` | Phụng dưỡng cha mẹ (mỗi năm) | 1 | 0 | 2 | 0 | — |
| `bo_roi_gia_dinh` | Bỏ rơi gia đình | 0 | 2 | 0 | 4 | có: người thân gặp nạn |
| `quan_thanh_liem` | Làm quan thanh liêm (mỗi năm) | 2 | 0 | 2 | 0 | — |
| `tham_o` | Tham ô một vụ | 0 | 3 | 0 | 3 | có: dân chết đói thì Nghiệp +5 |
| `an_oan` | Xử oan người vô tội | 0 | 2 | 0 | 8 | Huyết thù với gia đình |
| `ep_ta_dien` | Ép tá điền, cho vay nặng lãi (mỗi năm) | 0 | 2 | 0 | 3 | — |
| `hanh_hiep` | Hành hiệp trượng nghĩa | 3 | 0 | 3 | 0 | có |
| `dau_doc` | Đầu độc người | 0 | 5 | 0 | theo nạn nhân (vô tội 10, kẻ ác 2) | — |
| `giet_thien_kieu_chinh` | Giết thiên kiêu chính đạo | 0 | 8 | 0 | 8 | Huyết thù với tông |
| `giet_ma_dau` | Giết ma đầu | 6 | 0 | 4 | 2 | Oán với ma tông |
| `giet_doat_bao` | Giết người đoạt bảo | 0 | 8 | 0 | 10 | Huyết thù 60% |
| `diet_mon_ma` | Tham gia diệt môn ma tông | 10 | 3 | 5 | 8 | có: tạp dịch vô tội chết |
| `diet_mon_chinh` | Tham gia diệt môn chính tông | 0 | 12 | 0 | 15 | Huyết thù |
| `pha_phong_an` | Phá phong ấn thả yêu ma | 0 | 4 | 0 | 0 | có: yêu ma hại người Nghiệp +12 |
| `sieu_do` | Siêu độ vong hồn | 3 | 0 | 4 | 0 | — |
| `dao_mo` | Đào mộ lấy của | 0 | 2 | 0 | 2 | có: oán hồn theo |
| `an_tang` | An táng người chết bên đường | 2 | 0 | 2 | 0 | có: 10% hồn tặng vật |
| `huyet_te_nguoi` | Huyết tế người (mỗi mạng) | 0 | 1 | 0 | 2 | — |
| `luyen_hon_nguoi` | Luyện hồn người sống | 0 | 10 | 0 | 12 | — |
| `doat_can` | Đoạt linh căn | 0 | 25 | 0 | 40 | Huyết thù |
| `dung_ma_cong` | Dùng công pháp tà trong một trận | 0 | 1 | 0 | 0 | — |
| `cuu_dich` | Chữa một vùng dịch | 3 | 0 | 15 | 0 | — |
| `pha_de` | Phá đê cứu thành, nhấn chìm làng nhỏ | 0 | 3 | 15 | 8 | — |
| `ban_dong_doi` | Bỏ đồng đội bị thương giữa hiểm cảnh | 0 | 3 | 0 | 4 | có: người ấy sống sót thành Oán |
| `ket_lieu_dong_doi` | Kết liễu đồng đội để lấy đồ | 0 | 10 | 0 | 12 | Huyết thù |
| `bao_thu` | Báo thù kẻ đã hại mình | 0 | 2 | 0 | 2 | khép tuyến |
| `hoa_giai` | Tha thứ kẻ thù, hóa giải | 4 | 0 | 6 | 0 | khép tuyến; tâm ma −10 |
| `ban_nguoi` | Bán người làm nô | 0 | 8 | 0 | 10 | — |
| `nhan_nuoi` | Nhận nuôi trẻ mồ côi | 3 | 0 | 6 | 0 | tuyến Duyên |
| `sam_hoi` | Sám hối ở chùa | 1 | 0 | 0 | −10% | — |
| `nghich_thien` | Nghịch thiên cải mệnh (Thiên cơ) | 0 | 0 | 0 | 10 | — |

---

## 11. Ba mươi tình huống mơ hồ (lòng tốt có giá, cái ác có lý)

Mỗi tình huống là một sự kiện cần viết theo schema sự kiện. Kết quả thật được chọn ngẫu nhiên **lúc mở cảnh** (lưu vào cảnh) để không thể tải lại mà đổi.

| # | Tên | Bối cảnh | Lựa chọn → hậu quả (thấy ngay / quả chín sau) |
|---|---|---|---|
| 1 | Bà lão xuống núi | Đường núi, chiều tối, một bà lão xin cõng xuống | Cõng (CK+3): tới chân núi bà biến mất cùng 30% tiền trên người. 50% bà là đạo chích già nuôi cháu bệnh → 2 năm sau đứa cháu khỏe mạnh tìm tới cảm tạ (Phúc +5); 50% là kẻ trộm thật → không gì. Từ chối: nếu bà là người thật, tháng sau nghe tin bà ngã chết dưới khe (tâm ma +3) |
| 2 | Hổ và bầy hươu | Rừng mùa đông, hổ đang vồ bầy hươu | Giết hổ (TK+1, Phúc +4 khi quả chín: bầy hươu sống qua đông; nhưng 30% hổ là hổ mẹ — ba con hổ con chết đói, Nghiệp +2) · Để yên · Đuổi hổ đi (tốn sức, bị thương 40%) |
| 3 | Tên cướp xin tha | Sau khi thắng một tên cướp | Tha (CK+4): 50% hắn cướp làng khác (Nghiệp +3), 50% hoàn lương, sau cứu bạn (Ân) · Giết (`giet_dau_hang`) · Giao quan (CK+2; quan ăn tiền thả hắn 30%) |
| 4 | Đứa trẻ trộm bánh | Chợ, chủ quán bắt được đứa trẻ | Báo quan (CK+1; đứa trẻ bị đánh chết 25%, Nghiệp +6) · Trả tiền thay (Phúc +2; 40% thằng bé thành đạo chích nổi danh, sau báo ân) · Mặc kệ |
| 5 | Máu yêu thú con chữa dịch | Làng có dịch, thầy thuốc cần máu tim yêu thú con | Giúp giết (TK+2, Phúc +8 cứu làng; thú mẹ thành Oán, báo thù sau 1–3 năm) · Từ chối (làng mất 1/3 người) · Đi tìm thuốc khác (mất 30 ngày, 50% kịp) |
| 6 | Thôn nhiễm ma | Tông chính lệnh diệt một thôn "bị ma nhiễm" | Làm (CK+5, Nghiệp +20: thôn chỉ bị dịch) · Từ chối (cống hiến −, có thể bị trục xuất; Phúc +5) · Điều tra trước (mất 10 ngày, phát hiện thuốc chữa; tông giận) |
| 7 | Ma tu chữa bệnh | Một ma tu dùng máu chính mình chữa cho dân nghèo | Giết lấy thưởng (CK+5; dân chết bệnh sau, Nghiệp +8) · Để yên · Học với hắn (TK+3, nhận Huyết thuật) |
| 8 | Bức thư của người hấp hối | Người hấp hối nhờ đưa thư cho con | Đưa (CK+4, Ân); con hắn là ma đầu, dùng tin trong thư báo thù một tông chính (Nghiệp +4) · Đốt thư (Hứa → Oán từ hồn người chết, tâm ma +5) · Đọc trộm rồi quyết |
| 9 | Kho lương địa chủ | Năm hạn, dân chết đói, địa chủ giữ đầy kho | Phá kho phát dân (TK+4, Phúc +10; quan truy nã) · Thuyết phục (Nho thuật / đạo tâm cao) · Mua lương phát (tốn 30 lượng, Phúc +10) · Không làm gì |
| 10 | Yêu hồ và thư sinh | Một hồ yêu sống như vợ thư sinh nghèo, không hại ai | Diệt yêu (CK+4, Nghiệp +6, thư sinh thành Oán) · Để yên (CK 0; tông chính trách) · Giúp che giấu (TK+2, Phúc +3, Ân) |
| 11 | Tù binh ma tông | Đồng môn bị bắt, có một tù binh biết chỗ | Tra hỏi (`tra_tan_cuu_nguoi`) · Đổi tù binh (Phúc +2; tù binh sau giết người, 40%) · Thả để làm tin |
| 12 | Kẻ chết đuối | Cứu một người dưới sông | Hắn là sát thủ được thuê giết bạn; được cứu, hắn bỏ hợp đồng (Ân sinh tử) hoặc (30%) vẫn ra tay lúc bạn ngủ |
| 13 | Cổ mộ | Cổ mộ hở nắp sau lũ | Lấy của (`dao_mo`) · An táng lại (`an_tang`; hồn tặng một bí tịch 10%) · Báo quan |
| 14 | Hối lộ cứu dân | Quan viên: một nhà dân phạm tội nhỏ, mang tiền lót tay | Nhận và tha (TK+2, Phúc +3) · Xử đúng luật (CK+2; nhà đó tan nát, Nghiệp +2) · Từ chối tiền nhưng xử nhẹ (CK+2, Phúc +2, đồng liêu ghét) |
| 15 | Lang băm | Một lang băm bán thuốc giả làm chết trẻ con | Giết hắn (TK+3, Phúc +3; gia đình hắn Oán) · Tố quan (quan nhận tiền 50%) · Vạch mặt giữa chợ (CK+3; hắn bỏ trốn, sang làng khác tiếp) |
| 16 | Đứa trẻ "yêu nghiệt" | Dân làng định thiêu một đứa trẻ có linh căn biến dị | Cứu (CK+5, Phúc +8; cả làng Oán; đứa trẻ thành tuyến Duyên, có thể thành đồ đệ) · Mặc kệ (tâm ma +8) · Mua đứa trẻ (5 lượng; Phúc +6) |
| 17 | Cá phóng sinh | Hội chùa, mua cá thả hồ | Thả (Phúc +1); 30% là cá dữ xâm lấn, hại cả hồ (Nghiệp +2), dân chài mất kế sinh nhai |
| 18 | Tán tu hấp hối | Cho một tán tu đan cứu mạng | Hắn hồi phục: 50% thành bạn (Ân), 30% vô ơn bỏ đi, 20% cướp bạn ngay đêm đó |
| 19 | Thiên kiêu bại trận | Thắng một thiên kiêu trong luận võ | Giết (TK+6, Nghiệp +6; hết hậu hoạn từ hắn, nhưng Huyết thù với tông) · Tha (CK+3; 50% hắn thành đối thủ đeo bám, 50% tri kỷ) |
| 20 | Người mẹ thuê giết | Một bà mẹ mang tiền xin giết kẻ hại con | Nhận (TK+4); 60% kẻ đó có tội thật (Phúc +2), 40% oan (Nghiệp +10) · Điều tra trước (mất 7 ngày, biết thật) · Từ chối |
| 21 | Phá đê | Lũ sắp nhấn chìm thành; phá đê sẽ ngập một làng nhỏ | Phá (`pha_de`) · Không phá (thành ngập, Phúc 0, tâm ma +5) · Báo làng chạy rồi phá (mất 1 ngày, 50% kịp; kịp thì chỉ Phúc +15) |
| 22 | Kẻ trộm linh thảo cứu mẹ | Đệ tử ngoại môn trộm linh thảo của tông | Tố giác (CK+2; mẹ hắn chết, Nghiệp +3) · Che giấu (TK+2, Phúc +4) · Bỏ tiền mua thay (Phúc +4) |
| 23 | Linh thú con | Thương nhân trả giá cao mua linh thú con bạn bắt được | Bán (tiền; 50% thương nhân buôn cho ma tông lấy máu, Nghiệp +3) · Không bán · Thả về rừng (Phúc +2) |
| 24 | Ăn mày chết cóng | Đêm đông, một ăn mày run rẩy | Cho áo bông của mình (Phúc +3; bản thân 50% nhiễm lạnh) · Cho tiền thuê chỗ ngủ (Phúc +2) · Đi qua (sáng ra thấy xác, tâm ma +3) |
| 25 | Đóng cổng thành | Quan viên, dịch bên ngoài thành | Đóng (cứu thành: Phúc +8, Nghiệp +6 với người kẹt ngoài) · Mở (dịch vào thành 50%) · Lập trại cách ly (tốn 50 lượng, Phúc +12) |
| 26 | Đồng đội bị thương | Giữa bí cảnh, đồng đội gãy chân | Mang theo (chậm, nguy hiểm +30%) · Bỏ lại (`ban_dong_doi`) · Kết liễu lấy túi (`ket_lieu_dong_doi`) |
| 27 | Oan gia hóa lão nhân | Kẻ giết bạn kiếp trước giờ là ông lão hiền nuôi cháu | Báo thù (khép Huyết thù, TK+4, Nghiệp +6 với đứa cháu) · Tha (`hoa_giai`) · Lấy đi thứ hắn quý nhất mà không giết (TK+2) |
| 28 | Lệnh tàn sát thành hàng | Binh lính: tướng lệnh giết sạch thành đã hàng | Tuân (TK+6, Nghiệp +15) · Kháng lệnh (bị chém 40%, CK+8, Phúc +6) · Lén thả một nhóm (Phúc +6, 30% bị phát hiện) |
| 29 | Đổi mệnh | Thiên cơ sư: một người cha xin đổi mệnh yểu của con sang mình | Làm (−10 năm thọ của người cha, đứa trẻ sống; Nghiệp +10 vì nghịch thiên, Phúc +10) · Từ chối · Nói dối là đã đổi (TK+3) |
| 30 | Giếng nước làng bên | Hạn hán: hai làng tranh một giếng | Giúp làng mình chiếm (Phúc +3 làng mình, Nghiệp +5) · Chia đều (CK+3; cả hai làng không đủ) · Đào giếng mới (30 ngày, Phúc +10) |

---

## 12. Tuế biến — khí vận, thể chất, mệnh cách đổi theo năm (yêu cầu 10)

### 12.1 Luật chung
- Chạy **mỗi lần nhân vật thêm một tuổi** (mốc mới "qua năm" trong dòng thời gian; dùng `HY` = 8.640 giờ).
- Ba kiểu:
  - **Tích lũy** — cộng một chút vĩnh viễn mỗi năm, có trần.
  - **Hao mòn** — trừ một chút mỗi năm, có sàn.
  - **Biến cố** — mỗi năm có xác suất xảy ra một việc (tốt, xấu hoặc vừa tốt vừa xấu), tác dụng ngay.
- Trần chung cho tổng mọi tuế biến của một chỉ số: khí huyết +20% · thủ +15% · công +15% · công phép +15% · linh lực +15% · ngộ tính +6 · đạo tâm +6 · thần thức +6 · thân pháp +6 · chí mạng +6 · thọ +15 năm. Hao mòn: sàn −10% (khí huyết), −6 (chỉ số điểm).
- Qua 70% thọ nguyên: **ngừng tích lũy** (vào tuổi già, 12.6). Biến cố vẫn chạy.
- Vô linh căn: tuế biến dính tới linh lực, tu vi bị bỏ qua (khí vận "ẩn mệnh"); tuế biến dính tới tu vi đổi thành kinh nghiệm phàm đạo / võ đạo cùng tỉ lệ.
- Hai nguồn cùng loại (vd mệnh cách "Hỏa linh thể" và thể chất "Hỏa Linh Chi Thể") **không cộng dồn**: lấy cái mạnh hơn, xác suất biến cố +10%.
- Nhật ký: mỗi năm một dòng gộp ("Năm hai mươi ba tuổi: thân thể rắn thêm; tính khí nóng nảy, đạo tâm chao đảo, nhưng khí huyết sôi lên."). Chỉ biến cố mới hiện thông báo nhỏ.

### 12.2 Thang chữ cho tooltip (không số)

| Loại | Chữ | Nghĩa nội bộ |
|---|---|---|
| Lượng tích lũy / hao mòn | một chút | đến 0,2%/năm, hoặc +1 điểm mỗi từ 5 năm |
| | một ít | 0,3–0,4%/năm, hoặc +1 mỗi 3–4 năm |
| | khá | 0,5–0,6%/năm, hoặc +1 mỗi 2 năm |
| | nhiều | từ 0,8%/năm, hoặc +1 mỗi năm |
| Tần suất biến cố | hiếm khi | đến 10%/năm |
| | thỉnh thoảng | 11–20% |
| | thường | 21–30% |
| | gần như năm nào | từ 31% |
| Lượng hồi ngay | một ít | đến 15% |
| | một phần | 16–25% |
| | phần lớn | từ 26% |
| Tâm ma | lung lay nhẹ / chao đảo / dậy sóng | +1..3 / +4..6 / +7 trở lên |
| | lắng bớt / lặng hẳn | −1..3 / −4 trở xuống |

Mẫu tooltip:
> **Hỏa Linh Chi Thể** · Hiếm
> Công phép tăng nhẹ; Chí mạng tăng nhẹ.
> *Theo năm tháng:* tính khí nóng nảy — thường có năm đạo tâm chao đảo, nhưng khí huyết cũng sôi trào, hồi ngay một phần khí huyết. Hỏa khí trong người dày thêm một chút.

### 12.3 Ba mươi ba thể chất

| Thể chất | Kiểu | Theo năm (nội bộ) | Dòng "Theo năm tháng" |
|---|---|---|---|
| Hỗn Độn Đạo Thể | Tích lũy | Mọi chỉ số chính +0,3%/năm (trần 9%) | Mọi mặt lớn mạnh thêm một ít. |
| Hoang Cổ Thánh Thể | Tích lũy + biến cố | Khí huyết +0,6%, thủ +0,4%/năm; 10%: hồi đầy khí huyết, khỏi thương thế bậc 1 | Khí huyết và nhục thân dày thêm khá; hiếm khi huyết khí vàng ròng sôi lên chữa lành vết thương nhẹ. |
| Tiên Thiên Đạo Thai | Tích lũy | Ngộ tính +1 mỗi 3 năm, đạo tâm +1 mỗi 4 năm | Đạo thai tự ngộ: ngộ tính và đạo tâm lớn thêm một ít. |
| Vạn Cổ Ma Thể | Tích lũy + biến cố | Công +0,5%/năm (trần 15%); 30%: tâm ma +4..8, tu vi +3% tầng | Ma thể mạnh thêm khá; thường có năm ma niệm dậy sóng, đẩy tu vi tiến thêm. |
| Cửu Khiếu Linh Lung Thể | Tích lũy + biến cố | Thần thức +1 mỗi 2 năm; 15%: tu vi +5% tầng (phàm: kinh nghiệm nghề +10%) | Thần thức sáng thêm khá; thỉnh thoảng một khiếu bừng mở. |
| Thương Thiên Bá Thể | Tích lũy | Công vật lý +0,4%, khí huyết +0,4%/năm | Sức và khí huyết tăng thêm một ít. |
| Thái Dương Thần Thể | Tích lũy + biến cố | Sát thương Hỏa +0,3%/năm; 20%: tâm ma +3, hồi 20% khí huyết | Dương khí thịnh thêm; thỉnh thoảng nóng ruột, khí huyết hồi lại một phần. |
| Thái Âm Ngọc Thể | Tích lũy + biến cố | Linh lực +0,5%/năm; 20% (mùa đông): tu vi +2% tầng | Linh lực dồi dào thêm khá; đêm đông thỉnh thoảng âm khí ngưng tụ giúp tu vi. |
| Thiên Yêu Hoàng Thể | Tích lũy + biến cố | Khí huyết +0,5%/năm; 15%: tâm ma +3, thân pháp +1 (trần +4) | Khí huyết dày thêm khá; thỉnh thoảng yêu tính trỗi dậy, thân thủ nhanh thêm. |
| Lôi Đình Chiến Thể | Biến cố | 25% (mùa hạ): hồi 25% khí huyết, sát thương Lôi +1% (trần 10%); 5%: thương thế bậc 1 | Thường có năm lôi khí tích tụ, hồi phần lớn khí huyết; hiếm khi lôi phản tự làm mình bị thương. |
| Hư Không Chi Thể | Tích lũy + hao mòn | Né +0,3/năm (trần +5); khí huyết −0,2%/năm (sàn −6%) | Thân pháp hư ảo thêm một ít, nhưng thân thể mỏng đi một chút. |
| Dược Linh Thánh Thể | Tích lũy + biến cố | Hiệu quả đan hồi phục +1%/năm (trần 15%); 20%: khỏi một bậc thương thế, hồi 30% khí huyết | Dược khí tự sinh: thỉnh thoảng vết thương lành nhanh, hồi phần lớn khí huyết. |
| Ngũ Hành Linh Thể | Tích lũy | Tu vi nhận +0,3%/năm (trần 6%) | Ngũ hành điều hòa, tu luyện nhanh thêm một ít. |
| Vô Cấu Kiếm Thể | Tích lũy + biến cố | Công vật lý khi cầm kiếm +0,3%/năm; 10%: chí mạng +0,5 (trần +5) | Kiếm khí bén thêm; hiếm khi kiếm minh trong đêm. |
| Huyết Sát Ma Thể | Biến cố | 30%: tâm ma +4; nếu năm đó có giết người/yêu: hồi 30% khí huyết, công +0,5% (trần 10%); không giết: khí huyết −1% tạm thời đến khi giết | Thường khát máu: đạo tâm chao đảo; có máu thì mạnh lên, không có thì héo hắt. |
| Băng Cơ Ngọc Cốt | Tích lũy + biến cố | Thủ +0,3%/năm; 20% (mùa đông): tâm ma −5 | Cốt cứng thêm một ít; đông về thỉnh thoảng lòng lặng hẳn. |
| Tật Phong Linh Thể | Tích lũy | Thân pháp +1 mỗi 4 năm (trần +5) | Nhanh thêm một ít. |
| Cửu Dương Chi Thể | Tích lũy + biến cố | Sát thương Hỏa +0,3%/năm; 25%: tâm ma +3, hồi 20% khí huyết | Dương hỏa thịnh: thường nóng nảy, khí huyết hồi lại một phần. |
| Huyền Âm Chi Thể | Biến cố | 20%: tâm ma −3, hồi đầy linh lực | Thỉnh thoảng âm khí làm lòng lắng bớt, linh lực đầy lại. |
| Kim Cương Bất Hoại | Tích lũy | Thủ +0,4%/năm (trần 12%) | Thân thể cứng thêm một ít. |
| Mộc Linh Chi Thể | Tích lũy + biến cố | Khí huyết +0,3%/năm; 20% (mùa xuân): khỏi thương thế bậc 1 | Sinh khí dày thêm; xuân về thỉnh thoảng vết thương nhẹ tự lành. |
| Ám Sát Thể | Tích lũy + biến cố | Chí mạng +0,2/năm (trần +4); 10%: tâm ma +2 | Sát ý sắc thêm một chút; hiếm khi lòng lạnh đi. |
| Cuồng Chiến Thể | Biến cố | 30%: tâm ma +2..4, hồi 15% khí huyết, công +0,3% (trần 6%) | Máu nóng: thường có năm nóng nảy, hồi lại một ít khí huyết và mạnh thêm. |
| Thổ Linh Chi Thể | Tích lũy | Thủ +0,3%, khí huyết +0,2%/năm | Vững thêm một ít. |
| Thủy Linh Chi Thể | Tích lũy + biến cố | Linh lực +0,3%/năm; 15%: tâm ma −3 | Linh lực thêm một ít; thỉnh thoảng lòng như nước, lắng bớt. |
| Hỏa Linh Chi Thể | Biến cố + tích lũy | **30%: tâm ma +3..6 (ngẫu nhiên), đồng thời hồi ngay 15–25% khí huyết (đầy thì thôi)**; sát thương Hỏa +0,2%/năm (trần 5%) | Tính khí nóng nảy: thường có năm đạo tâm chao đảo, nhưng khí huyết sôi trào, hồi ngay một phần khí huyết. Hỏa khí dày thêm một chút. |
| Kim Linh Chi Thể | Tích lũy | Công vật lý +0,2%, thủ +0,1%/năm | Sắc và cứng thêm một chút. |
| Man Hoang Lực Thể | Tích lũy | **Khí huyết +0,5%/năm, thủ +0,3%/năm** (trần 25 năm) | **Mỗi năm khí huyết và sức chống chịu tăng thêm một chút.** |
| Thông Tuệ Thể | Tích lũy | Ngộ tính +1 mỗi 5 năm (trần +4) | Hiểu chuyện nhanh thêm một chút. |
| Kiên Nhan Thể (nên sửa tên thành "Kiên Nhẫn Thể") | Tích lũy + biến cố | Đạo tâm +1 mỗi 5 năm; 10%: tâm ma −3 | Bền lòng thêm một chút; hiếm khi lòng lắng bớt. |
| Linh Cảm Thể | Biến cố | 20%: lần gặp lối rẽ kế tiếp được báo trước một nhánh (như nâng cấp Thiên nhãn, một lần) | Thỉnh thoảng có linh cảm trước điều sắp tới. |
| Trường Thọ Thể | Tích lũy | Thọ +0,2 năm mỗi năm (trần +10); tuổi già đến muộn 10% | Già chậm hơn người. |
| Phàm Thể | Không | — | Thân thể bình thường; năm tháng không cho thêm gì. |

### 12.4 Bảy mươi tư khí vận tiên thiên

| Khí vận | Kiểu | Theo năm (nội bộ) | Dòng "Theo năm tháng" |
|---|---|---|---|
| Thân Thể Khỏe Mạnh | Tích lũy | Khí huyết +0,2%/năm (trần 4%) | Ít ốm vặt; khí huyết nhích thêm một chút. |
| Tinh Thần Minh Mẫn | Tích lũy | Thần thức +1 mỗi 5 năm (trần +3) | Đầu óc sáng thêm một chút. |
| Khí Lực Dồi Dào | Tích lũy | Thân pháp +1 mỗi 6 năm (trần +3) | Sức bền thêm một chút. |
| Gia Cảnh Khá Giả | Biến cố | Đến 30 tuổi, khi nhà còn người: mỗi năm nhận 5–10 lượng bạc (tu sĩ: 2–4 linh thạch) | Nhà thỉnh thoảng gửi tiền (đến khi thành người lớn hẳn). |
| Kẻ Ngốc | Tích lũy + biến cố | Thủ +0,2%/năm; 10%: nhặt được vật nhỏ | Khỏe thêm một chút; hiếm khi gặp may vặt kiểu người ngốc có phúc ngốc. |
| Yểu Mệnh | Hao mòn + biến cố | 10%: khí huyết tối đa −1% (sàn −8%); từ 30 tuổi 5%: bệnh nặng (thương thế bậc 2) | Thân thể yếu: thỉnh thoảng ốm, khí huyết hao dần; lớn tuổi hiếm khi phát bệnh nặng. |
| Mù Màu | Không | — | Không đổi theo năm. |
| Tay Chân Lóng Ngóng | Biến cố | 10%: tự làm mình bị thương nhẹ (khí huyết −5%) | Hiếm khi vụng về tự làm mình đau. |
| Sợ Độ Cao | Không | — | Không đổi theo năm. |
| Ngũ Hành Khuyết Mộc | Không | — | Không đổi theo năm. |
| Vô Căn (khôi phục; gắn với vô linh căn) | Biến cố | 10%: nếu đang cố tu (có tâm pháp) tâm ma +2 (bất cam); nếu đã sống bằng phàm đạo từ 3 năm: đạo tâm +1 (an phận, trần +3) | Hiếm khi lòng không cam; người đã chấp nhận phận mình thì lòng vững thêm. |
| Thiện Lương Chi Nhân | Biến cố | 15%: gặp một việc nhỏ cần giúp (sự kiện); tâm ma −2 | Thỉnh thoảng gặp người cần giúp; lòng lắng bớt. |
| Tiểu Nhân Bỉ Ổi | Biến cố | 15%: tiền +3% nhờ tính toán vặt, Nghiệp +1 | Thỉnh thoảng kiếm thêm chút lợi nhỏ, không sạch sẽ gì. |
| Sát Phạt Quả Quyết | Biến cố | 20%: nếu năm đó có giết: công +0,3% (trần 6%), tâm ma +2 | Thỉnh thoảng sát tâm nặng thêm, tay cũng nặng thêm. |
| Linh Khí Thân Hòa | Tích lũy | Linh lực +0,3%/năm (trần 9%) | Linh lực thêm một ít. |
| Thiên Tư Thông Minh | Tích lũy | Ngộ tính +1 mỗi 6 năm (trần +3) | Thông minh thêm một chút. |
| Da Dày Hơn Sắt | Tích lũy | Thủ +0,2%/năm (trần 6%) | Da thịt dày thêm một chút. |
| Bệnh Tật Quấn Thân | Hao mòn + tích lũy | Khí huyết −0,3%/năm (sàn −9%); thần thức +1 mỗi 4 năm (trần +5) | Thân thể yếu đi một ít, thần hồn lại sáng thêm. |
| Duyên Với Nước | Không | — (thưởng nghề Ngư dân ở Phần 7) | Không đổi theo năm. |
| Thích Lửa | Không | — (thưởng nghề Thợ rèn, Đan sư) | Không đổi theo năm. |
| Yêu Cây Cỏ | Không | — (thưởng nghề Nông dân, Lang trung) | Không đổi theo năm. |
| Cứng Đầu | Biến cố | 10%: 50% tâm ma +2, 50% đạo tâm +1 (trần +3) | Hiếm khi cố chấp: lúc thành vững, lúc thành vướng. |
| Sắc Bén | Không | — | Không đổi theo năm. |
| Thư Sinh | Tích lũy | Thần thức +1 mỗi 5 năm (trần +3); kinh nghiệm Văn nhân +10% | Chữ nghĩa thấm thêm một chút. |
| Hành Hiệp Trượng Nghĩa | Biến cố | 20%: gặp chuyện bất bình (sự kiện hành hiệp) | Thỉnh thoảng gặp chuyện bất bình chẳng tha. |
| Tư Lợi Vi Bản | Biến cố | 15%: tiền +3%, Tà khí +1 | Thỉnh thoảng kiếm thêm chút lợi. |
| Thiên Lý Nhãn | Tích lũy | Thần thức +1 mỗi 6 năm (trần +3) | Mắt tinh thêm một chút. |
| Phong Hành Giả | Tích lũy | Thân pháp +1 mỗi 6 năm (trần +3) | Chân nhẹ thêm một chút. |
| Đại Khí Vận | Biến cố | 20%: nhặt 3–8 linh thạch (phàm: 2–5 lượng) hoặc tránh một nhân kiếp/tai ương trong năm | Thỉnh thoảng gặp may hoặc thoát nạn. |
| Vân Du Thiên Hạ | Biến cố | Năm đó qua ít nhất 2 đại khu vực: thần thức +1 (trần +4); ở yên một chỗ cả năm: tâm ma +2 | Đi nhiều thì sáng mắt; ngồi yên thì bứt rứt. |
| Cửu Dương | Biến cố | 20%: tâm ma +2, hồi 15% khí huyết | Thỉnh thoảng nóng ruột, khí huyết hồi lại một ít. |
| Nhược Thủy | Không | — | Không đổi theo năm. |
| Ất Mộc | Không | — | Không đổi theo năm. |
| Canh Kim | Không | — | Không đổi theo năm. |
| Hậu Thổ | Không | — | Không đổi theo năm. |
| Võ Sĩ | Tích lũy | Công vật lý +0,2%/năm (trần 5%); kinh nghiệm võ đạo +10% | Gân cốt rắn thêm một chút. |
| Kiếm Phách | Biến cố | 10%: chí mạng +0,5 (trần +3) | Hiếm khi ngộ ra một đường kiếm. |
| Dược Đồng | Biến cố | 15%: biết thêm một phương thuốc (công thức đan bậc thấp nhất chưa có) | Thỉnh thoảng nhớ ra một vị thuốc. |
| Mị Cốt | Biến cố | 15%: 50% có người tặng quà (1–3 lượng / 1 linh thạch), 50% rắc rối tình duyên (tâm ma +2) | Thỉnh thoảng được người để ý — lúc là quà, lúc là phiền. |
| Tâm Như Chỉ Thủy | Tích lũy | Tâm ma −3 mỗi năm | Lòng lắng bớt theo năm tháng. |
| Tâm Ma Xâm Thực | Hao mòn + tích lũy | Tâm ma +3..6 mỗi năm; thần thức +1 mỗi 4 năm (trần +5) | Mỗi năm tâm ma chao đảo thêm, nhưng tinh thần cũng mạnh lên. |
| Đại Trí Nhược Ngu | Biến cố | 15%: tu vi +5% tầng (phàm: kinh nghiệm nghề +10%) | Thỉnh thoảng đốn ngộ. |
| Cuồng Vọng Tự Đại | Biến cố | 20%: 50% bị khiêu chiến (sự kiện), 50% tâm ma +2 | Thỉnh thoảng kiêu ngạo chuốc họa. |
| Đạo Ma Chuyển Thế | Biến cố + tích lũy | 20%: +2 vào dòng (Chính/Tà) đang yếu hơn; công +0,2%/năm | Đạo và ma giằng co, thỉnh thoảng kéo lòng về giữa; sức mạnh tăng một chút. |
| Hỗn Nguyên Đạo | Không | — | Không đổi theo năm. |
| Chính Khí Lẫm Liệt | Tích lũy | Tâm ma −2, Chính khí +1 mỗi năm | Chính khí đầy thêm; lòng lắng bớt. |
| Ma Tính Thâm Tàng | Tích lũy + biến cố | Tà khí +1/năm (ẩn, không hiện thông báo); 10%: tâm ma +3 | Ma tính lặng lẽ lớn lên; hiếm khi lộ ra. |
| Quỷ Nhãn | Biến cố | 15%: thấy âm hồn (sự kiện siêu độ hoặc thu hồn), tâm ma +1 | Thỉnh thoảng thấy thứ người khác không thấy. |
| Phật Tử | Tích lũy | Tâm ma −3, Phúc +1 mỗi năm | Lòng lắng bớt; phúc dày thêm một chút. |
| Huyết Ma | Biến cố | 25%: tâm ma +3; nếu năm đó có giết: hồi 20% khí huyết | Thường khát máu; có máu thì hồi lại. |
| Diệt Ma Chi Tâm | Biến cố | 20%: năm đó không diệt ma tu/yêu ma nào thì tâm ma +3; có thì công +0,3% (trần 6%) | Chấp niệm diệt ma: không làm thì day dứt, làm thì mạnh thêm. |
| Nhân Quả Đạo | Đặc biệt | Mỗi năm: thấy chính xác bậc Nhân Quả và báo trước một "quả chưa chín" | Năm tháng giúp nhìn rõ nhân quả của chính mình. |
| Sơn Hà Xã Tắc | Tích lũy | Khí huyết +0,4%, thủ +0,3%/năm | Bền như đất thêm một ít. |
| Kiếm Khí Trường Giang | Tích lũy | Công và công phép +0,2%/năm (trần 6%) | Kiếm khí dài thêm một chút. |
| Thương Long Ất Mộc | Biến cố + tích lũy | 25%: khỏi thương thế bậc 1, hồi 30% khí huyết; thọ +0,2 năm/năm (trần +8) | Thường có năm sinh cơ trào dâng, hồi phần lớn khí huyết. |
| Chu Tước Phần Thiên | Biến cố | 25%: tâm ma +3, hồi 25% linh lực và 15% khí huyết | Thường nóng nảy, nhưng lửa trong người hồi lại một phần. |
| Địa Tâm Hỏa Liên | Tích lũy + biến cố | Thủ +0,3%/năm; 15%: khỏi thương thế bậc 1 | Vững thêm một ít; thỉnh thoảng hỏa liên nở chữa vết thương nhẹ. |
| Tuyết Vực Băng Tâm | Tích lũy | Tâm ma −3 mỗi năm | Lòng lạnh và lặng thêm. |
| Phượng Hoàng Niết Bàn | Đặc biệt | Mỗi 12 năm tích một "niết bàn" (tối đa 1): chết trong trận khi có niết bàn → sống lại 30% khí huyết, tiêu niết bàn | Mười mấy năm mới tích được một lần tái sinh từ tro. |
| Lôi Đình Bá | Biến cố | 20% (mùa hạ): hồi 20% khí huyết, sát thương Lôi +0,5% (trần 8%) | Thỉnh thoảng lôi khí tích tụ, hồi lại một phần. |
| Băng Tâm Ngọc Cốt | Tích lũy | Thủ +0,2%/năm, tâm ma −1/năm | Cốt cứng thêm; lòng lắng bớt. |
| Huyễn Ảnh Phong Thân | Tích lũy | Né +0,2/năm (trần +5) | Thân ảnh khó nắm thêm một chút. |
| Băng Phách | Tích lũy | Tâm ma −2/năm, linh lực +0,2%/năm | Lòng lạnh lặng; linh lực thêm một chút. |
| Phong Thần | Tích lũy | Thân pháp +1 mỗi 5 năm (trần +4) | Nhanh thêm một chút. |
| Thiên Sát Cô Tinh | Biến cố + tích lũy | 20%: một người thân/bằng hữu/linh thú gặp nạn (bị thương, mất, hoặc rời đi); không còn ai thì tâm ma +3; công +0,3%/năm (trần 9%) | Số khắc thân: thỉnh thoảng người bên cạnh gặp nạn. Sức mạnh lại tăng thêm một ít. |
| Hạo Nhiên Chính Khí | Tích lũy | Chính khí +2, tâm ma −3 mỗi năm | Chính khí đầy thêm; lòng lắng bớt. |
| Vô Tình Sát Đạo | Hao mòn + tích lũy | Mọi giao tình −1 bậc nhỏ mỗi năm; công và chí mạng +0,3%/năm (trần 9%) | Tình cảm phai dần; sát đạo sắc thêm. |
| Tà Thần Nghịch Tử | Biến cố | 25%: Tà khí +2, tu vi +3% tầng, tâm ma +3 | Thường nghịch: tu vi tiến, lòng loạn. |
| Thiên Mệnh Chi Tử | Biến cố | 20%: bảo đảm một kỳ ngộ nhỏ trong năm | Thỉnh thoảng trời đưa cơ duyên tới. |
| Ngũ Hành Hợp Nhất | Tích lũy | Tu vi nhận +0,3%/năm (trần 6%) | Tu luyện nhanh thêm một ít. |
| Lôi Thần Giáng Thế | Biến cố | 25% (mùa hạ): hồi 30% khí huyết, sát thương Lôi +0,8% (trần 12%) | Thường có năm lôi khí cuồn cuộn, hồi phần lớn khí huyết. |
| Vận Khí Nghịch Thiên | Biến cố | 35%: nhặt một bảo vật ngẫu nhiên theo tầng hoặc thoát một tai họa | Gần như năm nào cũng gặp may. |
| Người Xuyên Việt | Biến cố | 15%: một ý tưởng dị giới — kinh nghiệm một phàm đạo đang theo +20%, hoặc giảm 10% nguyên liệu luyện chế trong năm | Thỉnh thoảng nhớ ra những điều thế giới này chưa ai biết. |
| Thiên Ma Hàng Thế | Biến cố | 25%: tâm ma +4, công phép +0,4% (trần 10%), Tà khí +2 | Thường có năm ma chủ thức tỉnh trong người. |

### 12.5 Mười tám mệnh cách

| Mệnh cách | Kiểu | Theo năm (nội bộ) | Dòng "Theo năm tháng" |
|---|---|---|---|
| Kiếm tâm | Tích lũy | Sát thương Kim +0,3%/năm (trần 6%) | Kiếm tâm sáng thêm một ít. |
| Thiên sinh thần lực | Tích lũy | Công +0,3%/năm (trần 6%) | Sức mạnh thêm một ít. |
| Mệnh cứng | Tích lũy + bị động | Khí huyết +0,2%/năm; tai nạn, nhân kiếp trong năm nhẹ đi một bậc thương thế | Mệnh cứng: tai họa thường nhẹ hơn với người khác. |
| Tâm như chỉ thủy | Tích lũy | Tâm ma −2/năm | Lòng lắng bớt theo năm. |
| Linh nhãn | Không | — | Không đổi theo năm. |
| Ba tấc lưỡi | Biến cố | 15%: giao tình với một người quen tăng một bậc nhỏ | Thỉnh thoảng nói khéo được lòng người. |
| Huyết mạch yêu tộc | Biến cố | 15% (đêm trăng tròn): tâm ma +2, khí huyết +0,3% (trần 6%) | Thỉnh thoảng yêu huyết sôi trong đêm trăng; thân thể mạnh thêm. |
| Thiên đố anh tài | Tích lũy + biến cố | Ngộ tính +1 mỗi 5 năm (trần +3); 10%: tai ương nhỏ (thương thế bậc 1) | Thông minh thêm; hiếm khi trời ghen. |
| Phúc tinh cao chiếu | Biến cố | 25%: tránh một sự kiện xấu hoặc nhặt tiền nhỏ | Thường gặp may. |
| Hỏa linh thể | Biến cố | Như Hỏa Linh Chi Thể (không cộng dồn) | Như Hỏa Linh Chi Thể. |
| Băng cơ ngọc cốt | Tích lũy + biến cố | Thủ +0,2%/năm; 20% (mùa đông): tâm ma −3 | Cốt cứng thêm; đông về lòng lắng bớt. |
| Trường thọ | Tích lũy | Thọ +0,2 năm/năm (trần +8); tuổi già muộn 10% | Già chậm hơn người. |
| Bách độc bất xâm | Không | — | Không đổi theo năm. |
| Ngộ đạo nhanh | Biến cố | 15%: tu vi +3% tầng (phàm: kinh nghiệm nghề +10%) | Thỉnh thoảng ngộ ra điều mới. |
| Khổ tu | Tích lũy có điều kiện | Năm có bế quan hoặc luyện võ từ 60 ngày: đạo tâm +1 (trần +4) | Chịu khổ thì lòng vững thêm. |
| Sát tinh | Biến cố | 20%: nếu năm đó có giết: chí mạng +0,3 (trần +5), tâm ma +2 | Thỉnh thoảng sát khí nặng thêm. |
| Mộng du tiên cảnh | Biến cố | 20%: tâm ma −2; 5%: mơ thấy một mảnh kiếp trước (đủ 3 mảnh trong một kiếp thì tính là một lần nhận ra Người Gác Bến cho Mộng Ấn #2) | Thỉnh thoảng mộng thấy tiên cảnh; hiếm khi mộng thấy chính mình ở một đời khác. |
| Huyền cơ | Tích lũy | Linh lực +0,3%/năm (trần 6%) | Linh lực thêm một ít. |

### 12.6 Tuổi già (áp cho mọi người, ngoài khí vận)
- Từ 70% thọ nguyên (phàm nhân, vô linh căn: từ 50 tuổi): mỗi năm khí huyết tối đa −1%, thân pháp −1 mỗi 3 năm; từ 85% thọ: 10%/năm một bệnh già (thương thế bậc 1).
- Trường Thọ Thể, mệnh cách Trường thọ: dời mốc muộn hơn 10%.
- Lời kể tuổi già đi kèm ("Tóc bạc như sương đầu ngõ").

---

## 13. Nhiệm vụ tân thủ — chỉ ở kiếp đầu tiên (yêu cầu 11)

### 13.1 Luật
- Chỉ tạo khi đầu thai **kiếp đầu** (`G.meta.nlife === 0` trước khi tăng). Kiếp 2 trở đi không có. Xoá dữ liệu chơi lại từ đầu thì có lại.
- Không hạn, không phạt. Làm lúc nào cũng được.
- **Giai đoạn A** (nhiệm vụ 1–6): hiện **từng cái**, xong cái này mới tới cái sau.
- **Giai đoạn B** (7–30): tối đa **3 cái cùng lúc**; xong hoặc bỏ qua một cái thì cái kế tiếp đủ điều kiện trượt vào. Cái chưa đủ điều kiện (vd cần Trúc Cơ) được giữ lại, cái sau đủ điều kiện vào trước.
- Tiến độ chỉ đếm từ lúc nhiệm vụ hiện ra, **trừ** nhiệm vụ kiểu trạng thái (có tâm pháp, đạt cảnh giới, đã ở khu vực mới): tự hoàn thành ngay nếu đã đạt.
- Kiếp đầu kết thúc thì sổ tân thủ khép theo. Màn Hết kiếp ghi "Sổ tân thủ khép lại cùng kiếp này".
- **Tốt nghiệp**: hoàn thành từ 25/30 nhiệm vụ trở lên (không tính bỏ qua) → +5 điểm luân hồi khi kết kiếp và danh hiệu "Người mới nhập đạo".

### 13.2 Giao diện
- **Vị trí**: khung nổi bên phải, dưới HUD trên bản đồ. Điện thoại: một dải mỏng dưới HUD ghi nhiệm vụ đầu tiên, chạm để mở rộng.
- **Thẻ nhiệm vụ** (dùng lại kiểu `TheNhiemVu.jsx`): tiêu đề · một câu mô tả · **thanh tiến độ** kèm chữ "2/5" · **phần thưởng ghi rõ** (biểu tượng + tên + số lượng) · nút **"Bỏ qua"** chữ nhỏ, màu nhạt, góc dưới phải.
- **Bấm vào thẻ = dẫn đường**:
  - *Bảng*: mở bảng và đúng thẻ con (vd bảng Nhân vật).
  - *Địa điểm*: camera bay tới địa điểm gần nhất phù hợp, vòng sáng 3 giây; nếu đang đứng ở đó thì mở thẻ địa điểm và **làm nhấp nháy nút hành động** cần bấm.
  - *Thực thể*: camera tới thực thể gần nhất (thương đội, khách đi đường).
  - *Hộp thoại*: mở hộp thoại (túi đồ, bế quan, chuẩn bị đột phá).
  - *Nút HUD*: làm nhấp nháy nút trên HUD (bế quan).
  - Đang trong trận hoặc sự kiện: hiện thông báo nhỏ "Xong việc trước mắt đã."
- **Xong**: thẻ viền vàng, nút **"Nhận thưởng"**; bấm → chip phần thưởng như hệ hiện có, nhiệm vụ kế tiếp trượt vào.
- **Bỏ qua**: dùng hộp `XacNhan.jsx`. Tiêu đề "Bỏ qua nhiệm vụ?" — nội dung "Bỏ qua «{tên nhiệm vụ}» thì sẽ không nhận lại phần thưởng của nhiệm vụ này." — nút "Bỏ qua" / "Giữ lại".
- **Ẩn/hiện**: nút nhỏ "Tân thủ (3)" cạnh HUD; ẩn thì khung thu lại, tiến độ vẫn đếm. Trạng thái ẩn lưu trong bản lưu.
- Nhật ký gỡ lỗi: `dbg('tut.show')`, `tut.go`, `tut.tick`, `tut.done`, `tut.claim`, `tut.skip`.

### 13.3 Ba mươi nhiệm vụ

Phần thưởng linh thạch ghi là số cơ sở, nhân hệ số kinh tế tầng như sự kiện (`ECON`). Mã vật phẩm là mã có thật trong game.

| # | Mã | Tên | Mục tiêu (thanh tiến độ) | Dẫn đường tới | Phần thưởng | Dạy điều gì |
|---|---|---|---|---|---|---|
| **A1** | `tt_tinhgiac` | Tỉnh giấc nơi quê nhà | Mở bảng Nhân vật (0/1) | Bảng `char` | 5 linh thạch | Linh căn, thể chất, khí vận, Đạo Hướng, Nhân Quả |
| **A2** | `tt_duonglang` | Đường làng | Đi tới một địa điểm khác (0/1) | Địa điểm gần nhất chưa tới | Hồi Xuân Đan `hoixuan` ×1 | Di chuyển trên bản đồ |
| **A3** | `tt_chentra` | Chén trà nghe chuyện | Dùng "Gọi ấm trà, ngồi nghe chuyện" ở trà lâu (0/1) | Trà lâu gần nhất, nút dịch vụ `service_tea_nghe` | 5 linh thạch + mở tin đồn đầu | Quán xá, tin đồn |
| **A4** | `tt_tamphap` | Bản chép tay tâm pháp | Có một tâm pháp (trạng thái) | Tạp hóa gần nhất (`taphoa`), bản chép tay rẻ luôn bày cho phàm nhân | 10 linh thạch | Tâm pháp là cửa tu |
| **A5** | `tt_tinhtoa` | Ngồi yên thở chậm | Tĩnh tọa 3 lần (0/3) | Nút `tinh` ở thẻ địa điểm | Tinh Nguyên Đan `tinhnguyen` ×1 | Tĩnh tọa hồi phục, tích tu vi |
| **A6** | `tt_danhkhi` | Dẫn khí nhập thể | Bước vào Luyện Khí (thanh = tu vi phàm nhân x/50) | Khi đủ: mở chuẩn bị dẫn khí; chưa đủ: nhấp nháy nút Tĩnh tọa | Hồi Xuân Đan ×2, Tụ Khí Đan `tukhi` ×2, Đấu Lạp Sương Gió `non_dauap_suong` | Bước đầu của tu tiên |
| B7 | `tt_tuido` | Hành trang | Mặc một món trang bị (0/1) | Hộp thoại túi đồ, ô trống | Giáp Thạch Diệm `giap_giap_thach_diem` | Túi đồ, ô trang bị |
| B8 | `tt_sanyeu` | Săn yêu lần đầu | Săn yêu thắng 3 lần (0/3) | Rừng/núi gần nhất có `sanyeu` | Kiếm Sắt Lò Tro `vk_kiem_sat_lo_tro` + 10 linh thạch | Chiến đấu, rơi đồ |
| B9 | `tt_haithuoc` | Theo mùi thuốc | Hái thuốc 3 lần (0/3) | Nơi có `haithuoc` | Giải Độc Đan `giaidoc` ×2 | Nguyên liệu |
| B10 | `tt_bangtreo` | Bảng treo thưởng | Hoàn thành 1 nhiệm vụ bảng treo (0/1) | Thành có `board` | 15 linh thạch | Nhiệm vụ có hạn, có phạt |
| B11 | `tt_lichluyen` | Lịch luyện | Đầy thanh lịch luyện tầng hiện tại (theo %) | Bảng Nhân vật, dòng lịch luyện | Tinh Nguyên Đan ×1 | Vì sao phải ra ngoài chứ không chỉ ngồi |
| B12 | `tt_khaiphu` | Động phủ đầu tiên | Khai phủ 1 lần (0/1) | Núi/hang gần nhất có `khaiphu` | Trận Kỳ Noãn Sa `tran_tran_ky_noan_sa` | Động phủ |
| B13 | `tt_bequan` | Bế quan | Bế quan cộng dồn 30 ngày (0/30) | Nút bế quan HUD (`hudBq`) | Tụ Khí Đan ×3 | Bế quan và thời gian trôi |
| B14 | `tt_tang` | Thêm một tầng | Lên một tầng Luyện Khí (0/1) | Bảng Nhân vật, thanh tu vi | Định Thần Đan `dinhthan` ×1 + 20 linh thạch | Xung kích tiểu cảnh giới |
| B15 | `tt_khachdiem` | Một đêm trọ | Thuê phòng thường ở khách điếm (0/1) | Khách điếm gần nhất, `service_inn_phong` | Hồi Xuân Đan ×1 | Nghỉ ngơi có giá |
| B16 | `tt_tuuphuong` | Chén rượu giang hồ | Uống ở tửu phường (0/1) | Tửu phường gần nhất, `service_tuu_chen` | Một tin về thiên kiêu (mở dòng trong Bảng thiên hạ) | Tin tức giang hồ |
| B17 | `tt_bangthienha` | Thiên hạ rộng lớn | Mở Bảng thiên hạ (0/1) | Bảng `affairs` | 5 linh thạch | Thiên kiêu, tông môn, thời cục |
| B18 | `tt_ketgiao` | Kết giao | Giao tình với một người đạt "quen biết" (0/1) | Thực thể người gần nhất; bảng `bonds` | 10 linh thạch | Giao tình, nhân quả tuyến Duyên |
| B19 | `tt_muaban` | Mua bán | Bán 3 món ở phường thị hoặc tạp hóa (0/3) | Phường thị / tạp hóa gần nhất | Đồng Đỉnh Ba Chân `dinh_dongdinh_cu` | Kinh tế, ô lô đỉnh |
| B20 | `tt_luyenche` | Lò đầu tiên | Luyện 1 viên đan hoặc 1 món đồ (0/1) | Bảng `craft` | Hồi Xuân Đan ×2 + 10 linh thạch | Luyện chế |
| B21 | `tt_linhthu` | Bạn đồng hành | Ấp nở 1 linh thú (0/1) | Bảng `pets` (nếu chưa có trứng: nơi săn yêu) | Tụ Khí Đan ×2 | Linh thú |
| B22 | `tt_sonmon` | Cửa sơn môn | Mở thẻ một sơn môn (0/1) | Sơn môn gần nhất (`join`) | 10 linh thạch | Điều kiện nhập tông (không bắt buộc vào) |
| B23 | `tt_congphap` | Chiêu thức mới | Học thêm một chiêu hoặc một công pháp (0/1) | Tàng Kinh Các nếu đã nhập tông, không thì tạp hóa | 15 linh thạch | Công pháp và chiêu |
| B24 | `tt_dungchieu` | Một chiêu định thắng thua | Thắng 1 trận có dùng chiêu tốn linh lực (0/1) | Nơi săn yêu gần nhất | Kim Cang Phù `kimcang` ×1 | Linh lực trong trận |
| B25 | `tt_nhanqua` | Lòng tốt có giá | Gặp và quyết định trong sự kiện "Bà lão xuống núi" (bản tân thủ, xuất hiện ở đường núi gần nhất) (0/1) | Đường núi gần nhất | Mở thẻ Nhân quả trong Sổ tay + 10 linh thạch | Đạo Hướng khác Nhân Quả; hậu quả đến trễ |
| B26 | `tt_duongthuong` | Vết thương cũ | Chữa khỏi một thương thế (0/1) | Nút `heal` (Dưỡng thương) gần nhất | Hồi Xuân Đan ×2 | Thương thế 3 bậc |
| B27 | `tt_tindon` | Tai nghe tám hướng | Nghe 5 tin đồn (0/5) | Trà lâu / tửu phường gần nhất | 10 linh thạch | Tin đồn không phải sự thật |
| B28 | `tt_dixa` | Đi xa | Tới một đại khu vực khác (trạng thái) | Trạm dịch gần nhất (`tram`) | Thần Hành Phù `thanhanh` ×2 | Năm đại khu vực, phương tiện |
| B29 | `tt_chuanbi` | Trước cửa Trúc Cơ | Đạt Luyện Khí viên mãn và mở bảng Chuẩn bị đột phá (0/1) | Hộp thoại chuẩn bị đột phá | Hộ Mạch Đan `homach` ×1 | Tỉ lệ, hậu quả thất bại, đan hộ mệnh |
| B30 | `tt_trucco` | Trúc Cơ | Đột phá Trúc Cơ thành công (0/1) | Hộp thoại chuẩn bị đột phá | Phá Cảnh Đan `phacanh` ×1 + 50 linh thạch | Đại cảnh giới |

Thứ tự giai đoạn B: 7, 8, 9 vào trước; sau đó lần lượt 10 → 30.

Các điểm đếm cần gắn (mỗi điểm một dòng gọi `tutTick(loại, số)` ở hàm đang có): mở bảng · tới địa điểm · dùng dịch vụ (theo mã dịch vụ) · có tâm pháp · tĩnh tọa · vào Luyện Khí · mặc trang bị · thắng săn yêu · hái thuốc · xong nhiệm vụ bảng treo · lịch luyện đầy · khai phủ · số ngày bế quan · lên tầng · mở Bảng thiên hạ · giao tình đổi bậc · bán đồ · luyện chế xong · ấp nở · mở thẻ sơn môn · học chiêu/công pháp · thắng trận có dùng chiêu tốn linh lực · xong sự kiện tân thủ · khỏi thương thế · nghe tin đồn · đổi đại khu vực · mở chuẩn bị đột phá · đột phá thành công.

---

## 14. Cốt truyện xuyên suốt theo xuất thân — đề xuất cách làm (yêu cầu 13)

### 14.1 Vì sao khó
- Có **45 xuất thân** (15 gốc + 30 viết sẵn) và sẽ thêm 12 xuất thân mới → không thể viết 57 cốt truyện lớn rời nhau.
- Thế giới mở, người chơi đi đâu cũng được, làm gì cũng được → không thể ép đi theo một đường thẳng.
- Kiếp ngắn dài khác nhau (chết năm 20 hay sống 3.000 năm) → cốt truyện phải chịu được bị bỏ dở.
- Thế giới giữ lại qua các kiếp → cốt truyện kiếp này làm thay đổi kiếp sau.

### 14.2 Mô hình đề xuất: ba lớp chồng nhau

| Lớp | Là gì | Ai sở hữu | Thời gian |
|---|---|---|---|
| **Thời cục thế giới** | 12 đại sự diễn ra theo năm của thế giới **dù người chơi có mặt hay không** | Thế giới (`world.chron`) | Kéo dài qua nhiều kiếp |
| **Mệnh tuyến** | 9 đại cốt truyện; mỗi xuất thân gắn một mệnh tuyến; mỗi mệnh tuyến 5 hồi | Kiếp hiện tại (`run.arc`) | Một kiếp (riêng "Thế Gia Vạn Đại" nối được qua kiếp) |
| **Đại Mộng** | Bí ẩn vòng luân hồi: 9 Mộng Ấn, Người Gác Bến, kết thúc thật | Người chơi (`G.meta.mong`) | Toàn bộ game |

Mệnh tuyến **bám vào** thời cục: hồi 3 và hồi 5 của mọi mệnh tuyến là một đại sự thời cục. Nhờ vậy, dù người chơi bỏ mệnh tuyến của mình, thời cục vẫn kéo họ vào câu chuyện chung.

### 14.3 Mười nguyên tắc "kéo chứ không ép"
1. **Lời mời tìm tới người chơi**: thư, người tìm đến tận nơi, tin đồn có dấu trên bản đồ. Không bắt phải về một chỗ cố định để "nhận truyện".
2. **Hạn mềm theo thời gian thế giới**: ghi bằng chữ trong Sổ tay → thẻ "Mệnh thư" ("trước mùa đông năm sau").
3. **Lỡ hạn thì thế giới tự diễn**: game kể lại điều đã xảy ra khi bạn vắng mặt, mệnh tuyến rẽ sang nhánh **"Người đứng ngoài"**. Không bao giờ khóa chết; chỉ cái chết làm mệnh tuyến dừng.
4. **Mỗi hồi có ít nhất ba hướng**: theo, chống, đứng ngoài.
5. **Nút hội tụ**: hồi 3 và hồi 5 chạm một đại sự thời cục; vai của người chơi tùy đạo đồ đang theo (nông dân là nạn nhân hoặc người giữ làng; tướng quân cầm quân; ma tu là kẻ gây ra; tán tu đục nước béo cò).
6. **Chí hướng do người chơi đặt**: chọn một trong 10 chí hướng (Phi thăng · Báo thù · Làm vua · Giàu có · Lập phái · Giữ gia đình · Cứu đời · Diệt thế · Tìm chân tướng · Sống yên ổn) hoặc để trống. Game chỉ **gợi ý** chí hướng hợp xuất thân. Đổi chí hướng tối đa 2 lần mỗi kiếp, mỗi lần tâm ma +5.
7. **Chuyển mệnh tuyến** bằng việc lớn: giết vua → Đế Nghiệp; diệt một tông chính → Diệt Thế Ma Đồ; có con có linh căn → Thế Gia Vạn Đại; nhặt Mộng Ấn đầu → Tỉnh Mộng. Mỗi kiếp chuyển tối đa một lần; mệnh tuyến cũ dừng ở hồi đang đứng.
8. **Kết cục xét theo trạng thái, không theo nút cuối**: lúc chết / quy ẩn / phi thăng, game chọn kết cục khớp nhất từ bảng kết cục (mệnh tuyến + hồi đã tới + chí hướng + đạo đồ + Đạo Hướng + Nhân Quả + cảnh giới + gia đình). Luôn có kết cục "**Một đời vô danh**" với văn bia riêng theo đạo đồ — làm gì cũng có kết cục có nghĩa.
9. **Thế giới nhớ**: kết cục ghi vào thế giới (triều đại mới, tông bị diệt, võ phái, dòng họ, ma chủ còn sống, bí cảnh đã khai, ma vực). Kiếp sau sống trong thế giới đó.
10. **Lần thứ hai không y như lần đầu**: đầu thai lại cùng xuất thân thì mệnh tuyến biết "đây là lần thứ hai" (tầng mộng): vài người nhìn bạn như đã quen; nút mở đầu có câu khác.

### 14.4 Mười hai đại sự thời cục

| # | Đại sự | Khi nào (năm của thế giới) | Diễn biến (3 giai đoạn) | Nếu không ai can thiệp | Người chơi tác động bằng | Để lại cho thế giới |
|---|---|---|---|---|---|---|
| 1 | Đại Hội Thiên Kiêu | mỗi 30 năm | Mở đăng ký → vòng loại ở các khu → chung kết | Bảng thiên kiêu mới theo sức | Tham dự, ám sát, đặt cược, kết giao | Hạng thiên kiêu |
| 2 | Tông Chiến Chính–Ma | năm 40–60, lặp mỗi 150 năm | Xích mích → vây công → quyết chiến | Tông yếu hơn bị diệt | Chọn phe, phản bội, cứu tạp dịch, đứng ngoài | Tông bị diệt khỏi `world.sects` |
| 3 | Huyết Nguyệt Ma Kiếp | năm 80–120 | Trăng đỏ 3 tháng → ma tu trỗi dậy → một thành rơi | Một khu nhỏ thành ma vực | Diệt ma đầu, phong ấn, gia nhập | Ma vực trên bản đồ |
| 4 | Đổi Ngôi | mỗi 60–120 năm | Thuế nặng, loạn → khởi nghĩa → kinh thành thất thủ | Triều mới do một phe NPC lập | Phò ai, tự lên ngôi, cứu vua cũ | Tên triều đại, quốc hiệu `world.quoc` |
| 5 | Thú Triều Bắc Nhạc | mỗi 25 năm | Dấu hiệu → vạn thú xuống núi → thú vương | Vài thôn bị xoá | Giữ thành, săn thú vương | Thôn mất, tàn tích |
| 6 | Đại Dịch Nam Trạch | năm 30–90 | Người chết lạ → lan rộng → phong tỏa | 1/3 dân Nam Trạch chết | Tìm thuốc, diệt nguồn (nguồn tung lúc sinh thế giới: cổ sư, thi tu hoặc trời) | Làng bỏ hoang, lăng mộ dịch |
| 7 | Hạn Hán Trăm Năm | năm 50–150, kéo 3 năm | Ruộng nứt → giá lương ×3 → dân bỏ làng | Dân tản cư, cướp nổi | Phát chẩn, đầu cơ, cầu mưa (Lôi pháp, Phật pháp) | Giá cả, làng bỏ hoang |
| 8 | Bí Cảnh Thượng Cổ Mở | mỗi 50 năm, mở 1 năm | Ánh sáng ở Tây Lĩnh → tông lớn kéo tới → cửa đóng | Tông lớn lấy hết | Vào tranh, cướp, dẫn đường | Bảo vật xuất thế trong tay ai |
| 9 | Tiên Nhân Hạ Phàm | năm 200+, một lần | Dị tượng → người từ thượng giới đi tìm một vật → một tông diệt | Một tông diệt | Che giấu vật, trao vật, đối đầu (Mộng Ấn #7) | Vết nứt trên trời |
| 10 | Long Mạch Đứt | năm 100–250 | Linh khí suy → động phủ khô → tranh linh mạch | Khu đó tu luyện −30% về sau | Nối long mạch, phá ma trận | Linh khí khu vực |
| 11 | Ma Chủ Phục Sinh | năm 250–400, chỉ khi Huyết Nguyệt đã để lại ma vực | Ma vực lan → ma chủ tỉnh → đại chiến | Ba khu nhỏ thành ma vực lâu dài | Ngăn, phong ấn, nuốt ma chủ | Ma vực lâu dài |
| 12 | Thiên Lộ Mở | mỗi 300 năm, mở 10 năm | Cầu ánh sáng → tranh vào → cửa khép | Vài tu sĩ NPC phi thăng | Trong 10 năm này Cửu Trùng Lôi Kiếp bớt một đợt | Người phi thăng |

### 14.5 Chín mệnh tuyến

| Mệnh tuyến | Một câu | Hồi 1 | Hồi 2 | Hồi 3 (hội tụ) | Hồi 4 | Hồi 5 (hội tụ) | Kết cục: thành / bại / rẽ / đứng ngoài | Khi vô linh căn |
|---|---|---|---|---|---|---|---|---|
| **Phi Thăng Lộ** | Một đứa trẻ có tiên duyên leo từng bậc thang tàn khốc lên trời | Tiên duyên (trắc linh, sư phụ) | Huyết vũ (tranh đoạt, mất người thân thiết đầu tiên, bí cảnh) | Đại Hội Thiên Kiêu hoặc Tông Chiến | Đạo tâm (thiên kiếp, chọn đạo hay người) | Thiên Lộ Mở | Phi thăng / Ngã trước Thiên Lộ / Bỏ trường sinh vì một người / Tọa hóa trong động phủ | Hồi 1 thành "Phế vật cầu tiên": mục tiêu là cải tạo linh căn; không cải tạo được thì kết "Ngước nhìn trời cả đời" |
| **Diệt Thế Ma Đồ** | Kẻ bị thế gian ruồng bỏ thành tai họa của nó | Bị ruồng bỏ | Ma chủng (ma công, tiếng thì thầm) | Huyết Nguyệt Ma Kiếp | Ma vực (lập thế lực, ra tay với tông chính) | Ma Chủ Phục Sinh | Diệt thế (kiếp sau thế giới thành đất ma) / Bị vây giết / Quay đầu, chết như người thường / Ma chủ một phương | "Ma nô": huyết tế khai mạch |
| **Đế Nghiệp** | Từ bùn đất ngồi lên ngai vàng — trong thế giới tu sĩ coi ngai vàng như đồ chơi | Loạn thế (thuế, đói, bắt lính, thi cử) | Lập thân (thăng quan, lập công) | Đổi Ngôi | Tranh thiên hạ (thế gia tu tiên đứng sau các phe) | Đăng cơ và cái giá (tu sĩ đòi cống nạp: giữ dân hay giữ ngôi) | Khai quốc (triều đại mang tên bạn ở kiếp sau) / Bị tru di / Phò minh chủ / Quy ẩn khi thiên hạ loạn | Bản gốc là cho phàm nhân; có linh căn thì thành "Quốc sư hộ quốc" |
| **Phú Giáp Thiên Hạ** | Đồng tiền mở mọi cửa, trừ cửa trời | Gánh hàng đầu | Thương lộ (đường buôn, cướp, đối thủ) | Hạn Hán Trăm Năm (đầu cơ hay phát chẩn) | Thương minh (đấu thế gia, buôn với tu sĩ) | Mua trường sinh (dùng gia tài mua Khai Linh Đan, Diên Thọ Đan, tiên duyên cho con) | Phú khả địch quốc / Phá sản / Mua được đường tu tiên cho mình / Chết giàu mà cô độc | Hợp nhất với vô linh căn: hồi 5 là đường cải tạo #1 |
| **Huyết Cừu** | Mối thù đến trước cả khi biết nói | Diệt môn (kẻ ra tay là một thế lực thật trong thế giới) | Truy dấu | Tông Chiến Chính–Ma (kẻ thù đứng ở một phe) | Sự thật (kẻ thù không hẳn ác, hoặc nhà mình từng ác) | Báo hay tha | Báo thù rồi trống rỗng / Chết trước kẻ thù / Hóa giải / Thành kẻ mình căm ghét | Báo thù bằng võ, độc, mưu, hoặc thuê người |
| **Võ Lâm Chí Tôn** | Đỉnh cao của người thường, dưới chân tu sĩ | Võ quán | Giang hồ (lôi đài, kết nghĩa) | Thú Triều (võ lâm giữ thành) | Khai phái | Võ đạo đối tiên đạo (tông môn ép võ lâm quy phục) | Minh chủ, môn phái truyền đời / Chết dưới tay tu sĩ / Phá kén sang Thể tu / Rửa tay gác kiếm | Bản gốc dành cho vô linh căn |
| **Thế Gia Vạn Đại** | Một đời không thành tiên, trăm đời có thể | Bờ ruộng (sinh kế, cưới hỏi) | Con trắc linh | Đại Dịch hoặc Hạn Hán (giữ nhà) | Dựng tộc (gia phả, ruộng, gửi con lên núi) | Truyền đời (dòng họ sang kiếp sau; kiếp sau đầu thai vào dòng họ thì mở hồi tiếp) | Thế gia một vùng / Tuyệt tự / Con cháu thành tiên / Tộc tan vì tranh đoạt | Bản gốc dành cho vô linh căn |
| **Y Giả Độ Thế** | Cứu được người, không cứu được đời | Hiệu thuốc | Bệnh không tiền | Đại Dịch Nam Trạch | Thuốc và độc (bị ép làm độc, thử thuốc trên người) | Phương thuốc cuối (cứu một thành bằng thọ, linh căn hoặc mạng) | Thần y / Chết vì dịch / Thành độc vương / Y thư truyền đời | Lang trung phàm nhân |
| **Tỉnh Mộng** | Có người sống mãi mà không biết mình đang mơ; có kẻ nghèo khổ lại thấy vết nứt của giấc mộng | Cảnh quen (Người Gác Bến lần đầu) | Dấu vết kiếp trước (mộ, đồ chôn, vở tuồng kể đời mình) | Tiên Nhân Hạ Phàm hoặc Bí Cảnh Thượng Cổ | Bến Vong Xuyên trên trần thế (địa điểm ẩn) | Chọn tỉnh hay mơ | Nhặt hai Mộng Ấn / Điên loạn / Ở lại giấc mộng vì người thương / Chết trong cơn mê | Không cần linh căn |

Mỗi hồi gồm 3–5 **nút**. Một nút có: điều kiện mở (tuổi, năm thế giới, cảnh giới, nơi, cờ), lời mời (cách tới tay người chơi), hạn mềm, các lựa chọn, nhánh "tự diễn" khi lỡ hạn, cờ để lại.

### 14.6 Ánh xạ xuất thân → mệnh tuyến

| Mệnh tuyến | Xuất thân hiện có | Xuất thân mới (Phần 16.2) |
|---|---|---|
| Phi Thăng Lộ | Con nhà trận sư · Tiểu đạo đồng · Đồng tử đun trà · Kẻ lớn lên bên vách đá · Người học đạo sau mùa lũ | Đích tử thế gia tu tiên · Hậu duệ tông môn sa sút |
| Diệt Thế Ma Đồ | Con nhà đồ tể · Mang huyết mạch ma tộc | Con tội nhân lưu đày · Con nhà đào huyệt |
| Đế Nghiệp | Thư sinh nghèo · Cựu binh biên ải · Trẻ giữ ngựa trạm · Người chép sổ thóc · Kẻ viết thư hộ · Hậu duệ người coi ấn · Người bị trả về từ biên ải | Con quan huyện · Chi thứ hoàng tộc |
| Phú Giáp Thiên Hạ | Con nhà buôn · Con nhà gánh muối · Kẻ trốn nợ qua đèo · Con nhà nung men · Con nhà giữ kho đường · Người thừa kế sạp bạc | Con trưởng phú hộ |
| Huyết Cừu | Con thứ thế gia · Đứa trẻ nhặt ở bậc cửa · Đứa trẻ lớn sau bếp · Trẻ ẩn dưới sàn đan · Kẻ mang tro về quê | Nô bộc nhà quan · Cô nhi sau binh lửa |
| Võ Lâm Chí Tôn | Con nhà thợ rèn · Con nhà hầm than · Kẻ từng vác bia · Người làm thuê ở mỏ | Đứa trẻ bị bán vào mỏ |
| Thế Gia Vạn Đại | Con nhà nông · Con nhà chài lưới · Con nhà vá lưới · Con người dệt chiếu · Thợ cạo vôi tường | — |
| Y Giả Độ Thế | Dược đồng · Con nhà bốc thuốc · Người học bó xương | Đứa trẻ ở trại phong |
| Tỉnh Mộng | Tiểu khất cái · Đứa trẻ bị bỏ ở miếu · Con nhà gánh hát · Người giữ miếu nhỏ · Kẻ bỏ trường thi · Người học khắc khuôn · Kẻ chèo đò ban đêm · Người bồi giấy dó | Đứa trẻ què chân |

Mỗi xuất thân cần **3 cảnh mở đầu riêng** (tuổi thơ, biến cố đẩy ra đời, lời mời hồi 1) để mệnh tuyến chung vẫn mang màu riêng.

### 14.7 Đại Mộng và kết thúc thật

**Chín Mộng Ấn** (mỗi kiếp nhặt tối đa một, trừ kết cục "Nhặt hai Mộng Ấn" của Tỉnh Mộng):

| # | Tên | Cách nhặt | Điều được hé lộ |
|---|---|---|---|
| 1 | Bát canh không đáy | Chết lần đầu, ở lại bến Vong Xuyên trò chuyện với Người Gác Bến tới cuối | Canh quên không làm quên hết |
| 2 | Người không già | Nhận ra Người Gác Bến ở ba kiếp khác nhau (chọn "Ta đã gặp ông") | Có người không bị cuốn vào vòng |
| 3 | Mộ của chính mình | Viếng mộ kiếp trước (đã có) và đọc hết bia | Mình từng sống, từng chết ở đây |
| 4 | Tuồng cũ | Xem vở tuồng kể đúng đời mình kiếp trước | Thế gian nhớ mình hơn mình nhớ mình |
| 5 | Chữ trong quẻ | Thiên cơ sư (người chơi hoặc NPC) xem quẻ thấy chính mình | Mệnh đã được viết lặp lại |
| 6 | Kẻ cũng đang mơ | Một thiên kiêu nhận ra bạn qua hai kiếp | Không chỉ mình đang mơ |
| 7 | Vết nứt trên trời | Có mặt ở Tiên Nhân Hạ Phàm hoặc Thiên Lộ Mở và nhìn lên | Thượng giới cũng là một tầng mộng |
| 8 | Đáy Vong Xuyên | Hồi 4 mệnh tuyến Tỉnh Mộng | Vong Xuyên chảy từ chấp niệm của chúng sinh |
| 9 | Người dệt mộng | Có đủ 8 mảnh, sự kiện cuối ở bến | Vòng mộng là chấp niệm "không muốn chết" của chúng sinh dệt lại; Người Gác Bến là kẻ tỉnh đầu tiên mà không dám rời |

**Kết thúc**

| Điều kiện | Kết thúc | Hệ quả |
|---|---|---|
| Phi thăng khi chưa đủ 9 Mộng Ấn | **Mộng trong mộng**: lên tới nơi, thấy một bến Vong Xuyên khác | Vẫn luân hồi; thưởng phi thăng như hiện tại |
| Phi thăng khi đủ 9 Mộng Ấn | **Đại Tỉnh** — kết thúc thật | Lời kết; ghi "đã tỉnh"; mở chế độ **Tân Mộng** (thế giới mới, giữ một kỷ niệm) |
| Đủ 9 Mộng Ấn nhưng chọn không phi thăng | **Kẻ gác bến mới** | Người chơi thay Người Gác Bến; kết thúc phụ |
| Diệt thế khi đủ 9 Mộng Ấn | **Phá mộng bằng máu** | Thế giới tan; kết thúc tối |

### 14.8 Dữ liệu cần cho phần cốt truyện
- Bảng thời cục: 12 đại sự (mã, tên, khoảng năm, chu kỳ, 3 giai đoạn, điều kiện, kết cục mặc định, cờ để lại).
- Bảng mệnh tuyến: 9 mệnh tuyến × 5 hồi; khoảng **180 nút**; **36 kết cục** + "Một đời vô danh" theo 36 đạo đồ.
- Bảng chí hướng: 10 mục (mã, tên, điều kiện toại nguyện, mệnh tuyến gợi ý).
- Cảnh mở đầu: 57 xuất thân × 3 = **171 cảnh**.
- Mộng Ấn: 9 mảnh + Người Gác Bến 6 hình dạng (lão chèo đò, đứa trẻ ăn mày, ni cô mù, người bán canh, lão đạo ăn xin, bà đỡ) × 2 cảnh.
- Kỹ thuật: dùng lại hệ chuỗi đang có (`chain.paths`, `waitHours`) và schema sự kiện; thêm `kind: "arc"`; trạng thái ở `run.arc`, `world.chron`, `G.meta.mong`. Kiểm bằng `tools/test.js` (giả lập thời gian, chọn lựa chọn, lỡ hạn) — không cần bot.

---

## 15. Kết kiếp, điểm luân hồi và văn bia

- **Điểm luân hồi cộng thêm** (vào `calcPts`): mỗi bậc phàm đạo từ bậc 3 +2 (bậc 6: +8) · võ đạo Tiên thiên +4, Tông sư +8 · mỗi con sống tới 16 tuổi +1 (tối đa 5) · mỗi 3 lần cứu người +1 · mỗi hồi mệnh tuyến đã qua +2, kết cục "thành" +10 · chí hướng toại nguyện +6 · Mộng Ấn mới +5 · tân thủ tốt nghiệp +5 · chết vì thọ +3 · mỗi nhân kiếp vượt qua +1.
- **Nguyên nhân chết mới**: `doi` (chết đói) · `benh` (bệnh) · `hinh` (bị xử tử) · `nhankiep` (tai ương phàm trần). Phàm nhân chết vì thọ hiện là "Chết già" thay cho "Tọa hóa".
- **Văn bia**: một câu cho mỗi cặp đạo đồ × kết cục (36 đạo đồ × 4 = 144 câu) + 36 câu "Một đời vô danh". Giọng theo 3.4.
- **Màn Hết kiếp** thêm: trang Quả chín (9.10) · mệnh tuyến tới hồi nào, kết cục gì · chí hướng · tuyến theo sang kiếp sau · bậc Nhân Quả mang sang (chữ) · Mộng Ấn.
- **Nâng cấp luân hồi mới**: **Túc Căn** (3 bậc, 15/30/50: mỗi bậc giảm 4 điểm % vô linh căn, sàn 30%) · **Phàm Tâm** (3 bậc, 8/16/26: kinh nghiệm phàm đạo và võ đạo +10% mỗi bậc).

---

## 16. Danh mục toàn bộ dữ liệu cần có

### 16.1 Bảng dữ liệu mới / sửa (nguồn chuẩn trong `content/`)

| Bảng | Nơi đặt đề xuất | Số mục | Nội dung | Mới / sửa |
|---|---|---|---|---|
| `ROOT` | `content/characters/root.js` | +1 tiên thiên, +8 hậu thiên | Bảng 5.1 | sửa |
| `ROOT_RATE` | `content/rules/root-rate.js` | 2 bảng | Tỉ lệ kiếp 1 / kiếp 2+, điều chỉnh nhân quả, kẹp 30–65% | mới |
| `TRAC_LINH` | `content/rules/trac-linh.js` | 5 cách | Bảng 5.3 | mới |
| `ROOT_FIX` | `content/rules/root-fix.js` | 15 + 3 + 1 | Bảng 5.5 | mới |
| Vật phẩm linh căn | `content/catalog/` | 19 | Bảng 5.6 | mới |
| `TT_DEST.vo_can` | `content/characters/tt-dest.js` | 1 | Khôi phục, bỏ dòng xoá ở core2/12 | sửa |
| `PHAM_GIA` | `content/rules/pham-gia.js` | 37 dòng | Bảng 6.2 | mới |
| `AN_UONG` | `content/rules/an-uong.js` | 6 trạng thái + 3 mức | Bảng 6.3 | mới |
| `VIEC_THUE` | `content/venues/` (dịch vụ) | 14 | Bảng 6.5 | mới |
| `GIA_DINH_EV` | `content/events/` | 14 | 6.6 | mới |
| `PHAM_DAO` | `content/rules/pham-dao.js` | 17 đường × 6 bậc | 7.2 (vào, bậc, việc, thu, rủi ro, kết cục) | mới |
| `VO_DAO` | `content/rules/vo-dao.js` | 6 bậc | 7.3 | mới |
| `VO_HOC` | `content/catalog/` | 14 | Bí tịch võ 7.3 | mới |
| `TU_DAO` | `content/rules/tu-dao.js` | 19 × 6 bậc | 7.4 | mới |
| `PHAP_MON` | `content/rules/phap-mon.js` | 22 | 7.5 (tài nguyên, công pháp, cái giá, ghép) | mới |
| Công pháp pháp môn | `content/catalog/arts` | 66 | 22 × 3 | mới |
| Chiêu pháp môn | `content/catalog/skills` | 105 + 5 phù | Bảng chiêu 7.5 | mới |
| `DAO_HUONG` | `content/rules/dao-huong.js` | 7 hướng + 5 độ đậm | 8.3, 8.4 | mới |
| `NHAN_QUA` | `content/rules/nhan-qua.js` | 10 bậc | 9.3, 9.5, 9.7, 9.8 | mới |
| `TUYEN` | `content/rules/tuyen.js` | 8 loại | 9.9 | mới |
| `DEED` | `content/rules/deed.js` | 55 | Bảng 10 | mới |
| `TUE_BIEN` | `content/rules/tue-bien.js` | 33 + 74 + 18 | Phần 12 | mới |
| `TUE_CHU` | `content/text/` | thang chữ | 12.2 | mới |
| `TUT` | `content/rules/tan-thu.js` | 30 | Bảng 13.3 | mới |
| `THOI_CUC` | `content/world/thoi-cuc.js` | 12 | 14.4 | mới |
| `MENH_TUYEN` | `content/events/arcs/` | 9 × 5 hồi, ~180 nút, 36 kết cục | 14.5 | mới |
| `CHI_HUONG` | `content/rules/chi-huong.js` | 10 | 14.3 | mới |
| `MONG_AN` | `content/rules/mong-an.js` | 9 | 14.7 | mới |
| `ORIGIN` + `catalog/origins.json` | sẵn có | +12 | 16.2 | sửa |
| `UPG` | `content/rules/upg.js` | +2 | Túc Căn, Phàm Tâm | sửa |
| `ACH` | `content/rules/ach.js` | sửa 2, thêm 8 | Thiện nhân / Ma đầu theo Đạo Hướng; thêm: Phế vật nghịch mệnh, Chết bên con cháu, Tông sư võ đạo, Khai quốc, Người gác bến, Đại Tỉnh, Thiện ác đan xen, Trăm năm phàm trần | sửa |
| `BT_BASE` | `content/rules/bt-base.js` | 5 | 45/36/28/20/14 | sửa |
| `KIEP` | `content/rules/kiep.js` | điều kiện Nghiệp Hỏa | 9.7 | sửa |
| `PGROUP` | `src/game/ui/08-cac-canh-hien-de.js` | thêm nhóm "Mưu sinh" | việc thuê + việc phàm đạo | sửa |
| Văn bia | `content/narration/` | 180 câu | Phần 15 | mới |

### 16.2 Mười hai xuất thân mới (để nhân quả có "khốn khó" và "khá giả" thật)

| Mã | Tên | Nhóm | Tác dụng | Tiền | Mệnh tuyến | Tiểu sử |
|---|---|---|---|---|---|---|
| `nobo` | Nô bộc nhà quan | khốn khó | Đạo tâm +2, khí huyết −5% | không | Huyết Cừu | lớn lên trong bếp sau phủ quan ở {$que}, chưa từng được gọi bằng tên |
| `toinhan` | Con tội nhân lưu đày | khốn khó | Công +6%, đạo tâm −2; sẵn tuyến Oán với một quan | không | Diệt Thế Ma Đồ | theo cha mẹ bị lưu đày tới {$que}, mang chữ thích trên trán |
| `quechan` | Đứa trẻ què chân | khốn khó | Thân pháp −3, ngộ tính +3 | ít | Tỉnh Mộng | què từ năm lên năm ở {$que}, ngồi nhìn người khác chạy |
| `coinhi` | Cô nhi sau binh lửa | khốn khó | Khí huyết +5%, tâm ma 5 | không | Huyết Cừu | làng {$que} cháy trong một đêm, chỉ còn đứa trẻ trốn dưới giếng |
| `traiphong` | Đứa trẻ ở trại phong | khốn khó | Bách độc kháng một phần, mọi giá ở thôn +20% | không | Y Giả Độ Thế | sinh ra trong trại phong ngoài {$que}, chưa ai dám chạm tay |
| `banmo` | Đứa trẻ bị bán vào mỏ | khốn khó | Thủ +10%, thọ −5% | không | Võ Lâm Chí Tôn | bị bán vào mỏ ở {$que} năm bảy tuổi để đổi lấy hai đấu gạo |
| `daohuyet` | Con nhà đào huyệt | khốn khó | Thần thức +2, người thường xa lánh | ít | Diệt Thế Ma Đồ | là con nhà đào huyệt ở {$que}, chơi đùa giữa những nấm mộ |
| `quanhuyen` | Con quan huyện | khá giả | Thêm nhiều bạc; giao tình với quan phủ cao | nhiều | Đế Nghiệp | là con quan huyện {$que}, chưa từng phải đi chân đất |
| `dichtu` | Đích tử thế gia tu tiên | khá giả | Một tâm pháp gia truyền, 1 đan; trắc linh công khai: vô linh căn thì bị gạt khỏi gia phả | nhiều | Phi Thăng Lộ | là đích tử một thế gia tu tiên ở {$que}, cả họ đặt hy vọng lên vai |
| `phuho` | Con trưởng phú hộ | khá giả | Thêm nhiều bạc, một cửa hiệu thừa kế | rất nhiều | Phú Giáp Thiên Hạ | là con trưởng nhà phú hộ ở {$que}, sổ sách học trước chữ |
| `hautong` | Hậu duệ tông môn sa sút | khá giả | Một bí tịch tàn, lệnh bài tông cũ | vừa | Phi Thăng Lộ | là hậu duệ một tông môn đã tàn ở {$que}, chỉ còn một tấm biển mục |
| `hoangtoc` | Chi thứ hoàng tộc | khá giả | Thêm bạc; tuyến Oán với một nhánh hoàng tộc khác | nhiều | Đế Nghiệp | là con cháu chi thứ hoàng tộc {$quoc}, sống ẩn ở {$que} |

Mỗi xuất thân mới cần: mã, tên, biểu tượng, tác dụng (`fx`), tiền khởi đầu, nhóm, tính tình cho thể chất (`TT_TRAITS`), tiểu sử, mệnh tuyến, 3 cảnh mở đầu. Các xuất thân hiện có cần thêm trường **nhóm** (khốn khó / thường / khá giả): khốn khó = khất cái, bị bỏ ở miếu, mang huyết mạch ma tộc, kẻ trốn nợ qua đèo, đứa trẻ nhặt ở bậc cửa, đứa trẻ lớn sau bếp, trẻ ẩn dưới sàn đan, kẻ mang tro về quê, người làm thuê ở mỏ; khá giả = con thứ thế gia, con nhà buôn, người thừa kế sạp bạc, hậu duệ người coi ấn; còn lại = thường.

### 16.3 Trường lưu mới (mọi trường phải đọc kiểu `r.x||0` cho bản lưu cũ)

| Nơi | Trường | Kiểu | Mặc định bản lưu cũ |
|---|---|---|---|
| `G.run` | `ck`, `tk` | số | chuyển từ `karma` (8.6) |
| | `phuc`, `nghiep` | số | chuyển từ `karma` |
| | `tucPhuc`, `tucNghiep` | số | 0 |
| | `tuyen` | mảng tuyến | [] |
| | `nqLog` | mảng dòng Sổ Nhân Quả | [] |
| | `rootKnown` | 0/1 (đã trắc linh) | 1 |
| | `rootFix` | tiến độ cải tạo đang làm | null |
| | `bac` | số văn | 0 |
| | `food`, `foodLv`, `hunger` | số | đủ ăn |
| | `fatigue` | số giờ làm trong ngày | 0 |
| | `family` | mảng người thân | [] |
| | `paths` | { mã đường: {xp, bac, last} } | {} |
| | `pin` | đường chủ đạo ghim | null |
| | `vo` | { bậc võ, nội lực, xp } | null |
| | `pm` | pháp môn chính (tối đa 2) + tài nguyên riêng | [] |
| | `tue` | { lastAge, cộng dồn theo chỉ số } | { lastAge: tuổi hiện tại } |
| | `tut` | { đang mở, xong, bỏ qua, ẩn } (chỉ kiếp 1) | không tạo |
| | `arc` | { mệnh tuyến, hồi, nút, cờ } | null |
| | `chiHuong`, `chiDoi` | mã, số lần đổi | null, 0 |
| `G.meta` | `mong` | mảng Mộng Ấn | [] |
| | `gacBen` | số lần nhận ra Người Gác Bến | 0 |
| | `tuyenCarry` | tuyến mang sang kiếp sau | [] |
| | `tut25` | cờ tân thủ tốt nghiệp | 0 |
| `world` | `chron` | trạng thái 12 đại sự | sinh mới theo năm hiện tại |
| | `lineage` | dòng họ của người chơi | [] |
| | `vophai` | võ phái do người chơi lập | [] |
| | `dynasty` | triều đại hiện tại và lịch sử | sinh từ `quoc` |
| | `maVuc` | ô/khu thành ma vực | [] |

### 16.4 Nội dung cần viết (theo schema sự kiện, giọng văn 3.4)

| Nhóm | Số cảnh |
|---|---|
| Trắc linh: 5 cách × 3 kết quả (vô / thường / tốt) | 15 |
| Vô linh căn bị coi là phế vật: Bị đuổi khỏi lễ tuyển đồ · Từ hôn · Gạt khỏi gia phả · Em ruột lên núi · Tu sĩ trẻ làm nhục · Làm dược nhân · Tạp dịch bị sai · Hàng xóm xì xào · Ngước nhìn kiếm quang trên trời · Kết bạn với người cùng cảnh · Thầy bói lắc đầu · Đêm tĩnh tọa vô ích | 12 |
| Cải tạo linh căn: 15 đường × trung bình 3 cảnh + 4 đường phụ | 49 |
| Gia đình | 14 |
| Phàm đạo: 17 × 12 | 204 |
| Tu đạo: 18 × 12 (thể tu chờ) | 216 |
| Tình huống mơ hồ | 30 |
| Quả chín cho các hành vi có cột "Quả chín" | 30 |
| Nhân quả tuyến xuyên kiếp (tận dụng 8 sự kiện có sẵn, thêm) | 16 |
| Biến cố tuế biến cần cảnh: giúp người, hành hiệp, bị khiêu chiến, thấy âm hồn, khắc thân, kỳ ngộ nhỏ (6 nhóm × 3) | 18 |
| Tân thủ: bà lão xuống núi bản tân thủ | 1 |
| Mệnh tuyến: nút + kết cục | ~216 |
| Mở đầu xuất thân: 57 × 3 | 171 |
| Thời cục: 12 × 3 giai đoạn × ~3 cảnh | ~108 |
| Đại Mộng: 9 Mộng Ấn + Người Gác Bến 6 × 2 | 21 |
| Văn bia | 180 câu |

### 16.5 Giao diện cần làm (đều ở `src/react`, màn mới đăng ký trong `main.jsx`)
- Bảng Nhân vật: dòng **Đạo Hướng** (chữ + thanh hai màu), dòng **Nhân Quả** (chữ), thẻ **Đạo đồ**, dòng "Theo năm tháng" trong tooltip khí vận/thể chất/mệnh cách, linh căn "chưa trắc".
- Thẻ đầu thai: "Linh căn: chưa trắc" (kiếp 2+), câu gợi ý mơ hồ khi có Thiên nhãn.
- HUD: tiền bạc bên cạnh linh thạch; trạng thái ăn (biểu tượng bát cơm).
- Sổ tay: thẻ **Nhân quả**, thẻ **Mệnh thư** (mệnh tuyến + chí hướng + thời cục đang diễn ra).
- Khung **Tân thủ** (13.2).
- Màn Hết kiếp: Quả chín, mệnh tuyến, Mộng Ấn, văn bia mới.
- Bến Vong Xuyên: hội thoại Người Gác Bến, Mộng Ấn đã có.
- Bảng chuẩn bị đột phá: lời báo kiếp dữ / công đức hộ thể; tỉ lệ bằng chữ.
- Thẻ địa điểm: nhóm nút "Mưu sinh".

### 16.6 Quy ước cho người viết nội dung (bổ sung GUIDELINE)
- Hiệu ứng sự kiện mới dùng `deed` (mã bảng 10) hoặc `ck`, `tk`, `phuc`, `nghiep`; **không dùng `karma`** nữa (bộ kiểm `content:check` báo lỗi khi gặp `karma` ở mục mới).
- Hạt quả chín: `seed: {loai, tre_thang, phuc, nghiep, ai}`. Tuyến: `tuyen: {loai, muc, ai, han}`.
- Tiền phàm: `bac` (đơn vị văn). Kinh nghiệm đạo đồ: `path: {id, xp}`.
- Mỗi lựa chọn "thiện" phải có ít nhất một nhánh xấu và ngược lại (trụ cột "Không phán xét").
- Không viết số trong lời kể về Đạo Hướng, Nhân Quả, tuế biến.

---

## 17. Bài kiểm tra cần thêm

**`tools/test.js` (luật)**

| Bài | Kiểm |
|---|---|
| `vo_kiep1` | 1.000 lần tung ở kiếp 1: không lần nào ra vô linh căn |
| `vo_kiep2` | Nhân quả 0: tỉ lệ vô linh căn 40–50%; bậc +4 không dưới 30%, bậc −4 không trên 65% |
| `vo_the_chung` | Kiếp 2+: mọi thẻ đầu thai cùng một linh căn và hiện "chưa trắc" |
| `trac_linh` | Trắc linh xảy ra trong tháng 1–3 bằng một trong 5 cách |
| `vo_khong_tu` | Vô linh căn: tu vi luôn 0, không dẫn khí, tâm pháp bảo đảm không làm tu được |
| `cai_tao` | Mỗi đường cải tạo cho đúng loại linh căn; trần cảnh giới chặn đột phá |
| `dao_huong` | Tính hướng và độ đậm; chữ đúng bậc; làm trái hướng tăng tâm ma; Tùy Tâm không bị |
| `nhan_qua` | Phúc và Nghiệp không xóa nhau; bậc đúng; "Thiện ác đan xen"; sang kiếp ×0,5 |
| `qua_chin` | Hạt chín đúng hạn; chết trước hạn thì mở ở Sổ Nhân Quả |
| `kiep_nghiep` | Uy lực, số đạo, loại kiếp, thưởng, phần nghiệp tiêu theo bảng 9.7; công đức hộ thể |
| `tue_bien` | Qua năm chạy đúng một lần mỗi tuổi; trần; Hỏa Linh Chi Thể hồi không vượt đầy; không cộng dồn hai nguồn cùng loại |
| `com_ao` | Đói theo ngày; chết đói ngày 15; Trúc Cơ tịch cốc |
| `tan_thu` | Chỉ kiếp 1; A tuần tự; B tối đa 3; bỏ qua không có thưởng; tốt nghiệp từ 25 |
| `luu_cu` | Bản lưu có `karma` chuyển đúng sang Chính khí/Tà khí/Phúc/Nghiệp |
| `menh_tuyen` | Lỡ hạn → tự diễn → nhánh "Người đứng ngoài", không kẹt; chuyển mệnh tuyến một lần |

**`tools/test-ui.js` (giao diện)**: khung tân thủ hiện, bấm thẻ mở đúng bảng / làm nhấp nháy đúng nút, nút Bỏ qua mở hộp xác nhận đúng chữ, nút ẩn/hiện; tooltip Đạo Hướng, Nhân Quả, "Theo năm tháng" **không chứa chữ số**; thẻ đầu thai kiếp 2 ghi "chưa trắc".

Bot chỉ dùng khi người dùng yêu cầu (đo độ khó Phần 4).

---

## 18. Lộ trình triển khai theo đợt

| Đợt | Nội dung | Vì sao trước |
|---|---|---|
| 1 | Tách `karma` → Đạo Hướng + Nhân Quả, bảng hành vi, chuyển bản lưu, thay mọi chỗ dùng, thiên kiếp công bằng | Mọi phần sau dựa vào hai thước đo này |
| 2 | Vô linh căn, tung một lần, giấu thẻ, trắc linh, khôi phục Vô Căn; móc "qua năm" + tuế biến | Cốt lõi yêu cầu 1–4, 10 |
| 3 | Tiền bạc, cái ăn, việc làm thuê, gia đình cơ bản | Cần cho đời vô linh căn |
| 4 | Tân thủ 30 nhiệm vụ | Chỉ dựa vào tính năng đã có + đợt 1 |
| 5 | Võ đạo + 5 phàm đạo đầu (Nông dân, Ngư dân, Thương nhân, Võ giả, Lang trung) | Cho vô linh căn có đời sống |
| 6 | 15 đường cải tạo linh căn | Cần đợt 2, 3, 5 |
| 7 | 12 phàm đạo còn lại; tu đạo và pháp môn theo cụm (kiếm/thần thức → trận/phù → ngự thú/triệu hoán → huyết/hồn/thôn phệ/thi → phật/lôi/nho → cổ/độc/khôi lỗi/âm/huyễn/ẩn sát/thiên cơ) | Khối lớn nhất |
| 8 | Thời cục 12 đại sự + 2 mệnh tuyến đầy đủ làm mẫu (Phi Thăng Lộ, Thế Gia Vạn Đại), rồi 7 mệnh tuyến còn lại, 12 xuất thân mới, cảnh mở đầu | Cần đạo đồ để vai trò có nghĩa |
| 9 | Đại Mộng, Mộng Ấn, kết thúc thật, văn bia | Đỉnh của toàn bộ |
| 10 | Chỉnh độ khó Phần 4 | Chỉ khi người dùng cho chạy bot đo |

---

## 19. Những điểm cần bạn xác nhận

1. **Giấu linh căn trên thẻ đầu thai từ kiếp 2** (để không né được vô linh căn). Đề xuất: đồng ý.
2. **Thêm tiền phàm (bạc, văn)** — đổi giá ở mọi quán phàm. Đề xuất: đồng ý, vì không có nó thì không tả được "kiếm ngày ba bữa".
3. **Phi thăng khi chưa tỉnh mộng vẫn là "Mộng trong mộng"** (kết thúc thật cần 9 Mộng Ấn). Đề xuất: đồng ý — khớp chủ đề "thức tỉnh rồi mới thoát".
4. **Kết cục Diệt thế làm thế giới các kiếp sau thành đất ma** (rất nặng, nhưng đúng "thế giới nhớ"). Có thể giảm thành "ba khu thành ma vực".
5. Mức **45%** vô linh căn và khoảng **30–65%**.
6. Lời giải của Đại Mộng (Mộng Ấn #9: vòng mộng do chấp niệm "không muốn chết" của chúng sinh dệt nên).
