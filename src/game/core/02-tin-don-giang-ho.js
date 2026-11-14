// ---------- tin đồn giang hồ (thế giới)
const RUMOR = {
  tien: ['Nghe nói {$a} bế quan đã ba năm chưa ra, động phủ ngày đêm tỏa hào quang.','{$a} một mình xông vào sào huyệt yêu thú, ba ngày sau ôm về một viên nội đan to bằng nắm tay.','Trên luận đạo hội, {$a} chỉ nói một câu mà khiến trưởng lão {$s} trầm ngâm cả buổi.','{$a} đột phá {$cg}, trời quang bỗng nổi mây ngũ sắc.','Người ta thấy {$a} ngự kiếm qua {$pl}, kiếm quang dài như cầu vồng.','{$a} đoạt khôi thủ đại bỉ {$s}, cả tông môn treo đèn ba đêm.'],
  ma: ['Nghe nói {$a} giết người đoạt bảo ở {$pl}, ba mươi sáu xác không còn một giọt máu.','{$a} phản {$s}, trước khi đi đốt sạch tàng kinh các.','Có kẻ nói {$a} đã nhập ma, nửa đêm thét lên, quanh người bốc lửa đen.','Lệnh truy nã {$a} dán khắp các thành trấn, giá treo tới ba nghìn linh thạch.'],
  tinh: ['{$s} treo đèn đỏ khắp núi: {$a} thành hôn với {$b}.','Người ta đồn {$a} và {$b} từng cùng nhau ngắm trăng ở {$pl}. Không ai dám hỏi thật.','{$a} cầu thân {$b} bị từ chối, uống say ba ngày ở tửu lâu.'],
  tu: ['Tin dữ: {$a} tử trận ở {$pl}, kiếm gãy làm ba.','Thú triều tràn qua {$pl}. Người ta tìm thấy di vật của {$a} giữa xác yêu thú.','{$a} độ kiếp thất bại, tro bụi bay khắp ba ngọn núi.','{$a} vào bí cảnh rồi không trở ra nữa. Tông môn đã dựng bia.'],
  the: ['{$s} mở sơn môn thu nhận đệ tử, thiếu niên khắp nơi nô nức kéo về.','{$s} mở kỳ đại bỉ: đệ tử trong tông lên lôi đài thi đấu.','Vạn Bảo Thương Hội treo vạn ngọn đèn khắp {$pl}: đăng hội mở, đấu giá theo sau.','Đại hội đấu giá ở {$pl} sắp mở, nghe đồn có cả {$dan}.','Mặt trời không mọc ở {$pl} đã mười ngày. Dân quanh đó chất củi, chèn cửa: Đêm Dài tới.','Yêu khí ở {$pl} bốc lên tận trời, thương đội đều đi đường vòng.','{$s} và {$s2} vì một mạch linh thạch mà đánh nhau, chết mấy chục đệ tử.','Trà lâu khắp nơi lại kể chuyện Ngũ Tổ chém Yêu Hoàng. Ai cũng thuộc, mà vẫn nghe.','Có sao chổi quét ngang trời, các đạo quan đều đóng cửa bói quẻ.','Lương thực mất mùa, phàm nhân dưới chân núi bán con lấy gạo.'],
};

// ================= DỮ LIỆU TRÒ CHƠI =================
const EL = {
  kim:{n:'Kim',c:'金'}, moc:{n:'Mộc',c:'木'}, thuy:{n:'Thủy',c:'水'}, hoa:{n:'Hỏa',c:'火'}, tho:{n:'Thổ',c:'土'},
  loi:{n:'Lôi',c:'雷'}, bang:{n:'Băng',c:'冰'}, phong:{n:'Phong',c:'風'}, am:{n:'Âm',c:'陰'}, phat:{n:'Phật',c:'佛'}, vo:{n:'Vô',c:'無'}
};
const KHAC = {kim:'moc', moc:'tho', tho:'thuy', thuy:'hoa', hoa:'kim', loi:'am', phat:'am', bang:'hoa'};
const NGUHANH = ['kim','moc','thuy','hoa','tho'];

