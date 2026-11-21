// Nguồn chuẩn cho Đ10 (Đại Mộng): Mộng Ấn, ba tri thức, Người Gác Bến, Bến Vong Xuyên, nghi thức, tám kết thúc.
// Luật: src/game/core2/67-dai-mong.js · chữ giao diện: content/text/dai-mong.json (khoá dm.*) ·
// lời văn (GPT viết): content/dai-mong/** (kiểm bằng tools/kiem-tra-dai-mong.js, ghép vào src/game/data/08-dai-mong-du-lieu.js → DM_DATA).
// Sổ luân hồi (giữ qua kiếp, ngoại lệ của "quên sạch"): G.meta.mong=[mã], G.meta.tri={TRI01:[nguồn…]}, G.meta.gb={n,nhan,kiep,np1,np2}, G.meta.ends=[…].

// Tám Mộng Ấn (bỏ #9 "Người dệt mộng" của B, HN A.10). tri: tri thức mà Mộng Ấn làm chứng. cach: cách nhặt (luật ở core2/67).
//   ben: ngồi đợi ở Bến Vong Xuyên, nghe Người Gác Bến tới cuối · gb3: nhận ra Người Gác Bến ở ba kiếp khác nhau ·
//   mo: viếng mộ mình kiếp trước · tuong: xem vở tuồng kể đời mình kiếp trước (LOC09) · que: xin quẻ thấy chính mình (LOC12, từ kiếp 2) ·
//   tk: một thiên kiêu đã gặp ở kiếp trước nhận ra ngươi · troi: ở LOC15 lúc Tiên Nhân Hạ Phàm / Thiên Lộ Mở đang diễn ra mà nhìn lên ·
//   tuyen: qua hồi 4 đại lộ Tỉnh Mộng (DL09 N4).
const MONG_AN={
  MA01:{n:'Bát canh không đáy',tri:'TRI01',cach:'ben',he:'Canh quên không làm quên hết.'},
  MA02:{n:'Người không già',tri:'TRI01',cach:'gb3',he:'Có người không bị cuốn vào vòng.'},
  MA03:{n:'Mộ của chính mình',tri:'TRI01',cach:'mo',he:'Ngươi từng sống, từng chết ở đây.'},
  MA04:{n:'Tuồng cũ',tri:'TRI01',cach:'tuong',loc:'LOC09',he:'Thế gian nhớ ngươi hơn ngươi nhớ mình.'},
  MA05:{n:'Chữ trong quẻ',tri:'TRI02',cach:'que',loc:'LOC12',he:'Mệnh đã được viết lặp lại.'},
  MA06:{n:'Kẻ cũng đang mơ',tri:'TRI02',cach:'tk',he:'Không chỉ mình ngươi đang mơ.'},
  MA07:{n:'Vết nứt trên trời',tri:'TRI03',cach:'troi',loc:'LOC15',clk:['CLK12','CLK14'],he:'Thượng giới cũng là một tầng mộng.'},
  MA08:{n:'Đáy Vong Xuyên',tri:'TRI02',cach:'tuyen',tuyen:'DL09',nut:'N4',he:'Vong Xuyên chảy từ chấp niệm của chúng sinh.'}
};
// Ba tri thức (HN C "Thức tỉnh"): đạt khi có `can` nguồn ĐỘC LẬP (khác mã). Luật 5: mỗi tri thức có ít nhất hai nguồn ở nơi lõi (LOC05/12/15)
// nên luôn còn đường tới kết thật dù NPC chết hết. can trước: phải biết tri thức này rồi mới khảo được nguồn của tri thức sau.
const TRI_THUC={
  TRI01:{n:'Vòng đã từng khép',can:2,truoc:null},
  TRI02:{n:'Ký ức đang nuôi vòng',can:2,truoc:'TRI01'},
  TRI03:{n:'Cửa có thể chọn',can:2,truoc:'TRI02'}
};
// Việc ở mục "Đại sự" của các nơi neo. k: khao (khảo sát cho một nguồn tri thức) · mong (nhặt Mộng Ấn) · khoa (quyền khoá cho NG04) · np12 (cảnh Dã Tâm).
//   ngay: số ngày làm · st/bac: linh thạch / xu phải bỏ ra · can: tri thức phải biết trước · moiKiep: mỗi nơi chỉ cho một nguồn tri thức mỗi kiếp (DM_CFG.khaoMoiKiep).
const DM_VIEC={
  k05a:{loc:'LOC05',k:'khao',tri:'TRI01',ngay:30,bac:2000},
  k05b:{loc:'LOC05',k:'khao',tri:'TRI02',can:'TRI01',ngay:30,bac:2000},
  k05c:{loc:'LOC05',k:'khao',tri:'TRI03',can:'TRI02',ngay:30,bac:2000},
  k12a:{loc:'LOC12',k:'khao',tri:'TRI01',ngay:30,bac:1000},
  k12b:{loc:'LOC12',k:'khao',tri:'TRI02',can:'TRI01',ngay:30,bac:1000},
  k15b:{loc:'LOC15',k:'khao',tri:'TRI02',can:'TRI01',ngay:30,bac:0},
  k15c:{loc:'LOC15',k:'khao',tri:'TRI03',can:'TRI02',ngay:30,bac:0},
  tuong:{loc:'LOC09',k:'mong',mong:'MA04',ngay:1,bac:300},
  que:{loc:'LOC12',k:'mong',mong:'MA05',ngay:1,bac:500},
  troi:{loc:'LOC15',k:'mong',mong:'MA07',ngay:1,bac:0},
  khoa05:{loc:'LOC05',k:'khoa',can:'TRI02',ngay:7,bac:0},
  khoa07:{loc:'LOC07',k:'khoa',can:'TRI02',ngay:7,bac:0},
  khoa12:{loc:'LOC12',k:'khoa',can:'TRI02',ngay:7,bac:0},
  np12a:{loc:'LOC06',k:'np12',ngay:1,bac:0},
  np12b:{loc:'LOC06',k:'np12',ngay:1,bac:0}
};
// Người Gác Bến: mảnh ký ức Yêu Hoàng lưu ra ngoài vòng (HN A.10). Mỗi kiếp hiện một lần, mỗi lần một dạng (xoay vòng theo số lần đã gặp).
// Lời nói thật từng phần: bậc lộ = số lần đã được nhận ra (tối đa 3) + 1 nếu đã có cảnh Dã Tâm lộ thân phận (np2). Muốn người chơi chặt vòng (END07), khuyên ngăn END05.
const GAC_BEN=['lao_cheo_do','tre_an_may','ni_co_mu','ban_canh','lao_dao','ba_do'];
// Tám kết thúc (HN C "Thức tỉnh và tám kiểu kết thúc lớn"). het: 1 = khép cả hành trình (màn kết, sau đó Tân Mộng); 0 = ghi theo đời, đời vẫn tiếp.
// cau: câu kết của C (giữ nguyên chữ). Điều kiện kiểm ở core2/67 (dmDk).
const KET_THUC={
  END01:{n:'Một đời đã sống',het:0,cau:'Bếp nguội dần. Ngoài sân, một người vẫn nhớ ngươi thích để cửa hé vào những đêm mưa.'},
  END02:{n:'Nhân Hoàng',het:0,cau:'Chiếu thư đi qua những mái nhà ngươi chưa từng bước vào. Từ hôm nay, cái đói ở đó cũng mang một phần tên ngươi.'},
  END03:{n:'Ma chủ',het:0,cau:'Không còn ai gọi ngươi bằng tên lúc nhỏ. Những người quỳ dưới điện vẫn có tên riêng, và ngươi biết mình đã bắt họ trả những gì.'},
  END04:{n:'Phi thăng tỉnh mộng',het:1,cau:'Lần đầu tiên, giấc mộng không gọi ngươi quay lại. Sau lưng, một thế giới vẫn tiếp tục khóc và nhóm bếp.'},
  END05:{n:'Giữ mộng bằng tên mình',het:1,cau:'Trục đá quay chậm. Trong tiếng động ấy, ngươi còn nghe từng cái tên, và lần này không tên nào bị lấy khi họ chưa trả lời.'},
  END06:{n:'Truyền một ngọn đèn',het:0,cau:'Người học trò làm sai một nét, rồi tự sửa. Ngươi ngồi nhìn, nhận ra có một việc từ nay không còn cần tay mình.'},
  END07:{n:'Người chặt vòng',het:1,cau:'Nước thôi chảy ngược. Người sống chỉ còn một đời để từ biệt nhau, và buổi sáng vẫn đến.'},
  END08:{n:'Thế giới không còn người gọi tên',het:1,cau:'Gió đi qua chợ không còn mùi khói bếp. Không ai nguyền rủa ngươi nữa. Cũng không ai gọi.'}
};
// Bốn nghi thức (HN C §9, rút gọn: vật tư đổi thành linh thạch, nhịp lõi đổi thành ngày làm). Tiến độ nghi thức lưu ở thế giới (W().ng), qua các kiếp vẫn còn.
//   NG01 Mở cửa tỉnh mộng (END04): ở LOC15, đủ ba tri thức, từ Hóa Thần; xong thì lần đột phá Độ Kiếp kế tiếp (phi thăng) thành END04.
//   NG02 Thay nguồn (END05): thử mô hình ở LOC15 → lắp bộ tụ ở LOC05, LOC12, LOC15 → chạy thử một chu kỳ (chuKy ngày) → nhận làm người điều phối.
//   NG03 Ngắt vòng (END07): xác minh đường tản ở ba nơi → đặt chốt cơ ở ba nơi → hẹn giờ (henNgay ngày sau); tới giờ đủ ba chốt thì vòng khép.
//   NG04 Diệt thế (END08): đủ ba tri thức, hai trong ba quyền khoá (LOC05, LOC07, LOC12), ở LOC15, đủ sức qua ba xung phản tải (mỗi xung mất xung phần khí huyết).
//   Thiếu điều kiện mà vẫn mở Diệt Thế: chỉ làm 3 khu thành đất ma (maVucTao, Đ8.6), nghi thức vỡ, Đêm Dài tăng một nấc.
const NGHI_THUC={
  NG01:{n:'Mở cửa tỉnh mộng',ket:'END04',loc:'LOC15',realm:4,st:500,ngay:7},
  NG02:{n:'Thay nguồn',ket:'END05',loc:'LOC15',moHinh:{st:50,ngay:7},tu:{st:100,ngay:30},chuKy:30},
  NG03:{n:'Ngắt vòng',ket:'END07',loc:'LOC15',xm:{ngay:2},chot:{st:30,ngay:3},henNgay:7},
  NG04:{n:'Diệt thế',ket:'END08',loc:'LOC15',khoa:2,st:1000,ngay:30,xung:0.15,hpMin:0.5,thieuKhu:3}
};
const NG_NOI=['LOC05','LOC12','LOC15'];
// Đại lộ DL02 "Diệt Thế Ma Đồ" (HN: END08 nếu đủ tri thức; không đủ thì ba khu đất ma): kết tuyến bằng một kết trong `ket` thì cưỡng mở Diệt Thế.
//   Đủ điều kiện NG04 (dmDk) → END08 ở lượt thời gian kế (trả st như NG04, chịu ba xung). Thiếu → như mở thiếu ở LOC15 (thieuKhu khu đất ma, Đêm Dài +1). Mỗi kiếp một lần.
//   Tự quyết: kết A (giữ quyền mạch) và B (cắt mạch sâu) động tới mạch sâu; kết C (dừng trước mạch sâu) không.
const DM_DL={tuyen:'DL02',ket:['A','B']};
// khaoMoiKiep: mỗi nơi neo chỉ cho một nguồn tri thức mỗi kiếp ("lòng đá phải lắng lại") · gbThang: Người Gác Bến hiện sau ngần này tháng kể từ đầu kiếp ·
// gbNhan: số kiếp nhận ra để nhặt MA02 · doiNam: ngồi đợi ở bến thêm ngần ấy năm (cộng vào khoảng luân hồi Đ8.5) · mongMoiKiep: Mộng Ấn tối đa mỗi kiếp ·
// end01Tuoi: tuổi tối thiểu để một đời (không quy ẩn) được tính "đã sống" · end02Bac: xu nuôi quân lương ba kỳ · end03St: linh thạch duy trì một kỳ ·
// end06Bac: bậc nghề chính tối thiểu (0 là bậc đầu) · end06Tuoi · end06Thang: thời gian dạy tới khi học trò tự làm xong một việc ·
// minhBac: bậc quan hệ thế lực tối thiểu để kết minh (5 = Thân thiết).
const DM_CFG={khaoMoiKiep:1,gbThang:[3,30],gbNhan:3,doiNam:[3,12],mongMoiKiep:1,end01Tuoi:40,end02Bac:90000,end03St:300,end03Minh:3,end02Minh:2,
  end06Bac:3,end06Tuoi:35,end06Thang:12,minhBac:5};
