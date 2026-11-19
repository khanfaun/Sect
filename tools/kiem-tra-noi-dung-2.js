// Kiểm nội dung đợt GPT-2: quả chín, nghề phàm (lời thăng bậc + 4 kết cục), sự kiện dọc đường cải căn, cảnh kể (quan phủ, truy đuổi).
// Chạy: npm run content:gpt            (kiểm các tệp đang có; liệt kê phần còn thiếu)
//       npm run content:gpt -- --du    (đòi đủ hết mọi tệp — dùng ở lô cuối)
//       node tools/kiem-tra-noi-dung-2.js content/qua-chin/cuu_nguoi.json   (chỉ kiểm vài tệp)
// Báo lỗi tiếng Việt: tệp, dòng, khoá sai và cách sửa. Lỗi thì thoát mã 1; cảnh báo không chặn.
const fs=require('fs'),path=require('path'),vm=require('vm');const ROOT=path.resolve(__dirname,'..');
const {parseJ,bang,TEN_DUNG}=require('./kiem-tra-tuyen');
const LOAI={
  qua_chin:{dir:'content/qua-chin',ten:'quả chín'},
  nghe:{dir:'content/nghe-pham',ten:'nghề phàm'},
  cai_can:{dir:'content/cai-can',ten:'cải căn dọc đường'},
  canh:{dir:'content/canh',ten:'cảnh kể'}};
const CANH={quan_phu:['heo1','heo2','truyNa','lamCong','raTu'],truy:['thu','tac','tu','ke','quy','no','cuop']};
const SO={qcBien:3,ccMoiBuoc:1,canhMoiKhoa:3,ket:4};
const E_KEYS=['bac','deed','hp','h','tamma','nang'];
const DK_KEYS=['pham','tuoiTu','tuoiDen','bacTu','canhGioiTu'];
const KET_DK=['bacNgheTu','bacNgheDen','nghiep','hanhDao','nang','bacTu','pham','tuoiTu'];
function rdJs(p,names){return vm.runInNewContext(fs.readFileSync(path.join(ROOT,p),'utf8')+';({'+names.join(',')+'})',{});}
function bang2(){const B=bang();
  B.NGHE=rdJs('content/rules/nghe.js',['NGHE']).NGHE;B.NANG_K=rdJs('content/rules/nang.js',['NANG_K']).NANG_K;
  const cc=rdJs('content/rules/cai-can.js',['CAI_CAN','CC_VT','CC_DO']);B.CC=cc.CAI_CAN;
  B.TEN_OK=new Set([...Object.values(cc.CC_VT||{}).map(v=>v.n),...Object.values(cc.CAI_CAN).map(v=>v.n),...Object.values(B.NGHE).flatMap(n=>n.ranks),...JSON.parse(fs.readFileSync(path.join(ROOT,'content/catalog/qitems.json'),'utf8')).map(x=>x.n)].filter(Boolean));B.TRUY=rdJs('content/rules/truy.js',['TRUY']).TRUY;
  const tx={};for(const f of fs.readdirSync(path.join(ROOT,'content/text')).filter(f=>f.endsWith('.json')))Object.assign(tx,JSON.parse(fs.readFileSync(path.join(ROOT,'content/text',f),'utf8')));B.TX=tx;
  B.SEED=Object.keys(B.DEED).filter(k=>B.DEED[k].seed);
  B.CCID=Object.keys(B.CC).filter(k=>!B.CC[k].off);
  return B;}
