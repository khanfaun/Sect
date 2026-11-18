// Nguồn chuẩn: TIEN, TIEN2. Luật xử lý ở src/game/core2/39-tien-te.js và 43-tien-te-2.js.
// Sửa-A (người dùng chốt câu 9): tiền phàm tính bằng XU (r.bac). 1 lượng bạc = 1.000 xu; 1 lượng vàng = 10.000 xu.
// Bản lưu cũ ghi "đồng": 1 đồng = 1 xu, nên số giữ nguyên. Không còn "quan".
// grpBac: tiền khởi đầu (xu) theo nhóm xuất thân khi xuất thân không ghi riêng `bac`. Sửa-B: bỏ cơm nhà nên tiền đầu chỉ đủ ăn 1–4 tuần (ăn thường 20 xu/ngày).
// quan: giữ tên cũ cho mã cũ, nay là 1 lượng bạc. lt: giá trị quy ước của 1 linh thạch hạ phẩm (100 lượng vàng) — chỉ để đọc, KHÔNG đổi trực tiếp.
const TIEN={quan:1000,luong:1000,vang:10000,lt:1000000,
  grpBac:{kho:[150,300],thuong:[300,700],kha:[5000,20000]},
  hc:{bap:0.75,nang:1.25},
  tpBac:800,tlBac:9900,qBac:100,yBac:150,evXu:100};
// tpBac: bản chép tay tâm pháp ở tạp hóa; tlBac: Trắc Linh Thạch; yBac: thầy lang ở phường thị (đều là xu)
// qBac: phàm nhân nhận thưởng nhiệm vụ bảng treo bằng tiền phàm, mỗi linh thạch ghi trên bảng = qBac xu
// evXu: sự kiện phàm nhân dùng được mà ghi giá linh thạch thì mỗi linh thạch (sau hệ số vùng) = evXu xu
// TIEN2 (Sửa-A, câu 9 + 17):
//  pham: 4 phẩm linh thạch (r.st = Hạ, r.lt = [Trung, Thượng, Cực]); 100 phẩm dưới ≈ 1 phẩm trên (quy ước).
//  doi: nơi đổi phẩm theo loại nút. xuong[k] = số viên phẩm k nhận khi đổi xuống 1 viên phẩm k+1;
//       len[k] = hệ số phải trả khi gom 100 viên phẩm k lên 1 viên phẩm k+1 (phẩm càng cao bù càng lớn);
//       max = phẩm cao nhất nơi đó đổi được (0 = chỉ Hạ↔Trung); lenThang[k] = số lần đổi lên mỗi tháng mỗi nơi.
//  lech: mỗi nơi lệch thêm ±lech viên (xuống) / ±lech% (lên) theo mã nút, để các nơi chênh nhau một ít.
//  nc: chỉ số nhu cầu — dao động ±dao quanh 1, đổi mốc mỗi `chu` tháng; mỗi lần người chơi mua đẩy +day, bán đẩy −day;
//      phần do người chơi đẩy phai còn ×phai mỗi tháng; nhu cầu kẹp trong [min,max].
//  shop: số món đồ tu sĩ tối đa trong tạp hóa/phường thị theo loại nút; hang: đồ phàm bày bán (xu, số lượng).
//  cam: hiệu cầm đồ (kênh gián tiếp hiếm): mỗi tháng mỗi nơi nhận `thang` món đồ tu sĩ; trả xuPer xu cho mỗi linh thạch giá bán.
const TIEN2={
  pham:['Hạ phẩm','Trung phẩm','Thượng phẩm','Cực phẩm'],
  doi:{
    cho:{xuong:[97,93,89],len:[1.06,1.12,1.22],max:2,lenThang:[6,3,1]},
    tong:{xuong:[99,95,91],len:[1.05,1.10,1.18],max:2,lenThang:[5,2,1]},
    thanh:{xuong:[94,90,86],len:[1.10,1.18,1.30],max:1,lenThang:[4,1,0]}},
  lech:2,
  nc:{dao:0.12,chu:3,day:0.04,phai:0.7,min:0.7,max:1.4},
  shop:{tran:1,thanh:2},
  hang:[{id:'kim_sang_duoc',bac:120,qty:3},{id:'huong_an_than',bac:60,qty:2},{id:'luong_kho',bac:70,qty:5}],
  cam:{thang:1,xuPer:200,noi:['thanh','cho']},
  dung:{kim_sang_duoc:{hp:0.3},huong_an_than:{tamma:-5}}};
