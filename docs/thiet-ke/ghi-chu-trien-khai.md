# Ghi chú triển khai (chờ người dùng duyệt)

## Đ1 — Hành Đạo, Nghiệp Duyên, Danh tiếng

### Bảng BẬC Nghiệp Duyên (theo ý người dùng: cùng một bậc thì tác dụng như nhau)
Nguồn: `content/rules/nghiep.js` (`NQ_BAC`, `NQ_BAC_KIEP`, `NQ_BAC_KBON`, `NQ_BAC_HC`). Hàm: `ngBac(v)`, `ngBacB()`, `ngBacG()`.
Một việc "giết người vô tội" cố ý ≈ 15 điểm nghiệp chướng; "cứu người" ≈ 8 điểm thiện duyên.

| Bậc | Điểm (thiện duyên hoặc nghiệp chướng) | Tên nghiệp chướng | Thiên kiếp dữ hơn | Thưởng tôi thể khi vượt kiếp |
|---|---|---|---|---|
| 0 | 0 – dưới 3 | Ít điều vướng bận | ×1 | 0 |
| 1 | 3 – dưới 15 | Vướng nợ trần duyên | ×1,05 | +1% |
| 2 | 15 – dưới 50 | Oán nghiệp quấn thân (và kiếp đổi thành Nghiệp Hỏa) | ×1,12 | +3% |
| 3 | 50 – dưới 100 | Nghiệp hải trùng trùng | ×1,25 | +6% |
| 4 | 100 – dưới 200 | (cùng tên) | ×1,4 | +10% |
| 5 | từ 200 | (cùng tên) | ×1,6 | +10% (trần) |

"Thiên kiếp dữ hơn" nhân vào mỗi đạo kiếp theo 1 + 0,75 × (hệ số − 1).

Hoàn cảnh đầu thai đọc theo **bậc ròng = bậc thiện duyên − bậc nghiệp chướng** (−5..5) lúc chết:

| Bậc ròng | −5 | −4 | −3 | −2 | −1 | 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Bấp bênh (xuất thân khốn khó, tiền ×0,75) | 70% | 60% | 50% | 40% | 32% | 25% | 20% | 15% | 12% | 10% | 10% |
| Được nâng đỡ (xuất thân khá giả, tiền ×1,25) | 5% | 8% | 10% | 15% | 20% | 25% | 32% | 40% | 45% | 50% | 55% |

Hành Đạo vốn đã theo bậc (5 nhãn, `HD_LV`), giữ nguyên. Danh tiếng cũng đọc theo 5 bậc chữ (≥60, ≥25, >−25, >−60, còn lại).

### Quyết định đã chọn (phương án an toàn)
1. **Bảng DEED có 54 mục** (bảng HN B §10 thực có 54 dòng, lộ trình ghi 55). `dau_doc` lấy nghiệp mức 8 (nạn nhân vô tội); sự kiện có thể ghi đè bằng `ng`. Thêm trường `khep:1` cho `bao_thu`, `hoa_giai` (khép tuyến) — chưa dùng.
2. Trường `tuyen` chỉ ghi khi bảng nói rõ một tuyến chắc chắn; các mục "50% tuyến Ân" (cứu người, tha kẻ ác) không ghi `tuyen` — đúng như năm dòng mẫu.
3. **Chuyển karma cũ**: `nqFromLegacy` giữ P, T dạng số lẻ (không làm tròn) để gương `r.karma` giữ đúng giá trị cũ.
4. **Hạt quả chín nằm ở `r.qc`**, không ở `r.seeds` như lộ trình ghi: mã cũ (bảng tên NPC, nhờ ân nhân qua ải…) coi mọi phần tử `r.seeds` là người có tên, thêm hạt không tên vào đó làm hỏng giao diện. Khi chết, hạt chưa chín chép sang `W().qcLeft` (tối đa 20, cờ `qc:1`) thay vì `w.legacy` (legacy giới hạn 20 và có luật riêng cho ân/oán). Chưa có sự kiện `qc_<mã>` nào: hạt chín chỉ ghi một dòng nhật ký.
5. **Danh tiếng với tông ma/tà**: tông ma nhìn ngược tiếng khu vực (tiếng ác ở khu thì tông ma không ghét), việc làm ngay trong tông ma cũng tính ngược dấu. Thị trấn/thành nay có thể lên mức thù địch 3 khi danh tiếng ≤ −60 (trước chỉ tới 2). Ẩn cư chỉ tới mức 2.
6. Chip "chính ▲ / tà ▲" và các câu mới đặt trong `content/text/nghiep.json`; tên hành vi (`deed.<mã>`) cũng ở đó để sổ Nghiệp duyên hiển thị.
7. Sổ Nghiệp duyên hiện tuổi (con số tuổi như các thẻ Sổ tay khác) + tên việc + "thiện duyên/nghiệp chướng"; không hiện điểm.
8. Hooks (`content/hooks.js`): đốt ma thư → Hành Đạo chính 3; cho lão ăn, cho trẻ linh thạch → `bo_thi`; phụng sự lão sư → `hieu_kinh`; tâm ma dụ dỗ → tà 3 + nghiệp 3 (ý định "phớt lờ"), tâm ma trao quyền → tà 3; lục túi người chết → `dao_mo`; từ chối hối lộ, đưa thư giúp → `giu_loi`; nhận hối lộ bỏ nhiệm vụ → `that_hua`; chỉ đường → chính 1 + thiện duyên 1. Điều kiện tuần tra bắt: Hành Đạo nghiêng tà trở xuống hoặc nghiệp chướng ≥ 15.
9. Nhóm xuất thân (`grp`): khốn khó = khất cái, bỏ ở miếu, huyết mạch ma tộc, trốn nợ qua đèo, nhặt ở bậc cửa, lớn sau bếp, ẩn dưới sàn đan, mang tro về quê, làm thuê ở mỏ; khá giả = con thứ thế gia, con nhà buôn, thừa kế sạp bạc, hậu duệ người coi ấn (chỉ 4 — 12 xuất thân mới ở HN B §16.2 chưa làm, thuộc đợt sau). Nhóm "khá giả" ít nên kiếp được nâng đỡ hay ra trùng xuất thân.
10. `tools/test-ui.js`: hàm `boot` chờ hết hiệu ứng chuyển màn (mực loang) trước khi kiểm, vì bài đôi khi kiểm lúc màn mở đầu còn hiện.

### Đ1.8 — cách rà 477 chỗ karma
- Đọc nhãn + lời kết của từng lựa chọn, chia nhóm: cứu người / hy sinh cứu người / siêu độ / an táng / phóng sinh / bố thí / trừ ma, trừ cướp / tha / hóa giải / sám hối → mã DEED tương ứng; trục lợi (bán, thu phí, hoa hồng, đổi im lặng lấy lợi) → `lua_loi`; cho vay thọ nguyên lấy lãi → `ep_ta_dien`; trộm lén → tà + nghiệp nhỏ; cướp, đoạt đồ người hấp hối, luyện hồn, nhận ma chủng → tà nặng.
- **214 chỗ +4** của các chuỗi truyện (giúp đỡ có hy sinh nhỏ: bỏ tiền, lỡ lượt, chịu trách) không ép thành "cứu người": ghi `hd:{p:3}` + `ng:{g:3}` (không gieo hạt quả chín để khỏi tràn nhật ký); chỉ chỗ thật sự cứu mạng mới dùng `cuu_nguoi`. Lựa chọn tốt nhỏ (+1, +2) → `hd:{p:1}` + `ng:{g:1}`; xấu nhỏ (−1, −2 không trục lợi) → `hd:{t:1}`.
- Có ý định "không biết / nhầm" (giết nhầm hồ ly vô hại) → `yd:'tai_nan'`; chỉ đường cho kẻ truy sát → `giet_vo_toi` với `tn:'tiep_tay'`.
- Thêm một chỗ ngoài danh sách: dịch vụ "Dạy gã say gây sự" (content/venues/services.json) → `hd:{p:1}`; luật dịch vụ nay truyền cả khóa `deed/deedO/hd/ng`.
- `docs/thiet-ke/karma-su-kien.csv` giữ nguyên làm bản ghi trước khi đổi.

