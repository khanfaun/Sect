# Ánh xạ hiệu ứng chiêu (Đ7.1)

Bảng dùng khi chép chiêu của HN C §10 P.3 (và các pháp môn mở rộng Đ11) sang `SK_RAW` (`content/items/sk-raw.js`).
Công cụ liệt kê khoá đang có: `node tools/liet-ke-fx.js`. Khoá mới xử lý ở `src/game/core2/50-fx-moi.js`, chữ ở `content/text/fx-moi.json`.

## Quy đổi chung

| Cách viết của C | Trong game |
|---|---|
| "1,15 A" (công vật lý) | `p:1.15`, và thêm mã chiêu vào `SK_PHYS` (`content/items/sk-phys.js`) để lấy công vật lý (`dt:'vl'`) |
| "1,35 M" (pháp công) | `p:1.35`, **không** ghi vào `SK_PHYS` (mặc định `dt:'phep'`, dùng công phép) |
| "8% L" (chi phí theo linh lực tối đa) | cột chi phí `c = % × 0,3` (vd 8% → 2.4). `skillCost` nhân `TAB.mp[cảnh giới]/30`, mà linh lực tối đa ≈ `TAB.mp`, nên 1 đơn vị `c` ≈ 3,3% linh lực tối đa |
| "+3% H" (trả bằng khí huyết) | `selfHp:3` (không bao giờ tụt dưới 1) |
| hồi chiêu N (theo hành động của chủ) | `cd:N` — sau khi dùng phải chờ N−1 lần ra tay; nút mờ và ghi "hồi chiêu"; tự đánh bỏ qua |
| hộ thể x A | `block:x` (có sẵn, theo công vật lý) |
| hộ thể x H | `blockH:x` · hộ thể x M → `blockM:x` · chỉ đủ khi mục tiêu dưới 25% → thêm `lowHp:.25` (trên ngưỡng còn một nửa) |
| hồi x% H | `heal:x` (có sẵn) |
| hút / hồi x% sát thương đã gây | `drain:x` (có sẵn) |
| suy nhược n lượt (CH12) | `weak:n` (có sẵn) · tự chịu sau đòn → `selfWeak:n` |
| choáng (CH13) | `stun:%` (có sẵn) |
| xoá chảy máu / nhiễu loạn / khủng hoảng | `cleanse:1` (có sẵn: xoá độc, bỏng, suy nhược). Game chưa có trạng thái chảy máu riêng |
| giảm một tầng độc | `curePoi:.5` · ngừng tick độc n lượt → `poiStop:n` |
| độc theo liều | `poison:x` (có sẵn, theo công) |
| diện rộng | `aoe:true` trong fx (máy nhân 0,6 mỗi mục tiêu, nên `p` ghi = hệ số C ÷ 0,6) |
| tăng x% khi địch đang tụ | `vsCharge:x` · huỷ tụ → `breakCharge:1` · dừng mọi tụ lực → `breakAll:1` |
| đánh dấu / lộ ý đồ (CH15) | `mark:1` (giữ tới hết lượt kế của mục tiêu) · thêm hiệu ứng nếu đã bị đánh dấu → `markWeak:n` |
| làm chậm (CH17) | `slow:%` (đẩy lùi vị trí trên thanh hành động) |
| phản niệm khi mục tiêu cao hơn hai đại cảnh giới | `backlash:%` khí huyết tối đa |
| giảm x% sát thương nhận n lượt (kháng hồn, chống nứt…) | `cutT:[x,n]` |
| nhận thay x% đòn tới cho đồng đội | `cover:x` (giảm 25% phần nhận; không có đồng đội thì tự giảm 25% một đòn) |
| linh thú đỡ x% một đòn | `allyCover:x` · thực thể triệu hồi gánh trọn rồi tan → `sumCover:1` |
| tăng đòn kế của thú / khôi | `allyRage:n` (+12%/tầng; `allyK:'khoi'` để nhắm khôi) · hồi thú x% → `allyHeal:x` |
| gọi thực thể | `summon:{k:'linh'|'khoi',hp:%H,atk:%M,n:lượt}` · thu về → `unsummon:1|'khoi'` (+ `mpBack:.3` hoàn linh lực chiêu gọi) |
| đặt trận: địch vào cận chiến chịu x M một lần, giữ n lượt | `trap:[x,n]` · tiêu trận gây sát thương → `needTrap:1` (không có trận thì một nửa) |
| xoá trận / buff của địch | `dispel:1` |
| bỏ qua x% hộ thể | `pierceBlock:x` · bỏ qua thủ → `pierce:x` (có sẵn) |
| thêm x H sát thương | `hpDmg:x` |
| chỉ có tác dụng với hồn / quỷ | `fOnly:'quy'` (vật khác một nửa) |
| đánh từ ẩn nấp | `fromHide:hệ số khi không ẩn` (vd 1,1/1,7) · ẩn n lượt → `hide:n` (+ `evade:1` một lần né chắc) |
| tăng cơ hội rút lui | `fleeUp:điểm %` (lần rút lui kế tiếp) |
| chính xác +x một lượt | `cxT:x` |
| chiêu có mục tiêu nhưng không gây sát thương | `tgt:1` (một địch) hoặc `tgt:'all'` |

