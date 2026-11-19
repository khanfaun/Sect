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
- Xong: Đ0, Đ1, Đ2, Đ3, Đ4, Đ5 (Đ5.1–Đ5.5), Đ6 (Đ6.1–Đ6.4, cải tạo linh căn), Đ7 (Đ7.1–Đ7.4, nghề tu lõi và nghề phàm), Đ8 (Đ8.1–Đ8.7: neo, vai, thế lực, đồng hồ, luân hồi, đất ma — xem mục Đ8 và BẢNG MÃ); các đợt sửa theo câu người dùng chốt: Sửa-A … Sửa-M.
- Xong thêm: Đ9.1 (bộ máy tuyến, schema, công cụ kiểm `npm run content:tuyen`, tuyến mẫu OR01, bài `menh_tuyen`) và Đ9.0 (docs/content/HUONG-DAN-GPT-VIET-TUYEN.md) — xem mục Đ9.1 cuối tệp.
- Xong Đ9 (Đ9.1–Đ9.4): 45 tuyến xuất thân + 9 đại lộ (GPT viết) đã ghép và rà bằng mô phỏng; thẻ Mệnh thư, Người đã gặp, Thế lực trong Sổ tay; bài `menh_tuyen_d94`, `tuyen_ra_soat`, `so_tay_nv` — xem mục "Đ9.2–Đ9.4" cuối tệp.
- Tiếp theo: Đ10. GPT sửa lời văn theo docs/content/GUI-GPT/sua-sau-ra-soat.md (không gấp).
- Bot chưa được chạy cho các hệ mới (chờ người dùng cho phép).

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

### C.18–19 — trắc ra Địa / Thiên linh căn (câu 18, 19; làm chung một commit vì câu 19 ghi "làm cùng mục 18")
- **Linh căn mới "Địa linh căn"** (`dia`, hệ số tu ×1,5, hai hệ là một cặp tương sinh: kim–thủy, thủy–mộc, mộc–hỏa, hỏa–thổ, thổ–kim); tôi thể +5, tư chất +13. Game trước chưa có Địa linh căn.
- Bảng `ROOT_W1` (tổng 100): tạp 20,389 · tứ 27 · tam 32 · song 18 · biến dị 2,5 · **cực 0,01 (~1/10.000)** · **Địa 0,1 (~1/1.000)** · **Thiên 0,001 (~1/100.000)**. Trước: Thiên 4,75%, biến dị 5%, cực 0,25%. Khí vận ép linh căn (TT_FORCE, Hỗn Nguyên) vẫn như cũ.
- **Dị tượng** (mọi cách trắc — đều đi qua `tlResult`): đặt `r.tlFx`; `ui/28-trac-linh-fx.js` chặn mọi hộp thoại/bảng, gắn `data-asc` + `data-tlfx` để ẩn thanh trên, chân trang, biểu tượng, kỳ ngộ, thông báo; vẽ `HopThoai:tlfx` (`src/react/hop-thoai/TracLinh.jsx`): nền loang, cột sáng phóng lên trời, tia sáng, vòng sóng, rung màn, chữ hiện dần. **Địa: tím, 6,5 giây, 10 tia, 2 vòng**; **Thiên: cam vàng, 11 giây, 24 tia, 4 vòng, cột sáng rộng gấp đôi, chói hơn**. Hết giờ tự đóng (`ACT.tlFxDone`), hộp kết quả trắc linh mới hiện. Tắt hiệu ứng (`CFG.anim=false`) thì 0,3 giây.
- Lời kể riêng (`content/text/sua-c.json`, `tlfx.dia.*` 5 dòng, `tlfx.thien.*` 7 dòng), có thêm dòng tông môn khi trắc ở sơn môn (trưởng lão kinh động; Thiên: chưởng môn phá quan, chuông 36 hồi). Ghi nhật ký + tiểu sử.
- **Câu 19 — tông kinh động** (`tlSectFav`, bảng `TL_FX`): khi đang đứng ở sơn môn, hoặc trắc qua "Sơn môn tuyển đồ" (lấy sơn môn gần nhất). Địa: 1 cao tầng +15, 2 đệ tử +10, hảo cảm chung tông +5. Thiên: 3 cao tầng +30, 4 đệ tử +20, tông +12. Ưu tiên người cùng phe với tông (tông chính/Phật → đệ tử tính "nghĩa"; tông ma → tính "hiểm"; tông trung lập không ưu tiên), cùng nhóm thì ngẫu nhiên. Tông chưa đủ đệ tử có tên thì sinh thêm đệ tử mới (bản ghi NPC thuộc tông). Thêm chip "… kinh động" (chú thích ghi tên người).
- Bài kiểm: mới `tl_hiem` (test.js), `tlfx` (test-ui: ẩn giao diện, lời kể, tự đóng, hiện lại; kèm nút săn bắt của C.11).

## Sửa-D — giao diện (câu 16, 20) và bài tien_bac

### D.1 — chú thích lệch ở máy tính (câu 16)
- **Nguyên nhân**: trên máy tính `#tip` bị phóng bằng CSS `zoom:var(--dz)` (1,05–2,2 theo độ phân giải) nhưng `left/top` vẫn gán theo toạ độ chuột thật; vì `left/top` của phần tử đã phóng bị nhân thêm `dz` nên chú thích lệch `(dz−1)` × toạ độ (càng xa góc trên trái càng lệch; mọi tab dùng chung `tip()` đều bị, tab Căn cơ lộ rõ nhất).
- **Sửa** (`ui/20-chu-thich.js`): đo kích thước bằng `getBoundingClientRect` (khung nhìn thật), gán `left/top` chia cho hệ số zoom (`tipSet`). Chạm và chuột dùng chung nên cùng được sửa.
- Bài kiểm test-ui `tooltip_vitri` (1440×900, 1920×1080, 1280×720): chú thích cách con trỏ ≤ 40px, không tràn màn, kiểu chạm cách phần tử < 40px, các tab Túi/Sổ học cũng đạt (trước sửa trượt 5 ý).

### D.2 — chữ nhỏ báo thiện cảm (câu 20)
- `ui/29-thien-cam-chu-nho.js` (`favPop`): bọc `favAdd` (cửa chung của thiện cảm NPC) + đối thủ (`rv.rel` trong `applyE`, ×10 như `favOf`). Chữ không khung/nền ở góc trái dưới, nằm ngay trên chân trang (tính từ mép trên `#nav`/`#dock` thật), tan sau ~1,95 giây, tối đa 5 dòng xếp chồng. Mũi tên dùng lớp `.chev` có sẵn (xanh `#2f9a4e` tăng, đỏ `#c0392b` giảm).
- **Ngưỡng** (theo độ lớn thay đổi thật sau khi chặn −100…100): 1–3 điểm = 1 mũi, 4–9 = 2 mũi, từ 10 = 3 mũi. Nhật ký `thiencam.hien`. Bài test-ui `thiencam_chu`.

### D.3 — tien_bac
- Bài đã ghi mức khởi đầu Sửa-B (nông 225–875 xu, khất cái ≤ 300, thế gia ≥ 5.000) từ đợt Sửa-C; chạy riêng 28 lần đều đạt, không phải sửa thêm.

## Đ5 — võ học, khung nghề, năm nghề phàm, năng lực hỗ trợ ST23

### Đ5.4 — năng lực hỗ trợ ST23
Luật `src/game/core2/46-nang.js`; bảng `NANG_K`, `NANG_GOC`, `NANG_MAX`, `NANG_MUC`, `NANG_NGHE`, `NANG_GAIN` ở `content/rules/nang.js`; chữ `content/text/nang.json`.
1. `r.nang={giac,giao,thuong,canh,duoc,khao,tu,nhan}` thước 0–100, gốc 10, không theo cảnh giới, không truyền kiếp. "Tự nhận thức" (ST23G) gọi ngắn là **Tự chủ**.
2. **Phép thử**: `chk:['nang.<khoá>',độ khó]`, cùng thang với tp/ngo/tam: 0,5 + (năng lực − độ khó) × 0,05 (+ khí vận), kẹp 0,08–0,95; không cộng độ khó theo cảnh giới. Tên ở `CHKN['nang.<khoá>']`.
3. **Rèn**: qua phép thử +1 (hỏng +0,5); mỗi việc nghề +0,3 cho năng lực của nghề (nông: nhẫn nại; ngư: nhẫn nại, giác quan; thương: thương lượng, giao tế; võ gia: cảnh giác; y: nhận dược, khảo vật); săn hái +0,3 giác quan, +0,21 nhận dược; mua ở tiệm / bán đồ +0,2 thương lượng; tĩnh tọa +0,3 tự chủ; tặng lễ +0,4 giao tế. Hiệu ứng sự kiện `nang:{khoá:số}`.
4. **Hiện bằng chữ** (không hiện số, theo câu 5): Vụng / Tầm thường / Khá / Thạo / Lão luyện / Xuất chúng / Đăng phong tạo cực (ngưỡng 0, 8, 20, 35, 55, 75, 95). Danh sách ở thẻ Đạo đồ của bảng nhân vật; lên mức thì báo nhỏ.
5. 16 lựa chọn trong sự kiện năm nghề đổi từ tp/ngo/tam sang năng lực hợp nghĩa (mặc cả → thương lượng, nói phải trái → giao tế, tự uống thử thuốc → nhận dược…). Nhẫn nại, tự chủ gốc 10 nên độ khó giữ nguyên.
6. Bản lưu cũ: thiếu/hỏng thì tạo gốc 10, kẹp 0–100.
7. Bài: `nang` (test.js), test-ui `nghe` thêm dòng Đạo đồ có năng lực.

### Đ5.5 — rà chéo đợt 5
Sửa ở `src/game/core2/47-ra-cheo-d5.js` (trừ chỗ ghi khác).
1. **Tặng lễ của phàm nhân** trước đòi linh thạch (phàm nhân không có): nay trả xu = giá linh thạch × `TIEN.evXu` (cùng quy đổi với sự kiện phàm), không mua chịu; tu sĩ vẫn trả linh thạch. Chú thích nút Tặng lễ (ui/17) ghi đúng loại tiền (`giftTxt`).
2. **Vốn buôn** (nghề thương, việc có vốn): trước có thể lấy tiền mua chịu ở quê làm vốn, khi đang nợ thì vốn âm và "lãi" làm nợ tăng. Nay phải có đủ tiền thật (`ngWhy`).
3. **Tân thủ**: nút đi tới nhiệm vụ không chặn khi đang trong kỳ ngộ (loại cảnh là `kyngo`, trước chỉ kiểm `ky`) — đã thêm. Chữ viết cứng ở ui/26-tan-thu.js chuyển vào `content/text/tan-thu.json` (`tut.title`, `tut.ban`, `tut.khongNoi`); chip giờ săn hái dùng `durH`.
4. **test:rules** trước thiếu các bài `ctxt vo_dao nghe nghe_pham` (đều qua) — đã thêm cùng `nang`, `ra_cheo5`.
5. Đã rà, không phải sửa: võ học không tốn tiền (luyện võ, lôi đài); bí tịch võ ở tạp hóa thành bán bằng xu, không tính vào giới hạn đồ tu sĩ; tiền công nghề cộng qua `bacAdd` nên tự trừ nợ; việc nghề kiểm `bacCan` (có mua chịu) cho chi phí thường; HD13 tính cả luyện võ (`tick:'train'`), HD17 tính nghề / võ học (`tutRole`); kiếp mới đặt lại `paths`, `vo`, `voSk`, `voHoc`, `nang`; già (Sửa-C.8) chỉ giảm chỉ số chiến đấu, không đụng năng lực; chuỗi bọc `chkChance` (18 → 46) và `choose` (18 tạm thay `chkChance` rồi trả lại) vẫn đúng thứ tự.
6. Còn dở: bot chưa biết năng lực/nghề mới (chưa được chạy bot); năng lực chưa ảnh hưởng giá mua bán (thương lượng) — để đợt cân bằng sau; dịch vụ quán vẫn không theo nhu cầu (như Sửa-A).

## NGƯỜI DÙNG CHỐT ĐỢT 2 (câu 16–24) — làm trước Đ6
16. Nhu cầu KHÔNG áp vào giá quán (trọ, ăn, trà).
17. Cầm đồ trả quá thấp: vũ khí phàm ~10 lượng bạc; pháp bảo/đồ tu sĩ định giá bằng linh thạch (không ra tiền phàm rẻ mạt). Rà lại hiệu cầm đồ/giá bán đồ.
18. Nguồn linh thạch phẩm cao:
   - Tông môn: sự kiện lớn của tông (thi đấu/đoạt giải) → tối đa Trung phẩm.
   - Bí cảnh: chủ yếu Hạ/Trung; Thượng rất hiếm; Cực rất rất hiếm.
   - Đấu giá thường: bán đồ lấy Hạ/Trung.
   - Hội đấu giá ngầm/"Quỷ thị đấu giá" (tên kiểu tiên hiệp, tự chọn; nối với quỷ thị/chợ đen có sẵn): đổi vật lấy thứ mình muốn, có thể yêu cầu Thượng/Cực phẩm.
   - Cực phẩm nhiều nhất trong kỳ ngộ cơ duyên.
19. Đói: trong lúc hấp thụ linh khí (bế quan) đói chậm hơn; sau bế quan có hiệu ứng đói chậm trong X thời gian (tự chọn). Tĩnh toạ thì không. Thêm Tích Cốc Đan cho tu sĩ Trúc Cơ trở lên (no trong X thời gian). LƯU Ý: Sửa-A/Đ3 đang cho Trúc Cơ+ không cần ăn — đổi lại: Trúc Cơ+ vẫn đói nhưng rất chậm (tự cân), để Tích Cốc Đan có ý nghĩa; ghi rõ lựa chọn.
20. Cho trả trước một phần nợ ở người cho vay.
21. Giữ Địa linh căn (2 hệ tương sinh, ×1.5).  22. Giữ.
23. Năng lực thương lượng giảm giá tiệm ít: vật 100 xu giảm ~3–5 xu (tối đa ~5%).
24. CHỐT: năng lực giữ hiện bằng chữ (7 mức).

## Sửa lỗi đói — chết đói quá nhanh (người dùng báo: vào game đi 2 bước đã chết)
Luật: `src/game/core2/39-tien-te.js` (phần Đ3.6); bảng `AN` ở `content/rules/an-uong.js`; chữ `an.*` trong `content/text/tien-te.json`; HUD `src/react/ban-do/Hud.jsx`.

### Nguyên nhân
- Phàm nhân đi bộ rất chậm (`walkSpeed` ≈ 0,16–0,18 ô/giờ): nút gần nhất cách quê **35–85 ngày** đường (đo 3 kiếp mới: 844, 2.069, 1.406 giờ).
- Đang đi đường (`r.moving`) thì không mua được cơm dù có tiền (chỉ ăn ở quán/quê khi đứng yên).
- Mốc cũ chết đói ở **ngày 15** → chưa tới nút đầu tiên đã chết. Tiền/mua chịu không sai.

### Số liệu mới (đếm theo "bữa" = một ngày ăn bỏ lỡ liên tiếp, `r.doi`)
- 7: báo thiếu ăn (chưa ảnh hưởng). 30: **Đói** (hồi phục −25%). 90: **Đói lả** (khí huyết tối đa −15%). 180: **Kiệt sức** (−30%, hồi phục −50%, mất 0,5% khí huyết/ngày nhưng không chết vì thế). 330: báo **sắp chết đói**. **365: chết đói** (≈ 1 năm nhịn hoàn toàn).
- Nhịp đói (phần ăn mỗi ngày): phàm 1; Luyện Khí ½; **Trúc Cơ+ 1/60** (vẫn đói nhưng rất chậm — đổi so với Sửa-A "không cần ăn"; HUD chỉ hiện khi đã thiếu ≥ 7 bữa). Bế quan ×⅓; xuất quan đói ×½ trong **90 ngày** (`r.anCham`). Tĩnh toạ không giảm.
- Chi phí theo tháng: ở quán/quê có đủ tiền thật thì mua một lần lương thực **cả tháng** (30 × giá ngày: đạm bạc 360, thường 600, khá 1.200 xu), mang theo người (`r.anCov`) nên đi đường vẫn ăn. Không đủ tiền thì mua từng ngày; mua chịu ở quê vẫn tính từng ngày tới −600 xu. Lương khô, săn hái giữ nguyên.
- Bỏ gộp tháng `anMonthBulk` (lặp từng ngày đủ nhanh); `AN.maxNgay` chỉ còn dùng cho nhà ở.
- Bản lưu cũ (`_anV2`): đang đói thì đặt `doi=0`, `anPart=0`.
- Tích Cốc Đan: chưa làm (để Sửa-E).

