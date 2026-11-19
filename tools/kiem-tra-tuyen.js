// Kiểm tệp tuyến content/tuyen/*.json (Đ9.1). Chạy: npm run content:tuyen  (hoặc node tools/kiem-tra-tuyen.js [tệp…])
// Báo lỗi bằng tiếng Việt: tệp, dòng, khoá sai và cách sửa. Lỗi thì thoát mã 1; cảnh báo không chặn.
const fs=require('fs'),path=require('path'),vm=require('vm');const ROOT=path.resolve(__dirname,'..');
const DIR=path.join(ROOT,'content/tuyen');
const DAI_LO=['phi_thang','diet_the','de_nghiep','phu_giap','huyet_cuu','vo_lam','the_gia','y_gia','tinh_mong'];
const CACH_MOI=['thu','nguoi','tin','ky_ngo'];
const E_KEYS=['bac','linhThach','deed','vatPham','boVatPham','fa','clk','giet','hp','h','tamma'];
const DK_KEYS=['dau','khongDau','pham','canhGioiTu','tuoiTu','tuoiDen','bacTu','linhThachTu','vatPham','vaiSong','vaiMat','faSong','faDiet','clkDang','khoa'];
const LT=['ha','trung','thuong','cuc'];
// ---------- đọc JSON có ghi dòng của từng khoá ----------
function parseJ(src){let i=0,line=1;const lines={};
  const err=m=>{const e=Error(m);e.line=line;throw e;};
  const ws=()=>{while(i<src.length&&/\s/.test(src[i])){if(src[i]==='\n')line++;i++;}};
  function val(p){ws();lines[p]=line;const c=src[i];
    if(c==='{'){i++;const o={};ws();if(src[i]==='}'){i++;return o;}
      for(;;){ws();if(src[i]!=='"')err('cần tên khoá trong ngoặc kép "…"');const k=str();ws();if(src[i]!==':')err('thiếu dấu hai chấm sau khoá "'+k+'"');i++;
        if(Object.prototype.hasOwnProperty.call(o,k))err('khoá "'+k+'" viết hai lần');o[k]=val(p?p+'.'+k:k);ws();
        if(src[i]===','){i++;ws();if(src[i]==='}')err('dấu phẩy thừa trước "}"');continue;}if(src[i]==='}'){i++;return o;}err('thiếu dấu phẩy hoặc "}"');}}
    if(c==='['){i++;const a=[];ws();if(src[i]===']'){i++;return a;}
      for(;;){a.push(val(p+'['+a.length+']'));ws();if(src[i]===','){i++;ws();if(src[i]===']')err('dấu phẩy thừa trước "]"');continue;}if(src[i]===']'){i++;return a;}err('thiếu dấu phẩy hoặc "]"');}}
    if(c==='"')return str();
    const m=/^(-?\d+(\.\d+)?([eE][+-]?\d+)?|true|false|null)/.exec(src.slice(i,i+40));if(!m)err('giá trị không hợp lệ (chữ phải nằm trong ngoặc kép "…")');i+=m[0].length;return JSON.parse(m[0]);}
  function str(){let j=i+1,s='';for(;;){if(j>=src.length)err('chuỗi chưa đóng ngoặc kép');const c=src[j];if(c==='"')break;if(c==='\n')err('chuỗi xuống dòng: không được xuống dòng giữa "…", dùng \\n nếu cần');if(c==='\\'){s+=src.slice(j,j+2);j+=2;continue;}s+=c;j++;}
    const v=JSON.parse('"'+s+'"');i=j+1;return v;}
  const v=val('');ws();if(i<src.length)err('có chữ thừa sau khi đã đóng "}" cuối');return {v,lines};}
// ---------- bảng mã có thật ----------
function bang(){const rd=p=>fs.readFileSync(path.join(ROOT,p),'utf8');const ev=(s,n)=>vm.runInNewContext(s+';({'+n.join(',')+'})',{});
  const neo=ev(rd('content/world/the-gioi-neo.js'),['LOC_NEO','VAI_NP','THE_LUC']);const tc=ev(rd('content/world/thoi-cuc.js'),['THOI_CUC']);
  const deed=ev(rd('content/rules/deed.js'),['DEED']).DEED;const og=ev(rd('content/characters/origin.js'),['ORIGIN']).ORIGIN;
  const cat=JSON.parse(rd('content/catalog/origins.json'));const qi=JSON.parse(rd('content/catalog/qitems.json'));
  return {LOC:neo.LOC_NEO,NP:neo.VAI_NP,FA:neo.THE_LUC,CLK:tc.THOI_CUC,DEED:deed,ORIGIN:[...og,...cat].map(o=>({id:o.id,n:o.n})),QI:new Set(qi.map(x=>x.id))};}