### Đ1.10 — rà chéo
- Gương `r.karma` **vẫn được ghi** (từ Hành Đạo) thay vì bỏ hẳn: còn vài nhánh `!feat('nq')`, giá trị karma ở xuất thân và chỗ thắng trận dịch vụ đọc nó; giữ gương không hại gì và an toàn cho bản lưu. Có thể bỏ ở đợt sau khi xoá các nhánh dự phòng.
- Bot thông minh (`tools/bot-smart.js`) chấm điểm cả `hd`/`deed` như karma cũ (chưa chạy bot).
- Bốn commit Đ1.8 có dòng ghi công nằm liền dòng tiêu đề (thiếu dòng trống) do lỗi soạn lệnh; nội dung không ảnh hưởng.

## Đ2 — Linh căn mới, vô linh căn, trắc linh, đầu thai, quên sạch, tuế biến

### Quyết định đã chọn (phương án an toàn)
1. **Tỉ lệ vô linh căn đọc theo BẬC nghiệp duyên** (bảng Đ1), không theo ngưỡng điểm thô: `VO_BAC_B=[0,4,10,20,20,20]`, `VO_BAC_G=[0,−3,−8,−15,−15,−15]` (chỉ số = bậc 0..5), gốc 45%, kẹp 30–65%. Ngưỡng cũ của lộ trình (3/15/50) trùng đúng ranh bậc 1/2/3 nên số giữ nguyên; bậc 4, 5 bằng bậc 3. Nâng cấp `tuccan` (Túc Căn) chưa có nên `U('tuccan')=0`.
2. Phẩm chất linh căn (`root.q`: Khuyết/Thường/Thuần/Viên Mãn) nhân vào hệ số tu qua `rootView`; bản lưu cũ không có `q` thì như cũ. `ttShape` giữ lại `q`.
3. Từ kiếp 2 mọi thẻ chung linh căn của thẻ đầu (đã nắn theo khí vận của thẻ đầu). Khí vận các thẻ khác giữ nguyên — có thể có thẻ mang khí vận "kéo hệ" mà linh căn không đổi theo.
4. Mệnh cách Lôi Thần không thêm hệ lôi cho vô căn.
5. **Vô căn**: tu vi không tăng (nếu sau này có `r.vo` thì đổi sang kinh nghiệm võ ×0,5), linh lực tối đa 0, bế quan 0, không đột phá, không dẫn khí, không có tâm pháp bảo đảm / tâm pháp tự ngộ; sự kiện cho tu vi → chip "Không cảm được linh khí". Vẫn đọc/mua được bản chép tay tâm pháp (không luyện được).
6. **Trắc linh**: kiếp 1 biết ngay; kiếp 2+ `rootKnown=0`. Chưa trắc thì cũng chưa dẫn khí được (chặn `phamUp`). Giao diện chỉ coi là vô căn khi đã trắc (`voKnown()`), để không lộ kết quả qua việc ẩn nút bế quan. Năm cách là kỳ ngộ `sp:1` trong `content/events/opportunities/system.json`, kết quả chọn bằng hook `tlResult(cách)` (ba bản lời: vô / thường = tạp, tứ, tam / tốt = song, thiên, biến, cực).
   - Sơn môn tuyển đồ: kiểm một lần ở mốc tháng 1–2, khi có tông môn trong 3 ngày đường (`travelHours`). Chưa có luật nhập môn nên lời mời chỉ là lời kể.
   - Tu sĩ du phương: mỗi mốc tháng 1–2 (trước mốc 3) 30% khi đứng ở trấn/thành. Lão đạo ăn xin: mốc tháng 3 (bận thì dời). Tự biết: vô căn chưa trắc mà đã có tâm pháp hoặc qua `TP_Y` năm.
   - **Trắc Linh Thạch** là vật truyện (`qitems`), dùng ở túi. **Chưa bày bán** (giá 30 lượng bạc cần tiền bạc của Đ3).
7. **Lượt chọn lá số** `G.meta.pick`: Định Mệnh Châu (mang theo lúc chết), Thiên mệnh bậc 1 = kiếp chia hết cho 4, bậc 2 = chia hết cho 3. Thiên mệnh **bỏ tác dụng cũ** (rút thêm khí vận) cho đúng nghĩa mới. Vật Định Mệnh Châu, Túc Tuệ Đăng chưa có nguồn rơi (chờ đợt nội dung).
8. **Quên sạch**: bỏ Ký ức công pháp (`ky`) và Ký ức tâm pháp (`kytp`); bản lưu cũ hoàn điểm (ky 10+26, kytp 12+28) và xoá `tpMem`; không còn ghi `tpMem` khi chết. Túc Tuệ Đăng: kiếp sau học lại tâm pháp đang tu ở bậc thấp nhất (giữ tên, hệ).
9. **Tuế biến**: bảng `content/rules/tue-bien.js` có 100 mục (31 thể chất có tác dụng + Phàm Thể chỉ có lời; 54 khí vận; 14 mệnh cách, khí vận `mc_<mã>` dùng mục mệnh cách). Trần riêng mỗi nguồn và trần/sàn chung (`TUE_CAP`, `TUE_FLOOR`) tính riêng, tổng không vượt trần chung. Vô căn: tuế biến linh lực, tu vi, hồi linh lực "ngủ". Hai nguồn cùng loại (Hỏa linh thể / Hỏa Linh Chi Thể, Trường thọ / Trường Thọ Thể) không cộng, biến cố ×1,1.
   - **Bỏ phần cần hệ chưa có** (chưa làm cơ chế, lời "Theo năm tháng" cũng bỏ phần đó): nghề phàm và kinh nghiệm nghề; sự kiện hành hiệp / khiêu chiến / thấy âm hồn / người cần giúp; giao tình; thân nhân gặp nạn (Thiên Sát Cô Tinh chỉ còn tâm ma); công thức đan (Dược Đồng); bảo vật ngẫu nhiên (Vận Khí Nghịch Thiên, Đại Khí Vận → linh thạch); niết bàn (Phượng Hoàng); báo trước lối rẽ (Linh Cảm Thể); nhân quả (Nhân Quả Đạo); đi nhiều khu (Vân Du); bế quan 60 ngày (Khổ tu); Ba tấc lưỡi; Người Xuyên Việt; Thiên Mệnh Chi Tử; Diệt Ma Chi Tâm; nhặt vật (Kẻ Ngốc); "phúc" của Phật Tử; nghiệp +1 của Tiểu Nhân (chỉ còn tà khí). Các mục này hoặc không có trong bảng, hoặc chỉ giữ phần làm được.
   - Tiền "lượng bạc" trong bảng đổi sang linh thạch nhỏ cho tới Đ3. Vô Cấu Kiếm Thể cộng công không cần cầm kiếm (trần 6%). Huyết Sát Ma Thể bỏ phần "không giết thì héo".
   - Man Lực Thể có `food:1.15` để Đ3 (ăn uống) dùng.
   - 4 thể chất + 10 khí vận mới của C (HN A.6) **chưa thêm**: cần dữ liệu C §5.6 và điều kiện sinh ở `ttPhys`/`ttRoll`; để đợt sau.
   - Tuổi già: từ 70% thọ (phàm nhân, vô căn: từ 50 tuổi; có Trường thọ thì muộn 10%) ngừng tích lũy, khí huyết −1%/năm (sàn −10%), thân pháp −1 mỗi 3 năm (sàn −6), từ 85% thọ 10%/năm thêm thương thế nhẹ.
   - Nhật ký: chỉ ghi một dòng gộp vào năm có biến cố (không có chữ số).
