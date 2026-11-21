# Hướng dẫn viết tuyến mệnh cho Phù Sinh (dành cho GPT)

> Người dùng dán **toàn bộ tệp này** cho GPT, kèm **đoạn thiết kế của ba tuyến cần viết** (in bằng lệnh ở mục 12). GPT trả lại **ba tệp JSON**. Người dùng lưu vào `content/tuyen/`, chạy lệnh kiểm, dán lỗi (nếu có) lại cho GPT sửa.

## 1. Mục đích

Phù Sinh là game tu tiên chữ, một thế giới chạy liền qua nhiều kiếp luân hồi. Mỗi kiếp người chơi mang một **xuất thân** (con nhà nông, thư sinh nghèo…). Mỗi xuất thân có một **tuyến mệnh**: năm mốc chuyện (N1–N5) trả lời câu hỏi *"Đời này làm gì với vết thương mình mang từ lúc sinh ra?"* và ba kết (A, B, C). Sau đó có thể mở một **đại lộ** (9 con đường lớn, mỗi đường 5 hồi) trả lời *"Đời này trở thành ai?"*.

Việc của bạn (GPT): viết tệp tuyến **đúng định dạng** để game nạp thẳng, không cần lập trình viên sửa. Game lo phần máy móc:
- mở nút đúng lúc (theo `cho`), đưa lời mời (người tìm tới, thư, tin đồn, kỳ ngộ);
- tự thêm lựa chọn **"Để sau"** (không ép người chơi) và nhắc lại vài lần;
- lỡ hạn (`han`) thì **thế giới tự diễn** (`tuDien`): ghi Sử lược, đặt dấu, tuyến đi tiếp, không kẹt;
- gọi người qua **vai** (mã NP): sau trăm năm người cũ đã chết thì tên là người kế vai; nếu vai trống thì hiện đoạn `thayThe`;
- tính nghiệp từ mã việc làm (`deed`) mà **không bao giờ hiện số**;
- giữ tiến độ qua lưu/tải, chịu bản lưu cũ và khoảng luân hồi dài.

## 2. Tệp và tên tệp

- Mỗi tuyến **một tệp** `content/tuyen/<id>.json`, ví dụ `content/tuyen/OR02.json`, `content/tuyen/DL07.json`.
- Tên tệp **bằng đúng** `id` bên trong.
- Mã hoá UTF-8, JSON chuẩn: khoá và chữ trong ngoặc kép `"…"`, không dấu phẩy thừa, không chú thích `//`, không xuống dòng giữa một chuỗi.
- Không sửa tệp nào khác.

## 3. Định dạng chính xác (mỗi khoá nghĩa là gì)

### 3.1 Gốc tệp

| Khoá | Bắt buộc | Nghĩa |
|---|---|---|
| `schemaVersion` | có | Luôn là `1`. |
| `id` | có | `OR01`…`OR45` (xuất thân) hoặc `DL01`…`DL09` (đại lộ). |
| `loai` | có | `"xuat_than"` hoặc `"dai_lo"`. |
| `xuatThan` | xuất thân | Mã xuất thân trong bảng mục 6 (ví dụ `"nong"`, `"xt_con_nha_va_luoi"`). Đại lộ không ghi. |
| `daiLo` | đại lộ | Mã đại lộ trong bảng mục 7. Xuất thân không ghi. |
| `goiYDaiLo` | nên có | Mảng mã đại lộ gợi ý mở sau tuyến xuất thân, ví dụ `["the_gia"]` (theo bảng mục 6). |
| `ten` | có | Tên tuyến người chơi thấy, ví dụ `"Một bát cơm qua mùa lạnh"`. |
| `tomTat` | nên có | Ghi chú cho người biên tập (không hiện trong game): bí mật của tuyến, mạch chính. |
| `mo` | không | Khi nào mở tuyến: `{"tuoiTu": 16}` (nhân vật bắt đầu ở tuổi 16) và/hoặc `{"dk": {…}}` (điều kiện, mục 4). |
| `vatTruyen` | không | Vật truyện riêng của tuyến (mục 3.5). |
| `nut` | có | **Đúng 5 nút** N1…N5 theo thứ tự. |
| `ket` | có | **Đúng 3 kết** A, B, C theo thứ tự. |
| `ngoai` | nên có | Một dòng Sử lược khi người chơi không đạt kết nào ("người đứng ngoài"). |
| `ketMo` | không | Lời dẫn khi người chơi đạt nhiều kết cùng lúc và được chọn kết. |

### 3.2 Một nút (`nut[i]`)

| Khoá | Bắt buộc | Nghĩa |
|---|---|---|
| `id` | có | `"N1"`…`"N5"` đúng thứ tự. |
| `ten` | có | Tên ngắn của mốc, hiện làm tiêu đề hộp thoại. |
| `cho` | không | Chờ bao lâu **sau khi nút trước xong** mới mở: `{"thang": 3}` hoặc `{"nam": 1, "thang": 6}`. Nút đầu: tính từ lúc mở tuyến. Năm 0–10, tháng 0–24. |
| `han` | có | Hạn mềm kể từ lúc mở nút: `{"thang": 6}` hoặc `{"nam": 2}`. Từ 1 tháng tới 10 năm. Lỡ hạn → `tuDien`. |
| `dk` | không | Điều kiện để nút mở (mục 4). Không đạt mãi quá hạn thì nút tự diễn. Hạn chế dùng. |
| `loiMoi` | có | Cách chuyện tìm tới: `{"cach": "nguoi", "vai": "NP01", "noi": "LOC01"}`. Xem bảng dưới. |
| `mo` | có | Đoạn mở cảnh (người chơi đọc). **120–700 ký tự.** |
| `thayThe` | khi có `loiMoi.vai` | Đoạn mở **thay** `mo` khi người giữ vai đã chết / vai trống. **Không được gọi `{NPxx}` của chính vai đó** — kể qua vật chứng (cột "Vật chứng thay" ở mục 8.2) hoặc `{NPxx.vai}`. |
| `cach` | có | **3–5 lựa chọn** (mục 3.3). Game tự thêm "Để sau". Ít nhất một lựa chọn **không có** `dk`. |
| `tuDien` | có | Thế giới tự diễn khi lỡ hạn hoặc người chơi chọn lựa chọn `boQua` (mục 3.4). |
| `clk` | đại lộ hồi 3, 5 | Mã đồng hồ thế giới hồi này chạm vào, ví dụ `"CLK01"`. Xuất thân được dùng nhưng không bắt buộc. |
| `khacVoi` | đại lộ hồi 2–5 | Một câu ghi rõ hồi này **khác nút nào** của tuyến xuất thân gợi ý (chống kể trùng). |
| `boQuaNeuXuatThan` | đại lộ hồi 1 | `true`: nếu tuyến xuất thân đã kết thì đại lộ **bắt đầu từ hồi 2**, không kể lại phần mở. |

Cách mời (`loiMoi.cach`):

| Giá trị | Nghĩa | Ghi thêm |
|---|---|---|
| `nguoi` | Có người tìm tới (ở bất cứ đâu). | **Bắt buộc** `vai`. Nên có `noi` (nơi người đó ở). |
| `thu` | Một lá thư / lời nhắn tới tay. | `vai` nếu biết ai gửi (khi đó phải có `thayThe`). |
| `tin` | Tin đồn; chỉ gặp chuyện **khi tới nơi**. | **Bắt buộc** `noi` là một mã LOC. |
| `ky_ngo` | Chuyện xảy ra ngay nơi đang đứng. | `noi` để `"here"` hoặc bỏ. |

### 3.3 Một lựa chọn (`cach[j]`)

| Khoá | Bắt buộc | Nghĩa |
|---|---|---|
| `id` | có | Mã ngắn chữ thường không dấu, không trùng trong nút: `"giu_giong"`. |
| `l` | có | Nhãn nút bấm, **dưới 60 ký tự**, bắt đầu bằng động từ: `"Giữ thóc giống, chia cháo loãng"`. |
| `t` | có | Đoạn kết quả sau khi chọn, **60–500 ký tự**. |
| `dk` | không | Điều kiện để bấm được (mục 4). Không đủ thì nút hiện mờ kèm lý do. |
| `e` | không | Hiệu ứng thật (mục 5). |
| `dau` | không | Mảng **dấu** đặt vào sổ tuyến khi chọn, ví dụ `["kho_chung"]`. Dấu là cách nối các nút và quyết định kết. |
| `boQua` | không | `true`: chọn lựa chọn này coi như để thế giới tự diễn (áp `tuDien`). Dùng cho "mặc kệ", "tránh mặt". |

### 3.4 Tự diễn (`tuDien`)

`{"t": "…", "su": "…", "dau": ["…"], "clk": {"id": "CLK01", "kq": "…"}}`
- `t` (bắt buộc, ≥40 ký tự): người chơi đọc trong nhật ký — điều đã xảy ra khi không ai nhúng tay.
- `su`: một dòng ngắn ghi vào **Sử lược** (sử thế giới, kiếp sau còn đọc).
- `dau`: dấu đặt khi tự diễn (ví dụ `["de_vo"]`).
- `clk`: chỉ khi đồng hồ đó đang diễn ra; ghi kết quả thay kết quả mặc định.

