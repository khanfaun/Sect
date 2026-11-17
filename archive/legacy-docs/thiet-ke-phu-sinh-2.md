# Phù Sinh 2 — Bản thiết kế thế giới mở

Nov 10, 2026 · @Khan

Tài liệu giao việc cho AI code: chuyển Phù Sinh từ kiểu "chọn lối rẽ" sang thế giới mở có bản đồ, sương mù, đồng hồ chạy thật, chiến đấu theo thanh hành động và đột phá có phẩm chất, làm xong trong 3 lần chỉnh sửa.

## 1. Đọc trước

Trục chính của game là **thế giới không chờ người chơi**: bản đồ tự chuyển động theo đồng hồ, và già đi qua các kiếp. Mọi quyết định thiết kế bên dưới phục vụ ý này.

Game tham chiếu, chỉ lấy ý, không sao chép:

| Nguồn | Lấy gì |
| --- | --- |
| Game cũ của chủ dự án (clip) | Bản đồ điểm, chạm điểm để xem thông tin, hành động tốn thời gian, Bến Vong Xuyên sau khi chết |
| Where Winds Meet | Mở dần từng vùng, sương mù che bản đồ, khám phá tự do |
| Clair Obscur: Expedition 33 | Nhấn đúng lúc để né, giữ để tụ lực |
| Naruto: Path of the Ninja (GBA) | Thanh hành động dọc có ảnh đại diện chạy trên đó |

Khác biệt so với game cũ: thực thể di chuyển trên bản đồ, ngày đêm và mùa, tin tức cũ dần, thế giới tiếp nối qua các kiếp thay vì quay về năm 1000. **Không làm** ô kinh mạch xếp hình, đấu với bạn bè, đặt hàng ở chợ.

Luật cứng cho AI code:

1. Một file HTML duy nhất, không thư viện ngoài, chạy được trên điện thoại rộng 360px.
2. Tách **lõi** (hàm thuần, không đụng DOM) khỏi **giao diện**. Lõi phải chạy được trong Node để kiểm thử.
3. Mọi thay đổi thời gian đi qua đúng một hàm `advanceTime(hours)`. Không cộng thẳng vào biến thời gian ở nơi khác.
4. Mọi trạng thái phải lưu được bằng `JSON.stringify`. Không lưu hàm, không lưu phần tử DOM.
5. Không viết lại kho truyện. Chỉ thêm trường mới vào dữ liệu cũ.
6. Giao diện giữ phong cách hiện có: nền vàng be, ít chữ, chú thích hiện khi rê chuột hoặc nhấn giữ.
7. Mỗi lần chỉnh sửa phải kết thúc bằng một bản chơi được từ đầu tới lúc chết.

## 2. Hiện trạng mã nguồn

File `phu-sinh.html` hiện có khoảng 280 KB, một thẻ `<script>` gồm sáu khối nối tiếp nhau. Giữ nguyên thứ tự này.

| Khối | Nội dung | Xử lý |
| --- | --- | --- |
| Kho chữ | `NAME`, `PLACE`, `P` (mảnh câu), `RUMOR` | Giữ. Thêm mảnh câu theo buổi và mùa |
| Dữ liệu | `EL`, `REALM`, `TAB`, `ORIGIN`, `TRAIT`, `SK_RAW`, `RELIC_K`, `PILL`, `EN`, `BOSS`, `REG`, `UPG`, `LORE` | Giữ. Thêm trường mới (mục 7, 8) |
| Lõi | `T()`, `npc()`, `genName()`, `placeName()`, `genWorld()`, `S()`, `applyE()`, `ev()`, `choose()`, `doOutcome()`, `mkEnemy()`, chiến đấu, `die()` | Giữ phần chữ, vật phẩm, sự kiện. Thay phần đường đi và chiến đấu |
| Sự kiện | Khoảng 90 lệnh `ev({...})` | Giữ. Gắn thêm nhãn nơi chốn và thời điểm |
| Giao diện | `render()`, các hàm `vXxx()`, `ACT`, chú thích, lưu | Giữ khung. Thêm màn bản đồ, màn địa điểm, màn chiến đấu mới |

Những hàm bị thay hoàn toàn: `genPaths`, `choosePath`, `nextNode`, `travelText`, `vPath`, `progress`, `advance`, toàn bộ nhóm `playerSkill / enemyTurn / doIntent / nextIntent`, `restAct`, `btChance`.

Những thứ dùng lại nguyên vẹn:

- Máy ghép câu `T(mẫu, biến)` với cú pháp `{tên_kho}`, `{$biến.trường}`, `[a|b]`.
- Cấu trúc sự kiện: `t` (mở đầu), `c` (lựa chọn), `o` (kết quả có trọng số), `chk/ok/no` (phép thử), `fight/win/lose`, `c` lồng nhau.
- Bộ hiệu ứng `applyE(e)` và thẻ kết quả (chip).
- Sinh pháp bảo `genRelic`, đan dược, công pháp, hạt giống ân oán `seeds`.
- Tin đồn và Thiên Kiêu Bảng.

Khóa lưu mới là `phusinh2_save_v1`. Không đọc bản lưu cũ.

## 3. Thời gian hai tầng

Đơn vị gốc là **giờ game**, lưu trong `world.t` (số thực, tính từ giờ 0 của năm 1000). Quy đổi: 1 ngày = 24 giờ, 1 tháng = 30 ngày = 720 giờ, 1 năm = 12 tháng = 8.640 giờ.

**Tầng chạy ngầm.** Khi người chơi đứng ở màn bản đồ và không mở bảng nào, 1 giây ngoài đời = 1 giờ game.

- Dùng `requestAnimationFrame`, đo `dt` bằng `performance.now()`, gộp lại và gọi `advanceTime(dt_giây × tốc_độ)` tối đa 4 lần mỗi giây.
- Kẹp `dt` tối đa 1 giây mỗi khung để tránh nhảy cóc khi quay lại tab.
- Dừng hẳn khi: `document.hidden`, đang đọc sự kiện, đang chiến đấu, đang mở bảng phụ, đang ở màn địa điểm, hoặc người chơi bấm tạm dừng.
- Tắt game thì thời gian không trôi.
- Nút điều khiển ở góc bản đồ: tạm dừng, ×1, ×12 (chờ nhanh), "chờ tới sáng", "chờ tới tối". Hai nút cuối gọi thẳng `advanceTime` tới mốc giờ kế tiếp.

**Tầng hành động.** Mỗi hành động gọi `advanceTime` một lần với số giờ cố định:

| Hành động | Thời gian |
| --- | --- |
| Đi theo một đoạn đường | `quãng_đường / tốc_độ_đi`, tốc độ theo cảnh giới: 8, 20, 60, 200, 800 dặm mỗi giờ |
| Thăm dò một địa điểm | 2 giờ |
| Mua bán, nghe tin ở trà lâu | 1 giờ |
| Nghỉ ở khách điếm | 8 giờ |
| Một trận chiến | 1 giờ |
| Tĩnh tọa | 6 giờ |
| Dưỡng thương nặng | 1 tháng |
| Bế quan ngắn | 3 tháng |
| Bế quan dài | 2 năm |
| Đột phá | 1 tháng |
| Vượt quan ải sang vùng khác | 1 đến 6 tháng tùy vùng |

