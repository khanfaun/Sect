// Ngoại hình nhân vật chính (kiểu bản mẫu Ngọc Hành Trình): 4 độ tuổi, mỗi độ tuổi có kiểu tóc + trang phục riêng.
// Độ tuổi tự suy từ r.age, nên lớn tuổi lên là tự đổi hình. Độ tuổi chưa có ảnh thì mượn độ tuổi gần nhất có ảnh.
// Lựa chọn của người chơi lưu ở r.ngoai={toc,ao,chau} (bản lưu cũ không có thì dùng mặc định).
// Trang phục theo xuất thân: 7 kiểu áo × 4 độ tuổi. Ảnh áo: ch-of-<id>. Bốn áo làm đầu tiên giữ tên cũ (AO_CO).
const AO_KIEU={pho:'Áo vải thô',tho:'Áo thợ',thu:'Áo thư sinh',duoc:'Áo đạo y',khach:'Áo lữ khách',gia:'Áo thế gia',ma:'Áo ma tộc'};
const AO_CO={pho_teen:'t1',gia_young:'hero',thu_middle:'m1',duoc_elder:'e1'};
const aoId=(kieu,tuoi)=>AO_CO[kieu+'_'+tuoi]||kieu+'-'+({teen:'t',young:'y',middle:'m',elder:'e'})[tuoi];
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
const NH_TUOI={
  teen:  {n:'Thiếu niên',tu:0, den:20, mau:16,toc:[['t1','Tóc búi cao']],ao:aoList('teen')},
  young: {n:'Thanh niên',tu:20,den:40, mau:25,toc:[['r1','Búi nhỏ trâm vàng']],ao:aoList('young')},
  middle:{n:'Trung niên',tu:40,den:70, mau:45,toc:[['m1','Búi tóc, râu ngắn']],ao:aoList('middle')},
  elder: {n:'Lão giả',   tu:70,den:1e9,mau:75,toc:[['e1','Tóc bạc râu dài, mũ ngọc']],ao:aoList('elder')},
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
  const ao0=aoId(aoKieuXt(r),hien);
  return {tuoi,hien,toc:pick(T.toc,N.toc),ao:(T.ao.find(x=>x[0]===N.ao)||T.ao.find(x=>x[0]===ao0)||T.ao[0])[0],kieuAo:aoKieuXt(r),chau,chauChon:N.chau||'auto',nu:!!(r&&r.g==='nu')};}
// đổi tuổi (dev): giữ đúng công thức tuổi = birthAge + thời gian đã sống; không vượt thọ nguyên
function nhTuoiSet(a){const r=G.run;if(!r)return null;const life=S().life;a=clamp(+a||16,1,Math.max(1,life-0.5));
  const lived=(W().t-r.bornT)/HY;r.birthAge=a-lived;r.age=a;dbg('nh.tuoi',{tuoi:+a.toFixed(1),tho:life,con:+(life-a).toFixed(1),do:nhTuoiOf(a)});return a;}
// chọn độ tuổi (dev): đặt tuổi về tuổi mẫu của độ tuổi đó
function nhDoTuoiSet(k){const T=NH_TUOI[k];if(!T)return null;return nhTuoiSet(T.mau);}
function nhSet(k,v){const r=G.run;if(!r||!['toc','ao','chau'].includes(k))return;r.ngoai=Object.assign({},r.ngoai||{},{[k]:v});dbg('nh.set',{k,v});}