### 3.5 Vật truyện (`vatTruyen`)

Vật riêng của tuyến (mẫu đá, sổ hộ, lá thư). Mỗi vật chiếm một ô túi.
```json
{ "id": "vt_or01_mau_da", "n": "Mẫu đá đê", "i": "🪨", "d": "Một hòn đá xốp bẻ ra từ chân đê…" }
```
- `id` bắt đầu bằng `vt_` + mã tuyến chữ thường + `_`, ví dụ `vt_or02_bang_ten`.
- Trao bằng `"e": {"vatPham": "vt_or01_mau_da"}`, lấy đi bằng `"boVatPham"`, đòi có bằng `"dk": {"vatPham": [...]}`.
- Vật truyện **không có phép**, không cộng chỉ số. Muốn có tác dụng thật phải dùng hiệu ứng ở mục 5.

### 3.6 Một kết (`ket[k]`)

| Khoá | Bắt buộc | Nghĩa |
|---|---|---|
| `id` | có | `"A"`, `"B"`, `"C"` đúng thứ tự. |
| `ten` | có | Tên kết, ví dụ `"Đèn còn trong thôn"`. |
| `dk` | có | Điều kiện, **phải có `dau`** (ít nhất một dấu mà một lựa chọn nào đó đặt). |
| `t` | có | Đoạn kết đời, **120–600 ký tự**. |
| `su` | có | Dòng Sử lược (thế giới đổi gì). |
| `dauVong` | có | **Dấu vọng cho kiếp sau**: một thông tin, người, nơi hoặc mối quan hệ cụ thể còn lại. Viết như nửa câu sau "Người ta còn nhắc: …". Không phải phần thưởng. |
| `e` | không | Hiệu ứng khi đạt kết (hiếm dùng). |

Game xét kết khi xong N5: đạt đúng một kết → nhận kết đó; nhiều kết → người chơi chọn; không kết nào → "người đứng ngoài" (dòng `ngoai`). **Không xếp kết thiện cao hơn kết ác**: ba kết là ba cách sống khác nhau.

## 4. Điều kiện hợp lệ (`dk`)

Mọi khoá trong `dk` phải **cùng thoả**.

| Khoá | Ví dụ | Nghĩa |
|---|---|---|
| `dau` | `["de_sua","kho_chung"]` | Đã có đủ các dấu này trong tuyến. |
| `khongDau` | `["pha_kho"]` | Chưa có dấu nào trong số này. |
| `pham` | `true` / `false` | Chỉ phàm nhân / chỉ người đã nhập đạo. |
| `canhGioiTu` | `1` | Cảnh giới tối thiểu: 0 Luyện Khí, 1 Trúc Cơ, 2 Kết Đan, 3 Nguyên Anh, 4 Hóa Thần, 5 Độ Kiếp (phàm nhân luôn không đạt). |
| `tuoiTu`, `tuoiDen` | `20`, `60` | Khoảng tuổi. |
| `bacTu` | `3000` | Có ít nhất chừng ấy **xu** (tiền phàm). |
| `linhThachTu` | `{"ha": 10}` | Có ít nhất chừng ấy linh thạch theo phẩm (`ha`, `trung`, `thuong`, `cuc`). **Bắt buộc đi kèm `"pham": false`.** |
| `vatPham` | `["vt_or01_mau_da"]` | Đang mang các vật này. |
| `vaiSong`, `vaiMat` | `["NP03"]` | Vai đang có người giữ / đang trống. |
| `faSong`, `faDiet` | `["FA02"]` | Thế lực còn / đã tan. |
| `clkDang` | `["CLK01"]` | Đồng hồ thế giới đang diễn ra. |
| `khoa` | `"Ngươi chưa biết ai bán đá"` | Lý do hiện khi lựa chọn bị khoá (thay lời mặc định). |

## 5. Hiệu ứng hợp lệ (`e`)

**Chỉ** các khoá sau. Khoá khác bị báo lỗi.

| Khoá | Ví dụ | Nghĩa |
|---|---|---|
| `bac` | `-3000` | Tiền phàm, đơn vị **xu**, số nguyên. Âm là trả. |
| `linhThach` | `{"ha": 5}` | Linh thạch theo phẩm (`ha` Hạ, `trung` Trung, `thuong` Thượng, `cuc` Cực). **Lựa chọn (hoặc nút/tuyến) phải có `"dk": {"pham": false}`.** |
| `deed` | `"cuu_nguoi"` hoặc `["giu_loi","hanh_hiep"]` | Ghi việc làm vào sổ nghiệp (mục 9). Game tự tính, không hiện số. |
| `vatPham`, `boVatPham` | `"vt_or01_so_ho"` | Trao / lấy vật truyện. |
| `fa` | `{"FA04": 2}` | Đẩy sức một thế lực lên/xuống (−10…10, khác 0). Việc nhỏ ±1–2, việc lớn ±5. |
| `clk` | `{"id": "CLK01", "kq": "Mùa đói qua đi nhờ…"}` | Can thiệp đồng hồ thế giới đang diễn ra; `kq` là kết quả ghi sử thay kết quả mặc định. Đồng hồ chưa diễn ra thì không có tác dụng (an toàn). |
| `giet` | `"NP03"` | Người chơi giết người đang giữ vai (vai trống, sau có người kế). Chỉ dùng khi lựa chọn kể rõ là giết. |
| `hp` | `"-10%"` | Mất/hồi khí huyết theo phần trăm (chuỗi). |
| `h` | `24` | Số giờ trôi qua (1–720). |
| `tamma` | `3` | Tâm ma tăng/giảm (−15…15), cho việc ác dằn vặt. |

### Đơn vị tiền (rất quan trọng)

- **Phàm nhân** tiêu **xu / lượng**: 1 lượng bạc = 1.000 xu; 1 lượng vàng = 10.000 xu. Trong `e.bac` / `dk.bacTu` luôn ghi **số xu**. Mức tham khảo: bữa cơm vài chục xu; làm thuê một tháng vài trăm xu; nộp bù thuế một nhà 2.000 xu; chuộc ruộng 5.000 xu; món lớn của cả thôn vài vạn xu.
- **Tu sĩ** dùng **linh thạch theo phẩm** (Hạ / Trung / Thượng / Cực). Không quy đổi linh thạch ra xu trong truyện.
- **Không** dùng `st`, `lt`, `karma`, `tv` hay hiệu ứng của bảng sự kiện cũ.
- Trong **lời văn**, tiền viết bằng chữ: "ba lượng bạc", "một túi linh thạch hạ phẩm", không ghi số.

## 6. Bốn mươi lăm xuất thân cần viết

Cột "Đại lộ gợi ý" là gợi ý ghi vào `goiYDaiLo` (không khoá). OR01 đã có mẫu (mục 11).