10. Bài `hoancanh` (Đ1) đôi khi trượt do ngẫu nhiên ở so sánh tiền khởi đầu; đã cố định hạt giống trong bài.

### Đ2.8 — rà chéo
- Chuỗi bọc: `newRun` (37: vô căn bỏ hệ → trắc linh → lượt chọn → Túc Tuệ Đăng; 38: khởi tạo tuế biến), `die` (Định Mệnh Châu, Túc Tuệ Đăng chạy trước khi ghi `lastNq`), `advanceTime` (tâm pháp bảo đảm bỏ qua vô căn; trắc linh; tuế biến) — đều kiểm lại `G.run` sau khi gọi gốc.
- Bản lưu cũ: `rootKnown` thiếu → coi như đã biết (cờ `_rkV1`); `r.tue` thiếu → bắt đầu từ tuổi hiện tại, không áp lại năm cũ; `root.q` thiếu → hệ số cũ; `upg.ky/kytp` → hoàn điểm.
- Bot (`tools/bot-ext.js`, `bot-smart.js`) **chưa sửa** cho vô căn (L16) vì chưa được phép chạy bot.

## Đ3 — Tiền tệ, ăn uống, việc làm thuê, gia đình cơ bản

Toàn bộ luật Đ3 nằm ở `src/game/core2/39-tien-te.js`; bảng: `content/rules/tien.js` (TIEN), `content/venues/thuong-cac.js` (THUONG_CAC, TC_BAC, TL_QST), `content/rules/an-uong.js` (AN), `content/venues/viec-thue.js` (VIEC_THUE), `content/rules/gia-dinh.js` (GD); chữ ở `content/text/tien-te.json`; giao diện `ui/25-tien-te.js`, `src/react/hop-thoai/ThuongCac.jsx`, `MuuSinh.jsx`.

### Quyết định đã chọn (phương án an toàn)
1. **Đơn vị**: `r.bac` tính bằng đồng; 1 quan = 1.000 đồng; 1 linh thạch = 100 quan. Giá "lượng" còn sót trong Phần B quy đổi **1 lượng = 330 đồng** (HN A.7): Trắc Linh Thạch 30 lượng = 9.900 đồng; tạp dịch tông môn 1 lượng/tháng = 330 đồng; tuế biến Gia Cảnh Khá Giả 5–10 lượng = 1.650–3.300 đồng, Đại Khí Vận / Vận Khí Nghịch Thiên 2–5 lượng = 660–1.650, Mị Cốt và Phúc Tinh 1–3 lượng = 330–990. "Tiền +3%" (Tiểu Nhân, Tư Lợi) tính trên bạc khi là phàm nhân/vô căn.
2. **Tiền khởi đầu**: xuất thân có `bac:[a,b]` thì theo đó, không thì theo nhóm (khốn khó 0–300, thường 500–1.500, khá giả 5.000–20.000); hoàn cảnh bấp bênh ×0,75, nâng đỡ ×1,25. Linh thạch về 0, trừ con thế gia 1–2; **nâng cấp luân hồi "st" vẫn cộng linh thạch** như cũ để điểm đã mua không mất tác dụng.
3. Sửa lỗi có sẵn: `data/02-catalog.js` không chép `grp` của 30 xuất thân danh mục nên mọi xuất thân danh mục đều thành nhóm "thường"; nay chép `grp`, `bac`, `lt`.
4. **Quán phàm** (`services.json` trường `bac`): trà 5, hỏi đường 10, tĩnh tâm 8, phòng trọ 12, giường tập thể 6 (dịch vụ mới), bữa ăn 13, chén rượu 15, mời cả bàn 120, nghe hát 30 đồng. Phòng thượng hạng có tụ linh trận vẫn trả linh thạch. Phần thưởng dịch vụ (hộ tống, đối câu, đấu rượu…) vẫn là linh thạch (chưa đổi).
5. Thiếu bạc mà có linh thạch: `bacPay` đổi đúng một viên ra 90 quan rồi trả, có lời báo; không có gì thì nút ghi "Không đủ tiền". Tạp hóa: bản chép tay tâm pháp 800 đồng; chưa trắc linh thì phường thị bày Trắc Linh Thạch (9.900 đồng); có lương khô 70 đồng một gói (5 gói mỗi đợt hàng). Thầy lang ở phường thị cho phàm nhân: 150 đồng.
6. **Thưởng nhiệm vụ của phàm nhân trả bằng bạc**: mỗi "linh thạch" ghi trên bảng = 100 đồng (`TIEN.qBac`), bảng treo ghi đúng như vậy. Lý do: phàm nhân làm một nhiệm vụ đưa thư mà được vài linh thạch (vài trăm quan) thì phá "hai thế giới". Tu sĩ vẫn nhận linh thạch.
7. **Tiền trang**: dùng khung "nơi chọn việc" (VENUE_N) nên không cần hộp thoại mới; giá cố định 110/90 quan (chưa dao động theo vùng).
8. **Cống hiến**: khóa sổ là **tông đang đứng** (nếu đứng ở một sơn môn), không thì tông mình thuộc. Nhờ vậy cống hiến tông A không dùng được ở tông B (hành động thành viên vốn đã chỉ hiện ở tông mình qua `contentOwnSect`). `chLeave(k,expel)` có sẵn nhưng **game chưa có chỗ rời tông** (không sự kiện nào tắt cờ `tongmon`), nên chưa gọi.
9. **Thưởng Lệnh**: cộng ở `questGive` (mọi lối xong nhiệm vụ của core2/08 đều qua đây, thay cho `questArrive`/`questWin` cũ); xong trước nửa thời hạn +1 (ghi `q.t0` lúc nhận; nhiệm vụ nhận trước Đ3 không có thưởng này). Bỏ −1, trễ hạn −1. Nhiệm vụ truy nã ×2 và "phàm nhân chỉ nhận bậc 1" chưa làm.
10. **Thưởng Các**: bày 14 món có hệ đi kèm; 6 món ẩn (`an:1`) vì hệ chưa có: giấy thông hành trạm dịch, tin tức thiên kiêu, lệnh truy nã, bản đồ kho báu, xoá truy nã, **Manh mối cơ duyên** (chờ Đ6 cải căn). Không có Khai Linh Đan.
11. **Ăn uống**: giá mỗi ngày đạm bạc 12 / thường 20 / khá 40 đồng (theo mặt bằng C, không theo "văn" của B); Man Lực Thể ăn ×1,15. Thứ tự lo cái ăn mỗi ngày: đang làm việc có cơm → **cơm nhà ở quê khi còn người nhà** → cơm tông (đứng ở tông mình) → quán (thôn trấn, thành, chợ; tự lo cơm bật; đủ bạc) → lương khô → đói. Không "săn/hái tại chỗ" (bài `com_ao` đòi ở hoang dã không có gì thì đói). Đói lả còn giảm công làm thuê 30%. Mức Khá giảm tâm ma 1 mỗi 30 ngày ăn. Đang trong trận thì hoãn chết đói tới ngày sau.
   - Cơm nhà là thêm ngoài lộ trình, để phàm nhân mới đầu thai (bạc ít) không chết đói ngay tháng thứ hai.
   - `tools/test.js`: `fresh()` đặt `FEAT.an=0` để các bài cũ (trôi nhiều năm) không chết đói; `com_ao` bật lại.
   - Chạm ô 🍚 trên HUD để đổi mức ăn (ô chỉ hiện với người phải ăn).
