// Ngoại hình nhân vật chính (kiểu bản mẫu Ngọc Hành Trình): 4 độ tuổi, mỗi độ tuổi có kiểu tóc + trang phục riêng.
// Độ tuổi tự suy từ r.age, nên lớn tuổi lên là tự đổi hình. Độ tuổi chưa có ảnh thì mượn độ tuổi gần nhất có ảnh.
// Lựa chọn của người chơi lưu ở r.ngoai={toc,ao,chau} (bản lưu cũ không có thì dùng mặc định).
// Ảnh nhân vật NGUYÊN VẸN (không ghép lớp), tạo bằng tools/nv-comfy.py:
//   thanh niên nv-young-<áo>-<màu tóc>-<kiểu tóc>, trung niên nv-middle-<áo>-<màu tóc>, thiếu niên / lão giả nv-<tuổi>-<áo>.
// Phàm nhân: 7 áo theo xuất thân. Tu sĩ: chỉ mặc áo của CẢNH GIỚI HIỆN TẠI (AO_CG), kiểu tóc thanh niên cũng theo cảnh giới,
// nên mỗi áo cảnh giới chỉ cần đúng một kiểu tóc. Màu tóc (đen/bạc) người chơi chọn, áp cho thanh niên và trung niên.
const AO_KIEU={pho:'Áo vải thô',tho:'Áo thợ',thu:'Áo thư sinh',duoc:'Áo đạo y',khach:'Áo lữ khách',gia:'Áo thế gia',ma:'Áo ma tộc'};
const aoId=(kieu,tuoi)=>kieu;
const aoList=tuoi=>Object.keys(AO_KIEU).map(k=>[aoId(k,tuoi),AO_KIEU[k]]);
// xuất thân (r.origin) → kiểu áo mặc định; xuất thân lạ → áo vải thô
const AO_XT={
  nong:'pho',chai:'pho',khat:'pho',xt_con_nha_va_luoi:'pho',xt_con_nguoi_det_chieu:'pho',xt_con_nha_ganh_muoi:'pho',xt_dua_tre_nhat_o_bac_cua:'pho',xt_dua_tre_lon_sau_bep:'pho',xt_tre_an_duoi_san_dan:'pho',xt_ke_mang_tro_ve_que:'pho',xt_ke_lon_len_ben_vach_da:'pho',
  dote:'tho',ren:'tho',xt_con_nha_ham_than:'tho',xt_ke_tung_vac_bia:'tho',xt_tho_cao_voi_tuong:'tho',xt_con_nha_nung_men:'tho',xt_nguoi_lam_thue_o_mo:'tho',xt_nguoi_hoc_khac_khuon:'tho',xt_con_nha_giu_kho_duong:'tho',
  thusinh:'thu',xt_nguoi_chep_so_thoc:'thu',xt_ke_bo_truong_thi:'thu',xt_ke_viet_thu_ho:'thu',xt_nguoi_boi_giay_do:'thu',
  daodong:'duoc',tran:'duoc',duoc:'duoc',mieu:'duoc',xt_dong_tu_dun_tra:'duoc',xt_nguoi_giu_mieu_nho:'duoc',xt_con_nha_boc_thuoc:'duoc',xt_nguoi_hoc_bo_xuong:'duoc',xt_nguoi_hoc_dao_sau_mua_lu:'duoc',
  linh:'khach',hat:'khach',xt_tre_giu_ngua_tram:'khach',xt_ke_cheo_do_ban_dem:'khach',xt_ke_tron_no_qua_deo:'khach',xt_nguoi_bi_tra_ve_tu_bien_ai:'khach',
  thegia:'gia',buon:'gia',xt_hau_due_nguoi_coi_an:'gia',xt_nguoi_thua_ke_sap_bac:'gia',
  mahuyet:'ma'};
