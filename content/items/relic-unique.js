// Nguồn chuẩn: RELIC_UNIQUE. Luật xử lý ở src/game/core/02-tin-don-giang-ho.js.
const RELIC_UNIQUE = {
  nhancu:{name:'Nhẫn sắt cũ',k:'nhan',fx:{tvP:25,van:2},lore:'Chiếc nhẫn sắt đen, bên trong như có ai đang ngủ.',el:'vo'},
  honphien:{name:'Hồn Phiên Vô Chủ',k:'phien',fx:{poisonHit:.3,atkP:10,tam:-3},lore:'Lá cờ đen thêu trăm mặt người. Đêm đêm nghe tiếng khóc.',el:'am'},
  dongtam:{name:'Đồng Tâm Kết',k:'boi',fx:{hpP:15,tam:3,regenHp:2},lore:'Sợi dây đỏ thắt nút đồng tâm. Đầu kia ở trong tay một người.',el:'vo'},
  kiemgay:{name:'Kiếm Gãy Vô Danh',k:'kiem',fx:{atkP:22,crit:8},lore:'Chỉ còn nửa lưỡi, nhưng kiếm ý chưa tắt.',el:'kim'},
  mocu:{name:'Di Vật Kiếp Trước',k:'nhan',fx:{van:3,tvP:10,hpP:8},lore:'Thứ ngươi từng mang theo trong một đời khác.',el:'vo'},
  tamkinh:{name:'Vấn Tâm Kính',k:'kinh',fx:{reflect:25,tam:4,tammaRes:40},lore:'Soi vào thấy người, soi lâu thấy mình.',el:'vo'},
  longlan:{name:'Long Lân Hộ Tâm',k:'giap',fx:{defP:35,hpP:10},lore:'Vảy rồng già, to bằng cái mâm.',el:'thuy'},
  tinhthiet:{name:'Tinh Thiết Kiếm Phôi',k:'kiem',fx:{atkP:18,elX:15},lore:'Rơi từ trời xuống, vẫn còn nóng.',el:'kim'},
  loimoc:{name:'Lôi Kích Mộc Tâm',k:'hap',fx:{elX:30,stunP:8},lore:'Lõi gỗ bị sét đánh trăm năm, sờ vào tê rần.',el:'loi'},
  thientam:{name:'Thiên Tâm Ngọc',k:'boi',fx:{mpP:25,mpCost:-15,ngo:3},lore:'Trong ngọc có một vệt mây trôi mãi không dừng.',el:'vo'},
  lenhtong:{name:'Lệnh bài đệ tử',k:'lenh',fx:{tam:2,shopP:15,tvP:10},lore:'Lệnh bài khắc tên ngươi. Có nó, ngươi là người của tông môn.',el:'vo'},
};