12. **Việc làm thuê**: "biết chữ" (viết thư hộ) tạm đổi thành ngộ tính 8; "gặp sói" khi chặt củi là thương nhẹ + mất khí huyết, không mở trận. Tạp dịch ngoại môn cam kết 30 ngày, ai đứng ở sơn môn cũng làm được, được ăn.
13. **Gia đình**: không người nhà với khất cái, bị bỏ ở miếu, nhặt ở bậc cửa, lớn sau bếp, mang tro về quê. Bản lưu cũ sinh người nhà theo tuổi hiện tại (ai quá 85 coi như đã mất). Tin tang chỉ là một dòng nhật ký + thông báo (Đ9 viết sự kiện).

### Đ3.9 — rà chéo
- Chuỗi bọc mới (đều ở 39, chạy sau mọi lớp cũ): `newRun` (bạc + linh thạch, quê, người nhà), `run2` (`_bacV1`, `_chV1`, `_anV1`, `_gdV1`), `advanceTime` (ăn theo ngày), `venueOpts`/`venueDo` (giá bạc, tiền trang), `placeActs` (tiền trang, Thưởng Các, mưu sinh), `shopExtra`/`buy`/`openShop`/`healBuy`, `takeQuest`/`questGive`/`questCancel`/`timeHooks`/`questRewardChips`, `rgMonthRate`/`rgTurnRate`/`S` (đói), `tueEv`/`tueYear`. Mọi lớp kiểm lại `G.run` sau khi gọi gốc.
- **Hai lỗi trùng tên toàn cục** gặp khi làm (đã đổi tên): `tlOpen` (trắc linh, Đ2) và `tcName` (tư chất). Đã rà mọi tên hàm mới của 39 với toàn bộ mã.
- Thử bản lưu tạo bằng mã Đ2.8 (đang trong tông, `r.ch=25`): tải được, giữ linh thạch, bạc 0, sổ cống hiến 25 ở đúng tông, có người nhà, ở quê không đói, mọi nút mới hiện.
- Sửa thêm: tuổi già (Đ2.7) giảm khí huyết tối đa mà không kẹp khí huyết hiện có (bài `hoiphuc` lúc đạt lúc trượt); `36c-hoan-canh.js` dùng `Math.random` nên bài kiểm phụ thuộc may rủi, nay dùng bộ sinh số có hạt giống; bài `tinhtoa` bỏ tâm pháp gia truyền khỏi nhân vật thử.
- Bài `hoiphuc` có điều kiện "dưới 5 giây" — máy bận có thể trượt; chạy lại thì đạt.
- Bot chưa sửa cho tiền bạc / ăn uống (chưa được phép chạy bot).

## Đ4 — 27 nhiệm vụ tân thủ (chỉ kiếp đầu)

Luật: `src/game/core2/40-tan-thu.js` (số 39 đã dùng cho tiền tệ); bảng `content/rules/tan-thu.js` (TUT, TUT_WISH, TUT_GRAD, TUT_MAX); chữ `content/text/tan-thu.json`; hành động `src/game/ui/26-tan-thu.js` (25 đã dùng); giao diện `src/react/chung/TanThu.jsx` (khung dưới HUD, hộp xác nhận bỏ qua, hộp chọn nguyện vọng).

### Quyết định đã chọn (phương án an toàn)
1. **Thứ tự mở**: sáu nhiệm vụ nhóm A làm từng cái một; hết A thì lấy theo thứ tự bảng, tối đa ba cùng lúc (chữ cái nhóm B–H chỉ để đọc, không khoá theo nhóm). Bỏ qua cũng tính là đã đóng.
2. **Tự xong (`st`)**: nhiệm vụ có hàm trạng thái mà đã đạt thì hiện "Nhận thưởng" ngay khi mở. Để không cho thưởng không: HD09 so với số công pháp lúc sinh (`tut.art0`), HD12 chỉ tính khi đã từng bị thương (`tut.hurt`) rồi hết thương. HD10 tính tiến độ 0–2 (có binh khí trên ô vũ khí, có Hồi Xuân/Bạo Huyết Đan trong túi).
3. **Khớp hệ có thật** (đổi so với lộ trình): HD02 đếm khi chạm dòng Linh căn ở bảng nhân vật (`data-tut`, bọc `showTip`); HD03 = mở thẻ Túi của bảng nhân vật (game không có hộp "túi" riêng); HD06 = ngủ ở khách điếm (dịch vụ phòng/giường) hoặc tĩnh tọa; HD13 chỉ tĩnh tọa (chưa có luyện võ — chờ Đ5); HD14 = luyện chế một món (chưa có sửa đồ); HD15 = tặng lễ hoặc kết quan hệ; HD16 mở thẻ Nghiệp duyên của Sổ tay; HD17 = vào tông hoặc nhận tạp dịch ngoại môn (học việc / đầu quân / võ quán chờ Đ5); HD18 dẫn thẳng tới hộp chọn nguyện vọng (10 mục HN A.9.3, `r.wish`, chỉ là lời ghi, đổi được, có dòng ở bảng nhân vật); HD19 dẫn tới nút bế quan; HD26–27 dẫn tới nút đột phá trên HUD (`hudBt`); HD25 tìm nút có hành động `tram` (thôn trấn) — đại khu vực mới tính khi `r.region` khác lúc sinh.
4. **Dẫn đường**: tìm trong mọi nút **đã thấy** (`fog>=1`) nút gần nhất có đúng hành động trong `placeActs` (không chỉ dựa vào loại nút); không có thì báo "Chưa biết nơi nào như thế quanh đây." (L13). Nút được dẫn tới nhấp nháy ba giây (`.tut-flash`).
5. **Chống đếm trùng (L14)**: "tới nơi" đếm theo mã nút một lần (`tut.seen`); săn yêu đánh dấu trận (`_tutH`) và mỗi trận chỉ đếm một lần (`_tutC`), trận không khởi từ săn yêu không tính. Các việc ở giao diện (mở bảng…) đếm trong bọc `render` nhưng nhiệm vụ đã xong thì không cộng thêm.
6. **Bỏ qua**: luôn mở hộp xác nhận (không dùng `UI.confirm` bấm hai lần) — "Bỏ qua" / "Giữ lại".
7. **Tốt nghiệp**: đủ 22 nhiệm vụ **đã nhận thưởng** (bỏ qua không tính) → +5 điểm luân hồi, dòng "Tân thủ tốt nghiệp" trong `calcPts`.
8. **Bản lưu cũ**: không tạo `r.tut` (chỉ kiếp mới bắt đầu sau bản này); bản có `tut` thiếu trường thì bổ sung (`_v1`). Kiếp 2 trở đi không có khung.
9. Bot chưa sửa cho tân thủ (chưa được phép chạy bot).