Thọ nguyên giữ như cũ (60, 130, 300, 650, 1.500 năm). Việc nhỏ chỉ tốn giờ và ngày, nên thọ nguyên bị tiêu chủ yếu bởi bế quan và vượt vùng. Để áp lực còn nguyên: tu vi từ sự kiện và chiến đấu cộng lại không vượt 40% nhu cầu mỗi cảnh giới; phần còn lại phải bế quan.

**Hàm `advanceTime(h)`** làm đúng thứ tự sau:

1. Nếu `h ≤ 48`: cộng `world.t`, chạy `worldStep(h)` một lần.
2. Nếu `h > 48`: chia thành các bước 24 giờ cho 30 ngày đầu, phần còn lại chạy `worldCoarse(tháng)` theo từng tháng (mô phỏng thô, mục 5).
3. Cập nhật tuổi nhân vật: `run.age = run.birthAge + (world.t − run.bornT) / 8640`.
4. Kiểm tra hết thọ nguyên, hạn chót nhiệm vụ, Thiên Kiêu Bảng.
5. Trả về danh sách "chuyện xảy ra trong lúc đó" để giao diện hiện một dòng tóm tắt sau các bước nhảy dài.

Buổi trong ngày tính từ `world.t % 24`: sáng 5–11, chiều 11–17, tối 17–21, đêm 21–5. Mùa tính từ tháng: xuân 1–3, hạ 4–6, thu 7–9, đông 10–12.

Thanh trạng thái hiện ngày tháng dạng "Năm 1003, tháng Tám, giờ Dậu" kèm biểu tượng buổi.

## 4. Bản đồ, sương mù, mở vùng

**Cấu trúc.** Thế giới gồm 5 vùng xếp nối tiếp, dùng lại `REG` hiện có. Mỗi vùng là một hình chữ nhật 1000 × 1000 đơn vị bản đồ, 1 đơn vị = 1 dặm.

Sinh một vùng (làm một lần khi tạo thế giới, lưu lại):

1. Rải 14 đến 18 điểm bằng cách thử ngẫu nhiên, loại điểm cách điểm cũ dưới 110 đơn vị.
2. Loại điểm lấy từ `REG[r].types`. Bắt buộc có: 1 thành hoặc trấn lớn, 2 nơi có động phủ, 1 quan ải ở mép giáp vùng sau, 1 sào huyệt thủ lĩnh.
3. Đặt tên bằng `placeName(loại)`.
4. Nối đường: dựng cây khung nhỏ nhất theo khoảng cách để đảm bảo liên thông, rồi thêm cạnh tới 1–2 điểm gần nhất cho mỗi điểm. Lưu `edges = [{a, b, len}]`.
5. Gán mức nguy hiểm 0–3 tăng dần theo khoảng cách tới điểm xuất phát.

Người chơi **chỉ đi theo đường nối**. Chạm một điểm kề để đi thẳng; chạm điểm xa thì tìm đường ngắn nhất (BFS theo tổng `len`) và đi từng đoạn, có thể bị chặn giữa chừng.

**Sương mù ba lớp.** Mỗi điểm có `fog`:

| Giá trị | Tên | Hiển thị | Cách đạt |
| --- | --- | --- | --- |
| 0 | Chưa biết | Không vẽ gì, nền bị phủ sương | Mặc định |
| 1 | Nghe đồn | Viền đứt nét, tên kèm dấu hỏi, vị trí lệch ngẫu nhiên tới 40 đơn vị, mức nguy hiểm có 30% sai | Trà lâu, sự kiện, mua bản đồ, người dẫn đường |
| 2 | Đã thấy | Vẽ đúng vị trí, tên, loại, mức nguy hiểm | Nằm trong tầm thần thức |
| 3 | Đã tới | Thêm danh sách dịch vụ và ghi chú | Bước vào điểm |

Tầm thần thức theo cảnh giới: 120, 200, 320, 500, 800 đơn vị. Sau mỗi lần di chuyển, mọi điểm trong tầm được nâng lên ít nhất mức 2.

Tin cũ: mỗi điểm lưu `seenT` (lần cuối nằm trong tầm). Nếu `world.t − seenT` quá 1 năm, vẽ mờ đi và thêm nhãn "tin cũ"; trạng thái thật của điểm (bị phá, đổi chủ) chỉ cập nhật trên bản đồ khi nhìn thấy lại.

**Vẽ.** Dùng một thẻ SVG có `viewBox` theo vùng đang đứng, kéo để xem, hai nút phóng to thu nhỏ.

- Nền: giấy màu be, vài mảng núi và sông vẽ sẵn theo hạt giống của vùng.
- Sương: một lớp `<rect>` màu nền phủ kín, áp `<mask>` gồm các hình tròn trắng mờ viền tại những chỗ đã thấy. Lưu danh sách tâm tròn `reveal = [[x, y, r]]`, tối đa 300 phần tử; trước khi thêm, bỏ qua nếu đã có tâm cách dưới 30 đơn vị với bán kính không nhỏ hơn.
- Đường: chỉ vẽ cạnh mà cả hai đầu có `fog ≥ 2`.
- Điểm: biểu tượng theo loại, tên bên dưới. Người chơi là con dấu đỏ.
- Chạm điểm mở thẻ thông tin ở đáy màn hình: tên, loại, mức nguy hiểm, quãng đường, thời gian đi, nút "Đi tới".

**Mở vùng.** Quan ải là điểm duy nhất nối sang vùng sau. Qua được khi thỏa **một trong bốn** điều kiện:

1. Cảnh giới không thấp hơn chỉ số vùng sau.
2. Có vật phẩm "lệnh bài thông quan" của vùng đó (rơi từ thủ lĩnh, nhiệm vụ, đấu giá).
3. Có người dẫn đường: trả linh thạch, hoặc dùng một ân tình trong `seeds`.
4. Liều mạng: đánh một trận với kẻ gác có hệ số sức mạnh 1,6.

Đánh bại thủ lĩnh vùng không còn là điều kiện bắt buộc, nhưng thủ lĩnh rơi lệnh bài.

## 5. Thế giới sống

**Thực thể di chuyển.** Lưu trong `world.ents`, tối đa 12 thực thể mỗi vùng, chỉ mô phỏng vùng người chơi đang đứng.

```
ent = { id, type, name, icon, at: nodeId, to: nodeId|null, prog: 0..1,
        route: [nodeId...], speed: dặm/giờ, until: t_hết_hạn, data: {} }
```

