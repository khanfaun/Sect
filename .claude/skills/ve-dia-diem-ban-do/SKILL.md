---
name: ve-dia-diem-ban-do
description: Vẽ địa điểm (tông môn, thành, trấn, nơi nhỏ) thẳng vào bản đồ đã khám phá của Phù Sinh bằng ComfyUI (Klein 9B, tông môn thêm Qwen 2.1 + LanPaint) rồi ghép và xuất ô ảnh; soát bố cục trước khi vẽ. Dùng khi người dùng nhờ vẽ/vẽ lại một nơi hay một quận trên bản đồ, đổi tốc độ vẽ, hoặc đổi luật đặt nơi.
---

# Vẽ địa điểm vào bản đồ (tools/quan-ve.py, tools/quan-ve-lo.py)

Đọc trước: phần "Vẽ địa điểm vào bản đồ", "Địa điểm = lục giác lớn" và "Bản đồ chia ô ảnh" trong CLAUDE.md.

## Quy tắc người dùng (bắt buộc)
- Cách mới / nơi mới: chạy **1 khung nhỏ**, gửi ảnh so sánh trước–sau (SendUserFile), chờ duyệt rồi mới làm tiếp. Khi người dùng bảo "làm cho xong 1 quận" thì mới chạy cả lô.
- Vẽ thẳng trên bản đồ đã khám phá (không dùng bản chưa mở). Không vẽ asset rời rồi dán.
- **Nơi nhỏ lẻ, thành, trấn: chỉ Klein. Chỉ tông môn (thế lực) mới thêm Qwen.** (người dùng chốt 2026-11-27)
- **Ghép kiểu cũ** (không khớp màu giấy) — người dùng thấy đẹp hơn; `GIAY=1` để bật khớp màu giấy nếu cần.
- Luôn Qwen 2.1 bản đầy đủ (không Turbo). Tông môn: núi bay, xích, thác, mây ngang; góc nhìn xiên cao như bản đồ.
- Trả lời ngắn, ít thuật ngữ. Kiểm tra xong thì commit + đẩy main.

## Soát ảnh (bắt buộc, người dùng chê soát qua loa: "ngu hơn cả GPT")
- Mỗi nơi cắt riêng ở độ phân giải gốc (vùng khoanh + ~50 đ.ả), trước | sau, đọc kỹ rồi mới kết luận. Không chấm bằng ảnh toàn quận hay ô thu nhỏ.
- Liệt kê lỗi cụ thể: nhà trong suốt (cây xuyên mái), chỉ ra cây / trống / chấm lấm tấm thay vì nhà, vệt trắng sót, sân trắng / quầng nhạt, isometric, đè tranh nơi khác, vẽ lên vách đá / mặt sông.
- Bước tự chấm trong lô (đổi / tương phản / tỉ lệ nét) KHÔNG phân biệt được cây với nhà: vẫn phải xem bằng mắt.

## Bố cục (soát TRƯỚC khi vẽ)
- `node tools/dd-luu.js` sinh lại `DD_BOCUC`; `python tools/quan-ve.py chuan-bi <q>`; `python tools/bo-cuc-xem.py <q>` khoanh vùng tranh (elip) từng nơi + ảnh phóng to `zoom-<id>.png`.
- Luật ở core2/33 `growPlaces`: mỗi nơi giữ vùng tranh (`vungVe`, `VE_LUAT` ho/tt/hd/co) không chồng nhau; thành trấn không vẽ lên nước (`O_NUOC` đo từ ảnh), vách núi / núi che (`O_CHE`), dốc (độ cao +2). 3 lượt: thoáng + địa hình tốt → cho chồng nhưng địa hình tốt → luật cũ.
- Dữ liệu đất bằng / nước theo ảnh: `python tools/o-phang.py` (vách đá trơ nhạt bị tính nhầm là đất bằng → loại bằng b* và a* thấp hơn trung vị vùng).
- Đổi luật đặt nơi ⇒ vẽ lại các quận đã vẽ; cập nhật `BO_CUC_Q5` trong tools/test-ui.js (lấy từ bocuc.json + O_ANH.ve).