## Nội tại công pháp (dòng `fx` của công pháp nghề tu)

Có sẵn: `atkP`, `matkP`, `hpP`, `mpP`, `defP`, `crit`, `tp`, `dodge`, `than`, `drain`. Mới (đọc ở 50-fx-moi.js / 51-nghe-tu.js):
`cx` (chính xác cộng thẳng), `pierceAdd` (điểm % phá giáp cộng vào mọi đòn), `drainRel` (% hút tương đối), `poiRes` (% giảm độc nhận),
`sumT` (thêm lượt cho linh ảnh), `sumHp` (% khí huyết khôi lỗi), `petHeal` (% chữa thú), `trapP` (% uy lực trận).
Hiệu ứng chưa có hệ trong game (đan, phù, độ bền, chế tạo, kháng hồn riêng…) ghi bằng dòng chữ `tuNote` — chỉ để đọc, không cộng số.

## Chưa làm (chờ hệ sau)
- Vật tư dùng trong chiêu (đan hồi có thật, bó dược, phù giấy, liều độc, lõi khôi): chiêu chỉ tốn linh lực, chưa trừ vật tư (P.5 chưa nhập).
- Kháng hồn (ST07-Hồn), chảy máu, độ bền trang bị trong trận: chưa có kênh riêng, dùng `cutT` / `cleanse` thay.

## Đ7.2 — 48 chiêu nghề tu lõi đã chép

Mã viết thường `sk01a`…`sk16c`; A, B bậc 1, C bậc 2 (không phải thần thông; C mở ở tầng ba công pháp, cần Trúc Cơ). Chiêu công vật lý (A của C) ghi trong `SK_PHYS`: sk01a, sk01c, sk02a, sk14a, sk16b.