const REALM = ['Luyện Khí','Trúc Cơ','Kết Đan','Nguyên Anh','Hóa Thần','Độ Kiếp'];
const TIEU = ['sơ kỳ','trung kỳ','hậu kỳ','viên mãn'];
const LIFE = [60,130,300,650,1500,3000];
const TAB = { // chỉ số gốc theo đại cảnh giới
  hp:[80,180,400,880,1900,4000], mp:[30,60,120,240,480,960],
  atk:[10,22,48,105,230,500], def:[3,7,15,32,70,150]
};
const TS = [1,2,4.5,10,22];         // nhịp thời gian theo vùng
// hệ số linh thạch theo vùng. Linh thạch quý: cả trăm là cả một gia tài, chừng 40 đã là nhiều.
const ECON=0.15,SC=[1,2.2,4.8,10,20].map(x=>x*ECON);
const EH = [43,101,230,513,1134];     // khí huyết yêu ma thường
const EA = [14,30,68,150,331];
const ED = [2,6,12,26,57];

const ROOT = [
  {id:'thien',n:'Thiên linh căn',m:1.6,w:5,k:1,d:'Một hệ thuần khiết. Tu luyện cực nhanh.'},
  {id:'bien',n:'Biến dị linh căn',m:1.45,w:6,k:1,d:'Lôi, Băng hoặc Phong. Hiếm có, uy lực lạ.'},
  {id:'song',n:'Song linh căn',m:1.2,w:18,k:2,d:'Hai hệ. Tư chất tốt.'},
  {id:'tam',n:'Tam linh căn',m:1.0,w:30,k:3,d:'Ba hệ. Bình thường.'},
  {id:'tu',n:'Tứ linh căn',m:0.85,w:25,k:4,d:'Bốn hệ. Tu luyện chậm, học được nhiều hệ.'},
  {id:'tap',n:'Ngũ hành tạp linh căn',m:0.7,w:16,k:5,d:'Đủ năm hệ. Người đời gọi là phế linh căn.'},
];

const ORIGIN = [
  {id:'nong',n:'Con nhà nông',i:'🌾',fx:{hpP:10},d:'Khí huyết +10%',bio:'vốn là con nhà nông, tuổi thơ quanh quẩn bờ ruộng {$que}'},
  {id:'tran',n:'Con nhà trận sư',i:'🔯',fx:{ngo:2,tam:1},d:'Ngộ tính +2, đạo tâm +1',bio:'vốn là con nhà trận sư sa sút, lớn lên ở {$que}'},
  {id:'dote',n:'Con nhà đồ tể',i:'🔪',fx:{atkP:8,tam:-1},d:'Công +8%, đạo tâm −1',bio:'là con nhà đồ tể ở {$que}, từ nhỏ đã quen mùi máu'},
  {id:'thusinh',n:'Thư sinh nghèo',i:'📜',fx:{ngo:3,hpP:-5},d:'Ngộ tính +3, khí huyết −5%',bio:'là thư sinh nghèo ở {$que}, thi ba lần không đỗ'},
  {id:'khat',n:'Tiểu khất cái',i:'🥣',fx:{van:2,tp:2},st:-10,d:'Khí vận +2, thân pháp +2, không xu dính túi',bio:'là đứa trẻ ăn xin ở {$que}, không cha không mẹ'},
  {id:'thegia',n:'Con thứ thế gia',i:'🏯',st:45,pill:'hoixuan',d:'Thêm linh thạch và một viên đan',bio:'là con thứ của một thế gia ở {$que}, không được ai coi trọng'},
  {id:'mieu',n:'Đứa trẻ bị bỏ ở miếu',i:'🛕',fx:{tam:3},karma:5,d:'Đạo tâm +3',bio:'bị bỏ trước cửa miếu hoang ở {$que}, được lão từ giữ đền nuôi lớn'},
  {id:'ren',n:'Con nhà thợ rèn',i:'⚒️',fx:{defP:15},d:'Thủ +15%',bio:'là con nhà thợ rèn ở {$que}, tay chai từ năm lên tám'},
  {id:'daodong',n:'Tiểu đạo đồng',i:'☯️',fx:{mpP:15},skill:1,d:'Linh lực +15%, biết sẵn một môn pháp thuật',bio:'là đạo đồng quét sân trong một đạo quán nhỏ ở {$que}'},
  {id:'linh',n:'Cựu binh biên ải',i:'🛡️',fx:{hpP:10,atkP:5},age:6,d:'Khí huyết +10%, công +5%, nhập đạo muộn sáu năm',bio:'từng là lính biên ải {$quoc}, sống sót trở về {$que} với ba vết sẹo'},
  {id:'buon',n:'Con nhà buôn',i:'⚖️',st:70,d:'Thêm nhiều linh thạch',bio:'là con nhà buôn vải ở {$que}, giỏi tính toán hơn giỏi đánh nhau'},
  {id:'chai',n:'Con nhà chài lưới',i:'🎣',fx:{tp:3},d:'Thân pháp +3',bio:'là con nhà chài lưới ở {$que}, bơi giỏi trước khi biết đi'},
  {id:'duoc',n:'Dược đồng',i:'🌿',pill:'hoixuan',pill2:'giaidoc',d:'Thêm hai viên đan',bio:'là dược đồng cho một hiệu thuốc ở {$que}, thuộc lòng trăm vị thảo dược'},
  {id:'mahuyet',n:'Mang huyết mạch ma tộc',i:'🩸',fx:{atkP:12},karma:-10,tamma:10,d:'Công +12%, mang sẵn tâm ma',bio:'sinh ra ở {$que} với đôi mắt đỏ, dân làng gọi là con quỷ'},
  {id:'hat',n:'Con nhà gánh hát',i:'🎭',fx:{van:2,ngo:1},d:'Khí vận +2, ngộ tính +1',bio:'theo gánh hát rong khắp {$quoc}, giỏi đóng vai người khác'},
];

