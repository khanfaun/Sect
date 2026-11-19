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
