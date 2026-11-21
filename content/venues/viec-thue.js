// Nguồn chuẩn: VIEC_THUE, VT_NGAY. Luật xử lý ở src/game/core2/39-tien-te.js (phần Đ3.7).
// Việc làm thuê ai cũng làm được (HN B §6.5), tiền công chia 3 để khớp giá C (HN A.7), tính bằng đồng.
// noi: loại nút làm được ; h: giờ ; cong:[min,max] đồng ; dk:{ngo,tam,...} chỉ số tối thiểu ; mua: mùa làm được ; dem: làm ban đêm
// an: được ăn (tính là đã ăn hôm đó) ; ngu: được chỗ ngủ (hồi % khí huyết) ; cam: số ngày cam kết (không tính vào giới hạn giờ trong ngày)
// ruiRo:{p, hau:{wound, hpLoss (% khí huyết tối đa), bacLoss (% bạc mang theo)}}
const VIEC_THUE=[
  {id:'boc_vac',n:'Bốc vác ở bến',noi:['song','bien','thanh'],h:8,cong:[18,22]},
  {id:'ganh_nuoc',n:'Gánh nước thuê',noi:['tran'],h:6,cong:[9,11]},
  {id:'lam_ruong',n:'Làm ruộng thuê mùa vụ',noi:['tran'],h:10,cong:[25,29],an:1,mua:['xuan','thu']},
  {id:'chat_cui',n:'Chặt củi bán',noi:['rung'],h:8,cong:[13,27],ruiRo:{p:0.03,hau:{wound:'ngoai',hpLoss:15}}},
  {id:'hai_rau',n:'Hái rau dại, nấm',noi:['rung'],h:6,cong:[7,17],ruiRo:{p:0.02,hau:{wound:'doc'}}},
  {id:'rua_bat',n:'Rửa bát ở tửu phường',noi:['tran','thanh','cho'],h:8,cong:[11,13],an:1},
  {id:'don_chuong',n:'Dọn chuồng khách điếm',noi:['tran','thanh'],h:6,cong:[8,9],ngu:55},
  {id:'chep_sach',n:'Chép sách',noi:['thanh'],h:8,cong:[32,35],dk:{ngo:10}},
  {id:'viet_thu',n:'Viết thư hộ',noi:['cho'],h:4,cong:[9,11],dk:{ngo:8}},
  {id:'dao_mo',n:'Đào mỏ thuê',noi:['khoang'],h:10,cong:[38,42],ruiRo:{p:0.02,hau:{wound:'gay',hpLoss:20}}},
  {id:'keo_thuyen',n:'Kéo thuyền',noi:['song'],h:10,cong:[28,32]},
  {id:'canh_dem',n:'Canh đêm',noi:['tran','thanh'],h:8,cong:[16,17],dem:1,ruiRo:{p:0.05,hau:{hpLoss:10}}},
  {id:'phu_khuan',n:'Phu khuân, khiêng kiệu',noi:['thanh'],h:8,cong:[23,24]},
  {id:'tap_dich',n:'Tạp dịch ngoại môn (ba mươi ngày)',noi:['tong'],h:720,cong:[330,330],an:1,cam:30},
];
const VT_NGAY=12; // giờ làm tối đa mỗi ngày