| Loại | Hành vi | Khi gặp người chơi |
| --- | --- | --- |
| Thương đội | Đi giữa hai thành trấn, dừng 12 giờ mỗi nơi | Mua bán dọc đường, hoặc sự kiện "thương đội gặp nạn" |
| Thú triều | Sinh ở điểm nguy hiểm, tiến về thôn trấn gần nhất | Trận 1 đấu 2–3. Nếu tới nơi mà không ai chặn: điểm đó thành "hoang tàn" 6 tháng |
| Đệ tử tuần tra | Đi vòng quanh sơn môn | Hỏi han, luận võ, hoặc truy bắt nếu nhân quả âm |
| Thiên kiêu | Một trong 7 đối thủ, đi tới nơi có sự kiện lớn | Sự kiện "gặp thiên kiêu" |
| Kẻ truy sát | Sinh ra khi có hạt giống `oan` chín, bám theo người chơi | Sự kiện "kẻ thù cũ" |
| Dị tượng | Đứng yên tại một điểm, tồn tại 3–10 ngày (bí cảnh, sao rơi, đấu giá) | Sự kiện tương ứng, hết hạn thì mất |

`worldStep(h)` cho mỗi thực thể: cộng `prog += speed × h / len`; tới 1 thì chuyển sang điểm kế trong `route`; hết `route` hoặc quá `until` thì xóa. Mỗi 24 giờ game gọi `director()`: nếu số thực thể dưới 6 thì sinh thêm theo trọng số, tránh trùng loại quá 3.

Gặp nhau xảy ra khi: người chơi tới một điểm đang có thực thể, hoặc đi ngược chiều trên cùng một đoạn đường. Khi gặp, dừng di chuyển và mở sự kiện.

Chỉ vẽ thực thể nằm trong tầm thần thức. Thực thể ngoài tầm có thể được biết qua tin đồn, vẽ bằng dấu mờ tại vị trí lúc nghe tin, kèm "nghe được 3 ngày trước".

**Ngày đêm và mùa** tác động qua ba chỗ:

- Dịch vụ có giờ mở: chợ và phường thị 5–21; trà lâu 7–23; quỷ thị chỉ 21–5; khách điếm cả ngày.
- Sự kiện có bộ lọc `when` (mục 6). Ví dụ thủy quỷ chỉ ban đêm, hội hoa đăng chỉ mùa xuân.
- Hệ số nguy hiểm trên đường: ban đêm tỉ lệ bị chặn ×1,5; mùa đông tốc độ đi ×0,8.

**Hạn chót.** Nhiệm vụ treo thưởng và lời hẹn lưu trong `run.quests = [{id, text, node, due, reward, state}]`. `advanceTime` đánh dấu `fail` khi quá `due`. Mỗi lần thất hứa trừ nhân quả.

**Mô phỏng thô `worldCoarse(tháng)`** dùng cho bế quan và khoảng trống giữa hai kiếp. Không di chuyển thực thể. Mỗi tháng: xóa thực thể hết hạn; 8% đổi trạng thái một điểm (hoang tàn, hồi phục, đổi chủ); cập nhật tiến độ thiên kiêu như hàm `worldTick` hiện có; sinh tin đồn. Khi kết thúc, sinh lại thực thể cho vùng hiện tại.

## 6. Địa điểm và sự kiện

**Màn địa điểm** hiện khi người chơi bấm "Vào" tại điểm đang đứng. Gồm: tranh phong cảnh (hàm `banner` hiện có), một đoạn tả ngắn ghép từ `canh_<loại>` cộng mảnh câu theo buổi và mùa, và danh sách việc làm được.

| Loại điểm | Việc làm được |
| --- | --- |
| Thôn, trấn | Thăm dò, khách điếm, trà lâu, bảng treo thưởng |
| Thành | Như trấn, thêm phường thị và đấu giá khi có dị tượng |
| Sơn môn | Thăm dò, tuyển đồ, Tàng Kinh Các nếu là đệ tử |
| Rừng, núi, sông, biển, hoang nguyên | Thăm dò, tĩnh tọa |
| Hang động, nơi có động phủ | Thăm dò, tĩnh tọa, bế quan, đột phá |
| Phế tích, ma địa | Thăm dò (nguy hiểm cao, thưởng cao) |
| Quan ải | Vượt ải (mục 4) |
| Sào huyệt | Khiêu chiến thủ lĩnh |

**Thăm dò** là hành động chính để gặp chuyện: tốn 2 giờ, rút một sự kiện phù hợp. Mỗi điểm có `explore` đếm số lần đã thăm dò; lần thứ 4 trở đi trong cùng một tháng game chỉ trả về câu "không còn gì mới" để tránh cày.

**Sửa dữ liệu sự kiện.** Giữ nguyên mọi lệnh `ev({...})`, chỉ đổi và thêm trường:

| Trường | Ý nghĩa | Ghi chú |
| --- | --- | --- |
| `tg` | Loại điểm hợp lệ | Giữ nguyên, đã khớp với loại điểm |
| `r` | Vùng hợp lệ | Giữ nguyên |
| `src` | Nguồn kích hoạt: `'explore'`, `'road'`, `'ent:<loại>'`, `'auto'` | Mặc định `'explore'` |
| `when` | `{part: ['dem'], season: ['xuan']}` | Không có thì lúc nào cũng được |
| `e.age` | Thời gian tốn thêm | Đổi thành `e.h` tính bằng giờ. Quy đổi: giá trị cũ × 720, làm tròn |

Gán `src:'road'` cho các sự kiện xảy ra trên đường: cướp đường, thương đội gặp nạn, kẻ bị truy sát, thi thể bên đường, lão nhân hấp hối, yêu tộc chặn đường. Khi đi một đoạn đường, xác suất gặp là `8% + 6% × mức_nguy_hiểm`, ban đêm ×1,5.

Gán `src:'ent:...'` cho: gặp thiên kiêu, kẻ thù cũ, thương đội, thú triều, bí cảnh, sao rơi, đấu giá.

Sự kiện đặc biệt đang có (`spec:1`): mộ kiếp trước chuyển thành một **điểm thật trên bản đồ** (mục 9); nợ kiếp trước thành thực thể kẻ truy sát; tâm ma giữ là `'auto'`, kiểm tra sau mỗi `advanceTime`.

Nút chiến đấu ngẫu nhiên của bản cũ bỏ đi. Thay bằng: chặn đường trên đường đi, thực thể thú triều, và thăm dò ở điểm nguy hiểm.

**Trà lâu** trả về 1–2 tin: nâng 1 điểm lân cận từ mức 0 lên mức 1, và báo vị trí một thực thể ngoài tầm nhìn.

Bổ sung nội dung tối thiểu: 20 mảnh câu theo buổi, 16 theo mùa, 10 sự kiện mới chỉ có ban đêm, 8 sự kiện theo mùa, 6 sự kiện cho mỗi loại thực thể.

## 7. Chiến đấu

