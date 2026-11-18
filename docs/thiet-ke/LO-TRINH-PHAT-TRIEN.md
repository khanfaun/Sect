# Phù Sinh — Lộ trình phát triển (cho AI lập trình)

Ngày soạn: 18/11/2026 · Nguồn thiết kế: `docs/thiet-ke/PHAN-TICH-HOP-NHAT.md` (gọi tắt **HN**; Phần A của HN có quyền cao nhất) · Mã tham chiếu: nhánh `claude/busy-cray-fctc4p` (gồm `main` ef2ced2).

File này viết cho **AI đọc và code**. Mỗi hạng mục có: mục tiêu, model nên dùng, file phải sửa / tạo, từng bước làm, bài kiểm tra, lỗi dự đoán, điều kiện hoàn thành. Mục cuối (Phần 7) viết cho **người giám sát** bằng lời thường.

Mục lục:
1. Quy ước bắt buộc cho mọi AI làm việc trên dự án
2. Chọn model Claude và mức nỗ lực
3. Bản đồ lộ trình (đợt, phụ thuộc)
4. Chi tiết từng hạng mục (Đ0 → Đ12)
5. Danh sách lỗi dự đoán (tổng hợp)
6. Mẫu lệnh giao việc cho từng phiên AI
7. Người giám sát cần làm gì

---

## 1. Quy ước bắt buộc cho mọi AI

Đọc trước khi làm bất cứ hạng mục nào. Vi phạm một dòng dưới đây = hạng mục chưa đạt.

### 1.1 Đọc gì trước
1. `CLAUDE.md` ở gốc dự án (quy tắc kiểm tra, cấm chạy bot nếu người dùng chưa yêu cầu, các bẫy đã gặp).
2. Mục hạng mục của mình trong file này.
3. Đúng mục HN được trỏ tới (không đọc cả HN — HN dài hơn 600 nghìn ký tự).
4. Chỉ mở đúng các file được liệt kê; tìm thêm bằng `grep`, không quét cả dự án.

### 1.2 Cách mã được ghép (không được làm sai)
- Game là **một tệp script cổ điển** ghép từ nhiều file theo thứ tự ở `src/game/thu-tu.json` (công cụ `tools/ghep.js`). Mọi `function`/`const` ở cấp ngoài cùng là **biến toàn cục**.
- **Mở rộng hàm có sẵn bằng cách bọc**, không sửa thân hàm gốc trừ khi hạng mục cho phép:
  ```js
  {const _goc=tenHam;tenHam=function(...a){/* trước */const kq=_goc.apply(this,a);/* sau */return kq;};}
  ```
  Bên trong khối bọc **luôn kiểm lại `G.run`** sau khi gọi hàm gốc (hàm gốc có thể gọi `die()` làm `G.run=null`).
- **File luật mới**: đặt ở `src/game/core2/`, đánh số tiếp từ `34-…`. **Bảng dữ liệu mới**: đặt ở `content/rules/`, `content/characters/`, `content/items/` hoặc `content/catalog/` (JSON). Ghi tên vào `src/game/thu-tu.json` **ngay sau** dòng `"core2/32-sua-loi-can-bang.js"` và **trước** `"ui/01-base.js"`; bảng dữ liệu đứng trước file luật dùng nó. File giao diện cũ (`src/game/ui/…`) đứng sau `ui/19-main.js` nếu cần `ACT`.
- Dòng đầu mỗi bảng dữ liệu theo mẫu có sẵn: `// Nguồn chuẩn: TEN_BANG. Luật xử lý ở src/game/core2/NN-ten.js.`
- `tools/test.js` chỉ nạp nhóm `core`, `core2`, `data` và mọi file `content/…` → luật mới phải nằm trong `core2`, **không** đặt luật trong `ui/`.

### 1.3 Chữ hiển thị
- Chữ trong mã luật lấy qua `contentText("khoa")`; khóa và chữ đặt trong `content/text/<nhom>.json` (thêm tên tệp mới vào `content/text/manifest.json`). Tham số dùng `{{0}}`, `{{1}}` (chỉ chạy đúng sau hạng mục Đ0.1).
- Chữ trong React (`src/react/**`) viết thẳng tiếng Việt như các file hiện có.
- **Không có chữ số** trong lời hiển thị của Hành Đạo, Nghiệp Duyên, Danh tiếng, tuế biến (yêu cầu 9 và 10). Số chỉ được hiện ở máu, tiền, giá, tiến độ nhiệm vụ.
- Giọng văn theo HN Phần B §3.4.

### 1.4 Bản lưu cũ phải tải được
- Mọi trường mới trong `G.run` đọc kiểu `r.x||0`, `r.x||[]`, `(r.x||{}).y`.
- Chuyển đổi bản lưu cho từng lượt chơi (`G.run`): bọc `run2()` (file `src/game/core2/01-core2.js`) với **cờ phiên bản riêng**, theo mẫu có sẵn ở `core2/13-dot-26-do-don.js`:
  ```js
  {const _r=run2;run2=function(){const r=_r();if(r&&!r._nqV1){r._nqV1=1;/* chuyển đổi một lần */}return r;};}
  ```
- Chuyển đổi cho `G.meta` / thế giới: định nghĩa hàm toàn cục `migrateX(d)` (được `migrate()` ở `src/game/ui/20-chu-thich.js` gọi nếu tồn tại). Chỉ có **một** `migrateX` → đặt ở `core2/34-nen-tang-moi.js` và để các đợt sau **bọc** nó.

### 1.5 Nhật ký gỡ lỗi
Mỗi hệ mới ghi `dbg('nhom.ten',{...})` tại các điểm quyết định (ví dụ `dbg('nq.deed',{id,P,T,G,B})`). Bài kiểm tra dùng `NK.count('nhom')`.

### 1.6 Kiểm tra
- Luật: `node tools/test.js ten_bai` (thêm `--log` để in nhật ký). Chạy cả bộ bằng `npm run test:rules` (đã loại bài `smoke` dùng bot).
- Nội dung: `npm run content:check`, `npm run content:stories`.
- Giao diện: `npm run build` rồi `node tools/test-ui.js ten_bai`. Chỉ chụp ảnh (`--shot <thư_mục_scratchpad>`) khi thật cần nhìn bố cục.
- **Không chạy `bot.js`, không chạy bài `smoke`** trừ khi người dùng yêu cầu.
- Mỗi hạng mục thêm bài kiểm tra mới vào `TESTS` trong `tools/test.js` (luật) và/hoặc `tools/test-ui.js` (giao diện), đặt tên đúng như hạng mục ghi.

### 1.7 Điều kiện hoàn thành chung (áp cho mọi hạng mục)
1. Các bài kiểm tra mới của hạng mục đều qua.
2. `npm run test:rules` không có bài nào **mới** bị hỏng so với mốc ở Đ0.3.
3. `npm run content:check` qua.
4. Nếu đụng giao diện: `npm run build` chạy được và bài `test-ui` liên quan qua.
5. Không có chuỗi hiển thị nào bị trống / hiện khóa / hiện `{{0}}`.
6. Commit lên nhánh của đợt với lời commit tiếng Việt mô tả hạng mục (vd `Đ1.2: Hành Đạo — sổ hành động và nhãn`).
7. Báo cáo ngắn: đã làm gì, file nào, bài kiểm tra nào, còn gì chưa làm.

---

## 2. Chọn model Claude và mức nỗ lực

Bảng giá và mã model lấy từ tài liệu Claude API (bản lưu ngày 03/11/2026). Trong Claude Code, chọn model và mức nỗ lực trong menu `/model` (phiên trên đám mây: chọn khi tạo phiên).

| Model | Mã | Giá (vào / ra, mỗi triệu token) | Dùng cho | Mức nỗ lực khuyên dùng |
|---|---|---|---|---|
| **Claude Fable 5.2** | `claude-fable-5-2` | $8 / $40 | Việc khó nhất, sai thì lan rộng: đổi kiến trúc dữ liệu, chuyển đổi bản lưu, máy trạng thái cốt truyện, mô phỏng thế giới nhiều năm, rà soát chéo cả đợt | `high` (chỉ lên `xhigh` khi `high` làm hỏng). Mỗi lượt có thể chạy lâu |
| **Claude Opus 5.5** | `claude-opus-5-5` | $4 / $20 | Lõi luật chơi: hệ thống mới, bọc hàm, công thức, chiến đấu, thiết kế dữ liệu cho một hệ | `high`. **Lưu ý: mặc định của Opus 5.5 là `medium`** — phải đặt `high` cho việc viết luật |
| **Claude Sonnet 5.5** | `claude-sonnet-5-5` | $2 / $10 | Giao diện React, bài kiểm tra, nhập dữ liệu từ bảng thiết kế vào file theo mẫu có sẵn, viết sự kiện theo schema | `medium` (giao diện và nhập liệu); `high` khi viết sự kiện có lựa chọn phức tạp |
| **Claude Haiku 5.5** | `claude-haiku-5-5` | $0,10 / $0,50 | Việc máy móc có mẫu rõ: chép bảng thành JSON, thêm khóa chữ, đổi tên trường hàng loạt theo danh sách, chạy kiểm tra và tóm tắt kết quả | `low` hoặc `medium`. **Không giao logic luật** |

Luật chọn model:
1. Mỗi hạng mục ở Phần 4 ghi sẵn model + mức nỗ lực. Không tự hạ cấp cho việc ghi là Fable/Opus.
2. Việc giao cho Sonnet/Haiku **phải có bước rà soát** bằng Opus 5.5 `medium` trước khi gộp (Phần 6 có mẫu lệnh rà soát).
3. Cuối mỗi đợt: một phiên Fable 5.2 `high` rà soát chéo toàn đợt (đọc diff của cả đợt, tìm lỗi lan truyền, bản lưu cũ, chuỗi bọc hàm).
4. Một phiên = một hạng mục. Hạng mục mới thì mở phiên mới (đỡ nhầm ngữ cảnh, đỡ tốn).

---

## 3. Bản đồ lộ trình

| Đợt | Tên | Phụ thuộc | Nhánh đề xuất |
|---|---|---|---|
| Đ0 | Nền móng, sửa lỗi có sẵn | — | `dev/d0-nen` |
| Đ1 | Hành Đạo + Nghiệp Duyên + Danh tiếng, thiên kiếp công bằng, hoàn cảnh đầu thai | Đ0 | `dev/d1-nghiep` |
| Đ2 | Linh căn mới, vô linh căn, trắc linh, đầu thai ngẫu nhiên + quên sạch, tuế biến | Đ1 | `dev/d2-linhcan` |
| Đ3 | Tiền tệ (bạc, cống hiến theo thế lực, Thưởng Lệnh), ăn uống, việc làm thuê, gia đình cơ bản | Đ1 | `dev/d3-tiente` |
| Đ4 | 27 nhiệm vụ tân thủ | Đ2, Đ3 | `dev/d4-tanthu` |
| Đ5 | Võ học phàm nhân, khung nghề, 5 nghề phàm đầu, năng lực hỗ trợ | Đ3 | `dev/d5-nghe` |
| Đ6 | Khung cải căn + CC01, CC03, rồi các đường còn lại | Đ2, Đ5 | `dev/d6-caican` |
| Đ7 | 16 nghề tu lõi (công pháp, chiêu, tài nguyên), 16 nghề phàm còn lại | Đ5 | `dev/d7-ngetu` |
| Đ8 | Thế giới neo (15 địa điểm, 30 vai NPC, 10 thế lực), 14 đồng hồ, thời gian luân hồi + tua thập kỷ, đất ma | Đ1 | `dev/d8-thegioi` |
| Đ9 | Bộ máy cốt truyện, 45 tuyến xuất thân, 9 đại lộ | Đ8 | `dev/d9-cottruyen` |
| Đ10 | Mộng Ấn, ba tri thức, nghi thức, 8 kết thúc, màn kết | Đ9 | `dev/d10-ketthuc` |
| Đ11 | Nghề tu mở rộng | Đ7 | `dev/d11-morong` |
| Đ12 | Áp số độ khó; đo bằng bot khi người dùng cho phép | mọi đợt | `dev/d12-canbang` |

Đ3 chạy song song Đ2 được (khác file). Đ8 chạy song song Đ5–Đ7 được.

---

## 4. Chi tiết từng hạng mục

Ký hiệu model: **F** = Fable 5.2, **O** = Opus 5.5, **S** = Sonnet 5.5, **H** = Haiku 5.5; sau dấu `/` là mức nỗ lực.

### Đ0 — Nền móng, sửa lỗi có sẵn

