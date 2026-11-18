// Nguồn chuẩn cho Sửa-E (người dùng chốt đợt 2, câu 17–23). Luật: src/game/core2/48-sua-e.js.
// cam: hiệu cầm đồ. ltPer = đồ tu sĩ trả bằng linh thạch Hạ phẩm, bằng ltPer × giá bán ở tiệm tu sĩ (× nhu cầu), tối thiểu 1 viên;
//      thang = số món đồ tu sĩ nhận mỗi tháng mỗi nơi (đồ phàm không giới hạn).
//      pham = đồ phàm nhận cầm, trả xu (binh khí phàm ~10 lượng bạc; thuốc/lương khô/bí tịch ~ nửa giá mua).
//      btPer = bí tịch võ phàm: trả btPer × giá mua ở tạp hóa.
// vk: binh khí phàm (vật trong túi). atkP = công +% cho phàm nhân đang mang (chọn món tốt nhất); bac = giá bày ở tạp hóa thành.
const SUAE={
  cam:{ltPer:0.6,thang:1,btPer:0.5,
    pham:{vk_thiet_kiem:10000,vk_cuong_dao:9000,kim_sang_duoc:60,huong_an_than:30,luong_kho:35}},
  vk:{vk_thiet_kiem:{atkP:10,bac:14000},vk_cuong_dao:{atkP:8,bac:12000}}};