### Bài kiểm
- `com_ao` viết lại theo mốc mới (14 ngày sống, 30 đói, 90 lả, 364 sống, 365 chết; Trúc Cơ 100 ngày ≤ 2 bữa; mua cả tháng; bế quan ×⅓; sau bế quan ×½; bản lưu cũ). Bài mua chịu đổi từ số cứng 20 xu/ngày sang `anCost` (hệ số thể chất làm giá 23 xu).
- Mới `doi_dai` (thêm vào `test:rules`): khốn khó không tiền đi bộ 3 chặng (141, 88, 100 ngày) vẫn sống; 4 tháng ở hoang → đói lả, còn sống; ăn một bữa hết đói.
- test-ui `an_hud`: đặt `doi=90` (mốc đói lả mới thay cho 3).

- Chỉnh theo người dùng ("vẫn hơi khó"): mốc đói giãn ra — thiếu ăn (cảnh báo đầu) 30, đói 60, đói lả 150, kiệt sức 300, báo sắp chết 630, chết 660 ngày.

## Sửa-E — câu 16, 17, 18, 19, 20, 23 (đợt 2)
### E.16 — giá quán không theo nhu cầu
- Đã kiểm: dịch vụ quán (khách điếm, trà lâu) lấy giá cố định `bac` trong `content/venues/services.json` (39-tien-te.js), không gọi `ncGet`. Giữ nguyên. Bài mới `quan_nc`: ép nhu cầu ×1,4 thì giá quán vẫn y nguyên.

### E.17 — hiệu cầm đồ, giá bán đồ
Luật `src/game/core2/48-sua-e.js` (ghi đè `camDo` và danh sách cầm của 43-tien-te-2.js); bảng `SUAE.cam`, `SUAE.vk` ở `content/rules/sua-e.js`.
1. **Đồ phàm trả xu** (không giới hạn số món/tháng), × nhu cầu `cam` của nơi đó: Thiết kiếm 10.000 xu (10 lượng bạc), Cương đao 9.000; Kim sang dược 60 (mua 120), Hương an thần 30 (mua 60), Lương khô 35 (mua 70); bí tịch võ phàm = ½ giá mua ở tạp hóa (Trường Quyền 300, Hỗn Nguyên 450). Trắc Linh Thạch, kỷ vật truyện không nhận.
2. **Đồ tu sĩ (pháp khí, đan) trả linh thạch Hạ phẩm** = 0,6 × giá bán ở tiệm tu sĩ × nhu cầu, tối thiểu 1 viên; vẫn 1 món/tháng/nơi. Không còn trả tiền phàm rẻ mạt (trước 200 xu/linh thạch). Linh thạch vẫn không đổi ra tiền phàm, hiệu không nhận linh thạch.
3. **Binh khí phàm mới** (vật trong túi, `content/catalog/qitems.json`): Thiết kiếm (công +10% cho phàm nhân đang mang), Cương đao (+8%); chỉ món tốt nhất tính; tu sĩ không được gì. Tạp hóa thành bày 1 món mỗi tháng (giá 14.000 / 12.000 xu × nhu cầu) — mua rồi cầm lại lỗ ~30%.
4. Rà món phàm khác: giá mua ở tiệm giữ nguyên (thuốc 60–120 xu, bí tịch 600–900 xu, Trắc Linh Thạch 9.900); giá cầm lấy khoảng nửa giá mua, binh khí là món đắt nhất của người phàm. **Hỏi lại**: bí tịch võ 600–900 xu có rẻ quá so với binh khí 10 lượng không.
5. Bài: mới `cam_e`; sửa `tien_trang` (cầm pháp khí ra linh thạch); `nhu_cau` đẩy nhu cầu 0,4 thay 0,2 cho khỏi lệch do làm tròn giá nhỏ.

### E.18 — nguồn linh thạch Trung / Thượng / Cực
Luật `48-sua-e.js`; bảng `SUAE.ltRoll`, `SUAE.dg`, `SUAE.am`. Hiệu ứng sự kiện mới: `ltRoll:'<bảng>'` (lăn bảng), `lt:[Trung,Thượng,Cực]` (cộng thẳng), `dgBan:1` (gửi bán ở đấu giá) — đã thêm vào bộ kiểm nội dung. Phàm nhân không nhận linh thạch từ các nguồn này.
1. **Tông môn đại bỉ** (`dai_bi`, thắng): thêm 10–30 Hạ (× hệ số vùng) và 40% được 1 Trung phẩm. Không bao giờ ra Thượng/Cực.
2. **Bí cảnh** (`bi_canh`, hai kết quả thắng thủ hộ thú / vườn thuốc): 15–50 Hạ; 35% 1–3 Trung; 3% 1 Thượng; 0,3% 1 Cực. (đo 4.000 lần: 1.411 lần có Trung, 105 Thượng, 13 Cực)
3. **Kỳ ngộ**: cơ duyên lớn (trả giá) 35% 1–3 Trung, 12% 1–2 Thượng, **4% 1 Cực** (nơi ra Cực nhiều nhất); hữu duyên 15% / 4% / 1%. Kỳ ngộ vớ vẩn và hộp thoại `sp` không tính. Cộng sau khi chọn (bọc `kyPick`).
4. **Đấu giá thường** (`dau_gia`): lựa chọn mới "Gửi bán một món" — bán món giá trị nhất trong túi được 1,5 × giá tiệm tu sĩ, cứ đủ 100 Hạ thì trả bằng 1 Trung (tối đa 5 Trung). Không có gì thì chỉ báo.
5. **U Minh Ám Hội** (hội đấu giá ngầm trong quỷ thị): nút ở nhóm Mua bán, chỉ ở thành / thành ma tu, lúc quỷ thị mở (21h–5h), tu sĩ mới vào. Mỗi tháng mỗi nơi 1 giao dịch, đổi vật lấy vật:
   - giao pháp bảo phẩm t ≥ Bảo phẩm → đòi (t − 1) Thượng phẩm; Tiên phẩm → có thể đòi 1 Cực phẩm;
   - đưa 3 Thượng phẩm → 1 pháp bảo cao hơn vùng 2 phẩm; đưa 1 Cực phẩm → 2 viên đan quý (Tẩy tủy / Phá cảnh).
6. Khung tối thiểu, còn dở: chưa có sự kiện kể riêng cho Ám Hội (chỉ lời vào cửa), chưa nối với sự kiện `quy_thi` (đổi thọ nguyên giữ nguyên); đấu giá chỉ ra Trung khi món đáng ≥ 100 Hạ (đồ vùng thấp thường chỉ ra Hạ).
7. Bài: `lt_nguon`.

### E.19 — đói khi bế quan, Tích Cốc Đan
1. Đã kiểm (có sẵn từ "Sửa lỗi đói", 39-tien-te.js): đang bế quan nhịp đói ×⅓; xuất quan ×½ trong 90 ngày (`r.anCham`); tĩnh toạ không giảm. Trúc Cơ+ vẫn đói nhưng rất chậm (1/60 bữa mỗi ngày) — giữ lựa chọn này.
2. **Tích Cốc Đan** (`tich_coc_dan`, vật dùng trong túi): chỉ Trúc Cơ trở lên dùng được (phàm nhân, Luyện Khí bị từ chối, giữ lại viên đan). Dùng thì hết đói ngay và **no 1.095 ngày (3 năm)**, cộng dồn nếu dùng tiếp (`r.tichCoc` = giờ hết no; bản lưu cũ không có thì coi như 0). Trong thời gian no nhịp đói = 0.
3. Bày ở nơi bán đồ tu sĩ: chợ phiên tu sĩ, phường thị trong thành, bảo khố tông mình — 2 viên mỗi lần bày, giá `price(8)` linh thạch Hạ phẩm × nhu cầu (vùng 1 ≈ 3 viên). Không bán bằng tiền phàm. Mua vật trong túi bằng linh thạch là đường mới (bọc `buy`).
4. Bài: `tich_coc`.

### E.20 — trả trước một phần khoản vay
- Ở "Người cho vay", khi đang có khoản vay: thêm các lựa chọn "Trả trước một phần" 200 xu, 1 lượng, 3 lượng (chỉ mức nhỏ hơn số còn phải trả) và **một nửa** số còn lại. Phải có đủ tiền thật (không mua chịu). Số phải trả giảm đúng số đã trả; lãi đã tính và hạn **giữ nguyên** (không giảm lãi khi trả sớm). Vẫn còn nút trả hết như cũ. Bảng `SUAE.traTruoc`.
- Bản lưu cũ: khoản vay cũ `r.vay` dùng được ngay. Bài: `vay_tt`.

### E.23 — thương lượng giảm giá tiệm
- Giá hàng tiệm (tạp hóa, phường thị, chợ, bảo khố; cả giá xu lẫn linh thạch) × (1 − giảm), giảm = 5% × (thương lượng − 10) / 90, kẹp 0–5% (`SUAE.mac`). Gốc 10: không giảm; Thạo (35) ≈ 1,4%; Lão luyện (55) 2,5%; Xuất chúng (75) ≈ 3,6%; 100: 5% (vật 120 xu còn 114). Tính lại mỗi lần mở tiệm. Không áp vào quán, cầm đồ, đổi linh thạch.
- Năng lực vẫn hiện bằng chữ (câu 24). Bài: `mac_ca`.

### E — kiểm và còn dở
- `npm run test:rules`: tất cả đạt (604 dòng ✓, sau E.23); `npm run build` rồi `node tools/test-ui.js`: tất cả đạt (150 dòng ✓). Bài mới: `quan_nc cam_e lt_nguon tich_coc vay_tt mac_ca` (đã thêm vào `test:rules`).
- Giữ nguyên theo câu 21, 22, 24: Địa linh căn 2 hệ ×1,5; nhiệm vụ "có công pháp" tự xong; năng lực hiện bằng chữ.
- Còn dở: bot chưa biết cầm đồ mới, Ám Hội, Tích Cốc Đan, trả trước (không được chạy bot); Ám Hội chưa có sự kiện kể riêng.

## Đ6 — cải tạo linh căn (HN A.3, C §5.3)
Luật: `src/game/core2/49-cai-can.js` (số 41 đã dùng cho võ đạo nên lấy số tiếp theo); bảng `CAI_CAN`, `CC_VT`, `CC_CFG` ở `content/rules/cai-can.js`; chữ `content/text/cai-can.json`; Sổ tay thẻ "Cơ duyên" ở `src/react/bang/SoTay.jsx`.

### Bộ máy (Đ6.1)
- Mỗi đường là chuỗi bước: `proof` (kiểm chứng đủ các đầu mối; có lựa chọn "mua của kẻ bán ngoài chợ" là đồ giả: mất tiền, không tiến) · `tranh` (người tranh giành: thương lượng/trả tiền/liều/cưỡng đoạt có nghiệp, hoặc nhường) · `gain` (gom vật tư: mua, làm công đổi, hoặc tự chế theo công thức phụ) · `serve` (phục vụ/khổ luyện từng tháng; có thể bao cơm, có rủi ro, có thể trả tiền thay) · `grow` (vườn CC03: năm năm, mỗi năm phải về chăm một lần) · `rite` (nghi thức).
- Mọi việc làm ở hộp **Cơ duyên** (venue `coduyen`, nhóm "Việc khác") tại nơi neo. Nơi neo chốt **một lần cho cả thế giới** (`W().ccSrc[id].node`): nút có `anchor===LOC..` nếu Đ8 đã gắn; chưa có thì chọn ngẫu nhiên theo loại nút ưu tiên (và tên nút, vd chùa có chữ "Tự") — không dùng "nút gần nhất" vì nó đổi theo chỗ người chơi đứng. Vật tư ở nơi khác (Mảnh Sao Hạ ở LOC04, Mảnh Sao Thượng ở LOC15) có nút riêng `W().ccVtN`.
- `r.cc={id,s,t0,pf,h,care,lua,wait,alt}`; mỗi lúc một đường; `r.ccOk=1` sau một lần thành (cả đường nâng phẩm cũng tính); `r.ccFail[id]` đường đã hỏng/bỏ/nhường trong kiếp; hỏng xong chờ `CC_CFG.cho`=1 năm mới bắt đầu đường khác.
- Nguồn thế giới `W().ccSrc[id]={con,hoi,node,el,bloomY,by}`: lấy xong (người chơi, nhường, hay người khác) `con=0`, `hoi`=năm hồi hoặc −1 (độc nhất). Mỗi năm mỗi nguồn còn có 2% bị người khác dùng mất (nguồn độc nhất 0,5%), ghi vào biên niên. Thế giới sống qua các kiếp nên chết đi không làm nguồn sinh lại. CC06 chốt hệ của linh thú, CC08 chốt loại sao (Băng/Phong/Lôi) lúc tạo nguồn.
- Nghe dấu vết: mỗi tháng người vô căn **đã trắc** 20% nghe một đường (tu sĩ 3% nghe đường nâng phẩm), hoặc tự tới nơi "Hỏi chuyện lạ quanh đây" (2 giờ). Túc căn: có vật bản mệnh thì nghe ngay (giấc mơ).
- Trước nghi thức, hộp xác nhận ghi bằng chữ: được gì, khả năng ("bảy phần thành, ba phần hỏng" — làm tròn xuống), cái giá (thọ, suy nhược, nghiệp), hỏng thì sao, vật liệu chính mất; thọ còn lại không đủ thì **cảnh báo, không chặn** (HN C: không tự từ chối quyền mạo hiểm đã giải thích). Được bỏ đường bất cứ lúc nào trước nghi thức.
- Thành: `r.root={id,els,q}`, `rootKnown=1`, `r.pham` giữ nguyên (vẫn phải dẫn khí), `dbg('cc.ok')`. Hỏng: hậu quả theo bảng (`bon.hpP` vĩnh viễn, `r.ccHau` suy nhược có hạn cộng vào `aggFx`, mất thọ qua `lifeAdj`, thương thế, chết `die('caican')`, mất một bậc nghề/võ).
- Sổ tay thẻ "Cơ duyên" chỉ hiện khi đã nghe dấu vết: đường đang theo, bước, lời gợi ý (chữ; chỉ thời gian còn lại là số), vật tư đang có, các dấu vết đã nghe. Bot: `ccStart/ccDo/ccRite` vào `COV_FN`, thêm `MANAGE.caican` (chưa chạy bot).

