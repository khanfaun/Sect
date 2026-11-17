# Bản đồ nguồn thông tin nền

Các bảng dưới được nạp theo `thu-tu.json`. Bản chụp ở mục info là giá trị sau khi mọi lớp luật đã nạp; nguồn để sửa luôn là tệp `content/…` được ghi cạnh bảng.

## Các kênh dữ liệu và nội dung

- **Truyện và tương tác** (authoring): `content/events/`, `content/venues/services.json`. 403 mục; manifest đăng ký nguồn; schema chung.
- **Danh mục viết sẵn** (authoring): `content/catalog/`. Vật phẩm, chiêu, công pháp, đan, phương tiện, nguyên liệu, loài, xuất thân, vật truyện.
- **Nguyên mẫu/thông tin nền** (authoring): `content/characters/`, `content/world/`, `content/items/`, `content/rules/`. Bảng tên, hồ sơ, loài, ô trang bị, hệ số và luật dữ liệu.
- **Lời kể và thông báo** (authoring): `content/narration/`, `content/text/`, `content/hooks.js`. Văn theo hệ thống; callback đặc thù tham chiếu scriptText trong mục sự kiện.
- **Luật và trạng thái chơi** (runtime): `src/game/core/`, `src/game/core2/`, `src/game/data/02-catalog.js`, `src/game/data/04-su-kien.js`, `src/game/data/05-content-runtime.js`. Sinh thế giới, nhân vật thực, tiến trình, giải quyết lựa chọn và nối dữ liệu.
- **Lớp dữ liệu biên dịch** (generated): `src/game/data/00-content-text.js`, `src/game/data/01-catalog-du-lieu.js`, `src/game/data/03-su_kien-du-lieu.js`. Sinh bằng tools/content-build.js; không sửa tay.
- **Địa hình kỹ thuật** (generated): `src/game/core2/03b-dia-hinh-du-lieu.js`, `tools/dia-hinh.py`. MAPD được sinh từ ảnh bản đồ; là ngoại lệ kỹ thuật, không phải truyện hay hồ sơ để biên tập bằng tay.
- **Giao diện và chú thích** (presentation): `src/react/`, `src/game/ui/`, `src/game/style.css`. Nhãn, bố cục, biểu tượng, chú thích và hành động. Trạng thái hiển thị đọc từ luật/dữ liệu thật.
- **Hình ảnh** (assets): `src/assets/`, `src/assets-goc/`. Ảnh nén và gốc. ASSET trong ui/01-base.js có thể ưu tiên hình minh họa thay thế; dữ liệu chỉ số không gắn trong ảnh.
- **Bản phát hành** (generated): `phu-sinh.html`, `phu-sinh-thu.html`, `vite.config.mjs`, `tools/ghep.js`, `src/game/thu-tu.json`. Sản phẩm build và trình tự ghép; không dùng HTML làm nguồn sửa truyện.
- **Bản đọc và báo cáo** (generated-docs): `docs/content/`, `tools/content-docs.js`, `tools/content-export.py`. Guideline là tài liệu biên tập; danh mục/CSV/XLSX sinh từ nguồn chuẩn.
- **Tư liệu nhập/lịch sử** (archive): `archive/`, `tools/imports/`. Excel, Markdown đúng commit và công cụ cũ; không tham gia build.
- **Bản lưu** (runtime-state): `src/game/ui/19-main.js`, `src/game/core/04-loi-tro-choi.js`. G.meta/G.run và localStorage là trạng thái thực; không phải kho nội dung do tác giả viết.

## Các bảng nền đã tách

