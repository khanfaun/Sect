// Nguồn chuẩn: SIZE_T. Luật xử lý ở src/game/core2/33-the-gioi-mo.js.
const SIZE_T={tran:[2,4],thanh:[4,7],dong:[1,2],khoang:[1,2],duoc:[1,2],ancu:[1,1],cho:[1,2],phe:[1,3],ma:[2,4],sao:[2,3],rung:[3,6],nui:[3,6],song:[2,4],bien:[3,6],hoang:[4,7],thien:[3,5],linhdia:[2,4],dam:[2,4],
  tutran:[1,3],tuthanh:[3,5],bicanh:[2,4],dongthien:[1,3],como:[1,2],yeusao:[2,3],ditich:[1,3]};

// Số nơi sinh cho mỗi quận (thế giới mới). Cỡ quận theo số ô đất đi được: dưới nguong[0] là bé, trên nguong[1] là lớn, còn lại là vừa.
// thanhPham/thanhTu = thành phàm nhân / thành tu sĩ; tranPham/tranTu = trấn phàm nhân / trấn tu sĩ; hoang = số nơi hoang dã, bí cảnh thêm vào.
const NOI_SL={nguong:[150,300],
  be:{thanhPham:[1,1],thanhTu:[1,1],tranPham:[3,3],tranTu:[1,2],hoang:[4,8]},
  vua:{thanhPham:[1,1],thanhTu:[1,1],tranPham:[6,6],tranTu:[3,3],hoang:[4,8]},
  lon:{thanhPham:[2,2],thanhTu:[1,1],tranPham:[9,9],tranTu:[4,4],hoang:[4,8]}};
// Loại nơi hoang dã được thêm vào quận: w trọng số chọn · d [nguy hiểm thấp nhất, cao nhất] · ter trọng số theo loại đất (1 đồng bằng, 2 rừng, 3 núi, 6 đồi, 7 đầm lầy) · dp 1 = có động phủ sẵn.
const NOI_HOANG={
  bicanh:{w:1.3,d:[3,3],ter:{3:2,6:2,1:1,2:1,7:1}},
  dongthien:{w:1.3,d:[3,3],ter:{3:3,6:2,2:1}},
  como:{w:1.6,d:[2,3],ter:{1:2,6:3,3:1,7:1}},
  yeusao:{w:1.6,d:[2,3],ter:{2:3,3:2,7:2,6:1}},
  ditich:{w:1.6,d:[1,2],ter:{1:3,6:2,2:1,3:1}},
  rung:{w:1,d:[0,2],ter:{2:4,6:1}},
  nui:{w:1,d:[1,2],ter:{3:4,6:2}},
  dong:{w:0.8,d:[1,2],ter:{3:3,6:2},dp:1},
  hoang:{w:0.7,d:[1,2],ter:{1:3,6:1}},
  phe:{w:0.7,d:[1,3],ter:{1:2,6:2,3:1}},
  dam:{w:0.6,d:[1,2],ter:{7:5,2:1}},
  duoc:{w:0.6,d:[0,1],ter:{2:3,6:1}},
  khoang:{w:0.5,d:[1,2],ter:{3:4,6:2}},
  linhdia:{w:0.5,d:[1,2],ter:{3:1,2:2,6:2},dp:1},
  ancu:{w:0.4,d:[0,0],ter:{6:3,2:1,3:1}}};
