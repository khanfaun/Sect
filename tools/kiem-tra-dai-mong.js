// Kiểm lời văn Đ10 (Đại Mộng): Mộng Ấn, Người Gác Bến, Bến Vong Xuyên, màn kết, nghi thức, khảo sát nơi cổ.
// Chạy: npm run content:mong            (kiểm các tệp đang có; liệt kê phần còn thiếu)
//       npm run content:mong -- --du    (đòi đủ hết mọi tệp — dùng ở lô cuối)
//       node tools/kiem-tra-dai-mong.js content/dai-mong/mong-an/MA02.json   (chỉ kiểm vài tệp)
// Báo lỗi tiếng Việt: tệp, dòng, khoá sai và cách sửa. Lỗi thì thoát mã 1; cảnh báo không chặn.
// Thiếu tệp không phải lỗi (game dùng lời dự phòng trong content/text/dai-mong.json), trừ khi chạy --du.
const fs=require('fs'),path=require('path'),vm=require('vm');const ROOT=path.resolve(__dirname,'..');
const {parseJ,TEN_DUNG}=require('./kiem-tra-tuyen');const {bang2}=require('./kiem-tra-noi-dung-2');
const DIR='content/dai-mong';
const TEN_DM=new Set(['Vong Xuyên','Sông Vong Xuyên','Người Gác Bến','Chuông Phù Sinh','Tân Mộng','Đại Mộng']);
function bangDM(){const B=bang2();const s=fs.readFileSync(path.join(ROOT,'content/rules/dai-mong.js'),'utf8');
  Object.assign(B,vm.runInNewContext(s+';({MONG_AN,TRI_THUC,DM_VIEC,GAC_BEN,KET_THUC,NGHI_THUC})',{}));
  B.KHAO={};for(const id in B.DM_VIEC){const V=B.DM_VIEC[id];(B.KHAO[V.loc]=B.KHAO[V.loc]||[]).push(id);}return B;}
// trường của từng nghi thức (chỗ game dùng: chuanBi = lúc bắt đầu, xong = đầu màn kết, hong = khi hỏng)
const NG_K={NG01:['chuanBi','xong','hong'],NG02:['chuanBi','xong'],NG03:['chuanBi','xong','hong'],NG04:['xong','hong']};
const SO={nhat:[2,3],hien:[2,4],nhan:[2,4],loi:5,vao:[3,6],uong:[3,6],doi:[3,6],doiLai:[2,4],mim:[2,4],canh:[2,3],hau:[2,5]};
const LOAI={mong_an:{dir:'mong-an',ten:'Mộng Ấn'},gac_ben:{dir:'gac-ben',ten:'Người Gác Bến'},ben:{dir:'',ten:'Bến Vong Xuyên'},ket:{dir:'ket',ten:'màn kết'},
  nghi_thuc:{dir:'nghi-thuc',ten:'nghi thức'},khao:{dir:'khao',ten:'khảo sát nơi cổ'}};
function canViet(B){B=B||bangDM();const L=[];
  for(const m in B.MONG_AN)L.push({loai:'mong_an',tep:DIR+'/mong-an/'+m+'.json',ma:m,mo:B.MONG_AN[m].n+' — '+B.MONG_AN[m].he});
  for(const d of B.GAC_BEN)L.push({loai:'gac_ben',tep:DIR+'/gac-ben/'+d+'.json',ma:d,mo:d.replace(/_/g,' ')});
  L.push({loai:'ben',tep:DIR+'/ben.json',ma:'ben',mo:'cảnh ở bến khi chết'});
  for(const e in B.KET_THUC)L.push({loai:'ket',tep:DIR+'/ket/'+e+'.json',ma:e,mo:B.KET_THUC[e].n});
  for(const g in B.NGHI_THUC)L.push({loai:'nghi_thuc',tep:DIR+'/nghi-thuc/'+g+'.json',ma:g,mo:B.NGHI_THUC[g].n+' ('+NG_K[g].join(', ')+')'});
  for(const l in B.KHAO)L.push({loai:'khao',tep:DIR+'/khao/'+l+'.json',ma:l,mo:B.LOC[l].n+': '+B.KHAO[l].join(', ')});
  return L;}