| Tệp | `xuatThan` | Xuất thân | Tên/nhánh trong thiết kế | Đại lộ gợi ý |
|---|---|---|---|---|
| OR01.json | `nong` | Con nhà nông | Một bát cơm qua mùa lạnh | `the_gia` |
| OR02.json | `tran` | Con nhà trận sư | Những tên người dưới trận đồ | `phi_thang` |
| OR03.json | `dote` | Con nhà đồ tể | Con dao biết tên chủ | `diet_the` |
| OR04.json | `thusinh` | Thư sinh nghèo | Bài thi viết bằng tro | `de_nghiep` |
| OR05.json | `khat` | Tiểu khất cái | Những người không có trong sổ | `tinh_mong` |
| OR06.json | `thegia` | Con thứ thế gia | Chỗ ngồi không dành cho mình | `huyet_cuu` |
| OR07.json | `mieu` | Đứa trẻ bị bỏ ở miếu | Tên trên lưng tượng | `tinh_mong` |
| OR08.json | `ren` | Con nhà thợ rèn | Lửa trong lòng đất | `vo_lam` |
| OR09.json | `daodong` | Tiểu đạo đồng | Chuông gọi ai về | `phi_thang` |
| OR10.json | `linh` | Cựu binh biên ải | Người về sau lệnh chết | `de_nghiep` |
| OR11.json | `buon` | Con nhà buôn | Một chữ tín có giá bao nhiêu | `phu_giap` |
| OR12.json | `chai` | Con nhà chài lưới | Những người dưới mặt nước | `the_gia` |
| OR13.json | `duoc` | Dược đồng | Phương thuốc giữ lại một người | `y_gia` |
| OR14.json | `mahuyet` | Mang huyết mạch ma tộc | Máu không chọn chủ | `diet_the` |
| OR15.json | `hat` | Con nhà gánh hát | Vở diễn không hạ màn | `tinh_mong` |
| OR16.json | `xt_con_nha_va_luoi` | Con nhà vá lưới | nhánh của chuyện mùa cá | `the_gia` |
| OR17.json | `xt_tre_giu_ngua_tram` | Trẻ giữ ngựa trạm | nhánh của lệnh chết biên quân | `de_nghiep` |
| OR18.json | `xt_nguoi_chep_so_thoc` | Người chép sổ thóc | nhánh của mùa đói và bài thi | `de_nghiep` |
| OR19.json | `xt_con_nha_ham_than` | Con nhà hầm than | nhánh của lửa lò | `vo_lam` |
| OR20.json | `xt_dua_tre_nhat_o_bac_cua` | Đứa trẻ nhặt ở bậc cửa | nhánh của tên bị xóa | `huyet_cuu` |
| OR21.json | `xt_ke_tung_vac_bia` | Kẻ từng vác bia | nhánh của tên trận vong | `vo_lam` |
| OR22.json | `xt_con_nguoi_det_chieu` | Con người dệt chiếu | nhánh của những người ngoài sổ | `the_gia` |
| OR23.json | `xt_dong_tu_dun_tra` | Đồng tử đun trà | nhánh của chuông và lời nói kín | `phi_thang` |
| OR24.json | `xt_nguoi_giu_mieu_nho` | Người giữ miếu nhỏ | nhánh của tên trên tượng | `tinh_mong` |
| OR25.json | `xt_ke_bo_truong_thi` | Kẻ bỏ trường thi | nhánh của bài thi tro | `tinh_mong` |
| OR26.json | `xt_con_nha_ganh_muoi` | Con nhà gánh muối | nhánh của chữ tín | `phu_giap` |
| OR27.json | `xt_nguoi_hoc_khac_khuon` | Người học khắc khuôn | nhánh của lò và con dấu | `tinh_mong` |
| OR28.json | `xt_ke_cheo_do_ban_dem` | Kẻ chèo đò ban đêm | nhánh của người dưới nước | `tinh_mong` |
| OR29.json | `xt_con_nha_boc_thuoc` | Con nhà bốc thuốc | nhánh của phương giữ người | `y_gia` |
| OR30.json | `xt_dua_tre_lon_sau_bep` | Đứa trẻ lớn sau bếp | nhánh của con dao và người mất tên | `huyet_cuu` |
| OR31.json | `xt_tho_cao_voi_tuong` | Thợ cạo vôi tường | nhánh của gia phả và vở bị cấm | `the_gia` |
| OR32.json | `xt_nguoi_boi_giay_do` | Người bồi giấy dó | nhánh của bài thi và sổ tên | `tinh_mong` |
| OR33.json | `xt_ke_tron_no_qua_deo` | Kẻ trốn nợ qua đèo | nhánh của chữ tín và lao dịch | `phu_giap` |
| OR34.json | `xt_con_nha_nung_men` | Con nhà nung men | nhánh của lò và độc nước | `phu_giap` |
| OR35.json | `xt_nguoi_lam_thue_o_mo` | Người làm thuê ở mỏ | nhánh của phôi lỗi và lao dịch | `vo_lam` |
| OR36.json | `xt_ke_viet_thu_ho` | Kẻ viết thư hộ | nhánh của bài thi và lệnh về | `de_nghiep` |
| OR37.json | `xt_hau_due_nguoi_coi_an` | Hậu duệ người coi ấn | nhánh của lệnh giả và quyền gia tộc | `de_nghiep` |
| OR38.json | `xt_nguoi_hoc_bo_xuong` | Người học bó xương | nhánh của bệnh xá và cựu binh | `y_gia` |
| OR39.json | `xt_ke_lon_len_ben_vach_da` | Kẻ lớn lên bên vách đá | nhánh của trận và nơi ở | `phi_thang` |
| OR40.json | `xt_con_nha_giu_kho_duong` | Con nhà giữ kho đường | nhánh của chữ tín và dịch bệnh | `phu_giap` |
| OR41.json | `xt_nguoi_bi_tra_ve_tu_bien_ai` | Người bị trả về từ biên ải | nhánh của cựu binh | `de_nghiep` |
| OR42.json | `xt_tre_an_duoi_san_dan` | Trẻ ẩn dưới sàn đan | nhánh của dược đồng và huyết hệ | `huyet_cuu` |
| OR43.json | `xt_ke_mang_tro_ve_que` | Kẻ mang tro về quê | nhánh của chuông và tên trận vong | `huyet_cuu` |
| OR44.json | `xt_nguoi_thua_ke_sap_bac` | Người thừa kế sạp bạc | nhánh của gia tài và chữ tín | `phu_giap` |
| OR45.json | `xt_nguoi_hoc_dao_sau_mua_lu` | Người học đạo sau mùa lũ | nhánh của chuông và trận | `phi_thang` |

## 7. Chín đại lộ

| Mã tệp | `daiLo` | Tên | Dẫn tới kết thúc | Thường mở từ | Nơi chính |
|---|---|---|---|---|---|
| DL01 | `phi_thang` | Phi Thăng Lộ | END04 Phi thăng tỉnh mộng | OR02, OR09, OR23, OR39, OR45 | LOC05, LOC15 |
| DL02 | `diet_the` | Diệt Thế Ma Đồ | END03 Ma chủ; END08 nếu đủ tri thức; không đủ thì ba khu đất ma | OR03, OR14 | LOC07, LOC15 |
| DL03 | `de_nghiep` | Đế Nghiệp | END02 Nhân Hoàng | OR04, OR10, OR17, OR18, OR36, OR37, OR41 | LOC02, LOC13 |
| DL04 | `phu_giap` | Phú Giáp Thiên Hạ | END06 (truyền thương hội) hoặc END01 | OR11, OR26, OR33, OR34, OR40, OR44 | LOC03 |
| DL05 | `huyet_cuu` | Huyết Cừu | END01 hoặc chuyển sang đại lộ khác khi báo xong | OR06, OR20, OR30, OR42, OR43 | tùy kẻ thù |
| DL06 | `vo_lam` | Võ Lâm Chí Tôn | END06 Truyền một ngọn đèn | OR08, OR19, OR21, OR35 | LOC11, LOC13 |
| DL07 | `the_gia` | Thế Gia Vạn Đại | END06 hoặc END01, dòng họ sang kiếp sau | OR01, OR12, OR16, OR22, OR31 | LOC01, LOC09 |
| DL08 | `y_gia` | Y Giả Độ Thế | END06 | OR13, OR29, OR38 | LOC10 |
| DL09 | `tinh_mong` | Tỉnh Mộng | Đủ TRI01–03 → END04, END05 hoặc END07 | OR05, OR07, OR15, OR24, OR25, OR27, OR28, OR32 | LOC04, LOC12, LOC15 |

Luật riêng của đại lộ:
1. Năm hồi = năm nút N1–N5. Hồi 1 có `"boQuaNeuXuatThan": true`: nếu tuyến xuất thân đã kết, game bỏ hồi 1, vào thẳng hồi 2. Vì vậy hồi 1 chỉ là phần mở ngắn; **hồi 2 trở đi không được kể lại** chuyện đã có ở tuyến xuất thân.
2. Hồi 2–5 mỗi hồi có `khacVoi`, ví dụ `"OR01.N4 chia đất trong thôn; hồi này là giữ tên họ ở nơi mới, không xử chuyện đất lại"`.
3. Hồi 3 và hồi 5 có `clk` và **ít nhất một lựa chọn** có `e.clk` cùng mã.
4. Mỗi kiếp chỉ một đại lộ chính, đổi được một lần (game lo). Đại lộ đọc trạng thái hiện tại của thế giới (triều còn hay đã đổ, thế lực còn hay đã tan) bằng `dk.faSong`/`faDiet`/`vaiSong`, không giả định nó còn.
5. Đại lộ dùng lại người/nơi/thế lực trong bảng mã, không sinh người mới chỉ để giao việc.

## 8. BẢNG MÃ được phép dùng

Trong lời văn, **không ghi thẳng tên** người/nơi/thế lực; dùng chỗ thay sau, game điền tên đúng lúc chơi:

| Viết | Game điền |
|---|---|
| `{ten}` | Tên nhân vật người chơi. |
| `{que}` | Quê người chơi. |
| `{NP01}` | Tên **người đang giữ vai** NP01 (sau trăm năm có thể là con cháu/học trò). Nếu vai trống: "người từng là …". |
| `{NP01.vai}` | Tên vai: "đại diện hộ nông". |
| `{NP01.noi}` | Nơi người giữ vai ở. |
| `{LOC01}` | Tên hiện tại của nơi neo trên bản đồ. |
| `{FA02}` | Tên thế lực. |

Chỉ những chỗ thay trên. Viết khác (ví dụ `{NP01.ten}`, `{thay}`) là lỗi.

### 8.1 Nơi neo LOC