## TIẾN ĐỘ (điểm dừng để làm tiếp)
- Xong: Đ0, Đ1, Đ2, Đ3, Đ4, Đ5.1, Đ5.2, Đ5.3.
- Còn: Đ5.4 (năng lực hỗ trợ ST23, Opus), Đ5.5 (rà chéo đợt 5, Opus), rồi Đ6 trở đi.
- Có 15 câu hỏi chờ người dùng chốt (Đ1: 5, Đ2: 3, Đ3: 4, Đ4: 3), xem các mục trên.

## NGƯỜI DÙNG CHỐT 15 CÂU (việc phải làm lại/bổ sung trước khi làm Đ5.4)
1. Mốc bậc nghiệp: tự quyết, không quá dễ, không tuyệt vọng (rà lại mốc cho cân).
2. Đúng hướng. Chính đạo chia nhiều mức theo loại hành động (mua đồ ăn cho bé ăn xin < cứu bé khỏi sói). Rà lại để 214 chỗ +4 phân mức theo mức hy sinh/nguy hiểm thật.
3. Giữ (tông ma nhìn ngược).  4. Giữ (thị trấn ghét mức 3 khi truy nã).
5. Giữ ghi tuổi; "tuổi" thuộc danh sách chỉ số được hiện số.
6. Đầu thai không được chọn, TRỪ khi trước khi chết đã tu công pháp/kỹ năng, uống đan, hoặc dùng vật phẩm/trang bị/pháp bảo đặc biệt → hệ thống tạo 3 nhân vật ngẫu nhiên, chọn 1. Linh căn (kể cả vô linh căn) luôn ẩn cho tới khi trắc (tông môn/thế lực, sự kiện, vật phẩm trắc linh). Kiểm lại: kiếp đầu cũng phải ẩn tới khi trắc.
7. Tạm giữ Thiên mệnh kiểu mới.
8. "Già" tính theo tỉ lệ tuổi hiện tại / tuổi thọ (không theo số tuổi). Tác hại: khí huyết giảm 10%; chỉ số chiến đấu giảm 0.5–1% tùy loại, có loại không giảm (tự chọn); trong trận né và đỡ tốn thêm ~5 thể lực.
9. LÀM LẠI TIỀN TỆ, bỏ "quan":
   - 1 xu = 1 đồng tiền; 1 lượng bạc = 1.000 xu; 1 lượng vàng = 10.000 xu.
   - Linh thạch: Hạ phẩm (giá trị ~100 lượng vàng), Trung = 100 Hạ, Thượng = 100 Trung, Cực = 100 Thượng.
   - LƯU Ý: linh thạch KHÔNG đổi trực tiếp sang vàng (giá trị chỉ là quy ước; bỏ/giới hạn tiền trang đổi trực tiếp — chỉ còn kênh gián tiếp hiếm như bán đồ tu sĩ ở chợ đen/đấu giá, tự thiết kế an toàn).
   - Phàm nhân dùng xu/bạc/vàng; tu sĩ dùng linh thạch.
   - Sự kiện: (a) phàm nhân KHÔNG gặp sự kiện đòi linh thạch hoặc thuộc chuyện tu sĩ; (b) sự kiện phàm nhân dùng được thì đổi giá sang tiền phàm.
   - Cửa hàng: tạp hóa thành trấn chủ yếu bán đồ phàm (tiền phàm), đồ tu sĩ rất ít; đồ tu sĩ nhiều ở tông môn/thế lực, chợ đen, đấu giá, cửa hàng Thưởng Các.
10. BỎ "cơm nhà". Khởi đầu có ít xu đủ chống đói. Ở quê được mua chịu (tiền âm, ví dụ -50 xu). Nợ: ít mà lâu → quan phủ đánh hèo (mất máu/trọng thương), vẫn nợ, gia hạn; lần sau không trả phạt nặng hơn, có thể truy nã; nợ nhiều và lâu → truy nã/lên quan phủ/bắt làm công trả nợ 2–3 năm. Thêm vay tiền có lãi. Nhà ở: xuất thân có nhà thì có sẵn nhà ở quê; không có thì phải thuê, ngủ ngoài → bệnh, lạnh, mất máu mỗi tháng.
11. Có săn bắt/hái lượm ở hoang dã, số lượng có hạn, hồi lại mỗi năm (lượt săn yêu thú cũng vậy).
12. Chưa chạy bot.  13. Giữ.  15. Mở sẵn.
14. Nhiệm vụ tân thủ: loại "sở hữu/đạt trạng thái" (có thảo dược X, đạt Luyện Khí tầng 1) thì tự xong nếu đã có; loại thao tác cốt lõi hoặc đếm số lần (săn 5 lần…) phải làm lại thật.
16. Thêm: giao diện desktop — tooltip ở tab Căn cơ (bấm vào chỉ số) hiện lệch xa; kiểm tra và sửa vị trí tooltip.
17. Đổi phẩm linh thạch không hai chiều ngang giá: phẩm cao hiếm hơn. Đổi lên (100 Hạ → 1 Trung) phải bù thêm, phẩm càng cao càng khó đổi và phần bù càng lớn; đổi xuống (1 Trung → ~80–101 Hạ) tùy nơi (chợ đen, Vạn Bảo Lầu…), mỗi nơi tỉ giá khác nhau nhưng chênh ít.
    Thêm chỉ số mới "NHU CẦU" theo từng nơi và từng vật phẩm (kể cả từng phẩm linh thạch): nhu cầu tăng thì giá tăng, giảm thì giá giảm; áp dụng cho mọi mua/bán. Nhu cầu nên dao động theo thời gian và bị tác động khi người chơi mua/bán nhiều. Số trong ví dụ chỉ là minh hoạ, tự cân.
18. TRẮC LINH CĂN Thiên/Địa phải "wow" (hiện quá bình thường):
    - Độ hiếm: Địa linh căn ~1/1000 người; Thiên linh căn cực hiếm (~1/100.000, "nghìn năm có một"). Rà lại bảng tỉ lệ linh căn (content/rules/root-rate.js) cho khớp.
    - Khi vừa bấm trắc ra Địa/Thiên: ẩn hết hộp thoại, chân trang, biểu tượng → chạy hiệu ứng toàn màn (tham khảo hiệu ứng tăng tiềm chất có sẵn). Địa: màu tím. Thiên: cam vàng, rất sáng, mạnh hơn Địa nhiều lần.
    - Khung cảnh kiểu truyện tiên hiệp: hào quang phóng thẳng lên trời, thiên địa dị tượng, ánh sáng chiếu khắp nơi, chuông tông môn gõ vang hàng chục tiếng, trưởng lão kinh động… Lời kể riêng cho Địa và Thiên (Thiên hoành tráng hơn hẳn), sau hiệu ứng mới hiện lại hộp thoại kết quả. Áp dụng cho mọi cách trắc linh (tông môn, sự kiện, vật phẩm).