### Quyết định tự chọn
1. **Giá chia ba** so với giá "đồng" của HN, giống thu nhập nghề (nghe.js ghi "đã chia ba"): Hộ Mạch Tán 400 xu, Mạch Thảo 100, Cam Thạch Phấn 70, năm vật dưỡng mạch 700 (hoặc 30 ngày làm công), Bộ Chống Sập 4.000, đội thợ 20.000 (hoặc 120 ngày làm công rủ cộng sự), Hộ Tâm Cao 700, Bộ Cách Nhiệt 2.000, giữ lửa 1.700 (hoặc 60 ngày làm lò), khế 7.000, bộ cấy 10.000 + thầy 13.000, mảnh sao trung 5.000 (hoặc 60 ngày chép sổ), vận hành trận 17.000. Bếp thuốc 33 xu/ngày. Tạo Hóa Thần Dịch 20 linh thạch Hạ phẩm (đường của tu sĩ).
2. **Hai đường người lao động**: CC01 (18 tháng cứu dịch, bao cơm, viện cấp ba Hộ Mạch Tán khi xong — người không tiền vẫn đi được); CC03 (120 ngày sửa kênh đổi quyền dùng vườn, năm vật dưỡng mạch mua hoặc làm công, nuôi năm năm phải về chăm mỗi năm). Không đòi đánh thắng tu sĩ.
3. "Thể lực 40/100" của HN đổi thành thể phách ≥ 4 (gốc là 5) và không trọng thương; "luyện thể bền bỉ" (CC04) = võ học bậc 1; Tẩy Tủy cũng cần võ học bậc 1.
4. Kết quả theo bảng linh căn A.2: LC01=tap, LC04=song, LC05=thien (một hệ), LC06=bien. CC07 (vay căn) không có người cho cụ thể nên rút ngẫu nhiên tạp/tứ/tam/song phẩm Thường.
5. CC08 "di vật ký ức" chưa có (Bến Vong Xuyên chưa có ký ức kỹ năng): đổi thành điều kiện **có một nghề hoặc võ học từ bậc một**; hỏng thì mất một bậc nghề cao nhất (không có thì một bậc võ).
6. **Dưỡng Hạo Nhiên Khí (Văn tâm)** có trong bảng nhưng `off:'nho'` — chờ hệ Nho tu (Đ7). Không thêm loại căn "Văn tâm" vào `ROOT` lúc này.
7. **Túc căn kiếp trước**: người có căn đã trắc được "Chôn một vật bản mệnh" ở quê (300 xu, một ngày) → `G.meta.tucCan`; kiếp sau nếu vô căn thì nghe ngay, đào đúng chỗ, 90% nhận lại căn cũ hạ một bậc phẩm. Dùng (thành hay hỏng) thì mất.
8. Huyết Tế, Làm dược nhân, Thiên Lôi: có phần chết. Huyết tế ghi nghiệp `huyet_te_nguoi`; CC07 nhánh giết người `doat_can`, nhánh mua không hỏi `ban_nguoi`, nhánh chăm người hiến `cuu_nguoi`; CC04 chiếm hồ, CC05 cướp bản đồ `hiep_dao`; CC06 ép thú `tra_tan`, chăm thú `phong_sinh`; CC01 cứu dịch `cuu_dich`.
9. Cờ `r.ccFlag`: `seo_mach` (đã tính vào khí huyết), `bong_mach`, `huyet_can`, `di_nguyen` — ba cờ sau **chưa có tác dụng** (chờ hệ hồi linh lực/huyết thuật/tuyến Di nguyện). `nuoi_co`: mỗi tháng trả 100 xu nuôi cổ, không có thì trúng độc.
11. Việc dài ngày không bao cơm (thăm dò mỏ, làm công đổi vật tư, 360 ngày tịnh dưỡng CC07…): đủ tiền thì tự trả tiền ăn theo ngày ở chỗ làm; thiếu tiền thì như thường (có thể đói). Nơi chốn chọn bằng băm, không rút số ngẫu nhiên, để mở nơi chốn không làm lệch chuỗi ngẫu nhiên.
10. Hóa Sinh Liên (CC04): năm nở đầu tiên rút trong 1–12 năm tới khi tạo nguồn, sau đó 30 năm một lần; nở từ đầu tháng năm, giữ 60 ngày; lỡ kỳ thì người giữ hồ nhận, đợi kỳ sau.

### Bài kiểm
- `cai_can` (đúng Đ6.4): vô căn đi hết CC01 qua hộp Cơ duyên (hỏi chuyện → theo đường → đồ giả → hai đầu mối → 18 tháng → tranh → nghi thức ép thành) → `tap`/Thường đủ năm hệ, `isVo()===false`, `ccOk===1`; đường thứ hai bị từ chối; ép hỏng → sẹo mạch, chờ một năm; CC05 lấy rồi → kiếp sau `con===0`; CC01 hồi sau 20 năm; bản lưu cũ.
- Số bài: luật 653 dấu ✓ (mốc cũ 604), giao diện 155 (mốc 150).
- `cai_can_duong`: đi hết **mười bảy đường** (trừ Văn tâm) bằng chính các lựa chọn trong hộp, ép thành, kiểm loại căn; nhường thì nguồn về tay người khác; người khác dùng nguồn theo năm (biên niên); nghe dấu vết theo tháng; tu sĩ chỉ nghe đường nâng phẩm; Thiên Lôi có thể chết; Văn tâm chờ Nho; nuôi cổ; suy nhược hết hạn.
- test-ui `cai_can`: nút Cơ duyên ở nơi neo, hộp lựa chọn, thẻ Cơ duyên trong Sổ tay không có chữ số.

### Còn dở
- Thưởng Các "Manh mối cơ duyên" (A.3) chưa thêm vào cửa hàng Thưởng Các.
- Sự kiện chữ dài cho từng bước (S/high) mới ở mức một câu/bước trong bảng; chưa có sự kiện ngẫu nhiên dọc đường (vd bệnh nhân CC01 nhờ việc).
- ~~Vật tư cải căn nằm trong `r.ccVt`~~ → đã chuyển vào túi đồ ở Sửa-G.
- Chưa chạy bot (chờ người dùng cho phép).

## NGƯỜI DÙNG CHỐT ĐỢT 3 (câu 25–28) — làm sau Đ6 (Sửa-F)
25. Nâng giá bí tịch võ lên nhiều (tự quyết, hợp lý so với binh khí phàm ~10–14 lượng).
26. Tích Cốc Đan giữ nguyên.
27. Vay: tổng phải trả CỐ ĐỊNH thỏa thuận từ đầu (vd vay 5000 xu, lãi 500 → luôn trả 5500 dù trả sớm hay đúng hạn). Đổi từ lãi theo tháng sang lãi trọn gói lúc vay; trả trước một phần chỉ trừ vào tổng cố định. Quá hạn thì vẫn theo chuỗi nợ/phạt.
28. Giữ tên "U Minh Ám Hội" (tạm).

## YÊU CẦU MỚI: bước Đ9.0 — GPT viết nội dung Đ9 thay Claude
Thứ tự Đ9: Đ9.1 (Claude làm bộ máy tuyến + schema + công cụ kiểm) → Đ9.0 (Claude viết file hướng dẫn cho GPT) → GPT viết 45 tuyến + nội dung 9 đại lộ theo lô → Claude chạy kiểm tự động + rà mẫu, sửa/ghép.
File hướng dẫn (docs/content/HUONG-DAN-GPT-VIET-TUYEN.md) phải có: định dạng tệp chính xác (schema JSON, tên khoá, mã hợp lệ), danh sách mã được phép dùng (địa điểm LOC, NPC, thế lực, mã deed nghiệp, điều kiện/hiệu ứng có thật, đơn vị tiền mới), 1–2 tuyến mẫu hoàn chỉnh đúng chuẩn, giọng văn/độ dài, điều cấm (không tạo NPC/nơi mới, không hồi sinh người chết, không hiện số nghiệp…), cách chia lô (mỗi lần 3 tuyến), và lệnh kiểm `npm run content:check` + lệnh kiểm riêng cho tuyến mà GPT/người dùng chạy được để biết sai chỗ nào.

## Sửa-F — câu 25, 27 (đợt 3)
### F.25 — giá bí tịch võ
- Chỉ hai bí tịch có bán ở tạp hóa thành (`bac` trong `content/rules/vo-dao.js`): **Trường Quyền Nhập Môn 600 → 6.000 xu** (công +5%), **Hỗn Nguyên Nhất Khí Công 900 → 9.000 xu** (nội lực +20%, bậc cao hơn nên đắt hơn). Binh khí phàm giữ 14.000 (thiết kiếm) / 12.000 (cương đao): bí tịch bằng khoảng nửa đến ba phần tư, rẻ hơn binh khí.
- Cầm đồ vẫn `btPer` = ½ giá mua: **3.000 / 4.500 xu**. Mua rồi cầm lại lỗ nửa.
- Bài `cam_e` sửa theo (bí tịch cầm 3.000 xu) và thêm hai ý kiểm giá + cầm.

### F.27 — vay lãi trọn gói
- Bảng `NO.vay` (content/rules/no-nha.js) đổi `lai` theo tháng → **`tong` cố định**: vay 1 lượng (6 tháng) trả trọn 1.180 xu (lãi 180); 3 lượng (6 tháng) trả 3.540 (lãi 540); 10 lượng (12 tháng) trả 13.000 (lãi 3.000). Số trả giữ nguyên các mức cũ; lãi chỉ còn là một số cố định ghi từ lúc vay, không cộng theo tháng.
- `r.vay={id,goc,tong,tra,han,bao}`: `tong` không bao giờ đổi, `tra` là phần còn lại; trả trước một phần (tt:…) và trả nốt chỉ trừ vào `tra`, hạn giữ nguyên. Quá hạn: toàn bộ `tra` chuyển thành nợ, vào chuỗi nợ/phạt như cũ (60 ngày, hèo, truy nã, làm công).
- Hộp chọn khoản vay hiện "Vay X, sau N tháng trả trọn Y" kèm "Lãi trọn gói Z … tổng phải trả luôn là Y"; thông báo nhận tiền ghi tổng cố định.
- Bản lưu cũ đang vay (`run2`, đọc `tong==null`): chốt `tong` theo bảng (= gốc + lãi tính tới hạn theo luật cũ, đã nằm sẵn trong `tra` lúc vay); phần `tra` còn lại giữ nguyên.
- Bài: `vay_tt` thêm 5 ý (tổng chốt lúc vay, qua 3 tháng không đổi, hộp hiện lãi trọn gói, trả sớm đúng tổng, bản lưu cũ); `no_nha` kiểm thêm `tong`; test-ui `no_nha` kiểm chữ "trả trọn"/"Lãi trọn gói".

## NGƯỜI DÙNG CHỐT ĐỢT 4 (câu 29–31)
29. CHỐT: KHÔNG ổn. Mọi vật phẩm/thuốc/vật tư liên quan cải căn là vật QUÝ HIẾM, là cơ duyên "chỉ gặp không thể cầu", có tiền chưa chắc mua được. Rà TOÀN BỘ hệ cải căn (content/rules/cai-can.js, sự kiện, cửa hàng): bỏ mua thẳng ở tiệm; nguồn chỉ qua cơ duyên/kỳ ngộ, phần thưởng phục vụ (cứu dịch…), tự chế từ nguyên liệu hiếm (nguyên liệu cũng hiếm), đấu giá/U Minh Ám Hội hiếm khi xuất hiện và giá rất cao, người giữ đồ có thể không chịu bán. Hai đường cho người lao động (cứu dịch, vườn thuốc) vẫn phải đi được bằng công sức, nhưng phần thưởng là thứ hiếm chứ không mua được. Làm ở Sửa-G cùng câu 31.
30. Văn tâm (Dưỡng Hạo Nhiên Khí) CHỜ Đ7 — khi làm Đ7 (Nho tu) phải bật lại đường này.
31. Vật tư cải căn PHẢI nằm trong túi đồ (chiếm ô như vật phẩm thường; bỏ sổ riêng r.ccVt, chuyển bản lưu cũ vào túi). Làm ở Sửa-G.
- THỨ TỰ CHỐT: Sửa-F → Sửa-G → Đ7 → Đ8 → (Đ9.1 bộ máy + schema + công cụ kiểm) → viết file hướng dẫn GPT (Đ9.0) → GPT viết nội dung. Sau Sửa-F: DỪNG, chờ người dùng bảo "tiếp tục".
- Kết quả đợt Sửa-F: `npm run test:rules` 660 ý đạt (653 + 2 bí tịch + 5 vay); `node tools/test-ui.js` 155 đạt.

## Sửa-G — câu 29, 31 (đợt 4)
### G.29 — vật tư cải căn quý hiếm, "chỉ gặp không thể cầu"
- Rà: không tiệm/hộp nào khác bán vật tư cải căn (grep tên vật tư chỉ thấy ở `content/rules/cai-can.js`, `49-cai-can.js`). Bỏ nút **Mua** thẳng trong hộp Cơ duyên; `CC_VT.mua` đổi thành `gia` (giá trị khi gặp người chịu nhượng), `st` (linh thạch) giữ nghĩa tương tự.
- Nguồn còn lại: làm công (`cong`), tự chế (`che`, nguyên liệu Cam Thạch Phấn / Dầu Lạc Kim cũng chỉ dò hỏi được), phần thưởng phục vụ (`cho`, vd CC01 cứu dịch được ba Hộ Mạch Tán), và ba đường mới:
  1. **Dò hỏi người giữ** (`tim:<vật>`, 3 ngày, mỗi vật một lần/tháng): `CC_CFG.tim`=35% dò ra, `ban`=50% chịu nhượng (không thì "có tiền cũng không bán"); chịu thì có nút nhượng trong tháng đó, giá ×`hiemX`=3. Vật chỉ có ở một nơi (Mảnh Sao Hạ/Thượng) không dò hỏi.
  2. **Kỳ ngộ**: mỗi tháng đang ở bước gom, `CC_CFG.ky`=4% được một món còn thiếu (kể cả nguyên liệu tự chế); `dbg('cc.ky')`.
  3. **U Minh Ám Hội**: mỗi tháng mỗi nơi `CC_CFG.am`=25% (băm, không rút số) có một món đang thiếu, giá ×`amX`=5, tính vào lượt giao dịch của Ám Hội. Phàm nhân không vào Ám Hội nên đường của người phàm dựa vào dò hỏi/làm công/kỳ ngộ.
- Hai đường người lao động: CC01 vẫn đi bằng 18 tháng cứu dịch (thưởng ba Hộ Mạch Tán); CC03 năm vật dưỡng mạch đổi bằng làm công. Bài `cai_can_duong` (ép CC_FORCE=1: dò hỏi luôn ra và chịu bán) vẫn đi hết 17 đường.
- Chưa làm: lô cải căn ở **đấu giá thường** (sự kiện `dau_gia` chỉ có gửi bán) — hỏi lại có cần không.
- Bài mới `cai_can_hiem`.

### G.31 — vật tư cải căn nằm trong túi đồ
- Vật tư là vật trong túi `r.qitems` mã `cc_<vật>` (đăng ký vào `CAT.byId` lúc nạp), mỗi món một ô như vật phẩm thường (`bagStacks`, `bagItems`, vứt được). Bỏ sổ `r.ccVt`; nghi thức chỉ tính món mang trong túi.
- **Túi đầy**: món mới nhận được **gửi lại ở nơi đang đứng** (`r.ccGui=[{vt,at}]`, có báo và nhật ký); hộp Cơ duyên ở nơi đó có nút "Lấy lại … đã gửi" (khoá khi túi còn đầy). Chọn cách này thay vì để ở nhà vì không phải ai cũng có nhà (r.nha) và nơi nhận vật luôn có hộp Cơ duyên. Sổ tay thẻ Cơ duyên ghi cả món đang gửi và nơi gửi.
- Bản lưu cũ: `r.ccVt` chuyển vào túi lúc nạp (bọc `run2`, cần `G.run` để biết số ô trống nên không làm trong `migrateX`); túi đầy thì gửi lại tại chỗ.
- Bài mới `cai_can_tui`.
- Kết quả: `npm run test:rules` 683 ý đạt (660 + 12 hiếm + 11 túi); `node tools/test-ui.js` 155 đạt.

## Đ7 — 16 nghề tu lõi, 16 nghề phàm còn lại (HN A.8; C §10 P.1–P.4; B §7.2, §7.5)

