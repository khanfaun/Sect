// Kiểm lời văn sự kiện và kết cục sáu nghề tu mở rộng (gói GPT đợt năm, L1–L6): content/nghe-tu/TUxx.json.
// Chạy: npm run content:nghe              (kiểm hết)
//       node tools/kiem-tra-nghe-tu.js content/nghe-tu/TU17.json   (chỉ kiểm vài tệp)
// Mỗi tệp: 12 sự kiện S01…S12 (2–3 lựa chọn, mỗi lựa chọn có hiệu ứng nhỏ "e") + 4 kết cục K01…K04.
// Tầng hiện sự kiện và điều kiện kết cục nằm trong luật (TU_SK, TU_KET ở content/rules/nghe-tu-mo-rong.js).
// Lỗi thì thoát mã 1; cảnh báo không chặn.
const fs=require('fs'),path=require('path'),vm=require('vm');const ROOT=path.resolve(__dirname,'..');
const {parseJ}=require('./kiem-tra-tuyen');const {bang2}=require('./kiem-tra-noi-dung-2');
const DIR='content/nghe-tu';
function bangNT(){const B=bang2();const ctx={};vm.createContext(ctx);
  for(const f of ['content/rules/nghe-tu.js','content/rules/nghe-tu-mo-rong.js','content/rules/wound.js'])vm.runInContext(fs.readFileSync(path.join(ROOT,f),'utf8'),ctx);
  Object.assign(B,vm.runInContext('({TU_NGHE,TU_SK,TU_KET,WOUND})',ctx));return B;}