| Mã | Tên lúc đầu | Đại khu | Thế lực | Công dụng | Khi bị phá |
|---|---|---|---|---|---|
| LOC01 | Thanh Khê Thôn | Trung Châu | FA04 | Ruộng, nhà hộ dân, đê, kho thóc, chợ. | trại tị nạn → di tích |
| LOC02 | Lương Kinh | Trung Châu | FA01 | Triều đình, trường thi, ngục, sổ thuế, sân khấu. | kinh thành đổi chủ → kinh thành dưới luật mới |
| LOC03 | Vạn Bảo Hội Quán | Trung Châu | FA02 | Hợp đồng, thương đội, bảo quản, đấu giá. | hội quán cháy, sổ nợ còn bản sao trong thương đội → nền hội quán cũ |
| LOC04 | Cổ Miếu Vô Danh | Đông Hoang | — | Trú ẩn, bia tên người mất, dấu mộng. | miếu đổ, bia vỡ còn mảnh chữ đọc được → nền miếu giữa cỏ |
| LOC05 | Huyền Cơ Trận Các | Đông Hoang | FA03 | Trận đồ, trục quan trắc, hồ sơ Ngũ Tổ. | các sụp, còn phòng lõi nguy hiểm có thể khảo sát → phòng lõi giữa đá đổ |
| LOC06 | Đoạn Tùng Lâm | Đông Hoang | — | Gỗ, dược phàm, thú, đất chôn. | rừng cháy, lộ nền đá cổ → rừng non mọc trên nền đá cổ |
| LOC07 | Huyết Sát Cốc | Nam Trạch | FA05 | Huyết tộc, huyết trì, pháp ước, tranh quyền. | cốc vắng, còn ấn và hồ sơ bị nguyền → huyết trì khô |
| LOC08 | Vạn Thú Môn | Nam Trạch | FA06 | Chuồng thú, trại cứu thương, sổ khế ước, cửa gọi linh. | chuồng bỏ ngỏ, thú thả ra thành bầy thật → trại cũ giữa bầy thú |
| LOC09 | Tịch Chiếu Bến | Nam Trạch | — | Đò, lưới, chợ nước, sân hát, xác tàu. | lũ đổi lối vào, lời khai nằm trên bảng khắc thuyền → bến mới bên dòng cũ |
| LOC10 | Bách Thảo Cốc | Tây Lĩnh | FA07 | Ruộng thuốc, bệnh xá, hồ sơ dịch, bàn luyện đan. | vườn bị đốt, hạt giống còn trong kho lạnh → vườn mọc lại từ kho lạnh |
| LOC11 | Hàn Thiết Lô | Tây Lĩnh | FA08 | Mỏ, lò, xưởng giấy và khuôn. | mỏ đóng, còn đường hầm, bảng công và lô kim loại cuối → đường hầm bỏ hoang |
| LOC12 | Lạn Kha Tự | Tây Lĩnh | FA09 | Thư khố, nhà tạm trú, tháp tro, văn bia. | chùa đổ, văn bản tản mát ở người hành hương → tháp tro còn đứng |
| LOC13 | Bắc Phong Ải | Bắc Nhạc | FA10 | Quân doanh, trường luyện, trạm ngựa, kho. | ải thất thủ thành chiến địa, tuyến tiếp tế lưu vong → chiến địa cũ |
| LOC14 | Táng Cốt Nguyên | Bắc Nhạc | — | Mồ tập thể, bia trận vong, trại người trở về, xưởng dựng bia. | trại bỏ hoang, dấu linh hồn còn đọc được → đồng mộ không người |
| LOC15 | Hồi Thanh Đài | Bắc Nhạc | — | Điểm nghe ký ức, quan trắc Đêm Dài và cửa kết thúc. | nền đá nứt, lõi đài còn nghe được → nền đá |

### 8.2 Vai NPC (NP)

Cột "Tên lúc đầu" để bạn hiểu nhân vật; **trong văn luôn viết `{NPxx}`**. Cột "Vật chứng thay" là thứ còn lại khi vai trống — dùng để viết `thayThe`.

| Mã | Tên lúc đầu | Vai | Nơi | Thế lực | Cảnh giới | Mục tiêu | Vật chứng thay |
|---|---|---|---|---|---|---|---|
| NP01 | Lý Thổ | đại diện hộ nông (đứng đầu) | LOC01 | FA04 | phàm | Giữ đê và đất | sổ hộ và bia người giữ giống |
| NP02 | Mộc Nghi | dân binh | LOC01 | FA04 | phàm | Đưa quân dịch trở về | danh sách quân dịch ở trạm |
| NP03 | Tạ Văn Kính | thư lại | LOC02 | FA01 | phàm | Sửa sổ thuế nhưng sợ mất chức | bản sổ thuế có nét sửa |
| NP04 | Lương Hạo | quân chủ (đứng đầu) | LOC02 | FA01 | phàm | Giữ ngôi, sợ tên mình thành tên cuối sử | chiếu chỉ và ấn triều |
| NP05 | Thẩm Cửu | chưởng quỹ (đứng đầu) | LOC03 | FA02 | phàm | Giữ chữ tín có lợi cho hội | sổ nợ bản sao trong thương đội |
| NP06 | Lạc Tín | người dẫn thương đội | LOC03 | FA02 | phàm | Chuộc người nhà bị cầm cố | khế cầm cố người nhà |
| NP07 | Vô Đăng | người giữ miếu | LOC04 | — | phàm | Giữ danh tính người bị xóa | bia tên người mất trong miếu |
| NP08 | Mạc Liên | người dò phả hệ | LOC04 | — | phàm | Tìm tên mẹ mình | tập chép bia |
| NP09 | Hứa Triều | trận sư (đứng đầu) | LOC05 | FA03 | Kết Đan | Giữ trận dù biết nó có nợ | trận đồ ở phòng lõi |
| NP10 | Diệp Vân | học đồ trận | LOC05 | FA03 | Luyện Khí | Công khai bảng người bị hiến | bản sao bảng người bị hiến |
| NP11 | Đỗ Lộc | tiều phu | LOC06 | FA04 | phàm | Nuôi con và không bán hết rừng | dấu khắc trên cây mẹ |
| NP12 | Dã Tâm | sứ thú của Yêu Hoàng | LOC06 | — | Nguyên Anh | Lập lại hiệp ước sinh cảnh | hiệp ước sinh cảnh khắc trên đá |
| NP13 | Tần Huyết Lăng | chủ huyết cốc (đứng đầu) | LOC07 | FA05 | Nguyên Anh | Giữ dòng tộc, không muốn bị chiếm hồn | ấn huyết cốc và hồ sơ bị nguyền |
| NP14 | A Túc | người giữ huyết phả | LOC07 | FA05 | Luyện Khí | Cứu những tên bị loại khỏi tộc | huyết phả |
| NP15 | Bạch Kỳ | người quản thú (đứng đầu) | LOC08 | FA06 | Kết Đan | Giữ môn tồn tại qua thú triều | sổ khế ước thú |
| NP16 | Kỷ Vũ | thú y | LOC08 | FA06 | Luyện Khí | Chấm dứt khế ước cưỡng ép | phương thuốc thú |
| NP17 | Giang Mộ | lái đò | LOC09 | — | phàm | Chở người sống và trả tên người chết | bảng khắc thuyền |
| NP18 | Ninh Ca | chủ gánh hát | LOC09 | — | phàm | Đưa lời khai bị cấm lên sân khấu | vở tuồng chép tay |
| NP19 | Tô Bán Hạ | y sư (đứng đầu) | LOC10 | FA07 | Trúc Cơ | Mở bệnh xá đủ sức nuôi người chữa | hồ sơ dịch và hạt giống kho lạnh |
| NP20 | Hà Tề | dược đồng | LOC10 | FA07 | phàm | Tìm nguồn dịch, nghi sổ triều bị sửa | mẫu nước và sổ ghi bệnh |
| NP21 | Cố Chùy | chủ lò (đứng đầu) | LOC11 | FA08 | phàm | Trả nợ lò mà không chôn thêm thợ | bảng công thợ mỏ |
| NP22 | La Men | thợ khuôn và giấy | LOC11 | FA08 | phàm | Mua lại tên tuổi nghề | khuôn ấn giả |
| NP23 | Trí Viễn | người giữ thư khố (đứng đầu) | LOC12 | FA09 | Trúc Cơ | Ghi sự thật mà không khiến chiến tranh tái phát | thư khố Lạn Kha |
| NP24 | Sầm Tro | người khắc bia | LOC12 | FA09 | phàm | Trả tên cho từng nắm tro | văn bia đã khắc |
| NP25 | Đường Bắc Quy | chỉ huy (đứng đầu) | LOC13 | FA10 | Luyện Khí | Đưa quân về đủ người, có thể phản triều vì việc ấy | bản đồ quân doanh |
| NP26 | A Mãn | giữ ngựa trạm | LOC13 | FA10 | phàm | Giữ đường tin không bị sửa | sổ trạm ngựa |
| NP27 | Mạnh Cốt | thầy bó xương | LOC14 | — | phàm | Cứu người còn sống giữa nghĩa địa | sổ tên người được cứu |
| NP28 | Bùi Ấn | cựu coi ấn | LOC14 | — | phàm | Công bố lệnh chết bị giả | ấn thật được giấu |
| NP29 | Kha Vọng | người nghe ký ức | LOC15 | — | Kết Đan | Chứng minh có thể sửa vòng mà không hiến thêm người | nền đá ghi lời nghe được |
| NP30 | Tịch Âm | ký ức kết tụ | LOC15 | — | phàm | Muốn được chấm dứt việc lặp lời người chết | tiếng vọng ở nền đá |

### 8.3 Thế lực FA