### Đ7.1 — từ vựng hiệu ứng chiêu
- `node tools/liet-ke-fx.js` in khoá fx trong `SK_RAW` và khoá máy trận đọc. Bảng ánh xạ cách viết của C (A/M/H/L, hồi chiêu, hộ thể…) ở `docs/thiet-ke/anh-xa-fx.md`.
- Khoá mới ở `src/game/core2/50-fx-moi.js` (số 42 đã dùng cho nghề nên lấy số tiếp theo), chữ `content/text/fx-moi.json`: vsCharge, fOnly, fromHide, needTrap, pierceBlock, hpDmg, breakCharge, mark, markWeak, slow, backlash, selfWeak, blockH, blockM (lowHp), cutT, curePoi, poiStop, hide, cxT, fleeUp, cover, allyCover, sumCover, allyRage, allyHeal, summon, unsummon (mpBack), trap, breakAll, dispel, tgt, pillBoost, **cd** (hồi chiêu).
- Quyết định: chi phí "x% L" → `c = x × 0,3` (linh lực tối đa ≈ `TAB.mp`); hộ thể từ nguồn mới kẹp 30% khí huyết tối đa (C P.5); hồi chiêu đếm theo lần ra tay của chủ (nút mờ, ghi "hồi chiêu n", tự đánh bỏ qua; ổ khoá chiêu vẫn theo ý người chơi); thực thể triệu hồi là đơn vị phe mình có hạn lượt (`sumBy`, `ttl`), tan thì `gone`.

### Đ7.2 — 16 công pháp, 48 chiêu, nghề tu
- Chiêu `sk01a…sk16c` trong `content/items/sk-raw.js` (A, B bậc 1; C bậc 2, mở ở tầng ba, cần Trúc Cơ); bị gỡ khỏi `SK_RAW` lúc nạp nên không lọt vào kho chiêu ngẫu nhiên. Công pháp `cp_tu01…cp_tu16` trong `content/catalog/arts.json` (trường `tu`), gỡ khỏi kho công pháp ngẫu nhiên (`TU_ART`). Dòng nội tại ghi số thật (`raw`), hiệu ứng chưa có hệ ghi chữ (`tuNote`).
- Luật `src/game/core2/51-nghe-tu.js`, bảng `content/rules/nghe-tu.js` (`TU_NGHE`, `TU_TANG`, `TU_CFG`, `TU_PM_CAM`, `TU_PM_LOI`), chữ `content/text/nghe-tu.json`. Hộp **Pháp môn** (venue `tumon`, nhóm Tu luyện): bái học ở nơi thầy dạy (phí linh thạch theo P.2, 30 ngày), hoặc tự học qua bản lưu (gấp đôi thời gian, nửa phí); hợp đồng khởi nghiệp theo P.4 (vốn, thù lao linh thạch, ngày; +10 tay nghề, cùng việc trong 30 ngày chỉ tính một lần; 10% hỏng: thương ngoài, mất vốn); nghiên cứu tầng (P.1: 90/180/360 ngày, Luyện Khí tầng 6 / Trúc Cơ / Kết Đan, tay nghề 100/300/700, mỗi tầng một hợp đồng kiểm chứng); gác chuyên môn phụ (30 ngày, giữ chiêu).
- `r.tu={chinh,phu,k:{TUxx:{xp,tang,hd,hdT,n}}}`: tối đa hai chuyên môn, phụ nhận nửa tay nghề; bậc tay nghề hiện chữ (Học đồ / Hành nghề / Chuyên gia / Tông sư). Vô căn / chưa dẫn khí không học được. Kiếp mới không mang nghề tu.
- Nơi thầy dạy chốt một lần cho thế giới (`W().tuSrc[LOC]`, dùng `ccPin` như cải căn; Đ8 gắn neo LOC thì tự theo neo).
- Luật ghép B §7.5: bảng cấm và bảng có lợi đủ cả pháp môn mở rộng (Phật, Nho, Lôi, Thi, Thôn phệ, Cổ, Huyễn) để Đ11 dùng; ghép có lợi ×1,15 chiêu của cả hai (vd Kiếm tu + Thần thức tu).
- Tài nguyên riêng (`r.tuRes`, thanh tím trong thẻ nhân vật lúc giao chiến): ra chiêu nghề +1, đủ năm thì đòn kế ×1,25 rồi về 0; ra trận còn một nửa.
- Sửa kèm: nút xác nhận hộp chọn (`ACT.vgo`) cắt mã lựa chọn ở dấu `:` đầu tiên — trước đây mã nhiều phần (vd `tim:bo_chong_sap` của Cơ duyên, `hoc:TU01`) bị cắt cụt.

### Đ7.3 — mười sáu nghề phàm còn lại
- Thêm vào `NGHE`: Tiều phu, Thợ mỏ, Thợ rèn, Thợ thủ công, Người chép sách, Phu trạm, Binh lính (bảy bậc), Sát thủ phàm (cần võ), Đạo chích, Nghệ nhân gánh hát, Quan viên (bảy bậc), Người chèo đò, Chưởng môn võ phái (cần võ bậc hai), Thợ săn, Tiêu sư (cần võ), Khất cái. Bậc lấy của B §7.2; Thợ mỏ, Phu trạm, Người chèo đò không có trong B nên tự đặt. Tiền công theo C chia ba như năm nghề đầu.
- Mỗi nghề 12 sự kiện (`content/events/nghe/<mã>.json`, bốn mỗi tầng), lựa chọn dùng năng lực hỗ trợ, có nghiệp (deed) ở chỗ hợp. Kỳ ngộ thăng bậc dùng lời chung (`ng.upT`), chưa có lời riêng từng bậc.
- Việc nghề có thể mang nghiệp (`deed` trong việc: móc túi, trộm nhà phú hộ, mở kho cứu tế) — `core2/52-nghe-pham-2.js`.
- Sửa kèm: việc nghề so cả loại nút gốc (`ngNoi`, vd đầm lầy = sông hồ). Trước đây việc của Ngư dân ghi `song/bien` không bao giờ hiện vì thế giới không có nút loại đó.
- `NANG_NGHE` đủ 21 nghề; bot: `tuHoc/tuHd/tuTang/tuDoiPhu` vào `COV_FN`, thêm `MANAGE.nghetu` (chưa chạy bot).

### Đ7.4 — kiểm tra
- Luật: `fx_moi` (13), `tu_hoc` (28), `nghe_pham2` (9), `nghe_tu` (12) — học CP01 tới tầng ba có SK01A–SK01C sau `syncSkills()`; Phật pháp + Huyết thuật bị từ chối; thần thông chỉ tung qua pháp tướng, 48 chiêu nghề tu không phải thần thông; cả 48 chiêu chạy trong trận không lỗi.
- Giao diện: `nghe_tu` (hộp Pháp môn, Đạo đồ có nghề tu, thanh Kiếm ý trong trận).

### Câu 30 — Văn tâm
- Nho tu thuộc nhóm **mở rộng** (Đ11), không có trong 16 nghề tu lõi → đường cải căn "Văn tâm" (Dưỡng Hạo Nhiên Khí) **vẫn tắt** (`off:'nho'`), bật lại khi làm Nho tu ở Đ11. Luật ghép của Nho đã có sẵn trong `TU_PM_CAM`/`TU_PM_LOI`.

### Còn dở
- Vật tư dùng trong chiêu (P.5: phù giấy, liều độc, bó dược, lõi khôi) và sản phẩm nghề (P.6) chưa nhập; chiêu chỉ tốn linh lực (Dẫn Dược dùng đan hồi có thật).
- Nhiều nội tại tầng 3–4 (chế tạo, đan, phù, khế hồn…) mới ghi chữ, chưa có hệ để cộng số.
- Việc nhập học của P.2 (hộ tống cho NP25, trả tên ba hài cốt…) gộp vào phí + hợp đồng kiểm chứng; chưa có sự kiện riêng của từng thầy (chờ NPC ở Đ8).
- Lời riêng cho kỳ ngộ thăng bậc của 16 nghề phàm mới; 4 kết cục từng nghề (B) chưa làm.

## NGƯỜI DÙNG CHỐT ĐỢT 5 (câu 32–33) — làm sau Đ7 (Sửa-H)
32. CÓ đưa đồ cải căn lên đấu giá thường. Thứ tự lô: đồ càng quý/phẩm càng cao càng xếp về cuối buổi đấu giá ("vật áp trục" xuất hiện sau cùng).
33. CHỐT: giữ các tỉ lệ hiện tại (dò 35%, bán 50% giá ×3; Ám Hội ×5; kỳ ngộ 4%/tháng).
34. Tên bậc Thợ mỏ/Phu trạm/Chèo đò: giữ tên máy tự đặt.  35. Vật tư chiêu: làm sau Đ8 hoặc cùng Đ11.
36. LOGIC CẢI CĂN (rà lại toàn hệ Đ6, làm ở Sửa-H):
   - Mỗi đồ cải căn có tác dụng riêng. Có ĐỒ DỞM (bị lừa mua, không tác dụng gì; nối với bẫy "kẻ bán đồ giả" có sẵn) và ĐỒ XỊN.
   - Đồ xịn chia PHẨM; mỗi phẩm cải được tới mức tương ứng, ví dụ: phẩm thấp → tạp/tứ linh căn, cao hơn → tam linh căn, → song linh căn, → Địa linh căn, cao nhất → Thiên linh căn.
   - Đồ càng xịn tỉ lệ THẤT BẠI càng cao; sở hữu chưa chắc thành công.
   - Mỗi lần thất bại cộng thêm % thành công cho lần sau (tích lũy, có trần hợp lý). Cân lại với luật "mỗi kiếp chỉ thành công một lần" và "thất bại chờ 1 năm" đang có.
   - Phẩm càng cao càng hiếm và càng dồn về cuối buổi đấu giá (câu 32).

## Sửa-H — câu 36, 32 (đợt 5)
Luật `src/game/core2/53-cai-can-do.js`; bảng `CC_DO`, `CC_LV`, `CC_DOCFG` ở `content/rules/cai-can.js`; chữ `ccd.*` trong `content/text/cai-can.json`.
### H.36 — logic cải căn
- **Đồ cải căn** (dùng thẳng từ túi, mỗi món một ô): năm phẩm, mỗi phẩm cải tới một mức (`CC_LV`: vô 0 · tạp 1 · tứ 1,5 · tam 2 · song/biến dị 3 · Địa/cực 4 · Thiên 5). Căn đang có bằng hoặc cao hơn mức của món thì bị từ chối (không mất đồ).
  | phẩm | tên | cải ra | thành | lô/buổi đấu giá | giá khởi điểm (Hạ) |
  |---|---|---|---|---|---|
  | 1 | Tẩy Mạch Đan | tạp/tứ (vô căn), tứ (tạp) | 75% | 30% | 69 |
  | 2 | Tam Nguyên Dịch Căn Đan | tam | 60% | 12% | 234 |
  | 3 | Lưỡng Nghi Tạo Căn Đan | song | 42% | 4% | 870 |
  | 4 | Địa Nguyên Hóa Căn Lộ | Địa | 22% | 0,4% | 4.800 |
  | 5 | Thiên Đạo Hóa Căn Quả | Thiên | 8% | 0,02% | 26.250 |
  Hỏng: mất đồ, chờ một năm (`CC_CFG.cho`), hậu quả tăng theo phẩm (suy nhược, thương, mất thọ; phẩm 5 có 15% chết). Thiên: một buổi đấu giá chỉ ~1,6/100.000 ra được Thiên linh căn.
- **Mỗi kiếp một lần** dùng chung với các đường (`r.ccOk`); dùng đồ khi đang theo một đường thì đường đó dừng (không tính là hỏng).
- **Cộng dồn sau thất bại**: `G.meta.ccBon` +5%/lần hỏng (đồ hoặc nghi thức của đường), trần 25%, giữ qua các kiếp, thành công thì về 0. Tỉ lệ kẹp 95%. Hộp xác nhận nghi thức ghi tỉ lệ đã cộng và một câu "những lần hỏng trước…".
- **Đồ dởm**: mã `ccg_<p>` cùng tên với đồ thật; dùng thì mất, không tác dụng, không tính là hỏng (không chờ, không cộng dồn). Bẫy "kẻ bán đồ giả" ở bước kiểm chứng giờ trao một món dởm (phẩm rao theo `luaP`, băm). Lúc nhận đồ dởm: khảo vật / nhận dược ≥ 25 có khả năng nhìn ra ngay (tới 90% ở mức 100) → thành `ccx_<p>` "(đồ giả)", không dùng được. **Thẩm định**: hộp Cơ duyên ở thành / trấn / thành ma tu có nút "Nhờ người thẩm định" (2 giờ; phàm 300 xu, tu sĩ 3 Hạ phẩm): thật → "(đã thẩm định)", giả → "(đồ giả)"; rèn khảo vật một chút.
- **Nguồn đồ thật**: đấu giá thường (câu 32), kỳ ngộ hiếm (`CC_DOCFG.ky` 0,2%/tháng khi đã biết căn và chưa cải thành; tỉ trọng phẩm theo `ky`). Chưa đưa đồ lên Ám Hội / dò hỏi.
- **Dị tượng Địa / Thiên**: cải thành Địa hoặc Thiên (đồ hay đường) đặt `r.tlFx` (dị tượng toàn màn như trắc linh, `cach:'caican'`), ghi biên niên; tông đang ở (hoặc đang đứng ở sơn môn) kinh động: thiện cảm trưởng lão, đệ tử, tông môn như C.18–19.
- Sửa kèm: `ccMakeRoot` ra Địa linh căn thì hệ là một cặp tương sinh.
### H.32 — lô cải căn ở đấu giá thường
- Sự kiện `dau_gia` có thêm năm lô (mỗi phẩm một lô, có hay không băm theo nơi + tháng, `CC_DO[p].dg`), chỉ hiện khi đủ linh thạch và túi còn ô; mỗi lô bán một lần trong tháng (`W().dgCc`). Đấu giá là đồ thật.
- **Thứ tự lô** (`dgLots`): món nhỏ → lô cải căn phẩm 1–3 tăng dần → món chót → **vật áp trục** Địa / Thiên ra sau cùng. Lựa chọn trong sự kiện xếp đúng thứ tự này.
### Kiểm tra
- Bài mới `cai_can_do` (29 ý: 21 ý cải căn, 8 ý đấu giá); `cai_can` vẫn qua (mua đồ giả giờ còn được thêm món dởm). Thêm vào `npm run test:rules`.
- Kết quả: luật 773 ý đạt (mốc 744; 766 sau câu 36); giao diện 160 đạt.
### Còn dở / hỏi lại
- Các đường cũ vẫn giữ kết quả của HN (vd Huyết Tế, Xá Lợi, Tẩy Tủy, Huyết Mạch Khế ra **Thiên** linh căn phẩm Khuyết/Thường, nguồn không giới hạn) — có nên hạ xuống cho khớp luật "Thiên cực hiếm" không?
- Đồ cải căn chưa có ở Ám Hội / dò hỏi; chưa có bài giao diện riêng cho đồ cải căn; bot chưa biết dùng (không chạy bot).

## NGƯỜI DÙNG CHỐT ĐỢT 6 (câu 37–39) — làm sau Đ8 (Sửa-I)
37. HẠ kết quả 4 đường cũ (Huyết Tế, Xá Lợi, Tẩy Tủy, Huyết Mạch Khế): không ra Thiên linh căn đại trà (Thiên chỉ qua đồ phẩm 5/cơ duyên cực hiếm).
38. Cộng dồn % sau thất bại CHỈ tính trong 1 kiếp (đầu thai về 0).
39. U Minh Ám Hội làm lại: là buổi họp kín nhiều người (NPC + nhân vật chính) thay phiên nhau đưa VẬT MÌNH ĐANG SỞ HỮU ra đấu giá/trao đổi. Người A đưa vật X, cả nhóm trả giá; tới lượt nhân vật chính cũng đưa đồ trong túi ra. Đồ trên bàn là đồ NPC/người chơi thật sự có trong túi (NPC có túi đồ riêng), KHÔNG phải hệ thống tạo mới tại chỗ. Áp cùng nguyên tắc cho đồ cải căn ở Ám Hội (có thể có đồ dởm nếu NPC đem đồ giả ra).

