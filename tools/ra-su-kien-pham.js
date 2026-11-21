#!/usr/bin/env node
// Sửa-A: rà hàng loạt sự kiện cho phàm nhân (người dùng chốt câu 9).
//   node tools/ra-su-kien-pham.js            in thống kê + danh sách
//   node tools/ra-su-kien-pham.js --write    ghi content/rules/pham-su-kien.js (PHAM_SK.cam)
// Luật phân loại:
//   - chỉ xét mục phàm nhân có thể gặp: kind event/story/opportunity, levels trống hoặc có 0, không đòi ghi danh tông môn;
//   - "chuyện tu sĩ": điểm từ ngữ tu sĩ (đạo hữu, linh lực, tu vi, pháp bảo, trúc cơ…) ≥ NGUONG → phàm nhân không gặp;
//   - "đòi linh thạch": có lựa chọn tốn linh thạch (cost.st hoặc e.st < 0) mà lời kể vẫn có từ ngữ tu sĩ (điểm ≥ 1) → không gặp;
//   - còn lại có giá linh thạch: phàm nhân gặp được, luật 43-tien-te-2.js tự đổi giá sang xu (TIEN.evXu) và đổi chữ "linh thạch".
// THEM_CAM / BO_CAM: chỉnh tay sau khi rà (ghi lý do).
const fs=require('fs'),path=require('path');
const ROOT=path.join(__dirname,'..');
const man=JSON.parse(fs.readFileSync(path.join(ROOT,'content/events/manifest.json'),'utf8'));
const TU=[/đạo hữu/gi,/linh lực/gi,/pháp lực/gi,/thần thức/gi,/tu vi/gi,/đan điền/gi,/trúc cơ/gi,/kết đan/gi,/nguyên anh/gi,/hóa thần/gi,/luyện khí kỳ/gi,
  /pháp bảo/gi,/pháp khí/gi,/phi kiếm/gi,/ngự kiếm/gi,/luyện hóa/gi,/bế quan/gi,/đột phá/gi,/linh đan/gi,/luyện đan/gi,/phù lục/gi,/trận pháp/gi,/tu sĩ/gi,/tiền bối/gi,/chân khí/gi,/linh mạch/gi,/động phủ/gi];
const NGUONG=4;
// Rà tay 18/11/2026 (đọc lời kể + lựa chọn của từng mục máy chưa bắt):
const THEM_CAM=[
  'bi_canh',       // bí cảnh mở, tu sĩ khắp nơi đổ về
  'dau_gia',       // hội đấu giá người tu tiên, giá linh thạch
  'thi_the',       // thi thể tu sĩ, túi trữ vật
  'tranh_bao',     // tu sĩ tranh bảo, kiếm quang
  'ga_quay',       // hai tu sĩ Trúc Cơ đánh nhau
  'linh_mach',     // mạch linh thạch có dấu ấn tông môn
  'ngu_nhan',      // ngư nhân đòi đổi túi trữ vật
  'tu_binh',       // cứu đệ tử chính đạo khỏi ma tu
  'ma_tu_xin_tha', // ma tu bại trận xin tha
  'cuoc',          // cược nửa linh thạch lấy đan đột phá
];
// Máy bắt nhầm (chỉ một lựa chọn dùng linh lực — lựa chọn đó đã bị ẩn với phàm nhân — còn lại là chuyện phàm):
const BO_CAM=['tre_ban_hoa','cong_son_mon','gk_manh_truc_quay_vao','gk_can_muoi_dau_cho','gk_mai_ra_dem_ngoi'];
function strs(o,out){if(typeof o==='string')out.push(o);else if(Array.isArray(o))o.forEach(x=>strs(x,out));else if(o&&typeof o==='object')for(const k in o)if(k!=='origin'&&k!=='id')strs(o[k],out);return out;}
function stInfo(o,acc){if(Array.isArray(o))o.forEach(x=>stInfo(x,acc));else if(o&&typeof o==='object'){
  if(o.cost&&o.cost.st)acc.cost++;if(o.e&&o.e.st!=null){if(typeof o.e.st==='number'&&o.e.st<0)acc.cost++;else acc.gain++;}
  for(const k in o)stInfo(o[k],acc);}return acc;}
const all=[];
for(const f of man.files){const d=JSON.parse(fs.readFileSync(path.join(ROOT,f),'utf8'));const L=Array.isArray(d)?d:(d.events||d.items||[d]);for(const x of L)if(x&&x.id)all.push(Object.assign({_f:f},x));}
const rows=[];
for(const d of all){if(!['event','story','opportunity'].includes(d.kind))continue;const tr=d.trigger||{};
  if(tr.levels&&tr.levels.length&&!tr.levels.includes(0))continue;if(tr.membership)continue;
  const txt=strs([d.text,d.choices,d.name],[]).join('\n');let score=0;const hit=[];for(const rx of TU){const m=txt.match(rx);if(m){score+=m.length;hit.push(m[0].toLowerCase());}}
  const st=stInfo(d.choices||[],{cost:0,gain:0});const lt=/linh thạch/i.test(txt);
  let cam=null;if(score>=NGUONG)cam='tu';else if(st.cost&&score>=1)cam='doi_lt';
  if(BO_CAM.includes(d.id))cam=null;if(THEM_CAM.includes(d.id))cam='tay';
  rows.push({id:d.id,n:d.name,f:d._f,score,hit:[...new Set(hit)].join(','),cost:st.cost,gain:st.gain,lt,cam});}
const cam=rows.filter(r=>r.cam),doi=rows.filter(r=>!r.cam&&(r.cost||r.gain||r.lt));
console.log('Phàm nhân có thể gặp:',rows.length,'| không gặp:',cam.length,'(tu sĩ '+cam.filter(r=>r.cam==='tu').length+', đòi linh thạch '+cam.filter(r=>r.cam==='doi_lt').length+') | đổi sang tiền phàm:',doi.length);
if(process.argv.includes('--list')){for(const r of cam)console.log('CAM',r.cam,r.id,'|',r.n,'|',r.score,r.hit);for(const r of doi)console.log('DOI',r.id,'|',r.n,'|',r.score,r.hit,'cost',r.cost,'gain',r.gain);}
if(process.argv.includes('--write')){
  const out='// TỰ SINH bằng tools/ra-su-kien-pham.js --write (Sửa-A). Đừng sửa tay: chỉnh THEM_CAM/BO_CAM trong công cụ rồi chạy lại.\n'+
    '// cam: sự kiện phàm nhân không gặp (chuyện tu sĩ, hoặc đòi linh thạch). Sự kiện phàm gặp được thì 43-tien-te-2.js đổi giá sang xu.\n'+
    'const PHAM_SK={cam:'+JSON.stringify(cam.map(r=>r.id))+'};\n';
  fs.writeFileSync(path.join(ROOT,'content/rules/pham-su-kien.js'),out);console.log('Đã ghi content/rules/pham-su-kien.js');}