## Cách đang dùng (2026-11-28): PHÁC VECTOR + QWEN 90%
- `python tools/quan-phac.py <q> phac [id...]` chỉ phác (không GPU) → soát `work/quan-<q>/phac-<k>.png`; `... ve [id...]` phác + Qwen + ghép + xuất ô ảnh; in thời gian từng nơi.
- Mẫu phác ở `tools/phac-mau.py` (thành, tu thành, trấn, tu trấn, am cư, khoáng, phế / di tích, bí cảnh / động thiên); tông môn dựng tay theo địa hình (`m_tong_17` trong quan-phac.py). Bố cục hình tháp, trục giữa, điểm nhấn cao, mái chồng lớp.
- Tiền cảnh: `tien_canh` (khối mực đặc + chân từng điểm), `ve_lop` vẽ xa→gần và cho tiền cảnh che; `ne_tien_canh` dịch cả cụm tới chỗ ít bị che (ở hẳn trong lõi vùng khoanh); bị che >45% (nơi nằm lọt trong rừng) thì vẽ thành khoảng trống.
- Qwen: ảnh mẫu = bản đồ gốc, điểm xuất phát = bản phác (chỉ dán vào LÕI vùng khoanh, mép mà có phác thì sót nét), 14 bước, vẽ lại 90% (tông môn 85–90%, thử vài hạt giống chọn bản hùng tráng nhất). Đảo bay coi như tiền cảnh.
- Thời gian quận 5 (17 nơi): lượt đầu 349 giây (Qwen 241: tông môn ~50, thành 16–22, nơi nhỏ 11–14); vẽ lại chỗ hỏng thêm ~6 phút.
- Lỗi đã gặp: Qwen ra nhiễu lấm tấm / để trống khi bản phác nằm lệch ra mép (sửa chấm điểm vị trí); ở 90% Qwen có thể dồn quần thể lên đỉnh (thử 85% hoặc hạt giống khác).

- Cập nhật 2026-11-28: vùng khoanh cọ mềm TRẮNG ĐẶC 100% (viền mềm ~N/160 đ.ả), hình elip có lồi lõm ngẫu nhiên; mép ghép hẹp (rong = 3% khung). Lời tả nét cọ đậm + `KM_L=0` (không kéo sáng) — trước đó nét mờ nhạt do mép nhoè rộng, lời tả "fine/faded" và ghép kéo sáng. Vẽ lại: tông môn / thành 90%, nơi nhỏ 75% (90% hay xoá trắng). Mặt nạ theo hình vector đã thử, bỏ (tông môn thưa nhạt). Klein vẽ theo phác: 58 giây, kiểu game — không dùng.

## Vẽ cả quận (cách cũ, chỉ Klein)
1. Dọn `work/quan-<q>/ra` cũ, `cp nen.png lam.png`.
2. `python tools/quan-ve-lo.py <q> [id ...]`: tông môn trước (Klein + 2 ảnh mẫu `qv5-ref-tong-1/2.png`, rồi Qwen 8 bước vẽ lại 60%, khung 1280), rồi thành (khung 768), nơi 1 ô (khung 640, cỡ tranh 1,6 = `VE_LUAT.co`) — đều chỉ Klein + 2 ảnh mẫu. Gọi thẳng ComfyUI ở 127.0.0.1:8000; mỗi nơi ~20–60 giây.
3. Soát phóng to từng nơi. Nơi hỏng: xoá vùng đó về nền (`nen.png` theo mặt nạ), xoá `ra/done-<k>`, vẽ lại với `SEED=` khác. Klein hay ra cây / để trống ở đất bằng đồng màu: vẽ 3–4 ứng viên rồi chọn bằng mắt; nếu vẫn trống thì dán mờ một nơi cùng loại đã vẽ đạt vào giữa vùng khoanh làm bản phác (75%) rồi cho Klein vẽ lại.
4. Đổi cách ghép không cần vẽ lại: `ghep_lai_ve(q, [k...])` ghép từ nền theo thứ tự đã vẽ (ảnh `ra/g-v<k>-tot.png`).
5. `xuat_ve(q)` cắt ô ảnh + `03d-o-anh.js`; `npm run build`; `node tools/test.js`; `node tools/test-ui.js` (hoặc ít nhất `o_anh_ban_do`).

## Bẫy đã gặp
- Bước ghép từng làm nhà trong suốt (giữ cây + mép loang phủ cả hàng nhà sau): đã sửa — chỗ có vật mới thì phủ đặc (`vat` trong `ghep_mem`).
- Lấy bản Klein cũ làm ảnh mẫu → ra kiểu game (cây cỏ ba lá, nhà tô phẳng). Luôn dùng 2 ảnh mẫu tông môn đã duyệt.
- Qwen 60% sau Klein làm nơi nhỏ nhạt, nét mảnh → nơi nhỏ chỉ Klein.
- Cho Qwen xem ảnh Klein làm ảnh mẫu thì nó chép y: ảnh mẫu phải là bản đồ gốc, Klein chỉ là latent khởi đầu.
- Số khung `k` trong lô phải duy nhất (từng trùng 100 → tông môn bị bỏ qua).
- Heredoc trong Bash ở máy này nuốt một lớp `\\` → chuỗi `'\\n'` thành xuống dòng thật; dùng `chr(92)` khi cần.
- `print` tiếng Việt trong Python cần `PYTHONIOENCODING=utf-8`, không thì lỗi giữa chừng (bước sau không chạy).
