// Nguồn chuẩn: NQ2. Luật xử lý ở src/game/core2/78-nam-quyen.js (chỉ thế giới mới, thành trấn có chủ n.fa).
// Nắm quyền cả thành trấn:
//   phàm (tran/thanh): cống hiến cho Hoàng quốc đang nắm nơi đó đủ `cong[loại]` (sổ 'fa:FAxx') và danh tiếng khu không dưới danhMin → xin được điều về cai quản.
//   tu sĩ (tutran/tuthanh): (A) ngươi là chủ thế lực đang nắm (r.chuFa) → tiếp quản; (C) đánh chiếm: hộp xác nhận, đánh với lực lượng giữ thành,
//     thắng thì nắm, thế lực đó truy nã ngươi (gây chiến); (E) mua lại: giá = giá đất gốc × giaX, trả linh thạch hạ phẩm, mặc cả theo `mac`.
// mac: [phần giá, cơ hội nhận lời]; từ chối thì cấm hỏi lại `camThang` tháng.
// Nắm quyền: mọi công trình trong nơi đó sinh lời cho ngươi; xây được mọi loại công trình hợp nơi (giá xayX × giá công trình, xayH giờ); phá không bị phạt.
// hoiMua: mỗi tháng, mỗi công trình ngươi sở hữu có cơ hội NPC hỏi mua; giá hoiGia × giá bán thường; mặc cả +macHoi (cơ hội macHoiP); lời hỏi hết hạn hoiHan tháng.
// npcMua: mỗi năm, mỗi công trình của dân có cơ hội thành của một NPC giữ vai (NPC tự mua công trình).
// tichKy: nợ thuế bao nhiêu kỳ (năm) thì quan phủ tịch biên ô đất; noQuanTich: bị chuyển nợ thuế sang quan phủ bao nhiêu lần chưa trả thì tịch biên.
const NQ2={cong:{tran:200,thanh:500},danhMin:-10,giaX:20,mac:[[1,1],[0.85,0.5],[0.7,0.2]],camThang:12,
  xayX:1,xayH:240,chiemCnt:3,
  hoiMua:0.03,hoiGia:[1.2,1.6],macHoi:0.15,macHoiP:0.5,hoiHan:3,npcMua:0.05,
  tichKy:5,noQuanTich:2};