| Mã | Tên | Căn cứ | Đứng đầu (vai) | Giữ |
|---|---|---|---|---|
| FA01 | Lương triều | LOC02 | NP04 | thuế và ngôi |
| FA02 | Vạn Bảo Thương Hội | LOC03 | NP05 | hợp đồng, độc quyền vận chuyển |
| FA03 | Huyền Cơ Trận Các | LOC05 | NP09 | hệ trận Ngũ Tổ |
| FA04 | Thanh Khê Liên Thôn | LOC01 | NP01 | đất, nước, an táng |
| FA05 | Huyết Sát Cốc | LOC07 | NP13 | huyết hệ và quyền tự trị |
| FA06 | Vạn Thú Môn | LOC08 | NP15 | nơi sống, khế ước và nguồn thú |
| FA07 | Bách Thảo Cốc | LOC10 | NP19 | cứu chữa và đan phương |
| FA08 | Hàn Thiết Hội | LOC11 | NP21 | lò và quyền thợ |
| FA09 | Lạn Kha Tự | LOC12 | NP23 | ký ức người chết |
| FA10 | Bắc Phong Quân | LOC13 | NP25 | biên ải và lương quân |

### 8.4 Đồng hồ thế giới CLK

| Mã | Đồng hồ | Nơi | Ba giai đoạn |
|---|---|---|---|
| CLK01 | Mùa đói Thanh Khê | LOC01 | kho lương vơi → thiếu lương hai quý → dân bỏ làng |
| CLK02 | Nợ của triều đình | LOC02 | đến kỳ trả nợ → trễ kỳ thứ nhất → trễ kỳ thứ hai |
| CLK03 | Biên ải | LOC13 | đông về, xét lương quân → thiếu lương, thiếu người → quân địch phá ải |
| CLK04 | Huyết ước | LOC07 | gọi họp huyết tộc → trình vật chứng huyết mạch → xác nhận quyền kế vị |
| CLK05 | Thú triều | LOC08 | dấu hiệu trong rừng → vạn thú xuống núi → thú vương hiện |
| CLK06 | Đêm Dài trở lại | LOC15 | trăng đỏ (Huyết Nguyệt) → ma tu trỗi dậy → Ma chủ tỉnh |
| CLK07 | Đại Hội Thiên Kiêu | LOC02 | mở đăng ký → vòng loại ở các khu → chung kết |
| CLK08 | Tông Chiến Chính–Ma | — | xích mích → vây công → quyết chiến |
| CLK09 | Đổi Ngôi | LOC02 | thuế nặng, loạn → khởi nghĩa → kinh thành thất thủ |
| CLK10 | Đại Dịch | LOC10 | người chết lạ → dịch lan rộng → phong tỏa |
| CLK11 | Bí Cảnh Thượng Cổ Mở | — | ánh sáng ở Tây Lĩnh → tông lớn kéo tới → cửa đóng |
| CLK12 | Tiên Nhân Hạ Phàm | LOC15 | dị tượng → người thượng giới đi tìm một vật → một tông diệt |
| CLK13 | Long Mạch Đứt | — | linh khí suy → động phủ khô → tranh linh mạch |
| CLK14 | Thiên Lộ Mở | LOC15 | cầu ánh sáng → tranh vào → cửa khép |

## 9. Mã việc làm (deed) cho sổ nghiệp

Dùng trong `e.deed`. Chọn mã **đúng việc kể trong lựa chọn**. Một lựa chọn bình thường (đi làm thuê, hỏi chuyện) không cần deed. Không bao giờ viết điểm nghiệp ra chữ.

| Mã | Việc |
|---|---|
| `cuu_nguoi` | Cứu người đang gặp nạn |
| `cuu_nguoi_hy_sinh` | Cứu người phải chịu thương nặng/mất của |
| `bo_thi` | Bố thí người nghèo |
| `phat_chan` | Phát chẩn năm đói (từ 5 lượng) |
| `giet_cuop_dang_ac` | Giết kẻ cướp đang hành ác |
| `tha_ke_ac` | Tha kẻ ác đầu hàng |
| `giet_vo_toi` | Giết người vô tội |
| `diet_khau` | Giết người diệt khẩu |
| `giet_dau_hang` | Giết kẻ đã đầu hàng |
| `tra_tan` | Tra tấn |
| `tra_tan_cuu_nguoi` | Tra hỏi để cứu người khác |
| `giet_thu_vo_hai` | Giết yêu thú vô hại để lấy yêu đan |
| `giet_thu_cuu_sinh` | Giết thú đang hại sinh linh khác |
| `phong_sinh` | Phóng sinh, thả thú bị nhốt |
| `trom_ngheo` | Trộm của người nghèo |
| `trom_ac_ba` | Trộm của ác bá |
| `hiep_dao` | Trộm của ác bá chia cho người nghèo |
| `lua_loi` | Lừa gạt vì lợi |
| `lua_cuu` | Nói dối để cứu người |
| `giu_loi` | Giữ lời hứa khi khó |
| `that_hua` | Thất hứa |
| `phan_su_mon` | Phản bội sư môn |
| `phan_ma_cuu` | Phản ma môn để cứu người |
| `hieu_kinh` | Phụng dưỡng cha mẹ (mỗi năm) |
| `bo_roi_gia_dinh` | Bỏ rơi gia đình |
| `quan_thanh_liem` | Làm quan thanh liêm (mỗi năm) |
| `tham_o` | Tham ô một vụ |
| `an_oan` | Xử oan người vô tội |
| `ep_ta_dien` | Ép tá điền, cho vay nặng lãi (mỗi năm) |
| `hanh_hiep` | Hành hiệp trượng nghĩa |
| `dau_doc` | Đầu độc người |
| `giet_thien_kieu_chinh` | Giết thiên kiêu chính đạo |
| `giet_ma_dau` | Giết ma đầu |
| `giet_doat_bao` | Giết người đoạt bảo |
| `diet_mon_ma` | Tham gia diệt môn ma tông |
| `diet_mon_chinh` | Tham gia diệt môn chính tông |
| `pha_phong_an` | Phá phong ấn thả yêu ma |
| `sieu_do` | Siêu độ vong hồn |
| `dao_mo` | Đào mộ lấy của |
| `an_tang` | An táng người chết bên đường |
| `huyet_te_nguoi` | Huyết tế người (mỗi mạng) |
| `luyen_hon_nguoi` | Luyện hồn người sống |
| `doat_can` | Đoạt linh căn |
| `dung_ma_cong` | Dùng công pháp tà trong một trận |
| `cuu_dich` | Chữa một vùng dịch |
| `pha_de` | Phá đê cứu thành, nhấn chìm làng nhỏ |
| `ban_dong_doi` | Bỏ đồng đội bị thương giữa hiểm cảnh |
| `ket_lieu_dong_doi` | Kết liễu đồng đội để lấy đồ |
| `bao_thu` | Báo thù kẻ đã hại mình |
| `hoa_giai` | Tha thứ kẻ thù, hóa giải |
| `ban_nguoi` | Bán người làm nô |
| `nhan_nuoi` | Nhận nuôi trẻ mồ côi |
| `sam_hoi` | Sám hối ở chùa |
| `nghich_thien` | Nghịch thiên cải mệnh (Thiên cơ) |

## 10. Giọng văn, độ dài, điều CẤM

### Giọng văn
- **U tối, tiên hiệp, có hơi ấm.** Thế giới khắc nghiệt (đói, nợ, chiến, người bị xoá tên), nhưng vẫn có nồi cháo chung, bàn tay giữ lưới, ngọn đèn ai đó để lại. Không bi luỵ, không giảng đạo.
- Gọi người chơi là **"ngươi"**. Câu ngắn, cụ thể: mùi, vật, việc tay chân. Lời thoại trong ngoặc kép `\"…\"` (trong JSON viết `\"`).
- Mỗi lựa chọn là một cách sống có giá riêng. Lựa chọn ác cũng được kể tử tế, có hậu quả, không chế giễu.
- Từ ngữ tiên hiệp dùng vừa phải: linh khí, tu vi, đạo tâm, tông môn… Phàm nhân không dùng phép.

### Độ dài
| Phần | Độ dài |
|---|---|
| `nut[].mo`, `thayThe` | 120–700 ký tự (3–6 câu) |
| `cach[].l` | dưới 60 ký tự |
| `cach[].t` | 60–500 ký tự (2–4 câu) |
| `tuDien.t` | 40–300 ký tự |
| `ket[].t` | 120–600 ký tự |
| `su`, `dauVong` | một câu, dưới 160 ký tự |

### CẤM (bộ kiểm báo lỗi hoặc cảnh báo)
1. **Không tạo NPC mới có tên, không tạo nơi mới có tên.** Chỉ dùng mã trong bảng. Người phụ gọi chung: "một ông thợ già", "gã lái buôn", "mấy hộ di cư".
2. **Không ghi thẳng tên** người/nơi/thế lực trong bảng (ví dụ "Lý Thổ", "Thanh Khê Thôn") — dùng `{NP01}`, `{LOC01}`.
3. **Không hồi sinh người chết.** Người đã chết không quay lại nói tiếp; nút có `vai` phải có `thayThe` không gọi vai đó.
4. **Không hiện số nghiệp, không hiện con số chỉ số** (khí huyết, công, tu vi, tiền…). Lời văn **không có chữ số**, trừ **tuổi** ("16 tuổi").
5. **Không ép người chơi.** Mỗi nút có ít nhất một lựa chọn không điều kiện; có thể có lựa chọn `boQua`. Không viết "ngươi buộc phải…".
6. **Đại lộ không kể lại phần mở đầu** đã có ở tuyến xuất thân (dùng `boQuaNeuXuatThan`, `khacVoi`).
7. Không dùng khoá hiệu ứng/điều kiện ngoài mục 4–5; không tiền sai đơn vị (linh thạch cho phàm nhân).
8. Không trùng `id` (tuyến, lựa chọn trong nút, vật truyện).
9. Không mặc định người chơi có thuyền, kho, quân lính, đệ tử nếu chưa kể ai đưa cho.
10. Cứu người không tự sinh nợ; nhận tiền công hợp pháp không tự trừ nghiệp.