| Mã | Tên | fx | Ghi chú lệch so với C |
|---|---|---|---|
| sk01a | Thử Phong | p 1,15 · vsCharge 15 | |
| sk01b | Gạt Lưỡi | block 0,7 | chưa có "địch suy nhược khi hấp thụ đòn cận chiến" |
| sk01c | Đoạn Nhịp | p 1,6 · breakCharge | dùng được cả khi địch không tụ (chỉ sát thương) |
| sk02a | Chấn Cốt | p 1 · hpDmg 0,02 | chưa kẹp tổng 1,4 A |
| sk02b | Trầm Tức | blockH 0,08 | chưa giảm tốc bản thân |
| sk02c | Gánh Sơn | cover 0,5 | |
| sk03a | Huyết Ti | p 1,35 phép · drain 10 · selfHp 3 | hút cả trên khôi/xác |
| sk03b | Khóa Mạch | cleanse | |
| sk03c | Triều Huyết | p 2,2 · selfHp 8 · selfWeak 1 | |
| sk04a | Vấn Danh | p 0,9 · mark | |
| sk04b | Lưu Danh | cutT [0,25; 2] | kháng hồn quy về giảm sát thương nhận |
| sk04c | Tống Ảnh | p 2 · fOnly quỷ | |
| sk05a | Quán Niệm | tgt · mark | |
| sk05b | Trấn Hải | cleanse | |
| sk05c | Phá Tưởng | p 1,7 · markWeak 2 · backlash 5 | |
| sk06a | Mở Khế | summon linh (0,18 H, 0,4 M, 3 lượt) | |
| sk06b | Hoàn Khế | unsummon · mpBack 0,3 | |
| sk06c | Đồng Môn | sumCover (dư 20% về chủ) | |
| sk07a | Dẫn Tức | allyRage 1 | linh thú đồng hành (f thú) hoặc linh ảnh |
| sk07b | Chung Mạch | allyHeal 15 · selfHp 3 | |
| sk07c | Hộ Chủ | allyCover 0,4 | chưa có độ tin cậy thú |
| sk08a | Chôn Tinh | trap [0,6; 2] | |
| sk08b | Chuyển Vị | fleeUp 20 | |
| sk08c | Khép Bàn | p 3 (≈1,8 mỗi mục tiêu) · aoe · needTrap | chưa giới hạn ba mục tiêu |
| sk09a | Dẫn Dược | pillBoost 15 | dùng một viên Hồi Xuân / Bổ Huyết trong túi |
| sk09b | Phân Tạp | curePoi 0,5 | |
| sk09c | Khóa Độc Tức | poiStop 2 | |
| sk10a | Phục Diệp | heal 8 | chưa trừ bó dược |
| sk10b | Cầm Huyết | cleanse | |
| sk10c | Giữ Mầm | blockH 0,12 · lowHp 0,25 | chỉ lên bản thân |
| sk11a | Thử Chất | p 1 · mark | |
| sk11b | Chống Nứt | cutT [0,1; 3] | độ bền trang bị chưa có trong trận |
| sk11c | Rút Chốt | p 1,6 · weak 1 | |
| sk12a | Nét Chặn | blockM 0,7 | chưa trừ phù giấy |
| sk12b | Nét Phá | p 1,5 · pierceBlock 0,2 | |
| sk12c | Nét Tịch | tgt all · dispel | xoá hộ thể/khí thế địch thay cho xoá trận |
| sk13a | Khởi Cốt | summon khôi (0,25 H, 0,35 M, 5 lượt) | chưa cần khôi/lõi sở hữu |
| sk13b | Giật Dây | allyRage 3 (khôi) | |
| sk13c | Tháo Lõi | unsummon khôi · blockH 0,1 | |
| sk14a | Điểm Độc | p 0,7 · poison 0,6 | chưa trừ liều độc |
| sk14b | Hồi Chất | cleanse | |
| sk14c | Tản Chướng | p 1,33 · aoe · weak 2 · poison 0,2 | chưa có độc lan sang đồng minh |
| sk15a | Gõ Nhịp | cleanse · cxT 5 | |
| sk15b | Lạc Thanh | p 1,1 · slow 15 | |
| sk15c | Tịch Khúc | tgt all · breakAll | |
| sk16a | Lệch Bóng | evade 1 · hide 2 | |
| sk16b | Chạm Gáy | p 1,7 · fromHide 0,65 | |
| sk16c | Đoạn Truy | fleeUp 25 | chưa bỏ lại vật mồi |

Mọi chiêu có `cd` theo cột hồi chiêu của C.

## Đ11 — 27 chiêu nghề tu mở rộng

Chiêu của B §7.5 viết lại theo khuôn số của C (A, B bậc 1 · C bậc 2, mở ở tầng ba; không chiêu nào là thần thông). Chiêu B có 5 chiêu mỗi pháp môn, chỉ giữ 3 chiêu tiêu biểu cho đúng khuôn 3 chiêu một công pháp của C. Công vật lý: sk18a, sk19c, sk22a. Phần tử: Phật pháp `phat` (sk19a, sk19c), Lôi pháp `loi` (sk23*), còn lại `vo`.

Khoá mới (xử lý ở `src/game/core2/69-nghe-tu-mo-rong.js`, chữ `content/text/nghe-tu-mo-rong.json`):

