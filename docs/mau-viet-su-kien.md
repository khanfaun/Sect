# MẪU VIẾT SỰ KIỆN – dán toàn bộ phần dưới vào GPT

---

Bạn là người viết truyện cho một game tu tiên chữ, tên "Phù Sinh". Hãy viết **sự kiện mới** cho game theo đúng thế giới, văn phong và khuôn mẫu dưới đây. Không được bịa thêm tính năng, chỉ số hay vật phẩm ngoài danh sách cho phép.

## 1. Thế giới

Người chơi là một tu sĩ đi từ thấp lên cao qua 5 vùng (mỗi vùng ứng với một cảnh giới):

| Số | Vùng | Không khí |
|---|---|---|
| 0 | **Phàm Trần** – biên thùy một nước phàm | thôn trấn, sơn tặc, tán tu nghèo, lão nhân, chuyện đời thường |
| 1 | **Linh Sơn Vạn Lĩnh** – đất của tông môn | sơn môn, đệ tử tranh đấu, bí cảnh, kiếm tu |
| 2 | **Đông Hải Yêu Vực** – vạn đảo, vạn yêu | biển, đảo, giao long, ngư nhân, hải tặc |
| 3 | **Cửu U Ma Vực** – nơi mặt trời không chiếu tới | ma tu, oán hồn, luyện thi, thành đen |
| 4 | **Cửu Thiên Cổ Lộ** – con đường cuối cùng | đường ngọc giữa hư không, di tích tiên nhân, thiên ma, kiếm linh |

Cảnh giới: Luyện Khí → Trúc Cơ → Kết Đan → Nguyên Anh → Hóa Thần → Độ Kiếp.
Nhân quả (thiện/ác), tâm ma, tu vi, linh thạch, thọ nguyên là những thứ người chơi quan tâm.

## 2. Văn phong (BẮT BUỘC)

- Gọi người chơi là **"ngươi"**. Kể ở ngôi thứ hai, thì hiện tại, câu ngắn.
- Giọng điềm, hơi lạnh, có chút bi. Tu tiên giới tàn nhẫn, nhưng vẫn có tình người.
- Mỗi đoạn 1–3 câu. Không giải thích dài, không sến, không hài nhảm, không từ hiện đại.
- Kết thúc mỗi kết quả bằng một chi tiết nhỏ đọng lại (ánh mắt, cơn gió, một câu nói).
- Lời thoại đặt trong ngoặc kép cong “…”.
- Không phải lựa chọn nào cũng có thưởng. Lựa chọn tốt thường có giá; lựa chọn ác thường được lợi trước mắt nhưng thêm tâm ma / nghiệp ác.

**Ví dụ thật trong game (hãy bắt chước giọng này):**

> Bên vệ đường, một lão nhân {$a.look} nằm co ro dưới gốc cây, hơi thở đứt quãng. Thấy ngươi, {$a.hn} gắng nhấc tay: “{$a.goi}… nước…”
>
> – Đỡ dậy, truyền chút linh lực → {$a.hn} nắm chặt tay ngươi, cười khà: “Không ngờ cuối đời còn gặp được người tốt.” {$a.hn} nhét vào tay ngươi một cuốn sách nhàu nát, rồi nhắm mắt. Gió thổi, mái tóc bạc khẽ lay.
> – Bước qua → Ngươi bước qua. Sau lưng có tiếng thở dài, rồi im bặt. Tu tiên giới mỗi ngày đều có người chết như vậy.

> Ngươi khép mắt người chết lại, đắp đất thành nấm. Không biết tên, ngươi khắc lên đá: “Người đi đường”.

## 3. Chữ thay thế (game tự điền vào)

| Viết | Game điền thành |
|---|---|
| `{$a.ten}` | tên nhân vật A (có thể dùng thêm B: `{$b.ten}`…) |
| `{$a.hn}` | cách gọi nhân vật đó khi kể: lão / bà / hắn / nàng / gã / vị tăng… |
| `{$a.xung}` | nhân vật tự xưng: lão phu / bần đạo / tiểu nhân / cháu… |
| `{$a.goi}` | nhân vật gọi ngươi: tiểu hữu / đạo hữu / khách quan / tiên sư… |
| `{$a.look}` | vài chữ tả ngoại hình |
| `{$sect}` | tên một tông môn ngẫu nhiên (`{$sectC}` chính phái, `{$sectM}` ma môn) |
| `{$pl}` | tên địa danh hiện tại |
| `{$canh}` | một câu tả cảnh nơi đang đứng (đặt đầu đoạn) |
| `{$en}` | (chỉ dùng cho sự kiện gặp đoàn người/nhân vật trên bản đồ) tên đoàn/người đó |
| `{$rv}` | tên một thiên kiêu đối thủ |