#### Đ0.1 Sửa lỗi điền tham số chữ (lỗi **đang có** trong game) — H/low
- **Hiện tượng (đã kiểm)**: `contentText(khóa, [đối số])` không thay `{{0}}`, `{{1}}`… Ví dụ nhật ký đầu kiếp hiện nguyên `{{0}}: {{1}}, {{2}}, quê ở {{3}}.`
- **Nguyên nhân**: `tools/content-build.js` dòng 12 viết biểu thức `/\{\{(\d+)\}\}/g` **bên trong chuỗi nháy đơn** để sinh file `src/game/data/00-content-text.js`, nên dấu `\` bị mất, file sinh ra chứa `/{{(d+)}}/g`.
- **Sửa**: trong `tools/content-build.js` dòng 12, đổi `s.replace(/\{\{(\d+)\}\}/g,` thành `s.replace(/\\{\\{(\\d+)\\}\\}/g,`. Chạy `node -e "require('./tools/content-build').buildContent()"` rồi mở `src/game/data/00-content-text.js`, xác nhận chuỗi là `/\{\{(\d+)\}\}/g`.
- **Kiểm tra** (thêm vào `tools/test.js`, tên `ctxt`):
  ```js
  ctxt() {
    fresh();
    const k = run('Object.keys(CONTENT_TEXT).find(k=>CONTENT_TEXT[k].includes("{{0}}"))');
    ok(!!k, 'có khóa chữ dùng tham số');
    const s = run(`contentText(${JSON.stringify(k)},["A1","A2","A3","A4","A5","A6"])`);
    ok(!s.includes('{{0}}') && s.includes('A1'), 'tham số được điền: ' + s.slice(0, 60));
  },
  ```
- **Lỗi dự đoán**: sau khi sửa, vài câu từng "ẩn lỗi" sẽ hiện tham số lạ (đối số truyền sai thứ tự) → chạy `npm run test:rules` và `node tools/test-ui.js nhatky`, đọc nhật ký đầu kiếp; nếu câu sai thứ tự thì sửa thứ tự đối số tại nơi gọi, không sửa chữ.

#### Đ0.2 File nền cho các hệ mới — O/medium
Tạo `src/game/core2/34-nen-tang-moi.js`, ghi vào `thu-tu.json` ngay sau `core2/32-sua-loi-can-bang.js`:
```js
// ĐỢT 0: nền cho các hệ mới. Cờ FEAT cho phép tắt từng hệ khi gặp sự cố (bật = 1 khi đợt đó hoàn tất).
const FEAT={nq:0,vo:0,tue:0,tien:0,an:0,tut:0,nghe:0,cc:0,the:0,arc:0,mong:0};
function feat(k){return !!FEAT[k];}
// Chuyển đổi G.meta / thế giới của bản lưu cũ. Các đợt sau BỌC hàm này, không viết lại.
function migrateX(d){if(!d||!d.meta)return d;const M=d.meta;M.v2=M.v2||{};return d;}
// năm nguyên của tuổi hiện tại
function ageY(r){r=r||G.run;return r?Math.floor(r.age):0;}
// điểm neo địa điểm: Đ8 điền thật; trước đó trả về nút gần nhất có loại phù hợp
const ANCHOR_FALLBACK={LOC01:['tran'],LOC02:['thanh'],LOC03:['thanh','cho'],LOC04:['phe','tran'],LOC05:['tong','thanh'],LOC06:['rung'],LOC07:['ma','phe'],LOC08:['tong','rung'],LOC09:['song','bien'],LOC10:['duoc','rung'],LOC11:['khoang','nui'],LOC12:['tong','nui'],LOC13:['thanh','nui'],LOC14:['phe','nui'],LOC15:['thien','nui']};
function anchorNode(code){const w=W();const all=w.regions.flatMap(R=>R.nodes);const a=all.find(n=>n.anchor===code);if(a)return a;
  const types=ANCHOR_FALLBACK[code]||[];const r=G.run;const here=r&&nodeById(r.at);
  const cand=all.filter(n=>types.includes(n.type)&&n.state!=='ruin');if(!cand.length)return null;
  if(!here)return cand[0];return cand.sort((x,y)=>Math.hypot(x.x-here.x,x.y-here.y)-Math.hypot(y.x-here.x,y.y-here.y))[0];}
```
- Trước khi dùng `n.x`, `n.y`: `grep -n "function nodeById\|function mapNode\|function nodeShown" src/game -r` để xác nhận tên trường tọa độ của nút; đổi cho đúng nếu khác.
- **Kiểm tra** `nen`: `feat('nq')===false`; `typeof migrateX==='function'`; `anchorNode('LOC01')` trả về nút có `type==='tran'`.

#### Đ0.3 Ghi mốc kiểm tra — H/low
- Chạy `npm run test:rules` và `npm run build && node tools/test-ui.js`, lưu kết quả vào `docs/thiet-ke/moc-kiem-tra.md` (danh sách bài qua / hỏng). Bài đang hỏng sẵn thì ghi rõ "hỏng từ trước", không sửa trong đợt này.

#### Đ0.4 Bộ liệt kê `karma` trong nội dung — H/low
- Viết `tools/liet-ke-karma.js`: đọc `content/events/manifest.json`, duyệt mọi sự kiện, in CSV `id,đường_dẫn_lựa_chọn,giá_trị_karma,nhãn_lựa_chọn` ra `docs/thiet-ke/karma-su-kien.csv`. Hiện có **477** chỗ `karma` trong `content/events` và **12** trong `content/hooks.js`. File này dùng ở Đ1.8.

---

### Đ1 — Hành Đạo, Nghiệp Duyên, Danh tiếng (thay số `karma`)

Thiết kế: HN A.4, A.5, Phần C §5.4 (công thức Hành Đạo, Nghiệp Duyên), Phần B §8–§10.

**Chiến lược an toàn**: giữ trường `r.karma` làm **gương phản chiếu chỉ để đọc** của Hành Đạo (−100..100) để mọi chỗ cũ còn chạy; chuyển từng chỗ dùng sang hệ mới ở các bước sau; cuối đợt mới bỏ hẳn việc ghi vào `r.karma`.

#### Đ1.1 Bảng dữ liệu — S/medium (rà soát O/medium)
Tạo 3 file, ghi vào `thu-tu.json` trước `core2/35-hanh-dao-nghiep.js`:

`content/rules/hanh-dao.js`
```js
// Nguồn chuẩn: HD_LV. Luật xử lý ở src/game/core2/35-hanh-dao-nghiep.js.
// p = P/(P+T) của 24 quyết định gần nhất; e = 2(p-0.5). Nhãn chỉ đổi khi vượt ngưỡng 0.03 (chống nhấp nháy).
const HD_LV=[
  {min:0.8, n:'Chính tâm kiên định', d:'Giỏi che chở, chậm ra tay tuyệt tình.'},
  {min:0.55,n:'Nghiêng về chính đạo',d:'Thuật bảo hộ nhỉnh hơn, thế công bớt quyết liệt.'},
  {min:0.45,n:'Chính tà đan xen',    d:'Chưa có một lối hành xử lấn át.'},
  {min:0.2, n:'Nghiêng về tà đạo',   d:'Ra tay quyết liệt hơn, khó tiếp nhận dưỡng lành.'},
  {min:0,   n:'Tà niệm ăn sâu',       d:'Thế công dữ dội, thương tổn khó lành.'}];
const HD_W={nho:1,vua:3,lon:8}; // trọng số quyết định
const HD_HYS=0.03, HD_KEEP=24;
```
`content/rules/nghiep.js`
```js
// Nguồn chuẩn: NQ_MUC, NQ_YD, NQ_TN, NQ_LV_G, NQ_LV_B. Luật xử lý ở src/game/core2/35-hanh-dao-nghiep.js.
const NQ_MUC={nho:1,vua:3,lon:8,mang:15};             // mức tổn hại / ân nghĩa
const NQ_YD={chu_dich:1,phot_lo:0.7,tai_nan:0.25,cuong_buc:0.1}; // ý định
const NQ_TN={truc_tiep:1,ra_lenh:1,tiep_tay:0.5,dung_xem:0};     // phạm vi trách nhiệm
const NQ_LV_G=[[50,'Ân nghĩa sâu dày'],[15,'Thiện duyên nối dài'],[3,'Có người còn nhớ'],[0,'Ít mối nương tựa']];
const NQ_LV_B=[[50,'Nghiệp hải trùng trùng'],[15,'Oán nghiệp quấn thân'],[3,'Vướng nợ trần duyên'],[0,'Ít điều vướng bận']];
```
`content/rules/deed.js` — chuyển **toàn bộ 55 dòng** của HN Phần B §10 theo luật:
- Cột CK > 0 → `p` = trọng số (CK 1–2 → `nho`, 3–7 → `vua`, ≥8 → `lon`); cột TK > 0 → `t` tương tự. Cả hai > 0 thì có cả `p` và `t`.
- Cột Phúc → `g:{muc}` với mức gần nhất trong 1/3/8/15 (Phúc 1–2 → 1, 3–6 → 3, 7–12 → 8, ≥13 → 15). Cột Nghiệp → `b:{muc}` cùng luật. Giá trị 0 thì bỏ trường.
- Cột Quả chín ghi "có" → `seed:1`. Ghi chú về tuyến (Huyết thù, Oán…) → `tuyen:'huyet_thu'|'oan'|'an'|'hua'|'duyen'`.
- `sam_hoi` (Nghiệp −10%) → `bPct:-10`.
- Mặc định `yd:'chu_dich'`, `tn:'truc_tiep'`; sự kiện được ghi đè khi gọi.

Năm dòng mẫu phải đúng y như sau (rà soát dựa vào đây):
```js
// Nguồn chuẩn: DEED. Luật xử lý ở src/game/core2/35-hanh-dao-nghiep.js.
const DEED={
  cuu_nguoi:{p:'vua',g:8,seed:1},
  giet_vo_toi:{t:'lon',b:15,seed:1,tuyen:'huyet_thu'},
  tha_ke_ac:{p:'vua',seed:1},
  hiep_dao:{p:'nho',t:'vua',g:3,b:1},
  sam_hoi:{p:'nho',bPct:-10},
  // … đủ 55 mục, mã đúng như cột "Mã" của bảng HN B §10
};
```
(`g`, `b` ở đây là mức trong `NQ_MUC`, đã viết sẵn bằng số.)

#### Đ1.2 Luật Hành Đạo + Nghiệp Duyên — F/high
Tạo `src/game/core2/35-hanh-dao-nghiep.js`. Nội dung bắt buộc:

```js
// ĐỢT 1: Hành Đạo (cách hành xử, kiếp này), Nghiệp Duyên (hậu quả có chủ thể), gương r.karma cho mã cũ.
function nqInit(r){if(!r||r.hd)return;r.hd={log:[],lv:2};r.ng={G:0,B:0,so:[]};r.danh=r.danh||{};}
function hdSum(r){let P=0,T=0;for(const x of r.hd.log){P+=x.p||0;T+=x.t||0;}return {P,T};}
function hdP(r){r=r||G.run;const s=hdSum(r);return s.P+s.T>0?s.P/(s.P+s.T):0.5;}
function hdE(r){return 2*(hdP(r)-0.5);} // -1..1
function hdLvIdx(r){r=r||G.run;const p=hdP(r);let i=HD_LV.findIndex(x=>p>=x.min);if(i<0)i=HD_LV.length-1;
  const cur=r.hd.lv==null?i:r.hd.lv;if(i!==cur){const edge=i<cur?HD_LV[i].min:HD_LV[cur].min;if(Math.abs(p-edge)<HD_HYS)i=cur;}
  r.hd.lv=i;return i;}
function hdName(){const r=G.run;if(!r||!r.hd)return HD_LV[2].n;return HD_LV[hdLvIdx(r)].n;}
function hdTip(){const r=G.run;if(!r||!r.hd)return HD_LV[2].d;return HD_LV[hdLvIdx(r)].d;}
function karmaMirror(r){return Math.round((hdP(r)-0.5)*200);} // gương −100..100 cho mã cũ
function hdAdd(p,t,why){const r=G.run;if(!r)return;nqInit(r);
  const lv0=hdLvIdx(r);r.hd.log.push({p:p||0,t:t||0,why:why||'',y:ageY(r)});while(r.hd.log.length>HD_KEEP)r.hd.log.shift();
  // làm trái hướng: đạo tâm dao động (HN B §8.5); "Chính tà đan xen" (lv 2) không bị
  if(lv0<2&&t>0||lv0>2&&p>0){const w=lv0<2?t:p;r.tamma=clamp((r.tamma||0)+w,0,100);dbg('nq.trai',{lv0,w});}
  r.karma=karmaMirror(r);dbg('nq.hd',{p,t,why,lv:hdLvIdx(r)});}
function ngVal(muc,yd,tn){return muc*(NQ_YD[yd||'chu_dich']??1)*(NQ_TN[tn||'truc_tiep']??1);}
function ngAdd(kind,muc,o){const r=G.run;if(!r||!muc)return;nqInit(r);o=o||{};const v=ngVal(muc,o.yd,o.tn);
  if(kind==='G')r.ng.G+=v;else r.ng.B+=v;
  r.ng.so.push({k:kind,v:+v.toFixed(2),id:o.id||'',ai:o.ai||'',why:o.why||'',y:ageY(r),t:W().t,mo:1});
  if(r.ng.so.length>300)r.ng.so.splice(0,r.ng.so.length-300);dbg('nq.ng',{kind,v,id:o.id});}
function ngB(r){r=r||G.run;return r&&r.ng?r.ng.B:0;} // nghiệp chướng chưa giải
function ngG(r){r=r||G.run;return r&&r.ng?r.ng.G:0;}
function ngName(k){const v=k==='G'?ngG():ngB();const L=k==='G'?NQ_LV_G:NQ_LV_B;return L.find(x=>v>=x[0])[1];}
// một hành vi theo bảng DEED; o = {yd,tn,ai,why,lo}
function deed(id,o){const D=DEED[id];if(!D){dbg('nq.deed.missing',{id});return [];}const r=G.run;if(!r)return [];nqInit(r);o=o||{};
  const p=D.p?HD_W[D.p]:0,t=D.t?HD_W[D.t]:0;if(p||t)hdAdd(p,t,id);
  if(D.g)ngAdd('G',D.g,Object.assign({id},o));if(D.b)ngAdd('B',D.b,Object.assign({id},o));
  if(D.bPct)r.ng.B=Math.max(0,r.ng.B*(1+D.bPct/100));
  if(typeof danhDeed==='function')danhDeed(id,D,o); // Đ1.4
  if(D.seed&&typeof nqSeed==='function')nqSeed(id,o);  // Đ1.7
  dbg('nq.deed',{id,P:hdSum(r).P,T:hdSum(r).T,G:r.ng.G,B:r.ng.B});
  return [chip('☯️',p>t?'chính ▲':t>p?'tà ▲':'nghiệp duyên','Việc này đã ghi vào sổ nghiệp duyên','')];}
// chuyển một giá trị karma cũ (−100..100) thành một mục sổ
function nqFromLegacy(r,k){nqInit(r);const P=Math.round((0.5+k/200)*10),T=10-P;r.hd.log=[{p:P,t:T,why:'cu',y:ageY(r)}];
  r.ng.G=Math.max(0,k)*0.3;r.ng.B=Math.max(0,-k)*0.3;r.karma=karmaMirror(r);}
```

Rồi các khối bọc (trong cùng file):
1. **`applyE`**: thêm các khóa hiệu ứng `deed`, `hd`, `ng` và đổi khóa cũ `karma` thành bút toán tạm:
   ```js
   {const _ae=applyE;applyE=function(e,v){const r=G.run;if(!e||!r||!feat('nq'))return _ae(e,v);
     let ch=[];e=Object.assign({},e);
     if(e.deed){ch=ch.concat(deed(e.deed,e.deedO||{}));delete e.deed;delete e.deedO;}
     if(e.hd){hdAdd(e.hd.p||0,e.hd.t||0,'ev');delete e.hd;}
     if(e.ng){if(e.ng.g)ngAdd('G',e.ng.g,e.ng);if(e.ng.b)ngAdd('B',e.ng.b,e.ng);delete e.ng;}
     if(e.karma){const k=e.karma;delete e.karma;  // bút toán tạm cho 477 chỗ cũ (xem Đ1.8)
       hdAdd(k>0?Math.min(8,k):0,k<0?Math.min(8,-k):0,'legacy');ngAdd(k>0?'G':'B',Math.max(1,Math.round(Math.abs(k)/4)),{id:'legacy'});
       ch.push(chip('☯️',k>0?'chính ▲':'tà ▲','Việc này đã ghi vào sổ nghiệp duyên',''));}
     return ch.concat(_ae(e,v));};}
   ```
2. **`newRun`**: sau khi gọi gốc, `nqFromLegacy(G.run, G.run.karma||0)` — lúc này `r.karma` đã gồm karma xuất thân và `karmaAdj` khí vận (core2/12), nên chỉ cần chuyển một lần.
3. **`run2`** với cờ `_nqV1`: nếu `!r.hd` thì `nqFromLegacy(r, r.karma||0)`.
4. **Chặn ghi thẳng**: các chỗ dưới đây đang trừ `r.karma` trực tiếp, **sửa thân hàm** (được phép trong hạng mục này):

| File : dòng | Hiện tại | Đổi thành |
|---|---|---|
| `src/game/core/11-doi-cong-phap.js:131` | `r.karma=clamp(r.karma-4,-100,100);` (nhiệm vụ trễ hạn) | `if(feat('nq'))deed('that_hua',{why:q.text});else r.karma=clamp(r.karma-4,-100,100);` |
| `src/game/core/11-doi-cong-phap.js:165` | `applyE({st:…,tv:…,karma:2})` | thay `karma:2` bằng `deed:'giu_loi'` |
| `src/game/core2/08-dot-13-tram-dich.js:33` | `questPenalty` trả `karma:-2` | trả `{st:…,deed:'that_hua'}`; giữ `karma:-2` khi `!feat('nq')` |
| `src/game/core2/08-dot-13-tram-dich.js:35` | `applyE({karma:P.karma})` | `applyE(P.deed?{deed:P.deed}:{karma:P.karma})` |
| `src/game/core2/08-dot-13-tram-dich.js:72` | `applyE({karma:2})` | `applyE({deed:'giu_loi'})` |
| `src/game/core2/08-dot-13-tram-dich.js:85` | `G.run.karma=clamp(G.run.karma-2,…)` | `if(feat('nq'))deed('that_hua');else …` |
| `src/game/core2/14-sua-lai-pham-khong.js:143` (`kvGain`, `amDuongBonus`) | cộng `r.karma` | `hdAdd(a.chinh||0, a.ta||0, 'kv')` khi `feat('nq')` |

5. Bật `FEAT.nq=1` ở cuối file này **chỉ khi** Đ1.3 xong (giao diện không còn đọc `karmaName`).

**Kiểm tra** `nq_hd`, `nq_ng`, `nq_legacy` trong `tools/test.js`:
- `fresh()` → `hdName()` là một trong 5 nhãn; sau 5 lần `deed('cuu_nguoi')` nhãn có chữ "chính".
- 24 lần `deed('giet_vo_toi')` rồi 1 lần `deed('cuu_nguoi')`: nhãn vẫn "Tà niệm ăn sâu"; `ngB()>=15*24*0.99`.
- `deed('cuu_nguoi')` khi đang "Tà niệm ăn sâu" làm `r.tamma` tăng.
- `applyE({karma:5})` không lỗi, `r.karma` là số, `NK.count('nq.hd')>0`.
- Bản lưu cũ: `fresh('delete G.run.hd;delete G.run.ng;G.run.karma=-70;G.run._nqV1=0;run2();')` → `ngB()>0`, `hdName()` có chữ "tà".

#### Đ1.3 Giao diện Hành Đạo / Nghiệp Duyên — S/medium
- `src/react/bang/NhanVat.jsx` dòng 71: thay
  `<Kv n="Nhân quả" v={PS.karmaName(r.karma)} t="Thiện ác đều có báo" />` bằng
  ```jsx
  <Kv n="Hành đạo" v={PS.hdName()} t={PS.hdTip()} />
  <Kv n="Thiện duyên" v={PS.ngName('G')} t="Những người còn nhớ ơn ngươi." />
  <Kv n="Nghiệp chướng" v={PS.ngName('B')} t="Những món nợ còn chưa trả." />
  ```
- `src/react/chung/TheNhiemVu.jsx` dòng 29 và `src/react/hop-thoai/XacNhan.jsx` dòng 87: chỗ in `pen.karma` / `P.karma` đổi thành chữ **"thất hứa"** (không in số).
- Giữ hàm `karmaName` trong `core/04` (thành tựu và mã cũ còn gọi), nhưng không còn hiển thị.
- **Kiểm tra** `test-ui` tên `hanhdao`: mở bảng nhân vật, có chữ "Hành đạo", "Thiện duyên", "Nghiệp chướng"; ba giá trị **không chứa chữ số** (`/\d/`).

#### Đ1.4 Danh tiếng — O/high
- Dữ liệu trên `G.run.danh`: `{ 'reg:<chỉ số khu>': {v:-100..100}, 'sect:<chỉ số tông>': {v}, 'trieu': {v} }`.
- `danhDeed(id,D,o)`: nếu việc **bị lộ** thì đổi danh tiếng: `o.lo===1`, hoặc mặc định lộ khi đang ở nút loại `tran`, `thanh`, `cho`, `tong`. Lượng: `+2·w(p) − 2·w(t)` cho khóa vùng đang đứng; nếu nút thuộc tông (`node.owner`) thì cộng cả khóa tông.
- `danhOf(n)` trả giá trị cho một nút (khu + tông của nút).
- Thay luật thù địch ở `src/game/core2/02-dia-diem-mo-rong.js` dòng 89–91 (đang dùng `r.karma`): `danhOf(n) <= -60` → mức 3; `<= -25` → mức 2; giữ phần còn lại. Để nguyên nhánh `!feat('nq')` dùng `r.karma` như cũ.
- Hiển thị: dòng "Danh tiếng nơi này" ở thẻ địa điểm (`src/react/canh/DiaDiem.jsx`) bằng chữ: ≥ 60 "Được kính trọng", ≥ 25 "Có tiếng tốt", > −25 "Vô danh", > −60 "Tiếng xấu", còn lại "Bị truy nã".
- **Kiểm tra** `danh`: 3 lần `deed('giet_vo_toi',{lo:1})` ở một thị trấn → giá trị vùng ≤ −25 và mức thù địch nút đó là 2.

#### Đ1.5 Thay các chỗ đọc `r.karma` còn lại — O/high

| File : dòng | Dùng để | Đổi thành |
|---|---|---|
| `core2/12-dot-24-cac-loai.js:12` `kiepKind()` | `karma<=-30` → Nghiệp Hỏa | `ngB()>=15` |
| `core2/12-dot-24-cac-loai.js:61` `ttPhys()` | `pureR = k>=40`, `pureE = k<=-40`, `neutral = |k|<20` | `pureR = hdLvIdx(r)<=1`, `pureE = hdLvIdx(r)>=3`, `neutral = hdLvIdx(r)===2` (gọi `nqInit(r)` trước) |
| `core2/03-cong-hien-tong-mon.js:17` `needList()` (điều kiện tông) | `n.karma` | `n.karma>=0` → cần `hdLvIdx(r)<=1`; `n.karma<0` → cần `hdLvIdx(r)>=3`. Chữ hiển thị dùng `HD_LV[...].n` |
| Thành tựu `thien`, `ma` (`content/rules/ach.js`, nơi gọi `ach('thien')`/`ach('ma')`: `grep -rn "ach('thien')\|ach('ma')" src/game`) | karma ≥ 60 / ≤ −60 | `hdLvIdx(r)===0 && ngG()>=50` / `hdLvIdx(r)===4 && ngB()>=50`; sửa câu mô tả trong `ach.js` |
| `content/hooks.js` (12 chỗ) | đọc/ghi `r.karma` | đọc → `hdP()`/`ngB()`; ghi → `deed(...)` hoặc `applyE({hd:...})` |

Sau bước này: `grep -rn "\.karma" src/game content/hooks.js` chỉ còn: gương `r.karma=` trong `35-…`, hàm `karmaName`, nhánh `!feat('nq')`, và `applyE` gốc.

#### Đ1.6 Thiên kiếp công bằng — O/high
Thiết kế HN A.5. Trong file mới `src/game/core2/36-thien-kiep-nghiep.js`:
```js
function nqK(){return 1+Math.min(0.6,0.004*ngB());}                 // sức kiếp
function nqKiepBonus(){return Math.min(0.10,0.0015*ngB());}          // thưởng khi vượt (trần 10%)
{const _kh=kiepHit;kiepHit=function(sc,k,off){if(feat('nq')&&sc&&sc.kiep){sc.kiep.uy=(sc.kiep.uy||1)*(1+0.75*(nqK()-1));}return _kh.apply(this,arguments);};}
{const _bf=btFinish;btFinish=function(){const r=G.run,to=r&&r.bt&&r.bt.to;const res=_bf.apply(this,arguments);const r2=G.run;
  if(feat('nq')&&r2&&to&&to<5&&!(r2.kiepBon||{})[to]){const b=nqKiepBonus();if(b>0){r2.kiepBon=r2.kiepBon||{};r2.kiepBon[to]=1;const x=Math.round(b*100);
    r2.bon.hpP+=x;r2.bon.atkP+=x;r2.bon.defP+=x;const sc=r2.scene;if(sc&&sc.chips)sc.chips.push(chip('🔥','Nghiệp hỏa tôi thể','Vượt kiếp dữ, thân thể rắn thêm','up'));dbg('nq.kiepBon',{to,x});}}
  return res;};}
```
- `kiepHit` đã bị bọc trong `core2/12` (nhân `K.uy`), file 36 nạp **sau** nên nhân tiếp — đúng thứ tự mong muốn. Xác nhận bằng `NK`.
- Bảng chuẩn bị đột phá (`src/react/canh/ChuanBiDotPha.jsx`): thêm dòng chữ khi `ngB()>=15`: "Mây kiếp đen kịt, mùi lưu huỳnh nồng — kiếp này dữ hơn thường." (không số).
- **Kiểm tra** `kiep_nghiep`: `r.ng.B=0` → `nqK()===1`; `r.ng.B=100` → `nqK()===1.4`, `nqKiepBonus()===0.1`; `kiepKind()==='nghiep'` khi B ≥ 15; gọi `btFinish` giả lập (theo mẫu bài `camngo`/`rotcanh` có sẵn) thì `r.bon.hpP` tăng đúng một lần cho mỗi cảnh giới.

#### Đ1.7 Hạt quả chín + Sổ Nghiệp Duyên — O/high
- `nqSeed(id,o)`: đẩy vào `r.seeds` (đã có) phần tử `{t:'qc',id,ai:o.ai,due:W().t+ri(6,18)*HM,done:0}`.
- Bọc `advanceTime`: mỗi tháng (đếm `r.qcAcc`) xét hạt đến hạn; với hạt đến hạn mở sự kiện quả chín có mã `qc_<id>` nếu tồn tại trong `KYNGO` (dạng `sp:1`), nếu không thì chỉ ghi nhật ký + đánh dấu `done`.
- `afterlife` (`src/game/core/12-dong-doi-tam-thoi.js:23`) đã chép `r.seeds` sang `w.legacy`; thêm: hạt `qc` chưa chín vẫn chép, kèm cờ `qc:1` để màn hết kiếp đọc.
- Sổ tay thêm thẻ **"Nghiệp duyên"** (`src/react/bang/SoTay.jsx`): liệt kê `r.ng.so` mới nhất trước, mỗi dòng: tuổi + `why` + chữ "thiện duyên"/"nghiệp chướng" — **không in `v`**.
- Màn hết kiếp `src/react/man-ngoai/ManHetKiep.jsx`: thêm khối "Quả chín" liệt kê hạt `qc` chưa chín (chữ trong `content/text`).

#### Đ1.8 Rà 477 chỗ `karma` trong sự kiện — S/high, chia lô 40 dòng
- Dùng `docs/thiet-ke/karma-su-kien.csv` (Đ0.4). Với mỗi dòng, đọc lựa chọn trong file JSON và thay `"karma": n` bằng `"deed": "<mã>"` (chọn mã gần nghĩa nhất trong `DEED`) hoặc `"hd": {...}` / `"ng": {...}` khi không có mã hợp.
- Luật: giúp đỡ, giữ lời → `deed` phía chính; cướp, lừa, giết → phía tà kèm `ng.b`; **bị lừa / làm vì không biết** → `"deedO": {"yd": "tai_nan"}`.
- Thêm các khóa `deed deedO hd ng` vào danh sách `effects` ở `tools/content-validate.js` dòng 10.
- Mỗi lô: `npm run content:check` phải qua; commit riêng từng lô.

#### Đ1.9 Hoàn cảnh đầu thai theo nghiệp — O/high
- Bọc `die` (`src/game/core/10-quan-ai.js:116`): **trước** khi gọi gốc, lưu `G.meta.lastNq={B:ngB(r),G:ngG(r)}`.
- Thêm trường `grp` cho mọi xuất thân: `'kho'` (khốn khó) / `'thuong'` / `'kha'` (khá giả) — danh sách theo HN B §16.2; sửa `content/characters/origin.js` và `content/catalog/origins.json` (S/medium).
- Bọc `genBirth`: tính xác suất theo HN Phần C §5.4: `bap = clamp(0.25+0.003B−0.001G, 0.10, 0.70)`, `nang = clamp(0.25+0.002G−0.001B, 0.05, 0.55)`, chuẩn hóa nếu tổng > 0.90. Với từng thẻ: rút nhóm hoàn cảnh, chọn lại `origin` trong đúng `grp` (`bap` → `kho`, `nang` → `kha`, còn lại `thuong`), ghi `c.hc='bap'|'binh'|'nang'`.
- Bọc `newRun`: `c.hc==='bap'` → tiền khởi đầu ×0.75; `'nang'` → ×1.25.
- **Kiểm tra** `hoancanh`: `G.meta.lastNq={B:200,G:0}` rồi gọi `genBirth()` 200 lần → tỉ lệ thẻ `hc==='bap'` trong khoảng 0.6–0.75.

#### Đ1.10 Rà chéo đợt 1 — F/high
Đọc diff cả đợt; kiểm: chuỗi bọc `applyE` không làm mất chip; bản lưu cũ; `grep "\.karma"` đúng như Đ1.5; bật `FEAT.nq=1`; chạy đủ bài.

**Lỗi dự đoán của Đ1** (chi tiết ở Phần 5): L1, L2, L3, L4, L9, L10.

---

### Đ2 — Linh căn mới, vô linh căn, trắc linh, đầu thai ngẫu nhiên, quên sạch, tuế biến

Thiết kế: HN A.2, A.6, A.16; Phần B §5, §12; Phần C §5.1–§5.2, §5.6.

#### Đ2.1 Bảng tỉ lệ linh căn và phẩm chất — S/medium
`content/rules/root-rate.js` (ghi trước `core2/37-linh-can.js`):
```js
// Nguồn chuẩn: ROOT_W1, VO_*, ROOT_Q. Luật xử lý ở src/game/core2/37-linh-can.js.
const ROOT_W1={tap:17.5,tu:25,tam:30,song:17.5,thien:4.75,bien:5,cuc:0.25}; // tỉ trọng kiếp đầu (không có vô căn)
const VO_BASE=45, VO_MIN=30, VO_MAX=65;
const VO_MOD_B=[[50,20],[15,10],[3,4]], VO_MOD_G=[[50,-15],[15,-8],[3,-3]]; // theo G.meta.lastNq
const ROOT_Q=[{id:'khuyet',n:'Khuyết',w:20,m:0.75},{id:'thuong',n:'Thường',w:65,m:1},{id:'thuan',n:'Thuần',w:14,m:1.15},{id:'vien',n:'Viên Mãn',w:1,m:1.3}];
```
Thêm vào cuối `content/characters/root.js`:
`ROOT.push({id:'vo',n:'Vô linh căn',m:0,w:0,k:0,d:'Không có linh căn. Không thể dẫn khí nhập thể.'});`

#### Đ2.2 Luật linh căn — O/high
`src/game/core2/37-linh-can.js`:
```js
function isVo(r){r=r||G.run;return !!(r&&r.root&&r.root.id==='vo');}
function voRate(){const L=(G.meta&&G.meta.lastNq)||{B:0,G:0};let x=VO_BASE;
  for(const [t,v] of VO_MOD_B)if(L.B>=t){x+=v;break;}for(const [t,v] of VO_MOD_G)if(L.G>=t){x+=v;break;}
  x-=4*U('tuccan');return clamp(x,VO_MIN,VO_MAX);}
// genRoot gốc ở core/04-loi-tro-choi.js:149 — thay hẳn bằng bản mới (không gọi gốc)
genRoot=function(){const first=((G.meta&&G.meta.nlife)||0)===0;
  if(!first&&chance(voRate()/100))return {id:'vo',els:[],q:null};
  const id=wpick(Object.keys(ROOT_W1),k=>ROOT_W1[k]);let els;
  if(id==='bien')els=[pick(['loi','bang','phong'])];else if(id==='cuc')els=NGUHANH.slice();
  else els=shuffle(NGUHANH.slice()).slice(0,ROOT.find(x=>x.id===id).k);
  const q=wpick(ROOT_Q,x=>x.w).id;return {id,els,q};};
// hệ số tu theo phẩm chất
{const _rv=rootView;rootView=function(x){const v=_rv(x);const Q=ROOT_Q.find(q=>q.id===x.q);if(Q)v.m=+(v.m*Q.m).toFixed(3);return v;};}
// vô căn không bị khí vận nắn lại
{const _ts=ttShape;ttShape=function(root,ids){if(root&&root.id==='vo')return root;return _ts.apply(this,arguments);};}
```
- `genBirth` (bản gốc + bọc của core2/12) tạo nhiều thẻ, mỗi thẻ gọi `genRoot()` riêng. Bọc `genBirth`: từ kiếp 2 trở đi, **mọi thẻ dùng chung một linh căn**: `const R0=cards[0].root;for(const c of cards)c.root=JSON.parse(JSON.stringify(R0));`. Sau đó, nếu thẻ nào có khí vận `vo_can` mà linh căn không phải `vo` → bỏ `vo_can` khỏi `c.kv`; nếu linh căn là `vo` mà chưa có `vo_can` → thêm `vo_can`.
- Ở `src/game/core2/12-dot-24-cac-loai.js` tìm dòng `delete TT_DEST.vo_can;` và **xóa dòng đó** (khôi phục khí vận Vô Căn). Bọc `ttRoll`: nếu `G.meta.nlife===0` thì lọc bỏ `vo_can`.
- **Kiểm tra** `vo_kiep1`, `vo_kiep2`: đặt `G.meta.nlife=0`, gọi `genRoot()` 1.000 lần → 0 lần `vo`. Đặt `nlife=3`, `lastNq={B:0,G:0}` → tỉ lệ `vo` 40–50%. `lastNq={B:100,G:0}` → ≤ 65%; `{B:0,G:100}` → ≥ 30%. `genBirth()` ở kiếp 3: mọi thẻ cùng `root.id`.

#### Đ2.3 Khóa tu luyện cho vô căn — O/high
Bọc trong `37-linh-can.js` (tên hàm đã kiểm có trong mã):

| Hàm | Ở đâu | Bọc thế nào |
|---|---|---|
| `phamUp` | `core2/09-dot-17-bang-treo.js:69` | `if(isVo())return;` trước khi gọi gốc |
| `addTv` | `core/05-thoi-gian-the-gioi.js` | `if(isVo()&&x>0){if(G.run.vo)G.run.vo.xp+=x*0.5;return;}` (đổi sang kinh nghiệm võ khi Đ5 có `r.vo`) |
| `bqReal` | `core/…` (`grep -n "function bqReal" -r src/game`) | trả 0 khi `isVo()` |
| `S` | nhiều lớp bọc | sau gốc: `if(isVo()){s.maxMp=0;}` |
| `canBreak` | `core/08-loi-kiep.js:81` | `if(isVo())return false;` |
| Tâm pháp bảo đảm sau `TP_Y` năm | `core2/10-pham-nhan-chua-dan.js:62` (khối bọc `advanceTime`) | khi `isVo()`: không gọi `tpGuarPick`; thay bằng mở trắc linh "Tự biết" (Đ2.4) một lần |
| Hiệu ứng `tv` của sự kiện cho phàm nhân (`_phEv`) | `core2/09…:68` | `isVo()` → bỏ `tv`, thêm chip "Không cảm được linh khí" |

- Giao diện: chỗ hiện thanh tu vi (`grep -n "tv" src/react/ban-do/Hud.jsx src/react/bang/NhanVat.jsx`) hiện chữ **"Vô linh căn — chưa thể tu luyện"** khi `PS.isVo()`; ẩn nút bế quan (`hudBq`) khi `isVo()`.
- **Kiểm tra** `vo_khoa`: dựng `fresh()` rồi đặt `G.run.root={id:'vo',els:[]}` → `addTv(50)` không đổi `r.tv`; `canBreak()===false`; `S().maxMp===0`; cho thời gian trôi `TP_Y+1` năm → không có tâm pháp mới trong `r.arts`.

#### Đ2.4 Trắc linh — O/high (chữ: S/medium)
- `r.rootKnown`: bọc `newRun` → `r.rootKnown = r.kiep===1 ? 1 : 0`. `run2` cờ `_rkV1`: bản lưu cũ → `1`.
- Hàm hiển thị riêng `rootLabel(r)`: `r.rootKnown ? rootView(r.root).n + phẩm : 'Chưa trắc'`. **Không** sửa `rootView` để che (nó dùng cho công thức). Mọi chỗ React đang in tên linh căn (`grep -rn "rootView\|root\." src/react`) đổi sang `PS.rootLabel(G.run)`.
- 5 cách trắc linh (HN B §5.3) làm thành kỳ ngộ `sp:1` trong `content/events/opportunities/system.json` với mã `tl_tuyendo`, `tl_dusi`, `tl_thach`, `tl_tubiet`, `tl_laodao`. Mỗi cái có 3 bản lời kể theo kết quả (vô / căn thường / căn tốt) chọn bằng `need` hoặc hook. Kết quả chung: `r.rootKnown=1`, `dbg('tl.done',{cach,root})`.
- Đếm tháng: bọc `advanceTime` với `r.tlAcc`; tháng 1–2 có tông trong 3 ngày đường → `tl_tuyendo`; tháng 1–3 mỗi tháng 30% `tl_dusi` khi đang ở `tran`/`thanh`; hết tháng 3 → `tl_laodao`. Chỉ mở khi `!r.scene && G.screen==='map' && !r.moving` (giống `tmVisit` ở `core2/27-tam-ma.js:10`); nếu bận thì dời sang lần kiểm sau.
- Vật phẩm `trac_linh_thach` (vật truyện trong `content/catalog/qitems.json`) dùng ở túi → mở `tl_thach`.
- **Kiểm tra** `trac_linh`: kiếp 2, cho trôi 4 tháng (ở trạng thái rảnh) → `rootKnown===1` và `NK.count('tl.done')===1`.

#### Đ2.5 Đầu thai ngẫu nhiên + lần chọn đặc biệt — O/medium
- **Đã kiểm**: `ACT.birth` (`src/game/ui/19-main.js:110`) gọi `genBirth()` rồi `newRun` một thẻ ngẫu nhiên → kiếp nào (kể cả kiếp đầu) cũng ngẫu nhiên. **Giữ nguyên.**
- Thêm `G.meta.pick` (số lần được chọn). Trong file giao diện mới `src/game/ui/24-dau-thai.js` (ghi sau `ui/22-cau-noi-react.js`):
  ```js
  {const _b=ACT.birth;ACT.birth=function(){const M=G.meta;if(M&&(M.pick||0)>0){M.pick--;genBirth();UI.sel=null;UI.panel=null;return;}return _b.apply(this,arguments);};}
  ```
  `genBirth()` tự đặt `G.screen='birth'` → màn `ManChonKiep` hiện ra; bấm thẻ dùng `ACT.born` có sẵn.
- `src/react/man-ngoai/ManChonKiep.jsx`: phần linh căn của thẻ hiện "Chưa trắc" khi `PS.G.meta.nlife>0`.
- Nguồn `pick`: vật `dinh_menh_chau` (qitem): bọc `die` — nếu túi có món này → `G.meta.pick++`, xóa món. Nâng cấp `menh` đổi nghĩa: bọc `newRun` — nếu `U('menh')>0` và `r.kiep % (U('menh')>=2?3:4)===0` → `G.meta.pick++`. Sửa câu mô tả `menh` trong `content/rules/upg.js`.
- **Kiểm tra** `dau_thai`: `G.meta.pick=0` → sau `ACT.birth` (gọi qua `run('ACT.birth()')` trong test-ui) màn hiện là bản đồ; `pick=1` → `G.screen==='birth'` và `pick===0`.

#### Đ2.6 Quên sạch — O/medium
- Gỡ ký ức: xóa mục `ky` trong `content/rules/upg.js`; xóa dòng `UPG.push({id:'kytp',…})` ở `core2/10-pham-nhan-chua-dan.js:53`.
- `U('ky')` vẫn trả giá trị cũ của bản lưu → bọc `migrateX`: nếu `M.upg.ky` hoặc `M.upg.kytp` > 0 → hoàn điểm `M.pts += Σ chi phí đã mua` (ky: 10, 26; kytp: 12, 28), xóa hai khóa, xóa `M.tpMem`.
- Chặn mang tâm pháp: khối bọc `newRun` ở `core2/10…:57` dùng `G.meta.tpMem` khi `U('kytp')` → sau khi xóa khóa, `U('kytp')===0` nên tự tắt. Kiểm lại.
- Vật `tuc_tue_dang` (qitem): bọc `die` — nếu có → `G.meta.mem={kind:'art',…}` giống cách `tpMem` lưu ở `core2/10…:55`; bọc `newRun` — có `G.meta.mem` thì học lại tâm pháp đó ở bậc thấp nhất rồi xóa `mem`.
- **Kiểm tra** `quen_sach`: bản lưu có `upg.ky=2` → sau `loadData` (gọi `migrate`) thì `upg.ky` không còn, `pts` tăng 36; kiếp mới không có chiêu `src:'ky'`.

#### Đ2.7 Tuế biến (tác dụng theo năm) — O/high (nhập liệu: S/medium)
**Dữ liệu** `content/rules/tue-bien.js` — một mục cho mỗi mã có trong `TT_PHYS`, `TT_DEST`, `TRAIT` mà bảng HN B §12.3–§12.5 có ghi tác dụng (mục "Không" thì không cần):
```js
// Nguồn chuẩn: TUE. Luật xử lý ở src/game/core2/38-tue-bien.js.
// y: cộng mỗi năm (đơn vị như aggFx: hpP, defP, atkP, matkP, mpP là %; ngo, tam, than, tp, crit, dodge là điểm)
// every: n năm mới cộng 1 lần (mặc định 1); capY: tối đa bao nhiêu lần cộng
// ev: biến cố mỗi năm {p, tamma:[a,b], healHp:[a,b], healMp:[a,b], tvPct, season, ifKill}
// vo: 'ngu' = tác dụng ngủ khi vô căn (linh lực, tu vi)
const TUE={
  man_luc_the:{y:{hpP:0.5,defP:0.3},capY:25,food:1.15,txt:'Mỗi năm khí huyết và sức chống chịu tăng thêm một chút.'},
  hoa_linh_the:{ev:{p:0.30,tamma:[3,6],healHp:[15,25]},y:{elP_hoa:0.2},cap:{elP_hoa:5},txt:'Tính khí nóng nảy: thường có năm đạo tâm chao đảo, nhưng khí huyết cũng sôi trào, hồi ngay một phần khí huyết. Hỏa khí dày thêm một chút.'},
  thong_tue_the:{y:{ngo:1},every:5,capY:4,txt:'Hiểu chuyện nhanh thêm một chút.'},
  // … đủ các mục có tác dụng ở HN B §12.3 (33 thể chất), §12.4 (74 khí vận), §12.5 (18 mệnh cách), cộng 4 thể chất + 10 khí vận mới ở HN A.6
};
const TUE_CAP={hpP:20,defP:15,atkP:15,matkP:15,mpP:15,ngo:6,tam:6,than:6,tp:6,crit:6,dodge:6,lifeY:15};
```
Mã khóa phải khớp đúng `id` trong `TT_PHYS` (vd `man_luc_the`, `hoa_linh_the`), `TT_DEST` (vd `yeu_menh`) và `TRAIT` (vd `hoalinh`). Mệnh cách `hoalinh` và thể chất `hoa_linh_the` cùng loại → ghi `same:'hoa_linh_the'` ở mục `hoalinh`.

**Luật** `src/game/core2/38-tue-bien.js`:
```js
function tueSrc(r){return [].concat((r.the||[]).map(id=>({id,k:'the'})),(r.kv||[]).map(id=>({id,k:'kv'})),r.trait?[{id:r.trait,k:'tr'}]:[]);}
function tueYear(age){const r=G.run;if(!r)return;r.tue=r.tue||{last:ageY(r),sum:{},n:{}};
  const old=r.age>=S().life*0.7;const seen=new Set();const lines=[];
  for(const s of tueSrc(r)){const D=TUE[s.id];if(!D)continue;const key=D.same||s.id;if(seen.has(key))continue;seen.add(key);
    if(D.y&&!old){const n=r.tue.n[s.id]||0;const every=D.every||1;if((!D.capY||n<D.capY)&&(age%every===0)){
      for(const [k,v] of Object.entries(D.y)){if(D.vo==='ngu'&&isVo())continue;const capSrc=(D.cap||{})[k]??Infinity;
        const cur=r.tue.sum[k]||0;const capAll=TUE_CAP[k.replace(/^elP_.*/,'elP')]??Infinity;
        r.tue.sum[k]=+Math.min(cur+v,capAll,capSrc*(1)).toFixed(3);}r.tue.n[s.id]=n+1;}}
    if(D.ev&&chance(D.ev.p*(D.same?1.1:1))&&(!D.ev.season||seasonOf(W().t)===D.ev.season)){tueEv(D.ev,s.id);lines.push(s.id);}}
  if(old)tueOld(r);dbg('tue.year',{age,ev:lines});}
function tueEv(E,id){const r=G.run;const s=S();
  if(E.tamma)r.tamma=clamp((r.tamma||0)+ri(E.tamma[0],E.tamma[1]),0,100);
  if(E.healHp)r.hp=Math.min(s.maxHp,r.hp+Math.round(s.maxHp*ri(E.healHp[0],E.healHp[1])/100));
  if(E.healMp&&!isVo())r.mp=Math.min(s.maxMp,r.mp+Math.round(s.maxMp*ri(E.healMp[0],E.healMp[1])/100));
  if(E.tvPct&&!isVo())addTv(E.tvPct);dbg('tue.ev',{id});}
function tueOld(r){r.tue.sum.hpP=(r.tue.sum.hpP||0)-1;} // tuổi già: khí huyết −1%/năm (HN B §12.6)
// mốc "qua năm": chạy đúng một lần cho mỗi tuổi, kể cả khi nhảy nhiều năm
{const _at=advanceTime;advanceTime=function(h){const o=_at.apply(this,arguments);const r=G.run;if(!r||!feat('tue'))return o;
  r.tue=r.tue||{last:ageY(r),sum:{},n:{}};let guard=0;
  while(G.run&&ageY(G.run)>G.run.tue.last&&guard++<6000){G.run.tue.last++;tueYear(G.run.tue.last);}return o;};}
// cộng tuế biến vào chỉ số
{const _ag=aggFx;aggFx=function(){const fx=_ag();const r=G.run;if(!r||!r.tue)return fx;
  for(const [k,v] of Object.entries(r.tue.sum)){if(k.startsWith('elP_')){const e=k.slice(4);fx.elP=fx.elP||{};fx.elP[e]=(fx.elP[e]||0)+v;}else fx[k]=(fx[k]||0)+v;}return fx;};}
```
- Kiểm tên các khóa chỉ số trong `aggFx` bằng `grep -n "fx\.\(hpP\|defP\|ngo\|tam\|than\|tp\|crit\|dodge\)" -r src/game/core | head` trước khi đặt tên trong `TUE`; sai tên thì cộng vào khóa không ai đọc (lỗi im lặng, xem L12).
- Tooltip: nơi hiện mô tả thể chất / khí vận (`src/react/hop-thoai/KhiVan.jsx`, `src/react/bang/NhanVat.jsx`; `grep -n "description\|\.d\b" `) thêm dòng *"Theo năm tháng: "* + `TUE[id].txt`.
- Bật `FEAT.tue=1`.
- **Kiểm tra** `tue_bien`:
  - Gán `r.the=['man_luc_the']`, trôi 10 năm → `r.tue.sum.hpP===5`; trôi thêm 40 năm → không vượt `0.5×25`.
  - Gán `r.the=['hoa_linh_the']`, đặt `r.hp=1`, ép `chance=()=>true` trong khối thử → sau 1 năm `r.hp>1` và `r.hp<=S().maxHp`.
  - Nhảy 30 năm một lần (`advanceTime(30*HY)`) → `NK.count('tue.year')===30`.
  - Lưu rồi tải lại (gọi `JSON.parse(JSON.stringify(G))`) → không áp lại năm cũ.
  - `test-ui` `tuebien`: tooltip có "Theo năm tháng" và **không có chữ số**.

#### Đ2.8 Rà chéo đợt 2 — F/high

---

### Đ3 — Tiền tệ, ăn uống, việc làm thuê, gia đình cơ bản

Thiết kế: HN A.7; Phần B §6; Phần C §12 (B.2, B.3).

#### Đ3.1 Bạc — O/high
- Trường `r.bac` (đơn vị **đồng**; 1 quan = 1.000 đồng; **1 linh thạch = 100 quan = 100.000 đồng**).
- Hàm `fmtBac(d)` → `"3 quan 200 đồng"`; `bacAdd(d,why)` có `dbg('tien.bac')`.
- Tiền khởi đầu theo xuất thân: thêm trường `bac` vào `ORIGIN` / `origins.json` (S/medium). Mức đề xuất: khốn khó 0–300, thường 500–1.500, khá giả 5.000–20.000 đồng. **Linh thạch khởi đầu của phàm nhân đặt về 0** (trừ con thế gia 1–2) — bọc `newRun`: `r.st = og.lt||0` khi `feat('tien')`.
- HUD (`src/react/ban-do/Hud.jsx`): ô Hầu bao hiện linh thạch + bạc.
- `run2` cờ `_bacV1`: bản lưu cũ `r.bac=0` (giữ linh thạch cũ).

#### Đ3.2 Giá quán phàm bằng bạc — O/high
- `grep -n "stoneBase\|function price" -r src/game content/venues` để tìm chỗ tính và trừ tiền dịch vụ. Thêm trường `bac` (đồng) cho các dịch vụ ở quán phàm trong `content/venues/services.json`, theo bảng giá HN C §12 B.2–B.3 (vd phòng trọ khóa cửa 12, giường tập thể 6, bữa ăn 13).
- Bọc hàm trả tiền: dịch vụ có `bac` → trừ `r.bac`; thiếu bạc mà có linh thạch → đổi tự động **một** linh thạch ra 90 quan (giá bán vào tiền trang) kèm lời báo; không có gì → nút bị khóa với chữ "Không đủ tiền".
- Hàng phàm ở tạp hóa: bản chép tay tâm pháp (`core2/10…:59`, giá `price(15)` linh thạch) **phải** có giá bạc (đề xuất 800 đồng) — nếu không, người mới kiếp đầu không mua nổi (lỗi chắc chắn L11).

#### Đ3.3 Tiền trang — O/medium
- Hành động địa điểm `tientrang` ở `thanh`, `cho`: thêm vào `PGROUP` nhóm `Mua bán` (`src/game/ui/08-cac-canh-hien-de.js:12`), bọc `placeActs` + `placeAct` (mẫu ở `core2/07-dot-10-tho-nap.js:93`).
- Mua linh thạch 110 quan, bán 90 quan; mỗi tiền trang đổi tối đa 3 linh thạch/tháng (lưu ở `W().tientrang[nodeId]={m,n}`).

#### Đ3.4 Cống hiến theo thế lực — O/high
- Hiện tại: `r.ch` là **một số chung** (`core2/03-cong-hien-tong-mon.js` dòng 4, 5, 19, 23, 33). Đổi thành `r.chMap={ '<khóa thế lực>': {v, dong:0|1} }`.
- Hàm `chKey()` = `'sect:'+contentSectName()` (hàm có ở `data/05-content-runtime.js:52`); `chGet(k)`, `chAdd(k,x)`.
- Sửa thân các hàm trong `core2/03`: `r.ch` → `chGet(chKey())` / `chAdd(chKey(),…)`. `needList` dòng 19 đọc `chGet`.
- `run2` cờ `_chV1`: `r.chMap={[chKey()]: {v:r.ch||0}}` nếu đang trong tông; xóa `r.ch`.
- Rời tông tự nguyện → `dong=1`; bị trục xuất → xóa khóa. (Tìm chỗ rời tông: `grep -rn "tongmon=0\|flags.tongmon=" src/game content/hooks.js`.)
- **Kiểm tra** `tien_te`: cống hiến tông A không dùng được khi đứng ở tông B; bản lưu cũ có `r.ch=30` → sổ của tông hiện tại = 30.

#### Đ3.5 Thưởng Lệnh và Thưởng Các — O/high (giao diện S/medium)
- `r.thuongLenh`, `r.thuongTong`. Cộng thẻ ở `questWin` (`core/11-doi-cong-phap.js:172`) và `questArrive` (dòng ~165) theo bậc nhiệm vụ (`QST` 6 bậc → 1/2/3/5/8/12). Bỏ / trễ: −1 (ở `questCancel` `core2/08…:35` và nhánh trễ hạn `core/11…:131`).
- Bậc Thưởng Các theo `r.thuongTong`: 0/20/60/150/400.
- Cửa hàng: hành động `thuongcac` cạnh `board`; hộp thoại React mới `src/react/hop-thoai/ThuongCac.jsx` (đăng ký trong `src/react/hop-thoai/index.js`), dữ liệu `content/venues/thuong-cac.js` = bảng HN B §6.1.3 (bỏ Khai Linh Đan, thêm "Manh mối cơ duyên" theo HN A.3). Giới hạn tháng lưu ở `W().thuongCac[nodeId]`.
- Hành động mua: `ACT.tcBuy(i)` trong `src/game/ui/24-dau-thai.js` hoặc file ui mới.

#### Đ3.6 Ăn uống — O/high
- Trường `r.no` (0–100), `r.doi` (số ngày đói liên tiếp), `r.anMuc` (`dam|thuong|kha`), `r.anTu` (tự lo cơm, mặc định 1).
- Ai phải ăn: `needFood(r) = r.pham || (r.realm===0 && !r._inBq)`; Luyện Khí ăn nửa phần (mỗi 2 ngày một phần); Trúc Cơ trở lên: không.
- Bọc `advanceTime`, cộng giờ vào `r.anAcc`; mỗi 24 giờ gọi `anDay()` (tối đa 400 ngày theo từng ngày; phần vượt tính gộp theo tháng: trừ tiền ăn cả tháng nếu đủ, không thì tăng `doi`).
- `anDay()`: nếu `!needFood` → bỏ. Ở nút có quán + `r.anTu` + đủ bạc → trả theo mức, `no=100`, `doi=0`. Không thì ăn lương khô trong túi (mã `luong_kho`, 1 gói = 5 ngày). Không có gì → `doi++`.
- Tác dụng theo HN B §6.3: đói (1 ngày) hồi phục −50%; đói lả (3) khí huyết tối đa −20%; kiệt sức (7) −5% khí huyết/ngày; **15 ngày → `die('doi')`** — chỉ khi không ở trong trận (`r.scene.type!=='combat'`).
- Thêm tiêu đề nguyên nhân chết `doi` vào bảng `title` trong `die` (`core/10-quan-ai.js:128`) và vào `content/text`.
- **Kiểm tra** `com_ao`: phàm nhân không tiền, không lương khô, đứng ở hoang dã, trôi 14 ngày → còn sống, `doi===14`; trôi thêm 1 ngày → chết, nguyên nhân `doi`. Tu sĩ Trúc Cơ trôi 100 ngày → `doi===0`.

#### Đ3.7 Việc làm thuê — O/medium (dữ liệu S/medium)
- Dữ liệu `content/venues/viec-thue.js`: 14 việc ở HN B §6.5, **tiền công chia 3** (HN A.7), mỗi việc `{id,n,noi:[loại nút],h,cong:[min,max],dk,ruiRo:{p,hau}}`.
- Hành động địa điểm `muusinh` (nhóm mới `['Mưu sinh',['muusinh']]` trong `PGROUP`) mở hộp thoại danh sách việc hợp nơi; chọn việc → `advanceTime(h)` rồi `bacAdd`; rủi ro theo `ruiRo`. Giới hạn 12 giờ làm mỗi ngày (`r.lamNgay`).
- `dbg('viec.xong',{id})` — dùng cho tân thủ HD05.

#### Đ3.8 Gia đình cơ bản — O/medium
- `r.family=[{ten,qh:'cha'|'me'|'anh'|'chi'|'em',tuoi,suc:'khoe'|'yeu'|'benh',thai:'thuong'|'lanh'|'ghet',song:1,lc:0|1}]` sinh trong bọc `newRun` theo nhóm xuất thân (mồ côi, khất cái, bị bỏ: rỗng).
- Mỗi năm (gọi từ `tueYear`): tăng tuổi; người già trên 60 mỗi năm 8% chết → ghi nhật ký + sự kiện tang (Đ9 viết chữ).
- Hiện ở bảng Giao tình (`src/react/bang/GiaoTinh.jsx`) mục "Người nhà".

#### Đ3.9 Rà chéo đợt 3 — F/high

---

### Đ4 — 27 nhiệm vụ tân thủ (chỉ kiếp đầu)

Thiết kế: HN A.12; Phần C §11 D1–D4 (18 nhiệm vụ HD01–HD18); Phần B §13 (giao diện, HD19–HD27 lấy từ B).

#### Đ4.1 Dữ liệu — S/medium
`content/rules/tan-thu.js`:
```js
// Nguồn chuẩn: TUT. Luật xử lý ở src/game/core2/39-tan-thu.js.
// g: nhóm mở (A tuần tự từng cái; B..G mở theo nhóm, tối đa 3 cùng lúc)
// need: số lần cần; tick: loại sự kiện đếm; st: trạng thái tự xong (hàm tên chuỗi, gọi bằng tutState)
// go: dẫn đường {panel}|{place:[loại nút], act}|{modal}|{hud}
// rw: phần thưởng {bac, st, pill:[[mã,sl]], relic:'mã', item:[[mã,sl]], lenh}
const TUT=[
 {id:'HD01',g:'A',n:'Biết mình còn gì',d:'Mở bảng nhân vật, đọc tuổi và xuất thân.',need:1,tick:'panel:char',go:{panel:'char'},rw:{item:[['luong_kho',2]]}},
 {id:'HD02',g:'A',n:'Một đường còn hé',d:'Xem linh căn của kiếp này.',need:1,tick:'rootinfo',go:{panel:'char'},rw:{bac:200}},
 {id:'HD03',g:'A',n:'Có ăn mới có ngày mai',d:'Mở túi, xem mình còn no hay đói.',need:1,tick:'bag',go:{modal:'bag'},rw:{pill:[['hoixuan',1]]}},
 {id:'HD04',g:'A',n:'Hỏi một người còn chịu trả lời',d:'Hỏi việc kiếm bữa ăn quanh đây.',need:1,tick:'jobs.open',go:{place:['tran','thanh'],act:'muusinh'},rw:{bac:300}},
 {id:'HD05',g:'A',n:'Đổi một ngày lấy một ngày',d:'Làm trọn một việc có trả công.',need:1,tick:'job',go:{place:['tran','thanh'],act:'muusinh'},rw:{item:[['luong_kho',2]]}},
 {id:'HD06',g:'A',n:'Khép mắt khi còn nơi nằm',d:'Nghỉ một lượt ở chỗ an toàn.',need:1,tick:'rest',go:{place:['tran','thanh'],act:'inn'},rw:{pill:[['hoixuan',1]]}},
 {id:'HD07',g:'B',n:'Đường đi có giá',d:'Đi tới một địa điểm lân cận.',need:1,tick:'arrive',go:{place:'*'},rw:{relic:'non_dauap_suong'}},
 {id:'HD08',g:'B',n:'Đếm trước khi trao',d:'Mua hoặc bán một món.',need:1,tick:'trade',go:{place:['tran','thanh'],act:'taphoa'},rw:{bac:500}},
 {id:'HD09',g:'B',n:'Đừng chỉ trông vào may',d:'Học một bài quyền nhập môn hoặc một tâm pháp.',need:1,tick:'learn',st:'tutHasLearn',go:{place:['tran','thanh'],act:'taphoa'},rw:{pill:[['tukhi',1]]}},
 {id:'HD10',g:'C',n:'Trước khi bước vào bụi tối',d:'Mang một món binh khí và một thứ cầm máu.',need:2,tick:'prep',st:'tutPrep',go:{modal:'bag'},rw:{relic:'giap_giap_thach_diem'}},
 {id:'HD11',g:'C',n:'Đối mặt, rồi còn trở về',d:'Săn yêu thú vừa sức năm lần.',need:5,tick:'hunt',go:{place:['rung','nui'],act:'sanyeu'},rw:{bac:1000,pill:[['hoixuan',2]]}},
 {id:'HD12',g:'C',n:'Thân này không tự lành',d:'Chữa một vết thương.',need:1,tick:'heal',st:'tutHealthy',go:{place:'*',act:'heal'},rw:{pill:[['giaidoc',2]]}},
 {id:'HD13',g:'D',n:'Một hơi thở cũng tốn đời',d:'Luyện võ hoặc tĩnh tọa một lượt.',need:1,tick:'train',go:{place:'*',act:'tinh'},rw:{pill:[['tinhnguyen',1]]}},
 {id:'HD14',g:'D',n:'Giữ lấy thứ còn sửa được',d:'Làm hoặc sửa một món đồ.',need:1,tick:'craft',go:{panel:'craft'},rw:{pill:[['dinhthan',1]]}},
 {id:'HD15',g:'D',n:'Có người nhớ mặt',d:'Kết một mối quan hệ hai chiều.',need:1,tick:'bond',go:{panel:'bonds'},rw:{bac:500}},
 {id:'HD16',g:'E',n:'Việc đã làm còn để lại gì',d:'Đọc lại sổ nghiệp duyên.',need:1,tick:'nqlog',go:{panel:'journal'},rw:{bac:300}},
 {id:'HD17',g:'E',n:'Chọn việc, chưa cần chọn cả đời',d:'Nhận một vai: học việc, vào tông, đầu quân hay theo võ quán.',need:1,tick:'role',go:{place:['tong','thanh']},rw:{pill:[['tukhi',2]]}},
 {id:'HD18',g:'E',n:'Viết một điều mình muốn',d:'Chọn một nguyện vọng cho kiếp này.',need:1,tick:'wish',go:{panel:'char'},rw:{pill:[['kimcang',1]]}},
 {id:'HD19',g:'F',n:'Dẫn khí nhập thể',d:'Bước vào Luyện Khí.',need:1,tick:'phamup',st:'tutNotPham',go:{place:'*',act:'tinh'},rw:{pill:[['hoixuan',2],['tukhi',2]]}},
 {id:'HD20',g:'F',n:'Bảng treo thưởng',d:'Xong một nhiệm vụ bảng treo thưởng.',need:1,tick:'quest',go:{place:['tran','thanh'],act:'board'},rw:{lenh:3}},
 {id:'HD21',g:'F',n:'Lịch luyện',d:'Đầy lịch luyện một tầng.',need:1,tick:'llfull',st:'tutLlFull',go:{panel:'char'},rw:{pill:[['tinhnguyen',1]]}},
 {id:'HD22',g:'G',n:'Động phủ đầu tiên',d:'Khai một động phủ.',need:1,tick:'khaiphu',go:{place:['nui','dong'],act:'khaiphu'},rw:{relic:'tran_tran_ky_noan_sa'}},
 {id:'HD23',g:'G',n:'Bế quan',d:'Bế quan cộng dồn ba mươi ngày.',need:30,tick:'bqday',go:{hud:'hudBq'},rw:{pill:[['tukhi',3]]}},
 {id:'HD24',g:'G',n:'Bạn đồng hành',d:'Ấp nở một linh thú.',need:1,tick:'hatch',go:{panel:'pets'},rw:{pill:[['tukhi',2]]}},
 {id:'HD25',g:'H',n:'Đi xa',d:'Tới một đại khu vực khác.',need:1,tick:'region',go:{place:['tram'],act:'tram'},rw:{pill:[['thanhanh',2]]}},
 {id:'HD26',g:'H',n:'Trước cửa Trúc Cơ',d:'Mở bảng chuẩn bị đột phá Trúc Cơ.',need:1,tick:'prepbt',go:{place:'*',act:'bt'},rw:{pill:[['homach',1]]}},
 {id:'HD27',g:'H',n:'Trúc Cơ',d:'Đột phá Trúc Cơ thành công.',need:1,tick:'trucco',go:{place:'*',act:'bt'},rw:{pill:[['phacanh',1]],st:50}},
];
const TUT_GRAD=22, TUT_GRAD_PTS=5, TUT_MAX=3;
```
Mã `luong_kho` là món mới của Đ3.6. HD25 dẫn tới nút có hành động `tram` (trạm dịch, nhóm "Đi lại" của `PGROUP`): tìm loại nút có hành động này bằng `grep -n "'tram'" -r src/game/core src/game/core2` rồi sửa `place` của HD25 cho đúng loại nút (đừng nhầm với `tran` là thôn trấn).

#### Đ4.2 Luật — O/high
`src/game/core2/39-tan-thu.js`:
- Tạo `r.tut={open:[],done:{},skip:{},prog:{},hide:0}` trong bọc `newRun` **chỉ khi `r.kiep===1`** (newRun đã tăng `G.meta.nlife` trước khi bọc chạy, nên dùng `r.kiep`, **không** dùng `nlife===0`).
- `tutFill()`: nếu nhóm A còn nhiệm vụ chưa xong / chưa bỏ → `open` chỉ có cái đầu tiên của A. Hết A → lấy lần lượt theo thứ tự mảng, tối đa `TUT_MAX`, chỉ thêm khi hàm điều kiện `st` (nếu có) chưa tự xong. Nhiệm vụ có `st` mà đã đạt → đánh dấu xong ngay (chờ nhận thưởng).
- `tutTick(kind,n=1)`: với mọi nhiệm vụ đang mở có `tick===kind`, tăng `prog`, chạm `need` thì đánh dấu `ready`. `dbg('tut.tick',{kind})`.
- `tutClaim(id)`: trao thưởng qua `applyE` (`pill`), `gainRelic`/`uniqueRelic` (relic), `bacAdd`, `r.thuongLenh+=`; đánh dấu `done`; `tutFill()`.
- `tutSkip(id)`: đánh dấu `skip` (không thưởng); `tutFill()`.
- Kết kiếp: bọc `die` — nếu `r.tut` và số `done` ≥ `TUT_GRAD` → cộng `TUT_GRAD_PTS` điểm luân hồi vào bảng điểm (`calcPts` ở `core/10-quan-ai.js` — bọc hàm này, thêm dòng "Tân thủ tốt nghiệp").
- Gắn điểm đếm (mỗi chỗ một dòng `tutTick(...)` trong khối bọc; tìm hàm bằng `grep`):

| `tick` | Gắn ở |
|---|---|
| `panel:char`, `panel:craft`… | bọc `ACT.panel` (ui) |
| `rootinfo` | khi mở tooltip/hộp giải thích linh căn (Đ2.4) |
| `bag` | hành động mở túi (`grep -n "data-act" src/react/ban-do/Hud.jsx` tìm nút túi) |
| `jobs.open`, `job` | Đ3.7 (`dbg('viec.xong')`) |
| `rest` | bọc `placeAct` khi `a==='inn'` hoặc `a==='tinh'` chạy xong |
| `arrive` | bọc `arrive(id)` khi `id` khác nút xuất phát |
| `trade` | hàm mua / bán ở cửa hàng (`grep -n "function buy\|function sell" -r src/game`) |
| `learn` | bọc `tpLearn`, `gainSkill`, học võ (Đ5) |
| `prep`, `heal`, `train`, `craft`, `bond` | trang bị (`grep -n "function equip"`), chữa thương (`grep -n "wounds" src/game/core2/23-thuong-the.js`), `placeAct('tinh')`/luyện võ, hàm luyện chế (`grep -n "craft" src/game/core2/*.js`), `ACT.favGift`/`ACT.relMake` |
| `hunt` | kết quả thắng của trận khởi từ `placeAct('sanyeu')` (`grep -n "sanyeu" src/game/core*/*.js`) |
| `nqlog` | mở thẻ Nghiệp duyên ở Sổ tay (Đ1.7) |
| `role` | vào tông (`r.flags.tongmon` chuyển 1), nhận học việc / đầu quân (Đ5) |
| `wish` | chọn nguyện vọng — tạo bộ chọn tối thiểu 10 nguyện vọng ở HN A.9.3 trong bảng nhân vật (`r.wish`) |
| `phamup` | bọc `phamUp` khi `r.pham` chuyển 0 |
| `quest` | `questWin`, `questArrive` |
| `llfull` | kiểm mỗi lần `advanceTime`: `llOf()>=LL_BT` |
| `khaiphu`, `bqday`, `hatch`, `region` | `placeAct('khaiphu')`; số ngày bế quan (`r._inBq` + giờ trôi); hàm ấp nở (`ACT.petHatch`); đổi `r.region` |
| `prepbt`, `trucco` | `openPrep`; bọc `btFinish` khi `to===1` |

#### Đ4.3 Giao diện — S/medium
- Component `src/react/chung/TanThu.jsx`, gắn vào `src/react/ban-do/Hud.jsx` (chỉ vẽ khi `G.run.tut && !G.run.tut.hide`). Nút nhỏ "Tân thủ (n)" luôn hiện khi có `G.run.tut` để ẩn / hiện (`ACT.tutHide`).
- Mỗi thẻ: tên, câu mô tả, thanh tiến độ "x/y", phần thưởng (tên món lấy từ `PILL[mã].n`, tên trang bị từ danh mục), nút "Nhận thưởng" khi xong, chữ nhỏ "Bỏ qua".
- Hành động (file `src/game/ui/25-tan-thu.js`, ghi sau `ui/24-dau-thai.js`): `ACT.tutGo(id)`, `ACT.tutClaim(id)`, `ACT.tutSkip(id)` (lần 1 mở hộp xác nhận, lần 2 mới bỏ — theo mẫu `UI.confirm` của `ACT.newGame` ở `ui/19-main.js:286`), `ACT.tutHide()`.
- Hộp xác nhận: tiêu đề "Bỏ qua nhiệm vụ?", nội dung "Bỏ qua «{tên}» thì sẽ không nhận lại phần thưởng của nhiệm vụ này.", nút "Bỏ qua" / "Giữ lại".
- `ACT.tutGo`: đang trong trận hoặc sự kiện → `note('Xong việc trước mắt đã.')`. `go.panel` → `UI.panel=...`. `go.modal` → mở đúng hộp. `go.place` → tìm nút gần nhất có loại phù hợp **và đã thấy** (`n.fog>=1`) rồi gọi `ACT.noteGo(n.id)` (có sẵn ở `ui/19-main.js:180`: chọn nút + đưa camera tới); không có thì `note('Chưa biết nơi nào như thế quanh đây.')`. Có `go.act` → đặt `UI.tutFlash={sel:'[data-act="pact"][data-arg="'+act+'"]',until:Date.now()+3000}`.
- Nhấp nháy: bọc `render` (`ui/19-main.js:14`): sau khi vẽ, nếu `UI.tutFlash` còn hạn thì `document.querySelectorAll(sel).forEach(e=>e.classList.add('tut-flash'))`. Thêm lớp `.tut-flash` (viền sáng nhấp nháy) vào `src/game/style.css`.

#### Đ4.4 Kiểm tra
- `tools/test.js` `tan_thu`: kiếp 1 có `r.tut`, `open.length===1` (HD01); `tutTick('panel:char')` + `tutClaim('HD01')` → `open` là `['HD02']`; xong A → `open.length===3`; `tutSkip` không cộng thưởng; kiếp 2 (`fresh('G.meta.nlife=1')` rồi đầu thai lại) **không** có `r.tut`.
- `tools/test-ui.js` `tanthu`: khung hiện; bấm "Bỏ qua" mở hộp đúng chữ; bấm thẻ HD01 mở bảng nhân vật; nút ẩn làm khung biến mất.

**Lỗi dự đoán**: L13 (không có nơi phù hợp quanh nhân vật), L14 (đếm trùng khi tải lại).

---

### Đ5 — Võ học phàm nhân, khung nghề, 5 nghề đầu, năng lực hỗ trợ

Thiết kế: HN A.8; Phần B §7.2–§7.3; Phần C §6 "Đại đạo ba ngàn" (PM01–PM18), §12 B.1, B.4.

#### Đ5.1 Võ học — O/high
- `r.vo={bac:0..5,xp:0,noi:0}`; bảng `content/rules/vo-dao.js`: `VO_BAC` 6 bậc (tên, hệ số sức mạnh, điều kiện lên bậc) theo HN B §7.3; `VO_HOC` 14 bí tịch (mã, tên, loại, bậc cần, chiêu).
- Chiêu võ thêm vào `content/items/sk-raw.js` theo đúng định dạng `[id, tên, hệ, bậc, chi_phí, fx, lời]` (ví dụ có sẵn: `['ngukiem','Ngự Kiếm Thuật','vo',1,6,{p:1.35},'…']`), hệ `'vo'`, thêm cờ `vo:1` trong `fx` để nhận diện chiêu võ.
- **Nội lực dùng chung thanh linh lực**: bọc `S()` — nếu `r.pham` (gồm vô căn) và `r.vo` → `s.maxMp = noiMax(r.vo.bac)`; nhãn thanh đổi thành "Nội lực" ở giao diện khi `r.pham`.
- Chặn pháp thuật khi `r.pham`: bọc hàm chọn chiêu dùng được (`grep -n "function usableSk\|function canUse\|readyPlayer" src/game/core/07-vong-lap-tran.js`): phàm nhân chỉ dùng chiêu có `fx.vo` hoặc chiêu cơ bản.
- **Chiêu võ không được mất khi `syncSkills()` dựng lại** (CLAUDE.md: `syncSkills` dựng `r.skills` từ công pháp) → giữ danh sách `r.voSk=[mã…]`, bọc `syncSkills` để nối `r.voSk` vào sau khi gốc chạy (lỗi chắc chắn L15).
- Hành động `luyenvo` (6 giờ) ở mọi nút, nhóm `Tu luyện` trong `PGROUP`; `tutTick('train')`.
- Bí tịch võ: vật truyện trong `qitems.json`, dùng ở túi → `r.voSk.push(chiêu)`.
- **Kiểm tra** `vo_dao`: vô căn luyện võ đủ giờ → `r.vo.bac` tăng; `syncSkills()` không xóa chiêu võ; vô căn không dùng được chiêu pháp thuật.

#### Đ5.2 Khung nghề — F/high
- Bảng `content/rules/nghe.js`:
  ```js
  // Nguồn chuẩn: NGHE. Luật xử lý ở src/game/core2/40-nghe.js.
  // ranks: 6 bậc danh vị; xp: ngưỡng kinh nghiệm lên bậc; acts: việc lặp; up: mã sự kiện thăng bậc (kỳ ngộ sp:1)
  const NGHE={
    nong:{n:'Nông dân',ranks:['Làm thuê','Tá điền','Tiểu nông','Trung nông','Phú nông','Địa chủ'],xp:[0,60,200,600,1500,4000],
      acts:[{id:'gieo',l:'Gieo mạ',noi:['tran'],mua:'xuan',h:10,cong:[60,90],xp:6},{id:'gat',l:'Gặt lúa',noi:['tran'],mua:'thu',h:10,cong:[80,140],xp:8}],
      up:['ng_nong_1','ng_nong_2','ng_nong_3','ng_nong_4','ng_nong_5']},
    // … ngu, thuong, vo_gia (Chiến binh giang hồ), y (Y sư phàm) cho Đ5; 16 nghề còn lại ở Đ7
  };
  ```
- `r.paths={ma:{xp,bac,last}}`, tối đa 3 đường đang hoạt động, đường thứ 4 làm đường lâu không làm nhất "phai" (HN B §7.1). Vô căn: xp ×1,2. Tu sĩ: xp ×0,7.
- Hành động: mở rộng hộp `muusinh` (Đ3.7) thêm mục việc của nghề hợp nơi, mùa.
- Lên bậc: đủ xp → mở kỳ ngộ thăng bậc (`up[bac]`); xong kỳ ngộ mới tăng `bac`.
- Bảng nhân vật thêm thẻ "Đạo đồ" (tên đường, bậc, tiến độ bằng chữ).
- **Kiểm tra** `nghe`: làm việc `gieo` 10 lần đúng mùa → xp tăng; sai mùa → việc bị khóa; 4 đường → đường cũ nhất `phai`.

#### Đ5.3 Năm nghề phàm đầu — S/high (rà O/medium)
Nông dân, Ngư dân, Thương nhân, Chiến binh giang hồ, Y sư phàm: nhập `NGHE` theo HN B §7.2 (bậc, việc, thu nhập chia 3 theo A.7) + C §6 (vòng hành động, nút quyết định). Mỗi nghề 12 sự kiện viết theo schema `content/schemas/event.schema.json`, nguồn kích hoạt hợp (`explore`, `venue`), đặt ở `content/events/nghe/<ma>.json` và thêm vào `content/events/manifest.json`.

#### Đ5.4 Năng lực hỗ trợ ST23 — O/medium
- `r.nang={giac:10,giao:10,thuong:10,canh:10,duoc:10,khao:10,tu:10,nhan:10}` (giác quan, giao tế, thương lượng, cảnh giác, nhận dược, khảo vật, tự chủ, nhẫn nại) theo HN C §5.6 "Từ vựng năng lực".
- Mở rộng phép thử `chk` của sự kiện nhận `nang.<khóa>` (`grep -n "function chkRoll\|chk:" -r src/game/data src/game/core/06-su-kien.js`).

#### Đ5.5 Rà chéo đợt 5 — F/high

---

### Đ6 — Cải tạo linh căn

Thiết kế: HN A.3; Phần C §5.3 (CC01–CC08 và 23 vật tư CC-VT01–CC-VT23); Phần B §5.5.

#### Đ6.1 Bộ máy cải căn — F/high
- Bảng `content/rules/cai-can.js`: mỗi đường là một chuỗi bước:
  ```js
  // Nguồn chuẩn: CAI_CAN. Luật xử lý ở src/game/core2/41-cai-can.js.
  // b: bước — clue (nghe dấu vết), proof (kiểm chứng, cần n chứng cứ), gain (có vật / đủ điều kiện), serve (phục vụ h giờ ở nơi), ritual (nghi thức), result
  const CAI_CAN={
    CC01:{n:'Tái Mạch Đan',noi:'LOC10',tuoiCon:1,steps:[
      {b:'clue',ev:'cc01_clue'},{b:'proof',n:2,ev:['cc01_p1','cc01_p2']},
      {b:'serve',h:18*HM,noi:'LOC10',ev:'cc01_serve'},{b:'gain',item:[['ho_mach_tan',3]]},
      {b:'ritual',h:7*HD,ev:'cc01_rite'},
      {b:'result',ok:0.75,out:{id:'tap',q:'thuong'},fail:{hpMaxPct:-5,flag:'seo_mach'}}]},
    // … CC02–CC08 theo HN C §5.3; 10 đường bổ sung theo HN A.3
  };
  ```
- `r.cc={id,step,start,proof:[]}`; chỉ một đường đang làm; `r.ccOk=1` khi đã thành công một lần trong kiếp (luật mỗi kiếp một lần).
- `anchorNode(code)` (Đ0.2) để tìm nơi; khi Đ8 xong, hàm trả đúng địa điểm neo.
- Nguồn có thật của thế giới: `W().ccSrc[CCxx]={con:1|0,hoi:năm_hồi}` — lấy xong thì `con=0` tới năm hồi (CC01: 20 năm; CC02: 120; CC04: 30; CC05: không hồi).
- Kết quả thành công: `r.root={id, els, q}` (els sinh như `genRoot` theo loại), `r.rootKnown=1`, `r.pham` giữ 1 (vẫn phải dẫn khí như thường), `dbg('cc.ok',{id})`.
- Sổ tay thêm thẻ "Cơ duyên" hiện bước đang làm + lời gợi ý (chữ, không số trừ thời gian).
- Trước bước `ritual` hiện xác nhận ghi rõ cái giá và khả năng thất bại bằng chữ ("bảy phần thành, ba phần hỏng").

#### Đ6.2 CC01 và CC03 trước — O/high (sự kiện S/high)
Hai đường người lao động làm được (HN A.3). Viết đủ sự kiện, vật tư `ho_mach_tan`, `mach_thao`, `cam_thach_phan`, năm vật nuôi căn CC-VT08–CC-VT12, công thức phụ theo HN C §5.3.

#### Đ6.3 CC02, CC04–CC08 rồi 10 đường bổ sung — O/high, S/high cho sự kiện

#### Đ6.4 Kiểm tra `cai_can`
Vô căn đi hết CC01 với kết quả ép thành công → `r.root.id==='tap'`, `isVo()===false`, `r.ccOk===1`; thử đường thứ hai trong cùng kiếp → bị từ chối; nguồn CC05 lấy rồi → kiếp sau `con===0`.

---

### Đ7 — 16 nghề tu lõi, 16 nghề phàm còn lại

Thiết kế: HN A.8; Phần C §10 (P.1–P.6: công pháp CP01–CP16, 48 chiêu SK01A–SK16C, hợp đồng, vật tư, công thức); Phần B §7.4–§7.5 (luật ghép pháp môn).

#### Đ7.1 Đối chiếu từ vựng hiệu ứng chiêu — O/high
- Viết `tools/liet-ke-fx.js`: in mọi khóa `fx` đang có trong `SK_RAW` (`content/items/sk-raw.js`) cùng số lần dùng, và mọi khóa mà `resolveSkill` đọc (`grep -n "fx\.\w" src/game/core/07-vong-lap-tran.js`).
- Lập bảng ánh xạ cách viết của C sang khóa có sẵn: "1,15 A" → `{p:1.15}` (công vật lý); "M" (pháp công) → chiêu dạng phép (`dt:'phep'`, mặc định khi không nằm trong `SK_PHYS`); hộ thể → khóa hộ thể có sẵn (tìm `shield|guard|ho` trong danh sách vừa in). Hiệu ứng **chưa có khóa** nào → ghi vào danh sách "fx mới", mỗi fx mới thêm một khối bọc `resolveSkill` trong `src/game/core2/42-fx-moi.js` (một hàm xử lý cho mỗi khóa, có `dbg('fx.<khóa>')`).
- Lưu bảng ánh xạ ở `docs/thiet-ke/anh-xa-fx.md` để các phiên sau dùng.

#### Đ7.2 Nhập 16 công pháp và 48 chiêu — S/high (rà O/medium)
- Chiêu → `SK_RAW` (mã giữ đúng `sk01a`… viết thường), bậc theo C (chiêu thần thông bậc 3 trở lên tung qua pháp tướng — CLAUDE.md).
- Công pháp → danh mục `content/catalog/arts.json` theo đúng định dạng mục có sẵn trong tệp đó (đọc 2 mục đầu làm mẫu); mỗi dòng công pháp mở chiêu bằng mã.
- Tài nguyên riêng (kiếm ý, huyết khí, hồn…) → `r.tuRes[mã]`, thanh hiển thị trong trận (`src/react/tran/TheNguoi.jsx`).
- Luật ghép / không ghép (HN B §7.5): kiểm khi học công pháp thứ hai.

#### Đ7.3 Mười sáu nghề phàm còn lại — S/high
Thêm vào `NGHE` (Đ5.2) theo HN A.8: PM02, PM04–PM06, PM08, PM10, PM11, PM13–PM18 của C + Thợ săn, Tiêu sư, Khất cái của B. Mỗi nghề 12 sự kiện.

#### Đ7.4 Kiểm tra `nghe_tu`
Học CP01 → có chiêu SK01A–SK01C sau `syncSkills()`; Phật pháp + Huyết thuật bị từ chối ghép; chiêu thần thông chỉ tung qua pháp tướng.

---

### Đ8 — Thế giới neo, đồng hồ, thời gian luân hồi, đất ma

Thiết kế: HN A.9.2, A.17; Phần C §6 (LOC01–LOC15, đường neo), §7 (NP01–NP30, FA01–FA10); Phần B §14.8–§14.9.

#### Đ8.1 Đặt 15 địa điểm neo — F/high
- Thế giới sinh ở `genWorld` / mở rộng bằng `extendWorld(G.meta.world)` (gọi trong `loadData`, `ui/20-chu-thich.js:62`). Bọc `extendWorld`: nếu `!w.anchorsV1` → với mỗi LOC chọn **một nút có sẵn** đúng đại khu (theo cột "đại khu" của C) và đúng loại gần nhất với `ANCHOR_FALLBACK`, đặt `n.anchor='LOC0x'`, đổi `n.name` sang tên neo; không tạo nút mới (tránh vỡ địa hình `MAPD`). Ghi `w.anchorsV1=1`.
- Bản lưu cũ: chạy lần đầu khi tải, cùng luật.
- `anchorNode()` của Đ0.2 tự trả đúng nút neo.
- **Kiểm tra** `neo`: thế giới mới có đủ 15 nút `anchor` khác nhau, mỗi cái đúng đại khu.

#### Đ8.2 Vai NPC có người kế — F/high
- `w.vai={NP01:{ten,g,tuoi,song:1,ke:[],noi:'LOC01',the:'FA..'}}` từ bảng C §7.
- Mỗi năm thế giới: tăng tuổi; quá thọ (phàm 60–80, tu sĩ theo cảnh giới) → chết → sinh người kế (tên mới, cùng vai, quan hệ ghi "con / học trò / người thay"), ghi `w.chron`.
- Mọi sự kiện cốt truyện gọi người qua `vaiNow('NP01')` (trả người đang giữ vai), **không** lưu tên cứng (HN A.17 luật 1).

#### Đ8.3 Mười thế lực — O/high
`w.fa={FA01:{n,tien,quan,dan,chu,trang:'song'|'suy'|'diet'}}` theo C §7 "Hồ sơ tài nguyên và sức duy trì"; nối sổ cống hiến (Đ3.4) dùng khóa `'fa:FA01'`.

#### Đ8.4 Mười bốn đồng hồ thế giới — F/high
- `content/world/thoi-cuc.js`: 14 đồng hồ theo HN A.9.2 (6 của C + 8 của B), mỗi cái `{id,ky:{nam|mua},dk,giaiDoan:[…],macDinh,anhHuong}`.
- `w.thoiCuc[id]={pha,tLast,ketQua:[]}`. Hàm `worldYear(y)` chạy mỗi năm thế giới (bọc `advanceTime` theo năm của `w.t`, độc lập với tuổi nhân vật).
- Khi người chơi không can thiệp: áp `macDinh` và ghi một dòng vào `w.suLuoc` (HN A.17 luật 3).

#### Đ8.5 Thời gian luân hồi + tua theo thập kỷ — F/high
- `src/game/core/12-dong-doi-tam-thoi.js:38`: `const yrs=ri(3,30);` → `const yrs=gapRoll(r);` (hàm mới: 3 kiếp đầu chỉ khoảng Gần; điều chỉnh theo nghiệp, tuyến — HN B §14.8).
- Tua: `worldCoarse(yrs*12)` hiện chạy **từng tháng** (mỗi tháng 3% đổi chủ một nút). Khi `yrs>60`: thay bằng `worldDecades(Math.ceil(yrs/10))` — mỗi thập kỷ: `flipNode()` 1 lần với xác suất 0,3; `nodeRecover()` 1 lần; `worldYear` gộp 10 năm (đồng hồ ngắn hơn thập kỷ chỉ chạy lần cuối, còn lại ghi Sử lược); `rivalsCoarse(120)` lặp, thay thiên kiêu đã chết **mỗi lần** (hiện chỉ thay một lần sau tua).
- Tuyến với người phàm đã chết → chuyển hậu duệ (50%) hoặc khép (HN B §14.8).
- **Kiểm tra** `khoang_luan_hoi`: 3 kiếp đầu khoảng ≤ 30 năm; ép khoảng 3.000 năm chạy dưới 2 giây; sau tua có `w.suLuoc` không rỗng; không còn thiên kiêu nào quá thọ mà vẫn sống.

#### Đ8.6 Đất ma — O/high
`w.maVuc=[{khu,ma:100}]`; mỗi thập kỷ −6 (×2 gần tông Phật/chính, ×0,5 khi ma tông chiếm); bậc theo HN B §14.9; hiệu ứng lên nút trong khu (nguy hiểm, tu luyện, thôn trấn biến mất ở bậc Ma vực).

#### Đ8.7 Rà chéo đợt 8 — F/high

---

### Đ9 — Bộ máy cốt truyện, 45 tuyến xuất thân, 9 đại lộ

Thiết kế: HN A.9.1, A.9.3; Phần C §6 (OR01–OR45, "Mô hình cốt truyện", "Khi người chơi giết NPC…", "Dữ liệu cốt truyện phải lưu"); Phần B §14.3.

#### Đ9.1 Bộ máy tuyến — F/high
- Schema mới `content/schemas/arc.schema.json`: một tuyến = `{id, loai:'xuat_than'|'dai_lo', mo:{origin|dk}, nut:[{id, dk, loiMoi:{cach:'thu'|'nguoi'|'tin'|'ky_ngo', noi:'LOCxx'|'here'}, han:{nam|thang}, cach:[≥3 lựa chọn], tuDien:{hieu_ung, su}, thayThe:{nguoi|vat}, dau:'cờ để lại'}], ket:[…]}`.
- Trạng thái `r.arc={xt:{id,nut,trang},dl:{id,hoi,nut,trang}}` — mỗi kiếp một tuyến xuất thân + một đại lộ chính.
- Lời mời: `kyStart` kỳ ngộ `sp:1`, hoặc sinh thực thể người tìm tới (`spawnEnt` có sẵn), hoặc tin đồn có dấu trên bản đồ (`UI.mark` / ghi chú địa điểm `noteGo`).
- Hạn mềm tính theo `W().t`; quá hạn → áp `tuDien`, ghi Sử lược, chuyển nhánh "Người đứng ngoài".
- Người giao việc đã chết → dùng `thayThe`; **không hồi sinh** (C §6).
- Bộ kiểm `tools/content-validate.js`: thêm kiểm tuyến (mọi nút có `tuDien`, ≥3 `cach` hoặc 2 + bỏ qua, mã LOC / NP / FA tồn tại).
- Sổ tay: thẻ "Mệnh thư" liệt kê nút đang mở + hạn bằng chữ.

#### Đ9.2 Viết 45 tuyến — S/high, mỗi phiên 3 tuyến (rà O/medium)
Chép đúng nội dung OR01–OR45 của C §6 sang `content/events/arcs/OR01.json`… theo schema; cảnh mở đầu riêng của xuất thân (3 cảnh / xuất thân).

#### Đ9.3 Chín đại lộ — O/high (bộ máy), S/high (nội dung)
Theo HN A.9.3: mở theo mốc; nếu tuyến xuất thân đã kể phần mở thì đại lộ bắt đầu từ hồi 2; hồi 3 và 5 chạm đồng hồ thế giới; mỗi nút ghi rõ khác nút nào của tuyến xuất thân (bộ kiểm cảnh báo trùng nhân vật + trùng mục tiêu).

#### Đ9.4 Kiểm tra `menh_tuyen`
Lỡ hạn → tự diễn → nhánh đứng ngoài, không kẹt; người giao việc chết → dùng người / vật thay thế; mỗi kiếp chuyển đại lộ tối đa một lần.

---

### Đ10 — Mộng Ấn, ba tri thức, nghi thức, tám kết thúc

Thiết kế: HN A.10; Phần C §6 "Thức tỉnh và tám kiểu kết thúc lớn", §9 (nghi thức); Phần B §14.7.

- `G.meta.mong=[mã Mộng Ấn]`; `G.meta.tri={TRI01:[nguồn…]}` — tri thức đạt khi có **hai nguồn độc lập** (HN A.10 bảng).
- Người Gác Bến: 6 hình dạng, mỗi kiếp hiện một lần (kỳ ngộ `sp:1`), thân phận mảnh ký ức Yêu Hoàng lộ dần; 2 cảnh với NP12 (HN A.10).
- Kết thúc: kiểm cổng END01–END08 theo C khi chết / quy ẩn / phi thăng / nghi thức; phi thăng khi chưa đủ ba tri thức → "Mộng trong mộng" (vẫn luân hồi). Màn kết mới trong `src/react/man-ngoai/` (đăng ký trong `src/react/main.jsx`), câu kết của C.
- Chế độ "Tân Mộng" sau END04: `newMeta()` mới nhưng giữ `G.meta.daTinh=1`.
- **Kiểm tra** `ket_thuc`: đủ ba tri thức + phi thăng → END04; thiếu → không kết, vẫn sang kiếp mới.

---

### Đ11 — Nghề tu mở rộng
Cổ sư, Thi tu, Phật tu, Nho tu, Thiên cơ sư, Thương tu; pháp môn Lôi pháp, Huyễn thuật, Thôn phệ (HN A.8, Phần B §7.4–§7.5). Cách làm như Đ7 (O/high cho fx mới, S/high cho dữ liệu). Kèm các vật phẩm / công pháp ngoại lệ luân hồi của HN A.16 (Định Mệnh Châu, Túc Tuệ Đăng, Luân Hồi Chuyển Thế Kinh, Bất Muội Linh Quang Quyết, Túc Mạng Thông, Khuy Mệnh) nếu chưa làm ở Đ2.5–Đ2.6.

---

### Đ12 — Độ khó và cân bằng

- **Áp số ban đầu (không cần bot)** — O/medium: `content/rules/bt-base.js` `BT_BASE=[0.45,0.36,0.28,0.20,0.14]`; trần tỉ lệ đột phá 0,88 (sửa `clamp(p,0.05,0.97)` ở `core/08-loi-kiep.js:78` → `0.88`). **Giữ ngoại lệ Cảm ngộ**: đủ `CN_MAX` lần thất bại thì vẫn chắc chắn qua (bài `camngo` đang kiểm điều này) — nếu bọc của Cảm ngộ nằm trước trần mới thì đặt trần ở khối bọc riêng, bỏ qua khi `btFail>=CN_MAX`; tu vi bế quan ×0,75, lịch luyện ×0,85; kẻ địch ×1,15 (HN B §4.2).
- **Đo bằng bot — chỉ khi người dùng yêu cầu** — F/high để đọc kết quả: `node bot.js 25 --quiet --smart`; so với chỉ tiêu HN B §4.1; thêm các tính năng mới vào `COV_FN` / `MANAGE` trong `tools/bot-ext.js` (CLAUDE.md).

---

## 5. Danh sách lỗi dự đoán

**Chắc chắn xảy ra** — đã có cách xử lý, làm luôn khi tới hạng mục:

| Mã | Lỗi | Khi nào | Cách xử lý |
|---|---|---|---|
| L1 | Chữ có tham số hiện nguyên `{{0}}` (**đang có sẵn**) | Mọi lúc | Đ0.1 |
| L2 | 477 chỗ `karma` trong sự kiện và 12 chỗ trong `hooks.js` mang nghĩa lẫn lộn chính tà / nhân quả | Đ1 | Bút toán tạm trong bọc `applyE` (Đ1.2) để game chạy ngay; rà từng lô ở Đ1.8 |
| L3 | Bản lưu cũ thiếu trường mới → React đọc `r.hd.log`, `r.tue.sum`… văng lỗi trắng màn | Đ1, Đ2, Đ3 | `run2` có cờ phiên bản cho từng hệ; React luôn đọc qua hàm `PS.hdName()`… (hàm tự `nqInit`), không đọc thẳng trường |
| L4 | `die()` chạy bên trong `advanceTime` → khối bọc phía sau dùng `G.run` đã `null` | Mọi bọc `advanceTime` | Sau khi gọi hàm gốc, luôn `const r=G.run;if(!r)return o;` và kiểm lại `G.run` trong vòng lặp năm |
| L5 | Nhảy thời gian dài (bế quan nhiều năm) làm vòng lặp theo năm / theo ngày quá lâu | Đ2.7, Đ3.6 | Có giới hạn vòng (6.000 năm, 400 ngày); phần vượt tính gộp |
| L6 | `worldCoarse` chạy từng tháng: khoảng luân hồi hàng ngàn năm treo máy và xáo tung bản đồ | Đ8.5 | Tua theo thập kỷ; **chỉ nới khoảng luân hồi sau khi có tua thập kỷ** |
| L7 | Vô căn vẫn được tặng tâm pháp sau `TP_Y` năm và có thể bị `phamUp` | Đ2.3 | Bọc `phamUp`, bọc khối tặng tâm pháp ở `core2/10…:62` |
| L8 | Nâng cấp `ky`, `kytp` đã mua trong bản lưu cũ vẫn mang ký ức sang kiếp sau | Đ2.6 | `migrateX` hoàn điểm và xóa khóa |
| L9 | React gọi `PS.karmaName` sau khi đổi hệ → hiện sai | Đ1.3 | Giữ hàm `karmaName`; đổi giao diện sang `hdName`/`ngName` |
| L10 | Thể chất suy ra từ `karma` lúc đầu thai (`ttPhys`) bị lệch khi đổi sang Hành Đạo | Đ1.5 | Gọi `nqInit` trước, dùng `hdLvIdx`; kiếp mới có mục sổ từ xuất thân nên nhãn không trống |
| L11 | Phàm nhân không mua nổi gì vì giá quán tính bằng linh thạch, mà 1 linh thạch = 100 quan | Đ3.1–Đ3.2 | Giá bạc cho mọi dịch vụ, hàng phàm, kể cả bản chép tay tâm pháp; linh thạch khởi đầu của phàm nhân về 0 |
| L12 | Cộng tuế biến vào khóa chỉ số không tồn tại → không có tác dụng mà không báo lỗi | Đ2.7 | `grep` tên khóa trong `aggFx` trước; bài kiểm tra so `S()` trước / sau |
| L13 | Nhiệm vụ tân thủ dẫn tới loại nơi không có quanh nhân vật | Đ4.3 | Chỉ chọn nút đã thấy; không có thì báo chữ; nhiệm vụ không hạn nên người chơi tự đi tìm |
| L14 | Đếm tiến độ tân thủ hai lần khi tải lại hoặc khi hàm bị gọi lặp | Đ4.2 | Đếm theo mã sự kiện duy nhất cho loại `arrive`, `hunt` (lưu `r.tut.seen`) |
| L15 | Chiêu võ, chiêu thêm tay bị `syncSkills()` xóa | Đ5.1, Đ7 | Danh sách riêng `r.voSk`, bọc `syncSkills` nối vào |
| L16 | Bot (`tools/bot-ext.js`, `bot-smart.js`) giả định ai cũng dẫn khí được, đọc `karma` | Đ1, Đ2 | Không chạy bot khi chưa được phép; khi được phép thì sửa bot trước (thêm vô căn, `COV_FN`) |
| L17 | Bài `test-ui` khởi động bằng nút `birth` rồi `lifeGo`; khi có trắc linh / tân thủ hiện ra ngay, kịch bản khởi động bị chặn | Đ2.4, Đ4 | Trong `boot()` của `test-ui.js` thêm bước đóng hộp thoại tân thủ / kỳ ngộ đầu kiếp, hoặc tắt bằng `?notut=1` |
| L18 | `genBirth` tạo nhiều thẻ, mỗi thẻ một linh căn | Đ2.2 | Mọi thẻ dùng chung linh căn từ kiếp 2 |

**Có thể xảy ra** — để mắt:

| Mã | Lỗi | Phòng |
|---|---|---|
| L19 | `S()` và `aggFx()` bị bọc quá nhiều lớp → chậm khi vẽ | Đo bằng `performance.now()` trong bài kiểm tra; nếu chậm, lưu đệm theo `W().t` + phiên bản trạng thái |
| L20 | Bản lưu phình to (sổ nghiệp duyên, sử lược, nhật ký) | Giới hạn độ dài (300 mục sổ, 60 dòng sử, gộp theo thế kỷ) |
| L21 | Lời hiển thị lọt chữ số ở Hành Đạo / Nghiệp Duyên / tuế biến | Bài `test-ui` kiểm `/\d/` cho các ô này |
| L22 | Thứ tự trong `thu-tu.json` sai → `ReferenceError` lúc nạp | Bảng dữ liệu luôn trước file luật; chạy `node tools/test.js nen` ngay sau khi thêm file |
| L23 | Hai đợt làm song song (Đ2 và Đ3) cùng bọc một hàm → đè nhau khi gộp | Gộp tuần tự, chạy lại toàn bộ bài sau mỗi lần gộp |
| L24 | Chữ mới đặt thẳng trong mã luật thay vì `content/text` | Rà soát kiểm `grep -n "'[A-ZÀ-Ỹ]" src/game/core2/3*.js` |
| L25 | Sự kiện tuyến dùng tên NPC cứng, người đó đã chết sau khoảng luân hồi dài | Luôn gọi `vaiNow()` (Đ8.2) |
| L26 | Nghiệp làm tỉ lệ vô căn tăng khiến người chơi ác bị "khóa" khỏi tu tiên nhiều kiếp | Trần 65%; theo dõi khi người dùng cho chạy bot |

---

## 6. Mẫu lệnh giao việc cho từng phiên AI

### 6.1 Lệnh làm một hạng mục
```
Đọc CLAUDE.md. Đọc docs/thiet-ke/LO-TRINH-PHAT-TRIEN.md phần 1 (quy ước) và hạng mục <MÃ, vd Đ1.2>.
Chỉ đọc thêm các mục của docs/thiet-ke/PHAN-TICH-HOP-NHAT.md mà hạng mục này trỏ tới.
Làm đúng hạng mục <MÃ>, không làm hạng mục khác, không sửa file ngoài danh sách nếu không bắt buộc (nếu bắt buộc thì nói rõ lý do trong báo cáo).
Thêm đúng các bài kiểm tra hạng mục ghi. Chạy: node tools/test.js <tên bài mới> và npm run test:rules (không chạy bot, không chạy smoke).
Nếu đụng giao diện: npm run build rồi node tools/test-ui.js <tên bài>.
Commit lên nhánh <NHÁNH> với lời commit "<MÃ>: <mô tả>". Báo cáo ngắn: đã làm gì, file nào, kết quả kiểm tra, việc còn lại, lỗi dự đoán nào đã gặp.
```

### 6.2 Lệnh rà soát (sau mỗi hạng mục giao cho Sonnet / Haiku) — dùng Opus 5.5 `medium`
```
Rà soát commit cuối trên nhánh <NHÁNH> cho hạng mục <MÃ> trong docs/thiet-ke/LO-TRINH-PHAT-TRIEN.md.
Đối chiếu: đúng phạm vi hạng mục; đúng quy ước phần 1 (bọc hàm, thu-tu.json, bản lưu cũ, contentText, không chữ số ở Hành Đạo/Nghiệp Duyên/tuế biến); dữ liệu khớp nguồn thiết kế được trỏ.
Chạy lại các bài kiểm tra của hạng mục và npm run test:rules. Sửa lỗi nhỏ ngay; lỗi lớn thì liệt kê, không tự làm lại cả hạng mục.
```

### 6.3 Lệnh rà chéo cuối đợt — dùng Fable 5.2 `high`
```
Rà chéo toàn bộ đợt <Đn> trên nhánh <NHÁNH> (git diff từ điểm bắt đầu đợt).
Tìm: lỗi lan giữa các hạng mục, chuỗi bọc hàm đè nhau, bản lưu cũ (thử tải một bản lưu tạo trước đợt), lỗi dự đoán L1–L26 liên quan, hiệu năng.
Chạy npm run test:rules, npm run content:check, npm run build, node tools/test-ui.js. Báo cáo theo mức nghiêm trọng; đề xuất có nên gộp vào main không.
```

---

## 7. Người giám sát (bạn) cần làm gì

Bạn không cần đọc mã. Việc của bạn là **giao việc, thử chơi, quyết định**.

### 7.1 Mỗi khi bắt đầu một hạng mục
1. Mở một phiên Claude Code mới.
2. Chọn model và mức nỗ lực đúng như hạng mục ghi (ví dụ "O/high" = Opus 5.5, mức `high`). Riêng Opus 5.5 nhớ chọn `high`, vì mặc định của nó thấp hơn.
3. Dán mẫu lệnh 6.1, thay `<MÃ>` và `<NHÁNH>`.
4. Chờ báo cáo. Báo cáo phải có: đã làm gì, kiểm tra qua hay hỏng. Thiếu thì hỏi lại: "Kiểm tra đã chạy chưa, kết quả thế nào?"
5. Hạng mục giao cho Sonnet hoặc Haiku: mở thêm một phiên Opus 5.5 `medium` và dán mẫu 6.2 để rà soát.

### 7.2 Cuối mỗi đợt
1. Mở phiên Fable 5.2 `high`, dán mẫu 6.3.
2. **Trước khi thử bản mới, lưu bản sao bản lưu của bạn** (trong game: chức năng xuất bản lưu ra chuỗi ký tự, chép vào một tệp ghi chú).
3. Mở `phu-sinh.html` bản mới, thử theo danh sách dưới. Gặp lỗi thì báo cho AI: *đã làm gì → mong gì → thấy gì*; kèm nhật ký gỡ lỗi (mở game với `?debug=1` ở cuối địa chỉ, hoặc bật trong Cấu hình, rồi bấm nút chép nhật ký).
4. Thấy ổn thì bảo AI: "Tạo pull request gộp nhánh <NHÁNH> vào main". Chỉ gộp khi bản rà chéo nói "nên gộp".

### 7.3 Thử chơi theo đợt (không cần biết mã)

| Đợt | Bạn thử gì | Đạt khi |
|---|---|---|
| Đ0 | Bắt đầu kiếp mới, đọc nhật ký dòng đầu | Thấy tên nhân vật, quê thật, không còn `{{0}}` |
| Đ1 | Làm vài việc tốt, vài việc xấu trong sự kiện; mở bảng nhân vật | Có 3 dòng Hành đạo / Thiện duyên / Nghiệp chướng bằng chữ, không có số; làm ác nhiều thì nơi đó đối xử khác |
| Đ2 | Chơi 3–4 kiếp | Kiếp đầu luôn có linh căn; kiếp sau có lúc vô linh căn; linh căn được báo trong vài tháng đầu; tooltip thể chất có dòng "Theo năm tháng" |
| Đ3 | Đời phàm nhân | Có bạc, đi làm thuê được, phải ăn, không ăn lâu thì chết đói; cống hiến tông này không dùng ở tông khác |
| Đ4 | Kiếp đầu tiên từ lúc xóa dữ liệu | Có khung nhiệm vụ tân thủ, bấm vào dẫn đúng chỗ, bỏ qua có hỏi lại; kiếp sau không còn khung |
| Đ5 | Đời vô linh căn | Luyện võ lên bậc được, làm nghề lên bậc được |
| Đ6 | Đời vô linh căn tìm cải căn | Theo được ít nhất đường Tái Mạch Đan tới cuối |
| Đ7 | Học công pháp nghề tu | Chiêu mới dùng được trong trận |
| Đ8 | Chết rồi đầu thai nhiều lần | Thế giới đổi theo thời gian; có trang Sử lược |
| Đ9 | Theo / bỏ cốt truyện xuất thân | Bỏ qua thì truyện tự diễn tiếp, không kẹt |
| Đ10 | (dài hạn) | Có kết thúc |

### 7.4 Những quyết định chỉ bạn làm
- Khi AI hỏi chọn giữa các phương án thiết kế.
- Có cho **chạy bot** đo độ khó hay không (tốn thời gian và tiền). AI không được tự chạy.
- Có gộp vào `main` hay không.
- Thứ tự ưu tiên khi muốn làm nhanh một phần (ví dụ làm tân thủ trước cải căn).

### 7.5 Kiểm soát chi phí
- Fable 5.2 đắt nhất: chỉ dùng cho hạng mục ghi "F" và rà chéo cuối đợt.
- Việc nhập dữ liệu, viết sự kiện: dùng Sonnet; việc máy móc: Haiku.
- Một phiên làm một hạng mục, xong thì đóng; đừng để một phiên kéo dài nhiều hạng mục.
- Thấy AI làm lan man sang việc khác: nhắc "Chỉ làm hạng mục <MÃ>".