// Câu 88: hậu quả thế giới của ba kết theo đời (END02, END03, END06). Chữ: content/dai-mong/hau-qua/ENDxx.json (DM_DATA.hq).
// Hậu quả hiện từ đời sau (kiếp lớn hơn kiếp đạt kết): tin đồn ở quán trà / tin tức (tin = xác suất thay lời truyền miệng thường; nam = tin tức tự đến mỗi năm),
// tả nơi đổi thay trên thẻ địa điểm, Sử lược ghi lúc kết (bản lưu cũ ghi bù), hồi ức "muon" hiện một lần ở màn hết kiếp của đời sau.
const DM_HQ={ket:['END02','END03','END06'],tin:0.4,nam:0.08};
// Hai kỳ ngộ Đại Mộng (chữ: content/dai-mong/ky-ngo/Ax.json, DM_DATA.ky). Mỗi kiếp tối đa một lần mỗi kỳ ngộ.
//   A1 Mộng du tiên cảnh: tu sĩ tĩnh tọa ở nơi hoang (không phải thôn trấn / thành / tông môn), xác suất p mỗi lần tĩnh tọa.
//   A2 Người chèo đò quen: đã có ít nhất một Mộng Ấn, đang ở nơi có sông nước (noi), xác suất p mỗi ngày.
//   e[i] = hiệu ứng của lựa chọn thứ i: tm = tâm ma giảm, hp / mp = phần khí huyết / linh lực tối đa (âm là mất).
const DM_KY={
  A1:{p:0.12,e:[{tm:10,hp:-0.05},{hp:0.1}]},
  A2:{p:0.01,noi:['song','bien','dam','tran','cho'],e:[{},{tm:8},{}]}};