Chiến đấu chạy trên một **thanh hành động dọc**, kết hợp hai thao tác đúng lúc: nhấn để né và giữ để tụ lực. Hỗ trợ mọi đội hình từ 1 đến 3 người mỗi phe.

### 7.1 Chỉ số mới

Thêm ba chỉ số vào hàm `S()`; kẻ địch cũng có đủ ba chỉ số này.

| Chỉ số | Trường | Gốc | Dùng cho |
| --- | --- | --- | --- |
| Chính xác | `cx` | 10, +2 mỗi cảnh giới | Đánh trúng |
| Né | `ne` | bằng thân pháp `tp` + thưởng từ pháp bảo | Né đòn |
| Hồi phục | `hoi` | 10, +2 mỗi cảnh giới | Tốc độ trên nửa sau của thanh |

Thân pháp `tp` giữ nguyên, quyết định tốc độ trên nửa đầu của thanh.

### 7.2 Thanh hành động

Thanh dài 100 đơn vị, vẽ dọc ở mép trái màn hình, ảnh đại diện của từng đơn vị chạy từ dưới lên. Phe ta bên trái thanh, phe địch bên phải.

| Mốc | Vị trí | Ý nghĩa |
| --- | --- | --- |
| Khởi đầu | 0 (đáy) | Nơi bắt đầu mỗi vòng |
| Hành động | 50 (giữa) | Ai chạm trước thì được ra lệnh |
| Tụ lực | 75 | Chỗ đứng chờ của người đang tụ lực |
| Kết thúc | 100 (đỉnh) | Chạm tới thì quay ngay về 0 |

Mỗi đơn vị có `pos` và `phase` thuộc một trong năm trạng thái:

| `phase` | Vị trí | Tốc độ | Chuyển sang |
| --- | --- | --- | --- |
| `run` | 0 → 50 | theo `tp` | `ready` khi `pos ≥ 50` |
| `ready` | đứng ở 50 | 0 | `recover` sau khi ra chiêu thường; `charge` nếu chọn chiêu tụ lực |
| `charge` | nhảy tới 75, đứng yên | 0 | `recover` (từ 75) sau khi tung chiêu đã tụ, hoặc khi bị phá |
| `recover` | 50 hoặc 75 → 100 | theo `hoi` | `run` tại `pos = 0` khi chạm 100 |
| `down` | giữ nguyên | 0 | không (đã gục) |

Công thức tốc độ, đơn vị là điểm thanh mỗi giây thời gian trận:

```
vRun     = 14 × clamp(tp  / tpTB,  0.6, 1.8)
vRecover = 18 × clamp(hoi / hoiTB, 0.6, 1.8) / skill.rec
```

`tpTB`, `hoiTB` là trung bình của mọi đơn vị còn sống, tính một lần lúc vào trận. `skill.rec` là độ nặng của chiêu vừa dùng: 0,7 (nhẹ) đến 1,4 (nặng), mặc định 1. Choáng: `phase` giữ nguyên nhưng tốc độ bằng 0 trong 2 giây thời gian trận.

### 7.3 Vòng lặp trận

Trạng thái trận có cờ `hold`. Khi `hold` bật, **không đơn vị nào di chuyển**.

```
combatStep(dt):
  nếu hold: return
  với mỗi đơn vị còn sống: cộng pos theo phase
  gom các đơn vị vừa đạt pos ≥ 50 trong phase run
  nếu có: sắp theo (pos vượt nhiều hơn, tp cao hơn, phe ta trước, id nhỏ hơn)
          cho đơn vị đầu vào ready, kẹp pos = 50, bật hold
          các đơn vị còn lại kẹp pos = 49.9 (sẽ tới lượt ở bước sau)
  đơn vị nào đạt pos ≥ 100: pos = 0, phase = run
```

Giao diện gọi `combatStep(dt)` mỗi khung hình với `dt` kẹp tối đa 0,05 giây. Chỉ **một** đơn vị ở `ready` tại một thời điểm.

- Đơn vị `ready` do người chơi điều khiển: hiện bảng chiêu, chờ chọn chiêu và mục tiêu. Không giới hạn thời gian.
- Đơn vị `ready` do máy điều khiển: hiện ý định 0,4 giây rồi tự ra chiêu.
- Ra chiêu xong, áp dụng kết quả, kiểm tra thắng thua, tắt `hold`.

### 7.4 Tụ lực

Chiêu có `fx.charge: true` không ra ngay. Quy trình:

1. Tại mốc hành động, chọn chiêu và mục tiêu. Trừ linh lực ngay.
2. Đơn vị nhảy tới `pos = 75`, `phase = charge`. Ghi `waitSet` = danh sách id mọi kẻ địch còn sống lúc đó.
3. Mỗi khi một kẻ địch **hoàn thành một hành động** thì gỡ id của nó khỏi `waitSet` của mọi người đang tụ lực phe kia. Các trường hợp sau cũng tính là hoàn thành: gục, bị choáng đúng lúc tới mốc 50, hoặc **chính nó bước vào tụ lực**.
4. Khi `waitSet` rỗng: bật `hold`, tung chiêu đã tụ, rồi `phase = recover` từ 75.
5. Chốt chặn chống treo: nếu đã đứng ở 75 quá 12 giây thời gian trận thì tung chiêu luôn.

Quy tắc ở bước 3 về "bước vào tụ lực cũng tính là đã hành động" là bắt buộc. Thiếu nó, hai người tụ lực ở hai phe sẽ chờ nhau mãi.

Phá tụ lực: nếu người đang tụ lực nhận một đòn mất từ 15% khí huyết tối đa trở lên, hoặc bị choáng, chiêu bị hủy, linh lực không hoàn lại, chuyển sang `recover`. Chiêu có `fx.steady: true` không bị phá.

Mục tiêu đã chọn mà gục trước khi tung chiêu: chuyển sang kẻ địch còn sống có khí huyết thấp nhất; không còn ai thì hủy.

Người chơi tung chiêu tụ lực: hiện một thanh ngang có vạch chạy qua lại trong 1,2 giây, chạm màn hình để chốt. Hệ số uy lực: vùng vàng (rộng 14%) ×1,3; vùng xanh (rộng 40%) ×1,1; ngoài vùng ×0,9; không chạm ×1,0. Máy luôn ×1,0.

Đánh dấu `charge: true` cho các chiêu bậc 3 và 4 có sát thương lớn trong `SK_RAW` (ví dụ Cửu Tiêu Thần Lôi, Thiên Hà Đảo Quyển, Bàn Cổ Khai Thiên Ấn, Thiên Phạt Lôi Kiếp, Phần Thiên Diệt Thế), tăng `p` của chúng thêm 35% để bù lượt bị bỏ. Đòn "trọng kích" của kẻ địch chuyển sang dùng đúng cơ chế này, thay cho cặp `charge/heavy` cũ.

### 7.5 Nhấn để né

Áp dụng khi **nhân vật của người chơi** bị nhắm bởi một đòn có sát thương.

