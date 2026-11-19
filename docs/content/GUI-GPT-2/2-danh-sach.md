# Danh sách cần viết (đợt hai) — kèm bối cảnh

Tệp này SINH TỪ MÃ GAME (đừng sửa tay). Mỗi mục: tên tệp phải tạo, mã, mô tả. Dòng có "(ĐÃ CÓ — mẫu)" là tệp mẫu Claude đã viết: không viết lại.

## A. Quả chín — `content/qua-chin/<mã>.json` (mỗi tệp ≥ 3 biến thể)

Hạt quả chín được gieo khi nhân vật làm việc dưới đây; 6–18 tháng sau "quả chín": hậu quả/ân báo của chính việc ấy quay lại. Thiện thì có ơn trả (không phải lúc nào cũng to), ác thì có báo (không phải lúc nào cũng là trả thù bằng máu).

| mã (tên tệp) | việc đã làm | thiện/ác | trạng thái |
|---|---|---|---|
| `cuu_nguoi` | Cứu người đang gặp nạn | thiện | ĐÃ CÓ — mẫu |
| `cuu_nguoi_hy_sinh` | Cứu người phải chịu thương nặng/mất của | thiện | cần viết |
| `bo_thi` | Bố thí người nghèo | thiện | cần viết |
| `tha_ke_ac` | Tha kẻ ác đầu hàng | thiện | cần viết |
| `giet_vo_toi` | Giết người vô tội | ác | cần viết |
| `diet_khau` | Giết người diệt khẩu | ác | cần viết |
| `giet_thu_cuu_sinh` | Giết thú đang hại sinh linh khác | thiện | cần viết |
| `phong_sinh` | Phóng sinh, thả thú bị nhốt | thiện | cần viết |
| `trom_ngheo` | Trộm của người nghèo | ác | cần viết |
| `bo_roi_gia_dinh` | Bỏ rơi gia đình | ác | cần viết |
| `tham_o` | Tham ô một vụ | ác | cần viết |
| `hanh_hiep` | Hành hiệp trượng nghĩa | thiện | cần viết |
| `diet_mon_ma` | Tham gia diệt môn ma tông | lẫn | cần viết |
| `pha_phong_an` | Phá phong ấn thả yêu ma | ác | cần viết |
| `dao_mo` | Đào mộ lấy của | ác | cần viết |
| `an_tang` | An táng người chết bên đường | thiện | cần viết |
| `ban_dong_doi` | Bỏ đồng đội bị thương giữa hiểm cảnh | ác | cần viết |

## B. Nghề phàm — `content/nghe-pham/<mã>.json` (4 kết; "len" nếu nghề chưa có lời thăng bậc)

Bậc đánh số từ 0 (bậc đầu). `len[0]` là lúc lên bậc 1, `len[i]` lúc lên bậc i+1. Kết cục hiện ở màn hết kiếp cho nghề chính (bậc cao nhất).

| mã | nghề | các bậc (0 → cuối) | cần viết |
|---|---|---|---|
| `nong` | Nông dân | 0 Làm thuê · 1 Tá điền · 2 Tiểu nông · 3 Trung nông · 4 Phú nông · 5 Địa chủ | ĐÃ CÓ — mẫu (chỉ ket) |
| `ngu` | Ngư dân | 0 Phụ chài · 1 Ngư phủ · 2 Chủ thuyền · 3 Chủ ghe lớn · 4 Chủ vạn chài · 5 Hải thương | chỉ "ket" (đã có lời thăng bậc) |
| `thuong` | Thương nhân | 0 Gánh hàng rong · 1 Tiểu thương · 2 Chủ cửa hiệu · 3 Buôn đường dài · 4 Chủ thương hội · 5 Phú giáp một châu | chỉ "ket" (đã có lời thăng bậc) |
| `vo_gia` | Chiến binh giang hồ | 0 Vô danh · 1 Có chút tiếng · 2 Hảo hán một vùng · 3 Danh hiệp · 4 Đại hiệp · 5 Võ lâm minh chủ | chỉ "ket" (đã có lời thăng bậc) |
| `y` | Y sư phàm | 0 Học trò bốc thuốc · 1 Lang băm · 2 Lang trung · 3 Danh y một vùng · 4 Ngự y · 5 Thần y | chỉ "ket" (đã có lời thăng bậc) |
| `tieu` | Tiều phu | 0 Đốn củi thuê · 1 Tiều phu · 2 Thợ đốn gỗ · 3 Đầu nậu gỗ · 4 Chủ xưởng gỗ · 5 Chủ rừng | "len" (5 đoạn) + "ket" |
| `mo` | Thợ mỏ | 0 Phu gùi quặng · 1 Thợ đào · 2 Thợ cả · 3 Cai mỏ · 4 Chủ lò quặng · 5 Chủ mỏ | "len" (5 đoạn) + "ket" |
| `ren` | Thợ rèn | 0 Kéo bễ · 1 Thợ phụ · 2 Thợ cả · 3 Chủ lò · 4 Danh tượng · 5 Đại tượng | "len" (5 đoạn) + "ket" |
| `tho` | Thợ thủ công | 0 Học việc · 1 Thợ phụ · 2 Thợ cả · 3 Chủ xưởng · 4 Danh tượng · 5 Đại tượng | "len" (5 đoạn) + "ket" |
| `chep` | Người chép sách | 0 Học trò · 1 Đồng sinh · 2 Tú tài · 3 Cử nhân · 4 Tiến sĩ · 5 Đại nho | "len" (5 đoạn) + "ket" |
| `tram` | Phu trạm | 0 Giữ ngựa · 1 Phu trạm · 2 Lính trạm · 3 Trạm trưởng · 4 Đốc trạm · 5 Quản đường thư | "len" (5 đoạn) + "ket" |
| `binh` | Binh lính | 0 Lính trơn · 1 Ngũ trưởng · 2 Thập trưởng · 3 Bách hộ · 4 Thiên hộ · 5 Tướng quân · 6 Đại tướng quân | "len" (6 đoạn) + "ket" |
| `sat` | Sát thủ phàm | 0 Tay mới · 1 Đồng bài · 2 Ngân bài · 3 Kim bài · 4 Huyết bài · 5 Lâu chủ | "len" (5 đoạn) + "ket" |
| `trom` | Đạo chích | 0 Móc túi · 1 Trộm vặt · 2 Phi tặc · 3 Đạo vương một thành · 4 Đại đạo · 5 Bang chủ hắc đạo | "len" (5 đoạn) + "ket" |
| `hat` | Nghệ nhân gánh hát | 0 Học trò · 1 Đào kép · 2 Kép chính · 3 Bầu gánh · 4 Danh kỹ một châu · 5 Đại gia lừng danh | "len" (5 đoạn) + "ket" |
| `quan` | Quan viên | 0 Thư lại · 1 Huyện thừa · 2 Huyện lệnh · 3 Tri phủ · 4 Thứ sử · 5 Thượng thư · 6 Tể tướng | "len" (6 đoạn) + "ket" |
| `do` | Người chèo đò | 0 Phụ đò · 1 Lái đò · 2 Chủ đò · 3 Chủ bến · 4 Đầu bến · 5 Thủy bá | "len" (5 đoạn) + "ket" |
| `chuong` | Chưởng môn võ phái | 0 Võ quán · 1 Tiểu phái · 2 Môn phái một huyện · 3 Danh môn một châu · 4 Đại phái giang hồ · 5 Thái Sơn Bắc Đẩu | "len" (5 đoạn) + "ket" |
| `san` | Thợ săn | 0 Đặt bẫy · 1 Thợ săn · 2 Thợ săn giỏi · 3 Đầu phường săn · 4 Săn yêu nhân · 5 Thần tiễn | "len" (5 đoạn) + "ket" |
| `tieu_su` | Tiêu sư | 0 Tiêu đồng · 1 Tiêu sư · 2 Tiêu đầu · 3 Phó tổng tiêu đầu · 4 Tổng tiêu đầu · 5 Chủ tiêu cục | "len" (5 đoạn) + "ket" |
| `khat_cai` | Khất cái | 0 Ăn mày · 1 Có địa bàn · 2 Đầu đàn · 3 Trưởng lão Cái bang một thành · 4 Đà chủ · 5 Bang chủ Cái bang | "len" (5 đoạn) + "ket" |