const TRAIT = [
  {id:'kiemtam',n:'Kiếm tâm',i:'🗡️',fx:{elP:{kim:25}},d:'Pháp thuật hệ Kim +25%'},
  {id:'thanluc',n:'Thiên sinh thần lực',i:'💪',fx:{atkP:15},d:'Công +15%'},
  {id:'menhcung',n:'Mệnh cứng',i:'🪨',fx:{hpP:20},d:'Khí huyết +20%'},
  {id:'chithuy',n:'Tâm như chỉ thủy',i:'🪷',fx:{tam:3,tammaRes:50},d:'Đạo tâm +3, tâm ma tăng chậm một nửa'},
  {id:'linhnhan',n:'Linh nhãn',i:'👁️',fx:{chkP:10},d:'Mọi phép thử +10%'},
  {id:'luoi',n:'Ba tấc lưỡi',i:'👅',fx:{shopP:20},d:'Mua đồ rẻ 20%'},
  {id:'yeuhuyet',n:'Huyết mạch yêu tộc',i:'🐾',fx:{regenHp:3},d:'Mỗi lượt hồi 3% khí huyết'},
  {id:'thiendo',n:'Thiên đố anh tài',i:'🌩️',fx:{ngo:5,lifeP:-15},d:'Ngộ tính +5, thọ nguyên −15%'},
  {id:'phuctinh',n:'Phúc tinh cao chiếu',i:'🍀',fx:{van:5},d:'Khí vận +5'},
  {id:'hoalinh',n:'Hỏa linh thể',i:'🔥',fx:{elP:{hoa:25},burnHit:0.15},d:'Hỏa +25%, mỗi đòn gây thêm Thiêu'},
  {id:'bangco',n:'Băng cơ ngọc cốt',i:'❄️',fx:{defP:20,elP:{thuy:15,bang:15}},d:'Thủ +20%, Thủy và Băng +15%'},
  {id:'truongtho',n:'Trường thọ',i:'🐢',fx:{lifeP:25},d:'Thọ nguyên +25%'},
  {id:'bachdoc',n:'Bách độc bất xâm',i:'🧪',fx:{poisonImm:1,hpP:5},d:'Miễn nhiễm độc'},
  {id:'ngodao',n:'Ngộ đạo nhanh',i:'💫',fx:{tvP:20},d:'Tu vi nhận thêm 20%'},
  {id:'khotu',n:'Khổ tu',i:'⛰️',fx:{bqP:50},d:'Bế quan hiệu quả gấp rưỡi'},
  {id:'sattinh',n:'Sát tinh',i:'☄️',fx:{execute:30},d:'Đánh kẻ dưới 30% khí huyết +30%'},
  {id:'mongdu',n:'Mộng du tiên cảnh',i:'🌙',fx:{tvP:10,tam:2},d:'Tu vi +10%, đạo tâm +2'},
  {id:'huyenco',n:'Huyền cơ',i:'🎐',fx:{mpP:20,mpCost:-15},d:'Linh lực +20%, pháp thuật tốn ít hơn 15%'},
];

