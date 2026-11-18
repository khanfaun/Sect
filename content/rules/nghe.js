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
  ngu:{n:'Ngư dân',ranks:['Phụ chài','Ngư phủ','Chủ thuyền','Chủ ghe lớn','Chủ vạn chài','Hải thương'],xp:[0,60,200,600,1500,4000],thu:[1,1.25,1.6,2.1,3,4.5],og:['chai'],
    acts:[
      {id:'cau',l:'Ngồi câu cá',noi:['song','bien'],h:6,cong:[8,20],xp:4},
      {id:'va_luoi',l:'Vá lưới thuê',noi:['song','bien','tran'],h:4,cong:[7,10],xp:3},
      {id:'tha_luoi',l:'Thả lưới',noi:['song','bien'],mua:['xuan','ha','thu'],h:8,cong:[15,40],xp:7,min:1,ruiRo:{p:0.02,hau:{hpLoss:10}}},
      {id:'ban_ca',l:'Đem cá ra chợ',noi:['cho'],h:3,cong:[15,30],xp:2},
      {id:'ra_khoi',l:'Ra khơi ba ngày',noi:['bien'],mua:['xuan','ha','thu'],h:72,cong:[250,700],xp:25,min:2,ruiRo:{p:0.08,hau:{wound:'gay',hpLoss:30}}}]},
  thuong:{n:'Thương nhân',ranks:['Gánh hàng rong','Tiểu thương','Chủ cửa hiệu','Buôn đường dài','Chủ thương hội','Phú giáp một châu'],xp:[0,60,200,600,1500,4000],thu:[1,1.3,1.8,2.5,3.5,5],og:['buon'],
    acts:[
      {id:'ganh',l:'Gánh hàng rong',noi:['tran','cho'],h:8,cong:[12,30],xp:5,stat:{ngo:6}},
      {id:'mua_ban',l:'Mua rẻ bán đắt ở chợ',noi:['cho','thanh'],h:8,von:[300,600],lai:[-0.1,0.35],xp:7,min:1},
      {id:'trong_hieu',l:'Trông cửa hiệu',noi:['thanh'],h:8,cong:[40,90],xp:6,min:2},
      {id:'buon_xa',l:'Theo thương đội buôn xa (mười ngày)',noi:['thanh'],h:240,von:[2000,5000],lai:[0.2,0.8],xp:40,min:3,ruiRo:{p:0.1,hau:{mat:1,hpLoss:20}}}]},
  vo_gia:{n:'Chiến binh giang hồ',ranks:['Vô danh','Có chút tiếng','Hảo hán một vùng','Danh hiệp','Đại hiệp','Võ lâm minh chủ'],xp:[0,60,200,600,1500,4000],thu:[1,1.3,1.7,2.3,3.2,4.5],og:['ren'],dk:{vo:1},
    acts:[
      {id:'bao_ke',l:'Giữ cửa, bảo kê quán',noi:['thanh','tran','cho'],dem:1,h:8,cong:[18,30],xp:5,ruiRo:{p:0.05,hau:{wound:'ngoai',hpLoss:10}}},
      {id:'ho_tong',l:'Nhận hộ tống người đi đường (một ngày)',noi:['thanh','tran'],h:24,cong:[50,90],xp:10,min:1,ruiRo:{p:0.08,hau:{wound:'ngoai',hpLoss:20}}},
      {id:'hanh_hiep',l:'Đi tuần quanh vùng, giúp người bị ức hiếp',noi:['tran','rung','nui'],h:8,cong:[0,10],xp:8},
      {id:'day_vo',l:'Dạy võ cho trai làng',noi:['tran','thanh'],h:6,cong:[30,60],xp:6,min:2}]},
  y:{n:'Y sư phàm',ranks:['Học trò bốc thuốc','Lang băm','Lang trung','Danh y một vùng','Ngự y','Thần y'],xp:[0,60,200,600,1500,4000],thu:[1,1.3,1.8,2.5,3.5,5],og:['duoc'],
    acts:[
      {id:'boc_thuoc',l:'Bốc thuốc ở hiệu',noi:['tran','thanh','cho'],h:6,cong:[10,16],xp:5},
      {id:'hai_thuoc',l:'Vào rừng hái thuốc',noi:['rung','nui','duoc'],h:8,cong:[10,25],xp:5,ruiRo:{p:0.03,hau:{wound:'doc'}}},
      {id:'kham',l:'Khám bệnh, bắt mạch',noi:['tran','thanh'],h:6,cong:[18,40],xp:7,min:1,stat:{ngo:8}},
      {id:'bo_xuong',l:'Bó xương, khâu vết thương',noi:['tran','thanh','cho'],h:4,cong:[25,50],xp:6,min:2},
      {id:'chua_dich',l:'Vào làng có dịch chữa bệnh (ba ngày)',noi:['tran'],h:72,cong:[120,300],xp:30,min:3,ruiRo:{p:0.1,hau:{wound:'doc',hpLoss:25}}}]},
};