Việc lặp của từng nghề (để biết nghề làm gì, ở đâu):

- **nong** (Nông dân): Gieo mạ; Chăm ruộng, tát nước; Gặt lúa; Đan lát mùa nông nhàn; Đem thóc ra chợ bán
- **ngu** (Ngư dân): Ngồi câu cá; Vá lưới thuê; Thả lưới; Đem cá ra chợ; Ra khơi ba ngày
- **thuong** (Thương nhân): Gánh hàng rong; Mua rẻ bán đắt ở chợ; Trông cửa hiệu; Theo thương đội buôn xa (mười ngày)
- **vo_gia** (Chiến binh giang hồ): Giữ cửa, bảo kê quán; Nhận hộ tống người đi đường (một ngày); Đi tuần quanh vùng, giúp người bị ức hiếp; Dạy võ cho trai làng — cần võ học
- **y** (Y sư phàm): Bốc thuốc ở hiệu; Vào rừng hái thuốc; Khám bệnh, bắt mạch; Bó xương, khâu vết thương; Vào làng có dịch chữa bệnh (ba ngày)
- **tieu** (Tiều phu): Vào rừng đốn củi; Gánh củi ra chợ bán; Đốn gỗ lớn cho xưởng; Đi sâu vào rừng tìm gỗ quý (một ngày)
- **mo** (Thợ mỏ): Gùi quặng ra cửa hầm; Xuống hầm đào quặng; Dò mạch quặng mới; Coi một ca thợ dưới hầm
- **ren** (Thợ rèn): Kéo bễ ở lò rèn; Rèn dao cuốc, lưỡi cày; Rèn binh khí theo đơn; Nhận đơn lớn của tiêu cục (một ngày)
- **tho** (Thợ thủ công): Làm hàng ở xưởng (mộc, gốm, dệt); Bày hàng ra chợ; Nhận đơn hàng của phủ nhà giàu; Dạy nghề cho học trò
- **chep** (Người chép sách): Chép sách thuê; Viết thư hộ ở đầu chợ; Dạy chữ cho trẻ trong làng; Đối câu, bình văn ở trà lâu; Soạn sách cho thư phòng nhà quan
- **tram** (Phu trạm): Cho ngựa trạm ăn, chải lông; Đưa thư sang trạm kế (một ngày); Chạy công văn hỏa tốc (hai ngày); Coi sổ sách một trạm
- **binh** (Binh lính): Luyện binh ở doanh trại; Tuần thủ cổng thành, đường làng; Theo đội đi truy cướp (một ngày); Xuất chinh biên ải (mười ngày)
- **sat** (Sát thủ phàm): Theo dõi một người theo lời thuê; Điều tra mục tiêu, xem người ấy thật sự ra sao; Xoá dấu vết cho kẻ thuê — cần võ học
- **trom** (Đạo chích): Móc túi giữa chợ đông; Đêm xuống, lẻn vào nhà phú hộ; Tiêu thụ đồ gian cho người quen
- **hat** (Nghệ nhân gánh hát): Tập tuồng với gánh; Diễn ở sân chợ; Theo gánh đi lưu diễn (ba ngày); Diễn cho phủ quan
- **quan** (Quan viên): Chép án, giữ sổ ở nha môn; Về làng thu thuế; Ngồi công đường xử án; Mở kho cứu tế dân đói (một ngày); Soạn sớ dâng lên triều
- **do** (Người chèo đò): Chèo đò chở khách qua sông; Trét lại mạn thuyền; Canh bến mùa nước lớn, vớt người; Chở hàng xuôi dòng (một ngày)
- **chuong** (Chưởng môn võ phái): Mở cửa võ quán nhận đồ đệ; Dạy võ cho đồ đệ; Nhận bảo kê một con phố (một ngày); Mở chi nhánh ở huyện bên (ba ngày) — cần võ học
- **san** (Thợ săn): Đặt bẫy thú nhỏ; Lột da, xẻ thịt đem bán; Đi săn thú lớn; Dẫn đường rừng cho khách (một ngày); Săn yêu thú cấp thấp (hai ngày)
- **tieu_su** (Tiêu sư): Thám đường trước cho đoàn tiêu; Áp tiêu qua núi (ba ngày); Lên sơn trại kết giao, nộp lễ qua đường; Ngồi ghế tổng tiêu, chia đoàn — cần võ học
- **khat_cai** (Khất cái): Ngồi đầu chợ, cửa chùa xin ăn; Lân la nghe ngóng chuyện trong thành; Đưa tin thuê; Giữ địa bàn, chia phần cho anh em