### Ví dụ đúng / sai

| Sai | Đúng | Vì sao |
|---|---|---|
| `"Lý Thổ tìm tới…"` | `"{NP01} tìm tới…"` | Tên người giữ vai đổi theo thời gian. |
| `"Ngươi trả 3 lượng bạc."` | `"Ngươi trả ba lượng bạc."` + `"e": {"bac": -3000}` | Không chữ số trong văn; tiền thật nằm ở `e`. |
| `"Nghiệp lực +5"` | `"e": {"deed": "cuu_nguoi"}` | Không hiện số nghiệp. |
| `"e": {"linhThach": {"ha": 5}}` (không `dk`) | thêm `"dk": {"pham": false}` | Phàm nhân không có linh thạch. |
| `"Lão Trương Ba, chủ quán ở Hắc Thạch Trấn…"` | `"Một ông chủ quán ở {LOC03}…"` | Không tạo người/nơi mới. |
| `thayThe`: `"{NP01} đã mất, nhưng {NP01} vẫn dặn…"` | `"Tấm bia người giữ giống mà {NP01.vai} để lại ghi…"` | Người chết không nói tiếp. |
| `"cach": [ {…}, {…} ]` | 3–5 lựa chọn | Mỗi nút cần ít nhất ba lựa chọn. |
| `"e": {"karma": 5, "st": 100}` | `"e": {"deed": "bo_thi", "bac": -500}` | Khoá cũ không dùng cho tuyến. |
| `"ket": [{"id": "A", "dk": {}}]` | `"dk": {"dau": ["kho_chung"]}` | Kết phải đòi dấu có thật. |

## 11. Tuyến mẫu hoàn chỉnh: OR01 — Con nhà nông

Tệp này đã chạy được trong game và qua bộ kiểm. Chép đúng khuôn này.