const TEN_DUNG=new Set(['Phù Sinh','Ngũ Tổ','Đêm Dài','Yêu Hoàng','Bến Vong Xuyên','Trung Châu','Đông Hoang','Nam Trạch','Tây Lĩnh','Bắc Nhạc','Cổ Giới','Mộng Ấn','Thiên Lộ','Luyện Khí','Trúc Cơ','Kết Đan','Nguyên Anh','Hóa Thần','Độ Kiếp']);
function kiemTep(file,B,seen){const loi=[],cb=[];const rel=path.relative(ROOT,file).replace(/\\/g,'/');let P;
  const src=fs.readFileSync(file,'utf8');
  try{P=parseJ(src);}catch(e){loi.push(rel+' dòng '+(e.line||'?')+': JSON sai — '+e.message+'. Cách sửa: mở tệp ở dòng này, kiểm dấu phẩy, ngoặc và ngoặc kép.');return {loi,cb};}
  const A=P.v,L=P.lines;const dong=k=>{while(k&&L[k]==null)k=k.replace(/(\.[^.[\]]+|\[\d+\])$/,'');return L[k]||1;};
  const bad=(k,m,sua)=>loi.push(rel+' dòng '+dong(k)+', khoá '+(k||'(gốc)')+': '+m+(sua?' Cách sửa: '+sua:''));
  const warn=(k,m)=>cb.push(rel+' dòng '+dong(k)+', khoá '+(k||'(gốc)')+': '+m);
  const isStr=(k,v,min)=>{if(typeof v!=='string'||!v.trim()){bad(k,'thiếu chữ hoặc không phải chuỗi.','viết một đoạn chữ trong ngoặc kép.');return false;}if(min&&v.length<min)warn(k,'đoạn văn ngắn ('+v.length+' ký tự), nên dài ít nhất '+min+'.');return true;};
  const only=(k,o,allow)=>{if(!o||typeof o!=='object'||Array.isArray(o)){bad(k,'phải là một đối tượng {…}.');return false;}for(const x of Object.keys(o))if(!allow.includes(x))bad(k+'.'+x,'khoá "'+x+'" không có trong định dạng.','chỉ dùng: '+allow.join(', ')+'.');return true;};
  const placeholders=(k,s)=>{for(const m of s.matchAll(/\{([^{}]*)\}/g)){const t=m[1];
      if(t==='ten'||t==='que')continue;const mm=/^(NP\d\d)(\.(vai|noi))?$|^(LOC\d\d)$|^(FA\d\d)$/.exec(t);
      if(!mm){bad(k,'chỗ thay "{'+t+'}" không hợp lệ.','chỉ dùng {ten}, {que}, {NPxx}, {NPxx.vai}, {NPxx.noi}, {LOCxx}, {FAxx}.');continue;}
      if(mm[1]&&!B.NP[mm[1]])bad(k,'mã người '+mm[1]+' không có.','dùng NP01–NP30 trong bảng mã.');if(mm[4]&&!B.LOC[mm[4]])bad(k,'mã nơi '+mm[4]+' không có.','dùng LOC01–LOC15.');if(mm[5]&&!B.FA[mm[5]])bad(k,'mã thế lực '+mm[5]+' không có.','dùng FA01–FA10.');}};
  const vanCam=(k,s)=>{ // chữ người chơi đọc
    placeholders(k,s);const s0=s.replace(/\{[^{}]*\}/g,'');
    for(const m of s0.matchAll(/\d+/g)){const sau=s0.slice(m.index+m[0].length,m.index+m[0].length+6);if(!/^\s*tuổi/.test(sau))bad(k,'có con số "'+m[0]+'" trong lời văn.','viết bằng chữ (ví dụ "vài lượng bạc", "ba mùa"); chỉ tuổi mới được ghi số, ví dụ "16 tuổi".');}
    if(/nghiệp\s*(lực|điểm)?\s*[+\-−]|điểm nghiệp|karma/i.test(s0))bad(k,'lời văn nhắc số/điểm nghiệp.','không bao giờ nói điểm nghiệp; chỉ kể việc đã làm.');
    for(const ma in B.NP){const n=B.NP[ma].ten;if(n&&s0.includes(n))bad(k,'ghi thẳng tên "'+n+'".','thay bằng {'+ma+'} (người đang giữ vai có thể đã đổi).');}
    for(const ma in B.LOC){const n=B.LOC[ma].n;if(n&&s0.includes(n))bad(k,'ghi thẳng tên nơi "'+n+'".','thay bằng {'+ma+'} (tên trên bản đồ có thể khác).');}
    for(const ma in B.FA){const n=B.FA[ma].n;if(n&&s0.includes(n)&&!Object.values(B.LOC).some(l=>l.n===n))bad(k,'ghi thẳng tên thế lực "'+n+'".','thay bằng {'+ma+'}.');}
    if(/sống lại|hồi sinh|đội mồ/i.test(s0))warn(k,'có chữ "sống lại/hồi sinh": người đã chết không được quay lại nói tiếp.');
    for(const m of s0.matchAll(/(?<=[\p{Ll},;] )((?:\p{Lu}\p{Ll}+ ){1,2}\p{Lu}\p{Ll}+)/gu))if(!TEN_DUNG.has(m[1]))warn(k,'có vẻ là tên riêng mới "'+m[1]+'". Không tạo người/nơi mới: dùng mã NP/LOC/FA, hoặc gọi chung ("một bà cụ", "gã lái buôn").');};
  const codeList=(k,v,tbl,ten)=>{if(!Array.isArray(v)){bad(k,'phải là mảng [ … ].');return;}v.forEach((x,i)=>{if(!tbl[x])bad(k+'['+i+']',ten+' "'+x+'" không có.','xem bảng mã trong hướng dẫn.');});};
  const flagOk=(k,f)=>{if(typeof f!=='string'||!/^[a-z][a-z0-9_]{1,40}$/.test(f))bad(k,'tên dấu "'+f+'" sai.','dấu viết chữ thường không dấu, nối bằng "_", ví dụ "kho_chung".');};
  const dauDat=new Set();
  function kiemDk(k,dk){if(dk==null)return;if(!only(k,dk,DK_KEYS))return;
    for(const f of ['dau','khongDau'])if(dk[f]!=null){if(!Array.isArray(dk[f]))bad(k+'.'+f,'phải là mảng.');else dk[f].forEach((x,i)=>flagOk(k+'.'+f+'['+i+']',x));}
    if(dk.pham!=null&&typeof dk.pham!=='boolean')bad(k+'.pham','phải là true hoặc false.');
    for(const f of ['canhGioiTu','tuoiTu','tuoiDen','bacTu'])if(dk[f]!=null&&!(Number.isInteger(dk[f])&&dk[f]>=0))bad(k+'.'+f,'phải là số nguyên ≥ 0.');
    if(dk.canhGioiTu!=null&&dk.canhGioiTu>5)bad(k+'.canhGioiTu','cảnh giới 0–5 (0 Luyện Khí … 5 Độ Kiếp).');
    if(dk.linhThachTu!=null&&only(k+'.linhThachTu',dk.linhThachTu,LT))for(const x in dk.linhThachTu)if(!(Number.isInteger(dk.linhThachTu[x])&&dk.linhThachTu[x]>0))bad(k+'.linhThachTu.'+x,'số viên phải nguyên dương.');
    if(dk.linhThachTu&&dk.pham!==false)bad(k+'.linhThachTu','đòi linh thạch mà không ghi "pham": false.','phàm nhân không có linh thạch: thêm "pham": false, hoặc đòi tiền phàm bằng "bacTu" (xu).');
    if(dk.vatPham)(Array.isArray(dk.vatPham)?dk.vatPham:[]).forEach((x,i)=>{if(!B.QI.has(x)&&!vt.has(x))bad(k+'.vatPham['+i+']','vật "'+x+'" không có.','dùng mã vật truyện trong bảng hoặc khai trong "vatTruyen" của tệp.');});
    for(const f of ['vaiSong','vaiMat'])if(dk[f])codeList(k+'.'+f,dk[f],B.NP,'mã người');for(const f of ['faSong','faDiet'])if(dk[f])codeList(k+'.'+f,dk[f],B.FA,'mã thế lực');if(dk.clkDang)codeList(k+'.clkDang',dk.clkDang,B.CLK,'mã đồng hồ');
    if(dk.khoa!=null&&isStr(k+'.khoa',dk.khoa))vanCam(k+'.khoa',dk.khoa);}
  function kiemE(k,e,phamOk){if(e==null)return;if(!only(k,e,E_KEYS))return;
    if(e.bac!=null&&!(Number.isInteger(e.bac)&&Math.abs(e.bac)<=200000))bad(k+'.bac','tiền phàm phải là số nguyên xu (1 lượng bạc = 1000 xu), tối đa 200000.','ví dụ "bac": -3000 là trả ba lượng bạc.');
    if(e.linhThach!=null){if(only(k+'.linhThach',e.linhThach,LT))for(const x in e.linhThach)if(!Number.isInteger(e.linhThach[x])||!e.linhThach[x])bad(k+'.linhThach.'+x,'số viên phải là số nguyên khác 0.');if(phamOk!==false)bad(k+'.linhThach','trao/lấy linh thạch ở chỗ phàm nhân cũng chọn được.','thêm "dk": {"pham": false} cho lựa chọn (hoặc nút), hoặc đổi sang "bac" (xu).');}
    if(e.deed!=null)[].concat(e.deed).forEach(x=>{if(!B.DEED[x])bad(k+'.deed','mã việc làm "'+x+'" không có trong DEED.','chọn một mã trong bảng "Mã việc làm (deed)".');});
    for(const f of ['vatPham','boVatPham'])if(e[f]!=null)[].concat(e[f]).forEach(x=>{if(!B.QI.has(x)&&!vt.has(x))bad(k+'.'+f,'vật "'+x+'" không có.','khai vật trong "vatTruyen" (id bắt đầu bằng "vt_'+String(A.id||'').toLowerCase()+'_") hoặc dùng mã có sẵn.');});
    if(e.fa!=null&&only(k+'.fa',e.fa,Object.keys(B.FA)))for(const f in e.fa)if(!(Number.isInteger(e.fa[f])&&Math.abs(e.fa[f])<=10&&e.fa[f]))bad(k+'.fa.'+f,'sức thế lực đổi từ −10 tới 10, khác 0.');
    if(e.clk!=null&&only(k+'.clk',e.clk,['id','kq'])){if(!B.CLK[e.clk.id])bad(k+'.clk.id','mã đồng hồ "'+e.clk.id+'" không có.','dùng CLK01–CLK14.');if(isStr(k+'.clk.kq',e.clk.kq))vanCam(k+'.clk.kq',e.clk.kq);}
    if(e.giet!=null&&!B.NP[e.giet])bad(k+'.giet','mã người "'+e.giet+'" không có.');
    if(e.hp!=null&&!/^-?\d{1,2}%$/.test(String(e.hp)))bad(k+'.hp','khí huyết ghi phần trăm dạng chuỗi, ví dụ "-10%".');
    if(e.h!=null&&!(Number.isInteger(e.h)&&e.h>0&&e.h<=720))bad(k+'.h','số giờ trôi qua 1–720.');
    if(e.tamma!=null&&!(Number.isInteger(e.tamma)&&Math.abs(e.tamma)<=15))bad(k+'.tamma','tâm ma đổi −15 tới 15.');}
  // ---------- gốc ----------
  const ROOTK=['schemaVersion','id','loai','ten','xuatThan','daiLo','goiYDaiLo','tomTat','mo','vatTruyen','nut','ket','ngoai','ketMo'];
  if(!only('',A,ROOTK))return {loi,cb};
  if(A.schemaVersion!==1)bad('schemaVersion','phải là 1.','ghi "schemaVersion": 1.');
  const base=path.basename(file,'.json');
  if(typeof A.id!=='string'||!/^(OR(0[1-9]|[1-3]\d|4[0-5])|DL0[1-9])$/.test(A.id))bad('id','mã tuyến "'+A.id+'" sai.','tuyến xuất thân OR01–OR45, đại lộ DL01–DL09.');
  else{if(base!==A.id)bad('id','tên tệp "'+base+'.json" khác mã "'+A.id+'".','đặt tên tệp là '+A.id+'.json.');if(seen.id[A.id])bad('id','trùng mã với '+seen.id[A.id]+'.');seen.id[A.id]=rel;}
  if(!['xuat_than','dai_lo'].includes(A.loai))bad('loai','phải là "xuat_than" hoặc "dai_lo".');
  isStr('ten',A.ten)&&vanCam('ten',A.ten);if(A.tomTat!=null)isStr('tomTat',A.tomTat);
  const vt=new Set();
  if(A.vatTruyen!=null){if(!Array.isArray(A.vatTruyen))bad('vatTruyen','phải là mảng.');else A.vatTruyen.forEach((v,i)=>{const k='vatTruyen['+i+']';if(!only(k,v,['id','n','i','d']))return;
    const pre='vt_'+String(A.id||'').toLowerCase()+'_';if(typeof v.id!=='string'||!v.id.startsWith(pre)||!/^[a-z0-9_]+$/.test(v.id))bad(k+'.id','mã vật "'+v.id+'" sai.','bắt đầu bằng "'+pre+'", chữ thường không dấu, ví dụ "'+pre+'so_ho".');
    else{if(vt.has(v.id)||B.QI.has(v.id)||seen.vt[v.id])bad(k+'.id','mã vật trùng "'+v.id+'".');vt.add(v.id);seen.vt[v.id]=rel;}
    isStr(k+'.n',v.n)&&vanCam(k+'.n',v.n);isStr(k+'.d',v.d)&&vanCam(k+'.d',v.d);});}
  if(A.loai==='xuat_than'){if(!B.ORIGIN.some(o=>o.id===A.xuatThan))bad('xuatThan','mã xuất thân "'+A.xuatThan+'" không có.','xem bảng 45 xuất thân trong hướng dẫn.');else if(seen.xt[A.xuatThan])bad('xuatThan','xuất thân này đã có tuyến ở '+seen.xt[A.xuatThan]+'.');else seen.xt[A.xuatThan]=rel;
    if(A.daiLo!=null)bad('daiLo','tuyến xuất thân không ghi "daiLo".','xoá khoá này; muốn gợi ý thì dùng "goiYDaiLo".');}
  if(A.loai==='dai_lo'){if(!DAI_LO.includes(A.daiLo))bad('daiLo','đại lộ "'+A.daiLo+'" không có.','một trong: '+DAI_LO.join(', ')+'.');if(A.xuatThan!=null)bad('xuatThan','đại lộ không gắn xuất thân.','xoá khoá này.');}
  if(A.goiYDaiLo!=null){if(!Array.isArray(A.goiYDaiLo))bad('goiYDaiLo','phải là mảng.');else A.goiYDaiLo.forEach((d,i)=>{if(!DAI_LO.includes(d))bad('goiYDaiLo['+i+']','đại lộ "'+d+'" không có.','một trong: '+DAI_LO.join(', ')+'.');});}
  if(A.mo!=null&&only('mo',A.mo,['tuoiTu','dk'])){if(A.mo.tuoiTu!=null&&!(Number.isInteger(A.mo.tuoiTu)&&A.mo.tuoiTu>=16&&A.mo.tuoiTu<=80))bad('mo.tuoiTu','tuổi mở tuyến 16–80 (nhân vật bắt đầu ở tuổi 16).');kiemDk('mo.dk',A.mo.dk);}
  if(A.ngoai!=null)isStr('ngoai',A.ngoai)&&vanCam('ngoai',A.ngoai);if(A.ketMo!=null)isStr('ketMo',A.ketMo)&&vanCam('ketMo',A.ketMo);
  // ---------- nút ----------
  const NUTK=['id','ten','cho','dk','loiMoi','han','mo','thayThe','cach','tuDien','clk','khacVoi','boQuaNeuXuatThan'];
  if(!Array.isArray(A.nut)||A.nut.length!==5)bad('nut','phải có đúng 5 nút (5 mốc), đang có '+(Array.isArray(A.nut)?A.nut.length:0)+'.','viết đủ N1…N5 (đại lộ: hồi 1…5).');
  (A.nut||[]).forEach((N,i)=>{const k='nut['+i+']';if(!only(k,N,NUTK))return;
    if(N.id!=='N'+(i+1))bad(k+'.id','mã nút phải là "N'+(i+1)+'" (theo thứ tự).');
    isStr(k+'.ten',N.ten)&&vanCam(k+'.ten',N.ten);
    if(N.cho!=null&&only(k+'.cho',N.cho,['nam','thang']))for(const x in N.cho)if(!(Number.isInteger(N.cho[x])&&N.cho[x]>=0&&N.cho[x]<=(x==='nam'?10:24)))bad(k+'.cho.'+x,'năm 0–10, tháng 0–24.');
    if(!N.han||!only(k+'.han',N.han,['nam','thang']))bad(k+'.han','thiếu hạn mềm.','ví dụ "han": {"thang": 12}.');else{const m=(N.han.nam||0)*12+(N.han.thang||0);if(!(m>=1&&m<=120))bad(k+'.han','hạn từ 1 tháng tới 10 năm.');}
    kiemDk(k+'.dk',N.dk);
    const LM=N.loiMoi;if(!LM||!only(k+'.loiMoi',LM,['cach','noi','vai']))bad(k+'.loiMoi','thiếu lời mời.','ví dụ "loiMoi": {"cach": "nguoi", "vai": "NP01", "noi": "LOC01"}.');
    else{if(!CACH_MOI.includes(LM.cach))bad(k+'.loiMoi.cach','cách mời "'+LM.cach+'" sai.','một trong: thu, nguoi, tin, ky_ngo.');
      if(LM.noi!=null&&LM.noi!=='here'&&!B.LOC[LM.noi])bad(k+'.loiMoi.noi','mã nơi "'+LM.noi+'" không có.','LOC01–LOC15 hoặc "here".');
      if(LM.cach==='tin'&&(!LM.noi||LM.noi==='here'))bad(k+'.loiMoi.noi','lời mời kiểu tin đồn phải chỉ một nơi LOC.','thêm "noi": "LOCxx" — người chơi tới đó mới gặp chuyện.');
      if(LM.cach==='nguoi'&&!LM.vai)bad(k+'.loiMoi.vai','"nguoi" (có người tìm tới) phải ghi vai.','thêm "vai": "NPxx".');
      if(LM.vai!=null&&!B.NP[LM.vai])bad(k+'.loiMoi.vai','mã người "'+LM.vai+'" không có.','NP01–NP30.');}
    isStr(k+'.mo',N.mo,120)&&vanCam(k+'.mo',N.mo);
    if(N.mo&&N.mo.length>900)warn(k+'.mo','đoạn mở dài ('+N.mo.length+' ký tự), nên dưới 700.');
    if(LM&&LM.vai){if(isStr(k+'.thayThe',N.thayThe,80)){vanCam(k+'.thayThe',N.thayThe);if(N.thayThe.includes('{'+LM.vai+'}'))bad(k+'.thayThe','đoạn thay thế vẫn gọi {'+LM.vai+'} — người này đã mất khi đoạn này hiện.','kể qua vật chứng / người thay ({'+LM.vai+'.vai}, "'+B.NP[LM.vai].thay+'"), không để người chết nói.');}}
    else if(N.thayThe!=null)isStr(k+'.thayThe',N.thayThe)&&vanCam(k+'.thayThe',N.thayThe);
    if(!Array.isArray(N.cach)||N.cach.length<3||N.cach.length>5)bad(k+'.cach','mỗi nút cần 3–5 lựa chọn (đang có '+(Array.isArray(N.cach)?N.cach.length:0)+').','game tự thêm nút "Để sau", không cần viết.');
    const cids=new Set();
    (N.cach||[]).forEach((c,j)=>{const kc=k+'.cach['+j+']';if(!only(kc,c,['id','l','t','dk','e','dau','boQua']))return;
      if(typeof c.id!=='string'||!/^[a-z][a-z0-9_]{0,30}$/.test(c.id))bad(kc+'.id','mã lựa chọn "'+c.id+'" sai.','chữ thường không dấu, ví dụ "giu_giong".');else if(cids.has(c.id))bad(kc+'.id','trùng mã lựa chọn "'+c.id+'" trong nút.');cids.add(c.id);
      if(isStr(kc+'.l',c.l)){vanCam(kc+'.l',c.l);if(c.l.length>70)warn(kc+'.l','nhãn dài ('+c.l.length+' ký tự), nên dưới 60.');}
      isStr(kc+'.t',c.t,60)&&vanCam(kc+'.t',c.t);
      kiemDk(kc+'.dk',c.dk);const phamOk=(c.dk&&c.dk.pham===false)||(N.dk&&N.dk.pham===false)||(A.mo&&A.mo.dk&&A.mo.dk.pham===false)?false:true;kiemE(kc+'.e',c.e,phamOk);
      if(c.dau!=null){if(!Array.isArray(c.dau))bad(kc+'.dau','phải là mảng.');else c.dau.forEach((f,x)=>{flagOk(kc+'.dau['+x+']',f);dauDat.add(f);});}
      if(c.boQua!=null&&c.boQua!==true)bad(kc+'.boQua','chỉ ghi true hoặc bỏ hẳn khoá.');});
    if((N.cach||[]).every(c=>c&&c.dk))bad(k+'.cach','mọi lựa chọn đều có điều kiện: người chơi có thể kẹt.','để ít nhất một lựa chọn không có "dk".');
    const T=N.tuDien;if(!T||!only(k+'.tuDien',T,['t','su','dau','clk']))bad(k+'.tuDien','thiếu "tuDien" (thế giới tự diễn khi người chơi bỏ qua/lỡ hạn).','ví dụ "tuDien": {"t": "…", "su": "…", "dau": ["…"]}.');
    else{isStr(k+'.tuDien.t',T.t,40)&&vanCam(k+'.tuDien.t',T.t);if(T.su!=null)isStr(k+'.tuDien.su',T.su)&&vanCam(k+'.tuDien.su',T.su);if(T.dau)(Array.isArray(T.dau)?T.dau:[]).forEach((f,x)=>{flagOk(k+'.tuDien.dau['+x+']',f);dauDat.add(f);});
      if(T.clk!=null&&only(k+'.tuDien.clk',T.clk,['id','kq'])){if(!B.CLK[T.clk.id])bad(k+'.tuDien.clk.id','mã đồng hồ không có.');isStr(k+'.tuDien.clk.kq',T.clk.kq)&&vanCam(k+'.tuDien.clk.kq',T.clk.kq);}}
    if(A.loai==='dai_lo'){if(i>0&&!(typeof N.khacVoi==='string'&&N.khacVoi.length>=10))bad(k+'.khacVoi','hồi đại lộ phải ghi rõ khác nút nào của tuyến xuất thân.','ví dụ "khacVoi": "OR01.N2 khảo đê; hồi này là tranh quyền dòng họ, không khảo đê lại".');
      if(i===2||i===4){if(!B.CLK[N.clk])bad(k+'.clk','hồi '+(i+1)+' của đại lộ phải chạm một đồng hồ thế giới.','thêm "clk": "CLKxx" và một lựa chọn có "e": {"clk": {"id": "CLKxx", "kq": "…"}}.');
        else if(!(N.cach||[]).some(c=>c&&c.e&&c.e.clk&&c.e.clk.id===N.clk))bad(k+'.cach','hồi chạm đồng hồ '+N.clk+' nhưng không lựa chọn nào can thiệp.','thêm vào một lựa chọn "e": {"clk": {"id": "'+N.clk+'", "kq": "…"}}.');}
      if(i===0&&N.boQuaNeuXuatThan!==true)warn(k+'.boQuaNeuXuatThan','hồi 1 nên có "boQuaNeuXuatThan": true để không kể lại phần mở đầu.');}
    else{if(N.clk!=null&&!B.CLK[N.clk])bad(k+'.clk','mã đồng hồ không có.');if(N.boQuaNeuXuatThan!=null)bad(k+'.boQuaNeuXuatThan','chỉ dùng cho đại lộ.');}});
  // ---------- kết ----------
  if(!Array.isArray(A.ket)||A.ket.length!==3)bad('ket','phải có đúng 3 kết (A, B, C).');
  (A.ket||[]).forEach((K,i)=>{const k='ket['+i+']';if(!only(k,K,['id','ten','dk','t','su','dauVong','e']))return;
    if(K.id!==['A','B','C'][i])bad(k+'.id','mã kết phải là "'+['A','B','C'][i]+'".');isStr(k+'.ten',K.ten)&&vanCam(k+'.ten',K.ten);isStr(k+'.t',K.t,120)&&vanCam(k+'.t',K.t);
    isStr(k+'.su',K.su)&&vanCam(k+'.su',K.su);isStr(k+'.dauVong',K.dauVong)&&vanCam(k+'.dauVong',K.dauVong);
    if(!K.dk||!(K.dk.dau||[]).length)bad(k+'.dk','kết phải đòi ít nhất một dấu (dk.dau).','ví dụ "dk": {"dau": ["kho_chung"]}.');kiemDk(k+'.dk',K.dk);
    kiemE(k+'.e',K.e,true);
    for(const f of (K.dk&&K.dk.dau)||[])if(!dauDat.has(f))bad(k+'.dk.dau','dấu "'+f+'" không lựa chọn nào đặt: kết này không bao giờ tới được.','thêm "dau": ["'+f+'"] vào một lựa chọn.');});
  return {loi,cb,A};}