## C. Cải căn dọc đường — `content/cai-can/<mã đường>.json` (ít nhất một sự kiện cho MỖI bước được liệt kê)

Người vô căn (hoặc tu sĩ muốn nâng căn) theo một "đường" nhiều bước. Sự kiện dọc đường hiện khi người chơi vừa bước vào bước đó. Bước nghi thức cuối không viết (đã có). `buoc` = số đứng đầu mỗi dòng.

### CC01 — Tái Mạch Đan (ĐÃ CÓ — mẫu)
- Nơi: {LOC10} · dành cho: người vô căn (phàm nhân)
- Lời đồn: Người ta kể dược viện ở (nơi) giữ một lò đan hai mươi năm mới ra một viên Tái Mạch Đan. Không bán, chỉ trao cho người chịu ở lại cứu dịch.
  - **0** kiểm chứng đầu mối: Xin xem bản bào chế có dấu dược viện / Tìm người từng dùng đan còn sống, đối chiếu bệnh án — bẫy: Mua bao đan của kẻ rao ngoài chợ
  - **1** phục vụ / khổ luyện nhiều tháng: Phục vụ dược viện, theo đoàn cứu dịch
  - **2** có người tranh giành: Một công tử nhà giàu đem lễ tới xin viện chủ nhường viên đan, nói sẵn lòng trả gấp mười. Lựa chọn: Kể với viện chủ mười tám tháng mình đã làm / Góp thêm tiền thuốc cho viện để giữ suất / Thôi, nhường cho hắn
  - **3** gom vật tư: vật tư: ho_mach_tan
  - ~~**4** nghi thức (không viết): Uống Tái Mạch Đan, bảy ngày tĩnh dưỡng~~

### CC02 — Địa Mạch Linh Tủy 
- Nơi: {LOC11} · dành cho: người vô căn (phàm nhân)
- Lời đồn: Phường thợ mỏ ở (nơi) truyền tai nhau: trong mỏ bỏ có một hốc tủy, một trăm hai mươi năm mới tụ đủ một ống Địa Mạch Linh Tủy.
  - **0** kiểm chứng đầu mối: Mua lại bản đo vỉa cũ của lão thợ mỏ / Thử đá dẫn mạch bằng dụng cụ của phường — bẫy: Mua quặng phát quang của tay buôn
  - **1** gom vật tư: vật tư: bo_chong_sap, doi_mo
  - **2** có người tranh giành: Một toán đào mỏ lậu cũng đánh hơi được hốc tủy, kéo tới cửa mỏ. Lựa chọn: Chia cho chúng một phần quặng thường đào được / Cùng đội thợ chặn cửa mỏ / Để chúng vào trước
  - **3** phục vụ / khổ luyện nhiều tháng: Thăm dò lòng mỏ, chống sập từng đoạn
  - ~~**4** nghi thức (không viết): Niêm ống tủy, uống trong bảy ngày~~

### CC03 — Ngũ Hành Dưỡng Căn Pháp 
- Nơi: {LOC01} · dành cho: người vô căn (phàm nhân)
- Lời đồn: Ở (nơi) có gia phả ghi một pháp dưỡng căn: năm năm nuôi năm vị vật liệu trong một khu vườn, không cần một chút linh lực nào.
  - **0** kiểm chứng đầu mối: Đối chiếu bản khuyết với bia mộ tổ / Thử năm vật liệu theo quyển kiểm dược — bẫy: Mua bản chép "Dưỡng Căn Pháp" của thầy đồ dạo
  - **1** có người tranh giành: Địa chủ trong vùng đang đòi khu vườn cũ để làm ruộng, dân thôn không ai dám cãi. Lựa chọn: Thương lượng, xin thôn giữ vườn / Bỏ tiền chuộc lại quyền dùng vườn / Bỏ khu vườn cho địa chủ
  - **2** phục vụ / khổ luyện nhiều tháng: Sửa kênh, chăm vườn công cho thôn
  - **3** gom vật tư: vật tư: kim_sa, moc_tam, thuy_chau, hoa_nham, tho_tuy
  - **4** nuôi trồng nhiều năm: Về chăm vườn dưỡng căn
  - ~~**5** nghi thức (không viết): Thu vườn, theo pháp mà dưỡng căn ba ngày~~

### CC04 — Hóa Sinh Liên 
- Nơi: {LOC09} · dành cho: người vô căn (phàm nhân)
- Lời đồn: Người ven nước ở (nơi) canh một hồ cổ. Sổ thuế nước ghi ba mươi năm hồ nở một đài Hóa Sinh Liên.
  - **0** kiểm chứng đầu mối: Xin xem hạt sen lưu trong nhà tổ / Tra lịch nở ghi trong sổ thuế nước — bẫy: Mua bông sen "đổi màu dưới đèn" của tay buôn
  - **1** có người tranh giành: Thượng nguồn có người đắp đập, hồ cạn dần. Người giữ hồ nói: ai cứu được hồ thì xin hái đài sen. Lựa chọn: Cùng dân ven nước phá đập, khơi lại dòng / Mua quyền thu hái / Chiếm lấy hồ, đuổi người giữ đi / Rời đi
  - **2** phục vụ / khổ luyện nhiều tháng: Phục vụ hồ, học cách giữ sen
  - ~~**3** nghi thức (không viết): Hái đài sen, ba mươi ngày luyện hóa~~