## Sửa-A — làm lại tiền tệ (câu 9) và đổi phẩm linh thạch, nhu cầu (câu 17)
Luật: `src/game/core2/39-tien-te.js` (đơn vị, bỏ đổi tự động, bỏ tiền trang) và `src/game/core2/43-tien-te-2.js` (mọi phần mới); bảng `TIEN`, `TIEN2` ở `content/rules/tien.js`; chữ `content/text/tien-te.json`.

### Số liệu đã chọn
1. **Đơn vị**: `r.bac` tính bằng xu. 1 lượng bạc = 1.000 xu, 1 lượng vàng = 10.000 xu. Hiển thị dài "2 lượng vàng 5 lượng bạc 30 xu", ngắn trên HUD "3,2 lượng" / "2,5 vàng". Không còn "quan", "đồng".
2. **Bản lưu cũ** (`_xuV1`): bạc cũ tính bằng đồng → 1 đồng = 1 xu nên số giữ nguyên (giá trị cũ 1 quan = 1 lượng bạc, khớp ý người dùng); linh thạch cũ (`r.st`) là Hạ phẩm; thêm `r.lt=[Trung,Thượng,Cực]`.
3. **Linh thạch 4 phẩm**: `r.st` vẫn là Hạ phẩm (mọi giá cũ tính bằng Hạ phẩm, không phải sửa hàng trăm chỗ); Trung/Thượng/Cực ở `r.lt`. Giá trị quy ước 1 Hạ ≈ 100 lượng vàng (`TIEN.lt`, chỉ để đọc).
4. **Không đổi trực tiếp**: bỏ tự đổi một viên linh thạch khi thiếu bạc; bỏ tiền trang mua/bán linh thạch. Kênh gián tiếp hiếm: **Hiệu cầm đồ** ở thành và chợ tu sĩ — nhận đồ tu sĩ (pháp khí/đan), không nhận linh thạch, mỗi nơi 1 món/tháng, trả 200 xu cho mỗi "linh thạch giá bán" của món đó × nhu cầu (vd pháp khí bán 8 linh thạch → ~1,6 lượng bạc).
5. **Đổi phẩm** (nơi "Đổi linh thạch"): chợ phiên tu sĩ (`cho`), phường thị (`thanh`, chỉ tới Thượng phẩm), tông môn mình (`tong`).
   - Đổi xuống 1 viên phẩm trên → Hạ/Trung/Thượng: chợ 97/93/89, tông 99/95/91, phường thị 94/90/86 viên; kẹp 80–101.
   - Đổi lên 100 viên → 1 viên phẩm trên phải trả ×: chợ 1,06/1,12/1,22, tông 1,05/1,10/1,18, phường thị 1,10/1,18/1,30 (tối thiểu 101 viên).
   - Mỗi nơi lệch thêm ±2 viên / ±2% theo mã nút; giới hạn số lần đổi lên mỗi tháng mỗi nơi: chợ 6/3/1, tông 5/2/1, phường thị 4/1/0.
6. **Nhu cầu** (`ncGet(nút, món)`): nền dao động ±12% quanh 1, đổi mốc mỗi 3 tháng (nội suy, tính từ băm nên không lưu); người chơi mua 1 lần +0,04, bán −0,04 (đổi linh thạch: phẩm nhận ±0,04, phẩm đưa ∓0,02); phần đẩy phai ×0,7 mỗi tháng, kẹp ±0,4; nhu cầu kẹp 0,7–1,4. Lưu `W().nc[nút][món]=[đẩy,tháng]`, tự xoá khi gần 0. Áp vào: giá hàng tiệm (lúc bày hàng và sau mỗi lần mua), giá bán đồ ở tiệm, đổi phẩm linh thạch, cầm đồ. **Chưa áp** vào dịch vụ quán (trọ, ăn, trà) và Thưởng Các (trả Thưởng Lệnh) — đó là dịch vụ/điểm thưởng, không phải hàng hoá. Món: `dan:<mã đan>`, `sk`, `pb`, `sach`, `qi:<mã>`, `lt0..lt3`, `cam`.
7. **Cửa hàng**: tạp hóa thôn trấn giữ tối đa 1 món đồ tu sĩ, phường thị trong thành tối đa 2 (đồ có giá xu như bản chép tay tâm pháp, Trắc Linh Thạch, bí tịch võ không tính); luôn bày đồ phàm bằng xu: Kim sang dược 120 xu (hồi 30% khí huyết, dùng trong túi), Hương an thần 60 xu (tâm ma −5), Lương khô 70 xu. Chợ phiên tu sĩ giữ nguyên đầy đủ. Thêm **Bảo khố tông môn** (nút tạp hóa ở tông mình): hàng thường + 1 pháp khí cao hơn một phẩm + 1 loại đan.
8. **Sự kiện cho phàm nhân**: `tools/ra-su-kien-pham.js` rà 258 mục phàm nhân gặp được (levels có 0, không đòi ghi danh); chấm điểm từ ngữ tu sĩ; rà tay thêm 10 và gỡ 5 mục máy bắt nhầm (lý do ghi trong công cụ). Kết quả `content/rules/pham-su-kien.js`: **13 sự kiện phàm nhân không gặp** (bí cảnh, đấu giá tu sĩ, thi thể tu sĩ, tranh bảo, đổ thạch, động phủ tiền bối, mạch linh thạch, ngư nhân, cứu tù binh, ma tu xin tha, cược đan đột phá, tu sĩ đánh nhau vì gà, tu sĩ thuê trồng linh điền). **101 sự kiện** có giá linh thạch còn lại: luật tự đổi — giá/lợi 1 linh thạch (sau hệ số vùng) = 100 xu (`TIEN.evXu`, bằng `TIEN.qBac`); tỉ lệ "%" tính trên xu; lời kể đổi "viên linh thạch" → "đồng bạc", "linh thạch" → "bạc" (trừ Trắc Linh Thạch). Sự kiện mới tự được đổi; muốn chặn thì thêm vào `THEM_CAM` rồi `node tools/ra-su-kien-pham.js --write`.

### Bài kiểm
- Mới: `lt_pham`, `lt_doi`, `nhu_cau`, `shop_pham`, `su_kien_pham` (test.js, đã thêm vào `test:rules`); test-ui `tien_trang` viết lại (Đổi linh thạch + Hiệu cầm đồ).
- Sửa theo luật mới: `tien_bac` (fmtBac xu/lượng; không còn tự đổi linh thạch), `tien_quan` (thiếu xu có linh thạch: không đổi), `tien_trang` (bỏ tiền trang → cầm đồ); test-ui `tien_hud` ("3,2 lượng"), `tien_quan` ("12 xu"), `muusinh` ("xu").
- `fresh()` đặt `FEAT.nc=0` (giá cố định cho bài cũ); `nhu_cau` bật lại.

