# Danh sách cần viết — đợt ba (Đại Mộng + sửa chữ 54 tuyến)

Sinh từ bảng của game (content/rules/dai-mong.js, content/text/dai-mong.json). Tệp đánh dấu **(mẫu)** Claude đã viết — không viết lại.

## A. Mộng Ấn — content/dai-mong/mong-an/

| tệp | tên | cách nhặt trong game | điều được hé lộ (game tự ghi sau đoạn của bạn) | làm chứng cho |
|---|---|---|---|---|
| MA01.json **(mẫu)** | Bát canh không đáy | chết, chọn "Ngồi đợi" ở bến, nghe người bên bến tới cuối (lần đầu) | Canh quên không làm quên hết. | Vòng đã từng khép |
| MA02.json | Người không già | nhận ra Người Gác Bến ở ba kiếp khác nhau (chọn "Ta đã gặp ngươi") | Có người không bị cuốn vào vòng. | Vòng đã từng khép |
| MA03.json | Mộ của chính mình | viếng mộ của chính mình kiếp trước | Ngươi từng sống, từng chết ở đây. | Vòng đã từng khép |
| MA04.json | Tuồng cũ | xem gánh hát ven bến {LOC09} diễn vở kể đời mình kiếp trước | Thế gian nhớ ngươi hơn ngươi nhớ mình. | Vòng đã từng khép |
| MA05.json | Chữ trong quẻ | xin quẻ ở {LOC12}, từ kiếp thứ hai, quẻ thấy chính mình | Mệnh đã được viết lặp lại. | Ký ức đang nuôi vòng |
| MA06.json | Kẻ cũng đang mơ | gặp lại một thiên kiêu đã gặp ở kiếp trước; người ấy nhận ra ngươi | Không chỉ mình ngươi đang mơ. | Ký ức đang nuôi vòng |
| MA07.json | Vết nứt trên trời | đứng ở {LOC15} lúc Tiên Nhân Hạ Phàm hoặc Thiên Lộ Mở đang diễn ra, nhìn lên vết nứt trên trời | Thượng giới cũng là một tầng mộng. | Cửa có thể chọn |
| MA08.json | Đáy Vong Xuyên | qua hồi bốn của đại lộ Tỉnh Mộng (DL09) | Vong Xuyên chảy từ chấp niệm của chúng sinh. | Ký ức đang nuôi vòng |

Lưu ý: MA01 hiện ở bến lúc chết (không có {ten}). MA02 hiện ngay sau lời đáp của Người Gác Bến. MA06: viết về một thiên kiêu (gọi chung "người ấy", không đặt tên) nhìn ngươi như nhìn người quen cũ.

## B. Người Gác Bến — content/dai-mong/gac-ben/

| tệp | dạng | gợi ý giọng, vật dụng |
|---|---|---|
| lao_cheo_do.json **(mẫu)** | một lão chèo đò | mái chèo, chuyến sang sông, khói thuốc |
| tre_an_may.json | một đứa trẻ ăn mày | bát mẻ, câu ngắn, hỏi lại ngây ngô mà trúng; đôi mắt già hơn tuổi |
| ni_co_mu.json | một ni cô mù | tràng hạt, nghe tiếng bước chân nhận người, nói về tiếng chuông |
| ban_canh.json | một người bán canh | gánh canh bên đường giống hệt gánh ở bến, mời mà không ép |
| lao_dao.json | một lão đạo ăn xin | quẻ bói, bàn tay xem chỉ tay, câu nửa đùa nửa thật |
| ba_do.json | một bà đỡ | đỡ đẻ, nói về người vừa sinh ra đã khóc như nhớ điều gì |

Thứ tự gặp xoay vòng theo bảng trên (kiếp gặp đầu tiên là lão chèo đò). Bậc lộ `loi[0..4]`: xem mục 4.2 của hướng dẫn. Lời dự phòng hiện có (để tham khảo mạch, viết lại theo giọng từng dạng):
- bậc 0: "Bến sông nào cũng có người chở đò," người ấy nói. "Ngươi hỏi ta là ai à? Ta là người ngồi đợi. Đợi lâu tới mức quên mình đợi gì."
- bậc 1: "Canh ở bến không làm quên hết đâu. Có thứ chìm xuống đáy bát, rồi theo người ta sang đời sau như hạt cát trong giày."
- bậc 2: "Năm người xưa dựng cái vòng này để cứu một thế giới đang chết. Họ không nói với ai rằng vòng phải ăn mới quay. Nó ăn thứ các ngươi tưởng là của riêng mình."
- bậc 3: "Vòng có thể chặt. Ba nút buộc nó nằm ở ba nơi cổ, ngươi đã đi qua cả rồi. Đừng nghe kẻ bảo ngươi sửa nó — thứ đã quen ăn sẽ không chịu đói lâu."
- bậc 4: "Ừ, ta từng là một phần của kẻ bị chém. Ta không sống, không chết, chỉ còn lại ở ngoài vòng. Vòng khép lại thì ta được tan. Ngươi tin ta tới đâu là việc của ngươi."

