// Ngoại hình nhân vật chính (kiểu bản mẫu Ngọc Hành Trình): 4 độ tuổi, mỗi độ tuổi có kiểu tóc + trang phục riêng.
// Độ tuổi tự suy từ r.age, nên lớn tuổi lên là tự đổi hình. Độ tuổi chưa có ảnh thì mượn độ tuổi gần nhất có ảnh.
// Lựa chọn của người chơi lưu ở r.ngoai={toc,ao,chau} (bản lưu cũ không có thì dùng mặc định).
const NH_TUOI={
  teen:  {n:'Thiếu niên',tu:0, den:20, mau:16,toc:[['t1','Tóc búi cao']],ao:[['t1','Áo vải giản dị']]},
  young: {n:'Thanh niên',tu:20,den:40, mau:25,toc:[['r1','Búi nhỏ trâm vàng']],ao:[['hero','Lục bào ngọc']]},
  middle:{n:'Trung niên',tu:40,den:70, mau:45,toc:[['m1','Búi tóc, râu ngắn']],ao:[['m1','Thanh bào trầm']]},
  elder: {n:'Lão giả',   tu:70,den:1e9,mau:75,toc:[['e1','Tóc bạc râu dài, mũ ngọc']],ao:[['e1','Thanh bào lão giả']]},
};
const NH_CHAU=[['auto','Tự động (vàng khi đủ đột phá)'],['teal','Thanh ngọc'],['gold','Kim hỏa']];
function nhTuoiOf(a){a=+a||0;for(const k in NH_TUOI){const T=NH_TUOI[k];if(a>=T.tu&&a<T.den)return k;}return 'elder';}
function nhCo(k){return !!(NH_TUOI[k]&&NH_TUOI[k].toc.length&&NH_TUOI[k].ao.length);}
// độ tuổi đem ra vẽ: chính nó nếu có ảnh, không thì độ tuổi gần nhất có ảnh
function nhHien(k){if(nhCo(k))return k;const L=Object.keys(NH_TUOI),i=L.indexOf(k);
  for(let d=1;d<L.length;d++){for(const j of [i-d,i+d])if(L[j]&&nhCo(L[j]))return L[j];}return 'young';}
function ngoaiHinh(r){r=r||G.run;const N=(r&&r.ngoai)||{};const tuoi=nhTuoiOf(r?r.age:25),hien=nhHien(tuoi),T=NH_TUOI[hien];
  const pick=(L,v)=>(L.find(x=>x[0]===v)||L[0])[0];
  let chau=N.chau||'auto';if(chau==='auto')chau=typeof canBreak==='function'&&r&&canBreak()?'gold':'teal';
  return {tuoi,hien,toc:pick(T.toc,N.toc),ao:pick(T.ao,N.ao),chau,chauChon:N.chau||'auto',nu:!!(r&&r.g==='nu')};}
// đổi tuổi (dev): giữ đúng công thức tuổi = birthAge + thời gian đã sống; không vượt thọ nguyên
function nhTuoiSet(a){const r=G.run;if(!r)return null;const life=S().life;a=clamp(+a||16,1,Math.max(1,life-0.5));
  const lived=(W().t-r.bornT)/HY;r.birthAge=a-lived;r.age=a;dbg('nh.tuoi',{tuoi:+a.toFixed(1),tho:life,con:+(life-a).toFixed(1),do:nhTuoiOf(a)});return a;}
// chọn độ tuổi (dev): đặt tuổi về tuổi mẫu của độ tuổi đó
function nhDoTuoiSet(k){const T=NH_TUOI[k];if(!T)return null;return nhTuoiSet(T.mau);}
function nhSet(k,v){const r=G.run;if(!r||!['toc','ao','chau'].includes(k))return;r.ngoai=Object.assign({},r.ngoai||{},{[k]:v});dbg('nh.set',{k,v});}