| Khoá | Nghĩa |
|---|---|
| `vsF:[họ,x]` | đánh họ kẻ địch đó (`quy` = hồn quỷ, thi) ×x |
| `needSum:'thi'` | cần thực thể triệu hồi loại đó; không có thì một nửa; dùng xong thực thể tan (nổ xác) |
| `dinh:1` | địch cảnh giới thấp hơn: choáng chắc; ngang: 40%; cao hơn: vô hiệu (Ngôn "Định") |
| `huyenPhan:1` | địch cảnh giới cao hơn: chiêu không choáng được, bản thân choáng (phản ảo) |
| `mpDrain:x` | hút x% linh lực tối đa của địch (địch không có linh lực thì hồi x/2% của mình) |
| `devour:x` | kết liễu bằng chiêu này: `addTv(x)`, 20% tâm ma +3 |
| `tho:y` | tổn y năm thọ (cộng dồn, trừ khi đủ một năm); quá ba lần một năm: 20% thiên khiển (thần thức tổn thương) |
| `ltCost:n` | tốn n linh thạch; thiếu thì phần hộ thể / rút lui vô hiệu |

Có sẵn được dùng thêm: `stun`, `vuln` (giảm thủ), `crit`, `h` (số đòn), `evade`, `cxT`, `cutT`, `fleeUp`, `blockH`, `blockM`, `pierceBlock`, `drain`, `poison`, `summon` (loại `thi`).

| Mã | Tên | fx | Lệch so với B |
|---|---|---|---|
| sk17a | Phệ Tâm Cổ | p 0,8 · độc 0,5 | |
| sk17b | Kim Tằm Cổ | p 1 · hút 25 | |
| sk17c | Vạn Cổ Thực Thiên | p 1,33 diện rộng · giảm thủ 2 · độc 0,2 | |
| sk18a | Thi Độc Trảo | p 1,1 vật lý · độc 0,3 | |
| sk18b | Thiết Thi Hộ Chủ | gọi xác luyện (0,3 H, 0,3 M, 3 lượt) | |
| sk18c | Thi Bạo | p 2,5 diện rộng · needSum thi | nổ xác luyện của mình thay cho xác trên chiến trường |
| sk19a | Sư Tử Hống | p 1 · choáng 30 · quỷ ×1,5 | B ghi "đánh ma" |
| sk19b | Kim Cương Hộ Thể | hộ thể 12% H | B ghi 30% H (vượt trần 30% của C P.5 nếu cộng dồn) |
| sk19c | Đại Thủ Ấn | p 1,8 vật lý · bỏ 50% hộ thể | B 220% — hạ theo khuôn C |
| sk20a | Ngôn Định | tgt · dinh | |
| sk20b | Văn Khí Hộ Thân | hộ thể 0,8 M | chưa theo lượng hạo nhiên khí |
| sk20c | Bút Lạc Kinh Phong | p 1,8 · quỷ ×1,4 | B 200% đánh tà ×1,5 |
| sk21a | Tiên Tri | né chắc 1 · chính xác +8 | |
| sk21b | Quan Nhân Quả | tgt · đánh dấu · suy nhược 1 · tổn thọ | B là thuật ngoài trận |
| sk21c | Tránh Hung | giảm 50% một lượt · rút lui +30 · tổn thọ | B là thuật ngoài trận (huỷ sự kiện xấu) |
| sk22a | Kim Tiền Tiêu | p 1,1 vật lý · chí mạng +10 | tự đặt (B không có bảng chiêu Thương tu) |
| sk22b | Mua Đường | rút lui +30 · 1 linh thạch | tự đặt |
| sk22c | Tán Tài Hộ Thân | hộ thể 15% H · 3 linh thạch | tự đặt |
| sk23a | Chưởng Tâm Lôi | p 1,3 Lôi · quỷ ×1,5 | |
| sk23b | Lôi Độn | né chắc 1 · chính xác +3 | |
| sk23c | Ngũ Lôi Oanh Đỉnh | 5 đòn × 0,42 | |
| sk24a | Huyễn Ảnh | né chắc 2 | |
| sk24b | Mê Hồn | p 0,6 · choáng 45 | |
| sk24c | Thiên Huyễn Lao Lung | p 1,4 · choáng 60 · suy nhược 2 · huyenPhan | chưa có "mất đạo tâm" |
| sk25a | Phệ Linh Thủ | p 1 · mpDrain 15 | |
| sk25b | Hắc Động | p 0,6 · giảm thủ 3 | |
| sk25c | Thôn Phệ Tinh Huyết | p 1,9 · hút 20 · devour 3 | |

Nội tại công pháp mới: `thuongLai` (% thù lao hợp đồng nghề tu), `tucMang` / `khuyMenh` (đánh dấu dòng tầng bốn, đọc qua `mrLv`).
