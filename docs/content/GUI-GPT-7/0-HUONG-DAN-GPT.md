# Gói GPT đợt bảy — hướng dẫn (đọc hết rồi mới làm)

Bạn viết và sửa **lời văn** cho game Phù Sinh. Không sửa mã. Đợt này có 3 phần lớn: Lô 1 (chữ cho nơi mới), Lô 2 (rà soát toàn bộ câu chữ, chia nhỏ), Lô 3 (đề xuất giá cả). Mỗi lô (hoặc mỗi phần nhỏ của lô 2) một commit.

## 0. Cách làm việc
1. `npm install` (lần đầu). Tạo nhánh từ nhánh Claude **mới nhất**: `git fetch origin && git checkout -b codex/phu-sinh-noi-dung-7 origin/claude/busy-cray-fctc4p`. Nếu đợt sáu chưa làm xong, làm đợt sáu trước (gói `docs/content/GUI-GPT-6/`).
2. **Đọc trước** `docs/content/GUI-GPT-3/1-huong-dan.md` (bối cảnh, giọng văn, điều cấm, bảng mã `{LOC..}` `{NP..}` `{FA..}`) và `docs/content/GUIDELINE.md`.
3. Không đụng `src/`, `tools/`, tệp tự sinh, `phu-sinh.html`. Trong `content/rules/` chỉ được sửa chữ trong chuỗi, **không đổi số**.
4. Kiểm sau mỗi commit: `npm run content:check` phải Đạt, không lỗi; tệp JSON đọc được.
5. Commit từng phần, đẩy `git push -u origin codex/phu-sinh-noi-dung-7`. Không mở PR, không gộp nhánh. Báo ngắn: xong phần nào, lệnh kiểm in gì, chỗ băn khoăn.

## 1. Lô 1: chữ cho Hoàng quốc và loại nơi mới (bản thảo)
Game đang thêm: mỗi đại khu vực có **2 Hoàng quốc** (thế lực phàm nhân cai quản mọi thành trấn phàm), thành trấn chia hai loại **phàm nhân** và **tu sĩ** (ai cũng vào được, khác đồ, việc, tin tức), và năm loại nơi hoang dã mới. Claude đang làm phần luật; bạn viết lời vào `ban-thao/L1-noi-moi.json` (đã có khung):
- `hoang_quoc` (10 mục, 2 mỗi khu): `ten` (2–3 chữ, kiểu "Lương triều", "Đại Hạ"), `xung_ho` (vua gọi là gì: hoàng đế, quốc chủ, nữ vương…), `mo_ta` (2–3 câu: nước giàu nghèo, mạnh yếu, tính cách), `phong_tuc` (2 nét đời thường người chơi thấy được), `quan_he` (1 câu với nước láng giềng cùng khu hoặc với tu sĩ). Mục Lương triều đã có: không đổi tên. Đọc `content/world/the-gioi-neo.js` (mục FA01, LOC02) để không viết trái. Các nước khác nhau rõ: có nước sùng tu sĩ, có nước ghét tu sĩ, có nước buôn bán, có nước binh đao.
- `loai_noi` (9 loại): `ten_goi_chung` (cách gọi trong câu, vd "phường tu sĩ"), `hau_to` (8 hậu tố tên nơi, 1–2 chữ, vd Trấn, Phường, Tập…; xem `content/world/place.js` để biết kiểu hiện có), `mo_ta` (3 bản mô tả khi xem nơi, mỗi bản 1–2 câu), `luc_den` (3 câu khi vừa tới), `tin_don` (3 tin đồn về loại nơi này, giọng người đi đường).
- Phân biệt rõ: trấn/thành **phàm** (chợ búa, nha môn, lính Hoàng quốc, khói bếp) với trấn/thành **tu sĩ** (phường thị, linh khí, chấp pháp tông môn, người bay qua). Bí cảnh, động thiên nguy hiểm nhất; cổ mộ âm u; yêu sào có yêu thú; di tích cổ là dấu vết chiến trận xưa.

## 2. Lô 2: rà soát toàn bộ câu chữ trong game
Mục tiêu: câu chữ **dễ hiểu hơn**, văn phong **cổ trang tiên hiệp nhưng người Việt đọc là hiểu** (ít Hán Việt khó, câu ngắn, không dịch máy, không lặp từ), và **đúng logic**.

**Luật sửa (bắt buộc):**
- Chỉ đổi **giá trị chữ**. Không đổi khoá, không đổi mã (`id`, `ma`, `{LOC..}`…), không thêm bớt khoá, giữ đủ và đúng thứ tự `{{0}}` `{{1}}` `{0}`.
- Không đổi **số** (giá, chỉ số, tỉ lệ, thời gian) và không đổi hiệu ứng `e`, `fx`, điều kiện.
- Không đổi tên riêng đã có (người, nơi, thế lực, công pháp) trừ khi sai chính tả rõ ràng.
- Tên vật phẩm/chiêu: giữ ngắn. Mô tả và tooltip: 1–2 câu, nói rõ **dùng để làm gì**, không giải thích thừa.
- Thấy **lỗi logic** (sự kiện mâu thuẫn, lựa chọn dẫn tới kết quả không hợp, mô tả nói một đằng hiệu ứng một nẻo, nhân vật xưng hô sai, phàm nhân làm được việc tu sĩ…): nếu sửa chữ là đủ thì sửa; nếu phải đổi luật/số/hiệu ứng thì **không sửa**, ghi vào `bao-cao/logic.md` (tệp, khoá, vấn đề, đề xuất).
- Chữ giao diện nằm trong `src/react/**` (nút, tooltip cứng): **không sửa**, chỉ ghi câu nên sửa vào `bao-cao/giao-dien.md` (tệp, câu cũ → câu mới).