## Sửa-I — câu 37, 38, 39 (đợt 6)
### I.37 — hạ kết quả các đường cải căn cũ
- Huyết Tế → song linh căn (Khuyết, có thủy); Xá Lợi → song (Thường, có thổ/kim); Tẩy Tủy → tạp/tứ (Khuyết); Huyết Mạch Khế → song (Thường, có hệ của thú; khoá `lim:1` để `elSrc` không tự nâng lên Thiên).
- Rà các đường khác: Địa Mạch Linh Tủy (CC02, nguồn hồi 120 năm) Thiên → Địa (Khuyết, có thổ). Còn ra Thiên: Tàn Hỏa Chủng (CC05, `hoi:0` độc nhất cả thế giới = cơ duyên cực hiếm), Túc căn (chỉ khi kiếp trước đã có Thiên, hạ một phẩm) và đồ phẩm 5. Song có `el` thì cặp tương sinh chứa hệ đó.
- Bài mới `cc_thien`.
### I.38 — cộng dồn sau thất bại chỉ trong một kiếp
- `ccBon` chuyển từ `G.meta.ccBon` sang `G.run.ccBon` (kiếp mới không có → 0). Bản lưu cũ: `migrateX` bỏ `G.meta.ccBon`. Bài mới `cc_bon_kiep`; `cai_can_do` sửa theo.
- Ghi chú: hai ý đồ dởm trong `cai_can_do` (khảo vật 90% nhìn ra) phụ thuộc chuỗi ngẫu nhiên — chạy theo thứ tự trong `test:rules` thì qua.
### I.39 — U Minh Ám Hội làm lại (buổi họp kín)
Luật `src/game/core2/58-am-hoi.js` (bọc hộp `amhoi` cũ của 48-sua-e.js); bảng `AM_HOI` ở `content/rules/am-hoi.js`; chữ `amh.*` ở `content/text/am-hoi.json`; giao diện `src/react/canh/AmHoi.jsx` (cảnh `amhoi`, nút `data-act="am"` ở `ui/30-am-hoi.js`).
- Vào: như cũ (thành / thành ma tu, quỷ thị mở, chỉ tu sĩ), hộp có một nút "Ngồi vào bàn"; **mỗi tháng mỗi nơi một buổi** (`W().amhoi`).
- Người ngồi bàn: tới `AM_HOI.vai`=3 NPC giữ vai (tu sĩ `tu≥1`, còn sống, túi có đồ; chọn băm theo nơi + tháng) và 2–3 **khách vô danh** sinh lúc hội mở, mang sẵn túi 2–4 món + của cải (× hệ số vùng). Khách chỉ dùng đồ trong túi họ.
- **Túi NPC giữ vai**: Đ8 để trống nên Sửa-I lập một lần (`v.tuiS`) cho vai tu sĩ theo hạt giống thế giới (`wRnd`, không động `R()`): 2–5 món (pháp bảo quanh cảnh giới, đan, hiếm có đồ cải căn thật; 15% có một món dởm), của cải `vaiCua × 4^cảnh giới`. Bản lưu cũ lập khi tải. Vai phàm không có đồ.
- Món: `{u,id,n,q,rel}` — `rel` pháp bảo, `pill:<id>`, hoặc mã vật trong túi (`ccd_/ccg_/cct_`, `cc_<vật tư>`). Giá trị (Hạ phẩm): pháp bảo `40×3^phẩm`, đan theo giá đan, đồ cải căn `CC_DO.st`, vật tư cải căn `st × amX`. Linh thạch quy đổi 1 Trung = 100 Hạ… trả từ phẩm thấp, thừa trả lại Hạ.
- Mỗi người đưa **một** món đang có (khách ưu tiên vật tư cải căn rồi đồ dởm); lô xếp theo giá trị tăng dần (vật quý cuối buổi). Lượt của người chơi ở giữa buổi: chọn một món trong túi hoặc thôi; món đó chen vào hàng theo giá trị.
- Trả giá: khởi điểm `0,6 ×` giá trị; mỗi NPC chịu trả tới `giá trị × nhu cầu (0,75–1,35, băm)` nhưng không quá của cải, túi đầy thì không trả. Người chơi: **Trả giá** (+10%, NPC trả lại nếu còn chịu), **Đổi vật** (đưa món trong túi, người bán định giá; đồ dởm có thể bị nhìn ra), **Bỏ qua / Gõ búa**. Lô của người chơi: **Bán** cho người trả cao nhất, **Đổi lấy** một món trong túi NPC, **Đòi thêm** (không ai chịu thì thôi), **Rút lại**.
- Không món nào rời túi trước khi bán xong; bán rồi thì rời túi người bán sang túi người mua (kể cả NPC mua của NPC), linh thạch/của cải đổi tay. Rời bàn giữa chừng không mất gì.
- **Đồ dởm**: món `ccg_` trông như thật; mỗi NPC trả giá có `bietGia`=40% nhìn ra (không trả). Người chơi có khảo vật / nhận dược (`ccNhanP`, như Sửa-H) thì lô hiện "(nghi đồ giả)"; mua về vẫn qua `ccDoAdd` nên có thêm một lần nhìn ra, và thẩm định như cũ.
- Thay đường cũ: bỏ đổi thẳng pháp bảo ↔ Thượng/Cực và đổi Thượng/Cực lấy đồ mới (tạo đồ tại chỗ). Vật tư cải căn đang thiếu (Sửa-G, `ccAmVt` 25%) giờ nằm trong túi một khách vô danh, đem ra bàn.
- `dbg`: `amh.mo`, `amh.dua`, `amh.mua`, `amh.doi`, `amh.ban`, `amh.doiNhan`, `amh.npc`, `amh.tan`, `amh.roi`.
- Bài: mới `am_hoi` (luật, 25 ý) và `am_hoi` (giao diện); `lt_nguon` bỏ phần Ám Hội cũ, `cai_can_hiem` sửa phần Ám Hội theo túi khách. Sửa kèm `dat_ma`: ý "sáu trăm năm" miễn khu có ma tông gần (bài phụ thuộc hạt giống, lệch khi thêm bài trước nó).
### Kết quả Sửa-I
- `npm run test:rules` 872 ý đạt (mốc 847); giao diện 168 ý đạt (mốc 162).
### Còn dở / hỏi lại
- Khách vô danh tan sau buổi (đồ họ mua đi theo họ). NPC giữ vai chưa tự dùng / bổ sung túi theo thời gian (chỉ đổi qua Ám Hội).
- Giá trị pháp bảo theo phẩm là quy ước mới (40×3^phẩm Hạ); bot chưa biết ngồi Ám Hội (không chạy bot).

## Đ8 — thế giới neo, vai NPC, thế lực, đồng hồ, thời gian luân hồi, đất ma (HN A.9.2, A.17; C §6–§7; B §14.8–§14.9)
Luật: `core2/54-the-gioi-neo.js` (neo, vai, thế lực, Sử lược, năm thế giới), `55-thoi-cuc.js` (đồng hồ), `56-luan-hoi.js` (khoảng luân hồi, tua thập kỷ), `57-dat-ma.js`. Bảng: `content/world/the-gioi-neo.js` (LOC_NEO, LOC_DUONG, LOC_LOI, VAI_NP, THE_LUC, TU_THAY), `content/world/thoi-cuc.js` (THOI_CUC, QUOC_MOI), `content/rules/luan-hoi.js`, `content/rules/dat-ma.js`; chữ `content/text/the-gioi.json` (tg.*, tc.*, lh.*, ma.*).

### Hàm cho người viết cốt truyện (Đ9 dùng)
- `anchorNode('LOCxx')` / `locNode` / `locName` (tên hiện tại trên bản đồ) / `locPhaT` (trạng thái hư hại đang có).
- `vaiNow('NPxx')` → `{ten,g,tuoi,song,doi,qh,vai,noi,noiTen,the,thay,truoc,muc}`; vai trống thì `song:false` và `thay` là người/vật chứng thay thế. **Không lưu tên cứng** (L25). `vaiGiet(ma,ly)` khi người chơi giết người giữ vai.
- Túi đồ NPC (cho Sửa-I, Ám Hội): `w.vai[ma].tui` (≤12 món `{id,n,q}`), `cua`; `vaiTui/vaiTuiAdd/vaiTuiBo`. Người kế là con/học trò nhận lại túi, người thay thì không.
- `faNow('FAxx')`, `faAlive`, `faAdj(id,d,ly)`; sổ cống hiến khoá `'fa:FAxx'` (`faCong`).
- `clkView()` (đồng hồ đang diễn ra), `clkCanThiep(id,kq)` (chỉ khi đang diễn ra; có thì không áp mặc định), `demDaiTang/demDaiGiam`, `thienLoMo()`, `biCanhMo()`.
- `suLuocAdd(t,k)`; `maVucTao(nodeId,k)`, `maAt(n)`, `maTinhHoa(n,k)`; `gapLoi(y)`.

### Quyết định tự chọn
- Neo chọn **nút có sẵn**, đúng đại khu, theo loại ưu tiên; **không dùng sơn môn** (tên nút sơn môn là tên tông, đổi tên sẽ vỡ tông). Neo có đường neo tới neo đã đặt thì chọn nút gần nhất. Đặt neo trong `snapWorld` (sau `ensureCounts` vốn đổi tên nút). Bản lưu cũ: đặt neo khi tải, chốt lại nơi thầy dạy / nguồn cải căn / vật tư theo neo. Đường neo: bản đồ một mảnh liền, đi theo ô nên không cần thêm cạnh.
- Mọi ngẫu nhiên của hệ thế giới mới dùng băm theo hạt giống (`wRnd`), không động `R()` (không lệch các bài cũ). Riêng `gapRoll`, tua thập kỷ dùng `R()` như trước.
- Vai: phàm thọ 60–80, tu sĩ theo `LIFE` cảnh giới ×0,8–1; người mất thì 1–2 năm sau có người kế (con / học trò / người thay theo bảng); thế lực đã tan thì vai đứng đầu bỏ trống tới khi có người dựng lại. NP30 Tịch Âm không già. Đổi Ngôi: người giữ NP04 tiếp theo là "người thay".
- Thế lực: sức duy trì kéo về mức gốc 3%/năm + `lai` + nhiễu ±2; dưới 30 suy, phải lên 40 mới tính hồi (tránh ghi Sử lược lặp), 0 thì tan; tan đủ `phuc` năm thì mỗi năm 5% có người dựng lại.
- Đồng hồ: CLK07 Hạn Hán của B gộp vào CLK01 (15% lần đói là bản toàn cõi). Huyết Nguyệt và Ma Chủ Phục Sinh là nấc 1–3 của Đêm Dài (CLK06), **chỉ tăng vì hành động**; nấc 4+ để năm năm không ai ngăn → 3 khu đất ma rồi lùi về nấc 2. Tông chiến / Tiên nhân: **đổi chủ một sơn môn** thay vì xoá tông khỏi `world.sects` (xoá sẽ vỡ đệ tử, thiên kiêu). Long Mạch Đứt: bế quan khu đó ×0,7 (sàn 0,4), hồi 0,0005/năm. Kết quả mặc định ghi Sử lược; chỉ khi đang chơi mới ghi thêm biên niên.
- Luân hồi: ba kiếp đầu giữ đúng `ri(3,30)`; sau đó 55/28/13/4% (Gần/Vừa/Xa/Rất xa), bậc nghiệp chướng ≥3: Xa ×2, Rất xa ×3; còn ân oán / duyên mở 40% kéo về Gần. Trên 60 năm tua theo thập kỷ (lẻ chạy từng tháng). Ân oán sau trên 60 năm: 50% chuyển "hậu duệ của …", còn lại khép; huyết thù trên 150 năm thành oán hồn (`L.oanHon`). Màn hết kiếp đổi sang lời ở bến + năm hiện tại.
- Đất ma hồi **−6 mỗi thế kỷ** theo B §14.9 (lộ trình ghi "mỗi thập kỷ" là nhầm: sẽ hết trong ~170 năm, trái với "~500 năm hết Ma vực"). Phật/chính tông trong bán kính gần ×2, ma tông ×0,5 (ma tông thắng).
- Luật 5: LOC05, LOC12, LOC15 có phần lõi — không bao giờ hoang (`flipNode`, `locHu`), không bị đất ma nuốt; tri thức Đ10 phải có một nguồn ở đây.
- Sử lược: 60 dòng, tối đa 20 dòng gộp theo thế kỷ (mỗi dòng gộp giữ hai chuyện quan trọng nhất: đồng hồ > thế lực > nơi neo > vai).
- Nối Đ7: hộp Pháp môn ghi tên người dạy là người đang giữ vai (TU_THAY); sự kiện nhập học riêng vẫn chờ Đ9.

### Kiểm
- Luật: `neo` (10), `vai` (19), `thoi_cuc` (17), `khoang_luan_hoi` (16), `dat_ma` (12). Tổng luật 847 ý đạt (mốc 773); giao diện 162 ý đạt (mốc 160; thêm `su_luoc`). Sửa kèm: `qpc` (màu thẻ nhiệm vụ) bị dính vào dòng chú thích ở core2/09 nên không được định nghĩa — lộ ra ở bài giao diện tinhtoa.

### Còn dở
- Lựa chọn ở Bến Vong Xuyên ("Uống canh, đi ngay" / "Ngồi đợi") và Mộng Ấn #1: để Đ10.
- Mộ / đồ chôn mục theo thế kỷ (B §14.8) chưa làm; tông môn suy/diệt theo thế kỷ chỉ qua đổi chủ sơn môn.
- Lịch thường lệ của NPC (ngày/đêm) mới là chữ trong bảng, chưa có NPC đi lại trên bản đồ; chưa có màn "Nhân vật" riêng.
- Đồng hồ chưa có sự kiện chơi được (chỉ trạng thái + kết quả mặc định); Đ9 viết sự kiện, gọi `clkCanThiep`.