### CC05 — Tàn Hỏa Chủng 
- Nơi: {LOC11} · dành cho: người vô căn (phàm nhân)
- Lời đồn: Thợ rèn già ở (nơi) kể về một tàn lò bỏ hoang, đáy lò còn giữ hạt lửa cuối cùng của cả thiên hạ.
  - **0** gom vật tư: vật tư: bo_cach_nhiet
  - **1** kiểm chứng đầu mối: Đọc mảnh lò và nhật ký tôi / Thử cùng cát cách nhiệt — bẫy: Mua "hỏa chủng" của thương lái (tro nguội)
  - **2** có người tranh giành: Một kẻ đã lấy trộm bản đồ tàn lò, đang rao bán cho người trả cao nhất. Lựa chọn: Mang thư của thợ già tới phường rèn, xin người làm chứng / Mua lại bản đồ / Cướp lại bản đồ / Thôi, không theo nữa
  - **3** gom vật tư: vật tư: ho_tam_cao, giu_lua
  - ~~**4** nghi thức (không viết): Khai hỏa chủng, một đêm giữ lửa~~

### CC06 — Huyết Mạch Khế 
- Nơi: {LOC08} · dành cho: người vô căn (phàm nhân)
- Lời đồn: Ở (nơi) có người làm khế giữa người và linh thú. Thú ký khế thì chia cho chủ một phần huyết mạch.
  - **0** kiểm chứng đầu mối: Nhờ người biết chữ và người hiểu thú đối chứng khế / Thử huyết dịch tương thích — bẫy: Mua tờ khế viết sẵn của kẻ lạ
  - **1** có người tranh giành: Con linh thú hợp huyết với ngươi đang bị thương, nằm trong chuồng của người khác. Lựa chọn: Chăm nó cho tới khi nó tự nguyện / Ép nó ký khế / Để nó yên
  - **2** gom vật tư: vật tư: khe_huyet
  - ~~**3** nghi thức (không viết): Ký khế, nhường một phần năm thọ nguyên còn lại~~

### CC07 — Vay Căn Nghịch Mệnh 
- Nơi: {LOC07} · dành cho: người vô căn (phàm nhân)
- Lời đồn: Có lời thì thầm: ở (nơi) có y quán bí mật cấy linh căn của người này sang người khác.
  - **0** kiểm chứng đầu mối: Gặp tận mặt người cho / Đối chiếu hồ sơ mạch và lời xác nhận — bẫy: Mua hộp gỗ ghi "linh căn"
  - **1** có người tranh giành: Người có căn sắp chết vì bệnh. Người nhà còn do dự, còn y quán thì có "hàng" khác rẻ hơn. Lựa chọn: Chăm người cho tới lúc họ tự nguyện hiến / Mua căn từ y quán, không hỏi nguồn / Giết người có căn mà lấy / Bỏ đi
  - **2** gom vật tư: vật tư: ho_mach_tan, bo_cay_can, thay_cay
  - ~~**3** nghi thức (không viết): Cấy căn, ba trăm sáu mươi ngày tịnh dưỡng~~

### CC08 — Tinh Hồn Kết Căn 
- Nơi: {LOC05} · dành cho: người vô căn (phàm nhân)
- Lời đồn: Người giữ thiên tượng ở (nơi) kể có ba mảnh sao cùng rơi một năm. Đủ ba mảnh, trận pháp có thể kết thành căn.
  - **0** kiểm chứng đầu mối: Đối chiếu bản sao thiên tượng với ngày rơi / Thử mẫu cộng hưởng — bẫy: Mua "mảnh sao" của người giữ trận khác
  - **1** gom vật tư: vật tư: sao_ha, sao_trung, sao_thuong
  - **2** phục vụ / khổ luyện nhiều tháng: Nghiên cứu trận, khảo sao
  - ~~**3** nghi thức (không viết): Vận trận kết căn, hy sinh một ký ức kỹ năng~~

### TAY_TUY — Tẩy Tủy Phạt Mạch Kinh 
- Nơi: {LOC12} · dành cho: người vô căn (phàm nhân)
- Lời đồn: Võ phái ẩn ở (nơi) còn giữ quyển Tẩy Tủy Phạt Mạch Kinh. Ba năm khổ luyện, đánh vỡ mạch tắc mà mở căn.
  - **0** kiểm chứng đầu mối: Hỏi hai võ sư từng thấy người luyện thành — bẫy: Mua bản kinh chép tay ở chợ
  - **1** phục vụ / khổ luyện nhiều tháng: Khổ luyện Tẩy Tủy Kinh
  - ~~**2** nghi thức (không viết): Phạt mạch lần cuối~~

### QUAN_DINH — Tiên nhân quán đỉnh 
- Nơi: {LOC04} · dành cho: người vô căn (phàm nhân)
- Lời đồn: Tiều phu ở (nơi) gặp một lão tu sĩ hấp hối trong hang, lão hỏi có ai không có căn mà muốn nhận di nguyện.
  - **0** kiểm chứng đầu mối: Lần theo lời tiều phu tìm hang / Hỏi người làng xem lão là ai — bẫy: Trả tiền cho kẻ tự xưng là đệ tử của lão
  - **1** phục vụ / khổ luyện nhiều tháng: Chăm lão tu sĩ những ngày cuối
  - ~~**2** nghi thức (không viết): Nhận quán đỉnh, mang theo di nguyện~~