## C. Khảo sát nơi cổ — content/dai-mong/khao/

### LOC05.json — Huyền Cơ Trận Các **(mẫu)**

| mã việc | nhãn nút | nội dung đoạn |
|---|---|---|
| k05a | Khảo trục quan trắc cổ | khảo sát; chứng cho "Vòng đã từng khép" |
| k05b | Khảo lõi trận | khảo sát; chứng cho "Ký ức đang nuôi vòng" (chỉ làm được khi đã biết "Vòng đã từng khép") |
| k05c | Đọc hồ sơ Ngũ Tổ | khảo sát; chứng cho "Cửa có thể chọn" (chỉ làm được khi đã biết "Ký ức đang nuôi vòng") |
| khoa05 | Khảo quyền khoá của trục | đọc bản khắc thao tác, nắm một trong ba quyền khoá của trục (dùng cho nghi thức Diệt Thế); cơ chế đồng hồ, công tắc, không phải vật phẩm |

### LOC12.json — Lạn Kha Tự

| mã việc | nhãn nút | nội dung đoạn |
|---|---|---|
| k12a | Đối chiếu thư khố với bia tên | khảo sát; chứng cho "Vòng đã từng khép" |
| k12b | Nghe chuông lúc nửa đêm | khảo sát; chứng cho "Ký ức đang nuôi vòng" (chỉ làm được khi đã biết "Vòng đã từng khép") |
| que | Xin một quẻ | nhặt Mộng Ấn Chữ trong quẻ — Mệnh đã được viết lặp lại. |
| khoa12 | Khảo quyền khoá của trục | đọc bản khắc thao tác, nắm một trong ba quyền khoá của trục (dùng cho nghi thức Diệt Thế); cơ chế đồng hồ, công tắc, không phải vật phẩm |

### LOC15.json — Hồi Thanh Đài

| mã việc | nhãn nút | nội dung đoạn |
|---|---|---|
| k15b | Nghe tàn trận dưới nền đài | khảo sát; chứng cho "Ký ức đang nuôi vòng" (chỉ làm được khi đã biết "Vòng đã từng khép") |
| k15c | Thử mô hình nhỏ không dùng sinh linh | khảo sát; chứng cho "Cửa có thể chọn" (chỉ làm được khi đã biết "Ký ức đang nuôi vòng") |
| troi | Nhìn lên vết nứt trên trời | nhặt Mộng Ấn Vết nứt trên trời — Thượng giới cũng là một tầng mộng. |

### LOC09.json — Tịch Chiếu Bến

| mã việc | nhãn nút | nội dung đoạn |
|---|---|---|
| tuong | Xem gánh hát diễn vở cũ | nhặt Mộng Ấn Tuồng cũ — Thế gian nhớ ngươi hơn ngươi nhớ mình. |

### LOC07.json — Huyết Sát Cốc

| mã việc | nhãn nút | nội dung đoạn |
|---|---|---|
| khoa07 | Khảo quyền khoá của trục | đọc bản khắc thao tác, nắm một trong ba quyền khoá của trục (dùng cho nghi thức Diệt Thế); cơ chế đồng hồ, công tắc, không phải vật phẩm |

### LOC06.json — Đoạn Tùng Lâm

| mã việc | nhãn nút | nội dung đoạn |
|---|---|---|
| np12a | Tìm {NP12} giữa rừng | cảnh một: {NP12} (sứ thú của Yêu Hoàng) ngửi thấy trên người ngươi mùi của "kẻ không già", nhận ra đó là mùi chủ cũ; chưa nói thêm |
| np12b | Hỏi {NP12} về kẻ không già | cảnh hai (lộ thân phận): {NP12} kể Ngũ Tổ chém chủ nó nhưng không chém hết, một mảnh ký ức trôi ra ngoài vòng, ngồi bên bến đợi người chặt vòng giúp nó được chết; "nó nói thật, nhưng chỉ nói phần có lợi cho nó" |