function kiemTep(file,B,seen){const loi=[],cb=[];const rel=path.relative(ROOT,file).replace(/\\/g,'/');let P;
  try{P=parseJ(fs.readFileSync(file,'utf8'));}catch(e){loi.push(rel+' dòng '+(e.line||'?')+': JSON sai — '+e.message+'. Cách sửa: mở tệp ở dòng này, kiểm dấu phẩy, ngoặc và ngoặc kép.');return {loi,cb};}
  const A=P.v,Ln=P.lines;const dong=k=>{while(k&&Ln[k]==null)k=k.replace(/(\.[^.[\]]+|\[\d+\])$/,'');return Ln[k]||1;};
  const bad=(k,m,sua)=>loi.push(rel+' dòng '+dong(k)+', khoá '+(k||'(gốc)')+': '+m+(sua?' Cách sửa: '+sua:''));
  const warn=(k,m)=>cb.push(rel+' dòng '+dong(k)+', khoá '+(k||'(gốc)')+': '+m);
  const only=(k,o,allow)=>{if(!o||typeof o!=='object'||Array.isArray(o)){bad(k,'phải là một đối tượng {…}.');return false;}let g=true;
    for(const x of Object.keys(o))if(!allow.includes(x)){bad(k?k+'.'+x:x,'khoá "'+x+'" không có trong định dạng.','chỉ dùng: '+allow.join(', ')+'.');g=false;}return g;};
  const vanCam=(k,s,o)=>{o=o||{};
    for(const m of s.matchAll(/\{([^{}]*)\}/g)){const t=m[1];if(t==='ten')continue;const mm=/^(NP\d\d)(\.(vai|noi))?$|^(LOC\d\d)$|^(FA\d\d)$/.exec(t);
      if(!mm){bad(k,'chỗ thay "{'+t+'}" không hợp lệ.','chỉ dùng {ten}, {NPxx}, {NPxx.vai}, {NPxx.noi}, {LOCxx}, {FAxx}.');continue;}
      if(mm[1]&&!B.NP[mm[1]])bad(k,'mã người '+mm[1]+' không có.','dùng NP01–NP30.');if(mm[4]&&!B.LOC[mm[4]])bad(k,'mã nơi '+mm[4]+' không có.','dùng LOC01–LOC15.');if(mm[5]&&!B.FA[mm[5]])bad(k,'mã thế lực '+mm[5]+' không có.','dùng FA01–FA10.');}
    if(o.khongTen&&/\{ten\}/.test(s))bad(k,'cảnh này không có tên nhân vật để thay {ten}.','gọi "ngươi".');
    const s0=s.replace(/\{[^{}]*\}/g,'');
    for(const m of s0.matchAll(/\d+/g)){const sau=s0.slice(m.index+m[0].length,m.index+m[0].length+6);if(!/^\s*tuổi/.test(sau))bad(k,'có con số "'+m[0]+'" trong lời văn.','viết bằng chữ ("ba ngày", "trăm năm").');}
    if(/\b(TRI|MA|END|NG|CLK)\d\d\b/.test(s0))bad(k,'lời văn ghi mã nội bộ (TRI/MA/END/NG/CLK).','kể bằng chữ, không ghi mã.');
    if(/nghiệp\s*(lực|điểm)?\s*[+\-−]|điểm nghiệp|điểm luân hồi|karma|\bxp\b|kinh nghiệm\s*[+\-]/i.test(s0))bad(k,'lời văn nhắc điểm số.','không nói điểm; chỉ kể việc đã xảy ra.');
    if(/(ngươi|nhân vật)\s+(chợt\s+)?(nhớ lại|nhớ ra|còn nhớ)\s+(kiếp|đời)\s+trước/i.test(s0))bad(k,'nhân vật không nhớ kiếp trước (luật quên sạch).','viết "cảm giác đã từng", "mảnh mộng chợt hiện", "như đã thấy ở đâu".');
    for(const ma in B.NP){const n=B.NP[ma].ten;if(n&&s0.includes(n))bad(k,'ghi thẳng tên "'+n+'".','thay bằng {'+ma+'}.');}
    for(const ma in B.LOC){const n=B.LOC[ma].n;if(n&&s0.includes(n))bad(k,'ghi thẳng tên nơi "'+n+'".','thay bằng {'+ma+'}.');}
    for(const ma in B.FA){const n=B.FA[ma].n;if(n&&s0.includes(n)&&!Object.values(B.LOC).some(l=>l.n===n))bad(k,'ghi thẳng tên thế lực "'+n+'".','thay bằng {'+ma+'}.');}
    if(/sống lại|hồi sinh|đội mồ/i.test(s0))warn(k,'có chữ "sống lại/hồi sinh": người đã chết không quay lại.');
    if(o.yeuHoang===false&&/Yêu Hoàng|bị chém|Ngũ Tổ chém/.test(s0))bad(k,'lộ thân phận Người Gác Bến quá sớm.','chỉ ở bậc lộ cuối (loi[4], sau cảnh kẻ sứ thú nói ra) mới được nhắc Yêu Hoàng / bị chém.');
    for(const m of s0.matchAll(/(?<=[\p{Ll},;] )((?:\p{Lu}\p{Ll}+ ){1,2}\p{Lu}\p{Ll}+)/gu))if(!TEN_DUNG.has(m[1])&&!TEN_DM.has(m[1])&&!B.TEN_OK.has(m[1]))bad(k,'có vẻ là tên riêng mới "'+m[1]+'".','không tạo người/nơi mới: dùng mã NP/LOC/FA, hoặc gọi chung ("một bà cụ", "gã lái đò").');};
  const txt=(k,v,min,max,o)=>{if(typeof v!=='string'||!v.trim()){bad(k,'thiếu chữ hoặc không phải chuỗi.','viết một đoạn chữ trong ngoặc kép.');return;}
    if(min&&v.length<min)bad(k,'đoạn văn quá ngắn ('+v.length+' ký tự), cần ít nhất '+min+'.','viết thêm chi tiết cảnh, người, vật.');if(max&&v.length>max)warn(k,'đoạn văn dài ('+v.length+' ký tự), nên dưới '+max+'.');vanCam(k,v,o);};
  const mang=(k,L,so,min,max,o)=>{const [a,b]=Array.isArray(so)?so:[so,so];if(!Array.isArray(L)||L.length<a||L.length>b){bad(k,'cần '+(a===b?a:a+'–'+b)+' đoạn (đang có '+(Array.isArray(L)?L.length:0)+').');if(!Array.isArray(L))return;}
    L.forEach((s,i)=>txt(k+'['+i+']',s,min,max,typeof o==='function'?o(i):o));
    const seen2=new Set();L.forEach((s,i)=>{const h=String(s).slice(0,40);if(seen2.has(h))warn(k+'['+i+']','mở đầu giống một đoạn khác: nên đổi cách vào cảnh.');seen2.add(h);});};
  const ROOTK={mong_an:['schemaVersion','loai','ma','nhat'],gac_ben:['schemaVersion','loai','dang','hien','nhan','loi'],ben:['schemaVersion','loai','vao','uong','doi','doiLai','mim'],
    ket:['schemaVersion','loai','ma','canh','hau'],nghi_thuc:null,khao:['schemaVersion','loai','loc','muc']};
  if(!A||typeof A!=='object'||!(A.loai in ROOTK)){bad('loai','"loai" phải là một trong: '+Object.keys(ROOTK).join(', ')+'.');return {loi,cb};}
  const sub=LOAI[A.loai].dir;const want=sub?DIR+'/'+sub+'/':DIR+'/';if(!rel.startsWith(want)||(!sub&&rel!==DIR+'/ben.json'))bad('loai','tệp loại "'+A.loai+'" phải nằm ở '+(sub?want:DIR+'/ben.json')+'.');
  const keys=A.loai==='nghi_thuc'?['schemaVersion','loai','ma'].concat(NG_K[A.ma]||['chuanBi','xong','hong']):ROOTK[A.loai];
  if(!only('',A,keys))return {loi,cb};
  if(A.schemaVersion!==1)bad('schemaVersion','phải là 1.','ghi "schemaVersion": 1.');
  const base=path.basename(file,'.json');const out={loai:A.loai};
  const ma1=(f,bangX,ten)=>{const v=A[f];if(!bangX[v]&&!(Array.isArray(bangX)&&bangX.includes(v))){bad(f,ten+' "'+v+'" không có.','một trong: '+(Array.isArray(bangX)?bangX:Object.keys(bangX)).join(', ')+'.');return false;}
    if(base!==v)bad(f,'tên tệp "'+base+'.json" khác mã "'+v+'".','đặt tên tệp là '+v+'.json.');if(seen[A.loai+':'+v])bad(f,'trùng với '+seen[A.loai+':'+v]+'.');seen[A.loai+':'+v]=rel;return true;};
  if(A.loai==='mong_an'){ma1('ma',B.MONG_AN,'mã Mộng Ấn');mang('nhat',A.nhat,SO.nhat,150,700);out.ma=A.ma;out.v={nhat:A.nhat};}
  if(A.loai==='gac_ben'){ma1('dang',B.GAC_BEN,'dạng Người Gác Bến');mang('hien',A.hien,SO.hien,120,600,{yeuHoang:false});mang('nhan',A.nhan,SO.nhan,80,500,{yeuHoang:false});
    mang('loi',A.loi,SO.loi,100,600,i=>({yeuHoang:i>=4?undefined:false}));
    if(Array.isArray(A.loi)&&A.loi[3]&&!/chặt|khép|đóng/i.test(A.loi[3]))warn('loi[3]','bậc lộ thứ tư nên có lời xúi chặt vòng (Người Gác Bến muốn vòng bị chặt).');
    out.ma=A.dang;out.v={hien:A.hien,nhan:A.nhan,loi:A.loi};}
  if(A.loai==='ben'){if(seen.ben)bad('loai','trùng tệp bến.');seen.ben=rel;for(const f of ['vao','uong','doi','doiLai','mim'])mang(f,A[f],SO[f],80,600,{khongTen:false});
    out.ma='ben';out.v={vao:A.vao,uong:A.uong,doi:A.doi,doiLai:A.doiLai,mim:A.mim};}
  if(A.loai==='ket'){if(ma1('ma',B.KET_THUC,'mã kết thúc')){const cau=B.KET_THUC[A.ma].cau;(A.canh||[]).forEach((s,i)=>{if(typeof s==='string'&&s.includes(cau.slice(0,30)))bad('canh['+i+']','chép lại câu kết cố định.','câu kết game tự thêm vào cuối; đoạn "canh" kể cảnh trước đó.');});}
    mang('canh',A.canh,SO.canh,200,900);mang('hau',A.hau,SO.hau,30,220);out.ma=A.ma;out.v={canh:A.canh,hau:A.hau};}
  if(A.loai==='nghi_thuc'){if(ma1('ma',B.NGHI_THUC,'mã nghi thức')){for(const f of NG_K[A.ma]){if(A[f]==null)bad(f,'thiếu đoạn "'+f+'".');else txt(f,A[f],150,700);}}
    out.ma=A.ma;out.v={};for(const f of NG_K[A.ma]||[])out.v[f]=A[f];}
  if(A.loai==='khao'){if(ma1('loc',B.KHAO,'nơi')){const ids=B.KHAO[A.loc];if(only('muc',A.muc,ids)){for(const id of ids){if(A.muc[id]==null)bad('muc.'+id,'thiếu đoạn cho việc "'+id+'".','xem bảng việc ở hướng dẫn.');else txt('muc.'+id,A.muc[id],150,700);}}}
    out.ma=A.loc;out.v={muc:A.muc};}
  return {loi,cb,out};}