// khoá hiệu ứng được dùng và giới hạn (giữ hiệu ứng nhỏ)
const SO_N={tv:[-10,10],st:[-10,10],tamma:[-10,10],danh:[-10,10],res:[-5,5],xp:[0,10],tho:[0,2],khien:[1,1]};
const E_K=Object.keys(SO_N).concat(['hp','mp','hd','deed','wound']);
function kiemTep(file,B,seen){const loi=[],cb=[];const rel=path.relative(ROOT,file).replace(/\\/g,'/');let P;
  try{P=parseJ(fs.readFileSync(file,'utf8'));}catch(e){loi.push(rel+' dòng '+(e.line||'?')+': JSON sai — '+e.message+'. Cách sửa: kiểm dấu phẩy, ngoặc và ngoặc kép.');return {loi,cb};}
  const A=P.v,Ln=P.lines;const dong=k=>{while(k&&Ln[k]==null)k=k.replace(/(\.[^.[\]]+|\[\d+\])$/,'');return Ln[k]||1;};
  const bad=(k,m,sua)=>loi.push(rel+' dòng '+dong(k)+', khoá '+(k||'(gốc)')+': '+m+(sua?' Cách sửa: '+sua:''));
  const warn=(k,m)=>cb.push(rel+' dòng '+dong(k)+', khoá '+(k||'(gốc)')+': '+m);
  const only=(k,o,allow)=>{if(!o||typeof o!=='object'||Array.isArray(o)){bad(k,'phải là một đối tượng {…}.');return false;}let g=true;
    for(const x of Object.keys(o))if(!allow.includes(x)){bad(k?k+'.'+x:x,'khoá "'+x+'" không có trong định dạng.','chỉ dùng: '+allow.join(', ')+'.');g=false;}return g;};
  const van=(k,s,min,max)=>{if(typeof s!=='string'||!s.trim()){bad(k,'thiếu chữ.');return;}
    if(s.length<min)bad(k,'quá ngắn ('+s.length+' ký tự), cần ít nhất '+min+'.');if(s.length>max)warn(k,'dài ('+s.length+' ký tự), nên dưới '+max+'.');
    for(const m of s.matchAll(/\{([^{}]*)\}/g)){const t=m[1];const mm=/^(NP\d\d)(\.(vai|noi))?$|^(LOC\d\d)$|^(FA\d\d)$/.exec(t);
      if(!mm){bad(k,'chỗ thay "{'+t+'}" không hợp lệ.','chỉ dùng {NPxx}, {NPxx.vai}, {NPxx.noi}, {LOCxx}, {FAxx}.');continue;}
      if(mm[1]&&!B.NP[mm[1]])bad(k,'mã người '+mm[1]+' không có.');if(mm[4]&&!B.LOC[mm[4]])bad(k,'mã nơi '+mm[4]+' không có.');if(mm[5]&&!B.FA[mm[5]])bad(k,'mã thế lực '+mm[5]+' không có.');}
    const s0=s.replace(/\{[^{}]*\}/g,'');
    if(/\d/.test(s0))bad(k,'có con số trong lời văn.','viết bằng chữ.');
    if(/(nhớ lại|nhớ ra|còn nhớ)\s+(kiếp|đời)\s+trước/i.test(s0))bad(k,'nhân vật không nhớ kiếp trước (luật quên sạch).');
    for(const ma in B.LOC){const n=B.LOC[ma].n;if(n&&s0.includes(n))bad(k,'ghi thẳng tên nơi "'+n+'".','thay bằng {'+ma+'}.');}
    for(const ma in B.NP){const n=B.NP[ma].ten;if(n&&s0.includes(n))bad(k,'ghi thẳng tên "'+n+'".','thay bằng {'+ma+'}.');}};
  const mang=(k,L,a,b,min,max)=>{if(!Array.isArray(L)||L.length<a||L.length>b){bad(k,'cần '+(a===b?a:a+'–'+b)+' đoạn (đang có '+(Array.isArray(L)?L.length:0)+').');if(!Array.isArray(L))return;}L.forEach((s,i)=>van(k+'['+i+']',s,min,max));};
  const hieu=(k,e)=>{if(!only(k,e,E_K))return;if(!Object.keys(e).length)bad(k,'lựa chọn chưa có hiệu ứng.','gắn ít nhất một khoá: '+E_K.join(', ')+'.');
    for(const [x,[lo,hi]] of Object.entries(SO_N))if(e[x]!=null){const v=e[x];
      if(x==='st'&&typeof v==='string'){if(!/^-\d{1,3}%$/.test(v)||+v.slice(0,-1)<-100)bad(k+'.st','phần trăm linh thạch phải dạng "-40%".');continue;}
      if(typeof v!=='number'||v<lo||v>hi)bad(k+'.'+x,'phải là số từ '+lo+' tới '+hi+' (hiệu ứng nhỏ).');}
    for(const x of ['hp','mp'])if(e[x]!=null&&!(typeof e[x]==='string'&&/^-?\d{1,2}%$/.test(e[x])&&Math.abs(parseFloat(e[x]))<=30))bad(k+'.'+x,'phải là phần trăm nhỏ, ví dụ "-8%" hoặc "10%" (tối đa 30%).');
    if(e.hd!=null&&!(Array.isArray(e.hd)&&e.hd.length===2&&e.hd.every(v=>Number.isInteger(v)&&v>=0&&v<=8)))bad(k+'.hd','Hành Đạo phải dạng [chính, tà], mỗi số 0–8.');
    if(e.deed!=null&&!B.DEED[e.deed])bad(k+'.deed','hành vi "'+e.deed+'" không có trong content/rules/deed.js.');
    if(e.wound!=null&&!B.WOUND[e.wound])bad(k+'.wound','thương "'+e.wound+'" không có.','một trong: '+Object.keys(B.WOUND).join(', ')+'.');};
  if(!only('',A,['schemaVersion','loai','nghe','ten','su_kien','ket_cuc']))return {loi,cb};
  if(A.schemaVersion!==1)bad('schemaVersion','phải là 1.');if(A.loai!=='nghe_tu')bad('loai','phải là "nghe_tu".');
  const id=A.nghe,base=path.basename(file,'.json');
  if(!B.TU_KET[id]){bad('nghe','mã nghề "'+id+'" không có sự kiện nghề.','một trong: '+Object.keys(B.TU_KET).join(', ')+'.');return {loi,cb};}
  if(base!==id)bad('nghe','tên tệp "'+base+'.json" khác mã nghề "'+id+'".');if(seen[id])bad('nghe','trùng với '+seen[id]+'.');seen[id]=rel;
  if(A.ten!==B.TU_NGHE[id].n)warn('ten','tên nghề khác luật ("'+B.TU_NGHE[id].n+'").');
  const n=((B.TU_SK.rieng&&B.TU_SK.rieng[id])||B.TU_SK).tang.length;const S=A.su_kien;
  if(!Array.isArray(S)||S.length!==n){bad('su_kien','cần đúng '+n+' sự kiện.');}
  const out={ten:A.ten,sk:[],ket:{}};
  (Array.isArray(S)?S:[]).forEach((s,i)=>{const k='su_kien['+i+']';if(!only(k,s,['ma','ten','text','choices']))return;
    const ma='S'+String(i+1).padStart(2,'0');if(s.ma!==ma)bad(k+'.ma','phải là "'+ma+'" (theo thứ tự).');
    van(k+'.ten',s.ten,3,80);mang(k+'.text',s.text,2,3,60,700);
    const C=s.choices;if(!Array.isArray(C)||C.length<2||C.length>3)bad(k+'.choices','cần 2–3 lựa chọn.');
    (Array.isArray(C)?C:[]).forEach((c,j)=>{const kc=k+'.choices['+j+']';if(!only(kc,c,['l','t','e']))return;van(kc+'.l',c.l,3,80);van(kc+'.t',c.t,40,500);hieu(kc+'.e',c.e);});
    if(Array.isArray(C)&&C.length>1&&new Set(C.map(c=>JSON.stringify(c.e))).size<C.length)warn(k+'.choices','hai lựa chọn có hiệu ứng giống hệt nhau.');
    out.sk.push({ma:s.ma,ten:s.ten,text:s.text,c:(Array.isArray(C)?C:[]).map(c=>({l:c.l,t:c.t,e:c.e||{}}))});});
  const K=A.ket_cuc,want=B.TU_KET[id].map(x=>x.ma).sort();
  if(!Array.isArray(K)||K.length!==want.length)bad('ket_cuc','cần đúng '+want.length+' kết cục.');
  (Array.isArray(K)?K:[]).forEach((x,i)=>{const k='ket_cuc['+i+']';if(!only(k,x,['ma','ten','canh']))return;
    if(!want.includes(x.ma))bad(k+'.ma','mã kết cục "'+x.ma+'" không có trong TU_KET.'+id+'.','một trong: '+want.join(', ')+'.');if(out.ket[x.ma])bad(k+'.ma','trùng mã.');
    van(k+'.ten',x.ten,3,80);mang(k+'.canh',x.canh,2,2,100,900);out.ket[x.ma]={ten:x.ten,canh:x.canh};});
  for(const m of want)if(Array.isArray(K)&&!K.some(x=>x&&x.ma===m))bad('ket_cuc','thiếu kết cục '+m+'.');
  return {loi,cb,out:{id,v:out}};}