### HUYET_TE — Huyết Tế Khai Mạch 
- Nơi: {LOC07} · dành cho: người vô căn (phàm nhân)
- Lời đồn: Ở (nơi) có kẻ truyền phép huyết tế: lấy máu người sống mở mạch cho kẻ không căn.
  - **0** kiểm chứng đầu mối: Xem bản huyết kinh và người đã khai mạch
  - ~~**1** nghi thức (không viết): Làm lễ huyết tế~~

### LINH_CO — Linh Căn Cổ 
- Nơi: {LOC09} · dành cho: người vô căn (phàm nhân)
- Lời đồn: Cổ sư ở (nơi) nuôi một loài cổ sống trong kinh mạch, thay người ta làm linh căn. Đổi lại, phải nuôi nó đến hết đời.
  - **0** kiểm chứng đầu mối: Gặp người đang mang cổ / Xem cổ sư thử cổ trên lá — bẫy: Mua "cổ" đựng trong ống tre ở chợ
  - **1** gom vật tư: vật tư: co_trung
  - ~~**2** nghi thức (không viết): Thả cổ vào kinh mạch~~

### THIEN_LOI — Thiên Lôi Quán Thể 
- Nơi: {LOC14} · dành cho: người vô căn (phàm nhân)
- Lời đồn: Người ta đồn trên đỉnh núi ở (nơi), mùa hạ giông nhiều, có kẻ không căn đứng chịu sét mà thành Lôi căn. Phần lớn thì chết.
  - **0** kiểm chứng đầu mối: Tìm vết sét đánh và người còn sống
  - ~~**1** nghi thức (không viết): Đứng trên đỉnh núi giữa giông~~

### XA_LOI — Phật môn Xá Lợi 
- Nơi: {LOC12} · dành cho: người vô căn (phàm nhân)
- Lời đồn: Chùa (nơi) giữ một viên xá lợi. Ai giữ giới năm năm ở chùa thì được ngồi dưới xá lợi một đêm.
  - **0** kiểm chứng đầu mối: Hỏi sư già trong chùa
  - **1** phục vụ / khổ luyện nhiều tháng: Giữ giới, làm việc chùa
  - ~~**2** nghi thức (không viết): Ngồi dưới xá lợi một đêm~~

### TUC_CAN — Túc căn kiếp trước 
- Nơi: tuỳ · dành cho: tuc
- Lời đồn: Có đêm ngươi mơ thấy (nơi), dưới một gốc cây có thứ của mình chôn từ rất lâu.
  - **0** kiểm chứng đầu mối: Đào đúng chỗ trong giấc mơ
  - ~~**1** nghi thức (không viết): Cầm lại vật bản mệnh~~

### DUOC_NHAN — Làm dược nhân 
- Nơi: {LOC07} · dành cho: người vô căn (phàm nhân)
- Lời đồn: Ma tông ở (nơi) tìm người không căn thử thuốc. Họ hứa: mười người, có một người ra có căn.
  - **0** kiểm chứng đầu mối: Tìm người từng làm dược nhân trở về
  - ~~**1** nghi thức (không viết): Nằm lên giường thử thuốc~~

### TAO_HOA — Tạo Hóa Thần Dịch 
- Nơi: {LOC15} · dành cho: nang
- Lời đồn: Tin từ (nơi): di tích trên thiên lộ còn một giọt Tạo Hóa Thần Dịch, chỉ nâng căn sẵn có, không cho kẻ không căn.
  - **0** kiểm chứng đầu mối: Dò lối vào di tích / Đọc bia ghi cách dùng
  - **1** có người tranh giành: Một tu sĩ khác cũng tìm tới, muốn chia đôi. Lựa chọn: Trả hắn để hắn rút / Đấu một trận / Nhường hắn
  - **2** gom vật tư: vật tư: tao_hoa_dich
  - ~~**3** nghi thức (không viết): Uống Tạo Hóa Thần Dịch~~

## D. Cảnh kể — `content/canh/…` (mỗi khoá ≥ 3 biến thể)

- `content/canh/quan-phu.json` (ĐÃ CÓ — mẫu): heo1 (lần đầu đánh hai mươi hèo vì quỵt nợ), heo2 (lần hai, bốn mươi hèo, gãy xương), truyNa (quan phủ dán cáo thị truy nã), lamCong (bị bắt làm công trả nợ hai–ba năm), raTu (ngày được thả, nợ đã xoá).
- `content/canh/truy-duoi.json` (cần viết): kẻ đang truy đuổi đuổi kịp, chặn trước mặt. Gọi tên kẻ đuổi bằng `{ke}`. Game tự nối thêm câu "dừng chân giữa đường" / "thần thức báo trước" nên KHÔNG viết những câu đó. Lựa chọn (đánh/chạy/nộp/thương lượng) do game thêm — chỉ viết đoạn kể.

| khoá | kẻ đuổi | khi nào bám theo | lựa chọn game thêm |
|---|---|---|---|
| `thu` | yêu thú (dã thú, thú tu luyện) | ngươi chạy thoát khỏi trận | đánh, chạy |
| `tac` | sơn tặc | ngươi chạy thoát khỏi trận | đánh, chạy, nộp của, thương lượng |
| `tu` | tu sĩ, tán tu, ma tu | ngươi chạy thoát khỏi trận | đánh, chạy, thương lượng |
| `ke` | kẻ thù kiếp trước / kẻ truy sát | ngươi chạy thoát khỏi trận | đánh, chạy, thương lượng |
| `quy` | quỷ vật | ngươi chạy thoát khỏi trận | đánh, chạy |
| `no` | sai dịch quan phủ đòi nợ | bị truy nã vì nợ | đánh, chạy, nộp của, thương lượng |
| `cuop` | người bị ngươi cướp | ngươi chạy thoát khỏi trận | đánh, chạy, nộp của, thương lượng |

## E. BẢNG MÃ được phép dùng

Trong lời văn, **không ghi thẳng tên** người/nơi/thế lực; dùng chỗ thay sau, game điền tên đúng lúc chơi:

| Viết | Game điền |
|---|---|
| `{ten}` | Tên nhân vật người chơi. |
| `{que}` | Quê người chơi. |
| `{NP01}` | Tên **người đang giữ vai** NP01 (sau trăm năm có thể là con cháu/học trò). Nếu vai trống: "người từng là …". |
| `{NP01.vai}` | Tên vai: "đại diện hộ nông". |
| `{NP01.noi}` | Nơi người giữ vai ở. |
| `{LOC01}` | Tên hiện tại của nơi neo trên bản đồ. |
| `{FA02}` | Tên thế lực. |

Chỉ những chỗ thay trên. Viết khác (ví dụ `{NP01.ten}`, `{thay}`) là lỗi.

### E.1 Nơi neo LOC

| Mã | Tên lúc đầu | Đại khu | Thế lực | Công dụng | Khi bị phá |
|---|---|---|---|---|---|
| LOC01 | Thanh Khê Thôn | Trung Châu | FA04 | Ruộng, nhà hộ dân, đê, kho thóc, chợ. | trại tị nạn → di tích |
| LOC02 | Lương Kinh | Trung Châu | FA01 | Triều đình, trường thi, ngục, sổ thuế, sân khấu. | kinh thành đổi chủ → kinh thành dưới luật mới |
| LOC03 | Vạn Bảo Hội Quán | Trung Châu | FA02 | Hợp đồng, thương đội, bảo quản, đấu giá. | hội quán cháy, sổ nợ còn bản sao trong thương đội → nền hội quán cũ |
| LOC04 | Cổ Miếu Vô Danh | Đông Hoang | — | Trú ẩn, bia tên người mất, dấu mộng. | miếu đổ, bia vỡ còn mảnh chữ đọc được → nền miếu giữa cỏ |
| LOC05 | Huyền Cơ Trận Các | Đông Hoang | FA03 | Trận đồ, trục quan trắc, hồ sơ Ngũ Tổ. | các sụp, còn phòng lõi nguy hiểm có thể khảo sát → phòng lõi giữa đá đổ |
| LOC06 | Đoạn Tùng Lâm | Đông Hoang | — | Gỗ, dược phàm, thú, đất chôn. | rừng cháy, lộ nền đá cổ → rừng non mọc trên nền đá cổ |
| LOC07 | Huyết Sát Cốc | Nam Trạch | FA05 | Huyết tộc, huyết trì, pháp ước, tranh quyền. | cốc vắng, còn ấn và hồ sơ bị nguyền → huyết trì khô |
| LOC08 | Vạn Thú Môn | Nam Trạch | FA06 | Chuồng thú, trại cứu thương, sổ khế ước, cửa gọi linh. | chuồng bỏ ngỏ, thú thả ra thành bầy thật → trại cũ giữa bầy thú |
| LOC09 | Tịch Chiếu Bến | Nam Trạch | — | Đò, lưới, chợ nước, sân hát, xác tàu. | lũ đổi lối vào, lời khai nằm trên bảng khắc thuyền → bến mới bên dòng cũ |
| LOC10 | Bách Thảo Cốc | Tây Lĩnh | FA07 | Ruộng thuốc, bệnh xá, hồ sơ dịch, bàn luyện đan. | vườn bị đốt, hạt giống còn trong kho lạnh → vườn mọc lại từ kho lạnh |
| LOC11 | Hàn Thiết Lô | Tây Lĩnh | FA08 | Mỏ, lò, xưởng giấy và khuôn. | mỏ đóng, còn đường hầm, bảng công và lô kim loại cuối → đường hầm bỏ hoang |
| LOC12 | Lạn Kha Tự | Tây Lĩnh | FA09 | Thư khố, nhà tạm trú, tháp tro, văn bia. | chùa đổ, văn bản tản mát ở người hành hương → tháp tro còn đứng |
| LOC13 | Bắc Phong Ải | Bắc Nhạc | FA10 | Quân doanh, trường luyện, trạm ngựa, kho. | ải thất thủ thành chiến địa, tuyến tiếp tế lưu vong → chiến địa cũ |
| LOC14 | Táng Cốt Nguyên | Bắc Nhạc | — | Mồ tập thể, bia trận vong, trại người trở về, xưởng dựng bia. | trại bỏ hoang, dấu linh hồn còn đọc được → đồng mộ không người |
| LOC15 | Hồi Thanh Đài | Bắc Nhạc | — | Điểm nghe ký ức, quan trắc Đêm Dài và cửa kết thúc. | nền đá nứt, lõi đài còn nghe được → nền đá |

### E.2 Vai NPC (NP)

Cột "Tên lúc đầu" để bạn hiểu nhân vật; **trong văn luôn viết `{NPxx}`**. Cột "Vật chứng thay" là thứ còn lại khi vai trống — dùng để viết `thayThe`.