| Bảng | Nhóm | Nguồn chuẩn | Nơi xử lý cũ |
|---|---|---|---|
| NAME | characters | `content/characters/name.js` | `src/game/core/01-core.js` |
| PLACE | world | `content/world/place.js` | `src/game/core/01-core.js` |
| TYPE_NAME | world | `content/world/type-name.js` | `src/game/core/01-core.js` |
| P | narration | `content/narration/p.js` | `src/game/core/01-core.js` |
| RUMOR | narration | `content/narration/rumor.js` | `src/game/core/02-tin-don-giang-ho.js` |
| EL | rules | `content/rules/el.js` | `src/game/core/02-tin-don-giang-ho.js` |
| KHAC | rules | `content/rules/khac.js` | `src/game/core/02-tin-don-giang-ho.js` |
| NGUHANH | rules | `content/rules/nguhanh.js` | `src/game/core/02-tin-don-giang-ho.js` |
| REALM | rules | `content/rules/realm.js` | `src/game/core/02-tin-don-giang-ho.js` |
| TIEU | rules | `content/rules/tieu.js` | `src/game/core/02-tin-don-giang-ho.js` |
| LIFE | rules | `content/rules/life.js` | `src/game/core/02-tin-don-giang-ho.js` |
| TAB | rules | `content/rules/tab.js` | `src/game/core/02-tin-don-giang-ho.js` |
| ROOT | characters | `content/characters/root.js` | `src/game/core/02-tin-don-giang-ho.js` |
| ORIGIN | characters | `content/characters/origin.js` | `src/game/core/02-tin-don-giang-ho.js` |
| TRAIT | characters | `content/characters/trait.js` | `src/game/core/02-tin-don-giang-ho.js` |
| SK_RAW | items | `content/items/sk-raw.js` | `src/game/core/02-tin-don-giang-ho.js` |
| SK_PHYS | items | `content/items/sk-phys.js` | `src/game/core/02-tin-don-giang-ho.js` |
| SK_CHARGE | items | `content/items/sk-charge.js` | `src/game/core/02-tin-don-giang-ho.js` |
| SK_AOE | items | `content/items/sk-aoe.js` | `src/game/core/02-tin-don-giang-ho.js` |
| SK_DAO | items | `content/items/sk-dao.js` | `src/game/core/02-tin-don-giang-ho.js` |
| BASIC | rules | `content/rules/basic.js` | `src/game/core/02-tin-don-giang-ho.js` |
| RELIC_K | items | `content/items/relic-k.js` | `src/game/core/02-tin-don-giang-ho.js` |
| RELIC_PRE | items | `content/items/relic-pre.js` | `src/game/core/02-tin-don-giang-ho.js` |
| GRADE | rules | `content/rules/grade.js` | `src/game/core/02-tin-don-giang-ho.js` |
| TM | rules | `content/rules/tm.js` | `src/game/core/02-tin-don-giang-ho.js` |
| RELIC_LORE | items | `content/items/relic-lore.js` | `src/game/core/02-tin-don-giang-ho.js` |
| RELIC_UNIQUE | items | `content/items/relic-unique.js` | `src/game/core/02-tin-don-giang-ho.js` |
| PILL | items | `content/items/pill.js` | `src/game/core/03-dan-duoc-phu-luc.js` |
| PQ | items | `content/items/pq.js` | `src/game/core/03-dan-duoc-phu-luc.js` |
| PQM | items | `content/items/pqm.js` | `src/game/core/03-dan-duoc-phu-luc.js` |
| DESC | characters | `content/characters/desc.js` | `src/game/core/03-dan-duoc-phu-luc.js` |
| EN | characters | `content/characters/en.js` | `src/game/core/03-dan-duoc-phu-luc.js` |
| REG_EN | characters | `content/characters/reg-en.js` | `src/game/core/03-dan-duoc-phu-luc.js` |
| INTENT | rules | `content/rules/intent.js` | `src/game/core/03-dan-duoc-phu-luc.js` |
| BOSS | characters | `content/characters/boss.js` | `src/game/core/03-dan-duoc-phu-luc.js` |
| REG | world | `content/world/reg.js` | `src/game/core/03-dan-duoc-phu-luc.js` |
| UPG | rules | `content/rules/upg.js` | `src/game/core/03-dan-duoc-phu-luc.js` |
| ACH | rules | `content/rules/ach.js` | `src/game/core/03-dan-duoc-phu-luc.js` |
| LORE | world | `content/world/lore.js` | `src/game/core/03-dan-duoc-phu-luc.js` |
| SECT_PRE | characters | `content/characters/sect-pre.js` | `src/game/core/04-loi-tro-choi.js` |
| SECT_SFX | characters | `content/characters/sect-sfx.js` | `src/game/core/04-loi-tro-choi.js` |
| FXT | items | `content/items/fxt.js` | `src/game/core/05-thoi-gian-the-gioi.js` |
| QNAME | rules | `content/rules/qname.js` | `src/game/core/08-loi-kiep.js` |
| QPRE | rules | `content/rules/qpre.js` | `src/game/core/08-loi-kiep.js` |
| QMUL, QLIFE | rules | `content/rules/qmul.js` | `src/game/core/08-loi-kiep.js` |
| BT_BASE | rules | `content/rules/bt-base.js` | `src/game/core/08-loi-kiep.js` |
| NODE_IC | world | `content/world/node-ic.js` | `src/game/core/09-ban-do.js` |
| DANGER | world | `content/world/danger.js` | `src/game/core/09-ban-do.js` |
| ENC_T | narration | `content/narration/enc-t.js` | `src/game/core/10-quan-ai.js` |
| REST_T | narration | `content/narration/rest-t.js` | `src/game/core/10-quan-ai.js` |
| ENT_T | world | `content/world/ent-t.js` | `src/game/core/11-doi-cong-phap.js` |
| MEET_SOFT | world | `content/world/meet-soft.js` | `src/game/core/11-doi-cong-phap.js` |
| KHACH_K | characters | `content/characters/khach-k.js` | `src/game/core/11-doi-cong-phap.js` |
| DI_K | world | `content/world/di-k.js` | `src/game/core/11-doi-cong-phap.js` |
| RUMOR_KIEP | narration | `content/narration/rumor-kiep.js` | `src/game/core/12-dong-doi-tam-thoi.js` |
| MAT | items | `content/items/mat.js` | `src/game/core2/01-core2.js` |
| CRAFT | items | `content/items/craft.js` | `src/game/core2/01-core2.js` |
| NEWT | world | `content/world/newt.js` | `src/game/core2/02-dia-diem-mo-rong.js` |
| NAME_PRE | world | `content/world/name-pre.js` | `src/game/core2/02-dia-diem-mo-rong.js` |
| DTAG | world | `content/world/dtag.js` | `src/game/core2/02-dia-diem-mo-rong.js` |
| SETTLE | world | `content/world/settle.js` | `src/game/core2/02-dia-diem-mo-rong.js` |
| MOUNT | world | `content/world/mount.js` | `src/game/core2/02-dia-diem-mo-rong.js` |
| WOUND | rules | `content/rules/wound.js` | `src/game/core2/03-cong-hien-tong-mon.js` |
| REGEN_REALM | world | `content/world/regen-realm.js` | `src/game/core2/03-cong-hien-tong-mon.js` |
| HEAL_PILL | rules | `content/rules/heal-pill.js` | `src/game/core2/03-cong-hien-tong-mon.js` |
| PHAM | items | `content/items/pham.js` | `src/game/core2/04-luoi-luc-giac.js` |
| PHAM_M | items | `content/items/pham-m.js` | `src/game/core2/04-luoi-luc-giac.js` |
| SLOTS | items | `content/items/slots.js` | `src/game/core2/04-luoi-luc-giac.js` |
| SPEC | items | `content/items/spec.js` | `src/game/core2/04-luoi-luc-giac.js` |
| KSLOT | items | `content/items/kslot.js` | `src/game/core2/04-luoi-luc-giac.js` |
| SLOT_N | items | `content/items/slot-n.js` | `src/game/core2/04-luoi-luc-giac.js` |
| DD_N | items | `content/items/dd-n.js` | `src/game/core2/04-luoi-luc-giac.js` |
| PAS | items | `content/items/pas.js` | `src/game/core2/05-tui-do-gom-moi.js` |
| FX_N | items | `content/items/fx-n.js` | `src/game/core2/05-tui-do-gom-moi.js` |
| VENUE_N | venues | `content/venues/venue-n.js` | `src/game/core2/07-dot-10-tho-nap.js` |
| VENUE_IN | venues | `content/venues/venue-in.js` | `src/game/core2/07-dot-10-tho-nap.js` |
| VEH_T | world | `content/world/veh-t.js` | `src/game/core2/08-dot-13-tram-dich.js` |
| QGRADE | rules | `content/rules/qgrade.js` | `src/game/core2/08-dot-13-tram-dich.js` |
| QAMB_T | narration | `content/narration/qamb-t.js` | `src/game/core2/08-dot-13-tram-dich.js` |
| TP_ORIGIN | characters | `content/characters/tp-origin.js` | `src/game/core2/10-pham-nhan-chua-dan.js` |
| LS_OG | characters | `content/characters/ls-og.js` | `src/game/core2/11-dot-22-do-khoi.js` |
| LS_TR | characters | `content/characters/ls-tr.js` | `src/game/core2/11-dot-22-do-khoi.js` |
| LS_TPG | characters | `content/characters/ls-tpg.js` | `src/game/core2/11-dot-22-do-khoi.js` |
| KIEP | rules | `content/rules/kiep.js` | `src/game/core2/12-dot-24-cac-loai.js` |
| KIEP_EL | rules | `content/rules/kiep-el.js` | `src/game/core2/12-dot-24-cac-loai.js` |
| TT_PHYS | characters | `content/characters/tt-phys.js` | `src/game/core2/12-dot-24-cac-loai.js` |
| TT_DEST | characters | `content/characters/tt-dest.js` | `src/game/core2/12-dot-24-cac-loai.js` |
| TT_TRAITS | characters | `content/characters/tt-traits.js` | `src/game/core2/12-dot-24-cac-loai.js` |
| TT_MAP | characters | `content/characters/tt-map.js` | `src/game/core2/12-dot-24-cac-loai.js` |
| TT_ELD | characters | `content/characters/tt-eld.js` | `src/game/core2/12-dot-24-cac-loai.js` |
| TT_FXN | characters | `content/characters/tt-fxn.js` | `src/game/core2/12-dot-24-cac-loai.js` |
| TT_EXTRA | characters | `content/characters/tt-extra.js` | `src/game/core2/13-dot-26-do-don.js` |
| MC_REN | characters | `content/characters/mc-ren.js` | `src/game/core2/13-dot-26-do-don.js` |
| TT_MERGE | characters | `content/characters/tt-merge.js` | `src/game/core2/13-dot-26-do-don.js` |
| MC_NERF | characters | `content/characters/mc-nerf.js` | `src/game/core2/13-dot-26-do-don.js` |
| EL_FL | narration | `content/narration/el-fl.js` | `src/game/core2/15-loi-ke-tran-danh.js` |
| ATK_P | narration | `content/narration/atk-p.js` | `src/game/core2/15-loi-ke-tran-danh.js` |
| ATK_PHAM | narration | `content/narration/atk-pham.js` | `src/game/core2/15-loi-ke-tran-danh.js` |
| TS | rules | `content/rules/ts.js` | `src/game/core/02-tin-don-giang-ho.js` |
| EH | rules | `content/rules/eh.js` | `src/game/core/02-tin-don-giang-ho.js` |
| EA | rules | `content/rules/ea.js` | `src/game/core/02-tin-don-giang-ho.js` |
| ED | rules | `content/rules/ed.js` | `src/game/core/02-tin-don-giang-ho.js` |
| CHKN | items | `content/items/chkn.js` | `src/game/core/06-su-kien.js` |
| CHKI | items | `content/items/chki.js` | `src/game/core/06-su-kien.js` |
| GIAI | items | `content/items/giai.js` | `src/game/core/06-su-kien.js` |
| VERB | narration | `content/narration/verb.js` | `src/game/core/06-su-kien.js` |
| VERB2 | narration | `content/narration/verb2.js` | `src/game/core/06-su-kien.js` |
| EN_SK | items | `content/items/en-sk.js` | `src/game/core/06-su-kien.js` |
| BLOCK_SK | items | `content/items/block-sk.js` | `src/game/core/06-su-kien.js` |
| WAIT_SK | items | `content/items/wait-sk.js` | `src/game/core/06-su-kien.js` |
| GUARD_SK | items | `content/items/guard-sk.js` | `src/game/core/06-su-kien.js` |
| MONTH | narration | `content/narration/month.js` | `src/game/core/08-loi-kiep.js` |
| CHI | narration | `content/narration/chi.js` | `src/game/core/08-loi-kiep.js` |
| PART | narration | `content/narration/part.js` | `src/game/core/08-loi-kiep.js` |
| SEASON | narration | `content/narration/season.js` | `src/game/core/08-loi-kiep.js` |
| SENSE | rules | `content/rules/sense.js` | `src/game/core/09-ban-do.js` |
| WALK | rules | `content/rules/walk.js` | `src/game/core/09-ban-do.js` |
| CROSS_M | rules | `content/rules/cross-m.js` | `src/game/core/09-ban-do.js` |
| WILD | rules | `content/rules/wild.js` | `src/game/core/09-ban-do.js` |
| BQ_Y | rules | `content/rules/bq-y.js` | `src/game/core/09-ban-do.js` |
| SINH | rules | `content/rules/sinh.js` | `src/game/core2/01-core2.js` |
| QUY | rules | `content/rules/quy.js` | `src/game/core2/01-core2.js` |
| CHU_N | rules | `content/rules/chu-n.js` | `src/game/core2/01-core2.js` |
| PET_FX | rules | `content/rules/pet-fx.js` | `src/game/core2/01-core2.js` |
| AFF_CAT | rules | `content/rules/aff-cat.js` | `src/game/core2/01-core2.js` |
| WILD2 | rules | `content/rules/wild2.js` | `src/game/core2/02-dia-diem-mo-rong.js` |
| PA2 | rules | `content/rules/pa2.js` | `src/game/core2/02-dia-diem-mo-rong.js` |
| LK_N, LK_M | rules | `content/rules/lk-n.js` | `src/game/core2/02-dia-diem-mo-rong.js` |
| CH_GIVE | rules | `content/rules/ch-give.js` | `src/game/core2/03-cong-hien-tong-mon.js` |
| STAT_N | rules | `content/rules/stat-n.js` | `src/game/core2/03-cong-hien-tong-mon.js` |
| MAPD | rules | `content/rules/mapd.js` | `src/game/core2/03b-dia-hinh-du-lieu.js` |
| CELL | rules | `content/rules/cell.js` | `src/game/core2/04-luoi-luc-giac.js` |
| TER_N | rules | `content/rules/ter-n.js` | `src/game/core2/04-luoi-luc-giac.js` |
| TER_COST | rules | `content/rules/ter-cost.js` | `src/game/core2/04-luoi-luc-giac.js` |
| QUAN_N | rules | `content/rules/quan-n.js` | `src/game/core2/04-luoi-luc-giac.js` |
| PB_SLOTS, PB_REQ | rules | `content/rules/pb-slots.js` | `src/game/core2/04-luoi-luc-giac.js` |
| BAG_BASE, BAG_TUI, BAG_MAX | rules | `content/rules/bag-base.js` | `src/game/core2/04-luoi-luc-giac.js` |
| BAG_CAT | rules | `content/rules/bag-cat.js` | `src/game/core2/05-tui-do-gom-moi.js` |
| CAT_N, CAT_MAX | rules | `content/rules/cat-n.js` | `src/game/core2/05-tui-do-gom-moi.js` |
| ART_SFX | items | `content/items/art-sfx.js` | `src/game/core2/05-tui-do-gom-moi.js` |
| EL_FX | rules | `content/rules/el-fx.js` | `src/game/core2/05-tui-do-gom-moi.js` |
| ART_REQ | items | `content/items/art-req.js` | `src/game/core2/05-tui-do-gom-moi.js` |
| ART_LINES | items | `content/items/art-lines.js` | `src/game/core2/05-tui-do-gom-moi.js` |
| LV_N | rules | `content/rules/lv-n.js` | `src/game/core2/05-tui-do-gom-moi.js` |
| STAGE_FX | rules | `content/rules/stage-fx.js` | `src/game/core2/05-tui-do-gom-moi.js` |
| FX_CAP | items | `content/items/fx-cap.js` | `src/game/core2/05-tui-do-gom-moi.js` |
| ART_MAX, ART_CAP | items | `content/items/art-max.js` | `src/game/core2/05-tui-do-gom-moi.js` |
| BURN | rules | `content/rules/burn.js` | `src/game/core2/06-thieu-dot-tho-nguyen.js` |
| TH_N, TH_EL, TH_MAX | rules | `content/rules/th-n.js` | `src/game/core2/06-thieu-dot-tho-nguyen.js` |
| TH_FX | rules | `content/rules/th-fx.js` | `src/game/core2/06-thieu-dot-tho-nguyen.js` |
| PT | rules | `content/rules/pt.js` | `src/game/core2/06-thieu-dot-tho-nguyen.js` |
| TC_BIAS | rules | `content/rules/tc-bias.js` | `src/game/core2/06-thieu-dot-tho-nguyen.js` |
| TC_N | rules | `content/rules/tc-n.js` | `src/game/core2/06-thieu-dot-tho-nguyen.js` |
| TVP | rules | `content/rules/tvp.js` | `src/game/core2/06-thieu-dot-tho-nguyen.js` |
| LL_T, LL_BT, LL_MAX, LL_CAPE | rules | `content/rules/ll-t.js` | `src/game/core2/07-dot-10-tho-nap.js` |
| QST | rules | `content/rules/qst.js` | `src/game/core2/08-dot-13-tram-dich.js` |
| QCOL | rules | `content/rules/qcol.js` | `src/game/core2/09-dot-17-bang-treo.js` |
| KY_P | rules | `content/rules/ky-p.js` | `src/game/core2/09-dot-17-bang-treo.js` |
| TU_M, TP_Y | rules | `content/rules/tu-m.js` | `src/game/core2/10-pham-nhan-chua-dan.js` |
| START_IT | items | `content/items/start-it.js` | `src/game/core2/11-dot-22-do-khoi.js` |
| LS_EL | characters | `content/characters/ls-el.js` | `src/game/core2/11-dot-22-do-khoi.js` |
| LS_ELN | characters | `content/characters/ls-eln.js` | `src/game/core2/11-dot-22-do-khoi.js` |
| BT_ROOT, BT_LK | rules | `content/rules/bt-root.js` | `src/game/core2/11-dot-22-do-khoi.js` |
| TT_RW | rules | `content/rules/tt-rw.js` | `src/game/core2/12-dot-24-cac-loai.js` |
| TT_RANK, TT_COL | rules | `content/rules/tt-rank.js` | `src/game/core2/12-dot-24-cac-loai.js` |
| TT_FORCE | rules | `content/rules/tt-force.js` | `src/game/core2/12-dot-24-cac-loai.js` |
| REL_X, REL_M | items | `content/items/rel-x.js` | `src/game/core2/14-sua-lai-pham-khong.js` |
| REL_POOL | items | `content/items/rel-pool.js` | `src/game/core2/14-sua-lai-pham-khong.js` |
| NT_KEYS | items | `content/items/nt-keys.js` | `src/game/core2/14-sua-lai-pham-khong.js` |
| NT_NAME | items | `content/items/nt-name.js` | `src/game/core2/14-sua-lai-pham-khong.js` |
| RATE_T | rules | `content/rules/rate-t.js` | `src/game/core2/14-sua-lai-pham-khong.js` |
| RATE_W | rules | `content/rules/rate-w.js` | `src/game/core2/14-sua-lai-pham-khong.js` |
| RATE_COL | rules | `content/rules/rate-col.js` | `src/game/core2/14-sua-lai-pham-khong.js` |
| RATE_TK | rules | `content/rules/rate-tk.js` | `src/game/core2/14-sua-lai-pham-khong.js` |
| NUM_VI | narration | `content/narration/num-vi.js` | `src/game/core2/14-sua-lai-pham-khong.js` |
| LK_TH, LK_MUL | rules | `content/rules/lk-th.js` | `src/game/core2/14-sua-lai-pham-khong.js` |
| LK_BON | rules | `content/rules/lk-bon.js` | `src/game/core2/14-sua-lai-pham-khong.js` |
| SG_TH | rules | `content/rules/sg-th.js` | `src/game/core2/15-loi-ke-tran-danh.js` |
| TT_AVG | rules | `content/rules/tt-avg.js` | `src/game/core2/16-lich-luyen-hien-theo.js` |
| TAL_N | characters | `content/characters/tal-n.js` | `src/game/core2/16-lich-luyen-hien-theo.js` |
| TAL_T | characters | `content/characters/tal-t.js` | `src/game/core2/16-lich-luyen-hien-theo.js` |
| TAL_RL | characters | `content/characters/tal-rl.js` | `src/game/core2/16-lich-luyen-hien-theo.js` |
| KV_GRP | characters | `content/characters/kv-grp.js` | `src/game/core2/16-lich-luyen-hien-theo.js` |
| FXG_K | rules | `content/rules/fxg-k.js` | `src/game/core2/16-lich-luyen-hien-theo.js` |
| TAL_W | characters | `content/characters/tal-w.js` | `src/game/core2/16-lich-luyen-hien-theo.js` |
| TC_DAO | rules | `content/rules/tc-dao.js` | `src/game/core2/16-lich-luyen-hien-theo.js` |
| NGO_BB | rules | `content/rules/ngo-bb.js` | `src/game/core2/17-chi-so-khi-len.js` |
| HT_RANK | characters | `content/characters/ht-rank.js` | `src/game/core2/17-chi-so-khi-len.js` |
| HT_RW | characters | `content/characters/ht-rw.js` | `src/game/core2/17-chi-so-khi-len.js` |
| HTKV | characters | `content/characters/htkv.js` | `src/game/core2/17-chi-so-khi-len.js` |
| ASC_K | rules | `content/rules/asc-k.js` | `src/game/core2/18-ghi-lai-truoc-sau.js` |
| TAP_P | rules | `content/rules/tap-p.js` | `src/game/core2/18-ghi-lai-truoc-sau.js` |
| MI_N | characters | `content/characters/mi-n.js` | `src/game/core2/18-ghi-lai-truoc-sau.js` |
| FAV_N | characters | `content/characters/fav-n.js` | `src/game/core2/18-ghi-lai-truoc-sau.js` |
| ELDER_T | rules | `content/rules/elder-t.js` | `src/game/core2/18-ghi-lai-truoc-sau.js` |
| REL_T | characters | `content/characters/rel-t.js` | `src/game/core2/18-ghi-lai-truoc-sau.js` |
| WT_LV | rules | `content/rules/wt-lv.js` | `src/game/core2/23-thuong-the.js` |
| WT_NAME, WT_DIE, WT_PERM | rules | `content/rules/wt-name.js` | `src/game/core2/23-thuong-the.js` |
| WT_SCAR | rules | `content/rules/wt-scar.js` | `src/game/core2/23-thuong-the.js` |
| AREA | world | `content/world/area.js` | `src/game/core2/33-the-gioi-mo.js` |
| SIZE_T | world | `content/world/size-t.js` | `src/game/core2/33-the-gioi-mo.js` |
| TONG_SZ | world | `content/world/tong-sz.js` | `src/game/core2/33-the-gioi-mo.js` |
| VIS_COST | world | `content/world/vis-cost.js` | `src/game/core2/33-the-gioi-mo.js` |
| WP0, WP_TY, WP_BASE | rules | `content/rules/wp0.js` | `src/game/core2/33-the-gioi-mo.js` |
| TAL_RT | characters | `content/characters/tal-rt.js` | `src/game/core2/32-sua-loi-can-bang.js` |