**Loại nhân vật A/B được phép:** lão nhân, nhà sư, đạo sĩ, ma tu, thương nhân, trẻ con, phàm nhân, tu sĩ trẻ, nữ, nam.

## 4. Nơi cần sự kiện (chọn 1 cho mỗi sự kiện)

**A. Thăm dò địa điểm** – ghi loại địa hình: thôn trấn, thành trì, rừng sâu, núi non, sông hồ, phế tích, hang động, sơn môn, biển khơi, hoang nguyên, ma địa, thiên lộ (hoặc "mọi nơi").
**B. Trên đường đi** (gặp giữa hai địa điểm).
**C. Gặp trên bản đồ:** thương đội · khách qua đường · thiên kiêu (đối thủ) · thú triều · truy sát (kẻ đang săn ngươi) · tuần tra tông môn · di tích.

Có thể thêm điều kiện: chỉ ban đêm/ban ngày, chỉ một mùa, chỉ vùng số mấy.

## 5. Loại lựa chọn

1. **Chắc chắn** – chọn là ra một kết quả.
2. **May rủi** – 2–4 kết quả, ghi độ thường gặp (hay gặp / thỉnh thoảng / hiếm).
3. **Thử thách** – kiểm tra một chỉ số: Thân pháp, Ngộ tính, Đạo tâm, Khí vận, Linh căn; ghi độ khó (dễ / vừa / khó). Viết cả kết quả **thành công** và **thất bại**.
4. **Đánh nhau** – chọn kẻ địch trong danh sách dưới, viết đoạn **sau khi thắng**.
5. Một lựa chọn có thể dẫn tới **lựa chọn tiếp theo** (tối đa 2 tầng).
6. Có thể ghi **giá phải trả** trước khi chọn: linh thạch / % linh lực / % khí huyết.
7. Có thể ghi **chỉ hiện khi**: có đan dược trong túi, nghiệp thiện cao, nghiệp ác cao…

**Kẻ địch có sẵn:** yêu thú ngẫu nhiên, sói, hổ, mãng xà, gấu, ưng, hồ ly, rùa, nhện độc, vượn, cá sấu, dơi, bọ cạp, cóc độc, giao long · sơn tặc, tán tu, ma tu, đệ tử tông môn, sát thủ, võ tăng, luyện thi nhân, kiếm tu, phù sư, ngư nhân · âm hồn, cương thi, khô lâu, họa bì, thủy quỷ, oán linh · khôi lỗi, thiên ma, kiếm linh, hư không trùng, tinh thú. (Có thể ghi "mạnh hơn thường", "2 con".)

## 6. Thưởng / phạt được phép (chỉ dùng những thứ này)

Khí huyết ±% · Linh lực ±% · Tu vi + (nhỏ 2–5, vừa 6–10) · Linh thạch ± (nhỏ 10–20, vừa 25–40, lớn 50+) · Tâm ma + (2–8) / − · Nhân quả thiện/ác (2–10) · Thời gian trôi (giờ/ngày) · Thọ nguyên ± · Chỉ số vĩnh viễn (Thân pháp, Ngộ tính, Đạo tâm, Khí vận +1–2; hiếm) · Nhận pháp bảo ngẫu nhiên · Nhận công pháp ngẫu nhiên · Nhận đan dược ngẫu nhiên hoặc đích danh (Hồi Xuân Đan, Tụ Khí Đan, Tinh Nguyên Đan, Giải Độc Đan, Định Thần Đan, Diên Thọ Đan, Phá Cảnh Đan…) · Mất một viên đan · Mở cửa hàng · Nghe tin đồn · **Kết ân** với nhân vật (sau này có thể báo đáp) · **Kết oán** với nhân vật (sau này có thể trả thù) · Thiện cảm/ác cảm với thiên kiêu · Cho nhân vật đi cùng vài ngày.

## 7. KHUÔN MẪU – mỗi sự kiện viết đúng như sau

```
### SỰ KIỆN: <Tên ngắn, 2–5 chữ>
Nơi: <A: rừng sâu, núi non | B: trên đường | C: thương đội …>
Vùng: <0,1,2 | mọi vùng>
Điều kiện thêm: <không | ban đêm | mùa đông | …>
Độ thường gặp: <hay | thường | hiếm>
Chỉ xảy ra một lần: <có/không>
Nhân vật: A = <loại>, B = <loại hoặc không>

Mở đầu (viết 2–3 phiên bản khác nhau, game chọn ngẫu nhiên):
- ...
- ...

Lựa chọn 1: <biểu tượng emoji> <nhãn ngắn>
  Giá: <không | 30% linh lực | 10 linh thạch>
  Chỉ hiện khi: <không | …>
  Kiểu: <chắc chắn | may rủi | thử thách Đạo tâm, vừa | đánh nhau: sơn tặc>
  → Kết quả (hoặc: Hay gặp / Hiếm / Thành công / Thất bại / Sau khi thắng):
     Văn: ...
     Thưởng/phạt: ...

Lựa chọn 2: ...
Lựa chọn 3 (thường là bỏ đi / không xen vào): ...
```

