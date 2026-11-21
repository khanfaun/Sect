// ---------------- ĂN UỐNG BẢN MỚI (bảng AN, content/rules/an-uong.js — phần "bản mới") ----------------
// Không tính theo ngày: r.doi là độ đói 0..AN.doi.chet (0 no căng, 100 cạn bụng). Một bữa no đủ chừng AN.thangNo tháng.
// Tự ăn đồ trong túi theo cách ít phí nhất; hết đồ ăn giữa đường mà đói quá nửa thì dừng lại, báo.
function anMon(id){return AN.mon&&AN.mon[id]||null;}
function anMonV(id){const M=anMon(id);return M?M.thang*100/AN.thangNo:0;}
// đồ ăn đang mang: [{id,v,k}] mỗi loại một dòng (k = số lượng)
function anTui(r){r=r||G.run;const c={};for(const x of (r&&r.qitems)||[])if(anMon(x))c[x]=(c[x]||0)+1;return Object.keys(c).map(id=>({id,v:anMonV(id),k:c[id]}));}
function anTuiV(r){return anTui(r).reduce((a,x)=>a+x.v*x.k,0);}
// chọn món: món no lâu nhất mà vẫn lấp vừa chỗ trống; không món nào vừa thì (khi đã đói quá nửa, hoặc ép) lấy món nhỏ nhất
function anChon(r,ep){const L=anTui(r);if(!L.length)return null;const tr=Math.min(r.doi||0,100);
  const vua=L.filter(x=>x.v<=tr+1e-9);if(vua.length)return vua.reduce((a,b)=>b.v>a.v?b:a).id;
  if(ep||(r.doi||0)>=AN.doi.doi)return L.reduce((a,b)=>b.v<a.v?b:a).id;return null;}
function anAnMon(r,id){const i=r.qitems.indexOf(id);if(i<0)return false;r.qitems.splice(i,1);
  r.doi=Math.max(0,Math.min(r.doi||0,100)-anMonV(id));anSync(r);if(r.doi<AN.doi.doi){r.anBao=0;r.anDung=0;}
  log(contentText('an.anTui',[(CAT.byId[id]||{}).n||id]));dbg('an.mon',{id,doi:Math.round(r.doi)});return true;}
function anTuAn(r){if((r.doi||0)<AN.anTu2)return;let g=0;while(g++<30){const id=anChon(r);if(!id||!anAnMon(r,id))break;if((r.doi||0)<AN.anTu2)break;}}
function anSync(r){r.no=Math.max(0,Math.round(100-Math.min(100,r.doi||0)));}
anFed=function(r,how){if((r.doi||0)>=AN.doi.doi)dbg('an.het',{doi:Math.round(r.doi),how});r.doi=0;r.no=100;r.anDung=0;if(!r.moving)r.anBao=0;};
// báo mốc đói (giữ cách báo cũ: chỉ mốc nặng, mỗi mốc một lần)
function anBaoMoc(r){const lv=anLv(r.doi);if(lv<=(r.anBao||0))return;r.anBao=lv;const t=W().t,tu=AN.baoTu||4,nghi=(AN.baoNghi||0)*HD;
  if(lv===AN.doi.la||lv===4)clampHp();
  if(lv<tu)dbg('an.baoNhe',{lv});else if(lv<5&&r.anBaoT!=null&&t-r.anBaoT<nghi)dbg('an.baoNghi',{lv});else{r.anBaoT=t;note(contentText(AN_NOTE[lv]),'dn');dbg('an.bao',{lv});}}
// hết đồ ăn giữa đường, đói quá nửa: dừng, hiện hộp báo
const AN_DUNG={id:'an_dung',sp:1,tag:'Đói bụng · cần lương thực',n:contentText('an.dungN'),t:contentText('an.dungT'),c:[{l:contentText('an.dungC0'),go:()=>({t:contentText('an.dungR')})}]};
KYNGO.push(AN_DUNG);
function anDungDuong(r){if(!r.moving||r.anDung||(r.doi||0)<AN.doi.doi||anTui(r).length)return;r.anDung=1;
  const m=r.moving;if(m.seg<m.path.length-1&&typeof snapStop==='function')snapStop();if(G.run.moving)G.run.halt=true;
  dbg('an.dung',{doi:Math.round(r.doi)});if(!G.run.scene)kyStart(AN_DUNG);}
// mua một bữa ở quán / quê (tự động, theo mức ăn đã chọn); trả true nếu đã ăn
function anQuanAn(r,how){if(r.anTu===0)return false;const c=anCost(r)*AN.buaX;if(!bacCan(c))return false;bacPay(c,'an');anFed(r,how);
  if(anMuc(r).tm)r.tamma=Math.max(0,(r.tamma||0)-anMuc(r).tm*AN.thangNo);return true;}
