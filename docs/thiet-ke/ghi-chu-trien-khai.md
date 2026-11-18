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