### BẢNG MÃ (dùng cho file hướng dẫn GPT)
#### Địa điểm neo LOC
| Mã | Tên | Đại khu | Loại nút được chọn | Thế lực | Công dụng | Khi bị phá (Luật 2) | Lõi |
|---|---|---|---|---|---|---|---|
| LOC01 | Thanh Khê Thôn | Trung Châu | tran | FA04 | Ruộng, nhà hộ dân, đê, kho thóc, chợ. | trại tị nạn → di tích |  |
| LOC02 | Lương Kinh | Trung Châu | thanh | FA01 | Triều đình, trường thi, ngục, sổ thuế, sân khấu. | kinh thành đổi chủ → kinh thành dưới luật mới |  |
| LOC03 | Vạn Bảo Hội Quán | Trung Châu | cho, thanh, tran | FA02 | Hợp đồng, thương đội, bảo quản, đấu giá. | hội quán cháy, sổ nợ còn bản sao trong thương đội → nền hội quán cũ |  |
| LOC04 | Cổ Miếu Vô Danh | Đông Hoang | phe, ancu, tran | — | Trú ẩn, bia tên người mất, dấu mộng. | miếu đổ, bia vỡ còn mảnh chữ đọc được → nền miếu giữa cỏ |  |
| LOC05 | Huyền Cơ Trận Các | Đông Hoang | linhdia, dong, phe, thanh | FA03 | Trận đồ, trục quan trắc, hồ sơ Ngũ Tổ. | các sụp, còn phòng lõi nguy hiểm có thể khảo sát → phòng lõi giữa đá đổ | có |
| LOC06 | Đoạn Tùng Lâm | Đông Hoang | rung, nui, dam, linhdia, dong | — | Gỗ, dược phàm, thú, đất chôn. | rừng cháy, lộ nền đá cổ → rừng non mọc trên nền đá cổ |  |
| LOC07 | Huyết Sát Cốc | Nam Trạch | ma, dong, sao, dam | FA05 | Huyết tộc, huyết trì, pháp ước, tranh quyền. | cốc vắng, còn ấn và hồ sơ bị nguyền → huyết trì khô |  |
| LOC08 | Vạn Thú Môn | Nam Trạch | rung, sao, linhdia, dong | FA06 | Chuồng thú, trại cứu thương, sổ khế ước, cửa gọi linh. | chuồng bỏ ngỏ, thú thả ra thành bầy thật → trại cũ giữa bầy thú |  |
| LOC09 | Tịch Chiếu Bến | Nam Trạch | song, dam, tran | — | Đò, lưới, chợ nước, sân hát, xác tàu. | lũ đổi lối vào, lời khai nằm trên bảng khắc thuyền → bến mới bên dòng cũ |  |
| LOC10 | Bách Thảo Cốc | Tây Lĩnh | duoc, linhdia, rung | FA07 | Ruộng thuốc, bệnh xá, hồ sơ dịch, bàn luyện đan. | vườn bị đốt, hạt giống còn trong kho lạnh → vườn mọc lại từ kho lạnh |  |
| LOC11 | Hàn Thiết Lô | Tây Lĩnh | khoang, nui, dong, tran | FA08 | Mỏ, lò, xưởng giấy và khuôn. | mỏ đóng, còn đường hầm, bảng công và lô kim loại cuối → đường hầm bỏ hoang |  |
| LOC12 | Lạn Kha Tự | Tây Lĩnh | ancu, phe, linhdia, nui, dong | FA09 | Thư khố, nhà tạm trú, tháp tro, văn bia. | chùa đổ, văn bản tản mát ở người hành hương → tháp tro còn đứng | có |
| LOC13 | Bắc Phong Ải | Bắc Nhạc | thanh, tran | FA10 | Quân doanh, trường luyện, trạm ngựa, kho. | ải thất thủ thành chiến địa, tuyến tiếp tế lưu vong → chiến địa cũ |  |
| LOC14 | Táng Cốt Nguyên | Bắc Nhạc | phe, hoang, dong, tran | — | Mồ tập thể, bia trận vong, trại người trở về, xưởng dựng bia. | trại bỏ hoang, dấu linh hồn còn đọc được → đồng mộ không người |  |
| LOC15 | Hồi Thanh Đài | Bắc Nhạc | thien, linhdia, nui, dong, phe | — | Điểm nghe ký ức, quan trắc Đêm Dài và cửa kết thúc. | nền đá nứt, lõi đài còn nghe được → nền đá | có |

Đường neo: LOC01–LOC02, LOC02–LOC03, LOC01–LOC04, LOC04–LOC05, LOC04–LOC06, LOC06–LOC08, LOC08–LOC07, LOC08–LOC09, LOC09–LOC03 (thủy), LOC03–LOC11 (thương lộ), LOC11–LOC10, LOC10–LOC12, LOC11–LOC13, LOC13–LOC14, LOC14–LOC15 (sơn), LOC12–LOC15 (sơn).

#### Vai NPC NP (tên là người giữ vai thời mở đầu; luôn gọi `vaiNow`)
| Mã | Tên (người mở đầu) | Vai | Nơi | Thế lực | Cảnh giới | Nối vai | Vật chứng thay |
|---|---|---|---|---|---|---|---|
| NP01 | Lý Thổ | đại diện hộ nông (đứng đầu) | LOC01 Thanh Khê Thôn | FA04 | phàm | con cái | sổ hộ và bia người giữ giống |
| NP02 | Mộc Nghi | dân binh | LOC01 Thanh Khê Thôn | FA04 | phàm | người thay | danh sách quân dịch ở trạm |
| NP03 | Tạ Văn Kính | thư lại | LOC02 Lương Kinh | FA01 | phàm | học trò | bản sổ thuế có nét sửa |
| NP04 | Lương Hạo | quân chủ (đứng đầu) | LOC02 Lương Kinh | FA01 | phàm | con cái | chiếu chỉ và ấn triều |
| NP05 | Thẩm Cửu | chưởng quỹ (đứng đầu) | LOC03 Vạn Bảo Hội Quán | FA02 | phàm | học trò | sổ nợ bản sao trong thương đội |
| NP06 | Lạc Tín | người dẫn thương đội | LOC03 Vạn Bảo Hội Quán | FA02 | phàm | người thay | khế cầm cố người nhà |
| NP07 | Vô Đăng | người giữ miếu | LOC04 Cổ Miếu Vô Danh | — | phàm | học trò | bia tên người mất trong miếu |
| NP08 | Mạc Liên | người dò phả hệ | LOC04 Cổ Miếu Vô Danh | — | phàm | người thay | tập chép bia |
| NP09 | Hứa Triều | trận sư (đứng đầu) | LOC05 Huyền Cơ Trận Các | FA03 | Kết Đan | học trò | trận đồ ở phòng lõi |
| NP10 | Diệp Vân | học đồ trận | LOC05 Huyền Cơ Trận Các | FA03 | Luyện Khí | học trò | bản sao bảng người bị hiến |
| NP11 | Đỗ Lộc | tiều phu | LOC06 Đoạn Tùng Lâm | FA04 | phàm | con cái | dấu khắc trên cây mẹ |
| NP12 | Dã Tâm | sứ thú của Yêu Hoàng | LOC06 Đoạn Tùng Lâm | — | Nguyên Anh | người thay | hiệp ước sinh cảnh khắc trên đá |
| NP13 | Tần Huyết Lăng | chủ huyết cốc (đứng đầu) | LOC07 Huyết Sát Cốc | FA05 | Nguyên Anh | con cái | ấn huyết cốc và hồ sơ bị nguyền |
| NP14 | A Túc | người giữ huyết phả | LOC07 Huyết Sát Cốc | FA05 | Luyện Khí | người thay | huyết phả |
| NP15 | Bạch Kỳ | người quản thú (đứng đầu) | LOC08 Vạn Thú Môn | FA06 | Kết Đan | học trò | sổ khế ước thú |
| NP16 | Kỷ Vũ | thú y | LOC08 Vạn Thú Môn | FA06 | Luyện Khí | học trò | phương thuốc thú |
| NP17 | Giang Mộ | lái đò | LOC09 Tịch Chiếu Bến | — | phàm | con cái | bảng khắc thuyền |
| NP18 | Ninh Ca | chủ gánh hát | LOC09 Tịch Chiếu Bến | — | phàm | học trò | vở tuồng chép tay |
| NP19 | Tô Bán Hạ | y sư (đứng đầu) | LOC10 Bách Thảo Cốc | FA07 | Trúc Cơ | học trò | hồ sơ dịch và hạt giống kho lạnh |
| NP20 | Hà Tề | dược đồng | LOC10 Bách Thảo Cốc | FA07 | phàm | học trò | mẫu nước và sổ ghi bệnh |
| NP21 | Cố Chùy | chủ lò (đứng đầu) | LOC11 Hàn Thiết Lô | FA08 | phàm | con cái | bảng công thợ mỏ |
| NP22 | La Men | thợ khuôn và giấy | LOC11 Hàn Thiết Lô | FA08 | phàm | học trò | khuôn ấn giả |
| NP23 | Trí Viễn | người giữ thư khố (đứng đầu) | LOC12 Lạn Kha Tự | FA09 | Trúc Cơ | học trò | thư khố Lạn Kha |
| NP24 | Sầm Tro | người khắc bia | LOC12 Lạn Kha Tự | FA09 | phàm | học trò | văn bia đã khắc |
| NP25 | Đường Bắc Quy | chỉ huy (đứng đầu) | LOC13 Bắc Phong Ải | FA10 | Luyện Khí | người thay | bản đồ quân doanh |
| NP26 | A Mãn | giữ ngựa trạm | LOC13 Bắc Phong Ải | FA10 | phàm | người thay | sổ trạm ngựa |
| NP27 | Mạnh Cốt | thầy bó xương | LOC14 Táng Cốt Nguyên | — | phàm | học trò | sổ tên người được cứu |
| NP28 | Bùi Ấn | cựu coi ấn | LOC14 Táng Cốt Nguyên | — | phàm | con cái | ấn thật được giấu |
| NP29 | Kha Vọng | người nghe ký ức | LOC15 Hồi Thanh Đài | — | Kết Đan | học trò | nền đá ghi lời nghe được |
| NP30 | Tịch Âm | ký ức kết tụ | LOC15 Hồi Thanh Đài | — | phàm | không già, không người kế | tiếng vọng ở nền đá |

#### Thế lực FA
| Mã | Tên | Căn cứ | Đứng đầu (vai) | Giữ | Nợ / cần |
|---|---|---|---|---|---|
| FA01 | Lương triều | LOC02 Lương Kinh | NP04 | thuế và ngôi | FA02, FA10 |
| FA02 | Vạn Bảo Thương Hội | LOC03 Vạn Bảo Hội Quán | NP05 | hợp đồng, độc quyền vận chuyển | FA08, FA05 |
| FA03 | Huyền Cơ Trận Các | LOC05 Huyền Cơ Trận Các | NP09 | hệ trận Ngũ Tổ | FA09 |
| FA04 | Thanh Khê Liên Thôn | LOC01 Thanh Khê Thôn | NP01 | đất, nước, an táng | FA01 |
| FA05 | Huyết Sát Cốc | LOC07 Huyết Sát Cốc | NP13 | huyết hệ và quyền tự trị | FA02 |
| FA06 | Vạn Thú Môn | LOC08 Vạn Thú Môn | NP15 | nơi sống, khế ước và nguồn thú | FA04 |
| FA07 | Bách Thảo Cốc | LOC10 Bách Thảo Cốc | NP19 | cứu chữa và đan phương | FA01 |
| FA08 | Hàn Thiết Hội | LOC11 Hàn Thiết Lô | NP21 | lò và quyền thợ | FA02 |
| FA09 | Lạn Kha Tự | LOC12 Lạn Kha Tự | NP23 | ký ức người chết | FA03 |
| FA10 | Bắc Phong Quân | LOC13 Bắc Phong Ải | NP25 | biên ải và lương quân | FA01 |

#### Đồng hồ thế giới CLK
| Mã | Đồng hồ | Nhịp | Nơi |
|---|---|---|---|
| CLK01 | Mùa đói Thanh Khê | 6–14 năm | LOC01 |
| CLK02 | Nợ của triều đình | 8–15 năm | LOC02 |
| CLK03 | Biên ải | 10–20 năm | LOC13 |
| CLK04 | Huyết ước | 3–3 năm | LOC07 |
| CLK05 | Thú triều | 22–28 năm | LOC08 |
| CLK06 | Đêm Dài trở lại | chỉ tăng vì hành động | LOC15 |
| CLK07 | Đại Hội Thiên Kiêu | 30–30 năm | LOC02 |
| CLK08 | Tông Chiến Chính–Ma | 150–150 năm | — |
| CLK09 | Đổi Ngôi | 60–120 năm | LOC02 |
| CLK10 | Đại Dịch | 80–160 năm | LOC10 |
| CLK11 | Bí Cảnh Thượng Cổ Mở | 50–50 năm | — |
| CLK12 | Tiên Nhân Hạ Phàm | một lần | LOC15 |
| CLK13 | Long Mạch Đứt | 300–600 năm | — |
| CLK14 | Thiên Lộ Mở | 300–300 năm | LOC15 |

40. CHỐT: màn xem NPC đã gặp + thế lực trong Sổ tay để làm ở Đ9.  41. CHỐT: hai lựa chọn ở Bến Vong Xuyên làm ở Đ10 cùng Mộng Ấn.

## Đ9.1 + Đ9.0 — bộ máy tuyến, công cụ kiểm, tuyến mẫu, hướng dẫn GPT
- Dữ liệu: `content/tuyen/<id>.json` (OR01–OR45, DL01–DL09), schema `content/schemas/tuyen.schema.json`. `tools/content-build.js` gọi `tools/kiem-tra-tuyen.js` rồi sinh `src/game/data/06-tuyen-du-lieu.js` (`TUYEN_DATA`); tuyến sai thì build dừng.
- Luật: `core2/59-menh-tuyen.js`. `r.arc={xt,dl,doi,vong,m}`; mỗi tuyến `{id,i,mT,han,moi,nhac,nn,dau,lich,ngoai,ket,xong}`. Hằng tháng (`advanceTime` → `tuyenTick`): mở tuyến xuất thân theo `r.origin`, mở nút sau `cho`, lỡ `han` → `tuDien` (dấu, Sử lược, CLK) rồi đi tiếp. `tuyenGap(force)` đưa lời mời bằng kỳ ngộ `sp:1` (id `tuyen:<OR>:<N>`), tự thêm "Để sau" (nhắc lại sau 3 tháng, tối đa 4 lần); kiểu `tin` chỉ gặp khi đứng ở nơi LOC. Vai đã mất → đoạn `thayThe`; `{NPxx}` của người đã mất đọc "người từng là …". Xong N5: một kết → nhận, nhiều kết → người chơi chọn, không kết → "người đứng ngoài". Kết ghi Sử lược + `W().tuyenVong` (dấu vọng, kiếp sau đọc một dòng nhật ký). Xuất thân kết → mở đại lộ theo `goiYDaiLo` (hồi 1 bỏ qua nếu `boQuaNeuXuatThan`); `tuyenMoDaiLo(d)` đổi một lần mỗi kiếp. `tuyenView()` cho Sổ tay. Tuyến đã gỡ khỏi content mà bản lưu còn trỏ tới: bỏ qua.
- Hiệu ứng tuyến (riêng, không dùng `e` của sự kiện cũ): `bac` (xu), `linhThach` {ha,trung,thuong,cuc} (chỉ khi `pham:false`), `deed`, `vatPham/boVatPham`, `fa`, `clk` (→`clkCanThiep`), `giet` (→`vaiGiet`), `hp`, `h`, `tamma`. Điều kiện: `dau/khongDau/pham/canhGioiTu/tuoiTu/tuoiDen/bacTu/linhThachTu/vatPham/vaiSong/vaiMat/faSong/faDiet/clkDang/khoa`. Vật truyện riêng tuyến (`vatTruyen`, id `vt_<or>_…`) nạp vào `CAT`.
- Bộ kiểm (`npm run content:tuyen`, nằm trong `content:check`): JSON có dòng, khoá lạ, mã LOC/NP/FA/CLK/deed/xuất thân/vật có thật, 5 nút N1–N5, 3–5 lựa chọn (một cái không điều kiện), `tuDien` mọi nút, `thayThe` không gọi vai đã mất, 3 kết A/B/C đòi dấu có người đặt, văn không chữ số (trừ tuổi), không tên cứng NP/LOC/FA, không điểm nghiệp, tiền đúng đơn vị, không trùng id; đại lộ: `khacVoi` hồi 2–5, hồi 3/5 chạm CLK. Cảnh báo: tên riêng lạ, văn ngắn/dài, "hồi sinh", trùng người + nơi giữa đại lộ và xuất thân. `--de OR02 OR03` in đoạn thiết kế để dán cho GPT.
- Bài: `menh_tuyen` (33 ý), sửa `cai_can_do` (ép trúng xác suất nhìn ra đồ dởm — trước đó phụ thuộc thứ tự chạy).
- Còn dở: thẻ "Mệnh thư" trong Sổ tay (giao diện React) chưa vẽ, `tuyenView` đã có; chưa có sự kiện đồng hồ chơi được ngoài tuyến; bộ kiểm chưa so mục tiêu nút đại lộ với xuất thân bằng nghĩa (chỉ cảnh báo cùng người + nơi).