// đi ngang / ghé thôn trấn lúc bụng đã vơi: ghé quán ăn một bữa luôn (trước đây phải ở lại qua một ngày mới được ăn)
{const _ar=arrive;arrive=function(id){const o=_ar.apply(this,arguments);const r=G.run;if(!r||!feat('an')||VT_AN||r.anFree||(r.doi||0)<AN.anQuan)return o;
  const n=nodeById(id);if(!n||n.state==='ruin')return o;
  if(n.type==='tong'&&r.at===id&&anAtSect(r))anFed(r,'tong');
  else if((AN.quan.includes(n.type)||(r.queAt!=null&&id===r.queAt))&&anQuanAn(r,'ghe')){anSync(r);dbg('an.ghe',{id,doi:0,bac:r.bac});}
  return o;};}
anMeal=function(r){r.anDays=(r.anDays||0)+1;};
anDay=function(){const r=G.run;if(!r||!feat('an'))return;
  if(VT_AN||r.anFree){if(!VT_AN)r.anFree=0;anFed(r,'viec');return;}
  if((r.anCov||0)>0){r.anCov=0;anFed(r,'cov');}
  const k=anRate(r),d0=r.doi||0;r.doi=d0+k*((d0<100?100/AN.thangNo:100/AN.thangKiet)/30);
  // ăn ở sơn môn / quán / quê khi bụng đã vơi
  if(r.doi>=AN.anQuan){
    if(anAtSect(r))anFed(r,'tong');
    else if(anAtQuan(r)||anAtHome(r))anQuanAn(r,'quan');}
  anTuAn(r);anSync(r);anBaoMoc(r);
  if(r.doi>=AN.doi.kiet){const s=S();r.hp=Math.max(1,r.hp-Math.max(1,Math.round(s.maxHp*AN.kietHp)));}
  anDungDuong(r);
  if(r.doi>=AN.doi.chet&&!(r.scene&&r.scene.type==='combat')){dbg('an.chet',{doi:r.doi});die('doi');}};
anStarve=function(r){r.doi=Math.max(r.doi||0,AN.doi.doi);anSync(r);};
anLkEat=function(r){const id=anChon(r,1);return !!id&&anAnMon(r,id);};
anTripDays=function(r){return Math.round(((100-Math.min(100,r.doi||0))+anTuiV(r))*AN.thangNo/100*30);};
// trước khi lên đường: ước độ đói lúc tới nơi (đồ ăn mang theo ăn dần dọc đường, không mua được cơm)
anTripRisk=function(id){const r=G.run;if(!r||!feat('an')||r.anFree)return null;const n=nodeById(id);if(!n||id===r.at)return null;
  const p=findPath(r.at,id);if(!p)return null;const h=travelHours(p);if(!(h>0))return null;
  const ngay=h/24,k=anRate(r),d0=r.doi||0,cap=(d0<100?100-d0:-(d0-100)*AN.thangKiet/AN.thangNo)+anTuiV(r); // phần bụng còn trống (âm nếu đã cạn) + đồ ăn
  const can=ngay*k*100/AN.thangNo/30;if(can<=cap)return null;
  const doi1=100+(can-cap)*AN.thangNo/AN.thangKiet;if(doi1<AN.doi.canh)return null;
  const th=x=>Math.max(1,Math.round(x/30));const du=Math.max(0,cap)*AN.thangNo/100*30/Math.max(k,1e-6);
  const t=contentText(doi1>=AN.doi.chet?'an.diChet':'an.diCanh',[th(ngay),th(du)]);
  dbg('an.diRui',{id,ngay:Math.round(ngay),doi1:Math.round(doi1)});return {ngay:Math.round(ngay),du:Math.round(du),doi0:r.doi||0,doi1,chet:AN.doi.chet,t};};
// tạp hóa bán đủ các món ăn (thay chỉ lương khô)
{const _se=shopExtra;shopExtra=function(items,n){_se.apply(this,arguments);if(!feat('an')||!G.run||!needFood(G.run))return;
  for(let i=items.length-1;i>=0;i--)if(items[i].id==='luong_kho'&&items[i].k==='qi')items.splice(i,1);
  for(const id in AN.mon)items.push({k:'qi',id,bac:AN.mon[id].bac,p:0,qty:AN.monQty});};}
// bản lưu cũ: thang ngày cũ → no căng
{const _r=run2;run2=function(){const r=_r.apply(this,arguments);if(r&&!r._anV3){r._anV3=1;r.doi=0;r.no=100;r.anCov=0;r.anLk=0;r.anPart=0;r.anBao=0;}return r;};}