```json
{
  "schemaVersion": 1,
  "id": "OR01",
  "loai": "xuat_than",
  "xuatThan": "nong",
  "ten": "Một bát cơm qua mùa lạnh",
  "tomTat": "Đê thôn hỏng vì đá xây bị bán, không phải vì dân thất đức. Người chơi đối chiếu sổ thóc, khảo đê, sống qua mùa đói, xử chuyện đất của hộ di cư, rồi chọn giữ kho chung, làm chủ ruộng hay bỏ quê.",
  "goiYDaiLo": ["the_gia"],
  "mo": { "tuoiTu": 16 },
  "vatTruyen": [
    { "id": "vt_or01_mau_da", "n": "Mẫu đá đê", "i": "🪨", "d": "Một hòn đá xốp bẻ ra từ chân đê, nhẹ hơn đá thật, mặt cắt còn vết đục của thợ lấy đá lậu." },
    { "id": "vt_or01_so_ho", "n": "Sổ hộ cũ", "i": "📒", "d": "Cuốn sổ hộ của thôn, giấy đã ố, ghi tên từng nhà và phần ruộng. Ai giữ sổ thì giữ được chỗ để quay về." }
  ],
  "nut": [
    {
      "id": "N1",
      "ten": "Sổ thóc thiếu một dòng",
      "cho": { "thang": 1 },
      "loiMoi": { "cach": "nguoi", "vai": "NP01", "noi": "LOC01" },
      "han": { "thang": 6 },
      "mo": "Chiều muộn, {NP01} tìm tới, áo còn dính bùn ruộng. Người đứng đầu các hộ ở {LOC01} đặt lên bàn một tờ giấy chép tay: phần thóc nhà ngươi nộp năm ngoái, đối với sổ thu của {NP03} ở {LOC02}, thiếu hẳn một dòng. Không chỉ nhà ngươi. Ba bốn nhà nữa cũng thiếu, như thể có ai đó đã nhẹ tay gạch bớt. \"Thóc thì nộp đủ rồi,\" {NP01} nói khẽ, \"mà sổ bảo là chưa. Mùa này mà bị đòi lại lần nữa thì nhiều nhà không qua nổi.\"",
      "thayThe": "Chiều muộn, một người trong hội hộ nông mang tới cuốn sổ hộ và tấm bia người giữ giống chép lại thành giấy. {NP01.vai} cũ đã không còn, nhưng những dòng ông để lại vẫn rõ: phần thóc nhà ngươi nộp năm ngoái, đối với sổ thu ở {LOC02}, thiếu hẳn một dòng. Ba bốn nhà khác cũng thế. Không ai biết ai đã gạch bớt, chỉ biết mùa này mà bị đòi lại thì nhiều nhà không qua nổi.",
      "cach": [
        {
          "id": "doi_chieu",
          "l": "Đi đối chiếu từng dòng sổ, ghi tên những nhà cùng chịu",
          "t": "Ngươi ngồi suốt mấy đêm bên ngọn đèn dầu, dò từng dòng một. Đến sáng thứ ba, tên những nhà bị gạch bớt đã nằm gọn trên một tờ giấy, kèm ngày nộp và người nhận. Tờ giấy mỏng, nhưng cầm lên thấy nặng tay.",
          "dau": ["so_that"],
          "e": { "h": 24, "deed": "giu_loi" }
        },
        {
          "id": "nop_bu",
          "l": "Nộp bù cho êm chuyện",
          "t": "Ngươi gom chút tiền dành dụm, nộp bù phần thiếu. Người thu thuế gật đầu, không hỏi gì thêm. Nhà ngươi yên, nhưng những nhà khác vẫn bị đòi, và tờ sổ sai vẫn nằm đó như chưa từng có chuyện gì.",
          "dk": { "bacTu": 2000 },
          "dau": ["chiu_thue"],
          "e": { "bac": -2000 }
        },
        {
          "id": "giau_thoc",
          "l": "Lẳng lặng giấu một phần thóc giống xuống hầm",
          "t": "Đêm ấy ngươi đào sâu thêm dưới gầm giường, chôn một vò thóc giống bọc lá chuối. Sổ sai thì kệ sổ sai. Ít nhất mùa sau nhà mình còn cái để gieo.",
          "dau": ["giau_giong"]
        }
      ],
      "tuDien": {
        "t": "Chuyện sổ thóc rồi cũng qua như mọi chuyện ở thôn: người ta im lặng nộp bù, nhà nào không nộp nổi thì bán bớt nông cụ.",
        "su": "Mấy nhà ở {LOC01} bị đòi thóc lần hai, phải bán nông cụ để nộp.",
        "dau": ["so_sai_van_con"]
      }
    },
    {
      "id": "N2",
      "ten": "Chân đê xốp như bánh",
      "cho": { "thang": 2 },
      "loiMoi": { "cach": "tin", "noi": "LOC01" },
      "han": { "thang": 8 },
      "mo": "Người ở chợ đồn rằng đê {LOC01} lại thấm, mới đắp chưa đầy hai mùa. Ngươi về tới nơi, lội xuống chân đê. Nước rỉ qua từng kẽ, và đá kè cầm lên nhẹ bẫng, bẻ tay cũng vỡ. Một ông thợ già ngồi vá rổ gần đó nhìn ngươi, rồi nhìn đá, không nói gì. Trên một hòn đá còn dấu đục của lò đá lậu, loại người ta bán qua tay {FA02} cho mấy kẻ môi giới của triều.",
      "cach": [
        {
          "id": "lay_mau",
          "l": "Bẻ lấy một hòn đá làm chứng",
          "t": "Ngươi bọc hòn đá xốp trong vạt áo. Ông thợ già khẽ ho: \"Giữ cho kỹ. Đá thật thì nặng, đá này nhẹ vì có người đã ăn phần nặng ấy rồi.\"",
          "dau": ["biet_da_ban"],
          "e": { "vatPham": "vt_or01_mau_da" }
        },
        {
          "id": "hoi_tho",
          "l": "Ngồi xuống hỏi chuyện ông thợ già",
          "t": "Ông kể chậm, như kể chuyện người khác: năm ấy đá chở về thiếu một nửa, nửa còn lại là đá vụn của lò lậu. Người nhận hàng là kẻ có giấy của triều. Ông không dám nói với ai, vì nói thì thợ mất việc trước.",
          "dau": ["biet_da_ban", "quen_tho"],
          "e": { "h": 6 }
        },
        {
          "id": "dap_lai",
          "l": "Bỏ tiền thuê người đắp lại đoạn thấm nhất",
          "t": "Ngươi bỏ ra một khoản không nhỏ, thuê mấy trai làng cùng đắp. Đá tốt phải mua từ xa, gánh từng gánh. Đoạn đê ấy đứng vững qua trận mưa đầu mùa, và lần đầu tiên người trong thôn nhìn ngươi như nhìn người nhà.",
          "dk": { "bacTu": 3000 },
          "dau": ["de_sua"],
          "e": { "bac": -3000, "deed": "cuu_nguoi", "fa": { "FA04": 2 } }
        },
        {
          "id": "dap_tam",
          "l": "Đắp tạm bằng đất và cọc tre",
          "t": "Ngươi cùng mấy nhà lân cận vác đất, đóng cọc. Đê tạm thì vẫn là đê tạm, nhưng qua được mùa này. Có người lẩm bẩm rằng sang năm lại phải đắp, và ai cũng biết người đó nói đúng.",
          "dau": ["de_tam"],
          "e": { "h": 48, "hp": "-5%" }
        }
      ],
      "tuDien": {
        "t": "Đê {LOC01} vỡ một đoạn trong trận mưa lớn. Nước không cuốn ai đi, nhưng cuốn mất mấy thửa mạ.",
        "su": "Đê {LOC01} vỡ một đoạn, mạ non bị cuốn.",
        "dau": ["de_vo"]
      }
    },
    {
      "id": "N3",
      "ten": "Mùa giáp hạt",
      "cho": { "thang": 3 },
      "clk": "CLK01",
      "loiMoi": { "cach": "ky_ngo", "noi": "here" },
      "han": { "thang": 6 },
      "mo": "Mùa giáp hạt tới sớm. Ở {que}, nồi cháo mỗi ngày một loãng, trẻ con khóc đêm vì đói mà người lớn không biết dỗ bằng gì. Kho thóc của thôn chỉ còn đáy. Ngươi nghe người ta bàn: có nhà muốn vay lương của thương đội, có nhà muốn đi làm thuê xa, có kẻ thì thầm chuyện phá kho của nhà giàu. Còn vò thóc giống cuối cùng, ăn thì qua được ít bữa, giữ thì có cái gieo sang năm.",
      "cach": [
        {
          "id": "giu_giong",
          "l": "Giữ thóc giống, chia cháo loãng cho đủ người",
          "t": "Ngươi cùng mấy nhà gom thóc giống vào một chỗ, niêm lại, thề không ai đụng. Cháo mỗi ngày loãng hơn, nhưng nồi chung thì không nhà nào bị bỏ ra ngoài. Đêm đói dài, nhưng sáng vẫn tới.",
          "dau": ["giu_giong"],
          "e": { "hp": "-10%", "deed": "cuu_dich", "clk": { "id": "CLK01", "kq": "Mùa đói ở {LOC01} qua đi nhờ một nồi cháo chung và thóc giống không ai đụng tới." } }
        },
        {
          "id": "vay_luong",
          "l": "Vay lương của thương đội, ký khế trả bằng vụ sau",
          "t": "Người của {FA02} đến với bao gạo và một tờ khế. Ngươi điểm chỉ. Gạo về tới thôn, ai cũng có bữa no. Tờ khế thì nằm trong tay áo kẻ khác, chờ tới mùa sau.",
          "dau": ["no_luong"],
          "e": { "bac": 3000, "fa": { "FA02": 1 } }
        },
        {
          "id": "lam_thue",
          "l": "Đi làm thuê ở nơi khác, gửi tiền về",
          "t": "Ngươi theo một đoàn người đi cấy thuê ở thôn xa. Công rẻ, việc nặng, nhưng mỗi tháng gửi về được ít tiền. Lúc quay lại, nhà còn đủ người, và đó là điều duy nhất ngươi muốn biết.",
          "dau": ["di_lam_thue"],
          "e": { "bac": 800, "h": 240 }
        },
        {
          "id": "pha_kho",
          "l": "Đêm tối dẫn người phá kho nhà giàu",
          "t": "Cửa kho bật ra dễ hơn ngươi tưởng. Thóc chảy ra như nước. Sáng hôm sau, nhà giàu báo quan, còn trong thôn không nhà nào chịu nói đã thấy ai. Bụng no, nhưng từ đó ngươi ngủ không yên.",
          "dau": ["pha_kho"],
          "e": { "deed": "trom_ac_ba", "fa": { "FA01": -2 } }
        }
      ],
      "tuDien": {
        "t": "Mùa giáp hạt qua đi theo cách của nó. Vài nhà bỏ thôn đi, vài mái nhà không còn khói bếp.",
        "su": "Mùa giáp hạt ở {LOC01}: vài nhà bỏ đi, không ai giữ được thóc giống chung.",
        "dau": ["thon_vang"]
      }
    },
    {
      "id": "N4",
      "ten": "Đất của người tới sau",
      "cho": { "thang": 4 },
      "loiMoi": { "cach": "nguoi", "vai": "NP02", "noi": "LOC01" },
      "han": { "thang": 8 },
      "mo": "{NP02} gọi ngươi ra bờ ruộng. Mấy hộ di cư chạy đói từ nơi khác tới đã dựng lều trên những thửa bỏ hoang của nhà đã đi. Người trong thôn đòi đuổi, người mới tới quỳ xin ở lại. Ruộng không có chủ thì không ai cày, mà có chủ rồi thì ai cũng muốn làm chủ. \"Ngươi là người trong thôn, lại từng đi xa,\" {NP02} nói, \"nói một câu đi, người ta sẽ nghe.\"",
      "thayThe": "Danh sách quân dịch ở trạm có ghi tên những người từng giữ an cho thôn, nhưng {NP02.vai} giờ không còn ai đứng ra. Ngươi tự ra bờ ruộng. Mấy hộ di cư chạy đói đã dựng lều trên những thửa bỏ hoang. Người trong thôn đòi đuổi, người mới tới quỳ xin ở lại. Không ai gọi ngươi, nhưng mọi người đều quay sang nhìn ngươi.",
      "cach": [
        {
          "id": "chuoc",
          "l": "Bỏ tiền chuộc lại ruộng bỏ hoang, chia cho cả hai bên",
          "t": "Ngươi trả nợ thuế còn treo trên những thửa ruộng ấy, rồi chia đều: nhà cũ một phần, nhà mới một phần. Có người không vui, nhưng không ai còn lý do để cầm gậy.",
          "dk": { "bacTu": 5000 },
          "dau": ["chia_dat"],
          "e": { "bac": -5000, "deed": "hanh_hiep", "fa": { "FA04": 2 } }
        },
        {
          "id": "phan_lai",
          "l": "Họp cả thôn, chia lại theo số miệng ăn",
          "t": "Cuộc họp kéo tới khuya. Lời qua tiếng lại, có lúc tưởng đánh nhau. Cuối cùng người ta điểm chỉ vào một tờ giấy chia lại ruộng theo số miệng ăn. Không ai được nhiều, nhưng không ai bị đuổi.",
          "dau": ["chia_dat"],
          "e": { "h": 12, "deed": "giu_loi" }
        },
        {
          "id": "mua_re",
          "l": "Mua rẻ những thửa ấy về tay mình",
          "t": "Người bỏ đi không còn ở đây để mặc cả. Ngươi mua lại giấy ruộng với giá rẻ từ tay kẻ giữ sổ. Hộ di cư thành tá điền của ngươi. Họ cúi đầu chào, nhưng ánh mắt thì không cúi.",
          "dk": { "bacTu": 3000 },
          "dau": ["mua_ruong"],
          "e": { "bac": -3000 }
        },
        {
          "id": "chiem",
          "l": "Đuổi người mới tới, chiếm lấy ruộng",
          "t": "Ngươi gọi mấy trai làng mang gậy ra. Lều bị dỡ trong một buổi sáng. Người mới tới gánh con đi về phía con đường lớn, không ngoái lại. Ruộng thành của ngươi, và cũng từ đó, có những cái tên ngươi không muốn nghe nhắc.",
          "dau": ["chiem_ruong", "mua_ruong"],
          "e": { "deed": "ep_ta_dien", "tamma": 3 }
        }
      ],
      "tuDien": {
        "t": "Không ai đứng ra phân xử. Người trong thôn và người mới tới đánh nhau một trận, rồi chia nhau ruộng theo kẻ mạnh.",
        "su": "Ở {LOC01}, hộ cũ và hộ di cư tranh ruộng, chia nhau theo kẻ mạnh.",
        "dau": ["tranh_dat"]
      }
    },
    {
      "id": "N5",
      "ten": "Khi mùa thu sau tới",
      "cho": { "thang": 6 },
      "loiMoi": { "cach": "nguoi", "vai": "NP01", "noi": "LOC01" },
      "han": { "nam": 1 },
      "mo": "Mùa thu lại tới, lúa trên đồng {LOC01} đã chín vàng. {NP01} ngồi với ngươi ở đầu bờ, nhìn những bông lúa trĩu xuống. \"Năm nay qua được rồi,\" ông nói, \"nhưng năm sau thì sao? Kho chung thì phải có người giữ, ruộng thì phải có người cày, mà người thì cứ mỗi năm một đi.\" Ông không hỏi ngươi định làm gì. Ông chỉ chờ.",
      "thayThe": "Mùa thu lại tới, lúa trên đồng {LOC01} đã chín vàng. Ngươi ngồi một mình ở đầu bờ, trước tấm bia người giữ giống mà {NP01.vai} để lại. Trên bia khắc một câu: kho chung thì phải có người giữ, ruộng thì phải có người cày. Không ai hỏi ngươi định làm gì. Chỉ có gió thổi qua đồng.",
      "cach": [
        {
          "id": "kho_chung",
          "l": "Đứng ra giữ kho chung cho cả thôn",
          "t": "Ngươi nhận chìa khoá kho. Mỗi nhà góp một phần thóc, ghi rõ vào sổ, để dành cho mùa giáp hạt. Việc nhỏ, chán, không ai khen. Nhưng mùa đói năm sau, nồi cháo ở thôn sẽ không loãng như năm nay.",
          "dau": ["kho_chung"],
          "e": { "deed": "hanh_hiep", "fa": { "FA04": 3 } }
        },
        {
          "id": "thu_to",
          "l": "Giữ ruộng đã có trong tay, thu tô cho đều",
          "t": "Ngươi làm sổ tô, thu theo từng vụ. Tá điền nộp đủ, ngươi không ép thêm, cũng không bớt. Thôn thành điền trang, và ngươi thành người mà ai gặp cũng phải chào trước.",
          "dk": { "dau": ["mua_ruong"] },
          "dau": ["tu_dien"],
          "e": { "bac": 6000 }
        },
        {
          "id": "bo_que",
          "l": "Gói sổ hộ và thóc giống, dẫn người nhà đi nơi khác",
          "t": "Ngươi gói cuốn sổ hộ cũ vào tay nải, buộc thêm một túi thóc giống. Người nhà đi theo, ngoái lại nhìn mái tranh một lần rồi thôi. Quê không mang theo được, nhưng tên quê thì mang được.",
          "dau": ["bo_que"],
          "e": { "vatPham": "vt_or01_so_ho" }
        }
      ],
      "tuDien": {
        "t": "Mùa thu qua đi, không ai đứng ra giữ kho, cũng không ai làm chủ hẳn ruộng. Thôn sống tiếp theo cách cũ, mỗi năm vắng thêm vài nhà.",
        "su": "{LOC01} không ai giữ kho chung, mỗi năm vắng thêm vài nhà."
      }
    }
  ],
  "ket": [
    {
      "id": "A",
      "ten": "Đèn còn trong thôn",
      "dk": { "dau": ["kho_chung", "de_sua"] },
      "t": "Kho chung đủ cho một mùa, đê đứng vững qua hai trận lũ. Có những nhà đã định đi rồi lại ở. Tối tối, đèn trong thôn vẫn sáng, và ở đầu làng có thêm một tấm bia nhỏ khắc tên những người đã giữ giống qua mùa đói.",
      "su": "{LOC01} có kho chung và đê vững; bia người giữ giống dựng ở đầu làng.",
      "dauVong": "ở {LOC01} có tấm bia người giữ giống, con cháu một hộ cũ vẫn giữ kho chung."
    },
    {
      "id": "B",
      "ten": "Chủ đất sau đói",
      "dk": { "dau": ["tu_dien"] },
      "t": "Phần lớn ruộng thôn về tay ngươi. Lúa vẫn có người cấy, tô vẫn có người nộp. Thôn không đói nữa, nhưng cũng không còn là thôn của mọi người. Trong sổ địa tô, mỗi dòng là một cái tên, và mỗi cái tên mang một mối ân hay oán.",
      "su": "{LOC01} thành điền trang của {ten}.",
      "dauVong": "ở {LOC01} còn cuốn sổ địa tô cũ, và những hộ chưa quên ai đã lấy ruộng của họ."
    },
    {
      "id": "C",
      "ten": "Tên quê trong tay áo",
      "dk": { "dau": ["bo_que"] },
      "t": "Ngươi cùng người nhà định cư ở nơi khác, dựng lại mái tranh, gieo lại thứ thóc giống mang theo. Thôn cũ tự sống theo cách của nó. Còn cuốn sổ hộ thì nằm trên bàn thờ, để con cháu biết mình từ đâu tới.",
      "su": "Một hộ từ {LOC01} bỏ quê, mang sổ hộ và thóc giống đi nơi khác.",
      "dauVong": "ở {LOC02} có một dòng họ lưu dân vẫn giữ cuốn sổ hộ của {LOC01}."
    }
  ],
  "ngoai": "{ten} đứng ngoài chuyện của thôn; {LOC01} tự xoay xở qua mùa đói."
}
```