function kiemTuyen(files){const B=bang();const seen={id:{},xt:{},vt:{}};const loi=[],cb=[],tuyen=[];
  if(!fs.existsSync(DIR))return {loi,cb,tuyen};
  files=files&&files.length?files.map(f=>path.resolve(f)):fs.readdirSync(DIR).filter(f=>f.endsWith('.json')).sort().map(f=>path.join(DIR,f));
  for(const f of files){if(!fs.existsSync(f)){loi.push(f+': không có tệp.');continue;}const o=kiemTep(f,B,seen);loi.push(...o.loi);cb.push(...o.cb);if(!o.loi.length&&o.A)tuyen.push(o.A);}
  // chống kể trùng: hai nút cùng vai + cùng nơi ở hai tuyến khác loại → cảnh báo
  const xt=tuyen.filter(a=>a.loai==='xuat_than'),dl=tuyen.filter(a=>a.loai==='dai_lo');
  for(const d of dl)d.nut.forEach((N,i)=>{for(const x of xt)x.nut.forEach(M=>{const a=N.loiMoi||{},b=M.loiMoi||{};if(a.vai&&a.vai===b.vai&&a.noi===b.noi)cb.push('content/tuyen/'+d.id+'.json nút '+N.id+': cùng người '+a.vai+' và cùng nơi với '+x.id+'.'+M.id+' — kiểm "khacVoi" có nói rõ mục tiêu khác không.');});});
  return {loi,cb,tuyen};}