1. Hiện vòng tròn co dần quanh nhân vật trong `T = 0,8` giây (đòn tụ lực của địch: 1,1 giây). Thời điểm chạm là lúc vòng khít.
2. Người chơi chạm nút "Né" tối đa một lần. Đo độ lệch `d` so với thời điểm chạm.
3. Tính xác suất gốc từ chỉ số, rồi cộng thưởng theo độ chính xác của thao tác, rồi gieo số.

```
base = clamp(0.25 + (ne_B − cx_A) × 0.02, 0.05, 0.70)

không nhấn hoặc lệch > 0.25s : p = base × 0.4
lệch ≤ 0.25s (khá)           : p = base + 0.20
lệch ≤ 0.09s (chuẩn)         : p = base + 0.45
p = clamp(p, 0.02, 0.95);  né thành công nếu random() < p
```

Như vậy chỉ số né của bên đỡ và chính xác của bên đánh luôn quyết định nền, còn tay người chơi chỉ nâng cơ hội chứ không thay được chỉ số.

- Né thành công: không mất máu. Né ở mức "chuẩn": cộng thêm 8 điểm `pos` ở vòng chạy kế tiếp.
- Đòn nhiều nhát: tối đa 3 lần nhấn cho 3 nhát đầu; các nhát sau dùng lại kết quả nhát thứ ba.
- Đòn đánh cả đội: một lần nhấn cho nhân vật người chơi; đồng đội tính thụ động.
- Đồng đội và kẻ địch né thụ động: `p = base × 0.5`.
- Tùy chọn "tự né" trong bảng tùy chọn: luôn tính như mức "khá" trừ 0,10. Dành cho người không muốn thao tác.

Bỏ tỉ lệ né cố định theo thân pháp của bản cũ. Hộ thể, phản đòn, các trạng thái (độc, thiêu, suy nhược, phá giáp, cuồng nộ, hồi xuân) giữ nguyên công thức; chỉ đổi "mỗi lượt" thành "mỗi lần đơn vị đó chạm mốc 0".

### 7.6 Tổ đội

Trạng thái trận: `{ A: [đơn vị], B: [đơn vị], hold, log, t }`, mỗi phe 1–3 đơn vị. Các đội hình 1v1, 1v2, 1v3, 2v2, 2v3, 3v3 và chiều ngược lại đều chỉ là trường hợp riêng; **không viết nhánh riêng cho từng đội hình**.

```
unit = { id, side:'A'|'B', ctrl:'player'|'ai', name, icon, el,
         hp, max, mp, maxMp, atk, def, tp, cx, ne, hoi,
         skills:[...], st:{...}, pos, phase, pending:{skill,target}|null, waitSet:[] }
```

- Phe ta: nhân vật chính (`ctrl:'player'`) và tối đa 2 đồng đội (`ctrl:'ai'`). Nguồn đồng đội: đạo lữ, linh thú, người dẫn đường, người báo ân đi cùng 30 ngày. Lưu trong `run.party`.
- Chọn mục tiêu: chiêu đơn mục tiêu thì chạm vào kẻ địch; nếu phe kia chỉ còn một thì tự chọn. Chiêu có `fx.aoe: true` đánh cả phe với 60% uy lực. Chiêu hồi máu và hộ thể chọn phe mình.
- Máy chọn mục tiêu: 60% nhắm đơn vị khí huyết thấp nhất, 40% ngẫu nhiên.
- Thắng khi mọi đơn vị phe B gục. Thua khi **nhân vật chính** gục, dù đồng đội còn sống. Luận võ (`spar`) giữ nguyên: thua không chết.
- Sức mạnh phe địch: tổng ngân sách = sức một kẻ địch chuẩn × 1,0 / 1,6 / 2,1 cho 1 / 2 / 3 kẻ, chia đều. Không nhân thẳng theo số lượng.
- Bỏ chạy: chỉ nhân vật chính ra lệnh, cả đội cùng rút.

### 7.7 Bố cục màn hình

Thanh hành động dọc bên trái, rộng 44px, cao bằng vùng chiến đấu. Bên phải từ trên xuống: hàng kẻ địch (mỗi kẻ một ô tròn, tên, thanh máu, trạng thái), nhật ký 3 dòng, hàng phe ta, bảng chiêu. Vòng né hiện đè lên ô nhân vật chính, nút "Né" lớn ở đáy màn hình, cao tối thiểu 64px.

## 8. Đột phá, phẩm chất, thiên kiếp

Đột phá gồm ba bước nối tiếp: chuẩn bị, xung quan, thiên kiếp (nếu cảnh giới đó có). Chỉ làm được ở điểm có động phủ khi tu vi đạt 100%.

### 8.1 Chuẩn bị

Màn chuẩn bị có 3 ô trống. Người chơi chọn tối đa 3 vật phẩm từ túi; mỗi vật phẩm chỉ đặt một lần và bị tiêu hao khi bấm "Bắt đầu", dù thành hay bại. Màn này hiện tỉ lệ thành công và phẩm chất dự kiến, cập nhật ngay khi đổi vật phẩm.

Thêm trường `bt` vào dữ liệu vật phẩm dùng được ở đây (trang bị và pháp bảo **không** được chọn):

| Nhóm | Ví dụ | `bt` |
| --- | --- | --- |
| Tăng tỉ lệ | Trúc Cơ Đan, Ngưng Kim Đan, Phá Cảnh Đan | `{rate: +15..30}` |
| Hộ mệnh | Hộ Mạch Đan, Bồ Đề Tử | `{guard: 1}`: thất bại không mất tu vi, không trọng thương |
| Trợ kiếp | Tị Lôi Phù, Dưỡng Nguyên Đan | `{kiepHp: +20%}` hoặc `{kiepCut: 1}` (bớt một đạo lôi) |
| Phẩm chất | Thiên Đạo Quả, Địa Mạch Linh Nhũ, Nhân Hoàng Thảo | `{dao: +2..4}` |

### 8.2 Xung quan

```
tỉ lệ = nền[cảnh giới] + (ngộ tính − 10) × 1.2% + (đạo tâm − 10) × 1.2%
        − tâm ma × 0.4% + số lần thất bại ở cảnh giới này × 8% + tổng bt.rate
kẹp trong 5% .. 97%
nền = 62%, 52%, 46%, 40%
```

Thất bại: mất 40% khí huyết, mất 25 điểm tu vi, tâm ma +10; có vật phẩm hộ mệnh thì chỉ tâm ma +5. Thành công mà cảnh giới không có thiên kiếp thì sang bước 8.4.

### 8.3 Thiên kiếp

| Đột phá lên | Thiên kiếp | Số đạo |
| --- | --- | --- |
| Trúc Cơ | Không có | 0 |
| Kết Đan | Tâm ma kiếp: đánh 1v1 với Tâm Ma bằng hệ chiến đấu thường | – |
| Nguyên Anh | Lôi kiếp | 6 |
| Hóa Thần | Lôi kiếp, xong thì tâm ma kiếp | 9 |
| Phi thăng (thay thủ lĩnh cuối) | Cửu Trùng Lôi Kiếp | 9 đạo × 3 đợt, giữa các đợt hồi 30% |