// danh sách phải viết (dùng cho --du và tài liệu)
function canViet(B){B=B||bang2();const L=[];
  for(const d of B.SEED)L.push({loai:'qua_chin',tep:'content/qua-chin/'+d+'.json',ma:d,mo:B.TX['deed.'+d]||d});
  for(const m in B.NGHE)L.push({loai:'nghe',tep:'content/nghe-pham/'+m+'.json',ma:m,mo:B.NGHE[m].n+' ('+B.NGHE[m].ranks.join(' → ')+')'+(B.TX['ng.'+m+'.up1']!=null?' — đã có lời thăng bậc, chỉ viết "ket"':' — viết "len" và "ket"'),len:B.TX['ng.'+m+'.up1']==null});
  for(const c of B.CCID)L.push({loai:'cai_can',tep:'content/cai-can/'+c+'.json',ma:c,mo:B.CC[c].n+' — bước: '+B.CC[c].steps.map((s,i)=>s.b==='rite'?null:i+':'+s.b).filter(Boolean).join(', ')});
  for(const n in CANH)L.push({loai:'canh',tep:'content/canh/'+n.replace('_','-')+'.json',ma:n,mo:CANH[n].join(', ')});
  return L;}
function kiemTep(file,B,seen){const loi=[],cb=[];const rel=path.relative(ROOT,file).replace(/\\/g,'/');let P;
  try{P=parseJ(fs.readFileSync(file,'utf8'));}catch(e){loi.push(rel+' dòng '+(e.line||'?')+': JSON sai — '+e.message+'. Cách sửa: mở tệp ở dòng này, kiểm dấu phẩy, ngoặc và ngoặc kép.');return {loi,cb};}
  const A=P.v,L=P.lines;const dong=k=>{while(k&&L[k]==null)k=k.replace(/(\.[^.[\]]+|\[\d+\])$/,'');return L[k]||1;};
  const bad=(k,m,sua)=>loi.push(rel+' dòng '+dong(k)+', khoá '+(k||'(gốc)')+': '+m+(sua?' Cách sửa: '+sua:''));
  const warn=(k,m)=>cb.push(rel+' dòng '+dong(k)+', khoá '+(k||'(gốc)')+': '+m);
  const only=(k,o,allow)=>{if(!o||typeof o!=='object'||Array.isArray(o)){bad(k,'phải là một đối tượng {…}.');return false;}let g=true;for(const x of Object.keys(o))if(!allow.includes(x)){bad(k?k+'.'+x:x,'khoá "'+x+'" không có trong định dạng.','chỉ dùng: '+allow.join(', ')+'.');g=false;}return g;};
  const isStr=(k,v,min,max)=>{if(typeof v!=='string'||!v.trim()){bad(k,'thiếu chữ hoặc không phải chuỗi.','viết một đoạn chữ trong ngoặc kép.');return false;}
    if(min&&v.length<min)bad(k,'đoạn văn quá ngắn ('+v.length+' ký tự), cần ít nhất '+min+'.','viết thêm chi tiết cảnh, người, cái giá.');if(max&&v.length>max)warn(k,'đoạn văn dài ('+v.length+' ký tự), nên dưới '+max+'.');return true;};
  const extra=A&&A.loai==='canh'&&A.nhom==='truy'?['ke']:[];
  const vanCam=(k,s)=>{
    for(const m of s.matchAll(/\{([^{}]*)\}/g)){const t=m[1];if(t==='ten'||t==='que'||extra.includes(t))continue;const mm=/^(NP\d\d)(\.(vai|noi))?$|^(LOC\d\d)$|^(FA\d\d)$/.exec(t);
      if(!mm){bad(k,'chỗ thay "{'+t+'}" không hợp lệ.','chỉ dùng {ten}, {que}, {NPxx}, {NPxx.vai}, {NPxx.noi}, {LOCxx}, {FAxx}'+(extra.length?', {ke}':'')+'.');continue;}
      if(mm[1]&&!B.NP[mm[1]])bad(k,'mã người '+mm[1]+' không có.','dùng NP01–NP30.');if(mm[4]&&!B.LOC[mm[4]])bad(k,'mã nơi '+mm[4]+' không có.','dùng LOC01–LOC15.');if(mm[5]&&!B.FA[mm[5]])bad(k,'mã thế lực '+mm[5]+' không có.','dùng FA01–FA10.');}
    const s0=s.replace(/\{[^{}]*\}/g,'');
    for(const m of s0.matchAll(/\d+/g)){const sau=s0.slice(m.index+m[0].length,m.index+m[0].length+6);if(!/^\s*tuổi/.test(sau))bad(k,'có con số "'+m[0]+'" trong lời văn.','viết bằng chữ ("vài lượng bạc", "ba mùa"); chỉ tuổi được ghi số, ví dụ "16 tuổi".');}
    if(/nghiệp\s*(lực|điểm)?\s*[+\-−]|điểm nghiệp|karma|\bxp\b|kinh nghiệm\s*[+\-]/i.test(s0))bad(k,'lời văn nhắc điểm số (nghiệp, kinh nghiệm).','không nói điểm; chỉ kể việc đã xảy ra.');
    if(/\b(xu|đồng|lượng)\b/.test(s0)&&/\d/.test(s))bad(k,'ghi số tiền trong lời văn.','tiền thật đặt ở "e": {"bac": …} (xu); lời văn chỉ nói "vài đồng", "một túi bạc".');
    for(const ma in B.NP){const n=B.NP[ma].ten;if(n&&s0.includes(n))bad(k,'ghi thẳng tên "'+n+'".','thay bằng {'+ma+'}.');}
    for(const ma in B.LOC){const n=B.LOC[ma].n;if(n&&s0.includes(n))bad(k,'ghi thẳng tên nơi "'+n+'".','thay bằng {'+ma+'}.');}
    for(const ma in B.FA){const n=B.FA[ma].n;if(n&&s0.includes(n)&&!Object.values(B.LOC).some(l=>l.n===n))bad(k,'ghi thẳng tên thế lực "'+n+'".','thay bằng {'+ma+'}.');}
    if(/sống lại|hồi sinh|đội mồ/i.test(s0))warn(k,'có chữ "sống lại/hồi sinh": người đã chết không quay lại.');
    for(const m of s0.matchAll(/(?<=[\p{Ll},;] )((?:\p{Lu}\p{Ll}+ ){1,2}\p{Lu}\p{Ll}+)/gu))if(!TEN_DUNG.has(m[1])&&!B.TEN_OK.has(m[1]))bad(k,'có vẻ là tên riêng mới "'+m[1]+'".','không tạo người/nơi mới: dùng mã NP/LOC/FA, hoặc gọi chung ("một bà cụ", "gã lái buôn").');};
  const txt=(k,v,min,max)=>{if(isStr(k,v,min,max))vanCam(k,v);};
  const intIn=(k,v,a,b,m)=>{if(!(Number.isInteger(v)&&v>=a&&v<=b))bad(k,m||('phải là số nguyên từ '+a+' tới '+b+'.'));};
  function kiemDk(k,dk,keys){if(dk==null)return;if(!only(k,dk,keys||DK_KEYS))return;
    if(dk.pham!=null&&typeof dk.pham!=='boolean')bad(k+'.pham','phải là true hoặc false.');
    for(const f of ['tuoiTu','tuoiDen'])if(dk[f]!=null)intIn(k+'.'+f,dk[f],16,200);
    if(dk.canhGioiTu!=null)intIn(k+'.canhGioiTu',dk.canhGioiTu,0,5,'cảnh giới 0–5 (0 Luyện Khí … 5 Độ Kiếp).');
    if(dk.bacTu!=null)intIn(k+'.bacTu',dk.bacTu,1,200000,'tiền tính bằng xu, số nguyên 1–200000 (1 lượng bạc = 1000 xu).');
    for(const f of ['bacNgheTu','bacNgheDen'])if(dk[f]!=null)intIn(k+'.'+f,dk[f],0,(B._bacMax||5),'bậc nghề 0–'+(B._bacMax||5)+' (0 là bậc đầu "'+(B._rank0||'')+'").');
    if(dk.nghiep!=null&&!['thien','ac'].includes(dk.nghiep))bad(k+'.nghiep','"nghiep" là "thien" (phúc duyên hơn nghiệp chướng) hoặc "ac".');
    if(dk.hanhDao!=null&&!['chinh','ta'].includes(dk.hanhDao))bad(k+'.hanhDao','"hanhDao" là "chinh" hoặc "ta".');
    if(dk.nang!=null&&only(k+'.nang',dk.nang,B.NANG_K))for(const x in dk.nang)intIn(k+'.nang.'+x,dk.nang[x],1,100,'mức năng lực 1–100 (Khá ≈ 20, Thạo ≈ 35, Lão luyện ≈ 55).');}
  function kiemE(k,e){if(e==null)return;if(!only(k,e,E_KEYS))return;
    if(e.bac!=null)intIn(k+'.bac',e.bac,-200000,200000,'tiền phàm là số nguyên xu (1 lượng bạc = 1000 xu), từ −200000 tới 200000; ví dụ "bac": -300 là trả ba trăm xu.');
    if(e.bac===0)bad(k+'.bac','bằng 0: bỏ khoá này.');
    if(e.deed!=null)[].concat(e.deed).forEach(x=>{if(!B.DEED[x])bad(k+'.deed','mã việc làm "'+x+'" không có trong DEED.','chọn mã trong bảng "Mã việc làm" của hướng dẫn.');});
    if(e.hp!=null&&!/^-?\d{1,2}%$/.test(String(e.hp)))bad(k+'.hp','khí huyết ghi phần trăm dạng chuỗi, ví dụ "-10%".');
    if(e.h!=null)intIn(k+'.h',e.h,1,720,'số giờ trôi qua 1–720.');
    if(e.tamma!=null)intIn(k+'.tamma',e.tamma,-15,15,'tâm ma đổi −15 tới 15.');
    if(e.nang!=null&&only(k+'.nang',e.nang,B.NANG_K))for(const x in e.nang)if(!(typeof e.nang[x]==='number'&&e.nang[x]!==0&&Math.abs(e.nang[x])<=3))bad(k+'.nang.'+x,'năng lực đổi từ −3 tới 3, khác 0.');}
  function kiemCach(k,L,min,max){if(!Array.isArray(L)||L.length<min||L.length>max){bad(k,'cần '+min+'–'+max+' lựa chọn (đang có '+(Array.isArray(L)?L.length:0)+').');if(!Array.isArray(L))return;}
    const ids=new Set();L.forEach((c,j)=>{const kc=k+'['+j+']';if(!only(kc,c,['id','l','t','dk','e']))return;
      if(typeof c.id!=='string'||!/^[a-z][a-z0-9_]{0,30}$/.test(c.id))bad(kc+'.id','mã lựa chọn "'+c.id+'" sai.','chữ thường không dấu, ví dụ "giu_loi".');else if(ids.has(c.id))bad(kc+'.id','trùng mã lựa chọn "'+c.id+'".');ids.add(c.id);
      if(isStr(kc+'.l',c.l)){vanCam(kc+'.l',c.l);if(c.l.length>70)warn(kc+'.l','nhãn dài ('+c.l.length+' ký tự), nên dưới 60.');}
      txt(kc+'.t',c.t,60,700);kiemDk(kc+'.dk',c.dk);kiemE(kc+'.e',c.e);
      if(c.e&&Number.isInteger(c.e.bac)&&c.e.bac<0&&!(c.dk&&c.dk.bacTu>=-c.e.bac))bad(kc+'.dk','lựa chọn trả tiền mà không đòi có đủ tiền.','thêm "dk": {"bacTu": '+(-c.e.bac)+'} để người không đủ tiền không bấm được.');});
    if(L.length&&L.every(c=>c&&c.dk))bad(k,'mọi lựa chọn đều có điều kiện: người chơi có thể kẹt.','để ít nhất một lựa chọn không có "dk".');}
  const ROOTK={qua_chin:['schemaVersion','loai','deed','bien'],nghe:['schemaVersion','loai','nghe','len','ket'],cai_can:['schemaVersion','loai','duong','ev'],canh:['schemaVersion','loai','nhom','canh']};
  if(!A||typeof A!=='object'||!ROOTK[A.loai]){bad('loai','"loai" phải là một trong: '+Object.keys(ROOTK).join(', ')+'.');return {loi,cb};}
  const dirOk=LOAI[A.loai].dir;if(!rel.startsWith(dirOk+'/'))bad('loai','tệp loại "'+A.loai+'" phải nằm trong '+dirOk+'/.');
  if(!only('',A,ROOTK[A.loai]))return {loi,cb};
  if(A.schemaVersion!==1)bad('schemaVersion','phải là 1.','ghi "schemaVersion": 1.');
  const base=path.basename(file,'.json');const out={loai:A.loai};
  if(A.loai==='qua_chin'){
    if(!B.DEED[A.deed])bad('deed','mã việc làm "'+A.deed+'" không có.','xem bảng hạt quả chín trong 2-danh-sach.md.');
    else if(!B.DEED[A.deed].seed)bad('deed','việc "'+A.deed+'" không gieo hạt quả chín nên sự kiện không bao giờ hiện.','chỉ viết cho mã có trong danh sách quả chín.');
    if(base!==A.deed)bad('deed','tên tệp "'+base+'.json" khác mã "'+A.deed+'".','đặt tên tệp là '+A.deed+'.json.');
    if(seen[A.loai+':'+A.deed])bad('deed','trùng với '+seen[A.loai+':'+A.deed]+'.');seen[A.loai+':'+A.deed]=rel;
    if(!Array.isArray(A.bien)||A.bien.length<SO.qcBien)bad('bien','cần ít nhất '+SO.qcBien+' biến thể (đang có '+(Array.isArray(A.bien)?A.bien.length:0)+').','mỗi biến thể là một cách quả chín khác nhau.');
    const ids=new Set();(A.bien||[]).forEach((v,i)=>{const k='bien['+i+']';if(!only(k,v,['id','dk','ten','t','c']))return;
      if(typeof v.id!=='string'||!/^[a-z]$/.test(v.id))bad(k+'.id','mã biến thể là một chữ cái thường: "a", "b", "c"…');else if(ids.has(v.id))bad(k+'.id','trùng mã "'+v.id+'".');ids.add(v.id);
      kiemDk(k+'.dk',v.dk);txt(k+'.ten',v.ten,4,40);txt(k+'.t',v.t,150,900);kiemCach(k+'.c',v.c,2,4);});
    if((A.bien||[]).length&&(A.bien||[]).every(v=>v&&v.dk))bad('bien','mọi biến thể đều có điều kiện: có lúc hạt chín mà không có gì hiện.','để ít nhất một biến thể không có "dk".');
    out.ma=A.deed;out.v=A.bien;}
  if(A.loai==='nghe'){const N=B.NGHE[A.nghe];
    if(!N)bad('nghe','mã nghề "'+A.nghe+'" không có.','một trong: '+Object.keys(B.NGHE).join(', ')+'.');
    if(base!==A.nghe)bad('nghe','tên tệp "'+base+'.json" khác mã "'+A.nghe+'".','đặt tên tệp là '+A.nghe+'.json.');
    if(seen[A.loai+':'+A.nghe])bad('nghe','trùng với '+seen[A.loai+':'+A.nghe]+'.');seen[A.loai+':'+A.nghe]=rel;
    if(N){B._bacMax=N.ranks.length-1;B._rank0=N.ranks[0];const need=N.ranks.length-1;
      const coSan=B.TX['ng.'+A.nghe+'.up1']!=null;
      if(A.len==null&&!coSan)bad('len','nghề này chưa có lời thăng bậc riêng: cần mảng "len" '+need+' đoạn.','đoạn thứ nhất là lúc lên "'+N.ranks[1]+'", đoạn cuối là lúc lên "'+N.ranks[need]+'".');
      else if(A.len!=null&&(!Array.isArray(A.len)||A.len.length!==need))bad('len','cần đúng '+need+' đoạn thăng bậc (từ "'+N.ranks[1]+'" tới "'+N.ranks[need]+'"), đang có '+(Array.isArray(A.len)?A.len.length:0)+'.','đoạn thứ nhất là lúc lên "'+N.ranks[1]+'", đoạn cuối là lúc lên "'+N.ranks[need]+'".');
      (A.len||[]).forEach((s,i)=>txt('len['+i+']',s,80,600));
      if(!Array.isArray(A.ket)||A.ket.length!==SO.ket)bad('ket','cần đúng '+SO.ket+' kết cục (A, B, C, D).');
      (A.ket||[]).forEach((K,i)=>{const k='ket['+i+']';if(!only(k,K,['id','ten','dk','t']))return;const id=['A','B','C','D'][i];
        if(K.id!==id)bad(k+'.id','mã kết phải là "'+id+'" (theo thứ tự).');txt(k+'.ten',K.ten,4,50);txt(k+'.t',K.t,150,900);
        if(i<3){if(!K.dk)bad(k+'.dk','kết '+id+' phải có điều kiện.','ví dụ "dk": {"bacNgheTu": 4, "nghiep": "thien"}.');else kiemDk(k+'.dk',K.dk,KET_DK);}
        else if(K.dk!=null)bad(k+'.dk','kết D là kết dự phòng: không được có điều kiện.','xoá "dk" của kết D.');});
      if(Array.isArray(A.ket)&&A.ket.length===4&&!A.ket.slice(0,3).some(K=>K&&K.dk&&K.dk.bacNgheTu>=Math.max(3,need-1)))warn('ket','không kết nào dành cho người lên tới bậc cao (bacNgheTu từ '+Math.max(3,need-1)+').');}
    out.ma=A.nghe;out.v={len:A.len,ket:A.ket};}
  if(A.loai==='cai_can'){const P=B.CC[A.duong];
    if(!P)bad('duong','mã đường "'+A.duong+'" không có.','một trong: '+B.CCID.join(', ')+'.');else if(P.off)bad('duong','đường "'+A.duong+'" đang tắt, chưa viết.');
    if(base!==A.duong)bad('duong','tên tệp "'+base+'.json" khác mã "'+A.duong+'".','đặt tên tệp là '+A.duong+'.json.');
    if(seen[A.loai+':'+A.duong])bad('duong','trùng với '+seen[A.loai+':'+A.duong]+'.');seen[A.loai+':'+A.duong]=rel;
    const ok=P?P.steps.map((s,i)=>s.b==='rite'?-1:i).filter(i=>i>=0):[];const dem={};const ids=new Set();
    if(!Array.isArray(A.ev))bad('ev','phải là mảng sự kiện.');
    (A.ev||[]).forEach((v,i)=>{const k='ev['+i+']';if(!only(k,v,['buoc','id','ten','t','c']))return;
      if(!ok.includes(v.buoc))bad(k+'.buoc','bước "'+v.buoc+'" không có (hoặc là bước nghi thức).','dùng một trong: '+ok.join(', ')+' (xem 2-danh-sach.md).');else dem[v.buoc]=(dem[v.buoc]||0)+1;
      if(typeof v.id!=='string'||!/^[a-z][a-z0-9_]{0,30}$/.test(v.id))bad(k+'.id','mã sự kiện "'+v.id+'" sai.','chữ thường không dấu, ví dụ "benh_nhan_nho".');else if(ids.has(v.id))bad(k+'.id','trùng mã "'+v.id+'".');ids.add(v.id);
      txt(k+'.ten',v.ten,4,40);txt(k+'.t',v.t,150,900);kiemCach(k+'.c',v.c,2,4);});
    for(const b of ok)if((dem[b]||0)<SO.ccMoiBuoc)bad('ev','bước '+b+' ('+P.steps[b].b+') chưa có sự kiện nào.','thêm một sự kiện có "buoc": '+b+'.');
    out.ma=A.duong;out.v=A.ev;}
  if(A.loai==='canh'){const K=CANH[A.nhom];
    if(!K)bad('nhom','nhóm "'+A.nhom+'" không có.','một trong: '+Object.keys(CANH).join(', ')+'.');
    else{const want=A.nhom.replace('_','-');if(base!==want)bad('nhom','tên tệp phải là '+want+'.json.');
      if(seen['canh:'+A.nhom])bad('nhom','trùng với '+seen['canh:'+A.nhom]+'.');seen['canh:'+A.nhom]=rel;
      if(only('canh',A.canh,K)){for(const x of K){const L=A.canh[x],k='canh.'+x;
        if(!Array.isArray(L)||L.length<SO.canhMoiKhoa){bad(k,'cần ít nhất '+SO.canhMoiKhoa+' biến thể (đang có '+(Array.isArray(L)?L.length:0)+').');if(!Array.isArray(L))continue;}
        L.forEach((v,i)=>{const kk=k+'['+i+']';if(!only(kk,v,['t','dk']))return;kiemDk(kk+'.dk',v.dk,['pham','tuoiTu','tuoiDen']);txt(kk+'.t',v.t,80,600);
          if(A.nhom==='truy'&&v.t&&!/\{ke\}/.test(v.t))warn(kk+'.t','không gọi {ke} (tên kẻ đuổi): người chơi có thể không biết ai chặn.');
          if(A.nhom==='truy'&&/dừng chân giữa đường|thần thức báo trước/i.test(v.t||''))bad(kk+'.t','lặp câu hệ thống tự thêm.','bỏ câu "dừng chân giữa đường"/"thần thức báo trước": game tự nối vào sau.');});
        if(L.length&&L.every(v=>v&&v.dk))bad(k,'mọi biến thể đều có điều kiện.','để ít nhất một biến thể không có "dk".');}}}
    out.ma=A.nhom;out.v=A.canh;}
  return {loi,cb,out};}
