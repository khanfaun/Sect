# PROMPT CHO GPT – DANH MỤC VẬT PHẨM, CÔNG PHÁP, KỸ NĂNG CHO GAME "PHÙ SINH"

---

Bạn là người biên soạn danh mục vật phẩm cho một game tu tiên chữ tên "Phù Sinh". Hãy viết hàng loạt mục theo đúng định dạng dưới đây. Mỗi mục phải có **tên, mô tả ngắn có hồn, và số liệu đúng luật** của game. Danh mục sẽ được đưa thẳng vào game, nên **không được bịa chỉ số, hiệu ứng, hay tên thuộc tính ngoài danh sách cho phép**.

## 1. Bối cảnh

Tu sĩ đi qua 6 cảnh giới: Luyện Khí → Trúc Cơ → Kết Đan → Nguyên Anh → Hóa Thần → Độ Kiếp. Mỗi cảnh giới có 4 tiểu cảnh: sơ kỳ, trung kỳ, hậu kỳ, viên mãn.

Vật phẩm có phẩm chất. Trang bị: Phàm phẩm, Hoàng phẩm, Huyền phẩm, Địa phẩm, Thiên phẩm, Tiên phẩm, Thần phẩm (số càng lớn càng hiếm, mạnh). Đan dược: Hạ phẩm, Trung phẩm, Thượng phẩm. Phong cách: cổ phong, thanh lạnh, có bi ai, có tình người, không hiện đại.

## 2. Những loại mục cần viết

| Mã loại | Tên hiển thị | Dùng để làm gì |
|---|---|---|
| `relic` | Pháp bảo / trang bị | Đeo trên người, cộng chỉ số |
| `pill` | Đan dược | Uống để hồi khí huyết, linh lực, đột phá… |
| `talisman` | Phù lục | Dùng một lần trong trận |
| `art_cp` | Công pháp | Học, vận công, cộng chỉ số theo hệ, có chiêu |
| `art_tp` | Tâm pháp | Nội tại, cộng chỉ số, đôi khi có đòn thần thức |
| `skill` | Kỹ năng / thần thông | Chiêu thức trong trận |
| `pet` | Linh thú (tên loài, không phải con cụ thể) | Đi theo, tham chiến |
| `mount` | Phương tiện | Đi đường nhanh hơn |
| `material` | Nguyên liệu | Luyện chế |
| `quest_item` | Vật nhiệm vụ / bảo vật kỳ vật | Cốt truyện, đổi lấy việc |
| `trait` | Thiên phú (tính cách bẩm sinh) | Chọn lúc tạo nhân vật |
| `origin` | Xuất thân | Nền tảng gia cảnh |
| `legacy` | Di vật kiếp trước | Mang từ kiếp trước |

## 3. Chỉ số được phép dùng (CHỈ DÙNG CÁC KEY NÀY)

Tên hiển thị tiếng Việt đi kèm để bạn viết mô tả:

| Key | Ý nghĩa | Giá trị thường gặp |
|---|---|---|
| `atkP` | Công vật lý % | 5–25 |
| `matkP` | Công phép % | 5–25 |
| `defP` | Thủ % | 5–35 |
| `hpP` | Khí huyết tối đa % | 5–30 |
| `mpP` | Linh lực tối đa % | 5–30 |
| `crit` | Tỉ lệ chí mạng % | 2–15 |
| `critDmg` | Sát thương chí mạng % | 10–50 |
| `dodge` | Né tránh % | 2–10 |
| `tp` | Thân pháp (số) | 1–8 |
| `ngo` | Ngộ tính (số) | 1–5 |
| `tam` | Đạo tâm (số) | 1–5 |
| `van` | Khí vận (số) | 1–5 |
| `tvP` | Tu vi nhận thêm % | 5–30 |
| `regenHp` | Mỗi lượt trong trận hồi % khí huyết | 1–6 |
| `regenMp` | Mỗi lượt trong trận hồi % linh lực | 2–10 |
| `startBlock` | Đầu trận có hộ thể bằng % khí huyết | 5–30 |
| `blockTurn` | Mỗi lượt thêm hộ thể % | 2–8 |
| `reflect` | Phản % sát thương nhận vào | 5–30 |
| `poisonHit` | Mỗi đòn gây độc (số) | 0.1–1 |
| `stunP` | Đòn đánh thêm % gây choáng | 3–15 |
| `elX` | Tăng sức hệ cho mọi đòn % | 5–30 |
| `elP` | Hệ cụ thể tăng % (ví dụ `{kim:25}`) | 10–30 |
| `pillP` | Đan dược mạnh thêm % | 10–50 |
| `mpCost` | Pháp thuật tốn ít linh lực hơn % | 5–25 |
| `shopP` | Mua hàng rẻ hơn % | 5–20 |
| `stonesP` | Linh thạch nhận thêm % | 5–25 |
| `lifeP` | Thọ nguyên % | 5–20 |
| `drain` | Hút % sát thương thành khí huyết | 2–15 |
| `execute` | Đánh kẻ dưới 30% khí huyết thêm % | 10–40 |
| `healAfter` | Thắng trận hồi % khí huyết | 5–30 |
| `firstEvade` | Né N đòn đầu mỗi trận (số) | 1–3 |
| `weakStart` | Địch suy nhược N lượt đầu | 1–3 |
| `vulnStart` | Địch phá giáp N lượt đầu | 1–3 |
| `pillSlot` | Thêm ô đan dược (số) | 1–2 |
| `tammaRes` | Tâm ma tăng chậm % | 10–60 |
| `hoTam` | Hộ tâm (số) | 3–10 |
| `atkStage` | Mỗi tiểu cảnh giới công vật lý % | 1–5 |
| `moveP` | Đi đường nhanh hơn % | 10–60 |
| `bqP` | Tĩnh tọa hiệu quả hơn % | 10–60 |
| `rageTurn` | Mỗi lượt thêm cuồng nộ (số) | 0.5–2 |
| `than` | Niệm lực (số) | 1–5 |