const aoKieuXt=r=>AO_XT[r&&r.origin]||'pho';
// áo theo cảnh giới (chỉ số = r.realm): [id, tên]
const AO_CG=[
  [['lk1','Đạo bào ngà'],['lk2','Đạo bào lục'],['lk3','Đạo bào lam']],
  [['tc1','Gấm ngà viền vàng'],['tc2','Gấm lục khoác ngoài'],['tc3','Gấm chàm khoác ngoài']],
  [['kd1','Tiên y hạc vàng'],['kd2','Tiên y bích ngọc'],['kd3','Tiên y thiên thanh']],
  [['na1','Lễ phục kim tuyến'],['na2','Lễ phục lục bảo'],['na3','Lễ phục thiên lam'],['na4','Lễ phục huyền dạ']],
  [['ht1','Phượng hoả bào'],['ht2','Nguyệt ảnh bào'],['ht3','Cổ thú bào'],['ht4','Hạc vũ bào'],['ht5','Hắc huyết bào'],['ht6','Thuỷ ba bào'],['ht8','Tinh tú bào'],['ht9','Mẫu đơn bào']],
  [['dk2','Lôi đình đế phục'],['dk3','Thiên hà đế phục'],['dk5','Huyết ma đế phục'],['dk6','Ngọc long đế phục'],['dk7','Tinh vân đế phục'],['dk8','Băng sương đế phục'],['dk9','Cực quang đế phục']]];
// danh sách áo được mặc lúc này: phàm nhân -> 7 áo xuất thân; tu sĩ -> áo của cảnh giới hiện tại
function nhAoDs(r){r=r||G.run;if(!r||r.pham)return aoList();return AO_CG[Math.min(AO_CG.length-1,Math.max(0,r.realm||0))];}
const NH_TUOI={
  teen:  {n:'Thiếu niên',tu:0, den:20, mau:16,toc:[['co','Tóc búi cao']],ao:aoList('teen')},
  young: {n:'Thanh niên',tu:20,den:40, mau:25,toc:[['den','Tóc đen'],['bac','Tóc bạc']],ao:aoList('young')},
  middle:{n:'Trung niên',tu:40,den:70, mau:45,toc:[['den','Tóc đen'],['bac','Tóc bạc']],ao:aoList('middle')},
  elder: {n:'Lão giả',   tu:70,den:1e9,mau:75,toc:[['co','Tóc bạc râu dài, mũ ngọc']],ao:aoList('elder')},
};
const NH_CHAU=[['auto','Tự động (vàng khi đủ đột phá)'],['teal','Thanh ngọc'],['gold','Kim hỏa']];
function nhTuoiOf(a){a=+a||0;for(const k in NH_TUOI){const T=NH_TUOI[k];if(a>=T.tu&&a<T.den)return k;}return 'elder';}
// Tu sĩ (không phải phàm nhân), từ 20 tuổi: độ tuổi theo % thọ nguyên. NH_MOC[cảnh giới] = [hết thanh niên, hết trung niên] (phần trăm).
// Cảnh giới càng cao càng giữ dung nhan trẻ lâu.
const NH_MOC=[[55,85],[60,88],[65,90],[70,92],[75,94],[80,95]];
const nhMoc=r=>NH_MOC[Math.min(NH_MOC.length-1,Math.max(0,(r&&r.realm)||0))];
function nhDoTuoi(r){r=r||G.run;const a=r?+r.age||0:25;
  if(r&&r.devNh&&NH_TUOI[r.devNh])return r.devNh;                 // Dev test: ép độ tuổi (kể cả vượt thọ nguyên)
  if(r&&r.truNhan&&NH_TUOI[r.truNhan])return r.truNhan;          // Trú Nhan Đan: dung nhan cố định
  if(!r||r.pham||a<20)return nhTuoiOf(a);
  const life=typeof S==='function'?S().life:LIFE[r.realm]||60,pc=a/Math.max(1,life)*100,[m1,m2]=nhMoc(r);
  return pc<m1?'young':pc<m2?'middle':'elder';}
