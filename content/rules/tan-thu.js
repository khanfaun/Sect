// Nguồn chuẩn: TUT, TUT_WISH. Luật xử lý ở src/game/core2/40-tan-thu.js.
// 27 nhiệm vụ tân thủ, chỉ ở kiếp đầu (HN A.12; C §11 D1–D4 HD01–HD18; B §13 HD19–HD27). Không thời hạn, không phạt.
// g: nhóm (A sáu cái đầu làm tuần tự; sau đó lấy lần lượt theo thứ tự mảng, tối đa TUT_MAX cùng lúc)
// Sửa-C.14: nhiệm vụ "sở hữu / đạt trạng thái" có st (đã có thì tự xong); thao tác cốt lõi hoặc đếm số lần chỉ có tick (phải làm sau khi mở).
// need: số lần cần; tick: loại sự kiện đếm (tutTick); st: hàm tên chuỗi tự tính tiến độ (true/false hoặc số), gọi bằng tutState
// go: dẫn đường {panel,tab}|{place:[loại nút]|'*', act}|{modal}|{hud: tên ACT}; act tìm trong placeActs của nút đã thấy
// rw: phần thưởng {bac (đồng), st (linh thạch), pill:[[mã,sl]], relic:'mã danh mục', item:[[mã vật truyện,sl]], lenh (Thưởng Lệnh)}
const TUT=[
 {id:'HD01',g:'A',n:'Biết mình còn gì',d:'Xem tuổi và xuất thân của mình.',need:1,tick:'panel:char',go:{panel:'char'},rw:{item:[['luong_kho',2]]}},
 {id:'HD02',g:'A',n:'Một đường còn hé',d:'Xem linh căn của mình.',need:1,tick:'rootinfo',go:{panel:'char',tab:'base'},rw:{bac:200}},
 {id:'HD03',g:'A',n:'Có ăn mới có ngày mai',d:'Xem đồ đang mang theo.',need:1,tick:'bag',go:{modal:'bag'},rw:{pill:[['hoixuan',1]]}},
 {id:'HD04',g:'A',n:'Hỏi một người còn chịu trả lời',d:'Xem việc có thể nhận quanh đây.',need:1,tick:'jobs.open',go:{place:['tran','thanh','cho','tong'],act:'muusinh'},rw:{bac:300}},
 {id:'HD05',g:'A',n:'Đổi một ngày lấy một ngày',d:'Làm trọn một việc có trả công.',need:1,tick:'job',go:{place:['tran','thanh','cho','tong'],act:'muusinh'},rw:{item:[['luong_kho',2]]}},
 {id:'HD06',g:'A',n:'Khép mắt khi còn nơi nằm',d:'Nghỉ một đêm ở khách điếm hoặc dưới mái nhà mình, hoặc tĩnh tọa một lượt.',need:1,tick:'rest',go:{place:['tran','thanh'],act:'inn'},rw:{pill:[['hoixuan',1]]}},
 {id:'HD07',g:'B',n:'Đường đi có giá',d:'Đi tới một địa điểm lân cận.',need:1,tick:'arrive',go:{place:'*'},rw:{relic:'non_dauap_suong'}},
 {id:'HD08',g:'B',n:'Đếm trước khi trao',d:'Mua hoặc bán một món.',need:1,tick:'trade',go:{place:['tran','thanh','cho'],act:'taphoa'},rw:{bac:500}},
 {id:'HD09',g:'B',n:'Đừng chỉ trông vào may',d:'Học một công pháp hoặc tâm pháp.',need:1,tick:'learn',st:'tutHasLearn',go:{place:['tran','thanh','cho'],act:'taphoa'},rw:{pill:[['tukhi',1]]}},
 {id:'HD10',g:'C',n:'Trước khi bước vào bụi tối',d:'Mang một món binh khí và một viên đan cầm máu.',need:2,tick:'prep',st:'tutPrep',go:{modal:'bag'},rw:{relic:'giap_giap_thach_diem'}},
 {id:'HD11',g:'C',n:'Đối mặt, rồi còn trở về',d:'Săn yêu thú vừa sức và thắng năm lần.',need:5,tick:'hunt',go:{place:'*',act:'sanyeu'},rw:{bac:1000,pill:[['hoixuan',2]]}},
 {id:'HD12',g:'C',n:'Thân này không tự lành',d:'Chữa lành một vết thương.',need:1,tick:'heal',go:{place:'*',act:'heal'},rw:{pill:[['giaidoc',2]]}},
 {id:'HD13',g:'D',n:'Một hơi thở cũng tốn đời',d:'Tĩnh tọa hoặc luyện võ một lượt.',need:1,tick:'train',go:{place:'*',act:'tinh'},rw:{pill:[['tinhnguyen',1]]}},
 {id:'HD14',g:'D',n:'Giữ lấy thứ còn sửa được',d:'Luyện chế một món.',need:1,tick:'craft',go:{panel:'craft'},rw:{pill:[['dinhthan',1]]}},
 {id:'HD15',g:'D',n:'Có người nhớ mặt',d:'Tặng lễ hoặc kết một mối quan hệ.',need:1,tick:'bond',st:'tutHasBond',go:{panel:'bonds'},rw:{bac:500}},
 {id:'HD16',g:'E',n:'Việc đã làm còn để lại gì',d:'Đọc lại sổ nghiệp duyên.',need:1,tick:'nqlog',go:{panel:'journal',tab:'nq'},rw:{bac:300}},
 {id:'HD17',g:'E',n:'Chọn việc, chưa cần chọn cả đời',d:'Vào tông, làm tạp dịch, theo nghề hoặc đạt bậc võ nhập môn.',need:1,tick:'role',st:'tutRole',go:{place:['tong'],act:'join'},rw:{pill:[['tukhi',2]]}},
 {id:'HD18',g:'E',n:'Viết một điều mình muốn',d:'Chọn một nguyện vọng cho kiếp này.',need:1,tick:'wish',st:'tutWish',go:{modal:'wish'},rw:{pill:[['kimcang',1]]}},
 {id:'HD19',g:'F',n:'Dẫn khí nhập thể',d:'Bước vào Luyện Khí.',need:1,tick:'phamup',st:'tutNotPham',go:{hud:'hudBq'},rw:{pill:[['hoixuan',2],['tukhi',2]]}},
 {id:'HD20',g:'F',n:'Bảng treo thưởng',d:'Hoàn thành một việc nhận từ bảng treo thưởng.',need:1,tick:'quest',go:{place:['tran','thanh'],act:'board'},rw:{lenh:3}},
 {id:'HD21',g:'F',n:'Lịch luyện',d:'Tích đủ lịch luyện cho tầng hiện tại.',need:1,tick:'llfull',st:'tutLlFull',go:{panel:'char',tab:'base'},rw:{pill:[['tinhnguyen',1]]}},
 {id:'HD22',g:'G',n:'Động phủ đầu tiên',d:'Khai một động phủ.',need:1,tick:'khaiphu',go:{place:'*',act:'khaiphu'},rw:{relic:'tran_tran_ky_noan_sa'}},
 {id:'HD23',g:'G',n:'Bế quan',d:'Bế quan cộng dồn ba mươi ngày.',need:30,tick:'bqday',go:{hud:'hudBq'},rw:{pill:[['tukhi',3]]}},
 {id:'HD24',g:'G',n:'Bạn đồng hành',d:'Có một linh thú bên mình.',need:1,tick:'hatch',st:'tutHasPet',go:{panel:'pets'},rw:{pill:[['tukhi',2]]}},
 {id:'HD25',g:'H',n:'Đi xa',d:'Tới một đại khu vực khác.',need:1,tick:'region',go:{place:['tran','thanh'],act:'tram'},rw:{pill:[['thanhanh',2]]}},
 {id:'HD26',g:'H',n:'Trước cửa Trúc Cơ',d:'Mở bảng chuẩn bị đột phá Trúc Cơ.',need:1,tick:'prepbt',go:{hud:'hudBt'},rw:{pill:[['homach',1]]}},
 {id:'HD27',g:'H',n:'Trúc Cơ',d:'Đột phá Trúc Cơ thành công.',need:1,tick:'trucco',st:'tutTrucCo',go:{hud:'hudBt'},rw:{pill:[['phacanh',1]],st:50}},
];
// TUT_GRAD: số nhiệm vụ đã nhận thưởng để "tốt nghiệp"; TUT_GRAD_PTS: điểm luân hồi cộng lúc hết kiếp; TUT_MAX: số mở cùng lúc sau nhóm A
const TUT_GRAD=22, TUT_GRAD_PTS=5, TUT_MAX=5;
// Nguyện vọng (HN A.9.3: 8 mục của C §3.3 + "Diệt thế", "Giàu có" của B). Chỉ là lời ghi, không là buff.
const TUT_WISH=[['du_song','Đủ sống'],['giu_nguoi','Giữ người thân'],['nghe','Lập thân bằng nghề'],['quyen','Nắm quyền'],['bao_thu','Báo thù'],['nhap_dao','Tìm đường nhập đạo'],['phi_thang','Đột phá phi thăng'],['luan_hoi','Truy dấu luân hồi'],['giau','Giàu có'],['diet_the','Diệt thế']];