function tatCaTep(){const L=[];const walk=d=>{const p=path.join(ROOT,d);if(!fs.existsSync(p))return;for(const f of fs.readdirSync(p).sort()){const q=path.join(p,f);if(fs.statSync(q).isDirectory())walk(d+'/'+f);else if(f.endsWith('.json'))L.push(q);}};walk(DIR);return L;}
function kiemDaiMong(files,o){o=o||{};const B=bangDM();const loi=[],cb=[],seen={};const data={mong:{},gb:{},ben:null,ket:{},ng:{},khao:{}};let n=0;const all=tatCaTep();
  const chon=files&&files.length?files.map(f=>path.resolve(f)):all;
  for(const f of chon){if(!fs.existsSync(f)){loi.push(f+': không có tệp.');continue;}const r=kiemTep(f,B,seen);loi.push(...r.loi);cb.push(...r.cb);
    if(!r.loi.length&&r.out){n++;const x=r.out;if(x.loai==='mong_an')data.mong[x.ma]=x.v;else if(x.loai==='gac_ben')data.gb[x.ma]=x.v;else if(x.loai==='ben')data.ben=x.v;
      else if(x.loai==='ket')data.ket[x.ma]=x.v;else if(x.loai==='nghi_thuc')data.ng[x.ma]=x.v;else data.khao[x.ma]=x.v;}}
  const co=new Set(all.map(f=>path.relative(ROOT,f).replace(/\\/g,'/')));const thieu=canViet(B).filter(x=>!co.has(x.tep));
  if(o.du)for(const x of thieu)loi.push(x.tep+': chưa có tệp ('+LOAI[x.loai].ten+' — '+x.mo+'). Cách sửa: viết tệp này theo mẫu trong hướng dẫn.');
  return {loi,cb,data,n,thieu};}
module.exports={kiemDaiMong,canViet,bangDM,NG_K,SO,LOAI};
if(require.main===module){const a=process.argv.slice(2);const r=kiemDaiMong(a.filter(x=>!x.startsWith('-')),{du:a.includes('--du')});
  for(const c of r.cb)console.log('  ⚠ Cảnh báo: '+c);for(const l of r.loi)console.log('  ✗ Lỗi: '+l);
  if(!a.includes('--du')&&r.thieu.length){const by={};for(const x of r.thieu)(by[x.loai]=by[x.loai]||[]).push(x.ma);console.log('  · Còn chưa viết (chưa tính là lỗi): '+Object.entries(by).map(([k,v])=>LOAI[k].ten+' '+v.length).join(', ')+'.');}
  console.log(r.loi.length?`\nCÓ ${r.loi.length} LỖI (${r.cb.length} cảnh báo). Sửa hết lỗi rồi chạy lại: npm run content:mong`:`\nĐạt: ${r.n} tệp lời văn Đại Mộng không lỗi (${r.cb.length} cảnh báo).`);
  if(r.loi.length)process.exitCode=1;}