// ---- Công pháp / pháp thuật: [id, tên, hệ, bậc, linh lực, hiệu ứng, câu tả]
const SK_RAW = [
  ['ngukiem','Ngự Kiếm Thuật','vo',1,6,{p:1.35},'Phi kiếm rời vỏ, lượn một vòng rồi lao thẳng tới.'],
  ['kimcham','Kim Châm Quyết','kim',1,5,{p:.62,h:2,pierce:.5},'Mấy sợi kim quang mảnh như lông trâu bắn ra.'],
  ['duekim','Duệ Kim Kiếm Khí','kim',1,8,{p:1.6,crit:20},'Kiếm khí sắc lạnh xé gió.'],
  ['triendang','Triền Đằng Thuật','moc',1,6,{p:.8,poison:.35},'Dây leo mọc lên quấn chặt, gai đâm vào thịt.'],
  ['hoixuan','Thanh Mộc Hồi Xuân','moc',1,8,{heal:18,regen:2},'Lục quang mát rượi lan khắp kinh mạch.'],
  ['thuytien','Thủy Tiễn Thuật','thuy',1,5,{p:1.35},'Ba mũi tên nước xé không lao tới.'],
  ['hanbang','Hàn Băng Chưởng','thuy',1,7,{p:1.1,weak:2},'Chưởng phong lạnh buốt, sương đóng trên vạt áo đối phương.'],
  ['hoacau','Hỏa Cầu Thuật','hoa',1,7,{p:1.6},'Quả cầu lửa to bằng cái bát gào thét bay ra.'],
  ['phanhuyet','Phần Huyết Quyết','hoa',1,0,{selfHp:8,rage:2},'Máu trong người sôi lên, mắt đỏ ngầu.'],
  ['thachgiap','Thạch Giáp Thuật','tho',1,6,{block:1.6},'Đá vụn bay lên kết thành lớp giáp dày.'],
  ['lacthach','Lạc Thạch Thuật','tho',1,8,{p:1.2,stun:30},'Tảng đá từ trên cao giáng xuống.'],
  ['luuvan','Lưu Vân Bộ','phong',1,5,{p:.5,evade:1},'Thân hình nhòe đi như mây trôi.'],
  ['chuongloi','Chưởng Tâm Lôi','loi',1,9,{p:1.4,stun:35},'Lòng bàn tay lóe sáng, tia sét nổ đanh.'],
  ['canhkim','Canh Kim Liệt Không Trảm','kim',2,14,{p:2.4,pierce:.3},'Một đường kim quang chém xuống, không khí rách toạc.'],
  ['phanquang','Phân Quang Kiếm Ảnh','kim',2,14,{p:.55,h:4},'Một kiếm hóa bốn, ảnh thật khó phân.'],
  ['docchuong','Vạn Mộc Độc Chướng','moc',2,12,{p:.5,poison:.9,weak:1},'Sương xanh lục bốc lên, cỏ cây quanh đó héo rũ.'],
  ['khovinh','Khô Vinh Đạo','moc',2,12,{p:1.5,drain:50},'Sinh cơ của đối phương chảy ngược về phía ngươi.'],
  ['bichchuong','Huyền Thủy Bích Chướng','thuy',2,10,{block:2.2,cleanse:1},'Màn nước xanh thẫm dựng lên, sóng gợn không ngừng.'],
  ['phuchai','Phúc Hải Chưởng','thuy',2,14,{p:2.0,weak:2},'Chưởng ra như sóng dữ đổ ập.'],
  ['lietdiem','Liệt Diễm Phần Thiên','hoa',2,16,{p:1.7,burn:.8,vuln:2},'Lửa đỏ cuộn lên tận trời, đá cũng chảy thành nước.'],
  ['hoalong','Hỏa Long Quyết','hoa',2,15,{p:1.9,bonusIf:'dot'},'Rồng lửa gầm lên, lao vào chỗ thịt đang thối rữa.'],
  ['transon','Hậu Thổ Trấn Sơn Ấn','tho',2,15,{p:1.8,stun:45},'Ấn đá to như quả núi đè xuống.'],
  ['kimcuong','Kim Cương Bất Hoại','tho',2,12,{block:2.6,rage:1},'Da thịt ánh lên sắc vàng đồng.'],
  ['phongnhan','Phong Nhận Thuật','phong',2,10,{p:.7,h:3,evade:1},'Gió hóa thành lưỡi dao vô hình.'],
  ['bangphong','Băng Phong Thiên Lý','bang',2,14,{p:1.5,stun:40,weak:1},'Băng lan ra như mạng nhện, đông cứng mọi thứ.'],
  ['nhiephon','Nhiếp Hồn Âm','am',2,10,{p:1.0,weak:2,vuln:2},'Tiếng thì thầm chui thẳng vào thức hải.'],
  ['tukhi','Tử Khí Đông Lai','vo',2,12,{rage:2,heal:10},'Khí tím từ phương đông tràn vào thất khiếu.'],
  ['vankiem','Vạn Kiếm Quy Tông','kim',3,26,{p:.55,h:6},'Ngàn vạn kiếm ảnh từ trời đổ xuống như mưa.'],
  ['truongsinh','Thanh Đế Trường Sinh Quyết','moc',3,22,{heal:35,regen:3,cleanse:1},'Vết thương khép lại, nơi máu rơi mọc lên hoa cỏ.'],
  ['thienha','Thiên Hà Đảo Quyển','thuy',3,26,{p:3.0,weak:2},'Cả dải ngân hà như đổ ngược xuống trần gian.'],
  ['tammuoi','Tam Muội Chân Hỏa','hoa',3,28,{p:2.4,burn:1.6},'Ngọn lửa trắng xanh, nóng đến mức không còn khói.'],
  ['daidia','Đại Địa Chi Nộ','tho',3,26,{p:2.6,stun:55},'Mặt đất nứt toác, nuốt lấy chân đối phương.'],
  ['cuutieu','Cửu Tiêu Thần Lôi','loi',3,30,{p:3.2,stun:40},'Chín đạo sấm từ cửu tiêu giáng xuống.'],
  ['huyetma','Huyết Ma Đại Pháp','am',3,0,{selfHp:12,p:3.0,drain:30},'Máu ngươi hóa thành sương đỏ, nuốt chửng đối phương.'],
  ['daibi','Đại Bi Chưởng','phat',3,20,{p:2.0,heal:15},'Phật quang vàng nhạt, một chưởng mà như có ngàn tay.'],
  ['trutien','Tru Tiên Kiếm Trận','kim',4,40,{p:.6,h:8,pierce:1},'Bốn thanh kiếm cắm bốn phương, trời đất hóa thành lò sát.'],
  ['phanthien','Phần Thiên Diệt Thế','hoa',4,45,{p:4.0,burn:2},'Bầu trời cháy đỏ, mặt trời như rơi xuống.'],
  ['voluong','Vô Lượng Băng Phong','thuy',4,40,{p:3.0,stun:70,weak:2},'Vạn dặm hóa thành băng nguyên trong một hơi thở.'],
  ['vanco','Vạn Cổ Thanh Thiên','moc',4,38,{heal:50,regen:3,cleanse:1,rage:1},'Cây cổ thụ hư ảnh vươn cao chạm trời, che chở cho ngươi.'],
  ['banco','Bàn Cổ Khai Thiên Ấn','tho',4,45,{p:4.0,vuln:3},'Một ấn bổ xuống như khai thiên lập địa.'],
  ['thienphat','Thiên Phạt Lôi Kiếp','loi',4,50,{p:5.0},'Ngươi mượn thiên uy, sét đánh không chừa một tấc.'],
  ['tieudao','Tiêu Dao Du','phong',4,30,{p:1.2,h:3,evade:2},'Cưỡi gió mà đi, thân như không có trọng lượng.'],
  ['thaicuc','Thái Cực Huyền Công','vo',4,35,{block:2.5,p:2.5},'Âm dương xoay chuyển, công thủ hợp nhất.'],
];
const SK = {};
const SK_PHYS=['ngukiem','kimcham','duekim','canhkim','phanquang','vankiem','trutien','phongnhan','luuvan','tieudao','thaicuc','phanhuyet','huyetma','lacthach','transon','daidia','banco'];
const SK_CHARGE=['cuutieu','thienha','banco','thienphat','phanthien','daidia','voluong'];
const SK_AOE=['vankiem','trutien','lietdiem','docchuong','phanthien','nhiephon','bangphong'];
const SK_DAO=['vankiem','truongsinh','tammuoi','daibi','trutien','vanco','tieudao','thaicuc'];
SK_RAW.forEach(([id,n,el,t,c,fx,f])=>{fx=Object.assign({},fx);
  if(SK_CHARGE.includes(id)){fx.charge=true;if(fx.p)fx.p=Math.round(fx.p*1.35*100)/100;}
  if(SK_AOE.includes(id))fx.aoe=true;
  SK[id]={id,n,el,t,c,fx,f,dao:SK_DAO.includes(id)?1:0,dt:SK_PHYS.includes(id)?'vl':'phep'};});