| Mã | Tên lúc đầu | Vai | Nơi | Thế lực | Cảnh giới | Mục tiêu | Vật chứng thay |
|---|---|---|---|---|---|---|---|
| NP01 | Lý Thổ | đại diện hộ nông (đứng đầu) | LOC01 | FA04 | phàm | Giữ đê và đất | sổ hộ và bia người giữ giống |
| NP02 | Mộc Nghi | dân binh | LOC01 | FA04 | phàm | Đưa quân dịch trở về | danh sách quân dịch ở trạm |
| NP03 | Tạ Văn Kính | thư lại | LOC02 | FA01 | phàm | Sửa sổ thuế nhưng sợ mất chức | bản sổ thuế có nét sửa |
| NP04 | Lương Hạo | quân chủ (đứng đầu) | LOC02 | FA01 | phàm | Giữ ngôi, sợ tên mình thành tên cuối sử | chiếu chỉ và ấn triều |
| NP05 | Thẩm Cửu | chưởng quỹ (đứng đầu) | LOC03 | FA02 | phàm | Giữ chữ tín có lợi cho hội | sổ nợ bản sao trong thương đội |
| NP06 | Lạc Tín | người dẫn thương đội | LOC03 | FA02 | phàm | Chuộc người nhà bị cầm cố | khế cầm cố người nhà |
| NP07 | Vô Đăng | người giữ miếu | LOC04 | — | phàm | Giữ danh tính người bị xóa | bia tên người mất trong miếu |
| NP08 | Mạc Liên | người dò phả hệ | LOC04 | — | phàm | Tìm tên mẹ mình | tập chép bia |
| NP09 | Hứa Triều | trận sư (đứng đầu) | LOC05 | FA03 | Kết Đan | Giữ trận dù biết nó có nợ | trận đồ ở phòng lõi |
| NP10 | Diệp Vân | học đồ trận | LOC05 | FA03 | Luyện Khí | Công khai bảng người bị hiến | bản sao bảng người bị hiến |
| NP11 | Đỗ Lộc | tiều phu | LOC06 | FA04 | phàm | Nuôi con và không bán hết rừng | dấu khắc trên cây mẹ |
| NP12 | Dã Tâm | sứ thú của Yêu Hoàng | LOC06 | — | Nguyên Anh | Lập lại hiệp ước sinh cảnh | hiệp ước sinh cảnh khắc trên đá |
| NP13 | Tần Huyết Lăng | chủ huyết cốc (đứng đầu) | LOC07 | FA05 | Nguyên Anh | Giữ dòng tộc, không muốn bị chiếm hồn | ấn huyết cốc và hồ sơ bị nguyền |
| NP14 | A Túc | người giữ huyết phả | LOC07 | FA05 | Luyện Khí | Cứu những tên bị loại khỏi tộc | huyết phả |
| NP15 | Bạch Kỳ | người quản thú (đứng đầu) | LOC08 | FA06 | Kết Đan | Giữ môn tồn tại qua thú triều | sổ khế ước thú |
| NP16 | Kỷ Vũ | thú y | LOC08 | FA06 | Luyện Khí | Chấm dứt khế ước cưỡng ép | phương thuốc thú |
| NP17 | Giang Mộ | lái đò | LOC09 | — | phàm | Chở người sống và trả tên người chết | bảng khắc thuyền |
| NP18 | Ninh Ca | chủ gánh hát | LOC09 | — | phàm | Đưa lời khai bị cấm lên sân khấu | vở tuồng chép tay |
| NP19 | Tô Bán Hạ | y sư (đứng đầu) | LOC10 | FA07 | Trúc Cơ | Mở bệnh xá đủ sức nuôi người chữa | hồ sơ dịch và hạt giống kho lạnh |
| NP20 | Hà Tề | dược đồng | LOC10 | FA07 | phàm | Tìm nguồn dịch, nghi sổ triều bị sửa | mẫu nước và sổ ghi bệnh |
| NP21 | Cố Chùy | chủ lò (đứng đầu) | LOC11 | FA08 | phàm | Trả nợ lò mà không chôn thêm thợ | bảng công thợ mỏ |
| NP22 | La Men | thợ khuôn và giấy | LOC11 | FA08 | phàm | Mua lại tên tuổi nghề | khuôn ấn giả |
| NP23 | Trí Viễn | người giữ thư khố (đứng đầu) | LOC12 | FA09 | Trúc Cơ | Ghi sự thật mà không khiến chiến tranh tái phát | thư khố Lạn Kha |
| NP24 | Sầm Tro | người khắc bia | LOC12 | FA09 | phàm | Trả tên cho từng nắm tro | văn bia đã khắc |
| NP25 | Đường Bắc Quy | chỉ huy (đứng đầu) | LOC13 | FA10 | Luyện Khí | Đưa quân về đủ người, có thể phản triều vì việc ấy | bản đồ quân doanh |
| NP26 | A Mãn | giữ ngựa trạm | LOC13 | FA10 | phàm | Giữ đường tin không bị sửa | sổ trạm ngựa |
| NP27 | Mạnh Cốt | thầy bó xương | LOC14 | — | phàm | Cứu người còn sống giữa nghĩa địa | sổ tên người được cứu |
| NP28 | Bùi Ấn | cựu coi ấn | LOC14 | — | phàm | Công bố lệnh chết bị giả | ấn thật được giấu |
| NP29 | Kha Vọng | người nghe ký ức | LOC15 | — | Kết Đan | Chứng minh có thể sửa vòng mà không hiến thêm người | nền đá ghi lời nghe được |
| NP30 | Tịch Âm | ký ức kết tụ | LOC15 | — | phàm | Muốn được chấm dứt việc lặp lời người chết | tiếng vọng ở nền đá |

### E.3 Thế lực FA

| Mã | Tên | Căn cứ | Đứng đầu (vai) | Giữ |
|---|---|---|---|---|
| FA01 | Lương triều | LOC02 | NP04 | thuế và ngôi |
| FA02 | Vạn Bảo Thương Hội | LOC03 | NP05 | hợp đồng, độc quyền vận chuyển |
| FA03 | Huyền Cơ Trận Các | LOC05 | NP09 | hệ trận Ngũ Tổ |
| FA04 | Thanh Khê Liên Thôn | LOC01 | NP01 | đất, nước, an táng |
| FA05 | Huyết Sát Cốc | LOC07 | NP13 | huyết hệ và quyền tự trị |
| FA06 | Vạn Thú Môn | LOC08 | NP15 | nơi sống, khế ước và nguồn thú |
| FA07 | Bách Thảo Cốc | LOC10 | NP19 | cứu chữa và đan phương |
| FA08 | Hàn Thiết Hội | LOC11 | NP21 | lò và quyền thợ |
| FA09 | Lạn Kha Tự | LOC12 | NP23 | ký ức người chết |
| FA10 | Bắc Phong Quân | LOC13 | NP25 | biên ải và lương quân |

### E.4 Đồng hồ thế giới CLK

