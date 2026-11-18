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
// câu 18 — nguồn linh thạch phẩm cao. ltRoll[bảng] = danh sách [phẩm k, xác suất, ít nhất, nhiều nhất]; phẩm 0 (Hạ) đi qua hiệu ứng st nên nhân hệ số vùng.
//   daibi: tông môn đại bỉ thắng — tối đa Trung phẩm. bicanh: chủ yếu Hạ/Trung, Thượng rất hiếm, Cực rất rất hiếm.
//   coduyen: kỳ ngộ cơ duyên lớn (trả giá) — nơi Cực phẩm ra nhiều nhất; huuduyen: kỳ ngộ hữu duyên (không mất gì), ít hơn.
// dg: đấu giá thường gửi bán một món: thu ×nhan giá bán ở tiệm, cứ đủ 100 Hạ thì trả bằng 1 Trung (tối đa trungMax).
// am: "U Minh Ám Hội" — hội đấu giá ngầm trong quỷ thị (thành/ma tu, canh ba). Đổi vật lấy vật, mỗi tháng mỗi nơi `thang` lần.
//   bao: pháp bảo phẩm t (≥ minT) đòi được (t − 1) Thượng phẩm; phẩm cucT trở lên đòi được 1 Cực phẩm.
//   mua: đưa `thuong` Thượng phẩm lấy pháp bảo cao hơn vùng `len` phẩm; đưa 1 Cực phẩm lấy `cucDan` viên đan quý.
Object.assign(SUAE,{
  ltRoll:{
    daibi:[[0,1,10,30],[1,0.4,1,1]],
    bicanh:[[0,1,15,50],[1,0.35,1,3],[2,0.03,1,1],[3,0.003,1,1]],
    coduyen:[[1,0.35,1,3],[2,0.12,1,2],[3,0.04,1,1]],
    huuduyen:[[1,0.15,1,1],[2,0.04,1,1],[3,0.01,1,1]]},
  dg:{nhan:1.5,trungMax:5},
  am:{thang:1,minT:2,cucT:4,thuong:3,len:2,cucDan:2}});
// câu 19 — Tích Cốc Đan (vật dùng trong túi, chỉ Trúc Cơ trở lên): no trong `ngay` ngày (không đói, hết đói ngay), giá `st` linh thạch Hạ phẩm (× hệ số vùng price()),
//   bày ở nơi bán đồ tu sĩ: chợ phiên tu sĩ, phường thị trong thành, bảo khố tông mình; `qty` viên mỗi lần bày.
SUAE.tc={id:'tich_coc_dan',ngay:1095,st:8,qty:2,noi:['cho','thanh','tong']};
// câu 20 — trả trước một phần khoản vay ở người cho vay: các mức (xu) nhỏ hơn số còn phải trả, và "một nửa". Không giảm lãi đã tính, không đổi hạn.
SUAE.traTruoc=[200,1000,3000];
// câu 23 — thương lượng giảm giá tiệm: giảm = max × (năng lực − tu) / (100 − tu), kẹp 0..max. Gốc 10 không giảm; "Lão luyện" (55) ≈ 2,5%; tối đa 5% ở 100.
SUAE.mac={max:0.05,tu:10};