## D. Nghi thức — content/dai-mong/nghi-thuc/

| tệp | nghi thức | dẫn tới | khoá cần viết và lúc hiện |
|---|---|---|---|
| NG01.json **(mẫu)** | Mở cửa tỉnh mộng | Phi thăng tỉnh mộng | chuanBi: xong bảy ngày hiệu chỉnh cửa ở nền đài · xong: mở đầu màn kết khi phi thăng · hong: người đã chuẩn bị cửa chết trước khi phi thăng |
| NG02.json | Thay nguồn | Giữ mộng bằng tên mình | chuanBi: dựng mô hình thay nguồn (trục chạy bằng ký ức người ta tự nguyện gửi) · xong: mở đầu màn kết khi nhận làm người điều phối |
| NG03.json | Ngắt vòng | Người chặt vòng | chuanBi: lúc hẹn ba chốt cơ cùng ngắt · xong: mở đầu màn kết khi vòng khép · hong: tới giờ mà thiếu một chốt, vòng chưa khép |
| NG04.json | Diệt thế | Thế giới không còn người gọi tên | xong: mở đầu màn kết sau ba xung phản tải · hong: cưỡng mở khi thiếu điều kiện, nghi thức vỡ, ba khu thành đất ma, Đêm Dài đến gần |

## E. Màn kết — content/dai-mong/ket/

| tệp | kết | khép hành trình? | điều kiện trong game | câu kết cố định (game tự thêm, không chép) |
|---|---|---|---|---|
| END01.json | Một đời đã sống | không — đời vẫn tiếp; đoạn hiện ở thẻ địa điểm / màn hết kiếp | chết (từ 40 tuổi, hoặc quy ẩn) khi có sinh kế / người thân còn sống / mục đích đã theo tới kết | Bếp nguội dần. Ngoài sân, một người vẫn nhớ ngươi thích để cửa hé vào những đêm mưa. |
| END02.json | Nhân Hoàng | không — đời vẫn tiếp; đoạn hiện ở thẻ địa điểm / màn hết kiếp | lên ngôi ở {LOC02}: ngai trống hoặc triều đình coi như người nhà, kho lương {FA04} và quân {FA10} đứng về phía mình, hai thế lực kết minh, đủ quân lương ba kỳ | Chiếu thư đi qua những mái nhà ngươi chưa từng bước vào. Từ hôm nay, cái đói ở đó cũng mang một phần tên ngươi. |
| END03.json | Ma chủ | không — đời vẫn tiếp; đoạn hiện ở thẻ địa điểm / màn hết kiếp | nắm huyết ấn ở {LOC07}: huyết ấn không chủ hoặc huyết cốc coi như người nhà, ba thế lực kết minh, có nguồn linh thạch | Không còn ai gọi ngươi bằng tên lúc nhỏ. Những người quỳ dưới điện vẫn có tên riêng, và ngươi biết mình đã bắt họ trả những gì. |
| END04.json **(mẫu)** | Phi thăng tỉnh mộng | có — sau màn kết là Tân Mộng | đủ ba tri thức, chuẩn bị cửa ở {LOC15}, vượt thiên kiếp phi thăng | Lần đầu tiên, giấc mộng không gọi ngươi quay lại. Sau lưng, một thế giới vẫn tiếp tục khóc và nhóm bếp. |
| END05.json | Giữ mộng bằng tên mình | có — sau màn kết là Tân Mộng | đủ ba tri thức, thử mô hình, lắp bộ tụ ở ba nơi cổ, chạy đủ một chu kỳ không lấy ký ức cưỡng ép, nhận làm người điều phối | Trục đá quay chậm. Trong tiếng động ấy, ngươi còn nghe từng cái tên, và lần này không tên nào bị lấy khi họ chưa trả lời. |
| END06.json | Truyền một ngọn đèn | không — đời vẫn tiếp; đoạn hiện ở thẻ địa điểm / màn hết kiếp | nghề chính tới bậc cao, từ 35 tuổi, dạy một người học tự nguyện một năm tới khi họ tự làm xong một việc | Người học trò làm sai một nét, rồi tự sửa. Ngươi ngồi nhìn, nhận ra có một việc từ nay không còn cần tay mình. |
| END07.json | Người chặt vòng | có — sau màn kết là Tân Mộng | đủ ba tri thức, xác minh đường tản ở ba nơi cổ, đặt chốt cơ ở cả ba, hẹn cùng một giờ; tới giờ đủ ba chốt | Nước thôi chảy ngược. Người sống chỉ còn một đời để từ biệt nhau, và buổi sáng vẫn đến. |
| END08.json | Thế giới không còn người gọi tên | có — sau màn kết là Tân Mộng | đủ ba tri thức, hai trong ba quyền khoá, đủ nguồn và sức, mở Diệt Thế ở {LOC15}, chịu ba xung phản tải | Gió đi qua chợ không còn mùi khói bếp. Không ai nguyền rủa ngươi nữa. Cũng không ai gọi. |