## NGƯỜI DÙNG CHỐT ĐỢT 7 (câu 44–46)
44. B: lời mời mốc tuyến vẫn nằm trong Sổ tay (thẻ Mệnh thư), người chơi tự mở lại trước khi hết hạn (cần làm trong bộ máy + thẻ Mệnh thư).
45. A: mỗi mốc ≥3 lựa chọn thật, "Để sau" không tính (hướng dẫn GPT đã ghi 3–5).
46. A: GPT được tạo vật truyện riêng mã vt_<tuyến>_.
42. CHỐT giá Ám Hội: người bán A đưa vật B ra và nêu thứ muốn nhận C (linh thạch hoặc vật phẩm, theo thứ A đang cần). Định giá B và C bằng bảng NHU CẦU của thế giới (logic nhu cầu đã có ở cửa hàng, theo nơi/vật, dao động theo thời gian). Trao đổi khi giá trị + độ quý hiếm tương đương. Bỏ công thức cố định 40×3^phẩm (chỉ dùng làm giá gốc nếu cần, nhân theo nhu cầu).
43. CHỐT khách Ám Hội: mọi thành viên đều là NPC THẬT có dữ liệu thật trong thế giới (không sinh mới tại chỗ, không biến mất giữa chừng); họ hóa trang che thân phận và che tu vi khi dự hội (người chơi thấy tên giả/áo choàng; có thể nhận ra qua thần thức/khảo vật/giao tình — tự thiết kế nhẹ). Bỏ "khách vô danh sinh lúc hội mở".
42b. BỔ SUNG luật Ám Hội:
   - Người bán đưa vật B kèm DANH SÁCH vật mong muốn (tên + số lượng X mỗi món); chấp nhận 1 trong các món đó. Người trả giá chọn 1 món trong danh sách nếu túi họ có đủ số lượng. Giá trị giao dịch = giá trị món (theo nhu cầu) × số lượng.
   - Nếu không có món nào trong danh sách: nút "Thương lượng" — tự chọn vật trong túi + số lượng Y; hệ thống xét hợp nhu cầu người bán + tổng giá trị tương đương thì được tính là một lần trả giá hợp lệ.
   - Đây là ĐẤU GIÁ nhiều vòng: A trả mức 1, B trả mức 2 (phải hấp dẫn/giá trị hơn), A có thể trả tiếp mức 3… cho tới khi mọi người khác bỏ cuộc; người còn lại với mức cao nhất thắng. Ai đã bỏ cuộc thì không được trả giá lại trong vòng của món đó (sang món khác thì được). NPC cũng tham gia trả giá nhiều vòng theo nhu cầu + của cải/túi của họ.
   - ĐẾM NGƯỢC: mỗi lần có người đưa giá, đồng hồ đếm 10 giây (thời gian thật, hiện trên hộp thoại); nếu 10 giây không ai trả cao hơn thì món thuộc người đó. Có người trả mới thì đếm lại từ 10. NPC ra giá trong khoảng đếm (độ trễ ngẫu nhiên). Bài kiểm phải chạy được không chờ thật (cho phép tua đồng hồ trong test).
Việc cần làm (Sửa-J): câu 42, 42b, 43, 44.
Gói gửi GPT: docs/content/GUI-GPT/ (0-loi-nhan, 1-huong-dan, 2-thiet-ke-45-tuyen). TẠM DỪNG — chờ người dùng.

## Sửa-J — câu 42, 42b, 43, 44 (đợt 7)
Luật `core2/58-am-hoi.js` (viết lại), `core2/59-menh-tuyen.js` (thêm); bảng `AM_HOI` (`content/rules/am-hoi.js`); chữ `amh.*`, `ty.*`; giao diện `src/react/canh/AmHoi.jsx`, `src/react/bang/SoTay.jsx`.
### J.42 + 42b — Ám Hội định giá theo nhu cầu, đấu nhiều vòng
- Giá trị mọi vật = giá gốc × `ncGet(nơi họp, khoá)` (`amVal`). Giá gốc: pháp bảo `40×3^phẩm` (chỉ còn là giá gốc), đan theo giá đan, đồ/vật tư cải căn như cũ, linh thạch phẩm k = 100^k Hạ. Linh thạch cũng là một vật (`lt:k`, khoá nhu cầu `lt0..lt3`).
- Người bán nêu danh sách (`lot.muon`): linh thạch phẩm vừa tầm + tối đa `muonN`=2 loại đan người bán chưa có, xếp theo nhu cầu nơi họp (thứ thế giới đang thiếu) + băm; số lượng mỗi món vừa đủ giá mở (`gia0`=0,6 × giá trị), tối đa `slMax`=12. Lô của người chơi chỉ nêu linh thạch.
- Trả giá: (a) một món trong danh sách, số lượng tối thiểu = max(số nêu, đủ vượt mức dẫn); (b) Thương lượng: chọn vật trong túi + số lượng (−5/−1/+1/+5); người bán định giá = giá trị × số lượng × độ hợp (trong danh sách 1; linh thạch phẩm khác 1; cùng loại 0,8; pháp bảo 0,6; vật khác 0,4 < `hopMin` 0,5 → không nhận). Đồ dởm người bán nhìn ra (40%) = 0.
- Mỗi lần trả phải ≥ mức dẫn + `buoc`×giá trị (10%). Đang dẫn không tự trả đè. Bỏ cuộc → `lot.bo.me`, không trả lại trong món đó; bỏ cuộc thì tua nhanh tới lúc gõ búa (khỏi ngồi chờ).
- NPC: mỗi lần có giá mới, mỗi NPC còn trong cuộc được hẹn một lúc ngẫm `tre` 1,5–8 giây (băm); tới lúc thì trả mức tối thiểu nếu còn dưới mức chịu (`giá trị × nhu 0,75–1,35`, túi chưa đầy, có đủ vật/linh thạch trong túi/của cải thật; ưu tiên đan trong túi, rồi linh thạch, đếm bằng phẩm thấp hơn cho vừa), không thì bỏ cuộc. Nên có nhiều vòng NPC–NPC–người chơi.
- Đếm ngược `dem`=10 giây thời gian thật (`amNow()` = Date.now + `AM_LECH`); trả mới thì đếm lại. Hết giờ: người dẫn thắng, `amResolve` chuyển vật trả từ người dẫn sang người bán và món đấu sang người dẫn (túi người chơi / túi vai / túi thiên kiêu / của cải). Không ai trả: món về chủ. Lô của người chơi: "Gõ búa" bán ngay cho người dẫn, "Rút lại".
- Đồng hồ: `amTick()` chạy mỗi 250 ms trong hộp (React) và trước mỗi hành động; bài kiểm tua bằng `amTua(ms)`. Hộp hiện "Gõ búa sau N giây".
- Bỏ: đổi vật kiểu cũ, "Đòi thêm", "Đổi lấy" (thay bằng danh sách + thương lượng).
- `dbg`: `amh.lo`, `amh.tra`, `amh.mua`, `amh.ban`, `amh.npc`, `amh.tran` (túi người nhận đầy, mất món), cùng các khoá cũ.
### J.43 — chỉ NPC thật ngồi bàn
- Người ngồi bàn: tới `vai`=3 người giữ vai (tu sĩ còn sống, có đồ) + tới `tk`=2 thiên kiêu còn sống (`G.run.rivals`, túi `rv.tui`/`rv.cua` lập một lần theo hạt giống khi cần — bản lưu cũ chịu được). Bỏ khách vô danh. Danh sách cố định suốt buổi (thời gian không trôi trong hộp), không ai mới vào/biến mất.
- Hóa trang: ai cũng hiện "Khách đeo …", tu vi "bị che". Nhận ra (`amNhanP`, băm theo buổi): gốc 5% + thần thức (0,02×(thần−10), tối đa 30%; đang mở thần thức +35%; chỉ khi tu vi họ không cao hơn mình) + khảo vật ×0,3 + giao tình thiên kiêu ≥30 thì +40%; tối đa 90%. Nhận ra thì hiện "Khách đeo … (là Tên)" + cảnh giới.
- Vật tư cải căn đang thiếu (`ccAmVt`) được đặt vào túi một người ngồi bàn lúc mở hội nếu chưa ai có (coi như họ mang tới); NPC đưa vật tư cải căn trước, rồi đồ dởm (muốn tống đi).
### J.44 — Mệnh thư trong Sổ tay
- `tuyenView()` thêm `cho` (lời mời đã đưa, chưa trả lời, chưa quá hạn), `moLai`, `moNo` (tin đồn phải tới nơi hẹn). `tuyenMoLai(id)` mở lại hộp lời mời (không tính số lần tự nhắc). Thẻ "Mệnh thư" trong Sổ tay (hiện khi có tuyến): tên tuyến, mốc, nơi, hạn bằng chữ, nút "Mở lại lời mời" (`ACT.tyMoLai`).
### Bài kiểm
- Luật: `am_hoi` viết lại (50 ý: nhu cầu, danh sách, đếm ngược tua được, nhiều vòng, thương lượng, bỏ cuộc, chuyển túi thật, NPC thật hóa trang); mới `menh_thu` (7 ý, đã thêm vào `test:rules`); `cai_can_hiem` sửa theo túi NPC thật. Giao diện: `am_hoi` viết lại, mới `menh_thu`.
- Kết quả: `npm run test:rules` 938 ý đạt (mốc 906); giao diện 178 ý đạt (mốc 168); `content:check` đạt.
### Còn dở
- NPC chưa tự bổ sung túi/của cải theo thời gian (chỉ đổi qua Ám Hội); NPC trả bằng đan/linh thạch trong danh sách, chưa tự thương lượng bằng vật khác. Người chơi bán chỉ nêu linh thạch.
- Túi người nhận đầy (12 món) thì món nhận thêm bị mất (có `dbg amh.tran`) — hiếm.
- Bot chưa biết ngồi Ám Hội mới (không chạy bot).

## Sửa-K — truy đuổi (yêu cầu mới B)
Luật: `src/game/core2/60-truy-duoi.js` · bảng: `content/rules/truy.js` (TRUY) · chữ: `content/text/truy.json` (truy.*) · cờ `FEAT.truy` (bật; test.js `fresh` tắt, bài `truy` bật lại).
- Chạy thoát khỏi trận (`combatContinue` với `flee`) → tung `p` theo loại địch; trúng thì `r.truy={k,n,i,ek,el,d,t0,until,nx}` (một kẻ bám theo một lúc; kẻ mới đuổi dai hơn mới thay). Không đuổi: thiên kiếp, luận bàn, ảo giác tâm ma, boss, bí cảnh (bt), quan ải, khôi lỗi/vật (f:'vat'), địch kém từ 2 cảnh giới.
- Loại: f:'thu' → thu; f:'quy' → quy; sontac → tac; người khác → tu; kẻ thù kiếp trước / kẻ truy sát (after.nemesis, ent) → ke; quan phủ truy nã vì nợ (`noTruyNa`, Sửa-B) → no; `cuop` có sẵn trong bảng, gọi `truyStart('cuop',…)` (chưa có hành động cướp nào gọi).
- Dò: mỗi `gian` giờ ngẫu nhiên tung `chan`. Đang đi: `travelTick` được chia tới đúng lúc dò, bị chặn thì `snapStop()` (tâm ô gần nhất giữa chặng) + `r.halt`, mở KYNGO `truy_chan` (sp:1); xong bấm "Đi tiếp". Đang có cảnh khác / bế quan / ngoài bản đồ: hoãn nửa khoảng, không chồng.
- Cắt đuôi: hết hạn; thắng trận chặn (thua cũng dứt); vào thành (huỷ với thu/tac/quy, rút nửa hạn còn lại với tu/ke/cuop một lần, quan sai không sợ thành); tông môn mình huỷ; trả hết nợ thì sai dịch thôi; nộp của / thương lượng / lẩn đi thành công.
- Né / biết trước: che giấu tu vi (×hide, trừ yêu thú), thần thức hơn địch (đang phóng thần thức hoặc địch kém cảnh giới) ×than và có thêm lựa chọn "Lẩn đi".
- HUD: biểu tượng `truy` ở dải vết thương (chữ nhỏ "đuổi"), chú thích chữ "vẫn bám riết / sắp mất dấu…", không số. Nhật ký: truy.bat, truy.do, truy.chan, truy.chon, truy.danh, truy.an, truy.het, truy.khong.

| loại | p bám | ngày truy | giờ giữa 2 lần dò | chặn mỗi lần | lựa chọn |
|---|---|---|---|---|---|
| thu yêu thú | 0,45 | 1–4 | 6–18 | 0,35 | đánh, chạy |
| tac sơn tặc | 0,6 | 3–8 | 8–24 | 0,4 | đánh, chạy, nộp, thương lượng |
| tu tu sĩ | 0,5 | 5–15 | 12–36 | 0,35 | đánh, chạy, thương lượng |
| ke kẻ thù | 0,8 | 15–40 | 24–72 | 0,3 | đánh, chạy, thương lượng |
| quy quỷ vật | 0,3 | 1–2 | 4–12 | 0,4 | đánh, chạy |
| no quan sai | 1 | 20–45 | 24–96 | 0,3 | đánh, chạy, nộp, thương lượng |
| cuop kẻ bị cướp | 0,7 | 7–20 | 12–48 | 0,35 | đánh, chạy, nộp, thương lượng |

Hệ số khác: địch hơn mỗi bậc (tối đa 3) hạn ×(1+0,5), chặn +0,08 · che tu vi ×0,6 · thần thức hơn ×0,8 · lẩn đi 0,6 · chạy tiếp 0,4 + 0,015×thân pháp (tối đa 0,85), thành công lùi lần dò 12–24 giờ · nộp của 25% linh thạch (ít nhất 5) hoặc 30% tiền phàm · thương lượng 0,3 + 0,01×đạo tâm (tối đa 0,7) · vào thành rút hạn ×0,5.

Bài kiểm: test.js `truy` (29 ý, có bài bị chặn giữa chặng đi dài hơn một ngày đường); test-ui.js `truy`.
Còn dở: chưa có hành động "cướp" của người chơi để dùng loại cuop; truy đuổi chưa nối ô đất (Đ8b); bot chưa có lựa chọn riêng (dùng chung kyPick).

## YÊU CẦU MỚI (chưa làm, đã xếp lịch)
A. Ô ĐẤT theo địa điểm (xếp: đợt mới "Đ8b Đất đai", làm sau Đ9 bộ máy, trước Đ10):
   - Mỗi địa điểm có N ô đất; mỗi ô mang 1 công trình → mở đúng 1 mục trong modal địa điểm (vd thành A 3 ô: tửu lầu, trạm dịch, tạp hoá → modal chỉ có 3 mục đó). Thay cách hiện nút cố định theo loại nơi (PGROUP) bằng nút sinh từ công trình trên ô.
   - Hoang dã: ô sinh ngẫu nhiên theo địa hình (hang động, hồ nước, trận pháp…). Công trình tự nhiên: không xây được, nhưng phá được. Được xây trận pháp, động phủ trên đất hoang không chủ.
   - Ô có chủ (NPC/thế lực Đ8): xây/phá → giảm thiện cảm chủ, có thể bị truy đuổi đánh nhau; ở thành/trấn ảnh hưởng nặng, có thể truy nã (nối danh tiếng Đ1.4).
   - Sau này: mua nhà/đất → người chơi chủ động xây/phá công trình trên ô mình sở hữu.
   - Bản lưu cũ: sinh ô cho các nơi hiện có sao cho giữ đủ các dịch vụ đang có (không mất quán/chợ của người chơi cũ).
B. TRUY ĐUỔI (xếp: Sửa-K, ngay sau Sửa-J):
   - Sự kiện gặp địch (sơn tặc…) → chọn chạy → địch có thể truy đuổi trong thời gian X (theo loại địch).
   - Còn thời hạn truy đuổi: cứ mỗi khoảng ngẫu nhiên có xác suất bị tấn công, kể cả ĐANG DI CHUYỂN trên đường (chặng đi dài trong hạn truy vẫn có thể bị chặn giữa đường).
   - Hết hạn / giết được / tới nơi an toàn có thể cắt đuôi (tự thiết kế); nối hệ giao tranh/thần thức/che giấu tu vi (core2/23–30) để có cách né.
THỨ TỰ MỚI: Sửa-J → Sửa-K → Đ9 (bộ máy còn lại, nhập tuyến GPT) → Đ8b Đất đai → Đ10 → Đ11 → Đ12.