| Mã | Đồng hồ | Nơi | Ba giai đoạn |
|---|---|---|---|
| CLK01 | Mùa đói Thanh Khê | LOC01 | kho lương vơi → thiếu lương hai quý → dân bỏ làng |
| CLK02 | Nợ của triều đình | LOC02 | đến kỳ trả nợ → trễ kỳ thứ nhất → trễ kỳ thứ hai |
| CLK03 | Biên ải | LOC13 | đông về, xét lương quân → thiếu lương, thiếu người → quân địch phá ải |
| CLK04 | Huyết ước | LOC07 | gọi họp huyết tộc → trình vật chứng huyết mạch → xác nhận quyền kế vị |
| CLK05 | Thú triều | LOC08 | dấu hiệu trong rừng → vạn thú xuống núi → thú vương hiện |
| CLK06 | Đêm Dài trở lại | LOC15 | trăng đỏ (Huyết Nguyệt) → ma tu trỗi dậy → Ma chủ tỉnh |
| CLK07 | Đại Hội Thiên Kiêu | LOC02 | mở đăng ký → vòng loại ở các khu → chung kết |
| CLK08 | Tông Chiến Chính–Ma | — | xích mích → vây công → quyết chiến |
| CLK09 | Đổi Ngôi | LOC02 | thuế nặng, loạn → khởi nghĩa → kinh thành thất thủ |
| CLK10 | Đại Dịch | LOC10 | người chết lạ → dịch lan rộng → phong tỏa |
| CLK11 | Bí Cảnh Thượng Cổ Mở | — | ánh sáng ở Tây Lĩnh → tông lớn kéo tới → cửa đóng |
| CLK12 | Tiên Nhân Hạ Phàm | LOC15 | dị tượng → người thượng giới đi tìm một vật → một tông diệt |
| CLK13 | Long Mạch Đứt | — | linh khí suy → động phủ khô → tranh linh mạch |
| CLK14 | Thiên Lộ Mở | LOC15 | cầu ánh sáng → tranh vào → cửa khép |

## F. Mã việc làm (deed) cho sổ nghiệp

Dùng trong `e.deed`. Chọn mã **đúng việc kể trong lựa chọn**. Một lựa chọn bình thường (đi làm thuê, hỏi chuyện) không cần deed. Không bao giờ viết điểm nghiệp ra chữ.

| Mã | Việc |
|---|---|
| `cuu_nguoi` | Cứu người đang gặp nạn |
| `cuu_nguoi_hy_sinh` | Cứu người phải chịu thương nặng/mất của |
| `bo_thi` | Bố thí người nghèo |
| `phat_chan` | Phát chẩn năm đói (từ 5 lượng) |
| `giet_cuop_dang_ac` | Giết kẻ cướp đang hành ác |
| `tha_ke_ac` | Tha kẻ ác đầu hàng |
| `giet_vo_toi` | Giết người vô tội |
| `diet_khau` | Giết người diệt khẩu |
| `giet_dau_hang` | Giết kẻ đã đầu hàng |
| `tra_tan` | Tra tấn |
| `tra_tan_cuu_nguoi` | Tra hỏi để cứu người khác |
| `giet_thu_vo_hai` | Giết yêu thú vô hại để lấy yêu đan |
| `giet_thu_cuu_sinh` | Giết thú đang hại sinh linh khác |
| `phong_sinh` | Phóng sinh, thả thú bị nhốt |
| `trom_ngheo` | Trộm của người nghèo |
| `trom_ac_ba` | Trộm của ác bá |
| `hiep_dao` | Trộm của ác bá chia cho người nghèo |
| `lua_loi` | Lừa gạt vì lợi |
| `lua_cuu` | Nói dối để cứu người |
| `giu_loi` | Giữ lời hứa khi khó |
| `that_hua` | Thất hứa |
| `phan_su_mon` | Phản bội sư môn |
| `phan_ma_cuu` | Phản ma môn để cứu người |
| `hieu_kinh` | Phụng dưỡng cha mẹ (mỗi năm) |
| `bo_roi_gia_dinh` | Bỏ rơi gia đình |
| `quan_thanh_liem` | Làm quan thanh liêm (mỗi năm) |
| `tham_o` | Tham ô một vụ |
| `an_oan` | Xử oan người vô tội |
| `ep_ta_dien` | Ép tá điền, cho vay nặng lãi (mỗi năm) |
| `hanh_hiep` | Hành hiệp trượng nghĩa |
| `dau_doc` | Đầu độc người |
| `giet_thien_kieu_chinh` | Giết thiên kiêu chính đạo |
| `giet_ma_dau` | Giết ma đầu |
| `giet_doat_bao` | Giết người đoạt bảo |
| `diet_mon_ma` | Tham gia diệt môn ma tông |
| `diet_mon_chinh` | Tham gia diệt môn chính tông |
| `pha_phong_an` | Phá phong ấn thả yêu ma |
| `sieu_do` | Siêu độ vong hồn |
| `dao_mo` | Đào mộ lấy của |
| `an_tang` | An táng người chết bên đường |
| `huyet_te_nguoi` | Huyết tế người (mỗi mạng) |
| `luyen_hon_nguoi` | Luyện hồn người sống |
| `doat_can` | Đoạt linh căn |
| `dung_ma_cong` | Dùng công pháp tà trong một trận |
| `cuu_dich` | Chữa một vùng dịch |
| `pha_de` | Phá đê cứu thành, nhấn chìm làng nhỏ |
| `ban_dong_doi` | Bỏ đồng đội bị thương giữa hiểm cảnh |
| `ket_lieu_dong_doi` | Kết liễu đồng đội để lấy đồ |
| `bao_thu` | Báo thù kẻ đã hại mình |
| `hoa_giai` | Tha thứ kẻ thù, hóa giải |
| `ban_nguoi` | Bán người làm nô |
| `nhan_nuoi` | Nhận nuôi trẻ mồ côi |
| `sam_hoi` | Sám hối ở chùa |
| `nghich_thien` | Nghịch thiên cải mệnh (Thiên cơ) |

