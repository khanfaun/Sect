# Phù Sinh — Bản phân tích hợp nhất (Claude + GPT)

Ngày soạn: 18/11/2026 · Loại: tài liệu thiết kế, **chưa sửa mã**.

## Cách đọc file này

File gộp hai bản phân tích viết độc lập cho cùng 13 yêu cầu:

| Phần | Nội dung | Vai trò |
|---|---|---|
| **Phần A** (ngay dưới) | Quyết định hợp nhất: chủ đề nào lấy của ai, sửa gì, ghép thế nào | **Có quyền cao nhất** |
| **Phần B** | Toàn văn bản phân tích của Claude (`docs/thiet-ke/PHAN-TICH-NHAN-SINH-LUAN-HOI.md`) | Tra chi tiết |
| **Phần C** | Toàn văn bản phân tích của GPT (nhánh `docs/phu-sinh-nhan-sinh-luan-hoi`, `docs/phan-tich-nhan-sinh-luan-hoi-phu-sinh.md`) | Tra chi tiết |

**Luật khi hai phần nói khác nhau:** Phần A thắng. Phần A không nhắc tới thì làm theo phần mà A chỉ định cho chủ đề đó. Phần B, C được chép nguyên văn để giữ đủ dữ liệu, nên bên trong chúng vẫn còn những số đã bị A thay; gặp mâu thuẫn thì quay về A.

Ký hiệu: **[B]** = lấy từ bản Claude, **[C]** = lấy từ bản GPT, **[A]** = quyết định mới khi ghép.

Quyết định của người dùng đã áp dụng:
- Tỉ lệ vô linh căn **45%**, thay đổi theo nghiệp trong khoảng 30–65%.
- Thể chất, khí vận: **giữ bộ đang có** của game, thêm tác dụng theo năm, nhặt thêm ý hay của GPT.
- Bí ẩn luân hồi: **cốt của GPT + Mộng Ấn của Claude**.
- Cốt truyện: **45 tuyến xuất thân của GPT + biến cố thế giới của Claude + ghép 9 cốt truyện của Claude** (cách ghép ở A.9).
- Tiền tệ năm loại; diệt thế tạm thời làm 3 khu đất ma.
- Phần thưởng khi vượt thiên kiếp khó: tối đa **+10%**.
- Tiền phàm dùng đồng và quan; **1 linh thạch = 100 lượng bạc (100 quan)**.
- Luân hồi: **không được chọn nhân vật hay xuất thân**, tất cả ngẫu nhiên; **quên sạch** khi đầu thai. Chỉ ngoại lệ khi có vật phẩm, công pháp hoặc kỹ năng cho phép (A.16).
- Thời gian giữa hai kiếp tối đa 5.000 năm, với điều kiện không làm hỏng cốt truyện (đã kiểm ở A.17).
- Người Gác Bến: để Claude tự quyết (A.10).

---

## A.1 Bảng quyết định theo từng chủ đề

| # | Chủ đề | Lấy | Tóm tắt quyết định | Tra ở |
|---|---|---|---|---|
| 1 | Mục tiêu, giọng văn | [B] + [C] | Định nghĩa và mô-típ của B (Bến Vong Xuyên, chuông, Người Gác Bến); luật "tuyệt vọng có ý nghĩa" của C: không phải lòng tốt nào cũng bị phản, phản bội phải có động cơ có sẵn, hi vọng nhỏ là thật | B §3, C §3.4 và §6 "Lời hứa cảm xúc" |
| 2 | Vòng chơi, thời gian dừng khi đọc | [C] | Bốn tầng mục tiêu (trước mắt / trung hạn / cả đời / nhiều kiếp); thế giới dừng khi đọc sự kiện, mở bảng; nhảy thời gian phải giải từng mốc theo thứ tự, chết giữa chừng thì dừng ở lúc chết | C §3 |
| 3 | Tham khảo tác phẩm | [B] + [C] | Giữ cả hai danh sách | B §2, C §4 |
| 4 | Độ khó | [B] + [C] | Chỉ tiêu tỉ lệ đạt cảnh giới, hệ số đột phá của B; nguyên tắc của C: khó vì thiếu tiền, thuốc, tin, thời gian, không vì nút bấm chết ngẫu nhiên; luôn có do thám, chuẩn bị, rút lui; thua không mặc định chết. **Thiên kiếp dùng bảng sáu cửa TK01–TK06 của C** (có cả kiếp Luyện Khí → Trúc Cơ, đúng hướng "khó hơn") | B §4, C §5.4–5.5 |
| 5 | Linh căn | [A] | Bảng 8 loại + **phẩm chất 4 bậc** (Khuyết / Thường / Thuần / Viên Mãn) của C; tỉ lệ 45% đã chốt (A.2) | A.2 |
| 6 | Màn đầu thai | [A] | **Không còn chọn thẻ**: nhân vật kiếp mới sinh ngẫu nhiên; linh căn vẫn "chưa trắc" tới lúc trắc linh. Câu hỏi A/B/C ở B §5.3 không còn cần (A.16) | A.16 |
| 7 | Vô linh căn bị khóa những gì | [C] | Luật khóa của C chặt hơn và rõ hơn: khóa cả thể tu, huyết thuật, hồn thuật, thần thức thuật; võ học phàm không được đổi tên để vượt khóa. Phần bù đắp cho vô căn của B vẫn giữ | C §5.1, B §5.4 |
| 8 | Cải tạo linh căn | [A] | 8 đường chính thức CC01–CC08 của C + 10 đường bổ sung của B không trùng (A.3) | A.3 |
| 9 | Chính tà / nhân quả / danh tiếng | [A] | Ba thước đo của C (Hành Đạo, Nghiệp Duyên, Danh tiếng) với cơ chế của C, cộng phần "làm trái hướng thì đạo tâm dao động" và bảng hành vi của B (A.4) | A.4 |
| 10 | Thiên kiếp công bằng | [A] | Công thức của C, nâng trần phần thưởng (A.5) | A.5 |
| 11 | Đầu thai, kiếp sau | [C] + [B] | Ba nhóm hoàn cảnh (bấp bênh / bình thường / được nâng đỡ) và Dư Nghiệp, Dư Ân của C; cộng điều chỉnh tỉ lệ vô căn, xuất thân mới, nhân quả tuyến xuyên kiếp của B | C §5.4, B §9.5, §9.9, §16.2 |
| 12 | Tuế biến (tác dụng theo năm) | [B] + nhặt [C] | Bảng 33 thể chất, 74 khí vận, 18 mệnh cách của B; thêm 4 thể chất và 10 khí vận mới từ C; nhận luật vận hành của C (A.6) | A.6 |
| 13 | Tiền tệ, giá cả, ăn ở | [A] | Năm loại tiền của B; **đơn vị và bảng giá của C** (đồng, quan; 40 món, chỗ ở, hộ gia đình) (A.7) | A.7 |
| 14 | Nghề phàm nhân | [A] | 18 nghề của C + 3 nghề riêng của B = **21 nghề** (A.8) | A.8 |
| 15 | Võ học phàm nhân | [B] + [C] | 6 bậc và 14 bí tịch của B; luật của C (không mở linh lực, không kéo thọ) | B §7.3, C §5.1 |
| 16 | Nghề tu và pháp môn | [A] | 16 nghề tu TU01–TU16 và 48 chiêu của C làm **lõi**; phần của B không trùng làm **mở rộng** (A.8) | A.8 |
| 17 | Chính đạo / ma đạo / tán tu | [C] | Là trục phe, **không phải nghề** | C §6 "Đại đạo ba ngàn" |
| 18 | Thế giới, địa điểm, nhân vật, thế lực | [C] | 15 địa điểm neo LOC01–LOC15, 30 nhân vật NP01–NP30, 10 thế lực FA01–FA10 | C §6, §7 |
| 19 | Cốt truyện xuất thân | [C] | 45 tuyến OR01–OR45 (mỗi tuyến 5 nút, 3 kết) | C §6 |
| 20 | Biến cố thế giới | [A] | 6 đồng hồ CLK của C + 8 đại sự của B = **14 đồng hồ** (A.9) | A.9 |
| 21 | 9 cốt truyện lớn của B | [A] | Ghép thành **9 Đại lộ**: con đường đời lớn, ai cũng đi được, dẫn tới các kết thúc của C (A.9) | A.9 |
| 22 | Bí ẩn luân hồi, kết thúc | [A] | Thế giới Cổ Giới, 3 tri thức TRI01–03, 8 kết thúc END01–END08 của C; Mộng Ấn và Người Gác Bến của B là cách tìm ra tri thức (A.10) | A.10 |
| 23 | Thời gian giữa hai kiếp, đất ma | [B] | Giữ nguyên | B §14.8, §14.9 |
| 24 | Sự kiện mẫu | [C] + [B] | 12 sự kiện hoàn chỉnh EV01–EV12 của C làm **mẫu chuẩn**; 30 tình huống của B làm đề cương, sửa theo A.11 | C §8, B §11 |
| 25 | Nhiệm vụ tân thủ | [A] | 18 nhiệm vụ của C làm xương sống + 9 nhiệm vụ tu tiên của B = **27 nhiệm vụ** (A.12) | A.12 |
| 26 | Nghi thức kết hành trình | [C] | Giữ nguyên | C §9 |
| 27 | Thuộc tính, chế tạo, chiến đấu, trạng thái, đối thủ | [C] | Bộ nền B.1–B.11 của C | C §12 |
| 28 | Danh mục dữ liệu, trường lưu | [B] + [C] | Gộp, xem A.13 | B §16, C §11 D5–D8 |
| 29 | Kiểm tra / nghiệm thu | [B] + [C] | Bài kiểm tra của B, ma trận nghiệm thu của C | B §17, C §11 D10–D11 |
| 30 | Lộ trình | [A] | A.14 | A.14 |

---

## A.2 Linh căn: bảng tỉ lệ cuối cùng

Loại căn và hệ số theo C; tỉ lệ kiếp 2 trở đi theo con số người dùng đã chốt: 45% vô căn, 55% còn lại chia theo tỉ trọng kiếp đầu của C.

| Mã | Loại | Hệ số tu | Kiếp đầu | Kiếp 2+ (trước điều chỉnh nghiệp) |
|---|---|---|---|---|
| LC00 | Vô linh căn | — | 0% | **45%** |
| LC01 | Ngũ hành tạp linh căn | 0,70 | 17,5% | 9,6% |
| LC02 | Tứ linh căn | 0,85 | 25% | 13,75% |
| LC03 | Tam linh căn | 1,00 | 30% | 16,5% |
| LC04 | Song linh căn | 1,20 | 17,5% | 9,6% |
| LC05 | Thiên linh căn | 1,60 | 4,75% | 2,6% |
| LC06 | Biến dị linh căn (Băng / Phong / Lôi) | 1,45 | 5% | 2,75% |
| LC07 | Cực linh căn | 1,50 | 0,25% | 0,15% |

- **Phẩm chất** [C]: mỗi bộ căn (trừ vô căn) rút thêm phẩm Khuyết 20% (×0,75) · Thường 65% (×1,00) · Thuần 14% (×1,15) · Viên Mãn 1% (×1,30).
- **Điều chỉnh theo nghiệp** [A]: tính theo Thiện duyên (G) và Nghiệp chướng (B) chưa giải quyết lúc chết của kiếp trước, dùng ngưỡng nhãn của C (3 / 15 / 50):

| Nghiệp chướng B | Cộng vào % vô căn | Thiện duyên G | Trừ khỏi % vô căn |
|---|---|---|---|
| dưới 3 | 0 | dưới 3 | 0 |
| 3–15 | +4 | 3–15 | −3 |
| 15–50 | +10 | 15–50 | −8 |
| từ 50 | +20 | từ 50 | −15 |

  Kết quả kẹp trong **30–65%**. Phần còn lại chia lại theo đúng tỉ trọng trên. Nâng cấp luân hồi "Túc Căn" của B vẫn giữ, sàn 30%.
- C muốn nghiệp **không** chạm tới tỉ lệ vô căn (để "tà" không thành án mất quyền tu tiên). Đã chọn giữ điều chỉnh theo nghiệp vì yêu cầu gốc nói "gieo nghiệp nhiều thì khởi đầu càng không thuận lợi". Để không quá nặng tay, điều chỉnh **chỉ dùng Nghiệp chướng thật sự gây hại cho người khác**, không dùng Hành Đạo nghiêng tà.
- Thứ tự sinh [C]: linh căn → thể chất → khí vận → xuất thân và hoàn cảnh. Linh căn chốt lúc xác nhận đầu thai, tải lại không rút lại.

---

## A.3 Cải tạo linh căn: 18 đường

**Luật chung lấy của C:** mỗi kiếp tối đa **một lần cải căn thành công**; vật liệu chính là nguồn có thật trên thế giới, có người tranh, có lịch hồi phục, chết đi đầu thai không tự sinh lại; trước khi làm phải biết rõ cái giá; được dừng trước bước cuối; ít nhất CC01 và CC03 phải làm được bằng sức lao động của người vô căn. Tuổi thọ còn lại tối thiểu cho từng đường theo C.

**Kết quả cải căn** dùng đúng bảng linh căn ở A.2 kèm phẩm chất (thường là Khuyết hoặc Thường). **Bỏ** 8 loại "hậu thiên linh căn" riêng của B (tàn căn, ngụy căn…) cho gọn, trừ **Văn tâm** (Nho tu) vì nó không dùng linh khí.

| Nhóm | Đường | Nguồn | Thay thế / ghi chú |
|---|---|---|---|
| Chính thức [C] | CC01 Tái Mạch Đan | Bách Thảo Cốc (LOC10), 18 tháng phục vụ cứu dịch | Thay "Khai Linh Đan" của B |
| | CC02 Địa Mạch Linh Tủy | Mỏ bỏ ở Hàn Thiết Lô (LOC11) | Thay "Địa Tâm Linh Tủy", "Canh Kim Tủy" của B |
| | CC03 Ngũ Hành Dưỡng Căn Pháp | Vườn dược Thanh Khê Thôn (LOC01), 5 năm chăm | Thay "Ngũ Hành Linh Quả" của B |
| | CC04 Hóa Sinh Liên | Hồ cổ Tịch Chiếu Bến (LOC09), 30 năm nở một lần | Thay "Mộc Linh Tủy", "Hàn Tủy" của B |
| | CC05 Tàn Hỏa Chủng | Tàn lò Hàn Thiết Lô | Thay "Hỏa Tủy" của B |
| | CC06 Huyết Mạch Khế | Vạn Thú Môn (LOC08) | **Gộp "Giao Long Tinh Huyết" của B** làm một nhánh: cứu giao long thì nó tự nguyện ký khế, giết lấy máu là nhánh cưỡng ép có hậu quả của C |
| | CC07 Vay Căn Nghịch Mệnh | Huyết Sát Cốc (LOC07) | **Gộp "Đoạt Căn Thuật" của B** làm nhánh sát hại |
| | CC08 Tinh Hồn Kết Căn | Huyền Cơ Trận Các (LOC05) + 3 mảnh sao | Giữ nguyên |
| Bổ sung [B] | Tẩy Tủy Phạt Mạch Kinh | Võ phái, ẩn sĩ | 3 năm khổ luyện → LC01 hoặc LC05 phẩm Khuyết |
| | Tiên nhân quán đỉnh | Lão tu sĩ hấp hối trong hang, cổ mộ | Nhận căn của người truyền, phẩm tối đa Thường; mang tuyến **Di nguyện** |
| | Huyết Tế Khai Mạch | Ma địa | Ra LC05 hệ Thủy phẩm Khuyết, đánh dấu "huyết căn" (chỉ tu huyết thuật nhanh); Nghiệp theo C |
| | Linh Căn Cổ | Cổ sư Nam Trạch | Ra căn phẩm Khuyết; nuôi cổ hằng tháng |
| | Thiên Lôi Quán Thể | Đỉnh núi trong giông mùa hạ | 5% ra LC06 Lôi; còn lại chết hoặc trọng thương |
| | Phật môn Xá Lợi | Chùa tông Phật, 5 năm giữ giới | LC05 Thổ hoặc Kim phẩm Thường |
| | Dưỡng Hạo Nhiên Khí | Đỗ đạt + ngộ lời thánh hiền | **Văn tâm** (chỉ tu Nho) |
| | Túc căn kiếp trước | Vật bản mệnh đã chôn ở kiếp trước | Giống căn kiếp trước, hạ một bậc phẩm |
| | Làm dược nhân | Ma tông thử thuốc | 10% ra LC01 phẩm Khuyết; 70% chết |
| | Tạo Hóa Thần Dịch | Di tích trên thiên lộ | Chỉ dùng để **nâng phẩm** người đã có căn, không cho người vô căn |

- Mọi đường bổ sung của B phải viết lại theo khuôn của C: hai chứng cứ thật + nguy cơ lừa · điều kiện và chi phí · kết quả / thất bại / giới hạn · tuổi thọ tối thiểu.
- Thưởng Các của B **bỏ Khai Linh Đan**, thay bằng "**Manh mối cơ duyên**" (60 Thưởng Lệnh, bậc Huyền bài): mở một đầu mối kiểm chứng của một đường CC còn khả dụng.

---

## A.4 Ba thước đo: Hành Đạo, Nghiệp Duyên, Danh tiếng

Lấy **khung của C**, vì nó giải quyết đúng điều yêu cầu 7 muốn mà bản B làm chưa tới: xét **ý định, điều người chơi biết lúc chọn và ai chịu hại**, nên bị bà lão lừa không bị tính là sai.

| Thước đo | Đo cái gì | Dùng vào đâu | Hiển thị | Nguồn |
|---|---|---|---|---|
| **Hành Đạo** (thay "Đạo Hướng" của B) | Cách hành xử của kiếp này: che chở, giữ lời ↔ cưỡng đoạt, cấm thuật | Lợi / hại kiếp này | 5 nhãn của C: Chính tâm kiên định · Nghiêng về chính đạo · Chính tà đan xen · Nghiêng về tà đạo · Tà niệm ăn sâu | C §5.4 |
| **Nghiệp Duyên** (thay "Nhân Quả" của B) | Hậu quả thật lên người khác, có chủ thể | Thiên kiếp kiếp này, hoàn cảnh kiếp sau, tỉ lệ vô căn | Hai câu riêng: Thiện duyên (4 bậc) và Nghiệp chướng (4 bậc) của C | C §5.4 |
| **Danh tiếng** | Điều từng người, từng thế lực **tin** về mình (có thể sai, bị vu oan) | Giá cả, quyền vào tông, truy nã, ai chịu giúp | Theo từng thế lực / vùng | C §5.4 |

Ghép thêm từ B:
1. **Đạo tâm dao động khi làm trái hướng** [B §8.5]: làm việc ngược với nhãn Hành Đạo hiện tại thì tâm ma tăng; "Chính tà đan xen" không bị.
2. **Hiệu ứng xã hội của B** ở bảng §8.4 (giá cả, tông từ chối, thành treo thưởng, phàm dân sợ) **chuyển sang Danh tiếng**: chúng xảy ra vì người ta *biết* hoặc *tin*, không tự xảy ra vì nhãn Hành Đạo. Hành Đạo chỉ giữ lợi hại thân thể theo C: nghiêng chính → che chở mạnh hơn; nghiêng tà → ra đòn mạnh hơn, khó hồi phục hơn.
3. **Bảng 55 hành vi** [B §10] đổi thành **mức gốc tham khảo** cho người viết sự kiện: mỗi dòng phải ghi lại theo công thức của C (mức tổn hại 1 / 3 / 8 / 15 × chủ ý × phạm vi trách nhiệm). Hai cột CK/TK của B thành điểm P/T của Hành Đạo.
4. **Hạt quả chín, Sổ Nhân Quả, Nhân Quả Tuyến** [B §9.4, §9.9, §9.10] giữ, đổi tên thành "Sổ Nghiệp Duyên"; khớp với "sổ hành động" của C (người gây, người chịu, ý định, mức biết trước, bằng chứng, trạng thái).
5. Chữ "Thiện ác đan xen" của B không cần nữa: hai câu riêng của C đã nói được người vừa nhiều ân vừa nặng oán.
6. Bỏ cách tính "mang 50% sang kiếp sau" của B; dùng cách của C: chết thì dùng B/G để chốt hoàn cảnh đầu thai, kiếp mới bắt đầu sổ trắng, món nợ cũ thành Dư Nghiệp / Dư Ân có người thật và sự kiện tái ngộ.

---

## A.5 Thiên kiếp công bằng

Dùng công thức của C (C §5.4 "Tái sinh và thiên kiếp"), sửa một chỗ:

| Mục | C | Hợp nhất |
|---|---|---|
| Sức kiếp K | 1 + min(0,60; 0,004 × B) | giữ |
| Sát thương kiếp | 1 + 0,75 × (K − 1) | giữ |
| Thưởng khi vượt | 1 + min(0,20; 0,0015 × B) | **1 + min(0,10; 0,0015 × B)** — người dùng chốt trần 10%. Ở B ≈ 67 đã chạm trần; ở B = 100: kiếp mạnh hơn 40%, thưởng hơn 10%. Nghiệp nặng vì thế chủ yếu là **rủi ro**, phần thưởng chỉ đủ để không thấy vô ích |
| Nghiệp Hỏa | Thay Âm Hàn ở cửa TK04 khi B ≥ 15 | giữ, và áp cho mọi cửa có lôi |
| Người nhiều Thiện duyên | Không có hệ số thiên vị; được người mang ơn tới hộ trận, cho thuốc, báo tin | giữ, **bỏ "công đức hộ thể" của B** |
| Phàm nhân | Không có thiên kiếp | Giữ thêm **Nhân kiếp** của B (tai ương phàm trần khi nghiệp nặng) |

---

## A.6 Tuế biến (tác dụng theo năm)

- **Giữ bảng của B** cho 33 thể chất, 74 khí vận, 18 mệnh cách đang có (B §12).
- **Thêm từ C** (chép dòng của C ở §5.6, đổi mã sang mã mới khi nhập dữ liệu):
  - 4 thể chất: TC13 **Linh Nhĩ Thể** · TC16 **Khổ Mạch Thể** (chỉ lớn lên khi đủ ăn và lao động) · TC17 **Thích Ứng Thể** · TC18 **Thú Tức Thể**.
  - 10 khí vận: KV01 Phùng Hung Hóa Cát · KV02 Quý Nhân Lưu Ý · KV04 Tài Lộc Bạc Phận · KV05 Bần Hàn Dưỡng Chí · KV07 Duyên Dược Thảo · KV08 Cổ Vật Gọi Tên · KV09 Nhân Duyên Chằng Chịt · KV10 Vãn Thành Chi Mệnh · KV11 Mộng Tỉnh Sớm · KV12 Bình Sinh Yên Ả.
  - Không lấy TC01–TC12, TC14, TC15, KV03, KV06 vì trùng ý với thể chất / khí vận đang có (vd Man Hoang Lực Thể, Hỏa Linh Chi Thể, Thiên Sát Cô Tinh).
- **Lấy ý "đánh đổi" của C** cho vài dòng của B: Man Hoang Lực Thể ăn nhiều hơn (đói nhanh hơn 15%); Phong/Tật Phong mang vác kém hơn; Hậu Thổ / Thổ Linh đi bộ chậm hơn một chút.
- **Luật vận hành của C**: một năm = một mốc tính; nhảy nhiều năm thì áp đủ từng mốc theo thứ tự; chết giữa khoảng nhảy thì dừng ở lúc chết; tải lại không áp lần nữa; tác dụng cần linh lực "ngủ" cho tới khi có căn.
- **Nhóm năng lực hỗ trợ ST23** của C (giác quan, giao tế, thương lượng, cảnh giác, nhận dược, khảo vật…) được thêm vì nhiều khí vận mới của C và nghề phàm dùng tới.

---

## A.7 Tiền tệ, giá cả, ăn ở

| Mục | Quyết định |
|---|---|
| Năm loại tiền | Của B (B §6.1): linh thạch · bạc · cống hiến riêng từng thế lực · Thưởng Lệnh · điểm luân hồi |
| Đơn vị tiền phàm | Của C: **đồng** và **quan** (1 quan = 1.000 đồng). Thay "văn / lượng" của B |
| Bảng giá phàm | Của C: 40 món BT01–BT40, chỗ ở HS01–HS06, chi tiêu hộ gia đình (C §12 B.2–B.3). **Bỏ bảng giá B §6.2** |
| Tiền công làm thuê của B (B §6.5) | Chia 3 để khớp mặt bằng giá của C (vd bốc vác bến 60 → 20 đồng/ngày) |
| Linh thạch ↔ bạc | **1 linh thạch = 100 quan (100 lượng bạc)** theo người dùng chốt. Tiền trang ở phường thị bán ra khoảng **110 quan**, mua vào khoảng **90 quan** một linh thạch, dao động theo vùng; mỗi tiền trang chỉ đổi số linh thạch có hạn mỗi tháng. So với giá của C (một người lớn ăn 13 đồng/ngày), một viên linh thạch bằng khoảng 20 năm cơm của một người: phàm nhân gần như không bao giờ cầm được linh thạch, đúng ý "hai thế giới" |
| Giá bạc trong Phần B | Mọi giá tính bằng "lượng / văn" còn sót trong Phần B (Trắc Linh Thạch, sính lễ, học võ, mua chức…) quy đổi: **1 lượng của B = 330 đồng** để khớp mặt bằng của C; giá tính bằng linh thạch giữ nguyên. Tích Cốc Đan: 1 linh thạch |
| Cống hiến theo thế lực | Của B (B §6.1.2); sổ gắn với 10 thế lực FA01–FA10 của C và các tông trong `world.sects` |
| Thưởng Lệnh, Thưởng Các | Của B (B §6.1.3), giá giữ nguyên, trừ Khai Linh Đan (xem A.3) |
| Cái ăn, đói | Thanh "no / khát" có số của C (C §12 B.3, B.7); các mốc chết đói, tịch cốc từ Trúc Cơ của B |
| Gia đình | Hộ gia đình của C + sự kiện gia đình, con trắc linh, dòng họ xuyên kiếp của B (B §6.6) |

---

## A.8 Nghề phàm, nghề tu, pháp môn

**21 nghề phàm** = 18 nghề PM01–PM18 của C + 3 nghề của B:

| Nghề | Nguồn |
|---|---|
| Nông dân, Tiều phu, Ngư dân, Thợ mỏ, Thợ rèn, Thợ thủ công, Y sư phàm, Người chép sách, Thương nhân, Phu trạm, Binh lính, Chiến binh giang hồ, Sát thủ phàm, Đạo chích, Nghệ nhân gánh hát, Quan viên, Người chèo đò, Chưởng môn võ phái | C (PM01–PM18) |
| Thợ săn · Tiêu sư · Khất cái (Cái bang) | B |

- Cơ chế từng nghề (đầu vào, sản phẩm, nút quyết định) theo C. Bậc danh vị, 12 sự kiện, 4 kết cục từng nghề lấy của B ở nghề trùng (Lang trung = Y sư phàm, Văn nhân = Người chép sách, Võ giả = Chiến binh giang hồ, Thợ rèn / thủ công gộp từ "Thợ thủ công" của B).
- Tu sĩ vẫn làm nghề phàm được.

**Nghề tu và pháp môn**

| Lớp | Danh sách | Nguồn |
|---|---|---|
| **Lõi** (làm trước) | TU01 Kiếm tu · TU02 Thể tu · TU03 Huyết tu · TU04 Hồn tu · TU05 Thần thức tu · TU06 Triệu hoán sư · TU07 Ngự thú sư · TU08 Trận pháp sư · TU09 Đan sư · TU10 Dược sư tu luyện · TU11 Luyện khí sư · TU12 Phù sư · TU13 Khôi lỗi sư · TU14 Độc tu · TU15 Âm luật tu · TU16 Ảnh sát tu | C (16 công pháp CP01–CP16, 48 chiêu SK01A–SK16C, sản phẩm, vật tư, công thức) |
| **Mở rộng** (làm sau) | Cổ sư · Thi tu · Phật tu · Nho tu · Thiên cơ sư · Thương tu · pháp môn Lôi pháp · Huyễn thuật · Thôn phệ | B (§7.4, §7.5), phải viết lại chiêu theo khuôn số của C |
| Bỏ | Chiêu của B cho những pháp môn đã có trong lõi (kiếm, huyết, hồn, thần thức, triệu hoán, ngự thú, trận, phù, đan độc, khôi lỗi, âm luật, ẩn sát, luyện thể) | Dùng chiêu của C thay |
| Phe | Chính đạo, ma đạo, tán tu là trục phe độc lập | C |

Luật ghép / không ghép pháp môn của B (B §7.5) giữ cho cả lõi lẫn mở rộng.

---

## A.9 Cốt truyện: 45 tuyến xuất thân + 14 đồng hồ thế giới + 9 Đại lộ

### A.9.1 Ba tầng chuyện

| Tầng | Trả lời câu hỏi | Nguồn | Độ dài |
|---|---|---|---|
| **Tuyến xuất thân** OR01–OR45 | "Đời này làm gì với vết thương mình mang từ lúc sinh ra?" | C | Ngắn – vừa, 5 nút, 3 kết |
| **Đại lộ** (9 cái, ghép từ 9 cốt truyện của B) | "Đời này trở thành ai?" | B, sửa theo A.9.3 | Dài, 5 hồi |
| **Đồng hồ thế giới** (14) | "Thế giới đang đi về đâu dù mình có mặt hay không?" | C + B | Kéo qua nhiều kiếp |

Cả ba dùng chung 15 địa điểm, 30 nhân vật, 10 thế lực của C. Tầng thức tỉnh (A.10) chạy song song, độc lập.

### A.9.2 Mười bốn đồng hồ thế giới

| Mã | Đồng hồ | Nguồn | Ghi chú gộp |
|---|---|---|---|
| CLK01 | Mùa đói Thanh Khê | C | Gộp "Hạn Hán Trăm Năm" của B làm phiên bản toàn cõi khi đói kéo 3 năm |
| CLK02 | Nợ của triều đình | C | |
| CLK03 | Biên ải | C | |
| CLK04 | Huyết ước | C | |
| CLK05 | Thú triều | C | Gộp "Thú Triều Bắc Nhạc" của B |
| CLK06 | Đêm Dài trở lại | C | Gộp "Huyết Nguyệt Ma Kiếp" và "Ma Chủ Phục Sinh" của B làm các nấc của Đêm Dài; khi chạm nấc cao mà không ai ngăn → **3 khu thành đất ma** (B §14.9) |
| CLK07 | Đại Hội Thiên Kiêu | B | mỗi 30 năm |
| CLK08 | Tông Chiến Chính–Ma | B | |
| CLK09 | Đổi Ngôi | B | Đặt kinh đô ở Lương Kinh (LOC02); nối với CLK02 |
| CLK10 | Đại Dịch | B | Đặt ở Bách Thảo Cốc / Tịch Chiếu Bến; nối với tuyến OR13 Dược đồng |
| CLK11 | Bí Cảnh Thượng Cổ Mở | B | |
| CLK12 | Tiên Nhân Hạ Phàm | B | Là một nguồn chứng của TRI (A.10) |
| CLK13 | Long Mạch Đứt | B | |
| CLK14 | Thiên Lộ Mở | B | Mở cửa LOC15 dễ hơn cho END04 |

Mọi đồng hồ phải có: nhịp theo năm thế giới, cách can thiệp, kết quả nếu không ai can thiệp (theo khuôn bảng CLK của C).

### A.9.3 Chín Đại lộ (ghép 9 cốt truyện của B)

**Ghép được.** Chín cốt truyện của B không đá nhau với 45 tuyến của C vì chúng trả lời câu hỏi khác: tuyến xuất thân là chuyện riêng gắn với gia cảnh; đại lộ là con đường lớn ai cũng đi được, dẫn tới các kết thúc của C. Cách ghép:

| Đại lộ | Dẫn tới kết thúc (C) | Thường mở từ tuyến xuất thân | Địa điểm chính |
|---|---|---|---|
| Phi Thăng Lộ | END04 Phi thăng tỉnh mộng | OR02, OR09, OR23, OR39, OR45 | LOC05, LOC15 |
| Diệt Thế Ma Đồ | END03 Ma chủ; END08 nếu đủ tri thức; không đủ thì 3 khu đất ma | OR03, OR14 | LOC07, LOC15 |
| Đế Nghiệp | END02 Nhân Hoàng | OR04, OR10, OR17, OR18, OR36, OR37, OR41 | LOC02, LOC13 |
| Phú Giáp Thiên Hạ | END06 (truyền thương hội) hoặc END01 | OR11, OR26, OR33, OR34, OR40, OR44 | LOC03 |
| Huyết Cừu | END01 hoặc chuyển sang đại lộ khác khi báo xong | OR06, OR20, OR30, OR42, OR43 | tùy kẻ thù |
| Võ Lâm Chí Tôn | END06 Truyền một ngọn đèn | OR08, OR19, OR21, OR35 | LOC11, LOC13 |
| Thế Gia Vạn Đại | END06 hoặc END01, dòng họ sang kiếp sau | OR01, OR12, OR16, OR22, OR31 | LOC01, LOC09 |
| Y Giả Độ Thế | END06 | OR13, OR29, OR38 | LOC10 |
| Tỉnh Mộng | Đủ TRI01–03 → END04, END05 hoặc END07 | OR05, OR07, OR15, OR24, OR25, OR27, OR28, OR32 | LOC04, LOC12, LOC15 |

Luật ghép:
1. Đại lộ **mở** khi người chơi đạt một dấu mốc đủ lớn (đóng một tuyến xuất thân, đạt bậc nghề cao, chọn nguyện vọng hợp, làm một việc lớn như giết vua). Cột "thường mở từ" chỉ là gợi ý, không khóa.
2. Nếu tuyến xuất thân đã kể phần mở đầu thì đại lộ **bắt đầu thẳng từ hồi 2**, để không kể lặp.
3. Mỗi kiếp có **một đại lộ chính**, đổi được một lần; chạy song song với tuyến xuất thân.
4. Đại lộ dùng lại nhân vật, địa điểm của C; không sinh nhân vật mới chỉ để giao việc; người chết không sống lại để nói tiếp (luật của C).
5. Hồi 3 và hồi 5 của mỗi đại lộ chạm một đồng hồ thế giới (theo B §14.5).
6. Mười nguyên tắc "kéo chứ không ép" của B (B §14.3) áp cho cả tuyến xuất thân và đại lộ.

**Ảnh hưởng khi ghép:**
- Viết thêm khoảng **9 × 5 hồi × 3–4 nút ≈ 150–180 nút**. Đỡ hơn viết mới hoàn toàn vì nền (người, nơi, thế lực) đã có.
- Phải **chống trùng**: mỗi nút đại lộ cần ghi rõ nó khác nút nào của tuyến xuất thân; bộ kiểm nội dung nên cảnh báo khi hai nút cùng nhân vật, cùng mục tiêu.
- Bảng ánh xạ 45 xuất thân → 9 cốt truyện của B (B §14.6) đổi vai: không còn là "cốt truyện bắt buộc của xuất thân" mà là "đại lộ gợi ý mở trước".
- Bỏ "Chí hướng" 10 mục của B; dùng **nguyện vọng** 8 mục của C (C §3.3), thêm 2 mục của B còn thiếu: "Diệt thế" và "Giàu có".

---

## A.10 Bí ẩn luân hồi và kết thúc

- **Cốt thế giới theo C**: Cổ Giới; Ngũ Tổ lập vòng luân hồi sau Đêm Dài đầu tiên để cứu thế giới, nay vòng ấy lấy ký ức và các mối ràng buộc của sinh linh làm nguồn nuôi; Ngũ Tổ vừa có công vừa mang nợ.
- **Ba tri thức** TRI01–TRI03 và **tám kết thúc** END01–END08 theo C (C §6 "Thức tỉnh và tám kiểu kết thúc lớn"). Nghi thức theo C §9.
- **Mộng Ấn của B thành nguồn chứng** cho ba tri thức (mỗi tri thức cần hai nguồn độc lập, đúng luật của C):

| Tri thức | Mộng Ấn của B dùng làm chứng | Nguồn chứng sẵn có của C |
|---|---|---|
| TRI01 "Vòng đã từng khép" | #1 Bát canh không đáy · #2 Người không già · #3 Mộ của chính mình · #4 Tuồng cũ | Đối chiếu quan trắc LOC05 với LOC12 |
| TRI02 "Ký ức đang nuôi vòng" | #5 Chữ trong quẻ · #6 Kẻ cũng đang mơ · #8 Đáy Vong Xuyên | Chuông LOC12, lõi LOC05, tàn trận LOC15 |
| TRI03 "Cửa có thể chọn" | #7 Vết nứt trên trời (CLK12, CLK14) | Thử mô hình ở LOC15, hồ sơ Ngũ Tổ |

- Mộng Ấn **#9 "Người dệt mộng" của B bỏ**: sự thật về vòng luân hồi giờ là lõi của C.
- **Người Gác Bến** của B giữ: mỗi kiếp hiện một lần dưới hình dạng khác.
- **Đã quyết: Người Gác Bến là mảnh ký ức Yêu Hoàng lưu ra ngoài vòng luân hồi** (điển tích có sẵn của game: "Ngũ Tổ chém Yêu Hoàng"; C: "Yêu Hoàng lưu một phần ký ức ngoài hệ"). Kiểm ảnh hưởng:
  - *Không phá cốt truyện của C*: C vốn viết rằng ai tự nhận hiểu chân tướng cũng chỉ giữ từng mảnh và có người dùng mảnh thật để dựng lời dối. Người Gác Bến đúng là một kẻ như vậy: nói thật từng phần, giấu lý do mình bị chém.
  - *Thêm động cơ ẩn*: mảnh ký ức này muốn người chơi đi tới **END07 Người chặt vòng**, vì vòng bị chặt thì nó được tan hẳn. Nó sẽ khuyên ngăn END05 (giữ vòng mà sửa). Người chơi không nên tin trọn.
  - *Nối với nhân vật của C*: NP12 Dã Tâm (sứ thú của Yêu Hoàng) nhận ra Người Gác Bến; cần thêm 2 cảnh: cảnh NP12 gặp Người Gác Bến, cảnh lộ thân phận.
  - *Không ảnh hưởng luật tri thức*: lời của Người Gác Bến chỉ tính là **một** nguồn chứng (Mộng Ấn #2), nên vẫn cần nguồn độc lập thứ hai như C yêu cầu.
  - *Với bản Claude*: Mộng Ấn #1, #2 và đại lộ Tỉnh Mộng giữ nguyên; chỉ thêm lớp "người dẫn đường có mục đích riêng".
- **Phi thăng khi chưa đủ ba tri thức** = "**Mộng trong mộng**" của B: vượt kiếp, lên tới nơi rồi thấy một bến Vong Xuyên khác, vẫn luân hồi. END04 thật chỉ mở khi đủ ba tri thức.
- **Diệt thế**: END08 của C là kết hành trình (khép cả game) và cần đủ tri thức + nghi thức ở LOC15. Một đời ma đầu "diệt thế" **khi chưa đủ** điều kiện END08 chỉ làm **3 khu thành đất ma** (B §14.9).

---

## A.11 Sự kiện và tình huống mơ hồ

- 12 sự kiện hoàn chỉnh EV01–EV12 của C (C §8) là **mẫu chuẩn**: đủ người, nơi, lựa chọn, kiểm tra, hậu quả gần và xa.
- 30 tình huống của B (B §11) là **đề cương**, phải viết lại theo khuôn của C và sửa hai điểm:
  1. Bỏ các tỉ lệ "50% người đó là kẻ xấu" tung lúc mở cảnh. Kết quả phải đến từ **động cơ có sẵn** của nhân vật (luật của C): bà lão là đạo chích thì có dấu vết trước đó (túi bị rạch, nhân chứng, món tiền lạ xuất hiện ở chợ) và có cách truy lại.
  2. Trong mỗi nhóm sự kiện, **phần lớn lòng tốt được đáp lại bình thường**; chỉ một phần nhỏ bị phản, để sự phản bội còn đau.
- Hai sự kiện trùng ý: B#1 "Bà lão xuống núi" = C EV01 "Bàn tay run dưới dốc núi"; B#2 "Hổ và bầy hươu" = C EV02 "Hổ đói bên đàn hươu"; B#9 "Kho lương địa chủ" ≈ C EV03 "Kho lương khóa giữa mùa đói". Dùng bản của C, bỏ ba dòng này của B.

---

## A.12 Nhiệm vụ tân thủ: 27 nhiệm vụ

- **Xương sống**: 18 nhiệm vụ HD01–HD18 của C (C §11 D3), đi từ chuyện sống (biết mình còn gì, ăn, hỏi việc, kiếm một ngày công, ngủ) rồi mới tới đi đường, mua bán, học, săn, chữa thương, làm đồ, quan hệ, hậu quả, nhận vai, viết nguyện vọng. Phần thưởng là 20 vật phẩm VT-HD của C.
- **Thêm 9 nhiệm vụ tu tiên của B** làm nhóm cuối (sau HD18):

| Mã mới | Lấy từ B | Nội dung |
|---|---|---|
| HD19 | A6 `tt_danhkhi` | Dẫn khí nhập thể (vào Luyện Khí) |
| HD20 | B10 `tt_bangtreo` | Xong một nhiệm vụ bảng treo thưởng (nhận Thưởng Lệnh đầu tiên) |
| HD21 | B11 `tt_lichluyen` | Đầy lịch luyện một tầng |
| HD22 | B12 `tt_khaiphu` | Khai phủ đầu tiên |
| HD23 | B13 `tt_bequan` | Bế quan cộng dồn 30 ngày |
| HD24 | B21 `tt_linhthu` | Ấp nở một linh thú |
| HD25 | B28 `tt_dixa` | Tới một đại khu vực khác |
| HD26 | B29 `tt_chuanbi` | Mở bảng chuẩn bị đột phá Trúc Cơ |
| HD27 | B30 `tt_trucco` | Đột phá Trúc Cơ thành công |

- Nhịp mở: **HD01–HD06 lần lượt từng cái**; sau đó mỗi lúc tối đa 3 cái: nhóm A (HD07–09), B (HD10–12), C (HD13–15), D (HD16–18), E (HD19–21), F (HD22–24), G (HD25–27). HD19–HD27 tự chuyển "đã xong" nếu người chơi chọn đời không tu; nếu bỏ qua thì không nhận thưởng.
- Phần thưởng HD19–HD27 dùng mã vật phẩm đang có của game như B §13.3.
- Giao diện, bỏ qua có hỏi lại, ẩn / hiện, dẫn đường: gộp B §13.2 và C §11 D4 (hai bên gần như giống nhau). Tốt nghiệp (B): xong từ 22/27 → +5 điểm luân hồi.

---

## A.13 Dữ liệu và trường lưu

- **Danh mục tập dữ liệu**: gộp C §11 D6 với B §16.1. Chỗ cùng một thứ có hai tên, dùng **tên của C** cho thế giới, nhân vật, nghề tu, chiêu, vật phẩm (LOC, NP, FA, OR, PM, TU, CP, SK, BT, CC…) và **tên của B** cho phần nối vào game hiện có (`ROOT`, `TT_DEST`, `TT_PHYS`, `TRAIT`, `UPG`, `PGROUP`…).
- **Trường lưu**: gộp C §11 D7 với B §16.3. Đổi tên theo A.4: `ck/tk` → điểm P/T của Hành Đạo; `phuc/nghiep` → G/B của Nghiệp Duyên; thêm sổ danh tiếng theo thế lực / vùng của C. Đồng hồ thế giới lưu ở `world.thoiCuc` (không dùng tên `chron` vì đã có).
- **Bảng phải đối chiếu với dữ liệu gốc trước khi làm**: C §11 D8 và C §14 A.4–A.6.
- **Chuyển bản lưu cũ**: theo B §8.6 cho số `karma`, đổi đích sang P/T và G/B; theo C §5.2 cho thể chất / khí vận (kiếp đang chơi giữ nguyên bộ cũ tới hết kiếp).

---

## A.14 Lộ trình hợp nhất

| Đợt | Nội dung |
|---|---|
| 1 | Hành Đạo + Nghiệp Duyên + Danh tiếng, sổ hành động, chuyển bản lưu; thiên kiếp theo A.5 |
| 2 | Linh căn mới (A.2), vô căn và luật khóa, trắc linh; đầu thai ngẫu nhiên + quên sạch, sửa nâng cấp luân hồi (A.16); mốc "qua năm" + tuế biến (A.6) |
| 3 | Tiền tệ (A.7), ăn ở, chỗ ở, hộ gia đình, việc làm thuê |
| 4 | 27 nhiệm vụ tân thủ |
| 5 | Bộ nền của C (thuộc tính ST23, trạng thái, thương bệnh, chế tạo, đối thủ) + võ học phàm + 5 nghề phàm đầu |
| 6 | Cải căn: CC01 và CC03 trước (đường của người lao động), rồi CC02–CC08, rồi 10 đường bổ sung |
| 7 | 16 nghề tu lõi, sau đó nghề phàm còn lại |
| 8 | 15 địa điểm neo, 30 nhân vật, 10 thế lực, 14 đồng hồ, thời gian luân hồi mở rộng + tua theo thập kỷ, đất ma |
| 9 | 45 tuyến xuất thân, rồi 9 đại lộ |
| 10 | Mộng Ấn, ba tri thức, nghi thức, 8 kết thúc |
| 11 | Nghề tu mở rộng (Cổ, Thi, Phật, Nho, Thiên cơ, Thương; Lôi pháp, Huyễn thuật, Thôn phệ) |
| 12 | Cân bằng (chỉ khi người dùng cho chạy bot đo) |

---

## A.15 Trạng thái các câu hỏi

Đã chốt hết các câu hỏi trước: thưởng thiên kiếp 10% (A.5), linh thạch 100 lượng (A.7), đầu thai ngẫu nhiên và quên sạch (A.16), thời gian luân hồi 5.000 năm (A.17), Người Gác Bến (A.10).

Còn một điểm Claude tự quyết, người dùng có thể đổi: **kiếp đầu tiên vẫn được chọn nhân vật** (A.16, mục 2).

---

## A.16 Đầu thai ngẫu nhiên và quên sạch

**Luật (người dùng chốt):**
1. Từ kiếp 2, **không có màn chọn thẻ**. Game sinh ngẫu nhiên một nhân vật: tên, giới tính, xuất thân, quê, mệnh cách, khí vận, thể chất, linh căn (linh căn vẫn "chưa trắc" tới lúc trắc linh, giữ khoảnh khắc hồi hộp).
2. **Kiếp đầu** (Claude tự quyết): vẫn cho chọn 1 trong 3 thẻ như hiện nay, vì kiếp đầu chưa phải "luân hồi" và người mới cần làm quen. Muốn kiếp đầu cũng ngẫu nhiên thì chỉ cần bỏ màn chọn.
3. Khi đầu thai **quên sạch**: không mang công pháp, chiêu thức, kỹ năng, ký ức, tri thức nào của kiếp trước.
4. Những thứ **không phải ký ức** vẫn theo người chơi vì chúng nằm ở thế giới hoặc ở sổ luân hồi, không nằm trong đầu nhân vật: Nghiệp Duyên (quyết định hoàn cảnh sinh ra), nhân quả tuyến (người khác nhớ mình chứ mình không nhớ họ), mộ, đồ đã chôn, dòng họ, thế giới đã đổi, điểm luân hồi, Mộng Ấn đã nhặt (xem mục 7).

**Ngoại lệ — chỉ qua vật phẩm, công pháp, kỹ năng:**

| Loại | Tên đề xuất | Lấy ở đâu | Tác dụng ở kiếp sau |
|---|---|---|---|
| Vật phẩm | **Định Mệnh Châu** | Đấu giá hiếm, kho Huyền Cơ Trận Các (LOC05), phần thưởng END-tuyến cao | Mang trên người lúc chết → kiếp sau được **chọn 1 trong 3 nhân vật** ngẫu nhiên (linh căn vẫn chưa trắc). Dùng một lần |
| Vật phẩm | **Túc Tuệ Đăng** | Lạn Kha Tự (LOC12), sự kiện tháp tro | Mang lúc chết → kiếp sau **nhớ một công pháp hoặc một nghề** đã chọn (học lại nhanh, bắt đầu từ bậc thấp nhất). Dùng một lần. Đây cũng là cách có **Di Vật Ký Ức** (CC-VT23) cho đường cải căn CC08 |
| Công pháp | **Luân Hồi Chuyển Thế Kinh** (Phật tu / Thiên cơ sư, mở rộng) | Phật môn, Thiên Cơ các | Luyện tới tầng cuối: mỗi lần chết được chọn 1 trong 3 nhân vật |
| Công pháp | **Bất Muội Linh Quang Quyết** (Hồn tu TU04 / Thần thức tu TU05) | Huyền Cơ Trận Các | Luyện tới tầng cuối: giữ lại một ký ức kỹ năng mỗi lần chết |
| Kỹ năng | **Túc Mạng Thông** (thần thông Phật pháp) | Phật tu từ Kết Đan | Kiếp sau thỉnh thoảng nhớ lại một mảnh (giảm một nửa thời gian học lại kỹ năng đã có) |
| Kỹ năng | **Khuy Mệnh** (Thiên cơ thuật) | Thiên cơ sư từ Nguyên Anh | Trước khi chết, xem trước 3 nhân vật có thể thành; được chọn 1; tốn 10 năm thọ |

**Những thứ phải sửa vì luật mới:**

| Chỗ | Hiện tại / bản cũ | Sửa |
|---|---|---|
| Màn đầu thai `ManChonKiep` (game) | Chọn 1 trong 3+ thẻ | Kiếp 2+: hiện một nhân vật đã sinh; chỉ hiện màn chọn khi có ngoại lệ ở bảng trên |
| Nâng cấp luân hồi **Thiên mệnh** (`UPG.menh`, game) | Thêm thẻ để chọn | Đổi thành: mỗi bậc giảm số kiếp phải chờ để được **một lần chọn** (bậc 1: mỗi 4 kiếp một lần; bậc 2: mỗi 3 kiếp) |
| Nâng cấp **Ký ức công pháp** (`UPG.ky`) và **ký ức tâm pháp** (`UPG.kytp`, `G.meta.tpMem`) của game | Kiếp sau mang công pháp / tâm pháp | **Bỏ** khỏi luân hồi; hoàn lại điểm đã tiêu cho bản lưu cũ. Thay bằng Túc Tuệ Đăng và Bất Muội Linh Quang Quyết |
| Xuất thân "Tiểu đạo đồng" (`skill:1`) | Biết sẵn một pháp thuật | Giữ: đây là thứ học ở kiếp này, không phải ký ức |
| B §14.8: hai lựa chọn "Uống canh, đi ngay" / "Ngồi đợi bên bến" | Đề xuất | **Bỏ** |
| B §14.7 Mộng Ấn #1 "Bát canh không đáy" | Cần chọn "ngồi đợi" | Nhặt khi chết lần đầu và nghe hết lời Người Gác Bến ở bến |
| C: "Di Vật Ký Ức nhận từ Bến Vong Xuyên khi có ký ức kỹ năng được chọn mang theo" (CC-VT23); hồ sơ "Chân linh" có "pháp môn nhớ được" | Mang ký ức tự do | Chỉ có khi kiếp trước dùng Túc Tuệ Đăng hoặc Bất Muội Linh Quang Quyết; mặc định trống |
| C: TRI01 "xác minh một ký ức của bản thân trùng một dấu đời trước"; KV11 Mộng Tỉnh Sớm "nối một ký ức truyền đời" | Giả định có ký ức | "Ký ức" ở đây hiểu là **mảnh mộng chợt hiện** (cảm giác đã từng, do sự kiện gợi ra: thấy mộ mình, nghe vở tuồng), không phải ký ức giữ lại. Không mâu thuẫn với "quên sạch" |
| B §5.3 (giấu linh căn A/B/C) | Chờ chọn | Hết cần: không chọn thẻ thì không né được vô căn |

**Mục 7 — Mộng Ấn có phải "giữ ký ức" không?** Không. Mộng Ấn ghi vào **sổ luân hồi của người chơi**, nhân vật kiếp mới không biết gì. Nó chỉ có tác dụng khi nhân vật mới tự gặp lại dấu vết (mộ, tượng, vở tuồng) — lúc đó game cho nhân vật "nhận ra" nhanh hơn. Như vậy vẫn đúng luật quên sạch, mà người chơi vẫn tiến dần tới kết thúc thật.

---

## A.17 Kiểm tra: thời gian luân hồi tới 5.000 năm có làm hỏng cốt truyện không?

Đã soát cả cốt truyện của Claude và của GPT. **Kết luận: không hỏng, nếu thêm 5 luật dưới đây.**

| Phần cốt truyện | Rủi ro khi cách nhau rất lâu | Luật giữ an toàn |
|---|---|---|
| 45 tuyến xuất thân của C | Tuyến gắn với nhân vật cố định NP01–NP30; sau 500 năm người đó đã chết | **Luật 1:** mỗi NP là một **vai** có người kế nhiệm (C đã có ý này: "vai trò mẹ nuôi hoặc người giữ ấn có thể…"). Tuyến đọc người đang giữ vai lúc đầu thai; vai mất người kế thì dùng "người hoặc vật chứng thay thế" mà C bắt mọi nút phải có |
| 15 địa điểm neo của C | Bị phá, đổi chủ nhiều lần | C đã viết sẵn trạng thái khi bị phá cho từng địa điểm (LOC01 thành trại tị nạn rồi di tích…). **Luật 2:** khi tua, địa điểm chỉ đi theo đúng các trạng thái đã viết |
| 6 đồng hồ của C + 8 đại sự của B | Chu kỳ ngắn hơn khoảng cách (vd thú triều 25 năm, khoảng cách 500 năm) | **Luật 3:** tua theo thập kỷ; những lần xảy ra khi vắng mặt chỉ ghi tóm tắt vào Sử lược với kết quả mặc định; chỉ lần **đang diễn ra** lúc đầu thai mới thành chuyện chơi được |
| Đêm Dài (CLK06) | Sợ tua lâu thì tự leo tới mức diệt thế | C đã viết: Đêm Dài **chỉ tăng vì hành động** (phá phong ấn, diệt hồn, lạm dụng trục), không tăng vì thời gian hay số kiếp → an toàn. Đất ma của B hồi phục theo thế kỷ → càng lâu càng lành |
| Nguồn cải căn CC01–CC08 | Nguồn có lịch hồi phục (CC02 120 năm, CC04 30 năm) | Tua lâu thì nguồn hồi đúng lịch; nguồn độc nhất (CC05) đã lấy thì mất mãi. Không lỗi |
| 9 Đại lộ của B | Đế Nghiệp, Thế Gia dựa vào triều đại / dòng họ | **Luật 4:** kết quả cũ (triều đã lập, dòng họ) ghi vào sử; đại lộ kiếp sau đọc trạng thái hiện tại (triều còn hay đã đổ, dòng họ còn hay đã tuyệt), không giả định nó còn |
| Nhân quả tuyến xuyên kiếp | Người mang ơn / mang oán đã chết | Theo B §14.8: chuyển sang hậu duệ, hoặc hóa oán hồn với huyết thù, hoặc khép |
| Mộng Ấn, ba tri thức | Bia, mộ, vở tuồng bị mất sau ngàn năm | **Luật 5:** mỗi tri thức có ít nhất hai nguồn độc lập (luật của C), và ít nhất một nguồn là nơi không thể mất (LOC05, LOC12, LOC15 đều có phần lõi còn lại khi bị phá) → luôn còn đường tới kết thúc thật |
| Sự kiện "kiếp trước" có sẵn trong game (mộ quen, người cũ báo ân, nợ kiếp trước, tin đồn kiếp trước) | Văn viết như chuyện vừa xảy ra | Viết 2–3 bản lời kể theo khoảng cách; không viết số năm cứng |
| 3 kiếp đầu | Người mới chưa hiểu vòng nhân quả | Giữ: 3 kiếp đầu chỉ cách 3–30 năm |

Ảnh hưởng mã: như đã ghi ở B §14.8 (mức vừa, chủ yếu là cách tua theo thập kỷ). Không cần sửa nội dung đã viết của C, chỉ cần tuân 5 luật trên khi nhập dữ liệu.



---

# PHẦN B — Toàn văn bản phân tích của Claude

> Chép nguyên văn. Chỗ nào khác Phần A thì làm theo Phần A.

## Phù Sinh — Phân tích & hướng đi: Trăm kiếp nhân sinh

Ngày soạn: 17/11/2026 · Nhánh: `claude/busy-cray-fctc4p` (đã gồm `main` ef2ced2) · Loại: tài liệu thiết kế, **chưa sửa mã**.

Tài liệu này phân tích 13 yêu cầu, đối chiếu với game hiện có, tham khảo tác phẩm, rồi chốt **một hướng đi cụ thể** và **toàn bộ dữ liệu cần có**. Mọi bảng đều là dữ liệu thật để nhập, không phải ví dụ. Chỗ nào ghi "đề xuất số ban đầu" nghĩa là con số dùng ngay được, chỉ chỉnh lại khi người dùng cho phép đo bằng bot.

Cách đọc: Phần 0 là tóm tắt. Phần 1–2 là nền. Phần 3–15 là thiết kế từng yêu cầu. Phần 16–19 là danh mục dữ liệu, kiểm tra, lộ trình, câu hỏi còn mở.

---

### 0. Tóm tắt các quyết định chính

| # | Yêu cầu | Quyết định |
|---|---|---|
| 1–4 | Vô linh căn | Thêm bậc **Vô linh căn** (không dẫn khí được, bị coi là phế vật). Kiếp 1 luôn có linh căn. Từ kiếp 2: **45%** vô linh căn, dao động **30–65%** theo nhân quả kiếp trước. Linh căn được tung **một lần cho cả kiếp** và **giấu đến lúc trắc linh** (không còn chọn thẻ để né). Có **15 con đường cải tạo** bằng kỳ ngộ, tạo ra 7 loại **hậu thiên linh căn**. |
| 5, 12 | Mục tiêu game, văn phong | Phù Sinh là game **trải nghiệm đời người** trong thế giới tu tiên u ám: mỗi kiếp là một con người khác, phần lớn khổ, ít người thành. Vòng luân hồi là một giấc mộng lặp lại; mục tiêu tối thượng là **Tỉnh Mộng + Phi Thăng**. Độ khó tăng có bảng chỉ tiêu cụ thể. |
| 6 | Đại đạo ba ngàn | Không chọn lớp nhân vật. Con đường hình thành từ việc làm: **17 phàm đạo**, **võ đạo phàm nhân 6 bậc**, **19 tu đạo**, **22 pháp môn** (mỗi pháp môn 3 công pháp + 5 chiêu). |
| 7–9 | Nhân quả & chính tà | Tách làm hai thước đo, **không hiện số**: **Đạo Hướng** (chính–tà, tác dụng kiếp này, 7 bậc hướng × 5 bậc đậm nhạt) và **Nhân Quả** (phúc–nghiệp, quyết định khởi đầu kiếp sau và uy lực thiên kiếp, 9 bậc + "Thiện ác đan xen"). Thêm **Nhân Quả Tuyến** (ân, oán, nợ, hứa, huyết thù, duyên) đi theo người chơi qua các kiếp. |
| 8 | Thiên kiếp công bằng | Nghiệp càng nặng → kiếp càng dữ, thêm đạo, đổi sang Nghiệp Hỏa; qua được → thưởng nhiều hơn và tiêu bớt nghiệp. Phúc dày → "công đức hộ thể" che bớt sát thương, thưởng bình thường. |
| 10 | Tuế biến | Mỗi lần thêm một tuổi, khí vận/thể chất/mệnh cách phù hợp được **tích lũy**, **hao mòn** hoặc gây **biến cố**. Tooltip có dòng "Theo năm tháng" bằng chữ ước lượng. Bảng đủ cho **33 thể chất, 74 khí vận, 18 mệnh cách**. |
| 11 | Tân thủ | **30 nhiệm vụ tân thủ**, chỉ ở kiếp đầu. 6 cái đầu đi lần lượt, sau đó tối đa 3 cái song song. Có thanh tiến độ, phần thưởng ghi rõ, bấm để dẫn đường, ẩn/hiện, bỏ qua có hỏi lại. |
| 2 (lần 2) | Tiền tệ | **Năm loại tiền**: linh thạch · bạc (phàm nhân) · cống hiến **riêng từng thế lực** (chỉ tiêu ở đúng thế lực đó) · Thưởng Lệnh (làm nhiệm vụ bảng treo thưởng → đổi hàng ở Thưởng Các) · điểm luân hồi (đã có). Phần 6.1. |
| 3 (lần 2) | Thời gian luân hồi, đất ma | Khoảng cách giữa hai kiếp **đã có sẵn** (3–30 năm). Đề xuất mở rộng tới 5.000 năm, phụ thuộc nhân quả; 3 kiếp đầu chỉ cách gần. Cần thêm cách "tua thế giới theo thập kỷ" — mức sửa vừa phải, không làm lệch cốt truyện nếu giữ 3 quy tắc. Diệt thế tạm thời = **3 khu thành đất ma**, hồi phục dần theo thế kỷ. Phần 14.8, 14.9. |
| 13 | Cốt truyện theo xuất thân | Không viết 45 cốt truyện rời. Gom thành **9 Mệnh Tuyến** (đại cốt truyện), mỗi xuất thân gắn một mệnh tuyến + mở đầu riêng. Cốt truyện **kéo chứ không ép**: mỗi bước là một lời mời có hạn; bỏ qua thì thế giới tự diễn tiếp và mệnh tuyến rẽ nhánh, không bao giờ khóa chết. Kết cục xét theo trạng thái lúc kết kiếp nên làm gì cũng có kết cục có nghĩa. Thế giới giữ lại qua các kiếp nên kết cục kiếp này đổi thế giới kiếp sau. |

---

### 1. Hiện trạng game liên quan (đã đối chiếu mã)

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
| Tiền | Chỉ có linh thạch (kể cả phàm nhân mua bánh) và **một số cống hiến chung** `r.ch` không gắn với tông nào (core2/03). | Không tả được "kiếm ngày ba bữa"; cống hiến tông này tiêu được như của tông khác. |
| Thời gian giữa hai kiếp | Mỗi lần chết, thế giới trôi ngẫu nhiên **3–30 năm** (`afterlife`: `ri(3,30)`), tua bằng `worldCoarse` (chạy **từng tháng**) và `rivalsCoarse`. Sử thế giới `w.chron` giữ 60 dòng. | Tua từng tháng không chịu được khoảng hàng trăm, hàng ngàn năm. |
| Kết kiếp | Điểm luân hồi tính theo cảnh giới, số kẻ giết, sự kiện; nguyên nhân chết: chiến đấu, kiếp, tọa hóa, tâm ma, quy ẩn, phi thăng. | Đời phàm nhân gần như không có điểm → người chơi sẽ ghét vô linh căn. |

---

### 2. Tham khảo tác phẩm và điều rút ra

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

### 3. Mục tiêu mới của game và văn phong (yêu cầu 5, 12)

#### 3.1 Định nghĩa một câu

> **Phù Sinh là game trải nghiệm những đời người trong một thế giới tu tiên u ám. Mỗi kiếp là một con người khác — có kiếp là đứa trẻ vô linh căn chết đói năm ba mươi tuổi, có kiếp là thiên kiêu vượt lôi kiếp, có kiếp là ma đầu không còn biết thương ai. Game không chấm điểm đạo đức; nó ghi lại nhân quả và trả về đúng lúc. Vòng luân hồi là một giấc mộng lặp lại; chỉ người tỉnh mộng và phá cửa phi thăng mới thoát ra.**

Tên game khớp chủ đề: "Phù sinh nhược mộng" — đời người nổi trôi như giấc mộng.

#### 3.2 Bốn trụ cột (dùng để duyệt mọi tính năng)

| Trụ cột | Nghĩa | Hệ quả thiết kế | Cách kiểm |
|---|---|---|---|
| Đa dạng nhân sinh | Mỗi kiếp khác thật sự | Linh căn giấu, vô linh căn cao, xuất thân đổi theo nhân quả, 17 phàm đạo + 19 tu đạo, mệnh tuyến theo xuất thân | Trong 10 kiếp liên tiếp có ít nhất 4 "kiểu đời" khác nhau (đo bằng đạo đồ chủ đạo lúc kết kiếp) |
| Sự thật trần trụi | Tu tiên khó, chết dễ, người thường càng khổ | Bảng độ khó ở Phần 4; cơm áo; thương thế lâu lành | Tỉ lệ đạt cảnh giới theo bảng chỉ tiêu |
| Không phán xét | Thiện có thể bị phạt, ác có thể được lợi | Hai thước đo tách nhau; 30 tình huống mơ hồ; hậu quả đến trễ | Mọi sự kiện có lựa chọn "thiện" đều phải có ít nhất một nhánh kết quả xấu và ngược lại |
| Cảm xúc trước con số | Kể bằng chữ | Đạo Hướng, Nhân Quả, tuế biến hiện bằng chữ; bia mộ + Sổ Nhân Quả cuối kiếp | Không có con số nào trong tooltip của ba hệ đó |

#### 3.3 Mười hai "kiểu đời" mà game phải tạo ra được

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

#### 3.4 Văn phong (yêu cầu 12) — quy ước viết cho mọi nội dung mới

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

### 4. Độ khó mới (yêu cầu 5)

#### 4.1 Chỉ tiêu mục tiêu (kiếp có linh căn, người chơi trung bình, không mất phí nâng cấp luân hồi)

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

#### 4.2 Đòn bẩy cụ thể (đề xuất số ban đầu, so với hiện tại)

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

#### 4.3 Bù lại để khó mà không bực
- Thông tin rõ: trước khi đột phá, bảng chuẩn bị nói tỉ lệ bằng chữ ("may rủi chia đôi", "mười phần chỉ hai ba") và nói luôn hậu quả thất bại.
- Chết sớm vẫn có ý nghĩa: điểm luân hồi mới cho đời phàm nhân, Mộng Ấn, nhân quả tuyến chuyển sang kiếp sau (Phần 15).
- Luôn có đường lui: bỏ chạy có giá, quy ẩn, phàm đạo.

---

### 5. Linh căn, vô linh căn và cải tạo linh căn (yêu cầu 1–4)

#### 5.1 Bảng linh căn đầy đủ sau khi thêm

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

#### 5.2 Cách tung linh căn (yêu cầu 2, 3)

1. **Kiếp 1** (`G.meta.nlife === 0` lúc đầu thai): không có `vo`, giữ bảng cũ. Linh căn hiện rõ trên thẻ như bây giờ (người mới cần hiểu game).
2. **Kiếp 2 trở đi**: tung **một lần cho cả kiếp**, dùng chung cho mọi thẻ đầu thai. Thẻ khác nhau ở xuất thân, mệnh cách, quê, chỉ số, khí vận — **không** ở linh căn.
3. Tỉ lệ vô linh căn = 45% + điều chỉnh theo bậc nhân quả kiếp trước (Phần 9.5) + điều chỉnh khí vận, kẹp trong khoảng **30%–65%**.
4. Khí vận khi tung:
   - Tung được **Vô Căn** (khôi phục khí vận `vo_can`, bỏ dòng xoá ở core2/12) → chắc chắn vô linh căn. Ngược lại, nếu linh căn ra `vo` thì tự gắn khí vận Vô Căn để hiện trong bảng nhân vật.
   - Khí vận ép linh căn (Lôi Đình Bá, Băng Tâm Ngọc Cốt, Huyễn Ảnh Phong Thân, Băng Phách, Phong Thần, Lôi Thần Giáng Thế, Hỗn Nguyên Đạo, Ngũ Hành Hợp Nhất) và khí vận "nghiêng về hành" **không tác dụng** khi vô linh căn, chuyển thành **ẩn mệnh**: khi cải tạo thành công, linh căn mới được nắn theo các khí vận này (vd vô linh căn mang Lôi Thần Giáng Thế, cải tạo ra `hau` → thành Biến dị Lôi). Tooltip ghi "Ẩn mệnh: chưa có linh căn để ứng nghiệm".
5. Nâng cấp luân hồi mới **Túc Căn** (3 bậc, giá 15 / 30 / 50 điểm): mỗi bậc giảm 4 điểm phần trăm vô linh căn; vẫn không xuống dưới 30%.

#### 5.3 Giấu linh căn và Trắc linh — **đang chờ bạn chốt**

**Vấn đề, nói đơn giản:** lúc đầu thai, game đang cho chọn 1 trong 3 thẻ nhân vật, và **mỗi thẻ ghi sẵn linh căn của nó**. Dù mỗi thẻ có 45% là vô linh căn, người chơi chỉ việc chọn thẻ nào có linh căn. Cả 3 thẻ cùng vô linh căn chỉ xảy ra khoảng 9% (0,45 × 0,45 × 0,45), có thêm thẻ nhờ nâng cấp thì còn ít hơn. Kết quả: vô linh căn gần như không bao giờ xảy ra, trái với yêu cầu "xác suất khá cao".

**Ba cách xử lý:**

| Cách | Làm gì | Được | Mất |
|---|---|---|---|
| **A (đề xuất)** | Từ kiếp 2, linh căn tung **một lần cho cả kiếp**, mọi thẻ dùng chung, và thẻ ghi **"Linh căn: chưa trắc"**. Biết được khi trắc linh trong 1–3 tháng đầu | Tỉ lệ 45% là thật; có khoảnh khắc hồi hộp lúc trắc linh (hy vọng → tuyệt vọng hoặc mừng rỡ), đúng như truyện | Người chơi không chọn được linh căn |
| B | Tung một lần, mọi thẻ dùng chung, **nhưng hiện rõ** trên thẻ | Tỉ lệ 45% là thật; biết trước để chọn thẻ hợp đời phàm nhân | Mất khoảnh khắc trắc linh |
| C | Giữ như cũ (mỗi thẻ riêng, hiện rõ), nâng tỉ lệ mỗi thẻ để kết quả cuối vẫn khoảng 45% | Ít sửa nhất | Mỗi thẻ phải ~77% vô linh căn (4 thẻ: ~82%); màn đầu thai toàn thẻ "phế vật" trông rất nặng nề |

Phần dưới viết theo cách A.

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

#### 5.4 Vô linh căn = phế vật: tác dụng cụ thể (yêu cầu 1, 4)

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

#### 5.5 Mười lăm con đường cải tạo linh căn

Mỗi con đường là một chuỗi kỳ ngộ/sự kiện thật, có nơi chốn, có giá. Tuổi càng cao kinh mạch càng cứng: **trên 40 tuổi, tỉ lệ thất bại ×1,5; trên 55 tuổi ×2**.

| # | Tên | Loại | Lấy ở đâu / bằng cách nào | Điều kiện | Kết quả | Cái giá | Đạo Hướng | Nhân Quả |
|---|---|---|---|---|---|---|---|---|
| 1 | **Khai Linh Đan** | Đan, Huyền phẩm | Đấu giá ở thành lớn (khởi giá 300 linh thạch ≈ 7.500 lượng bạc); Thưởng Các (250 Thưởng Lệnh, bậc Huyền bài); phần thưởng đại sự kiện tông môn; kỳ ngộ cao nhân | Khí huyết ≥ 50% | 60% → `nguy`; 10% → `hau` 2–3 hệ; 30% thất bại | Thất bại: mất 5 năm thọ, thương thế bậc 2 | 0 | 0 |
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

#### 5.6 Vật phẩm mới cho phần linh căn

| Mã đề xuất | Tên | Loại / ô | Phẩm | Nguồn | Giá tham khảo |
|---|---|---|---|---|---|
| `trac_linh_thach` | Trắc Linh Thạch | Vật dùng, 1 ô | Phàm | Tạp hóa thành lớn | 30 lượng bạc |
| `khai_linh_dan` | Khai Linh Đan | Đan | Huyền | Đấu giá, Thưởng Các, tông môn, kỳ ngộ | 300 linh thạch / 250 Thưởng Lệnh |
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

### 6. Cơm áo phàm trần: tiền bạc, cái ăn, việc làm, gia đình

Không có phần này thì "bận rộn kiếm ngày ba bữa" chỉ là lời kể. Đây là nền của mọi phàm đạo.

#### 6.1 Năm loại tiền

| Tiền | Ai dùng | Kiếm bằng | Tiêu ở | Đổi được không | Mất khi |
|---|---|---|---|---|---|
| **Linh thạch** | tu sĩ (phàm nhân hiếm khi có) | săn yêu, bán linh vật, việc của tu sĩ | phường thị, quỷ thị, đấu giá, dịch vụ tu sĩ | ↔ bạc ở tiền trang | chết |
| **Bạc** (văn, lượng) | mọi người | làm thuê, phàm đạo, bán đồ phàm | quán phàm, thuế, sính lễ, học phí | ↔ linh thạch ở tiền trang | chết |
| **Cống hiến** (một sổ riêng cho mỗi thế lực) | thành viên thế lực đó | việc của **chính** thế lực đó | **chỉ** cửa hàng, dịch vụ của **chính** thế lực đó | không đổi ra tiền; không chuyển sang thế lực khác | bị trục xuất / phản bội: mất hết; tự rời: đóng băng; chết: mất |
| **Thưởng Lệnh** | ai nhận việc ở bảng treo thưởng | xong nhiệm vụ bảng treo thưởng | Thưởng Các | không mua bằng tiền, không đổi | bỏ / trễ nhiệm vụ: −1; chết: mất |
| **Điểm luân hồi** (đã có) | người chơi, qua mọi kiếp | kết kiếp | Bến Vong Xuyên (nâng cấp) | — | không mất |

Hiển thị: ô **Hầu bao** trên HUD ghi linh thạch + bạc; bấm vào mở bảng có cống hiến từng thế lực và Thưởng Lệnh.

##### 6.1.1 Bạc
- Đơn vị: **văn** và **lượng**; 1 lượng = 1.000 văn. Hiện: "3 lượng 200 văn".
- Đổi ở tiền trang / phường thị: **mua 1 linh thạch = 25 lượng**, **bán 1 linh thạch = 18 lượng**. Quán phàm nhận linh thạch quy ra 20 lượng.
- Quán phàm (trà lâu, khách điếm, tửu phường, tạp hóa thôn) niêm giá bằng bạc; phường thị, quỷ thị, đấu giá niêm giá bằng linh thạch.
- Bản lưu cũ: linh thạch giữ nguyên, bạc = 0.

##### 6.1.2 Cống hiến theo từng thế lực

| Loại thế lực | Sổ riêng | Tên gọi | Kiếm bằng | Tiêu vào |
|---|---|---|---|---|
| Tông môn (mỗi tông trong `world.sects`, cả chính, ma, Phật, trung lập) | mỗi tông một sổ | Cống hiến | Việc tông · nộp nguyên liệu (luật `chGive` đã có) · trấn thủ · đại bỉ · đi trừ ma / bắt người (ma tông) | Công pháp ở Tàng Kinh Các · đan (luật `chTrade` đã có) · vào bí cảnh tông · động phủ có linh mạch · trưởng lão hộ pháp khi đột phá (+8% tỉ lệ) · đổi sư phụ · xin miễn một lần phạt |
| Triều đình (quan phủ và quân đội của triều đại đang cai trị) | một sổ cho triều đại hiện tại | Công lao | Xử án · thu thuế · tuần tra · đánh trận · bắt kẻ truy nã | Thăng chức · đất phong (ruộng) · miễn thuế · binh khí, giáp, ngựa · giấy thông hành · ân xá một tội |
| Thương hội (mỗi thương hội, gắn với thương đội trên bản đồ) | mỗi hội một sổ | Tín dự | Giao hàng đúng hạn · hộ tống thương đội · góp vốn | Vay vốn không lãi 3 tháng · giá −10% · chỗ trong thương đội (đi đường an toàn hơn) · thuê kho · đặt hàng hiếm |
| Võ phái (NPC hoặc của người chơi) | mỗi phái một sổ | Môn công | Luyện võ ở phái · đấu lôi đài nhân danh phái · bảo kê | Bí tịch võ (7.3) · thuốc trị thương · người giúp sức |
| Cái bang | một sổ | Bang công | Đưa tin · nghe ngóng · giúp người cùng cảnh | Tin tức chính xác · che giấu hành tung · chỗ ngủ · người dẫn đường |
| Ám lâu (phàm) / Ám Đường (tu sĩ) | mỗi tổ chức một sổ | Huyết ấn | Hợp đồng | Hợp đồng lớn · xoá tên khỏi bảng truy nã · mặt nạ (che giấu thân phận) · độc dược · tin về mục tiêu |

Luật:
- Cống hiến chỉ tiêu ở đúng thế lực đã trao, kể cả hai tông cùng phe cũng không dùng chung.
- Mua bằng của cải được nhưng rất đắt: nộp 10 linh thạch vào kho tông = 1 cống hiến; quyên 50 lượng cho triều đình = 1 công lao; góp 30 lượng vào thương hội = 1 tín dự.
- Tự rời thế lực: sổ đóng băng, quay lại thì dùng tiếp nhưng mất 20%. Bị trục xuất hoặc phản bội: mất hết, thêm tuyến Oán (9.9).
- Đổi ngôi: công lao với triều cũ mất 50% nếu đã quy thuận triều mới, mất hết nếu từng phò triều cũ chống lại.
- Hết kiếp: mọi sổ mất (thế lực không nhớ người kiếp trước).
- Bản lưu cũ: `r.ch` (số chung) chuyển vào sổ của tông đang ở (`sectName`); chưa có tông thì bỏ.

##### 6.1.3 Thưởng Lệnh và Thưởng Các
- **Thưởng Lệnh**: thẻ tre khắc dấu son của **Thưởng Các** — tổ chức chung của quan phủ và các thương hội đứng sau mọi bảng treo thưởng. Dùng chung ở mọi bảng, mọi khu. Nằm trong hầu bao, **không chiếm ô túi**.
- **Nhận** theo bậc nhiệm vụ bảng treo (6 bậc của `QST`): 1 / 2 / 3 / 5 / 8 / 12 thẻ. Xong khi mới qua chưa tới nửa thời hạn: +1. Nhiệm vụ truy nã đặc biệt: ×2.
- **Mất**: bỏ nhiệm vụ −1 (cộng thêm phạt hiện có); trễ hạn −1.
- Phàm nhân, vô linh căn chỉ nhận nhiệm vụ bậc 1 (tìm người lạc, đưa thư, bắt trộm vặt, đuổi sói, đòi nợ). Thưởng Lệnh là con đường chậm mà chắc để một phàm nhân tích tới Khai Linh Đan.
- **Bậc Thưởng Các** (tính theo tổng thẻ từng nhận, không giảm khi tiêu): Vô danh (0) → Đồng bài (20) → Ngân bài (60) → Kim bài (150) → Huyền bài (400). Bậc cao mở hàng cao và nhiệm vụ truy nã đặc biệt.

**Cửa hàng Thưởng Các** (ở mọi thành có bảng treo thưởng; giới hạn tính theo từng thành)

| Hàng | Giá (Thưởng Lệnh) | Bậc cần | Giới hạn |
|---|---|---|---|
| Lương khô (1 gói) | 1 | Vô danh | không |
| Hồi Xuân Đan `hoixuan` | 2 | Vô danh | 5 / tháng |
| Tụ Khí Đan `tukhi` | 2 | Vô danh | 5 / tháng |
| Giải Độc Đan `giaidoc` | 2 | Vô danh | 5 / tháng |
| Giấy thông hành trạm dịch (đi một chặng miễn phí) | 2 | Vô danh | 3 / tháng |
| Trắc Linh Thạch | 3 | Vô danh | 1 / kiếp |
| Tin tức một thiên kiêu (mở dòng trong Bảng thiên hạ) | 3 | Vô danh | 3 / tháng |
| Thần Hành Phù `thanhanh` | 4 | Đồng bài | 3 / tháng |
| Kim Cang Phù `kimcang` | 4 | Đồng bài | 3 / tháng |
| Chưởng Lôi Phù `loiphu` | 5 | Đồng bài | 3 / tháng |
| Định Thần Đan `dinhthan` | 6 | Đồng bài | 2 / tháng |
| Tinh Nguyên Đan `tinhnguyen` | 8 | Ngân bài | 2 / tháng |
| Lệnh truy nã đặc biệt (mở một nhiệm vụ truy nã kẻ có tên, thưởng ×2) | 10 | Ngân bài | 1 / tháng |
| Bản đồ kho báu (mở một địa điểm ẩn trên bản đồ) | 12 | Ngân bài | 1 / tháng |
| Phá Cảnh Đan `phacanh` | 18 | Kim bài | 1 / tháng |
| Hộ Mạch Đan `homach` | 20 | Kim bài | 1 / tháng |
| Tị Lôi Phù `tiloi` | 22 | Kim bài | 1 / tháng |
| Xoá tên khỏi bảng truy nã của một thành | 25 | Kim bài | 1 / năm |
| Diên Thọ Đan `dientho` | 30 | Kim bài | 1 / năm |
| Khai Linh Đan | 250 | Huyền bài | 1 / kiếp |

#### 6.2 Bảng giá phàm (dữ liệu thật)

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

#### 6.3 Cái ăn

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

#### 6.4 Sức lực trong ngày
Làm tối đa 12 giờ/ngày. Quá 12 giờ → "mệt nhọc": ngày sau hiệu quả −30%. Ba ngày liền quá sức → ốm 5 ngày (khí huyết −10%).

#### 6.5 Việc làm thuê (ai cũng làm được)

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

#### 6.6 Gia đình và người thân
- Đầu thai có cha, mẹ (38–50 tuổi) và 0–3 anh chị em, trừ xuất thân mồ côi/khất cái/bị bỏ.
- Mỗi người thân lưu: tên, quan hệ, tuổi, sức khỏe (khỏe / yếu / bệnh / hấp hối), thái độ (thương / lạnh nhạt / ghét), nơi ở, còn sống, có linh căn hay không.
- Hôn nhân: từ 16 tuổi; phàm nhân cần sính lễ 10 lượng; tu sĩ kết đạo lữ qua giao tình. Người phối ngẫu sinh từ người địa phương hoặc người quen đủ giao tình.
- Con cái: sau cưới mỗi năm 30% có con (tối đa 5). Nuôi 300 văn/tháng/con đến 16 tuổi. 16 tuổi con được trắc linh: **15%** có linh căn nếu cha mẹ đều vô linh căn, **50%** nếu một bên có, **80%** nếu cả hai có. Con có linh căn có thể được tông môn đón đi.
- 14 sự kiện gia đình: Cha mẹ già bệnh · Tang lễ · Anh em tranh gia sản · Em có linh căn được đưa lên núi · Cưới hỏi · Sinh con · Con ốm nặng · Con trắc linh · Con bỏ nhà theo tu sĩ · Vợ/chồng bị bắt đi phu · Nhà cháy · Chủ nợ tới cửa · Ngày giỗ · Về quê sau nhiều năm bế quan, người thân đã già hoặc đã mất.
- Kết cục riêng **"Chết bên con cháu"** (chết vì thọ, còn ít nhất một con sống). Dòng họ ghi vào thế giới (`world.lineage`): kiếp sau 10% đầu thai làm hậu duệ chính dòng họ mình, và có sự kiện "Hậu duệ kiếp trước".

---

### 7. Đại đạo ba ngàn (yêu cầu 6)

#### 7.1 Nguyên tắc
1. **Không chọn lớp nhân vật lúc đầu.** Con đường hình thành từ việc người chơi làm. Mỗi con đường có kinh nghiệm riêng (ẩn) tăng khi làm đúng việc của đường đó; danh vị mở khi đủ kinh nghiệm và qua sự kiện thăng bậc.
2. **Tối đa 3 đường cùng lúc.** Bắt đầu đường thứ tư thì đường lâu không làm nhất "phai" (ngừng tăng). Đường có bậc cao nhất là **chủ đạo** (người chơi ghim lại được).
3. Mỗi đường bắt buộc có đủ: ít nhất 2 cửa vào · 6 bậc danh vị · việc lặp lại (nút hành động ở thẻ địa điểm, phải thêm vào `PGROUP`) · thu nhập theo bậc · rủi ro · **12 sự kiện** (4 nhập môn, 4 giữa đường, 4 đỉnh cao) · **4 kết cục** · xu hướng Đạo Hướng / Nhân Quả · mệnh tuyến liên quan.
4. Bảng nhân vật có thẻ **Đạo đồ**: tên đường, danh vị, tiến độ bằng chữ (mới vào nghề / thạo việc / có tiếng / bậc thầy / lừng lẫy).
5. Tu sĩ vẫn làm phàm đạo được (chủ tiệm, quan viên tu sĩ), nhưng kinh nghiệm phàm đạo nhận −30% (lòng không ở đó).

#### 7.2 Mười bảy phàm đạo

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

#### 7.3 Võ đạo phàm nhân (cho mọi người, trọng tâm của vô linh căn)

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

#### 7.4 Mười chín tu đạo (con đường của người có linh căn)

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

#### 7.5 Hai mươi hai pháp môn (cách lấy sức mạnh)

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

### 8. Đạo Hướng — chính và tà (yêu cầu 8, 9)

#### 8.1 Định nghĩa
**Đạo Hướng đo cách bạn chọn**: phương tiện, động cơ, công pháp, lời nói và việc làm — và vì thế, thiên hạ nhìn bạn ra sao. Nó **chỉ có tác dụng trong kiếp này** và về 0 khi đầu thai. Nó **không** nói việc bạn làm thật sự tốt hay xấu cho chúng sinh — đó là việc của Nhân Quả (Phần 9).

Ví dụ phân biệt: chính đạo diệt cả một thôn "nhiễm ma" theo lệnh tông → Đạo Hướng nghiêng Chính (theo lệnh, trừ ma), nhưng Nhân Quả mang Nghiệp nặng nếu thôn đó chỉ bị bệnh dịch.

#### 8.2 Cách tính (ẩn với người chơi)
- Hai dòng tích lũy: **Chính khí** và **Tà khí** (từ 0, không âm).
- **Hướng** = Chính khí ÷ (Chính khí + Tà khí). **Độ đậm** = Chính khí + Tà khí.
- Khởi đầu kiếp: tính tình theo xuất thân và mệnh cách (Chính trực, Nhân hậu → Chính khí 20; Tàn nhẫn, Cuồng tà, Sát phạt → Tà khí 20; khác → 0); khí vận "Thiên về thiện/ác" (trường `amDuongBonus`) → nhân 2 đổ vào dòng tương ứng.
- Mỗi năm cả hai dòng phai **3%** (người đời quên dần), nên Đạo Hướng phản ánh việc làm gần đây nhiều hơn.

#### 8.3 Bảng chữ hiển thị

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

#### 8.4 Được và mất theo hướng (giá trị ở độ đậm "đậm"; nhân hệ số ở 8.3)

| Hướng | Được | Mất |
|---|---|---|
| **Hạo Nhiên** | Kháng tâm ma +40% · Hộ tâm +8 · Chiêu Lôi pháp, Phật pháp, Nho thuật +15% · Sát thương lên ma tu, quỷ, thi +20% · Phàm dân và chính đạo: giá −15%, dễ được mời nhập tông chính · Phúc nhận +20% | Không dùng được Huyết thuật, Luyện hồn, Thôn phệ, Thi thuật (cố dùng → phá đạo tâm: tâm ma +15, Chính khí −30%) · Làm trái hướng dao động gấp đôi · Ma tông chủ động truy sát · Không lục túi người thua mà không mất Chính khí · Khó che giấu thân phận |
| **Quang Minh** | Kháng tâm ma +25% · Chiêu chính +10% · Giá −10% ở chính đạo, thôn trấn · Nhiệm vụ tông chính trả cống hiến +10% | Công pháp tà hiệu quả −50% · Dao động ×1,5 · Ma tông có thể truy sát |
| **Chính Trực** | Kháng tâm ma +15% · Giá −5% ở thành trấn có tông chính · Mở nhiệm vụ tông chính | Công pháp tà −30%; mỗi lần dùng tâm ma +5 |
| **Tùy Tâm** | Dùng được cả công pháp chính lẫn tà ở 85% hiệu quả · Mua bán cả phường thị lẫn quỷ thị · Hai phe ít truy sát (−50%) · Chí mạng +5 (khó đoán) | Không phe nào tin hẳn: không vào được nội môn của tông lớn nhất mỗi phe (chỉ ngoại môn, khách khanh) · Cống hiến nhận −15% · Không có kháng tâm ma · **Không bị dao động** khi làm trái |
| **Tà Khí** | Sát thương +8% · Đe dọa: giá quỷ thị −10%, ép giá được ở thôn trấn · Huyết thuật, Thôn phệ +10% | Phàm dân sợ: giá ở thôn trấn +15% (nếu không ép) · Tông chính từ chối · Tuần tra chính đạo hỏi giấy · Tâm ma tăng nhanh hơn 15% |
| **Ma Tâm** | Sát thương +15% · Hút máu +3% · Ma tông mời làm chấp sự · Giết người được tu vi (huyết luyện, 1% tầng mỗi mạng) | Thành chính đạo treo thưởng (thay luật karma ≤ −60 cũ) · Tâm ma tăng nhanh hơn 25% · Thiên kiêu chính đạo chủ động tìm diệt · Phàm dân bỏ chạy: mất dịch vụ ở thôn |
| **Vô Gian** | Sát thương +22% · Giết địch hồi 5% khí huyết · Uy áp: địch thấp hơn một đại cảnh giới công −10% · Lập được ma môn riêng | Mọi chính đạo truy sát · Không vào thành có tông chính · Tâm ma tăng nhanh hơn 40% · **Ma niệm**: mỗi năm khi tâm ma ≥ 50, 20% tự làm một việc ác ngẫu nhiên (game kể lại, người chơi chỉ chọn cách đối diện hậu quả) |

#### 8.5 Làm trái hướng — "đạo tâm dao động" (học từ Crusader Kings)
Khi một việc làm cộng từ 3 điểm trở lên vào dòng **ngược** với hướng hiện tại: tâm ma + (số điểm × hệ số độ đậm: sơ tâm 0, nhạt 0,2, rõ 0,4, đậm 0,6, thấm cốt 1,0). Tùy Tâm không bị. Lời kể: "Tay run khi rút kiếm về; lòng như có ai gõ cửa."

#### 8.6 Thay chỗ số `karma` cũ

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

### 9. Nhân Quả (yêu cầu 7, 8, 9)

#### 9.1 Định nghĩa
**Nhân Quả đo điều thực sự đã xảy ra vì bạn**: ai được sống, ai chết, ai khổ, ai mang ơn, ai mang hận. Phần lớn **ẩn** và **đến trễ**. Nó quyết định **khởi đầu kiếp sau** và **uy lực thiên kiếp** kiếp này. Game không bảo việc nào là đúng; nó chỉ ghi.

#### 9.2 Ba thành phần
1. **Phúc** — thiện quả tích lũy.
2. **Nghiệp** — ác quả tích lũy. Phúc và Nghiệp **không xóa nhau**: một người có thể vừa nhiều phúc vừa nặng nghiệp.
3. **Nhân Quả Tuyến** — các sợi duyên cụ thể với từng người (9.9).

#### 9.3 Bảng chữ hiển thị (theo cán cân Phúc − Nghiệp)

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

#### 9.4 Quả chín (hậu quả đến trễ)
- Mỗi hành vi có thể gieo một **hạt** (dùng lại `r.seeds` đã có) với: loại quả, người liên quan, độ trễ (tháng), lượng Phúc/Nghiệp **chưa cộng**.
- Đến hạn và người chơi ở nơi phù hợp → mở sự kiện "quả chín"; lúc đó mới cộng Phúc/Nghiệp. Chưa kịp chín mà đã chết → mở ra trong Sổ Nhân Quả lúc kết kiếp và vẫn cộng (chuyển sang kiếp sau).
- Ví dụ: tha tên cướp (Chính khí +4 ngay) → 6–18 tháng sau, 50% hắn cướp làng khác giết người (Nghiệp +3, tin đồn tới tai), 50% hắn hoàn lương và sau này cứu bạn (tuyến Ân).

#### 9.5 Ảnh hưởng tới kiếp sau

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

#### 9.6 Mang sang kiếp sau
- **Túc phúc** kiếp sau = 50% × (Phúc kiếp này + Túc phúc đang mang). Túc nghiệp tương tự. Nên ảnh hưởng tắt dần qua 2–3 kiếp.
- Bậc dùng cho bảng 9.5 tính từ Túc phúc − Túc nghiệp.
- Tuyến: mỗi tuyến chưa khép có xác suất theo sang (9.9).

#### 9.7 Thiên kiếp công bằng (yêu cầu 8)

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

#### 9.8 Tiêu nghiệp và tích phúc

| Cách | Tác dụng | Giới hạn |
|---|---|---|
| Trả nợ một tuyến (bồi thường, xin lỗi, chịu đòn, hoàn thành di nguyện) | Khép tuyến; tiêu phần Nghiệp gắn với tuyến | — |
| Sám hối ở chùa (5 lượng bạc hoặc 2 linh thạch + 7 ngày) | Nghiệp −10% | 1 lần/năm |
| Siêu độ người mình đã giết (Phật pháp, hoặc mời sư: 20 lượng) | Nghiệp của đúng vụ đó −50% | mỗi vụ một lần |
| Vượt thiên kiếp / nhân kiếp | Theo bảng 9.7 | — |
| Chết dưới tay oan gia | Khép tuyến; Nghiệp −30% | — |
| Việc chuộc lỗi lớn (sự kiện riêng, vd dựng lại làng mình đã đốt) | Nghiệp −40 đến −80 | sự kiện một lần |
| Việc thiện | **Chỉ tăng Phúc, không xóa Nghiệp** | — |

#### 9.9 Nhân Quả Tuyến

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

#### 9.10 Sổ Nhân Quả (giao diện)
- Thêm thẻ **Nhân quả** vào Sổ tay. Trong kiếp: liệt kê việc đã biết bằng chữ, không số ("Năm 23 tuổi, cõng một bà lão xuống núi — chưa rõ quả"). Tuyến đang mở hiện kèm tên người.
- Lúc kết kiếp, màn Hết kiếp có trang **"Quả chín"**: mở mọi hạt chưa chín, kể hậu quả thật ("Con hổ bạn giết năm hai mươi ba — bầy hươu ở Thanh Lâm sống qua mùa đông năm ấy"), rồi nói bậc nhân quả mang sang kiếp sau.

---

### 10. Bảng hành vi → Đạo Hướng & Nhân Quả (dữ liệu nhập)

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

### 11. Ba mươi tình huống mơ hồ (lòng tốt có giá, cái ác có lý)

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

### 12. Tuế biến — khí vận, thể chất, mệnh cách đổi theo năm (yêu cầu 10)

#### 12.1 Luật chung
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

#### 12.2 Thang chữ cho tooltip (không số)

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

#### 12.3 Ba mươi ba thể chất

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

#### 12.4 Bảy mươi tư khí vận tiên thiên

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

#### 12.5 Mười tám mệnh cách

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

#### 12.6 Tuổi già (áp cho mọi người, ngoài khí vận)
- Từ 70% thọ nguyên (phàm nhân, vô linh căn: từ 50 tuổi): mỗi năm khí huyết tối đa −1%, thân pháp −1 mỗi 3 năm; từ 85% thọ: 10%/năm một bệnh già (thương thế bậc 1).
- Trường Thọ Thể, mệnh cách Trường thọ: dời mốc muộn hơn 10%.
- Lời kể tuổi già đi kèm ("Tóc bạc như sương đầu ngõ").

---

### 13. Nhiệm vụ tân thủ — chỉ ở kiếp đầu tiên (yêu cầu 11)

#### 13.1 Luật
- Chỉ tạo khi đầu thai **kiếp đầu** (`G.meta.nlife === 0` trước khi tăng). Kiếp 2 trở đi không có. Xoá dữ liệu chơi lại từ đầu thì có lại.
- Không hạn, không phạt. Làm lúc nào cũng được.
- **Giai đoạn A** (nhiệm vụ 1–6): hiện **từng cái**, xong cái này mới tới cái sau.
- **Giai đoạn B** (7–30): tối đa **3 cái cùng lúc**; xong hoặc bỏ qua một cái thì cái kế tiếp đủ điều kiện trượt vào. Cái chưa đủ điều kiện (vd cần Trúc Cơ) được giữ lại, cái sau đủ điều kiện vào trước.
- Tiến độ chỉ đếm từ lúc nhiệm vụ hiện ra, **trừ** nhiệm vụ kiểu trạng thái (có tâm pháp, đạt cảnh giới, đã ở khu vực mới): tự hoàn thành ngay nếu đã đạt.
- Kiếp đầu kết thúc thì sổ tân thủ khép theo. Màn Hết kiếp ghi "Sổ tân thủ khép lại cùng kiếp này".
- **Tốt nghiệp**: hoàn thành từ 25/30 nhiệm vụ trở lên (không tính bỏ qua) → +5 điểm luân hồi khi kết kiếp và danh hiệu "Người mới nhập đạo".

#### 13.2 Giao diện
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

#### 13.3 Ba mươi nhiệm vụ

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

### 14. Cốt truyện xuyên suốt theo xuất thân — đề xuất cách làm (yêu cầu 13)

#### 14.1 Vì sao khó
- Có **45 xuất thân** (15 gốc + 30 viết sẵn) và sẽ thêm 12 xuất thân mới → không thể viết 57 cốt truyện lớn rời nhau.
- Thế giới mở, người chơi đi đâu cũng được, làm gì cũng được → không thể ép đi theo một đường thẳng.
- Kiếp ngắn dài khác nhau (chết năm 20 hay sống 3.000 năm) → cốt truyện phải chịu được bị bỏ dở.
- Thế giới giữ lại qua các kiếp → cốt truyện kiếp này làm thay đổi kiếp sau.

#### 14.2 Mô hình đề xuất: ba lớp chồng nhau

| Lớp | Là gì | Ai sở hữu | Thời gian |
|---|---|---|---|
| **Thời cục thế giới** | 12 đại sự diễn ra theo năm của thế giới **dù người chơi có mặt hay không** | Thế giới (`world.thoiCuc`; không dùng tên `chron` vì `w.chron` đã là sử thế giới) | Kéo dài qua nhiều kiếp |
| **Mệnh tuyến** | 9 đại cốt truyện; mỗi xuất thân gắn một mệnh tuyến; mỗi mệnh tuyến 5 hồi | Kiếp hiện tại (`run.arc`) | Một kiếp (riêng "Thế Gia Vạn Đại" nối được qua kiếp) |
| **Đại Mộng** | Bí ẩn vòng luân hồi: 9 Mộng Ấn, Người Gác Bến, kết thúc thật | Người chơi (`G.meta.mong`) | Toàn bộ game |

Mệnh tuyến **bám vào** thời cục: hồi 3 và hồi 5 của mọi mệnh tuyến là một đại sự thời cục. Nhờ vậy, dù người chơi bỏ mệnh tuyến của mình, thời cục vẫn kéo họ vào câu chuyện chung.

#### 14.3 Mười nguyên tắc "kéo chứ không ép"
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

#### 14.4 Mười hai đại sự thời cục

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

#### 14.5 Chín mệnh tuyến

| Mệnh tuyến | Một câu | Hồi 1 | Hồi 2 | Hồi 3 (hội tụ) | Hồi 4 | Hồi 5 (hội tụ) | Kết cục: thành / bại / rẽ / đứng ngoài | Khi vô linh căn |
|---|---|---|---|---|---|---|---|---|
| **Phi Thăng Lộ** | Một đứa trẻ có tiên duyên leo từng bậc thang tàn khốc lên trời | Tiên duyên (trắc linh, sư phụ) | Huyết vũ (tranh đoạt, mất người thân thiết đầu tiên, bí cảnh) | Đại Hội Thiên Kiêu hoặc Tông Chiến | Đạo tâm (thiên kiếp, chọn đạo hay người) | Thiên Lộ Mở | Phi thăng / Ngã trước Thiên Lộ / Bỏ trường sinh vì một người / Tọa hóa trong động phủ | Hồi 1 thành "Phế vật cầu tiên": mục tiêu là cải tạo linh căn; không cải tạo được thì kết "Ngước nhìn trời cả đời" |
| **Diệt Thế Ma Đồ** | Kẻ bị thế gian ruồng bỏ thành tai họa của nó | Bị ruồng bỏ | Ma chủng (ma công, tiếng thì thầm) | Huyết Nguyệt Ma Kiếp | Ma vực (lập thế lực, ra tay với tông chính) | Ma Chủ Phục Sinh | Diệt thế (3 khu thành đất ma, hồi phục dần — 14.9) / Bị vây giết / Quay đầu, chết như người thường / Ma chủ một phương | "Ma nô": huyết tế khai mạch |
| **Đế Nghiệp** | Từ bùn đất ngồi lên ngai vàng — trong thế giới tu sĩ coi ngai vàng như đồ chơi | Loạn thế (thuế, đói, bắt lính, thi cử) | Lập thân (thăng quan, lập công) | Đổi Ngôi | Tranh thiên hạ (thế gia tu tiên đứng sau các phe) | Đăng cơ và cái giá (tu sĩ đòi cống nạp: giữ dân hay giữ ngôi) | Khai quốc (triều đại mang tên bạn ở kiếp sau) / Bị tru di / Phò minh chủ / Quy ẩn khi thiên hạ loạn | Bản gốc là cho phàm nhân; có linh căn thì thành "Quốc sư hộ quốc" |
| **Phú Giáp Thiên Hạ** | Đồng tiền mở mọi cửa, trừ cửa trời | Gánh hàng đầu | Thương lộ (đường buôn, cướp, đối thủ) | Hạn Hán Trăm Năm (đầu cơ hay phát chẩn) | Thương minh (đấu thế gia, buôn với tu sĩ) | Mua trường sinh (dùng gia tài mua Khai Linh Đan, Diên Thọ Đan, tiên duyên cho con) | Phú khả địch quốc / Phá sản / Mua được đường tu tiên cho mình / Chết giàu mà cô độc | Hợp nhất với vô linh căn: hồi 5 là đường cải tạo #1 |
| **Huyết Cừu** | Mối thù đến trước cả khi biết nói | Diệt môn (kẻ ra tay là một thế lực thật trong thế giới) | Truy dấu | Tông Chiến Chính–Ma (kẻ thù đứng ở một phe) | Sự thật (kẻ thù không hẳn ác, hoặc nhà mình từng ác) | Báo hay tha | Báo thù rồi trống rỗng / Chết trước kẻ thù / Hóa giải / Thành kẻ mình căm ghét | Báo thù bằng võ, độc, mưu, hoặc thuê người |
| **Võ Lâm Chí Tôn** | Đỉnh cao của người thường, dưới chân tu sĩ | Võ quán | Giang hồ (lôi đài, kết nghĩa) | Thú Triều (võ lâm giữ thành) | Khai phái | Võ đạo đối tiên đạo (tông môn ép võ lâm quy phục) | Minh chủ, môn phái truyền đời / Chết dưới tay tu sĩ / Phá kén sang Thể tu / Rửa tay gác kiếm | Bản gốc dành cho vô linh căn |
| **Thế Gia Vạn Đại** | Một đời không thành tiên, trăm đời có thể | Bờ ruộng (sinh kế, cưới hỏi) | Con trắc linh | Đại Dịch hoặc Hạn Hán (giữ nhà) | Dựng tộc (gia phả, ruộng, gửi con lên núi) | Truyền đời (dòng họ sang kiếp sau; kiếp sau đầu thai vào dòng họ thì mở hồi tiếp) | Thế gia một vùng / Tuyệt tự / Con cháu thành tiên / Tộc tan vì tranh đoạt | Bản gốc dành cho vô linh căn |
| **Y Giả Độ Thế** | Cứu được người, không cứu được đời | Hiệu thuốc | Bệnh không tiền | Đại Dịch Nam Trạch | Thuốc và độc (bị ép làm độc, thử thuốc trên người) | Phương thuốc cuối (cứu một thành bằng thọ, linh căn hoặc mạng) | Thần y / Chết vì dịch / Thành độc vương / Y thư truyền đời | Lang trung phàm nhân |
| **Tỉnh Mộng** | Có người sống mãi mà không biết mình đang mơ; có kẻ nghèo khổ lại thấy vết nứt của giấc mộng | Cảnh quen (Người Gác Bến lần đầu) | Dấu vết kiếp trước (mộ, đồ chôn, vở tuồng kể đời mình) | Tiên Nhân Hạ Phàm hoặc Bí Cảnh Thượng Cổ | Bến Vong Xuyên trên trần thế (địa điểm ẩn) | Chọn tỉnh hay mơ | Nhặt hai Mộng Ấn / Điên loạn / Ở lại giấc mộng vì người thương / Chết trong cơn mê | Không cần linh căn |

Mỗi hồi gồm 3–5 **nút**. Một nút có: điều kiện mở (tuổi, năm thế giới, cảnh giới, nơi, cờ), lời mời (cách tới tay người chơi), hạn mềm, các lựa chọn, nhánh "tự diễn" khi lỡ hạn, cờ để lại.

#### 14.6 Ánh xạ xuất thân → mệnh tuyến

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

#### 14.7 Đại Mộng và kết thúc thật

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

#### 14.8 Thời gian giữa hai kiếp

**Đã có sẵn**: mỗi lần chết, thế giới trôi ngẫu nhiên 3–30 năm; màn Hết kiếp đã báo số năm. Nên "random thời gian luân hồi" không phải tính năng mới, chỉ là **nới rộng** nó.

**Đề xuất phân bố**

| Khoảng | Số năm | Tỉ lệ gốc | Lời ở Bến Vong Xuyên |
|---|---|---|---|
| Gần | 3–30 | 55% | "Mấy chục năm trôi qua bên bến." |
| Vừa | 30–150 | 28% | "Hơn trăm năm trôi qua bên bến." |
| Xa | 150–800 | 13% | "Mấy trăm năm trôi qua bên bến." |
| Rất xa | 800–5.000 | 4% | "Ngàn năm nước Vong Xuyên chảy qua chân." |

Điều chỉnh:
- **3 kiếp đầu chỉ ở khoảng Gần**: người mới kịp thấy mộ mình, kẻ thù và ân nhân kiếp trước, nên hiểu được vòng nhân quả.
- Bậc Nghiệp −3 / −4: Xa ×2, Rất xa ×3 ("chịu phạt dưới U Minh").
- Còn tuyến Huyết thù hoặc Duyên sinh tử đang mở: 40% bị kéo về khoảng Gần ("chấp niệm kéo về").
- Mệnh tuyến Thế Gia Vạn Đại tới hồi 5 và dòng họ còn: 50% về Gần hoặc Vừa.
- Thêm một lựa chọn ở Bến Vong Xuyên: **"Uống canh, đi ngay"** → chỉ tung trong Gần/Vừa nhưng mất ký ức công pháp kiếp trước; **"Ngồi đợi bên bến"** → tung bình thường, giữ ký ức như hiện tại (lần đầu chọn thì mở Mộng Ấn #1).
- Thiên Lộ Mở và Ma Chủ Phục Sinh không bị tua qua mà người chơi không biết: sau khoảng cách, Sổ tay có trang **"Sử lược"** kể các đại sự đã xảy ra khi bạn vắng mặt.

**Thế giới thay đổi theo độ dài khoảng cách**

| Thứ | Gần (đến 30 năm) | Vừa (đến 150) | Xa (đến 800) | Rất xa (trên 800) |
|---|---|---|---|---|
| Thiên kiêu | già đi như hiện tại | phần lớn đổi thế hệ; ai từ Kết Đan còn sống thành "lão quái" | gần hết đổi; Nguyên Anh trở lên còn (thọ 650 / 1.500 / 3.000) | chỉ Hóa Thần trở lên còn, thành truyền thuyết |
| Tông môn | như cũ | mỗi thế kỷ 10% một tông suy hoặc diệt, tông mới lập | nhiều tông đổi; tông cũ thành di tích | bản đồ thế lực gần như mới; tông cũ thành phế tích để khám phá |
| Triều đại | thường giữ | đổi 1–2 lần | đổi nhiều lần (60–120 năm một lần) | sử sách chỉ còn tên |
| Mộ, đồ chôn | giữ | mộ phủ cỏ; mỗi thế kỷ 10% đồ chôn bị người đào | mộ thành gò; đồ chôn còn 30% | chỉ còn bia ở nơi linh khí; chỉ đồ phẩm Địa trở lên còn (thành "cổ bảo") |
| Dòng họ | con cái còn sống | cháu chắt; mỗi thế kỷ 20% tuyệt tự | thành thế gia hoặc mất | thành truyền thuyết tổ tiên |
| Võ phái | còn | mỗi thế kỷ 70% còn | hiếm còn | chỉ còn bí tịch thất truyền |
| Ân / Oán / Nợ | người đó còn | người phàm đã chết → 50% chuyển sang hậu duệ, còn lại khép | chỉ còn hậu duệ hoặc tông của họ; Huyết thù có thể hóa oán hồn | chỉ còn tuyến với tu sĩ cao cảnh giới còn sống, hoặc oán hồn ngàn năm |
| 12 đại sự | tua như thường | đại sự đến hạn tự diễn với kết cục mặc định | như Vừa, nhiều lần | như Vừa; Thiên Lộ mở đóng nhiều lần |
| Đất ma | gần như không đổi | hồi phục theo 14.9 | hồi phục theo 14.9 | hồi phục theo 14.9 |

**Ảnh hưởng tới code**

| Phần | Mức sửa | Lý do |
|---|---|---|
| Tung khoảng thời gian | rất ít | Đã có một dòng tung 3–30 năm |
| Tua thế giới khoảng dài | vừa | Hiện tua **từng tháng**: 5.000 năm = 60.000 vòng, mỗi tháng 3% một nơi đổi chủ → thế giới bị xáo tung và máy chậm. Cần thêm cách tua **theo thập kỷ** cho khoảng Xa / Rất xa (mỗi thập kỷ tính một lần: đổi chủ, tông suy thịnh, triều đại, đại sự) |
| Thiên kiêu nhiều thế hệ | ít | Đã có; chỉ cần thay người chết nhiều lần thay vì một lần |
| Ân oán chuyển sang hậu duệ / oán hồn | vừa | Luật mới khi kết kiếp |
| Sự kiện về kiếp trước (mộ, báo ân, kẻ thù cũ, tin đồn) | ít đến vừa | Lời kể cần hai, ba biến thể theo khoảng cách; không viết cứng số năm |
| Mệnh tuyến | không ảnh hưởng | Mệnh tuyến nằm trong một kiếp, tính từ năm đầu thai |
| 12 đại sự | vừa | Phải theo năm tuyệt đối của thế giới, có chu kỳ và có sẵn kết cục mặc định để tự diễn khi tua |
| Dung lượng bản lưu | ít | Sử thế giới giữ 60 dòng; thêm "Sử lược" gộp theo thế kỷ để không phình |

**Cốt truyện có bị lệch dòng thời gian không?** Không, nếu giữ 3 quy tắc:
1. Mọi sự kiện đọc **trạng thái hiện tại** của thế giới (ai còn sống, tông nào còn, triều nào cai trị), không giả định năm.
2. Mỗi đại sự có chu kỳ và có **kết cục mặc định** khi không ai can thiệp.
3. Lời kể dùng chữ chỉ khoảng cách ("mấy trăm năm trước") thay cho số năm cụ thể.

Khoảng cách xa còn giúp cho chủ đề: quay lại sau 500 năm, tông mình từng phụng sự đã thành phế tích, triều đại mình lập chỉ còn trong sử, kẻ thù cũ đã thành lão quái — đúng tầng "mộng". Đề xuất làm cùng đợt với 12 đại sự (đợt 8); trước đó giữ 3–30 năm.

#### 14.9 Đất ma (bản tạm: 3 khu)

- Khi mệnh tuyến Diệt Thế Ma Đồ đạt kết cục "Diệt thế", hoặc đại sự Ma Chủ Phục Sinh tự diễn mà không ai ngăn: **3 khu nhỏ** gần nơi xảy ra hóa **đất ma**, mỗi khu bắt đầu với **ma khí 100**.

| Ma khí | Tên | Ảnh hưởng |
|---|---|---|
| 70–100 | Ma vực | Không có thôn trấn; yêu ma từ Kết Đan; tu luyện theo chính đạo −50%, ma đạo +30%; phàm nhân ở lại mỗi ngày 20% nhiễm ma khí (thương thế bậc 1, tâm ma +2) |
| 40–70 | Đất chết | Vài trại tị nạn; yêu ma Trúc Cơ đến Kết Đan; tu luyện −25% |
| 15–40 | Hoang địa | Làng mới lác đác; nguy hiểm cao hơn một tầng; có di tích ma vực (sự kiện riêng) |
| dưới 15 | Phục hồi | Như thường; còn tàn tích và tin đồn |

- Hồi phục: mỗi thế kỷ ma khí −6. Gần đó có tông Phật hoặc chính đạo trấn giữ: nhanh ×2; ma tông chiếm: chậm ×0,5. Trung bình khoảng 500 năm hết ma vực, khoảng 1.000 năm thành hoang địa, khoảng 1.400 năm phục hồi — trở lại sau 5.000 năm thì đã lành hẳn, chỉ còn di tích.
- Người chơi đẩy nhanh hồi phục: Phật pháp siêu độ, Lôi pháp trừ tà, trận tịnh hóa, trồng linh mộc (mỗi việc ma khí −1 đến −5).
- "Diệt thế toàn cõi" để dành cho sau này; dữ liệu đã có chỗ (`world.maVuc` lưu theo từng khu).

#### 14.10 Dữ liệu cần cho phần cốt truyện
- Bảng thời cục: 12 đại sự (mã, tên, khoảng năm, chu kỳ, 3 giai đoạn, điều kiện, kết cục mặc định, cờ để lại).
- Bảng mệnh tuyến: 9 mệnh tuyến × 5 hồi; khoảng **180 nút**; **36 kết cục** + "Một đời vô danh" theo 36 đạo đồ.
- Bảng chí hướng: 10 mục (mã, tên, điều kiện toại nguyện, mệnh tuyến gợi ý).
- Cảnh mở đầu: 57 xuất thân × 3 = **171 cảnh**.
- Mộng Ấn: 9 mảnh + Người Gác Bến 6 hình dạng (lão chèo đò, đứa trẻ ăn mày, ni cô mù, người bán canh, lão đạo ăn xin, bà đỡ) × 2 cảnh.
- Kỹ thuật: dùng lại hệ chuỗi đang có (`chain.paths`, `waitHours`) và schema sự kiện; thêm `kind: "arc"`; trạng thái ở `run.arc`, `world.thoiCuc`, `G.meta.mong`. Kiểm bằng `tools/test.js` (giả lập thời gian, chọn lựa chọn, lỡ hạn) — không cần bot.

---

### 15. Kết kiếp, điểm luân hồi và văn bia

- **Điểm luân hồi cộng thêm** (vào `calcPts`): mỗi bậc phàm đạo từ bậc 3 +2 (bậc 6: +8) · võ đạo Tiên thiên +4, Tông sư +8 · mỗi con sống tới 16 tuổi +1 (tối đa 5) · mỗi 3 lần cứu người +1 · mỗi hồi mệnh tuyến đã qua +2, kết cục "thành" +10 · chí hướng toại nguyện +6 · Mộng Ấn mới +5 · tân thủ tốt nghiệp +5 · chết vì thọ +3 · mỗi nhân kiếp vượt qua +1.
- **Nguyên nhân chết mới**: `doi` (chết đói) · `benh` (bệnh) · `hinh` (bị xử tử) · `nhankiep` (tai ương phàm trần). Phàm nhân chết vì thọ hiện là "Chết già" thay cho "Tọa hóa".
- **Văn bia**: một câu cho mỗi cặp đạo đồ × kết cục (36 đạo đồ × 4 = 144 câu) + 36 câu "Một đời vô danh". Giọng theo 3.4.
- **Màn Hết kiếp** thêm: trang Quả chín (9.10) · mệnh tuyến tới hồi nào, kết cục gì · chí hướng · tuyến theo sang kiếp sau · bậc Nhân Quả mang sang (chữ) · Mộng Ấn.
- **Nâng cấp luân hồi mới**: **Túc Căn** (3 bậc, 15/30/50: mỗi bậc giảm 4 điểm % vô linh căn, sàn 30%) · **Phàm Tâm** (3 bậc, 8/16/26: kinh nghiệm phàm đạo và võ đạo +10% mỗi bậc).

---

### 16. Danh mục toàn bộ dữ liệu cần có

#### 16.1 Bảng dữ liệu mới / sửa (nguồn chuẩn trong `content/`)

| Bảng | Nơi đặt đề xuất | Số mục | Nội dung | Mới / sửa |
|---|---|---|---|---|
| `ROOT` | `content/characters/root.js` | +1 tiên thiên, +8 hậu thiên | Bảng 5.1 | sửa |
| `ROOT_RATE` | `content/rules/root-rate.js` | 2 bảng | Tỉ lệ kiếp 1 / kiếp 2+, điều chỉnh nhân quả, kẹp 30–65% | mới |
| `TRAC_LINH` | `content/rules/trac-linh.js` | 5 cách | Bảng 5.3 | mới |
| `ROOT_FIX` | `content/rules/root-fix.js` | 15 + 3 + 1 | Bảng 5.5 | mới |
| Vật phẩm linh căn | `content/catalog/` | 19 | Bảng 5.6 | mới |
| `TT_DEST.vo_can` | `content/characters/tt-dest.js` | 1 | Khôi phục, bỏ dòng xoá ở core2/12 | sửa |
| `TIEN_TE` | `content/rules/tien-te.js` | 5 loại tiền | Bảng 6.1, tỉ giá, luật mất / đóng băng | mới |
| `THE_LUC` | `content/rules/the-luc.js` | 6 loại thế lực | 6.1.2: tên sổ, cách kiếm, cửa hàng / dịch vụ từng loại | mới |
| `THUONG_CAC` | `content/venues/thuong-cac.js` | 20 món + 5 bậc | 6.1.3 | mới |
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
| `LUAN_HOI_GAP` | `content/rules/luan-hoi-gap.js` | 4 khoảng + điều chỉnh | 14.8 | mới |
| `MA_KHI` | `content/rules/ma-khi.js` | 4 bậc + tốc độ hồi phục | 14.9 | mới |
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

#### 16.2 Mười hai xuất thân mới (để nhân quả có "khốn khó" và "khá giả" thật)

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

#### 16.3 Trường lưu mới (mọi trường phải đọc kiểu `r.x||0` cho bản lưu cũ)

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
| | `chMap` | { mã thế lực: số cống hiến, cờ đóng băng } | `r.ch` cũ → sổ của tông đang ở |
| | `thuongLenh`, `thuongTong` | số thẻ đang có, tổng từng nhận (bậc Thưởng Các) | 0, 0 |
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
| `world` | `thoiCuc` | trạng thái 12 đại sự | sinh mới theo năm hiện tại |
| | `suLuoc` | sử gộp theo thế kỷ | [] |
| | `thuongCac` | hàng đã bán trong tháng ở từng thành | {} |
| | `lineage` | dòng họ của người chơi | [] |
| | `vophai` | võ phái do người chơi lập | [] |
| | `dynasty` | triều đại hiện tại và lịch sử | sinh từ `quoc` |
| | `maVuc` | danh sách khu đất ma: { khu, ma khí } | [] |

#### 16.4 Nội dung cần viết (theo schema sự kiện, giọng văn 3.4)

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

#### 16.5 Giao diện cần làm (đều ở `src/react`, màn mới đăng ký trong `main.jsx`)
- Bảng Nhân vật: dòng **Đạo Hướng** (chữ + thanh hai màu), dòng **Nhân Quả** (chữ), thẻ **Đạo đồ**, dòng "Theo năm tháng" trong tooltip khí vận/thể chất/mệnh cách, linh căn "chưa trắc".
- Thẻ đầu thai: "Linh căn: chưa trắc" (kiếp 2+), câu gợi ý mơ hồ khi có Thiên nhãn.
- HUD: ô **Hầu bao** (linh thạch + bạc; bấm mở bảng cống hiến từng thế lực và Thưởng Lệnh); trạng thái ăn (biểu tượng bát cơm).
- Cửa hàng **Thưởng Các** ở thẻ địa điểm của thành có bảng treo thưởng; cửa hàng cống hiến riêng của từng thế lực.
- Sổ tay: trang **Sử lược** (đại sự đã xảy ra khi vắng mặt).
- Sổ tay: thẻ **Nhân quả**, thẻ **Mệnh thư** (mệnh tuyến + chí hướng + thời cục đang diễn ra).
- Khung **Tân thủ** (13.2).
- Màn Hết kiếp: Quả chín, mệnh tuyến, Mộng Ấn, văn bia mới.
- Bến Vong Xuyên: hội thoại Người Gác Bến, Mộng Ấn đã có, hai lựa chọn "Uống canh, đi ngay" / "Ngồi đợi bên bến", lời báo khoảng thời gian bằng chữ.
- Bảng chuẩn bị đột phá: lời báo kiếp dữ / công đức hộ thể; tỉ lệ bằng chữ.
- Thẻ địa điểm: nhóm nút "Mưu sinh".

#### 16.6 Quy ước cho người viết nội dung (bổ sung GUIDELINE)
- Hiệu ứng sự kiện mới dùng `deed` (mã bảng 10) hoặc `ck`, `tk`, `phuc`, `nghiep`; **không dùng `karma`** nữa (bộ kiểm `content:check` báo lỗi khi gặp `karma` ở mục mới).
- Hạt quả chín: `seed: {loai, tre_thang, phuc, nghiep, ai}`. Tuyến: `tuyen: {loai, muc, ai, han}`.
- Tiền phàm: `bac` (đơn vị văn). Kinh nghiệm đạo đồ: `path: {id, xp}`.
- Mỗi lựa chọn "thiện" phải có ít nhất một nhánh xấu và ngược lại (trụ cột "Không phán xét").
- Không viết số trong lời kể về Đạo Hướng, Nhân Quả, tuế biến.

---

### 17. Bài kiểm tra cần thêm

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
| `tien_te` | Cống hiến tông A không tiêu được ở tông B; trục xuất mất hết; tự rời thì đóng băng; bản lưu cũ `r.ch` vào đúng sổ |
| `thuong_lenh` | Thẻ theo bậc nhiệm vụ; bỏ / trễ −1; bậc Thưởng Các không giảm khi tiêu; giới hạn tháng theo thành |
| `khoang_luan_hoi` | 3 kiếp đầu chỉ khoảng Gần; khoảng Xa dùng tua theo thập kỷ (không chạy 60.000 vòng); tuyến người phàm đã chết chuyển hậu duệ hoặc khép |
| `ma_khi` | Đất ma sinh 3 khu; ma khí giảm theo thế kỷ; đổi bậc đúng ngưỡng |
| `tan_thu` | Chỉ kiếp 1; A tuần tự; B tối đa 3; bỏ qua không có thưởng; tốt nghiệp từ 25 |
| `luu_cu` | Bản lưu có `karma` chuyển đúng sang Chính khí/Tà khí/Phúc/Nghiệp |
| `menh_tuyen` | Lỡ hạn → tự diễn → nhánh "Người đứng ngoài", không kẹt; chuyển mệnh tuyến một lần |

**`tools/test-ui.js` (giao diện)**: khung tân thủ hiện, bấm thẻ mở đúng bảng / làm nhấp nháy đúng nút, nút Bỏ qua mở hộp xác nhận đúng chữ, nút ẩn/hiện; tooltip Đạo Hướng, Nhân Quả, "Theo năm tháng" **không chứa chữ số**; thẻ đầu thai kiếp 2 ghi "chưa trắc".

Bot chỉ dùng khi người dùng yêu cầu (đo độ khó Phần 4).

---

### 18. Lộ trình triển khai theo đợt

| Đợt | Nội dung | Vì sao trước |
|---|---|---|
| 1 | Tách `karma` → Đạo Hướng + Nhân Quả, bảng hành vi, chuyển bản lưu, thay mọi chỗ dùng, thiên kiếp công bằng | Mọi phần sau dựa vào hai thước đo này |
| 2 | Vô linh căn, tung một lần, giấu thẻ, trắc linh, khôi phục Vô Căn; móc "qua năm" + tuế biến | Cốt lõi yêu cầu 1–4, 10 |
| 3 | Năm loại tiền (bạc, cống hiến theo thế lực, Thưởng Lệnh + Thưởng Các), cái ăn, việc làm thuê, gia đình cơ bản | Cần cho đời vô linh căn |
| 4 | Tân thủ 30 nhiệm vụ | Chỉ dựa vào tính năng đã có + đợt 1 |
| 5 | Võ đạo + 5 phàm đạo đầu (Nông dân, Ngư dân, Thương nhân, Võ giả, Lang trung) | Cho vô linh căn có đời sống |
| 6 | 15 đường cải tạo linh căn | Cần đợt 2, 3, 5 |
| 7 | 12 phàm đạo còn lại; tu đạo và pháp môn theo cụm (kiếm/thần thức → trận/phù → ngự thú/triệu hoán → huyết/hồn/thôn phệ/thi → phật/lôi/nho → cổ/độc/khôi lỗi/âm/huyễn/ẩn sát/thiên cơ) | Khối lớn nhất |
| 8 | Thời gian luân hồi mở rộng + tua theo thập kỷ + đất ma; thời cục 12 đại sự + 2 mệnh tuyến đầy đủ làm mẫu (Phi Thăng Lộ, Thế Gia Vạn Đại), rồi 7 mệnh tuyến còn lại, 12 xuất thân mới, cảnh mở đầu | Cần đạo đồ để vai trò có nghĩa |
| 9 | Đại Mộng, Mộng Ấn, kết thúc thật, văn bia | Đỉnh của toàn bộ |
| 10 | Chỉnh độ khó Phần 4 | Chỉ khi người dùng cho chạy bot đo |

---

### 19. Những điểm cần bạn xác nhận

**Đã chốt**
- Thêm tiền tệ: bạc, cống hiến riêng từng thế lực, Thưởng Lệnh đổi hàng ở Thưởng Các (Phần 6.1).
- Diệt thế tạm thời = 3 khu thành đất ma, hồi phục dần (14.9).
- Mức 45% vô linh căn, khoảng 30–65%.
- Lời giải Đại Mộng (Mộng Ấn #9).

**Còn mở**
1. Cách xử lý linh căn trên thẻ đầu thai: A (giấu + dùng chung, đề xuất), B (dùng chung nhưng hiện rõ) hay C (giữ như cũ, nâng tỉ lệ mỗi thẻ). Giải thích ở 5.3.
2. Phi thăng khi chưa đủ 9 Mộng Ấn là "Mộng trong mộng" (vẫn luân hồi). Câu này chưa được trả lời; file tạm giữ đề xuất.
3. Thời gian luân hồi: khoảng xa nhất 5.000 năm và tỉ lệ 55 / 28 / 13 / 4% (14.8) có được không.
4. Lựa chọn mới ở Bến Vong Xuyên: "Uống canh, đi ngay" / "Ngồi đợi bên bến" (14.8).


---

# PHẦN C — Toàn văn bản phân tích của GPT

> Chép nguyên văn từ nhánh `docs/phu-sinh-nhan-sinh-luan-hoi`, tệp `docs/phan-tich-nhan-sinh-luan-hoi-phu-sinh.md`. Chỗ nào khác Phần A thì làm theo Phần A.

## PHÙ SINH — Đặc tả hướng đi, nhân sinh đa kiếp và bộ dữ liệu thiết kế

Ngày biên soạn: **18/11/2026, giờ Việt Nam**. Ngôn ngữ phát hành được đặc tả: tiếng Việt. Phạm vi công việc: phân tích và tạo tài liệu mới; không triển khai tính năng, không sửa mã nguồn, không thay Excel, không thay bản lưu.


**Mục lục đọc và đối chiếu**

1. [Định hướng, phạm vi và từ điển chung](#dinh-huong).
2. [Truy vết đủ 13 yêu cầu](#truy-vet).
3. [Vòng đời chơi và nhịp cảm xúc](#vong-doi).
4. [Tham chiếu tác phẩm, nguồn và bài học thiết kế](#tham-chieu).
5. [Linh căn, Hành Đạo, Nghiệp Duyên, thiên kiếp và tiên thiên](#he-thong).
6. [Thế giới, đường đời, 45 tuyến xuất thân và tám kết thúc](#cot-truyen).
7. [Hồ sơ ba mươi nhân vật và mười thế lực](#nhan-vat-the-luc).
8. [Mười hai sự kiện nhân sinh hoàn chỉnh](#su-kien).
9. [Nghi thức kết hành trình và nguồn vận hành](#nghi-thuc).
10. [Mười sáu pháp môn lõi, chiêu thức và sản phẩm](#phap-mon).
11. [Hướng dẫn kiếp đầu và từ điển toàn bộ nhóm dữ liệu](#du-lieu).
12. [Thuộc tính, sinh kế, vật dụng, chế tạo và chiến đấu](#nen-tang).
13. [Quy tắc hợp nhất và hướng triển khai dữ liệu](#san-xuat).
14. [Phụ lục đối chiếu hiện trạng dự án](#hien-trang).
15. [Kiểm kê nội dung đã biên soạn và trạng thái kiểm định](#kiem-ke).

**Cách đọc:** bảng số là đặc tả nội bộ; câu tooltip và lời thoại là nội dung hiển thị. Các đề xuất mới chưa được áp dụng vào game. Phần 14 là hiện trạng để đối chiếu, không ghi đè các quyết định mới.

<a id="dinh-huong"></a>

### 1. Quyết định định hướng

**Phù Sinh là trò chơi nhập vai nhân sinh qua nhiều kiếp trong một thế giới tiên hiệp u ám. Tu luyện là một con đường nhiều người không thể bước vào. Mỗi đời phải có điều để mong, điều để mất và một dấu vết còn lại khi con người ấy chết.**

Ba câu hỏi dẫn đường cho mọi hệ thống:

1. Đời này ta có thể trở thành ai, với hoàn cảnh thực sự đang có?
2. Để đạt điều mình muốn, ta chịu mất gì và khiến ai phải trả giá?
3. Sang đời sau, điều gì đã kết thúc và điều gì vẫn tìm đến ta?

Không dùng cảnh giới cao nhất làm thước đo duy nhất của một đời đáng chơi. Một ngư dân trả được món nợ để con không bị bán, một kẻ bạo chúa giữ được ngai nhưng mất người gọi tên thật, một thiên kiêu sống sót qua thiên kiếp nhưng nhìn quê nhà hóa thành bãi muối đều có thể là những kết đời hoàn chỉnh. Kết đời phàm nhân không mang nhãn thất bại. Phi thăng là một cách khép hành trình, còn thức tỉnh là khả năng nhận ra và đối diện vòng lặp bằng những hành động khác nhau.

#### 1.1. Phạm vi nội dung được chốt cho bản thiết kế này

Đây là **đặc tả đầy đủ cho phạm vi phát hành xác định**, không phải lời hứa viết vô hạn nội dung cho “đại đạo ba ngàn”. Đại đạo ba ngàn được thể hiện bằng tổ hợp xuất thân, nghề nghiệp, pháp môn, quan hệ, đạo lộ và biến cố; không gắn nhãn ba nghìn cho một danh sách chưa được biên soạn.

| Khối | Phạm vi bắt buộc | Cách hiểu |
|---|---|---|
| Xuất thân | Giữ đủ 45 xuất thân đã thấy trong dữ liệu hiện hành | 15 đại tuyến, 30 biến thể có nút riêng; xuất thân không khóa nghề, không khóa kết cục |
| Địa lý | 5 đại khu hiện có; 15 địa điểm neo cốt truyện mới | Các địa điểm sinh tự do tiếp tục phục vụ đời thường; điểm neo không thay cả bản đồ |
| Nghề phàm nhân | 18 nghề được định danh | Mỗi nghề có thu nhập, hoạt động, rủi ro, quan hệ và đích đời; luyện võ không đồng nghĩa tu tiên |
| Đường tu | 16 chuyên môn được định danh | Chính đạo, ma đạo, tán tu và quan hệ với tông môn là các trục độc lập |
| Tái sinh | Kiếp đầu có căn; từ kiếp sau vô căn là kết quả phổ biến | Không bán cách né vô căn; nghề phàm nhân đủ nội dung để sống trọn đời |
| Tiên thiên | 18 thể chất; 12 khí vận được thiết kế lại trong chương hệ thống | Tách phần hiện hữu trong game với bộ thay thế được đề nghị; không cộng chồng cả hai bộ |
| Cải căn | 8 con đường có điều kiện và cái giá xác định | Tìm hiểu, chuẩn bị, thực hiện, chịu hậu quả; không nhặt vật phẩm là lập tức thành thiên kiêu |
| Tân thủ | 18 nhiệm vụ; 6 đầu tuần tự, sau đó 4 cụm mỗi cụm 3 | Chỉ đời đầu, không hạn, không phạt, được ẩn và bỏ qua từng nhiệm vụ |
| Nội dung cũ | Kiểm kê nguồn, số lượng, rủi ro kế thừa | Không tuyên bố toàn bộ vật phẩm và sự kiện cũ đã đáp ứng cơ chế mới |
| Nghiệm thu | Đối chiếu đủ 13 yêu cầu, tính đầy đủ dữ liệu và các tình huống hỏng luồng | Là tiêu chí cho công việc triển khai sau; chưa chạy kiểm thử hay đo cân bằng ở lượt này |

Các con số cân bằng trong tài liệu là **quyết định thiết kế đề nghị**, không phải kết quả đo từ người chơi. Một danh mục dữ liệu đầy đủ và một trò chơi đã được cân bằng là hai trạng thái khác nhau. Tài liệu nêu cách kiểm chứng và dữ liệu cần thu ở chương nghiệm thu, không tự nhận đã có kết quả chưa đo.

#### 1.2. Từ điển chung, tránh cùng một chữ mang hai nghĩa

| Khái niệm | Nghĩa dùng trong Phù Sinh | Không được đánh đồng |
|---|---|---|
| Vô linh căn | Cơ thể chưa có cơ quan tiếp nhận và vận hành linh khí để tu tiên | Không phải căn phẩm thấp; không phải trạng thái thiếu linh lực tạm thời |
| Phàm nhân | Người chưa nhập đạo, có thể có hoặc không có linh căn | Không đồng nghĩa vô căn; người có căn vẫn được chọn sống đời thường |
| Võ học | Kỹ năng thân thể, binh khí, chiến thuật không tiêu thụ linh lực | Không được đổi tên thành thể tu để vượt khóa vô căn |
| Thể tu | Tu luyện thân thể bằng linh khí và pháp môn | Cần có linh căn, hoặc phải hoàn thành tạo căn trước |
| Xuất thân | Gia cảnh, tổn thương ban đầu, mối ràng buộc và quan hệ | Không phải nghề vĩnh viễn, tính cách mặc định hay bản án thiện ác |
| Nghề | Hoạt động sinh kế và chuyên môn có thể đổi | Không phải phẩm cấp sức mạnh |
| Pháp môn | Cách chuyển hóa tài nguyên thành năng lực tu luyện | Huyết thuật không tự động đồng nghĩa giết người vô tội |
| Hành Đạo | Dấu nghiêng của phương thức hành xử ở kiếp hiện tại | Không phải danh tiếng xã hội, không dùng để đo kiếp sau |
| Nghiệp Duyên | Sổ hậu quả và các quan hệ chưa khép, ảnh hưởng thiên kiếp và tái sinh | Không phải một điểm thưởng dùng mua chỉ số và không phải máy bảo đảm người tốt luôn gặp may |
| Thiện duyên | Hậu quả cứu giúp, giữ lời, bồi hoàn có đối tượng | Không xóa tự động một tội khác chỉ vì cộng tổng dương |
| Nghiệp chướng | Tổn hại có mức độ, chủ thể, dấu trách nhiệm và thời gian | Không kế thừa tội của huyết thống hay nghề nghiệp |
| Danh tiếng | Điều một cộng đồng tin về nhân vật dựa trên thông tin họ có | Có thể sai, bị thao túng và được sửa bằng chứng cứ |
| Khí vận | Xu hướng gặp cơ hội và tai biến | Không thay Nghiệp Duyên, không cứu chắc mọi lần nguy hiểm |
| Đạo tâm | Khả năng giữ chủ ý và chịu xung đột tinh thần | Không đồng nghĩa hướng thiện; ma tu vẫn có thể kiên định |
| Kết đời | Khép một nhân vật, có thể tiếp tục luân hồi | Không bắt buộc đóng trò chơi |
| Kết hành trình | Khép vòng kể về luân hồi của toàn hồ sơ | Có thể xem hậu ký hoặc chơi hồ sơ mới theo lựa chọn của người chơi |

Từ “phế vật” xuất hiện trong lời chê, luật tuyển đồ của thế lực và hành vi khinh rẻ cụ thể. Phiếu nhân vật ghi “Vô linh căn — chưa thể tu luyện”. Người kể chuyện không xác nhận rằng giá trị của một con người bằng khả năng nhập đạo. Đây là cách giữ nguyên sự tàn nhẫn mà yêu cầu muốn diễn tả, đồng thời bảo vệ ý nghĩa của những đời phàm nhân.

#### 1.3. Giải quyết các xung đột ngay từ thiết kế

| Xung đột | Quyết định |
|---|---|
| Vô căn phổ biến nhưng người chơi muốn tự do | Tự do nằm ở những lựa chọn có thực trong hoàn cảnh: 18 nghề phàm, võ phái, quyền lực, tình thân, điều tra và cải căn; không hứa mọi nghề đều mở tức thì |
| Kiếp đầu cần học nhưng game phải khó | Bảo đảm có căn và có con đường tân thủ an toàn có thể chọn; không bảo đảm thiên tài, không miễn chết, không bắt làm hướng dẫn |
| Làm ác cần có lợi nhưng nhân quả phải có nghĩa | Cướp đoạt tạo tài lực và tốc độ tức thì; hậu quả do chủ thể, chứng cứ, thiên kiếp và đời sau. Làm lành có thể mất tiền, bị lừa hoặc cứu nhầm người |
| Giấu số nhưng người chơi cần hiểu luật | Hành Đạo, Nghiệp Duyên và tooltip tiên thiên hiển thị bậc chữ, chiều thay đổi, nguồn gây đổi; số thật chỉ ở dữ liệu thiết kế. Máu, giá tiền, mục tiêu và thanh tiến độ nhiệm vụ vẫn được hiện số |
| Thế giới không chờ nhưng nhiệm vụ tân thủ không có hạn | Tiến độ hướng dẫn không hết hạn; đối tượng cụ thể có thể mất đi và phải chuyển sang mục tiêu chức năng tương đương. Thời gian tuổi thọ vẫn trôi khi thực hiện hành động |
| Cốt truyện xuất thân dẫn đến kết thúc nhưng được bỏ | Đưa ra khủng hoảng và những cổng kết cục có điều kiện; thế giới tự giải quyết nếu người chơi không can thiệp. Không có NPC bất tử chỉ để giữ nhiệm vụ |
| Tàn sát mọi thế lực có thể xóa người giao nhiệm vụ cuối | Cổng kết hành trình nhận chứng cứ từ di vật, tàn tích và ký ức; không hồi sinh NPC chết để cứu luồng |
| U ám lâu dài dễ gây chai cảm xúc | Đan xen khoảng yên, sự tin cậy và thành quả nhỏ có thể giữ. Tuyệt vọng có sức nặng khi người chơi từng có điều muốn bảo vệ |
| Đời thiên tài quá dễ hoặc đời nghèo thành thời gian thừa | Thiên tài bị săn tài nguyên, nghĩa vụ, kỳ vọng và thiên kiếp cao; đời nghèo có cơ chế sinh kế, quan hệ, quyền lực và kết đời riêng, không buộc tự sát để rút lại |

<a id="truy-vet"></a>

### 2. Ma trận truy vết 13 yêu cầu

| Yêu cầu | Quyết định và dữ liệu phải có | Bằng chứng hoàn tất khi triển khai |
|---|---|---|
| 1. Thêm vô linh căn và cơ duyên cải căn | Trạng thái căn riêng; cổng khóa mọi nguồn tu vi linh khí; 8 phương thức cải căn có nguồn, điều kiện, tiêu hao, thất bại, kết quả | Không tu bằng bế quan, vật phẩm, phần thưởng sự kiện, pet, đoạt xá hoặc đổi nghề trước khi tạo căn hợp lệ |
| 2. Vô căn xác suất cao | Mặc định 60% từ đời hai; thuộc hồ sơ sinh mệnh, không tung lại khi tải | Bảng phân phối cộng đủ; căn tốt được tính có điều kiện sau bước có căn; không cộng nhầm thành vượt tổng |
| 3. Kiếp đầu luôn có căn | Cổng theo chỉ số đời đã bắt đầu, không theo việc đã chết hay đã làm tutorial | Lưu/tải, hủy màn tạo nhân vật, chết sớm và khôi phục bản cũ không sinh đời đầu vô căn |
| 4. Bị coi phế vật | Đối thoại, cơ hội bị từ chối, kỳ thị ở thế lực và cách vượt nó | Không chỉ thêm một câu mô tả; có phản ứng xã hội cụ thể và đường sống phàm nhân |
| 5. Đa dạng nhân sinh, khó tu và khó đánh | Sinh kế, tình thân, tài lực, pháp môn, quyền lực, bạo lực, mất mát, kết đời; trận có chuẩn bị, do thám, rút lui và giá dưỡng thương | Đời phàm nhân khép được không cần nhập đạo; sinh tồn và thành tựu không chỉ tăng cảnh giới |
| 6. Đại đạo ba ngàn | 18 nghề phàm, 16 chuyên môn tu; chính/ma/tán và phương pháp tu nằm trên trục độc lập | Một sát thủ phàm và một Ảnh sát tu có tài nguyên, khả năng và điều kiện khác nhau; đổi nghề không xóa quan hệ |
| 7. Nhân quả không phán theo bề ngoài | Sổ hành động có ý định, thông tin, hậu quả dự kiến, hậu quả thật, người chịu ảnh hưởng và cách sửa | Bị bà lão lừa không bị trừ phẩm hạnh vì đã giúp; giết hổ không tự bị gắn ma đạo |
| 8. Tách chính/tà khỏi nhân quả | Hành Đạo có lợi/hại đời này; Nghiệp Duyên tạo thiên kiếp và phân phối khởi đầu đời sau | Hai bộ dữ liệu và hai giao diện giải thích riêng; phần thưởng kiếp khó tăng có trần và không được nhận nếu chết |
| 9. Không dùng con số ở các chỉ số này | Bảng từ vựng bậc chữ và lời giải thích nguồn thay đổi | Không lộ số, phần trăm hoặc thanh có nhãn số ở màn nhân vật, combat, tái sinh, nhật ký, mobile và tooltip |
| 10. Hiệu ứng từng năm | Bộ lịch năm, danh mục 18 thể chất + 12 khí vận; tăng/giảm, hồi tức thời, dao động có trần | Nhảy nhiều năm áp đủ từng mốc theo thứ tự; không hồi vượt trần, không áp lại khi tải; tooltip chỉ chữ ước lượng |
| 11. Tân thủ theo nhiệm vụ | 18 nhiệm vụ đầy đủ, 20 vật phẩm hỗ trợ, điều hướng và tiến độ, ẩn/hiện, bỏ qua có xác nhận | Không hạn, không phạt, không nhận trùng; đời hai không có bảng, không spawn quest vô hình |
| 12. U ám, âm trầm và thức tỉnh | World bible, quy tắc văn phong, nhịp cảm xúc, dư âm tử vong và dấu ký ức | Không đổi mọi sự kiện thành lừa đảo; kết tốt cũng có cái giá và hậu ký cụ thể |
| 13. Đại tuyến từng xuất thân và quyền bỏ | Đủ 45 ánh xạ tuyến, mốc, nhân vật, địa điểm, biến thể và kết cục; đồng hồ thế giới, nút thay thế | Mọi mục tiêu có đường bị từ chối, bỏ, thất bại, mất người giao, chuyển đời; không buộc quay lại tuyến chính |

<a id="vong-doi"></a>

### 3. Vòng đời chơi và nhịp cảm xúc

#### 3.1. Một kiếp có bốn tầng mục tiêu đồng thời

| Tầng | Người chơi thấy | Hệ thống cần giữ |
|---|---|---|
| Trước mắt | Bữa ăn, thuốc, tiền trọ, đường qua núi, một trận có sống nổi không | Lương thực, bệnh/thương tích, tài lực, nợ, nguy hiểm đã do thám, ngày đi đường |
| Trung hạn | Có nghề, giữ lời hẹn, trả thù, mở tiệm, vào môn, tạo căn | Tiến độ nghề, lịch NPC, giấy tờ, quan hệ, cơ duyên, tu vi và điều kiện pháp môn |
| Cả đời | Ngôi vua, võ phái, phi thăng, người cần cứu, quyền thống trị hoặc một mái nhà | Đại tuyến xuất thân, tham vọng tự chọn, cổng kết đời và hậu ký |
| Nhiều kiếp | Nhận ra cùng một món nợ và tìm cách khép nó | Sổ Nghiệp Duyên, di sản thế giới, chứng cứ mộng hồi và các cổng thức tỉnh |

Thao tác lõi: biết một điều → chọn việc muốn làm → chuẩn bị → đi và hành động → nhận kết quả cùng thời gian đã mất → nhìn thế giới phản ứng → điều chỉnh mục tiêu. Chết mở sổ đời và Bến Vong Xuyên; không chỉ trả về màn chọn cộng điểm.

#### 3.2. Tốc độ và quyền dừng đọc

Giữ đơn vị lịch hiện có: một ngày 24 giờ, một tháng 30 ngày, một năm 12 tháng, tức 8.640 giờ game. Đây là lịch của Phù Sinh, không phải lịch dương ngoài đời. Trong sự kiện, bảng nhân vật, modal, phần đọc chi tiết nhiệm vụ tân thủ và màn kết đời, thế giới dừng để người chơi đọc. Tiêu hao thời gian được thông báo trước ở hành động; thoát tab không tự trôi nhiều năm. Không tăng tuổi vì người chơi cần đọc lâu.

Mỗi lần nhảy thời gian phải giải theo thứ tự thời điểm, gồm mùa vụ, hợp đồng, quan hệ, sinh nhật, hiệu ứng tiên thiên, đói/bệnh, thế cục, tuổi thọ và kết quả bế quan. Nếu chết tại giữa khoảng nhảy, dừng tại lúc chết; không nhận sản lượng, hồi phục hoặc hiệu ứng của các năm chưa sống đến. Một báo cáo tổng hợp sau nhảy thời gian nêu: số mùa thu hoạch, chi tiêu, người đã mất, địa điểm đổi chủ, biến động thân thể và nhiệm vụ bị chuyển mục tiêu.

#### 3.3. Chọn động cơ của đời này

Ở đầu đời cho chọn hoặc để trống một nguyện vọng: “Đủ sống”, “Giữ người thân”, “Lập thân bằng nghề”, “Nắm quyền”, “Báo thù”, “Tìm đường nhập đạo”, “Đột phá phi thăng”, “Truy dấu luân hồi”. Đây là bộ lọc gợi ý tin tức và cổng kết đời, không là buff và không trừ thưởng nếu đổi. Trong sổ đời có nút “Đổi điều ta muốn”; các mục tiêu xuất thân còn tồn tại bên cạnh, không bị xóa.

#### 3.4. Quy tắc cho sự tuyệt vọng có ý nghĩa

1. Trước mất mát lớn phải có dấu hiệu có thể nhận ra hoặc thông tin cho thấy đang bước vào vùng chưa biết; không bảo đảm luôn đủ thông tin.
2. Một nhân vật từng được cứu được phép phản bội, nhưng phản bội phải đến từ mục đích và điều kiện đã tồn tại, không vì người chơi bấm lựa chọn tử tế.
3. Không dùng tỷ lệ phản bội cố định cho mọi hành động giúp đỡ. Có quan hệ đáng tin có thể giữ qua nhiều năm.
4. Thua có thể mất tài lực, thời gian, thân thể hoặc quan hệ; không mặc định mọi thất bại đều chết. Chết phải có nguyên nhân truy lại được.
5. Kết đời ghi riêng điều đạt được, người bị bỏ lại, hậu quả còn sống và một hình ảnh cuối. Không đóng dấu “đời vô dụng” vì không tu luyện.
6. Trò chơi không bắt người chơi hành hạ ai để mở đủ cốt truyện. Nhánh bạo lực mở hậu quả riêng, những nhánh khác có thông tin thay thế với cái giá khác.

---

<a id="tham-chieu"></a>

### 4. Tham chiếu tác phẩm, nguồn và bài học thiết kế

**Mốc tra cứu: 18/11/2026, múi giờ Asia/Saigon.** Đây là tập tham chiếu có chọn lọc cho yêu cầu thiết kế, không phải bảng xếp hạng toàn thị trường. “Gần đây” được tách thành tác phẩm thuộc làn sóng mới và bằng chứng tiếp nhận trong giai đoạn 2025–2026; một truyện có lượt cập nhật hoặc giải thưởng mới không đồng nghĩa với việc truyện mới ra mắt. Nguồn dưới đây gồm trang phát hành, trang nhà phát triển và bài phê bình có danh tính. Phần **suy diễn thiết kế** là đề xuất riêng cho Phù Sinh, không phải khẳng định tác phẩm nguồn đã có đúng cơ chế đó.

#### R01 — Phàm Nhân Tu Tiên Truyện — Vong Ngữ

- **Căn cứ:** phần giới thiệu chính thức mô tả một thiếu niên nghèo, tư chất bình thường, gia nhập một môn phái nhỏ và phải tránh những người có thể hại mình trên con đường tu luyện. Trang xác nhận tác giả và bản dịch được cấp phép từ Yuewen. [Trang tác phẩm tại Wuxiaworld](https://www.wuxiaworld.com/novel/rmji).
- **Suy diễn thiết kế:** khó khăn nên đến từ thế yếu, thiếu tin tức, thiếu tài lực và lựa chọn thời cơ. Điều tra trước khi săn, mua thông tin, tích trữ thuốc và rút lui phải tạo lợi thế có thể nhận biết. Một người rất mạnh vẫn có thể mất tài sản hoặc quan hệ khi giải quyết vấn đề bằng vũ lực.
- **Giới hạn áp dụng:** tư chất kém của nhân vật nguồn không phải bằng chứng cho “vô linh căn”. Quy tắc vô căn tuyệt đối không nhập đạo là luật mới của Phù Sinh; cơ duyên cải căn phải được viết thành nội dung riêng.

#### R02 — Tiên Nghịch — Nhĩ Căn

- **Căn cứ:** trang phát hành giới thiệu một thiếu niên được gia đình kỳ vọng nhưng tư chất tu tiên chỉ ở mức thường; nhãn chính thức có yếu tố bi kịch. [Trang tác phẩm tại Wuxiaworld](https://www.wuxiaworld.com/novel/renegade-immortal).
- **Suy diễn thiết kế:** tuổi tác, mất mát, lời hứa và sự đổi khác của con người cần tồn tại ngoài thanh tu vi. Sau một thời gian bế quan dài, người quen có thể đã già, một món nợ đã chuyển sang thế hệ sau, cửa hàng cũ đổi chủ. Tu luyện thành công có thể đồng thời là thất bại trong một quan hệ.
- **Giới hạn áp dụng:** không biến mỗi lần mạnh lên thành một vụ thảm sát bắt buộc. Bi kịch chỉ có trọng lượng khi người chơi từng có thứ để gắn bó và còn quyền lựa chọn cách phản ứng.

#### R03 — Cầu Ma — Nhĩ Căn

- **Căn cứ:** giới thiệu chính thức đặt nhân vật trước một khả năng tiến thân gần như không có, một cơ duyên bất thường và câu hỏi có nên giao mọi thứ cho số mệnh; trang ghi nhận tựa tiếng Anh đổi theo ý tác giả. [Pursuit of the Truth tại Webnovel](https://www.webnovel.com/book/pursuit-of-the-truth_7853880705001905).
- **Suy diễn thiết kế:** đường thức tỉnh liên kiếp nên xoay quanh việc nhận ra mình đang sống vì điều gì, thay vì chỉ tích lũy sức mạnh mang sang đời sau. Những vật nhỏ lặp lại qua nhiều đời có thể giúp người chơi tự nối ký ức. Cơ duyên thay đổi tư chất cần có dấu vết điều tra trước khi trả giá.
- **Giới hạn áp dụng:** bí ẩn không được làm sai lệch giao diện điều kiện chiến đấu. Người chơi có thể chưa biết sự thật của thế giới nhưng phải hiểu vì sao thao tác hiện tại bị khóa.

#### R04 — Nhất Thế Chi Tôn — Ái Tiềm Thủy Đích Ô Tặc

- **Căn cứ:** giới thiệu chính thức nhắc trực tiếp đến luân hồi, đại kiếp tái hiện và hành trình thoát khỏi giới hạn của vòng lặp. [The Sage Who Transcended Samsara tại Webnovel](https://www.webnovel.com/book/the-sage-who-transcended-samsara_6838664202001505).
- **Suy diễn thiết kế:** tách ba tầng kết thúc: kết một mối chuyện xuất thân, khép một đời và giải quyết bí mật luân hồi. Một đời làm hoàng đế được công nhận là hoàn chỉnh dù chưa phi thăng. Dấu hiệu của vòng lặp nên có nhiều đường tìm thấy, qua sử liệu, quan hệ, vật chứng và trải nghiệm sống.
- **Giới hạn áp dụng:** không sao chép cơ cấu nhiệm vụ hay thực thể điều khiển luân hồi của tác phẩm. Phù Sinh cần lời giải và biểu tượng riêng; tuyến thức tỉnh không trở thành chuỗi nhiệm vụ bắt mọi nghề phải đánh cùng một trùm.

#### R05 — Cổ Chân Nhân — Cổ Chân Nhân

- **Căn cứ:** giới thiệu chính thức xác nhận trọng tâm là nhân vật phản diện tái sinh, dùng kinh nghiệm và mưu lược để theo đuổi mục tiêu trong thế giới tàn khốc. [Reverend Insanity tại Webnovel](https://www.webnovel.com/book/reverend-insanity_7996858406002505).
- **Suy diễn thiết kế:** ma đạo cần lợi ích hiện tại đủ rõ để là một lựa chọn thật: chiếm tài nguyên nhanh, đe dọa làm đối thủ đầu hàng, đổi thương tổn lấy sức mạnh. Cái giá đi vào truy sát, hao mòn quan hệ, bất ổn công pháp và nghiệp chướng; không được xóa lợi ích vừa đạt bằng một hình phạt vô cớ.
- **Giới hạn áp dụng:** không lấy hiệu quả của một nhân vật hư cấu làm lý do cho ma đạo luôn tối ưu. Trang Webnovel gắn nhãn “Completed” cho ấn bản của nền tảng; nhãn đó không đủ xác nhận toàn bộ nguyên tác đã có kết thúc. Tài liệu không khẳng định truyện đã được viết tiếp hay đã được gỡ cấm tại thời điểm tra cứu.

#### R06 — Đạo Quỷ Dị Tiên — Hồ Vĩ Đích Bút

- **Căn cứ:** bài tường thuật hội thảo ngày 01/11/2024 mô tả việc kết hợp tu tiên, yếu tố quỷ dị và sự giằng co giữa hai thế giới, đồng thời bàn về thật–giả, tồn tại–cái chết và sự quan tâm đến nỗi khổ của người ở dưới đáy. [Hội thảo tại Văn Nghệ Báo](https://wyb.chinawriter.com.cn/content/202411/01/content76790.html).
- **Suy diễn thiết kế:** giữ sắc u ám bằng tín ngưỡng đáng ngờ, nghi thức có chi phí và sự bất an trong những điều quen thuộc. Nỗi sợ nên gắn với bữa ăn, căn nhà, người thân và thân thể. Mỗi bí mật quan trọng phải để lại ít nhất hai vật chứng độc lập, để sự mơ hồ tạo suy nghĩ thay vì biến thành lừa người chơi.
- **Giới hạn áp dụng:** không sao chép bệnh trạng, thực thể hoặc nghi thức của nguồn. Tránh viết mọi người nghèo đều xảo trá; thế giới cần người đáng tin, việc tử tế thất bại và việc tử tế đem lại ý nghĩa thật.

#### R07 — Xích Tâm Tuần Thiên — Tình Hà Dĩ Thậm

- **Căn cứ:** bài phê bình ngày 01/07/2024 ghi nhận cách khai triển truyền thống, chiều sâu lịch sử và thái độ nghiêm cẩn của tác phẩm. Trang vinh danh chính thức còn ghi thứ hạng năm 2025 và tháng 05/2026, đủ chứng minh sự hiện diện gần đây; không dùng thứ hạng đó để khẳng định tình trạng đăng truyện hiện tại. [Bài phê bình tại Văn Nghệ Báo](https://wyb.chinawriter.com.cn/Pad/content/202407/01/content75327.html); [trang vinh danh Qidian](https://book.qidian.com/honor/1016530091).
- **Suy diễn thiết kế:** quốc gia, pháp luật, tông môn và lịch sử phải là lực tác động thật lên đời người. Một quan viên có thể đổi việc phân phối lương; một quân nhân có thể giữ đường di tản; một tu sĩ có thể bảo hộ hoặc chiếm đoạt cùng khu vực. Mỗi nghề vì thế nhìn thấy một mặt khác của cùng khủng hoảng.
- **Giới hạn áp dụng:** lập trường đạo đức của tác phẩm không trở thành kết luận bắt buộc của game. Không khóa kết thúc thức tỉnh theo nhãn chính đạo.

#### R08 — Huyền Giám Tiên Tộc — Quý Việt Nhân

- **Căn cứ:** hội thảo năm 2024 mô tả nhiều thế hệ một gia tộc phải sinh tồn giữa tông môn và thế gia; bài ngày 22/12/2025 tiếp tục ghi nhận thành tựu và cách xây dựng quần tượng. Đây là tham chiếu làn sóng mới có bằng chứng tiếp nhận gần đây. [Hội thảo năm 2024](https://www.chinawriter.com.cn/n1/2024/0514/c404023-40235867.html); [bài ghi nhận năm 2025](https://www.chinawriter.com.cn/n1/2025/1222/c404023-40629463.html).
- **Suy diễn thiết kế:** mỗi NPC có thể chết nhưng quan hệ và tài sản để lại tiếp tục vận động. Chủ nợ đổi thành người thừa kế; một môn phái diệt vong để lại người lưu lạc và hồ sơ. Xuất thân cung cấp một mạng quan hệ ban đầu, không phải nghề trọn đời; một thế hệ yếu vẫn có thể để lại thay đổi xã hội lâu dài.
- **Giới hạn áp dụng:** không mặc định chuyển sinh luôn vào cùng huyết thống. Di sản liên kiếp của Phù Sinh có thể đi qua vùng đất, lời thề, tổ chức và vật chứng, phù hợp người chơi từng sống ở hai phía đối địch.

#### R09 — “Không có tiền thì tu tiên gì?” — 熊狼狗, 没钱修什么仙？

- **Căn cứ:** bài phê bình năm 2025 xác định đây là tác phẩm khởi đầu năm 2024, dùng tu tiên để phản tư về cạnh tranh và chênh lệch tầng lớp. Trang Qidian ghi hạng ba bảng nam tháng 10/2026, công bố 01/11/2026. Đây là bằng chứng gần thời điểm soạn nhất trong nhóm truyện được đối chiếu, không phải tuyên bố đây là truyện mới nhất của toàn thể loại. [Bài phê bình ngày 27/08/2025](https://www.chinawriter.com.cn/n1/2025/0827/c404027-40551112.html); [trang vinh danh Qidian](https://book.qidian.com/honor/1042256511).
- **Suy diễn thiết kế:** tài nguyên, quyền tiếp cận thầy dạy, phí nhập môn và thế độc quyền phải giải thích vì sao người có căn vẫn không chắc tu được. Những nghề phàm có thể tác động chuỗi cung ứng; thương nhân hoặc dược sư giữ vai trò riêng, thay vì làm việc phụ để chờ trở thành tu sĩ.
- **Giới hạn áp dụng:** giữ ngôn ngữ cổ phong của Phù Sinh. Không bê nguyên trường học, tín dụng hoặc thuật ngữ hành chính hiện đại; không làm nghèo đói thành chuỗi thao tác thuế phí lặp vô nghĩa.

#### R10 — The Scroll of Taiwu / Thái Ngô Hội Quyển — ConchShip Games

- **Căn cứ:** trang nhà phát triển trên Steam mô tả thế giới võ hiệp, nhiều thế hệ kế thừa và một xung đột dài hạn xuyên thế hệ. Trang hiện mang tên The Scroll of Taiwu: Beyond The Dome và ghi mốc phát hành ban đầu năm 2018. [Trang chính thức trên Steam](https://store.steampowered.com/app/838350/).
- **Suy diễn thiết kế:** một mục tiêu dài hạn có thể tồn tại trong khi từng đời có nghề, tuổi thọ và mối quan hệ khác nhau. Mỗi xuất thân nên có khủng hoảng tự diễn tiến; việc không can thiệp cũng tạo một kết quả có thể quay lại khám phá ở đời sau.
- **Giới hạn áp dụng:** không đồng nhất kế thừa với luân hồi. Không ép con cháu thay thế quyền tự chọn xuất thân, và không mang toàn bộ quản lý gia tộc vào Phù Sinh chỉ vì một hệ thống nguồn có nó.

#### R11 — Kenshi — Lo-Fi Games

- **Căn cứ:** mô tả chính thức nhấn mạnh sandbox mở, nhiều vai trò sinh kế và quá trình từ nạn nhân yếu ớt trở thành người có năng lực, thay cho một cốt truyện tuyến tính. [Trang chính thức trên Steam](https://store.steampowered.com/app/233860/).
- **Suy diễn thiết kế:** nghề phàm cần vòng chơi đủ sức giữ người: việc làm, vật tư, quan hệ, rủi ro, thăng tiến và kết cục. Thua có thể thành mất hàng, bị giam, thương tật hoặc mắc nợ khi bối cảnh cho phép. Người chơi cần được nhận biết mối nguy và có phương án tránh nó; sức mạnh xã hội phải giải quyết được những việc sức mạnh cá nhân khó làm.
- **Giới hạn áp dụng:** khắc nghiệt không đồng nghĩa trừng phạt mù. Không lấy việc người chơi chết thường xuyên làm chỉ số duy nhất chứng minh độ khó đúng.

#### R12 — Wildermyth — Worldwalker Games

- **Căn cứ:** mô tả chính thức theo nhân vật từ lúc bình thường qua thời kỳ mạnh mẽ đến tuổi già và ký ức; quyết định và chiến đấu có thể đổi thế giới cùng dàn nhân vật. [Trang chính thức trên Steam](https://store.steampowered.com/app/763890/).
- **Suy diễn thiết kế:** sự kiện cần đọc trạng thái quan hệ, tuổi tác và lựa chọn cũ để đổi cách xảy ra. Cuối đời nên ghi lại một vài hành động, một người bị ảnh hưởng và một điều chưa hoàn thành. Nội dung có thể ghép theo điều kiện nhưng từng đoạn văn, hậu quả và đường quay lại phải được biên soạn trước.
- **Giới hạn áp dụng:** không dùng sinh nội dung ngẫu nhiên để thay phần viết còn thiếu. Không coi đổi tên nhân vật trong cùng đoạn văn là đủ tạo một kiếp khác biệt.

#### Quyết định tổng hợp sau đối chiếu

1. **Chủ thể của game là một đời người.** Tu tiên là một trong những con đường để sống đời đó; việc vô căn không tự động biến đời hiện tại thành giai đoạn chờ bấm chuyển sinh.
2. **Khó khăn cần tạo quyết định.** Thiếu tài nguyên, mất thời gian, quan hệ ràng buộc, tin sai và đối thủ có mục đích tạo chiều sâu hơn việc chỉ tăng máu quái. Mọi chi phí quan trọng phải có cách tìm hiểu.
3. **Hậu quả có nhiều thời điểm và nhiều người nhận.** Một hành động có thể làm giàu cho người chơi, cứu người này, đẩy người khác vào nguy hiểm và để lại dư âm sang đời sau. Không ép tất cả về một thanh thiện–ác.
4. **Cốt truyện là sức ép của thế giới.** Tuyến xuất thân vẫn tiến triển khi người chơi đi nơi khác. Đánh dấu vai trò cần tồn tại, cho phép thay người giữ vai trò, và giữ ít nhất một đường tiếp cận kết luận khi NPC hoặc tổ chức trung tâm không còn.
5. **U ám cần có tương phản.** Bữa cơm đủ, người giữ lời và một mùa yên ổn cần được cảm nhận rõ. Nếu mọi lựa chọn đều bị phản bội, người chơi chỉ học cách bỏ qua cảm xúc.
6. **Thức tỉnh là tầng hiểu biết và lựa chọn.** Có thể mở qua đời phàm, chính đạo hoặc ma đạo; không mua bằng điểm đạo đức. Phi thăng sức mạnh và thoát vòng luân hồi phải được xác định riêng trong cổng kết thúc.
7. **Không chuyển tài sản trí tuệ của nguồn vào dữ liệu game.** Tên nhân vật, tổ chức, bí bảo, công pháp, cảnh truyện và câu chữ sản xuất phải được sáng tác riêng. Những tên tác phẩm trong chương này chỉ phục vụ đối chiếu và truy nguồn.

#### Giới hạn xác minh nguồn

Các trang Qidian có lúc trả nội dung rỗng hoặc chặn khi mở trực tiếp; những dữ kiện về thứ hạng nêu trên lấy từ nội dung công khai được công cụ tìm kiếm trả về cho đúng trang vinh danh, với tháng và ngày ghi rõ. Không dùng trang sao chép để xác nhận “chương mới nhất”. Các bài báo và phần giới thiệu chính thức đủ cho những căn cứ ngắn đã nêu, nhưng không thay thế việc đọc toàn bộ tác phẩm. Không khẳng định đã khảo sát toàn bộ thị trường đến ngày 18/11/2026 hoặc đã xác minh độc lập mọi diễn biến cốt truyện nguyên tác.

---

<a id="he-thong"></a>

### 5. Linh căn, Hành Đạo, Nghiệp Duyên, thiên kiếp và tiên thiên

Các giá trị trong chương này là quyết định thiết kế nội bộ cho bản nội dung hoàn chỉnh đầu tiên. Chúng chưa được kiểm chứng bằng chơi thử, không phải kết quả đo của phiên bản đang chạy. Số dùng để sản xuất và cân bằng; phần người chơi nhìn thấy dùng từ ngữ, diễn giải nguyên nhân và dấu hiệu quan sát được.

#### 1. Những ràng buộc không được phá

1. Vô linh căn là không có cơ quan tiếp nhận, chuyển hóa linh khí. Tu luyện linh lực, đột phá cảnh giới tiên đạo, dùng thần thức thuật, luyện hồn, huyết thuật, triệu hoán bằng linh lực và luyện thể tiên đạo đều bị khóa. Không được dùng một tên khác để cho người vô căn tu tiên miễn phí.
2. Luyện võ phàm tục dùng thể lực, khí huyết, kỹ nghệ và ý chí. Có thể trở thành võ sư, thống lĩnh, sát thủ, người sáng lập võ phái; không tự mở linh lực, không tự kéo dài thọ nguyên vượt trần phàm nhân. Một cao thủ phàm tục có thể giết tu sĩ bị thương bằng phục kích hoặc tổ chức lực lượng, nhưng không lấy số lần đánh cọc để vượt mọi chênh lệch cảnh giới.
3. Tiên thiên thể chất khác linh căn. Man Hoang Thể có thể thuộc về người vô căn; thân thể cường tráng không làm máy tu luyện hoạt động. Hỏa Linh Thể ở người vô căn vẫn có phản ứng khí huyết và tính khí, nhưng ưu thế hấp thu hỏa linh khí ngủ yên đến khi cải căn.
4. Người trong thế giới có thể gọi người vô căn là “phế vật”. Đây là sự khinh miệt của xã hội và một nội dung tạo xung đột; hệ thống không xếp một đời phàm nhân thấp hơn một đời tu sĩ trong trang tổng kết.
5. Kiếp đầu luôn có linh căn, có quyền chọn đời phàm nhân, và không có bảo đảm trường sinh. Từ kiếp thứ hai mới xuất hiện vô căn.
6. Mỗi đời có thể đổi nghề, phản bội thế lực, từ bỏ cốt truyện và quay lại cốt truyện còn khả thi. Xuất thân là lịch sử đã xảy ra, không phải lớp nhân vật khóa người chơi đến chết.
7. Tu tiên khó vì thời gian, nguồn lực, thông tin thiếu, thương thế, cạnh tranh, nhân tình và chuẩn bị. Không tăng khó chỉ bằng việc làm mọi nút bấm có xác suất chết khó đoán.

#### 2. Bảng linh căn và quy tắc tái sinh

| Mã | Trạng thái | Xác suất từ kiếp hai | Xác suất kiếp đầu | Hệ quả sản xuất |
|---|---|---:|---:|---|
| LC00 | Vô linh căn | 60% | 0% | Không có thanh linh lực hoạt động; nút tu luyện ghi rõ điều kiện nhập đạo; mở đầy đủ nghề phàm và đường tìm cơ duyên |
| LC01 | Ngũ hành tạp linh căn | 7% | 17,5% | Đủ năm thuộc tính, hệ số tiếp nhận 0,70; học rộng nhưng tạp khí khó luyện |
| LC02 | Tứ linh căn | 10% | 25% | Bốn thuộc tính, hệ số tiếp nhận 0,85; cần bù phần ngũ hành bị khuyết khi dùng pháp yêu cầu đủ hệ |
| LC03 | Tam linh căn | 12% | 30% | Ba thuộc tính, hệ số tiếp nhận 1,00; tư chất thông thường, có nhiều hướng phối hợp |
| LC04 | Song linh căn | 7% | 17,5% | Hai thuộc tính, hệ số tiếp nhận 1,20; chọn một thuộc tính chủ cho công pháp |
| LC05 | Thiên linh căn | 1,9% | 4,75% | Một thuộc tính ngũ hành thuần, hệ số tiếp nhận 1,60; chuyên sâu nhanh, truyền thừa khác hệ khó tiếp nhận |
| LC06 | Biến dị linh căn | 2% | 5% | Một trong Băng, Phong, Lôi, hệ số tiếp nhận 1,45; truyền thừa và vật liệu hẹp |
| LC07 | Cực linh căn | 0,1% | 0,25% | Đủ ngũ hành tương sinh không khắc, hệ số tiếp nhận 1,50; lợi thế dung nạp và phối hợp, không có tốc độ đơn hệ vượt Thiên linh căn |

Giữ đủ bảy loại linh căn đã có của dự án và thêm Vô linh căn; không bỏ Tứ, Tam hoặc Cực để đơn giản hóa. Hệ số của Cực linh căn 1,50 được xác minh trong bản hiện hữu tại [src/game/core2/12-dot-24-cac-loai.js:445](/workspace/Sect/src/game/core2/12-dot-24-cac-loai.js:445); các hệ số khác kế thừa bảng ROOT tại [src/game/core/02-tin-don-giang-ho.js:32](/workspace/Sect/src/game/core/02-tin-don-giang-ho.js:32). Khác hiện trạng, quyết định sản xuất mới ở đây là cho Cực căn có xác suất sinh 0,1% từ kiếp hai; dữ liệu gốc chỉ cho ép ra qua khí vận và đặt trọng số sinh bằng không. Đây là mở rộng đã được chốt, không phải mô tả sai hiện trạng.

Linh căn ngũ hành rút từ Kim, Mộc, Thủy, Hỏa, Thổ, đồng xác suất, không lặp thuộc tính trong cùng bộ. Một bộ Tạp căn là Kim–Mộc–Thủy–Hỏa–Thổ. Năm bộ Tứ căn là Kim–Mộc–Thủy–Hỏa, Kim–Mộc–Thủy–Thổ, Kim–Mộc–Hỏa–Thổ, Kim–Thủy–Hỏa–Thổ, Mộc–Thủy–Hỏa–Thổ. Mười bộ Tam căn là Kim–Mộc–Thủy, Kim–Mộc–Hỏa, Kim–Mộc–Thổ, Kim–Thủy–Hỏa, Kim–Thủy–Thổ, Kim–Hỏa–Thổ, Mộc–Thủy–Hỏa, Mộc–Thủy–Thổ, Mộc–Hỏa–Thổ, Thủy–Hỏa–Thổ. Mười bộ Song căn là Kim–Mộc, Kim–Thủy, Kim–Hỏa, Kim–Thổ, Mộc–Thủy, Mộc–Hỏa, Mộc–Thổ, Thủy–Hỏa, Thủy–Thổ, Hỏa–Thổ. Năm Thiên căn là Kim, Mộc, Thủy, Hỏa, Thổ; ba Dị căn là Băng, Phong, Lôi. Cực căn có đủ Kim–Mộc–Thủy–Hỏa–Thổ như Tạp căn nhưng có trạng thái tương sinh không khắc, nên phải là loại riêng chứ không suy từ việc có đủ năm hệ.

Phẩm chất mỗi bộ tách khỏi loại căn: Khuyết, Thường, Thuần, Viên Mãn; xác suất tương ứng 20%, 65%, 14%, 1%; hệ số 0,75; 1,00; 1,15; 1,30. Đổi tên bậc phẩm chất cao nhất thành Viên Mãn để không lẫn loại Thiên linh căn với phẩm chất của nó. Vô căn không rút phẩm chất. Cải căn chỉ tạo kết quả đã ghi ở bảng cơ duyên, không rút lại cả bảng sinh ra. Khi khí vận cũ ép thành Cực căn, phải kiểm và giữ đúng luật biến đổi đã biên soạn; không nhân thêm cơ duyên cải căn mới để nhận nhiều bộ căn song song.

Xác suất vô căn giữ độc lập với chính/tà, giới tính, nghề mong muốn và việc người chơi đã bỏ qua tân thủ. Nghiệp làm đầu đời khó qua hoàn cảnh, không biến “tà” thành hình phạt mất quyền tu tiên. Khí vận thông thường không sửa tỷ lệ vô căn; những hiệu ứng có thể sửa linh căn phải được ghi thành cơ duyên riêng và có giá phải trả.

Thứ tự sinh được chốt: rút linh căn → rút thể chất → rút khí vận → xác định xuất thân và hoàn cảnh theo phần nhân quả đã kết toán. Thể chất: 60% Không có thể chất đặc biệt, 40% chia đều cho mười tám TC01–TC18 đủ điều kiện. Khí vận: 25% Bình thường, 75% chia đều cho mười hai KV01–KV12 đủ điều kiện. Trong tập mới, cả mười tám thể chất và mười hai khí vận đều đủ điều kiện cho mọi giới, mọi loại căn và mọi xuất thân; hiệu ứng yêu cầu linh lực ngủ yên trước nhập đạo, hiệu ứng cần ký ức chờ khi có ký ức, không rút lại vì đang ngủ yên. Một TC chiếm 40/18 phần trăm của toàn bộ lượt sinh; một KV chiếm 6,25% toàn bộ lượt sinh. Không có nhãn Chính/Tà ở kiếp mới để làm điều kiện di truyền; phần hành vi đời trước đi qua hoàn cảnh và dư âm, không làm thân thể sinh ra tự có tội.

TC17 mang tên mới **Thích Ứng Thể**, là khả năng cơ thể học cách dùng tư thế và công cụ phù hợp; không đồng nghĩa nhân vật khuyết tật. Khuyết tật, bệnh bẩm sinh và thương tật là trạng thái sức khỏe riêng theo dữ liệu thân thể, không tự phát chỉ vì rút TC17. Đây là thay đổi thiết kế đề xuất, không phải tên đã tồn tại trong dự án.

Danh mục thể chất/khí vận cũ giữ để đọc bản lưu và tham khảo nguồn, ngừng tham gia lượt sinh mới. Với một kiếp đang chơi của bản lưu cũ, giữ đúng một bộ hiệu ứng cũ đến hết kiếp, không cấp thêm TC/KV mới và không tính thường niên hai bộ. Sau khi kiếp ấy kết thúc, lưu tên/mã cũ trong lịch sử và dùng toàn bộ bảng sinh mới ở kiếp tiếp theo. Không tự ánh xạ gần nghĩa rồi đổi tác dụng giữa một đời đang chơi; đây là chính sách chuyển tiếp xác định cho mọi mã cũ, tránh giả vờ đã xác minh tương đương nội dung. Khí vận cũ có luật ép căn chỉ hoạt động trong bộ luật cũ của kiếp đang chơi; không được chèn vào sau lượt sinh mới để làm mất tỷ lệ vô căn 60%.

Linh căn được quyết định cùng thời điểm xác nhận đầu thai; xem lại màn hình, tải bản lưu và đổi tên không rút lại. Bỏ kiếp, tự sát, chết đói và chết trong chiến đấu đều kết thúc cùng một kiếp, không hoàn lại quyền lợi đầu thai đã tiêu. Giữ hạt giống sinh và kết quả trong bản lưu. Game chạy ngoại tuyến không thể ngăn người chơi sửa tệp hoặc khôi phục bản sao bên ngoài; không tuyên bố chống gian lận tuyệt đối. Không thêm hình phạt đạo đức cho việc người chơi muốn bắt đầu lại.

#### 3. Cải căn phải là một tuyến đời, không phải nút mua vé vào tu tiên

Có tám con đường được biên soạn chính thức, gắn vào bản đồ LOC01–LOC15 của thế giới trong tài liệu này. Các điểm nhỏ như dược viện, mỏ bỏ hoặc giếng là bộ phận của địa điểm cha, không phải đại địa điểm mới chưa có liên kết. Mỗi nguồn có một trạng thái tồn tại thật trong lịch thế giới, có người tranh đoạt, có dấu vết kiểm chứng và có cách tiếp cận bằng nguồn lực phàm tục. Chết và đầu thai không làm nguồn xuất hiện lại. Không buộc mọi người vô căn phải gặp chúng.

Lịch nguồn được chốt: CC01 có một viên đạt chuẩn trong một lò hai mươi năm tại Bách Thảo Cốc; CC02 một ống từ hốc tủy hồi phục sau một trăm hai mươi năm kể từ khai thác; CC03 mỗi khu vườn một chu kỳ năm năm; CC04 một đài liên nở mỗi ba mươi năm, tính theo mốc lịch thế giới và giữ trên cây sáu mươi ngày; CC05 chỉ một hỏa chủng trong toàn thế giới, không tái sinh; CC06 mỗi linh thú cá thể chỉ ký một khế cải căn đang hiệu lực, thú con không sao chép khả năng của cha mẹ miễn phí; CC07 mỗi người cho chỉ có một bộ căn để chuyển; CC08 mỗi mảnh sao chỉ có một bản thể trong toàn thế giới. Nguồn đã bị NPC dùng, bị hủy hoặc hết hạn không quay lại khi người chơi chết. Dược viện có thể tuyển người mới cho lò sau; hồ có người kế thừa quyền trông; vườn chuyển quyền sở hữu; hốc mỏ có thời gian phục hồi. Mất hỏa chủng hoặc bộ sao là mất cơ duyên ấy, không có món thay thế vô danh; vẫn còn các tuyến cải căn khác.

Quy trình chung: nghe dấu vết → kiểm chứng hai đầu mối độc lập → đánh giá bản thân → giành quyền tiếp cận → xác nhận chi phí → thực hiện nghi thức → nhận kết quả và hậu quả. Có thể dừng trước bước thực hiện. Thông báo không được giấu khả năng thương tật đã được nhân vật biết. Mỗi kiếp tối đa một lần cải căn thành công. Khi thất bại, vật liệu chính mất; chờ đủ thời gian hồi phục mới được tìm nguồn khác. Không được uống chồng để biến tạp căn thành thiên căn.

| Mã / cơ duyên | Nguồn và cách người phàm tiếp cận | Hai chứng cứ thật; nguy cơ lừa | Điều kiện và chi phí nội bộ | Kết quả; thất bại; giới hạn |
|---|---|---|---|---|
| CC01 Tái Mạch Đan | Dược viện tại LOC10 Bách Thảo Cốc giữ một lò đan đổi lấy phục vụ cứu dịch; có thể trả bằng công lao chữa bệnh, không chỉ linh thạch | Bản bào chế có dấu dược viện; bệnh án người từng dùng còn sống. Người bán ngoài chợ chỉ có bao đan không phải nguồn thật | Tối thiểu thể lực 40/100, không trọng thương; 18 tháng phục vụ, ba phần Hộ Mạch Tán; nghi thức bảy ngày | 75% tạo LC01 Ngũ hành tạp căn phẩm Thường, đủ năm hệ; 25% thất bại gây Sẹo Mạch, giảm 5% khí huyết tối đa đến hết đời; chỉ thử một lần từ nguồn này |
| CC02 Địa Mạch Linh Tủy | Mỏ bỏ thuộc LOC11 Hàn Thiết Lô; nghề khai khoáng có thể lập đội, chống sập, thuê hộ vệ | Bản đo vỉa cũ; đá dẫn mạch phát sáng khi thử bằng dụng cụ. Quặng phát quang thường không có tác dụng | Bộ chống sập, ba người hỗ trợ hoặc một đội thuê; 90 ngày thăm dò; mất 10% thể lực tối đa trong hai năm hồi phục | 65% tạo LC05 Thiên Thổ căn phẩm Khuyết; 35% gây thương tật nặng hai năm, giữ vô căn. Sập mỏ là rủi ro của đoạn khám phá có cảnh báo và phương án rút, không cộng thêm lần tung chết giấu kín ở nghi thức |
| CC03 Ngũ Hành Dưỡng Căn Pháp | Gia phả và vườn dược của LOC01 Thanh Khê Thôn; có thể thương lượng bảo vệ đất và phục dựng vườn | Đối chiếu bản khuyết và bia mộ; năm vật liệu phản ứng đúng quyển kiểm dược | Tối thiểu năm năm chăm sóc; đủ một bộ kim sa, mộc tâm, thủy châu, hỏa nham, thổ tủy cấp phàm có linh tính; không cần linh lực của người dùng | 90% tạo LC01 Ngũ hành tạp căn phẩm Khuyết, đủ năm hệ đã nuôi; 10% mất vụ dược và một năm hồi sức; chỉ một vườn hoàn chỉnh mỗi kiếp, thời gian không được rút bằng ngủ liên tục thiếu lương |
| CC04 Hóa Sinh Liên | Hồ cổ thuộc LOC09 Tịch Chiếu Bến do cộng đồng ven nước canh giữ; cứu hồ, mua quyền thu hái hoặc chiếm đoạt đều có nhánh riêng | Hạt lưu trong nhà tổ; lịch nở ghi trong sổ thuế nước. Bông giả chỉ đổi màu dưới đèn | Hoàn thành tranh chấp nguồn nước; chờ đúng kỳ nở ba mươi năm một lần của lịch thế giới; luyện thể phàm đạt mức bền bỉ; nghi thức 30 ngày | 70% tạo LC04 Song Mộc–Thủy căn phẩm Thường; 30% sốt nặng 180 ngày và mất 3 năm thọ nguyên. Chiếm đoạt được lợi ngay nhưng tạo ân oán với người giữ hồ; không tự gắn nhãn tà chỉ vì chọn trả bằng tiền |
| CC05 Tàn Hỏa Chủng | Tàn lò thuộc LOC11 Hàn Thiết Lô; chuyển thư, cứu người thợ hoặc cướp bản đồ đều có thể đến | Mảnh lò và nhật ký tôi; thử cùng cát cách nhiệt. Thương lái có thể bán tro nguội | Chịu nhiệt được kiểm tra; Hộ Tâm Cao; mất 5 năm thọ nguyên khi thành công; nghi thức một đêm | 60% tạo LC05 Thiên Hỏa căn phẩm Thường và dấu Bỏng Mạch khiến giá hồi phục linh lực tăng 10%; 40% thất bại gây bỏng nặng một năm; tối đa một hỏa chủng, không sao chép |
| CC06 Huyết Mạch Khế | Thú cộng sinh và người làm khế tại LOC08 Vạn Thú Môn, không phải bắt bất kỳ thú non nào | Khế ước được người biết chữ và người hiểu thú đối chứng; huyết dịch tương thích được thử trước | Thú tự nguyện hoặc bị cưỡng ép là hai cách có hậu quả; người chơi nhường 20% trần thọ nguyên còn lại khi ký; hỗ trợ người thi triển có căn | 80% tạo một căn phẩm Thường theo đúng hệ chủ đã chốt của thú: ngũ hành thành LC05, Băng/Phong/Lôi thành LC06; 20% đào thải gây suy nhược hai năm. Thú chết làm giảm một bậc phẩm chất, không tự giết người chơi; không đổi thú để rút lại căn |
| CC07 Vay Căn Nghịch Mệnh | Y quán bí mật tại LOC07 Huyết Sát Cốc; giao dịch với người có căn hấp hối hoặc tổ chức mua bán căn; các nhánh hiến tặng, mua bán cưỡng bức, sát hại có sổ hậu quả riêng | Kiểm tra đúng người cho; đối chiếu hồ sơ mạch và lời xác nhận. Không chấp nhận hàng hóa chỉ ghi “linh căn” | Người cho và người nhận có tương thích thể chất; 360 ngày tịnh dưỡng; 10 năm thọ nguyên; thầy cấy và bộ Hộ Mạch | 55% giữ đúng loại LC01–LC07 và bộ thuộc tính của người cho nhưng phẩm chất tối đa Thường; 45% đào thải, mất 10% khí huyết tối đa vĩnh viễn. Giết người lấy căn không được thưởng tỷ lệ cao hơn; lợi có được là bỏ qua thương lượng, đổi bằng truy sát và nợ nhân quả |
| CC08 Tinh Hồn Kết Căn | Nghiên cứu và vận hành trận tại LOC05 Huyền Cơ Trận Các; lấy mảnh tại LOC04 Cổ Miếu Vô Danh, LOC05 và LOC15 Hồi Thanh Đài; nghề học giả, trận đồ phàm và thương nhân tiếp cận được | Bản sao thiên tượng đối chiếu ngày rơi; mẫu cộng hưởng không tiêu hao có thể thử. Không cần tin lời duy nhất của người giữ trận | Thu thập ba mảnh cùng một sao; 24 tháng nghiên cứu; người thi triển được trả bằng tiền, ân tình hoặc đe dọa; hy sinh một di vật gắn với ký ức kiếp trước | 50% tạo LC06 Dị Phong, Băng hoặc Lôi phẩm Khuyết theo mảnh sao xác định sẵn; 50% mất nghi thức và một ký ức kỹ năng truyền đời. Không xóa ký ức cốt truyện, không làm hỏng bản lưu, không rút lại loại sao khi tải |

Hộ Mạch Tán, Hộ Tâm Cao và vật liệu ở bảng trên được phân giải trong danh mục dưới đây. Bảo đảm ít nhất CC01 và CC03 có thể tiếp cận từ sức lao động, nghề và quan hệ của người vô căn, không đòi tự đánh thắng tu sĩ. Bảo đảm có thể biết trước việc không đủ tuổi thọ để hoàn thành nghi thức. Khi đến tuổi già, người chơi có quyền truyền manh mối, vườn dược hoặc tài sản cho NPC thay vì bị ép đánh cược.

##### Vật tư cải căn: danh mục sản xuất riêng

Toàn bộ giá dưới đây dùng đồng, một quan bằng một nghìn đồng. Linh thạch không có tỷ giá cố định và không bắt buộc để đi hai đường cải căn bằng lao động. “Không bán” có nghĩa là nguồn cốt truyện hoặc quyền thu nhận, không phải quên điền giá. Món chưa khai thác vẫn có một chủ thể hoặc trạng thái trên thế giới. Giá là niêm yết gốc trước thuế và biến động địa phương; không phải cam kết luôn mua được. Những nguồn chỉ có một lần được đánh dấu vào sổ thế giới ngay khi lấy, kể cả người chơi mất hoặc bán món. Địa điểm cha của nhà cung cấp: dược viện và nhà ép dầu dược ở LOC10; chợ thông thường và thợ kim hoàn ở LOC02; phường thợ mỏ, thợ nghiền, thợ lò và phường rèn ở LOC11; vườn cổ thụ và vườn dưỡng căn ở LOC01; nhà nuôi trai và hồ cổ ở LOC09; người làm khế ở LOC08; y quán cấy căn ở LOC07; kho sao và người làm trận ở LOC05. Đây là các quầy hoặc dịch vụ thuộc địa điểm cha, không tự thêm địa điểm cấp thế giới.

| Mã / tên | Loại, đơn vị, phẩm chất | Nguồn, giá, thời gian và số lượng tồn | Dùng, hạn và giới hạn |
|---|---|---|---|
| CC-VT01 Tái Mạch Đan | Đan cải căn; một viên; chuẩn duy nhất | Một viên mỗi lò hai mươi năm tại dược viện LOC10; không bán; nhận quyền dùng viên còn tồn sau 18 tháng phục vụ tuyến cứu dịch và hoàn thành quy trình kiểm dược | Một viên cho CC01; mất hoặc thất bại không cấp lại từ cùng lò; có thể bảo quản kín đến hết đời; người có căn dùng không được nâng phẩm chất |
| CC-VT02 Hộ Mạch Tán | Dược phấn; một gói; chuẩn phàm dược | Dược viện bán 1.200 đồng/gói, tồn sáu gói, bổ sung hai gói/tháng; có công thức sản xuất dưới bảng | Ba gói cho CC01; một gói cho thử tương thích CC07; hạn dùng hai năm; không làm tăng xác suất khi dùng quá lượng |
| CC-VT03 Mạch Thảo | Thảo dược; một bó; đạt chuẩn khi chưa úa | Vườn dược thường, 300 đồng/bó, tồn hai mươi bó, bổ sung mười bó/tháng; có thể hái một bó trong hai ngày tại bãi dược đã mở quyền thu hái | Hai bó cho một mẻ CC-VT02 hoặc CC-VT16; giữ mát 90 ngày; thảo dược thường, không có tác dụng cải căn trực tiếp |
| CC-VT04 Cam Thạch Phấn | Khoáng dược; một túi; chuẩn đã nghiền | Hiệu thuốc hoặc thợ nghiền đá, 200 đồng/túi, tồn mười túi, bổ sung năm túi/tháng | Một túi cho CC-VT02; không hạn dùng nếu khô; quặng chưa nghiền không thay thế được ngay |
| CC-VT05 Bộ Chống Sập | Dụng cụ hoàn chỉnh; một bộ; chuẩn khai mỏ | Phường thợ mỏ, 12.000 đồng; tồn hai bộ, bổ sung một bộ/tháng; có thể thuê 3.000 đồng cho 90 ngày, ký quỹ 12.000 đồng được hoàn nếu nguyên bộ | Một bộ cho tuyến CC02; không cần chế từng đinh trong phạm vi bản đầu; hỏng nếu có sập mỏ, sửa 4.000 đồng và bảy ngày; không tự tăng tỷ lệ cải căn |
| CC-VT06 Địa Mạch Linh Tủy | Linh vật; một ống đủ nghi thức; chuẩn độc nhất | Hốc tủy mỏ bỏ LOC11 cho một ống, phục hồi sau 120 năm từ lần lấy; không bán; khai thác sau 90 ngày thăm dò bằng đội và bộ chống sập | Toàn bộ một ống dùng CC02; lấy ra phải niêm bằng ống có sẵn trong hốc, dùng trong 180 ngày; không chia nhỏ để cải nhiều căn |
| CC-VT07 Ngũ Hành Dưỡng Căn Pháp | Bản pháp gieo căn; một quyển; bản hoàn chỉnh | Gia phả thôn vườn thuốc, không bán; quyền sao nhận sau khi giải quyết tranh chấp đất; bản khuyết và bia mộ đối chiếu trong 30 ngày | Đọc được bởi người vô căn biết chữ; học quy trình 90 ngày; chỉ có tác dụng sau trọn năm năm nuôi bộ vật liệu; sao chép không tự tạo linh dược mới |
| CC-VT08 Kim Sa Dưỡng Mạch | Vật liệu nuôi căn; một phần; phàm vật có linh tính thấp | Cát tuyển của thợ kim hoàn, 2.000 đồng/phần, tồn một phần mỗi sáu tháng; hoặc 30 ngày đãi cát tại vùng hợp lệ | Một phần cho vườn CC03; dùng nuôi trong cả chu kỳ; bán lại không hoàn thời gian đã nuôi |
| CC-VT09 Mộc Tâm Dưỡng Mạch | Vật liệu nuôi căn; một phần; phàm vật có linh tính thấp | Vườn cổ thụ được quyền tỉa cành, 2.000 đồng/phần, tồn một phần mỗi sáu tháng; hoặc 30 ngày chăm cây | Một phần cho vườn CC03; không cần chặt cây sống; đốt phần đã nuôi làm hỏng toàn bộ chu kỳ |
| CC-VT10 Thủy Châu Dưỡng Mạch | Vật liệu nuôi căn; một phần; phàm vật có linh tính thấp | Nhà nuôi trai nước sạch, 2.000 đồng/phần, tồn một phần mỗi sáu tháng; hoặc 30 ngày làm công giữ ao | Một phần cho vườn CC03; giữ trong nước sạch; đổ khô quá ba ngày làm hỏng |
| CC-VT11 Hỏa Nham Dưỡng Mạch | Vật liệu nuôi căn; một phần; phàm vật có linh tính thấp | Thợ lò tuyển đá, 2.000 đồng/phần, tồn một phần mỗi sáu tháng; hoặc 30 ngày làm lò | Một phần cho vườn CC03; không phải Tàn Hỏa Chủng và không mở đơn Hỏa căn khi ăn trực tiếp |
| CC-VT12 Thổ Tủy Dưỡng Mạch | Vật liệu nuôi căn; một phần; phàm vật có linh tính thấp | Đất sét tuyển của người làm gốm, 2.000 đồng/phần, tồn một phần mỗi sáu tháng; hoặc 30 ngày làm đất | Một phần cho vườn CC03; tách hoàn toàn khỏi CC-VT06; dùng sai loại được báo trước khi bắt đầu |
| CC-VT13 Hóa Sinh Liên | Linh dược cải căn; một đài; chuẩn độc nhất | Hồ cổ LOC09 cho một đài mỗi ba mươi năm theo mốc lịch ghi trong sổ thuế nước; không bán tại hiệu thuốc; giữ trên cây trong 60 ngày | Một đài cho CC04; khi hái giữ được 30 ngày; người giữ hồ có quyền nhận đài nếu người chơi không tới, ghi thành mất cơ hội có nguyên nhân |
| CC-VT14 Tàn Hỏa Chủng | Hỏa chủng; một hạt; chuẩn độc nhất | Tàn lò LOC11, chỉ một hạt trong toàn thế giới; quyền tiếp cận từ thư, cứu thợ hoặc chiếm bản đồ; không bán; đào lấy một ngày sau khi có dụng cụ cách nhiệt | Một hạt cho CC05; có bình chịu nhiệt tại lò, không yêu cầu túi trữ vật; mở bình ngoài nghi thức làm hỏng hạt, có xác nhận; không tái sinh sau chết hoặc mất |
| CC-VT15 Bộ Cách Nhiệt | Dụng cụ hoàn chỉnh; một bộ; chuẩn lò | Phường rèn, 6.000 đồng, tồn ba bộ, bổ sung một bộ/tháng; gồm găng, cát thử và bình phụ trong cùng đơn vị hàng hóa | Dùng thử thật giả CC05 và khai hỏa chủng; tái sử dụng được, mất nửa độ bền sau một lần khai; sửa 1.000 đồng và hai ngày |
| CC-VT16 Hộ Tâm Cao | Dược cao; một hộp; chuẩn phàm dược | Hiệu thuốc 2.000 đồng/hộp, tồn bốn hộp, bổ sung hai hộp/tháng; công thức bên dưới | Một hộp cho CC05; không cộng xác suất khi bôi chồng; hạn dùng một năm; không thay Hộ Mạch Tán |
| CC-VT17 Dầu Lạc Kim | Dược liệu đã ép; một lọ; chuẩn phàm dược | Nhà ép dầu dược, 500 đồng/lọ, tồn mười lọ, bổ sung năm lọ/tháng; là sản phẩm cuối có thể mua, không cần mở thêm nghề ép dầu trong bản đầu | Một lọ cho CC-VT16; giữ kín hai năm; không dùng làm vật liệu cấy căn |
| CC-VT18 Khế Huyết Song Sinh | Khế vật; một bản; phù hợp đúng một người và một thú | Người làm khế có căn, 20.000 đồng và 30 ngày điều tra tương thích; không bán khế đã ký lại cho người khác; giấy và mực tính trong dịch vụ | Một khế cho CC06; ràng buộc đúng cặp; đe dọa thú là lựa chọn cốt truyện có hậu quả, không bấm lặp để rút lại tính tương thích |
| CC-VT19 Bộ Hộ Mạch Cấy Căn | Y cụ và vật liệu nghi thức; một bộ; chuẩn cấy ghép | Y quán có người biết thuật cấy, 30.000 đồng; tồn một bộ mỗi năm; điều chế và khử trùng 30 ngày sau đặt | Một bộ cho CC07; tiêu hao khi thực hiện; một gói CC-VT02 dùng trước để thử tương thích, không thay được cả bộ |
| CC-VT20 Mảnh Sao Hạ | Mảnh di vật; một mảnh; cùng dấu sao | Đáy giếng cũ tại LOC04 Cổ Miếu Vô Danh; chỉ một bản trong thế giới; không bán; một ngày thu hồi khi có dây của điểm giếng | Cùng CC-VT21 và CC-VT22 thành một bộ; loại sao được chốt khi sinh thế giới; trộn các sao khác không hợp lệ |
| CC-VT21 Mảnh Sao Trung | Mảnh di vật; một mảnh; cùng dấu sao | Người giữ thiên tượng tại LOC05 Huyền Cơ Trận Các có một mảnh; đổi bằng 60 ngày sao chép sổ hoặc 15.000 đồng; chỉ một bản, không sinh lại sau mất | Dùng CC08; kiểm định bằng bảng thiên tượng năm rơi; không cho ngộ tính chỉ bằng cầm trong túi |
| CC-VT22 Mảnh Sao Thượng | Mảnh di vật; một mảnh; cùng dấu sao | Kho kỷ vật tại LOC15 Hồi Thanh Đài; nhận khi xử lý quyền sở hữu của gia đình đang tranh chấp; có nhánh đánh cắp với chứng cứ và truy đòi; chỉ một bản trong thế giới | Dùng CC08; không yêu cầu giết tu sĩ; nếu chủ mới từ chối, tuyến tiếp tục bằng thương lượng hoặc chấp nhận mất cơ hội |
| CC-VT23 Di Vật Ký Ức | Vật truyền đời; một món gắn với một ký ức kỹ năng cụ thể; chuẩn cá nhân | Nhận từ Bến Vong Xuyên khi có một ký ức kỹ năng được chọn mang theo; không bán và không ngẫu nhiên xuất hiện trong rương | CC08 tiêu di vật cùng liên kết ký ức kỹ năng đã chọn nếu thất bại; không chọn ký ức cốt truyện hoặc xóa thành tựu; người chưa có ký ức phù hợp thấy điều kiện thiếu trước khi thu ba mảnh |

Hai công thức phụ thuộc được chốt: một gói Hộ Mạch Tán cần hai bó Mạch Thảo, một túi Cam Thạch Phấn, hai ngày, nghề dược đạt 200/1.000 và bếp thuốc thuê 100 đồng/ngày; một hộp Hộ Tâm Cao cần hai bó Mạch Thảo, một lọ Dầu Lạc Kim, ba ngày, nghề dược đạt 300/1.000 và bếp thuốc 100 đồng/ngày. Khi đủ điều kiện, sản xuất đạt chuẩn chắc chắn; sai nguồn hoặc nguyên liệu hết hạn bị chặn trước khi tiêu hao. Người vô căn làm được. Người chưa có nghề được đặt hiệu thuốc theo giá bán, không bị khóa cả hai nguồn. Chi phí nguyên liệu cộng thuê bếp cho một mẻ lần lượt 1.000 và 1.400 đồng; chênh lệch giá bán còn chịu thời gian lao động, nguồn cung và thuế, không là máy in tiền vô hạn.

Nguồn lực dịch vụ: CC01 bao ăn và chỗ ngủ thường trong 18 tháng phục vụ, không cấp lương bổ sung; ba gói Hộ Mạch Tán được cấp một lần sau hoàn thành công việc, nên người vô sản không bị kẹt vì giá thuốc. CC02 có đội thuê ba người trong 90 ngày giá 60.000 đồng đã gồm ăn ở và tiền công, hoặc ba cộng sự có điều kiện chia lợi được ghi thành khế ước trước khi vào mỏ. CC03 được thôn cho quyền dùng vườn năm năm đổi 120 ngày sửa kênh và chăm vườn công, sau đó vẫn phải kiếm lương trong thời gian nuôi cây. CC04 cần người luyện dược chủ trì 3.000 đồng và 30 ngày, hoặc 60 ngày phục vụ hồ; CC05 thuê người giữ lửa 5.000 đồng cho toàn nghi thức hoặc đổi 60 ngày làm lò; CC06 phí khế đã gồm chủ trì, không thu thêm một phí ẩn; CC07 công thầy cấy 40.000 đồng đã gồm theo dõi một năm, không bao thực phẩm; CC08 người vận hành trận lấy 50.000 đồng hoặc 180 ngày khảo sao phục vụ, thời gian nghiên cứu 24 tháng đã gồm phần lao động này. Các khoản tiền là giá gốc dịch vụ hữu hạn, không đổi thành linh thạch theo tỷ giá cố định.

Tối thiểu tuổi thọ còn lại trước bắt đầu nghi thức: CC01 một năm; CC02 ba năm; CC03 sáu năm trước khi gieo; CC04 bốn năm; CC05 sáu năm; CC06 đủ một năm sau khi nhường phần thọ nguyên; CC07 mười hai năm; CC08 ba năm. Khi có bệnh gây chết sớm đã biết, dùng mức thấp hơn giữa thọ nguyên tự nhiên và tiên lượng bệnh. Chưa biết bệnh chỉ được ghi “chưa thể xác nhận an toàn”, không nói chắc đủ tuổi. Không tự từ chối quyền mạo hiểm đã được giải thích; xác nhận phải nêu hậu quả có thể mất cả thời gian và đời còn lại.

Thuộc tính dị căn của CC08 rút một lần khi tạo thế giới: sao Hàn mang Băng, sao Du mang Phong, sao Minh mang Lôi, ba loại đồng xác suất. Mọi mảnh, thiên tượng, phản ứng thử và kết quả cuối phải khớp cùng sao. Khi thành công, Di Vật Ký Ức bị tiêu hao nhưng ký ức kỹ năng vẫn giữ; khi thất bại, mất cả di vật và đúng ký ức kỹ năng đã xác nhận, không mất ký ức khác. Giấy tờ, mẫu thử và lời kể là dấu vết nhiệm vụ, không phải vật tư tiêu hao hay món hàng có thể farm. Hồ sơ đồng ý hiến căn của CC07 và định danh linh thú CC06 là quan hệ thế giới, không đóng gói thành một “viên căn” vô chủ trong túi.

#### 4. Hai chỉ số khác nhau và một hệ danh tiếng riêng

**Hành Đạo** mô tả cách người chơi sử dụng quyền lực trong đời này: hộ trì và giữ lời; thuận theo hoàn cảnh; cưỡng đoạt và dùng cấm thuật. Các nhãn hiển thị là “Chính tâm kiên định”, “Nghiêng về chính đạo”, “Chính tà đan xen”, “Nghiêng về tà đạo”, “Tà niệm ăn sâu”. Sổ nhân vật giải thích bằng hành động đã xảy ra. Không hiển thị phần trăm, điểm số hay một thanh đỏ xanh có vạch định lượng.

**Nghiệp Duyên** mô tả những quan hệ nhân và quả đang tiếp nối. Hiển thị hai câu độc lập, không một điểm thiện ác ròng: trạng thái Thiện duyên có “Ít mối nương tựa”, “Có người còn nhớ”, “Thiện duyên nối dài”, “Ân nghĩa sâu dày”; trạng thái Nghiệp chướng có “Ít điều vướng bận”, “Vướng nợ trần duyên”, “Oán nghiệp quấn thân”, “Nghiệp hải trùng trùng”. Một người có thể đồng thời ân nghĩa sâu và oán nghiệp nặng. Màn Bến Vong Xuyên dùng câu dự báo “Kiếp tới dễ sinh giữa cảnh bấp bênh; vẫn còn một mối ân nghĩa có thể nâng đỡ”. Đây là ước lượng, không hứa chắc một xuất thân.

Ngưỡng nhãn Thiện duyên theo G: từ 0 đến dưới 3 là Ít mối nương tựa; từ 3 đến dưới 15 là Có người còn nhớ; từ 15 đến dưới 50 là Thiện duyên nối dài; từ 50 trở lên là Ân nghĩa sâu dày. Ngưỡng nhãn Nghiệp chướng theo B: từ 0 đến dưới 3 là Ít điều vướng bận; từ 3 đến dưới 15 là Vướng nợ trần duyên; từ 15 đến dưới 50 là Oán nghiệp quấn thân; từ 50 trở lên là Nghiệp hải trùng trùng. Dùng khoảng thực vì hệ số trách nhiệm có thể cho phần lẻ, không làm tròn để nhảy bậc.

**Danh tiếng, truy nã, quan hệ từng người và từng thế lực** là dữ liệu xã hội của kiếp hiện tại. Có nhân chứng, bằng chứng, tin đồn, người đưa tin và độ tin cậy. Bị vu oan có thể làm danh tiếng xấu nhưng không tự đổi Hành Đạo thành tà, cũng không tự tạo nghiệp giết người chưa hề thực hiện. Hành Đạo là khuynh hướng tự thân; xã hội chỉ phản ứng với điều nó biết hoặc tin.

##### Hành Đạo: phép tính và lợi/hại thực tế

Nội bộ ghi hai tổng có trọng số P và T, lấy từ 24 quyết định có ý nghĩa gần nhất; sự kiện nhỏ lặp lại cùng loại trong cùng năm chỉ nhận trọng số ở lần đầu. Hộ trì, giữ lời trong tình thế mất lợi, cứu chữa có rủi ro và kiềm chế hành vi cưỡng đoạt thêm P. Cướp đoạt có chủ đích, đe dọa để chiếm lợi, luyện hồn cưỡng bức và phá khế ước vì tư lợi thêm T. Không gắn T cho mọi hành động giết; không gắn P cho mọi lần bấm “giúp”. Trọng số sự kiện nhỏ, vừa, lớn lần lượt 1, 3, 8. Khi chưa có quyết định, tỷ lệ p = 0,5; khi có dữ liệu, p = P/(P+T). Độ lệch e = 2p−1.

| Khuynh hướng nội bộ | Lợi và hại áp dụng ở kiếp hiện tại | Câu hiển thị |
|---|---|---|
| p từ 0,8 trở lên | Hiệu lực bảo hộ tăng 10e%; sát thương chủ động giảm 4e% | “Chính tâm kiên định — giỏi che chở, chậm ra tay tuyệt tình.” |
| p từ 0,55 đến dưới 0,8 | Cùng công thức; ở p = 0,60, bảo hộ tăng 2%, sát thương chủ động giảm 0,8% | “Nghiêng về chính đạo — thuật bảo hộ nhỉnh hơn, thế công bớt quyết liệt.” |
| p lớn hơn 0,45 và nhỏ hơn 0,55 | Không nhận bổ trợ khuynh hướng; không chịu tổn giảm khuynh hướng | “Chính tà đan xen — chưa có một lối hành xử lấn át.” |
| p lớn hơn 0,2 đến 0,45 | Sát thương chủ động tăng 10 × trị tuyệt đối e phần trăm; hồi phục nhận vào giảm 4 × trị tuyệt đối e phần trăm; ở p = 0,40, thế công tăng 2%, hồi phục giảm 0,8% | “Nghiêng về tà đạo — ra tay quyết liệt hơn, khó tiếp nhận dưỡng lành.” |
| p từ 0,2 trở xuống | Cùng công thức | “Tà niệm ăn sâu — thế công dữ dội, thương tổn khó lành.” |

“Hiệu lực bảo hộ” là lá chắn, đỡ đòn và giảm sát thương chủ động kích hoạt; không bao gồm toàn bộ chỉ số phòng ngự nền. “Sát thương chủ động” gồm chiêu võ, pháp thuật, độc do người chơi đặt và đòn của linh thú thuộc quyền điều khiển; không gồm tai nạn môi trường. “Hồi phục nhận vào” áp dụng thuốc, nghỉ, chữa bệnh và hồi phục từ thể chất; không làm giảm việc tăng trần khí huyết. Phàm nhân vẫn dùng đầy đủ bộ bổ trợ này qua võ kỹ và trị thương. Không đưa ưu thế tuổi thọ, xác suất có căn hoặc tỷ lệ rơi đồ vào Hành Đạo.

Nhãn chỉ đổi khi vượt ngưỡng ít nhất 0,03 để tránh nhấp nháy giữa hai trạng thái. Công thức không ép người chơi làm chính vì phần thưởng vĩnh viễn cao hơn; chính thiên phòng hộ, tà thiên kết liễu. Quan hệ với môn phái xét thói quen, sự kiện, bí mật và danh tiếng địa phương riêng, không chỉ kiểm một nhãn.

##### Nghiệp Duyên: ghi đúng ai bị ảnh hưởng và vì sao

Mỗi sự kiện nhân quả lưu người gây, người chịu, người hưởng lợi, hành động, ý định đã chọn, mức hiểu biết trước khi chọn, quyền lựa chọn thực tế, tổn hại tức thời, lợi ích tức thời, hậu quả trì hoãn, khả năng bồi hoàn, bằng chứng và trạng thái giải quyết. Sự kiện có mã định danh để không ghi lặp khi tải, đi qua màn hoặc nhận lại thư.

Mức gốc nội bộ cho một mối nợ là 1 cho tổn thất có thể sửa trong một tháng, 3 cho thiệt hại sinh kế kéo dài, 8 cho thương tật nặng hoặc phá hủy gia nghiệp, 15 cho chết người, tước tự do lâu dài hoặc hủy linh hồn. Nhân hệ số chủ ý: chủ đích 1,0; biết rõ rủi ro nhưng phớt lờ 0,7; tai nạn thật sự với thông tin hợp lý 0,25; bị cưỡng bức không có lựa chọn khả thi 0,1. Nhân tiếp phạm vi trách nhiệm: trực tiếp 1,0; ra lệnh 1,0; tiếp tay chủ động 0,5; ở gần không tham gia 0. Hệ số không tự thay đổi theo phe của người bị hại.

Không tính mỗi con vật bị săn, mỗi cây rau nhổ và mỗi người chết trên chiến trường bằng cùng mức “chết người”. Săn để sống, tự vệ và vòng sinh thái ghi ở sự kiện hoàn cảnh cùng mức khai thác; không tự cộng món nợ 15 cho từng con thú. Săn quá mức gây tuyệt đàn, giết thú có linh trí đã đầu hàng hoặc phá nơi sinh sản để tiêu khiển là các hành động riêng có mức tổn hại đã biên soạn. Đánh trận phải ghi mệnh lệnh, mục tiêu, khả năng từ chối và hành vi với dân; không chia đều nợ của cả chiến tranh cho mọi binh lính. Tự vệ cần thiết có hệ số chủ ý 0,1 cho phần tổn hại không tránh được; chủ động hành hạ kẻ đã mất khả năng đe dọa trở lại hệ số 1. Lợi cứu đàn hươu không xóa tùy ý hậu quả hủy môi trường, và cái chết tự nhiên của hổ không tự tạo một lời phán tà đạo.

Lợi ích cứu người hoặc trả ơn được lưu thành mối Thiện duyên G có mức 1, 3, 8, 15 theo độ bền và mức đánh đổi. Nợ tổn hại chưa giải quyết tạo Nghiệp chướng B. Giúp người khác không xóa một vụ sát hại. Bồi hoàn phải đi về đúng đối tượng hoặc người thừa hưởng, phù hợp thiệt hại; chỉ giảm phần có thể sửa. Hoàn lại tiền bị trộm giảm được nợ tiền, không xóa việc đã giết chủ nhà. Người bị hại có thể từ chối tha thứ; không có nút mua “xá nghiệp” bằng một khoản tiền chung.

Hệ thống không phán xét bằng thông tin mà người chơi chưa có quyền biết. Nếu lòng tốt bị kẻ khác lợi dụng cho tổn hại, nhật ký phân tách chủ mưu, mức biết trước và hậu quả. Người chơi có cơ hội sửa phần hậu quả còn sửa được. Không dùng cú lật bí mật để viết lại ý định ban đầu thành một việc ác cố ý.

| Tình huống | Hành Đạo | Nghiệp Duyên | Hệ quả vật chất và xã hội |
|---|---|---|---|
| Đỡ bà lão xuống núi, bà lấy trộm linh thạch | P cho việc giúp nếu có đánh đổi thực; không trừ P vì bị lừa | Mối giúp người vẫn tồn tại; người trộm mang món nợ của việc trộm. Người chơi không bị phạt nghiệp vì nhẹ dạ | Mất tài sản thật nếu không phát hiện; có dấu vết như túi bị rạch, nhân chứng, món tiền xuất hiện tại chợ; có quyền truy tìm, bỏ qua, đòi lại hoặc báo quan |
| Giết hổ đang rượt một đàn hươu | Không tự thêm T; nếu bảo vệ vì ý định đã thể hiện thì thêm P nhỏ | Ghi cứu đàn hươu và cái chết của hổ như hai hậu quả; không coi thú săn mồi là có tội. Nếu hổ còn con non, việc chết đói của chúng là hệ quả cần có dấu vết và cơ hội xử lý | Nhận da hổ hoặc lòng biết ơn người sống quanh rừng; mất một mắt xích sinh thái; đàn hươu tăng quá mức có thể hại ruộng trong mùa sau |
| Giết hổ chỉ lấy da, sau đó biết vô tình cứu hươu | Không hồi tố ý định thành cứu hộ; không mặc định là tà nếu săn bắn hợp lý | Lợi ích ngẫu nhiên được lưu, mức Thiện duyên thấp hơn cứu có đánh đổi; vẫn lưu tổn hại sinh thái | Lợi tiền tức thời; danh tiếng thợ săn phụ thuộc bằng chứng và luật địa phương |
| Cướp kho lương rồi chia cho dân đói | T cho cưỡng đoạt có chủ đích; P cho phần bảo hộ có đánh đổi | Giữ cả món nợ với chủ kho và ân nghĩa với dân; nếu kho là lương cứu tế đã được chứng minh thì ghi cả nhóm dân bị mất phần | Có lương ngay, có truy nã, có nơi che giấu; không quy về một phần trăm thiện ác ròng |
| Cứu kẻ địch rồi bị hắn phản bội | P theo quyết định cứu, không đổi vì kết quả xấu | Mối nợ cứu mạng thuộc về người được cứu dù họ phủ nhận; phản bội tạo sự kiện mới của họ | Người chơi chịu tổn thất thật, có quyền đổi cách đối xử sau đó; không thưởng chắc bảo vật để bù mọi mất mát |

##### Tái sinh và thiên kiếp

Tại chết, chốt B và G đã có; các mối chưa tới hạn có thể thành dấu truyền đời. Ba nhóm hoàn cảnh đầu thai có xác suất nội bộ: Bấp bênh = giới hạn trong 0,10–0,70 của 0,25 + 0,003B − 0,001G; Được nâng đỡ = giới hạn trong 0,05–0,55 của 0,25 + 0,002G − 0,001B; Bình thường là phần còn lại. Nếu tổng hai nhóm vượt 0,90 thì chuẩn hóa hai nhóm về tổng 0,90, giữ tối thiểu 0,10 bình thường. Đây là trọng số hoàn cảnh, không khóa nghề, căn hoặc kết cục.

Sau khi dùng B/G đời vừa kết thúc để chốt hoàn cảnh đầu thai, mở sổ hành vi đời mới với B = 0 và G = 0. Sổ cũ và người chịu ảnh hưởng không bị xóa; lưu thành Dư Nghiệp và Dư Ân có chủ thể, di sản, lời thề, quyền thừa kế và cơ hội tái ngộ. Chúng được thể hiện qua hoàn cảnh đã chốt và sự kiện tiếp nối, không tự cộng lại B/G hiện tại và không nhân thiên kiếp đời mới thêm lần nữa. Tái phạm hoặc tiếp tục thực hiện một lời nguyền có chủ đích là hành động mới, được ghi phần tổn hại mới; chỉ việc bị người đời trước ghét không phải nghiệp ác mới. Trả một món nợ cũ sửa trạng thái quan hệ và hồ sơ cũ, không nhân đôi phần thưởng G; chỉ phần đánh đổi thực mới ngoài nghĩa vụ cũ mới có thể sinh duyên mới. Cách này giữ nhân quả xuyên kiếp mà không khiến một món nợ bị nhân thưởng/phạt vô hạn.

“Bấp bênh” có lương, tiền và mức hỗ trợ ban đầu bằng 75% chuẩn xuất thân, thêm đúng một áp lực có phương án giải: nợ gia đình, mùa đói, bệnh người thân hoặc bị tranh chấp quyền thừa kế. “Được nâng đỡ” có 125% chuẩn và một người sẵn lòng cho cơ hội; “Bình thường” dùng 100%. Không sinh ra với bệnh chắc chết trước khi được điều khiển; không bắt đầu trong ngục không có đường ra; luôn có việc kiếm bữa ăn và một nơi trú có thể tiếp cận. Một đời phàm nhân nghèo cần khó, vẫn phải có quyết định thực sự để chơi.

Thiên kiếp chỉ nhận hệ số từ B chưa giải quyết tại lúc chuẩn bị vượt đại cảnh giới, không nhận từ tỷ lệ chính/tà. Chốt trước khi bắt đầu, hiển thị nhãn và nguyên nhân đã biết. Hệ số sức kiếp K = 1 + min(0,60; 0,004B): khí huyết nguồn kiếp nhân K, sát thương nhân 1 + 0,75(K−1), không tăng số pha vô hạn. Bổ trợ nếu vượt thành công bằng 1 + min(0,20; 0,0015B), chỉ áp dụng gói chỉ số cơ sở của lần đột phá ấy. Bằng 0 thì sức kiếp và phần thưởng chuẩn. Bằng 100 thì sức kiếp tăng 40%, sát thương tăng 30%, gói chỉ số tăng 15%. Giữ cân đối để sự nguy hiểm gia tăng nhanh hơn lợi tức bảo đảm; không làm tạo nghiệp thành cách tăng sức mạnh bắt buộc.

Phần thưởng cộng thêm không áp lên toàn bộ trang bị, khí vận và thể chất. Mỗi mốc đại cảnh giới chỉ nhận một lần; rớt cảnh giới rồi vượt lại không nhận lần hai. Không xóa B khi vượt kiếp; một người thắng thiên kiếp không tự được người bị hại tha thứ. Cứu người trước kiếp vẫn có thể mở hỗ trợ cụ thể như hộ trận, thuốc và tin tức; lợi ích nằm ở quan hệ và chuẩn bị, không thêm hệ số thiên vị chính đạo. Phạm nghiệp giữa các pha không thay gói đã chốt; nghiệp mới tiếp tục có hậu quả sau trận, không dùng đổi trang phục để làm mất.

##### Sáu cửa ải và chín hình thức kiếp phải có dữ liệu chiến đấu

Giữ tám tên kiếp hiện hữu cùng Tâm Ma Kiếp; không thay tất cả thành một quái vật sấm có đổi màu. Lịch chiến đấu sau là thiết kế mới, chưa đo bằng lượt chơi. Khác luật cũ có cửa chưa gặp kiếp, bản này cho đủ sáu cửa từ Luyện Khí đến Phi Thăng có đối kháng chủ động; đây là thay đổi có chủ đích để đáp ứng hướng khó mới. RL00 phàm nhân không có thiên kiếp nhập môn chỉ vì học võ; sau cải căn phải nhập đạo hợp lệ mới tới RL01.

“Ấn kiếp” là lõi áp lực có thể hóa giải bằng đòn đánh, công pháp, thần thức hoặc thủ pháp phù hợp, không phải thân thể thiên đạo có thể cướp trang bị. HP/Thủ của ấn kiếp là tiến độ phá ấn; Công của kiếp là lực đánh xuống. Mỗi nhịp ý đồ có ba hành động người chơi trước khi giáng, cho phép hóa giải, công phá ấn, dùng thuốc, thủ hoặc chủ động rút khi còn quyền rút. Khi đủ số đạo và HP ấn về không, mới thắng; phá ấn sớm không hủy các đạo còn lại. Nếu hết số đạo mà ấn chưa tan, nhận thêm tối đa hai nhịp cuối rồi giải quyết thất bại, không lặp vô hạn.

| Mã / cửa | Pha, loại kiếp và số nhịp | HP ấn / Công kiếp / Thủ ấn gốc | Tốn linh lực khi hóa giải đúng một nhịp | Gói tăng nền khi vượt thành công trước hệ số nghiệp |
|---|---|---|---:|---|
| TK01 RL01 Luyện Khí → RL02 Trúc Cơ | Thiên Lôi ba đạo, ba nhịp | 90 / 42 / 12 | 1 | Khí huyết +120; linh lực +30; Công và Pháp công mỗi thứ +14; Thủ +15; đổi nền thọ nguyên thành 130 năm |
| TK02 RL02 Trúc Cơ → RL03 Kết Đan | Tâm Ma Kiếp ba bóng niệm, mỗi bóng một nhịp, không có lôi bổ sung | 180 / 82 / 24 | 2 | Khí huyết +280; linh lực +60; Công và Pháp công mỗi thứ +30; Thủ +35; đổi nền thọ nguyên thành 300 năm |
| TK03 RL03 Kết Đan → RL04 Nguyên Anh | Sáu đạo Ngũ Hành Thần Lôi; đổi thành Tử Tiêu Thần Lôi nếu là LC06 Biến dị | 400 / 140 / 55 | 4 | Khí huyết +600; linh lực +120; Công và Pháp công mỗi thứ +66; Thủ +75; đổi nền thọ nguyên thành 650 năm |
| TK04 RL04 Nguyên Anh → RL05 Hóa Thần | Chín đạo Âm Hàn; nếu B từ 15 trở lên, dùng Nghiệp Hỏa thay Âm Hàn; sau đó ba bóng Tâm Ma | 900 / 300 / 120 cho pha chính; 300 / 150 / 60 cho Tâm Ma | 8 | Khí huyết +1.320; linh lực +240; Công và Pháp công mỗi thứ +144; Thủ +160; đổi nền thọ nguyên thành 1.500 năm |
| TK05 RL05 Hóa Thần → RL06 Độ Kiếp | Bị Phong sáu đạo rồi Thiên Lôi sáu đạo; mười hai nhịp | 2.000 / 660 / 260 dùng chung hai pha | 16 | Khí huyết +2.760; linh lực +480; Công và Pháp công mỗi thứ +314; Thủ +350; đổi nền thọ nguyên thành 3.000 năm |
| TK06 RL06 Độ Kiếp viên mãn → Phi Thăng | Âm Hỏa sáu đạo; Bị Phong sáu đạo; Cửu Trùng chín đợt, mỗi đợt bốn đạo. Tổng bốn mươi tám đạo, hai mươi mốt nhịp ý đồ | 4.400 / 1.370 / 560 dùng chung ba pha | 24 | Khí huyết +2.000; linh lực +400; Công và Pháp công mỗi thứ +200; Thủ +200, ghi vào hồ sơ thành tựu thân thể Phi Thăng của đời này rồi giải quyết kết cục; không tạo một cảnh giới chơi tiếp chưa có nội dung |

Các gói tăng TK01–TK05 là chênh lệch giữa hai nền mới trong phụ lục dữ liệu nền, không được cộng thêm cả nền đích lần nữa. Hiệu ứng phẩm chất cảnh giới và hệ số thưởng nghiệp chỉ nhân phần gói được phép, không nhân cộng dồn toàn thân. Thọ nguyên đổi sang trần cảnh giới, không cộng số năm trong bảng lên tuổi thọ đang có rồi nhân nghiệp; phần nghiệp không kéo dài tuổi thọ. TK06 chỉ mở khi RL06 viên mãn và đủ điều kiện Phi Thăng; kết cục thức tỉnh END04 còn đòi đủ ba mảnh tri thức đã mô tả ở chương cốt truyện. Không buộc chính đạo, không buộc G cao và không có số kiếp tối thiểu để được xét.

| Mã / hình thức | Ý đồ quan sát được và phản ứng đúng | Hiệu ứng phụ nội bộ; cách tránh |
|---|---|---|
| KIEP01 Thiên Lôi Kiếp | Vân sáng tụ trên đỉnh đầu; dẫn điện xuống đất bằng lựa chọn Tiếp Địa | Không thêm trạng thái; ngụ ý hướng đánh rõ ngay lượt đầu |
| KIEP02 Tử Tiêu Thần Lôi Kiếp | Tia tím chạy vòng ngoài lá chắn; thu lớp khí tản để Cố Bản | Nếu chỉ dùng khiên mà không Cố Bản, lôi làm mất thêm 20% giá trị khiên hiện tại trước sát thương; không xóa hết bằng một nhịp |
| KIEP03 Ngũ Hành Thần Lôi Kiếp | Màu và dấu hành luân phiên theo thứ tự Kim–Mộc–Thủy–Hỏa–Thổ rồi quay lại Kim; chọn Điều Hòa thay vì dùng một thuộc tính cố định | Người đủ ngũ hành có thêm lựa chọn điều hòa bằng căn; người thiếu hệ dùng trận hoặc pháp chuyển khí đã có quyền tiếp cận, không khóa chết Tam/Tứ/Song/Thiên căn |
| KIEP04 Âm Hỏa Kiếp | Hỏa ảnh cháy hướng vào mạch; chọn Giữ Sinh Cơ | Hồi phục nhận vào giảm 25% đến hết nhịp kế nếu hóa giải sai; không giảm vĩnh viễn và không nhân chồng nhiều lớp |
| KIEP05 Nghiệp Hỏa Kiếp | Lời oán gắn với hồ sơ hành vi thật hiện trong lửa; chọn Thừa Nhận hoặc Đối Diện bằng một cam kết phù hợp sự thật đã biết | Hóa giải sai mất thêm 2 ổn định Đạo tâm; lực đánh đã nhận K từ B, không nhân B lần hai chỉ vì tên Nghiệp Hỏa. Nhận lỗi không tự xóa nợ hoặc ép người chơi đổi phe |
| KIEP06 Bị Phong Kiếp | Bóng và tiếng gió lệch nhau; chọn Giữ Trục theo hướng đã trinh sát | Hóa giải sai làm hành động công phá tiếp theo giảm 20%; hết hiệu ứng sau một hành động, không cộng nhiều tầng |
| KIEP07 Âm Hàn Kiếp | Hàn ý bắt đầu từ chân, hình thế đóng lại; chọn Vận Khí Dưỡng Mạch | Hóa giải đúng tốn thêm 2 thể lực; sai làm mất 4 thể lực ở nhịp sau, không làm đông vĩnh viễn |
| KIEP08 Cửu Trùng Lôi Kiếp | Mỗi đợt báo trước bốn vết lôi, ba gần và một trễ; chọn Giữ Hơi Cuối | Bốn đạo chia cùng một gói Công trong bảng theo tỷ trọng 20/20/20/40%; không nhân Công gốc thành bốn lần. Một lựa chọn chiến thuật xử lý cả đợt; không bắt người chơi bấm nhịp thực bốn lần |
| KIEP09 Tâm Ma Kiếp | Bóng dựng lại một nỗi sợ hoặc mâu thuẫn từ đời đang sống; chọn Đối Chiếu Ký Ức, Giữ Cam Kết hoặc Chấp Nhận Mất Mát theo dấu đã ghi | Không được tạo tội giả để buộc chuộc lỗi. Một kẻ tà nhất quán vẫn có cách đối diện; chống trái dữ kiện mất thêm 2 ổn định Đạo tâm ở nhịp ấy. Không xóa quyền chọn bằng một câu đạo đức duy nhất |

Giải quyết sát thương một gói kiếp: lấy lớn hơn giữa 15% Công kiếp và Công kiếp trừ 0,70 Thủ người chơi; nhân hệ số sát thương do B đã chốt; sau đó nhân hệ số phản ứng rồi cho khiên hấp thu. Hóa giải đúng còn 35% lực đánh; Thủ Thế thông thường còn 65%; không phản ứng đúng hoặc cố công kích thay chống đỡ nhận 100%. Đây là hóa giải có trả giá, không phải né thường; trần né 45% của chiến đấu không cho thiên kiếp xác suất trượt. Không dùng yêu cầu phản xạ theo mili giây; người chơi được đọc ý đồ rồi quyết định theo lượt. Mỗi Hóa Giải tốn bốn thể lực cộng linh lực của cửa; cạn một trong hai không cho bấm giả như đã hóa giải thành công.

Công phá ấn bằng chiêu chủ động tính lớn hơn giữa 1 và 1,40 × giá trị cao hơn của Công/Pháp công người chơi trừ 0,35 Thủ ấn, rồi áp hiệu ứng chiêu và khuynh hướng Hành Đạo hợp lệ. HP ấn nhân K, Thủ ấn giữ gốc; sát thương nguồn kiếp nhân 1 + 0,75(K−1) như công thức đã chốt. Giữ một lượt rút chuẩn bị trước khi đạo đầu giáng; sau đạo đầu, không thoát bằng Thần Hành Phù vì thiên kiếp không phải cuộc truy đuổi địa lý.

Tâm Ma cũng dùng gói đối kháng trên nhưng biểu đạt Công là áp lực tinh thần, Thủ ấn là độ cố kết của bóng niệm. Khi Đạo tâm về không, thất bại dù khí huyết còn; chống đỡ không đúng làm tổn hại thân thể do nghịch khí, không chứng minh bóng là người thật có thể lấy linh hồn. Chuyển pha giữ khí huyết, linh lực, thể lực, tải thuốc và khiên còn lại; không hồi đầy. Thời gian chiến đấu không đi qua một nhịp năm để nhận hồi thể chất miễn phí.

Dữ liệu trợ kiếp kế thừa tên và tác dụng gốc: Hồi Xuân Đan hồi 35% khí huyết tối đa; Tụ Khí Đan hồi 50% linh lực; Kim Cang Phù tạo khiên bằng 35% khí huyết tối đa; Hộ Mạch Đan là bảo mạng; Dưỡng Nguyên Đan tạo khiên ban đầu 20%; Tị Lôi Phù giảm một gói lôi. Để chốt giới hạn bản mới: tối đa ba Hồi Xuân Đan, hai Tụ Khí Đan, hai Kim Cang Phù trong cả một nghi thức; mỗi món dùng một hành động, hai lần cùng loại cách ít nhất ba hành động; không cộng vượt khiên tổng 50% khí huyết tối đa. Tối đa một Hộ Mạch, một Dưỡng Nguyên và một Tị Lôi trong chuẩn bị; Tị Lôi vô hiệu một gói lôi nhưng giữ ba hành động của nhịp ấy, không làm mất thời gian công phá ấn. Món không tương thích loại kiếp bị chặn trước tiêu. Không đồng nhất Hộ Mạch Đan trợ kiếp với Hộ Mạch Tán cải căn.

Giá gốc trợ kiếp được giữ theo danh mục gốc: Hồi Xuân 22, Tụ Khí 18, Kim Cang 24, Hộ Mạch 70, Dưỡng Nguyên 50, Tị Lôi 65 linh thạch hạ phẩm, trước biến động và chất lượng. Quầy dược LOC10 nhận đặt: các món hồi có tối đa sáu đơn vị/tháng, các món trợ kiếp có tối đa một đơn vị/quý; đặt không tạo hàng tức thời nếu bị phong tỏa. Công thức và nguồn chế kế thừa đúng bản ghi trong danh mục gốc, không tự giả một công thức phàm rẻ thay thế. Đây là tiêu chuẩn mua và dùng cho sáu cửa mới, không khẳng định tất cả quầy hiện tại đã có đúng tồn kho ấy.

Thất bại trước đạo đầu chỉ mất thời gian chuẩn bị và vật tư đã dùng. Sau đạo đầu, nếu khí huyết hoặc Đạo tâm cạn và có Hộ Mạch: tiêu bảo mạng, sống với một khí huyết, nhận trọng thương, mất 25% tiến độ tu vi hiện cảnh giới và hai Căn Cơ; tối thiểu 180 ngày phục hồi rồi mới được thử lại. Không có bảo mạng thì giải quyết chết; ghi cụ thể gói kiếp, ý đồ và tài nguyên đã cạn. Nếu còn sống nhưng hết hai nhịp cuối mà ấn chưa tan, dùng cùng luật thất bại; không cho bấm tiếp để chắc thắng. Khi thử lại, giữ cờ phần thưởng đã nhận theo cửa; thất bại chưa nhận thưởng không bị khóa vĩnh viễn. Không giảm xác suất vô căn kiếp sau để bù một lần chết trước kiếp.

Bảng số cố ý đòi nhiều chuẩn bị ở cửa cuối: tại nền Độ Kiếp 5.200 khí huyết, 650 Thủ và B bằng không, hóa giải đúng hai mươi mốt gói TK06 vẫn mất xấp xỉ 6.725 khí huyết trước khiên và thuốc. Hai Hồi Xuân dùng hợp lý có thể bù lượng thiếu, nhưng còn phải đủ công phá ấn, thể lực, linh lực, đáp án ý đồ và xử lý Âm Hỏa. B cao làm HP ấn và lực đánh tăng trong giới hạn đã chốt; vượt được nhận phần chỉ số thêm đã hứa. Đây là phép tính thiết kế để người biên tập đánh giá, không phải kết quả đã chơi thử hoặc bảo đảm thắng.

#### 5. Độ khó: đánh giá trước khi mạo hiểm và trả giá sau thất bại

| Thành phần | Quy định bản nội dung hoàn chỉnh đầu tiên |
|---|---|
| Thời gian | Đi đường, nghề, dưỡng thương, trồng dược, tu luyện dùng cùng đồng hồ thế giới. Một năm bế quan tiêu một năm tuổi, khẩu phần, thuê chỗ và biến động NPC; không đứng ngoài thế cục |
| Thức ăn | Người phàm có nhu cầu ăn, chỗ ngủ, chi phí gia đình; thiếu ăn gây suy nhược trước khi gây chết. Có việc tạm đủ mua khẩu phần, nhưng làm việc sẽ lấy mất thời gian học nghề hoặc tìm cơ duyên |
| Thu nhập | Không có nghề nào tự tạo lãi chắc vượt mọi nghề khác. Thu nhập xét sản lượng, giá, cầu, thuế, vận chuyển, phí bảo vệ, hư hỏng và thời gian lao động |
| Tu luyện | Hiệu suất = tốc độ công pháp × linh căn × phẩm chất căn × môi trường × trạng thái thân/tâm; tu vi đủ chưa tự mở đột phá. Cần điều kiện cửa ải, vật tư, hiểu biết và xử lý thương thế |
| Đột phá | Chuẩn bị có thể giảm rủi ro, không biến thành chắc thắng. Mỗi đại cảnh giới có một trở ngại tài nguyên, một trở ngại nhận thức hoặc quan hệ, một hiểm họa chủ động; không chỉ cần đủ thanh kinh nghiệm |
| Đối thủ | Có mục tiêu, chiêu mở, sức bền, khả năng sợ chết, rút lui, gọi viện và nhớ thù. Không phải mọi thú rừng đều đánh đến chết; không phải mọi người gặp đều là bao vật phẩm |
| Chênh lệch | Cảnh giới trên tạo ưu thế tầm đánh, sức chịu và khả năng quan sát. Phục kích, độc, địa hình, thương thế và đồng đội có thể thu hẹp; không bảo đảm lật kèo chỉ vì một lần chí mạng |
| Rút lui | Có nút và điều kiện rút trước trận; trong trận có lối rút theo địa hình, thân pháp và tình trạng truy đuổi; mất chiến lợi phẩm, tiền chuộc, đồ bỏ lại hoặc quan hệ là thất bại có thể sống tiếp |
| Tin tức | Trinh sát cho nhãn “Có thể đối phó”, “Ngang sức”, “Rất nguy hiểm”, “Chưa thể phán đoán”, kèm căn cứ; không hiển thị xác suất chính xác giả khi không biết kỹ năng đối phương |
| Thương thế | Thất bại không phải luôn chết. Thương nhẹ làm giảm hiệu suất, thương nặng khóa hành động mạo hiểm, tàn tật thay đổi nghề. Có thể sống một đời sau khi bỏ tiên lộ |
| Cạn tài nguyên | Công thức, thuốc và yêu thú có nguồn phân bố, tái sinh hoặc khai thác cạn. Không được săn một hang vô tận để né mọi cạnh tranh |
| Tâm lý | Đạo tâm phản ứng mất mát, quyết định trái cam kết và chấn thương; tà đạo không mặc định tâm trí kém. Một kẻ ác nhất quán có thể vững tâm, một người cứu đời có thể sụp đổ |

Mục tiêu cân bằng cần xác minh bằng chơi thử có chủ đích: người hiểu hệ thống vẫn phải chuẩn bị trước mốc lớn; có ít nhất một lối kiếm sống bền cho mỗi xuất thân vô căn; chênh lệch cảnh giới không bị một công thức tăng chỉ số hàng năm vô hạn phá hủy; bỏ tiên lộ không làm mất toàn bộ nội dung còn lại. Không tự chạy bot theo chỉ dẫn dự án nếu người dùng chưa yêu cầu.

#### 6. Quy tắc tăng trưởng hằng năm

Một lần đầu năm sinh học của nhân vật là một nhịp tác động, không phải mỗi lần mở lịch. Bắt đầu tại tuổi điều khiển được. Năm lẻ được tích lũy, không mất vì làm tròn; đi qua mười năm xử lý đủ mười nhịp và các biến cố xen giữa. Mỗi hiệu ứng có dấu năm đã xử lý, tổng đã tích lũy và trạng thái ngủ yên để ngăn cộng lặp khi tải.

Quy ước cân bằng: khí huyết gốc người trưởng thành là 100, phòng ngự gốc 10, các thước năng lực phàm tục dùng 100. Tăng trưởng thể chất tính trên gốc lúc bắt đầu điều khiển, không tính trên chỉ số đang được trang bị hoặc cảnh giới nhân lên. Khi một nguồn ghi “+0,5 khí huyết/năm, trần +15”, sau 30 nhịp đạt trần nguồn đó và dừng. Cất hoặc đeo đồ không làm đổi gốc. Tăng trần khí huyết cộng cùng lượng vào khí huyết hiện tại, giữ nguyên lượng đã mất; không biến tăng trần thành hồi đầy.

Thứ tự năm: tăng tuổi và trừ nhu cầu sinh hoạt → bệnh và thương tổn đã đến hạn → tăng trưởng nền còn hiệu lực → hồi phục tức thời từ thể chất → biến động tâm lý → biến cố khí vận → nhận xét nhật ký. Tử vong đã chốt trước lượt hồi phục không được cứu lại bằng một lần chữa cuối năm. Ở trong trận, giữ hiệu ứng hồi phục năm đến khi trận kết thúc; không đổi lịch để nhận thuốc miễn phí giữa thiên kiếp. Điều kiện dùng linh lực chỉ hoạt động sau có căn.

Mỗi người có tối đa một thể chất nền và một khí vận nền. Dị biến cốt truyện có thể thay thế thể chất; các khoản tăng trưởng đã nhận được giữ trong cơ thể, hiệu ứng tương lai đổi sang thể mới. Tổng tăng trưởng vĩnh viễn từ mọi thể chất bị chặn ở +25% khí huyết gốc, +20% phòng ngự gốc; năng lực trên thước 0–100 có trần chung +15 điểm từ thể chất. Các nguồn tăng Công, Thân pháp và Thần thức ngoài thước này bị chặn ở +15% giá trị gốc phàm đối với Công/Thân pháp, hoặc +15% giá trị lúc bắt đầu có Thần thức. Các trần riêng từng nguồn vẫn áp dụng, lấy trần chặt hơn. Không có chồng hai Man Hoang Thể. Hồi phục nhiều nguồn cùng nhịp cộng trước rồi giới hạn ở 20% trần khí huyết; phần vượt mất, không lưu làm khiên.

##### Từ vựng năng lực và cách kiểm tra

Các tên tăng trưởng trong hai bảng dưới phải phân giải được, không được chỉ in một lời khen trong nhật ký. “Sức mạnh” là Công vật lý ST04; “phản xạ” là Thân pháp ST08; “bản lĩnh” và “tự chủ” tăng phần ổn định của Đạo tâm ST11, không cộng hai thanh Đạo tâm khác nhau. “Cảm nhận” khi vô căn là Giác quan phàm tục, không phải Thần thức; hiệu ứng Huyền Âm chỉ chuyển phần tăng tương lai sang Thần thức ST09 sau khi có căn và người chơi chọn. “Nhận dược” không tự tăng cấp nghề dược, và “khảo vật” không tự mở cảnh giới trận pháp.

Tạo nhóm năng lực hỗ trợ ST23, mỗi thước 0–100, gốc 10, không phụ thuộc cảnh giới: ST23A Giác quan; ST23B Giao tế; ST23C Thương lượng; ST23D Cảnh giác; ST23E Nhận dược; ST23F Khảo vật; ST23G Tự nhận thức; ST23H Nhẫn nại. Cảm nhận tăng ST23A; giao tế tăng ST23B; thương lượng tăng ST23C; cảnh giác tăng ST23D; nhận dược tăng ST23E; khảo vật tăng ST23F; tự nhận thức tăng ST23G; nhẫn nại tăng ST23H. Kỹ nghệ thích ứng của Thích Ứng Thể tăng mức thuần thục kỹ năng cụ thể đã chọn trong ST21, không thêm một nghề trùng tên; tỷ lệ quy đổi một điểm bảng thể chất thành mười điểm nghề trên thước 0–1.000, tối đa 75 điểm nghề từ nguồn này.

Kiểm tra hành động dùng đúng năng lực được chỉ định trong dữ liệu sự kiện: phát hiện tiếng động dùng A; mở lời xin gặp dùng B; mặc cả dùng C; phát hiện phục kích dùng D; nhận dạng dược dùng E; xác thực niên đại dùng F; nhận ra ký ức bị xuyên tạc dùng G; giữ tập trung trong một công việc kéo dài dùng H. Xác suất nền = giới hạn 0,05–0,95 của 0,50 + 0,01 × (năng lực − độ khó) + 0,15 × (nghề liên quan/1.000). Độ khó là giá trị 0–100 ghi trong bản ghi sự kiện, không tự nâng theo chỉ số người chơi. Không có nghề liên quan thì phần nghề bằng không; không thiếu vật tư bắt buộc thì mới được rút. Kết quả được chốt cho một lần thử có cùng tình trạng; tải bản lưu không rút lại. Đổi cách tiếp cận hoặc có bằng chứng mới tạo lần thử khác có chi phí/thời gian thực. Những việc chắc chắn như đọc đúng tờ giấy có đủ chữ không phải rút xác suất.

##### Danh mục 18 thể chất có dữ liệu tác động đủ để biên soạn

“Tối đa” trong cột nội bộ là trần tích lũy của chính nguồn đó. Các xác suất là mỗi năm thực, rút một lần bằng kết quả đã lưu. Giảm đạo tâm là mất độ ổn định hiện thời, có thể hồi phục bằng diễn biến đời; không hạ vĩnh viễn nhân cách. Dấu phần trăm ở bảng thuộc dữ liệu nội bộ, không xuất hiện trong tooltip.

| Mã / thể chất | Tăng trưởng hoặc tác động năm; trần nguồn | Đánh đổi, điều kiện, chồng lặp | Tooltip chính thức không số |
|---|---|---|---|
| TC01 Man Hoang Thể | +0,5 khí huyết gốc/năm, tối đa +15; +0,04 phòng ngự/năm, tối đa +1,2 | Nhu cầu thức ăn +10%; áp dụng cả vô căn; không nhận thêm tăng lực từ chính tên thể chất | “Thân thể mỗi năm thêm bền bỉ, khí huyết và sức chịu đựng tăng nhẹ. Cần ăn nhiều hơn người thường.” |
| TC02 Hỏa Linh Thể | Hồi ngay 4% khí huyết tối đa mỗi năm nếu còn sống; 25% mất 2 ổn định đạo tâm; khi có căn, hiệu suất công pháp Hỏa +8% | Hồi ở đầy cây bị bỏ; khí lạnh khiến chi phí hồi phục tăng 5%; mất ổn định không kích hoạt hai lần trong năm | “Khí huyết sôi trào, mỗi năm hồi lại một phần nhỏ sinh lực. Tính nóng dễ khiến đạo tâm chao đảo; gặp rét lâu sẽ khó dưỡng thương.” |
| TC03 Thanh Mộc Thể | +0,35 khí huyết gốc/năm, tối đa +10,5; hồi ngay 2% khí huyết mỗi năm | Độc mộc nhận vào +8%; ưu thế không chữa thương tật đã thành sẹo | “Sinh cơ dần đầy hơn theo năm tháng, vết mệt được xoa dịu đôi chút. Dễ nhiễm những loại độc ẩn trong cây cỏ.” |
| TC04 Huyền Thủy Thể | +0,25 ổn định đạo tâm/năm, tối đa +7,5; hồi ngay 2% khí huyết khi năm đó từng ở vùng nước an toàn | Môi trường cực nóng làm hiệu suất lao động −5%; không tự hồi chỉ nhờ một ô nước không tiếp cận được | “Tâm trí dần lắng như nước. Qua một năm gần nguồn nước yên lành, sinh lực được bồi lại đôi chút; khí nóng khiến thân thể nặng nề.” |
| TC05 Hậu Thổ Thể | +0,05 phòng ngự/năm, tối đa +1,5 | Tốc độ đi bộ −5%; năm bị suy dinh dưỡng chỉ nhận một nửa tăng trưởng | “Gân cốt chậm rãi vững thêm qua năm tháng. Bước chân có phần nặng; đói lâu sẽ khó nuôi dưỡng thể chất.” |
| TC06 Canh Kim Cốt | +0,12 sức mạnh/năm, tối đa +3,6; +0,02 phòng ngự/năm, tối đa +0,6 | Hồi phục thương xương tốn thêm 10% thời gian; không tăng sát thương phép | “Cốt cách dần rắn chắc, lực tay tăng nhẹ theo năm. Khi đã tổn thương xương, cần dưỡng lâu hơn.” |
| TC07 Băng Tủy Thể | +0,25 ổn định đạo tâm/năm, tối đa +7,5; khi có căn, chống nhiễu do hàn +10% | Mỗi năm 20% tê lạnh, giảm 3% thể lực tối đa trong tháng đầu năm; không xóa hiệu ứng bằng đổi khu ngay sau khi phát | “Hàn tủy giúp tâm ít xao động, sự bình tĩnh được bồi thêm qua năm. Có lúc rét buốt trong xương khiến thân thể chậm lại.” |
| TC08 Phong Hành Thể | +0,12 thân pháp/năm, tối đa +3,6 | Khả năng gánh nặng −8%; không nhân tăng trưởng bởi đi bộ nhiều | “Thân pháp nhẹ dần qua năm tháng. Đổi lại, mang vác nặng dễ khiến cơ thể đuối sức.” |
| TC09 Lôi Mạch Thể | Hồi ngay 3% khí huyết/năm; +0,1 phản xạ/năm, tối đa +3 | Mỗi năm 15% rối mạch, mất 2% khí huyết hiện tại; thuốc an mạch ngăn rối nhưng không tạo thêm hồi; có căn mới được ưu thế Lôi | “Mạch như có điện, phản ứng nhạy dần và sinh lực đôi khi dâng trở lại. Cũng có năm kinh mạch giật rối, cần điều dưỡng.” |
| TC10 Thuần Dương Thể | +0,3 khí huyết gốc/năm, tối đa +9; hồi ngay 2% khí huyết/năm | Mất nước ở sa mạc tăng 10%; không chữa hàn độc bằng việc tự động xóa trạng thái | “Dương khí nuôi sức sống qua từng năm, giúp hồi sinh lực nhẹ. Khô nóng khiến cơ thể nhanh hao nước.” |
| TC11 Huyền Âm Thể | +0,12 cảm nhận/năm, tối đa +3,6; khi có căn chuyển một nửa tăng trưởng tương lai sang thần thức nếu người chơi chọn | Ánh nắng gắt làm sức bền −5%; trước có căn không sinh thần thức; lựa chọn chuyển không nhân đôi tổng | “Dần nhạy với dấu vết rất khẽ quanh mình. Nắng gắt làm sức bền suy giảm; khi nhập đạo, sự nhạy cảm này có thể nuôi thần thức.” |
| TC12 Bách Độc Thể | Kháng độc nền +0,4 điểm phần trăm/năm, tối đa +12 điểm phần trăm | Hiệu quả thuốc hồi phục −5%; độc đã vượt mức gây chết vẫn nguy hiểm; không biến độc thành hồi máu | “Mỗi năm thêm quen với độc tính, nhưng khó hấp thu thuốc dưỡng thương như người thường. Độc quá mạnh vẫn có thể đoạt mạng.” |
| TC13 Linh Nhĩ Thể | +0,12 cảm nhận/năm, tối đa +3,6; mỗi năm lần nghỉ đầu tại nơi yên tĩnh hồi thêm 1 ổn định đạo tâm | Đòn âm thanh gây choáng lâu hơn 10%; vô căn có thính lực tốt, không nghe linh hồn | “Tai nghe rõ hơn những điều nhỏ nhặt qua từng năm. Nghỉ ở chốn yên giúp an tâm; tiếng chấn mạnh lại dễ làm choáng.” |
| TC14 Tĩnh Tâm Thể | +0,35 ổn định đạo tâm/năm, tối đa +10,5 | Tăng quan hệ từ hội hè giảm 5%; không tự miễn tâm ma; biến cố mất người thân vẫn áp dụng đầy đủ | “Tâm dần khó lay động, mỗi năm thêm chút vững vàng. Ít hòa mình vào náo nhiệt, khó gần người hơn đôi chút.” |
| TC15 Mộng Du Thể | +0,12 ngộ tính/năm, tối đa +3,6; một lần/năm mở mảnh giấc mơ nếu có manh mối thật liên quan | Mỗi năm 20% ngủ bất an, nghỉ đêm trong tháng đầu hiệu quả −10%; không tạo tình tiết mới thiếu dữ kiện; không biết trước đáp án cốt truyện | “Những giấc mộng đôi khi nối lại dấu vết đã thấy, ngộ tính dần tăng nhẹ. Có năm mộng quá sâu khiến nghỉ ngơi kém.” |
| TC16 Khổ Mạch Thể | +0,45 khí huyết gốc/năm, tối đa +13,5 khi năm ấy có ít nhất sáu tháng đủ ăn và lao động; không đủ thì +0 | Hồi thể lực từ nghỉ −5%; không thưởng vì chủ động tự làm đói | “Sức bền được bồi lên từ những năm đủ ăn và chịu khó. Cơ thể hồi sức chậm hơn sau khi mệt; nhịn đói không giúp rèn mạch.” |
| TC17 Thích Ứng Thể | +0,25 kỹ nghệ nghề thích ứng/năm, tối đa +7,5, nếu có ít nhất ba tháng học tư thế hoặc công cụ phù hợp trong năm | Không tạo khuyết tật; không chữa khỏi khuyết tật đang có; mỗi năm chỉ chọn một nghề đã thực hành, không nhận bonus nhiều nhánh | “Cơ thể dần quen với tư thế và công cụ phù hợp sau những năm thực hành. Nếu có thương tật cũ, vẫn cần tính đến giới hạn của thân thể.” |
| TC18 Thú Tức Thể | +0,15 hiểu tập tính thú/năm, tối đa +4,5; hồi ngay 2% khí huyết sau năm có chăm sóc thú thật | Mùi cơ thể khiến thú săn mồi dễ phát hiện +5%; vô căn chỉ thuần dưỡng phàm thú; triệu thú và khiển linh thú cần có căn | “Qua những năm chăm thú, dần hiểu tập tính và được xoa dịu sinh lực. Mùi trên người cũng dễ khiến dã thú nhận ra.” |

Thể chất cần một bản ghi triệu chứng trước khi nhân vật biết tên. Người phàm không có thầy có thể chỉ thấy “mỗi đầu năm thường nóng ran”; chẩn đoán mở tên đầy đủ, không thay kết quả đã rút. Không để tooltip nói chắc một ưu thế đang ngủ yên có hiệu lực ngay.

##### Danh mục 12 tiên thiên khí vận

Khí vận sửa tần suất hoặc điều kiện của sự kiện đã có bản ghi, không sản sinh đồ vô danh. Mỗi đời tối đa một khí vận nền; tăng trưởng vĩnh viễn cộng giữa các khí vận bị chặn ở +10 điểm cho năng lực trên thước 0–100; với chỉ số khác dùng +10% giá trị gốc tương ứng. Các nhánh được điều kiện hóa; không có sự kiện hợp lệ thì giữ nguyên, không cưỡng ép phát. Chi phí và hậu quả không bị miễn vì mang tên may mắn.

| Mã / khí vận | Tác động hằng năm và giới hạn nội bộ | Mặt giá phải trả; quy tắc | Tooltip chính thức không số |
|---|---|---|---|
| KV01 Phùng Hung Hóa Cát | +0,1 bản lĩnh/năm, tối đa +3; lần đầu mỗi năm một tai nạn mức nhẹ đã phát sinh có 15% được giảm một bậc tổn thất | Không cứu khỏi thiên kiếp hoặc đòn chí tử; không rút lại sự kiện đến khi tốt | “Qua năm tháng, thêm chút bản lĩnh trước nghịch cảnh. Đôi khi tai nạn nhỏ dịu đi, nhưng hiểm họa lớn vẫn phải tự vượt.” |
| KV02 Quý Nhân Lưu Ý | +0,1 giao tế/năm, tối đa +3; một lần/năm tăng 10 điểm phần trăm cơ hội lời đề nghị giúp từ người đã có lý do thiện cảm | Người giúp đưa yêu cầu có chi phí; không sinh NPC cứu mạng vô cớ | “Dễ được người có duyên để mắt, khả năng giao tiếp tiến bộ nhẹ theo năm. Sự giúp đỡ thường đi cùng một điều gửi gắm.” |
| KV03 Cô Tinh Chiếu Mệnh | +0,15 tự chủ/năm, tối đa +4,5 | Quan hệ mới tăng chậm 5%; không ép người thân chết; sự cô độc là khuynh hướng quan hệ và lựa chọn | “Sống qua từng năm, thêm quen tự chống đỡ. Gần người khác khó hơn đôi chút, nhưng chẳng ai bị định sẵn phải rời bỏ bạn.” |
| KV04 Tài Lộc Bạc Phận | +0,1 thương lượng/năm, tối đa +3; một lần/năm có 15% gặp cơ hội mua thấp hơn giá địa phương 5% nếu đã đi chợ | Hàng có hạn dùng, thuế và vận chuyển đầy đủ; năm không giao dịch không phát tiền miễn phí | “Mỗi năm thêm tinh ý trong mặc cả, đôi khi nhận ra món giá hời. Của đến tay vẫn cần giữ và xoay xở.” |
| KV05 Bần Hàn Dưỡng Chí | +0,15 bản lĩnh/năm, tối đa +4,5 nếu ít nhất sáu tháng làm việc đủ nuôi sống | Khởi đầu tiền giảm 10%; không thưởng cho cố ý ném tiền hoặc bỏ đói; không hạ linh căn | “Những năm tự kiếm sống bồi thêm ý chí. Xuất phát ít tiền, việc nhỏ cũng cần tính kỹ.” |
| KV06 Huyết Quang Đeo Bám | +0,1 cảnh giác/năm, tối đa +3; trọng số gặp xung đột đã hợp lệ +10% trong một sự kiện/năm | Có thể từ chối hoặc tránh; không cộng sát thương miễn phí và không đẩy vào trận chắc chết | “Qua năm tháng thêm nhạy trước mùi nguy hiểm. Tranh chấp dễ tìm tới, cần biết lúc tiến và lúc tránh.” |
| KV07 Duyên Dược Thảo | +0,15 nhận dược/năm, tối đa +4,5 khi năm có học hoặc hành nghề; một lần/năm tăng 10% lượng thảo dược thường tìm thấy | Không áp dụng linh dược cải căn độc nhất; dễ nhận đề nghị tìm thuốc có đánh đổi thời gian | “Những năm học và hái thuốc giúp dần nhận rõ dược tính, thường nhặt được thêm ít cây thuốc phổ thông. Linh dược quý vẫn hiếm.” |
| KV08 Cổ Vật Gọi Tên | +0,1 khảo vật/năm, tối đa +3; một lần/năm có 10% mở một đầu mối cổ vật ở nơi đã khám phá | Đầu mối có thể dẫn tới tranh chấp hoặc món hỏng; không tự sinh truyền thừa | “Ngày càng quen nhận dấu tích cũ, đôi khi thấy một manh mối người khác bỏ qua. Đồ cổ không hứa đem lại phúc.” |
| KV09 Nhân Duyên Chằng Chịt | +0,1 giao tế/năm, tối đa +3; một lần/năm tăng 10% trọng số tái ngộ NPC còn sống có lịch trình giao nhau | Có thêm lời nhờ hợp lý; không di chuyển NPC tức thời hoặc hồi sinh người chết | “Càng sống càng khó dứt khỏi người đã quen. Đôi khi gặp lại giữa đường, cùng cả ân tình lẫn điều chưa nói.” |
| KV10 Vãn Thành Chi Mệnh | Tuổi dưới 35 không có tăng; từ 35, +0,25 ngộ tính/năm, tối đa +5 | Học kỹ năng trước 35 chậm 5%; không đảm bảo sống đến lúc chín muồi, không trì hoãn hạn chết | “Tài trí nở muộn, tuổi trẻ học có phần chậm. Nếu sống qua những năm tháng đầu, ngộ tính dần sáng hơn.” |
| KV11 Mộng Tỉnh Sớm | +0,1 tự nhận thức/năm, tối đa +3; mỗi năm 15% nối một ký ức truyền đời đã có thành nhận xét, một lần tối đa | Ký ức có thể gây buồn, giảm 1 ổn định đạo tâm khi nối; không mở mẹo chiến đấu chưa từng biết; không tự đạt thức tỉnh cuối game | “Dần nhìn rõ những vết cũ trong mình, có khi nhớ ra điều tưởng đã mất. Nhớ lại không phải lúc nào cũng dễ chịu.” |
| KV12 Bình Sinh Yên Ả | +0,1 nhẫn nại/năm, tối đa +3; trọng số tai nạn nhẹ của sinh hoạt thường giảm 5% | Cơ hội đầu mối kỳ ngộ ngẫu nhiên giảm 5%; sự kiện cốt truyện và nguy hiểm do tự lựa chọn không bị ngăn | “Năm tháng thường bớt một chút sóng gió, sự nhẫn nại dần tăng. Cơ duyên bất ngờ cũng hiếm ghé hơn.” |

“Mỗi năm” trong tooltip không được biến thành hứa luôn có biến cố; phần nào cần điều kiện phải ghi điều kiện. Cửa sổ chi tiết cho phép xem nhật ký tác động bằng câu “Năm nay gân cốt vững hơn đôi chút”, “Dương khí đã hồi một phần nhỏ khí huyết”, “Không có tác dụng hồi phục vì sinh lực đang đầy”; không có con số ẩn sau nhấn giữ hay chế độ so sánh thông thường.

#### 7. Dữ liệu tối thiểu bắt buộc cho mọi hiệu ứng trong chương này

Mỗi bản ghi cần: mã duy nhất; tên hiển thị; loại; mô tả cốt truyện; mô tả khi chưa nhận biết; điều kiện xuất hiện; kiếp được phép; xác suất hoặc trọng số; điều kiện áp dụng; tuổi bắt đầu và kết thúc; nhịp kích hoạt; đích chỉ số; lượng nội bộ; đơn vị; cách cộng; trần riêng; nhóm trần chung; điều kiện ngủ yên; thứ tự xử lý; mức tác hại; cách khắc phục; sự kiện truy nguồn; tooltip chính thức; thông báo kích hoạt; thông báo không có tác dụng; quy tắc lưu; quy tắc thay thế; tương tác vô căn; tương tác tàn tật; tương tác thiên kiếp; tham chiếu hình, âm và văn bản; trạng thái biên tập; người chịu trách nhiệm duyệt.

Mỗi lần cải căn cần thêm: danh tính nguồn; số lượng tồn tại mỗi kiếp; những người biết; dấu vết thật; dấu vết giả; lý do nguồn còn chưa bị cường giả chiếm; đường tiếp cận của người phàm; phương án thương lượng, lao động, mua hoặc cưỡng đoạt nếu cốt truyện cho phép; mục tiêu bị ảnh hưởng; tuổi thọ tối thiểu; vật tư; người hỗ trợ; xác suất đã chốt; kết quả thành công; kết quả thất bại; thương tật; thời gian hồi phục; cách hoàn tất nếu NPC hỗ trợ chết; nhánh rút lui; hoàn trả hay mất vật tư khi dừng; quan hệ và nợ phát sinh; công pháp nhập môn tương thích sau cải căn; thông báo hết khả năng sử dụng.

#### 8. Các tình huống phải kiểm khi bước sang triển khai

| Mã | Tình huống nghiệm thu | Kết quả bắt buộc |
|---|---|---|
| HT01 | Tạo mọi xuất thân ở kiếp đầu | Luôn có căn; nghề phàm vẫn chọn được |
| HT02 | Kiếp sau vô căn có Hỏa Linh Thể | Hồi sinh lực và dao động tâm đúng điều kiện; không dùng được linh lực |
| HT03 | Vô căn chọn luyện hồn, huyết thuật, luyện thể tiên đạo | Giải thích cần cải căn; không âm thầm cho tu vi |
| HT04 | Vô căn học võ, làm quan, lập võ phái | Có tiến trình, quyền lợi và kết thúc nghề thật |
| HT05 | Tải lại ngay sau sinh hoặc ngay trước nghi thức đã chốt | Không đổi căn, vật liệu, xác suất hay kết quả được lưu |
| HT06 | Thử cải căn khi đã có căn từ cơ duyên | Không tạo căn thứ hai; giải thích giới hạn |
| HT07 | Bà lão trộm tiền người giúp | Lợi ích mất thật, thiện ý không bị viết lại thành ác; có dấu truy tìm |
| HT08 | Sát hổ cứu hươu | Không tự động cộng tà; có sổ hệ quả sinh thái, không xóa cái chết của hổ |
| HT09 | Làm nhiều việc nhỏ tốt sau một vụ sát hại | Nợ sát hại vẫn có; Thiện duyên cũng được ghi riêng |
| HT10 | Hành Đạo nội bộ chính 60/tà 40 và ngược lại | Bổ trợ/tổn giảm đúng bảng; UI không hiển thị điểm hoặc tỷ lệ |
| HT11 | Người tà ít nợ và người chính nhiều nợ chưa giải quyết vượt kiếp | Thiên kiếp xét B thực, không suy từ nhãn chính/tà |
| HT12 | Rớt cảnh giới và vượt lại cùng mốc | Không nhận lặp gói chỉ số cơ sở hoặc phần thêm vì nghiệp |
| HT13 | Đi qua mười năm một lần rồi tải lại | Chỉ nhận đúng mười lượt năm, có ghi từng tác động cần thiết |
| HT14 | Hồi hằng năm khi khí huyết đầy, trọng thương hoặc đang chiến đấu | Phần thừa mất; giới hạn thương tật được tôn trọng; không chen hồi miễn phí giữa trận |
| HT15 | Thay nhiều thể chất và sống cực lâu | Trần riêng và chung ngăn tăng vô hạn; không có nhân kép theo cảnh giới |
| HT16 | Nghiệp rất nặng, sinh vào phàm nhân nghèo | Hoàn cảnh khó hơn nhưng vẫn có lương, việc, nơi trú và lựa chọn sống hợp lệ |
| HT17 | NPC cầm chìa khóa cải căn chết trước khi người chơi đến | Có kết quả mất cơ hội hoặc tuyến kế thừa đã biên soạn; không cửa sổ nhận nhiệm vụ bị kẹt |
| HT18 | Bản lưu cũ thiếu Hành Đạo/Nghiệp Duyên mới | Không tự quy điểm karma cũ thành tội cụ thể; cho trạng thái chưa xác minh và bắt đầu ghi từ thời điểm chuyển đổi |

---

<a id="cot-truyen"></a>

### 6. Thế giới, đường đời, 45 tuyến xuất thân và tám kết thúc

#### Quyết định về phạm vi nội dung

Phần này là đề xuất nội dung chính thức cho bản thiết kế đầu tiên, không phải mô tả rằng dự án đã có sẵn các tuyến truyện. Giữ tên Phù Sinh, năm đại khu Trung Châu, Đông Hoang, Nam Trạch, Tây Lĩnh, Bắc Nhạc; giữ những hạt nhân đã xuất hiện là Vạn Bảo Thương Hội, Ngũ Tổ, Yêu Hoàng, Đêm Dài và Bến Vong Xuyên. Các địa điểm có mã LOC, nhân vật có mã NP, tuyến truyện có mã OR và thế lực có mã FA bên dưới là nội dung mới được đề xuất. Chúng là điểm neo cố định đặt vào bản đồ có phần còn lại sinh theo hạt giống. Không đổi tên một NPC cố định mỗi lần tải bản lưu.

Danh mục đóng của phần cốt truyện gồm 45 xuất thân, 15 đại tuyến, 15 địa điểm neo, 10 thế lực neo, 30 NPC neo, 18 nghề phàm, 16 nghề tu luyện, 12 sự kiện nhân sinh và 8 kiểu kết thúc lớn. Các tên sinh ngẫu nhiên là cá thể của một loại dữ liệu đã xác định, không được dùng để che chỗ thiếu tuyến truyện của một xuất thân đã có trong danh mục.

#### Lời hứa cảm xúc và bí mật thế giới

Lời hứa với người chơi: mỗi đời có người để nhớ, điều để mất và một quyết định không thể lấy lại. Kiếp nghèo có thể kết thúc bằng một mái nhà đủ gạo; kiếp thiên tài có thể kết thúc trong căn phòng không còn ai gọi tên mình. Khả năng tu luyện không quyết định một đời có đáng chơi hay không.

Cổ Giới tồn tại trong một vòng luân hồi do Ngũ Tổ thiết lập sau Đêm Dài đầu tiên. Vòng luân hồi đã ngăn một lần sụp đổ, nhưng cấu trúc duy trì nó hiện lấy ký ức và các mối ràng buộc của sinh linh làm nhiên liệu. Ngũ Tổ có cả công cứu thế lẫn món nợ hiện tại; không mặc định cả năm là kẻ xấu. Yêu Hoàng lưu một phần ký ức ngoài hệ thống ấy. Những phe tuyên bố hiểu chân tướng chỉ giữ từng mảnh thông tin, và có người dùng mảnh thật để dựng lời dối.

Bến Vong Xuyên là nơi lưu dấu trải nghiệm đã xảy ra, không phải cửa hàng đổi việc thiện lấy đặc quyền. Người chơi dần nhận thấy những câu nói, món đồ và giấc mơ lặp lại. Thức tỉnh là nhận ra cấu trúc ấy và lựa chọn quan hệ của mình với nó. Phi thăng là một kết thúc thoát vòng; thống nhất thiên hạ, dựng ma quốc hoặc sống trọn đời phàm vẫn là kết quả hợp lệ của một đời.

Văn phong dùng vật cụ thể và khoảng trống sau mất mát: bát cơm để nguội, đôi giày không còn người đi, giấy báo tử bị mưa xóa tên. Không tả mọi người đều phản bội, vì lòng tốt có thật mới khiến phản bội gây đau. Không để mọi cứu giúp đều dẫn tới bẫy, mọi đứa trẻ đều chết hay mọi cuộc sum họp đều bị cưỡng ép phá vỡ. Hy vọng nhỏ phải có thể được giữ bằng hành động và cái giá rõ ràng.

#### Mô hình cốt truyện: điểm neo thay cho đường ray

Xuất thân cấp một vết thương, một quan hệ, một bí mật và một cuộc khủng hoảng đang tiếp diễn. Xuất thân không khóa nghề, phe, pháp môn hoặc kết thúc. Con nhà nông có thể lên ngôi; người mang huyết mạch ma tộc có thể chữa bệnh; đệ tử danh môn có thể đi buôn và không bao giờ đột phá.

Mỗi đời có năm lớp hoạt động đồng thời:

1. Sinh tồn: ăn, ở, bệnh, tuổi già, nghĩa vụ, sinh kế.
2. Đường nghề: tay nghề, hợp đồng, chức vị, người học việc, tài sản.
3. Quan hệ: ân, oán, tin cậy, yêu thương, gia đình và chia lìa.
4. Đại tuyến xuất thân: năm nút có trạng thái chưa biết, biết, đang mở, hoàn tất, thay hướng, khép lại.
5. Dấu thức tỉnh: khám phá về vòng luân hồi, tích lũy độc lập với việc có theo đại tuyến hay không.

Nút cốt truyện chỉ có thể yêu cầu một điều kiện thế giới hoặc một mục đích; không bắt buộc bấm đúng một lựa chọn ở nút trước. Nhận ra giấy nợ giả có thể bằng học chữ, nhờ thư lại, trộm sổ, mua chứng ngôn hoặc khám nghiệm người đã chết. Các cách ấy có chi phí và hậu quả khác nhau nhưng cùng công nhận sự thật đã được biết.

Mỗi nút lưu: sự kiện làm nó xuất hiện; điều người chơi đã biết; tối thiểu ba cách can dự; cái giá; các bên bị ảnh hưởng; dấu vết còn lại; điều kiện tự khép nếu người chơi không tham gia; người hoặc vật chứng thay thế; cửa quay lại sau khi đổi nghề hoặc đổi phe. Một người đã chết không sống lại để đọc lời thoại còn thiếu.

Không hiển thị nút chưa gặp như nhiệm vụ bắt buộc. Người chơi có thể ghim, bỏ theo dõi hoặc ghi rõ đã khước từ. Khi khước từ, ghi diễn biến do các bên tự xử lý vào niên biểu; không tự trừ thưởng, đạo tâm hay nhân quả vì không đóng vai anh hùng. Nghĩa vụ đã tự nguyện nhận vẫn có hậu quả nếu bỏ dở, vì đó là một hành động khác với chưa từng nhận lời.

#### Thời gian, thế cục và tính liên tục qua các kiếp

Đồng hồ cốt truyện chạy theo thời gian trong thế giới khi người chơi làm việc, di chuyển, nghỉ, tu luyện hoặc chủ động cho thời gian trôi. Đọc hộp thoại, mở túi và tạm dừng không làm mất cơ hội. Bế quan dài phải báo trước những biến động đã nghe tin; không đòi người chơi biết điều chưa từng được tiết lộ.

| Đồng hồ | Nhịp và biến cố đã chốt | Có thể can thiệp | Nếu không can thiệp |
|---|---|---|---|
| CLK01 Mùa đói Thanh Khê | Mỗi quý kiểm sản lượng, kho lương, đường vận chuyển; thiếu lương hai quý liên tiếp mở di cư | Trữ thóc, sửa đê, giảm thuế, cướp kho, hộ tống | Hộ nghèo di cư, ruộng đổi chủ; người sống sót mang sổ hộ tới LOC02 |
| CLK02 Nợ của triều đình | Mỗi năm đến kỳ trả nợ cho Vạn Bảo; hai kỳ trễ mở nhượng quyền mỏ | Thanh tra, trả nợ, thương lượng, đảo chính | FA02 nắm kho mỏ; không tự sinh tiền cứu triều đình |
| CLK03 Biên ải | Mỗi mùa đông xét lương, quân số và hiệp ước; thiếu hai điều mở thất thủ | Tiếp tế, đàm phán, chỉ huy, phá đường quân địch | Dân và quân rút về LOC14; LOC13 thành chiến địa |
| CLK04 Huyết ước | Mỗi ba năm họp xác nhận quyền kế vị; vật chứng huyết mạch là điều kiện dự họp | Dự họp, công bố hồ sơ, cướp ấn, hủy nghi lễ | Người kế vị NPC nhận quyền, người chơi vẫn có thể thách thức sau |
| CLK05 Thú triều | Mỗi mùa sinh sản xét săn bắt, vùng sống và giao ước | Giảm săn, dời đường, săn thủ lĩnh, lập bẫy, lập ước | Đàn thú di chuyển và xung đột với nơi ở; không mặc định thú ác |
| CLK06 Đêm Dài trở lại | Tăng sau phá phong ấn, diệt hồn quy mô lớn hoặc lạm dụng trục luân hồi; không tăng chỉ vì kiếp thứ cao | Vá phong ấn, thay nhiên liệu, chiếm trục hoặc mở cửa thoát | Các vùng bị biến đổi theo mức; luôn còn đường nhận biết và lựa chọn kết thúc |

Thế giới tiếp tục tồn tại khi người chơi tái sinh: một người chết để lại mộ, người thừa kế hoặc khoảng trống quyền lực; không sinh lại cùng nhân vật ở tuổi cũ. NPC phàm có tuổi, hạn sống, bệnh và người kế nhiệm. NPC tu luyện có cảnh giới và thọ nguyên. Khi khởi đầu mới vào một dòng họ cũ, vai trò mẹ nuôi hoặc người giữ ấn có thể do một hậu duệ đảm nhiệm, nhưng hồ sơ phải có cá nhân mới, quan hệ phả hệ thật và lời thoại phù hợp. Tên NP dưới đây là nhân vật của thời kỳ mở đầu; người kế nhiệm dùng mã cá thể riêng nối tới vai trò ấy. Không hứa 45 xuất thân đều luôn có thể sinh vào trong mọi thời kỳ: chỉ chọn từ các xuất thân có điều kiện thế giới còn hợp lệ, đồng thời giữ ít nhất một xuất thân phàm và một xuất thân có thể tiếp cận tri thức thức tỉnh.

#### Bản đồ neo và các tuyến đi

Mỗi nơi có chủ sở hữu hiện tại, mức an toàn, sức chứa, lương, tài nguyên, dịch vụ, lịch mở, người cư trú, hiện vật, tổn hại và thông tin người chơi biết. Quy mô vật lý trên bản đồ không được làm một ngôi miếu chứa cả thành phố. Các đường neo dưới đây là kết nối địa lý; chi phí đi bộ, thuyền, xe hoặc pháp khí dùng quy tắc di chuyển chung.

| ID | Địa điểm và đại khu | Công dụng, thứ hữu hạn và tình trạng khi bị phá |
|---|---|---|
| LOC01 | Thanh Khê Thôn — Trung Châu | Ruộng, nhà hộ dân, đê, kho thóc, chợ; mất nhà chuyển thành trại tị nạn rồi di tích, sổ hộ có bản lưu LOC02 |
| LOC02 | Lương Kinh — Trung Châu | Triều đình, trường thi, ngục, sổ thuế, sân khấu; sau đổi triều đổi chủ và luật, không xóa dân vô cớ |
| LOC03 | Vạn Bảo Hội Quán — Trung Châu | Hợp đồng, thương đội, bảo quản, đấu giá; sổ nợ còn bản sao trong thương đội nếu trụ sở mất |
| LOC04 | Cổ Miếu Vô Danh — Đông Hoang | Trú ẩn, bia tên người mất, dấu mộng; bia vỡ để lại mảnh chữ đọc được |
| LOC05 | Huyền Cơ Trận Các — Đông Hoang | Trận đồ, trục quan trắc, hồ sơ Ngũ Tổ; khi sụp còn phòng lõi nguy hiểm nhưng có thể khảo sát |
| LOC06 | Đoạn Tùng Lâm — Đông Hoang | Gỗ, dược phàm, thú, đất chôn; cháy rừng đổi sinh thái và lộ nền đá cổ |
| LOC07 | Huyết Sát Cốc — Nam Trạch | Huyết tộc, huyết trì, pháp ước, tranh quyền; sau diệt tộc còn ấn và hồ sơ bị nguyền |
| LOC08 | Vạn Thú Môn — Nam Trạch | Chuồng thú, trại cứu thương, sổ khế ước, cửa gọi linh; thú thả ra tạo quần thể thật, không biến mất |
| LOC09 | Tịch Chiếu Bến — Nam Trạch | Đò, lưới, chợ nước, sân hát, xác tàu; nước rút hay lũ đổi lối vào, lời khai nằm trên bảng khắc thuyền |
| LOC10 | Bách Thảo Cốc — Tây Lĩnh | Ruộng thuốc, bệnh xá, hồ sơ dịch, bàn luyện đan; vườn bị đốt mất nguồn thu nhưng hạt giống lưu tại kho lạnh |
| LOC11 | Hàn Thiết Lô — Tây Lĩnh | Mỏ, lò, xưởng giấy và khuôn; đóng mỏ để lại đường hầm, bảng công và lô kim loại cuối |
| LOC12 | Lạn Kha Tự — Tây Lĩnh | Thư khố, nhà tạm trú, tháp tro, văn bia; bị phá vẫn có văn bản tản mát ở người hành hương |
| LOC13 | Bắc Phong Ải — Bắc Nhạc | Quân doanh, trường luyện, trạm ngựa, kho; thất thủ để lại chiến địa và tuyến tiếp tế lưu vong |
| LOC14 | Táng Cốt Nguyên — Bắc Nhạc | Mồ tập thể, bia trận vong, trại người trở về, xưởng dựng bia; dấu linh hồn đọc được nếu người sống mất hết |
| LOC15 | Hồi Thanh Đài — Bắc Nhạc | Điểm nghe ký ức, quan trắc Đêm Dài và cửa kết thúc; chưa thức tỉnh chỉ thấy nền đá, không giả mở nội dung không tồn tại |

Đường neo bắt buộc: LOC01–LOC02, LOC02–LOC03, LOC01–LOC04, LOC04–LOC05, LOC04–LOC06, LOC06–LOC08, LOC08–LOC07, LOC08–LOC09, LOC09–LOC03 bằng thủy lộ, LOC03–LOC11 bằng thương lộ, LOC11–LOC10, LOC10–LOC12, LOC11–LOC13, LOC13–LOC14, LOC14–LOC15, LOC12–LOC15 bằng sơn lộ. Đường bị chặn phải báo nguyên nhân và có lối vòng qua mạng ô địa hình; không biến mỗi đại khu thành một cửa ải tu vi.

#### Thế lực và NPC có mục đích

| ID | Thế lực; căn cứ | Lợi ích và mâu thuẫn có thể chơi |
|---|---|---|
| FA01 | Lương triều; LOC02 | Giữ thuế và ngôi; nợ FA02, cần FA10; phe cứu dân và phe giữ ghế cùng tồn tại |
| FA02 | Vạn Bảo Thương Hội; LOC03 | Giữ hợp đồng, độc quyền vận chuyển; mua quyền mỏ FA08, giao thương cả FA05 khi có lãi |
| FA03 | Huyền Cơ Trận Các; LOC05 | Giữ hệ trận Ngũ Tổ; che một phần lỗi lịch sử, tranh luận với FA09 |
| FA04 | Thanh Khê Liên Thôn; LOC01 | Giữ đất, nước, an táng; cần gỗ LOC06 nhưng chống phá rừng quá mức |
| FA05 | Huyết Sát Cốc; LOC07 | Bảo vệ huyết hệ và giành quyền tự trị; nội bộ có phái săn người và phái dùng huyết hiến tự nguyện |
| FA06 | Vạn Thú Môn; LOC08 | Giữ nơi sống, khế ước và nguồn thú; tranh chấp thợ săn, phản đối hiến thú cưỡng ép |
| FA07 | Bách Thảo Cốc; LOC10 | Cứu chữa và giữ độc quyền đan phương; luôn có xung đột giữa cứu người và chi phí duy trì |
| FA08 | Hàn Thiết Hội; LOC11 | Giữ lò và quyền thợ; có người bán lao động khế ước để tránh phá sản |
| FA09 | Lạn Kha Tự; LOC12 | Giữ ký ức người chết, không cấm phàm nhân đọc; một phe muốn giấu chân tướng để thế giới yên |
| FA10 | Bắc Phong Quân; LOC13 | Giữ biên và lương quân; khi triều đình bỏ mặc có thể tự trị, đầu hàng hoặc khởi binh |

Mỗi NPC có hồ sơ tuổi, thọ nguyên, căn tính, nghề, tiền, đồ, quan hệ, điều họ biết, giới hạn họ không chịu vượt và lựa chọn khi bị dồn ép. Bảng lịch gồm lịch thường lệ trong tuần và ngoại lệ theo tháng hoặc trăng khi chưa có biến cố; chiến tranh, thương thế, bắt giam, đi đường hoặc đã chết phải ghi đè lịch có lý do.

| ID | Nhân vật; vai trò và quan hệ | Mục đích; lịch thường lệ và ngoại lệ |
|---|---|---|
| NP01 | Lý Thổ; đại diện hộ nông, người nuôi OR01 | Giữ đê và đất; ban ngày ruộng LOC01, tối kho thóc; ngày bảy họp hộ |
| NP02 | Mộc Nghi; dân binh, đồng đội cũ NP25 | Đưa quân dịch trở về; ngày tại trạm LOC01, tối sân luyện; ngày ba đi LOC02 |
| NP03 | Tạ Văn Kính; thư lại, học trò cũ NP23 | Sửa sổ thuế nhưng sợ mất chức; ngày công đường LOC02, tối chép sách; ngày bảy thăm ngục |
| NP04 | Lương Hạo; quân chủ, chủ nợ là NP05 | Giữ ngôi, sợ tên mình thành tên cuối sử; ngày triều LOC02, đêm nội cung; ngày năm tế miếu |
| NP05 | Thẩm Cửu; chưởng quỹ, chủ hợp đồng NP06 | Giữ chữ tín có lợi cho hội; ngày quầy LOC03, tối kiểm sổ; ngày hai đấu giá |
| NP06 | Lạc Tín; người dẫn thương đội, anh em kết nghĩa NP17 | Chuộc người nhà bị cầm cố; ngày lẻ LOC03, ngày chẵn trên tuyến LOC03–LOC11, đêm trại đường |
| NP07 | Vô Đăng; người giữ miếu, người nuôi OR07 | Giữ danh tính người bị xóa; sáng sửa bia LOC04, tối đốt đèn; ngày sáu đưa tro LOC12 |
| NP08 | Mạc Liên; người dò phả hệ, từng bị FA05 truy tìm | Tìm tên mẹ mình; ngày LOC04, tối đọc bia; ngày ba khảo sát LOC07 nếu có hộ tống |
| NP09 | Hứa Triều; trận sư, thầy NP10 | Giữ trận dù biết nó có nợ; ngày lõi LOC05, tối thư thất; ngày một nhận học đồ |
| NP10 | Diệp Vân; học đồ trận, thân nhân một thợ chết | Công khai bảng người bị hiến; ngày sửa trận LOC05, đêm sao hồ sơ; ngày bảy tới LOC04 |
| NP11 | Đỗ Lộc; tiều phu, người anh của OR biến thể giữ rừng | Nuôi con và không bán hết rừng; sáng LOC06, tối LOC01; ngày năm họp hộ |
| NP12 | Dã Tâm; sứ thú của Yêu Hoàng, từng cứu NP16 | Lập lại hiệp ước sinh cảnh; ngày tuần rừng LOC06, đêm bờ suối; ngày trăng khuyết tới LOC08 |
| NP13 | Tần Huyết Lăng; chủ huyết cốc, có quan hệ phả hệ OR14 | Giữ dòng tộc, không muốn bị chiếm hồn; ngày nghi điện LOC07, tối huyết trì; ngày ba xử tranh quyền |
| NP14 | A Túc; người giữ huyết phả, bị NP13 kiểm soát | Cứu những tên bị loại khỏi tộc; ngày kho phả LOC07, tối nhà nhỏ; ngày sáu giao thư LOC09 |
| NP15 | Bạch Kỳ; người quản thú, thầy NP16 | Giữ môn tồn tại qua thú triều; ngày chuồng LOC08, tối sổ khế; ngày hai tuyển học đồ |
| NP16 | Kỷ Vũ; thú y, mang ơn NP12 | Chấm dứt khế ước cưỡng ép; ngày bệnh thú LOC08, tối soạn phương; ngày năm vào LOC06 |
| NP17 | Giang Mộ; lái đò, kết nghĩa NP06 | Chở người sống và trả tên người chết; sáng tối LOC09, trưa nghỉ; ngày mười lăm cúng xác vô danh |
| NP18 | Ninh Ca; chủ gánh hát, được NP03 che chở | Đưa lời khai bị cấm lên sân khấu; ngày tập LOC09, tối diễn; ngày hai và năm lưu diễn LOC02 |
| NP19 | Tô Bán Hạ; y sư, thầy NP20 | Mở bệnh xá đủ sức nuôi người chữa; ngày bệnh xá LOC10, tối ruộng thuốc; ngày bảy nhận ca nghèo |
| NP20 | Hà Tề; dược đồng, anh em họ NP27 | Tìm nguồn dịch, nghi sổ triều bị sửa; sáng vườn LOC10, tối giã thuốc; ngày ba tới LOC11 lấy mẫu |
| NP21 | Cố Chùy; chủ lò, đối tác NP05 | Trả nợ lò mà không chôn thêm thợ; ngày lò LOC11, tối nhà thợ; ngày bảy phát công |
| NP22 | La Men; thợ khuôn và giấy, từng làm ấn giả cho NP28 | Mua lại tên tuổi nghề; ngày xưởng LOC11, tối thử men; ngày bốn chợ nghề |
| NP23 | Trí Viễn; người giữ thư khố, thầy cũ NP03 | Ghi sự thật mà không khiến chiến tranh tái phát; ngày thư khố LOC12, tối tháp tro; ngày một tiếp người đọc |
| NP24 | Sầm Tro; người khắc bia, đồng đội mất tại LOC14 | Trả tên cho từng nắm tro; ngày LOC12, đêm khắc; tuần cuối tháng tới LOC14 |
| NP25 | Đường Bắc Quy; chỉ huy, đồng đội NP02 | Đưa quân về đủ người, có thể phản triều vì việc ấy; ngày doanh LOC13, tối bản đồ; ngày ba duyệt kho |
| NP26 | A Mãn; giữ ngựa trạm, em người lính mất tích | Giữ đường tin không bị sửa; sáng trạm LOC13, tối chăm ngựa; ngày hai chạy LOC14 |
| NP27 | Mạnh Cốt; thầy bó xương, anh em họ NP20 | Cứu người còn sống giữa nghĩa địa; ngày trại LOC14, tối ghi tên; ngày bảy tìm hài cốt |
| NP28 | Bùi Ấn; cựu coi ấn, cha mẹ của hậu duệ OR37 | Công bố lệnh chết bị giả; ngày trại LOC14, đêm giấu ấn; ngày năm tới LOC12 |
| NP29 | Kha Vọng; người nghe ký ức, học trò cũ NP09 | Chứng minh có thể sửa vòng mà không hiến thêm người; ngày trục LOC15, tối nền đá; không nhận khách giữa lúc Đêm Dài dâng |
| NP30 | Tịch Âm; ký ức kết tụ, không phải người sống lại | Muốn được chấm dứt việc lặp lời người chết; chỉ hiện LOC15 khi có dấu thức tỉnh; gặp một lần mỗi giai đoạn |

NP04 không vô địch chỉ vì là nhân vật cốt truyện. NP30 không trao vật phẩm sinh vô hạn và không thay thế người yêu đã chết của người chơi. Nếu một NPC trọng yếu chết, mục đích của họ có thể được đồng minh tiếp tục; tính cách, quan hệ thân mật và trách nhiệm không tự chuyển cho người kế nhiệm.

#### Đại đạo ba ngàn: 18 nghề phàm và 16 nghề tu

Ba ngàn là lời hứa về số tổ hợp đường đời, không phải bắt người biên soạn đặt ba ngàn tên nghề rồi bỏ trống cách chơi. Một đường đời là tổ hợp xuất thân, nghề, tư cách phe, pháp môn nếu đủ điều kiện, quan hệ, mục tiêu và kết quả. Chuyển nghề giữ kỹ năng cũ nhưng phải học việc, có dụng cụ và trả thời gian; không cấp ngay toàn bộ năng lực.

| ID | Nghề phàm | Vòng hành động, đầu vào, sản phẩm; nút quyết định riêng |
|---|---|---|
| PM01 | Nông dân | Đất, nước, giống → gieo, chăm, thu, giữ giống; bán lương hay giữ qua mùa đói |
| PM02 | Tiều phu | Rìu, sức, quyền vào rừng → khảo cây, đốn, vận gỗ; nhận hợp đồng phá rừng hay trồng lại |
| PM03 | Ngư dân | Thuyền hoặc bờ, lưới, mùa nước → dò luồng, thả, gỡ, bảo quản; vét giống hay để cá sinh sản |
| PM04 | Thợ mỏ | Đèn, cuốc, thông gió, hợp đồng → dò vỉa, gia cố, khai, vận; báo mạch nguy hiểm hay giữ công |
| PM05 | Thợ rèn | Lò, nhiên liệu, phôi → nung, rèn, tôi, sửa; làm vũ khí cho bên trả cao hay từ chối |
| PM06 | Thợ thủ công | Công cụ, nguyên liệu, bản nghề → dệt, vá lưới, giấy, khuôn, men theo chuyên môn; giữ bí quyết hay truyền cho thợ |
| PM07 | Y sư phàm | Kiến thức, dược phàm, dụng cụ → khám, bó xương, sắc thuốc, theo dõi; chữa theo khả năng, không chữa chắc mọi thương tích |
| PM08 | Người chép sách | Học chữ, giấy, mực, bản gốc → sao, đối chiếu, dạy, viết hộ; sửa lời theo người trả tiền hay giữ nguyên |
| PM09 | Thương nhân | Vốn, hàng, thông tin, vận chuyển → mua, thuê, giao, thương lượng; đầu cơ đói hay bán rẻ để giữ mạng lưới |
| PM10 | Phu trạm | Đường, sức, tín vật → nhận, xác minh, vận, giao thư; giữ bí mật hay mở thư cứu người |
| PM11 | Binh lính | Quân tịch, khẩu phần, vũ khí → luyện, gác, hành quân, giữ trận; tuân lệnh sai hay đào ngũ |
| PM12 | Chiến binh giang hồ | Võ học phàm, thân thể, vũ khí → luyện, hộ tống, tỷ thí, giữ đất; danh dự, tiền và mạng không luôn cùng hướng |
| PM13 | Sát thủ phàm | Tình báo, vũ khí thường, độc phàm → theo dõi, chọn đường, ra tay, rút; nhận hoặc phá hợp đồng, không dùng thần thức |
| PM14 | Đạo chích | Quan sát, mở khóa, nơi tiêu thụ → khảo sát, đột nhập, trộm, thoát; chọn mục tiêu và xử người nhìn thấy |
| PM15 | Nghệ nhân gánh hát | Tập luyện, đoàn, sân, phục trang → tập, diễn, bán vé, lưu diễn; dùng sân khấu để giải trí, lừa đảo hoặc làm chứng |
| PM16 | Quan viên | Học vấn hoặc tiến cử, chức trách → xử án, thu chi, trị thủy, bổ nhiệm; giữ chức hay công bố sai phạm cấp trên |
| PM17 | Người chèo đò | Thuyền, phép bến, kỹ năng nước → xem nước, chở, cứu, sửa; nhận người bị truy bắt hay giữ an toàn cả thuyền |
| PM18 | Chưởng môn võ phái | Võ học phàm thành thục, đất, danh, học trò → tuyển, dạy, nuôi, xử tranh, truyền vị; giữ môn nhỏ hay nhận bảo trợ ràng buộc |

PM18 không cần linh căn; võ học phàm nâng năng lực trong giới hạn con người và không làm hiện linh lực. PM13 và TU16 có vòng chơi tình báo tương tự nhưng khác cảm biến, phương tiện, phòng thủ và hậu quả. Chức hoàng đế, bá chủ thương lộ, lãnh tụ phản quân là địa vị đạt được, không phải nút chọn nghề ở đầu đời.

| ID | Nghề tu luyện | Tài nguyên, động từ và giới hạn đặc trưng |
|---|---|---|
| TU01 | Kiếm tu | Kiếm, linh lực, kiếm ý; phá thế, hộ kiếm, ngự kiếm; sợ mất kiếm và đứt mạch liên kết |
| TU02 | Thể tu | Linh căn hợp lệ, công pháp luyện thể, dược dưỡng; tôi thân, chịu đòn, phản chấn; võ phàm chỉ là nền, không vượt cửa vô căn |
| TU03 | Huyết tu | Huyết khí, nguồn máu có xuất xứ, pháp ước; chuyển huyết, hồi lực, huyết ấn; tự hiến hoặc cưỡng đoạt có hệ quả khác nhau |
| TU04 | Hồn tu | Hồn lực, vật dẫn, sự đồng thuận hoặc phong hồn; giao cảm, dẫn hồn, trấn hồn; không mặc định mọi dẫn hồn đều là hành ác |
| TU05 | Thần thức tu | Thức hải, tập trung, pháp khí tâm; dò, nhiễu, che, phản chiếu; bị phản chấn và thông tin giả |
| TU06 | Triệu hoán sư | Vòng gọi, tọa độ, vật hiến, hợp đồng; gọi thực thể tạm thời từ nơi khác, đóng cửa; thực thể có thể từ chối |
| TU07 | Ngự thú sư | Thú sống, thức ăn, tin cậy, khế ước; dưỡng, chỉ huy, chia cảm giác; thú có thương tích, tuổi và quyền rời khế |
| TU08 | Trận pháp sư | Trận kỳ, địa thế, thời gian bố trí; đo, đặt, dẫn, phá; thay địa hình hoặc mất nút làm trận suy |
| TU09 | Đan sư | Lò, linh dược, đan phương, hỏa hậu; phối, luyện, kiểm độc; đan có lô, phẩm và tạp chất |
| TU10 | Dược sư tu luyện | Linh điền, dược lý, mạch bệnh; dưỡng thuốc, chữa kinh mạch, giải tạp; khác TU09 ở cây và điều trị dài hạn |
| TU11 | Luyện khí sư | Phôi linh, lò, đồ phổ; định hình, khắc mạch, luyện, sửa; pháp khí có độ bền và người chế tạo |
| TU12 | Phù sư | Phù chỉ, mực linh, khuôn thức; vẽ, phong, kích, tẩy; phù có hạn dùng, lỗi nét và điều kiện kích |
| TU13 | Khôi lỗi sư | Khung, lõi, mạch điều khiển; ráp, thử, điều, thu hồi; giới hạn số kênh, bị cắt liên kết |
| TU14 | Độc tu | Độc vật, giải dược, môi trường; nuôi độc, phân tích, rải, thu; tự nhiễm và lan sang người ngoài có thể xảy ra |
| TU15 | Âm luật tu | Nhạc khí, hơi thở, nhịp, môi trường; cộng hưởng, trấn tâm, phá âm; bị câm trường và phản âm |
| TU16 | Ảnh sát tu | Linh căn, ẩn thuật, tình báo thần thức; che dấu, thế thân, ám kích, thoát; có đối pháp soi hồn và truy dấu |

Chính phái, ma phái, tán tu, hộ quốc, lưu vong và khai tông là tư cách liên kết. Một đan sư có thể thuộc ma phái; một huyết tu có thể giữ giao ước cứu người. Vào phe mở quan hệ, hợp đồng và địch thủ; không tự đổi phẩm chất đạo đức hoặc nhân quả của các hành động đã làm.

Mỗi nghề có bốn bậc tay nghề nội bộ: 0–99 học đồ, 100–299 hành nghề, 300–699 chuyên gia, 700–1000 tông sư. Bậc nghề không thay cảnh giới tu luyện. Truyền thừa là mục tiêu cuối riêng, không phải bậc thứ năm. Mỗi bậc bắt buộc có hợp đồng sản xuất, bài toán thiếu nguồn lực, quyết định có người bị ảnh hưởng, tiêu chí đạt và quyền từ chối. Mỗi nghề có một mục tiêu đời riêng được ghi vào kết đời: giữ giống qua nạn đói, giữ rừng, nuôi lại luồng cá, đóng mỏ an toàn, tạo lò truyền nghề, lưu bí quyết thủ công, mở bệnh xá, lưu sách thật, mở thương lộ, giữ đường thư, đưa đơn vị về, giữ một vùng đất, hoàn tất hoặc phá hợp đồng ám sát, trộm được sổ nợ, diễn vở bị cấm, xử đại án, giữ bến qua lũ, truyền một võ phái; kiếm phá phong ấn, luyện thể vượt giới hạn thân, lập huyết ước tự nguyện, giải phóng hồn, giữ thức hải, đóng cửa triệu hoán, lập thú ước, sửa đại trận, hoàn đan phương, chữa linh dịch, luyện pháp khí trấn giới, lưu phù đồ, dựng khôi lỗi tự bảo trì, thu hồi độc vực, trấn một tâm kiếp, chấm dứt mạng sát lệnh. Đây là 34 mục tiêu có nội dung kết thúc riêng, không chỉ thay tên cùng một huy hiệu.

#### Quy ước đọc 45 tuyến xuất thân

OR01–OR15 giữ 15 xuất thân gốc. OR16–OR45 giữ 30 xuất thân bổ sung đã có trong danh mục dự án. Không xóa 30 xuất thân để làm bảng đẹp hơn. Chúng được viết thành 15 đại tuyến có thể dùng chung địa điểm và biến cố; từng xuất thân vẫn có năm nút cụ thể, tối thiểu hai nút mang xung đột riêng và ba kết có điều kiện riêng.

Trong các tuyến, N1 đến N5 là mã nút của chính xuất thân đó. Hoàn tất một nút nghĩa là thế giới đã ghi sự thật hoặc sự thay đổi nêu ở nút, không đòi chọn duy nhất một nghề. Các điều kiện kết nối bằng chữ “và” phải cùng thỏa. Khi đủ nhiều kết, người chơi chọn điều mình nhận là kết đời ở lúc lui về, qua đời hoặc chốt đại sự; các kết phụ vẫn nằm trong sử ký. Không xếp kết thiện cao hơn kết ác. Không cần hoàn tất cả năm nút nếu đã tự tạo được điều kiện kết bằng hoạt động tự do.

Mỗi kết bên dưới nêu thay đổi thế giới và một dấu vọng cho kiếp sau. Dấu vọng là một thông tin, người, địa điểm hoặc mối quan hệ có nguồn gốc cụ thể; không phải phần thưởng đạo đức cố định. Sức nặng Nghiệp Duyên vẫn tính từ sổ hành động, không tính từ nhãn kết. Một dấu vọng đã được khám phá không phát quà lại khi đi tới cùng nơi nhiều lần.

##### Mười lăm đại tuyến

**OR01 — Con nhà nông: Một bát cơm qua mùa lạnh.** Quan hệ mở đầu: NP01 và các hộ LOC01; bí mật: đê hỏng vì đá xây bị bán, không phải vì dân thất đức.

- N1: đối chiếu phần thóc nhà mình với sổ thu của NP03, xác lập món thiếu và người cùng chịu.
- N2: khảo đê LOC01, lấy mẫu đá hoặc lời thợ; xác định lô đá do FA02 bán qua người môi giới của triều.
- N3: chọn giữ giống, vay lương, đi làm thuê hoặc cướp kho; ghi nguồn lương và người phải trả giá.
- N4: xử tranh đất của hộ di cư bằng chuộc, phân lại, mua hoặc chiếm; kết quả thay quyền sở hữu thật.
- N5: khi mùa thu sau tới, quyết định vận hành kho chung, tư điền hoặc bỏ quê; di chuyển gia đình nếu chọn đi.

Kết OR01-A “Đèn còn trong thôn”: có kho chung đủ một mùa và đê hoạt động, ít nhất một hộ khác ở lại; LOC01 có lương dự trữ, kiếp sau có bia người giữ giống và người thừa kế hộ ấy. OR01-B “Chủ đất sau đói”: sở hữu quyền ruộng của đa số hộ và có người canh tác, bất kể cách lấy; LOC01 thành điền trang, kiếp sau gặp sổ địa tô cùng ân oán từng hộ. OR01-C “Tên quê trong tay áo”: gia đình hoặc người được nhận là gia đình đã định cư nơi khác và mang theo giống hoặc sổ hộ; thôn cũ tự diễn biến, kiếp sau tìm thấy dòng họ lưu dân ở LOC02.

**OR02 — Con nhà trận sư: Những tên người dưới trận đồ.** Quan hệ: NP09 là người giữ bản nghề, NP10 giữ lời khai; bí mật: một bản sửa trận đã dùng người làm vật dẫn.

- N1: nhận mảnh trận đồ từ nhà, đối chiếu nét sửa tại LOC05 để xác định tác giả thật.
- N2: đo mạch quanh LOC04 và LOC05, xác nhận trận lấy sức từ vật dẫn sống hay nguồn linh tự nhiên.
- N3: tìm bảng người mất tích bằng thương lượng, sao chép hoặc đột nhập; nối tên với ba mộ tại LOC04.
- N4: chọn vật dẫn thay thế, giữ nguyên hoặc chiếm quyền trục; phải thu đủ nguồn vận hành cho đúng phương án.
- N5: xử người chịu trách nhiệm và công bố, niêm phong hoặc sửa hồ sơ, làm đổi vị thế FA03.

Kết OR02-A “Trận không nuốt tên”: trục chạy bằng nguồn không phải sinh linh và bảng tên đã được lưu công khai; FA03 mất độc quyền bí mật, kiếp sau có học đồ giữ bản sửa. OR02-B “Người giữ trục”: người chơi nắm khóa vận hành và duy trì được trận qua một kỳ; FA03 hoặc tông mới phục tùng, kiếp sau gặp dấu lệnh của mình cùng các món nợ vật dẫn. OR02-C “Đập cột trời cũ”: phá lõi và sơ tán được ít nhất một nhóm cư dân; địa hình LOC05 thành phế trận, kiếp sau nghe câu chuyện về ngày trời từng tối, không tự nhận công cứu người nếu đã bỏ mặc họ.

**OR03 — Con nhà đồ tể: Con dao biết tên chủ.** Quan hệ: NP01 mua thịt, NP17 chở hàng; bí mật: một lô thịt là vật chứa dấu hồn để buôn người.

- N1: kiểm dấu dao và sổ cân của cha mẹ, nhận ra cân bị sửa trong một lô giao FA02.
- N2: truy chuyến hàng từ LOC01 tới LOC09, phân biệt chăn nuôi thật với người bị giấu dưới khế gia súc.
- N3: đối diện người môi giới; cứu người, lấy tiền im lặng hoặc tiếp quản đường dây đều lưu nạn nhân cụ thể.
- N4: tìm cách trả tên cho người bị đóng dấu bằng pháp lý phàm, phá ấn với trợ giúp hoặc giữ dấu để khống chế.
- N5: định lại nghề gia đình: lò mổ có kiểm, bếp cứu tế hoặc sát nghiệp có tổ chức.

Kết OR03-A “Cửa lò sáng đèn”: có quy tắc nguồn hàng, người bị giấu đã thoát và lò kiếm sống được; LOC01 có nguồn thịt kiểm chứng, kiếp sau nhận lại con dao và lời truyền nghề. OR03-B “Dao không còn giá”: người chơi giải tán lò, lập bếp hoạt động qua mùa đói; người lao động đổi sinh kế, kiếp sau còn bát gỗ có tên người ăn đầu. OR03-C “Người mua tên”: giữ được đường dây và ít nhất một khế cưỡng ép còn hiệu lực; tạo mạng buôn dấu, kiếp sau có người truy khế và cơ hội mua lại chính tên ấy, không xóa nghiệp bằng đổi chủ.

**OR04 — Thư sinh nghèo: Bài thi viết bằng tro.** Quan hệ: NP03 và NP23; bí mật: đáp án đúng về thuế bị loại để che thiếu hụt kho.

- N1: tìm việc chép thuê đủ trả giấy và tiền ở, ghi người đã giúp mình học chữ.
- N2: dự khảo hoặc khảo sát đề án trị thủy ngoài kỳ thi; thấy bản án sửa tên dân thành nợ thuế.
- N3: lấy bản gốc tại LOC02 hoặc bản sao LOC12, xác nhận dấu quan và người ép sửa.
- N4: chọn đưa chứng ra triều, công bố ngoài dân, bán cho phe tranh quyền hoặc tự dùng để lên chức.
- N5: xử hậu quả với NP03: bảo vệ, tố cáo, thỏa hiệp hoặc cùng rời quan trường.

Kết OR04-A “Quan giữ sổ thật”: có chức và ít nhất một vụ sổ sai được sửa cho người chịu; thuế được kiểm lại, kiếp sau gặp hồ sơ và người mang ơn việc sửa. OR04-B “Chữ ngoài cửa quan”: lưu bản thật ở hai nơi độc lập và có người học tiếp; sách bị cấm hoặc được truyền tùy chính quyền, kiếp sau một học trò nhận ra bút tích. OR04-C “Ấn son trên trang trắng”: lên chức bằng hồ sơ đã chủ động bóp méo và giữ được chức qua kỳ xét; phe hưởng lợi mạnh lên, kiếp sau còn gia tộc hoặc oan án do chữ ấy gây ra.

**OR05 — Tiểu khất cái: Những người không có trong sổ.** Quan hệ: NP07 từng cho ăn, NP18 nhận người làm sân; bí mật: trẻ vô hộ bị bán thành lao dịch mà không có hồ sơ tử.

- N1: gom dấu nhận biết các trẻ cùng trú, xác định ai mất trong lần quan quét chợ.
- N2: theo chiếc xe ra LOC11 hoặc tìm sổ thuê người tại LOC03; nhận ra người giữ sổ biết trẻ chưa chết.
- N3: chọn chuộc, giải cứu, gia nhập hoặc bán tin; mỗi trẻ có kết cục sống, bị chuyển, mất tích hoặc chết.
- N4: lập nơi trú, bang ăn xin hoặc mạng trộm với cách phân đồ ăn được người chơi quyết định.
- N5: giải quyết quyền hộ tịch: đăng danh, giữ bí mật để trốn truy hoặc mua quan bảo trợ.

Kết OR05-A “Nhà có cửa”: có chỗ trú bền và ít nhất một người được trả thân phận; LOC02 có nhóm dân mới, kiếp sau gặp cuốn sổ tên tự chọn. OR05-B “Chúa của ngõ tối”: kiểm soát mạng tin và phân chia lợi ích qua một chu kỳ; bang tồn tại theo luật đã đặt, kiếp sau có ám hiệu nhận người và thù của kẻ bị ép. OR05-C “Một mình ra khỏi chợ”: có giấy đi hoặc đường thoát và chủ động rời nhóm; người còn lại tự chọn người dẫn mới, kiếp sau gặp tên mình bị gọi khác tùy điều đã để lại.

**OR06 — Con thứ thế gia: Chỗ ngồi không dành cho mình.** Quan hệ: NP03 giữ gia phả, NP05 giữ khoản nợ; bí mật: quyền trưởng thứ được sửa sau một cuộc trao đổi lợi ích.

- N1: đọc bản gia phả cùng bản ghi sinh; xác định phần được cấp và phần bị lấy.
- N2: tìm giao dịch đổi người thừa kế tại LOC03, nhận diện người trong nhà đã ký.
- N3: làm một việc độc lập bằng nghề tự chọn để có tiền, lực hoặc mạng quan hệ, không nhận quyền sẵn từ họ.
- N4: chọn tranh gia chủ, tách hộ, lập liên minh với người trưởng hoặc phá gia tộc; hậu quả ghi cho gia nhân.
- N5: phân quyền tài sản và sổ người lệ thuộc trước khi nhận vị thế cuối.

Kết OR06-A “Gia chủ không đầu bàn”: có quyền gia chủ hợp lệ và quy tắc phân quyền thực thi; gia tộc thay luật, kiếp sau gặp người được luật mới bảo vệ. OR06-B “Họ mới bên đường”: tách hộ, có sinh kế và một quan hệ tự nguyện còn giữ; tạo nhánh họ độc lập, kiếp sau có bàn thờ không ghi thứ bậc cũ. OR06-C “Tro của đại trạch”: gia tộc bị giải thể do hành động của người chơi và tài sản đã phân hoặc bị đoạt rõ chủ; phả hệ đứt nhánh, kiếp sau gặp người sống sót hoặc dấu phế trạch, không tự dựng lại nhà cũ.

**OR07 — Đứa trẻ bị bỏ ở miếu: Tên trên lưng tượng.** Quan hệ: NP07 nuôi, NP08 truy phả; bí mật: đứa trẻ bị xóa khỏi danh sách người tế, không nhất thiết là huyết mạch quý.

- N1: nhận mảnh áo và cách đọc dấu khâu từ NP07 hoặc đồ để lại.
- N2: tìm tên tương ứng trên bia LOC04 và danh sách trú tại LOC12.
- N3: đối chiếu hồ sơ FA03, phát hiện ai được cứu bằng việc đổi tên mình.
- N4: đối diện người còn sống hoặc di thư của cha mẹ, quyết định nhận, từ hoặc công khai thân phận.
- N5: chọn giữ miếu, truy người xóa danh hoặc xóa cơ chế hiến tên.

Kết OR07-A “Một tên tự đặt”: ghi danh tự chọn trước nhân chứng và không còn khế tên cưỡng ép; LOC04 trở thành nơi ghi tên tự nguyện, kiếp sau có lời khắc ấy. OR07-B “Người giữ miếu”: duy trì nơi trú qua một biến động và lưu được bia tên; người bị bỏ lại có chỗ ở, kiếp sau gặp một người từng được miếu nhận. OR07-C “Tên trả bằng tên”: giành quyền sổ hiến và dùng nó buộc người khác đổi tên; cơ chế tiếp tục dưới chủ mới, kiếp sau có người mang món nợ bị tráo.

**OR08 — Con nhà thợ rèn: Lửa trong lòng đất.** Quan hệ: NP21 và NP22; bí mật: lò nợ vì hợp đồng sửa phôi để độc quyền mua rẻ.

- N1: hoàn tất hoặc nhờ hoàn tất một đơn sửa dụng cụ, xác lập sinh kế gia đình.
- N2: kiểm phôi lỗi và hợp đồng LOC03, chứng minh phôi bị trộn thay vì thợ làm sai.
- N3: xuống mỏ LOC11, tìm công nhân bị buộc trả nợ cho cùng lô hàng.
- N4: đàm phán công hội, chiếm lò, trả nợ hoặc chuyển nghề cho thợ; phải xử tiền công đang thiếu.
- N5: chọn sản phẩm cuối và người được học nghề sau mình.

Kết OR08-A “Lò có người tiếp”: lò thuộc quyền thợ hoặc hợp đồng minh bạch, trả đủ công đã cam kết và có học trò; LOC11 giữ xưởng sống, kiếp sau nhận vết búa trên phôi lưu. OR08-B “Đúc kiếm cho người thắng”: một phe lớn ký bảo trợ và nhận lô vũ khí hoàn tất; phe ấy đổi tương quan quân lực, kiếp sau gặp quân hoặc nạn nhân của vũ khí. OR08-C “Tắt lửa mở đường”: đóng lò an toàn, người lệ thuộc có nơi đi và hồ sơ nợ đã xử; mỏ ngưng bóc sức, kiếp sau còn nền lò và con đường thợ di cư.

**OR09 — Tiểu đạo đồng: Chuông gọi ai về.** Quan hệ: NP23, NP07; bí mật: tiếng chuông ghi tên người chết, nhưng có tên vẫn đang sống.

- N1: làm việc quét tháp và chép bản chuông, phát hiện tên mình hoặc thân nhân trong sổ tro.
- N2: đi LOC14 tìm vật chứng người ấy chưa chết vào ngày được ghi.
- N3: so dấu tại LOC05, xác nhận chuông là một nút thu ký ức của hệ trận.
- N4: chọn công khai, chỉnh cách nhận ký ức hoặc dùng chuông gọi người đã mất; không hồi sinh miễn phí.
- N5: quyết định để chuông im, chỉ nhận lời tự nguyện hoặc nối lại mạch cũ.

Kết OR09-A “Chuông chỉ gọi tên thật”: hủy ghi danh giả và chuông chỉ nhận chứng ngôn tự nguyện; LOC12 thành thư khố sống, kiếp sau nghe tên người mình đã cứu khỏi sổ tử. OR09-B “Người nghe cuối cùng”: ngắt chuông và lưu ký ức còn lại vào vật dẫn không sống; thế lực mất một nguồn tin, kiếp sau tìm được vật dẫn im lặng. OR09-C “Mượn giọng người chết”: dùng chuông triệu ký ức để điều khiển người khác và nắm quyền nút; có mạng sùng bái hoặc sợ hãi, kiếp sau một tiếng gọi quay lại bằng tên đã bị lợi dụng.

**OR10 — Cựu binh biên ải: Người về sau lệnh chết.** Quan hệ: NP25, NP26 và NP02; bí mật: đơn vị bị bỏ vì lệnh giả che kho đã bán.

- N1: nhận phần quân công hoặc giấy từ chối, xác định đồng đội còn sống.
- N2: đối chiếu lệnh rút LOC13 với con dấu NP28 giữ ở LOC14.
- N3: tìm kho lương đã chuyển LOC03, xác định người hưởng lợi và người chỉ làm theo lệnh.
- N4: chọn điều tra trong quân, đưa ra dân, khởi binh hoặc bán chứng; bảo đảm nơi cho người đi theo.
- N5: quyết định giữ biên, rời quân hoặc dùng quân lấy triều; chiến sự diễn ra theo quân lương thật.

Kết OR10-A “Đưa đủ tên về”: trả được danh tính cho đơn vị và những người theo mình có nơi sống; LOC14 thành trại định cư, kiếp sau có danh sách không thiếu tên. OR10-B “Cờ trên cổng cũ”: nắm bộ chỉ huy có lương và giữ hoặc chiếm được LOC13; lập lực lượng tự chủ, kiếp sau gặp lời thề quân và trách nhiệm kế thừa. OR10-C “Lệnh cuối gửi về kinh”: lệnh giả được công bố hoặc dùng làm căn cứ đảo chính và chính quyền chịu thay đổi; hệ bổ nhiệm quân bị sửa, kiếp sau có hồ sơ xét xử gồm cả tội của phe thắng.

**OR11 — Con nhà buôn: Một chữ tín có giá bao nhiêu.** Quan hệ: NP05, NP06; bí mật: thương hiệu nhà mình bảo lãnh cho lô người cầm cố.

- N1: kiểm hàng và nợ thừa kế, xác định ai thực sự ký bảo lãnh.
- N2: theo chuyến LOC03–LOC11 hoặc LOC09 để tìm hàng mất, phát hiện người bị ghi là tài sản.
- N3: chọn trả nợ, phản khế, bán quyền hay nhận đường dây; ghi người được giải và người bị chuyển tiếp.
- N4: mở tuyến vận độc lập hoặc giành ghế trong FA02, phải duy trì được một chuyến giao có thật.
- N5: ban hành quy tắc hợp đồng và xử một vụ chính quy tắc ấy làm mình chịu thiệt.

Kết OR11-A “Hội quán mở cửa”: có tuyến tự chủ và hợp đồng không cầm người, đã hoàn tất một vụ bồi thường; LOC03 có đối thủ cạnh tranh, kiếp sau gặp giấy bảo lãnh còn được tôn trọng. OR11-B “Người định giá thiên hạ”: nắm quyền phân phối liên khu và thực thi được một lệnh cấm vận; FA02 đổi chủ hoặc hình thành hội mới, kiếp sau có vùng nhớ giá đói do mình đặt. OR11-C “Bỏ sổ xuống sông”: kết toán tài sản và tự giải thể thương hiệu; chủ nợ, người lao động đều có trạng thái rõ, kiếp sau gặp người từng nhận phần chia hoặc món nợ chưa được nhận.

**OR12 — Con nhà chài lưới: Những người dưới mặt nước.** Quan hệ: NP17, NP16; bí mật: vùng cá chết do chất thải lò và một khế đánh bắt vượt mùa.

- N1: kiểm lưới, xác định đợt mất cá không trùng mùa sinh sản tự nhiên.
- N2: lấy mẫu từ LOC09 và nhánh nước LOC11, truy người ra lệnh xả.
- N3: thương lượng với FA08 và FA06, chọn sửa nguồn độc, dời dân hoặc giữ bí mật nhận tiền.
- N4: giải quyết xác người mắc lưới và giấy phép bến để người chết không bị biến thành khoản phí vô danh.
- N5: đặt luật mùa nước, quyền bến hoặc quyết định bỏ nghề đi đường khác.

Kết OR12-A “Mùa cá trở lại”: nguồn độc đã dừng và bãi giống được giữ qua một kỳ; LOC09 có luồng cá hồi phục, kiếp sau thấy mốc cấm chài mang ký hiệu nhà mình. OR12-B “Chủ bến nước đen”: kiểm soát giấy phép và thu được phí qua một mùa dù nguồn độc còn; bến tập trung quyền, kiếp sau gặp gia đình bị đẩy khỏi luồng. OR12-C “Thuyền không quay đầu”: đưa nhóm nhà mình qua tuyến định cư mới và kết toán quyền thuyền; bến cũ tự chọn người dẫn, kiếp sau tìm được mảnh lưới trên một mái nhà xa.

**OR13 — Dược đồng: Phương thuốc giữ lại một người.** Quan hệ: NP19, NP20; bí mật: dịch bị kéo dài do độc trong nước và thuốc giảm chứng bán theo độc quyền.

- N1: phụ một ca bệnh, ghi triệu chứng và ai đã trả phí.
- N2: so mẫu LOC10–LOC11, chứng minh nguồn độc hoặc bệnh, không suy đoán toàn bộ từ một ca.
- N3: lấy đan phương, dược phàm thay thế hoặc huyết phương; nguồn nguyên liệu và người hiến được ghi riêng.
- N4: chọn phân phối theo nhu cầu, giá, quan hệ hoặc quân lệnh; số người tiếp cận thuốc thay đổi thật.
- N5: xử độc quyền: công bố, cấp phép, giấu hoặc hủy phương nguy hiểm.

Kết OR13-A “Bệnh xá qua đêm”: có điều trị hiệu lực, nguồn bệnh được kiểm soát và cơ chế duy trì bệnh xá; LOC10 mở dịch vụ bền, kiếp sau gặp người được chữa hoặc học trò y. OR13-B “Một phương đổi một thành”: nắm độc quyền và được một chính quyền bảo trợ; quyền y dược thành công cụ chính trị, kiếp sau gặp điều khoản ai được thuốc. OR13-C “Thuốc không giữ được người”: đã xác nhận giới hạn điều trị, chăm sóc ca tới kết thúc và lưu hồ sơ thật thay vì bán lời hứa; gia đình có lời từ biệt, kiếp sau tìm được trang bệnh án và quyền học từ thất bại ấy.

**OR14 — Mang huyết mạch ma tộc: Máu không chọn chủ.** Quan hệ: NP13, NP14, NP08; bí mật: người giữ huyết phả chỉnh độ thuần để hợp thức hóa hiến tế người yếu thế.

- N1: nhận biểu hiện huyết mạch và cách kiềm chế sinh tồn, không cấp linh căn nếu vốn vô căn.
- N2: xác minh tên mình qua LOC07 và phả phụ LOC04; tìm người đã sửa dòng ghi.
- N3: đối diện quyền kế vị và điều kiện cống huyết, chọn tự hiến, tìm thay thế, ép người hoặc từ chối.
- N4: giải quyết phe muốn săn và phe muốn tự trị bằng liên minh, phán quyết, chiến tranh hoặc rời cốc.
- N5: đặt quan hệ giữa huyết hệ với thế giới: hiệp ước, thống trị hoặc đoạn mạch.

Kết OR14-A “Huyết ước không xiềng”: có cơ chế cống hiến tự nguyện và hiệp ước được ít nhất một phe ngoài cốc thực thi; FA05 có đường sống mới, kiếp sau còn bản khế ghi quyền rút lui. OR14-B “Ma chủ của người còn lại”: nắm huyết ấn, được phục tùng bằng lực hoặc lợi và giữ được cốc qua một biến động; quyền lực tồn tại cùng nạn nhân cụ thể, kiếp sau người giữ phả kể cả công lẫn tội. OR14-C “Cắt dòng dưới trăng”: hủy quyền cưỡng ép của huyết phả và chấp nhận mất đặc quyền huyết hệ; dòng họ phân tán nhưng cá thể còn, kiếp sau gặp một người được thoát khỏi tên tộc.

**OR15 — Con nhà gánh hát: Vở diễn không hạ màn.** Quan hệ: NP18, NP03; bí mật: vở bị cấm ghi lại vụ bán lương khiến biên quân chết.

- N1: hoàn tất một buổi diễn hoặc công việc hậu đài, xác lập người trong đoàn mình muốn giữ.
- N2: khôi phục trang kịch bị xé từ LOC09 và lời chứng LOC14, tách tình tiết hư cấu khỏi tên người thật.
- N3: tìm bảo trợ, sân tạm hoặc mạng diễn lưu động; người bảo trợ yêu cầu sửa một đoạn có lợi cho họ.
- N4: chọn diễn nguyên, đổi hình tượng, bán kịch hay dùng buổi diễn làm mồi ám sát; khán giả và đoàn có vị trí thật.
- N5: quyết định đoàn tồn tại bằng nghệ thuật, tuyên truyền, gián điệp hoặc giải tán có chia tài sản.

Kết OR15-A “Khán giả nhớ tên”: vở đã được công diễn và bản thật còn ở hai người độc lập; chứng ngôn đi vào dân gian, kiếp sau một câu hát dẫn tới vụ án. OR15-B “Sân khấu dưới ấn”: có bảo trợ và đã sửa nội dung theo quyền lực để nhận quyền diễn độc quyền; đoàn giàu lên và lời nói bị buộc, kiếp sau gặp bản kiểm duyệt với bút tích mình. OR15-C “Đêm diễn cuối”: chủ động chốt buổi cuối, chia tài sản và ghi nơi đi của người trong đoàn; đoàn tan có hệ quả riêng, kiếp sau gặp một đạo cụ còn được người cũ giữ.

##### Ba mươi tuyến biến thể có đủ năm nút và ba kết riêng

Các tuyến này dùng chung biến cố lớn với mười lăm đại tuyến nhưng không dùng chung người bị tổn thương, mục đích hay giá phải trả. Người chơi luôn có quyền bỏ truyện; khi ấy thế giới vẫn phân giải tranh chấp theo đồng hồ và các phe đang nắm tài nguyên.

**OR16 — Con nhà vá lưới; nhánh của chuyện mùa cá.** Món thừa kế là kỹ thuật thắt mắt lưới và một khoản tiền công chưa trả.

N1: kiểm lưới sửa cho NP17 để tìm dấu sợi bị thay. N2: theo cuộn sợi tới kho LOC03, xác nhận người bán biết lưới sẽ rách. N3: đối chiếu đơn bồi thường với sổ cá LOC09 để phân biệt bão thật và hàng giả. N4: chọn đòi công, mua lại xưởng sợi hoặc sửa miễn phí bằng quỹ chung, ghi ai góp quỹ. N5: lập chuẩn mắt lưới và chọn giữ hay bán bí quyết cho FA06.

Kết A “Mắt lưới giữ giống”: chuẩn được ba thuyền dùng và tiền công được xử; bãi cá có bảo vệ, kiếp sau gặp nút thắt riêng. Kết B “Cả bến mua một sợi”: nắm kho sợi và hợp đồng độc quyền bến; giá lưới theo mình, kiếp sau còn sổ nợ thợ chài. Kết C “Đứt chỉ rời bến”: chuyển công cụ và người phụ thuộc tới nơi ở mới; nghề cũ mất thợ giỏi, kiếp sau có lưới gia truyền xa quê.

**OR17 — Trẻ giữ ngựa trạm; nhánh của lệnh chết biên quân.** Quan hệ mở đầu là NP26, người tin tiếng vó hơn con dấu.

N1: chữa hoặc thay ngựa bị quất tới kiệt ở LOC13. N2: tìm hai túi thư có giờ giao trái nhau, xác định chuyến bị cố tình chậm. N3: nối tuyến trạm tới lệnh rút NP25 nhận, bằng người đưa thư hoặc xác ngựa có dấu. N4: giao bản thật, bán bản thật hoặc đổi thư, phải tự chọn người mang và bảo vệ họ. N5: tổ chức trạm có người thay ngựa, đóng trạm hoặc lập đường tin riêng.

Kết A “Thư tới trước tuyết”: bản thật đến bộ chỉ huy và trạm đủ ngựa khỏe; quân có quyền rút đúng, kiếp sau gặp chuông ngựa ghi tên. Kết B “Người bán một canh giờ”: đã bán độ trễ và giữ quyền trạm; phe mua được lợi quân sự, kiếp sau có người tìm thư muộn. Kết C “Vó ngựa không quân tịch”: đưa người và ngựa khỏi quân dịch với sinh kế mới; hình thành tuyến dân sự, kiếp sau gặp trạm lưu vong.

**OR18 — Người chép sổ thóc; nhánh của mùa đói và bài thi.** Vết thương là đã từng chép một con số theo lệnh mà không hiểu nó lấy cơm của ai.

N1: đối chiếu số bao mình ghi với vết đóng kho LOC01. N2: tìm hộ bị ghi đã nhận cứu tế nhưng không được phát. N3: chứng minh đường chuyển thóc tới LOC03 bằng cân, chứng từ hoặc lời phu. N4: sửa sổ có nhân chứng, giấu sai số để mua lương hoặc bán chỗ trống cho quan. N5: kiểm kê sau mùa đói và chọn ai giữ chìa khóa kho.

Kết A “Kho không thiếu tên”: sổ khớp hàng và hộ bị ghi giả được trả phần; kho có kiểm độc lập, kiếp sau có bản sổ đối chiếu. Kết B “Chìa khóa mùa đói”: chi phối kho và dùng ghi sổ để phân phần ưu tiên; phe của mình giữ lương, kiếp sau gặp gia đình bị gạch tên. Kết C “Trang sổ gửi người sau”: lưu bản thật hai nơi rồi rời chức; vụ án vẫn có chứng, kiếp sau gặp người nối việc kiểm kê.

**OR19 — Con nhà hầm than; nhánh của lửa lò.** Mùi khói là ký ức gia đình, món nợ là những thân thể ho không dứt.

N1: tìm người mất trong một hầm than sập. N2: đo đường gió và đối sổ suất đốt, phát hiện hợp đồng ép tăng mẻ. N3: đem mẫu than và hồ sơ bệnh tới NP19 để nối trách nhiệm FA08 với nhà mua than. N4: chọn gia cố, chuyển công nghệ đốt, đốt kho chủ hoặc giành hợp đồng. N5: đặt giới hạn ca và giá bán, hoặc đóng hầm sau khi xử nơi ở thợ.

Kết A “Khói đi khỏi ngực”: hầm đạt thông gió và thợ bệnh có điều trị; LOC11 đổi quy trình, kiếp sau có ống gió khắc dấu nhà. Kết B “Lửa mua bằng phổi”: nắm hợp đồng và vẫn ép vượt suất; lò nhận nhiều than rẻ, kiếp sau gặp sổ bệnh người đốt. Kết C “Rừng mọc trên miệng hầm”: đóng hầm an toàn và chuyển thợ tới sinh kế khác; có vùng tái sinh rừng, kiếp sau gặp bia thợ đã mất.

**OR20 — Đứa trẻ nhặt ở bậc cửa; nhánh của tên bị xóa.** Người nuôi không biết mình nhận ai, và có quyền được người chơi coi là gia đình thật.

N1: xác định cánh cửa và người đầu tiên nghe tiếng khóc qua lời hàng xóm. N2: đọc nhãn thuốc trong tã với NP19, biết có người từng cố cứu thay vì bỏ giết. N3: đối hộ tịch LOC02 với bia LOC04 để tìm thân phận bị đổi. N4: quyết định gặp người gửi, giữ kín với họ nuôi hoặc công bố cả hai quan hệ. N5: xử quyền tài sản hay món nợ đi kèm tên gốc mà không tự xóa người nuôi.

Kết A “Hai mái nhà”: có nhận biết từ hai bên và thỏa thuận quan hệ tự nguyện; họ nuôi còn vị thế, kiếp sau gặp hai di vật cùng hộp. Kết B “Tên cũ nhận gia tài”: nhận quyền tên gốc và hoàn tất điều kiện thừa kế; tài sản đổi chủ, kiếp sau có lời người bị mất phần. Kết C “Cửa mở cho trẻ khác”: từ quyền ép buộc tên gốc và duy trì nơi nhận trẻ qua một biến động; có nhà trú, kiếp sau gặp người lớn từ bậc cửa ấy.

**OR21 — Kẻ từng vác bia; nhánh của tên trận vong.** Người chơi nhớ sức nặng một bia đá có tên bị đục đi giữa đường.

N1: tìm mảnh bia từ chuyến chở cuối ở LOC14. N2: đối lệnh khắc NP24 giữ với danh sách quân NP25 để lộ người bị loại. N3: tìm lý do loại tên qua gia quyến, lệnh quan hoặc ký ức trên đá. N4: dựng lại bia, bán tên vào bia hoặc phá toàn bộ bia chiến công giả. N5: lập xưởng khắc có chuẩn chứng hoặc chọn từ nghề, giao mảnh đá cho người tin.

Kết A “Bia có tên thật”: tên sai được sửa và người nhà nhận chứng; LOC14 có mốc tưởng niệm, kiếp sau đọc được nét đục mình giữ. Kết B “Một hàng chữ một giá”: kiểm xưởng và từng nhận tiền khắc danh giả; ký ức công cộng lệch đi, kiếp sau gặp người không đủ tiền có bia. Kết C “Đá để người sống bước”: phá bia giả, công bố danh sách và dùng đá làm đường hoặc nhà; biểu tượng chiến thắng mất, kiếp sau còn chữ dưới chân cầu.

**OR22 — Con người dệt chiếu; nhánh của những người ngoài sổ.** Tấm chiếu gia đình dệt đã phủ cả người sống ngủ đường lẫn người chết không thân nhân.

N1: hoàn tất một đơn chiếu chôn và nhận ra người mua giấu số người chết. N2: theo lô cói LOC09 để tìm nhóm lao dịch mất tên. N3: nối chúng với sổ tuyển trẻ ở LOC11 hoặc hồ sơ mua người LOC03. N4: dùng mạng người dệt để giấu người, giao nộp lấy thưởng hoặc tổ chức quyền tự bán sức có rút lui. N5: chọn công xưởng, hợp tác hộ hay gánh chiếu lưu động, ghi nơi của thợ trẻ.

Kết A “Chiếu đủ chỗ nằm”: có quỹ hộ và người trốn được tự chọn nơi sống; mạng trú ẩn tồn tại, kiếp sau gặp hoa văn nhận người. Kết B “Xưởng không tắt đèn”: nắm đơn lớn và giữ hợp đồng lao động không được rút; hàng nhiều giá thấp, kiếp sau gặp bàn tay bị buộc vào khung. Kết C “Chiếu cuộn theo đường”: các thợ đi cùng có phần góp và quyền rời gánh; hình thành đoàn nghề, kiếp sau có dấu hoa văn ở trấn khác.

**OR23 — Đồng tử đun trà; nhánh của chuông và lời nói kín.** Người lớn từng ngừng nói khi thấy ấm nước trong tay mình.

N1: phân biệt một lần đổi trà tại LOC12, giữ được lá hoặc ấm làm chứng. N2: tìm người uống trà mất trí và thời điểm tên họ xuất hiện trên chuông. N3: đối kho dược LOC10, chứng minh trà là vật dẫn ký ức chứ không chỉ độc thông thường. N4: chọn giải tạp, trao ấm cho FA03 hoặc giữ cách pha để lấy lời người khác. N5: mở trà thất tự nguyện, đóng đường trà hoặc phục vụ riêng người nắm quyền.

Kết A “Ấm trà trả lời”: người mất trí được giải hoặc hồ sơ giới hạn được lưu, quy tắc tự nguyện được thực thi; LOC12 đổi tiếp khách, kiếp sau gặp ấm có vết nứt. Kết B “Tai sau bình phong”: giữ công thức và đã dùng lấy bí mật không đồng thuận; có mạng tin ngầm, kiếp sau gặp lời khai bị mất của một người. Kết C “Nước sôi không giữ khách”: hủy vật dẫn, công bố nguyên nhân và chuyển sang sinh kế thường; một nút thu ký ức mất, kiếp sau có bài trà không còn tên người.

**OR24 — Người giữ miếu nhỏ; nhánh của tên trên tượng.** Miếu là nơi người nghèo cầu mà không có tiền mua lễ.

N1: sửa mái LOC04 và lập sổ ai gửi đồ thờ. N2: phát hiện lễ vật không được đặt để cầu mà để buộc tên một người. N3: so ấn trên tượng với trận LOC05 và tìm người còn sống bị buộc. N4: tháo ấn, đổi người chịu ấn hoặc giữ ấn làm nguồn thu, ghi người đã biết và đồng ý. N5: đặt lệ miếu về nơi trú, lễ vật, tên và người quản sau mình.

Kết A “Miếu không bán tên”: ấn cưỡng ép đã gỡ và có lệ công khai, miếu qua một mùa có người giữ; hình thành nơi trú, kiếp sau gặp người từng ngủ dưới mái. Kết B “Hương khói có chủ”: nắm ấn và có dòng người nộp lễ để được miễn; miếu thành quyền lực, kiếp sau có đơn cầu bị từ. Kết C “Tượng nằm ngoài mưa”: phá ấn cùng tượng và chuyển nơi trú sang nhà người; tín ngưỡng mất biểu tượng, kiếp sau còn nền miếu với tên tự khắc.

**OR25 — Kẻ bỏ trường thi; nhánh của bài thi tro.** Bỏ thi có thể do nghèo, bất mãn hoặc hổ thẹn; không mặc định là yếu kém.

N1: nhận lại bài bị bỏ và chứng minh phần trị thủy mình biết bằng khảo sát LOC01. N2: gặp người dùng bài ấy để đỗ, xác định họ tự trộm hay bị ép nhận. N3: lấy bản quyển có nét sửa tại LOC02, nối chuyện trộm bài với sổ thuế. N4: đòi công danh, đổi lấy quyền làm việc thật hoặc bán quyền im lặng. N5: nhận chức, dạy ngoài quan hoặc lập mạng làm giấy thi giả.

Kết A “Không bằng vẫn trị được nước”: công trình hoạt động và dân tự nhận trách nhiệm vận hành; địa phương có việc thật, kiếp sau thấy bia không chức danh. Kết B “Đỗ vào chỗ trống”: được bổ nhiệm và vụ bài thi được phân xử công khai; khoa cử đổi hồ sơ, kiếp sau gặp quyển thi ghi đúng tên. Kết C “Trường thi của người mua”: có mạng bán danh và đã giao một suất thành công; quan trường nhận người mới bằng tiền, kiếp sau gặp hậu quả một người mình đưa lên.

**OR26 — Con nhà gánh muối; nhánh của chữ tín.** Nợ nhà được tính bằng tải muối, còn mồ hôi không được ghi vào hợp đồng.

N1: kiểm tải và phí đường tại LOC03, phát hiện cân thuế nặng hơn cân bán. N2: đi tuyến LOC03–LOC11, ghi trạm nào thu hai lần và ai bảo kê. N3: đối giấy phép với nhu cầu quân LOC13 để lộ muối cứu quân bị ép bán lại. N4: xin sửa phép, mở đường lậu, đầu cơ hoặc chia tải cho các hộ. N5: chốt giá và quyền qua đường cho đoàn sau mình.

Kết A “Muối tới bếp”: cân được chuẩn và đoàn được chia quyền tuyến; giá dân có thể tiếp cận, kiếp sau gặp quả cân khắc chuẩn. Kết B “Vua đường mặn”: kiểm soát ít nhất hai chặng và thực thi được giá độc quyền; dòng muối đổi chủ, kiếp sau gặp người nhớ vị đói. Kết C “Gánh đặt xuống thềm”: trả hoặc phân xử nợ tải và gia đình có sinh kế khác; tuyến mất một gánh, kiếp sau còn đòn gánh trong nhà mới.

**OR27 — Người học khắc khuôn; nhánh của lò và con dấu.** Một nét khắc sai đã khiến người khác bị coi là làm tiền giả.

N1: nhận khuôn bị buộc tội và đối vết dao của NP22. N2: tìm lô đúc tại LOC11, xác định có khuôn thứ hai do người có quyền đặt. N3: đem mẫu tới sạp bạc LOC03 để truy dòng tiền tới hồ sơ LOC02. N4: chứng minh nghề, trao khuôn cho quan hoặc dùng khuôn tạo tiền nuôi phe mình. N5: quyết định giữ quyền khuôn, phá khuôn hoặc lập chuẩn thợ cùng kiểm.

Kết A “Một nét khắc có người chứng”: vụ giả được xử và khuôn có kiểm đồng nghiệp; nghề có chuẩn mới, kiếp sau thấy mẫu thử giữ nét thật. Kết B “Ấn tiền dưới lòng bàn tay”: nắm khuôn và đã đưa lô giả vào lưu thông; vốn phe tăng cùng bất ổn giá, kiếp sau gặp đồng bạc mang vết lỗi. Kết C “Khuôn vỡ mà tay còn”: hủy khuôn nguy hiểm và lập nghề không đúc tiền; mạng tiền giả mất công cụ, kiếp sau gặp món khắc bằng tay ấy.

**OR28 — Kẻ chèo đò ban đêm; nhánh của người dưới nước.** Người chơi từng nhận tiền để không hỏi khách tên gì.

N1: tìm dấu của một khách không bao giờ xuống bến trên thuyền LOC09. N2: đối lịch nước với chuyến thuyền và xác mắc lưới, xác nhận một vụ chuyển người. N3: tìm hợp đồng LOC03 hoặc lời người sống sót, phân biệt chạy nạn với bắt cóc. N4: chọn cứu chuyến kế, giao khách, làm người dẫn hoặc đóng tuyến ngầm. N5: ghi tên người chết và quy tắc nhận khách sau này.

Kết A “Đò đưa người có đường về”: cứu được người còn sống và họ được tự chọn bờ; có tuyến thoát tự nguyện, kiếp sau gặp mật hiệu xin đò. Kết B “Người giữ bờ tối”: giữ tuyến và một lần giao người biết họ bị cưỡng ép; phe mua nắm người, kiếp sau có thân nhân tìm chiếc thuyền. Kết C “Đèn tắt ở bến cũ”: công bố đường ngầm và đóng tuyến sau khi xử khách đang chở; mạng chuyển người phải đổi lối, kiếp sau còn cọc bến khắc tên.

**OR29 — Con nhà bốc thuốc; nhánh của phương giữ người.** Sai số ở cân thuốc có thể cứu một người hay làm họ không qua đêm.

N1: đối cân nhà với cân FA07 và tìm đơn thuốc đã bị pha loãng. N2: theo lô dược từ LOC10 tới LOC02, xác nhận hụt vì vận chuyển hay chủ động bán riêng. N3: tìm bệnh nhân đã dùng lô ấy và ghi đủ kết quả, kể cả người khỏi tự nhiên. N4: chọn bồi thường, tố hàng giả, tự pha theo giá rẻ hoặc giấu sai số. N5: lập chuẩn kiểm lô và người chịu trách nhiệm nhận thuốc.

Kết A “Cân đứng giữa hai tay”: chuẩn được kiểm độc lập và lô sai được thu hồi hoặc thông báo; bệnh xá tin được nguồn, kiếp sau có quả cân dược. Kết B “Nhẹ thuốc nặng bạc”: chủ động bán lô biết sai và giữ mạng tiêu thụ; gia sản tăng, kiếp sau gặp bệnh án mang nhãn nhà. Kết C “Bán hết để trả một đơn”: kết toán bồi thường và dừng bán thuốc khi chưa đủ khả năng; khách đổi nơi chữa, kiếp sau còn đơn nợ đã gạch.

**OR30 — Đứa trẻ lớn sau bếp; nhánh của con dao và người mất tên.** Bếp từng là nhà, cũng là nơi nghe chuyện người ngồi bàn không muốn lưu.

N1: nhận lại thẻ bếp và khoản công từ chủ quán LOC02. N2: tìm người làm bếp biến mất sau bữa tiếp thương hội. N3: đối thực đơn với lô thịt OR03 liên quan, khám kho hoặc dùng lời phu để phát hiện khế cầm người. N4: giấu người trong xe bếp, bán tin, trả khế hoặc nhận quyền quản đám người. N5: chọn bếp chung, quán riêng hoặc phục vụ quyền lực, ghi người còn ở lại.

Kết A “Bếp không khóa cửa”: người làm có quyền rời và bếp đủ sinh kế qua mùa; có nơi làm thuê tự nguyện, kiếp sau gặp món ăn truyền tay. Kết B “Bàn tiệc có người nợ”: giữ quán và khế cưỡng ép lao động còn hiệu lực; quyền lực bám bữa ăn, kiếp sau có người tìm thẻ bếp để đòi tên. Kết C “Bữa cuối chia đều”: giải thể bếp, chia công và dẫn người đang lệ thuộc tới nơi mới; quán đổi chủ, kiếp sau gặp nồi dùng trong chuyến đi.

**OR31 — Thợ cạo vôi tường; nhánh của gia phả và vở bị cấm.** Người chơi nhìn thấy một cái tên trước khi lớp vôi mới phủ kín.

N1: bóc mẫu tường LOC02, lưu nét chữ dưới lớp sơn. N2: truy người trả tiền xóa tên tới gia phả và sổ công trình. N3: tìm lời kể của NP18 hoặc mộ LOC14 để biết người ấy bị xóa vì tội thật hay tranh quyền. N4: trả chữ lên tường, bán kín bản sao hoặc xóa tiếp theo hợp đồng. N5: quyết định làm công trình tưởng niệm, chuyên nghề che dấu hoặc rời nghề sau khi lưu chứng.

Kết A “Bức tường biết nói”: chữ thật được đặt lại và có nguồn chứng; phố có ký ức công khai, kiếp sau đọc được vết lớp vôi. Kết B “Tay trắng không dấu”: đã xóa chứng biết là thật và giữ mạng hợp đồng; phe thuê được an toàn, kiếp sau gặp người tìm một bức tường trống. Kết C “Mảnh vữa mang đi”: bản chứng lưu hai nơi và gia đình nghề có sinh kế mới; vụ việc vẫn tra được, kiếp sau có mảnh chữ trong nhà khác.

**OR32 — Người bồi giấy dó; nhánh của bài thi và sổ tên.** Trang giấy nhà làm giữ được chữ lâu, nên có người muốn mua cả cách khiến chữ biến mất.

N1: kiểm lô giấy hỏng bị trả, phát hiện chỉ mực sổ thuế bị tan. N2: tìm người đặt chất phủ qua xưởng NP22 và giao dịch LOC03. N3: phục dựng trang LOC02 bằng mẫu bồi, xác nhận tên hộ bị xóa. N4: bán công nghệ tẩy, công bố cách đọc lại hoặc lập giấy chống sửa. N5: đặt quyền kiểm mẫu và giá cho người chép sách nghèo.

Kết A “Giấy giữ được lời”: phục dựng chứng và một kho dùng giấy chống sửa; hồ sơ bền hơn, kiếp sau gặp trang còn chữ mình cứu. Kết B “Chữ theo giá giấy”: bán độc quyền chất tẩy và khách đã xóa chứng; phe mua đổi lịch sử, kiếp sau còn dấu giấy đặc trưng. Kết C “Xưởng giấy của người đọc”: có xưởng chung và mức cấp giấy học được duy trì; nghề chép sách mở rộng, kiếp sau gặp sách học trò bồi tay.

**OR33 — Kẻ trốn nợ qua đèo; nhánh của chữ tín và lao dịch.** Món nợ có cả phần mình tự vay và phần lãi bị thêm; phải phân hai thứ.

N1: lấy bản khế LOC03 và tách gốc, lãi hợp lệ, khoản giả. N2: qua LOC11 tìm người bảo lãnh bị giữ thay, xác định họ đã biết điều kiện hay bị lừa. N3: tạo nguồn trả bằng nghề, thỏa thuận hoặc đoạt của, ghi rõ người chịu giá. N4: đối diện chủ nợ bằng chứng, trả, phá khế hoặc đổi người bảo lãnh. N5: chọn quay lại nhận tên, lập danh mới hoặc vận hành đường trốn nợ cho người khác.

Kết A “Tên không còn trốn”: khế được phân xử và người bảo lãnh thoát nghĩa vụ cưỡng ép; nhà có danh lại, kiếp sau gặp khế đóng dấu kết toán. Kết B “Chủ của những đường vòng”: nắm mạng vượt đèo và đã đưa một nhóm thoát; đường ngầm tồn tại theo phí đặt, kiếp sau có ám hiệu qua núi. Kết C “Nợ sang vai khác”: khế của mình đã hết bằng chuyển cho người không đồng thuận; chủ nợ vẫn thu được lợi, kiếp sau người gánh thay có dấu truy nợ cụ thể.

**OR34 — Con nhà nung men; nhánh của lò và độc nước.** Màu men đẹp nhất được đổi bằng bàn tay luôn run của người pha bột.

N1: kiểm một mẻ men và bệnh của thợ tại LOC11. N2: lấy mẫu nước nối tới cá chết LOC09 và người bệnh LOC10. N3: tìm đơn hàng nghi khí của FA03 chứng minh bên mua biết chất thải nguy hiểm. N4: đổi công thức, dựng bể xử, giấu nguồn độc hoặc bán trọn bí quyết. N5: chọn kiểu xưởng và ai được dùng dấu men gia đình.

Kết A “Men không nhuộm sông”: công thức hoặc xử thải đạt hiệu quả và người bệnh có bồi hoàn đã cam kết; nước có cơ hội hồi, kiếp sau thấy bình men mới. Kết B “Sắc quý trong nước đen”: giữ hợp đồng và tiếp tục xả biết hại; xưởng có tiền cùng vùng độc, kiếp sau gặp mảnh bát từ nhà mất cá. Kết C “Đập lò giữ tay”: dừng lò, xử an toàn chất còn và chuyển thợ; nghề men ấy mất thị trường, kiếp sau còn mẫu cuối được giữ.

**OR35 — Người làm thuê ở mỏ; nhánh của phôi lỗi và lao dịch.** Người chơi mang một thẻ công có ngày kết thúc đã bị sửa.

N1: đối thẻ mình với bảng phát công NP21 giữ. N2: tìm cửa hầm bị niêm phong và danh sách người còn ở dưới. N3: xác minh khế thuê với LOC03, tách công tự nguyện khỏi giam nợ. N4: tổ chức cứu, đình công, nhận giám công hoặc đoạt mỏ; phải giữ thông gió trong lúc tranh quyền. N5: phân quyền khai thác và trách nhiệm bồi thường vụ sập.

Kết A “Ra khỏi mỏ đủ tên”: người sống đã được đưa ra và khế thuê có hạn thật; mỏ chịu kiểm thợ, kiếp sau gặp thẻ công không sửa ngày. Kết B “Cầm roi ở cửa hầm”: nắm chức hoặc quyền mỏ và dùng lao dịch cưỡng ép; quặng tăng theo cái giá thật, kiếp sau có tên bị khắc sau vách. Kết C “Mỏ đóng, đường mở”: bịt hầm nguy hiểm đúng cách và người đi theo có chỗ làm mới; vùng đổi sinh kế, kiếp sau gặp đoàn thợ di cư.

**OR36 — Kẻ viết thư hộ; nhánh của bài thi và lệnh về.** Một bức thư mình viết có thể là tiếng cuối của người không biết chữ.

N1: nhận thư bị trả vì người nhận đã chết nhưng ngày tử mâu thuẫn. N2: tìm người nhờ viết hoặc thân nhân tại LOC14, xác nhận lời nào là họ nói thật. N3: đối dấu trạm LOC13 và bản nhà LOC02 để phát hiện thư bị đổi. N4: gửi nguyên, sửa để che đau, bán tin hoặc dùng thư làm chứng, ghi sự đồng ý của người sống. N5: lập nơi lưu thư, mạng tin kín hoặc chấm dứt nghề sau khi giao thư tồn.

Kết A “Thư tới người còn chờ”: giao bản thật hoặc chứng tử cho người có quyền nhận và giữ bí mật đã hứa; quan hệ được khép, kiếp sau gặp phong thư mở đúng người. Kết B “Một nét đổi một nhà”: chủ động sửa lời để thu lợi và bản sửa gây chuyển tài sản hoặc quan hệ; xã hội nhận chuyện sai, kiếp sau có người tìm bản gốc. Kết C “Hộp thư không người nhận”: lưu thư tồn an toàn với quy tắc nhận, không bán nội dung; người sau còn đường tìm, kiếp sau gặp lá thư chưa mở.

**OR37 — Hậu duệ người coi ấn; nhánh của lệnh giả và quyền gia tộc.** NP28 để lại dấu ấn thật nhưng không bảo đảm mọi lệnh từng đóng đều đúng.

N1: xác định ấn gia đình và một lệnh do người thân thật sự đóng. N2: so với lệnh rút quân LOC13, chứng minh chỗ giả và chỗ có tội thật. N3: lấy sổ tiếp ấn LOC02 để tìm người ra lệnh, không đổ hết cho người giữ dấu. N4: rửa phần oan, nhận phần trách nhiệm, dùng ấn đoạt quyền hoặc phá ấn. N5: lập cách đồng ký, nhận chức hoặc trả ấn cho cơ chế mới.

Kết A “Ấn có người cùng chịu”: công bố cả phần thật lẫn giả và có quy tắc đồng kiểm; chức coi ấn đổi trách nhiệm, kiếp sau gặp sổ hai chữ ký. Kết B “Một dấu lấy thiên hạ”: dùng ấn ra lệnh và lực lượng đã thực thi; có quyền lực mới, kiếp sau gặp một lệnh của mình còn hiệu lực. Kết C “Ấn vỡ tên còn”: phá quyền dùng ấn, lưu chứng tội và cứu được người chịu oan còn sống hoặc danh dự người mất; gia tộc mất đặc quyền, kiếp sau thấy mảnh ấn trong thư khố.

**OR38 — Người học bó xương; nhánh của bệnh xá và cựu binh.** Tay nghề bắt đầu từ một lần buộc nẹp quá chặt và người bệnh đã nói đau.

N1: theo dõi ca nẹp của mình tới kết quả, không tự công nhận khỏi sau một lần bấm. N2: học NP27 và kiểm các thương tích cùng kiểu trên quân trở về LOC14. N3: nối chấn thương với trang bị lỗi LOC11 hoặc lệnh luyện ép LOC13. N4: chọn chữa, làm chứng, nhận tiền giấu hoặc giúp quân tiếp tục dùng người chưa lành. N5: mở chỗ phục hồi, đi theo quân hoặc chỉ giữ nghề dân sự, có quy trình chuyển ca vượt khả năng.

Kết A “Bước chân trở về”: ca theo dõi ổn và có nơi phục hồi duy trì được; người tàn tật có hỗ trợ, kiếp sau gặp chiếc nẹp lưu tên. Kết B “Nẹp để ra trận”: có hợp đồng quân và đã cho người chưa lành trở lại vì lợi ích đã chọn; quân thêm người cùng thương tổn, kiếp sau gặp dấu chân không đều. Kết C “Biết buông tay”: ghi giới hạn ca không chữa được, chuyển hoặc chăm tới cùng và không bán lời bảo đảm giả; hồ sơ y thật còn, kiếp sau đọc lời người được ở cạnh.

**OR39 — Kẻ lớn lên bên vách đá; nhánh của trận và nơi ở.** Vách đá có tiếng vọng của những người bị dời khỏi đất trước khi mình sinh.

N1: khảo vết nhà trên vách và tìm người biết đường cũ LOC06. N2: đo tiếng vọng cùng NP09 hoặc dùng dấu địa hình, tìm trụ trận chặn nước. N3: xác định quyền đất qua bia LOC04 và sổ FA03, biết việc mở nước sẽ ngập nhà hiện tại. N4: phá, đổi đường hoặc chiếm trụ, phải chọn thời điểm sơ tán người thật. N5: lập nơi ở mới, giữ xóm đá hoặc bán quyền thủy mạch.

Kết A “Tiếng vọng có nhà”: thủy mạch an toàn và cư dân đã được tái định cư tự nguyện; xóm có quyền đất mới, kiếp sau thấy dấu bậc nhà trên vách. Kết B “Chủ của nguồn cao”: nắm trụ và thu được quyền sử dụng nước; các xóm lệ thuộc, kiếp sau gặp đơn xin mở dòng. Kết C “Đá trả lại trời”: hủy trụ, lưu hồ sơ và xử nơi đi của người theo mình; cảnh quan đổi thật, kiếp sau có vực không còn tiếng trận.

**OR40 — Con nhà giữ kho đường; nhánh của chữ tín và dịch bệnh.** Kho đường là nơi giấu thuốc đắng và cũng có thể che một chất gây nghiện.

N1: kiểm lô đường mất cân ở LOC03, nhận ra một số bao bị pha. N2: theo bao tới bệnh xá LOC10 hoặc quân kho LOC13, xác nhận tác dụng bằng mẫu và ca theo dõi. N3: tìm hợp đồng ai biết chất pha và ai chỉ vận, tách trách nhiệm. N4: thu hồi, bán cho phe vũ trang, công bố hoặc dùng để khống chế khách. N5: chọn giữ kho theo kiểm lô, đổi hàng hoặc xây mạng lệ thuộc.

Kết A “Ngọt không giấu thuốc”: lô sai được xử và chuẩn nguồn áp dụng qua một kỳ giao; kho có uy tín kiểm chứng, kiếp sau gặp dấu niêm đường. Kết B “Khách không rời quầy”: giữ nguồn pha và đã bán biết tạo lệ thuộc; có thị trường bị trói, kiếp sau gặp người đi tìm thuốc cắt. Kết C “Cửa kho đổi nghề”: kết toán lô hại, chuyển hàng tồn an toàn và nghề nhà khác hoạt động; đường dây mất kho, kiếp sau thấy biển cũ sau tường mới.

**OR41 — Người bị trả về từ biên ải; nhánh của cựu binh.** Giấy trả về ghi “không còn giá trị sử dụng”, không ghi tên một con người.

N1: xác định quyền quân cấp và tình trạng thương tật thật. N2: tìm những người cùng bị trả ở LOC14, đối ngày họ bị loại với lệnh rút. N3: lấy hồ sơ LOC13 chứng minh bị loại vì không đủ sức, biết chuyện hay để giảm tiền. N4: đòi bồi thường, làm chứng, thành lính thuê hoặc gây dựng quân người bị bỏ. N5: chọn nhà chung cho cựu binh, quay lại nắm quân hoặc rời mọi quân tịch.

Kết A “Giấy trả thành giấy nhận”: bồi thường được phân xử và có nơi sống hỗ trợ người đi cùng; trại cựu binh có quyền, kiếp sau gặp thẻ nhận người. Kết B “Quân của người bị bỏ”: có lực lượng, lương và một mục tiêu được giữ bằng thực lực; hình thành phe quân sự mới, kiếp sau nghe lời thề của họ. Kết C “Không ai gọi là quân nữa”: rời quân tịch, sinh kế dân sự hoạt động và người theo có quyền tự chọn; một nhóm rời chiến tranh, kiếp sau thấy vũ khí dùng làm nông cụ.

**OR42 — Trẻ ẩn dưới sàn đan; nhánh của dược đồng và huyết hệ.** Người chơi từng nghe dưới sàn tiếng người hỏi liệu mình có phải nguyên liệu.

N1: tìm miếng sàn cũ LOC10 và ký hiệu lô đan vào ngày mình được giấu. N2: đối hồ sơ FA07 với danh mất tích LOC04, biết ai định dùng người và ai đã giấu mình. N3: xác minh đan phương có thể thay nguồn hay lời thay chỉ là cách kéo dài giam giữ. N4: cứu người trong lô kế, chiếm phương, công bố hoặc làm giao dịch đổi riêng thân nhân. N5: xử lò, hồ sơ người bị dùng và quyền sở hữu công thức.

Kết A “Lò không nhận tên người”: bỏ được nguồn cưỡng ép và người còn sống thoát tự do; FA07 đổi quy tắc, kiếp sau có viên đan ghi nguồn thật. Kết B “Người trên sàn”: nắm phương và đã giữ nguồn người cưỡng ép; có lợi lực hoặc tài chính thực, kiếp sau gặp tên nạn nhân trong tro lò. Kết C “Cứu một người khỏi lửa”: đã giải được người tự chọn và rời giao dịch sau khi biết người khác còn; một gia đình đoàn tụ, kiếp sau còn người bị bỏ với quan hệ không tự được xóa.

**OR43 — Kẻ mang tro về quê; nhánh của chuông và tên trận vong.** Có ba nắm tro trong một bình, người thuê chỉ trả tiền cho một tên.

N1: xác định tuyến đưa tro từ LOC14 tới LOC01 và tên đã được dặn đọc. N2: so thẻ tử với dấu vật trong bình, phát hiện nhiều người bị trộn. N3: truy người phân tro NP24 và lệnh khắc, biết do thiếu nguồn hay để che tội. N4: trả đúng gia đình nếu xác minh được, lập mộ chung có ghi giới hạn hoặc bán một câu chuyện chắc chắn giả. N5: quyết định nghề đưa tro, nơi lưu người không tìm được nhà và quyền gia quyến.

Kết A “Tro có người đón”: phần xác minh được đã trả, phần chưa rõ được ghi đúng giới hạn; mộ giữ sự thật, kiếp sau gặp tên trên bình chia lại. Kết B “Một bình một lời dối”: đã bán nhận dạng giả để lấy lợi và người mua tin; gia đình thờ sai người, kiếp sau có thân nhân tới hỏi chiếc thẻ khác. Kết C “Mộ chung không giấu thiếu”: lập nơi an táng chung với danh sách điều chưa biết và người giữ; người vô danh có chỗ, kiếp sau thấy một tên mới được bổ sung.

**OR44 — Người thừa kế sạp bạc; nhánh của gia tài và chữ tín.** Món được thừa kế gồm bạc thật, bạc rỗng và những bàn tay đã đặt niềm tin.

N1: kiểm quỹ tại LOC03 và đối số giấy gửi với bạc có thật. N2: tìm giao dịch LOC11 có khuôn lỗi, xác nhận lỗ do lừa, chiếm dụng hay mạo tiền. N3: đối giấy di chúc LOC02 để biết người thừa kế có quyền và nghĩa vụ nào. N4: hoàn trả theo thứ tự công khai, bán sạp, mạo bạc hoặc dùng quyền lực chặn người rút. N5: chốt mô hình giữ hộ, cho vay, phát hành hay giải thể, có kiểm quỹ cuối.

Kết A “Bạc đủ để người về”: nghĩa vụ được phân xử minh bạch và không còn giấy gửi giả chưa thông báo; có cơ sở tin cậy mới, kiếp sau gặp phiếu đã trả. Kết B “Giấy thay bạc”: đã phát giấy không có bảo chứng và nắm được cơ chế ép nhận; vốn phe tăng cùng rủi ro xã hội, kiếp sau có vùng từng vỡ quỹ. Kết C “Sạp đóng không nuốt tên”: giải thể với danh sách chủ nợ và chia tài sản thật; người mất phần biết quyền đòi, kiếp sau gặp hồ sơ có chữ nhận thiếu.

**OR45 — Người học đạo sau mùa lũ; nhánh của chuông và trận.** Người chơi tìm đạo vì đã thấy nước cuốn hết, không mặc định vì muốn làm anh hùng.

N1: lập danh người còn sống và điều đã mất tại LOC01, rồi tìm chỗ trú LOC12. N2: khảo vết lũ, đối lịch mở trụ LOC05 để biết thiên tai tự nhiên hay bị chuyển dòng. N3: học cách đọc trận hoặc nhờ người đọc, xác minh phương sửa có cần nguồn hiến cưỡng ép. N4: chọn sửa dòng, dời dân, nhận quyền vận hành hoặc phá trụ, ghi ai phải bỏ đất. N5: quyết định giữ đạo cứu nước, tìm phi thăng hoặc sống đời phàm với tri thức đã học; vô căn vẫn học lý thuyết, không tự sinh linh lực.

Kết A “Học để nước có đường”: dòng an toàn và khu dân đã có cơ chế quản lâu dài; làng có người giữ thủy, kiếp sau gặp mốc nước cao đã khắc. Kết B “Đạo trên nơi nhà chìm”: nhận và vận hành quyền trụ với nguồn đã chọn; người chơi có thế lực cùng trách nhiệm thực, kiếp sau gặp bản đồ vùng bị chuyển lũ. Kết C “Sau lũ vẫn ăn cơm”: chốt không nhập đạo, có sinh kế phàm và đã lưu nguyên nhân lũ cho người sau; một đời phàm có kết trọn, kiếp sau gặp quyển thủy chí không có pháp thuật.

#### Thức tỉnh và tám kiểu kết thúc lớn

Kết đại tuyến trả lời “đời này đã làm gì với vết thương xuất thân”. Kết lớn trả lời “đời này trở thành ai” hoặc “đã làm gì với vòng luân hồi”. Chúng được ghi đồng thời. Lên ngôi không tự cấm phi thăng về sau; cứu một làng không tự cấm thành ma chủ. Kết đã chốt được lưu ở sử ký, thành tựu về sau tạo phần tiếp theo thay vì xóa sự kiện cũ.

Ba tri thức thức tỉnh là ba kết luận có chứng, không phải ba vật phẩm độc nhất có thể làm mất vĩnh viễn:

- TRI01 “Vòng đã từng khép”: xác minh một ký ức của bản thân trùng một dấu đời trước, hoặc trong kiếp đầu đối chiếu bản quan trắc hai chu kỳ tại LOC05 với chứng độc lập LOC12. Chỉ đọc một lời đồn không đủ.
- TRI02 “Ký ức đang nuôi vòng”: quan sát một lần chuyển ký ức tại chuông LOC12, lõi LOC05 hoặc tàn trận LOC15 và đối chiếu người hoặc dấu vật đã bị lấy. Tàn tích giữ dấu chuyển ngay cả khi thiết bị đã hỏng.
- TRI03 “Cửa có thể chọn”: thử một mô hình nhỏ không dùng sinh linh tại LOC15, hoặc đọc và kiểm chứng phép thay nguồn từ hồ sơ Ngũ Tổ. Đây là bằng chứng tồn tại lựa chọn, không tự khẳng định mọi lựa chọn đều an toàn.

Mỗi tri thức có ít nhất hai nguồn độc lập. Không bắt phải có ba kiếp, từng làm ác, từng làm thiện hoặc từng chịu một cái chết được viết sẵn. Thiên tài kiếp đầu có thể tìm đủ nếu đủ năng lực và cơ hội; người phàm có thể tìm bằng đọc, quan hệ, nghề, khảo cổ và trợ giúp. Phàm nhân biết bí mật không vì thế tự đủ linh căn hay đủ sức một mình phá trục. Thông tin giấu với người chơi chỉ ảnh hưởng quyết định từ thời điểm họ thực sự biết; không đổi quá khứ thành hành vi cố ý.

| ID | Kết thúc; cổng đạt chính xác | Thay đổi thế giới, quyền tiếp tục và dấu vọng |
|---|---|---|
| END01 | **Một đời đã sống.** Chết, về già hoặc chủ động an cư; đã có ít nhất một sinh kế, quan hệ tự nguyện hay mục đích được theo đến một kết quả. Đời quá ngắn chưa đạt vẫn có bản ghi riêng “Đời chưa kịp gọi tên”, không bị coi là bản lưu hỏng | Ghi điều đã giữ, người đã mất, việc dang dở. Thế giới tiếp tục. Kiếp sau chỉ nhận những dấu nhân quả, vật và quan hệ thật còn; không phát chỉ số chỉ vì tự chọn kết |
| END02 | **Nhân Hoàng.** Nắm ngai LOC02; kiểm soát hoặc có hiệp ước thực thi với kho LOC01 và quân LOC13; đủ trả quân lương và bộ máy qua ba kỳ thu liên tiếp; hai trong FA02, FA04, FA08, FA10 đã công nhận bằng hiệp ước hoặc khuất phục có hiệu lực | Lương triều đổi quân chủ và luật theo quyết định đã ban. Có thể trị tiếp, truyền ngôi hoặc chết tại vị. Kiếp sau gặp triều đại thực đã được giữ hay đã sụp; phàm nhân đạt được bằng quyền lực xã hội, không cần thắng mọi tu sĩ trong đấu tay đôi |
| END03 | **Ma chủ.** Nắm huyết ấn LOC07 hoặc trục cưỡng chế do mình tạo; ít nhất ba thế lực trong mười FA chịu điều ước của mình; đã duy trì một kỳ vận hành bằng nguồn thực; có cơ chế đối phó phản kháng và người kế quyền | Lập ma quốc, liên minh hoặc trật tự mới theo cách thực thi. Tự nguyện cống hiến và cưỡng ép tạo hậu quả khác nhau. Có thể cai trị tiếp hoặc rời quyền. Kiếp sau có những người được lợi và chịu hại cụ thể |
| END04 | **Phi thăng tỉnh mộng.** Có đủ TRI01–TRI03; đạt Độ Kiếp viên mãn; chuẩn bị được cửa mở LOC15 và nguồn vận hành; tự chọn rời vòng; sống qua thiên kiếp phi thăng bằng quy tắc thiên kiếp chung | Người chơi rời Cổ Giới, không đổi nhãn thành cấp thần mới để kéo dài vô hạn. Hậu quả đời cũ tiếp tục trong hậu truyện. Có thể kết toàn bộ hồ sơ tại đây; chơi tiếp là mở hồ sơ mới, không cưỡng bức kẻ đã thoát quay lại |
| END05 | **Giữ mộng bằng tên mình.** Có TRI01–TRI03; biết nhu cầu nguồn của trục; xây và thử được nguồn thay thế không lấy ký ức cưỡng ép qua một chu kỳ; tự nguyện làm người điều phối hoặc giao hội đồng có người nhận | Vòng còn nhưng cơ chế đổi, Đêm Dài được ổn định theo lượng nguồn thật. Không hồi sinh người đã chết. Người chơi có thể ở lại quản trị, già đi hoặc truyền trách nhiệm. Kiếp sau nếu vẫn chọn luân hồi có ký ức bị giới hạn theo luật mới đã công bố |
| END06 | **Truyền một ngọn đèn.** Hoàn tất mục tiêu truyền thừa của một trong 34 nghề; có người học tự nguyện đã tự hoàn thành một công việc hợp lệ không cần người chơi làm hộ; có bản nghề hoặc cơ sở duy trì và nơi nhận quyền rõ | Nghề, võ phái, bệnh xá, sách hoặc pháp môn có người nối. Không đòi người học tôn thờ hay mang cùng họ. Có thể lui về hoặc tiếp tục đời khác trong cùng kiếp. Kiếp sau gặp người kế tiếp đúng tuổi và khả năng, không cấp lại toàn bộ nghề miễn phí |
| END07 | **Người chặt vòng.** Có TRI01–TRI03; xác minh đường tản ký ức và các hậu quả; phá cả ba nút nối LOC05, LOC12, LOC15 trong một trạng thái ngắt đồng bộ; chọn đóng vòng thay vì chiếm quyền | Cơ chế tái sinh của Cổ Giới chấm dứt, sinh linh đang sống tiếp tục đời hữu hạn. Phần linh hồn còn treo được giải theo phương án đã chuẩn bị, thiếu chuẩn bị có mất mát được báo bằng bằng chứng. Đây là kết toàn bộ hồ sơ, có hậu truyện và sao lưu trước quyết định; không buộc người chơi phải qua đời mới biết đã hết kiếp sau |
| END08 | **Thế giới không còn người gọi tên.** Có TRI01–TRI03 hoặc đã chiếm được trục bằng chứng thực; chủ động mở nghi thức Diệt Thế tại LOC15; biết phạm vi toàn Cổ Giới và xác nhận hậu quả; nắm hai trong ba khóa LOC05, LOC07, LOC12 bằng học, đoạt hoặc khảo di tích; có nguồn cho toàn nghi thức và sống qua sự chống trả cuối | Nghi thức hủy toàn bộ sinh linh trong Cổ Giới theo nghĩa đã công bố, gồm dân, tu sĩ và thú, trừ người thực hiện còn sống tại tâm nghi thức. FA và nghề cần xã hội đóng thật. Có thể kết tại im lặng, tự khép đời để mở thế giới kế tiếp nếu vòng còn, hoặc dùng trục trống chọn END04/END07 khi đủ điều kiện tương ứng. Không sinh dân mới trong cùng thế giới để phủ nhận sự hủy diệt |

Các cổng này là đề xuất luật cho bản thiết kế, chưa phải kết quả đã cân bằng qua chơi thử. “Có quyền” luôn phải được chứng bằng quan hệ thực thi, kiểm soát thực địa hoặc hợp đồng, không phải chỉ một thanh danh vọng đầy. “Một kỳ” dùng đúng lịch của hệ tương ứng: mùa là ba tháng, năm là mười hai tháng; ba kỳ thu của END02 là ba tháng liên tiếp sau khi nhận quyền, và phải có đủ dự trữ vận hành cho cả ba tháng trước khi cho tua tự động.

Không cần chờ người chơi ghé NPC cuối để công nhận kết. Ngai đã chiếm, luật đã ban và lương đã trả là sự kiện thế giới; người kể chỉ ghi nhận. Hoàng đế làm hại dân vẫn có thể là hoàng đế. Người thay nguồn trục bằng tàn sát không đạt END05 vì nguồn ấy không khớp điều kiện, nhưng có thể đạt END03, END08 hoặc những kết nghề khác đúng hành động.

Đoạn kết ngắn tương ứng dùng chất liệu đã xảy ra, không đọc cùng một đoạn bất kể đời:

- END01: “Bếp nguội dần. Ngoài sân, một người vẫn nhớ ngươi thích để cửa hé vào những đêm mưa.” Nếu không có ai nhớ, câu cuối đổi thành vật chứng hoặc cảnh quan, không bịa người thân.
- END02: “Chiếu thư đi qua những mái nhà ngươi chưa từng bước vào. Từ hôm nay, cái đói ở đó cũng mang một phần tên ngươi.” Đối chiếu hậu truyện để ghi dân no hay đói, không mặc định mọi trị vì thất bại.
- END03: “Không còn ai gọi ngươi bằng tên lúc nhỏ. Những người quỳ dưới điện vẫn có tên riêng, và ngươi biết mình đã bắt họ trả những gì.” Nếu quyền dựa giao ước, thay động từ ép bằng việc tự nguyện đã được kiểm chứng.
- END04: “Lần đầu tiên, giấc mộng không gọi ngươi quay lại. Sau lưng, một thế giới vẫn tiếp tục khóc và nhóm bếp.”
- END05: “Trục đá quay chậm. Trong tiếng động ấy, ngươi còn nghe từng cái tên, và lần này không tên nào bị lấy khi họ chưa trả lời.”
- END06: “Người học trò làm sai một nét, rồi tự sửa. Ngươi ngồi nhìn, nhận ra có một việc từ nay không còn cần tay mình.”
- END07: “Nước thôi chảy ngược. Người sống chỉ còn một đời để từ biệt nhau, và buổi sáng vẫn đến.”
- END08: “Gió đi qua chợ không còn mùi khói bếp. Không ai nguyền rủa ngươi nữa. Cũng không ai gọi.”

#### Khi người chơi giết NPC, phá địa điểm hoặc bỏ tất cả cốt truyện

| Tình huống | Phân giải bắt buộc | Điều không được xảy ra |
|---|---|---|
| Giết người giao tuyến trước khi nói chuyện | Đồ, giấy, nhân chứng, quan hệ và thương tích tạo ít nhất một đường biết chuyện khác; nếu không ai biết, chỉ còn khảo hiện trường theo nghề phù hợp | Người chết hiện lại để giao nhiệm vụ; tự cấp toàn bộ bí mật mà chưa tìm |
| Giết cả người giữ chứng lẫn nhân chứng | Sự thật chỉ còn phần ghi trên hiện vật và dấu môi trường; một số kết quan hệ khép vĩnh viễn, kết nghề/quyền lực vẫn dùng trạng thái thật | Một người kế nhiệm vô danh bỗng biết tất cả lời thú tội |
| Đốt thư khố trước khi đọc | Mất nguồn sách ấy; TRI01 có quan trắc LOC05, TRI02 có tàn trận LOC15; chuyên gia còn sống hoặc tự học có thể đọc dấu | Tự trả sách nguyên vẹn vào túi để giữ cốt truyện |
| Diệt cả mười thế lực trước khi biết sự thật | Dấu vật tại LOC04/05/12/15 và hiện tượng luân hồi vẫn cung cấp phép kiểm độc lập; hành động khảo tích cần thời gian, dụng cụ hoặc thuê trước đó | Khóa tiến độ vì không còn NPC đánh dấu hỏi |
| Hủy một nút cần cho END07 | Mảnh lõi lưu trạng thái đã ngắt; người chơi phải xác minh được nó, không bắt dựng lại nút sống | Nút bị phá bị tính như chưa từng tồn tại |
| Lõi hoặc chìa khóa bị rơi xuống vực | Mã chức năng nằm ở tri thức/quyền điều khiển đã học hoặc cấu trúc hiện trường; khảo di tích lấy được phương án tái dựng có chi phí, không sinh lại nguyên món độc nhất | Mất toàn bộ kết game vì bán hoặc rơi một vật |
| Bế quan lâu, người thân già chết | Quan hệ khép với di thư, mộ hoặc phần việc dang dở theo việc người ấy biết; không miễn tuổi chỉ vì chưa bấm cốt truyện | Người phàm đứng chờ hàng trăm năm không lý do |
| Đổi nghề giữa tuyến | Giữ sự thật đã biết và quyền đã có; cách giải mới mở theo nghề mới; nghĩa vụ cũ còn trạng thái thật | Bắt làm lại N1 hoặc mất quan hệ vì đổi nhãn nghề |
| Không theo bất cứ tuyến nào | Sinh tồn, hợp đồng nghề, thế cục, quan hệ và mục tiêu tự đặt vẫn cho kết END01/02/03/06 nếu đủ; thức tỉnh đến qua khảo sát, mơ hoặc hệ quả thế giới nhưng người chơi có thể từ | Tự cưỡng ép một NPC cứu để kéo về truyện chính |
| Chết giữa lời chọn kết | Chỉ phần hành động đã cam kết và diễn ra được ghi; phần cửa chưa mở vẫn chưa mở; kiếp sau nhận hậu quả thật | Cấp kết thành công vì đã bấm nút dù nhân vật chết trước khi làm |
| END08 đã hoàn tất | Đóng thị trường, giao tiếp người sống, sinh sản và thú triều của thế giới ấy; cảnh im lặng vẫn có niên biểu, di vật và trục | Sinh thêm kẻ thù người sống chỉ để còn chỗ cày |

Điểm neo chuyện không cố định kết quả. LOC01 có thể thành điền trang, hợp tác hộ, làng bỏ hoang hoặc khu tái định cư; NP03 có thể lên chức, mất chức, chết hoặc rời quan. Chỉ định danh và lịch sử giữ nhất quán. Bản đồ ngoại vi vẫn sinh người và nơi theo loại dữ liệu, nhưng phải tôn trọng người đã chết, đất đã đổi chủ, tài nguyên đã cạn và nhánh đã bị phá.

#### Dữ liệu cốt truyện phải lưu và điều kiện nghiệm thu

Mỗi OR có đúng năm hồ sơ nút, ba hồ sơ kết và các quan hệ mở đầu đã viết ở trên. Một hồ sơ nút cần nội dung phát hiện, người biết, nguồn chứng, lựa chọn, chi phí, hành động thay thế, biến đổi thế giới, dấu nhân quả, cổng mở và quy tắc tự khép. Các động từ “tìm”, “đối chiếu”, “xác minh”, “đưa” phải dẫn tới hành động hoặc nơi thực hiện được; không cho người chơi bấm một câu rồi nhận ngay sự thật không có bước kiếm chứng.

Các giấy, bia, thẻ, khế, mảnh áo, khuôn, mẫu và bản đồ gắn trong 225 nút là đạo cụ có nguồn gốc. Đạo cụ không có công năng chiến đấu mặc định, không bán sinh tiền và không nhân bản qua tải lại. Mỗi đạo cụ lưu mã gắn OR và nút, tên riêng đã nêu, người tạo hoặc nơi sinh, lúc tạo, chủ đang giữ, trạng thái nguyên/hỏng/mất, nội dung xác minh được, nơi có bản sao, quyền đọc và nhật ký thay đổi. Một tờ giấy có thể cùng lúc là chứng của hai OR nếu thật sự cùng sự kiện; không tạo hai lịch sử trái nhau.

Mỗi kết lưu: các điều kiện đã đạt với dấu thời gian; ai còn sống; tài sản và quyền đã chuyển; các cờ thế giới được đổi; người tiếp nối; dấu vọng liên kiếp; lời kết chọn theo dữ kiện; những nghĩa vụ còn dang dở. Không ghi chung “kết tốt” hoặc “kết xấu” làm căn cứ tính Nghiệp Duyên.

Nghiệm thu phần truyện chỉ đạt khi:

1. Đủ 45 xuất thân có cổng sinh hợp lệ và 225 nút truy được, tổng cộng 135 kết xuất thân có điều kiện, thay đổi thế giới và dấu vọng.
2. Cả 18 nghề phàm và 16 nghề tu có hành động kiếm sống/nguồn lực, bốn bậc tay nghề, mục tiêu truyền thừa và nội dung kết riêng; người vô căn làm được nghề phàm, không lách điều kiện bằng chọn thể tu.
3. Giết từng NP trọng yếu trước/sau nút của họ đều phân giải được phần sự thật còn lại; các kết tình cảm đã mất không bị giả cứu bằng người thay.
4. Phá từng LOC neo vẫn có trạng thái hiện trường, dịch vụ đóng và nguồn thông tin thay hợp lý; ít nhất một đường biết TRI01–TRI03 còn tồn tại sau khi không còn NPC sống.
5. Kiếp đầu có thể kết bằng đời phàm dù được cấp linh căn; kiếp vô căn có thể đạt END02 và END06 mà không buộc cải căn.
6. Hành động từ nghề, chiến tranh, luật, giao ước hoặc truyện chính cùng đi qua sổ hành động chung; không có hai bảng nhân quả độc lập tính trùng một người chết.
7. Bỏ hết ghim cốt truyện không làm màn hình trống hoặc mất cách kiếm ăn; người chơi vẫn nhận tin thế giới theo nơi, nghề và quan hệ đang có.
8. END04, END05, END07 và END08 có cảnh báo hậu quả có thể biết, điều kiện chuẩn bị cụ thể, lựa chọn chốt, trạng thái thành/bại và hậu truyện; END07/08 có bản lưu trước quyết định để người chơi tự giữ, không tự xóa hồ sơ cũ.

---

<a id="nhan-vat-the-luc"></a>

### 7. Hồ sơ ba mươi nhân vật và mười thế lực

Đây là các giá trị đề xuất dùng để biên soạn nội dung và cân bằng, chưa được xác nhận bằng chơi thử. Bảng này bổ sung trực tiếp cho danh mục NP01–NP30: tuổi, hạn sống, căn, nghề, tiền và tài sản ở thời điểm thế giới mở đầu. Sau đó mọi giá trị thay đổi bằng sự kiện thật, không được nạp lại từ bảng mỗi khi người chơi đến nơi hoặc sang kiếp.

Chuẩn cảnh giới được đối chiếu tại [src/game/core/02-tin-don-giang-ho.js](/workspace/Sect/src/game/core/02-tin-don-giang-ho.js): Luyện Khí, Trúc Cơ, Kết Đan, Nguyên Anh, Hóa Thần, Độ Kiếp; Phàm nhân là trạng thái chưa nhập đạo. Bản đề xuất này không tự chèn Hợp Đạo hoặc Đại Thừa vào giữa các bậc. Thọ trần dùng mốc sáu mươi năm cho Phàm nhân và Luyện Khí, một trăm ba mươi cho Trúc Cơ, ba trăm cho Kết Đan, sáu trăm năm mươi cho Nguyên Anh, một nghìn năm trăm cho Hóa Thần và ba nghìn cho Độ Kiếp. Các mốc là giới hạn hiện tại trước bệnh, thương, nợ thọ, đan và thay đổi thể chất; không hứa NPC sẽ sống tới đúng mốc. Một người sống quá giới hạn cũ nhờ đột phá phải có sự kiện đột phá đã quyết toán.

Có mười tám người phàm vô căn, mười một người có căn đã tu luyện, một ký ức phi sinh vật. Đây là dàn nhân vật được viết theo vai trò, không phải mẫu thống kê dùng để kiểm xác suất vô căn của thế giới. Phàm nhân có thể giữ linh thạch như tài sản nhưng không dùng nó để thi triển pháp thuật. Những NPC vô căn không được gán công pháp vận hành, kênh triệu thú, thần thức hoặc kỹ năng luyện thể siêu phàm.

Bậc nghề dùng bốn tên thống nhất: học đồ, hành nghề, chuyên gia, tông sư. Điểm trong ngoặc là mức thành thạo nội bộ trên thang từ 0 đến 1.000, không phải cảnh giới. Tông sư ở mức 950 đang chuẩn bị người kế nhưng chưa có cờ truyền thừa hoàn tất; phải thực sự truyền nghề, giao tư liệu và có người tiếp nhận.

Tiền ở bảng là **tiền cá nhân**, tách khỏi kho của phe, tiền thu hộ, công quỹ và hàng ký gửi. Một quan bằng một nghìn đồng. Một viên linh thạch hạ phẩm bằng một trăm linh sa, là hai đơn vị của cùng tài nguyên; mọi số dư và giao dịch lưu số nguyên linh sa. Các số viên nguyên trong bảng được chuyển thành một trăm lần số linh sa khi khởi tạo, không cộng thêm một kho thứ hai. Không có tỷ giá cố định giữa đồng tiền và linh thạch. Khi bị cướp, thanh toán hoặc để lại di sản, chỉ chuyển số thực còn trong sổ tài sản, không lấy lại số khởi tạo để bù.

| Mã; tuổi lúc mở thế giới / hạn sống hiện tại | Linh căn và cảnh giới | Nghề đã đạt | Tiền cá nhân khởi tạo | Dụng cụ và tài sản sử dụng thực tế |
|---|---|---|---|---|
| NP01 Lý Thổ; 54/60 | Vô căn; Phàm nhân | PM01 Nông dân: tông sư (800 điểm) | 360 đồng; không linh thạch | Một cuốc sắt, một liềm, một nón lá. Quyền sử dụng hai thửa ruộng hộ gia đình và một phần kho giống LOC01 là bất động sản có hồ sơ, không nằm trong túi |
| NP02 Mộc Nghi; 43/60 | Vô căn; Phàm nhân | PM11 Binh lính: chuyên gia (500 điểm); PM12 Chiến binh: hành nghề (200 điểm) | 480 đồng; không linh thạch | Một giáo sắt, một áo giáp da, một còi trạm. Giáo và giáp là quân dụng FA04 cho mượn; quyền sở hữu không tự chuyển sang người chơi khi mượn thử |
| NP03 Tạ Văn Kính; 39/60 | Vô căn; Phàm nhân | PM08 Chép sách: tông sư (800 điểm); PM16 Quan viên: hành nghề (200 điểm) | 1.800 đồng; không linh thạch | Một bút lông, một nghiên mực, hai mươi tờ giấy trắng. Chìa phòng thuế và sổ thuế gốc là công sản FA01 có biên bản nhận, không phải hàng mua bán |
| NP04 Lương Hạo; 46/60 | Vô căn; Phàm nhân | PM16 Quan viên: tông sư (800 điểm); địa vị quân chủ | 12.000 đồng; không linh thạch | Một đoản kiếm nghi lễ, một áo bào, một ngọc tỷ do FA01 sở hữu. Cung, quốc khố, quân đội và quyền ra lệnh không phải tài sản bỏ túi của NP04 |
| NP05 Thẩm Cửu; 51/60 | Vô căn; Phàm nhân | PM09 Thương nhân: tông sư (950 điểm; đang chuẩn bị người kế) | 8.000 đồng; 12 linh thạch | Một bàn tính, một cân tiểu ly, một con dấu cá nhân. Sổ khế, hàng đấu giá và tiền ký gửi thuộc từng chủ hàng, được lưu riêng ở LOC03 |
| NP06 Lạc Tín; 34/60 | Vô căn; Phàm nhân | PM09 Thương nhân: chuyên gia (500 điểm); PM10 Phu trạm: hành nghề (200 điểm) | 2.400 đồng; không linh thạch | Một đao đi đường, một la bàn phàm, một thẻ trưởng đoàn. Một xe hàng và hai ngựa là phương tiện thuê từ FA02, có hạn thuê và phí trong hợp đồng |
| NP07 Vô Đăng; 58/60 | Vô căn; Phàm nhân | PM08 Chép sách: chuyên gia (500 điểm); PM06 Thủ công khắc chữ: hành nghề (200 điểm) | 160 đồng; không linh thạch | Một đèn dầu, một bộ đục chữ, một gậy gỗ. Bia tên và tượng ở LOC04 là tài sản cộng đồng; NP07 giữ quyền chăm nom, không sở hữu tên người chết |
| NP08 Mạc Liên; 28/60 | Vô căn; Phàm nhân | PM08 Chép sách: chuyên gia (500 điểm); PM10 Phu trạm: hành nghề (200 điểm) | 720 đồng; không linh thạch | Một ống bản dập có sáu bản đã ghi, một bút than, một dao đi rừng. Các bản dập có nguồn và nội dung cụ thể từ LOC04, không tự biết hồ sơ chưa khảo sát |
| NP09 Hứa Triều; 118/300 | Song Kim–Thổ, phẩm Thuần; Kết Đan hậu kỳ | TU08 Trận pháp: tông sư (800 điểm); TU12 Phù: chuyên gia (500 điểm); TU13 Khôi lỗi: hành nghề (200 điểm) | 2.400 đồng; 36 linh thạch | Sáu trận kỳ, một linh bàn đo mạch, một bút phù. Trận kỳ là bộ cá nhân; lõi đại trận và kho phù chỉ thuộc FA03, không sinh lại khi bộ cá nhân mất |
| NP10 Diệp Vân; 24/60 | Tạp ngũ hành, phẩm Thường; Luyện Khí trung kỳ | TU08 Trận pháp: học đồ (50 điểm) | 240 đồng; 2 linh thạch | Ba trận kỳ học đồ, một thước đo mạch, một bản sao trận nhập môn có nét sửa của NP09. Bản sao chỉ chứa nội dung nhập môn, không mở bản điều khiển Ngũ Tổ |
| NP11 Đỗ Lộc; 37/60 | Vô căn; Phàm nhân | PM02 Tiều phu: tông sư (800 điểm) | 480 đồng; không linh thạch | Một rìu sắt, một dây kéo gỗ, một gùi. Có quyền chặt tại hai lô rừng theo giấy phép FA04; không sở hữu toàn LOC06 |
| NP12 Dã Tâm; 154/650 | Dị Phong, phẩm Thuần; Nguyên Anh hậu kỳ; yêu tộc có thân thể | TU07 Ngự thú: tông sư (800 điểm); TU06 Triệu hoán: chuyên gia (500 điểm) | Không đồng tiền; 18 linh thạch | Một cốt tiêu, một vòng khế tự nguyện, một phiến ghi hiệp ước sinh cảnh. Không sở hữu đàn thú tự do; năng lực sứ giả không cho gọi miễn phí Yêu Hoàng vào trận |
| NP13 Tần Huyết Lăng; 181/650 | Song Thủy–Hỏa, phẩm Thuần; Nguyên Anh trung kỳ | TU03 Huyết tu: tông sư (800 điểm); TU16 Ảnh sát: chuyên gia (500 điểm) | 6.000 đồng; 80 linh thạch | Một huyết ấn cá nhân, một kiếm ngắn, một bình huyết đã niêm chứa đúng một đơn vị hiến tự nguyện. Huyết trì là tài sản FA05 có nguồn máu và chi phí bảo quản, không là nguồn hồi lực vô hạn |
| NP14 A Túc; 31/60 | Vô căn; Phàm nhân | PM08 Chép sách: chuyên gia (500 điểm); PM16 Quản hộ: học đồ (50 điểm) | 640 đồng; không linh thạch | Một chìa kho phả, một bút son, một bản tên người bị xóa. Chìa và phả gốc thuộc FA05; huyết hệ không tự cho NP14 linh lực |
| NP15 Bạch Kỳ; 96/300 | Song Mộc–Thủy, phẩm Thường; Kết Đan sơ kỳ | TU07 Ngự thú: tông sư (800 điểm); TU06 Triệu hoán: chuyên gia (500 điểm) | 3.200 đồng; 48 linh thạch | Một khế bàn, một roi dẫn hướng không gai, một đai chữa thú. Có một bạn thú trưởng thành thuộc khế tự nguyện; bạn thú có mã cá thể, khẩu phần và thọ nguyên riêng, không nằm trong ô vật phẩm |
| NP16 Kỷ Vũ; 26/60 | Vô căn; Phàm nhân | PM07 Y sư phàm chuyên thú: chuyên gia (500 điểm); PM01 Chăm cây thức ăn: hành nghề (200 điểm) | 800 đồng; không linh thạch | Một hòm y cụ phàm gồm một dao mổ, một kẹp, một kim khâu; ba băng sạch. Không được dùng chữa kinh mạch, đan phương hoặc khế linh thú khi chưa cải căn |
| NP17 Giang Mộ; 42/60 | Vô căn; Phàm nhân | PM17 Chèo đò: tông sư (800 điểm); PM03 Ngư dân: chuyên gia (500 điểm) | 1.200 đồng; không linh thạch | Một mái chèo, một sào, một dao cắt dây; một thuyền đò riêng đậu LOC09. Thuyền có sức chở mười người kể cả người lái, không đựng trong túi phàm |
| NP18 Ninh Ca; 37/60 | Tam Mộc–Thủy–Thổ, phẩm Thường; Luyện Khí hậu kỳ | PM15 Gánh hát: tông sư (800 điểm); TU15 Âm luật: hành nghề (200 điểm) | 960 đồng; 6 linh thạch | Một đàn tam huyền linh mạch cấp nhập môn, một sổ lời hát, hai bộ y phục diễn. Sân, phông, xe đoàn và tiền bán vé là tài sản gánh, không phải tiền cá nhân |
| NP19 Tô Bán Hạ; 75/130 | Song Mộc–Hỏa, phẩm Thuần; Trúc Cơ viên mãn | TU10 Dược sư: tông sư (800 điểm); TU09 Đan sư: chuyên gia (500 điểm); TU14 Độc tu phân tích: hành nghề (200 điểm) | 2.400 đồng; 20 linh thạch | Một bộ kim linh mạch, một dao dược, một bình tách độc. Lò đan bệnh xá và hạt giống kho lạnh thuộc FA07, dùng theo lịch và lô vật liệu thật |
| NP20 Hà Tề; 19/60 | Vô căn; Phàm nhân | PM07 Y phàm: học đồ (50 điểm); PM01 Chăm vườn: hành nghề (200 điểm) | 160 đồng; không linh thạch | Một cối giã, một rổ dược, ba ống lấy mẫu đã rỗng. Không được tự luyện đan; chỉ được nhận công thu hái và bào chế phàm đúng công thức đã học |
| NP21 Cố Chùy; 88/130 | Song Kim–Hỏa, phẩm Thường; Trúc Cơ hậu kỳ | TU11 Luyện khí: tông sư (800 điểm); TU13 Khôi lỗi: chuyên gia (500 điểm); TU12 Phù khắc: hành nghề (200 điểm) | 4.800 đồng; 24 linh thạch | Một búa linh mạch, một kìm, một bản đồ phổ sửa phôi. Lò chính, khuôn công, than và quặng là công sản FA08; không rơi cả lò khi chủ lò chết |
| NP22 La Men; 33/60 | Vô căn; Phàm nhân | PM06 Thủ công khuôn, giấy, men: tông sư (800 điểm); PM05 Rèn phàm: hành nghề (200 điểm) | 1.600 đồng; không linh thạch | Một dao khuôn, một bàn ép giấy, một bộ cọ men. Bàn ép ở cố định trong xưởng LOC11; ấn giả đã giao NP28 được ghi là giao dịch cũ, không giữ thêm bản thứ hai để rơi thưởng |
| NP23 Trí Viễn; 246/650 | Song Thủy–Thổ, phẩm Thường; Nguyên Anh sơ kỳ | TU04 Hồn tu: tông sư (800 điểm); TU05 Thần thức: chuyên gia (500 điểm); PM08 Chép sách: tông sư (950 điểm; đang chuẩn bị người kế) | 600 đồng; 30 linh thạch | Một đèn dẫn hồn, một chuông trấn tâm, một sách mục lục cá nhân. Tro cốt, sách công và ký ức người gửi không là hồn lực thuộc quyền tùy ý tiêu thụ của NP23 |
| NP24 Sầm Tro; 47/60 | Vô căn; Phàm nhân | PM06 Khắc bia: tông sư (800 điểm); PM08 Chép chữ: hành nghề (200 điểm) | 520 đồng; không linh thạch | Một bộ ba đục, một búa gỗ, một sổ tên đã đối chứng. Đục gồm ba món thành một bộ công cụ, không biến thành ba pháp khí |
| NP25 Đường Bắc Quy; 68/130 | Tam Kim–Hỏa–Thổ, phẩm Thường; Trúc Cơ sơ kỳ | TU01 Kiếm tu: chuyên gia (500 điểm); TU02 Thể tu: chuyên gia (500 điểm); PM11 Quân vụ: tông sư (950 điểm; đang chuẩn bị người kế) | 2.400 đồng; 16 linh thạch | Một kiếm linh mạch, một giáp quân, một ấn chỉ huy. Ấn là quyền quân vụ của FA10; thân thể mạnh nhờ tu luyện đã có căn, không vì chức tướng tự tăng cảnh giới |
| NP26 A Mãn; 18/60 | Vô căn; Phàm nhân | PM10 Phu trạm: hành nghề (200 điểm); PM11 Quân dịch: học đồ (50 điểm) | 240 đồng; không linh thạch | Một còi trạm, một dây dắt, một túi thư niêm phong. Có quyền dùng một ngựa trạm của FA10 theo lệnh, không sở hữu ngựa và không được mở thư để làm vật phẩm nhiệm vụ giả |
| NP27 Mạnh Cốt; 49/60 | Vô căn; Phàm nhân | PM07 Y phàm bó xương: tông sư (800 điểm); PM08 Ghi bệnh: hành nghề (200 điểm) | 1.200 đồng; không linh thạch | Một bộ nẹp gỗ, một kéo y dụng, năm băng sạch. Lều chữa và thuốc cấp cho quân thương thuộc trại, nhận theo số bệnh nhân thật |
| NP28 Bùi Ấn; 57/60 | Vô căn; Phàm nhân | PM16 Quan viên: tông sư (800 điểm); PM08 Chép sách: chuyên gia (500 điểm) | 480 đồng; không linh thạch | Một ấn bị bãi hiệu lực, một bản lệnh gốc, một dao nhỏ. Ấn vẫn là chứng cứ vật lý nhưng không cho người giữ quyền ký công lệnh mới |
| NP29 Kha Vọng; 161/300 | Tam Kim–Thủy–Thổ, phẩm Thuần; Kết Đan viên mãn | TU05 Thần thức: tông sư (800 điểm); TU08 Trận pháp: chuyên gia (500 điểm); TU12 Phù: chuyên gia (500 điểm) | 1.200 đồng; 42 linh thạch | Một kính nghe mộng, một bút ghi cộng hưởng, một thẻ khóa cơ LOC15. Thẻ chỉ mở phòng quan trắc; không thay các điều kiện thức tỉnh hoặc quyền vận hành trục |
| NP30 Tịch Âm; không có tuổi sinh học, dấu ghi đã tồn lưu 312 năm khi mở thế giới | Không có linh căn sinh học; không có cảnh giới, không được tính là Phàm nhân có thể cải căn | Không có nghề; thực thể thông tin giới hạn ở ký ức lưu | Không đồng tiền; không linh thạch | Không có túi hoặc đồ rơi. Vật neo là một phiến đá cộng hưởng cố định tại LOC15; phá vật neo chấm dứt lần hiện, mảnh ghi còn lại đi theo quy tắc vật chứng của cốt truyện |

Mỗi dụng cụ trong bảng là một cá thể có mã sở hữu nối NP tương ứng, số lượng đã chốt và trạng thái độ bền dùng định nghĩa vật phẩm chung. Không phát sinh vật phẩm bán được chỉ vì dòng mô tả nhắc đến một căn phòng, một con dấu hoặc một lò. Chỉ quyền sử dụng và quyền sở hữu đã ghi mới quyết định ai được chuyển, bán, phá hoặc để lại di sản. Đồ công phải có chủ thể FA, nơi lưu và biên nhận sử dụng; đồ cướp được vẫn tồn tại nhưng mang dấu truy tìm theo chứng cứ, không tự biến mất để ép người chơi hoàn trả.

#### Năng lực giao tranh và giới hạn dạy nghề của dàn NPC

Các giá trị khí huyết, linh lực, công kích và phòng ngự dưới đây là chỉ số nền trước trang bị, Hành Đạo, năm tháng, thương tật và trạng thái. Chúng đã quy về bộ nền mới của bản đề xuất: Phàm 100 khí huyết, 0 linh lực, 10 công, 10 thủ; Luyện Khí 120/30/12/15; Trúc Cơ 240/60/26/30; Kết Đan 520/120/56/65; Nguyên Anh 1.120/240/122/140; Hóa Thần 2.440/480/266/300; Độ Kiếp 5.200/960/580/650. Chênh lệch cá thể và hậu kỳ được chốt trực tiếp trong từng dòng; không cộng thêm một lần hệ số hậu kỳ đã được phản ánh. Người phàm có linh lực bằng không; tuổi cao có thể đã khiến chỉ số nền thấp hơn người trẻ. Không dùng sức chiến đấu để quyết định ai là quân chủ, chủ nợ, thầy nghề hoặc người được tin.

| Mã | Khí huyết / linh lực / công kích / phòng ngự nền | Ứng xử khi bị tấn công và năng lực có thể truyền |
|---|---|---|
| NP01 | 90 / 0 / 9 / 8 | Chạy về nhà có người, dùng cuốc tự vệ nếu bị chặn; dạy PM01 đến tông sư (800 điểm) khi có ruộng và trải đủ mùa |
| NP02 | 140 / 0 / 15 / 15 | Gọi dân binh rồi giữ cửa rút; dạy PM11 và PM12, không dạy thần thông |
| NP03 | 85 / 0 / 6 / 6 | Bỏ sổ công vào tủ rồi tìm lính gác; dạy chép sách, cách đối chiếu sổ và thủ tục PM16 |
| NP04 | 100 / 0 / 9 / 9 | Tìm đường thoát và gọi cận vệ; không phát sinh lớp bất tử cốt truyện; quyền bổ nhiệm chỉ còn khi có người thực thi |
| NP05 | 90 / 0 / 7 / 7 | Bỏ quầy, gọi hộ vệ đang thuê và chốt kho bằng cơ cấu thật; dạy hợp đồng, định giá và quản hàng PM09 |
| NP06 | 125 / 0 / 13 / 11 | Ưu tiên cho xe thoát, có thể bỏ hàng để cứu người; dạy quản tuyến và kiểm chứng thư |
| NP07 | 70 / 0 / 5 / 5 | Trốn sau tượng, không dùng pháp đèn; dạy đọc bia và khắc chữ phàm |
| NP08 | 95 / 0 / 9 / 8 | Chạy theo lối đã khảo, bỏ bản sao thường để giữ bản gốc; dạy bản dập và truy phả |
| NP09 | 676 / 156 / 72 / 87 | Dùng trận đã bố trí để cầm chân rồi ngừng khi dân bị đe dọa; dạy TU08 đến Kết Đan, TU12 đến Trúc Cơ, TU13 nhập môn |
| NP10 | 138 / 35 / 14 / 15 | Rút về chỗ NP09 nếu đường còn mở; chỉ hỗ trợ bài đo mạch, không tự xưng người dạy TU08 bậc cao |
| NP11 | 120 / 0 / 12 / 10 | Dùng rừng che đường rút, không chiến đấu để bảo vệ mọi cây bằng mạng; dạy khai thác, vận gỗ và giữ lô rừng |
| NP12 | 1.456 / 312 / 159 / 184 | Bảo vệ đường thú rút, có thể bỏ cuộc đàm phán khi bị phục kích; dạy TU07 đến Kết Đan và TU06 đến Trúc Cơ nếu hiệp ước còn hiệu lực |
| NP13 | 1.288 / 276 / 141 / 162 | Dùng huyết ấn và đội hộ vệ thực có, rút về huyết trì nếu chưa bị chiếm; dạy TU03 đến Nguyên Anh sơ kỳ, TU16 đến Trúc Cơ theo giao kèo |
| NP14 | 85 / 0 / 6 / 6 | Giấu phả vào đường thoát rồi tránh giao chiến; chỉ dạy công việc sổ phả, không dạy huyết thuật |
| NP15 | 520 / 120 / 56 / 65 | Cho thú yếu thoát trước; bạn thú tự nguyện chỉ tham chiến nếu khế cho phép; dạy TU07 đến Kết Đan và TU06 đến Trúc Cơ |
| NP16 | 95 / 0 / 8 / 7 | Sơ tán bệnh thú, dùng lối chuồng phụ để trốn; dạy chữa thú bằng y phàm, không chuyển linh khế miễn phí |
| NP17 | 120 / 0 / 12 / 11 | Rời bến khi thuyền an toàn, không tự lao xuống vực vô hạn cứu người; dạy PM17 và PM03 |
| NP18 | 156 / 39 / 16 / 20 | Dùng âm nhiễu nhẹ để gánh chạy, không có thuật diệt thành; dạy TU15 từ nhập môn đến Luyện Khí hậu kỳ và PM15 đến tông sư (800 điểm) |
| NP19 | 360 / 90 / 39 / 47 | Đóng khu bệnh, dùng giải độc và bảo hộ, không công kích nếu có đường rút; dạy TU09, TU10 đến Trúc Cơ, TU14 nhập môn giải độc |
| NP20 | 85 / 0 / 6 / 6 | Bỏ rổ để chạy, chỉ sơ cứu người đã tới chỗ an toàn; hỗ trợ học đồ (50 điểm) y phàm, không là nguồn dạy đan |
| NP21 | 312 / 78 / 34 / 39 | Ngắt lửa và nguồn dẫn trước khi bảo vệ lò; dạy TU11, TU13 đến Trúc Cơ và TU12 nhập môn khắc |
| NP22 | 110 / 0 / 10 / 9 | Rút khỏi xưởng qua cửa nguyên liệu; dạy PM06 đến tông sư (800 điểm) và PM05 nhập môn |
| NP23 | 1.120 / 240 / 122 / 140 | Trấn hồn để mở lối thoát, không coi mọi kẻ xâm nhập là vật liệu; dạy TU04 đến Kết Đan và TU05 đến Trúc Cơ |
| NP24 | 100 / 0 / 9 / 9 | Cố cứu sổ tên rồi trốn, không làm bia biến thành pháp khí; dạy PM06 khắc bia và cách đối chiếu tên |
| NP25 | 288 / 72 / 34 / 39 | Tổ chức đội hình có sẵn, tự nhận chặn hậu nếu còn đường cứu quân; dạy TU01 và TU02 đến Trúc Cơ, PM11 đến tông sư (950 điểm; đang chuẩn bị người kế) |
| NP26 | 105 / 0 / 10 / 8 | Báo trạm, ưu tiên giữ ngựa và thư hơn đánh tay đôi; dạy đường trạm, chăm ngựa thường và bàn giao thư |
| NP27 | 100 / 0 / 9 / 8 | Rút bệnh nhân có thể di chuyển, không tự tái tạo chi; dạy PM07 bó xương đến tông sư (800 điểm) |
| NP28 | 75 / 0 / 5 / 5 | Trốn hoặc thương lượng bằng chứng cứ; ấn hết hiệu lực không triệu quân; dạy đối chiếu văn lệnh và quy trình ấn |
| NP29 | 780 / 180 / 84 / 100 | Chặn đường tới trục rồi rút về phòng quan trắc; dạy TU05 đến Kết Đan, TU08 và TU12 đến Trúc Cơ |
| NP30 | Không có đơn vị giao tranh sinh học | Không được chọn làm mục tiêu để hút máu, hút hồn hoặc farm chiến lợi phẩm. Có thể phá vật neo; mọi lần hiện sau phải kiểm vật neo và giai đoạn kiến thức đã ghi |

Việc học vẫn cần linh căn, căn phù hợp với pháp môn, bậc nghề đầu vào, phí hoặc giao ước, vật tư, thời gian và sự đồng ý của thầy. Mỗi mức cảnh giới nêu ở cột dạy là trần nội dung người ấy trực tiếp hướng dẫn, không phải mức cảnh giới người chơi được cộng ngay. Sau trần ấy, tiến triển dùng nghiên cứu và thư tịch nghề có bản ghi nội dung thật trong catalog; giao diện không quảng cáo một bài học vượt trần chưa được viết.

Một thầy chết để lại sách nếu đã sở hữu sách, học trò nếu đã nhận học trò, hoặc một khoảng trống. Tài sản, tiền, nợ và sách chuyển qua di chúc, pháp luật, khế ước hoặc tranh đoạt cụ thể. Không thay người mới cùng tên, không tạo một bản công pháp thất lạc ở mọi xác để giữ nội dung luôn tiện. Người chơi có thể học từ đồng môn hoặc vật chứng còn lại bằng tuyến thay thế đã viết; ký ức từng biết của người chết không biến thành tri thức công cộng tự động.

#### Hồ sơ tài nguyên và sức duy trì của mười thế lực neo

Nhân lực tính theo những cá thể thuộc biên chế thường xuyên, không đếm khách hàng, bệnh nhân, dân nước khác, người bị bắt hoặc thú nuôi thành thành viên. Các NPC đã định danh và thuộc phe nằm trong tổng này, không cộng thêm một lần. FA10 là đơn vị tài chính riêng khỏi FA01; kinh phí triều chuyển cho quân phải trừ FA01 và cộng FA10 đúng một giao dịch. Người có nhiều quan hệ chỉ có một nơi nhận lương chính trong một kỳ; hợp đồng phụ là giao dịch riêng.

Một khẩu-ngày là đủ thức ăn cho một người một ngày, tương đương hiệu lực khẩu phần của VT-HD01, không phải một bữa cháo VT-HD05. Kho lương lưu theo lô, hạn, chủ và nơi chứa; tổng dưới đây chỉ là sổ gộp. Nước lấy từ nguồn địa phương có công suất và chất lượng, không tự trừ vào lương. Không cấp mọi kho một bản sao dự trữ giống nhau. Số người ở cấp bậc tu luyện thể hiện số cá thể thật phải có trong dân số đã sinh, có tuổi và lịch, không phải số lượt kẻ địch được phép hồi sinh.

| Mã | Người phàm / tu sĩ; phân bố cảnh giới trong số tu sĩ | Kho đồng / linh thạch | Kho khẩu-ngày; nghĩa vụ đang có |
|---|---|---|---|
| FA01 Lương triều | 1.260 / 18; 14 Luyện Khí, 4 Trúc Cơ | 12.000.000 đồng; 600 linh thạch | 150.000; không gồm kho quân FA10. Nợ FA02 2.400.000 đồng, kỳ đến sau sáu tháng; không bắt người chơi trả bằng tiền cá nhân |
| FA02 Vạn Bảo | 240 / 24; 18 Luyện Khí, 5 Trúc Cơ, 1 Kết Đan | 8.400.000 đồng; 1.200 linh thạch | 32.000; giữ khoản phải thu từ FA01 2.400.000 đồng và FA08 1.600.000 đồng; khoản phải thu không được tiêu như tiền mặt trước khi thu |
| FA03 Huyền Cơ | 66 / 42; 28 Luyện Khí, 10 Trúc Cơ, 3 Kết Đan, 1 Nguyên Anh | 2.200.000 đồng; 800 linh thạch | 16.000; dành 180 linh thạch trong tổng kho cho kỳ thay vật dẫn sau ba tháng, không phải kho thứ hai |
| FA04 Liên Thôn | 480 / 2; 2 Luyện Khí | 480.000 đồng; 8 linh thạch | 35.000 khẩu-ngày thực phẩm và kho hạt giống sống có năng lượng tương đương 10.000 khẩu-ngày nếu đem nấu; hạt giống chưa chế biến, không phải VT-HD01. Dùng hạt giống cứu đói phải xay nấu và mất khả năng gieo vụ sau; được phép chọn sau biểu quyết hoặc cưỡng đoạt, hậu quả mùa sau có thật |
| FA05 Huyết Sát | 84 / 65; 40 Luyện Khí, 18 Trúc Cơ, 6 Kết Đan, 1 Nguyên Anh | 3.000.000 đồng; 1.500 linh thạch | 24.000; nguồn máu có sổ hiến và bảo quản riêng, không quy đổi lương thành máu bằng một tỷ lệ tự động |
| FA06 Vạn Thú | 72 / 48; 34 Luyện Khí, 11 Trúc Cơ, 3 Kết Đan | 2.400.000 đồng; 900 linh thạch | 22.000; có 20 thú nuôi thường trú, tiêu thêm tổng 800 khẩu-ngày tương đương mỗi tháng, nguồn thức ăn hợp loài lưu theo chuồng |
| FA07 Bách Thảo | 92 / 22; 16 Luyện Khí, 5 Trúc Cơ, 1 Kết Đan | 1.800.000 đồng; 400 linh thạch | 24.000; có 20 giường nhận bệnh nhân ngoài biên chế, dự phòng đủ 600 khẩu-ngày mỗi tháng khi kín giường |
| FA08 Hàn Thiết | 360 / 18; 13 Luyện Khí, 4 Trúc Cơ, 1 Kết Đan | 1.400.000 đồng; 250 linh thạch | 36.000; nợ FA02 1.600.000 đồng, kỳ trả đầu sau ba tháng, quyền mỏ là tài sản bảo đảm có tranh chấp |
| FA09 Lạn Kha | 48 / 16; 10 Luyện Khí, 4 Trúc Cơ, 1 Kết Đan, 1 Nguyên Anh | 480.000 đồng; 500 linh thạch | 14.000; có 20 chỗ tạm trú, dự phòng thêm 600 khẩu-ngày mỗi tháng khi kín chỗ |
| FA10 Bắc Phong | 2.200 / 36; 28 Luyện Khí, 7 Trúc Cơ, 1 Kết Đan | 4.800.000 đồng; 300 linh thạch | 270.000; có 200 ngựa quân, cần thêm tổng 24.000 khẩu-ngày tương đương cỏ hạt mỗi tháng. Kho khẩu-ngày gồm 210.000 cho người và 60.000 thức ăn ngựa, hai loại không thay thế nhau |

Giới hạn tổng quân hoặc tổng tín đồ không sinh thêm vật phẩm, tu sĩ và lương khi thế lực bị hao hụt. Tuyển người cần người còn sống có thể rời nơi cũ, trả công, đào tạo và chấp nhận đi; không tuyển mới từ số không mỗi tháng. Đột phá của thành viên phải tiêu thời gian, vật tư và thọ nguyên, có khả năng thất bại; số Trúc Cơ hoặc Kết Đan không giữ nguyên bằng cách thay xác mất bằng một bản sao.

#### Mức chi và thời gian cầm cự

Chi đồng gồm tiền công cùng chi phí vận hành trả bằng đồng; cột lương là hiện vật đã lưu, không tính mua lương hai lần. Chi linh thạch gồm hoạt động tu giới, trận, dược hoặc khế của phe, không tự phân cho từng NPC làm tiền cá nhân. Khi bắt đầu một giao dịch mua lương, phải trừ đồng hoặc vật trao đổi từ phe và nhận lô lương từ bên bán có tồn thực tế. Số tháng cầm cự là trong tình huống ngừng toàn bộ thu mới, chưa chiến tranh, không bị cướp và không chủ động hạ khẩu phần; không phải dự báo phe chắc chắn sống đúng số tháng đó.

| Mã | Chi đồng/tháng, trong đó tiền công | Chi linh thạch/tháng | Khẩu-ngày/tháng khi đầy biên chế | Cầm cự trọn tháng bằng nguồn đang có; điểm dễ gãy |
|---|---|---|---|---|
| FA01 | 1.600.000; tiền công 1.120.000 | 30 | 38.340 | Ba tháng; thiếu lương trước thiếu đồng nếu bị cắt đường, khoản nợ tới hạn làm áp lực tăng sau tháng sáu |
| FA02 | 960.000; tiền công 360.000 | 80 | 7.920 | Bốn tháng; thiếu lương nếu không vận được hàng, khoản phải thu không cứu đói trước khi thu |
| FA03 | 360.000; tiền công 200.000 | 60 | 3.240 | Bốn tháng; mất nguồn thay vật dẫn có thể khiến phải tắt nhánh trận dù người vẫn đủ ăn |
| FA04 | 120.000; tiền công việc chung 40.000 | 1 | 14.460 | Ba tháng nếu xay nấu cả hạt giống có năng lượng tương đương 10.000 khẩu-ngày; chỉ hai tháng trọn nếu giữ giống và chỉ dùng kho thực phẩm 35.000; nấu giống làm mất nguồn gieo vụ sau |
| FA05 | 500.000; tiền công 240.000 | 100 | 4.470 | Năm tháng; lương gãy trước linh thạch, thiếu huyết hiến hợp lệ không được tự rút dân làm nguyên liệu |
| FA06 | 400.000; tiền công 200.000 | 65 | 4.400 gồm 3.600 cho người và 800 cho thú | Năm tháng; mất sinh cảnh làm chi nuôi thú tăng theo các chuồng thật |
| FA07 | 360.000; tiền công 220.000 | 50 | 4.020 gồm 3.420 cho biên chế và 600 dự phòng bệnh nhân | Năm tháng; giữ miễn phí toàn bộ giường nhưng không có nguồn bù sẽ cạn đồng trước khi cạn thuốc dự trữ |
| FA08 | 560.000; tiền công 400.000 | 25 | 11.340 | Hai tháng; tiền công và nợ mỏ là điểm gãy, không thể lấy quặng chưa bán để trả lương như tiền mặt |
| FA09 | 120.000; tiền công 60.000 | 20 | 2.520 gồm 1.920 cho biên chế và 600 dự phòng tạm trú | Bốn tháng; thiếu đồng duy tu trước lương, có thể dừng sao sách để kéo dài nhưng mất sản lượng sách |
| FA10 | 2.000.000; tiền công 1.400.000 | 40 | 91.080 gồm 67.080 cho người và 24.000 cho ngựa | Hai tháng; cả tiền công và lương gần giới hạn, thiếu thức ăn ngựa không được bù bằng cho người nhịn nước |

Nguồn thu bình thường là hoạt động phải thật sự diễn ra: FA01 thuế và công sản; FA02 lợi nhuận giao dịch, vận chuyển và thu nợ; FA03 hợp đồng trận và hỗ trợ đồng thuận; FA04 nông vụ, ngư và lâm sản; FA05 dược huyết có nguồn, hộ vệ và thu nội bộ; FA06 chăm thú, khế và bảo vệ tuyến rừng; FA07 khám chữa, dược và đan; FA08 quặng, sửa và rèn; FA09 sao sách, lưu trữ và cúng dường; FA10 khoản cấp đã chuyển từ FA01, hợp đồng bảo vệ và sản xuất quân điền. Không cấp khoản thu cố định cho một phe sau khi ruộng bị đốt, đường bị chặn, khách không đến, người đóng thuế chết hoặc bên trả đã phá sản. Người chơi có thể khai thác điểm yếu bằng công phá kinh tế; hệ thống phải ghi hậu quả dân sinh và các phản ứng phe thật.

Để tránh đếm hai lần: tiền công chuyển thành tiền của người nhận; khẩu phần tiêu thụ biến thành nhu cầu đã đáp ứng; phần thuế chuyển khỏi hộ hoặc kho cấp dưới; linh thạch tiêu cho trận bị trừ khỏi kho chứ không đồng thời nằm trong túi trưởng lão. Khi phe giải thể, tài sản chuyển sang những chủ mới, bị phá, bị cướp hoặc bỏ lại tại địa điểm; không trả về số khởi tạo khi đổi cờ chủ sở hữu.

#### Khuynh hướng và quan hệ có hướng

Khuynh hướng ở bảng là chuẩn ứng xử phe quảng bá và thường thi hành trong thời kỳ mở đầu, tách khỏi Hành Đạo của từng cá nhân. Nó ảnh hưởng điều kiện hợp đồng, lễ nghi, mức chấp nhận phương pháp và luật nội bộ; không cộng Chính hoặc Tà cho người chơi chỉ vì gia nhập. Không phe nào được miễn ghi nghiệp khi cưỡng đoạt, cũng không phe nào bị mặc định có tội vì huyết thuật, nghề nghiệp hoặc dòng máu.

| Mã | Khuynh hướng được quảng bá | Mâu thuẫn nội bộ bắt buộc tồn tại |
|---|---|---|
| FA01 | Chuộng chính danh, giữ trật tự và lời vua | Một nhánh bảo vệ dân và sổ thật; một nhánh dùng thuế, án và quân dịch để giữ quyền |
| FA02 | Chuộng khế ước, trung lập về phe khách | Một nhánh giữ chữ tín kể cả lỗ; một nhánh mua quyền trên kẻ yếu và che nguồn hàng |
| FA03 | Chuộng bảo hộ và nghi lễ chính tông | Một nhánh sửa trận không hiến người; một nhánh che bảng tên để giữ hệ thống cũ |
| FA04 | Chuộng tương trợ nhưng đề phòng người ngoài | Một nhánh chia kho và giữ giống; một nhánh đẩy thiệt hại sang hộ lưu dân để cứu họ mình |
| FA05 | Chấp nhận cấm thuật và đặt huyết hệ cao | Một nhánh dùng hiến tự nguyện, giữ giao ước; một nhánh săn người và chiếm thân thể |
| FA06 | Chuộng khế tự nguyện và bảo vệ sinh cảnh | Một nhánh chữa, dưỡng và thả; một nhánh coi đàn thú là nguồn lợi độc quyền cần kiểm soát |
| FA07 | Chuộng cứu chữa theo y pháp | Một nhánh mở bệnh xá cho người nghèo; một nhánh độc quyền phương, đặt giá và chọn ca có lợi |
| FA08 | Chuộng nghĩa thợ và trả công đúng | Một nhánh giữ an toàn và truyền nghề; một nhánh bán khế lao động để trả nợ lò |
| FA09 | Chuộng trấn tâm, tưởng niệm và không cưỡng hồn | Một nhánh lưu sự thật; một nhánh niêm sách và chôn chứng cứ vì sợ chiến tranh |
| FA10 | Chuộng kỷ luật và lời thề bảo vệ biên dân | Một nhánh cứu quân dân kể cả trái lệnh; một nhánh hy sinh dân hoặc tự trị bằng quân luật |

Quan hệ khởi tạo dùng điểm nội bộ từ trừ một trăm đến cộng một trăm, không dùng chung với Hành Đạo hoặc Nghiệp Duyên. Cạnh có hướng: FA01 nhìn FA02 khác FA02 nhìn FA01. Các cạnh có nội dung dưới đây là cạnh cốt lõi của niên biểu; các cặp còn lại khởi tạo bằng không, có nghĩa chưa có quan hệ trực tiếp đáng kể được ghi chứ không phải bí mật ghét hoặc yêu. Khi một phe bị xóa, cạnh chuyển vào sử ký, không ép phe mới thừa kế nguyên thái độ chỉ vì chiếm cùng địa điểm.

| Bên nhìn → bên được nhìn | Điểm nội bộ | Nguyên nhân đã tồn tại |
|---|---|---|
| FA01 → FA02 | -35 | Nợ và quyền mỏ đe dọa quyền trị |
| FA02 → FA01 | +20 | Triều là khách lớn còn có tài sản bảo đảm |
| FA01 → FA10 | +55 | Cần quân giữ biên và đường thuế |
| FA10 → FA01 | -10 | Khoản cấp trễ và mệnh lệnh giữ quân quá hạn |
| FA01 → FA04 | +15 | Cần lương và sức dân trong vùng |
| FA04 → FA01 | -20 | Thuế, quân dịch và sổ hộ thiếu minh bạch |
| FA02 → FA08 | +30 | Quyền mỏ và khoản phải thu có lợi |
| FA08 → FA02 | -60 | Khế bảo đảm có thể lấy lò và đất thợ |
| FA02 → FA05 | +15 | Giao dịch có lãi nhưng nguồn hàng khó kiểm |
| FA05 → FA02 | +35 | Thương Hội vẫn bán thuốc, giữ đường ra ngoài |
| FA03 → FA09 | -25 | Lo thư khố công khai lỗi trận Ngũ Tổ |
| FA09 → FA03 | -40 | Nhiều hồ sơ người chết bị Trận Các giữ kín |
| FA03 → FA07 | +10 | Cần dược và hỗ trợ sửa mạch người vận trận |
| FA07 → FA03 | -15 | Phải chữa nhiều hậu quả của vật dẫn sống |
| FA04 → FA06 | +25 | Thỏa thuận giữ rừng và điều thú giảm thiệt hại |
| FA06 → FA04 | +10 | Có thể thương lượng nhưng một số hộ còn săn quá mức |
| FA05 → FA06 | -20 | Tranh quyền lấy huyết từ thú có linh trí |
| FA06 → FA05 | -50 | Có bằng chứng một nhánh Huyết Sát cưỡng lấy thú |
| FA07 → FA05 | +5 | Có thể nghiên cứu huyết trị liệu với người đồng thuận |
| FA05 → FA07 | +20 | Bệnh xá giữ mạng và không cấm chữa chỉ vì huyết hệ |
| FA07 → FA08 | +30 | Lò cung cấp y cụ và đường dược qua núi |
| FA08 → FA07 | +50 | Nhiều thợ đã được cứu sau tai nạn mỏ |
| FA09 → FA10 | +25 | Quân cung cấp danh sách trận vong có đối chứng |
| FA10 → FA09 | +15 | Có nơi gửi tro và tên người mất, nhưng không muốn mọi lệnh cũ bị công khai |

Nhãn người chơi thấy cho quan hệ phe: từ -100 đến -61 là “Đối địch”; -60 đến -21 là “Hiềm khích”; -20 đến +20 là “Dè chừng”; +21 đến +60 là “Có thể nương tựa”; +61 đến +100 là “Liên minh sâu”. Không hiển thị con số ở mặt trận xã hội chính; trang biên tập và kiểm tra nội bộ giữ số để truy nguyên. Đây là thang ngoại giao riêng; nó không thay nhãn Hành Đạo và không hứa một phe có thiện cảm sẽ hy sinh mọi lợi ích cho người chơi.

#### Cạn nguồn, kế nhiệm và diệt phe

Mỗi kỳ tháng, phe quyết toán tài nguyên thực trước khi nhận biến cố. Thiếu tiền một kỳ: chậm trả công và đóng tuyển; hai kỳ liên tiếp: người được nợ có thể bỏ đi theo quan hệ, khế và nơi sinh kế thật. Thiếu lương: phân bổ khẩu phần theo luật phe đang có, ghi đúng ai nhận thiếu; không giảm một biến trừu tượng rồi giữ toàn bộ dân vẫn khỏe. Hết linh thạch: lần lượt ngừng hợp đồng hoặc cơ sở tiêu thụ do người điều hành chọn, không làm mọi tu sĩ chết ngay và cũng không vận hành đại trận miễn phí.

Khi trưởng phe chết, hội đồng gồm những người giữ quyền đang còn sống chọn người kế nhiệm trong ba mươi ngày; đang bị công phá thì chỉ đặt người điều hành tạm, không tạm dừng chiến tranh. Nếu không còn ứng viên có điều kiện, phe phân rã thành nhóm có tài sản và quan hệ thật. Các chức vua, chủ lò, chủ cốc hoặc chỉ huy có thể thuộc người phàm, tu sĩ yếu hơn thuộc cấp hoặc người chơi; sức tu luyện cao không tự chuyển giao khế, thuế và lòng trung thành.

Một phe bị coi đã bị diệt khi mất mọi cơ sở hoạt động, không còn cơ cấu nhận lệnh và không có nhóm lưu vong giữ quyền đại diện. Người dân sống sót vẫn là người sống; không xóa họ để làm đẹp dòng “đã diệt phe”. Người chơi có thể tiêu diệt nhân sự hoặc phong tỏa kinh tế, chiếm tài sản và được lợi thật; sổ hậu quả vẫn giữ ai đã chết, ai lưu vong, ai mất nguồn sống và ai hưởng lợi. Không tự tái lập phe, hồi sinh cast hoặc khởi tạo lại kho theo chu kỳ để duy trì số lượng đối thủ.

---

<a id="su-kien"></a>

### 8. Mười hai sự kiện nhân sinh hoàn chỉnh

Các hồ sơ EV01–EV12 dưới đây là nội dung được đề nghị đưa vào bản phát hành đã xác định phạm vi; chúng không phải dữ liệu chạy thử. Tên địa điểm tham chiếu danh mục LOC của chương thế giới. Chi phí bằng đồng tiền phàm hoặc linh thạch được ghi tách biệt; không tự quy đổi hai loại tiền. Một ngày tính bằng hai mươi bốn giờ thế giới. Tiền thưởng, tiền phạt và thời gian vẫn có số trong dữ liệu và giao diện sự kiện; riêng Hành Đạo, Nghiệp Duyên chỉ dùng từ ngữ.

Quy tắc dùng chung cho cả mười hai hồ sơ:

- Mỗi hồ sơ chỉ mở một lần trong một đời. Khi chấp nhận một lựa chọn, phải ghi ngay lựa chọn, tài nguyên bị trừ, hậu quả chờ và dấu đã kết thúc; đóng hộp thoại hoặc tải lại không tạo lựa chọn mới. Từ chối chưa nhận việc chỉ tiêu thụ thời gian nếu dòng lựa chọn ghi rõ.
- Sự kiện đang xử lý không xuất hiện trong bảng bốc sự kiện. Không trả lại phần thưởng nếu đổi nghề, rời địa điểm rồi quay lại hoặc qua năm mới. Hậu quả trễ có mã riêng và chỉ quyết toán một lần.
- Những người qua đường không phải NPC bất tử. Vai trò NPC được gắn với một người có tên, tuổi, nơi ở và quan hệ trong đời đang chơi. Nếu người đó chết trước khi kích hoạt, sự kiện chưa mở được thay bằng hồ sơ di vật cùng sự thật; không dựng lại người chết. Nếu đã nhận việc, hậu quả chuyển theo quy tắc của từng hồ sơ.
- Dấu Nghiệp Duyên lưu người chịu tác động, nguyên nhân, mức tổn hại hoặc trợ giúp, ý định đã được lựa chọn, điều người chơi biết khi lựa chọn và khả năng khắc phục. Dấu Hành Đạo phản ánh phương thức hành xử. Danh tiếng, truy nã và thái độ phe là hậu quả xã hội có nhân chứng; chúng không dùng chung một biến với hai thước đo trên.
- Không rút thưởng vì người tốt gặp nạn. Không cộng nghiệp hại chỉ vì một kết quả mà người chơi không thể biết trước. Lựa chọn chưa mở do thiếu tiền, học vấn, địa vị hoặc pháp môn phải ghi rõ điều kiện, không đổi thành lựa chọn thành công miễn phí.
- Hồi âm kiếp sau là một quan hệ hoặc hoàn cảnh có nguyên nhân, không phải lời hứa chắc chắn về phần thưởng. Mỗi dấu hồi âm chỉ được gọi một lần ở kiếp kế tiếp đủ điều kiện; khi chưa có điều kiện, giữ nguyên trong sổ nghiệp thay vì sinh nhiều bản sao.

#### EV01 — Bàn tay run dưới dốc núi

**Địa điểm và điều kiện:** đường rìa LOC06 Đoạn Tùng Lâm; nhân vật đã trưởng thành, có ít nhất hai mươi đồng, không giao chiến, chưa có dấu kết thúc EV01. Vai trò duy nhất: bà lão hành khất. Nếu không có NPC phù hợp còn sống thì hồ sơ chưa kích hoạt.

**Lời dẫn:** Bà lão ngồi dưới gốc thông, chiếc dép cỏ đứt quai nằm trong lòng. Bà nhờ ngươi đưa xuống trấn; bàn tay run rẩy níu áo, còn mắt không nhìn con đường. Mặt trời đã sát sườn núi, một chuyến đi nữa sẽ làm ngươi lỡ phiên chợ.

**Thông tin trước lựa chọn:** nhìn kỹ thấy bà có đôi giày lành giấu trong tay nải và đang để ý túi tiền. Nhân vật nào cũng được chọn quan sát; không khóa manh mối sau chỉ số thần thức. Bà thực sự mỏi chân, đồng thời thực sự có ý trộm.

| Lựa chọn | Chi phí và kết quả ngay | Hành Đạo; Nghiệp Duyên | Hậu quả trễ |
|---|---|---|---|
| Cõng bà xuống trấn | Bốn giờ; bà trộm đúng mười đồng khi được đặt xuống, chạy vào ngõ; hoàn thành việc cứu giúp | Phương thức chính tăng nhẹ; trợ giúp nhẹ cho bà, không ghi nghiệp hại cho người chơi | Sau bảy ngày, có thể thấy mười đồng bị dùng trả một phần tiền trọ. Không hoàn tiền tự động. Dấu hồi âm là người từng được cứu nhớ một cử chỉ, không cấp linh căn |
| Buộc chặt túi tiền rồi dìu bà đi | Năm giờ; giữ nguyên tiền, bà không lấy được; được biết sự thật khi bà buột miệng chửi | Phương thức chính tăng nhẹ; trợ giúp nhẹ, việc đề phòng không bị coi là thất đức | Sau bảy ngày, bà tránh giao dịch riêng với người chơi nhưng vẫn xác nhận từng được giúp nếu có người hỏi |
| Chỉ đường rồi tiếp tục công việc | Không mất giờ bổ sung hoặc tiền; bà tự tìm người khác | Không đổi Hành Đạo; không sinh nghiệp hại vì từ chối một yêu cầu giúp đỡ thông thường | Sau một ngày, bà đã xuống núi bằng người qua đường; không dựng lời kết tội người chơi |

**Nhân chứng và xử lý mất NPC:** người ở cổng trấn chỉ chứng kiến đoạn đến nơi, không biết túi tiền bị trộm. Nếu bà chết sau khi lấy tiền, mười đồng nằm trong di vật của bà; có thể lấy lại nhưng không nhận lại dấu trợ giúp lần nữa. Không có nhánh hành quyết miễn phí được gắn vào lựa chọn đòi tiền.

#### EV02 — Hổ đói bên đàn hươu

**Địa điểm và điều kiện:** LOC06 Đoạn Tùng Lâm, ban ngày; chưa kết thúc EV02; quần thể hươu chưa bị xóa do săn quá mức. Không cần linh căn. Vai trò duy nhất: người kiểm lâm địa phương.

**Lời dẫn:** Một con hổ già ép đàn hươu vào khe đá. Con hươu nhỏ bị mắc chân, những con lớn vẫn quanh quẩn không chạy. Dưới tán lá, một ổ hổ con đã lạnh từ trước khi ngươi đến.

**Thông tin trước lựa chọn:** hổ đang đói, hươu đang bị đe dọa; người kiểm lâm cho biết đây là con hổ trưởng thành cuối cùng trong khoảnh rừng. Giết nó cứu đàn hươu trước mắt nhưng làm tăng sức ép hươu ăn mạ năm sau. Không có quỷ hổ ẩn mình để biến lựa chọn thành một bài thi thiện ác.

| Lựa chọn | Chi phí và kết quả ngay | Hành Đạo; Nghiệp Duyên | Hậu quả trễ |
|---|---|---|---|
| Đặt bẫy giết hổ, mở lối cho hươu | Ba mươi đồng mua bẫy và mồi, hai mươi bốn giờ; hổ chết, hươu thoát; nhận đúng một miếng da hổ cũ: vật liệu phàm, chiếm một ô, không hiệu lực chiến đấu, giá bán mười tám đồng, quyền sở hữu chuyển từ xác thú sang người thu rồi sang bên mua khi bán | Không tự tăng tà vì giết thú; ghi cứu giúp nhẹ cho đàn hươu, chấm dứt một sinh mạng tự nhiên không tự thành sát nghiệp có chủ ý hại người | Mùa gieo kế tiếp, ruộng giáp rừng có nạn hươu ăn mạ nhẹ; người chơi có thể làm hàng rào bằng hoạt động nghề nông, không bắt buộc nhận một nhiệm vụ chuộc lỗi |
| Dùng lửa và tiếng động xua hổ về khe khác | Mười hai đồng mua dầu, sáu giờ; cả hai bầy sống; không có chiến lợi phẩm | Hành Đạo không đổi; ghi tránh tổn hại nhẹ | Sau ba mươi ngày có một tin hổ đến gần chuồng dê; báo trước địa điểm để cư dân phòng bị. Không tự trừ nghiệp duyên vì thú sống tiếp |
| Đi tiếp và báo vị trí cho kiểm lâm | Hai giờ, không mất tiền; người kiểm lâm đóng lối mòn một ngày, đàn hươu mất một con trước khi tản ra | Không đổi Hành Đạo; ghi cung cấp thông tin có ích nhẹ, không gán tội giết hươu | Lối mòn mở lại sau một ngày; chuỗi này kết thúc, không lặp để lấy công báo tin |

**Nhân chứng và xử lý mất NPC:** không có người chứng kiến thì không tăng danh tiếng công khai. Nếu kiểm lâm chết, bảng gỗ cảnh báo ở lối rừng tiếp nhận báo tin; không sinh kiểm lâm thay thế tức thời. Quần thể thú được cập nhật một lần, không nhân đôi da hổ khi khai thác xác.

#### EV03 — Kho lương khóa giữa mùa đói

**Địa điểm và điều kiện:** LOC01 Thanh Khê Thôn; đồng hồ mất mùa đã chạm mức thiếu ăn, kho lương còn ít nhất ba trăm suất, chưa kết thúc EV03. Vai trò duy nhất: chủ kho lương.

**Lời dẫn:** Cửa kho còn nguyên khóa sắt, trước cửa là những bàn tay không đủ sức gõ. Chủ kho chỉ vào giấy nợ và nói lương đã có người mua từ tháng trước. Trong thôn, bếp tắt sớm hơn mọi năm.

**Thông tin trước lựa chọn:** một trăm suất thuộc hợp đồng quân lương; hai trăm suất còn lại chủ kho đang chờ tăng giá. Lính giữ kho sẽ bị hỏi tội nếu thiếu lương mà không có chứng từ. Ba lựa chọn đều công bố hậu quả này trước khi xác nhận.

| Lựa chọn | Chi phí và kết quả ngay | Hành Đạo; Nghiệp Duyên | Hậu quả trễ |
|---|---|---|---|
| Mua hai trăm suất cứu đói | Bốn trăm đồng, bốn giờ; cấp đủ hai trăm suất trong ngày, quân lương không đổi | Chính tăng nhẹ; trợ giúp vừa cho người nhận, không xóa bất kỳ nghiệp hại cũ nào | Sau ba mươi ngày, bốn hộ thoát bán con trả nợ; chủ kho giàu lên, người chơi không nhận lại tiền |
| Trộm hai trăm suất và để lại giấy nhận trách nhiệm | Mười hai giờ, hai mươi đồng dụng cụ; lương được phát đủ, người chơi bị nhận diện là thủ phạm, lính giữ kho được miễn tội | Tà tăng nhẹ do chủ động chiếm tài sản không có sự đồng thuận, không phải chỉ vì phá luật; trợ giúp vừa cho dân, tổn thất tài sản nhẹ đối với chủ kho được ghi riêng | Sau ba ngày có lệnh truy tìm địa phương; sau một mùa dân có thể che chở nhưng không xóa lệnh bằng lời cảm ơn. Kiếp sau có thể gặp một món nợ ân tình từ người được cứu |
| Dùng công lệnh trưng mua | Chỉ mở cho quan viên có quyền trưng mua; hai trăm đồng ngân quỹ do người chơi đang quản, tám giờ; cấp hai trăm suất, lập biên nhận cho chủ kho | Chính tăng nhẹ; trợ giúp vừa, nghĩa vụ bồi hoàn còn tồn tại | Sau ba mươi ngày phải giải trình công quỹ. Không có ngân quỹ thì lựa chọn bị khóa; không tạo hai trăm đồng từ hư không |

**Nhân chứng và xử lý mất NPC:** việc phát lương có dân nhận ký hoặc điểm chỉ. Nếu chủ kho chết sau khi nhận tiền, hợp đồng thuộc người thừa kế; nếu kho cháy trước khi nhận việc, sự kiện chuyển sang cứu đói bằng hệ thống sinh kế, EV03 không được coi đã cứu thành công. Không tạo thêm lương qua việc đổi chủ kho.

#### EV04 — Khế ước dưới biển chính tông

**Địa điểm và điều kiện:** LOC05 Huyền Cơ Trận Các; nhân vật biết chữ hoặc đã trả năm đồng đọc hộ hồ sơ, chưa kết thúc EV04, sáu đệ tử còn trong lịch điều chuyển. Vai trò duy nhất: quản sự tuyển đệ tử.

**Lời dẫn:** Trên văn thư, sáu người được đưa đi học cách trấn giữ địa mạch. Dưới phụ lục là khoản tiền trả theo số năm thọ nguyên còn lại. Chuông giảng đạo vẫn ngân đều bên ngoài phòng giấy.

**Thông tin trước lựa chọn:** đây là một giao dịch thật, không phải bài kiểm tra lòng trung thành; người được điều chuyển sẽ phải nuôi trận bằng tuổi thọ. Hồ sơ nêu rõ còn bốn ngày trước chuyến xe đầu tiên. Danh xưng chính tông không đảm bảo hành vi vô hại.

| Lựa chọn | Chi phí và kết quả ngay | Hành Đạo; Nghiệp Duyên | Hậu quả trễ |
|---|---|---|---|
| Mua chuộc người đánh xe, đưa cả sáu người trốn | Sáu mươi đồng, hai ngày; giải thoát sáu người; mất quyền dùng kho sách của Trận Các trong đời hiện tại | Chính tăng nhẹ vì chịu giá bảo vệ người bị cưỡng ép; không tăng Tà chỉ vì bí mật phá khế cưỡng bức. Ghi trợ giúp vừa cho sáu người, không ghi nghiệp hại vì tông môn mất nguồn tuổi thọ cưỡng ép | Sau bảy ngày quản sự phát lệnh tìm người; người trốn chia thành nhóm, không biến thành sáu tùy tùng miễn phí |
| Sao chứng cứ và kiện qua công đường | Bốn mươi đồng, bốn ngày; chứng cứ được thụ lý, năm người được giữ lại, một người đã bị đưa đi trước giờ đình chỉ | Chính tăng vừa; trợ giúp vừa, không phạt nghiệp cho người đi mất vì độ trễ đã công bố | Sau ba mươi ngày quyền thu thọ nguyên bị đình chỉ; quan hệ với ban quản sự xấu đi, quan hệ với các gia đình được cứu tốt lên |
| Nhận tiền giữ im lặng | Hai giờ; nhận một trăm hai mươi đồng và quyền đọc một tầng sách phổ thông trong một năm; sáu người bị đưa đi | Tà tăng vừa vì chủ động nhận lợi từ tổn hại đã biết; ghi đồng lõa tổn hại nặng. Uy tín với quản sự tăng riêng, không biến thành Chính | Sau sáu tháng thân nhân của một đệ tử đến tìm; có thể bồi thường hoặc tiếp tục từ chối trong hệ quan hệ. Tiền thưởng đã tiêu không bị hoàn tác |

**Nhân chứng và xử lý mất NPC:** chứng cứ có dấu quản sự, không phụ thuộc việc quản sự còn sống; giết quản sự không hủy bản sao ở kho. Nếu sáu người chết trước khi hoàn tất giải cứu, chuyển mục tiêu sang xác minh và ghi tên người chết, không trao phần thưởng cứu người. Cờ chuyến xe và trạng thái từng người ngăn sự kiện tự phục hồi.

#### EV05 — Huyết thuật trước cửa cách ly

**Địa điểm và điều kiện:** LOC10 Bách Thảo Cốc; dịch bệnh đã được xác định, năm mươi bệnh nhân còn sống, có thầy thuốc biết huyết thuật và hồ sơ phương thuốc chứng minh hiệu lực. Vai trò duy nhất: thầy thuốc huyết thuật. Chưa kết thúc EV05.

**Lời dẫn:** Ngoài cổng cốc, người bệnh buộc chuông vào tay để người nhà biết khi nào họ còn cử động. Thầy thuốc trải một tờ phương thuốc đỏ sẫm: thứ thuốc này cứu được phổi đã mục, nhưng cần tuổi thọ người đang sống. Những người lên án hắn đứng ở bên kia hàng rào cách ly.

**Thông tin trước lựa chọn:** dùng người tự nguyện chịu giá phải trả khác với cưỡng ép; nhãn tà pháp không thay thế sự thật đó. Một năm thọ nguyên là mức phải trả đã xác minh, không hứa có thể lấy lại. Phương pháp cách ly thông thường cứu được ít hơn nhưng không cần huyết tế.

| Lựa chọn | Chi phí và kết quả ngay | Hành Đạo; Nghiệp Duyên | Hậu quả trễ |
|---|---|---|---|
| Tự nguyện hiến huyết và thọ nguyên | Chỉ mở khi thọ nguyên còn lại lớn hơn một năm cộng hai ngày nghi thức và khí huyết hiện tại lớn hơn chi phí máu; hai ngày, ba mươi đồng dược liệu; trừ một năm khỏi hạn sống và trừ lượng máu bằng 5% khí huyết tối đa, làm tròn lên. Thiếu điều kiện thì không bắt đầu, không trừ gì; giá máu không được làm người chơi chết. Cứu cả năm mươi người | Chính tăng nhẹ vì tự nguyện chịu giá để cứu người; pháp bị cấm chỉ ảnh hưởng danh tiếng và pháp luật; trợ giúp nặng, không ghi nghiệp hại vì tự chịu giá có hiểu biết | Mười ngày sau người chơi suy nhược nhẹ trong ba ngày; dân được cứu biết ơn, cơ quan cấm thuật có thể điều tra nếu có nhân chứng. Tuổi thọ mất đi là vĩnh viễn |
| Cưỡng ép một tù nhân hiến huyết | Hai ngày, ba mươi đồng; cần một tù nhân có thật với thọ nguyên và khí huyết đáp ứng cùng điều kiện an toàn nghi thức, không tự sinh người hiến. Người chơi không mất tuổi thọ hoặc khí huyết; cứu năm mươi người; tù nhân mất một năm thọ nguyên và lượng máu bằng 5% khí huyết tối đa, làm tròn lên | Tà tăng vừa; trợ giúp nặng và xâm hại vừa được lưu riêng, người được cứu không xóa quyền oán của tù nhân | Sau ba mươi ngày xuất hiện đơn tố cáo nếu tù nhân sống và tiếp cận công đường; kiếp sau có thể sinh quan hệ nợ thọ, không bắt buộc xuất thân vô căn |
| Chọn cách ly và thuốc thường | Mười ngày, năm mươi đồng; cứu bốn mươi người, mười người không qua khỏi; không mất thọ nguyên người chơi | Chính tăng nhẹ do theo y pháp được cho phép; trợ giúp vừa, không tạo nghiệp hại chỉ vì không chọn hy sinh tuổi thọ | Sau một mùa mở lại cổng cốc; gia đình người chết có tang và gia đình người sống có ơn, cả hai nhóm tồn tại trong cùng một đời |

**Nhân chứng và xử lý mất NPC:** sổ bệnh ghi tên đủ năm mươi người và sự đồng ý hiến huyết. Nếu thầy thuốc chết trước khi thi hành, bản phương thuốc được người có chuyên môn tiếp nhận bằng hành động kế thừa nghề; chưa có người đủ năng lực thì chỉ nhánh cách ly còn mở. Không cho phàm nhân không linh căn tự thi triển huyết thuật từ một lần bấm.

#### EV06 — Những món nợ không chỉ là giấy

**Địa điểm và điều kiện:** LOC03 Vạn Bảo Hội Quán; kho lưu khế chưa cháy, nhân vật tiếp cận phòng khế ước hợp pháp hoặc bằng nghề đạo chích, chưa kết thúc EV06. Vai trò duy nhất: người giữ sổ.

**Lời dẫn:** Có người thuê ngươi đốt một giá sổ để xóa nợ cho cả xóm. Trên cùng giá ấy còn những tờ biên nhận tiền bồi thường cho thợ mỏ đã chết. Lửa thì không biết phân biệt hai loại giấy.

**Thông tin trước lựa chọn:** xem mục lục mất hai giờ, không đòi chỉ số tu tiên; mục lục nói rõ ba mươi khế bóc lột và mười hồ sơ bồi thường hợp lệ. Nếu người chơi bỏ qua bước xem, dòng xác nhận vẫn cảnh báo có hồ sơ quyền lợi cùng lưu trong giá.

| Lựa chọn | Chi phí và kết quả ngay | Hành Đạo; Nghiệp Duyên | Hậu quả trễ |
|---|---|---|---|
| Sao hồ sơ bồi thường rồi hủy đúng khế bóc lột | Cần biết chữ hoặc trả hai mươi đồng thuê người sao; ba ngày; ba mươi hộ thoát khế, mười gia đình giữ đủ chứng từ | Chính tăng nhẹ vì bảo vệ quyền lợi và giới hạn tổn hại; không tăng Tà chỉ vì đột nhập trái phép. Ghi trợ giúp vừa; không xóa các khoản vay tự nguyện khác | Sau ba mươi ngày Hội Quán kiện về tài sản hồ sơ; bản sao được tòa chấp nhận nếu đã có dấu xác thực của người giữ sổ |
| Đốt cả giá và lấy tiền công | Bốn giờ; nhận tám mươi đồng; ba mươi hộ thoát khế, mười gia đình mất chứng từ bồi thường | Tà tăng vừa; trợ giúp vừa và tổn hại vừa cùng tồn tại vì đã được cảnh báo | Sau mười ngày một gia đình xin người chơi làm chứng; lời chứng có thể khôi phục một phần quyền lợi, không tự hoàn thành toàn bộ mười hồ sơ |
| Bán vị trí các khế cho chủ nợ | Hai giờ; nhận một trăm đồng; Hội Quán chuyển kho, giữ nguyên mọi khế | Tà tăng nhẹ do bội tín với người thuê; ghi làm nặng sự lệ thuộc của ba mươi hộ ở mức vừa | Sau một mùa tiền lãi chủ nợ tăng theo hợp đồng đã có, không vô cớ nhân lên vô hạn; người thuê còn sống có thể biết việc bán tin qua sổ chi |

**Nhân chứng và xử lý mất NPC:** danh tiếng chỉ thay đổi khi bản sao, dấu tay hoặc sổ chi được phát hiện. Người giữ sổ chết không làm mất khế đã chuyển sang kho khác; vị trí mới được ghi ở biên bản vận chuyển. Không nhận cả ba khoản tiền công bằng thay đổi bên mua tin.

#### EV07 — Dây cương và lời hứa

**Địa điểm và điều kiện:** LOC08 Vạn Thú Môn; có một linh thú bị thương đang chờ định đoạt, chưa có chủ khế, chưa kết thúc EV07. Vai trò duy nhất: người coi thú.

**Lời dẫn:** Linh thú không cắn ai, nhưng cứ kéo sợi xích về phía cửa rừng. Người coi thú bảo nó thông minh đến mức biết van xin, rồi quay đi kiểm tra giá bán. Trong chuồng, vết máu đã khô thành một vòng quanh cổ.

**Thông tin trước lựa chọn:** linh thú có thể từ chối khế ước; buộc nó phục tùng làm việc sử dụng dễ hơn nhưng để lại tổn thương thật. Người không linh căn chỉ được chăm sóc và thuần dưỡng thông thường, không được lập linh khế hay nhận kỹ năng triệu thú.

| Lựa chọn | Chi phí và kết quả ngay | Hành Đạo; Nghiệp Duyên | Hậu quả trễ |
|---|---|---|---|
| Chữa thương rồi mời lập khế bình đẳng | Ba mươi đồng, bảy ngày; thú khỏi thương. Tu sĩ có pháp môn ngự thú được mời khế; trong hồ sơ này thú đồng ý khi được quyền trở về rừng mỗi mùa. Phàm nhân được tình bạn và công việc chăm thú trả hai mươi đồng, không được linh khế | Không đổi Hành Đạo do loại nghề; trợ giúp vừa, nghĩa vụ bảo vệ bạn đồng hành được ghi vào quan hệ | Sau ba tháng thú rời đi một mùa rồi trở lại; không đánh dấu đào tẩu phản bội. Nếu người chơi bỏ nghĩa vụ đã thỏa thuận, khế có thể chấm dứt theo điều khoản hiển thị |
| Mua quyền áp khế cưỡng chế | Chỉ mở cho tu sĩ có pháp môn ngự thú; tám mươi đồng, một ngày; nhận quyền sai khiến ngay, không phải chờ ba tháng | Tà tăng vừa; ghi cưỡng chế vừa. Không tự cộng nghiệp giết chóc nếu chưa có hành vi đó | Sau một mùa, thú chống lệnh khi bị buộc nhận đòn chí mạng; trạng thái khế và mức cưỡng ép được thể hiện trước chiến đấu |
| Chuộc rồi thả vào rừng | Năm mươi đồng, sáu giờ; thú được tự do, không nhận đồng hành hoặc vật phẩm | Chính tăng nhẹ nếu hoàn thành khế mua bán rồi phóng thích; trợ giúp vừa | Sau một năm có dấu chân thú ở lối rừng nhưng không bảo đảm nó quay lại cứu. Hồi âm kiếp sau là khả năng một loài vật bớt sợ nhân vật khi đúng khu vực |

**Nhân chứng và xử lý mất NPC:** biên nhận do người coi thú lập; nếu người ấy chết, khế mua bán vẫn còn giá trị với môn phái. Nếu thú chết vì biến cố khác trước khi sự kiện mở, EV07 không xuất hiện với một con thú thay thế giống hệt; hồ sơ di vật mô tả cái chết và kết thúc cơ hội đời đó.

#### EV08 — Một câu hát trước hàng gươm

**Địa điểm và điều kiện:** sân hát ven nước LOC09 Tịch Chiếu Bến vào ngày hội hàng năm; nhân vật là nghệ nhân gánh hát hoặc đã được gánh mời diễn sau một lần giúp họ; có tài liệu về việc trưng phu quá hạn, chưa kết thúc EV08. Vai trò duy nhất: chủ gánh hát.

**Lời dẫn:** Vở diễn kể chuyện một người lính hẹn về trước mùa lúa chín. Hàng đầu là quan viên vừa ký lệnh giữ phu thêm ba năm. Chủ gánh cầm tờ lời hát đã sửa, mắt nhìn những đứa trẻ đang ngủ phía sau phông.

**Thông tin trước lựa chọn:** hát nguyên bản sẽ khiến gánh mất giấy diễn địa phương; lời ca mua vui có tiền công nhưng không làm đơn tố cáo biến mất. Một người môi giới đề nghị thêm lời vu cáo một làng cụ thể để chuyển giận dữ khỏi quan phủ; tài liệu hiện có chứng minh làng ấy vô can.

| Lựa chọn | Chi phí và kết quả ngay | Hành Đạo; Nghiệp Duyên | Hậu quả trễ |
|---|---|---|---|
| Giữ lời hát tố việc trưng phu | Sáu giờ; không nhận tiền công, gánh mất giấy diễn ở Lương Kinh trong một năm; người xem được biết sự thật | Chính tăng nhẹ do công khai chịu trách nhiệm; trợ giúp nhẹ qua thông tin có căn cứ. Không tự tăng chiến lực vì dũng cảm | Sau bảy ngày có buổi tập hợp người nhà nộp đơn; người chơi có thể tiếp tục giúp hoặc rời đi, không khóa nghề tu luyện hoặc nghề khác |
| Hát bản tình ca và đưa tài liệu riêng cho người nhà | Sáu giờ; nhận bốn mươi đồng; gánh giữ giấy diễn; bí mật chuyển chứng cứ | Hành Đạo không đổi; trợ giúp nhẹ, không ghi hèn nhát hoặc nghiệp hại vì tránh hy sinh cả gánh | Sau ba mươi ngày gia đình tự nộp đơn; công lao công khai thuộc người nộp, không buộc phải thuộc người chơi |
| Hát lời vu cáo đã biết là sai | Sáu giờ; nhận một trăm hai mươi đồng và lời mời diễn ở phủ; dân làng vô can bị điều tra cưỡng bức | Tà tăng vừa do dùng lừa dối gây hại; ghi tổn hại vừa có chủ ý, tiền và cơ hội nghề được giữ nguyên | Sau mười ngày ba gia đình bị giam chờ xét; giấy chi của môi giới là chứng cứ về sau. Hồi âm kiếp sau có thể là một người không tin lời của nhân vật, không tự giảm kỹ năng hát |

**Nhân chứng và xử lý mất NPC:** khán giả nghe lời hát, nhưng nhánh đưa chứng cứ riêng không làm cả thành biết ngay. Nếu chủ gánh chết, người quản rương đạo cụ đang có trong đoàn giữ giấy phép; nếu cả gánh tan trước ngày diễn, hồ sơ đóng bằng kết quả buổi diễn không diễn ra, không trả tiền diễn.

#### EV09 — Món nợ có gương mặt khác

**Địa điểm và điều kiện:** từ kiếp thứ hai; LOC09 Tịch Chiếu Bến; sổ Nghiệp Duyên còn một dấu tổn hại chưa giải quyết từ kiếp trước, dấu ấy đã đủ điều kiện hồi âm, chưa kết thúc EV09. Vai trò duy nhất: người giữ di vật của nạn nhân cũ.

**Lời dẫn:** Người bán đò đưa ra một mảnh vải có đường khâu ngươi từng nhìn trong mộng. Người ấy không biết mặt ngươi, chỉ biết gia đình mình mất một người vì kẻ mang dấu hiệu ấy. Gió sông lạnh, nhưng lòng bàn tay ngươi còn lạnh hơn.

**Thông tin trước lựa chọn:** nhân vật có ký ức cảm giác, không được biết toàn bộ hồ sơ nếu chưa trả chi phí tìm hiểu. Xem di vật và nghe chuyện mất sáu giờ, cho biết đúng tổn hại và quan hệ cũ. Người giữ di vật không bị biến thành kẻ thù chắc chắn chỉ vì nghiệp xấu còn tồn tại.

| Lựa chọn | Chi phí và kết quả ngay | Hành Đạo; Nghiệp Duyên | Hậu quả trễ |
|---|---|---|---|
| Nhận phần trách nhiệm trong mộng và bồi hoàn | Ba ngày, sáu mươi đồng; gia đình nhận tiền sinh kế, không bị ép nói đã tha thứ; đánh dấu đã khắc phục phần vật chất của tổn hại được chỉ định | Chính tăng nhẹ do tự nhận và thực hiện cam kết; giảm gánh nợ của đúng quan hệ ở mức nhẹ, không xóa mọi nghiệp khác | Sau một mùa gia đình có thể chủ động gặp lại; thái độ vẫn phụ thuộc mức tổn hại cũ. Dấu tổn hại nặng chưa được tha thứ tiếp tục tồn tại |
| Kể điều biết được rồi rời đi | Sáu giờ, không mất tiền; người giữ di vật nhận được một manh mối thật; không buộc người chơi nhận tội pháp luật của một thân xác khác | Hành Đạo không đổi; trợ giúp thông tin nhẹ, gánh nợ cũ không tự tăng hoặc tự xóa | Sau ba mươi ngày có tin gia đình tìm được nơi chôn cất nếu manh mối dẫn tới đó; không sinh truy sát chỉ vì từ chối trả tiền |
| Bán một lời chỉ dẫn giả để lấy di vật | Một ngày; nhận đúng một di vật và ba mươi đồng tiền dẫn đường, gia đình mất thêm nguồn lực. Di vật là mảnh vải có đường khâu đã nêu: chiếm một ô, không bán được, không cộng chỉ số chiến đấu, dùng để đối chiếu ký ức và chứng minh quan hệ cũ; không sinh vật phẩm thứ hai khi xem lại | Tà tăng vừa; thêm tổn hại nhẹ mới có chủ ý lên quan hệ cũ; mọi lợi ích thông tin và tiền vẫn có thật | Sau bảy ngày lời chỉ dẫn sai bị phát hiện; người giữ di vật công khai tìm người bán tin, tạo truy tìm địa phương có nguồn chứng cứ |

**Nhân chứng và xử lý mất NPC:** chỉ người đã nghe đối thoại biết lời hứa; không cho chính quyền tự biết sự kiện tiền kiếp. Nếu người giữ di vật chết, người thân hoặc văn bản di chúc tiếp nhận khoản bồi hoàn theo quan hệ có sẵn; nếu không còn ai, có thể tu sửa mộ bằng đúng sáu mươi đồng, chỉ ghi khắc phục nơi an táng, không giả lập sự tha thứ của người chết.

#### EV10 — Suất khám cuối ở Bách Thảo Cốc

**Địa điểm và điều kiện:** LOC10 Bách Thảo Cốc; nhân vật vô linh căn, đã xác nhận bằng một lần giám định, có hai mươi đồng, chưa được cải căn thành công, chưa kết thúc EV10. Vai trò duy nhất: người ghi lịch khám.

**Lời dẫn:** Người ghi lịch gạch tên cuối cùng trước khi khóa sổ. Trong tay ngươi là tờ giám định hai chữ vô căn; trước mặt là những người đã chờ từ sáng. Cánh cửa không hứa thay mệnh, chỉ hứa nói rõ vì sao ngươi không thể tu luyện.

**Thông tin trước lựa chọn:** một suất tư vấn chỉ mở thông tin về những phương pháp cải căn đã có trong danh mục; không tạo linh căn, không cấp đan miễn phí, không bảo đảm người chơi đủ khả năng chi trả. Người chờ cuối hàng đang cần khám bệnh thông thường, không tranh một tài nguyên tiên duyên vô hạn.

| Lựa chọn | Chi phí và kết quả ngay | Hành Đạo; Nghiệp Duyên | Hậu quả trễ |
|---|---|---|---|
| Đăng ký lịch tháng sau | Hai mươi đồng, hai giờ; có lịch tư vấn sau ba mươi ngày, được tự do rời đi làm nghề khác trong lúc chờ | Hành Đạo không đổi; không sinh nghiệp hại hoặc trợ giúp chỉ vì làm đúng thủ tục | Đến lịch có một cuộc tư vấn xác định lộ trình cải căn phù hợp trong catalog và chi phí thật. Lỡ lịch giữ quyền đặt lại một lần, không tự cướp mất cơ hội đời người |
| Nhận một ca công việc để được khám ngoài giờ | Hai mươi bốn giờ lao động thu hái an toàn, không mất tiền; được tư vấn sau ca làm, người bệnh vẫn giữ lượt | Chính tăng nhẹ do giữ thỏa thuận; trợ giúp nhẹ cho dược cốc, không thưởng linh căn vì chăm chỉ | Sau bảy ngày mở công việc thu hái trả công thông thường; không mở khế nô dịch hoặc pháp môn tu luyện khi vẫn vô căn |
| Mua chuộc để chiếm lượt người bệnh | Hai mươi đồng tiền khám và bốn mươi đồng hối lộ, hai giờ; được tư vấn ngay; người bệnh phải quay lại sau ba ngày, chịu đau thêm nhưng không bị mặc định chết | Tà tăng nhẹ vì dùng quyền lợi ngầm; tổn hại nhẹ có chủ ý với người bị chiếm lượt; lợi ích thời gian vẫn được giữ | Nếu người bệnh biết qua sổ thứ tự, quan hệ xấu đi; có thể thanh toán tiền thuốc bù cho người ấy nhưng không thu hồi được ba ngày đã mất |

**Nhân chứng và xử lý mất NPC:** lịch khám là chứng từ độc lập với người ghi sổ. Nếu dược cốc đóng cửa vì biến cố, lịch trở thành thư giới thiệu đến người chữa bệnh còn sống đã được định danh trong mạng nghề y; nếu không còn cơ sở hoạt động, hoàn tiền khám và giữ thông tin về nơi cất y thư, không trao linh căn bù lỗi.

#### EV11 — Một cây cầu, hai đoàn người

**Địa điểm và điều kiện:** LOC13 Bắc Phong Ải; chiến sự đang ở mức đe dọa đường rút; nhân vật là binh lính, chiến binh hoặc người được giao hộ tống; có hai mươi dân thường và mười quân rút lui, chưa kết thúc EV11. Vai trò duy nhất: chỉ huy chốt cầu.

**Lời dẫn:** Mưa làm cầu gỗ trơn như vết mỡ. Quân rút lui chen giữa xe bò và người cõng trẻ, còn người giữ hỏa lệnh cứ hỏi có được đốt chưa. Bên kia sông, lửa hiệu của địch sáng thêm một đốm.

**Thông tin trước lựa chọn:** còn sáu giờ đến lúc địch tới; đủ thời gian đưa hai mươi dân sang nếu bỏ lại quân nhu. Giữ quân nhu giúp đơn vị có lợi thế ở trận sau. Đốt cầu sớm sẽ để mười dân bên kia mắc lại, điều này được đếm công khai trước xác nhận.

| Lựa chọn | Chi phí và kết quả ngay | Hành Đạo; Nghiệp Duyên | Hậu quả trễ |
|---|---|---|---|
| Bỏ quân nhu, ưu tiên dân qua cầu | Sáu giờ; cả hai mươi dân và mười lính qua được; mất một lô quân nhu đang giao, không lấy tiền túi bù tự động | Chính tăng nhẹ do ưu tiên bảo vệ người; trợ giúp vừa, trách nhiệm thất thoát vật tư ghi vào quân vụ chứ không là sát nghiệp | Trận phòng thủ kế tiếp thiếu một mức tiếp tế; chỉ huy có thể phạt ba mươi đồng hoặc trừ công trạng theo quân luật đã công bố trước |
| Đốt cầu sớm để giữ quân nhu và chặn địch | Hai giờ; mười dân và mười lính qua được, mười dân bị kẹt; giữ quân nhu, nhận sáu mươi đồng thưởng và lợi thế tiếp tế ở trận sau | Tà tăng vừa vì chủ động đặt mười người vào nguy hiểm để giữ lợi thế; ghi tổn hại vừa có chủ ý. Công trạng trong quân tăng riêng, không biến thành Chính | Sau ba ngày sáu trong mười người bị bắt đi lao dịch, bốn người tự thoát; hồ sơ từng người được cập nhật. Không gán cả mười người đã chết khi chưa có sự kiện chết |
| Rời chốt cùng nhóm dân đi đường vòng | Mười tám giờ; cứu hai mươi dân, bỏ nhiệm vụ chỉ huy; mười lính rút theo lệnh còn lại và mất một nửa quân nhu | Chính tăng nhẹ vì giữ được người bằng đường rút đã biết an toàn; không tăng Tà chỉ vì phá quân lệnh. Ghi trợ giúp vừa; tổn thất quân nhu và cam kết quân vụ được xét riêng theo điều người chơi biết khi chọn | Sau bảy ngày bị xóa công trạng đợt phòng thủ và truy cứu đào nhiệm nếu thuộc quân ngũ; người làm hộ tống tự do chỉ mất hợp đồng, không bị gắn tội đào ngũ |

**Nhân chứng và xử lý mất NPC:** quân vụ và lời người sống ghi hậu quả riêng. Nếu chỉ huy chết giữa thời gian xử lý, lệnh đã chọn vẫn được thực hiện bởi đội đang ở cầu; nếu cầu bị phá bởi một biến cố đã xảy ra trước lúc mở sự kiện, hồ sơ này không kích hoạt và chuyển đường rút sang hệ bản đồ thông thường. Không dựng lại cây cầu để nhận thưởng lần nữa.

#### EV12 — Căn nhà có khói

**Địa điểm và điều kiện:** LOC01 Thanh Khê Thôn hoặc nơi an cư thật đang có trong hồ sơ người chơi; nhân vật ít nhất bốn mươi tuổi, từng sống tại đó một năm, còn một người thân hoặc bạn thân; không có biến cố đánh phá đang diễn ra, chưa kết thúc EV12. Vai trò duy nhất: người thân đang sống cùng hoặc người bạn lâu năm được chọn từ quan hệ thật.

**Lời dẫn:** Chiều nay trong bếp có mùi cơm cháy, mùi mà ngươi đã đi rất xa mới nhớ ra mình từng biết. Người trong nhà hỏi mai có về ăn không, như thể câu trả lời chỉ là chuyện ngày mai. Ngoài sân, một chiếc xe đường dài đang chờ nhận khách.

**Thông tin trước lựa chọn:** không có vật phẩm bí mật, không có thân phận đại năng ẩn trong người thân. Đây là một quyết định về thời gian sống và quan hệ; cả ở lại lẫn đi tiếp đều hợp lệ. Nếu nhân vật đang thiếu ăn, nút an cư hiển thị rõ chi phí sinh hoạt trước xác nhận.

| Lựa chọn | Chi phí và kết quả ngay | Hành Đạo; Nghiệp Duyên | Hậu quả trễ |
|---|---|---|---|
| Ở lại hết mùa | Chín mươi ngày; dùng đúng nhu cầu ăn ở đang áp dụng cho hộ hiện tại, hoạt động nghề tại nhà tiếp tục theo luật nghề; quan hệ thân thiết tăng một mức, không nhận tu vi miễn phí | Không đổi Hành Đạo; ghi thực hiện sự chăm sóc trong quan hệ ở mức nhẹ nếu người thân cần chăm, không tính nghề phàm thấp hơn nhập đạo | Một cảnh bữa cơm mùa sau được thêm vào hồi ký. Nếu có cơ hội ngoài đường hết hạn trong thời gian này, ghi đúng cơ hội ấy, không bịa ra tai họa để ép đi |
| Đi tiếp và hẹn ngày trở về | Một giờ, không thêm tiền; đặt lời hẹn trở về sau một trăm tám mươi ngày, người chơi được chọn giữ hoặc rút lời hẹn trước hạn bằng thư | Không đổi Hành Đạo hoặc Nghiệp Duyên chỉ vì ra đi; lời hứa là nghĩa vụ quan hệ có thể kiểm chứng | Trở về đúng hẹn tăng tín nhiệm; gửi thư xin đổi ngày giữ quan hệ nhưng không nhận thưởng; thất hẹn không báo làm tín nhiệm giảm nhẹ, không tự thành ác nghiệp nặng |
| Mời người ấy đồng hành | Chỉ mở khi người ấy đồng ý và đủ sức đi đường; sáu giờ chuẩn bị, hai mươi đồng hành lý; tạo bạn đồng hành dân sự, không tăng sức chiến đấu | Không đổi Hành Đạo; ghi cam kết chia sẻ sinh kế, không ban thiện duyên chỉ vì có gia đình | Chi phí ăn ở đi đường được tính cho cả hai; người đồng hành có quyền xin dừng tại nơi an toàn. Nếu không đủ sức hoặc không đồng ý, nút giải thích lý do, không cho cưỡng ép bằng lựa chọn này |

**Nhân chứng và xử lý mất NPC:** đây là ký ức quan hệ riêng, không cộng danh vọng toàn thế giới. Nếu người ấy chết trong mùa ở lại, thời gian chăm sóc vẫn là thật và cảnh kết chuyển thành việc chịu tang; nếu người ấy chết sau lúc người chơi đi, thư báo ghi nguyên nhân đã tồn tại trong mô phỏng, không lấy cái chết làm hình phạt cho ra đi. Dấu hồi âm kiếp sau chỉ có thể là một mùi bếp hoặc một câu hỏi quen, không bảo đảm gặp lại cùng khuôn mặt.

#### Dữ liệu dùng chung bắt buộc của kho sự kiện

Mỗi hồ sơ cần lưu: mã sự kiện; mã bản nội dung; mã đời; địa điểm; NPC vai trò đã gắn; điều kiện tuổi, nghề, linh căn, thời tiết và thế cục được ghi trong hồ sơ; thời điểm bắt đầu; lựa chọn đã chốt; chi phí đã trừ; phần thưởng đã nhận; trạng thái từng người hoặc quần thể bị ảnh hưởng; nhân chứng; chứng từ; điều người chơi đã biết; dấu Hành Đạo; từng quan hệ Nghiệp Duyên phát sinh; hậu quả trễ kèm thời điểm và điều kiện hủy hợp lệ; dấu hồi âm kèm kiếp được phép gọi; phương án xử lý NPC chết; văn bản hồi ký và cờ đã kết thúc. Không dùng một chuỗi chữ tự do thay thế toàn bộ trạng thái nghiệp hoặc một cờ hoàn thành thay cho số người thực sự sống sót.

Nghiệm thu nội dung của mười hai hồ sơ phải xác nhận đủ ba lựa chọn có thể phân biệt về thời gian, tài nguyên hoặc quan hệ; không có lựa chọn thành công khi thiếu điều kiện; mọi tổn hại có người hoặc vật chịu tác động; không mặc định sát thú là tà, không mặc định làm theo chính tông là thiện; không tự sinh tiền, lương, linh căn hoặc NPC để vá một nhánh; không trả thưởng hai lần sau tải lại; lời hồi ký phản ánh lựa chọn thật và số phận thật. Các hậu quả chứa đau khổ được viết bằng sự việc và mất mát cụ thể, không dùng lời chế nhạo người chơi.

---

<a id="nghi-thuc"></a>

### 9. Nghi thức kết hành trình và nguồn vận hành

Ngày chốt: 18/11/2026. Các mức dưới đây là dữ liệu thiết kế đề nghị, chưa được kiểm chứng qua chơi thử. Chúng cụ thể hóa cổng END04/05/07/08, không thay điều kiện tri thức, cảnh giới hay công thức thiên kiếp TK06.

#### Nguồn năng lượng và thiết bị có chủ

VT-TU04 có dung lượng 20 nhịp/lõi; một nhịp là lượng năng lượng dùng cho một hành động khôi tiêu chuẩn. Nghi thức tiêu số nhịp được ghi riêng, không đổi nhịp thành tiền, HP hoặc linh căn. Lõi đã dùng giữ số nhịp còn lại, không tự đầy khi tháo. Người chơi phải sở hữu, được cho mượn bằng hợp đồng, hoặc chiếm được lõi thật. Kho phe, kho người và bộ nghi thức dùng chung những cá thể ấy; một lõi không được đồng thời nằm trong khôi và trận.

Ba ổ điều khiển cố định tại LOC05, LOC12, LOC15 là thành phần kiến trúc của trục, không phải vật phẩm rơi. Mỗi ổ có công tắc cơ, đồng hồ chốt và bản khắc thao tác. Đọc bản khắc mất hai ngày/ổ sau khi biết TRI02; dùng dụng cụ phàm và biết chữ KS21 từ 300, không cần tự vận linh lực. Người chưa đủ học vấn được thuê người đọc 200 đồng/hai ngày, hoặc học rồi quay lại. Đường thuê đóng khi không còn người sống; đường tự học và bản khắc trên tàn tích vẫn tồn tại. Ổ bị phá lưu trạng thái đã ngắt; xác minh mất một ngày, không yêu cầu dựng lại nút sống.

Lắp bộ điều phối tại LOC15 cần BT11×6, BT12×6, BT13×6, VT-TU12×12, ba lõi VT-TU04 đầy, 30 ngày và kỹ năng cơ cấu của PM06 từ 300 hoặc TU08/TU13 từ 300. Có thể thuê NP09/NP21 nếu còn sống: 20 LT tiền công, không bao vật tư. Người vô căn dùng đường cơ cấu để lắp và vận hành thiết bị đã có nguồn; không được công nhận đã học trận pháp tu tiên. Bộ điều phối có 16 ổ lõi; ba lõi đầu là phần nạp tối thiểu khi lắp, lõi bổ sung phải được đưa vào trước khi bắt đầu nghi thức. Lõi đã tiêu từ thử hoặc lắp giữ đúng phần còn lại, không được tính lại như lõi đầy. Bộ điều phối là công trình có chủ sở hữu, HP công trình 600, độ bền 100, không bỏ vào túi; phục hồi 25 bền cần BT11×2, BT12×2 và hai ngày. Đủ điều kiện thì lắp chắc chắn; thiên tai hoặc tấn công xảy ra qua sự kiện thật, không thêm một lần tung chết kín.

#### Bốn hồ sơ nghi thức

| Mã | Điều kiện, vật tư và thời gian | Tiêu hao, điểm chốt và kết quả |
|---|---|---|
| NG01 — Mở cửa tỉnh mộng, END04 | TRI01–03, Độ Kiếp viên mãn, bộ điều phối hoạt động; VT-TU12×20; tối thiểu 80 nhịp trong các lõi có thật; chuẩn bị bảy ngày | Hiệu chỉnh tiêu 20 nhịp và bột trận. Xác nhận mở cửa bắt đầu TK06, tiêu tiếp 60 nhịp. Thắng mới đạt END04; chết dùng luật tử vong, không cấp kết hoặc thưởng thành công. Không mua thêm chỉ số bằng nhịp thừa |
| NG02 — Thay nguồn, END05 | TRI01–03; bộ điều phối; thử mô hình bảy ngày với VT-TU12×2 và 10 nhịp; sau đó lắp ba bộ tụ tại ba LOC: BT11×12, BT12×12, VT-TU12×30 và 90 ngày; đủ nguồn chạy thử một tháng | Mô hình không dùng người/hồn làm vật thử. Hệ hoàn chỉnh dùng 120 nhịp/tháng, chia đều ba tụ, thay lõi sau khi cạn; một chu kỳ đạt là 30 ngày liên tục không lấy ký ức cưỡng ép. Chu kỳ thành công mở END05 và quyền bàn giao; không biến công trình thành nguồn miễn phí vĩnh viễn |
| NG03 — Ngắt vòng, END07 | TRI01–03, đã xác minh đường tản ký ức trên cả ba ổ; bộ điều phối; BT13×6, BT11×3 làm ba chốt cơ hẹn giờ; VT-TU12×6; đặt chốt mất ba ngày mỗi nơi, có thể đi từng nơi trước khi chọn giờ | Thử không phá trục tốn 10 nhịp. Hẹn cả ba chốt về cùng một giờ cách hiện tại ít nhất một ngày và không quá 30 ngày. Chốt bằng cơ nên người phàm không phải chạy giữa ba đại khu trong một ngày. Ba nút ngắt trong cửa sổ 24 giờ mới khép vòng; nút đã hỏng được tính đã ngắt sau xác minh. Khi bắt đầu xả ký ức không thể khôi phục vòng bằng tải nội bộ |
| NG04 — Diệt thế, END08 | Cổng END08 của chương truyện; bộ điều phối nguyên vẹn; hai quyền khóa đã kiểm chứng tại LOC05/07/12; VT-TU12×40; 240 nhịp; chuẩn bị 30 ngày và dự trữ đủ ăn/ngủ cho thời gian ấy | Nạp 120 nhịp trong giai đoạn tích tụ bảy ngày, tiêu 120 nhịp còn lại lúc chốt hủy. Trước chốt còn dừng được, không hoàn phần đã dùng. Sau chốt bắt đầu quá trình hủy và chống trả cuối; hoàn tất mới công nhận END08. Không thêm người sống mới để làm đối thủ |

“120 nhịp/tháng” của NG02 là nhu cầu duy trì sau khi đã đổi cơ chế trục sang thu–trả ký ức tự nguyện với ba bộ tụ; không là lượng năng lượng vận hành toàn bộ thiên nhiên. Phần năng lượng tự nhiên của trục vẫn có trong cấu trúc, đã được mô hình thử chứng minh. Mỗi đầu tháng phải nạp đủ sáu lõi đầy hoặc lượng nhịp tương đương từ lõi dở. Thiếu nguồn làm bộ tụ dừng nhận ký ức mới, phát cảnh báo trước bảy ngày, rồi tăng CLK06 một nấc/tháng; không tự quay lại bắt người hiến ký ức. Khởi động lại cần đủ 120 nhịp tháng kế, hai ngày kiểm định và sửa hỏng thật. Người điều phối tự nguyện hoặc hội đồng ba cá thể đã nhận trách nhiệm là bên quản trị, không được xóa chi phí khi người chơi rời đi.

#### Chống trả cuối và xử lý thất bại

NG04 thông báo phạm vi ngay khi tích tụ: cư dân và những phe biết tin có bảy ngày hành động theo tin, đường đi và quân lực thật còn lại. Mỗi FA còn hoạt động có thể gửi tối đa một đội đã trừ khỏi biên chế; thành phần và cảnh giới theo roster của phe, không vượt người mạnh nhất còn sống của phe ấy. Đội tới nơi tạo chạm trán dùng AI, sức mạnh và rút lui của hệ chiến đấu. Có thể chặn đường, đàm phán, mua sự phục tùng hoặc đánh; đội không tới kịp không dịch chuyển tức thời. Lưu từng đội và thời điểm tới, không triệu một đội khác sau mỗi lần tải.

Sau chốt hủy, cơ cấu của trục tạo ba xung phản tải, mỗi xung cách một giờ. Đây là hiểm họa công trình, không là sinh vật để farm: mỗi xung hao 15 độ bền bộ điều phối và gây 15% HP nền của cảnh giới hiện tại cho người đứng tại bàn vận hành; đứng sau tấm chắn đã lắp bằng BT11×4 trước chốt giảm còn 5%. Vô căn dùng nền phàm 100, không được nhận chỉ số tu tiên. Nhân vật có thể nghỉ/chữa trong hai khoảng chờ nếu có đồ thật; rời tâm nghi thức dừng tiến trình và giữ tổn hại đã xảy ra, không coi hủy diệt thành công. Bộ điều phối về không bền hoặc nhân vật chết thì quá trình dừng ở phạm vi đã ghi, nhận hậu quả tương ứng. Chỉ qua đủ ba xung, vẫn sống và giữ điều khiển mới thực hiện lần hủy toàn Cổ Giới.

Với NG01/02/03, hủy trước thao tác chốt chỉ mất thời gian, vật tư đã dùng và nhịp đã tiêu; đầu vào chưa dùng trả đúng nơi cất, không trả thành bản sao. NG02 mất chu kỳ kiểm định nếu dừng quá một ngày; bộ tụ và nhịp dư còn. NG03 có thể tháo chốt trước giờ hẹn trong sáu giờ mỗi ổ; nếu một chốt thất bại, vòng chưa đóng, các nút đã ngắt vẫn còn trạng thái ấy và có thể đặt lại phần còn thiếu sau 30 ngày khảo sát. Chốt cơ đã tháo chỉ thu lại BT11, dây và bột trận đã dùng mất.

#### Khi người giữ khóa chết hoặc Cổ Giới đã im lặng

Quyền khóa là tri thức đã kiểm chứng hoặc cơ chế tại hiện trường, không nằm trọn trong túi một NPC. Khi chưa học, khảo ổ LOC05, huyết phả LOC07 hay chuông LOC12 mất bảy ngày/nguồn, cần biết chữ 300 và TRI02, cho đúng phần quyền mà vật chứng có thật; không tiết lộ lời thú tội không từng được ghi. Chủ còn sống vẫn có quyền canh, bán hoặc từ chối tiếp cận; đọc trộm để lại dấu nếu bị thấy.

Trước NG04, giao diện nêu rõ sau hủy không còn nơi mua vật tư. Người muốn tiếp END04 được dành riêng 80 nhịp, VT-TU12×20 và bảy ngày khẩu phần; muốn tiếp END07 đặt ba chốt, hoàn tất phép thử và giữ đồ bảo dưỡng trước khi chốt diệt thế. Các bộ dành riêng có chủ và cá thể thật, không được NG04 tiêu lẫn. END08 không tự cấp vật tư hoặc tri thức còn thiếu. Nếu không chuẩn bị đường tiếp, vẫn có thể chốt kết im lặng hoặc kết đời; đó là lựa chọn kết thúc hợp lệ, không phải màn chơi bị kẹt. Các ổ, bản khắc và tàn ký ức phi sinh vật vẫn có thể đọc; chốt đã hỏng dùng quy tắc xác minh đã ngắt. Không dựng người mới để trao kết game.

Mỗi nghi thức lưu mã công trình, chủ, nguyên liệu theo cá thể, nhịp đã tiêu/còn, thời gian, nút đã kiểm, đội chống trả, xung phản tải, quyết định dừng và dấu chốt không thể rút. Lời xác nhận cuối: “Việc này sẽ đổi điều người sống còn có thể chờ đợi. Những gì đã mất sẽ không trở lại.” Sau đó liệt kê hậu quả cụ thể của đúng nghi thức, không chỉ dùng một câu cảnh báo chung.

---

<a id="phap-mon"></a>

### 10. Mười sáu pháp môn lõi, chiêu thức và sản phẩm

Đây là bộ pháp môn lõi mới được biên soạn để mỗi TU có thao tác riêng. Không thay thế âm thầm 304 bản ghi công pháp/tâm pháp bổ sung đã có. Khi triển khai, công pháp cũ phải được gắn chuyên môn, điều kiện căn và nguồn hợp lệ; bản ghi không đạt yêu cầu không được đưa vào nhóm rơi. Bộ dưới đây là nội dung sản xuất xác định cho phạm vi thiết kế, không phải vật phẩm mẫu rồi tự nhân bản bằng đổi tên.

#### P.1. Luật học và tiến bộ chung

Có linh căn còn hoạt động và đã dẫn khí là điều kiện của tất cả TU01–TU16. Hết linh lực khóa kỹ năng cần linh lực; không xóa tri thức. Vô căn được học lý thuyết dược, trận và chế tạo thường, được nhận việc phụ, nhưng không kích hoạt công pháp, vật phẩm trữ vật hay thu nhập tu vi. Mất căn giữa đời giữ lịch sử học và nghề phàm đã có; phục hồi căn phải có một kết quả cải căn/khôi phục hợp lệ.

Mỗi đời có thể đăng ký hai chuyên môn tu; một chuyên môn chính nhận toàn bộ tiến bộ nghề, một chuyên môn phụ nhận một nửa. Đổi chuyên môn phụ cần 30 ngày nghiên cứu và không xóa kỹ năng đã học. Ngoài hai chuyên môn vẫn đọc được sách, biết tri thức sự kiện và dùng chiêu đã học tương thích, nhưng không tích tiến bộ nghề mới. Không khóa chính/ma/tán theo TU. Các nghề phàm tiếp tục được làm cùng đường tu với tổng thời gian thực tế.

Tiến bộ nghề là đơn vị kinh nghiệm nội bộ: học đồ 0–99, hành nghề 100–299, chuyên gia 300–699, tông sư 700–1.000; tiến bộ bị chặn ở 1.000. Một hợp đồng có ý nghĩa cho 10 đơn vị; một sản phẩm mới đạt chuẩn cho 4; nghiên cứu một bản ghi mới cho 6. Cùng khách hàng, cùng sản phẩm và cùng điều kiện đã giải trong 30 ngày chỉ được kinh nghiệm nghề một lần, dù vẫn nhận công nếu làm việc thật. Không nhận kinh nghiệm qua mua rồi bán lại sản phẩm do mình làm. Các bậc nghề không tự cấp cảnh giới.

Mỗi công pháp lõi có bốn tầng: T1 cần đã dẫn khí và 30 ngày học; T2 cần Luyện Khí tầng 6, nghề 100 và thêm 90 ngày; T3 cần Trúc Cơ, nghề 300 và thêm 180 ngày; T4 cần Kết Đan, nghề 700 và thêm 360 ngày. Mọi thời gian là thời gian nghiên cứu thực đã dành, được chia đợt; học trong thiếu ăn, bệnh hoặc thương nặng dừng tích lũy. Mỗi tầng cần một lần kiểm chứng bằng hợp đồng đúng chuyên môn; không đổ tiền mua cả bốn tầng tức thì.

Chỉ vận hành một công pháp chính và một tâm pháp phụ cùng lúc. Thay công pháp chính ngoài trận mất 7 ngày điều hòa; hiệu ứng tầng của pháp môn cũ ngừng khi rời ô. Tổng bonus thụ động từ bộ 16 công pháp này bị giới hạn ở mức một công pháp đang vận hành; không học cả bộ rồi cộng 16 nội tại. T1 mở chiêu A, T2 mở chiêu B, T3 mở chiêu C, T4 tăng hiệu quả sản xuất/chuyên môn; T4 không tự mở thêm một chiêu gây bùng số.

#### P.2. Hồ sơ công pháp lõi và nguồn tri thức

Các mức tăng dưới đây là số nội bộ. T4 là hiệu ứng thêm, không nhân lại hiệu ứng T1 mỗi năm. “Bản lưu” là tri thức tồn tại qua biến cố, không tự sinh lại sách hiếm đã lấy; được đọc tại chỗ để phục hồi đường học nếu bản vật lý mất.

| ID; đường tu; công pháp | T1 và T2 | T3 và T4 | Người dạy, phí nhập học và đường thay thế |
|---|---|---|---|
| CP01; TU01; Dư Phong Kiếm Lục | T1 công vật lý +6%; T2 chính xác +4 điểm | T3 phá giáp +10 điểm phần trăm; T4 sửa kiếm giảm 20% nguyên liệu | NP25 tại LOC13: hộ tống một đoàn người, 20 linh thạch; bản thao luyện lưu trên bia LOC14 sau khi quân tan |
| CP02; TU02; Trầm Cốt Công | T1 HP tối đa +8%; T2 phòng ngự +6% | T3 giảm 10% sát thương vật lý khi thủ; T4 giảm 20% thời gian điều dưỡng thương cơ khi đủ thuốc | NP25 dạy vận khí tại LOC13, NP27 hướng dẫn phần giải phẫu ở LOC14: phụ chữa 3 ca thương cơ bằng thao tác phàm, 15 linh thạch; đồ hình xương ở nhà trị thương còn đọc được sau biến cố |
| CP03; TU03; Huyết Triều Nội Kinh | T1 hiệu suất hút sinh lực tăng 10% tương đối, vẫn chịu trần chung; T2 kháng chảy máu +15 điểm | T3 hút sinh lực có trần riêng chiêu; T4 giảm một phần tư huyết phí nghi thức tự nguyện | NP13 truyền pháp, NP14 giữ hồ sơ tại LOC07: cung cấp huyết tự thân sau kiểm tương thích, 25 linh thạch; huyết phả ghi phương án không hiến người nếu NPC chết |
| CP04; TU04; Tồn Danh Hồn Chương | T1 thần thức +6%; T2 kháng hồn +10 điểm | T3 có một ô khế ước hồn; T4 đàm phán giải phóng hồn không phá hợp đồng đã hoàn tất | NP23 tại LOC12: trả lại tên 3 hài cốt, 20 linh thạch; bản khắc chữ trong tháp tro tồn tại dưới dạng mảnh |
| CP05; TU05; Tĩnh Hải Quán Tâm Pháp | T1 MP tối đa +8%; T2 kháng nhiễu loạn +15 điểm | T3 do thám thêm một ý đồ của đối phương nếu kiểm tra thành công; T4 nghiên cứu chứng cứ nhanh hơn 20% | NP29 tại LOC15 hoặc bản quan trắc LOC05: chép một bản hiện tượng, 25 linh thạch; mảnh đài cho phép tự học với thời gian gấp đôi |
| CP06; TU06; Khế Môn Dẫn Ấn | T1 MP tối đa +6%; T2 thời lượng triệu linh thêm một lượt, trần năm lượt | T3 chỉ một thực thể triệu linh cùng lúc; T4 giảm 20% vật liệu khế ấn | NP15 tại LOC08: làm phụ cho thầy trong một hợp đồng triệu linh có hoàn trả, không cần biết chiêu trước, 25 linh thạch; khế ước sao trên trụ cửa nếu môn bị diệt |
| CP07; TU07; Đồng Tức Ngự Thú Quyển | T1 hiệu quả chữa thú +15%; T2 độ tin cậy thú không giảm khi nghỉ đủ | T3 liên kết với một thú mở rộng cự ly điều khiển từ 15 lên 30 bước; T1 đã cho một khế hợp lệ; T4 thức ăn thú tiết kiệm 15%, không miễn nhu cầu ăn | NP15 truyền linh khế, NP16 hướng dẫn chăm sóc phàm tại LOC08: cứu thú bị bẫy bằng chăm sóc phàm và nuôi ổn 30 ngày, 15 linh thạch; hồ sơ thú y trên sổ khế có bản ở LOC06 |
| CP08; TU08; Bố Tinh Trận Yếu | T1 độ bền trận +10%; T2 một ô chuẩn bị trận ngoài trận | T3 một trận duy trì trong giao tranh; T4 hồi thu 25% vật liệu trận đã tháo bình thường | NP09 tại LOC05: phụ sửa một nút trận dưới giám sát, 30 linh thạch; khắc lõi vẫn đọc được khi trận các sụp, phải chịu nguy hiểm thăm dò |
| CP09; TU09; Thanh Hỏa Đan Lý | T1 xác suất chế đan thành công +5 điểm; T2 đọc được tạp chất trước khi dùng | T3 chất lượng thành đan được cộng một bậc trong tối đa một mẻ mỗi mùa; T4 giảm 15% nhiên liệu | NP19 tại LOC10: phục vụ bệnh xá 30 ngày, 30 linh thạch; đơn thuốc lưu trong kho lạnh, học từ đó mất gấp đôi thời gian |
| CP10; TU10; Sinh Tức Bách Thảo Kinh | T1 năng suất dược +10%; T2 nhận biết cây độc cùng phẩm | T3 bảo quản dược thêm 30 ngày; T4 trị bệnh dùng dược giảm 15% vật liệu, không miễn chẩn đoán | NP19 truyền pháp, NP20 hướng dẫn vườn phàm tại LOC10: điều tra một nguồn bệnh, 15 linh thạch; bản mẫu dược lưu LOC12 nếu vườn mất |
| CP11; TU11; Định Chất Luyện Khí Thiên | T1 độ bền đồ chế +10%; T2 nhìn được một dòng hỏng ẩn sau kiểm tra | T3 sửa pháp khí không xóa thuộc tính nếu đủ nguyên liệu; T4 thu hồi 20% phôi từ món tự tháo | NP21 tại LOC11: sửa lò và giao một phôi đạt chuẩn, 30 linh thạch; bảng công khuôn lưu trong lô cuối |
| CP12; TU12; Nhất Nét Phù Kinh | T1 tỷ lệ viết phù +5 điểm; T2 mang thêm một phù chuẩn bị nhưng không thêm lượt | T3 nạp một phù ngoài trận để dùng không tốn MP trong một lần; T4 giảm 20% giấy và mực | NP21 truyền pháp, NP22 hướng dẫn khuôn giấy phàm tại LOC11: làm một khuôn không bán giả, 20 linh thạch; bản nét khắc vào bàn khuôn có thể chà giấy sao lại |
| CP13; TU13; Mộc Cốt Khôi Kinh | T1 độ bền khôi +10%; T2 sửa khôi nhanh hơn 20% | T3 một khôi chủ động; T4 thu hồi 30% gỗ/kim loại của khôi tự tháo, không thu hồi lõi đã nổ | NP09 truyền pháp, NP22 dạy khung cơ cấu phàm: cứu công nhân kẹt lò bằng cơ cấu, 25 linh thạch; bản cơ cấu lưu ở LOC11 và LOC05 |
| CP14; TU14; Phân Dược Độc Luận | T1 kháng độc +10 điểm; T2 nhận biết độc sau quan sát không tự miễn độc | T3 chế được giải dược đúng họ đã nghiên cứu; T4 giảm 20% rủi ro phơi nhiễm khi đủ bảo hộ | NP19 tại LOC10: cứu một ca ngộ độc bằng đúng giải dược, 20 linh thạch; hồ sơ độc tính có bản trong thư khố LOC12 |
| CP15; TU15; Tịch Thanh Phổ | T1 MP tối đa +6%; T2 kháng khủng hoảng +10 điểm | T3 kỹ năng âm luật có thể tác động đồng minh còn nghe được; T4 biểu diễn tăng 20% khả năng ổn định tâm trạng, không cộng uy tín vô hạn | NP18 tại LOC09: đưa lời chứng qua buổi diễn, 20 linh thạch; bản nhạc ghi trên bảng thuyền còn khi gánh tan |
| CP16; TU16; Tàng Ảnh Hành Chương | T1 ẩn nấp +8 điểm; T2 chi phí do thám giảm 15% thời gian | T3 đòn từ ẩn nấp có giới hạn tăng sát thương; T4 rút khỏi hợp đồng trước khi ra tay giảm một nửa phí phạt đã thỏa thuận | NP13 truyền pháp tại LOC07 sau khi NP06 xác nhận đã giữ kín một chuyến hàng từ LOC03, 25 linh thạch; sổ tuyến ẩn trong thương đội có thể mua hoặc trộm, không cần giết người để học |

Từ chối hành vi mở học không vĩnh viễn khóa pháp môn. Có thể học qua bản lưu với gấp đôi thời gian và cùng giá vật tư; không cần đóng phí cho người đã chết. Khoản “phí” ở bản lưu là tiền thuê nơi, vật liệu thử và sao chép, ghi đúng bên nhận. Không tự khấu trừ tiền vô chủ. Sách gốc lấy được là vật có ID duy nhất; dùng học không tiêu sách, bán sách chuyển quyền sở hữu, không tạo sách thứ hai.

#### P.3. Danh mục bốn mươi tám chiêu lõi

Quy ước nội bộ: A là công vật lý, M là pháp công, H là HP tối đa, L là MP tối đa của người dùng. Sát thương ghi trước phòng ngự, kháng và hộ thể; phần trăm H trả bằng sinh lực hiện tại và không được thi triển nếu chi phí khiến HP còn dưới một. Chi phí L làm tròn lên. Một chiêu dùng một hành động; chiêu có tụ mất hai hành động và bị gián đoạn nếu choáng. Mọi chiêu đánh cần mục tiêu đang nhận biết được; không đánh được NPC đã chết hoặc ở ngoài trận.

Mỗi lần khai chiến được chuẩn bị tối đa ba chiêu tấn công, ba chiêu thủ/bổ trợ, một thân pháp, một thần thông theo khung hiện tại. Ba chiêu mỗi CP không tự thêm ô. Chiêu C cần Trúc Cơ, chiêu A/B theo tầng học P.1. Không chồng cùng trạng thái vượt trần ở chương nền; hiệu ứng không hợp mục tiêu báo trước khi xác nhận và không tiêu tài nguyên. Hồi và hút máu có trần HP tối đa, không biến phần dư thành lá chắn nếu chiêu không ghi.

| ID; công pháp; chiêu | Mục tiêu; chi phí; hồi chiêu theo hành động của chủ | Hiệu quả; điều kiện và đối sách | Lời ghi trận |
|---|---|---|---|
| SK01A; CP01; Thử Phong | Một địch; 8% L; 1 | 1,15 A; nếu địch đang tụ, tăng 15% sát thương; thủ giáp chống được | Mũi kiếm chạm trước khi vạt áo kịp lay. |
| SK01B; CP01; Gạt Lưỡi | Bản thân; 10% L; 3 | Hộ thể bằng 0,7 A đến hành động kế; nếu hấp thụ đòn cận chiến, địch suy nhược một lượt | Hai lưỡi thép giữ nhau trong một tiếng rít. |
| SK01C; CP01; Đoạn Nhịp | Một địch đang tụ; 18% L; 4 | 1,6 A và hủy tụ một lần; mục tiêu miễn gián đoạn chỉ nhận sát thương | Đường kiếm cắt ngang phần còn thiếu của động tác. |
| SK02A; CP02; Chấn Cốt | Một địch; 6% L; 1 | 1,0 A và thêm 0,02 H sát thương vật lý; không vượt 1,4 A tổng | Nắm tay dừng trên giáp, tiếng xương vang phía sau. |
| SK02B; CP02; Trầm Tức | Bản thân; 10% L; 3 | Hộ thể 0,08 H, giảm tốc 15% trong hai lượt; tự gỡ khi rút lui | Hơi thở chìm xuống, vai người ấy nặng như đá ướt. |
| SK02C; CP02; Gánh Sơn | Bản thân/đồng minh; 18% L; 5 | Nhận thay 50% sát thương của một đòn tới, giảm 25% phần nhận thay; không nhận thay thiên kiếp cá nhân | Ngươi bước lên một bước, để tiếng va chạm rơi vào mình. |
| SK03A; CP03; Huyết Ti | Một địch có máu; 5% L + 3% H; 1 | 1,35 M, hồi 10% sát thương HP thực đã gây; không có tác dụng hút trên khôi/xác vô huyết | Một sợi đỏ trở về, ngắn hơn khi rời tay. |
| SK03B; CP03; Khóa Mạch | Bản thân; 8% L; 3 | Xóa chảy máu, đổi thành giảm hồi phục 20% trong hai lượt; không chữa vết thương ngoài trận | Máu ngừng rơi, da thịt vẫn để lại đường nứt. |
| SK03C; CP03; Triều Huyết | Một địch; 15% L + 8% H; 5 | 2,2 M; sau đòn chịu suy nhược một lượt; không có phần thưởng khi tự gây thiệt hại | Tiếng tim dội lên rồi cả khoảng sân im bặt. |
| SK04A; CP04; Vấn Danh | Một địch có thức; 8% L; 2 | 0,9 M lên kháng hồn, lộ ý đồ kế tiếp; vô thức không chịu lộ | Ngươi gọi một cái tên, bóng đối phương khựng lại. |
| SK04B; CP04; Lưu Danh | Đồng minh/bản thân; 12% L; 4 | Kháng hồn +25 điểm trong hai lượt; không kéo hồn người đã chết về sống | Một nét chữ ở lại trên vạt áo. |
| SK04C; CP04; Tống Ảnh | Một triệu linh/hồn địch; 20% L; 5 | 2,0 M, nếu hồn hết HP trả nó khỏi trận; không xóa cá thể khỏi luân hồi ngoài ý định | Bóng người rời nền đất như khói gặp gió ngược. |
| SK05A; CP05; Quán Niệm | Một địch; 7% L; 2 | Lộ một kháng và ý đồ, đánh dấu một lượt; không tự cho toàn bộ bí mật đời NPC | Mặt nước trong mắt ngươi lặng đi một nhịp. |
| SK05B; CP05; Trấn Hải | Bản thân; 12% L; 4 | Xóa nhiễu loạn và khủng hoảng; không xóa nợ tâm lý hay lựa chọn đã làm | Tiếng ồn rút xa, những lời cũ vẫn còn. |
| SK05C; CP05; Phá Tưởng | Một địch có thức; 20% L; 4 | 1,7 M lên kháng hồn; nếu đã bị đánh dấu, suy nhược hai lượt; nếu mục tiêu cao hơn ít nhất hai đại cảnh giới, phản niệm gây mất 5% HP tối đa và CH11 trong hai lượt, không vượt một lần mỗi lần tung; cảnh báo trước lựa chọn | Một ý nghĩ vỡ mà không thành tiếng. |
| SK06A; CP06; Mở Khế | Ô triệu linh trống; 12% L; 4 | Gọi một Linh ảnh ba lượt: HP 0,18 H, công 0,4 M; không rơi đồ khi tan, hết trận tự trả | Cánh cửa chỉ hé vừa một cái bóng. |
| SK06B; CP06; Hoàn Khế | Triệu linh của mình; 4% L; 2 | Thu hồi sớm, hoàn 30% MP chiêu gọi, tối đa một lần mỗi lần triệu; không đổi máu triệu thành lãi | Ngươi trả lại dấu ấn trước khi cửa khép. |
| SK06C; CP06; Đồng Môn | Triệu linh của mình; 18% L; 5 | Nó gánh một đòn và tan; chủ nhận 20% sát thương HP thực còn dư, chống gọi vật hiến miễn phí | Bên kia cửa có thứ chạm tay vào dấu tay ngươi. |
| SK07A; CP07; Dẫn Tức | Thú liên kết; 6% L; 2 | Chọn mục tiêu cho đòn thú kế, tăng 15% công của đòn ấy; không điều khiển thú đang hoảng | Tiếng gọi thấp lọt qua tiếng răng nghiến. |
| SK07B; CP07; Chung Mạch | Thú liên kết; 12% L; 3 | Hồi 15% HP tối đa thú; người dùng chịu mất 3% H, không hút từ thú | Vết run của nó chuyển sang cổ tay ngươi. |
| SK07C; CP07; Hộ Chủ | Thú liên kết còn tin cậy; 18% L; 5 | Thú đỡ 40% một đòn, được giáp giảm 30% phần nhận; quyền từ chối nếu tin cậy thấp hiển thị trước | Nó đứng ngang đầu gối, mắt không rời bàn tay ngươi. |
| SK08A; CP08; Chôn Tinh | Mặt trận; 10% L; 2 | Đặt một trận hai lượt, địch vào cận chiến chịu 0,6 M một lần; không kích vô hạn khi đổi mục tiêu | Hạt sáng chìm xuống đất như giọt nước. |
| SK08B; CP08; Chuyển Vị | Bản thân; 14% L; 4 | Tăng cơ hội rút lui 20 điểm cho một lần; không dịch qua phong tỏa cấp cao chưa phá | Dấu chân cũ còn đó, người đã lệch một bước. |
| SK08C; CP08; Khép Bàn | Trận của mình; 20% L; 5 | Tiêu trận đang đặt gây 1,8 M cho tối đa ba địch; cảnh báo sẽ mất trận | Những điểm sáng tắt từ ngoài vào trong. |
| SK09A; CP09; Dẫn Dược | Bản thân/đồng minh; 6% L và một đan hồi có thật; 3 | Dùng đan tăng 15% lượng hồi; đan vẫn tính kháng thuốc và lượt dùng | Mùi dược qua môi, vị đắng tới chậm. |
| SK09B; CP09; Phân Tạp | Bản thân/đồng minh; 10% L; 3 | Giảm một tầng độc đã nhận biết; không chữa mọi loại độc lạ | Cặn đen tụ trên đầu ngón tay. |
| SK09C; CP09; Khóa Độc Tức | Bản thân/đồng minh; 18% L; 5 | Ngừng tick độc hai lượt, sau đó độc tiếp nếu chưa giải; không xóa bệnh ngoài trận | Nhịp thở được giữ lại giữa hai lần đau. |
| SK10A; CP10; Phục Diệp | Bản thân/đồng minh; 8% L và một bó dược phàm; 2 | Hồi 8% H mục tiêu; vô căn vẫn nhận chữa, người dùng cần căn | Lá bị vò nát để lại mùi xanh trong máu. |
| SK10B; CP10; Cầm Huyết | Bản thân/đồng minh; 10% L; 3 | Xóa chảy máu và thêm kháng chảy máu 20 điểm hai lượt; không đóng thương cơ vĩnh viễn | Lớp dược khô giữ mép vải sát vào da. |
| SK10C; CP10; Giữ Mầm | Đồng minh còn sống dưới 25% HP; 20% L; 5 | Hộ thể bằng 12% HP tối đa mục tiêu trong hai lượt; không hồi sinh, không vượt hộ thể chung | Một chút xanh nằm trong khe giáp vỡ. |
| SK11A; CP11; Thử Chất | Một địch dùng trang bị; 8% L; 2 | 1,0 M và lộ độ bền một món; không tự phá đồ độc nhất | Tiếng gõ ngắn tìm đúng chỗ âm thanh bị đục. |
| SK11B; CP11; Chống Nứt | Một trang bị đang mang; 10% L; 3 | Giảm 50% hao độ bền trong ba lượt; không sửa một món đã vỡ | Một đường sáng luồn dọc vết rạn. |
| SK11C; CP11; Rút Chốt | Một địch có món độ bền dưới 30%; 20% L; 5 | 1,6 M; ngừng nội tại món ấy một lượt, không lấy quyền sở hữu | Mảnh kim loại nhỏ rơi trước khi đối phương hiểu. |
| SK12A; CP12; Nét Chặn | Bản thân; 8% L và một phù giấy đã chế; 2 | Hộ thể 0,7 M hai lượt; phù bị tiêu, không nhân từ kho ngoài trận | Nét mực cháy lên ở phần giấy còn trắng. |
| SK12B; CP12; Nét Phá | Một địch; 12% L và một phù giấy; 3 | 1,5 M, bỏ qua 20% hộ thể; vẫn qua kháng thuộc tính | Chữ rách ra thành một vệt sáng mỏng. |
| SK12C; CP12; Nét Tịch | Mặt trận; 20% L và một phù giấy; 5 | Xóa một trận cùng cảnh giới hoặc thấp hơn; trận cao chỉ giảm một lượt, báo trước | Giấy rơi xuống, tiếng trận tắt theo. |
| SK13A; CP13; Khởi Cốt | Ô khôi trống; 10% L và lõi nạp còn điện; 4 | Kích hoạt khôi đã sở hữu: HP theo khung thật, công 0,35 M cộng công khung; không sinh khôi mới | Các khớp gỗ lần lượt trả lời nhau. |
| SK13B; CP13; Giật Dây | Khôi của mình; 12% L; 3 | Đòn khôi kế +40% sát thương, hao 10% độ bền khung; không áp trên linh thú | Sợi dây căng đến mức nghe như tiếng đàn đứt. |
| SK13C; CP13; Tháo Lõi | Khôi của mình; 16% L; 5 | Thu khôi và giữ lõi, tạo hộ thể 0,10 H một lượt; không nổ thành sát thương rồi nhận lại lõi | Khung rỗng sụp xuống quanh một đốm sáng còn nguyên. |
| SK14A; CP14; Điểm Độc | Một địch có sinh lý phù hợp; 8% L và một liều độc đã chế; 2 | 0,7 A và độc ba lượt theo liều, kháng độc giảm cơ hội; không độc lên đá/gỗ vô sinh | Một chấm sẫm mất hút trên lưỡi thép. |
| SK14B; CP14; Hồi Chất | Bản thân/đồng minh; 10% L và giải dược đúng họ; 3 | Xóa độc đúng họ; sai họ báo chưa xác định, cho phép người chơi chấp nhận rủi ro đã mô tả | Vị đắng đổi khác trước khi cơn đau rút đi. |
| SK14C; CP14; Tản Chướng | Tối đa ba địch; 20% L và hai liều độc; 5 | 0,8 M mỗi mục tiêu và suy nhược hai lượt; đồng minh không có bảo hộ chịu độc một tầng, báo trước | Sương nằm thấp, đủ để ai cũng phải bước qua. |
| SK15A; CP15; Gõ Nhịp | Bản thân/đồng minh còn nghe; 7% L; 2 | Gỡ một lượt khủng hoảng; tăng chính xác 5 điểm trong một lượt; không xóa Hành Đạo | Một tiếng gõ giữ bàn tay khỏi run. |
| SK15B; CP15; Lạc Thanh | Một địch có thính giác; 12% L; 3 | 1,1 M, làm chậm 15% hai lượt; bị chặn nếu mục tiêu vô thính giác | Âm cuối đi sai chỗ, chân đối phương cũng vậy. |
| SK15C; CP15; Tịch Khúc | Mặt trận; 20% L; 5 | Dừng một hành động tụ của tất cả bên có nghe, cả đồng minh; không khóa cả trận vô hạn | Tiếng đàn ngừng, những người đang nín thở cùng ngẩng đầu. |
| SK16A; CP16; Lệch Bóng | Bản thân; 8% L; 3 | Tăng ẩn nấp 15 điểm hai lượt; chịu đòn diện rộng làm mất ẩn | Bóng ngươi rời mép đèn trước thân thể. |
| SK16B; CP16; Chạm Gáy | Một địch chưa phát hiện mình; 14% L; 3 | 1,7 A, hết ẩn sau đòn; mục tiêu đã cảnh giác chỉ nhận 1,1 A | Ngón tay tìm đúng khoảng hở sau cổ áo. |
| SK16C; CP16; Đoạn Truy | Bản thân; 20% L; 5 | Một lần rút lui +25 điểm; bỏ lại một món mồi đã sở hữu, không xóa danh tiếng hay dấu truy nã | Một vật rơi xuống, tiếng chân phía sau rẽ hướng. |

#### P.4. Hợp đồng, sản phẩm và giá phải trả của từng TU

Các giá là tổng thù lao của một hợp đồng đúng cấp đã có người đặt, trả bằng linh thạch; trừ vốn vật tư thực đã tiêu để tính lãi ròng và không tự sinh khách hàng. Nếu khách cấp toàn bộ vật tư, trừ đúng khoản vốn vật tư khỏi thù lao bảng, không trừ chi phí ấy lần nữa vào túi người làm. Đơn vị thời gian là ngày game. Thu nhập không tăng tự động vì cảnh giới; hợp đồng cấp cao phải có nhu cầu, vật tư và bên nhận mới. Không dùng hành động tạo rồi phá chính sản phẩm của mình để farm danh tiếng hoặc kinh nghiệm.

| TU | Hợp đồng khởi nghiệp; thời gian; vốn tối thiểu | Kết quả xác định và tổng thù lao | Rủi ro, dữ liệu riêng và điều kiện thành tựu nghề |
|---|---|---|---|
| TU01 | Hộ tống qua đường rừng; 3 ngày; kiếm và 2 LT lương/thuốc | Giao đủ người và hàng: 5 LT; đánh địch không bắt buộc | Sổ người cần bảo vệ, mức lộ tuyến, cam kết; thành tựu giữ 10 đoàn không bỏ người bị thương |
| TU02 | Gia cố hoặc cứu người dưới hầm; 4 ngày; 3 LT thuốc/cọc | Cứu được ca đã nhận: 6 LT; sức lực bị khóa theo thương cơ | Tải chịu đựng, khí độc, cấu trúc hầm; thành tựu cứu 5 tai nạn khác nhau và dạy lại kỹ thuật |
| TU03 | Trị huyết bệnh theo thỏa thuận; 3 ngày; 4 LT vật tư, 5% H tự huyết không gây chết | Một ca ổn: 7 LT, hồ sơ đồng thuận được giữ | Nguồn huyết, tự nguyện, bệnh lây, quyền rút đồng ý; thành tựu 10 ca không cưỡng hiến, hoặc lập huyết trì bằng nguồn chiếm đoạt và chịu hậu quả riêng |
| TU04 | Tìm tên và giải oan một hồn; 7 ngày; 3 LT hương/giấy | Giao chứng cứ hoặc khép khế: 8 LT nếu có người thuê; tự làm không có tiền mặc định | Danh tính, nguyện vọng hồn, khả năng rời đi; thành tựu khép 5 khế có chủ thể khác nhau |
| TU05 | Xác minh ký ức hoặc dò lời nguyền; 5 ngày; 4 LT vật dẫn | Báo cáo mức tin cậy và vật chứng: 8 LT | Độ nhiễu, phản niệm, tri thức đã biết; thành tựu 6 kết luận được chứng cứ độc lập xác nhận |
| TU06 | Triệu linh giữ cửa mùa lũ; 2 ngày; 5 LT khế ấn | Một ca đủ thời hạn và trả linh: 9 LT | Chủ khế, điều kiện trả, số lần vi phạm; thành tựu hoàn 8 khế không để thực thể mắc kẹt, hoặc cưỡng giữ mở nhánh tranh khế |
| TU07 | Nuôi hồi phục thú rồi bàn giao; 30 ngày; 6 LT thức ăn/thuốc | Bàn giao thú khỏe: 12 LT; thú chết mất công và phải xử lý hợp đồng | Đói, tin cậy, loài, quyền sở hữu và sinh cảnh; thành tựu duy trì 3 loài, 3 mùa không bỏ đói |
| TU08 | Sửa trận bảo hộ công trình; 10 ngày; 10 LT vật liệu | Một nút vận hành đúng thử tải: 18 LT | Bản đồ nút, tải, chủ công trình, vật liệu thu hồi; thành tựu cứu 3 công trình khỏi 3 nguyên nhân hỏng khác nhau |
| TU09 | Chế một mẻ đan theo đơn; 5 ngày; 8 LT dược/nhiên liệu | Mẻ đạt 3 viên: 14 LT công, vật tư được khách cấp riêng nếu hợp đồng quy định | Công thức, lô dược, phẩm, độc tố và kháng thuốc; thành tựu 10 mẻ đạt chuẩn thuộc ít nhất 3 công thức |
| TU10 | Trồng một khoảnh dược trị dịch; 90 ngày; 6 LT giống/phân/nước | Thu hoạch đúng hạn tối đa 12 bó: 12 LT công | Giống, đất, mùa, sâu bệnh, nước và nhu cầu bệnh xá; thành tựu hoàn đủ 3 mùa, không cạn giống |
| TU11 | Rèn một pháp khí đã có thiết kế; 15 ngày; 15 LT phôi/nhiên liệu | Đồ đạt thử: 24 LT công, không tự cộng giá bán món vào công | Sơ đồ, khuôn, dòng thuộc tính, độ bền và người sở hữu; thành tựu 6 mẫu đồ khác nhau qua kiểm định |
| TU12 | Viết 6 phù theo lô; 3 ngày; 4 LT giấy/mực | Giao 6 phù có ID lô: 8 LT công | Độ khô mực, người nạp, hạn dùng; thành tựu 60 phù qua ít nhất 4 khách, không bán bản chưa kiểm |
| TU13 | Lắp khôi vận mỏ; 20 ngày; 18 LT gỗ/lõi/kim loại | Khôi qua thử tải: 28 LT công; không mặc định bán thêm khôi của khách | Khung, lõi, lệnh, cự ly, hao mòn và bộ phận thay; thành tựu 3 công trình dùng khôi ổn 90 ngày |
| TU14 | Giám định độc và chế giải dược; 7 ngày; 5 LT mẫu/thuốc/bảo hộ | Nêu đúng họ độc và giao 2 liều: 10 LT | Loại độc, loài mục tiêu, đường phơi nhiễm, vật chứa; thành tựu giải 5 họ độc mà không thử cưỡng ép lên người |
| TU15 | Giữ tinh thần đoàn di tản; 4 ngày; 2 LT dây đàn/ăn ở | Tới nơi, số người còn ổn định được ghi: 7 LT | Người nghe, thính giác, bài đã biết, cường độ, ký ức gợi lại; thành tựu giữ 5 đoàn qua 3 khủng hoảng |
| TU16 | Lấy chứng cứ trong khu bị canh; 6 ngày; 4 LT tin/mồi | Giao chứng cứ: 12 LT; hợp đồng ám sát là một loại riêng, không bắt buộc để lên nghề | Mạng cảm biến, dấu thần thức, mục tiêu, bằng chứng và truy vết; thành tựu hoàn 8 hợp đồng khác mục tiêu theo lời thề tự chọn |

Người chơi được phá các chuẩn mực ở cột thành tựu để theo đường cưỡng đoạt, hủy khế hoặc chiếm quyền. Hành vi ấy mở kết nghề khác, không khóa tiến bộ kỹ năng vì phán xét đạo đức. Thành tựu bảo hộ và thành tựu cưỡng đoạt cùng ghi vào sổ đời, với người được lợi và người chịu hại; không có bản sao phần thưởng để nhận cả hai bằng cùng một sản phẩm.

#### P.5. Vật tư và công thức của bộ pháp môn lõi

“Nhiễu loạn” trong chiêu là CH11 Nhiễu thần; “khủng hoảng” là CH08 Hoảng loạn; suy nhược CH12, phá giáp CH10, choáng CH13, hộ thể CH14, đánh dấu CH15, ẩn nấp CH16, làm chậm CH17, tụ lực CH18. Kháng hồn dùng kênh ST07-Hồn, không dùng tỷ lệ Hành Đạo. Hộ thể mới chỉ làm mới cùng nguồn, nguồn khác cộng nhưng tổng không quá 30% HP tối đa trong trận thường; riêng nghi thức thiên kiếp dùng trần 50% đã ghi tại bảng trợ kiếp; hết thời lượng phần dư mất. Làm chậm giảm thân pháp và chịu trần tổng 30% khi cùng hàn cứng.

Các vật tư BT nằm ở phụ lục dữ liệu nền; vật tư VT-HD nằm trong chương tân thủ. Namespace VT-TU chỉ dùng cho danh mục sau, không phát sinh thêm một món có tên giống rồi bỏ trống hiệu ứng. Tiền linh thạch được sổ giao dịch ghi đến một phần trăm viên; phần lẻ là linh sa đã cân, không là một tỷ giá cố định sang đồng. Khi giao dịch vật lý, một trăm phần linh sa cùng độ tinh khiết tương đương một linh thạch hạ phẩm. Phần mềm về sau cần giữ số nguyên phần linh sa để không tích sai số tiền; đây là yêu cầu dữ liệu, không phải mã triển khai.

| ID; vật tư | Nguồn và giá cơ sở | Chức năng, chất lượng, tồn và hạn dùng |
|---|---|---|
| VT-TU01 Giấy phù | LOC11, lô 10 tờ giá 3 LT; BT18 không tự thay giấy đã dẫn linh | Một tờ tiêu cho mỗi chiêu SK12; phẩm Chuẩn; quầy 40 tờ, thêm 20/tháng; giữ khô một năm |
| VT-TU02 Linh mực | LOC10/11, lô 10 phần giá 5 LT | Một phần nạp một tờ giấy phù; 30 phần/quầy, thêm 15/tháng; hạn 180 ngày |
| VT-TU03 Khế ấn | Chế CT-TU01 hoặc LOC08, 2 LT/một ấn | Một ấn dùng cho một hợp đồng triệu linh ngoài chiến đấu; SK06 trong trận không tiêu thêm ấn sau khi đã ký; 6 ấn, thêm 3/tháng; không hạn khi chưa ký |
| VT-TU04 Linh tinh lõi | LOC11/03, 5 LT/một lõi | Năng lượng khôi, 20 lượt khôi hành động; không phải linh căn và không ghép vào người; 4 lõi, thêm 2/tháng; không tự đầy khi tháo khôi |
| VT-TU05 Khung khôi | Chế CT-TU02 hoặc LOC11, 6 LT/một khung | Khung gỗ tiêu chuẩn chưa có lõi, độ bền 100, HP 60, công phàm 4; 2 khung, thêm 1/tháng; sửa theo CT-TU04 |
| VT-TU06 Khôi vận mỏ | Chế CT-TU03; không có ở quầy bán vô hạn | Ghép một khung, một lõi; mang 20 cân, cần người có căn điều khiển, tầm 30 bước; không tự nhận nghề và không tự tạo sản lượng; HP và độ bền giữ giữa trận |
| VT-TU07 Độc phấn Mộc Hủ | Chế CT-TU05 hoặc LOC10 dưới quản lý, 1 LT/liều | Độc ba lượt, mỗi lượt 2% HP tối đa mục tiêu, trần 6% cho một lần trúng; không cộng tầng cùng họ, làm mới tối đa một lần; 6 liều, thêm 3/tháng; hạn 90 ngày |
| VT-TU08 Giải Mộc Hủ | Chế CT-TU06 hoặc LOC10, 1 LT/liều | Chỉ xóa họ độc Mộc Hủ; không chữa độc chưa biết, huyết độc hoặc linh hồn; 8 liều, thêm 4/tháng; hạn 90 ngày |
| VT-TU09 Thú thực | LOC08, 10 phần giá 3 LT; hoặc CT-TU07 | Một phần nuôi thú nhỏ một ngày, thú vừa hai phần, thú lớn bốn; phẩm phàm, không tăng cảnh giới; 60 phần, thêm 30/tháng; hạn 30 ngày |
| VT-TU10 Hương lưu danh | LOC12, 10 nén giá 2 LT; hoặc CT-TU08 | Một nén cho một buổi đối chiếu chứng hồn; không bảo đảm hồn nói thật; 40 nén, thêm 20/tháng; giữ khô một năm |
| VT-TU11 Hộp định niệm | LOC05/12, 2 LT/hộp | Bảo quản một mẫu ký ức/cảm ứng cho nghiên cứu; 3 mẫu rồi cần nạp 1 LT, không sao chép ký ức kỹ năng liên kiếp; 4 hộp, thêm 2/mùa; độ bền 30 lần mở |
| VT-TU12 Bột tinh trận | LOC05, 10 phần giá 8 LT | Một phần dựng một trận nhỏ ngoài trận; trận lớn dùng hợp đồng định lượng riêng, không tính bằng một phần; 30 phần, thêm 15/tháng; không hạn nếu kín |
| VT-TU13 Linh phôi | LOC11/03, 4 LT/phôi | Một phôi cho một pháp khí cấp Luyện Khí đã có thiết kế; nguyên liệu không tự biến thành pháp khí; 6 phôi, thêm 3/tháng; không hạn |
| VT-TU14 Dược cốt đã kiểm | LOC10, 3 LT/bộ | Một bộ cho mẻ đan sơ cấp CT-TU09; dấu kiểm lô, cây trồng có thể thay nếu vượt kiểm dược; 4 bộ, thêm 2/tháng; hạn 90 ngày |
| VT-TU15 Đàn tịch thanh | LOC09/11, 8 LT/cây | Nhạc cụ tu luyện, không tăng pháp công, cho thi triển SK15; bền 60 lần dùng, thay dây 1 LT/20 bền; 2 cây, thêm 1/mùa; PM15 vẫn diễn bằng đàn phàm |
| VT-TU16 Mồi định ảnh | LOC03, 10 gói giá 5 LT; hoặc CT-TU10 | Một gói có dấu chủ dùng SK16C; bị bỏ lại thật, không hoàn lại khi rút thành công; 20 gói, thêm 10/tháng; hạn 180 ngày |

| VT-TU17 Sơ Phục Đan | Chế CT-TU09 hoặc LOC10, 2 LT/viên | Một viên hồi 20% nền HP Luyện Khí, tức 24 HP; dùng một hành động, tải thuốc tăng một, không scale lên cảnh giới cao; lô Chuẩn, 6 viên/quầy, thêm 3/tháng; hạn một năm |

Mọi quầy có tiền mặt và tồn kho; giao dịch bán vào không vượt khả năng chi trả. Các nhịp bổ sung cần tuyến cung ứng đang hoạt động, không đẻ hàng giữa thành đã bị phá. Tồn kho dùng chung cho NPC và người chơi, không đặt một bản riêng chỉ dành cho nhân vật chính.

| ID | Đầu vào, điều kiện, thời gian | Đầu ra, hiệu suất, hủy và thất bại |
|---|---|---|
| CT-TU01 Khế ấn | Hai VT-TU01, một VT-TU02; TU06 hoặc TU12 từ hành nghề, bàn khắc tại LOC08/11; hai ngày, 12% L/ngày | Một VT-TU03; thành công cơ sở 90%; hủy trước ngày đầu trả toàn vật tư, hủy sau hoặc thất bại mất một tờ và mực, trả tờ còn lại |
| CT-TU02 Khung khôi | Sáu BT12, hai BT11, bốn BT13; TU13 học đồ, xưởng; bảy ngày | Một VT-TU05; cơ sở 85%; thất bại thu hồi ba gỗ và một phôi, không có khung nửa thành phẩm để bán giá đầy |
| CT-TU03 Lắp khôi | Một VT-TU05, một VT-TU04; TU13 hành nghề, hai ngày | Một VT-TU06, cùng serial khung/lõi; 100% khi thử đủ điều kiện, hủy giữ nguyên hai thành phần; không nhân bản qua tháo lắp |
| CT-TU04 Sửa khung | Một BT12, một BT11, 1 LT công xưởng nếu thuê; một ngày, TU13 hoặc thợ thuê | Hồi 25 bền và 25% HP tối đa khôi, không nạp lõi; trần 100; gãy hoàn toàn phải chế khung mới |
| CT-TU05 Mộc Hủ | Hai BT06 đã nhận dạng, một BT08, một VT-TU02; TU14 hành nghề, bảo hộ; hai ngày | Hai VT-TU07; cơ sở 80%; thất bại mất toàn đầu vào và có 10% phơi nhiễm một tầng độc nếu thiếu bảo hộ; cảnh báo trước |
| CT-TU06 Giải Mộc Hủ | Hai BT08, một BT09, một BT02, mẫu độc đã nhận biết; TU14 hoặc TU09 hành nghề; hai ngày | Hai VT-TU08; cơ sở 90%; thất bại ra cặn có đánh dấu không dùng làm giải dược; không cho bán giả mà không ghi hành vi |
| CT-TU07 Thú thực | Hai BT32, hai BT01, một BT04; bếp và hiểu chế độ loài; một ngày | Mười VT-TU09; 100% nếu nguyên liệu chưa hỏng; loài ăn cỏ thay thịt bằng bốn BT06 và sổ nuôi ghi đúng khẩu phần, không tự ép mọi thú ăn thịt |
| CT-TU08 Hương | Hai BT12 nghiền, một BT15, hai BT18; bàn nghề phàm/TU04; hai ngày | Mười VT-TU10; cơ sở 95%; thất bại thành hương thường không có tác dụng lưu danh, bán theo giá hương thường 2 đồng/nén |
| CT-TU09 Đan sơ cấp phục nguyên | Một VT-TU14, hai BT02, hai BT10; TU09 học đồ, lò; năm ngày | Ba VT-TU17 Sơ Phục Đan; cơ sở 75%, nhận kháng thuốc của chương nền; đây là loại đan mới, không đổi hiệu ứng Hồi Xuân Đan đang có |
| CT-TU10 Mồi ảnh | Một BT14, hai BT19, một VT-TU02; TU16/TU12 học đồ; một ngày | Mười VT-TU16; cơ sở 90%; mẫu dấu là của người chế, không sao người khác khi chưa lấy được dấu có chủ thể |

Các tỷ lệ thành công nghề được cộng bậc chuyên gia 5 điểm, tông sư 10 điểm, cộng dụng cụ đạt chuẩn 5 điểm, trừ thiếu bảo hộ hoặc môi trường hỏng 15 điểm; giới hạn 50–98% trừ thao tác lắp ghép chắc chắn. Chất lượng nguyên liệu là điều kiện đạt chuẩn, không dùng cùng một nguyên liệu thối để mua xác suất tốt. Hủy không hoàn thời gian đã trôi; thất bại không sinh kinh nghiệm một sản phẩm mới. Nút chế ghi đầy đủ thiếu vật liệu, cần nghề nào, cần nơi nào, mất bao lâu và tỷ lệ theo nhãn chữ tương ứng.

##### Thực thể triệu linh, linh thú và khôi khác nhau

Linh ảnh của SK06A là **một cấu hình năng lượng theo khế**, không phải linh hồn người chết được sinh ra từ hư vô. Nó không có tuổi, không sang kiếp sau, không rơi vật phẩm và không tính mạng giết để nhận thành tựu. Khế chiếm một chỗ, hết ba lượt thì giải thể. Linh ảnh mặc định có HP 18% H, công 40% M, thủ 20% phòng ngự chủ; chỉ đánh thường một lần mỗi lượt chủ và không dùng kỹ năng độc lập. Giới hạn CP06 có thể tăng thời gian nhưng không số thực thể. Khôi có khung và lõi thật, giữ hỏng hóc và tiêu hao điện; linh thú là cá thể sống có đói, sợ, tin cậy và tuổi thọ.

Mỗi thú được ghép từ một hồ sơ loài đã có trong kho 60 bản ghi bổ sung hoặc hồ sơ gốc và một cá thể có ID. Trước khi cho người chơi liên kết, hồ sơ phải có khẩu phần, nơi ở, tuổi trưởng thành, hành vi hoảng và điều kiện khế. Nếu chưa được biên tập đủ những trường này, loài ấy chỉ là quần thể hoang dã được quan sát/săn theo hồ sơ chiến đấu; không hiện nút nhận nuôi để rồi bỏ trống cơ chế. Đây là cổng phát hành dữ liệu, không cho dùng dữ liệu chưa hoàn tất làm thú đồng hành.

#### P.6. Đầu ra đủ cho thành tựu đan sư và luyện khí sư

TU09 cần ba công thức đan khác nhau: CT-TU09, CT-TU11, CT-TU12. TU11 cần sáu mẫu pháp khí nhập môn từ CT-TU13 đến CT-TU18. Những yêu cầu này không trỏ tới một danh mục chưa được viết. Các món dưới đây là nội dung mới có mã riêng; tên công pháp cùng gốc chỉ thể hiện trường phái, không khiến đồ tự phát toàn bộ hiệu ứng công pháp.

| ID; đầu ra | Hiệu lực, điều kiện, giới hạn | Quầy, giá, tồn, tuổi vật |
|---|---|---|
| VT-TU18 Sơ Tụ Đan | Hồi cố định 8 MP, dùng một hành động, tăng một tải thuốc; vô căn không dùng được; không tạo MP tối đa | LOC10, 2 LT/viên, tồn 6, thêm 3/tháng; hạn một năm |
| VT-TU19 Ôn Mạch Đan | Xóa một lượt CH11 Nhiễu thần và hồi 10 thể lực; không trị hồn thương D06, không trừ tâm ma; dùng một hành động, tăng một tải thuốc | LOC10, 3 LT/viên, tồn 4, thêm 2/tháng; hạn một năm |
| VT-TU20 Dư Phong Linh Kiếm | Ô tay chính, cần có căn và Luyện Khí; công vật lý +4, bền 100; một món không cộng nhiều bản; không tự mở CP01 | LOC11, 12 LT/món, tồn 1, thêm 1/mùa nếu có phôi; không hạn khi chưa hỏng |
| VT-TU21 Trầm Cốt Hộ Giáp | Ô thân, cần Luyện Khí; phòng ngự +5, HP tối đa +10, tốc độ đi giảm 5%; bền 100; tăng trần giữ lượng HP đã mất | LOC11, 14 LT/món, tồn 1, thêm 1/mùa; không tự chữa D02 |
| VT-TU22 Tĩnh Hải Ngọc Bội | Ô ngọc bội, cần Luyện Khí; MP tối đa +8, kháng hồn +3 điểm; bền 80; thay ra không nhận lại MP đã tiêu | LOC03/11, 10 LT/món, tồn 1, thêm 1/mùa |
| VT-TU23 Bố Tinh Trận Bàn | Ô công cụ, cần TU08 và có căn; trận do chủ đặt thêm 20 độ bền trước trần của công trình; chỉ một bàn hiệu lực, không tự sinh trận | LOC05/11, 16 LT/món, tồn 1, thêm 1/mùa; bền 80 lần đặt/tháo |
| VT-TU24 Sinh Tức Dược Đỉnh | Công cụ đặt tại xưởng, cần TU09 và có căn; tỷ lệ chế đan +3 điểm phần trăm trong trần 98%; bền 60 mẻ; một lò trên một mẻ | LOC10/11, 18 LT/món, tồn 1, thêm 1/mùa; nặng 10 cân, không mặc trong giáp |
| VT-TU25 Tịch Thanh Tiêu | Ô nhạc cụ, cần TU15 và có căn; cho dùng SK15 và pháp công +3; không cộng với đàn VT-TU15 cùng lúc; bền 80 lần dùng | LOC09/11, 12 LT/món, tồn 1, thêm 1/mùa |

Các nội tại món này cùng chịu trần và ô trang bị chung. Dòng tăng chỉ số yêu cầu có căn ngừng khi mất căn hoặc ngừng vận hành vì cạn MP theo luật trang bị; vật thể vẫn có trọng lượng và quyền sở hữu. Sửa tại FC tương ứng: vật tư một linh phôi VT-TU13 phục hồi 25 bền cho một món, phí công 1 LT và hai ngày; riêng nhạc cụ dùng dây/vật liệu nhạc cụ giá 1 LT phục hồi 20 bền trong một ngày. Đồ đã mất hoàn toàn không được sửa từ một dấu tên.

| Công thức | Đầu vào; nghề, nơi, thời gian | Kết quả, thất bại và thông tin nguồn |
|---|---|---|
| CT-TU11 Sơ Tụ Đan | VT-TU14×1, VT-TU02×1, BT02×2, BT10×2; TU09 hành nghề, lò, năm ngày | Ba VT-TU18; cơ sở 75%; hỏng mất đầu vào, có cặn không dùng; học đan phương từ NP19 sau một mẻ CT-TU09 đạt hoặc bản kho lạnh |
| CT-TU12 Ôn Mạch Đan | VT-TU14×1, CC-VT02×1, VT-HD13×2, BT02×2; TU09 hành nghề, lò, bảy ngày | Hai VT-TU19; cơ sở 70%; hỏng mất đầu vào; học từ NP19 sau một ca trị CH11 hoặc bản lưu điều dưỡng LOC12 |
| CT-TU13 Dư Phong Kiếm | VT-TU13×2, BT12×1, VT-TU02×1; TU11 hành nghề, lò, bảy ngày | Một VT-TU20; cơ sở 80%; hỏng trả một phôi, không ra kiếm để bán; đồ phổ NP21 hoặc bản thao luyện LOC13 |
| CT-TU14 Trầm Cốt Giáp | VT-TU13×2, BT14×2, BT13×2; TU11 hành nghề, lò và bàn may, mười ngày | Một VT-TU21; cơ sở 75%; hỏng trả một phôi và một da; đồ phổ NP21 hoặc hồ sơ sửa quân giáp LOC13 |
| CT-TU15 Tĩnh Hải Bội | VT-TU13×1, VT-TU11×1, VT-TU02×1; TU11 hành nghề, bàn khắc, bảy ngày | Một VT-TU22; cơ sở 80%; hỏng trả một phôi, hộp định niệm bị tiêu; đồ phổ NP21 hoặc bản quan trắc LOC05 |
| CT-TU16 Trận Bàn | VT-TU13×2, VT-TU12×3, BT12×2; TU11 chuyên gia hoặc hai người TU11 hành nghề và TU08 hành nghề cùng làm, mười ngày | Một VT-TU23; cơ sở 75%; hỏng trả một phôi; đồ phổ NP09 hoặc bản khắc trên bệ LOC05 |
| CT-TU17 Dược Đỉnh | VT-TU13×3, BT10×4, VT-TU02×2; TU11 chuyên gia, lò, mười lăm ngày | Một VT-TU24; cơ sở 70%; hỏng trả một phôi; đồ phổ NP19/NP21 hoặc kho lạnh LOC10 |
| CT-TU18 Tịch Thanh Tiêu | VT-TU13×1, BT12×2, VT-TU02×2; TU11 hành nghề, bàn khắc, bảy ngày | Một VT-TU25; cơ sở 80%; hỏng trả một gỗ; đồ phổ NP18/NP21 hoặc bản nhạc khắc LOC09 |

Đồ phổ là hồ sơ tri thức, giá đọc hoặc sao 2 LT/mẫu khi người giữ còn đồng ý, không tự có trong đầu sau khi mua phôi. Có bản đọc tại chỗ sau biến cố như nguồn đã ghi; lấy bản sao cần hai ngày đối chiếu nếu người giữ đã chết. Các tỷ lệ thành công dùng điều chỉnh nghề, dụng cụ và trần ở P.5. Một người mất nguồn vật liệu có thể mua sản phẩm thật hoặc đổi mục tiêu đời, không có quầy giả vô hạn để bảo đảm mọi thành tựu luôn tiện.

---

<a id="du-lieu"></a>

### 11. Hướng dẫn kiếp đầu và từ điển toàn bộ nhóm dữ liệu

#### D1. Hướng dẫn là một cuốn sổ đang mở, không phải người giữ tay

Tên giao diện: **Những bước còn nhớ**. Đây là một thẻ nổi có thể thu gọn thành biểu tượng cuốn sổ. Mở ra thấy các nhiệm vụ đang được dẫn, tiến độ, phần thưởng, nút đi tới và nút bỏ qua nhỏ. Không dùng chuỗi bong bóng bắt người chơi bấm từng chức năng; không phủ mờ màn hình hoặc khóa điều khiển để giảng giải. Thẻ gọn không tự dừng thế giới; mở phần đọc chi tiết áp cùng luật tạm dừng của các bảng tra cứu, không có cảnh dừng bắt buộc riêng.

Phạm vi tồn tại là **kiếp đầu của hồ sơ luân hồi**, không phải lần khởi chạy ứng dụng đầu tiên trên máy. Sáu nhiệm vụ đầu mở nối tiếp; hoàn thành hoặc chủ động bỏ qua một nhiệm vụ mới mở nhiệm vụ kế. Sau bước thứ sáu, bốn nhóm mở theo thứ tự, mỗi nhóm ba nhiệm vụ; ba nhiệm vụ trong cùng nhóm được thực hiện theo bất kỳ thứ tự nào. Một nhóm kết thúc khi mọi nhiệm vụ của nhóm đã hoàn thành hoặc bị bỏ qua. Người chơi có thể làm bất cứ lúc nào trong kiếp đầu, kể cả sau khi đã có nghề hoặc nhập đạo.

Thẻ không có hạn chót, trạng thái thất bại, phí hủy, trừ quan hệ, trừ Hành Đạo hay trừ Nghiệp Duyên. Không gắn lại cơ chế nhiệm vụ treo thưởng hiện tại đang có hạn và hình phạt. Chết vì hoạt động thế giới vẫn kết thúc kiếp; đó là kết quả của đời sống, không phải hình phạt do nhiệm vụ. Thẻ không đòi người chơi đi vào nguy hiểm mà không cho biết trước.

Đầu kiếp một, người chơi nhận **sổ tay giấy** và các đồ sinh hoạt theo xuất thân. Sổ tay không có linh tính, không chứng minh nhân vật đã biết chuyện luân hồi. Những lời hướng dẫn là ghi chép của người nuôi dưỡng, người quen hoặc chính nhân vật, được thay giọng theo xuất thân. Tên nhiệm vụ và điều kiện giữ nguyên để tránh viết lại cả hệ thống cho từng xuất thân.

Thanh tiến độ có giá trị thật, hiển thị cả chữ và thanh: “Đã săn: 2/5 lượt”. Không đếm số lần bấm, mở giao diện nhầm, thất bại do điều kiện chưa đủ hoặc kết quả bị hủy. Nhiệm vụ xét quyền sở hữu, học kỹ năng hay chọn nghề đọc trạng thái hiện tại; nhiệm vụ hành động đếm biên nhận hành động đã thực sự hoàn tất. Chỉ nhiệm vụ săn yêu đếm số lần kể từ lúc nó được mở; các bước nhận biết và trang bị có thể được ghi nhận từ lịch sử kiếp một để không bắt người chơi lặp thao tác.

Các phần thưởng dưới đây là sản phẩm của thiết kế đề xuất. Chúng không được coi là đã có trong bản game đang chạy. Tên vật phẩm có mã riêng ở D2; tiền đồng là đơn vị sinh hoạt, một quan bằng một nghìn đồng. Linh thạch không có tỷ giá cố định với tiền đồng; giao dịch hai giới chịu nguồn cung, kiểm định và rủi ro ở nơi trao đổi.

#### D2. Danh mục hai mươi vật phẩm được dùng trong hướng dẫn

Mỗi vật phẩm này có một bản ghi định nghĩa, các bản sở hữu có mã riêng. Đồ tiêu hao không tự chuyển sang kiếp khác. “Giới hạn mang” dưới đây là số chồng trong một ô, không làm tăng số ô của túi. Thực phẩm hết hạn phải được cảnh báo trước khi sử dụng. Mọi món đều có thể kiếm ngoài hướng dẫn bằng nguồn ghi trong bảng; hoàn thành hướng dẫn không phải nguồn độc quyền của vật phẩm sinh tồn hay nhập đạo.

| Mã | Tên và mô tả hiển thị | Hiệu lực nội bộ | Cách dùng, giới hạn và nguồn ngoài hướng dẫn |
|---|---|---|---|
| VT-HD01 | Lương khô kê: bột kê ép cứng, hơi khét mùi bếp cũ. | Hồi 65 no, tương đương một ngày khẩu phần cơ bản; không hồi máu hay linh lực. | Dùng ngoài trận; một khẩu phần/ngày; chồng 10; quá hạn sau 30 ngày; mua hàng ăn . |
| VT-HD02 | Nước đun trong ống trúc: ít nhất thứ này không mang mùi bùn. | Hồi 80 khát, tương đương một ngày nhu cầu nước uống; không giải độc đã mắc. | Dùng ngoài trận; chồng 5; quá hạn sau 3 ngày; lấy từ bếp trọ hoặc tự đun. |
| VT-HD03 | Băng vải sạch: vải thô đã luộc, gấp trong giấy dầu. | Chấm dứt một hiệu ứng chảy máu nhẹ; không chữa tổn thương cơ quan. | Dùng một hành động trong trận hoặc mười phút ngoài trận; chồng 5; may hoặc mua y quán. |
| VT-HD04 | Cao cầm máu: mùi thuốc đắng át mùi sắt. | Hồi cố định 8 khí huyết ngoài trận, lấy theo nền phàm nhân; không nhân theo cảnh giới; mỗi lần dùng thêm 1 đơn vị tải thuốc; không chữa thương vừa/nặng. | Một lần mỗi sáu giờ; chồng 5; mua y quán, chế từ cỏ chỉ huyết. |
| VT-HD05 | Cháo dưỡng sức: một bát nóng không hứa chữa được đời người. | Hồi 22 no và 20 khát; tăng hồi khí huyết khi nghỉ trong ngày đó 10%; không cộng dồn nhiều bát. | Dùng ngoài trận; chồng 1; quá hạn sau một ngày; nấu tại bếp hoặc mua quán. |
| VT-HD06 | Thuốc an thần nhạt: vị nhạt đến mức người ta tưởng chỉ là nước. | Giảm 5 mệt, sàn bằng không; không hồi khí huyết, linh lực hay xóa tâm ma/nghiệp chướng. | Một lần/ngày; chồng 3; mua y quán hoặc chế từ an tức diệp. |
| VT-HD07 | Áo vải vá: đường kim vụng, nhưng vải còn đủ dày. | Giáp phàm: phòng ngự cộng 2; độ bền 40; không kháng pháp thuật. | Ô thân; không chồng; vá tại thợ may; mua hoặc chế từ vải thô. |
| VT-HD08 | Gậy gỗ già: cầm chắc tay hơn dáng vẻ của nó. | Vũ khí phàm: công kích cộng 2; độ bền 40; có thể gây sát thương không chí mạng khi người dùng chọn chế ngự. | Ô tay chính; không chồng; mua thợ mộc hoặc tự đẽo. |
| VT-HD09 | Dao đi rừng: lưỡi ngắn có những vết mài không đều. | Công kích cộng 3; độ bền 35; giảm 10% thời gian chặt củi và thu hái có dụng cụ. | Ô tay chính; không chồng; mua lò rèn; không dùng đồng thời với gậy. |
| VT-HD10 | Bộ kim chỉ: vài cây kim đen và một cuộn chỉ nhỏ. | Cho phép công thức vá áo vải; ba lần sử dụng. | Dụng cụ; không chồng; mua thợ may hoặc nghề dệt. |
| VT-HD11 | Đá mài thô: chỉ mài được lưỡi thép phàm. | Khôi phục 10 độ bền của dao/kiếm phàm; không vượt độ bền tối đa; ba lần sử dụng. | Dùng ngoài trận; chồng 3; mua lò rèn hoặc khai đá. |
| VT-HD12 | Cỏ chỉ huyết: thân đỏ, rễ thường lẫn trong bùn. | Nguyên liệu: hai bó và một phần nước tạo một cao cầm máu theo công thức nghề y sơ cấp; không ăn trực tiếp. | Chồng 10; nguồn bìa rừng hoặc hiệu thuốc; giá và sản lượng theo mùa. |
| VT-HD13 | An tức diệp: lá khô thơm nhẹ, phải giữ kín. | Nguyên liệu: một phần lá và một phần nước tạo một thuốc an thần nhạt theo công thức sơ cấp. | Chồng 10; quá hạn sau 90 ngày nếu không đóng kín; mua hiệu thuốc hoặc thu hái. |
| VT-HD14 | Vải thô: sợi dệt không đều, đủ để vá một khoảng áo rách. | Nguyên liệu cho vá áo và băng vải; một tấm tạo hai băng khi có nước sạch và nồi luộc. | Chồng 5; nguồn thợ dệt, cửa hàng vải, sản xuất nghề thủ công. |
| VT-HD15 | Bản chép Dẫn Khí Quyết: nét mực nhòe ở những chỗ bị đọc đi đọc lại. | Cho phép học tâm pháp nhập môn phàm phẩm; cần có linh căn; không tự tạo linh căn; không cấp tu vi tức thời. | Sách không chồng; học ngoài trận trong một ngày; giá thường 15 linh thạch trước biến động; mua tạp hóa tu giới hoặc được thầy truyền. |
| VT-HD16 | Bản chép Dưỡng Thân Quyền: những hình người đứng trụ nhiều hơn vung đấm. | Cho phép học bài võ phàm nhập môn, không yêu cầu linh căn; luyện đủ buổi mới tăng thành thạo; không sinh linh lực. | Sách không chồng; học ngoài trận trong một ngày; mua võ quán hoặc học truyền miệng. |
| VT-HD17 | Linh thạch hạ phẩm có kiểm định: viên đá xám phát ánh sáng rất nhạt. | Một đơn vị tiền tu giới; có thể bị tiêu thụ làm nhiên liệu theo công thức riêng; chưa có vật chứa thì không tự chữa linh lực. | Tiền không chiếm ô; lưu số nguyên không âm theo đơn vị linh sa, một trăm phần bằng một linh thạch hạ phẩm; nhận từ việc tu giới, bán vật liệu được kiểm định hoặc khai mỏ có quyền. |
| VT-HD18 | Thẻ nhận lương: dấu triện của nơi thuê còn rõ. | Biên nhận được đổi đúng một lần thành 80 tiền đồng tại chủ thuê hoặc người kế nhiệm; không phải tiền tệ mua bán. | Một thẻ/việc đã nghiệm thu; không chồng; chỉ có sau lao động hoàn tất; lưu chủ sở hữu và biên nhận đổi. |
| VT-HD19 | Túi dược liệu khô: ba gói giấy buộc cùng một sợi gai. | Mở nhận ba bó cỏ chỉ huyết và hai phần an tức diệp; túi giấy biến mất; không dùng như túi trữ vật. | Không chồng; nhận từ y quán khi làm công hoặc mua cùng lượng nguyên liệu. |
| VT-HD20 | Sổ ghi nợ và lời hứa: giấy mỏng nhưng tên người được viết rất đậm. | Mở mục cam kết, người liên quan, điều đã biết và hậu quả đã chứng kiến; không tiết lộ chân tướng chưa được khám phá. | Vật dụng không thể bán/đánh mất; một cuốn/kiếp; bắt đầu với mọi xuất thân; bản ghi kiếp trước chỉ giữ dưới dạng hồi ức được phép. |

Hiệu lực trong bảng là số liệu nội bộ phục vụ đặc tả, chưa phải số liệu đã cân bằng bằng chơi thử. Vật phẩm VT-HD17 tham chiếu tiền tệ linh thạch hiện hữu chứ không tạo thêm loại tiền cùng tên. VT-HD15 tham chiếu tâm pháp nhập môn hiện hữu sau khi kiểm tra điều kiện linh căn; không nhân bản nội dung Dẫn Khí Quyết thành hai bản ghi cơ chế khác nhau. Mã VT-HD20 là chìa mở giao diện; mất cơ thể không khiến nhật ký của người chơi bị xóa, nhưng nhân vật đời sau chỉ biết phần ký ức đã được cho phép.

**Bản ghi võ học PF-HD01 — Dưỡng Thân Quyền.** Võ phàm nhập môn, không hệ, cần cơ thể có thể cử động, không cần căn, linh lực hay tu vi. Học lý thuyết mất một ngày; một buổi tập mất ba mươi phút, 5 thể lực và một lượt thành thạo; mỗi ngày chỉ buổi đầu được tính. Đạt 5/20/60 buổi ứng với Biết thế/Thuần tay/Vững gốc; khi vận hành bài võ này nhận phòng ngự cố định cộng 1/2/3 theo bậc, không cộng ba bậc với nhau, không cộng lên thọ nguyên hoặc sinh linh lực. Chỉ một bài võ nền được vận hành; đổi sang bài khác bỏ hiệu lực cũ nhưng giữ kiến thức. Không được tập khi thương nặng, đang kiệt sức hoặc đang giao chiến. Học được ở võ quán và người dạy nghề chiến binh; sách VT-HD16 là một nguồn. Ba bậc đều có cùng động tác nền; đây là võ dưỡng thân, không mở thần thông.

**Bản ghi công thức phàm dùng trong HD14.** Tất cả thực hiện ngoài trận, tại bếp/trạm sửa đang có thật, không yêu cầu căn và không nhận thêm kinh nghiệm nếu nguyên liệu vừa chế rồi tháo lặp trong cùng ngày.

| Mã | Đầu vào và dụng cụ | Thời gian, điều kiện | Kết quả, thất bại và giới hạn |
|---|---|---|---|
| CT-HD01 — Băng vải sạch | Một vải thô VT-HD14 và một nước đun VT-HD02; nồi có thể mượn ở bếp. | Hai mươi phút; biết sơ cứu qua người hướng dẫn, y sư hoặc sổ tay. | Chắc chắn nhận hai băng VT-HD03; trừ đầu vào một lần; hủy trước lúc đun trả đầu vào, sau đó không hoàn trả. |
| CT-HD02 — Cao cầm máu | Hai bó cỏ VT-HD12 và một nước VT-HD02; cối và bếp y quán. | Ba mươi phút; thành thạo y phàm từ mức học việc; HD14 cho học một công thức qua y quán mà không nhận toàn nghề y. | Chắc chắn một cao VT-HD04 khi trạm xác nhận đủ điều kiện; thiếu điều kiện không bắt đầu, không trừ đồ. |
| CT-HD03 — Thuốc an thần nhạt | Một phần lá VT-HD13 và một nước VT-HD02; nồi và bếp. | Mười lăm phút; cùng điều kiện học công thức như CT-HD02. | Chắc chắn một thuốc VT-HD06; không biến công thức phàm thành luyện đan; hủy khi đã đun không hoàn trả. |
| CT-HD04 — Vá áo vải | Một vải VT-HD14, một lượt kim chỉ VT-HD10 và áo vải VT-HD07 chưa bị hủy. | Ba mươi phút; người hướng dẫn chỉ cách hoặc đã có nghề thủ công. | Khôi phục tối đa 15 độ bền; không vượt 40; áo đang bền đầy không cho bắt đầu; đầu vào tiêu khi việc được xác nhận. |

Không đưa nấu cháo vào mục tiêu HD14, vì bộ vật phẩm hướng dẫn không mở thêm hạt kê và nhóm nguyên liệu nấu ăn; cháo ở đây là phần thưởng mua được từ quán. Nếu phát triển vòng nấu ăn riêng, đó là công thức thuộc nghề nông/thủ công và phải có nguyên liệu tương ứng trước khi xuất hiện trong giao diện.

#### D3. Mười tám nhiệm vụ có đầy đủ điều kiện, tiến độ, phần thưởng và đích tới

| Mã, trình tự | Nội dung người chơi thấy | Tiến độ được công nhận | Điều hướng khi bấm thẻ | Phần thưởng một lần |
|---|---|---|---|---|
| HD01 — đơn | **Biết mình còn gì.** Mở thân phận, đọc tuổi đời và hoàn cảnh lúc này. | Đã mở trang nhân vật và xem mục xuất thân: 0/1. | Nhân vật → Thân phận; không cần gặp NPC. | Hai lương khô VT-HD01. |
| HD02 — sau HD01 | **Một đường còn hé.** Xem kết quả đo linh căn và giới hạn hiện tại. | Đã mở giải thích linh căn của kiếp này: 0/1. Kết quả của kiếp đầu luôn có căn, không yêu cầu phẩm cao. | Nhân vật → Linh căn → giải thích đang có căn nhưng chưa nhập đạo. | Hai nước đun VT-HD02. |
| HD03 — sau HD02 | **Có ăn mới có ngày mai.** Kiểm tra khẩu phần, dùng một món ăn khi cần. | Đã mở túi và xác nhận tình trạng nhu cầu: 0/1; nếu thiếu ăn cần dùng thành công một khẩu phần. Đã đủ ăn thì chỉ đọc tình trạng, không bị ép lãng phí đồ. | Túi đồ → nhóm sinh hoạt; tiêu điểm tới món ăn dùng được. | Một bộ kim chỉ VT-HD10 và một vải thô VT-HD14. |
| HD04 — sau HD03 | **Hỏi một người còn chịu trả lời.** Hỏi cách kiếm bữa ăn quanh nơi ở. | Hoàn thành một cuộc đối thoại hỏi việc với NPC phù hợp: 0/1. Không đòi tăng thiện cảm. | Người quen theo xuất thân; nếu người đó chết, chọn chủ quán, quản sự bến hoặc bảng tuyển dụng có người giao việc sống. | Một băng sạch VT-HD03 và một cao cầm máu VT-HD04. |
| HD05 — sau HD04 | **Đổi một ngày lấy một ngày.** Làm trọn một việc có trả công. | Một việc hợp pháp hoặc công việc ngầm tự chọn đã được nghiệm thu: 0/1. Việc không yêu cầu giết, cướp hay cam kết thế lực. | Bảng việc tại nơi hiện tại → việc không cần vốn; mở rõ thời gian và công. | Một thẻ nhận lương VT-HD18, ngoài công việc trả theo hợp đồng thường. |
| HD06 — sau HD05 | **Khép mắt khi còn nơi nằm.** Nghỉ một lượt tại chỗ đủ an toàn. | Nghỉ đủ một lượt chuẩn: 0/1; thời gian, tiền trọ và hồi phục đều dùng luật thế giới. Có thể chọn chỗ trú miễn phí theo xuất thân. | Điểm nghỉ gần nhất có thể tiếp cận; mở lựa chọn giá/thời gian trước khi xác nhận. | Một cháo dưỡng sức VT-HD05 và một thuốc an thần VT-HD06. |
| HD07 — nhóm A | **Đường đi có giá.** Xem đường và đi tới một địa điểm lân cận. | Di chuyển hoàn tất một tuyến có thể đi bộ: 0/1; không đếm đổi tab bản đồ. | Bản đồ → chọn một tuyến đã biết, hiện ước lượng thời gian, rủi ro và nhu cầu. | Một dao đi rừng VT-HD09. |
| HD08 — nhóm A | **Đếm trước khi trao.** Xem giá và hoàn tất một giao dịch nhỏ. | Một lần mua hoặc bán tự nguyện có giao hàng và thanh toán thật: 0/1; giao dịch với chính mình không tính. | Quầy mua bán gần nhất; nếu không có quầy thì người bán rong có giao dịch hợp lệ. | Một đá mài VT-HD11 và hai lương khô VT-HD01. |
| HD09 — nhóm A | **Đừng chỉ trông vào may.** Học một cách dưỡng thân hoặc một tâm pháp. | Học được Dưỡng Thân Quyền hoặc một tâm pháp nhập môn: 0/1. Nếu đã học trước khi mở thì hoàn tất ngay. | Sở học → chọn nhánh võ học/tu học; mở người dạy hoặc nguồn sách có thể tiếp cận. | Người dạy cấp một trong hai bản chép VT-HD15/VT-HD16 theo lựa chọn; nếu đã có đúng bản thì nhận hai băng sạch VT-HD03 thay sách trùng. |
| HD10 — nhóm B | **Trước khi bước vào bụi tối.** Chuẩn bị vũ khí và vật cứu thương. | Hai mục: có vũ khí phàm còn bền đã trang bị, có ít nhất một băng hoặc cao dùng được: 0/2. Nếu chưa có vũ khí, nhận trước một gậy VT-HD08 từ sân luyện; đã có vũ khí thì không nhận gậy. | Túi → trang bị; sau khi đủ vũ khí chuyển tiêu điểm sang tiêu hao. | Một áo vải vá VT-HD07; nếu đã có giáp tốt hơn không tự thay đồ. Gậy ứng trước không cấp lại. |
| HD11 — nhóm B | **Đối mặt, rồi còn trở về.** Hoàn thành năm chuyến săn phù hợp sức mình. | Năm hợp đồng săn yêu thú yếu hoặc năm buổi diễn luyện chống yêu tại võ trường được người hướng dẫn nghiệm thu: 0/5. Chọn nhánh diễn luyện từ đầu hoặc đổi sau mỗi lượt; không đòi giết. Mỗi chuyến/buổi có biên nhận khác nhau. | Bảng săn → mức nhập môn, mặc định ẩn mục tiêu vượt sức; nút đổi sang sân luyện không mất tiến độ. | Một túi dược liệu VT-HD19 và hai cao cầm máu VT-HD04. |
| HD12 — nhóm B | **Thân này không tự lành.** Hiểu thương thế và dùng một cách hồi phục hợp lệ. | Mở chẩn thương rồi nghỉ, băng bó hoặc chữa trị đúng điều kiện: 0/1. Khi hoàn toàn khỏe, xem chẩn thương và lập phương án hồi phục cũng tính; không yêu cầu tự gây thương. | Nhân vật → Thương thế → nghỉ/y quán/đồ dùng phù hợp. | Hai băng sạch VT-HD03 và một thuốc an thần VT-HD06. |
| HD13 — nhóm C | **Một hơi thở cũng tốn đời.** Tập đúng một lượt võ học hoặc dẫn khí bằng tâm pháp đang vận hành. | Một lượt luyện võ hoàn tất hoặc một lượt thổ nạp hợp lệ: 0/1; phải có kỹ năng đang học; không đếm việc bị từ chối. | Sở học → vận hành tâm pháp → Thổ nạp; hoặc Võ học → Luyện tập. | Ba linh thạch VT-HD17 từ người dạy, không tự tăng tu vi. |
| HD14 — nhóm C | **Giữ lấy thứ còn sửa được.** Hoàn tất một sản phẩm hoặc sửa một món đồ. | Một lần CT-HD01, CT-HD02, CT-HD03 hoặc CT-HD04 thành công: 0/1; trả nguyên liệu và thời gian thật; đặt trước đủ nguyên liệu miễn phí cho đúng một công thức được chọn. | Luyện chế → mục sinh hoạt/phàm nghề; không dẫn phàm nhân vô căn ở đời khác vào luyện đan. | Một bộ kim chỉ VT-HD10 và hai vải thô VT-HD14. |
| HD15 — nhóm C | **Có người nhớ mặt.** Thiết lập một quan hệ hai chiều. | Một lần trao đổi thông tin, thực hiện lời hẹn nhỏ hoặc tặng quà được nhận: 0/1; không yêu cầu mức thiện cảm, không ép kết giao người tốt. | Giao tình → một NPC đã gặp; hiện điều họ đồng ý trao đổi. | Một sổ VT-HD20 đã cập nhật quan hệ và hai lương khô VT-HD01; không tạo sổ vật lý thứ hai. |
| HD16 — nhóm D | **Việc đã làm còn để lại gì.** Đọc lại một lựa chọn và điều đã quan sát được sau nó. | Một hậu quả thực tế đã được ghi trong nhật ký, người chơi mở xem: 0/1; kết quả xấu vẫn tính; không bắt phát sinh điểm thiện hay điểm tà. | Sổ tay → dấu vết hành động; nếu chưa có, dẫn đến một sự kiện đời thường gần nơi ở. | Hai thuốc an thần VT-HD06; phần thưởng không được xóa hậu quả vừa gây ra. |
| HD17 — nhóm D | **Chọn việc, chưa cần chọn cả đời.** Nhận một vai trò có thể từ bỏ. | Được chấp nhận làm học việc, lính tuyển, người buôn, lao động tự do, môn đồ võ học hoặc môn đồ tu học: 0/1; không yêu cầu tuyên thệ trọn đời. | Sổ nghề → các cơ hội đủ điều kiện tại nơi biết; dự phòng lao động tự do không cần vốn. | 120 tiền đồng; không tự tặng chức vị, danh vọng hay điểm Hành Đạo. |
| HD18 — nhóm D | **Viết một điều mình muốn.** Ghi một nguyện vọng cho kiếp này và biết chỗ theo dõi. | Chọn một mục tiêu đời hiện có hoặc tự viết mục tiêu riêng rồi mở trang theo dõi: 0/1; không phải lời thề có phạt. | Sổ tay → Nguyện vọng; ba gợi ý đầu là đủ sống, gây dựng chỗ đứng, tìm đường nhập đạo; cho phép sửa. | Ba linh thạch VT-HD17 và mở trang tổng kết điều đã học. |

Quà ở HD09 là **cấp học liệu trước khi học**, sau khi nhận lựa chọn; hoàn thành ghi nhận quyền sở hữu/học xong theo thứ tự, không yêu cầu đã học mới được cấp sách. Biên nhận cấp sách khóa ngay khi nhận nên thoát mở lại không nhận thêm. Quà cuối nhiệm vụ giữ phần sách đã ứng trước, không cấp lần hai. HD14 cũng ứng trước đúng bộ nguyên liệu một công thức một lần, chưa làm thì còn nợ nguyên liệu trong thẻ chứ không đòi hoàn trả khi bỏ qua. Người chơi có thể nhận ứng rồi bỏ qua, nhưng không thể lặp nhận và không kiếm lời đáng kể từ gói hỗ trợ hữu hạn. Mọi nhiệm vụ có phát đồ ứng phải ghi cả dòng “Đã nhận trước” và phần thưởng còn nhận khi hoàn tất.

Nếu cần giữ cảm giác nghèo khó ở đầu đời, tổng quà hướng dẫn là nguồn hữu hạn từ thân hữu và người dạy, không phải ví tự sinh tiền. Kinh tế không tính khoản quà này thành thu nhập nghề chuẩn. Mỗi nguồn cho quà có một dòng giải thích văn cảnh theo xuất thân; không làm NPC tặng cùng một món lần nữa khi nhiệm vụ tự khôi phục.

#### D4. Hiển thị, bỏ qua, điều hướng và lưu trạng thái

Mỗi thẻ có tên, một câu mục tiêu, các điều kiện, thanh tiến độ, phần thưởng còn lại và nguồn cấp. Nhiệm vụ nhiều điều kiện hiển thị từng điều kiện; thanh tổng chỉ đếm điều kiện đã đạt, không cho hai thao tác nhỏ cùng trọng số với năm cuộc săn khi chúng không thuộc cùng mục tiêu. Thưởng linh thạch và tiền đồng được phân biệt bằng biểu tượng lẫn chữ. Dòng “Không có hạn chót · Không có hình phạt bỏ qua” luôn xuất hiện ở phần chi tiết.

Nút thu gọn ghi **Ẩn hướng dẫn**; biểu tượng sổ hiển thị **Hiện hướng dẫn**. Ẩn không hủy, không ngừng tiến độ, không đòi người chơi xác nhận. Cấu hình ghi nhớ trạng thái này trong kiếp một. Thu gọn chỉ để một dấu nhỏ khi có nhiệm vụ hoàn tất; không tự bật lại sau mỗi hành động.

Nút bỏ qua là biểu tượng nhỏ có nhãn truy cập **Bỏ qua nhiệm vụ này**. Popup chính xác:

> **Bỏ qua nhiệm vụ?**  
> Bỏ qua sẽ không nhận lại phần thưởng còn lại của nhiệm vụ này trong kiếp đầu. Các nhiệm vụ sau vẫn tiếp tục. Phần đã nhận trước được giữ lại.  
> **Quay lại** · **Bỏ qua, mất phần thưởng còn lại**

Chỉ cho bỏ qua nhiệm vụ đang mở; không có nút bỏ qua cả chuỗi ở gần nút thu gọn. Đã hoàn tất và nhận thưởng thì không còn nút bỏ qua. Hoàn tất mà chưa lĩnh thưởng vẫn có thể bỏ qua, nhưng popup phải liệt kê phần thưởng đang từ bỏ. Không cần popup cho nhiệm vụ đã đóng. Sau xác nhận, trạng thái bỏ qua là vĩnh viễn trong hồ sơ của kiếp đó; người chơi vẫn được dùng chức năng đã chỉ dẫn và tự kiếm đồ ngoài đời.

Điều hướng theo **ý định thao tác**, không gắn cứng tọa độ màn hình. Đích có thể là trang, địa điểm, NPC, hành động hoặc hộp thoại. Khi bấm, mở đúng lớp cha trước, rồi đưa tiêu điểm tới mục tiêu; không tự thực hiện mua bán, dịch chuyển, tiêu hao hay nhận ràng buộc. Mục tiêu chưa được khám phá thì chỉ hiện địa danh được nhân vật biết, không phá sương bản đồ. Nơi cần tới ngoài khả năng hiện tại thì thẻ đổi sang nguồn thay thế gần nhất đã được định nghĩa.

Thứ tự dự phòng cho NPC hướng dẫn: nhân vật gắn xuất thân còn sống và không thù địch → người thay thế trong cùng chức năng → dịch vụ công cộng tại địa điểm an toàn đã biết → bản ghi tự học trong sổ cho phần chỉ cần đọc. Công việc, giao dịch, chữa trị hay luyện tập cần thế giới thực sự hỗ trợ thì vẫn phải có người/dịch vụ thật; không giả hoàn thành khi không có mục tiêu hợp lệ. Nhiệm vụ được chờ vô hạn và cho bỏ qua. Không hồi sinh NPC, mở shop ma hoặc biến phế tích thành điểm an toàn chỉ để giữ hướng dẫn.

Nếu bấm khi đang chiến đấu, đang giải quyết lựa chọn cốt truyện hoặc trong hộp xác nhận giao dịch, lưu ý định điều hướng và hiện **Sẽ mở sau khi việc hiện tại kết thúc**. Người chơi được hủy ý định chờ. Chỉ điều hướng khi màn đang chờ xử lý thực sự khép lại; không đóng ép cảnh đang lựa chọn.

Trạng thái lưu gồm mã nhiệm vụ, lần mở, bộ đếm theo loại mục tiêu, danh sách biên nhận đã tính, các khoản đã ứng, trạng thái đủ điều kiện nhận thưởng, biên nhận trao thưởng, thời điểm bỏ qua và dấu xác nhận. Ghi thưởng và đóng nhiệm vụ là một thao tác lưu thống nhất. Tải lại sau khi phát thưởng không nhận thêm; mở nhiều cửa sổ cùng hồ sơ phải có một phiên được quyền ghi. Dữ liệu tiến độ nhận từ kết quả hành động, không nhận trực tiếp từ giao diện.

Khi chết trong kiếp một, đóng chuỗi ở trạng thái **Kiếp đã khép**, không đổi thành thất bại. Thưởng chưa nhận không chuyển sang kiếp sau. Nhật ký tổng kết nói rõ những gì đã làm được; không chế giễu người chết sớm. Kiếp hai trở đi không sinh thẻ, không phát nhiệm vụ hoặc đồ ứng từ chuỗi, kể cả khi chuỗi đời một còn dở. Mục tra cứu thường trực vẫn tồn tại trong Sổ tay, chứa giải thích đã mở và mục lục luật; đó không phải chuỗi nhiệm vụ tân thủ quay lại.

Hồ sơ cũ không có số thứ tự kiếp cần dùng bằng chứng lịch sử đã lưu để xác định. Nếu đã có bản ghi tử vong hoặc nâng cấp chân linh, coi là đã qua kiếp một; không tự nhận quà hồi tố. Nếu chắc chắn đang ở đời đầu và chưa có bằng chứng chuyển kiếp, cho chuỗi nhận biết trạng thái hiện tại, giữ nguyên đồ và lịch sử, không cuộn ngược thời gian. Nếu không xác định được, chỉ mở Sổ tay tra cứu, không tự tạo một “kiếp đầu” mới có thưởng. Tạo hồ sơ mới là lựa chọn tách riêng, không phải tác dụng phụ của chuyển phiên bản.

#### D5. Phân loại dữ liệu và quy ước chung

Có năm lớp dữ liệu cần tách rõ:

1. **Dữ liệu định nghĩa:** các loại căn, nghề, vật phẩm, NPC mẫu, địa điểm, sự kiện, cốt truyện và quy tắc. Người biên soạn tạo trước; mọi người chơi cùng phiên bản dùng cùng nghĩa.
2. **Dữ liệu thế giới của hồ sơ:** trạng thái thế lực, kho chợ, người đang sống, đường còn mở, mùa vụ và biến động; sinh từ định nghĩa nhưng phải lưu để không quay lại khi tải.
3. **Dữ liệu kiếp hiện tại:** cơ thể, tuổi, tài sản, sở học, quan hệ, lựa chọn, cuộc chiến và công việc đang dở.
4. **Dữ liệu xuyên kiếp:** thứ tự kiếp, hồ sơ hậu quả, ký ức được phép giữ, vết thương chân linh, các điểm thức tỉnh và kết cục đã chứng kiến.
5. **Dữ liệu trình bày và vận hành:** câu chữ, biểu tượng, âm thanh, bố cục, quyền tiếp cận, bản dịch, phiên bản dữ liệu, biên nhận lưu, công cụ kiểm định và phản hồi chơi thử.

Mỗi bản ghi định nghĩa phải có: mã ổn định duy nhất; tên tiếng Việt; mô tả ngắn; trạng thái biên soạn; người chịu trách nhiệm; phiên bản xuất hiện; phiên bản sửa gần nhất; nguồn hiện có hoặc “sáng tác mới cho Phù Sinh”; lý do thiết kế; danh sách mã liên quan. “Sáng tác mới” là nguồn hợp lệ, không giả gán cho truyện tham khảo. Chưa sử dụng ngoài game thì trạng thái là **đề xuất đã biên soạn**, không tự gọi **đã triển khai**.

Loại dữ liệu dùng trong các bảng: mã là chuỗi không đổi theo bản dịch; chữ là văn bản UTF-8; số nguyên cho số lượng, tiền và thứ tự; số thực có giới hạn cho hệ số; cờ cho đúng/sai; mốc thời gian là số giờ game tính từ mốc thế giới thế giới kể từ mốc lịch; ngày là ngày lịch thế giới; danh sách có thứ tự được lưu theo thứ tự có nghĩa; tập mã không được chứa trùng. Không lưu tên hiển thị làm khóa liên kết. Mọi trường số có đơn vị, khoảng hợp lệ, quy tắc làm tròn và mức cộng dồn trong bảng quy tắc tương ứng.

Tuổi hiển thị được tính từ ngày sinh và lịch thế giới; không có một đồng hồ tuổi thứ hai chạy riêng. Trạng thái chưa biết, không tồn tại và bằng không có nghĩa khác nhau; một người chưa đo căn không được coi là vô căn. Tương tự, chưa biết động cơ NPC không được lưu là vô tội hoặc có tội. Thiếu tham chiếu bắt buộc là lỗi dữ liệu, không được điền bằng một nhân vật hoặc phần thưởng tùy ý.

#### D6. Danh mục các tập dữ liệu định nghĩa bắt buộc

Bảng sau là **từ điển dữ liệu sản xuất**, xác định mọi loại dữ liệu cần lưu và quan hệ của chúng. Các danh mục nội dung đã được biên soạn nằm ở những phần thiết kế tương ứng; bản thân việc kê tên một bảng không thay thế các dòng nội dung. Với dữ liệu hiện có, phải xuất đối chiếu trước khi nhập phiên bản mới để biết dòng nào được giữ, chuyển nghĩa hoặc ngừng sử dụng.

| Tập dữ liệu, khóa | Các trường bắt buộc và kiểu/đơn vị | Liên kết và ràng buộc | Người sở hữu, nguồn và cách nghiệm thu |
|---|---|---|---|
| Lịch thế giới, mã lịch | Chữ: tên lịch; nguyên: phút/giờ, giờ/ngày, ngày/tháng, tháng/năm; tập ngày mùa; quy tắc năm nhuận; mốc mở đầu; quy tắc tuổi. | Một lịch duy nhất chi phối di chuyển, tuổi, mùa vụ, sinh nhật, kỳ ngộ và hợp đồng. Không được âm thời gian. | Thiết kế hệ thống; đối chiếu lịch đang dùng; nghiệm thu qua ranh ngày, tháng, năm và lượt dài. |
| Hồ sơ chỉ số, mã chỉ số | Tên, đơn vị, miền giá trị, cơ sở tính, nguồn tăng/giảm, điều kiện hiển thị, nhãn ước lượng, làm tròn, giới hạn, thời điểm cập nhật. | Gồm khí huyết, linh lực, công, thủ, thân pháp, chính xác, né, chí mạng, kháng, thọ nguyên, thương thế, no/khát/mệt, thể lực, tải thuốc, ngộ tính, đạo tâm và thành thạo nghề. Vô căn có linh lực tối đa bằng không. | Thiết kế hệ thống; số gốc đã tồn tại phải có đối chiếu; mọi mô tả hiệu lực phải trỏ chỉ số thật. |
| Linh căn, mã loại căn | Tình trạng đã đo/chưa đo; tập hệ; phẩm căn; hệ số hấp thu; tương hợp; điều kiện tạo/chuyển; cách phát hiện; nhãn kỳ thị. | Vô căn là tình trạng độc lập, không giả thành căn có hệ “không”; kiếp đầu không được rút vô căn. Không vượt giới hạn số hệ. | Thiết kế hệ thống; đối chiếu ROOT hiện hữu; nghiệm thu mọi nguồn nhập đạo. |
| Bảng sinh thân, mã cấu hình | Kiếp áp dụng; trọng số xuất thân; trọng số căn; khí vận; thể chất; tuổi bắt đầu; gia đình; địa bàn; tài sản; gánh nợ; điều chỉnh nghiệp; các điều kiện loại trừ. | Tổng trọng số hợp lệ; không có tổ hợp vô nghĩa như người bị bỏ rơi có cha mẹ đang đồng cư mà không giải thích; không xóa toàn bộ lựa chọn vì nghiệp. | Thiết kế hệ thống và nội dung; cấu hình đầu đời được duyệt riêng; đối chiếu từng tổ hợp ngoại lệ. |
| Cơ duyên cải căn, mã cơ duyên | Nguồn tin, mức tin, chuỗi bước, nguyên liệu, người thực hiện, thời gian, giá, rủi ro, kết quả căn, thất bại, hủy giữa chừng, giới hạn đời, hồ sơ hậu quả. | Chỉ tạo căn theo quy tắc được chốt; ghi vật liệu đã tiêu; không tạo lại qua đọc sách hoặc nhập ký ức. Các nguồn thay thế phải có địa chỉ thật. | Nội dung và hệ thống; tám cơ duyên được biên soạn; kiểm toàn bộ ngõ vào/ra và đường phàm nhân tiếp cận. |
| Thể chất, mã thể chất | Tên, mô tả, điều kiện sinh, hiệu lực tức thời, chu kỳ năm, xác suất, lợi/hại, tuổi có hiệu lực, trần đời, xung đột, tooltip định tính. | Một hiệu lực không chạy vừa theo tuổi vừa theo tổng thời gian; hồi máu không cộng vào máu tối đa; vô căn không tự mở linh lực. | Hệ thống; mười tám bản ghi chốt; so mô tả với cơ chế, xét tương tác già yếu và thương thế. |
| Khí vận, mã khí vận | Tên, nguồn, thiên tiên/hậu thiên, nhóm sự kiện bị tác động, trọng số, chu kỳ, hiệu lực ngay, rủi ro, trần và nhãn. | Không can thiệp lại kết quả đã sinh; không thay đạo đức bằng may mắn; độc lập với căn. | Hệ thống; mười hai bản ghi chốt; xem phân bố và loại trừ. |
| Hành Đạo, mã bậc | Điểm nội bộ, cửa sổ hành vi, biên bậc, nhãn chính/tà, lợi/hại, xung đột thế lực, cách đổi khuynh hướng. | Tổng ảnh hưởng không bị tăng vô hạn bằng hành động nhỏ; UI không hiện tỷ lệ số; danh tiếng riêng với Hành Đạo. | Hệ thống; bảng bậc và hiệu ứng đã duyệt; đối chiếu cùng hành động có/không nhân chứng. |
| Nghiệp Duyên, mã quy tắc | Loại chủ thể bị tác động, tổn hại, cứu giúp, chủ ý, hiểu biết hợp lý, khả năng tránh, quy mô, chứng cứ, thiện duyên, nghiệp chướng, thời gian chín, đời nhận. | Không lấy nhãn ma tu làm bằng chứng phạm ác; không cộng trừ giản đơn thiện ác để xóa nợ; giới hạn phản hồi cho cùng chủ thể. | Hệ thống và biên kịch; mỗi sự kiện có bảng hậu quả; kiểm không tăng nghiệp bằng sinh vật được triệu hồi để farm. |
| Thiên kiếp, mã mẫu | Cảnh giới, dạng đợt, số lượt, ý đồ, công/kháng, hiệu lực tâm ma, đầu vào nghiệp, điều kiện chuẩn bị, cách rút, thất bại và thưởng. | Một lần vượt một cửa nhận thưởng một lần; trần thưởng phần khó; tính cả chi phí sinh tồn và thương tổn. | Chiến đấu; giữ cảnh giới thực tế của Phù Sinh; nghiệm thu các mốc nghiệp và cách kết thúc trận. |
| Cảnh giới, mã cảnh | Tên, thứ tự, tầng, tu vi cần, lịch luyện cần, tuổi thọ, giới hạn tâm pháp, điều kiện cửa, kiếp, suy cảnh và phi thăng. | Không tự thêm cảnh giới vì đổi nghề; phàm võ có thang riêng; mọi hiệu lực lên cảnh có mã nguồn. | Hệ thống; đối chiếu sáu cảnh giới hiện có; kiểm rớt cảnh, mất căn và các cửa bị khóa. |
| Nghề và vai trò, mã nghề | Miền phàm/tu, điều kiện, học việc, công việc lặp, thành thạo, sản phẩm, thu nhập, địa bàn, tổ chức, rủi ro, đường rời, điểm kết nghề. | Nghề tu cần căn và điều kiện nhập đạo theo loại; sát thủ phàm và sát thủ tu là hai bản ghi; đổi nghề không xóa nợ hợp đồng. | Thiết kế nghề; mười tám phàm và mười sáu tu; mỗi nghề có vòng kiếm sống, lựa chọn và kết cục thật. |
| Võ học/công pháp, mã pháp môn | Miền phàm/tu; nhóm kỹ thuật; hệ; phẩm; điều kiện học/vận hành; chiêu dẫn xuất; thành thạo; tốc độ; giá tu; phản phệ; thang cảnh tối đa; nguồn học. | Không nhúng chiêu chỉ bằng tên; công pháp hồn/thể/huyết tu không vượt khóa vô căn; truyền kiếp không đồng nghĩa dùng được. | Hệ thống và chiến đấu; đối chiếu sở học gốc; tất cả mô tả chiêu phải dẫn tới hành động có định nghĩa. |
| Chiêu chiến đấu, mã chiêu | Đích, tầm, loại sát thương, hệ số, tài nguyên, hồi chiêu, thứ tự, trúng/né, hiệu ứng, điều kiện, âm báo và lời kể. | Không mục tiêu bất hợp lệ; có cách xử lý khi chủ thể chết trước lượt; một hành động chỉ trừ tài nguyên một lần. | Thiết kế chiến đấu; đối chiếu hành động đang có; nghiệm thu từng loại đích và phản ứng. |
| Hiệu ứng trạng thái, mã hiệu ứng | Tên, lợi/hại, nguồn, cường độ, thời lượng theo lượt/phút, quy tắc cộng, miễn/kháng, giải, thời điểm kích hoạt và dấu hiệu. | Không đổi lượt thành ngày vô ý; xác định qua chết/đột phá có giữ không; có trần chồng. | Chiến đấu và hệ thống; kiểm hết hạn, chuyển cảnh và kháng. |
| Thương thế/bệnh/già yếu, mã loại | Mức nhẹ/vừa/nặng, vị trí, triệu chứng, hậu quả, thời gian phát, tiến triển, chẩn đoán, điều trị, giá và tật để lại. | Hồi khí huyết không chữa mặc định mọi thương; thuốc phàm không chữa linh hồn nếu không có hiệu lực rõ. | Hệ thống sinh tồn; đối chiếu ba bậc hiện hữu; kiểm cảnh báo khả năng chết khi chờ. |
| Vật phẩm, mã loại | Nhóm, phẩm, mô tả, khối lượng, chiếm ô, chồng, độ bền, điều kiện dùng, hiệu lực, thời gian, tải thuốc, tuổi hàng, mua/bán, nguồn, giao dịch và truy xuất. | Mọi thưởng/giá/công thức dùng mã thật; sách, tài liệu, túi trữ vật, trứng, pháp bảo, đan dược, thực phẩm, chìa và chứng từ có trường con theo loại. | Quản lý nội dung vật phẩm; nguồn gốc Excel phải có dòng đối chiếu; không giữ món vô tác dụng chỉ để tăng số lượng. |
| Trang bị và túi, mã loại ô | Vị trí, số ô, loại nhận, điều kiện linh lực, khả năng dùng khi vô căn, quy tắc tháo khóa, nặng, bền, sửa và đánh mất. | Vô căn không dùng túi trữ vật linh lực; không xóa đồ đang trong ô khóa; xác định cách lấy đồ khi mất linh lực/căn. | Hệ thống tài sản; đối chiếu mười ô mang và túi hiện có; kiểm quá tải và đồ khóa. |
| Công thức/chế tác, mã công thức | Đầu vào số nguyên theo đơn vị, chất lượng, dụng cụ, nghề, địa điểm, thời gian, xác suất, thất bại, hoàn trả, sản phẩm và phế liệu. | Không có vòng mua-chế-bán tạo lợi nhuận vô hạn không tốn thời gian; một nguyên liệu không trả lại sau khi đã bị dùng. | Thiết kế kinh tế; mọi sản phẩm có nguồn; nghiệm thu cân bằng nguồn và đích vật liệu. |
| Linh thú/triệu vật/khôi lỗi, mã loài | Miền sinh học/linh thể/chế tạo, căn cần, khế ước, thức ăn, chỗ ở, hành vi, trưởng thành, kỹ năng, điều khiển, tử vong, giải ước và ký ức. | Thú nuôi phàm không tự biến thành khiển thú thuật; triệu vật không cho chiến lợi phẩm/nhân quả lặp vô hạn; quyền tự chủ theo loại. | Thiết kế đồng hành; đối chiếu linh thú gốc; kiểm chủ chết, chuyển kiếp và phản chủ. |
| Kẻ địch, mã mẫu | Họ, cảnh/phàm võ, chỉ số cơ sở, AI, ý đồ báo trước, hệ, sinh cảnh, lãnh địa, mục đích, chạy/đầu hàng, chiến lợi phẩm, quan hệ và giá trị hậu quả. | Không tăng theo cảnh giới người chơi ở mọi nơi làm mất ý nghĩa tiến bộ; kẻ địch dân sự không chỉ là túi thưởng; khống chế được khi hợp lý. | Chiến đấu và thế giới; đối chiếu EN/BOSS gốc; kiểm thông tin nguy hiểm trước tiếp chiến. |
| Gặp gỡ và chiến lợi phẩm, mã bảng | Địa bàn, mùa/giờ, mật độ, trọng số, điều kiện, dấu hiệu, đường tránh, số lần, loại tài sản, nguồn sở hữu, ngẫu nhiên và cạn nguồn. | Không rút lại qua mở màn; đồ của NPC không rơi hai nơi; nội dung cốt truyện không bị lẫn vào gặp ngẫu nhiên. | Nội dung và kinh tế; đối chiếu danh mục sự kiện; nghiệm thu nguồn rơi mỗi món. |
| Xuất thân và gia đình, mã xuất thân | Hoàn cảnh, nơi bắt đầu hợp lệ, tuổi, cha mẹ/người nuôi, thân phận pháp lý, tri thức, tài sản, mối nợ, mối quan hệ, cốt truyện và biến thể giọng. | Giữ đủ bốn mươi lăm xuất thân đã tìm thấy trong dữ liệu gốc và dữ liệu bổ sung; không khóa nghề suốt đời; gia đình có số phận, không chỉ cộng chỉ số đầu. | Biên kịch; bản ghi xuất thân hiện có và arc mới; kiểm có căn/vô căn đều giải thích được từ kiếp hai. |
| Đại khu và địa điểm, mã nơi | Đại khu, ô bản đồ, địa hình, cao độ, kết nối, khí hậu, dân số, thế lực, dịch vụ, giá, nguy hiểm, mùa, giờ hoạt động, trạng thái phá hủy và tuyến dự phòng. | Năm đại khu đang có; địa điểm cốt truyện phải có mã bền và vị trí hợp lệ trong thế giới đã sinh; không dùng tên ngẫu nhiên làm khóa quest. | Thiết kế thế giới; đối chiếu bản đồ mở; kiểm đường bộ, nước, núi và vùng chưa khám phá. |
| Tuyến di chuyển, mã tuyến | Hai đầu, phương tiện, thời gian, nhu cầu, phí, điều kiện, ẩn hiện, chặn, rủi ro, nơi rút và thương đội. | Thời gian không âm; biển không tự đi bộ; đường bị phá phải tái đánh giá dẫn đường. | Thế giới; nguồn địa hình hiện hữu; kiểm tuyến không tới được và tuyến thay thế. |
| Thế lực và luật lệ, mã lực | Giáo nghĩa công khai, lợi ích thật, địa bàn, người đứng đầu, chức vị, nguồn lực, đồng minh, kẻ thù, tuyển dụng, cấm kỵ, trừng phạt và kế vị. | Không đồng nhất ma/chính với nghiệp; thế lực có thể tan rã; chức vị không còn sau khi tổ chức chết nếu không có kế thừa. | Biên kịch và hệ thống thế cục; giữ roster hiện hữu; kiểm chiến tranh, phản bội, đầu hàng và thay chủ. |
| NPC bền, mã người | Tên, tuổi, căn, nghề, gia đình, tính cách, mong muốn, điều đã biết, tin sai, lịch, tài sản, kỹ năng, liên hệ, cam kết, cờ sống/chết và kế nhiệm. | Một NPC cùng mã phải là cùng người ở mọi quest; không sống lại ở sạp bán hàng; bản sao đời sau có mã mới và quan hệ nguồn gốc. | Biên kịch; NPC gốc được đối chiếu với NPC truyện mới; kiểm lịch trùng, thời gian vắng mặt và cái chết. |
| Quan hệ và thông tin, mã loại quan hệ | Chủ thể A/B, chiều, tin cậy, sợ hãi, ân/nợ, bất mãn, thân tình, điều kiện truyền tin, nguồn tin, độ chắc, thời hạn biết và nhân chứng. | Quan hệ không bắt buộc đối xứng; việc bí mật không lập tức đổi toàn cầu; tin đồn có tác giả/đường lan. | Hệ thống xã hội; kiểm hành động có/không nhân chứng và bí mật bị lộ. |
| Kinh tế, mã hàng/dịch vụ/khu | Tiền đồng/linh thạch, giá gốc, cung/cầu, thuế, lương, suất ăn, chỗ ở, rủi ro, kho, vận chuyển, chợ đen, giao dịch và tỷ giá giao ngay. | Không tỷ giá cố định tạo vòng đổi lời; lương đủ/nghèo phải xét giá sống cùng nơi; tiền không âm nếu chưa có hợp đồng nợ. | Thiết kế kinh tế; giá hiện hữu chỉ là mốc đối chiếu; nghiệm thu giỏ sinh hoạt và khả năng trả giá. |
| Nợ/quyền sở hữu/pháp luật, mã hợp đồng | Chủ nợ, con nợ, đối tượng, giá trị, chứng cứ, lãi, thời hạn, tài sản đảm bảo, vi phạm, thương lượng, tịch thu, kế vị và hết hiệu lực. | Nhiệm vụ tân thủ không dùng hạn/phạt; hợp đồng thường được phân biệt rõ; không chuyển nợ đời trước trực tiếp thành nợ tiền đời sau nếu thiếu nguyên nhân thế giới. | Thiết kế xã hội; kiểm chết trước hạn, chủ nợ chết, giấy giả và tranh quyền. |
| Ruộng/rừng/mỏ/ngư trường, mã nguồn | Loại đất/nước, chủ quyền, sản lượng, mùa, giống/loài/quặng, sức lao động, công cụ, quyền khai thác, tái sinh, cạn kiệt, thiên tai và biến cố. | Các nghề lấy tài nguyên phải lấy từ nguồn thật; đánh bắt/chặt/đào quá mức làm thay đổi nguồn; không lấy căn của người chơi làm cấp quặng. | Thiết kế nghề và thế giới; nghiệm thu từng nghề nông/tiều/ngư/mỏ có giá công, ngày thu hoạch và thất mùa. |
| Nhà/xưởng/môn phái võ, mã công trình | Đất, người sở hữu, vốn, vật liệu, thợ, thời gian xây, công suất, ở/đào tạo, bảo dưỡng, thuế, bảo vệ, hư hại, phá hủy và chuyển chủ. | Dựng môn phái cần người học, chỗ tập, sinh kế và luật; không phải đổi tên chức vị; công trình vẫn chịu thế cục khi người chơi đi xa. | Thiết kế kinh tế và nghề; nghiệm thu lập võ phái, phá sản, truyền chức và bỏ hoang. |
| Triều chính/quân đội, mã cơ cấu | Chức, thẩm quyền, bổ nhiệm, thuế, ngân khố, quân số, hậu cần, sĩ khí, tuyển quân, lệnh, phản ứng dân, phe phái, thừa kế và mất ngôi. | Làm hoàng đế cần năng lực chính trị/quân sự và điều kiện chính danh hoặc chiếm quyền đã chốt; không đổi một lượng vàng thành ngai trống. | Nội dung chính trị; nghiệm thu quan viên, binh lính và chiến binh có bậc tiến và nghĩa vụ khác nhau. |
| Gia đình/truyền thừa, mã gia đình | Quan hệ huyết thống/nuôi dưỡng/kết nghĩa/hôn phối, thành viên, ngày kết nối, đồng thuận, sống chung, tài sản, trách nhiệm, thừa kế và mất người. | Không gán mọi quan hệ với NPC thành tình ái; hậu duệ có mã riêng; gia sản ở lại thế giới, không tự theo chân linh. | Biên kịch và xã hội; nghiệm thu mất người thân, nhà tan, truyền nghề và đời sau gặp di sản. |
| Điều tra/ám sát/trộm cắp, mã phương thức | Mục tiêu, tiếp cận, trinh sát, năng lực phàm/tu, bảo vệ, bằng chứng, nhân chứng, phát giác, bỏ cuộc, chiến lợi phẩm và truy nã. | Hành vi bí mật có nguy cơ bị phát hiện theo chứng cứ; không luôn biết tội ngay toàn thế giới; mục tiêu phàm không biến thành tu sĩ vì người chơi lên cảnh. | Nghề và xã hội; nghiệm thu PM13/PM14/TU16 khác phương tiện nhưng cùng chịu hậu quả thật. |
| Pool tên và khuôn câu, mã pool/khuôn | Danh sách thành tố, vai trò ngữ pháp, giọng vùng, giới hạn lặp, loại người/nơi được dùng, biến đầu vào, danh sách loại trừ, bản dịch và hậu tố. | Tên NPC cốt truyện khóa theo mã; khuôn chỉ ghép mô tả biến thiên, không thay động cơ hay kết quả đã chốt; tên trùng vẫn phân biệt bằng mã. | Biên tập; đối chiếu pool tên/lời kể hiện hữu; nghiệm thu không lộ tên biến, không tạo câu sai nghĩa hoặc phá giọng âm trầm. |
| Sự kiện lựa chọn, mã sự kiện | Trigger, khóa một lần, chỗ/người, văn bản, điều đã biết, lựa chọn, yêu cầu, chi phí, kết quả ngay, lịch hậu quả, nhân chứng, ngẫu nhiên đã chốt và điểm thoát. | Mỗi lựa chọn có hậu quả; kết quả kín có dấu báo; không tự sinh động cơ để kết tội sau khi chọn. | Biên kịch; bản thảo nguyên bản; kiểm mọi nhánh đủ điều kiện/thiếu điều kiện. |
| Cốt truyện xuất thân, mã arc/mốc | Các mốc, điều kiện vào, biến thể, sự kiện, vai trò NPC, khủng hoảng ngoài màn, nhánh rẽ, bỏ qua, thay thế bằng chứng, kết cục và hậu ký. | Không bắt đi mốc tuyến tính khi người chơi rời đi; mốc có thời gian phải tiến cả khi vắng mặt; cốt truyện không độc quyền phi thăng. | Biên kịch; bốn mươi lăm arc theo bốn mươi lăm xuất thân; kiểm NPC chết, thế lực bị diệt, đi làm nghề khác. |
| Đồng hồ thế giới, mã đồng hồ | Chủ thể, biến trạng thái, tốc độ, dấu báo, điều kiện tăng/chặn/đảo, sự kiện khi đầy, lịch nghỉ và hậu quả vắng mặt. | Không chạy hai lần sau tải; bế quan dài phải xử lý các mốc theo thời gian; có khả năng biết trước khủng hoảng theo nguồn tin. | Thế giới và biên kịch; kiểm trôi năm dài và nhiều sự kiện cùng ngày. |
| Kết cục đời và toàn game, mã kết cục | Phạm vi đời/chân linh, điều kiện, đối kháng giữa các kết, ưu tiên, thời điểm chốt, lựa chọn xác nhận, hậu ký, lưu danh và cách tiếp tục. | Làm hoàng đế không mặc nhiên kết thúc hồ sơ; tận diệt không khóa mọi bằng chứng thức tỉnh; qua đời khác với giải thoát luân hồi. | Chỉ đạo nội dung; kiểm mọi xuất thân và mỗi đại hướng đạt ít nhất một kết cục hữu nghĩa. |
| Luân hồi/ký ức/thức tỉnh, mã quy tắc | Cái được mang, cái mất, giới hạn, chi phí, điểm chạm nhận thức, yêu cầu chân tướng, quyền đổi đời, lựa chọn tái sinh và chống bỏ đời lấy lợi. | Giữ tính đa dạng; không mang nguyên kho làm đời phàm mất ý nghĩa; số kiếp tăng duy nhất khi chuyển kiếp thật. | Hệ thống meta; đối chiếu Bến Vong Xuyên hiện hữu; kiểm chết tức thời, không chọn tái sinh và hồ sơ cũ. |
| Nhiệm vụ thường/tân thủ, mã nhiệm vụ | Loại, điều kiện mở, đích, bộ mục tiêu, cách đếm, điều hướng, phần thưởng, khoản ứng, thời hạn/phạt nếu có, bỏ qua và thay thế. | Tân thủ gắn đời một, không hạn/phạt; mục tiêu săn đếm biên nhận; một người sống không bị giao hai nhiệm vụ trái nhau không giải thích. | Thiết kế UX và nội dung; mười tám nhiệm vụ ở D3; kiểm mọi trạng thái đóng/mở/chờ. |
| Nguyện vọng và thành tựu, mã mục tiêu | Nội dung, phạm vi, điều kiện, tiến độ, cách đổi, phần thưởng nếu có và hậu ký. | Nguyện vọng tự viết không tạo thưởng thống kê; thành tựu không ép người chơi về một đạo đức. | Thiết kế cảm xúc và UX; kiểm mục tiêu đời thường có kết thúc công nhận. |
| Văn bản/UI/tooltip, mã câu | Ngôn ngữ, văn bản, ngữ cảnh, biến đầu vào, giới hạn hiển thị, giọng, điều kiện hiện, nhãn định tính và cách đọc hỗ trợ. | Hành Đạo/Nghiệp Duyên và tooltip tiên thiên không lộ số; tiến độ nhiệm vụ, tiền, vật liệu vẫn có số để chơi được. | Biên tập; toàn bộ câu nguyên bản; kiểm không cắt mất thông tin rủi ro hay phần thưởng. |
| Điều hướng/hộp thoại, mã đích | Loại đích, đối tượng, lớp cha, điều kiện mở, hành động cần xác nhận, đích dự phòng và tiêu điểm bàn phím. | Không tự giao dịch; không dẫn tới NPC chết; không đóng chiến đấu để mở trang khác. | UX; đối chiếu màn React hiện hữu; kiểm chuỗi mở và trở về cảnh cũ. |
| Hình/âm/hiệu ứng, mã tài sản | Đường dẫn, loại, kích thước/thời lượng, bản nhẹ/đầy, chủ sở hữu quyền dùng, nguồn, mô tả, ngữ cảnh, vòng lặp và dự phòng. | Không có bản quyền không rõ; ảnh nhân vật phải đúng người; âm kiếp báo nguy không giống âm nhận thưởng; game vẫn hiểu được khi tắt âm. | Mỹ thuật/âm thanh; giữ tài sản đang có và kê thiếu cụ thể theo roster cuối; kiểm tải lỗi và chế độ tiết kiệm. |
| Trợ năng/cấu hình, mã tùy chọn | Cỡ chữ, độ tương phản, chuyển động, âm lượng từng kênh, tốc độ chữ, phím, tự lưu, ẩn hướng dẫn và ngôn ngữ. | Không dùng màu làm dấu duy nhất cho chính/tà; giảm chuyển động không xóa báo hiệu đòn; chữ ước lượng có thứ tự nhất quán. | UX; kiểm điều khiển bàn phím và hình thức đọc chữ. |
| Phiên bản/chuyển bản, mã phiên bản | Phiên bản định nghĩa/lưu, danh sách đổi mã, chuyển nghĩa, quy tắc bù, mã ngừng dùng, bản sao trước chuyển và cách hoàn tác. | Không chuyển karma cũ đồng thời thành hai chỉ số độc lập đầy đủ; đánh dấu ước lượng khi không suy được lịch sử. | Phụ trách dữ liệu; đối chiếu hiện trạng thật; nghiệm thu mở bản lưu cũ và khôi phục bản sao. |
| Nhật ký vận hành/chơi thử, mã sự kiện đo | Loại hành động, đời, mốc thời gian, điều kiện ban đầu, lựa chọn, kết quả, nguyên nhân chết, phí, lời cảnh báo đã thấy và nguồn dữ liệu. | Không ghi nhận giả là đã chơi thử; không thu nội dung tự viết nhạy cảm ngoài mục đích đồng ý; ghi không được làm đổi kết quả game. | Thiết kế cân bằng; lưu quan sát thật và phương pháp; đối chiếu sự kiện có thể tái giải thích. |

#### D7. Các bản ghi phát sinh phải tồn tại trong hồ sơ lưu

| Bản ghi | Khóa và nội dung bắt buộc | Điều kiện bảo toàn |
|---|---|---|
| Hồ sơ người chơi | Mã hồ sơ; phiên bản; ngày tạo thật; lựa chọn trợ năng; quyền ghi; đời đang mở; danh mục kết cục/hồi ức. | Không dùng tên nhân vật làm khóa; bản xuất/nhập giữ cùng hồ sơ hoặc chủ động tách bản sao. |
| Chân linh | Mã chân linh; thứ tự kiếp; các dấu nghiệp chưa chín; thiện duyên; nghiệp chướng; điểm thức tỉnh; pháp môn nhớ được; giới hạn mang theo. | Ký ức không tự tạo vật chất/căn; không xóa nghiệp khi đổi tên hoặc xuất thân. |
| Kiếp | Mã kiếp; số kiếp; cấu hình sinh đã chốt; thời gian bắt đầu; cơ thể; xuất thân; vị trí; tài sản; sở học; trạng thái sống/chết; nguyên nhân chết. | Bốc căn và kỳ ngộ được lưu trước lúc xem kết quả; không đổi khi tải. |
| Cơ thể | Tuổi tính được; căn đã đo; căn thật nếu chưa đo; thể chất; thương; bệnh; nhu cầu; chỉ số nền; thay đổi vĩnh viễn; tải thuốc; thời điểm hiệu lực năm cuối. | Không áp lại tăng thể chất cho năm đã tính; mọi hồi máu có trần. |
| Sở hữu vật phẩm | Mã vật thể; mã loại; người/nơi sở hữu; số lượng; chất lượng; độ bền; hạn; nguồn; ô/kho; khóa; đã tiêu hay giao. | Một vật thể không thuộc hai kho; tài sản tiêu hủy không trở lại sau tải. |
| Sở học và nghề | Mã kỹ năng/nghề; ngày học; người dạy; thành thạo; kỹ năng đang vận hành; giới hạn; lịch làm việc; hợp đồng; đường rời. | Đổi căn/nghề phải tái kiểm điều kiện dùng; giữ tri thức không đồng nghĩa giữ quyền thực hành. |
| Nhân vật thế giới | Mã người bền; trạng thái sống; tuổi; vị trí/lịch; quyền sở hữu; quan hệ; điều biết; mục đích; việc đang làm; người kế nhiệm. | Người chết không phát sinh hành động mới; thư/bằng chứng do họ để lại tồn tại độc lập nếu đã được tạo. |
| Thế cục | Mã lực; lãnh thổ; kho; chiến tranh; chức vị; kế vị; luật đang áp; đồng hồ khủng hoảng; ngày cập nhật. | Lượt dài xử lý mốc tuần tự; người chơi vắng không đóng băng thế giới. |
| Sự kiện đã chốt | Mã sự kiện/lần gặp; trạng thái ẩn; thông tin đã lộ; lựa chọn; kết quả ngẫu nhiên; nhân chứng; lịch hậu quả; cờ đã phát hậu quả. | Không quay lại rút kết quả; không kết tội bằng thông tin được viết thêm sau lựa chọn. |
| Cam kết và quan hệ | Mã cam kết; hai bên; nội dung; điều kiện; bằng chứng; ân/nợ; các chiều tin/sợ/thân; người biết. | Không xóa khi NPC rời màn; di sản xã hội phải có đường truyền thông tin. |
| Nhiệm vụ/arc | Mã nhiệm vụ; mục tiêu; biên nhận tiến độ; khoản ứng; thưởng đã giao; bỏ qua; nhánh arc; mốc khủng hoảng; kết cục đã chốt. | Không nhận thưởng hai lần; đóng tutorial đúng hết kiếp một. |
| Cuộc chiến đang dở | Mã trận; chủ thể; chỉ số lúc vào; vị trí/thứ tự; lượt; ý đồ; tài nguyên; hiệu ứng; vật đã dùng; kết quả chưa chốt/đã chốt. | Lưu khi được luật cho phép; tiếp tục không rút lại ý đồ hoặc nhân đôi đồ; cấm lưu giữa nửa một giao dịch chưa thống nhất. |
| Chế tác/bế quan/di chuyển đang dở | Mã hành động; đầu vào giữ chỗ/đã tiêu; thời điểm bắt đầu; mốc sẽ gặp; điều kiện gián đoạn; sản phẩm giữ chỗ; kết thúc. | Hủy không trả lại phần đã thật sự tiêu; đi dài không bỏ qua cơ thể chết hoặc thế giới đổi trước ngày đích. |
| Lịch sử một kiếp | Các sự kiện quan trọng; lựa chọn; người gắn bó; tài sản; nghề; cảnh; việc thiện/ác được biết; mất mát; lời cuối; kết cục. | Có phần xem lại đầy đủ cho người chơi và phần nhân vật đời sau biết riêng; không đánh tráo hai góc nhìn. |
| Biên nhận lưu và chuyển bản | Số lần lưu; dấu toàn vẹn; phiên bản; bản trước; các bước chuyển đã áp; mã giao thưởng/tái sinh cuối. | Chuyển bản và khôi phục không lặp thưởng, không tăng kiếp, không tự dọn hậu quả. |

#### D8. Những bảng phải đối chiếu với dữ liệu gốc trước khi làm game

Tài liệu gốc của dự án nói sổ Excel quản lý vật phẩm và nội dung, trong khi danh mục chạy được sinh ra ở các tệp khác. Cần ghi rõ **một nguồn biên soạn chính cho từng loại** và **một bản xuất đã kiểm định để game đọc**. Chỉ nhận đường dẫn thực tế trong dự án hiện tại; không dùng hướng dẫn cũ làm bằng chứng rằng dữ liệu đã được đồng bộ.

| Loại | Nguồn biên soạn cần đối chiếu | Dữ liệu chạy cần đối chiếu | Quyết định phải ghi vào bảng chuyển nghĩa |
|---|---|---|---|
| Xuất thân, khí vận, thể chất, vật phẩm, công pháp, chiêu, linh thú | Sổ vật phẩm và các tài liệu biên soạn hiện hữu trong docs. | Danh mục lõi và danh mục sinh trong src/game/data. | Giữ mã bền; xác định dòng bị bổ sung/ghi đè sau; loại bỏ hai món cùng nghĩa nhưng hiệu lực khác nhau. |
| Linh căn và sinh thân | Định nghĩa gốc đang dùng trong lõi và các lớp bổ sung. | Đối tượng sinh kiếp sau khi mọi lớp đã áp. | Thêm tình trạng vô căn; không tái dùng khí vận mang tên Vô Căn làm loại căn; đời đầu giữ điều kiện có căn. |
| Nhân quả/chính tà cũ | Các nơi thay đổi karma và các đoạn mô tả liên quan. | Kết quả của sự kiện, buff, tử vong và tái sinh. | Phân loại từng nguồn thành hành vi, hậu quả, danh tiếng, tâm ma hoặc vận may; không sao chép một điểm cũ sang mọi trục. |
| Thời gian và hiệu lực năm | Lịch trong lõi, mô tả thể chất/khí vận và các lớp tính tuổi. | Đồng hồ thực chạy khi đi lại, bế quan, nghỉ và làm việc. | Chỉ một mốc năm; ghi tuổi có hiệu lực và lần kích hoạt cuối. |
| Nhiệm vụ | Bảng treo thưởng và thẻ nhiệm vụ React hiện có. | Điều kiện mở, đếm, nhận thưởng, hạn và hình phạt. | Tách kiểu nhiệm vụ tân thủ có quy tắc D1–D4; không kế thừa hạn/phạt bằng giá trị mặc định. |
| Địa điểm, NPC, thế lực | Danh mục lõi, địa điểm mở rộng, bản đồ mở, kho truyện nhập. | Những đối tượng thực sự hiện ra trong một thế giới được sinh. | Vai trò cốt truyện phải gắn vào người/nơi bền; tên ngẫu nhiên vẫn có thể là tên hiển thị. |
| Bản lưu | Cấu trúc đang lưu và các cơ chế đọc mặc định. | Hồ sơ thực tế ở trạng thái đầu đời, giữa trận, sau chết, tại Bến Vong Xuyên. | Có quy tắc cho dữ liệu cũ thiếu kiếp hoặc lịch sử karma; không hứa khôi phục ý định hành vi từ một tổng điểm. |

#### D9. Điều kiện nhận nội dung: có ý nghĩa, có nguồn, có đầu ra

Một bản ghi nội dung được nhận khi trả lời đủ: người chơi gặp ở đâu; biết bằng cách nào; vì sao điều này tồn tại; có thể làm gì; điều gì xảy ra ngay; điều gì xảy ra sau; nếu bỏ đi thì thế giới làm gì; nếu chủ thể chết thì chuyện còn lại ở đâu; chi phí và phần thưởng đến từ nguồn nào; cách ghi trong kiếp sau. Không dùng số lượng dòng thay chất lượng.

Một nghề được coi là hoàn chỉnh khi có điều kiện vào/rời, một vòng kiếm sống, một năng lực tạo khác biệt, một rủi ro nghề, ít nhất một lựa chọn có hậu quả xã hội và một mốc kết đời liên quan. Nếu nghề chỉ đổi tên nút “làm việc” và màu biểu tượng, nó chưa đáp ứng trải nghiệm đại đạo. Một xuất thân được coi là hoàn chỉnh khi có người gắn bó, thế lực tranh chấp, địa bàn lặp lại có biến đổi, mâu thuẫn riêng, đường đi tiếp khi bị bỏ và các kết cục đã định nghĩa.

Mọi bản ghi văn bản đều phải là câu hoàn chỉnh. Không nhận hàng chỉ ghi “thêm sau”, “các nghề khác”, dấu ba chấm, bản sao đổi tên hoặc phần thưởng không trỏ tới vật phẩm/tiền/quyền đã định nghĩa. Điều này áp dụng cho nội dung phát hành; một bảng kê công việc phải phân biệt là yêu cầu sản xuất, không giả thành dữ liệu đã có.

#### D10. Ma trận nghiệm thu theo mười ba yêu cầu

| Yêu cầu | Tình huống cần kiểm | Tiêu chí đạt |
|---|---|---|
| 1 — vô căn và cải căn | Sinh vô căn; đọc sách nhập đạo; nhớ tâm pháp cũ; nhờ người truyền công; hoàn tất từng cơ duyên cải căn. | Mọi cách tu đều bị chặn khi chưa có căn; học lý thuyết được; chỉ đường cải căn đã định nghĩa tạo căn; giữ chi phí/hậu quả và ghi nguồn gốc. |
| 2 — xác suất vô căn cao | Đối chiếu bảng trọng số của từng kiểu tái sinh và điều chỉnh nghiệp/khí vận. | Đúng mức chốt trong thiết kế; không có lớp khí vận âm thầm xóa phần lớn vô căn; không diễn giải “khá cao” bằng cảm giác người viết. |
| 3 — kiếp đầu luôn có căn | Hồ sơ mới, tải lại trước khi sinh, chết đầu đời, hồ sơ cũ. | Kiếp một có căn; kiếp hai dùng bảng sau kiếp một; tải không tăng thứ tự; chuyển bản không tặng đời đầu mới. |
| 4 — vô căn bị xem phế vật | Gặp tuyển đệ tử, tuyển lính, y quán, thương hội và một người thân. | Tu giới có kỳ thị có hậu quả rõ; nghề phàm vẫn vận hành, người thân có thái độ riêng; UI không coi người chơi vô giá trị. |
| 5 — đa dạng nhân sinh và độ khó | Theo đời làm ăn, thiên kiêu, bạo chúa, người không nhập đạo; bỏ tu giữa đường; chết sau chuẩn bị. | Mỗi đời có mục tiêu, quan hệ, mất mát và hậu ký; cảnh báo giải thích nguyên nhân thua; chuẩn bị thay đổi kết quả; không dựa hoàn toàn vào rút may. |
| 6 — đại đạo nhiều đường | Vào/rời mọi nghề; phối hợp nghề/hành đạo/pháp môn; thử võ phàm với vô căn. | Đủ roster chốt; nghề độc lập nhãn đạo đức; sát thủ phàm khác tu; không lách bằng hồn tu/thể tu; không nổ số tổ hợp phải viết thủ công. |
| 7 — hậu quả không phán theo nhãn | Giúp bà già rồi bị trộm; giết hổ cứu hươu; giết hổ chỉ để lấy da; người tốt làm sai vì thiếu tin. | Lợi ích, tổn hại, ý định và điều đã biết được lưu riêng; hên xui không là bằng chứng thiện/ác; hậu quả kín có căn cứ trước. |
| 8 — hai trục và thiên kiếp | Cùng Hành Đạo nhưng nghiệp khác; cùng nghiệp nhưng danh tiếng khác; tăng nghiệp trước kiếp; vượt kiếp khó. | Buff/nerf đời hiện đúng bậc; nhân quả ảnh hưởng tái sinh và kiếp; thưởng khó có trần, trả đúng một lần; không lấy danh tiếng làm nghiệp. |
| 9 — chỉ số bằng lời | Mọi trang nhân vật, tooltip, kết chiến, cuối đời và tra cứu. | Hai trục có tên, nhãn bậc và giải thích hành vi; không rò điểm/tỷ lệ số trong UI thường; nhật ký kỹ thuật chỉ dùng để kiểm định. |
| 10 — hiệu lực năm | Đi qua nhiều năm bằng bế quan, di chuyển, nghỉ; hồi máu khi đầy; tuổi quá trần; tải trước/sau mốc. | Kích đúng số mốc hợp lệ, áp đúng thứ tự với chết/già/bệnh; không vượt trần; tooltip nói bằng lời nhưng phản ánh đúng hiệu lực. |
| 11 — tân thủ | Làm/chưa làm/ẩn/hiện/bỏ qua/tải/đổi đích/chết giữa chuỗi; đã có đồ trước khi mở; đi võ học. | Sáu bước nối tiếp rồi nhóm ba; thanh có giá trị thật; phần thưởng rõ; popup đúng; không hạn/phạt; đời sau không xuất hiện lại; không ép tu. |
| 12 — sắc thái và luân hồi | Đọc đầu đời, cảnh đời thường, chiến thắng, mất người thân, tử vong và thức tỉnh. | Cùng giọng u trầm; có điểm ấm làm mất mát đáng cảm; không chỉ nhắc chết/chém; tỉnh ngộ đến từ trải nghiệm và bằng chứng. |
| 13 — cốt truyện xuất thân và tự do | Bỏ mọi lời gọi; giết người giao nhiệm vụ; đi vùng khác; diệt thế lực; thành hoàng đế; phi thăng; chọn hủy diệt. | Thế giới tiếp diễn; arc có hậu ký; có đường chứng cứ thay thế hợp lý; kết đời không khóa mọi kết toàn game; người chơi không bị kéo về nghề mặc định. |

Đây là ma trận kiểm định cần thực hiện khi triển khai, không phải báo cáo rằng những tình huống ấy đã chạy thành công. Tài liệu phân tích không sửa game, không chạy bot và không thay dữ liệu gốc.

#### D11. Kiểm định dữ liệu liên thông và bằng chứng cân bằng cần thu thật

Trước khi phát hành, toàn bộ mã tham chiếu phải có đích tồn tại; toàn bộ vật phẩm phải có nguồn và cách tiêu; toàn bộ nhiệm vụ phải có đường đóng; toàn bộ điều kiện kết cục phải có đường đạt từ ít nhất một cấu hình khởi đầu hợp lệ; mọi trường hợp nhân vật/nơi bị xóa phải có quy tắc tiếp tục hoặc kết thúc rõ. Kiểm độ phủ không đồng nghĩa bắt người chơi trải hết trong một đời.

Các quan sát cân bằng cần thu bằng chơi thật: thời gian một đời ở từng hướng; ngày làm việc để đủ ăn/trọ/chữa bệnh; cơ hội tiếp cận thông tin cải căn trước khi quá già; xác suất sống sau quyết định đã được cảnh báo; tỷ lệ rút lui thành công; số trận có chiến thuật khác nhau tạo kết quả khác nhau; mốc cảnh giới đạt được; nguyên nhân chết được người chơi hiểu; phần thưởng thiên kiếp so với tổn thất; lợi ích ngắn hạn của hành vi tàn nhẫn; thiệt hại xuyên kiếp của nghiệp; số đoạn truyện bị bỏ vì đích không còn; nhiệm vụ tân thủ bị bỏ và lý do. Ghi kèm cấu hình sinh, điều kiện, kỹ năng người chơi và phiên bản để không suy luận từ một kiếp.

Đo cảm xúc cần lời kể sau chơi: “điều gì khiến muốn giữ mạng”, “ai đáng nhớ”, “quyết định nào khó”, “cái chết có hiểu được không”, “đời phàm có điều gì muốn làm tiếp”, “vì sao chọn chính hoặc tà”, “có bị ép làm điều tốt không”. Không suy cảm xúc từ thời gian chơi hoặc lượt nhấn. Mục tiêu là xác minh đa dạng nhân sinh; tỷ lệ lên cảnh cao không tự chứng minh game tốt.

Trình tự hoàn thiện dữ liệu là: chốt luật và từ điển nghĩa → đối chiếu dữ liệu gốc → viết đủ danh mục hữu hạn đã chốt → nối nguồn/đích → rà mâu thuẫn bằng người biên tập → kiểm các tình huống ở D10 → chơi từng vòng nghề và xuất thân → điều chỉnh thông số dựa bằng chứng → khóa phiên bản → xuất bản lưu chuyển đổi và sổ thay đổi. Mọi điều chỉnh số sau đó phải cập nhật mô tả định tính, nguồn thưởng và hậu quả liên quan trong cùng phiên bản.

---

<a id="nen-tang"></a>

### 12. Thuộc tính, sinh kế, vật dụng, chế tạo và chiến đấu

Phụ lục này chốt tập dữ liệu nền đi cùng các hệ thống đã phân tích. Mọi số mới là **đề xuất cân bằng ban đầu, chưa đo bằng lượt chơi**; đây không phải khẳng định game đã vận hành theo những số này. Không bổ sung thể chất, khí vận hoặc phương pháp tạo linh căn ngoài các danh mục chuyên trách. Một mục không có trong tập nội dung được chốt phải bị khóa và có lời giải thích, không tự sinh hiệu ứng để lấp chỗ trống.

#### B.1. Thuộc tính, cảnh giới và giá trị nền

Sáu tên cảnh giới và bảng dưới là **dữ liệu gốc hiện có**, đọc từ [src/game/core/02-tin-don-giang-ho.js:18–23](/workspace/Sect/src/game/core/02-tin-don-giang-ho.js:18). Giữ tên cảnh giới và thọ nguyên, lưu bảng gốc để đối chiếu; giá trị chiến đấu dự kiến thay bằng bảng đề xuất ngay sau để thống nhất nền phàm nhân với hiệu ứng thường niên. Mọi phần trăm trong phụ lục là dữ liệu nội bộ; giao diện diễn đạt bằng mức chữ.

| ID | Cảnh giới | Khí huyết nền | Linh lực nền | Công nền | Thủ nền | Thọ nguyên nền theo nguồn |
|---|---|---:|---:|---:|---:|---:|
| RL01 | Luyện Khí | 80 | 30 | 10 | 3 | 60 năm |
| RL02 | Trúc Cơ | 180 | 60 | 22 | 7 | 130 năm |
| RL03 | Kết Đan | 400 | 120 | 48 | 15 | 300 năm |
| RL04 | Nguyên Anh | 880 | 240 | 105 | 32 | 650 năm |
| RL05 | Hóa Thần | 1.900 | 480 | 230 | 70 | 1.500 năm |
| RL06 | Độ Kiếp | 4.000 | 960 | 500 | 150 | 3.000 năm |

RL00 là **phàm nhân**, không phải cảnh giới tu luyện. Nền cũ chưa trang bị đối chiếu được khoảng 64 khí huyết, không linh lực, 9 công, 3 thủ, thọ nguyên 60 năm; lớp giảm nằm tại [core2/09-dot-17-bang-treo.js:88–105](/workspace/Sect/src/game/core2/09-dot-17-bang-treo.js:88), lớp khóa linh lực tại [core2/10-pham-nhan-chua-dan.js:1–3](/workspace/Sect/src/game/core2/10-pham-nhan-chua-dan.js:1). **Bảng sau là nền mới đề xuất, chưa có trong game**, thay các số chiến đấu cũ; không được trộn hai bảng trong cùng phép tính.

| ID | Nền mới đề xuất | Khí huyết | Linh lực | Công | Thủ | Pháp công | Thọ nguyên |
|---|---|---:|---:|---:|---:|---:|---:|
| RL00 | Phàm nhân | 100 | 0 | 10 | 10 | 0 | 60 năm |
| RL01 | Luyện Khí | 120 | 30 | 12 | 15 | 12 | 60 năm |
| RL02 | Trúc Cơ | 240 | 60 | 26 | 30 | 26 | 130 năm |
| RL03 | Kết Đan | 520 | 120 | 56 | 65 | 56 | 300 năm |
| RL04 | Nguyên Anh | 1.120 | 240 | 122 | 140 | 122 | 650 năm |
| RL05 | Hóa Thần | 2.440 | 480 | 266 | 300 | 266 | 1.500 năm |
| RL06 | Độ Kiếp | 5.200 | 960 | 580 | 650 | 580 | 3.000 năm |

Mốc hiệu ứng thường niên của thể chất/khí vận luôn là nền phàm HP100/Thủ 10 ngay cả khi đã lên cảnh giới, theo chương cơ chế; không nhân lãi kép trên HP cảnh giới. Một võ sư RL00 có thể vượt mốc công/thủ qua võ nghệ và trang bị phàm, nhưng không mặc nhiên có tu vi. Tuổi chết thực tế còn phụ thuộc bệnh, tai nạn, thương thế và yếu tố kéo dài thọ nguyên hợp lệ.

| ID | Thuộc tính lưu thật | Phạm vi và quy tắc sử dụng |
|---|---|---|
| ST01 | Khí huyết hiện tại/tối đa | Không âm; vượt tối đa bị cắt; về không giải quyết gục/chết theo B.6. Tăng tối đa không tự hồi đầy. |
| ST02 | Linh lực hiện tại/tối đa | RL00 và vô căn luôn bằng không; học công pháp không thay quy tắc. Hồi linh lực không tạo căn. |
| ST03 | Thể lực hiện tại/tối đa | Mốc phàm 100; lao động, hành quân, né, thủ thế và chạy trốn tiêu hao; ngủ an toàn đủ tám giờ hồi 70, tối đa 100. |
| ST04 | Công vật lý | Mốc theo bảng; vũ khí và võ nghệ cộng sau; không thể âm. |
| ST05 | Pháp công | Mốc tu sĩ bằng công nền; RL00 bằng không; chỉ dùng khi đủ điều kiện nhập đạo. |
| ST06 | Phòng ngự vật lý | Theo bảng và trang bị; không biến thành miễn nhiễm tuyệt đối. |
| ST07 | Kháng sát thương và trạng thái | Mười kênh sát thương: Kim/Mộc/Thủy/Hỏa/Thổ/Lôi/Băng/Phong/Âm/Hồn; khoảng −50% đến 75%. Độc/chảy máu/trói/nhiễu/hoảng là kháng trạng thái riêng, nền 0, tối đa 40 điểm phần trăm trừ cơ hội áp; không giảm sát thương bằng cùng phép tính hai lần. |
| ST08 | Thân pháp | Mốc phàm 6, mỗi đại cảnh giới tu tiên tăng 2; phục vụ nhịp hành động, né và chạy. |
| ST09 | Thần thức | RL00 không có thần thức siêu phàm; quan sát phàm nhân dùng nghề và giác quan. RL01 trở lên dùng mốc 6/12/24/48/96/160. |
| ST10 | Ngộ tính | Mốc đối chiếu 10; khoảng 0–100; ảnh hưởng học, không tự mở linh căn. |
| ST11 | Đạo tâm | Mốc đối chiếu 10; khoảng 0–100; dao động bởi hoàn cảnh và hiệu ứng đã khai báo, không đồng nhất chính đạo. |
| ST12 | Khí vận cá nhân | Mốc đối chiếu 4; khoảng 0–100; điều chỉnh cơ hội trong biên đã định, không thay thế tiên thiên khí vận dạng đặc tính. |
| ST13 | Tư chất | Có căn: 1–100; vô căn: trạng thái “Chưa có căn cơ” thay số, không dùng tư chất âm để mô tả. |
| ST14 | Tuổi, thọ nguyên còn lại | Lưu thời điểm sinh và lịch thế giới; không dùng số tuổi hiển thị làm bộ đếm năm. |
| ST15 | Tu vi, lịch luyện, căn cơ | Ba tiến độ độc lập; vô căn không tăng tu vi hoặc căn cơ đạo lực, vẫn tăng kinh nghiệm nghề. |
| ST16 | No, khát, mệt | Mỗi chỉ số 0–100; ngưỡng và giá sinh hoạt tại B.3; không quy đổi thành đạo tâm khi chỉ đói một bữa. |
| ST17 | Tâm ma | 0–100; không tự suy ra từ việc theo ma đạo; thao túng hồn, phản bội lời thề, mất mát và ép đột phá có nguồn riêng. |
| ST18 | Hành Đạo | Dữ liệu cơ chế riêng; hiệu ứng hiện kiếp dùng danh mục cơ chế, không dùng làm uy tín tất cả thế lực. |
| ST19 | Nghiệp Duyên | Ghi thiện duyên và nghiệp chướng riêng cùng hồ sơ hành vi; không lấy một số trừ nhau rồi xóa lịch sử. |
| ST20 | Uy tín, hảo cảm, truy nã | Lưu theo từng thế lực và NPC; không biến tội phạm một nước thành kẻ bị mọi người trên bản đồ ghét. |
| ST21 | Kỹ năng nghề, võ học, độ thuần thục pháp môn | Tiến độ riêng từng ID, không cộng thành một cấp nghề chung. |
| ST22 | Tiền, tài sản, nợ, khẩu phần, kho | Quyền sở hữu và chủ nợ rõ ràng; không cho tiêu tiền của con cái như túi cá nhân. |

Đề xuất giữ chí mạng nền 5%, giới hạn 35%; sát thương chí mạng nền 150%, tối đa 225%; né có trần 45% và không né thiên kiếp; hút sinh lực tổng tối đa 15% sát thương thực gây lên sinh vật hợp lệ, không hút khôi lỗi hoặc mục tiêu vô địch. Giảm tiêu hao không dưới 50% chi phí gốc. Các trần này áp dụng sau tổng hợp mọi nguồn, kể cả công pháp, trang bị và thể chất; không ghi đè luật hiệu ứng thường niên chuyên trách.

Giữ tương thích hai nhãn cũ **Phật** và **Vô**: Phật là thẻ nguồn/pháp môn, không phải linh căn mới hay kênh kháng đạo đức; chiêu tác động tâm/hồn đi qua kháng Hồn, chiêu vật lý qua thủ, chiêu có Hỏa/Lôi theo đúng kênh đã ghi. Vô là không thuộc tính, bỏ bước kháng nguyên tố nhưng vẫn chịu thủ, hộ thể và giảm sát thương phù hợp loại đòn. Không suy ra sát thương thêm lên người theo tà đạo chỉ từ thẻ Phật. Kháng Hồn cũng không là miễn toàn bộ tác động thể chất của một chiêu gọi hồn. SK03A hút 10%, CP03 tăng 10%tương đối thành 11% trước trần 15%, không cộng thành 20%.

#### B.2. Tiền, hàng hóa và quyền sở hữu

**Tiền đồng** phục vụ đời phàm. Một quan bằng 1.000 đồng là quy đổi cố định trong cùng hệ tiền; ngân phiếu ghi tổ chức bảo chứng, tiền mất giá phải có sự kiện. **Linh thạch** là tài nguyên tu tiên hữu hạn, phân phẩm riêng; không có tỉ giá cố định đồng/linh thạch. Quầy đổi chỉ xuất hiện ở Vạn Bảo Thương Hội hoặc người có giấy phép; bảng giá theo nguồn cung, an ninh và lệnh cấm địa phương. Chốt biên niêm yết ban đầu: mua một linh thạch hạ phẩm 3–8 quan, bán thu 50–70% giá mua cùng thời điểm; lượng mua tối đa ba viên mỗi chi nhánh mỗi tháng, không bảo đảm có hàng. Không cho làm giàu bằng mua ở cùng một quầy rồi bán lại hoặc đổi linh thạch không hạn.

Đơn vị nhỏ nhất của sổ linh thạch là **một linh sa**;100 linh sa bằng một viên linh thạch hạ phẩm. Giá 0,3 viên được ghi 30 linh sa, không làm tròn thành không hoặc một viên. Giá và số dư linh sa luôn là số nguyên; hoàn tiền, phân chia thưởng và phần phí còn lẻ tính trên linh sa, phần nhỏ hơn một linh sa làm tròn lên khi thu phí, xuống khi trả thưởng. Đây là quan hệ đơn vị cùng tài nguyên, không thiết lập tỉ giá với tiền đồng; phẩm linh thạch khác cần giao dịch đã báo giá riêng.

Đồ thường bán lại bằng 40% giá niêm yết; hàng sống, thức ăn và thuốc có độ tươi tính riêng: còn trên nửa thời gian dùng bán 30%, dưới nửa bán 10%, hỏng không bán được. Hàng làm theo hợp đồng nhận đúng giá hợp đồng. Món đánh cắp có dấu sở hữu chỉ bán ở người thu đồ lậu: 20% giá và tăng nguy cơ điều tra; không tự xóa dấu khi chuyển túi.

Tập vật dụng mới dùng trong phụ lục, mã **BT**; giá là đồng tại chợ bình thường. Những tên giống danh mục cũ phải có bước đối chiếu và gắn mã hiện hữu trước khi triển khai, không nhập trùng vô điều kiện.

| ID | Vật dụng; giá/một đơn vị | Nguồn và vòng tiêu thụ |
|---|---|---|
| BT01 | Gạo thô; 6 | Ruộng/chợ; một phần nấu, hạn khô 180 ngày, tối đa 50 phần một chồng. |
| BT02 | Nước sạch; 1 | Giếng kiểm định; một bình dùng ngày; nấu/khử độc nhẹ; hạn bảy ngày trong bình kín. |
| BT03 | Củi khô; 3 | Tiều phu/chợ; đun bếp, sưởi; 20 bó/chồng. |
| BT04 | Muối thô; 2 | Chợ muối; ướp thức ăn/rửa dụng cụ; 50 phần/chồng. |
| BT05 | Cá tươi; 8 | Ngư dân/sông; nấu/ướp; hỏng sau một ngày; 10 con/chồng. |
| BT06 | Rau dại an toàn; 2 | Hái và nhận biết nghề; nấu canh; hỏng ba ngày; 20 phần/chồng. |
| BT07 | Vải lanh; 6 | Thợ dệt/chợ; may/băng; 20 cuộn nhỏ/chồng. |
| BT08 | Cỏ cầm máu; 5 | Dược sư/vườn thuốc; chế băng; hỏng 30 ngày; 20 phần/chồng. |
| BT09 | Thảo dược hạ sốt; 8 | Dược sư; nấu thuốc sốt; hỏng 30 ngày; 20 phần/chồng. |
| BT10 | Than sạch; 4 | Hầm than; rèn/lọc; 20 phần/chồng. |
| BT11 | Phôi sắt; 18 | Mỏ/lò rèn; vũ khí/công cụ; 10 thanh/chồng, mỗi thanh hai cân mang. |
| BT12 | Gỗ thẳng; 5 | Rừng được phép khai; cán/nẹp; 10 thanh/chồng. |
| BT13 | Dây gai; 3 | Thợ dệt; buộc/nẹp/bẫy; 20 đoạn/chồng. |
| BT14 | Da thú thuộc; 14 | Thuộc da từ chiến lợi phẩm; túi/giáp; 10 tấm/chồng. |
| BT15 | Sáp ong; 6 | Người lấy mật/chợ; nến/chống ẩm; 20 phần/chồng. |
| BT16 | Dầu thực vật; 5 | Chợ; đèn/nấu; 10 bình nhỏ/chồng. |
| BT17 | Rượu sát trùng; 10 | Hiệu thuốc; vệ sinh/băng; không trị nhiễm trùng nặng; 10 bình/chồng. |
| BT18 | Giấy dó; 2 | Xưởng giấy; thư/hợp đồng; 50 tờ/chồng. |
| BT19 | Mực; 3 | Chợ; thư/sao lục; 20 phần/chồng. |
| BT20 | Lương khô; 14 | Chế BT01/BT04; hồi no 65, không linh lực; hạn 15 ngày; 10 phần/chồng. |
| BT21 | Canh cá rau; 18 | Bếp; no 70, khát 40; hạn một ngày; năm phần/chồng. |
| BT22 | Cá muối; 13 | Ướp; no 45, khát giảm 10; hạn mười ngày; 10 phần/chồng. |
| BT23 | Băng thảo dược; 16 | Hiệu thuốc/chế; chữa CH01, một đơn vị/lần; 10 cuộn/chồng. |
| BT24 | Thang hạ sốt; 18 | Hiệu thuốc/chế; một liều D04 theo B.7; hạn hai ngày; năm liều/chồng. |
| BT25 | Thanh lọc nước; 11 | Bếp/chế; xử lý ba bình nước bẩn, không giải mọi độc; năm thanh/chồng. |
| BT26 | Nẹp gỗ; 15 | Thợ mộc/chế; một bộ xử lý D02; không cộng thủ; năm bộ/chồng. |
| BT27 | Dao phàm; 58 | Lò rèn/chế; cộng công 3, bền 60 hành động chiến đấu/lao động; một ô. |
| BT28 | Áo da phàm; 52 | Thuộc da/may; cộng thủ 3, bền 80 lần chịu đòn; một ô. |
| BT29 | Nến đi đường; 14 | Chế/chợ; sáng sáu giờ, giảm rủi ro lạc đêm; 10 cây/chồng. |
| BT30 | Túi đeo hông; 44 | May/chế; thêm bốn ô thường và sức mang sáu cân; một trang bị túi. |
| BT31 | Thư có niêm; 8 | Người viết thư/hợp đồng; nhận người gửi/người nhận/nội dung và quyền đọc; 20 thư/chồng cùng hợp đồng. |
| BT32 | Thịt thú; 9 | Săn; nấu; hỏng một ngày; 10 phần/chồng. |
| BT33 | Da thô; 8 | Săn; thuộc da nghề trong một ngày với muối BT04 và nước BT02; ra BT14, mất phí 4; 10 tấm/chồng. |
| BT34 | Răng thú; 4 | Săn; bán/chứng minh săn bắt; 20 chiếc/chồng. |
| BT35 | Giấy thông hành; 80 | Huyện nha; dùng cửa kiểm soát, có nơi cấp và hạn 90 ngày; một ô giấy tờ, không dùng thay giấy truy nã. |
| BT36 | Bộ ngư cụ; 70 | Chợ nghề; cần PM03; bền 60 ca; sửa 12 đồng/20 bền. |
| BT37 | Rìu tiều; 85 | Lò rèn; cần PM02; bền 80 ca; sửa 15 đồng/20 bền. |
| BT38 | Cuốc sắt; 65 | Lò rèn; cần PM01; bền 90 ca; sửa 10 đồng/20 bền. |
| BT39 | Bút nghề; 30 | Chợ; sao lục/quan viên; bền 90 ca; thay ngòi 5 đồng/30 bền. |
| BT40 | Túi dược cụ; 90 | Hiệu thuốc; cần PM07; bền 60 ca; bổ sung 15 đồng/20 bền. |

Điểm cung ứng neo: BT01/06 từ LOC01; BT03/08/12 từ LOC06 được FA04 cấp quyền; BT02 từ giếng đã kiểm định LOC01/02; BT04 tại chợ LOC02/09; BT05/32/33/34 từ sinh thái thật quanh LOC06/09; BT07/13/14/15/16/18/19 tại chợ nghề LOC02/11; BT09/17/23/24/40 tại LOC10; BT10/11/27/36/37/38 tại LOC11; BT20/21/22/25/26/28/29/30/31 từ các công thứcCR hoặc cửa hàng có người sản xuất; BT35 do LOC02 cấp, BT39 từ xưởng LOC11. Thương hội LOC03 vận chuyển và mua bán các nguồn này, không tạo thêm kho vô nguồn.

Tập mặt bằng/dụng cụ không mang theo: **FC01** bếp và nồi tại HS04/05, thuê chợ 2 đồng/mẻ; **FC02** vại kín tại bếp, thuê 1 đồng/ngày/mẻ; **FC03** bàn thuốc tại LOC10 thuê 2 đồng/mẻ, cần BT40; **FC04** lò/đe/kìm/búa tại LOC11 thuê 8 đồng/ca; **FC05** bàn mộc và bộ kim tại LOC02/11 thuê 2 đồng/ca; **FC06** bàn viết tại LOC02/12 thuê 1 đồng/ca, cần BT39. Phí công thức đã bao gồm phí thuê tương ứng, không thu hai lần; chế tại mặt bằng riêng được miễn phí thuê nhưng vẫn tiêu vật tư. Nơi bị phá hoặc đóng cửa khiến dịch vụ tạm ngừng và cho biết điểm thay thế, không cho sử dụng một lò đã cháy.

Túi phàm có 10 ô, sức mang 20 cân; vũ khí/áo đang mặc không chiếm ô túi nhưng tính cân nặng. Mỗi món không khai báo nặng dùng một cân, đơn vị thức ăn/nước/củi một cân, giấy/thuốc 0,1 cân. Vượt sức mang tối đa 25% làm đi chậm 30% và tăng tiêu thể lực 50%; vượt hơn không thể khởi hành. Túi trữ vật không vận hành khi vô căn hoặc linh lực bằng không: đồ trong đó còn tồn tại, hiển thị bị khóa; có thể thuê tu sĩ mở dưới hợp đồng, không tự đổ mất đồ. Đồ nhiệm vụ có quyền cất kho, nhưng không biến thành đồ không khối lượng để chở thuê miễn phí.

#### B.3. Ba bữa, chỗ ở, hộ gia đình và nợ

Một ngày tính 24 giờ, tháng tính 30 ngày, năm 360 ngày trong lịch game. No/khát giảm 60/70 mỗi ngày, chia theo thời gian đã qua; lao động nặng thêm 15 no và 10 khát mỗi ca, thời tiết nóng thêm 20 khát/ngày. Ba bữa nghèo nấu tại nhà tốn 12 đồng/ngày gồm BT01, rau, củi dùng chung; nước một đồng. Khẩu phần tối thiểu này hồi tổng 65 no, 80 khát/ngày và không hồi máu tức thì. Ăn món đủ dinh dưỡng ba ngày liên tiếp cho phép hồi bệnh theo chỉ định; ăn tiếp không tích no quá 100.

No dưới 20: giảm hiệu suất lao động 20%; bằng không: mỗi ngày mất 6% khí huyết tối đa, ngừng hồi tự nhiên. Khát dưới 20: thể lực hồi giảm một nửa; bằng không: mất 12% khí huyết/ngày và tăng nguy cơ D04. Thông báo thiếu lương thực từ khi chỉ còn đủ hai ngày; hành động dài phải nêu nhu cầu và cho dự trữ, dừng sớm hoặc thuê cấp dưỡng. Bế quan không miễn ăn uống cho cảnh giới chưa có hiệu ứng tịch cốc cụ thể.

| ID | Chỗ ở/hộ | Giá và hệ quả |
|---|---|---|
| HS01 | Ngủ gầm mái công cộng | Miễn tiền; ngủ tám giờ chỉ hồi 35 thể lực; mỗi đêm 8% bị trộm tối đa 10% tiền cầm, 5% nhiễm D04 trong rét. Không cộng hai rủi ro qua nhiều lượt mở cửa. |
| HS02 | Giường tập thể | 6 đồng/đêm; hồi 55 thể lực; trộm 2%; không cất tài sản dài hạn. |
| HS03 | Phòng trọ khóa cửa | 12 đồng/đêm; hồi 70 thể lực; trộm 0,5%; kho năm ô, chủ trọ lưu tên. |
| HS04 | Thuê nhà nghèo | 240 đồng/tháng trả đầu tháng, cọc 120; kho 20 ô; chứa bốn người; ngủ hồi 70, cho chế tạo bếp. |
| HS05 | Mua nhà nhỏ | 24 quan, thuế 120 đồng/tháng; kho 50 ô, sáu người; công khai quyền sở hữu, có thể bị tịch biên theo luật địa phương. |
| HS06 | Hộ gia đình | Mỗi người trưởng thành chi ăn 13 đồng/ngày; trẻ dưới 12 tuổi 8, người già bệnh 16; từng người có thu nhập và tài sản riêng. Từ 12–15 tuổi có thể học nghề, không tự sản sinh tiền. |

Nợ **DB01** vay tiêu dùng tối đa một tháng thu nhập có chứng cứ, lãi 4%/tháng trên gốc còn lại, không lãi chồng lãi; kỳ trả mỗi 30 ngày, trả sớm miễn phí. **DB02** ứng tiền nghề bằng bảy ngày công, trả bằng tối đa 30% tiền công mỗi ca, không làm tăng nợ nếu bỏ việc. **DB03** vay chữa bệnh tối đa 600 đồng, lãi 2%, bảo lãnh có chữ ký, nhận tiền trực tiếp vào chi phí điều trị. Chủ nợ không thu hết tiền ăn: mức giữ lại cho mỗi thành viên là bảy ngày khẩu phần. Quá hạn lần đầu có bảy ngày hòa giải; sau đó mất uy tín người cho vay, bị kiện/tịch biên tài sản theo phán quyết. Chủ nợ bất hợp pháp có thể đe dọa nhưng phải là sự kiện có nguồn, phương án trốn/chống/đàm phán và hồ sơ hành vi.

Người thừa kế chỉ gánh nợ đến giá trị di sản đã nhận; không tự mang nguyên nợ đời trước vào thân xác kiếp sau. Nghiệp Duyên ảnh hưởng hoàn cảnh và các mối nợ duyên, không biến thành sổ nợ tiền vô cớ. Chết khi còn người phụ thuộc tạo quyết định giám hộ và biên bản chia tài sản; tự sát/tái sinh không sinh thêm tài sản hay thưởng nghề.

#### B.4. Danh mục nghề phàm

Phần nghề dùng PM01–PM18 của bảng nghề trong nội dung chính. Thang nghề 0–1.000: học đồ 0–99, hành nghề 100–299, chuyên gia 300–699, tông sư 700–1.000. Một ca đạt chuẩn cho 4 điểm, thất bại nhưng còn hành động nghề cho 1, ca bị bỏ trước nửa thời gian không điểm; không tăng bằng xem lại kết quả. Có thể học qua thầy trong 25 ca để tới 100; các nghề công quyền, sát thủ có thêm điều kiện vào nghề, không mua điểm để bỏ qua. Bảng thu nhập dưới dùng mốc hành nghề 100; học đồ hưởng 70%, chuyên gia 300 hưởng 120%, tông sư 700 hưởng 140%; chi phí vật tư không tự giảm. Rủi ro bảng là mỗi ca ở mốc 100, giảm tương đối 25% khi 300 và 40% khi 700, không bao giờ về không; thời tiết/chiến tranh được nêu trước khi nhận việc. Mỗi ca chiếm thời gian thật và không thể đồng thời nhận lương hai nghề. Bậc kỹ năng và chức vị là hai dữ liệu khác nhau: thành thạo quan vụ không tự thăng quan.

| ID | Nghề; điều kiện vào nghề | Thu nhập gộp; chi phí nghề; thời gian | Rủi ro cơ sở và hệ quả | Mốc thăng tiến và quyền mở |
|---|---|---|---|---|
| PM01 | Nông dân; thuê ruộng 300 đồng/vụ, BT38 | Vụ 90 ngày bán 6.000 đồng; giống/nước 900, thuê 300; cần 45 ca×8 giờ,40 thể lực/ca | 10%/tháng hạn làm hụt 25%sản lượng; tưới dự phòng 40 đồng/tháng giảm còn 3%; sâu 8%/tháng hụt 10%, chăm ruộng thêm hai ca hóa giải | 100 tự quản ruộng;300 trồng luân canh,700 lập hợp tác. Hộ làm ruộng giữ khẩu phần trước bán, không tính vừa bán vừa ăn cùng hạt. |
| PM02 | Tiều phu; BT37, giấy khai rừng 30 đồng/tháng | 42 đồng/ca; phí đường/hao công cụ 6;8 giờ,45 thể lực | 4%D01,1%gặp FO02 có dấu và quyền rút; khai cấm rừng tạo tội theo phe sở hữu | 100 đốn an toàn;300 chọn gỗBT12,700 quản kho rừng; không tự sinh linh mộc. |
| PM03 | Ngư dân; BT36, quyền bến 20 đồng/tháng | 38 đồng/ca hoặc BT05×4; mồi/hao ngư cụ 5;8 giờ,35 thể lực | 3%mất ngư cụ 10 bền,2%D04; mùa lũ hiện cảnh báo, không tăng chết ngầm | 100 đọc con nước;300 đặt lưới có tuyến,700 tổ đội; nhận cá thì không nhận tiền của cùng mẻ. |
| PM04 | Thợ mỏ; hợp đồng chủ mỏ, thuê cuốc 6 đồng/ca | 50 đồng/ca; cuốc 6 và nếnBT29 chia bốn ca 3,5;10 giờ,55 thể lực | 5%D01,1%D02 do sập; mỏ có kiểm an toàn giảm một nửa rủi ro, một cuộc sập không tính lại từng giờ | 100 đào;300 nhận biết mạch,700 quản đốc khi có bổ nhiệm; phôi thuộc chủ mỏ trừ hợp đồng phần chia. |
| PM05 | Thợ rèn; học phí 150 đồng, xưởng nhận | 65 đồng/ca hợp đồng; thuê lò 8, công cụ 4, vật tư do khách cấp;8 giờ,45 thể lực | 4%D01; hỏng hàng 6% phải sửa một ca, bồi thường tối đa 50 đồng có báo trước | 100 sửa cuốc/rìu;300CR08;700 chủ lò với vốn 3 quan. Không rèn pháp khí khi vô căn. |
| PM06 | Thợ thủ công; chọn mộc/may/thuộc da, học phí 80 | 44 đồng/ca; bàn nghề 4 và công cụ 2, khách cấp vật tư;8 giờ,30 thể lực | 4%lỗi trả phí công,1%D01; không trừ tiền vật tư không do mình sở hữu | 100CR07/10;300CR09/11;700 xưởng với vốn 2 quan; tiến độ từng nhánh lưu riêng. |
| PM07 | Y sư phàm; BT40, học phí 200, thầy xác nhận | 60 đồng/ca khám; bổ dược cụ 5, phòng 5, dược liệu bệnh nhân trả;8 giờ,25 thể lực | 3%chẩn sai cần khám lại miễn phí; không ngẫu nhiên giết bệnh nhân. Cố ý hại người là lựa chọn có hồ sơ | 100CR04/05 và D01/D04;300 cấp cứu chiến trường;600 điều trịD05;700 mở y quán vốn 4 quan. D03/D06 cần tu sĩ hỗ trợ. |
| PM08 | Người chép sách; biết chữ, BT39 | 34 đồng/ca; giấy/mực 8, hao bút 1;8 giờ,20 thể lực | 3%lỗi chép mất nửa công; sao sách cấm có tội chỉ khi nhận hợp đồng nêu nguồn | 100CR12;300 sao sách nghề có quyền;700 thư quán vốn 2 quan; chép pháp môn không tự học được. |
| PM09 | Thương nhân; vốn 1 quan, giấy hàng 40 đồng/tháng | Mua lô 1 quan, dự kiến bán 1,28 quan/chuyến 10 ngày; phí kho/vận 60, còn lãi dự kiến 220 | 8%chậm hàng thêm ba ngày;3%cướp dẫn gặp FO09 có quyền thương lượng. Không tự trừ toàn vốn nếu chưa giải quyết sự kiện | 100 một tuyến;300 ba tuyến có nhân sự;700 thương hội vốn 20 quan và thừa nhận phe; tồn kho/khách giới hạn. |
| PM10 | Phu trạm; nhận người bảo lãnh, không có lệnh truy hiện hành | 40 đồng/ca; giày/ăn đường 6;8 giờ,45 thể lực, gói thư có khối lượng | 4%trễ hai giờ không thưởng đúng hạn;1%chặn đường FO08/09; không mất thư nếu không bị lấy thật | 100 đường địa phương;300 tuyến liên khu;700 trưởng trạm cần bổ nhiệm. Mở thư không được ghi giao nguyên niêm. |
| PM11 | Binh lính; tuyển quân, khám khỏe, quân lệnh | Lương 900 đồng/tháng và khẩu phần 13 đồng/ngày đã cấp;24 ca×10 giờ,50 thể lực, không chi ăn hai lần | Huấn luyện 3%D01/ca; chiến dịch dùng trận thực, không thêm xác suất chết ngoài trận; đào ngũ theo pháp luật | 100 tân binh,300 đội trưởng có chiến công,700 tướng lĩnh có bổ nhiệm và quân trung thành; không thăng chỉ bằng farm cỏ. |
| PM12 | Chiến binh giang hồ; võ học 100 và vũ khí phàm | Hộ tống 80 đồng/ngày; phí trạm 10, hao vũ khí 6;10 giờ,50 thể lực | 8%gặp FO09, được xem tin đường trước hợp đồng; thua xử lý trận, không hai lần trừ tiền | 100 áp tiêu;300 đội hộ vệ;700 minh chủ cần danh vọng và ba võ phái công nhận; không mở pháp thuật. |
| PM13 | Sát thủ phàm; tổ chức nhận, võ học 100, thử nhập hội bảy ngày | Thù lao 300 đồng/hợp đồng ba ngày; dò tin 50, phí môi giới 60, hao đồ 20; tổng 24 giờ thao tác | 20%mục tiêu đổi lịch gây trễ một ngày; giao chiến/điều tra do hành vi thực; không cam kết giết chắc | 100 theo dấu;300 cải trang và rút;700 đầu lĩnh sát hội cần nhân sự; phân biệt FO16 và tu sĩ có thần thức. |
| PM14 | Đạo chích; người truyền nghề hoặc tự học 25 ca | Một phi vụ tối đa 80 đồng theo túi mục tiêu; chuẩn bị 10;4 giờ,25 thể lực; tối đa hai mục tiêu/ngày | Bị phát hiện 25%trước kỹ năng/thông tin; trả tang vật/đàm phán/chạy. Không lấy tiền không tồn tại | 100 móc túi;300 phá khóa thường;700 đầu mối chợ ngầm có quan hệ. Mỗi nạn nhân ghi dấu, không farm lại túi mỗi lần mở UI. |
| PM15 | Nghệ nhân gánh hát; đoàn nhận, luyện giọng/múa 100 | 36 đồng/ca; phục trang 6, phí bến 2;6 giờ,25 thể lực | 8%vắng khách hụt nửa công,2%D04 ngoài trời rét; tiết mục không tự đồng nghĩa lừa đảo | 100 vai phụ;300 đào kép chính;700 trưởng đoàn vốn 3 quan và đoàn đồng ý; mở ảnh hưởng lời ca/tin đồn. |
| PM16 | Quan viên; biết chữ 300, đỗ khảo ba ngày phí 200, chờ vị trí | Lương 2.400 đồng/tháng; công phục/văn phòng 120;22 ca×8 giờ,25 thể lực | Thanh tra theo hồ sơ 30 ngày; sai sổ 3%/ca cần sửa, không tự sinh tội ác. Nhận hối lộ là lựa chọn ngoài lương có nạn nhân/bằng chứng | 100 thư lại,300 huyện quan cần bổ nhiệm,700 đại thần cần thế lực; làm hoàng đế theo điều kiện kết cục, không chỉ điểm nghề. |
| PM17 | Người chèo đò; biết bơi 100, thuê thuyền 12 đồng/ngày | 52 đồng/ca hoặc vé thật tối đa sáu khách×9; thuê 12, sửa ván 3;8 giờ,45 thể lực | 3%hỏng ván dừng nửa ngày,1%lật thuyền khi bão đã báo; có quyền hoãn không phạt nghiệp mặc định | 100 đò ngang;300 tuyến đêm;700 chủ bến vốn 6 quan và giấy bến; mỗi hành khách có điểm tới. |
| PM18 | Chưởng môn võ phái; võ học 300, năm đệ tử tự nguyện, thuê sân 400 đồng/tháng | Học phí sáu đệ tử×240/tháng=1.440; sân 400 bao gồm một chỗ ngủ cho chưởng môn, trợ giảng 360, dụng cụ 120;20 ca×8 giờ,35 thể lực | 5%/tháng đệ tử bất hòa cần quyết định, không tự chết; thách đấu theo phe có nguyên nhân | 100 đứng lớp dưới người bảo trợ;300 tự lập võ phái;700 liên minh ba phái và ít nhất 20 học trò trưởng thành; môn phái phàm không tự thành tiên tông. |

Nông dân, thương nhân, quan viên và chưởng môn nhận tiền theo kỳ; thanh tiến độ và sổ thu chi phải cho biết tiền đang chờ nhận, không cộng cả doanh thu kỳ vào tiền mỗi ca. Thuế, phí sinh hoạt và chi phụ thuộc tính riêng, chỉ miễn khi hợp đồng ghi cấp dưỡng. Giá trị BT05 trong ca ngư dân là doanh thu gộp theo hàng thật, không sinh thêm bốn cá ngoài tiền công.

Ba năng lực điều kiện nghề thuộc **KS21**, ánh xạ sang nhóm ST21 ở bảng thuộc tính; mỗi nhánh 0–1.000, không phải thang 100 của sức khỏe/ngộ tính: **KS21-Võ** là võ học thực chiến; **KS21-Chữ** là đọc, viết, tính sổ; **KS21-Bơi** là bơi và cứu đuối. Các nghề PM12/13/18 lần lượt cần KS21-Võ 100/100/300; PM16 cần KS21-Chữ 300; PM17 cần KS21-Bơi 100. Buổi luyện chuyên nhánh kéo dài hai giờ, tiêu 20 thể lực, phí 8 đồng ở võ quán,5 đồng tại người dạy chữ hoặc 6 đồng tại bến có người cứu hộ; đạt chuẩn nhận 8 điểm. Mỗi ngày tối đa một buổi có điểm cho mỗi nhánh và tổng tăng không quá 8 điểm/nhánh/ngày. Công việc thành công có sử dụng đúng năng lực nhận 2 điểm, tối đa một lần/ngày, cùng trần 8 điểm với luyện tập. Đọc đi đọc lại một trang, tự ngâm nước hoặc đánh đồng minh không nhận điểm.

Nguồn luyện: KS21-Võ tại sânLOC13 hoặc võ quánPM18 còn hoạt động; KS21-Chữ tại LOC02/12 với thầy/cá thể kế nhiệm; KS21-Bơi tại LOC09 khi thời tiết an toàn và có người hướng dẫn. Tự học bằng sách chỉ tới 99 điểm nếu thiếu kiểm tra thực hành; cần trả phí một buổi kiểm tra tại 100 và 300 cho nghề có điều kiện đó. **PF-HD01 Dưỡng Thân Quyền có bộ đếm buổi 5/20/60 riêng**, chỉ mở mức phòng ngự đã ghi của bài dưỡng thân; không chuyển số buổi ấy thành KS21-Võ 100/300, không tự dạy kiếm/chưởng/tàng hình. Người chơi có thể học cả hai nhưng phải thực hiện thời gian và chi phí của từng chương trình.

#### B.5. Chế tạo có đầu vào và đầu ra thật

Mười hai công thức **CR01–CR12** dưới đây thuộc đời phàm, không tiêu linh lực và không tạo linh căn. Vật tư mua theo bảng BT; phí lò/bếp ghi riêng. Mỗi mẻ tính đúng một lần chi phí, thời gian, rủi ro và đầu ra. Mốc 300/700/1.000 giảm xác suất hỏng tương đối 15%/30%/45%;300 là chuyên gia,700 là tông sư,1.000 là hoàn thiện bên trong bậc tông sư, không tạo bậc nghề thứ năm. Chất lượng tốt kéo độ bền thêm 10%, không tăng phép. Đây là công thức phàm; bảng chế phápTU dùng cơ sở và cộng cơ hội riêng, không cộng hai lợi thế từ hai bảng cho cùng mẻ. Đồ do nghề sản xuất đã có trong tập BT, không tạo thêm đồ vô danh.

| ID | Đầu vào một mẻ | Dụng cụ; thời gian; phí | Đầu ra chuẩn | Hỏng và điều kiện |
|---|---|---|---|---|
| CR01 | BT01×2, BT02×1, BT04×1, BT03×1 | Bếp; hai giờ; miễn phí tại nhà | BT20×2 | 5% cháy: chỉ còn một phần ăn no 25 dùng trong ngày; không bán. Biết nấu ăn cơ bản. |
| CR02 | BT05×1, BT06×2, BT02×1, BT03×1 | Nồi; một giờ; phí bếp 1 đồng | BT21×2 | 4% hỏng: bỏ mẻ; cá quá hạn bị từ chối trước chế tạo. |
| CR03 | BT05×2, BT04×2 | Vại kín; hai giờ thao tác, chờ một ngày; 1 đồng | BT22×2 | 8% muối không đều: hỏng sau một ngày, giảm giá đúng độ tươi. |
| CR04 | BT07×1, BT08×2, BT17×1 | Dược cụ BT40; hai giờ; 2 đồng | BT23×2 | 6% nhiễm bẩn: mất toàn bộ, không được bán như băng sạch; nghề dược từ 100. |
| CR05 | BT09×2, BT02×2, BT03×1 | Nồi thuốc; ba giờ; 2 đồng | BT24×2 | 7% sắc sai: mất mẻ; dược từ 100; không chữa D05/D06. |
| CR06 | BT10×1, BT07×1, BT12×1 | Dao phàm; một giờ; 1 đồng | BT25×2 | 5% không kín: không lọc được, hoàn lại gỗ; nhận biết nước bằng kỹ năng sinh tồn từ 100. |
| CR07 | BT12×2, BT13×2, BT07×1 | Dao; hai giờ; 2 đồng | BT26×2 | 5% lệch nẹp: hoàn một gỗ, không tạo nẹp; nghề mộc/võ y từ 100. |
| CR08 | BT11×2, BT10×3, BT12×1 | Lò rèn; tám giờ; 8 đồng | BT27×1 | 12% nứt: trả BT11×1 dạng phôi thu hồi; rèn từ 300, lò có nước tôi. |
| CR09 | BT14×2, BT13×2, BT07×1 | Bộ kim; sáu giờ; 4 đồng | BT28×1 | 10% rách mép: hoàn một BT14; may/thuộc da từ 300. |
| CR10 | BT15×2, BT13×1, BT16×1 | Bếp; hai giờ; 1 đồng | BT29×2 | 5% nứt nến: một cây sáng hai giờ; không gắn giá cây chuẩn. |
| CR11 | BT14×2, BT13×2, BT07×2 | Bộ kim; sáu giờ; 4 đồng | BT30×1 | 9% bung đáy: hoàn một da và một vải; may từ 300; không thể gắn chồng hai túi. |
| CR12 | BT18×2, BT19×1, BT15×1 | BT39; một giờ; 1 đồng | BT31×2 | 3% nhòe: mất giấy/mực, hoàn sáp; viết từ 100, yêu cầu người gửi duyệt. Không đọc/đổi nội dung mà vẫn coi là giao đúng. |

Người chơi phải có công cụ, mặt bằng và quyền dùng nơi chế; không cộng thêm lương nghề khi đang tự chế để bán. Giá bán lẻ không bảo đảm lợi nhuận nếu mua toàn bộ đầu vào giá lẻ: mua sỉ giảm 20% khi hợp đồng trên 30 đơn vị, trả trước và có giới hạn tồn kho. Vật tư khan hiếm có thể khiến nhận hợp đồng là quyết định nguy hiểm; màn nhận việc nêu chi phí và nghĩa vụ, không giấu lỗ vào kết quả.

#### B.6. Chiến đấu, thoát thân và chiến lợi phẩm

Đề xuất công thức sát thương vật lý: lấy công × hệ số chiêu, trừ 0,6 lần thủ mục tiêu, sàn một sát thương trước kháng và trạng thái; sát thương pháp dùng pháp công và trừ 0,35 lần thủ, rồi áp kháng thuộc tính. Số lần đánh được tách rõ; chiêu ba đòn không nhân cả tổng thành ba lần ngoài ý muốn. Trang bị phàm chỉ tăng chỉ số đã khai báo; không vượt hai đại cảnh giới bằng cách cộng phần trăm vô hạn. Đối thủ, thú và người dân lấy sức mạnh theo hồ sơ của họ, không lấy cảnh giới của người chơi để thay số khi bước vào trận.

Mỗi vòng mọi người còn hành động được nhận một lượt, thứ tự theo thân pháp từ cao xuống, bằng nhau dùng hạt giống trận đã lưu. Tỉ lệ trúng nền 85%, cộng 2 điểm phần trăm mỗi chênh thân pháp, giới hạn 55–95%, sau đó áp né với trần 45%. Chiêu ghi chắc trúng chỉ bỏ phép thử trúng, vẫn chịu thủ/kháng. Trạng thái kèm đòn chỉ thử sau đòn trúng và chưa bị chặn hoàn toàn; tỉ lệ áp nền 60%, kháng đúng loại trừ tối đa 40 điểm phần trăm; không áp một trạng thái mới lên mục tiêu đã miễn. Hành động tiêu tài nguyên trước khi giải quyết, bị ngắt không hoàn chi phí trừ khi chiêu ghi rõ. Đánh thường không tiêu thể lực; thủ/đòn nặng/chạy tiêu theo AI. Mỗi vật phẩm dùng chiếm một lượt, tổng ba vật phẩm tiêu hao mỗi người mỗi trận; hết số dùng không tự mua thêm từ cửa hàng đang đóng.

Mỗi lượt tiêu chuẩn chọn một ý định, công bố trước khi đòn giải quyết; “bất ngờ” chỉ áp lần phục kích đầu có dấu vết cảnh báo. Ý định **AI01** đánh thường: hệ số 1, không tiêu tài nguyên; **AI02** đòn nặng: báo trước một lượt, hệ số 1,6, tiêu 20 thể lực, bị ngắt sẽ mất lượt; **AI03** thủ thế: tiêu 10 thể lực, giảm 40% sát thương lượt; **AI04** nhắm yếu điểm: hệ số 0,8 và thử gây một CH01; **AI05** khống chế: hệ số 0,6, tiêu 15 linh lực hoặc 20 thể lực theo chiêu, thử CH06; **AI06** hồi phục: dùng một món thật, có thể bị ngắt; **AI07** gọi viện: báo trước hai lượt, tối đa một đợt hai đồng minh theo hồ sơ địa điểm; **AI08** rút lui: dùng công thức chạy; **AI09** đầu hàng/đàm phán: bỏ tấn công, chờ đối phương quyết định; **AI10** liều chết: chỉ khi máu dưới 25%, công tăng 25%, thủ giảm 25%, ba lượt, sau đó CH07; **AI11** hộ tống/bảo vệ: gánh 50% sát thương của một mục tiêu, tối đa một liên kết; **AI12** thiêu hủy vật chứng: báo trước một lượt, phá đúng vật có quyền truy cập, không hủy đồ đang ở kho khác.

Tỉ lệ chạy cơ bản 35%, cộng 3 điểm phần trăm cho mỗi chênh lệch thân pháp, cộng 20 khi có đường rút chuẩn bị, trừ 20 nếu bị bao vây; giới hạn 5–90%. Mỗi lần thử tiêu 20 thể lực và một lượt; còn dưới 20 thể lực chỉ bò rút, cơ hội tối đa 20%. Bỏ trận thành công dẫn tới ô an toàn đã biết hoặc ô địa hình liền kề hợp lệ; không dịch chuyển qua núi/hồ. Đối thủ truy đuổi tối đa hai ô nếu không có nhiệm vụ săn đích danh; kẻ có thù/truy nã bền dùng lịch truy sát riêng.

HP về không: mặc định gục, kiểm tra ý định đối thủ. Thú đói, sát thủ đã nhận lệnh và chiến trường có giết người giải quyết chết nếu không có cứu viện/hộ mệnh hợp lệ; cuộc tỷ võ có luật dừng ở gục và tạo D01/D02; cướp có thể lấy tài sản và bỏ đi, nhưng phải có hành vi AI đã khai báo. Không bốc một xác suất sống lại chung sau mọi trận. Xin hàng là lựa chọn có giá: giao tối đa 50% tiền mang, vũ khí hoặc bị bắt theo luật; đối thủ có lệnh giết có thể từ chối trước khi người chơi xác nhận. Tiêu diệt kẻ đã đầu hàng là hành vi riêng để Hành Đạo/Nghiệp Duyên xử lý.

Mỗi cá thể có túi đồ thật; thắng chỉ chuyển đồ còn nguyên. Không vừa lục xác vừa nhận thêm bộ chiến lợi phẩm do cùng một nguồn sinh hai lần. Đồ kỹ năng thường là bản sao/tín vật, không mặc định lấy được công pháp trong đầu đối thủ. Địch phá đồ, bỏ chạy mang đồ hoặc đồng minh nhặt trước phải có nhật ký. Thu hoạch thú cần hai giờ, dao BT27 và chỗ mang; bỏ xác lâu một ngày thịt hỏng, ba ngày chỉ còn xương/da hỏng.

#### B.7. Mười tám trạng thái và sáu loại thương bệnh

Trạng thái CH kéo dài theo lượt chiến đấu; khi ra trận quy đổi một lượt thành một phút còn lại, trừ loại ghi rõ. Cùng ID chỉ lấy cường độ cao nhất, làm mới thời lượng trong trần, không xếp vô hạn. Chi phí giải trừ ghi rõ; nghỉ tự nhiên không xóa thương bệnh D. Hiệu ứng gây trạng thái phải thử bằng nguồn chiêu đã khai báo; quái không tự có đủ mười tám trạng thái.

| ID | Trạng thái | Tác động; trần/thời lượng | Điều kiện và xử lý |
|---|---|---|---|
| CH01 | Chảy máu | Mất 3% HP tối đa/lượt, tối đa ba lớp tương đương 9%; ba lượt, tối đa sáu | Dao/răng; BT23 một cuộn, một hành động, xóa hết; thủ thế không ngăn chảy máu. |
| CH02 | Trúng độc | Mất 2% HP/lượt, tối đa hai lớp; năm lượt, tối đa mười | Độc có ID; thuốc giải hợp loại trong danh mục chính, một hành động; cấp cứu rửa vết 30 đồng chỉ giảm còn một lớp. |
| CH03 | Thiêu đốt | Mất 4% HP/lượt, một lớp; ba lượt | Nước BT02×1, một hành động, xóa lửa thường; lửa đạo lực cần chiêu giải phù hợp, không dùng nước phàm mặc định. |
| CH04 | Hàn cứng | Thân pháp giảm 25%, tiêu thể lực tăng 25%; ba lượt | Một lớp; sưởi BT03×1 và 10 phút ngoài trận; chiêu giải hàn trong trận tốn một hành động. |
| CH05 | Tê dại | Đòn tiếp theo công giảm 30%, sau đó hết; tối đa hai lượt | Một lớp; thủ thế một lượt tiêu 10 thể lực cũng giải; không tước quyền liên tiếp vô hạn. |
| CH06 | Trói buộc | Không chạy/đổi vị trí; hai lượt | Một lớp; chém dây dùng BT27 một lượt, hoặc tiêu 25 thể lực một lượt phá trói; trói bằng pháp trận dùng phá trận đúng công cụ. |
| CH07 | Kiệt sức | Công và thân pháp giảm 20%; năm lượt | Thể lực dưới 10; nghỉ ngoài trận hai giờ và ăn một BT20; thể lực hồi trên 30 thì hết, không cộng với CH12 để giảm hơn 40%. |
| CH08 | Hoảng loạn | Chính xác giảm 20%, chạy tăng 10 điểm phần trăm; hai lượt | Một lớp; trấn tĩnh một lượt tốn 10 thể lực; đạo tâm cao giảm thời lượng theo cơ chế tâm lý, không tự miễn. |
| CH09 | Mù tạm | Chính xác giảm 40%; hai lượt | Bụi/khói/chiêu; rửa bằng BT02×1 một hành động xóa bụi; phép mù cần giải pháp tương ứng. |
| CH10 | Phá giáp | Thủ giảm 25%; ba lượt | Một lớp; sửa giáp sau trận 15 đồng và hai giờ, chỉ phục hồi hao bền, không kéo dài trạng thái sang ngày nếu không D02. |
| CH11 | Nhiễu thần | Pháp công giảm 20%, chi phí pháp thuật tăng 20%; ba lượt | Chỉ tác động tu sĩ có thức hải; tĩnh tâm một lượt tiêu 10 linh lực giảm một lượt, không hồi MP. |
| CH12 | Suy nhược | Công/pháp công giảm 15%, hồi HP giảm 25%; bốn lượt | Một lớp; thuốc hồi trong danh mục chính không tự chữa; ra trận nghỉ bốn giờ + một BT21 thì hết. |
| CH13 | Choáng | Mất một hành động kế tiếp; không cộng thời gian | Hết choáng có một lượt miễn choáng mới; chiêu giải choáng dùng hành động/phí của chính chiêu đó, không tự mất hai lượt vì hai nguồn cùng đánh. Từ “khựng” chỉ áp choáng khi chiêu ghi rõ. |
| CH14 | Hộ thể | Lớp HP riêng hấp thụ đòn sau phòng ngự/kháng, tối đa 30% HP tối đa người nhận trong trận thường; riêng nghi thức thiên kiếp dùng trần 50% theo bảng trợ kiếp; thời hạn theo chiêu, thiếu khai báo mặc định một lượt | Cùng nguồn chỉ thay lớp còn lại nếu mạnh hơn hoặc gia hạn khi chiêu ghi; khác nguồn cộng trong trần chung, không cộng nhiều lớp vượt trần; hết hạn mất phần chưa dùng. Đòn xuyên hộ thể chỉ bỏ phần đã ghi, không xóa cả lớp. |
| CH15 | Đánh dấu | Một lượt, cho phép nhận biết một ý đồ kế tiếp đã khai báo; không tự tăng sát thương | Gỡ bằng kỹ năng xóa dấu hoặc hết hạn; không lộ toàn bộ đời NPC và không giữ GPS sau trận. Sát thương cộng thêm chỉ có khi chiêu đánh ghi điều kiện dấu. |
| CH16 | Ẩn nấp | Thời lượng theo chiêu, SK16A là hai lượt và cộng 15 điểm ẩn; không thành miễn nhiễm | Kiểm phát hiện một lần khi địch quyết định mục tiêu: cơ hội giữ ẩn 50% cộng điểm ẩn, trừ 2 điểm mỗi chênh thần thức của địch cao hơn; giới hạn 5–85%. Chủ động đánh hoặc trúng đòn diện rộng làm mất ẩn; mở UI không thử lại. Phàm dùng quan sát/KS21-Võ thay thần thức nhưng không giấu được khỏi mọi tu sĩ chỉ bằng áo tối màu. |
| CH17 | Làm chậm | Thân pháp giảm 15%, hai lượt, một lớp | Cộng với CH04 nhưng tổng giảm thân pháp do hai trạng thái không quá 30%; chiêu giải chậm xóa CH17 theo chi phí chính chiêu. Một phần giảm tốc có nguồn tự thân vẫn tính trần. |
| CH18 | Tụ lực | Chuẩn bị và phát đòn chiếm tổng hai hành động; hiển thị đòn sẽ phát | ChoángCH13 hoặc chiêu phá tụ hợp lệ hủy phần đòn chưa phát; chi phí đã trả không hoàn. Không tự cộng sát thương ngoài hệ số chiêu; AI02 đã ghi 1,6 thì không nhân thêm 1,6 lần. Đổi mục tiêu cần bỏ tụ rồi chọn lại, không phát đòn vào NPC đã chết. |

| ID | Thương bệnh | Tác động và thời gian | Điều trị, giá, điều kiện khỏi |
|---|---|---|---|
| D01 | Rách phần mềm | Giảm HP tối đa 10%, lao động nặng tăng rủi ro thêm 5 điểm; bảy ngày | BT23×2 + BT17×1, phí khám 20 đồng, nghỉ hai ngày; đủ ăn, bảy ngày khỏi. Không trị:14 ngày và 20% chuyển D05 ở ngày 3. |
| D02 | Gãy xương | Thân pháp giảm 40%, không lao động nặng/đòn nặng;30 ngày | BT26×1, phí nắn 120 đồng, nghỉ bảy ngày rồi làm nhẹ;30 ngày khỏi. Chưa nắn: không tự khép chuẩn, sau 60 ngày tạo di chứng thân pháp−1 đến khi phẫu trị 300 đồng/30 ngày. |
| D03 | Tổn thương kinh mạch | Linh lực tối đa và tốc hồi giảm 30%, không đột phá;90 ngày | Thầy thuốc FA07 tại LOC10: phí khám/theo dõi hai linh thạch hạ phẩm, dùng CC-VT02 Hộ Mạch Tán×3 ở ngày 1/31/61, tiền thuốc theo giáCC-VT02 riêng; tĩnh dưỡng 30 ngày rồi làm nhẹ, ngày 90 kiểm lại. Đây là điều trị dịch vụ, không tiêu lại cùng gói thuốc khi mở kết quả. Vô căn không nhận D03 để rồi được “chữa” thành có căn. |
| D04 | Phong hàn/sốt | Công giảm 15%, thể lực hồi giảm 50%; bảy ngày | BT24×3 trong ba ngày, phí khám 15 đồng, ngủ HS03 trở lên; đủ nước, bảy ngày khỏi. Không chữa/khát:10% mỗi ba ngày chuyển D05, không cuộn mỗi lần mở UI. |
| D05 | Nhiễm trùng | Mất 4% HP tối đa/ngày, không hồi tự nhiên; tối đa mười ngày | Thầy thuốc nghề từ 600: phí 180 đồng, BT17×3, nghỉ năm ngày; mỗi ngày chăm sóc chặn mất máu; ngày 10 chưa điều trị giải quyết tử vong có cảnh báo từ ngày 3. |
| D06 | Hồn thương | Ngộ tính/đạo tâm giảm 20%, tăng một bậc rủi ro tâm ma;60 ngày | Người có pháp môn hộ hồn, phí ba linh thạch hạ phẩm và bảy ngày dưỡng hồn; có đường tìm viện trợ qua thế lực, không bắt vô căn tự thi pháp; khỏi sau 60 ngày, không biến thành khí vận mới. |

Mỗi loại thương bệnh chỉ một hồ sơ; tái thương tăng thời gian tối đa 50%, không nhân đôi trừ chỉ số. Tổng giảm HP tối đa do thương bệnh không quá 50%; khả năng tử vong do chảy máu/nhiễm trùng vẫn tồn tại. Thuốc hồi HP không xóa thương bệnh, nâng cảnh giới không tự xóa di chứng, hồi đầy không tự cứu người đã chết.

#### B.8. Hai mươi bốn hồ sơ đối thủ

Mỗi mẫu **FO01–FO24** giữ cảnh giới sinh thái cố định hoặc khoảng cấp ghi rõ. Với tu sĩ, HP/MP/công/thủ lấy nền RL và nhân lần lượt bốn hệ số trong cột; phàm/thú thường dùng bốn số tuyệt đối. Thân pháp ghi số cuối. Ngoài bảng, cá thể có tuổi, nghề, phe, mục tiêu, mức đói, hành vi đầu hàng và túi thật. Một con hổ không đổi thành yêu vương chỉ vì người chơi đạt Hóa Thần.

| ID | Hồ sơ, nơi gặp | RL; HP/MP/Công/Thủ; thân pháp | Ý định chính; hành vi và vật có thể thu |
|---|---|---|---|
| FO01 | Chó hoang; ven trấn Trung Châu | RL00;28/0/6/1;7 | AI01,AI08 dưới 30%HP; tránh nhóm đông. BT32×1, BT33×1; không linh thạch. |
| FO02 | Sói xám; rừng Đông Hoang | RL00;48/0/9/2;10 | AI04,AI07 gọi một sói nếu có đàn đã ghi trên ô; BT32×2,BT33×1,BT34×2. |
| FO03 | Lợn rừng; rìa rừng các khu | RL00;95/0/13/5;5 | AI02 húc, chỉ tấn công bị dồn/đang bảo vệ con; BT32×4,BT33×2,BT34×2. |
| FO04 | Hổ núi; Tây Lĩnh | RL00;140/0/18/4;12 | AI04 phục kích có dấu chân/tiếng gầm; AI08 dưới 20%; BT32×5,BT33×2,BT34×4. |
| FO05 | Đại bàng đá; vách Tây Lĩnh | RL00;50/0/11/2;15 | AI02 bổ nhào phải báo; bảo vệ tổ, không truy quá một ô; BT32×1, không rơi răng thú. |
| FO06 | Rắn độc đầm; Nam Trạch | RL00;24/0/5/0;9 | AI04 với CH02, không gọi viện; BT32×1 sau làm sạch, không thêm nọc độc chưa có hồ sơ chế tạo. |
| FO07 | Đạo chích non; chợ Trung Châu | RL00;45/0/6/1;11 | Ưu tiên trộm/chạy AI08, xin hàng AI09 nếu bị chặn; túi 0–40 đồng và đồ trộm ghi chủ, không thưởng vô hạn. |
| FO08 | Lính đào ngũ; đường biên Bắc Nhạc | RL00;72/0/11/5;8 | AI03,AI09 dưới 30%; BT27×1 bền 20–40, tiền 20–80 đồng. |
| FO09 | Sơn tặc; đường Tây Lĩnh | RL00;80/0/13/4;9 | AI02,AI07 nếu trại còn người; đòi phí trước đánh; tiền 30–120 đồng, một vũ khí thường bền 15–45. |
| FO10 | Sát thủ phàm; đô thị theo hợp đồng | RL00;65/0/17/3;14 | AI04/AI12 rồi chạy, có lệnh giết không nhận đầu hàng; dao phàm, thư lệnh có chủ; tiền 50–160 đồng. |
| FO11 | Binh lính chính quy; huyện/biên trấn | RL00;85/0/12/7;8 | AI11,AI03,AI07 gắn quân số; bắt giữ trước giết nếu có lệnh; trang bị công, lấy là chiếm đoạt có ghi. |
| FO12 | Võ sư môn phái; võ quán | RL00;150/0/22/12;15 | AI03,AI02,AI09 trong tỷ võ, không mặc định giết; không rơi bí kíp từ xác nếu chưa mang, phần thưởng tỷ võ theo hợp đồng. |
| FO13 | Tán tu nhập môn; động phủ Trung Châu | RL01;0,9/1/0,9/1;9 | AI01/AI06 một BT23 để cầm máu/AI08; một linh thạch, BT31×1 ghi lịch mua thuốc có chủ; không rơi tâm pháp mặc định. |
| FO14 | Độc tu mộc hệ; đầm Nam Trạch | RL01;1,1/1,2/1,1/0,9;10 | AI04 dùng VT-TU07 gây CH02, né lửa, chạy dưới 35%; linh thạch 0–2, tối đa VT-TU07×1 còn chưa dùng. |
| FO15 | Huyết tu; chiến địa cũ | RL01;1,4/0,7/1,3/0,8;9 | AI10, hút sinh lực giới hạn 15%, có thể đàm phán; linh thạch 1–3, BT23×1 còn chưa dùng; không sinh huyết tài từ nạn nhân không tồn tại. |
| FO16 | Sát thủ tu tiên; lộ trình truy sát | RL01;1/1,4/1,4/0,9;15 | AI05/AI04/AI12; có công cụ xuyên thần thức và ẩn khí, tách FO10; linh thạch 1–4, lệnh truy sát. |
| FO17 | Trận sư giữ địa; LOC05 Đông Hoang | RL02;0,9/1,5/1/1,4;10 | AI05/AI03, trận có ba trận nhãn thật ngoài trận; phá nhãn hạ thủ 30%; linh thạch 2–6, VT-TU12×1 chưa tiêu, trận nhãn đã phá không nhận lại. |
| FO18 | Ngự thú sư; LOC08 Nam Trạch | RL02;0,8/1,2/0,9/0,9;12 | AI07 gọi một thú đã nuôi, không sinh vô hạn; AI11 bảo vệ thú; linh thạch 2–5, VT-TU09×4 còn trong túi; không tự chiếm khế thú. |
| FO19 | Thi tu; LOC14 Táng Cốt Nguyên Bắc Nhạc | RL03;1,5/0,8/1,2/1,5;9 | AI01/AI05, miễn CH01 nhưng yếu Hỏa+25%; linh thạch 4–10, VT-TU10×3 còn chưa đốt; không sinh hồn khí vô danh. |
| FO20 | Kiếm tu lão luyện; sơn môn Tây Lĩnh | RL03;1/1/1,5/0,9;20 | AI02 ngự kiếm báo trước, AI09 tùy mục đích; linh thạch 5–12; cầm vk_kiem_che_trieu Kiếm Chẻ Triều từ catalog hiện có, chỉ chuyển nếu còn trên người và chưa bị phá. |
| FO21 | Ma chủ Nguyên Anh; Huyết điện | RL04;1,3/1,4/1,25/1,1;21 | AI05/AI10/AI07 tối đa hai hộ vệ RL02 có hồ sơ; linh thạch 10–25, kho riêng khóa chứ không rơi cả thế lực. |
| FO22 | Hộ pháp Nguyên Anh; tông môn | RL04;1,5/1,1/1,1/1,6;17 | AI11/AI03/AI07; bảo vệ người thuộc phe, không truy sát vì nhãn tà đơn thuần; tiền/công khí theo túi. |
| FO23 | Tôn giả Hóa Thần; di tích Bắc Nhạc | RL05;1,2/1,5/1,3/1,2;28 | AI05,AI02,AI08 nếu đại sự thất bại; linh thạch 20–50, VT-TU11×1 chứa mẫu ký ức đã ghi trong hồ sơ; không tự có ký ức nếu hộp rỗng từ trước. |
| FO24 | Cường giả Độ Kiếp; LOC15 Hồi Thanh Đài | RL06;1,5/1,6/1,4/1,5;35 | AI02/AI05/AI12 gắn mục tiêu cuối, không làm địch farm;60 linh thạch trong túi, không rơi di vật độc nhất mặc định; quyền truy cập điểm kết cục do hành vi/kết quả trận giải quyết theo đại tuyến. |

Phân bố: FO01–12 có thể gặp từ đầu nhưng có dấu nguy hiểm; FO13–18 chỉ nơi có hoạt động tu sĩ; FO19–24 gắn thế lực/di tích và tin đồn rõ. Không cho tu sĩ cao cấp ngẫu nhiên xuất hiện mỗi chuyến kiếm củi. Gặp không đồng nghĩa bắt buộc đánh: quan sát, đổi đường, nộp phí, nhờ người, che thân phận đều phải có điều kiện. Tập này là hồ sơ đối thủ mới tối thiểu được chốt cho hướng thiết kế; không xóa 60 yêu thú danh mục cũ, nhưng từng loài cũ phải được phân loại sinh thái/cảnh giới trước khi được đưa vào lượt sinh mới.

#### B.9. Rơi đồ hiếm, không có vòi tài nguyên vô tận

**DR01** chiến lợi phẩm thường: đúng túi/xác, không quay lại sinh đồ khi tải lại. **DR02** vật liệu quý của thú: tối đa một phần phẩm cao/cá thể; cần nghề thu hoạch từ 300, thành công 70%, thất bại làm hỏng, không reroll cùng xác. **DR03** bí kíp hiếm: chỉ khi đối thủ mang thật; tối đa một bí kíp độc bản cho mỗi ID thế giới, bản sao có quyền sao và độ đầy đủ riêng. **DR04** di vật độc nhất: một bản hoạt động toàn thế giới; bị hủy/chôn/cất kho vẫn giữ trạng thái, không respawn theo mùa. **DR05** vật cải tạo linh căn: chỉ từ các cơ duyên trong danh mục chuyên trách; không thêm tỉ lệ rơi từ quái thường. **DR06** thưởng thế lực: mỗi hợp đồng nhận một lần; giết người giao thưởng không tự nhận lần nữa.

Tồn kho chợ đồ thường hồi tối đa 30 đơn vị/mặt hàng/tháng/chi nhánh khi tuyến vận tải còn thông; dược có 10 đơn vị, dụng cụ năm; hàng hiếm không hồi tự nhiên. Sau chiến tranh/đói, người chơi phải khôi phục tuyến hàng hoặc chờ thế lực thực hiện, không chỉ đóng/mở cửa hàng. Cướp thương đội lấy hàng của thương đội và làm giảm tồn kho dự kiến đến nơi, đồng thời tạo người bị hại; không sinh thêm cùng chuyến hàng trong thành.

#### B.10. Thời gian, tuổi, hành trình và hậu thế

Giữ thời gian theo giờ; UI có thể gộp ngày/tháng/năm nhưng nghiệp vụ phải xử lý sự kiện trên trục lịch. Một ô khoảng 25 dặm theo dữ liệu bản đồ hiện có tại [core2/33-the-gioi-mo.js:44–46](/workspace/Sect/src/game/core2/33-the-gioi-mo.js:44). Đề xuất thời gian đi một ô: đường bằng đi bộ 6 giờ, rừng 10, dốc núi 14, tuyết/đầm 18; cưỡi ngựa đường bằng 3, rừng 6, núi 10; thuyền xuôi dòng 3, ngược 6, không cho ngựa chạy qua hồ. Đi đêm tăng 25%thời gian nếu không có đèn, mưa lớn tăng 30%; tổng cộng dồn giới hạn tăng 100%. Khởi hành phải hiển thị khoảng ước lượng và nhu cầu lương thực, không giả vờ tới nơi đúng giờ khi có bão/sự kiện.

Hành động đọc thư 15 phút; mua bán 30 phút; khám bệnh hai giờ; công việc theo ca B.4; săn gồm tìm dấu bốn giờ, trận tính một phút/lượt, thu hoạch hai giờ; nghỉ tám giờ; học nghề ca bốn giờ; bế quan chọn ngày/tháng/năm nhưng tự dừng trước nguy cấp, hết lương hoặc đột phá đã đầy. Tiêu thời gian chỉ sau khi có lựa chọn thực hiện; xem túi, tooltip, sổ tay và bảng nhiệm vụ không làm già đi. Tác động mỗi năm dùng mốc ngày sinh, không lấy “qua năm mới” để trúng hai lần.

Tuổi bắt đầu mặc định 16, xuất thân cựu binh 22 như nền hiện có; nội dung thơ ấu nằm trong hồi ức, không cần bắt chơi lại cả tuổi nhỏ. Dưới 16 chỉ xuất hiện theo kịch bản đã viết, không làm nghề sát thủ/quan viên ngay. Từ 45 tuổi RL00 không tự giảm công mỗi lượt: kiểm tra sức khỏe mỗi năm; sau 55 tuổi thời gian hồi thương tăng 25%, sau 65 tăng 50%, cộng không quá 50%. Đây là tuổi cơ thể; tu sĩ đo theo tỉ lệ tuổi/thọ nguyên, bắt đầu lão hóa khi vượt 80%thọ nguyên. Gia hạn thọ nguyên không hồi tuổi trẻ trừ vật/pháp có tác dụng đó được khai báo.

Khoảng cách giữa hai kiếp giữ nền 3–30 năm như [core/12-dong-doi-tam-thoi.js:38](/workspace/Sect/src/game/core/12-dong-doi-tam-thoi.js:38); mức cụ thể được chốt khi kết kiếp theo thế cục, không bốc lại khi mở bản lưu. NPC không đứng yên: có sinh/mất, chuyển nghề, di cư, kết giao, thăng chức, đổi phe và kế nhiệm. Một NPC chết ở kiếp trước không trở lại nguyên trạng vì vai truyện cần họ; người kế nhiệm nhận chức năng hoặc di vật, giữ ID khác và quan hệ huyết thống/chức vụ rõ.

Hôn phối, con cái và nhận nuôi cần lựa chọn/đồng thuận của các NPC trưởng thành; quan hệ thân thiết không tự sinh con. Chốt tối đa ba người con được theo dõi sâu/hộ để nội dung hữu hạn; ngoài giới hạn phải từ chối cơ chế tạo thêm hồ sơ sâu, không biến trẻ thành tài nguyên. Mỗi con có cha mẹ/người giám hộ, ngày sinh, sức khỏe, nơi ở, tình cảm, học nghề, quyền tài sản và linh căn bốc theo quy tắc dân số; **quy tắc kiếp đầu có căn chỉ áp chân linh người chơi**, không áp tất cả con đầu lòng. Không đảm bảo con thiên tài vì cha mẹ mạnh.

Di chúc ghi người nhận, đồ, tiền, nhà, nghĩa vụ trong phần di sản. Không di chúc: người phối ngẫu nhận một nửa tài sản chung; phần còn lại chia đều con còn sống và người phụ thuộc có chứng cứ; không có thân nhân thì thế lực bảo quản hoặc công quỹ địa phương theo luật. Tái sinh không tự nhận lại tài sản vì “là cùng người”: phải tìm di vật, chứng minh thân phận hoặc thuyết phục người quản. Người thừa kế có quyền từ chối giao; hành vi cướp lại vẫn có hậu quả.

NPC thù địch cần hồ sơ **ENM**: người gây hại, nạn nhân, bằng chứng, người biết, mục tiêu đòi gì, nguồn lực truy sát, hạn truy, điều kiện hòa giải và người kế thừa thù. Thù gia đình chỉ truyền khi có người biết và muốn báo, không tự nhiễm cả dòng họ. Trả bồi thường, cứu người, chịu phạt, tiêu hủy bằng chứng hoặc diệt người biết là các lựa chọn khác nhau về kết quả và nghiệp duyên; xóa danh sách truy nã không xóa hành vi gốc. Người chơi chết chấm dứt lệnh truy cá nhân trừ người truy biết chân linh qua cơ chế đã công bố; thông thường hậu quả tới kiếp sau qua thế cục và Nghiệp Duyên, không qua GPS biết người tái sinh ở đâu.

#### B.11. Điều kiện nghiệm thu tập nền

Tập nền chỉ đạt khi 22 nhóm thuộc tính chính cùng nhóm năng lực hỗ trợ ST23 có nguồn và nơi hiển thị; bảy mốcRL00–RL06 phân biệt vô căn/chưa nhập đạo;18 nghề có vào nghề, kinh tế, thời gian, rủi ro và thăng tiến;40 vậtBT có nguồn/tiêu thụ/khối lượng/hạn dùng;12 công thức có vật tư hợp lệ và xử lý hỏng;18 trạng thái/sáu thương bệnh có trần, giải trừ và thời gian;24 đối thủ có cảnh giới/sinh thái/ý định/túi thật; sáu luậtDRkhông sinh tài nguyên vô tận; tất cả chuỗi thời gian dài xử lý được ăn, bệnh, tuổi, trôi năm và sự kiện dừng. Đây là điều kiện dữ liệu, chưa phải xác nhận đã cân bằng. Phần nghiệm thu vận hành cần đo về sau bằng lượt chơi được người dùng cho phép, không thực hiện trong tác vụ chỉ phân tích này.

---

<a id="san-xuat"></a>

### 13. Quy tắc hợp nhất và hướng triển khai dữ liệu

#### S.1. Nguồn quyết định và cách đọc tài liệu

Trong tài liệu có ba loại thông tin được ghi nhãn rõ: **hiện trạng đọc từ dự án**, **nội dung mới được đề nghị**, và **bằng chứng cần thu khi triển khai**. Hiện trạng phục vụ truy nguồn, không ghi đè các quyết định thiết kế mới. Một phép thử chưa thực hiện không được ghi là đã đạt. Một nguồn văn học chỉ chứng minh điều trang nguồn nói; hệ thống suy diễn cho Phù Sinh là sáng tạo thiết kế riêng.

Khi hợp nhất nội dung, thứ tự quyết định là: yêu cầu người dùng → các luật bất biến và từ điển của tài liệu → bảng số đề nghị đã chốt → hồ sơ nội dung cụ thể → dữ liệu gốc để đối chiếu. Nếu một vật phẩm cũ đang làm người vô căn có tu vi, phải sửa ý nghĩa khi triển khai hoặc rút khỏi nhóm hợp lệ, không giữ lỗi chỉ vì “trước đây đã có”. Ở lượt công việc này chỉ tạo tài liệu, chưa thực hiện chuyển đổi ấy.

Không đưa cả bảng khí vận/thể chất cũ lẫn mới vào bộ rút cùng lúc. Mỗi mã cũ cần một kết luận: giữ nghĩa, đổi nghĩa có chuyển bản, chuyển sang đặc tính hậu thiên, hợp nhất với mã mới hoặc ngừng sinh nhưng giữ vật thể đã sở hữu. Chỉ ngừng sinh không được xóa món khỏi túi người chơi. Nội dung Excel và nội dung lõi phải được đối chiếu với kết quả nạp cuối, vì số dòng ở một danh mục bổ sung không đồng nghĩa số món thực sự hoạt động.

#### S.2. Trình tự sản xuất có đầu ra xác định

| Bước | Đầu ra để duyệt | Điều kiện chuyển bước |
|---|---|---|
| 1. Khóa nghĩa | Từ điển căn/phàm/võ/tu/Hành Đạo/Nghiệp Duyên/danh tiếng; phân phối căn; sổ quyết định | Không còn một biến cùng chịu trách nhiệm cho hai trục khác nghĩa; không đổi luật theo nhãn phe |
| 2. Đối chiếu nguồn cũ | Sổ chuyển nghĩa của mọi căn, khí vận, thể chất, công pháp, phần thưởng và điều kiện dùng karma | Mỗi nguồn cũ có đích mới hoặc lý do ngừng sinh; không phát minh quá khứ từ tổng karma |
| 3. Khóa đồ thị nội dung | 45 xuất thân với năm nút và ba kết; roster LOC/FA/NP; nghề; cải căn; sự kiện; tân thủ | Mọi mã trỏ tới bản ghi có nghĩa; mọi tài nguyên có chủ, nguồn, tiêu thụ và vòng tái tạo hoặc trạng thái hữu hạn |
| 4. Khóa dữ liệu thời gian và lưu | Nhịp năm, sinh kế, thế cục, già/chết, bản thể nguồn cải căn, kế nhiệm và dư âm | Nhảy dài và chơi từng ngày cho cùng kết quả ngoài những khác biệt do hành động thực của người chơi |
| 5. Duyệt các vòng đời đủ nội dung | Một hồ sơ đời phàm nghèo, quan viên, võ phái, người cải căn, tán tu, thiên kiêu, ma tu, người từ bỏ tuyến và người diệt thế | Mỗi hồ sơ có sinh kế, lựa chọn, hậu quả, kết đời và đường đời sau; không cần kịch bản gian lận để khép vòng |
| 6. Kiểm định giao diện và dữ liệu | Ma trận 13 yêu cầu và các trường hợp mất NPC, mất nơi, rớt cảnh giới, chết giữa nhảy năm, tải giữa nhận thưởng | Không kẹt luồng, không nhận trùng, không lộ số bị yêu cầu giấu, không tân thủ ở đời sau |
| 7. Cân bằng bằng trải nghiệm thật | Bảng quan sát định lượng và lời kể sau chơi, có phiên bản và cấu hình | Không suy “công bằng” chỉ từ hệ số thưởng; người chơi nhận biết được cái giá và có lựa chọn thực |
| 8. Khóa bản nội dung phát hành | Dữ liệu đã duyệt, sổ thay đổi, quy tắc chuyển bản và bản sao phục hồi | Không có bản ghi thiếu đích, đoạn văn chờ viết, vật phẩm vô nguồn, kết cục không thể đạt hoặc nguồn cung tự nhân khi chuyển sinh |

Những bước này là thứ tự phụ thuộc, không phải ước lượng số ngày hay cam kết nhân sự. Không có dữ liệu về quy mô đội và ngân sách để đặt một lịch sản xuất đáng tin. Tuy nhiên, phạm vi nội dung cần làm đã được chỉ định, không dùng sự chưa biết ấy làm lý do để bỏ qua các hệ thống.

#### S.3. Tiêu chí cho một bản ghi thực sự đủ dùng

| Loại bản ghi | Nội dung bắt buộc phải cùng có |
|---|---|
| Một hành động | Người làm, điều kiện, địa điểm, đầu vào, thời gian, mục tiêu, hiệu quả, thất bại, khả năng dừng và biên nhận |
| Một tài nguyên | Nguồn thế giới, chủ, số lượng, chất lượng, cách lấy, cách giữ, giá nếu được bán, cách tiêu, hạn, tái tạo và cạnh tranh NPC |
| Một sự kiện | Hoàn cảnh, thông tin có thể biết, lời dẫn, các lựa chọn, chi phí, kết quả ngay, kết quả trễ, nhân chứng, người chịu ảnh hưởng và cách đóng |
| Một xuất thân | Mã cũ ổn định, gia cảnh, quan hệ, bí mật, năm mốc cụ thể, ba kết có điều kiện, trạng thái khi bỏ và dấu đời sau |
| Một nghề | Gia nhập/rời, dụng cụ, kỹ năng, thời gian, cầu, sản phẩm/dịch vụ, chi phí, rủi ro, thăng tiến, thành tựu và mục tiêu đời |
| Một NPC | Cá thể, tuổi, thọ nguyên, căn, nghề, sức mạnh, tài lực, nơi, lịch, quan hệ, hiểu biết, chủ ý, giới hạn hành vi, chết/kế nhiệm |
| Một địa điểm | Địa lý, đường vào, chủ, sinh kế, dân, dịch vụ, nguồn lực, giờ hoạt động, tin tức, phá hủy và phần còn lại |
| Một kết cục | Điều kiện có thể kiểm chứng, cách người chơi chọn/khước từ, lời kết, thay đổi thế giới, dấu luân hồi và việc tiếp tục hồ sơ |
| Một hiệu ứng | Đích thật có định nghĩa, lượng/đơn vị, điều kiện, thời điểm, thứ tự, trần, chồng lặp, hết hạn, cách gỡ và câu hiển thị |
| Một phần thưởng | Nguồn chi trả, tài sản thật hoặc quyền có chủ, điều kiện nhận, giới hạn, khi đầy túi, nhận trùng, bỏ qua và tử vong |

Các bảng hồ sơ cụ thể trong tài liệu cung cấp bộ nội dung mới đã chọn. Từ điển dữ liệu ở chương D là danh sách trường phải lưu và kiểm định; nó không được dùng để tuyên bố hàng nghìn vật phẩm cũ đã tự có đủ cốt truyện, nguồn cung hoặc điều kiện căn mới. Phụ lục hiện trạng giữ đúng số đếm ở cấp nguồn và chỉ rõ giới hạn này. Việc sao nguyên một kho dữ liệu cũ vào cuối tài liệu sẽ không tự giải quyết chuyển nghĩa; cần rà từng bản ghi trong đợt sản xuất.

##### Giá và nguồn cung đóng cho hai mươi vật phẩm tân thủ

Đây là bảng kinh tế bổ sung cho D2; không thay hiệu ứng hoặc phần thưởng ở đó. Tiền đồng dùng đơn vị một đồng; tồn và nhịp bổ sung là của một quầy, phụ thuộc tuyến cung ứng và chủ còn hoạt động. Nguồn mua ngoài hướng dẫn tồn tại ở các chợ/làng cùng loại nếu NPC neo đã chết; không hồi sinh đúng NPC ấy.

| Mã | Giá mua gốc; quầy | Tồn và nhịp bổ sung |
|---|---|---|
| VT-HD01 | 14 đồng/khẩu phần; chợ LOC01/02/09 | 20 phần, thêm 10 mỗi bảy ngày |
| VT-HD02 | 1 đồng/ống đủ một ngày; bếp LOC01/02/09 | 20 ống, bổ sung hằng ngày nếu nguồn nước hoạt động |
| VT-HD03 | 8 đồng/cuộn; y quán LOC10 hoặc sạp thuốc LOC01 | 10 cuộn, thêm 5 mỗi bảy ngày |
| VT-HD04 | 18 đồng/hộp; y quán LOC10 | 8 hộp, thêm 4 mỗi bảy ngày; thuốc phàm hồi cố định 8 HP, không tỷ lệ theo cảnh giới |
| VT-HD05 | 6 đồng/bát; bếp chợ LOC01/02 | 10 bát/ngày; bát thừa hỏng cuối ngày |
| VT-HD06 | 12 đồng/liều; y quán LOC10 | 6 liều, thêm 3 mỗi bảy ngày |
| VT-HD07 | 30 đồng/áo; sạp vải LOC01/02 | 4 áo, thêm 2 mỗi tháng |
| VT-HD08 | 18 đồng/gậy; xưởng mộc LOC01/11 | 4 gậy, thêm 2 mỗi tháng; tự đẽo từ BT12 một thanh trong hai giờ, cần dao mượn tại xưởng giá 2 đồng |
| VT-HD09 | 55 đồng/dao; lò LOC11 hoặc hàng rèn LOC01 | 3 dao, thêm 1 mỗi tháng |
| VT-HD10 | 10 đồng/bộ; sạp may LOC01/02 | 6 bộ, thêm 3 mỗi tháng |
| VT-HD11 | 12 đồng/viên; lò LOC11 | 5 viên, thêm 2 mỗi tháng |
| VT-HD12 | 5 đồng/bó; dược phàm LOC10/06 | 12 bó/quầy, thêm 6 mỗi bảy ngày; một ca thu hái hai giờ được hai bó trên bãi còn trữ lượng, tối đa 10 bó mỗi tháng mỗi bãi |
| VT-HD13 | 8 đồng/phần; vườn LOC10 | 10 phần, thêm 5 mỗi bảy ngày; một ca thu hái hai giờ được một phần, tối đa 6 phần mỗi tháng mỗi bãi |
| VT-HD14 | 6 đồng/tấm; thợ dệt LOC01/11 | 10 tấm, thêm 5 mỗi bảy ngày |
| VT-HD15 | 15 LT/bản sách; tạp hóa LOC03 hoặc thầy dẫn khí | 2 bản, thêm 1 mỗi mùa nếu nguồn sao chép còn; truyền dạy từ thầy không sinh một bản sách để bán |
| VT-HD16 | 120 đồng/bản; sân võ LOC01/13 | 3 bản, thêm 1 mỗi tháng; học truyền miệng trả 60 đồng, không nhận vật sách |
| VT-HD17 | Theo giá linh thạch địa phương 3–8 quan/viên và lượng đổi ở B2 | Không tồn riêng vì là cùng tiền tệ hiện hữu; thưởng ghi tăng số dư linh sa, không tạo món tiền chiếm ô |
| VT-HD18 | Không bán; mệnh giá đổi 80 đồng cho chủ sở hữu | Một thẻ trên một biên nhận lao động thật; thẻ nhiệm vụ nhận một lần, không lấy thẻ trắng đổi lương |
| VT-HD19 | 35 đồng/túi; hiệu thuốc LOC10 | 4 túi, thêm 2 mỗi bảy ngày; khi đóng gói trừ đúng ba VT-HD12 và hai VT-HD13 khỏi kho quầy |
| VT-HD20 | Không bán; có từ đầu đời, chỉ là chìa mở sổ | Một bản trên mỗi đời; dữ liệu nhật ký nằm trong hồ sơ, không thể nhân từ vật sách |

Các thuốc và thức ăn phàm có hiệu lực vật lý cố định hoặc hiệu quả nghỉ được giới hạn; không tự mạnh theo HP tu sĩ. Chỉ hiệu quả pháp thuật thật sự tiêu linh lực và thuốc đúng phẩm mới dùng tỷ lệ HP của cảnh giới tương ứng. Một loại đan trong dữ liệu cũ không thể đồng thời được ghi hai tỷ lệ khác nhau mà vẫn giữ cùng ID.

#### S.4. Những quyết định được phép thay khi cân bằng

Có thể điều chỉnh giá, sản lượng, thời gian, xác suất cải căn, hệ số tăng trưởng, trần, trọng số cơ hội và độ mạnh đối thủ theo quan sát thật, với phiên bản và lý do. Phải cập nhật đồng thời tooltip, nhãn mức, điều kiện nhiệm vụ, nguồn thưởng và hướng dẫn liên quan. Không được lén thay nguyên tắc “vô căn không thể tu”, bảo đảm căn ở đời đầu, hai trục độc lập, quyền sống đời phàm, tân thủ không hạn/phạt hoặc quyền bỏ cốt truyện bằng một thay đổi cân bằng.

Những dữ kiện chỉ có sau chơi thật gồm tỷ lệ người hiểu luật, cảm giác ý nghĩa của đời phàm, độ nhớ NPC, sự rõ ràng của nguyên nhân chết và mức hấp dẫn thực của từng lựa chọn chính/tà. Chúng được ghi là dữ liệu phải thu, không bịa con số để làm tài liệu có vẻ hoàn chỉnh. Trọng tâm nghiệm thu là người chơi có những cuộc đời khác nhau để thực sự quan tâm, và thế giới phản ứng có nguyên nhân với những cuộc đời ấy.

---

<a id="hien-trang"></a>

### 14. Phụ lục đối chiếu hiện trạng dự án

Phạm vi đối chiếu: chỉ đọc nguồn và tài liệu trong `/workspace/Sect`; không chạy game, không chạy máy tự chơi, không build, không thay đổi dữ liệu. Những gì dưới đây là hiện trạng đọc được, không phải tính năng đã được kiểm chứng khi vận hành. Trạng thái Git đầu phiên sạch. Tài liệu này không thay đổi các yêu cầu thiết kế mới.

#### A.1. Những nền tảng có thể giữ lại

| Nền tảng | Hiện trạng xác minh | Ý nghĩa đối với hướng mới |
|---|---|---|
| Tên và cấu trúc | Game tên **Phù Sinh**; nguồn tại [src/game](/workspace/Sect/src/game), giao diện tại [src/react](/workspace/Sect/src/react); bản HTML là đầu ra được ghép. | Giữ tên; chỉ tạo tài liệu phân tích mới, không sửa bản chơi. |
| Bản đồ | Năm đại khu **Trung Châu, Đông Hoang, Nam Trạch, Tây Lĩnh, Bắc Nhạc** trên một bản đồ liền; bỏ quan ải. | Dùng năm khu làm địa lý chính thức cho các đại tuyến; không mặc định mỗi khu là một cấp độ tu luyện. |
| Luân hồi | Có bộ đếm kiếp, Bến Vong Xuyên, lịch sử đời trước, mộ, di vật, ân oán, đối thủ giết người chơi và bước nhảy thời gian sau khi chết. | Có thể mở rộng thành sổ nghiệp duyên, không cần coi mỗi kiếp là một thế giới hoàn toàn mới. |
| Cảnh giới | Luyện Khí, Trúc Cơ, Kết Đan, Nguyên Anh, Hóa Thần, Độ Kiếp. | Phân biệt cảnh giới tu tiên với thành tựu nghề phàm nhân và kết cục đời người. |
| Chỉ số bằng chữ | Đã có bộ diễn đạt mức độ, mô tả thay số, mức tâm ma, hảo cảm, đột phá, hậu thiên khí vận. | Có thể kế thừa văn phạm; vẫn cần đổi ngữ nghĩa và dữ liệu của chính/tà, nhân quả. |
| Lời kể | Có những mẩu đời thường, bi thương, di vật, chờ đợi, mất mát; không chỉ chiến đấu. | Tận dụng chất liệu tốt nhưng phải sắp lại thành cuộc đời có hệ quả dài hạn. |
| Điển tích | **Ngũ Tổ chém Yêu Hoàng**, **Đêm Dài**, **Nam Thiên Môn**, **Vạn Bảo Thương Hội** đã có trong lời kể/điển tích. | Có thể dùng làm nền lịch sử; các quan hệ và bí mật mới phải ghi rõ là đề xuất mới. |

Vị trí nguồn: [src/game/core2/33-the-gioi-mo.js:1–25](/workspace/Sect/src/game/core2/33-the-gioi-mo.js:1); [src/game/core/04-loi-tro-choi.js:71–95](/workspace/Sect/src/game/core/04-loi-tro-choi.js:71); [src/game/core/12-dong-doi-tam-thoi.js:23–53](/workspace/Sect/src/game/core/12-dong-doi-tam-thoi.js:23); [src/game/core/03-dan-duoc-phu-luc.js:167–171](/workspace/Sect/src/game/core/03-dan-duoc-phu-luc.js:167); [src/game/core2/18-ghi-lai-truoc-sau.js:10–12](/workspace/Sect/src/game/core2/18-ghi-lai-truoc-sau.js:10); [src/game/core2/14-sua-lai-pham-khong.js:92–105](/workspace/Sect/src/game/core2/14-sua-lai-pham-khong.js:92).

#### A.2. Đối chiếu đủ mười ba nhóm yêu cầu

| Yêu cầu | Hiện trạng | Dữ liệu và quyết định còn phải bổ sung |
|---|---|---|
| 1. Vô linh căn và cải tạo | Có sáu loại linh căn gốc và Cực linh căn bổ sung; không có trạng thái vô linh căn hoạt động. Dữ liệu từng khai báo khí vận **Vô Căn**, sau đó xóa bằng `delete TT_DEST.vo_can`. | Vô linh căn phải là trạng thái căn cơ, tách khỏi khí vận. Cần toàn bộ nguồn tạo căn, điều kiện, giá phải trả, kết quả, thất bại và luật sau cải tạo. Không được sửa một tên khí vận rồi coi yêu cầu hoàn thành. |
| 2. Tỉ lệ vô linh căn cao | Hàm sinh căn chọn trong tập linh căn có sẵn; tất cả lá số đều có căn. | Cần phân phối mới; nhân quả chỉ điều chỉnh hoàn cảnh, không xác suất có căn; quy tắc lấy mẫu lá số và chống chọn lại để vô hiệu hóa phân phối. |
| 3. Chỉ từ kiếp hai | Có số thứ tự kiếp và tổng số kiếp, nhưng hàm sinh căn hiện không dùng điều kiện này. | Cần quy tắc riêng cho hồ sơ mới, hồ sơ đang chơi, dữ liệu cũ thiếu bộ đếm, chuyển thiết bị và tạo lại hồ sơ. |
| 4. Nhãn phế vật | Tạp linh căn hiện bị người đời gọi là phế linh căn. Phàm nhân là trạng thái chưa dẫn khí, không đồng nghĩa vô linh căn. | Phải tách vô căn, tạp căn và chưa nhập đạo; quy định ai gọi ai là phế vật, tác động xã hội, phần mô tả khách quan và khả năng đổi định kiến. |
| 5. Trải nghiệm nhân sinh | Luật thưởng cuối kiếp hiện ưu tiên cảnh giới, vùng đã qua, thủ lĩnh, số kẻ địch, kỳ ngộ, phi thăng; quy ẩn được ít điểm. | Cần viết lại hệ thành tựu đời người và phần tổng kết để đời phàm nhân không bị hạ thành kiếp thất bại; thêm sinh kế, quan hệ, thành tựu nghề, mất mát, di sản và lựa chọn. |
| 6. Đại đạo đa dạng | Có xuất thân phàm nhân nhưng các hoạt động chính vẫn phục vụ tu tiên; có công pháp, luyện chế, trận pháp và linh thú làm nền. | Cần tách xuất thân, nghề kiếm sống, thân phận, thế lực, hệ tu luyện và pháp môn. Chưa có đủ dữ liệu nghề/nghề nghiệp/kết cục để gọi là ba nghìn đại đạo. |
| 7. Nhân quả nhiều nghĩa | Có biến `karma`, ân/oán trong `seeds`, ân nhân/thù hận trong `legacy`; nhiều lựa chọn đang gắn cộng thiện/trừ ác trực tiếp. | Cần hồ sơ hành vi, ý định đã biết, hậu quả thực, nạn nhân, người chứng kiến, diễn biến trễ; tách lợi ích trước mắt với nghiệp duyên dài hạn. |
| 8. Tách chính/tà và nhân quả | Hiện `karma` dùng cho thiện/ác, tuyển người tông môn, chọn thể chất và chọn Nghiệp Hỏa Kiếp. | Cần hai hệ độc lập **Hành Đạo** và **Nghiệp Duyên**, kèm uy tín từng phe. Mọi điều kiện dùng `karma` hiện tại đều phải phân loại lại trước khi triển khai. |
| 9. Dùng từ ngữ | Có hàm gọi `karma` bằng Đại thiện/Thiện/Ma đầu/Tà/Trung dung và một số chuyển số sang chữ. | Không chỉ thay nhãn: cần từ vựng riêng cho Hành Đạo, thiện duyên, nghiệp chướng; thống nhất màn nhân vật, lá số, sự kiện, thiên kiếp, kết kiếp, nhật ký và tooltip. |
| 10. Biến đổi theo năm | Khí vận/thể chất hiện chủ yếu cộng hiệu ứng tĩnh, hồi theo lượt hoặc tốc độ tu; chưa thấy bảng dữ liệu hiệu ứng theo năm của từng khí vận/thể chất. | Cần bản ghi hiệu ứng thường niên, điểm kích hoạt, trần, quy tắc cộng dồn, ngẫu nhiên có seed, xử lý bế quan nhiều năm và mô tả chữ không số. |
| 11. Tân thủ kiếp đầu | Có nhiệm vụ thường, dẫn đường, phần thưởng và hủy; nhiệm vụ thường có hạn và phạt. Chưa có tập nhiệm vụ tân thủ riêng theo luồng yêu cầu. | Cần danh mục nhiệm vụ tân thủ độc lập, tiến độ, điều hướng chức năng/NPC/modal, thưởng một lần, ẩn/hiện, bỏ qua có xác nhận, không hạn/không phạt và không hiện lại từ kiếp hai. |
| 12. U ám, luân hồi như mộng | Có nhiều chất liệu hợp giọng, có phi thăng và điển tích luân hồi. Mở đầu hiện có câu động viên trực diện, và nội dung mới có nhãn Hài hước/Lãng mạn/Cẩu huyết. | Cần bộ quy tắc giọng văn, kiểm duyệt từng sự kiện và nhịp cảm xúc. Không cần xóa mọi khoảnh khắc ấm áp; sự ấm áp cần làm mất mát và hy vọng có trọng lượng. |
| 13. Đại tuyến xuất thân nhưng tự do | Kho sự kiện bổ sung có chuỗi, giữ tên NPC trong chuỗi, nhánh chờ và kết thúc khi bỏ đi. Chưa gắn đại tuyến vào từng xuất thân. NPC/tông môn/địa điểm phần lớn sinh ngẫu nhiên. | Cần canon định danh, gắn vai kể chuyện với thực thể, thế giới tự diễn biến, nhánh bỏ/đổi phe/giết NPC/chậm tới, kế thừa thông tin và điều kiện kết cục độc lập tuyến chính. |

Nguồn trực tiếp cho các kết luận: [src/game/core/02-tin-don-giang-ho.js:32–57](/workspace/Sect/src/game/core/02-tin-don-giang-ho.js:32); [src/game/core/04-loi-tro-choi.js:146–175](/workspace/Sect/src/game/core/04-loi-tro-choi.js:146); [src/game/core2/12-dot-24-cac-loai.js:19–21,353,439–492](/workspace/Sect/src/game/core2/12-dot-24-cac-loai.js:19); [src/game/core/05-thoi-gian-the-gioi.js:58–81](/workspace/Sect/src/game/core/05-thoi-gian-the-gioi.js:58); [src/game/core/10-quan-ai.js:122–151](/workspace/Sect/src/game/core/10-quan-ai.js:122); [src/game/core2/03-cong-hien-tong-mon.js:17](/workspace/Sect/src/game/core2/03-cong-hien-tong-mon.js:17); [src/react/chung/TheNhiemVu.jsx:5–29](/workspace/Sect/src/react/chung/TheNhiemVu.jsx:5); [src/game/data/04-su-kien.js:3–36](/workspace/Sect/src/game/data/04-su-kien.js:3).

#### A.3. Danh mục xuất thân thực tế: bốn mươi lăm, không phải mười lăm

Mười lăm xuất thân gốc nằm trong [src/game/core/02-tin-don-giang-ho.js:41–57](/workspace/Sect/src/game/core/02-tin-don-giang-ho.js:41). Ba mươi xuất thân bổ sung nằm trong `CATALOG_DATA.origins`, được nối vào `ORIGIN` ở [src/game/data/02-catalog.js:77–82](/workspace/Sect/src/game/data/02-catalog.js:77). Chỉ viết mười lăm đại tuyến rồi tuyên bố đã phủ mọi xuất thân sẽ bỏ sót hai phần ba tập đang có.

| Mã hiện tại | Tên |
|---|---|
| nong | Con nhà nông |
| tran | Con nhà trận sư |
| dote | Con nhà đồ tể |
| thusinh | Thư sinh nghèo |
| khat | Tiểu khất cái |
| thegia | Con thứ thế gia |
| mieu | Đứa trẻ bị bỏ ở miếu |
| ren | Con nhà thợ rèn |
| daodong | Tiểu đạo đồng |
| linh | Cựu binh biên ải |
| buon | Con nhà buôn |
| chai | Con nhà chài lưới |
| duoc | Dược đồng |
| mahuyet | Mang huyết mạch ma tộc |
| hat | Con nhà gánh hát |
| xt_con_nha_va_luoi | Con nhà vá lưới |
| xt_tre_giu_ngua_tram | Trẻ giữ ngựa trạm |
| xt_nguoi_chep_so_thoc | Người chép sổ thóc |
| xt_con_nha_ham_than | Con nhà hầm than |
| xt_dua_tre_nhat_o_bac_cua | Đứa trẻ nhặt ở bậc cửa |
| xt_ke_tung_vac_bia | Kẻ từng vác bia |
| xt_con_nguoi_det_chieu | Con người dệt chiếu |
| xt_dong_tu_dun_tra | Đồng tử đun trà |
| xt_nguoi_giu_mieu_nho | Người giữ miếu nhỏ |
| xt_ke_bo_truong_thi | Kẻ bỏ trường thi |
| xt_con_nha_ganh_muoi | Con nhà gánh muối |
| xt_nguoi_hoc_khac_khuon | Người học khắc khuôn |
| xt_ke_cheo_do_ban_dem | Kẻ chèo đò ban đêm |
| xt_con_nha_boc_thuoc | Con nhà bốc thuốc |
| xt_dua_tre_lon_sau_bep | Đứa trẻ lớn sau bếp |
| xt_tho_cao_voi_tuong | Thợ cạo vôi tường |
| xt_nguoi_boi_giay_do | Người bồi giấy dó |
| xt_ke_tron_no_qua_deo | Kẻ trốn nợ qua đèo |
| xt_con_nha_nung_men | Con nhà nung men |
| xt_nguoi_lam_thue_o_mo | Người làm thuê ở mỏ |
| xt_ke_viet_thu_ho | Kẻ viết thư hộ |
| xt_hau_due_nguoi_coi_an | Hậu duệ người coi ấn |
| xt_nguoi_hoc_bo_xuong | Người học bó xương |
| xt_ke_lon_len_ben_vach_da | Kẻ lớn lên bên vách đá |
| xt_con_nha_giu_kho_duong | Con nhà giữ kho đường |
| xt_nguoi_bi_tra_ve_tu_bien_ai | Người bị trả về từ biên ải |
| xt_tre_an_duoi_san_dan | Trẻ ẩn dưới sàn đan |
| xt_ke_mang_tro_ve_que | Kẻ mang tro về quê |
| xt_nguoi_thua_ke_sap_bac | Người thừa kế sạp bạc |
| xt_nguoi_hoc_dao_sau_mua_lu | Người học đạo sau mùa lũ |

Tên xuất thân là tên dữ liệu hiện hữu; một số tên có thể cần biên tập sau này, nhưng tài liệu phân tích không được âm thầm đổi mã hoặc xóa xuất thân.

#### A.4. Kiểm kê dữ liệu đã có để không viết trùng

Đếm trực tiếp bản ghi trong [src/game/data/01-catalog-du-lieu.js](/workspace/Sect/src/game/data/01-catalog-du-lieu.js), không thực thi mã game:

| Nhóm bản ghi bổ sung | Số lượng |
|---|---:|
| Pháp bảo/trang bị | 814 |
| Nhóm tiền tố | 11 |
| Nhóm tên nền | 36 |
| Chiêu thức | 200 |
| Công pháp/tâm pháp | 304 |
| Đan dược | 190 |
| Phương tiện/tọa kỵ | 30 |
| Nguyên liệu | 203 |
| Yêu thú | 60 |
| Xuất thân | 30 |
| Vật nhiệm vụ | 81 |

Các số này là số bản ghi **trong danh mục bổ sung**, không phải tổng số thực thể hoạt động của toàn game; có dữ liệu gốc và cơ chế ghép, bỏ trùng, thay đổi sau khi nạp. Không thể dùng riêng bảng này để chứng nhận dữ liệu đủ cho hướng game mới. Tệp nguồn ghi rõ được sinh từ [docs/vat-pham.xlsx](/workspace/Sect/docs/vat-pham.xlsx); vì vậy sổ Excel và dữ liệu sinh cần được xem như hai mặt của cùng nguồn khi triển khai sau này.

Kho [src/game/data/03-su_kien-du-lieu.js](/workspace/Sect/src/game/data/03-su_kien-du-lieu.js) có **200 nút sự kiện**, thuộc **20 chuỗi có tên** cùng các sự kiện lẻ; không thấy điều kiện xuất thân trong tập bản ghi này. Có 19 nhãn cảm xúc: Bi thương, Bất an, Chua chát, Căng thẳng, Cảm động, Cẩu huyết, Day dứt, Dịu dàng, Hài hước, Hồi hộp, Kinh dị, Lãng mạn, Lắng dịu, Phẫn nộ, Trầm buồn, Trầm tĩnh, Uất ức, Xót xa, Ấm áp. Đây là chất liệu, chưa phải bốn mươi lăm cốt truyện đời người.

#### A.5. Những xung đột cần giải quyết trước khi triển khai

1. **Phàm nhân hiện tại chưa đồng nghĩa với vô căn.** [src/game/core2/10-pham-nhan-chua-dan.js:1–22](/workspace/Sect/src/game/core2/10-pham-nhan-chua-dan.js:1) coi phàm nhân là người chưa có linh lực và tìm tâm pháp để dẫn khí. Thậm chí có bảo đảm nhận tâm pháp sau thời gian dài. Đối với vô linh căn, bảo đảm này chỉ được mở hiểu biết hoặc công pháp, không được tự động biến thành khả năng tu luyện.
2. **Ký ức kiếp trước không thể thay linh căn.** Hiện có khắc tâm pháp vào chân linh ở [src/game/core2/10-pham-nhan-chua-dan.js:49–55](/workspace/Sect/src/game/core2/10-pham-nhan-chua-dan.js:49). Học lại được không đồng nghĩa vận hành được. Tương tự, chiêu không tốn linh lực nhưng có bản chất siêu phàm vẫn phải có điều kiện căn cơ.
3. **Luyện thể và luyện hồn cần phân đôi cấp độ.** Võ nghệ, dưỡng sinh, rèn sức bền, tập trung tinh thần có thể thuộc phàm nhân. Luyện thể siêu phàm, thần thức và luyện hồn khai mở đạo lực phải nằm sau cửa nhập đạo theo yêu cầu vô căn không thể tu. Nếu không tách, chỉ cần chọn môn khác là vô căn mất ý nghĩa.
4. **Khí vận ép căn có thể xóa sạch tỉ lệ vô căn.** Hiện có `TT_FORCE`, `ttShape` và khí vận ép Cực linh căn. Phân phối mới phải xét kết quả cuối cùng sau toàn bộ biến đổi, không chỉ bước rút đầu tiên; khí vận tạo căn phải có luật riêng, tránh vô tình vô hiệu hóa giới hạn kiếp đầu/kiếp sau.
5. **Nguồn gốc huyết mạch không được tự gán lỗi đạo đức.** Xuất thân ma huyết đang khởi đầu `karma:-10`, tâm ma và công; xuất thân miếu có `karma:5`. Khi tách Hành Đạo/Nghiệp Duyên, cần phân biệt kỳ thị xã hội, khí chất, di sản kiếp trước và hành vi thật của nhân vật; không coi sinh ra là đã làm ác.
6. **Nghiệp Hỏa hiện chưa chứng minh quy tắc phần thưởng mới.** Luật chọn kiếp đã dùng `karma` âm để đổi loại kiếp, nhưng chưa có bảng tăng thưởng căn cứ phần nghiệp chướng đã vượt và áp lực kiếp thực tế. Cần tránh thưởng hai lần hoặc tự gây nghiệp rồi tự xóa để lặp lấy chỉ số.
7. **Tăng trưởng theo năm phải xét mọi cách trôi thời gian.** Hiện có bước giờ/ngày và bước thô theo tháng tại [src/game/core/08-loi-kiep.js:213–255](/workspace/Sect/src/game/core/08-loi-kiep.js:213). Bế quan nhiều năm, ngủ dài, nhảy thời gian sau chết và tải bản lưu không được bỏ sót hoặc nhân đôi hiệu ứng tuổi. Bước thời gian sau khi nhân vật chết không được tăng chỉ số cho nhân vật mới chưa sinh.
8. **Nhiệm vụ tân thủ không được dùng luật phạt của nhiệm vụ thường.** [src/react/chung/TheNhiemVu.jsx:13–29](/workspace/Sect/src/react/chung/TheNhiemVu.jsx:13) hiển thị hạn và phạt; [src/game/core2/08-dot-13-tram-dich.js:37–39](/workspace/Sect/src/game/core2/08-dot-13-tram-dich.js:37) có mất linh thạch/nhân quả khi trả việc. Tân thủ phải có loại và trạng thái riêng để không dính các điều kiện này.
9. **Thế giới có seed nhưng thiếu danh tính canon.** [src/game/core/04-loi-tro-choi.js:72–92](/workspace/Sect/src/game/core/04-loi-tro-choi.js:72) ghép ngẫu nhiên tên tông môn, quốc gia, bảy đối thủ; [src/game/data/04-su-kien.js:7,25–30](/workspace/Sect/src/game/data/04-su-kien.js:7) giữ NPC trong từng chuỗi nhưng không thiết lập cast chung toàn game. Đại tuyến xuất thân cần ID bền, tránh nhầm hai NPC cùng tên, tránh thay người chỉ vì đổi địa điểm.
10. **Cơ chế bỏ chuỗi hiện là đóng chuỗi.** [src/game/data/04-su-kien.js:17,35–36](/workspace/Sect/src/game/data/04-su-kien.js:17) đánh dấu kết thúc khi bỏ đi. Hướng mới cần phân biệt từ chối, trì hoãn, rẽ hướng, đóng cơ hội và thế giới tự kết thúc. Nếu vẫn dùng chung một trạng thái “đã bỏ”, tự do người chơi chỉ là nút hủy truyện.
11. **Độ khó hiện tự điều chỉnh theo người chơi.** [src/game/core2/33-the-gioi-mo.js:5–10](/workspace/Sect/src/game/core2/33-the-gioi-mo.js:5) lấy mức địch theo cảnh giới, đôi khi lệch một bậc. Khi tăng tính khắc nghiệt, phải quyết định phần nào theo sinh thái địa phương, phần nào theo thế cục và phần nào theo nhiệm vụ; tránh mọi con thú đều lớn mạnh theo người chơi khiến thành tựu bị triệt tiêu.
12. **Tổng kết đời không được chỉ chấm lực chiến.** [src/game/core/10-quan-ai.js:122–130](/workspace/Sect/src/game/core/10-quan-ai.js:122) sẽ thúc người chơi bỏ nghề phàm nhân nếu giữ nguyên. Hướng mới phải ghi nhận tác động và ký ức, đồng thời không biến việc làm ác thành bất lợi tuyệt đối về phần thưởng hay quyền tiếp tục.

#### A.6. Quyết định tận dụng dữ liệu

Giữ tên Phù Sinh, năm đại khu, Bến Vong Xuyên, các điển tích đã có và Vạn Bảo Thương Hội. Giữ mã bốn mươi lăm xuất thân và danh mục vật phẩm để có đường đối chiếu. Tên địa điểm, thế lực và NPC mới trong đại tuyến là **canon thiết kế đề xuất**, không được mô tả như đã tồn tại trong dữ liệu hiện hành. Vật phẩm cũ chỉ được đưa vào thiết kế mới sau khi xác nhận nguồn nhận, mục đích tiêu thụ, giá trị kinh tế, cảnh giới sử dụng và đường tương tác với vô căn. Không suy ra “đủ nội dung” từ số lượng bản ghi lớn.

---

<a id="kiem-ke"></a>

### 15. Kiểm kê nội dung đã biên soạn và trạng thái kiểm định

Bảng này kiểm kê bản ghi đã xuất hiện thực trong tài liệu; số lượng không lấy từ một mục tiêu chưa viết. Các mã là định danh thiết kế để đối chiếu; không phải đoạn mã chương trình. Số liệu cân bằng là đề xuất, chưa là kết quả chơi thử.

| Khối | Nội dung có trong file | Trạng thái |
|---|---|---|
| Yêu cầu | Hai ma trận đối chiếu đủ 13 yêu cầu, quyết định và tiêu chí nghiệm thu | Đã biên soạn; nghiệm thu vận hành chưa chạy |
| Tham khảo | 12 hồ sơ R01–R12, gồm 9 truyện và 3 game; nguồn và giới hạn suy diễn | Đã tra nguồn, có bằng chứng tiếp nhận đến tháng 11/2026; không tuyên bố khảo sát toàn thị trường |
| Căn cơ | 8 trạng thái LC00–LC07; bảng sinh từ kiếp hai cộng 100%, bảng kiếp đầu điều kiện hóa khi có căn | Đã định nghĩa vô căn, tạp, tứ, tam, song, thiên, dị, cực; giữ các loại đang có |
| Cải căn | CC01–CC08, 23 vật tư CC-VT01–23, hai công thức dược phàm và dịch vụ hỗ trợ | Có nguồn, chứng cứ, thời gian, chi phí, thất bại, giới hạn và nhịp nguồn thế giới |
| Tiên thiên | TC01–TC18 và KV01–KV12 | Có tác động năm, trần, tác hại, ngủ yên, xử lý lịch, mô tả tooltip bằng chữ và bảng rút |
| Hành Đạo và Nghiệp Duyên | Phương pháp tính, bậc chữ, lợi/hại, sổ hành động, phân phối hoàn cảnh đời sau và quy tắc chuyển sổ | Tách danh tiếng, không dùng thiện duyên bù sạch tổn hại, không tính lặp nghiệp cũ |
| Thiên kiếp | TK01–TK06, 8 kiểu kiếp kế thừa cùng Tâm Ma, quy tắc gói thưởng và trợ kiếp | Có nhịp chiến đấu, phản ứng, thất bại, phần thưởng có trần và khóa lần nhận |
| Xuất thân | OR01–OR45, mỗi xuất thân 5 mốc và 3 kết | 225 mốc và 135 kết có điều kiện, đổi thế giới và dấu đời sau; giữ 15 xuất thân gốc và 30 bổ sung |
| Thế giới | 5 đại khu hiện hữu; LOC01–15, FA01–10, NP01–30 | Có địa lý, mục đích, lịch, tuổi/căn/nghề, nền giao tranh, tài lực và kế nhiệm |
| Thế cục | CLK01–CLK06, nguồn lực và quan hệ ngoại giao các phe | Có tự diễn biến, tác động khi không tham gia và giới hạn nguồn thực |
| Sự kiện | EV01–EV12, mỗi hồ sơ 3 lựa chọn | 36 lựa chọn có thông tin trước chọn, lợi/hại, hậu quả trễ, nhân chứng và xử lý NPC mất |
| Kết thúc | TRI01–03, END01–08, NG01–04 | Có cổng, lời kết, nguồn nghi thức, điểm chốt và đường tiếp khi thế giới không còn dân |
| Nghề phàm | PM01–PM18 | Có điều kiện, vòng sinh kế, tiền, thời gian, thể lực, rủi ro, tiến bộ và đích đời |
| Đường tu | TU01–TU16; CP01–CP16; SK01A–SK16C | 16 pháp môn, 48 chiêu có điều kiện, nguồn dạy, chi phí, hiệu quả, đối sách và lời ghi trận |
| Đồ và chế tạo đường tu | VT-TU01–VT-TU25; CT-TU01–CT-TU18 | Đủ sản phẩm cho các mốc nghề đã yêu cầu, có tồn, nguồn và cách mất/tiêu |
| Tân thủ | HD01–HD18; VT-HD01–VT-HD20; PF-HD01; CT-HD01–04 | Sáu bước nối tiếp, bốn nhóm ba; có thanh tiến độ, điều hướng, bỏ qua, ứng trước và khóa nhận trùng |
| Sinh hoạt và giao tranh | BT01–BT40; CR01–CR12; CH01–CH18; D01–D06; FO01–FO24 | Có sinh kế, chế tạo, trạng thái, thương bệnh và đối thủ; không chỉ một danh sách tên |
| Lưu và vận hành | Dữ liệu định nghĩa, thế giới, kiếp hiện tại, xuyên kiếp, trình bày, chuyển bản và bằng chứng cân bằng | Có trường, kiểu/đơn vị, quan hệ, ràng buộc và cách xử lý thiếu/hủy/chết |
| Dữ liệu kế thừa | Kiểm kê kho bổ sung, 45 mã xuất thân thật và những điểm mâu thuẫn của game hiện tại | Đã đối chiếu nguồn; không tự chứng nhận hàng nghìn bản ghi cũ đã chuyển nghĩa hoặc cân bằng |

Công việc của lượt này chỉ là tạo tài liệu. Không thay mã nguồn, sổ Excel, bản HTML, tài sản hay bản lưu; không build, chạy kiểm thử game hoặc máy tự chơi. Những phép kiểm được thực hiện trên tài liệu gồm đếm danh mục, đọc chéo quy tắc, rà bảng/đường dẫn/tham chiếu và đối chiếu nội dung với 13 yêu cầu.


