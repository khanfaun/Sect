// Nguồn chuẩn: ORIGIN. grp = nhóm hoàn cảnh (kho khốn khó / thuong / kha khá giả, HN B §16.2). Luật xử lý ở src/game/core/02-tin-don-giang-ho.js.
const ORIGIN = [
  {id:'nong',grp:'thuong',n:'Con nhà nông',i:'🌾',fx:{hpP:10},d:'Khí huyết +10%',bio:'vốn là con nhà nông, tuổi thơ quanh quẩn bờ ruộng {$que}'},
  {id:'tran',grp:'thuong',n:'Con nhà trận sư',i:'🔯',fx:{ngo:2,tam:1},d:'Ngộ tính +2, đạo tâm +1',bio:'vốn là con nhà trận sư sa sút, lớn lên ở {$que}'},
  {id:'dote',grp:'thuong',n:'Con nhà đồ tể',i:'🔪',fx:{atkP:8,tam:-1},d:'Công +8%, đạo tâm −1',bio:'là con nhà đồ tể ở {$que}, từ nhỏ đã quen mùi máu'},
  {id:'thusinh',grp:'thuong',n:'Thư sinh nghèo',i:'📜',fx:{ngo:3,hpP:-5},d:'Ngộ tính +3, khí huyết −5%',bio:'là thư sinh nghèo ở {$que}, thi ba lần không đỗ'},
  {id:'khat',grp:'kho',bac:[0,30],n:'Tiểu khất cái',i:'🥣',fx:{van:2,tp:2},st:-10,d:'Khí vận +2, thân pháp +2, không xu dính túi',bio:'là đứa trẻ ăn xin ở {$que}, không cha không mẹ'},
  {id:'thegia',grp:'kha',lt:[1,2],bac:[10000,20000],n:'Con thứ thế gia',i:'🏯',st:45,pill:'hoixuan',d:'Thêm linh thạch và một viên đan',bio:'là con thứ của một thế gia ở {$que}, không được ai coi trọng'},
  {id:'mieu',grp:'kho',n:'Đứa trẻ bị bỏ ở miếu',i:'🛕',fx:{tam:3},karma:5,d:'Đạo tâm +3',bio:'bị bỏ trước cửa miếu hoang ở {$que}, được lão từ giữ đền nuôi lớn'},
  {id:'ren',grp:'thuong',n:'Con nhà thợ rèn',i:'⚒️',fx:{defP:15},d:'Thủ +15%',bio:'là con nhà thợ rèn ở {$que}, tay chai từ năm lên tám'},
  {id:'daodong',grp:'thuong',n:'Tiểu đạo đồng',i:'☯️',fx:{mpP:15},skill:1,d:'Linh lực +15%, biết sẵn một môn pháp thuật',bio:'là đạo đồng quét sân trong một đạo quán nhỏ ở {$que}'},
  {id:'linh',grp:'thuong',n:'Cựu binh biên ải',i:'🛡️',fx:{hpP:10,atkP:5},age:6,d:'Khí huyết +10%, công +5%, nhập đạo muộn sáu năm',bio:'từng là lính biên ải {$quoc}, sống sót trở về {$que} với ba vết sẹo'},
  {id:'buon',grp:'kha',bac:[8000,20000],n:'Con nhà buôn',i:'⚖️',st:70,d:'Hầu bao rủng rỉnh bạc',bio:'là con nhà buôn vải ở {$que}, giỏi tính toán hơn giỏi đánh nhau'},
  {id:'chai',grp:'thuong',n:'Con nhà chài lưới',i:'🎣',fx:{tp:3},d:'Thân pháp +3',bio:'là con nhà chài lưới ở {$que}, bơi giỏi trước khi biết đi'},
  {id:'duoc',grp:'thuong',n:'Dược đồng',i:'🌿',pill:'hoixuan',pill2:'giaidoc',d:'Thêm hai viên đan',bio:'là dược đồng cho một hiệu thuốc ở {$que}, thuộc lòng trăm vị thảo dược'},
  {id:'mahuyet',grp:'kho',n:'Mang huyết mạch ma tộc',i:'🩸',fx:{atkP:12},karma:-10,tamma:10,d:'Công +12%, mang sẵn tâm ma',bio:'sinh ra ở {$que} với đôi mắt đỏ, dân làng gọi là con quỷ'},
  {id:'hat',grp:'thuong',n:'Con nhà gánh hát',i:'🎭',fx:{van:2,ngo:1},d:'Khí vận +2, ngộ tính +1',bio:'theo gánh hát rong khắp {$quoc}, giỏi đóng vai người khác'},
];