function kiemNoiDung2(files,o){o=o||{};const B=bang2();const loi=[],cb=[],seen={};const data={qc:{},nghe:{},cc:{},canh:{}};let n=0;
  let all=[];for(const k in LOAI){const d=path.join(ROOT,LOAI[k].dir);if(fs.existsSync(d))all=all.concat(fs.readdirSync(d).filter(f=>f.endsWith('.json')).sort().map(f=>path.join(d,f)));}
  const chon=files&&files.length?files.map(f=>path.resolve(f)):all;
  for(const f of chon){if(!fs.existsSync(f)){loi.push(f+': không có tệp.');continue;}const r=kiemTep(f,B,seen);loi.push(...r.loi);cb.push(...r.cb);
    if(!r.loi.length&&r.out){n++;const x=r.out;if(x.loai==='qua_chin')data.qc[x.ma]=x.v;else if(x.loai==='nghe')data.nghe[x.ma]=x.v;else if(x.loai==='cai_can')data.cc[x.ma]=x.v;else for(const k in x.v)data.canh[x.ma+'.'+k]=x.v[k];}}
  const co=new Set(all.map(f=>path.relative(ROOT,f).replace(/\\/g,'/')));const thieu=canViet(B).filter(x=>!co.has(x.tep));
  if(o.du)for(const x of thieu)loi.push(x.tep+': chưa có tệp ('+LOAI[x.loai].ten+' — '+x.mo+'). Cách sửa: viết tệp này theo mẫu trong hướng dẫn.');
  return {loi,cb,data,n,thieu};}
module.exports={kiemNoiDung2,canViet,bang2,CANH,LOAI,SO};
if(require.main===module){const a=process.argv.slice(2);const r=kiemNoiDung2(a.filter(x=>!x.startsWith('-')),{du:a.includes('--du')});
  for(const c of r.cb)console.log('  ⚠ Cảnh báo: '+c);for(const l of r.loi)console.log('  ✗ Lỗi: '+l);
  if(!a.includes('--du')&&r.thieu.length){const by={};for(const x of r.thieu)(by[x.loai]=by[x.loai]||[]).push(x.ma);console.log('  · Còn chưa viết (chưa tính là lỗi): '+Object.entries(by).map(([k,v])=>LOAI[k].ten+' '+v.length).join(', ')+'.');}
  console.log(r.loi.length?`\nCÓ ${r.loi.length} LỖI (${r.cb.length} cảnh báo). Sửa hết lỗi rồi chạy lại: npm run content:gpt`:`\nĐạt: ${r.n} tệp nội dung đợt hai không lỗi (${r.cb.length} cảnh báo).`);
  if(r.loi.length)process.exitCode=1;}