**Lôi kiếp dùng lại màn chiến đấu và thanh hành động**, với các luật riêng. Kiếp vân là một đơn vị phe B **không có khí huyết, không bị nhắm làm chết, không bị choáng**.

- Kiếp vân chạy trên thanh như mọi đơn vị, tốc độ cố định bằng 1,1 lần tốc độ của người chơi. Mỗi lần chạm mốc 50, nó giáng một đạo lôi rồi về 0.
- Sát thương đạo thứ `i`: `khí_huyết_tối_đa × (0.14 + 0.03 × i) × kiepUy`, với `kiepUy` khởi đầu 1,0.
- Lôi **không né được**. Vòng tròn co vẫn hiện, nhưng nút đổi thành "Đỡ": lệch ≤ 0,09 giây giảm 50%; lệch ≤ 0,25 giây giảm 25%; còn lại không giảm. Hộ thể vẫn chặn như thường.
- Giữa các đạo lôi, người chơi tới mốc hành động thì chọn: hồi máu, dựng hộ thể, dùng đan, hoặc **đánh ngược lên trời**. Mỗi chiêu tấn công nhắm vào kiếp vân giảm `kiepUy` đi `min(0.25, sát_thương / khí_huyết_tối_đa × 0.5)` cho đúng đạo kế tiếp, sau đó `kiepUy` về lại 1,0. Chiêu tụ lực vẫn dùng được; `waitSet` rỗng khi kiếp vân giáng xong một đạo.
- Qua kiếp khi đã chịu đủ số đạo mà còn sống. Không có bỏ chạy.
- Gục giữa kiếp: chết thật, trừ khi có vật phẩm hộ mệnh. Khi đó sống với 1 khí huyết và đột phá tính là thất bại.
- Đồng đội không tham gia thiên kiếp.

Ghi lại `kiepHpLeft` = phần trăm khí huyết còn lại khi qua kiếp, dùng cho phẩm chất.

### 8.4 Phẩm chất cảnh giới

Trong lúc ở một cảnh giới, nhân vật tích **điểm đạo cơ** `run.dao`. Điểm về 0 sau mỗi lần đột phá thành công.

| Nguồn | Điểm | Giới hạn mỗi cảnh giới |
| --- | --- | --- |
| Học một công pháp có nhãn `dao` (đánh dấu khoảng 8 chiêu hiếm) | +3 | 2 lần |
| Dùng đan dược hoặc linh dược có `dao` | +1 đến +2 | 4 điểm |
| Kết quả của một số kỳ ngộ (hiệu ứng mới `e.dao`) | +1 đến +3 | không |
| Vật phẩm phẩm chất đặt vào ô chuẩn bị | +2 đến +4 | 3 ô |
| Qua thiên kiếp với `kiepHpLeft ≥ 50%` | +2 | 1 lần |
| Mỗi lần xung quan thất bại ở cảnh giới này | −2 | không |

Khi đột phá thành công, xếp hạng theo tổng điểm:

| Tổng điểm | Phẩm chất | Tên hiển thị, ví dụ Trúc Cơ | Hệ số chỉ số | Thọ nguyên |
| --- | --- | --- | --- | --- |
| 0–2 | Phàm | Trúc Cơ | ×1,00 | +0% |
| 3–5 | Nhân đạo | Nhân Đạo Trúc Cơ | ×1,06 | +5% |
| 6–9 | Địa đạo | Địa Đạo Trúc Cơ | ×1,13 | +10% |
| từ 10 | Thiên đạo | Thiên Đạo Trúc Cơ | ×1,22 | +20% |

Lưu `run.quality[cảnh giới] = 0..3`. Hệ số nhân dồn qua các cảnh giới, áp cho khí huyết, linh lực, công, thủ trong `S()`. Trường `danQ` (phẩm kim đan) của bản cũ bỏ đi, thay bằng bảng này. Tên phẩm chất hiện ở thanh trạng thái, tiểu sử lúc chết và Thiên Kiêu Bảng.

Bảng nhân vật có dòng "Đạo cơ" hiện điểm hiện tại và mốc kế tiếp, để người chơi biết mình đang hướng tới phẩm chất nào trước khi đột phá.

## 9. Nối các kiếp

Thế giới **không quay về năm 1000**. `world` nằm trong `meta`, tồn tại qua mọi kiếp; chỉ `run` bị xóa khi chết.

Khi chết, làm theo thứ tự:

1. Ghi tiểu sử như hàm `die()` hiện có.
2. Đặt một **ngôi mộ** tại điểm đang đứng: `node.grave = {ten, tuoi, realmName, t, items: [tối đa 2 pháp bảo ngẫu nhiên]}`. Chết trên đường thì đặt ở điểm vừa rời.
3. Hạ sương mù: mọi điểm `fog 3` hoặc `2` thành `fog 1` kèm cờ `memory: true`. Điểm ký ức vẽ như "nghe đồn" nhưng **đúng vị trí và đúng tên**. Xóa danh sách `reveal`.
4. Chuyển `run.seeds` còn lại vào `world.legacy` kèm tên nhân vật đã chết.
5. Gieo số năm trôi qua: ngẫu nhiên 3 đến 30 năm. Gọi `worldCoarse(số_tháng)`.
6. Xử lý thế hệ:
   - Thiên kiêu còn sống: cộng tuổi và tiến độ. Ai vượt 60 tuổi mà chưa Trúc Cơ thì qua đời. Thay người đã mất bằng người mới, 30% là hậu duệ hoặc đệ tử của người cũ (ghi quan hệ để dùng trong câu chữ).
   - Mỗi mục `an` trong `world.legacy`: 50% người đó nay là trưởng lão hoặc chưởng quỹ tại một điểm cụ thể; lưu `node.patron`.
   - Mỗi mục `oan`: 50% thành "kẻ thù truyền kiếp", sinh thực thể truy sát ở kiếp sau khi người chơi vào đúng vùng.
   - Kẻ đã giết người chơi (nếu không phải thủ lĩnh) được lưu `world.nemesis`, mạnh lên một bậc.
7. Mở Bến Vong Xuyên (màn nâng cấp `UPG` hiện có), rồi chọn mệnh cách cho kiếp mới.

Kiếp mới sinh tại một thôn trấn ngẫu nhiên của vùng 1, không trùng nơi sinh kiếp trước.

Tương tác với dấu vết cũ:

- Vào điểm có `grave`: thêm việc "Viếng mộ", dùng sự kiện "nấm mộ quen" hiện có; đào lên thì nhận đúng `grave.items`.
- **Chôn đồ**: ở bất kỳ điểm hoang dã nào, người chơi chôn được tối đa 3 vật phẩm vào `node.cache`. Kiếp sau tới đúng điểm đó, thăm dò sẽ tìm thấy. Mỗi điểm một hố, cả thế giới tối đa 5 hố.
- Vào điểm có `patron`: thêm việc "Tìm cố nhân", dùng sự kiện "người cũ báo ân" với lời thoại nhắc tên kiếp trước.
- Tin đồn có thêm mẫu nhắc tới nhân vật các kiếp trước nếu người đó từng lên Thiên Kiêu Bảng hoặc hạ thủ lĩnh.

Giới hạn để dữ liệu không phình: tối đa 12 mộ (xóa mộ cũ nhất), `world.legacy` tối đa 20 mục, biên niên thế giới `world.chron` tối đa 60 dòng.

## 10. Dữ liệu và lưu

Trạng thái gốc là một đối tượng `G`:

```
G = {
  meta: { v, pts, upg, lives[], lore[], ach[], kills,
          world: { seed, t, quoc, sects[], rivals[],
                   regions: [ { nodes[], edges[] } × 5 ],
                   ents[], legacy[], nemesis, chron[] } },
  run:  { ...các trường nhân vật hiện có,
          bornT, birthAge, at: nodeId, region,
          moving: { path:[nodeId], seg, prog } | null,
          party[], quests[], dao, quality[5], reveal[], speed,
          scene: null | { type: 'event'|'combat'|'place'|'prep'|... } },
  screen: 'title'|'birth'|'map'|'over'|'meta'|'codex'
}

node = { id, r, x, y, type, name, danger, fog, seenT, memory,
         state: 'ok'|'ruin', stateUntil, explore, exploreT,
         grave, cache, patron }
```

Quy ước:

- `run.scene` khác `null` nghĩa là đang có màn đè lên bản đồ; đồng hồ chạy ngầm dừng.
- Trận đấu đang diễn ra **có lưu** (`pos`, `phase`, `waitSet` đều là số và mảng). Khi tải lại giữa lúc đang hiện vòng né, coi như chưa nhấn.
- Lưu vào `localStorage` sau mỗi hành động và mỗi 30 giờ game khi đứng yên. Phần ghi lên máy chủ (`db`) giữ cơ chế hiện có, gộp 1,5 giây một lần.
- Trường `v` là số phiên bản. Mỗi lần chỉnh sửa tăng `v` và viết hàm `migrate(d)` điền giá trị mặc định cho trường mới. Không được làm hỏng bản lưu của lần chỉnh sửa trước.
- Kích thước bản lưu giữ dưới 300 KB: nhật ký 240 dòng, tin đồn 40 dòng, `reveal` 300 mục, thực thể 12 mỗi vùng.

Sinh thế giới dùng bộ sinh số có hạt giống (`mulberry32` đã có trong phần giao diện, chuyển xuống lõi) để cùng `seed` cho cùng bản đồ. Mọi thứ ngẫu nhiên khác vẫn dùng `Math.random`.

## 11. Lộ trình 3 lần chỉnh sửa

Mỗi lần là một bản chơi được trọn vẹn. Không bắt đầu lần sau khi lần trước chưa qua hết tiêu chí nghiệm thu.

### Lần 1: bản đồ, sương mù, đồng hồ

Phạm vi: mục 3, 4, 6 và phần lưu ở mục 10. Chiến đấu và đột phá **giữ nguyên bản cũ** (1 đấu 1 theo lượt), chỉ đổi lời gọi thời gian.

1. Thêm `world.t`, `advanceTime`, quy đổi ngày tháng, vòng lặp chạy ngầm và các nút tốc độ.
2. Sinh 5 vùng với điểm và đường; lưu vào `meta.world.regions`.
3. Màn bản đồ SVG: nền, sương, đường, điểm, con dấu người chơi, thẻ thông tin, kéo và phóng.
4. Di chuyển theo đường, tìm đường ngắn nhất, cập nhật sương mù và tầm thần thức.
5. Màn địa điểm với danh sách việc theo loại; nối thăm dò, khách điếm, trà lâu, phường thị, động phủ vào các hàm sẵn có.
6. Gắn `src`, `when`, đổi `e.age` thành `e.h` cho toàn bộ sự kiện; sự kiện trên đường.
7. Quan ải với bốn cách vượt; sào huyệt thủ lĩnh là một điểm.
8. Xóa các hàm đường đi cũ liệt kê ở mục 2.

Nghiệm thu:

- [ ] Đứng yên 60 giây ở bản đồ thì đồng hồ tăng 60 giờ (sai số 2 giờ); mở bảng phụ thì dừng.
- [ ] Rời tab 5 phút rồi quay lại: đồng hồ không nhảy quá 1 giờ.
- [ ] Từ điểm xuất phát đi tới được mọi điểm trong vùng; không có điểm cô lập.
- [ ] Điểm chưa biết không lộ tên trong mã HTML được vẽ ra.
- [ ] Người chơi máy (mục 12) chạy 200 kiếp không lỗi, có kiếp qua được vùng 2.
- [ ] Tải lại trang giữa lúc đang đi đường: tiếp tục đúng vị trí.

### Lần 2: chiến đấu mới và đột phá

Phạm vi: mục 7 và 8.

1. Thêm `cx`, `ne`, `hoi` vào `S()` và vào `mkEnemy`.
2. Viết `combatStep`, các `phase`, cờ `hold`, luật tụ lực với `waitSet` và chốt 12 giây. Viết ở lõi, không đụng DOM.
3. Đội hình N đấu M, chọn mục tiêu, chiêu đánh cả đội, máy điều khiển đồng đội.
4. Giao diện: thanh dọc, vòng né, thanh tụ lực, tùy chọn tự né.
5. Đổi cách kết thúc trạng thái từ "mỗi lượt" sang "mỗi lần về mốc 0".
6. Màn chuẩn bị đột phá, công thức xung quan, tâm ma kiếp, lôi kiếp với kiếp vân.
7. Điểm đạo cơ, bảng phẩm chất, hệ số trong `S()`, tên hiển thị.
8. Thêm vật phẩm có `bt`, khoảng 8 công pháp có `dao`, hiệu ứng `e.dao` cho khoảng 12 kết quả sự kiện.

Nghiệm thu:

- [ ] Mô phỏng 9 đội hình (1–3 đấu 1–3), mỗi đội hình 300 trận máy đấu máy: không trận nào quá 180 giây thời gian trận, không trận nào kẹt ở `hold`.
- [ ] Hai phe cùng tụ lực một lúc: cả hai đều tung được chiêu.
- [ ] Mục tiêu gục trước khi chiêu tụ lực tung ra: chiêu đổi mục tiêu hoặc hủy, không lỗi.
- [ ] Với `ne − cx = 0`: không nhấn né được khoảng 10%, nhấn chuẩn khoảng 70% (đo trên 2.000 lần gieo).
- [ ] Lôi kiếp 6 đạo: nhân vật đủ máu, không làm gì, vẫn chết ở đạo 4 hoặc 5; đỡ chuẩn mọi đạo thì sống.
- [ ] Đạt 10 điểm đạo cơ rồi đột phá Trúc Cơ: tên hiện "Thiên Đạo Trúc Cơ", chỉ số tăng 22%.
- [ ] Bản lưu của lần 1 tải được ở lần 2.