Mỗi sự kiện có 2–4 lựa chọn. Luôn có một lựa chọn "bỏ đi" an toàn.

## 8. Yêu cầu đợt này

Viết **<SỐ LƯỢNG>** sự kiện cho: **<NƠI + VÙNG>**.
Không trùng ý với các sự kiện đã có:
Lão nhân hấp hối · Thương đội gặp nạn · Kẻ bị truy sát · Linh thảo trên vách · Thi thể bên đường · Tranh đoạt bảo vật · Sạp hàng đồ cổ · Thú non lạc mẹ · Ngộ đạo dưới thác · Bia đá cổ · Ảo trận · Linh tuyền · Đổ thạch · Quán trọ đen · Trà lâu · Cáo thị truy nã · Thầy bói · Kẻ ăn mày lạ · Đứa trẻ bán hoa · Kiếm khách say · Tăng nhân hóa duyên · Thiếu nữ trong rừng · Cổ mộ · Động phủ tiền bối · Bí cảnh mở cửa · Sao rơi · Cây bị sét đánh · Cướp đường · Lò đan nổ · Hồn phiên vô chủ · Chiếc nhẫn cũ · Hồn trong nhẫn · Thư khẩn · Thợ săn đặt bẫy · Rừng thuốc cháy · Khách điếm · Cổ tự hoang · Tông môn tuyển đồ · Tông môn đại bỉ · Hội đấu giá · Lôi đài · Thôn bị yêu quấy · Bến đò đêm · Cô dâu mới · Cá chép vàng · Chuông dẫn xác · Con chó vàng · Hội hoa đăng · Thư nhà · Đứa trẻ xin bái sư · Họa sư · Người ngồi trong tuyết · Tranh nhau con gà · Ức hiếp tạp dịch · Dược viên · Tàng Kinh Các · Luận đạo · Kiếm trủng · Mạch linh thạch · Trận đồ cổ · Đạo lữ · Bị vu oan · Lò rèn pháp bảo · Ngư nhân đổi hàng · Khói trên đảo hoang · Hải thị thận lâu · Bão biển · Long cung chìm · Yêu tộc chặn đường · Trai ngàn năm · Thuyền ma · Hang băng · Quỷ thị · Huyết trì · Tù binh chính đạo · Hố vạn thi · Gương đồng · Hạt giống đen · Sông không bờ · Ma tu xin tha · Sông sao · Di thuế tiên nhân · Thiên đạo hỏi · Khe nứt hư không · Tiên khư · Giấc mơ kiếp trước · Gặp thiên kiêu · Nấm mộ quen · Nợ kiếp trước · Người cũ báo ân · Kẻ thù cũ · Tâm ma · Thương đội dừng chân · Thuê hộ tống · Tin từ phương xa · Đổi hàng · Món hàng lạ · Thương đội bị yêu thú vây · Hỏi đường · Đi chung một quãng · Người ốm bên đường · Kẻ cướp đường · Đồ đánh rơi · Đàm đạo · Thú triều ập tới · Thú vương dẫn đàn · Dân chạy loạn · Đặt bẫy trước thú triều · Đứa trẻ giữa đường · Theo dấu thú triều · Bị hỏi han · Luận võ với đệ tử tuần tra · Truy bắt · Đệ tử bị thương · Lời mời của sơn môn · Khám xét · Thiên kiêu uống rượu · Lời thách đấu · Thiên kiêu rủ đồng hành · Tranh bảo với thiên kiêu · Thiên kiêu bị vây · Mai phục · Kẻ truy sát lên tiếng · Rượu có độc · Cạm bẫy · Đấu tay đôi · Linh khí phun trào · Mảnh sao còn nóng · Đấu giá trong thành · Hồn ma tìm người · Đom đóm dẫn đường · Kẻ trộm đêm · Ngắm sao · Quán đêm · Lửa ma trơi · Trăng máu · Tiếng hát trên sông · Giấc mơ lạ · Bầy sói đêm · Lễ hội mùa xuân · Hoa nở linh thảo · Mưa rào mùa hạ · Hạn hán · Mùa gặt · Lá phong rụng · Bão tuyết · Đêm đông người rét · Người cũ báo ân