module.exports={kiemTuyen,parseJ,DAI_LO};
// in đoạn thiết kế của các tuyến (để dán cho người viết): node tools/kiem-tra-tuyen.js --de OR02 OR03 OR04
function deTuyen(ids){const s=fs.readFileSync(path.join(ROOT,'docs/thiet-ke/PHAN-TICH-HOP-NHAT.md'),'utf8');const out=[];
  for(const id of ids){const i=s.indexOf('**'+id+' — ');if(i<0){out.push(id+': không thấy trong PHAN-TICH-HOP-NHAT.md');continue;}const rest=s.slice(i+4);const m=/\n\*\*OR\d\d — |\n#{2,5} /.exec(rest);out.push(s.slice(i,m?i+4+m.index:i+4000).trim());}
  return out.join('\n\n');}
if(require.main===module&&process.argv[2]==='--de'){console.log(deTuyen(process.argv.slice(3)));}
else if(require.main===module){const r=kiemTuyen(process.argv.slice(2).filter(a=>!a.startsWith('-')));
  for(const c of r.cb)console.log('  ⚠ Cảnh báo: '+c);for(const l of r.loi)console.log('  ✗ Lỗi: '+l);
  console.log(r.loi.length?`\nCÓ ${r.loi.length} LỖI (${r.cb.length} cảnh báo). Sửa hết lỗi rồi chạy lại: npm run content:tuyen`:`\nĐạt: ${r.tuyen.length} tuyến không lỗi (${r.cb.length} cảnh báo).`);
  if(r.loi.length)process.exitCode=1;}