Đọc mẫu:
- N1 mời bằng người (`NP01`), có `thayThe` kể qua "sổ hộ và bia người giữ giống" khi vai trống.
- N2 là tin đồn (`"cach": "tin", "noi": "LOC01"`): người chơi phải tự về thôn.
- N3 chạm đồng hồ `CLK01` (mùa đói): lựa chọn "giữ thóc giống" ghi kết quả thay mặc định.
- Dấu `de_sua` (N2) + `kho_chung` (N5) → kết A; `tu_dien` → kết B; `bo_que` → kết C. Lựa chọn "thu tô" chỉ mở khi đã có dấu `mua_ruong` (N4).
- Mọi nút có `tuDien` nên bỏ qua cả năm nút vẫn không kẹt: thế giới tự diễn, tuyến kết "người đứng ngoài".

## 12. Chia lô và quy trình

### Lô (mỗi lần 3 tuyến)

| Lô | Tệp |
|---|---|
| 1 | OR02.json, OR03.json, OR04.json |
| 2 | OR05.json, OR06.json, OR07.json |
| 3 | OR08.json, OR09.json, OR10.json |
| 4 | OR11.json, OR12.json, OR13.json |
| 5 | OR14.json, OR15.json, OR16.json |
| 6 | OR17.json, OR18.json, OR19.json |
| 7 | OR20.json, OR21.json, OR22.json |
| 8 | OR23.json, OR24.json, OR25.json |
| 9 | OR26.json, OR27.json, OR28.json |
| 10 | OR29.json, OR30.json, OR31.json |
| 11 | OR32.json, OR33.json, OR34.json |
| 12 | OR35.json, OR36.json, OR37.json |
| 13 | OR38.json, OR39.json, OR40.json |
| 14 | OR41.json, OR42.json, OR43.json |
| 15 | OR44.json, OR45.json |
| 16 | DL01.json, DL02.json, DL03.json |
| 17 | DL04.json, DL05.json, DL06.json |
| 18 | DL07.json, DL08.json, DL09.json |

Đại lộ viết **sau** khi đã có đủ tuyến xuất thân gợi ý cho nó (để ghi `khacVoi` đúng).

### Người dùng làm mỗi lô
1. In đoạn thiết kế của ba tuyến: `node tools/kiem-tra-tuyen.js --de OR02 OR03 OR04` (đại lộ: dán bảng mục 7 + các tuyến xuất thân liên quan đã viết).
2. Dán cho GPT: tệp hướng dẫn này + đoạn thiết kế vừa in + câu "Viết lô N".
3. GPT trả **ba khối mã JSON**, mỗi khối có dòng tiêu đề tên tệp. Lưu từng khối vào `content/tuyen/<tên>.json`.
4. Chạy `npm run content:tuyen`.
5. Có dòng `✗ Lỗi` → dán **nguyên các dòng lỗi** cho GPT, bảo "sửa các lỗi này, trả lại tệp đầy đủ". Lặp tới khi in `Đạt`.
6. Dòng `⚠ Cảnh báo` không chặn, nhưng nên đọc (thường là tên riêng mới hoặc văn quá ngắn/dài).
7. Cuối cùng chạy `npm run content:check` (kiểm cả game) rồi báo Claude rà.

### GPT tự kiểm trước khi trả (danh sách)
- [ ] `schemaVersion` 1, `id` = tên tệp, `loai` đúng, `xuatThan`/`daiLo` đúng mã.
- [ ] Đúng 5 nút N1–N5, mỗi nút có `ten`, `loiMoi`, `han`, `mo`, `cach` (3–5), `tuDien`; nút có `vai` thì có `thayThe` không gọi vai đó.
- [ ] Đúng 3 kết A/B/C, mỗi kết có `dk.dau` mà ít nhất một lựa chọn đặt.
- [ ] Chỉ dùng khoá ở mục 3–5; mã LOC/NP/FA/CLK/deed có trong bảng.
- [ ] Văn không chữ số (trừ tuổi), không tên cứng, không người/nơi mới, không điểm nghiệp.
- [ ] Tiền: phàm `bac` (xu); linh thạch chỉ khi `"pham": false`.
- [ ] Đại lộ: hồi 1 `boQuaNeuXuatThan`, hồi 2–5 `khacVoi`, hồi 3 và 5 `clk` + lựa chọn `e.clk`.
- [ ] JSON hợp lệ: không dấu phẩy thừa, không chú thích, ngoặc kép trong văn viết `\"`.

### Đọc lỗi
Mỗi dòng lỗi có dạng:
```
✗ Lỗi: content/tuyen/OR02.json dòng 41, khoá nut[1].cach[2].e.deed: mã việc làm "cuu_ngươi" không có trong DEED. Cách sửa: chọn một mã trong bảng "Mã việc làm (deed)".
```
- `dòng 41`: dòng trong tệp.
- `khoá nut[1].cach[2].e.deed`: nút thứ hai (đếm từ 0: `nut[1]` là N2), lựa chọn thứ ba, hiệu ứng deed.
- Phần sau "Cách sửa" nói phải làm gì.