**Chia phần (mỗi phần một commit, làm theo thứ tự, hết giờ thì dừng sau phần đã xong):**

| Phần | Thư mục / tệp | Ghi chú |
|---|---|---|
| 2a | `content/text/*.json` | chữ giao diện, thông báo, tooltip — ưu tiên cao nhất |
| 2b | `content/catalog/*.json` (`n`, `d`, mô tả) | vật phẩm, đan, pháp bảo, công pháp, thú, linh căn, xuất thân. Không đụng số |
| 2c | `content/items/*.js` | chỉ chuỗi tên/mô tả (`n`, `d`, `l`…) |
| 2d | `content/world/*.js`, `content/venues/`, `content/canh/` | mô tả nơi, thế lực, cảnh — **trừ** `place.js`, `type-name.js`, `node-ic.js`, `size-t.js`, `newt.js` (Claude đang sửa) |
| 2e | `content/narration/`, `content/characters/` | lời kể, tính cách, xuất thân |
| 2f | `content/events/**` | sự kiện, kỳ ngộ, chuỗi: sửa lời và kiểm logic từng lựa chọn |
| 2g | `content/tuyen/`, `content/dai-mong/`, `content/nghe-tu/`, `content/nghe-pham/`, `content/qua-chin/`, `content/cai-can/` | mệnh tuyến, Đại Mộng, nghề |
| 2h | chuỗi chữ trong `content/rules/*.js` | chỉ chữ trong dấu nháy, không số |

Phần nào đã được bạn viết ở đợt trước (đợt 3–6) thì chỉ đọc lướt, sửa chỗ thật cần.

## 3. Lô 3: đề xuất giá cả (KHÔNG sửa trực tiếp)
Viết bảng đề xuất vào `bao-cao/gia-de-xuat.md`. Claude sẽ đối chiếu cân bằng rồi mới nhập. **Không sửa số trong `content/`.**

**Tiền tệ** (đọc `content/rules/tien.js`): phàm nhân dùng **xu** (1 lượng bạc = 1.000 xu, 1 lượng vàng = 10.000 xu; ăn thường 20 xu/ngày; tiền khởi đầu nhà nghèo 150–300 xu, khá giả 5.000–20.000 xu). Tu sĩ dùng **linh thạch** (1 linh thạch hạ phẩm quy ước ≈ 100 lượng vàng, phàm nhân gần như không mua được).

**Nơi có giá cần rà:**
- `content/catalog/pills.json` (đan, khoá `p`) · `content/items/pill.js`
- `content/catalog/relics.json` (pháp bảo) — giá bán còn theo công thức bậc trong mã: ghi nhận xét chung
- `content/catalog/mounts.json`, `content/world/mount.js`, `content/world/veh-t.js` (thú cưỡi, xe ngựa)
- `content/items/pham.js`, `pham-m.js` (đồ phàm), `content/rules/an-uong.js` (cái ăn)
- `content/rules/dat-dai.js` (giá đất, nhà riêng, thuế), `content/rules/no-nha.js` (nhà ở, nợ), `content/rules/tien.js` (thầy lang, Trắc Linh Thạch, bản chép tâm pháp), `content/rules/am-hoi.js`
- Tìm thêm bằng `grep -rn "gia\|price\|bac:" content/rules` nếu thấy giá khác.

**Định dạng mỗi dòng:** tệp · mã · tên · giá hiện tại · giá đề xuất · lý do ngắn (so với lương một ngày công, giá bữa ăn, độ hiếm, cảnh giới dùng). Ưu tiên chỉ ra chỗ **vô lý** (đồ phàm đắt hơn đồ tu sĩ, đan cấp thấp đắt hơn cấp cao, phàm nhân không bao giờ mua nổi thứ dành cho phàm nhân…). Nhóm theo loại, cuối bảng có 5–10 dòng nhận xét tổng.

## 4. Điều cấm chung
- Không con số trong lời văn kể chuyện, không "kiếp trước", không tên người/nơi mới ngoài mã có sẵn (trừ 9 Hoàng quốc mới ở Lô 1).
- Không đổi luật, số, hiệu ứng, khoá.

## 5. Tự kiểm trước khi trả
- [ ] `npm run content:check` Đạt sau mỗi commit.
- [ ] `{{n}}` giữ đủ; không khoá mới/mất khoá.
- [ ] `bao-cao/logic.md`, `bao-cao/giao-dien.md`, `bao-cao/gia-de-xuat.md` có nội dung (nếu không thấy vấn đề thì ghi "không thấy").

## 6. Thứ tự
Lô 1 → 2a → 3 → 2b → 2c → 2d → 2e → 2f → 2g → 2h.
