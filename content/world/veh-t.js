// Nguồn chuẩn: VEH_T (phương tiện sinh theo loại và bậc ở trạm dịch). Phương tiện viết sẵn lấy giá ở content/catalog/mounts.json (p).
// Trạm dịch đọc lại giá từ hai nguồn này mỗi lần mở (data/05-content-runtime.js), nên đổi giá là trạm đổi theo, cả mua lẫn thuê.
// Luật xử lý ở src/game/core2/08-dot-13-tram-dich.js.
const VEH_T=[{k:'ngua',n:['Ngựa thồ','Tuấn mã','Hãn huyết mã','Long câu','Thiên lý long câu'],m:1.7,p:60,realm:0,ic:'run'},
  {k:'loc',n:['Linh lộc','Bạch lộc','Ngọc giác lộc','Cửu sắc lộc','Thần lộc'],m:1.9,p:90,realm:0,ic:'tree'},
  {k:'hac',n:['Bạch hạc','Tiên hạc','Huyền hạc','Đan đỉnh hạc','Cửu thiên hạc'],m:2.8,p:260,realm:1,ic:'feather'},
  {k:'chu',n:['Phi chu','Mộc lan chu','Thanh vân chu','Bích lạc chu','Càn khôn chu'],m:3.6,p:500,realm:1,ic:'cart'},
  {k:'kiem',n:['Phi kiếm','Thanh phong kiếm','Lưu quang kiếm','Tử điện kiếm','Tru tiên kiếm'],m:6,p:1600,realm:2,ic:'sword'}];