Kết không khép hành trình (END01, 02, 03, 06): `canh` hiện ngay lúc đạt, ngắn hơn (200–500), `hau` vẫn viết (để dành cho sổ luân hồi đợt sau). END01 hiện ở màn hết kiếp.

## F. Phần B — 54 tuyến

Danh sách tệp theo lô (mục 8 của hướng dẫn): DL01–DL09, OR01–OR45 trong `content/tuyen/`. Việc cụ thể: `docs/content/GUI-GPT/sua-sau-ra-soat.md`. Bối cảnh mỗi tuyến: `docs/content/GUI-GPT/2-thiet-ke-45-tuyen.md` và `docs/content/HUONG-DAN-GPT-VIET-TUYEN.md`.

| tệp | tên tuyến |
|---|---|
| DL01.json | Phi Thăng Lộ |
| DL02.json | Diệt Thế Ma Đồ |
| DL03.json | Đế Nghiệp |
| DL04.json | Phú Giáp Thiên Hạ |
| DL05.json | Huyết Cừu |
| DL06.json | Võ Lâm Chí Tôn |
| DL07.json | Thế Gia Vạn Đại |
| DL08.json | Y Giả Độ Thế |
| DL09.json | Tỉnh Mộng |
| OR01.json | Một bát cơm qua mùa lạnh |
| OR02.json | Những tên người dưới trận đồ |
| OR03.json | Con dao biết tên chủ |
| OR04.json | Bài thi viết bằng tro |
| OR05.json | Những người không có trong sổ |
| OR06.json | Chỗ ngồi không dành cho mình |
| OR07.json | Tên trên lưng tượng |
| OR08.json | Lửa trong lòng đất |
| OR09.json | Chuông gọi ai về |
| OR10.json | Người về sau lệnh chết |
| OR11.json | Một chữ tín có giá bao nhiêu |
| OR12.json | Những người dưới mặt nước |
| OR13.json | Phương thuốc giữ lại một người |
| OR14.json | Máu không chọn chủ |
| OR15.json | Vở diễn không hạ màn |
| OR16.json | Mắt lưới nhà ai |
| OR17.json | Tiếng vó trong tuyết |
| OR18.json | Mực trên bao thóc |
| OR19.json | Vết than trong phổi |
| OR20.json | Bậc cửa nghe tiếng khóc |
| OR21.json | Mảnh bia giữa đường |
| OR22.json | Tấm chiếu hai mặt |
| OR23.json | Nước trong ấm lạ |
| OR24.json | Chỗ trú dưới chân tượng |
| OR25.json | Nước ngoài trường khảo |
| OR26.json | Vị muối trên đòn gánh |
| OR27.json | Nét dao bị nhận nhầm |
| OR28.json | Tiền đò lúc tắt đèn |
| OR29.json | Quả cân bên giường |
| OR30.json | Thẻ tre sau bếp |
| OR31.json | Chữ dưới lớp vôi |
| OR32.json | Trang giấy giữ hay xóa |
| OR33.json | Khế bên kia đèo |
| OR34.json | Màu men sau cơn run |
| OR35.json | Ngày cuối trên thẻ công |
| OR36.json | Phong thư trở về |
| OR37.json | Dưới dấu tay người |
| OR38.json | Tay giữ chiếc nẹp |
| OR39.json | Bậc nhà không cửa |
| OR40.json | Bao đường mất cân |
| OR41.json | Tờ giấy không ghi người |
| OR42.json | Tiếng dưới sàn lò |
| OR43.json | Một bình nhiều dấu |
| OR44.json | Bạc nghe rỗng trong tay |
| OR45.json | Vạch nước trên bậc |
