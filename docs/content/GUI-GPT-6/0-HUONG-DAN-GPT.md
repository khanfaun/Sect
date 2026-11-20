# Gói GPT đợt sáu — hướng dẫn (đọc hết rồi mới viết)

Bạn viết **lời văn và nội dung** cho game Phù Sinh. Không sửa mã. Đợt này có 4 lô. Làm lần lượt, mỗi lô một commit.

## 0. Cách làm việc
1. `npm install` (lần đầu). Tạo nhánh từ nhánh Claude: `git fetch origin && git checkout -b codex/phu-sinh-noi-dung-6 origin/claude/busy-cray-fctc4p`.
2. **Đọc trước** `docs/content/GUI-GPT-3/1-huong-dan.md` (bối cảnh, giọng văn, điều cấm, bảng mã `{LOC..}` `{NP..}` `{FA..}`). Mọi luật ở đó áp dụng nguyên: không con số trong lời văn, không nhớ kiếp trước, không lộ thân phận Người Gác Bến, không tạo người/nơi mới ngoài mã có sẵn, gọi người chơi là "ngươi", câu ngắn, chi tiết cụ thể.
3. Chỉ sửa đúng chỗ ghi ở từng lô. Không đụng `src/`, `tools/`, `content/rules`, tệp tự sinh, `phu-sinh.html`.
4. Kiểm sau mỗi lô: tệp JSON đọc được (`node -e "JSON.parse(require('fs').readFileSync(process.argv[1],'utf8'))" <tệp>`); lô sửa trong `content/` thì chạy `npm run content:check` (phải Đạt, không lỗi).
5. Commit từng lô, đẩy `git push -u origin codex/phu-sinh-noi-dung-6`. Không mở PR, không gộp nhánh. Báo ngắn: xong lô nào, lệnh kiểm in gì, chỗ băn khoăn.

## 1. Lô 1: viết lại chữ tính năng mới (sửa giá trị trực tiếp trong `content/text/`)
CHỈ đổi **giá trị chữ**. Không đổi khoá, giữ nguyên các chỗ `{{0}}` `{{1}}` (đủ số lượng, đúng thứ tự), không thêm bớt khoá. Các chữ này do Claude viết tạm, cần giọng văn của game.

| Tệp | Khoá cần viết lại | Dùng ở đâu |
|---|---|---|
| `content/text/truy-na.json` | `tna.hoanBao`, `tna.hoanHet` | Báo sự kiện bị hoãn vì đang bị truy nã, và báo hết hoãn |
| | `tna.faBiet`, `tna.faDay`, `tna.faKhap`, `tna.faQuan` | Lính canh của các thế lực có biết mặt ngươi hay không (`tna.faQuan` là cụm "quan phủ + tên quận" ghép vào câu khác) |
| | `tna.baoF`, `tna.matDauF`, `tna.matHetF`, `tna.tangF` | Bản "thế lực" (Chấp pháp tông môn) của các thông báo: bị ghi sổ, nâng mức truy, hạ mức truy, thôi truy |
| `content/text/dat-dai.json` | `dat.thueD`, `dat.thueDNo`, `dat.thueMua`, `dat.thueNo`, `dat.thueQuan`, `dat.thueTra` | Thuế đất: mức thuế năm, đang nợ, nơi đang nợ khi mua, không đủ tiền nộp, quan phủ ghi nợ, đã nộp |
| | `dat.dMuaCt`, `dat.oMuaCt` | Dòng mua ô đất (`dat.oMuaCt`) và lời mua cả mảnh đất kèm công trình (`dat.dMuaCt`) |
| `content/text/dai-mong.json` | `dm.dl02Du`, `dm.dl02Thieu` | Kết Diệt Thế: đủ hiểu thì khoá được, chưa đủ thì sức huỷ tràn ra |
| `content/text/nghe-tu-mo-rong.json` | `tumr.duyenL`, `tumr.duyenN`, `tumr.duyenSau`, `tumr.duyenSauT`, `tumr.duyenT`, `tumr.duyenTag` | Hộp "Duyên nghề": nhãn, tên hộp, nút để sau, lời khi để sau, lời mở, nhãn "có duyên" |
| | `tumr.dy.cc`, `tumr.dy.el`, `tumr.dy.kv`, `tumr.dy.og` | Lý do có duyên (cụm ghép vào câu): linh căn đặc biệt, linh căn hệ, khí vận, xuất thân |

