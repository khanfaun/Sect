// Nguồn chuẩn: NGHE, NG_MAX, NG_EV_P. Luật xử lý ở src/game/core2/42-nghe.js.
// Đại đạo ba ngàn — nghề phàm (HN B §7.1–§7.2, A.8; C §6 PM01–PM18). Thu nhập tính bằng đồng, đã chia ba theo A.7.
// ranks: 6 bậc danh vị; xp: ngưỡng kinh nghiệm lên bậc; thu: hệ số tiền công theo bậc; og: xuất thân vào nghề sẵn (cửa vào thứ nhất; cửa thứ hai là tự làm việc của nghề)
// dk: điều kiện vào nghề {vo: bậc võ tối thiểu}; acts: việc lặp — noi: loại nút; mua: mùa; h: giờ; cong:[min,max] đồng ở bậc 0; xp; min: bậc nghề tối thiểu;
//   stat:{ngo:..} chỉ số tối thiểu; dem: việc đêm (chỉ để đọc); an: có cơm; von:[a,b] vốn bỏ ra (đồng) và lai:[a,b] lãi trên vốn; ruiRo:{p,hau:{wound,hpLoss,bacLoss}}
// up: kỳ ngộ thăng bậc (sinh tự động: ng_<mã>_<bậc mới>, chữ ở content/text/nghe.json)
const NG_MAX=3;      // tối đa ba đường cùng lúc; đường thứ tư làm đường lâu không làm nhất "phai"
const NG_EV_P=0.12;  // sau mỗi việc của nghề: khả năng gặp một sự kiện của nghề
const NGHE={
  nong:{n:'Nông dân',ranks:['Làm thuê','Tá điền','Tiểu nông','Trung nông','Phú nông','Địa chủ'],xp:[0,60,200,600,1500,4000],thu:[1,1.2,1.5,2,3,4.5],og:['nong'],
    acts:[
      {id:'gieo',l:'Gieo mạ',noi:['tran'],mua:['xuan'],h:10,cong:[24,30],xp:6,an:1},
      {id:'cham',l:'Chăm ruộng, tát nước',noi:['tran'],mua:['ha'],h:8,cong:[18,24],xp:5},
      {id:'gat',l:'Gặt lúa',noi:['tran'],mua:['thu'],h:10,cong:[30,40],xp:8,an:1},
      {id:'dan',l:'Đan lát mùa nông nhàn',noi:['tran'],mua:['dong'],h:6,cong:[10,14],xp:4},
      {id:'ban_thoc',l:'Đem thóc ra chợ bán',noi:['cho','thanh'],mua:['thu','dong'],h:4,cong:[40,70],xp:3,min:2}]},
};