### Còn dở / chưa làm
- Bot chưa biết đổi phẩm linh thạch, cầm đồ (chưa được phép chạy bot); chưa thêm vào `COV_FN`/`MANAGE`.
- Đấu giá (`di` daugia) và quỷ thị vẫn như cũ (trả linh thạch Hạ phẩm); chưa có nơi nào sinh Trung/Thượng/Cực phẩm ngoài đổi — phần thưởng phẩm cao chờ đợt sau.
- Ô 🪙 trên các nút quán vẫn chưa hiện nhu cầu (dịch vụ không theo nhu cầu).
19. Trắc ra Địa/Thiên linh căn ở tông môn/thế lực → tăng thiện cảm (giao tình) của người trong tông với nhân vật chính (Thiên tăng nhiều hơn Địa). Chọn ngẫu nhiên vài người trong cao tầng và vài đệ tử; ưu tiên người cùng phe chính/tà với tông (tông chính đạo → ưu tiên người chính đạo; tông ma đạo → ưu tiên người ma đạo). Làm cùng mục 18.
20. Mỗi khi NPC tăng/giảm thiện cảm: hiện chữ nhỏ ở GÓC TRÁI DƯỚI màn hình (nằm ngay phía trên footer, không chạm/đè footer), không khung/nền, biến mất nhanh. Nội dung: tên NPC + mũi tên kiểu chevron chồng (như ảnh người dùng gửi: 1–3 chữ V ngược xếp chồng). Tăng: mũi tên lên màu xanh (giống màu chỉ số tăng); giảm: mũi tên xuống màu đỏ (giống chỉ số giảm). Ít → 1 mũi tên, vừa → 2, nhiều → 3 (tự chọn ngưỡng). Nhiều NPC cùng lúc thì xếp dòng, không đè nhau. Làm ở đợt Sửa-D (giao diện).

## Sửa-B — bỏ cơm nhà, mua chịu, nợ, vay, nhà ở (câu 10)
Luật: `src/game/core2/44-no-nha.js`; bảng `NO`, `NHA` ở `content/rules/no-nha.js`; chữ `no.*`, `nha.*` trong `content/text/tien-te.json`. `39-tien-te.js` bỏ cơm nhà (ở quê mua cơm như ở quán).

### Số liệu đã chọn
1. **Tiền khởi đầu** (ăn thường 20 xu/ngày): khốn khó 150–300 xu, thường 300–700, khá giả giữ 5.000–20.000; khất cái 60–120. Đủ ăn khoảng 1–4 tuần, sau đó mua chịu ở quê hoặc làm thuê.
2. **Mua chịu**: chỉ ở nút quê (`r.queAt`), mọi khoản trả bằng `bacPay` (cơm, tạp hóa, quán) được chịu tới **−600 xu** (≈ 1 tháng cơm). Đã bị quan phủ phạt hoặc bị truy nã ở quê thì không ai cho chịu nữa. Tiền âm hiện "-50 xu", trên HUD tô đỏ. Có thu nhập thì tự trừ vào nợ.
3. **Sổ nợ** (`r.noTra`): mở khi tiền xuống dưới 0, hạn **60 ngày**, báo trước **10 ngày**. Quá hạn:
   - nợ dưới 3 lượng bạc: lần 1 đánh 20 hèo (−25% khí huyết tối đa, Ngoại thương); lần 2 đánh 40 hèo (−45%, Gãy xương) và **truy nã** (danh tiếng khu quê đẩy xuống −60, tức mức thị trấn ghét của Đ1.4); lần 3 bắt làm công.
   - nợ từ 3 lượng: lần 1 truy nã + hèo nhẹ; lần 2 bắt làm công.
   - Mỗi lần phạt gia hạn **45 ngày**. Làm công: **2 năm** (nợ dưới 8 lượng) hoặc **3 năm**; thời gian trôi, được ăn ở, không lạnh; ra thì nợ, khoản vay, nhà thuê đều xoá.
   - Tu sĩ (không phải ăn): quan phủ chỉ truy nã.
4. **Vay** (nút "Người cho vay" ở trấn, thành; nhóm Sự vụ): 1 lượng/6 tháng, 3 lượng/6 tháng (lãi 3%/tháng, trả 1.180 / 3.540 xu), 10 lượng/12 tháng (2,5%/tháng, trả 13.000). Một khoản một lúc; đang nợ hoặc bị truy nã thì không vay được; xuất thân khốn khó chỉ vay món nhỏ nhất. Báo trước 15 ngày; quá hạn thì toàn bộ số phải trả chuyển thành nợ (vào sổ nợ ở trên, bắt đầu lại 60 ngày).
5. **Nhà ở** (`r.nha`): có nhà ở quê trừ GD.none, nhóm khốn khó, đạo đồng, cựu binh, gánh hát. Nút "Nhà ở" (nhóm Nghỉ chân) ở quê (nếu có nhà) và ở trấn/thành: thuê **150 xu/tháng (trấn), 300 (thành)**, tự trả đầu tháng, thiếu tiền thì mất nhà; "Nghỉ ở nhà" 8 giờ hồi 30% khí huyết và tính cho HD06. Ngủ ở khách điếm (phòng/giường) tính có chỗ ngủ tới hôm sau; tông mình, bế quan, đang làm thuê có cơm cũng vậy.
6. **Ngủ ngoài trời**: từ 8 đêm/tháng thì bị lạnh (−8% khí huyết tối đa × số đêm/30), và bệnh với xác suất 15% + 35% × số đêm/30 (thêm −15%, tâm ma +5). Không bao giờ làm chết (khí huyết tối thiểu 1). Chỉ tính cho người phải ăn (phàm nhân, Luyện Khí).
7. **Bản lưu cũ** (`_nhaV1`): gán `r.nha` theo xuất thân; không có sổ nợ.
8. HUD: chú thích hầu bao thêm dòng nợ/hạn, khoản vay/hạn, nhà ở.

### Bài kiểm
- Mới: `no_nha` (test.js, đã thêm vào `test:rules`), test-ui `no_nha`.
- Sửa theo luật mới: `com_ao` (bỏ hai ý cơm nhà → mua chịu ở quê tới −600 xu rồi đói); test-ui `tinhtoa` cho 5.000 xu (tĩnh toạ dài ngày mà không cơm nhà thì chết đói); `tan_thu` mua món đầu tiên là đan hoặc vật phàm (thêm hai nơi chọn việc làm đổi lượt ngẫu nhiên nên tạp hóa có khi không bày đan).
- `fresh()` đặt `FEAT.no=0; FEAT.nha=0`; bài `no_nha` bật lại.

### Còn dở
- Bot chưa biết vay, thuê nhà (chưa được phép chạy bot).
- Chưa có sự kiện kể riêng cảnh quan phủ, làm công (chỉ thông báo + nhật ký); chưa có cách xoá truy nã ngoài danh tiếng.

## Sửa-C — các câu 1, 2, 6, 8, 11, 14, 18, 19

### C.1 — mốc bậc nghiệp (câu 1)
- `NQ_BAC` đổi `[0,3,15,50,100,200]` → **`[0,5,20,60,120,250]`** (cùng mốc cho nhãn `NQ_LV_G/B`). Một lần giết người vô tội (15) chỉ tới bậc 1 "Vướng nợ trần duyên"; tái phạm (30) mới bậc 2 và kiếp đổi Nghiệp Hỏa. Cứu một người (8) bậc 1, cứu ba người (24) bậc 2. Bậc 5 cần 250 (≈ 17 mạng người) nên chỉ kẻ ác thật mới "nghiệp hải".
- Các ngưỡng viết cứng 15/50 (Nghiệp Hỏa, lời báo kiếp, tuần tra bắt, thành tựu Thiện nhân/Ma đầu) nay đọc theo bậc (`ngBacB()>=2`, `>=3`).
- Bài kiểm: mới `nq_moc`; sửa `kiep_nghiep`, `hoancanh` theo mốc mới (B=100→120, 15→20, 200→250).