function tatCaTep(){const p=path.join(ROOT,DIR);if(!fs.existsSync(p))return [];return fs.readdirSync(p).filter(f=>f.endsWith('.json')).sort().map(f=>path.join(p,f));}
function kiemNgheTu(files){const B=bangNT();const loi=[],cb=[],seen={},data={};let n=0;const chon=files&&files.length?files.map(f=>path.resolve(f)):tatCaTep();
  for(const f of chon){if(!fs.existsSync(f)){loi.push(f+': không có tệp.');continue;}const r=kiemTep(f,B,seen);loi.push(...r.loi);cb.push(...r.cb);if(!r.loi.length&&r.out){n++;data[r.out.id]=r.out.v;}}
  const thieu=Object.keys(B.TU_KET).filter(id=>!seen[id]);return {loi,cb,data,n,thieu};}
module.exports={kiemNgheTu,bangNT,E_K,SO_N};
if(require.main===module){const a=process.argv.slice(2);const r=kiemNgheTu(a.filter(x=>!x.startsWith('-')));
  for(const c of r.cb)console.log('  ⚠ Cảnh báo: '+c);for(const l of r.loi)console.log('  ✗ Lỗi: '+l);
  if(r.thieu.length)console.log('  · Chưa có tệp (chưa tính là lỗi): '+r.thieu.join(', ')+'.');
  console.log(r.loi.length?`\nCÓ ${r.loi.length} LỖI (${r.cb.length} cảnh báo). Sửa rồi chạy lại: npm run content:nghe`:`\nĐạt: ${r.n} tệp sự kiện nghề tu không lỗi (${r.cb.length} cảnh báo).`);
  if(r.loi.length)process.exitCode=1;}