## NGƯỜI DÙNG CHỐT ĐỢT 8 (câu 47–49) — làm ở Sửa-L (sau Sửa-K)
47. B: khi người chơi đưa đồ ra bán ở Ám Hội, được tự chọn danh sách vật muốn nhận (tên + số lượng) trước khi đấu; linh thạch là một lựa chọn trong danh sách nếu muốn.
48. B: tạm dừng đồng hồ 10 giây khi người chơi đang mở phần Thương lượng (giới hạn vài giây, tránh lạm dụng).
49. Túi đầy (NPC lẫn nhân vật chính): đồ nhận thêm vào "tạm giữ bên người" (ngoài các ô túi); sau 365 ngày không dọn chỗ để cất vào túi thì mất. Áp chung cho mọi nguồn nhận đồ (Ám Hội, đấu giá, nhặt, phần thưởng…), thống nhất với cơ chế gửi tại chỗ của Sửa-G (xem có nên gộp).
50. Truy đuổi: TĂNG hạn truy lên vài năm tới cả chục năm (tùy loại địch, mạnh/thù sâu thì lâu hơn); chỉnh tần suất chặn cho hợp hạn dài (không bị chặn liên tục). Làm ở Sửa-L.
51. A: bị chặn giữa đường xong thì đứng yên, người chơi tự bấm "Đi tiếp".

## Sửa-L — câu 47, 48, 49, 50, 51 (đợt 8)
### L.47 — người chơi tự đặt danh sách vật muốn nhận khi bán ở Ám Hội
- Chọn món đưa ra bàn → bước "đặt danh sách" (`sc.ph='dat'`, `sc.dua`): thêm tối đa `AM_HOI.datN`=3 món từ linh thạch bốn phẩm, đan có giá, vật tư cải căn (`amDatCand`); mỗi món chỉnh số lượng −5/−1/+1/+5 (1–`datSl`=99, mặc định vừa đủ giá mở), bỏ món. Không đặt gì thì như cũ (người mua trả linh thạch).
- NPC chỉ trả bằng món trong danh sách người chơi đặt (linh thạch cũng chỉ đúng phẩm đã nêu). NPC không có món nào trong danh sách mà muốn mua thì **đề nghị đổi bằng vật khác** trong túi họ (`lot.de`, `amNpcDe`, nhật ký `amh.de`): người chơi thấy "Nhận đề nghị của …" kèm giá trị; nhận thì người ấy dẫn, rồi gõ búa như thường. Không nhận thì thôi.
### L.48 — đồng hồ dừng khi thương lượng
- Chọn một vật ở phần Thương lượng (món của người khác) → đồng hồ gõ búa và lúc NPC ngẫm cùng dừng (`lot.dung`), tối đa `AM_HOI.dung`=15 giây mỗi món (`lot.dungDa`); đưa giá, trả theo danh sách, chọn vật khác hay bỏ cuộc thì đồng hồ chạy lại. Hộp hiện "Đồng hồ tạm dừng … (còn N giây)". Bài kiểm tua bằng `amTua`.
### L.49 — tạm giữ bên người (core2/61-tam-giu.js, bảng TAM_GIU, chữ tg.*)
- `r.tamGiu=[{t,v,n,at,bao}]`. Bắt chung cho mọi nguồn: `tgSweep` chạy trong autoCheck, saveSoon, advanceTime, sau gõ búa Ám Hội, khi nhận đan, khi nhận vật tư cải căn; so với lần đếm trước (`r._tgS`), loại nào vừa tăng mà túi vượt sức chứa thì món mới nhất sang tạm giữ (pháp bảo mặc được thì mặc trước). Đan không còn đổi ra linh thạch khi túi đầy. Ám Hội: túi đầy vẫn trả giá được.
- Đồ tạm giữ không nằm trong ô túi (không dùng/bán/đem ra bàn); túi đồ có mục "Tạm giữ bên người": tên, hạn bằng chữ ("còn chừng N tháng", "sắp mất, còn N ngày"), nút "Cất vào túi" (khoá khi túi đầy), "Bỏ". Quá `han`=365 ngày thì mất; trước `bao`=30 ngày báo một lần.
- NPC (người giữ vai, thiên kiêu): túi 12 món đầy thì món nhận vào `o.tg`, tự cất khi túi có chỗ, quá hạn thì mất; NPC túi đầy vẫn trả giá.
- **Quyết định gộp với Sửa-G**: vật tư cải căn nhận khi túi đầy giờ cũng vào tạm giữ (không gửi lại tại chỗ nữa) cho thống nhất một cơ chế; món đã gửi tại chỗ trong bản lưu cũ (`r.ccGui`) vẫn lấy lại được ở nơi gửi như trước.
- Chưa bắt: vật liệu chồng theo loại (`r.mats`) và lệnh bài; đồ tràn vì túi nhỏ đi (tháo túi trữ vật) vẫn giữ như cũ.
### L.50 + L.51 — truy đuổi nhiều năm, đứng yên sau khi bị chặn
| loại | ngày truy (trước → nay) | giờ giữa 2 lần dò (trước → nay) | chặn mỗi lần |
|---|---|---|---|
| thu yêu thú | 1–4 → 365–730 (1–2 năm) | 6–18 → 240–720 (10–30 ngày) | 0,35 → 0,3 |
| tac sơn tặc | 3–8 → 730–1460 (2–4 năm) | 8–24 → 360–1080 (15–45 ngày) | 0,4 → 0,35 |
| tu tu sĩ | 5–15 → 1095–2190 (3–6 năm) | 12–36 → 480–1440 (20–60 ngày) | 0,35 → 0,3 |
| ke kẻ thù | 15–40 → 2190–3650 (6–10 năm) | 24–72 → 480–1440 (20–60 ngày) | 0,3 → 0,35 |
| quy quỷ vật | 1–2 → 365–730 (1–2 năm) | 4–12 → 240–720 (10–30 ngày) | 0,4 → 0,35 |
| no quan sai | 20–45 → 1460–2920 (4–8 năm) | 24–96 → 720–2160 (30–90 ngày) | 0,3 |
| cuop kẻ bị cướp | 7–20 → 1095–2555 (3–7 năm) | 12–48 → 480–1440 (20–60 ngày) | 0,35 → 0,3 |
- Địch mạnh hơn mỗi bậc: hạn ×(1+0,25) (trước 0,5), tối đa 3 bậc → kẻ thù mạnh có thể tới khoảng 17 năm. Trung bình bị chặn chừng 2–4 tháng một lần: chặng đi vài tuần vẫn có nguy cơ thật, không bị chặn liên tục.
- 51: đã đúng từ Sửa-K (`r.halt`); thêm bài kiểm: sau khi chạy tiếp / đánh thắng vẫn đứng giữa đường, có nút "Đi tiếp".
### Bài kiểm
- Luật: mới `am_dat` (16 ý: danh sách, đề nghị đổi, đồng hồ dừng), `tam_giu` (16 ý); `truy` thêm 6 ý; `am_hoi`, `cai_can_tui` sửa theo luật mới. Giao diện: `am_hoi` thêm bước đặt danh sách + đồng hồ dừng; mới `tam_giu`; `truy` thêm nút Đi tiếp.
- Kết quả: `npm run test:rules` 1005 ý đạt (mốc 967); giao diện 195 ý đạt (mốc 187); `content:check` đạt.
### Còn dở
- Bot chưa biết đặt danh sách/nhận đề nghị ở Ám Hội, chưa biết cất đồ tạm giữ (không chạy bot).
- Mỗi câu 47/48 chung một commit vì sửa cùng chỗ.


## NGƯỜI DÙNG CHỐT ĐỢT 9 (câu 52–55) — làm ở Sửa-M
52. A: tạm giữ không giới hạn số món.
53. B: không tự cất; người chơi tự chọn món nào cất vào túi (giữ nút "Cất vào túi" từng món).
54. A: áp tạm giữ cho cả vật liệu chồng theo loại (loại mới khi túi đầy → tạm giữ; cùng loại đã có ô thì chồng vào như cũ).
55. A: khi NPC bán ở Ám Hội, NPC khác cũng được đề nghị đổi vật khác (người bán NPC xét theo nhu cầu của mình).


## Sửa-M — câu 52, 53, 54, 55 (đợt 9)
- 52: tạm giữ vốn không có giới hạn số món (đã kiểm bằng bài: 25 pháp bảo liền vẫn vào hết). Chỉ hạn 365 ngày.
- 53: không tự cất. Rà lại: phía người chơi không còn chỗ nào tự cất (chỉ nút "Cất vào túi" từng món, `tgCat`; ghép đồ mặc được vẫn là việc mặc đồ, không phải cất). Có chỗ trống thì đồ vẫn nằm ở tạm giữ chờ bấm. NPC vẫn tự cất.
- 54: `tgSweep` (core2/61-tam-giu.js) bắt thêm: lệnh bài (`t:'q'`, `v`=mã vùng) và vật liệu chồng (`t:'m'`, `v`=mã, `c`=số lượng). Loại vật liệu MỚI khi túi đầy thì cả phần vừa nhận sang tạm giữ, cùng loại cộng dồn `c` (giữ mốc `at` của lần đầu); loại đã có ô trong túi thì chồng vào như cũ. Cất vào túi được cả chồng; hạn 365 ngày như món thường. Bản lưu cũ (snapshot không có `m`) bỏ qua lần đầu.
- 55: Ám Hội, người bán là NPC: NPC khác không có thứ trong danh sách thì đề nghị đổi bằng vật khác (`amNpcDoi`, nhật ký `amh.deNpc`). Người bán xét theo nhu cầu: độ hợp `amHop` >= `hopMin` và giá trị (đã nhân độ hợp) đủ vượt mức đang dẫn thì nhận, vào đấu như một lần trả giá (nhiều vòng, đếm ngược); vật không hợp thì bị chê (`amh.deTu`, ghi vào nhật ký bàn). Chữ: `amh.log.deNpc`, `amh.log.deTu`.
- Bài kiểm: `tam_giu` thêm 12 ý (vật liệu, lệnh bài, cộng dồn, không giới hạn, không tự cất, cất cả chồng, mất sau 365 ngày); mới `am_npc_doi` (5 ý, đã thêm vào `test:rules`).
- Còn dở: giao diện chưa có bài riêng cho dòng tạm giữ của vật liệu (dùng lại thẻ có sẵn, tên ghi "× số lượng"); bot chưa biết cất tạm giữ.

56. A: hạn tạm giữ chồng vật liệu tính từ lần vào đầu tiên (giữ như đang làm).
57. A: NPC bán ở Ám Hội chỉ nhận pháp bảo hoặc vật cùng loại danh sách (giữ).

## Đ9.2–Đ9.4 — rà 54 tuyến, Sổ tay người đã gặp + thế lực, bài menh_tuyen hoàn chỉnh
- Công cụ `node tools/mo-phong-tuyen.js [OR02 …]`: dò tĩnh mọi đường chọn (đại lộ chạy cả hai kiểu: đủ hồi 1 / bỏ hồi 1), rồi chạy thật mỗi kết bằng `tuyenTick/tuyenGap/kyPick`; báo kết không tới được, lựa chọn không bao giờ mở, vật không ai trao, phàm + cảnh giới, chữ còn mã, tin đồn quá xa so với hạn, vai giao việc ở nơi khác, đại lộ giống chữ tuyến xuất thân (cụm ba chữ). Kết quả: 162/162 kết tới được, 252/252 đường chạy thật đạt, 0 lỗi nội dung; 1 cảnh báo (OR07 N2 NP08 giao việc ở LOC12).
- Lỗi bộ máy tìm ra và đã sửa (core2/59):
  1. Bản đồ rất rộng (LOC01→LOC02 đi bộ phàm nhân ~1 năm), 112 nút có hạn 6–12 tháng không thể tới kịp → hạn mềm cộng thời gian đi bộ từ chỗ đứng tới nơi hẹn lúc nút mở (`tyDuongT`, trần `TY_CFG.duongMax`=36 tháng).
  2. Tin đồn chỉ hiện khi sang tháng mà đang đứng yên ngoài bản đồ (đang mở thẻ địa điểm thì không) → tới điểm cuối của chặng thì gặp ngay (gộp với hook "hoãn khi đi đường" của nhánh chính; lúc `travelTick` gọi `arrive` ở điểm cuối `r.moving` vẫn còn nên coi seg cuối là đã dừng); thẻ địa điểm đang mở vẫn chặn lời mời (không chen ngang).
  3. Tin đồn chưa từng đưa lời mời thì Mệnh thư không có nút mở → `tyMoDuoc`: nút đang mở, chưa quá hạn, đứng đúng nơi là mở được.
- Đọc mẫu: lời văn đại lộ khô, trừu tượng; vài câu tuyến xuất thân tối nghĩa → danh sách cho GPT ở docs/content/GUI-GPT/sua-sau-ra-soat.md (không sửa tệp tuyến).
- Sổ tay (câu 40): `core2/63-so-tay-nhan-vat.js`. `r.gapVai={NPxx:{doi,ten,y,how}}` ghi khi lời mời tuyến hiện ra (người gọi + mọi `{NPxx}` trong đoạn mở, người còn sống) và khi thầy ở nơi neo dạy (`tuThay`). `soVaiView()`: tên (người hiện giữ vai, hoặc tên người đã gặp nếu người ấy mất), vai, nơi, còn sống/đã mất, thiện cảm bằng chữ (`favLv`), người kế hoặc vật chứng còn lại. `r.faQh` cộng `e.fa` của lựa chọn tuyến. `soFaView()`: 10 thế lực, tình trạng bằng chữ, người đứng đầu, quan hệ (góp sức / tổn hại / chưa dính dáng), tiếng ở căn cứ (`danhName`), sổ cống hiến (`faCong`). Không số nghiệp. Giao diện: thẻ "Người đã gặp", "Thế lực" trong Sổ tay (src/react/bang/SoTay.jsx, bảng `journal` đã đăng ký). Chữ `so.*` trong content/text/menh-tuyen.json.
- Bài: luật `menh_tuyen_d94` (15 ý: cả 45 xuất thân bỏ mặc → đứng ngoài không kẹt; người giao việc chết → đoạn thay thế; hạn cộng đường; tới nơi gặp ngay; đại lộ hồi 2, đổi một lần mỗi kiếp, kiếp mới đổi lại được), `tuyen_ra_soat` (4 ý, gọi mo-phong-tuyen), `so_tay_nv` (8 ý); giao diện `so_tay_nv`. Cả ba bài luật đã thêm vào `test:rules`.
- Còn dở: "đã gặp" mới ghi qua tuyến và thầy dạy (chưa có NPC vai đi lại trên bản đồ); bộ kiểm vẫn chưa so mục tiêu đại lộ với xuất thân bằng nghĩa (chỉ cùng người + nơi và giống chữ).

## NGƯỜI DÙNG CHỐT (câu 58–60)
58. A: kết cục nghề chỉ hiện ở màn hết kiếp cho nghề chính.  59. A: giữ lời thăng bậc cũ của 5 nghề.  60. A: mỗi bước cải căn một sự kiện.
- Tên tệp cảnh truy đuổi: content/canh/truy.json (đã sửa tài liệu GUI-GPT-2 cho khớp bộ kiểm).
70. A: hạn mốc tự cộng thời gian đi bộ (tối đa 3 năm).
71. C: "Người đã gặp" ghi mọi người đã từng tiếp xúc gần/tương tác (nói chuyện, giao dịch, giao đấu, đi cùng, nhận việc…), không cần thiện cảm cao.
72. B mở rộng: thang quan hệ thế lực 7 mức bằng chữ (đề xuất, chờ người dùng duyệt tên): Tử thù – Thù địch – Bất hòa – Xa lạ – Giao hảo – Thân thiết – Chí giao (= cùng tiến cùng lùi; người dùng đã chốt tên); "Đồng minh" là trạng thái kết minh chính thức (có thể làm cờ riêng).
73. Sau Đ10: tổng hợp lại mọi thứ cần gửi GPT (gồm sua-sau-ra-soat.md + phần chữ Đ10).
Việc cần làm (Sửa-N, làm cùng/ trước Đ8b): câu 71, 72.