### C.2 — chính đạo chia mức (câu 2)
- DEED vốn đã chia theo loại việc: bố thí / phóng sinh / an táng = nhẹ (Hành Đạo 1, thiện duyên 1) < cứu người = vừa (3, 8) < cứu người phải hy sinh = nặng (8, 8). Giữ nguyên.
- 214 chỗ +4 cũ: 28 chỗ đã là `cuu_nguoi`/`cuu_nguoi_hy_sinh` (giữ); 185 chỗ còn lại chia theo **hy sinh/nguy hiểm thật** (bảng `HD_GIUP` ở `content/rules/hanh-dao.js`):
  - **nhẹ** `hd:{p:1}, ng:{g:1}` — 59 chỗ: một lời, một tay, chút pháp lực (20%), nửa ngày.
  - **vừa** `p:3, g:3` — 102 chỗ: bỏ từ 8 linh thạch, mất trọn ngày, chịu trách/bảo lãnh/bị phạt/mất quyền lợi; cùng 5 chỗ máy chấm nhẹ nhưng thật ra là giải cứu người (mở khoá cho người bị nhốt, ghìm kiếm, thú vương lui bầy…).
  - **nặng** `p:5, g:5` — 24 chỗ: mất từ 10% khí huyết, tổn tu vi, thọ nguyên, thể phách.
  - `tt_vua` (thu-trieu.json, chỉ có `hd`) giữ nguyên.
- Kết quả từng chỗ: `docs/thiet-ke/karma-muc-giup.csv`. Bài kiểm mới `hd_muc`.

### C.6 — đầu thai và lượt chọn lá số (câu 6)
- Đầu thai mặc định ngẫu nhiên (như cũ). **Được chọn 1 trong 3 lá số** (thêm một lượt `G.meta.pick`, tối đa một lượt mỗi lần chết) khi lúc chết có một trong các điều (bảng `DT_PICK`, `content/rules/sua-c.js`; hàm `dtPickWhy`):
  - đã tu công pháp **Luân Hồi Kinh** (học từ vật "Luân Hồi Kinh (bản chép)", dùng trong túi → tâm pháp bậc 1);
  - đã uống **Luân Hồi Đan** (đan mới, `PILL.luanhoi`, ghi `r.dtUsed`);
  - mang theo **Định Mệnh Châu** hoặc **Luân Hồi Ngọc Bội** (vật mới; mất khi dùng).
- Nguồn: Thưởng Các (bậc Kim/Huyền: đan 40, kinh 35, ngọc 55 Thưởng Lệnh, mỗi kiếp một lần); chợ phiên tu sĩ 8% mỗi đợt hàng bày một trong ba món (đan 120, kinh 110, ngọc 160 linh thạch). Phàm nhân không thấy ở chợ.
- Thiên mệnh kiểu mới (Đ2.5, kiếp chia hết cho 4 / 3) giữ nguyên. Pháp bảo/trang bị luân hồi riêng chưa làm (hệ pháp bảo nằm trong danh mục tự sinh) — Ngọc Bội tạm đóng vai "vật đặc biệt".
- **Linh căn luôn ẩn tới khi trắc, kể cả kiếp đầu** (`rootKnown=0` mọi kiếp); màn chọn lá số luôn ghi "Chưa trắc". Bản lưu cũ đang chơi giữ nguyên trạng thái (`_rkV1`).
- Bài kiểm: mới `dt_chon`; sửa `trac_linh` (kiếp đầu cũng chưa trắc). `fresh()` đặt `rootKnown=1` để bài cũ như đã trắc.
- Sửa bài lúc đạt lúc trượt gặp khi chạy: `tien_thuong` (15% phục kích ở cửa nhiệm vụ "đến nơi" — chặn bằng `ambDoor=1`), `tien_bac` (mức tiền "thường" vẫn ghi 500–1.500 của Đ3, Sửa-B đã đổi 300–700 × hoàn cảnh).

### C.8 — tuổi già theo tỉ lệ (câu 8)
- Già khi tuổi ≥ **70% thọ nguyên** (`GIA.tu`; có tuế biến Trường thọ thì muộn 10%) — mọi người như nhau, bỏ mốc "phàm nhân/vô căn từ 50 tuổi" của Đ2.7. Thọ nguyên tăng (đột phá, Diên Thọ Đan) thì có thể hết già.
- Tác hại (bảng `GIA`): khí huyết tối đa **−10%**; công, pháp công, né **−1%**; phòng, bạo kích **−0,5%**; **không giảm** linh lực, thân pháp gốc, ngộ tính, tâm cảnh, khí vận, thần thức. Trong trận né và đỡ tốn thêm **5 thể lực** (chỉ nhân vật chính; `tlD(u)`/`tlB(u)` thay hằng số `TL_DODGE/TL_BLOCK` ở 07, 08, ui/11, TranDau.jsx).
- Bỏ "già dần" từng năm của Đ2.7 (khí huyết −1%/năm, thân pháp −1/3 năm); bệnh già từ 85% thọ vẫn giữ. Bản lưu cũ (`_giaV1`) xoá `tue.sum.hpOld/tpOld`.
- Vừa già: một dòng nhật ký + thông báo (`gia.on`).
- Bài kiểm mới `gia`.

### C.11 — săn bắt, hái lượm có hạn (câu 11)
- Nút mới **"Săn bắt, hái lượm"** ở mọi nút hoang dã (nhóm Hoang dã): 4 giờ, được **1–3 ngày lương thực** (cộng vào `r.anLk`, ăn dần như lương khô khi không có quán), 25% nhặt thêm 1 thảo dược. Mỗi nút **6 lượt mỗi năm** (`SAN.hai`), hồi lại đầu năm (đếm `n.sb={y,k,c}` theo năm và kiếp); hết thì nút mờ "hết năm nay".
- Săn yêu thú vốn đã giới hạn 3 lượt/nút/năm; nay đọc từ `SAN.san` (vẫn 3). Hái thuốc / đào khoáng giữ 2 lượt/tháng (vật liệu, không phải cái ăn).
- Bài kiểm mới `san_bat`.

### C.14 — tân thủ: trạng thái tự xong, thao tác phải làm (câu 14)
- Nhiệm vụ **sở hữu / đạt trạng thái** (có `st`, đã có thì "Nhận thưởng" ngay khi mở): HD09 (có công pháp/tâm pháp — bỏ so với số lúc sinh), HD10 (binh khí + đan cầm máu), HD15 (có một mối quan hệ — thêm), HD17 (đã có vai), HD18 (đã có nguyện vọng), HD19 (đã Luyện Khí), HD21 (đầy lịch luyện), HD24 (có linh thú — thêm, lời đổi "Có một linh thú bên mình"), HD27 (đã Trúc Cơ).
- **Thao tác cốt lõi / đếm số lần** (chỉ `tick`, chỉ đếm sau khi nhiệm vụ mở): mọi nhiệm vụ còn lại; HD12 chữa thương bỏ phần tự tính (trước tính "từng bị thương rồi lành") — phải chữa thật; HD11 săn 5 lần, HD23 bế quan 30 ngày đếm lại từ đầu.
- Bài kiểm mới `tut_loai`.
