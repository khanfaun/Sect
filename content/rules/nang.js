// Nguồn chuẩn: NANG_K, NANG_GOC, NANG_MAX, NANG_NGHE, NANG_GAIN. Luật xử lý ở src/game/core2/46-nang.js. Chữ: content/text/nang.json
// Đ5.4: nhóm năng lực hỗ trợ ST23 (HN C §5.6) — thước 0–100, gốc 10, không phụ thuộc cảnh giới.
// giac: giác quan; giao: giao tế; thuong: thương lượng; canh: cảnh giác; duoc: nhận dược; khao: khảo vật; tu: tự chủ (tự nhận thức); nhan: nhẫn nại.
const NANG_K=['giac','giao','thuong','canh','duoc','khao','tu','nhan'];
const NANG_GOC=10, NANG_MAX=100;
// mức hiện bằng chữ (không hiện số): ngưỡng dưới của từng mức nang.m.0 … nang.m.6
const NANG_MUC=[0,8,20,35,55,75,95];
// mỗi việc của nghề rèn năng lực nào (mỗi việc cộng NANG_GAIN.nghe cho từng khoá)
const NANG_NGHE={nong:['nhan'],ngu:['nhan','giac'],thuong:['thuong','giao'],vo_gia:['canh'],y:['duoc','khao']};
// mức tăng: phép thử nang.* đạt / hỏng; việc nghề; săn hái; mua bán; tĩnh tọa; tặng lễ
const NANG_GAIN={ok:1,no:0.5,nghe:0.3,san:0.3,mua:0.2,toa:0.3,tang:0.4};
