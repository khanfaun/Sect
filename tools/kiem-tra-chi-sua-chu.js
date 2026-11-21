// Kiểm lô "sửa câu chữ" của GPT (gói GUI-GPT-3): so content/tuyen/*.json với bản gốc trên nhánh claude/busy-cray-fctc4p,
// chỉ cho đổi chữ ở các khoá lời văn; mã, điều kiện, hiệu ứng, cấu trúc phải giữ nguyên.
// Chạy: npm run content:chu                      (so với origin/claude/busy-cray-fctc4p)
//       node tools/kiem-tra-chi-sua-chu.js <nhánh-gốc> [tệp…]
const fs=require('fs'),path=require('path'),cp=require('child_process');const ROOT=path.resolve(__dirname,'..');
const CHU=new Set(['ten','mo','t','l','su','dauVong','thayThe','ngoai','tomTat']);
function so(a,b,k,loi,rel){
  if(typeof a==='string'&&typeof b==='string'&&CHU.has(k.split('.').pop().replace(/\[\d+\]$/,'')))return;
  if(Array.isArray(a)||Array.isArray(b)){if(!Array.isArray(a)||!Array.isArray(b)||a.length!==b.length){loi.push(rel+', khoá '+k+': số phần tử đổi (gốc '+(Array.isArray(b)?b.length:'?')+', nay '+(Array.isArray(a)?a.length:'?')+'). Chỉ được sửa chữ, không thêm/bớt lựa chọn hay đoạn.');return;}
    a.forEach((x,i)=>so(x,b[i],k+'['+i+']',loi,rel));return;}
  if(a&&b&&typeof a==='object'&&typeof b==='object'){const ks=new Set([...Object.keys(a),...Object.keys(b)]);
    for(const x of ks){if(!(x in a)){loi.push(rel+', khoá '+(k?k+'.':'')+x+': bị xoá. Cách sửa: trả lại như bản gốc.');continue;}if(!(x in b)){loi.push(rel+', khoá '+(k?k+'.':'')+x+': khoá mới không có ở bản gốc. Cách sửa: bỏ khoá này.');continue;}so(a[x],b[x],k?k+'.'+x:x,loi,rel);}return;}
  if(a!==b)loi.push(rel+', khoá '+k+': giá trị "'+String(b).slice(0,40)+'" bị đổi thành "'+String(a).slice(0,40)+'". Đây không phải lời văn — giữ nguyên.');}
function kiem(base,files){base=base||'origin/claude/busy-cray-fctc4p';const loi=[];let n=0,doi=0;
  const L=files&&files.length?files:fs.readdirSync(path.join(ROOT,'content/tuyen')).filter(f=>f.endsWith('.json')).map(f=>'content/tuyen/'+f);
  for(const rel of L){let g;try{g=cp.execSync('git show '+base+':'+rel,{cwd:ROOT,encoding:'utf8',stdio:['ignore','pipe','ignore']});}catch(e){loi.push(rel+': không có ở bản gốc '+base+' (không được tạo tuyến mới).');continue;}
    let a;try{a=JSON.parse(fs.readFileSync(path.join(ROOT,rel),'utf8'));}catch(e){loi.push(rel+': JSON sai — '+e.message);continue;}
    const b=JSON.parse(g);n++;if(JSON.stringify(a)!==JSON.stringify(b))doi++;so(a,b,'',loi,rel);}
  return {loi,n,doi};}
module.exports={kiem,CHU};
if(require.main===module){const a=process.argv.slice(2);const base=a[0]&&!a[0].endsWith('.json')?a.shift():null;const r=kiem(base,a);
  for(const l of r.loi)console.log('  ✗ Lỗi: '+l);
  console.log(r.loi.length?`\nCÓ ${r.loi.length} LỖI. Chỉ được đổi chữ ở các khoá: ${[...CHU].join(', ')}.`:`\nĐạt: ${r.n} tệp tuyến, ${r.doi} tệp có sửa chữ, không đụng tới mã hay điều kiện.`);
  if(r.loi.length)process.exitCode=1;}