const BASIC = {id:'_atk',n:'Đánh thường',el:'vo',t:0,c:0,fx:{p:1.0},f:'',dt:'vl'};

// ---- Pháp bảo: nguyên mẫu hiệu ứng + tên gốc
const RELIC_K = [
  {k:'kiem',b:['Kiếm','Trường Kiếm','Đoản Kiếm','Cổ Kiếm'],fx:{atkP:10}},
  {k:'dao',b:['Đao','Trảm Mã Đao','Đoản Đao'],fx:{atkP:7,crit:5,critDmg:10}},
  {k:'hotam',b:['Hộ Tâm Phù','Hộ Tâm Ngọc','Hộ Tâm Kính'],fx:{hoTam:6,defP:5}},
  {k:'phap',b:['Pháp Trượng','Phất Trần','Bảo Châu'],fx:{matkP:12}},
  {k:'giap',b:['Giáp','Nhuyễn Giáp','Hộ Tâm Kính'],fx:{defP:20}},
  {k:'bao',b:['Đạo Bào','Pháp Y','Phi Phong'],fx:{hpP:12}},
  {k:'boi',b:['Ngọc Bội','Ngọc Quyết','Ngọc Bài'],fx:{mpP:18}},
  {k:'ngoa',b:['Ngoa','Vân Hài','Đạp Vân Ngoa'],fx:{tp:3,dodge:3}},
  {k:'linh',b:['Linh','Chung','Khánh'],fx:{startBlock:12}},
  {k:'hoan',b:['Hoàn','Thủ Trạc','Kim Hoàn'],fx:{regenMp:6}},
  {k:'dinh',b:['Đỉnh','Đan Lô','Lư Hương'],fx:{pillP:30}},
  {k:'phien',b:['Phiên','Cờ Lệnh','Hồn Phiên'],fx:{poisonHit:.15}},
  {k:'chau',b:['Châu','Dạ Minh Châu','Định Phong Châu'],fx:{regenHp:3}},
  {k:'kinh',b:['Kính','Đồng Kính','Chiếu Yêu Kính'],fx:{reflect:15}},
  {k:'gian',b:['Ngọc Giản','Bí Lục','Kinh Quyển'],fx:{tvP:15}},
  {k:'an',b:['Ấn','Phiên Thiên Ấn','Triện'],fx:{stunP:8}},
  {k:'tram',b:['Trâm','Thoa','Bộ Diêu'],fx:{dodge:6}},
  {k:'holo',b:['Hồ Lô','Ngọc Bình','Tịnh Bình'],fx:{healAfter:10}},
  {k:'thap',b:['Tháp','Bảo Tháp','Linh Lung Tháp'],fx:{defP:8,blockTurn:4}},
  {k:'tan',b:['Tán','Bảo Tán','Hoa Cái'],fx:{firstEvade:1}},
  {k:'cam',b:['Cầm','Ngọc Địch','Tiêu'],fx:{weakStart:1}},
  {k:'xich',b:['Xích','Khổn Tiên Thằng','Khốn Tác'],fx:{vulnStart:1}},
  {k:'but',b:['Bút','Nghiên','Thần Bút'],fx:{ngo:3}},
  {k:'tui',b:['Càn Khôn Đại','Trữ Vật Đại'],fx:{stonesP:20,pillSlot:2}},
  {k:'nhan',b:['Nhẫn','Ban Chỉ'],fx:{van:3,crit:3,critDmg:8}},
  {k:'lenh',b:['Lệnh Bài','Phù Tiết'],fx:{tam:3,shopP:8}},
  {k:'dang',b:['Đăng','Liên Đăng','Lưu Ly Đăng'],fx:{tam:2,tammaRes:30}},
  {k:'cot',b:['Yêu Nha','Yêu Đan','Thú Cốt'],fx:{execute:20}},
  {k:'huyet',b:['Huyết Ngọc','Huyết Tinh'],fx:{drain:8}},
  {k:'phu',b:['Hộ Mệnh Phù','Phù Lục'],fx:{hpP:6,defP:8}},
  {k:'hap',b:['Kiếm Hạp'],fx:{elX:20}},
];
const RELIC_PRE = {
  kim:['Canh Kim','Tử Kim','Huyền Thiết','Xích Đồng','Ngân Nguyệt','Thanh Phong'],
  moc:['Thanh Mộc','Bích Ngọc','Lôi Kích Mộc','Tử Trúc','Thiên Tàm','Lục Liễu'],
  thuy:['Huyền Thủy','Băng Phách','Hàn Ngọc','Thương Lan','Bích Ba','Lưu Ly'],
  hoa:['Xích Diễm','Chu Tước','Liệt Dương','Hỏa Vân','Lưu Hỏa','Kim Ô'],
  tho:['Hậu Thổ','Huyền Hoàng','Thạch Tâm','Sơn Hà','Hoàng Sa','Tức Nhưỡng'],
  vo:['Cửu Long','Thất Tinh','Âm Dương','Bát Quái','Tứ Tượng','Thái Cực','Hỗn Nguyên','Vạn Tượng','Tiên Thiên','Như Ý','Phục Ma','Định Hải','Trấn Hồn','Tàn Nguyệt','Vô Ưu','Lưỡng Nghi','Thanh Tâm','Bích Lạc'],
};
const GRADE = ['Phàm phẩm','Linh phẩm','Bảo phẩm','Huyền phẩm','Tiên phẩm'];
const TM = [1,1.4,1.9,2.5,3.2];
const RELIC_LORE = [
  'Tương truyền là di vật của {$who}, {$sect}.','Trên thân khắc một hàng chữ nhỏ đã mờ: “{motto}”.','Có vết nứt chạy dọc, như từng đỡ một đòn rất nặng.','Cầm lên thấy ấm, như vẫn còn hơi người.','Do thợ rèn {$who} ở {$pl} luyện trong bốn mươi chín ngày.','Nghe nói từng qua tay bảy chủ nhân, không ai sống quá trăm tuổi.','Khi trăng tròn, nó khẽ ngân lên như hát.','Đáy có con dấu của Vạn Bảo Thương Hội.','Bị chôn dưới đất trăm năm, gỉ sét chỉ phủ một lớp mỏng.','Lúc chạm vào, ngươi thoáng nghe tiếng ai thở dài.','Hoa văn mây cuộn, tay nghề ấy nay không còn ai làm được.','Người bán thề sống thề chết là đồ thượng cổ. Ngươi bán tín bán nghi.','Có dính một vệt máu khô, lau mãi không sạch.','Mùi trầm hương thoang thoảng, không biết từ đâu ra.'
];
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
