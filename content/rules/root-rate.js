// Nguồn chuẩn: ROOT_W1, VO_*, ROOT_Q. Luật xử lý ở src/game/core2/37-linh-can.js.
// Sửa-C.18: Địa linh căn ~1/1.000, Thiên linh căn ~1/100.000 (nghìn năm có một); Cực ~1/10.000; Biến dị 2,5%.
const ROOT_W1={tap:20.389,tu:27,tam:32,song:18,bien:2.5,cuc:0.01,dia:0.1,thien:0.001}; // tỉ trọng linh căn (tổng 100; kiếp đầu không có vô căn)
const VO_BASE=45, VO_MIN=30, VO_MAX=65;
// Tỉ lệ vô căn đọc theo BẬC nghiệp duyên kiếp trước (NQ_BAC, content/rules/nghiep.js): cùng bậc thì như nhau.
// Chỉ số mảng = bậc 0..5. Nghiệp chướng: bậc 1 (≥5) +4, bậc 2 (≥20) +10, bậc 3+ (≥60) +20. Thiện duyên: −3, −8, −15.
const VO_BAC_B=[0,4,10,20,20,20], VO_BAC_G=[0,-3,-8,-15,-15,-15];
const ROOT_Q=[{id:'khuyet',n:'Khuyết',w:20,m:0.75},{id:'thuong',n:'Thường',w:65,m:1},{id:'thuan',n:'Thuần',w:14,m:1.15},{id:'vien',n:'Viên Mãn',w:1,m:1.3}];
