// Nguồn chuẩn các bảng của đợt Sửa-C (người dùng chốt câu 6, 8, 11, 18, 19). Luật ở src/game/core2/45-sua-c.js.
// DT_PICK: những thứ đã tu / đã uống / mang theo trước khi chết thì kiếp sau được chọn 1 trong 3 lá số (câu 6).
//   art: tên công pháp có trong r.arts; pill: viên đan đã uống (ghi r.dtUsed); qi: vật mang theo lúc chết (mất khi dùng).
const DT_PICK={art:['Luân Hồi Kinh'],pill:['luanhoi'],qi:['dinh_menh_chau','luan_hoi_ngoc']};
// GIA: già theo tỉ lệ tuổi / thọ nguyên (câu 8). tu: từ tỉ lệ này coi là già. hp: khí huyết tối đa giảm.
//   cs: chỉ số chiến đấu giảm (tỉ lệ, theo khóa S()); khóa không có trong bảng thì không giảm (ngộ tính, linh lực, thần thức…).
//   st: né / đỡ trong trận tốn thêm bấy nhiêu thể lực.
const GIA={tu:0.7,hp:0.10,cs:{atk:0.01,matk:0.01,ne:0.01,def:0.005,crit:0.005},st:5}; // không giảm: linh lực, thân pháp gốc, ngộ tính, tâm cảnh, khí vận, thần thức
// SAN: săn bắt / hái lượm ở hoang dã có hạn mỗi ô, hồi lại đầu mỗi năm (câu 11).
//   hai: số lượt hái lượm (thức ăn) mỗi nút hoang dã mỗi năm; san: số lượt săn yêu thú mỗi nút mỗi năm (như cũ: 3).
//   an: một lượt được bấy nhiêu ngày lương thực (cộng vào r.anLk như lương khô); h: số giờ; thao: xác suất nhặt thêm 1 thảo dược.
const SAN={hai:6,san:3,an:[1,3],h:4,thao:0.25};
// TL_FX: trắc ra Địa / Thiên linh căn (câu 18, 19). ms: thời gian hiệu ứng (mili giây).
//   eld/de: số cao tầng / đệ tử được tăng thiện cảm; fe/fd: mức tăng; sect: hảo cảm chung của tông.
const TL_FX={dia:{ms:6500,eld:1,de:2,fe:15,fd:10,sect:5},thien:{ms:11000,eld:3,de:4,fe:30,fd:20,sect:12}};