**Hiệu ứng trang bị được phép gắn vào công pháp / kỹ năng:** `p` (hệ số sát thương, 0.5–2.5), `crit` (chí mạng thêm), `poison` (độc), `h` (số lượt hồi/chịu), `pierce` (xuyên giáp 0–1), `charge` (cần tụ lực, số lượt), `aoe` (đánh diện rộng), `stun` (choáng), `heal` (hồi khí huyết), `shield` (hộ thể), `burn` (thiêu đốt), `bleed` (chảy máu), `evade` (né), `dispel` (xóa buff địch).

## 4. Hệ (nguyên tố)

Chỉ dùng: `kim` (Kim), `moc` (Mộc), `thuy` (Thủy), `hoa` (Hỏa), `tho` (Thổ), `loi` (Lôi), `bang` (Băng), `phong` (Phong), `am` (Âm), `phat` (Phật), `vo` (Vô hệ).
Quy luật: Kim khắc Mộc, Mộc khắc Thổ, Thổ khắc Thủy, Thủy khắc Hỏa, Hỏa khắc Kim.

## 5. Định dạng bắt buộc cho MỖI mục

Viết theo khuôn này, một mục một khối, để tôi có thể đọc và chuyển vào game:

```
[LOẠI] mã_viết_thường_không_dấu | Tên hiển thị | biểu tượng emoji
Hệ: <kim | moc | … | vo>
Phẩm: <số từ 1 đến 7 cho trang bị, hoặc 1–3 cho đan dược>
Cảnh giới tối thiểu: <0–5>
Hiệu ứng: key=giá_trị, key=giá_trị  (chỉ dùng key ở mục 3)
Chiêu (chỉ với công pháp và kỹ năng): tên chiêu | p=… | h=… | (hiệu ứng nếu có)
Mô tả: 1–2 câu, giọng cổ phong, có hồn.
Lời tựa (tùy chọn, 1 câu): thân phận hoặc chuyện gốc của món đồ.
```

Ví dụ đúng định dạng:

```
[relic] vongngoc_thanhthuy | Vòng Ngọc Thanh Thủy | 💍
Hệ: thuy
Phẩm: 3
Cảnh giới tối thiểu: 2
Hiệu ứng: mpP=18, regenMp=4, tam=2
Mô tả: Ngọc trong như nước hồ mùa thu. Đeo vào, đầu ngón tay lạnh buốt và tâm trí tĩnh lặng.
Lời tựa: Của một vị ni cô đã tự nguyện trầm mình xuống đầm sâu.

[art_cp] hoathien_quyet | Hỏa Thiên Quyết | 📕
Hệ: hoa
Phẩm: 4
Cảnh giới tối thiểu: 3
Hiệu ứng: matkP=12, atkStage=2
Chiêu: Liệt Hỏa Chưởng | p=1.4 | h=3 | burn=0.3
Chiêu: Viêm Long Ẩn | p=2.2 | charge=2 | aoe
Mô tả: Lửa ở đan điền cháy suốt đêm không tắt, càng luyện càng hung.
```

## 6. Quy mô và cách phân bổ

Viết **đủ số lượng** như sau (đây là tổng cho một đợt lớn, có thể chia nhiều lượt). Mỗi loại phân đều qua các phẩm và các cảnh giới, không dồn hết vào một mức:

| Loại | Số lượng mục cần viết | Ghi chú |
|---|---|---|
| Pháp bảo / trang bị (`relic`) | 300 | Đủ 12 vị trí: vũ khí, nón, ngọc bội, găng, giáp, áo choàng, nhẫn, đai, pháp bảo, giày… |
| Đan dược (`pill`) | 150 | Hồi máu, hồi linh lực, đột phá, giải độc, thần thức, diên thọ… |
| Phù lục (`talisman`) | 80 | Dùng một lần trong trận |
| Công pháp (`art_cp`) | 120 | Mỗi môn có 2–4 chiêu |
| Tâm pháp (`art_tp`) | 120 | Nội tại, không có chiêu |
| Kỹ năng / thần thông (`skill`) | 200 | Chiêu thức trận đấu |
| Linh thú (`pet`) | 60 | Tên loài, không phải con cụ thể |
| Phương tiện (`mount`) | 30 | Ngựa, thuyền, kiếm, pháp bảo bay… |
| Nguyên liệu (`material`) | 60 | Thảo, khoáng, đan yêu… |
| Vật nhiệm vụ / kỳ vật (`quest_item`) | 80 | Gắn với chuyện trong game |
| Thiên phú (`trait`) | 40 | Bẩm sinh, có cả tốt và xấu |
| Xuất thân (`origin`) | 30 | Gia cảnh |
| Di vật kiếp trước (`legacy`) | 40 | Có câu chuyện kiếp trước |

**Tổng cộng khoảng 1.500 mục.** Chia nhỏ thành các lượt, mỗi lượt khoảng 40–60 mục, ghi rõ loại cần viết trong lượt đó.

## 7. Phân bổ theo cảnh giới và phẩm

- Phẩm thấp (1–2) và cảnh giới thấp (0–1): nhiều nhất, chiếm khoảng 50%.
- Phẩm trung (3–4) và cảnh giới giữa (2–3): khoảng 35%.
- Phẩm cao (5–6) và cảnh giới cao (4–5): khoảng 13%.
- **Phẩm 7 (Thần phẩm): tối đa 5 mục**, chỉ cho cảnh giới 5, mỗi mục là một món đặc biệt, có câu chuyện riêng.

## 8. Ngữ điệu và đa dạng

- Mỗi hệ, mỗi nhóm phẩm có **phong cách mô tả khác nhau**: kiếm thì sắc lạnh, đan thì thơm và nhẹ, phù thì nóng nảy, ngọc thì trong trẻo, cờ hiệu thì u ám.
- Tránh lặp lại câu mẫu. Không dùng cùng một cụm từ quá 2 lần trong một lượt.
- Một phần món đồ có **lời tựa** kể về người đã từng dùng, gây cảm xúc: thương, hận, hài, bi, rùng rợn.
- Không đặt tên trùng với các tên đã có trong game (danh sách bên dưới).

## 9. Tên đã có trong game (KHÔNG được trùng)

Pháp bảo: Kiếm, Trường Kiếm, Đoản Kiếm, Cổ Kiếm, Đao, Trảm Mã Đao, Hộ Tâm Phù, Hộ Tâm Ngọc, Hộ Tâm Kính, Pháp Trượng, Phất Trần, Bảo Châu, Giáp, Nhuyễn Giáp, Đạo Bào, Pháp Y, Phi Phong, Ngọc Bội, Ngọc Quyết, Ngọc Bài, Ngoa, Vân Hài, Đạp Vân Ngoa, Linh, Chung, Khánh, Hoàn, Thủ Trạc, Kim Hoàn, Đỉnh, Đan Lô, Lư Hương, Phiên, Cờ Lệnh, Hồn Phiên, Châu, Dạ Minh Châu, Định Phong Châu, Kính, Đồng Kính, Chiếu Yêu Kính, Ngọc Giản, Bí Lục, Kinh Quyển.

Đan dược: Hồi Xuân Đan, Tụ Khí Đan, Bạo Huyết Đan, Kim Cang Phù, Chưởng Lôi Phù, Giải Độc Đan, Thần Hành Phù, Định Thần Đan, Tinh Nguyên Đan, Diên Thọ Đan, Phá Cảnh Đan, Hộ Mạch Đan, Bồ Đề Tử, Tị Lôi Phù, Dưỡng Nguyên Đan, Thiên Đạo Quả, Địa Mạch Linh Nhũ, Nhân Hoàng Thảo, Linh Nhũ Ngưng Thần.

Công pháp / kỹ năng: Ngự Kiếm Thuật, Kim Châm Quyết, Duệ Kim Kiếm Khí, Triền Đằng Thuật, Vạn Kiếm Thuật (có trong game), Trụ Tiên (có trong game), và các môn có trong danh sách SK_RAW của game.

Pháp bảo đặc biệt: Nhẫn Sắt Cũ, Hồn Phiên Vô Chủ, Đồng Tâm Kết, Kiếm Gãy Vô Danh, Di Vật Kiếp Trước, Vấn Tâm Kính, Long Lân Hộ Tâm, Tinh Thiết Kiếm Phôi, Lôi Kích Mộc Tâm, Thiên Tâm Ngọc, Lệnh bài đệ tử.

Linh thú: Lang, Hổ, Mãng, Gấu, Ưng, Hồ Ly, Rùa, Nhện Độc, Vượn, Cá Sấu, Dơi, Bọ Cạp, Cóc Độc, Giao Long.

## 10. Yêu cầu đợt này

Viết **<SỐ LƯỢNG>** mục loại **<LOẠI>**, phẩm **<PHẨM>**, cảnh giới **<CẢNH GIỚI>**.
Với mỗi mục, đảm bảo đúng định dạng ở mục 5 và chỉ dùng key ở mục 3.
