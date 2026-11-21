// Nguồn chuẩn: THUONG_CAC, TC_BAC, TL_QST. Luật xử lý ở src/game/core2/39-tien-te.js.
// Cửa hàng Thưởng Các (HN B §6.1.3; bỏ Khai Linh Đan, thêm Manh mối cơ duyên theo HN A.3). Đơn vị giá: Thưởng Lệnh.
// k: pill (id viên đan) | qi (vật truyện) ; bac: bậc Thưởng Các cần (0..4) ; lim:[số, 'thang'|'nam'|'kiep'] tính theo từng thành.
// an:1 = hệ đi kèm chưa có, chưa bày bán (giữ dòng để đợt sau bật).
const THUONG_CAC=[
  {id:'luong_kho',k:'qi',n:'Lương khô (một gói)',p:1,bac:0,lim:null},
  {id:'hoixuan',k:'pill',p:2,bac:0,lim:[5,'thang']},
  {id:'tukhi',k:'pill',p:2,bac:0,lim:[5,'thang']},
  {id:'giaidoc',k:'pill',p:2,bac:0,lim:[5,'thang']},
  {id:'giay_tram',k:'qi',n:'Giấy thông hành trạm dịch',p:2,bac:0,lim:[3,'thang'],an:1},
  {id:'trac_linh_thach',k:'qi',p:3,bac:0,lim:[1,'kiep']},
  {id:'tin_thien_kieu',k:'tin',n:'Tin tức một thiên kiêu',p:3,bac:0,lim:[3,'thang'],an:1},
  {id:'thanhanh',k:'pill',p:4,bac:1,lim:[3,'thang']},
  {id:'kimcang',k:'pill',p:4,bac:1,lim:[3,'thang']},
  {id:'loiphu',k:'pill',p:5,bac:1,lim:[3,'thang']},
  {id:'dinhthan',k:'pill',p:6,bac:1,lim:[2,'thang']},
  {id:'tinhnguyen',k:'pill',p:8,bac:2,lim:[2,'thang']},
  {id:'lenh_truy_na',k:'qi',n:'Lệnh truy nã đặc biệt',p:10,bac:2,lim:[1,'thang'],an:1},
  {id:'ban_do_kho_bau',k:'qi',n:'Bản đồ kho báu',p:12,bac:2,lim:[1,'thang'],an:1},
  {id:'phacanh',k:'pill',p:18,bac:3,lim:[1,'thang']},
  {id:'homach',k:'pill',p:20,bac:3,lim:[1,'thang']},
  {id:'tiloi',k:'pill',p:22,bac:3,lim:[1,'thang']},
  {id:'xoa_truy_na',k:'tin',n:'Xoá tên khỏi bảng truy nã của một thành',p:25,bac:3,lim:[1,'nam'],an:1},
  {id:'dientho',k:'pill',p:30,bac:3,lim:[1,'nam']},
  {id:'luanhoi',k:'pill',p:40,bac:3,lim:[1,'kiep']}, // Sửa-C.6: nguồn lượt chọn lá số
  {id:'luan_hoi_kinh',k:'qi',p:35,bac:3,lim:[1,'kiep']},
  {id:'luan_hoi_ngoc',k:'qi',p:55,bac:4,lim:[1,'kiep']},
  {id:'manh_moi_co_duyen',k:'tin',n:'Manh mối cơ duyên',p:60,bac:4,lim:[1,'kiep'],an:1},
];
// bậc Thưởng Các theo tổng thẻ từng nhận (không giảm khi tiêu)
const TC_BAC=[{n:'Vô danh',v:0},{n:'Đồng bài',v:20},{n:'Ngân bài',v:60},{n:'Kim bài',v:150},{n:'Huyền bài',v:400}];
// Thưởng Lệnh theo bậc nhiệm vụ bảng treo (6 bậc như QST); xong trước nửa hạn +1; bỏ / trễ −1
const TL_QST=[1,2,3,5,8,12];