// Kiểu tóc thanh niên theo cảnh giới: phàm nhân + Luyện Khí: đuôi ngựa; Trúc Cơ + Kết Đan: búi mũ bạc; Nguyên Anh: xoã thẳng; Hóa Thần: xoã có tóc mái; Độ Kiếp: xoã gợn sóng
const NH_KIEU_TOC=[['duoi','Buộc đuôi ngựa'],['bui','Búi, đội mũ bạc'],['xoa','Xoã thẳng'],['mai','Xoã, tóc mái ôm mặt'],['song','Xoã gợn sóng']];
function nhKieuToc(r){r=r||G.run;if(!r||r.pham)return 'duoi';return ['duoi','bui','bui','xoa','mai','song'][Math.min(5,r.realm||0)];}
function nhCo(k){return !!(NH_TUOI[k]&&NH_TUOI[k].toc.length&&NH_TUOI[k].ao.length);}
// độ tuổi đem ra vẽ: chính nó nếu có ảnh, không thì độ tuổi gần nhất có ảnh
function nhHien(k){if(nhCo(k))return k;const L=Object.keys(NH_TUOI),i=L.indexOf(k);
  for(let d=1;d<L.length;d++){for(const j of [i-d,i+d])if(L[j]&&nhCo(L[j]))return L[j];}return 'young';}
function ngoaiHinh(r){r=r||G.run;const N=(r&&r.ngoai)||{};const tuoi=nhDoTuoi(r),hien=nhHien(tuoi),T=NH_TUOI[hien];
  const pick=(L,v)=>(L.find(x=>x[0]===v)||L[0])[0];
  let chau=N.chau||'auto';if(chau==='auto')chau=typeof canBreak==='function'&&r&&canBreak()?'gold':'teal';
  const ds=nhAoDs(r),pham=!r||r.pham;
  // mặc định: phàm nhân theo xuất thân; tu sĩ lấy một bộ của cảnh giới theo xuất thân (cố định, không ngẫu nhiên)
  const xt=aoKieuXt(r),ao0=pham?xt:ds[Object.keys(AO_KIEU).indexOf(xt)%ds.length][0];
  const toc=pick(T.toc,N.toc),ao=(ds.find(x=>x[0]===N.ao)||ds.find(x=>x[0]===ao0)||ds[0])[0];
  const kieu=nhKieuToc(r);
  const anh='nv-'+hien+'-'+ao+(hien==='young'?'-'+toc+'-'+kieu:hien==='middle'?'-'+toc:'');
  return {tuoi,hien,toc,kieu,truNhan:!!(r&&r.truNhan),ao,aoDs:ds,anh,kieuAo:xt,chau,chauChon:N.chau||'auto',nu:!!(r&&r.g==='nu')};}
// đổi tuổi (dev): giữ đúng công thức tuổi = birthAge + thời gian đã sống; không vượt thọ nguyên
function nhTuoiSet(a){const r=G.run;if(!r)return null;const life=S().life;a=clamp(+a||16,1,Math.max(1,life-0.5));
  const lived=(W().t-r.bornT)/HY;r.birthAge=a-lived;r.age=a;dbg('nh.tuoi',{tuoi:+a.toFixed(1),tho:life,con:+(life-a).toFixed(1),do:nhDoTuoi(r)});return a;}
// chọn độ tuổi (dev): đặt tuổi về tuổi mẫu của độ tuổi đó
// tu sĩ: tuổi mẫu đặt giữa khoảng % thọ nguyên của độ tuổi đó
function nhDoTuoiSet(k){const T=NH_TUOI[k],r=G.run;if(!T||!r)return null;delete r.devNh;
  if(r.pham?T.mau>=S().life:(k==='teen'&&S().life<=T.mau)){r.devNh=k;dbg('nh.ep',{tuoi:k});return r.age;}   // không đủ thọ nguyên: chỉ ép hìnhif(r.pham||k==='teen')return nhTuoiSet(T.mau);
  const life=S().life,[m1,m2]=nhMoc(r),pc={young:m1/2,middle:(m1+m2)/2,elder:(m2+100)/2}[k];return nhTuoiSet(Math.max(20,life*pc/100));}
function nhSet(k,v){const r=G.run;if(!r||!['toc','ao','chau'].includes(k))return;r.ngoai=Object.assign({},r.ngoai||{},{[k]:v});dbg('nh.set',{k,v});}
