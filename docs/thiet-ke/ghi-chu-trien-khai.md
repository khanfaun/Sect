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
