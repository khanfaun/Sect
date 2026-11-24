// Chốt nổi trên bản đồ (vẽ ở src/react/ban-do/NutBanDo.jsx → ChotBanDo, vị trí đặt mỗi khung ở ui/05-gfx.js theo NPOS):
// đang đứng ở một nơi → nút Vào ngay dưới tên nơi đó; đang đi → ở nơi tới: thời gian còn lại trên đầu, nút Dừng lại (đỏ) dưới chân.
function mvConGio(){const r=G.run,m=r&&r.moving;if(!m)return 0;let L=0;
  for(let i=m.seg;i<m.path.length-1;i++)L+=edgeLen(m.path[i],m.path[i+1])*(i===m.seg?1-m.prog:1);
  return L/Math.max(1e-6,walkSpeed());}
