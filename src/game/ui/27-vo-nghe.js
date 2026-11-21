// Đ5: nút luyện võ, lôi đài ở nhóm Tu luyện của thẻ địa điểm
{const g=PGROUP.find(x=>x[0]==='Tu luyện');if(g){for(const a of ['luyenvo','loidai'])if(!g[1].includes(a))g[1].push(a);}}