Đọc giá trị hiện tại và các khoá bên cạnh trong cùng tệp để hiểu ngữ cảnh. Câu ngắn, không số (trừ `{{n}}`).

## 2. Lô 2–4: sự kiện và kết cục ba pháp môn (bạn tự thiết kế)
Ba pháp môn chưa có thiết kế sự kiện. **Bạn tự đặt tên và viết**, mỗi nghề **8 sự kiện + 2 kết cục**, vào tệp bản thảo có sẵn khung:

| Lô | Nghề | Tệp bản thảo | Đọc để nắm nghề |
|---|---|---|---|
| 2 | Lôi pháp sư (chính đạo, trừ tà) | `ban-thao/L2-loi-phap.json` | dòng 1297, 1323, 1349 |
| 3 | Huyễn thuật sư (ảo ảnh, lừa người) | `ban-thao/L3-huyen-thuat.json` | dòng 1296, 1322, 1348 |
| 4 | Thôn phệ tu (tà đạo, nuốt tu vi kẻ chết) | `ban-thao/L4-thon-phe.json` | dòng 1301, 1327, 1353 |

"Dòng" là số dòng trong `docs/thiet-ke/PHAN-TICH-HOP-NHAT.md` (bảng nghề, bảng chiêu, bảng cái giá). Luật của nghề ở `content/rules/nghe-tu-mo-rong.js` (mục `TU23` Lôi, `TU24` Huyễn, `TU25` Thôn): nơi học (`loc`), việc làm thuê (`hd`), duyên (linh căn, khí vận). Đừng viết trái luật. Tham khảo cách viết ở `content/nghe-tu/TU17.json`…`TU22.json` (sáu nghề đợt trước) và mẫu `mau/su-kien-nghe.mau.json`.

**Gợi ý hướng (không bắt buộc theo):**
- Lôi pháp: trừ tà ở làng bị ám, đối đầu Thi tu, nơi âm khí nặng làm phép yếu đi, thiên kiếp, giữ lòng chính khi kẻ bị trừ có lý do đáng thương. Kết cục: một tốt (thành người trừ tà có tiếng, hoặc hợp với lôi kiếp), một xấu (bị lôi phản phệ, hoặc quá cứng nhắc mà giết nhầm).
- Huyễn thuật: lừa kẻ tham, dựng ảo cảnh cho người sắp chết, bị kẻ thần thức mạnh phá ảo rồi phản lại, lạc giữa thật và ảo (gắn chủ đề Đại Mộng nhưng không lộ bí mật). Kết cục: một tốt, một xấu (không còn phân biệt thật giả).
- Thôn phệ: cám dỗ nuốt kẻ vừa chết, tâm ma lớn dần, tu vi nuốt được không phải của mình, bị người thân nạn nhân truy, bị chính đạo săn. Kết cục: một "thành" (nuốt trời, nhưng không còn là người), một "sụp" (bị những gì đã nuốt phản lại).

Mỗi sự kiện: `ten`, `text` (2–3 đoạn, mỗi đoạn 2–4 câu), 2–3 `choices` (mỗi lựa chọn: `l` nhãn ngắn, `t` kết quả 2–3 câu, **khác nhau thật**, `e` để `{}` — Claude gắn hiệu ứng). Mỗi kết cục: `ten`, `canh` (2 đoạn). Có thể thêm lựa chọn thứ ba vào khung nếu cần.

## 3. Điều cấm riêng đợt này
- Không viết cơ chế mới, không nhắc con số trong lời văn.
- Lôi pháp không thuyết giảng chính nghĩa; Huyễn thuật không giải thích ảo thuật dài dòng; Thôn phệ rùng rợn vừa phải, kể bằng chi tiết cảm giác, không máu me thừa.
- Không tên người/nơi mới (dùng mã hoặc gọi chung: "một bà lão", "gã đạo sĩ").

## 4. Tự kiểm trước khi trả
- [ ] Lô 1: chỉ đổi giá trị, `{{n}}` giữ đủ; `npm run content:check` Đạt.
- [ ] Mỗi sự kiện 2–3 lựa chọn, kết quả khác nhau; `e` để `{}`.
- [ ] Mã `{..}` có thật trong bảng mã. Không con số, không "kiếp trước", không tên mới.

## 5. Thứ tự
Lô 1 → 2 → 3 → 4. Hết thời gian thì dừng sau lô đã xong, commit, đẩy.