### Lần 3: thế giới sống và nối các kiếp

Phạm vi: mục 5 và 9, cộng cân bằng.

1. `world.ents`, `worldStep`, `director`, sáu loại thực thể, vẽ thực thể trong tầm nhìn.
2. Gặp nhau tại điểm và trên đường; nối sang sự kiện `src:'ent:...'`.
3. Giờ mở dịch vụ, bộ lọc `when`, hệ số ban đêm và mùa đông; mảnh câu theo buổi và mùa.
4. Nhiệm vụ có hạn chót, bảng treo thưởng.
5. Tin cũ và trạng thái điểm (hoang tàn, hồi phục).
6. `worldCoarse`, toàn bộ quy trình khi chết ở mục 9, mộ, chôn đồ, cố nhân, kẻ thù truyền kiếp.
7. Đồng đội tạm thời từ sự kiện vào `run.party`.
8. Cân bằng: tỉ lệ thắng của người chơi máy, lượng tu vi từ việc nhỏ không quá 40%.

Nghiệm thu:

- [ ] Đứng yên 10 phút: thấy ít nhất một thực thể đi qua trong tầm nhìn.
- [ ] Thú triều tới thôn mà không bị chặn: thôn thành hoang tàn, mất dịch vụ 6 tháng.
- [ ] Quỷ thị chỉ vào được từ 21 giờ tới 5 giờ.
- [ ] Chết rồi đầu thai: năm thế giới lớn hơn năm chết; mộ nằm đúng điểm; điểm đã tới ở kiếp trước hiện dạng ký ức.
- [ ] Chôn một vật phẩm, chết, kiếp sau tới đào: nhận lại đúng vật đó.
- [ ] Người chơi máy 300 kiếp liên tiếp trên cùng một thế giới: không lỗi, bản lưu dưới 300 KB.

### Thứ có thể cắt nếu thiếu thời gian

Theo thứ tự cắt trước: đồng đội tạm thời, mùa, chôn đồ, mẫu tin đồn về kiếp trước. **Không cắt**: `waitSet` và chốt 12 giây, `advanceTime` duy nhất, `migrate`, sương mù.

## 12. Lỗi dễ mắc và kiểm thử

**Người chơi máy.** Viết một tệp `bot.js` chạy bằng Node: nạp toàn bộ khối lõi và dữ liệu (không nạp giao diện), rồi tự chơi bằng cách gọi thẳng hàm lõi. Sau mỗi bước, quét mọi chuỗi vừa sinh ra; báo lỗi nếu gặp `{`, `}`, `[`, `]`, `undefined`, `NaN`, `null`. Thống kê nguyên nhân chết, vùng xa nhất, cảnh giới cao nhất. Đây là cách bản hiện tại đã được kiểm, và là điều kiện nghiệm thu ở mục 11.

Với chiến đấu, người chơi máy gọi `combatStep(0.05)` trong vòng lặp, tự chọn chiêu khi có đơn vị `ready`, và coi mọi lần né là "không nhấn".

**Bảng lỗi dễ mắc:**

| Chỗ | Lỗi | Cách tránh |
| --- | --- | --- |
| Đồng hồ | Cộng thời gian ở nhiều nơi, tuổi lệch với năm | Chỉ `advanceTime`; tuổi luôn tính lại từ `world.t` |
| Đồng hồ | Quay lại tab, thời gian nhảy hàng giờ | Kẹp `dt` 1 giây, dừng khi `document.hidden` |
| Đồng hồ | Bước nhảy 2 năm chạy 17.000 vòng lặp, treo máy | Trên 48 giờ thì dùng mô phỏng thô theo tháng |
| Bản đồ | Điểm cô lập, không tới được quan ải | Dựng cây khung trước khi thêm cạnh phụ; kiểm bằng BFS sau khi sinh |
| Sương mù | Tên điểm chưa biết vẫn nằm trong HTML | Không vẽ phần tử cho `fog 0` |
| Sương mù | `reveal` phình vô hạn | Gộp tâm gần nhau, trần 300 |
| Thanh hành động | Hai đơn vị cùng `ready`, hiện hai bảng chiêu | Mỗi bước chỉ cho một đơn vị vào `ready`, số còn lại kẹp 49,9 |
| Thanh hành động | Quên tắt `hold` sau khi ra chiêu hoặc khi mục tiêu đã gục | Tắt `hold` ở đúng một chỗ: cuối hàm xử lý hành động, trong `finally` |
| Tụ lực | Hai phe chờ nhau mãi | Vào tụ lực tính là đã hành động; chốt 12 giây |
| Tụ lực | `waitSet` còn id của kẻ đã gục | Gỡ id khỏi mọi `waitSet` ngay khi một đơn vị gục |
| Tổ đội | Chiêu trúng đơn vị đã gục; thắng thua không được kiểm sau đòn đánh cả đội | Lọc `hp > 0` khi lấy mục tiêu; kiểm thắng thua sau **mỗi** nhát |
| Tổ đội | Chia cho 0 khi tính trung bình `tp` | Tính trung bình một lần lúc vào trận |
| Né | Nhấn liên tục để ăn may | Chỉ nhận lần nhấn đầu tiên của mỗi vòng |
| Né | Hẹn giờ bằng `setTimeout`, lệch trên máy yếu | Đo bằng `performance.now()` lúc nhấn so với mốc chạm đã định trước |
| Thiên kiếp | Kiếp vân bị độc, choáng hoặc bị chọn làm mục tiêu hồi máu | Gắn cờ `immune: true`; mọi hàm trạng thái bỏ qua đơn vị này |
| Đột phá | Vật phẩm bị trừ hai lần, hoặc không bị trừ khi thất bại | Trừ đúng một lần lúc bấm "Bắt đầu", trước khi gieo số |
| Phẩm chất | Hệ số áp hai lần | Chỉ nhân trong `S()`, không ghi đè vào chỉ số gốc |
| Nối kiếp | Thế giới bị sinh lại khi đầu thai | `genWorld` chỉ gọi khi `meta.world` chưa có |
| Lưu | Lưu hàm hoặc tham chiếu vòng | Thực thể và đơn vị chỉ giữ id, không giữ con trỏ tới nhau |
| Lưu | Bản lưu cũ thiếu trường mới gây lỗi | `migrate` điền mặc định; thử tải bản lưu của lần trước ở mỗi lần nghiệm thu |

**Thứ tự viết mã trong mỗi lần chỉnh sửa:** dữ liệu, rồi lõi, rồi chạy người chơi máy tới khi sạch lỗi, sau đó mới làm giao diện, cuối cùng chơi tay trên màn hình rộng 360px.
