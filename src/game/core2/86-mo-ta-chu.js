// Mô tả chiêu thức, công pháp bằng chữ (không ghi số): "gây sát thương lớn", "hồi một lượng vừa khí huyết"…
// Dùng cho thẻ dạng lá bài ở Sở học / Kỹ năng.
function mtMuc(v,a,b){return v<a?'nhỏ':v<b?'vừa':'lớn';}
function skMoTa(sk){if(!sk||!sk.fx)return '';const f=sk.fx,L=[];
  if(f.p){const d=f.p*(f.h||1);L.push('Gây sát thương '+mtMuc(d,1,1.8)+(f.h>1?', đánh nhiều lần':'')+(f.aoe?' lên mọi kẻ địch':''));}
  if(f.heal)L.push('Hồi một lượng '+mtMuc(f.heal,0.15,0.3)+' khí huyết');
  if(f.regen)L.push('Hồi khí huyết dần');
  if(f.mpBack||f.mpDrain)L.push(f.mpDrain?'Hút linh lực của địch':'Nhận lại một lượng linh lực');
  if(f.drain)L.push('Hút máu');
  if(f.block||f.blockH||f.blockM)L.push('Đỡ đòn, giảm sát thương nhận vào');
  if(f.evade)L.push('Né đòn kế tiếp');
  if(f.stun)L.push('Làm địch choáng');
  if(f.poison)L.push('Gây trúng độc');
  if(f.burn)L.push('Thiêu đốt');
  if(f.weak)L.push('Làm địch yếu đi');
  if(f.vuln||f.pierce)L.push('Xuyên phá phòng thủ');
  if(f.crit)L.push('Dễ chí mạng');
  if(f.cleanse)L.push('Giải trạng thái xấu');
  if(f.summon)L.push('Triệu hồi trợ thủ');
  if(f.charge)L.push('Cần tụ lực trước');
  if(!L.length)L.push('Chiêu hỗ trợ');
  return L.slice(0,2).join('. ')+'.';}
// linh lực tốn: ít / vừa / nhiều (so với linh lực tối đa)
function skTonChu(sk){const c=typeof skillCost==='function'?skillCost(sk):sk.c||0;const m=Math.max(1,S().maxMp||1),p=c/m;return 'Tốn '+(p<0.08?'ít':p<0.2?'vừa':'nhiều')+' linh lực';}
// công pháp: các dòng chỉ số đã mở thành chữ, cộng số chiêu truyền lại
function artMoTa(a){if(!a)return '';const L=[];let sk=0;
  for(const ln of a.lines||[]){if((ln.req||0)>(a.lv||1)-1&&a.lv!=null)continue;if(ln.fx&&typeof tbTen==='function'&&tbTen(ln.fx))L.push(tbTen(ln.fx)+' '+tbMuc(ln.fx,ln.v).toLowerCase());if(ln.sk)sk++;}
  if(sk)L.push('Truyền '+(sk>1?sk+' chiêu':'một chiêu'));
  return (L.slice(0,2).join('. ')||a.d||'')+(L.length?'.':'');}
